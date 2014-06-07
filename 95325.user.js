// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name value          VERZIA 6.0
// @namespace      www.divoke-kmene.sk 
// @description    STARA VERZIA 
// @include        http://sk*.divoke-kmene.sk/*  
// @version        1.0
// ==/UserScript==

// @namespace      DK-VERZIA 5.0
// @description    5.0 
// ==UserScript==


a:link	{ font-weight:bold; color: #804000; text-decoration:none; }
a:visited	{  font-weight:bold; color: #804000; text-decoration:none; }
a:active	{  font-weight:bold; color: #0082BE; text-decoration:none; }
a:hover { font-weight:bold; color: #0082BE; text-decoration:none; }
td		{ font-size:9pt; }
.hidden { color:#DED3B9; }
table.main { border-width:2px; border-style: solid; border-color:#804000; background-color:#F1EBDD; background-image:url(graphic/background/main.jpg)}
table.news { background-color:#F1EBDD; }
.in_border { background-color:#F1EBDD; text-align:left;}


span.timer_replace span { display:none; }

form { margin: 0px; }
p:first-child, h1:first-child, h2:first-child, h3:first-child, h4:first-child,
	h5:first-child, h6:first-child, h1+p, h2+p, h3+p, h4+p, h5+p, h6+p { margin-top: 0px; }

table.blind { border-spacing:0px; }
table.blind td { padding: 0px; }

table.vis td { background-color:#F8F4E8; background-image:url(graphic/background/table.jpg)}
table.vis td.selected { background-color:#DED3B9; background-image:none;}
table.vis tr.nowrap td { white-space:nowrap; background-color:#F8F4E8; background-image:none;}
table.vis tr.units_own_home td { background-color:#F8F4E8; background-image:none;}
table.vis tr.units_there td { background-color:#EDE1B7; background-image:none;}
table.vis tr.units_away td { background-color:#F3EBCF; background-image:none;}
table.vis tr.units_moving td { background-color:#F3EBCF; background-image:none;}
table.vis tr.row_a td { background-color:#F8F4E8; background-image:none;}
table.vis tr.row_b td { background-color:#F3EBCF; background-image:none;}
table.vis tr.edit_player_colors td{ background-image:none;}

tr.nowrap td { white-space:nowrap; }

table.intro td { background-color:#F8F4E8; line-height:1.5em; padding:6px;   font-size:8pt}

/* Tooltips Waffenkammer (mootools) */
.tool-tip{
	width:250px;
	background-color:#F8F4E8;
	z-index:9999;
}
.tool-title{
	background-color:#DED3B9;
	font-weight:bold;
	padding:2px;
}
.tool-text{
	padding:5px;
}

/* MenĂĽleiste */
table.menu, ul.quickbar {
	border: 1px solid black;
	background-color: #F1EBDD;
}

ul.quickbar{
	border-spacing:1px;
	list-style-type:none;
	padding:0;
	padding-right: 5px;
	margin:0 auto;
}

/* Top-Menu-Item mit Hover */
table.menu tr td, ul.quickbar li {
	padding: 2px; padding-left: 4px; padding-right: 4px;
	white-space: nowrap;
	background-color: #F8F4E8;
	background-image:url(graphic/background/grey.jpg);
}

/* Quickbar MenuItem */
ul.quickbar li{
	padding-top: 0px; padding-bottom: 0px;
	display:inline;
}

/* Das gesamte Untermenu */
table.menu tr td table {
	z-index:100;
	position:absolute;
	border-top: 1px solid black;
	border-top: 1px solid black;
	margin-left: -5px; margin-top:1px;
	visibility: hidden;
}

/* Das gesamte Untermenu in sichtbar */
table.menu tr td:hover table, table.menu tr td.hover table {
	visibility: visible;
	z-index:9999;
}

/* Ein Untermenupunkt */
table.menu tr td table tr td {
	border: 1px solid black;
	border-top: none;
}
/* Ein Link in einem Untermenupunkt */
table.menu tr td table tr td a{
	display: block;
	width: 100%;
}

/* Forum */
.forum { display:inline-block; background-color:#F1EBDD; margin-bottom:4px; padding:1px; border:1px solid #000; white-space:nowrap; line-height:150%; }
.selected { background-color:#FADC9B;}

table.map_container { background-color: #DED3B9; border: 1px solid rgb(0, 0, 0); }
table.map td { font-size:8pt; text-align:center; vertical-align:middle;}
table.map div.lay1 { position: absolute; z-index: 1; text-align: right; }
table.map div.lay2 { margin-top:15px; position:absolute; }

td.space-left { border-left:1px solid #175E36; } /* zwischen normalen Feldern */
td.space-bottom { border-bottom:1px solid #175E36; }
td.border-left { border-left:1px solid #103530; } /* "Sektorgrenzen" S1/S2/S6 */
td.border-bottom { border-bottom:1px solid #103530; }
td.sector-left { border-left:1px solid #DED3B9; } /* Sektorgrenzen */
td.sector-bottom { border-bottom:1px solid #DED3B9; }

td.space-left-new {}
td.space-bottom-new {}
td.border-left-new { border-left:1px solid #214B18; }
td.border-bottom-new { border-bottom:1px solid #214B18; }
td.sector-left-new { border-left:1px solid #DED3B9; }
td.sector-bottom-new { border-bottom:1px solid #DED3B9; }
td.con-left-new { border-left:1px solid #000000; }
td.con-bottom-new { border-bottom:1px solid #000000; }

tr.center td { text-align:center; }
tr.lit td { font-weight:bold; background-color:#FADC9B; background-image:none;}
tr.lit2 td { font-weight:bold; background-color:#F0E6C8; background-image:none;}
tr.admin td { background-color:#F0E6C8; }
tr.mini td { font-style: italic; font-size: x-small }
th		{ font-size:9pt; text-align: left; font-weight:bold; background-color:#DED3B9; background-image:url(graphic/background/body.jpg); }
body	{ background-color: #DED3B9; background-image:url(graphic/background/body.jpg); font-size:9pt; font-family: Verdana, Arial }
/* !!! ACHTUNG !!! 'Wenn css nicht als UTF-8 gespeichert, dann wird dies hier kaputt gehen !!! */
h1		{ font-size:16pt;}
h2		{ font-size:14pt;}
h3      { font-size:12pt; font-weight:bold; }
h4      { font-size:10pt; font-weight:bold; font-style:italic; margin-bottom:4pt}
h5      { font-size:10pt; font-weight:bold; margin-bottom:2pt}
img   { border: none; }
img.middle { vertical-align:middle; }

.grey  { color: gray; }
.warn  { color: rgb(255, 0, 0); }
.error { color: rgb(180, 0, 0); font-weight:bold; }
.inactive { color: rgb(160, 160, 160); }
.nowrap { white-space: nowrap; }
.small { font-size: xx-small; }

hr		{ color: #804000; }
table.box { border-width:1px; border-style: solid; border-color:#000000; background-color:#F1EBDD; background-image:url(graphic/background/main.jpg); vertical-align: middle; }
table.box tr td { white-space:nowrap; }

input, select { font-size: 8pt; /*background-color:#FDFBF3;*/ }

input.attack { background-color: rgb(250, 210, 210) }
input.support { background-color: rgb(210, 250, 210) }

input.check { margin:0px; margin-right:5px; }

table.quote td.quote_author { font-weight: bold; font-size: 8pt; }
table.quote td.quote_message { background-color:#FFFFFF; font-size: 8pt; }

.post { border: 2px solid #804000; background-color: #f8f4e8; padding:0px; margin-bottom:5px;}
.igmline { background-color:#efe6c9; padding-left:4px; border-bottom:1px solid #804000; position:relative;}
.text { padding:6px; }
.date { font-size:x-small; right:5px; position:absolute;}
.right { right:5px; position:absolute; }

.landing { font-size:x-small; }

#igm_groups { position:absolute;z-index:100; border: 2px solid #804000; background-color:#efe6c9;}
#igm_groups td { padding:2px; }

#bb_sizes { position:absolute;z-index:100; border: 2px solid #804000; background-color:#efe6c9; top: 24px; left: 200px;}
#bb_sizes td { padding:2px; }

#igm_to { position:absolute; z-index:1; border: 2px solid #804000; background-color:#DED3B9;}
#igm_to_content { background-color:#efe6c9; height: 250px; width:200px; overflow:auto}
#igm_to td { padding:2px; }

#box{
color:black;
background-color : #F8F4E8;
width:100%;
height:200px;
text-align:left;
padding : 0px;
overflow:auto;
position:relative;
}

ul.help{padding-left:1px; margin-left:0px}
li.help{list-style-type:none; background-color:#DED3B9; margin:2px; padding-left:8px; padding-top:4px; padding-bottom:4px;}

ul.help li.help ul.help li.help{ background-color:#F1EBDD; }
ul.help li.help ul.help li.help ul.help li.help { background-color:#F8F4E8; }
/*ul.help ul.help ul.help{background-color:#F8F4E8;}*/

ul.submenu{padding-left:1px; margin-left:0px}
li.submenu{list-style-type:none; margin:2px; padding-left:8px; padding-top:4px; padding-bottom:4px;}

a.sel { color:#0082BE; text-decoration:underline;}

.bonus_icon{background-image:url(graphic/overview/bonus_icons.png);width:14px;height:14px;display:inline-block;margin-left:2px;}
.bonus_icon_1{background-position:0 0}
.bonus_icon_2{background-position:0 98px}
.bonus_icon_3{background-position:0 84px}
.bonus_icon_4{background-position:0 14px}
.bonus_icon_5{background-position:0 56px}
.bonus_icon_6{background-position:0 42px}
.bonus_icon_7{background-position:0 28px}
.bonus_icon_8{background-position:0 70px}

.server_info{
	font-size: 7pt;
	margin-top:0px;
	margin-bottom:0px;
}

#inline_popup {
	border: 2px solid #804000;
	background-color:#ded3b9;
	position:absolute;
	display: none;
	width:298px;
	z-index:5;
}
#inline_popup_menu{
	width:100%;
	text-align:right;
}
#inline_popup_main{
	overflow:auto;
	height:300px;
	width:288px;
	background-image: url('graphic/background/content.jpg');
	padding:3px;
}
.luck{ border:1px solid #000}