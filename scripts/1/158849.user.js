// Simple script (most likely ugly and unprofessional, but it gets the job done and
// that's as far as I care) to remove top-middle-bottom banner on PSC website
// for more screen estate.

// ==UserScript==
// @name                PSC banner remover
// @description	        Removes PSC banners for more screen space
// @author		pdw (can reach me on the website)
// @version		1.0 (and only)
// @include		http://playstationcommunity.hu/*
// @include		http://*.playstationcommunity.hu/*
// ==/UserScript==

var elmDeleted = document.getElementById('ads_middle_content_adverticum');
elmDeleted.parentNode.removeChild(elmDeleted);
var elmDeleted = document.getElementById('ads_header_content_cc');
elmDeleted.parentNode.removeChild(elmDeleted);
var elmDeleted = document.getElementById('ads_middle_content_adverticum');
elmDeleted.parentNode.removeChild(elmDeleted);