// ==UserScript==
// @name        facebookhidesharesandlikes
// @namespace   hider
// @description hides all facebook "shares" and "likes"
// @include     *.facebook.com/*
// @exclude     *.facebook.com/ajax/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version     1.1
// ==/UserScript==

//change to 0 to turn off option
$newsfeed = 1;
$profile = 1;
$picofday = 0;




$(document).bind('DOMSubtreeModified',function() {
    
    //shared on profile
    if ($profile === 1)
    {
    $('.fcg').each(function() {
        var $elem = $(this);
        if($elem.text().indexOf('shared') >= 0 || $elem.text().indexOf('likes') >= 0){
            $elem.parents('.timelineUnitContainer').hide();
        }
    });
    }
    
    
    
    //shared on newsfeed
    if ($newsfeed === 1)
    {
    $('.uiStreamHeadline').each(function() {
        var $elem = $(this);
        if($elem.text().indexOf('shared') >= 0 || $elem.text().indexOf('likes') >= 0){
            $elem.parents('.uiUnifiedStory').hide();
        }
    });
    }

    
        
    
    //pic of day
    if ($picofday === 1)
    {
    var $pictureofday = 'Your picture of the day.';
    $('.uiStreamMessage').each(function() {
        var $elem = $(this);
        if($elem.text().indexOf($pictureofday) >= 0){
            $elem.parents('.uiUnifiedStory').hide();
        }
    });
    }
    
    
});