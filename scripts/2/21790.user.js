// ==UserScript==
// @name           Tumblr Dashboard Marker
// @namespace      http://pilnick.com/
// @include        http://www.tumblr.com/dashboard*
// ==/UserScript==
 
var button, saveLink, findLink, markerDiv;
button = document.getElementsByTagName('h1')[0];
if (button) {
    saveLink = document.createElement('a');
    saveLink.title = 'Mark Page Read and Save Position';
    saveLink.href = '#';
    saveLink.addEventListener("click", markRead, true);
    saveLink.innerHTML ="Mark Read";
   
    findLink = document.createElement('a');
    findLink.title = 'Find Last Read Post';
    findLink.href = '#';
    findLink.addEventListener("click", findRead, true);
    findLink.innerHTML ="Find Last Read";
           
            markerDiv = document.createElement('div');
            markerDiv.style.fontSize = "13px";
   
            markerDiv.appendChild(saveLink);
            if(!GM_getValue("searching"))
            {
                        markerDiv.appendChild(document.createTextNode(' - '));
                        markerDiv.appendChild(findLink);
            }
            button.appendChild(markerDiv);
}
 
if(GM_getValue("searching")) {
    findRead();
}
 
GM_registerMenuCommand( "Mark Page as Read", markRead, "m", "alt shift", "m" );
GM_registerMenuCommand( "Goto Last Read Page", findRead, "l", "alt shift", "l" );
document.addEventListener("keydown",keyStart,false);
function keyStart(event)
{
            if((event.altKey==1)&&((event.shiftKey==0)&&(event.ctrlKey==1)))
            {
                        if(event.keyCode==77)
                                    markRead(event);
                        if(event.keyCode==76)
                                    findRead(event);
            }
}
 
function markRead(event) {
    var postList, child;
    postList = document.getElementById('posts');
    postList.normalize();
    child = postList.firstChild;
    if (!child.localName)
        child = child.nextSibling;
    if (child.className == "post is_mine with_avatar") {
        child = child.nextSibling;
        if (!child.localName)
            child = child.nextSibling;
    }
    GM_setValue("lastRead", parseInt(child.getAttribute("onmouseover").replace(/\D/g,'')));
    //alert("Marked");
            if(event)
                        event.preventDefault();
}
 
function findRead(event) {
    var postList, child, lastRead, thisPage;
    lastRead = GM_getValue("lastRead");
    if(!lastRead)
    {
        GM_setValue("searching", false);
                        event.preventDefault();
        return;
    }
    GM_setValue("searching", true);   
 
    postList = document.getElementById('posts');
    postList.normalize();
    child = postList.lastChild;
    if (!child.localName)
        child = child.previousSibling;
    thisPage = parseInt(child.getAttribute("onmouseover").replace(/\D/g,''));
   
    if( thisPage<=lastRead ) {
        GM_setValue("searching", false);
        //alert("Found");
    }
    else {
        if( !window.location.toString().match(/\d+$/) ) {
            window.location = "http://www.tumblr.com/dashboard/2";
        }
        else {
            window.location = "http://www.tumblr.com/dashboard/" + (parseInt(window.location.toString().match(/\d+$/))+1);
        }
    }
            if(event)
                        event.preventDefault();
}