// ==UserScript==
// @name          Kaskus FixUps
// @include       http://kaskus.co.id*
// @include       http://www.kaskus.co.id*
// @run-at        document-start
// @grant all
// ==/UserScript==

(function() {
var css = ".bottom-frame, .ads300, .skin, .l-link, .r-link, .banner-top-ads, .kasad-wrapper {\ndisplay: none !important; }\n\nimg[src^='http://kkcdn-static.kaskus.co.id/css_v0.1/img/plugin/'],\nimg[src^='http://kkcdn-static.kaskus.co.id/themes_2.0/images/seasonal/'] {\ndisplay: none !important; }\n\n\n\n\n\n#main > .row { \nwidth: 98% !important;\nmargin: 0 1% !important; }\n\n.hfeed .entry-footer {\nposition: static !important; }\n\n\n\n.user-content-wrapper > .row > .col.grid-4.right + .col.grid-3a + .col.grid-6u {\nmargin: -810px 330px 0 192px !important;\nwidth: auto !important;\n}\n\n.user-content-wrapper > .row > .col.grid-6u, .user-content-wrapper > .row > .col.grid-6u {\nmin-width: 320px !important;\n}\n\n.list-vm > .item > .m-meta:after {\ncontent: \"Lorem ipsum dolor sit amet. This is a placeholder text to maximize and widen the second column of kaskus home page to the max, so things won't really break. Lorem ipsum dolor sit amet. This is a placeholder text to maximize and widen the second column of kaskus home page to the max, so things won't really break. Lorem ipsum dolor sit amet. This is a placeholder text to maximize and widen the second column of kaskus home page to the max, so things won't really break\";\ncolor: rgba(0,0,0,0.02); }\n\n.list-vm > .item > .m-meta {\nheight: 18px !important;\noverflow: hidden !important; }\n\n\n\n.user-content-wrapper, #main > .row > .col {\nwidth: 100% !important;\nmargin: 0 !important;\nborder: none !important; }\n\n#main .col.grid-3a {\nwidth: auto !important; }\n\n#main .col.grid-13a {\nwidth: 79% !important;\n\nmargin: 10px !important;\nborder-top: 1px solid #ccc !important; }\n\n#user-profile-main {\nwidth: 100% !important; }\n\n\n\n#forum-listing > .row .col.grid-12 {\nwidth: 98% !important;\nmargin: 0 1% !important; }\n\n#forum-listing .author {\nwidth: 120px !important; }\n\n#forum-listing .entry {\nwidth: auto !important;\npadding: 1% 0 5% 1% !important;\nmargin-top: -1px !important; }\n\n.thread-navigate > .row > .col.grid-8,\n.footer > .row > .col.grid-8 {\nwidth: 20% !important;\nmin-width: 450px !important; }\n\n.thread-navigate > .row > .col.grid-4,\n.footer > .row > .col.grid-4 {\nwidth: 20% !important;\nmin-width: 162px !important; }\n\n.listing-wrapper .forum-control {\nwidth: 110% !important; }\n\n.forum-control .pagination {\nfloat: right !important; }\n\n\n\n#subforum .row .col.grid-12 {\nwidth: 98% !important;\nmargin: 0 1% !important; }\n\n.zebra .post-title {\nwidth: 100% !important; \nmax-width: 100% !important; }\n\n.footer .row .col.grid-8,\n#forum-listing > .row > .col.grid-12 > .header .thread-control .col.grid-8,\n#forum-listing > .row > .col.grid-12 > .header .thread-navigate .col.grid-8 {\nfloat: right !important; }\n\n\n\n.post .sub-meta {\npadding-bottom: 0 !important; }\n\n.post .act {\nfloat: right !important;\nmargin-top: -20px !important; }\n\n.replies > span > a.jump + i {\ndisplay: none !important; }\n\n.replies > span > a.jump ~ a.fn {\ndisplay: inline-block !important;\nmax-width: 81px !important;\nmax-height: 16px !important;\noverflow: hidden !important; }\n\n\n\n#fjb-listing-header {\nmargin-right: -34% !important;\nmargin-top: -22px !important;\nfloat: right !important;\nwidth: 135% !important; }\n\n.fjb #main > .row > .col.grid-12 > .main-content,\n.fjb-landing-wrapper {\nwidth: 940px !important;\nposition: relative !important;\nleft: 50% !important;\nmargin-left: -470px !important; }\n\n#site-fjb-categories > .row > .col.grid-12 {\nwidth: 98% !important; }\n\n#site-fjb-categories > .row > .col.grid-12 > .row > .col.grid-12 {\nwidth: 98% !important; }\n\n#fjb-listing-header {\nmargin-left: 20% !important; }\n\n#site-fjb-categories .row .col.grid-12 .row .col.grid-12 ~ .grid-4 {\nwidth: 31% !important; }\n\n\n\n.main-content + section {\nwidth: 940px !important;\nposition: relative !important;\nleft: 50% !important;\nmargin-left: -470px !important; }\n\n.main-content > .row > .col.grid-6:last-of-type {\nfloat: right !important; }\n\n#site-forum-categories > .row > .col.grid-12 {\nwidth: 98% !important; }\n\n#site-forum-categories > .row > .col.grid-12 > .row > .col.grid-12 {\nwidth: 98% !important; }\n\n#site-forum-categories .row .col.grid-12 .row .col.grid-12 ~ .grid-4 {\nwidth: 31% !important; }\n\n.forum-category-list > .row > .col.grid-12 > .row > .col.grid-4 {\nwidth: 31% !important; }\n\n.forum-category-list > .row > .col.grid-12 {\nwidth: 98% !important; }\n\n.forum-category-list > .row > .col.grid-12 > .row > .col.grid-8 {\nwidth: 60% !important; }\n\n.forum-category-list > .row > .col.grid-12 > .row > .col.grid-8 > .category-listting-bar-8 > .row > .col.grid-4 {\nwidth: 46% !important; }\n\n\n\npre > br {\ndisplay: none !important; }\n\n\n\nbr[style=\"display: block; margin-top: -12px;\"] {\nmargin: 0 !important; }";
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
	}
}
})();
