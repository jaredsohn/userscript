// ==UserScript==
// @name           Copy&Paste task
// @description    Copy&Paste task on IATMS
// @include        http://iatms.sonyericsson.net/*
// ==/UserScript==

// Disable the GM_log function.
GM_log = function(){};

var $1 = unsafeWindow.jQuery;

//document.title = "Parking...";

var positionElement = $1("#tbName");

if (positionElement[0]) {
	positionElement.before('<a href="#" id="GM_Copy">Save as new task</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" id="GM_CleanNotes">Clean Notes</a>');
}

$1("#GM_Copy").click(function(event){
	event.preventDefault();
	unsafeWindow.currentID = 0;
        alert("OK!");
});

$1("#GM_CleanNotes").click(function(event){
	event.preventDefault();
	$1("#tbOldNotes").val('');
});
