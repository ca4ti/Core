"use strict";

/*
 * MikoPBX - free phone system for small business
 * Copyright © 2017-2023 Alexey Portnov and Nikolay Beketov
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

/* global globalRootUrl,globalTranslate,Form */
var loginForm = {
  $formObj: $('#login-form'),
  $submitButton: $('#submitbutton'),
  $checkBoxes: $('.checkbox'),
  validateRules: {
    login: {
      identifier: 'login',
      rules: [{
        type: 'empty',
        prompt: globalTranslate.auth_ValidateLoginNotEmpty
      }]
    },
    password: {
      identifier: 'password',
      rules: [{
        type: 'empty',
        prompt: globalTranslate.auth_ValidatePasswordNotEmpty
      }]
    }
  },
  initialize: function initialize() {
    loginForm.initializeForm();
    $('input').keyup(function (event) {
      if (event.keyCode === 13) {
        loginForm.$submitButton.click();
      }
    }).on('input', function () {
      $('.message.ajax').remove();
    });
    loginForm.$checkBoxes.checkbox();
  },
  cbBeforeSendForm: function cbBeforeSendForm(settings) {
    var result = settings;
    result.data = loginForm.$formObj.form('get values');
    var backUri = "".concat(location.pathname).concat(location.search);
    result.data.backUri = backUri.replace(globalRootUrl, '');
    return result;
  },
  cbAfterSendForm: function cbAfterSendForm() {},
  initializeForm: function initializeForm() {
    Form.$formObj = loginForm.$formObj;
    Form.url = "".concat(globalRootUrl, "session/start");
    Form.validateRules = loginForm.validateRules;
    Form.cbBeforeSendForm = loginForm.cbBeforeSendForm;
    Form.cbAfterSendForm = loginForm.cbAfterSendForm;
    Form.keyboardShortcuts = false;
    Form.initialize();
  }
};
$(document).ready(function () {
  loginForm.initialize();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TZXNzaW9uL2xvZ2luLWZvcm0uanMiXSwibmFtZXMiOlsibG9naW5Gb3JtIiwiJGZvcm1PYmoiLCIkIiwiJHN1Ym1pdEJ1dHRvbiIsIiRjaGVja0JveGVzIiwidmFsaWRhdGVSdWxlcyIsImxvZ2luIiwiaWRlbnRpZmllciIsInJ1bGVzIiwidHlwZSIsInByb21wdCIsImdsb2JhbFRyYW5zbGF0ZSIsImF1dGhfVmFsaWRhdGVMb2dpbk5vdEVtcHR5IiwicGFzc3dvcmQiLCJhdXRoX1ZhbGlkYXRlUGFzc3dvcmROb3RFbXB0eSIsImluaXRpYWxpemUiLCJpbml0aWFsaXplRm9ybSIsImtleXVwIiwiZXZlbnQiLCJrZXlDb2RlIiwiY2xpY2siLCJvbiIsInJlbW92ZSIsImNoZWNrYm94IiwiY2JCZWZvcmVTZW5kRm9ybSIsInNldHRpbmdzIiwicmVzdWx0IiwiZGF0YSIsImZvcm0iLCJiYWNrVXJpIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInNlYXJjaCIsInJlcGxhY2UiLCJnbG9iYWxSb290VXJsIiwiY2JBZnRlclNlbmRGb3JtIiwiRm9ybSIsInVybCIsImtleWJvYXJkU2hvcnRjdXRzIiwiZG9jdW1lbnQiLCJyZWFkeSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBRUEsSUFBTUEsU0FBUyxHQUFHO0FBQ2pCQyxFQUFBQSxRQUFRLEVBQUVDLENBQUMsQ0FBQyxhQUFELENBRE07QUFFakJDLEVBQUFBLGFBQWEsRUFBRUQsQ0FBQyxDQUFDLGVBQUQsQ0FGQztBQUdqQkUsRUFBQUEsV0FBVyxFQUFFRixDQUFDLENBQUMsV0FBRCxDQUhHO0FBSWpCRyxFQUFBQSxhQUFhLEVBQUU7QUFDZEMsSUFBQUEsS0FBSyxFQUFFO0FBQ05DLE1BQUFBLFVBQVUsRUFBRSxPQUROO0FBRU5DLE1BQUFBLEtBQUssRUFBRSxDQUNOO0FBQ0NDLFFBQUFBLElBQUksRUFBRSxPQURQO0FBRUNDLFFBQUFBLE1BQU0sRUFBRUMsZUFBZSxDQUFDQztBQUZ6QixPQURNO0FBRkQsS0FETztBQVVkQyxJQUFBQSxRQUFRLEVBQUU7QUFDVE4sTUFBQUEsVUFBVSxFQUFFLFVBREg7QUFFVEMsTUFBQUEsS0FBSyxFQUFFLENBQ047QUFDQ0MsUUFBQUEsSUFBSSxFQUFFLE9BRFA7QUFFQ0MsUUFBQUEsTUFBTSxFQUFFQyxlQUFlLENBQUNHO0FBRnpCLE9BRE07QUFGRTtBQVZJLEdBSkU7QUF3QmpCQyxFQUFBQSxVQXhCaUIsd0JBd0JKO0FBQ1pmLElBQUFBLFNBQVMsQ0FBQ2dCLGNBQVY7QUFDQWQsSUFBQUEsQ0FBQyxDQUFDLE9BQUQsQ0FBRCxDQUNFZSxLQURGLENBQ1EsVUFBQ0MsS0FBRCxFQUFVO0FBQ2pCLFVBQUlBLEtBQUssQ0FBQ0MsT0FBTixLQUFrQixFQUF0QixFQUEwQjtBQUN6Qm5CLFFBQUFBLFNBQVMsQ0FBQ0csYUFBVixDQUF3QmlCLEtBQXhCO0FBQ0E7QUFDRCxLQUxELEVBTUVDLEVBTkYsQ0FNSyxPQU5MLEVBTWMsWUFBTTtBQUNuQm5CLE1BQUFBLENBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUJvQixNQUFuQjtBQUNBLEtBUkQ7QUFTQXRCLElBQUFBLFNBQVMsQ0FBQ0ksV0FBVixDQUFzQm1CLFFBQXRCO0FBQ0EsR0FwQ2dCO0FBcUNqQkMsRUFBQUEsZ0JBckNpQiw0QkFxQ0FDLFFBckNBLEVBcUNVO0FBQzFCLFFBQU1DLE1BQU0sR0FBR0QsUUFBZjtBQUNBQyxJQUFBQSxNQUFNLENBQUNDLElBQVAsR0FBYzNCLFNBQVMsQ0FBQ0MsUUFBVixDQUFtQjJCLElBQW5CLENBQXdCLFlBQXhCLENBQWQ7QUFDQSxRQUFJQyxPQUFPLGFBQU9DLFFBQVEsQ0FBQ0MsUUFBaEIsU0FBMkJELFFBQVEsQ0FBQ0UsTUFBcEMsQ0FBWDtBQUNBTixJQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWUUsT0FBWixHQUFzQkEsT0FBTyxDQUFDSSxPQUFSLENBQWdCQyxhQUFoQixFQUE4QixFQUE5QixDQUF0QjtBQUNBLFdBQU9SLE1BQVA7QUFDQSxHQTNDZ0I7QUE0Q2pCUyxFQUFBQSxlQTVDaUIsNkJBNENDLENBRWpCLENBOUNnQjtBQStDakJuQixFQUFBQSxjQS9DaUIsNEJBK0NBO0FBQ2hCb0IsSUFBQUEsSUFBSSxDQUFDbkMsUUFBTCxHQUFnQkQsU0FBUyxDQUFDQyxRQUExQjtBQUNBbUMsSUFBQUEsSUFBSSxDQUFDQyxHQUFMLGFBQWNILGFBQWQ7QUFDQUUsSUFBQUEsSUFBSSxDQUFDL0IsYUFBTCxHQUFxQkwsU0FBUyxDQUFDSyxhQUEvQjtBQUNBK0IsSUFBQUEsSUFBSSxDQUFDWixnQkFBTCxHQUF3QnhCLFNBQVMsQ0FBQ3dCLGdCQUFsQztBQUNBWSxJQUFBQSxJQUFJLENBQUNELGVBQUwsR0FBdUJuQyxTQUFTLENBQUNtQyxlQUFqQztBQUNBQyxJQUFBQSxJQUFJLENBQUNFLGlCQUFMLEdBQXlCLEtBQXpCO0FBQ0FGLElBQUFBLElBQUksQ0FBQ3JCLFVBQUw7QUFDQTtBQXZEZ0IsQ0FBbEI7QUEwREFiLENBQUMsQ0FBQ3FDLFFBQUQsQ0FBRCxDQUFZQyxLQUFaLENBQWtCLFlBQU07QUFDdkJ4QyxFQUFBQSxTQUFTLENBQUNlLFVBQVY7QUFDQSxDQUZEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIE1pa29QQlggLSBmcmVlIHBob25lIHN5c3RlbSBmb3Igc21hbGwgYnVzaW5lc3NcbiAqIENvcHlyaWdodCDCqSAyMDE3LTIwMjMgQWxleGV5IFBvcnRub3YgYW5kIE5pa29sYXkgQmVrZXRvdlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuLyogZ2xvYmFsIGdsb2JhbFJvb3RVcmwsZ2xvYmFsVHJhbnNsYXRlLEZvcm0gKi9cblxuY29uc3QgbG9naW5Gb3JtID0ge1xuXHQkZm9ybU9iajogJCgnI2xvZ2luLWZvcm0nKSxcblx0JHN1Ym1pdEJ1dHRvbjogJCgnI3N1Ym1pdGJ1dHRvbicpLFxuXHQkY2hlY2tCb3hlczogJCgnLmNoZWNrYm94JyksXG5cdHZhbGlkYXRlUnVsZXM6IHtcblx0XHRsb2dpbjoge1xuXHRcdFx0aWRlbnRpZmllcjogJ2xvZ2luJyxcblx0XHRcdHJ1bGVzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0eXBlOiAnZW1wdHknLFxuXHRcdFx0XHRcdHByb21wdDogZ2xvYmFsVHJhbnNsYXRlLmF1dGhfVmFsaWRhdGVMb2dpbk5vdEVtcHR5LFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHR9LFxuXHRcdHBhc3N3b3JkOiB7XG5cdFx0XHRpZGVudGlmaWVyOiAncGFzc3dvcmQnLFxuXHRcdFx0cnVsZXM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHR5cGU6ICdlbXB0eScsXG5cdFx0XHRcdFx0cHJvbXB0OiBnbG9iYWxUcmFuc2xhdGUuYXV0aF9WYWxpZGF0ZVBhc3N3b3JkTm90RW1wdHksXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdH0sXG5cdH0sXG5cdGluaXRpYWxpemUoKSB7XG5cdFx0bG9naW5Gb3JtLmluaXRpYWxpemVGb3JtKCk7XG5cdFx0JCgnaW5wdXQnKVxuXHRcdFx0LmtleXVwKChldmVudCk9PiB7XG5cdFx0XHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcblx0XHRcdFx0bG9naW5Gb3JtLiRzdWJtaXRCdXR0b24uY2xpY2soKTtcblx0XHRcdH1cblx0XHR9KVxuXHRcdFx0Lm9uKCdpbnB1dCcsICgpID0+IHtcblx0XHRcdCQoJy5tZXNzYWdlLmFqYXgnKS5yZW1vdmUoKTtcblx0XHR9KTtcblx0XHRsb2dpbkZvcm0uJGNoZWNrQm94ZXMuY2hlY2tib3goKTtcblx0fSxcblx0Y2JCZWZvcmVTZW5kRm9ybShzZXR0aW5ncykge1xuXHRcdGNvbnN0IHJlc3VsdCA9IHNldHRpbmdzO1xuXHRcdHJlc3VsdC5kYXRhID0gbG9naW5Gb3JtLiRmb3JtT2JqLmZvcm0oJ2dldCB2YWx1ZXMnKTtcblx0XHRsZXQgYmFja1VyaSAgPSBgJHtsb2NhdGlvbi5wYXRobmFtZX0ke2xvY2F0aW9uLnNlYXJjaH1gO1xuXHRcdHJlc3VsdC5kYXRhLmJhY2tVcmkgPSBiYWNrVXJpLnJlcGxhY2UoZ2xvYmFsUm9vdFVybCwnJyk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblx0Y2JBZnRlclNlbmRGb3JtKCkge1xuXG5cdH0sXG5cdGluaXRpYWxpemVGb3JtKCkge1xuXHRcdEZvcm0uJGZvcm1PYmogPSBsb2dpbkZvcm0uJGZvcm1PYmo7XG5cdFx0Rm9ybS51cmwgPSBgJHtnbG9iYWxSb290VXJsfXNlc3Npb24vc3RhcnRgO1xuXHRcdEZvcm0udmFsaWRhdGVSdWxlcyA9IGxvZ2luRm9ybS52YWxpZGF0ZVJ1bGVzO1xuXHRcdEZvcm0uY2JCZWZvcmVTZW5kRm9ybSA9IGxvZ2luRm9ybS5jYkJlZm9yZVNlbmRGb3JtO1xuXHRcdEZvcm0uY2JBZnRlclNlbmRGb3JtID0gbG9naW5Gb3JtLmNiQWZ0ZXJTZW5kRm9ybTtcblx0XHRGb3JtLmtleWJvYXJkU2hvcnRjdXRzID0gZmFsc2U7XG5cdFx0Rm9ybS5pbml0aWFsaXplKCk7XG5cdH0sXG59O1xuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG5cdGxvZ2luRm9ybS5pbml0aWFsaXplKCk7XG59KTtcblxuIl19