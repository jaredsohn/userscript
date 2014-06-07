// ==UserScript==
// @name           votevotevote
// @namespace      www.erepublik.com
// @description    vote
// @version        0.1
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/en?viewPost*
// @require        http://code.jquery.com/jquery-1.6.1.min.js
// @require        http://json-template.googlecode.com/files/json-template.js

// profile         http://www.erepublik.com/en/citizen/profile/4289506

// ==/UserScript==
/*------------------------------------------------------------------------------
----------------------------------------------*/
$(document).ready(function () {
setInterval(function(){

	$('a[id^=like_comment_]').each(function(){
		  	$(this).text("Vote");
		
	});
	 
	},1000);	
	
});
	
	
	