// ==UserScript==
// @namespace 			http://riddle.pl/-/greasemonkey/twitter.textarea.user.js
// @name 						Twitter Textarea Hack
// @description 		Replaces chars counter and removes blockade when we exceed number of chars
// @author				 	Riddle
// @version 				1.1.2
// @include 				http://twitter.com/home*
// @include 				https://twitter.com/home*
// @include 				http://twitter.com/replies
// @include 				https://twitter.com/replies
// ==/UserScript==

var textarea = document.getElementById('status')
if (textarea) {
	textarea.removeAttribute('onkeyup');
	textarea.removeAttribute('onkeypress');
	
	window.addEventListener('load', function() {
		var area = document.getElementById('chars_left_notice')
		var maxelem = document.getElementById('status-field-char-counter');		
		if (area && maxelem) {	
			var max = textarea.value.length + parseInt(maxelem.firstChild.nodeValue);
			var limitelem = document.createElement('strong');			
			limitelem.appendChild(document.createTextNode(max));
			maxelem.firstChild.nodeValue = textarea.value.length;			
			area.appendChild(document.createTextNode('/ '));
			area.appendChild(limitelem);			
			function check() {
				if (textarea.value.length > max) {
					maxelem.style.color = '#c00'
				} else {
					maxelem.style.color = '#ccc'
				}
			}			
			textarea.addEventListener('keyup', function(e) {
				maxelem.firstChild.nodeValue = this.value.length;
				check()
			}, false);
			check()			
		}
		unsafeWindow.updateStatusTextCharCounter = function(){
			maxelem.firstChild.nodeValue = '0';
			textarea.focus();
		};
	}, false);	
}