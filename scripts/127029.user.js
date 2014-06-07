// ==UserScript==
// @name           Papers userscript
// @namespace      geological-supplies.com
// @description    If your institution uses EZproxy to allow off-campus access to web pages, this script will redirect you to a version you have access to.
// @run-at document-start 
// @include http://*.aps.org/*
// @include http://*.annualreviews.org/*
// @include http://*.lyellcollection.org/* 
// @include http://*.informit.com.au/*
// @include http://*.jbc.org/*
// @include http://*.amjbot.org/*
// @include http://*.oxfordjournals.org/* 
// @include http://*.royalsociety*.org/*
// @include http://*.sagepub.com/*
// @include http://dictionary.oed.com/* 
// @include http://geology.gsapubs.org/* 
// @include http://ieeexplore.ieee.org/* 
// @include http://jgslegacy.lyellcollection.org/*
// @include http://journals.cambridge.org/* 
// @include http://oed.com/* 
// @include http://onlinelibrary.wiley.com/*
// @include http://pt.wkhealth.com/* 
// @include http://www.agu.org/* 
// @include http://www.iop.org/* 
// @include http://www.oed.com/* 
// @include http://www.publish.csiro.au/* 
// @include http://www.scopus.com/* 
// @include http://www.transplantjournal.com/* 
// @include *isiknowledge.com/*
// @include http://*.geoscienceworld.org/*
// @include http://*sciencemag.org/*
// @include http://*scienceonline.org/*
// @include http://apps.isiknowledge.com/*
// @include http://arjournals.annualreviews.org/*
// @include http://jgs.lyellcollection.org/*
// @include http://jme.bmj.com/*
// @include http://journals.cambridge.org/*
// @include http://journals.royalsociety.org/*
// @include http://pubs.acs.org/*
// @include http://scitation.aip.org/*
// @include http://sub3.isiknowledge.com/*
// @include http://www*.interscience.wiley.com/*
// @include http://www.bioone.org/*
// @include http://www.gsajournals.org/*
// @include http://www.informaworld.com/*
// @include http://www.ingentaconnect.com/*
// @include http://www.isiknowledge.com/*
// @include http://www.journals.uchicago.edu/*
// @include http://www.jstor.org/*
// @include http://www.lyellcollection.org/*
// @include http://www.nature.com/*
// @include http://www.oed.com/*
// @include http://www.pnas.org/*
// @include http://www.sciencedirect.com/*
// @include http://www.scopus.com/*
// @include http://www.springerlink.com/*
// @include http://www.tandfonline.com/*
// @include https://commerce.metapress.com/*


// @exclude *proxy-um.researchport.umd.edu* 
// @exclude http://*interscience.wiley.com*interscience.wiley.com/* 
// @exclude http://www.earthscape.org/* 
// @exclude http://www.maikonline.com/* 
// @exclude *?CRETRY=1&amp;SRETRY=0
// @exclude *?CRETRY=1&SRETRY=0

// ==/UserScript==

window.location.href=window.location.href.replace(/sub3/, "apps").replace("/xpl/freeabs_all.jsp", "/xpls/abs_all.jsp").replace(/Error[\?\/].*/i, "").replace(/([^\/])\/(?!\/)/, "$1.proxy-um.researchport.umd.edu/");
