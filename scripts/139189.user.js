// ==UserScript==
// @name       TA - Add All Achievements to To-Do List
// @namespace  http://giggas2.dyndns.org
// @version    0.2
// @description  This adds the button to add all achievements of a game to your To-Do List on all pages, whether you own the game or not.
// @include    http://*trueachievements.com/*
// @copyright  2012+, You
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-1.7.2.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function wait()
{
   var jQueryEnabled = (typeof unsafeWindow.jQuery != 'undefined');
   if (!jQueryEnabled)
   {
      unsafeWindow.setTimeout(wait, 100);
   }
   else
   {
      $ = unsafeWindow.jQuery;
      letsJQuery();
   }
}

wait();

function letsJQuery()
{
    var stringMessage = "Add remaining achievements to my To Do List";
    var button = $('ul#btnGame_Action_Options li:first').clone()[0];
    var innerText = button.children[0].innerHTML;
    innerText = innerText.replace("addtoboostlist", "addtotodolist");
    innerText = innerText.replace("Add to my Boost List", stringMessage);
    button.children[0].innerHTML = innerText;
    var href = button.children[0].getAttribute("href");
    href = href.replace("btnBoostGame", "btnAddGameToToDoList");
    button.children[0].setAttribute("href", href);
    if($('ul#btnGame_Action_Options li a:contains("remaining")').size() == 0)
    {
        $("ul#btnGame_Action_Options").append(button);
    }
}