// ==UserScript==
// @name           Edit page redesign
// @namespace      http://myspace.com/myscripts
// @description    bigger edit page
// @include        http://profileedit.myspace.com/index.cfm?fuseaction=profile.interests*
// ==/UserScript==


s= "div.row {position:relative; left:-10px; z-index:11; width:100%!important;}\n";
s+= "div.alignL, #ctl00_ctl00_Header_Header1_searchControls, input#ctl00_ctl00_Main_ProfileEditContent_editInterests_hash {display:none!important;}\n";
s+= "div div div div div div textarea {width:770px!important; height:500px!important;}\n";
s+= "label {text-align:left!important; width:100%; display:block; font-size:8px}\n";



GM_addStyle(s);