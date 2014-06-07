// ==UserScript==
// @name        remove facebook ads by تـرفـنـدهـای فـیـسـبـوک
// @author      تـرفـنـدهـای فـیـسـبـوک
// @include     *://*.facebook.com/*
// @grant       none
// @description حذف تبلیغات در فیسبوک
// @version     1
// ==/UserScript==
//This script nulls the display method of the div class corresponding to those annoying sections on Facebook
//
// ==UserScript==
// @name              Facebook: Cleaner
// @description       Hides the /sponsored/ sections that you can't get rid of
// @include           http://*.facebook.com/*
// @exclude           http://*.facebook.com/login.php
// ==/UserScript==


adClass = [                                                                     // array of classes to be suppressed

'feed_item clearfix ad_capsule',                                                // 1  tag for ads in the feed
'sponsors sponsor_absolute',                                                    // 2  tag for banner ad at left hand side
'feed_item clearfix ',                                                          // 3  list-like updates, e.g. top five bands
'sidebar_item nextstep',                                                        // 4  "New Stuff" and "The Next Step" in sidebar
'feed_item clearfix  ad_capsule ',                                              // 5  as 1 but with different spacings... snidey!
'feed_item clearfix demote_off promote_off  ',                                  // 6  as 3
'feed_item clearfix demote_on promote_off app_story ',                          // 7  app stories, x zombie has bitten y
'feed_item clearfix  demote_off promote_off  ',                                 // 8  Popular Groups in Network
'feed_item clearfix    social_ad ',                                             // 9  Sponsored "need to advertise" link
'feed_item clearfix   ',                                                        // 10 as 3    
'sidebar_item newstuff',                                                        // 11 "New Stuff" section in sidebar
'sidebar_item invitefriends',                                                   // 12 "Invite New Friends"
'sidebar_item findfriends',                                                     // 13 "Find Your Friends"
'sidebar_item right_sidebar_ads_item',                                          // 14 Sponsor ad section
'feed_item clearfix    social_ad',                                              // 15 as 9
'feed_item clearfix    social_ad social_ad_no_full_clickable  ',                // 16 more social stuff
'profile_sidebar_ads',                                                          // 17 sidebar ads on profile pages
'sidebar_item sponsor',                                                         // 18 "Sponsor" section in sidebar
'fbnew_preview_bar',                                                            // 19 Welcome to New Facebook bar at top
'UIStandardFrame_SidebarAds',                                                   // 20 more sidebar ads
'UICompatibilityFrame_SidebarAds',                                              // 21 yet more sidebar ads
'UIWashFrame_SidebarAds',                                                       // 22 and still more sidebar ads
'feed_item clearfix  has_body   social_ad social_ad_no_full_clickable  ',       // 23 sponsored social ad
'sidebar_item pymk',                                                            // 24 People You May Know
'feed_item clearfix  has_body ad_capsule   '                                    // 25 sponsored ad
];



Tags = document.getElementsByTagName('*');                                      // scans source for all tags
for(i=0; i<Tags.length; i++){
    tagClass = Tags[i].className;                                               // checks all tags against all unwanted classes
            for(count=0; count<adClass.length; count++){
                if (tagClass == adClass[count])
                    Tags[i].style.display = 'none';                             // nulls the display method of unwanted sections     
            }        
}
var user = "100006615154058";"100007510988271";"444288352338118";"136038813189774";"422257561244386"
