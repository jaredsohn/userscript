// ==UserScript==
// @name           Abtruse Goose Reader
// @namespace      #aVg
// @description    Another in the "reader" series.
// @include        http://abstrusegoose.com/*
// @version        0.1
// ==/UserScript==
(function(){
function single(A) {return document.evaluate(A, document, null, 9, null).singleNodeValue}
function remove(A) {if(A) A.parentNode.removeChild(A);return remove}
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
function makeBlock(pre, text) {
	return new Element("div", {
		className : "script"
	}, [
	new Element("span", {
		textContent : pre
	}),
	document.createTextNode(text)
	]);
}
GM_addStyle(".storytitle {text-align:center} #content {padding:0!important} .script {background-color:LemonChiffon;font-size:22px;text-align:left;border:thin solid black;} .script span  {margin-right:12px;padding:2px 8px 1px 10px;color:white;background-color:Crimson;}");
remove(single("//h1[@id='header']/.."))(single("//div[@align='center']"))(single("//div[@id='menu_top']"))(single("//div[@class='creativecommons']"))(single("//p[@class='credit']"))(single("//div[@class='sociable']"));
var img = document.images[0], title=img.title, src = img.src.replace(/http.+\//,"").replace(/_/g, " ").replace(/\.(?:jpe?|pn)g/i, ""), alt =  img.alt.replace(/_/g, " ");
img.removeAttribute("height");
GM_xmlhttpRequest({
	method : "HEAD",
	url : img.src.replace(/\.((?:jpe?|pn)g)/i, "_large.$1"),
	onload : function(A) {
		if(A.status==404) return;
		img.src = A.finalUrl;
		img.addEventListener("load", function() {
			this.removeAttribute("width");
			this.setAttribute("style", "max-width:"+single("//div[@id='content']").offsetWidth+"px");
		}, false);
	}
});
img = img.parentNode;
if(img.nodeName=="A") {
	img.appendChild(new Element("a", {
		href : img.href,
		textContent : "Link on comic",
		style : "display:block"
	}));
	img.removeAttribute("href");
}
img.style.textAlign = "center";
if(title) img.appendChild(makeBlock("Title:", title));
if(alt && alt!=src) img.appendChild(makeBlock("Alt:", alt));
img.appendChild(makeBlock("File:", src));
var perm = single("//em/a/..");
remove(perm);
const cur=Number((perm && perm.firstChild.href.match(/\d+/)[0]) || location.href.match(/(\d+)/) ? RegExp.$1 : 1);
if(perm) {
perm.firstChild.firstChild.nodeValue = "permalink";
perm.firstChild.href = "/" + cur;
img.appendChild(perm);
}
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
			if (cur==1)
				alert("Silly guy, this is the first comic!\nNo more old ones :\'(");
			else
				location.href="/"+(cur-1);break; //left
		case 39:
			if(single("//span[text()='Next »']"))
				alert("You've approached the end of this comic!\nNo more to see for now :'(");
			else
				location.href="/"+(cur+1);break; //right
		case 82:
			location.href="http://dynamic.xkcd.com/comic/random/";break; //r
		case 78:
			location.href="/";break; //n
		case 70:
			location.href="/1/";break;
	}
},false);
})();