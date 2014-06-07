// ==UserScript==
// @id            Show Passwords
// @name          Show Passwords
// @version       1.2
// @namespace     *
// @author        Lomakin Anton
// @description   Shows password fields as plain text when you pass the mouse over them.
// @include       *
// @copyright   	2012+, Lomakin Anton (http://t0h.livejournal.com/)
// @licence     	LGPL 3
// @grant       	none
// @run-at        document-end
// ==/UserScript==
 if (typeof GM_addStyle == 'undefined') {
      /**
       * Example: GM_addStyle('* {color:red}')
       * @param {String} css
       */
      function GM_addStyle(css) {
        var head = document.getElementsByTagName('head')[0];
        if (head) {
          var style = document.createElement("style");
          style.type = "text/css";
          style.appendChild(document.createTextNode(css));
          head.appendChild(style);
        }
      }
    }
GM_addStyle("input[type='password'], .gm_red_border { border:1px solid red!important;}");

window.setTimeout(function() {
  var passFields = document.querySelectorAll("input[type='password']");
  if (!passFields.length) return;
	for ( keyVar in passFields ) {
		passFields[keyVar].className+=' gm_red_border';
    passFields[keyVar].addEventListener("dblclick", function() { this.type = "text"; }, false);
    passFields[keyVar].addEventListener("blur",     function() { this.type = "password"; }, false);
  }
}, 100)