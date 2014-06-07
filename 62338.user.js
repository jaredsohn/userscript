// ==UserScript==
// @name           Retweet Avatars
// @namespace      http://greasemonkey.randomfoo.net/twitter/
// @description    Fixes Retweet Avatars to show your friends w/ an inset for the original tweeter
// @author         Leonard Lin <lhl@randomfoo.net>
// @version        1.1.0
// @date           2009-11-20
// @license        GPL v2 or later
// @include        http://twitter.com/*
// ==/UserScript==
//
// This script modifies how avatars are displayed for Twitter's new Retweet
// functionality into something that I think makes more sense: the retweeter's
// avatar (whom you are following) is restored to the primary view, and an inset
// is added for the retweet source.
//
// - @lhl
//
// Thanks Taylor (@gtmcknight) for the Twivatar pointer!
//
// TODO:
// * BUG: after RT, "timeline-changed" event doesn't get triggered.  maybe need
//        another bind then...
// * RFE: allow swapping of inset avatar
//
// Changelog
// ---
// 2009-11-20 - v1.1.0 - Added option of swapping the inset avatar
// 2009-11-20 - v1.0.2 - Changed RT parsing to a:href to fix "you" retweeted
// 2009-11-19 - v1.0.1 - Changed border color of inset avatar to #666
// 2009-11-19 - v1.0.0 - Initial Release


// Load Twitter's jQuery
$ = unsafeWindow.jQuery;

retweet_avatar = {
  inset_retweeter: 0,
  rt: null,
  scan: function() {
    rt = $(".retweet-meta:not(.retweet-modified)");
    rt.each(retweet_avatar.update_tweet);
    // console.log("done w/ scan!");
  },
  update_tweet: function(i) {
    var friend = $(this).find("a").attr('href').slice(1);
    var friend_avatar = "http://twivatar.org/" + friend;
    var status = $(this).parent().parent();
    var thumb = status.find(".thumb");
    // console.log(thumb.html());

    if(retweet_avatar.inset_retweeter) {
      // The retweeter avatar is moved into the inset position
      thumb.after('<span class="thumb vcard author" style="border:1px solid #666; background:white; top:44px; left:26px; width:24px; height:24px"><a class="tweet-url profile-pic url" href="http://twitter.com/' + friend + '"><img class="photo fn" style="width:24px; height:24px" width="24" height="24" src="' + friend_avatar + '/mini"/></a></span>');
    } else {
      // The original source avatar is moved into the inset position
      thumb.before('<span class="thumb vcard author"><a class="tweet-url profile-pic url" href="http://twitter.com/' + friend + '"><img class="photo fn" width="48" height="48" src="' + friend_avatar + '"/></a></span>');
      thumb.css({"border":"1px solid #666", 
                 "background":"white",
                 "top":"44px",
                 "left" : "26px", 
                 "width" : "24px", 
                 "height" : "24px"});
      thumb.find("img").css({"width" : "24px", "height" : "24px"});
    }

    // Mark to not be redone on later scans
    $(this).addClass("retweet-modified");
    //console.log("done w/ update_tweet!");
  }
}

// Init
retweet_avatar.scan();

// Anytime the timeline changes
$("#timeline").bind("timeline-changed", retweet_avatar.scan);
