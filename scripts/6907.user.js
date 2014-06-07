// ==UserScript==
// @name          Bigger Edit Page
// @namespace     http://myspace.com/welcometoparadisia
// @description	  Cut down version of abraxus' edit page
// @include       http://profileedit.myspace.com/*
// @exclude	  http://profileedit.myspace.com/Modules/*
// ==/UserScript==

s= '';
s+= '#details_interests div.alignL {display:none;}\n';
s+= '#ctl00_ctl00_Main_ProfileEditContent_editInterests_EditInterests div {visibility:hidden;}\n';
s+= '#ctl00_ctl00_Main_ProfileEditContent_editInterests_EditInterests div * {visibility:visible;}\n';
s+= 'textarea {margin-left:-225px; border:2px black solid; padding: 10px; width:800px !important; height:600px; display:block; position:relative; left:200px; margin-bottom:50px; top:30px;}\n';
s+= 'body {background-color: white; }\,';
GM_addStyle(s);