// ==UserScript==
// @name           jQuery Updated
// @namespace      System
// @author			Samo502
// @description    Original script by Bruno Leonardo Michels, updated to most recent jQuery by Samo502.
// @include        *
// ==/UserScript==

function LoadScript(file)
{
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = file;
	document.getElementsByTagName('head')[0].appendChild(script);
    Wait();
};

var is$Reg = unsafeWindow.$;
function Wait()
{
    if (unsafeWindow.jQuery !== undefined)
    {
        if (is$Reg !== undefined)
            unsafeWindow.jQuery.noConflict();
    }
    else
    {
        setTimeout(Wait, 100);
    }
}

if (unsafeWindow.jQuery == undefined)
	LoadScript("http://code.jquery.com/jquery-1.5.1.min.js");