/*
 * MikoPBX - free phone system for small business
 * Copyright (C) 2017-2020 Alexey Portnov and Nikolay Beketov
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

/* global globalRootUrl, globalTranslate, Extensions, Form,
 PbxApi, DebuggerInfo, InputMaskPatterns */


const extension = {
	defaultEmail: '',
	defaultNumber: '',
	defaultMobileNumber: '',
	$number: $('#number'),
	$sip_secret: $('#sip_secret'),
	$mobile_number: $('#mobile_number'),
	$fwd_forwarding: $('#fwd_forwarding'),
	$fwd_forwardingonbusy: $('#fwd_forwardingonbusy'),
	$fwd_forwardingonunavailable: $('#fwd_forwardingonunavailable'),
	$email: $('#user_email'),
	$formObj: $('#extensions-form'),
	$tabMenuItems: $('#extensions-menu .item'),
	forwardingSelect: '#extensions-form .forwarding-select',
	validateRules: {
		number: {
			identifier: 'number',
			rules: [
				{
					type: 'number',
					prompt: globalTranslate.ex_ValidateExtensionNumber,
				},
				{
					type: 'empty',
					prompt: globalTranslate.ex_ValidateNumberIsEmpty,
				},
				{
					type: 'existRule[number-error]',
					prompt: globalTranslate.ex_ValidateNumberIsDouble,
				},
			],
		},
		mobile_number: {
			optional: true,
			identifier: 'mobile_number',
			rules: [
				{
					type: 'mask',
					prompt: globalTranslate.ex_ValidateMobileIsNotCorrect,
				},
				{
					type: 'existRule[mobile-number-error]',
					prompt: globalTranslate.ex_ValidateMobileNumberIsDouble,
				},
			],
		},
		user_email: {
			optional: true,
			identifier: 'user_email',
			rules: [
				{
					type: 'email',
					prompt: globalTranslate.ex_ValidateEmailEmpty,
				},
			],
		},
		user_username: {
			identifier: 'user_username',
			rules: [
				{
					type: 'empty',
					prompt: globalTranslate.ex_ValidateUsernameEmpty,
				},
			],
		},
		sip_secret: {
			identifier: 'sip_secret',
			rules: [
				{
					type: 'empty',
					prompt: globalTranslate.ex_ValidateSecretEmpty,
				},
			],
		},
		fwd_ringlength: {
			identifier: 'fwd_ringlength',
			depends: 'fwd_forwarding',
			rules: [
				{
					type: 'integer[3..180]',
					prompt: globalTranslate.ex_ValidateRingingBeforeForwardOutOfRange,
				},
			],
		},
		fwd_forwarding: {
			optional: true,
			identifier: 'fwd_forwarding',
			rules: [
				{
					type: 'extensionRule',
					prompt: globalTranslate.ex_ValidateForwardingToBeFilled,
				},
				{
					type: 'different[number]',
					prompt: globalTranslate.ex_ValidateForwardingToBeDifferent,
				},
			],
		},
		fwd_forwardingonbusy: {
			identifier: 'fwd_forwardingonbusy',
			rules: [
				{
					type: 'different[number]',
					prompt: globalTranslate.ex_ValidateForwardingToBeDifferent,
				},
			],
		},
		fwd_forwardingonunavailable: {
			identifier: 'fwd_forwardingonunavailable',
			rules: [
				{
					type: 'different[number]',
					prompt: globalTranslate.ex_ValidateForwardingToBeDifferent,
				},
			],
		},

	},
	initialize() {
		extension.defaultEmail = extension.$email.inputmask('unmaskedvalue');
		extension.defaultMobileNumber = extension.$mobile_number.inputmask('unmaskedvalue');
		extension.defaultNumber = extension.$number.inputmask('unmaskedvalue');

		extension.$tabMenuItems.tab();
		$('#extensions-form .ui.accordion').accordion();
		$('#extensions-form .dropdown').dropdown();

		$('#qualify').checkbox({
			onChange() {
				if ($('#qualify').checkbox('is checked')) {
					$('#qualify-freq').removeClass('disabled');
				} else {
					$('#qualify-freq').addClass('disabled');
				}
			},
		});

		$(extension.forwardingSelect).dropdown(Extensions.getDropdownSettingsWithEmpty());

		if ($('#sip_secret').val() === '') extension.generateNewSipPassword();

		$('#generate-new-password').on('click', (e) => {
			e.preventDefault();
			extension.generateNewSipPassword();
			extension.$sip_secret.trigger('change');
		});

		extension.$number.inputmask('option', {
			oncomplete: extension.cbOnCompleteNumber,
		});

		const maskList = $.masksSort(InputMaskPatterns, ['#'], /[0-9]|#/, 'mask');
		extension.$mobile_number.inputmasks({
			inputmask: {
				definitions: {
					'#': {
						validator: '[0-9]',
						cardinality: 1,
					},
				},
				oncleared: extension.cbOnClearedMobileNumber,
				oncomplete: extension.cbOnCompleteMobileNumber,
				onBeforePaste: extension.cbOnMobileNumberBeforePaste,
				showMaskOnHover: false,
			},
			match: /[0-9]/,
			replace: '9',
			list: maskList,
			listKey: 'mask',
		});
		extension.$email.inputmask('email', {
			onUnMask: extension.cbOnUnmaskEmail,
			oncomplete: extension.cbOnCompleteEmail,
		});

		extension.initializeForm();
	},
	/**
	 * Callback after paste license coupon
	 */
	cbOnMobileNumberBeforePaste(pastedValue) {
		return pastedValue;
	},
	/**
	 * Вызывается после воода номера телефона для проверки нет ли пересечений с
	 * существующими номерами
	 */
	cbOnCompleteNumber() {
		const newNumber = extension.$number.inputmask('unmaskedvalue');
		const userId = extension.$formObj.form('get value', 'user_id');
		Extensions.checkAvailability(extension.defaultNumber, newNumber, 'number', userId);
	},
	/**
	 * Вызывается после ввода полного Email адреса
	 */
	cbOnCompleteEmail() {
		// Динамическая прововерка свободен ли Email
		$.api({
			url: `${globalRootUrl}users/available/{value}`,
			stateContext: '.ui.input.email',
			on: 'now',
			beforeSend(settings) {
				const result = settings;
				result.urlData = {
					value: extension.$email.inputmask('unmaskedvalue'),
				};
				return result;
			},
			onSuccess(response) {
				if (response.emailAvailable
					|| extension.defaultEmail === extension.$email.inputmask('unmaskedvalue')
				) {
					$('.ui.input.email').parent().removeClass('error');
					$('#email-error').addClass('hidden');
				} else {
					$('.ui.input.email').parent().addClass('error');
					$('#email-error').removeClass('hidden');
				}
			},
		});
	},
	/**
	 * Вызывается при получении безмасочного значения
	 */
	cbOnUnmaskEmail(maskedValue, unmaskedValue) {
		return unmaskedValue;
	},
	/**
	 * Вызывается при вводе мобильного телефона в карточке сотрудника
	 */
	cbOnCompleteMobileNumber() {
		console.log('cbOnCompleteMobileNumber');
		const newMobileNumber = extension.$mobile_number.inputmask('unmaskedvalue');
		const userId = extension.$formObj.form('get value', 'user_id');
		// Динамическая прововерка свободен ли выбранный мобильный номер
		Extensions.checkAvailability(extension.defaultMobileNumber, newMobileNumber, 'mobile-number', userId);

		// Перезаполним строку донабора
		if (newMobileNumber !== extension.defaultMobileNumber
			|| (extension.$formObj.form('get value', 'mobile_dialstring').length === 0)
		) {
			extension.$formObj.form('set value', 'mobile_dialstring', newMobileNumber);
		}

		// Проверим не менялся ли мобильный номер
		if (newMobileNumber !== extension.defaultMobileNumber) {
			const userName = extension.$formObj.form('get value', 'user_username');
			// Проверим не была ли настроена переадресация на мобильный номер
			if (extension.$formObj.form('get value', 'fwd_forwarding') === extension.defaultMobileNumber) {
				if (extension.$formObj.form('get value', 'fwd_ringlength').length === 0) {
					extension.$formObj.form('set value', 'fwd_ringlength', 45);
				}
				extension.$fwd_forwarding
					.dropdown('set text', `${userName} <${newMobileNumber}>`)
					.dropdown('set value', newMobileNumber);
				extension.$formObj.form('set value', 'fwd_forwarding', newMobileNumber);
			}
			if (extension.$formObj.form('get value', 'fwd_forwardingonbusy') === extension.defaultMobileNumber) {
				extension.$fwd_forwardingonbusy
					.dropdown('set text', `${userName} <${newMobileNumber}>`)
					.dropdown('set value', newMobileNumber);
				extension.$formObj.form('set value', 'fwd_forwardingonbusy', newMobileNumber);
			}
			if (extension.$formObj.form('get value', 'fwd_forwardingonunavailable') === extension.defaultMobileNumber) {
				extension.$fwd_forwardingonunavailable
					.dropdown('set text', `${userName} <${newMobileNumber}>`)
					.dropdown('set value', newMobileNumber);
				extension.$formObj.form('set value', 'fwd_forwardingonunavailable', newMobileNumber);
			}
		}
		extension.defaultMobileNumber = newMobileNumber;
		console.log(`new mobile number ${extension.defaultMobileNumber} `);
	},
	/**
	 * Вызывается при очистке мобильного телефона в карточке сотрудника
	 */
	cbOnClearedMobileNumber() {
		extension.$formObj.form('set value', 'mobile_dialstring', '');
		extension.$formObj.form('set value', 'mobile_number', '');


		// Проверим не была ли настроена переадресация на мобильный номер
		if (extension.$formObj.form('get value', 'fwd_forwarding') === extension.defaultMobileNumber) {
			extension.$formObj.form('set value', 'fwd_ringlength', '');

			extension.$fwd_forwarding
				.dropdown('set text', '-')
				.dropdown('set value', -1);
			extension.$formObj.form('set value', 'fwd_forwarding', -1);
		}
		if (extension.$formObj.form('get value', 'fwd_forwardingonbusy') === extension.defaultMobileNumber) {
			extension.$fwd_forwardingonbusy
				.dropdown('set text', '-')
				.dropdown('set value', -1);
			extension.$formObj.form('set value', 'fwd_forwardingonbusy', -1);
		}
		if (extension.$formObj.form('get value', 'fwd_forwardingonunavailable') === extension.defaultMobileNumber) {
			extension.$fwd_forwardingonunavailable
				.dropdown('set text', '-')
				.dropdown('set value', -1);
			extension.$formObj.form('set value', 'fwd_forwardingonunavailable', -1);
		}
		extension.defaultMobileNumber = '';
	},

	/**
	 * generateNewSipPassword() Работа с паролем SIP учетки
	 */
	generateNewSipPassword() {
		const chars = 'abcdef1234567890';
		let pass = '';
		for (let x = 0; x < 32; x += 1) {
			const i = Math.floor(Math.random() * chars.length);
			pass += chars.charAt(i);
		}
		extension.$sip_secret.val(pass);
	},
	cbBeforeSendForm(settings) {
		const result = settings;
		result.data = extension.$formObj.form('get values');
		result.data.mobile_number = extension.$mobile_number.inputmask('unmaskedvalue');
		return result;
	},
	cbAfterSendForm() {
		extension.defaultNumber = extension.$number.val();
		Extensions.UpdatePhoneRepresent(extension.defaultNumber);
	},
	initializeForm() {
		Form.$formObj = extension.$formObj;
		Form.url = `${globalRootUrl}extensions/save`;
		Form.validateRules = extension.validateRules;
		Form.cbBeforeSendForm = extension.cbBeforeSendForm;
		Form.cbAfterSendForm = extension.cbAfterSendForm;
		Form.initialize();
	},
};

const avatar = {
	$picture: $('#avatar'),
	initialize() {
		if (avatar.$picture.attr('src') === '') {
			avatar.$picture.attr('src', `${globalRootUrl}assets/img/unknownPerson.jpg`);
		}
		$('#upload-new-avatar').on('click', () => {
			$('#file-select').click();
		});

		$('#clear-avatar').on('click', () => {
			avatar.$picture.attr('src', `${globalRootUrl}assets/img/unknownPerson.jpg`);
			extension.$formObj.form('set value', 'user_avatar', null);
			extension.$sip_secret.trigger('change');
		});

		$('#file-select').on('change', (e) => {
			let image;
			e.preventDefault();
			const dataTransfer = 'dataTransfer' in e ? e.dataTransfer.files : [];
			const images = 'files' in e.target ? e.target.files : dataTransfer;
			if (images && images.length) {
				Array.from(images).forEach((curImage) => {
					if (typeof curImage !== 'object') return;
					image = new Image();
					image.src = avatar.createObjectURL(curImage);
					image.onload = (event) => {
						const args = {
							src: event.target,
							width: 200,
							height: 200,
							type: 'image/png',
							compress: 90,
						};
						const mybase64resized = avatar.resizeCrop(args);
						avatar.$picture.attr('src', mybase64resized);
						extension.$formObj.form('set value', 'user_avatar', mybase64resized);
						extension.$sip_secret.trigger('change');
					};
				});
			}
		});
	},
	resizeCrop({
		src, width, height, type, compress,
	}) {
		let newWidth = width;
		let newHeight = height;
		const crop = newWidth === 0 || newHeight === 0;
		// not resize
		if (src.width <= newWidth && newHeight === 0) {
			newWidth = src.width;
			newHeight = src.height;
		}
		// resize
		if (src.width > newWidth && newHeight === 0) {
			newHeight = src.height * (newWidth / src.width);
		}
		// check scale
		const xscale = newWidth / src.width;
		const yscale = newHeight / src.height;
		const scale = crop ? Math.min(xscale, yscale) : Math.max(xscale, yscale);
		// create empty canvas
		const canvas = document.createElement('canvas');
		canvas.width = newWidth || Math.round(src.width * scale);
		canvas.height = newHeight || Math.round(src.height * scale);
		canvas.getContext('2d').scale(scale, scale);
		// crop it top center
		canvas.getContext('2d').drawImage(src, ((src.width * scale) - canvas.width) * -0.5, ((src.height * scale) - canvas.height) * -0.5);
		return canvas.toDataURL(type, compress);
	},
	createObjectURL(i) {
		const URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
		return URL.createObjectURL(i);
	},

};


const extensionStatusLoopWorker = {
	timeOut: 3000,
	timeOutHandle: '',
	$statusLabel: $('#status'),
	/**
	 * initialize() создание объектов и запуск их
	 */
	initialize() {
		DebuggerInfo.initialize();
		if (extension.$formObj.form('get value','id')!==''){
			extensionStatusLoopWorker.restartWorker();
		}
	},
	restartWorker() {
		window.clearTimeout(extensionStatusLoopWorker.timeoutHandle);
		extensionStatusLoopWorker.worker();
	},
	worker() {
		if (extension.defaultNumber.length === 0) return;
		const param = { peer: extension.defaultNumber };
		window.clearTimeout(extensionStatusLoopWorker.timeoutHandle);
		PbxApi.GetPeerStatus(param, extensionStatusLoopWorker.cbRefreshExtensionStatus);
	},
	/**
	 * cbRefreshExtensionStatus() Обновление статусов пира
	 */
	cbRefreshExtensionStatus(response) {
		extensionStatusLoopWorker.timeoutHandle =
			window.setTimeout(extensionStatusLoopWorker.worker, extensionStatusLoopWorker.timeOut);
		if (response.length === 0 || response === false) return;
		const $status = extensionStatusLoopWorker.$statusLabel;

		let htmlTable = '<table class="ui very compact table">';
		$.each(response, (key, value) => {
			htmlTable += '<tr>';
			htmlTable += `<td>${key}</td>`;
			htmlTable += `<td>${value}</td>`;
			htmlTable += '</tr>';
		});
		htmlTable += '</table>';
		DebuggerInfo.UpdateContent(htmlTable);

		if ('Status' in response && response.Status.toUpperCase().indexOf('REACHABLE') >= 0) {
			$status.removeClass('grey').addClass('green');
		} else {
			$status.removeClass('green').addClass('grey');
		}
		if ($status.hasClass('green')) {
			$status.html(globalTranslate.ex_Online);
		} else {
			$status.html(globalTranslate.ex_Offline);
		}
	},
};

// Если выбран вариант переадресации на номер, а сам номер не выбран
$.fn.form.settings.rules.extensionRule = () => {
	const fwdRingLength = extension.$formObj.form('get value', 'fwd_ringlength');
	const fwdForwarding = extension.$formObj.form('get value', 'fwd_forwarding');
	if (fwdForwarding.length>0
		&& (
			fwdRingLength==='0'
			||
			fwdRingLength===''
		)) {
		return false;
	}
	return true;
};

// Проверка нет ли ошибки занятого другой учеткой номера
$.fn.form.settings.rules.existRule = (value, parameter) => $(`#${parameter}`).hasClass('hidden');

$(document).ready(() => {
	extension.initialize();
	avatar.initialize();
	extensionStatusLoopWorker.initialize();
});
