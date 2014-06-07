// ==UserScript==
// @name          Toodledo Dark Theme
// @namespace     http://userstyles.org
// @description	  This is my first crack at a stylish theme. It is based off of a gmail theme. There is tons more room for improvement, so let me know if you have any trouble
// @author        Vin Thomas
// @homepage      http://userstyles.org/styles/18480
// @include       http://toodledo.com/*
// @include       https://toodledo.com/*
// @include       http://*.toodledo.com/*
// @include       https://*.toodledo.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); a { color: #5797B0 !important; text-decoration: none !important; } a:hover { color: #3d6b7d !important; text-decoration: none !important; } #action_addtask { background:#f3f3f3 url(http://dl.getdropbox.com/u/417524/TD/buttonbg.jpg) repeat scroll right top !important; border:1px solid #999 !important; border-top: 1px solid #fff !important; margin: -10px 0 0 0 !important; padding:5px !important; } body { background: #1A2022 !important; } #brg {color: #333 !important; padding: 10px !important; background: #d7f7d3 !important; } .connectbox { color: #333 !important; } #colhead, #colheadrow { border-bottom:1px solid #333 !important; padding: 3px 0 !important; } #colhead div { height: 15px !important; } h1, h2 { color: #999 !important; } #head { background-color:#CFDFE5 !important; border: solid 1px #333 !important; } #logo { display: none !important; } #main { background:#FFFFFF none repeat scroll 0 0 !important; border:5px solid #525151 !important; margin: 10px 10px 10px 0px !important; padding: 10px !important; color: #333 !important; -webkit-border-radius: 6px; -khtml-border-radius: 6px; -moz-border-radius: 6px; border-radius: 6px; } .row { border-bottom: 1px solid #eee !important; padding:3px 0 2px !important; } .sep { background: #CCCCFF url(http://dl.getdropbox.com/u/417524/TD/buttonbg.jpg) repeat scroll right top !important; } .sptoc { margin-bottom: 3px !important; } .subtasks .row { border-top: 1px solid #eee !important; border-bottom: none !important; } .tab { padding: 6px 5px 8px 4px!important; background: #f3f3f3 url(http://dl.getdropbox.com/u/417524/TD/buttonbg.jpg) repeat scroll right top !important; margin: 0 2px 0 0 !important; height: 11px !important; border: solid 1px #ddd !important; } #tasks, #colhead, #colheadnew { background: #fff !important; } .tabon { background: #CFDFE5 !important; border-bottom: solid 1px #CFDFE5 !important; height: 14px !important; padding: 7px 5px !important; margin: 0 2px 0 0 !important; border-right: solid 1px #333 !important; border-left: solid 1px #333 !important; border-top: solid 1px #333 !important; } #tabs { height: 28px !important; border-left: none !important; } .ticed { background: transparent url(http://dl.getdropbox.com/u/417524/TD/tic.gif) no-repeat scroll right -12px !important; } .tic { background: transparent url(http://dl.getdropbox.com/u/417524/TD/tic.gif) no-repeat scroll right 4px !important; } .tl { display: none !important; } #toc { color: #eee !important; margin-top: -8px !important;} #tocc { top: 73px !important; left: 127px !important; } #toco { top: 61px !important; left: 7px !important; } #toc a { color: #5797B0 !important; } #toc a:hover { color: #9dcfe3 !important; } #toc a.tocex:hover { color: #9dcfe3 !important; } #toc .bottom a:hover { color: #9dcfe3 !important; } #toolbar { background-color: #f3f3f3 !important; padding: 3px 5px !important; border: 1px solid #333 !important; color: #333 !important; } #viewby { color: #333 !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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
