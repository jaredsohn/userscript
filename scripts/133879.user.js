// ==UserScript==
// @name			Clean Haxball
// @description		Clean Haxball
// @version			2.0
// @date			21-02-2012
// @author			Ufuk Sarp Selcok
// @include			www.haxball.com*
// @include			http://www.haxball.com*
// ==/UserScript==

var p = document.getElementById('play');

var header = document.getElementById('header');
var ads = document.getElementById('ads');
var gpu = document.getElementById('gpu_notice');
var gpu2 = document.getElementById('gpu_disabled_notice');

if(header!=null){p.removeChild(header);}
if(ads!=null){p.removeChild(ads);}
if(gpu!=null){p.removeChild(gpu);}
if(gpu2!=null){p.removeChild(gpu2);}