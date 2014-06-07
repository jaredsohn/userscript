// ==UserScript==
// @name           Twitter Tweet Count Post Warning
// @namespace      http://eviljaymz.com/
// @description    Trigger a warning some tweets before you hit a recurring limit so you can hit those milestone counts.
// @include        http://*.twitter.com/*
// @include        http://twitter.com/*
// @author         Jaymz Campbell
// @version        0.5
// ==/UserScript==


// CONFIG - set TRIGGER_VALUE to the tweet count you want to have a recurring
// alert for. Eg, 1000 would give you a warning for *ever* thousand tweets. You
// can of course use something like 4328 or 993 or what ever. WARNING_THRESHOLD
// is the number of tweets you have to make until the update *you're about to make*
// would be the TRIGGER_VALUE count. ALWAYS_SHOW_WARNING will always tell you how
// many posts you have to make even if its something silly.

var TRIGGER_VALUE = 1000;
var WARNING_THRESHOLD = 10;
var ALWAYS_SHOW_WARNING = true;


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.0/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; main(); }
}
GM_wait();

function main() {
    var count = $('#update_count').text().replace(/,/g,'');
    var remainder = count % TRIGGER_VALUE + 1;
    var togo = TRIGGER_VALUE - remainder;

    var target = $('#chars_left_notice').parent('div');

    if($('#home_tab').hasClass('active')) {
        if (remainder == TRIGGER_VALUE) {
            target.append('<h5 class="tweetwarn" style="color:#FF6600;">GET ALL SELF-REFERENTIAL! You\'ve hit the sweet spot on tweet count when this posts!</h5>');
        } else if (togo < WARNING_THRESHOLD) {
            target.append('<h5 class="tweetwarn" style="color:#f20000;">WATCH OUT! You\'ve only '+togo+' tweets til you hit it!</h5>');
        } else if (ALWAYS_SHOW_WARNING) {
            target.append('<h5 class="tweetwarn" style="color:#999;">don\'t worry, still '+togo+' tweets still to go</h5>');
        }
        // alert('remainder: '+remainder+'\n'+'tweets to make: '+togo);
    }
    setTimeout(fadeOutWarning, 5000);
}

function fadeOutWarning() {
    $('.tweetwarn').fadeOut('slow');
}


