// ==UserScript==
// @name        RiddleLimiter with Automatically-submit
// @namespace   rlimiter, Mikatz
// @include     http://hentaiverse.org*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version     1.0.c
// ==/UserScript==

$(document).ready(function () {
	if ($("#riddlemaster").length != 0) {
		form = $("#riddlemaster").parent();
		form2 = form.clone();
		form2.empty();
		form2.css('margin','0');
		form2.css('padding-left','98px');
		form.parent().append(form2);
		currentInput = $("#riddlemaster");
		array = ['A', 'B', 'C', 'D'];
		
		for (i in array) {
			element = $(document.createElement('input'));
			label = $(document.createElement('label'));
			label.css('margin-right','15px');
			label.text(array[i]);
			form2.append(label);
			element.attr('name', 'riddlemaster');
			element.attr('type', 'radio');
			element.attr('value', array[i]);
			currentInput.before(element);
		}
		currentInput.remove();

		// Mikatz Code
		$('#riddleform input').bind('click', function(){ document.getElementById('riddleform').submit() });
	}
});
