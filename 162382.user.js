// ==UserScript==
// @name        Reddit - One-click removal
// @include		/^https?://(.*\.)?reddit\.com/.*/
// @version		1.0
// @run-at document-start
// ==/UserScript==

function autoDelete() {
	//Using .on doesn't trigger Toolbox's removal reasons :(
    $('.remove-button').live('click', function(){
		return $(this).find('.yes').click();
	});
}

//Add the script to the page
document.addEventListener('DOMContentLoaded', function(e) {
	var s = document.createElement('script');
	s.textContent = '('+autoDelete.toString()+')();';
	document.head.appendChild(s);
});