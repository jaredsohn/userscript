// ==UserScript==

// @name           Skip NXEC login
// @namespace      nxec_autologin
// @description    Skip logging into NXEC wifi
// @include        http://www.nationalexpresswifi.train/
// ==/UserScript==


(function() {
    window.location.href = window.location.href.replace('http://www.nationalexpresswifi.train/', 'http://www.nationalexpresswifi.train/icomera/authentication/progress.asp?realm=nxec&login=nxec&password=FreeWifi&language=en');
})();
