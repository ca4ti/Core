"use strict";

/*
 * Copyright (C) MIKO LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Nikolay Beketov, 12 2019
 *
 */

/* global globalSSHPort */
var sshConsole = {
  $menuLink: $('a[href$="/admin-cabinet/console/index/"]'),
  link: null,
  target: null,
  hide: false,
  initialize: function () {
    function initialize() {
      $('body').on('click', 'a[href$="/admin-cabinet/console/index/"]', function (e) {
        e.preventDefault();
        window.open(sshConsole.link, sshConsole.target);
      }); // Проверим возможность запуска SSH

      var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) && !navigator.userAgent.match(/Opera|OPR\//);
      var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && !navigator.userAgent.match('CriOS');

      if (isChrome) {
        sshConsole.detect('chrome-extension://iodihamcpbpeioajjeobimgagajmlibd', function () {
          sshConsole.link = "ssh://root@".concat(window.location.hostname, ":").concat(globalSSHPort);
          sshConsole.target = '_blank';
        }, function () {
          sshConsole.link = 'https://chrome.google.com/webstore/detail/iodihamcpbpeioajjeobimgagajmlibd';
          sshConsole.target = '_blank';
        });
      } else if (isSafari) {
        sshConsole.link = "ssh://root@".concat(window.location.hostname, ":").concat(globalSSHPort);
        sshConsole.target = '_top';
      } else {
        sshConsole.$menuLink.hide();
      }
    }

    return initialize;
  }(),
  detect: function () {
    function detect(base, ifInstalled, ifNotInstalled) {
      $.get("".concat(base, "/html/nassh.html")).done(ifInstalled).fail(ifNotInstalled);
    }

    return detect;
  }()
};
$(document).ready(function () {
  sshConsole.initialize();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluL3NzaC1jb25zb2xlLmpzIl0sIm5hbWVzIjpbInNzaENvbnNvbGUiLCIkbWVudUxpbmsiLCIkIiwibGluayIsInRhcmdldCIsImhpZGUiLCJpbml0aWFsaXplIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJ3aW5kb3ciLCJvcGVuIiwiaXNDaHJvbWUiLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidmVuZG9yIiwibWF0Y2giLCJpc1NhZmFyaSIsImluZGV4T2YiLCJkZXRlY3QiLCJsb2NhdGlvbiIsImhvc3RuYW1lIiwiZ2xvYmFsU1NIUG9ydCIsImJhc2UiLCJpZkluc3RhbGxlZCIsImlmTm90SW5zdGFsbGVkIiwiZ2V0IiwiZG9uZSIsImZhaWwiLCJkb2N1bWVudCIsInJlYWR5Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7OztBQVFBO0FBRUEsSUFBTUEsVUFBVSxHQUFHO0FBQ2xCQyxFQUFBQSxTQUFTLEVBQUVDLENBQUMsQ0FBQywwQ0FBRCxDQURNO0FBRWxCQyxFQUFBQSxJQUFJLEVBQUUsSUFGWTtBQUdsQkMsRUFBQUEsTUFBTSxFQUFFLElBSFU7QUFJbEJDLEVBQUFBLElBQUksRUFBRSxLQUpZO0FBS2xCQyxFQUFBQSxVQUxrQjtBQUFBLDBCQUtMO0FBQ1pKLE1BQUFBLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVUssRUFBVixDQUFhLE9BQWIsRUFBc0IsMENBQXRCLEVBQWtFLFVBQUNDLENBQUQsRUFBTztBQUN4RUEsUUFBQUEsQ0FBQyxDQUFDQyxjQUFGO0FBQ0FDLFFBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZWCxVQUFVLENBQUNHLElBQXZCLEVBQTZCSCxVQUFVLENBQUNJLE1BQXhDO0FBQ0EsT0FIRCxFQURZLENBS1o7O0FBQ0EsVUFBTVEsUUFBUSxHQUFHLFNBQVNDLElBQVQsQ0FBY0MsU0FBUyxDQUFDQyxTQUF4QixLQUFzQyxhQUFhRixJQUFiLENBQWtCQyxTQUFTLENBQUNFLE1BQTVCLENBQXRDLElBQTZFLENBQUVGLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkUsS0FBcEIsQ0FBMEIsYUFBMUIsQ0FBaEc7QUFDQSxVQUFNQyxRQUFRLEdBQUdKLFNBQVMsQ0FBQ0UsTUFBVixJQUFvQkYsU0FBUyxDQUFDRSxNQUFWLENBQWlCRyxPQUFqQixDQUF5QixPQUF6QixJQUFvQyxDQUFDLENBQXpELElBQThETCxTQUFTLENBQUNDLFNBQXhFLElBQXFGLENBQUNELFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkUsS0FBcEIsQ0FBMEIsT0FBMUIsQ0FBdkc7O0FBQ0EsVUFBSUwsUUFBSixFQUFjO0FBQ2JaLFFBQUFBLFVBQVUsQ0FBQ29CLE1BQVgsQ0FDQyxxREFERCxFQUVDLFlBQU07QUFDTHBCLFVBQUFBLFVBQVUsQ0FBQ0csSUFBWCx3QkFBZ0NPLE1BQU0sQ0FBQ1csUUFBUCxDQUFnQkMsUUFBaEQsY0FBNERDLGFBQTVEO0FBQ0F2QixVQUFBQSxVQUFVLENBQUNJLE1BQVgsR0FBb0IsUUFBcEI7QUFDQSxTQUxGLEVBTUMsWUFBTTtBQUNMSixVQUFBQSxVQUFVLENBQUNHLElBQVgsR0FBa0IsNEVBQWxCO0FBQ0FILFVBQUFBLFVBQVUsQ0FBQ0ksTUFBWCxHQUFvQixRQUFwQjtBQUNBLFNBVEY7QUFXQSxPQVpELE1BWU8sSUFBSWMsUUFBSixFQUFjO0FBQ3BCbEIsUUFBQUEsVUFBVSxDQUFDRyxJQUFYLHdCQUFnQ08sTUFBTSxDQUFDVyxRQUFQLENBQWdCQyxRQUFoRCxjQUE0REMsYUFBNUQ7QUFDQXZCLFFBQUFBLFVBQVUsQ0FBQ0ksTUFBWCxHQUFvQixNQUFwQjtBQUNBLE9BSE0sTUFHQTtBQUNOSixRQUFBQSxVQUFVLENBQUNDLFNBQVgsQ0FBcUJJLElBQXJCO0FBQ0E7QUFDRDs7QUEvQmlCO0FBQUE7QUFnQ2xCZSxFQUFBQSxNQWhDa0I7QUFBQSxvQkFnQ1hJLElBaENXLEVBZ0NMQyxXQWhDSyxFQWdDUUMsY0FoQ1IsRUFnQ3dCO0FBQ3pDeEIsTUFBQUEsQ0FBQyxDQUFDeUIsR0FBRixXQUFTSCxJQUFULHVCQUNFSSxJQURGLENBQ09ILFdBRFAsRUFFRUksSUFGRixDQUVPSCxjQUZQO0FBR0E7O0FBcENpQjtBQUFBO0FBQUEsQ0FBbkI7QUF3Q0F4QixDQUFDLENBQUM0QixRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFNO0FBQ3ZCL0IsRUFBQUEsVUFBVSxDQUFDTSxVQUFYO0FBQ0EsQ0FGRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIE1JS08gTExDIC0gQWxsIFJpZ2h0cyBSZXNlcnZlZFxuICogVW5hdXRob3JpemVkIGNvcHlpbmcgb2YgdGhpcyBmaWxlLCB2aWEgYW55IG1lZGl1bSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkXG4gKiBQcm9wcmlldGFyeSBhbmQgY29uZmlkZW50aWFsXG4gKiBXcml0dGVuIGJ5IE5pa29sYXkgQmVrZXRvdiwgMTIgMjAxOVxuICpcbiAqL1xuXG4vKiBnbG9iYWwgZ2xvYmFsU1NIUG9ydCAqL1xuXG5jb25zdCBzc2hDb25zb2xlID0ge1xuXHQkbWVudUxpbms6ICQoJ2FbaHJlZiQ9XCIvYWRtaW4tY2FiaW5ldC9jb25zb2xlL2luZGV4L1wiXScpLFxuXHRsaW5rOiBudWxsLFxuXHR0YXJnZXQ6IG51bGwsXG5cdGhpZGU6IGZhbHNlLFxuXHRpbml0aWFsaXplKCkge1xuXHRcdCQoJ2JvZHknKS5vbignY2xpY2snLCAnYVtocmVmJD1cIi9hZG1pbi1jYWJpbmV0L2NvbnNvbGUvaW5kZXgvXCJdJywgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHdpbmRvdy5vcGVuKHNzaENvbnNvbGUubGluaywgc3NoQ29uc29sZS50YXJnZXQpO1xuXHRcdH0pO1xuXHRcdC8vINCf0YDQvtCy0LXRgNC40Lwg0LLQvtC30LzQvtC20L3QvtGB0YLRjCDQt9Cw0L/Rg9GB0LrQsCBTU0hcblx0XHRjb25zdCBpc0Nocm9tZSA9IC9DaHJvbWUvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgL0dvb2dsZSBJbmMvLnRlc3QobmF2aWdhdG9yLnZlbmRvcikgJiYgIShuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9PcGVyYXxPUFJcXC8vKSk7XG5cdFx0Y29uc3QgaXNTYWZhcmkgPSBuYXZpZ2F0b3IudmVuZG9yICYmIG5hdmlnYXRvci52ZW5kb3IuaW5kZXhPZignQXBwbGUnKSA+IC0xICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goJ0NyaU9TJyk7XG5cdFx0aWYgKGlzQ2hyb21lKSB7XG5cdFx0XHRzc2hDb25zb2xlLmRldGVjdChcblx0XHRcdFx0J2Nocm9tZS1leHRlbnNpb246Ly9pb2RpaGFtY3BicGVpb2FqamVvYmltZ2FnYWptbGliZCcsXG5cdFx0XHRcdCgpID0+IHtcblx0XHRcdFx0XHRzc2hDb25zb2xlLmxpbmsgPSBgc3NoOi8vcm9vdEAke3dpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZX06JHtnbG9iYWxTU0hQb3J0fWA7XG5cdFx0XHRcdFx0c3NoQ29uc29sZS50YXJnZXQgPSAnX2JsYW5rJztcblx0XHRcdFx0fSxcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdHNzaENvbnNvbGUubGluayA9ICdodHRwczovL2Nocm9tZS5nb29nbGUuY29tL3dlYnN0b3JlL2RldGFpbC9pb2RpaGFtY3BicGVpb2FqamVvYmltZ2FnYWptbGliZCc7XG5cdFx0XHRcdFx0c3NoQ29uc29sZS50YXJnZXQgPSAnX2JsYW5rJztcblx0XHRcdFx0fSxcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChpc1NhZmFyaSkge1xuXHRcdFx0c3NoQ29uc29sZS5saW5rID0gYHNzaDovL3Jvb3RAJHt3aW5kb3cubG9jYXRpb24uaG9zdG5hbWV9OiR7Z2xvYmFsU1NIUG9ydH1gO1xuXHRcdFx0c3NoQ29uc29sZS50YXJnZXQgPSAnX3RvcCc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNzaENvbnNvbGUuJG1lbnVMaW5rLmhpZGUoKTtcblx0XHR9XG5cdH0sXG5cdGRldGVjdChiYXNlLCBpZkluc3RhbGxlZCwgaWZOb3RJbnN0YWxsZWQpIHtcblx0XHQkLmdldChgJHtiYXNlfS9odG1sL25hc3NoLmh0bWxgKVxuXHRcdFx0LmRvbmUoaWZJbnN0YWxsZWQpXG5cdFx0XHQuZmFpbChpZk5vdEluc3RhbGxlZCk7XG5cdH0sXG59O1xuXG5cbiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcblx0c3NoQ29uc29sZS5pbml0aWFsaXplKCk7XG59KTtcbiJdfQ==