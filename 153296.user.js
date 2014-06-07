// ==UserScript==
// @name           Extra menu on nxtgn
// @namespace      Script by Minus
// @description    nxtgn.org custom extra browse menu. 
// @include        http://*nxtgn.org/*
// @include        https://*nxtgn.org/*
// @version        0.1b
// ==/UserScript==
/*
please make your own urls so its up2date with the site and what you want.
*/
var ngmenu = '<a href="http://nxtgn.org/browse.php?search=&cat=0&incldead=0&modes=&c47=1&c44=1&c23=1&c7=1&c21=1&c17=1&c22=1&c6=1&c16=1&c32=1&c9=1&c28=1&c42=1&c43=1&c12=1&c11=1&c46=1&c26=1&c25=1&c38=1&c33=1&c5=1"><strong>Movies</strong></a> | <a href="http://nxtgn.org/browse.php?search=&cat=0&incldead=0&modes=&c24=1&c4=1&c31=1&c45=1"><strong>TV</strong></a> | <a href="http://nxtgn.org/browse.php?search=&cat=0&incldead=0&modes=&c41=1&c40=1&c3=1&c13=1"><strong>Music</strong></a>';
var ngctn = document.getElementById('kbrowse');
		var sp1 = document.createElement('div');
/*		
		sp1.setAttribute('id', ''); //next version
*/
		sp1.style.width = '960px';
		sp1.style.textAlign = 'center';
		sp1.style.position = 'absolute';
		sp1.style.margin = '145px 0px 0px 20px';
sp1.innerHTML = ngmenu;
var mynewdivTop = ngctn.insertBefore(sp1 , ngctn.firstChild);