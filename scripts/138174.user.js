// ==UserScript==
// @name           MilliyetStopAdsInGallery
// @namespace      MilliyetStopAdsInGallery
// @description    Milliyet Gallery Remove Advertisement Link / Milliyet Galerideki reklam butonunu kaldırır
// @include        http://*.milliyet.com.tr/fotogaleri/*
// ==/UserScript==
unsafeWindow.jQuery(document).ready(function() {
	jQuery('#NextPageBanner').val(jQuery('#NextPage').val());
});