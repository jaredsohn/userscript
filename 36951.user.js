// ==UserScript==
// @name           rest_fix
// @namespace      http://localhost
// @include        http://*rest.co.il/sites/Default.asp?*
// ==/UserScript==

var scriptCode = new Array();
scriptCode.push('var mystr = "";');
scriptCode.push('function create_new_gallery() {');
scriptCode.push(' mystr = \'<div class="rest_images">\';');
scriptCode.push(' for(i=0;i<aGallery.length;i++){');
scriptCode.push('   mystr += \'<div class="rest_img"><img src="\';');
scriptCode.push('   mystr += aGallery[i][0]+\'" /></div>\';');
scriptCode.push(' }');
scriptCode.push(' mystr += "</div>"');
scriptCode.push('}');
scriptCode.push('if(typeof aGallery != \'undefined\'){');
scriptCode.push(' create_new_gallery();');
scriptCode.push('}');
scriptCode.push('window.addEventListener("load", function(e) {');
scriptCode.push(' document.body.innerHTML += mystr;');
scriptCode.push('}, false);');
var script = document.createElement('script');
script.innerHTML = scriptCode.join('\n');

var styleCode = new Array();
styleCode.push('div.rest_images { width:100%;background:#fff; float:left; }');
styleCode.push('div.rest_images div.rest_img { padding:10px; float:left; }');
var style = document.createElement('style');
style.innerHTML = styleCode.join('\n');

try { document.getElementsByTagName('head')[0].appendChild(script); }
catch(e) {}
try { document.getElementsByTagName('head')[0].appendChild(style); }
catch(e) {}