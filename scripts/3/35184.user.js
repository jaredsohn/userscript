// ==UserScript==
// @name           xkcd Fan (+keyboard shortcuts)
// @namespace      #avg
// @description    Read xkcd with only comic and alt-text and keyboard shortcuts, fullscreen fit and more
// @include        http://*xkcd.com/*
// @version        0.1.6
// ==/UserScript==
(function(){
if (document.body.childNodes[1].id!="container" || /full=true/i.test(document.URL)) return;
function Element(A, B, C) {
	A = document.createElement(A);
	if(B) for(var b in B) {
		var cur=B[b];
		if(b.indexOf("on")==0) A.addEventListener(b.substring(2), cur, false);
		else if(b=="style") A.setAttribute("style", B[b]);
		else A[b]=B[b];
	}
	if(C) for each(var c in C) A.appendChild(c);
	return A;
}
function single(A) {return document.evaluate("."+A, document.body, null, 9, null).singleNodeValue}
single("//img[starts-with(@src,'http://imgs.xkcd.com/comics/')]").addEventListener("load",function(){unsafeWindow.stop()},false);
GM_addStyle("*::-moz-selection {background:DarkSalmon;color:white;opacity:.5} .menuCont {text-align:center} .alt {width:98%;margin:10px;padding:1px;float:left;font-size:22px;background:LemonChiffon;border:thin solid black} .alt span {background:Crimson;color:white;padding:2px 8px 1px 10px;margin-left:-1px} h1 {background:Beige;margin:-2px -16px;display:block;font-size:40px;text-align:center;color:Brown} h1:hover {background:Brown;color:Beige}");
var c=document.getElementById("middleContent");
document.body.innerHTML="";
document.body.appendChild(c);
var img=document.images[0];
img.setAttribute("style","display:block;margin: 0 auto;border:none");
var com=c.childNodes[3].childNodes[1].childNodes[1];
com.insertBefore(new Element("div", {
	className : "alt",
	innerHTML : "<span>Alt Text</span> "+img.title
}), com.childNodes[18]);
var h3=document.getElementsByTagName("h3");
for(var i=h3.length - 1; i >= 0; --i)
{
	var inner = h3[i];
	inner.innerHTML=inner.innerHTML.replace(/(http\S+)/i,"<a href=\"$1\">$1</a>");
}
single("/div/div[2]/div/div").appendChild(new Element("h3", {
	innerHTML : "Original / Full page: <a href=\""+location.pathname+"?full=true\">http://xkcd.com"+location.pathname+"?full=true</a>"
}));
const cur=Number(/\d+/.exec(single("//h3/a").pathname)[0]);
document.title=cur + " - " + single("//h1").firstChild.nodeValue;
document.addEventListener("keydown",function(e){
	if(e.shiftKey && e.keyCode==71) //shift + g
	{
		location.href="/"+prompt("What comic number to go to?");
		return false;
	}
	if(!e.altKey)
		switch(e.keyCode)
		{
			case 37:
				if (cur==1) alert("Silly guy, this is the first comic!\nNo more old ones :\'(");
				else location.href="/"+(cur-1);return; //left
			case 39:
				if(/#/.test(document.links[3].href)) alert('You\'ve approached the end of this comic!\nNo more to see for now :\'(');
				else location.href="/"+(cur+1);return; //right
			case 82:
				location.href="http://dynamic.xkcd.com/random/comic";return; //r
			case 78:
				location.href="/";return; //n
			case 70:
				location.href="/1/";return;
		}
},false);
})();