// ==UserScript==
// @name            MangaReader Easy Viewing
// @namespace       NoxTox
// @description     Formats MangaReader to view your manga easier
// @include         http://www.mangareader.net/*/*
// @latestupdate    code cleanup
// ==/UserScript==

var pM = document.getElementById("pageMenu");
if (pM && pM.selectedIndex == 0)
{
var chapters = document.getElementById("chapterMenu");
var numPages = document.evaluate('//select[@id="pageMenu"]/option', pM, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength;
var isrc = document.getElementById("img").src;
var series = document.evaluate('//h2/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var numLoaded = 0;
var blockLoad = true;
var loadAll = false;
var firstIndex, currentIndex;
if (isrc.substring(isrc.lastIndexOf("/")+1).indexOf("_") > -1)
{
	var isrc1 = isrc.substring(0, isrc.lastIndexOf("/")+1);
	var isrc2 = isrc.substring(isrc.lastIndexOf("/")+1, isrc.lastIndexOf("_"));
	var isrc3 = isrc.substring(isrc.lastIndexOf("_"));
}
else
{
	var isrc1 = isrc.substring(0, isrc.lastIndexOf("-")+1);
	var isrc2 = isrc.substring(isrc.lastIndexOf("-")+1, isrc.lastIndexOf("."));
	var isrc3 = isrc.substring(isrc.lastIndexOf("."));
}

document.getElementsByTagName("head")[0].innerHTML = "";
document.body.innerHTML = "";
document.title = series.innerHTML.replace("Manga", "") + "@ Mangareader Easy Viewing";

addStyle('body {margin: 0px; text-align:center; background-color:black;} #content {width:'+ (window.innerWidth - 247) +'px; margin-left:230px; color:#AAAAAA;} #menudiv {position:fixed; left:0px; top:0px; height:98%; padding:5px; overflow:hidden; text-align:left;} a {color:red; font-size: 14px} #menudiv a:hover {background-color:red; color:black;} p {color:red; font-weight:bold; margin:0px};');

chapters.style.cssFloat = "none";
chapters.style.width = "230px";
chapters.style.backgroundColor = "black";
chapters.style.color = "red";

d = document.createElement("div");
d.id = "menudiv";

var a1 = document.createElement("a");
a1.href = "/";
a1.innerHTML = "MR Homepage";
d.appendChild(a1);
d.appendChild(document.createElement("br"));

var a2 = document.createElement("a");
a2.href = series.href;
a2.innerHTML = series.innerHTML + " Series Page";
d.appendChild(a2);
d.appendChild(document.createElement("br"));

d.appendChild(chapters);
d.appendChild(document.createElement("br"));

d.addEventListener("mouseover", function(e) {d.scrollTop += 50*(e.clientY/d.clientHeight - 0.5);} ,false);
document.body.appendChild(d);

var contents = document.createElement("div");
contents.id="content";

document.body.appendChild(contents);

if (typeof unsafeWindow == 'object' && typeof unsafeWindow.omvKeyPressed == 'function')
	unsafeWindow.omvKeyPressed = null;
else if (typeof document.omvKeyPressed == 'function')
	document.omvKeyPressed = null;

document.addEventListener("keydown", function(e) {
	if (e.keyCode == 32 || e.keyCode == 40)
	{
		var scroller = setInterval("scrollBy(0,25)", 3);
		setTimeout("clearInterval("+scroller+")", 125);
		e.preventDefault();
	} 		
	else if (e.keyCode == 38)
	{
		var scroller = setInterval("scrollBy(0,-25)", 3);
		setTimeout("clearInterval("+scroller+")", 125);
		e.preventDefault();
	}
	else if (e.keyCode == 76) loadAll = !loadAll;
}, false);

var sI = setInterval(function() {
	if (chapters && chapters.childNodes.length > 0 && chapters.selectedIndex > -1)
	{
		if (chapters.childNodes[chapters.selectedIndex].getAttribute("selected") != "selected")
		{
			var phc = document.createElement("option");
			phc.innerHTML = "Chapter " + (chapters.childNodes.length + 1) + ": Unknown Title";
			chapters.appendChild(phc);
			chapters.selectedIndex = chapters.childNodes.length - 1;
		}
			
		firstIndex = chapters.selectedIndex;
		currentIndex = firstIndex;
		preloadChapter();
		
		if (currentIndex < chapters.childNodes.length)
			setInterval(function () {
				if (!blockLoad && (document.body.clientHeight-window.pageYOffset-window.innerHeight < 15000 || loadAll || currentIndex == firstIndex) && currentIndex < chapters.childNodes.length) 
				{
					blockLoad = true;
					loadNextChapter(++currentIndex);
				}
			}, 3000);
		
		clearInterval(sI);
	}
}, 250);

}

var rxp1 = /<select id="pageMenu" .+?>((?:\s*<option .+?>[^<]+<\/option>)+\s*)<\/select>/;
var rxp2 = /<img.+?src="(.+?)".+?>/;

//Functions
function preloadChapter() {
	var aa= document.createElement("a");
	aa.name = currentIndex;
	contents.appendChild(aa);
	var ar = document.createElement("a");
	ar.href = "#" + currentIndex;
	ar.innerHTML = chapters.childNodes[currentIndex].innerHTML;
	d.appendChild(ar);
	d.appendChild(document.createElement("br"));
	loadPage(0);
}

function loadPage(iter) {
	var imgNode = document.createElement("img");
	imgNode.src = isrc1 + isrc2 + isrc3;
	imgNode.name = isrc2;
	imgNode.addEventListener("error", ierr, false);
	imgNode.addEventListener("load", iload, false);
	imgNode.addEventListener("click", function() { if (!this.complete) this.src = this.src;}, false);
	var imgPage = document.createElement("p");
	imgPage.innerHTML = chapters.childNodes[currentIndex].innerHTML + " (Page ?/" + numPages + ")";
	imgPage.className = "unpaginated";
	contents.appendChild(imgPage);
	contents.appendChild(imgNode);
	contents.appendChild(document.createElement("hr"));
	isrc2++;
	
	if (numLoaded < numPages && iter < numPages*6 + 10)
	setTimeout(function () {loadPage(++iter);}, 100);
	else {
		if (numLoaded < numPages && typeof GM_log == 'function')
			GM_log("Note: Stopped preloading images based on preset limit. # pages loaded: " + numLoaded + ", # pages expected: " + numPages + ", preset limit: " + iter);
		unBlock();
	}
}

function xhr(details) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        var responseState = {
            responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
            readyState:xmlhttp.readyState,
            status:(xmlhttp.readyState==4 ? xmlhttp.status : 0),
            statusText:(xmlhttp.readyState==4 ? xmlhttp.statusText : '')
        }
        if (details["onreadystatechange"]) 
			details["onreadystatechange"](responseState);
        if (xmlhttp.readyState==4) {
            if (details["onload"] && xmlhttp.status>=200 && xmlhttp.status<300) details["onload"](responseState);
            if (details["onerror"] && (xmlhttp.status<200 || xmlhttp.status>=300)) details["onerror"](responseState);
        }
    }
    xmlhttp.open(details.method, details.url);
    if (details.headers) {
        for (var prop in details.headers)
            xmlhttp.setRequestHeader(prop, details.headers[prop]);
    }
    xmlhttp.send((typeof(details.data)!='undefined')?details.data:null);
}

function loadNextChapter(chapterIndex) {
xhr({
	method: 'GET',
	url: chapters.childNodes[chapterIndex].value,
	onload: function(responseDetails) {
	if (responseDetails.status == 200)
	{
		numPages = responseDetails.responseText.match(rxp1)[1].split("<option").length-1;
		isrc = responseDetails.responseText.match(rxp2)[1];
		
		if (isrc.substring(isrc.lastIndexOf("/")+1).indexOf("_") > -1)
		{
			isrc1 = isrc.substring(0, isrc.lastIndexOf("/")+1);
			isrc2 = isrc.substring(isrc.lastIndexOf("/")+1, isrc.lastIndexOf("_"));
			isrc3 = isrc.substring(isrc.lastIndexOf("_"));
		}
		else
		{
			isrc1 = isrc.substring(0, isrc.lastIndexOf("-")+1);
			isrc2 = isrc.substring(isrc.lastIndexOf("-")+1, isrc.lastIndexOf("."));
			isrc3 = isrc.substring(isrc.lastIndexOf("."));
		}
		preloadChapter();
	}
	else
	{
		if (typeof GM_log == 'function') 
			GM_log("xmlHttpRequest Loaded, Failed: " + responseDetails.statusText);
		currentIndex--;
	}
	},
	onerror: function(responseDetails) {
		if (typeof GM_log == 'function') 
			GM_log("xmlHttpRequest Error, Failed: " + responseDetails.statusText);
		currentIndex--;
		blockLoad = false;
    	}
});
}

function ierr(e) {
	this.removeEventListener("error", ierr, false);
	this.removeEventListener("load", iload, false);
	this.parentNode.removeChild(this.nextSibling);
	this.parentNode.removeChild(this.previousSibling);
	this.parentNode.removeChild(this);
};

function iload() {
	numLoaded++;
	this.removeEventListener("error", ierr, false);
	this.removeEventListener("load", iload, false);
}

function unBlock() {
	var unpaginated = document.evaluate('//p[@class="unpaginated"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (unpaginated.snapshotLength > numPages) setTimeout(unBlock, 1000);
	else
	{
		if (numLoaded != numPages) 
			if (typeof GM_log == 'function') 
				GM_log("Warning: Number of pages loaded (" + numLoaded + ") does not equal number of pages expected (" + numPages + ") for " + chapters.childNodes[currentIndex].innerHTML + ".");
		for (var i=0; i<unpaginated.snapshotLength; i++)
		{
			unpaginated.snapshotItem(i).innerHTML = chapters.childNodes[currentIndex].innerHTML + " (Page " + (i+1) + "/" + numPages + ")";
			unpaginated.snapshotItem(i).className = "";
		}

		if (currentIndex + 1 == chapters.childNodes.length)
			contents.appendChild(document.createTextNode("~End of Series~"));
		else
		{
			numLoaded = 0;
			blockLoad = false;
		}

	}
}

function addStyle(css) {
	var head = document.evaluate('//head', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (!head) return;
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

var SUC_script_num = 84045;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 432000000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nUpdate Details:\n'+(/@latestupdate\s*(.*?)\s*$/m.exec(rt))[1]+'\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){};