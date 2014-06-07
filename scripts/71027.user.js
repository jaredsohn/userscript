// ==UserScript==
// @name           Change CSS WaarMaarRaar
// @namespace      http://www.waarmaarraar.nl/
// @version        0.8.1
// @description    Verander de opmaak van WaarMaarRaar.nl en geniet van o.a. een zwarte achtergrond.
// @include        http://*.waarmaarraar.nl/*
// ==/UserScript==
//
// Script door Thom Castermans
//

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('@import "http://castermans.tweakdsl.nl/article.css"');

function changeFontColor(color,newcolor) {
    var font, usedcolor;
    font = document.getElementsByTagName('font');
    for (var i=0; i < font.length; i++)
	{
		usedcolor = font[i].getAttribute('color');
		if (usedcolor == color)
		{
			font[i].setAttribute("color", newcolor);
		}
	}
}

changeFontColor("green","#51CD1C")
changeFontColor("#ff0066","#FE7AAF")
changeFontColor("#0033cc","#93ABF2")
changeFontColor("black","white")
changeFontColor("#cccccc","white")

function changeBgColor(tag,color,newcolor) {
    var bgcolor, usedcolor;
    bgcolor = document.getElementsByTagName(tag);
    for (var i=0; i < bgcolor.length; i++)
	{
		usedcolor = bgcolor[i].getAttribute('bgcolor');
		if (usedcolor == color)
		{
			bgcolor[i].setAttribute("bgcolor", newcolor);
		}
	}
}

changeBgColor("tr","#f2f2f2","#646464")
changeBgColor("tr","#999999","#505050")
changeBgColor("td","gray","#505050")
changeBgColor("tr","#ffece9","#EFB1A5")
changeBgColor("tr","#cccccc","#505050")
changeBgColor("tr","#dddddd","#505050")
changeBgColor("tr","#eeeeee","#505050")

function replaceImage(oldlink,newlink) {
    var allImgs,thisImg;
    allImgs = document.evaluate('//img[@src]',
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);

    for (var i=0;i<allImgs.snapshotLength;i++) {
    var thisImg = allImgs.snapshotItem(i);
    var src = thisImg.src;
	    var srcMatch = src.match(oldlink);
	    if (srcMatch != null) {
      thisImg.src = newlink;
	    }
    }
}

replaceImage("http://wimg.nl/hr.gif","http://castermans.tweakdsl.nl/hr.gif")
replaceImage("http://wimg.nl/hr2.gif","http://castermans.tweakdsl.nl/hr2.gif")
replaceImage("http://www.waarmaarraar.nl/hr2.gif","http://castermans.tweakdsl.nl/hr2.gif")
replaceImage("http://www.waarmaarraar.nl/images/pp.JPG","http://castermans.tweakdsl.nl/pp.JPG")
replaceImage("http://www.waarmaarraar.nl/images/blog.JPG","http://castermans.tweakdsl.nl/blog.JPG")
replaceImage("http://wimg.nl/images/lock.png","http://castermans.tweakdsl.nl/lock.png")

var all;
all = document.getElementsByTagName('td');
	for (i in all) {
		var color = (document.defaultView) ? document.defaultView.getComputedStyle(all[i],null).getPropertyValue('background-color') : all[i].currentStyle['backgroundColor'];
		if(color=="rgb(204, 204, 204)"){
		   all[i].style.backgroundColor="#505050";
		}
	}

var all;
all = document.getElementsByTagName('td');
	for (i in all) {
		var color = (document.defaultView) ? document.defaultView.getComputedStyle(all[i],null).getPropertyValue('background-color') : all[i].currentStyle['backgroundColor'];
		if(color=="rgb(255, 236, 233)"){
		   all[i].style.backgroundColor="#EFB1A5";
		}
	}

document.body.innerHTML= document.body.innerHTML.replace("#topbar{position:absolute;border: 1px solid black;padding: 2px;background-color: lightyellow;width: 400px;visibility: hidden;z-index: 100;}"
,"#topbar{position:absolute;border: 2px solid white;padding: 2px;background-color: black;width: 400px;visibility: hidden;z-index: 100;}");

var all;
all = document.getElementsByTagName('a');
for (var i=0; i < all.length; i++) {
	attr = all[i].getAttribute('onClick');
	if (attr =! "")
	{
		all[i].setAttribute("onClick", "window.location.reload()");
		//all[i].setAttribute("href","javascript:{window.scroll(0,9e9);}");
	}
}

document.body.addEventListener('DOMNodeInserted', function() {
    changeFontColor("green","#51CD1C")
    changeFontColor("#ff0066","#FE7AAF")
    changeFontColor("#0033cc","#93ABF2")
    changeBgColor("td","#f2f2f2","#505050")
    changeBgColor("td","#ffece9","#EFB1A5")
}, false);