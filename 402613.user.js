// ==UserScript==
// @name            Hide subforums in past 24 hrs section, for Chrome and TamperMonkey
// @namespace       http://www.razgovory.com/ru/forum/index.php
// @description     Hides subforums in past 24 hrs section. The script is specific for the particular forum feature at razgovory.com/ru/forum
// @copyright	    
// @license 	    
// @version         2
// @date	    2014-03-04
// @include         http://www.razgovory.com/ru/forum/index.php*
// @include	http://www.razgovory.com/ru/forum/
// ==/UserScript==

var iFrame = getFrame();

iFrame.style.display = 'none';

var loadSpan = document.createElement('SPAN');
loadSpan.innerHTML = '<b>Loading...</b>';

iFrame.parentNode.insertBefore(loadSpan, iFrame );

var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
if (is_chrome)
{
     window.onload = function() {
        
        iFrameOnLoad(iFrame );
    };

}
else
{
     iFrame.onload = function() {
        
        iFrameOnLoad(iFrame );
    };
 
    iFrame.removeAttribute('style'); 
}

 

function getFrame()
{
    var iFrames = document.getElementsByTagName("IFRAME");
    
    for (var i = 0; i < iFrames.length; i++) {
        
        if (iFrames[i].src != undefined && iFrames[i].src == "http://www.razgovory.com/ru/forum/search.php?search_id=newposts") {
            return iFrames[i];
        }	
    }
    return undefined;
}
function iFrameOnLoad(iframe) { // run after complete loading of the frame
    
  
    var iFrameContent = iframe.contentWindow.document;
   
    var rows = iFrameContent.getElementsByTagName('TR');
    
    for (var j = 0; j < rows.length; j++) {
        var row = rows[j];
        var cells = row.getElementsByTagName('TD');
        
        for (var c = 0; c < cells.length; c++) {
            var spans = cells[c].getElementsByTagName('P');
            for (var s = 0; s < spans.length; s++) {
                if (spans[s].getAttribute('class') == 'gensmall') {
                    
                    var links = spans[s].getElementsByTagName('A');
                    for (var k = 0; k < links.length; k++) {
                        //if (links[k].getAttribute('class') == 'forumlink') {
                        var exp = new RegExp(/viewforum.php\?f=(\d+)$/g);
                        var match = exp.exec(links[k].href);
                        if (match) {
                            
                            var aLink = iFrameContent.createElement('A');
                            aLink.href = 'javascript:void(0)';
                            var img = iFrameContent.createElement('IMG');
                            img.src = 'styles/subsilver2/imageset/ru/icon_post_delete.gif';
                            aLink.appendChild(img);
                            spans[s].appendChild(aLink);
                            
                            
                            var forumId = match[1];
                            var forumName = links[k].innerHTML;
                            if (forumName.length > 35) {
                                links[k].innerHTML = forumName.substr(0, 32) + "...";
                            }
                            row.setAttribute("rowforumid", forumId);
                            aLink.title = 'Спрятать сообщения подфорума "' + forumName + '"';
                            aLink.onclick = ( // closure
                                function() {
                                    var fname = forumName;
                                    var fId = forumId;
                                    return function() { 
                                        hideRowsByForumId(fId, fname);
                                    }
                                })();
                        }
                    }
                }
            }
        }
    }
    
    checkCookies();
    

   	iframe.style.display = 'block' ;
    
    iframe.parentNode.removeChild(loadSpan);
    
    
}

function checkCookies()
{
    for (var i=0; i < 100; i++) {
        if (readCookie('hideforum' + i) != null) {
            var name = unescape(readCookie('forumname' + i));
            hideRowsByForumId(i, name);
            saveCookies(i, name); //rewind
        }
    }
}


function removeUnhideButton(forumId)
{
    var aLink = document.getElementById('hidebutton' + forumId);
    if (aLink != undefined) {
        getFrame().parentNode.removeChild(aLink);
    }
}

function addUnhideButton(forumId, forumName)
{
    var aLink = document.createElement('A');
    aLink.title = 'Показывать сообщения подфорума "' + forumName + '"';
    aLink.onclick = ( 
        function() {
            var fId = forumId;
            return function () {
                unhideRowsByForumId(fId);
            };
        })();
    aLink.id = 'hidebutton' + forumId;
    aLink.href = 'javascript:void(0)';
    var img = document.createElement('IMG');
    img.src = 'styles/subsilver2/imageset/ru/icon_post_delete.gif';
    aLink.appendChild(img);
    
    var iFrame = getFrame();
    iFrame.parentNode.insertBefore(aLink, iFrame );
    
    saveCookies(forumId, forumName);
}

function hideRowsByForumId(forumId, forumName)
{
    var frame = getFrame();
    var fContent = frame.contentWindow.document;	
    var rows = fContent.getElementsByTagName('TR');
    for (var j = 0; j < rows.length; j++) {
        var row = rows[j];
        if (row.getAttribute('rowforumid') == forumId) {
            row.style.display = 'none';
        }
    }
    addUnhideButton(forumId, forumName);
}

function unhideRowsByForumId(forumId)
{
    var frame = getFrame();
    var fContent = frame.contentWindow.document;	
    var rows = fContent.getElementsByTagName('TR');
    for (var j = 0; j < rows.length; j++) {
        var row = rows[j];
        if (row.getAttribute('rowforumid') == forumId) {
            row.removeAttribute('style');
        }
    }
    removeUnhideButton(forumId);
    deleteCookies(forumId);
}


/**
* Cookies
*/
function saveCookies(forumId, forumName)
{
    createCookie('hideforum' + forumId, 'hide', 30);
    createCookie('forumname' + forumId, escape(forumName), 30);			
}

function deleteCookies(forumId)
{
    eraseCookie('hideforum' + forumId);
    eraseCookie('forumname' + forumId);
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

/*
* Utils
*/
var alertIds = {};
function alertOnce(msg, id)
{
    if (alertIds[id] == undefined) {
        alert(msg);
        alertIds[id] = 1;
    }
}