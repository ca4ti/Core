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

/* global globalTranslate, PbxApi, DebuggerInfo */
var providersStatusLoopWorker = {
  timeOut: 3000,
  $formObj: $('#save-provider-form'),
  timeOutHandle: '',
  $status: $('#status'),
  initialize: function initialize() {
    // Запустим обновление статуса провайдера
    DebuggerInfo.initialize();
    providersStatusLoopWorker.restartWorker();
  },
  restartWorker: function restartWorker() {
    window.clearTimeout(providersStatusLoopWorker.timeoutHandle);
    providersStatusLoopWorker.worker();
  },
  worker: function worker() {
    window.clearTimeout(providersStatusLoopWorker.timeoutHandle);

    switch (provider.providerType) {
      case 'SIP':
        PbxApi.GetSipProvidersStatuses(providersStatusLoopWorker.cbRefreshProvidersStatus);
        break;

      case 'IAX':
        PbxApi.GetIaxProvidersStatuses(providersStatusLoopWorker.cbRefreshProvidersStatus);
        break;

      default:
    }
  },
  cbRefreshProvidersStatus: function cbRefreshProvidersStatus(response) {
    providersStatusLoopWorker.timeoutHandle = window.setTimeout(providersStatusLoopWorker.worker, providersStatusLoopWorker.timeOut);
    if (response.length === 0 || response === false) return;
    var htmlTable = '<table class="ui very compact table">';
    $.each(response, function (key, value) {
      htmlTable += '<tr>';
      htmlTable += "<td>".concat(value.id, "</td>");
      htmlTable += "<td>".concat(value.state, "</td>");
      htmlTable += '</tr>';
    });
    htmlTable += '</table>';
    DebuggerInfo.UpdateContent(htmlTable);
    var uniqid = providersStatusLoopWorker.$formObj.form('get value', 'uniqid');
    var result = $.grep(response, function (e) {
      var respid = e.id;
      return respid.toUpperCase() === uniqid.toUpperCase();
    });

    if (result.length === 0) {
      // not found
      providersStatusLoopWorker.$status.removeClass('green').removeClass('yellow').addClass('grey');
    } else if (result[0] !== undefined && result[0].state.toUpperCase() === 'REGISTERED') {
      providersStatusLoopWorker.$status.removeClass('grey').removeClass('yellow').addClass('green');
    } else if (result[0] !== undefined && result[0].state.toUpperCase() === 'OK') {
      providersStatusLoopWorker.$status.removeClass('grey').removeClass('green').addClass('yellow');
    } else {
      providersStatusLoopWorker.$status.removeClass('green').removeClass('yellow').addClass('grey');
    }

    if (providersStatusLoopWorker.$status.hasClass('green')) {
      providersStatusLoopWorker.$status.html(globalTranslate.pr_Online);
    } else if (providersStatusLoopWorker.$status.hasClass('yellow')) {
      providersStatusLoopWorker.$status.html(globalTranslate.pr_WithoutRegistration);
    } else {
      providersStatusLoopWorker.$status.html(globalTranslate.pr_Offline);
    }
  }
};
$(document).ready(function () {
  providersStatusLoopWorker.initialize();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Qcm92aWRlcnMvcHJvdmlkZXItbW9kaWZ5LXN0YXR1cy13b3JrZXIuanMiXSwibmFtZXMiOlsicHJvdmlkZXJzU3RhdHVzTG9vcFdvcmtlciIsInRpbWVPdXQiLCIkZm9ybU9iaiIsIiQiLCJ0aW1lT3V0SGFuZGxlIiwiJHN0YXR1cyIsImluaXRpYWxpemUiLCJEZWJ1Z2dlckluZm8iLCJyZXN0YXJ0V29ya2VyIiwid2luZG93IiwiY2xlYXJUaW1lb3V0IiwidGltZW91dEhhbmRsZSIsIndvcmtlciIsInByb3ZpZGVyIiwicHJvdmlkZXJUeXBlIiwiUGJ4QXBpIiwiR2V0U2lwUHJvdmlkZXJzU3RhdHVzZXMiLCJjYlJlZnJlc2hQcm92aWRlcnNTdGF0dXMiLCJHZXRJYXhQcm92aWRlcnNTdGF0dXNlcyIsInJlc3BvbnNlIiwic2V0VGltZW91dCIsImxlbmd0aCIsImh0bWxUYWJsZSIsImVhY2giLCJrZXkiLCJ2YWx1ZSIsImlkIiwic3RhdGUiLCJVcGRhdGVDb250ZW50IiwidW5pcWlkIiwiZm9ybSIsInJlc3VsdCIsImdyZXAiLCJlIiwicmVzcGlkIiwidG9VcHBlckNhc2UiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidW5kZWZpbmVkIiwiaGFzQ2xhc3MiLCJodG1sIiwiZ2xvYmFsVHJhbnNsYXRlIiwicHJfT25saW5lIiwicHJfV2l0aG91dFJlZ2lzdHJhdGlvbiIsInByX09mZmxpbmUiLCJkb2N1bWVudCIsInJlYWR5Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFFQSxJQUFNQSx5QkFBeUIsR0FBRztBQUNqQ0MsRUFBQUEsT0FBTyxFQUFFLElBRHdCO0FBRWpDQyxFQUFBQSxRQUFRLEVBQUVDLENBQUMsQ0FBQyxxQkFBRCxDQUZzQjtBQUdqQ0MsRUFBQUEsYUFBYSxFQUFFLEVB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Q0FBQyxDQUFELENBQU4sS0FBY08sU0FBZCxJQUEyQlAsTUFBTSxDQUFDLENBQUQsQ0FBTixDQUFVSixLQUFWLENBQWdCUSxXQUFoQixPQUFrQyxJQUFqRSxFQUF1RTtBQUM3RW5DLE1BQUFBLHlCQUF5QixDQUFDSyxPQUExQixDQUFrQytCLFdBQWxDLENBQThDLE1BQTlDLEVBQXNEQSxXQUF0RCxDQUFrRSxPQUFsRSxFQUEyRUMsUUFBM0UsQ0FBb0YsUUFBcEY7QUFDQSxLQUZNLE1BRUE7QUFDTnJDLE1BQUFBLHlCQUF5QixDQUFDSyxPQUExQixDQUFrQytCLFdBQWxDLENBQThDLE9BQTlDLEVBQXVEQSxXQUF2RCxDQUFtRSxRQUFuRSxFQUE2RUMsUUFBN0UsQ0FBc0YsTUFBdEY7QUFDQTs7QUFFRCxRQUFJckMseUJBQXlCLENBQUNLLE9BQTFCLENBQWtDa0MsUUFBbEMsQ0FBMkMsT0FBM0MsQ0FBSixFQUF5RDtBQUN4RHZDLE1BQUFBLHlCQUF5QixDQUFDSyxPQUExQixDQUFrQ21DLElBQWxDLENBQXVDQyxlQUFlLENBQUNDLFNBQXZEO0FBQ0EsS0FGRCxNQUVPLElBQUkxQyx5QkFBeUIsQ0FBQ0ssT0FBMUIsQ0FBa0NrQyxRQUFsQyxDQUEyQyxRQUEzQyxDQUFKLEVBQTBEO0FBQ2hFdkMsTUFBQUEseUJBQXlCLENBQUNLLE9BQTFCLENBQWtDbUMsSUFBbEMsQ0FBdUNDLGVBQWUsQ0FBQ0Usc0JBQXZEO0FBQ0EsS0FGTSxNQUVBO0FBQ04zQyxNQUFBQSx5QkFBeUIsQ0FBQ0ssT0FBMUIsQ0FBa0NtQyxJQUFsQyxDQUF1Q0MsZUFBZSxDQUFDRyxVQUF2RDtBQUNBO0FBQ0Q7QUE5RGdDLENBQWxDO0FBa0VBekMsQ0FBQyxDQUFDMEMsUUFBRCxDQUFELENBQVlDLEtBQVosQ0FBa0IsWUFBTTtBQUN2QjlDLEVBQUFBLHlCQUF5QixDQUFDTSxVQUExQjtBQUNBLENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogTWlrb1BCWCAtIGZyZWUgcGhvbmUgc3lzdGVtIGZvciBzbWFsbCBidXNpbmVzc1xuICogQ29weXJpZ2h0IMKpIDIwMTctMjAyMyBBbGV4ZXkgUG9ydG5vdiBhbmQgTmlrb2xheSBCZWtldG92XG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLlxuICogSWYgbm90LCBzZWUgPGh0dHBzOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG4vKiBnbG9iYWwgZ2xvYmFsVHJhbnNsYXRlLCBQYnhBcGksIERlYnVnZ2VySW5mbyAqL1xuXG5jb25zdCBwcm92aWRlcnNTdGF0dXNMb29wV29ya2VyID0ge1xuXHR0aW1lT3V0OiAzMDAwLFxuXHQkZm9ybU9iajogJCgnI3NhdmUtcHJvdmlkZXItZm9ybScpLFxuXHR0aW1lT3V0SGFuZGxlOiAnJyxcblx0JHN0YXR1czogJCgnI3N0YXR1cycpLFxuXHRpbml0aWFsaXplKCkge1xuXHRcdC8vINCX0LDQv9GD0YHRgtC40Lwg0L7QsdC90L7QstC70LXQvdC40LUg0YHRgtCw0YLRg9GB0LAg0L/RgNC+0LLQsNC50LTQtdGA0LBcblx0XHREZWJ1Z2dlckluZm8uaW5pdGlhbGl6ZSgpO1xuXHRcdHByb3ZpZGVyc1N0YXR1c0xvb3BXb3JrZXIucmVzdGFydFdvcmtlcigpO1xuXHR9LFxuXHRyZXN0YXJ0V29ya2VyKCkge1xuXHRcdHdpbmRvdy5jbGVhclRpbWVvdXQocHJvdmlkZXJzU3RhdHVzTG9vcFdvcmtlci50aW1lb3V0SGFuZGxlKTtcblx0XHRwcm92aWRlcnNTdGF0dXNMb29wV29ya2VyLndvcmtlcigpO1xuXHR9LFxuXHR3b3JrZXIoKSB7XG5cdFx0d2luZG93LmNsZWFyVGltZW91dChwcm92aWRlcnNTdGF0dXNMb29wV29ya2VyLnRpbWVvdXRIYW5kbGUpO1xuXHRcdHN3aXRjaCAocHJvdmlkZXIucHJvdmlkZXJUeXBlKSB7XG5cdFx0XHRjYXNlICdTSVAnOlxuXHRcdFx0XHRQYnhBcGkuR2V0U2lwUHJvdmlkZXJzU3RhdHVzZXMocHJvdmlkZXJzU3RhdHVzTG9vcFdvcmtlci5jYlJlZnJlc2hQcm92aWRlcnNTdGF0dXMpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ0lBWCc6XG5cdFx0XHRcdFBieEFwaS5HZXRJYXhQcm92aWRlcnNTdGF0dXNlcyhwcm92aWRlcnNTdGF0dXNMb29wV29ya2VyLmNiUmVmcmVzaFByb3ZpZGVyc1N0YXR1cyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHR9XG5cdH0sXG5cdGNiUmVmcmVzaFByb3ZpZGVyc1N0YXR1cyhyZXNwb25zZSkge1xuXHRcdHByb3ZpZGVyc1N0YXR1c0xvb3BXb3JrZXIudGltZW91dEhhbmRsZSA9XG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dChwcm92aWRlcnNTdGF0dXNMb29wV29ya2VyLndvcmtlciwgcHJvdmlkZXJzU3RhdHVzTG9vcFdvcmtlci50aW1lT3V0KTtcblx0XHRpZiAocmVzcG9uc2UubGVuZ3RoID09PSAwIHx8IHJlc3BvbnNlID09PSBmYWxzZSkgcmV0dXJuO1xuXHRcdGxldCBodG1sVGFibGUgPSAnPHRhYmxlIGNsYXNzPVwidWkgdmVyeSBjb21wYWN0IHRhYmxlXCI+Jztcblx0XHQkLmVhY2gocmVzcG9uc2UsIChrZXksIHZhbHVlKSA9PiB7XG5cdFx0XHRodG1sVGFibGUgKz0gJzx0cj4nO1xuXHRcdFx0aHRtbFRhYmxlICs9IGA8dGQ+JHt2YWx1ZS5pZH08L3RkPmA7XG5cdFx0XHRodG1sVGFibGUgKz0gYDx0ZD4ke3ZhbHVlLnN0YXRlfTwvdGQ+YDtcblx0XHRcdGh0bWxUYWJsZSArPSAnPC90cj4nO1xuXHRcdH0pO1xuXHRcdGh0bWxUYWJsZSArPSAnPC90YWJsZT4nO1xuXHRcdERlYnVnZ2VySW5mby5VcGRhdGVDb250ZW50KGh0bWxUYWJsZSk7XG5cdFx0Y29uc3QgdW5pcWlkID0gcHJvdmlkZXJzU3RhdHVzTG9vcFdvcmtlci4kZm9ybU9iai5mb3JtKCdnZXQgdmFsdWUnLCAndW5pcWlkJyk7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5ncmVwKHJlc3BvbnNlLCAoZSkgPT4ge1xuXHRcdFx0Y29uc3QgcmVzcGlkID0gZS5pZDtcblx0XHRcdHJldHVybiByZXNwaWQudG9VcHBlckNhc2UoKSA9PT0gdW5pcWlkLnRvVXBwZXJDYXNlKCk7XG5cdFx0fSk7XG5cdFx0aWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcblx0XHRcdC8vIG5vdCBmb3VuZFxuXHRcdFx0cHJvdmlkZXJzU3RhdHVzTG9vcFdvcmtlci4kc3RhdHVzLnJlbW92ZUNsYXNzKCdncmVlbicpLnJlbW92ZUNsYXNzKCd5ZWxsb3cnKS5hZGRDbGFzcygnZ3JleScpO1xuXHRcdH0gZWxzZSBpZiAocmVzdWx0WzBdICE9PSB1bmRlZmluZWQgJiYgcmVzdWx0WzBdLnN0YXRlLnRvVXBwZXJDYXNlKCkgPT09ICdSRUdJU1RFUkVEJykge1xuXHRcdFx0cHJvdmlkZXJzU3RhdHVzTG9vcFdvcmtlci4kc3RhdHVzLnJlbW92ZUNsYXNzKCdncmV5JykucmVtb3ZlQ2xhc3MoJ3llbGxvdycpLmFkZENsYXNzKCdncmVlbicpO1xuXHRcdH0gZWxzZSBpZiAocmVzdWx0WzBdICE9PSB1bmRlZmluZWQgJiYgcmVzdWx0WzBdLnN0YXRlLnRvVXBwZXJDYXNlKCkgPT09ICdPSycpIHtcblx0XHRcdHByb3ZpZGVyc1N0YXR1c0xvb3BXb3JrZXIuJHN0YXR1cy5yZW1vdmVDbGFzcygnZ3JleScpLnJlbW92ZUNsYXNzKCdncmVlbicpLmFkZENsYXNzKCd5ZWxsb3cnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cHJvdmlkZXJzU3RhdHVzTG9vcFdvcmtlci4kc3RhdHVzLnJlbW92ZUNsYXNzKCdncmVlbicpLnJlbW92ZUNsYXNzKCd5ZWxsb3cnKS5hZGRDbGFzcygnZ3JleScpO1xuXHRcdH1cblxuXHRcdGlmIChwcm92aWRlcnNTdGF0dXNMb29wV29ya2VyLiRzdGF0dXMuaGFzQ2xhc3MoJ2dyZWVuJykpIHtcblx0XHRcdHByb3ZpZGVyc1N0YXR1c0xvb3BXb3JrZXIuJHN0YXR1cy5odG1sKGdsb2JhbFRyYW5zbGF0ZS5wcl9PbmxpbmUpO1xuXHRcdH0gZWxzZSBpZiAocHJvdmlkZXJzU3RhdHVzTG9vcFdvcmtlci4kc3RhdHVzLmhhc0NsYXNzKCd5ZWxsb3cnKSkge1xuXHRcdFx0cHJvdmlkZXJzU3RhdHVzTG9vcFdvcmtlci4kc3RhdHVzLmh0bWwoZ2xvYmFsVHJhbnNsYXRlLnByX1dpdGhvdXRSZWdpc3RyYXRpb24pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwcm92aWRlcnNTdGF0dXNMb29wV29ya2VyLiRzdGF0dXMuaHRtbChnbG9iYWxUcmFuc2xhdGUucHJfT2ZmbGluZSk7XG5cdFx0fVxuXHR9LFxufTtcblxuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG5cdHByb3ZpZGVyc1N0YXR1c0xvb3BXb3JrZXIuaW5pdGlhbGl6ZSgpO1xufSk7Il19