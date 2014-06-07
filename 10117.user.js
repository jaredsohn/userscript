// ==UserScript==
// @name           bayimg.com - Maximize Image View Area
// @namespace      Manix
// @include        http://bayimg.com/tag/*
// ==/UserScript==

// Global Variables
var pageNr = 1, pagesCount = 1, imgId = -1, imagesCount = 0, imagesPaths = [], allLoaded = false;

// Global Functions
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
	prevImg.src = "";
	prevImg.src = imagesPaths[imgId];
	if (prevImg.height == 0) { // Check the image hasn't loaded instantaneously (if has been seen before, cached)
		D.getElementById('prevPrg').style.display = "block";
		prevImg.style.display = "none";
		setTimeout(shiftImgOnShow, 1);
	} else centerImg();
}
function shiftImgOnShow() {
	if (prevImg.height == 0) setTimeout(shiftImgOnShow, 10);
	else centerImg();
}
function unShiftImg() {
	prevImg.style.position = null;
	prevImg.style.display = null;
}
function centerImg() {
	shadowImg.style.width = prevImg.width+"px";
	shadowImg.style.height = prevImg.height+"px";
	prevImg.style.position = "relative";
	setTimeout(unShiftImg, 1);
}

// Create Full-Page Image View
var D = document, prevCont = D.createElement('DIV'), prevCell = D.createElement('DIV'), prevFill = D.createElement('DIV'), prevImg;
prevCont.style.cssText = "position:absolute; left:0px; top:0px; width:100%; height:100%; display:none; z-index:2";
prevCont.innerHTML =
	'<table style="position: absolute; left: 0px; top: 0px; height: 100%; width: 100%;"><tr><td>'+
		'<div style="text-align: center; position: absolute; width: 100%; height: 100%;">'+
			'<img id=prevImg style="max-height: 100%; max-width: 100%;" src="" onload="document.getElementById(\'prevPrg\').style.display=\'none\'"></div>'+
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

// Make View Full-Page
var w = "width:100%";
D.body.style.margin = "0px";
D.body.style.backgroundColor = "#EDF4FB";
D.getElementsByTagName('HTML')[0].style.margin = "0px";
D.getElementById('container').style.cssText = w+"; background:#FFF";
D.getElementById('extra2').style.cssText = w;
D.getElementById('footer').style.cssText = "display:none";
D.getElementById('header').style.cssText = w+"; background:#FFF";

// Change Thumbs Borders
D.styleSheets[0].insertRule("div#wrapper .image-setting {border:1px solid #BBBBBB !important; padding:2px !important}", 0);
D.styleSheets[0].insertRule("P {font-size:1.5em !important; margin-top:10px !important}", 0);

// Add Click Events
function changeThumbs() {
	var t = D.getElementById('thumbs');
	if (t) {
		
		// Add Thumbnails on-click Full Screen View
		if (t.firstChild) {
			var thumbs = t.firstChild.childNodes;
			imagesCount = 0;
			imagesPaths = [];
			for (var i=0; i<thumbs.length; i++) {
				var thumb = thumbs[i], h = thumb.href.toLowerCase(); h = h.substr(h.lastIndexOf('/')+1);
				imagesCount++;
				imagesPaths.push("http://image.bayimg.com/"+h.substr(0,2)+"/"+h.substr(2,2)+"/"+h.substr(4,2)+"/"+h.substr(6,2)+"/"+h.substr(8,1)+".jpg");
				thumb.firstChild.alt = i;
				thumb.addEventListener('click', thumbClick, false);
			}
		}
		
		// When no results are returned "t.lastChild" is unavailable
		if (t.childNodes.length > 1) {
			var pages = t.lastChild, pagesChilds = pages.childNodes, curPageNr, page = pages.firstChild, nextPage = page.nextSibling, b;
			
			// Find Active Page
			for (var i=0; i<pagesChilds.length; i++)
				if (pagesChilds[i].tagName == "STRONG") {
					curPageNr = parseInt(pagesChilds[i].textContent);
					pagesChilds[i].style.padding = "0px 4px";
					pagesChilds[i].style.cursor = "default";
				}
			
			// Fix Page Links
			for (; page; page = nextPage) { nextPage = page.nextSibling;
				var c = page.textContent, i = parseInt(c);
				if (page.tagName == "STRONG") { // Active Page button
					// Ignore, set b to true so I know when it's the Next or Prev Button
					b = 1;
				} else if (c!="  " && c!=" " && c!="" && isNaN(i)) { // "..." Button
					var x = D.createElement('SPAN');
					x.appendChild(D.createTextNode(c));
					x.style.color = "#819BCB";
					x.style.padding = "0px 4px";
					x.style.cursor = "default";
					t.lastChild.replaceChild(x, page);
				} else if (c!="  " && c != " ") { // Page Buttons
					var newPage = D.createElement('A');
					newPage.style.padding = "0px 4px";
					newPage.addEventListener('click', pageBtnClick, false);
					if (page.childNodes[0] && page.childNodes[0].tagName == "IMG") { // Next, Prev
						newPage.appendChild(page.childNodes[0]);
						newPage.href = document.location+" (page "+(curPageNr+(b?1:-1))+")";
					} else { // Page Button
						newPage.appendChild(D.createTextNode(c));
						newPage.href = document.location+" (page "+c+")";
						pagesCount = Math.max(pagesCount, i);
					}
					pages.replaceChild(newPage, page);
				} else pages.removeChild(page);
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

