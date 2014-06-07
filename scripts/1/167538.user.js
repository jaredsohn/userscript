// ==UserScript==
// @name        4chan spacebar refreshing index
// @namespace   http://noidea.am/lost/confused
// @description Hitting spacebar at the bottom of a 4chan board's index page refreshes it.
// @include     /boards\.4chan\.org\/\w+\/\d{0,2}$/
// @version     1
// ==/UserScript==

addEventListener('load', function()
{
    var keydown_okay = undefined;
    var did = false;
    var d = document.documentElement;
    var b = function() { return d.scrollHeight - d.scrollTop === d.clientHeight; };
    var k = function(e) { return (e.keyCode === 34) || (!e.shiftKey && e.keyCode === 32); };

    d.addEventListener('keydown', function(e)
    {
        if(typeof keydown_okay === 'undefined') // we want the initial state
        {
            keydown_okay = b() && k(e);
        }
    }, false);
    
    d.addEventListener('keyup', function(e)
    {
        if(keydown_okay && b() && k(e) && !did)
        {
            location.reload(true);
            did = true;
        }
        
        keydown_okay = undefined;
	}, false);
}, false);