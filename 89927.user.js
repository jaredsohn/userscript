// ==UserScript==
// @name          MFG Skin
// @namespace     http://userstyles.org
// @description	  The MFG
// @author        Linnit
// @homepage      -
// @include       http://themfg.co.uk/*
// @include       https://themfg.co.uk/*
// @include       http://*.themfg.co.uk/*
// @include       https://*.themfg.co.uk/*
// ==/UserScript==
(function() {
var css = "* {\nfont-family:\"Mona\", sans-serif !important;\nfont-size:18px !important;\n-moz-appearance: none !important\n}\n\nbody {\n\n}\n\n.delform {\ncolor:rgb(0,0,150) !important;\n}\n\n.pages {\nbackground-color:transparent !important;\n}\n\nspan.plus {\ncolor:rgb(0,0,150) !important;\n}\n\n.hr {\ncolor:rgb(70,0,70) !important;\n}\n\n.omittedposts{\ncolor:rgb(150,0,255) !important;\n}\n\nblockquote {\ncolor:rgb(70,0,70) !important;\n}\n\ntable {\ncolor:rgb(70,0,70) !important;\n}\n\n.filetitle {\ncolor:rgb(70,0,70) !important;\n}\n\ntextarea{\nheight:8em !important;\nwidth:22em !important;\n}\n\nimg.thumb,img[src*=\"/thumb/\"] {\nbackground:transparent !important;\nborder:solid 7px rgb(0,0,150) !important;\n-moz-border-radius:10px !important;\nopacity:.85 !important;\nz-index:3 !important;\n}\n\nhtml,body {\nfont-size:20px !important;\nbackground-color:#CBDDF1 !important;\nbackground-image:url('http://pictures.mastermarf.com/blog/2009/090514-boxxy-poster.png') !important;\nbackground-repeat:no-repeat !important;\nbackground-attachment:fixed !important;\n}\n\n.replymode {\nbackground-color:transparent !important;\ncolor:#000000 !important;\n}\n\n\nth {\nbackground-color:rgb(0,0,200) !important;\nopacity:0 !important;\n-moz-border-radius:10px !important;\n}\n\ntr {\nbackground-color:transparent !important;\ncolor:rgb(0,0,0) !important;\n}\n\n.unkfunc{\ncolor:rgb(190,70,70) !important;\n}\n\n\n\n\n#bod1 {\nbackground-color:transparent !important;\n}\n\n\ntd imput, td textarea{\n-moz-border-radius:10px !important;\n}\n\n[class*=\"postername\"] {\nbackground-color:transparent !important; \ncolor:rgb(165,20,165) !important\n}\n\n[class*=\"postertrip\"] {\ncolor:rgb(190,50,50) !important\n}\n\ndiv {\ncolor:rgb(70,0,70) !important;\n}\n\n\n\ninput[type=\"file\"] {\nbackground-color:transparent !important;\n}\n\n\n.postarea .postblock{\n-moz-border-radius:15px  !important;\nmargin-right:-1px !important;\npadding:0 3px !important;\nborder:solid 0px #555 !important;\nopacity:.65 !important;\nborder-right-style: dashed !important;\nborder:solid 2px rgb(100,100,100) !important;\ntext-align:center !important;\nbackground-color:rgb(190,190,255) !important\n}\n\n\n\ndiv.logo img{display:none !important;}\n\niframe{display:none !important;}\n\n\n\nhr{display:none !important;}\n\nform hr{display:block !important;}\n\nhr{height:0px !important;border:none !important;background:#999 !important;}\n\n\n\n\ntd.replyhl, td.reply{-moz-border-radius:37px !important;opacity:.70 !important;background-color:rgb(240,217,255) !important;color:rgb(70,0,70) !important;\nborder:solid 2.5px rgb(100,90,190) !important\n}\n\n\n\n\n\na{text-decoration:none !important;color:rgb(0,0,150) !important;}\n\na.quotejs:hover, a:hover{font-weight:bold !important;color:rgb(0,0,150) !important;}\n\n\n\n\n\ntable,td{border:none !important;}\n\ntd.rules{display:none !important;}\n\n\n\n\n\nimg + br {display:none !important;}\n\n\n\n\n\n\nimg[md5] {\n\nheight: auto !important;\n\nwidth: auto !important;\n\n}";
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
