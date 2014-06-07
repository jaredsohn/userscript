// ==UserScript==
// @name         DailyThanthiEpaperFix
// @namespace    http://saravan.blogspot.com
// @description  Fixes Dailythanthi.com epaper in Firefox and adds other useful options
// @include      http://www.dailythanthi.com/thanthiepaper/firstpage.aspx
// ==/UserScript==

/***************************************************************************
* DailyThanthiEpaperFix 
*  - Fixes Dailythanthi.com epaper in Firefox and adds other useful options
* Copyright (C) 2008, Saravana Kumar <saravanannkl@gmail.com>
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
* 02110-1301  USA
***************************************************************************/

var urlIndex = -1;
urlIndex = document.baseURI.lastIndexOf('/');
var urlInitialPart = document.baseURI.substring(0, urlIndex+1);

function fillSingleDigit(no) { 
    var fill = ""; 
    if(no<10) { fill = "0"; } 
    return fill + no;  
}

function createUrl(id, winName) {
    newUrl ="showxml.aspx?id=" +id + "&code="+ winName;
    return urlInitialPart + newUrl;
}

// string replace is not replacing all the patterns in the string. Not in a mood to debug.
function remove(str, pat) {
    var newStr = str;
    for(var i=0; i<50; i++) {
        newStr = str.replace(pat, '');
        if(newStr.length == str.length) return str;
        str = newStr;
    }
    return newStr;
}

/* Create dummy functions for the DHTML crap. */
function createDummyFunctions() {
    unsafeWindow.borderit = function (which,color) { }
    unsafeWindow.show_pop = function (id,winName,divn,imgpathd) {
        var x = window.scrollX;
        var y = window.scrollY;
        GM_openInTab(createUrl(id, winName));
        window.setTimeout(function () { window.scrollTo(x, y); }, 1);
    }
}

/* Clean up the left Navigation. */
function cleanUpLeftNav() {
    var leftImgTDs = document.evaluate("//td[contains(@class, 'head1')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if(leftImgTDs.snapshotLength>0) {
        var leftImgTD = leftImgTDs.snapshotItem(0);
        leftImgTD.style.width="250px";
    }

    var imageTable = document.getElementById("Imagetable");
    if(imageTable) {
        imageTable.style.width="100%";
    }

    var leftImgDivs = document.evaluate("//div[contains(@class, 'head1')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if(leftImgDivs.snapshotLength>0) {
        var leftImgDiv = leftImgDivs.snapshotItem(0);
        leftImgDiv.style.height="100%";
    }

    var Imagetd = document.getElementById("Imagetd");
    if(Imagetd) {
        Imagetd.style.height="100%";
    }
}

/* Create a link to open the images of the individual pages. */
function addLinkForAllPages() {
    var pages = document.evaluate("//span[contains(@id, 'Datagrid')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if(pages.snapshotLength>0) {
        var p = pages.snapshotItem(pages.snapshotLength-1);
        var totalpages = parseInt(p.textContent.substring(4));
        var a = document.createElement("a");
        a.innerHTML = "Open All Pages";
        a.href="#";
        a.addEventListener("click", function() {
                var imgUrl = document.getElementById('Image1').src
                var imgUrlPrefix = imgUrl.substring(0, imgUrl.length-10);
                for(var i=1;i<=totalpages;i++) {
                GM_openInTab(imgUrlPrefix +  fillSingleDigit(i) + "_cni.jpg");
                }
            }, false);

        var Imagetable = document.getElementById("Imagetable");
        Imagetable.parentNode.insertBefore(a, Imagetable);
    }
}
// Assigns keyboard shortcuts j,k to move to next and prev pages.
function addKeyboardShortcuts() {
    var filterDiv = document.getElementById('oFilterDIV');
    if(filterDiv) {
        filterDiv.parentNode.removeChild(filterDiv);
        var allPageLinks = document.evaluate("//a[contains(@href, 'DataGrid')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var pageCount = allPageLinks.snapshotLength;
        if(pageCount<2) return;
        
        var prevLink, nextLink;
        
        var firstPageLink = allPageLinks.snapshotItem(0);
        var lastPageLink = allPageLinks.snapshotItem(pageCount-1);
        
        var currPageLink, iPageIndx;
        for(iPageIndx=0;iPageIndx<pageCount;iPageIndx++) {
            var tmpPageLink = allPageLinks.snapshotItem(iPageIndx);
            if(window.getComputedStyle(tmpPageLink.firstChild, '').color!="rgb(0, 0, 0)") {
                currPageLink = tmpPageLink;
                break;
            }
        }
        if(currPageLink==firstPageLink) {
            prevLink = lastPageLink;
            nextLink = allPageLinks.snapshotItem(1);
        }
        else if(currPageLink==lastPageLink) {
            prevLink = allPageLinks.snapshotItem(pageCount-2);
            nextLink = firstPageLink;
        }
        else {
            if(currPageLink) {
                prevLink = allPageLinks.snapshotItem(iPageIndx-1);
                nextLink = allPageLinks.snapshotItem(iPageIndx+1);
            }
        }
        
        document.addEventListener('keypress', 
                function (e) {
                try {
                    var sPressedKey = String.fromCharCode(e.which).toUpperCase();
                    switch(sPressedKey) {
                    case 'K':
                        if(prevLink)
                        window.setTimeout(prevLink.href, 1);
                        break;
                    case 'J':
                        if(nextLink)
                        window.setTimeout(nextLink.href, 1);
                        break;
                    }
            
                }
                catch(e) {
                    GM_log('Exception in keyhandler: ' + e.toString());
                }
            }
            , true);
    }
}

// Replaces JS links with complete http link. Currently disabled.
function replaceJSLinks() {
    var allAreas = document.getElementsByTagName('area');

    for(var i=allAreas.length-1; i>=0; i--) {
        var elmArea = allAreas[i];
        var areaClick = elmArea.getAttribute('onclick');
        if(!areaClick) continue;

         var areaClick = remove(areaClick, 'show_pop');
        areaClick = remove(areaClick, '(');
        areaClick = remove(areaClick, ')');
        areaClick = remove(areaClick, ' ');
        areaClick = remove(areaClick, '\'');
        areaClick = remove(areaClick, "'");
        var allParams = areaClick.split(',');

        if(allParams.length<2) continue;

        var newUrl = createUrl(allParams[0], allParams[1]);

        elmArea.setAttribute('onMouseOver', "window.status='" + newUrl + "'; return true;");
        elmArea.setAttribute('onMouseOut', "window.status=''; return true;");
        //elmArea.setAttribute('href', newUrl);
        //elmArea.removeAttribute('onclick');
    }
}

/* Change the font name to Vikatan_TAM so that Padma can transform automatically. Not sure it works. */
function changeFont() {
    var tags = document.getElementsByTagName('*');
    for(var i=0; i<tags.length; i++) {
        var objStyle = window.getComputedStyle(tags[i], '');
        if(objStyle.fontFamily.toLowerCase() == 'a095_tamelango_valluvan' || objStyle.fontFamily.toLowerCase() == 'b096_tamelango_valluvan bold')
        tags[i].style.fontFamily = 'Vikatan_TAM';
    }
}


function main() {
    createDummyFunctions();
    cleanUpLeftNav();
    addLinkForAllPages();
    addKeyboardShortcuts();
    replaceJSLinks();
    changeFont();
}

main();
