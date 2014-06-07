// ==UserScript==
// @name   ZeitBlock
// @namespace  http://www.zeit.de
// @description Block User comments on zeit.de 
// @include *zeit.de*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var blocked = localStorage.getItem('zeitBlocker');
if(!blocked){
	blocked = [];
}
else{
	blocked = blocked.split(':'); //just a delimiter
}
// Find al li-elements
$('li.clear ul.user li.name cite a').each(function(){
	var userName = $(this).text();
	if($.inArray(userName, blocked)!=-1){
		//remove the whole element
		$(this).parent().parent().parent().parent().remove();
	}
	else{
		//add block X button
		$(this).parent().append('<span class="blockButton"><b>BLOCK </b></span>');
		var button = $('.blockButton', $(this).parent());
		button.css('cursor', 'pointer');
		button.css('background-color', 'lightgrey').css('float', 'left');

		// block and remove element on click
		button.click(function(){
			blocked.push(userName);
			localStorage.setItem('zeitBlocker', blocked.join(':'));
				$(this).parent().parent().parent().parent().remove();
		});
	}
});
var head = $('.head');
head.parent().append('<span class="unblockButton"><b>Unblock All Users</b></span>');
var button = $('.unblockButton', $('.head').parent());
button.css('cursor', 'pointer');
button.css('background-color', 'green').css('float', 'center');
// block and remove element on click
button.click(function(){
	blocked = [];
	localStorage.setItem('zeitBlocker', blocked);
	window.location.reload();
});