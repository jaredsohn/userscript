// ==UserScript==
// @name		   orkut - Personal Toolbar  v.2
// @namespace      http://hobbytricks.blogspot.com
// @description	   Personal Toolbar
// @include	 	   http://www.orkut.com/*
// @maintained by  Copyright  2005-2008.
// ==/UserScript==
function getAnchorPosition(anchorname) {
	// This function will return an Object with x and y properties
	var useWindow=false;
	var coordinates=new Object();
	var x=0,y=0;
	// Browser capability sniffing
	var use_gebi=false, use_css=false, use_layers=false;
	if (document.getElementById) { use_gebi=true; }
	else if (document.all) { use_css=true; }
	else if (document.layers) { use_layers=true; }
	// Logic to find position
 	if (use_gebi && document.all) {
		x=AnchorPosition_getPageOffsetLeft(document.all[anchorname]);
		y=AnchorPosition_getPageOffsetTop(document.all[anchorname]);
		}
	else if (use_gebi) {
		var o=document.getElementById(anchorname);
		x=AnchorPosition_getPageOffsetLeft(o);
		y=AnchorPosition_getPageOffsetTop(o);
		}
 	else if (use_css) {
		x=AnchorPosition_getPageOffsetLeft(document.all[anchorname]);
		y=AnchorPosition_getPageOffsetTop(document.all[anchorname]);
		}
	else if (use_layers) {
		var found=0;
		for (var i=0; i<document.anchors.length; i++) {
			if (document.anchors[i].name==anchorname) { found=1; break; }
			}
		if (found==0) {
			coordinates.x=0; coordinates.y=0; return coordinates;
			}
		x=document.anchors[i].x;
		y=document.anchors[i].y;
		}
	else {
		coordinates.x=0; coordinates.y=0; return coordinates;
		}
	coordinates.x=x;
	coordinates.y=y;
	return coordinates;
	}
// Functions for IE to get position of an object
function AnchorPosition_getPageOffsetLeft (el) {
	var ol=el.offsetLeft;
	while ((el=el.offsetParent) != null) { ol += el.offsetLeft; }
	return ol;
	}
function AnchorPosition_getWindowOffsetLeft (el) {
	return AnchorPosition_getPageOffsetLeft(el)-document.body.scrollLeft;
	}	
function AnchorPosition_getPageOffsetTop (el) {
	var ot=el.offsetTop;
	while((el=el.offsetParent) != null) { ot += el.offsetTop; }
	return ot;
	}
function AnchorPosition_getWindowOffsetTop (el) {
	return AnchorPosition_getPageOffsetTop(el)-document.body.scrollTop;
	}
/*start --------------*/
function showmenu(elmnt,name,offset) {
	var c = getAnchorPosition(name);
	var adjust = offset
	if (document.getElementById) {
		var o = document.getElementById(elmnt);
		if (o.style.visibility=="visible") {
			hidemenu(elmnt);
		} else if (o.style) {
			o.style.left = c.x;
			o.style.top = c.y+ adjust;
			o.style.visibility = "visible";
		}
	} 
}
function hidemenu(elmnt) {
	var o = document.getElementById(elmnt);
	if (o.style) {
			o.style.visibility = "hidden";		
		}
}

style = document.createElement("style");
style.textContent = " \n #icapsitedroplist {BORDER:1px solid #fff;PADDING:0px 0px;FONT:normal 11px arial,helvetica;LEFT:702px;VISIBILITY:hidden;MARGIN:0px;WIDTH:164px;COLOR:#666666;POSITION:absolute;TOP:144px;BACKGROUND:#fff} \n #icapsitedroplist A {COLOR:#666;TEXT-DECORATION:none} 
 n #icapsitedroplist UL {BORDER:1px solid #b2aea1;PADDING:1px 1px;MARGIN:0px;LIST-STYLE-TYPE:none;BACKGROUND:#fff} \n #icapsitedroplist LI {PADDING-RIGHT:7px;PADDING-LEFT:5px;PADDING-TOP:2px;PADDING-BOTTOM:1px;WIDTH:158px} \n #icapsitedroplist LI.off {BACKGROUND:#fff} \n #icapsitedroplist LI.over {BACKGROUND:#d8e2eb} \n";
document.getElementsByTagName("head")[0].appendChild(style);

var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li>a</li>";