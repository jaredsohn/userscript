// ==UserScript==
// @name          MeCha Navigator
// @namespace     http://www.metachat.org/
// @description   Navigate users' comments in Metachat threads.
// @include       http://*metachat.org/index.php/*
// ==/UserScript==
if (/.*metachat\.org\/index.php\/\d{1,4}\/\d{1,2}\/\d{1,2}\/.*/.test(window.location)) {
	var mfn_poster;
	var mfn_all = [];
	var mfn_div = document.createElement("div");
	mfn_preload();
	mfn_main();
}
function mfn_preload() {
	var css = document.createElement("style");
	css.setAttribute("type","text/css");
	css.innerHTML = "#mfn-dot { padding:0 2px 0 2px;font-size:9pt;line-height:0; } #mfn-arrow { font-weight: bold;padding:0 2px 0 2px;font-size:10pt;line-height:0;} #mfn-list{padding:0 2px 0 2px;font-size:9pt;font-weight: bold;position:relative;top:1px;line-height:0;} #navigator-list a { font-size:8pt;color:#C00;border:1px solid #C66;border-top:none;margin:0;display:block;padding:1px 3px 1px 3px;text-align:center; } #navigator-list li { border:0;margin:0;padding:0;} #navigator-list a:hover { color:white;background:#C66 !important;}";
	document.getElementsByTagName("head")[0].appendChild(css);
	document.body.addEventListener("click",function() { mfn_div.innerHTML = "";mfn_div.style.display = "none"; },true);
	mfn_div.setAttribute("id","navigator-list");
	mfn_div.setAttribute("style","display:none;position:absolute;left:0;top:0;padding:1px 0 0 0;");
	document.body.appendChild(mfn_div);
	var top = document.createElement("a");
	top.setAttribute("name","mfn-top");
	document.body.insertBefore(top,document.body.childNodes[0]);
	mfn_zeroNode = document.createTextNode("| No other comments.");
	var htmlDot = "<b id=\"mfn-dot\">&middot;</b>";
	var htmlLeft = "<a href=\"javascript:void(0);\" target='_self' id='mfn-arrow'>&laquo;</a>";
	var htmlList = "<a href=\"javascript:void(0)\" target='_self' id='mfn-list' onfocus='blur();'>&equiv;</a>";
	var htmlRight = "<a href=\"javascript:void(0);\" target='_self' id='mfn-arrow'>&raquo;</a>";
	mfn_htmlFirst = htmlDot + htmlList + htmlRight;
	mfn_htmlNormal = htmlLeft + htmlList + htmlRight;
	mfn_htmlLast = htmlLeft + htmlList + htmlDot;
}
function mfn_main() {
	var elements = document.evaluate('//div[(@class="bCommentSmallPrint" or @class="bSmallPrint") and (contains(.,"posted by") or contains(.,"post by"))]',document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	mfn_poster = elements.snapshotItem(0).childNodes.item(1).textContent.toString().replace(/^\s+|\s+$/g, ""); //trim
	for (var i=0,element;element = elements.snapshotItem(i);i++) {
		var author = element.childNodes.item(1).textContent.toString().replace(/^\s+|\s+$/g, ""); //trim
		if (typeof(mfn_all[author]) == "object") {// 'splice' problem
			mfn_all[author].push(element);
		} else{
			mfn_all[author] = [element,];
		}
	}
	for (var author in mfn_all) {
		for (var i = 0,lim=mfn_all[author].length;i<lim;i++) {
			if (lim==1) {
				mfn_all[author][i].appendChild(mfn_zeroNode.cloneNode(false));
			} else {
				var panel = document.createElement("span");
				var buffer = ["| Other&nbsp;<small style='line-height:0;'>[",];
				buffer.push((i+1),"/",lim,"]</small>:&nbsp;");
				if (i==0) {
					buffer.push(mfn_htmlFirst);
				} else if (i==(lim-1)) {
					buffer.push(mfn_htmlLast);
				} else {
					buffer.push(mfn_htmlNormal);
				}
				panel.innerHTML = buffer.join("");
				if (i > 0) panel.childNodes.item(3).addEventListener("click",function() {mfn_prev(this.parentNode);},true);
				panel.childNodes.item(4).addEventListener("click",function() {mfn_list(this);},true);
				if (i < (lim-1)) panel.childNodes.item(5).addEventListener("click",function() {mfn_next(this.parentNode);},true);
				mfn_all[author][i].appendChild(panel);
			}
		}
	}
}
mfn_prev = function (panel) {
	var author = panel.parentNode.childNodes.item(1).childNodes.item(0).textContent.replace(/^\s+|\s+$/g, ""); //trim
	var i = panel.textContent.substring(panel.textContent.indexOf("[")+1,panel.textContent.indexOf("/"));
	if (author == mfn_poster && (i-2)==0) {
		window.location.hash = "#mfn-top";
	} else {
		var link = mfn_all[author][i-2].childNodes.item(3).href;
		window.location.hash = link.substring(link.lastIndexOf("#"));
	}
};
mfn_list = function (icon) {
	var author = icon.parentNode.parentNode.childNodes.item(1).childNodes.item(0).textContent.replace(/^\s+|\s+$/g, ""); //trim
	var j = icon.parentNode.textContent.substring(icon.parentNode.textContent.indexOf("[")+1,icon.parentNode.textContent.indexOf("/"))*1;
	var buffer = [];
	if (author == mfn_poster) {
		var link = "#mfn-top";
	} else {
		var link = mfn_all[author][0].childNodes.item(3).href;
		link = link.substring(link.lastIndexOf("#"));
	}
	buffer.push("<a href='javascript:void(0);' onclick='window.location.hash=\""+link+"\"' target='_self' style='float:left;font-size:8px;border-right:none;border-top:1px solid #C66;background:#FEE;' title='first'>&middot;&lt;</a>");
	link = mfn_all[author][mfn_all[author].length-1].childNodes.item(3).href;
	link = link.substring(link.lastIndexOf("#"));
	buffer.push("<a href='javascript:void(0);' onclick='window.location.hash=\""+link+"\"' target='_self' style='float:left;font-size:8px;border-top:1px solid #C66;background:#FEE' title='last'>&gt;&middot;</a>");
	buffer.push("<div id='navigator-scroll' style='clear:both;height:200px;overflow:auto;'>");
	for (var i=0,lim=mfn_all[author].length;i<lim;i++) {
		if (author == mfn_poster && i==0) {
			link = "#mfn-top";
		} else {
			link = mfn_all[author][i].childNodes.item(3).href;
			link = link.substring(link.lastIndexOf("#"));
		}
		buffer.push("<a href='javascript:void(0);'onfocus='blur()' onclick='window.location.hash=\""+link+"\"' target='_self' style='background:#"+(i%2==0?'FDD':'FEE')+((i+1)==j?';text-decoration:underline;font-weight:bold;':';')+"'>"+(i+1)+"</a>");
	}
	buffer.push("</div>");
	mfn_div.innerHTML = buffer.join("");
	var posf = function (obj) {
		var curleft = curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent); }
			return [curleft,curtop];};
	var pos = posf(icon);
	mfn_div.style.left = pos[0]+"px";
	mfn_div.style.top = pos[1]+"px";
	mfn_div.style.display = "block";
	mfn_div.style.position = "absolute";
	mfn_div.childNodes.item(2).scrollTop = mfn_div.childNodes.item(2).childNodes.item(j-1).offsetTop-32; };
mfn_next = function (panel) {
	var author = panel.parentNode.childNodes.item(1).childNodes.item(0).textContent.replace(/^\s+|\s+$/g, ""); //trim
	var i = panel.textContent.substring(panel.textContent.indexOf("[")+1,panel.textContent.indexOf("/"));
	var link = mfn_all[author][i].childNodes.item(3).href;
	window.location.hash = link.substring(link.lastIndexOf("#"));};