// ==UserScript==
// @name           USA - Welcome Page
// @namespace      UserScript Addons
// @description    A UserScript Addon. It allows script authors to add a welcome page upon first install.
// @include        *
// ==/UserScript==
var WelcomeHTML="<h1><center>Thanks for using Blah Blah Blah!</center><br/>I hope you enjoy! Update news: BLAH latest Version BLAH:</h1>";
if(!GM_getValue("welcomer_welcomed")&top==self){
	var XBtn="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg=="
	WelcomeHTML="<div style='width:100%;background-color:gray'>Welcome Window<img style='position:fixed;right:2%;' onclick='RemoveWelcomeWindow0()' src='"+XBtn+"'></div>"+WelcomeHTML
	var WelcomeWindow=document.createElement("div");
	WelcomeWindow.innerHTML=WelcomeHTML;
	WelcomeWindow.style.fontSize="12pt";
	WelcomeWindow.style.position="fixed";
	WelcomeWindow.style.top="2%";
	WelcomeWindow.style.left="2%";
	WelcomeWindow.style.width="96%";
	WelcomeWindow.style.height="95%";
	WelcomeWindow.style.backgroundColor="white";
	WelcomeWindow.style.borderStyle="ridge";
	WelcomeWindow.style.zIndex="99999999999";
	WelcomeWindow.id="WelcomeWindow0";
	document.body.appendChild(WelcomeWindow)
	GM_setValue("welcomer_welcomed",true)
}
unsafeWindow.RemoveWelcomeWindow0=function(){
	document.body.removeChild(WelcomeWindow);
}