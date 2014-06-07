// ==UserScript==
// @name          Linearize or Flatten All Elements on Page
// @description   Collapses all elements to fit in top-bottom order (linearize) on the page.
// @include       *
// ==/UserScript==

(function(){var D=document,e,styles="table,thead,tbody,tr,th,td{display:block!important;}*{width:auto!important;height:auto!important;position:static!important;float:none!important;margin-left:0!important;margin-right:0!important;} img,iframe,embed,object{display:none;} body {margin:4px!important;}"; e=D.createElement('link'); e.rel='stylesheet'; e.href=window.opera ? "javascript:'"+styles+"'" : "data:text/css,"+styles; D.getElementsByTagName("head")[0].appendChild(e)})()