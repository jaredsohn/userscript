// ==UserScript==
// @name          	HKGalden Dark mode
// @description	  	a dark version of HKGalden
// @icon			http://tinyurl.com/kmcwcqc
// @version		  	1.7.9
// @author        	Khinchin and 80degreecpu
// @include       	https://hkgalden.com/*
// @include       	https://*.hkgalden.com/*
// @include       	http://hkgalden.com/*
// @include       	http://*.hkgalden.com/*
// @match         	*://hkgalden.com/*
// @match         	*://*.hkgalden.com/*
// @run-at 			document-end
// @license        	MIT License; http://opensource.org/licenses/mit-license.php
// @updateURL		https://userscripts.org/scripts/source/174920.meta.js
// @downloadURL		https://userscripts.org/scripts/source/174920.user.js
// ==/UserScript==
/*

The MIT License (MIT)

Copyright (c) 2014, Khinchin @ HKGalden.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/


(function() {
	 var css =  
		"*{ " +
		// " border-radius: 0 !important;" +
		" text-shadow: none !important;" +
		" box-shadow: none !important;" +
		" } " +
		" .tp-banner, #pagelm br, .label u:before, .label u:after, #tpli td.tpg .pg:hover span .pgt:before, #tpli td.tpg .pg:hover span .pgt, #tpli td.tpg .pg .pnum:before,.naseotn:before,.uxbk:hover small { " +
			" display: none !important;" +
		" } " + 
		" body, #main, #pagelm, #ratrap, .fryxb > span:only-child, .curpgind, #alertor {" +
			" background: none repeat scroll 0 0 #000000 !important; " +
		" } " +
		" #tpli tr.lt td, #tpli tr.dt td, table.gob, table.hkga-pagin, .cke_bottom, .cke_source, .cke_reset, table.hkga-stdpf td, table.hkga-stdpf th, #tpli td.tpg .pg:hover span,.prevcon, table#userPosts, table#userReply, .hgpf td {" +
			" background: none repeat scroll 0 0 #222222 !important; " +
		" } " +
		" #tpli td, #tpli th, .laime, table.sectab tr td b.hig, .naseobtn-wrap, #hkga-pftb.nxt, .nxt {" +
			" background: none repeat scroll 0 0 #333333 !important; " +
		" } " +
		" table.sectab tr td button, .label u.lv1, .hkga-pagin td.opt select, .cke_inner, .cke_top, table.hkga-stdpf, #tpli td.tpg .pg:hover span a:hover, .gpt .l, .gpt .r, .gpt .r .bab, #ratrap {" +
			" background: none repeat scroll 0 0 #444444 !important; " +
		" } " +
		" #tpli td.tic:before, table.usrtrace th, #trackpg, .hgpf th, .hidden { " +
			" background: none repeat scroll 0 0 #555555 !important; " +
		" } " +
		" #EmotionTray, #tpli td.tpg .pg:hover span a,#EmotionTray a img {" +
			" background: none repeat scroll 0 0 #222222 !important; " + 
		" } " +
		" #tpli td.tic.ht:before { " +
			" background: none repeat scroll 0 0 #AAAAAA !important; " +
		" } " +
		" body.cke_ltr { " +
			" background: none repeat scroll 0 0 #FFFFFF !important; " + 
		" } " +
		" a, body, .cke_source, #gb, #pagelm, .label u.lv1, #tpli th, .prevcon a ,.prevcon{ " +
			" color: #19b964 !important; " + 
		" } " +
		" div.col-lg-9.col-sm-12 { " +
			" width: 100% !important; " +
		" } " +
		" div.col-xs-6.col-lg-3.sidebar-offcanvas { " +
			" display: none !important; " +
		" } " +
		" div.page-header { " +
			" color: #FFFFFF !important; " +
		" } " +
		" table.nxt.ihodr td, .nxtb, .nxtb a, .nxt { " +
			" background-color: #333333 !important; " +
			" color: #CCCCCC !important; " +
		" } " +
		// " #gb a, a.newt-btn, input.lighearox.smt, .naseotn, .uxbk { " +
			// " color: #FFFFFF !important; " +
		// " } " +
		" table.gob.topic, table.sectab tr td button, table.sectab tr td b.hig, .gpt .r blockquote, #tpli td.tic, #tpli td span.lrt-t, #tpli td.trc, .hkga-pagin td.opt select, #tpli td.qrw, #tpli td.tpg .pg, #tpli td.tpg .pg > a  { " +
			" color: #BBBBBB !important; " +
		" } " +
		" table.sectab tr td, table.usrinfo th, .gpt .r .ctn, .lighearox, #GoodRate, #BadRate { " +
			" color: #CCCCCC !important; " +
		" } " +
		" table.sectab td span.tiny, .curpgind, #alertor, .fast_quote, .blkusr { " +
			" color: #999999 !important; " +
		" } " +
		" b.bro, b.bro a { " +
			" color: #0093EE !important; " +
		" } " +
		" b.sis, b.sis a { " +
			" color: #FF4476 !important; " + 
		" } " +
		".cke_panel_list a, .cke_panel_block a{ " +
			" color: #000000 !important; " +
		" } " +
		" #tpli td.tnm a:visited, td.rbk a:visited, #tpli td.tpg a:visited { " +
			"color: #C675EC !important; " +
		" } " +
		" #ratrap { " +
			" border-color: #666666 !important;" +
		" } " +
		" .naseobtn-wrap, .cke_bottom, .cke_top, .cke_chrome, .laime,#tpli td.tpg .pg:hover span,#EmotionTray.fxb,table.gob, .curpgind, #alertor  { " +
			" border-color: #333333 !important; " +
		" } " +
		" #tpli td, table.sectab tr td button, table.sectab tr td b.hig, table.hkga-pagin, .hkga-pagin td.opt select, table.nxt.ihodr td { " +
			" border-color: #444444 !important; " +
		" } " +
		" #tpli td.tlt, th.tlt, #tpli td.qrw { " +
			" font-size: 0.8em !important; " + 
		" } " + 
		"#main,.cke_bottom, .cke_top, table.hkga-stdpf,#tpli td.tpg .pg:hover span a,#EmotionTray.fxa,#EmotionTray a img  { " +
			" border: medium none !important; " +
		" } " +
		" #main {" +
			" margin: 0 !important; " +
			" width: 100% !important; " +
			" padding: 42px 0 !important; " +
		" } " +
		" td.lbk { " +
			" border-right-color: #333333 !important; " +
		" } " + 
		" .mnuhodr { " +
			" width: auto !important; " +
		" } " +
		".laime { " +
			" text-shadow: 1px 1px 1px #000000 !important; " +
		" } " +
		" #tpli td.tpg .pg:hover span { " +
			" height: auto !important; " +
			" margin: 0px 0 0 0px !important; " +
			" width: 256px !important; " +
		" } " +
		"#tpli td.tpg .pg:hover span a { " +
			" display: block !important; " +
			" height: 32px !important; " +
			" line-height: 32px !important; " +
			" margin: 0 !important; " +
			" padding: 0 !important; " +
			" text-align: center !important; " +
			" width: 12.5% !important; " +
		" } " +
		" #tpli td.tpg .pg:before { " +
			" border-bottom-color: #555555 !important; " +
			" border-right-color: #555555 !important; " + 
		" } " +
		" #tpli td.tpg .pg .pnum { " +
			" margin: 0 !important; " +
		" } " +
		" #tpli td.tpg { " +
			" width: 5% !important; " +
		" } " +
		" #tpli td.tic:before { " +
			" border-radius: 99px; " +
			" box-shadow: 0 0 2px #222222 inset; " +
			//' content: \"\"; ' +
			" display: inline-block;" +
			" height: 5px; " +
			" width: 5px; " +
			" vertical-align:middle; " +
		" } " +
		" .naseotn { " +
			" cursor: pointer; " +
		" } " +
		" .fbt { " +
			" background-color: #666666 !important; " +
			" color: #19b964 !important; " +
		" } " +
		" #flyrpy.fbt.fcs { " +
			" max-width: 60% !important; " +
		" } " +
		" #gb { " +
			" background-color: #282828 !important; " +
			// " position: fixed !important; " +
			" line-height: 36px !important; " +
			" height: 36px !important; " +
			" z-index: 3 !important; " +
			" padding: 0 !important; " +
			//" overflow: hidden !important; " +
			" vertical-align: top !important; " +
			//" display: block !important; " +
		" } " +
		" #gb a{ " +
			" line-height: 36px !important; " +
			" height: 36px !important; " +
			//" display: inline-block !important; " +
			" padding: 0 5px !important; " +
			" margin: 0 !important; " +
		" } " +
		" #gb a:hover{ " +
			" background: rgba(255,255,255,0.2) !important; " +
		" } " +
		" #tpli td.tpg .pg:hover span { " +
			" z-index: 2 !important; " +
		" } " +
		" .uxbk{ " +
			" padding: 2% !important; " +
			" margin: 0 !important; " +
			//" border: #000 solid 5px !important; " +
			" border-width: 0 0.5% 1% !important; " +
			" width: 19% !important; " +
			" max-width: 200px !important; " +
			" transition: opacity 0.2s linear; " +
		" } " +
		".uxbk:hover{ " +
			" opacity: 1 !important;" + 
		" } " +
		"#uxli:hover .uxbk { " +
			"opacity: 0.5; " +
		" } " +
		".uxbk small{ " +
			" right: 2% !important; " +
			" bottom: 2% !important; " +
		" } " +
		".uxbk:hover:before{ " +
			" position: absolute; " +
			' content: \"\";' +
			" display: block; " +
			" border: 12px solid transparent; " +
			" width:0; " +
			" height:0; " +
			" border-left-color: rgba(255,255,255,0.5); " +
			" right: 2%; " +
			" top: 50%; " +
			" margin-top: -12px; " +
			" overflow: hidden; " +
		" } " +
		" ::selection { " +
			" color:#FFF; " +
			" background:#1C83F2; " +
		" } " +
		" ::-moz-selection { " +
			" color:#FFF; " +	
			" background:#1C83F2; "+
			" } ";
	
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
			document.documentElement.appendChild(node);
		}
	}
})();