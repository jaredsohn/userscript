// ==UserScript==
// @name          BlankGmailLogo
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

(function () {
    var css =  '#:rk { opacity: 0 !important; filter:alpha(opacity=0) !important; background:none !important; display:none !important; }';
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
