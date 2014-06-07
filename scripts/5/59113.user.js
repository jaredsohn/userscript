// ==UserScript==
// @name           ezproxy
// @namespace      geological-supplies.com
// @description    This script is revised by George.
// @include       http://*.webofknowledge.com/*
// @include       http://*.nejm.org/*
// @include       http://*.isiknowledge.com/*
// @include       http://*.wiley.com/*
// @include       http://*.sciencedirect.com/*
// @include       http://*.springerlink.com/*
// @include       http://*.umi.com/*
// @include       http://*.blackwell-synergy.com/*
// @include       http://*.nature.com/*
// @include       http://*.portlandpress.co.uk/*
// @include       http://*.portlandpress.com/*
// @include       http://*.biochemj.org/*
// @include       http://*.bmjjournals.com/*
// @include       http://scitation.aip.org/*
// @include       http://*apc.org/*
// @include       http://*.biophysj.org/*
// @include       http://*.sciencemag.org/*
// @include       http:///www.sciencemag.org/*
// @include       http://*.ingentaconnect.com/*
// @include       http://www.ncbi.nlm.nih.gov/entrez/query.fcgi*
// @include       http://*.annualreviews.org/*
// @include       http://*.proteinscience.org/*
// @include       http://portal.acm.org/*
// @include       http://www.mitpressjournals.org/*
// @include       http://ajpcell.physiology.org/*
// @include       http://www.jbc.org/*
// @include       http://www.pnas.org/*
// @include       http://www.jimmunol.org/*
// @include       http://www.fasebj.org/*
// @include       http://www.cell.com/*
// @include       http://dev.biologists.org/*
// @include       http://cancerres.aacrjournals.org/*
// @include       http://www.liebertonline.com/*
// @include       http://*.ebrary.com/*
// @include       http://*.acs.org/*
// @include       http://www.oed.com/*
// @include       http://*.pressdisplay.com/*
// @include       http://*.hematologylibrary.org/*
// @include       http://*.springer.com/*

// @exclude *?CRETRY=1&amp;SRETRY=0
// ==/UserScript==

window.location.href=window.location.href.replace(/sub3/, "apps").replace(/Error[\?\/].*/i, "").replace(/([^\/])\/(?!\/)/, "$1.pc124152.oulu.fi:8080/");
