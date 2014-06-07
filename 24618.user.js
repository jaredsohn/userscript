// ==UserScript==
// (c) bastian karweg 2008
// @name           xing-big-imgs
// @namespace      https://www.xing.com
// @include        https://www.xing.com/app/search*
// ==/UserScript==

function $(id) {
	return document.getElementById();
}

window.addEventListener('load', function() {
	replaceImages();
	},true);
	
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}	
	
function replaceImages() {
	var imgs = getElementsByClass('user-photo-list',null,'img');
	for (img in imgs) {
		var im = imgs[img].wrappedJSObject;
		im.setAttribute('src',im.src.replace(/_s2/,""));
		im.setAttribute('style','width:140px !important; height: 185px !important;');
	}
	reorderTable(im);
}

function reorderTable(node) {
	var table = node.parentNode.parentNode.parentNode.parentNode.parentNode;
	var trs = table.getElementsByTagName('tr')
	if (trs.length>6) { theight = 500; } else { theight = 250; }
	table.setAttribute('style',"height:"+theight+"px");
	var i = 0;
	trs[0].setAttribute('style',"color:#fff");
	for (t in trs) { i++;
	    if (i> 1 && i < 12) {
		var tr = trs[t];
		var tds = tr.getElementsByTagName('td');
		if (i>3) {
		tr.setAttribute('style','position:relative;');
		}
		var topmargin = -theight;
		var leftmargin = 200*(i-2);
		if (i>6) { 
			topmargin = -240;
			leftmargin = 200*(i-7);
		}
		
		tds[0].setAttribute('style',"position: absolute;margin-top:"+(topmargin)+"px; border:0; margin-left:" + (leftmargin)+ "px;");
		tds[1].setAttribute('style',"position: absolute; width:180px; margin-top: "+(topmargin+200)+"px; margin-left:  " + ( leftmargin )+ "px;");		
		tds[2].setAttribute('style',"display:none");
		tds[3].setAttribute('style',"display:none");

	    }
	}
}