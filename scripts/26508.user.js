// ==UserScript==
// @name           RedirectThroughNDSULibrary
// @namespace      http://owlwatch.blogspot.com/
// @description    Redirect journals through NDSU library
// @include        http://ieeexplore.ieee.org/* 
// @include        http://www.sciencedirect.com/*
// @include        http://www.sciencemag.org/* 
// @include        http://www.springerlink.com/* 
// @include        http://springerlink.com/* 
// @include        http://pubs.acs.org/*
// @include        http://*.interscience.wiley.com/*
// @include        http://www.jstor.org/*
// @include        http://www.iop.org/*
// @include        http://www.ingentaconnect.com/*
// @include        http://journals.cambridge.org/*
// @include        http://www.blackwell-synergy.com/*
// @include        http://www.bioone.org/*
// @include        http://asae.frymulti.com/*
// ==/UserScript==

var doforward = true;
var port = "";

switch(location.hostname){
case "pubs.acs.org":
    port = "2711";
    break;
case "ieeexplore.ieee.org":
    port = "2111";
    break;
case "www.springerlink.com":
case "springerlink.com":
    port = "2540";
    break;
case "www.sciencedirect.com":
    port = "2052";
    break;
case "www.interscience.wiley.com":
case "www3.interscience.wiley.com":
    port = "2058";
    break;
case "www.jstor.org":
    port = "2075";
    break;
case "www.iop.org":
    if( location.pathname == "/EJ/*" )
        port = "2866";
    else
        doforward = false;
    break;
case "www.ingentaconnect.com":
    port = "2542";
    break;
case "journals.cambridge.org":
    port = "2099";
    break;
case "www.blackwell-synergy.com":
    port = "2073";
    break;
case "www.bioone.org":
    port = "2076";
    break;
case "asae.frymulti.com":
    port = "2446";
    break;
case "www.sciencemag.org":
case "sciencemag.org":
    port = "2087";
    break;
default:
    doforward = false;
}

if(doforward){
    location.href= "http://dp3.lib.ndsu.nodak.edu:" + port + location.pathname + (location.search ? ("?" + location.search) : "") ;
}
