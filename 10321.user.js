// ==UserScript==
// @name           BayImg.com - Sweet Interface 2.71
// @namespace      Manix
// @include        http://bayimg.com/*
// ==/UserScript==


var D = document;

////////////////////////////////////////////////////////////////////////////////////////////////////
/*|PAGES|*/ if (new RegExp("^http://bayimg.com/tag/[^/]+$").test(D.location)) {


// Variables
var pageNr = 1, pagesCount = 1, imgId = -1, imagesCount = 0, imagesPaths = [], imagesThumbs = [], allLoaded = false;
var prlImgPg = D.createElement('DIV'), prlImgPgFill = D.createElement('DIV'), prlImgId = 0, prlPgOpacity = 1, prlPgFadeTmr;

// Functions
function ChangePage(nr) {
	allLoaded = false;
	var l = String(document.location), t = l.substr(l.lastIndexOf('/')+1);
	new unsafeWindow.Ajax.Updater('thumbs', '/ajax_tags.php', {method: 'post', parameters: 'page='+nr+'&tag='+t, onComplete: changeThumbs});
}

function ChangeImage(nr) {
	prevCont.style.display = "block";
	prevFill.style.display = "block";
	D.body.style.overflow = "hidden";
	
	// Show Image
	prevImg.parentNode
	recreatePrevImg();
	prevImg.src = imagesPaths[imgId];
	if (prevImg.height == 0) { // Check the image hasn't loaded instantaneously
		D.getElementById('prevPrg').style.display = "block";
		prevImg.style.display = "none";
		setTimeout(shiftImgOnShow, 1);
	} else centerImg(); // It has been seen before, cached
}
function shiftImgOnShow() {
	if (prevImg.height == 0) setTimeout(shiftImgOnShow, 10);
	else centerImg();
}
function unShiftImg() {
	prevImg.style.position = null;
	prevImg.style.display = null;
	prevImg.style.visibility = null;
}
function centerImg() {
	shadowImg.style.width = prevImg.width+"px";
	shadowImg.style.height = prevImg.height+"px";
	prevImg.style.position = "relative";
	setTimeout(unShiftImg, 1);
}
function recreatePrevImg() {
	prevImg.parentNode.innerHTML = '<img id=prevImg style="max-height:100%; max-width:100%;" onload="document.getElementById(\'prevPrg\').style.display=\'none\'">';
	prevImg = D.getElementById('prevImg');
}

function PreloadImages() {
	var i = new Image();
	i.addEventListener('load', prlImgOnLoad, false);
	i.src = imagesPaths[prlImgId++];
}
function prlImgOnLoad() {
	var w = Math.round(prlImgId/imagesPaths.length*100);
	prlImgPgFill.style.width = w+"%";
	if (w == 100) {
		clearInterval(prlPgFadeTmr);
		prlPgFadeTmr = setInterval(prlPgFade, 100);
	} else PreloadImages();
}
function prlPgFade() {
	var o = (prlPgOpacity *= 0.8), w = Math.floor(o*100), s = prlImgPg.style;
	s.opacity = o;
	s.left = ((100-w)/2)+"%";
	s.width = w+"%";
	if (o < 0.02) { // 1/255 = 0.0039215..
		s.display = "none";
		clearInterval(prlPgFadeTmr);
	}
}

// Add Click Events
function changeThumbs() {
	var th = D.getElementById('thumbs');
	if (th) {
		var tg = D.getElementById('toggle'), tp = th.firstChild;
		while (tp && tp.nodeName != "P") tp = tp.nextSibling;
		
		// Add Thumbnails on-click Full Screen View
		if (tp) {
			// Reset Preloading Bar
			clearInterval(prlPgFadeTmr);
			var s = prlImgPg.style;
			s.display = "block";
			s.opacity = "1.0";
			s.left = "5%";
			s.width = "90%";

			imagesCount = 0;
			imagesPaths = [];
			imagesThumbs = [];
			prlImgId = 0;
			prlPgOpacity = 1;
			var thumbs = tp.childNodes;
			if (thumbs.length) { // Varify there is at least 1 image
				for (var i=0; i<thumbs.length; i++) {
					var thumb = thumbs[i], h = thumb.href.toLowerCase(); h = h.substr(h.lastIndexOf('/')+1);
					imagesCount++;
					imagesPaths.push("http://image.bayimg.com/"+h.substr(0,2)+"/"+h.substr(2,2)+"/"+h.substr(4,2)+"/"+h.substr(6,2)+"/"+h.substr(8,1)+".jpg");
					imagesThumbs.push(thumb);
					thumb.firstChild.alt = i;
					thumb.addEventListener('click', thumbClick, false);
				}
				PreloadImages();
			}
		}
		
		// When no results are returned "tg" is unavailable
		if (tg) {
			var curPageNr, page = tg.firstChild, nextPage = page.nextSibling, b;
			
			// Find Active Page
			for (var i=0; i<tg.childNodes.length; i++) {
				var c = tg.childNodes[i];
				if (c.className == "active") {
					curPageNr = parseInt(c.textContent);
					c.style.cursor = "default";
					c.className = "active";
				}
			}
			
			
			// Fix Page Links
			for (; page; page = nextPage) { nextPage = page.nextSibling;
				var n = page.nodeName, c = page.textContent, i = parseInt(c), r = (c == "Prev" || c == "Next");
				if (page.className == "active") { // Active Page button
					// Ignore, set b to true so I know when it's the Next or Prev Button
					b = 1;
				} else if (n == "A" && !r && isNaN(i)) { // "..." Button
					var x = D.createElement('SPAN');
					x.appendChild(D.createTextNode(c));
					//x.style.color = "#819BCB";
					x.style.margin = "0px 4px";
					newPage.className = "inactive";
					x.style.cursor = "default";
					tg.replaceChild(x, page);
				} else if (n == "A" || n == "SPAN") { // Page Buttons
					var newPage = D.createElement(n);
					newPage.className = (n == "A" ? "inactive" : "arrow-dis");
					if (n == "A") newPage.addEventListener('click', pageBtnClick, false);
					newPage.appendChild(D.createTextNode(c));
					if (r) { // Next, Prev
						if (n == "A") newPage.href = document.location+" (page "+(curPageNr+(b?1:-1))+")";
						else newPage.style.cursor = "default";
					} else { // Page Button
						newPage.href = document.location+" (page "+c+")";
						pagesCount = Math.max(pagesCount, i);
					}
					tg.replaceChild(newPage, page);
				} else tg.removeChild(page);
			}
		}
		
		
		allLoaded = true;
		
	} else setTimeout(changeThumbs, 100);
}
setTimeout(changeThumbs, 300);

function thumbClick(e) {
	e.preventDefault();
	imgId = parseInt(e.target.alt);
	ChangeImage(imgId);
}

function prevContClick(e) {
	imgId = -1;
	prevImg.src = "";
	prevCont.style.display = "none";
	prevFill.style.display = "none";
	D.body.style.overflow = "visible";
}

function pageBtnClick(e) {
	e.preventDefault();
	var a = (e.target.tagName == "IMG"? e.target.parentNode : e.target), h = a.href, p = h.lastIndexOf('%20')+3;
	pageNr = parseInt(h.substr(p, h.length-p-1));
	ChangePage(pageNr);
}

// Add Global Shortcuts
function globalShortcuts(e) {
	//console.info('key: '+pageNr+' /'+pagesCount+'  '+imgId+' /'+imagesCount+' ['+e.keyCode+']');
	if (!allLoaded) return;
	var cancel = true;
		 if (e.keyCode == 188 && pageNr > 1)			ChangePage(--pageNr); 	// <
	else if (e.keyCode == 190 && pageNr < pagesCount) 	ChangePage(++pageNr); 	// >
	else if (e.keyCode ==  78 && imgId > 0) 			ChangeImage(--imgId); 	// N
	else if (e.keyCode ==  77 && imgId < imagesCount-1) ChangeImage(++imgId); 	// M
	else if (e.keyCode ==  27 && imgId > -1) 			prevContClick(); 		// ESCAPE
	else 												cancel = false;
	if (cancel) e.preventDefault();
}
D.addEventListener('keydown', globalShortcuts, false);

// Create Full-Page Image View
var prevCont = D.createElement('DIV'), prevCell = D.createElement('DIV'), prevFill = D.createElement('DIV'), prevImg;
prevCont.style.cssText = "position:absolute; left:0px; top:0px; width:100%; height:100%; display:none; z-index:2";
prevCont.innerHTML =
	'<table style="position:absolute; left:0px; top:0px; height:100%; width:100%;"><tr><td>'+
		'<div style="text-align:center; position:absolute; width:100%; height:100%;">'+
			'<img id=prevImg style="max-height:100%; max-width:100%;" onload="document.getElementById(\'prevPrg\').style.display=\'none\'"></div>'+
		'<div id=shadowImg></div></td></tr>'+
	'</table>'+
	'<div id=prevPrg style="position:absolute; left:0px; bottom:0px; width:100%; text-align:center;">'+
		'<img src="http://www.ajaxload.info/cache/ff/ff/ff/ff/00/00/8-1.gif" style="border: 2px solid rgb(255, 187, 187); padding: 0px;"/></div>';
prevFill.style.cssText = "position:absolute; left:0px; top:0px; width:100%; height:100%; margin-bottom:-100%; background:#012; opacity:0.7; display:none";
D.body.appendChild(prevCont);
prevImg = D.getElementById('prevImg');
shadowImg = D.getElementById('shadowImg');
D.body.appendChild(prevFill);
prevCont.addEventListener('click', prevContClick, true);

// Create Image Preload Progress Bar
prlImgPg.style.cssText = "position:relative; left:5%; top:20px; width:90%; height:5px; border:1px solid #EEE";
prlImgPgFill.style.cssText = "background:#EEF; height:100%; width:0%";
prlImgPg.appendChild(prlImgPgFill);
D.getElementById('menu').appendChild(prlImgPg);

// Make View Full-Page
D.getElementById('footer').style.cssText = "display:none";

// Change Thumbs and Page Border Borders
GM_addStyle("DIV#container {background:transparent!important; width:100%!important}", 0);
GM_addStyle("DIV#toggle {background-color:transparent!important}", 0);
GM_addStyle("DIV#wrapper .image-setting {border:1px solid #BBBBBB !important; padding:2px !important}", 0);
GM_addStyle("DIV#toggle .active, DIV#toggle .inactive, .arrow-dis {margin:0px 3px}", 0);
GM_addStyle("DIV#extra2 {padding:0px!important; width:100%!important}", 0);
GM_addStyle("DIV#header {width:100%!important; background:#FFF!important}", 0);
GM_addStyle("BODY {margin:0px!important}", 0);
GM_addStyle("HTML {margin:0px!important}", 0);



////////////////////////////////////////////////////////////////////////////////////////////////////
/*|IF_LOCATION|*/ } else if (new RegExp("^http://bayimg.com/[a-zA-Z]{9}$").test(D.location)) {


GM_addStyle("#mainImage {border:1px solid #BBBBBB!important; padding:2px!important; background:transparent!important}", 0);

// Add Direct Image Link
var img = D.getElementById('mainImage');
if (img) {
	var lnk = D.createElement('DIV'), adr = D.createElement('A');
	adr.href = img.src;
	lnk.style.cssText = "clear:both;cursor:default;text-align:center;cursor:default;position:relative;top:-20px";
	lnk.appendChild(D.createTextNode("[ "));
	adr.appendChild(D.createTextNode("Direct Image Link"));
	lnk.appendChild(adr);
	lnk.appendChild(D.createTextNode(" ]"));
	img.parentNode.parentNode.appendChild(lnk);
}

// Remove bottom warning and Copyright (or rather lack of) notice
D.getElementById('footer').style.display = "none";
var n = D.getElementById('extra').firstChild;
while (n.textContent != "Removal") n = n.nextSibling;
while (n.nextSibling) n.parentNode.removeChild(n.nextSibling);
n.parentNode.removeChild(n);

// Remove "Report Image" button
var n = D.getElementById('wrapper').firstChild;
while (n && n.nodeName != "TABLE") n = n.nextSibling; n = n.firstChild;
while (n && n.nodeName != "TBODY") n = n.nextSibling; n = n.firstChild;
while (n && n.nodeName != "TR") n = n.nextSibling;
n.parentNode.removeChild(n);

// Remove Logo
var n = D.getElementById('header');
n.parentNode.removeChild(n);



////////////////////////////////////////////////////////////////////////////////////////////////////
/*|IF_LOCATION|*/ } else if ("http://bayimg.com/cloud" == D.location) {


// Empty Copyright footer
var f = D.getElementById('footer');
while (f.firstChild) f.removeChild(f.firstChild);

// Color visited links
GM_addStyle("#cloud A:visited {color:orange}", 0);

// Add Sort buttons
GM_addStyle("#sort {color:#444}", 0);
GM_addStyle("#sort B {color:#666; cursor:pointer}", 0);
GM_addStyle("#sort B.on {color:#2A2; cursor:default}", 0);
var sortBy = 0, sortDiv = D.createElement('DIV');
sortDiv.id = "sort";
sortDiv.style.cssText = "margin-top:6px; cursor:default";
sortDiv.innerHTML = 'Sort by : <b id=sort0 class=on style="margin-left:4px" onclick="sortItems(0)">date</b> | '+
					'<b id=sort1 onclick="sortItems(1)">name</b> | <b id=sort2 onclick="sortItems(2)">count</b>';
D.getElementById('search').appendChild(sortDiv);

// Create items array
var items = [], cloud = D.getElementById('cloud'), post = cloud.nextSibling, sortId = 0, sortData = [];
function extractItems() {
	var c = cloud.childNodes;
	if (c.length) {
		for (var i=0, k=0; i<c.length; i++)
			if ((n = c[i]).nodeName == "A")
				items.push([k++, n.textContent, -parseFloat(n.style.fontSize)]);
		sortData[0] = cloud.innerHTML;
	} else setTimeout(extractItems, 100);
}
setTimeout(extractItems, 300);

unsafeWindow.sortItems = function(s) {
	if (s == sortId || items.count == 0) return;
	
	// Update interface
	sortId = s;
	for (var i=0; i<3; i++) D.getElementById('sort'+i).className = (i == s? "on" : "");
	
	// Sort
	if (sortData[s]) d = sortData[s]; // Use cached version
	else { // Use cached version
		items.sort( function(a,b) { return (a[s] > b[s]? 1 : (a[s] < b[s]? -1 : 0)); } );
		var d = "";
		for (var i=0, x; i<items.length; i++)
			d += '<a style="font-size: '+(-(x = items[i])[2])+'%" href=/tag/'+x[1]+'>'+x[1]+'</a> ';
		d = d.substr(0, d.length-1);
		sortData[s] = d;
	}
	cloud.innerHTML = d;
}



////////////////////////////////////////////////////////////////////////////////////////////////////
/*|IF_LOCATION|*/ } else if ("http://bayimg.com/faq" == D.location) {


// Empty Copyright footer
var f = D.getElementById('footer');
while (f.firstChild) f.removeChild(f.firstChild);



/*|END_IF_LOCATION|*/ }

