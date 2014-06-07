// ==UserScript==
//
//Displayable Name of your script 
// @name           Cheat for 10fastfingers 
//
// brief description
// @description    Copy/paste words you must type in the input field, just press space! 
// 
//Version Number
// @version        1.0
//
// Urls process this user script on
// @match          http://10fastfingers.com/typing-test/french
// 
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
//
// ==/UserScript==

//And of course your code!!
$(function(){
	function texttopaste(){
		$("#inputfield").val($("span.highlight").html());
	}
	document.onkeyup=function(e){
		if(e.keyCode == 37){texttopaste()};
	}
})