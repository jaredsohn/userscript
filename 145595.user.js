// ==UserScript==
// @name           HentaiVerse plain item linker
// @namespace      http://tieba.baidu.com/
// @description    Changes eid and key of plain text into a link
// @include        http://tieba.baidu.com/p/*
// @run-at         document-end
// @version        3.6
// @author         EraserKing
// @grant          GM_xmlhttpRequest

// ==/UserScript==

/*--- Create a proper unsafeWindow object on browsers where it doesn't exist
    (Chrome, mainly).
    Chrome now defines unsafeWindow, but does not give it the same access to
    a page's javascript that a properly unsafe, unsafeWindow has.
    This code remedies that.

    Copied from http://stackoverflow.com/questions/1622145/how-can-i-mimic-greasemonkey-firefoxs-unsafewindow-functionality-in-chrome/10945153#10945153
    Thanks the author!
*/
if (navigator.userAgent.match('Chrome')) {
   var bGreasemonkeyServiceDefined     = false;
   
try {
    if (typeof Components.interfaces.gmIGreasemonkeyService === "object") {
        bGreasemonkeyServiceDefined = true;
    }
}
catch (err) {
    //Ignore.
}

if ( typeof unsafeWindow === "undefined"  ||  ! bGreasemonkeyServiceDefined) {
    unsafeWindow    = ( function () {
        var dummyElem   = document.createElement('p');
        dummyElem.setAttribute ('onclick', 'return window;');
        return dummyElem.onclick ();
    } ) ();
}
}


function getMainPosts() {
    var allContents = document.getElementsByClassName('d_post_content');
    return (allContents);
}

function getLzlPosts() {
    var allContents = document.getElementsByClassName('lzl_content_main');
    return (allContents)
}

function addLinks(allContents, type) {
    for (var i=0; i<allContents.length; i++) {
        var postTextContent = allContents.item(i).textContent;
        var itemShortLink = postTextContent.match(/eid=\d+\&key=[0-9a-f]{10}/g);
        
        if (itemShortLink!=null) {
            var newInnerHTML = allContents.item(i).innerHTML;
            for (var j=0; j<itemShortLink.length; j++) {
                var itemID = type + i + "/" + j;
                var itemLongLink = document.createElement('a');
                itemLongLink.href = "http://hentaiverse.org/pages/showequip.php?" + itemShortLink[j];
                itemLongLink.id = "A" + itemID;
                itemLongLink.target = "_blank";
                itemLongLink.innerHTML = "LINK";
                itemLongLink.style.color = "red";
                
                var itemShortLinkText = document.createTextNode(itemShortLink[j]+' ');
                var itemNewSpan = document.createElement('span');
                
                itemNewSpan.id = "S" + itemID;
                
                var itemNewSpanA = document.createElement('span');
                itemNewSpanA.id = itemNewSpan.id + "A";
                itemNewSpanA.appendChild(document.createTextNode(itemShortLink[j]+' '));
                
                var itemNewSpanB = document.createElement('span');
                itemNewSpanB.id = itemNewSpan.id + "B";
                itemNewSpanB.appendChild(itemLongLink);
                
                var itemNewSpanC = document.createElement('span');
                itemNewSpanC.id = itemNewSpan.id + "C";
                itemNewSpanC.appendChild(document.createTextNode(' PREVIEW'));
                var actionDetail = "setFloatDiv(event , \"" + itemNewSpanC.id + "\", \"" + itemLongLink.href + "\")";

                itemNewSpanC.setAttribute("onmouseover", actionDetail);
                itemNewSpanC.setAttribute("onmouseout", "hideFloatDiv(event);");
                
                var itemNewSpanD = document.createElement('span');
                itemNewSpanD.id = itemNewSpan.id + "D";
                getItemName(itemLongLink, itemNewSpanD.id);
                
                itemNewSpan.appendChild(itemNewSpanA);
                itemNewSpan.appendChild(itemNewSpanB);
                itemNewSpan.appendChild(itemNewSpanC);
                itemNewSpan.appendChild(itemNewSpanD);                
                
                newInnerHTML = newInnerHTML.replace(itemShortLink[j].replace('&','&amp;'), itemNewSpan.outerHTML);
            }
            allContents.item(i).innerHTML = newInnerHTML;
        }
    }
}

function addForumLinks(allContents) {
    for (var i=0; i<allContents.length; i++) {
        var postTextContent = allContents.item(i).textContent;
        var forumShortLink = postTextContent.match(/index.php\?showtopic=[\d\w&=#?]+/g);
        
        if (forumShortLink!=null) {
            var newInnerHTML = allContents.item(i).innerHTML;
            for (var j=0; j<forumShortLink.length; j++) {
                var forumLongLink = document.createElement('a');
                forumLongLink.href = "http://forums.e-hentai.org/" + forumShortLink[j];
                forumLongLink.target = "_blank";
                forumLongLink.innerHTML = "[LINK]";
                forumLongLink.style.color = "red";

                newInnerHTML = newInnerHTML.replace(forumShortLink[j], forumShortLink[j] + forumLongLink.outerHTML);
            }
            allContents.item(i).innerHTML = newInnerHTML;
        }
    }
}


function getItemName(itemLongLink, itemNewSpanId) {
    GM_xmlhttpRequest( {
        method: "GET",
        url: itemLongLink.href,
        onload: function(responseDetails) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(responseDetails.responseText, "application/xml");
            
            var nameList = xmlDoc.getElementsByClassName("fd4");
            var fullName = "";
            if (nameList.length != 0){
                for (var i = 0; i < nameList.length; i++){
                    fullName = fullName + " " + nameList[i].textContent;
                }
                fullName = " [" + fullName.replace(/^\s+|\s+$/g, "") + "]";
            }
            else{
                fullName = " [NOT EXIST]";
            }
            var SpanToAppend = document.getElementById(itemNewSpanId);
            SpanToAppend.appendChild(document.createTextNode(fullName));
        },
        onerror: function(responseErrorDetails) {
            var SpanToAppend = document.getElementById(itemNewSpanId);
            SpanToAppend.appendChild(document.createTextNode(" [FAIL]"));
        }
    })
        }

function initializeFloatDiv (){
    var floatDiv = document.createElement('div');
    floatDiv.id = "floatDiv";
    floatDiv.style.visibility = "visible";
    floatDiv.style.display = "none";
    floatDiv.style.position = "absolute";
    floatDiv.style.zIndex = "100";
    document.body.appendChild(floatDiv);
        
    unsafeWindow.hideFloatDiv = function hideFloatDiv (event){
        if (!event.ctrlKey){
            var floatDiv = document.getElementById("floatDiv");
            if (floatDiv) {
                floatDiv.style.display = "none";
            }
        }
    }
                
    unsafeWindow.setFloatDiv = function setFloatDiv (e, elementId, url){
        var floatDiv = document.getElementById("floatDiv");
        if (floatDiv) {
            floatDiv.innerHTML = "<iframe src=\"" + url + "\" width=\"400px\" height=\"500px\" scrolling=\"no\"></iframe>";
            if (navigator.userAgent.indexOf("Firefox")!=-1) {
            	floatDiv.style.top = document.documentElement.scrollTop + e.clientY + 10 + 'px';
                floatDiv.style.left = document.documentElement.scrollLeft + e.clientX + 10 + 'px';
            }
            if (navigator.userAgent.indexOf("Chrome")!=-1) {
                floatDiv.style.top = document.body.scrollTop + e.clientY + 10 + 'px';
                floatDiv.style.left = document.body.scrollLeft + e.clientX + 10 + 'px';
            }
            floatDiv.style.width = 400 + 'px';
            floatDiv.style.height = 500 + 'px';
            floatDiv.style.display = "";
        }
    }
}


initializeFloatDiv();
addLinks(getMainPosts(), "M");
addLinks(getLzlPosts(), "L");
addForumLinks(getMainPosts());
addForumLinks(getLzlPosts());
