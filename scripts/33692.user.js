// ==UserScript==
// @name           Cyanide and Happiness Reader [+keyboard shortcuts]
// @namespace      #aVg
// @description    Only shows the comic and adds handy keyboard shortcuts
// @include        http://*explosm.net/comics/*
// @version        0.2.6
// ==/UserScript==
location.href="javascript:("+(function(){
try{
const cur=Number(location.pathname.match(/(\d+)\//)[1]);
function get(c,f) {
	location.href="/comics/"+c+"/#"+(f ? "f" : "b");
}
function single(A) {return document.evaluate("." + A, document.body, null, 9, null).singleNodeValue}
function goOn() {
	var f=location.hash=="#f";
	get(cur + (f ? 1 : -1), f);
}
if (single("//div[@id='maincontent']//center[contains(text(),'found')]")) {
	goOn();
	return false;
}
document.body.previousSibling.previousSibling.appendChild(document.createElement("style")).innerHTML="*{background:none!important;border:none!important;}";
var c=single("//div[@id='maincontent']/div[2]//div[@align='center']"), img, imgs = c.getElementsByTagName("img");
for(var i = imgs.length - 1; i >= 0; --i) {
	var ci = imgs[i];
	if(/^http:\/\/(?:www\.)?explosm.net\/db\/files\//.test(ci.src)) {
		img = ci;
		break;
	}
}
if(!img) img = document.embeds[0];
img.addEventListener("load",function(){unsafeWindow.stop();},false);
document.body.innerHTML="";
document.body.appendChild(c);
var title = img.src.replace(/.+\//,"").replace(/-/g," ").replace(/\.(?:(?:jpe?|pn)g|(?:gi|sw)f)/,"");
var h1 = document.createElement("h1");
h1.appendChild(document.createTextNode(title));
document.body.appendChild(h1);
document.title = "Cyanide & Happiness | " + cur + " | " + title;
document.addEventListener("keydown",function(e)
{
	if(e.shiftKey && e.keyCode==71) //shift + g
	{
		get(prompt("What comic number to go to?"));
		return;
	}
	if (!e.altKey)
		switch(e.keyCode)
		{
			case 37:get(cur-1,false);return; // left
			case 39:get(cur+1,true);return;  // right
			case 82:get("random");return;    // R
			case 78:get("new");              // N
		}
},false);
}catch(e){alert(e)}
})+")()";