// ==UserScript==
// @name Space
// @namespace dvd30200
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource background http://www.artemis-uk.org/Figures/OB05390_artist.jpg
// @resource header http://gallery.artofgregmartin.com/tuts_arts/planet_images/planet_glow.jpg
// @resource tab http://hof.povray.org/images/pov-planet.jpg
// @resource twitter http://hof.povray.org/images/pov-planet.jpg
// @resource storeitem http://www.artemis-uk.org/Figures/OB05390_artist.jpg
// ==/UserScript==

GM_addStyle('body {background-image: url(\''+GM_getResourceURL('background')+'\');} #header, #topmenu ul li a, #loginbox, #userbox, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} #sb-tabs, .a-log {background-image: url(\''+GM_getResourceURL('tab')+'\');} #sb-twitter {background-image: url(\''+GM_getResourceURL('twitter')+'\');} .popstorePop {background-image: url(\''+GM_getResourceURL('storeitem')+'\');} ');