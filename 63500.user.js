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
// @name			One Manga Next Page Preload
// @description		Tested with Opera and Greasemonkey. Preloads next page for faster manga reading. It also allows Opera's Fast Forward to work on manga pages (though Rewind may not).
// @include 		http://www.onemanga.com/*/*/*/
// ==/UserScript==

// breaks back button functionality as of 3 dec

var mangapagelist;
var nextPageUrl; // = mangapagelist[0].parentNode.href; // needs the DOM
var nextImage = new Image(); // will only be used for caching purposes
var nextImageUrl;
var alreadyOpenedNextPage = false;
var windowHasFocus = false;
var imageLoaded = false;
var nextPageLoadStatus = document.createElement("div");
var helpDivNode = document.createElement("div");
var helpVisible = false;
    
// window.addEventListener("DOMContentLoaded", function() 
// {
    insertInstallationConfirmation();
    mangapagelist = document.getElementsByClassName("manga-page");
    nextPageUrl = mangapagelist[0].parentNode.href;
    
    nextImageUrl = getNextImageUrl();
    rigImageToBeReplaced(mangapagelist[0]);
    insertPrefetchHints();
    
    mangapagelist[0].parentNode.insertBefore(nextPageLoadStatus, mangapagelist[0].nextSibling);
    
    removeCopyrightAndMovementTip();
    insertHiddenImage();
// }, false); // for DOM event listener

function insertHiddenImage()
{
    nextImage.height = 0;
    nextImage.src = nextImageUrl;
    nextImage.id = "nextImage";
    mangapagelist[0].parentNode.insertBefore(nextImage, mangapagelist[0].nextSibling);
}

function getNextImageUrl()
{
    var currentimgpattern = ( // pattern for current img file full name
                        new RegExp("([^/]*\.((jpg)|(png)|(gif)|(jpeg)))"));
    
    // this should return the manga page image. 
    // var currentpageimg = mangapagelist[0];
    // var nextpageurl = currentpageimg.parentNode.href;

    // get  flie nome string as 01.jpg or credits.png etc using regex
    // var currentimagefilename = currentimgpattern.exec(currentpageimg.src)[0];

    // next page URL strip ...com/manganame/chapnum/ leave next img fliename
    // var nextimagefilename = nextpageurl.replace(new RegExp("http://www.onemanga.com/[^/]*/[^/]*/"), "").replace("/", "");
    // nextimagefilename has no file ext

    // var nextimagefullname = ( 
        // currentimgpattern.exec(mangapagelist[0].src)[0]. // this gets current img 01.jpg etc
            // replace( // following calls are to replace 01.jpg with 02.jpg
                // new RegExp("[^\.]*\."), // replace 01 from 01.jpg with...
                                        // (mangapagelist[0].parentNode.href. // next page url. strip url info from front
                                            // replace(new RegExp("http://www.onemanga.com/[^/]*/[^/]*/"), ""). // 02/
                                                // replace("/", "") + "."))); // strip to 02 (next image file name)
    
    // return next image url
    return (
    mangapagelist[0].src. // current image full url
        replace(currentimgpattern, (
        currentimgpattern.exec(mangapagelist[0].src)[0]. // this gets current img 01.jpg etc
            replace( // following calls are to replace 01.jpg with 02.jpg
                new RegExp("[^\.]*\."), // replace 01 from 01.jpg with...
                                        (nextPageUrl.
                                            replace(new RegExp("http://www.onemanga.com/[^/]*/[^/]*/"), ""). // 02/
                                                replace("/", "") + ".")))));
}

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
    //mangapagelist[0].onmouseover = ""; // open once only please
}

// places installation confirmation after the breadcrumb
function insertInstallationConfirmation()
{
    helpDivNode.id = "helpDivNode";
    document.getElementsByClassName("chapter-navigation")[0].parentNode.insertBefore(helpDivNode, (document.getElementsByClassName("chapter-navigation")[0]));
                
    // var showHelpTarget = document.createElement("span");
    // showHelpTarget.innerHTML = "<a>Show help.</a>";
    // showHelpTarget.onclick = "toggleHelp()";
    // showHelpTarget.title = "Click to unhide Auto Open help.";
    // showHelpTarget.id = "showHelpTarget";
                
    var autoOpenConfirm = document.createElement("span");
    autoOpenConfirm.innerHTML = " - ";

    var autoOpenA = document.createElement("a");
    autoOpenA.href = "http://userscripts.org/scripts/show/63500";
    autoOpenA.target = "_blank";
    autoOpenA.innerHTML = "One Manga preloader";
    autoOpenA.title = "This link will open in a new tab/window.";
    
    autoOpenConfirm.appendChild(autoOpenA);
    autoOpenConfirm.innerHTML = ((autoOpenConfirm.innerHTML) + " installed. ");
    //autoOpenConfirm.appendChild(showHelpTarget);
    
    // as of Dec 09 this is where the breadcrumb is
    document.getElementsByTagName("h1")[0].appendChild(autoOpenConfirm);
}

function toggleHelp()
{
    if (helpVisible)
    {
        document.getElementById("helpDivNode").innerHTML = "";
        document.getElementById("showHelpTarget").innerHTML = "<a>Show help.</a>";
        document.getElementById("showHelpTarget").title = "Click to unhide help.";
    }
    else
    {
        document.getElementById("helpDivNode").innerHTML = "This script preloads the next page as you read so the next page appears lightning fast. It also allows Opera's Fast Forward to work on manga pages (though Rewind may not). If you prefer opening the next page in a background tab, use <a href=\"http://userscripts.org/scripts/show/63121\" target=\"_blank\" title=\"This link opens in a new tab/window.\">Auto Open</a> (Opera only) instead. \
\
Known issues and workarounds: \
<ol>\
    <li>Scroll position on the next page will reset if you scroll too early. Just scroll down again.\
    </li>\
    <li>Trying to navigate to the next page too fast won't work. Try again and it should work.\
    </li>\
    <li>With Opera, navigating to the next page before the next image has fully loaded forces the next image to be downloaded all over again. Does not seem to be the case in Firefox.\
    </li>\
    <li>Using the browser's back button will show the current page instead of the previous page. Use One Manga's built in buttons/keyboard shortcuts instead.\
    </li>\
    <li>Next chapter's first page will not be preloaded. Some other page will be shown before the next chapter's first page loads. Just ignore it.\
    </li>\
</ol>";
        document.getElementById("showHelpTarget").innerHTML = "<a>Hide help.</a>";
        document.getElementById("showHelpTarget").title = "Click to hide help.";
    }
    helpVisible = !helpVisible; // toggle help visibility
}

function rigImageToBeReplaced(imgobj)
{
    // apparently needede by greasemonkey but i'm not sure
    document.getElementsByClassName("manga-page")[0].addEventListener("click", function(event) {
        document.getElementsByClassName("manga-page")[0].src = document.getElementById("nextImage").src;
        scroll(0, 0);
    }, false);
    
    document.addEventListener("keydown", function(event) // rig right arrow
    {
        if (event.keyCode == 39) // 39 should be right arrow
        {
            document.getElementsByClassName("manga-page")[0].src = document.getElementById("nextImage").src;
            scroll(0, 0);
        }/*
        else{do nothing}*/
    }, false);
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

function displayNextImage(imgToBeReplaced)
{
    imgToBeReplaced.src = nextImageUrl;
    scroll(0, 0); // scroll to top
}

function insertPrefetchHints()
{
    //insertPrefetchNodes("next", nextPageUrl);
    insertPrefetchNodes("next", "javascript:displayNextImage(mangapagelist[0]);window.location.assign(nextPageUrl);");
    insertPrefetchNodes("prefetch", nextPageUrl);
    // insertPrefetchNodes("prefetch", nextImageUrl);
}

// inserts before nodePosition
// precon: 					string	  string
function insertPrefetchNodes(linkRel, prefetchUrl)
{
    var firstLinkNode = document.getElementsByTagName("link")[0];
    
    prefetchNode = document.createElement("link");
    prefetchNode.rel = linkRel;
    prefetchNode.href = prefetchUrl;
    
    firstLinkNode.parentNode.insertBefore(prefetchNode, firstLinkNode);
}