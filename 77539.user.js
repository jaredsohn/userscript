// ==UserScript==
// @name           topix redirect
// @namespace      *
//@description  Topix.net has a clickthrough to get to the real article.  This finds the article and redirects your browser there.
// @include        http://www.topix.net/*
// @version         1.0
// @copyright     2010+, Miles Libbey (http://www.libbey.org)
// ==/UserScript==

var source=document.getElementById('source_full_story').href;
if(source){
window.location=source;
}