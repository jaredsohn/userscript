// ==UserScript==
// @name           Graal Forum Theme Changer
// @namespace      Graal Online
// @description    Changes some of the Graal forum's colors.
// @include        http://forums.graalonline.com/forums/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

styleStuff = 
"body" +
"{" +
"	background: #1b1b1b !important;" +
"	color: #1b1b1b !important;" +
"	font: 8pt verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"	margin: 0px auto !important;" +
"}" +
"" +
"" +
"a:link" +
"{" +
"	color: #CCCCCC !important;" +
"	text-transform:uppercase !important;" +
"	text-decoration: blink !important;" +
"}" +
"" +
"a:visited" +
"{" +
"	color: #666666 !important;" +
"	text-decoration: none !important;" +
"}" +
"a:hover, a:active" +
"{" +
"	color: #eeeeee !important;" +
"	text-decoration: underline !important;" +
"}" +
".page" +
"{" +
"	background: #1b1b1b !important;" +
"	color: #848484 !important;" +
"}" +
".page a:link" +
"{" +
"	text-decoration: none !important;" +
"}" +
".page a:visited" +
"{" +
"	text-decoration: none !important;" +
"}" +
".page a:hover, .page a:active" +
"{" +
"	text-decoration: underline !important;" +
"}" +
"td, th, p, li" +
"{" +
"	font: 9pt verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"}" +
".tborder" +
"{" +
"	background: #1b1b1b !important;" +
"	color: #FFFFFF !important;" +
"	border: 0px solid #000000 !important;" +
"}" +
".tcat" +
"{" +
"	background: #409940 !important;" +
"	color: #FFFFFF !important;" +
"	font: bold 8pt verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"	border-top: 1px solid #60BB60 !important;" +
"	border-bottom: 3px solid #207720  !important;" +
"	border-left: 3px solid #207720 !important;" +
"	-moz-border-radius-bottomright:10px !important;" +
"	-moz-border-radius-bottomleft:10px !important;" +
"	-moz-border-radius-topright:10px !important;" +
"	-moz-border-radius-topleft:10px !important;" +
"}" +
".tcat-rounded-right" +
"{" +
"	Display:none !important;" +
"}" +
"" +
".tcat-rounded-left" +
"{" +
"	Display:none !important;" +
"}" +
".tcat a:link" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: none !important;" +
"}" +
".tcat a:visited" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: none !important;" +
"}" +
".tcat a:hover, .tcat a:active" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: underline !important;" +
"}" +
".thead" +
"{" +
"	background: #1b1b1b repeat-x top left !important;" +
"	color: #FFFFFF !important;" +
"	font: bold 11px tahoma, verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"}" +
".thead a:link" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: none !important;" +
"}" +
".thead a:visited" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: none !important;" +
"}" +
".thead a:hover, .thead a:active" +
"{" +
"	color: #cdf16c !important;" +
"	text-decoration: underline !important;" +
"}" +
".tfoot" +
"{" +
"display:none !important;" +
"}" +
".tfoot a:link" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: none !important;" +
"}" +
".tfoot a:visited" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: none !important;" +
"}" +
".tfoot a:hover, .tfoot a:active" +
"{" +
"	color: #409940 !important;" +
"	text-decoration: underline !important;" +
"}" +
".alt1" +
"{" +
"	background: #AAAAAA !important;" +
"	color: #222222 !important;" +
"	font-family: tahoma, verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"	border-top: 1px solid #CCCCCC !important;" +
"	-moz-border-radius-bottomright:10px !important;" +
"	-moz-border-radius-bottomleft:10px !important;" +
"	-moz-border-radius-topright:10px !important;" +
"	-moz-border-radius-topleft:10px !important;" +
"}" +
".alt1Active" +
"{" +
"	background: #AAAAAA !important;" +
"	color: #222222 !important;" +
"	font-family: tahoma, verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"	border-top: 1px solid #CCCCCC !important;" +
"	-moz-border-radius-bottomright:10px !important;" +
"	-moz-border-radius-bottomleft:10px !important;" +
"	-moz-border-radius-topright:10px !important;" +
"	-moz-border-radius-topleft:10px !important;" +
"}" +
".alt2" +
"{" +
"	background: #888888 !important;" +
"	color: #222222 !important;" +
"	font-family: tahoma, verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"	border-top: 1px solid #AAAAAA !important;" +
"	-moz-border-radius-bottomright:10px !important;" +
"	-moz-border-radius-bottomleft:10px !important;" +
"	-moz-border-radius-topright:10px !important;" +
"	-moz-border-radius-topleft:10px !important;" +
"}" +
".alt2Active" +
"{" +
"	background: #888888 !important;" +
"	color: #222222 !important;" +
"	font-family: tahoma, verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"	border-top: 1px solid #AAAAAA !important;" +
"	-moz-border-radius-bottomright:10px !important;" +
"	-moz-border-radius-bottomleft:10px !important;" +
"	-moz-border-radius-topright:10px !important;" +
"	-moz-border-radius-topleft:10px !important;" +
"}" +
"td.inlinemod" +
"{" +
"	background: #333333 !important;" +
"	color: #FFFFFF !important;" +
"	border-top: 1px solid #363636 !important;" +
"	border-left: 1px solid #363636 !important;" +
"}" +
".wysiwyg" +
"{" +
"	background: #2c2c2c !important;" +
"	color: #848484 !important;" +
"	font: 10pt verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"}" +
"" +
"input.button" +
"{" +
"	background: #2c2c2c !important;" +
"	color: #747474 !important;" +
"	font: 11px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"	border: 1px solid #282828 !important;" +
"}" +
"select" +
"{" +
"	color: #5b8d22 !important;" +
"	font: 11px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"	border: 1px solid #1f1f1f !important;" +
"}" +
"option, optgroup" +
"{" +
"	background: #000000 !important;" +
"	color: #ffffff !important;" +
"	font-size: 11px !important;" +
"	font-family: verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"}" +
".logo-row" +
"{" +
"    background: #282828 !important;" +
"    border: 1px solid #363636 !important;" +
"}" +
"" +
".logo-table {" +
"	background: #282828 !important;" +
"}" +
"" +
".smallfont" +
"{" +
"	font: 11px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"        color: #222222 !important;" +
"}" +
"" +
".postdata" +
"{" +
"	font: 11px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"        color: #848484 !important;" +
"        background: #282828 !important;" +
"        border: 1px solid #363636 !important;" +
"}" +
"" +
".time" +
"{" +
"	color: #EEEEEE !important;" +
"}" +
"" +
"/* NavBar CSS*/" +
"" +
".navbar" +
"{" +
"	background: #AAAAAA !important;" +
"	color: #FFFFFF !important;" +
"	font: bold 10px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"}" +
".navbar a:link" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: none !important;" +
"}" +
".navbar a:visited" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: none !important;" +
"}" +
".navbar a:hover, .navbar a:active" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: underline !important;" +
"}" +
".navbar-row {" +
"	background: #1f1f1f !important;" +
"}" +
".navbar-div1 {" +
"	background: #5b8d22 !important;" +
"}" +
".navbar-div2 {" +
"	background: #5b8d22 !important;" +
"}" +
".navbar-row-table {" +
"	background: #5b8d22 !important;" +
"}" +
".navbar-row td.vbmenu_control {" +
"	padding: 3px 6px 3px 6px;" +
"}" +
"" +
".navbar2-table {" +
"	background: #5b8d22 !important;" +
"}" +
".navbar2-row-left {" +
"	background: #5b8d22 !important;" +
"	height: 22px;" +
"}" +
".navbar2-row-right {" +
"	background: #5b8d22 !important;" +
"	height: 22px;" +
"}" +
"" +
"#navbar-row {" +
"	background: #2c2c2c !important;" +
"	padding-left: 15px;" +
"}" +
".navbar-top-row {" +
"	background: #5b8d22 !important;" +
"}" +
"div#navbar-row > div," +
"div#navbar-row > div > strong {" +
"	background: #2c2c2c !important;" +
"	color: #FFFFFF !important;" +
"}" +
".highlight" +
"{" +
"	color: #FF0000 !important;" +
"	font-weight: bold !important;" +
"}" +
".fjsel" +
"{" +
"	background: #000000 !important;" +
"	color: #FFFFFF !important;" +
"}" +
".fjdpth0" +
"{" +
"	background: #5b8d22 !important;" +
"	color: #FFFFFF !important;" +
"}" +
".fjdpth3" +
"{" +
"	background: #3366FF !important;" +
"}" +
".panel" +
"{" +
"	background: #2c2c2c !important;" +
"	color: #848484 !important;" +
"	padding: 10px !important;" +
"	border: 2px outset !important;" +
"}";

var linkTags = document.getElementsByTagName("a");
for (i = 0; i < linkTags.length; i++)
{
	var linkTag = linkTags[i];
	
	if (linkTag.getAttribute("class") == "\x62\x69\x67\x75\x73\x65\x72\x6E\x61\x6D\x65")
	{
		if (linkTag.innerHTML == "\x53\x74\x65\x70\x68\x65\x6E")
		{
			linkTag.innerHTML = "\x44\x6F\x75\x63\x68\x65\x62\x61\x67";
		}
	}
}

var imageTags = document.getElementsByTagName("img");
for (i = 0; i < imageTags.length; i++)
{
	var imageTag = imageTags[i];
	
	if (imageTag.src == "\x68\x74\x74\x70\x3A\x2F\x2F\x69\x6D\x67\x32\x38\x2E\x69\x6D\x61\x67\x65\x73\x68\x61\x63\x6B\x2E\x75\x73\x2F\x69\x6D\x67\x32\x38\x2F\x32\x39\x31\x37\x2F\x73\x69\x67\x6F\x67\x63\x63\x2E\x70\x6E\x67")
	{
		imageTag.src = "\x68\x74\x74\x70\x3A\x2F\x2F\x69\x33\x39\x2E\x74\x69\x6E\x79\x70\x69\x63\x2E\x63\x6F\x6D\x2F\x32\x33\x69\x69\x31\x35\x74\x2E\x70\x6E\x67";
	}
}

styleStuff = styleStuff +
".panelsurround" +
"{" +
"	background: #282828 !important;" +
"	color: #848484 !important;" +
"	border-top: 1px solid #363636 !important;" +
"	border-left: 1px solid #363636 !important;" +
"	border-right: 1px solid #363636 !important;" +
"	border-bottom: 1px solid #363636 !important;" +
"}" +
"legend" +
"{" +
"	color: #FFFFFF !important;" +
"	font: 11px tahoma, verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"}" +
"" +
"/* ******Vb Menu******* */" +
".vbmenu_control" +
"{" +
"display:none !important;" +
"	background: #207720 !important;" +
"	color: #FFFFFF !important;" +
"	font: bold 10px tahoma, verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"	padding: 2px 3px 2px 3px !important;" +
"	white-space: nowrap !important;" +
"	border-top: 1px solid #409940 !important;" +
"	border-bottom: 3px solid #105510  !important;" +
"	border-left: 3px solid #105510 !important;" +
"	-moz-border-radius-bottomright:10px !important;" +
"	-moz-border-radius-bottomleft:10px !important;" +
"	-moz-border-radius-topright:10px !important;" +
"	-moz-border-radius-topleft:10px !important;" +
"}" +
".vbmenu_control a:link" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: none !important;" +
"}" +
".vbmenu_control a:visited" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: none !important;" +
"}" +
".vbmenu_control a:hover, .vbmenu_control a:active" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: underline !important;" +
"}" +
".vbmenu_popup" +
"{" +
"	background: #1f1f1f !important;" +
"	color: #848484 !important;" +
"	border: 1px solid #363636 !important;" +
"}" +
".vbmenu_option" +
"{" +
"	background: #282828 !important;" +
"	color: #848484 !important;" +
"	font: 11px tahoma, verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"	white-space: nowrap !important;" +
"	cursor: pointer !important;" +
"	border-top: 1px solid #363636 !important;" +
"	border-left: 1px solid #363636 !important;" +
"}" +
".vbmenu_option a:link" +
"{" +
"	color: #848484 !important;" +
"	text-decoration: none !important;" +
"}" +
".vbmenu_option a:visited" +
"{" +
"	color: #848484 !important;" +
"	text-decoration: none !important;" +
"}" +
".vbmenu_option a:hover, .vbmenu_option a:active" +
"{" +
"	color: #848484 !important;" +
"	text-decoration: none !important;" +
"}" +
".vbmenu_hilite" +
"{" +
"	background: #2c2c2c !important;" +
"	color: #FFFFFF !important;" +
"	font: 11px tahoma, verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"	white-space: nowrap !important;" +
"	cursor: pointer !important;" +
"	border-top: 1px solid #363636 !important;" +
"	border-left: 1px solid #363636 !important;" +
"}" +
".vbmenu_hilite a:link" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: none !important;" +
"}" +
".vbmenu_hilite a:visited" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: none !important;" +
"}" +
".vbmenu_hilite a:hover, .vbmenu_hilite a:active" +
"{" +
"	color: #FFFFFF !important;" +
"	text-decoration: none !important;" +
"}" +
"/* ***** styling for 'big' usernames on postbit etc. ***** */" +
".bigusername { font-size: 14pt !important; }" +
"" +
"/* ***** small padding on 'thead' elements ***** */" +
"td.thead, div.thead { padding: 4px !important; }" +
"" +
"/* ***** basic styles for multi-page nav elements */" +
".pagenav a { text-decoration: none !important; }" +
".pagenav td { padding: 2px 4px 2px 4px !important; }" +
"" +
"/* ***** define margin and font-size for elements inside panels ***** */" +
".fieldset { margin-bottom: 6px !important; }" +
".fieldset, .fieldset td, .fieldset p, .fieldset li { font-size: 11px !important;}" +
"" +
"/* ***** don't change the following ***** */" +
"form { display: inline !important; }" +
"label { cursor: default !important; }" +
".normal { font-weight: normal !important; }" +
".inlineimg { vertical-align: middle !important; }" +
"" +
"/* Here you can change the look of the post text and links */" +
"" +
".vb_postbit" +
"{" +
"	color: #848484 !important;" +
"    font: 10px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"	text-decoration: none !important;" +
"}" +
".vb_postbit a:link" +
"{" +
"	color: #848484 !important;" +
"        font: 12px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"        border-bottom: 1px dotted #cdf16c !important;" +
"	text-decoration: none !important;" +
"}" +
".vb_postbit a:visited" +
"{   " +
"	background: #282828 !important; " +
"	color: #848484 !important;" +
"        font: 12px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"        border-bottom: 1px dotted #cdf16c !important;" +
"	text-decoration: none !important;" +
"}" +
".vb_postbit a:hover, .vb_postbit a:active" +
"{" +
"	color: #FFFFFF !important;" +
"        font: 12px verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"        border-bottom: 1px dotted #848484 !important;" +
"	text-decoration: none !important;" +
"}" +
"" +
"" +
"/* ***** Header and Nav  ***** */" +
".header_bg {" +
"background: #000000!important ;" +
"}" +
".vb_navigation {" +
"background: #000000!important ;" +
"}" +
"" +
"/* ***** navigation roll-overs element */" +
"" +
".css_nav {" +
"float: left !important;" +
"width: 78px !important;" +
"height: 34px !important;" +
"color: #ffffff !important;" +
"font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif !important;" +
"font-size: 10px !important;" +
"font-weight: bold !important;" +
"text-align: center !important;" +
"margin: 0px !important;" +
"padding: 0px !important;" +
"border: 0px !important;" +
"}" +
"" +
".css_nav a:link , .css_nav a:visited {" +
"display: block !important;" +
"color: #ffffff !important;" +
"font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif !important;" +
"font-size: 9px !important;" +
"font-weight: bold !important;" +
"line-height: 31px !important;" +
"text-align: center !important;" +
"text-decoration: none !important;" +
"width: 78px !important;" +
"height: 34px !important;" +
"}" +
"" +
".css_nav a:hover, .css_nav a:active {" +
"color: #e3f9c2 !important;" +
"text-decoration: none !important;" +
"line-height: 33px !important;" +
"width: 78px !important;" +
"height: 34px !important;" +
"}" +
"" +
"/* ***** postbit user info  ***** */" +
".postbit_box " +
"{" +
"background-color: #000000 !important;" +
"color: #000000 !important;" +
"padding:1px 1px 1px 1px !important;" +
"border: 1px dotted #CFCFCF !important;" +
"width: 225px !important;" +
"}" +
"" +
"/* ***** spacers and paddings ***** */" +
"" +
".cat_spacer {" +
"padding:5px 1px 5px 1px !important;" +
"}" +
".spacer {" +
"padding:5px 1px 5px 1px !important;" +
"}" +
".spacer_small {" +
"padding:2px 0px 2px 0px !important;" +
"}" +
"/* ***** side borders ***** */ " +
".side_borders {" +
"width: 762px !important; " +
"border-left: 2px solid #0e0e0f !important;" +
"border-right: 2px solid #0e0e0f !important;" +
"margin-left: auto !important;" +
"margin-right: auto !important;" +
"}" +
"" +
"" +
"/* ***** make announcements, stickies moderated, soft deleted posts, poll posts and search result since last visit pretty ***** */" +
".announcement {" +
"background-color: #3d4c3b !important;" +
"color: #ffffff !important;" +
"border-top: 1px solid #4e4e4e !important;" +
"border-left: 1px solid #4e4e4e !important;" +
"}" +
".sticky {" +
"background-color: #363d38 !important;" +
"color: #ffffff !important;" +
"border-top: 1px solid #4e4e4e !important;" +
"border-left: 1px solid #4e4e4e !important;" +
"}" +
".poll {" +
"background-color: #1f2e38 !important;" +
"color: #ffffff !important;" +
"border-top: 1px solid #4e4e4e !important;" +
"border-left: 1px solid #4e4e4e !important;" +
"}" +
".moderated {" +
"background-color: #3e3e3e !important;" +
"color: #ffffff !important;" +
"border-top: 1px solid #4e4e4e !important;" +
"border-left: 1px solid #4e4e4e !important;" +
"}" +
".subscribed {" +
"background-color: #434236 !important;" +
"color: #ffffff !important;" +
"border-top: 1px solid #4e4e4e !important;" +
"border-left: 1px solid #4e4e4e !important;" +
"}" +
".deleted {" +
"background-color: #1b1b1b !important;" +
"color: #ffffff !important;" +
"border-top: 1px solid #363636 !important;" +
"border-left: 1px solid #363636 !important;" +
"}" +
".last_visit {" +
"background-color: #363d38 !important;" +
"color: #ffffff !important;" +
"border-top: 1px solid #4e4e4e !important;" +
"border-left: 1px solid #4e4e4e !important;" +
"}" +
"" +
"/* ***** dotted hr ***** */" +
"div.hr {" +
"height: 2px !important;" +
"background: url(http://www.kiko323.info/images/greenfox/misc/hr.gif) repeat scroll center !important;" +
"}" +
"div.hr hr {" +
"display: none !important;" +
"}" +
"" +
"/* ***** make dropdown menu pretty ***** */" +
"" +
".vb_menu_control { " +
"background: #373737!important;" +
"color:  #ffffff !important;" +
"font: bold 11px tahoma, verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif !important;" +
"border-top: 1px solid #363636 !important;" +
"padding: 3px 6px 3px 6px !important;" +
"white-space: nowrap !important;" +
"}" +
".vb_menu_control a:link {" +
"color:  #ffffff !important;" +
"text-decoration: none !important;" +
"}" +
".vb_menu_control a:visited {" +
"color:  #ffffff !important;" +
"text-decoration: none !important;" +
"}" +
".vb_menu_control a:hover, .vb_menu_control a:active {" +
"color:  #cdf16c !important;" +
"text-decoration: underline !important;" +
"}" +
"" +
"/* ***** content ***** */" +
".content-table {" +
"	background: #1f1f1f !important;" +
"	border-left: solid 1px #1f1f1f;" +
"	border-right: solid 1px #1f1f1f;" +
"}" +
".content-row {" +
"	background: #1f1f1f !important;" +
"	background-color: #1f1f1f !important;" +
"	padding: 0 12px 0 12px;" +
"	border: solid 1px #111;" +
"	border-width: 0 1px 0 1px;" +
"}" +
"/* ***** navbar dot border ***** */" +
".vb_navbar" +
"{" +
"	background: #1f1f1f !important;" +
"	color: #848484 !important;" +
"	border: 1px dotted #363636 !important;" +
"}" +
"" +
"/* ***** category bottom ***** */" +
".cat_bottom" +
"{" +
"	background: #1f1f1f !important;" +
"	border-top: #363636 1px solid !important;" +
"}" +
"" +
"/* ***** Quote ***** */" +
"" +
".bbcode-start" +
"{" +
"	border: 1px solid #000000 !important;" +
"}" +
".bbcode-header" +
"{" +
"	background: #4c4c4c !important;" +
"}" +
".bbcode-poster" +
"{" +
"	color: #000000 !important;" +
"}" +
"div.bbcode-poster > strong," +
"div.bbcode-content > strong," +
"div.bbcode-content > font  " +
"{" +
"	color: #3b5d02 !important;" +
"}" +
".bbcode-content" +
"{" +
"	background: #bcbcbc !important;" +
"	color: #2c2c2c !important;" +
"}";

addGlobalStyle(styleStuff);
