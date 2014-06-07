// ==UserScript==
// @name           Spike.com prevent video autoplay and remove video ad
// @namespace      userscripts.org
// @description    Spike.com prevent video autoplay and remove video ad
//@version		0.2
// @include        http://www.spike.com/video/*
// @include        http://www.spike.com/*video*
// ==/UserScript==

var fvrs = document.getElementById('PRODUCT_OBJECT').getAttribute('flashvars'); //umm...that's supposed to be JSON is it?

var adPart = fvrs.slice(fvrs.indexOf('[ *setAd')-8, fvrs.indexOf('[ *log*, *DONE WITH AD 0*'));

var rep1 = fvrs.replace(adPart, "");
var rep2 = rep1.replace('*instantPlay* : true', '*instantPlay* : false');

document.getElementById('PRODUCT_FRAME').innerHTML = '<embed width="640" height="519" flashvars="'+rep2+'" allowfullscreen="true" allowscriptaccess="always"'+ 
	'quality="high" bgcolor="#ffffff" name="PRODUCT_OBJECT" id="PRODUCT_OBJECT" style="" src="/ui/flash/player.swf" type="application/x-shockwave-flash"/>';