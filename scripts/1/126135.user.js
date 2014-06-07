// ==UserScript==
// @name           Submissions navigation
// @namespace      FA_DOT_NET
// @include        http://www.furaffinity.net/view/*
// @include        http://www.furaffinity.net/full/*
// ==/UserScript==

function getElementsByClassName(classname, node) {
	if( ! node ) 
		node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].className))a.push(els[i]);
			return a;
}

function getCursorPosition(e) {
    e = e || window.event;
    var cursor = {x:0, y:0};
    if (e.pageX || e.pageY)
    {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    }
    else
    {
        var de = document.documentElement;
        var b = document.body;cursor.x = e.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);cursor.y = e.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
    }
    return cursor;
};

prev = getElementsByClassName('prev');
next = getElementsByClassName('next');

// Keyboard!

document.onkeypress = function(e){
	if ( ! e.ctrlKey )
		return true;
		
	if( e.target.tagName != 'BODY' )
		return;
		
	if ( e.keyCode == 37 && prev.length > 0 )
		window.location = prev;
		
	if ( e.keyCode == 39 && next.length > 0 )
		window.location = next;		
}

// Mousey~

var obFormerCursor = {};
var dispersionY = 50;
var runwayX = -70;
document.onmousedown = function(e){
	if (e.which === 3) {
		obFormerCursor = getCursorPosition(e);
	}
};

document.onmouseup = function(e){
	if (e.which === 3) {
		obCurrentCursor = getCursorPosition(e);
		if ( obCurrentCursor.x - obFormerCursor.x < runwayX )
		{
			curYDispersion = Math.abs(obCurrentCursor.y - obFormerCursor.y);
			if ( curYDispersion < dispersionY )
			{
				document.oncontextmenu = function() {
					return false;
				}
				window.location = prev;
			}
		}
		else if ( obCurrentCursor.x - obFormerCursor.x > Math.abs(runwayX) )
		{
			curYDispersion = Math.abs(obCurrentCursor.y - obFormerCursor.y);
			if ( curYDispersion < dispersionY )
			{
				document.oncontextmenu = function() {
					return false;
				}
				window.location = next;
			}
		}
		return false;
	}
};