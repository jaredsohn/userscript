// ==UserScript==
// @name        Plug.DJ Fullscreen
// @description Adds a fullscreen toggle to plug.dj rooms!
// @downloadURL https://userscripts.org/scripts/source/183932.user.js
// @updateURL   https://userscripts.org/scripts/source/183932.user.js
// @namespace   http://mooseworx.de
// @include     http://plug.dj/*
// @version     1.2
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var container;
var playback;

var fullscreen = false;

waitForKeyElements("#playback-container", gotcontainer);

function toggle_fullscreen()
{	
	fullscreen = !fullscreen;
	if (!fullscreen)
	{
		playback.left = null;
		playback.zIndex = null;
		playback.width = null;
		playback.height = null;
		container.width = null;
		container.height = null;
		$(window).trigger('resize');
	}
	else
	{
		check_size();
	}
}

function check_size()
{
	if (fullscreen)
	{
		playback.left = 0;
		playback.zIndex = 5;
		playback.width = "100%";
		playback.height = "100%";
		container.width = "100%";
		container.height = "100%";
	}
}

function gotcontainer(jnode)
{
    playback = document.getElementById("playback").style;
	container = document.getElementById("playback-container").style;
	var controls = document.getElementById("playback-controls");
	
	var btn = document.createElement('input');
	btn.value = 'Toggle fullscreen!';
	btn.type = 'button';
	btn.onclick = function() {toggle_fullscreen();};
	controls.appendChild(btn);
	
	window.setInterval(check_size, 200);
}

function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;
 
    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);
 
    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;
 
            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }
 
    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];
 
    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}