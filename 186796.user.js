// ==UserScript==
// @name           UniverseMapJavaScriptV1Fix
// @namespace      seko.eea.sk
// @description    Fix Java Script V1 Universe Map for FF 20.0+; resizes and moves the window; draws center
// @include        http://*.war-facts.com/extras/view_universe.php?*
// @version        1.2
// ==/UserScript==

var SK_LOCATION = window.location.href;
var SK_INSTANCE = SK_LOCATION.substring(SK_LOCATION.indexOf('//') + 2);
SK_INSTANCE = SK_INSTANCE.substring(0, SK_INSTANCE.indexOf('.'));

// if true, tries to resize map to new width/height (see bellow)
var resizeMap = true;
// if true, tries to fix the problem http://www.war-facts.com/forum_view.php?forum=4&thread=4295
var fixMap = true;
// new map dimensions
var newWidth = 950;
var newHeight = 950;
var newX = 80
var newY = 60

window.onMapMaxLoad = function() {
  try {
	if (resizeMap) {
		window.resizeTo(newWidth, newHeight);
		window.moveTo(newX, newY);
		// patch styles
		var styleElemList = document.evaluate("/html/head/style[1]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
		if (styleElemList) {
		  var styleElem = styleElemList.iterateNext();
		  if (styleElem) {
			var txt = styleElem.innerHTML;
			styleElem.innerHTML = txt.replace(/width:\s*700px;/g,'width:\s*'+newWidth+'px;').replace(/height:\s*520px;/g,'height:'+newHeight+'px;');
			var xpos = Number(document.evaluate("/html/body/div/form[@id='navigation']/input[@id='xcoord']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext().value);
			var ypos = Number(document.evaluate("/html/body/div/form[@id='navigation']/input[@id='ycoord']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext().value);
			var labelParent = document.evaluate("/html/body/div/div[@id='map']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
			var minx = getXcoords(xpos, 0);
			var maxx = getXcoords(xpos, 4000);
			var miny = getYcoords(ypos, 4000);
			var maxy = getYcoords(ypos, 0);
		  }
		}
	} 
	if (fixMap) {
		fixJavascript()
	}
  } catch (ex) {
	var msg = 'OnMapMaxLoad error: ' + String(ex);
	GM_log(msg)
	alert(msg);
  }
  
  function addLocation(locId, locX, locY, zIndex, labelParent, locImageURL) {
    var ftxt = '#'+locId+' {left: '+locX+'px; top: '+locY+'px; z-index: '+zIndex + ";}\n";
    var txt = styleElem.innerHTML;
    txt = txt.replace(/cursor:\s*hand;/g, '');
    styleElem.innerHTML = txt.replace(/#i0\s*{\s*/, ftxt + '#i0{');
    var spanElem = document.createElement('span');
    spanElem.setAttribute('id', locId);
    spanElem.setAttribute('type','button');
    var imgElem = document.createElement('img');
    imgElem.src = locImageURL;
	spanElem.appendChild(imgElem);
    labelParent.appendChild(spanElem);
  }

  function addStr(str, sep) {
    return str ? (sep + str) : '';
  }

  function getXloc(xpos, xx) {
    return Math.round(2000 - (xpos - xx) * 0.08);
  }

  function getYloc(ypos, yy) {
    return Math.round(2000 + (ypos - yy) * 0.08);
  }

  function getXcoords(xpos, xloc) {
    return Math.round(xpos + (xloc - 2000) / 0.08);
  }

  function getYcoords(ypos, yloc) {
    return Math.round(ypos - (yloc - 2000) / 0.08);
  }
  
  function fixJavascript() {
	// we put the script in a new script element in the DOM
    var script = document.createElement('script');  // create the script element
	scriptCode = createNewJavascript();
    script.innerHTML = scriptCode.join('\n');       // add the script code to it
    scriptCode.length = 0;                          // recover the memory we used to build the script
    // this is sort of hard to read, because it's doing 2 things:
    // 1. finds the first <head> tag on the page
    // 2. adds the new script just before the </head> tag
    document.getElementsByTagName('head')[0].appendChild(script);   
  }
  
  function createNewJavascript() {
    var sc = new Array();
    sc.push('var map = document.getElementById("map");');
    sc.push('var mytop = -1 * 2000 + 260;');
    sc.push('var left = -1 * 2000 + 350;');
    sc.push('var mposx = 0;');
    sc.push('var mposy = 0;');
    sc.push('var init = 0;');
    sc.push('var modx = document.getElementById("xcoord");');
    sc.push('var mody = document.getElementById("ycoord");');
    sc.push('var tsize = 2000;');
    sc.push('var bsize = 2000;');
    sc.push('var lsize = 2000;');
    sc.push('var rsize = 2000;');
    sc.push('var scount = 144;');
	sc.push('var cursor0 = document.createElement(\'span\');');
	sc.push('cursor0.innerHTML = \'<hr width="2" size="20"/><hr width="20" size="2" style="transform:translateY(-19px);-webkit-transform:translateY(-19px);"/>\';');
	sc.push('cursor0.setAttribute("style","left:1990px;top:1985px;z-index:0");');
	sc.push('document.getElementById("map").appendChild(cursor0);');
    sc.push('function mscroll(e) {');
	sc.push('	if (!e) var e = window.event;');
	sc.push('	if (init == 0) {');
	sc.push('		init = 1;');
    sc.push('	} else {');
    sc.push('		mytop = mytop + (e.clientY - mposy);');
    sc.push('		map.style.top = mytop;');
    sc.push('		left = left  + (e.clientX - mposx);');
    sc.push('		map.style.left = left;');
    sc.push('		modx.value = Math.round(60476 - (left - 350 + 2000) / 0.08);');
    sc.push('		mody.value = Math.round(151113 + (mytop - 260 + 2000) / 0.08);');
    sc.push('	}');
    sc.push('	if (left > (-1 * 2000 + lsize) ) postload("left");');
    sc.push('	else if (left < ( -1 * 2000 - rsize + 700) ) postload("right");');
    sc.push('	else if (mytop > (-1 * 2000 + tsize) ) postload("mytop");');
    sc.push('	else if (mytop < ( -1 * 2000 - bsize + 520) ) postload("bottom");');
    sc.push('	mposx = e.clientX; mposy = e.clientY;');
    sc.push('}');
    sc.push('var loadurl;');
    sc.push('var loadx;');
    sc.push('var loady;');
    sc.push('var xmlDoc;');
    sc.push('var loadwhere = "";');
    sc.push('function postload(where) {');
    sc.push('	document.onmousemove = null;');
	sc.push('	var status = document.getElementById("status");');
    sc.push('	status.innerHTML = "LOADING ...";');
    sc.push('	document.getElementById("navigation").submit();');
    sc.push('}');
    sc.push('function addstars() {');
    sc.push('	if (loadwhere == "mytop")');
    sc.push('		tsize = tsize + 2000;');
    sc.push('	else if (loadwhere == "bottom")');
    sc.push('		bsize = bsize + 2000;');
    sc.push('	else if (loadwhere == "left")');
    sc.push('		lsize = lsize + 2000;');
    sc.push('	else if (loadwhere == "right")');
    sc.push('		rsize = rsize + 2000;');
    sc.push('	input = xmlDoc.getElementsByTagName("stars");');
    sc.push('	for (i=0;i<input.length;j++) {');
    sc.push('		scount++;');
    sc.push('		var star = document.createElement("span");');
    sc.push('		star.style.poistion = "absolute";');
    sc.push('		star.innerHTML = "TEST";');
    sc.push('		star.style.left = input[i].childNodes["x"] + 2000 - 60476 + loadx * 0.08 - 1000;');
    sc.push('	}');
    sc.push('}');
    sc.push('document.onmousedown = function() { document.onmousemove = mscroll; }');
    sc.push('document.onmouseup = function() { document.onmousemove = null; init = 0; }');
	return sc
  }
}

window.addEventListener("load", window.onMapMaxLoad, false);
