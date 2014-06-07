// ==UserScript==
// @name           Facebook Sidebar Remover
// @namespace      http://www.userscripts.org
// @description    Removes the entire right column throughout Facebook and increases the width of the content area to fill the remaining white space.
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

var zGbl_DOM_ChangeTimer                = '';
var bGbl_ChangeEventListenerInstalled   = false;

window.addEventListener ("load", MainAction, false);

function MainAction ()
{
    if (!bGbl_ChangeEventListenerInstalled)
    {
        bGbl_ChangeEventListenerInstalled   = true;
        document.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    }

	var fbHomeSidebar = document.getElementById('rightCol');
	if (fbHomeSidebar) {
		fbHomeSidebar.parentNode.removeChild(fbHomeSidebar);
		d = document.getElementById('contentArea');
		d.style.width="760px";
	}
}

function HandleDOM_ChangeWithDelay (zEvent)
{
    if (typeof zGbl_DOM_ChangeTimer == "number")
    {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer     = setTimeout (function() { MainAction (); }, 1); //-- 1ms, adjust as necessary
}