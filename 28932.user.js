// ==UserScript==
// @name           Biblegateway.com 
// @namespace      http://userscripts.org
// @description    This is a small script that reformats the Biblegateway.com homepage and all subpages to make the Bible verse lookup form always show at the top have the text always selected and focused. 
// @include        http://www.biblegateway.com/*
// ==/UserScript==

//setup css for restyling.
  var css="#homead{top:170px !important;}#content{padding-top:185px;}#page-options{top:145px;}#site-options{top:119px;}#navigation{top:145px;}#brand{top:67px;}#rotate-link{top:36px !important;} body{background-position:0pt 55px !important;}#updateresultsform input{font-size:10px;}#updateresultsform select.txt-sm{height:22px;font-size:10px;}#updateresultsform{background-color:#6c290d; border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:1px; left:0pt; height:25px; margin:0; padding: 5px; position:fixed; top:0pt; width:100%; z-index:100;}";

//add css to the dom.
  var heads = document.getElementsByTagName("head");
  var node1 = document.createElement("style");
  node1.type = "text/css";
  node1.appendChild(document.createTextNode(css));
  heads[0].appendChild(node1); 

//If Biblegateway homepage, then do this renaming.
if(!document.getElementById('updateresultsform')){
  var homeform = document.getElementById('content').getElementsByTagName('form')[0];
  homeform.id='updateresultsform';
  homeform.getElementsByTagName('select')[0].className='txt-sm';
  document.getElementById('content').getElementsByTagName('div')[0].id="homead";
}

// Set focus to input box and select all text.
  var myforminput = document.getElementById('updateresultsform').getElementsByTagName('input')[0];
  myforminput.select();
  myforminput.focus()


