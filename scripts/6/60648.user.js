// ==UserScript==
// @name           highlight
// @namespace      highlight
// @include        *.ogame.de
// ==/UserScript==

// Created by avg, modified by JoeSimmons
function create(a,b,c) {
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,for".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

// Define GM_addStyle if it's not Firefox
if(typeof GM_addStyle==='undefined') 
    GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
    }

GM_addStyle(
".blue {background-color:red; color:white; font-size:115%; padding:0;}"
);

function highlight(e) {
var node = e || document.body,
	text = document.evaluate(".//text()[contains(.,'Eine deiner')]",node,null,6,null),
	regex = /(.*)(".+")(.*)/;
for(var i=0,p; (p=text.snapshotItem(i)); i++) {
if(p.parentNode.tagName.toLowerCase()!="textarea" && p.parentNode.id.indexOf("highlighter_")==-1 && regex.test(p.nodeValue)) {
var id=p.nodeValue.match(regex);
p.parentNode.replaceChild(create("span", {}, new Array(
		document.createTextNode(id[1]),
		create("span", {className:"blue",id:"highlighter_"+i}, new Array(document.createTextNode(id[2]))),
		document.createTextNode(id[3])
		)), p);
}
}
}

highlight();
window.addEventListener('load', function(){
window.addEventListener('DOMNodeInserted', function(e){highlight(e.currentTarget.parentNode);}, false);
}, false);