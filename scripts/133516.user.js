// ==UserScript==
// @name         Hide Facebook Shares from George Takei
// @namespace    http://www.philihp.com/
// @version      0.3
// @description  Hides any stories in your Facebook news feed shared from George Takei
// @copyright    2012+, Philihp Busby, Norah Riley
// @include      https://*.facebook.com/*
// @exclude      https://*.facebook.com/ajax/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

$(document).bind('DOMSubtreeModified',function() {
    $('.actorName, .uiAttachmentDetails').each(function() {
        var $elem = $(this);
        if($elem.text() == 'George Takei'){
            $elem.parents('.uiUnifiedStory').hide();
        }
    });
});