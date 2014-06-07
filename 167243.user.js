// ==UserScript==
// @name            Hack Forums Search Popup
// @namespace       Snorlax
// @description     Makes a quick search popup
// @include         http://hackforums.net/*
// @include         http://www.hackforums.net/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require			http://puu.sh/2QUaB.js
// @version         1
// ==/UserScript==

$(document).on('keyup', function(e) {
key = e.which;
if ($(e.target).is('input, textarea, select')) return;
	if (e.which == 83) {
        $('head').append('<link rel="stylesheet" href="http://harlem-shake-it.com/hackforums/snorlax.css" type="text/css" />');
		test();
	}
});

function test() {
    TINY.box.show({url:'http://harlem-shake-it.com/hackforums/hfquicksearch.html',width:300,height:150})
     $("#textbox").focus();

}