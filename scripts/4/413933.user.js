// ==UserScript==
// @name            vPopulus vPress Projects
// @namespace       Global Press Unit Projects
// @description     vPress Global Press Unit Projects, auto subscibe all newspaper.
// @version         0.1000
// @require			http://code.jquery.com/jquery-1.11.0.min.js
// @match           http://vpopulus.net/article/287-1
// @include         http://vpopulus.net/article/287-1
// ==/UserScript==
/*
   -----------------------------------------------------------------------------------------
   -----------------------------------------------------------------------------------------
*/



function connectdata(){
var request, xml,names,i,j,newspaperidx;
    request= new XMLHttpRequest();
request.open("GET", "https://spreadsheets.google.com/feeds/cells/0Aq-9piwxzk7ddHVkc3ZnNTRHVi1qY2htMXgxMkw1T1E/od6/public/values", false);
request.send();
xml = request.responseXML;
 names = xml.getElementsByTagName("content");
  i=0;
    newspaperidx= [];
for(j = 9; j < names.length; j=j+5) {
    newspaperidx[i]=[names[j].childNodes[0].nodeValue];
    i++;
    }
    return newspaperidx;
}

var newspaperid=connectdata();

function createiframe(newspaperid) {
var ifrm = document.createElement("iframe");
ifrm.setAttribute("src", "http://vpopulus.net/newspaper/subscribe/"+newspaperid);
ifrm.setAttribute("name", "vpress");
ifrm.setAttribute("id", "vpress");
ifrm.style.width = 0+"px";
ifrm.style.height = 0+"px";
document.body.appendChild(ifrm);
    return true;
}
function iframesrc(newspaperid) {
document.getElementById('vpress').src = "http://vpopulus.net/newspaper/subscribe/"+newspaperid;
}

function iframechange(newspaperid){
        var a;
for(a = 1; a < newspaperid.length; a++) {
  setTimeout(createiframe(newspaperid[a]),2000);
}
    alert("All vPress members newspaper subscribed!");
}


function suball(newspaperid){

  createiframe(newspaperid[0]);
 setTimeout(iframechange(newspaperid),1000);   
    
    return true;
}


function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
	else { $j = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
    if (typeof unsafeWindow == 'undefined') { unsafeWindow = window; }

           suball(newspaperid);
        }
        
        
    
   
