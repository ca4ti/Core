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

/* global globalRootUrl, PbxApi, globalTranslate, UserMessage */

/**
 * Monitors the status of module installation.
 *
 * @module installStatusLoopWorker
 */
var installStatusLoopWorker = {
  /**
   * Time in milliseconds before fetching new status request.
   * @type {number}
   */
  timeOut: 1000,

  /**
   * The id of the timer function for the status worker.
   * @type {number}
   */
  timeOutHandle: 0,

  /**
   * The file path of the module being installed.
   * @type {string}
   */
  filePath: '',

  /**
   * The number of iterations performed.
   * @type {number}
   */
  iterations: 0,

  /**
   * The previous progress percentage.
   * @type {string}
   */
  oldPercent: '0',

  /**
   * Flag indicating if enabling is needed after installation.
   * @type {boolean}
   */
  needEnableAfterInstall: false,

  /**
   * The progress bar label element.
   * @type {jQuery}
   */
  $progressBar: $('#upload-progress-bar'),

  /**
   * Module Unique id.
   * @type string
   */
  moduleUniqid: '',

  /**
   * Initializes the installStatusLoopWorker object.
   * @param {string} filePath - The file path of the module being installed.
   * @param {boolean} [needEnable=false] - Flag indicating if enabling is needed after installation.
   */
  initialize: function initialize(filePath) {
    var needEnable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    installStatusLoopWorker.filePath = filePath;
    installStatusLoopWorker.iterations = 0;
    installStatusLoopWorker.needEnableAfterInstall = needEnable;
    installStatusLoopWorker.restartWorker();
  },

  /**
   * Restarts the worker.
   */
  restartWorker: function restartWorker() {
    window.clearTimeout(installStatusLoopWorker.timeoutHandle);
    installStatusLoopWorker.worker();
  },

  /**
   * Worker function for checking the installation status.
   */
  worker: function worker() {
    window.clearTimeout(installStatusLoopWorker.timeoutHandle);
    PbxApi.ModulesGetModuleInstallationStatus(installStatusLoopWorker.filePath, installStatusLoopWorker.cbAfterReceiveNewStatus);
  },

  /**
   * Callback function after receiving the new installation status.
   * @param {boolean} result - The result of the installation status check.
   * @param {object} response - The response object containing the installation status.
   */
  cbAfterReceiveNewStatus: function cbAfterReceiveNewStatus(result, response) {
    installStatusLoopWorker.iterations += 1;
    installStatusLoopWorker.timeoutHandle = window.setTimeout(installStatusLoopWorker.worker, installStatusLoopWorker.timeOut); // Check installation status

    if (result === false && installStatusLoopWorker.iterations < 50) {
      window.clearTimeout(installStatusLoopWorker.timeoutHandle);
    } else if (installStatusLoopWorker.iterations > 50 || response.data.i_status === 'INSTALLATION_ERROR' || response.data.i_status === 'PROGRESS_FILE_NOT_FOUND') {
      window.clearTimeout(installStatusLoopWorker.timeoutHandle);
      UserMessage.showMultiString(response.messages, globalTranslate.ext_InstallationError);
      $('.loading').removeClass('loading');
    } else if (response.data.i_status === 'INSTALLATION_IN_PROGRESS') {
      installStatusLoopWorker.$progressBar.progress({
        percent: parseInt(response.data.i_status_progress, 10)
      });

      if (installStatusLoopWorker.oldPercent !== response.data.i_status_progress) {
        installStatusLoopWorker.iterations = 0;
      }

      installStatusLoopWorker.oldPercent = response.data.i_status_progress;
    } else if (response.data.i_status === 'INSTALLATION_COMPLETE') {
      installStatusLoopWorker.$progressBar.progress({
        percent: 100
      });

      if (installStatusLoopWorker.needEnableAfterInstall) {
        // Enable the installed module and redirect to the module index page
        PbxApi.ModulesEnableModule(response.data.uniqid, function () {
          window.location = "".concat(globalRootUrl, "pbx-extension-modules/index/");
        });
      } else {
        // Redirect to the module index page
        window.location = "".concat(globalRootUrl, "pbx-extension-modules/index/");
      }

      window.clearTimeout(installStatusLoopWorker.timeoutHandle);
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9QYnhFeHRlbnNpb25Nb2R1bGVzL3BieC1leHRlbnNpb24tbW9kdWxlLWluc3RhbGwtc3RhdHVzLXdvcmtlci5qcyJdLCJuYW1lcyI6WyJpbnN0YWxsU3RhdHVzTG9vcFdvcmtlciIsInRpbWVPdXQiLCJ0aW1lT3V0SGFuZGxlIiwiZmlsZVBhdGgiLCJpdGVyYXRpb25zIiwib2xkUGVyY2VudCIsIm5lZWRFbmFibGVBZnRlckluc3RhbGwiLCIkcHJvZ3Jlc3NCYXIiLCIkIiwibW9kdWxlVW5pcWlkIiwiaW5pdGlhbGl6ZSIsIm5lZWRFbmFibGUiLCJyZXN0YXJ0V29ya2VyIiwid2luZG93IiwiY2xlYXJUaW1lb3V0IiwidGltZW91dEhhbmRsZSIsIndvcmtlciIsIlBieEFwaSIsIk1vZHVsZXNHZXRNb2R1bGVJbnN0YWxsYXRpb25TdGF0dXMiLCJjYkFmdGVyUmVjZWl2ZU5ld1N0YXR1cyIsInJlc3VsdCIsInJlc3BvbnNlIiwic2V0VGltZW91dCIsImRhdGEiLCJpX3N0YXR1cyIsIlVzZXJNZXNzYWdlIiwic2hvd011bHRpU3RyaW5nIiwibWVzc2FnZXMiLCJnbG9iYWxUcmFuc2xhdGUiLCJleHRfSW5zdGFsbGF0aW9uRXJyb3IiLCJyZW1vdmVDbGFzcyIsInByb2dyZXNzIiwicGVyY2VudCIsInBhcnNlSW50IiwiaV9zdGF0dXNfcHJvZ3Jlc3MiLCJNb2R1bGVzRW5hYmxlTW9kdWxlIiwidW5pcWlkIiwibG9jYXRpb24iLCJnbG9iYWxSb290VXJsIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLHVCQUF1QixHQUFHO0FBRTVCO0FBQ0o7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLE9BQU8sRUFBRSxJQU5tQjs7QUFRNUI7QUFDSjtB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QyxDQUE4QztBQUMxQ0MsUUFBQUEsT0FBTyxFQUFFQyxRQUFRLENBQUNaLFFBQVEsQ0FBQ0UsSUFBVCxDQUFjVyxpQkFBZixFQUFrQyxFQUFsQztBQUR5QixPQUE5Qzs7QUFHQSxVQUFJbEMsdUJBQXVCLENBQUNLLFVBQXhCLEtBQXVDZ0IsUUFBUSxDQUFDRSxJQUFULENBQWNXLGlCQUF6RCxFQUE0RTtBQUN4RWxDLFFBQUFBLHVCQUF1QixDQUFDSSxVQUF4QixHQUFxQyxDQUFyQztBQUNIOztBQUNESixNQUFBQSx1QkFBdUIsQ0FBQ0ssVUFBeEIsR0FBcUNnQixRQUFRLENBQUNFLElBQVQsQ0FBY1csaUJBQW5EO0FBQ0gsS0FSTSxNQVFBLElBQUliLFFBQVEsQ0FBQ0UsSUFBVCxDQUFjQyxRQUFkLEtBQTJCLHVCQUEvQixFQUF3RDtBQUMzRHhCLE1BQUFBLHVCQUF1QixDQUFDTyxZQUF4QixDQUFxQ3dCLFFBQXJDLENBQThDO0FBQzFDQyxRQUFBQSxPQUFPLEVBQUU7QUFEaUMsT0FBOUM7O0FBR0EsVUFBSWhDLHVCQUF1QixDQUFDTSxzQkFBNUIsRUFBb0Q7QUFDaEQ7QUFDQVcsUUFBQUEsTUFBTSxDQUFDa0IsbUJBQVAsQ0FDSWQsUUFBUSxDQUFDRSxJQUFULENBQWNhLE1BRGxCLEVBRUksWUFBTTtBQUNGdkIsVUFBQUEsTUFBTSxDQUFDd0IsUUFBUCxhQUFxQkMsYUFBckI7QUFDSCxTQUpMO0FBTUgsT0FSRCxNQVFPO0FBQ0g7QUFDQXpCLFFBQUFBLE1BQU0sQ0FBQ3dCLFFBQVAsYUFBcUJDLGFBQXJCO0FBQ0g7O0FBQ0R6QixNQUFBQSxNQUFNLENBQUNDLFlBQVAsQ0FBb0JkLHVCQUF1QixDQUFDZSxhQUE1QztBQUNIO0FBQ0o7QUFqSTJCLENBQWhDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIE1pa29QQlggLSBmcmVlIHBob25lIHN5c3RlbSBmb3Igc21hbGwgYnVzaW5lc3NcbiAqIENvcHlyaWdodCDCqSAyMDE3LTIwMjMgQWxleGV5IFBvcnRub3YgYW5kIE5pa29sYXkgQmVrZXRvdlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuLyogZ2xvYmFsIGdsb2JhbFJvb3RVcmwsIFBieEFwaSwgZ2xvYmFsVHJhbnNsYXRlLCBVc2VyTWVzc2FnZSAqL1xuXG4vKipcbiAqIE1vbml0b3JzIHRoZSBzdGF0dXMgb2YgbW9kdWxlIGluc3RhbGxhdGlvbi5cbiAqXG4gKiBAbW9kdWxlIGluc3RhbGxTdGF0dXNMb29wV29ya2VyXG4gKi9cbmNvbnN0IGluc3RhbGxTdGF0dXNMb29wV29ya2VyID0ge1xuXG4gICAgLyoqXG4gICAgICogVGltZSBpbiBtaWxsaXNlY29uZHMgYmVmb3JlIGZldGNoaW5nIG5ldyBzdGF0dXMgcmVxdWVzdC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRpbWVPdXQ6IDEwMDAsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgaWQgb2YgdGhlIHRpbWVyIGZ1bmN0aW9uIGZvciB0aGUgc3RhdHVzIHdvcmtlci5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRpbWVPdXRIYW5kbGU6IDAsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZmlsZSBwYXRoIG9mIHRoZSBtb2R1bGUgYmVpbmcgaW5zdGFsbGVkLlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgZmlsZVBhdGg6ICcnLFxuXG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiBpdGVyYXRpb25zIHBlcmZvcm1lZC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIGl0ZXJhdGlvbnM6IDAsXG5cbiAgICAvKipcbiAgICAgKiBUaGUgcHJldmlvdXMgcHJvZ3Jlc3MgcGVyY2VudGFnZS5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIG9sZFBlcmNlbnQ6ICcwJyxcblxuICAgIC8qKlxuICAgICAqIEZsYWcgaW5kaWNhdGluZyBpZiBlbmFibGluZyBpcyBuZWVkZWQgYWZ0ZXIgaW5zdGFsbGF0aW9uLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIG5lZWRFbmFibGVBZnRlckluc3RhbGw6IGZhbHNlLFxuXG4gICAgLyoqXG4gICAgICogVGhlIHByb2dyZXNzIGJhciBsYWJlbCBlbGVtZW50LlxuICAgICAqIEB0eXBlIHtqUXVlcnl9XG4gICAgICovXG4gICAgJHByb2dyZXNzQmFyOiAkKCcjdXBsb2FkLXByb2dyZXNzLWJhcicpLFxuXG4gICAgLyoqXG4gICAgICogTW9kdWxlIFVuaXF1ZSBpZC5cbiAgICAgKiBAdHlwZSBzdHJpbmdcbiAgICAgKi9cbiAgICBtb2R1bGVVbmlxaWQ6ICcnLFxuXG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgaW5zdGFsbFN0YXR1c0xvb3BXb3JrZXIgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aCAtIFRoZSBmaWxlIHBhdGggb2YgdGhlIG1vZHVsZSBiZWluZyBpbnN0YWxsZWQuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbbmVlZEVuYWJsZT1mYWxzZV0gLSBGbGFnIGluZGljYXRpbmcgaWYgZW5hYmxpbmcgaXMgbmVlZGVkIGFmdGVyIGluc3RhbGxhdGlvbi5cbiAgICAgKi9cbiAgICBpbml0aWFsaXplKGZpbGVQYXRoLCBuZWVkRW5hYmxlID0gZmFsc2UpIHtcbiAgICAgICAgaW5zdGFsbFN0YXR1c0xvb3BXb3JrZXIuZmlsZVBhdGggPSBmaWxlUGF0aDtcbiAgICAgICAgaW5zdGFsbFN0YXR1c0xvb3BXb3JrZXIuaXRlcmF0aW9ucyA9IDA7XG4gICAgICAgIGluc3RhbGxTdGF0dXNMb29wV29ya2VyLm5lZWRFbmFibGVBZnRlckluc3RhbGwgPSBuZWVkRW5hYmxlO1xuICAgICAgICBpbnN0YWxsU3RhdHVzTG9vcFdvcmtlci5yZXN0YXJ0V29ya2VyKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlc3RhcnRzIHRoZSB3b3JrZXIuXG4gICAgICovXG4gICAgcmVzdGFydFdvcmtlcigpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChpbnN0YWxsU3RhdHVzTG9vcFdvcmtlci50aW1lb3V0SGFuZGxlKTtcbiAgICAgICAgaW5zdGFsbFN0YXR1c0xvb3BXb3JrZXIud29ya2VyKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFdvcmtlciBmdW5jdGlvbiBmb3IgY2hlY2tpbmcgdGhlIGluc3RhbGxhdGlvbiBzdGF0dXMuXG4gICAgICovXG4gICAgd29ya2VyKCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGluc3RhbGxTdGF0dXNMb29wV29ya2VyLnRpbWVvdXRIYW5kbGUpO1xuICAgICAgICBQYnhBcGkuTW9kdWxlc0dldE1vZHVsZUluc3RhbGxhdGlvblN0YXR1cyhcbiAgICAgICAgICAgIGluc3RhbGxTdGF0dXNMb29wV29ya2VyLmZpbGVQYXRoLFxuICAgICAgICAgICAgaW5zdGFsbFN0YXR1c0xvb3BXb3JrZXIuY2JBZnRlclJlY2VpdmVOZXdTdGF0dXNcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgZnVuY3Rpb24gYWZ0ZXIgcmVjZWl2aW5nIHRoZSBuZXcgaW5zdGFsbGF0aW9uIHN0YXR1cy5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJlc3VsdCAtIFRoZSByZXN1bHQgb2YgdGhlIGluc3RhbGxhdGlvbiBzdGF0dXMgY2hlY2suXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIC0gVGhlIHJlc3BvbnNlIG9iamVjdCBjb250YWluaW5nIHRoZSBpbnN0YWxsYXRpb24gc3RhdHVzLlxuICAgICAqL1xuICAgIGNiQWZ0ZXJSZWNlaXZlTmV3U3RhdHVzKHJlc3VsdCwgcmVzcG9uc2UpIHtcbiAgICAgICAgaW5zdGFsbFN0YXR1c0xvb3BXb3JrZXIuaXRlcmF0aW9ucyArPSAxO1xuICAgICAgICBpbnN0YWxsU3RhdHVzTG9vcFdvcmtlci50aW1lb3V0SGFuZGxlID1cbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGluc3RhbGxTdGF0dXNMb29wV29ya2VyLndvcmtlciwgaW5zdGFsbFN0YXR1c0xvb3BXb3JrZXIudGltZU91dCk7XG5cbiAgICAgICAgLy8gQ2hlY2sgaW5zdGFsbGF0aW9uIHN0YXR1c1xuICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZVxuICAgICAgICAgICAgJiYgaW5zdGFsbFN0YXR1c0xvb3BXb3JrZXIuaXRlcmF0aW9ucyA8IDUwKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGluc3RhbGxTdGF0dXNMb29wV29ya2VyLnRpbWVvdXRIYW5kbGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGluc3RhbGxTdGF0dXNMb29wV29ya2VyLml0ZXJhdGlvbnMgPiA1MFxuICAgICAgICAgICAgfHwgcmVzcG9uc2UuZGF0YS5pX3N0YXR1cyA9PT0gJ0lOU1RBTExBVElPTl9FUlJPUidcbiAgICAgICAgICAgIHx8IHJlc3BvbnNlLmRhdGEuaV9zdGF0dXMgPT09ICdQUk9HUkVTU19GSUxFX05PVF9GT1VORCdcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGluc3RhbGxTdGF0dXNMb29wV29ya2VyLnRpbWVvdXRIYW5kbGUpO1xuICAgICAgICAgICAgVXNlck1lc3NhZ2Uuc2hvd011bHRpU3RyaW5nKHJlc3BvbnNlLm1lc3NhZ2VzLCBnbG9iYWxUcmFuc2xhdGUuZXh0X0luc3RhbGxhdGlvbkVycm9yKTtcbiAgICAgICAgICAgICQoJy5sb2FkaW5nJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5kYXRhLmlfc3RhdHVzID09PSAnSU5TVEFMTEFUSU9OX0lOX1BST0dSRVNTJykge1xuICAgICAgICAgICAgaW5zdGFsbFN0YXR1c0xvb3BXb3JrZXIuJHByb2dyZXNzQmFyLnByb2dyZXNzKHtcbiAgICAgICAgICAgICAgICBwZXJjZW50OiBwYXJzZUludChyZXNwb25zZS5kYXRhLmlfc3RhdHVzX3Byb2dyZXNzLCAxMCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChpbnN0YWxsU3RhdHVzTG9vcFdvcmtlci5vbGRQZXJjZW50ICE9PSByZXNwb25zZS5kYXRhLmlfc3RhdHVzX3Byb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFsbFN0YXR1c0xvb3BXb3JrZXIuaXRlcmF0aW9ucyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnN0YWxsU3RhdHVzTG9vcFdvcmtlci5vbGRQZXJjZW50ID0gcmVzcG9uc2UuZGF0YS5pX3N0YXR1c19wcm9ncmVzcztcbiAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5kYXRhLmlfc3RhdHVzID09PSAnSU5TVEFMTEFUSU9OX0NPTVBMRVRFJykge1xuICAgICAgICAgICAgaW5zdGFsbFN0YXR1c0xvb3BXb3JrZXIuJHByb2dyZXNzQmFyLnByb2dyZXNzKHtcbiAgICAgICAgICAgICAgICBwZXJjZW50OiAxMDAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChpbnN0YWxsU3RhdHVzTG9vcFdvcmtlci5uZWVkRW5hYmxlQWZ0ZXJJbnN0YWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gRW5hYmxlIHRoZSBpbnN0YWxsZWQgbW9kdWxlIGFuZCByZWRpcmVjdCB0byB0aGUgbW9kdWxlIGluZGV4IHBhZ2VcbiAgICAgICAgICAgICAgICBQYnhBcGkuTW9kdWxlc0VuYWJsZU1vZHVsZShcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YS51bmlxaWQsXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGAke2dsb2JhbFJvb3RVcmx9cGJ4LWV4dGVuc2lvbi1tb2R1bGVzL2luZGV4L2A7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmVkaXJlY3QgdG8gdGhlIG1vZHVsZSBpbmRleCBwYWdlXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gYCR7Z2xvYmFsUm9vdFVybH1wYngtZXh0ZW5zaW9uLW1vZHVsZXMvaW5kZXgvYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoaW5zdGFsbFN0YXR1c0xvb3BXb3JrZXIudGltZW91dEhhbmRsZSk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbiJdfQ==