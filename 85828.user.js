// ==UserScript==
// @name           Pokec.sk - Link na Moje kluby
// @namespace      http://userscripts.org/users/merlinsvk
// @author         MerlinSVK
// @date           2011-11-10
// @include        http://www-pokec.azet.sk/miestnost/*
// @include        http://pokec.azet.sk/weroro*
// @version        2.1.1
// ==/UserScript==
var str=location.href;
var curUID = str.substring(str.lastIndexOf('i9=')+3);
var d = document;
function getNode(x, c){
    return d.evaluate(x, c || d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
if(window.location.href.indexOf("weroro") != -1){
  var w = document.getElementsByClassName("css_niecoomne");
  w[0].innerHTML = "<a href='http://www.weroro.sk/' target='_self'><img src='http://www.weroro.sk/pokec_header.png' title='Oficiálna stránka'/></a>";
}
else{
window.addEventListener('load',function(){
var odhlasitLink = getNode("//a[@class='topMenuLink'][contains(., 'odhl\u00e1si\u0165')]");
    if(odhlasitLink) {
        klubLink = d.createElement("span");
        klubLink.innerHTML='<a class="topMenuLink" alt="Moje kluby" target="_blank" href="http://kluby.azet.sk/moje-kluby?i9='+curUID+'">moje kluby</a>&nbsp;&nbsp;';
        odhlasitLink.parentNode.insertBefore(klubLink, odhlasitLink);
	}
}, false);}