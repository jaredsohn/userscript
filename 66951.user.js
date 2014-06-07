// ==UserScript==
// @name           Twitter Old Style RT Emulator
// @namespace      twitter
// @description    Fixes Twitter so Reply button is back where it belongs and new style retweets are shown as old-style ones instead!
// @license        GPL v2 or later
// @include        http://twitter.com/*
// ==/UserScript==
//
// Works in Safari and Firefox
// Works on home timeline, replies, and even user specific pages
//
// Stole some of http://userscripts.org/scripts/review/62338 to do the RT modifications
// Thanks Leonard Lin! 

// To get this all to work on Safari/GreaseKit too..
// ..thanks http://userscripts.org/topics/32072
if (typeof(unsafeWindow) === 'undefined') { 
unsafeWindow = window; 
}

$ = unsafeWindow.jQuery;

function update_tweet(i) {
  if ($('body#profile').length != 0) {
    var status = $(this).parent().parent();
    var douchebag_url = status.find("strong").find("a").attr('href');
    var douchebag_name = douchebag_url.slice(19);

    status.find(".status-body strong").html('');
    status.find(".status-body .entry-content").prepend('RT <a href="' + douchebag_url + '?rt">@' + douchebag_name + "</a> ");
    
    // Mark to not be redone on later scans
    $(this).addClass("retweet-modified");    
  } else {
    var friend = $(this).find("a").attr('href').slice(1);
    var friend_avatar = "http://twivatar.org/" + friend;
    var status = $(this).parent().parent();
    var thumb = status.find(".thumb");
    var douchebag_url = thumb.find("a").attr('href');
    var douchebag_name = thumb.find("a").attr('href').slice(19);
    
    // The original source avatar is moved into the inset position
    thumb.before('<span class="thumb vcard author"><a class="tweet-url profile-pic url" href="http://twitter.com/' + friend + '"><img class="photo fn" width="48" height="48" src="' + friend_avatar + '"/></a></span>');
    thumb.hide();
    
    status.find(".status-body strong").html('<a class="tweet-url screen-name" href="http://twitter.com/' + friend + '">' + friend  + '</a>');
    status.find(".status-body .entry-content").prepend('RT <a href="' + douchebag_url + '?rt">@' + douchebag_name + "</a> ");
    
    // Mark to not be redone on later scans
    $(this).addClass("retweet-modified");
  }
}


function hideCrap() {
  try {
    // Hide all the retweet links
    $('.retweet-link').hide();
    
    // Hide the retweet icons
    $('.big-retweet-icon').hide();
        
    // Find all unfixed tweets and sort them out..
    rt = $(".retweet-meta:not(.retweet-modified)");
    rt.each(update_tweet);
    
    // Hide all retweet meta lines
    $('.retweet-meta').hide(); } catch(e) { };
}

// Hide the "ads"
$('.promotion').hide();

setTimeout(hideCrap, 500);

// Whenever an AJAX request completes, hide all new RTs
$('body').ajaxComplete(function() {
    setTimeout(hideCrap, 250);
});
