// ==UserScript==
// @name        Horizontal Trello Scroller
// @namespace   https://twitter.com/George_Hahn
// @description Makes scroll wheel scroll Trello horizontally. Hacky, YMMV. Works on Nightly 2/28/2013.
// @include     https://trello.com/board/*
// @version     1.1
// @run-at document-end
// @grant none
// ==/UserScript==

var horiztrello_timer = setInterval(function(){init()}, 500);
var scrollpanel;

var init = function()
{
	scrollpanel = document.getElementById("board")
	if(scrollpanel == null)
		return;
	
	scrollpanel = scrollpanel.getElementsByTagName("div")[2];
	if(scrollpanel != null)
		horiztrello_timer.clearInterval(timer);
}

// Fetched from Andy E on StackOverflow and tweaked slightly.
// http://stackoverflow.com/a/2346987/1042744
var mouseWheelEvt = function (e)
{
    var event = e || window.event;
    if (document.body.doScroll)
        document.body.doScroll(event.wheelDelta>0?"left":"right");
    else if ((event.wheelDelta || event.detail) > 0)
        scrollpanel.scrollLeft += 30;
    else
        scrollpanel.scrollLeft -= 30;

    return false;
}

if ("onmousewheel" in document.body)
    document.body.onmousewheel = mouseWheelEvt;
else
    document.body.addEventListener("DOMMouseScroll", mouseWheelEvt);