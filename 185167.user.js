// ==UserScript==
// @name        SOFYouTubeHttpToHttpsConversion
// @namespace   https://www.sofstudios.com/index.php?/
// @description Converts YouTube links to their https counterparts in the SOF forum
// @include     https://www.sofstudios.com/index.php?/*
// @version     1
// @grant       none
// ==/UserScript==

 
        jQuery('iframe.EmbeddedVideo[src*="http://youtube.com"]').each(function () {
            jQuery(this).attr('src', jQuery(this).attr('src').replace('http:', 'https:'));
        });

