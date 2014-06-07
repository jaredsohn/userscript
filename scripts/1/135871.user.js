// ==UserScript==
// @name Tumblr DashboardのChatの引用元をリンクにする
// @description T/O
// @namespace http://www.ne.jp/asahi/hc/miya/software/ns
// @include http://www.tumblr.com/dashboard*
// @include http://www.tumblr.com/blog/*
// @include http://www.tumblr.com/like*
// @include http://www.tumblr.com/tagged/*
// @include http://www.tumblr.com/show/chats*
// @version 1r1
// @licemse MIT license
// @copyright 2012, Hikaru Miyagi (http://hcm-qua.tumblr.com/)
// ==/UserScript==
(function(){
	function conv_chat_cite(post) {
		var lines = post.getElementsByClassName("chat_line");
		var re = /\s*\[(https?:\/\/)([^\/]*)(\/?[^\]]*)\]\s*$/
		var i;
		for (i = 0; i < lines.length; i++) {
			var line = lines[i];
			var m = re.exec(line.lastChild.nodeValue);
			if (!m) {continue;}
			var cite = line.lastChild.splitText(m.index);
			line.removeChild(cite);
			cite = document.createElement("CITE");
			var ca = document.createElement("A");
			ca.href = m[1] + m[2] + m[3];
			ca.appendChild(document.createTextNode("[" + i + "]"));
			cite.appendChild(ca);
			line.appendChild(cite);
		}
	}
	
	function conv_chat_cite_ap(ev) {
		var elem = ev.target;
		var cn = elem.className;
		if (/\bpost\b/.test(cn) && /\bconversation\b/.test(cn)) {
			conv_chat_cite(elem);
		}
	}
	
	var ol = document.getElementById("posts");
	if (!ol) {
		return;
	}
	var mainpostlist = ol.getElementsByClassName("post is_conversation");
	var i;
	for (i = 0; i < mainpostlist.length; i++) {
		conv_chat_cite(mainpostlist[i]);
	}
	ol.addEventListener('AutoPagerize_DOMNodeInserted', conv_chat_cite_ap, false);
	ol.addEventListener('AutoPatchWork.DOMNodeInserted', conv_chat_cite_ap, false);
})();
