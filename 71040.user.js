// ==UserScript==
// @name           GalaChat
// @namespace      http://chat.gala.net
// @description    Galachat Helper
// @include        http://chat.gala.net/
// @include        http://galachat.com/
// ==/UserScript==

function a() {return a.caller.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2')}
document.childNodes[0].childNodes[0].appendChild(document.createElement('script')).innerHTML=a();
return;

if (document.title.indexOf("GalaChat")==0){
    document.childNodes[0].childNodes[0].removeChild(document.childNodes[0].childNodes[0].childNodes[8])
    document.childNodes[0].removeChild(document.getElementsByTagName('frameset')[0])
    document.childNodes[0].removeChild(document.getElementsByTagName('noframes')[0])
    document.childNodes[0].appendChild(document.createElement('body'))
    document.childNodes[0].childNodes[0].appendChild(document.createElement('script')).src='http://newgala.googlecode.com/hg/js/s.js'
}