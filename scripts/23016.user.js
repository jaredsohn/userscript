// ==UserScript==
// @name           aNobii tags search
// @namespace      http://www.lbreda.com/
// @description    Creates a tags search engine for aNobii
// @include        http://*.anobii.com/anobi/*
// @include        http://*.anobii.com/tags/*
// @include        http://*.anobii.com/books/*
// @exclude        
// ==/UserScript==

/* by Lorenzo Breda <lbreda@gmail.com>
Free software.
*/

if(document.getElementById('location_indicate')){
var form;

form = '<br /><form action="http://www.lbreda.com/anobii/tags.php" method="POST"><b>Tag: </b><input type="text" name="tag" style="margin-top: 2px;" /></form>';

document.getElementById('location_indicate').innerHTML += form;

}