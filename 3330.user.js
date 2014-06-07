// ==UserScript==
// @name          MeFi Navigator
// @namespace     http://www.metafilter.com/
// @description   Navigate users' comments in Metafilter threads.
// @include       http://*.metafilter.com/*
// @include       http://metafilter.com/*
// @include       https://*.metafilter.com/*
// @include       https://metafilter.com/*
// @grant         none
// ==/UserScript==
if (/.*metafilter\.com\/(\d{1,7}\/|mefi\/|comments\.mefi).*/.test(window.location)) {
	var mfn_poster;
	var mfn_all = [];
	var mfn_div = document.createElement("div");
	mfn_preload();
	mfn_main(); // don't wait for page load event
}
function mfn_preload() {
	mfn_you = mfn_user();
	var css = document.createElement("style");
	css.setAttribute("type","text/css");
	css.innerHTML = "#mfn-dot { padding:0 2px 0 2px;font-size:9pt;line-height:0; } #mfn-arrow { padding:0 2px 0 2px;font-size:10pt;line-height:0;} #mfn-list{padding:0 2px 0 2px;font-size:9pt;line-height:0;} #navigator-list a { -moz-opacity:0.9;background:#666;font-size:8pt;font-family:Arial,sans-serif;border:1px solid #CCC;border-top:none;margin:0;display:block;padding:1px 3px 1px 3px;text-align:center; } #navigator-list li { border:0;margin:0;padding:0;} #navigator-list a:hover { -moz-opacity:1;}";
	document.getElementsByTagName("head")[0].appendChild(css);
	document.body.addEventListener("click",function() { mfn_div.innerHTML = "";mfn_div.style.display = "none"; },true);
	mfn_div.setAttribute("id","navigator-list");
	mfn_div.setAttribute("style","display:none;position:absolute;left:0;top:0;padding:1px 0 0 0;");
	document.body.appendChild(mfn_div);
	mfn_posterNode = document.createElement("span");
	mfn_posterNode.innerHTML = "Poster";
	mfn_posterNode.setAttribute("style","font-family:Arial,sans-serif;-moz-opacity:0.8;background:#D0D000;color:#222;margin-left:4px;padding:0px 2px 0px 2px;font-weight:bold;font-size:9px;line-height:0;");
	mfn_adminNode = mfn_posterNode.cloneNode(true);
	mfn_adminNode.innerHTML = "Admin";
	mfn_adminNode.style.background = "white";
	mfn_userNode = mfn_adminNode.cloneNode(true);
	mfn_userNode.innerHTML = "Me";
	mfn_userNode.style.background = "#CC9";
	mfn_userNode.style.color = "#333";
	mfn_zeroNode = document.createTextNode("No other comments.");
	var htmlDot = "<b id=\"mfn-dot\">&middot;</b>";
	var htmlLeft = "<a href=\"javascript:void(0);\" target='_self' id='mfn-arrow'>&laquo;</a>";
	var htmlList = "<a href=\"javascript:void(0)\" target='_self' id='mfn-list' onfocus='blur();'>&equiv;</a>";
	var htmlRight = "<a href=\"javascript:void(0);\" target='_self' id='mfn-arrow'>&raquo;</a>";
	mfn_htmlFirst = htmlDot + htmlList + htmlRight;
	mfn_htmlNormal = htmlLeft + htmlList + htmlRight;
	mfn_htmlLast = htmlLeft + htmlList + htmlDot;
}
function mfn_user() {
	var cookie = document.cookie.toString();
	var i = cookie.indexOf("USER_NAME");
	if (i == -1) {
		return false;
	} else {
		var j = cookie.indexOf(';',i);
		if (j == -1) j=cookie.length; 
		return unescape(cookie.substring(i+10,j));
	}
}
function mfn_main() {
	var elements = document.evaluate('//div[@class="comments" or @class="copy" or @class="comments bestleft"]/span[@class="smallcopy"]',document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	mfn_poster = elements.snapshotItem(0).getElementsByTagName('a').item(0).textContent.toString();
	for (var i=0,element;element = elements.snapshotItem(i);i++) {
		var author = element.getElementsByTagName('a').item(0).textContent.toString();
		if (typeof(mfn_all[author]) == "object") { // 'splice' problem
			mfn_all[author].push(element);
		} else{
			mfn_all[author] = [element,];
		}
	}
	for (var author in mfn_all) {
		for (var i = 0,lim=mfn_all[author].length;i<lim;i++) {
			if (mfn_you != false && author == mfn_you) {
				mfn_all[author][i].getElementsByTagName('a').item(0).appendChild(mfn_userNode.cloneNode(true));
			}
			if (author == mfn_poster && i > 0) {
				mfn_all[author][i].getElementsByTagName('a').item(0).appendChild(mfn_posterNode.cloneNode(true));
			}
			if (lim==1) {
				mfn_all[author][i].appendChild(mfn_zeroNode.cloneNode(false));
			} else {
				var panel = document.createElement("span");
				var buffer = ["Other&nbsp;<small style='line-height:0;'>[",];
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
	var author = panel.parentNode.getElementsByTagName('a').item(0).childNodes.item(0).textContent;
	var i = panel.textContent.substring(panel.textContent.indexOf("[")+1,panel.textContent.indexOf("/"));
	if (author == mfn_poster && (i-2)==0) {
		window.location = "#top";
	} else {
		var link = mfn_all[author][i-2].getElementsByTagName('a').item(1).href;
		if (link.indexOf("faq.metafilter.com") !== -1) { //staff have an extra anchor element to the faq, we don't want that one
			link = mfn_all[author][i-2].getElementsByTagName('a').item(2).href;
		}
		window.location = link.substring(link.lastIndexOf("#"));
	}
};
mfn_list = function (icon) {
	var author = icon.parentNode.parentNode.getElementsByTagName('a').item(0).childNodes.item(0).textContent;
	var j = icon.parentNode.textContent.substring(icon.parentNode.textContent.indexOf("[")+1,icon.parentNode.textContent.indexOf("/"))*1;
	var buffer = [];
	if (author == mfn_poster) {
		var link = "#top";
	} else {
		var link = mfn_all[author][0].getElementsByTagName('a').item(1).href;
		link = link.substring(link.lastIndexOf("#"));
	}
	buffer.push("<a href='"+link+"' target='_self' style='float:left;font-size:8px;border-right:none;background:#111;' title='first'>&middot;&lt;</a>");
	link = mfn_all[author][mfn_all[author].length-1].getElementsByTagName('a').item(1).href;
	link = link.substring(link.lastIndexOf("#"));
	buffer.push("<a href='"+link+"' target='_self' style='float:left;font-size:8px;background:#111' title='last'>&gt;&middot;</a>");
	buffer.push("<div id='navigator-scroll' style='clear:both;height:200px;overflow:auto;'>");
	for (var i=0,lim=mfn_all[author].length;i<lim;i++) {
		if (author == mfn_poster && i==0) {
			link = "#top";
		} else {
			link = mfn_all[author][i].getElementsByTagName('a').item(1).href;
			if (link.indexOf("faq.metafilter.com") !== -1) {
				link = mfn_all[author][i].getElementsByTagName('a').item(2).href;
			}
			link = link.substring(link.lastIndexOf("#"));
		}
		buffer.push("<a href='"+link+"' target='_self' style='background:#"+(i%2==0?'444':'111')+((i+1)==j?';text-decoration:underline;color:white;':';')+"'>"+(i+1)+"</a>");
	}
	buffer.push("</div>");
	mfn_div.innerHTML = buffer.join("");
	mfn_div.style.left = icon.offsetLeft-1;
	mfn_div.style.top = icon.offsetTop-1;
	mfn_div.style.display = "block";
	mfn_div.childNodes.item(2).scrollTop = mfn_div.childNodes.item(2).childNodes.item(j-1).offsetTop-32; };
mfn_next = function (panel) {
	var author = panel.parentNode.getElementsByTagName('a').item(0).childNodes.item(0).textContent;
	var i = panel.textContent.substring(panel.textContent.indexOf("[")+1,panel.textContent.indexOf("/"));
	var link = mfn_all[author][i].getElementsByTagName('a').item(1).href;
	if (link.indexOf("faq.metafilter.com") !== -1) { //staff have an extra anchor element to the faq, we don't want that one
		link = mfn_all[author][i].getElementsByTagName('a').item(2).href;
	}
	window.location = link.substring(link.lastIndexOf("#"));
};