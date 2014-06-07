// ==UserScript==
// @name                    [TS] Google SafeSearch Toggle
// @namespace               TimidScript
// @description             SSimple scripts that adds button to allow you to toggle between safe and adult mode
// @include                 *.google.*/webhp*
// @include                 *.google.*/search*
// @version                 1.0.3
// @run-at                  document-start
// @require                 http://userscripts.org/scripts/source/159301.user.js
// @resource  meta          http://userscripts.org/scripts/source/163753.meta.js
// @icon                    data:image/png;base64,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
// @versioninfo             Small bug fix and now works with <a href="http://userscripts.org/scripts/show/159750">Schmoogle Version 2</a> Quick-Menu (Should be released before 2013/08/15)
// ==/UserScript==

/*
=========================================================================================
TimidScript's Homepage:         http://userscripts.org/users/100610
Script's Homepage:              http://userscripts.org/scripts/show/163753
Copyright © TimidScript

-----------------------------------------------------------------------------------------
    Version History
-----------------------------------------------------------------------------------------
1.0.3
 - Schmoogle Version 2 Support
 - Small changes in regular expression
 - BugFix: Changing location url does not always load the page. It seems google can
 load content without reloading the whole page. 

1.0.2
 - Made the code more tidy
 - Replaced script icon
 - Run at document start
 - Installed Updater

1.0.1
 - Initial release
=========================================================================================*/

var safeOn = GM_getValue("Safe", true);
if ((safeOn && !IsSafeURL()) || (!safeOn && !IsAdultURL())) AdjustURL();

var SafeSwitch = document.createElement("input");
var interval = setInterval(AddButton, 500);
     

function AddButton()
{
    if (document.readyState == "loading") return;//interactive complete
    clearInterval(interval);

    SafeSwitch.type = "button";
    SafeSwitch.setAttribute("style", "position:fixed; top: 5px; right: 5px; z-index: 9999; border: 1px solid gray; background-color: black; color: white; cursor: pointer;");
    SafeSwitch.id = "safeSearchToggler";

    SetSwitchText();

    SafeSwitch.onclick = ToggleSafe;

    document.body.onkeydown = function (e) { if (e.keyCode == 121) ToggleSafe(); };
    document.body.appendChild(SafeSwitch);

    document.body.onmousemove = function (e)
    {
        if ((window.innerWidth - e.clientX < 100) && (e.clientY < 100)) SafeSwitch.style.display = null;
        else SafeSwitch.style.display = "none";
    };
}

function ToggleSafe()
{
    safeOn = !safeOn;
    GM_setValue("Safe", safeOn);
    AdjustURL();
    SetSwitchText();

}

function AdjustURL()
{
    var url = document.URL.replace(/&safe=[a-z]+/gi, "");
    document.location = url + ((safeOn) ? "&safe=on" : "&safe=off");
}

function IsSafeURL()
{
    return (document.URL.indexOf("&safe=on") != -1);
}

function IsAdultURL()
{
    return (document.URL.indexOf("&safe=off") != -1);
}

function SetSwitchText()
{
    SafeSwitch.value = safeOn ? "Safe On" : "Safe Off";
}