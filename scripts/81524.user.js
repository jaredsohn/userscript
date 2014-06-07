// ==UserScript==
// @name           Hpics Album Browser
// @namespace      LlubNek
// @description    Converts a thumbnail page on hpics.com to an album browser
// @include        http://hpics.com/doujin*/index.htm*
// @include        http://www.hpics.com/doujin*/index.htm*
// @include        http://hpics.com/cjoverkill/out.php?*url=../doujin*/index.htm*
// @include        http://www.hpics.com/cjoverkill/out.php?*url=../doujin*/index.htm*
// ==/UserScript==

var debug = false;
var console;

var scriptImages = new Object();
var tmp;

// page data
var bigthumbs = false;
var albumtitle = "";
var images = new Array();

// settings
var imageindex = 0;
var zoommode = 3;
var zoom = 1.0;

// elements
var ss;
var bg;
var thumblist;
var contentDiv;
var firstbutton;
var previousbutton;
var nextbutton;
var lastbutton;
var control;
var panel;
var logo;
var body;

var menupages = new Object();
var menu;

function print(text)	{
	console.appendChild(document.createTextNode(text));
}

function wrapper(func)	{
	return function(event)	{
		if (typeof event != "undefined")	{
			event.stopPropagation();
			event.preventDefault();
		}
		func(event);
	}
}

function scaleImage()	{
	
	var img = contentDiv.children[0];
	img.style.width = "";
	img.style.height = "";
	img.style.maxWidth = "";
	img.style.maxHeight = "";
	img.style.minWidth = "";
	img.style.minHeight = "";
	switch (zoommode)	{
		case 0:	// no scaling
			break;
			
		case 1:	// fit width
			switch (zoom)	{
				case 0:	// fit exactly
					img.style.width = contentDiv.clientWidth + "px";
					break;
				
				case 1:	// fit within (scale down, but not up)
					img.style.maxWidth = contentDiv.clientWidth + "px";
					break;
					
				case 2:	// fill (scale up, but not down)
					img.style.minWidth = contentDiv.clientWidth + "px";
					break;
			}
			break;
			
		case 2:	// fit height
			switch (zoom)	{
				case 0:	// fit exactly
					img.style.height = contentDiv.clientHeight + "px";
					break;
				
				case 1:	// fit within (scale down, but not up)
					img.style.maxHeight = contentDiv.clientHeight + "px";
					break;
					
				case 2:	// fill (scale up, but not down)
					img.style.minHeight = contentDiv.clientHeight + "px";
					break;
			}
			break;
			
		case 3:	// fit width and height
			switch (zoom)	{
				case 0:	// fit exactly
					img.style.width = contentDiv.clientWidth + "px";
					img.style.height = contentDiv.clientHeight + "px";
					break;
				
				case 1:	// fit within (scale down, but not up)
					img.style.maxWidth = contentDiv.clientWidth + "px";
					img.style.maxHeight = contentDiv.clientHeight + "px";
					break;
					
				case 2:	// fill (scale up, but not down)
					img.style.minWidth = contentDiv.clientWidth + "px";
					img.style.minHeight = contentDiv.clientHeight + "px";
					break;
			}
			break;
		
		case 4:	// scale image by a given factor
			img.style.width = img.naturalWidth * zoom;
			img.style.height = img.naturalHeight * zoom;
			img.style.maxWidth = "";
			img.style.maxHeight = "";
			img.style.minWidth = "";
			img.style.minHeight = "";
			break;
	}
	
	if (img.naturalHeight > 0 && img.offsetHeight < contentDiv.clientHeight)	{
		img.style.position = "relative";
		img.style.top = Math.round((contentDiv.clientHeight - img.offsetHeight) / 2) + "px";
	}
	else	{
		img.style.position = "";
		img.style.top = "";
	}
}

function setZoom(newzoom)	{
	var img = contentDiv.children[0];
	var posy = Math.round((contentDiv.scrollHeight > contentDiv.clientHeight)? 
		img.naturalHeight * (contentDiv.scrollTop + contentDiv.clientHeight / 2) / contentDiv.scrollHeight:
		img.naturalHeight / 2);
	var posx = Math.round((contentDiv.scrollWidth > contentDiv.clientWidth)? 
		img.naturalWidth * (contentDiv.scrollLeft + contentDiv.clientWidth / 2) / contentDiv.scrollWidth:
		img.naturalWidth / 2);
		
	var cw = contentDiv.clientWidth;
	var ch = contentDiv.clientHeight;
		
	zoom = newzoom;
	
	img.style.width = img.naturalWidth * zoom;
	img.style.height = img.naturalHeight * zoom;
	
	if (img.offsetWidth > contentDiv.clientWidth)	{
		contentDiv.scrollLeft = Math.round(posx * zoom - contentDiv.clientWidth / 2);
	}
	else	{
		contentDiv.scrollLeft = 0;
	}
	
	if (img.offsetHeight > contentDiv.clientHeight)	{
		contentDiv.scrollTop = Math.round(posy * zoom - contentDiv.clientHeight / 2);
		img.style.position = "";
		img.style.top = "";
	}
	else	{
		contentDiv.scrollTop = 0;
		img.style.position = "relative";
		img.style.top = Math.round((contentDiv.clientHeight - img.offsetHeight) / 2) + "px";
	}
}

function thumbClick(index)	{

	var fnc = function(event) {
		if (typeof event != "undefined")	{
			event.stopPropagation();
			event.preventDefault();
		}
		
		if (index < 0)	{
			index = 0;
		}
		if (index >= images.length)	{
			index = images.length - 1;
		}
		
		imageindex = index;
		
		for (var i = images.length; i--; )	{
			document.getElementById("gmThumbnail" + i).style.opacity = "0.6";
		}
		
		var thumb = document.getElementById("gmThumbnail" + index)
		thumb.style.opacity = "1.0";
		
		// thumb.scrollIntoView();
		
		/*
		if (thumb.offsetTop < thumblist.scrollTop)	{
			thumblist.scrollTop = thumb.offsetTop;
		}
		if (thumb.offsetTop + thumb.offsetHeight > thumblist.scrollTop + thumblist.clientHeight)	{
			thumblist.scrollTop = thumb.offsetTop + thumb.offsetHeight - thumblist.clientHeight;
		}
		*/
		
		thumblist.scrollTop = (thumb.offsetTop - 5) * (1 - (thumblist.clientHeight - thumb.offsetHeight - 10) / (thumblist.scrollHeight - thumb.offsetHeight - 10));
		
		var img = document.createElement("img");
		img.src = images[index].src;
		img.alt = images[index].name;
		img.style.display = "block";
		img.style.margin = "auto";
		img.addEventListener("load", scaleImage, false);
		
		contentDiv.innerHTML = "";		
		contentDiv.appendChild(img);
		
		scaleImage();
	}
	
	return fnc;
}

function adjustSize()	{
	var w = Math.round(window.innerWidth * 0.9);
	var h = Math.round(window.innerHeight * 0.9);

	panel.style.width = (w-2) + "px";
	panel.style.height = (h-2) + "px";
	
	bg.style.width = (w-4) + "px";
	bg.style.height = (h-4) + "px";
	
	control.style.height = previousbutton.offsetHeight + "px";
	control.style.width = (w - control.offsetLeft) + "px";
	control.style.top = (h - control.clientHeight + 1) + "px";
	
	contentDiv.style.width = (w - contentDiv.offsetLeft) + "px";
	contentDiv.style.height = (h - 9 - control.clientHeight) + "px";

	thumblist.style.height = (h - 4) + "px";
	
	firstbutton.style.left = "0px";
	previousbutton.style.left = ((control.clientWidth - previousbutton.offsetWidth) / 3) + "px";
	nextbutton.style.left = ((control.clientWidth - nextbutton.offsetWidth) * 2 / 3) + "px";
	lastbutton.style.left = (control.clientWidth - nextbutton.offsetWidth) + "px";
	
	scaleImage();
}

function hideMenu(event)	{
	if (typeof event != "undefined")	{
		if (event.clientX >= menu.offsetLeft && event.clientX < menu.offsetLeft + menu.offsetWidth &&
			event.clientY >= menu.offsetTop && event.clientY < menu.offsetTop + menu.offsetHeight)	{
			return;
		}
//		event.stopPropagation();
//		event.preventDefault();
	}
	
	menu.style.display = "none";
}

function displayMenu(pageid)	{
	return function(event)	{
		if (typeof event != "undefined")	{
			event.stopPropagation();
			event.preventDefault();
		}
		
		// display a menu under the mouse to select zoom mode, zoom level, or pan
		
		while (menu.children.length > 0)	{
			menu.removeChild(menu.children[0]);
		}
		
		menu.appendChild(menupages[pageid]);
		
		menu.style.display = "";
		if (typeof event != "undefined")	{
			menu.style.left = event.clientX - menu.offsetWidth / 2;
			menu.style.top = event.clientY - menu.offsetHeight / 2;
		}
	}
}

scriptImages["first2.png"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%08%06%00%00%00szz%F4%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%91IDATX%C3%ED%97%B9%11%800%0C%04%17*%83%CE%A12%13A%60%CC%F8%95%7C%01%9Aq%BC%9BX%BA%03%08%D1%F3%9A%0D8%98%20p%83%1F%9E%97%40%0Cv%13%F8%02%9B%0B%E4%C0f%02%A5%E0%E1%02%B5%E0a%02%AD%E0n%81%5Ep%B3%C0(p%B5%C0hp%B1%80%158%2B%60%0D%FE%14%F0%02%07%20%2C%CE%17%F05%2B%93%E7%17H%09%EC%C0%E9)!%F7%0De%16%91%CC*%969F2%E7X%26%90%C8D2%99P*%13%CBe%8A%89L5%93)%A7I%91%0B%DB%3E%D9%5C%BA%87%7Be%00%00%00%00IEND%AEB%60%82";
scriptImages["previous2.png"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%08%06%00%00%00szz%F4%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%89IDATX%C3%CD%979%0E%800%0C%04W%BC%8C%A7%F33%D3%20%1A%88r%F9%18K%A9g%A4%24%F6Z%AA%ABS%D2U%09%B6%E7%94%81%D3%04Z%E0p%81%1E8L%60%14%EC.0%0Bv%13X%05o%0B%EC%82%97%05%BC%C0%D3%02%DE%E0a%81(pW%20%1A%DC%14%C8%02%7F%04%B2%C1%AF%40%15%D8%24%D9!P%95%5D%01%E6%11b%BE!%A6%11aZ1f%18a%C61%26%90%60%22%19%26%94bb9f1%C1%ACf%98%E5%F4W%E4%06%A4y%DFP%B9%DC%F9%CC%00%00%00%00IEND%AEB%60%82";
scriptImages["next2.png"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%08%06%00%00%00szz%F4%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%09pHYs%00%00%0D%D7%00%00%0D%D7%01B(%9Bx%00%00%00%19tEXtSoftware%00www.inkscape.org%9B%EE%3C%1A%00%00%00%92IDATX%85%E5%D5K%0A%C0%20%0CE%D1GW%D6%A5wg%E9%A4%82%82%84%C4%FC%8A%0A%19%DF%03%A2%01%80%07%C0MD%A8%18%00%A0oJ%20%3D%A0%042%03%A4B8%40%0AD%02%08%85h%00!%90%15%80%2B%C4%02p%81x%00L%10O%C0%12%24%02%A0%82D%02D%90%0C%00%0B%C9%04L!%15%80%01r%E1%07%E7%98%2B%18%C2G%3CC6%BC%E5W%AC%0Ao%B1%8EMa%0B%C0%25%BC%02p%0Dk%00!a%09%204%CC%01R%C23%40j%B8%07%94%84%DB%BC%2C%91z%0A%9F%0B%E8%FE%00%00%00%00IEND%AEB%60%82";
scriptImages["last2.png"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%08%06%00%00%00szz%F4%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%09pHYs%00%00%0D%D7%00%00%0D%D7%01B(%9Bx%00%00%00%19tEXtSoftware%00www.inkscape.org%9B%EE%3C%1A%00%00%00%97IDATX%85%ED%D6M%0A%80%20%10%86%E1%AFNV7%AF%93M%AB%02%C5%86%19%E7G%B0%04At%F1%3E%9BR%008%00lD%84%8C%09%80%AA%F9%2CR%20%1C%20%05%22%01%84B4%80%10H%0F%C0%15b%01%B8%40%3C%00%26%88'%A0%0B%12%01PA%22%01%22H%06%80%85d%02%9A%90%11%80%02R%EF%2F%B7b%D4XG%C6%7F%406%E0%04%B0%B7%0E%A6%FD%0C%8B%F0'~%C5lx%CA%EBX%15%9E%E2If%0A%5B%00.%E1%1E%80kX%03%08%09K%00%A1a%0E%90%12~%03%5C%A4i%19c%3F%C9Zp%00%00%00%00IEND%AEB%60%82";

scriptImages["first3.png"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%22%00%00%00!%02%03%00%00%00%C1%BD%91%FF%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09PLTE%00%00%03%00%00%00%80%60%20%0D-%A3%B2%00%00%00%01tRNS%00%40%E6%D8f%00%00%00_IDAT%18%D3%8D%D0%C9%09%C00%0CD%D1A%90%7B%EAP5%22e%A84U%19Y%F6%D8%10%5D%E2%8B%1F%1F%BC%22PC%80%B0%92%DEK%92%D3%94R%12%94R%99%96%94%1AiJ%A9J%25%A5%9E%A0%7C%2B~%EA%AC8%BB%98G%3F%0D%1E%FDV%15%BF%B7%1F%B1%BD2%A3%B5%DF%80o%89%E1%9A%82%BD%D3%FBu%EE%8Bj%B1%5D%00%00%00%00IEND%AEB%60%82";
scriptImages["previous3.png"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00!%00%00%00%22%02%03%00%00%00%AC%1EXR%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09PLTE%00c%02%00%00%00%80%60%20%F5%3E%0F%5E%00%00%00%01tRNS%00%40%E6%D8f%00%00%00bIDAT%18%D3m%D0%C9%0D%00!%0CC%D1%08%89%16R%84%AB%A0%1EJ%A3%CA!%8B%CDerz%FA%08%B1%98%D5%0C%E3%80%18g1Q%E3P%A0nj%81%8AT%02%95)%05%AAR%08T%A7%2B%FC%E8%AD%CE%AD%BD.u%8C3%5C%AA%98wq)c%DD%D9%A5%88%FD6%97n%E4%1F%B847e.M%C9%D6%07%B8aW%95%00%17%3E%C6%00%00%00%00IEND%AEB%60%82";
scriptImages["next3.png"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00!%00%00%00%22%02%03%00%00%00%AC%1EXR%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09PLTE%00c%02%00%00%00%80%60%20%F5%3E%0F%5E%00%00%00%01tRNS%00%40%E6%D8f%00%00%00VIDAT%18%D3m%D0%AB%11%C0P%08DQJ%89N5O%D0BL%AAZ%83%A1%CA%A8%BDk%82%3A%03%C3%F0%A9%AB%1C7z%856%12%DAHh%23%A1%8D%846%12%DAHh%7F%94j%5BCo%5B%C3%8C%B6%86%5D%DA%1Avnk%B8%AD%AD%E1%07N%D5%C3%AFH%D51%3E%F7%F9Y%94C%ADZ%F8%00%00%00%00IEND%AEB%60%82";
scriptImages["last3.png"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%22%00%00%00!%02%03%00%00%00%C1%BD%91%FF%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09PLTE%00c%02%00%00%00%80%60%20%F5%3E%0F%5E%00%00%00%01tRNS%00%40%E6%D8f%00%00%00YIDAT%18%D3%8D%D0%3B%0E%800%0C%03P%8F%88%A3%B1%23%A1%9E%C6%E7%E8%D41%CA)%81%D0z%F1B%A6'%0F%F9aC%D5%3Ep%B0%D4%06ZHI)%A4%0A%3F%85%F4%86S!%3D%E1RHI)%A4%ECR%FET%F7.%F4i%F4%AD%E8%DB%D3%AF%A4%7FC%1F%BA%B04%EB%C4%0D%1E%98y%82%12%04%96%8C%00%00%00%00IEND%AEB%60%82";

scriptImages["first4.png"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%22%00%00%00!%02%03%00%00%00%C1%BD%91%FF%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09PLTEt%00%02%00%00%00%FF%C0%40%BA%0D%C8%03%00%00%00%01tRNS%00%40%E6%D8f%00%00%00_IDAT%18%D3%8D%D0%C9%09%C00%0CD%D1A%90%7B%EAP5%22e%A84U%19Y%F6%D8%10%5D%E2%8B%1F%1F%BC%22PC%80%B0%92%DEK%92%D3%94R%12%94R%99%96%94%1AiJ%A9J%25%A5%9E%A0%7C%2B~%EA%AC8%BB%98G%3F%0D%1E%FDV%15%BF%B7%1F%B1%BD2%A3%B5%DF%80o%89%E1%9A%82%BD%D3%FBu%EE%8Bj%B1%5D%00%00%00%00IEND%AEB%60%82";
scriptImages["previous4.png"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00!%00%00%00%22%02%03%00%00%00%AC%1EXR%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09PLTE%00%00%03%00%00%00%FF%C0%40%B15Qn%00%00%00%01tRNS%00%40%E6%D8f%00%00%00bIDAT%18%D3m%D0%C9%0D%00!%0CC%D1%08%89%16R%84%AB%A0%1EJ%A3%CA!%8B%CDerz%FA%08%B1%98%D5%0C%E3%80%18g1Q%E3P%A0nj%81%8AT%02%95)%05%AAR%08T%A7%2B%FC%E8%AD%CE%AD%BD.u%8C3%5C%AA%98wq)c%DD%D9%A5%88%FD6%97n%E4%1F%B847e.M%C9%D6%07%B8aW%95%00%17%3E%C6%00%00%00%00IEND%AEB%60%82";
scriptImages["next4.png"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00!%00%00%00%22%02%03%00%00%00%AC%1EXR%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09PLTE%00c%02%00%00%00%FF%C0%40I%26%FD%82%00%00%00%01tRNS%00%40%E6%D8f%00%00%00VIDAT%18%D3m%D0%AB%11%C0P%08DQJ%89N5O%D0BL%AAZ%83%A1%CA%A8%BDk%82%3A%03%C3%F0%A9%AB%1C7z%856%12%DAHh%23%A1%8D%846%12%DAHh%7F%94j%5BCo%5B%C3%8C%B6%86%5D%DA%1Avnk%B8%AD%AD%E1%07N%D5%C3%AFH%D51%3E%F7%F9Y%94C%ADZ%F8%00%00%00%00IEND%AEB%60%82";
scriptImages["last4.png"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%22%00%00%00!%02%03%00%00%00%C1%BD%91%FF%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09PLTE%00c%02%00%00%00%FF%C0%40I%26%FD%82%00%00%00%01tRNS%00%40%E6%D8f%00%00%00YIDAT%18%D3%8D%D0%3B%0E%800%0C%03P%8F%88%A3%B1%23%A1%9E%C6%E7%E8%D41%CA)%81%D0z%F1B%A6'%0F%F9aC%D5%3Ep%B0%D4%06ZHI)%A4%0A%3F%85%F4%86S!%3D%E1RHI)%A4%ECR%FET%F7.%F4i%F4%AD%E8%DB%D3%AF%A4%7FC%1F%BA%B04%EB%C4%0D%1E%98y%82%12%04%96%8C%00%00%00%00IEND%AEB%60%82";

scriptImages["logo.png"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkAQMAAADbzgrbAAAAAXNSR0IArs4c6QAAAAZQTFRF%2F%2F%2F%2FAAAAVcLTfgAAADtJREFUCNdj%2BA8EHxgg5AEGBgYDKHmegYEfG3ngA8MHrCT%2FfwasJA715%2Fn5%2BbGSuOwFOhArieRmJL8AAGznUoHYiu%2BuAAAAAElFTkSuQmCC";

bigthumbs = (document.getElementsByTagName("table").length <= 5);

var spans = document.getElementsByTagName("span");
for (var i = spans.length; i--; )	{
	if (spans[i].className == "gallerytitle")	{
		albumtitle = spans[i].textContent;
		break;
	}
}

// Get images
var imgs = document.getElementsByTagName("img");
for (var i = 0; i < imgs.length; ++i)	{
	var file = imgs[i].src.match(/thumbnails\/tn(.*)$/);
	if (file != null)	{
		var img = new Object();
		img.src = "images/"+file[1];
		img.thumb = file[0];
		img.name = file[1];
		img.page = imgs[i].parentNode.href;
		images.push(img);
	}
}

// Got data, build UI

// Add stylesheet
ss = document.createElement("style");
ss.innerHTML = "\
a.gmNavigation img {visibility:hidden;}\
a.gmNavigation:hover img {visibility:visible;}\
div.gmMenuPage {margin: 0px; padding: 0px; width:100%;}\
div.gmMenuPage a {opacity:0.6; background-color:#008000; color:#00C000; margin: 0px; padding: 0px; display:block;}\
div.gmMenuPage a:hover {opacity:1.0;}\
";

bg = document.createElement("div");
bg.style.background = "#000000";
bg.style.opacity = "0.8";
bg.style.width = "1px";
bg.style.height = "1px";
bg.style.position = "absolute";

thumblist = document.createElement("ul");
thumblist.style.display = "block";
thumblist.style.position = "absolute";
thumblist.style.width = bigthumbs? "155px": "125px";
thumblist.style.height = "1px";
thumblist.style.overflow = "auto";
thumblist.style.margin = "0px";
thumblist.style.padding = "0px";

for (var i = 0; i < images.length; ++i)	{
	var thumbimg = document.createElement("img");
	thumbimg.src = images[i].thumb;
	thumbimg.alt = images[i].name;
	thumbimg.title = images[i].name;
	thumbimg.style.width = bigthumbs? "130px": "100px";
	thumbimg.style.height = bigthumbs? "200px": "100px";
	thumbimg.style.overflow = "none";
	thumbimg.style.padding = "0px";
	thumbimg.style.border = "0px";

	var thumbhref = document.createElement("a");
	thumbhref.target = "_blank";
	thumbhref.href = images[i].src;
	thumbhref.style.margin = "0px";
	thumbhref.style.padding = "0px";
	thumbhref.style.border = "0px";

	thumbhref.addEventListener("click", thumbClick(i), true);

	thumbhref.appendChild(thumbimg);

	var thumbitem = document.createElement("li");
	thumbitem.id = "gmThumbnail" + i;
	thumbitem.style.listStyleType = "none";
	thumbitem.style.margin = "5px";
	thumbitem.style.padding = "0px";

	thumbitem.appendChild(thumbhref);
	thumblist.appendChild(thumbitem);
}

contentDiv = document.createElement("div");
contentDiv.id = "gmContent";
contentDiv.style.position = "absolute";
contentDiv.style.left = bigthumbs? "165px": "135px";
contentDiv.style.width = "1px";
contentDiv.style.height = "1px";
contentDiv.style.padding = "0px";
contentDiv.style.margin = "0px";
contentDiv.style.overflow = "auto";

contentDiv.addEventListener("click", displayMenu("contentMenu"), true);

firstbutton = document.createElement("a");
firstbutton.className = "gmNavigation";
firstbutton.style.position = "absolute";
firstbutton.style.backgroundImage = "url(\"" + scriptImages["first3.png"] + "\")";
firstbutton.title = "First";
firstbutton.href = "#";

tmp = document.createElement("img");
tmp.src = scriptImages["first4.png"];
tmp.style.border = "0px";
firstbutton.appendChild(tmp);

firstbutton.addEventListener("click", thumbClick(0), true);

previousbutton = document.createElement("a");
previousbutton.className = "gmNavigation";
previousbutton.style.position = "absolute";
previousbutton.style.backgroundImage = "url(\"" + scriptImages["previous3.png"] + "\")";
previousbutton.title = "Previous";
previousbutton.href = "#";

tmp = document.createElement("img");
tmp.src = scriptImages["previous4.png"];
tmp.style.border = "0px";
previousbutton.appendChild(tmp);

previousbutton.addEventListener("click", function(event) {thumbClick(imageindex-1)(event);}, true);

nextbutton = document.createElement("a");
nextbutton.className = "gmNavigation";
nextbutton.style.position = "absolute";
nextbutton.style.backgroundImage = "url(\"" + scriptImages["next3.png"] + "\")";
nextbutton.title = "Next";
nextbutton.href = "#";

tmp = document.createElement("img");
tmp.src = scriptImages["next4.png"];
tmp.style.border = "0px";
nextbutton.appendChild(tmp);

nextbutton.addEventListener("click", function(event) {thumbClick(imageindex+1)(event);}, true);

lastbutton = document.createElement("a");
lastbutton.className = "gmNavigation";
lastbutton.style.position = "absolute";
lastbutton.style.backgroundImage = "url(\"" + scriptImages["last3.png"] + "\")";
lastbutton.title = "Last";
lastbutton.href = "#";

tmp = document.createElement("img");
tmp.src = scriptImages["last4.png"];
tmp.style.border = "0px";
lastbutton.appendChild(tmp);

lastbutton.addEventListener("click", thumbClick(images.length-1), true);

control = document.createElement("div");
control.style.position = "absolute";
control.style.left = bigthumbs? "165px": "135px";
control.style.width = "1px";
control.style.padding = "0px";
control.style.margin = "0px";

control.appendChild(firstbutton);
control.appendChild(previousbutton);
control.appendChild(nextbutton);
control.appendChild(lastbutton);

panel = document.createElement("div");
panel.style.display = "none";
panel.style.position = "absolute";
panel.style.top = "5%";
panel.style.left = "5%";
panel.style.width = "1px";
panel.style.height = "1px";
panel.style.border = "1px solid black";
panel.style.padding = "5px";
panel.style.margin = "0px";
panel.appendChild(bg);
panel.appendChild(thumblist);
panel.appendChild(contentDiv);
panel.appendChild(control);

logo = document.createElement("a");
logo.style.display = "block";
logo.style.position = "absolute";
logo.style.left = "10px";
logo.style.top = "10px";
logo.href = "#";

tmp = document.createElement("img");
tmp.src = scriptImages["logo.png"];
logo.appendChild(tmp);

logo.addEventListener("click", wrapper(function(){logo.style.display = "none"; panel.style.display = "block"; adjustSize();}), true);

menu = document.createElement("div");
menu.style.position = "absolute";
menu.style.left = "0px";
menu.style.top = "0px";
menu.style.width = "150px";
menu.style.display = "none";
menu.style.border = "1px solid #00FF00";
//menu.style.backgroundColor = "#804000";

menu.addEventListener("mouseout", hideMenu, false);

console = document.createElement("pre");
console.style.margin = "20px";
console.style.padding = "5px";
console.style.border = "1px solid #00FF00";
console.style.backgroundColor = "#008000";
console.style.color = "#00C000";
console.style.height = "400px";
console.style.overflow = "auto";

body = document.getElementsByTagName("body")[0];
body.appendChild(ss);
if (debug) {body.appendChild(console);}
body.appendChild(logo);
body.appendChild(panel);
body.appendChild(menu);

var contentMenu = document.createElement("div");
contentMenu.className = "gmMenuPage";

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", displayMenu("zoomMenu"), true);
tmp.appendChild(document.createTextNode("Zoom"));
contentMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", displayMenu("panMenu"), true);
tmp.appendChild(document.createTextNode("Pan"));
//contentMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", thumbClick(0), true);
tmp.appendChild(document.createTextNode("First"));
contentMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", function(event) {thumbClick(imageindex-1)(event);}, true);
tmp.appendChild(document.createTextNode("Previous"));
contentMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", function(event) {thumbClick(imageindex+1)(event);}, true);
tmp.appendChild(document.createTextNode("Next"));
contentMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", thumbClick(images.length-1), true);
tmp.appendChild(document.createTextNode("Last"));
contentMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", wrapper(function(){panel.style.display = "none"; hideMenu(); logo.style.display = "block";}), true);
tmp.appendChild(document.createTextNode("Exit"));
contentMenu.appendChild(tmp);

var zoomMenu = document.createElement("div");
zoomMenu.className = "gmMenuPage";

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", wrapper(function(){zoommode=0; zoom=0; scaleImage();}), true);
tmp.appendChild(document.createTextNode("Actual Size"));
zoomMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", wrapper(function(event){zoommode=1; zoom=0; scaleImage(); displayMenu("zoomFitMenu")(event);}), true);
tmp.appendChild(document.createTextNode("Fit Width"));
zoomMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", wrapper(function(event){zoommode=2; zoom=0; scaleImage(); displayMenu("zoomFitMenu")(event);}), true);
tmp.appendChild(document.createTextNode("Fit Height"));
zoomMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", wrapper(function(event){zoommode=3; zoom=1; scaleImage(); displayMenu("zoomFitMenu")(event);}), true);
tmp.appendChild(document.createTextNode("Fit Both"));
zoomMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", wrapper(function(event){var img = contentDiv.children[0]; zoommode=4; zoom=img.clientWidth/img.naturalWidth; scaleImage(); displayMenu("zoomScaleMenu")(event);}), true);
tmp.appendChild(document.createTextNode("Scale"));
zoomMenu.appendChild(tmp);

var zoomFitMenu = document.createElement("div");
zoomFitMenu.className = "gmMenuPage";

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", wrapper(function(){zoom=0; scaleImage();}), true);
tmp.appendChild(document.createTextNode("Fit Exactly"));
zoomFitMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", wrapper(function(){zoom=1; scaleImage();}), true);
tmp.appendChild(document.createTextNode("Fit Within"));
zoomFitMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", wrapper(function(){zoom=2; scaleImage();}), true);
tmp.appendChild(document.createTextNode("Fill"));
zoomFitMenu.appendChild(tmp);

var zoomScaleMenu = document.createElement("div");
zoomScaleMenu.className = "gmMenuPage";

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", wrapper(function(){setZoom(0.25);}), true);
tmp.appendChild(document.createTextNode("25%"));
zoomScaleMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", wrapper(function(){setZoom(0.5);}), true);
tmp.appendChild(document.createTextNode("50%"));
zoomScaleMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", wrapper(function(){setZoom(1);}), true);
tmp.appendChild(document.createTextNode("100%"));
zoomScaleMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", wrapper(function(){setZoom(2);}), true);
tmp.appendChild(document.createTextNode("200%"));
zoomScaleMenu.appendChild(tmp);

tmp = document.createElement("a");
tmp.href = "#";
tmp.addEventListener("click", wrapper(function(){setZoom(4);}), true);
tmp.appendChild(document.createTextNode("400%"));
zoomScaleMenu.appendChild(tmp);

var zoomslider = document.createElement("a");
zoomslider.href = "#";
tmp = function(e){
	var event = e || unsafeWindow.event;

//	if (event.button & 1 != 0)	{
		if (typeof event != "undefined")	{
			event.stopPropagation();
			event.preventDefault();
		}
		
		var rect = zoomslider.getBoundingClientRect();
		setZoom(Math.pow(2, (20 * (event.clientX - rect.left) / (rect.right - rect.left) - 10)));
		this.textContent = "Slider:  " + Math.round(zoom*100) + "%";
//	}
};
zoomslider.addEventListener("click", wrapper(function(){}), true);
zoomslider.addEventListener("mousemove", tmp, true);
zoomslider.addEventListener("mousedown", tmp, true);
zoomslider.addEventListener("mouseup", tmp, true);
zoomslider.addEventListener("mouseout", function(){this.textContent = "Slider";}, false);
zoomslider.appendChild(document.createTextNode("Slider"));
zoomScaleMenu.appendChild(zoomslider);

var panMenu = document.createElement("div");
panMenu.className = "gmMenuPage";

menupages["contentMenu"] = contentMenu;
menupages["zoomMenu"] = zoomMenu;
menupages["zoomFitMenu"] = zoomFitMenu;
menupages["zoomScaleMenu"] = zoomScaleMenu;
menupages["panMenu"] = panMenu;

unsafeWindow.onresize = adjustSize;
thumbClick(imageindex)();
adjustSize();
