// ==UserScript==
// @name           OneManga Easy Viewing v2
// @namespace      NoxTox
// @description    Script to improve viewing on OneManga and 1000Manga
// @include        http://www.onemanga.com/*/*/*
// @include        http://beta.onemanga.com/*/*/*
// @include        http://www.1000manga.com/*/*/*
// @exclude        http://*.com/directory/*
// @exclude        http://*.com/recent/*
// @exclude        http://*.com/account/*
// ==/UserScript==

switch (location.host)
{
case "www.onemanga.com": var base = 1; break;
case "beta.onemanga.com" : var base = 2; break;
case "www.1000manga.com" : var base = 3; break;
}
if (location.pathname.length - location.pathname.replace(/\//g, "").length == 3)
{
switch (base)
{
case 1:
case 2:
location.href = document.evaluate('//li/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
break;
case 3:
document.cookie = "age_verified=25;path=/";
location.href = document.evaluate('//div[@id="chapter-link"]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
break;
}
}
else
{

switch (base)
{
case 1:
case 2:
var scparent = "page-content";
break;
case 3:
var scparent = "viewPageContainer";
break;
}

var nav = document.evaluate('//div[@class="chapter-navigation"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
nav.removeChild(nav.childNodes[7]);
nav.removeChild(nav.childNodes[5]);
nav.childNodes[3].className = "hideme";
nav.removeChild(nav.childNodes[2]);

var series = document.evaluate('//div[@id="'+scparent+'"]/h1/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1);

var schapter = document.evaluate('//div[@id="'+scparent+'"]/h1', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.childNodes[3].nodeValue;
schapter = schapter.substring(schapter.indexOf("Chapter") + 7);

var oimgsrc = document.evaluate('//img[@class="manga-page"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.src;
oimgsrc=oimgsrc.substring(0,oimgsrc.lastIndexOf("/")+1);

document.body.innerHTML = "";
//document.getElementsByTagName("head")[0].innerHTML = "";

d = document.createElement("div");
d.id = "menudiv";

var a1 = document.createElement("a");
a1.href = "/";
a1.innerHTML = "Homepage";
d.appendChild(a1);
d.appendChild(document.createElement("br"));

if (base == 2)
{
var a0 = document.createElement("a");
a0.href = "/mypage/";
a0.innerHTML = "My Manga";
d.appendChild(a0);
d.appendChild(document.createElement("br"));
}

var a2 = document.createElement("a");
a2.href = "/directory/";
a2.innerHTML = "Directory";
d.appendChild(a2);
d.appendChild(document.createElement("br"));

var a3 = document.createElement("a");
a3.href = "/recent/";
a3.innerHTML = "Recent Updates";
d.appendChild(a3);
d.appendChild(document.createElement("br"));

var rabi = function () {
var abi = document.evaluate('//input[@class="rbi"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i=0; i<abi.snapshotLength; i++)
abi.snapshotItem(i).click();
};

var numBrokeIMG = 0;
var a4 = document.createElement("a");
a4.href = "#rbi";
a4.innerHTML = "Reload all broken images (0)";
a4.addEventListener("click", rabi, true);
a4.style.display = "none";
d.appendChild(a4);
var a4br = document.createElement("br");
a4br.style.display = "none";
d.appendChild(a4br);

/* this direct link is pretty much useless now that a51 exists
var a5 = document.createElement("a");
a5.href = series.href;
a5.innerHTML = series.innerHTML + " Series Page";
d.appendChild(a5);
d.appendChild(document.createElement("br"));
*/

var loadinfo = function (e) {
e.preventDefault();

var idiv = document.getElementById("infodiv");

if (idiv)
idiv.style.display = "block";
else
{
GM_xmlhttpRequest({
method: 'GET',
url: this.href,
onload: function (responseDetails) {
if (responseDetails.status == 200) {
var temp = document.createElement("div");
temp.innerHTML = responseDetails.responseText;

switch (base)
{
case 1:
case 2:
var divid = "side-content";
var logo = "title-logo";
break;
case 3:
var divid = "wrapRight";
var logo = "seriesImgBox";
break;
}

var allDivs = temp.getElementsByTagName("div");
var info = document.createElement("div");
info.id = "infodiv";
info.innerHTML = "Click anywhere except the Series Image and Series Info links to hide this box<br>";
var ldiv = document.createElement("div");
ldiv.className = "infodivChild";
ldiv.style.width = "225px";
var rdiv = document.createElement("div");
rdiv.className = "infodivChild";
rdiv.style.width = "575px";
for (i=allDivs.length-1; i>-1; i--)
{
if (allDivs[i].id == divid || allDivs[i].className == divid)
{
for (j=0; j<allDivs[i].childNodes.length; j++)
{
if (allDivs[i].childNodes[j].nodeName.toLowerCase() != "script")
{
if (allDivs[i].childNodes[j].id == logo || allDivs[i].childNodes[j].className == logo)
ldiv.appendChild(allDivs[i].childNodes[j]);
else
rdiv.appendChild(allDivs[i].childNodes[j]);
j--;
}
}
info.appendChild(ldiv);
info.appendChild(rdiv);
break;
}
}
info.addEventListener("click", function () {this.style.display = "none";}, true);
document.body.appendChild(info);
}
}
});
}
};

var a51 = document.createElement("a");
a51.href = series.href;
a51.innerHTML = series.innerHTML + " Series Info";
a51.addEventListener("click", loadinfo, true);
d.appendChild(a51);
d.appendChild(document.createElement("br"));

var a6 = document.createElement("a");
a6.href = "javascript:scroll(0,0)";
a6.innerHTML = series.innerHTML + schapter;
d.appendChild(a6);
d.appendChild(document.createElement("br"));

if (base == 2) {
GM_xmlhttpRequest({
method: 'GET', 
url: location.protocol + "//" + location.host + "/account/js/series-reading/" + Number(oimgsrc.split("/")[4]).toString() + "/",
onload: function(responseDetails) 
	{
	if (responseDetails.status == 200) {
	var addremove = function (e) {
	e.preventDefault();
	var anchor = this;
	GM_xmlhttpRequest({
		method: 'GET',
		url: anchor.href,
		onload: function (responseDetails) {
		if (responseDetails.status == 200) {
		
		if (anchor.href.indexOf("/add/") > -1) 
		{
		anchor.href = anchor.href.replace("/add/", "/remove/");
		anchor.innerHTML = "Remove from Reading List";
		}
		else 
		{
		anchor.href = anchor.href.replace("/remove/", "/add/");
		anchor.innerHTML = "Add to Reading List";
		}
		
		}
		}});
	};
	var a55 = document.createElement("a");
	
	a55.href = responseDetails.responseText.match(/http:\/\/.+?\?/)[0].slice(0,-1);
	if (a55.href.indexOf("/add/") > -1) a55.innerHTML = "Add to Reading List";
	else a55.innerHTML = "Remove from Reading List";
	a55.addEventListener("click", addremove, true);
	d.insertBefore(a55, a6);
	d.insertBefore(document.createElement("br"), a6);
	}}
});

}

document.body.appendChild(d);

var contents = document.createElement("div");
contents.id = "content";

contents.appendChild(nav);

document.body.appendChild(contents);

var cpages = document.evaluate('//select[@name="page"]/option', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var adjustedWidth = window.innerWidth - 247;
addStyle('body {margin: 0px !important; background-image:none !important; text-align:center !important;} #content {width:'+ adjustedWidth +'px; margin-left:230px; color:#AAAAAA;} #menudiv {position:fixed; left:0px; top:0px; height:98%; padding:5px; overflow:hidden; text-align:left;} #menudiv a:hover{background-color:red;} .red{color:red; font-weight:bold;} .hideme{display:none} #infodiv {position:fixed; width:800px; left:50%; margin-left:-400px; top:5%; background-color:black; color:white; border:10px solid grey} .infodivChild {float:left; height:100%; text-align:left;}');

var iloaded = function () {
contents.removeChild(this.previousSibling);
this.removeEventListener("load", iloaded, true);
if (--numBrokeIMG == 0) {
a4.style.display = "none";
a4br.style.display = "none";
}
a4.innerHTML = "Reload all broken images (" + numBrokeIMG + ")";
};


var ierr = function () {

if (Number(this.src.substr(-1,1)) > 0)
{
this.src = this.src.slice(0,-1) + Number(this.src.substr(-1,1)-1).toString();
}
else 
{
this.removeEventListener("error", ierr, true);
this.addEventListener("load", iloaded, true);
var x = document.createElement("input");
x.type = "button";
x.className = "rbi";
x.value = "Reload broken image";
x.addEventListener("click", function () {this.nextSibling.src = this.nextSibling.src + "0"}, true);
contents.insertBefore(x, this);
if (++numBrokeIMG == 1) {
a4.style.display = "block";
a4br.style.display = "block";
}
a4.innerHTML = "Reload all broken images (" + numBrokeIMG + ")";
}
};

for (i=0; i<cpages.snapshotLength; i++)
{
var imgNode = document.createElement("img");
imgNode.addEventListener("error", ierr, true);
imgNode.addEventListener("click", function() { if (!this.complete) this.src = this.src;}, true);
imgNode.src = oimgsrc + cpages.snapshotItem(i).value + ".jpg?r=3";
var spanNode = document.createElement("span");
//spanNode.id = cpages.snapshotItem(i).value;
spanNode.appendChild(document.createTextNode(series.innerHTML + schapter + " Page " + cpages.snapshotItem(i).value));
contents.appendChild(spanNode);
contents.appendChild(document.createElement("br"));
contents.appendChild(imgNode);
contents.appendChild(document.createElement("hr"));
}

if (location.pathname.split("/")[3] != cpages.snapshotItem(0).value)
document.getElementById(location.pathname.split("/")[3]).scrollIntoView(true);

var chapters = document.evaluate('//select[@name="chapter"]/option', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var currentChapter = document.evaluate('//select[@name="chapter"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value;

if (currentChapter.substring(0, currentChapter.lastIndexOf("/"))/2 > chapters.snapshotLength)
{
for (i=0; i<chapters.snapshotLength; i++)
{
if (chapters.snapshotItem(i).value == currentChapter)
{
var currentChapterIndex = i;
break;
}
}
}
else
{
for (i=chapters.snapshotLength-1; i >= 0; i--)
{
if (chapters.snapshotItem(i).value == currentChapter)
{
var currentChapterIndex = i;
break;
}
}
}

var nextChapter = currentChapterIndex - 1;
var rxp1 = /<select name="page" .+?>((?:\s*<option .+?>[^<]+<\/option>)+\s*)<\/select>/;
var rxp2 = /<.+?>[^<]+<.+?>/g;
var rxp3 = /<.+?>\s*([^<\s]+)\s*<.+?>/;

updateReadingList(oimgsrc, currentChapter.substring(0, currentChapter.lastIndexOf("/")));

if (nextChapter > -1) 
{
loadNextChapter(nextChapter--);
var blockLoad = true;
var dPH = setInterval(detectPageHeight, 3000);
}
else contents.appendChild(document.createTextNode("~End of Series~"));

unsafeWindow.document.onkeydown = function(e) {if (e.keyCode == 37 || e.keyCode == 39) e.preventDefault();}; 

document.addEventListener("keydown", function(e) {
	if (e.keyCode == 32 || e.keyCode==40) {
        e.preventDefault();
		var scroller = setInterval("scrollBy(0,20)", 10);
		setTimeout("clearInterval("+scroller+")", 250);
	} //spacebar, "down"		
	else if (e.keyCode==38) {
		e.preventDefault();
		var scroller = setInterval("scrollBy(0,-20)", 10);
		setTimeout("clearInterval("+scroller+")", 250);
	} //"up"
    else if (e.keyCode==37 || e.keyCode==39) e.preventDefault();
}, true);

d.addEventListener("mouseover", function(e) {d.scrollTop += 50*(e.clientY/d.clientHeight - 0.5);} ,true);

}

function addStyle(css) {
    var head, style;
    head = document.evaluate('//head', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    if (!head) return;
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function loadNextChapter(chapterIndex)
{
blockLoad = true;
var chapter = chapters.snapshotItem(chapterIndex).value;
GM_xmlhttpRequest({
    method: 'GET',
    url: series.href + chapter,
    onload: function(responseDetails) {
	if (responseDetails.status == 200)
	{
	schapter = chapter.substring(0, chapter.indexOf("/"));
	var t = document.createTextNode(series.innerHTML + " " + schapter);
	var s = document.createElement("span");
	s.id = schapter;
	s.className = "red";
	s.appendChild(t);
	contents.appendChild(s);
	contents.appendChild(document.createElement("br"));
	var a = document.createElement("a");
	a.href = "#" + schapter;
	a.innerHTML = series.innerHTML + " " + schapter;
	d.appendChild(a);
	d.appendChild(document.createElement("br"));

	var pages = responseDetails.responseText.match(rxp1)[1].match(rxp2);
	var imgsrc = responseDetails.responseText.match(/http:\/\/.+?\.jpg/)[0];
	var imgsrc = imgsrc.substring(0, imgsrc.lastIndexOf("/")+1);
	for (i = 0; i < pages.length; i++)
	{
	var page = pages[i].match(rxp3)[1];
	var imgNode = document.createElement("img");
	imgNode.addEventListener("error", ierr, true);
	imgNode.addEventListener("click", function() { if (!this.complete) this.src = this.src;}, true);
	imgNode.src = imgsrc + page + ".jpg?r=3";
	contents.appendChild(document.createTextNode(series.innerHTML + " " + schapter + " Page " + page));
	contents.appendChild(document.createElement("br"));
	contents.appendChild(imgNode);
	contents.appendChild(document.createElement("hr"));
	}
	

	if (chapterIndex == 0)
	{
	contents.appendChild(document.createTextNode("~End of Series~"));
	clearInterval(dPH);
	}
	
	updateReadingList(imgsrc, schapter);
	}
	else 
	{
	GM_log("xmlHttpRequest Loaded, Failed: " + responseDetails.statusText);
	nextChapter++;
	}
	blockLoad = false;
    },
	onerror: function(responseDetails) {
		GM_log("xmlHttpRequest Error, Failed: " + responseDetails.statusText);
		nextChapter++;
		blockLoad = false;
	}
});

}

function detectPageHeight() {
if (!blockLoad && document.body.clientHeight-window.pageYOffset-window.innerHeight < 5000 && nextChapter > -1) 
loadNextChapter(nextChapter--);
}

function updateReadingList(imgsrc, cc)
{
	if (base != 2) return;
	GM_xmlhttpRequest({method: 'GET', url: location.protocol + "//" + location.host + "/account/js/" + Number(imgsrc.split("/")[4]).toString() + "/" + Number(cc).toFixed(2).toString() + "/read-track.js"});
}