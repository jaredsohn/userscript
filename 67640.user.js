// ==UserScript==
// @name           Minimal Google Homepage
// @description    Get a minimal homepage
// @include           http://www.google.*/
// @exclude          http://www.google.*/*
// @contributor    gantt http://userscripts.org/users/50100
// @version           0.1
// ==/UserScript==

(function () {
    var css =  '#ghead, #footer *, form .lsb:last-child, #sbl { opacity: 0 !important; } #footer, .lsb { display: none !important; } body * { color: #fff !important; } form * { color: #000 !important; }';
    if (typeof GM_addStyle != 'undefined') {
      GM_addStyle(css);
	  } else if (typeof PRO_addStyle != 'undefined') {
      PRO_addStyle(css);
	  } else {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
})();