// ==UserScript==

// @name           Edit Page

// @namespace      Myspace.com

// @description    Edit Page Redesign

// @include        http://profileedit.myspace.com/*

// ==/UserScript==


s= '.alignL {display:none;}\n';
s+= 'div div div div div div textarea {width:780px!important; position:relative; left:-15px!important; height:560px!important;}\n';


GM_addStyle (s);