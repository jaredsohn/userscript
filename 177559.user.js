// ==UserScript==
// @name          Test
// @run-at         document-start

// ==/UserScript==

function Hide(){
$("#playback").toggle();
}

$("body").click(function(){Hide();});
