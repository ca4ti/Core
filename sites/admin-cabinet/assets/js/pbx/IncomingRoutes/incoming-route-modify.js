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

/* global globalRootUrl,globalTranslate, Extensions, Form */
var incomingRouteModify = {
  $formObj: $('#incoming-route-form'),
  $providerDropDown: $('#provider'),
  $forwardingSelectDropdown: $('#incoming-route-form .forwarding-select'),
  validateRules: {
    extension: {
      identifier: 'extension',
      rules: [{
        type: 'empty',
        prompt: globalTranslate.ir_ValidateForwardingToBeFilled
      }]
    },
    timeout: {
      identifier: 'timeout',
      rules: [{
        type: 'integer[3..600]',
        prompt: globalTranslate.ir_ValidateTimeoutOutOfRange
      }]
    }
  },
  initialize: function initialize() {
    incomingRouteModify.$providerDropDown.dropdown();
    incomingRouteModify.initializeForm();
    incomingRouteModify.$forwardingSelectDropdown.dropdown(Extensions.getDropdownSettingsForRouting());
  },
  cbBeforeSendForm: function cbBeforeSendForm(settings) {
    var result = settings;
    result.data = incomingRouteModify.$formObj.form('get values');
    return result;
  },
  cbAfterSendForm: function cbAfterSendForm() {},
  initializeForm: function initializeForm() {
    Form.$formObj = incomingRouteModify.$formObj;
    Form.url = "".concat(globalRootUrl, "incoming-routes/save");
    Form.validateRules = incomingRouteModify.validateRules;
    Form.cbBeforeSendForm = incomingRouteModify.cbBeforeSendForm;
    Form.cbAfterSendForm = incomingRouteModify.cbAfterSendForm;
    Form.initialize();
  }
};
$(document).ready(function () {
  incomingRouteModify.initialize();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9JbmNvbWluZ1JvdXRlcy9pbmNvbWluZy1yb3V0ZS1tb2RpZnkuanMiXSwibmFtZXMiOlsiaW5jb21pbmdSb3V0ZU1vZGlmeSIsIiRmb3JtT2JqIiwiJCIsIiRwcm92aWRlckRyb3BEb3duIiwiJGZvcndhcmRpbmdTZWxlY3REcm9wZG93biIsInZhbGlkYXRlUnVsZXMiLCJleHRlbnNpb24iLCJpZGVudGlmaWVyIiwicnVsZXMiLCJ0eXBlIiwicHJvbXB0IiwiZ2xvYmFsVHJhbnNsYXRlIiwiaXJfVmFsaWRhdGVGb3J3YXJkaW5nVG9CZUZpbGxlZCIsInRpbWVvdXQiLCJpcl9WYWxpZGF0ZVRpbWVvdXRPdXRPZlJhbmdlIiwiaW5pdGlhbGl6ZSIsImRyb3Bkb3duIiwiaW5pdGlhbGl6ZUZvcm0iLCJFeHRlbnNpb25zIiwiZ2V0RHJvcGRvd25TZXR0aW5nc0ZvclJvdXRpbmciLCJjYkJlZm9yZVNlbmRGb3JtIiwic2V0dGluZ3MiLCJyZXN1bHQiLCJkYXRhIiwiZm9ybSIsImNiQWZ0ZXJTZW5kRm9ybSIsIkZvcm0iLCJ1cmwiLCJnbG9iYWxSb290VXJsIiwiZG9jdW1lbnQiLCJyZWFkeSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBRUEsSUFBTUEsbUJBQW1CLEdBQUc7QUFDM0JDLEVBQUFBLFFBQVEsRUFBRUMsQ0FBQyxDQUFDLHNCQUFELENBRGdCO0FBRTNCQyxFQUFBQSxpQkFBaUIsRUFBRUQsQ0FBQyxDQUFDLFdBQUQsQ0FGTztBQUczQkUsRUFBQUEseUJBQXlCLEVBQUVGLENBQUMsQ0FBQyx5Q0FBRCxDQUhEO0FBSTNCRyxFQUFBQSxhQUFhLEVBQUU7QUFDZEMsSUFBQUEsU0FBUyxFQUFFO0FBQ1ZDLE1BQUFBLFVBQVUsRUFBRSxXQURGO0FBRVZDLE1BQUFBLEtBQUssRUFBRSxDQUNOO0FBQ0NDLFFBQUFBLElBQUksRUFBRSxPQURQO0FBRUNDLFFBQUFBLE1BQU0sRUFBRUMsZUFBZSxDQUFDQztBQUZ6QixPQURNO0FBRkcsS0FERztBQVVkQyxJQUFBQSxPQUFPLEVBQUU7QUFDUk4sTUFBQUEsVUFBVSxFQUFFLFNBREo7QUFFUkMsTUFBQUEsS0FBSyxFQUFFLENBQ047QUFDQ0MsUUFBQUEsSUFBSSxFQUFFLGlCQURQO0FBRUNDLFFBQUFBLE1BQU0sRUFBRUMsZUFBZSxDQUFDRztBQUZ6QixPQURNO0FBRkM7QUFWSyxHQUpZO0FBd0IzQkMsRUFBQUEsVUF4QjJCLHdCQXdCZDtBQUNaZixJQUFBQSxtQkFBbUIsQ0FBQ0csaUJBQXBCLENBQXNDYSxRQUF0QztBQUNBaEIsSUFBQUEsbUJBQW1CLENBQUNpQixjQUFwQjtBQUNBakIsSUFBQUEsbUJBQW1CLENBQUNJLHlCQUFwQixDQUE4Q1ksUUFBOUMsQ0FBdURFLFVBQVUsQ0FBQ0MsNkJBQVgsRUFBdkQ7QUFDQSxHQTVCMEI7QUE2QjNCQyxFQUFBQSxnQkE3QjJCLDRCQTZCVkMsUUE3QlUsRUE2QkE7QUFDMUIsUUFBTUMsTUFBTSxHQUFHRCxRQUFmO0FBQ0FDLElBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxHQUFjdkIsbUJBQW1CLENBQUNDLFFBQXBCLENBQTZCdUIsSUFBN0IsQ0FBa0MsWUFBbEMsQ0FBZDtBQUNBLFdBQU9GLE1BQVA7QUFDQSxHQWpDMEI7QUFrQzNCRyxFQUFBQSxlQWxDMkIsNkJBa0NULENBRWpCLENBcEMwQjtBQXFDM0JSLEVBQUFBLGNBckMyQiw0QkFxQ1Y7QUFDaEJTLElBQUFBLElBQUksQ0FBQ3pCLFFBQUwsR0FBZ0JELG1CQUFtQixDQUFDQyxRQUFwQztBQUNBeUIsSUFBQUEsSUFBSSxDQUFDQyxHQUFMLGFBQWNDLGFBQWQ7QUFDQUYsSUFBQUEsSUFBSSxDQUFDckIsYUFBTCxHQUFxQkwsbUJBQW1CLENBQUNLLGFBQXpDO0FBQ0FxQixJQUFBQSxJQUFJLENBQUNOLGdCQUFMLEdBQXdCcEIsbUJBQW1CLENBQUNvQixnQkFBNUM7QUFDQU0sSUFBQUEsSUFBSSxDQUFDRCxlQUFMLEdBQXVCekIsbUJBQW1CLENBQUN5QixlQUEzQztBQUNBQyxJQUFBQSxJQUFJLENBQUNYLFVBQUw7QUFDQTtBQTVDMEIsQ0FBNUI7QUErQ0FiLENBQUMsQ0FBQzJCLFFBQUQsQ0FBRCxDQUFZQyxLQUFaLENBQWtCLFlBQU07QUFDdkI5QixFQUFBQSxtQkFBbUIsQ0FBQ2UsVUFBcEI7QUFDQSxDQUZEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIE1pa29QQlggLSBmcmVlIHBob25lIHN5c3RlbSBmb3Igc21hbGwgYnVzaW5lc3NcbiAqIENvcHlyaWdodCDCqSAyMDE3LTIwMjMgQWxleGV5IFBvcnRub3YgYW5kIE5pa29sYXkgQmVrZXRvdlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuLyogZ2xvYmFsIGdsb2JhbFJvb3RVcmwsZ2xvYmFsVHJhbnNsYXRlLCBFeHRlbnNpb25zLCBGb3JtICovXG5cbmNvbnN0IGluY29taW5nUm91dGVNb2RpZnkgPSB7XG5cdCRmb3JtT2JqOiAkKCcjaW5jb21pbmctcm91dGUtZm9ybScpLFxuXHQkcHJvdmlkZXJEcm9wRG93bjogJCgnI3Byb3ZpZGVyJyksXG5cdCRmb3J3YXJkaW5nU2VsZWN0RHJvcGRvd246ICQoJyNpbmNvbWluZy1yb3V0ZS1mb3JtIC5mb3J3YXJkaW5nLXNlbGVjdCcpLFxuXHR2YWxpZGF0ZVJ1bGVzOiB7XG5cdFx0ZXh0ZW5zaW9uOiB7XG5cdFx0XHRpZGVudGlmaWVyOiAnZXh0ZW5zaW9uJyxcblx0XHRcdHJ1bGVzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0eXBlOiAnZW1wdHknLFxuXHRcdFx0XHRcdHByb21wdDogZ2xvYmFsVHJhbnNsYXRlLmlyX1ZhbGlkYXRlRm9yd2FyZGluZ1RvQmVGaWxsZWQsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdH0sXG5cdFx0dGltZW91dDoge1xuXHRcdFx0aWRlbnRpZmllcjogJ3RpbWVvdXQnLFxuXHRcdFx0cnVsZXM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHR5cGU6ICdpbnRlZ2VyWzMuLjYwMF0nLFxuXHRcdFx0XHRcdHByb21wdDogZ2xvYmFsVHJhbnNsYXRlLmlyX1ZhbGlkYXRlVGltZW91dE91dE9mUmFuZ2UsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdH0sXG5cdH0sXG5cdGluaXRpYWxpemUoKSB7XG5cdFx0aW5jb21pbmdSb3V0ZU1vZGlmeS4kcHJvdmlkZXJEcm9wRG93bi5kcm9wZG93bigpO1xuXHRcdGluY29taW5nUm91dGVNb2RpZnkuaW5pdGlhbGl6ZUZvcm0oKTtcblx0XHRpbmNvbWluZ1JvdXRlTW9kaWZ5LiRmb3J3YXJkaW5nU2VsZWN0RHJvcGRvd24uZHJvcGRvd24oRXh0ZW5zaW9ucy5nZXREcm9wZG93blNldHRpbmdzRm9yUm91dGluZygpKTtcblx0fSxcblx0Y2JCZWZvcmVTZW5kRm9ybShzZXR0aW5ncykge1xuXHRcdGNvbnN0IHJlc3VsdCA9IHNldHRpbmdzO1xuXHRcdHJlc3VsdC5kYXRhID0gaW5jb21pbmdSb3V0ZU1vZGlmeS4kZm9ybU9iai5mb3JtKCdnZXQgdmFsdWVzJyk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblx0Y2JBZnRlclNlbmRGb3JtKCkge1xuXG5cdH0sXG5cdGluaXRpYWxpemVGb3JtKCkge1xuXHRcdEZvcm0uJGZvcm1PYmogPSBpbmNvbWluZ1JvdXRlTW9kaWZ5LiRmb3JtT2JqO1xuXHRcdEZvcm0udXJsID0gYCR7Z2xvYmFsUm9vdFVybH1pbmNvbWluZy1yb3V0ZXMvc2F2ZWA7XG5cdFx0Rm9ybS52YWxpZGF0ZVJ1bGVzID0gaW5jb21pbmdSb3V0ZU1vZGlmeS52YWxpZGF0ZVJ1bGVzO1xuXHRcdEZvcm0uY2JCZWZvcmVTZW5kRm9ybSA9IGluY29taW5nUm91dGVNb2RpZnkuY2JCZWZvcmVTZW5kRm9ybTtcblx0XHRGb3JtLmNiQWZ0ZXJTZW5kRm9ybSA9IGluY29taW5nUm91dGVNb2RpZnkuY2JBZnRlclNlbmRGb3JtO1xuXHRcdEZvcm0uaW5pdGlhbGl6ZSgpO1xuXHR9LFxufTtcblxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuXHRpbmNvbWluZ1JvdXRlTW9kaWZ5LmluaXRpYWxpemUoKTtcbn0pO1xuIl19