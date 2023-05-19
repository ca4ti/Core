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

/* global sessionStorage, ace, PbxApi */
var systemDiagnostic = {
  $tabMenuItems: $('#system-diagnostic-menu .item'),
  $mainContainer: $('#main-content-container'),
  initialize: function initialize() {
    systemDiagnostic.$tabMenuItems.tab();
    systemDiagnostic.$tabMenuItems.tab('change tab', 'show-log');
    systemDiagnostic.$mainContainer.removeClass('container');
  }
};
$(document).ready(function () {
  systemDiagnostic.initialize();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TeXN0ZW1EaWFnbm9zdGljL3N5c3RlbS1kaWFnbm9zdGljLWluZGV4LmpzIl0sIm5hbWVzIjpbInN5c3RlbURpYWdub3N0aWMiLCIkdGFiTWVudUl0ZW1zIiwiJCIsIiRtYWluQ29udGFpbmVyIiwiaW5pdGlhbGl6ZSIsInRhYiIsInJlbW92ZUNsYXNzIiwiZG9jdW1lbnQiLCJyZWFkeSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBRUEsSUFBTUEsZ0JBQWdCLEdBQUc7QUFDeEJDLEVBQUFBLGFBQWEsRUFBRUMsQ0FBQyxDQUFDLCtCQUFELENBRFE7QUFFeEJDLEVBQUFBLGNBQWMsRUFBRUQsQ0FBQyxDQUFDLHlCQUFELENBRk87QUFHeEJFLEVBQUFBLFVBSHdCLHdCQUdYO0FBQ1pKLElBQUFBLGdCQUFnQixDQUFDQyxhQUFqQixDQUErQkksR0FBL0I7QUFDQUwsSUFBQUEsZ0JBQWdCLENBQUNDLGFBQWpCLENBQStCSSxHQUEvQixDQUFtQyxZQUFuQyxFQUFpRCxVQUFqRDtBQUNBTCxJQUFBQSxnQkFBZ0IsQ0FBQ0csY0FBakIsQ0FBZ0NHLFdBQWhDLENBQTRDLFdBQTVDO0FBQ0E7QUFQdUIsQ0FBekI7QUFVQUosQ0FBQyxDQUFDSyxRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFNO0FBQ3ZCUixFQUFBQSxnQkFBZ0IsQ0FBQ0ksVUFBakI7QUFDQSxDQUZEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIE1pa29QQlggLSBmcmVlIHBob25lIHN5c3RlbSBmb3Igc21hbGwgYnVzaW5lc3NcbiAqIENvcHlyaWdodCDCqSAyMDE3LTIwMjMgQWxleGV5IFBvcnRub3YgYW5kIE5pa29sYXkgQmVrZXRvdlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbi8qIGdsb2JhbCBzZXNzaW9uU3RvcmFnZSwgYWNlLCBQYnhBcGkgKi9cblxuY29uc3Qgc3lzdGVtRGlhZ25vc3RpYyA9IHtcblx0JHRhYk1lbnVJdGVtczogJCgnI3N5c3RlbS1kaWFnbm9zdGljLW1lbnUgLml0ZW0nKSxcblx0JG1haW5Db250YWluZXI6ICQoJyNtYWluLWNvbnRlbnQtY29udGFpbmVyJyksXG5cdGluaXRpYWxpemUoKSB7XG5cdFx0c3lzdGVtRGlhZ25vc3RpYy4kdGFiTWVudUl0ZW1zLnRhYigpO1xuXHRcdHN5c3RlbURpYWdub3N0aWMuJHRhYk1lbnVJdGVtcy50YWIoJ2NoYW5nZSB0YWInLCAnc2hvdy1sb2cnKTtcblx0XHRzeXN0ZW1EaWFnbm9zdGljLiRtYWluQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdjb250YWluZXInKTtcblx0fSxcbn07XG5cbiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcblx0c3lzdGVtRGlhZ25vc3RpYy5pbml0aWFsaXplKCk7XG59KTtcblxuIl19