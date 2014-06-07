// ==UserScript==
// @name          MeFi Highlight Users
// @namespace     http://www.metafilter.com/
// @description   Highlight special users on Mefi. Modification of matthewr's MeFi Navigator script.
// @include       http://*.metafilter.com/*
// @include       http://metafilter.com/*
// ==/UserScript==
if (/.*metafilter\.com\/(\d{1,7}\/|mefi\/|comments\.mefi).*/.test(window.location)) {
	var mfn_admins = ["mathowie", "jessamyn", "cortex", "pb"]; // no vacapinta: http://metatalk.metafilter.com/17990/#665968
	var mfn_poster;
	var mfn_all = [];
//	var mfn_div = document.createElement("div");
	var mfn_metatalk = (window.location.toString().substring(7,15)=="metatalk" ? true : false);
	mfn_preload();
	window.addEventListener('load',mfn_main,false); // is it necessary to wait for the load event?
}
function mfn_preload() {
	mfn_you = mfn_user();
	var css = document.createElement("style");
	css.setAttribute("type","text/css");
	mfn_posterNode = document.createElement("span");
	mfn_posterNode.innerHTML = "P";
	mfn_posterNode.setAttribute("style","font-family:Arial,sans-serif;-moz-opacity:0.8;background:#D0D000;color:#222;margin-left:4px;padding:0px 2px 0px 2px;font-weight:bold;font-size:10px;line-height:0;");
	mfn_adminNode = mfn_posterNode.cloneNode(true);
	mfn_adminNode.innerHTML = "A";
	mfn_adminNode.style.background = "white";
	mfn_userNode = mfn_adminNode.cloneNode(true);
	mfn_userNode.innerHTML = "Me";
	mfn_userNode.style.background = "#CC9";
	mfn_userNode.style.color = "#333";
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
	var elements = document.evaluate('//div[@class="comments" or @class="copy"]/span[@class="smallcopy"]',document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
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
			if (mfn_metatalk == true && mfn_admins.indexOf(author) != -1) {
				mfn_all[author][i].getElementsByTagName('a').item(0).appendChild(mfn_adminNode.cloneNode(true));
			}
		}
	}
}
