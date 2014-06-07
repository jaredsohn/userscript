

// ==UserScript==
// @name Test
// @namespace	  
// @description  Changes the title to the countdown of the quickreply
// @version       1.0
// @include		*4chan.org/*
// @exclude	   
// ==/UserScript==
function UpdateTitle(){
alert("Test");
}

$("qrform").getElementsByTagName("submit").setAttribute('onChange', 'UpdateTitle()');