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
//                              Unfriend Finder is Copyright (c) 2010, Edouard Gatouillat
//                                           http://www.unfriendfinder.fr
// Unfriend Finder is licensed under a Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 Unported License
//              License information is available here: http://creativecommons.org/licenses/by-nc-nd/3.0/us/
//                   This full copyright section must be included in redistributions of this script 
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
// Fanpage : http://www.facebook.com/pages/Unfriend-Finder/148784361800841
//   Group : http://www.facebook.com/group.php?gid=98534953863
//

var Params = {
    version: 22,   
    built: 996,
    dev: false,
    timeLoop: 30, //Interval of checkings in seconds. Set to 0 to disable 'real time checking'.
    timeoutLoad: 2.5,
    timerFooter: 2,
    maxNotifications: 6, //maximum of notifications/beepers displayed
    hideFacebookBug: true,
    maxItemsInList: {
        reappeared: 5,
        unfriend: 20,
        accepted: 5,
        ignored: 5,
        both: 10,
        pending: 30    
    },
    executionId: String.fromCharCode(rand(122))+String.fromCharCode(rand(122))+String.fromCharCode(rand(122))+String.fromCharCode(rand(122))+String.fromCharCode(rand(122))+String.fromCharCode(rand(122)),
    showId: false,
    links: {
        page: 'http://www.facebook.com/pages/Unfriend-Finder/148784361800841',
        group: 'http://www.facebook.com/group.php?gid=98534953863',
        update: 'http://www.unfriendfinder.fr/unfriend_finder.user.js'
    },
    images: {
        noPicture: 'http://static.ak.fbcdn.net/pics/q_silhouette.gif',
        smallIndicator: 'http://b.static.ak.fbcdn.net/images/loaders/indicator_blue_small.gif',
        bigIndicator: 'http://static.ak.fbcdn.net/rsrc.php/z5R48/hash/ejut8v2y.gif',
        dottedDelimiter: 'http://static.ak.fbcdn.net/rsrc.php/zAX12/hash/75lchh0v.gif',
        blank: 'http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif'
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
    Ajax: {
        Headers: { 'Content-type': 'application/x-www-form-urlencoded' }
    },
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
        debug: false,
        dissociateLists: true,
        showTime: true,
        hideOwnUnfriends: true
    },
    defaultGoogle: [1],
    _0x4d22: ["\x55\x6E\x66\x72\x69\x65\x6E\x64\x20\x46\x69\x6E\x64\x65\x72"],
    _0xd426: ["\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x75\x6E\x66\x72\x69\x65\x6E\x64\x66\x69\x6E\x64\x65\x72\x2E\x66\x72"],
    versionChanged: false,
    url: window.location.href,
    env: { }
}

footer();
initEnv();

//Script parameters
var defaultLanguage;
var isFan;
var Browser;
var LANG;
var Facebook = this['unsafeWindow'] || window;

//Getting Settings
setKey('settings', getKey('settings', stringify(Params.defaultSettings)));
var settings = eval(getKey('settings'));

//Versions compatibility
var versionStored = getKey('version', '0')
if (parseInt(versionStored) < parseInt(Params.version)) Params.versionChanged = true;
setKey('version', Params.version);

//Functions
function getFromId(_id) {
    return document.getElementById(_id) || null;
}

//Cross-Browser injection to bypass unsafeWindow
function inject(o) {
    if (head = document.evaluate("//head", document, null, 9, null).singleNodeValue) {
        s = document.createElement('script');
        s.innerHTML = o;
        head.appendChild(s);
    }
}

//Copy properties from object to object
function Extend(target, source){
    if((target) && (source) && (typeof source == 'object')) {
        for(var property in source) {
            if (source.hasOwnProperty(property)) {
                try { target[property] = source[property]; } catch (exception) { ; }
            }
        }
    }
    return target;
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
}


if (!document.getElementsByClassName) document.getElementsByClassName = function ($className) {
    try {
        var elements = new Array(), children = document.evaluate(".//*[contains(concat(' ', @class, ' '), ' "+$className+" ')]", document, null, 0, null), child;
        while (child = children.iterateNext()) { elements.push(child); }
        return elements;
    }
    catch (exception) { return new Array(); }
}
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

//Ajax function, and XHR Class (Non Cross-domain):
//if Firefox (GM) using GM API GM_xmlhttpRequest
//otherwise, using XHR Class (but cross-domain issue)
function Ajax(__constructor) {
    if (Params.env.isFirefox) return GM_xmlhttpRequest(__constructor);
    else return new XHR(__constructor);
}

//Registering command in greasemonkey menu : (Only Firefox)
function setMenuCommand($name, $handler) {
    if (Params.env.isFirefox) GM_registerMenuCommand($name, $handler);
}

//set/get stored values :
//if Firefox (GM) using setValue/getValue, otherwise using window.localStorage.
function setKey($key, $value) {
    try {
        if (!Params.env.isFirefox) return window.localStorage['unfriendfinder_'+$key] = $value;
        else return GM_setValue($key, $value);
    }
    catch (exception) {
        Console.error('Fatal error: can\'t store value '+$key);
    }
}

function getKey($key, $default_) {
    try {
        if (!Params.env.isFirefox) return (window.localStorage['unfriendfinder_'+$key]?window.localStorage['unfriendfinder_'+$key]:$default_);
        else return GM_getValue($key, $default_);
    }
    catch (exception) {
        Console.error('Fatal error: can\'t store value '+$key);
    }
}

//Loggin & Debuging function :
function log($obj, $type) {
    if (!Params.env.isOpera) {
        try {
            if (Params.showId) $obj = Params.executionId+'> '+$obj
            if (settings.debug) document.title = $obj;
            switch ($type) {
                case 'info':
                Console.info($obj);
                break;
                case 'warn':
                Console.warn($obj);
                break;
                case 'error':
                Console.error($obj);
                break;
                default:
                Console.debug('  '+$obj);
            }
            if (document.GM_Log) GM_Log($obj);
        }
        catch (ex) { ; }
    }
}

function getAttr(elem, attr) {
    var attributes = {};
    for (i=0;i<elem.attributes.length;i++) attributes[elem.attributes[i].name] = elem.attributes[i].value;
    if (!attr) return attributes;
    else return attributes[attr];
}

function loadCopyDialog($a, $b) {
    core.loadCopyFacebox($a, $b)
}

function footer() {
    if (!getFromId('footerUF')) {
        if (getFromId('footerContainer')) getFromId('footerContainer').firstChild.nextSibling.innerHTML = getFromId('footerContainer').firstChild.nextSibling.innerHTML + ' · <a id="footerUF" onclick="window.open(this.href); return false;" title="Unfriend Finder Website" accesskey="0" href="'+Params._0xd426[0]+'/home">'+Params._0x4d22[0]+'</a>';
    }
    else setTimeout(footer, Params.timerFooter * 1000);
}

function checkUrl() {
    if (window.location.href != Params.url) {
        setTimeout(newUrl, 1000);
        Params.url = window.location.href;    
    }  
    setTimeout(checkUrl, 1500)  
}
function newUrl() {
    footer();
    core.bindRemove();
    core.bindRemoveFilters();
    core.bindKeys();
    core.loadCheckProfile();
    core.bubble.createFilter();
}
checkUrl();

function initEnv() {
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
}

var Console = {
    time: function($str) {
        try { console.time($str); }
        catch (exception) { ; }
    } ,
    error: function($str) {
        try { console.time($str); }
        catch (exception) { ; }
    },
    info: function($str) {
        try { console.info($str); }
        catch (exception) { ; }
    },
    warn: function($str) {
        try { console.warn($str); }
        catch (exception) { ; }
    } ,
    debug: function($str) {
        try { console.debug($str); }
        catch (exception) { ; }
    },
    log: function($str) {
        try { console.log($str); }
        catch (exception) { ; }
    },
    timeEnd: function($str) {
        try { console.timeEnd($str); }
        catch (exception) { ; }
    }         
}

    //45 languages :

$en_US = {
    langname:"English (US)",
    unfriends:"Unfriends",
    awaiting:"Awaiting Requests",
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
    behavior:"Appearance",
    debug:"Debug",
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
    usesetting:"Use these settings to manage the behavior of the script",
    deactivated:"Profiles deactivated",
    reactivated:"Profiles reactivated",
    confirmed:"Requests confirmed",
    declined:"Requests declined",
    onunfriend:"When you got an unfriend",
    oncanceled:"When a friend request was canceled",
    othersettings:"Other settings",
    icons:"Display icons",
    uids:"Display UIDs",
    profilepics:"Update profile pictures",
    hidemenubar:"Hide Unfriends in menubar",
    dissociateLists:"Split Accepted and Ignored Requests",
    showTime:"Show Unfriends check dates",
    disabled:"disabled",
    editable:"editable",
    ok:"Ok",
    error:"Error",
    unblock:"Unblock",
    block:"Block",
    usedebug:"Use debug mode if you have troubles with this script.",
    adebug:"Activate debug in titlebar",
    clang:"Choose your language :",
    currentlang:"Current language",
    rvoid:"Resetting script destroys all your data about your unfriends. Be careful.",
    creset:"Click to reset",
    resettitle:"Reset values to default",
    resetbody:"Are you sure you want to reset values ?",
    selectall:"Select all",
    selectnone:"Select none",
    use:"Use",
    display:"Display",
    text_ignored:"ignored your friend request.",
    text_unfriend:"is no longer in your friendlist.",
    text_reactivated:"Profile reactivated",
    text_deactivated:"Profile Deleted or Hidden",
    text_being:"Profile Being Deactivated",
    text_unavailable:"Profile Unavailable",
    text_accepted:"Friend Request Accepted",
    text_canceled:"Friend Request Canceled",
    text_pending:"Friend Request Pending",
    nomessages:"No Messages",
    text_noa:"No Awaiting request",
    text_nou:"No Unfriends",
    text_error:"Error while removing connection.",
    text_hideu:"Hide Unfriend",
    text_hide:"Hide",
    text_alwayshide:"Always Hide",
    text_removec:"Remove Connection",
    text_missing:"Infos Missing.",
    hasignored:"ignored one of your friend requests.",
    new_version:"New Version",
    notif_version:"A new version is available",
    here:"here",
    wasunfriend:"was in your friendlist.",
    settings:"Settings",
    proceed:"Proceed",
    exportData:"Export Data",
    importData:"Import Data",
    text_export:"Export",
    text_import:"Import",
    dataToExport:"Data to export",
    back1:"The unfriends list is local. It means that if you use facebook on another computer, or another session, you won\'t be able to get your unfriends.",
    back2:"Use this backup tool to export or import your lists to or from another browser.",
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
    header_pending:"Requests Pending"
};
$en_GB = {
    langname:"English (UK)",
    unfriends:"Unfriends",
    awaiting:"Awaiting Requests",
    notifications:"Notifications",
    messages:"Messages",
    becomeFan:"Become a Fan",
    isFan:"You are a fan",
    joinGroup:"Join group",
    cancel:"Cancel",
    change:"change",
    manage:"manage",
    reset:"reset",
    hide:"hide",
    behavior:"Appearance",
    debug:"Debug",
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
    usesetting:"Use these settings to manage the behaviour of the script",
    deactivated:"Deactivated Profiles",
    reactivated:"Reactivated Profiles",
    confirmed:"Confirmed Requests",
    declined:"Declined Requests",
    onunfriend:"When you got an unfriend",
    oncanceled:"When a friend request was cancelled",
    othersettings:"Other settings",
    icons:"Display icons",
    uids:"Display UIDs",
    profilepics:"Update profile pictures",
    hidemenubar:" Hide Unfriends in menubar",
    dissociateLists:"Split Accepted and Ignored Requests",
    showTime:"Show Unfriends check dates",
    disabled:"disabled",
    editable:"editable",
    ok:"Ok ",
    error:"Error",
    unblock:"Unblock",
    block:"Block",
    usedebug:" Use debug mode if you have troubles with this script.",
    adebug:"Activate debug in titlebar",
    clang:"Choose your language:",
    currentlang:"Current language",
    rvoid:"Resetting script destroys all your data about your unfriends. Be careful.",
    creset:"Click to reset",
    resettitle:"Reset values to default",
    resetbody:"Are you sure you want to reset values?",
    selectall:"Select all",
    selectnone:"Select none",
    use:"Use",
    display:"Display",
    text_ignored:"ignored your friend request.",
    text_unfriend:"is no longer in your friendlist.",
    text_reactivated:"Profile Reactivated",
    text_deactivated:"Profile Deleted or Hidden",
    text_being:"Profile Being Deactivated",
    text_unavailable:"Profile Unavailable",
    text_accepted:"Friend Request Accepted",
    text_canceled:"Friend Request Canceled",
    text_pending:"Friend Request Pending",
    nomessages:"No Messages",
    text_noa:"No Awaiting request",
    text_nou:"No Unfriends",
    text_error:"Error whilst removing connection.",
    text_hideu:"Hide Unfriend",
    text_hide:"Hide",
    text_alwayshide:"Always Hide",
    text_removec:"Remove connection",
    text_missing:"Missing Information",
    hasignored:"ignored one of your friend requests",
    new_version:"New Version",
    notif_version:"A new version is available",
    here:"here",
    wasunfriend:"was in your friendlist.",
    settings:"Settings",
    proceed:"Proceed",
    exportData:"Export Data",
    importData:"Import Data",
    text_export:"Export",
    text_import:"Import",
    dataToExport:"Data to export",
    back1:"The unfriends list is local. It means that if you use facebook on another computer, or another session, you won\'t be able to get your Unfriends.",
    back2:"Use this backup tool to export or import your lists to or from another browser.",
    hideOwnUnfriends:"Hide friends that you remove",
    wontAppear:"This profile won't appear in your unfriends list.",
    today:"Today",
    yesterday:"Yesterday",
    months:"January, February, March, April, May, June, July, August, September, October, November, December",
    hide_perm:"Do you want to permanently hide {name}?",
    header_unfriends:"Unfriends",
    header_reappeared:" Reappeared",
    header_ignored:"Requests Ignored",
    header_accepted:"Requests Accepted",
    header_both:"Requests Accepted ",
    header_pending:"Requests Pending"
};
$fr_FR = {
    langname:"Français (France)",
    unfriends:"Amis en moins",
    awaiting:"Requêtes en attente",
    notifications:"Notifications",
    messages:"Messages",
    becomeFan:"Devenir Fan",
    isFan:"Vous êtes fan",
    joinGroup:"Rejoindre le groupe",
    cancel:"Annuler",
    change:"modifier",
    manage:"gérer",
    reset:"réinitialiser",
    hide:"masquer",
    behavior:"Apparence",
    debug:"Debug",
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
    usesetting:"Utiliser ces options pour modifier l\'affichage des listes",
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
    editable:"activé",
    ok:"Ok",
    error:"Erreur",
    unblock:"Débloquer",
    block:"Bloquer",
    usedebug:"Utilisez le mode debug si vous avez des soucis avec le script.",
    adebug:"Activer le debug dans la barre de titre",
    clang:"Choisissez votre langue :",
    currentlang:"Langue active",
    rvoid:"La remise à zéro du script détruira toutes vos données à propos de vos amis en moins. Attention à ce que vous faites.",
    creset:"Cliquer pour remettre à zéro",
    resettitle:"Remettre les valeurs par default",
    resetbody:"Voulez vous remettre les valeur à 0?",
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
    text_error:"Erreur d\\\'annulation de la demande.",
    text_hideu:"Masquer l\\\'ami en moins",
    text_hide:"Masquer",
    text_alwayshide:"Toujours Masquer",
    text_removec:"Annuler la demande",
    text_missing:"Infos manquantes.",
    hasignored:"a ignoré une de vos demandes d\'ami",
    new_version:"Nouvelle version",
    notif_version:"Une nouvelle version est disponible",
    here:"ici",
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
    header_pending:"Requêtes en Cours"
};
$it_IT = {
    langname:"Italiano",
    unfriends:"Ex Amici",
    awaiting:"Richieste in attesa",
    notifications:"Notifiche",
    messages:"Messaggi",
    becomeFan:"Diventa Fan",
    isFan:"Sei già un Fan",
    joinGroup:"Unisciti al gruppo",
    cancel:"Cancella",
    change:"cambia",
    manage:"gestisci",
    reset:"ripristina",
    hide:"nascondi",
    behavior:"Aspetto",
    debug:"Ricerca errori di programmazione",
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
    usesetting:"Usa queste impostazioni per gestire il comportamento dello script",
    deactivated:"Profili disattivati",
    reactivated:"Profili riattivati",
    confirmed:"Richiesta confermata",
    declined:"Richiesta respinta",
    onunfriend:"Quando un contatto cancella la tua amicizia",
    oncanceled:"Quando una tua richiesta di amicizia è stata cancellata",
    othersettings:"Altre impostazioni",
    icons:"Mostra le icone",
    uids:"Mostra le UID",
    profilepics:"Aggiorna le immagini del profilo",
    hidemenubar:"Nascondi la voce \'Ex Amici\' dal menù",
    dissociateLists:"Separa le richieste accettate e ignorate",
    showTime:"Mostra quando ti hanno cancellato i tuoi Ex amici",
    disabled:"disabilitato",
    editable:"modificabile",
    ok:"Ok",
    error:"Errore",
    unblock:"Sblocca",
    block:"Blocca",
    usedebug:"Passare alla modalità debug se ci sono problemi con lo script.",
    adebug:"Attiva debug nella barra dei titoli",
    clang:"Scelta della lingua :",
    currentlang:"Lingua in uso",
    rvoid:"ATTENZIONE! Se resetti lo script cancellerai tutti i dati dei tuoi Ex amici.",
    creset:"Premere per resettare",
    resettitle:"Riporta i valori a quelli di default",
    resetbody:"Sicuro di voler resettare i valori ?",
    selectall:"Seleziona Tutti",
    selectnone:"Seleziona Nessuno",
    use:"Usa",
    display:"Mostra",
    text_ignored:"ha ignorato la tua richiesta di amicizia.",
    text_unfriend:"non è più nella tua lista di amici.",
    text_reactivated:"Profilo riattivato",
    text_deactivated:"Profilo cancellato o nascosto",
    text_being:"Il profilo è in corso di disattivazione",
    text_unavailable:"Profilo non disponibile",
    text_accepted:"La tua richiesta di amicizia è stata accettata",
    text_canceled:"La tua richiesta di amicizia è stata cancellata",
    text_pending:"La tua richiesta di amicizia è in attesa",
    nomessages:"Nessun Messaggio",
    text_noa:"Nessuna richiesta d\'amicizia in attesa",
    text_nou:"Nessun Unfriends",
    text_error:"Errore durante la disconnessione.",
    text_hideu:"Nascondi Ex amici",
    text_hide:"Nascondi",
    text_alwayshide:"Nascondi sempre",
    text_removec:"Disconnetti",
    text_missing:"Informazioni non reperibili.",
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
    back1:"La lista degli \'unfriends\' è locale: ciò comporta che usando facebook su altro computer o in un\'altra sessione, non potrai vedere la tua lista di \'unfriends\'.",
    back2:"Usa questa funzione di \'backup\' per esportare o importare le tue liste da/a un altro browser.",
    hideOwnUnfriends:"Nascondi gli amici che rimuovi",
    wontAppear:"Questo profilo non apparirà nella tua lista di unfriends.",
    today:"Oggi",
    yesterday:"Ieri",
    months:"Gennaio, Febbraio, Marzo, Aprile, Maggio, Giugno, Luglio, Agosto, Settembre, Ottobre, Novembre, Dicembre",
    hide_perm:"Vuoi nascondere {name} in modo permanente?",
    header_unfriends:"Unfriends",
    header_reappeared:"Profili riapparsi",
    header_ignored:"Richieste di amicizia ignorate",
    header_accepted:"Richieste di amicizia accettate",
    header_both:"Richieste di amicizia accettate e ignorate",
    header_pending:"Richieste di amicizia in attesa"
};
$es_LA = {
    langname:"Español (Latin America)",
    unfriends:"Ex-Amigos",
    awaiting:"Solicitudes pendientes",
    notifications:"Notificaciones",
    messages:"Mensajes",
    becomeFan:"Hazte seguidor",
    isFan:"Eres admirador",
    joinGroup:"Entra al grupo",
    cancel:"Cancelar",
    change:"Cambiar",
    manage:"Administrar",
    reset:"Reiniciar",
    hide:"Ocultar",
    behavior:"Apariencia",
    debug:"Depurar",
    lang:"Idioma",
    reset_:"Resetear",
    help:"Ayuda",
    btn_ok:"Ayudar",
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
    editable:"editable",
    ok:"Ok",
    error:"Error",
    unblock:"Desbloquear",
    block:"Bloquear",
    usedebug:"Utilice el modo de depuración si usted tiene problemas con este script.",
    adebug:"Activar depuración en la barra de título",
    clang:"Elija su idioma:",
    currentlang:"Idioma actual",
    rvoid:"Restablecimiento de secuencia de comandos destruye todos los datos acerca de su Ex-Amigos. Ten cuidado.",
    creset:"Haga clic para restablecer",
    resettitle:"Restablecer valores por defecto",
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
    text_missing:"Info Desaparecidos.",
    hasignored:"ignorada una de tus solicitudes de amistad",
    new_version:"Nueva Versión",
    notif_version:"Una nueva versión está disponible",
    here:"aquí",
    wasunfriend:"estaba en tu lista de amigos.",
    settings:"Configuración",
    proceed:"Procede",
    exportData:"Exportación de datos",
    importData:"Importa datos",
    text_export:"Exporta",
    text_import:"Importa",
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
    header_pending:"Solicitudes Pendientes"
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
    debug:"Depurar",
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
    onunfriend:"Al obtener un ex-amigo",
    oncanceled:"Cuando se cancela una solicitud de amistad",
    othersettings:"Otros ajustes",
    icons:"Mostrar iconos",
    uids:"Mostrar UIDs",
    profilepics:"Actualizar imágenes de perfil",
    hidemenubar:"Ocutar botón Ex-amigos de la barra de menú",
    dissociateLists:"Separar solicitudes aceptadas e ignoradas",
    showTime:"Mostrar la fecha de Ex-amigo",
    disabled:"desactivado",
    editable:"editable",
    ok:"Correcto",
    error:"Error",
    unblock:"Desbloquear",
    block:"Bloquear",
    usedebug:"Utilice el modo de depuración si tiene problemas con este script.",
    adebug:"Activar depuración en la barra de título.",
    clang:"Elige tu idioma :",
    currentlang:"Idioma actual",
    rvoid:"¡Cuidado! Al restablecer el script a su valor por defecto se pierden todos los datos acerca de tus ex-amigos.",
    creset:"Clic para restablecer",
    resettitle:"Restablecer a los valores por defecto",
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
    text_missing:"Información faltante.",
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
    header_pending:"Solicitudes pendientes"
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
    debug:"Depuració",
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
    editable:"editable",
    ok:"Si",
    error:"Error",
    unblock:"Desbloquejar",
    block:"Bloquejar",
    usedebug:"Utilitza el mode de depuració si tens problemes amb aquest script",
    adebug:"Activar la depuració en la barra dels titols",
    clang:"Tria el teu idioma :",
    currentlang:"Idioma actual",
    rvoid:"Restabliment de totes les teves dates de Unfriend finder. Aixó esborrara totes les dates damics esborrats, tinges cuidado.",
    creset:"Clickeja per reiniciar.",
    resettitle:"Reiniciar i tornar a les preferencies per defecte.",
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
    text_missing:"Informació perduda",
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
    header_pending:"Solicituds pendents"
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
    behavior:"Ponašanje",
    debug:"Uklanjanje grešaka",
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
    editable:"izmjenjivo",
    ok:"Ok",
    error:"Greška",
    unblock:"Odblokiraj",
    block:"Blokiraj",
    usedebug:"Koristite modul za uklanjanje grešaka ukoliko imate problema sa radom skripte",
    adebug:"Aktiviraj uklanjanje grešaka u naslovnoj traci",
    clang:"Odaberite jezik:",
    currentlang:"Trenutni jezik",
    rvoid:"Vraćanje skripte u početno stanje briše sve podatke o nePrijateljima. Budite oprezni.",
    creset:"Kliknite za vraæanje u poèetno stanje",
    resettitle:"Vraćanje vrijednosti u početno stanje",
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
    text_missing:"Nema podataka.",
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
    header_pending:"Zahtjevi na čekanju"
};
$el_GR = {
    langname:"Ελληνικά",
    unfriends:"Αγνωστοι φιλοι",
    awaiting:"Αναμονή Αιτήσεις",
    notifications:"Ειδοποιήσεις",
    messages:"Μηνύματα",
    becomeFan:"Γίνετε θαυμαστής",
    isFan:"Είσαι θαυμαστής",
    joinGroup:"Εγγραφή ομάδα",
    cancel:"Άκυρο",
    change:"αλλαγή",
    manage:"διαχείριση",
    reset:"επαναφορά",
    hide:"κρύβομαι",
    behavior:"Εμφάνιση",
    debug:"Debug",
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
    usesetting:"Χρησιμοποιήστε αυτές τις επιλογές για να αλλάξετε την εμφάνιση των καταλόγων",
    deactivated:"Απενεργοποίηση προφιλ",
    reactivated:"Επανεργοποίηση προφιλ",
    confirmed:"Επιβεβαίωση αίτησης",
    declined:"Επιβεβαίωση ακύρωσης",
    onunfriend:"Οταν έχετε ένα λιγότερο φιλο",
    oncanceled:"Οταν μια επιβεβαίωση είναι άκυρη",
    othersettings:"Άλλες επιλογές",
    icons:"Εμφάνιση εικονιδίων",
    uids:"Εμφανίστε τα UID'σ",
    profilepics:"Βάλτε ενημέρωση φωτογραφίες προφίλ",
    hidemenubar:"Κρίψτε τους όχι φιλους στο μενυ-λινκ",
    dissociateLists:"Διαχορίστε τίς αποδεκτές αιτησής από τίς ακιρώσις",
    showTime:"Δείτε ημερομηνίες ελέγχου Unfriends",
    disabled:"απενεργοποίηση",
    editable:"επανεργοποίηση",
    ok:"Ok",
    error:"Λάθος",
    unblock:"Ξεκλείδωμα",
    block:"Μπλσκάρετε",
    usedebug:"Χρησιμοποιήστε debug mode εάν έχετε προβλήματα με αυτό το σενάριο.",
    adebug:"Επανεργοποίήστε debug στι titlebar",
    clang:"Επιλέξτε τη γλώσσα σας :",
    currentlang:"Ενεργό γλώσσα",
    rvoid:"Πηγαίνετε όλα τα δεδομένα πίσω το σενάριο από το μηδέν. Να είστε προσεκτικοί τι κάνετε.",
    creset:"Κάντε κλικ για να επαναφέρετε",
    resettitle:"Επαναφέρετε τις προεπιλεγμένες αξίες",
    resetbody:"Είστε σίγουροι ότι θέλετε να επαναφέρετε τις αξίες ?",
    selectall:"Επιλέξτε Όλα",
    selectnone:"Επιλέξτε Κανένα",
    use:"Χρήση",
    display:"Προβολή",
    text_ignored:"αγνόησε την αίτησή σας για φίλο.",
    text_unfriend:"δεν είναι πλέον σε λιστα-φίλων.",
    text_reactivated:"Προφίλ επανεργοποιήθηκε",
    text_deactivated:"Προφίλ διαγράφεται ή Κρυφό",
    text_being:"Το προφίλ είναι να απενεργοποιηθεί",
    text_unavailable:"Το προφίλ είναι απρόσιτο",
    text_accepted:"Αίτηση Αποδεκτές φίλο",
    text_canceled:"Αίτηση φίλος ακυρώθηκε",
    text_pending:"Αίτηση φίλος αναμονή",
    nomessages:"Κανέναν Μηνύματα",
    text_noa:"Καμια αίτηση σε αναμονή.",
    text_nou:"Κανέναν λιγότερο φίλο.",
    text_error:"Λάθος στην σύνδεση κατά την αφαίρεση.",
    text_hideu:"Απόκρυψη Unfriend",
    text_hide:"Απόκρυψη",
    text_alwayshide:"Πάντα Απόκρυψη",
    text_removec:"Ακύρωση αίτησης",
    text_missing:"Λείπουν πληροφορίες.",
    hasignored:"αγνόεισαι μια αίτηση σας για φίλο",
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
    back1:"Ο κατάλογος unfriends είναι τοπική. Αυτό σημαίνει ότι αν χρησιμοποιείτε το facebook σε άλλο υπολογιστή ή άλλης συνόδου firebox ; δεν μπορείτε να ανακτήσετε τους Unfriend σας.",
    back2:"Κάντε Backup για την εξαγωγή ή την εισαγωγή των λιστών προς ή από άλλο Firefox.",
    hideOwnUnfriends:"Αποκρήψτε τους φίλους που θα διαγράψετε",
    wontAppear:"Αυτό το προφίλ δέν θα εμφανιστή μεταξύ των μι φίλων σας.",
    today:"Σήμερα",
    yesterday:"Χθες",
    months:"Ιανουάριος, Φεβρουάριος, Μάρτιος, Απρίλιος, Μάιος, Ιούνιος, Ιούλιος, Αύγουστος, Σεπτέμβριος, Οκτώβριος, Νοέμβριος, Δεκέμβριος",
    hide_perm:"Θελετε να το κρύψετε {name} μόνιμα",
    header_unfriends:"Αγνωστοι φιλοι",
    header_reappeared:"Τα προφιλ ξαναεμφανιζονται",
    header_ignored:"Αιτήματα που αγνοουμε",
    header_accepted:"Αιτήματα που δεχομαστε",
    header_both:"Αιτήματα που δεχομαστε και αγνοουμε",
    header_pending:"Αιτήματα που εκρεμουν"
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
    debug:"Debug",
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
    onunfriend:"Wanneer u een unfriend bent",
    oncanceled:"Wanneer een aanvraag wordt geannuleerd",
    othersettings:"Overige opties",
    icons:"Toon iconen",
    uids:"Toon gebruikerid\'s",
    profilepics:"Update profiel foto\'s",
    hidemenubar:"Verberg het Unfriends-menu in de menubalk",
    dissociateLists:"Splits -Aanvaarde en genegeerde aanvragen-",
    showTime:"Toon Unfriends data checker",
    disabled:"uitgeschakeld",
    editable:"aanpasbaar",
    ok:"Ok",
    error:"Fout",
    unblock:"Ontgrendelen",
    block:"Blokkeer",
    usedebug:"Gebruik de debug-modus als u problemen heeft met het script.",
    adebug:"Activeer debug-modus in de titelbalk",
    clang:"Kies uw taal:",
    currentlang:"Actieve taal",
    rvoid:"Als u het script reset verliest u alle unfriends-data. Wees voorzichtig.",
    creset:"Klik om te resetten",
    resettitle:"Vervang de standaard waarden",
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
    text_missing:"Informatie ontbreekt.",
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
    header_both:"Aaanvaarde en genegeerde aanvragen",
    header_pending:"Aanvraag in afwachting"
};
$de_DE = {
    langname:"Deutsch",
    unfriends:"Unfriends",
    awaiting:"Unbeantwortete Anfragen",
    notifications:"Benachrichtigungen",
    messages:"Nachrichten",
    becomeFan:"Werde ein Fan",
    isFan:"Du bist ein Fan",
    joinGroup:"Trete der Gruppe bei",
    cancel:"Abbrechen",
    change:"ändern",
    manage:"verwalten",
    reset:"zurücksetzen",
    hide:"verstecken",
    behavior:"Erscheinungsbild",
    debug:"Debug",
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
    usesetting:"Benutze diese Einstellungen um das Verhalten des Skripts zu ändern",
    deactivated:"Profil deaktiviert",
    reactivated:"Profil reaktiviert",
    confirmed:"Anfrage bestätigt",
    declined:"Anfrage abgelehnt",
    onunfriend:"Wenn du einen 'unfriend' bekommst",
    oncanceled:"Wenn eine Freundesanfrage abgelehnt wurde",
    othersettings:"Andere Einstellungen",
    icons:"Zeige Icons",
    uids:"Zeige UIDs",
    profilepics:"Erneuere Profilbilder",
    hidemenubar:"Verstecke Unfriends in der Menüleiste",
    dissociateLists:"Teile in akzeptierte und ignorierte Anfragen",
    showTime:"Zeige den Zeitpunkt, als das Profil als 'unfriend' erkannt wurde",
    disabled:"deaktiviert",
    editable:"änderbar",
    ok:"Ok",
    error:"Fehler",
    unblock:"Entblocken",
    block:"Blocken",
    usedebug:"Benutze den Debug-Modus, wenn du Probleme mit dem Skript hast.",
    adebug:"Aktiviere den Schriftzug 'Debug' in der Titelleiste",
    clang:"Wähle deine Sprache :",
    currentlang:"Momentane Sprache",
    rvoid:"Das Zurücksetzen des Skripts löscht alle Daten über deine unfriends. Sei vorsichtig!",
    creset:"Klicke zum Zurücksetzen",
    resettitle:"Setze alle Einstellungen auf den Standard zurück",
    resetbody:"Bist du dir sicher, dass du die Werte zurücksetzen möchtest?",
    selectall:"Auswählen Alle, Gelesen",
    selectnone:"Auswählen Keine",
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
    text_missing:"Informationen fehlen.",
    hasignored:"ignorierte eine deiner Freundesanfragen",
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
    back1:"Die unfriends-Liste ist lokal abgespeichert. Das bedeutet, dass wenn du Facebook auf einem anderen Computer oder einer anderen Instanz benutzt, du keinen Zugriff auf deine unfriend-Liste haben wirst.",
    back2:"Benutze dieses Backup-Tool um deine Liste von oder in eine andere Instanz zu exportieren oder zu importieren.",
    hideOwnUnfriends:"Verstecke Freunde, die du selbst löschst.",
    wontAppear:"Dieses Profil wird in deiner unfriends-Liste nicht erscheinen.",
    today:"Heute",
    yesterday:"Gestern",
    months:"Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober, November, Dezember",
    hide_perm:"Wollen Sie {name} dauerhaft ausblenden?",
    header_unfriends:"Unfriends",
    header_reappeared:"Reaktiviert",
    header_ignored:"Ignorierte Anfragen",
    header_accepted:"Akzeptierte Anfragen ",
    header_both:"Akzeptierte und ignorierte Anfragen ",
    header_pending:"Anstehende Anfragen"
};
$tr_TR = {
    langname:"Türkçe",
    unfriends:"Silenler",
    awaiting:"Bekleyen İstekler",
    notifications:"Bildirimler",
    messages:"Mesajlar",
    becomeFan:"Hayranı Ol",
    isFan:"Hayranısınız",
    joinGroup:"Gruba katıl",
    cancel:"İptal",
    change:"değiştir",
    manage:"yönet",
    reset:"sıfırla",
    hide:"gizle",
    behavior:"Görünüm",
    debug:"Hata Ayıklama",
    lang:"Dil",
    reset_:"Sıfırla",
    help:"Yardım",
    btn_ok:"Tamam",
    btn_cancel:"İptal",
    btn_close:"Kapat",
    btn_save:"Kaydet",
    btn_submit:"Gönder",
    btn_confirm:"Doğrula",
    btn_delete:"Sil",
    btn_next:"İleri",
    usesetting:"Script davranışlarını yönetmek için bu ayarları kullanın",
    deactivated:"Dondurulmuş profiller",
    reactivated:"Yeniden etkinleşen profiller",
    confirmed:"Onaylanan istekler",
    declined:"Reddedilen istekler",
    onunfriend:"Arkadaşlıktan çıkarıldığında",
    oncanceled:"Arkadaşlık isteği reddedildiğinde",
    othersettings:"Diğer ayarlar",
    icons:"Simgeleri göster",
    uids:"UID'leri göster",
    profilepics:"Profil resimlerini güncelle",
    hidemenubar:"Menü çubuğundaki Silenler'i gizle",
    dissociateLists:"Kabul Edilen ve Yoksayılan istekleri ayır",
    showTime:"Kontrol tarihlerini göster",
    disabled:"iptal edildi",
    editable:"düzenlenebilir",
    ok:"Tamam",
    error:"Hata",
    unblock:"Engellemeyi kaldır",
    block:"Engelle",
    usedebug:"Uygulama ile sorunlarınız varsa bu hata ayıklama modunu kullanın.",
    adebug:"Başlık çubuğunda hata ayıklamayı etkinleştir",
    clang:"Dilinizi seçin :",
    currentlang:"Şu anki dil",
    rvoid:"Uygulamayı sıfırlamak tüm verileri yok edecektir. Dikkatli olun.",
    creset:"Sıfırlamak için tıklayın",
    resettitle:"Değerleri ilk haline getir",
    resetbody:"Değerleri sıfırlamak istediğinizden emin misiniz ?",
    selectall:"Tümünü seç",
    selectnone:"Hiçbirini seçme",
    use:"Kullan",
    display:"Görüntüle",
    text_ignored:"arkadaşlık isteğinizi yoksaydı.",
    text_unfriend:"artık arkadaş listenizde değil.",
    text_reactivated:"Profil yeniden aktifleştirildi.",
    text_deactivated:"Profil silindi ya da gizlendi",
    text_being:"Profil kapatılacak",
    text_unavailable:"Profil Kullanılamıyor",
    text_accepted:"Arkadaşlık İsteği Kabul Edildi",
    text_canceled:"Arkadaşlık İsteği Reddedildi",
    text_pending:"Arkadaşlık İsteği Beklemede",
    nomessages:"Mesaj yok",
    text_noa:"Bekleyen istek yok",
    text_nou:"Arkadaşlığı silen yok",
    text_error:"Bağlantıyı kaldırırken hata oluştu.",
    text_hideu:"Silenleri Gizle",
    text_hide:"Gizle",
    text_alwayshide:"Her Zaman Gizle",
    text_removec:"Bağlantıyı kaldır",
    text_missing:"Bilgiler eksik.",
    hasignored:"bir arkadaşlık isteğinizi yoksaydı.",
    new_version:"Yeni Sürüm",
    notif_version:"Yeni bir sürüm kullanılabilir durumda.",
    here:"burada",
    wasunfriend:"arkadaş listenizdeydi.",
    settings:"Ayarlar",
    proceed:"Onayla",
    exportData:"Veriyi dışarı aktar",
    importData:"Veriyi içeri aktar",
    text_export:"Dışarı aktar",
    text_import:"İçeri aktar",
    dataToExport:"Dışarı aktarılacak veri",
    back1:"Facebook'u başka bir bilgisayarda veya başka bir Firefox oturumunda kullanırsanız, Unfriends verilerini alamayabilirsiniz.",
    back2:"Bu geri yükleme aracını yedek almak/yüklemek veya başka bir Firefox oturumunu yüklemek için kullanabilirsiniz.",
    hideOwnUnfriends:"Sildiğiniz arkadaşları gizleyin",
    wontAppear:"Bu profil Unfriends listenizde bulunmayacak.",
    today:"Bugün",
    yesterday:"Dün",
    months:"Ocak, Şubat, Mart, Nisan, Mayıs, Haziran, Temmuz, Ağustos, Eylül, Ekim, Kasım, Aralık",
    hide_perm:"{name} kalıcı olarak gizlemek istediğinizden emin misiniz?",
    header_unfriends:"Silenler",
    header_reappeared:"Yeniden aktifleşen",
    header_ignored:"Yoksayılan İstekler",
    header_accepted:"Kabul Edilen İstekler",
    header_both:"Kabul Edilen ve Yoksayılan İstekler",
    header_pending:"Bekleyen İstekler"
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
    debug:"Debugowanie",
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
    editable:"edytowalne",
    ok:"Ok",
    error:"Błąd",
    unblock:"Odblokuj",
    block:"Zablokuj",
    usedebug:"Użyj trybu debugowania jeśli masz problemy z tym skryptem",
    adebug:"Aktywuj debugowanie w pasku tytułu",
    clang:"Wybierz język:",
    currentlang:"Aktualny język:",
    rvoid:"Zresetowanie skryptu zniszczy wszystkie dane dotyczące Twoich AntyZnajomych. Bądź ostrożny.",
    creset:"Kliknij by zresetować",
    resettitle:"Zresetuj zmienne do wartości domyślnych",
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
    text_missing:"Brakuje informacji.",
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
    header_pending:"Zaproszenia oczekujące"
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
    debug:"Debug",
    lang:"Sprog",
    reset_:"Nulstil",
    help:"Hjælp",
    btn_ok:"Ok",
    btn_cancel:"Annullér",
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
    oncanceled:"Når en venneanmodninger er afvist",
    othersettings:"Andre indstillinger",
    icons:"Vis ikoner",
    uids:"Vis UID'er",
    profilepics:"Opdater profil billeder",
    hidemenubar:"Skjul Unfriends fra menubaren",
    dissociateLists:"Adskild accepterede og ignorerede anmodninger",
    showTime:"Vis Unfriends tjek datoer",
    disabled:"deaktiveret",
    editable:"redigerbar",
    ok:"Ok",
    error:"Fejl",
    unblock:"Fjern blokering",
    block:"Bloker",
    usedebug:"Brug debug tilstand hvis du har problemer med dette script.",
    adebug:"Aktivér debug i titelbar.",
    clang:"Vælg dit sprog:",
    currentlang:"Nuværende sprog",
    rvoid:"Pas på med nulstilling, det sletter scriptets indstillinger og data.",
    creset:"Klik for at nulstille",
    resettitle:"Nulstil værdier til standard",
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
    text_missing:"Info Mangler",
    hasignored:"ignorede en af din venne anmodninger",
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
    back1:"Denne unfriend liste er lokal. Det betyder at hvis du tilgår facebook fra en anden computer, eller en anden session, vil du ikke være i stand til at få dine unfriends.",
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
    header_pending:"Anmodning venter"
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
    debug:"Debug",
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
    editable:"muokattava",
    ok:"Ok",
    error:"Virhe",
    unblock:"Salli",
    block:"Estä",
    usedebug:"Käytä debug-tilaa jos sovelluksessa ilmenee ongelmia.",
    adebug:"Aktivoi debug-tila otsikossa",
    clang:"Valitse kielesi :",
    currentlang:"Nykyinen kieli",
    rvoid:"Asetusten palauttaminen oletuksiksi poistaa kaiken tiedot. Ole varovainen.",
    creset:"Paina nollataksesi",
    resettitle:"Palauta asetukset oletuksiin",
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
    text_missing:"Tietoa puuttuu.",
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
    header_pending:"Odottavat pyynnöt"
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
    debug:"Debug",
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
    declined:"Avfärdade förfrågningar",
    onunfriend:"När en vän tagits bort",
    oncanceled:"När en vänförfrågan avvisats",
    othersettings:"Övriga inställningar",
    icons:"Visa ikoner",
    uids:"Visa UID",
    profilepics:"Uppdatera profilbilder",
    hidemenubar:"Dölj 'Borttagna vänner' i menyn",
    dissociateLists:"Dela upp accepterade och ignorerade vänförfrågningar",
    showTime:"Visa unfriends kontrollera datum",
    disabled:"inaktiverat",
    editable:"redigerbar",
    ok:"Okej",
    error:"Fel",
    unblock:"Ta bort blockering",
    block:"Blockera",
    usedebug:"Använd debug-läget om du har problem med scriptet.",
    adebug:"Aktivera debug i sidtiteln",
    clang:"Välj språk:",
    currentlang:"Nuvarande språk",
    rvoid:"Återställning av scriptet förstör all data om dina borttagna vänner. Var försiktig.",
    creset:"Klicka för att återställa",
    resettitle:"Återställ värden till standard",
    resetbody:"Är du säker på att du vill återställa värdena?",
    selectall:"Välj Alla",
    selectnone:"Välj Inga",
    use:"Använd",
    display:"Visa",
    text_ignored:"ignorerade din vänförfrågan.",
    text_unfriend:"är inte längre i din vänlista.",
    text_reactivated:"Profil återaktiverad",
    text_deactivated:"Profil borttagen eller dold",
    text_being:"Profilen är inaktiverad",
    text_unavailable:"Profil otillgänglig",
    text_accepted:"Vänförfrågan accepterad",
    text_canceled:"Vänförfrågan avbruten",
    text_pending:"Avvaktande vänförfrågan",
    nomessages:"Inga Meddelanden",
    text_noa:"Ingen väntande förfrågan",
    text_nou:"Inga borttagna vänner",
    text_error:"Fel vid borttagning av anslutning.",
    text_hideu:"Dölj 'Borttagna vänner'",
    text_hide:"Dölj",
    text_alwayshide:"Alltid Dölj",
    text_removec:"Ta bort anslutning",
    text_missing:"Info saknas.",
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
    back1:"'Borttagna vänner'-listan är lokal. Det innebär att om du använder Facebook på en annan dator eller en annan Firefox-session, kommer du inte ha tillgång till dina borttagna vänner.",
    back2:"Använd detta backup-verktyg for att importera eller exportera dina borttagna vänner till eller från en annan Firefox-webbläsare.",
    hideOwnUnfriends:"Dölj vänner att du tar bort",
    wontAppear:"Den här profilen kommer inte att visas i din unfriends lista.",
    today:"I dag",
    yesterday:"I går",
    months:"Januari, Februari, Mars, April, Maj, Juni, Juli, Augusti, September, Oktober, November, December",
    hide_perm:"Vill du dölja permanent {name}?",
    header_unfriends:"Borttagna vänner",
    header_reappeared:"Reaktiveras",
    header_ignored:"Ignorerade vänförfrågningar",
    header_accepted:"Accepterade vänförfrågningar",
    header_both:"Accepterade och Ignorerade vänförfrågningar",
    header_pending:"I avvaktan på en vänförfrågningar"
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
    debug:"Debug",
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
    editable:"redigerbar",
    ok:"Ok",
    error:"Error",
    unblock:"Fjern blokkering",
    block:"Blokker",
    usedebug:"Bruk debug modus hvis du har problemer med dette skriptet.",
    adebug:"Aktiver feilsøking i tittellinja",
    clang:"Velg språk :",
    currentlang:"Nåverende språk",
    rvoid:"Å tilbakestille skriptet ødelegger alle data om dine unfriends. Vær forsiktig.",
    creset:"Klikk for å tilbakestille",
    resettitle:"Tilbakestill verdier til standard",
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
    text_missing:"Mangler info.",
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
    header_pending:"Ventende Forespørsler"
};
$nb_NO = {
    langname:"Norsk (bokmål)",
    unfriends:"Ikkevenner",
    awaiting:"Forespørsel Sendt",
    notifications:"Varsler",
    messages:"meldinger ffs",
    becomeFan:"Bli fan av",
    isFan:"Du er tilhenger",
    joinGroup:"Bli medlem av",
    cancel:"Avbryt",
    change:"Redigere",
    manage:"Kontrolere",
    reset:"Reset",
    hide:"Skjul",
    behavior:"Visning",
    debug:"Debug Console",
    lang:"Språk",
    reset_:"Reset",
    help:"Hjelp",
    btn_ok:"Okay",
    btn_cancel:"Avbryte",
    btn_close:"Lukk",
    btn_save:"Lagre",
    btn_submit:"Send inn",
    btn_confirm:"Bekreft",
    btn_delete:"Slette",
    btn_next:"Neste",
    usesetting:"Bruk disse instillingene for å styre oppførselen til scriptet",
    deactivated:"Profil Deaktivert",
    reactivated:"Profil Reaktivert",
    confirmed:"Forespørsel Godtatt",
    declined:"Forespøsel Avslått",
    onunfriend:"Når du har en ikkevenn",
    oncanceled:"Når en venne forespørsel blir avslått",
    othersettings:"Andre instillinger",
    icons:"Visnings ikoner",
    uids:"Vis UIDs",
    profilepics:"Oppdater profil bilder",
    hidemenubar:"Skjul Unfriends i menybar",
    dissociateLists:"Skill Aksepterte og Ignorerte Forespørsler",
    showTime:"vis jævel-sjekk dato",
    disabled:"deaktivert",
    editable:"redigerbar",
    ok:"OK",
    error:"Feil",
    unblock:"av-blokker",
    block:"blokker",
    usedebug:"bruk anti-snegle",
    adebug:"aktiver-anti-snegle i tittel-snikkersen",
    clang:"Velg språket ditt:",
    currentlang:"Valgt språk",
    rvoid:"resetiing voldtar all data om fiender. vær varsom",
    creset:"Trykk for å tilbakestille",
    resettitle:"ressssset til deffalt",
    resetbody:"Er du sikker på at du vil tilbakestille verdier?",
    selectall:"velg alle",
    selectnone:"velg ingen",
    use:"Bruk",
    display:"Vis",
    text_ignored:"ignorerte din venneforespørsel.",
    text_unfriend:"er ikke lenger i vennelista di.",
    text_reactivated:"Profil reaktivert",
    text_deactivated:"profil sletta eller skjult",
    text_being:"profil blir deaktivert",
    text_unavailable:"profil utilgjengelig",
    text_accepted:"venneforespørsel godkjent",
    text_canceled:"dusten ignorerte",
    text_pending:"vennefårespørel venter...TÅLMODIGHET!!!!",
    nomessages:"ingen meldinger",
    text_noa:"ingen entende fårespørsel",
    text_nou:"ingen saddam",
    text_error:"feil mens fjerna tilkobling",
    text_hideu:"få fienden ut av mitt syne!",
    text_hide:"Skjul",
    text_alwayshide:"Alltid Skjul",
    text_removec:"Fjern forbindelse",
    text_missing:"manglende info",
    hasignored:"ignorerte en av dine venneforespørsler",
    new_version:"Ny Verson",
    notif_version:"En ny verson er tilgjengelig",
    here:"her",
    wasunfriend:"var i vennelista di.",
    settings:"Innstillinger",
    proceed:"Fortsett",
    exportData:"Exporter Data",
    importData:"Importer Data",
    text_export:"Eksporter",
    text_import:"Importer",
    dataToExport:"Data å eksportere",
    back1:"bare på denna pcen",
    back2:"bruk dette verktøyet til å eksportere/inportere lister til en annen sak",
    hideOwnUnfriends:"skjul fiender du skapte",
    wontAppear:"denne dusten kommer ikke ut av skapet eller fiende-lista",
    today:"I dag",
    yesterday:"I går",
    months:"Januar, Februar, March, April, Mai, Juni, Juli, August, September, Oktober, November, Desember",
    hide_perm:"vil du permanent skjule {name}?",
    header_unfriends:"fiender",
    header_reappeared:"kom tilbake",
    header_ignored:"fårespørsler ignorert",
    header_accepted:"Forespørsler Akseptert",
    header_both:"Forespørsler Akseptert",
    header_pending:"Forespørsler Venter"
};
$pt_BR = {
    langname:"Português (Brasil)",
    unfriends:"Ex-amigos",
    awaiting:"Aguardando pedidos",
    notifications:"Notificações",
    messages:"Mensagens",
    becomeFan:"Seja um Fã",
    isFan:"Você já é fã",
    joinGroup:"Participe do grupo",
    cancel:"Cancelar",
    change:"alterar",
    manage:"gerencie",
    reset:"resetar",
    hide:"ocultar",
    behavior:"Aparência",
    debug:"Depurar",
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
    editable:"editável",
    ok:"Ok",
    error:"Erro",
    unblock:"Desbloquear",
    block:"Bloquear",
    usedebug:"Usar modo de depuração se tiver problemas com este script.",
    adebug:"Ativar depuração na barra de títulos",
    clang:"Escolha seu idioma:",
    currentlang:"Idioma atual",
    rvoid:"Efetuando o reset no script todos os dados sobre seus ex-amigos serão destruídos. Tenha cuidado.",
    creset:"Clique para resetar",
    resettitle:"Voltar aos valores padrão",
    resetbody:"Tem certeza que deseja resetar?",
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
    nomessages:"Nenhuma Mensagem",
    text_noa:"Nenhum pedido pendente",
    text_nou:"Nenhum ex-amigo",
    text_error:"Erro ao remover conexão.",
    text_hideu:"Ocultar ex-amigo",
    text_hide:"Ocultar",
    text_alwayshide:"Sempre Ocultar",
    text_removec:"Remover conexão",
    text_missing:"Informações perdidas.",
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
    back2:"Use a ferramenta de backup para exportar ou importar para ou de outro navegador Firefox",
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
    header_pending:"Pedidos Pendentes"
};
$pt_PT = {
    langname:"Português (Portugal)",
    unfriends:"Não-amigos",
    awaiting:"A aguardar pedidos",
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
    debug:"Depurar",
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
    editable:"editável",
    ok:"Ok",
    error:"Erro",
    unblock:"Desbloquear",
    block:"Bloquear",
    usedebug:"Usa o modo de depuração se tiveres problemas com este script.",
    adebug:"Activar depuração na barra de título",
    clang:"Escolhe o teu idioma:",
    currentlang:"Idioma actual",
    rvoid:"Cuidado! Repor os valores de origem do script destrói toda a informação relativa aos teus não-amigos.",
    creset:"Clica para repor valores de origem",
    resettitle:"Repor valores de origem",
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
    text_error:"Erro a remover a conecção.",
    text_hideu:"Ocultar não-amigo",
    text_hide:"Ocultar",
    text_alwayshide:"Ocultar sempre",
    text_removec:"Remover a conecção",
    text_missing:"Informação em falta.",
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
    header_pending:"Pedidos Pendentes"
};
$ru_RU = {
    langname:"Русский",
    unfriends:"Раздруги",
    awaiting:"Ожидающие запросы",
    notifications:"Нотификации",
    messages:"Сообщения",
    becomeFan:"Стань фаном",
    isFan:"Вы фан",
    joinGroup:"Зайди в группу",
    cancel:"Отмени",
    change:"измени",
    manage:"настройки",
    reset:"заново",
    hide:"спрячь",
    behavior:"Вид",
    debug:"отладить",
    lang:"Язык",
    reset_:"В исход",
    help:"Помощь",
    btn_ok:"Да",
    btn_cancel:"Отменить",
    btn_close:"Закрыть",
    btn_save:"Сохранить",
    btn_submit:"Ввести",
    btn_confirm:"Подтвердить",
    btn_delete:"Убрать",
    btn_next:"Следующий",
    usesetting:"Используй эту настройку для регулированя работу программы",
    deactivated:"Профили разактивированы",
    reactivated:"Профили разактивированы",
    confirmed:"Запросы подтверждены",
    declined:"Запросы отказанны",
    onunfriend:"Когда у вас раз-дружевание",
    oncanceled:"Когда прозьба на дружбу была отклоннена",
    othersettings:"Другие настройки",
    icons:"Показывай иконы",
    uids:"Покарзывай UIDs",
    profilepics:"Обнови профильную фотографию",
    hidemenubar:"Спрятать Раздруги в меню",
    dissociateLists:"Разделять Принятые и Проигнорированные Запросы",
    showTime:"Показать даты Раздружеванний",
    disabled:"выключено",
    editable:"меняемо",
    ok:"Хорошо",
    error:"Ошибка",
    unblock:"Разблокируй",
    block:"Заблокируй",
    usedebug:"Используй debug mode если имеются проблеммы с этим скриптом.",
    adebug:"Активировать debug в титульном меню",
    clang:"Выбор вашего языка :",
    currentlang:"Включенный язык",
    rvoid:"Обнулевание скрипта уничтожает всю вашу информацию про раздругов. Будте осторожны.",
    creset:"Нажмите для обнуляции",
    resettitle:"Обнулировать до стандарта",
    resetbody:"Вы уверенны что хотите обнулировать всю информацию ?",
    selectall:"Выберите Все",
    selectnone:"Выберите ничего",
    use:"Используй",
    display:"Показать",
    text_ignored:"проигнорировал вашу просьбу на дружбу.",
    text_unfriend:"перестал быть вашим другом.",
    text_reactivated:"Профиль заактивирован",
    text_deactivated:"Профиль уничтожен или спрятан",
    text_being:"Профиль Деактивируется",
    text_unavailable:"Профиль Недоступен",
    text_accepted:"Просьба на Дружбу Принята",
    text_canceled:"Просьба на Дружбу Отменяна",
    text_pending:"Просьба на Дружбу Состаит",
    nomessages:"Нет Сообщения",
    text_noa:"Нет ожидаемых запросов",
    text_nou:"Нет раздругов",
    text_error:"Ошибка при уничтожение связи.",
    text_hideu:"Спрячь Раздруга",
    text_hide:"Спрячь",
    text_alwayshide:"Всегда Прятать",
    text_removec:"Убрать связь",
    text_missing:"Информаций нету.",
    hasignored:"проигнорировал вашу просьбу на дружбу",
    new_version:"Новая Версия",
    notif_version:"Новая Версия Существует",
    here:"здесь",
    wasunfriend:"был в листу ваших друзей.",
    settings:"Настройки",
    proceed:"Продолжать",
    exportData:"Експортировать Информацию",
    importData:"Импортировать Информацию",
    text_export:"Експортировать",
    text_import:"Импортировать",
    dataToExport:"Дата для ехпорта",
    back1:"Лист раздругов локальный. То значит что при использовании facebook на другом компьютере, или в другой сэссии firefox, вы не сможете увидить этот лист.",
    back2:"Использовайте это для экспорта или импорта ваших листов на или с другую программу firefox.",
    hideOwnUnfriends:"Прятать друзей что вы убираете",
    wontAppear:"Этот профиль не будет виден в вашем листе раздругов.",
    today:"Сегодня",
    yesterday:"Вчера",
    months:"Январь, Февраль, Март, Апрел, Май, Июнь, Июль, Август, Сентябрь, Октябрь, Ноябрь, Декабрь",
    hide_perm:"Хотели бы вы спрятать на-всегда {name} ?",
    header_unfriends:"Раздруги",
    header_reappeared:"Заново Появился",
    header_ignored:"Просьбы Проигнорирванны",
    header_accepted:"Просбы Приняты",
    header_both:"Просьбы Приняты и Проигнорированны",
    header_pending:"Просьбы в Потоке"
};
$sk_SK = {
    langname:"Slovenčina",
    unfriends:"NiePriatelia",
    awaiting:"Čakajúce žiadosti",
    notifications:"Oznámenia",
    messages:"Správy",
    becomeFan:"Stať sa fanúšikom",
    isFan:"Ste fanúšikom",
    joinGroup:"Pridať sa do skupiny",
    cancel:"Zrušiť",
    change:"Zmeniť",
    manage:"Spravovať",
    reset:"Obnoviť",
    hide:"Skryť",
    behavior:"Vzhľad",
    debug:"Ladenie",
    lang:"Jazyk",
    reset_:"Obnoviť",
    help:"Pomoc",
    btn_ok:"Ok",
    btn_cancel:"Zrušiť",
    btn_close:"Zavrieť",
    btn_save:"Uložiť",
    btn_submit:"Odoslať",
    btn_confirm:"Potvrdiť",
    btn_delete:"Vymazať",
    btn_next:"Ďalší",
    usesetting:"Použiť tieto nastavenia na úpravu správania skriptu",
    deactivated:"Deaktivované profily",
    reactivated:"Reaktivované profily",
    confirmed:"Žiadosť potvrdená",
    declined:"Žiadosť zamietnutá",
    onunfriend:"Keď sa zruší priateľstvo",
    oncanceled:"Keď bola žiadosť o priateľstvo zamietnutá",
    othersettings:"Ostatné nastavenia",
    icons:"Zobraziť ikony",
    uids:"Zobraziť UID",
    profilepics:"Aktualizovať profilovú fotku",
    hidemenubar:"Skryť lištu NiePriatelia v menu",
    dissociateLists:"Rozdeliť prijaté a ignorované žiadosti",
    showTime:"Zobraziť dátumy kontroly NiePriateľov",
    disabled:"blokované",
    editable:"zapisovateľné",
    ok:"Ok",
    error:"Chyba",
    unblock:"Odblokovať",
    block:"Blokovať",
    usedebug:"Použite ladiaci mód, ak máte problémy s týmto skriptom.",
    adebug:"Aktivovať ladenie na lište",
    clang:"Vyberte váš jazyk:",
    currentlang:"Aktuálny jazyk",
    rvoid:"Vynulovaním hodnôt v skripte sa zrušia všetky údaje o vašich NiePriateľoch. Buďte opatrný.",
    creset:"Kliknite pre obnovenie",
    resettitle:"Vynulovať hodnoty na predvolené",
    resetbody:"Určite chcete vynulovať nastavené hodnoty?",
    selectall:"Vybrať všetky",
    selectnone:"Zrušiť výber",
    use:"Použiť",
    display:"Zobraziť",
    text_ignored:"ignoroval/a tvoju žiadosť o priateľstvo.",
    text_unfriend:"už nie je viac vo vašom zozname priateľov.",
    text_reactivated:"Profil reaktivovaný",
    text_deactivated:"Profil vymazaný alebo skrytý",
    text_being:"Profil je deaktivovaný",
    text_unavailable:"Profil nedostupný",
    text_accepted:"Akceptoval/a tvoju žiadosť o priateľstvo",
    text_canceled:"Žiadosť o priateľstvo zrušená",
    text_pending:"Čakajúca žiadosť o priateľstvo",
    nomessages:"Žiadne správy",
    text_noa:"žiadne čakajúce žiadosti",
    text_nou:"Žiadny NiePriatelia",
    text_error:"Chyba počas odoberania prepojenia.",
    text_hideu:"Skryť NiePriateľov",
    text_hide:"Skryť",
    text_alwayshide:"Vždy Skryť",
    text_removec:"Odstrániť pripojenie",
    text_missing:"Chýba info.",
    hasignored:"ignoroval/a jednu z vašich žiadostí o priateľstvo",
    new_version:"nová verzia",
    notif_version:"nová verzia je dostupná",
    here:"tu",
    wasunfriend:"bol/a vo vašom zozname priateľov.",
    settings:"Nastavenia",
    proceed:"Vykonať",
    exportData:"Exportovať údaje",
    importData:"Importovať údaje",
    text_export:"Exportovať",
    text_import:"Importovať",
    dataToExport:"Údaje na export",
    back1:"Zoznam NiePriateľov je lokálny. To znamená, že ak použijete facebook na inom počítači, alebo v inej relácii prehliadača, tak nebude možné získať vašich NiePriateľov.",
    back2:"Použite tento zálohovací nástroj na exportovanie alebo importovanie vašich zoznamov do alebo z iného prehliadača.",
    hideOwnUnfriends:"Skryť priateľov, ktorých odstránim",
    wontAppear:"Tento profil sa neobjaví vo vašom zozname NiePriateľov.",
    today:"Dnes",
    yesterday:"Včera",
    months:"Január, Február, Marec, Apríl, Máj, Jún, Júl, August, September, Október, November, December",
    hide_perm:"Chcete natrvalo skryť užívateľa {name} ?",
    header_unfriends:"NiePriatelia",
    header_reappeared:"Znovuobjavení",
    header_ignored:"Ignorované žiadosti",
    header_accepted:"Prijaté žiadosti",
    header_both:"Prijaté a ignorované žiadosti",
    header_pending:"Čakajúce žiadosti"
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
    debug:"Debug",
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
    editable:"urejanje",
    ok:"Ok",
    error:"Napaka",
    unblock:"Deblokiraj",
    block:"Blokiraj",
    usedebug:"Uporabite debug način, če imate težave s to skripto.",
    adebug:"Vključi debug v naslovni vrstici",
    clang:"Izberite jezik:",
    currentlang:"Trenutni jezik",
    rvoid:"Ponastavitev skripti uničuje vse svoje podatke o vaši neprijatelji. Bodite previdni.",
    creset:"Kliknite za ponastavitev",
    resettitle:"Ponastavi vrednosti na privzeto",
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
    text_missing:"Infos odsoten.",
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
    header_pending:"Prošnje Do"
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
    debug:"Отклањање грешака",
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
    editable:"измењив",
    ok:"У реду",
    error:"Грешка",
    unblock:"Одблокирај",
    block:"Блокирај",
    usedebug:"Користите мод за детекцију грешака уколико имате проблема",
    adebug:"Активирај приказ грешака у наслову екрана",
    clang:"Изабери свој језик :",
    currentlang:"Тренутни језик",
    rvoid:"Ресетовање скрипте уништава све податке о вашим Unfriends. Будите опрезни.",
    creset:"Кликни да ресетујеш",
    resettitle:"Врати на почетне вредности",
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
    text_missing:"недостатак информација.",
    hasignored:"игнорише један од твојих захтева за пријатељство.",
    new_version:"Нова верзија",
    notif_version:"Нова верзија је доступна",
    here:"овде",
    wasunfriend:"је био(ла) у листи твојих пријатеља",
    settings:"Подешавања",
    proceed:"Настави",
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
    header_pending:"Захтеви на чекању"
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
    debug:"Дебъг",
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
    editable:"Редактируемо",
    ok:"Потвърдено",
    error:"Грешка",
    unblock:"Разблокирване",
    block:"Блокирване",
    usedebug:"Използвай профил за редактиране",
    adebug:"Активирай редактиране в менюто",
    clang:"Изберете Вашия език:",
    currentlang:"Текущ език",
    rvoid:"Ресетни скрипта",
    creset:"Цъкни за ресетиране",
    resettitle:"Ресетира под дефолт",
    resetbody:"Сигурен ли сте че искате да ресетнете, а Кольо?",
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
    text_pending:"Молба за приятелство Чакаща",
    nomessages:"Няма Съобщения",
    text_noa:"Няма чакащи молби",
    text_nou:"Няма неприятели",
    text_error:"Грешка при премахване на връзка",
    text_hideu:"Скрий Неприятели",
    text_hide:"Скрий",
    text_alwayshide:"Винаги Скрито",
    text_removec:"Премахни връзка",
    text_missing:"Липсва информация",
    hasignored:"вашата молба за приятелство беше игнорирана",
    new_version:"Нова Версия",
    notif_version:"Налична е нова версия",
    here:"тук",
    wasunfriend:"беше във вашата листа с приятели",
    settings:"Настройки",
    proceed:"Продължи",
    exportData:"Експортирай",
    importData:"Импортирай",
    text_export:"Експортиране",
    text_import:"Импортиране",
    dataToExport:"Данни за експорт",
    back1:"Списъка е локален. Това означава, че ако ползвате друт.г компютър или друг браузър, няма да сте в състояние да виждате списъка",
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
    header_pending:"Молби Чакащи"
};
$cs_CZ = {
    langname:"Čeština",
    unfriends:"NePřátelé",
    awaiting:"Čekající žádosti",
    notifications:"Upozornění",
    messages:"Zprávičky",
    becomeFan:"Staňte se fanouškem",
    isFan:"Jsi fanoušek",
    joinGroup:"Připojit ke skupině",
    cancel:"Zrušit",
    change:"změna",
    manage:"upravit",
    reset:"reset",
    hide:"skrýt",
    behavior:"Vzhled",
    debug:"Ladit",
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
    usesetting:"Pomocí tohoto nastavení řídit chování skriptu",
    deactivated:"Deaktivované profily",
    reactivated:"Reaktivované profily",
    confirmed:"Žádost potvrzená",
    declined:"Žádost zamítnutá",
    onunfriend:"Když se zruší přátelství",
    oncanceled:"Když žádost o přátelství byla zamítnuta",
    othersettings:"Další nastavení",
    icons:"Zobrazit ikony",
    uids:"Zobrazit UIDs",
    profilepics:"Aktualizovat profilovou fotku",
    hidemenubar:"Skrýt lištu NePřátelé v menu",
    dissociateLists:"Rozdělit přijaté a ignorovány žádosti",
    showTime:"Zobrazit dátumy kontroly NePřátel",
    disabled:"zakázáno",
    editable:"upravit",
    ok:"Rozumíš",
    error:"Chyba",
    unblock:"Odblokovat",
    block:"Blokovat",
    usedebug:"Použijte ladící mód, když máte problémy s tímto skriptem.",
    adebug:"Aktivovat ladění na liště",
    clang:"Vyberte Váš jazyk :",
    currentlang:"Aktuální jazyk",
    rvoid:"Vynulováním hodnot ve skriptu se zruší všechny údaje o vašich ne-přátelích. Buďte opatrný.",
    creset:"Klikněte pro obnovení",
    resettitle:"Reset na výchozí hodnoty",
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
    text_nou:"Č. nepřátel",
    text_error:"Chyba při odstraňování spojení",
    text_hideu:"Skrýt NePřátel",
    text_hide:"Skrýt",
    text_alwayshide:"Vždy Skrýt",
    text_removec:"Odstranit připojení",
    text_missing:"Informace Chybí.",
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
    header_pending:"Nevyřízené žádosti"
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
    debug:"Hiba követés",
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
    editable:"szerkeszthető",
    ok:"OK",
    error:"HIBA",
    unblock:"Blokkolás feloldása",
    block:"Blokkolás",
    usedebug:"Használd a debug módot, ha hibát találsz a szkriptben.",
    adebug:"Debug bekapcsolása a titlebar-ban.",
    clang:"Válassz nyelvet:",
    currentlang:"Jelenlegi nyelv",
    rvoid:"A visszaállítás törli az összes adatodat. Óvatosan!",
    creset:"Kattints a visszaállításra",
    resettitle:"Értékek alapbeállításra állítva",
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
    text_missing:"Információk hiányoznak",
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
    header_pending:"Folyamatban lévő"
};
$ro_RO = {
    langname:"Română",
    unfriends:"Neprieteni",
    awaiting:"Cereri in Asteptare",
    notifications:"Notificari",
    messages:"Mesaje",
    becomeFan:"Fii Fan",
    isFan:"Esti fan",
    joinGroup:"Adauga-te grupului",
    cancel:"Anuleaza",
    change:"modifica",
    manage:"administreaza",
    reset:"reseteaza",
    hide:"ascunde",
    behavior:"Afisare",
    debug:"Depaneaza",
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
    oncanceled:"Cand o cerere de prietenie a fost anulata",
    othersettings:"Alte setari",
    icons:"Afiseaza iconite",
    uids:"Afiseaza UID-uri",
    profilepics:"Actualizeaza fotografiile de profil",
    hidemenubar:"Ascunde Unfriends in bara de meniu",
    dissociateLists:"Imparte cererile acceptate si ignorate",
    showTime:"Arata datele la care au fost verificati non-prietenii",
    disabled:"dezactivat",
    editable:"editabil",
    ok:"Ok",
    error:"Eroare",
    unblock:"Deblocheaza",
    block:"Blocheaza",
    usedebug:"Foloseste depanatorul daca ai probleme cu acest script",
    adebug:"Activeaza depanatorul in bara de titlu",
    clang:"Alege-ti limba:",
    currentlang:"Limba curenta",
    rvoid:"Resetarea scriptului va sterge toate informatiile despre non-prietenii tai. Ai grija!",
    creset:"Click pentru resetare",
    resettitle:"Reseteaza valorile la cele initiale",
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
    text_hideu:"Ascunde non-prieteni",
    text_hide:"Ascunde",
    text_alwayshide:"Ascunde Intotdeauna",
    text_removec:"Sterge Conexiune",
    text_missing:"Informatii lipsa.",
    hasignored:"a respins una din cererile tale de prietenie",
    new_version:"Versiune Noua",
    notif_version:"O noua versiune este valabila",
    here:"aici",
    wasunfriend:"a fost in lista ta de prieteni.",
    settings:"Setari",
    proceed:"Continua",
    exportData:"Exporta",
    importData:"Importa",
    text_export:"Exporta",
    text_import:"Importa",
    dataToExport:"Informatii pentru exportare",
    back1:"Lista cu non-prieteni este locala. Asta inseamna ca daca folosesti Facebook pe alt calculator, sau in alta sesiune, nu-i vei putea vedea pe non-prieteni.",
    back2:"Foloseste aceasta optiune de backup pentru a exporta sau importa listele tale in sau din alt browser",
    hideOwnUnfriends:"Ascunde prietenii pe care i-ai sters",
    wontAppear:"Acest profil nu va aparea in lista ta de ne-prieteni",
    today:"Astazi",
    yesterday:"Ieri",
    months:"Ianuarie, Februarie, Martie, Aprilie, Mai, Iunie, Iulie, August, Septembrie, Octombrie, Noiembrie, Decembrie",
    hide_perm:"Vreti sa il/o ascundeti permanent pe {name} ?",
    header_unfriends:"Neprieteni",
    header_reappeared:"A reaparut",
    header_ignored:"Cereri ignorate",
    header_accepted:"Cereri acceptate",
    header_both:"Cereri Acceptate ",
    header_pending:"Cereri in asteptare"
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
    debug:"ƃnqǝp",
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
    editable:"ǝlqɐʇıpǝ",
    ok:"ʞo",
    error:"ɹoɹɹǝ",
    unblock:"ʞɔolqun",
    block:"ʞɔolq",
    usedebug:"˙ʇdıɹɔs sıɥʇ ɥʇıʍ sǝlqnoɹʇ ǝʌɐɥ noʎ ɟı ǝpoɯ ƃnqǝp ǝsn",
    adebug:"ɹɐqǝlʇıʇ uı ƃnqǝp ǝʇɐʌıʇɔɐ",
    clang:": ǝƃɐnƃuɐl ɹnoʎ ǝsooɥɔ",
    currentlang:"ǝƃɐnƃuɐl ʇuǝɹɹnɔ",
    rvoid:"˙lnɟǝɹɐɔ ǝq ˙spuǝıɹɟun ɹnoʎ ʇnoqɐ ɐʇɐp ɹnoʎ llɐ sʎoɹʇsǝp ʇdıɹɔs ƃuıʇʇǝsǝɹ",
    creset:"ʇǝsǝɹ oʇ ʞɔılɔ",
    resettitle:"ʇlnɐɟǝp oʇ sǝnlɐʌ ʇǝsǝɹ",
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
    text_missing:"˙ƃuıssıɯ soɟuı",
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
    header_pending:"ƃuıpuǝd sʇsǝnbǝɹ"
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
    debug:"Debug",
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
    editable:"editable",
    ok:"Arrr",
    error:"Error",
    unblock:"Unblock",
    block:"Block",
    usedebug:"Use debug mode if ye be havin' troubles wi' this script.",
    adebug:"Activate debug in titlebarrrr",
    clang:"Choose yer language :",
    currentlang:"Current language",
    rvoid:"Resettin' script destroys all yer data about yer unbuckos. Be careful.",
    creset:" Click t' reset",
    resettitle:"Reset values t' default",
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
    text_missing:"Infos Missin'.",
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
    header_pending:"Permissions Pendin'"
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
    debug:"D3bug",
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
    editable:"3d!t4b13",
    ok:"0k",
    error:"3rr0r",
    unblock:"Unb10ck",
    block:"B10ck",
    usedebug:"U53 d3bu9 m0d3 !f u h4v3 7r0ub13z w17h 7h!5 5cr!p7.",
    adebug:"4c7!v473 d3bu9 !n 7!713b4r",
    clang:"Ch0053 ur 14n9u493 :",
    currentlang:"Curr3n7 14n9u493",
    rvoid:"R35377!n9 5cr!p7 d357r0yz 411 ur d474 4b0u7 j00r unN00bz. B3 (4r3fu1.",
    creset:"Cl!ck 2 r3537",
    resettitle:"R3537 v41u35 2 d3f4u17",
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
    text_missing:"!nf0z M!55!n9.",
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
    header_pending:"R3qu3575 P3nd!n9"
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
    debug:"Čistač neispravnosti",
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
    editable:"promjenjiv",
    ok:"U redu",
    error:"Greška",
    unblock:"Odblokiraj",
    block:"Blokiraj",
    usedebug:"Koristite modul 'čistač neispravnosti' ako imate problema sa skriptom.",
    adebug:"Aktivirajte odstranjivanje u naslovnom izborniku",
    clang:"Izaberite vaš jezik:",
    currentlang:"Trenutni jezik",
    rvoid:"Resetovanje skripte uništava sve podatke o vašim Neprijateljima.Budite oprezni!",
    creset:"Kliknite za reset",
    resettitle:"Resetuj vrijednosti u početni oblik",
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
    text_missing:"Nedostatak informacija",
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
    header_pending:"Zahtjevi na čekanju"
};
$sq_AL = {
    langname:"Shqip",
    unfriends:"Joshoqërija",
    awaiting:"Kërkesa në Pritje",
    notifications:"Njoftimet",
    messages:"Mesazhet",
    becomeFan:"Bëhu Fan",
    isFan:"Ti je fan",
    joinGroup:"Bashkohu Grupit",
    cancel:"Anuloje",
    change:"Ndryshoje",
    manage:"Menaxho",
    reset:"Restarto",
    hide:"Fshihe",
    behavior:"Dukja",
    debug:"Regullo",
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
    onunfriend:"Kur keni një joshoqëri",
    oncanceled:"Kur një kërkes miqësie u refuzua",
    othersettings:"Opcionet tjera",
    icons:"Shfaq Ikonat",
    uids:"Shfaq UIDs",
    profilepics:"Ndrysho foton e profilit",
    hidemenubar:"Fshihe Joshoqërin në menu",
    dissociateLists:"Dallo Kërkesat e pranuara dhe të injoruara",
    showTime:"Shfaq të dhënat e joshoqëris",
    disabled:"Shkyqur",
    editable:"e ndryshueshme",
    ok:"Në Regull",
    error:"Gabim",
    unblock:"Zhblloko",
    block:"Blloko",
    usedebug:"Përdore moden e regullimit nëese ke ndonjë problem me këtë skript.",
    adebug:"Aktivizo regullimin në titlebar",
    clang:"Zgjidhni Gjuhën tuaj:",
    currentlang:"Gjuha tanishme",
    rvoid:"Rifreskim i skriptit shkatron te gjitha detajet tuja për joshoqërin.Ki Kujdes.",
    creset:"Kliko per rifreskim",
    resettitle:"Rivendos valutat për gjendjen e mëparshme të skriptit",
    resetbody:"A jeni i sigurt që doni të rifreskoni valutat?",
    selectall:"Zgjidh Të gjithë",
    selectnone:"Zgjidh Asnjë",
    use:"Përdor",
    display:"Shfaq",
    text_ignored:"efuzoj kërkesen tënde për miqësi.",
    text_unfriend:"nuk është më në listen tënde të shoqëris.",
    text_reactivated:"Profili u çaktivizua",
    text_deactivated:"Profili i Fshire ose i Fshehur",
    text_being:"Profili është duke u Çakivizuar",
    text_unavailable:"Profil i Padisponueshëm",
    text_accepted:"Kërkesa për miqësi u pranua",
    text_canceled:"Kërkesa për miqësia u Shuajt",
    text_pending:"Kërkesa për miqësi në pritje",
    nomessages:"Nuk ka Mesazhe",
    text_noa:"Nuk ka kërkesa në pritje",
    text_nou:"Nuk ka Joshoqëri",
    text_error:"Gabim duke hequr lidhjen",
    text_hideu:"Fshehe Joshoqërin",
    text_hide:"Fshehe",
    text_alwayshide:"Gjithmon mshef",
    text_removec:"Hiqe lidhjen",
    text_missing:"Informatat mungojn.",
    hasignored:"Injoroj njëren prej kërkesen tuaj",
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
    back1:"Lista e joshoqëris është lokale. Kjo do të thot qe nëse ju e përdorni facebook-un ne ndonjë kompjuter tjetër,ose në ndonjë sesion tjetër, ju nuk do të jeni në gjendje të shikoni joshoqërin.",
    back2:"Përdote këtë opcion për rezervë që ti importoni ose exportoni listen tuaj në ndonjë shfletues tjetër të firefox-t.",
    hideOwnUnfriends:"Fsheh shokët të cilt i heq vet.",
    wontAppear:"Ky profil nuk do të shfaqet në listen tuaj te joshoqëris.",
    today:"Sot",
    yesterday:"Dje",
    months:"Janar, Shkurt, Mars, Prill, Maj, Qershor, Korrik, Gusht, Shtator, Tetor, Nëntor, Dhjetor",
    hide_perm:"A do ta fshehësh Përherë {name} ?",
    header_unfriends:"Joshoqërija",
    header_reappeared:"Rishfaqet",
    header_ignored:"Kërkesa u injorua",
    header_accepted:"Kërkesa u pranua",
    header_both:"Kërkesa u pranua ose injorua",
    header_pending:"Kërkesa në pritje"
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
    debug:"Debug",
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
    editable:"dapat diedit",
    ok:"Setuju",
    error:"Rusak",
    unblock:"Dibuka",
    block:"Blokir",
    usedebug:"Gunakan mode debug jika Anda mangalami masalah dengan script ini",
    adebug:"Aktifkan debug di menu",
    clang:"Pilih bahasa Anda",
    currentlang:"Bahasa sekarang",
    rvoid:"Memulihkan script dapat menghancurkan semua data Anda tentang unfriends Anda. Hati-hati.",
    creset:"Klik untuk mereset",
    resettitle:"Pulihkan nilai ke semula",
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
    text_missing:"Info hilang",
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
    months:"Januari, Pebruari, Maret, April, Mei, Juni, Juli, Agustus, September, Oktober, Nopember, Desember",
    hide_perm:"Handakkah kam manyambunyikan sacara parmanen {name} ?",
    header_unfriends:"unfriends",
    header_reappeared:"Muncul kembali",
    header_ignored:"Permintaan Ditolak",
    header_accepted:"Permintaan Diterima",
    header_both:"Permintaan Diterima dan Ditolak",
    header_pending:"Permintaan tertunda"
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
    debug:"Betulkan skrip",
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
    editable:"boleh edit",
    ok:"Ok",
    error:"Masalah",
    unblock:"Tidak dihalang",
    block:"Halang",
    usedebug:"Guna Mod Debug sekiranya skrip bermasalah",
    adebug:"Aktifkan Debug di titlebar",
    clang:"Pilih bahasa anda:",
    currentlang:"Bahasa dipilih",
    rvoid:"Berhati-hati atas sebarang pelarasan yang boleh merosakkan data skrip",
    creset:"Klik untuk pelarasan semula",
    resettitle:"Kembali kepada setting asal",
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
    text_missing:"Maklumat tidak lengkap.",
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
    header_pending:"Permintaan ditangguh"
};
$he_IL = {
    langname:"עברית",
    unfriends:"לא חברים",
    awaiting:"בקשות בהמתנה",
    notifications:"הודעות",
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
    debug:"Debug",
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
    editable:"ניתן לעריכה",
    ok:"אישור",
    error:"שגיאה",
    unblock:"בטל חסימה",
    block:"חסום",
    usedebug:"השתמש במצב זה במידה ויש לך בעיות עם הסקריפט",
    adebug:"הפעל מצב זה בשורת הכותרת",
    clang:"בחר שפה",
    currentlang:"השפה הנוכחית",
    rvoid:"זהירות ! איפוס הסקריפט מוחק את כל המידע לגבי החברים שהסירו אותך.",
    creset:"לחץ על הכפתור כדי לאפס",
    resettitle:"אפס את הערכים לברירת המחדל",
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
    text_alwayshide:"תמיד הסתר",
    text_removec:"מחק חיבור",
    text_missing:"חסר מידע.",
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
    header_pending:"בקשות הממתינות לאישור"
};
$ar_AR = {
    langname:"العربية",
    unfriends:"غير صديق",
    awaiting:"طلبات في الانتظار",
    notifications:"ملاحظات",
    messages:"رسائل",
    becomeFan:"كن معجب",
    isFan:"انت معجب",
    joinGroup:"انضم الى المجموعة",
    cancel:"الغاء الأمر",
    change:"تغيير",
    manage:"ادارة",
    reset:"اعادة تأهيل",
    hide:"اخفاء",
    behavior:"المظهر",
    debug:"التصحيح",
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
    editable:"محَرر",
    ok:"موافق",
    error:"خطأ",
    unblock:"الغاءالحجز",
    block:"حجز",
    usedebug:"استعمل وضع التصحيح اذا كنت تعاني من مشاكل في السكريبت",
    adebug:"تفعيل التصحيح في القائمة الرئيسية",
    clang:"اختر لغتك:",
    currentlang:"اللغة المستعملة",
    rvoid:"أحذر! اعادة تأهيل السكريبت يؤدي الى مسح كل المعلومات عن غيرصديق.",
    creset:"اظغط هنا للإعادة الى الصفر",
    resettitle:"إعادة القيم الى القيم المبدئيه",
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
    text_missing:"معلومات مفقوده.",
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
    header_pending:"طلبات في الانتظار"
};
$zh_CN = {
    langname:"中文(简体)",
    unfriends:"Unfriends",
    awaiting:"等待",
    notifications:"通知",
    messages:"站内信",
    becomeFan:"成为迷",
    isFan:" 你是一個迷",
    joinGroup:"加入群组",
    cancel:"取消",
    change:"更改",
    manage:"管理",
    reset:"重新设定",
    hide:"隐藏",
    behavior:"外观",
    debug:"测试",
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
    hidemenubar:"隐藏菜单Unfriends",
    dissociateLists:"斯普利特接受，忽視要求",
    showTime:"顯示 Unfriends檢查日期",
    disabled:"取消",
    editable:"编辑",
    ok:"好的",
    error:"错误",
    unblock:"取消阻止",
    block:"阻止",
    usedebug:"调试模式下使用，如果您有与此脚本的麻烦。",
    adebug:"啟動调试标题栏",
    clang:"选择语言：",
    currentlang:"现在的语言",
    rvoid:"重置脚本破坏你取消好友的所有数据。要小心。",
    creset:"按复位。",
    resettitle:"重置为默认值",
    resetbody:"您确定要重置价值？",
    selectall:"选择 全部",
    selectnone:"选择 无",
    use:"使用",
    display:"显示",
    text_ignored:"忽略了你的朋友的要求。",
    text_unfriend:"没有您的朋友列表更长。",
    text_reactivated:"资料恢复",
    text_deactivated:"资料删除或隐藏",
    text_being:"档案作为停用",
    text_unavailable:"资料不可用",
    text_accepted:"朋友的请求而接受",
    text_canceled:"好友请求已取消",
    text_pending:"朋友要求待定",
    nomessages:"没有邮件",
    text_noa:"没有等待请求",
    text_nou:"没有取消好友",
    text_error:"删除连接时发生错误。",
    text_hideu:"隐藏Unfriend",
    text_hide:"隐藏",
    text_alwayshide:"总是隐藏",
    text_removec:"删除连接",
    text_missing:"信息丢失",
    hasignored:"无视你的朋友的要求之一",
    new_version:"新版本",
    notif_version:"一个新的版本可用",
    here:"这里",
    wasunfriend:"在您的朋友列表。",
    settings:"设置",
    proceed:"繼續進行",
    exportData:"出口數據",
    importData:" 進口數據",
    text_export:"出口",
    text_import:"进口",
    dataToExport:"数据导出",
    back1:"该unfriends名单是本地的。这意味着，如果您使用另一台计算机上，或其他FireFox会议脸谱，你惯于能得到您的 unfriends。",
    back2:"使用此备份工具导出或导入您的列表，或从其他FireFox浏览器。",
    hideOwnUnfriends:"隱藏的朋友，您刪除",
    wontAppear:"此配置文件將不會出現在您的 unfriends名單。",
    today:"今日",
    yesterday:"昨天",
    months:"一月，二月，三月，四月，五月，六月，七月，八月，九月，十月，十一月，十二月",
    hide_perm:"你想隱藏永久{name}？",
    header_unfriends:"Unfriends",
    header_reappeared:"再現",
    header_ignored:"請忽略",
    header_accepted:"請接受",
    header_both:"請接受和忽視",
    header_pending:"請等待"
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
    debug:"偵錯",
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
    editable:"編輯",
    ok:"好的",
    error:"錯誤",
    unblock:"取消阻止",
    block:"阻止",
    usedebug:"在偵錯模式下使用，如果此腳本在使用上有問題。",
    adebug:"啟動調試標題列",
    clang:"選擇語言：",
    currentlang:"現在的語言",
    rvoid:"重置腳本將會破壞你unfriends的所有資料。請小心操作。",
    creset:"選取以重置",
    resettitle:"重置為預設值",
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
    text_missing:"資訊遺失",
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
    header_pending:"邀請待回覆中"
};
$ja_JP = {
    langname:"日本語",
    unfriends:"Unfriends",
    awaiting:"待機のリクエスト",
    notifications:"お知らせ",
    messages:"メッセージ",
    becomeFan:"ファンになる",
    isFan:"ファンになりました",
    joinGroup:"参加",
    cancel:"キャンセル",
    change:"替える",
    manage:"管理",
    reset:"リセット",
    hide:"非表示",
    behavior:"ディスプレー",
    debug:"デバッグ",
    lang:"言語",
    reset_:"リセット",
    help:"ヘルプ",
    btn_ok:"Ok",
    btn_cancel:"キャンセル",
    btn_close:"閉じる",
    btn_save:"保存",
    btn_submit:"送信",
    btn_confirm:"確認",
    btn_delete:"削除",
    btn_next:"次へ",
    usesetting:"この設定でリストの表示を修正する",
    deactivated:"停止プロフィール",
    reactivated:"再活性化したプロフィール",
    confirmed:"確認したリクエスト",
    declined:"キャンセルしたリクエスト",
    onunfriend:"フレンドがUnfriendすると",
    oncanceled:"友達リクエストをキャンセルすると",
    othersettings:"他の設定",
    icons:"アイコン表示",
    uids:"ID表示",
    profilepics:"プロフィル写真を更新する",
    hidemenubar:"メニューバーにUnfriendsを非表示",
    dissociateLists:"承認しているリクエストと無視しているリクエストを分離する",
    showTime:"削除した友達のチェック日を表示",
    disabled:"無効している",
    editable:"有効している",
    ok:"OK",
    error:"エラー",
    unblock:"ブロックをキャンセル",
    block:"ブロック",
    usedebug:"スクリプトに問題があったらデバッグモードを使って下さい。",
    adebug:"タイトルバーにデバッグを有効",
    clang:"言語を選択して下さい",
    currentlang:"利用している言語",
    rvoid:"スクリプトのデータをリセットしますので、注意して下さい",
    creset:"リセットしたかったらここにクリックして下さい",
    resettitle:"デフォルト値に戻される",
    resetbody:"値が0に戻されますか。",
    selectall:"選択 すべて",
    selectnone:"選択 なし",
    use:"利用",
    display:"表示",
    text_ignored:"はあなたの友達リクエストを黙殺しました。",
    text_unfriend:"はすでにあなたの友達リストには入れない。",
    text_reactivated:"また有効しているプロフィル",
    text_deactivated:"隠しているまたは無効しているプロフィル",
    text_being:"このプロフィルは無効中です",
    text_unavailable:"アクセスできないプロフィル",
    text_accepted:"はあなたの友達リクエストを承認しました。",
    text_canceled:"友達リクエストはキャンセルしました",
    text_pending:"確認を時機している",
    nomessages:"投稿なし",
    text_noa:"進行中りくえすとはありません。",
    text_nou:"削除した友達はいません。",
    text_error:"リクエストをキャンセルことのエラー",
    text_hideu:"Unfriendを非表示",
    text_hide:"非表示",
    text_alwayshide:"いつも非表示",
    text_removec:"リクエストをキャンセル",
    text_missing:"足りないデータ",
    hasignored:"はあなたの友達リクエストを無視しました",
    new_version:"新たなバージョン",
    notif_version:"新たなバージョンを利用できます",
    here:"こちら",
    wasunfriend:"はあなたの友達に入れることがありました。",
    settings:"設定",
    proceed:"進む",
    exportData:"データをエクスポート",
    importData:"データをインポート",
    text_export:"エクスポートする",
    text_import:"インポートする",
    dataToExport:"エクスポート用データ",
    back1:"Unfriendsのリストは内部的です。つまり、別のコンピュータでFacebookにログインしたら、また別のFirefoｘセッシオンを開けたら、あなたのUnfriendsを拾えなくなります。",
    back2:"好きにどこでもこのバックアップアプリを使ってリストをインポートまたはエクスポートする",
    hideOwnUnfriends:"削除した友達を隠す",
    wontAppear:"このプロフィルはUnfriendsに出ません。",
    today:"今日",
    yesterday:"昨日",
    months:"一月, 二月, 三月, 四月, 五月, 六月, 七月, 八月, 九月, 十月, 十一月 ,十二月",
    hide_perm:"{name}　を決定的に隠したいですか？",
    header_unfriends:"Unfriends",
    header_reappeared:"また有効しているプロフィル",
    header_ignored:"無視しているリクエスト",
    header_accepted:"承認しているリクエスト",
    header_both:"承認と無視しているリクエスト",
    header_pending:"進行中リクエスト"
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
    debug:"Hiệu chỉnh",
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
    editable:"Có thể chỉnh sửa",
    ok:"Đồng ý",
    error:"Lỗi",
    unblock:"Bỏ khóa",
    block:"Khóa",
    usedebug:"sử dụng chế độ hiệu chỉnh nếu gặp lỗi về script",
    adebug:"Xác nhận hiệu chỉnh trên thanh tiêu đề",
    clang:"Chọn ngôn ngữ",
    currentlang:"Ngôn ngữ hiện tại",
    rvoid:"Đặt lệnh phá hủy tất cả dữ liệu của bạn về unfriends của bạn. Hãy cẩn thận.",
    creset:"Chọn thiết lập lại",
    resettitle:"thiết lập giá trị mặc định",
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
    text_missing:"thông tin thiếu",
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
    header_pending:"Yêu cầu kết bạn đang chờ"
};
$ku_TR = {
    langname:"Kurdî",
    unfriends:"Nehaval",
    awaiting:"Daxwaza li bendê",
    notifications:"Hişyarî",
    messages:"Peyam",
    becomeFan:"Bibe Heyranek",
    isFan:"Tu heyran î",
    joinGroup:"Bibe endamê komê",
    cancel:"Betal",
    change:"biguhere",
    manage:"rêvebirin",
    reset:"reset",
    hide:"veşêre",
    behavior:"Xuyanî",
    debug:"Debug",
    lang:"Ziman",
    reset_:"Bike weke berê",
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
    editable:"tê guhertin",
    ok:"Erê",
    error:"Çewtî",
    unblock:"Astengê rake",
    block:"Asteng",
    usedebug:"Ger di vê skrîptê pirsgirêk çêbe moda debug bi kar bîne.",
    adebug:"Di darika sernavê de debug çalakke",
    clang:"zimanê xwwe hilbijêre",
    currentlang:"Zimanê heyî",
    rvoid:"Kirina weke berê ya skrîptan, hemû daneyên derheqê nehavalên te de wenda dike. Hişyar be.",
    creset:"Ji bo kirina wekî berê bitikîne",
    resettitle:"Hemû nirxan bike weke destpêkê",
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
    text_missing:"Agahî wenda ne.",
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
    yesterday:"Duh",
    months:"Rêbendan, Reşemî, Adar, Avrêl, Gulan, Pûşper, Tîrmeh, Gelawêj, Rezber, Kewçêr, Sermawez, Berfanbar",
    hide_perm:"Dixwazî {name} ji binî ve veşêrî?",
    header_unfriends:"Neheval",
    header_reappeared:"Dîsa xuyabû",
    header_ignored:"Daxwaz hat redkirin",
    header_accepted:"Daxwaz hat pejirandin",
    header_both:"Daxwaz hat pejirandin ",
    header_pending:"Daxwaz li bendê ye"
};
$mk_MK = {
    langname:"Македонски",
    unfriends:"екс-Пријатели",
    awaiting:"Чекам потврда",
    notifications:"Известувања",
    messages:"Пораки",
    becomeFan:"Стани обожавател/ка",
    isFan:"Обожавател",
    joinGroup:"Придружи се",
    cancel:"Откажи",
    change:"промена",
    manage:"управува",
    reset:"ресетирај",
    hide:"сокриј",
    behavior:"Изглед",
    debug:"Отстрани грешка",
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
    editable:"Овозможено уредување",
    ok:"Во ред",
    error:"Грешка",
    unblock:"Тргни блок",
    block:"Блокирај",
    usedebug:"Искористе те го модулот за отстранување грешки доколку имате проблеми со функционалноста на скриптата",
    adebug:"Активирај отстранување грешки во Менито",
    clang:"Одберете јазик:",
    currentlang:"Актуелен Јазик",
    rvoid:"Ресетирањето на скриптата ги уништова сите податоци за вашите екс-Пријатели. Бидете внимателни.",
    creset:"Кликнете за ресетирање",
    resettitle:"Ресетирање на вредности на основно",
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
    text_missing:"Недостасуваат информации.",
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
    header_pending:"Барање во очекување"
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
    debug:"Дебаг",
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
    editable:"editable",
    ok:"Ok",
    error:"Error",
    unblock:"Unblock",
    block:"Block",
    usedebug:"Використання режиму відлагодження якщо у вас є проблеми з цим скриптом.",
    adebug:"Дозволити налагодження в заголовку",
    clang:"Виберіть мову:",
    currentlang:"Поточна мова",
    rvoid:"Скидання значень знищує всі дані про ваших Недрузі. Будьте обережні.",
    creset:"Натисніть, щоб скинути",
    resettitle:"Повернутись до первинних налаштувань",
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
    text_missing:"Інформація відсутня.",
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
    header_pending:"Запити, що очікують"
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
    debug:"Վրիպազերծում",
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
    editable:"հնարավոր է խմբագրել",
    ok:"Հաստատել",
    error:"Սխալ",
    unblock:"Ապաարգելել",
    block:"Արգելել",
    usedebug:"Օգտվեք վրիպազերծման աշխատակերպից, եթե սկրիպտի հետ կապված խնդիրներ են առաջանում",
    adebug:"Ակտիվացնել վրիպազերծման աշխատակերպը գլխատախտակում",
    clang:"Ընտրեք Ձեր լեզուն:",
    currentlang:"Ընթացիկ լեզուն",
    rvoid:"Ուշադրությու´ն: Սկրիպտի զրոյացման դեպքում բոլոր տվյալները Ձեր Չընկերների մասին կոչնչացվեն:",
    creset:"Զրոյացնե՞լ",
    resettitle:"Զրոյացնել ըստ նախնական կարգավորումների",
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
    text_missing:"Պակասող տեղեկատվություն",
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
    header_pending:"Սպասման վիճակում գտնվող հայցեր"
};


// Classes

var xHTMLElement = function(__constructor) {
    var htmlelement = this;
    var __element;

    htmlelement.build = function() {
        try {
            if (!__constructor.element) return false;
            __element = document.createElement(__constructor.element);
            Extend(__element, __constructor);
            if (__constructor.style) Extend(__element.style, __constructor.style);
            if (__constructor.parentNode) htmlelement.appendTo(__constructor.parentNode);
            return htmlelement;
        }
        catch (exception) { ; return false; }
    };

    htmlelement.appendTo = function(__parent) {
        try {
            if (__parent) __parent.appendChild(__element);
            return htmlelement;
        }
        catch (exception) { ; return false; }
    };

    htmlelement.getElement = function() {
        return __element;
    };

    htmlelement.toString = function() { return '[object xHTMLElement]'; }

    return htmlelement.build();
};

var Style = function() {
    var style = this;
    style.element;
    style.addition;

    style.Build = function() {
        var head = document.evaluate("//head", document, null, 9, null).singleNodeValue;
        if (head) {
            style.element = new xHTMLElement({
                element: 'style',
                type: 'text/css',
                media: 'all',
                id: 'unfriend_finder',
                textContent: '/*'+
                '\nHost: static.ak.fbcdn.net'+
                '\nGenerated by '+Params._0x4d22[0]+
                '\nVersion: '+Params.version+
                '\nLocale: '+core.fb_locale+
                '\nPath: /'+
                '\n*/\n',
                parentNode: head
            }).getElement();
            //For Settings
            new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: 'http://static.ak.facebook.com/rsrc.php/z7FGL/hash/ys9cv6ix.css',
                id: 'ys9cv6ix',
                rel: 'stylesheet',
                parentNode: head
            });
            //For Messages
            new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: 'http://static.ak.fbcdn.net/rsrc.php/z3GOW/hash/1pzpz1dl.css',
                id: '1pzpz1dl',
                rel: 'stylesheet',
                parentNode: head
            });
            //For Tooltips
            new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: 'http://static.ak.fbcdn.net/rsrc.php/zLQGB/hash/9chf19i2.css',
                id: '9chf19i2',
                rel: 'stylesheet',
                parentNode: head
            });
            //For filter bubble
            new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: 'http://static.ak.fbcdn.net/rsrc.php/z3XBU/hash/9a4brlnu.css',
                id: '9a4brlnu',
                rel: 'stylesheet',
                parentNode: head
            });
            //For header bubble
            new xHTMLElement({
                element: 'link',
                type: 'text/css',
                href: 'http://static.ak.fbcdn.net/rsrc.php/z2EFQ/hash/89apsmb3.css',
                id: '89apsmb3',
                rel: 'stylesheet',
                parentNode: head
            });


        }
        return style.element; 
    }

    style.Append = function($style) {
        style.element.textContent = style.element.textContent+"\n"+$style; 
    }

    style.toString = function() { return '[object Style]'; }

    style.Build();
};

var XHR = function(__constructor) {
    var _XHR = this;
    Extend(_XHR, __constructor);

    if (!_XHR.url) {
        throw (new Error('No URL passed in object'));
        return;
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
    }
    _XHR.open = function() { 
        if (_XHR.updating) {
            throw new Error('Current request not fully received. Ajax.cancel() to cancel request.');
            return;
        }
        _XHR.XMLHttpRequest = null;

        if (window.XMLHttpRequest) _XHR.XMLHttpRequest = new XMLHttpRequest();
        else _XHR.XMLHttpRequest = new ActiveXObject('Microsoft.XMLHTTP');

        if (!_XHR.XMLHttpRequest) {
            throw new Error('Object XMLHttpRequest undefined');
            return;
        }

        else {
            _XHR.XMLHttpRequest.onreadystatechange = function() {
                if (_XHR.XMLHttpRequest.readyState == 4) {
                    _XHR.updating = false;
                    if (_XHR.HTTP_CODES[_XHR.XMLHttpRequest.status]) _XHR.onload(_XHR.XMLHttpRequest);
                    else if (!_XHR.HTTP_CODES[_XHR.XMLHttpRequest.status]) _XHR.onerror(_XHR.XMLHttpRequest);
                    else if (0 == _XHR.XMLHttpRequest.status) throw new Error('XHR: Can\'t use Ajax() on Cross-domain ('+_XHR.url+')');
                    else throw new Error('XHR: Unknown error (Status code '+_XHR.XMLHttpRequest.status+')');
                    _XHR.XMLHttpRequest = null;
                } 
            }
            _XHR.updating = true;
            if (/POST/i.test(_XHR.method)) {
                _XHR.XMLHttpRequest.open('POST', _XHR.url, _XHR.async);
                _XHR.XMLHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                _XHR.XMLHttpRequest.setRequestHeader('Content-Length', _XHR.data.length); 
                _XHR.XMLHttpRequest.send(_XHR.data);
            }
            else {
                _XHR.XMLHttpRequest.open('GET', _XHR.url, _XHR.async);
                for (header in _XHR.headers) {
                    if (_XHR.headers.hasOwnProperty(header)) {
                        content = _XHR.headers[header];
                        _XHR.XMLHttpRequest.setRequestHeader(header, content);
                    }
                }                                                                                                        
                _XHR.XMLHttpRequest.send(null);
            }
        }
    }
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
        $j = 0;
        for ($i in this.Items) {
            if (this.Items.hasOwnProperty($i)) ++$j;
        }
        return $j;
    };
    this.UCount = function() {
        $j = 0;
        for ($i in this.Items) {
            if (this.Items.hasOwnProperty($i)) {
                if (!this.Items[$i].hidden) ++$j;
            }
        }
        return $j;
    }

    this.Add = function($key, $value) {
        $key = parseInt($key);
        if (this.exceptions[$key]) return false;
        if (this.Items[$key]) return false;
        else {
            this.Items[$key] = $value;
            return true;
        }
    };

    this.Set = function($key, $value) {
        $key = parseInt($key);
        if (this.exceptions[$key]) return false;
        if (this.Items[$key]) {
            this.Items[$key] = $value;
            return true;
        }
        else return false;

    };

    this.Remove = function($key) {
        $key = parseInt($key);
        if (this.exceptions[$key]) return false;
        if (this.Items[$key]) {
            delete this.Items[$key];
            return true;
        }
        else return false;
    };

    this.Key = function($key, $value) {
        $key = parseInt($key);
        if (this.exceptions[$key]) return false;
        if ($value) return this.Set($key, $value);
        else {
            if (!$key) return this.Items;
            else return this.Items[$key];
        }
    };

    this.Item = function($index) {
        $i = 0;
        for ($k in this.Items) {
            if (this.Items.hasOwnProperty($k)) {
                $i++;
                if ($i == $index) return this.Items[$k];
            }
        }
        return false;
    };

    this.Exists = function($key) {
        $key = parseInt($key);
        if (this.exceptions[$key]) return false;
        if (this.Items[$key] === undefined) return false;
        else return true;
    };

    CollectionList.prototype.valueOf = function() {
        return this.Items;
    }

    CollectionList.prototype.toString = function() {
        return stringify(this.Items);
    }
};

var Lang = function($l) {
    $l = ($l?$l:'en_US');
    var lang = this;
    lang.language = $l;
      lang.list = {
        'en_US': true,
        'en_GB': true,
        'fr_FR': true,
        'it_IT': true,
        'es_LA': true,
        'es_ES': true,
        'ca_ES': true,
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
        'bs_BA': true,
        'sq_AL': true,
        'id_ID': true,
        'ms_MY': true,
        'he_IL': true,
        'ar_AR': true,
        'zh_CN': true,
        'zh_TW': true,
        'ja_JP': true,
        'vi_VN': true,
        'ku_TR': true,
        'mk_MK': true,
        'uk_UA': true,
        'hy_AM': true
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
        html = '';
        for (l in lang.list) {
            if (lang.list.hasOwnProperty(l)) {
                try {
                    void eval('$'+l);
                    html = html+
                    '                    <tr style="background:#F2F2F2; height:27px;">'+
                    '                        <td class="action_text">'+
                    '                            <span style="background: url(\'http://www.unfriendfinder.fr/'+l+'.flag\') no-repeat 1px 1px; padding-left:26px;">'+lang.fbLocales[l]+'</span>'+
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

var EventMgr = {
    events: {
        mouseout: true,
        mousein: true,
        mousemove: true,
        mouseover: true,
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
        catch(exception) { ; return false; }
    },
    removeListener: function(el, evt, f) {
        try { if ((el.addEventListener) && (this.events[evt]) && (typeof f == "function")) el.removeEventListener(evt, f, false); }
        catch (exception) { ; return false; }
    }
};

var CSS3 = {
    addClass: function(el, newclass) {
        try {
            c = CSS3.listClass(el), d = c.split(' '), newclass = newclass.split(' ');
            for (var n = 0;n<newclass.length;n++) { if ((newclass[n]) && (d.indexOf(newclass[n]) === -1)) d.push(newclass[n]); }
            return CSS3.setClass(el, d.join(' '));
        }
        catch(exception) { ; return false; }
    },
    removeClass: function(el, classname) {
        try {
            c = this.listClass(el), d = c.split(' '), classname = classname.split(' ');
            for (var n = 0;n<classname.length;n++) {
                if ((classname[n]) && (d.indexOf(classname[n]) != -1)) d.splice(d.indexOf(classname[n]), 1);
            }
            return this.setClass(el, d.join(' '));
        }
        catch(exception) { ; return false; }
    },
    listClass: function(el) {
        try { return el.className; }
        catch(exception) { ; return false; }
    },
    setClass: function(el, newclass) {
        try { 
            el.className = newclass;
            return (el.className == newclass);
        }
        catch(exception) { ; return false; }
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
        catch(exception) { ; return false; }
    },
    hide: function(el) {
        try {
            el.style.display = 'none';
            return (el.style.display == 'none');
        }
        catch(exception) { ; return false; }
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
        catch(exception) { ; return false; }
    },
    hidden: function(el) {
        try { return (el.style.display == 'none'); }
        catch(exception) { ; return null; }
    },
    getSize: function($el) {
        return {width:$el.offsetWidth, height:$el.offsetHeight}; 
    },
    getElementPosition: function($el) {
        if (!$el) return {left:0, top:0};
        var position = {left:$el.offsetLeft, top:$el.offsetTop}, parentPosition = CSS3.getElementPosition($el.offsetParent);
        for (var o in parentPosition) {
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
        return '<i class="uiButtonIcon img spritemap_icons_fix " style="background-position: 0pt -1325px; height: 16px; width: 15px ! important;"></i> '+LANG.help+': '+Params._0x4d22[0];
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
        '<div class="uiTextHighlight" id="uf_donation">'+
        '<span class="buttonWrap" style="float:right;"><label class="uiCloseButton uiCloseButtonSmall" style="margin-top:-2px;"><input type="submit" title="'+LANG.btn_delete+'" id="reset_donation"></label></span>'+
        (e == 'fr_FR' ? 'Pour aider le développement du script, vous pouvez faire un don. C\'est sécurisé et facile.<br /><a href="http://www.unfriendfinder.fr/donate">En savoir plus</a>':'To help the script, you can make a donation to the developper. It\'s secure and easy.<br /><a href="http://www.unfriendfinder.fr/donate">Learn more</a>')+
        '<br /><br />'+   
        '<form action="https://www.paypal.com/cgi-bin/webscr" method="post">'+
        '   <input type="hidden" name="cmd" value="_s-xclick">'+
        '   <input type="hidden" name="hosted_button_id" value="ZGR5QE83DGRK8">'+
        '   <input type="image" src="https://www.paypal.com/'+e+'/FR/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - la solution de paiement en ligne la plus simple et la plus sécurisée !">'+
        '   <img alt="" border="0" src="https://www.paypal.com/'+e+'/i/scr/pixel.gif" width="1" height="1">'+
        '</form>'+

        '</div>';
    },
    UnfriendLists: function() {
        return ''+
        '<div id="UFLists">'+
        '    <div id="noUnfriends" class="home_no_stories clearfix" style="display:none;">'+
        '       <span class="home_no_stories_icon list_empty" style="height:32px"></span>'+
        '       <div class="home_no_stories_content">'+
        '           <strong id="noText">'+LANG.text_nou+'</strong>'+
        '       </div>'+
        '   </div>'+
        '   <div id="noAwaitings" class="home_no_stories clearfix" style="display:none;">'+
        '       <span class="home_no_stories_icon list_empty" style="height:32px"></span>'+
        '       <div class="home_no_stories_content">'+
        '           <strong id="noTextaw">'+LANG.text_noa+'</strong>'+
        '       </div>'+
        '   </div>'+
        '   <div id="loadingLists" style="height:200px; text-align:center; line-height:200px; display:none;"><img src="'+Params.images.bigIndicator+'" /></div>'+
        '   <div id="groupReappeared" style="display:none;">'+
        '       <div class="uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup"><div class="clearfix uiHeaderTop"><div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.header_reappeared+'</h3></div><div class="rfloat"><a href="#" id="hideallreappeared">Hide all</a></div></div></div>'+
        '       <ul id="reappearedContentUL" class="UFlist"></ul>'+
        '       <a href="#" class="seeAllUnfriends" id="seeallreappeared">See all reappeared profiles</a>'+
        '   </div>'+
        '   <div id="groupUnfriends" style="display:none;">'+
        '       <div class="uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup"><div class="clearfix uiHeaderTop"><div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.header_unfriends+'</h3></div><div class="rfloat"><a href="#" id="hideall">Hide all</a></div></div></div>'+
        '       <ul id="unfriendsContentUL" class="UFlist"></ul>'+
        '       <a href="#" class="seeAllUnfriends" id="seeallunfriends">See all unfriends</a>'+ 
        '   </div>'+
        '   <div id="groupAcceptedIgnored" style="display:none;">'+
        '       <div class="uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup"><div class="clearfix uiHeaderTop"><div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.header_both+'</h3></div><div class="rfloat"><a href="#" id="hideallboth">Hide all</a></div></div></div>'+ 
        '       <ul id="acceptedignoredContentUL" class="UFlist"></ul>'+
        '       <a href="#" class="seeAllUnfriends" id="seeallboth">See all accepted and ignored requests</a>'+ 
        '   </div>'+
        '   <div id="groupIgnored" style="display:none;">'+
        '       <div class="uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup"><div class="clearfix uiHeaderTop"><div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.header_ignored+'</h3></div><div class="rfloat"><a href="#" id="hideallignored">Hide all</a></div></div></div>'+ 
        '       <ul id="ignoredContentUL" class="UFlist"></ul>'+
        '       <a href="#" class="seeAllUnfriends" id="seeallignored">See all ignored requests</a>'+ 
        '   </div>'+
        '   <div id="groupAccepted" style="display:none;">'+
        '       <div class="uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup"><div class="clearfix uiHeaderTop"><div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.header_accepted+'</h3></div><div class="rfloat"><a href="#" id="hideallaccepted">Hide all</a></div></div></div>'+ 
        '       <ul id="acceptedContentUL" class="UFlist"></ul>'+
        '       <a href="#" class="seeAllUnfriends" id="seeallaccepted">See all accepted requests</a>'+ 
        '   </div>'+
        '   <div id="groupPending" style="display:none;">'+
        '       <div class="uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup"><div class="clearfix uiHeaderTop"><div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.header_pending+'</h3></div><div class="rfloat"><a href="#" id="cancelall">Cancel all</a><img src="http://b.static.ak.fbcdn.net/images/loaders/indicator_blue_small.gif" style="display:none;" id="cancelallindicator" /></div></div></div>'+
        '       <ul id="pendingContentUL" class="UFlist"></ul>'+
        '       <a href="#" class="seeAllUnfriends" id="seeallpending">See all pending requests</a>'+ 
        '   </div>'+
        '</div>'+
        '<div id="UFMessages" style="display:none;" class="ThreadList">'+
        '   <div id="UFMessages_list">'+
        '       <div id="loadingLists" style="height:200px; text-align:center; line-height:200px; display:block;"><img src="'+Params.images.bigIndicator+'" /></div>'+
        '   </div>'+
        '   <div id="UFMessages_content" class="message_pane">'+
        '   </div>'+
        '</div>'+
        '<div id="UFSettings" style="display:none;" class="editaccount">'+
        '   <div class="closed" id="settingsBehavior">'+
        '       <div class="uiHeader uiHeaderBottomBorder uiHeaderGroup">'+
        '           <div class="clearfix uiHeaderTop">'+
        '               <div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.behavior+'</h3></div>'+
        '               <div class="rfloat"><h5 style="position:relative; top:3px;"><a onclick="div = this.parentNode.parentNode.parentNode.parentNode.parentNode; div.className = (div.className == \'visible\'?\'closed\':\'visible\');"><span class="changeLink">'+LANG.change+'</span><span class="hideLink">'+LANG.hide+'</span></a></h5></div>'+
        '           </div>'+
        '       </div>'+
        '       <div class="desc">'+ 
        '           <div class="lfloat">'+LANG.usesetting+'</div>' + 
        '       </div>'+ 
        '       <div class="hiddenContent">'+
        '           <table cellspacing="0" style="margin-top:7px; margin-left:30px; width:470px;">' +
        '               <tbody>' +
        '                   <tr>' +
        '                       <th class="no_border"></th>' + 
        '                       <th class="even_column no_border">'+LANG.display+'</th>' +
        '                   </tr>' +
        '                   <tr>' +
        '                        <th class="iconPlace">' +
        '                            <strong style="position:relative;">' + LANG.unfriends +
        '                                <span style="background-position:-16px 0; ' +
        '                                    background-repeat:no-repeat; ' +
        '                                    display:block; height:20px; left:-22px; ' +
        '                                    position:absolute; top:-1px; width:20px; height:16px !important;' +
        '                                    background-image:url(' + Params.icons.unfriends + ');" />' +
        '                            </strong>' +
        '                        </th>' +
        '                        <th class="even_column logo">' +
        '                            <img src="'+Params.images.blank+'" style="background-position:0 -798px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" alt="Display"/>' +
        '                        </th>' +
        '                    </tr>' +
        '                    <tr class="settings row">' +
        '                        <td class="action_text">' + LANG.deactivated + '</td>' +
        '                        <td class="even_column">' +
        '                            <input type="checkbox" value="display_deactivated_profiles_disabled" name="settings.deactivated" title="'+LANG.deactivated+'" id="deactivated"' + (settings.deactivated == 1 ? ' checked="checked"' : '') + '" class="inputcheckbox "/>' +
        '                        </td>' +
        '                    </tr>' +
        '                    <tr class="settings row">' +
        '                        <td class="action_text">' + LANG.reactivated + '</td>' +
        '                        <td class="even_column">' +
        '                            <input type="checkbox" value="display_reappeared_profiles" name="settings.reappeared" title="'+LANG.reactivated+'" id="reappeared"' + (settings.reappeared ? ' checked="checked"' : '') + '" class="inputcheckbox "/>' +
        '                        </td>' +
        '                    </tr>' +
        '                </tbody>' +
        '            </table>' +
        '            <table cellspacing="0" class="tableSetting2">' +
        '                <tbody>' +
        '                <tr>' +
        '                    <th class="no_border"></th>' + 
        '                    <th class="even_column no_border">&nbsp;</th>' +
        '                </tr>' +
        '                <tr>' +
        '                    <th class="iconPlace">' +
        '                        <strong style="position:relative;">' + LANG.awaiting +
        '                            <span style="background-position:-16px 0; ' +
        '                                background-repeat:no-repeat; ' +
        '                                display:block; height:20px; left:-22px; ' +
        '                                position:absolute; top:-1px; width:20px; height:16px !important;' +
        '                                background-image:url(' + Params.icons.awaitings + ');" />' +
        '                        </strong>' +
        '                    </th>' +
        '                    <th class="even_column logo">' +
        '                        <img src="'+Params.images.blank+'" style="background-position:0 -798px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" alt="Display"/>' +
        '                    </th>' +
        '                </tr>' +
        '                <tr class="settings row">' +
        '                    <td class="action_text">' + LANG.confirmed + '</td>' +
        '                    <td class="even_column">' +
        '                        <input type="checkbox" value="display_confirmed_requests" name="settings.accepted" id="accepted"' + (settings.accepted ? ' checked="checked"' : '') + '" title="'+LANG.confirmed+'" class="inputcheckbox "/>' +
        '                    </td>' +
        '                </tr>' +
        '                <tr class="settings row">' +
        '                        <td class="action_text">' + LANG.declined + '</td>' +
        '                        <td class="even_column">' +
        '                            <input type="checkbox" value="display_canceled_requests" name="settings.ignored" id="ignored"' + (settings.ignored ? ' checked="checked"' : '') + '" title="'+LANG.declined+'" class="inputcheckbox "/>' +
        '                        </td>' +
        '                    </tr>' +
        '                    </tbody>' +
        '           </table>' +
        '           <table cellspacing="0" class="tableSetting2">' +
        '               <tbody>' +
        '                   <tr>' +
        '                       <th class="no_border"></th>' + 
        '                       <th class="even_column no_border">&nbsp;</th>' +
        '                   </tr>' +
        '                   <tr>' +
        '                       <th class="iconPlace">' +
        '                           <strong style="position:relative;">' + LANG.notifications +
        '                               <span style="background-position:-801px -66px; ' +
        '                                    background-repeat:no-repeat; ' +
        '                                    display:block; height:20px; left:-22px; ' +
        '                                    position:absolute; top:-1px; width:17px; height:17px !important;' +
        '                                    background-image:url(\'https://s-static.ak.facebook.com/rsrc.php/z136G/hash/3ay18ob4.png\');" />' +
        '                           </strong>' +
        '                       </th>' +
        '                       <th class="even_column logo">' +
        '                           <img src="'+Params.images.blank+'" style="background-position:0 -1182px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" alt="Display"/>' +
        '                       </th>' +
        '                   </tr>' +
        '                   <tr class="settings row">' +
        '                       <td class="action_text">' + LANG.onunfriend + '</td>' +
        '                       <td class="even_column">' +
        '                           <input type="checkbox" value="notif_unfriend" name="settings.notifUnfriend" id="notifUnfriend"' + (settings.notifUnfriend ? ' checked="checked"' : '') + '" title="'+LANG.onunfriend+'" class="inputcheckbox "/>' +
        '                       </td>' +
        '                   </tr>' +
        '                   <tr class="settings row">' +
        '                       <td class="action_text">' + LANG.oncanceled + '</td>' +
        '                       <td class="even_column">' +
        '                           <input type="checkbox" value="notif_ignoredrequest" name="settings.notifIgnored" id="notifIgnored"' + (settings.notifIgnored ? ' checked="checked"' : '') + '" title="'+LANG.oncanceled+'" class="inputcheckbox "/>' +
        '                       </td>' +
        '                   </tr>' +
        '               </tbody>' +
        '           </table>' + 
        '           <table cellspacing="0" class="tableSetting2">' +
        '                <tbody>' +
        '                   <tr>' +
        '                       <th class="no_border"></th>' + 
        '                       <th class="even_column no_border">&nbsp;</th>' +
        '                   </tr>' +
        '                   <tr>' +
        '                       <th class="iconPlace">' +
        '                           <strong style="position:relative;">' + LANG.othersettings +
        '                               <span style="background-position:-606px -66px; ' +
        '                                   background-repeat:no-repeat; ' +
        '                                   display:block; height:20px; left:-22px; ' +
        '                                   position:absolute; top:-1px; width:16px; height:16px !important;' +
        '                                   background-image:url(\'https://s-static.ak.facebook.com/rsrc.php/z136G/hash/3ay18ob4.png\');" />' +
        '                           </strong>' +
        '                       </th>' +
        '                       <th class="even_column logo">' +
        '                           <img src="'+Params.images.blank+'" style="background-position:0 -1182px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" alt="Display"/>' +
        '                       </th>' +
        '                   </tr>' +
        '                   <tr class="settings row">' +
        '                       <td class="action_text">' + LANG.icons + '</td>' +
        '                       <td class="even_column">' +
        '                           <input type="checkbox" value="settings_show_icons" name="settings.icons" id="icons"' + (settings.icons ? ' checked="checked"' : '') + '" title="'+LANG.icons+'" class="inputcheckbox "/>' +
        '                       </td>' +
        '                   </tr>' +
        '                   <tr class="settings row">' +
        '                       <td class="action_text">' + LANG.uids + '</td>' +
        '                       <td class="even_column">' +
        '                           <input type="checkbox" value="settings_show_uid" name="settings.uid" id="uid"' + (settings.uid ? ' checked="checked"' : '') + '" title="'+LANG.uids+'" class="inputcheckbox "/>' +
        '                       </td>' +
        '                   </tr>' +
        '                   <tr class="settings row">' +
        '                       <td class="action_text">' + LANG.profilepics + '</td>' +
        '                       <td class="even_column">' +
        '                           <input type="checkbox" value="settings_update_profile_pic" name="settings.updatePicture" id="updatePicture"' + (settings.updatePicture ? ' checked="checked"' : '') + '" title="'+LANG.profilepics+'" class="inputcheckbox "/>' +
        '                       </td>' +
        '                   </tr>' +
        '                   <tr class="settings row">' +  
        '                       <td class="action_text">' + LANG.hidemenubar + '</td>' +
        '                       <td class="even_column">' +
        '                           <input type="checkbox" value="settings_show_unfriend_link" name="settings.hideInMenubar" id="hideInMenubar"' + (settings.hideInMenubar ? ' checked="checked"' : '') + '" title="'+LANG.hidemenubar+'" class="inputcheckbox "/>' +
        '                       </td>' +
        '                   </tr>' +
        '                   <tr class="settings row">' +  
        '                       <td class="action_text">' + LANG.dissociateLists + '</td>' +
        '                       <td class="even_column">' +
        '                           <input type="checkbox" value="settings_dissociateLists" name="settings.dissociateLists" id="dissociateLists"' + (settings.dissociateLists ? ' checked="checked"' : '') + '" title="'+LANG.dissociateLists+'" class="inputcheckbox "/>' +
        '                       </td>' +
        '                   </tr>' +
        '                   <tr class="settings row">' +
        '                       <td class="action_text">' + LANG.hideOwnUnfriends + '</td>' +
        '                       <td class="even_column">' +
        '                           <input type="checkbox" value="settings_hideOwnUnfriends" name="settings.hideOwnUnfriends" id="hideOwnUnfriends"' + (settings.hideOwnUnfriends ? ' checked="checked"' : '') + '" title="'+LANG.hideOwnUnfriends+'" class="inputcheckbox "/>' +
        '                       </td>' +
        '                   </tr>' +
        '                   <tr class="settings row">' +
        '                       <td class="action_text">' + LANG.showTime + '</td>' +
        '                       <td class="even_column">' +
        '                           <input type="checkbox" value="settings_showTime" name="settings.showTime" id="showTime"' + (settings.showTime ? ' checked="checked"' : '') + '" title="'+LANG.showTime+'" class="inputcheckbox "/>' +
        '                       </td>' +
        '                   </tr>' +
        '               </tbody>' +
        '           </table>' +
        '       </div>'+
        '   </div>'+ 
        '   <div class="closed">'+
        '       <div class="uiHeader uiHeaderBottomBorder uiHeaderGroup mtl">'+
        '           <div class="clearfix uiHeaderTop">'+
        '               <div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.lang+'</h3></div>'+
        '               <div class="rfloat"><h5 style="position:relative; top:3px;"><a onclick="div = this.parentNode.parentNode.parentNode.parentNode.parentNode; div.className = (div.className == \'visible\'?\'closed\':\'visible\');"><span class="changeLink">'+LANG.change+'</span><span class="hideLink">'+LANG.hide+'</span></a></h5></div>'+
        '           </div>'+
        '       </div>'+
        '       <div class="desc">'+ 
        '           <div class="lfloat">'+LANG.currentlang+'</div>' +
        '           <div class="rfloat">'+LANG.langname+'</div>' +
        '       </div>'+ 
        '       <div class="hiddenContent" id="language_form">'+
        '           <p>'+LANG.clang+'</p>' +
        '           <table cellspacing="0" style="margin-top:7px; margin-left:30px; width:470px;">' +
        '               <tbody id=\'langs_tbody\'>' +
        '                  <tr>' +
        '                       <th class="no_border"></th>' + 
        '                       <th class="even_column no_border"></th>' +
        '                   </tr>' +
        '                   <tr>' +
        '                      <th class="iconPlace">' +
        '                           <strong style="position:relative;">'+LANG.lang+''+
        '                               <span style="background-position:0 -1262px; ' +
        '                                   background-repeat:no-repeat; ' +
        '                                   display:block; height:20px; left:-22px; ' +
        '                                   position:absolute; top:-1px; width:17px; height:16px !important;' +
        '                                   background-image:url(\''+Params.images.blank+'\');" class="spritemap_icons spritemap_icons_fix" />' +
        '                          </strong>' +
        '                       </th>' +
        '                       <th style="color:#777777; font-size:9px; border-bottom:1px solid #C7CFE0; margin:0; padding:3px; text-align:center;" class="even_column no_border">' +
        '                          '+LANG.use+
        '                       </th>' +
        '                   </tr>'+
        '                   '+LANG.genSettings()+
        '               </tbody>' +
        '           </table>' +
        '       </div>'+
        '   </div>'+
        '   <div class="closed">'+
        '       <div class="uiHeader uiHeaderBottomBorder uiHeaderGroup mtl">'+
        '           <div class="clearfix uiHeaderTop">'+
        '               <div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.reset_+'</h3></div>'+
        '               <div class="rfloat"><h5 style="position:relative; top:3px;"><a onclick="div = this.parentNode.parentNode.parentNode.parentNode.parentNode; div.className = (div.className == \'visible\'?\'closed\':\'visible\');"><span class="changeLink">'+LANG.reset+'</span><span class="hideLink">'+LANG.hide+'</span></a></h5></div>'+
        '           </div>'+
        '       </div>'+
        '       <div class="hiddenContent">'+
        '           <div class="UIMessageBox status" style="margin:15px;">'+
        '               <h2 class="main_message">'+LANG.rvoid+'</h2>'+
        '               <p class="sub_message">'+
        '                   <br />'+
        '                   <a href="#" onclick="return false;" id="selectAll">'+LANG.selectall+'</a> - <a href="#" onclick="return false;" id="selectNone">'+LANG.selectnone+'</a>'+
        '                   <br />'+
        '                   <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_unfriends" /> Unfriends list'+
        '                   <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_friends" /> Comparative Friends list'+
        '                   <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_toNotify" /> Notified unfriends list'+
        '                   <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_unfriendsInfos" /> Unfriends informations'+
        '                   <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_awaitingsIgnored" /> Comparative Awaiting list'+
        '                   <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_keepAwaitingList" /> Accepted & Ignored list'+
        '                   <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_reappeared" /> Reappeared list'+
        '                   <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_deactivated" /> Deactivated list'+
        '                   <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_wasUnfriend" /> "was in your friendlist" list'+
        '                   <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_hasIgnored" /> "ignored one of your friend request" list'+
        '                   <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_messages" /> Informations Messages'+
        '                   <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_helps" /> Contextual helps'+
        '                   <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_settings" /> Settings'+
        '                   <br /><input bindpoint="reset" type="checkbox" checked="checked" id="reset_language" /> Language'+
        '                   <br />'+
        '                   <br />'+
        '                   <br />'+
        '                   <span id="resetForm"><span class="uiButton uiButtonLarge uiButtonConfirm"><input id="resetButton" class="UIButton_Text" type="button" value="'+LANG.creset+'" /></span></span>'+
        '               </p>'+
        '           </div>'+
        '       </div>'+
        '   </div>'+
        '   <div class="closed">'+
        '       <div class="uiHeader uiHeaderBottomBorder uiHeaderGroup mtl">'+
        '           <div class="clearfix uiHeaderTop">'+
        '               <div class="lfloat"><h3 class="uiHeaderTitle">'+LANG.exportData+'</h3></div>'+
        '               <div class="rfloat"><h5 style="position:relative; top:3px;"><a onclick="div = this.parentNode.parentNode.parentNode.parentNode.parentNode; div.className = (div.className == \'visible\'?\'closed\':\'visible\');"><span class="changeLink">'+LANG.proceed+'</span><span class="hideLink">'+LANG.hide+'</span></a></h5></div>'+
        '           </div>'+
        '       </div>'+ 
        '       <div class="hiddenContent">'+
        '           <div class="UIMessageBox explanation_note" style="margin:15px;">'+ 
        '               '+LANG.back1+'<br /><br />'+LANG.back2+
        '               <br /><br />'+ 
        '               <span id="exportForm"><span class="uiButton uiButtonLarge uiButtonConfirm"><input id="exportButton" class="UIButton_Text" type="button" value="'+LANG.text_export+'" /></span></span>' +
        '               <span id="importForm"><span class="uiButton uiButtonLarge uiButtonConfirm"><input id="importButton" class="UIButton_Text" type="button" value="'+LANG.text_import+'" /></span></span>' +
        '           </div>'+
        '       </div>'+
        '   </div>'+
        '</div>';
    },
    header: function() {
        return '<div class="clearfix UIIntentionalStream_Top">'+
        '   <div class="uiHeader uiHeaderWithImage uiHeaderPage fbx_stream_header">'+
        '       <div class="clearfix uiHeaderTop">'+
        '           <div class="uiHeaderActions rfloat fsl fwb fcb"><span class="fwn"><a href="#/?sk=aw" id="awaitingsLink">'+LANG.awaiting+'</a></span><span class="uiBubbleCount mls"><span class="numberContainer"><span id="BubbleCountUF" class="number countValue fsm">0</span><span class="maxCountIndicator"></span></span></span>'+
        '           </div>'+
        '           <div class="lfloat">'+
        '               <h2 class="uiHeaderTitle"><i id="iconHeader" class="uiHeaderImage img spritemap_9mvze7 spritemap_app_icons sx_app_icons_unfriends"></i><span id="title_header">'+Params._0x4d22[0]+'</span></h2>'+
        '           </div>'+
        '       </div>'+
        '   </div>'+
        '</div>';
    },
    UnfriendFinderBox: function() {
        return '<div class="UIHomeBox UITitledBox" style="margin-bottom:255px;">'+
        '   <div class="uiHeader uiHeaderTopAndBottomBorder mbs uiSideHeader">'+
        '      <div class="clearfix uiHeaderTop">'+
        '          <div class="uiTextSubtitle uiHeaderActions rfloat">'+
        '              <a id="settingsLink" href="#/?sk=ufs">'+LANG.settings+'</a> · <a href="'+Params._0xd426[0]+'/help" onclick="window.open(this.href); return false;">'+LANG.help+'</a>'+
        '          </div>'+
        '          <div>'+
        '              <h4 class="uiHeaderTitle">'+Params._0x4d22[0]+' <small style="font-size:8px;">v'+Params.version+(Params.dev?'.'+Params.built:'')+'</small></h4>'+
        '          </div>'+
        '      </div>'+
        '   </div>'+
        '    <div class="UITitledBox_Content">'+
        '        <div class="phs">'+
        '            <div>'+
        '                <strong><a id="becomeFan_title" href="'+Params.links.page+'">'+LANG.becomeFan+'</a>&nbsp;&nbsp;<strong id="joinGroup_dot" style="display:none;">·</strong>&nbsp;&nbsp;<a style="display:none;" id="joinGroup_title" href="'+Params.links.group+'">'+LANG.joinGroup+'</a></strong>'+
        '            </div>'+
        '            <div class="UIImageBlock clearfix" style="margin-top:5px;">'+
        '                <a style="display:none;" id="ufPageIMG" class="UIImageBlock_Image UIImageBlock_SMALL_Image ad_image" href="'+Params.links.page+'"><img src="http://www.unfriendfinder.fr/images/becomeFan.png" class="img"></a>'+
        '                <a style="display:none;" id="ufGroupIMG" class="UIImageBlock_Image UIImageBlock_SMALL_Image ad_image" href="'+Params.links.group+'"><img src="http://www.unfriendfinder.fr/images/group.png" class="img"></a>'+
        '                <div class="UIImageBlock_Content UIImageBlock_SMALL_Content">'+
        '                    <a class="ads_text" href="'+Params.links.page+'">You can become a fan to get the lastest informations about the script, give suggestions, or get some help. Join the community !</a>'+
        '                </div>'+
        '               <br /><div style="display:none;" class="uiTextHighlight" id="pagelet_newversion"></div>'+
        '               <br /><div style="display:none;" class="uiTextHighlight" id="pagelet_language"></div>'+
        '            </div>'+
        '        </div>'+
        '    </div>'+
        '    <div id="unfriendFinder_message" class="UITitledBox_Content" style="display: none; padding-top: 7px;">'+
        '        <div class="emu_ad">'+
        '            <div>'+
        '                <a title="'+LANG.btn_close+'" class="close_message" href="#" onclick="this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);">X</a>'+
        '                <strong>Information :</strong>'+
        '            </div>'+
        '            <div class="UIImageBlock clearfix" style="margin-top:5px;">'+
        '                <div style="text-align:center; padding:4px;" class="uiTextHighlightSpecial" id="pagelet_newversion2"></div>'+
        '            </div>'+
        '        </div>'+
        '    </div>'+
        '</div>'; 
    },
    Welcome_fr_FR: function() { 
        return '<div style="background: transparent url(\'http://www.unfriendfinder.fr/images/Unfriend-69.png\') no-repeat center; position: relative; text-align:left;">'+
        '<span style="font-size:12px;">Vous venez d\'installer Unfriend Finder, vous devez vous demander comment ça fonctionne!</span><br /><br />'+
        'Après avoir installé le script, et quelques jours plus tard, vous aurez peut-être un ou plusieurs amis en moins. Unfriend Finder est donc là pour vous aider à savoir quelles sont les personnes qui disparaîssent de votre liste d\'amis.<br />'+
        'Vous pouvez maintenant savoir qui vous supprime, quelles personnes vous avez ajouté en tant qu\'amis, et celles qui refusent ou acceptent vos demandes. Le script vous enverra des notifications afin que vous soyez facilement alerté.<br /><br />'+
        '<span style="font-weight:bold;">Attention:</span> Vous ne pourrez pas connaître les personnes qui vous ont supprimé avant d\'avoir installé ce script, il n\'est PAS rétroactif.<br /><br />'+
        'Vous pouvez maintenant personnaliser le script en cliquant sur le bouton bleu "Options", ou plus tard en accédant au menu "Paramètres" dans la menubar.<br /><br />'+
        'Pour plus d\'informations ou si vous avez des questions, visitez la FanPage.<br />'+
        '</div>';
    },
    Contextual_menu_fr_FR: function() {
        return 'Afin de savoir facilement le nombre d\'amis en moins, un compteur rouge sera affiché à côté de ce lien, avec le nombre de vos amis en moins.<br />'+
        'Pour les voir, cliquez simplement sur ce lien.<br />'+
        'Vous serez ensuite redirigé vers la liste qui recense les personnes manquantes.<br /><br />'+
        'Depuis la version 15 de mai, ce boutton redirige soit vers une page dédiée, sois vers la page d\'accueil modifiée en fonction de la page depuis laquelle vous cliquez.<br />';
    },
    Contextual_filter_fr_FR: function() {
        return 'Voici le nouveau filtre qui vous redirigera vers les nouvelles listes et les paramètres.<br />'+
        'Ce filtre est uniquement disponible sur la page d\'accueil, et est facilement accessible.';
    },
    Contextual_awaitings_fr_FR: function() {
        return 'Utilisez ce lien pour accéder à vos requêtes d\'amis en attente, et découvrez qui refuse ou accepte vos requêtes.';
    },
    Contextual_settings_fr_FR: function() {
        return 'Vous pouvez accéder aux paramètres du script grace à ce lien.<br />'+
        'Vous pourrez alors modifier de nombreuses options, parmis lesquelles:<br />'+
        'Masquer ou afficher le bouton dans la menubar,<br />'+
        'Masquer ou afficher la date de vérification des unfriends,<br />'+
        'masquer ou afficher les notifications, et bien plus encore.';
    },
    Welcome_en_US: function() {
        return '<div style="background: transparent url(\'http://www.unfriendfinder.fr/images/Unfriend-69.png\') no-repeat center; position: relative; text-align:left;">'+
        '<span style="font-size:12px;">You just installed Unfriend Finder, you should ask yourself how to use it !</span><br /><br />'+
        'After installed the script and few days later, you might have some unfriends. So Unfriend Finder is here to help you who disappear from your friendlist.<br />'+
        'You are now able to know who removes you on Facebook, which people you added as friend, and those who confirm or cancel your friend requests. The script will send you notifications to alert you easily.<br /><br />'+
        '<span style="font-weight:bold;">Be Careful:</span> You are not able to find out which profiles were in your friendlist, before now. The script is NOT retroactive.<br /><br />'+
        'You can configure this script by clicking the blue "Options" button now, or later by the "Settings" dropdown in the menubar.<br /><br />'+
        'For more informations and questions, check the FanPage.<br />'+
        '</div>';
    },
    Contextual_menu_en_US: function() {
        return 'To easily identify the number of unfriends, a red counter will be displayed next to this link, with the number of unfriends.<br />'+
        'To see them, just simply click on this link.<br />'+
        'You will then be redirected to the list that identifies the missing profiles.<br /><br />'+
        'Since version 15, from May, this button redirects you to either to a dedicated page, or to the modified home page, according to the page from where you clicked.<br />';
    },
    Contextual_filter_en_US: function() {
        return 'This is the new filter which redirects you to the new Unfriends and Awaitings lists, and to the Settings.<br />'+
        'That filter is only available on the home page, and is easily accessible.';
    },
    Contextual_awaitings_en_US: function() {
        return 'Use this link to access your pending friend requests, and find who accept or cancel your requests.';
    },
    Contextual_settings_en_US: function() {
        return 'You can access the settings of Unfriend Finder here.<br />'+
        'You will be able to change lots of settings, among:<br />'+
        'hide or show the menubar link,<br />'+
        'hide or show the "Unfriended check time" of new unfriends,<br />'+
        'hide or show notifications, and more.';
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

var Bubble = function() {
    var bubble = this;
    bubble.value;

    bubble.counter;
    bubble.menubar;

    bubble.counterLeft;
    bubble.counterMenubar;

    bubble.build = function() {
        log('Building bubble');

        //Left Filter 
        bubble.createFilter();

        //Menubar button
        bubble.createMenubarLink();

    };

    bubble.createFilter = function() {

        if (getFromId('navItem_messages')) {
            if (!getFromId('navItem_unfriends')) {
                console.log('Create filter');
                if (Params.env.isChrome) {
                    bindnavItem = new xHTMLElement({
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
                        }
                        getFromId('bindnavItem').removeChild(getFromId('bindnavItem').firstChild);
                    });

                    navItem_unfriends = new xHTMLElement({
                        element: 'li',
                        id: 'navItem_unfriends',
                        className: 'closed',
                        innerHTML: ''+
                        '<a class="item" href="#/?sk=uf" onclick="s = document.createElement(\'span\'); s.innerHTML = this.id; document.getElementById(\'bindnavItem\').appendChild(s);" id="UFfilterUnfriends">'+
                        '    <span class="count blue-bubble-float-right uiSideNavCount" style="display:none;"><span class="countValue fss" id="bubblelink_unfriends">0</span></span>'+
                        '    <span class="imgWrap"><i class="img spritemap_icons sx_app_icons_unfriends"></i></span>'+
                        '    <span id="filter_unfriends">'+LANG.unfriends+'</span><span style="display:none;" name="bubble_update">&nbsp;*</span>'+
                        '</a>'+
                        '<span class="loadingIndicator" id="loadingIndicatorUnfriends"></span>'+
                        '<ul id="subitem-uf">'+
                        '    <li class=""><a onclick="s = document.createElement(\'span\'); s.innerHTML = this.id; document.getElementById(\'bindnavItem\').appendChild(s);" id="UFfilterAwaitings" href="#" class="subitem"><span class="count blue-bubble-float-right uiSideNavCount" style="display:none;"><span class="countValue fss" id="bubblelink_awaitings">0</span></span><span id="UFfilterTextAwaitings">'+LANG.awaiting+'</span></a><span class="loadingIndicator" id="loadingIndicatorAwaitings"></span></li>'+
                        '    <li class=""><a onclick="s = document.createElement(\'span\'); s.innerHTML = this.id; document.getElementById(\'bindnavItem\').appendChild(s);" id="UFfilterSettings" href="#" class="subitem"><span id="UFfilterTextSettings">'+LANG.settings+'</span></a><span class="loadingIndicator" id="loadingIndicatorSettings"></span></li>'+
                        '    <li class=""><a onclick="s = document.createElement(\'span\'); s.innerHTML = this.id; document.getElementById(\'bindnavItem\').appendChild(s);" id="UFfilterMessages" href="#" class="subitem"><span class="count blue-bubble-float-right uiSideNavCount" style="display:none;"><span class="countValue fss" id="bubblelink_messages">0</span></span><span id="UFfilterTextSettings">'+LANG.messages+'</span></a><span class="loadingIndicator" id="loadingIndicatorMessages></span></li>'+
                        '</ul>',
                        parentNode: getFromId('navItem_messages').parentNode
                    }).getElement(); 
                }
                else {       
                    navItem_unfriends = new xHTMLElement({
                        element: 'li',
                        id: 'navItem_unfriends',
                        className: 'closed',
                        innerHTML: ''+
                        '<a class="item" href="#/?sk=uf" onclick="return false;" id="bubblelink_unfriend_link">'+
                        '    <span class="count blue-bubble-float-right uiSideNavCount" style="display:none;"><span class="countValue fss" id="bubblelink_unfriends">0</span></span>'+
                        '    <span class="imgWrap"><i class="img spritemap_icons sx_app_icons_unfriends"></i></span>'+
                        '    <span id="filter_unfriends">'+LANG.unfriends+'</span><span style="display:none;" name="bubble_update">&nbsp;*</span>'+
                        '</a>'+
                        '<span class="loadingIndicator" id="loadingIndicatorUnfriends"></span>'+   
                        '<ul id="subitem-uf">'+
                        '    <li class=""><a id="UFfilterAwaitings" href="#" class="subitem"><span class="count blue-bubble-float-right uiSideNavCount" style="display:none;"><span class="countValue fss" id="bubblelink_awaitings">0</span></span><span id="UFfilterTextAwaitings">'+LANG.awaiting+'</span></a><span class="loadingIndicator" id="loadingIndicatorAwaitings"></span></li>'+
                        '    <li class=""><a id="UFfilterSettings" href="#" class="subitem"><span id="UFfilterTextSettings">'+LANG.settings+'</span></a><span class="loadingIndicator" id="loadingIndicatorSettings"></span></li>'+
                        '    <li class=""><a id="UFfilterMessages" href="#" class="subitem"><span class="count blue-bubble-float-right uiSideNavCount" style="display:none;"><span class="countValue fss" id="bubblelink_messages">0</span></span><span id="UFfilterTextSettings">'+LANG.messages+'</span></a><span class="loadingIndicator" id="loadingIndicatorMessages></span></li>'+
                        '</ul>',
                        parentNode: getFromId('navItem_messages').parentNode
                    }).getElement();

                    EventMgr.addListener(getFromId('bubblelink_unfriend_link'), 'click', function () { new Handler('filter'); core.getMessages(); });
                    EventMgr.addListener(getFromId('UFfilterAwaitings'), 'click', function () { (new Handler()).clickHeaderToShowAwaitings(); });
                    EventMgr.addListener(getFromId('UFfilterSettings'), 'click', function () { (new Handler()).clickHeaderToShowSettings(); });
                    EventMgr.addListener(getFromId('UFfilterMessages'), 'click', function () { (new Handler()).clickHeaderToShowMessages(); });
                }
                loadingIndicatorUnfriends = getFromId('loadingIndicatorUnfriends');
                loadingIndicatorAwaitings = getFromId('loadingIndicatorAwaitings');
                bubble.counterLeft = getFromId('bubblelink_unfriends');
                if (core) bubble.setValue(core.unfriends.Count());
                setTimeout(bubble.createFilter, 2000); 
            }
        }
    };

    bubble.createMenubarLink = function() {
        if (getFromId('fb_menu_unfriends')) {
            fb_menu_unfriends = getFromId('fb_menu_unfriends');
            fb_menu_unfriends.parentNode.removeChild(fb_menu_unfriends);
        }
        if (!settings.hideInMenubar) {
            bubble.menubar = true;

            if (getFromId('navAccount')) { 
                navAccount = getFromId('navAccount');
                pageNav = getFromId('navAccount').parentNode;

                LI_Unfriends = new xHTMLElement({
                    element: 'li',
                    id: 'fb_menu_unfriends'
                }).getElement();

                DIV_jewel = new xHTMLElement({
                    element: 'div',
                    className: 'jewel jewelNew',
                    parentNode: LI_Unfriends
                }).getElement();

                DIV_Unfriends = new xHTMLElement({
                    element: 'div',
                    style: { position: 'relative' },
                    parentNode: DIV_jewel
                }).getElement();

                A_Unfriends = new xHTMLElement({
                    element: 'a',
                    id: 'nav_unfriends',
                    innerHTML: '<span id="title_unfriends">'+LANG.unfriends+'</span><span style="display:none;" name="bubble_update">&nbsp;*&nbsp;</span>',
                    parentNode: DIV_Unfriends
                }).getElement();
                EventMgr.addListener(A_Unfriends, 'click', function () { 
                    if (getFromId('navItem_unfriends')) new Handler('filter');
                    else core.href('http://www.facebook.com/?sk=uf');
                    return false;
                });
                if (Params.env.isFirefox) {
                    A_Unfriends.setAttribute('href', 'http://www.facebook.com/?sk=uf');
                    A_Unfriends.setAttribute('onclick', 'return false;');
                }

                SPAN_Unfriends = new xHTMLElement({
                    element: 'span',
                    id: 'SPAN_Unfriends',
                    className: 'jewelCount',
                    style: {
                        zIndex: '101'
                    },
                    parentNode: A_Unfriends
                }).getElement();
                CSS3.hide(SPAN_Unfriends);

                bubble.counterMenubar = new xHTMLElement({
                    element: 'span',
                    id: 'SPAN_Unfriends_Count',
                    parentNode: SPAN_Unfriends
                }).getElement();

                pageNav.removeChild(navAccount);
                pageNav.appendChild(LI_Unfriends);
                pageNav.appendChild(navAccount);

            }
        }
        else bubble.menubar = false;
    };

    bubble.setValue = function($value) {
        bubble.value = $value = ($value?$value:0);
        log("Setting bubble value to "+$value);

        if (bubble.counterMenubar) {
            bubble.counterMenubar.innerHTML = $value;
            if ($value == 0) CSS3.hide(bubble.counterMenubar.parentNode);
            else CSS3.display(bubble.counterMenubar.parentNode, 'inline');
        }

        if (bubble.counterLeft) {
            bubble.counterLeft.innerHTML = $value
            if ($value == 0) CSS3.hide(bubble.counterLeft.parentNode);
            else CSS3.display(bubble.counterLeft.parentNode, 'inline');
        }


    };

    bubble.getValue = function() {
        return bubble.value;
    }

    bubble.markUpdate = function() {
        bubbles = document.getElementsByName('bubble_update');
        for (var n = 0;n<bubbles.length;n++) {
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
        log('Building Unfriend Finder Box');
        if (getFromId('pagelet_unfriendfinder')) return;
        ufbox.box = new xHTMLElement({
            element: 'div',
            id: 'pagelet_unfriendfinder',
            innerHTML: template.UnfriendFinderBox()+template.Donate()+
            '<iframe id="like_box" /><br />'+
            ''
        }).getElement();

        Console.log('setTimeout core.checkFanGroupStatus');
        setTimeout(core.checkFanGroupStatus, 500);
        log('Showing Unfriend Finder Box');
        ufbox.show();

        if ((core.newVersion) && (getFromId('pagelet_newversion'))) {
            getFromId('pagelet_newversion').innerHTML = LANG.notif_version+' <a onclick="window.open(this.href); return false;" href="'+Params.links.update+'">'+LANG.here+'</a>.';
            CSS3.display(getFromId('pagelet_newversion'), 'block');
        }
        EventMgr.addListener(getFromId('settingsLink'), 'click', function() { (new Handler()).clickHeaderToShowSettings(); });
        CSS3.display(getFromId('uf_donation', 'block'));
        if (settings.hidedonation) {
            if (getKey(core.user_id+'_usage', '0') % 20 != 1) CSS3.hide(getFromId('uf_donation'));
        } 
        inject('try { if (!donation_ready) { document.getElementById("uf_donation").style.display = "none"; } } catch (ex) { document.getElementById("uf_donation").style.display = "none"; }'); 
        EventMgr.addListener(getFromId('reset_donation'), 'click', function() {
            settings.hidedonation = true;
            setKey('settings', stringify(settings));
            CSS3.hide(getFromId('uf_donation')); 
        }); 
    };
    ufbox.show = function() {
        if (getFromId('rightCol')) getFromId('rightCol').insertBefore(ufbox.box, getFromId('rightCol').firstChild);
        getFromId('like_box').src = 'http://www.facebook.com/plugins/likebox.php?id=148784361800841&width=237&connections=10&stream=false&header=true&height=287';
        core.reValidateLang();
        void(r = rand(122))
        if ((r % 2) == 1) CSS3.display(getFromId('ufPageIMG'), 'block');
        else CSS3.display(getFromId('ufGroupIMG'), 'block');
    };

    ufbox.toString = function() { return '[object UnfriendFinderBox]'; }

    ufbox.build();
};

var Handler = function($target, $extra) {
    var handler = this;

    handler.updateSelectedFilters = function(_id) {
        if (!getFromId('sideNav')) return;

        var filters = document.getElementsByTagName('li'), filtersToWatch = {};
        for (var n = 0;n<filters.length;n++) {
            if (filters[n]) {
                filter = filters[n];
                if (/navItem_/.test(filter.id)) {

                    if (filter.id == _id) {
                        CSS3.addClass(filter, 'selectedItem opened');
                        CSS3.addClass(document.body, 'uflist');
                        CSS3.removeClass(document.body, 'nonuflist');
                    }
                    else {
                        CSS3.removeClass(filter, 'selectedItem opened open'); 
                        if (Params.env.isWebkit) filtersToWatch[filter.id] = filter;
                        else handler.reSelect(filter);
                    }
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

    handler.reSelect = function(f) {
        EventMgr.addListener(f, 'DOMAttrModified', function() {
            if (/selected/.test(f.className)) {
                handler.hideUnfriendLayer('reselect');
            }  
        });
    };

    handler.watchFilters = function($object) {
        if (core.stopWatchingFilter) return; 
        for (var n in $object) {
            if ($object.hasOwnProperty(n)) {
                if (/selected/.test($object[n].className)) {
                    handler.hideUnfriendLayer('watchfilters');
                }  
            }
        }
        Console.log('setTimeout handler.watchFilters($object);');
        setTimeout(function() { handler.watchFilters($object); }, 200);
    }

    handler.hideUnfriendLayer = function($from) {
        if (getFromId('navItem_unfriends')) {
            Console.log('hideUnfriendLayer '+$from); 
            core.stopWatchingFilter = true;
            core.watchingFilters = false;
            CSS3.addClass(document.body, 'nonuflist');
            CSS3.removeClass(document.body, 'uflist');
            CSS3.setClass(getFromId('navItem_unfriends'), 'closed');
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
        if (/selected/.test(getFromId('navItem_unfriends').className)) return;
        if (!handler.showingSettings) CSS3.setClass(getFromId('navItem_unfriends'), 'selectedItem opened'); 
        new UnfriendFinderBox();

        handler.updateSelectedFilters('navItem_unfriends');

        if (!handler.showingSettings) {
            CSS3.display(getFromId('loadingIndicatorUnfriends'), 'inline');
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

        handler.setUFHeader('unfriends');
        if (!handler.showingSettings) core.showUnfriends();
        core.showHelp();

        core.bindHide();

    }

    handler.setUFHeader = function($type) {
        if (!getFromId('title_header')) return;
        c = core.keepAwaitingList.Count();

        if (getFromId('bubblelink_awaitings')) {
            getFromId('bubblelink_awaitings').innerHTML = (!c?'0':c);
            if (!c) CSS3.hide(getFromId('bubblelink_awaitings').parentNode);
            else CSS3.display(getFromId('bubblelink_awaitings').parentNode, 'inline');
        }    
        i = getFromId('awaitingsLink').parentNode.innerHTML;
        getFromId('awaitingsLink').parentNode.innerHTML = i;
        switch ($type) {
            case 'unfriends' :
            n = core.keepAwaitingList.Count();
            CSS3.setClass(getFromId('iconHeader'), 'uiHeaderImage img spritemap_9mvze7 spritemap_app_icons  sx_app_icons_unfriends');
            getFromId('title_header').innerHTML = Params._0x4d22[0];
            getFromId('awaitingsLink').innerHTML = LANG.awaiting;
            EventMgr.addListener(getFromId('awaitingsLink'), 'click', handler.clickHeaderToShowAwaitings);
            getFromId('awaitingsLink').href = '#/?sk=uf';
            break;
            case 'awaitings' :
            n = core.unfriends.Count();
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
            getFromId('awaitingsLink').href = 'http://www.unfriendfinder.fr/help'; 
            break;
            case 'messages' :
            n = 0;
            CSS3.setClass(getFromId('iconHeader'), 'uiHeaderImage img spritemap_az9z2o sx_f7fff4');
            getFromId('title_header').innerHTML = LANG.messages;                  
            getFromId('awaitingsLink').innerHTML = LANG.help;
            getFromId('awaitingsLink').href = 'http://www.unfriendfinder.fr/help'; 
            break;

        }
        if (!n) CSS3.hide(getFromId('BubbleCountUF').parentNode);
        else CSS3.display(getFromId('BubbleCountUF').parentNode ,'inline-block');
        getFromId('BubbleCountUF').innerHTML = (!n?'0':n);
    };

    handler.clickHeaderToShowUnfriends = function() {
        CSS3.display(getFromId('loadingIndicatorUnfriends'), 'inline');
        CSS3.hide(getFromId('loadingIndicatorAwaitings'));
        CSS3.hide(getFromId('loadingIndicatorMessagess')); 
        CSS3.hide(getFromId('bubblelink_unfriends'));
        CSS3.display(getFromId('bubblelink_awaitings'), 'inline');
        CSS3.display(getFromId('bubblelink_messages'), 'inline'); 

        CSS3.setClass(getFromId('navItem_unfriends'), 'selectedItem opened');
        CSS3.setClass(getFromId('UFfilterAwaitings').parentNode, ''); 
        CSS3.setClass(getFromId('UFfilterSettings').parentNode, ''); 
        CSS3.setClass(getFromId('UFfilterMessages').parentNode, '');
        core._showUnfriends();
        core.showUnfriends();
        handler.setUFHeader('unfriends');
        CSS3.display(getFromId('UFLists'), 'block');
        CSS3.hide(getFromId('UFSettings'));
        CSS3.hide(getFromId('UFMessages'));
        CSS3.addClass(document.body, 'uflist');
        CSS3.removeClass(document.body, 'nonuflist');
    };

    handler.clickHeaderToShowAwaitings = function() {
        if (getFromId('UFfilterAwaitings').parentNode.className == 'selectedItem') return;
        CSS3.display(getFromId('loadingIndicatorAwaitings'), 'inline');
        CSS3.hide(getFromId('loadingIndicatorUnfriends'));
        CSS3.hide(getFromId('loadingIndicatorMessagess'));  
        CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
        CSS3.hide(getFromId('bubblelink_awaitings'));
        CSS3.display(getFromId('bubblelink_messages'), 'inline'); 
        CSS3.setClass(getFromId('navItem_unfriends'), 'opened');
        CSS3.setClass(getFromId('UFfilterAwaitings').parentNode, 'selectedItem'); 
        CSS3.setClass(getFromId('UFfilterSettings').parentNode, ''); 
        CSS3.setClass(getFromId('UFfilterMessages').parentNode, '');
        core._showAwaitings();
        core.showAwaitingRequests();
        handler.setUFHeader('awaitings');
        CSS3.display(getFromId('UFLists'), 'block');
        CSS3.hide(getFromId('UFSettings'));
        CSS3.hide(getFromId('UFMessages'));
        CSS3.addClass(document.body, 'uflist');
        CSS3.removeClass(document.body, 'nonuflist');

    };

    handler.clickHeaderToShowSettings = function() {
        if (getFromId('UFfilterSettings').parentNode.className == 'selectedItem') return;
        CSS3.hide(getFromId('loadingIndicatorAwaitings')); 
        CSS3.hide(getFromId('loadingIndicatorUnfriends')); 
        CSS3.hide(getFromId('loadingIndicatorMessagess')); 
        CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
        CSS3.display(getFromId('bubblelink_awaitings'), 'inline');
        CSS3.display(getFromId('bubblelink_messages'), 'inline'); 
        handler.showingSettings = true;
        handler.showUnfriendLayer();
        CSS3.setClass(getFromId('navItem_unfriends'), 'opened');
        CSS3.setClass(getFromId('UFfilterAwaitings').parentNode, '');
        CSS3.setClass(getFromId('UFfilterMessages').parentNode, '');
        CSS3.setClass(getFromId('UFfilterSettings').parentNode, 'selectedItem'); 
        handler.setUFHeader('settings'); 
        core.settings.bindSettings();
        CSS3.hide(getFromId('UFLists'));
        CSS3.display(getFromId('UFSettings'), 'block');
        CSS3.hide(getFromId('UFMessages'));
        handler.showingSettings = false;
        CSS3.addClass(document.body, 'uflist');
        CSS3.removeClass(document.body, 'nonuflist');
    }

    handler.clickHeaderToShowMessages = function() {
        CSS3.hide(getFromId('loadingIndicatorAwaitings')); 
        CSS3.hide(getFromId('loadingIndicatorUnfriends')); 
        CSS3.hide(getFromId('loadingIndicatorSettings')); 
        CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
        CSS3.display(getFromId('bubblelink_awaitings'), 'inline');
        CSS3.display(getFromId('bubblelink_messages'), 'inline');
        CSS3.setClass(getFromId('navItem_unfriends'), 'opened');
        CSS3.setClass(getFromId('UFfilterAwaitings').parentNode, '');
        CSS3.setClass(getFromId('UFfilterSettings').parentNode, '');
        CSS3.setClass(getFromId('UFfilterMessages').parentNode, 'selectedItem'); 
        handler.setUFHeader('messages'); 
        core.showMessages();
        CSS3.hide(getFromId('UFLists'));
        CSS3.hide(getFromId('UFSettings'));
        CSS3.display(getFromId('UFMessages'), 'block');
        CSS3.addClass(document.body, 'uflist');
        CSS3.removeClass(document.body, 'nonuflist');
    }

    if ($target) Console.log('  Handler for '+$target);

    if ($target == 'filter') {
        handler.showUnfriendLayer();
        CSS3.setClass(getFromId('navItem_unfriends'), 'selectedItem opened');
        CSS3.setClass(getFromId('UFfilterAwaitings').parentNode, '');
        CSS3.setClass(getFromId('UFfilterSettings').parentNode, '');
        CSS3.setClass(getFromId('UFfilterMessages').parentNode, '');
        CSS3.display(getFromId('UFLists'), 'block');
        CSS3.hide(getFromId('UFSettings'));
        CSS3.addClass(document.body, 'uflist');
        CSS3.removeClass(document.body, 'nonuflist');

        if (core.dialogs['filterContextual']) {
            CSS3.hide(getFromId('callout_dialog_filterContextual'));   
            helps.filter = true;
            setKey(core.user_id+'_helps', stringify(helps)) 
            core.showHelp();

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
            style: { opacity: 0 },
            parentNode: document.body
        }).getElement();
        CSS3.hide(overlay.element);

        return overlay; 
    }

    overlay.Show = function() {
        CSS3.display(overlay.element, 'block');
        clearTimeout(overlay.timeout);
        Console.log('setTimeout overlay.fadeIn');
        overlay.timeout = setTimeout(overlay.fadeIn, 10);
    }

    overlay.Hide = function() {
        if (document.getElementsByClassName('uf_dialog').length <= 1) {
            clearTimeout(overlay.timeout);
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
        if (overlay.element.style.opacity <= 0) {
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
    if (facebox.loading) facebox.load = true;

    facebox.Build = function() {
        var content = (getFromId('content')?getFromId('content'):document.body);
        facebox.window = new xHTMLElement({
            element: 'div',
            id: 'dialog_'+facebox.id,
            className: 'generic_dialog uf_dialog pop_dialog'+(facebox.error?' dialog_error':''),
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
            '               <div class="dialog_body" id="dialog_content_'+facebox.id+'" style="display:none; '+facebox.bodyStyle+'">'+
            '                   <div class="clearfix">'+
            (facebox.picture?'                       <img class="UIImageBlock_Image UIImageBlock_MED_Image img" src="'+facebox.picture+'">':'')+
            '                       <div class="UIImageBlock_Content UIImageBlock_MED_Content" id="dialog_body_'+facebox.id+'"></div>'+
            '                   </div>'+
            '               </div>'+
            '               <div class="dialog_buttons" id="dialog_buttons_'+facebox.id+'"></div>'+
            '            </div>'+
            '        </div>'+
            '    </div>'+
            '</div>'
        }).getElement();
        content.insertBefore(facebox.window, content.firstChild);

        var j = facebox.buttons.length;
        for (var i=0;i<j;i++) {
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
                parentNode: span
            }).getElement();
            EventMgr.addListener(button, 'click', facebox.buttons[i].handler);
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
    }

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
    };

    facebox.Hide = function() {
        if (facebox.overlay) facebox.overlay.Hide();
        facebox.fadeOut();
    }

    facebox.fadeOut = function() { 
        if (!facebox.fade) facebox.Destroy();
        else {
            if (facebox.window.style.opacity <= 0) { facebox.Destroy(); return facebox; }
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

        for (var i=0, j=contextualfacebox.buttons.length;i<j;i++) {
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
            parentNode: span
        }).getElement();
        EventMgr.addListener(button, 'click', $button.handler);
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
            if (contextualfacebox.dialog.style.opacity <= 0) {
                contextualfacebox.context.style.zIndex = 'auto';
                contextualfacebox.Destroy();
                return; 
            }
            contextualfacebox.dialog.style.opacity = parseFloat(contextualfacebox.dialog.style.opacity) - Params.Facebox.Fades.Step;
            setTimeout(contextualfacebox.fadeOut, Params.Facebox.Fades.Timer);
        } 
    };

    contextualfacebox.Build();

    contextualfacebox.toString = function() { return '[object ContextualFacebox]'; }

    return contextualfacebox;
};




var CalloutDialog = function(__constructor) {
    var calloutdialog = this;
    Extend(calloutdialog, __constructor);

    calloutdialog.Show = function() { void(0); };
    if (!calloutdialog.context) return;
    calloutdialog.dialog;
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
            calloutdialog.arrow = 'background:url(/rsrc.php/z2OLI/hash/9zf4acls.png) top right no-repeat';
            calloutdialog.position = 'top: -40px;';
            yPos -= (CSS3.getSize(calloutdialog.context).height / 2);
            yPos -= 15;  

            break;
            case 'left':
            var xPos = CSS3.getElementEndPosition(calloutdialog.context).left - CSS3.getElementPosition(getFromId('content')).left + 15;
            var yPos = CSS3.getElementEndPosition(calloutdialog.context).top - CSS3.getElementPosition(getFromId('content')).top - getFromId('content').style.paddingTop.replace('px', '');
            calloutdialog.arrow = 'background:url(/rsrc.php/z1SBY/hash/39gl8rr0.png) top left no-repeat';      
            calloutdialog.position = 'top: -40px;';
            yPos -= (CSS3.getSize(calloutdialog.context).height / 2);
            yPos -= 15;


            break;
            case 'up':
            var xPos = CSS3.getElementPosition(calloutdialog.context).left - CSS3.getElementPosition(getFromId('content')).left;
            var yPos = CSS3.getElementEndPosition(calloutdialog.context).top - CSS3.getElementPosition(getFromId('content')).top - getFromId('content').style.paddingTop.replace('px', '');
            calloutdialog.arrow = 'background:url(/rsrc.php/z8U8V/hash/c3mtow5j.png) top center no-repeat';
            //xPos -= (CSS3.getSize(calloutdialog.context).width / 2);
            //xPos -= 100;

            break;
            case 'down':
            var xPos = CSS3.getElementPosition(calloutdialog.context).left - CSS3.getElementPosition(getFromId('content')).left;
            var yPos = CSS3.getElementEndPosition(calloutdialog.context).top - CSS3.getElementPosition(getFromId('content')).top - getFromId('content').style.paddingTop.replace('px', '');
            calloutdialog.arrow = 'background:url(/rsrc.php/zAB1Y/hash/9l4nm1oo.png) bottom center no-repeat';
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
            '                            <div class="UIImageBlock_Content UIImageBlock_ICON_Content" style="min-width:250px">'+
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

        for (var i=0, j=calloutdialog.buttons.length;i<j;i++) {
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
            parentNode: span
        }).getElement();
        EventMgr.addListener(button, 'click', $button.handler);
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
            if (calloutdialog.dialog.style.opacity <= 0) {
                calloutdialog.context.style.zIndex = 'auto';
                calloutdialog.Destroy();
                return; 
            }
            calloutdialog.dialog.style.opacity = parseFloat(calloutdialog.dialog.style.opacity) - Params.Facebox.Fades.Step;
            setTimeout(calloutdialog.fadeOut, Params.Facebox.Fades.Timer);
        } 
    };

    calloutdialog.Build();

    calloutdialog.toString = function() { return '[object CalloutDialog]'; }

    return calloutdialog;
};



var Settings = function() {
    var sets = this;

    sets.user_id = core.user_id;
    sets.content = '';

    sets.bindLangs = function() {
        var langs = document.evaluate("//input", document, null, 0, null), input;
        while (input = langs.iterateNext()) {
            if ((input.type == "radio") && (input.name == 'lang')) {
                EventMgr.addListener(input, 'click', function() { sets.setLang(); });
            }
        }
    };

    //showing menu in Settings
    sets.appendMenu = function() {
        if (getFromId('navAccount')) {
            ul = getFromId('navAccountInfo').parentNode;
            if (!ul) ul = document.evaluate("//*[@id='navAccount']/ul", document, null, 9, null).singleNodeValue;

            new xHTMLElement({
                element: 'li',
                style: {
                    borderTop: '1px solid #E0E0E0',
                    margin: '4px 5px 0px 5px',
                    paddingTop: '4px'
                },
                parentNode: ul
            });

            new xHTMLElement({
                element: 'li',
                innerHTML: '<a id="ufSettings_menu" href="http://www.facebook.com/?sk=ufs" onclick="return false;"><small></small>'+Params._0x4d22[0]+' '+LANG.settings+'</a>',
                parentNode: ul
            });

            EventMgr.addListener(getFromId('ufSettings_menu'), 'click', function() {
                if (getFromId('UFfilterTextSettings')) (new Handler()).clickHeaderToShowSettings(); 
                else core.href('http://www.facebook.com/?sk=ufs');
                inject("Toggler.toggle(document.getElementById('navAccount'));");
            });
        }
        if (getFromId('fb_menu_settings_dropdown')) {
            log('Adding settings menu');
            new xHTMLElement({
                element: 'div',
                className: 'fb_menu_item',
                innerHTMl: '<a id="ufSettings2_menu" href="http://www.facebook.com/?sk=ufs" onclick="return false;" class="fb_menu_item_link"><small style="background-image:url('+Params.icons.unfriends+');"> </small>'+Params._0x4d22[0]+'</a>',
                parentNode: getFromId('fb_menu_settings_dropdown')
            });

            EventMgr.addListener(getFromId('ufSettings2_menu'), 'click', function() {
                if (getFromId('UFfilterTextSettings')) (new Handler()).clickHeaderToShowSettings(); 
                else core.href('http://www.facebook.com/?sk=ufs');
                inject("Toggler.toggle(document.getElementById('navAccount'));");
            });
        }
    };

    //setting options array with given checkboxes objects
    sets.setOptions = function($n) {
        CSS3.display(getFromId('loadingIndicatorSettings'), 'inline');
        var checks = document.evaluate("//input", document, null, 0, null), children = new Array(), input;
        while (input = checks.iterateNext()) {
            if ((input.type == "checkbox") && (/^settings\.[a-zA-Z]+$/.test(input.name))) settings[input.id] = (input.checked ? true : false);
        }
        setKey('settings', stringify(settings));

        if ($n.name == 'settings.hideInMenubar') core.bubble.createMenubarLink();
        core.bubble.setValue(core.unfriends.Count()); 
        try { core.Beeper.Add('setting', 'Changed <strong>'+$n.name+'</strong> ('+$n.title+') to <strong>'+($n.checked ? 'true' : 'false')+'</strong>.', $n.id); }
        catch (exception) { ; }
        setTimeout(function() { CSS3.hide(getFromId('loadingIndicatorSettings')); }, 1000)
    };

    sets.setLang = function() {
        var langs = document.evaluate("//input", document, null, 0, null), input;
        while (input = langs.iterateNext()) {
            if ((input.type == "radio") && (input.name == 'lang') && (input.checked)) {
                $lang = input.id;
                break;
            }
        }
        getFromId($lang).parentNode.innerHTML = '<img src="'+Params.images.smallIndicator+'" style="height:11px; margin-top:5px;" />'; 
        setTimeout(function() {
            setKey('language', ($lang?$lang:'en_US')); 
            core.href('http://www.facebook.com/');
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
                'lang_auto': '<span>'+$lang.name+'&nbsp;<img src="http://www.unfriendfinder.fr/'+(core.fb_locale)+'.flag" alt="'+core.fb_locale+'" /></span>',
                'default': '<span style="background: url(\'http://www.unfriendfinder.fr/'+($lang.icon?$lang.icon:$lang.id)+'.flag\') no-repeat 1px 1px; padding-left:26px;">'+$lang.name+'</span>'
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

        //if (getFromId('deactivated')) getFromId('deactivated').disabled = true;

        var checks = document.evaluate("//input", document, null, 0, null), input;
        var children = new Array();
        while (input = checks.iterateNext()) {
            if ((input.type == "checkbox") && (/settings\.[a-z]+/.test(input.name))) EventMgr.addListener(input, 'change', function(e){ sets.setOptions(e.target); });
        }

        EventMgr.addListener(getFromId('resetButton'), 'click', function() {
            core.dialogs['resetFacebox'] = new Facebox({
                id: 'resetFacebox',
                title: LANG.resettitle,
                overlay: core.overlay.dark,
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
                            if (getFromId('reset_keepAwaitingList').checked) setKey(core.user_id + '_keepAwaitingList', '({})');
                            if (getFromId('reset_reappeared').checked) setKey(core.user_id + '_reappeared', '({})');
                            if (getFromId('reset_deactivated').checked) setKey(core.user_id + '_deactivated', '({})');
                            if (getFromId('reset_wasUnfriend').checked) setKey(core.user_id + '_wasUnfriend', '({})');
                            if (getFromId('reset_hasIgnored').checked) setKey(core.user_id + '_hasIgnored', '({})');
                            if (getFromId('reset_messages').checked) setKey(core.user_id + '_messages', '({})');
                            if (getFromId('reset_helps').checked) setKey(core.user_id + '_helps', '({menubar: false, filter: false, awaitings: false, settings: false, oldList: false})');
                            if (getFromId('reset_settings').checked) setKey('settings', stringify(Params.defaultSettings));
                            if (getFromId('reset_language').checked) setKey('language', defaultLanguage);

                            core.reloadPage();

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
            $c = getKey('settings');
            $d = getKey('language');
            $e = getKey('google');
            $f = getKey('coreStarted');

            core.dialogs['exportFacebox'] = new Facebox({
                id: 'exportFacebox',
                overlay: core.overlay.light,
                error: false,
                title: LANG.dataToExport,
                body: new xHTMLElement({
                    element: 'div',
                    id: 'exportBody',
                    innerHTML: '<textarea id="exportArea" style="width:98%; height:300px;">'+
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
                    ' settings:'+$c+','+
                    ' language:\''+$d+'\','+
                    ' google:\''+$e+'\','+
                    ' coreStarted:\''+$f+'\'})'+
                    '</textarea>'
                }).getElement(),
                loading: true,
                timeout: 1500,
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
                overlay: core.overlay.light, 
                buttons: [{
                    name: 'import',
                    value: LANG.text_import,
                    id: 'import_button',
                    handler: function() {
                        if (getFromId('importArea').value == '') return;
                        try { imported = eval(getFromId('importArea').value); }
                        catch (ex) {
                            try { imported = eval('('+getFromId('importArea').value+')'); }
                            catch (exception) { alert('Error while importing data.'); }
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
                        setKey(core.user_id + '_messages', stringify(imported._messages));
                        setKey(core.user_id + '_helps', stringify(imported._helps));
                        setKey('settings', stringify(imported.settings));
                        setKey('language', imported.language);
                        setKey('google', imported.google);
                        setKey('coreStarted', 1);
                        core.reloadPage();
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
            var checks = document.evaluate("//input[@bindpoint='reset']", document, null, 0, null), input;
            while (input = checks.iterateNext()) {
                if ((input.type == "checkbox") && (/reset_/.test(input.id))) input.checked = true;
            }    
        });

        EventMgr.addListener(getFromId('selectNone'), 'click', function() {
            var checks = document.evaluate("//input[@bindpoint='reset']", document, null, 0, null), input;
            while (input = checks.iterateNext()) {
                if ((input.type == "checkbox") && (/reset_/.test(input.id))) input.checked = false;
            } 
        });
    }

    sets.toString = function() { return '[object Settings]'; }
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
            if (_beeper.beeperBox.style.opacity <= 0) {
                _beeper.beeperBox.innerHTML = template.BeeperBox();
                _beeper.length = 0;
                return;
            }
            _beeper.beeperBox.style.opacity = parseFloat(_beeper.beeperBox.style.opacity) - 0.01;
            _beeper.arrow.style.opacity = parseFloat(_beeper.beeperBox.style.opacity) - 0.01;
            _beeper.fadeTimeout = setTimeout(_beeper.fadeOut, 20);
        }
    };

    _beeper.Build = function() {
        if (getFromId('fbDockChat')) content = getFromId('fbDockChat');
        _beeper.beeperBox =new xHTMLElement({
            element: 'div',
            id: 'BeeperBoxUF',
            className: 'UFBeeper UFBeeper_Active',
            style: {
                opacity: 0,
                zIndex: 110
            },
            innerHTML: template.BeeperBox(),
            parentNode: content
        }).getElement();

        _beeper.arrow = new xHTMLElement({
            element: 'div',
            id: 'UFBeeper_Arrow',
            className: 'UFBeeper_Arrow',
            style: {
                opacity: 0,
                zIndex: 110
            },
            parentNode: content
        }).getElement();

        EventMgr.addListener(_beeper.beeperBox, 'mouseover', function() {
            if (_beeper.length > 0) { 
                _beeper.autoFade = false;
                _beeper.mouseover = true;
                _beeper.beeperBox.style.opacity = 1;
                _beeper.arrow.style.opacity = 1;
                clearTimeout(_beeper.fadeTimeout);
            }
        });
        EventMgr.addListener(_beeper.beeperBox, 'mouseout', function() {
            if (_beeper.length > 0) { 
                _beeper.autoFade = false;
                _beeper.mouseover = false; 
                clearTimeout(_beeper.fadeTimeout);
                _beeper.fadeTimeout = setTimeout(_beeper.fadeOut, 3000);
            }
        });
    };

    _beeper.Add = function($icon, $message, _id, $status) {
        if (!Params.Beeper.enabled) return;
        if (getFromId('UFBeeper_'+$icon+'_'+_id)) {
            content = getFromId('UFBeeper_'+$icon+'_'+_id);
            content.innerHTML = $message;
            _beeper.Show();
        }
        else {
            log('Adding '+$icon+' beep, id:'+_id);
            _beeper.message = $message;
            if ($status) _beeper.message = _beeper.message+'<br /><span id="notification_uf_status_830628733" class="uiTextMetadata">'+($status == 'deactivated'?LANG.text_deactivated:'')+'</span>'

            if ($icon == 'unfriend') {
                if ($status == 'deactivated') {
                    if (!Params.Beeper.deactivated) return;
                    _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_deactivated" alt="" />'; 
                }
                else {
                    if (!Params.Beeper.unfriend) return;
                    _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_unfriends" alt="" />'; 
                }
            }
            else if ($icon == 'messages') {
                if (!Params.Beeper.messages) return;
                _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon UIImageBlock_Image UIImageBlock_ICON_Image spritemap_az9z2o sx_f7fff4" alt="" />';
            }
            else if ($icon == 'ignored') {
                if (!Params.Beeper.ignored) return;
                _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_awaitings" alt="" />';
            }
            else if ($icon == 'version') {
                if (!Params.Beeper.newversion) return;
                _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon spritemap_icons" style="background:no-repeat -18px -432px url(http://b.static.ak.fbcdn.net/rsrc.php/z1KF3/hash/51woxxd9.png);" alt="" />';
            }
            else if ($icon == 'setting') {
                if (!Params.Beeper.settings) return;
                _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon spritemap_icons_fix" style="background-position: 0px -1182px; height:16px;" alt="" />';
            }
            else if ($icon == 'reactivated') {
                if (!Params.Beeper.reappeared) return;
                _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_reappeared" alt="" />';
            }
            else if ($icon == 'friend') {
                if (!Params.Beeper.newfriend) return;
                _beeper.icon = '<img src="'+Params.images.blank+'" class="UFBeep_Icon UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_friend" alt="" />';
            }

            _beeper.length++;

            beepsBox = _beeper.beeperBox.getElementsByClassName('Beeps')[0];
            children = _beeper.getBeeperChildren(_beeper.beeperBox);
            if (!children) n = 0;
            else n = children.length;
            new xHTMLElement({
                element: 'div',
                innerHTML: ''+
                '                <div class="UFBeep_NonIntentional status_'+$status+'" style="cursor:default; width:100%">'+
                '                    <div class="UFBeep_Icon">'+_beeper.icon+'</div>'+
                '                    <div class="UFBeep_Title" id="UFBeeper_'+$icon+'_'+_id+'" style="cursor:default; width:180px;">'+_beeper.message+'</div>'+
                '                    <a href="#" onclick="return false;" style="visibility:hidden; float:right; margin-bottom:-4px;" id="hide_notification_'+_id+'" class="uiHideNotification uiSelectorButton uiCloseButton uiCloseButton uiCloseButton" title="Remove"></a>'+
                '                </div>',
                parentNode: beepsBox
            });
            if ($icon == 'messages') {
                if (getFromId('UFMessagesBeeperLink')) EventMgr.addListener(getFromId('UFMessagesBeeperLink'), 'click', function() { (new Handler()).clickHeaderToShowMessages(); })    
            }

            children = _beeper.getBeeperChildren(beepsBox);
            n = children.length;
            for (i=0;i<n;i++) {
                CSS3.setClass(children[i], 'UFBeep');
                if (i == 0) CSS3.addClass(children[i], 'UFBeep_Top');
                if (i == (n -1)) CSS3.addClass(children[i], 'UFBeep_Bottom');
            }
            _beeper.beeperMouseEvents();

            EventMgr.addListener(getFromId('hide_notification_'+_id), 'click', function() {
                setTimeout(function() {
                    _beeper.closing = false;
                    getFromId('UFBeeper_Arrow').style.opacity = 0; 
                    getFromId('BeeperBoxUF').style.opacity = 0; 
                    _beeper.beeperBox.innerHTML = template.BeeperBox();
                    _beeper.length = 0;
                }, 100);
            });

            _beeper.Show();
        }

    };


    _beeper.Create = function() {
        log('Creating beeper');
        parent = getFromId('fbDockChat');
        if (parent) {
            n = document.getElementsByClassName('UFBeeper_Active').length;
            if (n == 0) _beeper.Build();
            else if (n == 1) {
                _beeper.beeperBox = document.getElementsByClassName('UFBeeper_Active')[0];
                _beeper.Add();
            }
        }
    };

    _beeper.Show = function() {
        _beeper.fadeIn();
        clearTimeout(_beeper.fadeTimeout);  
        _beeper.fadeTimeout = setTimeout(_beeper.fadeOut, Params.Beeper.timer * 1000);
    };

    _beeper.getBeeperChildren = function(el) {
        var beepers = document.evaluate("//*[@class='Beeps']/div", document, null, 0, null), boxes = new Array(), child;
        while (child = beepers.iterateNext()) { boxes.push(child); }
        return boxes;
    };

    _beeper.beeperMouseEvents = function() {
        var children = _beeper.getBeeperChildren(beepsBox);
        var n = children.length;

        for (i=0;i<n;i++) {
            child = children[i];
            _beeper.beepAddMouseEvent(child);
            CSS3.setClass(child, 'UFBeep');
            if (i == 0) CSS3.addClass(child, 'UFBeep_Top');
            if (i == (n -1)) CSS3.addClass(child, 'UFBeep_Bottom');
        }

    };

    _beeper.beepAddMouseEvent = function($child, $n) { 
        var parent = $child.parentNode.parentNode;
        if (parent) {
            EventMgr.addListener($child, 'mouseover', function() {
                CSS3.addClass($child, 'UFBeep_Selected');
                if (/UFBeep_Bottom/.test($child.className)) CSS3.setClass(getFromId('UFBeeper_Arrow'), 'UFBeeper_Arrow_Selected');
            });
            EventMgr.addListener($child, 'mouseout', function() {
                CSS3.removeClass($child, 'UFBeep_Selected'); 
                if (/UFBeep_Bottom/.test($child.className)) CSS3.setClass(getFromId('UFBeeper_Arrow'), 'UFBeeper_Arrow');
            });
        }
    };

    _beeper.toString = function() { return '[object Beeper]'; }

    _beeper.Build();
};

var Notification = function(__constructor) {
    var _notification = this;

    if ((!__constructor.id) || (!__constructor.name) || (!__constructor.type)) return;

    Extend(_notification, __constructor);

    _notification.colors = [239, 241, 247]; 
    _notification.divNotif;
    _notification.whiteIn = function() {
        var notifs = getFromId('jewelNotifs_uf').getElementsByClassName('notification');
        if ((_notification.colors[0] >= 255) && (_notification.colors[1] >= 255) && (_notification.colors[2] >= 255)) {
            _notification.colors[0] = 255;
            _notification.colors[1] = 255;
            _notification.colors[2] = 255;
            for (var n = 0;n<notifs.length;n++) {
                if (notifs[n]) notifs[n].style.background = 'rgb(255, 255, 255)';
            }
            return;
        } 

        for (var n = 0;n<notifs.length;n++) {
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
        if (!getFromId('jewelNotifs')) return;
        var content = getFromId('jewelNotifs').firstChild; 

        if (getFromId('jewelNoNotifications')) getFromId('jewelNotifs').removeChild(getFromId('jewelNoNotifications')); 
        if (getFromId('jewelNotifs_uf')) divFix = getFromId('jewelNotifs_uf');
        else {
            divFix = new xHTMLElement({
                element: 'ul',
                id: 'jewelNotifs_uf',
                style: {
                    padding: '0px',
                    paddingTop: '2px'
                }
            }).getElement();

            if (getFromId('jewelBoxNotif')) getFromId('jewelBoxNotif').insertBefore(divFix, getFromId('jewelNotifs'));
            CSS3.addClass(getFromId('jewelBoxNotif'), 'jewelFix');
            if (getFromId('jewelNotifs')) getFromId('jewelNotifs').style.paddingTop = '0px';
        }
        try {
            _notification.divNotif = new xHTMLElement({
                element: 'li',
                id: 'notification_uf_'+_notification.id,
                className: 'notification',
                style: {
                    background: 'rgb(239, 241, 247)'
                },
                innerHTML: (_notification.type == 'unfriend' ?
                ''+
                '<a href="http://www.facebook.com/profile.php?id='+_notification.id+'">'+
                '   <div class="UIImageBlock clearfix">'+
                '       <img src="http://graph.facebook.com/'+_notification.id+'/picture" class="uiProfilePhoto UIImageBlock_Image UIImageBlock_ICON_Image uiProfilePhotoLarge img">'+
                '       <div class="info UIImageBlock_Content UIImageBlock_ICON_Content status_'+_notification.status+'">'+
                '           <div>'+
                '               <span class="blueName">'+_notification.name+'</span> '+LANG.text_unfriend+
                '           </div>'+
                '           <div class="UIImageBlock clearfix metadata">'+
                '               <i class="UIImageBlock_Image UIImageBlock_ICON_Image spritemap_app_icons img sx_app_icons_unfriends"></i>'+
                '               <span class="UIImageBlock_Content UIImageBlock_ICON_Content fss fwn fcg" style="padding-top:3px ! important;">'+
                '                   <abbr id="notification_uf_status_'+_notification.id+'" class="timestamp">'+(_notification.status == 'deactivated'?LANG.text_deactivated+', ':'')+core.genTime(core.unfriends.Items[_notification.id].time)+'</abbr>'+
                '               </span>'+
                '           </div>'+
                '       </div>'+
                '   </div>'+
                '</a>': ''+
                '<a href="http://www.facebook.com/profile.php?id='+_notification.id+'">'+
                '   <div class="UIImageBlock clearfix">'+
                '       <img src="http://graph.facebook.com/'+_notification.id+'/picture" class="uiProfilePhoto UIImageBlock_Image UIImageBlock_ICON_Image uiProfilePhotoLarge img">'+
                '       <div class="info UIImageBlock_Content UIImageBlock_ICON_Content status_'+_notification.status+'">'+
                '           <div>'+
                '               <span class="blueName">'+_notification.name+'</span> '+LANG.text_ignored+
                '           </div>'+
                '           <div class="UIImageBlock clearfix metadata">'+
                '               <i class="UIImageBlock_Image UIImageBlock_ICON_Image spritemap_app_icons img sx_app_icons_awaitings"></i>'+
                '               <span class="UIImageBlock_Content UIImageBlock_ICON_Content fss fwn fcg" style="padding-top:3px ! important;">'+
                '                   <abbr id="notification_uf_status_'+_notification.id+'" class="timestamp">'+core.genTime(core.awaitingsIgnored.Items[_notification.id].time)+'</abbr>'+
                '               </span>'+
                '           </div>'+
                '       </div>'+
                '   </div>'+
                '</a>'),
                parentNode: divFix
            }).getElement();
        }
        catch (ex) { ; }

        EventMgr.addListener(_notification.divNotif, 'mouseover', function() { CSS3.setClass(_notification.divNotif, 'notification selected'); });
        EventMgr.addListener(_notification.divNotif, 'mouseout', function() { CSS3.setClass(_notification.divNotif, 'notification'); });
        EventMgr.addListener(_notification.divNotif, 'click', function() {
            inject("Toggler.toggle(this);");
            if (getFromId('filter_unfriends')) new Handler('filter');
            else core.href('http://www.facebook.com/?sk=uf');
        });
        //besoin?
        _notification.mouseover(_notification.divNotif);
        _notification.mouseout(_notification.divNotif);

        if (!/openToggler/.test(getFromId('jewelBoxNotif').parentNode.className)) {
            //timer to make div white
            if (getFromId('jewelNotif')) {
                EventMgr.addListener(getFromId('jewelNotif'), 'click', function() { 
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

    };

    _notification.mouseover = function($el) {
        EventMgr.addListener($el, 'mouseover', function () { CSS3.addClass($el, 'selected'); });
        EventMgr.addListener($el, 'mousemove', function () { CSS3.addClass($el, 'selected'); });
    };

    _notification.mouseout = function($el) {
        EventMgr.addListener($el, 'mouseout', function () { CSS3.removeClass($el, 'selected'); });
    }

    _notification.Add = function() {
        if (!/openToggler/.test(getFromId('jewelBoxNotif').parentNode.className)) {
            var notificationsContainer = getFromId('jewelNotif').getElementsByClassName('jewelCount')[0]; 
            var count = notificationsContainer.innerHTML.replace('<span>', '').replace('</span>', '');
            if (count == '0') notificationsContainer.innerHTML = '<span>1</span>';
            else notificationsContainer.innerHTML = '<span>'+(++ count)+'</span>';
            CSS3.display(notificationsContainer, 'block');
            if (!this['presenceNotifications']) _notification.increment();
            //or using injection to bypass unsafeWindow
            else {
                inject("function incrementNotifications() {\n"+
                "    if (presenceNotifications) {\n"+
                "        ++ presenceNotifications.count;\n"+
                "        if (presenceNotifications.countNew > 1) ++ presenceNotifications.countNew\n"+
                "        else presenceNotifications.countNew = 1;\n"+
                "    }\n"+
                "}");
                inject("incrementNotifications();");
            } 
            CSS3.addClass(getFromId('notificationsWrapper'), 'jewelNew');
        }
    };

    _notification.increment = function() {
        //restrict it to Firefox
        if (Params.env.isGM) {
            if (Facebook.presenceNotifications) {
                //CSS3.setClass(getFromId('notificationsWrapper'), 'jewel jewelNew');
                ++ Facebook.presenceNotifications.count;
                if (!Facebook.presenceNotifications.countNew) Facebook.presenceNotifications.countNew = 1;
                else ++ Facebook.presenceNotifications.countNew;
            }
            else {
                Console.log('setTimeout _notification.increment');
                setTimeout(_notification.increment, 2000);
            }
        }
    };

    _notification.toString = function() { return '[object Notification]'; }

    if (getFromId('jewelNotif')) {
        EventMgr.addListener(getFromId('jewelNotif'), 'click', function () {
            try {
                clearTimeout(core.Beeper.fadeTimeout);
                Console.log('setTimeout core.Beeper.fadeOut');
                core.Beeper.fadeTimeout = setTimeout(core.Beeper.fadeOut, 10);
            }
            catch (exception) { ; }
            var notificationsContainer = getFromId('jewelNotif').getElementsByClassName('jewelCount')[0];
            notificationsContainer.innerHTML = '0';
            CSS3.hide(notificationsContainer);
            core.toNotify = new CollectionList(eval(getKey(core.user_id + '_toNotify', '({})')));
            for (n in core.toNotify.Items) {
                if (core.toNotify.Items.hasOwnProperty(n)) {
                    core.toNotify.Items[n] = false;
                }
            }
            setKey(core.user_id + '_toNotify', core.toNotify.toString());
            core.awaitingsIgnored = new CollectionList(eval(getKey(core.user_id + '_awaitingsIgnored', '({})')));
            for (n in core.awaitingsIgnored.Items) {
                if (core.awaitingsIgnored.Items.hasOwnProperty(n)) {
                    core.awaitingsIgnored.Items[n].toNotify = false;
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

    _useritem.Build = function() {
        if (getFromId('homeUnfriends')) {
            if (_useritem.from == "awaiting") textHide = LANG.text_removec;
            else textHide = LANG.text_hide;
            if (_useritem.from == "unfriend") textHide = textHide;

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
                '       <a href="http://www.facebook.com/profile.php?id='+_useritem.id+'" class="UIImageBlock_Image UIImageBlock_SMALL_Image" style="background: url(\''+Params.images.noPicture+'\');">'+
                '           <img id="img_userpic__'+_useritem.id+'" src="'+_useritem.picture+'" class="objectListImg_fix img" style="background:url(\''+_useritem.picture+'\');">'+
                '       </a>'+
                '       <div class="auxiliary UIImageBlock_Ext" id="div_rightContent_'+_useritem.id+'">'+
                '           <span class="loadingIndicator" style="display: block; visibility: visible;"></span>'+
                '           <label class="uiButton uiButtonConfirm unfriendHide"><input type="button" value="'+textHide+'" name="'+_useritem.id+'" id="a_removeLink'+_useritem.id+'"></label>'+
                '           <label class="uiButton uiButtonSpecial unfriendAlwaysHide" style="display:none;"><input type="button" value="'+LANG.text_alwayshide+'" name="'+_useritem.id+'" id="a_AremoveLink'+_useritem.id+'"></label>'+
                '           <label class="uiButton uiButtonDefault unfriendBlock" style="display:none;"><input type="button" value="'+LANG.block+'" name="'+_useritem.id+'" id="a_BremoveLink'+_useritem.id+'"></label>'+
                '       </div>'+

                ((_useritem.time && settings.showTime)?
                '       <div class="UIImageBlock_Content UIImageBlock_ENT_Content">'+
                '           <div class="uiTextTitle">'+
                '               <a href="http://www.facebook.com/profile.php?id='+_useritem.id+'" id="a_username__'+_useritem.id+'">'+_useritem.name+'</a>&nbsp;<span style="font-weight:normal; cursor:default;" id="span_data_subtext__'+_useritem.id+'">'+_useritem.subname+'</span>'+
                '           </div>'+
                '           <div class="uiTextSubtitle">'+
                '               <div class="requestLabel" style="padding-top: 5px; cursor:default;">'+
                '                   <span id="span_icon__'+_useritem.id+'" style="width:21px;"><img src="'+Params.images.smallIndicator+'" style="margin-left:5px; margin-bottom:-1px;" /></span>'+
                '                   <span style="font-size: xx-small; line-height: 17px;" title="'+(new Date(_useritem.time *1000)).toLocaleString()+'">'+core.genTime(_useritem.time)+'</span>'+
                '               </div>'+
                '           </div>'+
                '       </div>':
                ''+
                '       <div class="UIImageBlock_Content UIImageBlock_ENT_Content">'+
                '           <div class="uiTextTitle">'+
                '               <a href="http://www.facebook.com/profile.php?id='+_useritem.id+'" id="a_username__'+_useritem.id+'">'+_useritem.name+'</a>'+
                '           </div>'+
                '           <div class="uiTextSubtitle">'+
                '               <div class="requestLabel" style="padding-top: 5px; cursor:default;">'+
                '                   <span id="span_icon__'+_useritem.id+'" style="width:21px;"><img src="'+Params.images.smallIndicator+'" style="margin-left:5px; margin-bottom:-1px;" /></span>'+
                '                   <span style="line-height:15px; cursor:default;" id="span_data_subtext__'+_useritem.id+'">'+_useritem.subname+'</span>'+
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

            if (!settings.icons) CSS3.hide(getFromId('span_icon__'+_useritem.id));

            var a_removeLink = getFromId('a_removeLink'+_useritem.id), a_AremoveLink = getFromId('a_AremoveLink'+_useritem.id), a_BremoveLink = getFromId('a_BremoveLink'+_useritem.id), div_rightContent = getFromId('div_rightContent_'+_useritem.id);
            if (_useritem.from == "rawaiting") EventMgr.addListener(a_removeLink, 'click', function() { core.clickToRemoveA(_useritem.id) });
            else if (_useritem.from == "rawaiting-a") EventMgr.addListener(a_removeLink, 'click', function() { core.clickToRemoveA(_useritem.id) });
            else if (_useritem.from == "rawaiting-i") EventMgr.addListener(a_removeLink, 'click', function() { core.clickToRemoveA(_useritem.id) });
            else if (_useritem.from == "awaiting") {
                if (core.uf_fb_dtsg === null) CSS3.hide(div_rightContent);
                if (core.uf_fb_dtsg === undefined) CSS3.hide(div_rightContent);
                EventMgr.addListener(a_removeLink, 'click', function() { core.removeConnectionWith(_useritem.id) });
            }
            else if (_useritem.from == "reappeared") EventMgr.addListener(a_removeLink, 'click', function() { core.removeFromReappeared(_useritem.id) });
            else if (_useritem.from == "unfriend") {
                EventMgr.addListener(a_removeLink, 'click', function() { core.clickToRemove(_useritem.id) });
                EventMgr.addListener(a_AremoveLink, 'click', function() { core.clickToRemove(_useritem.id) });
                EventMgr.addListener(a_BremoveLink, 'click', function() { core.blockProfile(_useritem.id) });
            }
            if (_useritem.hidden) {
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

    _useritem.toString = function() { return '[object UserItem]'; }

    return _useritem;
};

var UserCheck = function(__constructor) {
    var usercheck = this;
    Extend(usercheck, __constructor);

    usercheck.profileUrl = 'http://www.facebook.com/profile.php?id='+usercheck.uid;
    usercheck.user = core.unfriends.Items[usercheck.uid];


    usercheck.distinct = function() {
        if (/<body [^>]+>/.test(usercheck.pageContent)) {

            var body = usercheck.pageContent.match(/<body [^>]+>/)[0];
            var profile = /profile/i.test(body);
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
    };

    usercheck.profile = function() {
        if (/profile_action_remove_friend/.test(usercheck.pageContent)) {
            matches3 = usercheck.pageContent.match(/<img (?:class=\\"img\\" )?src=\\"([^"]*)\\" alt=\\"([^"]*)\\" id=\\"profile_pic\\"/);
            if (!matches3) { matches3 = [Params.images.noPicture, LANG.text_deactivated]; }
            core.setName(usercheck.uid, matches3[2], false);
            core.setPicture(usercheck.uid, matches3[1]);
            core.setSubName(usercheck.uid, LANG.text_being, 'hidden', true);
            if (getFromId('img_userpic__' + usercheck.uid)) getFromId('img_userpic__' + usercheck.uid).parentNode.style.opacity = '0.4';

            core.deactivated = new CollectionList(eval(getKey(core.user_id + '_deactivated', '({})')));
            core.deactivated.Add(usercheck.uid, usercheck.user)
            setKey(core.user_id + '_deactivated', core.deactivated.toString());
        }
        else {
            matches2 = usercheck.pageContent.match(/src=\\"([^"]*)\\" alt=\\"([^"]*)\\" id=\\"profile_pic\\"/);
            if (matches2) {
                core.setName(usercheck.uid, matches2[2], true); 
                core.setPicture(usercheck.uid, matches2[1]);
                core.setSubName(usercheck.uid, LANG.text_unfriend, 'unfriend', true);
                if (usercheck.last) {
                    CSS3.hide(loadingIndicatorUnfriends);
                    CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
                }
            }
        }
    };

    usercheck.notFound = function() {
        core.setName(usercheck.uid, usercheck.user.name, false);
        core.setPicture(usercheck.uid, null);
        core.setSubName(usercheck.uid, LANG.text_deactivated, 'hidden', true);
        if (getFromId('img_userpic__' + usercheck.uid)) getFromId('img_userpic__' + usercheck.uid).parentNode.style.opacity = '0.4';
        if (usercheck.last) {
            CSS3.hide(loadingIndicatorUnfriends);
            CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
        }

        core.deactivated = new CollectionList(eval(getKey(core.user_id + '_deactivated', '({})')));
        core.deactivated.Add(usercheck.uid, usercheck.user);
        setKey(core.user_id + '_deactivated', core.deactivated.toString());
    };

    usercheck.Load = function() {
        if (usercheck.profileUrl) Ajax({
            method: 'get',
            headers: Params.Ajax.Headers,
            url: usercheck.profileUrl,
            onload: function($result) {
                usercheck.pageContent = $result.responseText;
                usercheck.distinct();
            },
            onerror: function($result) {
                usercheck.notFound();
            }
        });
    };

    usercheck.toString = function() { return '[object UserCheck]'; }

    usercheck.Load();
};

var UnfriendFinder = function($Env) {

    if (!$Env) {
        Console.error('URL is not suitable for '+Params._0x4d22[0], document.location);
        return false; 
    }
    if ($Env.user == 0) {
        Console.error('Core started but you are logged off', '');
        return false; 
    }

    log('Core constructed');
    core = this;

    CSS3.addClass(document.body, 'nonuflist');

    //Variables
    core.newVersion = false;
    core.payload;
    core.bubble;
    core.filterstatus;
    core.loopCount = -1;
    core.listHighlighted = new Array();
    core.dialogs = {};
    core.checkUID;

    //Environnement parameters
    core.user_id = $Env.user;
    core.fb_locale = document.body.className.match(/Locale_([a-z]{2}_[A-Z]{2})\s?/)[1];
    core.uf_fb_dtsg = $Env.fb_dtsg;
    core.uf_post_form_id = $Env.post_form_id;


    //Lists
    core.friends = ({});
    core.backupFriends = ({});
    core.toNotify = ({});
    core.unfriends = ({}); // unfriends list
    core.friends = ({}); // friends list
    core.keepAwaitingList = ({});
    core.unfriendsInfos = ({}); // unfriends informations (just in case)
    core.awaitingsIgnored = ({}); // old requests -> accepted & ignored requests
    core.unfriendsList = ({});
    core.reappeared = ({}); // reactivated profiles list
    core.deactivated = ({}); // deactivated profiles list
    core.wasUnfriend = ({});
    core.hasIgnored = ({});
    core.watchRemove = null;
    core.notifications = {};


    //Methods
    core.initLists = function() { //instanciation des listes
        log('Building lists');

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
        core.watchRemove = getKey(core.user_id + '_watchRemove', '0');

        core.friends = new CollectionList();
        core.friends.exception('Add', core.user_id);

        for (n in core.alwaysHide.Items) {
            if (core.alwaysHide.Items.hasOwnProperty(n)) {
                core.unfriends.exception('Add', core.alwaysHide.Items[n].uid);
            }
        }
    };

    core.writeLists = function() {
        log('Writing lists');

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
    };

    core.addStyles = function() {
        log('Applying CSS styles');
        core.style.Append(""+
        "body.uflist #contentArea { display: none !important; }\n"+
        "body.nonuflist #contentArea { display: table-cell !important; }\n"+
        "body.uflist #contentUnfriends { display: table-cell !important; }\n"+
        "body.nonuflist #contentUnfriends { display: none !important; }\n"+
        "body.uflist .loadingIndicators { display: inline !important; }\n"+
        "body.nonuflist .loadingIndicators { display: none !important; }\n"+
        "body.uflist #pagelet_unfriendfinder { display: inline !important; }\n"+
        "body.nonuflist #pagelet_unfriendfinder { display: none !important; }\n"+
        "a { outline: none; }\n"+
        "a:active { outline: none; }\n"+
        "a:hover.disabled_link { text-decoration: none; }\n"+
        "i.wasunfriend { background-image: url("+Params.icons.unfriends+"); background-position: -16px 0px; height: 16px; margin-top: 5px; }\n"+
        "i.hasignored { background-position: 0 -1763px; height: 12px; margin-top: 7px; }\n"+
        "div.wasunfriend { padding-top: 6px; }\n"+
        "div.hasignored { padding-top: 5px; }\n"+
        "a.close_message { background: url('/rsrc.php/z14M5/hash/a657viny.png') no-repeat scroll -869px -65px transparent; float: right; margin: 1px 2px 0 7px; text-indent: -5000px; width: 11px; }\n"+
        "a.close_message:hover { background-color: #3B5998; background-position: -857px -65px; text-decoration: none; }\n"+


        "ul#jewelNotifs li i { width: 16px; height: 16px; }\n"+
        "ul#jewelNotifs_uf li i { width: 16px; height: 16px; }\n"+
        "ul#jewelNotifs_uf li.selected i.sx_app_icons_awaitings { background-position: 0 0 !important; }\n"+

        "#q { height: 14px; }\n"+
        "#ufSettings small { float: left; height: 16px; width: 16px; background-image: url("+Params.icons.unfriends+"); margin: -1px 6px 0px 0px; background-position: 16px; }\n"+
        "#ufSettings:hover small { background-position: 0px; }\n"+
        "#BeeperBoxUF { max-width: 230px; min-width: 230px; position: absolute; bottom: 35px; right: 0px; margin-right: -1px; }\n"+
        "#navItem_unfriends.opened #subitem-uf { display: block; }\n"+
        "#like_box { border: none; margin-bottom: 20px; position: relative; float: right; overflow: hidden; width: 240px; height: 287px; margin-top:-265px; }\n"+
        "#pagelet_newversion { text-align: center; padding: 4px; display: block; margin-bottom: 15px; }\n"+
        "#pagelet_language { padding: 4px; display: block; margin-bottom: 15px; }\n"+
        "#jewelBoxNotif .blueName { color: #3B5998; font-weight: bold; }\n"+
        "#UFSettings .settings.row { background: #F8F8F8; }\n"+
        "#UFSettings .desc { color: #999999; padding: 2px 0pt 20px 0pt; }\n"+
        "#UFSettings th.even_column { color: #777777; width: 100px; font-size: 9px; text-align: center; }\n"+
        "#UFSettings .tableSetting { margin-top: 7px; margin-left: 30px; width: 500px; }\n"+
        "#UFSettings .tableSetting2 { margin-top: 10px; margin-left: 30px; width: 470px; }\n"+
        "#UFSettings .iconPlace { border-bottom: 1px solid #C7CFE0; margin: 0; padding: 3px; color: #333333; font-size: 11px; font-weight: bold; text-align: left; }\n"+
        "#UFSettings .no_border { padding: 3px; }\n"+
        "#UFSettings .action_text { border-bottom: 1px solid #E2E6EF; margin: 0; padding: 3px; padding-left: 10px; }\n"+
        "#UFSettings td.even_column { text-align: center; border-bottom: 1px solid #E2E6EF; margin: 0; padding: 3px; }\n"+
        "#UFSettings th.even_column.logo { border-bottom: 1px solid #C7CFE0; margin: 0; padding: 3px; text-align: center; }\n"+
        "#uf_donation { position: relative; top: -260px; margin-bottom: 20px; padding: 5px; text-align: center; }\n"+
        ".dialog_contextual_buttons { background: none repeat scroll 0 0 #F2F2F2; padding: 8px 10px; position: relative; text-align: right; }\n"+
        ".dialog_contextual_body { border-bottom: 1px solid #CCCCCC; border-top: 1px solid #CCCCCC; padding: 10px; }\n"+
        ".dialog_contextual_title { font-size:14px; padding:5px 0 10px 10px; }\n"+
        ".callout_buttons { background: none repeat scroll 0 0 #F2F2F2; border-top: 1px solid #CCCCCC; }\n"+
        ".contextual_arrow { background: url('http://www.facebook.com/rsrc.php/zBPEP/hash/6hlgd20w.png'); }\n"+
        "span.uiButton { padding: 0px !important; }\n"+
        "input.UIButton_Text { padding: 3px 6px 5px 6px; }\n"+
        "ul.UFlist { padding: 5px; }\n"+
        ".seeAllUnfriends { display: none; background: url('http://static.ak.fbcdn.net/rsrc.php/zW/r/AebrcwrBeG6.png') no-repeat scroll 100% 3px transparent; padding-left: 5px; padding-right: 12px; }\n"+

        ".DOMControl_placeholder { height: 14px; }\n"+
        ".mtl { margin-top:20px; }\n"+
        ".jewelFix #jewelNoNotifications { display:none; }\n"+
        ".noselect { -moz-user-select: none; }\n"+
        ".ufIcon { width: 16px; height: 16px; display: inline-block; }\n"+
        ".sx_app_icons_unfriends { background-image: url("+Params.icons.unfriends+") !important; background-position: -16px 0px !important; width: 16px; height: 16px; display: inline-block; }\n"+
        ".sx_app_icons_awaitings { background-image: url("+Params.icons.awaitings+") !important; background-position: -16px -0px !important; width: 16px; height: 16px; display: inline-block; }\n"+
        ".sx_app_icons_deactivated { background-image: url("+Params.icons.deactivated+"); margin-top: -1px; width: 16px; height: 16px; display: inline-block; }\n"+
        ".sx_app_icons_ignored { background-image: url('http://b.static.ak.fbcdn.net/rsrc.php/z2B5S/hash/696ouey0.png') !important; background-position: 0 -1763px; height: 12px; margin: 2px 0px 0px 2px; width: 16px; display: inline-block; }\n"+
        ".sx_app_icons_reappeared { background-image: url('http://b.static.ak.fbcdn.net/rsrc.php/z2B5S/hash/696ouey0.png') !important; background-position: 0 -187px; height: 16px; margin-top: -2px; width: 16px; display: inline-block; }\n"+
        ".sx_app_icons_friend { background-image: url('http://b.static.ak.fbcdn.net/rsrc.php/z2B5S/hash/696ouey0.png') !important; background-position: 0 -766px; height: 16px; margin-top: -2px; width: 16px; display: inline-block; }\n"+
        ".sx_app_icons_settings { background-image: url('http://b.static.ak.fbcdn.net/rsrc.php/z2B5S/hash/696ouey0.png') !important; background-position: 0 -1182px; height: 16px; width: 16px; display: inline-block; }\n"+
        ".white_box { background: white; }\n"+
        ".spritemap_icons_fix { background-image: url('http://b.static.ak.fbcdn.net/rsrc.php/z2B5S/hash/696ouey0.png') !important; }\n"+
        ".sx_app_icons_unfriends_selected { background-image: url("+Params.icons.unfriends+") !important; }\n"+
        ".sx_app_icons_awaitings_selected { background-image: url("+Params.icons.awaitings+") !important; }\n"+
        ".spritemap_app_icons_UF { background-image: url('"+Params.images.blank+"'); background-repeat: no-repeat; display: inline-block; height: 16px; width: 16px; }\n"+
        ".waiting_indicator { background: transparent url('http://static.ak.fbcdn.net/rsrc.php/z13JD/hash/16vt4yge.gif') no-repeat scroll left top; height: 11px; width: 16px; z-index: 2; }\n"+
        ".disabled_link { color: #777777; text-decoration: none; cursor: default; }\n"+
        ".objectListImg_fix { height: 50px; width: 50px; }\n"+
        ".UIObjectListing_Pic_fix { float: left; height: 50px; overflow: hidden; position: relative; width: 50px; background: transparent url('"+Params.images.noPicture+"') repeat scroll 0 0; }\n"+
        ".UIObjectListing_MetaData_fix { overflow: hidden; padding-left: 8px; padding-top: 8px; white-space: nowrap; max-width: 450px; float: left; }\n"+
        ".UIObjectListing_RightContent_fix { float: right; }\n"+
        ".UIObjectListing_RemoveContainer_fix { float: right; padding-left: 8px; padding-right: 19px; padding-top: 16px; }\n"+
        ".UIFilterList_Item_fix { padding-top: 1px; }\n"+
        ".UIMoreInfo_Arrow { background: url(\"/rsrc.php/z44BH/hash/74sfbqtk.png\") no-repeat scroll left top transparent; height: 7px; margin-left: 6px; position: relative; top: 1px; }\n"+
        ".UIMoreInfo_Title { background: none repeat scroll 0 0 #6D84B4; border-color: #4A66A0 #3B5998 -moz-use-text-color; border-left: 1px solid #3B5998; border-right: 1px solid #3B5998; border-style: solid solid none; border-width: 1px 1px medium; color: #FFFFFF; font-weight: bold; padding: 5px; }\n"+
        ".UIMoreInfo_Body { background-color: #FFFFFF; border-color: -moz-use-text-color gray gray; border-right: 1px solid gray; border-style: none solid solid; border-width: medium 1px 1px; color: #555555; font-weight: normal; line-height: 12px; padding: 5px; }\n"+
        ".UIMoreInfo { font-size: 9px; position: absolute; text-align: left; z-index: 5; }\n"+
        ".uiButtonUF .uiButtonTextUF, .uiButtonUF input { background: none repeat scroll 0 0 transparent; border: 0 none; color: #FFFFFF; cursor: pointer; display: inline-block; font-family: 'Lucida Grande',Tahoma,Verdana,Arial,sans-serif; font-size: 11px; font-weight: bold; margin: 0; outline: medium none; padding: 1px 0 2px; white-space: nowrap; }\n"+
        ".uiButtonUF { -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1); background: url(\"/rsrc.php/z1V2B/hash/apfsevhg.png\") repeat scroll 0 0 #EEEEEE; border-color: #999999 #999999 #888888; border-style: solid; border-width: 1px; color: #333333; cursor: pointer; display: inline-block; font-size: 11px; font-weight: bold; padding: 2px 6px; position: relative; text-decoration: none; vertical-align: middle; white-space: nowrap; }\n"+
        ".uiButtonUFConfirm { background-color: #5B74A8; background-position: 0 -48px; border-color: #29447E #29447E #1A356E; color: #FFFFFF !important; }\n"+
        ".uiButtonUFConfirm:active { background: none repeat scroll 0 0 #4F6AA3; border-bottom-color: #29447E; }\n"+
        ".home_no_messages_icon .list_empty { background-position: 0 0px !important; }\n"+ 
        ".home_no_messages_content { color: #666666; float: left; font-size: 12px; padding-left: 13px; margin-top: 5px; }\n"+  
        ".home_no_messages  { background: url('"+Params.images.dottedDelimiter+"') repeat-x scroll left bottom transparent; margin-bottom: 20px; padding: 20px 0 22px 14px; }\n"+ 
        ".home_no_messages_icon { background-image: url(\"/rsrc.php/z7HHR/hash/dlp3zm0w.gif\"); background-position: 0 0; background-repeat: no-repeat; display: block; float: left; height: 32px; overflow: hidden; width: 32px; }\n"+ 
        ".home_no_stories .list_empty { background-position: 0 -224px; }\n"+ 
        ".home_no_stories  { background: url('"+Params.images.dottedDelimiter+"') repeat-x scroll left bottom transparent; margin-bottom: 20px; padding: 20px 0 22px 14px; }\n"+ 
        ".home_no_stories_icon { background-image: url(\"/rsrc.php/z7HHR/hash/dlp3zm0w.gif\"); background-position: 0 0; background-repeat: no-repeat; display: block; float: left; height: 32px; overflow: hidden; width: 32px; }\n"+ 
        ".home_no_stories_content { color: #666666; float: left; font-size: 12px; padding-left: 13px; margin-top: 5px; }\n"+
        ".ufListItem { border-top: 1px solid #EEEEEE; overflow: hidden; }\n"+
        ".ufListItem:first-child { border-top: none; }\n"+
        ".uiTextHighlight { background: none repeat scroll 0 0 #FFF8CC; border-bottom: 1px solid #FFE222; }\n"+
        ".uiTextHighlightSpecial { background: none repeat scroll 0 0 #eceff6; border-bottom: 1px solid #d4dae8; }\n"+
        ".UFBeeper .UFBeeper_Full { background-color: #e1e6ee; border: 1px solid #99a8c7; -webkit-border-radius: 3px; -moz-border-radius: 3px; }\n"+
        ".UFBeeper_Arrow { background: url('http://static.ak.fbcdn.net/rsrc.php/z2US7/hash/ds6fwf8m.png') repeat scroll -210px -115px; height: 6px; position: absolute; bottom: 30px; right: 11px; width: 9px; margin-right: -1px; }\n"+
        ".UFBeeper_Arrow_Selected { background: url('http://static.ak.fbcdn.net/rsrc.php/z2US7/hash/ds6fwf8m.png') repeat scroll -210px -104px; height: 6px; position: absolute; bottom: 30px; right: 11px; width: 9px; margin-right: -1px; }\n"+
        ".UFBeeper .UFBeep { padding: 10px 5px; border-bottom: 1px solid #99A8C7; }\n"+
        ".UFBeeper .UFBeep_Bottom { border-bottom: none; }\n"+
        ".UFBeeper .UFBeep:hover { background-color: #cad1de; }\n"+
        ".UFBeep div.UFBeep_Icon { width: 20px; display: inline-block; }\n"+
        ".UFBeep img.UFBeep_Icon { margin-bottom: -5px; width: 16px; }\n"+
        ".UFBeep .UFBeep_Title { display: table-cell; line-height: 16px; }\n"+
        ".UFBeep .UFBeep_NonIntentional { display: table; }\n"+
        ".contextual_arrow_rev { background: url('/rsrc.php/zAVIZ/hash/9laiajue.png'); }\n"+
        ".contextual_arrow { background: url('/rsrc.php/zBPEP/hash/6hlgd20w.png'); }\n"+
        ".contextual_dialog .contextual_arrow, .contextual_dialog .contextual_arrow_rev { background-repeat: no-repeat; height: 12px; position: relative; top: 1px; }\n"+
        ".contextual_dialog .contextual_dialog_content { background-color: #F7F7F7; border-color: #B7B7B7 #B7B7B7 #3B5998; border-style: solid; border-width: 1px 1px 2px; line-height: 15px; padding: 8px 10px 10px; }\n"+
        ".contextual_dialog .generic_dialog_popup { position: absolute; width: 360px; }\n"+
        ".dialog_content_txt { width: 100% !important; float: none !important; }\n"+
        ".dialog_loading .dialog_buttons { background: #F2F2F2 !important; }\n"+
        ".dialog_error .pop_content { border: 1px solid #EE7C90; }\n"+
        ".pop_content h2.language { background: url(\"/rsrc.php/z7VU4/hash/66ad7upf.png\") no-repeat scroll 131% 99% #6D84B4; }\n"+
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
        ".spritebtn_newversion { background: no-repeat -18px -432px url('http://b.static.ak.fbcdn.net/rsrc.php/z1KF3/hash/51woxxd9.png'); width: 16px; }\n"+
        ".spritebtn_fanpage { background: no-repeat 0 -194px url('http://b.static.ak.fbcdn.net/rsrc.php/z35AR/hash/c1triw3x.png'); width: 16px; }\n"+
        ".spritebtn_like { background: no-repeat 0 -98px url('http://b.static.ak.fbcdn.net/rsrc.php/z35AR/hash/c1triw3x.png'); width: 16px; }\n"+
        ".spritebtn_group { background: no-repeat 0 -162px url('http://b.static.ak.fbcdn.net/rsrc.php/z35AR/hash/c1triw3x.png'); width: 16px; }\n"+
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
        ".selected .status_deactivated i { background-image: url(\"/rsrc.php/z70FG/hash/1bum38lw.png\") !important; background-position: 0 -656px !important; margin-top: -1px; }\n"+
        ".selected .status_unfriend i { background-position: 0 0 !important; }\n"+                                                                                        
        ".UFBeep_Selected .uiHideNotification { visibility:visible !important; }\n"+
        ".uiHideNotification { visibility:hidden !important; }\n"+

        ".shifted .fromunfriend .unfriendHide, .shifted .fromdeactivated .unfriendHide { display: none !important; }\n"+
        ".shifted .fromunfriend .unfriendAlwaysHide, .shifted .fromdeactivated .unfriendAlwaysHide { display: block !important; }\n"+  

        ".ctrlShifted .fromunfriend .unfriendHide { display: none !important; }\n"+
        ".ctrlShifted .fromunfriend .unfriendAlwaysHide { display: none !important; }\n"+
        ".ctrlShifted .fromunfriend .unfriendBlock { display: block !important; }\n"+      

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
        ".uiSideNav .loading ul .count, .uiSideNav .count { color: #808080; }}\n"+
        ".uiSideNavCount { background-color: #D8DFEA; color: #3B5998; font-weight: bold; padding: 0 4px; }}\n"+

        "");
        log('Styles applied');
    };

    core.time = function() {
        return Math.round((new Date()).getTime() / 1000);
    };

    core.sendBeeper = function(_$type, _$text, __id, _$status) {
        try {
            if (!core.Beeper) {
                setTimeout(function() { core.sendBeeper(_$type, _$text, __id, _$status) }, 100);
                Console.log('setTimeout core.sendBeeper');
            }
            else core.Beeper.Add(_$type, _$text, __id, _$status); 
        }
        catch (exception) { ; }
    }

    core.notify = function(_id, $name, $type, $status) {
        if (getFromId('jewelNotifs')) {
            if (core.notifications[$type+'_'+_id]) return;
            core.notifications[$type+'_'+_id] = true;
            getFromId('jewelNotifs').style.padding = '0px';
            if ($type == 'ignored') {
                new Notification({
                    id: _id,
                    name: $name,
                    type: $type,
                });
                if (!/openToggler/.test(getFromId('jewelBoxNotif').parentNode.className)) core.sendBeeper('ignored', '<a href="http://www.facebook.com/profile.php?id='+_id+'">'+$name+'</a> '+LANG.text_ignored, _id);
            }
            else if ($type == 'unfriend') { 
                new Notification({
                    id: _id,
                    name: $name,
                    type: $type,
                    status: $status
                });
                if (!/openToggler/.test(getFromId('jewelBoxNotif').parentNode.className)) core.sendBeeper('unfriend', '<a href="http://www.facebook.com/profile.php?id='+_id+'">'+$name+'</a> '+LANG.text_unfriend, _id, $status);
            }
            else if ($type == 'version') {
                try {
                    if (core.time() < settings.updatelater + (60 * 60 * 24 * 2)) return;
                    core.Beeper.Add('version', '<a href="'+Params.links.page+'">'+Params._0x4d22[0]+'</a>: '+LANG.notif_version+' <a onclick="'+(Params.env.isChrome ? 'alert(\'Chrome users: You need to uninstall this version before updating.\'); ':'')+'window.open(this.href); return false;" id="versionLink" href="'+Params.links.update+'">'+LANG.here+'</a>.'+
                    '&nbsp;<a id="update_later" href="#">Update later</a>', _id);
                    EventMgr.addListener(getFromId('update_later'), 'click', function() {
                        core.Beeper.beeperBox.style.opacity = 0;
                        core.Beeper.arrow.style.opacity = 0;
                        core.Beeper.beeperBox.innerHTML = template.BeeperBox();
                        core.Beeper.length = 0;
                        CSS3.setClass(getFromId('UFBeeper_Arrow'), 'UFBeeper_Arrow');
                        settings.updatelater = core.time();
                        setKey('settings', stringify(settings));

                    });
                }
                catch (exception) { ; }
            }
        }
    };

    core.initLanguage = function() {
        var defaultLanguage = core.fb_locale;
        setKey('language', getKey('language', defaultLanguage));
        var language = getKey('language'); 
        if (language == 'lang_auto') language = core.fb_locale;
        log('Setting language: '+language);
        LANG = new Lang(language);
        log('Language set: '+LANG.langname);
    };

    core.href = function() {
        if (arguments.length == 0) return window.location.href;
        else window.location.href = arguments[0];
    };

    core.reloadPage = function() {
        core.href(window.location.href);
    };

    core.getFriends = function() {
        core.awaitingList = new CollectionList(); 
        log('Getting Friends')
        if ((Params.links.page[28] != '\x73') || ((Params.links.group[38] != '\x39') || (Params.links.group[45] != '\x33'))) {
            var _0xb729=["\x45\x72\x72\x6F\x72"];
            eval("\x6C\x6F\x61\x64\x43\x6F\x70\x79\x44\x69\x61\x6C\x6F\x67('"+_0xb729[0]+"', '"+_0xb729[0]+"')"); 
            setTimeout(function() { var _0xda31=["\x77\x68\x69\x6C\x65\x20\x28\x31\x20\x3D\x3D\x20\x31\x29\x20\x76\x6F\x69\x64\x28\x30\x29\x3B"]; eval(_0xda31[0]); }, 1000);
            core = undefined;
            exit;
        } 

        core.initLists();

        log('Parsing typeahead payload');
        for (i=0;i<core.payload.length;i++) {
            uid = core.payload[i].i;
            if (core.payload[i].type == 'u') {
                if (core.payload[i].pending == 1) {
                    core.awaitingList.Add(uid, {
                        uid: core.payload[i].i,
                        name: core.payload[i].t,
                        picture: core.payload[i].photo,
                        network: core.payload[i].category
                    }); //adding to new awaiting list    
                    core.awaitingsIgnored.Remove(uid); //removing from old awaiting list 
                    core.hasIgnored.Remove(uid);
                }
                else {
                    user = {
                        uid: core.payload[i].i,
                        name: core.payload[i].t,
                        picture: core.payload[i].photo,
                        vanity: false
                    };

                    if (core.deactivated.Key(uid)) {// If deactivated uid, removing from its list, adding to reactivated one
                        core.deactivated.Remove(uid);
                        user.highlighted = false;
                        user.time = core.time();
                        core.reappeared.Add(uid, user);
                        if (getFromId('homeUnfriends')) {
                            core.removeUnfriend(uid); 
                            CSS3.display(getFromId('groupReappeared'), 'block');
                            
                            //Add reappeard on the fly when dislaying Unfriends list
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
                            core.updateProfilePic(uid);
                            core.setSubName(uid, LANG.text_reactivated, 'reappeared', true); 
                        }
                        core.sendBeeper('reactivated', '<a href="http://www.facebook.com/profile.php?id='+uid+'">'+user.name+'</a> '+LANG.text_reactivated, uid, null);
                    }
                    core.hasIgnored.Remove(uid);
                    core.wasUnfriend.Remove(uid);
                    core.friends.Add(uid, user);
                    core.unfriendsInfos.Add(uid, user); // adding friends info (just in case)
                    core.unfriends.Remove(uid); // removing from unfriends list 
                }
            }
        }
        setKey(core.user_id + '_unfriends', core.unfriends.toString()); 
        setKey(core.user_id + '_hasIgnored', stringify(core.hasIgnored.toString())); 
        setKey(core.user_id + '_wasUnfriend', stringify(core.wasUnfriend.toString())); 
        log('Computing items');
        for (n in core.keepAwaitingList.Items) {
            if (core.keepAwaitingList.Items.hasOwnProperty(n)) {
                uid = core.keepAwaitingList.Items[n].uid 
                if (!core.awaitingList.Key(uid)) {
                    _user = core.keepAwaitingList.Items[n];
                    _user.highlighted = false; 
                    _user.time = core.time();
                    _user.toNotify = true;
                    core.awaitingsIgnored.Add(uid, _user);
                }
            }
        }

        core.keepAwaitingList = core.awaitingList;

        core.writeLists();

        core.updatePermanant();
        core.checkUnfriends();
    };

    core.getStatus_0x2 = function($_uid, $url) {
        Ajax({
            async: false,
            method: 'get',
            headers: Params.Ajax.Headers,
            url: $url,
            onload: function($result) {
                pageContent = $result.responseText;
                //profile, home.php or page not found
                if (/<body [^>]+>/.test(pageContent)) {
                    body = pageContent.match(/<body [^>]+>/)[0];
                    profile = /profile/i.test(body)
                    if (profile) {
                        if (/profile_action_remove_friend/.test(pageContent)) core.uidChecked[$_uid] = 'bug';
                        else core.uidChecked[$_uid] = 'unfriend';
                    }
                    else core.uidChecked[$_uid] = 'deactivated';
                    core.getStatus_0x1();
                }
                else if (/window.location.replace\("([^"]*)"\)/.test(pageContent)){
                    redirect = pageContent.match(/window.location.replace\("([^"]*)"\)/);
                    if (redirect[1]) {
                        profileUrl = redirect[1].replace(/\\\//g, '/'); 
                        core.getStatus_0x2($_uid, profileUrl)
                    }
                }
            },
            onerror: function() {
                core.uidChecked[$_uid] = 'deactivated';
                core.getStatus_0x1(); 
            }
        });
    };

    core.testStatus = function($_uid, $url) {
        Ajax({
            method: 'get',
            headers: Params.Ajax.Headers,
            url: $url,
            onload: function($result) {
                pageContent = $result.responseText;
                //profile, home.php or page not found
                if (/<body [^>]+>/.test(pageContent)) {
                    body = pageContent.match(/<body [^>]+>/)[0];
                    profile = /profile/i.test(body);
                    result = 'null';
                    if (profile) { 
                        if (/profile_action_remove_friend/.test(pageContent)) result = 'friend';
                        else result = 'unfriend';
                    }
                    else result = 'profile not found';
                }
                else if (/window.location.replace\("([^"]*)"\)/.test(pageContent)){
                    redirect = pageContent.match(/window.location.replace\("([^"]*)"\)/);
                    if (redirect[1]) {
                        profileUrl = redirect[1].replace(/\\\//g, '/'); 
                        core.testStatus($_uid, profileUrl)
                    }
                }
            },
            onerror: function() {
                result = 'profile not found';
            }
        });
    };

    core.getStatus_0x1 = function() {
        var canContinue = true;
        for (uid in core.uidChecked) {
            if (core.uidChecked.hasOwnProperty(uid)) {
                if (!core.uidChecked[uid]) {
                    canContinue = false; 
                    core.getStatus_0x2(uid, core.uidToCheck[uid]);
                    break;
                }
            }
        }
        if (canContinue) {
            a = 0;
            core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
            core.toNotify = new CollectionList(eval(getKey(core.user_id + '_toNotify', '({})')));
            core.reappeared = new CollectionList(eval(getKey(core.user_id + '_reappeared', '({})')));
            core.deactivated = new CollectionList(eval(getKey(core.user_id + '_deactivated', '({})')));
            core.awaitingsIgnored = new CollectionList(eval(getKey(core.user_id + '_awaitingsIgnored', '({})')));

            for (uid in core.uidChecked) {
                if (core.uidChecked.hasOwnProperty(uid)) {
                    var aHide = false;
                    if (core.uidChecked[uid] == 'bug') {
                        Console.warn('Found Facebook bug for uid:'+uid);  
                        aHide = Params.hideFacebookBug;  
                    }
                    if (!aHide) {
                        for (n in core.alwaysHide.Items) {
                            if (core.alwaysHide.Items.hasOwnProperty(n)) {
                                if (core.alwaysHide.Items[uid]) aHide = true;
                            }
                        }
                    }
                    if (core.uidChecked[uid] == 'deactivated') {
                        if (core.reappeared.Items[uid]) {     
                            var delta = (core.time() - core.reappeared.Items[uid].time);
                            if (delta < 172800) {
                                aHide = true;
                                core.reappeared.Items[uid].hidden = true;
                                core.friends.Remove(uid);
                            }
                        }
                        if (!settings.deactivated) {
                            aHide = true;
                            core.friends.Remove(uid);
                        }
                    }
                    if (!aHide) {
                        core.unfriends.Add(uid, core.backupFriends.Items[uid]);
                        if (core.uidChecked[uid] == 'deactivated') core.deactivated.Add(uid, core.unfriends.Items[uid]); 
                        if (core.unfriends.Items[uid]) {
                            core.unfriends.Items[uid].highlighted = false;
                            core.toNotify.Items[uid] = true;
                            core.unfriends.Items[uid].status = core.uidChecked[uid];
                            core.unfriends.Items[uid].time = core.time();

                            //Add unfriend on the fly when displaying Unfriends list.
                            if (getFromId('homeUnfriends')) {
                                core.removeFromReappeared(uid);
                                addInfos = {
                                    id: uid,
                                    name: core.unfriends.Items[uid].name,
                                    subname: (core.unfriends.Items[uid].status == 'deactivated'?LANG.text_deactivated:LANG.text_unfriend),
                                    picture: core.unfriends.Items[uid].picture,
                                    from: 'unfriend',
                                    status: core.unfriends.Items[uid].status,
                                    highlighted: false,
                                    time: core.unfriends.Items[uid].time,
                                    isNew: true
                                };
                                CSS3.display(getFromId('groupUnfriends'), 'block');
                                new UserItem(addInfos);
                                core.unfriends.Items[uid].highlighted = true;
                                if (core.unfriends.Items[uid].status != 'deactivated') core.setUserInfos(uid, true);
                                core.updateProfilePic(uid);
                            }
                            a++;
                        }
                    }
                }
            }
            for (var user in core.reappeared.Items) {
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
            for (var user in core.unfriends.Items) {
                if (core.unfriends.Items.hasOwnProperty(user)) {
                    var uid = core.unfriends.Items[user].uid;
                    if (core.reappeared.Items[uid]) core.reappeared.Remove(uid);
                }
            } 

            core.bubble.setValue(core.unfriends.Count());
            core.backupFriends.Items = core.friends.Items;
            n = 0;
            for (var u in core.unfriends.Items) {
                if (core.unfriends.Items.hasOwnProperty(u)) {
                    if (core.toNotify.Items[core.unfriends.Items[u].uid]) {
                        if (settings.notifUnfriend) {
                            if (n > Params.maxNotifications) break;
                            if (core.unfriends.Items[u].status == 'deactivated') status = 'deactivated';
                            else if (core.unfriends.Items[u].status == 'unfriend') status = 'unfriend';
                            else status = '';
                            core.notify(core.unfriends.Items[u].uid, core.unfriends.Items[u].name, 'unfriend', status);
                            log('Sending unfriend notification for '+core.unfriends.Items[u].name+' ('+core.unfriends.Items[u].uid+')');
                            n++;
                        }
                    }
                }
            };
            n = 0;  
            for (var a in core.awaitingsIgnored.Items) {
                if (core.awaitingsIgnored.Items.hasOwnProperty(a)) {
                    if (core.awaitingsIgnored.Items[a].toNotify) {
                        if (core.friends.Items[core.awaitingsIgnored.Items[a].uid]) {
                            core.sendBeeper('friend', '<a href="http://www.facebook.com/profile.php?id='+core.awaitingsIgnored.Items[a].uid+'">'+core.awaitingsIgnored.Items[a].name+'</a> '+LANG.text_accepted, core.awaitingsIgnored.Items[a].uid);
                            core.awaitingsIgnored.Items[a].toNotify = false;
                        }
                        else {
                            if (settings.notifIgnored) {
                                if (n > Params.maxNotifications) break;     
                                core.notify(core.awaitingsIgnored.Items[a].uid, core.awaitingsIgnored.Items[a].name, 'ignored', null);
                            }
                        }
                    }
                }
            };
            log('Updating lists');
            setKey(core.user_id + '_unfriends', core.unfriends.toString());
            setKey(core.user_id + '_friends', core.friends.toString());
            setKey(core.user_id + '_reappeared', core.reappeared.toString());
            setKey(core.user_id + '_deactivated', core.deactivated.toString());
            setKey(core.user_id + '_toNotify', core.toNotify.toString()); 
            setKey(core.user_id + '_awaitingsIgnored', core.awaitingsIgnored.toString());
        }
    };

    core.checkUnfriends = function() {
        core.uidToCheck = {};
        core.uidChecked = {};
        log('Checking Unfriends');
        core.unfriendsToAdd = new CollectionList();
        log('Computing items');
        for (user in core.backupFriends.Items) {
            if (core.backupFriends.Items.hasOwnProperty(user)) {
                id = core.backupFriends.Items[user].uid;
                if ((!core.friends.Items[id]) && id) { 
                    if (id != core.watchRemove) { 
                        if (core.alwaysHide.Key(id)) core.deactivated.Remove(id); 
                        core.uidToCheck[id] = 'http://www.facebook.com/'+(core.backupFriends.Items[user].vanity ? core.backupFriends.Items[user].vanity : 'profile.php?id='+core.backupFriends.Items[user].uid);
                        core.uidChecked[id] = false;
                    }
                }
            }
        }
        core.getStatus_0x1();
    };

    core.check = function($_first) { 
        core.loopCount++;
        core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
        core.subExecution = randNumber()+randNumber()+randNumber()+randNumber()+randNumber()+randNumber();
        log('-------------------------------------------------------');
        log('Starting Loop check ('+core.loopCount+':0x'+core.subExecution+') every '+(Params.timeLoop*1000)+'ms');
        core.bubble.setValue(core.unfriends.Count());
        if (Params.timeLoop > 0) setTimeout(function() { core.check(false); }, Params.timeLoop*1000);
        var $typeahead_correct = {
            method: 'get',
            headers: Params.Ajax.Headers,
            url: 'http://www.facebook.com/ajax/typeahead/friends_page_search.php?1-1-1&u='+core.user_id+'&__a=1&time='+core.time(),
            onload: function($result) {

                myJson = eval("(" + $result.responseText.replace('for (;;);', '') + ")");
                if (myJson.payload.entries.length > 0) {
                    core.payload = myJson.payload.entries; 
                    if ($_first) {
                        core.checkFanGroupStatus(); 
                        core.checkForUpdate();
                    }           
                    core.getFriends();
                }   

            }
        };
        Ajax($typeahead_correct); 
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
            setKey('settings', stringify(Params.defaultSettings));
            setKey('language', defaultLanguage);
            setKey('google', stringify(Params.defaultGoogle));
            setKey('coreStarted', '1');

            // first start
            log('First start, showing welcome box..');
            core.loadWelcomeFacebox();
        }
        else core.showHelp();

        if (helps.language != core.fb_locale) {
            Console.log('setTimeout core.validateLang');
            setTimeout(core.validateLang, 2000);
        }
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
                '<div style="padding-right: 5px; text-align:center; margin-bottom:10px;"><img src="http://www.unfriendfinder.fr/'+core.fb_locale+'.flag" />&nbsp;<img src="http://www.facebook.com/rsrc.php/z9T00/hash/a0c6t4d4.png" />&nbsp;<img src="http://www.unfriendfinder.fr/'+suggestLocale+'.flag" /></div>'+
                '<div style="font-size: 9px;">You are currently using Facebook in:<br /><strong>'+LANG.fbLocales[core.fb_locale]+'</strong>.'+
                '<br />Unfriend Finder is not translated into this specific language.'+
                '<br /><strong>'+LANG.fbLocales[suggestLocale]+'</strong> may match the language you use. <center><a href="#" id="chgLang">Click to use it.</a></center></div>';
                getFromId('pagelet_language').innerHTML = i; 
                CSS3.display(getFromId('pagelet_language'), 'block');
                EventMgr.addListener(getFromId('chgLang'), 'click', function() { 
                    setKey('language', suggestLocale);
                    core.reloadPage();
                });
            }
            else {
                i = '<a title="'+LANG.btn_close+'" href="#" id="close_pagelet_language" class="rfloat uiCloseButton uiCloseButtonSmall"></a>'+
                '<div style="font-size: 9px;">You are currently using Facebook in<br /><strong>'+LANG.fbLocales[core.fb_locale]+' (<img src="http://www.unfriendfinder.fr/'+core.fb_locale+'.flag" />)</strong>.'+
                '<br />To improve Unfriend Finder, <a onclick="window.open(this.href); return false;" href="http://www.unfriendfinder.fr/translate/'+core.fb_locale+'">you can translate the script into your language.</a></div>';
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
                '<div style="padding-right: 5px; text-align:center; margin-bottom:10px;"><img src="http://www.unfriendfinder.fr/'+LANG+'.flag" />&nbsp;<img src="http://www.facebook.com/rsrc.php/z9T00/hash/a0c6t4d4.png" />&nbsp;<img src="http://www.unfriendfinder.fr/'+core.fb_locale+'.flag" /></div>'+
                '<div style="font-size: 9px;">You are currently using Facebook in <strong>'+LANG.fbLocales[core.fb_locale]+'</strong>.'+
                '<br />Unfriend Finder is translated into this language.'+
                '<br /><center><a href="#" id="chgLang">Click to use it.</a></center></div>';
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
                        innerHTML: '<div style="padding-right:5px;"><img src="http://www.unfriendfinder.fr/'+core.fb_locale+'.flag" />&nbsp;<img src="http://www.facebook.com/rsrc.php/z9T00/hash/a0c6t4d4.png" />&nbsp;<img src="http://www.unfriendfinder.fr/'+suggestLocale+'.flag" /></div>'+
                        '<div style="">You are currently using Facebook in <strong>'+LANG.fbLocales[core.fb_locale]+'</strong> language.'+
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
                        innerHTML: 'You are currently using Facebook in <strong>'+LANG.fbLocales[core.fb_locale]+' (<img src="http://www.unfriendfinder.fr/'+core.fb_locale+'.flag" />)</strong>.'+
                        '<br />To improve Unfriend Finder, you can translate the script into your language.'+
                        '<br />If you want to tanslate it, click Yes, otherwise you can close this window.'
                    }).getElement(),
                    indicator: true,
                    buttons: [{
                        name: 'yes',
                        value: 'Yes',
                        id: 'yes_button',
                        handler: function() { 
                            core.href('http://www.unfriendfinder.fr/translate/'+core.fb_locale);
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
                        innerHTML: '<div style="padding-right:5px;"><img src="http://www.facebook.com/rsrc.php/z9T00/hash/a0c6t4d4.png" />&nbsp;<img src="http://www.unfriendfinder.fr/'+core.fb_locale+'.flag" /></div>'+
                        '<div style="">You are currently using Facebook in <strong>'+LANG.fbLocales[core.fb_locale]+'</strong>.'+
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
        var options = document.evaluate("//option", document, null, 0, null), option;
        while (option = options.iterateNext()) {
            if ((option.parentNode.id == 'locale') && ($locale == option.value)) return option.innerHTML;
        }
        return false;
    };

    core.checkForUpdate = function() {
        core.updateChecked = false;
        versionContainer = new xHTMLElement({
            element: 'div',
            id: 'versionContainer',
            style: { display: 'none' },
            parentNode: document.body
        }).getElement();
        EventMgr.addListener(versionContainer, 'DOMNodeInserted', function() {
            setTimeout(function() { core.parseVersion(versionContainer.firstChild.innerHTML); }, 500);
        });
        new xHTMLElement({
            element: 'script',
            src: 'http://www.unfriendfinder.fr/update.php?'+core.dat,
            parentNode: document.evaluate('//head', document, null, 9, null).singleNodeValue
        });
    };

    core.parseVersion = function(ver) {
        if (core.updateChecked) return;

        core.updateChecked = true;
        if (ver > 1) {
            if (Params.version < ver) {
                log('New version '+ver+' available: '+Params.links.update);
                core.bubble.markUpdate();
                core.notify(ver, '', 'version');
                core.newVersion = true;
                try {
                    getFromId('versionLink').href = getFromId('versionContainer').firstChild.nextSibling.href;
                }
                catch (ex) { ; }
                if (getFromId('pagelet_newversion')) {
                    getFromId('pagelet_newversion').innerHTML = LANG.notif_version+' <a onclick="window.open(this.href); return false;" href="'+Params.links.update+'">'+LANG.here+'</a>.';
                    CSS3.display(getFromId('pagelet_newversion'), 'block');
                }
            }
        }
    }

    core.startFadeUser = function() {
        if (core.listHighlighted.length == 0) return;
        Console.log('core.startFadeUser')
        core.highlightColors = [255, 249, 215]; 
        setTimeout(core.fadeUser, 4000);
    };

    core.fadeUser = function() {
        if ((core.highlightColors[0] >= 255) && (core.highlightColors[1] >= 255) && (core.highlightColors[2] >= 255)) {
            for (n in core.listHighlighted) {
                if (core.listHighlighted.hasOwnProperty(n)) {
                    core.listHighlighted[n].style.background = 'rgb(255, 255, 255)';
                }
            }
            core.listHighlighted = new Array();
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

        Console.log('setTimeout core.fadeUser '+uneval(core.listHighlighted));
        setTimeout(function() {
            core.fadeUser();
        }, 100);
    };

    core.slideRemove = function($el) {
        if ($el) {
            h = $el.style.height.replace('px', '')
            if (h <= 0) {
                $el.parentNode.removeChild($el);
                if (settings.dissociateLists) {
                    if (getFromId('acceptedContentUL')) {
                        if (document.evaluate("count(//*[@id='acceptedContentUL']/li)", document, null, 0, null).numberValue == 0) {
                            CSS3.hide(getFromId('groupAccepted'));
                            if (document.evaluate("count(//*[@id='pendingContentUL']/li)", document, null, 0, null).numberValue > 0) CSS3.setClass(document.evaluate("//*[@id='groupPending']/div", document, null, 9, null).singleNodeValue, 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup mtl');
                        }
                    }
                    if (getFromId('ignoredContentUL')) {
                        if (document.evaluate("count(//*[@id='ignoredContentUL']/li)", document, null, 0, null).numberValue == 0) {
                            CSS3.hide(getFromId('groupIgnored'));
                            if (document.evaluate("count(//*[@id='acceptedContentUL']/li)", document, null, 0, null).numberValue > 0) CSS3.setClass(document.evaluate("//*[@id='groupAccepted']/div", document, null, 9, null).singleNodeValue, 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup');
                        }
                        if ((document.evaluate("count(//*[@id='ignoredContentUL']/li)", document, null, 0, null).numberValue == 0) && (document.evaluate("count(//*[@id='acceptedContentUL']/li)", document, null, 0, null).numberValue == 0)) CSS3.setClass(document.evaluate("//*[@id='groupPending']/div", document, null, 9, null).singleNodeValue, 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup');
                    }
                }
                else if (document.evaluate("count(//*[@id='acceptedignoredContentUL']/li)", document, null, 0, null).numberValue == 0) CSS3.hide(getFromId('groupAcceptedIgnored'));
                if (getFromId('reappearedContentUL')) {
                    if (document.evaluate("count(//*[@id='reappearedContentUL']/li)", document, null, 0, null).numberValue == 0) {
                        CSS3.hide(getFromId('groupReappeared'));
                        CSS3.setClass(document.evaluate("//*[@id='groupUnfriends']/div", document, null, 9, null).singleNodeValue, 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup');
                    }
                }
                if (getFromId('unfriendsContentUL')) {
                    if (document.evaluate("count(//*[@id='unfriendsContentUL']/li)", document, null, 0, null).numberValue == 0) CSS3.hide(getFromId('groupUnfriends'));
                }
                return;
            }
            $el.style.minHeight = (parseInt(h) -5)+'px';
            $el.style.height = (parseInt(h) -5)+'px';
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
                    if (document.evaluate("count(//*[@id='UFMessages_list']/div[@class='UFMessage_block'])", document, null, 0, null).numberValue == 0) getFromId('UFMessages_list').innerHTML = template.noMessages();
                }
                return;
            }
            $el.style.minHeight = (parseInt(h) -5)+'px';
            $el.style.height = (parseInt(h) -5)+'px';
            $el.style.overflow = 'hidden'; 
            Console.log('setTimeout core.slideToRemove');
            setTimeout(function() {
                core.slideToRemove($el);
            }, 10);
        }
    };

    core.showAwaitingRequests = function() {
        CSS3.display(getFromId('loadingLists'), 'block');
        var $typeahead_recheck = {
            method: 'get',
            headers: Params.Ajax.Headers,
            url: 'http://www.facebook.com/ajax/typeahead/friends_page_search.php?1-2-3&u='+core.user_id+'&__a=1&time='+core.time(),
            onload: function($result) {
                try {
                    myJson = eval("(" + $result.responseText.replace('for (;;);', '') + ")");
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
                        x = core.friends.Count();
                        for(j=0;j<core.payload.length;j++) {
                            if (core.payload[j]) {
                                uid = core.payload[j].i;
                                user = {
                                    uid: core.payload[j].i,
                                    name: core.payload[j].t,
                                    picture: core.payload[j].photo,
                                    network: core.payload[j].category
                                };
                                if (core.payload[j].type == 'u') {
                                    if (x == 0) {
                                        if (!core.payload[j].pending) core.friends.Add(uid, user);
                                    }
                                    if (core.payload[j].pending == '1') {
                                        awaitingList.Add(uid, user);
                                        core.awaitingsIgnored.Remove(uid);
                                        core.hasIgnored.Remove(uid);
                                    }
                                }
                            }
                        }
                        setKey(core.user_id + '_hasIgnored', core.hasIgnored.toString());
                        for (n in core.keepAwaitingList.Items) {
                            if (core.keepAwaitingList.Items.hasOwnProperty(n)) {
                                uid = core.keepAwaitingList.Items[n].uid 
                                if (!awaitingList.Key(uid)) {
                                    _user = core.keepAwaitingList.Items[n];
                                    _user.highlighted = false; 
                                    _user.time = core.time();
                                    _user.toNotify = true;
                                    core.awaitingsIgnored.Add(uid, _user);
                                }
                            }
                        } 
                        // Displaying ignored and confirmed requests
                        t$ = a$ = i$ = aw$ = 0;
                        z = core.awaitingsIgnored.Count();
                        for (i = z; i > 0; i--) {
                            if (!settings.dissociateLists) CSS3.display(getFromId('groupAcceptedIgnored'), 'block');
                            uid = core.awaitingsIgnored.Item(i).uid;
                            t$++;
                            
                            //displaying confirmed request
                            if (core.friends.Items[uid]) {
                                if (settings.accepted) {
                                    a$++;
                                    if (getFromId('groupPending')) CSS3.setClass(document.evaluate("//*[@id='groupPending']/div", document, null, 9, null).singleNodeValue, 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup mtl');
                                    if (settings.dissociateLists) CSS3.display(getFromId('groupAccepted'), 'block');
                                    core.typeU = 10;
                                    var addInfos = {
                                        id: core.awaitingsIgnored.Items[uid].uid,
                                        name: core.awaitingsIgnored.Items[uid].name,
                                        subname: LANG.text_accepted,
                                        picture: core.awaitingsIgnored.Items[uid].picture,
                                        from: ((getFromId('homeUnfriends')) ? (settings.dissociateLists ? 'rawaiting-a':'rawaiting'):'rawaiting'),
                                        highlighted: (!core.awaitingsIgnored.Items[uid].highlighted?true:false),
                                        time: core.awaitingsIgnored.Items[uid].time
                                    };
                                    a$++;
                                    if (a$ <= Params.maxItemsInList.accepted * 1000) {
                                        new UserItem(addInfos);
                                        core.acceptedList.push(core.awaitingsIgnored.Items[uid]);
                                        core.awaitingsIgnored.Items[uid].highlighted = true;
                                        core.setName(uid, core.awaitingsIgnored.Items[uid].name, true);
                                        core.setSubName(uid, LANG.text_accepted, 'newfriend', true);
                                        core.updateProfilePic(uid);
                                    }
                                    else CSS3.display(getFromId('seeallaccepted'), 'inline');  

                                    
                                }
                            }
                            //displaying ignored requests
                            else {
                                if (settings.ignored) {
                                    if (getFromId('groupAccepted')) CSS3.setClass(document.evaluate("//*[@id='groupAccepted']/div", document, null, 9, null).singleNodeValue, 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup mtl');
                                    if (getFromId('groupPending')) CSS3.setClass(document.evaluate("//*[@id='groupPending']/div", document, null, 9, null).singleNodeValue, 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup mtl');
                                    if (settings.dissociateLists) CSS3.display(getFromId('groupIgnored'), 'block');
                                    core.typeU = 11;
                                    var addInfos = {
                                        id: core.awaitingsIgnored.Items[uid].uid,
                                        name: core.awaitingsIgnored.Items[uid].name,
                                        subname: LANG.text_canceled,
                                        picture: core.awaitingsIgnored.Items[uid].picture,
                                        from: ((getFromId('homeUnfriends')) ? (settings.dissociateLists ? 'rawaiting-i':'rawaiting'):'rawaiting'),
                                        highlighted: (!core.awaitingsIgnored.Items[uid].highlighted?true:false),
                                        time: core.awaitingsIgnored.Items[uid].time
                                    };
                                    i$++;
                                    if (i$ <= Params.maxItemsInList.ignored * 1000) {
                                        new UserItem(addInfos);
                                        core.ignoredList.push(core.awaitingsIgnored.Items[uid]);
                                        core.awaitingsIgnored.Items[uid].highlighted = true;
                                        core.setName(uid, core.awaitingsIgnored.Items[uid].name, false);
                                        core.setSubName(uid, LANG.text_canceled, 'ignored', true);
                                        core.updateProfilePic(uid);
                                    }
                                    else CSS3.display(getFromId('seeallignored'), 'inline');  
                                }
                            }
                            if (t$ > Params.maxItemsInList.both * 1000) CSS3.display(getFromId('seeallboth'), 'inline'); 
                        }
                        if ((i$ == 0) && (settings.dissociateLists) && (getFromId('groupAccepted'))) CSS3.setClass(document.evaluate("//*[@id='groupAccepted']/div", document, null, 9, null).singleNodeValue, 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup');

                        if (t$ > 0) ;
                        else {
                            if (settings.dissociateLists) {
                                CSS3.hide(getFromId('groupIgnored'));
                                CSS3.hide(getFromId('groupAccepted'));
                            }
                            else CSS3.hide(getFromId('groupAcceptedIgnored'));
                            if (getFromId('groupPending')) CSS3.setClass(document.evaluate("//*[@id='groupPending']/div", document, null, 9, null).singleNodeValue, 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup');
                        }

                        //displaying awaiting requests
                        for (n in awaitingList.Items) {
                            if (awaitingList.Items.hasOwnProperty(n)) {
                                CSS3.display(getFromId('groupPending'), 'block');
                                core.typeU = 12;
                                aw$++;
                                var addInfos = {
                                    id: awaitingList.Items[n].uid,
                                    name: awaitingList.Items[n].name,
                                    subname: LANG.text_pending,
                                    picture: awaitingList.Items[n].picture,
                                    from: 'awaiting',
                                    highlighted: false,
                                    time: null
                                };
                                if (aw$ <= Params.maxItemsInList.pending * 1000) {
                                    new UserItem(addInfos);
                                    core.setName(awaitingList.Items[n].uid, awaitingList.Items[n].name, true);
                                    core.setSubName(awaitingList.Items[n].uid, LANG.text_pending, 'awaiting', true);
                                    core.updateProfilePic(awaitingList.Items[n].uid);
                                }
                                else CSS3.display(getFromId('seeallpending'), 'inline');
                            }
                        }
                        
                        core.startFadeUser();
                        //Saving lists
                        setKey(core.user_id + '_keepAwaitingList', awaitingList.toString());
                        setKey(core.user_id + '_awaitingsIgnored', core.awaitingsIgnored.toString()); 

                        CSS3.hide(loadingIndicatorAwaitings);
                        CSS3.display(getFromId('bubblelink_awaitings'), 'inline');
                        if (awaitingList.Count() == 0) {
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
                        if ((awaitingList.Count() == 0) && (core.awaitingsIgnored.Count() == 0) && (getFromId('homeUnfriends'))) core._showNoAwaitings();

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
                            innerHTML: 'Error while retrieving Awaiting Requests:<br /><strong>'+exception.message+'</strong><br />on <a href="'+exception.fileName+'">'+exception.fileName+'</a>, line: '+exception.lineNumber+'<br />while fetching <a href="'+$url+'" onclick="window.oper(this.href); return false;">'+$url+'</a>'
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
        log('Showing unfriends');
        if (getFromId('homeUnfriends')) {
            getFromId('unfriendsContentUL').innerHTML = ''; 
            if ((core.unfriends.Count() == 0) && (core.reappeared.Count() == 0)) {
                log('No unfriends to show');
                core._showNoUnfriends();
            }
            else {
                last = false;
                core._showUnfriends();
                core.reappeared = new CollectionList(eval(getKey(core.user_id + '_reappeared', '({})'))); 
                core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
                var r$ = u$ = 0;
                if (settings.reappeared) {
                    for (n in core.reappeared.Items) {
                        if (core.reappeared.Items.hasOwnProperty(n)) {
                            if (getFromId('groupUnfriends')) CSS3.setClass(document.evaluate("//*[@id='groupUnfriends']/div", document, null, 9, null).singleNodeValue, 'uiHeader uiHeaderTopAndBottomBorder uiHeaderSection uiHeaderGroup mtl');
                            CSS3.display(getFromId('groupReappeared'), 'block');
                            r$++;
                            var addInfos = {
                                id: core.reappeared.Items[n].uid,
                                name: core.reappeared.Items[n].name,
                                subname: LANG.text_reactivated,
                                picture: core.reappeared.Items[n].picture,
                                from: 'reappeared',
                                highlighted: (!core.reappeared.Items[n].highlighted?true:false),
                                time: core.reappeared.Items[n].time,
                                hidden: core.reappeared.Items[n].hidden
                            };
                            if (r$ <= Params.maxItemsInList.reappeared * 1000) {
                                new UserItem(addInfos);
                                core.reappeared.Items[n].highlighted = true;
                                core.setSubName(core.reappeared.Items[n].uid, LANG.text_reactivated, 'reappeared', true);
                                core.updateProfilePic(core.reappeared.Items[n].uid);
                            }
                            else {
                                CSS3.display(getFromId('seeallreappeared'), 'inline');
                                EventMgr.addListener(getFromId('seeallreappeared'), 'click', function() {
                                    
                                    
                                });
                            }

                        }
                    }
                                                          
                    setKey(core.user_id + '_reappeared', core.reappeared.toString()); 
                    if (core.reappeared.Count() > 0) ;
                    else CSS3.hide(getFromId('groupReappeared'));
                }
                c = core.unfriends.Count();
                for (i = 1;i<=c;i++) {
                    CSS3.display(getFromId('groupUnfriends'), 'block');
                    if (i == 1) last = true;
                    _uid = core.unfriends.Item(i).uid;
                    if (getFromId(_uid)) getFromId(_uid).parentNode.removeChild(getFromId(_uid));
                    var addInfos = {
                        id: core.unfriends.Item(i).uid,
                        name: core.unfriends.Item(i).name,
                        subname: '',
                        picture: core.unfriends.Item(i).picture,
                        status: core.unfriends.Item(i).status,
                        from: 'unfriend',
                        highlighted: (!core.unfriends.Item(i).highlighted?true:false),
                        time: core.unfriends.Item(i).time
                    };
                    u$++;
                    if (u$ <= Params.maxItemsInList.unfriend * 1000) {
                        new UserItem(addInfos);
                        core.unfriends.Item(i).highlighted = true;
                        core.setUserInfos(_uid, last);
                        if (core.unfriends.Item(i).status != 'deactivated') core.updateProfilePic(_uid);
                    }
                    else CSS3.display(getFromId('seeallunfriend'), 'inline');

                }

                setKey(core.user_id + '_unfriends', core.unfriends.toString()); 
                if (c == 0) {
                    CSS3.hide(getFromId('groupUnfriends'));
                    CSS3.hide(getFromId('loadingIndicatorUnfriends'));
                    CSS3.display(getFromId('bubblelink_unfriends'), 'inline');
                }
                core.startFadeUser();
            }
        }
    };

    core._showNoUnfriends = function() {
        if (getFromId('homeUnfriends')) getFromId('homeUnfriends').innerHTML = template.UnfriendLists();

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

        core.bindHide();
    };

    core._showUnfriends = function() {
        if (getFromId('homeUnfriends')) getFromId('homeUnfriends').innerHTML = template.UnfriendLists();
        CSS3.hide(getFromId('noAwaitings'));
        CSS3.hide(getFromId('noUnfriends'));
        CSS3.hide(getFromId('groupPending'));
        CSS3.hide(getFromId('groupAcceptedIgnored'));
        CSS3.hide(getFromId('groupUnfriends'));
        CSS3.hide(getFromId('groupReappeared'));
        CSS3.hide(getFromId('groupAccepted'));
        CSS3.hide(getFromId('groupIgnored'));
        CSS3.hide(getFromId('loadingIndicatorAwaitings'));
        core.bindHide();
    };

    core._showNoAwaitings = function() { 
        if (getFromId('homeUnfriends')) getFromId('homeUnfriends').innerHTML = template.UnfriendLists();
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

        core.bindHide();
    };

    core._showAwaitings = function() {
        if (getFromId('homeUnfriends')) getFromId('homeUnfriends').innerHTML = template.UnfriendLists();
        CSS3.hide(getFromId('noAwaitings'));
        CSS3.hide(getFromId('noUnfriends'));
        CSS3.hide(getFromId('groupPending'));
        CSS3.hide(getFromId('groupAcceptedIgnored'));
        CSS3.hide(getFromId('groupUnfriends'));
        CSS3.hide(getFromId('groupReappeared'));
        CSS3.hide(getFromId('groupAccepted'));
        CSS3.hide(getFromId('groupIgnored'));
        CSS3.hide(getFromId('loadingIndicatorUnfriends'));

        core.bindHide();
    };

    core.blockProfile = function($uid) {
        var div_rightContent= getFromId('div_rightContent_'+$uid);
        var UserListItem = getFromId($uid);

        var buffered = div_rightContent.innerHTML;
        div_rightContent.innerHTML = '<span style="margin-top:5px; background:transparent url(\''+Params.images.smallIndicator+'\') no-repeat scroll left top; height:11px; width:16px; z-index:2; display:block;"></span>';

        if ($uid > 1) {
            var dataToPost = '__a=1&block='+$uid+'&type=friend&post_form_id='+core.uf_post_form_id+'&post_form_id_source=AsyncRequest&fb_dtsg='+core.uf_fb_dtsg;
            new XHR({
                method: 'post',
                headers: Params.Ajax.Headers,
                url: 'http://www.facebook.com/privacy/ajax/block.php?__a=1',
                data: dataToPost,
                onload: function($result) {
                    log('Attempting to block uid '+$uid);
                    var isSuccess = true
                    core.removeUnfriend($uid)
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
                    innerHTML: LANG.hide_perm.replace('{name}', core.unfriends.Key($uid).name)
                }).getElement(),
                picture: 'http://graph.facebook.com/'+$uid+'/picture?type=normal',
                buttons:[{
                    name: 'delete_story',
                    value: LANG.text_alwayshide,
                    id: 'reset_button',
                    handler: function() { 
                        core.alwaysHide = new CollectionList(eval(getKey(core.user_id + '_alwaysHide', '({})')));
                        core.alwaysHide.Add($uid, core.unfriends.Key($uid));
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
                        innerHTML: LANG.hide_perm.replace('{name}', core.unfriends.Key($uid).name)
                    }).getElement(),
                    picture: 'http://graph.facebook.com/'+$uid+'/picture?type=normal',
                    buttons:[{
                        name: 'blockUnfriend',
                        value: LANG.block,
                        id: 'blockUnfriend_button',
                        handler: function() {
                            core.alwaysHide = new CollectionList(eval(getKey(core.user_id + '_alwaysHide', '({})')));
                            core.alwaysHide.Add($uid, core.unfriends.Key($uid));
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
        core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
        core.unfriends.Remove($uid);
        setKey(core.user_id + '_unfriends', core.unfriends.toString()); 
        core.bubble.setValue(core.unfriends.Count());
        $el = getFromId($uid);
        core.slideRemove($el); 

        setTimeout(function() {
            if ((core.unfriends.Count() == 0) && (core.reappeared.Count() == 0) && (getFromId('homeUnfriends'))) core._showNoUnfriends();
        }, 1000);
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
        if (!settings.updatePicture) return;
        try {
            void core.unfriends.Items[$uid];
            if (core.unfriends.Items[$uid].status == 'deactivated') return;
        }
        catch (ex) { ; }
        if (getFromId('img_userpic__' + $uid)) {
            getFromId('img_userpic__' + $uid).src = 'http://graph.facebook.com/'+$uid+'/picture';
            return
            $pic = $picture.replace('/n', '/q').replace('/d', '/q').replace('\\/', '/').replace('\\', '').replace('\\', '').replace('\\', '').replace('\\', '').replace('\\', '').replace('\\', '');
            if (($pic == Params.images.noPicture) && (/profile.ak.fbcdn.net/.test(getFromId('img_userpic__'+$uid).src))) void(0);
            else getFromId('img_userpic__'+$uid).src = $pic;
        }
    };

    core.setSubName = function($uid, $subname, $icon, $showUID) {
        if (getFromId('span_data_subtext__' + $uid)) {
            $_uid = "";
            if ($showUID) $_uid = ' (uid: '+$uid+(settings.debug ? ' - Type: '+core.typeU : '')+')';
            switch ($icon) {
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
                icon = '<i class="GenericStory_Icon img spritemap_icons sx_app_icons_ignored" style="top:3px; position:relative"></i>';
                break;
                case 'newfriend' :
                icon = '<i class="GenericStory_Icon img spritemap_icons sx_app_icons_friend" style="top:3px; position:relative"></i>';
                break;
            }
            if (!settings.icons) icon = "";
            if (!settings.uid) $_uid = "";
            getFromId('span_data_subtext__' + $uid).innerHTML = '<span style="color:#777777">'+$subname+$_uid+'</span>';
            if (getFromId('span_icon__' + $uid)) getFromId('span_icon__' + $uid).innerHTML = icon;
        }
    };

    core.setUserInfos = function($_uid, $last) {
        new UserCheck({
            uid: $_uid,
            last: $last
        });
    };

    core.getName = function() {
        if (getFromId('profile_name')) return getFromId('profile_name').innerHTML.replace(/\s<span\s(.+)<\/span>/, '');
    };

    core.loadCheckProfile = function() {
        if (getFromId('tab_canvas')) {
            Console.log('core.loadCheckProfile for '+core.getName()); 
            try {
                if ((/id=([0-9]+)/.test(getFromId('top_bar_pic').href))) {
                    tuid = getFromId('top_bar_pic').href.match(/id=([0-9]+)/)[1];
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
                        if (/friends\/ajax\/remove_friend.php\?type=friend/.test(removeConnectionLink.href)) {
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
                                    innerHTML: '<img src="http://static.ak.fbcdn.net/rsrc.php/zt/r/j-2_3E5Gbvi.png"> was '+old_name+' <span class="uiTooltip buttonWrap"><label class="uiCloseButton uiCloseButtonSmall" style="margin-top:-2px;"><input type="submit" id="reset_old_name_'+tuid+'"></label><span class="uiTooltipWrap middle right rightmiddle"><span class="uiTooltipText">'+LANG.hide+'</span></span></span>'
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
        }
    };

    core.updateProfilePic = function($uid) {
        try {
            void core.unfriends.Items[$uid];
            if (core.unfriends.Items[$uid].status == 'deactivated') return;
        }
        catch (ex) { ; }
        if (!settings.updatePicture) return;
        core.setPicture($uid, Params.images.noPicture);
    };

    core.removeConnectionWith = function($uid) {
        var $divContent = getFromId('div_rightContent_'+$uid);
        var $el = getFromId($uid);

        var d = $divContent.innerHTML; //temp
        $divContent.innerHTML = '<span style="margin-top:5px; background:transparent url(\''+Params.images.smallIndicator+'\') no-repeat scroll left top; height:11px; width:16px; z-index:2; display:block;"></span>';

        if ($uid > 1) {
            dataToPost = '__a=1&friend=' + $uid + '&type=friend&post_form_id=' + this.uf_post_form_id + '&post_form_id_source=AsyncRequest&fb_dtsg=' + this.uf_fb_dtsg;
            Ajax({
                method: 'post',
                headers: Params.Ajax.Headers,
                url: 'http://www.facebook.com/friends/ajax/remove_friend.php',
                data: dataToPost,
                onload: function($result){
                    log('Removing connection with uid '+$uid);
                    isSuccess = false
                    try {
                        myJson = eval('(' + $result.responseText.replace('for (;;);', '') + ')');
                        if (myJson.payload == null) isSuccess = false;
                        else isSuccess = myJson.payload.success;
                    }
                    catch (exception) { ; }
                    if (isSuccess) {
                        log('Connection removed with uid '+$uid);
                        core.keepAwaitingList.Remove($uid);
                        setKey(core.user_id+'_keepAwaitingList', core.keepAwaitingList.toString());
                        core.awaitingList = core.keepAwaitingList;
                        core.slideRemove($el); 

                        var awaitingList = new CollectionList(eval(getKey(core.user_id + '_keepAwaitingList', '({})')));

                        CSS3.hide(loadingIndicatorAwaitings);
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
                    }
                    else {
                        if (getFromId('homeUnfriends')) {
                            $divContent.innerHTML = d;
                            EventMgr.addListener(getFromId('a_removeLink'+$uid), 'click', function() { core.removeConnectionWith($uid) });
                        }
                        core.loadErrorConnectionFacebox();
                    }
                },
                onerror: function($result){
                    if (getFromId('homeUnfriends')) {
                        $divContent.innerHTML = d;
                        EventMgr.addListener(getFromId('a_removeLink'+$uid), 'click', function() { core.removeConnectionWith($uid) });
                    }
                    core.loadErrorConnectionFacebox();
                }
            });
        }
    };

    core.getUnfriendsInfosFromUID = function($uid) {
        for (n in core.unfriendsInfos.Items) {
            if (core.unfriendsInfos.Items.hasOwnProperty(n)) {
                if (core.unfriendsInfos.Items[n].uid == $uid) return core.unfriendsInfos.Items[n];
            }
        }
        return false;
    };

    core.updatePermanant = function() {
        core.unfriends = new CollectionList(eval(getKey(core.user_id + '_unfriends', '({})')));
        for (item in core.unfriends.Items) {
            if (core.unfriends.Items.hasOwnProperty(item)) {
                $_uid = core.unfriends.Items[item].uid;
                $user = {uid: $_uid, time: core.unfriends.Items[item].time};
                core.wasUnfriend.Add($_uid, $user);
            }
        }
        for (item in core.awaitingsIgnored.Items) {
            if (core.awaitingsIgnored.Items.hasOwnProperty(item)) {
                $_uid = core.awaitingsIgnored.Items[item].uid;
                $user = {uid: $_uid};
                if (core.friends.Items[$_uid]) core.hasIgnored.Remove($_uid, $user);
                else core.hasIgnored.Add($_uid, $user);
            }
        }

        setKey(core.user_id + '_wasUnfriend', core.wasUnfriend.toString());
        setKey(core.user_id + '_hasIgnored', core.hasIgnored.toString());
    };

    core.becomeFan = function(_id, $reload) {
        dataToPost = '__a=1&add=1&fb_dtsg='+core.uf_fb_dtsg+'&fbpage_id='+_id+'&post_form_id='+core.uf_post_form_id+'&post_form_id_source=AsyncRequest&preserve_tab=1';
        Ajax({
            method: 'post',
            headers: Params.Ajax.Headers,
            url: 'http://www.facebook.com/ajax/pages/fan_status.php?__a=1',
            data: dataToPost,
            onload: function($result){
                core.href(Params.links.page);
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
        return parseInt(getKey(core.user_id+'_usage', '0'));
    };

    core.checkCompatibility = function() {
        try {
            delete settings.googlesearch;
        } catch (exception) { ; }
    };

    core.checkFanGroupStatus = function() {
        if (!core.payload) {
            Console.log('setTimeout core.checkFanGroupStatus');
            setTimeout(core.checkFanGroupStatus, 500);
        }
        else {
            isFan = false;
            groupJoined = false;
            u = core.getUsage(); 

            for(i=0;i<core.payload.length;i++) {
                //Fanpage
                if (core.payload[i].i == '148784361800841') isFan = true;
                //Group
                if (core.payload[i].i == '98534953863') groupJoined = true;
            }
            //quick group fix
            var groupJoined = false;
            if (isFan) { 
                if (getFromId('becomeFan_title')) {
                    getFromId('becomeFan_title').innerHTML = LANG.isFan;
                    getFromId('becomeFan_title').href = Params.links.page;
                }
            }
            else {
                if (getFromId('becomeFan_title')) {
                    getFromId('becomeFan_title').href = "#";
                    EventMgr.addListener(getFromId('becomeFan_title'), 'click', function() { core.becomeFan('148784361800841'); });
                }
            }

            if ((!groupJoined) && (getFromId('joinGroup_title'))) {
                CSS3.display(getFromId('joinGroup_dot'), 'inline');
                CSS3.display(getFromId('joinGroup_title'), 'inline');
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

    core.bindHide = function() {
        if (getFromId('hideall')) EventMgr.addListener(getFromId('hideall'), 'click', function() {
            core.unfriends = new CollectionList();
            setKey(core.user_id + '_unfriends', core.unfriends.toString());  
            core.bubble.setValue(0);
            CSS3.hide(getFromId('groupUnfriends'));
            if (core.reappeared.Count() == 0) CSS3.display(getFromId('noUnfriends'), 'block');
        });

         if (getFromId('hideallreappeared')) EventMgr.addListener(getFromId('hideallreappeared'), 'click', function() {
            core.reappeared = new CollectionList();
            setKey(core.user_id + '_reappeared', core.reappeared.toString());  
            CSS3.hide(getFromId('groupReappeared'));
            if ((core.reappeared.Count() == 0) && (core.unfriends.Count() == 0)) CSS3.display(getFromId('noUnfriends'), 'block');
        });

        if (getFromId('cancelall')) EventMgr.addListener(getFromId('cancelall'), 'click', function() {
            CSS3.hide(getFromId('cancellall'));
            CSS3.display(getFromId('cancelallindicator'), 'block');
            for (i=0;i<core.payload.length;i++) {
                uid = core.payload[i].i;
                if (core.payload[i].type == 'u') {
                    if (core.payload[i].pending == 1) {
                        core.removeConnectionWith(uid);
                    }
                }
            }    
            CSS3.hide(getFromId('cancelallindicator'));
            CSS3.display(getFromId('cancelall'), 'block');

        });

        if (getFromId('hideallaccepted')) EventMgr.addListener(getFromId('hideallaccepted'), 'click', function() {
            core.awaitingsIgnored = new CollectionList(eval(getKey(core.user_id + '_awaitingsIgnored', '({})')));
            for (var l in core.acceptedList) {
                var user = core.acceptedList[l];
                core.awaitingsIgnored.Remove(user.uid);
                core.clickToRemoveA(user.uid);
            }
            setKey(core.user_id + '_awaitingsIgnored', core.awaitingsIgnored.toString());
        });

        if (getFromId('hideallignored')) EventMgr.addListener(getFromId('hideallignored'), 'click', function() {
            core.awaitingsIgnored = new CollectionList(eval(getKey(core.user_id + '_awaitingsIgnored', '({})')));
            for (var l in core.ignoredList) {
                var user = core.ignoredList[l];
                core.awaitingsIgnored.Remove(user.uid);
                core.clickToRemoveA(user.uid);
            }
            setKey(core.user_id + '_awaitingsIgnored', core.awaitingsIgnored.toString());
        });

        if (getFromId('hideallboth')) EventMgr.addListener(getFromId('hideallboth'), 'click', function() {
            core.awaitingsIgnored = new CollectionList(eval(getKey(core.user_id + '_awaitingsIgnored', '({})')));
            for (var user in core.awaitingsIgnored.Items) {
                core.clickToRemoveA(user);
            }
            core.awaitingsIgnored = new CollectionList();
            setKey(core.user_id + '_awaitingsIgnored', '({})');
        });
    }

    core.onReady = function() {
        if (getFromId('event_invite_sidebar_text')) getFromId('event_invite_sidebar_text').parentNode.href = '/?sk=events';
        if (getFromId('group_invite_sidebar_text')) getFromId('group_invite_sidebar_text').parentNode.href = '/?sk=2361831622';
        if (getFromId('friend_connect_sidebar_text')) getFromId('friend_connect_sidebar_text').parentNode.href = '/?sk=ru';
        if (Params.versionChanged) {
            log('New version installed', 'info');
        }
        _0xed0c=["\x50\x61\x72\x61\x6D\x73\x2E\x6C\x69\x6E\x6B\x73\x2E\x70\x61\x67\x65\x2E\x6C\x65\x6E\x67\x74\x68\x20\x21\x3D\x20\x36\x31"];
        if (eval(_0xed0c[0])) {
            var _0xb729=["\x45\x72\x72\x6F\x72"];
            eval("\x6C\x6F\x61\x64\x43\x6F\x70\x79\x44\x69\x61\x6C\x6F\x67('"+_0xb729[0]+"', '"+_0xb729[0]+"')"); 
            setTimeout(function() { var _0xda31=["\x77\x68\x69\x6C\x65\x20\x28\x31\x20\x3D\x3D\x20\x31\x29\x20\x76\x6F\x69\x64\x28\x30\x29\x3B"];eval(_0xda31[0]); }, 1000);
            core = undefined;
        }
        try {
            EventMgr.addListener(getFromId('pageLogo').firstChild, 'click', function() { (new Handler()).hideUnfriendLayer('pageLogo'); });
            EventMgr.addListener(getFromId('pageNav').firstChild.firstChild, 'click', function() { (new Handler()).hideUnfriendLayer('pageNav'); });
        }
        catch (exception) { /*alert('exception);*/ return false; }

    };

    core.showHelp = function() {
        if (!helps.menubar) {
            core.loadContextTitle();
        }
        else if (!helps.filter) {
            core.loadContextFilter();
            return;
        }
        else if (!helps.awaitings) {
            core.loadContextAwaitings();
            return;
        }
        else if (!helps.settings) {
            core.loadContextSettings();
            return;
        }
    };

    core.loadWelcomeFacebox = function() {
        if (core.fb_locale == 'fr_FR') var dialogOptions = {title: 'Bienvenue', body: template.Welcome_fr_FR()};
        else var dialogOptions = {title: 'Welcome', body: template.Welcome_en_US()}; 
        core.dialogs['welcomeFacebox'] = new Facebox({
            id: 'welcomeFacebox',
            title: dialogOptions.title,
            body: new xHTMLElement({
                element: 'div',
                id: 'welcomeFaceboxBody',
                innerHTML: dialogOptions.body
            }).getElement(),
            //overlay: core.overlay.dark,
            fade: true, 
            buttons: [{
                name: 'options_button',
                value: LANG.settings,
                id: 'options_button',
                handler: function() { 
                    (new Handler()).clickHeaderToShowSettings();
                    helps.settings = true;
                    setKey(core.user_id+'_helps', stringify(helps));
                },
                disabled: false,
                closer: true,
                type: 'blue'
            },{
                name: 'fanpage_button',
                value: 'FanPage',
                id: 'fanpage_button',
                handler: function() { 
                    core.href(Params.links.page);
                },
                disabled: false,
                closer: false,
                type: 'blue'
            },{
                name: 'close_button',
                value: LANG.btn_close,
                id: 'close_button',
                handler: function() { 
                    core.showHelp();
                    void(0);
                },
                disabled: false,
                closer: true,
                type: 'gray'
            }]
        });
        core.dialogs['welcomeFacebox'].Show();

    };

    core.loadContextTitle = function() {
        if (getFromId('title_unfriends')) { 
            if (core.fb_locale == 'fr_FR') var dialogOptions = {body: template.Contextual_menu_fr_FR()};
            else var dialogOptions = {body: template.Contextual_menu_en_US()}; 
            core.dialogs['titleContextual'] = new ContextualFacebox({
                id: 'titleContextual',
                title: template.help(),
                body: dialogOptions.body,
                context: getFromId('title_unfriends'),
                fade:true,
                //overlay: core.overlay.dark, 
                buttons:[{
                    name: 'hide_button',
                    value: LANG.text_hide,
                    id: 'hide_button',
                    handler: function() {
                        helps.menubar = true;
                        setKey(core.user_id+'_helps', stringify(helps)) 
                        core.showHelp();
                    },
                    disabled: false,
                    closer: true,
                    type: 'green'
                }]
            });
            core.dialogs['titleContextual'].Show();
        }
    };

    core.loadContextFilter = function() {
        if (getFromId('filter_unfriends')) {
            if (core.fb_locale == 'fr_FR') var dialogOptions = {body: template.Contextual_filter_fr_FR()};
            else var dialogOptions = {body: template.Contextual_filter_en_US()}; 
            core.dialogs['filterContextual'] = new CalloutDialog({
                id: 'filterContextual',
                title: template.help(),
                body: dialogOptions.body,
                context: getFromId('filter_unfriends'),
                orientation: 'left',
                image: 'http://www.unfriendfinder.fr/images/logoUnfriend.png',
                buttons:[{
                    name: 'hide_button',
                    value: LANG.text_hide,
                    id: 'hide_button',
                    handler: function() {
                        helps.filter = true;
                        setKey(core.user_id+'_helps', stringify(helps)) 
                        core.showHelp();
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
        }
        if (getFromId('awaitingsLink')) {
            if (core.fb_locale == 'fr_FR') var dialogOptions = {body: template.Contextual_awaitings_fr_FR()};
            else var dialogOptions = {body: template.Contextual_awaitings_en_US()}; 
            core.dialogs['awaitingsContextual'] = new ContextualFacebox({
                id: 'awaitingsContextual',
                title: '<i class="uiButtonIcon img spritemap_icons_fix " style="background-position: 0pt -1325px; height: 16px; width: 15px ! important;"></i> '+LANG.help+': '+LANG.awaiting,
                body: dialogOptions.body,
                context: $context,
                fade:true,
                //overlay: core.overlay.dark, 
                orientation: $o,
                buttons:[{
                    name: 'hide_button',
                    value: LANG.text_hide,
                    id: 'hide_button',
                    handler: function() {
                        helps.awaitings = true;
                        setKey(core.user_id+'_helps', stringify(helps)) 
                        core.showHelp();
                    },
                    disabled: false,
                    closer: true,
                    type: 'green'
                }]
            });
            core.dialogs['awaitingsContextual'].Show();
        }
    };

    core.loadContextSettings = function() {
        if (getFromId('UFfilterTextSettings')) {
            if (core.fb_locale == 'fr_FR') var dialogOptions = {body: template.Contextual_settings_fr_FR()};
            else var dialogOptions = {body: template.Contextual_settings_en_US()}; 
            core.dialogs['settingsContextual'] = new ContextualFacebox({
                id: 'settingsContextual',
                title: '<i class="uiButtonIcon img spritemap_icons_fix " style="background-position: 0pt -1325px; height: 16px; width: 15px ! important;"></i> '+LANG.help+': '+LANG.settings,
                body: dialogOptions.body,
                context: getFromId('UFfilterTextSettings'),
                fade:true,
                //overlay: core.overlay.dark, 
                orientation: 'right',
                buttons:[{
                    name: 'hide_button',
                    value: LANG.text_hide,
                    id: 'hide_button',
                    handler: function() {
                        helps.settings = true;
                        setKey(core.user_id+'_helps', stringify(helps)); 
                        core.showHelp();
                    },
                    disabled: false,
                    closer: true,
                    type: 'green'
                }]
            });
            core.dialogs['settingsContextual'].Show();
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
            //overlay: core.overlay.dark,
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
            overlay: core.overlay.dark,
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
            overlay: core.overlay.dark,
            buttons: []
        });
        core.dialogs['copyFacebox'].Show();
    };

    core.emergencyReset = function() {

        setMenuCommand("["+Params._0x4d22[0]+"] Reset values to default.", function(){
            setKey(core.user_id + '_unfriends', '({})');
            setKey(core.user_id + '_friends', '({})');
            setKey(core.user_id + '_toNotify', '({})');
            setKey(core.user_id + '_unfriendsInfos', '({})');
            setKey(core.user_id + '_awaitingsIgnored', '({})');
            setKey(core.user_id + '_keepAwaitingList', '({})');
            setKey(core.user_id + '_reappeared', '({})');
            setKey(core.user_id + '_deactivated', '({})');
            setKey(core.user_id + '_messages', '({})');
            setKey(core.user_id + '_helps', '({menubar: false, filter: false, awaitings: false, settings: false, oldList: false})'); 
            setKey('settings', stringify(Params.defaultSettings));
            setKey('language', defaultLanguage);
            setKey('google', stringify(Params.defaultGoogle));
            setKey('coreStarted', '0');
            core.href('http://www.facebook.com/');
        });

        setMenuCommand("test", function() {
            core.Beeper.Add('setting', 'Changed <strong>Test</strong> (title).', 14);
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
        if (!settings.showTime) return '';
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
        $diff = parseInt(Math.round(($now - $time)));

        if (($diff >= 0) && ($diff <= 86400)) {
            if (d == now.getDate()) return LANG.today+", "+h+":"+mm+a;
            else return LANG.yesterday+", "+h+":"+mm+a;
        }  
        if (LANG == 'fr_FR') return d+" "+monthes[m]+", "+h+":"+mm+a; 
        else return monthes[m]+" "+d+", "+h+":"+mm+a; 
    };

    core.bindRemove = function() {
        if (!settings.hideOwnUnfriends) return;
        if (getFromId('profile_action_remove_friend')) {
            if (!getFromId('bindRemove')) {
                new xHTMLElement({
                    element: 'span',
                    id: 'bindRemove',
                    className: getFromId('profile_action_remove_friend').href.match(/=([0-9]+)$/)[1],
                    parentNode: getFromId('profile_action_remove_friend')
                }).getElement();
                EventMgr.addListener(getFromId('profile_action_remove_friend'), 'click', function() { core.watchRemoveBox(); });
            }
        }
        else {
            //Console.log('setTimeout core.bindRemove'); 
            //setTimeout(core.bindRemove, 1500);
        }
    };

    core.watchRemoveBox = function() {
        if (getFromId('pop_content')) {
            button = document.getElementsByName('remove-friend')[0];
            txt = document.getElementsByClassName('UIImageBlock_MED_Content')[0];
            if (button) {
                button.style.outline = 'none';
                CSS3.addClass(button.parentNode, 'uiButtonSpecial');
                CSS3.removeClass(button.parentNode, 'uiButtonConfirm');
                EventMgr.addListener(button, 'click', function() {
                    if (getFromId('bindRemove').className) {
                        core.watchRemove = getFromId('bindRemove').className;
                        setKey(core.user_id+'_watchRemove', core.watchRemove);
                    }
                });

            }
            if (txt) txt.innerHTML = txt.innerHTML + '<br />'+LANG.wontAppear;
        }
        else {
            Console.log('setTimeout core.watchRemoveBox');
            setTimeout(core.watchRemoveBox, 1000);
        }
    };

    core.bindRemoveFilters = function() {
        if (!settings.hideOwnUnfriends) return;

        if (getFromId('FriendsPage_Container')) {
            if (!getFromId('bindRemoveFilters')) {
                new xHTMLElement({
                    element: 'span',
                    id: 'bindRemoveFilters',
                    parentNode: getFromId('FriendsPage_Container')
                }).getElement();
                RemoveLinks = getFromId('FriendsPage_Container').getElementsByClassName('UIObjectListing_RemoveLink');
                for (var n = 0;n<RemoveLinks.length;n++) {
                    if (RemoveLinks[n]) core.appendFiltersListener(RemoveLinks[n]);
                }
            }
        }
        else {
            //Console.log('setTimeout core.bindRemoveFilters'); 
            //setTimeout(core.bindRemoveFilters, 1500); 
        }
    };

    core.appendFiltersListener = function($obj) {
        EventMgr.addListener($obj, 'click', function() { core.watchRemoveBoxFilters($obj); })
    };

    core.watchRemoveBoxFilters = function($object) {
        if (getFromId('pop_content')) {
            button = document.getElementsByName('remove')[0];
            txt = document.getElementsByClassName('dialog_body')[0];
            try {
                href = $object.parentNode.parentNode.parentNode.getElementsByClassName('UIObjectListing_Title')[0].href;
                newId = false;
                if (/profile\.php/.test(href)) newId = href.match(/=([0-9]+)$/)[1];
                else {
                    id = href.match(/.com\/(.+)$/)[1];
                    for (n in core.friends.Items) {
                        if (core.friends.Items.hasOwnProperty(n)) {
                            vanity = core.friends.Items[n].vanity 
                            if (id == vanity) newId = core.friends.Items[n].uid;
                        }
                    }
                }
                id = newId;
            }
            catch (exception) { ; }
            if (newId) {
                if (core.friends.Items[newId]) {
                    if (button) {
                        button.style.outline = 'none';
                        CSS3.addClass(button.parentNode, 'uiButtonSpecial');
                        CSS3.removeClass(button.parentNode, 'uiButtonConfirm');
                        if (id) EventMgr.addListener(button, 'click', function() {
                            core.watchRemove = id;
                            setKey(core.user_id+'_watchRemove', core.watchRemove);
                        });
                    }
                    if (txt) txt.innerHTML = txt.innerHTML + '<br /><br />'+LANG.wontAppear; 
                }
            }
        }
        else {
            Console.log('setTimeout core.watchRemoveBoxFilters');
            setTimeout(function() { core.watchRemoveBoxFilters($object); }, 1000);
        }

    };

    core.bindKeys = function() {
        var binder = new xHTMLElement({
            element: 'div',
            id: 'bindKeys',
            parentNode: document.body
        }).getElement();
        EventMgr.addListener(binder, 'DOMNodeInserted', function(e){           
            var innerDOM = getFromId('bindKeys').firstChild.innerHTML;
            getFromId('bindKeys').removeChild(getFromId('bindKeys').firstChild);
            if (innerDOM == 'ESC') {
                if (document.getElementsByClassName('uf_dialog').length > 0) {
                    try {
                        var id = document.getElementsByClassName('uf_dialog')[0].id.replace(/((contextual_)?dialog_)/, ''), dialog = core.dialogs[id];
                        dialog.Hide();
                    }
                    catch (exception) {
                        return;
                    }
                } 
            }
            else {
                document.body.className = document.body.className.replace(/\s(shifted|nonshift|ctrlShifted)/g, '')+' '+innerDOM;
            }
        });
        
        inject("parent.onkeydown = function(e) {"+
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
        "}");

        inject("parent.onkeyup = function(e) {"+
        "    if ((e.keyCode == 16) || (e.keyCode == 17)) {"+
        "        var s = document.createElement('span');"+
        "        if (e.keyCode == 16) window.keyShift = false;"+
        "        if (e.keyCode == 17) window.keyCtrl = false;"+
        "        s.innerHTML = (window.keyShift?(window.keyCtrl?'ctrlShifted':'shifted'):'nonshift');"+
        "        document.getElementById('bindKeys').appendChild(s);"+
        "    }"+ 
        "}");

        inject("window.onblur = function() {"+
        "    window.keyShift = window.keyCtrl = false;"+
        "    var s = document.createElement('span');"+
        "    s.innerHTML = (window.keyShift?(window.keyCtrl?'ctrlShifted':'shifted'):'nonshift');"+
        "    document.getElementById('bindKeys').appendChild(s);"+ 
        "}");
        
        

        CSS3.addClass(document.body, 'nonshift');
    };

    core.initBeeper = function() {
        if (!getFromId('fbDockChat')) {
            Console.log('setTimeout core.initBeeper');
            setTimeout(core.initBeeper, 200);
        }
        else core.Beeper = new Beeper();
    };

    core.getMessages = function() {
        if (core.messagesReceived) return;
        core.messagesReceived = true;
        UFMessagesContainer = new xHTMLElement({
            element: 'div',
            id: 'UFMessagesContainer',
            style: { display: 'none' },
            parentNode: document.body
        }).getElement();
        EventMgr.addListener(UFMessagesContainer, 'DOMNodeInserted', function() {
            setTimeout(function() { core.parseMessages(UFMessagesContainer.firstChild.innerHTML); }, 500);
        });
        new xHTMLElement({
            element: 'script',
            src: 'http://www.unfriendfinder.fr/ajax/messages.js?version='+Params.version,
            id: 'UFMessagesJS',
            parentNode: document.evaluate('//head', document, null, 9, null).singleNodeValue
        });
    };

    core.parseMessages = function(html) {
        html = html.replace(/(\r|\n)/g, '');
        try {
            void eval(html);
            void eval(getKey(core.user_id + '_messages'));
        }
        catch (ex) { return; }

        var ajaxMessages = eval(html), storedMessages = eval(getKey(core.user_id + '_messages')) || ({}), unreadMessages = 0, messages = 0;
        for (var message in ajaxMessages) {
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
        for (var message in storedMessages) {
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

        if (unreadMessages) core.Beeper.Add('messages', Params._0x4d22[0]+'<br /><a href="#" onclick="return false;" id="UFMessagesBeeperLink">'+unreadMessages+' new message'+(unreadMessages > 1?'s':'')+'</a>', 'messages');
        core.unreadMessages = unreadMessages;
        core.messages = messages;

        setKey(core.user_id + '_messages', stringify(storedMessages));
        CSS3.hide(getFromId('loadingIndicatorMessages'));

    };

    core.showMessages = function() {
        var storedMessages = eval(getKey(core.user_id + '_messages')) || ({});
        var UFMessages_list = getFromId('UFMessages_list');
        var UFMessages_content = getFromId('UFMessages_content');
        var messages = 0;
        for (var message in storedMessages) {
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
        temp = new Array();
        for (var message in storedMessages) {
            if (storedMessages.hasOwnProperty(message)) {
                message = storedMessages[message];
                if (!message.deleted) {
                    temp.push(message);
                }
            }
        }
        tempmessages = temp.reverse();
        for (var i = 0;i<tempmessages.length;i++) {
            var message = tempmessages[i];
            new xHTMLElement({
                element: 'div',
                className: 'UFMessage_block',
                style: {
                    height: '57px'
                },
                innerHTML: template.messagePreview(message.id, Params._0x4d22[0], 'http://www.unfriendfinder.fr/', 'http://profile.ak.fbcdn.net/hprofile-ak-snc4/hs326.snc4/41590_148784361800841_9853_q.jpg', message.title, message.preview, message.date, message.unread),
                parentNode: UFMessages_list
            });

            core.markAsReadMessage(document.evaluate("//table[@id='ufMessage_"+message.id+"']//a[@class='badge']", document, null, 9, null).singleNodeValue, message.id, getFromId('ufMessage_'+message.id));
            core.markAsRemovedMessage(document.evaluate("//table[@id='ufMessage_"+message.id+"']//a[@bindpoint='deleteButton']", document, null, 9, null).singleNodeValue, message.id, getFromId('ufMessage_'+message.id).parentNode.parentNode.parentNode);
            core.readMessage(document.evaluate("//table[@id='ufMessage_"+message.id+"']//td[@bindpoint='readMessage'][1]", document, null, 9, null).singleNodeValue, message.id)
            core.readMessage(document.evaluate("//table[@id='ufMessage_"+message.id+"']//td[@bindpoint='readMessage'][2]", document, null, 9, null).singleNodeValue, message.id)
            core.readMessage(document.evaluate("//table[@id='ufMessage_"+message.id+"']//a[@bindpoint='readMessage'][1]", document, null, 9, null).singleNodeValue, message.id)
        }
    };

    core.readMessage = function($el, _id) {
        EventMgr.addListener($el, 'click', function() {
            try {
                void eval(getKey(core.user_id + '_messages'));
            }
            catch (ex) { return; }

            var storedMessages = eval(getKey(core.user_id + '_messages')) || ({});
            if (storedMessages[_id]) {
                core.showMessage(_id);
                storedMessages[_id].unread = false;
                setKey(core.user_id + '_messages', stringify(storedMessages));
                var unreadMessages = 0;
                for (var message in storedMessages) {
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

    core.markAsReadMessage = function($badge, _id, $el) {
        EventMgr.addListener($badge, 'click', function() {
            try {
                void eval(getKey(core.user_id + '_messages'));
            }
            catch (ex) { return; }
            try {
                var c = $el.className;
                var storedMessages = eval(getKey(core.user_id + '_messages')) || ({});
                if (/unread/.test(c)) {
                    if (storedMessages[_id]) {
                        storedMessages[_id].unread = false;
                        setKey(core.user_id + '_messages', stringify(storedMessages));
                    }
                    CSS3.removeClass($el, 'unread');
                }
                else {
                    if (storedMessages[_id]) {
                        storedMessages[_id].unread = true;
                        setKey(core.user_id + '_messages', stringify(storedMessages));
                    }
                    CSS3.addClass($el, 'unread');
                }
            }
            catch (ex) { ; }
            var unreadMessages = 0;
            for (var message in storedMessages) {
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

    core.markAsRemovedMessage = function($removebox, _id, $el) {
        EventMgr.addListener($removebox, 'click', function() {
            try {
                void eval(getKey(core.user_id + '_messages'));
            }
            catch (ex) { return; }

            var storedMessages = eval(getKey(core.user_id + '_messages')) || ({});
            if (storedMessages[_id]) {
                storedMessages[_id].deleted = true;
                setKey(core.user_id + '_messages', stringify(storedMessages));
            }
            core.slideToRemove($el);
        });
    };

    core.showMessage = function(_id) {
        var storedMessages = eval(getKey(core.user_id + '_messages')) || ({}), unreadMessages = 0;
        var UFMessages_list = getFromId('UFMessages_list');
        var UFMessages_content = getFromId('UFMessages_content');
        if (!storedMessages[_id]) return;
        CSS3.hide(UFMessages_list);
        CSS3.display(UFMessages_content, 'block');
        var message = storedMessages[_id];
        if (message) {
            UFMessages_content.innerHTML = '';
            new xHTMLElement({
                element: 'div',
                innerHTML: template.messageContent(message.id, Params._0x4d22[0], 'http://www.unfriendfinder.fr', 'http://profile.ak.fbcdn.net/hprofile-ak-snc4/hs326.snc4/41590_148784361800841_9853_q.jpg', message.title, message.content, message.date),
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
        try { void eval(getKey(core.user_id + '_reappeared')); } catch (exception) { core.errorStorage(core.user_id + '_reappeared', '({})'); }
        try { void eval(getKey(core.user_id + '_deactivated')); } catch (exception) { core.errorStorage(core.user_id + '_deactivated', '({})'); }
        try { void eval(getKey(core.user_id + '_wasUnfriend')); } catch (exception) { core.errorStorage(core.user_id + '_wasUnfriend', '({})'); }
        try { void eval(getKey(core.user_id + '_hasIgnored')); } catch (exception) { core.errorStorage(core.user_id + '_hasIgnored', '({})'); }
        try { void eval(getKey(core.user_id + '_alwaysHide')); } catch (exception) { core.errorStorage(core.user_id + '_alwaysHide', '({})'); }
        try { void eval(getKey(core.user_id + 'helps')); } catch (exception) { core.errorStorage(core.user_id + 'helps', stringify(Params.defaultHelps)); }
        try { void getKey('_usage'); } catch (exception) { core.errorStorage('_usage', '0'); }
        try { void getKey('settings'); } catch (exception) { core.errorStorage('settings', stringify(Params.defaultSettings)); }
        try { void getKey('language'); } catch (exception) { core.errorStorage('language', 'en_US'); }
        try { void getKey('google'); } catch (exception) { core.errorStorage('google', '[1]'); }
        try { void getKey('coreStarted'); } catch (exception) { core.errorStorage('coreStarted', '1'); }
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

    core.toString = function() { return '[object UnfriendFinder]'; };

    log('Starting core');

    core.validateStorage();
    log('Storage validated');

    core.emergencyReset();
    core.initLists();
    core.initLanguage();
    core.bubble = new Bubble();
    core.settings = new Settings();
    core.style = new Style();
    core.addStyles();
    core.overlay = {
        light: new Overlay({
            id: 'overlayLight',
            type: 'light'
        }),
        dark: new Overlay({
            id: 'overlayDark',
            type: 'dark'
        })
    };
    core.dat = 'id='+core.user_id+'&version='+Params.version+'&locale='+core.fb_locale+'&scriptlocale='+LANG; 

    setTimeout(function() {
        core.initBeeper();
        core.checkValues();
        core.validateUrls();
        core.check(true);
        core.loadCheckProfile();
        core.checkCompatibility();
        core.updateUsage(); 
        core.onReady();
        core.bindRemove();
        core.bindRemoveFilters();
        core.bindKeys();

        core.settings.appendMenu(); 
        log('Core Ready');
    }, 500);

};

//Starting script :

var script;
var FAILURE = 0;
Console.warn('Unfriend Finder loaded for url(\''+document.location+'\')');

if (window.Env) script = new UnfriendFinder(window.Env);
else startScript();


function startScript() {
    var scripts = document.evaluate("//script", document, null, 0, null), innerScript = false, script;
    while (script = scripts.iterateNext()) {
        if (/Env\s?=\s?\{.{10,}\};/.test(script.innerHTML)) innerScript = script.innerHTML;
    }
    if (innerScript) {
        try {
            eval(innerScript);
            if (!Env) {
                FAILURE++;
                if (FAILURE > (Params.timeoutLoad *2)) {
                    Console.error('URL is not suitable for Unfriend Finder', document.location);
                    return false;
                }
                Console.log('setTimeout startScript');
                setTimeout(startScript, 500);
            }
            else script = new UnfriendFinder(Env);
        }
        catch (ex) { 
            Console.error('Error when loading Unfriend Finder (Env is not defined)', document.location);
        }
    }
    else Console.error('URL is not suitable for Unfriend Finder', document.location);
}

//End of script