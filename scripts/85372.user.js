// ==UserScript==
// @name           weRead Amazon Exporter
// @namespace      com.aaronbronow.apps
// @description    Inspects the weRead book shelf page for Amazon products and displays a list of ISBN or ASIN.
// @include        http://weread.com/manageshelf/index.php
// ==/UserScript==

GM_registerMenuCommand( "Export", Export );

function Export(){

var output = "";
var items = 0;
var images = document.getElementsByTagName("img");
var list = document.createElement("div");

for(var i = 0; i < images.length; i++){
 if(images[i].src.indexOf("amazon") > 0){
  var p = images[i].src.indexOf("P");
  output += images[i].src.substr(p+2, 10) + ', '; 
  items++;
 }
}

var box = document.createElement('div');
box.style.position = 'fixed';
box.style.top = '100px';
box.style.left = '10px';
box.style.padding = '20px';
box.style.backgroundColor = '#fff';
box.innerHTML = "Found " + items + " Amazon products.<br/><br/>" + output;
var body = document.getElementsByTagName('body')[0];
body.appendChild(box);

}