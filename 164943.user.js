// ==UserScript==
// @name         GR.jQ II - GayRomeo meets jQuery
// @description  Enlarge profile images (in search results and profile)

// @version      3.4
// @date    26.04.2014

// @icon        http://www.planetromeo.com/v1/img/touch-icon.png
// @downloadURL http://userscripts.org/scripts/source/164943.user.js

// @match       *://*.gayromeo.com/*
// @match       *://*.planetromeo.com/*
// @match       *://83.98.143.20/*

// @exclude     *://*.gayromeo.com/*main/heartbeat.php
// @exclude     *://*.planetromeo.com/*main/heartbeat.php
// @exclude     *://83.98.143.20/*main/heartbeat.php

// @exclude      *://*.gayromeo.com/*mitglieder/administration/pictures/edit.php*
// @exclude      *://*.planetromeo.com/*mitglieder/administration/pictures/edit.php*
// @exclude      *://83.98.143.20/*mitglieder/administration/pictures/edit.php*
// ^^ Avoid interference with GR-Tools - picture galerie

// Note:
//       go back to Version 3.1 in userscripts history for a
//       more detailed and precise include/exclude list
//
//
/*
   == History ==
    3.4
      * Added: Allow right Click
      * Remove GR-Ads-Banner ('#div-gpt-ad')
      * Bugfix: Addzoom() fucked up preview div when called twice

    3.3
      * Enlarges Thumbs in search result by 40% (ZoomHack)

    3.2
      * bugfix for GR-Tools administrate user galerie & empty club galerie
      * added 'New' Galerie button for own user galerie


    3.0
      * Link Beautifier
      * included all GR-Sites ()

    2.9
      * Design changes (code & css)
      * Reduced server load

    2.8
      * PoorMan's Plus - ReEnable TextTemplates for non Plus user
      * PoorMan's Plus - Workaround for Saved search

    2.7
      * http text to link

    2.5
      * Auto close empty galerie's & close when mouse is over 'close album'
      * support for GR-Optimiser

    2.4 june 2013
        * Add pictures to other users galerie ( Open galerie and then use 'Add pictures from' link under each folder)
        * open galerie(instead of profile) when you click on the Thumbnail image
            -> enable/disable via script var  'opt_QuickGallerieLink'

    2.3 may 2013
        * Added edit comments

    2.1
        * Add PicID to thumbnails
            -> enable/disable via script var  'opt_ShowID'

 */
//
//
// ==/UserScript==


addJQuery(function() {

    /////////////////////////////////////
    //     _____                __  _
    //    / ____|              / _|(_)
    //   | |      ___   _ __  | |_  _   __ _
    //   | |     / _ \ | '_ \ |  _|| | / _` |
    //   | |____| (_) || | | || |  | || (_| |
    //    \_____|\___/ |_| |_||_|  |_| \__, |
    //                                  __/ |
    //                                 |___/
// Too create text like is ^^^^ :
//
//      http://chrome.google.com/webstore/detail/text-to-ascii-art/fgnnnhgifkejnkjbmigmenlfnjkngelg/related
//                                                                                          Big Fitted/Full
//
//  Quicklink:
//          http://patorjk.com/software/taag/#p=display&h=1&v=0&c=c%2B%2B&f=Big&t=Type%20Something%20


    CONFIG_COOKIE_NAME = 'GRjQ',
    CONFIG_COOKIE_TTL = 30,

    config = {

        ShowID : 1 ,
        
        //EnableZoom : 1,
        // Show preview when mouse is over some thumb

        ThumbZoomHack : "+=20" ,
        // Enlarges thumbs by 20 pixel (Normally they are 55px x 55px )
        // Set to "+=0" to disable


        QuickGallerieLink : 1 ,

        AutoCloseEmptyGalerie : 1 ,

        ShowEditComment : 1 ,

        PreCacheAllImages : 0 ,
        // 1  => Load all images on init -> better performance; but bigger serverload for GR
        // 0 => Load images on demand(when hovering the mouse over thumb)


        TextToLink : 1 ,
        // turns text like http://cam4.com in a clickable Link

        TextToLink_withDereferer : 0 ,
        // uses http://planetromeo.com /jump.php?jump= <myurl>
        // to open the link so the called site don't see exactly where from GR(ProfileID) you come

        
        SimpleStealthMode : 0 ,
        // 'Hide Visit' is now just one click - no extra dialog, no (visible) timelimit 
        //  however you shouldn't wait to long and click it with in 10 sec
        //  without plus account that might have no effect

        PMP_IsNoPlusAccount : 1 ,
        // PMP => PoorMan'sPlus
        //  * Reenable Texttemplates/snippes
        //  * and executing saved searches (like 'all people in berlin with picture')
        //
        // IMPORTANT for PLUS user - set this to 0 ! (since I haven't plus and no one tested it yet)
        // if you've Plus please check if text templates & saved searches works as normal with the setting PMP_IsNoPlusAccount : 1
        // and send me a PM via userscript or GR:7463430


       // These may require
       //  @match       *://*.planetromeo.com/*
       // to fully work:

            shortenGRLink : 1 ,
            // Will remove '00000000000000000000000000000000' from links like in http://www.planetromeo.com/00000000000000000000000000000000/settings/messageStandardTexts.php
            // that was (or was planned) as SessionID but is not used
            // (except one time after login - later seesionID will be stored as Cookie)

            RemoveGRTracking : 1 ,
            // Will remove '&secure=8bvLlmHupfg4GNxVHWDG9Q==' part from Links
            // that's an base64 encoded 32 Byte Tracker Cookies
            // GR uses it for visitorStatistics -> http://planetromeo.com/settings/visitorStatistics.php
            // to show from where you come(Search, Usercenster, Top-User-Footprint ...) and have gone

            ImgHide_DELAY : 800,

            ShowEditComment_DELAY : 1800,

        },


        serializeConfig = function() {
            var ret = [];
            for (var ConfigItem in config) {
                ret[ret.length] = ConfigItem + ':' + config[ConfigItem];
            }
            return ret.join('|');
        },

        deserializeConfig = function(ConfigData) {
            var cfg = {},
                pairs = ConfigData.split('|');

            for (var i = 0; i < pairs.length; i++) {

                var keyVal = pairs[i].split(':');
                cfg[keyVal[0]] = keyVal[1];
            }
            return cfg;
        },

        setConfig = function(cfg) {
            cfg = cfg || {};
            for (var key in cfg) {
                var k = '' + key,
                    val = parseInt('' + cfg[k], 10) || 0;
                if (typeof config[k] == 'undefined')
                    continue;

                config[k] = val;
            }
        },


        loadConfigFromCookie = function() {
            var cookies = (document.cookie || '').split(';');

            for (var i = 0; i < cookies.length; i++) {

                var cookie = cookies[i].trim();
                if (cookie.substring(0, CONFIG_COOKIE_NAME.length + 1) == (CONFIG_COOKIE_NAME + '=')) {
                    var serializedConfig =
                        decodeURIComponent( cookie.substring( CONFIG_COOKIE_NAME.length + 1) ),
                        newConfig = deserializeConfig(serializedConfig);

                        setConfig(newConfig);

                    return;
                }
            }
        },

        saveConfigCookie = function() {
            var expiryDateString = '';
            if (config.keep) {
                var newExpiryDate = new Date();
                newExpiryDate.setTime(newExpiryDate.getTime() + CONFIG_COOKIE_TTL * 24 * 60 * 60 * 1000);
                expiryDateString = newExpiryDate.toUTCString();
            }
            var cookieData = [CONFIG_COOKIE_NAME, '=', encodeURIComponent(serializeConfig()), '; expires=', expiryDateString, '; path=/'];
            document.cookie = cookieData.join('');
        }

    var DebugMode// = true
    var DebugLog// = true

//     _____               _     _          _____                            _  _  _
//    / ____|             | |   (_)        / ____|                          | || || |
//   | |      ___    ___  | | __ _   ___  | (___    __ _ __   __ ___  _ __  | || || |
//   | |     / _ \  / _ \ | |/ /| | / _ \  \___ \  / _` |\ \ / // _ \| '__| | || || |
//   | |____| (_) || (_) ||   < | ||  __/  ____) || (_| | \ V /|  __/| |    |_||_||_|
//    \_____|\___/  \___/ |_|\_\|_| \___| |_____/  \__,_|  \_/  \___||_|    (_)(_)(_)
//
//

    // Uncomment to SAVE of personal Config's
    //      ( by default I'll comment that line in releases)
    //      you maybe need to delete the Cookies with the name 'GRjQ' to go back to initialization state
    // saveConfigCookie();


    // Uncomment to disable load Config by Cookie
    //      ( by default I'll keep that in for releases)
    loadConfigFromCookie();





    var timeoutID_delayedImgHide;







/*
    try {
        debugger
        if (config.EnableZoom) {
        
            // disable GR-Tools Zoom
            GRT.config.z=0 // enable zoom icons (0|1)
            // not working!!! GRT is not exporting it's configs
        }

    } catch (e) {
    }
*/



//              _  _                         _         _      _           _____  _  _        _
//       /\    | || |                       (_)       | |    | |         / ____|| |(_)      | |
//      /  \   | || |  ___ __      __  _ __  _   __ _ | |__  | |_  ___  | |     | | _   ___ | | __
//     / /\ \  | || | / _ \\ \ /\ / / | '__|| | / _` || '_ \ | __|/ __| | |     | || | / __|| |/ /
//    / ____ \ | || || (_) |\ V  V /  | |   | || (_| || | | || |_ \__ \ | |____ | || || (__ |   <
//   /_/    \_\|_||_| \___/  \_/\_/   |_|   |_| \__, ||_| |_| \__||___/  \_____||_||_| \___||_|\_\
//                                               __/ |
//                                              |___/

    try {
       if (document.onmousedown.name == "frk") {
        // unFuckRightKlick protect (dlprotect.js)

           // window.onmousedown     = null;
           document.onmousedown   =
                document.ondragstart   =
                    document.oncontextmenu = null;
         }

    } catch (e) {
    }

//    _____                                       _____  _____                    _      
//   |  __ \                                     / ____||  __ \                  | |     
//   | |__) | ___  _ __ ___    ___ __   __ ___  | |  __ | |__) |______  __ _   __| | ___ 
//   |  _  / / _ \| '_ ` _ \  / _ \\ \ / // _ \ | | |_ ||  _  /|______|/ _` | / _` |/ __|
//   | | \ \|  __/| | | | | || (_) |\ V /|  __/ | |__| || | \ \       | (_| || (_| |\__ \
//   |_|  \_\\___||_| |_| |_| \___/  \_/  \___|  \_____||_|  \_\       \__,_| \__,_||___/
//                                                                                       
//                                                                                       
   // remove GR-ads
   $('[id|="div-gpt-ad"]')
       .remove()




//    ____                       _    _   __          _       _         _
//   |  _ \                     | |  (_) / _|        | |     (_)       | |
//   | |_) |  ___   __ _  _   _ | |_  _ | |_  _   _  | |      _  _ __  | | __ ___
//   |  _ <  / _ \ / _` || | | || __|| ||  _|| | | | | |     | || '_ \ | |/ // __|
//   | |_) ||  __/| (_| || |_| || |_ | || |  | |_| | | |____ | || | | ||   < \__ \
//   |____/  \___| \__,_| \__,_| \__||_||_|   \__, | |______||_||_| |_||_|\_\|___/
//                                             __/ |
//                                            |___/
//   Will remove '00000000000000000000000000000000' from Links
    function RemoveLinkPart(
        attrib,
        attribData,
        RE_attribData )
    {
        $('['+ attrib +'*="'+ attribData +'"]')
        .attr( attrib , function (id, url) {

            if (!id)
                LogDebug ('// @match        *://*.planetromeo.com' + location.pathname + '*');

            LogDebug ( '    ' + id, '   ',   url)

            return  url
            .replace(RE_attribData ,'')
        })
    }

    // Links: No '0000000000000000'
    if (config.shortenGRLink) {

        var NULLSESSION = '/' + '00000000' + '00000000' + '00000000' + '00000000'


        RemoveLinkPart ('href', NULLSESSION, NULLSESSION) ;
        RemoveLinkPart ('src',  NULLSESSION, NULLSESSION) ;

    }
    // remove '&secure=8bvLlmHupfg4GNxVHWDG9Q==' part from Links
    if (config.RemoveGRTracking) {

        RemoveLinkPart ('href', 'secure=',   /&?secure=[^&]*/) ;
    }


//    _       _         _     _   __           _      _    _          _
//   | |     (_)       | |   (_) / _|         | |    | |  | |        ( )
//   | |      _  _ __  | | __ _ | |_  _   _   | |__  | |_ | |_  _ __ |/ ___
//   | |     | || '_ \ | |/ /| ||  _|| | | |  | '_ \ | __|| __|| '_ \  / __|
//   | |____ | || | | ||   < | || |  | |_| |  | | | || |_ | |_ | |_) | \__ \
//   |______||_||_| |_||_|\_\|_||_|   \__, |  |_| |_| \__| \__|| .__/  |___/
//                                     __/ |                   | |
//                                    |___/                    |_|
    //Note: "Uncaught TypeError: Cannot read property 'fn' of undefined" is somehow normal
    $.fn.mylinker = function() {

        function fn_LinkifyReplaceHandler ( all, prefix, found ) {
            // href='
            // src='
            // url(
            // //

            // 2f
            // ">http....

            var IsMaybeAlreadyLinks = /[=l\/2"]['"(\/F>]/.test(prefix)
            if (!IsMaybeAlreadyLinks) {

                // Patch when text starte with http
                if(/ h|ht|ww|\/\//i.test(prefix)) {
                    found = prefix + found
                    prefix = ''
                }

                 // Start Make Link
                    var link = $("<a>")
                        .html(found)

                 // Remove Tags
                    var linkUrl = link.text()     //found.replace(/<[^>]*>/g,'');

                    if (linkUrl > 'www')
                    linkUrl = 'http:\/\/' + linkUrl

                 // Add webjump
                    var jumpUrl
                    if (config.TextToLink_withDereferer)
                        jumpUrl = '/jump.php?jump=' + encodeURIComponent(linkUrl);
                    else
                        jumpUrl = linkUrl;

                // Let GR-Tools do Yt-Links
                // anyway that's not working right now events like mouseover get lost in the moment .html() is changed
                //  if (!/youtube\.com/.test(linkUrl)) {
                //      link.addClass('ytlink')
                //        GRT.addYTPreview();
                //   }
                        // Complete Link
                        /*
                        found = '<a'
                                    + ' href=' + jumpUrl
                                    + ' title=' + linkUrl
                                    + ' target="_blank"'
                                    + '>'
                                    + found + '</a>'
         */

                    link.attr({
                         href: jumpUrl ,
                         title: linkUrl ,
                         target: "_blank" ,
                    })

                    // .load(linkUrl + " title")
                    all = prefix + link[0].outerHTML;

                    fn_LinkifyReplaceHandler_ReplaceDone = true;

                } // if IsMaybeAlreadyLinks

            return all;

        }  //replace function


     // Linkify comment
        if (config.TextToLink) {


            //---------------------------------------

            var RE_TextLinkMatcher = /(?:[hftps]*:\/\/|www\.)[^\s]*/gi;
            var RE_TextLinkMatcherHTML = /(.{0,2})((?:[hftps]*:(?:<wbr>)?\/(?:<wbr>)?\/(?:<wbr>)?|www\.)(?:<wbr>|&amp;|[^\s&<\]\[])*)/gi;
            //           ^- from http://rodneyrehm.de/t/url-regex.html [stephenhay revised]

            if (DebugMode)
                this.css( "border", "1px solid red" ).attr( "title" , "Debuginfo: GR.jQ Target for Linkify")


            this.html( function( index, item) {

                fn_LinkifyReplaceHandler_ReplaceDone = false;
                var NewData = item.replace( RE_TextLinkMatcherHTML, fn_LinkifyReplaceHandler)
                if (fn_LinkifyReplaceHandler_ReplaceDone)
                  return NewData
                //GRT.callAction('Youtube')

            //    }
            });
        }

        return $(this);

    }

  //-----------------------------------------------------
    function DoLinkify() {
        if (config.TextToLink) {
            /*
            $('td#content > div.section > table.prfl   > tbody > tr > td.headline , \
               td#content > div.section > table.prfl   > tbody > tr > td[colspan|="2"] , \
                                           body.pgClFo > tbody > tr > td[colspan|="2"] , \
                   body.pMe > div         > table        > tbody > tr > td.body > div:not([id|="attachedPictures"])  , \
                   body.pMe > div.msg                                           > div:not([id|="attachedPictures"])    \
              ')
            */
            // pgClFo -> pageClubForum
            // prfl   -> profil (.prfl   th >td myNote)
            // pMe    -> private Message (td > div -> History;      div.msg > div -> private Message Window)
            // setcard -> Guid & Club
            // dunkel  -> Guestbook
            // modul   -> Linked Profiles
            // profileMemoColumn -> market
            // expandableList div.content -> market

//                b-ody > table > tbody > tr > td[style][valign]:first, \


            //$( ".prfl td:contains('http')" )
            //$( ".pMe  td:contains('http')" )
            //^-- "Error: SyntaxError: DOM Exception 12" in Forum

             $('.prfl   td.headline             , \
                .prfl   td[colspan|="2"]        , \
                .prfl   th ~td                  , \
                .pgClFo td[colspan|="2"]        , \
                .pMe    td      > div:not([id]) , \
                .pMe    div.msg > div:not([id]) , \
                .setcard   td[colspan|="2"]     , \
                .dunkel    td:not([align],[valign]) ,    \
                .modul     td.colLast           , \
                .searchResults td[colspan|="5"] > span ,\
                .searchResults > table td:not([width],[colspan],[align],[style]) ,\
                .profileMemoColumn ,\
                .nameCatCol div, \
                .expandableList div.content \
               ').mylinker();

          // Problem also matches div ... textarea
/*
            $(' td , \
                div  \
               ').mylinker();
*/
        }
    }
    DoLinkify()

      // (re)do  DoLinkify when
      //    * GR-Optimiser reloads the page

     $(document)
    .on('GRT_RETRIGGER',
        DoLinkify );


  //-----------------------------------------------------


//    _____                     __  __               _       _____   _
//   |  __ \                   |  \/  |             ( )     |  __ \ | |
//   | |__) |___    ___   _ __ | \  / |  __ _  _ __ |/ ___  | |__) || | _   _  ___
//   |  ___// _ \  / _ \ | '__|| |\/| | / _` || '_ \  / __| |  ___/ | || | | |/ __|
//   | |   | (_) || (_) || |   | |  | || (_| || | | | \__ \ | |     | || |_| |\__ \
//   |_|    \___/  \___/ |_|   |_|  |_| \__,_||_| |_| |___/ |_|     |_| \__,_||___/
//
//
    if (config.PMP_IsNoPlusAccount) {
    $('[disabled]').removeAttr('disabled')

    // 'Repair' Text Templates for private messages

        function PMP_EnableTxtTmpl() {

            $(".textSelector span" ).replaceWith( function( index , item) {

                    return $("<a>", {
                                href: '#' ,
                                html: item.replace(' (Plus User)','') ,
                                onclick: 'chooseStandardText(' + index  + ')' ,
                                }
                            )

                })
        }

        $('.plusSign').remove()
       // $('.textTemplateLinkBox a').mouseleave(PMP_EnableTxtTmpl)
        try {
            /*
            Part of function GR - showTemplates()
                  new Ajax({url: 'messageStandardTextSelector.ajax.php',
                  params: 'm=1',
                  targetEl: el,
                  showIndicator: true,
                  onComplete:
                    function(transport) {
                      el.innerHTML = transport.responseText;
                      msgResize();
                      el.scrollIntoView();
                    }
                  });
            */
                // Execute PMP_EnableTxtTmpl() after msgResize()
                var old_msgResize = msgResize
                msgResize=function () {
                    old_msgResize();
                    PMP_EnableTxtTmpl();
                }
        } catch (e) {
        }

    // --------------------------------------
    // Re-enable Search
    //
    //
    //
    function PMP_Search_ChangeSaveToExecute() {
        try {
            if ( !(/returnTo=/.test(location.search)) )  {

                var SearchForm = $('form.addSpin')
                var SearchForm_action_save    = SearchForm.attr('action')
                var SearchForm_action_execute = SearchForm_action_save.replace('action=save','action=execute')


                SearchForm.attr( 'action', SearchForm_action_execute )
                var SubmitButton = $('form.addSpin #id_submit')
                    .val("Execute")
            }

            // Autoclick 'search when run from Shortcut's on the right
            if ( (/SkipEdit=true/.test(location.search)) ) {
                SubmitButton.click()
            }

        } catch (e) {
        }
    }
                // and add 'SkipEdit=true' marker to url



        PMP_Search_ChangeSaveToExecute()

        //-----------------------------------------------
        //
        //
        // Adjust userdefined shortcuts 'executeSaved'->'edit'
        //  AND 'User' Page
       $('.shortcutsFrame .list_back a[href*="executeSaved"], \
          .pRomeo                    a[href*="executeSaved"]    ')
         .attr('href', function( i , attr) {

            return attr
                .replace(
                    'action=executeSaved',
                    'action=edit&SkipEdit=true'
              )

        })



 } // config.PMP_IsNoPlusAccount
    // Make 'New button a little bigger
    $('.searchLayout a[href*="action=showForm"]')
    .text(function ( i , text) {
        return '>> ' + text + ' <<'
    })

    //
    //    ______  ______  ______  ______  ______  ______  ______  ______  ______  ______  ______  ______
    //   |______||______||______||______||______||______||______||______||______||______||______||______|
    //
    //
    function LogDebug( Text1, Text2, Text3 ) {
        if (DebugLog) {
            Text2 = Text2?Text2:''
            Text3 = Text3?Text3:''
            console.log (Text1 + Text2 + Text3);
        }
    }

    var big_img_div;
    var big_img;
    var big_img_CommentLabel;


    var block_delayedImgHide = false;

    function delayedImgHide() {
        if (block_delayedImgHide == false) {
            timeoutID_delayedImgHide = setTimeout(
                cb_ImgHide ,
                config.ImgHide_DELAY );
            disableShrink = false;
        }
    }

    function delayedImgHide_Cancel() {

        clearTimeout( timeoutID_delayedImgHide ) ;

    }
    /////////////////////////////////////////////////////////

    function cb_ImgHide() {

        big_img_div
        .hide() ;
    }

//                 _      _   _____  _              _______                 _  _
//       /\       | |    | | |  __ \(_)            |__   __|         /\    | || |
//      /  \    __| |  __| | | |__) |_   ___  ___     | |  ___      /  \   | || |__   _   _  _ __ ___
//     / /\ \  / _` | / _` | |  ___/| | / __|/ __|    | | / _ \    / /\ \  | || '_ \ | | | || '_ ` _ \
//    / ____ \| (_| || (_| | | |    | || (__ \__ \    | || (_) |  / ____ \ | || |_) || |_| || | | | | |
//   /_/    \_\\__,_| \__,_| |_|    |_| \___||___/    |_| \___/  /_/    \_\|_||_.__/  \__,_||_| |_| |_|
//
//

    try {

        var configData=
            $('script:not([src]):first')

        var menubar = $('#menubar')

        //var isLoginViaClub = !!menubar.children('a[target]')[0] //  <- Checks for <a href= "new.php?set=123456" target= "album_mainpage"> Neue Galerie anlegen</a>

        if ( (configData [0] ) ) {


            var photoalbum = $.parseJSON(
                configData.text().match(/G.photoalbum.init\((.*)\)/)[1])

            var myID = photoalbum.userId; //albumOwner; // //"7463430";
            var albumOwner = +photoalbum.albumOwner

            var isOwnAlbum = ( albumOwner == myID )

            if ( isOwnAlbum  )   {

             // 'New' button
                     $('<span>').text(" | ")
               .appendTo( menubar );

                     $('<a target="album_mainpage">')
                     .text("New")
                     .attr("href",'new.php?set=' + myID)

                     .attr("title","GR.jQ: Creates a new Galerie.")
                 .appendTo( menubar );

               } else {

            // 'Add pictures from' button
               $('div.hx')
               .each(
                   function(seq, Galerie_Folder_div) {

                       var FolderID =
                           Galerie_Folder_div.id.substr(2);

                       var FolderInfoDiv =
                           Galerie_Folder_div.nextElementSibling.nextElementSibling;

                       var hasAlreadyAddPics = !!$(FolderInfoDiv).children('a[target]')[0]

                       if (!hasAlreadyAddPics) {
                          $('<a target="album_mainpage">')
                              .text('Add pictures')
                              .attr('href'  , 'add_pics.php?set=' + myID + '&id=' + FolderID)
                              .attr('target', 'album_mainpage')
                              .attr('title' , "GR.jQ: Adds your pictures here.  Remember: When you're done, press the browser's 'BACK'-button to get here again!")
                          .appendTo(FolderInfoDiv);
                       }

                   })

               } // if !isOwnAlbum


        } // if configdata
     } catch (e) {
     }

//    _____                    _                    _____               _          _
//   |  __ \                  (_)                  / ____|             | |        (_)
//   | |__) |_ __  ___ __   __ _   ___ __      __ | |      ___   _ __  | |_  __ _  _  _ __    ___  _ __
//   |  ___/| '__|/ _ \\ \ / /| | / _ \\ \ /\ / / | |     / _ \ | '_ \ | __|/ _` || || '_ \  / _ \| '__|
//   | |    | |  |  __/ \ V / | ||  __/ \ V  V /  | |____| (_) || | | || |_| (_| || || | | ||  __/| |
//   |_|    |_|   \___|  \_/  |_| \___|  \_/\_/    \_____|\___/ |_| |_| \__|\__,_||_||_| |_| \___||_|
//
//

//
//   - - - - - - - - - -  D I V - - - - - - - - - - - - - - - -
//
    // Container for showing the big image in upper ->right corner
    big_img_div =
        $('<div id="bigimg_div">')

    .css({
        'top': '2px',
        'right': '3px',

        'position': 'fixed',
        'max-width': '80%',
        'max-height': '80%',
        'border': 'solid 1px #FFF',
        'border-radius': '3px',
        'box-shadow':'0px 0px 8px #fff',
        'cursor': 'crosshair',
        'z-index': '10'

    })
    .attr('title',"Click to restore original size.")
    .hide()

    .mousemove( function() {
        delayedImgHide_Cancel();
    })

    /* beside for the thumbsPic we'll need 'hide' for the bigPic as well  */
    .mouseout(
        delayedImgHide
    )

    .appendTo($('body'));


    // for PROFILES  use upper <-LEFT corner

    //      <body.setcard> ->   Profil
    //      <body leftmargin="0"> -> Escort
    $(' body.setcard #bigimg_div, \
        body[leftmargin|="0"][class!="dunkel"] #bigimg_div')

    .css({
        'right': 'auto',
        'left': '0',
        'text-align': 'left',
        'z-index': '100'
    });


//
//   - - - - - - - - - -  D I V - - - - - - - - - - - - - - - -
//   - - - - - - - - - - - -  I M G : BigPic - - - - - - - - - - - - - -
//

    // Add <img> element to <div>
    var disableShrink = false;
    big_img =
        $('<img id="bigimg">')

    .css({
        'max-width': '100%',
        'max-height': '100%',
        'border-radius': '3px 3px 0px 0px',

    })

    .appendTo($('#bigimg_div'))

    /* Shrink img when mouse is over (until it is to 30%)
              (an img is too big/in the way when you're mouse is over it)        */
    .mousemove(function() {

           var max_width = big_img_div.css('width').match(/\d+/);
           if ( (max_width > 300 ) &&
               (disableShrink == false) ) {
               big_img_div
               .animate(
                {
                   'width': '-=50px',
                }, { duration: 100, queue: false
                }, "swing" )
               ;
           }


       })

    .click(function() {
        big_img_div.width('');

        big_img_div
        .animate(
            {
                'max-width': '100%',
                'max-height': '100%',
            }, {duration: 2000, queue: false
               },"swing")

        disableShrink = true;
        })

    /* ...sync div.width with <img>.width */
    .load( function () {

debugger
        // delete width prop so max-width can take effect
        big_img_div.width('');


        var max_height;
        big_img_div
        .css({
            'max-height': '95%',
            'max-width': '90%',
        })
        .css({
             'max-width': 
                Math.floor ( 100 * 
                    big_img.width() / innerWidth
                ) + '%',
            })

        var max_heightOld = big_img_div.innerHeight()
        
        // Shrink width until height starts to change -> to ensure that text is not chopped
        for (var loopcount = 1; loopcount <=100   ;loopcount++) {
        
            max_height = big_img_div.innerHeight()
           
            if ( max_heightOld != max_height ) break;
            
            max_heightOld = max_height;
            
            big_img_div
            .animate({
                'max-width': '-=1%',
            }, {duration: 0, queue: false})

        }


/*

        big_img_div.width(
            big_img.width() );
            
        if (max_height) {

            big_img_div
            .css({
                'max-height': (5 + max_heightOld) + '%',
            });
        }
        */

    }) // .load from big_img



//
//   - - - - - - - - - -  D I V - - - - - - - - - - - - - - - -
//   - - - - - - - - - - - -  I M G : BigPic - - - - - - - - - - - - - -
//   - - - - - - - - - - - -  D I V : Comment - - - - - - - - - - - - - -
//

    // add Image Comment-Label
    big_img_CommentLabel =
        $('<div>')
    .css({

        'background-color': '##181F4E',
        'color': '#FFF',
        'text-align': 'center',
        'padding':'4px 4px',
        'background' : 'rgba(0, 13, 139, 0.92)',
        'box-shadow' : '#1B1B96 0px -2px 5px 0px',
        'position' : 'relative',
        'border-radius': '0px 0px 3px 3px',


    })
    .hover( function Init_ShowEditComment () {
/*
            // init Timer to show EditComment
            timeoutID_ShowEditComment = setTimeout(
                    ShowEditComment ,
                    config.ShowEditComment_DELAY );
*/
        }
     ,  function  () {
           // stop Timer show EditComment

            clearTimeout( timeoutID_ShowEditComment );


    } )
    .click(
        ShowEditComment
    )

    .appendTo($('#bigimg_div'));

    if (config.ShowEditComment)

        big_img_CommentLabel
            .attr('title',">Click< to EDIT comment.")


    function ShowEditComment () {

        if (config.ShowEditComment) {

         // adept height
            big_img_InputText.height(
                big_img_CommentLabel.height() );

         // Show EditComment
            big_img_InputText.show();
            big_img_CommentLabel.hide();

         // Remove this Line in case you unComment the
         //     big_img_CommentLabel
         //         .hover( function Init_ShowEditComment
         // part
            big_img_InputText.focus();
        }

    }

//
//   - - - - - - - - - -  D I V - - - - - - - - - - - - - - - -
//   - - - - - - - - - - - -  I M G : BigPic - - - - - - - - - - - - - -
//   - - - - - - - - - - - -  D I V : Comment - - - - - - - - - - - - - -
//   - - - - - - - - - - - -  T E X T A R E A : Comment  - - - - - - - -
//
    // Image Comment-Input_textarea
    big_img_InputText =
        $('<textarea>')
    .css({

        'background-color': '##181F4E',
        'color': '#FFF',
        'text-align': 'center',
        'padding':'4px 4px',
        'background' : 'rgba(0, 13, 139, 0.92)',
        'box-shadow' : '#00E0FF 0px 0px 24px 3px',
        'width': '97%',
        'border': 'none',
        'font-size': 'inherit',
        'font-family': 'inherit',
        'height': 'inherit',
        'min-height': '4em',



    })
    .focus( function () {
        big_img_InputButton
            .text( 'Send Comment' )
            .one("click", SubmitComment )
            .show()
        ;
        disableShrink = true;
        block_delayedImgHide = true;
    })
    //       .change( function () {
    //           big_img_InputButton
    //              .show()
    //           ;
    //       })
    .blur( function () {
        disableShrink = false;
        block_delayedImgHide = false;
    })
    ;


//
//   - - - - - - - - - -  D I V - - - - - - - - - - - - - - - -
//   - - - - - - - - - - - -  I M G : BigPic - - - - - - - - - - - - - -
//   - - - - - - - - - - - -  D I V : Comment - - - - - - - - - - - - - -
//   - - - - - - - - - - - -  T E X T A R E A : Comment  - - - - - - - -
//   - - - - - - - - - - - -  B U T T O N : Comment  - - - - - - - -
//

 // Image Comment- Submit Button
    big_img_InputButton =
        $('<button>')
 /*
    .text('Save')
    .css({
        'font-size': 'inherit',
        'font-family': 'inherit',
    })
*/

    $('#bigimg_div')
    .append( big_img_InputText )
    .append( big_img_InputButton )




    function SubmitComment() {

        var img_id = big_img.data('img_id');
        var Comment = big_img_InputText.val();

        $.ajax({
            type: "POST",
            url: "/mitglieder/administration/pictures/overview.php",
            data: {
                action: "comment",
                id: img_id,
                comment: Comment,

                }
            })

        .done(function( msg ) {

            //alert( "Data Saved: " + msg );
            //cb_ImgHide();
            big_img_InputButton
                .text( 'Done.')
                .one("click", cb_ImgHide );

            // Actualize cached data
            var imgThumb = big_img.data('img')
                imgThumb.data('imgText', Comment )
            ;

        });

    }


    //     ____          _        _      _____         _  _              _        _       _         _
    //    / __ \        (_)      | |    / ____|       | || |            (_)      | |     (_)       | |
    //   | |  | | _   _  _   ___ | | __| |  __   __ _ | || |  ___  _ __  _   ___ | |      _  _ __  | | __
    //   | |  | || | | || | / __|| |/ /| | |_ | / _` || || | / _ \| '__|| | / _ \| |     | || '_ \ | |/ /
    //   | |__| || |_| || || (__ |   < | |__| || (_| || || ||  __/| |   | ||  __/| |____ | || | | ||   <
    //    \___\_\ \__,_||_| \___||_|\_\ \_____| \__,_||_||_| \___||_|   |_| \___||______||_||_| |_||_|\_\
    //
    //
    // Change OpenProfil Link to OpenGallerie
    // ../auswertung/setcard/index.php?set=484196  - gets - >
    // ../auswertung/album/index.php?set=484196
    //
    function QuickGallerieLink(Link) {
        if (config.QuickGallerieLink) {

            Link
            .attr('href', function(i, a_href) {
                      return a_href.replace (
                          "/setcard/",
                          "/album/")
                }
            )  /* For linked profiles you'll need also set(or delete) da 'onClick' handler
                  So I use
                    .attr('onClick'...
                  insead of
                    .Click(...
                 */
            .attr('onClick', function(i, onClick_body) {
                      return
                        onClick_body ?
                          onClick_body.replace (
                              "openProfile",
                              "openAlbum")
                        : onClick_body
                }
            )
        }
    }



    //    _______  _                        _            ______
    //   |__   __|| |                      | |          |  ____|
    //      | |   | |__   _   _  _ __ ___  | |__   ___  | |__    _ __   _   _  _ __ ___
    //      | |   | '_ \ | | | || '_ ` _ \ | '_ \ / __| |  __|  | '_ \ | | | || '_ ` _ \
    //      | |   | | | || |_| || | | | | || |_) |\__ \ | |____ | | | || |_| || | | | | |
    //      |_|   |_| |_| \__,_||_| |_| |_||_.__/ |___/ |______||_| |_| \__,_||_| |_| |_|
    //
    //
    // for each thumb: load popup page containing the href to full-sized image, attach mouseover/mouseout


    function CommentInputHide () {
        big_img_InputButton.hide();

        big_img_InputText
        .blur ()
        .hide ();

        big_img_CommentLabel
        .show ();

        // show <img>
        big_img_div
        .show();
    }

    //    GetImageID =           06e9a446d25a62d2181c0ca89e.jpg
    //                           ^^^^^^^^
    function GetImageID( img_FileName) {
        // Hex <-> Dec Converting functions
        //  function d2h(d) { return d.toString(16);}
        function h2d(h) { return parseInt(h,16);}

        return ( h2d( img_FileName.substr(0,8) ) );
    }

    function ShowImageID(img, img_id) {
        var
        img_id_Txt = img_id.toString() ,
            SecondaryChars = 5 ,
            Splitpoint = img_id_Txt.length - SecondaryChars ,

            img_id_Txt1 = img_id_Txt.substring(0, Splitpoint) ,
            img_id_Txt2 = img_id_Txt.substring(Splitpoint);

        if (config.ShowID) {

            //                    '---text-align': 'right',

            $(img).parent()
            .wrap('<div>')
            .after(
                $('<p>').css({
                    'text-align': 'right',
                    'position': 'relative',
                    'text-indent':'5px',
                    'bottom': '18px',
                    'margin': '0px',
                    'height': '0px',
                } )
                .append($('<b>').css(
                    {'color': 'white',
                     'opacity':'1'
                    }).text(img_id_Txt1))

                .append($('<sub>').text(img_id_Txt2))
            ) /* to display http://www.planetromeo.com/market/view.php?id=2903883
                 Pictures in a line (and not at row)
                Uncomment the following if there are problems
                    Known Problems: GallerieThumbs gets fucked up

                */


            .parent().css({

                    'float': 'left',
                })/*
            .parent().parent().parent().next().css({

                    'clear': 'left'
                })*/


        }

        // Set imgID as Title/Tooltip
        $(img).attr('title', "ID: " + img_id_Txt1 + ' ' + img_id_Txt2);
    }

    function ThumbDataToPreview(img) {
        // Set Image
        big_img              [0].src =
            $(img).data('imgUrl');

        // Set Pic-ID
        big_img.data('img_id',
                     $(img).data('img_id') );

        // Set Comment (to CommentLabel & Text field)
        var imgText =
            $(img).data('imgText');

        big_img_InputText
            .val (imgText)

        big_img_CommentLabel
            .text (imgText)
            .mylinker()



        CommentInputHide ();

        // Current Thumb
        big_img.data('img',
                     $(img) );

        //   }) //.delay.show

    }


    function ImgThumbMouseOver(img, CacheOnly) {

     // Disable during Edit Comments
        if (block_delayedImgHide) {

            // Flash InputText to show the user that it still has the focus
            big_img_InputText
            .finish()
            .animate({ zoom: "-=10%"},150)
            .animate({ zoom: "+=10%"},150)

            return
        }

        if (!CacheOnly)
        delayedImgHide_Cancel();

        var CommentNImageDataSet = !! $(img).data('imgUrl')
        if (CommentNImageDataSet)

            ThumbDataToPreview(img)

        else {

             //LogDebug ('// @match        *://*.planetromeo.com' + location.pathname + '*');

            //
            //  img_url =  /auswertung/pix/popup.php/06e9a446d25a62d2181c0ca89e.jpg

            // Make an "(A)synchronous (J)avaScript (A)nd (X)ML" Request
            // ... and run function in .done() when done
            //                    jqXHR.done( function(data, textStatus, jqXHR) {} );
            $.ajax({
                url: '/auswertung/pix/popup.php/' + $(img).data('img_url')
            })

            .done(function(popup_html) {

                // Store Comment text & ImageURL in Thumb
                $(img)
                .data('imgText',
                      $(popup_html)
                      .find('td[style]').text()
                     )

                .data('imgUrl',
                      $(popup_html)
                      .find('img')[0].src
                     );

                if (!CacheOnly)
                ThumbDataToPreview(img);

            }); //Done
        }
    }



    /* // old code for select
    // .thumb -> Normal
    // .thImg -> Pic in Messages
    // (.pic -> Clubpage_guide_main)
    // .profileImage -> home new nearby Romeos
    // [style*="border:0px"] -> Escorts    <img src="http://s.planetromeo.com/img/usr/077691fc49881efec024d485fb.jpg" style="border:0px solid #ffcc00;" title="ID: 1252 11132">

        $('img.thumb ,\
           img.thImg,  \
           img.profileImage, \
           img[style*="border:0px"] \
          ')
    */
    function AddZoom() {


     // Get all Images whose url look like this: <img src="http://s.planetromeo.com/img/usr/077691fc49881efec024d485fb.jpg"
        var Thumbs = $('img' +
                     '[src*="/img/usr/"]' +
                     ':not(.userPic)'
         )
         .not('.GRjQ_Zoom_applied')
         .not('#bigimg')    // but exclude our preview img that will have the url-pattern for images


    // Zoom hack
        var picCol =
           $('.searchResults >> colgroup:last > col')[0]  ||
           $('.user-table > colgroup:last > col')[1]

        picCol = $(picCol)
                        .not('.GRjQ_Zoom_applied')

        var Zoom_already_applied = !picCol[0]

        if (!Zoom_already_applied) {

            // enlarge table columbs
            picCol
                .width( config.ThumbZoomHack )
                .addClass('GRjQ_Zoom_applied')

            Thumbs
               .width ( config.ThumbZoomHack )
               .height( config.ThumbZoomHack )


             }

            Thumbs
            .addClass('GRjQ_Zoom_applied')
            .each( function(seq, img) {
                try {


                QuickGallerieLink(
                    $(img).parent()
                )


                // Get jpg name via RegExp ( match any char before '.jpg' that is no '/')
                //    https://s.planetromeo.com/img/usr/06e9a446d25a62d2181c0ca89e.jpg
                //    img_src =                         06e9a446d25a62d2181c0ca89e.jpg

                var img_src = img.src.match(/[^\/]+\.jpg/);
                if (!img_src) { return;}


                // store img_ url in thumb
                $(img).data('img_url', img_src[0]);


            var
                img_id = GetImageID (img_src[0]);
            // $(img).parent().after(img_id).css('text-align', 'right');


                ShowImageID(img, img_id);


             // store imgID in thumb - it'll be used later for the add comment function
                $(img).data('img_id', img_id);


             // Add OnMouseOver OnMouseOverOut to all thumb <img>//
                $(img)
                .hover( function() {
                    ImgThumbMouseOver(img)
                }
                ,
                    delayedImgHide
                ); //    Hover out

                 if (config.PreCacheAllImages)
                     ImgThumbMouseOver(img, true)



              } catch (e) {
              }


            });
    } // AddZoom

    AddZoom()
  // (re)add Zoom when
  //    * Document was loaded
  //    * Double click somewhere (manually trigger)
  //    * GR-Optimizer reloads the page

     $(document)
    .on('dblclick \
         GRT_RETRIGGER',
        AddZoom );


    var delayedExecID = 0;

    function delayedExec(fn_body) {

        delayedExec_Cancel();
        delayedExecID = setTimeout(
            fn_body,
            config.ImgHide_DELAY );
    }


    function delayedExec_Cancel() {

        clearTimeout( delayedExecID ) ;

    }

    function ProfileCloseDelayed() {

        delayedExec (
          window.close
        );
    }

    // EXTRA #1: nouse on profileHead closes profile window
    $('.profilePic')
    .attr("title","Hold mouse here to close!")
    .hover( ProfileCloseDelayed ,
            delayedExec_Cancel )

    
    
    // PMP_SimpleStealthEnable
    if (config.SimpleStealthMode) {    
        $('.stealth').html ( 
            $('<a>')
            .text( $('.stealth').text() )
            .attr("href",'#') //'/auswertung/setcard/stealth.php?owner=' + G.owner)
            
            .attr("title","GR.jQ: SimpleStealth+  Click this to hide your visit.")
            .click( stealthMode_DoHide )
     
         )
      
        
        function stealthMode_DoHide() {
    
                    $.ajax({
                        url: '/auswertung/setcard/stealth.php',
                        dataType: "json",
                        data: "owner=" + G.owner,
                        timeout: 4000
                    }).done(function() {
                      $('.stealth').hide()
                    });
        }
    }
    
    
    
    // AutoClose an empty galerie
    function CloseEmptyAlbum() {
        if (config.AutoCloseEmptyGalerie) {

           var isLoginViaClub = !!$('#menubar a[target]')[0] //  <- Checks for <a href= "new.php?set=123456" target= "album_mainpage"> Neue Galerie anlegen</a>
           //   ^- important in case you've an empty club galerie
            if ( !$('.ftThumb')[0]  &&
                 !isLoginViaClub )
            {
                $(AlbumClose).click();
            }
        }

    }

    // Close Galleria when the mouse touches 'Close Galerie'
    var AlbumClose =  $('#menubar h1+a')
   $(AlbumClose)
    .attr("title","Hold mouse here to close!")

    .hover(function() {
        $(this)
        .delay(200).show(0, function() {
            parent.window.close();
        })
        }
     , function() { $(this).stop(true, false)  }

          )
    .ready(CloseEmptyAlbum)


});

//======================================================================

//         _   ____                              _____              _          _  _
//        | | / __ \                            |_   _|            | |        | || |
//        | || |  | | _   _   ___  _ __  _   _    | |   _ __   ___ | |_  __ _ | || |
//    _   | || |  | || | | | / _ \| '__|| | | |   | |  | '_ \ / __|| __|/ _` || || |
//   | |__| || |__| || |_| ||  __/| |   | |_| |  _| |_ | | | |\__ \| |_| (_| || || |
//    \____/  \___\_\ \__,_| \___||_|    \__, | |_____||_| |_||___/ \__|\__,_||_||_|
//                                        __/ |
//                                       |___/
// from  http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script


function addJQuery(callback) {
    // create a new <_script> element and insert it into the document.body
    // 'callback'  will be the body of the script

    var fn_scriptInject =
        function() {
            var script;
            script = document.createElement("script");
            script.textContent = "(" + callback.toString() + ")();";
           document.body.appendChild(script);

//          $('<script>').text("(" + callback.toString() + ")();").appendTo('<body>')

        };
    if (typeof $ !== 'undefined') {
        // jQuery is loaded

        // Unload jQuery
        jQuery.noConflict();

        // $(fn_scriptInject);
        // $(callback);

    } //else {

        // jQuery is not loaded
        // optional TODO: check jQuery Version
        var script;
        script = document.createElement("script");
        script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js");

//      script.addEventListener('load', fn_scriptInject, false);
        script.addEventListener('load', callback, false);

        document.body.appendChild(script);
    //}

}
 //======================================================================