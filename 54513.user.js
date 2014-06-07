// ==UserScript==
// @name                DailyGammon Tools.
// @version             0.0.1 26/07/2009
// @namespace           Tanaydin Sirin
// @description         DailyGammon Toolz.
// @include             http://*.dailygammon.com/*
// @features            Colorize current user's nickname at tournament pages
// @features            Refreshes top page every 5 seconds if there is no game to play
// ==/UserScript==


function dailyGammonTools(e) {
	var cPage = window.location.href;
	
	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
	
	function find(xpath, xpres, startnode) {
		if (!startnode) startnode = document;
		var ret = document.evaluate(xpath, startnode, null, xpres, null);
		return xpres == XPFirst ? ret.singleNodeValue : ret;
	}
	function getHtml(xpath) {
		var retval = false;
		var t = find(xpath, XPFirst);
		if (t) {
			retval = t.innerHTML;
		}
		return retval;
	}
	function setCookie(c_name,value,expiredays) {
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
	}
	function getCookie(c_name) {
		if (document.cookie.length>0) {
  			c_start=document.cookie.indexOf(c_name + "=");
  			if (c_start!=-1) {
    			c_start=c_start + c_name.length+1;
    			c_end=document.cookie.indexOf(";",c_start);
    			if (c_end==-1) c_end=document.cookie.length;
    			return unescape(document.cookie.substring(c_start,c_end));
    		}
  		}
		return "";
	}
	function getNick() {
		var match = /Welcome to DailyGammon, (.*?)\./i.exec(getHtml('/html/body/h2'));
		if (match) setCookie('dgUserName',match[1],365);
		checkAvaibleGame();
	}
	function getDarkerColor(h) {
		var R = parseInt((cutHex(h)).substring(0,2),16) - 48;
		var G = parseInt((cutHex(h)).substring(2,4),16) - 48;
		var B = parseInt((cutHex(h)).substring(4,6),16) - 48;
		return RGBtoHex(R,G,B);
	}
	function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
	function RGBtoHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
	function toHex(N) {
 		if (N==null) return "00";
 		N=parseInt(N); if (N==0 || isNaN(N)) return "00";
 		N=Math.max(0,N); N=Math.min(N,255); N=Math.round(N);
 		return "0123456789ABCDEF".charAt((N-N%16)/16) + "0123456789ABCDEF".charAt(N%16);
	}
	function colorizeNick() {
		var nicktds = find("//td", XPList);
		var nickPattern = new RegExp(getCookie('dgUserName'));
		for (tds = 1; tds < nicktds.snapshotLength; tds++) {
			if (nickPattern.exec(nicktds.snapshotItem(tds).firstChild.innerHTML)) {
				nicktds.snapshotItem(tds).bgColor = getDarkerColor(document.bgColor);
			}
		}
	}
	
	function checkAvaibleGame() {
		var match = /There are no matches where you can move\./.exec(getHtml('/html/body'));
		if (match) {
			window.setTimeout('document.location=\'/bg/top\'',5000);
		}
	}

	if (cPage.match(/\/bg\/top/) || cPage.match(/\/bg\/login/)) { getNick(); }
	if (cPage.match(/\/bg\/move/)) { getNick(); }
	if (cPage.match(/\/bg\/event\//)) { colorizeNick(); }
}

if (window.addEventListener) {
	window.addEventListener('load', dailyGammonTools, false);
} else {
	window.attachEvent('onload', dailyGammonTools);
}