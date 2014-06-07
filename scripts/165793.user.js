// ==UserScript==
// @name       kamuflaj for Courthouse
// @description  eksi++ kamuflaj for Courthouse
// @include        http://sozluk.sourtimes.org/*
// @include        http://antik.eksisozluk.com/*
// ==/UserScript==

/*kamuflaj for courthouse fenasi kertmen*/
 
/* statistics bar */
.statbar {
    text-align:right;
    white-space:nowrap;
} 

/* ad box */
.ad {
    overflow: hidden;
    padding: 0;
    border: 0;
    font-size: x-small;
}

/* left frame lists */
.index {
    width:200px;
    list-style-type: none;
    margin: 0;
    overflow:hidden;
    padding: 0;    
    padding-left: 8px;
    text-indent: -8px;
}

.index > li {
    width: 100%;
    margin: 0;
}

.index > li:before {
    content: "\00B7\00A0"; /* middot */
}

/* entry menu box */
.entrymenu {visibility:hidden;text-align:right;}
.entrymenu > ul {list-style-type:none;display:inline-block;padding:0;}
.entrymenu li {display:inline-block;margin-left:4px;height:18px;}
.entrymenu a.but {padding:0 3px;float:left;}

/* share icons (f, tw, ff, etc) */
.sharelink {
  width:16px;
  height:16px;
  padding: 0;
  margin: 0;
  border:0;
}

/* login box */
.loginbox {
    width: 220px;
    margin: 0px auto;
}

/* author badge */
.badge {
    display:inline-block;
    border:1px outset;
    padding:2px 5px 4px 5px;
    margin: 2px;
    text-align:center; 
    cursor: default;
}

/* author info pane */
.infopane {
	border: 1px solid;
    margin: 5px 0;
    overflow: hidden;
}
/* author info content inside infopane */
.infocontent {
	padding-left:3px;
	padding-right:3px;
	overflow:hidden;
}

/* infopane header left and right */
.infopanehdr {
	width: 100%;
	display: inline-block;
	cursor: pointer;
	text-align: center;
	line-height: 2;
}

/* author info note text area */
.infonote {
	border-top:1px solid;
	border-bottom:1px solid;
	margin-bottom:5px;
}
/* author info query bar */
.infoquerybar {
   float :right;
   margin-right:40px;
   margin-top:80px;   
}

/* history diff colors */
ins {
    background-color: #b1cc8e;
    text-decoration: none;
}

del {
    background-color: #c28181;
}

.blockdel {
    background-color: #c28181;
}

.blockins {
    background-color: #b1cc8e;
}

.blockedit {
    background-color: transparent;
}

/* login inputs */
.lin {
    width: 100%;
}

/* http://url links */
.url {
    padding-right: 10px;
    background: url(img/url.png) no-repeat right top;   
}

/* (bkz: ) links */
.b {
}

/* (ara: ) links */
.ara {
}

/* `gorunmez bkz` */
.gb {
}

/* akilli bkz* */
.ab {
}

/* ampul abi */
.ampul {
    list-style-image: url(img/ampul.png);
    margin-left: 0px;
}
/* info section headers */
.infosec {
    border: 1px outset;
    cursor: pointer;
}
/* right panel */
.panel {
    width: 120px;
    float: right;
    clear: right;
    padding: 0;
    /*padding-left: 4px;*/
    border: 0;
    font-size: x-small;
}
/* arastir dropdown select */
.asl {
    width: 100%;
    margin: 0;
}
/* ad box */
.spot {
    width: 120px;
    float: right;
}
.spot TD {
    font-size: 7pt;
}

/* badilist */
#badi {
    width: 120px;
    padding: 2px;
    font-size: 7pt;
    overflow: hidden;
    border: 1px inset;
}
/* inline search textbox */
.aratext {
    width: 100%;
}
/* left frame background class */
.bgleft {
    overflow-x: hidden;
    margin-top: 175px !important;
    /*cursor: cell;*/
    background: #fff url(http://i.imgur.com/giLyk9I.png) fixed no-repeat;
    background-position: 0px 186px;
    /*background-size: 100%;*/
}
   
.klk { /*reklam seysi*/
  display: none;
}
/* top frame background class */
.bgtop {
    margin: 0 !important;
    padding: 0;
    overflow: hidden !important;
    background-image : url(http://i.imgur.com/nSDECut.png);
    background-repeat: no-repeat;
    background-position: top left;
    background-size: 100%;
    color: #15428b;
}
/* inline search marker */
.marker {
    background-color: yellow;
    color: black;
}
/* pager buttons */
.pbut {
    font-size: 7pt;
    width: 16px;
    height: 16px;
}
/* top buttons */
.nav TD {
    padding: 4px;
    height: 16px;
    margin: 0;
    vertical-align: middle;
    cursor: pointer;
    text-transform: capitalize;
}
/* panel leds */
.pmsg, .pbin, .pevt {
    background-color: #fff;
    color: #15428b;
}
.pmsghi, .pbinhi, .pevthi {
    background-color: #bfdbff;
    color: #15428b;
}

/* page browser text */
.pagi {
    font-size: x-small;
    text-align: center;
}
.pagi select {
    font-size: smaller;
}
.pagi a {
    font-size: small;
}
/* ekşisözlük logo! */
.logo {
    background-image: url(img/logo.png);
    background-repeat: no-repeat;
    background-position:center;
    width: 231px;
    height: 45px;
    cursor: default;
}
/* highlight color */
.highlight {
    background-color: #c0c0c0;
}
/* copyright line */
.copyright {
    font-size: 7pt;
    color: #404040;
}
#topic {
    margin-top:150px;margin-bottom:35px;position:relative;overflow:hidden;
    /*cursor: cell;*/
}
#epw { 
  height:170px !important; 
  display: block !important;
  position: static !important;
  }
/* topic title */
.title {
    font: bold 12pt Verdana, sans-serif;
    background-color: transparent;
    width: 100%;
    color: #000080;
    border: none;
    white-space: nowrap;
    margin-bottom:25px;
    margin-top:0;
}
/* buttons */
.but {
    font: 8pt Arial,sans-serif;
    font-family : "Segoe UI";
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    cursor: default;
    background-color: transparent;
    color: #15428b;
    border: none;
}
/* small buttons under "araştır" bar */
.minibut {
    width: 24px;
    margin-right: 2px;
    display: inline-block;
}
/* button mouse over */
#butOver {
    background-color: #bfdbff;
}
/* button pressed */
#butDown {
    border: none;
}
/* button link adjustments */
.but A {
    color: #15428b;
    display: inline-block;
    vertical-align: middle;
    width: 100%;
}
.but A:Hover {
    background-color: transparent;
    color: white;
}
#butOver A {
    color: #15428b;
}
#butOver A:Hover {
    background-color: transparent;
    color: #15428b;
}
/* entry buttons (derived from but) */
.icon {
    font-size: 7pt;
}
.timer {
    font-size: 7pt;
    vertical-align: middle;
}
/* entry author line */
.aul {
    font-size: 8pt;
    line-height: 9pt;
    text-align: right;
    margin-bottom:15px;
}
/* panel classes */
.pi {
    border: 1px inset;
    font-size: 7pt;
    padding: 0px;
    text-align: center;
}
.pi A:Hover {
    background-color: transparent;
}
/* top inputtexts */
.input {
    height: 12px;
    font: 7pt Verdana, sans-serif;
}
/* message textarea */
.msgtext {
    font-size: 8pt;
}
/* messages table */
.msg {
    padding: 2px;
    font-size: 8pt;
    color: black;
}
.msg TD {
    font-size: 8pt;
}
/* entry text */
.eol {
    line-height: 14pt;
    word-wrap:break-word;
}
/* entry id */
.ei {
    color: #808080;
    margin: 0;
    padding: 0;
    font-size: 7pt;
}
/* regular tab */
.tab {
    padding-top: 2px;
    border-bottom: 2px inset;
    font-size: 7pt;
    white-space: nowrap;
}
.tab DIV {
    line-height: 12pt;
    white-space: nowrap;
    margin-left: 1px;
    padding-left: 4px;
    padding-right: 4px;
    padding-top: 2px;
    padding-bottom: 0;
    border: 2px outset;
    border-right: 1px outset;
    border-bottom: 0;
}
.tab A:Hover {
    background-color: transparent;
}
/* selected tab */
.tabsel {
    border: 2px outset;
    line-height: 11pt;
    white-space: nowrap;
    font-size: 7pt;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 4px;
    padding-right: 4px;
    cursor: default;
    border-bottom: 0;
    white-space: nowrap;
}
/* tab contents */
.tabin {
    border: 2px outset;
    border-top: 0;
    padding: 4px;
    height: 245px;
    font-size: 8pt;
}

/* vertical tab */
.vtab {
    padding-right: 2px;
    border-left: 2px inset;
    font-size: 7pt;
    white-space: nowrap;
    cursor: pointer;
}
.vtab DIV {
    line-height: 12pt;
    white-space: nowrap;
    margin-top: 0;
    padding: 4px 2px 4px 3px;
    border: 2px outset;
    border-top: 1px outset;
    border-left: 0;
}
.vtab A:Hover {
    background-color: transparent;
}
/* vertical selected tab */
.vtabsel {
    border: 2px outset;
    line-height: 11pt;
    white-space: nowrap;
    font-size: 7pt;
    padding: 4px 2px 4px 5px;
    cursor: default;
    border-left: 0;
    white-space: nowrap;
}
/* vertical tab contents */
.vtabin {
    border: 2px outset;
    border-right: 0;
    padding: 4px 10px 4px 4px;
    height: 245px; /* min */
    font-size: 8pt;
}

/* hayvan ara */
.adiv {
    display: block;
    position: absolute;
    top: 184px !important;
    left: 213px;
    width: 15px;
    overflow: hidden;
}
.amain {
    background-color: #ccdbee;
    border: 1px outset;
    border-left: 0;
    padding: 4px;
}
TD.amain {
    font-size: 8pt;
}
.aup {
    border-right: 1px inset;
    height: 18px;
}
.amid {
    background-color: transparent;
    color: transparent;
    border: 1px outset;
    border-right: 0;
    padding: 4px;
    line-height: 8pt;
    font-weight: bold;
    font-size: 8pt;
    cursor: pointer;
    text-align: center;
}
.abot {
    border-right: 1px inset;
    height: 140px;
}
.link:hover {
    cursor: pointer;
}
.csseditbox {
    width: 100%;
    font-family: Consolas, Monospace;
}
/* default styles */
body {
    font: 9pt Verdana, sans-serif;
    /*background: #fff url(http://dl.dropbox.com/u/39457223/kamuflaj/bgrighttop.png) top left fixed no-repeat;*/
    /*background-size: 95%; */
    color: black;
    height: 100%;
    /*margin-top: 150px !important;*/
    background-color: #fff;
}

iframe {
    border: none;
}
ul {
    line-height: 12pt;
}
a {
    color: #000080;
    text-decoration: none;
}
a:hover {
    background-color: #c0c0c0;
}
select, input, optgroup {
    font: 8pt Verdana, sans-serif;
}
textarea {
    font: 9pt Verdana, sans-serif;
    width: 100%;
    padding: 0;
    margin: 0;
    border: 0;
}
hr {
    color: black;
    height: 1px;
}
th {
    font-size: 9pt;
}
td {
    font-size: 9pt;
    line-height: 12pt;
    vertical-align: top;
}
p {
    font-size: 9pt;
    line-height: 14pt;
    vertical-align: top;
}
img, form, table {
    padding: 0;
    margin: 0;
    border: 0;
}
dd {
    margin: 0;
    padding: 0;
}
fieldset {
    margin: 0;
    padding: 2px;
}
.checkbox, .radio {
    border: none;
    background-color: transparent;
}
li {
    margin-left: 14px;
    padding: 0;
}
.rel-vid {width:100%; display:none;}
.rel-vid > h2 {margin:5px 0 2px 0;font-size:12px;font-weight:normal;text-align:left;background-image:none;padding:0;width:100%;}
.rel-vid > h2 > a {font-size:inherit;}
.rel-vid > .vid-thumbs {margin-bottom:10px;}
.rel-vid > .vid-thumbs > span {display:block;text-align:right;font-size:1.2em;clear:both;min-height:14px;}
.rel-vid > .vid-thumbs > span > a {cursor:pointer;}
.rel-vid > .vid-thumbs > span > a.prev {cursor:pointer;float:left;}
.rel-vid > .vid-thumbs > a > span.vid-title {text-align:center;display:block;margin-bottom:5px;word-break:break-word;}
.rel-vid > .vid-thumbs > a {position:relative;display:inline-block;overflow-y:hidden;padding:0;margin:0;vertical-align:top;}
.rel-vid > .vid-thumbs > a.m2 { margin-left:10px; }
.rel-vid > .vid-thumbs > a:hover > .play-overlay {opacity:0.8;filter:alpha(opacity=80);}
.rel-vid .play-overlay {
    color:#fff;font-size:35px;position:absolute;text-align:center;text-shadow:1px 1px 4px black;opacity:0.5;filter:alpha(opacity=50);left:0;top:0;padding-top:0;
}

a img { vertical-align:middle; }

.rightcol  
{
    position:fixed;top:140px;right:0;margin:0 15px 0 0;font-size:x-small;z-index:100;
}
.rightcol > div, .rightcol > ul {margin-bottom:10px;}
ul.share-buttons {list-style:none;padding:0;width:100px; line-height:normal; display:block; }
ul.share-buttons li {display:block;float:left;margin:0 2px 3px 0; height:12px; width:24px;line-height:11px;}
ul.share-buttons li.share {width:16px; margin-right:4px;}

#d  {
border: 1px solid #000;
}

h1.title {  
    position: fixed;
    top: 0px;
    height: 41px;
    left: 0;
    background: #fff url(http://i.imgur.com/uJyIHeS.png) no-repeat;
    padding-left: 10px;
    padding-top: 97px;
    font-weight: normal;
    font-size: small;
    cursor: default;
}

.bgleft .pagi { 
    position: fixed;
    top: 0px;
    height: 40px;
    left: 0;
    background: #fff url(http://i.imgur.com/MUt1pbZ.png) top right no-repeat;
    padding-left: 0px;
    padding-top: 140px;
    font-weight: normal;
    font-size: small;
    width: 100%;
    cursor: default !important; 
}

#t {
background-color: #bfdbff;
color: #15428b;
border :none;
}

.index li a {
  padding-left: 5px;
}

.index li  {
  padding-left: 12px;
}

body form, blockquote table, #oltags {
  margin-top: 150px !important;
}

.bgtop form, .bgtop table, #ssg, #dmsgfrm , .vtabin form, .panel, #panel, .rightcol form, form[action="info2.asp"], form[action="del.asp"] {
  margin-top: 0px !important;
}

form#ssg[action="add.asp"] {
margin-top: 140px !important;
}

#topic div[style="margin-top:-45px;margin-bottom:28px;"] {
margin-top: -20px !important;
}




::-webkit-scrollbar {
width: 11px;
height: 11px;
}

::-webkit-scrollbar-track {
background-color: transparent;
}

::-webkit-scrollbar-thumb {
background-color: #D4E5F3;
-webkit-border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
background-color: #BFDBFF;
-webkit-border-radius: 3px;
}

::-webkit-scrollbar-corner {
background-color: #ECECEC;
}
::-webkit-scrollbar-resizer {
background-color: #ECECEC;
}