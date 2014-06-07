// ==UserScript==
// @name          itü sözlük v3 / nigra
// @namespace     http://userstyles.org
// @description	  itü sözlük v3'ün siyah temasını adama çevirir.
// @author        thedewil
// @homepage      http://www.thedewil.com
// @include       http://www.itusozluk.com/*
// @include       http://itusozluk.com/*
// @exclude       http://www.itusozluk.com/duyurular/*
// @exclude       http://www.itusozluk.com/blog/*
// @exclude       http://www.itusozluk.com/kovan/*
// @exclude       http://www.itusozluk.com/gorseller/*
// ==/UserScript==
(function() {
var css = "#bgleft {
	/*border-right: 1px solid #fff !important;*/
}
body{
	color: rgba(255, 255, 255, 0.9);
}

input[type="button"], input[type="submit"]{
	border: 1px solid #AAAAAA;
	border-radius: 3px;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	background-repeat:repeat-x;
	background-color: rgba(158, 158, 158, 0.58);
	color: rgba(255, 255, 255, 0.83);
}

.butover{
	background-position:0px -5px !important;
	
}

.butover, #butover, .but:hover, input[type="button"]:hover, input[type="submit"]:hover
{
	border: 1px solid lightGrey;
	border-radius: 3px;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	background-repeat:repeat-x;
	background-color: rgba(40, 40, 40, 0.75);
	color: lightGrey;
}

.but:active, input[type="button"]:active, input[type="submit"]:active
{
border: 1px solid lightGrey;
	border-radius: 3px;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	background-repeat:repeat-x;
	background-color: rgba(40, 40, 40, 0.75);
	color: rgba(71, 157, 224, 0.97);
}


.kanka a {
	color:#212121 !important;
}

.yazarinfo {
background: url(yazinf.png)
}

.yazarinfo img{
border-radius: 5px;
-webkit-border-radius: 5px;
-moz-border-radius: 5px;
}

.top {
	
	background-position: 0px 0px;
	background-repeat:no-repeat;
}

.itusozluklogo  a {
	background-image:url(logo.png);
}

#top-bar {
border-top: 1px solid silver;
border-bottom: 1px solid silver;
background-color: #7E7E7E;
overflow: hidden;
background-repeat: repeat;
}

.notiflamp {
width: 35px;
}

.notiflamp a {
background-position: 9px -50px;
}

.notiflamp.exist a {
background-position: 9px 8px;
}

.mesajcop .yaniyor:hover {
background: #000 !important;
}

#getirform .inputouter {
background-color: rgba(216, 216, 216, 0.74);
border: 1px solid #D8D8D8;
border-radius: 4px;
-webkit-border-radius: 4px;
-moz-border-radius: 4px;
}

#getirara {
padding-left: 3px;
background-color: rgba(255, 255, 255, 0);
font-family: Trebuchet MS;
}


.searchinact {
	color:#a4a4a4;
}

.extramenu {
background-color: white !important;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
}

.extramenu li a:hover {
color: #A52E2E;
}

#gorunumpopup {
margin-top: 0;
background-image: url(yazinf.png);
}

.highlight
{
background-color: rgba(90, 90, 90, 0.5);
border-radius: 7px;
-webkit-border-radius: 7px;
-moz-border-radius: 7px;
}

.olay li {
padding: 1px 5px 0 5px;
}

.messages li {
padding: 1px 5px 0 5px;
}

.panelic {
	border-radius: 7px;
    -webkit-border-radius: 7px;
	-moz-border-radius: 7px;
    border-top: 1px solid #8a8a8a;
}

.bold {
color: #7B8EDA;
}

.ayarsec {
color: rgba(255, 158, 158, 0.95)
}

.kankalist .avatar, .ayarsec .avatar, .feed .gorsel {
border-radius: 4px;
-moz-border-radius: 4px;
-webkit-border-radius: 4px;
}

.ayarsec input[type="text"], .ayarsec input[type="password"] {
border-radius: 4px;
-moz-border-radius: 4px;
-webkit-border-radius: 4px;
padding: 2px;
}

.ayarsec select {
    border-radius: 3px;
}

input[type="text"], textarea, #entrybox, .panelic textarea, .status input, #msg {
background: rgba(116, 116, 116, 0.56);
border: 1px solid #B6B6B6;
border-radius: 5px;
-moz-border-radius: 5px;
-webkit-border-radius: 5px;
color: white;
}

.feed, .notification {
padding-top: 1px;
padding-bottom: 4px;
}

.paging li a
{
border: 1px ridge #656066;
border-radius: 5px;
-moz-border-radius: 5px;
-webkit-border-radius: 5px;
color: #B3B8C7;
}

ul.tabnav
{ 
border-bottom: 0;
-moz-border-radius-bottomleft: 0;
-webkit-border-radius-bottom-left: 0;
padding: 1px 10px 3px 0;
}

ul.tabnav li a {
border-radius: 5px;
-moz-border-radius: 5px;
-webkit-border-radius: 5px;
}

ul.tabnav li.selected a {
color: rgba(132, 167, 179, 0.9);
border-bottom: none 
}

ul.tabnav li.selected {
border-bottom: none
}
    
.solfbutons,.menubutons {
	position:absolute;
	
}
.solfbutons {
	top:110px;
	left:5px;
}

.menubutons {
	top:105px;
	left:390px;
}
.solfbutons a,.menubutons a,.gorunumbuton a {
	color:#fff;
	margin-right:8px;
	font-family: Arial;
	font-size: 12px;
}
.menubutons a {
	margin-right:20px;
}

.solfbutons a:hover,.menubutons a:hover {
	text-decoration:underline;
}

#gtrfrm {
	position:absolute;
	top:70px;
	left:5px;
}

#sbar {
	width:240px;
}


#bottombar {
	background-color:transparent;
	border:0;
	background-image:url(altbar.png);
	background-position: 0px -3px;
	background-repeat:repeat-x;
	padding-top:11px;
}

.icon {
	color:#fff;
	
}

#modal {
	background-color:#e5e5e5;
	border: 1px solid #dad0d0;
	z-index:999;
	border-bottom:0;
}

#bottombar .icon:hover, .icon.selectedicon  {
	background-color:#000;
	color:#fff;
}

.aratara {
	color: rgba(61, 217, 255, 0.8);
	font-family: Arial;
	font-size:11px;
}

.aratara input[type="text"] {
	border: 1px solid #d0d0d0;
	border-radius: 5px;
	-moz-border-radius:	5px;
	-webkit-border-radius:	5px;
}

#getirform.activo {
background: #7E7E7E
}

#gor,#ykl,#ext {
	background-image:url(../../../images/icons/menuwhite.gif);
	background-repeat:no-repeat;
	background-position:right center;
	padding-right:10px;
}

.toploading {
	background-image:url(../../../images/loading.gif) !important;
	
}
a {
	color: #DA8A8A;
}

a:hover, .title a:hover {
	color: #6F6F6F;
	text-decoration: none
}

.top a:hover{
	color:rgba(132, 167, 179, 0.9);
}

.entries a:hover{
	text-decoration:none;
}

.entries .entrymenu a {
color: rgba(132, 167, 179, 0.9);
}

.entrymenu a:hover {
color: #6F6F6F;
}

#bgleft a, .title a, .pager, .dateauthor a {
	color: rgba(170, 231, 236, 0.8);
	font-weight: normal;
}

#bgleft a:hover
{
color: #DA8A8A;
font-weight: normal;
}

#bgleft .curtit
{
font-weight: bold !important;
color: #DA8A8A;
}

.entries .dateauthor a{
       color: rgba(144, 242, 255, 0.62);
       }

.dateauthor a:hover
{
color: #DA8A8A !important;
}


table.chart tbody tr:hover td,
table.chart tbody tr.open td {
    background: #5b5b5b; color:#fff;
}

div.chartbar span {
	background:#5b5b5b;
	
}

.notif a{font-weight:bold;}

.notif li.okunmadi {
background-color: rgba(169, 132, 209, 0.3);
border-bottom: 1px dotted #c2c2c2;
border-top: 1px dotted #c2c2c2;
}

#icon_kacir  {
	background-image:url(left.png);
	background-position: 5px 2px !important;
	background-repeat:no-repeat !important;
	width:23px !important;
}

.gorunumbuton {display:inline !important;}

body
{
background-color:#131313;
background-image: url(body.png);
color: rgba(255, 255, 255, 0.9);
}

.top {
	position:fixed;
	top:0;
	left:0;
}


#bgleft {
	position:fixed;
	top:140px;
	bottom:25px;
	left:0px;
	margin-right: 30px;
	overflow-y:scroll;
}

#bgmain {
	position:fixed;
	top:140px;
	right:0px;
	bottom:25px;
	left:270px;
	margin-left:0;
	overflow-y:scroll;
	
	padding-bottom: 50px;
}

#bgleft, #bgmain {

-webkit-border-radius: 0;
-webkit-border-bottom-right-radius: 8px;
-webkit-border-bottom-left-radius: 8px;
border-bottom-right-radius: 8px 8px;
border-bottom-left-radius: 8px 8px;
}

/*BAŞLIK*/

.title a
{
padding: 5px;
color: rgba(119, 184, 209, 0.85);
font-family: tahoma;
font-weight: bold;
font-size: 14pt !important;
background-color: rgba(0, 0, 0, 0.35);
border-radius: 5px;
-webkit-border-radius: 5px;
-moz-border-radius: 5px;
}

.titlemenu {
background-color: rgba(168, 168, 168, 0.5);
border-radius: 3px;
-webkit-border-radius: 3px;
-moz-border-radius: 3px;
padding-top: 3px;
padding-right: 4px;
}

/*
.right {
	position:fixed;
	top: 135px;
	right: 0px;
}
*/

.footer {display:none;}

::-webkit-scrollbar{width:10px;height:10px;}
::-webkit-scrollbar-button:start:decrement, ::-webkit-scrollbar-button:end:increment{display:block;height:0;background-color:transparent;}
::-webkit-scrollbar-track-piece{background-color: rgba(67, 122, 133, 0.55);-webkit-border-radius:0;-webkit-border-bottom-right-radius:4px;-webkit-border-bottom-left-radius:4px;}
::-webkit-scrollbar-thumb:vertical{height: 150px;background-color:#757575;-webkit-border-radius:4px;}
::-webkit-scrollbar-thumb:horizontal{width:50px;background-color:#757575;-webkit-border-radius:4px;}

::scrollbar{width:10px;height:10px;}
::scrollbar-button:start:decrement, ::scrollbar-button:end:increment{display:block;height:0;background-color:transparent;}
::scrollbar-track-piece{background-color: rgba(67, 122, 133, 0.55);border-radius:0;-border-bottom-right-radius:4px;border-bottom-left-radius:4px;}
::scrollbar-thumb:vertical{height: 150px;background-color:#757575;-border-radius:4px;}
::scrollbar-thumb:horizontal{width:50px;background-color:#757575;border-radius:4px;}

#entries { 
	word-wrap: break-word;
	padding-left:40px;
}

.right .kanka ol li img {
border: 1px solid #A5A5A5;
border-radius: 2px;
-moz-border-radius: 2px;
-webkit-border-radius: 2px;
}

img.avatar.st{
        height:35px !important;width:35px !important;
}

.sagsec h2 {
border-bottom: 1px dotted #CCC;
color: rgba(132, 167, 179, 0.9);
font-weight: bold;
}

.sagsec.favoriler li {
margin-bottom: 2px;
background-color: rgba(0, 0, 0, 0.42);
padding: 3px;
border-radius: 3px;
-moz-border-radius: 3px;
-webkit-border-radius: 3px;
}

.sagsec.favoriler img {
margin-top: 2px;
border-radius: 3px;
-moz-border-radius: 3px;
-webkit-border-radius: 3px;
}

.ilgili ul {

background-color: rgba(0, 0, 0, 0.42);
border: 1px solid #A2A2A2;
border-radius: 3px;
-moz-border-radius: 3px;
-webkit-border-radius: 3px;
}

#dyrlar .duycontent 
{
background: inherit;
background-color: rgba(0, 0, 0, 0.27);
padding: 2px 6px 1px 6px;
}

.duyurular ul
{
border-bottom: 1px solid #a2a2a2;
border-radius: 2px;
-moz-border-radius: 2px;
-webkit-border-radius: 2px;
}

#dyrlar li a {
font-size: 12px;
font-style: italic;
}

#dyrlar li {
border: 1px solid #a2a2a2;
background-color: rgba(0, 0, 0, 0.45);
border-radius: 2px;
-moz-border-radius: 2px;
-webkit-border-radius: 2px;
border-bottom: none;
padding: 0 6px 0px 6px;
}

.gorsel li img{
border-radius: 4px;
-moz-border-radius: 4px;
-webkit-border-radius: 4px;
}

#popover {
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
margin-top: 0;
}

.sahsim_select {
border-radius: 6px;
-webkit-border-radius: 6px;
-moz-border-radius: 6px;
}

.sahsim_popup {
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
}

.sahsim_popup .stat, .sahsim_popup h1, .sahsim_popup .giris {
color: #fff
}

.sahsimfoot:hover {
border-bottom-left-radius: 10px;
}

.giris a{
color: rgba(255, 150, 150, 0.93);
}

.giris .new a{
color: #98B5FF;
}

.noentry {
color: #fff
}

.notif li, #popover, .sahsim_popup {
background-image: url(yazinf.png);
}

.notif li {
color: #fff
}

.notif li a {
color: #62A7FF
}

.kankalist table tr td a {
color: #F38686;
}

.kankalist table tr td {
color: rgba(255, 255, 255, 0.9);
}

.kankalist .selected table tr td a {
color: #000;
}

.kankalist .selected table tr td {
color: #FF7B7B;
font-weight: bold;
}

.kankalist .selected {
background-color: rgba(156, 0, 0, 0.67);
}
"
if (typeof GM_addStyle != 'undefined') {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != 'undefined') {
	PRO_addStyle(css);
} else if (typeof addStyle != 'undefined') {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName('head');
	if (heads.length > 0) {
		var node = document.createElement('style');
		node.type = 'text/css';
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();