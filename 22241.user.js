// ==UserScript==
// @name           Facebook Error Page Reloader
// @namespace      http://userscripts.org/people/14536
// @description    Automatically clicks the "Try Again" button for you on Facebook error pages.
// @include        http://apps.facebook.com/*
// @author         Vaughan Chandler
// ==/UserScript==

// Last updated on 2008-02-03

(function(){

var delay = 5;

var interval;

try {
	if (document.getElementById('error_message').innerHTML.toLowerCase().indexOf('error while loading page from') != -1) {
		var cancelButton = document.createElement('input');
		cancelButton.type = 'button';
		cancelButton.value = 'Do Not Try Again';
		cancelButton.className = 'inputbutton';
		cancelButton.addEventListener('click', function() {
			tryAgainButton.value = 'Try Again';
			cancelButton.disabled = true;
			clearInterval(interval);
			this.style.background = "#999999";
		}, true);
		var tryAgainButton = document.getElementById('try_again_button');
		tryAgainButton.parentNode.insertBefore(cancelButton, tryAgainButton.nextSibling);
		delay++;
		interval = setInterval(function(){
			delay--;
			if (delay==0) {
				tryAgainButton.value = 'Trying Now';
				tryAgainButton.click();
				clearInterval(interval);
			} else {
				tryAgainButton.value = 'Trying in ' + delay + ' seconds';
			}
		}, 1000);
	}
} catch(x) {}

})();