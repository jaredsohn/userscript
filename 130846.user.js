// ==UserScript==
// @name           Google Reader - Use left/middle click to open item in frame/tab
// @description    Left click opens item in frame / Middle click or CTRL+Left click open item in background tab
// @version        2012-11-14
// @updateURL      http://userscripts.org/scripts/source/130846.user.js
// @author         Kenijo
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// @include        http://reader.google.com/reader/*
// @include        https://reader.google.com/reader/*
// ==/UserScript==

/**
* 2012-11-14
*  Updated the handler to open links with the middle mouse button in the background
* 2012-04-14
*  Add CTRL+Left click to open item in a background tab
*  Add pointer cursor over title (it disappeared because I remove the href link)
*  Change width of the frame so item is using the full frame width available
* 2012-04-13
*  Add Middle click to open item in a background tab
*  Add Left click to open item in current frame
**/

document.addEventListener('DOMNodeInserted', function(event) {    
    var entryContainer = event.target;
    if (entryContainer.className != 'entry-container') {
        return;
    }
    
    var entryTitleLink = document.getElementsByClassName('entry-title-link', entryContainer);
    if ( (entryTitleLink == undefined) || (entryTitleLink.length == 0) ) {
        return;
    }
    
    var entryTitle = entryTitleLink[0].parentNode;
    
    var entryTitleLinkHREF = /\"(http:\/\/[^\"]*)\"/.exec(entryTitle.innerHTML);
    if (entryTitleLinkHREF == undefined || entryTitleLinkHREF.length == 0) {
        return;
    }
    
    entryTitleLink[0].removeAttribute('href'); 
    entryTitleLink[0].removeAttribute('target');
    entryTitle.setAttribute('style', 'cursor:pointer;');
    
    // Workaround for iFrame to work ... ???
    entryTitle.innerHTML = entryTitle.innerHTML;
    
    var link = entryTitleLinkHREF[1];
    
    entryTitle.addEventListener('mousedown', function(event) {
        var clickType = 'LEFT';
        
        if (event.which) { 
            if (event.which==1) clickType = 'LEFT';
            if (event.which==2) clickType = 'MIDDLE';
            if (event.which==3) clickType = 'RIGHT';
        }
        else if (event.button) {
            if (event.button==0) clickType = 'LEFT';
            if (event.button==1) clickType = 'MIDDLE';
            if (event.button==2) clickType = 'RIGHT';
        }
        
        event.stopPropagation();
        event.preventDefault();
        
        if(clickType == 'MIDDLE' || (clickType == 'LEFT' && event.ctrlKey == true)) {           
            var backgroundLink = document.createElement("a");
            backgroundLink.href = link;
            var evt = document.createEvent("MouseEvents");
            //the tenth parameter of initMouseEvent sets ctrl key
            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
            backgroundLink.dispatchEvent(evt);
            
            return false;
        } else if(clickType == 'LEFT' ) {
            var entryBody = document.getElementsByClassName('entry-body', entryContainer);
            
            if (entryBody != undefined && entryBody.length > 0) {
                entryBody[0].innerHTML = '<IFRAME src="' + link + '" height="500" width="' + parseInt(entryContainer.offsetWidth-30) + '"></IFrame>';               
            }
            return;
        } 
    }, false);
}, false);