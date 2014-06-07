// ==UserScript==
// @name           jQuery
// @namespace      System
// @author			Bruno Leonardo Michels
// @description    Inject jQuery
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
	LoadScript("http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");