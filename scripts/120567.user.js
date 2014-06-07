// ==UserScript==
// @name           add
// @namespace      *
// @include        http://www.allocine.fr/film/*
// ==/UserScript==


function include(fileName){
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = fileName;
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
}

function addScript(code){
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.innerHTML = code;
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
}


include('/js634594696164119311/aspx/js/ac/ac.resources.js');
//include('/js634652705465123728/aspx/js/assets/environment.js');
//include('/js/acScriptHandlerEx.ashx?p=1454636135&acjsversion=js634594696164119311');
include('/js634594696164119311/jqproxy/ws/FileUploadHandler.js');
include('/js634594696164119311/jqproxy/ws/community/UserFavoriteItemsHandler.js');
include('/js634594696164119311/jqproxy/ws/LibraryContentHandler.js');
include('/js634594696164119311/jqproxy/ws/UserDataHandler.js');
include('/js/community/ac_community-1.js');
include('http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');
//include('/js/framework/ac.widget.js');
//include('/js/framework/ac.widget.overlay.js');
//include('/js/framework/ac.widget.dialog.js');
//include('/js/framework/ac.widget.js');

String.prototype.trim = function(){return this.replace(/(^\s*)|(\s*$)/g,"")}

var bigDiv = document.getElementById("col_main");
bigDiv2=bigDiv.getElementsByTagName("span")
myRef=null;
myName=null;
myRefType=null;
for(i in bigDiv2) {
  if(bigDiv2[i].className == "tt_r26 j_entity") {
    eval("var data="+bigDiv2[i].getAttribute("data-entity"))
    myRef    =data.cref;
    myRefType=data.reftype;
    myName   =bigDiv2[i].innerHTML.trim();
    break;
  }
}

bigDiv2=bigDiv.getElementsByTagName("div")
myDiv=null;
for(i in bigDiv2) {
  if(bigDiv2[i].className == "box_04_inner") myDiv=bigDiv2[i];
}
var el = document.createElement('span');
el.innerHTML = '<div class="functionsbar fs11"><div class="fleft"><ul class="functionsmenu"><li ><a href="javascript:openOverlayBookmarkNotation(\'acid1\');"><img class="ico " src="http://images.allocine.fr/commons/empty.gif" width="0" height="0" alt="" /><span id = "acid1" parametervalue="'+myRef+'" parametername="'+myRefType+'" itemtitle="'+myName+'" class="community_bookmarknotationlink hide">Ajouter et noter</span></span></a></li></ul></div></div>'
myDiv.appendChild(el);

