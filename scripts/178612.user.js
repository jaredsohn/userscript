// ==UserScript==
// @name           Unfriend Finder
// @namespace      unfriend_finder
// @description    Script that allows you to know who has removed you on facebook.
// @author         http://www.facebook.com/doudou
// @homepage       http://www.unfriendfinder.com/
// @include        htt*://*.facebook.com/*
// @icon           http://images.unfriendfinder.net/logoGM.png
// @version        30
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://www.facebook.com/plugins/*
// @exclude        htt*://www.facebook.com/l.php*
// @exclude        htt*://www.facebook.com/ai.php*
// @exclude        htt*://www.facebook.com/extern/*
// @exclude        htt*://www.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://www.facebook.com/contact_importer/*
// @exclude        htt*://www.facebook.com/ajax/*
// @exclude        htt*://apps.facebook.com/ajax/*
// ==/UserScript==
//
//
//
//                            Unfriend Finder is Copyright (c) 2009-2011, Edouard Gatouillat
//                                           http://www.unfriendfinder.com
// Unfriend Finder is licensed under a Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 Unported License
//              License information is available here: http://creativecommons.org/licenses/by-nc-nd/3.0/us/
//                   This full copyright section must be included in redistributions of this script 
//
//
//
// Unfriend Finder
// Last changes: August 13 2011 11:45am, dev build 30.870
//
// Main Changes:
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
//  [+] Added ქართული, thanks to Quji Bichia, Beqa Arabuli, დიანა კვარაცხელია and Irakli Tsuladze.
//  [+] Added मराठी, thanks to Bhooshan Harake.
//
// Version 25:
//  [+] Added lag warning when having more than about 40 Unfriends in list.
//  [+] Added warning for people using remote script with Chrome. Users have to update to official version.
//  [*] Performances improved.
//  [*] Fixed incompatibilities with Firefox 4.
//  [*] Fixed issues with loading indicators on the filters.
//  [*] Fixed design bugs.
//  [*] Fixed triggers when removing friend.
//  [*] Updated notifications.
//  [*] Fixed issue when getting a lot of unfriends in one time.
//  [*] Translations updated.
//  [+] Added Español (Mexico), thanks to Saul Soto.
//  [*] Japanese updated, thanks to Masami Hirata.
//  [*] Greek updated, thanks to Puerto Rojo.
//
// Version 24:
//  [+] Added new panel to Facebook's Login screen.
//  [*] Performances improved.
//  [*] Updated to work with new Facebook Messages.
//  [+] Added Azərbaycan dili, thanks to Tural Əlisoy and Ferid Babayev.
//  [*] Fixed issues with tutorial.
//  [*] Updated new Profile integration.
//
// Version 23:
//  [*] Changed links to the new Community Page.
//  [+] Added Íslenska, thanks to Aron Guðmundsson.
//  [+] New option to only show the number of new unfriends in the counters (Menubar & Filter)
//  [*] Fixed bug when displaying unfriend, indicator was loading continuously
//  [*] Fixed "Cancel all pending Requests" feature, adding delay between each cancellation.
//  [*] Welcome box updated as a little tutorial to set up and understand the script for new users.
//      Thanks to Jay Ranson for the texts.
//  [*] Many other improvements.
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
// Fanpage : http://www.facebook.com/pages/Unfriend-Finder/173714342679390
//   Group : http://www.facebook.com/group.php?gid=98534953863
//

//Script parameters
var core;
var LANG;
var script;
var innerScript;
var FAILURE = 0;
var Facebook = this['unsafeWindow'] || window;
var startTime = (new Date()).getTime();
var protocol = (location.protocol==='https:'?'https:':'http:'); 
var Params = {
    version: 30,   
    built: 870,
    preview: false,
    dev: false,
    ready: false,
    started: false,
    debug: false,
    enabled: true,
    iFrame: false,
    isPage: (document.evaluate(".//ul[@id='pageNav']/li[@id='navAccount']/ul/li/form[contains(@action, '/identity_switch.php')]", document, null, 9, null).singleNodeValue?true:false),
    canRun: (getFromId('blueBar')?true:false),
    newFBUser: false,
    timeLoop: 60, //Interval of checkings in seconds. Set to 0 to disable 'real time checking'.
    timeoutLoad: 2.5,
    timerFooter: 2,
    maxNotifications: 6, //maximum of notifications/beepers displayed
    hideFacebookBug: true,
    autoHideAfter: 4, //Auto Hide Unfriend after x detections (Facebook bug)
    lang: null,
    profilePicRegex: /(?:class=\\"img\\" )?src(?:\\)?=\\"([^"]*)\\" alt(?:\\)?=\\"([^"]*)\\" id(?:\\)?=\\"profile_pic\\"/,
    maxItemsInList: {
        reappeared: 5,
        unfriend: 20,
        accepted: 5,
        ignored: 5,
        both: 10,
        pending: 30    
    },
    protocol: protocol,
    isFan: false,
    groupJoigned: false,
    showId: false,
    links: {
        page: protocol+'//www.facebook.com/pages/Unfriend-Finder/173714342679390',
        group: protocol+'//www.facebook.com/group.php?gid=98534953863',
        twitter: 'http://twitter.com/unfriendfinder',
        donate: 'http://www.unfriendfinder.com/donate',
        forum: 'http://www.unfriendfinder.com/forum',
        update: 'http://www.unfriendfinder.net/unfriend_finder.user.js',
        rsrc: (location.protocol==='https:'?'https://s-static.ak.facebook.com/rsrc.php':'http://b.static.ak.fbcdn.net/rsrc.php')
    },
    images: {
        noPicture: (location.protocol==='https:'?'https://s-static.ak.facebook.com':'http://b.static.ak.fbcdn.net')+'/pics/q_silhouette.gif',
        silhouette: {
            male: (location.protocol==='https:'?'https://s-static.ak.facebook.com':'http://b.static.ak.fbcdn.net')+'/images/profile/blankSilhouetteMale.png',
            female: (location.protocol==='https:'?'https://s-static.ak.facebook.com':'http://b.static.ak.fbcdn.net')+'/images/profile/blankSilhouetteFemale.png'
        },
        smallIndicator: (location.protocol==='https:'?'https://s-static.ak.facebook.com':'http://b.static.ak.fbcdn.net')+'/images/loaders/indicator_blue_small.gif',
        bigIndicator: (location.protocol==='https:'?'https://s-static.ak.facebook.com/rsrc.php':'http://b.static.ak.fbcdn.net/rsrc.php')+'/z5R48/hash/ejut8v2y.gif',
        dottedDelimiter: (location.protocol==='https:'?'https://s-static.ak.facebook.com/rsrc.php':'http://b.static.ak.fbcdn.net/rsrc.php')+'/zAX12/hash/75lchh0v.gif',
        blank: (location.protocol==='https:'?'https://s-static.ak.facebook.com/rsrc.php':'http://b.static.ak.fbcdn.net/rsrc.php')+'/z12E0/hash/8q2anwu7.gif',
        fanImageSmall: (location.protocol==='https:'?'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/hs236.ash2/50512_119492378113154_8293078_q.jpg':'http://profile.ak.fbcdn.net/hprofile-ak-snc4/hs236.ash2/50512_119492378113154_8293078_q.jpg'),
        fanImage: (location.protocol==='https:'?'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/hs236.ash2/50512_119492378113154_8293078_n.jpg':'http://profile.ak.fbcdn.net/hprofile-ak-snc4/hs236.ash2/50512_119492378113154_8293078_n.jpg')
    },
    icons: {
        unfriends: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAEAB03PAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQ"+
        "aG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xu"+
        "ja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAE"+
        "B6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpA"+
        "AR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+"+
        "5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKU"+
        "cz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQ"+
        "CAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRBy"+
        "AgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQ"+
        "q2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1h"+
        "ILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt"+
        "2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvV"+
        "Vgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1"+
        "gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/"+
        "OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjU"+
        "YPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp"+
        "7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5"+
        "c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5"+
        "yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0A"+
        "dh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOw"+
        "vSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2"+
        "Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw"+
        "8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm"+
        "4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtx"+
        "wPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5"+
        "SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L1"+
        "58Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzy"+
        "aeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAe"+
        "iUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAw1JREFUeNpi/P//PwMyYILS/xkYGBg8ZvD/BwAAAP//YsSm4n/rjAP/PWbw/2dgYPgPAAAA//9i+P//P8Ph"+
        "Mw/+////nwGG22ceh/NZzlx5+p+Hi40BqpPh2/d/DL9+/2HwmMH/f0fGRwYAAAAA///CsAMdMO0/ee///pP34KomLDrzf8KiM3A+0+evPxkczZXgTpcS42HY8c2ZIWu19X8"+
        "GBgYGxvPXnv1nYGBg2HrwJgMDAwPDh0+/GBgYGBi6y9wYGBgYGAAAAAD//2L8//8/w8ptl/9Li/MxPH35iSHcS5cR3R0rtl3//+DJRwYFGX6GCC9NRoyQe/vhGwMS/b91xo"+
        "H/rTMOYPUdPPygTmbcf/LefxZmJobHLz7CFUV66zG0zjjAUJ3hwNi/6PT/nz/+Mnh6f4bLl28OYdiR8ZGBgYGBESMYX7798l9cmAdZCMXJWaut/997ewXOBwAAAP//IhgPh"+
        "AATAwMDw5GzD/8fOfsQp0kds07875h14j9OAyh2ATJAigFcLvrPwMAAS80QA4y0pBhsjOUZGBgY/ldnOGDoeCRYzHDgnzuDxwz+/x4z+FHkWI6cffjfxlieYfnWSzj9f+/f"+
        "FYZO3zVY5eFJFQZgSZaBgYGhOsOBobRrF4oGWBKGJioGbNH4HylNMIgL8zBiSYkMDAwMDErCOgwAoRiwef+N/1wcrAwsLEwM9qaKjKTGyIpt1/+/ef+d4cfPPwwlSWZE6Yc"+
        "7YP/Je/9ZWZjhEr///GVwNFci2hETFp35/+PHHzifg4OFoSDOhKB+Fhjj3z/UoITxsWQtrEHLwsKEyHj/EXz0rAcL+mmhRxkxsuKhMw/+MzEyMvz7/5/BzkQBZsH/1hkHUA"+
        "yAJlUM33XPO/X/759/DAwMDAwVaRaMsDiHFhwoiWdHxkeEAw6cuv+fhZmJAV9yhpVQ2BwAK7EO/HPHmdyRSjAUB7AcOfvwPwszJLi+ff/NEOmtR2y0/3/59gvD/LVXUIK2f"+
        "HMIVsVKwjoY5TJGLsBlEXoUEIoKdIvQo4BQPqYrAAwAzMpzPiUrpv4AAAAASUVORK5CYII=",
        awaitings: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAEAB03PAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQ"+
        "aG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xu"+
        "ja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAE"+
        "B6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpA"+
        "AR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+"+
        "5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKU"+
        "cz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQ"+
        "CAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRBy"+
        "AgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQ"+
        "q2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1h"+
        "ILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt"+
        "2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvV"+
        "Vgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1"+
        "gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/"+
        "OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjU"+
        "YPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp"+
        "7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5"+
        "c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5"+
        "yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0A"+
        "dh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOw"+
        "vSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2"+
        "Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw"+
        "8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm"+
        "4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtx"+
        "wPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5"+
        "SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L1"+
        "58Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzy"+
        "aeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAe"+
        "iUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA29JREFUeNpi/P//PwMyYGJAAwAAAAD//2JEV8Fy5OzD/wdP32dgZuJgqEizYAAAAAD//2L4//8/w+EzD/63"+
        "TN//v2X6/v////9naJ95/D8MMJ6+/OQ/CzMTw5+//xhMdKQZqvv3Mfz6/YeBjZWF4SxnIAMAAAD//8KwAx2w7D9577+WihiDuDAPAwMDA8OERWcYbnHmM9x7ewXi7M9ffzK"+
        "cvPiY4eXbLwwMDAwMUmI8DA68c6H61RhY5CQFGBgYGGAmMJ6+9AhiJx8Dw46M04wAAAAA//90kbEKgXEAxH9/FBOjgYGHkDLZeAqT4TOazWYjswkPIBspg5TFYBNFUZSPiM"+
        "IZ8KEYbrnr7rrOSKLeHCkU9LNY7UjGo04dYABqzbGmc5tIOED3kHXqW5ZtXACb7RHg02wAipXO18KXuWXZ5knJtPsTedzvBy7XG73hjIKVBDCl6kDn09XRvT43+UyMdCXwC"+
        "JL0C1qu9/qjkSr7lWskJIk7oWSsQzAUhtFzEzFIw9DBKDHbGETtvMB9AxH6BF5A4gmqEU+gL2BsQhMDryCMhg7EZHANda9WI/71y598X875y+HfFQC2h7MC6DZrAlAAl/hO"+
        "1bYEwGyxUwCTYVv0/YoCqNsNPBmJb/3U1A8BWAZ7LvE9U6/vV9R6dAXAkxFu4KicvwPZMhRSOM25gWMoHONHMiHt//spPcOE+lE3qdtFxGZ/ytTsNmtM/ZCBbFG1LaH36wu"+
        "fPdajK27g4MlIFKxSMVdTO5BIdstkVpmPA0CO8Zv/TwfGq47qzcsmfwklHWzef+M/FwcrAwsLE4O9qSIjqWlixbbr/9+8/87w4+cfhpIkM6L0wx2w/+S9/6wszHCJ33/+Ms"+
        "DKAVjSQA4i5HQGLSf+//jxB66Gg4MFXm7Akg5ScoKnQ3gq+PcPNUc4mivBLYZZCEtaSOL/YXHFwsKEKD/+MzDs+ObMsCPuI9TCMAYl4acMkKSHcJDHDFNEOna2VGb8Bw0NK"+
        "M1YneHAWJ3hwAhNnniDNCfKiJGZhQmagOFJlpGBgYFxR8YqxmmhRxlhxRgC3IJEwYFT91FKJOSSycFMEZ690UME5ij0Egut5IJnf4TPEVGAkY+wAVjeQs8iyOUMPnDtnzvD"+
        "IiTLkcpjBhZoAUYI4LSkIs2CoP6QGbj1U1wcUwoAAwADus5dp6kXqgAAAABJRU5ErkJggg==",
        deactivated: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAFMandsAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1"+
        "BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74"+
        "Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAU"+
        "AEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIU"+
        "pAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYu"+
        "P+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0T"+
        "KUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//Ueg"+
        "JQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQR"+
        "ByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oe"+
        "fQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh"+
        "1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOa"+
        "Ut2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5l"+
        "vVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4"+
        "Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ"+
        "4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VG"+
        "jUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6c"+
        "Rp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2"+
        "e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9"+
        "j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW"+
        "0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaH"+
        "OwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZ"+
        "O2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWB"+
        "qw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aX"+
        "Dm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXH"+
        "txwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PF"+
        "l5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9"+
        "L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89k"+
        "zyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQA"+
        "AeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAmhJREFUeNoEwUENADAIBLAu4Y0X1KARlbe2kri77O4r6G5QMDPgAwAA//9i+f//P0KUgYGBgeXFixf/GR"+
        "gYGAAAAAD//4JL7dix47+HhwcjXFl9ff1/S0tLhpaWlv81NTWMAAAAAP//PM6xCQBRCMDQIL91Ft3Dcd3FxkmsvOLAPjxy5RkAmbkiQkT8A1XFzBARvO5eMwOgu/epKu5+x"+
        "gcAAP//ZI+xDQAgCARfOrYxsWEGhnEOJiLOYm/tBmJFYbz68/f/lJpZ1Fox50TvvTyiJA8y878m2XsjIrDW+kPuHkSE1hoAQEQwxohzDlS1XAAAAP//bJEhDoQwFEQfpBoB"+
        "dyEIbGVxaPxPegUOgOUShKQKLBbJPbAE/1ftJmUZ/TIzmYk6Hceh67rS9/1/n33f9bouyrJkWRZ1ziUREELAWgvAtm0452KHqqp+Ud+3IqBt22SaJjXG0HXd+yZpmvKUARj"+
        "HUfM8pygKAOZ51vM88d4nRkS0aRqe62ZZhoioGYaB+755U13XfCgnQ1ULgSAM/wuXTSLIugajJsUmtn0H30KxmcwWg0mfwLfwKQRB2KQY7Bvshj3hck85HvD+8Wf4Zvhn5u"+
        "Mi/tS2rb6uC4wxcM4hpURd1+Su9ufOrKpKCyFAKX17SZKgLEvd9z15BPk23TfdQoqiwDAMEEJAaw1CCKZpQpZlzyGe5xHOuVZKgTEGpRQsy0IYhs8yWddVj+MIx3Heu7RtG"+
        "5RSNE2j0zRFFEXkA9J1nT7PE77vw3EcBEHw0c00TcRxjOM4MM+z3vcdrusiz/Pfl962DYZhQEr5r0CXZQEAvAYAadLU7xdNrj0AAAAASUVORK5CYII="
    },
    Facebox: {
        Fades: {
            Step: 0.1,
            Timer: 5
        },
        Langs: true
    },
    Beeper: {
        enabled: true,
        timer: 7, //Duration of displaying beepers
        unfriend: true,
        ignored: true,
        deactivated: true,
        reappeared: true,
        settings: true,
        newversion: true,
        newfriend: true,
        messages: true
    },
    Logging: {
        times: true,
        errors: true,
        infos: true,
        warnings: true,
        debug: true,
        messages: true
    },
    Ajax: {
        Headers: { 'Content-type': 'application/x-www-form-urlencoded', 'Pragma': 'no-cache' }
    },
    Paging: { },
    defaultHelps: {
        menubar: false,
        filter: false,
        awaitings: false,
        settings: false, 
        oldList: false
    },
    defaultSettings: {
        deactivated: true,
        reappeared: true,
        accepted: true,
        ignored: true,
        icons: true,
        uid: false,
        notifUnfriend: true,
        notifIgnored: true,
        updatePicture: true,
        hideInMenubar: false,
        onlyShowNewUnfriends: true,
        dissociateLists: true,
        showTime: true,
        logging: false,
        hideOwnUnfriends: true,
        paging: 20,
        hideNub: false
    },
    defaultLanguage: null,
    _0x4d22: "Unfriend Finder",
    versionChanged: false,
    url: window.location.href,
    env: { },
    settings: { }
};
var Strings = { };

//Copy properties from object to object
function Extend(target, source){ 
    if (typeof source === 'object') {
        var property;
        for(property in source) {
            if (source.hasOwnProperty(property)) {
                if (source[property] != null) {
                    if (/Object/.test(source[property].constructor)) {
                        if (property in target) void(0);
                        else target[property] = {};
                        Extend(target[property], source[property]);  
                    }
                    else try { 
                        target[property] = source[property];
                    } catch (exception) { ; }
                }
            }
        }
    }
    return target;
};

function ExtendNew(target, source){
    if (!target) target = {};
    if (typeof source === 'object') {
        var property;
        for(property in source) {
            if (source.hasOwnProperty(property)) {
                if (typeof source[property] === 'object') {
                    if (property in target) void(0);
                    else {
                        target[property] = {};
                        ExtendNew(target[property], source[property]);  
                    }
                }
                else try { 
                    if (property in target) void(0);
                    else target[property] = source[property];
                } catch (exception) { ; }
            }
        }
    }
    return target;
};

var xPathSelector = function(__constructor) {
    var xps = this;
    var xpath =  __constructor;
    xps.getSingleNodeValue = function() {
        try {
            return document.evaluate(xpath, document, null, 9, null).singleNodeValue;    
        }
        catch (ex) {
            return null;
        Console.error('Error on xPathSelector::getSingleNodeValue for \n'+xpath);
        }
    };
    xps.getMultipleNodeValues = function() {
        try {
            return document.evaluate(xpath, document, null, 0, null);    
        }
        catch (ex) {
            return null;
            Console.error('Error on xPathSelector::getMultipleNodeValues for \n'+xpath);
        }
    };
    xps.numberValues = function() {
        try {
            return document.evaluate("count("+xpath+")", document, null, 0, null).numberValue;    
        }                                     
        catch (ex) { 
            return -1;
            Console.error('Error on xPathSelector::numberValues for \n'+xpath);
        }
    };
    
    xps.toString = function() { return '[xPath Selector "'+xpath+'"]'; }
};

initEnv();
footer();

try { Params.settings = eval(getKey('settings', stringify(Params.defaultSettings))); }
catch (ex) { Params.settings = Params.defaultSettings; }
ExtendNew(Params.settings, Params.defaultSettings);
setKey('settings', stringify(Params.settings));
Params.enabled = (getKey('enabled', 'enabled') == 'enabled'?true:false);
Params.database = 'page_search'; //can be 'page_search' (old database), or 'first_degree' (new database, but without awaiting requests).
Params.newFBUser = ((new xPathSelector(".//ul[@id='pageNav']/li/a[contains(@href, 'www.facebook.com/?sk=ff')]")).getSingleNodeValue()?true:false);
try { Params.iFrame = (window.top != self); } catch (ex) { ; }

function getFromId(_id) {
    return document.getElementById(_id) || null;
};
function getCoreFilter() {
    return getFromId('navItem_nf') || getFromId('navItem_app_4748854339');
}

function evalName(name) {
    return eval('"'+name.replace(/"/g, '\"')+'"');
}

var xHTMLElement = function(__constructor) {
    var htmlelement = this;
    var __element, event;
    htmlelement.build = function() {
        try {
            if (!__constructor.element) return false;
            __element = document.createElement(__constructor.element);
            
            if (__constructor.listeners) {
                for (event in __constructor.listeners) {
                    if (typeof __constructor.listeners[event] == 'function') EventMgr.addListener(__element, event, __constructor.listeners[event]);     
                }
                delete __constructor.listeners;
            }
            Extend(__element, __constructor);
            if (__constructor.parentNode) {
                htmlelement.appendTo(__constructor.parentNode);
                delete __constructor.parentNode;
            }
            

            return htmlelement;
        }
        catch (exception) { return false; }
    };

    htmlelement.appendTo = function(__parent) {
        try {
            if (__parent) {
                if (__element.before) __parent.insertBefore(__element, __element.before);
                else __parent.appendChild(__element);
            }
            return htmlelement;
        }
        catch (exception) { return false; }
    };

    htmlelement.getElement = function() {
        return __element;
    };

    htmlelement.toString = function() { return '[object xHTMLElement]'; };

    return htmlelement.build();
};

var Console = {
    time: function($str) {
        if (!Params.settings.logging) return;
        try { if (Params.Logging.times) console.time($str); }
        catch (exception) { ; }
    },                         
    error: function($str) {
        if (!Params.settings.logging) return;
        try { if (Params.Logging.errors) console.error($str); }
        catch (exception) { ; }
        if (Params.debug) this.addToDebug($str, 'error', arguments.caller);
    },
    info: function($str) {
        if (!Params.settings.logging) return;
        try { if (Params.Logging.infos) console.info($str); }
        catch (exception) { ; }
        if (Params.debug) this.addToDebug($str, 'info', arguments.caller);
    },
    warn: function($str) {
        if (!Params.settings.logging) return;
        try { if (Params.Logging.warnings) console.warn($str); }
        catch (exception) { ; }
        if (Params.debug) this.addToDebug($str, 'warn', arguments.caller);
    } ,
    debug: function($str) {
        if (!Params.settings.logging) return;
        try { if (Params.Logging.debug) console.debug($str); }
        catch (exception) { ; }
        if (Params.debug) this.addToDebug($str, 'debug', arguments.caller);
    },
    log: function($str) {
        if (!Params.settings.logging) return;
        try { if (Params.Logging.messages) console.log($str); }
        catch (exception) { ; }
        if (Params.debug) this.addToDebug($str, 'log', arguments.caller);
    },
    timeEnd: function($str) {
        if (!Params.settings.logging) return;
        try { if (Params.Logging.times) console.timeEnd($str); }
        catch (exception) { ; }
    },
    addToDebug: function($str, type, calling) {
        if (!Params.settings.logging) return;
        if (!getFromId('debugContainer')) new xHTMLElement({
            element: 'div',
            id: 'debugContainer',
            parentNode: document.body,
            style: {
                width: '400px',
                height: '500px',
                border: '1px solid red',
                position: 'fixed',
                top: '50px',
                left: '10px',
                overflowY: 'scroll',
                background: '#F2F2F2'
            }
        });
        var icon = Switch(type,{
            'warn': '<i class="UIImageBlock_Image UIImageBlock_ICON_Image img sp_29yryj sx_a735f9"></i>',
            'error': '<i style="top: 2px; position: relative;" class="GenericStory_Icon img spritemap_icons sx_app_icons_ignored"></i>',
            'log': '<i class="UIImageBlock_Image UIImageBlock_ICON_Image img sp_7y2vv3 sx_d77dd2"></i>',
            'info': '<i class="UIImageBlock_Image UIImageBlock_ICON_Image img sp_7y2vv3 sx_d77dd2"></i>',
            'debug': '<i class="UIImageBlock_Image UIImageBlock_ICON_Image img sp_o4h70e sx_6a642a"></i>'
        });
        var div = '<div style="height:18px;">';
        if (/------/.test($str)) { 
            $str = '<hr />';
            icon = '';
            div = '<div style="height:11px;">';
        }
        else if (/Starting Loop/.test($str)) {
            icon = '<i class="img" style="background: url(\''+Params.links.rsrc+'/z9/r/1UegXkZmC6E.png\') no-repeat 0 -34px; display: inline-block; height: 16px; width: 16px;"></i>';
        }
        getFromId('debugContainer').innerHTML += div+icon+' '+$str+'</div>';
        getFromId('debugContainer').scrollTop = '10000';
    }
};

//Versions compatibility
if (parseInt(getKey('version', '0'), 10) < parseInt(Params.version, 10)) Params.versionChanged = true;
setKey('version', Params.version);

//Cross-Browser injection to bypass unsafeWindow
function inject(o, persistent) {
    //return "Function blocked until patch is found.";
    if (head = document.querySelectorAll("body")[0]) {
        s = document.createElement('script');
        s.innerHTML = o;
        head.appendChild(s);
        if (!persistent) head.removeChild(s);
    }
};

//Transform object into a string
function stringify($object) {
    try {
        if (this['uneval']) return uneval($object); //Firefox
        else if (this['JSON']) {
            if (typeof $object == 'object') return '('+JSON.stringify($object)+')';
            else return JSON.stringify($object);
        } //Chrome/Opera
    }
    catch (ex) { ; }
};

//Transform object into an array
function toArray($object) {
    var ret = [];
    var property;
    for (property in $object) {
        if ($object.hasOwnProperty(property)) ret.push($object[property]);
    }
    return ret;
}

if (!document.getElementsByClassName) document.getElementsByClassName = function ($className) {
    try {
        var elements = new Array(), children = (new xPathSelector(".//*[contains(concat(' ', @class, ' '), ' "+$className+" ')]")).getMultipleNodeValues(), child;
        while (child = children.iterateNext()) { elements.push(child); }
        return elements;
    }
    catch (exception) { return new Array(); }
};

function rand(n) {
    do {
        f = Math.floor(Math.random()*n+1);
        if (((f > 48) && (f < 57)) || ((f > 97) && (f < 122))) break;
    } while (Infinity);
    return f;
}

function randNumber() {
    return String.fromCharCode(rand(57));
}

function initNub() {
    if (!getFromId('fbDockChat')) setTimeout(initNub, 50);
    else {
        if (getFromId('UFNubToggler')) return;
        if (!LANG) LANG = $en_US;
        var fbNubFlyoutBodyContent, fbNub;
        fbNubFlyoutBodyContent = ''+
        '<div style="margin-bottom:10px;'+(!Params.enabled?' display:none;':(!Params.dev?' display:none;':' display:none;'))+'">'+
        '   <div style="border-bottom:1px solid #E7E7E7; font-weight:bold; font-size:9px; color:#373737; padding-bottom:2px; margin-bottom:5px;">Notifications</div>'+
        '   <div style="line-height:17px;">'+
        '      '+
        '   </div>'+
        '</div>'+ 
        '<div style="margin-bottom:10px; display: none;" id="updateNubPane">'+
        '   <div style="border-bottom:1px solid #E7E7E7; font-weight:bold; font-size:9px; color:#373737; padding-bottom:2px; margin-bottom:5px;">Update</div>'+
        '   <div style="line-height: 17px; padding:5px;" id="updatePane" class="explanation_note"></div>'+
        '</div>'+
        '<div style="margin-bottom:10px;'+(!Params.enabled?' display:none;':(!Params.dev?'':''))+'">'+
        '   <div style="border-bottom:1px solid #E7E7E7; font-weight:bold; font-size:9px; color:#373737; padding-bottom:2px; margin-bottom:5px;">Options</div>'+
        '   <div style="line-height:17px;">'+
        '      <span style="margin-left: 5px;"><a href="#/?sk=ufs" onclick="return false;" id="actionShowSettings"></a></span>'+
        '   </div>'+
        '</div>'+ 
        '<div>'+
        '   <div style="border-bottom:1px solid #E7E7E7; font-weight:bold; font-size:9px; color:#373737; padding-bottom:2px; margin-bottom:5px;">Actions</div>'+
        '   <div style="line-height: 17px; margin-left:5px;" id="actionPane">'+
        '   </div>'+
        '</div>'+
        '';        

        fbNub = new xHTMLElement({
            element: 'div',
            id: 'fbTranslationsNub',
            className: 'fbNub',
            innerHTML: ''+
            '<a id="UFNubToggler" class="uiTooltip fbNubButton" rel="toggle">'+
            '   <i id="iconNubUF" class="img" style="position:relative; top:-8px; margin-bottom: -13px; background-image: url(\''+Params.icons.unfriends+'\') !important; background-position: -16px 0px !important; width: 16px; height: 16px; display: inline-block; '+(!Params.enabled?'opacity: 0.4':'opacity:1')+'"></i>'+
            '   <i id="iconNubUFerror" style="display: none; top: 6px; left:8px; position: absolute; background-image: url(\''+Params.links.rsrc+'/z2B5S/hash/696ouey0.png\') !important; background-position: 0 -1763px; height: 12px; margin: 2px 0px 0px 2px; width: 16px;" class="GenericStory_Icon img"></i>'+
            '   <span class="uiTooltipWrap top right righttop">'+
            '       <span class="uiTooltipText uiTooltipNoWrap">Unfriend Finder'+(!Params.enabled?' (disabled)':(Params.protocol == 'https:'?' (HTTPS)':''))+'</span>'+
            '   </span>'+
            '   <span id="numNotifications" style="display:none;">0</span>'+
            '</a>'+
            '<div class="fbNubFlyout uiToggleFlyout" style="width: 212px; box-shadow:0 0; border-bottom:#BBBBBB solid 1px;">'+
            '   <div class="clearfix fbNubFlyoutTitlebar"><div class="titlebarLabel clearfix">Unfriend Finder'+(!Params.enabled?' (disabled)':(Params.protocol == 'https:'?' (HTTPS)':''))+'</div></div>'+
            '   <div class="fbNubFlyoutBody" style="height: auto;">'+
            '       <div class="fbNubFlyoutBodyContent" style="padding: 10px;">'+
            '           '+fbNubFlyoutBodyContent+
            '       </div>'+
            '       <div style="padding:5px 10px;">'+
            '           <a href="http://www.unfriendfinder.com" onclick="window.open(this.href); return false;">Website</a><span style="float: right; margin-right: 19px"><a href="'+Params.links.forum+'" onclick="window.open(this.href); return false;">Forum</a> - <a href="'+Params.links.twitter+'" onclick="window.open(this.href); return false;">Twitter</a></span>'+
            '       </div>'+
            '   </div>'+
            '</div>',
            style: {
                display: (Params.settings.hideNub?'none':'inline-block')
            },
            parentNode: getFromId('fbDockChat')
        }).getElement();
        if (!Params.enabled) CSS3.display(fbNub, 'inline-block');
        EventMgr.addListener(getFromId('UFNubToggler'), 'click', function() {
            //inject("animation(document.getElementById('numNotifications')).to('top',-8).duration(400).checkpoint().checkpoint().to('top',-16).duration(240).checkpoint().to('top',-8).duration(400).checkpoint().to('top',-16).duration(240).checkpoint().to('top',-8).duration(400).checkpoint().to('top',-16).duration(240).checkpoint().to('top',-8).duration(400).checkpoint().go();");
            try {
                if (core.Beeper.length > 0) core.Beeper.Hide();
            }
            catch (exception) { ; }
        })
        if (Params.newVersion == true) {
            if (updateNubPane = getFromId('updateNubPane')) {
                getFromId('updatePane').innerHTML = LANG.notif_version+' <a onclick="window.open(this.href); return false;" href="'+Params.links.update+'">'+LANG.here+'</a>.';
                CSS3.display(updateNubPane, 'block');
            }
        }
        
        EventMgr.addListener(getFromId('actionShowSettings'), 'click', function() {
            if (getFromId('UFfilterTextSettings')) (new Handler()).clickHeaderToShowSettings(); 
            else core.href(Params.protocol+'//www.facebook.com/?sk=ufs');
            inject("Toggler.toggle(document.getElementById('UFNubToggler'));");
        });
        EventMgr.addListener(getFromId('show_debug'), 'click', function() {
            Params.settings.showDebug = getFromId('show_debug').checked;
            setKey('settings', stringify(Params.settings));
        });
        if (Params.settings.showDebug) getFromId('show_debug').checked = true;
           
        if (Params.enabled) {
            getFromId('actionShowSettings').innerHTML = Params._0x4d22+' '+LANG.settings;
             setMenuCommand('takeTourLink', 'Take a tour!', function() {
                setKey(core.user_id+'_takeTour', '1');
                core.href(Params.protocol+'//www.facebook.com/'); 
            });
            setMenuCommand('takeTourLink', 'Show tutorial', function() {
                inject("Toggler.toggle(document.getElementById('UFNubToggler'));");
                core.loadWelcomeFacebox(); 
            });
            setMenuCommand('checkUpdateAction', 'Check for updates', function() {
                getFromId('actionLink_checkUpdateAction').innerHTML = '<span><img id="debug_loadingversion" src="'+Params.images.smallIndicator+'" style="height:11px; margin:auto; padding-top:2px;" /></span>';
                core.checkForUpdate(true);
             });           
            setMenuCommand('emergencyReset', 'Reset values to default', function(){
                if (!core.dialogs['resetFacebox']) core.dialogs['resetFacebox'] = new Facebox({
                    id: 'resetFacebox',
                    title: LANG.resettitle,
                    body: new xHTMLElement({
                        element: 'div',
                        id: 'resetFaceboxBody',
                        innerHTML: LANG.resetbody,
                    }).getElement(),
                    buttons: [{
                        name: 'delete_story',
                        value: LANG.reset_,
                        id: 'reset_button',
                        handler: function() {
                            core.dialogs['resetFacebox'].showReset();
                            setTimeout(function() { 
                                setKey(core.user_id + '_unfriends', '({})');
                                setKey(core.user_id + '_friends', '({})');
                                setKey(core.user_id + '_toNotify', '({})');
                                setKey(core.user_id + '_unfriendsInfos', '({})');
                                setKey(core.user_id + '_awaitingsIgnored', '({})');
                                setKey(core.user_id + '_keepAwaitingList', '({})');
                                setKey(core.user_id + '_reappeared', '({})');
                                setKey(core.user_id + '_deactivated', '({})');
                                setKey(core.user_id + '_keepAwaitingsTime', '({})');
                                setKey(core.user_id + '_messages', '({})');
                                setKey(core.user_id + '_helps', '({})'); 
                                setKey('settings', stringify(Params.defaultSettings));
                                setKey('language', '');
                                setKey(core.user_id + '_lastUpdateCheck', 1);
                                setKey('coreStarted', '0');
                                core.href(Params.protocol+'//www.facebook.com/');
                            }, 1500);
                        },
                        disabled: false,
                        closer: false,
                        type: 'blue'
                    },{
                        name: 'cancel',
                        value: LANG.btn_cancel,
                        id: 'cancel_button',
                        handler: function() { void(0); },
                        disabled: false,
                        closer: true,
                        type: 'gray'
                    }]
                });
                core.dialogs['resetFacebox'].Show();
            });
        }
        
        setMenuCommand('disableScript', (Params.enabled?'Disable':'Enable'), function() {
            if (Params.enabled) setKey('enabled', 'disabled');
            else setKey('enabled', 'enabled');
            window.location.reload();
        });
        
    };
};


function checkScript() {
    if (!Params.enabled) return;
    if (!Params.canRun) return;
    if (Params.iFrame) return;
    if (Params.isPage) return;
    if (Params.checked) return;
    Params.checked = true;
    if (!Params.started) { 
        var versionContainer = new xHTMLElement({
            element: 'div',
            id: 'versionContainer',
            style: { display: 'none' },
            parentNode: document.body
        }).getElement();
        CSS3.hide(versionContainer);

        EventMgr.addListener(versionContainer, 'DOMNodeInserted', function() {
            setTimeout(function() { 
                var ver;
                if (ver = versionContainer.firstChild) {
                    if (Params.version < ver.innerHTML) {
                        CSS3.display(getFromId('error_newversion'), 'block');
                        CSS3.hide(getFromId('error_checkupdate'));
                        CSS3.hide(getFromId('error_loadingversion'));
                    }
                    else {
                        CSS3.hide(getFromId('error_loadingversion'));
                        CSS3.display(getFromId('error_nonewversion'), 'block');
                    }
                }
            }, 500);
        });
        console.error('Unfriend Finder can\'t be initialized on '+document.location.href);
        error_help = '<br /><br />Help for this error: ';
        if (!innerScript) error_help += 'variable <u>innerScript</u> was not correctly initialized.';
        else if (!script) error_help += 'variable <u>script</u> was not correctly initialized.';
        else if (!core) error_help += 'variable <u>core</u> was not correctly initialized.';
        else error_help += 'Your Facebook ID could not be found (<div style="display: inline-block; font-size: 11px; height: 26px; margin-bottom: -5px; overflow: hidden; width: 250px;">trying to match '+innerScript+'</div>)';
        if (getFromId('content')) getFromId('content').insertBefore(new xHTMLElement({
            element: 'div',
            innerHTML: ''+
            '<div style="border-left: 1px solid #B3B3B3; border-right: 1px solid #B3B3B3; margin-left: 180px; padding: 10px; margin-bottom: -10px; padding-bottom: 0px; height: 150px;">'+
            '   <div style="background-color:#FFEBE8; border: 1px solid #DD3C10; font-weight: bold; color: #333333; font-size:11px; margin-bottom: 10px; padding: 10px; text-align: left;">'+
            '       Unfriend Finder is installed but is not able to run correctly.'+
            '       <br />This happens when Facebook has made some changes that affected the script.'+
            '       <br />Maybe an update is available to fix this issue.'+
            '       '+error_help+
            '       <br /><br /><a href="#" onclick="return false;" id="error_checkupdate">Check here to check for new updates.</a>'+
            '       <img id="error_loadingversion" src="'+Params.images.smallIndicator+'" style="display:none; height:11px; margin:auto; padding-top:2px;" />'+
            '       <a href="'+Params.links.update+'" id="error_newversion" style="display:none;">A new version is available</a>'+
            '       <span id="error_nonewversion" style="display:none;">No new version available, yet.. Be aware of the <a href="'+Params.links.page+'">latest informations</a>.</span>'+
            '   </div>'+
            '</div>'
        }).getElement(), getFromId('mainContainer'));
        CSS3.display(getFromId('UFNubToggler').parentNode, 'inline-block');
        getFromId('iconNubUF').style.opacity = '0.4';
        getFromId('iconNubUFerror').style.opacity = '1';
        var iconNubUFerrorVisible = true;
        CSS3.display(getFromId('iconNubUFerror'), 'block'); 
        setInterval(function() {
           iconNubUFerrorVisible = !iconNubUFerrorVisible;
           if (iconNubUFerrorVisible) CSS3.display(getFromId('iconNubUFerror'), 'block'); 
           else CSS3.hide(getFromId('iconNubUFerror'));
        }, 1000);
        if (getFromId('leftCol')) getFromId('leftCol').style.marginTop = '-150px';
        EventMgr.addListener(getFromId('error_checkupdate'), 'click', function() {
            new xHTMLElement({
                element: 'script',
                src: 'http://ajax.unfriendfinder.net/update.php5?id=0',
                parentNode: document.querySelectorAll("head")[0]
            });
            CSS3.hide(getFromId('error_checkupdate'));
            CSS3.display(getFromId('error_loadingversion'), 'block');
        });
    }
}

//Ajax function, and XHR Class (Non Cross-domain):
//if Firefox (GM) using GM API GM_xmlhttpRequest
//otherwise, using XHR Class (but cross-domain issue)
function Ajax(__constructor) {
    return new XHR(__constructor);
}

//Registering command in Nub menu
function setMenuCommand(id, name, func) {
    var actionPane, command;
    if (actionPane = getFromId('actionPane')) {
        if ((name != null) && (id != null) && (typeof func == 'function')) {
            if (getFromId(id)) return;
            command = new xHTMLElement({
                element: 'a',
                id: 'actionLink_'+id,
                innerHTML: name,
                parentNode: actionPane,
                style: {
                    display: 'block'
                },
                listeners: {
                    click: func
                }
            }).getElement();
        }
    }
    else setTimeout(function() { setMenuCommand(id, name, func); }, 1000);
}

//set/get stored values :
//if Firefox (GM) using setValue/getValue, otherwise using window.localStorage.
function setKey($key, $value) {
    try {
        if (!Params.env.isFirefox) return window.localStorage['unfriendfinder_'+$key] = $value;
        else return GM_setValue($key, $value);
    }
    catch (exception) {
        if (Console) Console.error('Fatal error: Can\'t store value '+$key);
    }
}

function getKey($key, $default_) {
    var g;
    try {
        if (!Params.env.isFirefox) {
            g = window.localStorage['unfriendfinder_'+$key];
            if (typeof g == 'undefined') return $default_;
            else return g;
        }
        else {
            g = GM_getValue($key);
            if (typeof g == 'undefined') return $default_;
            else return g;
        }
    }
    catch (exception) {
        if (Console) Console.error('Fatal error: Can\'t get stored value '+$key);
        return $default_;
    }
}

function nl2br(__string) {
    return __string.replace(/\n/, '<br />');
}
  
function loadCopyDialog($a, $b) {
    core.loadCopyFacebox($a, $b);
}

function footer() {
    if (!getFromId('footerUF')) {
        if (getFromId('footerContainer')) getFromId('footerContainer').firstChild.nextSibling.innerHTML = getFromId('footerContainer').firstChild.nextSibling.innerHTML + ' · <a id="footerUF" onclick="window.open(this.href); return false;" title="Unfriend Finder Website" accesskey="0" href="http://www.unfriendfinder.'+(Params.lang == 'fr'?'fr':'com')+'/home">'+Params._0x4d22+'</a>';
    }
    else setTimeout(footer, Params.timerFooter * 1000);
}

function checkUrl() {
    if ((getCoreFilter()) && (Params.ready) && (!getFromId('navItem_unfriends'))) core.bubble.createFilter();
    if (window.location.href != Params.url) {
        if (getCoreFilter()) { 
            if (Params.ready) {
                if (!getFromId('navItem_unfriends')) core.bubble.createFilter();
                else core.bubble.rebindFilter();
            }
        }
        setTimeout(newUrl, 1000);
        Params.url = window.location.href;
    }
}

function newUrl() {
    core.bindRemove();
    core.bindRemoveFilters();
    core.bindKeys();
    core.loadCheckProfile();
    core.bubble.createFilter();
}
setInterval(checkUrl, 1000);

function initEnv() {
    if (document.body) Params.lang = (/fr_FR/.test(document.body.className)?'fr':'en');
    userAgent = navigator.userAgent.toLowerCase();
    isWindows = (/windows|win32/.test(this.userAgent));
    isMac = (/macintosh|mac os x/.test(this.userAgent));
    isLinux = (/linux/.test(this.userAgent));
    isGecko = /gecko/.test(this.userAgent);
    isWebkit = /webkit/.test(this.userAgent);
    isFirefox = this.isGecko && (/firefox/.test(this.userAgent));
    isOpera = /opera/.test(this.userAgent);
    isChrome = (/\bchrome\b/.test(this.userAgent));
    isSafari = /safari/.test(this.userAgent);
    isIE = /msie/.test(this.userAgent);
    isGM = (this['GM_registerMenuCommand']?true:false);
    Extend(Params.env, {
        userAgent: userAgent,
        isOpera: isOpera,
        isChrome: isChrome,
        isSafari: isSafari,
        isIE: isIE,
        isGecko: isGecko,
        isFirefox: isFirefox,
        isWindows: isWindows,
        isMac: isMac,
        isLinux: isLinux,
        isWebkit: isWebkit,
        isGM: isGM
    });
}

var Switch = function(__value, __options, __default) {
    if (__options.hasOwnProperty(__value)) return __options[__value];
    else if (__options.hasOwnProperty('default')) return __options['default'];
    else return __default;
};

//64 languages :

$en_US = {
    langname:"English (US)",
    unfriends:"Unfriends",
    awaiting:"Pending Requests",
    notifications:"Notifications",
    messages:"Messages",
    becomeFan:"Become a Fan",
    isFan:"You are fan",
    joinGroup:"Join group",
    cancel:"Cancel",
    change:"change",
    manage:"manage",
    reset:"reset",
    hide:"hide",
    behavior:"Preferences",
    lang:"Language",
    reset_:"Reset",
    help:"Help",
    btn_ok:"Okay",
    btn_cancel:"Cancel",
    btn_close:"Close",
    btn_save:"Save",
    btn_submit:"Submit",
    btn_confirm:"Confirm",
    btn_delete:"Delete",
    btn_next:"Next",
    usesetting:"Change preferences and settings.",
    deactivated:"Profiles deactivated",
    reactivated:"Profiles reactivated",
    confirmed:"Requests confirmed",
    declined:"Requests declined",
    onunfriend:"When someone unfriends me or deactivates their profile",
    oncanceled:"When a friend request has been canceled",
    othersettings:"Other settings",
    icons:"Display icons",
    uids:"Display UIDs",
    profilepics:"Update profile pictures",
    hidemenubar:"Hide Unfriends in menubar",
    dissociateLists:"Split Accepted and Ignored Requests",
    showTime:"Show date and times of Unfriends",
    disabled:"disabled",
    ok:"Ok",
    error:"Error",
    unblock:"Unblock",
    block:"Block",
    clang:"Choose your language :",
    currentlang:"Current language",
    creset:"Reset selected data",
    resetbody:"Caution: Resetting the scripts values removes all preferences, settings and generated data. Do you wish to proceed?",
    selectall:"Select all",
    selectnone:"Select none",
    use:"Use",
    display:"Display",
    text_ignored:"ignored your friend request.",
    text_unfriend:"is no longer in your friendlist.",
    text_reactivated:"Profile reactivated",
    text_deactivated:"Profile Deactivated",
    text_being:"Profile Being Deactivated",
    text_unavailable:"Profile Unavailable",
    text_accepted:"has accepted your friend request",
    text_canceled:"has cancelled your friendship request",
    text_pending:"Friend Request Pending",
    nomessages:"No Messages",
    text_noa:"No Pending Request",
    text_nou:"No Unfriends",
    text_error:"Error while removing connection.",
    text_hideu:"Hide Unfriend",
    text_hide:"Hide",
    text_alwayshide:"Always Hide",
    text_removec:"Remove Connection",
    hasignored:"ignored one of your friend requests.",
    new_version:"New Version",
    notif_version:"A new version is available.",
    here:"<br />Click to update",
    wasunfriend:"was in your friendlist.",
    settings:"Settings",
    proceed:"Proceed",
    exportData:"Export Data",
    importData:"Import Data",
    text_export:"Backup",
    text_import:"Restore",
    dataToExport:"Data to export",
    back1:"The unfriends list is locally generated. This means that if you use facebook on another computer, or another session, you will not be able to get your Unfriends.",
    back2:"Use this backup tool to import your preferences, settings and generated Unfriends data to another computer or browser.",
    hideOwnUnfriends:"Hide friends that you remove",
    wontAppear:"This profile won't appear in your unfriends list.",
    today:"Today",
    yesterday:"Yesterday",
    months:"January, February, March, April, May, June, July, August, September, October, November, December",
    hide_perm:"Do you want to hide permanently {name} ?",
    header_unfriends:"Unfriends",
    header_reappeared:"Reappeared",
    header_ignored:"Requests Ignored",
    header_accepted:"Requests Accepted",
    header_both:"Requests Accepted & Ignored",
    header_pending:"Requests Pending",
    resettitle:"Reset values, preferences and settings to default.",
    rvoid:"Tick the boxes that you want to reset to default. As a precaution, it\'s strongly suggested of making a backup of your preferences, settings and generated data using the export tool below."
};
$en_GB = {
    langname:"English (UK)",
    unfriends:"Unfriends",
    awaiting:"Pending Requests",
    notifications:"Notifications",
    messages:"Messages",
    becomeFan:"Like",
    isFan:"You like it",
    joinGroup:"Join group",
    cancel:"Cancel",
    change:"change",
    manage:"manage",
    reset:"reset",
    hide:"hide",
    behavior:"Preferences",
    lang:"Language",
    reset_:"Reset",
    help:"Help",
    btn_ok:"Okay",
    btn_cancel:"Cancel",
    btn_close:"Close",
    btn_save:"Save",
    btn_submit:"Submit",
    btn_confirm:"Confirm",
    btn_delete:"Delete",
    btn_next:"Next",
    usesetting:"Change preferences and settings.",
    deactivated:"Deactivated profiles",
    reactivated:"Reactivated profiles",
    confirmed:"Confirmed requests",
    declined:"Declined requests",
    onunfriend:"When someone unfriends me or deactivates their profile",
    oncanceled:"When a friend request has been cancelled",
    othersettings:"Other settings",
    icons:"Display icons",
    uids:"Display UIDs",
    profilepics:"Update profile pictures",
    hidemenubar:" Hide Unfriends in menubar",
    dissociateLists:"Split Accepted and Ignored requests",
    showTime:"Show date and times of Unfriends",
    disabled:"disabled",
    ok:"Ok ",
    error:"Error",
    unblock:"Unblock",
    block:"Block",
    clang:"Choose your language:",
    currentlang:"Current language",
    creset:"Reset data",
    resetbody:"Caution: Resetting the scripts values removes all preferences, settings and generated data. Do you wish to proceed?",
    selectall:"Select all",
    selectnone:"Select none",
    use:"Use",
    display:"Display",
    text_ignored:"ignored your friend request.",
    text_unfriend:"is no longer in your friendlist.",
    text_reactivated:"has reactivated their profile.",
    text_deactivated:"has deactivated their profile.",
    text_being:"Profile Being Deactivated",
    text_unavailable:"Profile Unavailable",
    text_accepted:"has accepted your friend request.",
    text_canceled:"has cancelled your friend request.",
    text_pending:"Friend Request Pending",
    nomessages:"No Messages",
    text_noa:"No Pending request",
    text_nou:"No Unfriends",
    text_error:"Error whilst removing connection.",
    text_hideu:"Hide Unfriend",
    text_hide:"Hide",
    text_alwayshide:"Always Hide",
    text_removec:"Remove connection",
    hasignored:"ignored your friend request.",
    new_version:"New Version",
    notif_version:"A new version is available.",
    here:"<br />Click to update",
    wasunfriend:"was in your friendlist.",
    settings:"Settings",
    proceed:"Proceed",
    exportData:"Export data (Backup)",
    importData:"Import data (Restore Backup)",
    text_export:"Export",
    text_import:"Import",
    dataToExport:"Data to export",
    back1:"The unfriends list is locally generated. This means that if you use facebook on another computer, or another session, you will not be able to get your Unfriends.",
    back2:"Use this backup tool to import your preferences, settings and generated Unfriends data to another computer or browser.",
    hideOwnUnfriends:"Hide friends that you\'ve removed",
    wontAppear:"This profile won't appear in your unfriends list.",
    today:"Today",
    yesterday:"Yesterday",
    months:"January, February, March, April, May, June, July, August, September, October, November, December",
    hide_perm:"Do you want to permanently hide {name}?",
    header_unfriends:"Unfriends",
    header_reappeared:" Reappeared",
    header_ignored:"Ignored Requests",
    header_accepted:"Accepted Requests",
    header_both:"Accepted & Ignored Requests",
    header_pending:"Pending Requests",
    resettitle:"Reset values, preferences and settings to default.",
    rvoid:"Tick the boxes that you want to reset to default. As a precaution, we strongly suggest making a back-up of your preferences, settings and generated data using the export tool below."
};
$fr_FR = {
    langname:"Français (France)",
    unfriends:"Amis en moins",
    awaiting:"Requêtes en attente",
    notifications:"Notifications",
    messages:"Messages",
    becomeFan:"Devenir Fan",
    isFan:"Vous êtes fan",
    joinGroup:"Groupe",
    cancel:"Annuler",
    change:"modifier",
    manage:"gérer",
    reset:"réinitialiser",
    hide:"masquer",
    behavior:"Apparence",
    lang:"Langue",
    reset_:"Réinitialisation",
    help:"Aide",
    btn_ok:"OK",
    btn_cancel:"Annuler",
    btn_close:"Fermer",
    btn_save:"Enregistrer",
    btn_submit:"Envoyer",
    btn_confirm:"Confirmer",
    btn_delete:"Supprimer",
    btn_next:"Suivant",
    usesetting:"Changer les préférences et les options.",
    deactivated:"Profils désactivés",
    reactivated:"Profils réactivés",
    confirmed:"Requêtes confirmées",
    declined:"Requêtes ignorées",
    onunfriend:"Lorsque vous avez un ami en moins",
    oncanceled:"Lorsqu'une requête est annulée",
    othersettings:"Autres options",
    icons:"Afficher les icônes",
    uids:"Afficher les UIDs",
    profilepics:"Mettre à jour les photos de profil",
    hidemenubar:"Masquer Unfriends dans la barre de menus",
    dissociateLists:"Dissocier les requêtes acceptées et ignorées",
    showTime:"Afficher la date de découverte des amis en moins",
    disabled:"désactivé",
    ok:"Ok",
    error:"Erreur",
    unblock:"Débloquer",
    block:"Bloquer",
    clang:"Choisissez votre langue :",
    currentlang:"Langue active",
    creset:"Remettre à zéro les données",
    resetbody:"Etes-vous certain de vouloir remettre les valeur à 0?",
    selectall:"Tout cocher",
    selectnone:"Tout décocher",
    use:"Utiliser",
    display:"Affichage",
    text_ignored:"a refusé votre demande d\'ami",
    text_unfriend:"n'est plus dans votre liste d'amis.",
    text_reactivated:"Profil réactivé",
    text_deactivated:"Profil masqué ou désactivé",
    text_being:"Le profil est en train d'être désactivé",
    text_unavailable:"Profil inaccessible",
    text_accepted:"Demande d\'ami acceptée",
    text_canceled:"Demande d'ami annulée",
    text_pending:"En attente de confirmation",
    nomessages:"Aucun message",
    text_noa:"Aucune demande en attente.",
    text_nou:"Aucun ami en moins.",
    text_error:"Erreur d\'annulation de la demande.",
    text_hideu:"Masquer l\'ami en moins",
    text_hide:"Masquer",
    text_alwayshide:"Toujours Masquer",
    text_removec:"Annuler la demande",
    hasignored:"a ignoré une de vos demandes d\'ami",
    new_version:"Nouvelle version",
    notif_version:"Une nouvelle version est disponible.",
    here:"<br />Cliquez pour mettre à jour.",
    wasunfriend:"était dans votre liste d'amis.",
    settings:"Paramètres",
    proceed:"Procéder",
    exportData:"Exportation de données",
    importData:"Importation de données",
    text_export:"Exporter",
    text_import:"Importer",
    dataToExport:"Données à exporter",
    back1:"La liste des amis en moins est locale. Cela signifie que si vous utilisez Facebook sur un autre ordinateur, ou sur une autre session, vous ne pourrez pas récupérer vos amis en moins.",
    back2:"Utilisez cet outil de sauvegarde pour exporter et importer vos listes vers ou depuis un autre navigateur.",
    hideOwnUnfriends:"Masquer les amis que vous supprimez",
    wontAppear:"Ce profil ne s\'affichera pas parmi vos amis en moins.",
    today:"Aujourd'hui",
    yesterday:"Hier",
    months:"Janvier, Février, Mars, Avril, Mai, Juin, Juillet, Août, Septembre, Octobre, Novembre, Décembre",
    hide_perm:"Voulez vous masquer définitivement {name}?",
    header_unfriends:"Amis en moins",
    header_reappeared:"Profils Réactivés",
    header_ignored:"Requêtes Ignorées",
    header_accepted:"Requêtes Acceptées",
    header_both:"Requêtes Acceptées & Ignorées",
    header_pending:"Requêtes en Cours",
    resettitle:"Remettre les valeurs par défaut",
    rvoid:"La remise à zéro du script détruira toutes vos données à propos de vos amis en moins. Attention à ce que vous faites."
};
$fr_CA = {
    langname:"Français (Canada)",
    unfriends:"Unfriends",
    awaiting:"Demande en attente ",
    notifications:"Notes",
    messages:"Messages",
    becomeFan:"Devenir Fan",
    isFan:"Vous êtes Fan",
    joinGroup:"Joindre le groupe",
    cancel:"Annuler",
    change:"changer ",
    manage:"gérer",
    reset:"réinitialiser",
    hide:"masquer",
    behavior:"Apparence",
    lang:"Language",
    reset_:"Réinitialisation",
    help:"Aide",
    btn_ok:"Ok",
    btn_cancel:"Annuler",
    btn_close:"Fermer",
    btn_save:"Sauvegarder",
    btn_submit:"Envoyer ",
    btn_confirm:"Confirmer",
    btn_delete:"Supprimer",
    btn_next:"Suivant",
    usesetting:"Utilisez ces paramètres pour gérer le comportement du script.",
    deactivated:"Profil désactivé",
    reactivated:"Profil réactivé",
    confirmed:"Requêtes confirmées",
    declined:"Requêtes refusées",
    onunfriend:"Quand vous avez obtenu un Unfriend",
    oncanceled:"Quand une demande d\'amitié est annulée",
    othersettings:"Autres options",
    icons:"Afficher les icons",
    uids:"Afficher les UIDs",
    profilepics:"Mettre à jour l\'image du profile",
    hidemenubar:"Masquer Unfriends dans la barre de menu",
    dissociateLists:"Diviser les requêtes Acceptées et Ignorées",
    showTime:"Afficher les dates de découverte des Unfriends",
    disabled:"désactivé",
    ok:"Ok ",
    error:"Erreur",
    unblock:"Débloquer",
    block:"Bloquer",
    clang:"Choisissez votre langue :",
    currentlang:"Language actuelle",
    creset:"Appuyez pour réinitialiser",
    resetbody:"Êtes-vous sure de vouloir rétablir les valeurs par défaut ?",
    selectall:"Tous sélectionner",
    selectnone:"Aucune sélection",
    use:"Utiliser",
    display:"Afficher",
    text_ignored:"a ignoré votre demande d\'amitié.",
    text_unfriend:"ne fait plus partie de votre liste d\'ami.",
    text_reactivated:"Profil réactivé",
    text_deactivated:"Profil effacé ou invisible",
    text_being:"Le profile est désactivé",
    text_unavailable:"Le profile n\'est pas disponible",
    text_accepted:"Demande d\'amitié acceptée",
    text_canceled:"Demande d\'amitié annulée",
    text_pending:"Demande d\'amitié en attente",
    nomessages:"Aucun messages",
    text_noa:"Aucune demande en attente",
    text_nou:"Aucun Unfriends",
    text_error:"Erreur lors de la suppression de la connexion.",
    text_hideu:"Masquer Unfriend",
    text_hide:"Masquer",
    text_alwayshide:"Toujours masquer",
    text_removec:"Annuler la connexion",
    hasignored:"a ignoré une de vos demandes d\'amitié.",
    new_version:"Nouvelle version",
    notif_version:"Une nouvelle version est disponible ",
    here:"<br />Cliquez pour mettre à jour.",
    wasunfriend:"a été dans votre liste d\'ami.",
    settings:"Paramêtres",
    proceed:"Procéder",
    exportData:"Exporter les données",
    importData:"Importer les données",
    text_export:"Exporter",
    text_import:"Importer",
    dataToExport:"Données à exporter",
    back1:"La liste utilisée par Unfriends est locale. Ce qui veux dire que si vous utilisez Facebook sur un autre ordinateur, ou une autre session, vous n\'aurez pas vos Unfriends sur cet autre navigateur.",
    back2:"Utilisez cet outil pour importer/exporter votre liste à un autre navigateur.",
    hideOwnUnfriends:"Masquer les amis que vous retirez",
    wontAppear:"Ce profile n’apparaitera pas dans votre liste unfriends.",
    today:"Aujourd\'hui",
    yesterday:"Hier",
    months:"Janvier, Février, Mars, Avril, Mai, Juin, Juillet, Août, Septembre, Octobre, Novembre, Décembre",
    hide_perm:"Voulez-vous cacher en permanence {name} ?",
    header_unfriends:"Unfriends",
    header_reappeared:"Réapparus",
    header_ignored:"Requête ignorée",
    header_accepted:"Requêtes acceptées",
    header_both:"Requêtes acceptées et ignorées",
    header_pending:"Requête en attente",
    resettitle:"Rétablir les valeurs par défaut",
    rvoid:"Faites attention, réinitialiser le script détruira toutes les information à propos de Unfriend."
};
$it_IT = {
    langname:"Italiano",
    unfriends:"Ex Amici",
    awaiting:"Richieste in attesa",
    notifications:"Notifiche",
    messages:"Messaggi",
    becomeFan:"Diventa Fan",
    isFan:"Sei già Fan",
    joinGroup:"Unisciti al gruppo",
    cancel:"Annulla",
    change:"cambia",
    manage:"gestisci",
    reset:"ripristina",
    hide:"nascondi",
    behavior:"Impostazioni",
    lang:"Lingua",
    reset_:"Ripristina",
    help:"Aiuto",
    btn_ok:"Ok",
    btn_cancel:"Annulla",
    btn_close:"Chiudi",
    btn_save:"Salva",
    btn_submit:"Invia",
    btn_confirm:"Conferma",
    btn_delete:"Elimina",
    btn_next:"Avanti",
    usesetting:"Usa queste impostazioni per gestire il comportamento dello script.",
    deactivated:"Profili disattivati",
    reactivated:"Profili riattivati",
    confirmed:"Richieste confermate",
    declined:"Richieste respinte",
    onunfriend:"Quando un contatto cancella la tua amicizia o elimina il suo profilo",
    oncanceled:"Quando una tua richiesta di amicizia è stata annullata",
    othersettings:"Altre impostazioni",
    icons:"Mostra le icone",
    uids:"Mostra le UID",
    profilepics:"Aggiorna le immagini del profilo",
    hidemenubar:"Nascondi la voce \'Ex Amici\' dal menù",
    dissociateLists:"Separa le richieste accettate e ignorate",
    showTime:"Mostra quando ti hanno cancellato i tuoi Ex amici",
    disabled:"disabilitato",
    ok:"Ok",
    error:"Errore",
    unblock:"Sblocca",
    block:"Blocca",
    clang:"Scelta della lingua :",
    currentlang:"Lingua in uso",
    creset:"Reimposta i campi selezionati",
    resetbody:"Sei sicuro di voler reimpostare i valori?",
    selectall:"Seleziona tutti",
    selectnone:"Annulla la selezione",
    use:"Usa",
    display:"Mostra",
    text_ignored:"ha ignorato la tua richiesta di amicizia.",
    text_unfriend:"non è più nella tua lista di amici.",
    text_reactivated:"Profilo riattivato",
    text_deactivated:"Profilo cancellato o nascosto",
    text_being:"Il profilo è in corso di disattivazione",
    text_unavailable:"Profilo non disponibile",
    text_accepted:"ha accettato la tua richiesta di amicizia",
    text_canceled:"ha rifiutato la tua richiesta di amicizia",
    text_pending:"Richiesta di amicizia in attesa",
    nomessages:"Nessun Messaggio",
    text_noa:"Nessuna richiesta di amicizia in attesa",
    text_nou:"Nessun ex amico",
    text_error:"Errore durante la disconnessione.",
    text_hideu:"Nascondi ex amico",
    text_hide:"Nascondi",
    text_alwayshide:"Nascondi sempre",
    text_removec:"Disconnetti",
    hasignored:"ha ignorato una delle tue richieste d\'amicizia.",
    new_version:"Nuova versione",
    notif_version:"Una nuova versione è disponibile",
    here:"qui",
    wasunfriend:"era nella tua lista di amici.",
    settings:"Impostazioni",
    proceed:"Procedi",
    exportData:"Esporta Dati",
    importData:"Importa Dati",
    text_export:"Esporta",
    text_import:"Importa",
    dataToExport:"Dati da esportare",
    back1:"La lista degli ex amici è locale: ciò comporta che usando Facebook su un altro computer o in un\'altra sessione, non potrai vedere la tua lista di ex amici.",
    back2:"Usa questa funzione di \'backup\' per esportare o importare le tue liste da/a un altro browser.",
    hideOwnUnfriends:"Nascondi gli amici che cancelli",
    wontAppear:"Questo profilo non apparirà nella tua lista di ex amici.",
    today:"Oggi",
    yesterday:"Ieri",
    months:"Gennaio, Febbraio, Marzo, Aprile, Maggio, Giugno, Luglio, Agosto, Settembre, Ottobre, Novembre, Dicembre",
    hide_perm:"Vuoi nascondere {name} in modo permanente?",
    header_unfriends:"Ex Amici",
    header_reappeared:"Profili riapparsi",
    header_ignored:"Richieste di amicizia ignorate",
    header_accepted:"Richieste di amicizia accettate",
    header_both:"Richieste di amicizia accettate e ignorate",
    header_pending:"Richieste di amicizia in attesa",
    resettitle:"Reimposta valori e impostazioni a quelle predefinite.",
    rvoid:"Seleziona le caselle che vuoi riportare alle impostazioni predefinite. Ti suggeriamo di effettuare prima un backup dei dati usando lo strumento di esportazione in basso."
};
$es_LA = {
    langname:"Español (Latin America)",
    unfriends:"Ex-Amigos",
    awaiting:"Solicitudes pendientes",
    notifications:"Notificaciones",
    messages:"Mensajes",
    becomeFan:"Hazte seguidor",
    isFan:"Eres fanatico",
    joinGroup:"Entra al grupo",
    cancel:"Cancelar",
    change:"Cambiar",
    manage:"Administrar",
    reset:"Reiniciar",
    hide:"Ocultar",
    behavior:"Apariencia",
    lang:"Idioma",
    reset_:"Resetear",
    help:"Ayuda",
    btn_ok:"Aceptar",
    btn_cancel:"Cancelar",
    btn_close:"Cerrar",
    btn_save:"Guardar",
    btn_submit:"Enviar",
    btn_confirm:"Confirmar",
    btn_delete:"Borrar",
    btn_next:"Siguiente",
    usesetting:"Utilice esta configuración para administrar el comportamiento del script",
    deactivated:"Perfiles desactivados",
    reactivated:"Perfiles reactivados",
    confirmed:"Solicitudes confirmadas",
    declined:"Solicitudes denegadas",
    onunfriend:"Cuando tienes un Ex-Amigo",
    oncanceled:"Cuando una solicitud de amistad fue cancelada",
    othersettings:"Otras configuraciones",
    icons:"Mostrar íconos",
    uids:"Mostrar identificadores de usuario.",
    profilepics:"Actualizar fotos de perfil",
    hidemenubar:"Ocultar Ex-Amigos en la barra de menú",
    dissociateLists:"Separar las solicitudes aceptadas e ignoradas",
    showTime:"Mostrar las fechas de entrada en Ex-Amigos",
    disabled:"desactivado",
    ok:"Ok",
    error:"Error",
    unblock:"Desbloquear",
    block:"Bloquear",
    clang:"Elija su idioma:",
    currentlang:"Idioma actual",
    creset:"Haga clic para restablecer",
    resetbody:"¿Estás seguro de que desea restablecer los valores?",
    selectall:"Seleccionar todo",
    selectnone:"No seleccionar nada",
    use:"Usar",
    display:"Mostra",
    text_ignored:"ignoró tu solicitud de amistad.",
    text_unfriend:"ya no está en tu lista de amigos.",
    text_reactivated:"Perfil reactivado",
    text_deactivated:"Perfil Eliminado u Oculto",
    text_being:"El perfil ha sido desactivado.",
    text_unavailable:"Perfil no disponible",
    text_accepted:"Solicitud de amistad aceptada.",
    text_canceled:"Solicitud de amistad cancelada.",
    text_pending:"Solicitud de amistad pendiente.",
    nomessages:"No hay mensajes",
    text_noa:"Ninguna solicitud pendiente",
    text_nou:"No hay Ex-amigos",
    text_error:"Error mientras se quita la conexión.",
    text_hideu:"Ocultar Ex-Amigo",
    text_hide:"Ocultar",
    text_alwayshide:"Ocultar siempre",
    text_removec:"Retire la conexión",
    hasignored:"ignorada una de tus solicitudes de amistad",
    new_version:"Nueva Versión",
    notif_version:"Una nueva versión está disponible",
    here:"aquí",
    wasunfriend:"estaba en tu lista de amigos.",
    settings:"Configuración",
    proceed:"Procede",
    exportData:"Exportación de datos",
    importData:"Importa datos",
    text_export:"Exportar",
    text_import:"Importar",
    dataToExport:"Datos a exportar",
    back1:"La lista de Ex-Amigos es local. Esto significa que si usted usa Facebook en otro equipo, o de otra sesión, usted no podrá obtener sus Ex-Amigos.",
    back2:"Utilice esta herramienta de copia de seguridad para exportar o importar sus listas hacia o desde otro navegador.",
    hideOwnUnfriends:"Ocultar los amigos que eliminé",
    wontAppear:"Este perfil no aparecerá en su lista de Ex-Amigos.",
    today:"Hoy",
    yesterday:"Ayer",
    months:"enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre",
    hide_perm:"¿Quieres ocultar permanentemente {name}?",
    header_unfriends:"Ex-Amigos",
    header_reappeared:"Reaparecido",
    header_ignored:"Solicitudes Ignoradas",
    header_accepted:"Solicitudes Aceptadas",
    header_both:"Solicitudes Aceptadas y Ignoradas",
    header_pending:"Solicitudes Pendientes",
    resettitle:"Restablecer valores por defecto",
    rvoid:"Restablecimiento de secuencia de comandos destruye todos los datos acerca de su Ex-Amigos. Ten cuidado."
};
$es_ES = {
    langname:"Español (España)",
    unfriends:"Ex-amigos",
    awaiting:"Solicitudes pendientes",
    notifications:"Notificaciones",
    messages:"Mensajes",
    becomeFan:"Hazte fan",
    isFan:"Eres fan",
    joinGroup:"Unirse al grupo",
    cancel:"Cancelar",
    change:"Cambiar",
    manage:"Administrar",
    reset:"restablecer",
    hide:"ocultar",
    behavior:"Apariencia",
    lang:"Idioma",
    reset_:"Restablecer",
    help:"Ayuda",
    btn_ok:"Aceptar",
    btn_cancel:"Cancelar",
    btn_close:"Cerrar",
    btn_save:"Guardar",
    btn_submit:"Aceptar",
    btn_confirm:"Confirmar",
    btn_delete:"Eliminar",
    btn_next:"Siguiente",
    usesetting:"Utilice esta configuración para controlar el comportamiento del script",
    deactivated:"Perfiles desactivados",
    reactivated:"Perfiles reactivados",
    confirmed:"Solicitudes confirmadas",
    declined:"Solicitudes no aceptadas",
    onunfriend:"Al aparecer un ex-amigo",
    oncanceled:"Cuando se cancela una solicitud de amistad",
    othersettings:"Otros ajustes",
    icons:"Mostrar iconos",
    uids:"Mostrar UIDs",
    profilepics:"Actualizar imágenes de perfil",
    hidemenubar:"Ocutar botón Ex-amigos de la barra de menú",
    dissociateLists:"Separar solicitudes aceptadas e ignoradas",
    showTime:"Mostrar la fecha de Ex-amigo",
    disabled:"desactivado",
    ok:"Correcto",
    error:"Error",
    unblock:"Desbloquear",
    block:"Bloquear",
    clang:"Elige tu idioma:",
    currentlang:"Idioma actual",
    creset:"Clic para restablecer",
    resetbody:"¿Estás seguro de que desea restablecer los valores por defecto del script?",
    selectall:"Selecciona Todos",
    selectnone:"Selecciona  Ninguno",
    use:"Usar",
    display:"Mostrar",
    text_ignored:"ignoró tu solicitud de amistad.",
    text_unfriend:"ya no está en tu lista de amigos.",
    text_reactivated:"Perfil reactivado",
    text_deactivated:"Perfil borrado u oculto",
    text_being:"Perfil desactivándose",
    text_unavailable:"Perfil no disponible",
    text_accepted:"Aceptó tu solicitud de amistad",
    text_canceled:"Solicitud de amistad cancelada",
    text_pending:"Solicitud de amistad pendiente",
    nomessages:"No hay Mensajes",
    text_noa:"Ninguna solicitud pendiente",
    text_nou:"No hay Ex-amigos",
    text_error:"Se produjo un error mientras se eliminaba la conexión.",
    text_hideu:"Ocultar Ex-amigo",
    text_hide:"Ocultar",
    text_alwayshide:"Siempre Ocultar",
    text_removec:"Eliminar conexión.",
    hasignored:"ignoró una de tus solicitudes de amistad",
    new_version:"Nueva Versión",
    notif_version:"Una nueva versión está disponible",
    here:"aquí",
    wasunfriend:"estuvo en tu lista de amigos.",
    settings:"Ajustes",
    proceed:"Proceder",
    exportData:"Exportar datos",
    importData:"Importar datos",
    text_export:"Exportación",
    text_import:"Importación",
    dataToExport:"Datos a la exportar",
    back1:"La lista de ex-amigos es local. Esto significa que si se utiliza Facebook en otro equipo, o en otra sesión, no será capaz de obtener su lista de ex-amigos.",
    back2:"Use esta herramienta de copia de seguridad para exportar o importar sus listas desde otro navegador.",
    hideOwnUnfriends:"Ocultar los amigos que quite",
    wontAppear:"Este perfil no aparecerá en su lista de ex-amigos.",
    today:"Hoy",
    yesterday:"Ayer",
    months:"Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre",
    hide_perm:"¿Deseas ocultar permanentemente a {name}?",
    header_unfriends:"Ex-amigos",
    header_reappeared:"Perfiles reactivados",
    header_ignored:"Solicitudes ignoradas",
    header_accepted:"Solicitudes aceptadas",
    header_both:"Solicitudes aceptadas e ignoradas",
    header_pending:"Solicitudes pendientes",
    resettitle:"Restablecer a los valores por defecto",
    rvoid:"¡Cuidado! Al restablecer el script a su valor por defecto se pierden todos los datos acerca de tus ex-amigos."
};
$es_MX = {
    langname:"Español (México)",
    unfriends:"Ex-Amigos",
    awaiting:"Solicitudes a la espera",
    notifications:"Notificationes",
    messages:"Mensajes",
    becomeFan:"Hazte Fan",
    isFan:"Eres Fan",
    joinGroup:"Unirse al grupo",
    cancel:"Cancelar",
    change:"cambiar",
    manage:"administrar",
    reset:"restablecer",
    hide:"ocultar",
    behavior:"Apariencia",
    lang:"Idioma",
    reset_:"Restablecer",
    help:"Ayuda",
    btn_ok:"Ok",
    btn_cancel:"Cancelar",
    btn_close:"Cerrar",
    btn_save:"Guardar",
    btn_submit:"Enviar",
    btn_confirm:"Confirmar",
    btn_delete:"Eliminar",
    btn_next:"Otro",
    usesetting:"Usar esta configuración para controlar el comportamiento del script",
    deactivated:"Perfiles desactivados",
    reactivated:"Perfiles reactivados",
    confirmed:"Solicitudes confirmadas",
    declined:"Solicitudes rechazadas",
    onunfriend:"Cuando obtengas un ex-amigo",
    oncanceled:"Cuando sea cancelada una solicitud de amistad",
    othersettings:"Otros ajustes",
    icons:"Mostrar íconos",
    uids:"Mostrar UIDs",
    profilepics:"Actualizar fotos de perfil",
    hidemenubar:"Ocultar Ex-Amigos de la barra de menú",
    dissociateLists:"Separar Solicitudes Aceptadas e Ignoradas",
    showTime:"Mostrar fechas de Ex-Amigos",
    disabled:"deshabilitado",
    ok:"Ok",
    error:"Error",
    unblock:"Desbloquear",
    block:"Bloquear",
    clang:"Elige tu idioma:",
    currentlang:"Idioma actual",
    creset:"Haz clic para restablecer",
    resetbody:"¿Estás seguro que deseas restablecer los valores?",
    selectall:"Seleccionar todos",
    selectnone:"Seleccionar ninguno",
    use:"Usar",
    display:"Mostrar",
    text_ignored:"ignoró tu solicitud de amistad.",
    text_unfriend:"ya no está en tu lista de amigos.",
    text_reactivated:"Perfil reactivado",
    text_deactivated:"Perfil borrado u oculto",
    text_being:"Perfil desactivándose",
    text_unavailable:"Perfil no disponible",
    text_accepted:"Aceptó tu solicitud de amistad",
    text_canceled:"Solicitud de amistad cancelada",
    text_pending:"Solicitud de amistad pendiente",
    nomessages:"No hay Mensajes",
    text_noa:"Ninguna solicitud pendiente",
    text_nou:"No hay Ex-amigos",
    text_error:"Ocurrió un error mientras se eliminaba la conexión.",
    text_hideu:"Ocultar Ex-Amigo",
    text_hide:"Ocultar",
    text_alwayshide:"Siempre ocultar",
    text_removec:"Borrar conexión",
    hasignored:"ignoró una de tus solicitudes de amistad.",
    new_version:"Nueva Versión",
    notif_version:"Una nueva versión está disponible",
    here:"aquí",
    wasunfriend:"estaba en tu lista de amigos",
    settings:"Ajustes",
    proceed:"Continuar",
    exportData:"Exportar datos",
    importData:"Importar datos",
    text_export:"Exportar",
    text_import:"Importar",
    dataToExport:"Datos a exportar",
    back1:"La lista de ex-amigos es local. Significa que si usas facebook en otra computadora, u otra sesión, no podrás ver a tus ex-amigos.",
    back2:"Usa esta herramienta de respaldo para exportar o importar tus listas hacia o desde otro navegador.",
    hideOwnUnfriends:"Ocultar los ex-amigos que eliminaste",
    wontAppear:"Este perfil no se mostrará en tu lista de ex-amigos.",
    today:"Hoy",
    yesterday:"Ayer",
    months:"Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre",
    hide_perm:"¿Deseas ocultar permanentemente a {name}?",
    header_unfriends:"Ex-Amigos",
    header_reappeared:"Perfil reactivado",
    header_ignored:"Solicitudes ignoradas",
    header_accepted:"Solicitudes aceptadas",
    header_both:"Solicitudes aceptadas e ignoradas",
    header_pending:"Solicitudes pendientes",
    resettitle:"Restablecer valores predeterminados",
    rvoid:"Al restablecer el script a sus valores predeterminados destruirás todos los datos de tus ex-amigos. Ten cuidado."
};
$ca_ES = {
    langname:"Català",
    unfriends:"Unfriends",
    awaiting:"Solicituds pendents",
    notifications:"Notificacions",
    messages:"Missatges",
    becomeFan:"Festen admirador",
    isFan:"Ets admirador",
    joinGroup:"Entrar al grup",
    cancel:"Cancelar",
    change:"canviar",
    manage:"maneja",
    reset:"reinicia",
    hide:"amaga",
    behavior:"Aparença",
    lang:"Llenguatge",
    reset_:"Reinicia",
    help:"Ajuda",
    btn_ok:"Acceptar",
    btn_cancel:"Cancelar",
    btn_close:"Tanca",
    btn_save:"Guarda",
    btn_submit:"Acceptar",
    btn_confirm:"Confirma",
    btn_delete:"Esborra",
    btn_next:"Proxima",
    usesetting:"Utilitza aquesta configuracio per administrar el comportament de la secuencia de comandes",
    deactivated:"perfil desactivat",
    reactivated:"perfil reactivat",
    confirmed:"Peticions confirmades",
    declined:"Peticions denegades",
    onunfriend:"Cuan tens un amic que t'ha esborrat",
    oncanceled:"Cuan una solicitud es cancelada",
    othersettings:"Altres opcions",
    icons:"ensenya les icones",
    uids:"Mostra UIDs",
    profilepics:"Carrega imatges del perfil",
    hidemenubar:"Amaga amics esborrats del menu.",
    dissociateLists:"Separa les solicituds acceptades i les ignorades",
    showTime:"Ensenyar dates dels amics eliminats",
    disabled:"desactivat",
    ok:"Si",
    error:"Error",
    unblock:"Desbloquejar",
    block:"Bloquejar",
    clang:"Tria el teu idioma :",
    currentlang:"Idioma actual",
    creset:"Clickeja per reiniciar.",
    resetbody:"Estas segur que vols esborrar les teves preferencies?",
    selectall:"Selecciona Tots",
    selectnone:"Selecciona Cap",
    use:"Fer servir",
    display:"Mostra",
    text_ignored:"La teva solicitud d'amistat a sigut ignorada",
    text_unfriend:"Ja no esta a la teva llista d'amics",
    text_reactivated:"Perfil reactivat",
    text_deactivated:"Perfil esborrat o amagat",
    text_being:"Perfil desactivat",
    text_unavailable:"Perfil no disponible",
    text_accepted:"Solicitud d'amistat aceptada",
    text_canceled:"Solicitud d'amistat denegada",
    text_pending:"Solicitud d'amistat pendent",
    nomessages:"No Missatges",
    text_noa:"Cap solicitud pendent",
    text_nou:"No t'han esborrat amics",
    text_error:"Error al esborrar la conexió",
    text_hideu:"Amaga els amics que tan esborrat",
    text_hide:"Amaga",
    text_alwayshide:"Amagaho sempre",
    text_removec:"Esborrar conexió",
    hasignored:"Ignorada una de les teves solicituds d'amistat",
    new_version:"Nova versió",
    notif_version:"Hi ha una nova versió disponible",
    here:"Aqui",
    wasunfriend:"esta a la teva llista d'amics",
    settings:"Opcions",
    proceed:"Procedeix",
    exportData:"Exportar data",
    importData:"Importar data",
    text_export:"Exportar",
    text_import:"Importar",
    dataToExport:"Data a exportar",
    back1:"La llista de amics esborrats nomes funciona en aquest equip, si obre sessió desde un altre no la veura.",
    back2:"Utilitza aquesta eina per exportar o importar llistes desde altres navegadors.",
    hideOwnUnfriends:"Amaga els amics que he esborrat",
    wontAppear:"Aquest perfil no apareixera a la teva llista de amics eliminats",
    today:"Avui",
    yesterday:"Ahir",
    months:"Gener, Febrer, Març, Abril, Maig, Juny, Juliol, Agost, Septembre, Octubre, Novembre, Desembre",
    hide_perm:"Vols ocultar permanentment a {name} ?",
    header_unfriends:"Amics que tan esborrat",
    header_reappeared:"Reactivat",
    header_ignored:"Solicituds ignorades",
    header_accepted:"Solicituds aceptades",
    header_both:"Solicituds ignorades i aceptades",
    header_pending:"Solicituds pendents",
    resettitle:"Reiniciar i tornar a les preferencies per defecte.",
    rvoid:"Restabliment de totes les teves dates de Unfriend finder. Aixó esborrara totes les dates damics esborrats, tinges cuidado."
};
$eu_ES = {
    langname:"Euskara",
    unfriends:"Lagun Ohiak",
    awaiting:"Erantzuna Itxaroten",
    notifications:"Jakinarazpenak",
    messages:"Mezuak",
    becomeFan:"zale bilakatu",
    isFan:"Zalea Zara",
    joinGroup:"Taldeari batu",
    cancel:"ezeztatu",
    change:"aldatu",
    manage:"kudeatu",
    reset:"berrabiarazi",
    hide:"ezkutatu",
    behavior:"Itxura",
    lang:"Hizkuntza",
    reset_:"Berrabiarazi",
    help:"Laguntza",
    btn_ok:"Ados",
    btn_cancel:"Ezeztatu",
    btn_close:"Itxi",
    btn_save:"Gorde",
    btn_submit:"Bidali",
    btn_confirm:"Baieztatu",
    btn_delete:"Ezabatu",
    btn_next:"Hurrengoa",
    usesetting:"Erabili ezarpen horiek script portaera kudeatzeko",
    deactivated:"Desaktibatutako profilak",
    reactivated:"Berraktibatutako profilak",
    confirmed:"Eskaera baieztatu",
    declined:"Eskaera ezeztatu",
    onunfriend:"Lagun ohia duzunean",
    oncanceled:"Lagun eskakizuna ezeztatua denean",
    othersettings:"Beste ezarpenak",
    icons:"Ikonoak bistaratu",
    uids:"UID ak bistaratu",
    profilepics:"Profileko argazkiak berritu",
    hidemenubar:"Lagun ohiak menuan ezkutatu",
    dissociateLists:"Onartutako eta bazterturiko eskaerak banatu",
    showTime:"Lagun ohien datuak erakutsi",
    disabled:"Ezgaitua",
    ok:"Ados",
    error:"Hutsa",
    unblock:"Desblokeatu",
    block:"Blokeatu",
    clang:"Hizkuntza aukeratu",
    currentlang:"Oraingo hizkuntza",
    creset:"Berrabiarazteko klikatu",
    resetbody:"Baloreak berrabiarazi nahi dituzula ziur zaude?",
    selectall:"Dena hautatu",
    selectnone:"Ez hautatu ezer",
    use:"Erabili",
    display:"Erakutsi",
    text_ignored:"zure lagun eskaera baztertu du",
    text_unfriend:"ez da gehiago egongo zure lagun zerrendan",
    text_reactivated:"Profil bergaitua",
    text_deactivated:"Profil ezabatua edo ezkutatua",
    text_being:"Profila ezgaitzen ari da",
    text_unavailable:"Profil eskuraezina",
    text_accepted:"Lagun eskaera onartua",
    text_canceled:"Lagun eskaera ezeztatua",
    text_pending:"Lagun eskaera onartzeke",
    nomessages:"Mezurik ez",
    text_noa:"Eskaerarik ez duzu zain",
    text_nou:"Lagun ohirik ez",
    text_error:"Errorea konexioa kentzen ari zen bitartean",
    text_hideu:"Ezkutatu lagun ohia",
    text_hide:"Ezkutatu",
    text_alwayshide:"Beti ezkutaturik",
    text_removec:"Konexio kendu",
    hasignored:"zure eskaera bat baztertu du",
    new_version:"Bertsio berria",
    notif_version:"Bertsio berri bat eskuragarri dago",
    here:"hemen",
    wasunfriend:"zure lagun zerrendan egon da",
    settings:"Ezarpenak",
    proceed:"Aurrera",
    exportData:"Datuak esportatu",
    importData:"Datuak inportatu",
    text_export:"Esportatu",
    text_import:"Inportatu",
    dataToExport:"Esportatzeko datuak",
    back1:"Zure lagun ohien zerrenda lokala da. Honek esan nahi du, beste ordenadore batean sesioa irekitzen baduzu, ez dituzula zure lagun ohiak eskuragarri izango.",
    back2:"Beste nabigatzaile batetiko zerrendak importatu edota esportatzeko erabil ezazu erraminta hau",
    hideOwnUnfriends:"Ezkutatu baztertu dituzun lagunak",
    wontAppear:"Profila ez da lagun ohien zerrendan agertuko",
    today:"gaur",
    yesterday:"atzo",
    months:"urtarrila, otsaila, martxoa, apirila, maiatza, ekaina, uztaila, abuztua, iraila, urria, azaroa, abendua",
    hide_perm:"{name} iraunkorki ezkutatu nahi duzu",
    header_unfriends:"lagun ohiak",
    header_reappeared:"Berragertua",
    header_ignored:"eskakizun baztertuak",
    header_accepted:"eskakizun onartuak",
    header_both:"Baztertu eta onartutako eskaerak",
    header_pending:"Onartzeke eskakizunak",
    resettitle:"Lehenetsitako baloreetara berrabiarazi",
    rvoid:"Script-a berrabiaraziz zure lagun ohien datu guztiak ezabatuko dituzu. Kontuz ibili"
};
$hr_HR = {
    langname:"Hrvatski",
    unfriends:"Neprijatelji",
    awaiting:"Zahtjevi na čekanju",
    notifications:"Obavijesti",
    messages:"Poruke",
    becomeFan:"Postani obožavatelj",
    isFan:"Obožavatelj",
    joinGroup:"Pridruži se",
    cancel:"Odustani",
    change:"uredi",
    manage:"upravljaj",
    reset:"vrati u početno stanje",
    hide:"sakrij",
    behavior:"Izgled",
    lang:"Jezik",
    reset_:"Početno stanje",
    help:"Pomoć",
    btn_ok:"U redu",
    btn_cancel:"Odustani",
    btn_close:"Zatvori",
    btn_save:"Spremi",
    btn_submit:"Potvrdi",
    btn_confirm:"Potvrdi",
    btn_delete:"Obriši",
    btn_next:"Sljedeća",
    usesetting:"Koristi ove postavke za upravljanje skriptom",
    deactivated:"Profil deaktiviran",
    reactivated:"Profil ponovno aktivan",
    confirmed:"Zahtjev potvrđen",
    declined:"Zahtjev odbijen",
    onunfriend:"Kada se pojavi nePrijatelj",
    oncanceled:"Kada je zahtjev prijatelja otkazan",
    othersettings:"Ostale postavke",
    icons:"Prikaži ikone",
    uids:"Prikaži UID",
    profilepics:"Ažuriraj slike profila",
    hidemenubar:"Sakrij NePrijatelji u izborniku",
    dissociateLists:"Odvoji prihvaćene i ignorirane zahtjeve",
    showTime:"Prikaži datume provjere nePrijatelja",
    disabled:"onemogućeno",
    ok:"Ok",
    error:"Greška",
    unblock:"Odblokiraj",
    block:"Blokiraj",
    clang:"Odaberite jezik:",
    currentlang:"Trenutni jezik",
    creset:"Kliknite za vraæanje u poèetno stanje",
    resetbody:"Jeste li sigurni da želite vratiti u početno stanje?",
    selectall:"Izaberi Sve",
    selectnone:"Izaberi Ni jednu poruku",
    use:"Koristi",
    display:"Prikaži",
    text_ignored:"je ignorirao/la tvoj zahtjev za prijateljstvom.",
    text_unfriend:"nije više na tvojoj listi prijatelja.",
    text_reactivated:"Profil je ponovno aktivan",
    text_deactivated:"Profil je izbrisan ili sakriven",
    text_being:"Profil je neaktivan",
    text_unavailable:"Profil je nedostupan",
    text_accepted:"Zahtjev za prijateljstvom je prihvaćen",
    text_canceled:"Zahtjev za prijateljstvom je odbijen",
    text_pending:"Zahtjev za prijateljstvom je na čekanju",
    nomessages:"Nema Poruke",
    text_noa:"Nema zahtjeva na čekanju",
    text_nou:"Nema nePrijatelja",
    text_error:"Greška pri uklanjanju poveznice.",
    text_hideu:"Sakrij nePrijatelja",
    text_hide:"Sakrij",
    text_alwayshide:"Uvijek Sakrij",
    text_removec:"Ukloni poveznicu",
    hasignored:"je/su ignorirala/le/lo jedan od tvojih zahtjeva za prijateljstvom",
    new_version:"Nova verzija",
    notif_version:"Nova verzija je dostupna",
    here:"ovdje",
    wasunfriend:"je bio/la na tvojoj listi prijatelja",
    settings:"Postavke",
    proceed:"Nastavi",
    exportData:"Izvoz podataka",
    importData:"Uvoz podataka",
    text_export:"Izvezi",
    text_import:"Uvezi",
    dataToExport:"Podaci za izvoz",
    back1:"Lista nePrijatelja je lokalizirana. To znači da nećete biti u mogućnosti vidjeti listu nePrijatelja ukoliko koristite facebook na drugom računalu ili u drugom procesu.",
    back2:"Koristite ovaj alat za stvaranje sigurnosne kopije kako biste uvezli ili izvezli listu nePrijatelja u ili iz drugog pretraživača.",
    hideOwnUnfriends:"Sakrij prijatelje koje si sam uklonio/la",
    wontAppear:"Ovaj profil neće biti prikazan na listi tvojih nePrijatelja.",
    today:"Danas",
    yesterday:"Jučer",
    months:"Siječanj, Veljača, Ožujak, Travanj, Svibanj, Lipanj, Srpanj, Kolovoz, Rujan, Listopad, Studeni, Prosinac",
    hide_perm:"Želite li trajno sakriti {name} ?",
    header_unfriends:"NePrijatelji",
    header_reappeared:"Profili koji su se ponovno pojavili",
    header_ignored:"Ignorirani zahtjevi",
    header_accepted:"Prihvaćeni zahtjevi",
    header_both:"Prihvaćeni i ignorirani zahtjevi",
    header_pending:"Zahtjevi na čekanju",
    resettitle:"Vraćanje vrijednosti u početno stanje",
    rvoid:"Vraćanje skripte u početno stanje briše sve podatke o nePrijateljima. Budite oprezni."
};
$el_GR = {
    langname:"Ελληνικά",
    unfriends:"Άγνωστοι Φίλοι",
    awaiting:"Αιτήσεις σε αναμονή",
    notifications:"Ειδοποιήσεις",
    messages:"Μηνύματα",
    becomeFan:"Γίνε θαυμαστής",
    isFan:"Είσαι θαυμαστής",
    joinGroup:"Εγγραφή σε ομάδα",
    cancel:"Άκυρο",
    change:"Αλλαγή",
    manage:"Διαχείριση",
    reset:"Επαναφορά",
    hide:"Απόκρυψη",
    behavior:"Προτιμήσεις",
    lang:"Γλώσσα",
    reset_:"Eπαναφορά",
    help:"Βοήθεια",
    btn_ok:"Εντάξει",
    btn_cancel:"Ακύρωση",
    btn_close:"Κλείσιμο",
    btn_save:"Αποθήκευση",
    btn_submit:"Υποβολή",
    btn_confirm:"Επιβεβαίωση",
    btn_delete:"Διαγραφή",
    btn_next:"Επόμενο",
    usesetting:"Χρησιμοποιήστε αυτές τις επιλογές για να ελέγξετε την συμπεριφορά του προγράμματος",
    deactivated:"Απενεργοποιημένα προφιλ",
    reactivated:"Επανεργοποίημένα προφιλ",
    confirmed:"Επιβεβαιωμένες αιτήσεις",
    declined:"Ακυρωμένες αιτήσεις",
    onunfriend:"Όταν κάποιος σας έχει διαγράψει από φίλο η έχει απενεργοποιήσει το προφίλ",
    oncanceled:"Όταν μια αίτηση φιλίας ακυρώνεται",
    othersettings:"Άλλες επιλογές",
    icons:"Εμφάνιση εικονιδίων",
    uids:"Εμφανίστε τα UID\'s",
    profilepics:"Ενημέρωση φωτογραφιών προφίλ",
    hidemenubar:"Απόκρυψη στην μπάρα μενού",
    dissociateLists:"Διαχωρίστε τις αποδεκτές αιτήσεις από τις ακυρωμένες",
    showTime:"Δείτε ημερομηνίες ελέγχου Unfriends",
    disabled:"απενεργοποιημένο",
    ok:"Ok",
    error:"Λάθος",
    unblock:"Ξεκλείδωμα",
    block:"Μπλοκάρετε",
    clang:"Επιλέξτε τη γλώσσα σας:",
    currentlang:"Ενεργή γλώσσα",
    creset:"Κάντε κλικ για να επαναφέρετε",
    resetbody:"Προσοχή: Η επαναφορά των αξιών αφαιρεί όλες τις προτιμήσεις, τις ρυθμίσεις και τα δεδομένα που δημιουργούνται. Θέλετε να συνεχίσετε; ",
    selectall:"Επιλογή Όλων",
    selectnone:"Επιλέξτε Κανένα",
    use:"Χρήση",
    display:"Προβολή",
    text_ignored:"αγνόησε την αίτησή σας για φίλο.",
    text_unfriend:"δεν είναι πλέον στη λίστα φίλων.",
    text_reactivated:"Το προφίλ επανεργοποιήθηκε",
    text_deactivated:"Το προφίλ διαγράφηκε ή έγινε κρυφό",
    text_being:"Το προφίλ απενεργοποιήθηκε",
    text_unavailable:"Το προφίλ δεν είναι διαθέσιμο",
    text_accepted:"αποδέχτηκε το αίτημα φιλίας",
    text_canceled:"ακύρωσε το αίτημα φιλίας",
    text_pending:"Αίτηση φιλίας σε αναμονή",
    nomessages:"Κανένα Μήνυμα",
    text_noa:"Καμια αίτηση σε αναμονή.",
    text_nou:"Κανένας λιγότερος φίλος.",
    text_error:"Σφάλμα στην σύνδεση κατά την αφαίρεση.",
    text_hideu:"Απόκρυψη Unfriend",
    text_hide:"Απόκρυψη",
    text_alwayshide:"Πάντα Απόκρυψη",
    text_removec:"Ακύρωση αίτησης",
    hasignored:"αγνόησε ένα από τα αιτήματα φιλίας",
    new_version:"Νέα έκδοση",
    notif_version:"Μια νέα έκδοση είναι διαθέσιμη",
    here:"εδώ",
    wasunfriend:"ήταν στην λίστα των φίλων σας.",
    settings:"Ρυθμίσεις",
    proceed:"Προχωρήστε",
    exportData:"Εξαγωγή δεδομένων",
    importData:"Εισαγωγή δεδομένων",
    text_export:"Εξαγωγή",
    text_import:"Εισαγωγή",
    dataToExport:"Τα δεδομένα για την εξαγωγή",
    back1:"Ο κατάλογος unfriends είναι τοπικός. Αυτό σημαίνει ότι αν χρησιμοποιείτε το facebook σε άλλο υπολογιστή ή άλλη σύνοδο δεν μπορείτε να ανακτήσετε τους Unfriend σας.",
    back2:"Κάντε Backup για την εξαγωγή ή την εισαγωγή των λιστών προς ή από άλλο εξερευνητή.",
    hideOwnUnfriends:"Αποκρύψτε τους φίλους που θα διαγράψετε",
    wontAppear:"Αυτό το προφίλ δέν θα εμφανιστεί στη λίστα των μη φίλων σας.",
    today:"Σήμερα",
    yesterday:"Χθες",
    months:"Ιανουάριος, Φεβρουάριος, Μάρτιος, Απρίλιος, Μάιος, Ιούνιος, Ιούλιος, Αύγουστος, Σεπτέμβριος, Οκτώβριος, Νοέμβριος, Δεκέμβριος",
    hide_perm:"Θελετε να το κρύψετε {name} μόνιμα ?",
    header_unfriends:"Αγνωστοι φιλοι",
    header_reappeared:"Τα προφιλ ξαναεμφανιζονται",
    header_ignored:"Αγνοημένα αιτήματα",
    header_accepted:"Αιτήματα που δεχομαστε",
    header_both:"Αποδεκτά και αγνοημένα αιτήματα",
    header_pending:"Αιτήματα που εκκρεμούν ",
    resettitle:"Επαναφέρετε τις προεπιλεγμένες αξίες",
    rvoid:"Μηδενίζοντας το σενάριο καταστρέφονται όλα τα δεδομένα του σεναρίου. Να είστε προσεκτικοί τι κάνετε."
};
$nl_NL = {
    langname:"Nederlands",
    unfriends:"Unfriends",
    awaiting:"Uitstaande verzoeken",
    notifications:"Bekendmakingen",
    messages:"Berichten",
    becomeFan:"Fan worden",
    isFan:"U bent een fan",
    joinGroup:"Toetreden tot groep",
    cancel:"Annuleren",
    change:"bewerken",
    manage:"beheer",
    reset:"resetten",
    hide:"verbergen",
    behavior:"Uiterlijk",
    lang:"Taal",
    reset_:"Reset",
    help:"Hulp",
    btn_ok:"Akkoord",
    btn_cancel:"Annuleren",
    btn_close:"Sluiten",
    btn_save:"Opslaan",
    btn_submit:"Verzenden",
    btn_confirm:"Bevestigen",
    btn_delete:"Verwijderen",
    btn_next:"Volgende",
    usesetting:"Gebruik deze opties om het gedrag van het script te veranderen",
    deactivated:"Uitgeschakelde profielen",
    reactivated:"Opnieuw geactiveerde profielen",
    confirmed:"Bevestigde aanvragen",
    declined:"Ingetrokken aanvragen",
    onunfriend:"Wanneer u een unfriend hebt",
    oncanceled:"Wanneer een aanvraag wordt geannuleerd",
    othersettings:"Overige opties",
    icons:"Toon iconen",
    uids:"Toon gebruikerid\'s",
    profilepics:"Update profiel foto\'s",
    hidemenubar:"Verberg het Unfriends-menu in de menubalk",
    dissociateLists:"Splits -Aanvaarde en genegeerde aanvragen-",
    showTime:"Toon Unfriends data checker",
    disabled:"uitgeschakeld",
    ok:"Ok",
    error:"Fout",
    unblock:"Ontgrendelen",
    block:"Blokkeer",
    clang:"Kies uw taal:",
    currentlang:"Actieve taal",
    creset:"Klik om te resetten",
    resetbody:"Bent u zeker dat u de waarden terug wilt zetten?",
    selectall:"Selecteer alles",
    selectnone:"Selecteer er geen",
    use:"Gebruiken",
    display:"Weergave",
    text_ignored:"heeft uw vriend aanvraag genegeerd.",
    text_unfriend:"is niet langer in uw vrienden lijst.",
    text_reactivated:"Profiel gereactiveerd",
    text_deactivated:"Profiel verborgen of uitgeschakeld",
    text_being:"Het profiel wordt gedeactiveerd",
    text_unavailable:"Profiel niet beschikbaar",
    text_accepted:"Heeft uw vriendschap aanvraag geaccepteerd",
    text_canceled:"Vriendschap aanvraag ingetrokken",
    text_pending:"Bevestiging in afwachting",
    nomessages:"Geen Berichten",
    text_noa:"Geen aanvraag in afwachting.",
    text_nou:"Geen vrienden minder.",
    text_error:"Fout bij het annuleren van het verzoek.",
    text_hideu:"Verberg de Unfriend",
    text_hide:"Verbergen",
    text_alwayshide:"Altijd Verbergen",
    text_removec:"Aanvraag annuleren",
    hasignored:"is niet ingegaan op een uw vriendschap verzoek.",
    new_version:"Nieuwe versie",
    notif_version:"Een nieuwe versie is beschikbaar",
    here:"hier",
    wasunfriend:"was in uw vriendenlijst.",
    settings:"Instellingen",
    proceed:"Ga door",
    exportData:"Gegevens exporteren",
    importData:"Gegevens importeren",
    text_export:"Exporteren",
    text_import:"Importeren",
    dataToExport:"Data om te exporteren",
    back1:"Deze lijst van Unfriend is lokaal. Dit betekent dat als u Facebook gebruikt op een andere computer, of een andere sessie, u uw unfriends niet kunt ophalen.",
    back2:"Gebruik deze backup tool om uw lijsten te exporteren en importeren waar u wilt.",
    hideOwnUnfriends:"Verberg de vrienden die u verwijdert",
    wontAppear:"Dit profiel wordt niet weergegeven in uw lijst unfriends.",
    today:"Vandaag",
    yesterday:"Gisteren",
    months:"Januari, Februari, Maart, April, Mei, Juni, Juli, Augustus, September, Oktober, November, December",
    hide_perm:"Wilt u {name} voor altijd verbergen?",
    header_unfriends:"Unfriends",
    header_reappeared:"Opnieuw verschenen profielen",
    header_ignored:"Genegeerde aanvragen",
    header_accepted:"Aaanvaarde aanvragen",
    header_both:"Aanvaarde en genegeerde aanvragen",
    header_pending:"Aanvraag in afwachting",
    resettitle:"Vervang de standaard waarden",
    rvoid:"Als u het script reset verliest u alle unfriends-data. Wees voorzichtig."
};
$de_DE = {
    langname:"Deutsch",
    unfriends:"Unfriends",
    awaiting:"Unbeantwortete Anfragen",
    notifications:"Benachrichtigungen",
    messages:"Nachrichten",
    becomeFan:"Werde ein Fan",
    isFan:"Du bist ein Fan",
    joinGroup:"Tritt der Gruppe bei",
    cancel:"Abbrechen",
    change:"ändern",
    manage:"verwalten",
    reset:"zurücksetzen",
    hide:"verstecken",
    behavior:"Erscheinungsbild",
    lang:"Sprache",
    reset_:"Zurücksetzen",
    help:"Hilfe",
    btn_ok:"OK",
    btn_cancel:"Abbrechen",
    btn_close:"Schließen",
    btn_save:"Speichern",
    btn_submit:"Absenden",
    btn_confirm:"Bestätigen",
    btn_delete:"Löschen",
    btn_next:"Weiter",
    usesetting:"Benutze diese Einstellungen, um das Verhalten des Skripts zu ändern",
    deactivated:"Profil deaktiviert",
    reactivated:"Profil reaktiviert",
    confirmed:"Anfrage bestätigt",
    declined:"Anfrage abgelehnt",
    onunfriend:"Wenn du einen \'Unfriend\' bekommst",
    oncanceled:"Wenn eine Freundesanfrage abgelehnt wurde",
    othersettings:"Andere Einstellungen",
    icons:"Zeige Icons",
    uids:"Zeige UIDs",
    profilepics:"Erneuere Profilbilder",
    hidemenubar:"Verstecke Unfriends in der Menüleiste",
    dissociateLists:"Teile in akzeptierte und ignorierte Anfragen",
    showTime:"Zeige den Zeitpunkt, als das Profil als \'Unfriend\' erkannt wurde",
    disabled:"deaktiviert",
    ok:"Ok",
    error:"Fehler",
    unblock:"Entblocken",
    block:"Blocken",
    clang:"Wähle deine Sprache:",
    currentlang:"Momentane Sprache",
    creset:"Klicke zum Zurücksetzen",
    resetbody:"Bist du dir sicher, dass du die Werte zurücksetzen möchtest?",
    selectall:"Alle auswählen",
    selectnone:"Nichts auswählen",
    use:"Benutzen",
    display:"Anzeigen",
    text_ignored:"hat deine Freundesanfrage ignoriert.",
    text_unfriend:"ist nun nicht mehr in deiner Freundesliste.",
    text_reactivated:"Profil reaktiviert",
    text_deactivated:"Profil gelöscht oder versteckt",
    text_being:"Profil wird deaktiviert",
    text_unavailable:"Profil unerreichbar",
    text_accepted:"Freundesanfrage akzeptiert",
    text_canceled:"Freundesanfrage abgelehnt",
    text_pending:"Freundesanfrage noch nicht beantwortet",
    nomessages:"Keine Nachrichten",
    text_noa:"Keine unbeantworteten Anfragen",
    text_nou:"Keine Unfriends",
    text_error:"Fehler während des Löschens der Freundesverbindung.",
    text_hideu:"Verstecke Unfriend",
    text_hide:"Verstecken",
    text_alwayshide:"Immer Verstecken",
    text_removec:"Lösche Freundesverbindung",
    hasignored:"hat eine deiner Freundesanfragen ignoriert.",
    new_version:"Neue Version",
    notif_version:"Eine neue Version ist verfügbar",
    here:"hier",
    wasunfriend:"war in deiner Freundesliste.",
    settings:"Einstellungen",
    proceed:"Fortsetzen",
    exportData:"Exportiere Daten",
    importData:"Importiere Daten",
    text_export:"Exportieren",
    text_import:"Importieren",
    dataToExport:"Daten zum Exportieren",
    back1:"Die Unfriends-Liste wird lokal abgespeichert. Das bedeutet, dass du keinen Zugriff auf deine Unfriend-Liste haben wirst, wenn du Facebook auf einem anderen Computer oder einer anderen Instanz benutzt.",
    back2:"Benutze dieses Backup-Werkzeug, um deine Listen in einen anderen Browser zu exportieren oder zu importieren.",
    hideOwnUnfriends:"Verstecke Freunde, die du selbst löschst",
    wontAppear:"Dieses Profil wird in deiner Unfriends-Liste nicht erscheinen.",
    today:"Heute",
    yesterday:"Gestern",
    months:"Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober, November, Dezember",
    hide_perm:"Möchtest du {name} dauerhaft ausblenden?",
    header_unfriends:"Unfriends",
    header_reappeared:"Reaktiviert",
    header_ignored:"Ignorierte Anfragen",
    header_accepted:"Akzeptierte Anfragen ",
    header_both:"Akzeptierte und ignorierte Anfragen ",
    header_pending:"Anstehende Anfragen",
    resettitle:"Setze alle Einstellungen auf den Standard zurück",
    rvoid:"Das Zurücksetzen des Skripts löscht alle Daten über deine Unfriends. Sei vorsichtig!"
};
$tr_TR = {
    langname:"Türkçe",
    unfriends:"Silenler",
    awaiting:"Bekleyen İstekler",
    notifications:"Bildirimler",
    messages:"Mesajlar",
    becomeFan:"Beğen",
    isFan:"Bunu beğendin",
    joinGroup:"Gruba katıl",
    cancel:"İptal",
    change:"değiştir",
    manage:"yönet",
    reset:"sıfırla",
    hide:"gizle",
    behavior:"Seçenekler",
    lang:"Dil",
    reset_:"Sıfırla",
    help:"Yardım",
    btn_ok:"Tamam",
    btn_cancel:"İptal",
    btn_close:"Kapat",
    btn_save:"Kaydet",
    btn_submit:"Gönder",
    btn_confirm:"Onayla",
    btn_delete:"Sil",
    btn_next:"Sonraki",
    usesetting:"Seçenekleri ve ayarları değiştir.",
    deactivated:"Dondurulan profiller",
    reactivated:"Yeniden etkinleştirilen profiller",
    confirmed:"Onaylanan istekler",
    declined:"Reddedilen istekler",
    onunfriend:"Biri beni sildiğinde ya da profilini dondurduğunda",
    oncanceled:"Arkadaşlık isteği iptal edildiğinde",
    othersettings:"Diğer ayarlar",
    icons:"Simgeleri göster",
    uids:"UID'leri göster",
    profilepics:"Profil resimlerini güncelle",
    hidemenubar:"Menü çubuğundaki Silenler'i gizle",
    dissociateLists:"Kabul Edilen ve Yok Sayılan İstekleri Böl",
    showTime:"Silenlerin kontrol tarihlerini göster",
    disabled:"iptal edildi",
    ok:"Tamam",
    error:"Hata",
    unblock:"Engellemeyi kaldır",
    block:"Engelle",
    clang:"Dil seç :",
    currentlang:"Şu anki dil",
    creset:"Sıfırlamak için tıkla",
    resetbody:"Değerleri sıfırlamak istediğinizden emin misin ?",
    selectall:"Tümünü seç",
    selectnone:"Hiçbirini seçme",
    use:"Kullan",
    display:"Görüntüle",
    text_ignored:"arkadaşlık isteğini yoksaydı.",
    text_unfriend:"artık arkadaş listende değil.",
    text_reactivated:"Profil yeniden aktifleştirildi",
    text_deactivated:"Profil Silindi ya da Gizlendi",
    text_being:"Profil Kapatılacak",
    text_unavailable:"Profil Kullanılamıyor",
    text_accepted:"arkadaşlık isteğini kabul etti",
    text_canceled:"arkadaşlık isteğini reddetti",
    text_pending:"Arkadaşlık İsteği Beklemede",
    nomessages:"Mesaj Yok",
    text_noa:"Bekleyen İstek Yok",
    text_nou:"Arkadaşlığı silen yok",
    text_error:"Bağlantıyı kaldırırken hata oluştu.",
    text_hideu:"Silenleri Gizle",
    text_hide:"Gizle",
    text_alwayshide:"Her Zaman Gizle",
    text_removec:"Bağlantıyı Kaldır",
    hasignored:"bir arkadaşlık isteğini yoksaydı.",
    new_version:"Yeni Sürüm",
    notif_version:"Yeni bir sürüm kullanılabilir durumda",
    here:"burada",
    wasunfriend:"arkadaş listendeydi.",
    settings:"Ayarlar",
    proceed:"Onayla",
    exportData:"Veriyi Dışarı Ver",
    importData:"Veriyi Dışarıdan Al",
    text_export:"Dışarı Ver",
    text_import:"Dışarıdan Al",
    dataToExport:"Dışarı verilecek veri",
    back1:"Facebook\'u başka bir bilgisayarda veya başka bir tarayıcı oturumunda kullanırsan, Silenler verilerini alamayabilirsin.",
    back2:"Bu geri yükleme aracını yedek almak/yüklemek veya başka bir Firefox oturumunu yüklemek için kullanabilirsin.",
    hideOwnUnfriends:"Sildiğin arkadaşları gizle",
    wontAppear:"Bu profil silenler listende görünmeyecek.",
    today:"Bugün",
    yesterday:"Dün",
    months:"Ocak, Şubat, Mart, Nisan, Mayıs, Haziran, Temmuz, Ağustos, Eylül, Ekim, Kasım, Aralık",
    hide_perm:"{name} kalıcı olarak gizlemek istediğinden emin misin?",
    header_unfriends:"Silenler",
    header_reappeared:"Yeniden aktifleşen",
    header_ignored:"Yoksayılan İstekler",
    header_accepted:"Kabul Edilen İstekler",
    header_both:"Kabul Edilen ve Yoksayılan İstekler",
    header_pending:"Bekleyen İstekler",
    resettitle:"Değerleri ilk haline getir",
    rvoid:"Uygulamayı sıfırlamak tüm verileri yok edecektir. Dikkatli olun."
};
$pl_PL = {
    langname:"Polski",
    unfriends:"Utraceni znajomi",
    awaiting:"Oczekujące zaproszenia",
    notifications:"Powiadomienia",
    messages:"Wiadomości",
    becomeFan:"Zostań fanem",
    isFan:"Jesteś fanem",
    joinGroup:"Dołącz do grupy",
    cancel:"Anuluj",
    change:"zmień",
    manage:"zarządzaj",
    reset:"zresetuj",
    hide:"ukryj",
    behavior:"Wygląd",
    lang:"Język",
    reset_:"Zresetuj",
    help:"Pomoc",
    btn_ok:"OK",
    btn_cancel:"Anuluj",
    btn_close:"Zamknij",
    btn_save:"Zapisz",
    btn_submit:"Wyślij",
    btn_confirm:"Potwierdź",
    btn_delete:"Usuń",
    btn_next:"Następny",
    usesetting:"Użyj tych ustawień do zarządzania zachowaniem skryptu",
    deactivated:"Profile dezaktywowane",
    reactivated:"Profile reaktywowane",
    confirmed:"Zaproszenia zaakceptowane",
    declined:"Zaproszenia odrzucone",
    onunfriend:"Kiedy straciłeś znajomego",
    oncanceled:"Kiedy zaproszenie do znajomości zostało anulowane",
    othersettings:"Inne ustawienia",
    icons:"Wyświetl ikony",
    uids:"Wyświetl UID",
    profilepics:"Zaktualizuj zdjęcia profilu",
    hidemenubar:"Usuń etykietę Utraconych znajomych z paska menu",
    dissociateLists:"Rozdziel zaproszenia zaakceptowane i zignorowane",
    showTime:"Pokaż Utraconych znajomych, sprawdź daty",
    disabled:"wyłączone",
    ok:"Ok",
    error:"Błąd",
    unblock:"Odblokuj",
    block:"Zablokuj",
    clang:"Wybierz język:",
    currentlang:"Aktualny język:",
    creset:"Kliknij by zresetować",
    resetbody:"Jesteś pewien, że chcesz zresetować wartości?",
    selectall:"Wybierz Wszystkie",
    selectnone:"Wybierz Brak",
    use:"Użyj",
    display:"Wyświetl",
    text_ignored:"zignorował/a Twoje zaproszenie do znajomych.",
    text_unfriend:"nie jest już na Twojej liście znajomych.",
    text_reactivated:"Profil reaktywowany",
    text_deactivated:"Profil skasowany lub ukryty",
    text_being:"Profil jest deaktywowany",
    text_unavailable:"Profil niedostępny",
    text_accepted:"Zaproszenie do znajomych przyjęte",
    text_canceled:"Zaproszenie do znajomych odrzucone",
    text_pending:"Oczekujące zaproszenie do znajomych",
    nomessages:"Brak Wiadomości",
    text_noa:"Brak zaproszeń oczekujących",
    text_nou:"Brak Utraconych znajomych",
    text_error:"Błąd podczas usuwania połączenia.",
    text_hideu:"Ukryj Utraconego znajomego",
    text_hide:"Ukryj",
    text_alwayshide:"Zawsze chowaj",
    text_removec:"Usuń połączenie",
    hasignored:"zignorował/a jedno z zaproszeń do znajomych",
    new_version:"Nowa wersja",
    notif_version:"Nowa wersja jest dostępna",
    here:"tutaj",
    wasunfriend:"był/a na Twojej liście znajomych.",
    settings:"Ustawienia",
    proceed:"Kontynuuj",
    exportData:"Eksportuj dane",
    importData:"Importuj dane",
    text_export:"Eksportuj",
    text_import:"Importuj",
    dataToExport:"Dane do wyeksportowania",
    back1:"Lista Utraconych znajomych jest przechowywana lokalnie. Znaczy to, że jeśli będziesz korzystać z facebooka na innym komputerze, lub w innej sesji firefoxa, nie będziesz miał/a dostępu do swoich Utraconych znajomych.",
    back2:"Użyj tego narzędzia do kopii zapasowych by eksportować lub importować listę do lub z innej przeglądarki firefox.",
    hideOwnUnfriends:"Schowaj znajomych których usuwasz",
    wontAppear:"Ten profil nie będzie pojawiał się na Twojej liście Utraconych znajomych.",
    today:"Dzisiaj",
    yesterday:"Wczoraj",
    months:"Styczeń, Luty, Marzec, Kwiecień, Maj, Czerwiec, Lipiec, Sierpień, Wrzesień, Październik, Listopad, Grudzień",
    hide_perm:"Czy chcesz ukryć na stałe {name}?",
    header_unfriends:"Utraceni znajomi",
    header_reappeared:"Pojawił się ponownie",
    header_ignored:"Zaproszenia zignorowane",
    header_accepted:"Zaproszenia zaakceptowane",
    header_both:"Zaproszenia zaakceptowane i zignorowane",
    header_pending:"Zaproszenia oczekujące",
    resettitle:"Zresetuj zmienne do wartości domyślnych",
    rvoid:"Zresetowanie skryptu zniszczy wszystkie dane dotyczące Twoich AntyZnajomych. Bądź ostrożny."
};
$da_DK = {
    langname:"Dansk",
    unfriends:"Unfriends",
    awaiting:"Ventende Anmodninger",
    notifications:"Notifikationer",
    messages:"Beskeder",
    becomeFan:"Bliv fan",
    isFan:"Du er fan",
    joinGroup:"Tilmeld gruppe",
    cancel:"Annullér",
    change:"ændre",
    manage:"styr",
    reset:"nulstil",
    hide:"skjul",
    behavior:"Udseende",
    lang:"Sprog",
    reset_:"Nulstil",
    help:"Hjælp",
    btn_ok:"Ok",
    btn_cancel:"Annuller",
    btn_close:"Luk",
    btn_save:"Gem",
    btn_submit:"Indsend",
    btn_confirm:"Bekræft",
    btn_delete:"Slet",
    btn_next:"Næste",
    usesetting:"Brug disse indstillinger til at styre scriptets opførsel",
    deactivated:"Profiler deaktiverede",
    reactivated:"Profiler genaktiverede",
    confirmed:"Anmodninger bekræftet",
    declined:"Anmodninger afvist",
    onunfriend:"Når du får en unfriend",
    oncanceled:"Når en venneanmodning var afvist",
    othersettings:"Andre indstillinger",
    icons:"Vis ikoner",
    uids:"Vis UID'er",
    profilepics:"Opdater profilbilleder",
    hidemenubar:"Skjul Unfriends fra menubaren",
    dissociateLists:"Adskil accepterede og ignorerede anmodninger",
    showTime:"Vis Unfriends tjek datoer",
    disabled:"deaktiveret",
    ok:"Ok",
    error:"Fejl",
    unblock:"Fjern blokering",
    block:"Bloker",
    clang:"Vælg dit sprog:",
    currentlang:"Nuværende sprog",
    creset:"Klik for at nulstille",
    resetbody:"Er du sikker på at du vil nulstille værdierne?",
    selectall:"Vælg Alle",
    selectnone:"Vælg Ingen",
    use:"Brug",
    display:"Vis",
    text_ignored:"Ignorede din venne anmodning.",
    text_unfriend:"er ikke længere på din venneliste.",
    text_reactivated:"Profil genaktiveret.",
    text_deactivated:"Profil slettet eller skjult",
    text_being:"Profil deaktiveret.",
    text_unavailable:"Profil ikke tilgængelig.",
    text_accepted:"Venne anmodning accepteret.",
    text_canceled:"Venne anmodning afvist.",
    text_pending:"Venter på accept.",
    nomessages:"Ingen Beskeder",
    text_noa:"Ingen ventende anmodninger.",
    text_nou:"Ingen Unfriends.",
    text_error:"Fejl ved fjernelse af forbindelse.",
    text_hideu:"Skjul Unfriend",
    text_hide:"Skjul",
    text_alwayshide:"Skjul altid",
    text_removec:"Fjern forbindelse",
    hasignored:"ignorerede en af din venneanmodninger",
    new_version:"Ny Version",
    notif_version:"En ny version er tilgængelig",
    here:"her",
    wasunfriend:"var på din venneliste.",
    settings:"Indstillinger",
    proceed:"Fortsæt",
    exportData:"Eksporter data",
    importData:"Importer data",
    text_export:"Eksporter data",
    text_import:"Importer data",
    dataToExport:"Data der skal eksporteres",
    back1:"Denne unfriend liste er lokal. Det betyder at hvis du logger på facebook fra en anden computer, eller en anden session, vil du ikke være i stand til at få dine unfriends.",
    back2:"Brug dette backup værktøj til at exportere eller importere dine lister til og fra andre computere.",
    hideOwnUnfriends:"Skjul venner som du fjerner",
    wontAppear:"Denne profil bliver ikke vist på din unfriends liste.",
    today:"I dag",
    yesterday:"I går",
    months:"Januar, Februar, Marts, April, Maj, Juni, Juli, August, September, Oktober, November, December",
    hide_perm:"Vil du skjule {name} permanent?",
    header_unfriends:"Unfriends",
    header_reappeared:"Kom til syne igen",
    header_ignored:"Anmodninger ignorerede",
    header_accepted:"Anmodninger accepterede",
    header_both:"Anmodninger Accepteret og Ignoreret",
    header_pending:"Anmodning venter",
    resettitle:"Nulstil værdier til standard",
    rvoid:"Pas på med nulstilling, det sletter scriptets indstillinger og data."
};
$fi_FI = {
    langname:"Suomi",
    unfriends:"Ex-ystävät",
    awaiting:"Odottavat pyynnöt",
    notifications:"Huomautukset",
    messages:"Viestit",
    becomeFan:"Tule faniksi",
    isFan:"Olet fani",
    joinGroup:"Liity ryhmään",
    cancel:"Peruuta",
    change:"näytä",
    manage:"muokkaa",
    reset:"nollaus",
    hide:"piilota",
    behavior:"Asetukset",
    lang:"Kieli",
    reset_:"Reset",
    help:"Ohje",
    btn_ok:"OK",
    btn_cancel:"Peruuta",
    btn_close:"Sulje",
    btn_save:"Tallenna",
    btn_submit:"Lähetä",
    btn_confirm:"Vahvista",
    btn_delete:"Poista",
    btn_next:"Seuraava",
    usesetting:"Muokkaa skriptin asetuksia",
    deactivated:"Profiili poistettu",
    reactivated:"Profiili aktivoitu",
    confirmed:"Pyyntö hyväksytty",
    declined:"Pyyntö hylätty",
    onunfriend:"Kun kaveruus poistetaan",
    oncanceled:"Kun kaveripyyntösi hylätään",
    othersettings:"Muut asetukset",
    icons:"Näytä kuvakkeet",
    uids:"Näytä UID:",
    profilepics:"Päivitä profiilikuvat",
    hidemenubar:"Poista Ex-ystävä valikosta",
    dissociateLists:"Jaa hyväksytyt ja hylätyt pyynnöt",
    showTime:"Näytä ex-ystävän tarkistusajat.",
    disabled:"pois käytöstä",
    ok:"Ok",
    error:"Virhe",
    unblock:"Salli",
    block:"Estä",
    clang:"Valitse kielesi :",
    currentlang:"Nykyinen kieli",
    creset:"Paina nollataksesi",
    resetbody:"Oletko varma että haluat palauttaa oletusasetukset?",
    selectall:"Valitse Kaikki",
    selectnone:"Valitse Ei mitään",
    use:"Käytä",
    display:"Näyttö",
    text_ignored:"hylkäsi kaveripyyntösi",
    text_unfriend:"ei ole enää kaverilistallasi.",
    text_reactivated:"Profiili aktivoitiin uudelleen",
    text_deactivated:"Profiili poistettu tai piilotettu",
    text_being:"Profiili on poissa käytöstä",
    text_unavailable:"Profiili tavoittamattomissa",
    text_accepted:"Kaveripyyntö hyväksytty",
    text_canceled:"Kaveripyyntö hylätty",
    text_pending:"Kaveripyyntö odottaa",
    nomessages:"Ei Viestit",
    text_noa:"Ei odottavia pyyntöjä",
    text_nou:"Ei ex-ystäviä.",
    text_error:"Virhe poistettaessa tietoja",
    text_hideu:"Piilota ex-ystävä",
    text_hide:"Piilota",
    text_alwayshide:"Piilota aina",
    text_removec:"Peru pyyntö",
    hasignored:"yksi ystävä pyynnöistäsi on jätetty huomioimatta",
    new_version:"Uusi Versio",
    notif_version:"Uusi versio on saatavilla!",
    here:"Täällä",
    wasunfriend:"oli kaverilistallasi.",
    settings:"Asetukset",
    proceed:"Hyväksy",
    exportData:"Vie tietoa",
    importData:"Tuo tietoa",
    text_export:"Vie",
    text_import:"Tuo",
    dataToExport:"Tiedot jotka viedään",
    back1:"Ex-ystävä listasi on paikallinen, eli listasi voi olla erillainen toisella koneella ja et saa tietoa hylkäämisistä..",
    back2:"Tällä varmuuskopiointityökalulla voit siirtää listan tietoja koneesta toiseen.",
    hideOwnUnfriends:"Piilota kaverit jotka sinä poistat",
    wontAppear:"Tämä profiili ei ilmesty ex-ystävän listalla.",
    today:"Tänään",
    yesterday:"Eilen",
    months:"Tammikuu, Helmikuu, Maaliskuu, Huhtikuu, Toukokuu, Kesäkuu, Heinäkuu, Elokuu, Syyskuu, Lokakuu, Marraskuu, Joulukuu",
    hide_perm:"Haluatko piilottaa lopullisesti henkilön {name} ?",
    header_unfriends:"Ex-ystävät",
    header_reappeared:"Palautuneet profiilit",
    header_ignored:"Hylätyt pyynnöt",
    header_accepted:"Hyväksytyt pyynnöt",
    header_both:"Hyväksytyt & Hylätyt pyynnöt",
    header_pending:"Odottavat pyynnöt",
    resettitle:"Palauta asetukset oletuksiin",
    rvoid:"Asetusten palauttaminen oletuksiksi poistaa kaiken tiedot. Ole varovainen."
};
$sv_SE = {
    langname:"Svenska",
    unfriends:"Borttagna vänner",
    awaiting:"Inväntande",
    notifications:"Notifieringar",
    messages:"Meddelanden",
    becomeFan:"Bli ett fan",
    isFan:"Du är ett fan",
    joinGroup:"Gå med i grupp",
    cancel:"Avbryt",
    change:"ändra",
    manage:"hantera",
    reset:"återställ",
    hide:"dölj",
    behavior:"Inställningar",
    lang:"Språk",
    reset_:"Återställ",
    help:"Hjälp",
    btn_ok:"OK",
    btn_cancel:"Avbryt",
    btn_close:"Stäng",
    btn_save:"Spara",
    btn_submit:"Skicka",
    btn_confirm:"Bekräfta",
    btn_delete:"Ta bort",
    btn_next:"Nästa",
    usesetting:"Använd dessa inställningar för att ändra beteende på scriptet.",
    deactivated:"Profiler avaktiverade",
    reactivated:"Profiler återaktiverade",
    confirmed:"Godkända förfrågningar",
    declined:"Avvisade förfrågningar",
    onunfriend:"När en vän tagits bort",
    oncanceled:"När en vänförfrågan avvisats",
    othersettings:"Övriga inställningar",
    icons:"Visa ikoner",
    uids:"Visa UID",
    profilepics:"Uppdatera profilbilder",
    hidemenubar:"Dölj 'Borttagna vänner' i menyn",
    dissociateLists:"Dela upp accepterade och ignorerade vänförfrågningar",
    showTime:"Visa Unfriends kontrolldatum",
    disabled:"inaktiverat",
    ok:"OK",
    error:"Fel",
    unblock:"Ta bort blockering",
    block:"Blockera",
    clang:"Välj språk:",
    currentlang:"Nuvarande språk",
    creset:"Klicka för att återställa",
    resetbody:"Är du säker på att du vill återställa alla värden?",
    selectall:"Välj alla",
    selectnone:"Välj inga",
    use:"Använd",
    display:"Visa",
    text_ignored:"ignorerade din vänförfrågan.",
    text_unfriend:"är inte längre i din vänlista.",
    text_reactivated:"Profil återaktiverad",
    text_deactivated:"Profil borttagen eller dold",
    text_being:"Profilen är inaktiverad",
    text_unavailable:"Profil otillgänglig",
    text_accepted:"Vänförfrågan accepterad",
    text_canceled:"Vänförfrågan avvisad",
    text_pending:"Avvaktande vänförfrågan",
    nomessages:"Inga meddelanden",
    text_noa:"Ingen väntande förfrågan",
    text_nou:"Inga borttagna vänner",
    text_error:"Fel vid borttagning av anslutning.",
    text_hideu:"Dölj 'Borttagna vänner'",
    text_hide:"Dölj",
    text_alwayshide:"Alltid dold",
    text_removec:"Ta bort anslutning",
    hasignored:"ignorerade en av dina vänförfrågningar",
    new_version:"Ny version",
    notif_version:"En ny version finns tillgänglig",
    here:"här",
    wasunfriend:"var i din vänlista.",
    settings:"Inställningar",
    proceed:"Fortsätt",
    exportData:"Exportera data",
    importData:"Importera data",
    text_export:"Exportera",
    text_import:"Importera",
    dataToExport:"Data att exportera",
    back1:"\'Borttagna vänner\'-listan är lokal. Det innebär att om du använder Facebook på en annan dator eller en annan webbläsarsession, kommer du inte ha tillgång till dina borttagna vänner.",
    back2:"Använd detta backup-verktyg for att importera eller exportera dina borttagna vänner till eller från en annan webbläsare.",
    hideOwnUnfriends:"Dölj vänner som du tar bort",
    wontAppear:"Denna profil kommer inte att visas i din \'Borttagna vänner\'-lista.",
    today:"Idag",
    yesterday:"Igår",
    months:"Januari, Februari, Mars, April, Maj, Juni, Juli, Augusti, September, Oktober, November, December",
    hide_perm:"Vill du dölja {name} tills vidare?",
    header_unfriends:"Borttagna vänner",
    header_reappeared:"Återkom",
    header_ignored:"Ignorerade vänförfrågningar",
    header_accepted:"Accepterade vänförfrågningar",
    header_both:"Accepterade och ignorerade vänförfrågningar",
    header_pending:"Pågående vänförfrågor",
    resettitle:"Återställ värden till standard",
    rvoid:"Återställning av scriptet förstör all data om dina borttagna vänner. Var försiktig."
};
$nn_NO = {
    langname:"Norsk (nynorsk)",
    unfriends:"Unfriends",
    awaiting:"Venter på godkjenning",
    notifications:"Advarsler",
    messages:"Messages",
    becomeFan:"Liker",
    isFan:"Du liker dette",
    joinGroup:"Bli medlem",
    cancel:"Avbryt",
    change:"rediger",
    manage:"håndter",
    reset:"tilbakestill",
    hide:"skjul",
    behavior:"Oppførsel",
    lang:"Språk",
    reset_:"Tilbakestill",
    help:"Hjelp",
    btn_ok:"Okey",
    btn_cancel:"Avbryt",
    btn_close:"Lukk",
    btn_save:"Lagre",
    btn_submit:"Send",
    btn_confirm:"Bekreft",
    btn_delete:"Slett",
    btn_next:"Neste",
    usesetting:"Bruk disse innstillingene til å håndtere virkemåten til skriptet",
    deactivated:"Profiler deaktivert",
    reactivated:"Profiler reaktivert",
    confirmed:"Forespørsler bekreftet",
    declined:"Forespørsler avvist",
    onunfriend:"Når du får en unfriend",
    oncanceled:"Når en venneforespørsel er avvist",
    othersettings:"Andre innstillinger",
    icons:"Vis ikoner",
    uids:"Vis BrukerID-er",
    profilepics:"Oppdater profilbilder",
    hidemenubar:"Skjul Unfriends i menylinja",
    dissociateLists:"Splitt Aksepterte og Ignorerte forespørsler",
    showTime:"Vis Unfriends sjekk datoer",
    disabled:"deaktivert",
    ok:"Ok",
    error:"Error",
    unblock:"Fjern blokkering",
    block:"Blokker",
    clang:"Velg språk :",
    currentlang:"Nåverende språk",
    creset:"Klikk for å tilbakestille",
    resetbody:"Er du sikker på at du vil tilbakestille verdiene?",
    selectall:"Alle",
    selectnone:"Ingen",
    use:"Bruk",
    display:"Vis",
    text_ignored:"ignorerte din forespørsel.",
    text_unfriend:"er ikke lenger i din vennelsite.",
    text_reactivated:"Profil reaktivert",
    text_deactivated:"Profil slettet eller skjult",
    text_being:"Profilen blir deaktivert",
    text_unavailable:"Profilen er utilgjengelig",
    text_accepted:"Venneforespørselen er godkjent",
    text_canceled:"Venneforespørselen er avvist",
    text_pending:"Friend Request Pending",
    nomessages:"Ingen Messages",
    text_noa:"Ingen ventende forespørsler",
    text_nou:"Ingen Unfriends",
    text_error:"Feil under fjerning av tilkobling.",
    text_hideu:"Skjul Unfriend",
    text_hide:"Skjul",
    text_alwayshide:"Alltid Skjul",
    text_removec:"Fjern tilkobling.",
    hasignored:"ignorerte en av dine venneforespørsel",
    new_version:"Ny Versjon",
    notif_version:"En ny versjon er tilgjengelig",
    here:"her",
    wasunfriend:"var i vennelisten din.",
    settings:"Innstillinger",
    proceed:"Fortsett",
    exportData:"Exporter Data",
    importData:"Importer Data",
    text_export:"Exporter",
    text_import:"Importer",
    dataToExport:"Data som skal exporteres",
    back1:"Unfriends lista er lokal. Det betyr at hvis du bruker facebook på en annen datamaskin, eller en annen firefox økt, vil du ikke kunne se dine unfriends.",
    back2:"Bruk dette sikkerhetskopi-verktøyet til å eksportere eller importere listen til eller fra en annen nettleser Firefox.",
    hideOwnUnfriends:"Skjul venner som DU fjerner",
    wontAppear:"Denne profilen vil ikke vises i unfriends listen.",
    today:"I dag",
    yesterday:"I går",
    months:"Januar, Februar, Mars, April, Mai, Juni, Juli, August, September, Oktober, November, Desember",
    hide_perm:"Vil du skjule {name} permanent ?",
    header_unfriends:"Unfriends",
    header_reappeared:"Profiler som har dukket opp igjen",
    header_ignored:"Ignorerte Forespørsler",
    header_accepted:"Aksepterte Forespørsler",
    header_both:"Aksepterte & Ignorerte Forespørsler",
    header_pending:"Ventende Forespørsler",
    resettitle:"Tilbakestill verdier til standard",
    rvoid:"Å tilbakestille skriptet ødelegger alle data om dine unfriends. Vær forsiktig."
};
$nb_NO = {
    langname:"Norsk (bokmål)",
    unfriends:"Uvenner",
    awaiting:"Ventende forespørsler",
    notifications:"Varsler",
    messages:"Meldinger",
    becomeFan:"Liker",
    isFan:"Du liker dette",
    joinGroup:"Bli medlem i gruppen",
    cancel:"Avbryt",
    change:"endre",
    manage:"administrér",
    reset:"nullstill",
    hide:"skjul",
    behavior:"Visning",
    lang:"Språk",
    reset_:"Tilbakestill",
    help:"Hjelp",
    btn_ok:"OK",
    btn_cancel:"Avbryt",
    btn_close:"Lukk",
    btn_save:"Lagre",
    btn_submit:"Send inn",
    btn_confirm:"Bekreft",
    btn_delete:"Slett",
    btn_next:"Neste",
    usesetting:"Bruk disse innstillingene for å styre oppførselen til scriptet.",
    deactivated:"Profiler deaktivert",
    reactivated:"Profiler reaktivert",
    confirmed:"Forespørsler godtatt",
    declined:"Forespørsler avslått",
    onunfriend:"Når noen fjerner deg eller deaktiverer sin bruker",
    oncanceled:"Når en venneforespørsel blir avslått",
    othersettings:"Andre innstillinger",
    icons:"Vis ikoner",
    uids:"Vis UIDer",
    profilepics:"Oppdater profilbilder",
    hidemenubar:"Skjul \"Uvenner\" i menybaren",
    dissociateLists:"Skill aksepterte og ignorerte forespørsler",
    showTime:"Vis dato",
    disabled:"deaktivert",
    ok:"OK",
    error:"Feil",
    unblock:"Fjern blokkering",
    block:"Blokker",
    clang:"Velg ditt språk:",
    currentlang:"Gjeldende språk",
    creset:"Tilbakestill valgt data",
    resetbody:"Advarsel: Nullstilling av verdiene for scriptet vil fjerne alle innstillinger og genererte data. Ønsker du å fortsette?",
    selectall:"Velg alle",
    selectnone:"Velg ingen",
    use:"Bruk",
    display:"Vis",
    text_ignored:"ignorerte din venneforespørsel.",
    text_unfriend:"er ikke lenger i din venneliste.",
    text_reactivated:"Profil reaktivert",
    text_deactivated:"Profil deaktivert",
    text_being:"Profilen er deaktivert",
    text_unavailable:"Profilen er utilgjengelig",
    text_accepted:"godtok din venneforespørsel",
    text_canceled:"avslo din venneforespørsel",
    text_pending:"Venneforespørsel venter",
    nomessages:"Ingen meldinger",
    text_noa:"Ingen ventende forespørsler",
    text_nou:"Ingen uvenner",
    text_error:"Feil under avbryting av venneforespørsel.",
    text_hideu:"Skjul denne uvennen",
    text_hide:"Skjul",
    text_alwayshide:"Skjul alltid",
    text_removec:"Fjern forespørsel",
    hasignored:"ignorerte en av dine venneforespørsler.",
    new_version:"Ny versjon",
    notif_version:"En ny verson er tilgjengelig",
    here:"her",
    wasunfriend:"var i din venneliste.",
    settings:"Innstillinger",
    proceed:"Fortsett",
    exportData:"Eksporter data",
    importData:"Importer data",
    text_export:"Eksporter",
    text_import:"Importer",
    dataToExport:"Data til eksportering",
    back1:"Uvenner-listen er lokalt generert. Dette betyr at hvis du bruker Facebook på en annen datamaskin, eller en annen nettleser-økt, vil du ikke kunne vise dine uvenner.",
    back2:"Bruk dette sikkerhetskopi-verktøyet for å importere dine innstillinger og genererte Uvenner data til en annen datamaskin eller nettleser.",
    hideOwnUnfriends:"Skjul venner du fjerner",
    wontAppear:"Denne profilen vil ikke vises i uvenner-listen din.",
    today:"I dag",
    yesterday:"I går",
    months:"Januar, Februar, Mars, April, Mai, Juni, Juli, August, September, Oktober, November, Desember",
    hide_perm:"Vil du skjule {name} permanent?",
    header_unfriends:"Uvenner",
    header_reappeared:"Dukket opp igjen",
    header_ignored:"Forespørsler ignorert",
    header_accepted:"Forespørsler akseptert",
    header_both:"Forespørsler akseptert og ignorert",
    header_pending:"Forespørsler venter",
    resettitle:"Tilbakestill verdier og innstillinger til standard.",
    rvoid:"Kryss av i boksene som du ønsker å tilbakestille til standard. Som en forholdsregel, anbefales det sterkt å lage en sikkerhetskopi av dine innstillinger og genererte data ved hjelp av eksport verktøyet nedenfor."
};
$pt_BR = {
    langname:"Português (Brasil)",
    unfriends:"Ex-amigos",
    awaiting:"Aguardando pedidos",
    notifications:"Notificações",
    messages:"Mensagens",
    becomeFan:"Seja um Fã",
    isFan:"Você já é um fã",
    joinGroup:"Participe do grupo",
    cancel:"Cancelar",
    change:"alterar",
    manage:"gerencie",
    reset:"resetar",
    hide:"ocultar",
    behavior:"Aparência",
    lang:"Idioma",
    reset_:"Restaura",
    help:"Ajuda",
    btn_ok:"Confirma",
    btn_cancel:"Cancela",
    btn_close:"Fechar",
    btn_save:"Salvar",
    btn_submit:"Enviar",
    btn_confirm:"Confirmar",
    btn_delete:"Deletar",
    btn_next:"Próximo",
    usesetting:"Use estas configurações para gerenciar o funcionamento do script",
    deactivated:"Perfis desativados",
    reactivated:"Perfis reativados",
    confirmed:"Pedidos aceitos",
    declined:"Pedidos negados",
    onunfriend:"Quando você tem um ex-amigo",
    oncanceled:"Quando o pedido de amizade é cancelado",
    othersettings:"Outras configurações",
    icons:"Mostrar ícones",
    uids:"Mostrar UIDs",
    profilepics:"Atualizar imagens dos perfis",
    hidemenubar:"Ocultar Ex-amigos na barra de menus",
    dissociateLists:"Dividir pedidos aceitos e ignorados",
    showTime:"Mostrar datas de exclusão de ex-amigos",
    disabled:"desabilitado",
    ok:"Ok",
    error:"Erro",
    unblock:"Desbloquear",
    block:"Bloquear",
    clang:"Escolha seu idioma:",
    currentlang:"Idioma atual",
    creset:"Clique para resetar",
    resetbody:"Tem certeza de que deseja resetar?",
    selectall:"Selecionar tudo",
    selectnone:"Não selecionar nenhum",
    use:"Use",
    display:"Mostrar",
    text_ignored:"ignorou seu pedido de amizade.",
    text_unfriend:"não está mais em sua lista de amigos.",
    text_reactivated:"Perfil reativado",
    text_deactivated:"Perfil Excluído ou Oculto",
    text_being:"Perfil Sendo Desativado",
    text_unavailable:"Perfil Indisponível",
    text_accepted:"Pedido de Amizade Aceito",
    text_canceled:"Pedido de Amizade Negado",
    text_pending:"Pedido de Amizade Pendente",
    nomessages:"Nenhuma mensagem",
    text_noa:"Nenhum pedido pendente",
    text_nou:"Nenhum ex-amigo",
    text_error:"Erro ao remover conexão.",
    text_hideu:"Ocultar ex-amigo",
    text_hide:"Ocultar",
    text_alwayshide:"Sempre Ocultar",
    text_removec:"Remover conexão",
    hasignored:"ignorou um pedido de amizade seu",
    new_version:"Nova Versão",
    notif_version:"Uma nova versão está disponível",
    here:"aqui",
    wasunfriend:"estava em sua lista de amigos.",
    settings:"Configurações",
    proceed:"Proceder",
    exportData:"Exportar Dados",
    importData:"Importar Dados",
    text_export:"Exportar",
    text_import:"Importar",
    dataToExport:"Dados para exportar",
    back1:"A lista de ex-amigos é local e acessível apenas deste computador.",
    back2:"Use a ferramenta de backup para exportar ou importar para ou de outro navegador.",
    hideOwnUnfriends:"Ocultar amigos que você remover",
    wontAppear:"Este perfil não aparece em sua lista de ex-amigos.",
    today:"Hoje",
    yesterday:"Ontem",
    months:"Janeiro, Fevereiro, Março, Abril, Maio, Junho, Julho, Agosto, Setembro, Outubro, Novembro, Dezembro",
    hide_perm:"Você quer ocultar permanentemente {name} ?",
    header_unfriends:"Ex-amigos",
    header_reappeared:"Reapareceu",
    header_ignored:"Pedidos Ignorados",
    header_accepted:"Pedidos Aceites",
    header_both:"Pedidos Aceitos & Ignorados",
    header_pending:"Pedidos Pendentes",
    resettitle:"Voltar aos valores padrão",
    rvoid:"Efetuando o reset no script todos os dados sobre seus ex-amigos serão destruídos. Tenha cuidado."
};
$pt_PT = {
    langname:"Português (Portugal)",
    unfriends:"Não-amigos",
    awaiting:"Pedidos pendentes",
    notifications:"Notificações",
    messages:"Mensagens",
    becomeFan:"Torna-te fã",
    isFan:"És fã",
    joinGroup:"Aderir ao grupo",
    cancel:"Cancelar",
    change:"alterar",
    manage:"gerir",
    reset:"repor valores de origem",
    hide:"ocultar",
    behavior:"Aparência",
    lang:"Idioma",
    reset_:"Repor valores de origem",
    help:"Ajuda",
    btn_ok:"Ok",
    btn_cancel:"Cancelar",
    btn_close:"Fechar",
    btn_save:"Gravar",
    btn_submit:"Enviar",
    btn_confirm:"Confirmar",
    btn_delete:"Apagar",
    btn_next:"Próximo",
    usesetting:"Usa estas configurações para controlar o comportamento do script",
    deactivated:"Perfis desactivados",
    reactivated:"Perfis reactivados",
    confirmed:"Pedidos confirmados",
    declined:"Pedidos recusados",
    onunfriend:"Quando tu ganhas um não-amigo",
    oncanceled:"Quando um pedido de amizade é cancelado",
    othersettings:"Outras definições",
    icons:"Mostrar ícones",
    uids:"Mostrar IDs de utilizador",
    profilepics:"Actualizar fotos de perfil",
    hidemenubar:"Ocultar não-amigos da barra de menu",
    dissociateLists:"Separar pedidos aceites de ignorados",
    showTime:"Mostrar data de verificação de não-amigos",
    disabled:"desactivado",
    ok:"Ok",
    error:"Erro",
    unblock:"Desbloquear",
    block:"Bloquear",
    clang:"Escolhe o teu idioma:",
    currentlang:"Idioma actual",
    creset:"Clica para repor valores de origem",
    resetbody:"Tens a certeza que queres repor os valores de origem?",
    selectall:"Escolha Todas",
    selectnone:"Escolha Nenhuma",
    use:"Usar",
    display:"Mostrar",
    text_ignored:"ignorou o teu pedido de amizade.",
    text_unfriend:"já não está na tua lista de amigos.",
    text_reactivated:"Perfil reactivado",
    text_deactivated:"Perfil apagado ou escondido",
    text_being:"Perfil está a ser desactivado",
    text_unavailable:"Perfil indisponível",
    text_accepted:"Pedido de amizade aceite",
    text_canceled:"Pedido de amizade cancelado",
    text_pending:"Pedido de amizade pendente",
    nomessages:"Sem Mensagens",
    text_noa:"Sem pedidos pendentes",
    text_nou:"Sem não-amigos",
    text_error:"Erro ao remover a ligação.",
    text_hideu:"Ocultar não-amigo",
    text_hide:"Ocultar",
    text_alwayshide:"Ocultar sempre",
    text_removec:"Remover a ligação",
    hasignored:"ignorou um dos teus pedidos de amizade.",
    new_version:"Nova versão",
    notif_version:"Uma nova versão está disponível",
    here:"aqui",
    wasunfriend:"estava na tua lista de amigos.",
    settings:"Definições",
    proceed:"Proceder",
    exportData:"Exportar dados",
    importData:"Importar dados",
    text_export:"Exportar",
    text_import:"Importar",
    dataToExport:"Dados para exportar",
    back1:"A lista de não-amigos é local. Isso significa que se tu usares o Facebook noutro computador, ou noutra sessão do FireFox, não serás capaz de obter a tua lista de não-amigos.",
    back2:"Usa esta ferramenta de backup para exportares ou importares as tuas listas de ou para outro navegador Firefox.",
    hideOwnUnfriends:"Ocultar amigos que tu removeste",
    wontAppear:"Este perfil não aparecerá mais na tua lista de não-amigos.",
    today:"Hoje",
    yesterday:"Ontem",
    months:"Janeiro, Fevereiro, Março, Abril, Maio, Junho, Julho, Agosto, Setembro, Outubro, Novembro, Dezembro",
    hide_perm:"Queres ocultar permanentemente {name}?",
    header_unfriends:"Não-amigos",
    header_reappeared:"Reapareceu",
    header_ignored:"Pedidos Ignorados",
    header_accepted:"Pedidos Aceites",
    header_both:"Pedidos Aceites e Ignorados",
    header_pending:"Pedidos Pendentes",
    resettitle:"Repor valores de origem",
    rvoid:"Cuidado! Repor os valores de origem do script destrói toda a informação relativa aos teus não-amigos."
};
$ru_RU = {
    langname:"Русский",
    unfriends:"Недруги",
    awaiting:"Ожидающие запросы",
    notifications:"Извещения",
    messages:"Сообщения",
    becomeFan:"Стань фанатом",
    isFan:"Вы — фанат",
    joinGroup:"Вступить в группу",
    cancel:"Отмена",
    change:"изменить",
    manage:"настройки",
    reset:"сбросить",
    hide:"спрятать",
    behavior:"Вид",
    lang:"Язык",
    reset_:"Сброс",
    help:"Помощь",
    btn_ok:"Да",
    btn_cancel:"Отменить",
    btn_close:"Закрыть",
    btn_save:"Сохранить",
    btn_submit:"Ввести",
    btn_confirm:"Подтвердить",
    btn_delete:"Убрать",
    btn_next:"Следующий",
    usesetting:"Здесь настраивается работа программы",
    deactivated:"Профили разактивированы",
    reactivated:"Профили заново активированы",
    confirmed:"Запросы подтверждены",
    declined:"Отказанные запросы",
    onunfriend:"Когда закончилась дружба",
    oncanceled:"Когда запрос дружить был отклонен",
    othersettings:"Другие настройки",
    icons:"Показывать иконки",
    uids:"Показывать UIDы",
    profilepics:"Обновить фотографию профиля",
    hidemenubar:"Убрать недругов из меню",
    dissociateLists:"Разделять принятые и проигнорированные запросы",
    showTime:"Показать даты конца дружб",
    disabled:"выключено",
    ok:"Хорошо",
    error:"Ошибка",
    unblock:"Разблокировать",
    block:"Заблокировать",
    clang:"Выберите язык:",
    currentlang:"Включенный язык",
    creset:"Нажмите для сброса",
    resetbody:"Вы точно хотите всё сбросить?",
    selectall:"Выбрать всё",
    selectnone:"Не выбрать ничего",
    use:"Использовать",
    display:"Показать",
    text_ignored:"проигнорировал ваш запрос на дружбу.",
    text_unfriend:"перестал быть вашим другом.",
    text_reactivated:"Профиль активирован заново",
    text_deactivated:"Профиль уничтожен или спрятан",
    text_being:"Профиль деактивируется",
    text_unavailable:"Профиль недоступен",
    text_accepted:"Запрос дружить принят",
    text_canceled:"Запрос дружить отменен",
    text_pending:"Ожидающая просьба дружить",
    nomessages:"Нет сообщений",
    text_noa:"Нет ожидающих запросов",
    text_nou:"Нет недругов",
    text_error:"Ошибка при уничтожении связи.",
    text_hideu:"Спрятать недруга",
    text_hide:"Спрятать",
    text_alwayshide:"Всегда прятать",
    text_removec:"Убрать связь",
    hasignored:"проигнорировал ваш запрос на дружбу",
    new_version:"Новая версия",
    notif_version:"Доступна новая версия",
    here:"здесь",
    wasunfriend:"был в списке ваших друзей.",
    settings:"Настройки",
    proceed:"Продолжать",
    exportData:"Экспортировать информацию",
    importData:"Импортировать информацию",
    text_export:"Экспортировать",
    text_import:"Импортировать",
    dataToExport:"Экспортируемые данные",
    back1:"Список раздругов локальный, то есть, при использовании facebook на другом компьютере или в другой сессии, вы не сможете увидеть этот список.",
    back2:"Используйте это для экспорта или импорта ваших списков на или с другой программы.",
    hideOwnUnfriends:"Спрятать убранных друзей",
    wontAppear:"Этот профиль не будет виден в вашем списке раздругов.",
    today:"Сегодня",
    yesterday:"Вчера",
    months:"Январь, Февраль, Март, Апрел, Май, Июнь, Июль, Август, Сентябрь, Октябрь, Ноябрь, Декабрь",
    hide_perm:"Хотели бы вы навсегда спрятать {name} ?",
    header_unfriends:"Недруги",
    header_reappeared:"Появился заново",
    header_ignored:"Проигнорированные просьбы",
    header_accepted:"Принятые просьбы",
    header_both:"Принятые и проигнорированные запросы",
    header_pending:"Ожидающие просьбы",
    resettitle:"Сбросить всё",
    rvoid:"Сброс скрипта уничтожит всю вашу информацию про раздругов. Будьте осторожны."
};
$sk_SK = {
    langname:"Slovenčina",
    unfriends:"Expriatelia",
    awaiting:"Čakajúce žiadosti",
    notifications:"Upozornenia",
    messages:"Správy",
    becomeFan:"Staň sa fanúšikom",
    isFan:"Už ste fanušíkom",
    joinGroup:"Pridať sa do skupiny",
    cancel:"Zrušiť",
    change:"zmeniť",
    manage:"spravovať",
    reset:"obnoviť",
    hide:"skryť",
    behavior:"Vzhľad",
    lang:"Jazyk",
    reset_:"Obnoviť",
    help:"Pomoc",
    btn_ok:"Ok",
    btn_cancel:"Zrušiť",
    btn_close:"Zavriet",
    btn_save:"Uložiť",
    btn_submit:"Odoslať",
    btn_confirm:"Potvrdiť",
    btn_delete:"Vymazať",
    btn_next:"Ďalej",
    usesetting:"Použiť tieto nastavenia na úpravu správania skriptu",
    deactivated:"Deaktivované profily",
    reactivated:"Reaktivované profily",
    confirmed:"Potvrdené žiadosti",
    declined:"Zamietnuté žiadosti",
    onunfriend:"Keď sa zruší priateľstvo",
    oncanceled:"Keď bola žiadosť o priateľstvo zamietnutá",
    othersettings:"Ostatné nastavenia",
    icons:"Zobraziť ikony",
    uids:"Zobraziť UID",
    profilepics:"Aktualizovať profilové fotky",
    hidemenubar:"Skryť Expriateľov v hlavnom menu",
    dissociateLists:"Rozdeliť prijaté a odmietnuté žiadosti",
    showTime:"Zobraziť dátumy kontroly expriateľov",
    disabled:"zakázané",
    ok:"Ok",
    error:"Chyba",
    unblock:"Odblokovať",
    block:"Zablokovať",
    clang:"Vyberte si váš jazyk:",
    currentlang:"Aktuálny jazyk",
    creset:"Kliknite pre obnovenie",
    resetbody:"Ste si istý, že chcete obnoviť pôvodné nastavenia?",
    selectall:"Vybrať všetky",
    selectnone:"Zrušiť výber",
    use:"Použiť",
    display:"Zobraziť",
    text_ignored:"ignoroval/a tvoju žiadosť o priateľstvo.",
    text_unfriend:"už viac nie je vo vašom zozname priateľov.",
    text_reactivated:"Profil znova aktivovaný",
    text_deactivated:"Profil odstránený alebo skrytý",
    text_being:"Profil je deaktivovaný",
    text_unavailable:"Profil nedostupný",
    text_accepted:"Akceptoval vašu žiadosť o priateľstvo",
    text_canceled:"Žiadosť o priateľstvo bola zrušená",
    text_pending:"Čakajúca žiadosť o priateľstvo",
    nomessages:"Žiadne správy",
    text_noa:"Žiadne čakajúce žiadosti",
    text_nou:"Žiadni expriatelia",
    text_error:"Chyba počas odstraňovania pripojenia.",
    text_hideu:"Skryť expriateľov",
    text_hide:"Skryť",
    text_alwayshide:"Vždy Skryť",
    text_removec:"Odstrániť Pripojenie",
    hasignored:"jedna z vašich žiadostí bola ignorovaná.",
    new_version:"Nová Verzia",
    notif_version:"Nová verzia je dostupná",
    here:"tu",
    wasunfriend:"bol vo vašom zozname priateľov.",
    settings:"Nastavenia",
    proceed:"Pokračovať",
    exportData:"Exportovať Údaje",
    importData:"Importovať Údaje",
    text_export:"Exportovať",
    text_import:"Importovať",
    dataToExport:"Údaje pre export",
    back1:"Zoznam expriateľov je lokálny. To znamená, že ak použijete facebook na inom počítači, nebude možné získať zoznam vašich expriateľov.",
    back2:"Použite tento zálohovací nástroj pre export alebo import vašich expriateľov do iného prehliadača.",
    hideOwnUnfriends:"Skryť priateľov, ktorých odstránite",
    wontAppear:"Tento profil sa neobjaví vo vašom zozname expriateľov.",
    today:"Dnes",
    yesterday:"Včera",
    months:"Január, Február, Marec, Apríl, Máj, Jún, Júl, August, September, Október, November, December",
    hide_perm:"Chcete skryť natrvalo používateľa {name}?",
    header_unfriends:"Expriatelia",
    header_reappeared:"Znovuobjavení",
    header_ignored:"Ignorované Žiadosti",
    header_accepted:"Prijaté Žiadosti",
    header_both:"Prijaté a Ignorované Žiadosti",
    header_pending:"Čakajúce Žiadosti",
    resettitle:"Resetovať na základné nastavenia",
    rvoid:"Vyznačte polia, pri ktorých chcete obnoviť pôvodné nastavenia. Odporúčame zálohovať vaše nastavenia a údaje použitím exportovacieho nájstroja. Vynulovaním hodnôť sa zrušia všetky údaje o vašich expriateľoch."
};
$sl_SI = {
    langname:"Slovenščina",
    unfriends:"Neprijatelji",
    awaiting:"Čakanje prošnje",
    notifications:"Uradna obvestila",
    messages:"Sporočila",
    becomeFan:"Postanite fan",
    isFan:"Vi ste fan",
    joinGroup:"Pridruži se skupini",
    cancel:"Prekliči",
    change:"Sprememba ",
    manage:"Upravljati",
    reset:"resetuj",
    hide:"skriti",
    behavior:"Videz",
    lang:"Jeziki",
    reset_:"resetuj",
    help:"Pomoč",
    btn_ok:"Ok",
    btn_cancel:"Prekliči",
    btn_close:"Zapri",
    btn_save:"Shrani",
    btn_submit:"Pošlji",
    btn_confirm:"Potrdi",
    btn_delete:"Zbriši",
    btn_next:"Naprej",
    usesetting:"Uporabite to nastavitev za upravljanje obnašanja skripti",
    deactivated:"   Profili deaktivirani",
    reactivated:"Profili ponovno",
    confirmed:"Prošnja potrjena",
    declined:"Prošnja upadla",
    onunfriend:"Ko imaš neprijatelja",
    oncanceled:"Ko je bil odpovedan prijateljstvu",
    othersettings:"Druge nastavitve",
    icons:"Prikaži ikone",
    uids:"Prikaži UID",
    profilepics:"Ažuriraj profil slik",
    hidemenubar:"Skrivanje neprijatelja v jedilnik",
    dissociateLists:"Split Sprejeta in Prezrti Prošnje",
    showTime:"Pokaži neprijatelje preverite datume",
    disabled:"onemogočena",
    ok:"Ok",
    error:"Napaka",
    unblock:"Deblokiraj",
    block:"Blokiraj",
    clang:"Izberite jezik:",
    currentlang:"Trenutni jezik",
    creset:"Kliknite za ponastavitev",
    resetbody:"Ali ste prepričani, da želite ponastaviti vrednost?",
    selectall:"Izberi Vse",
    selectnone:"Izberi Prazna",
    use:"Uporaba",
    display:"Prikaži",
    text_ignored:"prezreti tvoje povabilo k prijateljstvu.",
    text_unfriend:"ni več v vašem prijatelj seznam.",
    text_reactivated:"Profil ponovno",
    text_deactivated:"Profil izbrisan ali skrit",
    text_being:"Profili bili deaktivirani",
    text_unavailable:"Profil ni na voljo",
    text_accepted:"Prijatelj zahtevku ugodeno",
    text_canceled:"Prijatelj prošnja preklicana",
    text_pending:"Prijatelj zahteva do",
    nomessages:"Št Sporočila",
    text_noa:"Št Čakanje na zahtevo",
    text_nou:"Št neprijatelja",
    text_error:"Napaka pri odstranjevanju povezavo.",
    text_hideu:"Skrij neprijatelja",
    text_hide:"Skrij",
    text_alwayshide:"Vedno skrij",
    text_removec:"Odstrani povezavo",
    hasignored:"prezreti enega od tvoje povabilo k prijateljstvu",
    new_version:"Nova različica   ",
    notif_version:"Nova različica je na voljo",
    here:"tukaj",
    wasunfriend:"je bil tvoj prijatelj v seznam.",
    settings:"Nastavitve",
    proceed:"Nadaljujemo",
    exportData:"Izvoz podatkov",
    importData:"Vzvoz podatkov",
    text_export:"Izvoz",
    text_import:"Vzvoz",
    dataToExport:"Podatki za izvoz",
    back1:"Neprijateljska seznam je lokalna. To pomeni, da če uporabljate Facebook v drugem računalniku, ali druga kresnica zasedanje, ne boste mogli dobiti svoje neprijatelje.",
    back2:"Uporabite to orodje za varnostno kopiranje uvoz ali izvoz vaš seznamov iz druge Firefox brskalnika.Uporabite to orodje za varnostno kopiranje uvoz ali izvoz vaš seznamov iz druge Firefox brskalnika.",
    hideOwnUnfriends:"Skriti prijatelje, da odstranite",
    wontAppear:"Ta profil ne bo pojavil na seznamu neprijatelja.",
    today:"Danes",
    yesterday:"Včeraj",
    months:"Januar, februar, marec, april, maj, junij, julij, avgust, september, oktober, november, december",
    hide_perm:"Ali želite skriti trajno (ime)?",
    header_unfriends:"Neprijatelji",
    header_reappeared:"Ponovno pojavil",
    header_ignored:"Prošnje prezrti",
    header_accepted:"Prošnje sprejete",
    header_both:"Prošnje sprejeti in prezrti",
    header_pending:"Prošnje Do",
    resettitle:"Ponastavi vrednosti na privzeto",
    rvoid:"Ponastavitev skripti uničuje vse svoje podatke o vaši neprijatelji. Bodite previdni."
};
$sr_RS = {
    langname:"Српски",
    unfriends:"Unfriends",
    awaiting:"Захтеви на чекању",
    notifications:"Обавештења",
    messages:"Поруке",
    becomeFan:"Постани обожавалац",
    isFan:"Обожавалац си.",
    joinGroup:"Придружи се",
    cancel:"Откажи",
    change:"промени",
    manage:"управљај",
    reset:"ресетуј",
    hide:"сакриј",
    behavior:"Изглед",
    lang:"Језик",
    reset_:"Ресетуј",
    help:"Помоћ",
    btn_ok:"У реду",
    btn_cancel:"Откажи",
    btn_close:"Затвори",
    btn_save:"Сачувај",
    btn_submit:"Пошаљи",
    btn_confirm:"Потврди",
    btn_delete:"Избриши",
    btn_next:"Даље",
    usesetting:"Користи ова подешавања за управљање понашањем скрипте",
    deactivated:"Профил деактивиран",
    reactivated:"Профил је поново активиран",
    confirmed:"Захтев потврђен",
    declined:"Захтев одбијен",
    onunfriend:"Када добијеш unfriend-а",
    oncanceled:"Када је отказан захтев за пријатељство",
    othersettings:"Остала подешавања",
    icons:"Прикажи иконице",
    uids:"Прикажи идентификационе бројеве корисника",
    profilepics:"Ажурирај слике профила",
    hidemenubar:"Сакриј Unfriends у менију",
    dissociateLists:"Раздвој прихваћене и игнорисане захтеве",
    showTime:"Покажи Unfriends време провере",
    disabled:"онемогућен",
    ok:"У реду",
    error:"Грешка",
    unblock:"Одблокирај",
    block:"Блокирај",
    clang:"Изабери свој језик :",
    currentlang:"Тренутни језик",
    creset:"Кликни да ресетујеш",
    resetbody:"Сигурно желиш да вратиш почетне вредности?",
    selectall:"Одабери све",
    selectnone:"Поништи одабир",
    use:"Користи",
    display:"Прикажи",
    text_ignored:"је игнорисао(ла) твој захтев за пријатељство.",
    text_unfriend:"није више на твојој листи пријатеља.",
    text_reactivated:"Профил реактивиран",
    text_deactivated:"Профил обрисан или сакривен",
    text_being:"Профил је деактивиран",
    text_unavailable:"Недоступан профил",
    text_accepted:"је прихватио(ла) твој захтев за пријатељство",
    text_canceled:"Захтев за пријатељство је одбијен",
    text_pending:"Чека се одговор",
    nomessages:"Нема порука",
    text_noa:"Нема захтева на чекању",
    text_nou:"Нема Unfriends-а",
    text_error:"Грешка при уклањању везе.",
    text_hideu:"Сакриј Unfriend",
    text_hide:"Сакриј",
    text_alwayshide:"Увек сакриј",
    text_removec:"Уклони везу",
    hasignored:"игнорише један од твојих захтева за пријатељство.",
    new_version:"Нова верзија",
    notif_version:"Нова верзија је доступна",
    here:"овде",
    wasunfriend:"је био(ла) у листи твојих пријатеља",
    settings:"Подешавања",
    proceed:"Настави mk",
    exportData:"Извоз података",
    importData:"Увоз података",
    text_export:"Извоз",
    text_import:"Увоз",
    dataToExport:"Подаци за извоз",
    back1:"unfriends листа је локална. То значи да уколико користите фејсбук на другом рачунару, или другој сесији, нећете бити у могућности да видите листу unfriends-а.",
    back2:"Помоћу овог алата можете да извезете своје листе у други прегледник, или да их увезете из њега.",
    hideOwnUnfriends:"Сакриј пријатеље које уклониш",
    wontAppear:"Овај профил се неће појављивати на твојој unfriends листи.",
    today:"Данас",
    yesterday:"Јуче",
    months:"Јануар, Фебруар, Март, Aприл, Maј, Jун, Jул, Aвгуст, Септембар, Октобар, Новембар, Децембар",
    hide_perm:"Желиш ли да трајно сакријеш {name}?",
    header_unfriends:"Unfriends",
    header_reappeared:"Поново се појавио",
    header_ignored:"Игнорисани захтеви",
    header_accepted:"Прихваћени захтеви",
    header_both:"Прихваћени и игнорисани захтеви",
    header_pending:"Захтеви на чекању",
    resettitle:"Врати на почетне вредности",
    rvoid:"Ресетовање скрипте уништава све податке о вашим Unfriends. Будите опрезни."
};
$bg_BG = {
    langname:"Български",
    unfriends:"Неприятели",
    awaiting:"Очакващи потвърждение",
    notifications:"Известия",
    messages:"Съобщения",
    becomeFan:"Стани Фен",
    isFan:"Ти си фен",
    joinGroup:"Присъедини се към група",
    cancel:"Отказ",
    change:"Промени",
    manage:"Управление",
    reset:"Отказ",
    hide:"Скрий",
    behavior:"Изглед",
    lang:"Език",
    reset_:"Отказ",
    help:"Помощ",
    btn_ok:"Приемам",
    btn_cancel:"Отказ",
    btn_close:"Затвори",
    btn_save:"Запази",
    btn_submit:"Изпрати",
    btn_confirm:"Приеми",
    btn_delete:"Изтрий",
    btn_next:"Следващ",
    usesetting:"Използвайте тези настройки за да управлявате поведението на скрипта",
    deactivated:"Профилът е деактивиран",
    reactivated:"Профилът е реактивиран",
    confirmed:"Молбата е приета",
    declined:"Молбата е отказана",
    onunfriend:"Когато имате неприятел",
    oncanceled:"Когато молбата ви за приятелство е отказана",
    othersettings:"Други настройки",
    icons:"Покажи икони",
    uids:"Покажи UIDs",
    profilepics:"Опресни картинка на профила",
    hidemenubar:"Скрий Неприятелите от менюбара",
    dissociateLists:"Отдели Прието от Игнорирани",
    showTime:"Покажи датите на неприятелите",
    disabled:"Деактивирай",
    ok:"Потвърдено",
    error:"Грешка",
    unblock:"Разблокиране",
    block:"Блокиране",
    clang:"Изберете Вашия език:",
    currentlang:"Текущ език",
    creset:"Цъкни за ресетиране",
    resetbody:"Внимание: Възстановяването на всички първоначални стойности ще премахне всичките Ви предпочитания, настройки и генерирани данни. Искате ли да продължите?",
    selectall:"Изберете всички",
    selectnone:"Изберете Нито едно",
    use:"Използвай",
    display:"Дисплей",
    text_ignored:"Игнорирай",
    text_unfriend:"Няма игнорирани",
    text_reactivated:"Профилът е реактивиран",
    text_deactivated:"Профикът е Затрит или Скрит",
    text_being:"Профилът беше деактивиран",
    text_unavailable:"Профилът несъществува",
    text_accepted:"Молбата за приятелство е приета",
    text_canceled:"Молбата за приятелство е отказана",
    text_pending:"Чакаща молба за приятелство ",
    nomessages:"Няма Съобщения",
    text_noa:"Няма чакащи молби",
    text_nou:"Няма неприятели",
    text_error:"Грешка при премахване на връзка",
    text_hideu:"Скрий Неприятели",
    text_hide:"Скрий",
    text_alwayshide:"Винаги Скрито",
    text_removec:"Премахни връзка",
    hasignored:"вашата молба за приятелство беше игнорирана",
    new_version:"Нова Версия",
    notif_version:"Налична е нова версия",
    here:"тук",
    wasunfriend:"беше във вашият лист с приятели",
    settings:"Настройки",
    proceed:"Продължи",
    exportData:"Експортирай",
    importData:"Импортирай",
    text_export:"Експортиране",
    text_import:"Импортиране",
    dataToExport:"Данни за експорт",
    back1:"Списъка е локален. Това означава, че ако ползвате друг компютър или друг браузър, няма да сте в състояние да виждате списъка",
    back2:"Използвай този инструмент за импортиране или експортиране от друг мозила браузер",
    hideOwnUnfriends:"Скрий приятелите които премахвам",
    wontAppear:"Този профил не фигурира в списъка с неприятели",
    today:"Днес",
    yesterday:"Вчера",
    months:"Януари, Февруари, Март, Април, Май, Юни, Юли, Август, Септември, Октомври, Ноември, Декември,",
    hide_perm:"Искате ли да скриете перманентно {name}?",
    header_unfriends:"Неприятели",
    header_reappeared:"Ново появяване",
    header_ignored:"Молбата е отхвърлена",
    header_accepted:"Молбата е приета",
    header_both:"Молби Приети и Отхвърлени",
    header_pending:"Молби Чакащи",
    resettitle:"Възстановява стойностите, предпочитанията и настройките до подразбиращите се.",
    rvoid:"Ресетни скрипта"
};
$cs_CZ = {
    langname:"Čeština",
    unfriends:"Nepřátelé",
    awaiting:"Čekající žádosti",
    notifications:"Upozornění",
    messages:"Zprávy",
    becomeFan:"Staňte se fanouškem",
    isFan:"Jsi fanoušek",
    joinGroup:"Připojit ke skupině",
    cancel:"Zrušit",
    change:"změnit",
    manage:"upravit",
    reset:"reset",
    hide:"skrýt",
    behavior:"Vzhled",
    lang:"Jazyk",
    reset_:"Reset",
    help:"Pomoc",
    btn_ok:"Dobře",
    btn_cancel:"Zrušit",
    btn_close:"Zavřít",
    btn_save:"Uložit",
    btn_submit:"Předložit",
    btn_confirm:"Potvrdit",
    btn_delete:"Vymazat",
    btn_next:"Další",
    usesetting:"Pomocí tohoto nastavení řídíte chování skriptu",
    deactivated:"Deaktivované profily",
    reactivated:"Reaktivované profily",
    confirmed:"Žádost potvrzená",
    declined:"Žádost zamítnutá",
    onunfriend:"Když se zruší přátelství",
    oncanceled:"Když žádost o přátelství byla zamítnuta",
    othersettings:"Ostatní nastavení",
    icons:"Zobrazit ikony",
    uids:"Zobrazit UID",
    profilepics:"Aktualizovat profilové fotky",
    hidemenubar:"Skrýt lištu Nepřátelé v menu",
    dissociateLists:"Rozdělit přijaté a ignorovány žádosti",
    showTime:"Zobrazit datumy kontrol Nepřátel",
    disabled:"zakázáno",
    ok:"Rozumíš",
    error:"Chyba",
    unblock:"Odblokovat",
    block:"Blokovat",
    clang:"Vyberte Váš jazyk:",
    currentlang:"Aktuální jazyk",
    creset:"Klikněte pro obnovení",
    resetbody:"Jste si jisti, že chcete resetovat hodnoty?",
    selectall:"Vyberte Vše",
    selectnone:"Vyberte Žádné",
    use:"Použití",
    display:"Zobrazení",
    text_ignored:"ignoroval/a tvou žádost o přátelství.",
    text_unfriend:"již není ve vašem seznamu přátel.",
    text_reactivated:"Profil reaktivovaný",
    text_deactivated:"Profil vymazán nebo skrytý",
    text_being:"Profil Je Deaktivovaný",
    text_unavailable:"Profil Nedostupný",
    text_accepted:"Žádost o přátelství potvrzena",
    text_canceled:"Žádost o přátelství zrušena",
    text_pending:"Čekající žádost o přátelství",
    nomessages:"Č. Zprávy",
    text_noa:"Žádné čekající žádosti",
    text_nou:"Počet nepřátel",
    text_error:"Chyba při odstraňování spojení",
    text_hideu:"Skrýt NePřátel",
    text_hide:"Skrýt",
    text_alwayshide:"Vždy Skrýt",
    text_removec:"Odstranit připojení",
    hasignored:"ignoroval/a jednu z vašich žádostí o přátelství",
    new_version:"Nová verze",
    notif_version:"Nová verze je k dispozici",
    here:"zde",
    wasunfriend:"byl/a ve vašem seznamu přátel.",
    settings:"Nastavení",
    proceed:"Postupovat",
    exportData:"Exportovat údaje",
    importData:"Importovat údaje",
    text_export:"Export",
    text_import:"Dovoz",
    dataToExport:"Data pro export",
    back1:"Seznam NePřátel je místní. To znamená, že když použijete facebook na jiném počítači, nebo v jiné relaci, tak nebude možné získat vaše NePřátele.",
    back2:"Použijte tento zálohovací nástroj na exportování nebo importování vašich seznamů do nebo z jiného prohlížeče.",
    hideOwnUnfriends:"Skrýt přátelům, že jste je odstranili",
    wontAppear:"Tento profil se neobjeví v seznamu NePřátel.",
    today:"Dnes",
    yesterday:"Včera",
    months:"Leden, Únor, Březen, Duben, Květen, Červen, Červenec, Srpen, Září, Říjen, Listopad, Prosinec",
    hide_perm:"Chcete se schovat trvale {name}?",
    header_unfriends:"NePřátel",
    header_reappeared:"Znovuobjavení",
    header_ignored:"Ignorovány žádosti",
    header_accepted:"Přijaté žádosti",
    header_both:"Přijaté a ignorované žádosti",
    header_pending:"Nevyřízené žádosti",
    resettitle:"Reset na výchozí hodnoty",
    rvoid:"Vynulováním hodnot ve skriptu se zruší všechny údaje o vašich ne-přátelích. Buďte opatrný."
};
$hu_HU = {
    langname:"Magyar",
    unfriends:"Unfriends",
    awaiting:"Várakozó kérések",
    notifications:"Értesítések",
    messages:"Üzenetek",
    becomeFan:"Légy rajongó",
    isFan:"Fan vagy",
    joinGroup:"Csatlakozz a csoporthoz",
    cancel:"Mégse",
    change:"változtat",
    manage:"szerkeszt",
    reset:"töröl",
    hide:"elrejt",
    behavior:"Megjelenés",
    lang:"Nyelv",
    reset_:"Gyári beállítás",
    help:"Segítség",
    btn_ok:"Rendben",
    btn_cancel:"Mégse",
    btn_close:"Bezárás",
    btn_save:"Mentés",
    btn_submit:"Beállítás",
    btn_confirm:"Jóváhagyás",
    btn_delete:"Törlés",
    btn_next:"Következő",
    usesetting:"A script viselkedésének beállításai",
    deactivated:"Profil deaktíválva",
    reactivated:"Profil újraaktiválva",
    confirmed:"Kérés elfogadva",
    declined:"Kérés elutasítva",
    onunfriend:"Ha van törölt kapcsolatod",
    oncanceled:"Ha visszautasítják a kérésedet",
    othersettings:"Egyéb beállítások",
    icons:"Ikonok megjelenítése",
    uids:"UID-k megjelenítése",
    profilepics:"Profilképek frissítése",
    hidemenubar:"Unfriends törlése a menüből",
    dissociateLists:"Elfogadott és elutasított kérések szétválasztása",
    showTime:"Megjeleníti az Unfriends ellenőrzés dátumát",
    disabled:"letiltva",
    ok:"OK",
    error:"HIBA",
    unblock:"Blokkolás feloldása",
    block:"Blokkolás",
    clang:"Válassz nyelvet:",
    currentlang:"Jelenlegi nyelv",
    creset:"Kattints a visszaállításra",
    resetbody:"Biztos, hogy alapbeállítást szeretnél?",
    selectall:"Mindet",
    selectnone:"Egyiket sem",
    use:"Használat",
    display:"Megjelenítés",
    text_ignored:"elutasította a kérésedet.",
    text_unfriend:"mostantó nincs rajta a listádon.",
    text_reactivated:"Profil újraaktiválva",
    text_deactivated:"Profil törölve vagy rejtett",
    text_being:"Profil deaktiválva lett",
    text_unavailable:"Profil nem elérhető",
    text_accepted:"Barátkérő elfogadva.",
    text_canceled:"Barátkérő elutasítva.",
    text_pending:"Barátkérő folyamatban",
    nomessages:"Nincs Üzenetek",
    text_noa:"Nincsen várakozó kérés",
    text_nou:"Nincs törölt kapcsolatod",
    text_error:"HIBA a kapcsolat törlésekor",
    text_hideu:"Unfriend elrejtése",
    text_hide:"Elrejt",
    text_alwayshide:"Mostantól elrejtve",
    text_removec:"Kapcsolat törlése",
    hasignored:"Barátkérő figyelmen kívül hagyása.",
    new_version:"Új verzió",
    notif_version:"Új verzió elérhető",
    here:"itt",
    wasunfriend:"rajta van a barátlistádon.",
    settings:"Beállítások",
    proceed:"Folyamatban",
    exportData:"Adatok exportálása",
    importData:"Adatok importálása",
    text_export:"Export",
    text_import:"Import",
    dataToExport:"Adatok melyket exportálni akarsz",
    back1:"Az unfriends lista helyi. Ez annyit jelent, hogy ha facebook-ot egy másik gépen vagy másik session-ben használod, akkor nem fogod látni a listádat.",
    back2:"Ezzel a biztonsági mentésre szolgáló eszközzel exportálhatod vagy importálhatod a listádat egy másik böngésző-ba vagy ból.",
    hideOwnUnfriends:"Az eltávolított barátok elrejtése.",
    wontAppear:"Ez a profil nem jelennek meg az unfriends listádban.",
    today:"Ma",
    yesterday:"Tegnap",
    months:"Január, Február, Március, Április, Május, Június, Július, Augusztus, Szeptember, Október, November, December",
    hide_perm:"Szeretné tartósan elrejteni {name} ?",
    header_unfriends:"Unfriends",
    header_reappeared:"Újra megjelent",
    header_ignored:"Elutasított kérelmek",
    header_accepted:"Elfogadott kérelmek",
    header_both:"Elfogadott és elutasított kérelmek",
    header_pending:"Folyamatban lévő",
    resettitle:"Értékek alapbeállításra állítva",
    rvoid:"A visszaállítás törli az összes adatodat. Óvatosan!"
};
$ro_RO = {
    langname:"Română",
    unfriends:"Non-prieteni",
    awaiting:"Cereri in Asteptare",
    notifications:"Notificari",
    messages:"Mesaje",
    becomeFan:"Devii Fan",
    isFan:"Esti fan",
    joinGroup:"Intra in grup",
    cancel:"Anuleaza",
    change:"modifica",
    manage:"administreaza",
    reset:"reseteaza",
    hide:"ascunde",
    behavior:"Afisare",
    lang:"Limba",
    reset_:"Reseteaza",
    help:"Ajutor",
    btn_ok:"Ok",
    btn_cancel:"Anuleaza",
    btn_close:"Inchide",
    btn_save:"Salveaza",
    btn_submit:"Trimite",
    btn_confirm:"Confirma",
    btn_delete:"Sterge",
    btn_next:"Urmatorul",
    usesetting:"Foloseste aceste setari pentru a controla modul de functionare al scriptului",
    deactivated:"Profile dezactivate",
    reactivated:"Profile reactivate",
    confirmed:"Cereri confirmate",
    declined:"Cereri respinse",
    onunfriend:"Cand te-a sters cineva din lista",
    oncanceled:"Cand o cerere de prietenie catre tine a fost anulata",
    othersettings:"Alte setari",
    icons:"Afiseaza iconite",
    uids:"Afiseaza UID-uri",
    profilepics:"Actualizeaza fotografiile de profil",
    hidemenubar:"Ascunde Unfriends in bara de meniu",
    dissociateLists:"Separa cererile acceptate si ignorate",
    showTime:"Arata datele la care au fost verificati non-prietenii",
    disabled:"dezactivat",
    ok:"Ok",
    error:"Eroare",
    unblock:"Deblocheaza",
    block:"Blocheaza",
    clang:"Alege-ti limba:",
    currentlang:"Limba curenta",
    creset:"Click pentru resetare",
    resetbody:"Esti sigur ca vrei sa resetezi valorile?",
    selectall:"Selecteaza tot",
    selectnone:"Deselecteaza tot",
    use:"Foloseste",
    display:"Afiseaza",
    text_ignored:"ti-a ignorat cererea de prietenie.",
    text_unfriend:"nu se mai afla in lista ta de prieteni",
    text_reactivated:"Profil reactivat",
    text_deactivated:"Profil Sters sau Ascuns",
    text_being:"Profilul a fost Dezactivat",
    text_unavailable:"Profil inaccesibil",
    text_accepted:"Cerere de prietenie acceptata",
    text_canceled:"Cerere de prietenie anulata",
    text_pending:"Cerere de prietenie in asteptare",
    nomessages:"Nici un mesaj",
    text_noa:"Nici o cerere in asteptare",
    text_nou:"Nici un non-prieten",
    text_error:"Eroare la stergerea conexiunii.",
    text_hideu:"Ascunde non-prietenul",
    text_hide:"Ascunde",
    text_alwayshide:"Ascunde Intotdeauna",
    text_removec:"Sterge Conexiune",
    hasignored:"a ignorat una din cererile tale de prietenie",
    new_version:"Versiune Noua",
    notif_version:"O noua versiune este disponibila",
    here:"aici",
    wasunfriend:"a fost in lista ta de prieteni.",
    settings:"Setari",
    proceed:"Continua",
    exportData:"Exporta Informatiile",
    importData:"Importa Informatiile",
    text_export:"Exporta",
    text_import:"Importa",
    dataToExport:"Informatii pentru exportare",
    back1:"Lista cu non-prieteni este locala. Asta inseamna ca daca folosesti Facebook pe alt calculator, sau in alta sesiune, nu vei vedea non-prietenii.",
    back2:"Foloseste aceasta optiune de backup pentru a exporta sau importa listele tale in sau din alt browser",
    hideOwnUnfriends:"Ascunde prietenii pe care i-ai sters",
    wontAppear:"Acest profil nu va aparea in lista ta de non-prieteni",
    today:"Astazi",
    yesterday:"Ieri",
    months:"Ianuarie, Februarie, Martie, Aprilie, Mai, Iunie, Iulie, August, Septembrie, Octombrie, Noiembrie, Decembrie",
    hide_perm:"Vreti sa ascunzi permanent pe {name} ?",
    header_unfriends:"Non-prieteni",
    header_reappeared:"A reaparut",
    header_ignored:"Cereri Ignorate",
    header_accepted:"Cereri Acceptate",
    header_both:"Cereri Acceptate si Ignorate",
    header_pending:"Cereri in Asteptare",
    resettitle:"Reseteaza valorile la cele initiale",
    rvoid:"Resetarea scriptului va distruge toate informatiile despre non-prietenii tai. Ai grija."
};
$en_UD = {
    langname:"English (Upside Down)",
    unfriends:"spuǝıɹɟun",
    awaiting:"sʇsǝnbǝɹ ƃuıʇıɐʍɐ",
    notifications:"suoıʇɐɔıɟıʇou",
    messages:"səƃɐssəɯ",
    becomeFan:"uɐɟ ɐ ǝɯoɔǝq",
    isFan:"uɐɟ ǝɹɐ noʎ",
    joinGroup:"dnoɹƃ uıoɾ",
    cancel:"lǝɔuɐɔ",
    change:"ǝƃuɐɥɔ",
    manage:"ǝƃɐuɐɯ",
    reset:"ʇǝsǝɹ",
    hide:"ǝpıɥ",
    behavior:"ǝɔuɐɹɐǝddɐ",
    lang:"ǝƃɐnƃuɐl",
    reset_:"ʇǝsǝɹ",
    help:"dlǝɥ",
    btn_ok:"ʎɐʞo",
    btn_cancel:"lǝɔuɐɔ",
    btn_close:"ǝsolɔ",
    btn_save:"ǝʌɐs",
    btn_submit:"ʇıɯqns",
    btn_confirm:"ɯɹıɟuoɔ",
    btn_delete:"ǝʇǝlǝp",
    btn_next:"ʇxǝu",
    usesetting:"ʇdıɹɔs ǝɥʇ ɟo ɹoıʌɐɥǝq ǝɥʇ ǝƃɐuɐɯ oʇ sƃuıʇʇǝs sıɥʇ ǝsn",
    deactivated:"pǝʇɐʌıʇɔɐǝp sǝlıɟoɹd",
    reactivated:"pǝʇɐʌıʇɔɐǝɹ sǝlıɟoɹd",
    confirmed:"pǝɯɹıɟuoɔ sʇsǝnbǝɹ",
    declined:"pǝuılɔǝp sʇsǝnbǝɹ",
    onunfriend:"puǝıɹɟun uɐ ʇoƃ noʎ uǝɥʍ",
    oncanceled:"pǝlǝɔuɐɔ sɐʍ ʇsǝnbǝɹ puǝıɹɟ ɐ uǝɥʍ",
    othersettings:"sƃuıʇʇǝs ɹǝɥʇo",
    icons:"suoɔı ʎɐldsıp",
    uids:"spın ʎɐldsıp",
    profilepics:"sǝɹnʇɔıd ǝlıɟoɹd ǝʇɐpdn",
    hidemenubar:"ɹɐqnuǝɯ uı spuǝıɹɟun ǝpıɥ",
    dissociateLists:"sʇsǝnbǝɹ pǝɹouƃı puɐ pǝʇdǝɔɔɐ ʇılds",
    showTime:"sǝʇɐp ʞɔǝɥɔ spuǝıɹɟun ʍoɥs",
    disabled:"pǝlqɐsıp",
    ok:"ʞo",
    error:"ɹoɹɹǝ",
    unblock:"ʞɔolqun",
    block:"ʞɔolq",
    clang:": ǝƃɐnƃuɐl ɹnoʎ ǝsooɥɔ",
    currentlang:"ǝƃɐnƃuɐl ʇuǝɹɹnɔ",
    creset:"ʇǝsǝɹ oʇ ʞɔılɔ",
    resetbody:"¿ sǝnlɐʌ ʇǝsǝɹ oʇ ʇuɐʍ noʎ ǝɹns noʎ ǝɹɐ",
    selectall:"ןןɐ ʇɔǝןǝs",
    selectnone:"ǝuou ʇɔǝןǝs",
    use:"ǝsn",
    display:"ʎɐldsıp",
    text_ignored:"˙ʇsǝnbǝɹ puǝıɹɟ ɹnoʎ pǝɹouƃı",
    text_unfriend:"˙ʇsılpuǝıɹɟ ɹnoʎ uı ɹǝƃuol ou sı",
    text_reactivated:"pǝʇɐʌıʇɔɐǝɹ ǝlıɟoɹd",
    text_deactivated:"uǝppıɥ ɹo pǝʇǝlǝp ǝlıɟoɹd",
    text_being:"pǝʇɐʌıʇɔɐǝp ƃuıǝq ǝlıɟoɹd",
    text_unavailable:"ǝlqɐlıɐʌɐun ǝlıɟoɹd",
    text_accepted:"pǝʇdǝɔɔɐ ʇsǝnbǝɹ puǝıɹɟ",
    text_canceled:"pǝlǝɔuɐɔ ʇsǝnbǝɹ puǝıɹɟ",
    text_pending:"ƃuıpuǝd ʇsǝnbǝɹ puǝıɹɟ",
    nomessages:"səƃɐssəɯ ou",
    text_noa:"ʇsǝnbǝɹ ƃuıʇıɐʍɐ ou",
    text_nou:"spuǝıɹɟun ou",
    text_error:"˙uoıʇɔǝuuoɔ ƃuıʌoɯǝɹ ǝlıɥʍ ɹoɹɹǝ",
    text_hideu:"puǝıɹɟun ǝpıɥ",
    text_hide:"ǝpıɥ",
    text_alwayshide:"ǝpıɥ sʎɐʍlɐ",
    text_removec:"uoıʇɔǝuuoɔ ǝʌoɯǝɹ",
    hasignored:"ʇsǝnbǝɹ puǝıɹɟ ɹnoʎ ɟo ǝuo pǝɹouƃı",
    new_version:"uoısɹǝʌ ʍǝu",
    notif_version:"ǝlqɐlıɐʌɐ sı uoısɹǝʌ ʍǝu ɐ",
    here:"ǝɹǝɥ",
    wasunfriend:"˙ʇsılpuǝıɹɟ ɹnoʎ uı sɐʍ",
    settings:"sƃuıʇʇǝs",
    proceed:"pǝǝɔoɹd",
    exportData:"ɐʇɐp ʇɹodxǝ",
    importData:"ɐʇɐp ʇɹodɯı",
    text_export:"ʇɹodxǝ",
    text_import:"ʇɹodɯı",
    dataToExport:"ʇɹodxǝ oʇ ɐʇɐp",
    back1:"˙spuǝıɹɟun ɹnoʎ ʇǝƃ oʇ ǝlqɐ ǝq ʇ,uoʍ noʎ \'uoıssǝs ɹǝɥʇouɐ ɹo \'ɹǝʇndɯoɔ ɹǝɥʇouɐ uo ʞooqǝɔɐɟ ǝsn noʎ ɟı ʇɐɥʇ suɐǝɯ ʇı ˙lɐɔol sı ʇsıl spuǝıɹɟun ǝɥʇ",
    back2:"˙ɹǝsʍoɹq ɹǝɥʇouɐ ɯoɹɟ ɹo oʇ sʇsıl ɹnoʎ ʇɹodɯı ɹo ʇɹodxǝ oʇ looʇ dnʞɔɐq sıɥʇ ǝsn",
    hideOwnUnfriends:"ǝʌoɯǝɹ noʎ ʇɐɥʇ spuǝıɹɟ ǝpıɥ",
    wontAppear:"˙ʇsıl spuǝıɹɟun ɹnoʎ uı ɹɐǝddɐ ʇ,uoʍ ǝlıɟoɹd sıɥʇ",
    today:"ʎɐpoʇ",
    yesterday:"ʎɐpɹǝʇsǝʎ",
    months:"ʎɹɐnuɐɾ, ʎɹɐnqǝɟ, ɥɔɹɐɯ, lıɹdɐ, ʎɐɯ, ǝunɾ, ʎlnɾ, ʇsnƃnɐ, ɹǝqɯǝʇdǝs, ɹǝqoʇɔo, ɹǝqɯǝʌou, ɹǝqɯǝɔǝp",
    hide_perm:"¿ {name} ʎlʇuǝuɐɯɹǝd ǝpıɥ oʇ ʇuɐʍ noʎ op",
    header_unfriends:"spuǝıɹɟun",
    header_reappeared:"pǝɹɐǝddɐǝɹ",
    header_ignored:"pǝɹouƃı sʇsǝnbǝɹ",
    header_accepted:"pǝʇdǝɔɔɐ sʇsǝnbǝɹ",
    header_both:"pǝɹouƃı & pǝʇdǝɔɔɐ sʇsǝnbǝɹ",
    header_pending:"ƃuıpuǝd sʇsǝnbǝɹ",
    resettitle:"ʇlnɐɟǝp oʇ sǝnlɐʌ ʇǝsǝɹ",
    rvoid:"˙lnɟǝɹɐɔ ǝq ˙spuǝıɹɟun ɹnoʎ ʇnoqɐ ɐʇɐp ɹnoʎ llɐ sʎoɹʇsǝp ʇdıɹɔs ƃuıʇʇǝsǝɹ"
};
$en_PI = {
    langname:"English (Pirate)",
    unfriends:"Unbuckos",
    awaiting:"Awaiting Permissions",
    notifications:"Notifications",
    messages:"Bottle o\' messages",
    becomeFan:"Join Aboard!",
    isFan:"Ye be fan",
    joinGroup:"Join squadron",
    cancel:"Belay",
    change:"change",
    manage:"manage",
    reset:"reset",
    hide:"hide",
    behavior:"Appearance",
    lang:"Squawk Talk",
    reset_:"Reset",
    help:"Mayday!",
    btn_ok:"Arrr!",
    btn_cancel:"Belay",
    btn_close:"Walk the plank!",
    btn_save:"Stow",
    btn_submit:"Aye!",
    btn_confirm:"Aye aye!",
    btn_delete:"T\' Davy Jones wit\' it!",
    btn_next:"Forward, ho!",
    usesetting:"Use this settings t' manage th' behavior o' th' script",
    deactivated:"Profiles deactivated",
    reactivated:"Profiles reactivated",
    confirmed:"Permissions confirmed",
    declined:"Permissions declined",
    onunfriend:"When ye got an unbucko",
    oncanceled:"When a matey permission be belayed",
    othersettings:"Other settin's",
    icons:"Display icons",
    uids:"Display UIDs",
    profilepics:"Update portraits",
    hidemenubar:"Hide Unbuckos in menubar",
    dissociateLists:"Cut Accepted an' Ignored Permissions",
    showTime:"Show Unbuckos check dates",
    disabled:"scuttled",
    ok:"Arrr",
    error:"Error",
    unblock:"Unblock",
    block:"Block",
    clang:"Choose yer language :",
    currentlang:"Current language",
    creset:" Click t' reset",
    resetbody:"Be ye aye you want t' reset values ?",
    selectall:"The Lot of It",
    selectnone:"Nary any",
    use:"Use",
    display:"Display",
    text_ignored:"ignored yer permission to be mateys.",
    text_unfriend:"be nay longer in yer list of mateys.",
    text_reactivated:"Profile reactivated",
    text_deactivated:"Profile Deleted or Hidden",
    text_being:"Profile Bein' Deactivated",
    text_unavailable:"Profile Unavailable",
    text_accepted:"Bucko Request Accepted",
    text_canceled:"Bucko Request Belayed",
    text_pending:"Bucko Request Pendin'",
    nomessages:"Nay Messages",
    text_noa:"Nay Awaitin' permissions",
    text_nou:"Nay Unbucko",
    text_error:"Error while removin' connection.",
    text_hideu:"Hide Unbucko",
    text_hide:"Hide",
    text_alwayshide:"Always Hide",
    text_removec:"Remove connection",
    hasignored:"ignored one o' yer bucko request",
    new_version:"New Version",
    notif_version:"A new version be available",
    here:"here",
    wasunfriend:"be in yer list of mateys.",
    settings:"Settin's",
    proceed:"Proceed",
    exportData:"Export Data",
    importData:"Import Data",
    text_export:"Export",
    text_import:"Import",
    dataToExport:"Data t' export",
    back1:"T\' list be local. \'t means that if ye use facebook on another computer, or another session, ye won\'t be able t\' get your unbuckos.",
    back2:"Use this aftup tool t\' export or import yer lists t\' or from another browser.",
    hideOwnUnfriends:"Hide hearties that ye remove",
    wontAppear:"This profile won't appearrr in yer list of mateys",
    today:"Today",
    yesterday:"Ayeterday",
    months:"Januarrrry, Februarrry, Marrrch, Month o' showers, Month o' May, Merry Month o' June, Jul-aye, Arrrrgust, Septembarrr, Octobarrr, Novembarrr, Decembarrrr",
    hide_perm:"Do ye want t' hide permanently Cap'n {name} ?",
    header_unfriends:"Unbuckos",
    header_reappeared:"Reappeared",
    header_ignored:"Permissions Ignored",
    header_accepted:"Permissions Accepted",
    header_both:"Permissions Accepted an' Ignored",
    header_pending:"Permissions Pendin'",
    resettitle:"Reset values t' default",
    rvoid:"Resettin' script destroys all yer data about yer unbuckos. Be careful."
};
$fb_LT = {
    langname:"Leet Speak",
    unfriends:"UnN00bz",
    awaiting:"4w4!7!n9 R3qu3575",
    notifications:"N07!f!c47!0nz",
    messages:"/msg",
    becomeFan:"<3",
    isFan:"U r f4n",
    joinGroup:"/join",
    cancel:"alt + F4",
    change:"/edit",
    manage:"h4xx",
    reset:"r3537",
    hide:"h!d3",
    behavior:"4pp34r4nc3",
    lang:"L4n9u493",
    reset_:"R3537",
    help:"F1",
    btn_ok:"0k4y",
    btn_cancel:"ctrl + z",
    btn_close:"alt + F4",
    btn_save:"54v3",
    btn_submit:"5ubm17",
    btn_confirm:"(0nf!rm",
    btn_delete:"/del",
    btn_next:">",
    usesetting:"U53 7h15 5377!ngz 2 m4n4g3 7h3 b3h4v10r 0f th3 5cr1p7",
    deactivated:"Pr0f1L35 d34c7!v4t3d",
    reactivated:"Pr0f1L35 r34ct!vt3d",
    confirmed:"R3qu3575 (0nf!rm3d",
    declined:"R3qu3575 d3cl!n3d",
    onunfriend:"Wh3n u g07 4n unN00b",
    oncanceled:"Wh3n 4 n00b r3qu357 w45 (4nc313d",
    othersettings:"0th3r s377!ngz",
    icons:"D!5p14y 1c0n5",
    uids:"D!5p14y U1Dz",
    profilepics:"Upd473 pr0f1L3 p!cz",
    hidemenubar:"Hide UnN00bz 1n m3nub4r",
    dissociateLists:"5p1!7 4cc3p73d & !9n0r3d R3qu3575",
    showTime:"5h0w UnN00bz ch3ck d473z",
    disabled:"d!54b13d",
    ok:"0k",
    error:"3rr0r",
    unblock:"Unb10ck",
    block:"B10ck",
    clang:"Ch0053 ur 14n9u493 :",
    currentlang:"Curr3n7 14n9u493",
    creset:"Cl!ck 2 r3537",
    resetbody:"4r3 u 5ur3 u w4n7 2 r3537 v@lu35 ?",
    selectall:"5313c7 4//",
    selectnone:"5313c7 N0n3",
    use:"U53",
    display:"D!5p14y",
    text_ignored:"!9n0r3d yr fr!3nd r3qu357.",
    text_unfriend:"!z n0 10n93r !n ur fr!3nd1!57.",
    text_reactivated:"Pr0f!L3 r34c7!v473d",
    text_deactivated:"Pr0f1L3 alt + F4 or H!dd3n",
    text_being:"Pr0f!L3 B3!n9 D34c7!v473d",
    text_unavailable:"Pr0f!L3 Un4v4!14b13",
    text_accepted:"N00b R3qu357 4cc3p73d",
    text_canceled:"N00b R3qu357 (4nc313d",
    text_pending:"N00b R3qu357 P3nd!n9",
    nomessages:"N0 /msg",
    text_noa:"N0 4w4171n9 r3qu357",
    text_nou:"N0 UnN00bz",
    text_error:"3rr0r wh!13 r3m0v!n9 (0nn3ct!0n.",
    text_hideu:"h!d3 UnN00b",
    text_hide:"h!d3",
    text_alwayshide:"41w4yz h!d3",
    text_removec:"/del c0nn3ct!0n",
    hasignored:"!9n0r3d 0n3 0f ur fr13nd r3qu357",
    new_version:"N3w V3rs!0n",
    notif_version:"4 n3w v3r5!0n !5 4v4114b13",
    here:"h3r3",
    wasunfriend:"w4z !n ur n00b1!57.",
    settings:"$377!n9z",
    proceed:"Pr0c33d",
    exportData:"3xp0r7 D474",
    importData:"!mp0r7 D474",
    text_export:"3xp0r7",
    text_import:"!mp0r7",
    dataToExport:"D474 2 3xp0r7",
    back1:"T3h unN00bz 1!57 !z |0c4|. 17 m34n5 7h47 1f u u53 fb 0n 4n07h3r c0mpu73r, 0r 4n07h3r f!r3f0x 535510n, u w0n'7 b3 4b13 2 937 Y0ur unN00bz.",
    back2:"U53 7h15 b4ckup 7001 2 3xp0r7 0r !mp0r7 Y0ur 1!57z 2 0r fr0m 4n07h3r f!r3f0x br0w53r.",
    hideOwnUnfriends:"h!d3 n00bz 7h47 u /del",
    wontAppear:"7h!5 pr0f!L3 w0n'7 4pp34r !n ur unN00bz 1!57.",
    today:"T0d4y",
    yesterday:"Y3573rd4y",
    months:"J4nu4ry, F3bu4ry, M4rch, 4pr!1, M4y, Jun3, Ju1y, 4u9u57, 53p73mb3r, 0c70b3r, N0v3mb3r, D3c3mb3r",
    hide_perm:"D0 u w4n7 2 h!d3 p3rm4n3n71y {name} ?",
    header_unfriends:"UnN00bz",
    header_reappeared:"Pr0f!L3 R34pp34r3d",
    header_ignored:"R3qu3575 19n0r3d",
    header_accepted:"R3qu3575 4cc3p73d",
    header_both:"R3qu3575 4cc3p73d & 19n0r3d",
    header_pending:"R3qu3575 P3nd!n9",
    resettitle:"R3537 v41u35 2 d3f4u17",
    rvoid:"R35377!n9 5cr!p7 d357r0yz 411 ur d474 4b0u7 j00r unN00bz. B3 (4r3fu1."
};
$la_VA = {
    langname:"lingua latina",
    unfriends:"Nonamici",
    awaiting:"Confirmatio expectans",
    notifications:"Nuntia",
    messages:"Epistulae",
    becomeFan:"Mihi placet",
    isFan:"Tibi placet",
    joinGroup:"Gregem Coniungere",
    cancel:"Retexere",
    change:"mutare",
    manage:"administrare",
    reset:"revertere",
    hide:"celare",
    behavior:"species",
    lang:"Lingua",
    reset_:"Revertere",
    help:"Auxilium",
    btn_ok:"Ita",
    btn_cancel:"Cancellere",
    btn_close:"Claudere",
    btn_save:"Servare",
    btn_submit:"Praebere",
    btn_confirm:"affirmare",
    btn_delete:"Removere",
    btn_next:"Proximus",
    usesetting:"Optiones hae uti, ut morem scripti regere",
    deactivated:"Vulti dehabilitati",
    reactivated:"Vulti rehabilitati",
    confirmed:"Postulata affirmata",
    declined:"Postulata abnuita",
    onunfriend:"Cum tu nonamicum acquirere",
    oncanceled:"Cum postulatum amicitii cancellatus est",
    othersettings:"Optiones aliae",
    icons:"Typos ostendere",
    uids:"UIDs ostendere",
    profilepics:"Picturae vultae renovare",
    hidemenubar:"Nonamici in sera celare",
    dissociateLists:"Postulata comprobati et negelegati scindere",
    showTime:"Dies nonamicitiae ostendere",
    disabled:"debilitatus",
    ok:"Ita",
    error:"Erratum",
    unblock:"Aperire",
    block:"Claudere",
    clang:"Elige linguam tuam:",
    currentlang:"Lingua nunc",
    creset:"Preme ad revertum",
    resetbody:"Esne certus optionem revertere vis?",
    selectall:"Omnes optare",
    selectnone:"Nullum optare",
    use:"Utere",
    display:"Ostendere",
    text_ignored:"neglegebat postulatum amicitii tuum",
    text_unfriend:"non est in catalogo amicorum tuo",
    text_reactivated:"Vultus rehabilitatus est",
    text_deactivated:"Vultus deletus aut celatus ",
    text_being:"Vultus dehabilitatur",
    text_unavailable:"Vultus non praesto",
    text_accepted:"Postulatum amicitii comprobatur",
    text_canceled:"Postulatum amicitii cancellebatur",
    text_pending:"Postulatum amicitii pendat",
    nomessages:"Nullae epistulae",
    text_noa:"Nullum postulatum exspectatum",
    text_nou:"Nulli Nonamici",
    text_error:"Erratum inter detrectio coniuncti",
    text_hideu:"Nonamicum celare",
    text_hide:"Celare",
    text_alwayshide:"Semper celare",
    text_removec:"Coniunctum abdere",
    hasignored:"neglegebat postulatum amicitii tuum",
    new_version:"Versio nova",
    notif_version:"Versio nova praesto est",
    here:"hic",
    wasunfriend:"erat in catalogo amicorum tuo.",
    settings:"Optiones",
    proceed:"Procedere",
    exportData:"Informationem exportare",
    importData:"Informationem inferre",
    text_export:"Exportare",
    text_import:"Inferre",
    dataToExport:"Informationem ad exportatum",
    back1:"Catalogus nonamicorum est localis. Si Facebook in computatro alio utaris, non poteris nonamicos acquirere.",
    back2:"Utere instrumentum hoc, ut catalogos ad aut ab alio navigatro exportare aut inferre.",
    hideOwnUnfriends:"Amicos abditos celare",
    wontAppear:"Vultus hic in catalogo nonamicorum tuo aberit.",
    today:"Hodie",
    yesterday:"Heri",
    months:"Ianuarius, Februarius, Martius, Aprilis, Maius, Iunius, Iulius, Augustus, September, October, November, December",
    hide_perm:"Visne {name} semper celare?",
    header_unfriends:"Nonamici",
    header_reappeared:"reappareo",
    header_ignored:"Postulata neglecta",
    header_accepted:"Postulata conprobata",
    header_both:"Postulata conprobata et neglecta",
    header_pending:"Postulata appendens",
    resettitle:"Optionem ad defaltam revertere",
    rvoid:"Scriptum revertere perdet omnes informationes de nonamicis. Cautus es."
};
$bs_BA = {
    langname:"Bosanski",
    unfriends:"Nisu prijatelji",
    awaiting:"Zahtjevi Na Čekanju",
    notifications:"Obavještenja",
    messages:"Poruke",
    becomeFan:"Postani ljubitelj",
    isFan:"Ti si Ljubitelj",
    joinGroup:"Pridruži se",
    cancel:"Prekini",
    change:"promijeni",
    manage:"upravljaj",
    reset:"resetuj",
    hide:"sakrij",
    behavior:"Izgled",
    lang:"Jezik",
    reset_:"Resetuj",
    help:"Pomoć",
    btn_ok:"U redu",
    btn_cancel:"Prekini",
    btn_close:"Zatvori",
    btn_save:"Sačuvaj",
    btn_submit:"Prihvati",
    btn_confirm:"Potvrdi",
    btn_delete:"Izbriši",
    btn_next:"Sljedeći",
    usesetting:"Koristite ove opcije da promjenite ponašanje skripte",
    deactivated:"Profil deaktiviran",
    reactivated:"Profil reaktiviran",
    confirmed:"Zahtjevi Potvrđeni",
    declined:"Zahtjevi Odbijeni",
    onunfriend:"Kada ste dobili neprijatelja",
    oncanceled:"Kada je zahtjev za prijateljstvo odbijen",
    othersettings:"Ostale opcije",
    icons:"Ikone za prikaz",
    uids:"Prikaz UID-a",
    profilepics:"Osvježavanje slika profila",
    hidemenubar:"Sakrij Neprijatelje u izborniku",
    dissociateLists:"Odvoji prihvaćene i ignorirane zahtjeve",
    showTime:"Prikaži datume provjere Neprijatelja",
    disabled:"isključeno",
    ok:"U redu",
    error:"Greška",
    unblock:"Odblokiraj",
    block:"Blokiraj",
    clang:"Izaberite vaš jezik:",
    currentlang:"Trenutni jezik",
    creset:"Kliknite za reset",
    resetbody:"Da li ste sigurni da želite resetovati vrijednosti?",
    selectall:"Svi",
    selectnone:"Nijedna",
    use:"Koristi",
    display:"Prikaz",
    text_ignored:"je ignorisao/la vaš zahtjev za prijateljstvo.",
    text_unfriend:"više nije na vašoj listi prijatelja.",
    text_reactivated:"Profil reaktiviran",
    text_deactivated:"Profil izbrisan ili skriven",
    text_being:"Profil se trenutno deaktivira",
    text_unavailable:"Profil nedostupan",
    text_accepted:"Zahtjev za prijateljstvo prihvaćen",
    text_canceled:"Zahtjev za prijateljstvo odbijen",
    text_pending:"Zahtjev za prijateljstvo je na čekanju",
    nomessages:"Nemate Poruke",
    text_noa:"Nema zahtjeva na čekanju",
    text_nou:"Nemate Neprijatelja",
    text_error:"Problem pri uništavanju konekcije/veze.",
    text_hideu:"Sakrij Neprijatelje",
    text_hide:"Sakrij",
    text_alwayshide:"Uvijek sakrij",
    text_removec:"Uništavanje konekcije/veze",
    hasignored:"ignorisao/la jedan od vaših zahtjeva za prijateljstvo",
    new_version:"Nova Verzija",
    notif_version:"Nova verzija je dostupna",
    here:"ovdje",
    wasunfriend:"je bio/bila u vašoj listi prijatelja.",
    settings:"Opcije",
    proceed:"Nastavi",
    exportData:"Izvoz podataka",
    importData:"Uvoz Podataka",
    text_export:"Izvoz",
    text_import:"Uvoz",
    dataToExport:"Podaci za izvoz",
    back1:"Lista Neprijatelja je lokalizirana. To znači da nećete biti u mogućnosti vidjeti listu Neprijatelja ako koristite facebook na drugom računaru ili u drugom firefox procesu.",
    back2:"Koristite ovaj alat za stvaranje sigurnosne kopije kako biste uvezli ili izvezli listu Neprijatelja iz drugog firefox pretraživača.",
    hideOwnUnfriends:"Sakrij prijatelje koje ste izbrisali",
    wontAppear:"Ovaj profil neće biti prikazan u vašoj listi Neprijatelja.",
    today:"Danas",
    yesterday:"Jučer",
    months:"Januar, Februar, Mart, April, Maj, Juni, Juli, August, Septembar, Oktobar, Novembar, Decembar",
    hide_perm:"Želite li trajno sakriti {name}?",
    header_unfriends:"Neprijatelji",
    header_reappeared:"Ponovno pojavio",
    header_ignored:"Zahtjevi ignorisani",
    header_accepted:"Zahtjevi prihvaćeni",
    header_both:"Zahtjevi prihvaćeni i ignorisani",
    header_pending:"Zahtjevi na čekanju",
    resettitle:"Resetuj vrijednosti u početni oblik",
    rvoid:"Resetovanje skripte uništava sve podatke o vašim Neprijateljima.Budite oprezni!"
};
$lt_LT = {
    langname:"Lietuvių",
    unfriends:"Nedraugai",
    awaiting:"Laukiama patvirtinimo",
    notifications:"Pranešimai",
    messages:"Žinutės",
    becomeFan:"Tapti gerbėju",
    isFan:"Jūs esate gerbėjas",
    joinGroup:"Prisijungti prie grupės",
    cancel:"Atšaukti",
    change:"keisti",
    manage:"valdyti",
    reset:"Anuliuoti",
    hide:"slėpti",
    behavior:"Išvaizda",
    lang:"Kalba",
    reset_:"Anuliuoti",
    help:"Pagalba",
    btn_ok:"Gerai",
    btn_cancel:"Atšaukti",
    btn_close:"Uždaryti",
    btn_save:"Išsaugoti",
    btn_submit:"Patvirtinti",
    btn_confirm:"Tvirtinti",
    btn_delete:"Trinti",
    btn_next:"Kitas",
    usesetting:"Naudoti šiuos nustatymus norint valdyti kodą",
    deactivated:"Išjungti profiliai",
    reactivated:"Iš naujo aktyvuoti profiliai",
    confirmed:"Užklausos patvirtintos",
    declined:"Užklausos atmestos",
    onunfriend:"Kai turite nedraugą",
    oncanceled:"Kai užklausa draugauti atmesta",
    othersettings:"Kiti nustatymai",
    icons:"Rodyti ženklus",
    uids:"Rodyti vartotojo ID",
    profilepics:"Atnaujinti profilio paveikslėlius",
    hidemenubar:"Slėpti nedraugus meniu juostoje",
    dissociateLists:"Atskirti Priimtas ir Atšauktas užklausas",
    showTime:"Rodyti nedraugų patikrinimo datą",
    disabled:"atjungta",
    ok:"Gerai",
    error:"Klaida",
    unblock:"Atblokuoti",
    block:"Blokuoti",
    clang:"Pasirinkti kalbą",
    currentlang:"Pasirinkta kalba",
    creset:"Paspauskite norint anuliuoti",
    resetbody:"Ar tikrai norite atstatyti reikšmes?",
    selectall:"Pažymėti viską",
    selectnone:"Nieko nežymėti",
    use:"Naudoti",
    display:"Rodyti",
    text_ignored:"ignoravo jūsų užklausą.",
    text_unfriend:"nebėra jūsų draugų sąraše.",
    text_reactivated:"Profilis aktyvuotas iš naujo.",
    text_deactivated:"Profilis Ištrintas arba Paslėptas",
    text_being:"Profilis išjungtas",
    text_unavailable:"Profilis Nepasiekiamas",
    text_accepted:"Draugo Užklausa Patvirtinta",
    text_canceled:"Draugo Užklausa Atšaukta",
    text_pending:"Draugo Užklausos patvirtinimas Laukiamas",
    nomessages:"Nėra Žinučių",
    text_noa:"Nėra Laukiamų užklausų",
    text_nou:"Nėra nedraugų",
    text_error:"Klaida bandant trinti ryšį.",
    text_hideu:"Slėpti Nedraugą",
    text_hide:"Slėpti",
    text_alwayshide:"Visada Slėpti",
    text_removec:"Trinti Ryšį",
    hasignored:"ignoravo vieną iš jūsų užklausų.",
    new_version:"Nauja Versija",
    notif_version:"Nauja versija išleista",
    here:"čia",
    wasunfriend:"buvo jūsų draugų sąraše.",
    settings:"Nustatymai",
    proceed:"Tęsti",
    exportData:"Eksportuoti duomenis",
    importData:"Importuoti duomenis",
    text_export:"Eksportuoti",
    text_import:"Importuoti",
    dataToExport:"Duomenys eksportavimui",
    back1:"Nedraugų sąrašas yra vietinis. Tai reiškia, kad jeigu jūs naudosite facebook kitame kompiuteryje, arba kitame seanse, jūs negalėsite surasti nedraugus.",
    back2:"Naudokite šitą rezervavimo priemonę, tam kad importuoti ar eksportuoti jūsų sąrašus į arba iš kitos naršyklės.",
    hideOwnUnfriends:"Slėpti ištrintus draugus",
    wontAppear:"Šis profilis nebus rodomas jūsų nedraugų sąraše.",
    today:"Šiandien",
    yesterday:"Vakar",
    months:"Sausis, Vasaris, Kovas, Balandis, Gegužė, Birželis, Liepa, Rugpjūtis, Rugsėjis, Spalis, Lapkritis, Gruodis",
    hide_perm:"Ar tikrai norite paslėpti {name}?",
    header_unfriends:"Nedraugai",
    header_reappeared:"Pasirodė",
    header_ignored:"Užklausos Ignoruotos",
    header_accepted:"Užklausos Priimtos",
    header_both:"Užklausos Priimtos ",
    header_pending:"Užklausos laukia Patvirtinimo",
    resettitle:"Atstatyti reišmes į numatytasias",
    rvoid:"Kodo anuliavimas sunaikina visą informaciją apie nedraugus. Būkite atsargūs."
};
$sq_AL = {
    langname:"Shqip",
    unfriends:"Joshoqërija",
    awaiting:"Kërkesa në Pritje",
    notifications:"Njoftimet",
    messages:"Mesazhet",
    becomeFan:"Bëhu Fan",
    isFan:"Ti je fans",
    joinGroup:"Bashkohu Grupit",
    cancel:"Anuloje",
    change:"Ndryshoje",
    manage:"Menaxho",
    reset:"Restarto",
    hide:"Fshihe",
    behavior:"Dukja",
    lang:"Gjuha",
    reset_:"Rivë",
    help:"Ndihmë",
    btn_ok:"Në regull",
    btn_cancel:"Fshije",
    btn_close:"Mbylle",
    btn_save:"Ruaje",
    btn_submit:"Paraqite",
    btn_confirm:"Konfirmo",
    btn_delete:"Fshij",
    btn_next:"Tjetra",
    usesetting:"Perdore këto Cilësime për të ndryshuar sjelljen e skriptit",
    deactivated:"Profili u çaktivizua",
    reactivated:"Profili u riaktivizua",
    confirmed:"Kërkesa u konfirmua",
    declined:"Kërkesa u refuzua",
    onunfriend:"Kur keni një Ç\'miqsim ose ndonjë deaktivizion profilin e tyre",
    oncanceled:"Kur një kërkes miqësie u refuzua",
    othersettings:"Opcionet tjera",
    icons:"Shfaq Ikonat",
    uids:"Shfaq UIDs",
    profilepics:"Ndrysho foton e profilit",
    hidemenubar:"Fshihe Joshoqërinë në menu",
    dissociateLists:"Dallo Kërkesat e pranuara dhe të injoruara",
    showTime:"Shfaq të dhënat e joshoqërisë",
    disabled:"Shkyqur",
    ok:"Në Regull",
    error:"Gabim",
    unblock:"Zhblloko",
    block:"Blloko",
    clang:"Zgjedhni Gjuhën tuaj:",
    currentlang:"Gjuha e tanishme",
    creset:"Kliko për rifreskim",
    resetbody:"A jeni i sigurt që doni të rifreskoni valutat?",
    selectall:"Zgjidh Të gjithë",
    selectnone:"Zgjidh Asnjë",
    use:"Përdor",
    display:"Shfaq",
    text_ignored:"refuzoj kërkesen tënde për miqësi.",
    text_unfriend:"nuk është më në listen tënde të shoqërisë.",
    text_reactivated:"Profili u aktivizua",
    text_deactivated:"Profili i Fshire ose i Fshehur",
    text_being:"Profili është duke u Çakivizuar",
    text_unavailable:"Profil i Padisponueshëm",
    text_accepted:"kërkesa për miqësi u pranua",
    text_canceled:"kërkesa për miqësia u shuajt",
    text_pending:"Kërkesa për miqësi në pritje",
    nomessages:"Nuk ka Mesazhe",
    text_noa:"Nuk ka kërkesa në pritje",
    text_nou:"Nuk ka Joshoqëri",
    text_error:"Gabim duke hequr lidhjen",
    text_hideu:"Fshehe Joshoqërinë",
    text_hide:"Fshehe",
    text_alwayshide:"Fshihe gjithmon",
    text_removec:"Hiqe lidhjen",
    hasignored:"injoroj njëren prej kërkesen tuaj",
    new_version:"Version i ri",
    notif_version:"Versioni i ri është i disponushëm",
    here:"këtu",
    wasunfriend:"ishte ne listen e shoqëris tuaj",
    settings:"Opsionet",
    proceed:"Vazhdo",
    exportData:"Exporto të dhënat",
    importData:"Importo të dhënat",
    text_export:"Eksporto",
    text_import:"Importo",
    dataToExport:"Të dhënat për eksport",
    back1:"Lista e ç\'miqësis është lokale. Kjo do të thot qe nëse ju e përdorni facebook-un ne ndonjë kompjuter tjetër,ose në ndonjë sesion tjetër, ju nuk do të jeni në gjendje të shikoni joshoqërin.",
    back2:"Përdore këtë opcion për rezervë që ti importoni ose exportoni listen tuaj në ndonjë shfletues tjetër të firefox-t.",
    hideOwnUnfriends:"Fsheh shokët të cilt i heq vet.",
    wontAppear:"Ky profil nuk do të shfaqet në listen tuaj te ç\'miqësis.",
    today:"Sot",
    yesterday:"Dje",
    months:"Janar, Shkurt, Mars, Prill, Maj, Qershor, Korrik, Gusht, Shtator, Tetor, Nëntor, Dhjetor",
    hide_perm:"A do ta fshehësh Përherë {name} ?",
    header_unfriends:"Joshoqërija",
    header_reappeared:"Rishfaqet",
    header_ignored:"Kërkesa u injorua",
    header_accepted:"Kërkesa u pranua",
    header_both:"Kërkesa u pranua ose injorua",
    header_pending:"Kërkesa në pritje",
    resettitle:"Rivendos valutat për gjendjen e mëparshme të skriptit",
    rvoid:"Rifreskim i skriptit shkatërron të gjitha detajet tuja për joshoqërinë. Ki Kujdes."
};
$id_ID = {
    langname:"Bahasa Indonesia",
    unfriends:"Unfriends",
    awaiting:"Menunggu Tanggapan",
    notifications:"Pemberitahuan",
    messages:"Pesan",
    becomeFan:"Menjadi Penggemar",
    isFan:"Anda adalah penggemar",
    joinGroup:"Gabung ke grup",
    cancel:"batal",
    change:"ubah",
    manage:"kelola",
    reset:"pulihkan",
    hide:"sembunyikan",
    behavior:"Tampilan",
    lang:"Bahasa Indonesia",
    reset_:"Pulihkan",
    help:"Bantuan",
    btn_ok:"Setuju",
    btn_cancel:"batal",
    btn_close:"Tutup",
    btn_save:"Simpan",
    btn_submit:"Daftar",
    btn_confirm:"Konfirmasi",
    btn_delete:"Hapus",
    btn_next:"Selanjutnya",
    usesetting:"Pergunakan pengaturan ini untuk mengelola script",
    deactivated:"Profil di nonaktifkan",
    reactivated:"Profil dihidupkan kembali",
    confirmed:"Permintaan terkonformasi",
    declined:"Permintaan ditolak",
    onunfriend:"Saat kamu mendapatkan pertidaktemanan",
    oncanceled:"Saat permintaan pertemanan batal",
    othersettings:"Pengaturan lain",
    icons:"Tampilkan ikon",
    uids:"Tampilkan UIDs",
    profilepics:"Perbaharui gambar profil",
    hidemenubar:"Sembunyikan Unfriends Pada Menu",
    dissociateLists:"Split diterima dan Permintaan diabaikan",
    showTime:"Tampilkan tanggal ketika unfriend",
    disabled:"dimatikan",
    ok:"Setuju",
    error:"Rusak",
    unblock:"Dibuka",
    block:"Blokir",
    clang:"Pilih bahasa Anda",
    currentlang:"Bahasa sekarang",
    creset:"Klik untuk mereset",
    resetbody:"Apakah Anda yakin inigin memulihkan nilai ?",
    selectall:"Pilih Semua",
    selectnone:"Pilih Tak Satu Pun",
    use:"Gunakan",
    display:"Tampilakan",
    text_ignored:"Abaikan permintaan pertemanan Anda.",
    text_unfriend:"Tidak ada lagi dalam daftar teman",
    text_reactivated:"Profil teraktifasi ulang",
    text_deactivated:"Profil terhapus atu tersembunyi",
    text_being:"Profil sedang dinonaktifkan",
    text_unavailable:"Profil tidak tersedia",
    text_accepted:"Permintaan pertemanan diterima",
    text_canceled:"Pewrmintaan pertemanan ditolak",
    text_pending:"Permintaan pertemanan menunggu",
    nomessages:"tidak ada Pesan",
    text_noa:"Tidak ada parmintaan yang menunggu",
    text_nou:"tidak ada unfriends",
    text_error:"Error ketika menghapus hubungan",
    text_hideu:"Sembunyikan unfriend",
    text_hide:"Sembunyikan",
    text_alwayshide:"Selalu Sembunyi",
    text_removec:"Hapus hubungan",
    hasignored:"Abaikan salah satu permintaan pertemanan Anda",
    new_version:"Versi Terbaru",
    notif_version:"Sebuah versi terbaru tersedia",
    here:"di sini",
    wasunfriend:"Pernah di daftar teman Anda",
    settings:"Pengaturan",
    proceed:"Proses",
    exportData:"Ekspor data",
    importData:"Impor data",
    text_export:"Ekspor",
    text_import:"Import",
    dataToExport:"Data yang diekspor",
    back1:"Daftar unfriends adalah lokal. Ini berarti bahwa jika Anda menggunakan facebook di komputer lain, atau yang berbeda, Anda tidak akan bisa mendapatkan unfriends Anda.",
    back2:"Gunakan alat cadangan untuk ekspor atau impor daftar Anda ke atau dari browser lain.",
    hideOwnUnfriends:"Sembunyikan teman yang dihapus",
    wontAppear:"Profil ini tidak lagi muncul di daftar kawanan anda",
    today:"Hari ini",
    yesterday:"Kemarin",
    months:"Januari, Februari, Maret, April, Mei, Juni, Juli, Agustus, September, Oktober, Nopember, Desember",
    hide_perm:"Handakkah kam manyambunyikan sacara parmanen {name} ?",
    header_unfriends:"unfriends",
    header_reappeared:"Muncul kembali",
    header_ignored:"Permintaan Ditolak",
    header_accepted:"Permintaan Diterima",
    header_both:"Permintaan Diterima dan Ditolak",
    header_pending:"Permintaan tertunda",
    resettitle:"Pulihkan nilai ke semula",
    rvoid:"Memulihkan script dapat menghancurkan semua data Anda tentang unfriends Anda. Hati-hati."
};
$ms_MY = {
    langname:"Bahasa Melayu",
    unfriends:"Putus Sahabat",
    awaiting:"Menunggu Permintaan",
    notifications:"Pemberitahuan",
    messages:"Pesanan",
    becomeFan:"Jadilah peminat",
    isFan:"Anda adalah ahli",
    joinGroup:"Sertai kumpulan",
    cancel:"Batal",
    change:"Pinda",
    manage:"Urus",
    reset:"Laras semula",
    hide:"Sorok",
    behavior:"Cara Beroperasi",
    lang:"Bahasa",
    reset_:"Laras Semula",
    help:"Bantuan",
    btn_ok:"Ok",
    btn_cancel:"Batal",
    btn_close:"Tutup",
    btn_save:"Simpan",
    btn_submit:"Hantar",
    btn_confirm:"Pengesahan",
    btn_delete:"Padam",
    btn_next:"Lagi",
    usesetting:"Tetapkan sebagai cara skrip ini beroperasi",
    deactivated:"Profil tidak aktif",
    reactivated:"Profil diaktifkan",
    confirmed:"Permintaan dipersetujui",
    declined:"Permintaan ditolak",
    onunfriend:"apabila seseorang memutuskan hubungan",
    oncanceled:"apabila permintaan bersahabat dibatalkan",
    othersettings:"Lain-lain konfigurasi",
    icons:"Tunjuk ikon",
    uids:"Tunjuk UIDs",
    profilepics:"Kemaskini gambar profil",
    hidemenubar:"Sorok skrip di Menubar",
    dissociateLists:"Asingkan senarai permintaan yang diterima dan ditolak",
    showTime:"Tarikh putus hubungan",
    disabled:"dihalang",
    ok:"Ok",
    error:"Masalah",
    unblock:"Tidak dihalang",
    block:"Halang",
    clang:"Pilih bahasa anda:",
    currentlang:"Bahasa dipilih",
    creset:"Klik untuk pelarasan semula",
    resetbody:"Adakah anda pasti untuk kembali kepada asal?",
    selectall:"Pilih Semua",
    selectnone:"Pilih Tiada",
    use:"Guna",
    display:"Display",
    text_ignored:"Permintaan anda ditolak.",
    text_unfriend:"sudah tiada dalam senarai anda",
    text_reactivated:"Profil diaktif semula",
    text_deactivated:"Profil dibuang atau tersembunyi",
    text_being:"Profil sedang dipadamkan",
    text_unavailable:"Profil tiada",
    text_accepted:"Permintaan diterima",
    text_canceled:"Permintaan dibatalkan",
    text_pending:"Permintaan ditangguh",
    nomessages:"Tiada Pesanan",
    text_noa:"Tiada permintaan yang ditunggu",
    text_nou:"Tiada yang memutuskan",
    text_error:"Masalah ketika memutuskan hubungan",
    text_hideu:"Sorok skrip",
    text_hide:"Sorok",
    text_alwayshide:"Sentiasa sorok",
    text_removec:"Putuskan hubungan",
    hasignored:"tidak pedulikan permintaan anda",
    new_version:"Versi terkini",
    notif_version:"Terdapat versi yang terkini",
    here:"disini",
    wasunfriend:"adalah sahabat anda sebelum ini",
    settings:"Settings",
    proceed:"Teruskan",
    exportData:"Pindah keluar Data",
    importData:"Pindah masuk Data",
    text_export:"Pindah keluar",
    text_import:"Pindah masuk",
    dataToExport:"Data untuk pindah keluar",
    back1:"Senarai ini disimpan secara individu. Sekiranya anda menggunakan facebook pada komputer yang berlainan atau sesi yang berasingan anda tidak akan mendapat status terkini",
    back2:"Guna salinan ini untuk komputer atau sesi yang berlainan",
    hideOwnUnfriends:"Sorok senarai sahabat yg dibuang",
    wontAppear:"Profil ini tidak akan disenarai lagi",
    today:"Hari ini",
    yesterday:"Kelmarin",
    months:"Januari, Febuari, Mac, April, Mei, Jun, Julai, Ogos, September, Oktober, November, Disember",
    hide_perm:"Adakah nama ini disembunyikan terus {name} ?",
    header_unfriends:"Putus Sahabat",
    header_reappeared:"Muncul Semula",
    header_ignored:"Permintaan ditolak",
    header_accepted:"Permintaan diterima",
    header_both:"Permintaan yang ditolak dan diterima",
    header_pending:"Permintaan ditangguh",
    resettitle:"Kembali kepada setting asal",
    rvoid:"Berhati-hati atas sebarang pelarasan yang boleh merosakkan data skrip"
};
$he_IL = {
    langname:"עברית",
    unfriends:"לא חברים",
    awaiting:"בקשות בהמתנה",
    notifications:"התראות",
    messages:"הודעות",
    becomeFan:"הפוך לאוהד",
    isFan:"אתה אוהד של הסקריפט",
    joinGroup:"הצטרף לקבוצה",
    cancel:"ביטול",
    change:"שנה",
    manage:"נהל",
    reset:"איפוס",
    hide:"הסתר",
    behavior:"מראה",
    lang:"שפה",
    reset_:"איפוס",
    help:"עזרה",
    btn_ok:"אישור",
    btn_cancel:"ביטול",
    btn_close:"סגור",
    btn_save:"שמור",
    btn_submit:"שלח",
    btn_confirm:"אשר",
    btn_delete:"מחק",
    btn_next:"הבא",
    usesetting:"השתמש בהגדרות אלו כדי לנהל את הסקריפט",
    deactivated:"פרופילים שבוטלו",
    reactivated:"פרופילים שהופעלו מחדש",
    confirmed:"בקשות שאושרו",
    declined:"בקשות שנדחו",
    onunfriend:"כאשר הסירו אותך מרשימת חברים",
    oncanceled:"כאשר בקשת חברות בוטלה",
    othersettings:"הגדרות נוספות",
    icons:"הצג אייקונים",
    uids:"הצג מספרי זיהוי",
    profilepics:"עדכן תמונת פרופיל",
    hidemenubar:"הסתר מהתפריט את הקישור לסקריפט",
    dissociateLists:"פצל בקשות מאושרות ובקשות שהתעלמו מהן",
    showTime:"הראה תאריך כאשר נמצא חבר שהסיר אותך",
    disabled:"מופסק",
    ok:"אישור",
    error:"שגיאה",
    unblock:"בטל חסימה",
    block:"חסום",
    clang:"בחר שפה",
    currentlang:"השפה הנוכחית",
    creset:"לחץ על הכפתור כדי לאפס",
    resetbody:"האם ברצונך לאפס את כל הערכים לברירת המחדל שלהם ?",
    selectall:"בחר הכל",
    selectnone:"בחר כלום",
    use:"השתמש",
    display:"הצג",
    text_ignored:"התעלמו מבקשת החברות שלך.",
    text_unfriend:"לא נמצא יותר ברשימת החברים שלך.",
    text_reactivated:"הפרופיל הופעל מחדש.",
    text_deactivated:"הפרופיל נמחק או הוחבא",
    text_being:"פרופיל שנסגר.",
    text_unavailable:"פרופיל אינו זמין.",
    text_accepted:"בקשת חברות אושרה.",
    text_canceled:"בקשת חברות בוטלה.",
    text_pending:"בקשת חברות בהמתנה.",
    nomessages:"אין הודעות",
    text_noa:"אין בקשות בהמתנה",
    text_nou:"אין לך חברים שהסירו אותך",
    text_error:"אירעה שגיאה בעת מחיקת החיבור",
    text_hideu:"הסתר’ לא חבר’",
    text_hide:"הסתר",
    text_alwayshide:"הסתר תמיד",
    text_removec:"מחק חיבור",
    hasignored:"התעלם מאחד מבקשות החברות שלך",
    new_version:"גירסה חדשה",
    notif_version:"קיימת גירסה חדשה לסקריפט.",
    here:"כאן",
    wasunfriend:"היה ברשימת החברים שלך.",
    settings:"הגדרות",
    proceed:"המשך",
    exportData:"ייצא מידע",
    importData:"ייבא מידע",
    text_export:"ייצוא",
    text_import:"ייבוא",
    dataToExport:"מידע לייצוא",
    back1:"רשימת ה’לא-חברים’ שלך היא מקומית, כלומר אם תשתמש בפייסבוק במחשב אחר, או בסשן נוסף של הדפדפן, לא תוכל לראות את החברים שברשימה.",
    back2:"השתמש בכלי הגיבוי על מנת לייבא או לייצא את הרשימות לדפדפן אחר או ממנו.",
    hideOwnUnfriends:"הסתר חברים שאתה מחקת",
    wontAppear:"פרופיל זה לא יופיע ברשימת החברים שאתה מחקת.",
    today:"היום",
    yesterday:"אתמול",
    months:"ינואר, פברואר, מרץ, אפריל, מאי, יוני, יולי, אוגוסט, ספטמבר, אוקטובר, נובמבר, דצמבר",
    hide_perm:"הם ברצונך להחביא לצמיתות את {name} ?",
    header_unfriends:"לא חברים",
    header_reappeared:"פרופילים שהופיעו מחדש",
    header_ignored:"בקשות שהתעלמו מהן",
    header_accepted:"בקשות שאושרו",
    header_both:"בקשות שאושרו ושהתעלמו מהן",
    header_pending:"בקשות הממתינות לאישור",
    resettitle:"אפס את הערכים לברירת המחדל",
    rvoid:"זהירות ! איפוס הסקריפט מוחק את כל המידע לגבי החברים שהסירו אותך."
};
$ar_AR = {
    langname:"العربية",
    unfriends:"اصدقاء  غير موجودين",
    awaiting:"طلبات  الانتظار",
    notifications:"ملاحظات",
    messages:"رسائل",
    becomeFan:"كن معجب",
    isFan:"انت معجب",
    joinGroup:"انضم الى المجموعة",
    cancel:"الغاء ",
    change:"تغيير",
    manage:"ادارة",
    reset:"اعادة تأهيل",
    hide:"اخفاء",
    behavior:"المظهر",
    lang:"اللغة",
    reset_:"اعادة تأهيل",
    help:"المساعدة",
    btn_ok:"موافق",
    btn_cancel:"الغاء الأمر",
    btn_close:"اغلاق",
    btn_save:"حفظ",
    btn_submit:"إرسال",
    btn_confirm:"تأكيد",
    btn_delete:"حذف",
    btn_next:"التالي",
    usesetting:"استعمل هذه الإعدادات لتغييرإظهار القوائم",
    deactivated:"ايقاف البروفيل",
    reactivated:"اعادة تشغيل البروفيل",
    confirmed:"الطلبات المثبتة",
    declined:"الطلبات الملغية",
    onunfriend:"عند الحصول على غيرصديق",
    oncanceled:"عندما يلغى طلب صديق",
    othersettings:"إعدادات اخرى",
    icons:"عرض الأيقونات",
    uids:"عرض اسماء المستخدمين",
    profilepics:"تحديث صورالملف الشخصي",
    hidemenubar:"اخفاء غيرصديق من القائمة الرئيسية",
    dissociateLists:"فصل الطلبات بين مقبول و مرفوض",
    showTime:"عرض فحص التاريخ في غيرصديق",
    disabled:"غير فعّال",
    ok:"موافق",
    error:"خطأ",
    unblock:"الغاءالحظر",
    block:"حظر",
    clang:"اختر لغتك:",
    currentlang:"اللغة المستعملة",
    creset:"اظغط هنا للإعادة الى الصفر",
    resetbody:"هل انت متأكد من مسح القيم؟",
    selectall:"اختر الكل",
    selectnone:"اختر لا شيء",
    use:"استعمال",
    display:"إظهار",
    text_ignored:"تجاهلت طلب صديقك.",
    text_unfriend:"هو لم يعد في قائمة اصدقائك.",
    text_reactivated:"اعادة تشغيل البروفيل",
    text_deactivated:"البروفيل محذوف أو مخفي",
    text_being:"ايقاف البروفيل",
    text_unavailable:"البروفيل غير متوفر",
    text_accepted:"طلب الصديق مقبول",
    text_canceled:"طلب الصديق ملغى",
    text_pending:"طلب الصديق معلق",
    nomessages:"لا توجد رسائل",
    text_noa:"لا طلابات في الانتظار",
    text_nou:"لا يوجد غيرصديق",
    text_error:"خطأ عند الغاء الطلب.",
    text_hideu:"اخفاء غيرصديق",
    text_hide:"اخفاء",
    text_alwayshide:"اخفاء دائم",
    text_removec:"الغاء الطلب",
    hasignored:"تجاهل واحد من طلب الاصدقاء",
    new_version:"إصدار جديد",
    notif_version:"إصدار جديد متوفر",
    here:"هنا",
    wasunfriend:"كان في قائمة اصدقائك.",
    settings:"إعدادات",
    proceed:"باشِر",
    exportData:"تصدير معلومات",
    importData:"استيراد معلومات",
    text_export:"تصدير",
    text_import:"استيراد",
    dataToExport:"بينات للتصدير",
    back1:"قائمة غيرصديق محليّة.هذه يعني اذا استعملت الفيسبوك في حاسوب آخر, او جلسة فايرفوكس اخرى, لن تكون قادر على الحصول على غيرصديق حقك",
    back2:"استعمل اداة الحفظ هذه لتصدير و استيراد قوائم من والى مستعرض فيرفوكس اخر",
    hideOwnUnfriends:"اخفاء اصدقاء تم حذفهم",
    wontAppear:"هذا البروفيل لا يمكن عرضه في قائمة غيرصديق.",
    today:"اليوم",
    yesterday:"امس",
    months:"كانون الثانى, شباط, أذار, نيسان, ايار, حزيران, تموز, آب, ايلول,  تشرين الاول, تشرين الثاني, كانون الاول",
    hide_perm:"دئمآ؟ {name} هل تريد اخفاء",
    header_unfriends:"غيرصديق",
    header_reappeared:"البروفيل ظهر من جديد",
    header_ignored:"الطلبات المرفوضة",
    header_accepted:"الطلبات المقبولة",
    header_both:"الطلبات المقبولة و المرفوضة",
    header_pending:"طلبات في الانتظار",
    resettitle:"إعادة القيم الى القيم المبدئيه",
    rvoid:"أحذر! اعادة تأهيل السكريبت يؤدي الى مسح كل المعلومات عن غيرصديق."
};
$bn_IN = {
    langname:"বাংলা",
    unfriends:"বন্ধুবিচ্ছেদ",
    awaiting:"অপেক্ষমান অনুরোধসমূহ",
    notifications:"প্রজ্ঞাপণসমূহ",
    messages:"বার্তাসমূহ",
    becomeFan:"ভক্ত হোন",
    isFan:"আপনি ভক্ত হয়েছেন",
    joinGroup:"দলে যোগ দিন",
    cancel:"বাতিল",
    change:"পরিবর্তন করুন",
    manage:"ব্যবস্থাপনা",
    reset:"পুনর্স্থাপন করুন",
    hide:"আড়াল করুন",
    behavior:"অভিরুচি",
    lang:"ভাষা",
    reset_:"পুনর্স্থাপন",
    help:"সাহায্য",
    btn_ok:"ঠিকাছে",
    btn_cancel:"বাতিল",
    btn_close:"বন্ধ করুন",
    btn_save:"সংরক্ষণ করুন",
    btn_submit:"পেশ করুন",
    btn_confirm:"নিশ্চিত করুন",
    btn_delete:"মুছে ফেলুন",
    btn_next:"পরবর্তী",
    usesetting:"অভিরুচি এবং ব্যবস্থাপনা পরিবর্তন করুন।",
    deactivated:"প্রোফাইল নিস্ক্রিয় হয়েছে",
    reactivated:"প্রোফাইল পুনঃসক্রিয় হয়েছে",
    confirmed:"অনুরোধ অনুমোদিত হয়েছে",
    declined:"অনুরোধ প্রত্যাখ্যাত হয়েছে",
    onunfriend:"যখন কেউ আমাকে বন্ধুবিচ্ছেদ করবে অথবা তাদের প্রোফাইল নিস্ক্রিয় করবে",
    oncanceled:"যখন বন্ধুত্বের অনুরোধ উপেক্ষা করা হবে",
    othersettings:"অন্যান্য ব্যবস্থাপনা",
    icons:"আইকন দেখাবে",
    uids:"ইউআইডি দেখাবে",
    profilepics:"প্রোফাইলের ছবি হালনাগাদ হবে",
    hidemenubar:"মেনুবারে বন্ধুবিচ্ছেদ আড়ালে থাকবে",
    dissociateLists:"গৃহীত এবং প্রত্যাখ্যাত অনুরোধসমূহ আলাদা থাকবে",
    showTime:"বন্ধুবিচ্ছেদের সময় এবং তারিখ দেখাবে",
    disabled:"নিষ্ক্রিয়",
    ok:"ঠিকাছে",
    error:"ত্রুটি",
    unblock:"আনব্লক করুন",
    block:"ব্লক করুন",
    clang:"আপনার ভাষা নির্ধারণ করুন :",
    currentlang:"বর্তমান ভাষা",
    creset:"নির্বাচিত তথ্যাদি পুনর্স্থাপন করুন",
    resetbody:"সতর্কতা: স্ক্রিপ্টের মানসমূহ পুনর্স্থাপন করলে সকল অভিরুচি, ব্যবস্থাপনা এবং উদ্ভূত তথ্যাদি অপসারণ হবে। আপনি কি তা করতে ইচ্ছুক?",
    selectall:"সবগুলো নির্বাচন করুন",
    selectnone:"কোনটিই নির্বাচন নয়",
    use:"ব্যবহার",
    display:"দেখুন",
    text_ignored:"আপনার বন্ধুত্বের অনুরোধ উপেক্ষা করেছেন।",
    text_unfriend:"এখন আর আপনার বন্ধু-তালিকায় নেই।",
    text_reactivated:"প্রোফাইল পুনঃসক্রিয় করেছেন",
    text_deactivated:"বৃত্তান্ত নিষ্ক্রিয় হয়েছে",
    text_being:"বৃত্তান্ত নিষ্ক্রিয় হচ্ছে",
    text_unavailable:"বৃত্তান্ত পাওয়া যায়নি",
    text_accepted:"আপনার বন্ধুত্বের অনুরোধ গ্রহণ করেছেন",
    text_canceled:"আপনার বন্ধুত্বের অনুরোধ বাতিল করেছেন",
    text_pending:"বন্ধুত্বের অনুরোধ অপেক্ষমান",
    nomessages:"কোন বার্তা নেই",
    text_noa:"কোন অপেক্ষমান অনুরোধ নেই",
    text_nou:"কোন বন্ধুবিচ্ছেদ নেই",
    text_error:"সম্পর্ক সরিয়ে ফেলার সময় ত্রুটি দেখা দিয়েছে।",
    text_hideu:"বন্ধুবিচ্ছেদ আড়ালে রাখুন",
    text_hide:"আড়াল করুন",
    text_alwayshide:"সবসময় আড়ালে থাকবে",
    text_removec:"সম্পর্ক অপসারণ করুন",
    hasignored:"আপনার বন্ধুত্বের অনুরোধগুলোর একটি প্রত্যাখ্যান করেছেন।",
    new_version:"নতুন সংস্করণ",
    notif_version:"নতুন সংস্করণ পাওয়া যাচ্ছে",
    here:"এখানে",
    wasunfriend:"আপনার বন্ধু তালিকায় ছিলেন।",
    settings:"ব্যবস্থাপনা",
    proceed:"অগ্রসর হোন",
    exportData:"তথ্য রপ্তানি",
    importData:"তথ্য আমদানি",
    text_export:"ব্যাকআপ করুন",
    text_import:"পূর্বাবস্থায় ফেরান",
    dataToExport:"যে তথ্যাদি রপ্তানি হবে",
    back2:"আপনার অভিরুচি, ব্যবস্থাপনা এবং বন্ধুবিচ্ছেদ সংক্রান্ত উদ্ভূত তথ্যাদি অন্য কম্পিউটার বা ব্রাউজারে আমদানি করতে এই ব্যাকআপ টুলটি ব্যবহার করুন।",
    hideOwnUnfriends:"যেসব বন্ধুকে আপনি অপসারণ করেছেন তারা আড়ালে থাকবে",
    wontAppear:"এই বৃত্তান্তটি আপনার বন্ধুবিচ্ছেদ তালিকায় প্রকাশ পাবে না।",
    today:"আজ",
    yesterday:"গতকাল",
    months:"জানুয়ারি, ফেব্রুয়ারি, মার্চ, এপ্রিল, মে, জুন, জুলাই, আগস্ট, সেপ্টেম্বর, অক্টোবর, নভেম্বর, ডিসেম্বর",
    hide_perm:"আপনি কি {name}-কে স্থায়ীভাবে আড়ালে রাখতে চান?",
    header_unfriends:"বন্ধুবিচ্ছেদ",
    header_reappeared:"পুনঃআবির্ভাব",
    header_ignored:"প্রত্যাখ্যাত অনুরোধসমূহ",
    header_accepted:"গৃহীত অনুরোধসমূহ",
    header_both:"গৃহীত এবং প্রত্যাখ্যাত অনুরোধসমূহ",
    header_pending:"অপেক্ষমান অনুরোধসমূহ",
    resettitle:"মান, অভিরুচি এবং ব্যবস্থাপনাগুলো পূর্বনির্ধারিত অবস্থায় ফিরিয়ে নিন।",
    back1:"বন্ধুবিচ্ছেদ তালিকা স্থানীয়ভাবে উদ্ভূত হয়। এর মানে এই যে আপনি যদি অন্য কম্পিউটার, বা অন্য কোন সেশনে ফেসবুক ব্যবহার করেন, তবে আপনার বন্ধুবিচ্ছেদ তালিকা দেখতে পাবেন না।",
    rvoid:"যেগুলো আপনি পূর্বনির্ধারিত অবস্থায় ফিরিয়ে নিতে চান সেসব বক্সে টিক চিহ্ন দিন। পূর্বসতর্কতাস্বরূপ, নিচের রপ্তানি টুলটি ব্যবহার করে আপনার অভিরুচি, ব্যবস্থাপনা এবং উদ্ভূত তথ্যাদি ব্যাকআপ করে নিতে দৃঢ়ভাবে সুপারিশ করা হচ্ছে।"
};
$zh_CN = {
    langname:"中文(简体)",
    unfriends:"Unfriends",
    awaiting:"等待",
    notifications:"通知",
    messages:"站内信",
    becomeFan:"成为粉丝",
    isFan:" 你是一个粉丝",
    joinGroup:"加入群组",
    cancel:"取消",
    change:"更改",
    manage:"管理",
    reset:"重新设定",
    hide:"隐藏",
    behavior:"外观",
    lang:"语言",
    reset_:"重新设定",
    help:"帮助中心",
    btn_ok:"确定",
    btn_cancel:"取消",
    btn_close:"关闭",
    btn_save:"保存",
    btn_submit:"提交",
    btn_confirm:"确认",
    btn_delete:"删除",
    btn_next:"下一页",
    usesetting:"使用设定",
    deactivated:"停用",
    reactivated:"重新启用",
    confirmed:"确认",
    declined:"拒绝",
    onunfriend:"当你有一个unfriend",
    oncanceled:"当一个朋友的要求被取消",
    othersettings:"其他设定",
    icons:"显示图标",
    uids:"显示 UIDs",
    profilepics:"个人图片",
    hidemenubar:"隐藏Unfriends菜单",
    dissociateLists:"请求被忽略",
    showTime:"显示Unfriends日期",
    disabled:"取消",
    ok:"好的",
    error:"错误",
    unblock:"取消阻止",
    block:"阻止",
    clang:"选择语言：",
    currentlang:"现在的语言",
    creset:"重设被选资料",
    resetbody:"注意：重设脚本的设定将移除所有的设定及资料，您确定要执行？",
    selectall:"选择全部",
    selectnone:"选择 无",
    use:"使用",
    display:"显示",
    text_ignored:"忽略了你的朋友请求。",
    text_unfriend:"已不在您的朋友列表。",
    text_reactivated:"资料重新激活",
    text_deactivated:"资料删除或隐藏",
    text_being:"资料被删除",
    text_unavailable:"资料不可用",
    text_accepted:"已接受你的朋友请求",
    text_canceled:"好友请求已取消",
    text_pending:"等待请求",
    nomessages:"没有站内信",
    text_noa:"没有等待请求",
    text_nou:"没有取消好友",
    text_error:"删除连接时发生错误。",
    text_hideu:"隐藏Unfriend",
    text_hide:"隐藏",
    text_alwayshide:"总是隐藏",
    text_removec:"删除连接",
    hasignored:"忽略你的朋友请求之一",
    new_version:"新版本",
    notif_version:"有一可更新版本",
    here:"这里",
    wasunfriend:"在您的朋友列表里。",
    settings:"设置",
    proceed:"继续进行",
    exportData:"导出数据",
    importData:"导入数据",
    text_export:"导出",
    text_import:"导入",
    dataToExport:"数据导出",
    back1:"Unfriend 名单是在您这一台电脑才能看到的的。这意味着，如果您使用另一台计算机上 Facebook，或者使用无安装 Unfriend Finder 的浏览器，您将无法检阅您的 Unfriend 名单。",
    back2:"使用此备份工具导入设定及 Unfriend 数据到另一台电脑或另一个浏览器。",
    hideOwnUnfriends:"隐藏您刪除的朋友",
    wontAppear:"该个人资料将不会出现在您的 Unfriend 名单",
    today:"今日",
    yesterday:"昨天",
    months:"一月，二月，三月，四月，五月，六月，七月，八月，九月，十月，十一月，十二月",
    hide_perm:"你想永久隐藏 {name}？",
    header_unfriends:"Unfriends",
    header_reappeared:"再现",
    header_ignored:"请求被忽略",
    header_accepted:"请求被接受",
    header_both:"请求被接受及被忽略",
    header_pending:"等待请求验证中",
    resettitle:"重置为默认值",
    rvoid:"勾选您要重设的格子。强烈建议您使用一下导出工具备份您原有的设定及资料。"
};
$zh_TW = {
    langname:"中文(台灣)",
    unfriends:"已被移除的好友",
    awaiting:"等待",
    notifications:"通知",
    messages:"訊息",
    becomeFan:"成為粉絲",
    isFan:"你是粉絲",
    joinGroup:"加入群組",
    cancel:"取消",
    change:"更改",
    manage:"管理",
    reset:"重新設定",
    hide:"隱藏",
    behavior:"外觀",
    lang:"語言",
    reset_:"重新設定",
    help:"使用說明",
    btn_ok:"確定",
    btn_cancel:"取消",
    btn_close:"關閉",
    btn_save:"儲存",
    btn_submit:"確認",
    btn_confirm:"確認",
    btn_delete:"刪除",
    btn_next:"下一步",
    usesetting:"使用設定",
    deactivated:"停用",
    reactivated:"重新啟用",
    confirmed:"確認",
    declined:"拒絕",
    onunfriend:"當你有一個unfriend",
    oncanceled:"當一個好友請求被取消",
    othersettings:"其他設定",
    icons:"顯示圖示",
    uids:"顯示 UIDs",
    profilepics:"個人圖片",
    hidemenubar:"隱藏菜單Unfriends",
    dissociateLists:"展開接受及忽略的要求。",
    showTime:"顯示Unfriends的檢查日期",
    disabled:"取消",
    ok:"好的",
    error:"錯誤",
    unblock:"取消阻止",
    block:"阻止",
    clang:"選擇語言：",
    currentlang:"現在的語言",
    creset:"選取以重置",
    resetbody:"您確定要重置？",
    selectall:"選擇 全部",
    selectnone:"選擇 無",
    use:"使用",
    display:"顯示",
    text_ignored:"忽略了您的好友請求。",
    text_unfriend:"不再列入您的朋友清單內。",
    text_reactivated:"個人檔案恢復",
    text_deactivated:"個人檔案刪除或隱藏",
    text_being:"個人檔案停用",
    text_unavailable:"資料無法使用",
    text_accepted:"好友請求已接受",
    text_canceled:"好友請求已取消",
    text_pending:"好友邀請待確認",
    nomessages:"没有郵件訊息",
    text_noa:"沒有等待請求",
    text_nou:"沒有被移除的好友",
    text_error:"刪除連接時發生錯誤。",
    text_hideu:"隱藏被移除的好友",
    text_hide:"隱藏",
    text_alwayshide:"總是隱藏",
    text_removec:"刪除連接",
    hasignored:"忽略您的好友請求",
    new_version:"新版本",
    notif_version:"一個新的版本可用",
    here:"這裡",
    wasunfriend:"在您的朋友列表。",
    settings:"設置",
    proceed:"繼續",
    exportData:"輸出資料",
    importData:"匯入資料",
    text_export:"輸出",
    text_import:"匯入",
    dataToExport:"資料輸出",
    back1:"該移除好友名單是本地的。這意味著，如果您在另一台電腦，或其他Firefox層次使用臉書，您將不能取得您的移除好友名單。",
    back2:"使用此備份工具匯出或導入您的列表，以導入或匯出至其他FireFox瀏覽器。",
    hideOwnUnfriends:"隱藏你已移除的好友",
    wontAppear:"這份個人資料將不會出現在你的unfriends清單中。",
    today:"今天",
    yesterday:"昨天",
    months:"一月, 二月, 三月, 四月, 五月, 六月, 七月, 八月, 九月, 十月, 十一月, 十二月",
    hide_perm:"您想要永久隱藏 {name} ?",
    header_unfriends:"刪除的好友",
    header_reappeared:"重新顯示個人資料",
    header_ignored:"忽略邀請",
    header_accepted:"接受邀請",
    header_both:"邀請 接受 & 忽略",
    header_pending:"邀請待回覆中",
    resettitle:"重置為預設值",
    rvoid:"重置腳本將會破壞你unfriends的所有資料。請小心操作。"
};
$zh_HK = {
    langname:"中文(香港)",
    unfriends:"已被移除的朋友",
    awaiting:"等待中的請求",
    notifications:"通知",
    messages:"信息",
    becomeFan:"成為擁蠆",
    isFan:"你是擁蠆",
    joinGroup:"加入群組",
    cancel:"取消",
    change:"更改",
    manage:"管理",
    reset:"重新設定",
    hide:"隱藏",
    behavior:"外觀",
    lang:"語言",
    reset_:"重設",
    help:"說明",
    btn_ok:"確定",
    btn_cancel:"取消",
    btn_close:"關閉",
    btn_save:"儲存",
    btn_submit:"提交",
    btn_confirm:"確認",
    btn_delete:"刪除",
    btn_next:"下一步",
    usesetting:"使用設定",
    deactivated:"停用個人檔案",
    reactivated:"重新啟用個人檔案",
    confirmed:"確認",
    declined:"拒絕",
    onunfriend:"當你有一個已被移除的朋友",
    oncanceled:"當一個朋友的請求被取消",
    othersettings:"其它設定",
    icons:"顯示圖示",
    uids:"顯示 UIDs",
    profilepics:"更新個人相片",
    hidemenubar:"隱藏選單中的已移除的朋友",
    dissociateLists:"分開「已接受請求」和「被無視的請求」",
    showTime:"顯示已被移除朋友的檢查日期",
    disabled:"關閉",
    ok:"確認",
    error:"錯誤",
    unblock:"取消封鎖",
    block:"封鎖",
    clang:"選擇語言：",
    currentlang:"現在的語言",
    creset:"按此重設",
    resetbody:"您確定要重設？",
    selectall:"全選",
    selectnone:"全不選",
    use:"使用",
    display:"顯示",
    text_ignored:"忽略了你的朋友的請求。",
    text_unfriend:"已經不在你的朋友名單中。",
    text_reactivated:"個人檔案已回復",
    text_deactivated:"個人檔案刪除或隱藏",
    text_being:"個人檔案已被停用",
    text_unavailable:"個人檔案無法使用",
    text_accepted:"已接受朋友的請求",
    text_canceled:"已取消朋友的請求",
    text_pending:"等待確認的朋友邀請",
    nomessages:"没有訊息",
    text_noa:"沒有等待中的請求",
    text_nou:"沒有已移除的朋友",
    text_error:"在刪除時連接發生錯誤。",
    text_hideu:"隱藏被移除的朋友",
    text_hide:"隱藏",
    text_alwayshide:"經常隱藏",
    text_removec:"刪除連接",
    hasignored:"忽略您的其中一個朋友請求",
    new_version:"新版本",
    notif_version:"有一個新版本已推出",
    here:"這裡",
    wasunfriend:"在您的朋友名單。",
    settings:"設定",
    proceed:"繼續",
    exportData:"輸出資料",
    importData:"匯入資料",
    text_export:"輸出",
    text_import:"匯入",
    dataToExport:"資料輸出",
    back1:"「移除朋友名單」是本機的。這意味著，當您使用另一部電腦，或其他Session的時候，您將不能取得您的移除朋友名單.",
    back2:"使用這個備份工具來匯出或從其他瀏覽器中匯入您的名單",
    hideOwnUnfriends:"隱藏你已移除的朋友",
    wontAppear:"這個個人檔案將不會再出現在您的移除朋友名單中.",
    today:"今日",
    yesterday:"昨日",
    months:"一月, 二月, 三月, 四月, 五月, 六月, 七月, 八月, 九月, 十月, 十一月, 十二月",
    hide_perm:"您想永久隱藏{name}嗎?",
    header_unfriends:"已移除的朋友",
    header_reappeared:"重新顯示個人資料",
    header_ignored:"忽略請求",
    header_accepted:"接受請求",
    header_both:"接受及忽略請求",
    header_pending:"等待確認中的請求",
    resettitle:"重設為預設值",
    rvoid:"請勾選你想重設的選項。請小心:重設此Script將移除您所有的已被移除的朋友。"
};
$ja_JP = {
    langname:"日本語",
    unfriends:"Unfriends",
    awaiting:"承認待ちのリクエスト",
    notifications:"お知らせ",
    messages:"メッセージ",
    becomeFan:"ファンになる",
    isFan:"ファンになっています",
    joinGroup:"グループに参加",
    cancel:"キャンセル",
    change:"変更",
    manage:"管理",
    reset:"リセット",
    hide:"隠す",
    behavior:"表示",
    lang:"言語",
    reset_:"リセット",
    help:"ヘルプ",
    btn_ok:"OK",
    btn_cancel:"キャンセル",
    btn_close:"閉じる",
    btn_save:"保存",
    btn_submit:"送信",
    btn_confirm:"承認",
    btn_delete:"削除",
    btn_next:"次へ",
    usesetting:"この設定を使ってスクリプトの動作を管理します",
    deactivated:"利用停止されたプロフィール",
    reactivated:"再開されたプロフィール",
    confirmed:"承認されたリクエスト",
    declined:"拒否されたリクエスト",
    onunfriend:"友達から削除された時",
    oncanceled:"友達リクエストがキャンセルされた時",
    othersettings:"その他の設定",
    icons:"アイコンを表示",
    uids:"UIDを表示",
    profilepics:"プロフィール写真の更新",
    hidemenubar:"メニューバーのUnfriendsを隠す",
    dissociateLists:"承認されたリクエストと無視されたリクエストを分割する",
    showTime:"友達から削除されたのを確認した日付を表示",
    disabled:"無効",
    ok:"OK",
    error:"エラー",
    unblock:"ブロックを解除",
    block:"ブロック",
    clang:"言語を選択して下さい :",
    currentlang:"現在の言語",
    creset:"クリックしてリセット",
    resetbody:"値をリセットしてよろしいですか？",
    selectall:"すべて選択",
    selectnone:"選択解除",
    use:"使用する",
    display:"表示",
    text_ignored:"さんが友達リクエストを無視しました。",
    text_unfriend:"さんはもう友達リストにはいません。",
    text_reactivated:"復活したプロフィール",
    text_deactivated:"削除されたか隠されているプロフィール",
    text_being:"利用停止中のプロフィール",
    text_unavailable:"利用できないプロフィール",
    text_accepted:"友達リクエストが承認されました",
    text_canceled:"友達リクエストがキャンセルされました",
    text_pending:"友達リクエストが保留中です",
    nomessages:"メッセージがありません",
    text_noa:"承認待ちのリクエストはありません",
    text_nou:"友達から削除されていません",
    text_error:"つながりを解除中にエラーが発生しました。",
    text_hideu:"Unfriendを隠す",
    text_hide:"隠す",
    text_alwayshide:"常に隠す",
    text_removec:"つながりを解除",
    hasignored:"さんは友達リクエストの一つを無視しました。",
    new_version:"新しいバージョン",
    notif_version:"新しいバージョンが利用可能です",
    here:"こちら",
    wasunfriend:"さんは友達リストにいました。",
    settings:"設定",
    proceed:"続行",
    exportData:"データをエクスポート",
    importData:"データをインポート",
    text_export:"エクスポート",
    text_import:"インポート",
    dataToExport:"エクスポートするデータ",
    back1:"Unfriendsリストはローカルに保存されます。つまり、他のコンピュータや他のセッションでFacebookを使うと、Unfriendsを取得できなくなります。",
    back2:"このバックアップツールを使って、リストを他のブラウザにエクスポート、または他のブラウザからインポートします。",
    hideOwnUnfriends:"解除した友達を隠す",
    wontAppear:"このプロフィールはUnfriendsリストに表示されなくなります。",
    today:"今日",
    yesterday:"昨日",
    months:"1月, 2月, 3月, 4月, 5月, 6月, 7月, 8月, 9月, 10月, 11月, 12月",
    hide_perm:"{name}さんを一時的に隠しますか？",
    header_unfriends:"Unfriends",
    header_reappeared:"復活",
    header_ignored:"無視されたリクエスト",
    header_accepted:"承認されたリクエスト",
    header_both:"承認されたリクエストと無視されたリクエスト",
    header_pending:"保留中のリクエスト",
    resettitle:"デフォルト値にリセット",
    rvoid:"スクリプトのリセットはUnfriendsのすべてのデータを破棄します。注意してください。"
};
$ko_KR = {
    langname:"한국어",
    unfriends:"친구삭제",
    awaiting:"대기 중인 요청",
    notifications:"알림",
    messages:"메시지",
    becomeFan:"팬 신청",
    isFan:"이미 팬입니다",
    joinGroup:"그룹 가입하기",
    cancel:"취소하기",
    change:"변경하기",
    manage:"관리하기",
    reset:"재설정하기",
    hide:"숨기기",
    behavior:"모양",
    lang:"언어",
    reset_:"재설정하기",
    help:"도움말",
    btn_ok:"선택",
    btn_cancel:"취소",
    btn_close:"닫기",
    btn_save:"저장",
    btn_submit:"제출",
    btn_confirm:"확인",
    btn_delete:"삭제",
    btn_next:"다음",
    usesetting:"스크립트의 기능을 관리하려면 이 설정을 사용하세요",
    deactivated:"비활성화된 프로필",
    reactivated:"재활성화된 프로필",
    confirmed:"승인된 요청",
    declined:"거절된 요청",
    onunfriend:"삭제된 친구가 있는 경우",
    oncanceled:"친구 요청이 취소된 경우",
    othersettings:"기타 설정하기",
    icons:"아이콘 표시",
    uids:"UID 표시",
    profilepics:"프로필 사진 갱신",
    hidemenubar:"메뉴바에서 친구삭제 숨김",
    dissociateLists:"수락된 요청과 무시된 요청 분리",
    showTime:"친구삭제 확인 날짜 보임",
    disabled:"비활성화된",
    ok:"네",
    error:"오류",
    unblock:"차단해제",
    block:"차단",
    clang:"언어 선택 :",
    currentlang:"현재 언어",
    creset:"재설정하기",
    resetbody:"정말로 항목을 초기화하겠습니까?",
    selectall:"전부 선택",
    selectnone:"선택 해제",
    use:"사용하기",
    display:"표시하기",
    text_ignored:"이(가) 당신의 친구요청을 무시했습니다.",
    text_unfriend:"은(는) 더 이상 친구 목록에 존재하지 않습니다.",
    text_reactivated:"재활성화된 프로필",
    text_deactivated:"삭제되거나 숨겨진 프로필",
    text_being:"비활성화 중인 프로필",
    text_unavailable:"존재하지 않는 프로필",
    text_accepted:"친구 요청 승인됨",
    text_canceled:"친구 요청 취소됨",
    text_pending:"친구 요청 대기 중",
    nomessages:"메시지 없음",
    text_noa:"대기 중인 요청 없음",
    text_nou:"친구삭제 없음",
    text_error:"연결을 삭제하는 동안 오류 발생.",
    text_hideu:"친구삭제 감추기",
    text_hide:"감추기",
    text_alwayshide:"항상 감추기",
    text_removec:"연결 삭제하기",
    hasignored:"당신의 친구 요청을 무시했습니다.",
    new_version:"새로운 버전",
    notif_version:"새로운 버전이 존재합니다",
    here:"이곳",
    wasunfriend:"과거의 친구",
    settings:"설정하기",
    proceed:"진행하기",
    exportData:"자료 내보내기",
    importData:"자료 불러오기",
    text_export:"내보내기",
    text_import:"불러오기",
    dataToExport:"내보낼 자료",
    back1:"친구삭제 목록은 제한적입니다. 다시 말하면, 다른 컴퓨터 또는 다른 세션에서 페이스북을 사용하는 경우 친구삭제 목록을 볼 수 없을 것입니다.",
    back2:"목록을 다른 브라우저로 내보내거나 다른 브라우저로부터 불러오려면 이 백업 도구를 사용하세요.",
    hideOwnUnfriends:"내가 삭제한 친구 숨김",
    wontAppear:"이 프로필은 친구삭제 목록에 표시되지 않을 것입니다.",
    today:"오늘",
    yesterday:"어제",
    months:"1월, 2월, 3월, 4월, 5월, 6월, 7월, 8월, 9월, 10월, 11월, 12월",
    hide_perm:"{이름}을(를) 영구히 숨기겠습니까?",
    header_unfriends:"친구삭제",
    header_reappeared:"다시 표시된",
    header_ignored:"무시된 요청",
    header_accepted:"승인된 요청",
    header_both:"승인된 또는 무시된 요청",
    header_pending:"요청 대기 중",
    resettitle:"설정 초기화하기",
    rvoid:"스크립트 재설정은 친구삭제에 관한 모든 자료를 삭제합니다. 주의하세요."
};
$tl_PH = {
    langname:"Filipino",
    unfriends:"Dina kaibigan",
    awaiting:"Mga Kahilingan",
    notifications:"Mga Notipikasyon",
    messages:"Mga Mensahe",
    becomeFan:"Maging Tagahanga",
    isFan:"Ikaw ay fan",
    joinGroup:"Sumali sa grupo",
    cancel:"Balewalain",
    change:"palitan",
    manage:"pamahalaan",
    reset:"ibalik sa dati",
    hide:"itago",
    behavior:"Hitsura",
    lang:"Linguahe",
    reset_:"Ibalik sa Dati",
    help:"Tulong",
    btn_ok:"Ayus",
    btn_cancel:"Balewalain",
    btn_close:"Isara",
    btn_save:"Tangapin",
    btn_submit:"Isumite",
    btn_confirm:"Kumpirmahin",
    btn_delete:"Burahin",
    btn_next:"Kasunod",
    usesetting:"Gamitin itong settings para pamahalaan ang aksyon ng script",
    deactivated:"Diaktibong porpolyo",
    reactivated:"Aktibong porpolyo",
    confirmed:"Nakumpirma na ang kahilinga",
    declined:"Tinangihan ang kahilingan",
    onunfriend:"Nagkaroon ka ng dinakaibigan",
    oncanceled:"Tinangihan ang imbitasyon sa pakikipagkaibigan",
    othersettings:"Iba pang settings",
    icons:"Ipakita ang icons",
    uids:"Ipakita ang UID\'s",
    profilepics:"Isapanahon ang larawan sa porpolyo",
    hidemenubar:"Itago ang dina kaibigan sa menubar",
    dissociateLists:"Paghiwalayin tinangap at ditinangap na kahilingan",
    showTime:"Ipakita ang check dates ng dinakaibigan",
    disabled:"Huwag paganahin",
    ok:"Ayus",
    error:"Mali",
    unblock:"Huwag harangan",
    block:"Harangan",
    clang:"Pumili ng lingwahe",
    currentlang:"Kasalukuyang Lingwahe",
    creset:"I-click para mabalik sa dati",
    resetbody:"Nakasiguro kaba na gusto mong ibalik sa dati ang values",
    selectall:"Piliin lahat",
    selectnone:"Walang piliin",
    use:"Gamitin",
    display:"Ipakita",
    text_ignored:"binalewala ang hiling pakikiipagkaibigan",
    text_unfriend:"ay wala na sa lista ng mga kaibigan",
    text_reactivated:"Pinaaktibong muli ang porpolyo",
    text_deactivated:"Binura o Tinago ang Porpolyo",
    text_being:"Ang Porpolyo ay Isinasadiaktibo",
    text_unavailable:"Hindi Available ang Porpolyo",
    text_accepted:"Ang Hiling na Pakikipagkaibigan ay Tinangap",
    text_canceled:"Ang Hiling na Pakikipagkaibigan ay Ditinangap",
    text_pending:"Ang Hiling na Pakikipagkaibigan ay Nakbinbin",
    nomessages:"Walang mga Mensahe",
    text_noa:"Walang mga kahilingan",
    text_nou:"Walang Dinakaibigan",
    text_error:"May mali habang tinatangal ang koneksyon",
    text_hideu:"Itago ang Dinakaibigan",
    text_hide:"Itago",
    text_alwayshide:"Palaging Itago",
    text_removec:"Tangalin ang Koneksyon",
    hasignored:"ang isang hiling pakikipagkaibigan ay binalewala",
    new_version:"Bagong Bersyon",
    notif_version:"May Bagong Bersyon ns",
    here:"dito",
    wasunfriend:"ay nasa iyong lista ng Kaibigan",
    settings:"Settings",
    proceed:"Magpatuloy",
    exportData:"I-Export ang Data",
    importData:"I-Import ang Data",
    text_export:"Export",
    text_import:"Import",
    dataToExport:"Mga Data na I-Export",
    back1:"Ang lista ng dinakaibigan ay local. Ibig sabihin di mo ito magagamit sa ibang computer o sesyon, dimo makukuha ang lista ng dinakaibigan.",
    back2:"Gamitin ang backup tool para i-export o i-import ang lista sa ibang browser.",
    hideOwnUnfriends:"Itago ang kaibigan na tinangal",
    wontAppear:"Ang porpolyo ay dina ipapakita sa mga lista ng dinakaibigan.",
    today:"Ngayon",
    yesterday:"Kahapon",
    months:"Enero, Pebrero, Marso, Abril, Mayo, Hunyo, Hulyo, Agosto, Setyembre, Oktubre, Nobyembre, Disyembre",
    hide_perm:"Gusto mo bang itago ng tuluyan {name} ?",
    header_unfriends:"Dinakaibigan",
    header_reappeared:"Bumalik",
    header_ignored:"Hiling Binalewalang",
    header_accepted:"Hiling ng tinanggap",
    header_both:"Hiling Tinanggap ",
    header_pending:"Mga Nakabinbing Kahilingan",
    resettitle:"Ibalik ang values sa dati",
    rvoid:"Ang pagbalik sa dati ng scripts ay makakatangal ng detalye ng mga dina kaibigan. Magingat."
};
$th_TH = {
    langname:"ภาษาไทย",
    unfriends:"Unfriends",
    awaiting:"รอการตอบรับ",
    notifications:"การแจ้งเตือน",
    messages:"ข้อความ",
    becomeFan:"ร่วมเป็นแฟนของเรา",
    isFan:"คุณได้เป็นแฟนของเราแล้ว",
    joinGroup:"เข้าร่วมกลุ่ม",
    cancel:"ยกเลิก",
    change:"เปลี่ยน",
    manage:"จัดการ",
    reset:"รีเซ็ท",
    hide:"ซ่อน",
    behavior:"ภาพลักษณ์",
    lang:"ภาษา",
    reset_:"รีเซ็ท",
    help:"ช่วยเหลือ",
    btn_ok:"ตกลง",
    btn_cancel:"ยกเลิก",
    btn_close:"ปิด",
    btn_save:"บันทึก",
    btn_submit:"ส่งค่า",
    btn_confirm:"ยืนยัน",
    btn_delete:"ลบ",
    btn_next:"ต่อไป",
    usesetting:"ใช้การตั้งค่านี้เพื่อจัดการเหตุการณ์ของสคริบต์",
    deactivated:"โปรไฟล์นี้ถูกยกเลิกแล้ว",
    reactivated:"โปรไฟล์นี้กลับมาใช้งานอีกครั้ง",
    confirmed:"การร้องขอได้รับการยืนยันแล้ว",
    declined:"การร้องขอไม่ได้รับการอนุมัติ",
    onunfriend:"เมื่อคุณถูกลบจากรายชื่อของเพื่อน",
    oncanceled:"เมื่อการร้องขอเป็นเพื่อนของคุณ ถูกยกเลิก",
    othersettings:"การตั้งค่าอื่นๆ",
    icons:"แสดงไอคอน",
    uids:"แสดง UIDs",
    profilepics:"แก้ไขรูปโปรไฟล์",
    hidemenubar:"ซ่อน Unfriends จากเมนูบาร์",
    dissociateLists:"แยกการร้องขอที่ถูกตอบรับและปฏิเสธ  ",
    showTime:"แสดงวันที่ตรวจสอบ",
    disabled:"ปิดการใช้งาน",
    ok:"ตกลง",
    error:"ความผิดพลาด",
    unblock:"ยกเลิกการบล็อค",
    block:"บล็อค",
    clang:"เลือกภาษาของคุณ:",
    currentlang:"ภาษาปัจจุบัน",
    creset:"คลิกเพื่อรีเซ็ท",
    resetbody:"คุณแน่ใจหรือไม่ที่จะล้างค่า?",
    selectall:"เลือกทั้งหมด",
    selectnone:"ยกเลิกการเลือก",
    use:"ใช้",
    display:"แสดง",
    text_ignored:"ปฎิเสธการขอเป็นเพื่อนของคุณ",
    text_unfriend:"ไม่อยู่ในรายชื่อเพื่อนคุณแล้ว",
    text_reactivated:"โปรไฟล์ถูกใช้งานอีกครั้งแล้ว",
    text_deactivated:"โปรไฟล์ถูกลบหรือซ่อน",
    text_being:"โปรไฟล์ที่ถูกยกเลิก",
    text_unavailable:"ไม่สามารถเข้าถึงโปรไฟล์ได้",
    text_accepted:"การร้องขอเป็นเพื่อนที่ตอบรับแล้ว",
    text_canceled:"การร้องขอเป็นเพื่อนที่ยกเลิกแล้ว",
    text_pending:"การร้องขอเป็นเพื่อน",
    nomessages:"ไม่มีข้อความ",
    text_noa:"ไม่มีข้อความที่รอการตอบรับ",
    text_nou:"ไม่มีเพื่อนที่ถูกลบ",
    text_error:"เกิดปัญหาในการเชื่อมต่อ",
    text_hideu:"ซ่อน Unfriend",
    text_hide:"ซ่อน",
    text_alwayshide:"ซ่อนเสมอ",
    text_removec:"ยกเลิกการเชื่อมต่อ",
    hasignored:"การร้องขอเป็นเพื่อนที่เคยถูกยกเลิก",
    new_version:"เวอร์ชั่นใหม่",
    notif_version:"มีเวอร์ชั่นใหม่",
    here:"ที่นี่",
    wasunfriend:"เคยอยู่ในรายชื่อเพื่อน",
    settings:"ตั้งค่า",
    proceed:"ดำเนินการ",
    exportData:"ส่งออกที่ตั้งไว้",
    importData:"นำค่าที่ตั้งไว้เข้า",
    text_export:"ส่งออก",
    text_import:"นำเข้า",
    dataToExport:"ข้อมูลที่ส่งออก",
    back1:"รายชื่อ Unfriends เป็นรายชื่อที่แสดงในเครื่องคุณเท่านั้น นั่นก็หมายความว่า ถ้าคุณใช้ Facebook บนเครื่องคอมพิวเตอร์ที่อื่น หรือ Firefox อื่นๆ คุณจะไม่สามารถเข้าถึงรายชื่อ Unfriends ได้",
    back2:"ใช้เครื่องมือสำรองข้อมูลเพื่อนำรายชื่อเข้ามาใช้หรือส่งออกรายชื่อไปใช้กับเบราวเซอร์อื่นๆ",
    hideOwnUnfriends:"ซ่อนเพื่อนที่คุณลบ",
    wontAppear:"โปรไฟล์นี้ไม่ปรากฎใน Unfriends ลิสต์",
    today:"วันนี้",
    yesterday:"เมื่อวาน",
    months:"มกราคม, กุมภาพันธ์, มีนาคม, เมษายน, พฤษภาคม, มิถุนายน ,กรกฎาคม ,สิงหาคม,กันยายน ,ตุลาคม ,พฤศจิกายน ,ธันวาคม",
    hide_perm:"คุณต้องการซ่อน {name} อย่างถาวรหรือไม่?",
    header_unfriends:"เพื่อนที่ถูกลบ",
    header_reappeared:"ปรากฎตัวอีกครั้ง",
    header_ignored:"การร้องขอถูกปฎิเสธ",
    header_accepted:"อนุญาตการร้องขอแล้ว",
    header_both:"ร้องขอรายชื่อที่ตอบรับและปฎิเสธ",
    header_pending:"กำลังรอการร้องขอ",
    resettitle:"เรียกคืนค่าเริ่มต้น",
    rvoid:"โปรดระมัดระวัง การรีเซ็ตสคริปต์ จะทำลายข้อมูลที่เกี่ยวกับเพื่อนที่ยกเลิกของคุณทั้งหมด"
};
$vi_VN = {
    langname:"Tiếng Việt",
    unfriends:"Không phải bạn",
    awaiting:"Đang chờ chấp nhận",
    notifications:"Thông báo",
    messages:"Tin nhắn",
    becomeFan:"Thích",
    isFan:"Bạn là người hâm mộ",
    joinGroup:"Tham gia nhóm",
    cancel:"Hủy bỏ",
    change:"Thay đổi",
    manage:"Quản lý",
    reset:"Thiết lập lại",
    hide:"ẩn",
    behavior:"giao diện",
    lang:"Ngôn ngữ",
    reset_:"Cài đặt lại từ đầu",
    help:"Giúp đỡ",
    btn_ok:"Okay",
    btn_cancel:"Hủy bỏ",
    btn_close:"Đóng",
    btn_save:"Lưu",
    btn_submit:"Duyệt",
    btn_confirm:"Xác nhận",
    btn_delete:"Xóa",
    btn_next:"Kế tiếp",
    usesetting:"Sủ dụng chức năng này để quản lý cách thức hoạt động của ứng dụng",
    deactivated:"Profile ẩn",
    reactivated:"Profile đã được kích hoạt lại",
    confirmed:"Yêu cầu kết bạn được chấp nhận",
    declined:"Yêu cầu kết bạn bị từ chối",
    onunfriend:"Khi bạn bị ai đó xóa khỏi danh sách bạn bè",
    oncanceled:"Khi bạn hủy bỏ yêu cầu kết bạn",
    othersettings:"Các cài đặt khác",
    icons:"Hiện biểu tượng",
    uids:"Hiện số ID của profile",
    profilepics:"cập nhật hình ảnh cá nhân ",
    hidemenubar:"Ẩn liên kết đến ứng dụng trên trình đơn",
    dissociateLists:"Chia chấp nhận và bỏ qua yêu cầu",
    showTime:"hiện ngày kiểm tra không phải bạn bè",
    disabled:"vô hiệu hóa",
    ok:"Đồng ý",
    error:"Lỗi",
    unblock:"Bỏ khóa",
    block:"Khóa",
    clang:"Chọn ngôn ngữ",
    currentlang:"Ngôn ngữ hiện tại",
    creset:"Chọn thiết lập lại",
    resetbody:"Bạn có chắc chắn muốn thiết lập lại giá trị?",
    selectall:"Chọn tất cả",
    selectnone:"Không chọn",
    use:"Sử dụng",
    display:"Hiện thị",
    text_ignored:"bỏ qua yêu cầu kết bạn",
    text_unfriend:"không còn trong danh sách bạn bè của bạn",
    text_reactivated:"hồ sơ kích hoạt lại",
    text_deactivated:"hồ sơ bỏ hoặc ẩn",
    text_being:"Hồ sơ được tắt",
    text_unavailable:"Hồ Sơ Không có sẵn",
    text_accepted:"Yêu cầu làm bạn chấp nhận",
    text_canceled:"Yêu cầu huỷ làm bạn",
    text_pending:"Yêu cầu làm bạn đang chờ",
    nomessages:"Không có tin nhắn",
    text_noa:"không có yêu cầu kết bạn",
    text_nou:"Không Unfriends",
    text_error:"Lỗi trong khi gỡ bỏ kết nối",
    text_hideu:"Ẩn Unfriend",
    text_hide:"ẩn",
    text_alwayshide:"luôn ẩn",
    text_removec:"loại bỏ kết nối",
    hasignored:"bỏ qua một trong những yêu cầu kết bạn",
    new_version:"Phiên bản mới",
    notif_version:"hiện có phiên bản mới",
    here:"tại đây",
    wasunfriend:"trong danh sách bạn bè",
    settings:"Tùy chỉnh",
    proceed:"tiến hành",
    exportData:"Xuất dữ liệu",
    importData:"Nhập dữ liệu",
    text_export:"xuất",
    text_import:"Nhập",
    dataToExport:"Dữ liệu xuất",
    back1:"Danh sách bạn bè được lưu trên máy tính, Nếu bạn sử dụng facebook trên một máy tính khác, hoặc một phiên khác của firefox, bạn sẽ không tại dược danh sách bạn bè đã xóa bạn.",
    back2:"Sử dụng công cụ lưu trữ này để xuất hoặc nhập danh sách từ máy tính khác hoặc trình duyệt firefox khác.",
    hideOwnUnfriends:"Ẩn bạn bè mà bạn loại bỏ",
    wontAppear:"hồ sơ này không hiển thị trong danh sách unfriends ",
    today:"Hôm nay",
    yesterday:"Hôm qua",
    months:"Tháng 1, Tháng 2, Tháng 3, Tháng 4, Tháng 5, Tháng 6, Tháng 7, Tháng 8, Tháng 9, Tháng 10, Tháng 11, Tháng 12",
    hide_perm:"Bạn có muốn ẩn vĩnh viễn {tên}?",
    header_unfriends:"Không phải bạn bè",
    header_reappeared:"Xuất hiện trở lại",
    header_ignored:"yêu cầu bị bỏ qua",
    header_accepted:"Yêu cầu kết bạn được chấp nhận",
    header_both:"Yêu cầu kết bạn được hấp nhận và bị từ chối",
    header_pending:"Yêu cầu kết bạn đang chờ",
    resettitle:"thiết lập giá trị mặc định",
    rvoid:"Đặt lệnh phá hủy tất cả dữ liệu của bạn về unfriends của bạn. Hãy cẩn thận."
};
$az_AZ = {
    langname:"Azərbaycan dili",
    unfriends:"Silənlər",
    awaiting:"Gözləyən İstəklər",
    notifications:"Bildirişlər",
    messages:"İsmarışlar",
    becomeFan:"Azarkeş ol",
    isFan:"Azarkeşsiz",
    joinGroup:"Qrupa qoşul",
    cancel:"Ləğv et",
    change:"dəyişdir",
    manage:"idarə et",
    reset:"sıfırla",
    hide:"gizlət",
    behavior:"Görünüş",
    lang:"Dil",
    reset_:"Sıfırla",
    help:"Kömək",
    btn_ok:"Yaxşı",
    btn_cancel:"Ləğv et",
    btn_close:"Bağla",
    btn_save:"Qeyd et",
    btn_submit:"Göndər",
    btn_confirm:"Təsdiqlə",
    btn_delete:"Sil",
    btn_next:"İrəli",
    usesetting:"Seçimləri və nizamları dəyişmək",
    deactivated:"Dondurulmuş profillər",
    reactivated:"Yenidən aktivləşən profillər",
    confirmed:"Təsdiqlənən istəklər",
    declined:"Rədd edilən istəklər",
    onunfriend:"Dostluqdan çıxarıldıqda",
    oncanceled:"Dostluq istəyi rədd edildiyində",
    othersettings:"Digər nizamlar",
    icons:"İşarələri göstər",
    uids:"UIDləri göstər",
    profilepics:"Profil şəkillərini yenilə",
    hidemenubar:"Menyu panelindəki Silənləri gizlət",
    dissociateLists:"Siyahıları ayırın",
    showTime:"Yoxlama tarixlərini göstər",
    disabled:"ləğv edildi",
    ok:"Yaxşı",
    error:"Səhv",
    unblock:"Qadağanı Yığışdır",
    block:"Qadağan et",
    clang:"Dilinizi seçin:",
    currentlang:"Hazırkı dil",
    creset:"Sıfırlamaq üçün basın",
    resetbody:"Seçimləri və nizamları sıfırlamaq istədiyinizdən əminsinizmi?",
    selectall:"Hamısını seç",
    selectnone:"Heç birini seçmə",
    use:"İstifadə et",
    display:"Göstər",
    text_ignored:"dostluq istəyinizi rədd etdi.",
    text_unfriend:"artıq dost siyahınızda deyil.",
    text_reactivated:"Profil yenidən aktivləşdirildi.",
    text_deactivated:"Profil silindi ya da donduruldu",
    text_being:"Profil bağlanılacaq",
    text_unavailable:"Profil İstifadə edilə bilmir",
    text_accepted:"Dostluq İstəyi Qəbul edildi",
    text_canceled:"Dostluq İstəyi Ləğv edildi",
    text_pending:"Dostluq İstəyi Gözləmədə",
    nomessages:"İsmarış yoxdur",
    text_noa:"Gözləyən istək yoxdur",
    text_nou:"Dostluğu silən yoxdur",
    text_error:"Bağlantını silərkən səhv yarandı.",
    text_hideu:"Silənləri Gizlət",
    text_hide:"Gizlət",
    text_alwayshide:"Həmişə Gizlət",
    text_removec:"Bağlantını sil",
    hasignored:"bir dostluq istəyinizi rədd etdi.",
    new_version:"Yeni versiya",
    notif_version:"Yeni bir versiya istifadə edilə bilər vəziyyətdədir",
    here:"burada",
    wasunfriend:"dost siyahınızda idi.",
    settings:"Nizamlar",
    proceed:"Təsdiqlə",
    exportData:"Məlumatı ixrac et",
    importData:"Məlumatı idxal et",
    text_export:"İxrac et",
    text_import:"İdxal et",
    dataToExport:"İxrac ediləcək məlumat",
    back1:"Facebooku başqa bir kompüterdə və ya başqa bir veb səyyahı istifadə etsəniz, Unfriends  məlumatlarını alamaya bilərsiniz.",
    back2:"Bu geri yükləmə vasitəsini ehtiyat almaq/yükləmək və ya başqa brauzerə yükləmək üçün istifadə edə bilərsiniz.",
    hideOwnUnfriends:"Sildiyiniz dostları gizlədin",
    wontAppear:"Bu profil silənlər siyahınızda olmayacaq.",
    today:"Bu gün",
    yesterday:"Dünən",
    months:"Yanvar, Fevral, Mart, Aprel, May, İyun, İyul, Avqust, Sentyabr, Oktyabr, Noyabr, Dekabr",
    hide_perm:"{name} qalıcı olaraq gizləmək istədiyinizdən əminsinizmi?",
    header_unfriends:"Silənlər",
    header_reappeared:"Yenidən aktivləşən",
    header_ignored:"Rədd Edilən İstəklər",
    header_accepted:"Qəbul Edilən İstəklər",
    header_both:"Qəbul edilən və Rədd Edilən İstəklər",
    header_pending:"Gözləyən İstəklər",
    resettitle:"Dəyərləri əvvəlki vəziyyətinə gətir",
    rvoid:"Tətbiqi bərpa etmək bütün məlumatları yox edəcək. Diqqətli olun."
};
$eo_EO = {
    langname:"Esperanto",
    unfriends:"Eksamikoj",
    awaiting:"Pritraktataj Petoj",
    notifications:"Sciigoj",
    messages:"Mesaĝoj",
    becomeFan:"Iĝi ŝatanto",
    isFan:"Vi estas ŝatanto",
    joinGroup:"Aliĝi grupon",
    cancel:"Nuligi",
    change:"ŝanĝi",
    manage:"estri",
    reset:"renuligi",
    hide:"kaŝi",
    behavior:"Agordoj",
    lang:"Lingvo",
    reset_:"Renuligi",
    help:"Helpo",
    btn_ok:"Bone",
    btn_cancel:"Nuligi",
    btn_close:"Fermi",
    btn_save:"Konservi",
    btn_submit:"Sendi",
    btn_confirm:"Konfirmi",
    btn_delete:"Forigi",
    btn_next:"Sekva",
    usesetting:"Agordi.",
    deactivated:"Profiloj malŝaltitaj",
    reactivated:"Profiloj reŝaltitaj",
    confirmed:"Petoj konfirmitaj",
    declined:"Petoj malkonfirmitaj",
    onunfriend:"Kiam iu eksamikiĝos min aŭ malŝaltos sian profilon",
    oncanceled:"Kiam amikiĝpeto estos nuligita",
    othersettings:"Aliaj agordoj",
    icons:"Montri bildetojn",
    uids:"Montri uzantonumerojn",
    profilepics:"Ĝisdatigi profilbildojn",
    hidemenubar:"Kaŝi eksamikojn el ilaro",
    dissociateLists:"Dividi akceptitajn kaj ignoritajn petojn",
    showTime:"Montri daton kaj tempon de eksamikoj",
    disabled:"malŝaltita",
    ok:"Bone",
    error:"Eraro",
    unblock:"Malbari",
    block:"Bari",
    clang:"Elekti lingvon:",
    currentlang:"Aktuala lingvo",
    creset:"Renuligi elektitajn informerojn",
    resetbody:"Averto: renuligi la valorojn de la skripto forigos ĉiujn agordojn kaj kreitajn informerojn. Ĉu vi volas daŭrigi?",
    selectall:"Elekti ĉion",
    selectnone:"Elekti neniun",
    use:"Uzi",
    display:"Montri",
    text_ignored:"ignoris vian amikiĝpeton.",
    text_unfriend:"ne plu estas en via amiklisto.",
    text_reactivated:"Profilo reŝaltita",
    text_deactivated:"Profilo malŝaltita",
    text_being:"Profilo malŝaltanta",
    text_unavailable:"Profilo nedisponebla",
    text_accepted:"akceptis vian amikiĝpeton",
    text_canceled:"malakceptis vian amikiĝpeton",
    text_pending:"Amikiĝpeto pritraktata",
    nomessages:"Neniu mesaĝo",
    text_noa:"Neniu pritraktata peto",
    text_nou:"Neniu eksamiko",
    text_error:"Eraro dum forigi konekton.",
    text_hideu:"Kaŝi eksamikojn",
    text_hide:"Kaŝi",
    text_alwayshide:"Ĉiam kaŝi",
    text_removec:"Forigi konekton",
    hasignored:"ignoris unu el viaj amikiĝpetoj.",
    new_version:"Nova versio",
    notif_version:"Nova versio disponeblas",
    here:"ĉi tie",
    wasunfriend:"estis en via amiklisto.",
    settings:"Agordoj",
    proceed:"Daŭrigi",
    exportData:"Elporti informerojn",
    importData:"Enporti informerojn",
    text_export:"Elporti",
    text_import:"Enporti",
    dataToExport:"Informeroj por elporti",
    back1:"La eksamiga listo estas loke kreita. Tio volas diri, ke se oni vizitas al Facebook de alia komputilo, aŭ alia seanco, do la eksamikoj ne estos disponeblaj.",
    back2:"Uzu tiun sekurkopian ilon por enporti viajn agordojn kaj informerojn kreitajn de eksamikoj al alia komputilo aŭ foliumilo.",
    hideOwnUnfriends:"Kaŝi amikojn, kiujn vi forigos",
    wontAppear:"Tiu profilo ne aperos en vian eksamikan liston.",
    today:"Hodiaŭ",
    yesterday:"Hieraŭ",
    months:"Januaro, Februaro, Marto, Aprilo, Majo, Junio, Julio, Aŭgusto, Septembro, Oktobro, Novembro, Decembro",
    hide_perm:"Ĉu vi volas ĉiam kaŝi je {name}?",
    header_unfriends:"Eksamikoj",
    header_reappeared:"Reaperis",
    header_ignored:"Petoj ignoritaj",
    header_accepted:"Petoj akceptitaj",
    header_both:"Petoj akceptitaj kaj ignoritaj",
    header_pending:"Petoj pritraktataj",
    resettitle:"Renuligi valorojn kaj agordojn al aŭtomate elektitajn.",
    rvoid:"Marku la butonojn de la agordojn, kiujn vi volas renuligi. Kiel antaŭzorgo, oni devas sekurkopii la agordojn kaj informerojn kreitajn uzante la malsupran elportilon."
};
$gl_ES = {
    langname:"Galego",
    unfriends:"Non amigos",
    awaiting:"Peticións pendentes",
    notifications:"Avisos",
    messages:"Mensaxes",
    becomeFan:"Facerse seareiro",
    isFan:"Eres un seareiro",
    joinGroup:"Unirse ao grupo",
    cancel:"Cancelar",
    change:"cambiar",
    manage:"xestionar",
    reset:"reiniciar",
    hide:"agochar",
    behavior:"Aparencia",
    lang:"Lingua",
    reset_:"Reiniciar",
    help:"Axuda",
    btn_ok:"Aceptar",
    btn_cancel:"Cancelar",
    btn_close:"Pechar",
    btn_save:"Gardar",
    btn_submit:"Enviar",
    btn_confirm:"Confirmar",
    btn_delete:"Eliminar",
    btn_next:"Seguinte",
    usesetting:"Estas configuracións configuran o comportamento do script",
    deactivated:"Perfís desactivados",
    reactivated:"Perfís reactivados",
    confirmed:"Peticións confirmadas",
    declined:"Peticións rechazadas",
    onunfriend:"Cando deixen de ser amigos teu",
    oncanceled:"Cando se cancele unha petición de amizade",
    othersettings:"Outras configuracións",
    icons:"Mostrar iconas",
    uids:"Mostar identificadores de usuario",
    profilepics:"Actualizar imaxes de perfil",
    hidemenubar:"Agochar Non Amigos da barra de menú",
    dissociateLists:"Separar as peticións ignoradas e as aceptadas",
    showTime:"Mostar a data de comprobación de non amizade",
    disabled:"desactivado",
    ok:"Aceptar",
    error:"Erro",
    unblock:"Desbloquear",
    block:"Bloquear",
    clang:"Escolla a súa lingua",
    currentlang:"Lingua actual",
    creset:"Prema para reiniciar.",
    resetbody:"Seguro que quere reiniciar os valores?",
    selectall:"Escoller todo",
    selectnone:"Non escoller ningún",
    use:"Usar",
    display:"Mostrar",
    text_ignored:"ignorou a túa petición de amizade.",
    text_unfriend:"xa non está na túa lista de amigos.",
    text_reactivated:"Perfil desactivado.",
    text_deactivated:"Perfil desactivado ou agochado",
    text_being:"Perfil desactivado",
    text_unavailable:"Perfil non dispoñíbel",
    text_accepted:"Petición de amizade aceptada",
    text_canceled:"Petición de amizade cancelada",
    text_pending:"Petición de amizade pendente",
    nomessages:"Sen mensaxes",
    text_noa:"Sen ningunha petición pendente",
    text_nou:"Sen non amigos",
    text_error:"Erro ao eliminar a conexión.",
    text_hideu:"Agochar desamizade",
    text_hide:"Agochar",
    text_alwayshide:"Mostar sempre",
    text_removec:"Eliminar a conexión",
    hasignored:"igonorou unha das túas peticións de amizade.",
    new_version:"Nova versión",
    notif_version:"Está dispoñible unha nova versión",
    here:"aquí",
    wasunfriend:"estaba na túa lista de amigos.",
    settings:"Configuracións",
    proceed:"Proceder",
    exportData:"Exportar datos",
    importData:"Importar datos",
    text_export:"Exportar",
    text_import:"Importar",
    dataToExport:"Datos a exportar",
    back1:"A lista de non amigos é local co cal se usa facebook noutro computador ou noutra sesión non vai poder ver as súas desamizades.",
    back2:"Empregue esta ferramenta de copia para exportar e importar a súa lista dende ou a outro navegador.",
    hideOwnUnfriends:"Agochar os amigos que eliminaches",
    wontAppear:"Este perfil non aparecerá na súa lista de desamizades.",
    today:"Hoxe",
    yesterday:"Onte",
    months:"Xaneiro, Febreiro, Marzo, Abril, Maio, Xuño, Xullo, Agosto, Septembro, Outubro, Novembro, Decembro",
    hide_perm:"Quere agochar para sempre a {name}?",
    header_unfriends:"Non amigos",
    header_reappeared:"Reaparecidos",
    header_ignored:"Peticións ignoradas",
    header_accepted:"Peticións aceptadas",
    header_both:"Peticións aceptadas e ignoradas",
    header_pending:"Peticións pendentes",
    resettitle:"Reiniciar aos valores por defecto",
    rvoid:"Reiniciar o script destrúe toda a súa información sobre dos seus non amigos. Estás advertido."
};
$is_IS = {
    langname:"Íslenska",
    unfriends:"Unfriends",
    awaiting:"Beiðnar í biðstöðu",
    notifications:"Tilkynningar",
    messages:"Skilaboð",
    becomeFan:"Vertu aðdáandi",
    isFan:"Þú ert aðdáandi",
    joinGroup:"Taka þátt í hópi",
    cancel:"Hætta við",
    change:"breyta",
    manage:"stjórna",
    reset:"endurstilla",
    hide:"fela",
    behavior:"Útlit",
    lang:"Tungumál",
    reset_:"Endurstilla",
    help:"Hjálp",
    btn_ok:" Í lagi ",
    btn_cancel:"Hætta við",
    btn_close:"Loka",
    btn_save:"Vista",
    btn_submit:"Senda",
    btn_confirm:"Staðfesta",
    btn_delete:"Eyða",
    btn_next:"Áfram",
    usesetting:"Notaðu þessar stillingar til að stýra hegðun handrits",
    deactivated:"Snið aftengt",
    reactivated:"Snið endurvirkt",
    confirmed:"Beiðnar staðfestar",
    declined:"Beiðnar hafnaðar",
    onunfriend:"Þegar þú fékkst höfnun",
    oncanceled:"Þegar vina beiðni var afturkölluð",
    othersettings:"Aðrar stillingar",
    icons:"Sýna tákn",
    uids:"Sýna UID kóða",
    profilepics:"Uppfæra prófíl myndir",
    hidemenubar:"Fela Unfriends í valmynd (í notendastillingar)",
    dissociateLists:"Skipta samþykktum og hunsuðum beiðnum",
    showTime:"Sýna Unfriends skoðunar dagsetningar",
    disabled:"óvirkt",
    ok:"Í lagi",
    error:"Villa",
    unblock:"Fjarlægja Útilokun",
    block:"Útiloka",
    clang:"Veldu þitt tungumál",
    currentlang:"Tungumál í notkun",
    creset:"Smelltu til að endurstilla",
    resetbody:"Ertu viss um að þú viljir endurstilla gildin ?",
    selectall:"Velja allt",
    selectnone:"Velja ekkert",
    use:"Nota",
    display:"Sýna",
    text_ignored:"hunsaði vinabeiðni þína",
    text_unfriend:"er ekki lengur á þínum vinalista",
    text_reactivated:"Profíll endurvirktur",
    text_deactivated:"Profíll eytt eða er falin",
    text_being:"Profíll aftengist",
    text_unavailable:"Profíll er Ótiltækur",
    text_accepted:"Vinabeiðni Samþykkt",
    text_canceled:"Vinabeiðni Hafnað",
    text_pending:"Vinabeiðni í bið eftir staðfestingu",
    nomessages:"Engin Skilaboð",
    text_noa:"Engar beiðnir í bið",
    text_nou:"Engir Unfriends",
    text_error:"Villa við að fjarlægja tengsl",
    text_hideu:"Fela Unfriend",
    text_hide:"Fela",
    text_alwayshide:"Fela alltaf",
    text_removec:"Fjarlægja Tengsl",
    hasignored:"hunsaði eina af vinabeiðnum þínum.",
    new_version:"Ný Útgáfa",
    notif_version:"Ný útgáfa er í boði",
    here:"hérna",
    wasunfriend:"var á vinalistanum þínum",
    settings:"Stillingar",
    proceed:"Halda áfram",
    exportData:"Flytja gögn út",
    importData:"Flytja gögn inn",
    text_export:"Flytja út",
    text_import:"Flytja inn",
    dataToExport:"Gögn til útflutnings",
    back1:"Unfriends listinn er staðbundinn. Það þýðir að ef þú notar facebook í annari tölvu , eða sem annar notandi, munt þú ekki geta séð unfriend listann þinn.",
    back2:"Notið þetta öryggisafritunar tól til að færa listann þinn yfir eða frá öðrum tölvum.",
    hideOwnUnfriends:"Fela vini sem þú fjarlægðir",
    wontAppear:"Þessi profíll mun ekki birtast í unfriends listanum ",
    today:"Í dag",
    yesterday:"Í gær",
    months:"Janúar, Febrúar, Mars, Apríl, Maí, Júní, Júlí, Ágúst, September, Október, Nóvember, Desember",
    hide_perm:"Langar þig til að fela {name} varanlega ?",
    header_unfriends:"Unfriends",
    header_reappeared:"Endurbirting",
    header_ignored:"Umsóknir hunsaðar",
    header_accepted:"Umsóknir samþykktar",
    header_both:"Umsóknir Samþykktar og Hunsaðar",
    header_pending:"Umsóknir í Biðstöðu",
    resettitle:"Endurstilla gildi á sjálfgefnar stillingar",
    rvoid:"Endurstilling á forskrift eyðir öllum gögnum um vini þína. Verið varkár."
};
$ku_TR = {
    langname:"Kurdî",
    unfriends:"Neheval",
    awaiting:"Daxwaza li bendê",
    notifications:"Hişyarî",
    messages:"Peyam",
    becomeFan:"Bibe Heyranek",
    isFan:"Tu heyran î",
    joinGroup:"Bibe endamê komê",
    cancel:"Betal",
    change:"biguhere",
    manage:"rêvebirin",
    reset:"jê bibê",
    hide:"veşêre",
    behavior:"Xuyanî",
    lang:"Ziman",
    reset_:"Jê bibê",
    help:"Alîkarî",
    btn_ok:"Belê",
    btn_cancel:"Betal",
    btn_close:"Bigire",
    btn_save:"Tomarke",
    btn_submit:"Bişîne",
    btn_confirm:"Pîştrast bîke",
    btn_delete:"Jê bîbe",
    btn_next:"Ya pêş",
    usesetting:"Ji bo tevgerên skrîptan van mîhengan bi kar bîne",
    deactivated:"Profîl niha ne çalak in",
    reactivated:"Profîl niha çalak in",
    confirmed:"Daxwaz hatin piştrastkirin",
    declined:"Daxwaz hatin redkirin",
    onunfriend:"Dema kesekî/ê tu avêtî",
    oncanceled:"Dema daxwazeke hevaltiyê were betalkirin",
    othersettings:"Mîhengên din",
    icons:"Îkonan nîşande",
    uids:"UIDsan nîşande",
    profilepics:"Wêneyên profîlê rojane bike",
    hidemenubar:"Di darika menûyê de nehevalan veşêre",
    dissociateLists:"daxwazên pejirandî û redkirî veqetîne",
    showTime:"Dîroka venihêrtina nehevalan nîşande",
    disabled:"hat neçalakkirin",
    ok:"Erê",
    error:"Çewtî",
    unblock:"Astengê rake",
    block:"Asteng",
    clang:"zimanê xwwe hilbijêre",
    currentlang:"Zimanê heyî",
    creset:"Ji bo kirina wekî berê bitikîne",
    resetbody:"Ji dil dixwazî nirxan bikî weke berê?",
    selectall:"Hemûyan hilbijêre",
    selectnone:"Tu tişt hilnebijêre",
    use:"Bi kar bîne",
    display:"Nîşande",
    text_ignored:"daxwaza te ya hevaltiyê red kir",
    text_unfriend:"êdî ne di lîsteya te ya hevalan de ye",
    text_reactivated:"Profîl hat çalakkirin",
    text_deactivated:"Profîl hat jêbirin an jî veşartin",
    text_being:"Profîl tê neçalakkirin",
    text_unavailable:"Profîl ne amade ye",
    text_accepted:"Daxwaza hevaltiyê hat pejirandin",
    text_canceled:"Daxwaza hevaltiyê hat betalkirin",
    text_pending:"Daxwaza hevaltiyê li bendê ye",
    nomessages:"Peyam tune",
    text_noa:"Daxwaza li bendê tune",
    text_nou:"Tu neheval tune",
    text_error:"Di rakirina girêdanê de çewtî",
    text_hideu:"Nehevalan veşêre",
    text_hide:"Veşêre",
    text_alwayshide:"Hertim veşêre",
    text_removec:"Girêdanê rake",
    hasignored:"yek ji daxwazên te yê hevaltiyê red kir.",
    new_version:"Guhertoya nû",
    notif_version:"Guhertoyeke nû amadeye",
    here:"li vir",
    wasunfriend:"di lîsteya te ya hevalan de bû.",
    settings:"Mîheng",
    proceed:"Bidomîne",
    exportData:"Dane derxistin",
    importData:"Dane têxistin",
    text_export:"Derxistin",
    text_import:"Têxistin",
    dataToExport:"Dane derxistin",
    back1:"Lîsteya nehevalan heremî ye. Ev tê wê wateyê ku ger tu facebookê li ser kompîtureke din bi kar bînî, an jî di danişîneke din de, tu wê nekarî lîsteya xwe ya nehevalan bistînî.",
    back2:"ji bo ku lîsteya xwe ya heval ji gerokeke din derxî an jî rêxî vê amûra yêdekstandinê bi kar bîne.",
    hideOwnUnfriends:"Hvalên te rakirine veşêre",
    wontAppear:"Ev profîl wê di lîsteya te ya nehevalan de nexuye.",
    today:"Îro",
    yesterday:"Doh",
    months:"Rêbendan, Reşemî, Adar, Avrêl, Gulan, Pûşper, Tîrmeh, Gelawêj, Rezber, Kewçêr, Sermawez, Berfanbar",
    hide_perm:"Dixwazî {name} ji binî ve veşêrî?",
    header_unfriends:"Neheval",
    header_reappeared:"Dîsa xuyabû",
    header_ignored:"Daxwaz hat redkirin",
    header_accepted:"Daxwaz hat pejirandin",
    header_both:"Daxwaz hat pejirandin ",
    header_pending:"Daxwaz li bendê ye",
    resettitle:"Hemû nirxan bike weke destpêkê",
    rvoid:"Kirina weke berê ya skrîptan, hemû daneyên derheqê nehavalên te de wenda dike. Hişyar be."
};
$lv_LV = {
    langname:"Latviešu",
    unfriends:"Unfriends",
    awaiting:"Uzaicinājumi",
    notifications:"Paziņojumi",
    messages:"Vēstules",
    becomeFan:"Kļūt par sekotāju",
    isFan:"Tu esi sekotājs",
    joinGroup:"Pievienoties grupai",
    cancel:"Atcelt",
    change:"Mainīt",
    manage:"Pārvaldīt",
    reset:"atstatīt",
    hide:"paslēpt",
    behavior:"Uzstādījumi",
    lang:"Valoda",
    reset_:"Atstatīt",
    help:"Palīdzība",
    btn_ok:"Labi",
    btn_cancel:"Atcelt",
    btn_close:"Aizvērt",
    btn_save:"Saglabāt",
    btn_submit:"Nosūtīt",
    btn_confirm:"Apstiprināt",
    btn_delete:"Dzēst",
    btn_next:"Tālāk",
    usesetting:"Mainīt iestatījumus",
    deactivated:"Deaktivizētie profili",
    reactivated:"Aktīvie profili",
    confirmed:"Apstiprinātie uzaicinājumi",
    declined:"Noraidītie uzaicinājumi",
    onunfriend:"Kāds pārtrauca draudzību vai deaktivizēja viņa profilu",
    oncanceled:"Draudzības aicinājums atcelts",
    othersettings:"Citi uzstādījumi",
    icons:"Attēlot ikonas",
    uids:"Attēlot identikātorus",
    profilepics:"Augšupielādēt profila attēlus",
    hidemenubar:"Paslēpt Unfriends no izvēlnes",
    dissociateLists:"Atšķirt apstiprinātos un ignorētos uzaicinājumus",
    showTime:"Rādīt laiku un datumu, kad pārtraukta draudzība",
    disabled:"Atspējots",
    ok:"Ok",
    error:"Kļūda",
    unblock:"Atbloķēt",
    block:"Bloķēt",
    clang:"Izvēlies valodu",
    currentlang:"Pašreizējā valoda",
    creset:"Atstatīt izvēlētos datus",
    resetbody:"Uzmanību: mainot skripta vērtības, uzstādījumi un saglabātie dati tiks nodzēsti. Vai esi drošs, ka vēlies turpināt?",
    selectall:"Izvēlēt visu",
    selectnone:"Neko neizvēlēties",
    use:"Pielietot",
    display:"Attēlot",
    text_ignored:"noraidīja Tavu uzaicinājumu",
    text_unfriend:"Persona vairs nav tavā draugu sarakstā",
    text_reactivated:"Profils aktivizēts",
    text_deactivated:"Profils deaktivizēts",
    text_being:"Profils tiek deaktivizēts",
    text_unavailable:"Profils nav pieejams",
    text_accepted:"apstiprinājis tavu uzaicinājumu",
    text_canceled:"atcēlis tavu uzaicinājumu",
    text_pending:"Visi uzaicinājumi",
    nomessages:"Vēstuļu nav",
    text_noa:"Uzaicinājumu nav",
    text_nou:"Nav pārtrauktu draudzību",
    text_error:"Kļūda atceļot savienojumi",
    text_hideu:"Paslēpt pārtraukto draudzību",
    text_hide:"Paslēpt",
    text_alwayshide:"Vienmēr paslēpt",
    text_removec:"Atcelt savienojumu",
    hasignored:"Viens no uzaicinājumiem norqidīts",
    new_version:"Jauna versija",
    notif_version:"Pieejama jauna versija",
    here:"Te",
    wasunfriend:"bija draugu sarakstā",
    settings:"Uzstādījumi",
    proceed:"Turpināt",
    exportData:"Eksportēt datus",
    importData:"Importēt datus",
    text_export:"Exportēt",
    text_import:"Importēt",
    dataToExport:"Dati, ko exportēt",
    back1:"Pārtraukto draudzību saraksts ir lokāli ģenerēts. Tas nozīmē, ka ja lietosi facebook no cita datora vai citas sesijas, Unfriends skriptam piekļūt nevarēsi.",
    back2:"Lieto šo rezerves kopiju veidošanas rīku, lai importētu uzstādījumus un ģenerētos datus citā datorā vai pārlūkā.",
    hideOwnUnfriends:"Paslēpt tevis pārtrauktās draudzības",
    wontAppear:"Šis profils nav iekļauts pārtraukto draudzību sarakstā.",
    today:"Šodien",
    yesterday:"Vakar",
    months:"Janvāris, Februāris, Marts, Aprīlis, Maijs, Jūnijs, Augusts, Septembris, Oktobris, Novembris, Decembris",
    hide_perm:"Vai neatgriezeniski vēlies paslēpt {name} ?",
    header_unfriends:"Pārtrauktās draudzības",
    header_reappeared:"Atkal iekļautie",
    header_ignored:"Ignorētie uzaicinājumi",
    header_accepted:"Apstiprinātie uzaicinājumi",
    header_both:"Ignorētie un apstiprinātie uzaicinājumi",
    header_pending:"Izsūtītie uzaicinājumi",
    resettitle:"Atstatīt uzstādījumus un vērtības uz noklusētajām.",
    rvoid:"Izvēlies ailes, ko vēlies atstatīt uz noklusētajām. Piesardzībai ir vēlams izveidot datu rezerves kopiju, izmantojot zemāk esošo eksportēšanas rīku."
};
$ka_GE = {
    langname:"ქართული",
    unfriends:"ნამეგობრალები",
    awaiting:"მომლოდინე მოთხოვნები",
    notifications:"მინიშნებები",
    messages:"შეტყობინებები",
    becomeFan:"გახდი გულშემატკივარი",
    isFan:"შენ ხარ გულშემატკივარი",
    joinGroup:"ჯგუფში გაწევრიანება",
    cancel:"გაუქმება",
    change:"შეცვლა",
    manage:"მართვა",
    reset:"ჩამოყრა",
    hide:"დამალვა",
    behavior:"იერსახე",
    lang:"ენა",
    reset_:"ჩამოყრა",
    help:"დახმარება",
    btn_ok:"კარგი",
    btn_cancel:"გაუქმება",
    btn_close:"დახურვა",
    btn_save:"შენახვა",
    btn_submit:"გადაგზავნა",
    btn_confirm:"დადასტურება",
    btn_delete:"წაშლა",
    btn_next:"შემდეგი",
    usesetting:"გამოიყენე ეს პარამეტრები სკრიპტის მოქმედების კონტროლისთვის",
    deactivated:"გაუქმებული პროფილები",
    reactivated:"რეაქტივირებული პროფილები",
    confirmed:"მოთხოვნები დაკმაყოფილდა",
    declined:"მოთხოვნები უარყოფილია",
    onunfriend:"როცა უარს მიიღებ მეგობრობაზე",
    oncanceled:"როცა მეგობრობის თხოვნა გაუქმებულია",
    othersettings:"სხვა პარამეტრები",
    icons:"აჩვენე ნიშნაკები",
    uids:"აჩვენე UID-ები",
    profilepics:"განაახლე პროფილის სურათი",
    hidemenubar:"დაიმალოს მეგობრებიდან წაშლა მენიუბარში",
    dissociateLists:"დაყავი მიღებული და იგნორირებული მოთხოვნები",
    showTime:"აჩვენე მეგობრობის გაუქმების თარიღები",
    disabled:"დროებით გაუქმებულია",
    ok:"კარგი",
    error:"შეცდომა",
    unblock:"ბლოკის მოხსნა",
    block:"დაბლოკვა",
    clang:"აირჩიეთ თქვენი ენა :",
    currentlang:"მიმდინარე ენა",
    creset:"დააწკაპუნეთ რათა ჩამოყაროთ",
    resetbody:"დარწმუნებული ხართ რომ გსურთ საწყისი მონაცემების აღდგენა?",
    selectall:"ყველას მონიშვნა",
    selectnone:"მონიშვნის გაუქმება",
    use:"გამოყენება",
    display:"დისპლეი / გამოჩენა",
    text_ignored:"დააიგნორა თქვენი მეგობრობის მოთხოვნა.",
    text_unfriend:"აღარ არის თქვენს მეგობართა სიაში.",
    text_reactivated:"პროფილი გააქტიურებულია",
    text_deactivated:"პროფილი წაშლილი ან დამალულია",
    text_being:"პროფილი დეაქტივირებულია",
    text_unavailable:"პროფილი მიუწვდომელია",
    text_accepted:"დაეთანხმა მეგობრობის მოთხოვნას",
    text_canceled:"დაიგნორებული მოთხოვნა",
    text_pending:"მომლოდინე მოთხოვნა",
    nomessages:"შეტყობინებები არ არის",
    text_noa:"მომლოდინე მოთხოვნები არ არის",
    text_nou:"არავის წაუშლიხარ",
    text_error:"კავშირის წაშლისას დაფიქსირდა შეცდომა.",
    text_hideu:"კარგად მყოფის დამალვა",
    text_hide:"დამალვა",
    text_alwayshide:"ყოველთვის დამალვა",
    text_removec:"კავშირის წაშლა",
    hasignored:"დააიგნორა თქვენი ერთ-ერთი მოსაწვევი.",
    new_version:"ახალი ვერსია",
    notif_version:"ხელმისაწვდომია ახალი ვერსია ",
    here:"აქ",
    wasunfriend:"იყო შენს მეგობართა სიაში.",
    settings:"პარამეტრები",
    proceed:"გაგრძელება",
    exportData:"მონაცემების გატანა",
    importData:"მონაცემების შემოტანა",
    text_export:"გატანა",
    text_import:"შემოტანა",
    dataToExport:"მონაცემები ექსპორტისთვის",
    back1:"მეგობრობის გაუქმებათა სია არის ლოკალური. ეს ნიშნავს, რომ თუ გამოიყენებთ ფეისბუქს სხვა კომპიუტერზე, მეგობრობის გაუქმებების ნახვას ვერ შეძლებთ.",
    back2:"გამოიყენე ეს ბექაფ ინსტრუმენტი, რათა მოახდინოთ სხვა ბრაუზერებიდან სიათა იმპორტ-ექსპორტი",
    hideOwnUnfriends:"დამალე მეგობრები, რომელთაც წაშლით",
    wontAppear:"ეს პროფილი არ გამოჩნდება თქვენს კარგად მყოფთა სიაში.",
    today:"დღეს",
    yesterday:"გუშინ",
    months:"იანვარი, თებერვალი, მარტი, აპრილი, მაისი, ივნისი, ივლისი, აგვისტო, სექტემბერი, ოქტომბერი, ნოემბერი, დეკემბერი",
    hide_perm:"გინდათ დამალოთ {სახელი} სამუდამოდ?",
    header_unfriends:"სულ კარგად ვრძანდებოდეთო",
    header_reappeared:"თავიდან აღმოჩენილი",
    header_ignored:"იგნორირებული მოთხოვნები",
    header_accepted:"დადასტურებული მოთხოვნები",
    header_both:"მიღებული დააინგორირებული მოთხოვნები",
    header_pending:"მომლოდინე მოთხოვნები",
    resettitle:"დააყენე თავდაპირველი მონაცემები ",
    rvoid:"ფრთხილად! სკრიპტის საწყისი პარამეტრების აღდგენა გააქრობს მეგობრობის გაუქმების ყველა ინფორმაციას."
};
$mk_MK = {
    langname:"Македонски",
    unfriends:"Екс-пријатели",
    awaiting:"Чекам потврда",
    notifications:"Известувања",
    messages:"Пораки",
    becomeFan:"Стани обожавател/ка",
    isFan:"Ти си обожавател",
    joinGroup:"Придружи се",
    cancel:"Откажи",
    change:"промена",
    manage:"управува",
    reset:"ресетирај",
    hide:"сокриј",
    behavior:"Изглед",
    lang:"Јазик",
    reset_:"Ресетирај",
    help:"Помош",
    btn_ok:"Во ред",
    btn_cancel:"Откажи",
    btn_close:"Затвори",
    btn_save:"Зачувај",
    btn_submit:"Одобри",
    btn_confirm:"Потврди",
    btn_delete:"Избриши",
    btn_next:"Следно",
    usesetting:"Користи ги овие подесувања за управување со скриптата",
    deactivated:"Деактивирани профили",
    reactivated:"Реактивирани профили",
    confirmed:"Потврдени понуди",
    declined:"Одбиени понуди",
    onunfriend:"Кога ќе постанеш екс-Пријатели",
    oncanceled:"Кога понудата за пријателство е одбиена",
    othersettings:"Останати подесувања",
    icons:"Прикажи икони",
    uids:"Прикажи UIDs",
    profilepics:"Промена на основна слика",
    hidemenubar:"Сокриј го екс-Пријатели во Менито",
    dissociateLists:"Раздели ги Прифатените и Одбиените понуди",
    showTime:"Прикажи ги датумите на проверка на екс-Пријатели",
    disabled:"Оневозможено",
    ok:"Во ред",
    error:"Грешка",
    unblock:"Тргни блок",
    block:"Блокирај",
    clang:"Одберете јазик:",
    currentlang:"Актуелен Јазик",
    creset:"Кликнете за ресетирање",
    resetbody:"Дали сте сигурни за ресетирање на вредностите ?",
    selectall:"Избери Сите",
    selectnone:"Избери Ниту една",
    use:"Употреби",
    display:"Прикажи",
    text_ignored:"го одби вашето барање за пријателство.",
    text_unfriend:"не е повеќе во вашата листа на пријатели.",
    text_reactivated:"Профилот е повторно активен",
    text_deactivated:"Профилот е Избришан или Сокриен",
    text_being:"Профилот е Деактивиран",
    text_unavailable:"Профилот е недостапен",
    text_accepted:"Прифатени барања за пријателство",
    text_canceled:"Одбиени барања за пријателство",
    text_pending:"Барање за пријателство во очекување",
    nomessages:"Нема Пораки",
    text_noa:"Нема барања за одобрување",
    text_nou:"Нема екс-Пријатели",
    text_error:"Грешка при отсрранување на конекција",
    text_hideu:"Сокриј екс-Пријатели",
    text_hide:"Сокриј",
    text_alwayshide:"Секогаш сокриено",
    text_removec:"Отстрани конекција",
    hasignored:"одбил/а едно од вашите понуди за пријателство",
    new_version:"Нова верзија",
    notif_version:"Достапна е нова верзија",
    here:"тука",
    wasunfriend:"беше во вашата листа со пријатели.",
    settings:"Подесувања",
    proceed:"Продолжи",
    exportData:"Извоз на податоци",
    importData:"Увоз на податоци",
    text_export:"Извези",
    text_import:"Увози",
    dataToExport:"Податоци за извоз",
    back1:"екс-Пријатели листата е на локално ниво. Тоа значи дека ако користите Фејсбук на друг компјутер, или на друг Firefox, вие не ќе можете да ги видите вашите екс-Пријатели.",
    back2:"Искористи го овај алат за создавање сигурносна копија со која ке можете да увезите или извезите листа на екс-Пријатели на или од друг FireFox пребарувач.",
    hideOwnUnfriends:"Сокриј ги пријателите кои си ги отстранил/а",
    wontAppear:"Овај профил нема да биди прикажан на листата на твои екс-Пријатели.",
    today:"Денес",
    yesterday:"Вчера",
    months:"Јануари, Фебруари, Март, Април, Мај, Јуни, Јули, Август, Септември, Октомври, Декември",
    hide_perm:"Дали сакате трајно да го/ја сокриеш {name} ?",
    header_unfriends:"екс-Пријатели",
    header_reappeared:"Пофторно се појави",
    header_ignored:"Одбиени барања",
    header_accepted:"Прифатени барања",
    header_both:"Прифатени и Одбиени барања",
    header_pending:"Барање во очекување",
    resettitle:"Ресетирање на вредности на основно",
    rvoid:"Ресетирањето на скриптата ги уништова сите податоци за вашите екс-Пријатели. Бидете внимателни."
};
$uk_UA = {
    langname:"Українська",
    unfriends:"Недрузі",
    awaiting:"Запити, що очікують",
    notifications:"Повідомлення",
    messages:"Повідомлення",
    becomeFan:"Стати фаном",
    isFan:"Ви - фан",
    joinGroup:"Приєднатися до групи",
    cancel:"Скасувати",
    change:"змінити",
    manage:"керувати",
    reset:"скинути",
    hide:"сховати",
    behavior:"Зовнішній вигляд",
    lang:"Мова",
    reset_:"Скинути",
    help:"Довідка",
    btn_ok:"Добре",
    btn_cancel:"Скасувати",
    btn_close:"Закрити",
    btn_save:"Зберегти",
    btn_submit:"Відправити",
    btn_confirm:"Підтвердити",
    btn_delete:"Видалити",
    btn_next:"Наступне",
    usesetting:"Налаштування для зміни поведінки скрипту",
    deactivated:"Деактивовані профілі",
    reactivated:"Реактивовані профілі",
    confirmed:"Підтверджені запити",
    declined:"Відмовлені запити",
    onunfriend:"Якщо з'являється новий Недруг",
    oncanceled:"Якщо запит дружби відхилено",
    othersettings:"Інші налаштування",
    icons:"Показувати іконки",
    uids:"Показувати UID",
    profilepics:"Оновлювати зображення профілю",
    hidemenubar:"Сховати Недрузів в рядку меню",
    dissociateLists:"Розділити прийняті та ігноровані запити",
    showTime:"Show Unfriends check dates",
    disabled:"інвалід",
    ok:"Ok",
    error:"Error",
    unblock:"Unblock",
    block:"Block",
    clang:"Виберіть мову:",
    currentlang:"Поточна мова",
    creset:"Натисніть, щоб скинути",
    resetbody:"Ви дійсно хочете скинути усі налашутвання?",
    selectall:"Вибрати все",
    selectnone:"Виберіть Ні",
    use:"Використовувати",
    display:"Відображати",
    text_ignored:"проігнорував твій запит дружби.",
    text_unfriend:"більше не в твоєму списку дружби.",
    text_reactivated:"Профіль відновлена",
    text_deactivated:"Профіль Видалені або Схована",
    text_being:"Будучи профіль деактивовані",
    text_unavailable:"Профіль недоступний",
    text_accepted:"Прийнято пропозицію дружби",
    text_canceled:"Друг Запит відмінено",
    text_pending:"Запит До другу",
    nomessages:"Немає повідомлень",
    text_noa:"Жодного запити, що очікується",
    text_nou:"Жодного Недруга",
    text_error:"Помилка при видаленні зв\'язку.",
    text_hideu:"Сховати Недрузів",
    text_hide:"Сховати",
    text_alwayshide:"Завжди приховувати",
    text_removec:"Прибрати зв'язок",
    hasignored:"проігнорував один з вашого запиту про дружбу",
    new_version:"Нова версія",
    notif_version:"Доступна нова версія",
    here:"тут",
    wasunfriend:"був в твоєму списку друзів.",
    settings:"Налаштування",
    proceed:"Порушувати процес",
    exportData:"Експортувати дані",
    importData:"Імпортувати дані",
    text_export:"Експорт",
    text_import:"Імпорт",
    dataToExport:"Дані для експорту",
    back1:"Список недрузів локальний. Мається на увазі, що якщо Ви будете користуватись Facebook'ом з іншого комп'ютеру або в іншій сесії Firefox'у, Ви не зможете керувати недрузями.",
    back2:"Використовуйте цей інструмент для експорту чи імпорту списків до/з іншого Firefox'у.",
    hideOwnUnfriends:"Сховати друзів, яких Ви видалили",
    wontAppear:"Цей профіль не буде з\'являтися в списку Недрузі.",
    today:"Сьогодні",
    yesterday:"Вчора",
    months:"Січень, Лютий, Березень, Квітень, Травень, Червень, Липень, Серпень, Вересень, Жовтень, Листопад, Грудень",
    hide_perm:"Ви хочете, щоб приховати постійно {name}?",
    header_unfriends:"Недрузі",
    header_reappeared:"З\'явився",
    header_ignored:"Ігноровані запити",
    header_accepted:"Прийняті запити",
    header_both:"Прийняті та ігноровані запити",
    header_pending:"Запити, що очікують",
    resettitle:"Повернутись до первинних налаштувань",
    rvoid:"Скидання значень знищує всі дані про ваших Недрузі. Будьте обережні."
};
$hy_AM = {
    langname:"Հայերեն",
    unfriends:"Չընկերներ",
    awaiting:"Ակնկալվող հարցումները",
    notifications:"Ծանուցումներ",
    messages:"Նամակներ",
    becomeFan:"Երկրպագել",
    isFan:"Դուք արդեն երկրպագու եք",
    joinGroup:"Միանալ խմբին",
    cancel:"Մերժել",
    change:"Փոխել",
    manage:"կարագավորել",
    reset:"զրոյացնել",
    hide:"թաքցնել",
    behavior:"Տեսք",
    lang:"Լեզու",
    reset_:"Զրոյացնել",
    help:"Օգնություն",
    btn_ok:"Լավ",
    btn_cancel:"Չեղարկել",
    btn_close:"Փակել",
    btn_save:"Պահպանել",
    btn_submit:"Ուղարկել",
    btn_confirm:"Հաստատել",
    btn_delete:"Ջնջել",
    btn_next:"Հերթական",
    usesetting:"Կարգավորումներ սկրիպտի վարքը ղեկավարելու համար",
    deactivated:"Պրոֆիլը ապաակտիվացված է",
    reactivated:"Պրոֆիլը վերաակտիվացված է",
    confirmed:"Ընդունված հարցումներ",
    declined:"Մերժված հարցումներ",
    onunfriend:"Երբ Դուք ունենում եք Չընկեր",
    oncanceled:"Երբ ընկերացման հարցումն ընդհատվում է",
    othersettings:"Այլ կարգավորումներ",
    icons:"Ցույց տալ պատկերանիշերը",
    uids:"Ցույց տալ UID-ները",
    profilepics:"Թարմացնել պրոֆիլի նկարները",
    hidemenubar:"Թաքցնել Չընկերները մենյուից",
    dissociateLists:"Տարանջատել Ընդունված և Մերժված հայտերը",
    showTime:"Ցույց տալ Չընկերների ցուցակի վերջին թարմացման ժամանակը",
    disabled:"կասեցված է",
    ok:"Հաստատել",
    error:"Սխալ",
    unblock:"Ապաարգելել",
    block:"Արգելել",
    clang:"Ընտրեք Ձեր լեզուն:",
    currentlang:"Ընթացիկ լեզուն",
    creset:"Զրոյացնե՞լ",
    resetbody:"Համոզված ե՞ք, որ ուզում եք զրոյացնել",
    selectall:"Բոլորը",
    selectnone:"Ոչինչ",
    use:"Օգտագործել",
    display:"Ցուցադրել",
    text_ignored:"մերժել է Ձեր ընկերանալու խնդրանքը",
    text_unfriend:"այլևս Ձեր ընկերների ցուցակում չէ",
    text_reactivated:"Պրոֆիլը վերականգնվել է",
    text_deactivated:"Պրոֆիլը ջնջվել է կամ թաքցված է",
    text_being:"Պրոֆիլը ապաակատիվացվել է",
    text_unavailable:"Պրոֆիլն անհասանելի է",
    text_accepted:"Ընկերացման հայցն ընդունված է",
    text_canceled:"Ընկերացման հայցը մերժված է",
    text_pending:"Ընկերացման հայցը սպասման վիճակում է",
    nomessages:"Նամակներ չկան",
    text_noa:"Ակնկալվող հարցումներ չկան",
    text_nou:"Չընկերներ չկան",
    text_error:"Սխալ, կապի խզման ընթացքում",
    text_hideu:"Թաքցնել Չընկերները",
    text_hide:"Թաքցնել",
    text_alwayshide:"հավերժ թաքցնել",
    text_removec:"Կապը խզել",
    hasignored:"մերժել է Ձեր ընկերանալու հայցերից մեկը",
    new_version:"Նոր տարբերակ",
    notif_version:"Առկա է սկրիպտի նոր տարբերակը",
    here:"այստեղ",
    wasunfriend:"եղել է Ձեր ընկերների ցուցակում",
    settings:"կարգավորումներ",
    proceed:"Գործել",
    exportData:"Արտահանել տվյալները",
    importData:"Ներմուծել տվյալները",
    text_export:"Արտահանել",
    text_import:"Ներմուծել",
    dataToExport:"Արտահանվող տվյալները",
    back1:"Չընկերների ցուցակը տեղային է: Դա նշանակում է, որ եթե Դուք օգտվեք Facebook-ից այլ համակարգչով կամ Firefox-ի այլ սեսիայում, ապա Դուք չեք տեսնի Ձեր Չընկերներին:",
    back2:"Օգտագործեք այս պահեստավորման գործիքը Չընկերների ցուցակը արտահանելու կամ այլ Firefox ցանցային զննարկիչից ներմուծելու համար:",
    hideOwnUnfriends:"Թաքցնել ընկերներին, որոնց դուք եք հեռացրել",
    wontAppear:"Այս պրոֆիլը այլևս չի երևա Ձեր Չընկերների ցուցակում:",
    today:"Այսօր",
    yesterday:"Երեկ",
    months:"Հունվարի, Փետրվարի, Մարտի, Ապրիլի, Մայիսի, Հունիսի, Հուլիսի, Օգոստոսի, Սեպտեմբերի, Հոկտեմբերի, Նոյեմբերի, Դեկտեմբերի",
    hide_perm:"Թաքցնե՞լ {name}-ին",
    header_unfriends:"Չընկերներ",
    header_reappeared:"Վերականգնված պրոֆիլներ",
    header_ignored:"Մերժված հայցեր",
    header_accepted:"Ընդունված հայցեր",
    header_both:"Մերժված և Ընդունված հայցեր",
    header_pending:"Սպասման վիճակում գտնվող հայցեր",
    resettitle:"Զրոյացնել ըստ նախնական կարգավորումների",
    rvoid:"Ուշադրությու´ն: Սկրիպտի զրոյացման դեպքում բոլոր տվյալները Ձեր Չընկերների մասին կոչնչացվեն:"
};
$fa_IR = {
    langname:"فارسی",
    unfriends:"حذف دوستی",
    awaiting:"درخواست های معلق",
    notifications:"یادآوری ها",
    messages:"پیامها",
    becomeFan:"طرفدار ما شوید",
    isFan:"شما یک طرفدار هستید",
    joinGroup:"به گروه بپیوندید",
    cancel:"لغو",
    change:"تغییر",
    manage:"مدیریت",
    reset:"تنظیم به حالت اولیه",
    hide:"مخفی کردن",
    behavior:"تنظیمات",
    lang:"زبان",
    reset_:"تنظیم به حالت اولیه",
    help:"کمک",
    btn_ok:"باشه",
    btn_cancel:"لغو",
    btn_close:"بستن",
    btn_save:"ذخیره",
    btn_submit:"ارائه",
    btn_confirm:"تایید",
    btn_delete:"حذف",
    btn_next:"بعدی",
    usesetting:"از این تنظیمات برای مدیریت رفتار اسکریپت استفاده کنید",
    deactivated:"نمایه غیرفعال شده",
    reactivated:"نمایه بازگشوده شده ",
    confirmed:"در خواست تایید شد",
    declined:"درخواست رد شده",
    onunfriend:"زمانی که کسی مرا از لیست دوستانش حذف می کند یا پروفایل خود را غیر فعال می کند",
    oncanceled:"زمانی که یک درخواست دوستی لغو میشود",
    othersettings:"سایر تنظیمات",
    icons:"آیکون های نمایشی",
    uids:"نمایش شماره های کاربری",
    profilepics:"بروز کردن تصویر نمایه",
    hidemenubar:"پنهان کردن لیست دوستان حذف شده",
    dissociateLists:"درخواست های تایید شده و رد شده را از هم جدا کن",
    showTime:" زمان و تاریخ حذف شدن از لیست دوستان را نشان بده",
    disabled:"غیر فعال شده است",
    ok:"باشه",
    error:"خطا",
    unblock:"بازگشایی ",
    block:"مسدود کردن",
    clang:"زبان خود را انتخاب کنید",
    currentlang:"زبان کنونی",
    creset:"گزینه های انتخاب شده را به حالت اولیه برگردان",
    resetbody:"کلیه تنظیمات به حالت اولیه باز خواهند گشت.برا باز گرداندن تنظیمات اطمینان دارید؟",
    selectall:"انتخاب همه",
    selectnone:"انتخاب یکی",
    use:"استفاده کن",
    display:"نمایش",
    text_ignored:"درخواست دوستی شما را رد کرده است",
    text_unfriend:"دیگر در فهرست دوستان شما نیست",
    text_reactivated:"پروفایل باز گشایی شد",
    text_deactivated:"پروفایل حذف یا مخفی شده است",
    text_being:"پروفایل غیر فعال شده است",
    text_unavailable:"پروفایل قابل دسترسی نیست",
    text_accepted:"درخواست دوستی شما را پذیرفته",
    text_canceled:"درخواست دوستی شما را نپذیرفته",
    text_pending:"درخواست دوستی در حالت تعلیق است",
    nomessages:"پیامی وجود ندارد",
    text_noa:"درخواستی در حالت تعلیق وجود ندارد",
    text_nou:"تا کنون کسی شما را حذف نکرده است",
    text_error:"خطا در هنگام حذف ارتباط",
    text_hideu:"دوستان حذف شده را پنهان کن",
    text_hide:"پنهان کن",
    text_alwayshide:"همیشه پنهان کن",
    text_removec:"حذف ارتباط",
    hasignored:"یکی از درخواست دوستی هایتان را نادیده گرفتید",
    new_version:"نسخه ی جدید",
    notif_version:"نسخه ی جدید موجود می باشد",
    here:"اینجا",
    wasunfriend:"در لیست دوستان شما بود",
    settings:"تنظیمات",
    proceed:"ادامه",
    exportData:"استخراج اطلاعات",
    importData:"بارگذاری اطلاعات",
    text_export:"ذخیره اطلاعات",
    text_import:"بارگذاری اطلاعات ذخیره شده",
    dataToExport:"اطلاعات خروجی",
    back1:"این لیست دوستان حذف شده به صورت محلی ساخته شده و یعنی اگر از روی کامپیوتر دیگری از فیسبوک استفاده کنید قادر به دیدن این لیست نیستید",
    back2:" برای انتقال تنظبمات و اطلاعات موجود به یک کامپیوتر یا مرور گر دیگراز این ابزار پشتیبان استفاده کنید",
    hideOwnUnfriends:"دوستانی که شما حذف کرده اید را پنهان کن",
    wontAppear:"این پروفایل در لیست دوستان حذف شده نمایش نخواهد یافت",
    today:"امروز",
    yesterday:"دیروز",
    months:"ژانویه،فوریه،مارس،آوریل،مه،ژوئن،ژوئيه،اوت،سپتامبر،اکتبر،نوامبر،دسامبر",
    hide_perm:"آبا می خواهید {name} را برای همیشه پنهان کنید؟",
    header_unfriends:"حذف دوستی",
    header_reappeared:"دوباره آشکار شده",
    header_ignored:"درخواستهای رد شده",
    header_accepted:"درخواستهای پذیرفته شده",
    header_both:"درخواست های پذیرفته شده و درخواست های رد شده",
    header_pending:"درخواست های در حال تعلیق",
    resettitle:"تنظیمات و مقادیر را به حالت اولیه برگردان",
    rvoid:"گزینه هایی را که می خواهید به حالت اولیه برگردانید تیک بزنید.بهتر است قبل از این کار از کلیه اطلاعات و تنظیمات موجود یک نسخه پشتیبان تهیه کنید"
};
$ne_NP = {
    langname:"नेपाली",
    unfriends:"अमित्रहरु",
    awaiting:"पर्खिएका अनुरोधहरु",
    notifications:"सूचनाहरु",
    messages:"सन्देशहरु",
    becomeFan:"प्रशंसक बन्ने",
    isFan:"तपाईँ प्रशंसक हुनुहुन्छ",
    joinGroup:"समूहमा सामेल हुने",
    cancel:"खारेज",
    change:"फेर्ने",
    manage:"मिलाउने",
    reset:"पूरानो अवस्थामा फर्काउने",
    hide:"लुकाउने",
    behavior:"रोजाईहरु",
    lang:"भाषा",
    reset_:"पूरानो अवस्थामा फर्काउने",
    help:"मद्दत",
    btn_ok:"हुन्छ",
    btn_cancel:"खारेज",
    btn_close:"बन्द",
    btn_save:"बचाईराख्ने",
    btn_submit:"बुझाउने",
    btn_confirm:"स्थायी गर्ने",
    btn_delete:"मेट्ने",
    btn_next:"अर्को",
    usesetting:"रोजाई र सेटिङ्गहरु बदल्ने",
    deactivated:"प्रोफाईल निष्क्रिय पारिएको",
    reactivated:"प्रोफाईल पून: सक्रिय पारिएको",
    confirmed:"अनुरोधहरु सकारिएको",
    declined:"अनुरोधहरु नकारिएको",
    onunfriend:"जब कसैले मलाई मित्रबाट हटाउँछ वा आफ्नो प्रोफाईल निष्क्रिय पार्छ",
    oncanceled:"जब कुनै साथी अनुरोध खारेज गरिन्छ",
    othersettings:"अन्य सेटिङ्गहरु",
    icons:"आईकनहरु देखाउने",
    uids:"यूआईडी देखाउने",
    profilepics:"प्रोफाईल तस्वीरहरु नवीकरण गर्ने",
    hidemenubar:"मेन्युबारको \'अमित्रहरु\'लाई लुकाउने",
    dissociateLists:"विभाजन स्वीकारियो र अनुरोधहरु बेवास्ता गरियो",
    showTime:"अमित्रहरुका मिति र समय देखाउने",
    disabled:"निष्क्रिय",
    ok:"हुन्छ",
    error:"त्रुटि",
    unblock:"खुल्ला गर्ने",
    block:"रोक्ने",
    clang:"आफ्नो भाषा छान्नुहोस्:",
    currentlang:"वर्तमान भाषा",
    creset:"चयन गरिएको डेटा रीसेट गर्ने",
    resetbody:"सावधान: स्क्रिप्टका मूल्यहरु रीसेट गर्नाले सबै रोजाई, सेटिङ्ग र उत्पन्न डेटाहरु हराउनेछन्। के तपाईँ साँच्चै नै अगाडी बढ्न चाहनुहुन्छ?",
    selectall:"सबै छान्ने",
    selectnone:"कुनै नछान्ने",
    use:"प्रयोग",
    display:"देखाउने",
    text_ignored:"तपाईँको साथी अनुरोध बेवास्ता गर्नुभयो।",
    text_unfriend:"तपाईँको साथी-सूचीमा अब हुनुहुन्न।",
    text_reactivated:"प्रोफाईल पून: सक्रिय पारिएको",
    text_deactivated:"प्रोफाईल निष्क्रिय पारिएको",
    text_being:"प्रोफाईल निष्क्रिय पारिँदै",
    text_unavailable:"प्रोफाईल उपलब्ध हुन सकेन",
    text_accepted:"ले तपाईँको साथी अनुरोध स्वीकार्नुभयो",
    text_canceled:"ले तपाईँको साथी अनुरोध नकार्नुभयो",
    text_pending:"साथी अनुरोध पर्खिँदै",
    nomessages:"कुनै सन्देश छैन",
    text_noa:"कुनै साथी अनुरोध बाँकी छैन",
    text_nou:"अमित्रहरु छैनन्",
    text_error:"सम्बन्ध हटाउँदा त्रुटी भयो।",
    text_hideu:"अमित्र लुकाउने",
    text_hide:"लुकाउने",
    text_alwayshide:"सधैं लुकाउने",
    text_removec:"सम्बन्ध हटाउने",
    hasignored:"ले तपाईंको कुनै साथी अनुरोध बेवास्ता गर्नुभयो।",
    new_version:"नयाँ संस्करण",
    notif_version:"नयाँ संस्करण उपलब्ध छ",
    here:"यहाँ",
    wasunfriend:"तपाईँको साथी-सूचीमा हुनुहुन्थ्यो।",
    settings:"सेटिह्गहरु",
    proceed:"अघि बढ्ने",
    exportData:"डेटा निर्यात गर्ने",
    importData:"डेटा आयात गर्ने",
    text_export:"भन्डार",
    text_import:"भन्डारबाट बहाल गर्ने",
    dataToExport:"निर्यात गर्ने डेटा",
    back1:"अमित्र-सूची स्थानीय रुपमा बनाईन्छ। यसको मतलब, तपाईँ अर्को कम्प्यूटरमा वा अर्को सत्रमा फेसबुक चलाउनुहुन्छ भने, तपाईँका अमित्रहरु भेटाउनुहुने छैन।",
    back2:"यो भन्डार-साधन प्रयोग गरेर आफ्ना रोजाई, सेटिङ्ग र बनेका अमित्र विवरणहरु अर्को कम्प्युटर वा ब्राउजरमा निर्यात गर्नुहोस्।",
    hideOwnUnfriends:"तपाईँले ह़टाउने मित्रहरु लुकाउने",
    wontAppear:"यो प्रोफाइल तपाईँको अमित्र-सूचीमा देखिने छैन।",
    today:"आज",
    yesterday:"हिजो",
    months:"जनवरी, फेब्रुवरी, मार्च, अप्रिल, मे, जुन, जुलाई, अगष्ट, सेप्टेम्बर, अक्टोबर, नोभेम्बर, डिसेम्बर",
    hide_perm:"के तपाईँ {name}लाई साँच्चै नै लुकाउन चाहनुहुन्छ?",
    header_unfriends:"अमित्रहरु",
    header_reappeared:"फेरी देखा परेकाहरु",
    header_ignored:"अनुरोधहरु बेवास्ता गरियो",
    header_accepted:"अनुरोधहरु स्वीकारियो",
    header_both:"अनुरोधहरु स्वीकारेर बेवास्ता गरियो",
    header_pending:"अनुरोधहरु पर्खाईँमा",
    resettitle:"विवरण, रोजाईँ र सेटिङ्गहरु पूरानो अवस्थामा फर्काउने।",
    rvoid:"तपाईँलाई पूरानो अवस्थामा फर्काउन मन लागेका बाकसहरुमा ठीक चिन्ह लगाउनुहोस्। सावधानीको रुपमा महत्त्वपूर्ण सुझाव गरिन्छ, तलको निर्यात-साधन प्रयोग गरेर आफ्ना रोजाई, सेटिङ्ग र बनेका विवरणहरु भन्डार गर्नुहोस्।"
};
$ta_IN = {
    langname:"தமிழ்",
    unfriends:"நீக்கப்பட்ட நண்பர்கள்",
    awaiting:"காத்திருக்கும் விண்ணப்பங்கள்",
    notifications:"அறிவிப்புக்கள்",
    messages:"தகவல்கள்",
    becomeFan:"விசிறி ஆகு",
    isFan:"நீங்கள் ஒரு விசிறி",
    joinGroup:"குழுவில் இணை",
    cancel:"தவிர்",
    change:"மாற்று",
    manage:"நிர்வகி",
    reset:"மீளமை",
    hide:"ஒளிந்துகொள் ",
    behavior:"தோற்றம் ",
    lang:"மொழி",
    reset_:"மீளமை",
    help:"உதவி",
    btn_ok:"சரி",
    btn_cancel:"நீக்கு ",
    btn_close:"முடிவு ",
    btn_save:"சேமித்தல்",
    btn_submit:"சமர்ப்பித்திடு",
    btn_confirm:"உறுதிசெய் ",
    btn_delete:"அழிக்க",
    btn_next:"அடுத்து",
    usesetting:"ஆணைத்திரளின் நடத்தையை முகாமை செய்ய இந்த அமைப்புக்களைப் பயன்படுத்தவும்",
    deactivated:"சுயகுறிப்பு ரத்துசெய்",
    reactivated:"சுயகுறிப்பு மீளமை",
    confirmed:"வேண்டுகோள் வெற்றி ",
    declined:"வேண்டுகோள் தோல்வி ",
    onunfriend:"ஒரு நீக்கப்பட்ட நண்பரை நீங்கள் பெறும்போது",
    oncanceled:"ஒரு நண்பர் வேண்டுகோள் நிராகரிக்கப்பட்டால்",
    othersettings:"ஏனைய அமைப்புக்கள்",
    icons:"படவுருக்களைக் காட்டுக",
    uids:"யூஐடிகளைக் காட்டுக",
    profilepics:"சுயவிவரப் படங்களை ஏற்றுக",
    hidemenubar:"பட்டிப்பட்டையில் நீக்கப்பட்ட நண்பர்களை மறைக்க",
    dissociateLists:"ஏற்கப்பட்ட மற்றும் நிராகரிக்கப்பட்ட வேண்டுகோள்களைப் பிரிக்க",
    showTime:"நீக்கப்பட்ட நண்பர்கள் சரிபார்க்கப்பட்ட திகதிகளைக் காட்டுக",
    disabled:"முடக்கப்பட்டது",
    ok:"சரி",
    error:"பிழை",
    unblock:"தடையை நீக்குக",
    block:"தடுக்க",
    clang:"உங்கள் மொழியைத் தெரிக :",
    currentlang:"தற்போதைய மொழி",
    creset:"மீளமைப்பதற்குச் சொடுக்குக",
    resetbody:"நீங்கள் உண்மையாகவே பெறுமதிகளை மீளமைக்கவேண்டுமா ?",
    selectall:"அனைத்தையும் தெரிக",
    selectnone:"எதையும் தெரியவேண்டாம்",
    use:"பயன்படுத்துக",
    display:"காட்டுக",
    text_ignored:"உங்கள் நண்பர் வேண்டுகோளை நிராகரித்தார்.",
    text_unfriend:"உங்கள் நண்பர் பட்டியலில் இல்லை.",
    text_reactivated:"சுயவிவரம் மீளச் செயற்படுத்தப்பட்டது",
    text_deactivated:"சுயவிவரம் அழிக்கப்பட்டது அல்லது மறைக்கப்பட்டது",
    text_being:"சுயவிவரம் நிறுத்தப்படுகிறது",
    text_unavailable:"சுயவிவரம் இல்லை",
    text_accepted:"நண்பர் வேண்டுகோள் ஏற்கப்பட்டது",
    text_canceled:"நண்பர் வேண்டுகோள் நிராகரிக்கப்பட்டது",
    text_pending:"நண்பர் வேண்டுகோள் நிலுவையில்",
    nomessages:"செய்திகள் இல்லை",
    text_noa:"காத்திருக்கும் வேண்டுகோள் இல்லை",
    text_nou:"நீக்கப்பட்ட நண்பர்கள் இல்லை",
    text_error:"தொடர்பை நீக்கும்போது பிழை.",
    text_hideu:"நீக்கப்பட்ட நண்பரை மறைக்க",
    text_hide:"மறைக்க",
    text_alwayshide:"எப்போதும் மறைக்க",
    text_removec:"தொடர்பை நீக்குக",
    hasignored:"உங்கள் நண்பர் வேண்டுகோள்களில் ஒன்றை நிராகரித்தார்.",
    new_version:"புதிய பதிப்பு",
    notif_version:"ஒரு புதிய பதி்ப்பு உண்டு",
    here:"இங்கே",
    wasunfriend:"உங்கள் நண்பர் பட்டியலில்.",
    settings:"அமைப்புகள்",
    proceed:"முன்செல்க",
    exportData:"தரவை ஏற்றுக",
    importData:"தரவை இறக்குக",
    text_export:"ஏற்றுக",
    text_import:"இறக்குக",
    dataToExport:"ஏற்றுவதற்கான தரவு",
    back1:"நீக்கப்பட்ட நண்பர்கள் பட்டியல் சாதாரணம். இன்னொரு கணினியில், அல்லது இன்னொரு அமர்வில், நீங்கள் முகப்புத்தகத்தைப் பயன்படுத்தின் உங்கள் நீக்கப்பட்ட நண்பர்களை நீங்கள் பெறமுடியாது.",
    back2:"உங்கள் பட்டியல்களை இன்னொரு உலவியிலிருந்து அல்லது இன்னொரு உலவிக்கு ஏற்ற அல்லது இறக்க இந்த நகல் கருவியைப் பயன்படுத்தவும்.",
    hideOwnUnfriends:"நீங்கள் நீக்கிய நண்பர்களை மறைக்க",
    wontAppear:"உங்கள் நீக்கப்பட்ட நண்பர்கள் பட்டியலில் இந்தச் சுயவிவரம் காணப்படாது.",
    today:"இன்று",
    yesterday:"நேற்று",
    months:"ஜனவரி, பெப்ரவரி, மார்ச், ஏப்ரல், மே, ஜூன், ஜூலை, ஆகஸ்ட், செப்டெம்பர், அக்டோபர், நவம்பர், டிசம்பர்",
    hide_perm:"{name}ஐ நீங்கள் நிரந்தரமாக மறைக்கவேண்டுமா ?",
    header_unfriends:"நீக்கப்பட்ட நண்பர்கள்",
    header_reappeared:"மீண்டும் தோன்றியவை",
    header_ignored:"நிராகரிக்கப்பட்ட வேண்டுகோள்கள்",
    header_accepted:"ஏற்கப்பட்ட வேண்டுகோள்கள்",
    header_both:"ஏற்கப்பட்ட ",
    header_pending:"நிலுவையிலுள்ள வேண்டுகோள்கள்",
    resettitle:"இயல்புக்குப் பெறுமதிகளை மீளமைக்க",
    rvoid:"ஆணைத்திரளை மீளமைத்தல் உங்கள் நீக்கப்பட்ட நண்பர்கள் பற்றிய உங்கள் அனைத்துத் தரவுகளையும் அழித்துவிடும். கவனமாக இருக்கவும்."
};
$mr_IN = {
    langname:"मराठी",
    unfriends:"अ-मित्र ",
    awaiting:"प्रतिक्षेतील निवेदने",
    notifications:"सूचना ",
    messages:"संदेश",
    becomeFan:"चाहते बना ",
    isFan:"तुम्ही फॅन आहात",
    joinGroup:"मंडळात शामिल व्हा",
    cancel:"रद्द",
    change:"बदला",
    manage:"व्यवस्थापन",
    reset:"पुन:स्थापित करा",
    hide:"लपवा",
    behavior:"अवतार",
    lang:"भाषा",
    reset_:"रिसेट",
    help:"मदत",
    btn_ok:"ठीक",
    btn_cancel:"रद्द",
    btn_close:"बंद",
    btn_save:"सेव करा",
    btn_submit:"जमा",
    btn_confirm:"निश्चित करा",
    btn_delete:"उडवा",
    btn_next:"पुढील",
    usesetting:"स्क्रिप्टच्या वापरासाठी ही सेटिंग वापरा",
    deactivated:"खाते बंद केले आहे",
    reactivated:"खाते चालू केले आहे",
    confirmed:"निमंत्रण पक्कं झालं",
    declined:"निमंत्रण फेटाळल ",
    onunfriend:"जेव्हा तुमचा मित्र दुरावेल",
    oncanceled:"जेव्हा तुमची मैत्रीची विनंती काढून टाकली जाईल",
    othersettings:"इतर सेटींग",
    icons:"अवतार दाखवा",
    uids:"आयडी दाखवा",
    profilepics:"खात्याचा अवतार चित्र बदला",
    hidemenubar:"अ-मित्र लपवा",
    dissociateLists:"मान्य आणि इग्नोर्द निमंत्रण सुट्टे करा",
    showTime:"अ-मित्र झालेल्याची तारीख दाखवा",
    disabled:"बंद",
    ok:"ओके ",
    error:"एरर त्रुटी",
    unblock:"मान्यता द्या",
    block:"अवरोधित",
    clang:"भाषा निवडा",
    currentlang:"चालू भाषा",
    creset:"रिसेट करायला क्लिक करा",
    resetbody:"नक्की सेटिंग रिसेट करायचीये?",
    selectall:"सगळे निवडा",
    selectnone:"निवड नाहीशी करा",
    use:"वापरा",
    display:"दाखवा",
    text_ignored:"यांनी तुमचे निमंत्रण दुर्लक्षित केली आहे.",
    text_unfriend:"हे तुमच्या मित्र यादीत आता नाहीत.",
    text_reactivated:"प्रोफाईल पुन;स्थापित केलेली आहे",
    text_deactivated:"प्रोफाईल उडवली किंवा लपवली आहे",
    text_being:"प्रोफाईल बंद होत आहे",
    text_unavailable:"प्रोफाईल उपलब्ध नाही",
    text_accepted:"मैत्रीची विनंती मान्य केलेली आहे",
    text_canceled:"मैत्रीची विनंती रद्द केली आहे",
    text_pending:"मैत्रीची विनंती प्रतिक्षेत आहे",
    nomessages:"कोणतेही संदेश नाहीत",
    text_noa:"प्रतिक्षेतील निमंत्रण नाहीत",
    text_nou:"अ-मित्र नाहीत",
    text_error:"संबंध तोडताना अडचण आलेली आहे",
    text_hideu:"अ-मित्र लपवा",
    text_hide:"लपवा",
    text_alwayshide:"कायमस्वरूपी लपवा",
    text_removec:"संबंध तोडा",
    hasignored:"यांनी तुमचे मैत्रीची विनंती दुर्लक्षित केली आहे.",
    new_version:"नवीन संस्करण",
    notif_version:"नवीन संस्करण उपलब्ध आहे",
    here:"इथे",
    wasunfriend:"तुमच्या मित्र यादीत होते.",
    settings:"सेटींग्स",
    proceed:"पुढे",
    exportData:"माहिती एक्स्पोर्ट करा",
    importData:"माहिती इम्पोर्ट करा",
    text_export:"एक्स्पोर्ट",
    text_import:"इम्पोर्ट",
    dataToExport:"एक्स्पोर्ट करण्यासाठी माहिती",
    back1:"तुमच्या अ-मित्रांची सगळी माहिती तुमच्या एकाच संगणकावर आहे. तुम्ही ही माहिती दुसऱ्या संगणकावर बघू शकणार नाही. त्यासाठी एक्स्पोर्ट पर्याय निवडा.",
    back2:"ही टूल तुम्ही दुसऱ्या संगणकावर एक्स्पोर्ट किंवा इम्पोर्ट करण्यासाठी वापरू शकता.",
    hideOwnUnfriends:"मी काढलेले मित्र लपवा",
    wontAppear:"हि प्रोफ़ाईल तुमच्या अ-मित्र  यादीत दिसणार नाही.",
    today:"आज",
    yesterday:"काल",
    months:"जानेवारी, फेब्रुवारी, मार्च, एप्रिल, मे, जून, जुलै, ऑगस्ट, सप्टेंबर, ऑक्टोबर, नोव्हेंबर, डिसेंबर",
    hide_perm:"{name} ला कायम स्वरूपी लपवावे ?",
    header_unfriends:"अ-मित्र",
    header_reappeared:"पुनःप्रकट ",
    header_ignored:"दुर्लक्षित केलेले",
    header_accepted:"मान्य केलेले निमंत्रण",
    header_both:"निमंत्रण मान्य केले आणि दुर्लक्षित",
    header_pending:"प्रतिक्षेतील विनंत्या",
    resettitle:"मूलभूत सेटिंगला रिसेट करा",
    rvoid:"स्क्रिप्ट रिसेट केल्यावर तुमच्या अ-मित्रांची माहिती नाहीशी होईल. सावधान!!!"
};


// Classes
var EventMgr = {
    events: {
        mouseout: true,
        mousein: true,
        mousemove: true,
        mouseover: true,
        mousedown: true,
        mouseup: true,
        readystatechange: true,
        load: true,
        change: true,
        click: true,
        keydown: true,
        keyup: true,
        DOMNodeInserted: true,
        DOMAttrModified: true,
        DOMAttrModifiedChrome: true
    },
    addListener: function(el, evt, f) {
        try { if ((el.addEventListener) && (this.events[evt]) && (typeof f == "function")) el.addEventListener(evt, f, false); }
        catch(exception) { return false; }
    },
    removeListener: function(el, evt, f) {
        try { if ((el.addEventListener) && (this.events[evt]) && (typeof f == "function")) el.removeEventListener(evt, f, false); }
        catch (exception) { return false; }
    }
};

var CSS3 = {
    addClass: function(el, newclass) {
        try {
            var c = CSS3.listClass(el), d = c.split(' ');
            var n;
            newclass = newclass.split(' ');
            for (n = 0;n<newclass.length;n++) { if ((newclass[n]) && (d.indexOf(newclass[n]) === -1)) d.push(newclass[n]); }
            return CSS3.setClass(el, d.join(' '));
        }
        catch(exception) { return false; }
    },
    removeClass: function(el, classname) {
        try {
            var c = this.listClass(el), d = c.split(' ');
            var n;
            classname = classname.split(' ');
            for (n = 0;n<classname.length;n++) {
                if ((classname[n]) && (d.indexOf(classname[n]) != -1)) d.splice(d.indexOf(classname[n]), 1);
            }
            return this.setClass(el, d.join(' '));
        }
        catch(exception) { return false; }
    },
    listClass: function(el) {
        try { return el.className; }
        catch(exception) { return false; }
    },
    hasClass: function(el, className) {
        try {
            var c = this.listClass(el), d = c.split(' ');
            for (n = 0;n<d.length;n++) {
                if (d[n] === className) return true; 
            }
            return false;
        }
        catch(exception) { return false; }
    },
    setClass: function(el, newclass) {
        try { 
            el.className = newclass;
            return (el.className == newclass);
        }
        catch(exception) { return false; }
    },
    toggleClass: function(el, className) {
        try { 
            c = this.listClass(el), d = c.split(' ');
            if (d.indexOf(classname[n]) != -1) {
                CSS3.removeClass(el, className);
            }
            else {
                CSS3.addClass(el, className);
            }
        }
        catch(exception) { return false; }
    },
    hide: function(el) {
        try {
            el.style.display = 'none';
            return (el.style.display == 'none');
        }
        catch(exception) { return false; }
    },
    display: function(el, displayMode) {
        try {
            displayModes = {
                'none': false,
                'block': true,
                'compact': true,
                'inline': true,
                'inline-block': true,
                'list-item': true,
                'marker': true,
                'run-in': true,
                'table': true,
                'inline-table': true,
                'table-caption': true,
                'table-cell': true,
                'table-column': true,
                'table-column-group': true,
                'table-header-group': true,
                'table-footer-group': true,
                'table-row': true,
                'table-row-group': true
            };
            if (displayModes[displayMode]) el.style.display = displayMode;
            return (el.style.display == displayMode);
        }
        catch(exception) { return false; }
    },
    hidden: function(el) {
        try { return (el.style.display == 'none'); }
        catch(exception) { return null; }
    },
    getSize: function($el) {
        return {width:$el.offsetWidth, height:$el.offsetHeight}; 
    },
    getElementPosition: function($el) {
        if (!$el) return {left:0, top:0};
        var position = {left:$el.offsetLeft, top:$el.offsetTop}, parentPosition = CSS3.getElementPosition($el.offsetParent), o;
        for (o in parentPosition) {
            if (parentPosition.hasOwnProperty(o)) position[o] += parentPosition[o];
        }
        return position;
    },
    getElementEndPosition: function($el) {
        var position = CSS3.getElementPosition($el), size = CSS3.getSize($el);
        return {left:position.left+size.width, top:position.top+size.height};
    } 
};

var template = {
    help: function() { 
        return '<i class="uiButtonIcon img spritemap_icons_fix " style="background-position: 0pt -1325px; height: 16px; width: 15px ! important;"></i> '+LANG.help+': '+Params._0x4d22;
    },
    BeeperBox: function() {
        return ''+
        '    <div class="UFBeeper_Full">'+
        '        <div class="Beeps"></div>'+
        '    </div>';
    },
    Donate: function() {
        if (/fr_FR/.test(document.body.className)) e = 'fr_FR';
        else e = 'en_US';
        return ''+
        '<div class="uiTextHighlight" id="uf_donation" style="display:block;">'+
        '   <span class="buttonWrap" style="float:right;"><label class="uiCloseButton uiCloseButtonSmall" style="margin-top:-2px;"><input type="submit" title="'+LANG.btn_delete+'" id="reset_donation"></label></span>'+
        (e == 'fr_FR' ? '   Aidez le script en faisant un don au développeur. C\'est sécurisé et facile.<br /><a onclick="window.open(this.href); return false;" href="http://www.unfriendfinder.com/donate">En savoir plus</a>':'Help the script by donating to the developer. It\'s secure and easy.<br /><a onclick="window.open(this.href); return false;"href="http://www.unfriendfinder.com/donate">Learn more</a>')+
        '   <br /><br />'+
        '   <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">'+
        '      <input type="hidden" name="cmd" value="_s-xclick">'+
        '      <input type="hidden" name="hosted_button_id" value="ZGR5QE83DGRK8">'+
        '      <input type="image" src="https://www.paypal.com/'+e+'/FR/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - la solution de paiement en ligne la plus simple et la plus sécurisée !">'+
        '      <img alt="Donate" border="0" src="https://www.paypal.com/'+e+'/i/scr/pixel.gif" width="1" height="1">'+
        '   </form>'+
        '</div>';
    },
    UnfriendLists: function() {
        return ''+
        '<div id="UFLists">'+
        '    <div id="unfriendsError" style="margin-bottom: 10px; display: none;">'+ 
        '        <div style="background: none repeat scroll 0 0 #FFEBE8; border: 1px solid #DD3C10; color: #333333; font-size: 13px; margin-bottom: 10px; padding: 10px; text-align: left;">'+
        '            Your browser may not save data correctly.'+
        '            <br />This may result in disfunctions in the script.'+ 
        '            <br /><br />Click <a href="http://www.unfriendfinder.com/faq/7">here</a> to learn more.'+ 
        '        </div>'+ 
        '    </div>'+ 
        '    <div id="noUnfriends" class="home_no_stories clearfix" style="display:none;">'+
        '        <span class="home_no_stories_icon list_empty" style="height:32px"></span>'+
        '        <div class="home_no_stories_content">'+ 
        '            <strong id="noText">'+LANG.text_nou+'</strong>'+
        '        </div>'+
        '    </div>'+
        '    <div id="noAwaitings" class="home_no_stories clearfix" style="display:none;">'+
        '        <span class="home_no_stories_icon list_empty" style="height:32px"></span>'+
        '        <div class="home_no_stories_content">'+
        '            <strong id="noTextaw">'+LANG.text_noa+'</strong>'+
        '        </div>'+
        '    </div>'+
        '    <div id="loadingLists" style="height:200px; text-align:center; line-height:200px; display:none;"><img src="'+Params.images.bigIndicator+'" /></div>'+
        '    <div id="groupUnfriends" style="display:none;">'+
        '        <div class="uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup"><div class="clearfix uiHeaderTop"><div class="lfloat"><h3 class="uiHeaderTitle"><span id="h3_title_unfriends">'+LANG.header_unfriends+'</span> <a href="#" onclick="return false;" id="h3Unfriends" style="display:none;">[?]</a></h3></div><div class="rfloat"><a href="#" id="hideall">Hide all</a></div></div></div>'+
        '        <ul id="unfriendsContentUL" class="UFlist"></ul>'+
        '        <div id="paging_unfriends">'+
        '            <div class="rfloat">'+
        '                <a id="paging_unfriends_down" class="prev uiButtonDisabled uiButton uiButtonNoText">'+
        '                    <i class="mrs customimg img paging_arrows page_down"></i>'+
        '                    <span class="uiButtonText"></span>'+
        '                </a>'+
        '                <a id="paging_unfriends_up" class="next uiButtonDisabled uiButton uiButtonNoText">'+
        '                    <i class="mrs customimg img paging_arrows page_up"></i>'+
        '                    <span class="uiButtonText"></span>'+
        '                </a>'+
        '            </div>'+
        '        </div>'+ 
        '    </div>'+
        '    <div id="groupReappeared" style="display:none;">'+
        '        <div class="uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup"><div class="clearfix uiHeaderTop"><div class="lfloat"><h3 class="uiHeaderTitle"><span id="h3_title_reappeared">'+LANG.header_reappeared+'</span> <a href="#" onlick="return false;" id="helpreappeared">[?]</a></h3></div><div class="rfloat"><a href="#" id="hideallreappeared">Hide all</a></div></div></div>'+
        '        <ul id="reappearedContentUL" class="UFlist"></ul>'+
        '        <div id="paging_reappeared" style="padding:10px 4px 20px 0px;">'+
        '            <div class="rfloat">'+
        '                <a id="paging_reappeared_down" class="prev uiButtonDisabled uiButton uiButtonNoText">'+
        '                    <i class="mrs customimg img paging_arrows page_down"></i>'+
        '                    <span class="uiButtonText"></span>'+
        '                </a>'+
        '                <a id="paging_reappeared_up" class="next uiButton uiButtonDisabled uiButtonNoText">'+
        '                    <i class="mrs customimg img paging_arrows page_up"></i>'+
        '                    <span class="uiButtonText"></span>'+
        '                </a>'+
        '            </div>'+
        '        </div>'+ 
        '    </div>'+
        '    <div id="groupPending" style="display:none;">'+
        '        <div class="uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup"><div class="clearfix uiHeaderTop"><div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.header_pending+'</h3></div><div class="rfloat"><a href="#" id="cancelall">Cancel all</a><img src="'+Params.images.smallIndicator+'" style="display:none;" id="cancelallindicator" /></div></div></div>'+
        '        <ul id="pendingContentUL" class="UFlist"></ul>'+ 
        '    </div>'+
        '    <div id="groupAcceptedIgnored" style="display:none;">'+
        '        <div class="uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup"><div class="clearfix uiHeaderTop"><div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.header_both+'</h3></div><div class="rfloat"><a href="#" id="hideallboth">Hide all</a></div></div></div>'+ 
        '        <ul id="acceptedignoredContentUL" class="UFlist"></ul>'+ 
        '    </div>'+
        '    <div id="groupIgnored" style="display:none;">'+
        '        <div class="uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup"><div class="clearfix uiHeaderTop"><div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.header_ignored+'</h3></div><div class="rfloat"><a href="#" id="hideallignored">Hide all</a></div></div></div>'+ 
        '        <ul id="ignoredContentUL" class="UFlist"></ul>'+ 
        '    </div>'+
        '    <div id="groupAccepted" style="display:none;">'+
        '        <div class="uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup"><div class="clearfix uiHeaderTop"><div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.header_accepted+'</h3></div><div class="rfloat"><a href="#" id="hideallaccepted">Hide all</a></div></div></div>'+ 
        '        <ul id="acceptedContentUL" class="UFlist"></ul>'+ 
        '    </div>'+
        '</div>'+
        '<div id="UFMessages" style="display:none;" class="ThreadList">'+
        '    <div id="UFMessages_list">'+
        '        <div id="loadingLists" style="height:200px; text-align:center; line-height:200px; display:block;"><img src="'+Params.images.bigIndicator+'" /></div>'+
        '    </div>'+
        '    <div id="UFMessages_content" class="message_pane">'+
        '    </div>'+
        '</div>'+
        '<div id="UFSettings" style="display:none;" class="editaccount">'+ 
        '    <div class="closed" id="settingsBehavior">'+
        '        <div class="uiHeader uiHeaderBottomBorder uiHeaderGroup">'+
        '            <div class="clearfix uiHeaderTop">'+
        '                <div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.behavior+'</h3></div>'+
        '                <div class="rfloat"><h5 style="position:relative; top:3px;"><a onclick="div = this.parentNode.parentNode.parentNode.parentNode.parentNode; div.className = (div.className == \'visible\'?\'closed\':\'visible\');"><span class="changeLink">'+LANG.change+'</span><span class="hideLink">'+LANG.hide+'</span></a></h5></div>'+
        '            </div>'+
        '        </div>'+
        '        <div class="desc">'+ 
        '            <div class="lfloat">'+LANG.usesetting+'</div>' + 
        '        </div>'+ 
        '        <div class="hiddenContent">'+
        '            <table cellspacing="0" style="margin-top:7px; margin-left:30px; width:460px;">' +
        '                <tbody>' +
        '                    <tr>' +
        '                         <th class="no_border"></th>' + 
        '                         <th class="even_column no_border">'+LANG.display+'</th>' +
        '                    </tr>' +
        '                    <tr>' +
        '                          <th class="iconPlace">' +
        '                              <strong style="position:relative;">' + LANG.unfriends +
        '                                  <span style="background-position:-16px 0; ' +
        '                                      background-repeat:no-repeat; ' +
        '                                      display:block; height:20px; left:-22px; ' +
        '                                      position:absolute; top:-1px; width:20px; height:16px !important;' +
        '                                      background-image:url(' + Params.icons.unfriends + ');" />' +
        '                              </strong>' +
        '                          </th>' +
        '                          <th class="even_column logo">' +
        '                              <img src="'+Params.images.blank+'" style="background-position:0 -798px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" alt="Display"/>' +
        '                          </th>' +
        '                    </tr>' +
        '                    <tr class="settings row">' +
        '                          <td class="action_text">' + LANG.deactivated + '</td>' +
        '                          <td class="even_column">' +
        '                              <input type="checkbox" value="display_deactivated_profiles_disabled" disabled-="disabled" name="Params.settings.deactivated" title="'+LANG.deactivated+'" id="deactivated"' + (Params.settings.deactivated == 1 ? ' checked="checked"' : '') + '" class="inputcheckbox "/>' +
        '                          </td>' +
        '                    </tr>' +
        '                    <tr class="settings row">' +
        '                          <td class="action_text">' + LANG.reactivated + '</td>' +
        '                          <td class="even_column">' +
        '                              <input type="checkbox" value="display_reappeared_profiles" name="Params.settings.reappeared" title="'+LANG.reactivated+'" id="reappeared"' + (Params.settings.reappeared ? ' checked="checked"' : '') + '" class="inputcheckbox "/>' +
        '                          </td>' +
        '                    </tr>' +
        '                    <tr class="settings row">' +
        '                         <td class="action_text">' + LANG.hideOwnUnfriends + '</td>' +
        '                         <td class="even_column">' +
        '                             <input type="checkbox" value="settings_hideOwnUnfriends" name="Params.settings.hideOwnUnfriends" id="hideOwnUnfriends"' + (Params.settings.hideOwnUnfriends ? ' checked="checked"' : '') + '" title="'+LANG.hideOwnUnfriends+'" class="inputcheckbox "/>' +
        '                         </td>' +
        '                    </tr>' +
        '                 </tbody>' +
        '             </table>' +
        '             <table cellspacing="0" style="margin-top: 10px; margin-left: 30px; width: 460px;">' +
        '                 <tbody>' +
        '                     <tr>' +
        '                         <th id="bindTourSettings" class="no_border"></th>' + 
        '                         <th class="even_column no_border">&nbsp;</th>' +
        '                     </tr>' +
        '                     <tr>' +
        '                         <th class="iconPlace">' +
        '                             <strong style="position:relative;">' + LANG.awaiting +
        '                                 <span style="background-position:-16px 0; ' +
        '                                     background-repeat:no-repeat; ' +
        '                                     display:block; height:20px; left:-22px; ' +
        '                                     position:absolute; top:-1px; width:20px; height:16px !important;' +
        '                                     background-image:url(' + Params.icons.awaitings + ');" />' +
        '                             </strong>' +
        '                         </th>' +
        '                         <th class="even_column logo">' +
        '                             <img src="'+Params.images.blank+'" style="background-position:0 -798px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" alt="Display"/>' +
        '                         </th>' +
        '                     </tr>' +
        '                     <tr class="settings row">' +
        '                         <td class="action_text">' + LANG.confirmed + '</td>' +
        '                         <td class="even_column">' +
        '                             <input type="checkbox" value="display_confirmed_requests" name="Params.settings.accepted" id="accepted"' + (Params.settings.accepted ? ' checked="checked"' : '') + '" title="'+LANG.confirmed+'" class="inputcheckbox "/>' +
        '                         </td>' +
        '                     </tr>' +
        '                     <tr class="settings row">' +
        '                         <td class="action_text">' + LANG.declined + '</td>' +
        '                         <td class="even_column">' +
        '                             <input type="checkbox" value="display_canceled_requests" name="Params.settings.ignored" id="ignored"' + (Params.settings.ignored ? ' checked="checked"' : '') + '" title="'+LANG.declined+'" class="inputcheckbox "/>' +
        '                         </td>' +
        '                     </tr>' +
        '                     <tr class="settings row">' +
        '                         <td class="action_text">' + LANG.dissociateLists + '</td>' +
        '                         <td class="even_column">' +
        '                             <input type="checkbox" value="settings_dissociateLists" name="Params.settings.dissociateLists" id="dissociateLists"' + (Params.settings.dissociateLists ? ' checked="checked"' : '') + '" title="'+LANG.dissociateLists+'" class="inputcheckbox "/>' +
        '                         </td>' +
        '                     </tr>' +
        '                 </tbody>' +
        '            </table>' +
        '            <table cellspacing="0" style="margin-top: 10px; margin-left: 30px; width: 460px;">' +
        '                <tbody>' +
        '                    <tr>' +
        '                        <th class="no_border"></th>' + 
        '                        <th class="even_column no_border">&nbsp;</th>' +
        '                    </tr>' +
        '                    <tr>' +
        '                        <th class="iconPlace">' +
        '                            <strong style="position:relative;">' + LANG.notifications +
        '                                <span style="background-position:-801px -66px; ' +
        '                                     background-repeat:no-repeat; ' +
        '                                     display:block; height:20px; left:-22px; ' +
        '                                     position:absolute; top:-1px; width:17px; height:17px !important;' +
        '                                     background-image:url(\''+Params.links.rsrc+'/z136G/hash/3ay18ob4.png\');" />' +
        '                            </strong>' +
        '                        </th>' +
        '                        <th class="even_column logo">' +
        '                            <img src="'+Params.images.blank+'" style="background-position:0 -1182px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" alt="Display"/>' +
        '                        </th>' +
        '                    </tr>' +
        '                    <tr class="settings row">' +
        '                        <td class="action_text">' + LANG.onunfriend + '</td>' +
        '                        <td class="even_column">' +
        '                            <input type="checkbox" value="notif_unfriend" name="Params.settings.notifUnfriend" id="notifUnfriend"' + (Params.settings.notifUnfriend ? ' checked="checked"' : '') + '" title="'+LANG.onunfriend+'" class="inputcheckbox "/>' +
        '                        </td>' +
        '                    </tr>' +
        '                    <tr class="settings row">' +
        '                        <td class="action_text">' + LANG.oncanceled + '</td>' +
        '                        <td class="even_column">' +
        '                            <input type="checkbox" value="notif_ignoredrequest" name="Params.settings.notifIgnored" id="notifIgnored"' + (Params.settings.notifIgnored ? ' checked="checked"' : '') + '" title="'+LANG.oncanceled+'" class="inputcheckbox "/>' +
        '                        </td>' +
        '                    </tr>' +
        '                    <tr class="settings row">' +
        '                        <td class="action_text">Only show new Unfriends in counters</td>' +
        '                        <td class="even_column">' +
        '                            <input type="checkbox" value="settings_onlyShowNewUnfriends" name="Params.settings.onlyShowNewUnfriends" id="onlyShowNewUnfriends"' + (Params.settings.onlyShowNewUnfriends ? ' checked="checked"' : '') + '" title="Only show new Unfriends in counters" class="inputcheckbox "/>' +
        '                        </td>' +
        '                    </tr>' +
        '                </tbody>' +
        '            </table>' + 
        '            <table cellspacing="0" style="margin-top: 10px; margin-left: 30px; width: 460px;">' +
        '                <tbody>' +
        '                    <tr>' +
        '                        <th class="no_border"></th>' + 
        '                        <th class="even_column no_border">&nbsp;</th>' +
        '                    </tr>' +
        '                    <tr>' +
        '                        <th class="iconPlace">' +
        '                            <strong style="position:relative;">Paging'+
        '                                <span style="background-repeat:no-repeat; ' +
        '                                     display:block; height:20px; left:-22px; ' +
        '                                     position:absolute; top:-1px; width:17px; height:17px !important;' +
        '                                     background-image:url(\''+Params.links.rsrc+'/zL/r/7jxYm2BD_ax.png\');" />' +
        '                            </strong>' +
        '                        </th>' +
        '                        <th class="even_column logo">' +
        '                            <img src="'+Params.images.blank+'" style="background-position:0 -1182px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" alt="Display"/>' +
        '                        </th>' +
        '                    </tr>' +
        '                    <tr class="settings row">' +
        '                        <td class="action_text">Enable Paging <a href="#" id="paging_help" onclick="return false;">[?]</a></td>' +
        '                        <td class="even_column">' +
        '                            <input type="checkbox" id="paging"' + (Params.settings.paging > 0 ? ' checked="checked"' : '') + '" title="Enable paging" class="inputcheckbox "/>' +
        '                        </td>' +
        '                    </tr>' +
        '                    <tr class="settings row" id="trPagingCount" style="display:'+(Params.settings.paging == 0?'none':'table-row')+';">' +
        '                        <td class="action_text">Number of profiles displayed per pages</td>' +
        '                        <td class="even_column">' +
        '                            <select id="pagingCount" style="font-size: 10px; margin-left: 23px; border: medium none; background: none repeat scroll 0% 0% rgb(248, 248, 248); outline: medium none;">' +
        '                                <option value="10"'+(Params.settings.paging == 10?' selected="selected"':'')+'>10</option>' +
        '                                <option value="20"'+(Params.settings.paging == 20?' selected="selected"':'')+'>20</option>' +
        '                                <option value="30"'+(Params.settings.paging == 30?' selected="selected"':'')+'>30</option>' +
        '                                <option value="40"'+(Params.settings.paging == 40?' selected="selected"':'')+'>40</option>' +
        '                                <option value="50"'+(Params.settings.paging == 50?' selected="selected"':'')+'>50</option>' +
        '                                <option value="100"'+(Params.settings.paging == 100?' selected="selected"':'')+'>100</option>' +
        '                                <option value="200"'+(Params.settings.paging == 200?' selected="selected"':'')+'>200</option>' +
        '                            </select>' +
        '                        </td>' +
        '                    </tr>' +
        '                </tbody>' +
        '            </table>' + 
        '            <table cellspacing="0" style="margin-top: 10px; margin-left: 30px; width: 460px;">' +
        '                 <tbody>' +
        '                    <tr>' +
        '                        <th class="no_border"></th>' + 
        '                        <th class="even_column no_border">&nbsp;</th>' +
        '                    </tr>' +
        '                    <tr>' +
        '                        <th class="iconPlace">' +
        '                            <strong style="position:relative;">' + LANG.othersettings +
        '                                <span style="background-position:-606px -66px; ' +
        '                                    background-repeat:no-repeat; ' +
        '                                    display:block; height:20px; left:-22px; ' +
        '                                    position:absolute; top:-1px; width:16px; height:16px !important;' +
        '                                    background-image:url(\''+Params.links.rsrc+'/z136G/hash/3ay18ob4.png\');" />' +
        '                            </strong>' +
        '                        </th>' +
        '                        <th class="even_column logo">' +
        '                            <img src="'+Params.images.blank+'" style="background-position:0 -1182px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" alt="Display"/>' +
        '                        </th>' +
        '                    </tr>' +
        '                    <tr class="settings row">' +
        '                        <td class="action_text">' + LANG.icons + '</td>' +
        '                        <td class="even_column">' +
        '                            <input type="checkbox" value="settings_show_icons" name="Params.settings.icons" id="icons"' + (Params.settings.icons ? ' checked="checked"' : '') + '" title="'+LANG.icons+'" class="inputcheckbox "/>' +
        '                        </td>' +
        '                    </tr>' +
        '                    <tr class="settings row">' +
        '                        <td class="action_text">' + LANG.uids + '</td>' +
        '                        <td class="even_column">' +
        '                            <input type="checkbox" value="settings_show_uid" name="Params.settings.uid" id="uid"' + (Params.settings.uid ? ' checked="checked"' : '') + '" title="'+LANG.uids+'" class="inputcheckbox "/>' +
        '                        </td>' +
        '                    </tr>' +
        '                    <tr class="settings row">' +
        '                        <td class="action_text">' + LANG.profilepics + '</td>' +
        '                        <td class="even_column">' +
        '                            <input type="checkbox" value="settings_update_profile_pic" name="Params.settings.updatePicture" id="updatePicture"' + (Params.settings.updatePicture ? ' checked="checked"' : '') + '" title="'+LANG.profilepics+'" class="inputcheckbox "/>' +
        '                        </td>' +
        '                    </tr>' +
        '                    <tr class="settings row">' +
        '                        <td class="action_text">' + LANG.showTime + '</td>' +
        '                        <td class="even_column">' +
        '                            <input type="checkbox" value="settings_showTime" name="Params.settings.showTime" id="showTime"' + (Params.settings.showTime ? ' checked="checked"' : '') + '" title="'+LANG.showTime+'" class="inputcheckbox "/>' +
        '                        </td>' +
        '                    </tr>' +
        '                    <tr class="settings row">' +
        '                        <td class="action_text">' + LANG.hidemenubar + '</td>' +
        '                        <td class="even_column">' +
        '                            <input type="checkbox" value="settings_show_unfriend_link" name="Params.settings.hideInMenubar" id="hideInMenubar"' + (Params.settings.hideInMenubar ? ' checked="checked"' : '') + '" title="'+LANG.hidemenubar+'" class="inputcheckbox "/>' +
        '                        </td>' +
        '                    </tr>' +
        '                    <tr class="settings row">' +
        '                        <td class="action_text">Hide the bottom-right button</td>' +
        '                        <td class="even_column">' +
        '                            <input type="checkbox" value="settings_hide_nub" name="Params.settings.hideNub" id="hideNub"' + (Params.settings.hideNub ? ' checked="checked"' : '') + '" title="Hide the bottom-right button" class="inputcheckbox "/>' +
        '                        </td>' +
        '                    </tr>' +
        '                </tbody>' +
        '            </table>' +
        '        </div>'+
        '    </div>'+ 
        '    <div class="closed">'+
        '        <div class="uiHeader uiHeaderBottomBorder uiHeaderGroup mtl">'+
        '            <div class="clearfix uiHeaderTop">'+
        '                <div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.lang+'</h3></div>'+
        '                <div class="rfloat"><h5 style="position:relative; top:3px;"><a onclick="div = this.parentNode.parentNode.parentNode.parentNode.parentNode; div.className = (div.className == \'visible\'?\'closed\':\'visible\');"><span class="changeLink">'+LANG.change+'</span><span class="hideLink">'+LANG.hide+'</span></a></h5></div>'+
        '            </div>'+
        '        </div>'+
        '        <div class="desc">'+ 
        '            <div class="lfloat">'+LANG.currentlang+'</div>' +
        '            <div class="rfloat">'+LANG.langname+'</div>' +
        '        </div>'+ 
        '        <div class="hiddenContent" id="language_form">'+
        '            <p>'+LANG.clang+'</p>' +
        '            <table cellspacing="0" style="margin-top:7px; margin-left:30px; width:460px;">' +
        '                <tbody id=\'langs_tbody\'>' +
        '                   <tr>' +
        '                        <th class="no_border"></th>' + 
        '                        <th class="even_column no_border"></th>' +
        '                    </tr>' +
        '                    <tr>' +
        '                       <th class="iconPlace">' +
        '                            <strong style="position:relative;">'+LANG.lang+''+
        '                                <span style="background-position:0 -1262px; ' +
        '                                    background-repeat:no-repeat; ' +
        '                                    display:block; height:20px; left:-22px; ' +
        '                                    position:absolute; top:-1px; width:17px; height:16px !important;' +
        '                                    background-image:url(\''+Params.images.blank+'\');" class="spritemap_icons spritemap_icons_fix" />' +
        '                           </strong>' +
        '                        </th>' +
        '                        <th style="color:#777777; font-size:9px; border-bottom:1px solid #C7CFE0; margin:0; padding:3px; text-align:center;" class="even_column no_border">' +
        '                           '+LANG.use+
        '                        </th>' +
        '                    </tr>'+
        '                    '+LANG.genSettings()+
        '                </tbody>' +
        '            </table>' +
        '        </div>'+
        '    </div>'+
        '    <div class="closed">'+
        '        <div class="uiHeader uiHeaderBottomBorder uiHeaderGroup mtl">'+
        '            <div class="clearfix uiHeaderTop">'+
        '                <div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.reset_+'</h3></div>'+
        '                <div class="rfloat"><h5 style="position:relative; top:3px;"><a onclick="div = this.parentNode.parentNode.parentNode.parentNode.parentNode; div.className = (div.className == \'visible\'?\'closed\':\'visible\');"><span class="changeLink">'+LANG.reset+'</span><span class="hideLink">'+LANG.hide+'</span></a></h5></div>'+
        '            </div>'+
        '        </div>'+
        '        <div class="hiddenContent">'+
        '            <div class="UIMessageBox explanation_note" style="margin:15px;">'+
        '                <h2 class="main_message">'+LANG.rvoid+'</h2>'+
        '                <p class="sub_message">'+
        '                    <br />'+
        '                    <a href="#" onclick="return false;" id="selectAll">'+LANG.selectall+'</a> - <a href="#" onclick="return false;" id="selectNone">'+LANG.selectnone+'</a>'+
        '                    <br />'+
        '                    <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_unfriends" /> Unfriends list'+
        '                    <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_friends" /> Comparative Friends list'+
        '                    <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_toNotify" /> Notified unfriends list'+
        '                    <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_unfriendsInfos" /> Unfriends informations'+
        '                    <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_awaitingsIgnored" /> Comparative Awaiting list'+
        '                    <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_keepAwaitingList" /> Accepted & Ignored list'+
        '                    <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_reappeared" /> Reappeared list'+
        '                    <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_deactivated" /> Deactivated list'+
        '                    <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_wasUnfriend" /> "was in your friendlist" list'+
        '                    <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_hasIgnored" /> "ignored one of your friend request" list'+
        '                    <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_messages" /> Informations Messages'+
        '                    <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_helps" /> Contextual helps'+
        '                    <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_settings" /> Settings'+
        '                    <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_language" /> Language'+
        '                    <br />'+
        '                    <br />'+
        '                    <br />'+
        '                    <span id="resetForm"><span class="uiButton uiButtonLarge uiButtonConfirm"><input id="resetButton" class="UIButton_Text" type="button" value="'+LANG.creset+'" /></span></span>'+
        '                </p>'+
        '            </div>'+
        '        </div>'+
        '    </div>'+
        '    <div class="closed">'+
        '        <div class="uiHeader uiHeaderBottomBorder uiHeaderGroup mtl">'+
        '            <div class="clearfix uiHeaderTop">'+
        '                <div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.exportData+'/'+LANG.importData+'</h3></div>'+
        '                <div class="rfloat"><h5 style="position:relative; top:3px;"><a onclick="div = this.parentNode.parentNode.parentNode.parentNode.parentNode; div.className = (div.className == \'visible\'?\'closed\':\'visible\');"><span class="changeLink">'+LANG.proceed+'</span><span class="hideLink">'+LANG.hide+'</span></a></h5></div>'+
        '            </div>'+
        '        </div>'+ 
        '        <div class="hiddenContent">'+
        '            <div class="UIMessageBox explanation_note" style="margin:15px;">'+ 
        '                '+LANG.back1+'<br /><br />'+LANG.back2+
        '                <br /><br />'+ 
        '                <span id="exportForm"><span class="uiButton uiButtonLarge uiButtonConfirm"><input id="exportButton" class="UIButton_Text" type="button" value="'+LANG.text_export+'" /></span></span>' +
        '                <span id="importForm"><span class="uiButton uiButtonLarge uiButtonConfirm"><input id="importButton" class="UIButton_Text" type="button" value="'+LANG.text_import+'" /></span></span>' +
        '            </div>'+
        '        </div>'+
        '        <div style="display:none; visibility:false;">'+
        '            <div class="UIMessageBox explanation_note" style="margin:15px;">'+ 
        '                <strong>External Backup :</strong>'+
        '                <br /><br />'+
        '                <span style="display:inline-block; width:140px;">Your Facebook UserID :</span><input class="inputtext" disabled="disabled" id="external_connect_userid" name="id" autocomplete="off" type="text" value="'+core.user_id+'">'+
        '                <br /><div style="margin-top:5px;"><span style="display:inline-block; width:140px;">Password :</span><input class="inputtext" id="external_connect_password" name="password" value="" autocomplete="off" type="text" style="margin-bottom:5px;" /></div>'+
        '                <br /><span class="uiButton uiButtonMedium uiButtonConfirm" style="width:65px; height:22px;" id="external_connect"><input type="button" value="Connect" class="UIButton_Text" id="external_connect_button" style="width:100%;"><img id="external_connect_indicator" src="'+Params.images.smallIndicator+'" style="display:none; height:11px; margin:auto; padding-top:5px;" /></span>' +
        '                <span class="uiButton uiButtonMedium uiButtonSpecial" style="width:65px; height:22px; display:none;" id="external_backup"><input type="button" value="Backup" class="UIButton_Text" id="external_backup_button" style="width:100%;"><img id="external_backup_indicator" src="'+Params.images.smallIndicator+'" style="display:none; height:11px; margin:auto; padding-top:5px;" /></span>' +
        '                <span class="uiButton uiButtonMedium uiButtonSpecial" style="width:65px; height:22px; display:none;" id="external_restore"><input type="button" value="Restore" class="UIButton_Text" id="external_restore_button" style="width:100%;"><img id="external_restore_indicator" src="'+Params.images.smallIndicator+'" style="display:none; height:11px; margin:auto; padding-top:5px;" /></span>' +
        '            </div>'+
        '        </div>'+
        '    </div>'+
        '    <br />'+
        '    <div class="closed hidden_elem">'+
        '        <div class="uiHeader uiHeaderBottomBorder uiHeaderGroup mtl">'+
        '            <div class="clearfix uiHeaderTop">'+
        '                <div class="lfloat"><h3 class="uiHeaderTitle">About</h3></div>'+
        '                <div class="rfloat"><h5 style="position:relative; top:3px;"><a onclick="div = this.parentNode.parentNode.parentNode.parentNode.parentNode; div.className = (div.className == \'visible\'?\'closed\':\'visible\');"><span class="changeLink">'+LANG.display.toLowerCase()+'</span><span class="hideLink">'+LANG.hide+'</span></a></h5></div>'+
        '            </div>'+
        '        </div>'+ 
        '        <div class="hiddenContent">'+
        '            About message'+
        '        </div>'+
        '    </div>'+
        '</div>';
    },
    header: function() {
        return '<div class="clearfix UIIntentionalStream_Top">'+
        '   <div class="uiHeader uiHeaderWithImage uiHeaderPage fbx_stream_header">'+
        '       <div class="clearfix uiHeaderTop">'+
        '           <div class="uiHeaderActions rfloat fsl fwb fcb"><span class="fwn"><a href="#/?sk=aw" id="awaitingsLink">'+LANG.awaiting+'</a></span><span class="uiBubbleCount mls" style="cursor:default;"><span class="numberContainer"><span id="BubbleCountUF" class="number countValue fsm">0</span><span class="maxCountIndicator"></span></span></span>'+
        '           </div>'+
        '           <div class="lfloat">'+
        '               <h2 class="uiHeaderTitle" id="bindHeader"><i id="iconHeader" class="uiHeaderImage img spritemap_9mvze7 spritemap_app_icons sx_app_icons_unfriends"></i><span id="title_header">'+Params._0x4d22+'</span></h2>'+
        '           </div>'+
        '       </div>'+
        '   </div>'+
        '</div>';
    },
    UnfriendFinderBox: function() {
        return '<div class="UIHomeBox UITitledBox" style="margin-bottom: 255px; margin-top: 5px;">'+
        '   <div class="uiHeader uiHeaderTopAndBottomBorder mbs uiSideHeader">'+
        '      <div class="clearfix uiHeaderTop">'+
        '          <div class="uiTextSubtitle uiHeaderActions rfloat">'+
        '              <a id="settingsLink" href="#/?sk=ufs">'+LANG.settings+'</a> · <a href="http://www.unfriendfinder.'+(Params.lang == 'fr'?'fr':'com')+'/help" onclick="window.open(this.href); return false;">'+LANG.help+'</a>'+
        '          </div>'+
        '          <div>'+
        '              <h4 class="uiHeaderTitle">'+Params._0x4d22+' <small style="font-size:8px;">v'+Params.version+(Params.dev?'.'+Params.built:'')+'</small></h4>'+
        '          </div>'+
        '      </div>'+
        '   </div>'+
        '   <div class="UITitledBox_Content" style="margin-bottom:10px;">'+
        '      <div>'+
        '          <div class="phs">'+
        '              <strong style="font-size:10px; font-family:Tahoma;">'+
        '                 <a href="'+Params.links.page+'">Fanpage</a>'+
        '                 <strong id="joinGroup_dot" style="display:inline-block;">&nbsp;·&nbsp;</strong>'+
        '                 <a style="display:inline-block;" id="joinGroup_title" href="'+Params.links.group+'">'+LANG.joinGroup.replace(' ', '&nbsp;')+'</a>'+
        '                 <strong id="joinTwitter_dot">&nbsp;·&nbsp;</strong>'+
        '                 <a onclick="window.open(this.href); return false;" id="follow_title" href="'+Params.links.twitter+'">Twitter</a>'+
        '                 <strong id="forum_dot">&nbsp;·&nbsp;</strong>'+
        '                 <a onclick="window.open(this.href); return false;" id="forum_title" href="'+Params.links.forum+'">Forum</a></strong>'+
        '          </div>'+
        '          <div class="UIImageBlock clearfix" style="margin-top:15px; margin-bottom:10px; font-size: 10px;">'+
        '              <a onclick="window.open(this.href); return false;" style="display:none;" id="ufPageIMG" class="UIImageBlock_Image UIImageBlock_SMALL_Image ad_image" href="'+Params.links.page+'"><img src="http://images.unfriendfinder.net/becomeFan.png" class="img"></a>'+
        '              <a onclick="window.open(this.href); return false;" style="display:none;" id="ufGroupIMG" class="UIImageBlock_Image UIImageBlock_SMALL_Image ad_image" href="'+Params.links.group+'"><img src="http://images.unfriendfinder.net/group.png" class="img"></a>'+
        '              <a onclick="window.open(this.href); return false;" style="display:none;" id="ufForumIMG" class="UIImageBlock_Image UIImageBlock_SMALL_Image ad_image" href="'+Params.links.forum+'"><img src="http://images.unfriendfinder.net/forum.png" class="img"></a>'+
        '              <a onclick="window.open(this.href); return false;" style="display:none;" id="ufTwitterIMG" class="UIImageBlock_Image UIImageBlock_SMALL_Image ad_image" href="'+Params.links.twitter+'"><img src="http://images.unfriendfinder.net/twitter.png" class="img"></a>'+
        '              <a onclick="window.open(this.href); return false;" style="display:none; width: 100%; text-align: center;" id="ufDonateIMG" class="UIImageBlock_Image UIImageBlock_SMALL_Image ad_image" href="'+Params.links.donate+'"><img src="https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif" class="img" style="margin:15px auto;"></a>'+
        '              <div id="ufDonateText" style="text-align:center; display:none;"><br />Support the script, make a donation !<br /><a onclick="window.open(this.href); return false;" href="http://www.unfriendfinder.com/donate">Learn More</a></div>'+
        '              <div class="UIImageBlock_Content UIImageBlock_SMALL_Content" id="ufForumText" style="display:none;">'+
        '                 <a onclick="window.open(this.href); return false;" class="ads_text en_US" href="'+Params.links.forum+'"><b style="font-size:12px;">The forum</b><br />A new way to get in touch, share ideas and start talking !</a>'+
        '                 <a onclick="window.open(this.href); return false;" class="ads_text fr_FR" href="'+Params.links.forum+'"><b style="font-size:12px;">Le forum</b><br />Un nouvel espace pour rester en contact, partager ses idées, et discuter !</a>'+
        '              </div>'+
        '              <div class="UIImageBlock_Content UIImageBlock_SMALL_Content" id="ufCommunityText">'+
        '                 <a onclick="window.open(this.href); return false;" class="ads_text en_US" href="'+Params.links.page+'">You can now become a fan to get the latest information on Unfriend Finder, make suggestions or get some help.<br />Get stuck in!</a>'+
        '                 <a onclick="window.open(this.href); return false;" class="ads_text fr_FR" href="'+Params.links.page+'">Devenez fan pour être au courant des dernière nouveautés du script, donner votre avis, ou avoir de l\'aide.<br />Rejoingnez&nbsp;la&nbsp;communauté&nbsp;!</a>'+
        '              </div>'+ 
        '          </div>'+
        '          <div style="display:none;" class="uiTextHighlight" id="pagelet_newversion"></div>'+
        '          <div style="display:none;" class="uiTextHighlight" id="pagelet_language"></div>'+
        '          '+template.Donate()+
        '          <iframe id="like_box"></iframe><br />'+
        '       </div>'+
        '   </div>'+
        '   <div id="unfriendFinder_message" class="UITitledBox_Content" style="display: block; padding-top: 7px;">'+
        '      <div class="emu_ad">'+
        '          <div class="phs">'+
        '             <a title="'+LANG.btn_close+'" class="close_message" href="#" id="unfriendFinder_message_close">X</a>'+
        '             <strong>Information :</strong>'+
        '          </div>'+
        '          <div class="UIImageBlock clearfix" style="margin-top:5px;">'+
        '             <div style="text-align:center; padding:10px;" class="uiTextHighlightSpecial" id="unfriendFinder_message_content"></div>'+
        '          </div>'+
        '      </div>'+
        '   </div>'+
        '</div>'; 
    },
    Contextual_awaitings_fr_FR: function() {
        return 'Vous pouvez aussi utiliser ce lien pour accéder aux demandes d\'amis en cours, et vérifier qui les a accepté ou refusé.';
    },
    Contextual_filter: function() {
        return '<span class="en_US">Here is implemented some new filters on your Facebook homepage to make accessing Unfriend Finder settings and pending friend requests easier.'+
        '<br />A counter will be displayed next to the individual tabs on and under "Unfriends" to alert you of new activity.</span><span class="fr_FR">Ici, sur votre page d\'accueil Facebook, se trouvent les nouveaux filtres du script qui vous permettent d\'accéder aux paramètres et aux requêtes en attente plus facilement.'+
        '<br />Un compteur sera disposé à côté de chaque filtre pour vous alerter de nouvelles activités.</span>';
    },
    Contextual_awaitings_en_US: function() {
        return 'You can also use this link to access your pending friend requests and find out who has accepted or cancelled them.';
    },
    messagePreview: function(_id, _authorName, _authorUrl, _authorPicture, _title, _preview, _date, _unread) {
        return ''+
        '<div>'+
        '    <div class="GBThreadRow" bindpoint="root">'+
        '        <table cellpadding="0" id="ufMessage_'+_id+'" bindpoint="thread_row" class="'+(_unread?'unread':'')+'">'+
        '            <tbody>'+
        '                <tr>'+
        '                    <td class="badge_column" style="width:25px;">'+
        '                        <a onselectstart="return false;" onclick="return false;" class="badge" href="#"></a>'+
        '                    </td>'+
        '                    <td class="icon">'+
        '                        <div class="Thread_Icon">'+
        '                            <a tabindex="-1" bindpoint="iconAnchor" href="'+_authorUrl+'">'+
        '                                <img bindpoint="icon" class="UIProfileImage UIProfileImage_LARGE" src="'+_authorPicture+'" alt="'+_authorName+'">'+
        '                            </a>'+
        '                        </div>'+
        '                    </td>'+
        '                    <td bindPoint="readMessage" class="envelope clickable" style="width:110px">'+
        '                        <div class="authors line" bindpoint="authors"><a href="'+_authorUrl+'" title="'+_authorName+'">'+_authorName+'</a></div>'+
        '                        <div class="date tagline" bindpoint="date">'+core.genTime(_date)+'</div>'+
        '                    </td>'+
        '                    <td bindPoint="readMessage" class="thread_detail clickable">'+
        '                        <a onclick="return false;" class="subject line" bindpoint="readMessage" style="color:#333333;" href="#" title="'+_title+'">'+_title+'</a>'+
        '                        <div class="preview tagline" bindpoint="preview">'+_preview+'</div>'+
        '                    </td>'+
        '                    <td class="clickable">'+
        '                        <a onclick="return false;" bindpoint="deleteButton" class="delete_button UIObjectListing_RemoveLink" href="#">Delete</a>'+
        '                    </td>'+
        '                </tr>'+
        '            </tbody>'+
        '        </table>'+
        '    </div>'+
        '</div>';
    },
    messageContent: function(_id, _authorName, _authorUrl, _authorPicture, _title, _content, _date) {
        return ''+
        '    <div class="gigaboxx_thread_header">'+
        '        <h2 class="gigaboxx_thread_header_subject"></h2>'+
        '        <div class="gigaboxx_thread_header_authors">To users of Unfriend Finder</div>'+
        '    </div>'+
        '    <div id="ufMessage_'+_id+'_content">'+
        '        <div class="GBThreadMessageRow clearfix">'+
        '            <div class="GBThreadMessageRow_Image">'+
        '                <a href="'+_authorUrl+'" class="GBThreadMessageRow_Image_Link">'+
        '                    <img src="'+_authorPicture+'" class="UIProfileImage UIProfileImage_Large">'+
        '                </a>'+
        '            </div>'+
        '            <div class="GBThreadMessageRow_Main">'+
        '                <div class="GBThreadMessageRow_Info">'+
        '                    <span class="GBThreadMessageRow_AuthorLink_Wrapper">'+
        '                        <a href="'+_authorUrl+'" class="GBThreadMessageRow_AuthorLink">'+_authorName+'</a>'+
        '                    </span>'+
        '                    <span class="GBThreadMessageRow_Date">'+
        '                        '+core.genTime(_date)+''+
        '                    </span>'+
        '                    <span class="GBThreadMessageRow_BranchLink"></span>'+
        '                    <span class="GBThreadMessageRow_ReportLink"></span>'+
        '                </div>'+
        '                <div class="GBThreadMessageRow_Body" style="width: 440px;">'+
        '                    <div class="GBThreadMessageRow_Body_Content">'+
        '                        <br />'+_content+
        '                    </div>'+
        '                    <div class="GBThreadMessageRow_ReferrerLink">'+
        '                    '+
        '                    </div>'+
        '                    <div class="GBThreadMessageRow_Body_Attachment">'+
        '                    '+
        '                    </div>'+
        '                </div>'+
        '            </div>'+
        '        </div>'+
        '    </div>';
    },
    noMessages: function() {
        return ''+
        '<div style="display: block;" class="home_no_messages clearfix" id="noMessages">'+
        '    <span style="height: 32px;" class="home_no_messages_icon list_empty"></span>'+
        '    <div class="home_no_messages_content">'+
        '        <strong id="noText">'+LANG.nomessages+'</strong>'+
        '    </div>'+
        '</div>';
    }
};

var Style = function() {
    var style = this;

    style.Build = function() {
        var head;
        if (head = document.querySelectorAll("head")[0]) {
            var noop = null;
            style.element = new xHTMLElement({
                element: 'style',
                type: 'text/css',
                media: 'all',
                id: 'unfriend_finder',
                textContent: '/*'+
                '\nHost: static.ak.fbcdn.net'+
                '\nGenerated by '+Params._0x4d22+
                '\nVersion: '+Params.version+
                '\nLocale: '+core.fb_locale+
                '\nPath: /'+
                '\n*/\n',
                parentNode: head
            }).getElement();
            //For Messages
            noop = new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: Params.links.rsrc+'/z3GOW/hash/1pzpz1dl.css',
                id: '1pzpz1dl',
                rel: 'stylesheet',
                parentNode: head
            });
            /*noop = new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: Params.links.rsrc+'/v1/yA/r/4jGSZatkkDC.css',
                id: '4jGSZatkkDC',
                rel: 'stylesheet',
                parentNode: head
            });*/
            //For Tour
            noop = new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: Params.links.rsrc+'/y0/r/Pqpa_q748l0.css',
                id: 'Pqpa_q748l0',
                rel: 'stylesheet',
                parentNode: head
            });
            noop = new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: Params.links.rsrc+'/yB/r/NJ-Pgma2lMp.css',    
                id: 'NJ-Pgma2lMp',
                rel: 'stylesheet',
                parentNode: head
            });
            //For Tour Box
            noop = new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: Params.links.rsrc+'/y5/r/tk1iSgkPJpt.css',    
                id: 'tk1iSgkPJpt',
                rel: 'stylesheet',
                parentNode: head
            });
            noop = new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: Params.links.rsrc+'/ym/r/yFcxKTEH3zr.css',    
                id: 'yFcxKTEH3zr',
                rel: 'stylesheet',
                parentNode: head
            });
            noop = new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: Params.links.rsrc+'/y2/r/Uej-RHoi1p1.css',    
                id: 'Uej-RHoi1p1',
                rel: 'stylesheet',
                parentNode: head
            });
            //For Tooltips
            noop = new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: Params.links.rsrc+'/zLQGB/hash/9chf19i2.css',
                id: '9chf19i2',
                rel: 'stylesheet',
                parentNode: head
            });
            //For Nub
            noop = new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: Params.links.rsrc+'/v1/yW/r/sQFTNvaMoEG.css',
                id: 'sQFTNvaMoEG',
                rel: 'stylesheet',
                parentNode: head
            });
            //For filter bubble
            noop = new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: Params.links.rsrc+'/z3XBU/hash/9a4brlnu.css',
                id: '9a4brlnu',
                rel: 'stylesheet',
                parentNode: head
            });
            //For contextual bubble
            noop = new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: Params.links.rsrc+'/yf/r/MLweAgcw0Od.css',
                id: 'MLweAgcw0Od',
                rel: 'stylesheet',
                parentNode: head
            });
            //For header bubble
            noop = new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: Params.links.rsrc+'/z2EFQ/hash/89apsmb3.css',
                id: '89apsmb3',
                rel: 'stylesheet',
                parentNode: head
            });


        }
        return style.element; 
    };

    style.Append = function($style) {
        style.element.textContent = style.element.textContent+"\n"+$style; 
    };

    style.toString = function() { return '[object Style]'; };

    style.Build();
};

var XHR = function(__constructor) {
    //return;
    var _XHR = this;
    Extend(_XHR, __constructor);

    if (!_XHR.url) {
        throw (new Error('No URL passed in object'));
    }
    if (!_XHR.method) _XHR.method = 'GET';
    if (!_XHR.onload) _XHR.onload = function() { };
    if (!_XHR.onerror) _XHR.onerror = function() { };
    if (!_XHR.async) _XHR.async = true;
    _XHR.updating = false;

    _XHR.HTTP_CODES = {
        200: true, 201: true, 202: true, 203: true, 204: true, 205: true, 206: true, 207: true, 210: true, 
        300: true, 301: true, 302: true, 303: true, 304: true, 305: true, 307: true, 310: true,
        400: false, 401: false, 402: false, 403: false, 404: false, 405: false, 406: false, 407: false, 408: false, 409: false,
        410: false, 411: false, 412: false, 413: false, 414: false, 415: false, 416: false, 417: false, 418: false,
        422: false, 423: false, 424: false, 425: false, 426: false, 449: false, 450: false,
        500: false, 501: false, 502: false, 503: false, 504: false, 505: false, 507: false, 509: false
    }

    _XHR.cancel = function() {
        if (_XHR.updating) {
            _XHR.XMLHttpRequest.abort();
            _XHR.XMLHttpRequest = null;
            _XHR.updating = false;
        }
    };
    _XHR.open = function() { 
        if (_XHR.updating) {
            throw new Error('Current request not fully received. Ajax.cancel() to cancel request.');
        }
        _XHR.XMLHttpRequest = null;

        if (window.XMLHttpRequest) _XHR.XMLHttpRequest = new XMLHttpRequest();
        else _XHR.XMLHttpRequest = new ActiveXObject('Microsoft.XMLHTTP');
        if (/facebook\.com/.test(_XHR.url)) {
            if (!/remove_friend/.test(_XHR.url)) {
                if (!/lazy=1/.test(_XHR.url)) _XHR.url += '&lazy=1&token=v6&stale_ok=1&__a=1&time='+core.time();
            } 
        }
        if (!_XHR.XMLHttpRequest) {
            throw new Error('Object XMLHttpRequest undefined');
        }
        else {
            _XHR.XMLHttpRequest.onreadystatechange = function() {
                if (_XHR.XMLHttpRequest.readyState == 4) {
                    _XHR.updating = false;
                    if (_XHR.HTTP_CODES[_XHR.XMLHttpRequest.status]) _XHR.onload(_XHR.XMLHttpRequest.responseText);
                    else if (!_XHR.HTTP_CODES[_XHR.XMLHttpRequest.status]) _XHR.onerror(_XHR.XMLHttpRequest.responseText);
                    else if (0 === parseInt(_XHR.XMLHttpRequest.status, 10)) throw new Error('XHR: Can\'t use Ajax() on Cross-domain ('+_XHR.url+')');
                    else throw new Error('XHR: Unknown error (Status code '+_XHR.XMLHttpRequest.status+')');
                    _XHR.XMLHttpRequest = null;
                } 
            };
            _XHR.updating = true;
            if (/POST/i.test(_XHR.method)) {
                _XHR.XMLHttpRequest.open('POST', _XHR.url, _XHR.async);
                _XHR.XMLHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                _XHR.XMLHttpRequest.setRequestHeader('Content-Length', _XHR.data.length); 
                _XHR.XMLHttpRequest.send(_XHR.data);
            }
            else {
                _XHR.XMLHttpRequest.open('GET', _XHR.url, _XHR.async);
                var header;
                for (header in _XHR.headers) {
                    if (_XHR.headers.hasOwnProperty(header)) {
                        content = _XHR.headers[header];
                        _XHR.XMLHttpRequest.setRequestHeader(header, content);
                    }
                }
                _XHR.XMLHttpRequest.send(null);
            }
        }
    };
    _XHR.open();

    _XHR.toString = function() { return '[Ajax Request]'; }
};

var CollectionList = function($object) {
    if ($object === undefined) $object = ({});
    this.Items = $object;
    this.exceptions = ({});

    this.exception = function($action, $ex) {
        switch ($action) {
            case 'Add' :
                this.exceptions[$ex] = true;
                break;
            case 'Remove' :
                delete this.exceptions[$ex];
        }
    };

    this.Clear = function() {
        this.Items = ({});
        return true;
    };

    this.Count = function() {
        var $j = 0;
        var $i;
        for ($i in this.Items) {
            if (this.Items.hasOwnProperty($i)) {
                if (typeof this.Items[$i] != undefined) ++$j;
            };
        }
        return $j;
    };

    this.Add = function($key, $value) {
        $key = parseInt($key, 10);
        if (this.exceptions[$key]) return false;
        if (this.Items[$key]) return false;
        if (this.Items[$key] == false) return false;
        else {
            this.Items[$key] = $value;
            return true;
        }
    };

    this.Set = function($key, $value) {
        $key = parseInt($key, 10);
        if (this.exceptions[$key]) return false;
        if (this.Items[$key]) {
            this.Items[$key] = $value;
            return true;
        }
        else return false;

    };

    this.Remove = function($key) {
        $key = parseInt($key, 10);
        if (this.exceptions[$key]) return false;
        if (this.Items[$key]) {
            delete this.Items[$key];
            return true;
        }
        else return false;
    };

    this.Key = function($key, $value) {
        $key = parseInt($key, 10);
        if (this.exceptions[$key]) return false;
        if ($value) return this.Set($key, $value);
        else {
            if (!$key) return this.Items;
            else return this.Items[$key];
        }
    };

    this.Item = function($index) {
        var $i = 0;
        var $k;
        for ($k in this.Items) {
            if (this.Items.hasOwnProperty($k)) {
                $i++;
                if ($i == $index) return this.Items[$k];
            }
        }
        return false;
    };

    this.Exists = function($key) {
        $key = parseInt($key, 10);
        if (this.exceptions[$key]) return false;
        if (this.Items[$key] === undefined) return false;
        else return true;
    };

    CollectionList.prototype.valueOf = function() {
        return this.Items;
    };

    CollectionList.prototype.toString = function() {
        return stringify(this.Items);
    };
};

var Lang = function($l) {
    $l = ($l?$l:'en_US');
    var lang = this;
    lang.language = $l;
    lang.list = {
        'en_US': true,
        'en_GB': true,
        'fr_FR': true,
        'fr_CA': true,
        'it_IT': true,
        'es_LA': true,
        'es_ES': true,
        'es_MX': true,
        'ca_ES': true,
        'eu_ES': true,
        'hr_HR': true,
        'el_GR': true,
        'nl_NL': true,
        'de_DE': true,
        'tr_TR': true,
        'pl_PL': true,
        'da_DK': true,
        'fi_FI': true,
        'sv_SE': true,
        'nn_NO': true,
        'nb_NO': true,
        'pt_BR': true,
        'pt_PT': true,
        'ru_RU': true,
        'sk_SK': true,
        'sl_SI': true,
        'sr_RS': true,
        'bg_BG': true,
        'cs_CZ': true,
        'hu_HU': true,
        'ro_RO': true,
        'en_UD': true,
        'en_PI': true,
        'fb_LT': true,
        'la_VA': true,
        'bs_BA': true,
        'lt_LT': true,
        'sq_AL': true,
        'id_ID': true,
        'ms_MY': true,
        'he_IL': true,
        'ar_AR': true,
        'bn_IN': true,
        'zh_CN': true,
        'zh_TW': true,
        'zh_HK': true,
        'ja_JP': true,
        'ko_KR': true,
        'tl_PH': true,
        'th_TH': true,
        'vi_VN': true,
        'az_AZ': true,
        'eo_EO': true,
        'gl_ES': true,
        'is_IS': true,
        'ku_TR': true,
        'lv_LV': true,
        'ka_GE': true,
        'mk_MK': true,
        'uk_UA': true,
        'hy_AM': true,
        'fa_IR': true,
        'ne_NP': true,
        'ta_IN': true,
        'mr_IN': true
    };
     lang.fbLocales = {
        af_ZA: 'Afrikaans',
        id_ID: 'Bahasa Indonesia',
        ms_MY: 'Bahasa Melayu',
        ca_ES: 'Català',
        cs_CZ: 'Čeština',
        cy_GB: 'Cymraeg',
        da_DK: 'Dansk',
        de_DE: 'Deutsch',
        en_GB: 'English (UK)',
        en_US: 'English (US)',
        en_UD: 'English (Upside Down)',
        es_LA: 'Español (Latin America)',
        es_ES: 'Español (España)',
        tl_PH: 'Filipino',
        fr_CA: 'Français (Canada)',
        fr_FR: 'Français (France)',
        ko_KR: '한국어',
        hr_HR: 'Hrvatski',
        it_IT: 'Italiano',
        lt_LT: 'Lietuvių',
        hu_HU: 'Magyar',
        nl_NL: 'Nederlands',
        ja_JP: '日本語',
        nb_NO: 'Norsk (bokmål)',
        pl_PL: 'Polski',
        pt_BR: 'Português (Brasil)',
        pt_PT: 'Português (Portugal)',
        ro_RO: 'Română',
        ru_RU: 'Русский',
        sk_SK: 'Slovenčina',
        sl_SI: 'Slovenščina',
        fi_FI: 'Suomi',
        sv_SE: 'Svenska',
        th_TH: 'ภาษาไทย',
        vi_VN: 'Tiếng Việt',
        tr_TR: 'Türkçe',
        zh_CN: '中文(简体)',
        zh_TW: '中文(台灣)',
        zh_HK: '中文(香港)',
        el_GR: 'Ελληνικά',
        bg_BG: 'Български',
        sr_RS: 'Српски',
        he_IL: 'עברית',
        ar_AR: 'العربية',
        hi_IN: 'हिन्दी',
        bn_IN: 'বাংলা',
        pa_IN: 'ਪੰਜਾਬੀ',
        ta_IN: 'தமிழ்',
        te_IN: 'తెలుగు',
        ml_IN: 'മലയാളം',
        az_AZ: 'Azərbaycan dili',
        bs_BA: 'Bosanski',
        et_EE: 'Eesti',
        en_PI: 'English (Pirate)',
        eo_EO: 'Esperanto',
        eu_ES: 'Euskara',
        fo_FO: 'Føroyskt',
        ga_IE: 'Gaeilge',
        gl_ES: 'Galego',
        is_IS: 'Íslenska',
        sw_KE: 'Kiswahili',
        ku_TR: 'Kurdî',
        lv_LV: 'Latviešu',
        fb_LT: 'Leet Speak',
        la_VA: 'lingua latina',
        nn_NO: 'Norsk (nynorsk)',
        sq_AL: 'Shqip',
        ka_GE: 'ქართული',
        be_BY: 'Беларуская',
        mk_MK: 'Македонски',
        uk_UA: 'Українська',
        hy_AM: 'Հայերեն',
        fa_IR: 'فارسی',
        ps_AF: 'پښتو',
        ne_NP: 'नेपाली',
        gn_PY: 'Avañe\'ẽ',
        ay_BO: 'Aymar aru',
        jv_ID: 'Basa Jawa',
        ck_US: 'Cherokee',
        se_NO: 'Davvisámegiella',
        en_IN: 'English (India)',
        es_CL: 'Español (Chile)',
        es_CO: 'Español (Colombia)',
        es_MX: 'Español (México)',
        es_VE: 'Español (Venezuela)',
        tl_ST: 'tlhIngan-Hol',
        li_NL: 'Limburgs',
        mg_MG: 'Malagasy fiteny',
        mt_MT: 'Malti',
        nl_BE: 'Nederlands (België)',
        uz_UZ: 'O\'zbek',
        qu_PE: 'Qhichwa',
        rm_CH: 'Rumantsch',
        so_SO: 'Soomaaliga',
        fb_FI: 'Suomi (koe)',
        si_LK: 'Sinhala',
        tt_RU: 'Tatarça',
        xh_ZA: 'isiXhosa',
        zu_ZA: 'isiZulu',
        mn_MN: 'Монгол',
        tg_TJ: 'тоҷикӣ',
        kk_KZ: 'Қазақша',
        yi_DE: 'ייִדיש',
        ur_PK: 'اردو',
        sy_SY: 'ܐܪܡܝܐ',
        mr_IN: 'मराठी',
        sa_IN: 'संस्कृतम्',
        gu_IN: 'ગુજરાતી',
        kn_IN: 'ಕನ್ನಡ',
        km_KH: 'ភាសាខ្មែរ'
    };
    lang.genSettings = function() {
        var html = '';
        var l;
        for (l in lang.list) {
            if (lang.list.hasOwnProperty(l)) {
                try {
                    void eval('$'+l);
                    html = html+
                    '                    <tr style="background:#F2F2F2; height:27px;">'+
                    '                        <td class="action_text">'+
                    '                            <span style="background: url(\'http://www.unfriendfinder.net/'+l+'.flag\') no-repeat 1px 1px; padding-left:26px;">'+lang.fbLocales[l]+'</span>'+
                    '                        </td>' +
                    '                        <td class="even_column">' +
                    '                            <input type="radio" value="'+l+'" name="lang" id="'+l+'"' + (lang.language == l ? ' checked="checked"' : '') + ' />' +
                    '                        </td>' +
                    '                    </tr>';
                }
                catch (ex) { }
            }
        }
        return html;
    };
    try { $data = eval('$'+lang.language); }
    catch (exception) {
        $data = $en_US;
        lang.language = 'en_US';
    }

    Extend(lang, $data);

    Lang.prototype.toString = function() {
        return lang.language;
    };
};

var Bubble = function() {
    var bubble = this;

    bubble.build = function() {
        Console.log('Building bubbles');
        bubble.createFilter();
        bubble.createMenubarLink();
    };
    bubble.rebindFilter = function() {
        if (Params.env.isChrome) {
        }
        else {
            EventMgr.addListener(getFromId('bubblelink_unfriend_link'), 'click', function () { new Handler('filter'); core.getMessages(); });
            EventMgr.addListener(getFromId('UFfilterAwaitings'), 'click', function () { (new Handler()).clickHeaderToShowAwaitings(); });
            EventMgr.addListener(getFromId('UFfilterSettings'), 'click', function () { (new Handler()).clickHeaderToShowSettings(); });
            EventMgr.addListener(getFromId('UFfilterMessages'), 'click', function () { (new Handler()).clickHeaderToShowMessages(); });
        }
    };
    bubble.createFilter = function() {
        if (getCoreFilter()) {
            if (!getFromId('navItem_unfriends')) {
                Console.log('Creating filter');
                var navItem_unfriends;
                if (Params.env.isChrome) {
                    var bindnavItem = new xHTMLElement({
                        element: 'div',
                        id: 'bindnavItem',
                        style: {
                            display: 'none'
                        },
                        parentNode:document.body
                    }).getElement();
                    
                    EventMgr.addListener(bindnavItem, 'DOMNodeInserted', function() {
                        switch (getFromId('bindnavItem').firstChild.innerHTML) {
                            case 'UFfilterUnfriends':
                                new Handler('filter'); 
                                core.getMessages();
                                break;
                            case 'UFfilterAwaitings':
                                (new Handler()).clickHeaderToShowAwaitings();
                                break;
                            case 'UFfilterSettings':
                                (new Handler()).clickHeaderToShowSettings();
                                break;
                            case 'UFfilterMessages':
                                (new Handler()).clickHeaderToShowMessages();
                                break;
                            case 'disableUfFromFutureNav':
                                if (!core.dialogs['disableFacebox']) core.dialogs['disableFacebox'] = new Facebox({
                                    id: 'disableFacebox',
                                    title: '<span class="en_US">You\'re about to temporarily disable Unfriend Finder.</span><span class="fr_FR">Confirmation de désactivation temporaire du script</span>',
                                    body: new xHTMLElement({
                                        element: 'div',
                                        id: 'disableFaceboxBody',
                                        innerHTML: ''+
                                        '<span class="en_US">While disabled, the script will not alert you of any unfriend activities, and will not be displayed at this place.'+
                                        '<br /><br />If you want to re-enable the script, use the "Enable" function of the Icon-Button in the lower-right corner, near the Facebook Chat.'+
                                        '<br /><br /><b>When re-enabled, the script will alert you of all Unfriends you had when the script was disabled.</b></span>'+
                                        '<span class="fr_FR">Lorsque le script est désactivé, il n\'affichera aucune activité si quelqu\'un vous supprime de Facebook.'+
                                        '<br /><br />Si vous voulez réactiver le script par la suite, utiliser la fonction "Activer" localisée avec le bouton-icône en bas à droite, à côté de la discussion instantanée.'+
                                        '<br /><br /><b>Une fois réactivé, le script va vous annoncer tous les Amis en moins que vous aviez durant sa désactivation.</b></span>',
                                    }).getElement(),
                                    buttons: [{
                                        name: 'delete_story',
                                        value: "Disable",
                                        id: 'disable_button',
                                        handler: function() {
                                            setKey('enabled', 'disabled');
                                            window.location.reload();
                                        },
                                        disabled: false,
                                        closer: false,
                                        type: 'blue'
                                    },{
                                        name: 'cancel',
                                        value: LANG.btn_cancel,
                                        id: 'cancel_button',
                                        handler: function() { core.dialogs['disableFacebox'] = null; },
                                        disabled: false,
                                        closer: true,
                                        type: 'gray'
                                    }]
                                });
                                core.dialogs['disableFacebox'].Show();
                                break;
                        }
                        getFromId('bindnavItem').removeChild(getFromId('bindnavItem').firstChild);
                    });
                    
                    navItem_unfriends = new xHTMLElement({
                        element: 'li',
                        id: 'navItem_unfriends',
                        className: 'sideNavItem closed stat_elem key-uf',
                        innerHTML: ''+                   
                        '<div class="buttonWrap">'+
                        '   <div class="uiSelector inlineBlock mas bookmarksMenuButton uiSideNavEditButton">'+
                        '       <div class="wrap">'+
                        '           <a rel="toggle" aria-haspopup="1" role="button" href="#" class="uiSelectorButton uiCloseButton"></a>'+
                        '           <div class="uiSelectorMenuWrapper uiToggleFlyout">'+
                        '               <div class="uiMenu uiSelectorMenu" role="menu" style="width:150px;">'+
                        '                   <ul class="uiMenuInner">'+
                        '                       <li data-label="Disable" class="uiMenuItem favorite">'+
                        '                           <a onclick="s = document.createElement(\'span\'); s.innerHTML = this.id; document.getElementById(\'bindnavItem\').appendChild(s);" href="#" role="menuitem" class="itemAnchor" id="disableUfFromFutureNav"><span class="itemLabel fsm">Disable</span></a>'+
                        '                       </li>'+
                        '                       <li data-label="Update" class="uiMenuItem favorite" style="display:none;">'+
                        '                           <a onclick="window.open(this.href); return false;" href="'+Params.links.update+'" role="menuitem" class="itemAnchor" id="updateUfFromFutureNav"><span class="itemLabel fsm">Update</span></a>'+
                        '                       </li>'+
                        '                   </ul>'+
                        '               </div>'+
                        '           </div>'+
                        '       </div>'+
                        '   </div>'+
                        '</div>'+
                        '<a onclick="s = document.createElement(\'span\'); s.innerHTML = this.id; document.getElementById(\'bindnavItem\').appendChild(s);" title="'+LANG.unfriends+'" href="#/?sk=uf" class="item" onclick="return false;" id="UFfilterUnfriends">'+
                        '   <div class="clearfix">'+
                        '      <div class="rfloat">'+
                        '          <span class="loadingIndicator" id="loadingIndicatorUnfriends"></span>'+
                        '          <span class="count uiSideNavCount" style="display:none;">'+
                        '              <span class="countValue fss" id="bubblelink_unfriends">0</span>'+
                        '              <span class="maxCountIndicator"></span>'+
                        '          </span>'+
                        '          <span class="grip__"></span>'+
                        '      </div>'+
                        '      <div>'+
                        '          <span class="imgWrap"><i class="img spritemap_icons sx_app_icons_unfriends"></i></span>'+
                        '          <span class="linkWrap">'+LANG.unfriends+'</span><span style="display:none;" name="bubble_update">&nbsp;*</span>&nbsp;'+
                        '      </div>'+
                        '   </div>'+
                        '</a>'+
                        '<ul id="subitem-uf">'+
                        '   <li>'+
                        '       <a onclick="s = document.createElement(\'span\'); s.innerHTML = this.id; document.getElementById(\'bindnavItem\').appendChild(s);" href="#/?sk=aw" id="UFfilterAwaitings" class="subitem">'+
                        '           <div class="clearfix">'+
                        '               <div class="rfloat">'+
                        '                   <span class="loadingIndicator" id="loadingIndicatorAwaitings"></span>'+
                        '                   <span class="count uiSideNavCount" style="display:none;"><span class="countValue fss" id="bubblelink_awaitings">0</span></span>'+
                        '               </div>'+
                        '               <div><span class="linkChild" id="UFfilterTextAwaitings">'+LANG.awaiting+'</span></div>'+
                        '           </div>'+
                        '       </a>'+
                        '   </li>'+
                        '   <li>'+
                        '       <a onclick="s = document.createElement(\'span\'); s.innerHTML = this.id; document.getElementById(\'bindnavItem\').appendChild(s);" href="#/?sk=ufs" id="UFfilterSettings" class="subitem">'+
                        '           <div class="clearfix">'+
                        '               <div class="rfloat">'+
                        '                   <span class="loadingIndicator" id="loadingIndicatorSettings"></span>'+
                        '                   <span class="count uiSideNavCount" style="display:none;"><span class="countValue fss" id="bubblelink_messages">0</span></span>'+
                        '               </div>'+
                        '               <div><span class="linkChild" id="UFfilterTextSettings">'+LANG.settings+'</span></div>'+
                        '           </div>'+
                        '       </a>'+
                        '   </li>'+
                        '   <li>'+
                        '       <a onclick="s = document.createElement(\'span\'); s.innerHTML = this.id; document.getElementById(\'bindnavItem\').appendChild(s);" href="#" id="UFfilterMessages" class="subitem">'+
                        '           <div class="clearfix">'+
                        '               <div class="rfloat">'+
                        '                   <span class="loadingIndicator" id="loadingIndicatorMessages"></span>'+
                        '                   <span class="count uiSideNavCount" style="display:none;"><span class="countValue fss">0</span></span>'+
                        '               </div>'+
                        '               <div><span class="linkChild" id="UFfilterTextMessages">'+LANG.messages+'</span></div>'+
                        '           </div>'+
                        '       </a>'+
                        '   </li>'+
                        '</ul>'+
                        '<span class="mover__ hidden_elem">to arrange icon</span>',
                        parentNode: getCoreFilter().parentNode
                    }).getElement(); 
                }
                else {
                    var parentForFilter, fbCoreAppsNav, fbUfFilterNav;
                    if (getFromId('fbUfFilterNav')) return;
                    if (fbCoreAppsNav = getFromId('fbCoreAppsNav')) {
                        parentForFilter = new xHTMLElement({
                            element: 'ul',
                            id: 'fbUfFilterNav',
                            className: fbCoreAppsNav.className.replace(/mtm/, ''),
                            parentNode: fbCoreAppsNav.parentNode
                        }).getElement();   
                    }
                    else parentForFilter = getCoreFilter().parentNode
                    
                    navItem_unfriends = new xHTMLElement({
                        element: 'li',
                        id: 'navItem_unfriends',
                        className: 'sideNavItem closed stat_elem key-uf',
                        innerHTML: ''+
                        '<div class="buttonWrap">'+
                        '   <div class="uiSelector inlineBlock mas bookmarksMenuButton uiSideNavEditButton">'+
                        '       <div class="wrap">'+
                        '           <a rel="toggle" aria-haspopup="1" role="button" href="#" class="uiSelectorButton uiCloseButton"></a>'+
                        '           <div class="uiSelectorMenuWrapper uiToggleFlyout">'+
                        '               <div class="uiMenu uiSelectorMenu" role="menu" style="width:150px;">'+
                        '                   <ul class="uiMenuInner">'+
                        '                       <li data-label="Disable" class="uiMenuItem favorite" id="disableUfFromFutureNav">'+
                        '                           <a href="#" role="menuitem" class="itemAnchor"><span class="itemLabel fsm">Disable</span></a>'+
                        '                       </li>'+
                        '                       <li data-label="Update" class="uiMenuItem favorite" style="display:none;">'+
                        '                           <a onclick="window.open(this.href); return false;" href="'+Params.links.update+'" role="menuitem" class="itemAnchor" id="updateUfFromFutureNav"><span class="itemLabel fsm">Update</span></a>'+
                        '                       </li>'+
                        '                   </ul>'+
                        '               </div>'+
                        '           </div>'+
                        '       </div>'+
                        '   </div>'+
                        '</div>'+
                        '<a title="'+LANG.unfriends+'" href="#/?sk=uf" class="item" onclick="return false;" id="bubblelink_unfriend_link">'+
                        '   <div class="clearfix">'+
                        '      <div class="rfloat">'+
                        '          <span class="loadingIndicator" id="loadingIndicatorUnfriends"></span>'+
                        '          <span class="count uiSideNavCount" style="display:none;">'+
                        '              <span class="countValue fss" id="bubblelink_unfriends">0</span>'+
                        '              <span class="maxCountIndicator"></span>'+
                        '          </span>'+
                        '          <span class="grip__"></span>'+
                        '      </div>'+
                        '      <div>'+
                        '          <span class="imgWrap"><i class="img spritemap_icons sx_app_icons_unfriends"></i></span>'+
                        '          <span class="linkWrap">'+LANG.unfriends+'</span><span style="display:none;" name="bubble_update">&nbsp;*</span>&nbsp;'+
                        '      </div>'+
                        '   </div>'+
                        '</a>'+
                        '<ul id="subitem-uf">'+
                        '   <li>'+
                        '       <a href="#/?sk=aw" id="UFfilterAwaitings" class="subitem">'+
                        '           <div class="clearfix">'+
                        '               <div class="rfloat">'+
                        '                   <span class="loadingIndicator" id="loadingIndicatorAwaitings"></span>'+
                        '                   <span class="count uiSideNavCount" style="display:none;"><span class="countValue fss" id="bubblelink_awaitings">0</span></span>'+
                        '               </div>'+
                        '               <div><span class="linkChild" id="UFfilterTextAwaitings">'+LANG.awaiting+'</span></div>'+
                        '           </div>'+
                        '       </a>'+
                        '   </li>'+
                        '   <li>'+
                        '       <a href="#/?sk=ufs" id="UFfilterSettings" class="subitem">'+
                        '           <div class="clearfix">'+
                        '               <div class="rfloat">'+
                        '                   <span class="loadingIndicator" id="loadingIndicatorSettings"></span>'+
                        '                   <span class="count uiSideNavCount" style="display:none;"><span class="countValue fss" id="bubblelink_messages">0</span></span>'+
                        '               </div>'+
                        '               <div><span class="linkChild" id="UFfilterTextSettings">'+LANG.settings+'</span></div>'+
                        '           </div>'+
                        '       </a>'+
                        '   </li>'+
                        '   <li>'+
                        '       <a href="#" id="UFfilterMessages" class="subitem">'+
                        '           <div class="clearfix">'+
                        '               <div class="rfloat">'+
                        '                   <span class="loadingIndicator" id="loadingIndicatorMessages"></span>'+
                        '                   <span class="count uiSideNavCount" style="display:none;"><span class="countValue fss">0</span></span>'+
                        '               </div>'+
                        '               <div><span class="linkChild" id="UFfilterTextMessages">'+LANG.messages+'</span></div>'+
                        '           </div>'+
                        '       </a>'+
                        '   </li>'+
                        '</ul>'+
                        '<span class="mover__ hidden_elem">to arrange icon</span>',
                        parentNode: parentForFilter
                    }).getElement();
                    
                    EventMgr.addListener(getFromId('bubblelink_unfriend_link'), 'click', function () { new Handler('filter'); core.getMessages(); });
                    EventMgr.addListener(getFromId('UFfilterAwaitings'), 'click', function () { (new Handler()).clickHeaderToShowAwaitings(); });
                    EventMgr.addListener(getFromId('UFfilterSettings'), 'click', function () { (new Handler()).clickHeaderToShowSettings(); });
                    EventMgr.addListener(getFromId('UFfilterMessages'), 'click', function () { (new Handler()).clickHeaderToShowMessages(); });
                    EventMgr.addListener(getFromId('disableUfFromFutureNav'), 'click', function () { 

                        if (!core.dialogs['disableFacebox']) core.dialogs['disableFacebox'] = new Facebox({
                            id: 'resetFacebox',
                            title: 'You\'re about to disable Unfriend Finder.',
                            body: new xHTMLElement({
                                element: 'div',
                                id: 'disableFaceboxBody',
                                innerHTML: ''+
                                'While disabled, the script will not track any unfriend activities, and will not be displayed at this place.'+
                                '<br /><br />If you want to re-enable the script, use the "Enable" function of the Icon-Button in the lower-right corner, near the Facebook Chat.'+
                                '<br /><br />When re-enabled, the script will alert you of all Unfriends you had when the script was disabled.',
                            }).getElement(),
                            buttons: [{
                                name: 'delete_story',
                                value: "Disable",
                                id: 'disable_button',
                                handler: function() {
                                    setKey('enabled', 'disabled');
                                    window.location.reload();
                                },
                                disabled: false,
                                closer: false,
                                type: 'blue'
                            },{
                                name: 'cancel',
                                value: LANG.btn_cancel,
                                id: 'cancel_button',
                                handler: function() { core.dialogs['disableFacebox'] = null; },
                                disabled: false,
                                closer: true,
                                type: 'gray'
                            }]
                        });
                        core.dialogs['disableFacebox'].Show();
                    });
                } 
                bubble.counterLeft = getFromId('bubblelink_unfriends');
                if (!core) return;
                bubble.setValue({value: core.getCounter()});
                if (Params.versionChanged) {
                    getFromId('navItem_unfriends').style.background = 'rgb(255, 249, 215)';
                    setTimeout(core.startFadeFilter, 2000);
                    if (getFromId('updateUfFromFutureNav')) CSS3.display(getFromId('updateUfFromFutureNav').parentNode, 'block');
                    Console.log('New version installed', 'info'); 
                }
            }
        }
    };
    bubble.createMenubarLink = function() {
        if (getFromId('fb_menu_unfriends')) {
            var fb_menu_unfriends = getFromId('fb_menu_unfriends');
            fb_menu_unfriends.parentNode.removeChild(fb_menu_unfriends);
        }
        if (!Params.settings.hideInMenubar) {
            bubble.menubar = true;

            if (getFromId('navAccount')) { 
                var navAccount = getFromId('navAccount'), pageNav = getFromId('navAccount').parentNode;
                var LI_Unfriends, DIV_jewel, DIV_Unfriends, bubble_container, A_Unfriends, SPAN_Unfriends;

                LI_Unfriends = new xHTMLElement({
                    element: 'li',
                    id: 'fb_menu_unfriends'
                }).getElement();

                DIV_jewel = new xHTMLElement({
                    element: 'div',
                    className: 'fbJewel hasNew',
                    parentNode: LI_Unfriends
                }).getElement();

                DIV_Unfriends = new xHTMLElement({
                    element: 'div',
                    style: { position: 'relative' },
                    parentNode: DIV_jewel
                }).getElement();

                bubble_container = new xHTMLElement({
                    element: 'div',
                    id: 'bubble_container',
                    parentNode: DIV_Unfriends
                }).getElement();

                Console.log('Creating menubar link');
                A_Unfriends = new xHTMLElement({
                    element: 'a',
                    id: 'nav_unfriends',
                    innerHTML: '<span id="title_unfriends">'+LANG.unfriends+'</span><span style="display:none;" name="bubble_update">&nbsp;*&nbsp;</span>',
                    parentNode: DIV_Unfriends,
                    listeners: {
                        click: function() { 
                            try {
                                if (getFromId('sideNav')) {
                                    if (getFromId('navItem_unfriends')) new Handler('filter');
                                    else core.href(Params.protocol+'//www.facebook.com/?sk=uf');
                                }
                                else core.href(Params.protocol+'//www.facebook.com/?sk=uf');
                            }
                            catch (ex) { return false; }
                            return false;
                        }
                    }
                }).getElement();
                if (Params.env.isFirefox) {
                    A_Unfriends.setAttribute('href', Params.protocol+'//www.facebook.com/?sk=uf');
                    A_Unfriends.setAttribute('onclick', 'return false;');
                }

                SPAN_Unfriends = new xHTMLElement({
                    element: 'span',
                    id: 'SPAN_Unfriends',
                    className: 'jewelCount',
                    style: {
                        zIndex: '101'
                    },
                    parentNode: bubble_container
                }).getElement();

                bubble.counterMenubar = new xHTMLElement({
                    element: 'span',
                    id: 'SPAN_Unfriends_Count',
                    parentNode: SPAN_Unfriends
                }).getElement();

                pageNav.removeChild(navAccount);
                pageNav.appendChild(LI_Unfriends);
                pageNav.appendChild(navAccount);
                EventMgr.addListener(getFromId('pageNav'), 'DOMNodeInserted', function() {
                    var maxWidth = 465;
                    if (getFromId('pageNav').offsetWidth > maxWidth) {
                        var delta = (getFromId('pageNav').offsetWidth - maxWidth);
                        getFromId('q').style.width = (265-delta)+'px';
                        getFromId('navSearch').style.width = (300-delta)+'px';
                    } 
                });
            }
        }
        else bubble.menubar = false;
    };
    bubble.setValue = function(__constructor) {
        bubble.value = $value = (__constructor.value?__constructor.value:0);
        Console.log('Setting bubble value to '+__constructor.value);

        if (bubble.counterMenubar) {
            bubble.counterMenubar.innerHTML = bubble.value;
            if (__constructor.value === 0) CSS3.hide(getFromId('SPAN_Unfriends'));
            else CSS3.display(getFromId('SPAN_Unfriends'), 'block');
        }
        
        if (bubble.counterLeft) {
            bubble.counterLeft.innerHTML = bubble.value;
            if (__constructor.value === 0) CSS3.hide(bubble.counterLeft.parentNode);
            else CSS3.display(bubble.counterLeft.parentNode, 'inline');
        }

    };
    bubble.getValue = function() {
        return bubble.value;
    }
    bubble.markUpdate = function() {
        var bubbles = document.getElementsByName('bubble_update');
        var n;
        for (n = 0;n<bubbles.length;n++) {
            if (bubbles[n]) CSS3.display(bubbles[n], 'inline');
        }
    };
    bubble.toString = function() { return '[object Bubble]'; }

    bubble.build();
};

var UnfriendFinderBox = function() {
    var ufbox = this;
    ufbox.box;

    ufbox.build = function() {
        Console.log('Building Unfriend Finder Box');
        if (getFromId('pagelet_unfriendfinder')) return;
        ufbox.box = new xHTMLElement({
            element: 'div',
            id: 'pagelet_unfriendfinder',
            innerHTML: template.UnfriendFinderBox()
        }).getElement();
        Console.log('Showing Unfriend Finder Box');
        ufbox.show();

        if ((Params.newVersion) && (getFromId('pagelet_newversion'))) {
            getFromId('pagelet_newversion').innerHTML = LANG.notif_version+' <a onclick="window.open(this.href); return false;" href="'+Params.links.update+'">'+LANG.here+'</a>.';
            CSS3.display(getFromId('pagelet_newversion'), 'block');
        }
        if (!Params.settings.hidedonation) {
            Params.settings.hidedonation = false;
            CSS3.display(getFromId('uf_donation', 'block'));
        }
        else CSS3.hide(getFromId('uf_donation'));

        if (getKey(core.user_id+'_usage', '0') % 20 != 1) CSS3.display(getFromId('uf_donation', 'block'));
        
        core.applyFanGroupStatus();
        helps = eval(getKey(core.user_id + '_helps', '({})'));

    };
    
    ufbox.show = function() {
        if (getFromId('rightCol')) getFromId('rightCol').insertBefore(ufbox.box, getFromId('rightCol').firstChild);
        core.reValidateLang();
        void(r = rand(122));
        var s = (r % 6);
        if ((!Params.settings.hidedonation) && (s == 3)) s = 1;
        if (s == 1) CSS3.display(getFromId('ufPageIMG'), 'block');
        else if (s == 2) CSS3.display(getFromId('ufTwitterIMG'), 'block');
        else if (s == 3) CSS3.display(getFromId('ufGroupIMG'), 'block');
        else if (s == 4) {
            CSS3.display(getFromId('ufForumIMG'), 'block');
            CSS3.hide(getFromId('ufCommunityText'));
            CSS3.display(getFromId('ufForumText'), 'inline'); 
        }
        else {
            CSS3.display(getFromId('ufDonateIMG'), 'block');
            CSS3.hide(getFromId('ufCommunityText'));
            CSS3.hide(getFromId('uf_donation'));
            CSS3.display(getFromId('ufDonateText'), 'block')
        }
        getFromId('like_box').src = Params.protocol+'//www.facebook.com/plugins/likebox.php?id=173714342679390&width=244&connections=8&stream=false&header=false&height=300';
    };
    ufbox.toString = function() { return '[object UnfriendFinderBox]'; }

    ufbox.build();
};

var Handler = function($target, $extra) {
    var handler = this;

    handler.updateSelectedFilters = function(_id) {
        if (!getFromId('sideNav')) return;
        var filters = document.getElementsByTagName('li'), filtersToWatch = {}, n;
        for (n = 0;n<filters.length;n++) {
            if (filters[n]) {
                filter = filters[n];
                if (/navItem_/.test(filter.id)) {
                    if (filter.id == _id) {
                        CSS3.addClass(filter, 'selectedItem opened');
                        CSS3.addClass(document.body, 'uflist fixedBody ');
                        CSS3.removeClass(document.body, 'nonuflist');
                    }
                    else {
                        CSS3.removeClass(filter, 'selectedItem opened open'); 
                        if (Params.env.isWebkit) filtersToWatch[filter.id] = filter;
                        else handler.reSelect(filter, true);
                    }
                }
            }
        } 
        var bookmarksNavs = document.getElementsByClassName('bookmarksNavSeeAll'), n;
        for (n = 0;n<bookmarksNavs.length;n++) {
            if (bookmarksNavs[n]) {
                filter = bookmarksNavs[n];
                if (/bookmarksNavSeeAll/.test(filter.className)) {
                    CSS3.removeClass(filter, 'selectedItem opened open'); 
                    if (Params.env.isWebkit) filtersToWatch['bookmark'+n] = filter;
                    else handler.reSelect(filter, false);
                }
            }
        } 
        if (Params.env.isWebkit) {
            if (!core.watchingFilters) {
                handler.watchFilters(filtersToWatch);
                core.watchingFilters = true;
            }
        }
    };

    handler.reSelect = function(f, b) {
        EventMgr.addListener(f, 'DOMAttrModified', function() {
            if ((/selected/.test(f.className)) && (b)) handler.hideUnfriendLayer('reselect', f);
            else if ((/bookmarksNavSeeAll/.test(f.className)) && (!b)) handler.hideUnfriendLayer('reselect', f);
        });
    };

    handler.watchFilters = function($object) {
        if (core.stopWatchingFilter) return; 
        var n;
        for (n in $object) {
            if ($object.hasOwnProperty(n)) {
                if (/selected/.test($object[n].className)) handler.hideUnfriendLayer('watchfilters', $object[n]);
                else if (/bookmarksNavSeeAll/.test($object[n].className)) handler.hideUnfriendLayer('watchfilters', $object[n]);
            }
        }
        Console.log('setTimeout handler.watchFilters($object);');
        setTimeout(function() { handler.watchFilters($object); }, 200);
    }

    handler.hideUnfriendLayer = function($from, $element) {
        if (getFromId('navItem_unfriends')) {
            Console.log('hideUnfriendLayer '+$from); 
            core.stopWatchingFilter = true;
            core.watchingFilters = false;
            CSS3.addClass(document.body, 'nonuflist');
            CSS3.removeClass(document.body, 'uflist fixedBody ');
            CSS3.setClass(getFromId('navItem_unfriends'), 'sideNavItem closed');
            CSS3.setClass(getFromId('UFfilterAwaitings').parentNode, ''); 
            CSS3.setClass(getFromId('UFfilterSettings').parentNode, ''); 
            CSS3.setClass(getFromId('UFfilterMessages').parentNode, '');
            setTimeout(function() { core.stopWatchingFilter = false; }, 1000);
        }
        setTimeout(handler.reBind, 1000);
    };

    handler.reBind = function() {
        if ((!Params.env.isChrome) && getFromId('navItem_unfriends')) {
            i = getFromId('navItem_unfriends').innerHTML;
            getFromId('navItem_unfriends').innerHTML = i;
            EventMgr.addListener(getFromId('bubblelink_unfriend_link'), 'click', function () { new Handler('filter'); core.getMessages(); });
            EventMgr.addListener(getFromId('UFfilterAwaitings'), 'click', function () { (new Handler()).clickHeaderToShowAwaitings(); });
            EventMgr.addListener(getFromId('UFfilterSettings'), 'click', function () { (new Handler()).clickHeaderToShowSettings(); });
            EventMgr.addListener(getFromId('UFfilterMessages'), 'click', function () { (new Handler()).clickHeaderToShowMessages(); });
        }
    }

    handler.showUnfriendLayer = function() {
        if ((getFromId('navItem_unfriends')) && (/selected/.test(getFromId('navItem_unfriends').className))) return;
        if ((!handler.showingSettings) && (getFromId('navItem_unfriends'))) CSS3.setClass(getFromId('navItem_unfriends'), 'sideNavItem selectedItem opened');
        new UnfriendFinderBox();

        handler.updateSelectedFilters('navItem_unfriends');

        if (!handler.showingSettings) {
            CSS3.display(getFromId('loadingIndicatorUnfriends'), 'inline-block');
            CSS3.hide(getFromId('bubblelink_unfriends'));
        }
        CSS3.addClass(getFromId('mainContainer'), 'hasRightCol');
        CSS3.hide(getFromId('contentArea'));

        if (!getFromId('contentUnfriends')) {
            getFromId('contentCol').insertBefore(new xHTMLElement({
                element: 'div',
                id: 'contentUnfriends',
                style: {
                    width: '505px',
                    paddingLeft: '15px',
                    cssFloat: 'left',
                    display: 'table-cell'
                }
            }).getElement(), getFromId('contentArea'));
        }

        div = getFromId('contentUnfriends');
        div.innerHTML = template.header()+'<div id="homeUnfriends">'+template.UnfriendLists()+'</div>';
        CSS3.display(getFromId('pagelet_unfriendfinder'), 'block');
        CSS3.display(div, 'table-cell');
        if (core.getKeyError) CSS3.display(getFromId('unfriendsError'), 'block');

        var temp = getFromId('pagelet_unfriendfinder').innerHTML;
        getFromId('rightCol').innerHTML = '';
        pagelet_unfriendfinder = new xHTMLElement({
            element: 'div',
            style:{ display: 'block' },
            innerHTML: temp,
            parentNode: getFromId('rightCol')
        }).getElement();
        if (getFromId('headerArea')) {
            CSS3.setClass(getFromId('headerArea'), 'hidden_elem');
            getFromId('headerArea').innerHTML = '';
        }

        if (!helps.tutorial) {
            EventMgr.addListener(getFromId('unfriendFinder_message_close'), 'click', function() {
                CSS3.hide(getFromId('unfriendFinder_message'));
                helps = eval(getKey(core.user_id + '_helps', '({})'));
                helps.tutorial = true;
                setKey(core.user_id+'_helps', stringify(helps)); 
            });
            getFromId('unfriendFinder_message_content').innerHTML = '<span class="en_US">If you are new to Unfriend Finder,<br /><a href="#" id="takeTutorialEn">take the quick tutorial !</a></span><span class="fr_FR">Si Unfriend Finder vous est encore inconnu,<br /><a href="#" id="takeTutorialFr">lisez le tutoriel !</a></span>'
            
            EventMgr.addListener(getFromId('takeTutorialEn'), 'click', core.loadWelcomeFacebox);
            EventMgr.addListener(getFromId('takeTutorialFr'), 'click', core.loadWelcomeFacebox);
        }
        else CSS3.hide(getFromId('unfriendFinder_message'));
        
        handler.setUFHeader('unfriends');
        if (!handler.showingSettings) setTimeout(core.showUnfriends, 500);
        core.bindHide();

    }

    handler.setUFHeader = function($type) {
        if (!getFromId('title_header')) return;
        var n, i;

        i = getFromId('awaitingsLink').parentNode.innerHTML;
        getFromId('awaitingsLink').parentNode.innerHTML = i;
        switch ($type) {
            case 'unfriends' :
                n = core.keepAwaitingList.Count();
                CSS3.setClass(getFromId('iconHeader'), 'uiHeaderImage img spritemap_9mvze7 spritemap_app_icons  sx_app_icons_unfriends');
                getFromId('title_header').innerHTML = Params._0x4d22;
                getFromId('awaitingsLink').innerHTML = LANG.awaiting;
                EventMgr.addListener(getFromId('awaitingsLink'), 'click', handler.clickHeaderToShowAwaitings);
                getFromId('awaitingsLink').href = '#/?sk=uf';
                break;
            case 'awaitings' :
                n = core.getCounter();
                CSS3.setClass(getFromId('iconHeader'), 'uiHeaderImage img spritemap_9mvze7 spritemap_app_icons sx_app_icons_awaitings');
                getFromId('title_header').innerHTML = LANG.awaiting;
                getFromId('awaitingsLink').innerHTML = LANG.unfriends;
                EventMgr.addListener(getFromId('awaitingsLink'), 'click', handler.clickHeaderToShowUnfriends);
                getFromId('awaitingsLink').href = '#/?sk=aw';
                break;
            case 'settings' :
                n = 0;
                CSS3.setClass(getFromId('iconHeader'), 'uiHeaderImage img spritemap_9mvze7 spritemap_app_icons sx_app_icons_settings');
                getFromId('title_header').innerHTML = LANG.settings;
                getFromId('awaitingsLink').innerHTML = LANG.help;
                getFromId('awaitingsLink').href = 'http://www.unfriendfinder.com/help'; 
                break;
            case 'messages' :
                n = 0;
                CSS3.setClass(getFromId('iconHeader'), 'uiHeaderImage img sx_app_icons_message');
                getFromId('title_header').innerHTML = LANG.messages;
                getFromId('awaitingsLink').innerHTML = LANG.help;
                getFromId('awaitingsLink').href = 'http://www.unfriendfinder.com/help'; 
                break;
            case 'about' :
                n = 0;
                CSS3.setClass(getFromId('iconHeader'), 'uiHeaderImage img sx_app_icons_message');
                getFromId('title_header').innerHTML = 'About';
                getFromId('awaitingsLink').innerHTML = LANG.help;
                getFromId('awaitingsLink').href = 'http://www.unfriendfinder.com/help'; 
                break;
        }
        if (getFromId('reset_donation')) EventMgr.addListener(getFromId('reset_donation'), 'click', function() {
            Params.settings.hidedonation = true;
            setKey('settings', stringify(Params.settings));
            CSS3.hide(getFromId('uf_donation')); 
        });
        if (getFromId('chgLang')) EventMgr.addListener(getFromId('chgLang'), 'click', function() { 
            setKey('language', suggestLocale);
            core.reloadPage();
        });
        if (getFromId('close_pagelet_language')) EventMgr.addListener(getFromId('close_pagelet_language'), 'click', function() {
            helps = eval(getKey(core.user_id + '_helps', '({})'));
            helps.change_language = true; 
            setKey(core.user_id + '_helps', stringify(helps));
            CSS3.hide(getFromId('pagelet_language'));
        });
        EventMgr.addListener(getFromId('settingsLink'), 'click', handler.clickHeaderToShowSettings);
        if (!n) CSS3.hide(getFromId('BubbleCountUF').parentNode.parentNode);
        else CSS3.display(getFromId('BubbleCountUF').parentNode.parentNode ,'inline-block');
        getFromId('BubbleCountUF').innerHTML = (!n?'0':n);
    };

    handler.clickHeaderToShowUnfriends = function() {
        if ((getCoreFilter()) && (getFromId('navItem_unfriends'))) {
            CSS3.display(getFromId('loadingIndicatorUnfriends'), 'inline-block');
            CSS3.hide(getFromId('loadingIndicatorAwaitings'));
            CSS3.hide(getFromId('loadingIndicatorMessagess')); 
            CSS3.hide(getFromId('bubblelink_unfriends'));
            CSS3.display(getFromId('bubblelink_awaitings'), 'inline');
            CSS3.display(getFromId('bubblelink_messages'), 'inline'); 
            CSS3.setClass(getFromId('navItem_unfriends'), 'sideNavItem selectedItem opened');
            CSS3.setClass(getFromId('UFfilterAwaitings').parentNode, ''); 
            CSS3.setClass(getFromId('UFfilterSettings').parentNode, ''); 
            CSS3.setClass(getFromId('UFfilterMessages').parentNode, '');
            core._showUnfriends();
            core.showUnfriends();
            handler.setUFHeader('unfriends');
            CSS3.display(getFromId('UFLists'), 'block');
            CSS3.hide(getFromId('UFSettings'));
            CSS3.hide(getFromId('UFMessages'));
            CSS3.addClass(document.body, 'uflist fixedBody ');
            CSS3.removeClass(document.body, 'nonuflist');
        }
    };

    handler.clickHeaderToShowAwaitings = function() {
        if ((getCoreFilter()) && (getFromId('navItem_unfriends'))) {
            if (/selectedItem/.test(getFromId('UFfilterAwaitings').parentNode.className)) return;
            CSS3.display(getFromId('loadingIndicatorAwaitings'), 'inline-block');
            CSS3.hide(getFromId('loadingIndicatorUnfriends'));
            CSS3.hide(getFromId('loadingIndicatorMessagess'));
            CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
            CSS3.hide(getFromId('bubblelink_awaitings'));
            CSS3.display(getFromId('bubblelink_messages'), 'inline'); 
            CSS3.setClass(getFromId('navItem_unfriends'), 'sideNavItem opened');
            CSS3.setClass(getFromId('UFfilterAwaitings').parentNode, 'selectedItem'); 
            CSS3.setClass(getFromId('UFfilterSettings').parentNode, ''); 
            CSS3.setClass(getFromId('UFfilterMessages').parentNode, '');
            core._showAwaitings();
            core.showAwaitingRequests();
            handler.setUFHeader('awaitings');
            CSS3.display(getFromId('UFLists'), 'block');
            CSS3.hide(getFromId('UFSettings'));
            CSS3.hide(getFromId('UFMessages'));
            CSS3.addClass(document.body, 'uflist fixedBody ');
            CSS3.removeClass(document.body, 'nonuflist');
            try { core.dialogs['awaitingsContextual'].Hide(); } catch (ex) { ; }
        }
    };

    handler.clickHeaderToShowSettings = function() {
        if ((getCoreFilter()) && (getFromId('navItem_unfriends'))) {
            if (/selectedItem/.test(getFromId('UFfilterSettings').parentNode.className)) return;
            CSS3.hide(getFromId('loadingIndicatorAwaitings')); 
            CSS3.hide(getFromId('loadingIndicatorUnfriends')); 
            CSS3.hide(getFromId('loadingIndicatorMessagess')); 
            CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
            CSS3.display(getFromId('bubblelink_awaitings'), 'inline');
            CSS3.display(getFromId('bubblelink_messages'), 'inline'); 
            handler.showingSettings = true;
            handler.showUnfriendLayer();
            CSS3.setClass(getFromId('navItem_unfriends'), 'sideNavItem opened');
            CSS3.setClass(getFromId('UFfilterAwaitings').parentNode, '');
            CSS3.setClass(getFromId('UFfilterSettings').parentNode, 'selectedItem');
            CSS3.setClass(getFromId('UFfilterMessages').parentNode, '');
            handler.setUFHeader('settings'); 
            core.settings.bindSettings();
            CSS3.hide(getFromId('UFLists'));
            CSS3.display(getFromId('UFSettings'), 'block');
            CSS3.hide(getFromId('UFMessages'));
            handler.showingSettings = false;
            CSS3.addClass(document.body, 'uflist fixedBody');
            CSS3.removeClass(document.body, 'nonuflist');
            try { core.dialogs['awaitingsContextual'].Hide(); } catch (ex) { ; }

            //For Settings
            noop = new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: Params.links.rsrc+'/z7FGL/hash/ys9cv6ix.css',
                id: 'ys9cv6ix',
                rel: 'stylesheet',
                parentNode: document.querySelectorAll("head")[0]
            });
        }
    }

    handler.clickHeaderToShowMessages = function() {
        if ((getCoreFilter()) && (getFromId('navItem_unfriends'))) {
            CSS3.hide(getFromId('loadingIndicatorAwaitings')); 
            CSS3.hide(getFromId('loadingIndicatorUnfriends')); 
            CSS3.hide(getFromId('loadingIndicatorSettings')); 
            CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
            CSS3.display(getFromId('bubblelink_awaitings'), 'inline');
            CSS3.display(getFromId('bubblelink_messages'), 'inline');
            CSS3.setClass(getFromId('navItem_unfriends'), 'sideNavItem opened');
            CSS3.setClass(getFromId('UFfilterAwaitings').parentNode, '');
            CSS3.setClass(getFromId('UFfilterSettings').parentNode, '');
            CSS3.setClass(getFromId('UFfilterMessages').parentNode, 'selectedItem'); 
            handler.setUFHeader('messages'); 
            core.showMessages();
            CSS3.hide(getFromId('UFLists'));
            CSS3.hide(getFromId('UFSettings'));
            CSS3.display(getFromId('UFMessages'), 'block');
            CSS3.addClass(document.body, 'uflist fixedBody');
            CSS3.removeClass(document.body, 'nonuflist');
            try { core.dialogs['awaitingsContextual'].Hide(); } catch (ex) { ; }
        }
    }

    if ($target) Console.log('  Handler for '+$target);

    if ($target == 'filter') {
        if ((getCoreFilter()) && (getFromId('navItem_unfriends'))) {
            handler.showUnfriendLayer(); 
            CSS3.setClass(getFromId('navItem_unfriends'), 'sideNavItem selectedItem opened');
            CSS3.setClass(getFromId('UFfilterAwaitings').parentNode, '');
            CSS3.setClass(getFromId('UFfilterSettings').parentNode, '');
            CSS3.setClass(getFromId('UFfilterMessages').parentNode, '');
            CSS3.display(getFromId('UFLists'), 'block');
            CSS3.hide(getFromId('UFSettings'));
            CSS3.addClass(document.body, 'uflist fixedBody');
            CSS3.removeClass(document.body, 'nonuflist');
        }
        if (core.dialogs['filterContextual']) {
            CSS3.hide(getFromId('callout_dialog_filterContextual'));
            helps.filter = true;
            setKey(core.user_id+'_helps', stringify(helps)); 
        }
    }

    handler.toString = function() { return '[object Handler]'; }

};

var Overlay = function(__constructor) {
    var overlay = this;
    Extend(overlay, __constructor);

    overlay.element;
    overlay.timeout;
    overlay.types = {
        'light': true,
        'dark': true
    };

    overlay.Build = function() {
        overlay.element = new xHTMLElement({
            element: 'div',
            id: 'generic_dialog_overlay',
            className: (overlay.types[overlay.type]?__constructor.type:'light')+'_dialog_overlay',
            style: {
                opacity: 0,
                zIndex: 104
            },
            parentNode: document.body
        }).getElement();

        return overlay; 
    }
    overlay.VeryHide = function() {
        overlay.element.style.opacity = 0;
        overlay.element.style.display = 'none';
    }
    overlay.Show = function() {
        CSS3.display(overlay.element, 'block');
        if (overlay.timeout) clearTimeout(overlay.timeout);
        Console.log('setTimeout overlay.fadeIn');
        overlay.timeout = setTimeout(overlay.fadeIn, 10);
    }
    overlay.Hide = function() {
        if (document.getElementsByClassName('uf_dialog').length <= 1) {
            if (overlay.timeout) clearTimeout(overlay.timeout);
            Console.log('setTimeout overlay.fadeOut'); 
            overlay.timeout = setTimeout(overlay.fadeOut, 10); 
        }
    }
    overlay.fadeIn = function() {
        if (overlay.element.style.opacity >= 0.5) return;
        overlay.element.style.opacity = parseFloat(overlay.element.style.opacity) + Params.Facebox.Fades.Step; 
        Console.log('setTimeout overlay.timeout fadeIn');
        overlay.timeout = setTimeout(overlay.fadeIn, Params.Facebox.Fades.Timer);
    }
    overlay.fadeOut = function() {
        if (overlay.element.style.opacity <= parseFloat(0.03)) {
            CSS3.hide(overlay.element);
            return;
        }
        overlay.element.style.opacity = parseFloat(overlay.element.style.opacity) - Params.Facebox.Fades.Step;
        Console.log('setTimeout overlay.timeout fadeOut'); 
        overlay.timeout = setTimeout(overlay.fadeOut, Params.Facebox.Fades.Timer);
    }
    overlay.toString = function() { return '[object Overlay]'; }

    overlay.Build();
    return overlay;
}

var Facebox = function(__constructor) {
    var facebox = this;
    Extend(facebox, __constructor);

    if ((!facebox.id) || (!facebox.title) || (!facebox.body)) {
        throw (new Error('Facebox() : Please give ID, Title and Body in object constructor'))
        return;
    }
    if (getFromId('contextual_dialog_'+facebox.id)) return; 
    facebox.defaultButton = {
        name: 'hide',
        value: LANG.btn_close,
        id: 'hide_button',
        handler: function() { void(0); },
        disabled: false,
        closer: true,
        type: 'blue'
    };

    if (!facebox.buttons) facebox.buttons = [facebox.defaultButton];

    facebox.Build = function() {
        var content = (getFromId('content')?getFromId('content'):document.body);
        facebox.window = new xHTMLElement({
            element: 'div',
            id: 'dialog_'+facebox.id,
            className: 'generic_dialog uf_dialog pop_dialog'+(facebox.error?' dialog_error':'')+(facebox.header?' header':''),
            style: {
                position: 'fixed',
                opacity: (facebox.fade?0:1)
            },
            innerHTML: ''+
            '<div class="generic_dialog_popup" style="top: 125px; display:inherit;">'+
            '    <div class="pop_container_advanced">'+
            '        <div class="pop_content">'+
            '            <h2 id="dialog_h2_'+facebox.id+'" class="dialog_title'+(facebox.indicator ? ' loading' : '')+'">'+
            '                <span id="dialog_title_'+facebox.id+'"></span>'+
            '            </h2>'+
            '            <div class="dialog_content">'+
            '               <div style="display: none; padding: 0pt;" class="uf_dialog_header dialog_body">'+
            '                  <div>'+
            '                      <img alt="Unfriend Finder" src="'+Params.images.fanImage+'?type=normal" style="width: 80px;" bindpoint="icon">'+
            '                      <span style="color: rgb(51, 51, 51); display: block; float: right; width: 500px; font-size: xx-large; padding-top: 25px; font-weight: bold;">Unfriend Finder</span>'+
            '                  </div>'+
            '               </div>'+
            '               <div class="dialog_body" id="dialog_content_'+facebox.id+'" style="display:none; '+facebox.bodyStyle+'">'+
            '                   <div class="clearfix">'+
            (facebox.picture?'                       <img class="UIImageBlock_Image UIImageBlock_MED_Image img" src="'+facebox.picture+'">':'')+
            '                       <div class="UIImageBlock_Content UIImageBlock_MED_Content" id="dialog_body_'+facebox.id+'"></div>'+
            '                   </div>'+
            '               </div>'+
            '               <div class="dialog_buttons" id="dialog_buttons_'+facebox.id+'">'+
            '                   <span id="dialog_hint_'+facebox.id+'" style="color:#888888; font-size:12px; float:left; padding-top:5px; padding-left:1px; cursor:default;"></span>'+
            '               </div>'+
            '            </div>'+
            '        </div>'+
            '    </div>'+
            '</div>'
        }).getElement();

        content.insertBefore(facebox.window, content.firstChild);

        var j = facebox.buttons.length;
        var i;
        for (i=0;i<j;i++) {
            var span = new xHTMLElement({
                element: 'span',
                className: 'uiButton uiButtonLarge',
                parentNode: getFromId('dialog_buttons_'+facebox.id)
            }).getElement();

            if (facebox.buttons[i].type == 'green') CSS3.addClass(span, 'uiButtonSpecial UIButton_Green');
            else if (facebox.buttons[i].type == 'gray') CSS3.addClass(span, 'UIButton_Gray uiButtonDefault');
            else CSS3.addClass(span, 'UIButton_Blue uiButtonConfirm');

            var button = new xHTMLElement({
                element: 'input',
                className: 'UIButton_Text',
                type: 'button',
                name: facebox.buttons[i].name,
                value: facebox.buttons[i].value,
                disabled: facebox.buttons[i].disabled,
                parentNode: span,
                listeners: {
                    click: facebox.buttons[i].handler
                }
            }).getElement();
            if (facebox.buttons[i].closer) EventMgr.addListener(button, 'click', facebox.Hide);
        }

        CSS3.display(getFromId('dialog_content_'+facebox.id), 'block');
        return facebox;
    };
    facebox.Destroy = function() {
        try {
            (getFromId('content')?getFromId('content'):document.body).removeChild(facebox.window);
        }
        catch (exception) { ; }
    };
    facebox.Show = function() {
        try {
            if (facebox.overlay) facebox.overlay.Show();
            facebox.fadeIn();
        }
        catch (exception) { ; }
    };
    facebox.fadeIn = function() {
        if (!facebox.fade) {
            if (facebox.loading) setTimeout(facebox.ShowEnd, facebox.timeout);
            else facebox.ShowEnd();
            facebox.window.style.opacity = 1;
            return facebox;
        }
        else {
            if (facebox.window.style.opacity >= 1) {
                if (facebox.loading) setTimeout(facebox.ShowEnd, facebox.timeout);
                else facebox.ShowEnd();
                return facebox;
            }
            facebox.window.style.opacity = parseFloat(facebox.window.style.opacity) + Params.Facebox.Fades.Step;
            setTimeout(facebox.fadeIn, Params.Facebox.Fades.Timer);
        } 
    };
    facebox.ShowEnd = function() {
        getFromId("dialog_body_"+facebox.id).innerHTML = '';
        if (facebox.body.id) getFromId("dialog_body_"+facebox.id).appendChild(facebox.body);
        else getFromId("dialog_body_"+facebox.id).innerHTML = facebox.body;
        getFromId("dialog_title_"+facebox.id).innerHTML = facebox.title;
        CSS3.setClass(getFromId('dialog_content_'+facebox.id).parentNode, 'dialog_content');
        CSS3.setClass(getFromId("dialog_h2_"+facebox.id), 'dialog_title');
        if (typeof facebox.afterLoad == 'function') facebox.afterLoad();
        if (facebox.hint) getFromId('dialog_hint_'+facebox.id).innerHTML = facebox.hint;
    };
    facebox.showReset = function() {
        getFromId("dialog_body_"+facebox.id).innerHTML = 'Resetting...';
        CSS3.setClass(getFromId('dialog_content_'+facebox.id).parentNode, 'dialog_loading');
        getFromId('dialog_content_'+facebox.id).style.borderBottom = 'none';
        getFromId('dialog_buttons_'+facebox.id).innerHTML = '';
        setTimeout(facebox.Hide, 2000); 
    };
    facebox.Hide = function() {
        if (facebox.overlay) facebox.overlay.Hide();
        facebox.fadeOut();
    },
    facebox.fadeOut = function() { 
        if (!facebox.fade) facebox.Destroy();
        else {
            if (facebox.window.style.opacity <= parseFloat(0.03)) { facebox.Destroy(); return facebox; }
            facebox.window.style.opacity = parseFloat(facebox.window.style.opacity) - Params.Facebox.Fades.Step; 
            setTimeout(facebox.fadeOut, Params.Facebox.Fades.Timer);
        } 
    };

    Facebox.prototype.valueOf = function() {
        return facebox.me;
    };
    Facebox.prototype.getButton = function($i) {
        return facebox.buttons[$i];
    };

    facebox.Build();

    if (facebox.buttons.length == 0) {
        getFromId('dialog_buttons_'+facebox.id).parentNode.removeChild(getFromId('dialog_buttons_'+facebox.id));
        getFromId('dialog_content_'+facebox.id).style.borderBottom = 'none';
    }

    getFromId('dialog_title_'+facebox.id).innerHTML = facebox.title;

    if (facebox.loading) {
        getFromId("dialog_body_"+facebox.id).innerHTML = 'Loading...';
        CSS3.setClass(getFromId('dialog_content_'+facebox.id).parentNode, 'dialog_loading');
    }
    else {
        if (facebox.body.id) getFromId("dialog_body_"+facebox.id).appendChild(facebox.body);
        else getFromId("dialog_body_"+facebox.id).innerHTML = facebox.body;
        CSS3.setClass(getFromId('dialog_content_'+facebox.id).parentNode, 'dialog_content');
    } 

    facebox.toString = function() { return '[object Facebox]'; }

    return this;
};

var WelcomeBox = function(__constructor) {
    var welcomebox = this;
    Extend(welcomebox, __constructor);

    if ((!welcomebox.id) || (!welcomebox.body)) {
        throw (new Error('WelcomeBox() : Please give ID, Title and Body in object constructor'))
        return;
    }
    if (getFromId('contextual_dialog_'+welcomebox.id)) return; 
    welcomebox.defaultButton = {
        name: 'hide',
        value: LANG.btn_close,
        id: 'hide_button',
        handler: function() { void(0); },
        disabled: false,
        closer: true,
        type: 'blue'
    };

    if (!welcomebox.buttons) welcomebox.buttons = [welcomebox.defaultButton];
    if (welcomebox.loading) welcomebox.load = true;

    core.overlay = new Overlay({
        id: 'overlayLight',
        type: 'dark'
    });
    core.overlay.Show();

    welcomebox.Build = function() {
        var content = (getFromId('content')?getFromId('content'):document.body);
        welcomebox.window = new xHTMLElement({
            element: 'div',
            id: 'dialog_'+welcomebox.id,
            className: 'generic_dialog uf_dialog pop_dialog'+(welcomebox.error?' dialog_error':'')+(welcomebox.header?' header':''),
            style: {
                position: 'fixed',
                opacity: (welcomebox.fade?0:1)
            },
            innerHTML: ''+
            '<div class="generic_dialog_popup" style="top: 50px; display:inherit;">'+
            '    <div class="pop_container_advanced">'+
            '        <div class="pop_content">'+
            '            <h2 style="cursor:move;" id="dialog_h2_'+welcomebox.id+'" class="dialog_title'+(welcomebox.indicator ? ' loading' : '')+'">'+
            '                <div style="float: right; clear: both; position: relative; top: 7px; left: -7px;">'+
            '                   <span style="display:none; color:white; font-size:x-small; font-weight:normal; margin-top:-4px; cursor:pointer;" id="dialog_header_close_'+welcomebox.id+'">'+LANG.btn_close+'</span>'+
            '                </div>'+
            '                <span id="dialog_title_'+welcomebox.id+'"></span>'+
            '            </h2>'+
            '            <div class="dialog_content">'+
            '               <div style="display: none; padding: 0pt;" class="uf_dialog_header dialog_body">'+
            '                  <div>'+
            '                      <img alt="Unfriend Finder" src="'+Params.images.fanImage+'?type=normal" style="width: 80px; margin-left: 8px" bindpoint="icon">'+
            '                      <span style="color: rgb(51, 51, 51); display: block; float: right; width: 500px; font-size: xx-large; padding-top: 25px; font-weight: bold;">Unfriend Finder</span>'+
            '                  </div>'+
            '               </div>'+
            '               <div class="dialog_body" id="dialog_content_'+welcomebox.id+'" style="overflow:hidden; display:none; padding:0px; '+welcomebox.bodyStyle+'">'+
            '                   <ul class="flat uf_cards" id="uf_cards" style="left:0px">'+
            '                       <li style="padding:10px;" id="welcomeBox_card1"></li>'+
            '                       <li style="padding:10px;" id="welcomeBox_card2"></li>'+
            '                       <li style="padding:10px;" id="welcomeBox_card3"></li>'+
            '                       <li style="padding:10px;" id="welcomeBox_card4"></li>'+
            '                       <li style="padding:10px;" id="welcomeBox_card5"></li>'+
            '                       <li style="padding:10px;" id="welcomeBox_card6"></li>'+
            '                   </ul>'+
            '               </div>'+
            '               <div class="dialog_buttons" id="dialog_buttons_'+welcomebox.id+'">'+
            '                   <span style="display: inline-block; width: 100px; font-weight:bold; float:left; margin-top: 5px; background: none repeat scroll 0% 0% rgb(237, 239, 244); border: 1px solid rgb(49, 78, 143); height: 12px; font-size: 10px; line-height: 11px;">'+
            '                       <span id="welcome_progress" style="display: inline-block; float: left; background: none repeat scroll 0% 0% rgb(99, 123, 173); height: 12px; width: 0%; color: rgb(237, 239, 244); text-shadow: 0pt 1px 3px black ! important; text-align: left; font-size: 11px;">0%</span>'+
            '                   </span>'+
            '               </div>'+
            '            </div>'+
            '        </div>'+
            '    </div>'+
            '</div>'
        }).getElement();

        content.insertBefore(welcomebox.window, content.firstChild);

        var j = welcomebox.buttons.length;
        var i;
        for (i=0;i<j;i++) {
            var span = new xHTMLElement({
                element: 'span',
                className: 'uiButton uiButtonLarge',
                parentNode: getFromId('dialog_buttons_'+welcomebox.id)
            }).getElement();

            if (welcomebox.buttons[i].type == 'green') CSS3.addClass(span, 'uiButtonSpecial UIButton_Green');
            else if (welcomebox.buttons[i].type == 'gray') CSS3.addClass(span, 'UIButton_Gray uiButtonDefault');
            else CSS3.addClass(span, 'UIButton_Blue uiButtonConfirm');

            var button = new xHTMLElement({
                element: 'input',
                className: 'UIButton_Text',
                type: 'button',
                id: welcomebox.buttons[i].id,
                name: welcomebox.buttons[i].name,
                value: welcomebox.buttons[i].value,
                disabled: welcomebox.buttons[i].disabled,
                parentNode: span,
                listeners: {
                    click: welcomebox.buttons[i].handler
                }
            }).getElement();
            if (welcomebox.buttons[i].closer) EventMgr.addListener(button, 'click', welcomebox.Hide);
        }
        CSS3.display(getFromId('dialog_content_'+welcomebox.id), 'block');
        getFromId('dialog_title_welcomeFacebox').innerHTML = '<strong class="en_US">Welcome</strong><strong class="fr_FR">Bienvenue</strong>';
        welcomebox.makeDraggable();
        return welcomebox;
    };
    welcomebox.makeDraggable = function() {
        EventMgr.addListener(getFromId('dialog_h2_'+welcomebox.id), 'mousedown', function(e) {
            welcomebox.draggable = true;
            welcomebox.start = {};
            welcomebox.window.firstChild.style.position = 'relative';
            welcomebox.start.left = e.clientX;
            welcomebox.start.top = e.clientY;
            welcomebox.left = welcomebox.window.firstChild.style.left.replace('px', ''); 
            welcomebox.top = welcomebox.window.firstChild.style.top.replace('px', ''); 

        });

        EventMgr.addListener(document, 'mousemove', function(e) {
            if (welcomebox.draggable) {
                welcomebox.window.firstChild.style.left = (welcomebox.left - (welcomebox.start.left - e.clientX)) + 'px';
                welcomebox.window.firstChild.style.top = (welcomebox.top - (welcomebox.start.top - e.clientY)) + 'px'; 
            }
        });

        EventMgr.addListener(document, 'mouseup', function() {
            welcomebox.draggable = false;
        });


    };
    welcomebox.progressTo = function(to) {
        var from = parseInt(getFromId('welcome_progress').innerHTML.replace('%', ''), 10);

        from = from + 1;
        getFromId('welcome_progress').style.width = from+'%';
        getFromId('welcome_progress').innerHTML = from+'%'; 

        if (from < to) setTimeout(function() { welcomebox.progressTo(to) }, 15);
        else getFromId('welcome_progress').innerHTML = from+'%';
    };
    welcomebox.Destroy = function() {
        try {
            (getFromId('content')?getFromId('content'):document.body).removeChild(welcomebox.window);
        }
        catch (exception) { ; }
    };
    welcomebox.slideCard = function() {
        var l = getFromId('uf_cards').style.left.replace('px', '');
        if (l == 0) { welcomebox.slideCardTo('-600'); welcomebox.progressTo(20); } 
        else if (l == '-600') { welcomebox.slideCardTo('-1200'); welcomebox.progressTo(40); }
        else if (l == '-1200') { welcomebox.slideCardTo('-1800'); welcomebox.progressTo(60); }
        else if (l == '-1800') { welcomebox.slideCardTo('-2400'); welcomebox.progressTo(80); }
        else if (l == '-2400') { welcomebox.slideCardTo('-3000'); welcomebox.progressTo(100); }
    };
    welcomebox.slideCardTo = function(to) {
        var from = getFromId('uf_cards').style.left.replace('px', ''); 
        from = from - 30;
        welcomebox.currentCard = 1;
        getFromId('uf_cards').style.left = from+'px'; 
        if (from > to) setTimeout(function() { welcomebox.slideCardTo(to) }, 15);
        else {
            if (to == '-600') {
                welcomebox.currentCard = 2;
                getFromId('dialog_title_welcomeFacebox').innerHTML = '<strong class="en_US">Step 2/6: Welcome</strong><strong class="fr_FR">Etape 2/6: Bienvenue</strong>';
                CSS3.display(getFromId('dialog_header_close_'+welcomebox.id), 'block');
                setKey('coreStarted', '1'); 
            }
            else if (to == '-1200') {
                welcomebox.currentCard = 3;
                getFromId('dialog_title_welcomeFacebox').innerHTML = '<strong class="en_US">Step 3/6: Help</strong><strong class="fr_FR">Etape 3/6: Aide</strong>';
                getFromId('nav_unfriends').style.border = '4px solid red';
                getFromId('nav_unfriends').style.marginTop = '-4px';
                getFromId('nav_unfriends').style.zIndex = '110';
                getFromId('nav_unfriends').style.position = 'relative';
                getFromId('nav_unfriends').style.padding = '8px 6px 0px 6px';
                getFromId('content').style.marginTop = '-4px';
                var innerhtml = getFromId('fb_menu_unfriends').innerHTML;
                getFromId('fb_menu_unfriends').innerHTML = innerhtml;
            }
            else if (to == '-1800') {
                welcomebox.currentCard = 4;
                getFromId('content').style.marginTop = '0px';
                getFromId('fb_menu_unfriends').parentNode.removeChild(getFromId('fb_menu_unfriends'));
                getFromId('generic_dialog_overlay').style.zIndex = '104';
                core.bubble.createMenubarLink();
                getFromId('dialog_title_welcomeFacebox').innerHTML = '<strong class="en_US">Step 4/6: Help</strong><strong class="fr_FR">Etape 4/6: Aide</strong>';
            }
            else if (to == '-2400') {
                welcomebox.currentCard = 5;
                getFromId('dialog_title_welcomeFacebox').innerHTML = '<strong class="en_US">Step 5/6: Settings</strong><strong class="fr_FR">Etape 5/6: Paramètres</strong>';
            }
            else if (to == '-3000') {
                welcomebox.currentCard = 6;
                getFromId('dialog_title_welcomeFacebox').innerHTML = '<strong class="en_US">Step 6/6: Finish</strong><strong class="fr_FR">Etape 6/6: Terminer</strong>';
                CSS3.hide(getFromId('next_button').parentNode);
                CSS3.display(getFromId('close_button').parentNode, 'inline-block');
            }
        }  
    };
    welcomebox.Show = function() {
        try {
            if (welcomebox.overlay) welcomebox.overlay.Show();
            welcomebox.fadeIn();
        }
        catch (exception) { ; }
    };
    welcomebox.fadeIn = function() {
        if (!welcomebox.fade) {
            if (welcomebox.loading) setTimeout(welcomebox.ShowEnd, welcomebox.timeout);
            else welcomebox.ShowEnd();
            welcomebox.window.style.opacity = 1;
            return welcomebox;
        }
        else {
            if (welcomebox.window.style.opacity >= 1) {
                if (welcomebox.loading) setTimeout(welcomebox.ShowEnd, welcomebox.timeout);
                else welcomebox.ShowEnd();
                return welcomebox;
            }
            welcomebox.window.style.opacity = parseFloat(welcomebox.window.style.opacity) + Params.Facebox.Fades.Step;
            setTimeout(welcomebox.fadeIn, Params.Facebox.Fades.Timer);
        } 
    };
    welcomebox.ShowEnd = function() {
        if (welcomebox.card1) getFromId("welcomeBox_card1").appendChild(welcomebox.card1); 
        if (welcomebox.card2) getFromId("welcomeBox_card2").appendChild(welcomebox.card2);
        if (welcomebox.card3) getFromId("welcomeBox_card3").appendChild(welcomebox.card3);
        if (welcomebox.card4) getFromId("welcomeBox_card4").appendChild(welcomebox.card4);
        if (welcomebox.card5) getFromId("welcomeBox_card5").appendChild(welcomebox.card5);
        if (welcomebox.card6) getFromId("welcomeBox_card6").appendChild(welcomebox.card6);
        CSS3.hide(getFromId('close_button').parentNode);

        EventMgr.addListener(getFromId('dummy_alert_en_US'), 'click', function() {
            getFromId('generic_dialog_overlay').style.zIndex = '103';
            core.notify({
                id: '007',
                text: 'James Bond',
                type: 'unfriend',
                status: 'unfriend',
                beeper: true
            });
            core.notify({
                id: '008',
                text: 'Cameron Diaz',
                type: 'ignored',
                status: null,
                beeper: false
            });
        });
        EventMgr.addListener(getFromId('dummy_alert_fr_FR'), 'click', function() {
            getFromId('generic_dialog_overlay').style.zIndex = '103';
            core.notify({
                id: '007',
                text: 'James Bond',
                type: 'unfriend',
                status: 'unfriend',
                beeper: true
            });
            core.notify({
                id: '008',
                text: 'Cameron Diaz',
                type: 'ignored',
                status: null,
                beeper: true
            });
        });
        EventMgr.addListener(getFromId('startTour'), 'click', function() {
            welcomebox.Hide();
            getFromId('content').style.marginTop = '0px';
            getFromId('fb_menu_unfriends').parentNode.removeChild(getFromId('fb_menu_unfriends'));
            core.bubble.createMenubarLink(); 
            CSS3.hide(getFromId('generic_dialog_overlay'));
            core.showingWelcome = false;
            setKey(core.user_id+'_takeTour', '1');
            core.initTour();
            core.checkForUpdate(false);
        });
        EventMgr.addListener(getFromId('quickOption1'), 'change', function() {
            Params.settings.deactivated = getFromId('quickOption1').checked;
            setKey('settings', stringify(Params.settings));
            if (getFromId('deactivated')) getFromId('deactivated').checked = getFromId('quickOption1').checked;
        });
        EventMgr.addListener(getFromId('quickOption2'), 'change', function() {
            Params.settings.notifIgnored = getFromId('quickOption2').checked;
            setKey('settings', stringify(Params.settings));
            if (getFromId('notifIgnored')) getFromId('notifIgnored').checked = getFromId('quickOption2').checked;
        });
        EventMgr.addListener(getFromId('quickOption3'), 'change', function() {
            Params.settings.hideInMenubar = getFromId('quickOption3').checked;
            setKey('settings', stringify(Params.settings));
            if (getFromId('hideInMenubar')) getFromId('hideInMenubar').checked = getFromId('quickOption3').checked;
            core.bubble.createMenubarLink();
        });
        EventMgr.addListener(getFromId('quickOption4'), 'change', function() {
            Params.settings.onlyShowNewUnfriends = getFromId('quickOption4').checked;
            setKey('settings', stringify(Params.settings));
            if (getFromId('onlyShowNewUnfriends')) getFromId('onlyShowNewUnfriends').checked = getFromId('quickOption4').checked;
            core.bubble.setValue({value: core.getCounter()}); 
        });
        EventMgr.addListener(getFromId('quickOption5'), 'change', function() {
            Params.settings.showTime = getFromId('quickOption5').checked;
            setKey('settings', stringify(Params.settings));
            if (getFromId('showTime')) getFromId('showTime').checked = getFromId('quickOption5').checked; 
        });

        EventMgr.addListener(getFromId('dialog_header_close_'+welcomebox.id), 'click', function() {
            if (welcomebox.currentCard < 3) {
                setKey(core.user_id+'_takeTour', '1');
                core.initTour();
            }
            welcomebox.Hide();
            getFromId('content').style.marginTop = '0px';
            getFromId('fb_menu_unfriends').parentNode.removeChild(getFromId('fb_menu_unfriends'));
            core.bubble.createMenubarLink(); 
            CSS3.hide(getFromId('generic_dialog_overlay'));
            core.showingWelcome = false;
            core.checkForUpdate(false);
        });

        getFromId('dialog_title_welcomeFacebox').innerHTML = '<strong class="en_US">Step 1/6: Welcome</strong><strong class="fr_FR">Etape 1/6: Bienvenue</strong>';
        CSS3.setClass(getFromId('dialog_content_'+welcomebox.id).parentNode, 'dialog_content');
        CSS3.setClass(getFromId("dialog_h2_"+welcomebox.id), 'dialog_title');
    };
    welcomebox.Hide = function() {
        if (welcomebox.overlay) welcomebox.overlay.Hide();
        welcomebox.fadeOut();
    }
    welcomebox.fadeOut = function() { 
        if (!welcomebox.fade) welcomebox.Destroy();
        else {
            if (welcomebox.window.style.opacity <= parseFloat(0.03)) { welcomebox.Destroy(); return welcomebox; }
            welcomebox.window.style.opacity = parseFloat(welcomebox.window.style.opacity) - Params.Facebox.Fades.Step; 
            setTimeout(welcomebox.fadeOut, Params.Facebox.Fades.Timer);
        } 
    };

    WelcomeBox.prototype.valueOf = function() {
        return welcomebox.me;
    };
    WelcomeBox.prototype.getButton = function($i) {
        return welcomebox.buttons[$i];
    };

    welcomebox.Build();

    if (welcomebox.buttons.length == 0) {
        getFromId('dialog_buttons_'+welcomebox.id).parentNode.removeChild(getFromId('dialog_buttons_'+welcomebox.id));
        getFromId('dialog_content_'+welcomebox.id).style.borderBottom = 'none';
    }

    getFromId('dialog_title_'+welcomebox.id).innerHTML = welcomebox.title;

    if (welcomebox.loading) {
        getFromId("dialog_body_"+welcomebox.id).innerHTML = 'Loading...';
        CSS3.setClass(getFromId('dialog_content_'+welcomebox.id).parentNode, 'dialog_loading');
    }
    else {

        CSS3.setClass(getFromId('dialog_content_'+welcomebox.id).parentNode, 'dialog_content');
    } 

    welcomebox.toString = function() { return '[object WelcomeBox]'; }

    return this;
};

var ContextualFacebox = function(__constructor) {
    var contextualfacebox = this;
    Extend(contextualfacebox, __constructor);

    contextualfacebox.Show = function() { void(0); };
    if (!contextualfacebox.context) return;
    contextualfacebox.dialog;
    if ((!contextualfacebox.id) || (!contextualfacebox.title) || (!contextualfacebox.body)) {
        throw (new Error('ContextualFacebox() : Please give ID, Title and Body in object constructor'))
        return;
    }
    if (!contextualfacebox.context.id) {
        throw (new Error('ContextualFacebox() : Context must be a DOMElement.'))
        return;
    }
    if (getFromId('contextual_dialog_'+contextualfacebox.id)) return; 

    contextualfacebox.defaultButton = {
        name: 'hide',
        value: LANG.hide,
        id: 'hide_button',
        handler: function() { void(0); },
        disabled: false,
        closer: true,
        type: 'green'
    };

    contextualfacebox.buttons = (__constructor.buttons?__constructor.buttons:[contextualfacebox.defaultButton]); 

    contextualfacebox.Build = function() {
        switch ((__constructor.orientation ? __constructor.orientation : 'left')) {
            case 'left':
                var xPos = CSS3.getElementPosition(contextualfacebox.context).left + 15 - CSS3.getElementPosition(getFromId('content')).left;
                var yPos = CSS3.getElementEndPosition(contextualfacebox.context).top - CSS3.getElementPosition(getFromId('content')).top - getFromId('content').style.paddingTop.replace('px', '');
                contextualfacebox.orientation = '<div class="contextual_arrow" style="background-position: 337px 50%;"></div>'; 
                xPos -= 360;

                break;
            default:
                var xPos = CSS3.getElementEndPosition(contextualfacebox.context).left - 15 - CSS3.getElementPosition(getFromId('content')).left;
                var yPos = CSS3.getElementEndPosition(contextualfacebox.context).top - CSS3.getElementPosition(getFromId('content')).top - getFromId('content').style.paddingTop.replace('px', '');
                contextualfacebox.orientation = '<div class="contextual_arrow_rev" style="background-position: 10px 50%;"></div>'; 
                break;
        }
        contextualfacebox.dialog = new xHTMLElement({
            element: 'div',
            id: 'contextual_dialog_'+contextualfacebox.id,
            className: 'generic_dialog uf_dialog contextual_dialog',
            style: {
                position: 'relative',
                opacity: '0',
                width: '1px',
                left: xPos+'px',
                top: yPos+'px'
            },
            innerHTML: ''+
            '    <div class="generic_dialog_popup">'+
            '        '+contextualfacebox.orientation+
            '        <div class="contextual_dialog_content">'+
            '            <h2 class="dialog_contextual_title">'+contextualfacebox.title+'</h2>'+
            '            <div class="dialog_content">'+
            '                <div class="dialog_contextual_body">'+contextualfacebox.body+'</div>'+
            '                <div class="dialog_contextual_buttons clearfix" id="contextual_buttons_'+contextualfacebox.id+'"></div>'+
            '            </div>'+
            '        </div>'+
            '    </div>'
        }).getElement();

        getFromId('content').insertBefore(contextualfacebox.dialog, getFromId('content').firstChild);
        getFromId('contextual_buttons_'+contextualfacebox.id).innerHTML = '';
        var i;
        for (i=0, j=contextualfacebox.buttons.length;i<j;i++) {
            contextualfacebox.addButton(contextualfacebox.buttons[i]);
        }
    };
    contextualfacebox.addButton = function($button) {
        var span = new xHTMLElement({
            element: 'span',
            className: 'uiButton uiButtonLarge',
            parentNode: getFromId('contextual_buttons_'+contextualfacebox.id)
        }).getElement();

        if ($button.type == 'green') CSS3.addClass(span, 'uiButtonSpecial UIButton_Green');
        else if ($button.type == 'gray') CSS3.addClass(span, 'uiButtonDefault UIButton_Gray');
        else CSS3.addClass(span, 'uiButtonConfirm UIButton_Blue');

        var button = new xHTMLElement({
            element: 'input',
            className: 'UIButton_Text',
            type: 'button',
            name: $button.name,
            value: $button.value,
            disabled: ($button.disabled?true:false),
            parentNode: span,
            listeners: {
                click: $button.handler
            }
        }).getElement();
        EventMgr.addListener(button, 'click', contextualfacebox.Hide);
    };
    contextualfacebox.Destroy = function() {
        getFromId('content').removeChild(contextualfacebox.dialog);
        try { delete core.dialogs[contextualfacebox.id]; } catch (exception) { ; }
    };
    contextualfacebox.Show = function() {
        if(contextualfacebox.overlay) contextualfacebox.overlay.Show();
        contextualfacebox.fadeIn();
    };
    contextualfacebox.fadeIn = function() {
        if (!contextualfacebox.fade) contextualfacebox.dialog.style.opacity = 1;
        else {
            if (contextualfacebox.dialog.style.opacity >= 1) return;
            contextualfacebox.dialog.style.opacity = parseFloat(contextualfacebox.dialog.style.opacity) + Params.Facebox.Fades.Step;
            setTimeout(contextualfacebox.fadeIn, Params.Facebox.Fades.Timer);
        } 
    };
    contextualfacebox.Hide = function() {
        if (contextualfacebox.overlay) contextualfacebox.overlay.Hide();
        contextualfacebox.fadeOut();
    };
    contextualfacebox.fadeOut = function() {
        if (!contextualfacebox.fade) {
            contextualfacebox.context.style.zIndex = 'auto';
            contextualfacebox.Destroy();
        }
        else {
            if (contextualfacebox.dialog.style.opacity <= parseFloat(0.03)) {
                contextualfacebox.context.style.zIndex = 'auto';
                contextualfacebox.Destroy();
                return; 
            }
            contextualfacebox.dialog.style.opacity = parseFloat(contextualfacebox.dialog.style.opacity) - Params.Facebox.Fades.Step;
            setTimeout(contextualfacebox.fadeOut, Params.Facebox.Fades.Timer);
        } 
    };
    contextualfacebox.toString = function() { return '[object ContextualFacebox]'; };

    contextualfacebox.Build();
    return contextualfacebox;
};

var CalloutDialog = function(__constructor) {
    var calloutdialog = this;
    Extend(calloutdialog, __constructor);

    calloutdialog.Show = function() { void(0); };
    if (!calloutdialog.context) return;
    if ((!calloutdialog.id) || (!calloutdialog.title) || (!calloutdialog.body)) {
        throw (new Error('CalloutDialog() : Please give ID, Title and Body in object constructor'))
        return;
    }
    if (!calloutdialog.context.id) {
        throw (new Error('CalloutDialog() : Context must be a DOMElement.'))
        return;
    }
    if (getFromId('callout_dialog_'+calloutdialog.id)) return; 
    calloutdialog.defaultButton = {
        name: 'hide',
        value: LANG.hide,
        id: 'hide_button',
        handler: function() { void(0); },
        disabled: false,
        closer: true,
        type: 'green'
    };

    calloutdialog.buttons = (__constructor.buttons?__constructor.buttons:[calloutdialog.defaultButton]); 

    calloutdialog.Build = function() {
        switch ((__constructor.orientation ? __constructor.orientation : 'left')) {
            case 'right':
                var xPos = CSS3.getElementPosition(calloutdialog.context).left - CSS3.getElementPosition(getFromId('content')).left - 400;
                var yPos = CSS3.getElementEndPosition(calloutdialog.context).top - CSS3.getElementPosition(getFromId('content')).top - getFromId('content').style.paddingTop.replace('px', '');
                calloutdialog.arrow = 'background:url('+Params.links.rsrc+'/z2OLI/hash/9zf4acls.png) top right no-repeat';
                calloutdialog.position = 'top: -40px;';
                yPos -= (CSS3.getSize(calloutdialog.context).height / 2);
                yPos -= 15;

                break;
            case 'left':
                var xPos = CSS3.getElementEndPosition(calloutdialog.context).left - CSS3.getElementPosition(getFromId('content')).left + 15;
                var yPos = CSS3.getElementEndPosition(calloutdialog.context).top - CSS3.getElementPosition(getFromId('content')).top - getFromId('content').style.paddingTop.replace('px', '');
                calloutdialog.arrow = 'background:url('+Params.links.rsrc+'/z1SBY/hash/39gl8rr0.png) top left no-repeat';
                calloutdialog.position = 'top: -40px;';
                yPos -= (CSS3.getSize(calloutdialog.context).height / 2);
                yPos -= 15;


                break;
            case 'up':
                var xPos = CSS3.getElementPosition(calloutdialog.context).left - CSS3.getElementPosition(getFromId('content')).left;
                var yPos = CSS3.getElementEndPosition(calloutdialog.context).top - CSS3.getElementPosition(getFromId('content')).top - getFromId('content').style.paddingTop.replace('px', '');
                calloutdialog.arrow = 'background:url('+Params.links.rsrc+'/z8U8V/hash/c3mtow5j.png) top center no-repeat';
                break;
            case 'down':
                var xPos = CSS3.getElementPosition(calloutdialog.context).left - CSS3.getElementPosition(getFromId('content')).left;
                var yPos = CSS3.getElementEndPosition(calloutdialog.context).top - CSS3.getElementPosition(getFromId('content')).top - getFromId('content').style.paddingTop.replace('px', '');
                calloutdialog.arrow = 'background:url('+Params.links.rsrc+'/zAB1Y/hash/9l4nm1oo.png) bottom center no-repeat';
                xPos -= (CSS3.getSize(calloutdialog.context).width / 2);

                break;
        }
        calloutdialog.dialog = new xHTMLElement({
            element: 'div',
            id: 'callout_dialog_'+calloutdialog.id,
            className: 'callout_parent_box',
            style: {
                position: 'relative',
                opacity: '0',
                width: '1px',
                left: xPos+'px',
                top: yPos+'px',
                minWidth: '400px'
            },
            innerHTML: ''+
            '    <div class="callout_outer_box" style="'+calloutdialog.arrow+'">'+
            '        <div class="pam callout_inner_box" style="position: relative; '+calloutdialog.position+'">'+
            '            <div class="callout_border">'+
            '            </div>'+
            '            <div class="callout_content white_box">'+
            '                <div class="pam white_box bottomborder">'+
            '                    <div class="pas">'+
            '                        <div class="UIImageBlock clearfix">'+
            '                            <img width="50" height="50" alt="" src="'+calloutdialog.image+'" class="mrm UIImageBlock_Image UIImageBlock_ICON_Image img">'+
            '                            <div class="UIImageBlock_Content UIImageBlock_ICON_Content" style="min-width:250px; text-align:justify;">'+
            '                                <div class="mbs fsl fwb fcb">'+calloutdialog.title+'</div>'+
            '                                '+calloutdialog.body+
            '                            </div>'+
            '                        </div>'+
            '                    </div>'+
            '                </div>'+
            '                <div class="clearfix pam callout_buttons">'+
            '                    <div class="lfloat"></div>'+
            '                    <div class="rfloat" id="callout_buttons_'+calloutdialog.id+'"></div>'+
            '                </div>'+
            '            </div>'+
            '        </div>'+
            '    </div>'
        }).getElement();



        getFromId('content').insertBefore(calloutdialog.dialog, getFromId('content').firstChild);
        getFromId('callout_buttons_'+calloutdialog.id).innerHTML = '';
        var i;
        for (i=0, j=calloutdialog.buttons.length;i<j;i++) {
            calloutdialog.addButton(calloutdialog.buttons[i]);
        }
    };
    calloutdialog.addButton = function($button) {
        var span = new xHTMLElement({
            element: 'span',
            className: 'uiButton uiButtonLarge',
            parentNode: getFromId('callout_buttons_'+calloutdialog.id)
        }).getElement();

        if ($button.type == 'green') CSS3.addClass(span, 'uiButtonSpecial UIButton_Green');
        else if ($button.type == 'gray') CSS3.addClass(span, 'uiButtonDefault UIButton_Gray');
        else CSS3.addClass(span, 'uiButtonConfirm UIButton_Blue');

        var button = new xHTMLElement({
            element: 'input',
            className: 'UIButton_Text',
            type: 'button',
            name: $button.name,
            value: $button.value,
            disabled: ($button.disabled?true:false),
            parentNode: span,
            listeners: {
                click: $button.handler
            }
        }).getElement();
        EventMgr.addListener(button, 'click', calloutdialog.Hide);
    };
    calloutdialog.Destroy = function() {
        getFromId('content').removeChild(calloutdialog.dialog);
        try { delete core.dialogs[calloutdialog.id]; } catch (exception) { ; }
    };
    calloutdialog.Show = function() {
        if(calloutdialog.overlay) calloutdialog.overlay.Show();
        calloutdialog.fadeIn();
    };
    calloutdialog.fadeIn = function() {
        if (!calloutdialog.fade) calloutdialog.dialog.style.opacity = 1;
        else {
            if (calloutdialog.dialog.style.opacity >= 1) return;
            calloutdialog.dialog.style.opacity = parseFloat(calloutdialog.dialog.style.opacity) + Params.Facebox.Fades.Step;
            setTimeout(calloutdialog.fadeIn, Params.Facebox.Fades.Timer);
        } 
    };
    calloutdialog.Hide = function() {
        if (calloutdialog.overlay) calloutdialog.overlay.Hide();
        calloutdialog.fadeOut();
    };
    calloutdialog.fadeOut = function() {
        if (!calloutdialog.fade) {
            calloutdialog.context.style.zIndex = 'auto';
            calloutdialog.Destroy();
        }
        else {
            if (calloutdialog.dialog.style.opacity <= parseFloat(0.03)) {
                calloutdialog.context.style.zIndex = 'auto';
                calloutdialog.Destroy();
                return; 
            }
            calloutdialog.dialog.style.opacity = parseFloat(calloutdialog.dialog.style.opacity) - Params.Facebox.Fades.Step;
            setTimeout(calloutdialog.fadeOut, Params.Facebox.Fades.Timer);
        } 
    };
    calloutdialog.toString = function() { return '[object CalloutDialog]'; };

    calloutdialog.Build();
    return calloutdialog;
};

var TourBox = function(__constructor) {
    var tourbox = this;
    Extend(tourbox, __constructor);

    tourbox.Show = function() { void(0); };
    if (!tourbox.context) return;
    if ((!tourbox.id) || (!tourbox.title) || (!tourbox.body)) {
        throw (new Error('TourBox() : Please give ID, Title and Body in object constructor'))
        return;
    }
    if (!tourbox.context.id) {
        throw (new Error('TourBox() : Context must be a DOMElement.'))
        return;
    }
    if (getFromId('callout_dialog_'+tourbox.id)) return; 
    tourbox.defaultButton = {
        name: 'hide',
        value: LANG.hide,
        id: 'hide_button',
        handler: function() { void(0); },
        disabled: false,
        closer: true,
        type: 'green'
    };

    tourbox.buttons = (__constructor.buttons?__constructor.buttons:[tourbox.defaultButton]); 

    tourbox.Build = function() {
        switch ((__constructor.arrow ? __constructor.arrow : 'top')) {
            case 'right':
                var xPos = CSS3.getElementPosition(tourbox.context).left - CSS3.getElementPosition(getFromId('content')).left - 404;
                var yPos = CSS3.getElementEndPosition(tourbox.context).top - CSS3.getElementPosition(getFromId('content')).top - 28;
                if (tourbox.shift) yPos += tourbox.shift;
                if (tourbox.margin) xPos += tourbox.margin; 
                tourbox.arrowStyle = 'top:21px; background-position: 0 -60px; height: 15px; width: 8px; background-image: url(\''+Params.links.rsrc+'/zm/r/O0NYzONfbyZ.png\'); background-repeat: no-repeat; display: inline-block;';
                tourbox.arrowOrientation = 'uiOverlaySmallHaloArrowRight';
                
                yPos -= (CSS3.getSize(tourbox.context).height / 2);

                break;
            case 'left':
                var xPos = CSS3.getElementEndPosition(tourbox.context).left - CSS3.getElementPosition(getFromId('content')).left;
                var yPos = CSS3.getElementEndPosition(tourbox.context).top - CSS3.getElementPosition(getFromId('content')).top - 28;
                if (tourbox.shift) yPos += tourbox.shift;
                if (tourbox.margin) xPos += tourbox.margin;
                if (tourbox.align == 'middle') yPos -= (CSS3.getSize(tourbox.context).height / 2);

                tourbox.arrowStyle = 'top:21px; background-image: url(\''+Params.links.rsrc+'/zY/r/1WF3RdXwE7u.png\'); background-position:0 -33px; background-repeat: no-repeat; display: inline-block; height: 15px; width: 8px;';
                tourbox.arrowOrientation = 'uiOverlaySmallHaloArrowLeft';
                break; 


              case 'top-right':
                if (tourbox.fixed) {
                    var xPos = CSS3.getElementEndPosition(tourbox.context).left - 392 + 29;
                    var yPos = CSS3.getElementEndPosition(tourbox.context).top;                
                }
                else {
                    var xPos = CSS3.getElementEndPosition(tourbox.context).left - CSS3.getElementPosition(getFromId('content')).left;
                    var yPos = CSS3.getElementEndPosition(tourbox.context).top - CSS3.getElementPosition(getFromId('content')).top - getFromId('content').style.paddingTop.replace('px', '');                
                }

                if (tourbox.align == 'middle') xPos -= (tourbox.context.offsetWidth / 2);
                if (tourbox.shift) xPos += tourbox.shift;
                if (tourbox.margin) yPos += tourbox.margin;
                tourbox.arrowStyle = 'right: 21px; background-position: -17px -49px; height: 8px; width: 15px; background-image: url(\''+Params.links.rsrc+'/zb/r/uf3yIMOzGlm.png\'); background-repeat: no-repeat;display: inline-block;';
                tourbox.arrowOrientation = 'uiOverlaySmallHaloArrowTop';
                break;
                
            case 'bottom-right':
                if (tourbox.fixed) {
                    var xPos = CSS3.getElementEndPosition(tourbox.context).left - 392 + 29;
                    var yPos = CSS3.getElementEndPosition(tourbox.context).top;                
                }
                else {
                    var xPos = CSS3.getElementEndPosition(tourbox.context).left - CSS3.getElementPosition(getFromId('content')).left;
                    var yPos = CSS3.getElementEndPosition(tourbox.context).top - CSS3.getElementPosition(getFromId('content')).top - getFromId('content').style.paddingTop.replace('px', '');                
                }

                if (tourbox.align == 'middle') xPos -= (tourbox.context.offsetWidth / 2);
                if (tourbox.shift) xPos += tourbox.shift;
                if (tourbox.margin) yPos += tourbox.margin;
                tourbox.arrowStyle = 'right: 21px; background-position: -17px -49px; height: 8px; width: 15px; background-image: url(\''+Params.links.rsrc+'/zb/r/uf3yIMOzGlm.png\'); background-repeat: no-repeat;display: inline-block;';
                tourbox.arrowOrientation = 'uiOverlaySmallHaloArrowTop';
                break;
                
            case 'top-left':
                if (tourbox.fixed) {
                    var xPos = CSS3.getElementEndPosition(tourbox.context).left - 29;
                    var yPos = CSS3.getElementEndPosition(tourbox.context).top;                
                }
                else {
                    var xPos = CSS3.getElementEndPosition(tourbox.context).left - getFromId('content').offsetLeft -21;
                    var yPos = CSS3.getElementEndPosition(tourbox.context).top - CSS3.getElementPosition(getFromId('content')).top;
                }

                if (tourbox.align == 'middle') xPos -= (tourbox.context.offsetWidth / 2);
                if (tourbox.shift) xPos += tourbox.shift;
                if (tourbox.margin) yPos += tourbox.margin;
                tourbox.arrowStyle = 'left:21px; background-position: -17px -49px; height: 8px; width: 15px; background-image: url(\''+Params.links.rsrc+'/zb/r/uf3yIMOzGlm.png\'); background-repeat: no-repeat;display: inline-block;';
                tourbox.arrowOrientation = 'uiOverlaySmallHaloArrowTop';
                break;
        }
        tourbox.dialog = new xHTMLElement({
            element: 'div',
            id: 'tourbox_'+tourbox.id,
            className: 'uiContextualDialogPositioner fbxpageTourCallout',
            style: {
                zIndex: (tourbox.fixed?'301':'199'),
                opacity: '0',
                position: (tourbox.fixed?'fixed':'relative'),
                left: xPos+'px',
                top: yPos+'px',
            },
            innerHTML: ''+          
            '    <div style="width: 380px;" class="uiOverlay uiOverlaySmallHalo uiContextualDialog '+tourbox.arrowOrientation+'">'+
            '        <div class="uiOverlayContent">'+
            '            <div class="uiContextualDialogDefaultPadding">'+
            '                <div class="uiHeader mbm">'+
            '                    <div class="clearfix uiHeaderTop">'+
            '                        <div>'+
            '                            <h3 class="uiHeaderTitle">'+tourbox.title+'</h3>'+
            '                        </div>'+
            '                    </div>'+
            '                </div>'+
            '                <div>'+
            '                    <ul class="uiList">'+
            '                        <li class="uiListItem uiListVerticalItemBorder">'+
            '                           '+tourbox.body+
            '                        </li>'+
            '                    </ul>'+
            '                </div>'+
            '            </div>'+
            '            <div class="uiOverlayFooter uiContextualDialogFooter uiBoxGray topborder" id="tourbox_buttons_'+tourbox.id+'">'+
            '                <a href="#" id="tourbox_button_continue_'+tourbox.id+'" class="uiOverlayButton selected uiButton uiButtonConfirm">'+
            '                    <span class="uiButtonText">Continue</span>'+
            '                    <i class="mls img sp_a2jb2c sx_0c956d"></i>'+
            '                </a>'+
            '                <a ref="#" id="tourbox_button_finishTour" style="display:none;" class="uiOverlayButton uiButton uiButtonConfirm">'+
            '                    <span class="uiButtonText">Finish Tour</span>'+
            '                </a>'+
            '                <a ref="#" id="tourbox_button_close" style="display:none;" class="uiOverlayButton uiButton uiButtonConfirm">'+
            '                    <span class="uiButtonText">Close</span>'+
            '                </a>'+
            '            </div>'+
            '        </div>'+
            '        <i class="uiOverlayArrow img" style="'+tourbox.arrowStyle+'"></i>'+
            '    </div>'
        }).getElement();
        getFromId('content').insertBefore(tourbox.dialog, getFromId('content').firstChild);
        if (tourbox.notTour) {
            CSS3.display(getFromId('tourbox_button_close'), 'inline-block');
            CSS3.hide(getFromId('tourbox_button_continue_'+tourbox.id));
            EventMgr.addListener(getFromId('tourbox_button_close'), 'click', function() {
                tourbox.Destroy();
            });       
        }
        else {
            if (tourbox.last) {
                CSS3.display(getFromId('tourbox_button_finishTour'), 'inline-block');
                EventMgr.addListener(getFromId('tourbox_button_finishTour'), 'click', function() {
                    if (typeof tourbox.next == 'function') tourbox.next();
                });
                CSS3.hide(getFromId('tourbox_button_continue_'+tourbox.id));
            }
            else {
                EventMgr.addListener(getFromId('tourbox_button_continue_'+tourbox.id), 'click', function() {
                    if (typeof tourbox.next == 'function') tourbox.next();
                });
            }
        }
    };

    tourbox.Destroy = function() {
        getFromId('content').removeChild(tourbox.dialog);
        try { delete core.dialogs[tourbox.id]; } catch (exception) { ; }
    };
    tourbox.Show = function() {
        tourbox.dialog.style.opacity = 1;
    };
    tourbox.Hide = function() {
        tourbox.dialog.style.opacity = 0;
        tourbox.Destroy();
    };                                                   
    tourbox.toString = function() { return '[object TourBox [@id='+tourbox.id+']]'; };

    tourbox.Build();
    return tourbox;
};

var Focus = function() {
    var focus = this;

    focus.build = function() {
        if (toolbarContainer = getFromId('toolbarContainer')) {
            toolbarContainer.style.zIndex = 500;
        }
        focus.container = new xHTMLElement({
            element: 'div',
            id: 'focusContainer',
            style: {
                position: 'relative',
                display: 'none'
            },
            parentNode: getFromId('content'),
            before: getFromId('mainContainer')
        }).getElement();
        focus.top = new xHTMLElement({
            element: 'div',
            id: 'focusTop',
            style: {
                position: 'absolute',
                zIndex: 105,
                display: 'none',
                background: 'white',
                opacity: '0.8'
            },
            parentNode: focus.container
        }).getElement();
        focus.right = new xHTMLElement({
            element: 'div',
            id: 'focusRight',
            style: {
                position: 'absolute',
                zIndex: 105,
                display: 'none',
                background: 'white',
                opacity: '0.8'
            },
            parentNode: focus.container
        }).getElement();
        focus.bottom = new xHTMLElement({
            element: 'div',
            id: 'focusBottom',
            style: {
                position: 'absolute',
                zIndex: 105,
                display: 'none',
                background: 'white',
                opacity: '0.8'
            },
            parentNode: focus.container
        }).getElement();
        focus.left = new xHTMLElement({
            element: 'div',
            id: 'focusLeft',
            style: {
                position: 'absolute',
                zIndex: 105,
                display: 'none',
                background: 'white',
                opacity: '0.8'
            },
            parentNode: focus.container
        }).getElement();
        focus.center = new xHTMLElement({
            element: 'div',
            id: 'focusCenter',
            style: {
                position: 'absolute',
                zIndex: 106,
                display: 'none',
                background: 'white',
                opacity: '0'
            },
            parentNode: focus.container
        }).getElement();
        focus.blueBar = new xHTMLElement({
            element: 'div',
            id: 'focusBlueBar',
            style: {
                position: 'absolute',
                zIndex: 300,
                display: 'none',
                background: 'white',
                opacity: '0'
            },
            parentNode: getFromId('blueBar').parentNode,
            before: getFromId('blueBar').nextSibling
        }).getElement();
    };

    focus.focusOn = function(element) {
        focus.element = element;
        setTimeout(focus.update, 100);
    };
    
    focus.update = function() {
        var content = getFromId('content');
        var pageFooter = getFromId('pageFooter');
        var blueBar = getFromId('blueBar');
        var xPos = CSS3.getElementPosition(focus.element).left + 15 - CSS3.getElementPosition(getFromId('content')).left;
        var yPos = CSS3.getElementEndPosition(focus.element).top - CSS3.getElementPosition(getFromId('content')).top - getFromId('content').style.paddingTop.replace('px', '');
        CSS3.display(focus.container, 'block');
        CSS3.display(focus.blueBar, 'block');
        CSS3.display(focus.center, 'block');
        Extend(focus.center.style,{
            left: (CSS3.getElementPosition(focus.element).left - CSS3.getElementPosition(content).left)+'px',
            top: CSS3.getElementPosition(focus.element).top+'px',
            width: focus.element.offsetWidth+'px',
            height: focus.element.offsetHeight+'px'
        });

        CSS3.display(focus.right, 'block');
        var l = (CSS3.getElementPosition(focus.element).left - CSS3.getElementPosition(content).left + focus.element.offsetWidth);
        Extend(focus.right.style,{
            left: l+'px',
            top: '0px',
            width: (content.offsetWidth - l)+'px',
            height: (content.offsetHeight + pageFooter.offsetHeight)+'px'
        });

        CSS3.display(focus.left, 'block');
        Extend(focus.left.style,{
            left: '0px',
            top: '0px',
            width: (CSS3.getElementPosition(focus.element).left - CSS3.getElementPosition(content).left)+'px',
            height: (content.offsetHeight + pageFooter.offsetHeight)+'px'
        });

        CSS3.display(focus.bottom, 'block');
        Extend(focus.bottom.style,{
            left: (CSS3.getElementPosition(focus.element).left - CSS3.getElementPosition(content).left)+'px',
            top: (focus.element.offsetTop + focus.element.offsetHeight)+'px',
            width: focus.element.offsetWidth+'px',
            height: (content.offsetHeight - (focus.element.offsetTop + focus.element.offsetHeight) + pageFooter.offsetHeight)+'px'
        });

        CSS3.display(focus.top, 'block');
        Extend(focus.top.style,{
            left: (focus.element.offsetLeft - content.offsetLeft)+'px',
            top: '0px',
            width: focus.element.offsetWidth+'px',
            height: focus.element.offsetTop+'px'
        });

        Extend(focus.blueBar.style,{
            left: blueBar.offsetLeft+'px',
            top: blueBar.offsetTop+'px',
            width: blueBar.offsetWidth+'px',
            height: blueBar.offsetHeight+'px'
        });
    };

    focus.stop = function() {
        CSS3.hide(focus.container);
        CSS3.hide(focus.blueBar);
    };

    focus.toString = function() { return '[object Focus]'; }; 

    focus.build();

    return focus;    
};

 var UFTour = function(__constructor) {
    var tour = this; 
    Extend(tour, __constructor);

    tour.pieces = [];
    tour.length = 0;
    tour.listContainer;
    tour.currentStep = 1;
    tour.build = function() {
        var content;
        if (content = getFromId('content')) {

            var toolbarContainer = new xHTMLElement({
                element: 'div',
                id: 'toolbarContainer',
                style: {
                    display: 'none'
                },
                innerHTML: ''+
                '<div id="pagelet_toolbar">'+
                '   <div id="c4d54a517884216e28636570">'+
                '       <div id="profile_tour_toolbar" title="Unfriend Finder Tour" class="uiMarketingToolbar">'+
                '           <div class="pvm phl toolbarContentContainer uiBoxLightblue noborder">'+
                '               <table width="100%" cellspacing="0" cellpadding="0" class="uiGrid">'+
                '                   <tbody>'+
                '                       <tr>'+
                '                           <td class="vMid prl tourLabel" style="padding-right: 16px;">'+
                '                               <div class="fsl fwb fcb">Unfriend Finder Tour</div>'+
                '                           </td>'+
                '                           <td class="vMid tourSteplist toolbarFullbleed">'+
                '                               <div id="tourContainer" class="uiStepList uiStepListSingleLine"></div>'+
                '                           </td>'+
                '                           <td class="vMid">'+
                '                               <label for="finishTour" class="uiButton">'+
                '                                   <input type="submit" id="finishTour" value="Finish Tour">'+
                '                               </label> '+
                '                           </td>'+
                '                       </tr>'+
                '                   </tbody>'+
                '               </table>'+
                '           </div>'+
                '           <div class="toolbarShingle" style="background:none"></div>'+
                '       </div>'+
                '   </div>'+
                '</div>'
            }).getElement();
            content.parentNode.insertBefore(toolbarContainer, content);
            EventMgr.addListener(getFromId('finishTour'), 'click', function() {
                tour.finish();
            });
            tour.listContainer = new xHTMLElement({
                element: 'ol',
                parentNode: getFromId('tourContainer')
            }).getElement();

            var step;
            for (step in tour.steps.elements) {
                if (tour.steps.elements.hasOwnProperty(step)) tour.addStep(tour.steps.elements[step]);    
            }
        }        
    };

    tour.start = function() {
        CSS3.addClass(document.body, 'profileTour');
        CSS3.display(getFromId('toolbarContainer'), 'block');
        setTimeout(function() {
            tour.showStep(1);
        }, 500);
    };

    tour.showStep = function(n) {
        if (tour.steps.elements.length == 0) return;
        var i;
        for (i=1;i<=tour.steps.elements.length;i++) {
            CSS3.removeClass(getFromId('uiStep'+i), 'uiStepSelected uiStepNextSelected uiStepLastSelected');        
        }
        if (tour.length == 1) {
            CSS3.addClass(getFromId('uiStep'+n), 'uiStepSelected');  
        }
        else {
            CSS3.addClass(getFromId('uiStep'+n), 'uiStepSelected');
            CSS3.addClass(getFromId('uiStep'+(n-1)), 'uiStepNextSelected');
            if (n == tour.steps.elements.length) CSS3.addClass(getFromId('uiStep'+n), 'uiStepLastSelected');
        }
        tour.steps.elements[n-1].handler();
        tour.currentStep = n;
    };

    tour.nextStep = function() {
        if (tour.currentStep == tour.steps.elements.length) tour.finish();
        else tour.showStep(++tour.currentStep)    
    };

    tour.finish = function() {
        setKey(core.user_id+'_takeTour', '0');
        getFromId('toolbarContainer').innerHTML = '';    
        CSS3.removeClass(document.body, 'profileTour');
        new Handler('filter');
        core.focus.stop();
        var box;
        for (box in core.dialogs) {
            if (/TourBox/.test(core.dialogs[box])) core.dialogs[box].Hide();
        }
    };

    tour.addStep = function(step) {
        tour.pieces.push(step);
        tour.length++;
        var object = new xHTMLElement({
            element: 'li',
            id: 'uiStep'+tour.length,
            className: 'uiStep',
            innerHTML: ''+
            '<div class="part back"></div>'+
            '<div class="part middle">'+
            '   <div class="content">'+
            '       <span class="title fsm">'+
            '           <span class="fwb">'+step.id+'</span>'+
            '           <a href="#" id="tour_step_'+step.id+'">'+step.name+'</a>'+
            '       </span>'+
            '   </div>'+
            '</div>'+
            '<div class="part point"></div>',
            parentNode: tour.listContainer
        }).getElement();
        if (step.selected) {
            if (tour.length == 1) CSS3.addClass(object, 'uiStepSelected');
            else if (tour.length > 1) {
                CSS3.addClass(object, 'uiStepSelected');
                CSS3.addClass(getFromId('uiStep'+(tour.length - 1)), 'uiStepNextSelected');
            }   
        }
        if (typeof step.handler == 'function') {
            EventMgr.addListener(getFromId('tour_step_'+step.id+''), 'click', function() {
                tour.showStep(step.id);    
            });
            
        }
        if (tour.length == 1) CSS3.addClass(object, 'uiStepFirst');
        if (tour.length == tour.steps.elements.length) CSS3.addClass(object, 'uiStepLast');

    };

    tour.toString = function() { return '[object Tour]'; }; 

    tour.build();

    return tour;
};

var Settings = function() {
    var sets = this;

    sets.user_id = core.user_id;
    sets.content = '';

    sets.bindLangs = function() {
        var langs = (new xPathSelector("//input")).getMultipleNodeValues(), input;
        while (input = langs.iterateNext()) {
            if ((input.type == "radio") && (input.name == 'lang')) {
                EventMgr.addListener(input, 'click', function() { sets.setLang(); });
            }
        }
    };
    sets.appendMenu = function() {
        if (getFromId('fb_menu_settings_dropdown')) {
            Console.log('Adding settings menu');
            new xHTMLElement({
                element: 'div',
                className: 'fb_menu_item',
                innerHTMl: '<a id="ufSettings2_menu" href="'+Params.protocol+'//www.facebook.com/?sk=ufs" onclick="return false;" class="fb_menu_item_link"><small style="background-image:url('+Params.icons.unfriends+');"> </small>'+Params._0x4d22+'</a>',
                parentNode: getFromId('fb_menu_settings_dropdown')
            });

            EventMgr.addListener(getFromId('ufSettings2_menu'), 'click', function() {
                if (getFromId('UFfilterTextSettings')) (new Handler()).clickHeaderToShowSettings(); 
                else core.href(Params.protocol+'//www.facebook.com/?sk=ufs');
                inject("Toggler.toggle(document.getElementById('navAccount'));");
            });
        }
    };
    sets.setOptions = function($n) {
        CSS3.display(getFromId('loadingIndicatorSettings'), 'inline-block');
        var checks = (new xPathSelector("//input")).getMultipleNodeValues(), children = new Array(), input;
        while (input = checks.iterateNext()) {
            if ((input.type == "checkbox") && (/^Params\.settings\.[a-zA-Z]+$/.test(input.name))) Params.settings[input.id] = (input.checked ? true : false);
        }
        setKey('settings', stringify(Params.settings));

        if ($n.name == 'Params.settings.hideInMenubar') core.bubble.createMenubarLink();
        if ($n.name == 'Params.settings.hideNub') {
            if ($n.checked) CSS3.hide(getFromId('UFNubToggler').parentNode);
            else CSS3.display(getFromId('UFNubToggler').parentNode, 'inline-block');
        }
        core.bubble.setValue({value: core.getCounter()}); 
        try {
            core.sendBeeper({
                type: 'setting',
                text:'Changed <strong>'+$n.name+'</strong> ('+$n.title+') to <strong>'+($n.checked ? 'true' : 'false')+'</strong>.',
                id: $n.id,
                status: null
            });
        }
        catch (exception) { ; }
        setTimeout(function() { CSS3.hide(getFromId('loadingIndicatorSettings')); }, 1000)
    };
    sets.setLang = function() {
        var langs = (new xPathSelector("//input")).getMultipleNodeValues(), input;
        while (input = langs.iterateNext()) {
            if ((input.type == "radio") && (input.name == 'lang') && (input.checked)) {
                $lang = input.id;
                break;
            }
        }
        getFromId($lang).parentNode.innerHTML = '<img src="'+Params.images.smallIndicator+'" style="height: 11px; margin-top: 5px;" />'; 
        setTimeout(function() {
            setKey('language', ($lang?$lang:'en_US')); 
            core.href(Params.protocol+'//www.facebook.com/');
        }, 1000);
    };
    sets.setLangs = function($json) { 
        for (lang in $json.langs) {
            if ($json.langs.hasOwnProperty(lang)) {
                $lang = $json.langs[lang];
                sets.addLangOnSettings($lang);
            }
        }
        sets.addLangOnSettings({name:'Automatic : ', id:'lang_auto', icon:'auto'})
        sets.bindLangs();
    };
    sets.addLangOnSettings = function($lang) {
        tr = new xHTMLElement({
            element: 'tr',
            style: { background: 'white' },
            parentNode: getFromId('langs_tbody')
        }).getElement();

        new xHTMLElement({
            element: 'td',
            className: 'action_text',
            style: {
                borderBottom: '1px solid #E2E6EF',
                margin: '0',
                padding: '3px',
                paddingLeft: '10px'
            },
            innerHTML: Switch($lang.id, {
                'lang_auto': '<span>'+$lang.name+'&nbsp;<img src="http://images.unfriendfinder.net/'+(core.fb_locale)+'.flag" alt="'+core.fb_locale+'" /></span>',
                'default': '<span style="background: url(\'http://images.unfriendfinder.net/'+($lang.icon?$lang.icon:$lang.id)+'.flag\') no-repeat 1px 1px; padding-left:26px;">'+$lang.name+'</span>'
            }),
            parentNode: tr
        });

        new xHTMLElement({
            element: 'td',
            className: 'even_column',
            style: {
                borderBottom: '1px solid #E2E6EF',
                margin: '0',
                padding: '3px',
                textAlign: 'center'
            },
            innerHTML: '<input type="radio" value="'+$lang.id+'" name="lang" id="'+$lang.id+'"' + (LANG == $lang.id ? ' checked="checked"' : '') + ' />',
            parentNode: tr
        });
    };
    sets.bindSettings = function() {
        sets.bindLangs();
        var checks = (new xPathSelector("//input")).getMultipleNodeValues(), input;
        var children = new Array();
        while (input = checks.iterateNext()) {
            if ((input.type == "checkbox") && (/Params\.settings\.[a-z]+/.test(input.name))) EventMgr.addListener(input, 'change', function(e){ sets.setOptions(e.target); });
        }
        EventMgr.addListener(getFromId('paging'), 'click', function() {
            Params.settings.paging = (getFromId('paging').checked ? Params.defaultSettings.paging : 0);
            if (Params.settings.paging == 0) CSS3.hide(getFromId('trPagingCount'));
            else CSS3.display(getFromId('trPagingCount'), 'table-row');
            CSS3.display(getFromId('loadingIndicatorSettings'), 'inline-block');
            setKey('settings', stringify(Params.settings));
            core.Beeper.Add({
                type: 'setting',
                text: 'Changed <strong>Params.settings.paging</strong> to <strong>'+getFromId('paging').checked+'</strong>.',
                id: 'paging',
                status: null
            });
            setTimeout(function() { CSS3.hide(getFromId('loadingIndicatorSettings')); }, 1000)
        });
        EventMgr.addListener(getFromId('pagingCount'), 'change', function() {
            Params.settings.paging = getFromId('pagingCount').value;
            CSS3.display(getFromId('loadingIndicatorSettings'), 'inline-block');
            setKey('settings', stringify(Params.settings));
            core.Beeper.Add({
                type: 'setting',
                text: 'Changed <strong>Params.settings.paging.value</strong> to <strong>'+getFromId('pagingCount').value+'</strong>.',
                id: 'pagingCount',
                status: null
            });
            setTimeout(function() { CSS3.hide(getFromId('loadingIndicatorSettings')); }, 1000)
        });
        EventMgr.addListener(getFromId('paging_help'), 'click', function() {
            if (core.dialogs['pagingHelp']) core.dialogs['pagingHelp'].Hide();
            else {
                Strings.pagingHelpEN = 'Enabling paging will help you to keep your list organized.\nFor people having friendlist with a lot of connections, it will help you to decrease the time of loading.\n<br />It\'s recommended to enable paging.';
                Strings.pagingHelpFR = 'Activer la pagination va vous aider à maintenir vos listes organisées.\nPour les personnes qui ont un grand nombre d\'unfriends, cela va vous aider à diminuer le temps de chargement.\n<br />Il est hautement recommandé d\'utiliser la pagination.';
                core.dialogs['pagingHelp'] = new ContextualFacebox({
                    id: 'pagingHelp',
                    title: '<span class="en_US">Paging</span><span class="fr_FR">Pagination</span>',
                    body: '<span class="en_US">'+nl2br(Strings.pagingHelpEN)+'</span>'+
                    '<span class="fr_FR">'+nl2br(Strings.pagingHelpFR)+'</span>',
                    context: getFromId('paging_help'),
                    orientation: 'right',
                    buttons:[{
                        name: 'hide_button',
                        value: LANG.btn_close,
                        id: 'hide_button',
                        disabled: false,
                        closer: true,
                        type: 'green'
                    }]
                });
                core.dialogs['pagingHelp'].Show(); 
            }
        });
        
        EventMgr.addListener(getFromId('resetButton'), 'click', function() {
            core.showResetDialog();
        });

        EventMgr.addListener(getFromId('exportButton'), 'click', function() {

            $0 = getKey(core.user_id + '_toNotify');
            $1 = getKey(core.user_id + '_unfriends');
            $2 = getKey(core.user_id + '_friends');
            $3 = getKey(core.user_id + '_alwaysHide');
            $4 = getKey(core.user_id + '_unfriendsInfos');
            $5 = getKey(core.user_id + '_awaitingsIgnored');
            $6 = getKey(core.user_id + '_keepAwaitingList');
            $7 = getKey(core.user_id + '_reappeared');
            $8 = getKey(core.user_id + '_deactivated');
            $m = getKey(core.user_id + '_messages');
            $i = getKey(core.user_id + '_helps');
            $g = getKey(core.user_id + '_hasIgnored');
            $h = getKey(core.user_id + '_wasUnfriend');
            $j = getKey(core.user_id + '_countUnfriends');
            $c = getKey('settings');
            $d = getKey('language');
            $e = getKey('google');
            $f = getKey('coreStarted');

            core.dialogs['exportFacebox'] = new Facebox({
                id: 'exportFacebox',
                error: false,
                title: LANG.dataToExport,
                hint: 'Hit CTRL+C to copy data to your clipboard.',
                body: new xHTMLElement({
                    element: 'div',
                    id: 'exportBody',
                    innerHTML: '<textarea id="exportArea">'+
                    '({_toNotify:'+$0+','+
                    ' _unfriends:'+$1+','+
                    ' _friends:'+$2+','+
                    ' _alwaysHide:'+$3+','+
                    ' _unfriendsInfos:'+$4+','+
                    ' _awaitingsIgnored:'+$5+','+
                    ' _keepAwaitingList:'+$6+','+
                    ' _reappeared:'+$7+','+
                    ' _deactivated:'+$8+','+
                    ' _messages:'+$m+','+
                    ' _helps:'+$i+','+
                    ' _hasIgnored:'+$g+','+
                    ' _wasUnfriend:'+$h+','+
                    ' _countUnfriends:'+$j+','+
                    ' settings:'+$c+','+
                    ' language:\''+$d+'\','+
                    ' google:\''+$e+'\','+
                    ' coreStarted:\''+$f+'\'})'+
                    '</textarea>'
                }).getElement(),
                loading: true,
                timeout: 1500,
                afterLoad: function() {
                    getFromId('exportArea').focus();
                    getFromId('exportArea').select();
                },
                indicator: true,
                buttons: [{
                    name: 'cancel',
                    value: LANG.btn_close,
                    id: 'cancel_button',
                    handler: function() { void(0); },
                    disabled: false,
                    closer: true,
                    type: 'gray'
                }]
            });
            core.dialogs['exportFacebox'].Show();

        }); 

        EventMgr.addListener(getFromId('importButton'), 'click', function() {
            core.dialogs['importFacebox'] = new Facebox({
                id: 'importFacebox',
                title: LANG.importData,
                body: new xHTMLElement({
                    element: 'div',
                    id: 'importFaceboxBody',
                    innerHTML: '<textarea id="importArea" style="width:98%; height:300px;"></textarea>'
                }).getElement(),
                error: false,
                loading: true,
                timeout: 300,
                hint: 'Hit CTRL+V to paste data from your clipboard.',
                afterLoad: function() {
                    getFromId('importArea').focus();
                },
                buttons: [{
                    name: 'import',
                    value: LANG.text_import,
                    id: 'import_button',
                    handler: function() {
                        try {
                            if (getFromId('importArea').value == '') return;
                            try { imported = eval(getFromId('importArea').value); }
                            catch (ex) {
                                try { imported = eval('('+getFromId('importArea').value+')'); }
                                catch (exception) { alert('Error while importing data. Check the input data.'); return; }
                            }
                            setKey(core.user_id + '_toNotify', stringify(imported._toNotify));
                            setKey(core.user_id + '_unfriends', stringify(imported._unfriends));
                            setKey(core.user_id + '_friends', stringify(imported._friends));
                            setKey(core.user_id + '_alwaysHide', stringify(imported._alwaysHide));
                            setKey(core.user_id + '_unfriendsInfos', stringify(imported._unfriendsInfos));
                            setKey(core.user_id + '_awaitingsIgnored', stringify(imported._awaitingsIgnored));
                            setKey(core.user_id + '_keepAwaitingList', stringify(imported._keepAwaitingList));
                            setKey(core.user_id + '_reappeared', stringify(imported._reappeared));
                            setKey(core.user_id + '_deactivated', stringify(imported._deactivated));
                            setKey(core.user_id + '_hasIgnored', stringify(imported._hasIgnored));
                            setKey(core.user_id + '_wasUnfriend', stringify(imported._wasUnfriend));
                            setKey(core.user_id + '_countUnfriends', stringify(imported._countUnfriends));
                            setKey(core.user_id + '_messages', stringify(imported._messages));
                            setKey(core.user_id + '_helps', stringify(imported._helps));
                            setKey('settings', stringify(imported.settings));
                            setKey('language', imported.language);
                            setKey('google', imported.google);
                            setKey('coreStarted', 1);
                        }
                        catch (ex) { alert('Error while importing data. Check the input data.'); return; }
                        window.location.reload();
                    },
                    disabled: false,
                    closer: false,
                    type: 'blue'
                }, {
                    name: 'cancel',
                    value: LANG.btn_close,
                    id: 'cancel_button',
                    handler: function() { void(0); },
                    disabled: false,
                    closer: true,
                    type: 'gray'
                }]

            });
            core.dialogs['importFacebox'].Show();
        }); 

        EventMgr.addListener(getFromId('selectAll'), 'click', function() {
            var checks = (new xPathSelector("//input[@bindpoint='reset']")).getMultipleNodeValues(), input;
            while (input = checks.iterateNext()) {
                if ((input.type == "checkbox") && (/reset_/.test(input.id))) input.checked = true;
            }  
        });

        EventMgr.addListener(getFromId('selectNone'), 'click', function() {
            var checks = (new xPathSelector("//input[@bindpoint='reset']")).getMultipleNodeValues(), input;
            while (input = checks.iterateNext()) {
                if ((input.type == "checkbox") && (/reset_/.test(input.id))) input.checked = false;
            } 
        });
    };
    sets.toString = function() { return '[object Settings]'; };
};

var Beeper = function() {
    var _beeper = this;

    _beeper.beeperBox;
    _beeper.arrow;
    _beeper.autoFade = true;
    _beeper.fadeTimeout;
    _beeper.length = 0;

    _beeper.mouseover = false;

    _beeper.fadeIn = function() {
        if (_beeper.beeperBox.style.opacity >= 1) {
            _beeper.mouseover = false;
            return;
        }
        _beeper.beeperBox.style.opacity = parseFloat(_beeper.beeperBox.style.opacity) + 0.01;
        _beeper.arrow.style.opacity = parseFloat(_beeper.beeperBox.style.opacity) + 0.01;
        setTimeout(_beeper.fadeIn, 30);
        _beeper.mouseover = true;
    };

    _beeper.fadeOut = function() { 
        if (_beeper.mouseover) {
            _beeper.beeperBox.style.opacity = 1;
            _beeper.arrow.style.opacity = 1;
        }
        else {
            if (_beeper.beeperBox.style.opacity <= parseFloat(0.03)) {
                _beeper.beeperBox.innerHTML = template.BeeperBox();
                _beeper.length = 0;

                return;
            }
            _beeper.beeperBox.style.opacity = parseFloat(_beeper.beeperBox.style.opacity) - 0.01;
            _beeper.arrow.style.opacity = parseFloat(_beeper.beeperBox.style.opacity) - 0.01;
            _beeper.fadeTimeout = setTimeout(_beeper.fadeOut, 20);
        }
    };
    
    _beeper.Hide = function() {
        _beeper.beeperBox.style.opacity = 0;
        _beeper.arrow.style.opacity = 0;
        _beeper.beeperBox.innerHTML = template.BeeperBox();
        _beeper.length = 0;
    };

    _beeper.Build = function() {
        if (getFromId('fbDockChat')) var fbDockChat = getFromId('fbDockChat');
        _beeper.beeperBox = new xHTMLElement({
            element: 'div',
            id: 'BeeperBoxUF',
            className: 'UFBeeper UFBeeper_Active',
            style: {
                opacity: 0,
                zIndex: 110
            },
            innerHTML: template.BeeperBox(),
            parentNode: fbDockChat,
            listeners: {
                mouseover: function() {
                    if (_beeper.length > 0) { 
                        _beeper.autoFade = false;
                        _beeper.mouseover = true;
                        _beeper.beeperBox.style.opacity = 1;
                        _beeper.arrow.style.opacity = 1;
                        if (_beeper.fadeTimeout) clearTimeout(_beeper.fadeTimeout);
                    }
                },
                mouseout: function() {
                    if (_beeper.length > 0) { 
                        _beeper.autoFade = false;
                        _beeper.mouseover = false; 
                        if (_beeper.fadeTimeout) clearTimeout(_beeper.fadeTimeout);
                        _beeper.fadeTimeout = setTimeout(_beeper.fadeOut, 3000);
                    }
                }
            }
        }).getElement();

        _beeper.arrow = new xHTMLElement({
            element: 'div',
            id: 'UFBeeper_Arrow',
            className: 'UFBeeper_Arrow',
            style: {
                opacity: 0,
                zIndex: 110
            },
            parentNode: fbDockChat
        }).getElement();
    };

    _beeper.Add = function(__constructor) {
        if (!Params.Beeper.enabled) return;
        if (getFromId('UFBeeper_'+__constructor.type+'_'+__constructor.id)) {
            getFromId('UFBeeper_'+__constructor.type+'_'+__constructor.id).innerHTML = __constructor.text;
            _beeper.Show();
        }
        else {
            Console.log('Adding '+__constructor.type+' beep, id:'+__constructor.id);
            _beeper.message = __constructor.text;
            if (__constructor.status) _beeper.message = _beeper.message+'<br /><span id="notification_uf_status_'+__constructor.id+'" class="uiTextMetadata"><span style="font-size: 11px; line-height: 11px; cursor:help;" class="uiStreamSource">'+(__constructor.status == 'deactivated'?LANG.text_deactivated:'')+'</span></span>'

            if (__constructor.type == 'unfriend') {
                if (__constructor.status == 'deactivated') {
                    if (!Params.Beeper.deactivated) return;
                    _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_deactivated" alt="" />'; 
                }
                else {
                    if (!Params.Beeper.unfriend) return;
                    _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_unfriends" alt="" />'; 
                }
            }
            else if (__constructor.type == 'messages') {
                if (!Params.Beeper.messages) return;
                _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon UIImageBlock_Image UIImageBlock_ICON_Image sx_app_icons_message" alt="" />';
            }
            else if (__constructor.type == 'ignored') {
                if (!Params.Beeper.ignored) return;
                _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_awaitings" alt="" />';
            }
            else if (__constructor.type == 'version') {
                if (!Params.Beeper.newversion) return;
                _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon spritemap_icons" style="background:no-repeat -18px -432px url(\''+Params.links.rsrc+'/z1KF3/hash/51woxxd9.png\');" alt="" />';
            }
            else if (__constructor.type == 'setting') {
                if (!Params.Beeper.settings) return;
                _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon spritemap_icons_fix" style="background-position: 0px -1182px; height:16px;" alt="" />';
            }
            else if (__constructor.type == 'reappeared') {
                if (!Params.Beeper.reappeared) return;
                _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_reappeared" alt="" />';
            }
            else if (__constructor.type == 'friend') {
                if (!Params.Beeper.newfriend) return;
                _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_friend" alt="" />';
            }
            else if (__constructor.type == 'error') {
                _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_awaitings" alt="" />';
            }

            _beeper.length++;
            var children = _beeper.getBeeperChildren(_beeper.beeperBox), n;
            _beeper.beepsBox = _beeper.beeperBox.getElementsByClassName('Beeps')[0]

            if (!children) n = 0;
            else n = children.length;
            new xHTMLElement({
                element: 'div',
                innerHTML: ''+
                '                <div class="UFBeep_NonIntentional status_'+__constructor.status+'" style="cursor:default; width:100%">'+
                '                    <div class="UFBeep_Icon">'+_beeper.icon+'</div>'+
                '                    <div class="UFBeep_Title" id="UFBeeper_'+__constructor.type+'_'+__constructor.id+'" style="cursor:default; width:180px;">'+_beeper.message+'</div>'+
                '                    <a href="#" onclick="return false;" style="visibility:hidden; float:right; margin-bottom:-4px;" id="hide_notification_'+__constructor.id+'" class="uiHideNotification uiSelectorButton uiCloseButton uiCloseButton uiCloseButton" title="Remove"></a>'+
                '                </div>',
                parentNode: _beeper.beepsBox
            });

            try {
                children = _beeper.getBeeperChildren(_beeper.beepsBox);
                n = children.length;

                for (i=0;i<n;i++) {
                    CSS3.setClass(children[i], 'UFBeep');
                    if (i == 0) CSS3.addClass(children[i], 'UFBeep_Top');
                    if (i == (n -1)) CSS3.addClass(children[i], 'UFBeep_Bottom');
                }
                _beeper.beeperMouseEvents();
            }
            catch (ex) { ; }

            EventMgr.addListener(getFromId('hide_notification_'+__constructor.id), 'click', function() {
                setTimeout(function() {
                    _beeper.closing = false;
                    getFromId('UFBeeper_Arrow').style.opacity = 0; 
                    getFromId('BeeperBoxUF').style.opacity = 0; 
                    _beeper.beeperBox.innerHTML = template.BeeperBox();
                    _beeper.length = 0;
                }, 100);
            });

            _beeper.Show();

            if (getFromId('UFMessagesBeeperLink')) {
                setTimeout(function() { 
                    EventMgr.addListener(getFromId('UFMessagesBeeperLink'), 'click', function() { 
                        (new Handler()).clickHeaderToShowMessages(); 
                    });
                }, 500);
            }
        }

    };

    _beeper.Create = function() {
        Console.log('Creating beeper');
        var parent = getFromId('fbDockChat');
        if (parent) {
            var n = document.getElementsByClassName('UFBeeper_Active').length;
            if (n == 0) _beeper.Build();
            else if (n == 1) {
                _beeper.beeperBox = document.getElementsByClassName('UFBeeper_Active')[0];
                _beeper.Add();
            }
        }
    };

    _beeper.Show = function() {
        _beeper.fadeIn();
        if (_beeper.fadeTimeout) clearTimeout(_beeper.fadeTimeout);
        _beeper.fadeTimeout = setTimeout(_beeper.fadeOut, Params.Beeper.timer * 1000);
    };

    _beeper.getBeeperChildren = function(el) {
        var beepers = (new xPathSelector("//*[@class='Beeps']/div")).getMultipleNodeValues(), boxes = new Array(), child;
        while (child = beepers.iterateNext()) { boxes.push(child); }
        return boxes;
    };

    _beeper.beeperMouseEvents = function() {
        var children = _beeper.getBeeperChildren(_beeper.beepsBox), n = children.length, child;
        for (i=0;i<n;i++) {
            child = children[i];

            _beeper.beepAddMouseEvent(child);
            CSS3.setClass(child, 'UFBeep');
            if (i == 0) CSS3.addClass(child, 'UFBeep_Top');
            if (i == (n -1)) CSS3.addClass(child, 'UFBeep_Bottom');
        }

    };

    _beeper.beepAddMouseEvent = function(child, $n) {
        if (parent = child.parentNode.parentNode) {
            EventMgr.addListener(child, 'mouseover', function() {
                CSS3.addClass(child, 'UFBeep_Selected');
                if (/UFBeep_Bottom/.test(child.className)) CSS3.setClass(getFromId('UFBeeper_Arrow'), 'UFBeeper_Arrow_Selected');
            });
            EventMgr.addListener(child, 'mouseout', function() {
                CSS3.removeClass(child, 'UFBeep_Selected'); 
                if (/UFBeep_Bottom/.test(child.className)) CSS3.setClass(getFromId('UFBeeper_Arrow'), 'UFBeeper_Arrow');
            });
        }
    };

    _beeper.toString = function() { return '[object Beeper]'; }

    _beeper.Build();
};

var Notification = function(__constructor) {
    var _notification = this;
    Extend(_notification, __constructor);

    if ((!_notification.id) || (!_notification.text) || (!_notification.type)) return;

    _notification.colors = [239, 241, 247]; 
    _notification.divNotif;
    _notification.whiteIn = function() {
        var notifs = getFromId('ufNotificationsList').getElementsByClassName('notification');
        if ((_notification.colors[0] >= 255) && (_notification.colors[1] >= 255) && (_notification.colors[2] >= 255)) {
            _notification.colors[0] = 255;
            _notification.colors[1] = 255;
            _notification.colors[2] = 255;
            var n;
            for (n = 0;n<notifs.length;n++) {
                if (notifs[n]) notifs[n].style.background = 'rgb(255, 255, 255)';
            }
            return;
        }
        var n;
        for (n = 0;n<notifs.length;n++) {
            if (notifs[n]) notifs[n].style.background = 'rgb('+_notification.colors[0]+', '+_notification.colors[1]+', '+_notification.colors[2]+')';
        }
        if (_notification.colors[0] < 255) _notification.colors[0] += 1;
        if (_notification.colors[1] < 255) _notification.colors[1] += 1;
        if (_notification.colors[2] < 255) _notification.colors[2] += 1;
        setTimeout(function() {
            Console.log('setTimeout _notification.whiteIn');
            _notification.whiteIn();
        }, 200);
    };
    _notification.AddBlock = function() {
        try {
            if (!getFromId('fbNotificationsList')) return;
            var content = getFromId('fbNotificationsList').firstChild, divFix; 
            if (getFromId('jewelNoNotifications')) getFromId('fbNotificationsList').removeChild(getFromId('jewelNoNotifications')); 
            if (getFromId('ufNotificationsList')) divFix = getFromId('ufNotificationsList');
            else {
                divFix = new xHTMLElement({
                    element: 'ul',
                    id: 'ufNotificationsList',
                    style: {
                        padding: '0px',
                        paddingTop: '2px'
                    },
                    className: 'jewelItemList jewelHighlight'
                }).getElement();

                if (getFromId('fbNotificationsFlyout')) getFromId('fbNotificationsFlyout').insertBefore(divFix, getFromId('fbNotificationsList'));
                CSS3.addClass(getFromId('fbNotificationsFlyout'), 'jewelFix');
                if (getFromId('fbNotificationsList')) getFromId('fbNotificationsList').style.paddingTop = '0px';
            }
            try {
                var notificationTime = (_notification.type == 'unfriend'?
                core.genTime(core.unfriends.Items[_notification.id]?core.unfriends.Items[_notification.id].time:core.time()):
                core.genTime(core.awaitingsIgnored.Items[_notification.id]?core.awaitingsIgnored.Items[_notification.id].time:core.time()));
                _notification.divNotif = new xHTMLElement({
                    element: 'li',
                    id: 'notification_uf_'+_notification.id,
                    className: 'notification',
                    style: {
                        background: 'rgb(239, 241, 247)'
                    },
                    innerHTML: (_notification.type == 'unfriend'?
                    ''+
                    '<a href="'+Params.protocol+'//www.facebook.com/profile.php?id='+_notification.id+'">'+
                    '   <div class="UIImageBlock clearfix">'+
                    '       <img src="'+Params.protocol+'//graph.facebook.com/'+_notification.id+'/picture" class="uiProfilePhoto UIImageBlock_Image UIImageBlock_ICON_Image uiProfilePhotoLarge img">'+
                    '       <div class="info UIImageBlock_Content UIImageBlock_ICON_Content status_'+_notification.status+'">'+
                    '           <div>'+
                    '               <span class="blueName">'+_notification.text+'</span> '+LANG.text_unfriend+
                    '           </div>'+
                    '           <div class="UIImageBlock clearfix metadata">'+
                    '               <i class="UIImageBlock_Image UIImageBlock_ICON_Image spritemap_app_icons img sx_app_icons_unfriends"></i>'+
                    '               <span class="UIImageBlock_Content UIImageBlock_ICON_Content fss fwn fcg" style="padding-top:3px ! important;">'+
                    '                   <abbr id="notification_uf_status_'+_notification.id+'" class="timestamp"><span class="en_US">Detected on: </span><span class="fr_FR">Détécté le: </span>'+(_notification.status == 'deactivated'?LANG.text_deactivated+', ':'')+notificationTime+'</abbr>'+
                    '               </span>'+
                    '           </div>'+
                    '       </div>'+
                    '   </div>'+
                    '</a>': ''+
                    '<a href="'+Params.protocol+'//www.facebook.com/profile.php?id='+_notification.id+'">'+
                    '   <div class="UIImageBlock clearfix">'+
                    '       <img src="'+Params.protocol+'//graph.facebook.com/'+_notification.id+'/picture" class="uiProfilePhoto UIImageBlock_Image UIImageBlock_ICON_Image uiProfilePhotoLarge img">'+
                    '       <div class="info UIImageBlock_Content UIImageBlock_ICON_Content status_'+_notification.status+'">'+
                    '           <div>'+
                    '               <span class="blueName">'+_notification.text+'</span> '+LANG.text_ignored+
                    '           </div>'+
                    '           <div class="UIImageBlock clearfix metadata">'+
                    '               <i class="UIImageBlock_Image UIImageBlock_ICON_Image spritemap_app_icons img sx_app_icons_awaitings"></i>'+
                    '               <span class="UIImageBlock_Content UIImageBlock_ICON_Content fss fwn fcg" style="padding-top:3px ! important;">'+
                    '                   <abbr id="notification_uf_status_'+_notification.id+'" class="timestamp"><span class="en_US">Detected on: </span><span class="fr_FR">Détécté le: </span>'+notificationTime+'</abbr>'+
                    '               </span>'+
                    '           </div>'+
                    '       </div>'+
                    '   </div>'+
                    '</a>'),
                    parentNode: divFix,
                    listeners: {
                        mouseover: function() { CSS3.setClass(_notification.divNotif, 'notification selected'); },
                        mouseout: function() { CSS3.setClass(_notification.divNotif, 'notification'); },
                        click: function() {
                            inject("Toggler.toggle(this);");
                            if (getFromId('filter_unfriends')) new Handler('filter');
                            else core.href(Params.protocol+'//www.facebook.com/?sk=uf');
                        }
                    }
                }).getElement();
            }
            catch (ex) { ; }
            if (!/openToggler/.test(getFromId('fbNotificationsFlyout').parentNode.className)) {
                //timer to make div white
                if (getFromId('fbNotificationsJewel')) {
                    EventMgr.addListener(getFromId('fbNotificationsJewel'), 'click', function() { 
                        _notification.colors = [239, 241, 247];
                        Console.log('setTimeout _notification.whiteIn'); 
                        setTimeout(_notification.whiteIn, 4000);
                    });
                }
            }
            else {
                _notification.colors = [239, 241, 247]; 
                Console.log('setTimeout _notification.whiteIn');
                setTimeout(_notification.whiteIn, 4000);
            }
        }
        catch (ex) { ; }
    };
    _notification.mouseover = function($el) {
        EventMgr.addListener($el, 'mouseover', function () { CSS3.addClass($el, 'selected'); });
        EventMgr.addListener($el, 'mousemove', function () { CSS3.addClass($el, 'selected'); });
    };
    _notification.mouseout = function($el) {
        EventMgr.addListener($el, 'mouseout', function () { CSS3.removeClass($el, 'selected'); });
    };
    _notification.Add = function() {

        if (!/openToggler/.test(getFromId('fbNotificationsFlyout').parentNode.className)) {
            core.injectNotification();
        }
    };
    _notification.toString = function() { return '[object Notification]'; };

    if (getFromId('fbNotificationsJewel')) {

        EventMgr.addListener(getFromId('fbNotificationsJewel'), 'click', function () {
            try {
                if (core.Beeper.length > 0) {
                    if (core.Beeper.fadeTimeout) clearTimeout(core.Beeper.fadeTimeout);
                    Console.log('setTimeout core.Beeper.fadeOut');
                    core.Beeper.fadeTimeout = setTimeout(core.Beeper.fadeOut, 10);
                }
            }
            catch (exception) { ; }
            core.injectNotification();
            core.toNotify = new CollectionList(eval(getKey(core.user_id + '_toNotify', '({})')));
            for (n in core.toNotify.Items) {
                if (core.toNotify.Items.hasOwnProperty(n)) {
                    core.toNotify.Items[n] = 'no';
                }
            }
            setKey(core.user_id + '_toNotify', core.toNotify.toString());
            core.awaitingsIgnored = new CollectionList(eval(getKey(core.user_id + '_awaitingsIgnored', '({})')));
            for (n in core.awaitingsIgnored.Items) {
                if (core.awaitingsIgnored.Items.hasOwnProperty(n)) {
                    core.awaitingsIgnored.Items[n].toNotify = 'no';
                }
            }
            setKey(core.user_id + '_awaitingsIgnored', core.awaitingsIgnored.toString());
            CSS3.removeClass(getFromId('notificationsWrapper'), 'jewelNew');
        });
    }

    _notification.Add();
    _notification.AddBlock();
};

var UserItem = function(__constructor) {
    var _useritem = this;
    Extend(_useritem, __constructor);

    _useritem.element;
    _useritem.name = evalName(_useritem.name);

    _useritem.Build = function() {
        if (getFromId('homeUnfriends')) {
            if (_useritem.from == "awaiting") textHide = LANG.text_removec;
            else textHide = LANG.text_hide;
            if (_useritem.from == "unfriend") textHide = textHide;
            if (_useritem.from == "unfriend") textTitle = 'This is the date on which Unfriend Finder has detected that '+_useritem.name+' was no longer in your friendlist. ('+(new Date(_useritem.time *1000)).toLocaleString()+') This is not necessarily the date on which '+_useritem.name+' precisely removed you or deactivated his/her profile.';
            else if (_useritem.from == "rawaiting-a") textTitle = 'This is the date on which Unfriend Finder has detected that '+_useritem.name+' accepted your friend request. ('+(new Date(_useritem.time *1000)).toLocaleString()+') This is not necessarily the date on which '+_useritem.name+' precisely accepted the request.';
            else if (_useritem.from == "rawaiting-i") textTitle = 'This is the date on which Unfriend Finder has detected that '+_useritem.name+' ignored your friend request. ('+(new Date(_useritem.time *1000)).toLocaleString()+') This is not necessarily the date on which '+_useritem.name+' precisely ignored the request.';
            else if (_useritem.from == "rawaiting") textTitle = 'This is the date on which Unfriend Finder has detected that '+_useritem.name+' accepted or ignored your friend request. ('+(new Date(_useritem.time *1000)).toLocaleString()+') This is not necessarily the date on which '+_useritem.name+' precisely accepted or ignored the request.';
            else if (_useritem.from == "reappeared") textTitle = 'This is the date on which Unfriend Finder has detected that '+_useritem.name+' reappeared in your friendlist. ('+(new Date(_useritem.time *1000)).toLocaleString()+')';
            else textTitle = '';

            if (_useritem.isNew) {
                _useritem.element = {id: 'n'+_useritem.id};
                setTimeout(function() { _useritem.element.id = _useritem.id; }, 1500);
            }
            else _useritem.element = {id: _useritem.id};

            if (getFromId(_useritem.element.id)) return;
            _useritem.element = new xHTMLElement({
                element: 'li',
                id: (_useritem.isNew?'n':'')+_useritem.id,
                className: 'objectListItem ufListItem',
                style: {
                    height: '50px',
                    background: (_useritem.highlighted?'#FFF9D7':'')
                },
                innerHTML: ''+
                '   <div class="UIImageBlock clearfix UIImageBlock_Entity from'+_useritem.from+'">'+
                '       <a href="'+Params.protocol+'//www.facebook.com/profile.php?id='+_useritem.id+'" class="UIImageBlock_Image UIImageBlock_SMALL_Image" style="background: url(\''+Params.images.noPicture+'\');">'+
                '           <img id="img_userpic__'+_useritem.id+'" src="'+Params.images.blank+'" class="objectListImg_fix img" style="background:url(\''+_useritem.picture+'\');">'+
                '       </a>'+
                '       <div class="auxiliary UIImageBlock_Ext" id="div_rightContent_'+_useritem.id+'">'+
                '           <span class="loadingIndicator" style="display: block; visibility: visible;"></span>'+
                '           <label class="uiButton uiButtonConfirm unfriendHide"><input type="button" value="'+textHide+'" name="'+_useritem.id+'" id="a_removeLink'+_useritem.id+'"></label>'+
                '           <label class="uiButton uiButtonSpecial unfriendAlwaysHide" style="display:none;"><input type="button" value="'+LANG.text_alwayshide+'" name="'+_useritem.id+'" id="a_AremoveLink'+_useritem.id+'"></label>'+
                '           <label class="uiButton uiButtonDefault unfriendBlock" style="display:none;"><input type="button" value="'+LANG.block+'" name="'+_useritem.id+'" id="a_BremoveLink'+_useritem.id+'"></label>'+
                '       </div>'+

                ((_useritem.time && Params.settings.showTime)?
                '       <div class="UIImageBlock_Content UIImageBlock_ENT_Content">'+
                '           <div style="font-weight: bold; font-size:13px; cursor: default;">'+
                '               <a href="'+Params.protocol+'//www.facebook.com/profile.php?id='+_useritem.id+'" id="a_username__'+_useritem.id+'">'+_useritem.name+'</a>&nbsp;<span style="font-weight:normal; cursor:default;" id="span_data_subtext__'+_useritem.id+'">'+_useritem.subname+'</span>'+
                '           </div>'+
                '           <div class="uiTextSubtitle">'+
                '               <div class="requestLabel" style="padding-top: 5px; cursor:default;">'+
                '                   <span id="span_icon__'+_useritem.id+'" style="width:21px;"><img src="'+Params.images.smallIndicator+'" style="margin-left:5px; margin-bottom:-1px;" /></span>'+
                '                   <span style="font-size: 11px; line-height: 17px; cursor:help;" class="uiStreamSource" title="'+textTitle+'"><span id="text_detected"><span class="en_US">Detected on: </span><span class="fr_FR">Détécté le: </span></span>'+core.genTime(_useritem.time)+'</span>'+
                '               </div>'+
                '           </div>'+
                '       </div>':
                ''+
                '       <div class="UIImageBlock_Content UIImageBlock_ENT_Content">'+
                '           <div style="font-weight: bold; font-size:13px; cursor: default;">'+
                '               <a href="'+Params.protocol+'//www.facebook.com/profile.php?id='+_useritem.id+'" id="a_username__'+_useritem.id+'">'+_useritem.name+'</a>'+
                '           </div>'+
                '           <div class="uiTextSubtitle">'+
                '               <div class="requestLabel" style="padding-top: 5px; cursor:default;">'+
                '                   <span id="span_icon__'+_useritem.id+'" style="width:21px;"><img src="'+Params.images.smallIndicator+'" style="margin-left:5px; margin-bottom:-1px;" /></span>'+
                '                   <span style="line-height:15px; cursor:default;" class="uiStreamSource" id="span_data_subtext__'+_useritem.id+'">'+_useritem.subname+'</span>'+
                '               </div>'+
                '           </div>'+
                '       </div>'
                )+
                '   </div>',
                parentNode: Switch(_useritem.from, {
                    'rawaiting': getFromId('acceptedignoredContentUL'),
                    'rawaiting-a': getFromId('acceptedContentUL'),
                    'rawaiting-i': getFromId('ignoredContentUL'),
                    'awaiting': getFromId('pendingContentUL'),
                    'reappeared': getFromId('reappearedContentUL')
                })
            }).getElement();

            if (_useritem.isNew) setTimeout(function() { _useritem.element.id = _useritem.id; }, 1500);

            if (_useritem.highlighted) core.listHighlighted.push(_useritem.element);

            if (_useritem.from == "unfriend") {
                if (getFromId('unfriendsContentUL').firstChild) getFromId('unfriendsContentUL').insertBefore(_useritem.element, getFromId('unfriendsContentUL').firstChild);
                else getFromId('unfriendsContentUL').appendChild(_useritem.element)
            }

            if (!Params.settings.icons) CSS3.hide(getFromId('span_icon__'+_useritem.id));

            var a_removeLink = getFromId('a_removeLink'+_useritem.id), a_AremoveLink = getFromId('a_AremoveLink'+_useritem.id), a_BremoveLink = getFromId('a_BremoveLink'+_useritem.id), div_rightContent = getFromId('div_rightContent_'+_useritem.id);
            if (_useritem.from == "rawaiting") EventMgr.addListener(a_removeLink, 'click', function() { core.clickToRemoveA(_useritem.id) });
            else if (_useritem.from == "rawaiting-a") EventMgr.addListener(a_removeLink, 'click', function() { core.clickToRemoveA(_useritem.id) });
            else if (_useritem.from == "rawaiting-i") EventMgr.addListener(a_removeLink, 'click', function() { core.clickToRemoveA(_useritem.id) });
            else if (_useritem.from == "awaiting") {
                if (core.uf_fb_dtsg === null) CSS3.hide(div_rightContent);
                if (core.uf_fb_dtsg === undefined) CSS3.hide(div_rightContent);
                EventMgr.addListener(a_removeLink, 'click', function() { core.removeConnectionWith({uid: _useritem.id}) });
            }
            else if (_useritem.from == "reappeared") EventMgr.addListener(a_removeLink, 'click', function() { core.removeFromReappeared(_useritem.id) });
            else if (_useritem.from == "unfriend") {
                EventMgr.addListener(a_removeLink, 'click', function() { core.clickToRemove(_useritem.id) });
                EventMgr.addListener(a_AremoveLink, 'click', function() { core.clickToRemove(_useritem.id) });
                EventMgr.addListener(a_BremoveLink, 'click', function() { core.blockProfile(_useritem.id) });
            }
            if ((_useritem.hidden) || (_useritem.status == 'deactivated')) {
                getFromId('img_userpic__'+_useritem.id).parentNode.style.opacity = 0.4;
                getFromId('a_username__'+_useritem.id).style.color = 'inherit';
                getFromId('a_username__'+_useritem.id).style.cursor = 'default';
                getFromId('a_username__'+_useritem.id).style.textDecoration = 'none';
                getFromId('a_username__'+_useritem.id).href = 'javascript:void(0)';
                getFromId('img_userpic__'+_useritem.id).parentNode.style.cursor = 'default';
                getFromId('img_userpic__'+_useritem.id).parentNode.href = 'javascript:void(0)';
            }
        }
    };

    _useritem.Build();

    _useritem.toString = function() { return '[object UserItem]'; };

    return _useritem;
};

var UserCheck = function(__constructor) {
    var usercheck = this;
    Extend(usercheck, __constructor);

    usercheck.profileUrl = Params.protocol+'//www.facebook.com/profile.php?id='+usercheck.uid;
    usercheck.user = core.unfriends.Items[usercheck.uid];
    if (usercheck.status == 'unfriend') core.setSubName({uid: usercheck.uid, text: LANG.text_unfriend, type: 'unfriend'});
    else if (usercheck.status == 'deactivated') core.setSubName({uid: usercheck.uid, text: LANG.text_deactivated, type: 'hidden'});
    if ((core.time() - usercheck.user.lastcheck) < (60*60*24*3)) {
        if (usercheck.last) {
            CSS3.hide(getFromId('loadingIndicatorUnfriends'));
            CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
        }
        return;
    }
    usercheck.distinct = function() {
        if (/<body [^>]+>/.test(usercheck.pageContent)) {
            var body = usercheck.pageContent.match(/<body [^>]+>/)[0];
            var profile = /<div id=.?"leftCol.?">/.test(usercheck.pageContent);
            if (profile) usercheck.profile();
            else usercheck.notFound();
        }
        else if (/window.location.replace\("([^"]*)"\)/.test(usercheck.pageContent)){
            redirect = usercheck.pageContent.match(/window.location.replace\("([^"]*)"\)/);
            if (redirect[1]) {
                usercheck.profileUrl = redirect[1].replace(/\\\//g, '/'); 
                usercheck.Load();
            }
        }
        else if (/for \(;;\);\{/.test(usercheck.pageContent)) {
            if (myJson = eval('('+usercheck.pageContent.replace('for (;;);', '')+')')) { 
                if (redirect = myJson.payload.redirect) { 
                    usercheck.profileUrl = redirect.replace(/\\\//g, '/'); 
                    usercheck.Load();
                }   
            }   
        }
    };

    usercheck.profile = function() {
        if (/profile_action_remove_friend/.test(usercheck.pageContent)) {
            matches3 = usercheck.pageContent.match(Params.profilePicRegex);
            if (!matches3) { matches3 = [Params.images.noPicture, LANG.text_deactivated]; }
            core.setName(usercheck.uid, matches3[2], false);
            core.setPicture(usercheck.uid, matches3[1]);
            core.setSubName({uid: usercheck.uid, text: LANG.text_being, type: 'hidden'});
            if (getFromId('img_userpic__' + usercheck.uid)) getFromId('img_userpic__' + usercheck.uid).parentNode.style.opacity = '0.4';

            core.deactivated = new CollectionList(eval(getKey(core.user_id + '_deactivated', '({})')));
            core.deactivated.Add(usercheck.uid, usercheck.user);
            setKey(core.user_id + '_deactivated', core.deactivated.toString());

            core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
            if (core.unfriends.Items[usercheck.uid]) {
                core.unfriends.Items[usercheck.uid].status = 'deactivated';
                core.unfriends.Items[usercheck.uid].lastcheck = core.time(); 
            }
            setKey(core.user_id + '_unfriends', core.unfriends.toString());
        }
        else {
            matches2 = usercheck.pageContent.match(Params.profilePicRegex);
            core.setSubName({uid: usercheck.uid, text: LANG.text_unfriend, type: 'unfriend'});

            core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
            if (core.unfriends.Items[usercheck.uid]) core.unfriends.Items[usercheck.uid].status = 'unfriend';

            try {
                if (matches2) {
                    core.setName(usercheck.uid, matches2[2], true);
                    core.unfriends.Items[usercheck.uid].name = matches2[2];
                    core.unfriends.Items[usercheck.uid].lastcheck = core.time(); 
                    core.setPicture(usercheck.uid, matches2[1]);
                    if (usercheck.last) {
                        CSS3.hide(getFromId('loadingIndicatorUnfriends'));
                        CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
                    }
                }
            } catch (ex) { ; }
            setKey(core.user_id + '_unfriends', core.unfriends.toString());
        }
    };

    usercheck.notFound = function() {
        core.setName(usercheck.uid, usercheck.user.name, false);
        core.setPicture(usercheck.uid, null);
        core.setSubName({uid: usercheck.uid, text: LANG.text_deactivated, type: 'hidden'});
        if (getFromId('img_userpic__' + usercheck.uid)) getFromId('img_userpic__' + usercheck.uid).parentNode.style.opacity = '0.4';
        if (usercheck.last) {
            CSS3.hide(getFromId('loadingIndicatorUnfriends'));
            CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
        }

        core.deactivated = new CollectionList(eval(getKey(core.user_id + '_deactivated', '({})')));
        core.deactivated.Add(usercheck.uid, usercheck.user);
        setKey(core.user_id + '_deactivated', core.deactivated.toString());

        core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
        if (core.unfriends.Items[usercheck.uid]) {
            core.unfriends.Items[usercheck.uid].status = 'deactivated';
            core.unfriends.Items[usercheck.uid].lastcheck = core.time(); 
        }
        setKey(core.user_id + '_unfriends', core.unfriends.toString());
    };

    usercheck.Load = function() {
        if (usercheck.profileUrl) Ajax({
            method: 'get',
            headers: Params.Ajax.Headers,
            url: usercheck.profileUrl,
            onload: function(data) {
                usercheck.pageContent = data;
                usercheck.distinct();
            },
            onerror: function(data) {
                usercheck.notFound();
            }
        });
    };

    usercheck.toString = function() { return '[object UserCheck]'; };

    usercheck.Load();
};
                                                           
var UnfriendFinder = function($Env) {
    if (!$Env) {
        Console.error('URL is not suitable for '+Params._0x4d22, document.location);
        core = null;
        return false; 
    }
    core = this;
    if (!$Env.match(/user:\s?([0-9]+),/)) {
        return false;
    }
    Params.started = true; 
    if ($Env.match(/user:\s?([0-9]+),/)[1] == 0) {
        void(r = rand(122));
        var s = (r % 2);
        if (s == 1) {
            var MainSell = document.getElementsByClassName('WelcomePage_MainSellLeft')[0];
            MainSell.innerHTML = ''+
            '<div class="WelcomePage_MainSellLeft">'+
            '   <div class="LogoutPage_MobileMainContainer">'+
            '       <div class="LogoutPage_MobileMessageContainer">'+
            '           <div class="LogoutPage_MobileMessage">You&nbsp;see&nbsp;your&nbsp;friendlist&nbsp;going&nbsp;down&nbsp;?</div>'+
            '           <div class="LogoutPage_MobileSubmessage">Find&nbsp;out&nbsp;who&nbsp;ditched&nbsp;you&nbsp;with&nbsp;Unfriend&nbsp;Finder!</div>'+
            '       </div>'+
            '       <div class="LogoutPage_ActivateMobileButton">'+
            '           <a href="http://www.unfriendfinder.'+(Params.lang == 'fr'?'fr':'com')+'/home" class="mas uiButton uiButtonSpecial UIButton_Green">'+
            '               <span class="uiButtonText uiButtonSpecial">Take a tour</span>'+
            '           </a>'+
            '       </div>'+
            '       <a onlick="window.open(this.href); return false;" href="http://www.unfriendfinder.'+(Params.lang == 'fr'?'fr':'com')+'">'+
            '           <i class="LogoutPage_MobileIcon img" style="background: url(&quot;http://www.unfriendfinder.net/images/logoLogin.png&quot;) no-repeat scroll 0% 0% transparent; width: 1000px; height: 1000px; margin-left: 30px; margin-top: 25px;"></i>'+
            '       </a>'+
            '   </div>'+
            '</div>';
        }
        Console.error('Core started but you are logged off', '');
        return false; 
    } 

    Console.log('Core constructed');

    if (/hasLeftCol/.test(document.body.className)) CSS3.addClass(document.body, 'nonuflist');

    //Variables
    Params.newVersion = false;
    core.payload;
    core.bubble;
    core.filterstatus;
    core.loopCount = -1;
    core.listHighlighted = new Array();
    core.dialogs = {};
    core.checkUID;

    //Environnement parameters
    core.user_id = $Env.match(/user:([0-9]+),/)[1];
    core.fb_locale = document.body.className.match(/Locale_([a-z]{2}_[A-Z]{2})\s?/)[1];
    core.uf_fb_dtsg = $Env.match(/fb_dtsg:"([^,]+)",/)[1];
    core.uf_post_form_id = $Env.match(/post_form_id:"([^,]+)",/)[1];


    //Lists
    core.friends = ({});
    core.backupFriends = ({});
    core.toNotify = ({});
    core.unfriends = ({});
    core.friends = ({});
    core.keepAwaitingList = ({});
    core.unfriendsInfos = ({});
    core.awaitingsIgnored = ({});
    core.unfriendsList = ({});
    core.reappeared = ({});
    core.deactivated = ({});
    core.wasUnfriend = ({});
    core.hasIgnored = ({});
    core.notifications = {};
    core.countUnfriends = ({});
    core.watchRemove = null;

    core.externalConnect = function(html) { };

    core.dat = 'id='+core.user_id+'&version='+Params.version+'&locale='+core.fb_locale+(Params.versionChanged?'&newVersion=1':'');
    
    //Methods
    core.initLists = function() { //instanciation des listes
        Console.log('Building lists');

        core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
        core.backupFriends = new CollectionList(eval(getKey(core.user_id + '_friends', '({})')));
        core.toNotify = new CollectionList(eval(getKey(core.user_id + '_toNotify', '({})')));
        core.unfriendsInfos = new CollectionList(eval(getKey(core.user_id + '_unfriendsInfos', '({})')));
        core.awaitingsIgnored = new CollectionList(eval(getKey(core.user_id + '_awaitingsIgnored', '({})')));
        core.keepAwaitingList = new CollectionList(eval(getKey(core.user_id + '_keepAwaitingList', '({})')));
        core.reappeared = new CollectionList(eval(getKey(core.user_id + '_reappeared', '({})')));
        core.deactivated = new CollectionList(eval(getKey(core.user_id + '_deactivated', '({})')));
        core.wasUnfriend = new CollectionList(eval(getKey(core.user_id + '_wasUnfriend', '({})')));
        core.hasIgnored = new CollectionList(eval(getKey(core.user_id + '_hasIgnored', '({})')));
        core.alwaysHide = new CollectionList(eval(getKey(core.user_id + '_alwaysHide', '({})')));
        core.countUnfriends = new CollectionList(eval(getKey(core.user_id + '_countUnfriends', '({})')));
        core.watchRemove = getKey(core.user_id + '_watchRemove', '0');
        core.keepAwaitingsTime = new CollectionList(eval(getKey(core.user_id + '_keepAwaitingsTime', '({})')));

        core.friends = new CollectionList();
        core.friends.exception('Add', core.user_id);
        try {
            for (n in core.alwaysHide.Items) {
                if (core.alwaysHide.Items.hasOwnProperty(n)) {
                    core.unfriends.exception('Add', n);
                }
            }
        } catch(ex) { ; }
    };

    core.writeLists = function() {
        Console.log('Writing lists');

        setKey(core.user_id + '_unfriends', core.unfriends.toString());
        setKey(core.user_id + '_friends', core.backupFriends.toString());
        setKey(core.user_id + '_unfriendsInfos', core.unfriendsInfos.toString());
        setKey(core.user_id + '_awaitingsIgnored', core.awaitingsIgnored.toString());
        setKey(core.user_id + '_keepAwaitingList', core.keepAwaitingList.toString());
        setKey(core.user_id + '_reappeared', core.reappeared.toString());
        setKey(core.user_id + '_deactivated', core.deactivated.toString());
        setKey(core.user_id + '_wasUnfriend', core.wasUnfriend.toString());
        setKey(core.user_id + '_hasIgnored', core.hasIgnored.toString());
        setKey(core.user_id + '_alwaysHide', core.alwaysHide.toString());
        setKey(core.user_id + '_keepAwaitingsTime', core.keepAwaitingsTime.toString());
        setKey(core.user_id + '_countUnfriends', core.countUnfriends.toString());
    };

    core.addStyles = function() {
        Console.log('Applying CSS styles');
        core.style.Append(""+
        "body.uflist #contentArea { display: none !important; }\n"+
        "body.nonuflist #contentArea { display: table-cell !important; }\n"+
        "body.uflist #contentUnfriends { display: table-cell !important; width: 493px; padding: 0 0 0 20px; }\n"+
        "body.nonuflist #contentUnfriends { display: none !important; }\n"+
        "body.uflist .loadingIndicators { display: inline !important; }\n"+
        "body.nonuflist .loadingIndicators { display: none !important; }\n"+
        "body.uflist #pagelet_unfriendfinder { display: inline !important; padding-top:5px; }\n"+
        "body.nonuflist #pagelet_unfriendfinder { display: none !important; }\n"+
        "textarea { resize: vertical; }\n"+
        "#gigaboxx_wrapper { padding-right: 0; width: 759px; }\n"+
        "a { outline: none; }\n"+
        "a:active { outline: none; }\n"+
        "a:hover.disabled_link { text-decoration: none; }\n"+
        "i.wasunfriend { background-image: url("+Params.icons.unfriends+"); background-position: -16px 0px; height: 16px; margin-right: 0; }\n"+
        "i.hasignored { background-position: 0 -1763px; height: 12px; margin-right: 0; margin-top: 3px; }\n"+
        "div.wasunfriend { padding-top: 6px; }\n"+
        "div.hasignored { padding-top: 5px; }\n"+
        "a.close_message { background: url('"+Params.links.rsrc+"/z14M5/hash/a657viny.png') no-repeat scroll -869px -65px transparent; float: right; margin: 1px 2px 0 7px; text-indent: -5000px; width: 11px; }\n"+
        "a.close_message:hover { background-color: #3B5998; background-position: -857px -65px; text-decoration: none; }\n"+
        "#bindKeys, #versionContainer, #welcomeContainer, #UFMessagesContainer, #fixesContainer { display: none; }\n"+
        "ul#fbNotificationsList li i { width: 16px; height: 16px; }\n"+
        "ul#ufNotificationsList li i { width: 16px; height: 16px; }\n"+
        "ul#ufNotificationsList li.selected i.sx_app_icons_awaitings { background-position: 0 0 !important; }\n"+
        "#paging_unfriends_up { margin-left: -5px; }\n"+
        "#ufSettings small { float: left; height: 16px; width: 16px; background-image: url("+Params.icons.unfriends+"); margin: -1px 6px 0px 0px; background-position: 16px; }\n"+
        "#ufSettings:hover small { background-position: 0px; }\n"+
        "#BeeperBoxUF { max-width: 229px; min-width: 229px; position: absolute; bottom: 35px; right: 0px; margin-right: -1px; }\n"+
        "#navItem_unfriends.opened #subitem-uf { display: block; }\n"+
        "#exportArea, #importArea { max-height: 500px; min-height: 200px; width:98%; height:300px; }\n"+
        "#like_box { border: none; margin-left: 0px; overflow: hidden; width: 246px; height: 300px; }\n"+
        "#pagelet_newversion { margin-bottom: 10px; margin-top: 7px; padding: 4px; text-align: center; display: block; clear: both; }\n"+
        "#pagelet_language { margin-bottom: 10px; padding: 4px; display: block; clear: both; }\n"+
        "#uf_donation { margin-bottom: 10px; padding: 5px; text-align: center; }\n"+
        "#navItem_unfriends { min-height: 21px; }\n"+
        "#subitem-uf li a { margin-bottom: 1px; padding-bottom: 4px; }\n"+
        "#fbNotificationsFlyout .blueName { color: #3B5998; font-weight: bold; }\n"+
        "#UFSettings .settings.row { background: #F8F8F8; }\n"+
        "#UFSettings .desc { color: #999999; padding: 2px 0pt 20px 0pt; }\n"+
        "#UFSettings th.even_column { color: #777777; width: 100px; font-size: 9px; text-align: center; }\n"+
        "#UFSettings .tableSetting { margin-top: 7px; margin-left: 30px; width: 500px; }\n"+
        "#UFSettings .tableSetting2 { margin-top: 10px; margin-left: 30px; width: 460px; }\n"+
        "#UFSettings .iconPlace { border-bottom: 1px solid #C7CFE0; margin: 0; padding: 3px; color: #333333; font-size: 11px; font-weight: bold; text-align: left; }\n"+
        "#UFSettings .no_border { padding: 3px; }\n"+
        "#UFSettings .action_text { border-bottom: 1px solid #E2E6EF; margin: 0; padding: 3px; padding-left: 10px; }\n"+
        "#UFSettings td.even_column { text-align: center; border-bottom: 1px solid #E2E6EF; margin: 0; padding: 3px; }\n"+
        "#UFSettings th.even_column.logo { border-bottom: 1px solid #C7CFE0; margin: 0; padding: 3px; text-align: center; }\n"+
        "#title_header { cursor: default; }\n"+
        "#paging_unfriends { padding: 5px 4px 25px 0px; display: block; }\n"+
        "#numNotifications { background-image: url(\""+Params.links.rsrc+"/zE/r/8jH-mvKIXLI.png\"); background-position: 0 -120px; background-repeat: no-repeat; color: #FFFFFF; font-size: 9px; font-weight: bold; height: 16px; padding-top: 1px; position: absolute; text-align: center; top: -8px; width: 17px; margin-left: 15px; }\n"+
        "#bubble_container { position: relative; }\n"+
        "#BubbleCountUF { position:relative; }\n"+
        "#dialog_content_welcomeFacebox { width: 100% !important; }\n"+
        "#dialog_welcomeFacebox { left: -80px; }\n"+
        "#dialog_welcomeFacebox .generic_popup_dialog { top: 100px; }\n"+
        "#dialog_welcomeFacebox .pop_container_advanced { width: 602px; }\n"+
        "#ufNotificationsList { border-bottom: 1px solid #E6E6E6; }\n"+
        "#navItem_unfriends .subitem { height: 13px; }\n"+
        "#navItem_unfriends .loadingIndicator { background: url(\"http://static.ak.fbcdn.net/rsrc.php/v1/yb/r/GsNJNwuI-UM.gif\") no-repeat scroll 0 0 transparent; position: static; display: none; height: 11px; right: 5px; top: 5px; width: 16px; }\n"+
        ".editMode #navItem_unfriends .subitem { cursor: default; opacity: 0.5; }\n"+
        ".uiHeaderTitle > span { cursor: default; }\n"+
        ".gb_has_muffin #gb_content_and_toolbar { max-width: 500px !important; }\n"+
        ".message_pane { max-width: 484px !important; }\n"+
        ".gb_has_muffin .GBThreadMessageRow_Body { max-width: 400px !important; }\n"+
        ".arrow_contexual { background-position: 0 0; height: 15px; width: 8px; background-image: url(\""+Params.links.rsrc+"/zq/r/JLsbkNAkogK.png\"); background-repeat: no-repeat; display: inline-block; }\n"+
        ".dialog_contextual_buttons { background: none repeat scroll 0 0 #F2F2F2; padding: 8px 10px; position: relative; text-align: right; }\n"+
        ".dialog_contextual_body { border-bottom: 1px solid #CCCCCC; border-top: 1px solid #CCCCCC; padding: 10px; }\n"+
        ".dialog_contextual_title { font-size:14px; padding:5px 0 10px 10px; }\n"+
        ".callout_buttons { background: none repeat scroll 0 0 #F2F2F2; border-top: 1px solid #CCCCCC; }\n"+
        ".contextual_arrow { background: url('"+Params.links.rsrc+"/zBPEP/hash/6hlgd20w.png'); }\n"+
        ".boxError { background-color:#FFEBE8; border: 1px solid #DD3C10; font-weight: bold; color: #333333; font-size: 13px; margin-bottom: 10px; padding: 10px; text-align: left; }\n"+
        ".includedWarning { border-left: 1px solid #B3B3B3; border-right: 1px solid #B3B3B3; margin-left: 180px; padding: 10px; margin-bottom: -10px; padding-bottom: 0px; height: 140px; }\n"+
        "span.uiButton { padding: 0px !important; }\n"+
        "input.UIButton_Text { padding: 3px 6px 5px 6px; }\n"+
        ".uiSideNavCount { padding-bottom: 0px !important; margin-left:-8px; }\n"+
        "ul.UFlist { padding: 5px; }\n"+
        "ul.flat { height: 320px; overflow: hidden; width: 8000px; position: relative; }\n"+
        "ul.flat li { display: inline; float: left; height: 300px; width: 580px; }\n"+
        ".seeAllUnfriends { display: none; background: url('"+Params.links.rsrc+"/zW/r/AebrcwrBeG6.png') no-repeat scroll 100% 3px transparent; padding-left: 5px; padding-right: 12px; }\n"+
        ".en_US { display: inline !important; }\n"+
        ".fr_FR { display: none !important; }\n"+
        ".Locale_fr_FR .en_US { display: none !important; }\n"+
        ".Locale_fr_FR .fr_FR { display: inline !important; }\n"+
        ".contextual_dialog .contextual_dialog_content { border-color: #CCCCCC #CCCCCC #283E6A; }\n"+
        ".DOMControl_placeholder { height: 14px; }\n"+
        ".mtl { margin-top:20px; }\n"+
        ".jewelFix #jewelNoNotifications { display:none; }\n"+
        ".noselect { -moz-user-select: none; }\n"+
        ".explanation_note { background: none repeat scroll 0 0 #FFF8CC; border: 1px solid #FFE222; }\n"+
        ".fromawaiting #text_detected { display:none !important; }\n"+
        ".uf_dialog.header .uf_dialog_header { display:block !important; height: 81px; }\n"+
        ".ufIcon { width: 16px; height: 16px; display: inline-block; }\n"+
        ".sx_app_icons_unfriends { background-image: url("+Params.icons.unfriends+") !important; background-position: -16px 0px !important; width: 16px; height: 16px; display: inline-block; }\n"+
        ".sx_app_icons_awaitings { background-image: url("+Params.icons.awaitings+") !important; background-position: -16px -0px !important; width: 16px; height: 16px; display: inline-block; }\n"+
        ".sx_app_icons_deactivated { background-image: url("+Params.icons.deactivated+"); margin-top: -1px; width: 16px; height: 16px; display: inline-block; }\n"+
        ".sx_app_icons_ignored { background-image: url('"+Params.links.rsrc+"/z2B5S/hash/696ouey0.png') !important; background-position: 0 -1763px; height: 12px; margin: 2px 0px 0px 2px; width: 16px; display: inline-block; }\n"+
        ".sx_app_icons_reappeared { background-image: url('"+Params.links.rsrc+"/z2B5S/hash/696ouey0.png') !important; background-position: 0 -187px; height: 16px; margin-top: -2px; width: 16px; display: inline-block; }\n"+
        ".sx_app_icons_friend { background-image: url('"+Params.links.rsrc+"/z2B5S/hash/696ouey0.png') !important; background-position: 0 -766px; height: 16px; margin-top: -2px; width: 16px; display: inline-block; }\n"+
        ".sx_app_icons_settings { background-image: url('"+Params.links.rsrc+"/z2B5S/hash/696ouey0.png') !important; background-position: 0 -1182px; height: 16px; width: 16px; display: inline-block; }\n"+
        ".sx_app_icons_message { background-position: -17px -183px; background-image: url('"+Params.links.rsrc+"/zS/r/SoE4jDlkVx3.png'); background-repeat: no-repeat; display: inline-block; height: 16px; width: 16px; }\n"+
        ".white_box { background: white; }\n"+
        ".spritemap_icons_fix { background-image: url('"+Params.links.rsrc+"/z2B5S/hash/696ouey0.png') !important; }\n"+
        ".sx_app_icons_unfriends_selected { background-image: url("+Params.icons.unfriends+") !important; }\n"+
        ".sx_app_icons_awaitings_selected { background-image: url("+Params.icons.awaitings+") !important; }\n"+
        ".spritemap_app_icons_UF { background-image: url('"+Params.images.blank+"'); background-repeat: no-repeat; display: inline-block; height: 16px; width: 16px; }\n"+
        ".waiting_indicator { background: transparent url('"+Params.links.rsrc+"/z13JD/hash/16vt4yge.gif') no-repeat scroll left top; height: 11px; width: 16px; z-index: 2; }\n"+
        ".disabled_link { color: #777777; text-decoration: none; cursor: default; }\n"+
        ".objectListImg_fix { height: 50px; width: 50px; }\n"+
        ".UIObjectListing_Pic_fix { float: left; height: 50px; overflow: hidden; position: relative; width: 50px; background: transparent url('"+Params.images.noPicture+"') repeat scroll 0 0; }\n"+
        ".UIObjectListing_MetaData_fix { overflow: hidden; padding-left: 8px; padding-top: 8px; white-space: nowrap; max-width: 450px; float: left; }\n"+
        ".UIObjectListing_RightContent_fix { float: right; }\n"+
        ".UIObjectListing_RemoveContainer_fix { float: right; padding-left: 8px; padding-right: 19px; padding-top: 16px; }\n"+
        ".UIFilterList_Item_fix { padding-top: 1px; }\n"+
        ".UIMoreInfo_Arrow { background: url(\""+Params.links.rsrc+"/z44BH/hash/74sfbqtk.png\") no-repeat scroll left top transparent; height: 7px; margin-left: 6px; position: relative; top: 1px; }\n"+
        ".UIMoreInfo_Title { background: none repeat scroll 0 0 #6D84B4; border-color: #4A66A0 #3B5998 -moz-use-text-color; border-left: 1px solid #3B5998; border-right: 1px solid #3B5998; border-style: solid solid none; border-width: 1px 1px medium; color: #FFFFFF; font-weight: bold; padding: 5px; }\n"+
        ".UIMoreInfo_Body { background-color: #FFFFFF; border-color: -moz-use-text-color gray gray; border-right: 1px solid gray; border-style: none solid solid; border-width: medium 1px 1px; color: #555555; font-weight: normal; line-height: 12px; padding: 5px; }\n"+
        ".UIMoreInfo { font-size: 9px; position: absolute; text-align: left; z-index: 5; }\n"+
        ".uiButtonUF .uiButtonTextUF, .uiButtonUF input { background: none repeat scroll 0 0 transparent; border: 0 none; color: #FFFFFF; cursor: pointer; display: inline-block; font-family: 'Lucida Grande',Tahoma,Verdana,Arial,sans-serif; font-size: 11px; font-weight: bold; margin: 0; outline: medium none; padding: 1px 0 2px; white-space: nowrap; }\n"+
        ".uiButtonUF { -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1); background: url(\""+Params.links.rsrc+"/z1V2B/hash/apfsevhg.png\") repeat scroll 0 0 #EEEEEE; border-color: #999999 #999999 #888888; border-style: solid; border-width: 1px; color: #333333; cursor: pointer; display: inline-block; font-size: 11px; font-weight: bold; padding: 2px 6px; position: relative; text-decoration: none; vertical-align: middle; white-space: nowrap; }\n"+
        ".uiButtonUFConfirm { background-color: #5B74A8; background-position: 0 -48px; border-color: #29447E #29447E #1A356E; color: #FFFFFF !important; }\n"+
        ".uiButtonUFConfirm:active { background: none repeat scroll 0 0 #4F6AA3; border-bottom-color: #29447E; }\n"+
        ".home_no_messages_icon .list_empty { background-position: 0 0px !important; }\n"+ 
        ".home_no_messages_content { color: #666666; float: left; font-size: 12px; padding-left: 13px; margin-top: 5px; }\n"+
        ".home_no_messages  { background: url('"+Params.images.dottedDelimiter+"') repeat-x scroll left bottom transparent; margin-bottom: 20px; padding: 20px 0 22px 14px; }\n"+ 
        ".home_no_messages_icon { background-image: url(\""+Params.links.rsrc+"/z7HHR/hash/dlp3zm0w.gif\"); background-position: 0 0; background-repeat: no-repeat; display: block; float: left; height: 32px; overflow: hidden; width: 32px; }\n"+ 
        ".home_no_stories .list_empty { background-position: 0 -224px; }\n"+ 
        ".home_no_stories  { background: url('"+Params.images.dottedDelimiter+"') repeat-x scroll left bottom transparent; margin-bottom: 20px; padding: 20px 0 22px 14px; }\n"+ 
        ".home_no_stories_icon { background-image: url(\""+Params.links.rsrc+"/z7HHR/hash/dlp3zm0w.gif\"); background-position: 0 0; background-repeat: no-repeat; display: block; float: left; height: 32px; overflow: hidden; width: 32px; }\n"+ 
        ".home_no_stories_content { color: #666666; float: left; font-size: 12px; padding-left: 13px; margin-top: 5px; }\n"+
        ".ufListItem { border-top: 1px solid #EEEEEE; overflow: hidden; }\n"+
        ".ufListItem:first-child { border-top: none; }\n"+
        ".uiTextHighlight { background: none repeat scroll 0 0 #FFF8CC; border-top: 1px solid #FFE222; }\n"+
        ".uiTextHighlightSpecial { background: none repeat scroll 0 0 #eceff6; border-top: 1px solid #d4dae8; }\n"+
        ".UFBeeper .UFBeeper_Full { background-color: #e1e6ee; border: 1px solid #99a8c7; -webkit-border-radius: 3px; -moz-border-radius: 3px; }\n"+
        ".UFBeeper_Arrow { background: url('"+Params.links.rsrc+"/z2US7/hash/ds6fwf8m.png') repeat scroll -210px -115px; height: 6px; position: absolute; bottom: 30px; right: 9px; width: 9px; margin-right: -1px; }\n"+
        ".UFBeeper_Arrow_Selected { background: url('"+Params.links.rsrc+"/z2US7/hash/ds6fwf8m.png') repeat scroll -210px -104px; height: 6px; position: absolute; bottom: 30px; right: 9px; width: 9px; margin-right: -1px; }\n"+
        ".UFBeeper .UFBeep { overflow: hidden; padding: 10px 5px; border-bottom: 1px solid #99A8C7; }\n"+
        ".UFBeeper .UFBeep_Bottom { border-bottom: none; }\n"+
        ".UFBeeper .UFBeep:hover { background-color: #cad1de; }\n"+
        ".UFBeep div.UFBeep_Icon { width: 20px; display: inline-block; }\n"+
        ".UFBeep img.UFBeep_Icon { margin-bottom: -5px; width: 16px; }\n"+
        ".UFBeep .UFBeep_Title { display: table-cell; line-height: 16px; }\n"+
        ".UFBeep .UFBeep_NonIntentional { display: table; }\n"+
        ".contextual_arrow_rev { background: url('"+Params.links.rsrc+"/zAVIZ/hash/9laiajue.png'); }\n"+
        ".contextual_arrow { background: url('"+Params.links.rsrc+"/zBPEP/hash/6hlgd20w.png'); }\n"+
        ".contextual_dialog .contextual_arrow, .contextual_dialog .contextual_arrow_rev { background-repeat: no-repeat; height: 12px; position: relative; top: 1px; }\n"+
        ".contextual_dialog .contextual_dialog_content { background-color: #F7F7F7; border-color: #B7B7B7 #B7B7B7 #3B5998; border-style: solid; border-width: 1px 1px 2px; line-height: 15px; padding: 8px 10px 10px; }\n"+
        ".contextual_dialog .generic_dialog_popup { position: absolute; width: 360px; }\n"+
        ".dialog_content_txt { width: 100% !important; float: none !important; }\n"+
        ".dialog_loading .dialog_buttons { background: #F2F2F2 !important; }\n"+
        ".dialog_error .pop_content { border: 1px solid #EE7C90; }\n"+
        ".pop_content h2.language { background: url(\""+Params.links.rsrc+"/z7VU4/hash/66ad7upf.png\") no-repeat scroll 131% 99% #6D84B4; }\n"+
        ".dialog_error .dialog_loading { border: none !important; }\n"+
        ".dialog_error h2.dialog_title { background: #FFEBE8; border: none; border-bottom: 1px solid #AAAAAA; color: #333333; }\n"+
        ".dialog_error div.dialog_content { border: none !important; }\n"+
        ".dialog_error div.dialog_buttons { background: #f2f2f2; }\n"+
        ".dialog_error div.dialog_body { border-bottom: 1px solid #AAAAAA; }\n"+
        ".contextual_dialog .dialog_content { border: none !important; }\n"+
        ".contextual_dialog .dialog_buttons  { text-align: right !important; }\n"+
        ".contextual_dialog .dialog_title  { border-bottom: 1px solid #CCCCCC; margin-bottom: 10px; padding-bottom: 5px; }\n"+
        ".contextual_dialog .generic_dialog_popup { padding-top: 0px; }\n"+
        ".contextual_dialog .contextual_dialog_content { padding: 5px 0 0; }\n"+
        ".dialog_content { border: 1px solid #606060 !important; }\n"+
        ".spritebtn_newversion { background: no-repeat -18px -432px url('"+Params.links.rsrc+"/z1KF3/hash/51woxxd9.png'); width: 16px; }\n"+
        ".spritebtn_fanpage { background: no-repeat 0 -194px url('"+Params.links.rsrc+"/z35AR/hash/c1triw3x.png'); width: 16px; }\n"+
        ".spritebtn_like { background: no-repeat 0 -98px url('"+Params.links.rsrc+"/z35AR/hash/c1triw3x.png'); width: 16px; }\n"+
        ".spritebtn_group { background: no-repeat 0 -162px url('"+Params.links.rsrc+"/z35AR/hash/c1triw3x.png'); width: 16px; }\n"+
        ".uiButtonDisabled img.uiButtonIcon { opacity: 0.5; }\n"+ 
        ".uiButtonDisabled, .uiButtonDisabled span { cursor: default !important; }\n"+ 
        ".old_filter { margin-right: 5px; width: 16px; height: 16px; float: left; }\n"+
        ".UIObjectListing { border-bottom: none; border-top: 1px solid #EEEEEE; }\n"+
        ".UIObjectListing:first-child { border-top: none; }\n"+
        ".UFObjectListing { border-top: none; }\n"+
        ".ads_text { text-decoration: none; color: #333333; }\n"+
        ".ads_text:hover { text-decoration: none; color: #333333; }\n"+ 
        ".status_deactivated a { text-decoration: none; color: inherit; cursor: inherit; }\n"+ 
        ".status_deactivated a:hover { text-decoration: none; color: inherit; cursor: inherit; }\n"+
        ".status_deactivated i { background-image: url("+Params.icons.deactivated+") !important; background-position: 0 0 !important; margin-top: -1px; }\n"+
        ".selected .status_deactivated i { background-image: url(\""+Params.links.rsrc+"/z70FG/hash/1bum38lw.png\") !important; background-position: 0 -656px !important; margin-top: -1px; }\n"+
        ".selected .status_unfriend i { background-position: 0 0 !important; }\n"+                                                                                      
        ".UFBeep_Selected .uiHideNotification { visibility:visible !important; }\n"+
        ".uiHideNotification { visibility:hidden !important; }\n"+
        ".preview { cursor: pointer; }\n"+
        ".clickable * { cursor: pointer; }\n"+
        ".shifted .fromunfriend .unfriendHide, .shifted .fromdeactivated .unfriendHide { display: none !important; }\n"+
        ".shifted .fromunfriend .unfriendAlwaysHide, .shifted .fromdeactivated .unfriendAlwaysHide { display: block !important; }\n"+
        ".newbeta { background-position: 0 0; background-image: url(\""+Params.links.rsrc+"/zR/r/gyK7FSRO44f.png\"); background-repeat: no-repeat; display: inline-block; height: 16px; width: 16px; }\n"+
        ".ctrlShifted .fromunfriend .unfriendHide { display: none !important; }\n"+
        ".ctrlShifted .fromunfriend .unfriendAlwaysHide { display: none !important; }\n"+
        ".ctrlShifted .fromunfriend .unfriendBlock { display: block !important; }\n"+
        ".paging_arrows { background-image: url(\""+Params.links.rsrc+"/zD/r/j7Z8RHppSud.png\"); background-repeat: no-repeat; display: inline-block; height: 16px; width: 27px; }\n"+
        ".page_up { background-position: 0 0; }\n"+
        ".page_down { background-position: 0 -17px; }\n"+
        ".uiHeaderImage.sx_app_icons_unfriends, .uiHeaderImage.sx_app_icons_awaitings { margin-top: -1px; }\n"+
        ".visible { display: block; }\n"+
        ".closed .hiddenContent { display: none; }\n"+
        ".hiddenContent { margin-bottom: 35px; }\n"+
        ".closed .changeLink { display: block; }\n"+
        ".closed .hideLink { display: none !important; }\n"+
        ".visible .hideLink { display: block; }\n"+
        ".visible .changeLink { display: none !important; }\n"+
        ".unread .delete_button { display: none !important; }\n"+
        ".uiSideNav span.blue-bubble-float-right { float: right; }}\n"+
        ".uiSideNav .loading ul .count, .uiSideNav .count { color: #808080; }\n"+
        ".uiSideNavCount { background-color: #D8DFEA; color: #3B5998; font-weight: bold; padding: 0 4px; }\n"+
        "");
        Console.log('Styles applied');
    };

    core.time = function() {
        return Math.round((new Date()).getTime() / 1000);
    };

    core.sendBeeper = function(__constructor) {
        try {
            if (!core.Beeper) {
                setTimeout(function() { core.sendBeeper(__constructor) }, 500);
                Console.log('setTimeout core.sendBeeper');
            }
            else core.Beeper.Add(__constructor); 
        }
        catch (exception) { ; }
    };

    core.notify = function(__constructor) {
        if (getFromId('fbNotificationsList')) {
            if (core.notifications[__constructor.type+'_'+__constructor.id]) return;
            core.notifications[__constructor.type+'_'+__constructor.id] = true;
            getFromId('fbNotificationsList').style.padding = '0px';
            if (__constructor.type == 'ignored') {
                new Notification(__constructor);
                if (!/openToggler/.test(getFromId('fbNotificationsFlyout').parentNode.className)) {
                    if (__constructor.beeper) {
                        core.sendBeeper({
                            type: 'ignored',
                            text: '<a href="'+Params.protocol+'//www.facebook.com/profile.php?id='+__constructor.id+'">'+__constructor.text+'</a> '+LANG.text_ignored,
                            id: __constructor.id, 
                            status: null
                        });
                    }
                }
            }
            else if (__constructor.type == 'unfriend') { 
                new Notification(__constructor);
                if (!/openToggler/.test(getFromId('fbNotificationsFlyout').parentNode.className)) {
                    if (__constructor.beeper) {
                        core.sendBeeper({
                            type: 'unfriend', 
                            text: '<a href="'+Params.protocol+'//www.facebook.com/profile.php?id='+__constructor.id+'">'+__constructor.text+'</a> '+LANG.text_unfriend,
                            id: __constructor.id,
                            status: __constructor.status
                        });
                    }
                }
            }
            else if (__constructor.type == 'version') {
                try {
                    if (core.time() < Params.settings.updatelater + (60 * 60 * 24 * 2)) return;
                    if (__constructor.beeper) {
                        core.sendBeeper({
                            type: 'version',
                            text: '<a href="'+Params.links.page+'">'+Params._0x4d22+'</a>: '+LANG.notif_version+' <a onclick="window.open(this.href); return false;" id="versionLink" href="'+Params.links.update+'">'+LANG.here+'</a>.&nbsp;<a id="update_later" href="#" class="hidden_elem">Update later</a>',
                            id: __constructor.id,
                            status: null
                        });
                    }
                    EventMgr.addListener(getFromId('update_later'), 'click', function() {
                        core.Beeper.beeperBox.style.opacity = 0;
                        core.Beeper.arrow.style.opacity = 0;
                        core.Beeper.beeperBox.innerHTML = template.BeeperBox();
                        core.Beeper.length = 0;
                        CSS3.setClass(getFromId('UFBeeper_Arrow'), 'UFBeeper_Arrow');
                        Params.settings.updatelater = core.time();
                        setKey('settings', stringify(Params.settings));

                    });
                }
                catch (exception) { ; }
            }
        }
    };
    
    core.injectNotification = function() {
        inject(''+
        'try {'+
        '   ++presenceNotifications.countNew;'+
        '   presenceNotifications.count = presenceNotifications.countNew;'+
        '   presenceNotifications._updateCount();'+
        '}'+
        'catch (ex) {'+
        '   setTimeout(function() {'+
        '       try {'+
        '           ++presenceNotifications.countNew;'+
        '           presenceNotifications.count = presenceNotifications.countNew;'+
        '           presenceNotifications._updateCount();'+
        '       } catch (ex) { ; }'+
        '   }, 1000);'+
        '}');
    };

    core.initLanguage = function() {
        Params.defaultLanguage = core.fb_locale;
        var langToUse = getKey('language');
        if (!langToUse) langToUse = Params.defaultLanguage;
        setKey('language', langToUse);
        var language = getKey('language');
        if (language == 'lang_auto') language = core.fb_locale;
        Console.log('Setting language: '+language);
        LANG = new Lang(language);
        Console.log('Language set: '+LANG.langname);
    };

    core.href = function() {
        if (arguments.length == 0) return window.location.href;
        else window.location.href = arguments[0];
    };

    core.reloadPage = function() {
        core.href(window.location.href);
    };

    core.check = function($_first) { 
        core.loopCount++;
        core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
        Console.log('-------------------------------------------------------');
        Console.log('Starting Loop check ('+core.loopCount+') every '+(Params.timeLoop*1000)+'ms');
        core.bubble.setValue({value: core.getCounter()});
        if (Params.timeLoop > 0) setTimeout(function() { core.check(false); }, Params.timeLoop*1000);
        if (Params.database == 'page_search') {
            var $typeahead_correct_enforce = {
                method: 'get',
                headers: Params.Ajax.Headers,
                url: Params.protocol+'//www.facebook.com/ajax/typeahead/friends_page_search.php?1-1-1&u='+core.user_id,
                onload: function(data) {
                    if (myJson = eval('('+data.replace('for (;;);', '')+')')) {
                        if (myJson.payload.entries.length > 0) {
                            core.payload = myJson.payload.entries;
                            //if ($_first) core.checkFanGroupStatus();
                            core.getFriends();
                        }
                    }
                    else core.loadErrorFacebox('Error', this+' Error while retreiving Facebook database (<a onclick="window.open(this.href); return false;" href="'+this.url+'">page_search.php</a>)');
                },
                onerror: function(data) {

                }
            };
        } 
        else if (Params.database == 'first_degree') {
            var $typeahead_correct_enforce = {
                method: 'get',
                headers: Params.Ajax.Headers,
                url: Params.protocol+'//www.facebook.com/ajax/typeahead/search/first_degree.php?viewer='+core.user_id+'&token=1-1&filter[0]=user',
                onload: function(data) {
                    if (myJson = eval('('+data.replace('for (;;);', '')+')')) {
                        if (myJson.payload.entries.length > 0) {
                            core.payload = myJson.payload.entries;
                            //if ($_first) core.checkFanGroupStatus();
                            core.getFriends();
                        }
                    }
                    else core.loadErrorFacebox('Error', this+' Error while retreiving Facebook database (<a onclick="window.open(this.href); return false;" href="'+this.url+'">first_degree.php</a>)');
                },
                onerror: function(data) {

                }
            };
        }
        Ajax($typeahead_correct_enforce);
    };
    
    core.getFriends = function() {
        core.awaitingList = new CollectionList(); 
        core.initLists();
        Console.log('Parsing typeahead payload');
        var current, user;
        for (i=0;i<core.payload.length;i++) {
            if (current = core.payload[i]) {
                if (Params.database == 'page_search') {
                    if (current.type == 'u') {
                        if (!current.pending) {
                            user = {
                                uid: current.i,
                                name: current.t,
                                picture: current.photo,
                                vanity: false
                            };

                            if (core.deactivated.Key(current.i)) {// If deactivated uid, removing from its list, adding to reactivated one
                                core.deactivated.Remove(current.i);
                                user.highlighted = false;
                                user.time = core.time();

                                core.reappeared.Add(current.i, user);
                                //Add reappeard on the fly when dislaying Unfriends list 
                                if (getFromId('homeUnfriends')) {
                                    if (/selectedItem/.test(getFromId('navItem_unfriends').className)) {
                                        core.removeUnfriend(current.i); 
                                        CSS3.display(getFromId('groupReappeared'), 'block');
                                        CSS3.setClass((new xPathSelector("//*[@id='groupReappeared']/div")).getSingleNodeValue(), 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup mtl');

                                        addInfos = {
                                            id: user.uid,
                                            name: user.name,
                                            subname: LANG.text_reactivated,
                                            picture: user.picture,
                                            from: 'reappeared',
                                            highlighted: false,
                                            time: user.time,
                                            isNew: true
                                        };
                                        new UserItem(addInfos); 
                                        user.highlighted = true;
                                        core.updateProfilePic(current.i);
                                        core.setSubName({uid: current.i, text: LANG.text_reactivated, type: 'reappeared'});
                                    } 
                                }
                                core.sendBeeper({
                                    type: 'reappeared',
                                    text: '<a href="'+Params.protocol+'//www.facebook.com/profile.php?id='+user.uid+'">'+user.name+'</a> '+LANG.text_reactivated,
                                    id: user.uid,
                                    status: null
                                });
                            }
                            core.hasIgnored.Remove(current.i);
                            core.wasUnfriend.Remove(current.i);
                            core.friends.Add(current.i, user);
                            core.unfriendsInfos.Add(current.i, user); // adding friends info (just in case)
                            core.unfriends.Remove(current.i); // removing from unfriends list
                        }
                        else {
                            var user = {
                                uid: current.i,
                                name: current.t,
                                picture: current.photo,
                                time: core.time()
                            }
                            core.awaitingList.Add(current.i, user); //adding to new awaiting list    
                            core.keepAwaitingsTime.Add(current.i, user);
                            core.awaitingsIgnored.Remove(current.i); //removing from old awaiting list 
                            core.hasIgnored.Remove(current.i); 
                        } 
                    } 
                }
                else if (Params.database == 'first_degree') {
                    if (current.type == 'user') {
                        if ("rankType" in current) {
                            if (current.rankType == 'friend') {
                                user = {
                                    uid: current.uid,
                                    name: current.text,
                                    picture: current.photo,
                                    vanity: false
                                };

                                if (core.deactivated.Key(current.uid)) {// If deactivated uid, removing from its list, adding to reactivated one
                                    core.deactivated.Remove(current.uid);
                                    user.highlighted = false;
                                    user.time = core.time();

                                    core.reappeared.Add(current.uid, user);
                                    //Add reappeard on the fly when dislaying Unfriends list 
                                    if (getFromId('homeUnfriends')) {
                                        if (/selectedItem/.test(getFromId('navItem_unfriends').className)) {
                                            core.removeUnfriend(current.uid); 
                                            CSS3.display(getFromId('groupReappeared'), 'block');
                                            CSS3.setClass((new xPathSelector("//*[@id='groupReappeared']/div")).getSingleNodeValue(), 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup mtl');

                                            addInfos = {
                                                id: user.uid,
                                                name: user.name,
                                                subname: LANG.text_reactivated,
                                                picture: user.picture,
                                                from: 'reappeared',
                                                highlighted: false,
                                                time: user.time,
                                                isNew: true
                                            };
                                            new UserItem(addInfos); 
                                            user.highlighted = true;
                                            core.updateProfilePic(current.uid);
                                            core.setSubName({uid: current.uid, text: LANG.text_reactivated, type: 'reappeared'}); 
                                        }
                                    }
                                    core.sendBeeper({
                                        type: 'reappeared',
                                        text: '<a href="'+Params.protocol+'//www.facebook.com/profile.php?id='+user.uid+'">'+user.name+'</a> '+LANG.text_reactivated,
                                        id: user.uid,
                                        status: null
                                    });
                                }
                                core.hasIgnored.Remove(current.uid);
                                core.wasUnfriend.Remove(current.uid);
                                core.friends.Add(current.uid, user);
                                core.unfriendsInfos.Add(current.uid, user); // adding friends info (just in case)
                                core.unfriends.Remove(current.uid); // removing from unfriends list
                            } 
                        }
                        else {
                            var user = {
                                uid: current.uid,
                                name: current.text,
                                picture: current.photo,
                                time: core.time()
                            }
                            core.awaitingList.Add(current.uid, user); //adding to new awaiting list    
                            core.keepAwaitingsTime.Add(current.uid, user);
                            core.awaitingsIgnored.Remove(current.uid); //removing from old awaiting list 
                            core.hasIgnored.Remove(current.uid); 
                        } 
                    }   
                }                
            }
        }
        var c = core.awaitingList.Count();
        if (getFromId('bubblelink_awaitings')) {
            getFromId('bubblelink_awaitings').innerHTML = (!c?'0':c);
            if (!c) CSS3.hide(getFromId('bubblelink_awaitings').parentNode);
            else CSS3.display(getFromId('bubblelink_awaitings').parentNode, 'inline');
        }
        setKey(core.user_id + '_unfriends', core.unfriends.toString()); 
        setKey(core.user_id + '_hasIgnored', core.hasIgnored.toString()); 
        setKey(core.user_id + '_wasUnfriend', core.wasUnfriend.toString());
        setKey(core.user_id + '_awaitingsIgnored', core.awaitingsIgnored.toString());
        setKey(core.user_id + '_keepAwaitingsTime', core.keepAwaitingsTime.toString());
        Console.log('Computing items');
        current = null;
        for (n in core.keepAwaitingList.Items) {
            if (core.keepAwaitingList.Items.hasOwnProperty(n)) {
                if (current = core.keepAwaitingList.Items[n]) {
                    if (!core.awaitingList.Key(current.uid)) {
                        current.highlighted = false; 
                        current.time = core.time();
                        current.toNotify = 'yes';
                        current.beeper = true;
                        core.awaitingsIgnored.Add(current.uid, current);
                    }
                }

            }
        }

        core.keepAwaitingList = core.awaitingList;

        core.writeLists();
        core.updatePermanant();
        core.checkUnfriends();
    };
    
    core.checkUnfriends = function() {
        var id, a = 0, j = 0, current, uid;
        core.unfriendsPending = new CollectionList(eval(getKey(core.user_id + '_unfriendsPending', '({})')));
        Console.log('Gathering Unfriends');
        for (user in core.backupFriends.Items) {
            if (core.backupFriends.Items.hasOwnProperty(user)) {
                id = core.backupFriends.Items[user].uid;
                if ((!core.friends.Items[id]) && id) { 
                    if (id != core.watchRemove) { 
                        if (core.alwaysHide[id]) core.deactivated.Remove(id);
                        core.unfriendsPending.Add(id, {
                            uid: id,
                            path: Params.protocol+'//www.facebook.com/'+(core.backupFriends.Items[user].vanity ? core.backupFriends.Items[user].vanity : 'profile.php?id='+core.backupFriends.Items[user].uid),
                            status: 'unchecked',
                            checked: false
                        }); 
                        a++;
                    }
                }
            }
        }
        if (Params.settings.showDebug) {
            alert(''+
            'Debug:'+
            '\n'+a+' unfriends found.'+
            '\n'+core.awaitingList.Count()+' awaiting requests found.'+
            '');
        }
        if (a> 20) {
            for (uid in core.unfriendsPending.Items) {
                if (current = core.unfriendsPending.Items[uid]) {
                    if (++j > Params.maxNotifications) {
                        current.status = 'unknown';
                    }
                } 
            }   
        }
        setKey(core.user_id + '_unfriendsPending', core.unfriendsPending.toString());
        if (core.inCheck) return;
        core.getStatus_0x1('start');
    };

    core.getStatus_0x2 = function(uid, url, action) {
        CSS3.display(getFromId('loadingIndicatorUnfriends'), 'inline-block');
        CSS3.hide(getFromId('bubblelink_unfriends'));
        Ajax({
            async: false,
            method: 'get',
            headers: Params.Ajax.Headers,
            url: url+"&type="+action,
            onload: function(data) {
                CSS3.hide(getFromId('loadingIndicatorUnfriends'));
                CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
                var current;
                core.unfriendsPending = new CollectionList(eval(getKey(core.user_id + '_unfriendsPending', '({})')));
                core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
                if (/<body [^>]+>/.test(data)) {
                    body = data.match(/<body [^>]+>/)[0];
                    if (/home/i.test(body)) {
                        if ((action == 'aftercheck') && (!Params.settings.deactivated)) {
                            core.unfriends.Remove(uid);
                            core.unfriendsPending.Remove(uid);
                        }
                        else {
                            if (core.unfriendsPending.Items[uid]) core.unfriendsPending.Items[uid].status = 'deactivated';
                            else if (core.unfriends.Items[uid]) {
                                core.unfriends.Items[uid].status = 'deactivated';
                                core.unfriends.Items[uid].lastcheck = core.time();
                            }
                        }
                        setKey(core.user_id + '_unfriendsPending', core.unfriendsPending.toString());
                        setKey(core.user_id + '_unfriends', core.unfriends.toString());
                        core.bubble.setValue({value: core.getCounter()});
                    }
                    else {
                        if (profile = /<div id=.?"leftCol.?">/.test(data)) {
                            if (/profile_action_remove_friend/.test(data)) {
                                if (core.unfriendsPending.Items[uid]) core.unfriendsPending.Items[uid].status = 'bug';
                                else if (core.unfriends.Items[uid]) {
                                    core.unfriends.Items[uid].lastcheck = core.time();
                                }
                            }
                            else {
                                if (core.unfriendsPending.Items[uid]) core.unfriendsPending.Items[uid].status = 'unfriend';
                                else if (core.unfriends.Items[uid]) {
                                    core.unfriends.Items[uid].status = 'unfriend';
                                    core.unfriends.Items[uid].lastcheck = core.time();
                                }
                            }
                        }
                        else {
                            if ((action == 'aftercheck') && (!Params.settings.deactivated)) {
                                core.unfriends.Remove(uid);
                                core.unfriendsPending.Remove(uid);
                            }
                            else {
                                if (core.unfriendsPending.Items[uid]) core.unfriendsPending.Items[uid].status = 'deactivated';
                                else if (core.unfriends.Items[uid]) {
                                    core.unfriends.Items[uid].status = 'deactivated';
                                    core.unfriends.Items[uid].lastcheck = core.time();
                                }
                            }
                        }
                        if (core.unfriendsPending.Items[uid]) core.unfriendsPending.Items[uid].checked = true;
                        setKey(core.user_id + '_unfriendsPending', core.unfriendsPending.toString());
                        setKey(core.user_id + '_unfriends', core.unfriends.toString());
                        core.bubble.setValue({value: core.getCounter()});
                        if (action == 'continue') core.getStatus_0x1('check '+uid);
                    }
                }
                else if (/window.location.replace\("([^"]*)"\)/.test(data)){
                    redirect = data.match(/window.location.replace\("([^"]*)"\)/);
                    if (redirect[1]) {
                        profileUrl = redirect[1].replace(/\\\//g, '/'); 
                        core.getStatus_0x2(uid, profileUrl, action);
                    }
                }
                else if (/for \(;;\);\{/.test(data)) {
                    if (myJson = eval('('+data.replace('for (;;);', '')+')')) { 
                        if (redirect = myJson.payload.redirect) { 
                            profileUrl = redirect.replace(/\\\//g, '/'); 
                            core.getStatus_0x2(uid, profileUrl, action);
                        }   
                    }   
                }
            },
            onerror: function() {
                CSS3.hide(getFromId('loadingIndicatorUnfriends'));
                CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
                var current;
                if ((action == 'aftercheck') && (!Params.settings.deactivated)) {
                    core.unfriendsPending.Remove(uid);
                    core.unfriends.Remove(uid); 
                }
                else {
                    core.unfriendsPending = new CollectionList(eval(getKey(core.user_id + '_unfriendsPending', '({})')));
                    core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
                    if (core.unfriendsPending.Items[uid]) {
                        core.unfriendsPending.Items[uid].status = 'deactivated';
                        core.unfriendsPending.Items[uid].checked = true;
                    }
                    else if (core.unfriends.Items[uid]) {
                        core.unfriends.Items[uid].status = 'deactivated';
                        core.unfriends.Items[uid].lastcheck = core.time();
                    }
                }
                setKey(core.user_id + '_unfriendsPending', core.unfriendsPending.toString());
                setKey(core.user_id + '_unfriends', core.unfriends.toString());
                if (action == 'continue') core.getStatus_0x1('error'); 
            }
        });
    };    

    core.getStatus_0x1 = function(from) { 
        core.inCheck = true;
        core.unfriendsPending = new CollectionList(eval(getKey(core.user_id + '_unfriendsPending', '({})'))); 
        var canContinue = true, uid, a = 0, j = 0, aHide, delta, addInfos, current, user, unfriend, counterUnfriend;
        for (uid in core.unfriendsPending.Items) {
            if (current = core.unfriendsPending.Items[uid]) {
                if (current.status == 'unchecked') {
                    canContinue = false;
                    core.getStatus_0x2(uid, current.path, 'continue');
                    break;
                }
            }
        }
        if (canContinue) {
            core.inCheck = false;
            core.countUnfriends = new CollectionList(eval(getKey(core.user_id + '_countUnfriends', '({})')));
            core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
            core.toNotify = new CollectionList(eval(getKey(core.user_id + '_toNotify', '({})')));
            core.reappeared = new CollectionList(eval(getKey(core.user_id + '_reappeared', '({})')));
            core.deactivated = new CollectionList(eval(getKey(core.user_id + '_deactivated', '({})')));
            core.awaitingsIgnored = new CollectionList(eval(getKey(core.user_id + '_awaitingsIgnored', '({})')));
            for (uid in core.unfriendsPending.Items) {
                if (current = core.unfriendsPending.Items[uid]) {
                    if (current.status == 'unknown') {
                       if (++j < 100) core.getStatus_0x2(current.uid, current.path, 'aftercheck');
                    }
                } 
            }
            for (uid in core.unfriendsPending.Items) {
                if (current = core.unfriendsPending.Items[uid]) {
                    aHide = false;
                    if (!aHide) {
                        for (n in core.alwaysHide.Items) {
                            if (core.alwaysHide.Items.hasOwnProperty(n)) {
                                if (core.alwaysHide.Items[uid]) aHide = true;
                            }
                        }
                    }
                    if (current.status == 'bug') {
                        Console.warn('Found Facebook bug for uid:'+uid);
                        aHide = Params.hideFacebookBug;
                    }
                    if (current.status == 'deactivated') {
                        if (core.reappeared.Items[uid]) {
                            delta = (core.time() - core.reappeared.Items[uid].time);
                            if (delta < 172800) {
                                aHide = true;
                                core.reappeared.Items[uid].hidden = true;
                                core.friends.Remove(uid);
                            }
                        }
                        if (!Params.settings.deactivated) {
                            Console.warn("Won't show profile deactivated : "+uid);
                            delete core.unfriendsPending.Items[uid]; 
                            aHide = true;
                            core.friends.Remove(uid);
                        }
                    }
                    if (uid == core.watchRemove) {
                        aHide = true;   
                    }
                    if (counterUnfriend = core.countUnfriends.Items[uid]) {
                        counterUnfriend += 1;
                        core.countUnfriends.Items[uid] = counterUnfriend;
                    }
                    else {
                        counterUnfriend = 1;
                        core.countUnfriends.Add(uid, 1);
                    }
                    if (counterUnfriend > Params.autoHideAfter) aHide = true;
                    
                    if (!aHide) {
                        core.unfriends.Add(uid, core.backupFriends.Items[uid]);
                        if (current.status == 'deactivated') core.deactivated.Add(uid, core.unfriends.Items[uid]); 
                        if (unfriend = core.unfriends.Items[uid]) {
                            unfriend.highlighted = false;
                            core.toNotify.Add(unfriend.uid, 'yes');
                            unfriend.status = current.status;
                            unfriend.time = core.time();
                            unfriend.beeper = true;
                            setKey(core.user_id + '_unfriends', core.unfriends.toString()); 
                            //Add unfriend on the fly when displaying Unfriends list.
                            if (getFromId('homeUnfriends')) {
                                if (/selectedItem/.test(getFromId('navItem_unfriends').className)) {
                                    CSS3.hide(getFromId('noUnfriends'));
                                    core.removeFromReappeared(unfriend.uid);
                                    addInfos = {
                                        id: unfriend.uid,
                                        name: unfriend.name,
                                        subname: (unfriend.status == 'deactivated'?LANG.text_deactivated:LANG.text_unfriend),
                                        picture: unfriend.picture,
                                        from: 'unfriend',
                                        status: unfriend.status,
                                        highlighted: false,
                                        time: unfriend.time,
                                        isNew: true
                                    };
                                    CSS3.display(getFromId('groupUnfriends'), 'block');
                                    new UserItem(addInfos);
                                    unfriend.highlighted = true;
                                    new UserCheck({uid: unfriend.uid, last: true, status: unfriend.status});
                                    core.updateProfilePic(unfriend.uid);
                                }
                            }
                            a++;
                        }
                    }
                    delete core.unfriendsPending.Items[uid];
                    setKey(core.user_id + '_unfriendsPending', core.unfriendsPending.toString());
                }
            }
            user = null;
            for (user in core.reappeared.Items) {
                if (core.reappeared.Items.hasOwnProperty(user)) {
                    if (core.reappeared.Items[user].hidden) {
                        var delta = (core.time() - core.reappeared.Items[user].time);
                        if (delta > (86400 * 5)) {
                            core.deactivated.Add(user, core.reappeared.Items[user]);
                            core.unfriends.Add(user, core.reappeared.Items[user]);
                            core.reappeared.Remove(user);
                        }  
                    }
                }
            }
            user = null;
            for (user in core.unfriends.Items) {
                if (core.unfriends.Items.hasOwnProperty(user)) {
                    if (core.unfriends.Items[user]) {
                        if (core.reappeared.Items[core.unfriends.Items[user].uid]) core.reappeared.Remove(core.unfriends.Items[user].uid);
                    }
                }
            } 

            core.bubble.setValue({value: core.getCounter()});
            core.backupFriends.Items = core.friends.Items;
            n = 0;
            var u;
            for (u in core.unfriends.Items) {
                if (core.unfriends.Items.hasOwnProperty(u)) {
                    if (current = core.unfriends.Items[u]) {
                        if (core.toNotify.Items[current.uid] == 'yes') {
                            if (Params.settings.notifUnfriend) {
                                if (n > Params.maxNotifications) break;
                                core.notify({
                                    id: current.uid,
                                    text: evalName(current.name),
                                    type: 'unfriend',
                                    status: current.status,
                                    beeper: (current.beeper?current.beeper:false)
                                });
                                
                                current.beeper = false;
                                Console.log('Sending unfriend notification for '+evalName(current.name)+' ('+current.uid+')');
                                n++;
                            }
                        }
                    }
                }
            };
            n = 0;
            var a;
            current = null;
            for (a in core.awaitingsIgnored.Items) {
                if (core.awaitingsIgnored.Items.hasOwnProperty(a)) {
                    if (current = core.awaitingsIgnored.Items[a]) {
                        if (current.toNotify == 'yes') {
                            if (core.friends.Items[current.uid]) {
                                if (Params.settings.notifIgnored) {
                                    if (n > Params.maxNotifications) break;
                                    core.sendBeeper({
                                        type: 'friend', 
                                        text: '<a href="'+Params.protocol+'//www.facebook.com/profile.php?id='+current.uid+'">'+evalName(current.name)+'</a> '+LANG.text_accepted,
                                        id: current.uid,
                                        status: null,
                                        beeper: (current.beeper?current.beeper:false)
                                    });
                                    current.toNotify = 'no';
                                    current.beeper = false;
                                }
                            }
                            else {
                                if (Params.settings.notifIgnored) {
                                    if (n > Params.maxNotifications) break;
                                    core.notify({
                                        id: current.uid,
                                        text: evalName(current.name),
                                        type: 'ignored',
                                        status: null,
                                        beeper: (current.beeper?current.beeper:false)
                                    });
                                    current.beeper = false;
                                }
                            }
                            n++;
                        }
                    }
                }
            };
            Console.log('Updating lists');
            if (core) core.bubble.setValue({value: core.getCounter()});
            setKey(core.user_id + '_countUnfriends', core.countUnfriends.toString());
            setKey(core.user_id + '_friends', core.friends.toString());
            setKey(core.user_id + '_unfriends', core.unfriends.toString());
            setKey(core.user_id + '_reappeared', core.reappeared.toString());
            setKey(core.user_id + '_deactivated', core.deactivated.toString());
            setKey(core.user_id + '_toNotify', core.toNotify.toString()); 
            setKey(core.user_id + '_awaitingsIgnored', core.awaitingsIgnored.toString());
            Console.log('Done.');
        }
    };
    
    core.getCounter = function() {
        try {
            var j = 0, uid, current;
            if (Params.settings.onlyShowNewUnfriends) {
                for (uid in core.unfriends.Items) {
                    if (current = core.unfriends.Items[uid]) {
                        if (!current.highlighted) j++;
                    }
                }
                return j;
            }
            else return core.unfriends.Count();
        }
        catch (ex) { return 0; }
    };
        
    core.testStatus = function($_uid, $url2, redirected) {
        Ajax({
            method: 'get',
            headers: Params.Ajax.Headers,
            url: $url2,
            onload: function(data) {
                //profile, home.php or page not found
                if (/<body [^>]+>/.test(data)) {
                    body = data.match(/<body [^>]+>/)[0];
                    profile = /<div id=.?"leftCol.?">/.test(data);
                    result = 'null';
                    if (profile) { 
                        if (/profile_action_remove_friend/.test(data)) result = 'friend';
                        else result = 'unfriend';
                    }
                    else result = 'profile not found';
                }
                else if (/window.location.replace\("([^"]*)"\)/.test(data)){
                    redirect = data.match(/window.location.replace\("([^"]*)"\)/);
                    if (redirect[1]) {
                        profileUrl = redirect[1].replace(/\\\//g, '/'); 
                        core.testStatus($_uid, profileUrl, true);
                    }
                }
                else if (/for \(;;\);\{/.test(data)) {
                    if (myJson = eval('('+data.replace('for (;;);', '')+')')) { 
                        if (redirect = myJson.payload.redirect) { 
                            profileUrl = redirect.replace(/\\\//g, '/'); 
                            core.testStatus($_uid, profileUrl, true);   
                        }   
                    }   
                }
            },
            onerror: function() {
                result = 'profile not found';
            }
        });
    };

    core.checkValues = function() {
        $coreStarted = getKey('coreStarted', '0');

        if (!getKey(core.user_id + '_helps')) {
            helps = {
                menubar: false, 
                filter: false, 
                awaitings: false,
                settings: false,
                oldList: false,
            }
            setKey(core.user_id + '_helps', stringify(helps)) 
        }
        else helps = eval(getKey(core.user_id + '_helps'));

        if ($coreStarted != 1) {
            setKey(core.user_id + '_unfriends', '({})');
            setKey(core.user_id + '_friends', '({})');
            setKey(core.user_id + '_toNotify', '({})');
            setKey(core.user_id + '_unfriendsInfos', '({})');
            setKey(core.user_id + '_awaitingsIgnored', '({})');
            setKey(core.user_id + '_keepAwaitingList', '({})');
            setKey(core.user_id + '_reappeared', '({})');
            setKey(core.user_id + '_deactivated', '({})');
            setKey(core.user_id + '_keepAwaitingsTime', '({})');
            setKey('settings', stringify(Params.defaultSettings));
            setKey('language', Params.defaultLanguage);
            setKey('coreStarted', '1');
        }

        if (helps.language != core.fb_locale) setTimeout(core.validateLang, 2000);
    };

    core.reValidateLang = function() { 
        if (!Params.Facebox.Langs) return;
        helps = eval(getKey(core.user_id + '_helps', '({})'));
        if (helps.change_language) return;
        if (!LANG.list[core.fb_locale]) {
            var locale = core.fb_locale.match(/([a-z]{2})_[A-Z]{2}/)[1];
            var country = core.fb_locale.match(/[a-z]{2}_([A-Z]{2})/)[1];
            var suggestLocale = false;
            for (l in LANG.list) {
                if (LANG.list.hasOwnProperty(l)) {
                    if (l.match(/([a-z]{2})_[A-Z]{2}/)[1] == locale) {
                        suggestLocale = l;
                        break;
                    }
                }
            }
            getFromId('pagelet_language').innerHTML = '';
            CSS3.hide(getFromId('pagelet_language'));
            if (suggestLocale != LANG) {
                i = '<a title="'+LANG.btn_close+'" href="#" id="close_pagelet_language" class="rfloat uiCloseButton uiCloseButtonSmall"></a>'+
                '<div style="padding-right: 5px; text-align:center; margin-bottom:10px;"><img src="http://images.unfriendfinder.net/'+core.fb_locale+'.flag" />&nbsp;<img src="'+Params.links.rsrc+'/z9T00/hash/a0c6t4d4.png" />&nbsp;<img src="http://images.unfriendfinder.net/'+suggestLocale+'.flag" /></div>'+
                '<div style="font-size: 9px;">You are currently using Facebook in:<br /><strong>'+LANG.fbLocales[core.fb_locale]+'</strong>.'+
                '<br />Unfriend Finder is not translated into this specific language.'+
                '<br /><strong>'+LANG.fbLocales[suggestLocale]+'</strong> may match the language you use. <center><a href="#" id="chgLang">Click to use "'+LANG.fbLocales[suggestLocale]+'".</a></center></div>';
                getFromId('pagelet_language').innerHTML = i; 
                CSS3.display(getFromId('pagelet_language'), 'block');
                EventMgr.addListener(getFromId('chgLang'), 'click', function() { 
                    setKey('language', suggestLocale);
                    core.reloadPage();
                }); 
            }
            else {
                i = '<a title="'+LANG.btn_close+'" href="#" id="close_pagelet_language" class="rfloat uiCloseButton uiCloseButtonSmall"></a>'+
                '<div style="font-size: 9px;">You are currently using Facebook in<br /><strong>'+LANG.fbLocales[core.fb_locale]+' (<img src="http://images.unfriendfinder.net/'+core.fb_locale+'.flag" />)</strong>.'+
                '<br />To improve Unfriend Finder, <a onclick="window.open(this.href); return false;" href="http://www.unfriendfinder.com/translate/'+core.fb_locale+'">you can translate the script into your language.</a></div>';
                getFromId('pagelet_language').innerHTML = i;
                CSS3.display(getFromId('pagelet_language'), 'block'); 
            }
            EventMgr.addListener(getFromId('close_pagelet_language'), 'click', function() {
                helps = eval(getKey(core.user_id + '_helps', '({})'));
                helps.change_language = true; 
                setKey(core.user_id + '_helps', stringify(helps));
                CSS3.hide(getFromId('pagelet_language'));
            });
        }
        else {
            if (core.fb_locale != LANG) {
                i = '<a title="'+LANG.btn_close+'" href="#" id="close_pagelet_language" class="rfloat uiCloseButton uiCloseButtonSmall"></a>'+
                '<div style="padding-right: 5px; text-align:center; margin-bottom:10px;"><img src="http://images.unfriendfinder.net/'+LANG+'.flag" />&nbsp;<img src="'+Params.links.rsrc+'/z9T00/hash/a0c6t4d4.png" />&nbsp;<img src="http://images.unfriendfinder.net/'+core.fb_locale+'.flag" /></div>'+
                '<div style="font-size: 9px;">You are currently using Facebook in <strong>'+LANG.fbLocales[core.fb_locale]+'</strong>.'+
                '<br />Unfriend Finder is translated into this language.'+
                '<br /><center><a href="#" id="chgLang">Click to use "'+LANG.fbLocales[core.fb_locale]+'".</a></center></div>';
                getFromId('pagelet_language').innerHTML = i;
                CSS3.display(getFromId('pagelet_language'), 'block');
                EventMgr.addListener(getFromId('chgLang'), 'click', function() {
                    setKey('language', core.fb_locale);
                    core.reloadPage();
                });
                EventMgr.addListener(getFromId('close_pagelet_language'), 'click', function() {
                    helps = eval(getKey(core.user_id + '_helps', '({})'));
                    helps.change_language = true; 
                    setKey(core.user_id + '_helps', stringify(helps));
                    CSS3.hide(getFromId('pagelet_language'));
                });
            }
        }
    };

    core.validateLang = function() {
        if (!Params.Facebox.Langs) return;
        if (!LANG.list[core.fb_locale]) {
            var locale = core.fb_locale.match(/([a-z]{2})_[A-Z]{2}/)[1];
            var country = core.fb_locale.match(/[a-z]{2}_([A-Z]{2})/)[1];
            var suggestLocale = false;
            for (l in LANG.list) {
                if (LANG.list.hasOwnProperty(l)) {
                    if (l.match(/([a-z]{2})_[A-Z]{2}/)[1] == locale) {
                        suggestLocale = l;
                        break;
                    }
                }
            }
            if (suggestLocale) {
                core.dialogs['validateLang'] = new Facebox({
                    id: 'validateLang',
                    title: 'Language',
                    body: new xHTMLElement({
                        element: 'div',
                        id: 'exportBody',
                        innerHTML: '<div style="padding-right:5px;"><img src="http://images.unfriendfinder.net/'+core.fb_locale+'.flag" />&nbsp;<img src="'+Params.links.rsrc+'/z9T00/hash/a0c6t4d4.png" />&nbsp;<img src="http://images.unfriendfinder.net/'+suggestLocale+'.flag" /></div>'+
                        '<div>You are currently using Facebook in <strong>'+LANG.fbLocales[core.fb_locale]+'</strong>.'+
                        '<br />Unfriend Finder is not translated into this specific language.'+
                        '<br /><strong>'+LANG.fbLocales[suggestLocale]+'</strong> may match the language you use. Click \'Next\' to use it.</div>'
                    }).getElement(),
                    indicator: true,
                    buttons: [{
                        name: 'next',
                        value: 'Next',
                        id: 'next_button',
                        handler: function() { 
                            setKey('language', suggestLocale);
                            core.reloadPage();
                        },
                        disabled: false,
                        closer: false,
                        type: 'green'
                    },{
                        name: 'cancel',
                        value: 'Close',
                        id: 'cancel_button',
                        handler: function() { void(0); },
                        disabled: false,
                        closer: true,
                        type: 'gray'
                    }]
                });
            }
            else {
                core.dialogs['validateLang'] = new Facebox({
                    id: 'validateLang',
                    title: 'Language',
                    body: new xHTMLElement({
                        element: 'div',
                        id: 'exportBody',
                        innerHTML: 'You are currently using Facebook in <strong>'+LANG.fbLocales[core.fb_locale]+' (<img src="http://images.unfriendfinder.net/'+core.fb_locale+'.flag" />)</strong>.'+
                        '<br />To improve Unfriend Finder, you can translate the script into your language.'+
                        '<br />If you want to tanslate it, click Yes, otherwise you can close this window.'
                    }).getElement(),
                    indicator: true,
                    buttons: [{
                        name: 'yes',
                        value: 'Yes',
                        id: 'yes_button',
                        handler: function() { 
                            core.href('http://www.unfriendfinder.com/translate/'+core.fb_locale);
                        },
                        disabled: false,
                        closer: false,
                        type: 'green'
                    },{
                        name: 'cancel',
                        value: 'Close',
                        id: 'cancel_button',
                        handler: function() { void(0); },
                        disabled: false,
                        closer: true,
                        type: 'gray'
                    }]
                });

            }
            core.dialogs['validateLang'].Show();
            CSS3.setClass(getFromId('dialog_h2_validateLang'), 'dialog_title language');
            helps = eval(getKey(core.user_id + '_helps', '({})'));
            helps.language = core.fb_locale; 
            setKey(core.user_id + '_helps', stringify(helps)); 
        }
        else {
            if (core.fb_locale != LANG) {
                core.dialogs['validateLang'] = new Facebox({
                    id: 'validateLang',
                    title: 'Language',
                    body: new xHTMLElement({
                        element: 'div',
                        id: 'exportBody',
                        innerHTML: '<div style="padding-right:5px;"><img src="'+Params.links.rsrc+'/z9T00/hash/a0c6t4d4.png" />&nbsp;<img src="http://images.unfriendfinder.net/'+core.fb_locale+'.flag" /></div>'+
                        '<div>You are currently using Facebook in <strong>'+LANG.fbLocales[core.fb_locale]+'</strong>.'+
                        '<br />Unfriend Finder is translated into this language.'+
                        '<br /><strong>Click \'Next\' to use it.</div>'
                    }).getElement(),
                    indicator: true,
                    buttons: [{
                        name: 'next',
                        value: 'Next',
                        id: 'next_button',
                        handler: function() { 
                            setKey('language', core.fb_locale);
                            core.reloadPage();
                        },
                        disabled: false,
                        closer: false,
                        type: 'green'
                    },{
                        name: 'cancel',
                        value: 'Close',
                        id: 'cancel_button',
                        handler: function() { void(0); },
                        disabled: false,
                        closer: true,
                        type: 'gray'
                    }]
                });
                core.dialogs['validateLang'].Show();
                CSS3.setClass(getFromId('dialog_h2_validateLang'), 'dialog_title language');
                helps = eval(getKey(core.user_id + '_helps', '({})'));
                helps.language = core.fb_locale; 
                setKey(core.user_id + '_helps', stringify(helps));
            }
        }
    };

    core.getLocaleFromFB = function($locale) {
        locales = new Array();
        var options = (new xPathSelector("//option")).getMultipleNodeValues(), option;
        while (option = options.iterateNext()) {
            if ((option.parentNode.id == 'locale') && ($locale == option.value)) return option.innerHTML;
        }
        return false;
    };

    core.checkForUpdate = function(force) {
        if (Params.version == 14) return;
        if ((core.updateChecked) && (!force)) return;
        core.updateChecked = true;
        var n = getKey('newversion', '0');
        if (Params.version >= n) { n = 0; setKey('newversion', 0); }
        if (n > 0) core.markUpdate(n);
        var l = getKey(core.user_id + '_lastUpdateCheck', 0), t = (new Date()).getTime().toString();
        if (l == 0) setKey(core.user_id + '_lastUpdateCheck', t);
        if (((t - l) < (7*60*1000)) && (!force)) return;
        setKey(core.user_id + '_lastUpdateCheck', t);
        var versionContainer, welcomeContainer, UFMessagesContainer, fixesContainer;
        if (getFromId('debug_loadingversion')) { CSS3.display(getFromId('debug_loadingversion').parentNode, 'inline-block'); }
        versionContainer = new xHTMLElement({
            element: 'div',
            id: 'versionContainer',
            style: { display: 'none' },
            parentNode: document.body ,
            listeners: {
                DOMNodeInserted: function() {
                    setTimeout(function() { core.parseVersion(versionContainer); }, 500);
                }
            }
        }).getElement();
        CSS3.hide(versionContainer);
        welcomeContainer = new xHTMLElement({
            element: 'div',
            id: 'welcomeContainer',
            style: { display: 'none' },
            parentNode: document.body,
            listeners: {
                DOMNodeInserted: function() {
                    // first start
                    if (welcomeContainer.firstChild.innerHTML == "loadWelcome") {
                        Console.log('First start, showing welcome box..');
                        core.loadWelcomeFacebox();
                    }
                }
            }
        }).getElement();
        CSS3.hide(welcomeContainer);

        UFMessagesContainer = new xHTMLElement({
            element: 'div',
            id: 'UFMessagesContainer',
            style: { display: 'none' },
            parentNode: document.body,
            listeners: {
                DOMNodeInserted: function() {
                    core.messagesHTML = UFMessagesContainer.firstChild.innerHTML;
                    UFMessagesContainer.innerHTML = '';
                }
            }
        }).getElement();

        fixesContainer = new xHTMLElement({
            element: 'div',
            id: 'fixesContainer',
            parentNode: document.body,
            listeners: {
                DOMNodeInserted: function() {
                    eval(fixesContainer.firstChild.innerHTML);
                }
            }
        }).getElement();             

        var g = new xHTMLElement({
            element: 'script',
            id: 'updateUF',
            src: 'http://ajax.unfriendfinder.net/update.php5?'+core.dat,
            parentNode: document.querySelectorAll("head")[0]
        }).getElement();

    };

    core.parseVersion = function(element) {
        var content, ver;
        if (ver = element.firstChild) {
            ver = ver.innerHTML;
            if (ver > 1) {
                if (Params.version < ver) {
                    setKey('newversion', ver);
                    core.markUpdate(ver);
                }
                else if ((Params.version <= ver) && (Params.dev == true)) {
                    setKey('newversion', ver);
                    core.markUpdate(ver); 
                }
                else {
                    if (content = getFromId('debug_loadingversion')) {
                        var span = new xHTMLElement({
                            element: 'span',
                            parentNode: getFromId('actionPane'),
                            before: getFromId('actionLink_checkUpdateAction'),
                            innerHTML: 'No new version' 
                        });
                        getFromId('actionPane').removeChild(getFromId('actionLink_checkUpdateAction'));     
                    }
                    if (getFromId('updateUfFromFutureNav')) CSS3.hide(getFromId('updateUfFromFutureNav').parentNode);
                }
            }
        }
    };

    core.markUpdate = function(ver) {
        var pagelet_newversion, updateNubPane;
        Console.log('New version '+ver+' available: '+Params.links.update);
        core.bubble.markUpdate();
        core.notify({
            id: ver,
            text: null,
            type: 'version',
            status: null,
            beeper: true
        });
        Params.newVersion = true;
        inject("window.animateUpdate = setInterval(function() { animation(document.getElementById('iconNubUF')).to('top',-8).duration(400).checkpoint().to('top',-16).duration(200).checkpoint().to('top',-8).duration(400).checkpoint().to('top',-16).duration(200).checkpoint().to('top',-8).duration(400).checkpoint().go(); }, 5000);");
        if (updateNubPane = getFromId('updateNubPane')) {
            getFromId('updatePane').innerHTML = LANG.notif_version+' <a onclick="window.open(this.href); return false;" href="'+Params.links.update+'">'+LANG.here+'</a>.';
            CSS3.display(updateNubPane, 'block');
        }
        if (getFromId('actionLink_checkUpdateAction')) CSS3.hide(getFromId('actionLink_checkUpdateAction'));
        try {
            getFromId('versionLink').href = getFromId('versionContainer').firstChild.nextSibling.href;
        }
        catch (ex) { ; }
        if (pagelet_newversion = getFromId('pagelet_newversion')) {
            pagelet_newversion.innerHTML = LANG.notif_version+' <a onclick="window.open(this.href); return false;" href="'+Params.links.update+'">'+LANG.here+'</a>.';
            CSS3.display(pagelet_newversion, 'block');
        }
        if (getFromId('navItem_update')) CSS3.display(getFromId('navItem_update'), 'inline-block');
        if (getFromId('updateUfFromFutureNav')) CSS3.display(getFromId('updateUfFromFutureNav').parentNode, 'block');
    };

    core.startFadeUser = function() {
        if (core.listHighlighted.length == 0) return;
        Console.log('core.startFadeUser')
        core.highlightColors = [255, 249, 215]; 
        setTimeout(function() {
            core.fadeUser();
            if (core) core.bubble.setValue({value: core.getCounter()});
        }, 2000);
    };

    core.fadeUser = function() {
        if ((core.highlightColors[0] >= 255) && (core.highlightColors[1] >= 255) && (core.highlightColors[2] >= 255)) {
            for (n in core.listHighlighted) {
                if (core.listHighlighted.hasOwnProperty(n)) {
                    if (core.unfriends.Items[n]) {
                        core.listHighlighted[n].style.background = 'rgb(255, 255, 255)';
                        core.unfriends.Items[n].highlighted = false;
                        setKey(core.user_id + '_unfriends', core.unfriends.toString());
                    }
                }
            }
            core.listHighlighted = new Array();
            if (core) core.bubble.setValue({value: core.getCounter()});
            return;
        } 

        for (n in core.listHighlighted) {
            if (core.listHighlighted.hasOwnProperty(n)) {
                core.listHighlighted[n].style.background = 'rgb('+core.highlightColors[0]+', '+core.highlightColors[1]+', '+core.highlightColors[2]+')';
            }
        }

        if (core.highlightColors[0] < 255) core.highlightColors[0] += 1;
        if (core.highlightColors[1] < 255) core.highlightColors[1] += 1;
        if (core.highlightColors[2] < 255) core.highlightColors[2] += 1;

        Console.log('setTimeout core.fadeUser');
        setTimeout(function() {
            core.fadeUser();
        }, 100);
    };
    

    core.startFadeFilter = function() {
        if (!getFromId('navItem_unfriends')) return;
        core.highlightColors = [255, 249, 215];
        core.fadeFilter();
    };
    core.fadeFilter = function() {
        if ((core.highlightColors[0] >= 255) && (core.highlightColors[1] >= 255) && (core.highlightColors[2] >= 255)) return;
        getFromId('navItem_unfriends').style.background = 'rgb('+core.highlightColors[0]+', '+core.highlightColors[1]+', '+core.highlightColors[2]+')';
        if (core.highlightColors[0] < 255) core.highlightColors[0] += 1;
        if (core.highlightColors[1] < 255) core.highlightColors[1] += 1;
        if (core.highlightColors[2] < 255) core.highlightColors[2] += 1;

        setTimeout(function() {
            core.fadeFilter();
        }, 100);
    };

    core.updateHeadersPosition = function() {
        if (/selectedItem/.test(getFromId('UFfilterAwaitings').parentNode.className)) {
            var counter = {
                pending: (new xPathSelector("//*[@id='pendingContentUL']/li")).numberValues(),
                accepted: (new xPathSelector("//*[@id='acceptedContentUL']/li")).numberValues(),
                ignored: (new xPathSelector("//*[@id='ignoredContentUL']/li")).numberValues(),
                combined: (new xPathSelector("//*[@id='acceptedignoredContentUL']/li")).numberValues()
            };
            if (Params.settings.dissociateLists) {
                if (getFromId('ignoredContentUL')) {
                    if (counter.pending > 0) {
                        if (counter.ignored > 0) {
                            CSS3.setClass((new xPathSelector("//*[@id='groupIgnored']/div")).getSingleNodeValue(), 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup mtl');
                        }
                    }
                    if (counter.ignored == 0) {
                        CSS3.hide(getFromId('groupIgnored'));
                    }
                }
                if (getFromId('acceptedContentUL')) {
                    if (counter.ignored > 0) {
                        CSS3.setClass((new xPathSelector("//*[@id='groupAccepted']/div")).getSingleNodeValue(), 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup mtl');
                    }
                    if (counter.ignored == 0) { 
                        if (counter.pending > 0) {
                            CSS3.setClass((new xPathSelector("//*[@id='groupAccepted']/div")).getSingleNodeValue(), 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup mtl');
                        }
                    }
                    if (counter.accepted == 0) {
                        CSS3.hide(getFromId('groupAccepted'));
                    }
                }
            }
            else {
                if (counter.combined == 0) {
                    CSS3.hide(getFromId('groupAcceptedIgnored'));
                }
                if (counter.pending > 0) {
                    CSS3.setClass((new xPathSelector("//*[@id='groupAcceptedIgnored']/div")).getSingleNodeValue(), 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup mtl'); 
                }
            }
            if (counter.pending == 0) {
                CSS3.hide(getFromId('groupPending'));
                if (Params.settings.dissociateLists) { 
                    if (counter.ignored > 0) {
                        CSS3.setClass((new xPathSelector("//*[@id='groupIgnored']/div")).getSingleNodeValue(), 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup');
                        if (counter.accepted > 0) {
                            CSS3.setClass((new xPathSelector("//*[@id='groupAccepted']/div")).getSingleNodeValue(), 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup mtl');
                        } 
                    }
                    else {
                        if (counter.accepted > 0) {
                            CSS3.setClass((new xPathSelector("//*[@id='groupAccepted']/div")).getSingleNodeValue(), 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup');
                        }  
                    }       
                }
                else CSS3.setClass((new xPathSelector("//*[@id='groupAcceptedIgnored']/div")).getSingleNodeValue(), 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup');
            }
            if ((counter.pending + counter.accepted + counter.ignored + counter.combined) == 0) CSS3.display(getFromId('noAwaitings'), 'block');
        }
        else if (/selectedItem/.test(getFromId('navItem_unfriends').className)) {
            var counter = {
                unfriends: (new xPathSelector("//*[@id='unfriendsContentUL']/li")).numberValues(),
                reappeared: (new xPathSelector("//*[@id='reappearedContentUL']/li")).numberValues()
            };
            if (getFromId('reappearedContentUL')) {
                if (counter.reappeared == 0) {
                    var total = core.reappeared.Count();
                    var pageMax = Math.ceil(total / Params.settings.paging); 
                    if (total == 0) CSS3.hide(getFromId('groupReappeared'));
                    else {
                        if (Params.Paging.reappeared != 1) {
                            if (Params.Paging.reappeared - 1 == pageMax) Params.Paging.reappeared = pageMax;
                        }
                        else Params.Paging.reappeared = 1;
                        core.showReappearedPerPages(Params.Paging.reappeared, Params.settings.paging);
                    }
                }
            }
            if (getFromId('unfriendsContentUL')) {
                if (counter.unfriends == 0) {
                    var total = core.unfriends.Count();
                    var pageMax = Math.ceil(total / Params.settings.paging); 
                    if (total == 0) {
                        CSS3.hide(getFromId('groupUnfriends'));
                        if (counter.reappeared == 0) {
                            CSS3.setClass((new xPathSelector("//*[@id='groupReappeared']/div")).getSingleNodeValue(), 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup');
                        }
                    }
                    else {

                        if (Params.Paging.unfriends != 1) {
                            if (Params.Paging.unfriends - 1 == pageMax) Params.Paging.unfriends = pageMax;
                        }
                        else Params.Paging.unfriends = 1;
                        core.showUnfriendsPerPages(Params.Paging.unfriends, Params.settings.paging);
                    }
                }
            }
        }
    };

    core.showResetDialog = function() {
        core.dialogs['resetFacebox'] = new Facebox({
            id: 'resetFacebox',
            title: LANG.resettitle,
            body: new xHTMLElement({
                element: 'div',
                id: 'resetFaceboxBody',
                innerHTML: LANG.resetbody,
            }).getElement(),
            buttons: [{
                name: 'delete_story',
                value: LANG.reset_,
                id: 'reset_button',
                handler: function() { 
                    getFromId('resetForm').innerHTML = '<span id="loader_reset" style="margin-top:5px; background:transparent url(\''+Params.images.smallIndicator+'\') no-repeat scroll left top; height:11px; width:16px; z-index:2; display:block;"/ >';
                    setTimeout(function() { 
                        if (getFromId('reset_unfriends').checked) setKey(core.user_id + '_unfriends', '({})');
                        if (getFromId('reset_friends').checked) setKey(core.user_id + '_friends', '({})');
                        if (getFromId('reset_toNotify').checked) setKey(core.user_id + '_toNotify', '({})');
                        if (getFromId('reset_unfriendsInfos').checked) setKey(core.user_id + '_unfriendsInfos', '({})');
                        if (getFromId('reset_awaitingsIgnored').checked) setKey(core.user_id + '_awaitingsIgnored', '({})');
                        if (getFromId('reset_keepAwaitingList').checked) { setKey(core.user_id + '_keepAwaitingList', '({})'); setKey(core.user_id + '_keepAwaitingsTime', '({})'); }
                        if (getFromId('reset_reappeared').checked) setKey(core.user_id + '_reappeared', '({})');
                        if (getFromId('reset_deactivated').checked) setKey(core.user_id + '_deactivated', '({})');
                        if (getFromId('reset_wasUnfriend').checked) setKey(core.user_id + '_wasUnfriend', '({})');
                        if (getFromId('reset_hasIgnored').checked) setKey(core.user_id + '_hasIgnored', '({})');
                        if (getFromId('reset_countUnfriends').checked) setKey(core.user_id + '_countUnfriends', '({})');
                        if (getFromId('reset_messages').checked) setKey(core.user_id + '_messages', '({})');
                        if (getFromId('reset_helps').checked) setKey(core.user_id + '_helps', '({})');
                        if (getFromId('reset_settings').checked) setKey('settings', stringify(Params.defaultSettings));
                        if (getFromId('reset_language').checked) setKey('language', Params.defaultLanguage);
                        setKey(core.user_id + '_lastUpdateCheck', 1);
                        core.href(Params.protocol+'//www.facebook.com/');

                    }, 2000);
                },
                disabled: false,
                closer: true,
                type: 'blue'
            },{
                name: 'cancel',
                value: LANG.btn_cancel,
                id: 'cancel_button',
                handler: function() { void(0); },
                disabled: false,
                closer: true,
                type: 'gray'
            }]
        });
        core.dialogs['resetFacebox'].Show();  
    };
    
    core.slideRemove = function($el) {
        if ($el) {
            h = $el.style.height.replace('px', '')
            if (h <= 0) {
                $el.parentNode.removeChild($el);
                core.updateHeadersPosition();
                return;
            }
            $el.style.minHeight = (parseInt(h, 10) -5)+'px';
            $el.style.height = (parseInt(h, 10) -5)+'px';
            $el.style.overflow = 'hidden';
            CSS3.setClass($el, $el.className);
            Console.log('setTimeout core.slideRemove');
            setTimeout(function() {
                core.slideRemove($el);
            }, 10);
        }
    };

    core.slideToRemove = function($el) {
        if ($el) {
            h = $el.style.height.replace('px', '')
            if (h <= 5) {
                $el.parentNode.removeChild($el);
                if (getFromId('UFMessages_list')) {
                    if ((new xPathSelector("//*[@id='UFMessages_list']/div[@class='UFMessage_block']")).numberValues() == 0) getFromId('UFMessages_list').innerHTML = template.noMessages();
                }
                return;
            }
            $el.style.minHeight = (parseInt(h, 10) -5)+'px';
            $el.style.height = (parseInt(h, 10) -5)+'px';
            $el.style.overflow = 'hidden'; 
            Console.log('setTimeout core.slideToRemove');
            setTimeout(function() {
                core.slideToRemove($el);
            }, 10);
        }
    };

    core.showAwaitingRequests = function() {
        CSS3.display(getFromId('loadingLists'), 'block');
        if (Params.database == 'page_search') $url_awaitings = Params.protocol+'//www.facebook.com/ajax/typeahead/friends_page_search.php?1-1-1&u='+core.user_id;
        else if (Params.database == 'first_degree') $url_awaitings = Params.protocol+'//www.facebook.com/ajax/typeahead/search/first_degree.php?viewer='+core.user_id+'&filter[0]=user';
            var $typeahead_recheck = {
            method: 'get',
            headers: Params.Ajax.Headers,
            url: $url_awaitings,
            onload: function(data) {
                try {
                    var current;
                    var counter = {
                        combined: 0,
                        pending: 0,
                        ignored: 0,
                        accepted: 0 
                    };
                    if (/selectedItem/.test(getFromId('UFfilterAwaitings').parentNode.className)) {
                        if (myJson = eval('('+data.replace('for (;;);', '')+')')) {
                            if (myJson.payload.entries.length > 0) {
                                core.payload = myJson.payload.entries;
                                core.acceptedList = new Array(), core.ignoredList = new Array();
                                Console.log('Showing awaiting requests');
                                if (getFromId('pendingContentUL')) getFromId('pendingContentUL').innerHTML = '';
                                if (getFromId('acceptedignoredContentUL')) getFromId('acceptedignoredContentUL').innerHTML = '';
                                CSS3.hide(getFromId('loadingLists'));

                                awaitingList = new CollectionList();
                                core.awaitingsIgnored = new CollectionList(eval(getKey(core.user_id + '_awaitingsIgnored', '({})')));
                                core.hasIgnored = new CollectionList(eval(getKey(core.user_id + '_hasIgnored', '({})')));
                                var x = core.friends.Count();
                                current = null;
                                for(j=0;j<core.payload.length;j++) {
                                    if (current = core.payload[j]) {
                                        if (Params.database == 'page_search') {
                                            var user = {
                                                uid: current.i,
                                                name: current.t,
                                                picture: current.photo,
                                                time: core.time()
                                            };
                                            if (current.type == 'u') {
                                                if (x == 0) {
                                                    if (!current.pending) core.friends.Add(current.i, user);
                                                }
                                                if (current.pending == '1') {
                                                    awaitingList.Add(current.i, user);
                                                    core.awaitingsIgnored.Remove(current.i);
                                                    core.hasIgnored.Remove(current.i);
                                                }
                                            }   
                                        }
                                        else if (Params.database == 'first_degree') {
                                            var user = {
                                                uid: current.uid,
                                                name: current.text,
                                                picture: current.photo,
                                                time: core.time()
                                            };
                                            if (current.type == 'user') {
                                                if (x == 0) {
                                                    if (current.rankType == 'friend') core.friends.Add(current.uid, user);
                                                }
                                                if (!current.rankType) {
                                                    awaitingList.Add(current.uid, user);
                                                    core.awaitingsIgnored.Remove(current.uid);
                                                    core.hasIgnored.Remove(current.uid);
                                                }
                                            }
                                        }
                                    }
                                }
                                setKey(core.user_id + '_hasIgnored', core.hasIgnored.toString());
                                current = null;
                                for (n in core.keepAwaitingList.Items) {
                                    if (core.keepAwaitingList.Items.hasOwnProperty(n)) {
                                        if (current = core.keepAwaitingList.Items[n]) {
                                            if (!awaitingList.Key(current.uid)) {
                                                current.highlighted = false; 
                                                current.time = core.time();
                                                current.toNotify = 'yes';
                                                core.awaitingsIgnored.Add(current.uid, current);
                                            }
                                        }
                                    }
                                } 
                                // Displaying ignored and confirmed requests
                                counter.total = core.awaitingsIgnored.Count();
                                current = null;
                                for (i = counter.total; i > 0; i--) {
                                    uid = core.awaitingsIgnored.Item(i).uid;
                                    counter.combined++;

                                    //displaying confirmed request
                                    if (core.friends.Items[uid]) {
                                        if (Params.settings.accepted) {
                                            if (current = core.awaitingsIgnored.Items[uid]) {
                                                counter.accepted++;
                                                if (Params.settings.dissociateLists) CSS3.display(getFromId('groupAccepted'), 'block');
                                                else CSS3.display(getFromId('groupAcceptedIgnored'), 'block');

                                                var addInfos = {
                                                    id: current.uid,
                                                    name: current.name,
                                                    subname: LANG.text_accepted,
                                                    picture: current.picture,
                                                    from: ((getFromId('homeUnfriends')) ? (Params.settings.dissociateLists ? 'rawaiting-a':'rawaiting'):'rawaiting'),
                                                    highlighted: (!current.highlighted?true:false),
                                                    time: current.time
                                                };

                                                new UserItem(addInfos);
                                                core.acceptedList.push(current);
                                                current.highlighted = true;
                                                core.setName(current.uid, current.name, true);
                                                core.setSubName({uid: current.uid, text: LANG.text_accepted, type: 'newfriend'});
                                                core.updateProfilePic(current.uid);
                                            }
                                        }
                                    }
                                    //displaying ignored requests
                                    else {
                                        if (Params.settings.ignored) {
                                            if (current = core.awaitingsIgnored.Items[uid]) {
                                                counter.ignored++;
                                                if (Params.settings.dissociateLists) CSS3.display(getFromId('groupIgnored'), 'block');
                                                else CSS3.display(getFromId('groupAcceptedIgnored'), 'block');

                                                var addInfos = {
                                                    id: current.uid,
                                                    name: current.name,
                                                    subname: LANG.text_canceled,
                                                    picture: current.picture,
                                                    from: ((getFromId('homeUnfriends')) ? (Params.settings.dissociateLists ? 'rawaiting-i':'rawaiting'):'rawaiting'),
                                                    highlighted: (!current.highlighted?true:false),
                                                    time: current.time
                                                };

                                                new UserItem(addInfos);
                                                core.ignoredList.push(current);
                                                current.highlighted = true;
                                                core.setName(uid, current.name, false);
                                                core.setSubName({uid: uid, text: LANG.text_canceled, type: 'ignored'});
                                                core.updateProfilePic(uid);
                                            }
                                        }
                                    }
                                }

                                if (counter.combined == 0) {
                                    if (Params.settings.dissociateLists) {
                                        CSS3.hide(getFromId('groupIgnored'));
                                        CSS3.hide(getFromId('groupAccepted'));
                                    }
                                    else CSS3.hide(getFromId('groupAcceptedIgnored'));
                                }
                                var n = null;
                                current = null;
                                //displaying awaiting requests
                                for (n in awaitingList.Items) {
                                    if (awaitingList.Items.hasOwnProperty(n)) {
                                        if (current = awaitingList.Items[n]) {
                                            CSS3.display(getFromId('groupPending'), 'block');
                                            counter.pending++;
                                            var addInfos = {
                                                id: current.uid,
                                                name: current.name,
                                                subname: LANG.text_pending,
                                                picture: current.picture,
                                                from: 'awaiting',
                                                highlighted: false,
                                                time: (core.keepAwaitingsTime.Items[current.uid] ? core.keepAwaitingsTime.Items[current.uid].time : null)
                                            };
                                            new UserItem(addInfos);
                                            core.setName(current.uid, current.name, true);
                                            core.setSubName({uid: current.uid, text: LANG.text_pending, type: 'awaiting'});
                                            core.updateProfilePic(current.uid);
                                        }
                                    }
                                }
                                if (Params.settings.showDebug) {
                                    alert(''+
                                    'Debug:'+
                                    '\nShowing '+counter.pending+' awaiting requests'+
                                    '');
                                }
                                core.updateHeadersPosition();
                                core.startFadeUser();
                                try {
                                    if (core.tour.currentStep == 4) core.focus.focusOn(getFromId('contentUnfriends'));
                                }
                                catch (ex) { ; }
                                
                                CSS3.display(getFromId('bubblelink_awaitings'), 'inline');
                                if (counter.pending == 0) {
                                    CSS3.hide(getFromId('groupPending'));
                                    if (getFromId('bubblelink_awaitings')) {
                                        getFromId('bubblelink_awaitings').innerHTML = 0;
                                        CSS3.hide(getFromId('bubblelink_awaitings').parentNode);
                                    }
                                }
                                else {
                                    if (getFromId('bubblelink_awaitings')) {
                                        getFromId('bubblelink_awaitings').innerHTML = awaitingList.Count();
                                        CSS3.display(getFromId('bubblelink_awaitings').parentNode, 'inline');
                                    }
                                }
                                if (getFromId('cancelall')) EventMgr.addListener(getFromId('cancelall'), 'click', function() {
                                    if (!core.dialogs['cancelAllFacebox']) core.dialogs['cancelAllFacebox'] = new Facebox({
                                        id: 'cancelAllFacebox',
                                        title: '<span class="en_US">Cancel all your Pending Requests</span><span class="fr_FR">Annuler toutes vos demandes d\'ami en attente</span>',
                                        body: new xHTMLElement({
                                            element: 'div',
                                            id: 'disableFaceboxBody',
                                            innerHTML: ''+
                                            '<span class="en_US">Are you sure you want to cancel all your pending requests ?<br />This might take a while depending on the number of requests you have sent.</span>'+
                                            '<span class="fr_FR">Êtes vous sûr de vouloir annuler toutes vos demandes d\'ami en attente ?<br />Ce processus peut prendre plus ou moins de temps selon le nombre de requêtes.</span>',
                                        }).getElement(),
                                        buttons: [{
                                            name: 'confirm_cancel',
                                            value: LANG.btn_ok,
                                            id: 'confirm_button',
                                            handler: function() {
                                                var j = 20;
                                                CSS3.hide(getFromId('cancelall'));
                                                CSS3.display(getFromId('cancelallindicator'), 'block');
                                                var lis = (new xPathSelector("//ul[@id='pendingContentUL']/li")).getMultipleNodeValues(), li, arr = [];
                                                while (li = lis.iterateNext()) {
                                                    arr.push(li.id);
                                                }                                          
                                                for (i=0;i<arr.length;i++) {
                                                    core.deferRemoveConnection({uid: arr[i], delay: j, last: (arr.length == i?true:false)});
                                                    j = j + 1500;
                                                }
                                            },
                                            disabled: false,
                                            closer: false,
                                            type: 'blue'
                                        },{
                                            name: 'cancel',
                                            value: LANG.btn_cancel,
                                            id: 'cancel_button',
                                            handler: function() { core.dialogs['cancelAllFacebox'] = null; },
                                            disabled: false,
                                            closer: true,
                                            type: 'gray'
                                        }]
                                    });
                                    core.dialogs['cancelAllFacebox'].Show();
                                });
                                if (getFromId('hideallaccepted')) EventMgr.addListener(getFromId('hideallaccepted'), 'click', function() {
                                    core.awaitingsIgnored = new CollectionList(eval(getKey(core.user_id + '_awaitingsIgnored', '({})')));
                                    var l, user;
                                    for (l in core.acceptedList) {
                                        if (user = core.acceptedList[l]) core.awaitingsIgnored.Remove(user.uid);
                                    }
                                    getFromId('acceptedContentUL').innerHTML = '';
                                    CSS3.hide(getFromId('groupAccepted'));
                                    setKey(core.user_id + '_awaitingsIgnored', core.awaitingsIgnored.toString());
                                    core.updateHeadersPosition();
                                });

                                if (getFromId('hideallignored')) EventMgr.addListener(getFromId('hideallignored'), 'click', function() {
                                    core.awaitingsIgnored = new CollectionList(eval(getKey(core.user_id + '_awaitingsIgnored', '({})')));
                                    var l, user;
                                    for (l in core.ignoredList) {
                                        if (user = core.ignoredList[l]) core.awaitingsIgnored.Remove(user.uid);
                                    }
                                    getFromId('ignoredContentUL').innerHTML = '';
                                    CSS3.hide(getFromId('groupIgnored'));
                                    setKey(core.user_id + '_awaitingsIgnored', core.awaitingsIgnored.toString());
                                    core.updateHeadersPosition();
                                });

                                if (getFromId('hideallboth')) EventMgr.addListener(getFromId('hideallboth'), 'click', function() {
                                    core.awaitingsIgnored = new CollectionList(eval(getKey(core.user_id + '_awaitingsIgnored', '({})')));
                                    var user;
                                    for (user in core.awaitingsIgnored.Items) {
                                        core.clickToRemoveA(user);
                                    }
                                    getFromId('acceptedignoredContentUL').innerHTML = '';
                                    CSS3.hide(getFromId('groupAcceptedIgnored'));
                                    core.awaitingsIgnored = new CollectionList();
                                    setKey(core.user_id + '_awaitingsIgnored', '({})');
                                    core.updateHeadersPosition();
                                }); 
                                if (((counter.pending + counter.ignored + counter.accepted + counter.combined) == 0) && (getFromId('homeUnfriends'))) core._showNoAwaitings();
                                var a;
                                current = null;
                                for (a in core.awaitingsIgnored.Items) {
                                    if (core.awaitingsIgnored.Items.hasOwnProperty(a)) {
                                        if (current = core.awaitingsIgnored.Items[a]) current.toNotify = 'no';
                                    }
                                } 
                                //Saving lists
                                setKey(core.user_id + '_keepAwaitingList', awaitingList.toString());
                                setKey(core.user_id + '_awaitingsIgnored', core.awaitingsIgnored.toString());
                            }
                            CSS3.hide(getFromId('loadingIndicatorAwaitings'));
                        }
                        else core.loadErrorFacebox('Error', this+' Error while retreiving Awaiting Requests (<a onclick="window.open(this.href); return false;" href="'+this.url+'">'+Params.database+'.php</a>)');
                    }
                }
                catch (exception) {
                    core.dialogs['errorAwaitings'] = new Facebox({
                        id: 'errorAwaitings',
                        error: true,
                        title: LANG.error,
                        body: new xHTMLElement({
                            element: 'div',
                            id: 'errorAwaitings',
                            innerHTML: 'Error while retrieving Awaiting Requests:<br /><strong>'+exception.message+'</strong><br />on <a href="'+exception.fileName+'">'+exception.fileName+'</a>, line: '+exception.lineNumber+'<br />while fetching <a href="'+$url_awaitings+'" onclick="window.oper(this.href); return false;">'+$url_awaitings+'</a>'
                        }).getElement(),
                        loading: true,
                        timeout: 500,
                        indicator: true,
                        buttons: [{
                            name: 'cancel',
                            value: LANG.btn_close,
                            id: 'cancel_button',
                            handler: function() { void(0); },
                            disabled: false,
                            closer: true,
                            type: 'gray'
                        }]
                    });
                    core.dialogs['errorAwaitings'].Show();
                }
            }
        };
        Ajax($typeahead_recheck);
    };

    core.showUnfriends = function() {
        Console.log('Showing unfriends');
        if (getFromId('homeUnfriends')) {
            if (/selectedItem/.test(getFromId('navItem_unfriends').className)) {
                getFromId('unfriendsContentUL').innerHTML = ''; 
                if ((core.unfriends.Count() == 0) && (core.reappeared.Count() == 0)) {
                    Console.log('No unfriends to show');
                    core._showNoUnfriends();
                }
                else {
                    last = false;
                    core._showUnfriends();
                    core.reappeared = new CollectionList(eval(getKey(core.user_id + '_reappeared', '({})'))); 
                    core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
                    if (Params.settings.reappeared) {
                        Params.Paging.reappeared = 1;
                        core.showReappearedPerPages(Params.Paging.reappeared, Params.settings.paging);
                        setKey(core.user_id + '_reappeared', core.reappeared.toString()); 
                        if (core.reappeared.Count() > 0) ;
                        else CSS3.hide(getFromId('groupReappeared'));
                    }
                    c = core.unfriends.Count();
                    Params.Paging.unfriends = 1;
                    core.showUnfriendsPerPages(Params.Paging.unfriends, Params.settings.paging); 
                    CSS3.removeClass(getFromId('notificationsWrapper'), 'jewelNew');
                    

                    if (c == 0) {
                        CSS3.hide(getFromId('groupUnfriends'));
                        CSS3.hide(getFromId('loadingIndicatorUnfriends'));
                        CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
                    }
                    if (c > 40) {
                        if (Params.settings.paging > 40) {
                            CSS3.display(getFromId('h3Unfriends'), 'inline-block');
                            helps = eval(getKey(core.user_id + '_helps', '({})'));
                            if (!helps.tooMuchUnfriends) core.clickh3Unfriends();
                            EventMgr.addListener(getFromId('h3Unfriends'), 'click', function() {
                                core.clickh3Unfriends();
                            });
                        }
                    }
                }
            }
        }
    };

    core.showUnfriendsPerPages = function(page, show) {
        var from, to, total;
        total = core.unfriends.Count();
        if (Params.settings.paging == 0) show = total;
        from = (total-((page-1)*show));
        to = (1+total-(page*show));
        to = (to<1?1:to);
        getFromId('unfriendsContentUL').innerHTML = '';
        CSS3.display(getFromId('loadingIndicatorUnfriends'), 'inline-block');
        CSS3.hide(getFromId('bubblelink_unfriends')); 
        var unfriendsArray = toArray(core.unfriends.Items);
        unfriendsArray.sort ( function( a , b ){
            return b.time - a.time
        });
        var current;
        unfriendsArray = unfriendsArray.reverse();
        core.toNotify = new CollectionList(eval(getKey(core.user_id + '_toNotify', '({})')));               
        for (j = to;j<=from;j++) {
            i = j-1;
            if (current = unfriendsArray[i]) {
                CSS3.display(getFromId('groupUnfriends'), 'block');
                if (j == from) last = true;
                if (getFromId(current.uid)) getFromId(current.uid).parentNode.removeChild(getFromId(current.uid));
                var addInfos = {
                    id: current.uid,
                    name: current.name,
                    subname: '',
                    picture: current.picture,
                    status: current.status,
                    from: 'unfriend',
                    highlighted: (!current.highlighted?true:false),
                    time: current.time
                };
                new UserItem(addInfos);
                current.highlighted = true;
                new UserCheck({uid:current.uid, last: last, status: current.status});
                if (current.status != 'deactivated') core.updateProfilePic(current.uid);
                if (core.toNotify.Items[current.uid] == 'yes') core.toNotify.Items[current.uid] = 'no';
            }
        }
        setKey(core.user_id + '_unfriends', core.unfriends.toString());
        setKey(core.user_id + '_toNotify', core.toNotify.toString());
        if (total > show) {
            var pageMax = Math.ceil(total / show);
            getFromId('h3_title_unfriends').innerHTML = LANG.header_unfriends+' (page '+page+'/'+pageMax+')';
            CSS3.display(getFromId('paging_unfriends'), 'block');
            var paging_unfriends_html = getFromId('paging_unfriends').innerHTML;
            getFromId('paging_unfriends').innerHTML = paging_unfriends_html;
            if (to == 1) CSS3.addClass(getFromId('paging_unfriends_up'), "uiButtonDisabled");
            else {
                CSS3.removeClass(getFromId('paging_unfriends_up'), "uiButtonDisabled");
                EventMgr.addListener(getFromId('paging_unfriends_up'), 'click', function() {
                    Params.Paging.unfriends = page + 1;
                    core.showUnfriendsPerPages(Params.Paging.unfriends, show);
                });
            }
            if (page == 1) CSS3.addClass(getFromId('paging_unfriends_down'), "uiButtonDisabled");
            else {
                CSS3.removeClass(getFromId('paging_unfriends_down'), "uiButtonDisabled");
                EventMgr.addListener(getFromId('paging_unfriends_down'), 'click', function() {
                    Params.Paging.unfriends = page - 1;
                    core.showUnfriendsPerPages(Params.Paging.unfriends, show);
                });
            }
        }
        else {
            getFromId('h3_title_unfriends').innerHTML = LANG.header_unfriends;
            CSS3.hide(getFromId('paging_unfriends')); 
        }
        core.startFadeUser();
    };

    core.showReappearedPerPages = function(page, show) {
        var from, to, total, current;
        total = core.reappeared.Count();
        from = (total-((page-1)*show));
        if (Params.settings.paging == 0) show = total;
        to = (1+total-(page*show));
        to = (to<1?1:to);
        getFromId('reappearedContentUL').innerHTML = '';
        var reappearedArray = toArray(core.reappeared.Items);
        reappearedArray.sort(function(a, b){
            return b.time - a.time;
        });
        reappearedArray = reappearedArray.reverse();
        for (j = from;j>=to;j--) {
            i = j-1;
            if (reappearedArray[i]) {
                if (current = reappearedArray[i]) {
                    if (getFromId('groupUnfriends')) {
                        if (core.unfriends.Count() > 0) CSS3.setClass((new xPathSelector("//*[@id='groupReappeared']/div")).getSingleNodeValue(), 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup mtl');
                    }
                    CSS3.display(getFromId('groupReappeared'), 'block');
                    var addInfos = {
                        id: current.uid,
                        name: current.name,
                        subname: LANG.text_reactivated,
                        picture: current.picture,
                        from: 'reappeared',
                        highlighted: (!current.highlighted?true:false),
                        time: current.time,
                        hidden: current.hidden
                    };
                    new UserItem(addInfos);
                    current.highlighted = true;
                    core.setSubName({uid: current.uid, text: LANG.text_reactivated, type: 'reappeared'});
                    core.updateProfilePic(current.uid);
                }
            }
        }
        if (total > show) {
            var pageMax = Math.ceil(total / show);
            getFromId('h3_title_reappeared').innerHTML = LANG.header_reappeared+' (page '+page+'/'+pageMax+')';
            CSS3.display(getFromId('paging_reappeared'), 'block');
            var paging_reappeared_html = getFromId('paging_reappeared').innerHTML;
            getFromId('paging_reappeared').innerHTML = paging_reappeared_html;
            if (to == 1) CSS3.addClass(getFromId('paging_reappeared_up'), "uiButtonDisabled");
            else {
                CSS3.removeClass(getFromId('paging_reappeared_up'), "uiButtonDisabled");
                EventMgr.addListener(getFromId('paging_reappeared_up'), 'click', function() {
                    Params.Paging.reappeared = page + 1;
                    core.showReappearedPerPages(Params.Paging.reappeared, show);
                });
            }
            if (page == 1) CSS3.addClass(getFromId('paging_reappeared_down'), "uiButtonDisabled");
            else {
                CSS3.removeClass(getFromId('paging_reappeared_down'), "uiButtonDisabled");
                EventMgr.addListener(getFromId('paging_reappeared_down'), 'click', function() {
                    Params.Paging.reappeared = page - 1;
                    core.showReappearedPerPages(Params.Paging.reappeared, show);
                });
            }
        }
        else {
            getFromId('h3_title_reappeared').innerHTML = LANG.header_reappeared;
            CSS3.hide(getFromId('paging_reappeared'));
        }
        core.startFadeUser();
    };

    core.clickh3Unfriends = function() {
        core.dialogs['tooMuchUnfriends'] = new ContextualFacebox({
            id: 'tooMuchUnfriends',
            title: '<span class="en_US">You got too many Unfriends</span><span class="fr_FR">Vous avez trop d\'amis en moins</span>',
            body: '<span class="en_US">Having more than 40 Unfriends may slow down your Facebook page a little.<br />When you know who removed you as a friend, you can hide the profile for the future to make room.<br />Clic Hide to bury some Unfriends.</span>'+
            '<span class="fr_FR">Avoir plus de 40 Unfriends peut sensiblement ralentir votre navigateur. Lorsque vous savez qui vous a supprimé de ses amis, vous pouvez masquer le profil pour faire de la place.<br />Cliquez sur "Masquer" pour ne plus afficher certains profils.</span>',
            context: getFromId('h3Unfriends'),
            orientation: 'right',
            buttons:[{
                name: 'hide_button',
                value: LANG.btn_close,
                id: 'hide_button',
                handler: function() {
                    helps = eval(getKey(core.user_id + '_helps', '({})'));
                    helps.tooMuchUnfriends = true; 
                    setKey(core.user_id + '_helps', stringify(helps));
                },
                disabled: false,
                closer: true,
                type: 'green'
            }]
        });
        core.dialogs['tooMuchUnfriends'].Show();
    };

    core._showNoUnfriends = function() {
        if (getFromId('homeUnfriends')) getFromId('homeUnfriends').innerHTML = template.UnfriendLists();
        if (core.getKeyError) CSS3.display(getFromId('unfriendsError'), 'block');
        CSS3.hide(getFromId('noAwaitings'));
        CSS3.display(getFromId('noUnfriends'), 'block');
        CSS3.hide(getFromId('groupPending'));
        CSS3.hide(getFromId('groupAcceptedIgnored'));
        CSS3.hide(getFromId('groupUnfriends'));
        CSS3.hide(getFromId('groupReappeared'));
        CSS3.hide(getFromId('groupAccepted'));
        CSS3.hide(getFromId('groupIgnored'));
        CSS3.hide(getFromId('loadingIndicatorUnfriends'));
        CSS3.hide(getFromId('loadingIndicatorAwaitings'));
        CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
        //core.bindHide();
    };

    core._showUnfriends = function() {
        if (getFromId('homeUnfriends')) getFromId('homeUnfriends').innerHTML = template.UnfriendLists();
        if (core.getKeyError) CSS3.display(getFromId('unfriendsError'), 'block');
        CSS3.hide(getFromId('noAwaitings'));
        CSS3.hide(getFromId('noUnfriends'));
        CSS3.hide(getFromId('groupPending'));
        CSS3.hide(getFromId('groupAcceptedIgnored'));
        CSS3.hide(getFromId('groupUnfriends'));
        CSS3.hide(getFromId('groupReappeared'));
        CSS3.hide(getFromId('groupAccepted'));
        CSS3.hide(getFromId('groupIgnored'));
        CSS3.hide(getFromId('loadingIndicatorAwaitings'));
        //core.bindHide();
    };

    core._showNoAwaitings = function() { 
        if (getFromId('homeUnfriends')) getFromId('homeUnfriends').innerHTML = template.UnfriendLists();
        if (core.getKeyError) CSS3.display(getFromId('unfriendsError'), 'block');
        CSS3.display(getFromId('noAwaitings'), 'block');
        CSS3.hide(getFromId('noUnfriends'));
        CSS3.hide(getFromId('groupPending'));
        CSS3.hide(getFromId('groupAcceptedIgnored'));
        CSS3.hide(getFromId('groupUnfriends'));
        CSS3.hide(getFromId('groupReappeared'));
        CSS3.hide(getFromId('groupAccepted'));
        CSS3.hide(getFromId('groupIgnored'));
        CSS3.hide(getFromId('loadingIndicatorUnfriends'));
        CSS3.hide(getFromId('loadingIndicatorAwaitings'));
        CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
        //core.bindHide();
    };

    core._showAwaitings = function() {
        if (getFromId('homeUnfriends')) getFromId('homeUnfriends').innerHTML = template.UnfriendLists();
        if (core.getKeyError) CSS3.display(getFromId('unfriendsError'), 'block');
        CSS3.hide(getFromId('noAwaitings'));
        CSS3.hide(getFromId('noUnfriends'));
        CSS3.hide(getFromId('groupPending'));
        CSS3.hide(getFromId('groupAcceptedIgnored'));
        CSS3.hide(getFromId('groupUnfriends'));
        CSS3.hide(getFromId('groupReappeared'));
        CSS3.hide(getFromId('groupAccepted'));
        CSS3.hide(getFromId('groupIgnored'));
        CSS3.hide(getFromId('loadingIndicatorUnfriends'));
        //core.bindHide();
    };

    core.blockProfile = function($uid) {
        var div_rightContent= getFromId('div_rightContent_'+$uid);
        var UserListItem = getFromId($uid);

        var buffered = div_rightContent.innerHTML;

        if ($uid > 1) {
            
            div_rightContent.innerHTML = '<span style="margin-top:5px; background:transparent url(\''+Params.images.smallIndicator+'\') no-repeat scroll left top; height:11px; width:16px; z-index:2; display:block;"></span>';
            var dataToPost = '__a=1&block='+$uid+'&type=friend&post_form_id='+core.uf_post_form_id+'&post_form_id_source=AsyncRequest&fb_dtsg='+core.uf_fb_dtsg;
            new XHR({
                method: 'post',
                headers: Params.Ajax.Headers,
                url: Params.protocol+'//www.facebook.com/privacy/ajax/block.php?__a=1',
                data: dataToPost,
                onload: function(data) {
                    Console.log('Attempting to block uid '+$uid);
                    var isSuccess = true
                    core.removeUnfriend($uid);
                }
            });
        }
    };

    core.clickToRemove = function($uid) {
        if (/\sshifted/.test(document.body.className)) {
            core.dialogs['alwaysHideFacebox'] = new Facebox({
                id: 'alwaysHideFacebox',
                title: LANG.text_alwayshide,
                body: new xHTMLElement({
                    element: 'div',
                    id: 'alwaysHideFaceboxBody',
                    innerHTML: LANG.hide_perm.replace('{name}', evalName(core.unfriends.Items[$uid].name))
                }).getElement(),
                picture: Params.protocol+'//graph.facebook.com/'+$uid+'/picture?type=normal',
                buttons:[{
                    name: 'delete_story',
                    value: LANG.text_alwayshide,
                    id: 'reset_button',
                    handler: function() { 
                        core.alwaysHide = new CollectionList(eval(getKey(core.user_id + '_alwaysHide', '({})')));
                        core.alwaysHide.Add($uid, (core.unfriends.Items[$uid]?core.unfriends.Items[$uid]:$uid));
                        setKey(core.user_id + '_alwaysHide', core.alwaysHide.toString());
                        core.removeUnfriend($uid);
                    },
                    disabled: false,
                    closer: true,
                    type: 'blue'
                },{
                    name: 'cancel',
                    value: LANG.btn_cancel,
                    id: 'cancel_button',
                    handler: function() { void(0); },
                    disabled: false,
                    closer: true,
                    type: 'gray'
                }]
            });
            core.dialogs['alwaysHideFacebox'].Show();
        }
        else if (/\sctrlShifted/.test(document.body.className)) {
            try {
                core.dialogs['blockUnfriendFacebox'] = new Facebox({
                    id: 'blockUnfriendFacebox',
                    title: LANG.block,
                    body: new xHTMLElement({
                        element: 'div',
                        id: 'blockUnfriendFaceboxBody',
                        innerHTML: LANG.hide_perm.replace('{name}', evalName(core.unfriends.Items[$uid].name))
                    }).getElement(),
                    picture: Params.protocol+'//graph.facebook.com/'+$uid+'/picture?type=normal',
                    buttons:[{
                        name: 'blockUnfriend',
                        value: LANG.block,
                        id: 'blockUnfriend_button',
                        handler: function() {
                            core.alwaysHide = new CollectionList(eval(getKey(core.user_id + '_alwaysHide', '({})')));
                            core.alwaysHide.Add($uid, core.unfriends.Items[$uid]);
                            setKey(core.user_id + '_alwaysHide', core.alwaysHide.toString());
                            core.removeUnfriend($uid);
                        },
                        disabled: false,
                        closer: true,
                        type: 'blue'
                    },{
                        name: 'cancel',
                        value: LANG.btn_cancel,
                        id: 'cancel_button',
                        handler: function() { void(0); },
                        disabled: false,
                        closer: true,
                        type: 'gray'
                    }]
                });
                core.dialogs['blockUnfriendFacebox'].Show();
            }
            catch (exception) { ; }
        }
        else core.removeUnfriend($uid); 
    }

    core.removeUnfriend = function($uid) {
        if (core.unfriends.Items[$uid]) {
            if (Params.settings.deactivated) {
                if (core.unfriends.Items[$uid].status == 'deactivated') Params.deactivatedInRow++;
                else {
                    if (Params.deactivatedInRow < 5) Params.deactivatedInRow = 0;
                    else Params.deactivatedInRow++
                }
                if (Params.deactivatedInRow == 5) {
                    setTimeout(function() {
                        core.dialogs['disableDeactivatedProfiles'] = new Facebox({
                            id: 'disableDeactivatedProfiles',
                            title: 'Disable deactivated profiles',
                            body: new xHTMLElement({
                                element: 'div',
                                id: 'Body',
                                innerHTML: '<div style="padding-right:5px;">You choose to hide five deactivated profiles in a row, do you want to hide deactivated profiles from the list in the future ?'+
                                '<br /><br />You will be able to re-enable the option later in the settings.</div>'
                            }).getElement(),
                            buttons: [{
                                name: 'ok',
                                value: LANG.btn_ok,
                                id: 'next_button',
                                handler: function() { 
                                    Params.settings.deactivated = false;
                                    setKey('settings', stringify(Params.settings));
                                    getFromId('deactivated').checked = false;
                                },
                                disabled: false,
                                closer: true,
                                type: 'green'
                            },{
                                name: 'cancel',
                                value: LANG.btn_cancel,
                                id: 'cancel_button',
                                handler: function() { void(0); },
                                disabled: false,
                                closer: true,
                                type: 'gray'
                            }]
                        });
                    }, 1000);
                }
            }
            core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
            core.unfriends.Remove($uid);
            setKey(core.user_id + '_unfriends', core.unfriends.toString()); 
            core.bubble.setValue({value: core.getCounter()});
            $el = getFromId($uid);
            core.slideRemove($el); 
            if ((core.unfriends.Count() == 0) && (core.reappeared.Count() > 0)) CSS3.setClass((new xPathSelector("//*[@id='groupReappeared']/div")).getSingleNodeValue(), 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup');

            setTimeout(function() {
                if ((core.unfriends.Count() == 0) && (core.reappeared.Count() == 0) && (getFromId('homeUnfriends'))) core._showNoUnfriends();
            }, 1000);
        }
    };

    core.clickToRemoveA = function($uid) {
        core.awaitingsIgnored = new CollectionList(eval(getKey(core.user_id + '_awaitingsIgnored', '({})')));
        awaitingList = new CollectionList(eval(getKey(core.user_id + '_keepAwaitingList', '({})')));
        core.awaitingsIgnored.Remove($uid);
        setKey(core.user_id + '_awaitingsIgnored', core.awaitingsIgnored.toString());
        core.slideRemove(getFromId($uid));
        setTimeout(function() {
            if ((awaitingList.Count() == 0) && (core.awaitingsIgnored.Count() == 0) && (getFromId('homeUnfriends'))) core._showNoAwaitings();
        }, 1000);
    };

    core.removeFromReappeared = function($uid) {
        core.reappeared = new CollectionList(eval(getKey(core.user_id + '_reappeared', '({})')));
        core.deactivated = new CollectionList(eval(getKey(core.user_id + '_deactivated', '({})'))); 
        core.reappeared.Remove($uid);
        core.deactivated.Remove($uid);
        setKey(core.user_id + '_deactivated', core.deactivated.toString());
        setKey(core.user_id + '_reappeared', core.reappeared.toString());

        core.slideRemove(getFromId($uid)); 
        setTimeout(function() {
            if ((core.unfriends.Count() == 0) && (core.reappeared.Count() == 0) && (getFromId('homeUnfriends'))) core._showNoUnfriends(); 
        }, 1000);
    };

    core.setName = function($uid, $name, $enabled) {
        if ($name) {
            $el = getFromId('a_username__'+$uid);
            if ($el) {
                if ($enabled) getFromId('a_username__' + $uid).innerHTML = eval('"'+$name+'"');
                else {
                    $el.parentNode.insertBefore(new xHTMLElement({
                        element: 'span',
                        id: 'a_username__' + $uid,
                        className: 'UIObjectListing_Title',
                        innerHTML: eval('"'+$name+'"')
                    }).getElement(), $el);
                    $el.parentNode.removeChild($el);
                }
            }
        }
    };

    core.setPicture = function($uid, $picture) {
        if (!Params.settings.updatePicture) return;
        try {
            void core.unfriends.Items[$uid];
            if (core.unfriends.Items[$uid].status == 'deactivated') return;
        }
        catch (ex) { ; }
        if (getFromId('img_userpic__' + $uid)) getFromId('img_userpic__' + $uid).src = Params.protocol+'//graph.facebook.com/'+$uid+'/picture';
    };

    core.setSubName = function(__constructor) {
        if (getFromId('span_data_subtext__' + __constructor.uid)) {
            switch (__constructor.type) {
                case 'unfriend' :
                    icon = '<i class="GenericStory_Icon img spritemap_icons sx_app_icons_unfriends" style="top:3px; position:relative"></i>';
                    break;
                case 'awaiting' :
                    icon = '<i class="GenericStory_Icon img spritemap_icons sx_app_icons_awaitings" style="top:3px; position:relative"></i>';
                    break;
                case 'hidden' :
                    icon = '<i class="GenericStory_Icon img spritemap_icons sx_app_icons_deactivated" style="top:3px; position:relative"></i>'; 
                    break;
                case 'reappeared' :
                    icon = '<i class="GenericStory_Icon img spritemap_icons sx_app_icons_reappeared" style="top:3px; position:relative"></i>';
                    break;
                case 'ignored' :
                    icon = '<i class="GenericStory_Icon img spritemap_icons sx_app_icons_ignored" style="top:2px; position:relative"></i>';
                    break;
                case 'newfriend' :
                    icon = '<i class="GenericStory_Icon img spritemap_icons sx_app_icons_friend" style="top:3px; position:relative"></i>';
                    break;
            }
            if (!Params.settings.icons) icon = "";
            getFromId('span_data_subtext__'+__constructor.uid).innerHTML = '<span class="uiStreamSource">'+__constructor.text+(Params.settings.uid?' <br><small>(uid: '+__constructor.uid+')</small>':'')+'</span>';
            if (getFromId('span_icon__'+__constructor.uid)) getFromId('span_icon__'+__constructor.uid).innerHTML = icon;
        }
    };

    core.getName = function() {
        if (document.getElementsByClassName('profileName')[0]) return document.getElementsByClassName('profileName')[0].innerHTML.replace(/\s<span\s(.+)<\/span>/, '');
        if (getFromId('profile_name')) return getFromId('profile_name').innerHTML.replace(/\s<span\s(.+)<\/span>/, '');
    };

    core.getId = function() {
        var idName = (new xPathSelector(".//a[contains(@href, 'report/social.php?')]")).getSingleNodeValue();
        if (idName) {
            if (/cid=([0-9]+)\&/.test(idName.href)) return idName.href.match(/cid=([0-9]+)\&/)[1];
        }
        return 0;
    };

    core.loadCheckProfile = function() {
        if (/nile_profile/.test(document.body.className)) {
            var reportLink;
            if (reportLink = (new xPathSelector(".//*[contains(@href, '/report/social.php')]")).getSingleNodeValue()) {
                if (/cid=173714342679390/.test(reportLink.href)) if (reportLink.tagName == 'A') CSS3.hide(reportLink);
            }
        }
        else if (/profile/.test(document.body.className)) { 
            
            var reportLink, above, profileHeaderMain, sideNav, ulList;
            if (reportLink = (new xPathSelector(".//*[contains(@href, '/report/social.php')]")).getSingleNodeValue()) {
                if (/cid=173714342679390/.test(reportLink.href)) {
                    if (reportLink.tagName == 'A') CSS3.hide(reportLink.parentNode);
                    helps = eval(getKey(core.user_id + '_helps'));
                    if (above = getFromId('pagelet_above_html')) {
                        if (!helps.taketourinfo) {
                            above.innerHTML = ''+
                            '<div id="c4d54c3e8437398893041774">'+
                            '   <div class="fbx_above_html">'+
                            '       <div id="above_the_profile">'+
                            '           <div id="megaphone_story_89" class="megaphone_story_wrapper">'+
                            '               <div class="megaphone_location_managed_profile_admin">'+
                            '                   <div class="pal megaphone_box">'+
                            '                       <div class="megaphone_story clearfix">'+
                            '                           <a id="close_tourinfo" class="megaphone_hide_link uiCloseButton uiCloseButton uiCloseButton" href="#" title="Remove"></a>'+
                            '                           <div class="mbs mbs fsl fwb fcb">You use Unfriend Finder</div>'+
                            '                           <div class="megaphone_content">You can now take a tour to know how to use the features of Unfriend Finder.</div>'+
                            '                       </div>'+
                            '                   </div>'+
                            '               </div>'+
                            '           </div>'+
                            '       </div>'+
                            '   </div>'+
                            '</div>';
                        }    
                    }
                    CSS3.addClass(getFromId('about_text_less'), 'hidden_elem');
                    CSS3.removeClass(getFromId('about_text_more'), 'hidden_elem');
                    if (!getFromId('tourButton')) {
                        if (profileHeaderMain = (new xPathSelector(".//div[contains(@class, 'profileHeaderMain')]")).getSingleNodeValue()) {
                            
                            new xHTMLElement({
                                element: 'label',
                                className: 'mlm mainButton uiButton',
                                id: 'tourButton',
                                style: {
                                    cssFloat: 'right'
                                },
                                innerHTML: ''+
                                '<i class="mrs customimg img" style="width:16px; height:16px; display:inline-block; background:url(\''+Params.links.rsrc+'/zA/r/xDfilNfGxdj.png\') 0px -17px"></i>'+
                                '<input type="button" value="Take a tour" id="u948072_3">',
                                parentNode: profileHeaderMain.parentNode.firstChild,
                                listeners: {
                                    click:  function() {
                                        setKey(core.user_id+'_takeTour', '1');
                                        core.href(Params.protocol+'//www.facebook.com/');   
                                    }
                                }
                            }).getElement();
                        }
                        EventMgr.addListener(getFromId('close_tourinfo'), 'click', function() {
                            above.innerHTML = ''; 
                            helps.taketourinfo = true;
                            setKey(core.user_id+'_helps', stringify(helps));  
                        });
                    }
                    if (sideNav = getFromId('sideNav')) {
                        if (!getFromId('navItem_group')) {
                            if (ulList = (new xPathSelector("//*[@id='sideNav']//ul[@role='navigation']")).getSingleNodeValue()) {
                                new xHTMLElement({
                                    element: 'li',
                                    id: 'navItem_group',
                                    innerHTML: ''+
                                    '<a href="'+Params.links.group+'" class="item">'+
                                    '<span class="imgWrap"><i class="img sp_8a7upt sx_f3c867"></i></span><span class="linkWrap">'+LANG.joinGroup+'</span>',
                                    parentNode: ulList
                                }).getElement();
                                new xHTMLElement({
                                    element: 'li',
                                    id: 'navItem_help',
                                    innerHTML: ''+
                                    '<a href="http://www.unfriendfinder.'+(Params.lang == 'fr'?'fr':'com')+'/help" onclick="window.open(this.href); return false;" class="item">'+
                                    '<span class="imgWrap"><i class="img sp_8a7upt sx_f3c867" style="background:0 -34px url(\''+Params.links.rsrc+'/v1/zz/r/r9ad093yvZ9.png\');"></i></span><span class="linkWrap">'+LANG.help+'</span>',
                                    parentNode: ulList
                                }).getElement();
                                new xHTMLElement({
                                    element: 'li',
                                    id: 'navItem_update',
                                    style: {
                                        display: (Params.newVersion?'inline-block':'none')
                                    },
                                    innerHTML: ''+
                                    '<a href="http://www.unfriendfinder.net/unfriend_finder.user.js" class="item">'+
                                    '<span class="imgWrap"><i class="img sp_8a7upt sx_f3c867" style="background:no-repeat -18px -432px url(\''+Params.links.rsrc+'/z1KF3/hash/51woxxd9.png\');"></i></span><span class="linkWrap">Update</span>',
                                    parentNode: ulList
                                }).getElement();
                            }
                        }
                    }
                }
            }
        }
        else if (getFromId('profile_pic')) {
            Console.log('core.loadCheckProfile for '+core.getName()); 
            setTimeout(function() {
                if (getFromId('tab_canvas')) core.checkProfile();
                else core.checkNewProfile();
            }, 1500);
        }
    };

    core.checkProfile = function() {
        try {
            if ((/id=([0-9]+)/.test(getFromId('top_bar_pic').href))) {
                var tuid = getFromId('top_bar_pic').href.match(/id=([0-9]+)/)[1];
                if (core.checkUID != tuid) {
                    core.checkUID = tuid;
                    if (!getFromId('profile_action_remove_friend')) {
                        if (!getFromId('hasIgnored')) {
                            if (core.hasIgnored.Items[tuid]) {
                                var box = new xHTMLElement({
                                    element: 'div',
                                    style: { marginTop: '10px' },
                                    parentNode: document.getElementsByClassName('lightblue_box')[0].firstChild
                                }).getElement();

                                new xHTMLElement({
                                    element: 'i',
                                    id: 'hasIgnored',
                                    className: 'UIImageBlock_Image UIImageBlock_ICON_Image img spritemap_icons spritemap_icons_fix hasignored ufIcon',
                                    parentNode: box
                                });

                                new xHTMLElement({
                                    element: 'div',
                                    className: 'profile_visibility_text UIImageBlock_Content UIImageBlock_ICON_Content hasignored',
                                    innerHTML: core.getName()+' '+LANG.hasignored.replace('.', '')+'. '+core.genTime(core.awaitingsIgnored.Items[tuid].time)+' · <span class="uiTooltip buttonWrap"><label class="uiCloseButton uiCloseButtonSmall" style="margin-top:-2px;"><input type="submit" id="reset_hasIgnored_'+tuid+'"></label><span class="uiTooltipWrap middle right rightmiddle"><span class="uiTooltipText">'+LANG.hide+'</span></span></span>',
                                    parentNode: box
                                });
                                EventMgr.addListener(getFromId('reset_hasIgnored_'+tuid), 'click', function() {
                                    try {
                                        core.hasIgnored = new CollectionList(eval(getKey(core.user_id + '_hasIgnored', '({})')));
                                        var w = getFromId('hasIgnored').parentNode;
                                        w.parentNode.removeChild(w); 
                                        core.hasIgnored.Remove(tuid);
                                        setKey(core.user_id + '_hasIgnored', core.hasIgnored.toString());
                                    }
                                    catch (ex) { ; }
                                })
                            }
                        }
                        if (!getFromId('wasUnfriend')) {
                            if (core.wasUnfriend.Items[tuid]) {
                                var box = new xHTMLElement({
                                    element: 'div',
                                    style: { marginTop: '10px' },
                                    parentNode: document.getElementsByClassName('lightblue_box')[0].firstChild
                                }).getElement();

                                new xHTMLElement({
                                    element: 'i',
                                    id: 'wasUnfriend',
                                    className: 'UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons wasunfriend ufIcon',
                                    parentNode: box
                                });

                                new xHTMLElement({
                                    element: 'div',
                                    className: 'profile_visibility_text UIImageBlock_Content UIImageBlock_ICON_Content wasunfriend',
                                    innerHTML: core.getName()+' '+LANG.wasunfriend.replace('.', '')+'. '+core.genTime(core.unfriends.Items[tuid].time)+' · <span class="uiTooltip buttonWrap"><label class="uiCloseButton uiCloseButtonSmall" style="margin-top:-2px;"><input type="submit" id="reset_wasUnfriend_'+tuid+'"></label><span class="uiTooltipWrap middle right rightmiddle"><span class="uiTooltipText">'+LANG.hide+'</span></span></span>',
                                    parentNode: box
                                });
                                EventMgr.addListener(getFromId('reset_wasUnfriend_'+tuid), 'click', function() {
                                    try {
                                        core.wasUnfriend = new CollectionList(eval(getKey(core.user_id + '_wasUnfriend', '({})')));
                                        var w = getFromId('wasUnfriend').parentNode;
                                        w.parentNode.removeChild(w);
                                        core.wasUnfriend.Remove(tuid);
                                        setKey(core.user_id + '_wasUnfriend', core.wasUnfriend.toString());
                                    }
                                    catch (ex) { ; }
                                });
                            }
                        } 
                    } 
                }
                if (getFromId('profile_connect_text')) {
                    var pct = getFromId('profile_connect_text');
                    var removeConnectionLink = pct.firstChild.nextSibling.nextSibling;
                    var tuid = getFromId('top_bar_pic').href.match(/id=([0-9]+)/)[1];
                    if (/ajax\/profile\/removefriendconfirm.php\?uid=/.test(removeConnectionLink.href)) {
                        EventMgr.addListener(removeConnectionLink, 'click', function() {
                            core.keepAwaitingList = new CollectionList(eval(getKey(core.user_id + '_keepAwaitingList', '({})')));
                            core.keepAwaitingList.Remove(tuid);
                            setKey(core.user_id+'_keepAwaitingList', core.keepAwaitingList.toString());
                        });
                    }
                }
                if (getFromId('profile_name')) {
                    var tuid = getFromId('top_bar_pic').href.match(/id=([0-9]+)/)[1];
                    var parent = getFromId('profile_name').parentNode, userinfos = core.unfriendsInfos.Items[tuid];
                    var name = core.getName(), old_name = userinfos.name;
                    if (name != old_name) {
                        if (!getFromId('previous_name')) {
                            new xHTMLElement({
                                element: 'h2',
                                id: 'previous_name',
                                parentNode: parent,
                                innerHTML: '<img src="'+Params.links.rsrc+'/zt/r/j-2_3E5Gbvi.png"> was '+old_name+' <span class="uiTooltip buttonWrap"><label class="uiCloseButton uiCloseButtonSmall" style="margin-top:-2px;"><input type="submit" id="reset_old_name_'+tuid+'"></label><span class="uiTooltipWrap middle right rightmiddle"><span class="uiTooltipText">'+LANG.hide+'</span></span></span>'
                            });
                            EventMgr.addListener(getFromId('reset_old_name_'+tuid), 'click', function() {
                                try {
                                    var w = getFromId('previous_name');
                                    w.parentNode.removeChild(w);
                                    core.unfriendsInfos = new CollectionList(eval(getKey(core.user_id + '_unfriendsInfos', '({})')));
                                    core.unfriendsInfos.Items[tuid].name = core.getName();
                                    setKey(core.user_id + '_unfriendsInfos', core.unfriendsInfos.toString());
                                }
                                catch (ex) { ; }
                            });
                        }
                    }
                }
                if (getFromId('profile_action_remove_friend')) {
                    if (getFromId('wasUnfriend')) {
                        c = getFromId('wasUnfriend').parentNode;
                        c.removeChild(getFromId('wasUnfriend').nextSibling);
                        c.removeChild(getFromId('wasUnfriend'));
                    }
                    if (getFromId('hasIgnored')) {
                        c = getFromId('hasIgnored').parentNode;
                        c.removeChild(getFromId('hasIgnored').nextSibling);
                        c.removeChild(getFromId('hasIgnored'));
                    } 
                }
            }
        }
        catch (exception) { ; }
    };

    core.checkNewProfile = function() {
        if (!core.getId()) return;
        var o = {uid: core.getId()}; 
        var netEgo = getFromId('pagelet_netego'); 
        try { 
            if (core.checkUID != o.uid) { 
                core.checkUID = o.uid;
                var pagelet_uf = new xHTMLElement({
                    element: 'div',
                    id: 'pagelet_netego_uf',
                    style: {
                        display: 'none'
                    },
                    innerHTML: ''+
                    '<div class="mbl ego_column">'+
                    '   <div class="uiHeader uiHeaderTopAndBottomBorder mbs uiSideHeader">'+
                    '       <div class="clearfix uiHeaderTop">'+
                    '           <div>'+
                    '               <h4 class="uiHeaderTitle">Unfriend Finder</h4>'+
                    '           </div>'+
                    '       </div>'+
                    '   </div>'+
                    '   <div class="phs" style="padding-left: 3px;">'+
                    '       <ul class="uiList ego_unit" id="pagelet_netego_uf_lists">'+
                    '           <li id="li_hasIgnored_'+o.uid+'" style=" margin-bottom:5px; display:none;" class="inCommonSectionList uiListItem uiListVerticalItemBorder">'+
                    '               <table>'+
                    '                   <tr style="vertical-align:top">'+
                    '                       <td><i class="UIImageBlock_Image UIImageBlock_ICON_Image img spritemap_icons spritemap_icons_fix hasignored ufIcon"></i></td>'+
                    '                       <td><span class="visible" id="text_hasIgnored_'+o.uid+'"></span></td>'+
                    '                       <td><span class="uiTooltip buttonWrap"><label style="margin-top: -2px;" class="uiCloseButton uiCloseButtonSmall"><input type="submit" id="reset_hasIgnored_'+o.uid+'"></label><span class="uiTooltipWrap middle right rightmiddle"><span class="uiTooltipText">hide</span></span></span></td>'+
                    '                   </tr>'+
                    '               </table>'+ 
                    '           </li>'+
                    '           <li id="li_wasUnfriend_'+o.uid+'" style="display:none;" class="inCommonSectionList uiListItem uiListVerticalItemBorder">'+
                    '               <table>'+
                    '                   <tr style="vertical-align:top">'+
                    '                       <td><i class="UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons wasunfriend ufIcon"></i></td>'+
                    '                       <td><span class="visible" id="text_wasUnfriend_'+o.uid+'"></span></td>'+
                    '                       <td><span class="uiTooltip buttonWrap"><label style="margin-top: -2px;" class="uiCloseButton uiCloseButtonSmall"><input type="submit" id="reset_wasUnfriend_'+o.uid+'"></label><span class="uiTooltipWrap middle right rightmiddle"><span class="uiTooltipText">hide</span></span></span></td>'+
                    '                   </tr>'+
                    '               </table>'+
                    '           </li>'+
                    '       </ul>'+
                    '   </div>'+
                    '</div>',
                    parentNode: getFromId('pagelet_right_sidebar'),
                    before: getFromId('pagelet_right_sidebar').firstChild
                }).getElement();
                EventMgr.addListener(getFromId('reset_hasIgnored_'+o.uid), 'click', function() {
                    try {
                        core.hasIgnored = new CollectionList(eval(getKey(core.user_id + '_hasIgnored', '({})')));
                        var w = getFromId('li_hasIgnored_'+o.uid);
                        w.parentNode.removeChild(w); 
                        core.hasIgnored.Items[o.uid] = false;
                        if ((new xPathSelector("//ul[@id='pagelet_netego_uf_lists']/li")).numberValues() == 0) CSS3.hide(getFromId('pagelet_netego_uf'));
                        setKey(core.user_id + '_hasIgnored', core.hasIgnored.toString());
                    }
                    catch (ex) { ; }
                });
                EventMgr.addListener(getFromId('reset_wasUnfriend_'+o.uid), 'click', function() {
                    try {
                        core.wasUnfriend = new CollectionList(eval(getKey(core.user_id + '_wasUnfriend', '({})')));
                        var w = getFromId('li_wasUnfriend_'+o.uid);
                        w.parentNode.removeChild(w);
                        core.wasUnfriend.Items[o.uid] = false;
                        if ((new xPathSelector("//ul[@id='pagelet_netego_uf_lists']/li")).numberValues() == 0) CSS3.hide(getFromId('pagelet_netego_uf'));
                        setKey(core.user_id + '_wasUnfriend', core.wasUnfriend.toString());
                    }
                    catch (ex) { ; }
                });

                if (core.hasIgnored.Items[o.uid]) {
                    try {
                        getFromId('text_hasIgnored_'+o.uid).innerHTML = core.getName()+' '+LANG.hasignored.replace('.', '')+'. '+core.genTime(core.hasIgnored.Items[o.uid].time);
                        CSS3.display(getFromId('li_hasIgnored_'+o.uid), 'block');
                        CSS3.display(getFromId('pagelet_netego_uf'), 'block');
                    }
                    catch (ex) {
                        getFromId('text_hasIgnored_'+o.uid).innerHTML = core.getName()+' '+LANG.hasignored.replace('.', '');
                        CSS3.display(getFromId('li_hasIgnored_'+o.uid), 'block');
                        CSS3.display(getFromId('pagelet_netego_uf'), 'block');
                    }
                }
                else {
                    var w = getFromId('li_hasIgnored_'+o.uid);
                    w.parentNode.removeChild(w); 
                }
                if (core.wasUnfriend.Items[o.uid]) {
                    try {
                        getFromId('text_wasUnfriend_'+o.uid).innerHTML = core.getName()+' '+LANG.wasunfriend.replace('.', '')+'. '+core.genTime(core.wasUnfriend.Items[o.uid].time);
                        CSS3.display(getFromId('li_wasUnfriend_'+o.uid), 'block');
                        CSS3.display(getFromId('pagelet_netego_uf'), 'block');
                    }
                    catch (ex) { 
                        getFromId('text_wasUnfriend_'+o.uid).innerHTML = core.getName()+' '+LANG.wasunfriend.replace('.', '');
                        CSS3.display(getFromId('li_wasUnfriend_'+o.uid), 'block');
                        CSS3.display(getFromId('pagelet_netego_uf'), 'block');
                    }
                }
                else {
                    var w = getFromId('li_wasUnfriend_'+o.uid);
                    w.parentNode.removeChild(w);
                } 
            }
            if (getFromId('profile_name')) {
                var parent = getFromId('profile_name').parentNode, userinfos = core.unfriendsInfos.Items[o.uid];
                var name = core.getName(), old_name = userinfos.name;
                if (name != old_name) {
                    if (!getFromId('previous_name')) {
                        new xHTMLElement({
                            element: 'h2',
                            id: 'previous_name',
                            parentNode: parent,
                            innerHTML: '<img src="'+Params.links.rsrc+'/zt/r/j-2_3E5Gbvi.png"> was '+old_name+' <span class="uiTooltip buttonWrap"><label class="uiCloseButton uiCloseButtonSmall" style="margin-top:-2px;"><input type="submit" id="reset_old_name_'+o.uid+'"></label><span class="uiTooltipWrap middle right rightmiddle"><span class="uiTooltipText">'+LANG.hide+'</span></span></span>'
                        });
                        EventMgr.addListener(getFromId('reset_old_name_'+o.uid), 'click', function() {
                            try {
                                var w = getFromId('previous_name');
                                w.parentNode.removeChild(w);
                                core.unfriendsInfos = new CollectionList(eval(getKey(core.user_id + '_unfriendsInfos', '({})')));
                                core.unfriendsInfos.Items[o.uid].name = core.getName();
                                setKey(core.user_id + '_unfriendsInfos', core.unfriendsInfos.toString());
                            }
                            catch (ex) { ; }
                        });
                    }
                }
            }
            if (getFromId('profile_action_remove_friend')) {
                if (getFromId('wasUnfriend')) {
                    c = getFromId('wasUnfriend').parentNode;
                    c.removeChild(getFromId('wasUnfriend').nextSibling);
                    c.removeChild(getFromId('wasUnfriend'));
                }
                if (getFromId('hasIgnored')) {
                    c = getFromId('hasIgnored').parentNode;
                    c.removeChild(getFromId('hasIgnored').nextSibling);
                    c.removeChild(getFromId('hasIgnored'));
                } 
            }

        }
        catch (exception) { ; }
    };

    core.updateProfilePic = function($uid) {
        try {
            void core.unfriends.Items[$uid];
            if (core.unfriends.Items[$uid].status == 'deactivated') return;
        }
        catch (ex) { ; }
        if (!Params.settings.updatePicture) return;
        core.setPicture($uid, Params.images.noPicture);
    };

    core.removeConnectionWith = function(__constructor) {
        var $divContent = getFromId('div_rightContent_'+__constructor.uid), $el = getFromId(__constructor.uid), d = $divContent.innerHTML; //temp
        $divContent.innerHTML = '<span style="margin-top:5px; background:transparent url(\''+Params.images.smallIndicator+'\') no-repeat scroll left top; height:11px; width:16px; z-index:2; display:block;"></span>';

        if (__constructor.uid > 1) {
            dataToPost = '__a=1&fbx=1&friend=' + __constructor.uid + '&type=friend&nctr[_mod]=pagelet_footer&post_form_id=' + core.uf_post_form_id + '&post_form_id_source=AsyncRequest&fb_dtsg=' + core.uf_fb_dtsg;
            Ajax({
                method: 'post',
                headers: Params.Ajax.Headers,
                url: Params.protocol+'//www.facebook.com/friends/ajax/remove_friend.php',
                data: dataToPost,
                onload: function(data){
                    Console.log('Removing connection with uid '+__constructor.uid);
                    isSuccess = false
                    try {
                        if (myJson = eval('('+data.replace('for (;;);', '')+')')) {
                            if (myJson.payload == null) isSuccess = false;
                            else isSuccess = myJson.payload.success;
                        }
                        else core.loadErrorFacebox('Error', this+' Error while removing connection (<a onclick="window.open(this.href); return false;" href="'+this.url+'">remove_friend.php</a>)');
                    }
                    catch (exception) { ; }
                    if (isSuccess) {
                        Console.log('Connection removed with uid '+__constructor.uid);
                        core.keepAwaitingList = new CollectionList(eval(getKey(core.user_id + '_keepAwaitingList', '({})')));
                        core.keepAwaitingList.Remove(__constructor.uid);
                        setKey(core.user_id+'_keepAwaitingList', core.keepAwaitingList.toString());
                        core.awaitingList = core.keepAwaitingList;
                        core.slideRemove($el);
                        
                        core.toNotify = new CollectionList(eval(getKey(core.user_id + '_toNotify', '({})')));
                        core.toNotify.Add(__constructor.uid, 'no');
                        setKey(core.user_id + '_toNotify', core.toNotify.toString());

                        var awaitingList = new CollectionList(eval(getKey(core.user_id + '_keepAwaitingList', '({})')));

                        CSS3.hide(getFromId('loadingIndicatorAwaitings'));
                        CSS3.display(getFromId('bubblelink_awaitings'), 'inline');
                        if (awaitingList.Count() == 0) {
                            if (getFromId('bubblelink_awaitings')) {
                                getFromId('bubblelink_awaitings').innerHTML = 0;
                                CSS3.hide(getFromId('bubblelink_awaitings').parentNode);
                            }
                        }
                        else {
                            if (getFromId('bubblelink_awaitings')) {
                                getFromId('bubblelink_awaitings').innerHTML = awaitingList.Count();
                                CSS3.display(getFromId('bubblelink_awaitings').parentNode, 'inline');
                            }
                        }

                        if ((awaitingList.Count() == 0) && (core.awaitingsIgnored.Count() == 0)) setTimeout(function() { core._showNoAwaitings(); }, 1000);
                        if ((new xPathSelector("//*[@id='pendingContentUL']/li")).numberValues() == 0) CSS3.hide(getFromId('groupPending'));
                    }
                    else {
                        if (getFromId('homeUnfriends')) {
                            if (/selectedItem/.test(getFromId('UFfilterAwaitings').parentNode.className)) {
                                $divContent.innerHTML = d;
                                EventMgr.addListener(getFromId('a_removeLink'+__constructor.uid), 'click', function() { core.removeConnectionWith({uid: __constructor.uid}) });
                            }
                        }
                        core.loadErrorConnectionFacebox();
                    }
                },
                onerror: function(data){
                    if (getFromId('homeUnfriends')) {
                        if (/selectedItem/.test(getFromId('UFfilterAwaitings').parentNode.className)) {
                            $divContent.innerHTML = d;
                            EventMgr.addListener(getFromId('a_removeLink'+$uid), 'click', function() { core.removeConnectionWith({uid: __constructor.uid}) });
                        }
                    }
                    core.loadErrorConnectionFacebox();
                }
            });
        }
    };

    core.updatePermanant = function() {
        core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
        var item, current;
        for (item in core.unfriends.Items) {
            if (core.unfriends.Items.hasOwnProperty(item)) {
                if (current = core.unfriends.Items[item]) {
                    if (core.friends.Items[current.uid]) core.wasUnfriend.Remove[current.uid];
                    else core.wasUnfriend.Add(current.uid, {uid: current.uid, time: current.time});
                }
            }
        }
        item = null;
        current = null;
        for (item in core.awaitingsIgnored.Items) {
            if (core.awaitingsIgnored.Items.hasOwnProperty(item)) {
                if (current = core.awaitingsIgnored.Items[item]) {
                    if (core.friends.Items[current.uid]) core.hasIgnored.Remove(current.uid);
                    else core.hasIgnored.Add(current.uid, {uid: current.uid, time: current.time});
                }
            }
        }
        setKey(core.user_id + '_wasUnfriend', core.wasUnfriend.toString());
        setKey(core.user_id + '_hasIgnored', core.hasIgnored.toString());
    };

    core.becomeFan = function(__constructor) {
        Ajax({
            method: 'post',
            headers: Params.Ajax.Headers,
            url: Params.protocol+'//www.facebook.com/ajax/pages/fan_status.php?__a=1',
            data: '__a=1&add=1&fb_dtsg='+core.uf_fb_dtsg+'&fbpage_id='+__constructor.id+'&post_form_id='+core.uf_post_form_id+'&post_form_id_source=AsyncRequest&preserve_tab=1',
            onload: function(data){
                if (__constructor.reload) core.href(Params.links.page);
            }
        });

    };

    core.updateUsage = function() {
        usage = getKey(core.user_id+'_usage', '0');
        ++ usage;
        setKey(core.user_id+'_usage', usage);
        return usage;
    };

    core.getUsage = function() {
        return parseInt(getKey(core.user_id+'_usage', '0'), 10);
    };

    core.checkCompatibility = function() {
        try {
            delete Params.settings.googlesearch;
        } catch (exception) { ; }
    };

    core.checkFanGroupStatus = function() {
        return;
        Ajax({
            method: 'get',
            headers: Params.Ajax.Headers,
            url: Params.protocol+'//www.facebook.com/ajax/typeahead/search/first_degree.php?viewer='+core.user_id+'&filter[0]=group&filter[1]=page',
            onload: function(data) {
                if (myJson = eval('('+data.replace('for (;;);', '')+')')) {
                    if (myJson.payload.entries.length > 0) {
                        u = core.getUsage(); 

                        for(i=0;i<myJson.payload.entries.length;i++) {
                            //Fanpage
                            if (myJson.payload.entries[i].uid == '173714342679390') Params.isFan = true;
                            //Group
                            if (myJson.payload.entries[i].uid == '98534953863') Params.groupJoined = true;
                        }
                        //quick group fix
                        core.applyFanGroupStatus();
                    }
                }
            },
            onerror: function(data) {

            }
        }); 
    };

    core.applyFanGroupStatus = function() {
        if (Params.isFan) { 
            if (getFromId('becomeFan_title')) {
                getFromId('becomeFan_title').innerHTML = LANG.isFan;
                getFromId('becomeFan_title').href = Params.links.page;
            }
        }
        else {
            if (getFromId('becomeFan_title')) {
                getFromId('becomeFan_title').href = "#";
                EventMgr.addListener(getFromId('becomeFan_title'), 'click', function() { core.becomeFan({id: '173714342679390', reload: true}); });
            }
        }
    };

    core.hideContentArea = function() {
        if (getFromId('contentArea')) CSS3.hide(getFromId('contentArea'));
        else {
            Console.log('setTimeout core.hideContentArea');
            setTimeout(core.hideContentArea, 10);
        }
    };

    core.deferRemoveConnection = function(__constructor) {
        setTimeout(function() { 
            core.removeConnectionWith({uid: __constructor.uid}); 
            if (__constructor.last) {
                CSS3.hide(getFromId('cancelallindicator'));
                CSS3.display(getFromId('cancelall'), 'block');
            }
        }, __constructor.delay)    
    };

    core.bindHide = function() {
        if (getFromId('hideall')) EventMgr.addListener(getFromId('hideall'), 'click', function() {
            CSS3.setClass((new xPathSelector("//*[@id='groupReappeared']/div")).getSingleNodeValue(), 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup'); 
            core.unfriends = new CollectionList();
            setKey(core.user_id + '_unfriends', core.unfriends.toString());
            core.bubble.setValue({value: 0});
            CSS3.hide(getFromId('groupUnfriends'));
            if (core.reappeared.Count() == 0) CSS3.display(getFromId('noUnfriends'), 'block');
            core.updateHeadersPosition();
        });

        if (getFromId('hideallreappeared')) EventMgr.addListener(getFromId('hideallreappeared'), 'click', function() {
            core.reappeared = new CollectionList();
            setKey(core.user_id + '_reappeared', core.reappeared.toString());
            CSS3.hide(getFromId('groupReappeared'));
            if ((core.reappeared.Count() == 0) && (core.unfriends.Count() == 0)) CSS3.display(getFromId('noUnfriends'), 'block');
            core.updateHeadersPosition();
        });

        if (getFromId('helpreappeared')) EventMgr.addListener(getFromId('helpreappeared'), 'click', function() {
            core.dialogs['helpreappearedContextual'] = new ContextualFacebox({
                id: 'helpreappearedContextual',
                title: '<span class="en_US">What is the "reappeared" section ?</span><span class="fr_FR">À quoi correspond la section des amis réapparus?</span>',
                body: '<span class="en_US">This section shows you your friends who have deactivated their profiles, and which have reactivated after. <u>Those friends are still in your friendlist.</u></span>'+
                '<span class="fr_FR">Cette section vous montre qui de vos amis ont réactivé leur profils après l\'avoir désactivé. <u>Ces profils sont toujours dans votre liste d\'amis.</u></span>',
                context: getFromId('helpreappeared'),
                fade:false,
                orientation: 'right',
                buttons:[{
                    name: 'hide_button',
                    value: LANG.btn_close,
                    id: 'hide_button',
                    handler: function() { ; },
                    disabled: false,
                    closer: true,
                    type: 'green'
                }]
            });
            core.dialogs['helpreappearedContextual'].Show();
        });

    };

    core.onReady = function() {
        if (getFromId('event_invite_sidebar_text')) getFromId('event_invite_sidebar_text').parentNode.href = '/?sk=events';
        if (getFromId('group_invite_sidebar_text')) getFromId('group_invite_sidebar_text').parentNode.href = '/?sk=2361831622';
        if (getFromId('friend_connect_sidebar_text')) getFromId('friend_connect_sidebar_text').parentNode.href = '/?sk=ru';
        if (Params.versionChanged) {
            Console.log('New version installed', 'info'); 
        }
        try {
            EventMgr.addListener(getFromId('pageLogo').firstChild, 'click', function() { (new Handler()).hideUnfriendLayer('pageLogo'); });
            EventMgr.addListener(getFromId('pageNav').firstChild.firstChild, 'click', function() { (new Handler()).hideUnfriendLayer('pageNav'); });
        }
        catch (exception) { return false; }
        setKey('uf_writing_test', ''); 
        var test = 'a1b2c3d4e5f6g7h8i9j';
        setKey('uf_writing_test', test);
        if (getKey('uf_writing_test', '0') != test) core.getKeyError = true;
        else core.getKeyError = false;

        Params.ready = true;
        Params.deactivatedInRow = 0;
        EventMgr.addListener(document.body, 'click', function() {
            if (core.dialogs['pagingHelp']) core.dialogs['pagingHelp'].Hide();
            if (core.dialogs['movedSettings']) core.dialogs['movedSettings'].Hide();
        });  
        new xHTMLElement({
            element: 'script',
            innerHTML: ''+
            'var _gaq = _gaq || [];'+
            '_gaq.push([\'_setAccount\', \'UA-25017297-1\']);'+
            '_gaq.push([\'_setDomainName\', \'.facebook.com\']);'+
            '_gaq.push([\'_setCustomVar\', 1, \'uid\', \''+core.user_id+'\']);'+
            '_gaq.push([\'_setCustomVar\', 2, \'scriptLanguage\', \''+LANG+'\']);'+
            '_gaq.push([\'_setCustomVar\', 3, \'hideNub\', \''+Params.settings.hideNub+'\']);'+
            '_gaq.push([\'_setCustomVar\', 4, \'version\', \''+Params.version+'\']);'+
            '_gaq.push([\'_trackPageview\']);'+
            ''+
            '(function() {'+
            '    var ga = document.createElement(\'script\'); ga.type = \'text/javascript\'; ga.async = true;'+
            '    ga.src = (\'https:\' == document.location.protocol ? \'https://ssl\' : \'http://www\') + \'.google-analytics.com/ga.js\';'+
            '    var s = document.getElementsByTagName(\'script\')[0]; s.parentNode.insertBefore(ga, s);'+
            '})();',
            parentNode: document.querySelectorAll("head")[0]
        });
        
    };

    core.loadWelcomeFacebox = function() {
        core.showingWelcome = true;
        var dialogOptions = {
            card1: {
                title: '',
                body: ''+
                '<div class="fr_FR" style="position: relative; text-align: left;">'+
                '   <span style="font-size: 16px;">'+
                '       Félicitations, vous venez d\'installer Unfriend Finder.'+
                '       <br /><br />Ce tutoriel en six étapes va vous guider à travers le fonctionnement basique d\'Unfriend Finder. Il va aussi vous expliquer les détails dans lesquels Unfriend Finder peut vous être bénéfique.'+
                '       <br /><br />Que vous utilisez Facebook régulièrement, ou de temps en temps pour voir les dernières actualités de vos amis, il est certain qu\'Unfriend Finder va devenir un élément clef de vos activités quotidiennes, hebdomadaire ou mensuelles sur Facebook.'+
                '       <br /><br />Cliquez sur Suivant pour continuer.'+
                '   </span>'+
                '</div>'+
                '<div class="en_US" style="position: relative; text-align: left;">'+
                '   <span style="font-size: 16px;">'+
                '       Thank you for installing Unfriend Finder.'+
                '       <br /><br />This six step tutorial will go through the basics of Unfriend Finder and its mechanics. It will also explain in thorough detail the ways in which Unfriend Finder will benefit you.'+
                '       <br /><br />Whether you use Facebook regularly, or just login from time-to-time to check what your friends are up to, we\'re certain Unfriend Finder will become a part of your Facebook daily, weekly or even monthly activities.'+
                '       <br /><br />Click Next to continue.'+
                '   </span>'+
                '</div>'
            },

            card2: {
                title: '',
                body: ''+
                '<div class="en_US" style="position: relative; text-align:justify; font-size:14px;">'+
                '   Now you have installed the script, you\'ll notice within a few days time you may have some unfriends.'+
                '   <br /><br /><strong>Unfriends</strong> are people who were previously your friend but have either deactivated their account or have removed you from their friendlist.'+
                '   <br />Unfriend Finder will tell you which friends have removed you, who has deactivated their accounts, people you have requested friendship with and who has declined your friend request. Unfriend Finder uses Facebook notification to alert you on these events.'+
                '   <br /><br /><span style="font-weight:bold;">Please note:</span> This script can not tell you which profile(s) had you on their friendlist before it was installed. Unfriend Finder is not retroactive.'+
                '   <br /><br />After few help messages, you will be able to configure few important settings, and access them if you wish to do so at a later date.'+
                '   <br /><br />Click Next to continue.'+
                '</div>'+
                '<div class="fr_FR" style="position: relative; text-align:justify; font-size:13px;">'+
                '   Après avoir installé ce script, vous remarquerez surement dans quelques temps que vous aurez des amis en moins, ou <strong>"Unfriends"</strong>.'+
                '   <br /><br />Les <strong>"Unfriends"</strong> sont des personnes qui ont été vos amis, mais qui ont soit désactivé leur compte, soit vous ont supprimé de leur liste d\'amis.'+
                '   <br />Unfriend Finder va donc vous annoncer qui de ces "amis" vous ont supprimé ou ont disparues, ainsi que les personnes avec qui vous avez engagé une demande d\'ami, et qui les a ignorées. Unfriend Finder utilise les notifications de Facebook pour vous alerter de ces événements.'+
                '   <br /><br /><span style="font-weight:bold;">Veuillez noter que:</span> ce script ne peut en aucun cas vous dire quels profils vous ont supprimés avant que vous l\'ayez installé. Unfriend Finder n\'est malheureusement pas rétroactif dans le temps.'+
                '   <br /><br />Après quelques messages d\'explications sur le fonctionnement du script, vous pourrez configurer quelques paramètres importants, et les modifier plus tard si vous en avez besoin.'+
                '</div>'
            },
            card3: {
                title: '<strong class="fr_FR">Aide</strong><strong class="en_US">Help</strong>',
                body: ''+
                '<div class="en_US" style="position: relative; text-align:justify; font-size:14px;">'+
                '   <br />Unfriend Finder makes identifying unfriends easy by displaying a red counter in the menubar with the amount of unfriends you have.'+
                '   <br /><br />You can decide to show only new Unfriends (like notifications) or show the overall number of unfriends in your list.'+
                '   <br /><br />Use this navigation button anytime to be redirected to the list that identifies missing profiles.'+
                '   <br /><br />Unfriend Finder also use Facebook "Beepers" to alert you about Unfriends,<br /><a href="#" id="dummy_alert_en_US">click here to see what it looks like</a>.'+
                '</div>'+
                '<div class="fr_FR" style="position: relative; text-align:justify; font-size:14px;">'+
                '   <br />Unfriend Finder rend l\'identification de vos amis en moins plus facile grace à l\'affichage d\'un lien et d\'un compteur dans la barre de menus avec le nombre d\'amis en moins que vous avez.'+
                '   <br /><br />Vous pouvez décider de n\'afficher que le nombre des nouveaux amis en moins depuis votre dernier passage sur Facebook, ou afficher le nombre global d\'amis en moins dans votre liste.'+
                '   <br /><br />Utilisez ce lien à tout moment pour être redirigé vers les listes qui vous permettront d\'identifier les profils manquants.'+
                '   <br /><br />Unfriend Finder utilise aussi les bulles (ou "Beepers") de Facebook afin de vous avertir des amis en moins,<br /><a href="#" id="dummy_alert_fr_FR">Cliquez ce lien afin de voir à quoi ces "bulles" ressemblent</a>.'+
                '</div>'

            },
            card4: {
                title: '<strong class="fr_FR">Aide</strong><strong class="en_US">Help</strong>',
                body: ''+
                '<div class="en_US" style="position: relative; text-align:justify; font-size:14px;">'+
                '   <img src="http://images.unfriendfinder.net/menuUnfriends.png" style="float: left; margin-right: 10px;" />'+
                '   <div style="width:390px; float:right;">'+
                '       We have implemented a new filter on your Facebook homepage to make accessing Unfriend Finder settings and pending friend requests easier. You can also access Unfriend Finder messages to insure that your Unfriend Finder is always kept up-to-date with the latest news and upgrades.'+
                '       <br /><br />A counter will be displayed next to the individual tabs on and under "Unfriends" (as shown on your left hand side) to alert you of new activity.'+
                '       <br /><br /><br /><br /><br />You will now configure some important settings of the script.'+
                '   </div>'+
                '</div>'+
                '<div class="fr_FR" style="position: relative; text-align:justify; font-size:14px;">'+
                '   <img src="http://images.unfriendfinder.net/menuUnfriends.png" style="float: left; margin-right: 10px;" />'+
                '   <div style="width:390px; float:right;">'+
                '       Un nouveau lien a été ajouté à votre page d\'accueil Facebook afin de rendre facile l\'accès aux requêtes en attente, aux Unfriends, ainsi qu\'aux paramètres du script. Vous pourrez aussi lire les messages importants afin de vous tenir au courant des dernière actualités importantes.'+
                '       <br /><br />Un compteur va être affiché à droite des nouveaux liens créés (comme indiqué sur l\'image de gauche) pour vous alerter de nouvelles activités.'+
                '       <br /><br /><br /><br />Vous allez maintenant paramétrer quelques options importantes du script.'+
                '   </div>'+
                '</div>'

            },
            card5: {
                title: '<strong class="fr_FR">Paramètres</strong><strong class="en_US">Settings</strong>',
                body: ''+
                '<div class="en_US" style="position: relative; text-align:justify; font-size:14px;">'+
                '   You can now change your Unfriend Finder settings below to suit your needs. The settings below are set to default.<br />Simply click Next at the bottom of this window to save the settings as they are.<br />'+
                '</div>'+
                '<div class="fr_FR" style="position: relative; text-align:justify; font-size:14px;">'+
                '   Vous pouvez maintenant paramétrer le script selons vos besoins. Les quelques options ci dessous sont celles par défaut.<br />Pour finir appuyez sur Suivant pour valider ces paramètres.<br />'+
                '</div>'+
                '<div class="editaccount" style="position: relative; text-align:justify; font-size:16px;" id="UFSettings">'+
                '   <br />'+
                '      <table cellspacing="0" style="margin-top:7px; margin-left:30px; width:520px;">' +
                '         <tbody>' +
                '            <tr>' +
                '               <th class="iconPlace">' +
                '                  <strong style="position:relative;" class="en_US">I want to be notified..'+
                '                     <span style="background-position:-801px -66px; ' +
                '                        background-repeat:no-repeat; ' +
                '                        display:block; height:20px; left:-22px; ' +
                '                        position:absolute; top:-1px; width:17px; height:17px !important;' +
                '                        background-image:url(\''+Params.links.rsrc+'/z136G/hash/3ay18ob4.png\');" />' +
                '                  </strong>' +
                '                  <strong style="position:relative;" class="fr_FR">Je veux être notifié..'+
                '                     <span style="background-position:-801px -66px; ' +
                '                        background-repeat:no-repeat; ' +
                '                        display:block; height:20px; left:-22px; ' +
                '                        position:absolute; top:-1px; width:17px; height:17px !important;' +
                '                        background-image:url(\''+Params.links.rsrc+'/z136G/hash/3ay18ob4.png\');" />' +
                '                  </strong>' +
                '               </th>' +
                '               <th class="even_column logo">' +
                '                  <img src="'+Params.images.blank+'" style="background-position:0 -1182px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" alt=""/>' +
                '               </th>' +
                '            </tr>' +
                '            <tr class="settings row">' +
                '               <td class="action_text"><span class="en_US">When a profile is deactivated</span><span class="fr_FR">Quand un profil est désactivé</span></td>' +
                '               <td class="even_column">' +
                '                  <input type="checkbox" value="display_deactivated_profiles_disabled" name="Params.settings.deactivated" id="quickOption1"' + (Params.settings.deactivated == 1 ? ' checked="checked"' : '') + '" class="inputcheckbox "/>' +
                '               </td>' +
                '            </tr>' +
                '            <tr class="settings row">' +
                '               <td class="action_text"><span class="en_US">When someone cancel your friend request</span><span class="fr_FR">Lorsque quelqu\'un ignore votre demande d\'ami</span></td>' +
                '               <td class="even_column">' +
                '                  <input type="checkbox" value="notif_ignoredrequest" name="Params.settings.notifIgnored" id="quickOption2"' + (Params.settings.notifIgnored ? ' checked="checked"' : '') + '" title="'+LANG.oncanceled+'" class="inputcheckbox "/>' +
                '               </td>' +
                '            </tr>' +
                '         </tbody>' +
                '      </table>' +
                '      <table cellspacing="0" style="margin-top: 10px; margin-left: 30px; width: 520px;">' +
                '         <tbody>' +
                '            <tr>' +
                '               <th class="no_border"></th>' + 
                '               <th class="even_column no_border">&nbsp;</th>' +
                '            </tr>' +
                '            <tr>' +
                '               <th class="iconPlace">' +
                '                  <strong style="position:relative;" class="en_US">And I want..' +
                '                     <span style="background-position:-606px -66px; ' +
                '                        background-repeat:no-repeat; ' +
                '                        display:block; height:20px; left:-22px; ' +
                '                        position:absolute; top:-1px; width:16px; height:16px !important;' +
                '                        background-image:url(\''+Params.links.rsrc+'/z136G/hash/3ay18ob4.png\');" />' +
                '                  </strong>' +
                '                  <strong style="position:relative;" class="fr_FR">Et je veux..'+
                '                     <span style="background-position:-606px -66px; ' +
                '                        background-repeat:no-repeat; ' +
                '                        display:block; height:20px; left:-22px; ' +
                '                        position:absolute; top:-1px; width:16px; height:16px !important;' +
                '                        background-image:url(\''+Params.links.rsrc+'/z136G/hash/3ay18ob4.png\');" />' +
                '                  </strong>' +
                '               </th>' +
                '               <th class="even_column logo">' +
                '                  <img src="'+Params.images.blank+'" style="background-position:0 -1182px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" alt=""/>' +
                '               </th>' +
                '            </tr>' +
                '            <tr class="settings row">' +
                '               <td class="action_text"><span class="en_US">To hide the new link in the menubar</span><span class="fr_FR">Masquer le nouveau lien dans la barre de menu</span></td>' +
                '               <td class="even_column">' +
                '                  <input type="checkbox" value="settings_show_unfriend_link" name="Params.settings.hideInMenubar" id="quickOption3"' + (Params.settings.hideInMenubar ? ' checked="checked"' : '') + '" title="'+LANG.hidemenubar+'" class="inputcheckbox "/>' +
                '               </td>' +
                '            </tr>' +
                '            <tr class="settings row">' +
                '               <td class="action_text"><span class="en_US">To show the number of only new Unfriends in the counter</span><span class="fr_FR">Afficher uniquement le nombre de nouveaux Unfriends dans le compteur</span></td>' +
                '               <td class="even_column">' +
                '                  <input type="checkbox" value="settings_onlyShowNewUnfriends" name="Params.settings.onlyShowNewUnfriends" id="quickOption4"' + (Params.settings.onlyShowNewUnfriends ? ' checked="checked"' : '') + '" title="Only show new Unfriends in counters" class="inputcheckbox "/>' +
                '               </td>' +
                '            </tr>' +
                '            <tr class="settings row">' +
                '               <td class="action_text"><span class="en_US">To show the date when Unfriends are discovered by the script</span><span class="fr_FR">Afficher le jour où les Unfriends ont étés découverts par le script</span></td>' +
                '               <td class="even_column">' +
                '                  <input type="checkbox" value="settings_showTime" name="Params.settings.showTime" id="quickOption5"' + (Params.settings.showTime ? ' checked="checked"' : '') + '" title="'+LANG.showTime+'" class="inputcheckbox "/>' +
                '               </td>' +
                '            </tr>' +
                '         </tbody>' +
                '      </table>' +
                '</div>'
            },
            card6: {
                title: '<strong class="fr_FR">C\'est parti !</strong><strong class="en_US">Let\'s go !</strong>',
                body: ''+
                '<div class="en_US" style="position: relative; text-align:justify; font-size:16px;">'+
                '   <br />You\'re done!'+
                '   <br />Unfriend Finder has been set according to your preferences. It may take several hours for you to notice any activity.'+
                '   <br /><br />If you have any comments or questions, please do not hesitate to check our <a onclick="window.open(this.href); return false;" href="'+Params.links.page+'">Fanpage</a> or visit our <a onclick="window.open(this.href); return false;" href="http://www.unfriendfinder.'+(Params.lang == 'fr'?'fr':'com')+'/home">Website</a>. You can now also follow us on <a onclick="window.open(this.href); return false;" href="'+Params.links.twitter+'">Twitter</a>.'+
                '   <br /><br />If you want more, <a href="#" id="startTour">start the Unfriend Finder Tour</a> !'+
                '   <br /><br /><br />Enjoy using Unfriend Finder !'+
                '</div>'+
                '<div class="fr_FR" style="position: relative; text-align:justify; font-size:16px;">'+
                '   <br />Voilà !'+
                '   <br />Unfriend Finder a été configuré selon vos préférences. Quelques heures vont peut-être s\'écouler avant que vous ne puissiez remarquer quelconque activité.'+
                '   <br /><br />Si vous avez des questions ou des commentaires à faire, n\'hésitez pas à rejoindre la <a onclick="window.open(this.href); return false;" href="'+Params.links.page+'">Fanpage</a> ou à visiter le <a onclick="window.open(this.href); return false;" href="http://www.unfriendfinder.'+(Params.lang == 'fr'?'fr':'com')+'/home">site web</a>. Vous pouvez aussi maintenant suivre Unfriend Finder sur <a onclick="window.open(this.href); return false;" href="'+Params.links.twitter+'">Twitter</a>.'+
                '   <br /><br />Merci !'+
                '</div>'

            }
        }; 
        core.dialogs['welcomeFacebox'] = new WelcomeBox({
            id: 'welcomeFacebox',
            title: dialogOptions.card1.title,
            header: true,
            body: new xHTMLElement({
                element: 'div',
                id: 'welcomeFaceboxBody',
                innerHTML: ''
            }).getElement(),            
            card1: new xHTMLElement({
                element: 'div',
                title: dialogOptions.card1.title,
                id: 'welcomeFaceboxCard1',
                innerHTML: dialogOptions.card1.body
            }).getElement(),
            card2: new xHTMLElement({
                element: 'div',
                title: '',
                id: 'welcomeFaceboxCard2',
                innerHTML: dialogOptions.card2.body
            }).getElement(),
            card3: new xHTMLElement({
                element: 'div',
                title: '',
                id: 'welcomeFaceboxCard3',
                innerHTML: dialogOptions.card3.body
            }).getElement(),
            card4: new xHTMLElement({
                element: 'div',
                title: '',
                id: 'welcomeFaceboxCard4',
                innerHTML: dialogOptions.card4.body
            }).getElement(),
            card5: new xHTMLElement({
                element: 'div',
                title: '',
                id: 'welcomeFaceboxCard5',
                innerHTML: dialogOptions.card5.body
            }).getElement(),
            card6: new xHTMLElement({
                element: 'div',
                title: '',
                id: 'welcomeFaceboxCard6',
                innerHTML: dialogOptions.card6.body
            }).getElement(),
            fade: false, 
            buttons: [{
                name: 'next_button',
                value: LANG.btn_next,
                id: 'next_button',
                handler: function() {
                    var canSlide = false;
                    var l = getFromId('uf_cards').style.left.replace('px', '');
                    if (l == 0) canSlide = true; 
                    else if (l == '-600') canSlide = true;
                    else if (l == '-1200') canSlide = true;
                    else if (l == '-1800') canSlide = true;
                    else if (l == '-2400') canSlide = true;
                    else if (l == '-3000') canSlide = true;
                    else if (l == '-3600') canSlide = true;
                    else canSlide = false; 
                    if (canSlide) core.dialogs['welcomeFacebox'].slideCard();
                },
                disabled: false,
                closer: false,
                type: 'green'
            },{
                name: 'close_button',
                value: LANG.btn_close,
                id: 'close_button',
                handler: function() {
                    getFromId('content').style.marginTop = '0px';
                    getFromId('fb_menu_unfriends').parentNode.removeChild(getFromId('fb_menu_unfriends'));
                    core.bubble.createMenubarLink(); 
                    CSS3.hide(getFromId('generic_dialog_overlay'));
                    core.showingWelcome = false;
                    core.checkForUpdate(false);
                },
                disabled: false,
                closer: true,
                type: 'blue'
            }]
        });
        core.dialogs['welcomeFacebox'].Show();

    };

    core.loadContextFilter = function() {
        if (getFromId('filter_unfriends')) {
            if (core.fb_locale == 'fr_FR') var dialogOptions = {body: template.Contextual_filter()};
            else var dialogOptions = {body: template.Contextual_filter()}; 
            core.dialogs['filterContextual'] = new CalloutDialog({
                id: 'filterContextual',
                title: template.help(),
                body: dialogOptions.body,
                context: getFromId('filter_unfriends'),
                orientation: 'left',
                image: Params.images.fanImageSmall,
                buttons:[{
                    name: 'hide_button',
                    value: LANG.text_hide,
                    id: 'hide_button',
                    handler: function() {
                        helps.filter = true;
                        setKey(core.user_id+'_helps', stringify(helps)) 
                    },
                    disabled: false,
                    closer: true,
                    type: 'green'
                }]
            });
            core.dialogs['filterContextual'].Show();
        }
    };

    core.loadContextAwaitings = function() {
        if (getFromId('awaitingsLink')) {
            if (getFromId('awaitingsLink').innerHTML == LANG.help) { $context = getFromId('UFfilterTextAwaitings'); $o = 'right'; }
            else { $context = getFromId('awaitingsLink'); $o = 'left'; }

            if (core.fb_locale == 'fr_FR') var dialogOptions = {body: template.Contextual_awaitings_fr_FR()};
            else var dialogOptions = {body: template.Contextual_awaitings_en_US()}; 
            core.dialogs['awaitingsContextual'] = new ContextualFacebox({
                id: 'awaitingsContextual',
                title: '<i class="uiButtonIcon img spritemap_icons_fix " style="background-position: 0pt -1325px; height: 16px; width: 15px ! important;"></i> '+LANG.help+': '+LANG.awaiting,
                body: dialogOptions.body,
                context: $context,
                fade: false,
                orientation: $o,
                buttons:[{
                    name: 'hide_button',
                    value: LANG.text_hide,
                    id: 'hide_button',
                    handler: function() {
                        helps.awaitings = true;
                        setKey(core.user_id+'_helps', stringify(helps)) 
                    },
                    disabled: false,
                    closer: true,
                    type: 'green'
                }]
            });
            core.dialogs['awaitingsContextual'].Show(); 
        }
    };

    core.loadErrorConnectionFacebox = function($text) {
        core.dialogs['connectionErrorFacebox'] = new Facebox({
            id: 'connectionErrorFacebox',
            error: true,
            title: LANG.error,
            body: new xHTMLElement({
                element: 'div',
                id: 'connectionErrorFaceboxBody',
                innerHTML: ($text?$text:LANG.text_error)
            }).getElement(),
            loading: true, 
            timeout: 500,
            buttons: [{
                name: 'close_button',
                value: LANG.btn_close,
                id: 'close_button',
                handler: function() { void(0); },
                disabled: false,
                closer: true,
                type: 'gray'
            }]
        });
        core.dialogs['connectionErrorFacebox'].Show();
    };

    core.loadErrorFacebox = function($title, $text) {
        core.dialogs['errorFacebox'] = new Facebox({
            id: 'errorFacebox',
            error: true,
            title: $title,
            body: new xHTMLElement({
                element: 'div',
                id: 'errorFaceboxBody',
                innerHTML: $text
            }).getElement(),
            buttons: [{
                name: 'close_button',
                value: LANG.btn_close,
                id: 'close_button',
                handler: function() { void(0); },
                disabled: false,
                closer: true,
                type: 'gray'
            }]
        });
        core.dialogs['errorFacebox'].Show();
    };

    core.loadCopyFacebox = function($title, $text) {
        core.dialogs['copyFacebox'] = new Facebox({
            id: 'copyFacebox',
            error: true,
            title: $title,
            body: new xHTMLElement({
                element: 'div',
                id: 'copyFaceboxBody',
                innerHTML: $text
            }).getElement(),
            buttons: []
        });
        core.dialogs['copyFacebox'].Show();
    };

    core.emergencyReset = function() {


        if (Params.dev) setMenuCommand('devTest', 'Dev test', function() {
            alert('Testing notifications')
            core.notify({
                id: '007',
                text: 'James Bond',
                type: 'reappeared',
                status: null,
                beeper: true
            });
            core.notify({
                id: '008',
                text: 'Cameron Diaz',
                type: 'unfriend',
                status: 'deactivated',
                beeper: false
            });
            alert('Checking for Update');
            core.checkForUpdate(true);
            alert('Testing Extend()');
            var a = {
                property1: 'value1'
            };
            var c = {
                object1: {
                    count: 1,
                    bool: true,
                    object: {
                        one: 1,
                        two: 2,
                        three: 3
                    }
                },
                func: (function() {
                    alert('blabla');
                }),
                array: [{
                    oui: true
                },{
                    non: false
                }],
                elements:{
                    content:[document.getElementById('content')],
                    body: document.body,
                    title: document.title
                },
                date: (new Date())
            };
            alert(uneval(Extend(a,c)));
        });
    };

    core.validateUrls = function() {
        if (/\?sk=(ufs?|aw)#?$/.test(core.href())) { 
            core.hideContentArea(); 
            setTimeout(function() { 
                if (/\?sk=ufs#?$/.test(core.href())) (new Handler()).clickHeaderToShowSettings();
                else if (/\?sk=uf#?$/.test(core.href())) new Handler('filter');
                else if (/\?sk=aw#?$/.test(core.href())) (new Handler('filter')).clickHeaderToShowAwaitings();
            }, 200);
        } 
    };
    
    core.genTime = function($time) {
        if (!Params.settings.showTime) return '';
        m = LANG.months;
        monthes = m.split(',');

        $now = core.time();
        now = new Date($now *1000); 
        if (!$time) return '';

        var timeUnfriend = new Date($time *1000);
        m = timeUnfriend.getMonth();
        d = timeUnfriend.getDate();
        h = timeUnfriend.getHours();
        mm = timeUnfriend.getMinutes();
        if (mm < 10) mm = '0'+mm;
        a = '';
        if (LANG != 'fr_FR') {
            a = (h < 12 ? 'am':'pm');
            h = (h % 12) || 12;
        }
        $diff = parseInt(Math.round(($now - $time)), 10);

        if (($diff >= 0) && ($diff <= 86400)) {
            if (d == now.getDate()) return LANG.today+", "+h+":"+mm+a;
            else return LANG.yesterday+", "+h+":"+mm+a;
        }
        if (LANG == 'fr_FR') return d+" "+monthes[m]+", "+h+":"+mm+a; 
        else return monthes[m]+" "+d+", "+h+":"+mm+a; 
    };

    core.bindRemove = function() {
        if (!Params.settings.hideOwnUnfriends) return;
        if (!getFromId('profile_action_remove_friend')) return;
        if (getFromId('bindRemove')) return;
        new xHTMLElement({
            element: 'span',
            id: 'bindRemove',
            className: getFromId("profile_action_remove_friend").firstChild.href.match(/=([0-9]+)$/)[1],
            parentNode: getFromId('profile_action_remove_friend').firstChild
        }).getElement();
        EventMgr.addListener(getFromId('profile_action_remove_friend').firstChild, 'click', function() { core.watchRemoveBox(); });
    };

    core.watchRemoveBox = function() {
        var textContainer, button;
        if (textContainer = (new xPathSelector(".//div[contains(concat(' ', @class, ' '), ' pop_content ')]//div[contains(concat(' ', @class, ' '), ' UIImageBlock_MED_Content ')]")).getSingleNodeValue()) {
            if (button = document.getElementsByName('remove-friend')[0]) {
                button.style.outline = 'none';
                CSS3.addClass(button.parentNode, 'uiButtonSpecial');
                CSS3.removeClass(button.parentNode, 'uiButtonConfirm');
                EventMgr.addListener(button, 'click', function() {
                    if (getFromId('bindRemove').className) {
                        core.watchRemove = getFromId('bindRemove').className;
                        setKey(core.user_id+'_watchRemove', core.watchRemove);
                        core.toNotify = new CollectionList(eval(getKey(core.user_id + '_toNotify', '({})')));
                        core.toNotify.Add(core.watchRemove, 'no');
                        setKey(core.user_id + '_toNotify', core.toNotify.toString());
                    }
                });
            }
            textContainer.innerHTML = textContainer.innerHTML+LANG.wontAppear;
        }
        else {
            Console.log('setTimeout core.watchRemoveBox');
            setTimeout(core.watchRemoveBox, 50);
        }
    };

    core.bindRemoveFilters = function() {
        if (!Params.settings.hideOwnUnfriends) return;
        var RemoveLinks, bindRemoveFilters, RemoveLink;
        if (!getFromId('editFriendsSearchList')) return;
        if (getFromId('bindRemoveFilters')) return;
        bindRemoveFilters = new xHTMLElement({
            element: 'span',
            id: 'bindRemoveFilters',
            parentNode: getFromId('editFriendsSearchList')
        }).getElement();
        RemoveLinks = (new xPathSelector(".//ul[@id='editFriendsSearchList']//a[contains(@href, 'remove_friend_dialog.php')]")).getMultipleNodeValues();
        while (RemoveLink = RemoveLinks.iterateNext()) {
            if (RemoveLink) core.appendFiltersListener(RemoveLink);
        }
    };

    core.appendFiltersListener = function($obj) {
        EventMgr.addListener($obj, 'click', function() { core.watchRemoveBoxFilters($obj); })
    };

    core.watchRemoveBoxFilters = function($object) {
        var id, n, button, textContainer, href;
        if (getFromId('pop_content')) {
            button = (new xPathSelector(".//div[@id='pop_content']//input[contains(@name, 'confirm')]")).getSingleNodeValue();
            textContainer = (new xPathSelector(".//div[contains(concat(' ', @class, ' '), ' pop_content ')]//div[contains(concat(' ', @class, ' '), ' dialog_body ')]/div/div")).getSingleNodeValue();
            id = $object.href.match(/id=([0-9]+)$/)[1];
            if ((id) && (button) && (core.friends.Items[id]) && (textContainer)) {
                button.style.outline = 'none';
                CSS3.addClass(button.parentNode, 'uiButtonSpecial');
                CSS3.removeClass(button.parentNode, 'uiButtonConfirm');
                if (id) EventMgr.addListener(button, 'click', function() {
                    core.watchRemove = id;
                    setKey(core.user_id+'_watchRemove', core.watchRemove);
                });
                textContainer.innerHTML = textContainer.innerHTML + '<br /><br />'+LANG.wontAppear; 
            }
        }
        else {
            Console.log('setTimeout core.watchRemoveBoxFilters');
            setTimeout(function() { core.watchRemoveBoxFilters($object); }, 1000);
        }
    };

    core.bindKeys = function() {
        if (!getFromId('bindKeys')) {
            var binder = new xHTMLElement({
                element: 'div',
                id: 'bindKeys',
                parentNode: document.body
            }).getElement();
        }
        else var binder = getFromId('bindKeys');
        EventMgr.addListener(binder, 'DOMNodeInserted', function(e){
            var innerDOM = getFromId('bindKeys').firstChild.innerHTML;
            getFromId('bindKeys').removeChild(getFromId('bindKeys').firstChild);
            if (innerDOM == 'ESC') {
                if (document.getElementsByClassName('uf_dialog').length > 0) {
                    try {
                        var id = document.getElementsByClassName('uf_dialog')[0].id.replace(/((contextual_)?dialog_)/, ''), dialog = core.dialogs[id];
                        if (dialog.id == 'welcomeFacebox') return;
                        dialog.Hide();
                    }
                    catch (exception) { return; }
                } 
            }
            else {
                document.body.className = document.body.className.replace(/\s(shifted|nonshift|ctrlShifted)/g, '')+' '+innerDOM;
            }
        });
        inject((Params.env.isOpera?'document.body':'parent')+".onkeydown = function(e) {"+
        "    if (e.keyCode == 27) {"+
        "        var s = document.createElement('span');"+
        "        s.innerHTML = 'ESC';"+
        "        document.getElementById('bindKeys').appendChild(s);"+
        "    }"+
        "    else if ((e.keyCode == 16) || (e.keyCode == 17)) {"+
        "        var s = document.createElement('span');"+
        "        if (e.keyCode == 16) window.keyShift = true;"+
        "        if (e.keyCode == 17) window.keyCtrl = true;"+
        "        s.innerHTML = (window.keyShift?(window.keyCtrl?'ctrlShifted':'shifted'):'nonshift');"+
        "        document.getElementById('bindKeys').appendChild(s);"+
        "    }"+
        "};"+
        ""+
        (Params.env.isOpera?'document.body':'parent')+".onkeyup = function(e) {"+
        "    if ((e.keyCode == 16) || (e.keyCode == 17)) {"+
        "        var s = document.createElement('span');"+
        "        if (e.keyCode == 16) window.keyShift = false;"+
        "        if (e.keyCode == 17) window.keyCtrl = false;"+
        "        s.innerHTML = (window.keyShift?(window.keyCtrl?'ctrlShifted':'shifted'):'nonshift');"+
        "        document.getElementById('bindKeys').appendChild(s);"+
        "    }"+ 
        "};"+
        ""+
        "window.parent.onblur = function() {"+
        "    window.keyShift = window.keyCtrl = false;"+
        "    var s = document.createElement('span');"+
        "    s.innerHTML = (window.keyShift?(window.keyCtrl?'ctrlShifted':'shifted'):'nonshift');"+
        "    document.getElementById('bindKeys').appendChild(s);"+ 
        "};");

        CSS3.addClass(document.body, 'nonshift');
    };

    core.initBeeper = function() {
        if (!getFromId('fbDockChat')) setTimeout(core.initBeeper, 500);
        else core.Beeper = new Beeper();
    };

    core.getMessages = function() {
        if (core.messagesReceived) return;
        core.messagesReceived = true;
        if (!core.messagesHTML) core.messagesHTML = getKey(core.user_id + '_messages');
        setTimeout(function() { core.parseMessages(core.messagesHTML); }, 500); 
    };

    core.parseMessages = function(html) {
        if (html) {
            var html = html.replace(/(\r|\n)/g, '');
            try {
                void eval(html);
                void eval(getKey(core.user_id + '_messages'));
            }
            catch (ex) { return; }
            var ajaxMessages = eval(html), storedMessages = eval(getKey(core.user_id + '_messages')) || ({}), unreadMessages = 0, messages = 0, message;
            for (message in ajaxMessages) {
                if (ajaxMessages.hasOwnProperty(message)) {
                    message = ajaxMessages[message];
                    if (!storedMessages[message.id]) {
                        message.unread = true;
                        storedMessages[message.id] = message  
                    }
                    else {
                        if (!storedMessages[message.id].deleted) {
                            storedMessages[message.id].title = message.title; 
                            storedMessages[message.id].preview = message.preview; 
                            storedMessages[message.id].content = message.content; 
                        }
                    }
                }
            }
            message = null;
            for (message in storedMessages) {
                if (storedMessages.hasOwnProperty(message)) {
                    if (!storedMessages[message].deleted) {
                        if (storedMessages[message].unread) unreadMessages++;
                        messages++;
                    }
                }
            }
            if (getFromId('bubblelink_messages')) {
                getFromId('bubblelink_messages').innerHTML = (!unreadMessages?'0':unreadMessages);
                if (!unreadMessages) CSS3.hide(getFromId('bubblelink_messages').parentNode);
                else CSS3.display(getFromId('bubblelink_messages').parentNode, 'inline');
            }
            if (unreadMessages) core.Beeper.Add({
                type: 'messages',
                text: Params._0x4d22+'<br /><a href="#" onclick="return false;" id="UFMessagesBeeperLink">'+unreadMessages+' new message'+(unreadMessages > 1?'s':'')+'</a>',
                id: 'messages',
                status: null
            });
            core.unreadMessages = unreadMessages;
            core.messages = messages;

            setKey(core.user_id + '_messages', stringify(storedMessages));
            CSS3.hide(getFromId('loadingIndicatorMessages'));
        }
    };

    core.showMessages = function() {
        var temp = new Array(), tempmessages; 
        var storedMessages = eval(getKey(core.user_id + '_messages')) || ({});
        var UFMessages_list = getFromId('UFMessages_list');
        var UFMessages_content = getFromId('UFMessages_content');
        var messages = 0;
        var message;
        for (message in storedMessages) {
            if (storedMessages.hasOwnProperty(message)) { 
                if (!storedMessages[message].deleted) {
                    messages++;
                }
            }
        }
        if (messages > 0) UFMessages_list.innerHTML = '';
        else UFMessages_list.innerHTML = template.noMessages();

        getFromId('title_header').innerHTML = LANG.messages;
        CSS3.hide(UFMessages_content);
        CSS3.display(UFMessages_list, 'block');

        message = null;
        for (message in storedMessages) {
            if (storedMessages.hasOwnProperty(message)) {
                message = storedMessages[message];
                if (!message.deleted) {
                    temp.push(message);
                }
            }
        }
        tempmessages = temp.reverse();
        var i;
        for (i = 0;i<tempmessages.length;i++) {
            var message = tempmessages[i];
            new xHTMLElement({
                element: 'div',
                className: 'UFMessage_block',
                style: {
                    height: '57px'
                },
                innerHTML: template.messagePreview(message.id, Params._0x4d22, Params.protocol+'//www.facebook.com/pages/Unfriend-Finder/173714342679390', Params.images.fanImageSmall, message.title, message.preview, message.date, message.unread),
                parentNode: UFMessages_list
            });
            core.markAsReadMessage({
                area: (new xPathSelector("//table[@id='ufMessage_"+message.id+"']//a[@class='badge']")).getSingleNodeValue(),
                id: message.id,
                element: getFromId('ufMessage_'+message.id)
            });
            core.markAsRemovedMessage({
                area: (new xPathSelector("//table[@id='ufMessage_"+message.id+"']//a[@bindpoint='deleteButton']")).getSingleNodeValue(),
                id: message.id,
                element: getFromId('ufMessage_'+message.id).parentNode.parentNode.parentNode
            });
            core.readMessageOnClick({
                area: (new xPathSelector("//table[@id='ufMessage_"+message.id+"']//td[@bindpoint='readMessage'][1]")).getSingleNodeValue(),
                id: message.id
            });
            core.readMessageOnClick({
                area: (new xPathSelector("//table[@id='ufMessage_"+message.id+"']//td[@bindpoint='readMessage'][2]")).getSingleNodeValue(),
                id: message.id
            });
            core.readMessageOnClick({
                area: (new xPathSelector("//table[@id='ufMessage_"+message.id+"']//a[@bindpoint='readMessage'][1]")).getSingleNodeValue(),
                id: message.id
            });
        }
    };

    core.readMessageOnClick = function(__constructor) {
        EventMgr.addListener(__constructor.area, 'click', function() {
            try {
                void eval(getKey(core.user_id + '_messages'));
            }
            catch (ex) { return; }

            var storedMessages = eval(getKey(core.user_id + '_messages')) || ({});
            if (storedMessages[__constructor.id]) {
                core.showMessage(__constructor.id);
                storedMessages[__constructor.id].unread = false;
                setKey(core.user_id + '_messages', stringify(storedMessages));
                var unreadMessages = 0;
                var message;
                for (message in storedMessages) {
                    if (storedMessages.hasOwnProperty(message)) {
                        if (!storedMessages[message].deleted) {
                            if (storedMessages[message].unread) unreadMessages++;
                        }
                    }
                }
                if (getFromId('bubblelink_messages')) {
                    getFromId('bubblelink_messages').innerHTML = (!unreadMessages?'0':unreadMessages);
                    if (!unreadMessages) CSS3.hide(getFromId('bubblelink_messages').parentNode);
                    else CSS3.display(getFromId('bubblelink_messages').parentNode, 'inline');
                }
            }

        })
    };

    //core.markAsReadMessage = function($badge, _id, $el) {
    core.markAsReadMessage = function(__constructor) {
        EventMgr.addListener(__constructor.area, 'click', function() {
            try {
                void eval(getKey(core.user_id + '_messages'));
            }
            catch (ex) { return; }
            try {
                var c = __constructor.element.className;
                var storedMessages = eval(getKey(core.user_id + '_messages')) || ({});
                if (/unread/.test(c)) {
                    if (storedMessages[__constructor.id]) {
                        storedMessages[__constructor.id].unread = false;
                        setKey(core.user_id + '_messages', stringify(storedMessages));
                    }
                    CSS3.removeClass(__constructor.element, 'unread');
                }
                else {
                    if (storedMessages[__constructor.id]) {
                        storedMessages[__constructor.id].unread = true;
                        setKey(core.user_id + '_messages', stringify(storedMessages));
                    }
                    CSS3.addClass(__constructor.element, 'unread');
                }
            }
            catch (ex) { ; }
            var unreadMessages = 0;
            var message;
            for (message in storedMessages) {
                if (storedMessages.hasOwnProperty(message)) {
                    if (!storedMessages[message].deleted) {
                        if (storedMessages[message].unread) unreadMessages++;
                    }
                }
            }
            if (getFromId('bubblelink_messages')) {
                getFromId('bubblelink_messages').innerHTML = (!unreadMessages?'0':unreadMessages);
                if (!unreadMessages) CSS3.hide(getFromId('bubblelink_messages').parentNode);
                else CSS3.display(getFromId('bubblelink_messages').parentNode, 'inline');
            }
        });
    };

    core.markAsRemovedMessage = function(__constructor) {
        EventMgr.addListener(__constructor.area, 'click', function() {
            try {
                void eval(getKey(core.user_id + '_messages'));
            }
            catch (ex) { return; }

            var storedMessages = eval(getKey(core.user_id + '_messages')) || ({});
            if (storedMessages[__constructor.id]) {
                storedMessages[__constructor.id].deleted = true;
                setKey(core.user_id + '_messages', stringify(storedMessages));
            }
            core.slideToRemove(__constructor.element);
        });
    };

    core.showMessage = function(_id) {
        var storedMessages = eval(getKey(core.user_id + '_messages')) || ({}), unreadMessages = 0;
        var UFMessages_list = getFromId('UFMessages_list');
        var UFMessages_content = getFromId('UFMessages_content');
        if (!storedMessages[_id]) return;
        CSS3.hide(UFMessages_list);
        CSS3.display(UFMessages_content, 'block');
        if (message = storedMessages[_id]) {
            UFMessages_content.innerHTML = '';
            new xHTMLElement({
                element: 'div',
                innerHTML: template.messageContent(message.id, Params._0x4d22, 'http://www.unfriendfinder.com', Params.images.fanImageSmall, message.title, message.content, message.date),
                parentNode: UFMessages_content
            });
            getFromId('title_header').innerHTML = message.title;
        }
        else {
            CSS3.hide(UFMessages_content);
            CSS3.display(UFMessages_list, 'block');
        }

    };

    core.validateStorage = function() {
        core.errors = new Array(); 
        try { void eval(getKey(core.user_id + '_unfriends')); } catch (exception) { core.errorStorage(core.user_id + '_unfriends', '({})'); }
        try { void eval(getKey(core.user_id + '_friends')); } catch (exception) { core.errorStorage(core.user_id + '_friends', '({})'); }
        try { void eval(getKey(core.user_id + '_toNotify')); } catch (exception) { core.errorStorage(core.user_id + '_toNotify', '({})'); }
        try { void eval(getKey(core.user_id + '_unfriendsInfos')); } catch (exception) { core.errorStorage(core.user_id + '_unfriendsInfos', '({})'); }
        try { void eval(getKey(core.user_id + '_awaitingsIgnored')); } catch (exception) { core.errorStorage(core.user_id + '_awaitingsIgnored', '({})'); }
        try { void eval(getKey(core.user_id + '_keepAwaitingList')); } catch (exception) { core.errorStorage(core.user_id + '_keepAwaitingList', '({})'); }
        try { void eval(getKey(core.user_id + '_keepAwaitingsTime')); } catch (exception) { core.errorStorage(core.user_id + '_keepAwaitingsTime', '({})'); }
        try { void eval(getKey(core.user_id + '_reappeared')); } catch (exception) { core.errorStorage(core.user_id + '_reappeared', '({})'); }
        try { void eval(getKey(core.user_id + '_deactivated')); } catch (exception) { core.errorStorage(core.user_id + '_deactivated', '({})'); }
        try { void eval(getKey(core.user_id + '_wasUnfriend')); } catch (exception) { core.errorStorage(core.user_id + '_wasUnfriend', '({})'); }
        try { void eval(getKey(core.user_id + '_hasIgnored')); } catch (exception) { core.errorStorage(core.user_id + '_hasIgnored', '({})'); }
        try { void eval(getKey(core.user_id + '_countUnfriends')); } catch (exception) { core.errorStorage(core.user_id + '_countUnfriends', '({})'); }
        try { void eval(getKey(core.user_id + '_alwaysHide')); } catch (exception) { core.errorStorage(core.user_id + '_alwaysHide', '({})'); }
        try { void eval(getKey(core.user_id + '_messages')); } catch (exception) { core.errorStorage(core.user_id + '_messages', '({})'); }
        try { void eval(getKey(core.user_id + '_helps')); } catch (exception) { core.errorStorage(core.user_id + '_helps', stringify(Params.defaultHelps)); }
        try { void eval(getKey(core.user_id + '_watchRemove')); } catch (exception) { core.errorStorage(core.user_id + '_watchRemove', '({})'); }
        try { void getKey('_usage'); } catch (exception) { core.errorStorage('_usage', '0'); }
        try { void getKey('settings'); } catch (exception) { core.errorStorage('settings', stringify(Params.defaultSettings)); }
        try { void getKey('language'); } catch (exception) { core.errorStorage('language', 'en_US'); }
        try { void getKey('google'); } catch (exception) { core.errorStorage('google', '[1]'); }
        try { void getKey('coreStarted'); } catch (exception) { core.errorStorage('coreStarted', '1'); }
        if (typeof eval(getKey(core.user_id + '_toNotify')) != 'object') setKey(core.user_id + '_toNotify', '({})');
        core.errorStorage('end');
    };

    core.errorStorage = function($item, $default) {
        if ($item == 'end') {
            if (core.errors.length > 0) {
                var err = 'Validation error:\n\nErrors detected on stored values: '+core.errors.join(', ')+'\nValues erased, continuing.';
                Console.error(err);
                alert(err);
                core.errors = new Array();
            }
        }
        else {
            core.errors.push($item);
            setKey($item, $default);
        }
    };

    core.checkOldVersion = function() {
        var scripts = document.getElementsByTagName('script');
        var i;
        for (i = 1;i<scripts.length;i++) {
            if (scripts[i].src === 'http://userscripts.org/scripts/source/58852.user.js') var oldVersion = true;
        }
        if (oldVersion) {
            Params.version = 14;
            var d = new xHTMLElement({
                element: 'div',
                innerHTML: ''+
                '<div class="includedWarning">'+
                '   <div class="boxError">'+
                '       You are using an outdated extension of Unfriend Finder.'+
                '       <br />This version 14 needs to be uninstalled before using the latest version '+
                '       <br /><br />Please <a href="http://www.unfriendfinder.com/help/uninstallation/chrome" onclick="window.open(this.href); return false;">uninstall</a> it from your extensions and re-install the lastest extension from the official site,<br />on <a href="http://www.unfriendfinder.com/download">http://www.unfriendfinder.com/download</a>.'+
                '       <br />Otherwise, this message will appear again.'+
                '   </div>'+
                '</div>'
            }).getElement();
            console.error('You are using an outdated extension of Unfriend Finder.');
            if (getFromId('content')) getFromId('content').insertBefore(d, getFromId('mainContainer'));
            if (getFromId('leftCol')) getFromId('leftCol').style.marginTop = '-140px';

            return false;
        }
    };

    core.initTour = function() {
        if (getKey(core.user_id+'_takeTour', '0') == '1') {
            core.tour = new UFTour({
                steps: {
                    count: 2,
                    elements: [{
                        id: 1,
                        selected: true,
                        name: 'Menubar',
                        handler: function() {
                            (new Handler()).hideUnfriendLayer('tour1');
                            CSS3.addClass(getCoreFilter(), 'selectedItem');
                            core.focus.focusOn(getFromId('fb_menu_unfriends'));

                            if (core.dialogs['tourForNavigation']) core.dialogs['tourForNavigation'].Hide();
                            if (core.dialogs['tourForFilter']) core.dialogs['tourForFilter'].Hide();
                            if (core.dialogs['tourForAwaitings']) core.dialogs['tourForAwaitings'].Hide();
                            if (core.dialogs['tourForSettings']) core.dialogs['tourForSettings'].Hide();
                            if (core.dialogs['tourForMenubar']) return;
                            Strings.tourForMenubar = 'This new link will help you to access your Unfriends list wherever you are.'+
                            '\nA red counter shows you the amount of new or total unfriends you currently have.'+
                            '\nYou can change settings such as the ability to hide or show this navigation button.'
                            core.dialogs['tourForMenubar'] = new TourBox({
                                id: 'tourForMenubar',
                                title: 'Menubar link',
                                body: nl2br(Strings.tourForMenubar),
                                fixed: true,
                                context: getFromId('fb_menu_unfriends'),
                                arrow: 'top-right',
                                margin: 0,
                                shift: 0,
                                align: 'middle',
                                next: function() {
                                    core.tour.showStep(2);   
                                }
                            });
                            core.dialogs['tourForMenubar'].Show();
                        }
                    },{
                        id: 2,
                        name: 'Filter',
                        handler: function() {
                            (new Handler()).hideUnfriendLayer('tour2'); 
                            CSS3.setClass(getFromId('navItem_unfriends'), 'sideNavItem open opened');

                            core.focus.focusOn(getFromId('navItem_unfriends'));
                            
                            if (core.dialogs['tourForNavigation']) core.dialogs['tourForNavigation'].Hide();
                            if (core.dialogs['tourForMenubar']) core.dialogs['tourForMenubar'].Hide();
                            if (core.dialogs['tourForAwaitings']) core.dialogs['tourForAwaitings'].Hide();
                            if (core.dialogs['tourForSettings']) core.dialogs['tourForSettings'].Hide();
                            if (core.dialogs['tourForFilter']) return;

                              core.dialogs['tourForFilter'] = new TourBox({
                                id: 'tourForFilter',
                                title: '<span class="fr_FR">Nouveau Filtres</span><span class="en_US">New Filters</span>',
                                body: template.Contextual_filter(),
                                context: getFromId('navItem_unfriends'),
                                arrow: 'left',
                                align: 'middle',
                                next: function() {
                                    core.tour.showStep(3);   
                                }
                            });
                            core.dialogs['tourForFilter'].Show();
                        }
                    },{
                        id: 3,
                        name: 'Navigation',
                        handler: function() {
                            CSS3.setClass(getFromId('navItem_unfriends'), 'sideNavItem open opened');
                            new Handler('filter');
                            core.focus.focusOn(getFromId('contentUnfriends'));
                            
                            if (core.dialogs['tourForMenubar']) core.dialogs['tourForMenubar'].Hide();
                            if (core.dialogs['tourForFilter']) core.dialogs['tourForFilter'].Hide();
                            if (core.dialogs['tourForAwaitings']) core.dialogs['tourForAwaitings'].Hide();
                            if (core.dialogs['tourForSettings']) core.dialogs['tourForSettings'].Hide();
                            if (core.dialogs['tourForNavigation']) return;
                            Strings.tourForNavigation = 'Here is the place where you will be able to see your Unfriends.'+
                            '\nThey will be displayed as soon as they are detected by the script.'+
                            '\nUnfriends will be sorted by date of detection, displayed under each names.'
                            core.dialogs['tourForNavigation'] = new TourBox({
                                id: 'tourForNavigation',
                                title: '<span class="fr_FR">Liste des Unfriends</span>'+
                                '<span class="en_US">Unfriends List</span>',
                                body: nl2br(Strings.tourForNavigation),
                                context: getFromId('bindHeader'),
                                arrow: 'top-left',
                                margin: 10,
                                align: 'middle',
                                next: function() {
                                    core.tour.showStep(4);   
                                }
                            });
                            core.dialogs['tourForNavigation'].Show();
                        }
                    },{
                        id: 4,
                        name: 'Awaiting Requests',
                        handler: function() {
                            (new Handler()).clickHeaderToShowAwaitings();
                            CSS3.setClass(getFromId('navItem_unfriends'), 'sideNavItem open opened');
                            core.focus.focusOn(getFromId('contentUnfriends'));    
                            
                            if (core.dialogs['tourForMenubar']) core.dialogs['tourForMenubar'].Hide();
                            if (core.dialogs['tourForFilter']) core.dialogs['tourForFilter'].Hide();
                            if (core.dialogs['tourForNavigation']) core.dialogs['tourForNavigation'].Hide();
                            if (core.dialogs['tourForSettings']) core.dialogs['tourForSettings'].Hide();
                            if (core.dialogs['tourForAwaitings']) return;
                            Strings.tourForAwaitings = 'This section will help you to remember requests you made in the past. You can also remove the pending connection with those profiles.'+
                            '\nUnfriend Finder will alert you when someone cancels your request, and when someone confirms it.'
                            core.dialogs['tourForAwaitings'] = new TourBox({
                                id: 'tourForAwaitings',
                                title: '<span class="fr_FR">Requêtes en attente</span>'+
                                '<span class="en_US">Awaiting Requests</span>',
                                body: nl2br(Strings.tourForAwaitings),
                                context: getFromId('bindHeader'),
                                arrow: 'top-left',
                                margin: 10,
                                shift: 0,
                                align: 'middle',
                                next: function() {
                                    core.tour.showStep(5);   
                                }
                            });
                            core.dialogs['tourForAwaitings'].Show();  
                        }
                    },{
                        id: 5,
                        name: 'Settings',
                        handler: function() { 
                            (new Handler()).clickHeaderToShowSettings();
                            CSS3.setClass(getFromId('settingsBehavior'), 'visible');
                            CSS3.setClass(getFromId('navItem_unfriends'), 'sideNavItem open opened');
                            core.focus.focusOn(getFromId('contentUnfriends'));

                            
                            if (core.dialogs['tourForMenubar']) core.dialogs['tourForMenubar'].Hide();
                            if (core.dialogs['tourForFilter']) core.dialogs['tourForFilter'].Hide();
                            if (core.dialogs['tourForNavigation']) core.dialogs['tourForNavigation'].Hide();
                            if (core.dialogs['tourForAwaitings']) core.dialogs['tourForAwaitings'].Hide();
                            if (core.dialogs['tourForSettings']) return;
                            Strings.tourForSettings = 'The settings section will allow you to customize your Unfriend Finder experience, by providing a lot of options to change.'+
                            '\nYou will be able to select which type of notifications you want to receive, to change the language of the script, and export data to another browser, and so much more.'+
                            '\nSettings are available from the left-filters.'
                            core.dialogs['tourForSettings'] = new TourBox({
                                id: 'tourForAwaitings',
                                title: '<span class="fr_FR">Paramètres</span>'+
                                '<span class="en_US">Settings</span>',
                                body: nl2br(Strings.tourForSettings),
                                context: getFromId('title_header'),
                                arrow: 'left',
                                align: 'middle',
                                margin: 10,
                                last: true,
                                next: function() {
                                    core.tour.finish();   
                                }
                            });
                            core.dialogs['tourForSettings'].Show();

                        }
                    }]
                }
            });
            core.tour.start();
        }
    };

    core.toString = function() { return '[object UnfriendFinder]'; };
    Console.log('Initializing core');

    core.validateStorage();
    Console.log('Storage validated');

    core.emergencyReset();
    core.initLists();
    core.initLanguage();
    core.bubble = new Bubble();
    core.settings = new Settings(); 
    core.style = new Style();
    core.dat += '&scriptlocale='+LANG;
    core.addStyles();
    setTimeout(function() {
        core.initBeeper();
        core.checkValues();
        core.validateUrls();
        core.checkForUpdate(false);
        core.check(true);
        core.checkCompatibility();
        core.updateUsage(); 
        core.onReady();
        core.checkOldVersion();
        core.bindRemove();
        core.bindRemoveFilters();
        core.bindKeys();
        core.loadCheckProfile();
        core.settings.appendMenu();
        core.focus = new Focus();
        core.initTour();
        Console.log('Core Ready');
        var loadedTime = (((new Date()).getTime() - startTime)+'ms');
    }, 500); 
};

//Starting script :
function startScript() {
    Console.warn('Unfriend Finder loaded for url(\''+document.location+'\')'); 
    if (Params.iFrame) {
        Console.error('Can\'t run over iFrames', document.location)
        return;
    }
    if (Params.isPage) {
        Console.error('Unfriend Finder cannot be loaded for pages profiles');
        return;
    }
    
    initNub();
    if (!Params.enabled) return;                
    var scripts = (new xPathSelector("//script")).getMultipleNodeValues();
    while (script = scripts.iterateNext()) { if (/Env\s?=\s?\{.{10,}\};/.test(script.innerHTML)) innerScript = script.innerHTML.replace('Env=', ''); }
    try {
        if (!innerScript) {
            FAILURE++;
            if (FAILURE > (Params.timeoutLoad *2)) {
                Console.error('URL is not suitable for Unfriend Finder', document.location);
                return false;
            }
            Console.log('startScript');
            setTimeout(startScript, 500);
        }
        else {
            script = new UnfriendFinder(innerScript);
        }
    }
    catch (ex) { 
        Console.error('Error when loading Unfriend Finder (Env is not defined)', document.location);
    }
}

startScript();
setInterval(checkScript, 5000);
//End of script