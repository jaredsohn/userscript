// ==UserScript==
// @name          Bigger Edit Page
// @namespace     http://myspace.com/welcometoparadisia
// @description	  Cut down version of abraxus' edit page
// @include       http://profileedit.myspace.com/*
// ==/UserScript==

s= '';
s+= '#details_interests div.alignL {display:none;}\n';
s+= '#ctl00_ctl00_Main_ProfileEditContent_editInterests_EditInterests div {visibility:hidden;}\n';
s+= '#ctl00_ctl00_Main_ProfileEditContent_editInterests_EditInterests div * {visibility:visible;}\n';
s+= 'textarea {margin-left:-225px; -moz-border-radius:20px; border:2px black inset; padding: 10px; width:800px !important; height:600px; display:block; position:relative; left:200px; margin-bottom:50px;}\n';
s+= 'body {background-color: #336699; }\,';
GM_addStyle(s);