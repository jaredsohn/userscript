// ==UserScript==
// @name		Tufts ezProxy
// @namespace		LRodman
// @version		v1.3
//
// @include		*annals.org/*
// @include		*ieee.org/*
// @include		*jstor.org/*
//
// @include		*blackwell-synergy.com/*
// @include		*interscience.wiley.com/*
// @include		*lexisnexis.com/*
// @include		*mdconsult.com/*
// @include		*ovid.com/*
// @include		*sagepub.com/*
// @include		*sciencedirect.com/*
// @include		*springerlink.com/*
//
// @exclude		http://www.library.tufts.edu/ezproxy/ezproxy.asp?*
// @exclude		*.ezproxy.library.tufts.edu/*
// ==/UserScript==

var ezproxLR = ".ezproxy.library.tufts.edu/";
var currlocLR = content.document.location.href;

//if (content.document.location.href.match(ezproxLR)) {
  //	alert('ezprox');
//}
//else {

  //	alert('loop');
	var newlocLR, ezproxnewLR;
	if (currlocLR.match(".org/")) {
	 //	alert('org');
		ezproxnewLR=".org" + ezproxLR;
		newlocLR = currlocLR.replace(".org/", ezproxnewLR);
	}	
	else if (currlocLR.match(".com/")) {
	 //	alert('com');
		ezproxnewLR=".com" + ezproxLR;
		newlocLR = currlocLR.replace(".com/", ezproxnewLR);
	}
	content.document.location.replace(newlocLR);
	
//}