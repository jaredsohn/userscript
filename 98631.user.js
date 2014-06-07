// ==UserScript==
// @name           goole_zh_noad
// @namespace      gzn
// @description    clear the google hk ads
// @include        http://www.google.com.hk/search*
// ==/UserScript==
// ==UserScript==
// @name           nga
// @namespace      nga
// @description    nga
// @include        http://bbs.ngacn.cc/
// @include        http://bbs.ngacn.cc/*
// ==/UserScript==
(function(){
function $(id){
	return  document.getElementById(id);
}
if($('tads'))
	$('tads').style.display='none';
if($('rhs_block'))
	$('rhs_block').style.display='none';	

})();
