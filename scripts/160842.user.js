// ==UserScript==
// @name         Hide Facebook Shared Photos
// @description  Hides any shared photos from your facebook timeline
// @include      *.facebook.com/*
// @exclude      *.facebook.com/ajax/*
// @grant        GM_getValue
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

$(document).bind('DOMSubtreeModified',function() {
    $('.uiStreamHeadline').each(function() {
        var $elem = $(this);
        if($elem.text().indexOf('shared') >= 0 && $elem.text().indexOf('photo') >= 0){
            $elem.parents('.uiUnifiedStory').hide();
        }
    });
});