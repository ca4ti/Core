"use strict";

/*
 * MikoPBX - free phone system for small business
 * Copyright (C) 2017-2022 Alexey Portnov and Nikolay Beketov
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

/* global PbxApi, DebuggerInfo */
var extensionsStatusLoopWorker = {
  timeOut: 3000,
  timeOutHandle: '',
  green: '<div class="ui green empty circular label" style="width: 1px;height: 1px;"></div>',
  grey: '<div class="ui grey empty circular label" style="width: 1px;height: 1px;"></div>',
  initialize: function initialize() {
    // Запустим обновление статуса провайдера
    DebuggerInfo.initialize();
    extensionsStatusLoopWorker.restartWorker();
  },
  restartWorker: function restartWorker() {
    window.clearTimeout(extensionsStatusLoopWorker.timeoutHandle);
    extensionsStatusLoopWorker.worker();
  },
  worker: function worker() {
    window.clearTimeout(extensionsStatusLoopWorker.timeoutHandle);
    PbxApi.GetPeersStatus(extensionsStatusLoopWorker.cbRefreshExtensionsStatus);
  },
  cbRefreshExtensionsStatus: function cbRefreshExtensionsStatus(response) {
    extensionsStatusLoopWorker.timeoutHandle = window.setTimeout(extensionsStatusLoopWorker.worker, extensionsStatusLoopWorker.timeOut);
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
    $('.extension-row').each(function (index, obj) {
      var number = $(obj).attr('data-value');
      var result = $.grep(response, function (e) {
        return e.id === number;
      });

      if (result.length === 0) {
        // not found
        $(obj).find('.extension-status').html(extensionsStatusLoopWorker.grey);
      } else if (result[0].state.toUpperCase() === 'OK') {
        $(obj).find('.extension-status').html(extensionsStatusLoopWorker.green);
      } else {
        $(obj).find('.extension-status').html(extensionsStatusLoopWorker.grey);
      }
    });
  }
};
$(document).ready(function () {
  extensionsStatusLoopWorker.initialize();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9FeHRlbnNpb25zL2V4dGVuc2lvbnMtaW5kZXgtc3RhdHVzLXdvcmtlci5qcyJdLCJuYW1lcyI6WyJleHRlbnNpb25zU3RhdHVzTG9vcFdvcmtlciIsInRpbWVPdXQiLCJ0aW1lT3V0SGFuZGxlIiwiZ3JlZW4iLCJncmV5IiwiaW5pdGlhbGl6ZSIsIkRlYnVnZ2VySW5mbyIsInJlc3RhcnRXb3JrZXIiLCJ3aW5kb3ciLCJjbGVhclRpbWVvdXQiLCJ0aW1lb3V0SGFuZGxlIiwid29ya2VyIiwiUGJ4QXBpIiwiR2V0UGVlcnNTdGF0dXMiLCJjYlJlZnJlc2hFeHRlbnNpb25zU3RhdHVzIiwicmVzcG9uc2UiLCJzZXRUaW1lb3V0IiwibGVuZ3RoIiwiaHRtbFRhYmxlIiwiJCIsImVhY2giLCJrZXkiLCJ2YWx1ZSIsImlkIiwic3RhdGUiLCJVcGRhdGVDb250ZW50IiwiaW5kZXgiLCJvYmoiLCJudW1iZXIiLCJhdHRyIiwicmVzdWx0IiwiZ3JlcCIsImUiLCJmaW5kIiwiaHRtbCIsInRvVXBwZXJDYXNlIiwiZG9jdW1lbnQiLCJyZWFkeSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBRUEsSUFBTUEsMEJBQTBCLEdBQUc7QUFDbENDLEVBQUFBLE9BQU8sRUFBRSxJQUR5QjtBQUVsQ0MsRUFBQUEsYUFBYSxFQUFFLEVBRm1CO0FBR2xDQyxFQUFBQSxLQUFLLEVBQUUsbUZBSDJCO0FBSWxDQyxFQUFBQSxJQUFJLEVBQUUsa0ZBSjRCO0FBS2xDQyxFQUFBQSxVQUxrQyx3QkFLckI7QUFDWjtBQUNBQyxJQUFBQSxZQUFZLENBQUNELFVBQWI7QUFDQUwsSUFBQUEsMEJBQTBCLENBQUNPLGFBQTNCO0FBQ0EsR0FUaUM7QUFVbENBLEVBQUFBLGFBVmtDLDJCQVVsQjtBQUNmQyxJQUFBQSxNQUFNLENBQUNDLFlBQVAsQ0FBb0JULDBCQUEwQixDQUFDVSxhQUEvQztBQUNBVixJQUFBQSwwQkFBMEIsQ0FBQ1csTUFBM0I7QUFDQSxHQWJpQztBQWNsQ0EsRUFBQUEsTUFka0Msb0JBY3pCO0FBQ1JILElBQUFBLE1BQU0sQ0FBQ0MsWUFBUCxDQUFvQlQsMEJBQTBCLENBQUNVLGFBQS9DO0FBQ0FFLElBQUFBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQmIsMEJBQTBCLENBQUNjLHlCQUFqRDtBQUNBLEdBakJpQztBQWtCbENBLEVBQUFBLHlCQWxCa0MscUNBa0JSQyxRQWxCUSxFQWtCRTtBQUNuQ2YsSUFBQUEsMEJBQTBCLENBQUNVLGFBQTNCLEdBQ0NGLE1BQU0sQ0FBQ1EsVUFBUCxDQUFrQmhCLDBCQUEwQixDQUFDVyxNQUE3QyxFQUFxRFgsMEJBQTBCLENBQUNDLE9BQWhGLENBREQ7QUFFQSxRQUFJYyxRQUFRLENBQUNFLE1BQVQsS0FBb0IsQ0FBcEIsSUFBeUJGLFFBQVEsS0FBSyxLQUExQyxFQUFpRDtBQUNqRCxRQUFJRyxTQUFTLEdBQUcsdUNBQWhCO0FBQ0FDLElBQUFBLENBQUMsQ0FBQ0MsSUFBRixDQUFPTCxRQUFQLEVBQWlCLFVBQUNNLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUNoQ0osTUFBQUEsU0FBUyxJQUFJLE1BQWI7QUFDQUEsTUFBQUEsU0FBUyxrQkFBV0ksS0FBSyxDQUFDQyxFQUFqQixVQUFUO0FBQ0FMLE1BQUFBLFNBQVMsa0JBQVdJLEtBQUssQ0FBQ0UsS0FBakIsVUFBVDtBQUNBTixNQUFBQSxTQUFTLElBQUksT0FBYjtBQUNBLEtBTEQ7QUFNQUEsSUFBQUEsU0FBUyxJQUFJLFVBQWI7QUFDQVosSUFBQUEsWUFBWSxDQUFDbUIsYUFBYixDQUEyQlAsU0FBM0I7QUFDQUMsSUFBQUEsQ0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0JDLElBQXBCLENBQXlCLFVBQUNNLEtBQUQsRUFBUUMsR0FBUixFQUFnQjtBQUN4QyxVQUFNQyxNQUFNLEdBQUdULENBQUMsQ0FBQ1EsR0FBRCxDQUFELENBQU9FLElBQVAsQ0FBWSxZQUFaLENBQWY7QUFDQSxVQUFNQyxNQUFNLEdBQUdYLENBQUMsQ0FBQ1ksSUFBRixDQUFPaEIsUUFBUCxFQUFpQixVQUFBaUIsQ0FBQztBQUFBLGVBQUlBLENBQUMsQ0FBQ1QsRUFBRixLQUFTSyxNQUFiO0FBQUEsT0FBbEIsQ0FBZjs7QUFDQSxVQUFJRSxNQUFNLENBQUNiLE1BQVAsS0FBa0IsQ0FBdEIsRUFBeUI7QUFDeEI7QUFDQUUsUUFBQUEsQ0FBQyxDQUFDUSxHQUFELENBQUQsQ0FBT00sSUFBUCxDQUFZLG1CQUFaLEVBQWlDQyxJQUFqQyxDQUFzQ2xDLDBCQUEwQixDQUFDSSxJQUFqRTtBQUNBLE9BSEQsTUFHTyxJQUFJMEIsTUFBTSxDQUFDLENBQUQsQ0FBTixDQUFVTixLQUFWLENBQWdCVyxXQUFoQixPQUFrQyxJQUF0QyxFQUE0QztBQUNsRGhCLFFBQUFBLENBQUMsQ0FBQ1EsR0FBRCxDQUFELENBQU9NLElBQVAsQ0FBWSxtQkFBWixFQUFpQ0MsSUFBakMsQ0FBc0NsQywwQkFBMEIsQ0FBQ0csS0FBakU7QUFDQSxPQUZNLE1BRUE7QUFDTmdCLFFBQUFBLENBQUMsQ0FBQ1EsR0FBRCxDQUFELENBQU9NLElBQVAsQ0FBWSxtQkFBWixFQUFpQ0MsSUFBakMsQ0FBc0NsQywwQkFBMEIsQ0FBQ0ksSUFBakU7QUFDQTtBQUNELEtBWEQ7QUFZQTtBQTNDaUMsQ0FBbkM7QUErQ0FlLENBQUMsQ0FBQ2lCLFFBQUQsQ0FBRCxDQUFZQyxLQUFaLENBQWtCLFlBQU07QUFDdkJyQyxFQUFBQSwwQkFBMEIsQ0FBQ0ssVUFBM0I7QUFDQSxDQUZEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIE1pa29QQlggLSBmcmVlIHBob25lIHN5c3RlbSBmb3Igc21hbGwgYnVzaW5lc3NcbiAqIENvcHlyaWdodCAoQykgMjAxNy0yMDIyIEFsZXhleSBQb3J0bm92IGFuZCBOaWtvbGF5IEJla2V0b3ZcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uXG4gKiBJZiBub3QsIHNlZSA8aHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbi8qIGdsb2JhbCBQYnhBcGksIERlYnVnZ2VySW5mbyAqL1xuXG5jb25zdCBleHRlbnNpb25zU3RhdHVzTG9vcFdvcmtlciA9IHtcblx0dGltZU91dDogMzAwMCxcblx0dGltZU91dEhhbmRsZTogJycsXG5cdGdyZWVuOiAnPGRpdiBjbGFzcz1cInVpIGdyZWVuIGVtcHR5IGNpcmN1bGFyIGxhYmVsXCIgc3R5bGU9XCJ3aWR0aDogMXB4O2hlaWdodDogMXB4O1wiPjwvZGl2PicsXG5cdGdyZXk6ICc8ZGl2IGNsYXNzPVwidWkgZ3JleSBlbXB0eSBjaXJjdWxhciBsYWJlbFwiIHN0eWxlPVwid2lkdGg6IDFweDtoZWlnaHQ6IDFweDtcIj48L2Rpdj4nLFxuXHRpbml0aWFsaXplKCkge1xuXHRcdC8vINCX0LDQv9GD0YHRgtC40Lwg0L7QsdC90L7QstC70LXQvdC40LUg0YHRgtCw0YLRg9GB0LAg0L/RgNC+0LLQsNC50LTQtdGA0LBcblx0XHREZWJ1Z2dlckluZm8uaW5pdGlhbGl6ZSgpO1xuXHRcdGV4dGVuc2lvbnNTdGF0dXNMb29wV29ya2VyLnJlc3RhcnRXb3JrZXIoKTtcblx0fSxcblx0cmVzdGFydFdvcmtlcigpIHtcblx0XHR3aW5kb3cuY2xlYXJUaW1lb3V0KGV4dGVuc2lvbnNTdGF0dXNMb29wV29ya2VyLnRpbWVvdXRIYW5kbGUpO1xuXHRcdGV4dGVuc2lvbnNTdGF0dXNMb29wV29ya2VyLndvcmtlcigpO1xuXHR9LFxuXHR3b3JrZXIoKSB7XG5cdFx0d2luZG93LmNsZWFyVGltZW91dChleHRlbnNpb25zU3RhdHVzTG9vcFdvcmtlci50aW1lb3V0SGFuZGxlKTtcblx0XHRQYnhBcGkuR2V0UGVlcnNTdGF0dXMoZXh0ZW5zaW9uc1N0YXR1c0xvb3BXb3JrZXIuY2JSZWZyZXNoRXh0ZW5zaW9uc1N0YXR1cyk7XG5cdH0sXG5cdGNiUmVmcmVzaEV4dGVuc2lvbnNTdGF0dXMocmVzcG9uc2UpIHtcblx0XHRleHRlbnNpb25zU3RhdHVzTG9vcFdvcmtlci50aW1lb3V0SGFuZGxlID1cblx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGV4dGVuc2lvbnNTdGF0dXNMb29wV29ya2VyLndvcmtlciwgZXh0ZW5zaW9uc1N0YXR1c0xvb3BXb3JrZXIudGltZU91dCk7XG5cdFx0aWYgKHJlc3BvbnNlLmxlbmd0aCA9PT0gMCB8fCByZXNwb25zZSA9PT0gZmFsc2UpIHJldHVybjtcblx0XHRsZXQgaHRtbFRhYmxlID0gJzx0YWJsZSBjbGFzcz1cInVpIHZlcnkgY29tcGFjdCB0YWJsZVwiPic7XG5cdFx0JC5lYWNoKHJlc3BvbnNlLCAoa2V5LCB2YWx1ZSkgPT4ge1xuXHRcdFx0aHRtbFRhYmxlICs9ICc8dHI+Jztcblx0XHRcdGh0bWxUYWJsZSArPSBgPHRkPiR7dmFsdWUuaWR9PC90ZD5gO1xuXHRcdFx0aHRtbFRhYmxlICs9IGA8dGQ+JHt2YWx1ZS5zdGF0ZX08L3RkPmA7XG5cdFx0XHRodG1sVGFibGUgKz0gJzwvdHI+Jztcblx0XHR9KTtcblx0XHRodG1sVGFibGUgKz0gJzwvdGFibGU+Jztcblx0XHREZWJ1Z2dlckluZm8uVXBkYXRlQ29udGVudChodG1sVGFibGUpO1xuXHRcdCQoJy5leHRlbnNpb24tcm93JykuZWFjaCgoaW5kZXgsIG9iaikgPT4ge1xuXHRcdFx0Y29uc3QgbnVtYmVyID0gJChvYmopLmF0dHIoJ2RhdGEtdmFsdWUnKTtcblx0XHRcdGNvbnN0IHJlc3VsdCA9ICQuZ3JlcChyZXNwb25zZSwgZSA9PiBlLmlkID09PSBudW1iZXIpO1xuXHRcdFx0aWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0Ly8gbm90IGZvdW5kXG5cdFx0XHRcdCQob2JqKS5maW5kKCcuZXh0ZW5zaW9uLXN0YXR1cycpLmh0bWwoZXh0ZW5zaW9uc1N0YXR1c0xvb3BXb3JrZXIuZ3JleSk7XG5cdFx0XHR9IGVsc2UgaWYgKHJlc3VsdFswXS5zdGF0ZS50b1VwcGVyQ2FzZSgpID09PSAnT0snKSB7XG5cdFx0XHRcdCQob2JqKS5maW5kKCcuZXh0ZW5zaW9uLXN0YXR1cycpLmh0bWwoZXh0ZW5zaW9uc1N0YXR1c0xvb3BXb3JrZXIuZ3JlZW4pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JChvYmopLmZpbmQoJy5leHRlbnNpb24tc3RhdHVzJykuaHRtbChleHRlbnNpb25zU3RhdHVzTG9vcFdvcmtlci5ncmV5KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcbn07XG5cblxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuXHRleHRlbnNpb25zU3RhdHVzTG9vcFdvcmtlci5pbml0aWFsaXplKCk7XG59KTsiXX0=