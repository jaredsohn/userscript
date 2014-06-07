// ==UserScript==
// @name           Standard Travian Forum [ No Green ]
// @namespace      1.0
// @description    By V1T4L @ PC7
// @include        http://forum.travian.*/*
// ==/UserScript==
 	 var c0l0r;
 	 c0l0r='navy';
 function addGlobalStyle(css) {
     var head, style;
     head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
     style = document.createElement('style');
     style.type = 'text/css';
     style.innerHTML = css;
     head.appendChild(style);
 }
 addGlobalStyle('<!-- CSS Stylesheet -->' + 
'<style type="text/css" id="vbulletin_css">' + 
'/**' + 
'* vBulletin 3.8.1 CSS' + 
'* Style: \'Travian\'; Style ID: 2' + 
'*/' + 
'body' + 
'{' + 
'	background: #FFFFFF url(images/travian/m.gif) repeat-x;' + 
'	color: #000000;' + 
'	font: 10pt tahoma;' + 
'	margin: 5px 10px 10px 0px;' + 
'	padding: 0px;' + 
'	' + 
'}' + 
'a:link, body_alink' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'a:visited, body_avisited' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'a:hover, a:active, body_ahover' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'.page' + 
'{' + 
'	background: transparent;' + 
'	color: #000000;' + 
'	font-family: tahoma;' + 
'	margin: 0px;' + 
'	' + 
'}' + 
'td, th, p, li' + 
'{' + 
'	background: transparent;' + 
'	font: 10pt tahoma;' + 
'}' + 
'.tborder' + 
'{' + 
'	background: #C0C0C0;' + 
'	color: #000000;' + 
'	font-family: tahoma;' + 
'	border: 2px #396E04 solid;' + 
'	' + 
'}' + 
'.tcat' + 
'{' + 
'	background: #D4D4D4 url(images/travian/cellpic1.gif) repeat-x top left;' + 
'	color: #000000;' + 
'	font: bold 11px tahoma;' + 
'	letter-spacing: 1px;' + 
'}' + 
'.tcat a:link, .tcat_alink' + 
'{' + 
'	color: #000000;' + 
'	text-decoration: none;' + 
'}' + 
'.tcat a:visited, .tcat_avisited' + 
'{' + 
'	color: #000000;' + 
'	text-decoration: none;' + 
'}' + 
'.tcat a:hover, .tcat a:active, .tcat_ahover' + 
'{' + 
'	color: #000000;' + 
'	text-decoration: underline;' + 
'}' + 
'.thead' + 
'{' + 
'	background: #7B797A url(images/travian/cellpic3.gif) repeat-x top left;' + 
'	color: #FFFFFF;' + 
'	font: bold 11px tahoma;' + 
'	height: 28px; ' + 
'	' + 
'}' + 
'.thead a:link, .thead_alink' + 
'{' + 
'	color: #FFFFFF;' + 
'}' + 
'.thead a:visited, .thead_avisited' + 
'{' + 
'	color: #FFFFFF;' + 
'}' + 
'.thead a:hover, .thead a:active, .thead_ahover' + 
'{' + 
'	color: '+c0l0r+';' + 
'}' + 
'.tfoot' + 
'{' + 
'	background: #FFFFFF;' + 
'	color: #000000;' + 
'	font-family: tahoma;' + 
'}' + 
'.tfoot a:link, .tfoot_alink' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'.tfoot a:visited, .tfoot_avisited' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'.tfoot a:hover, .tfoot a:active, .tfoot_ahover' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'.alt1, .alt1Active' + 
'{' + 
'	background: #FFFFFF;' + 
'	color: #000000;' + 
'	font-family: tahoma;' + 
'}' + 
'.alt2, .alt2Active' + 
'{' + 
'	background: #FFFFFF;' + 
'	color: #000000;' + 
'	font-family: tahoma;' + 
'}' + 
'.inlinemod' + 
'{' + 
'	background: #FFFFCC;' + 
'	color: #000000;' + 
'	font-family: tahoma;' + 
'}' + 
'.wysiwyg' + 
'{' + 
'	background: #FFFFFF;' + 
'	color: #000000;' + 
'	font: 11px tahoma;' + 
'}' + 
'textarea, .bginput' + 
'{' + 
'	background: #FFFFFF;' + 
'	font: 11px tahoma;' + 
'}' + 
'.bginput option, .bginput optgroup' + 
'{' + 
'	font-size: 11px;' + 
'	font-family: tahoma;' + 
'}' + 
'.button' + 
'{' + 
'	font: 11px tahoma;' + 
'}' + 
'select' + 
'{' + 
'	font: 11px tahoma;' + 
'}' + 
'option, optgroup' + 
'{' + 
'	font-size: 11px;' + 
'	font-family: tahoma;' + 
'}' + 
'.smallfont' + 
'{' + 
'	font: 11px tahoma;' + 
'}' + 
'.time' + 
'{' + 
'	color: #666686;' + 
'	font-family: tahoma;' + 
'}' + 
'.navbar' + 
'{' + 
'	font: 11px tahoma;' + 
'}' + 
'.highlight' + 
'{' + 
'	background: #DADAFF;' + 
'	color: #000000;' + 
'	font-family: tahoma;' + 
'	font-weight: bold;' + 
'}' + 
'.fjsel' + 
'{' + 
'	background: #3E5C92;' + 
'	color: #E0E0F6;' + 
'}' + 
'.fjdpth0' + 
'{' + 
'	background: #F7F7F7;' + 
'	color: #000000;' + 
'}' + 
'.panel' + 
'{' + 
'	background: transparent;' + 
'	color: #000000;' + 
'	font-family: tahoma;' + 
'	padding: 5px 10px 30px 5px;' + 
'	' + 
'}' + 
'.panelsurround' + 
'{' + 
'	background: #FFFFFF url(images/travian/cellpic1-2.gif) bottom left repeat-x;' + 
'repeat-x;' + 
'	color: #000000;' + 
'	font-family: tahoma;' + 
'}' + 
'legend' + 
'{' + 
'	color: #009900;' + 
'	font: bold 11px tahoma;' + 
'}' + 
'.vbmenu_control' + 
'{' + 
'	background: #7B797A url(images/travian/cellpic1-1.gif);' + 
'	color: #000000;' + 
'	font: bold 11px tahoma;' + 
'	padding: 3px 6px 3px 6px;' + 
'	white-space: nowrap;' + 
'	border: 0px solid;' + 
'}' + 
'.vbmenu_control a:link, .vbmenu_control_alink' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'.vbmenu_control a:visited, .vbmenu_control_avisited' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'.vbmenu_control a:hover, .vbmenu_control a:active, .vbmenu_control_ahover' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'.vbmenu_popup' + 
'{' + 
'	background: #336633;' + 
'	color: #000000;' + 
'	font-family: tahoma;' + 
'	border: 1px solid #396E04;' + 
'}' + 
'.vbmenu_option' + 
'{' + 
'	background: #F5F5F5;' + 
'	color: '+c0l0r+';' + 
'	font: 11px tahoma;' + 
'	white-space: nowrap;' + 
'	cursor: pointer;' + 
'}' + 
'.vbmenu_option a:link, .vbmenu_option_alink' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'.vbmenu_option a:visited, .vbmenu_option_avisited' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'.vbmenu_option a:hover, .vbmenu_option a:active, .vbmenu_option_ahover' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'.vbmenu_hilite' + 
'{' + 
'	background: #8A949E;' + 
'	color: #FFFFFF;' + 
'	font: 11px tahoma;' + 
'	white-space: nowrap;' + 
'	cursor: pointer;' + 
'}' + 
'.vbmenu_hilite a:link, .vbmenu_hilite_alink' + 
'{' + 
'	color: #FFFFFF;' + 
'	text-decoration: none;' + 
'}' + 
'.vbmenu_hilite a:visited, .vbmenu_hilite_avisited' + 
'{' + 
'	color: #FFFFFF;' + 
'	text-decoration: none;' + 
'}' + 
'.vbmenu_hilite a:hover, .vbmenu_hilite a:active, .vbmenu_hilite_ahover' + 
'{' + 
'	color: #FFFFFF;' + 
'	text-decoration: none;' + 
'}' + 
'/* ***** styling for big usernames on postbit etc. ***** */' + 
'.bigusername { font-size: 14pt; }' + 
'' + 
'/* ***** small padding on thead elements ***** */' + 
'td.thead, div.thead { padding: 4px; }' + 
'' + 
'/* ***** basic styles for multi-page nav elements */' + 
'.pagenav a { text-decoration: none; }' + 
'.pagenav td { padding: 2px 4px 2px 4px; }' + 
'' + 
'/* ***** define margin and font-size for elements inside panels ***** */' + 
'.fieldset { margin-bottom: 6px; }' + 
'.fieldset, .fieldset td, .fieldset p, .fieldset li { font-size: 11px; }' + 
'' + 
'/* ***** dont change the following ***** */' + 
'form { display: inline; }' + 
'label { cursor: default; }' + 
'.normal { font-weight: normal; }' + 
'.inlineimg { vertical-align: middle; }' + 
'' + 
'/* ********* changed by mk *************** */' + 
'#forumtools{' + 
' border:0px;' + 
'}' + 
'' + 
'table#usercp_nav a {' + 
' color: #109343;' + 
' textdecoration: none;' + 
'}' + 
'table#usercp_nav a:visited, table#usercp_nav a:link, {' + 
' color: #109343;' + 
' textdecoration: none;' + 
'}' + 
'table#usercp_nav a:hover, table#usercp_nav a:active {' + 
' color:'+c0l0r+'; ' + 
' text-decoration:underline;' + 
'}' + 
'' + 
'' + 
'.tborder2{' + 
' color:#000000;' + 
' width: 970px;' + 
'}' + 
'' + 
'.vbmenu_control2{' + 
'	background: transparent;' + 
'	color: #000000;' + 
'	font: bold 11px tahoma, verdana, geneva, lucida,  arial, helvetica, sans-serif;' + 
'helvetica, sans-serif;' + 
'	padding: 3px 6px 3px 6px;' + 
'	white-space: nowrap;' + 
'	border: 0px solid;' + 
'}' + 
'' + 
'.vbmenu_control2 a:link, .vbmenu_control_alink' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'.vbmenu_control2 a:visited, .vbmenu_control_avisited' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'.vbmenu_control2 a:hover, .vbmenu_control a:active, .vbmenu_control_ahover' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: underline;' + 
'}' + 
'' + 
'.above_header{' + 
' position: absolute;' + 
' top:0px;' + 
' left: 7px;' + 
' z-index:0;' + 
'}' + 
'' + 
'.alt1 a:link' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'.alt1 a:visited' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'}' + 
'.alt1 a:hover, .alt1 a:active' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: underline;' + 
'}' + 
'' + 
'.nav-bar{' + 
' position:absolute;' + 
' z-index:49;' + 
' left:0;' + 
' width: 980px;' + 
' top:45px;' + 
'}' + 
'' + 
'div#myspacer{' + 
' height:201px;' + 
'}' + 
'' + 
'.thead_trav' + 
'{' + 
'	background: #7B797A url(images/travian/cellpic3.gif) repeat-x top left;' + 
'	color: #FFFFFF;' + 
'	font: bold 11px tahoma, verdana, geneva, lucida,  arial, helvetica, sans-serif;' + 
'helvetica, sans-serif;' + 
'	height: 28px; ' + 
'        padding-top: 0px;' + 
'        padding-bottom: 0px;    ' + 
'	' + 
'}' + 
'.thead_trav a:link' + 
'{' + 
'	color: #FFFFFF;' + 
'}' + 
'.thead_trav a:visited' + 
'{' + 
'	color: #FFFFFF;' + 
'}' + 
'.thead_trav a:hover, .thead_trav a:active' + 
'{' + 
'	color: '+c0l0r+';' + 
'}' + 
'' + 
'.quote_trav{' + 
'  background-color: #f6f6f6;' + 
'  border: 1px solid #396e04;' + 
'}' + 
'' + 
'.thread_title_trav a:link, .thread_title_trav a:visited' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: none;' + 
'        font-weight: bold;' + 
'}' + 
'.thread_title_trav a:hover, .thread_title_trav a:active' + 
'{' + 
'	color: '+c0l0r+';' + 
'	text-decoration: underline;' + 
'        font-weight: bold;' + 
'}' + 
'' + 
'.thread_title_trav .smallfont a:link, .thread_title_trav .smallfont a:visited{' + 
'	color: #666699;' + 
'	text-decoration: none;' + 
'        font-weight: normal;' + 
'}' + 
'.thread_title_trav .smallfont a:hover, .thread_title_trav .smallfont a:active' + 
'{' + 
'	color: #666699;' + 
'	text-decoration: underline;' + 
'}' + 
'' + 
'.lastpost_trav{' + 
'	color: #000000;' + 
'}' + 
'.lastpost_trav a:link, .lastpost_trav a:visited{' + 
'	color: #999999;' + 
'	text-decoration: none;' + 
'        font-weight: normal;' + 
'}' + 
'.lastpost_trav a:hover, .lastpost_trav a:active' + 
'{' + 
'	color: #666666;' + 
'	text-decoration: underline;' + 
'}' + 
'' + 
'.replycount_trav {	' + 
'   color: #000000;' + 
'}' + 
'.replycount_trav a:link, .replycount_trav a:visited{' + 
'	text-decoration: none;' + 
'        font-weight: bold;' + 
'}' + 
'.replycount_trav a:hover, .replycount_trav a:active' + 
'{' + 
'	text-decoration: underline;' + 
'}' + 
'' + 
'.headerlink_trav img{' + 
' border: 0px;' + 
'}' + 
'.headerlink_trav a:hover, .headerlink_trav a:active{' + 
' text-decoration:none;' + 
' border:0px;' + 
'}' + 
'.headerlink_trav a:link, .headerlink_trav a:visited{' + 
' text-decoration:none;' + 
' border:0px;' + 
'}' + 
'' + 
'a.new_thread:link, a.new_thread:visited{' + 
' text-decoration:underline;' + 
'}' + 
'.tab_list .thead{' + 
' height:12px;' + 
'}' + 
 '</style>');		