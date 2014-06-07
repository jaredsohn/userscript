// ==UserScript==
// @name           Google Instant Keyboard Shortcuts
// @namespace  google.com
// @description  Gets to Google results quicker via keyboard
// @include        http://*.google.*
// @include        http://www.google.com/*
// @include        https://www.google.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js
// @require        http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @version	   0.01
// ==/UserScript==

//TODO Comment some more?
//TODO Make sure you properly attribute jQuery (and sizzle?), the keyboard shortcuts library, Mafuyu (sp?) and their respective licenses
//TODO Figure out a better way to refresh this functionality during searches
//TODO Make sure you properly attribute Mafuyu, the keyboard shortcuts library, the other Google Speed Dial script (?) and WOT (?)
//TODO Consider restoring classic keyboard shortcuts; and possibly make them customizable for use w/ Dvorak and Colemak
//TODO consider having the keyboard cursor skip ads 
//TODO Make sure all the google search results pages are included
//TODO Make sure code works on pages with less than 10 results
//TODO Remove the redundant tab index of search previews
//TODO add "/" to only bring focus to the search field instead of appending "/" to it
//TODO Investigate this script's impact on code.google.com

//Assigns alt as the modifier key for everyone except Mac users, for which ctrl assigned as the modifier key
modifier = navigator.userAgent.indexOf("Macintosh") != 0 ? "ctrl+" : "alt+";

GM_addStyle(".Mafuyu_numberLabel {color : gray; margin : 0 0.5em 0 0.5em; padding : 0 5px 0 5px; border-radius: 10px; border : 1px solid #ffa; background-color : #ffa;}");

//shortcut.add("/",function(){document.getElementsByName('q')[0].focus()},{'disable_in_input':true});
updateResults();

//Courtesy https://groups.google.com/a/chromium.org/group/chromium-extensions/browse_thread/thread/b5880541f70bf3aa/dd500371f7bc9aa7
var to = null;
$("body").bind("DOMNodeInserted", function ()
{
    // Timeout to avoid running the function too often 
    if (to)
    {
        clearTimeout(to);
    }
    to = setTimeout(updateResults(), 300);
});

function updateResults()
{

    var results = jQuery("h3:not(ol.nobr>li>h3)").not(":has(#pa1)").not(":has(#pa2)").not(":has(#pa3)").not(":has(#pa4)").not(":has(#pa5)").not(".tbpr");

    if (document.getElementsByClassName('Mafuyu_numberLabel').length == 0 && results.length >= 10)
    {

        //removeAll();
        var n = results.length;
        if (n > 10)
        {
            n = 10;
        }

        for (var i = 0; i < n; i++)
        {

            var numberLabel = document.createElement("span");
            numberLabel.className = "Mafuyu_numberLabel";
            var num = i + 1;
            if (num == 10) num = 0;
            numberLabel.appendChild(document.createTextNode(num));
            //results[i].parentNode.appendChild(numberLabel);
            insertAfter(results[i].children[0], numberLabel);

            shortcut.add(num.toString(), (function (g)
            {
                return function ()
                {
                    clickLink(results[g].firstChild);
                }
            })(i), {
                'disable_in_input': true
            });

            shortcut.remove(modifier + num.toString());

            shortcut.add(modifier + num.toString(), (function (g)
            {
                return function ()
                {
                    newTab(results[g].firstChild);
                }
            })(i));

            shortcut.remove(modifier + "shift+" + num.toString());

            shortcut.add(modifier + "shift+" + num.toString(), (function (g)
            {
                return function ()
                {
                    frontTab(results[g].firstChild);
                }
            })(i));


        }
    }

}

function clickLink(link)
{
    var cancelled = false;

    if (document.createEvent)
    {
        var event = document.createEvent("MouseEvents");
        event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        cancelled = !link.dispatchEvent(event);
    }
    else if (link.fireEvent)
    {
        cancelled = !link.fireEvent("onclick");
    }

    if (!cancelled)
    {
        window.location = link.href;
    }
}

function newTab(link)
{
    var mouseEvent = document.createEvent("MouseEvent");
    mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, true, 0, null);
    link.dispatchEvent(mouseEvent);
}

function frontTab(link)
{
    var mouseEvent = document.createEvent("MouseEvent");
    mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, true, true, 0, null);
    link.dispatchEvent(mouseEvent);
}


function insertAfter(referenceNode, newNode)
{
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}