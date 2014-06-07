// ==UserScript==
// @name           Unfriend Finder
// @namespace      unfriend_finder
// @description    Script that allows you to know who has removed you on facebook.
// @author         http://www.facebook.com/doudou
// @homepage       http://www.unfriendfinder.fr/
// @include        htt*://*.facebook.com*
// @version        22
// @exclude        http://*static*.facebook.com*
// @exclude        http://*channel*.facebook.com*
// @exclude        http://developers.facebook.com/*
// @exclude        http://upload.facebook.com/*
// @exclude        http://www.facebook.com/common/blank.html
// @exclude        http://*onnect.facebook.com/*
// @exclude        http://*acebook.com/connect*
// @exclude        http://www.facebook.com/plugins/*
// @exclude        http://www.facebook.com/l.php*
// @exclude        http://www.facebook.com/ai.php*
// ==/UserScript==
//
//
//
//                              Unfriend Finder is Copyright (c) 2010, Hd-q
//                                           

//
//
// Unfriend Finder
// Last changes: 05/11/2010 03:22pm, dev build 22.996
//
// Main Changes:
//
// Version 22:
//  [*] Fixed a bug affecting the navigation keys on Facebook.
//  [*] Fixed a new bug when removing a pending request from the profile itself, the script said that the user ignored
//      the friend request.
//  [+] Added the possibility to report the Update bubble after two days.
//  [+] Added a feature that displays the old name of a profile under its new name.
//  [+] Added a close box to hide a notification from the script.
//  [+] Added links to Hide all unfriends, reappeared, ignored/accepted requests, and to cancel all pending requests.
//  [*] Fixed lag while typing on Chrome.
//  [*] Fixed filter issue on Chrome after some Facebook changes.
//  [*] Changed design on lists.
//  [*] Fixed design issues.
//  [-] Removed "Debug" in Settings, it's now recommended to use tools like Firebug or Javascript Console to get debug messages.
//  [-] Removed overlays on welcome and help messages.
//  [+] Added Kurdî.
//
// Version 21:
//  [*] Appearance updated
//  [*] Updated Filters style.
//  [+] Added a check for redondant deactivated profiles. They will not show up if deactivated after 1day of reactivation.
//  [*] Languages updated. Thanks to all contributors.
//  [+] Re-added Beeper for reactivated profiles.
//  [*] Performances improved.
//
// Version 20:
//  [*] Major rebuilt, code rewrited with more classes.
//  [+] Added Chrome compatibility.
//  [+] Added Opera compatibility.
//  [+] Added Safari compatibility, only on MacOS X.
//  [*] Changed the way to get the Env.user value.
//  [*] Fixed a bug that marked all new friends as "Reactivated".
//  [-] Removed GoogleSearch, unused and not working anymore.
//  [+] Added the ability to hide information message about unfriend/ignored request.
//  [+] Added the ability to reset certain values from the Reset tools in Settings.
//  [+] Added Message Center, in replacement of FanPage stream.
//  [+] Added Català, thanks to Hielo Tekmeka.
//  [+] Added Македонски, thanks to Гоце Т.
//
// Version 19:
//  [*] Fixed filter issue with different Facebook HTML.
//  [*] Changed the friends database to friends_page_search.php, more powerful.
//  [*] Fixed awaiting requests bug.
//  [*] Fixed broken notifications.
//  [*] Fixed broken information message when removing a friend.
//  [*] Fixed "Unfriends" filter position under "Friends".
//  [+] Added Português, thanks to Afonso Sousa, Ricardo Godinho & Claudia Panizza.
//  [+] Added Bosanski, thanks to Adnan Jusic.
//  [+] Added Shqip, thanks to Agon Ramizi.
//  [+] Added Български, thanks to Ivaylo Mateev.
//  [+] Added Čeština, thanks to Marek Bodinger.
//  [+] Added Bahasa Indonesia, thanks to Dhadan Mstr Dee.
//  [+] Added Polski, thanks to Michal Dobrowolski.
//  [+] Added Magyar, thanks to Peter Csaszar-Cs.
//
// Version 17:
//  [+] Added a Like Box.
//  [+] Added automatic language tool, to help you choose the right language according to Facebook's
//  [+] Added Русский, thanks to Gene Gisin.
//  [+] Added Bahasa Melayu thanks to Bateri Eye N C.
//  [+] Added 日本語 thanks to Flora Bui.
//  [+] Added Dansk thanks to Nick Kristensen.
//  [*] Fixed display bugs.
//  [*] Fixed issue with "Always Hide" feature.
//  [*] Updated other languages.
//  [*] Updated the Settings button on the Welcome screen.
//  [*] Enhanced the "Update profile picture" feature.
//
// Version 16:
//  [+] Added Leet Speak thanks to Foulques Du Peloux De Praron. :))
//  [+] Added Arabic thanks to Gassan Khoury.
//  [+] Added Hebrew thanks to Omri Ossie & Gassan Khoury.
//  [+] Added English (Upside Down) language.
//  [+] Added "Awaiting requests" & "Settings" filter.
//  [+] Added settings to the Homepage, old settings will be removed in future versions.
//  [*] Updated broken notifications due to Facebook changes.
//  [*] Fixed uiButton design, after Facebook changes.
//  [*] Updated left filter.
//  [*] Fixed the 'undefined' bug in Unfriends List.
//  [*] Fixed "Always Hide" feature.
//
// Version 15:
//  [*] Major rebuilt, code rewrited, using more classes, waiting the Facebook page to be fully loaded, minimizing errors.
//  [*] Updated the way to differentiate unfriends and deactivated profiles.
//  [+] Added Swedish thanks to Torbjörn Lygren.
//  [+] Added Traditional Chinese thanks to acedia0915.
//  [+] Added Finnish thanks to Teemu Pohjalainen.
//  [+] Added Dutch thanks to Emmanuel Gounaropoulos.
//  [+] Added Greek thanks to Emmanuel Gounaropoulos and Panayiotis Panos.
//  [+] Added German thanks to Simon Zöllner.
//  [+] Added Croatian thanks to Karmela Mestrovic.
//  [+] Added Norwegian thanks to -Mats Bakken.
//  [+] Added Turkish thanks to Emre Kep.
//  [+] Re-added Beeper that Facebook removed.
//  [+] Highlighting new unfriends/reappeared/requests ignored and accepted.
//  [+] Displaying old filters on every /friends/?filter=* page.
//  [+] Added "Always Hide" function to hide permanently redondant Unfriends.
//      Hold shift key when clicking "Hide".
//  [+] Unfriends check date are stored and displayed on lists.
//  [+] Cancel detection of unfriend when removing friend by yourself, can be disabled by setting.
//  [+] Opacity of profile picture  changed to 0.4 for profiles deactivated.
//  [+] Added contextual Help on first v15 launch.
//  [+] Added a tool to export/import all data.
//  [+] Added new setting Beeper when changing a setting.
//  [+] Added new reappeared Beeper when a profile is reactivated.
//  [+] Added new friend Beeper when someone accept your friend request.
//  [-] Script won't hide right ads anymore, use an adblock or another script to hide Facebook ads.
//  [*] Fixed a lot of display bugs.
//  [*] Fixed Multi-notification bug for the same profile, due to a Facebook issue.
//  [*] Enhanced notifications, maximum 5 notifications are displayed.
//  [*] Fixed "Update Profile Pictures" setting, that sometimes gives silhouette.
//      Using the new graph API.
//  [*] Rebuilded Welcome messages.
//  [*] Updated the way to write that the profile was in your friendlist/ignored your friend request.
// 
// Version 14:
//  [*] Fixed Facebook changes that hide the filter on the left.
//  [*] Fixed Beeper display bug.
//  [*] Hiding loading indicator when got no unfriends but many reappeared profiles.
//  [*] Fixed the "Showing Button" Loop due to Facebook Connect.
//
// Version 13:
//  [*] Fixed Missing link in menubar.
//  [*] Language update: Slovesnky
//
// Version 11:
//  [+] Added new list layout to fit in the Facebook Redesign
//  [+] Added Simplified Chinese, thanks to Luke Davies & Richard Li (Grammar Correction)
//  [*] Fixed "Profile Picture Cache" of facebook.
//  [*] New settings handler, more flexible.
//
// Version 10:
//  [*] Fixed Facebook redesign bug.
//  [+] Added Armenian (Հայերեն), thanks to Aram Bayadyan.
//  [?] Script copyrighted and released under Creative Commons.
//
// Version 9:
//  [*] Fixed critical bug.
//  [*] Updated Serbian
//
// Version 8 :
//  [*] Fixed bug that gives lots of notifications on ignored requests.
//  [*] Languages: Serbian and Slovakian completed.
//  [*] Fixed different bugs when removing unfriend/awaiting request.
//  [*] Lots of little display and behavior enhancements on lists.
//      [+] Animation when hiding Unfriend/Awaiting request/Reappeared.
//      [*] Fixed Tooltips display and behvior.
//      [*] Displaying "No Unfriend" and "No Awaiting Request" when removing the last item of the list.
//  [*] Lots of little display and behavior enhancements on notifications and beeper.
//      [*] Fixed Beeper selection.
//      [*] Hide Beeper when opening notification tab.
//      [*] Fixed notification fade animation to white.
//      [*] Hide notification counter when notification tab is already open.
//  [*] Improving notifications engine on id storage.
//
// Version 7 :
//  [*] Tiny bug fixed about \u prefix for non-ascii chars in Unfriend or awaiting names.
//  [+] Added new languages : French, Español, Italiano. Serbian, Slovakian, in progress.
//  [+] Added facebook Dialog integration.
//  [*] Notifications enabled by default.
//  [+] Added getting started's contextual dialog to lead new user to a better experience.
//  [*] Fixed "No Unfriends" display on other lists
//  [*] Fixed other display issues.
//  [+] Added new information on the profile box, to know is current profile was in your friendlist or ignored your last friend request.
//  [+] Added emergency reset in the Greasemonkey Menu.
//
// Version 6 :
//  [*] Fixed notifications.
//  [*] Fixed "undefined" names
//  [*] Fixed "Unfriend" list replaced by the "Recently Updated" list
//  [*] Fixed awaiting requests that reappears after being removed.
//  [+] Added "BeeperBox" to notify user from Unfriends, Ignored requests, and new script version.
//
// Version 5 :
//  [*] Fixed critical bug, Unfriends and Awaiting requests are hidden.
// 
// Version 4 :
//  [+] Core rewrited with class collections to handle more easily lists.
//  [+] Added update checker with button in toolbar.
//  [+] Added the state "Reappeared"
//  [*] Due to a facebook bug, changing url to retrieve all friends. Removed superfriends.php, added typeahead_search.php
//  [+] Fixed graphic bug on Unfriends bubble.
//  [+] Command registered for refreshing menubar link. (Access by rightclicking greasemonkey's head in firefox statusbar)
//  [+] Added googleSearch functionnality, to automatically search for profiles without information.
//  [+] Added notifications.
//  [+] Added settings panel :
//      [+] Added panel to manage profile display
//      [+] Added panel to export or import backups //no privacy issues.
//      [+] Added panel to manage googleSearch
//      [?] Language can't be changed at this time.
//      [+] Added panel to reset all settings.
//
// Version 3 :
//  [*] Fixed several bugs on design
//  [+] Ignored/Confirmed friend requests are shown
//  [*] Ability to remove pending request from "Awaiting List"
//  [*] Hiding tooltip "Hide unfriend", when removing one.
//  [+] Fixed bug "missing unfriends infos"
//  [+] Added the state "Profile being deactivated"
//
// For questions about all changes, check and post on :
//
// Fanpage : https://www.facebook.com/pages/Ingenieur-dinformatique/363691286986626
//