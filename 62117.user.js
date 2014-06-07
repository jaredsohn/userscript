// ==UserScript==
// @name          deviantART Member's Shoutbox V6.1
// @description	  A style/skin for Subscribed Shoutbox on deviantART.com
// @author        http://AimanStudio.deviantART.com/
// @include       http://deviantart.com/*
// @include       https://deviantart.com/*
// @include       http://*.deviantart.com/*
// @include       https://*.deviantart.com/*
// @exclude       http://chat.deviantart.com/
// @exclude       http://chat.deviantart.com/*
// ==/UserScript==
(function() {
var css = "#deviant .shouts {\n	position: relative !important;\n	padding: 10px 2px 0px 2px !important;\n}\n#deviant .shouts .f {\n	margin-left: 0px !important;\n	top: 0px !important;\n	padding-top: 5px !important;\n	cursor:default  !important;\n}\n\n\n	dl.shouts dt.f{\n	position: relative !important;\n	min-height:25px !important;\n	top: -10px !important;\n	left: 0px !important;\n	padding: 0 0 0 38px !important;\n	border-top: 1px solid #BFCEC3 !important;\n	border-left: 1px solid #BFCEC3 !important;\n	border-right: 1px solid #BFCEC3 !important;\n	-moz-border-radius: 8px 8px 0 0;\n	background:#e7efe6 url(http://i40.tinypic.com/11bn9tt.gif) repeat-x !important;\n	\n}\n.shouts dd.f{\n	position: relative !important;\n	padding-bottom:5px !important;\n	padding-right:5px !important;\n	font-weight:normal !important;\n	font-size: 9pt !important;\n	padding-left: 40px !important;\n	border-bottom: 1px solid #BFCEC3 !important;\n	border-left: 1px solid #BFCEC3 !important;\n	border-right: 1px solid #BFCEC3 !important;\n	margin:0 auto 4px auto !important;\n	-moz-border-radius: 0 0 8px 8px;\n	background:#e7efe6  !important;\n}\n\n\ndl.shouts dt.f img.avatar {\n	position: absolute !important;\n	top: 6px !important;\n	left: 8px !important;\n	width:25px !important;\n	height: 25px !important;\n}\n\n\n	#deviant .shouts .f a.a.u {\n	color: #196BA7 !important;\n	text-decoration: none !important;\n	font-size: 9pt !important;\n	font-weight:bold;\n}\n\n\n	#deviant .shouts .f a:hover.a.u {\n	text-decoration: underline !important;\n}\n\n\n	div.timestamp, em.shortcut{\n	position: absolute !important;\n	top: -25px !important;\n	right:5px;\n	font-weight:normal !important;\n	font-size: 7pt !important;\n	color: #959F98;\n}\n\n\n	#deviant .altview dl.shouts{\n	top:0px;\n	margin-bottom:0px !important;\n	background:#B2C3B0 url(http://st.deviantart.com/styles/minimal/minish/bg-fade2.gif) repeat-x  !important;\n	border: 1px solid #9EB1A2  !important;\n	height:50px;\n	-moz-border-radius: 8px;\n}\n#deviant .altview dl.shouts dt.f {\n	background:none !important;\n\n\n	padding:0 0 0 23px !important;\n	border:0 !important;\n	margin-top: 10px !important;\n	top:-12px  !important;\n}\n\n#deviant .altview dl.shouts dt.f img.avatar {\n	top: 0px !important;\n	left: 5px !important;\n	width:15px !important;\n	height: 15px !important;\n}\n#deviant .altview dl.shouts dt.f a.u,\n#deviant .altview dl.shouts dt.f {\n	color: #39473F !important;\n	font-size:8.25pt  !important;\n	font-weight:normal  !important;\n}\n#deviant .altview dl.shouts dd.f {\n	border:0 !important;\n}\n#deviant .altview dl.shouts dd.f {\n	border:0 !important;\n	top:-4px !important;\n}\n#deviant .altview {\n	border: 0  !important;\n	background:none !important;\n	margin:0px  !important;\n	height:60px !important;\n	top:0px  !important;\n}\n#deviant .altview dl.shouts dd.f {\n	padding:0 !important;\n	background:none  !important;\n	margin :-13px 0 0 3px  !important;\n}\n\n\n#deviant .altview dl.shouts:hover{\n	background:#bdcbbb url(http://i40.tinypic.com/2e64raa.gif) repeat-x  !important;\n}\n#deviant .altview dl.shouts:hover dd.f{\n	background:none  !important;\n}";
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
