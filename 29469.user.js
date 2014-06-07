
// Dropbox Width Adjuster - to be used with Dropbox Google Gadget
// http://share.mf.googlepages.com/dropbox_redir_mf.xml
// Version 0.5
// Copyright (c) 2008, Michael Freeman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name           FixDropBoxWidth
// @namespace      https://www.getdropbox.com
// @description    Changes the width of dropbox from static to 100%
// @include        https://www.getdropbox.com/browse2_plain*?*mini=true
// ==/UserScript==
//0.1 Original Dropbox Interface
//0.5 AJAX Mini Dropbox Interface
/*
//find the table with class filebrowser
try{
var t = document.getElementsByTagName('table');
var i = 0;
while (t[i].className!="filebrowser"){
	i++;
}
//change table width to 100%
t[i].style.width='100%';
} catch(err){
}*/
//var bb = document.getElementById('browse-box');
var bb = document;
var x = bb.styleSheets[0];
//header rows
bb.getElementById('browse-actions').style.width='345px';
bb.getElementById('name-sorter').style.width='150px';
//bb.getElementById('size-sorter').style.width='45px';
//bb.getElementById('size-sorter').style.textAlign='center';
bb.getElementById('size-sorter').style.cssText='text-align:center;width:45px;';
bb.getElementById('modified-sorter').style.width='105px';
bb.getElementById('modified-sorter').style.textAlign='center';
//file and folder rows
bb.getElementById('browse-files').style.width='345px';
x.insertRule('.details-filename-mini { width:auto;}',x.cssRules.length);
x.insertRule('.details-filename-mini { min-width:150px;}',x.cssRules.length);
x.insertRule('.details-size { width:50px;}',x.cssRules.length);
//x.insertRule('.details-filename-mini { width:150px;}',x.cssRules.length);


bb=null;
x=null;