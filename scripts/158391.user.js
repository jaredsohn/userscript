// ==UserScript==
// @name          Glorious Soviet 4chan
// @namespace     pictron
// @description	  >implying
// @author        pictron
// @homepage      http://boards.4chan.org/g/
// @include       http://boards.4chan.org/*
// @include       https://boards.4chan.org/*
// @include       http://*.boards.4chan.org/*
// @include       https://*.boards.4chan.org/*
// @include       http://www.4chan.org/*
// @include       https://www.4chan.org/*
// @include       http://*.www.4chan.org/*
// @include       https://*.www.4chan.org/*
// @include       http://dis.4chan.org/*
// @include       https://dis.4chan.org/*
// @include       http://*.dis.4chan.org/*
// @include       https://*.dis.4chan.org/*
// @run-at        document-end
// ==/UserScript==
(function() {
var css = "";
if (false || (document.domain == "boards.4chan.org" || document.domain.substring(document.domain.indexOf(".boards.4chan.org") + 1) == "boards.4chan.org"))
	css += "html\n{\nbackground: transparent !important;\ncolor: #000000 !important;\n}\n\nbody\n{\nbackground: #de000f !important;\nbackground-image: url('http://i357.photobucket.com/albums/oo18/redsyndicate/ussr.png') !important;\nbackground-repeat:no-repeat !important;\nbackground-attachment:fixed !important;\nbackground-position:560px 100px !important; \n}\n\n\na\n{\ncolor: #550000 !important;\ntext-decoration: underline !important;\n}\n\na:hover\n{\ncolor: #000000 !important;\n}\n\n\ndiv#boardNavDesktopFoot.desktop, div#boardNavDesktop.desktop, div.boardTitle, div.boardSubtitle, div.navLinks.navLinksBot.desktop, div.navLinks.desktop\n{\ncolor: #000000 !important;\n}\n\ndiv.stylechanger.desktop\n{\ncolor: #ffd700 !important;\n}\n\ndiv.postingMode.desktop, div.pagelist.desktop\n{\nbackground: #ffd700 !important;\ncolor: #000000 !important;\nborder-style:solid !important;\nborder-width:1px !important;\nborder-color: #000000 !important;\n}\n\ndiv.deleteform.desktop\n{\nbackground: #ffd700 !important;\ncolor: #000000 !important;\nborder-style:solid !important;\nborder-width:1px !important;\nborder-color: #000000 !important;\npadding: 2px !important;\n}\n\n#threadWatcher.extPanel.reply\n{\ncolor: #000000 !important;\ntext-align: left !important;\nbackground: transparent !important;\nborder-style:none !important;\nposition: absolute !important;\nleft: 80px !important;\ntop: 260px !important;\n}\n\n.drag\n{\ncolor: #000000 !important;\ntext-align: left !important;\n}\n\nhr\n{\nborder: transparent !important;\n}\n\n\ntd\n{\nbackground: transparent !important;\ncolor: #000000 !important;\nborder: none !important;\n}\n\n\n.post.op\n{\ncolor: #000000 !important;\n}\n\n.post.op.preview, .post.reply\n{\ncolor: #000000 !important;\nbackground: #ffd700 !important;\nborder-style:solid !important;\nborder-width:1px !important;\nborder-color: #000000 !important;\n}\n\n.post.reply.preview, .post.reply.highlight\n{\ncolor: #000000 !important;\nbackground: #de000f !important;\nborder-style:solid !important;\nborder-width:1px !important;\nborder-color: #000000 !important;\n}\n\nspan.subject\n{\ncolor: #ffd700 !important;\nbackground: #de000f !important;\n}\n\nspan.name, .tu-error, span.abbr, span.summary.desktop\n{\ncolor: #000000 !important;\n}\n\nspan.postertrip, span.quote\n{\ncolor: #000000 !important;\nfont-style: italic !important;\n}\n\na.useremail[href=\"mailto:sage\"]:after \n{\ncontent:\" (sage)\";\n}\n\n.sideArrows, strong, span.hand:hover\n{\ncolor: #ffd700 !important;\n}\n\n.extPanel.reply\n{\ncolor: #000000 !important;\ntext-align: left !important;\nbackground: transparent !important;\nborder-style:none !important;\n}\n\n.drag.postblock\n{\nbackground: transparent !important;\nborder-style:none !important;\n}\n\n\n\ndiv.boxbar\n{\ncolor: #ffd700 !important;\nbackground: #000000 !important;\n}\n\ndiv.box-outer.top-box\n{\nposition: fixed !important;\ntop: 17px !important;\nleft: 370px !important;\ncolor: #000000 !important;\nbackground: transparent !important;\nborder-style:none !important;\n}\n\n\nhr.abovePostForm, ul.rules, div.center.middlead, div#logo\n{\ndisplay: none !important;\n}";
if (false || (document.domain == "www.4chan.org" || document.domain.substring(document.domain.indexOf(".www.4chan.org") + 1) == "www.4chan.org"))
	css += "html\n{\nbackground: transparent !important;\ncolor: #000000 !important;\n}\n\nbody\n{\nbackground: #de000f !important;\nbackground-image: url('http://i357.photobucket.com/albums/oo18/redsyndicate/ussr.png') !important;\nbackground-repeat:no-repeat !important;\nbackground-attachment:fixed !important;\nbackground-position:560px 100px !important; \n}\n\nli.fill\n{\nborder: inherit !important;\n}\n\ndiv.boxbar, div#announce.box-outer, div#recent-images.box-outer.left-box, div#recent-threads.box-outer.right-box, div#popular-threads.box-outer.right-box, div.box-outer.right-box\n{\nbackground: #ffd700 !important;\ncolor: #000000 !important;\nborder-style:solid !important;\nborder-width:1px !important;\nborder-color: #000000 !important;\n}\n\n\nh2\n{\nbackground: #ffd700 !important;\ncolor: #000000 !important;\n}\n\nspan.plus\n{\nbackground: #ffd700 !important;\ncolor: #000000 !important;\nborder-style:solid !important;\nborder-width:1px !important;\nborder-color: #000000 !important;\n}\n\n\na\n{\ncolor: #550000 !important;\ntext-decoration: underline !important;\n}\n\na#filter-button, a#option-button\n{\nbackground: #ffd700 !important;\n}\n\na:hover\n{\ncolor: #000000 !important;\n}\n\na.tooltiplink-ws.boardlink\n{\nbackground: #ffd700 !important;\n}\n\nli\n{\nborder: none !important;\nbackground: transparent !important;\n}\n\n\ndiv#logo\n{\ndisplay: none !important;\n}";
if (false || (document.domain == "dis.4chan.org" || document.domain.substring(document.domain.indexOf(".dis.4chan.org") + 1) == "dis.4chan.org"))
	css += "html\n{\nbackground: transparent !important;\ncolor: #000000 !important;\n}\n\nbody\n{\nbackground: #de000f !important;\nbackground-image: url('http://i357.photobucket.com/albums/oo18/redsyndicate/ussr.png') !important;\nbackground-repeat:no-repeat !important;\nbackground-attachment:fixed !important;\nbackground-position:560px 100px !important; \n}\n\ndiv.hborder\n{\nbackground: transparent !important;\ncolor: #000000 !important;\nborder-style:none !important;\n}\n\ndiv.head\n{\nbackground: transparent !important;\ncolor: #000000 !important;\nborder-style:none !important;\n}\n\ndiv.border, div.thread, h2\n{\nbackground: #ffd700 !important;\ncolor: #000000 !important;\nborder-style:solid !important;\nborder-width:1px !important;\nborder-color: #000000 !important;\n}\n\n\n\na\n{\ncolor: #550000 !important;\ntext-decoration: underline !important;\n}\n\na:hover\n{\ncolor: #000000 !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

