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
var DebuggerInfo = {
  $debugInfoDiv: $('#debug-info'),
  delta: 500,
  lastKeypressTime: 0,
  initialize: function initialize() {
    DebuggerInfo.$debugInfoDiv.addClass('ui right very wide sidebar');
    window.$(document).on('keydown', function (event) {
      DebuggerInfo.keyHandler(event);
    });
  },
  UpdateContent: function UpdateContent(newContent) {
    // let newHtml = `<h2>${globalTranslate.dbg_Header}</h2>`;
    // newHtml += newContent;
    DebuggerInfo.$debugInfoDiv.html(newContent);
  },
  showSidebar: function showSidebar() {
    if (DebuggerInfo.$debugInfoDiv.html().length === 0) return;
    DebuggerInfo.$debugInfoDiv.sidebar({
      transition: 'overlay',
      dimPage: false
    }).sidebar('toggle');
  },
  keyHandler: function keyHandler(event) {
    // Double press to ESC will show the debug information
    if (event.keyCode === 27) {
      var thisKeypressTime = new Date();

      if (thisKeypressTime - DebuggerInfo.lastKeypressTime <= DebuggerInfo.delta) {
        DebuggerInfo.showSidebar();
        thisKeypressTime = 0;
      }

      DebuggerInfo.lastKeypressTime = thisKeypressTime;
    }
  }
}; // export default DebuggerInfo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluL2RlYnVnZ2VyLWluZm8uanMiXSwibmFtZXMiOlsiRGVidWdnZXJJbmZvIiwiJGRlYnVnSW5mb0RpdiIsIiQiLCJkZWx0YSIsImxhc3RLZXlwcmVzc1RpbWUiLCJpbml0aWFsaXplIiwiYWRkQ2xhc3MiLCJ3aW5kb3ciLCJkb2N1bWVudCIsIm9uIiwiZXZlbnQiLCJrZXlIYW5kbGVyIiwiVXBkYXRlQ29udGVudCIsIm5ld0NvbnRlbnQiLCJodG1sIiwic2hvd1NpZGViYXIiLCJsZW5ndGgiLCJzaWRlYmFyIiwidHJhbnNpdGlvbiIsImRpbVBhZ2UiLCJrZXlDb2RlIiwidGhpc0tleXByZXNzVGltZSIsIkRhdGUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLFlBQVksR0FBRztBQUNwQkMsRUFBQUEsYUFBYSxFQUFFQyxDQUFDLENBQUMsYUFBRCxDQURJO0FBRXBCQyxFQUFBQSxLQUFLLEVBQUUsR0FGYTtBQUdwQkMsRUFBQUEsZ0JBQWdCLEVBQUUsQ0FIRTtBQUlwQkMsRUFBQUEsVUFKb0Isd0JBSVA7QUFDWkwsSUFBQUEsWUFBWSxDQUFDQyxhQUFiLENBQTJCSyxRQUEzQixDQUFvQyw0QkFBcEM7QUFDQUMsSUFBQUEsTUFBTSxDQUFDTCxDQUFQLENBQVNNLFFBQVQsRUFBbUJDLEVBQW5CLENBQXNCLFNBQXRCLEVBQWlDLFVBQUNDLEtBQUQsRUFBVztBQUMzQ1YsTUFBQUEsWUFBWSxDQUFDVyxVQUFiLENBQXdCRCxLQUF4QjtBQUNBLEtBRkQ7QUFHQSxHQVRtQjtBQVVwQkUsRUFBQUEsYUFWb0IseUJBVU5DLFVBVk0sRUFVTTtBQUN6QjtBQUNBO0FBQ0FiLElBQUFBLFlBQVksQ0FBQ0MsYUFBYixDQUEyQmEsSUFBM0IsQ0FBZ0NELFVBQWhDO0FBQ0EsR0FkbUI7QUFlcEJFLEVBQUFBLFdBZm9CLHlCQWVOO0FBQ2IsUUFBSWYsWUFBWSxDQUFDQyxhQUFiLENBQTJCYSxJQUEzQixHQUFrQ0UsTUFBbEMsS0FBNkMsQ0FBakQsRUFBb0Q7QUFDcERoQixJQUFBQSxZQUFZLENBQUNDLGFBQWIsQ0FDRWdCLE9BREYsQ0FDVTtBQUNSQyxNQUFBQSxVQUFVLEVBQUUsU0FESjtBQUVSQyxNQUFBQSxPQUFPLEVBQUU7QUFGRCxLQURWLEVBS0VGLE9BTEYsQ0FLVSxRQUxWO0FBTUEsR0F2Qm1CO0FBd0JwQk4sRUFBQUEsVUF4Qm9CLHNCQXdCVEQsS0F4QlMsRUF3QkY7QUFDakI7QUFDQSxRQUFJQSxLQUFLLENBQUNVLE9BQU4sS0FBa0IsRUFBdEIsRUFBMEI7QUFDekIsVUFBSUMsZ0JBQWdCLEdBQUcsSUFBSUMsSUFBSixFQUF2Qjs7QUFDQSxVQUFJRCxnQkFBZ0IsR0FBR3JCLFlBQVksQ0FBQ0ksZ0JBQWhDLElBQW9ESixZQUFZLENBQUNHLEtBQXJFLEVBQTRFO0FBQzNFSCxRQUFBQSxZQUFZLENBQUNlLFdBQWI7QUFDQU0sUUFBQUEsZ0JBQWdCLEdBQUcsQ0FBbkI7QUFDQTs7QUFDRHJCLE1BQUFBLFlBQVksQ0FBQ0ksZ0JBQWIsR0FBZ0NpQixnQkFBaEM7QUFDQTtBQUNEO0FBbENtQixDQUFyQixDLENBc0NBIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIE1pa29QQlggLSBmcmVlIHBob25lIHN5c3RlbSBmb3Igc21hbGwgYnVzaW5lc3NcbiAqIENvcHlyaWdodCDCqSAyMDE3LTIwMjMgQWxleGV5IFBvcnRub3YgYW5kIE5pa29sYXkgQmVrZXRvdlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuY29uc3QgRGVidWdnZXJJbmZvID0ge1xuXHQkZGVidWdJbmZvRGl2OiAkKCcjZGVidWctaW5mbycpLFxuXHRkZWx0YTogNTAwLFxuXHRsYXN0S2V5cHJlc3NUaW1lOiAwLFxuXHRpbml0aWFsaXplKCkge1xuXHRcdERlYnVnZ2VySW5mby4kZGVidWdJbmZvRGl2LmFkZENsYXNzKCd1aSByaWdodCB2ZXJ5IHdpZGUgc2lkZWJhcicpO1xuXHRcdHdpbmRvdy4kKGRvY3VtZW50KS5vbigna2V5ZG93bicsIChldmVudCkgPT4ge1xuXHRcdFx0RGVidWdnZXJJbmZvLmtleUhhbmRsZXIoZXZlbnQpO1xuXHRcdH0pO1xuXHR9LFxuXHRVcGRhdGVDb250ZW50KG5ld0NvbnRlbnQpIHtcblx0XHQvLyBsZXQgbmV3SHRtbCA9IGA8aDI+JHtnbG9iYWxUcmFuc2xhdGUuZGJnX0hlYWRlcn08L2gyPmA7XG5cdFx0Ly8gbmV3SHRtbCArPSBuZXdDb250ZW50O1xuXHRcdERlYnVnZ2VySW5mby4kZGVidWdJbmZvRGl2Lmh0bWwobmV3Q29udGVudCk7XG5cdH0sXG5cdHNob3dTaWRlYmFyKCkge1xuXHRcdGlmIChEZWJ1Z2dlckluZm8uJGRlYnVnSW5mb0Rpdi5odG1sKCkubGVuZ3RoID09PSAwKSByZXR1cm47XG5cdFx0RGVidWdnZXJJbmZvLiRkZWJ1Z0luZm9EaXZcblx0XHRcdC5zaWRlYmFyKHtcblx0XHRcdFx0dHJhbnNpdGlvbjogJ292ZXJsYXknLFxuXHRcdFx0XHRkaW1QYWdlOiBmYWxzZSxcblx0XHRcdH0pXG5cdFx0XHQuc2lkZWJhcigndG9nZ2xlJyk7XG5cdH0sXG5cdGtleUhhbmRsZXIoZXZlbnQpIHtcblx0XHQvLyBEb3VibGUgcHJlc3MgdG8gRVNDIHdpbGwgc2hvdyB0aGUgZGVidWcgaW5mb3JtYXRpb25cblx0XHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcblx0XHRcdGxldCB0aGlzS2V5cHJlc3NUaW1lID0gbmV3IERhdGUoKTtcblx0XHRcdGlmICh0aGlzS2V5cHJlc3NUaW1lIC0gRGVidWdnZXJJbmZvLmxhc3RLZXlwcmVzc1RpbWUgPD0gRGVidWdnZXJJbmZvLmRlbHRhKSB7XG5cdFx0XHRcdERlYnVnZ2VySW5mby5zaG93U2lkZWJhcigpO1xuXHRcdFx0XHR0aGlzS2V5cHJlc3NUaW1lID0gMDtcblx0XHRcdH1cblx0XHRcdERlYnVnZ2VySW5mby5sYXN0S2V5cHJlc3NUaW1lID0gdGhpc0tleXByZXNzVGltZTtcblx0XHR9XG5cdH0sXG59O1xuXG5cbi8vIGV4cG9ydCBkZWZhdWx0IERlYnVnZ2VySW5mbztcbiJdfQ==