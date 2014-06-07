/* 
Copyright 2009 ftvs

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>. 
*/

// ==UserScript==
// @name			Opera UserScript: One Manga Next Page Preload
// @description		Rename script to onemangapreloader.js and allow popups on One Manga to use. Opens next page of manga in new tab/window. NOT TESTED ON GREASEMONKEY.
// @include 		http://www.onemanga.com/*/*/*/
// ==/UserScript==

var mangapagelist;
var nextPageUrl; // = mangapagelist[0].parentNode.href; // needs the DOM
var alreadyOpenedNextPage = false;
var windowHasFocus = false;
var imageLoaded = false;
var nextPageLoadStatus = document.createElement("div");
var helpDivNode = document.createElement("div");
var helpVisible = false;

window.onfocus = (function()
{
    windowHasFocus = true;
    if (imageLoaded) {openNextPage()};
});
    
window.onblur = function() {windowHasFocus = false};
    
window.addEventListener("DOMContentLoaded", function() // wait for DOM
{
    mangapagelist = document.getElementsByClassName("manga-page");
    nextPageUrl = mangapagelist[0].parentNode.href;
    
    insertInstallationConfirmation();
    
    mangapagelist[0].parentNode.insertBefore(nextPageLoadStatus, mangapagelist[0].nextSibling);
    
    mangapagelist[0].onload = ("if (windowHasFocus) {openNextPage()}; imageLoaded = true;");
    removeCopyrightAndMovementTip();
    
    document.getElementById("content").onmouseover = "openNextPage()";
    window.onkeydown = openNextPage;
}, false); // for DOM event listener

function openNextPage()
{
    if (alreadyOpenedNextPage)
    {}// don't do anything if already opened
    else
    {
        window.open(nextPageUrl);
        alreadyOpenedNextPage = true;
        nextPageLoadStatus.innerHTML = "Next page opened";
    }
}

// places installation confirmation after the breadcrumb
function insertInstallationConfirmation()
{
    helpDivNode.id = "helpDivNode";
    document.getElementsByClassName("chapter-navigation")[0].parentNode.insertBefore(helpDivNode, document.getElementsByClassName("chapter-navigation")[0]);
                
    var showHelpTarget = document.createElement("span");
    showHelpTarget.innerHTML = "<a>Show help.</a>";
    showHelpTarget.onclick = "toggleHelp()";
    showHelpTarget.title = "Click to unhide Auto Open help.";
    showHelpTarget.id = "showHelpTarget";
                
    var autoOpenConfirm = document.createElement("span");
    autoOpenConfirm.innerHTML = " - ";

    var autoOpenA = document.createElement("a");
    autoOpenA.href = "http://userscripts.org/scripts/show/63121";
    autoOpenA.target = "_blank";
    autoOpenA.innerHTML = "Auto Open";
    
    autoOpenConfirm.appendChild(autoOpenA);
    autoOpenConfirm.innerHTML = autoOpenConfirm.innerHTML + " installed. ";
    autoOpenConfirm.appendChild(showHelpTarget);
    
    // as of Dec 09 this is where the breadcrumb is
    document.getElementsByTagName("h1")[0].appendChild(autoOpenConfirm);
}

function toggleHelp()
{
    if (helpVisible)
    {
        document.getElementById("helpDivNode").innerHTML = "";
        document.getElementById("showHelpTarget").innerHTML = "<a>Show help.</a>";
        document.getElementById("showHelpTarget").title = "Click to unhide Auto Open help.";
    }
    else
    {
        document.getElementById("helpDivNode").innerHTML = \
"The script opens next page of manga in new tab/window, so just close the \
current page to read the next one. If the next page does not open, move the \
mouse over the current site page and the next page should open. If that \
fails, manually open the next page any way you like and the script should \
continue to work as normal. If even that fails right-click an empty spot \
on One Manga, click \"Edit Site Preferences...\" and check whether \"Open \
Pop-Ups in Background\" is displayed on the \"Pop-Ups\" section.";
        document.getElementById("showHelpTarget").innerHTML = "<a>Hide help.</a>";
        document.getElementById("showHelpTarget").title = "Click to hide Auto Open help.";
    }
    helpVisible = !helpVisible; // toggle help visibility
}

function removeCopyrightAndMovementTip()
{
    removeNode(document.getElementsByClassName("note")[0]); // navtip
    removeNode(document.getElementById("footer")); // copyright notice
}

// note that some browsers have native nemoveNode
function removeNode(nodeToRemove)
{
    nodeToRemove.parentNode.removeChild(nodeToRemove);
}