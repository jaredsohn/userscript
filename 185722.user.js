// ==UserScript==
// @name           Unique Youtube Skin
// @description    Perfect watch page. Dinamicly adjust player size acc your window size to get biggest video.
// @author         haluk ilhan
// @homepage       http://userscripts.org/scripts/show/120134
// @icon           http://i.imgur.com/VSfpO.jpg
// @updateURL      https://userscripts.org/scripts/source/120134.meta.js
// @downloadURL    https://userscripts.org/scripts/source/120134.user.js
// @version        0.5beta3
// @include        http://*youtube.com*
// @include        https://*youtube.com*
// @require       https://unique-youtube-skin.googlecode.com/files/a.js
// @require       http://code.jquery.com/jquery-1.8.3.js
// @require       https://raw.github.com/joesimmons/jsl/master/versions/jsl-1.2.1.js 
// @require       http://usocheckup.dune.net/49366.js 
// @require       https://unique-youtube-skin.googlecode.com/files/gmc.js
// @grant         GM_info 
// @grant         GM_getValue 
// @grant         GM_log 
// @grant         GM_openInTab 
// @grant         GM_registerMenuCommand 
// @grant         GM_setValue 
// @grant         GM_xmlhttpRequest 
// ==/UserScript==

GM_config.init('Unique Youtube Skin Settings',{
  hider:   { label: 'Auto Hide Sidebar', title:'Scale videos full window size and hide sidebar until mouse scroll or arrow keys pressed', type: 'checkbox', default: false },
  cooler:  { label: 'Cool Black Theme', title:'Make background dark in very cool way', type: 'checkbox', default: true },
 reverser: { label: 'Reverse Layout', title:'Move sidebar right', type: 'checkbox', default: false },
  relogo:  { label: 'Youtube Logo to Subscriptions', title:'Redirect youtube logo to subscription uploads', type: 'checkbox', default: true },
  sbhider: { label: 'No Scrollbars', title:'Hide scrollbar (only for chrome)', type: 'checkbox', default: true },
 expande2: { label: 'Collapse Description', title:'Collapse description and expand auto on mouseover', type: 'checkbox', default: true },
 collapse: { label: 'Collapse Comments', title:'Collapse comments and expand auto on mouseover', type: 'checkbox', default: true },
 collaps2: { label: 'Collapse Related Videos', title:'Collapse related videos and expand on mouseover', type: 'checkbox', default: true },
  vrhider: { label: 'Hide Video Responses', type: 'checkbox', default: true },
 expander: { label: 'Show Full Description', type: 'checkbox', default: false },
  cshider: { label: 'Hide Comments', type: 'checkbox', default: false },
  rvhider: { label: 'Hide Related Videos', type: 'checkbox', default: false },
  lbhider: { label: 'Hide Like Bar and View Count', type: 'checkbox', default: false },
  ybhider: { label: 'Hide Logo and Search Bar', type: 'checkbox', default: false },
  ybfixer: { label: 'Search Bar Always on Top', title:'Make youtube logo and search bar allways visible', type: 'checkbox', default: false },
  nomouse: { label: 'Disable Hiding Sidebar via Mouse', title:'No hiding sidebar and resizing video when mouse reach right or left edge of window', type: 'checkbox', default: false },
    autoplayplaylists : {
        label : 'Autoplay on Playlists',
        type : 'checkbox',
        'default' : true,
        title : 'Autoplay on playlists, regardless of the "AutoPlay" option',
    },
    hideAds : {
        label : 'Hide Ads',
        type : 'checkbox',
        'default' : true,
    },
    hideAnnotations : {
        label : 'Disable Annotations',
        type : 'checkbox',
        'default' : true,
        title : 'This will make the annotations be off by default',
    },
    autohide : { label: 'Auto Hide Player Controls', type: 'checkbox', default: true },
    disableDash : {
        label : 'Buffer Entire Video (No Dash Playback)',
        type : 'checkbox',
        'default' : true,
        title : 'Loads the entire video like old youtube playback style'
    },
    activationMode : { 
            section : ['Main Options'], 
            label : 'AutoPlay', 
            type : 'select', 
            options : { 
                'auto' : 'AutoPause on Background',
                'buffer' : 'AutoPause Always', 
                'play' : 'AutoPlay', 
                'none' : 'AutoStop'
            }, 
            'default' : 'auto'
        }, 
    autoHD : {
        label : 'AutoHD',
        type : 'select',
        options : {
            'tiny' : '144p', 
            'small' : '240p',
            'medium' : '360p',
            'large' : '480p',
            'hd720' : '720p',
            'hd1080' : '1080p',
            'hd1440' : '1440p',
            'highres' : 'HighRes'
        },
        'default' : 'hd720'
    },
   volume : {
        label : 'Volume: ',
        type : 'select',
        options : {
            1000 : 'Default',
            0 : 'Off',
            50 : '50%',
            100 : '100%',
        },
        title : 'What to set the volume to',
        'default' : 1000
    },
    theme : { 
            section : ['Other Options'], 
            label : 'Player Color Scheme', 
            type : 'select', 
            options : { 
                'dark' : 'Dark Theme', 
                'light' : 'Light Theme'
            }, 
            'default' : 'light'
        }, 
}, " \
.indent40 { margin-left: auto !important; text-align: center !important; } \
.config_header { font-size: 16pt !important; } \
.section_header { margin:5px 0 5px 0 !important; } \
div.section_header_holder { margin-top: 0 !important; } \
h2.section_header { text-align: left !important; } \
.config_var { padding-left:20px; } \
.config_var .field_label { margin-left: 10px !important; } \
.config_var input[type='checkbox'] { position: absolute !important; left: 15px !important; margin: 1px 4px 0 0 !important; } \
#field_customCSS{ display: block; font: 12px monospace; margin-left: 25px; } ", {
    

               save: function () {
        location.reload();
    }
});





//Youtube Auto Buffer 6.12.2013

// run the script in an IIFE function, to hide its variables from the global scope
(function (undefined) {

    'use strict';

    var aBlank = ['', '', ''],
        URL = location.href,
        sec = 0,
        navID = 'watch7-user-header',
        rYoutubeUrl = /^https?:\/\/([^\.]+\.)?youtube\.com\//,
        rList = /[?&]list=/i,
        rPlaySymbol = /^\u25B6\s*/,
        script_name = 'YouTube - Auto-Buffer & Auto-HD',
        tTime = (URL.match(/[&#?]t=([sm0-9]+)/) || aBlank)[1],
        ads = [
            'supported_without_ads',
            'ad3_module',
            'adsense_video_doc_id',
            'allowed_ads',
            'baseUrl',
            'cafe_experiment_id',
            'afv_inslate_ad_tag',
            'advideo',
            'ad_device',
            'ad_channel_code_instream',
            'ad_channel_code_overlay',
            'ad_eurl',
            'ad_flags',
            'ad_host',
            'ad_host_tier',
            'ad_logging_flag',
            'ad_preroll',
            'ad_slots',
            'ad_tag',
            'ad_video_pub_id',
            'aftv',
            'afv',
            'afv_ad_tag',
            'afv_instream_max',
            'afv_ad_tag_restricted_to_instream',
            'afv_video_min_cpm',
            'prefetch_ad_live_stream'
        ],
        nav, wait_intv, uw;

/*
    // this function will get added to the page in a <script> tag
    function onYouTubePlayerReady() {
        var player = document.getElementById('movie_player');

        // adjust to the 'play symbol in title' feature
        document.title = document.title.replace(/^\u25B6\s+/, '');

        window.g_YouTubePlayerIsReady = true;

        // Add the event listeners so functions get executed when the player state/format changes
        player.addEventListener('onStateChange',             'stateChange');
        player.addEventListener('onPlaybackQualityChange',   'onPlayerFormatChanged');

        // Play the video if autobuffer enabled, otherwise just set volume
        if (activationMode === 'buffer') {
            player.playVideo();
        } else if (volume != 1000) {
            player.setVolume(volume);
        }
    }

    // this function will get added to the page in a <script> tag
    function stateChange(state) {
        var player = document.getElementById('movie_player');

        if (state === 1 && alreadyBuffered === false && activationMode === 'buffer' && !playIfPlaylist) {
            // Pause the video so it can buffer
            player.pauseVideo();

            // Set the volume to the user's preference
            if (volume != 1000) player.setVolume(volume);

            // Seek back to the beginning, or pre-defined starting time (url #t=xx)
            if (player.getCurrentTime() <= 3) player.seekTo(0);

            window.setTimeout(function () {
                // adjust to the 'play symbol in title' feature
                document.title = document.title.replace(/^\u25B6\s+/, '');
            }, 500);

            // Make sure it doesn't auto-buffer again when you press play
            alreadyBuffered = true;
        }
    }
*/
    function toNum(a) {
        return parseInt(a, 10);
    }

   

    // will return true if the value is a primitive value
    function isPrimitiveType(value) {
        switch (typeof value) {
            case 'string': case 'number': case 'boolean': case 'undefined': {
                return true;
            }
            case 'object': {
                return !value;
            }
        }

        return false;
    }

    function setPref(str, values) {
        var i, value, rQuery;

        for (i = 0; value = values[i]; i += 1) {
            // (several lines for readability)
            rQuery = new RegExp('[?&]?' + value[0] + '=[^&]*');
            str = str.replace(rQuery, '') + '&' + value[0] + '=' + value[1];
            str = str.replace(/^&+|&+$/g, '');
        }

        return str;
    }

    // unwraps the element so we can use its methods freely
    function unwrap(elem) {
        if (elem) {
            if ( typeof XPCNativeWrapper === 'function' && typeof XPCNativeWrapper.unwrap === 'function' && elem === XPCNativeWrapper(elem) ) {
                return XPCNativeWrapper.unwrap(elem);
            } else if (elem.wrappedJSObject) {
                return elem.wrappedJSObject;
            }
        }

        return elem;
    }

    // grabs the un-wrapped player
    function getPlayer() {
        var doc = uw.document;
        return doc.getElementById('c4-player') || doc.getElementById('movie_player');
    }

    // this is the main function. it does all the autobuffering, quality/volume changing, annotation hiding, etc
    function main(player) {
        var userOpts = {
            activationMode    : GM_config.get('activationMode'),
            disableDash       : GM_config.get('disableDash') === true,
            hideAnnotations   : GM_config.get('hideAnnotations') === true,
            hideAds           : GM_config.get('hideAds') === true,
            autohide          : GM_config.get('autohide') === true,
            quality           : GM_config.get('autoHD'),
            theme             : GM_config.get('theme'),
            volume            : GM_config.get('volume')
        },
        player = getPlayer(),
        playerClone = player.cloneNode(true),
        fv = playerClone.getAttribute('flashvars'),
        isHTML5 = JSL('video.html5-main-video').exists,
        playIfPlaylist = URL.match(rList) != null && GM_config.get('autoplayplaylists') === true,
        alreadyBuffered = false,
        time = 0,
        args, arg, val, buffer_intv;

        if (uw.ytplayer && uw.ytplayer.config && uw.ytplayer.config.args) {
            args = uw.ytplayer.config.args;
        }

        if (isHTML5) {
            if (player.getPlaybackQuality() !== userOpts.quality) {
                player.setPlaybackQuality(userOpts.quality);
            }

            if (userOpts.volume != 1000) {
                player.setVolume(userOpts.volume);
            }

            if (!playIfPlaylist) {
                if (userOpts.activationMode === 'buffer') {
                    player.pauseVideo();
                } else if (userOpts.activationMode === 'none') {
                    player.stopVideo();
                 }  else if (userOpts.activationMode === 'auto') {
                    if (document.hasFocus () ) {player.playVideo();}
 else if( history.length < 2) {
                // Pause the video so it can buffer
                player.pauseVideo();
 }
if (!document.hasFocus ()) { $(window).one("focus", function() { var player = getPlayer(); player.playVideo(); } );  }
                      }
               
            }
        } else {
            // copy 'ytplayer.config.args' into the flash vars
            if (args) {
                for (arg in args) {
                    val = args[arg];
                    if ( args.hasOwnProperty(arg) && isPrimitiveType(val) ) {
                        fv = setPref(fv, [ [ arg, encodeURIComponent(val) ] ]);
                    }
                }
            }

            // ad removal
            if (userOpts.hideAds) {
                fv = setPref(fv, 
                    ads.map(function (ad) {
                        return [ad, ''];
                    })
                );
            }

            // disable DASH playback
            if (userOpts.disableDash) {
                fv = setPref(fv, [
                    ['dashmpd', ''],
                    ['dash', '0']
                ]);
            }

            // edit the flashvars
            fv = setPref(fv, [
                ['vq', userOpts.quality],                                                        // set the quality
                ['autoplay', userOpts.activationMode !== 'none' || playIfPlaylist ? '1' : '0' ], // enable/disable autoplay
                ['iv_load_policy', userOpts.hideAnnotations ? '3' : '1' ],                       // enable/disable annotations                
                ['autohide', userOpts.autohide ? '1' : '2' ],                       // enable/disable annotations
                ['theme', userOpts.theme],                                                       // use light/dark theme

                // some "just-in-case" settings
                ['enablejsapi', '1'],                                                            // enable JS API
                ['fs', '1'],                                                                     // enable fullscreen button, just in-case
                ['modestbranding', '1'],                                                         // hide YouTube logo in player
                ['disablekb', '0']                                                               // enable keyboard controls in player
            ]);

            // handle &t= in the url
            timeInUrlHandling: {
                if ( tTime.match(/\d+m/) ) {
                    time += toNum( tTime.match(/(\d+)m/)[1] ) * 60;
                }
                if ( tTime.match(/\d+s/) ) {
                    time += toNum( tTime.match(/(\d+)s/)[1] );
                }
                if ( tTime.match(/^\d+$/) ) {
                    time += toNum(tTime);
                }

                fv = setPref( fv, [ ['start', time] ] );
            }

            // set the new player's flashvars
            playerClone.setAttribute('flashvars', fv);

            // set the volume to the user's preference
            if (userOpts.volume != 1000) {
                player.setVolume(userOpts.volume);
            }

            JSL(player).replace(playerClone);
            player = getPlayer();
            
            // adjust to the 'play symbol in title' feature
            window.setTimeout(function () {
                document.title = document.title.replace(rPlaySymbol, '');
            }, 1000);

            // and add some other necessary vars and functions to the page for auto-buffering
            if (userOpts.activationMode === 'buffer') {
                /*
                JSL.addScript('var alreadyBuffered = false, ' +
                                  'playIfPlaylist = ' + playIfPlaylist + ', ' +
                                  'volume = ' + userOpts.volume + ', ' +
                                  'activationMode = "'+ userOpts.activationMode + '";\n\n' +
                               onYouTubePlayerReady + '\n\n' + stateChange,
                'stateChange');
                */
                buffer_intv = JSL.setInterval(function () {
                    if (player.getPlayerState && player.getPlayerState() === 1 && playIfPlaylist === false) {
                        JSL.clearInterval(buffer_intv);
                // Pause the video so it can buffer
                player.pauseVideo();
                         // pause the video so it can buffer
//                        player.pauseVideo();

                        // seek back to the beginning, or pre-defined starting time (url #t=xx)
                        if (player.getCurrentTime() <= 3) {
                            player.seekTo(0);
                        }

                        // adjust to the 'play symbol in title' feature
                        window.setTimeout(function () {
                            document.title = document.title.replace(rPlaySymbol, '');
                        }, 500);
                    }
                }, 100);
            }
            
            
           else if (userOpts.activationMode === 'auto') {
                /*
                JSL.addScript('var alreadyBuffered = false, ' +
                                  'playIfPlaylist = ' + playIfPlaylist + ', ' +
                                  'volume = ' + userOpts.volume + ', ' +
                                  'activationMode = "'+ userOpts.activationMode + '";\n\n' +
                               onYouTubePlayerReady + '\n\n' + stateChange,
                'stateChange');
                */
                buffer_intv = JSL.setInterval(function () {
                    if (player.getPlayerState && player.getPlayerState() === 1 && playIfPlaylist === false) {
                        JSL.clearInterval(buffer_intv);
if (document.hasFocus () ) {player.playVideo();}
 else if( history.length < 2) {
                // Pause the video so it can buffer
                player.pauseVideo();
 }
if (!document.hasFocus ()) { $(window).one("focus", function() { var player = document.getElementById('movie_player'); player.playVideo(); } );  }
                        // pause the video so it can buffer
//                        player.pauseVideo();

                        // seek back to the beginning, or pre-defined starting time (url #t=xx)
                        if (player.getCurrentTime() <= 3) {
                            player.seekTo(0);
                        }

                        // adjust to the 'play symbol in title' feature
                        window.setTimeout(function () {
                            document.title = document.title.replace(rPlaySymbol, '');
                        }, 500);
                    }
                }, 100);
            }
        }

    }


    // this function sets up the script
    function init() {
        // temporary fix to disable SPF aka the "red bar" feature
        if (uw._spf_state && uw._spf_state.config) {
            uw._spf_state.config['navigate-limit'] = 0;
            uw._spf_state.config['navigate-processed-callback'] = function (targetUrl) {
                location.href = targetUrl;
            };
        }

        // Exit if it's a page it shouldn't run on
        if ( URL.match(/^https?:\/\/([^\.]+\.)?youtube\.com\/(feed\/|account|inbox|my_|tags|view_all|analytics|dashboard|results)/i) ) { return; }

        // fix #t= problem in url
        if (URL.indexOf('#t=') !== -1) {
            location.href = URL.replace('#t=', '&t=');
        }

        uw.onYouTubePlayerReady = function (player) {
            if (typeof player === 'object') {
                window.setTimeout(function () {
                    main();
                    addButton();
                }, 0); // defer
            }
        };

        // wait for the player to be ready
        //sec = 0;
        //wait_intv = JSL.setInterval(waitForReady, 200);
    }

    // this function waits for the movie player to be ready before starting
    function waitForReady() {
        var player, args;

        // if 10 seconds has elapsed, stop looking
        if (sec < 50) {
            sec += 1;
        } else {
            return JSL.clearInterval(wait_intv);
        }

        player = getPlayer();

        // wait for player to be loaded (check if element is not null and player api exists
        // if so, run main function and add the options button
        if (player && player.getPlayerState) {
            // make sure we don't continue with the interval
            sec = 50;
            JSL.clearInterval(wait_intv);

            if (uw.ytplayer && uw.ytplayer.config && uw.ytplayer.config.args) {
                args = uw.ytplayer.config.args;

                // remove ads
                if (GM_config.get('hideAds') === true) {
                    JSL.each(ads, function (key) { // remove each ad key from ytplayer.config.args
                        if (typeof args[key] !== 'undefined') {
                            delete args[key];
                        }
                    });
                }

                args.vq = GM_config.get('autoHD'); // set quality in ytplayer.config.args
                args.iv_load_policy = GM_config.get('hideAnnotations') === true ? '3' : '1'; // set annotations
                args.autohide = GM_config.get('autohide') === true ? '2' : '1'; // set annotations

                if (GM_config.get('disableDash') === true) {
                    args.dash = '0';
                    delete args.dashmpd;
                }

                uw.ytplayer.config.args = args;
            }

            // run the main function
            main(player);

            // add the options button
            addButton();
        }
    }

    // Make sure the page is not in a frame
    if (window !== window.top) { return; }

    // Make 100% sure this script is running on YouTube
    if ( !URL.match(rYoutubeUrl) ) { return; }

    // get the raw window object of the YouTube page
    uw = typeof unsafeWindow !== 'undefined' ? unsafeWindow : unwrap(window);


    


    JSL.runAt('interactive', function () {
        window.setTimeout(function () {
            // call the function that sets up everything
            init();
        }, 0); // let the UI update before continuing
    });

}());




// No Share Tab
unsafeWindow.yt.setConfig({'SHARE_ON_VIDEO_END': false}); 






//Youtube Cool Black

if (GM_config.get("cooler")) {
       
(function() {
var css4 = "";
if (false || (document.domain == "youtube.com" || document.domain.substring(document.domain.indexOf(".youtube.com") + 1) == "youtube.com"))
	css4 += "html body{\nbackground-color: rgb(10,10,10)!important;\nbackground-image: url(http://i44.tinypic.com/9fsn50.jpg)!important;\ncolor: #aaa!important;\n}\n\n#yt-masthead #logo {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -131px -219px !important;\n}\n\n#yt-masthead-container {\nbackground: #1b1b1b !important;\nborder-bottom: 1px solid #292929 !important;\n}\n\n#masthead-search-terms {\nbackground-color: #333 !important;\ncolor:#aaa !important;\n}\n\n.masthead-search-terms-border {\nborder: 1px solid #303030 !important;\n-moz-box-shadow: inset 0 0px 0px #eee !important;\n-ms-box-shadow: inset 0 0px 0px #eee !important;\n-webkit-box-shadow: inset 0 0px 0px #000 !important;\nbox-shadow: inset 0 0px 0px #000 !important;\n}\n\n#yt-masthead-user {\ncursor: pointer !important;\n}\n\n#yt-masthead-user #sb-button-notify {\nbackground-color: #1b1b1b !important;\n}\n\n#yt-masthead-user .yt-uix-button-icon-bell {\nbackground: no-repeat url(http://i.imgur.com/veEzSqG.png) 0 -34px !important;\n}\n\nbody #masthead-expanded-container {\nbackground: #222 !important;\nborder-bottom-color: #303030 !important;\n}\n\n#masthead-expanded .masthead-expanded-menu-header {\ncolor: #aaa !important;\n}\n\n#channel-search .show-search img, #channel-search .yt-uix-button-icon-search {\nbackground: no-repeat url(http://i.imgur.com/VirN1wE.png) -170px -201px !important;\n}\n\n.hitchhiker-enabled #masthead-search .search-btn-component .yt-uix-button-content {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -173px -62px !important;\n}\n\n.hitchhiker-enabled .feed-author-bubble {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -149px -357px !important;\n}\n  \n.hitchhiker-enabled .feed-author-bubble.rec {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -34px -62px !important;\n}\n\n.feed-header {\nborder-bottom-color: #303030 !important;\n}\n\n.feed-item-container .feed-item-main {\nborder-bottom-color: #303030 !important;\n}\n\n.feed-item-container .feed-item-main, .yt-lockup {\ncolor: #aaa !important;\n}\n\n.feed-item-channel-rec-text a {\ncolor: #bbb !important;\n}\n\n.feed-item-content-wrapper.playlist-promo, .feed-item-content-wrapper.channel-lockup {\nborder-color: #303030 !important;\n-moz-box-shadow: 0 0px 0px #ddd !important;\n-ms-box-shadow: 0 0px 0px #ddd !important;\n-webkit-box-shadow: 0 0px 0px #ddd !important;\nbox-shadow: 0 0px 0px #ddd !important;\n}\n\n.feed-item-grouplet-muted .channels-content-item .content-item-detail a.content-item-title, .feed-item-grouplet-muted .channels-content-item .content-item-detail a.content-item-title:visited, .feed-item-grouplet-muted .channels-content-item .content-item-detail a.content-item-title:hover {\ncolor: #2793e6 !important;\n}\n    \n.yt-lockup-playlist-item {\nborder-bottom-color: #303030 !important;\n}\n  \n.yt-uix-button-default, .yt-uix-button-default[disabled], .yt-uix-button-default[disabled]:hover, .yt-uix-button-default[disabled]:active, .yt-uix-button-default[disabled]:focus {\nborder-color: #303030!important;\nbackground: #242323!important;\ncolor: #aaa!important;\n}\n\n.qualified-channel-title.ellipsized .qualified-channel-title-text {\ncolor: #aaa !important;\n}\n\n.branded-page-related-channels, .branded-page-related-channels h2, .branded-page-related-channels h2 a {\ncolor: #777 !important;\n}\n\n.branded-page-v2-primary-col {\nborder-right-color: #303030 !important;\nborder-bottom-color: #303030 !important;\nborder-left-color: #303030 !important;\nbackground-color: #1b1b1b !important;\n}\n\n.branded-page-v2-primary-col .branded-page-box {\nborder-bottom-color: #303030 !important;\n}\n\n.branded-page-v2-has-solid-bg .branded-page-v2-col-container {\nborder-right-color: #303030 !important;\nborder-bottom-color: #303030 !important;\nborder-left-color: #303030 !important;\nbackground-color: #1b1b1b !important;\n}\n\n\n.branded-page-v2-secondary-col .branded-page-related-channels-see-more a {\ncolor: #777 !important;\n}\n\n.branded-page-v2-secondary-col .branded-page-related-channels-see-more a:hover {\ncolor: #2793e6 !important;\n}\n\n.branded-page-v2-has-solid-bg .branded-page-v2-secondary-col {\nborder-left-color: #303030 !important;\n}\n\n.branded-page-v2-masthead-ad-header.masthead-ad-expanded .branded-page-v2-primary-col {\nborder-top-width: 0px !important;\n}\n\n.branded-page-v2-subnav-container {\nborder-bottom-color: #303030 !important;\n}\n\n#c4-header-bg-container {\nborder-bottom-color: #303030 !important;\n}\n    \n#channel-subheader {\nborder-bottom-color: #303030 !important;\n}\n\n.welcome.c4-spotlight-module-component {\nborder-bottom-color: #303030 !important;\n}\n\n.c4-welcome-primary-col {\nborder-right-color: #303030 !important;\n}\n\n.c4-welcome-secondary-col {\nborder-left-color: #303030 !important;\n}\n  \n.c4-box {\nborder-bottom-color: #303030 !important;\n}\n\n.c4-live-promo {\nborder-bottom-color: #303030 !important;\n}\n\n#c4-shelves-container {\nbackground-color: transparent !important;\n}\n  \n#c4-about-tab, #c4-about-tab .about-stats .about-stat {\ncolor: #aaa !important;\n}\n\n.about-network-stat, .about-subscriptions, .other-channels-module, .package-module {\nborder-top-color: #303030 !important;\n}\n\n.yt-uix-button-icon-report-user {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -81px -62px !important;\n}\n\n.compact-shelf .yt-uix-button-shelf-slider-pager {\nbackground: #1b1b1b !important;\n}\n\n.compact-shelf-view-all-card {\nborder-color: #303030 !important;\nborder-width: 0px !important;\n}\n\n.compact-shelf-view-all-card-link {\nborder: 1px solid #303030;\npadding: 38px 46px;\nwidth: 99px;\n}\n\n.branded-page-module-title, .branded-page-module-title a:visited, .branded-page-module-title a {\ncolor: #aaa !important;\n}\n\n.yt-lockup .yt-lockup-meta a, .yt-lockup .yt-lockup-description a {\ncolor: #999 !important;\n}\n\n#channel-search .show-search img, #channel-search .yt-uix-button-icon-search {\nbackground: no-repeat url(http://i.imgur.com/VirN1wE.png) -170px -201px !important;\n}\n\n#player {\nbackground: transparent !important;\n}\n\n.player-unavailable {\nfloat: inherit !important;\n}\n\n.ytp-button:focus {\noutline: 0px !important;\n}\n\n.watch-branded-banner .player-branded-banner {\nheight: 0px !important;\n}\n\n#watch7-content {\nbackground: #1b1b1b !important;\nmargin-top: 5px !important;\n}\n\n#watch7-headline, #watch7-notification-area, #watch7-user-header {\nborder-width: 0px !important;\nbackground: transparent !important;\n}\n\n#watch7-headline h1 a {\ncolor: #aaa !important;\n}\n\n#watch7-action-buttons {\nborder-left-width: 0px !important;\nborder-right-width: 0px !important;\nborder-bottom: 1px solid #292929 !important;\n}\n\n#watch7-secondary-actions .yt-uix-button {\ncolor: #aaa !important;\n}\n\n#watch7-action-panels {\nborder-left-width: 0px !important;\nborder-right-width: 0px !important;\n}\n\n#watch-description-toggle .yt-uix-button-text {\nmargin-top: 7px !important;\nmargin-bottom: 10px !important;\ncolor: #aaa !important;\nbackground: #2b2b2b !important;\n}\n\n.yt-uix-button {\n-moz-border-radius: 2px !important;\n-webkit-border-radius: 2px !important;\nborder-radius: 2px !important;\n-moz-box-shadow: 0 0px 0 rgba(0,0,0,0.05) !important;\n-ms-box-shadow: 0 0px 0 rgba(0,0,0,0.05) !important;\n-webkit-box-shadow: 0 0px 0 rgba(0,0,0,0.05) !important;\nbox-shadow: 0 0px 0 rgba(0,0,0,0.05) !important;\n}\n\n.yt-uix-button-default:hover, .yt-uix-button-text:hover {\nborder-color: #444343 !important;\nbackground: #1f1f1f !important;\n}\n      \n#watch7-secondary-actions .yt-uix-button:hover, #watch7-secondary-actions .yt-uix-button:active, #watch7-secondary-actions .yt-uix-button.yt-uix-button-active, #watch7-secondary-actions .yt-uix-button.yt-uix-button-toggled {\nborder-bottom-color: #930 !important;\nbackground: transparent !important;\nborder-top-color: transparent !important;\n}\n\n.yt-uix-button-default:active, .yt-uix-button-default.yt-uix-button-toggled, .yt-uix-button-default.yt-uix-button-active, .yt-uix-button-default.yt-uix-button-active:focus, .yt-uix-button-text:active {\n-moz-box-shadow: inset 0 0px 0 #ddd !important;\n-ms-box-shadow: inset 0 0px 0 #ddd !important;\n-webkit-box-shadow: inset 0 0px 0 #ddd !important;\nbox-shadow: inset 0 0px 0 #ddd !important;\n}\n\n#watch7-action-panels #watch7-action-panel-footer {\nbackground: #151515!important;\n}\n\n#watch7-action-panel-footer .yt-horizontal-rule {\nheight: 3px !important;\nborder-top-width: 0px !important;\n}\n\n.watch-playlists-drawer ul {\nborder-color: #303030 !important;\nbackground: #222222 !important;\n-moz-box-shadow: 0 0px 0 !important;\n-ms-box-shadow: 0 0px 0 !important;\n-webkit-box-shadow: 0 0px 0 !important;\nbox-shadow: 0 0px 0 !important;\n}\n    \n#action-panel-addto .playlist-item.selected a, #action-panel-addto a {\ncolor: #aaa !important;\n}\n\n.metadata-inline {\nbackground: #313131 !important;\n}\n\n.branded-page-v2-body #channel-feed-post-form {\nborder-bottom-color: #303030 !important;\n}\n\n#watch-discussion {\npadding: 10px 14px !important;\nborder-width: 0px !important;\n}\n\n#watch-description.yt-uix-expander-collapsed #watch-description-content, #watch-description-clip {\ncolor: #aaa !important;\n}\n\n#watch-response {\nbackground: #1b1b1b !important;\n}\n\n#watch-response-content {\nborder-top-color: #303030 !important;\n}\n\n#watch-response-content-sort {\nborder-bottom-color: #303030;\n}\n\n#watch-response-header-content p a, .watch-response-item-content p a {\ncolor: inherit !important;\n}\n\n#watch-discussion {\ncolor: #777 !important; \n}\n\n.context clearfix em {\ncolor: #830 !important;\n}\n\nli.comment.removed .content.clearfix, li.comment.flagged .content.clearfix {\nmargin-left: 0px !important;\n}\n\n#watch-description-extras .title {\ncolor: #555 !important;\n}\n\n.live-comments-setting {\nborder-color: #303030 !important;\n}\n\n.subscribe-label {\ncolor: #fff !important;\n}\n\n.yt-subscription-button-subscriber-count-branded-horizontal, .yt-subscription-button-subscriber-count-branded-vertical, .yt-subscription-button-subscriber-count-unbranded-horizontal, .yt-subscription-button-subscriber-count-unbranded-vertical {\ncolor: #aaa !important;\nborder-color: #303030 !important;\n}\n\n.yt-subscription-button-subscriber-count-branded-horizontal, .yt-subscription-button-subscriber-count-unbranded-horizontal {\nbackground-color: #2b2b2b !important;\n}\n\n.yt-subscription-button-subscriber-count-unbranded-vertical.yt-uix-tooltip, .yt-subscription-button-subscriber-count-branded-vertical, .yt-subscription-button-subscriber-count-unbranded-vertical {\nbackground: #1b1b1b !important;\nborder-color: #303030 !important;\n}\n\n.yt-uix-button-subscribed-branded, .yt-uix-button-subscribed-branded[disabled], .yt-uix-button-subscribed-branded[disabled]:hover, .yt-uix-button-subscribed-branded[disabled]:active, .yt-uix-button-subscribed-branded[disabled]:focus, .yt-uix-button-subscribed-unbranded, .yt-uix-button-subscribed-unbranded[disabled], .yt-uix-button-subscribed-unbranded[disabled]:hover, .yt-uix-button-subscribed-unbranded[disabled]:active, .yt-uix-button-subscribed-unbranded[disabled]:focus {\nbackground: transparent !important;\nborder-width: 0px !important;\n}\n\n.yt-uix-button-subscribe-unbranded, .yt-uix-button-subscribe-unbranded[disabled], .yt-uix-button-subscribe-unbranded[disabled]:hover, .yt-uix-button-subscribe-unbranded[disabled]:active, .yt-uix-button-subscribe-unbranded[disabled]:focus {\nborder-color: #303030 !important;\nbackground: #222 !important;\n}\n\n.yt-uix-form-input-textarea.comments-textarea.link-gplus-lightbox {\nbackground: #2b2b2b !important;\nborder-width: 0px !important;\ncolor: #aaa !important;\n}\n\n.caption-line {\nborder-color: #303030 !important;\n-moz-border-radius: 0px !important;\n-webkit-border-radius: 0px !important;\nborder-radius: 0px !important;\n}\n\n#watch-transcript-track-selector {\nbackground: #1b1b1b !important;\ncolor: #aaa !important;\n}\n\n#watch7-action-panels #watch7-action-panel-footer {\nheight: 5px!important;\n}\n\n#comments-view hr {\nborder-top: 5px solid #151515 !important;\nmargin: 0 -14px !important;\n}\n\n/* Guide */\n\n.guide-section-separator {\nborder-bottom-color: #555 !important;\n}\n\n.guide-context-item a:hover, .guide-context-item.context-playing a {\nbackground-color: #333 !important;\n}\n\n#guide-container .guide-item.guide-item-selected {\ncolor: #fff !important;\n}\n\n.guide-context-item .title {\ncolor: #999 !important;\n}\n\n.guide-item {\ncolor: #bbb !important;\n}\n\n	/* Main Guide */\n\n	/* Watch Page */\n\n.site-left-aligned #page.watch #guide-container {\npadding: 5px 0 5px 5px !important;\n/*left: 10px !important; */\n}\n\n.guide-module {\nmargin-bottom: 0px !important;\n}\n\n#watch-context-container {\nmargin-top: 8px !important;\n}\n\n#guide-main .guide-module-toggle-label h3 {\nline-height: 28px !important;\n}\n\n#guide-main .guide-module-toggle-icon {\nmargin-top: 0px !important;\n}\n\n#guide-main .guide-module-toggle:hover .guide-module-toggle-icon img {\nbackground: no-repeat url(http://i.imgur.com/ApSlYCn.png) -15px -674px !important;\n}\n#guide-main .guide-module-toggle-icon img {\nbackground: no-repeat url(http://i.imgur.com/ApSlYCn.png) -32px -90px !important;\n}\n\n		/* Context Dropdown */\n\n.yt-scrollbar ::-webkit-scrollbar-thumb {\nborder-left-width: 0px !important;\nbackground: #ccc !important;\n-webkit-box-shadow: inset 0 0 0px transparent ;\n}\n\n.yt-scrollbar ::-webkit-scrollbar-track {\nborder-left-width: 0px !important;\n-webkit-box-shadow: inset 0 0 0px transparent;\n}\n\n.guide-module-content.yt-scrollbar {\nheight: auto !important;\n}\n\n#watch-context-container ul {\nmax-height: 506px !important;\n}\n\n	/* New comments section */\n\n\n\n  \n/* Newspaper Shelf */\n\n.lohp-large-shelf-container {\nborder-right-color: #303030 !important;\n}\n\n.lohp-large-shelf-container .lohp-blog-headline {\nborder-top-color: #777 !important;\n}\n  \n.lohp-newspaper-shelf {\nborder-bottom-color: #303030 !important;\n}\n\n.lohp-shelf-cell-container:hover {\nbackground-color: #222 !important;\n}\n.lohp-shelf-cell-container {\nborder-color: #303030 !important;\n}\n\n.lohp-blog-headline {\ncolor: #777 !important;\n}\n\n/* Browse Channels */\n\n.guide-builder-page-header {\nborder-bottom-color: #303030 !important;\n}\n\n.channels-search .search-button .yt-uix-button-content {\nbackground: no-repeat url(http://i.imgur.com/VirN1wE.png) -170px -201px !important;\n}\n        \n.category-header .category-title {\ncolor: #999 !important;\n}\n            \n.yt-gb-shelf-hero-content .title {\ncolor: #777 !important;\n}\n            \n.yt-gb-shelf-main-content {\nborder-color: #303030 !important;\n-moz-box-shadow: 0 1px 2px #303030 !important;\n-ms-box-shadow: 0 1px 2px #303030 !important;\n-webkit-box-shadow: 0 1px 2px #303030 !important;\nbox-shadow: 0 1px 2px #303030 !important;\n}\n              \n.yt-gb-shelf-paddle {\nbackground-color: #222 !important;\nborder-color: #303030 !important;\n}\n                \n.yt-gb-shelf .yt-gb-shelf-paddle:hover {\n-moz-box-shadow: 0 0 10px 1px rgba(50,50,50,.7) !important;\n-ms-box-shadow: 0 0 10px 1px rgba(50,50,50,.7) !important;\n-webkit-box-shadow: 0 0 10px 1px rgba(50,50,50,.7) !important;\nbox-shadow: 0 0 10px 1px rgba(50,50,50,.7) !important;\n}\n\n/* Subscription Manager */\n\n.collection-promo .yt {\ncolor: #aaa !important;\n}\n\n.collection-promo {\nborder-bottom-color: #303030 !important;\n}\n\n.create-collection-button.yt-uix-button.yt-uix-button-primary.yt-uix-button-size-default .yt-uix-button-content {\ncolor: #fff !important;\n}\n\n.subscriptions-filter .filter-button .yt-uix-button-content {\nbackground: no-repeat url(http://i.imgur.com/VirN1wE.png) -170px -201px !important;\n}\n\n.subscriptions-filter .filter-button {\n-moz-border-radius-topleft: 0 !important;\n-webkit-border-top-left-radius: 0 !important;\nborder-top-left-radius: 0 !important;\n-moz-border-radius-bottomleft: 0 !important;\n-webkit-border-bottom-left-radius: 0 !important;\nborder-bottom-left-radius: 0 !important;\n}\n\n#subscription-manager-container .subscription-manager-header {\nborder-bottom-color: #303030 !important;\n}\n\n.subscriptions-filter .filter-field-container {\nborder-color: #303030 !important;\nbackground: #000 !important;\n}\n\n#subscription-manager-container .even td {\nbackground: #222 !important;\nborder-color: #303030 !important;\n}\n\n#subscription-manager-container .subscription-title, #subscription-manager-container .collection-title {\ncolor: #aaa !important;\n}\n\n.subscription-item:first-child {\nborder-top: 1px solid #303030 !important;\n}\n\n.subscription-picker-header {\nborder-bottom-color: #303030 !important;\n}\n\n/* Channel Editing */\n\n.channel-header .secondary-header-contents {\nbackground-color: #333 !important;\nborder-bottom-color: #303030 !important;\n}\n\n.secondary-header-contents .nav-text {\ncolor: #fff !important;\n}\n    \n#channel-header-view-as-link img {\nbackground: no-repeat url(http://i.imgur.com/TLZeIKB.png) 0 -93px !important;\n}\n\n#channel-header-vm-link img {\nbackground: no-repeat url(http://i.imgur.com/v8MBqQk.png) -64px -23px !important;\n}\n\n#channel-header-analytics-link img {\nbackground: no-repeat url(http://i.imgur.com/v8MBqQk.png) 0 -339px !important;\n}\n    \n.c4-module-is-editable .c4-module-editor-actions {\nbackground-color: #222 !important;\n}\n    \n.yt-uix-button-c4-view-action {\nborder-bottom-color: #303030 !important;\nborder-left-color: #303030 !important;\nbackground-color: #222 !important;\n-moz-border-radius: 0 !important;\n-webkit-border-radius: 0 !important;\nborder-radius: 0 !important;\ncolor: #aaa !important;\n}\n\n.yt-uix-button-icon-c4-editor-move-up {\nbackground: no-repeat url(http://i.imgur.com/TLZeIKB.png) -6px -160px !important;\n}\n      \n.yt-uix-button-icon-c4-editor-move-down {\nbackground: no-repeat url(http://i.imgur.com/TLZeIKB.pngp) -6px -149px !important;\n}\n\n.c4-module-editor-form {\nbackground-color: #222 !important;\n}\n      \n.c4-shelf-preview {\nborder-color: #303030 !important;\nbackground: #222 !important;\n}\n\n.c4-shelf-preview-container-content {\npadding-left: 11px !important;\npadding-right: 11px !important;\n}\n  \n.c4-shelf-preview+.preview-click-guard {\nbackground: #000 !important;\n}\n\n#c4-about-tab .c4-module-is-editable:hover {\nbackground-color: #222 !important;\n}\n\n#c4-about-tab .about-metadata .yt-uix-button-c4-view-action {\nborder-top-color: #303030 !important;\n}\n  \n.yt-uix-form-legend, .yt-uix-form-label {\ncolor: #999 !important;\n}\n\n.watch-pencil-icon .yt-uix-button-icon-pencil {\nbackground: no-repeat url(http://i.imgur.com/P8b3ZSs.png) 0 -140px !important;\n}\n    \n    /* Trailer Popup */\n\n.yt-dialog-fg-content, .yt-uix-overlay-fg-content {\ncolor: #aaa !important;\n}\n\n.yt-video-picker-scroll-container {\nborder-color: #303030 !important;\n}\n      \n.yt-video-picker-grid .video-picker-item:hover {\nbackground-color: #222 !important;\n}\n      \n.yt-uix-overlay-actions {\nborder-top-color: #303030 !important;\nbackground: transparent !important;\n}\n\n.watch-editable:hover {\nbackground-color: #222 !important;\n}\n\n#welcome-edit-overlay {\ncolor: #ccc !important;\n}\n\n/* Creator Sidebar */\n\n#creator-sidebar .creator-sidebar-channel-link {\nmargin-left: 4px !important;\n}\n\n#creator-sidebar .creator-sidebar-channel-link a, #creator-sidebar .creator-sidebar-channel-link a:hover {\ncolor: #aaa !important;\nfont-size: 12px !important;\n}\n\n#creator-sidebar .creator-sidebar-section a {\ncolor: #aaa !important;\n}\n\n#creator-sidebar .creator-sidebar-section.selected>a.selected, #creator-sidebar .creator-sidebar-item.selected>a {\ncolor: #fff !important;\n}\n\n#creator-sidebar .creator-sidebar-section.selected {\nborder-top-color: #303030 !important;\nborder-bottom-color: #303030 !important;\n}\n\n/* Creator Video Bar */\n\n#watch7-creator-bar {\nborder-color: #303030 !important;\nbackground: #222 !important;\n}\n\n.yt-uix-button-panel:hover .creator-bar-item .yt-uix-button-text-dark, .yt-uix-button-panel .creator-bar-item .yt-uix-button-text-dark:hover {\nborder-color: #303030 !important;\nbackground: #2a2a2a !important;\n}\n\n/* Inbox */\n\n#folder_title {\nbackground: #1b1b1b !important;\nborder-bottom-color: #303030 !important;\ncolor: #ddd !important;\n}\n\n\n#masthead-subnav.yt-nav.yt-nav-dark.legacy-masthead {\nwidth: 958px !important;\nbackground: #242424 !important;\nborder-bottom: 1px solid #303030 !important;\nborder-left: 1px solid #303030 !important;\nborder-right: 1px solid #303030 !important;\nleft: -5px !important;\n}\n\n.hh #yt-admin-content {\nbackground: #1b1b1b !important;\nborder-right-color: #303030 !important;\nborder-left-color: #303030 !important;\nborder-bottom: 1px solid #303030 !important;\n}\n\n.buttonbar {\ncolor: #aaa !important;\nborder-top-color: #303030 !important;\nbackground: #1b1b1b !important;\n}\n\n.sorterbar th {\nborder-bottom-color: #303030 !important;\nborder-top-color: #303030 !important;\ncolor: #bbb !important;\nbackground: #1b1b1b !important;\n}\n\n.m_nohighlight {\nbackground-color: #1b1b1b !important;\n}\n\n.m_highlight {\nbackground-color: #1f1f1f !important;\n}\n\n.message.closed td {\nvertical-align: middle !important;\n}\n\n.message-display a {\ncolor: #aaa !important;\n}\n\n.message h3, .message .yt-admin-h3 {\ncolor: #aaa !important;\n}\n\n.msg-date.pointer {\ncolor: #aaa !important;\n}\n\n.message.open td {\ncolor: #aaa !important;\nbackground-color: #2a2a2a !important;\nborder: 1px solid #303030 !important;\nborder-left: none !important;\nborder-right: none !important;\n}\n\n/* Dashboard */\n\n.hh #dashboard-header {\nbackground-color: #1b1b1b !important;\nborder-bottom-color: #303030 !important;\n}\n\n.hh #dashboard-header h1 {\ncolor: #aaa !important;\n}\n\n#dashboard-header h1 {\ntext-shadow: 0 0px 0 #000 !important;\nfont-size:24px !important;\n}\n\n.hh #dashboard-header .dashboard-stat-value {\ncolor: #aaa !important;\n}\n\n#dashboard-header h2 {\ntext-shadow: 0 0px 0 #000 !important;\n}\n\n#dashboard-header .dashboard-stat-value, #dashboard-header .dashboard-stat-name {\ntext-shadow: 0 0px 0 #000 !important;\n}\n  \n.hh #dashboard-header-stats li {\nborder-left-color: #303030 !important;\n}\n\n.dashboard-widget.notification, .dashboard-widget .dashboard-widget-content, .dashboard-widget .dashboard-widget-config {\nbackground-color: #1b1b1b !important;\ncolor: #aaa !important;\nborder-color: #303030 !important;\n}\n\n.dashboard-widget-header:hover, .dashboard-widget .dashboard-widget-config .dashboard-widget-header, .dashboard-widget.yt-uix-dragdrop-dragged-item .dashboard-widget-header, .dashboard-widget.yt-uix-dragdrop-cursor-follower .dashboard-widget-header {\nbackground-color: #1b1b1b !important;\nborder-bottom-color: #303030 !important;\n}\n\n.dashboard-widget:hover .dashboard-widget-display-title, .dashboard-widget.yt-uix-dragdrop-dragged-item .dashboard-widget-display-title, .dashboard-widget.yt-uix-dragdrop-cursor-follower .dashboard-widget-display-title {\nborder-right-width: 0px !important;\n}\n\n.dashboard-widget-header:hover .dashboard-widget-header-controls, .dashboard-widget.yt-uix-dragdrop-dragged-item .dashboard-widget-header .dashboard-widget-header-controls, .dashboard-widget.yt-uix-dragdrop-cursor-follower .dashboard-widget-header .dashboard-widget-header-controls {\nborder-color: #303030 !important;\n}\n\n	/* Notifications */\n\n.yt-creator-notifications .yt-creator-tip-list .inactive {\nbackground: #1b1b1b !important;\ncolor: #aaa !important;\n}\n\n.yt-creator-notifications .yt-creator-tip-list tr {\ncolor: #aaa !important;\n}\n\n.creator-confirmation-overlay .creator-confirmation-overlay-header {\nborder-bottom-color: #303030 !important;\nbackground: #222 !important;\n}\n\n.creator-confirmation-overlay .creator-confirmation-overlay-body {\ncolor: #bbb !important;\n}\n\n	/* Widgets */\n\n.dashboard-widget-todos .todo-item {\nborder-color: #303030 !important;\n}\n\n.dashboard-widget-todos .todo-item:hover {\nbackground-color: #222 !important;\n}\n\n.dashboard-widget-todos .todo-description {\nborder-bottom-width: 0px !important;\n}\n\n.dashboard-widget-todos .todo-item:first-child {\nborder-bottom-width: 0px !important;\n}\n    \n.dashboard-widget-todos .todo-item:last-child {\nborder-bottom: 1px solid #303030 !important;\n}\n\n.dashboard-widget-analytics .section+.section {\nborder-top-color: #303030 !important;\n}\n\n.dashboard-widget-analytics .section-sparkline {\nbackground: #fff !important;\npadding-top: 3px !important;\npadding-bottom: 3px !important;\nborder: 2px solid #666 !important;\n}\n\n.dashboard-widget-videos .video-list-item .video-title a {\ncolor: #2793e6 !important;\n}\n\n/* Video Manager */\n\n#vm-page-subheader h3 {\ncolor: #aaa !important;\n}\n\n#vm-video-actions-bar, #vm-video-actions-inner {\nbackground: #1b1b1b !important;\n}\n\n#vm-video-actions-inner {\nborder-bottom-color: #303030 !important;\n}\n\n.vm-search-btn .yt-uix-button-content {\nbackground: no-repeat url(http://i.imgur.com/VirN1wE.png) -170px -201px !important;\n}\n\n.yt-uix-button-icon-vm-beauty-view {\nbackground: no-repeat url(http://i.imgur.com/zBZBCS5.png) -315px -197px !important;\n}\n\n.yt-uix-button-icon-vm-list-view {\nbackground: no-repeat url(http://i.imgur.com/zBZBCS5.png) -16px -244px !important;\n}\n\n#vm-view-btn {\ncolor: #aaa !important;\n}\n\n.vm-confirmation-overlay .vm-confirmation-overlay-header {\nborder-bottom-color: #303030 !important;\nbackground-image: -moz-linear-gradient(top,#333 0,#222 100%) !important;\nbackground-image: -ms-linear-gradient(top,#333 0,#222 100%) !important;\nbackground-image: -o-linear-gradient(top,#333 0,#222 100%) !important;\nbackground-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,#333),color-stop(100%,#222)) !important;\nbackground-image: -webkit-linear-gradient(top,#333 0,#222 100%) !important;\nbackground-image: linear-gradient(to bottom,#333 0,#222 100%) !important;\n}\n\n.vm-confirmation-overlay .vm-confirmation-overlay-main-area {\ncolor: #aaa !important;\n}\n\n.vm-confirmation-overlay .vm-video-actions-delete-warning strong {\ncolor: #C33 !important;\n}\n\n#vm-bulk-actions-editing-header {\nbackground-color: #1b1b1b !important;\nborder-top-color: #303030 !important;\ncolor: #888 !important;\n}\n\n#vm-bulk-actions-editing-header, #vm-bulk-actions-editing-buttons {\nborder-bottom-color: #303030 !important;\n}\n\n#vm-bulk-actions-selection-link {\ncolor: #ccc !important;\n}\n\n.ad-options-overlay-form .ad-formats-heading {\ncolor: #aaa !important;\n}\n\n.ad-formats-overlay .form-area, .preview-area .ad-format-preview {\ncolor: #888 !important;\n}\n\n	/* List View */\n\n#non-appbar-vm-video-actions-bar, .vm-video-actions-bar {\nbackground-color: transparent !important;\n}\n\n#non-appbar-vm-video-actions-bar .vm-video-actions-inner {\nborder-bottom-color: #303030 !important;\n}\n\n.vm-list-view .vm-video-list li {\nbackground: #1b1b1b !important;\n}\n\n.vm-list-view .vm-video-item-content {\nborder-bottom-color: #303030 !important;\n}\n\n.vm-list-view .vm-video-metrics {\nbackground: #1b1b1b !important;\nborder-left-color: #303030 !important;\n}\n\n.vm-list-view .vm-video-title .vm-video-title-content {\ncolor: #aaa !important;\n}\n\n.vm-list-view .vm-video-metrics a:hover {\nbackground: #222 !important;\n}\n\n#vm-bulk-actions-selection {\nbackground-color: #222 !important;\n}\n\n#vm-bulk-actions-progress-bar, #vm-bulk-actions-selection {\nborder-bottom-color: #303030 !important;\n}\n\n	/* Beauty View */\n\n.vm-beauty-view .vm-video-item-content {\nbackground: #2b2b2b !important;\n-moz-box-shadow: 0 0px 0px #e0e0e0 !important;\n-ms-box-shadow: 0 0px 0px #e0e0e0 !important;\n-webkit-box-shadow: 0 0px 0px #e0e0e0 !important;\nbox-shadow: 0 0px 0px #e0e0e0 !important;\n}\n\n.vm-beauty-view .vm-video-item:hover .vm-video-item-content {\n-moz-box-shadow: 0 0px 0px #aaa !important;\n-ms-box-shadow: 0 0px 0px #aaa !important;\n-webkit-box-shadow: 0 0px 0px #aaa !important;\nbox-shadow: 0 0px 0px #aaa !important;\nborder-bottom: 3px solid #cc181e !important;\n}\n  \n.vm-beauty-view .vm-video-title-content {\ncolor: #aaa !important;\n}\n        \n.yt-thumb {\nbackground: transparent !important;\n}\n          \n#vm-pagination {\nbackground: #1b1b1b !important;\n}\n\n/* Video Editor */\n\n#creator-editor-container, .hh.editor-content {\nbackground: #1b1b1b !important;\nborder-color: #303030 !important;\n}\n\n.metadata-editor-container .video-settings-form {\nbackground: #1b1b1b !important;\n}\n\n.creator-editor-nav {\nborder-bottom-color: #303030 !important;\n}\n  \n.creator-editor-header, .creator-editor-content #inline-editor-header {\nborder-bottom-color: #303030 !important;\n}\n    \n.metadata-editor-container .subnav {\nborder-bottom-color: #303030 !important;\n}\n\n.creator-editor-nav-tabs li span, .creator-editor-nav-tabs li a {\ncolor: #aaa !important;\n}\n    \n.creator-editor-icon-edit, .creator-bar-item .yt-uix-button-icon-info {\nbackground: no-repeat url(http://i.imgur.com/TugICAm.png) 0 -110px !important;\n}    \n\n.creator-editor-icon-enhance, .creator-bar-item .yt-uix-button-icon-enhance {\nbackground: no-repeat url(http://i.imgur.com/TugICAm.png) 0 -22px !important;\n}\n    \n.creator-editor-icon-audio, .creator-bar-item .yt-uix-button-icon-audio {\nbackground: no-repeat url(http://i.imgur.com/TugICAm.png) 0 -44px !important;\n}  \n  \n.creator-editor-icon-annotate, .creator-bar-item .yt-uix-button-icon-annotations {\nbackground: no-repeat url(http://i.imgur.com/TugICAm.png) 0 -66px !important;\n}\n  \n.creator-editor-icon-captions, .creator-bar-item .yt-uix-button-icon-captions {\nbackground: no-repeat url(http://i.imgur.com/TugICAm.png) 0 0 !important;\n}\n\n.creator-editor-title a {\ncolor: #bbb !important;\n}\n\n#player-and-info-pane #video-info dt {\ncolor: #aaa !important;\n}\n\n#player-and-info-pane #video-info dd {\ncolor: #999 !important;\n}\n\n.tabs .tab-header.selected a, .tabs .tab-header a:hover, .tabs .tab-header a:focus {\ncolor: #bbb !important;\n}\n\n.video-likes-count img {\nbackground: no-repeat url(http://i.imgur.com/zBZBCS5.png) -381px -256px !important;\n}\n\n.video-dislikes-count img {\nbackground: no-repeat url(http://i.imgur.com/zBZBCS5.png) -315px -221px !important;\n}\n\n.video-settings-add-tag {\nbackground: #222 !important;\ncolor: #aaa !important;\nborder: 1px solid #303030 !important;\ndisplay: block !important;\nwidth: 528px !important;\n}\n\n.video-settings-add-tag:focus {\nborder: 1px solid #404040 !important;\n}\n\n.yt-chip, .tag {\nbackground: #111 !important;\ncolor: #777 !important;\nborder-color: #303030 !important;\n-moz-box-shadow: 0 0px 0 white !important;\n-ms-box-shadow: 0 0px 0 white !important;\n-webkit-box-shadow: 0 0px 0 white !important;\nbox-shadow: 0 0px 0 white !important;\n}\n    \n.yt-uix-form-input-select {\ntext-shadow: 0 1px 0 rgba(100,100,100,.5) !important;\nbackground-color: #2b2b2b !important;\nbackground-image: -moz-linear-gradient(top,#222 0,#2c2c2c 100%) !important;\nbackground-image: -ms-linear-gradient(top,#222 0,#2c2c2c 100%) !important;\nbackground-image: -o-linear-gradient(top,#222 0,#2c2c2c 100%) !important;\nbackground-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,#222),color-stop(100%,#2c2c2c)) !important;\nbackground-image: -webkit-linear-gradient(top,#222 0,#2c2c2c 100%) !important;\nbackground-image: linear-gradient(to bottom,#222 0,#2c2c2c 100%) !important;\n}\n\n.yt-uix-form-input-select {\nborder: 1px solid #444 !important;\ncolor: #bbb !important;\n}\n\n.enable-monetization-field {\ncolor: #aaa !important;\n}\n\n.monetization-disclaimer {\nborder-color: #303030 !important;\nbackground: #222 !important;\n}\n\n	/* Tabs */\n\n#inline-editor-main {\nbackground-color: #1b1b1b !important;\n}\n\n		/* Audio Tab */\n\n#audio-ui-pagefold { \ndisplay: none !important;\n}\n\n.audio-ui-featured-table-header { \ncolor: #bbb !important;\n}\n\n#audio-ui-featured-table-container thead td {\nbackground-image: -moz-linear-gradient(top,#333 0,#2c2c2c 100%) !important;\nbackground-image: -ms-linear-gradient(top,#333 0,#2c2c2c 100%) !important;\nbackground-image: -o-linear-gradient(top,#333 0,#2c2c2c 100%) !important;\nbackground-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,#333),color-stop(100%,#2c2c2c)) !important;\nbackground-image: -webkit-linear-gradient(top,#333 0,#2c2c2c 100%) !important;\nbackground-image: linear-gradient(to bottom,#333 0,#2c2c2c 100%) !important;\n}\n\n#audio-ui-featured-table {\nborder-color: #303030 !important;\n}\n  \n.audio-ui-featured-row {\nborder-color: #303030 !important;\ncolor: #aaa !important;\n}\n\n.audio-ui-featured-row:hover {\nbackground-color: #222 !important;\n}\n\n.yt-search-field .yt-uix-form-input-fluid {\npadding-right: 48px !important;\n}\n\n.yt-search-field {\nborder-color: #303030 !important;\nheight: 33px !important;\nmargin: 0 !important;\nbackground-color: #222 !important;\n-moz-box-shadow: inset 0 0px 0px #eee !important;\n-ms-box-shadow: inset 0 0px 0px #eee !important;\n-webkit-box-shadow: inset 0 0px 0px #eee !important;\nbox-shadow: inset 0 0px 0px #eee !important;\n}\n\n.yt-search-field-search-button .yt-uix-button-content {\nbackground: no-repeat url(http://i.imgur.com/VirN1wE.png) -170px -201px !important;\n}\n\n		/* Annotations Tab */\n\n#annotator-add-div {\nborder-bottom-color: #303030 !important;\n}\n\n#annotator-div {\nbackground: #1b1b1b !important;\nborder-width: 0px !important;\n}\n\n#annotator-select-div {\nborder-bottom-color: #303030 !important;\n}\n    \n		/* Captions Tab */\n\n.timedtext-content {\nbackground-color: transparent !important;\n}\n    \n#bottom-notes-section {\nborder-top-color: #303030;\nbackground-color: transparent !important;\n}\n      \n	/* Tags */\n      \n.vm-label-item, .vm-member-item {\nborder-bottom-color: #303030 !important;\nbackground: #1b1b1b !important;\n}\n\n.yt-alert-naked .yt-alert-content {\ncolor: #ccc;\n}\n\n/* Playlist View */\n\n.playlist-video-item {\nborder-top-color: #303030 !important;\nbackground-color: transparent !important;\ncolor: #aaa !important;\n}\n\n.yt-uix-button-icon-c4-editor-edit {\nbackground: no-repeat url(http://i.imgur.com/FwVdCu1.png) 0 -58px !important;\n}\n\n.yt-uix-button-icon-play-all {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -29px -181px !important;\n}\n\n.yt-uix-button-icon-playlist-like {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -168px -253px !important;\n}\n\n.yt-uix-button:hover .yt-uix-button-icon-playlist-like {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) 0 0 !important;\n}\n\n.yt-uix-button-icon-playlist-dislike {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -15px -339px !important;\n}\n\n.yt-uix-button:hover .yt-uix-button-icon-playlist-dislike {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -209px -399px !important;\n}\n\n.playlist-share.yt-uix-button-playlist-action.yt-uix-button.yt-uix-button-text.yt-uix-button-size-default.yt-uix-tooltip {\ncolor: #aaa !important;\n}\n\n.header-stats {\ncolor: #aaa !important;\n}\n\n.playlist-pager, .playlist-video-item {\nborder-top-color: #303030 !important;\n}\n\n/* Playlist Editor */\n\n#playlist-editor-title {\ncolor: #aaa !important;\n}\n\n.yt-uix-button-icon-c4-editor-trash {\nbackground: no-repeat url(http://i.imgur.com/FwVdCu1.png) 0 -111px !important;\n}\n\n#playlist-editor-navigation-menu {\nborder-bottom-color: #303030 !important;\n}\n\n#playlist-info, #playlist-info .yt-uix-form-legend {\ncolor: #999 !important;\n}\n\n.playlist-video-item .playlist-video-item-handle {\nborder-left-color: #303030 !important;\nborder-right-color: #303030 !important;\nbackground: #222 !important;\n}\n    \n.playlist-video-item .yt-user-name {\ncolor: #888 !important;\n}\n    \n.playlist-video-items {\nborder-bottom-color: #303030 !important;\n}\n      \n      /* Intro Popup */\n\n.yt-dialog-fg-content, .yt-uix-overlay-fg-content {\nborder-color: #444 !important;\n}\n      \n.yt-dialog-bg, .yt-uix-overlay-bg {\nbackground-color: #111 !important;\n}     \n \n.yt-dialog-fg, .yt-uix-overlay-fg {\nbackground: #1b1b1b !important;\nborder-color: #303030 !important;\n}\n      \n.yt-dialog-base .yt-dialog-header h2, .yt-uix-overlay-base .yt-uix-overlay-header h2 {\ncolor: #aaa !important;\n}\n\n.yt-dialog-base .yt-dialog-header, .yt-uix-overlay-base .yt-uix-overlay-header {\nborder-bottom-color: #303030 !important;\n}\n\n#interstitial-editor h3 {\ncolor: #aaa !important;\n}\n          \n/* Watch Sidebar */\n\n#watch7-sidebar {\nbackground: transparent !important;\npadding-left: 5px !important;\n}\n\n#watch7-sidebar .watch-sidebar-section {\nbackground: #1b1b1b !important;\nborder-top: 10px solid #1b1b1b !important;\nborder-left: 5px solid #1b1b1b !important;\nborder-right-width: 0px !important;\nborder-bottom: 10px solid #1b1b1b !important;\nwidth: 390px !important;\nmargin: 0 0 0 0 !important; \n}\n\n.site-left-aligned .watch-wide #watch7-sidebar, .site-left-aligned .watch-playlist #watch7-sidebar {\npadding-top: 5px !important;\n}\n\n.watch-branded #watch7-sidebar {\nbackground: transparent !important;\n}\n\n.watch-branded-banner #watch7-sidebar {\nmargin-top: -400px !important;\n}\n\n.watch-wide #watch7-sidebar {\nmargin-top: 0 !important; \n}\n\n.watch-wide #watch7-sidebar, .watch-playlist #watch7-sidebar, .watch-branded #watch7-sidebar {\npadding-top: 0px !important; \n}\n\n#watch7-sidebar .watch-sidebar-head, #watch7-sidebar .watch-sidebar-foot {\ncolor: #999 !important;\n}\n\n.yt-sidebar-title, .yt-sidebar-title a {\ncolor: #aaa !important;\n}\n\n.yt-sidebar-link {\ncolor: #999 !important;\n}\n\n.yt-sidebar-title.yt-sidebar-selected a, .yt-sidebar-link.yt-sidebar-selected {\ncolor: #fff !important;\n}\n\n.gssb_m {\ncolor: #aaa !important;\nbackground: #181818 !important;\n}\n\n.gssb_e {\nborder: 1px solid #303030 !important;\n}\n\n.gssb_i td {\nbackground: #222 !important;\n}\n\n.yt-uix-button-icon-addto {\nbackground: no-repeat url(http://i.imgur.com/VirN1wE.pngp) -172px -221px !important;\n}\n\n#watch7-sidebar .video-list .video-list-item .title {\ncolor: #999 !important;\n}\n\n#watch7-sidebar .video-list .video-list-item .title:hover {\ncolor: #2793e6 !important;\n}\n\n#watch7-sidebar .video-list-item a:visited .title {\ncolor: #555 !important;\n}\n\n#watch7-sidebar .video-list-item a:hover:visited .title {\ncolor: #0059B3 !important;\n}\n\n	/* Watch Later page */\n\n#watch-later-promo {\nbackground: #1b1b1b !important;\n}\n\n.feed-promo {\nborder-bottom-color: #303030 !important;\n}\n\n#watch-later-promo .watch-later-tv, #watch-later-promo .watch-later-nyan {\ndisplay: none !important;\n}\n\n#watch-later-promo p {\ncolor: #999 !important;\n}\n\n	/* Social Page */\n\n#social-promo {\nbackground-color: #1b1b1b !important;\n}\n\n#social-promo h4, #social-promo .google-upgrade-promo {\ncolor: #777 !important;\n}\n\n/* In-feed promo */\n\n#channel-subscription-promo-in-feed {\nbackground: #222 !important;\n}\n\n#channel-subscription-promo-in-feed .message .channel-content h4 a {\ncolor: #ccc !important;\n}\n\n/* Upload Page */\n\n#main-content .starting-box {\nborder-color: #303030 !important;\nbackground: #1b1b1b !important;\n}\n\n#upload-prompt-box {\nborder-width: 0px !important;\n}\n\n#upload-button-text {\ncolor: #aaa !important;\n}\n\n#upload-other-options-list .upload-option-text {\ncolor: #aaa !important;\n}\n\n#upload-sidebar .upload-sidebar-header, #upload-help-links-non-hh strong {\ncolor: #aaa !important;\n}\n\n.upload-help-link-list .help-item {\ncolor: #999 !important;\n}\n\n.yt-uix-button-icon-upload-add {\nbackground: transparent url(http://i.imgur.com/4zVtksY.png) no-repeat !important;\n}\n\n.yt-uix-button-icon-upload-cancel {\nbackground: transparent url(http://i.imgur.com/bk23XgU.png) no-repeat !important;\n}\n  \n.upload-header {\nbackground: #1b1b1b !important;\nborder-color: #303030 !important;\nborder-top-width: 0px !important;\n}\n  \n.upload-item {\nborder-color: #303030 !important;\nborder-top-width: 0px !important;\nbackground-color: #1b1b1b !important;\nmargin-bottom: 0px !important;\n}\n\n.upload-item:last-child {\nmargin-bottom: 12px !important;\n    }\n\n.upload-thumb {\nheight: 68px !important;\nborder-color: #999 !important;\n}\n\n.item-title {\ncolor: #bbb !important;\n}\n  \n.sharing-networks-label {\ncolor: #777 !important;\n}\n\n.monetize-options-box {\nborder-color: #303030 !important;\nborder-radius: 0px !important;\n-moz-box-shadow: 0 0px 0px #000 !important;\n-ms-box-shadow: 0 0px 0px #000 !important;\n-webkit-box-shadow: 0 0px 0px #000 !important;\nbox-shadow: 0 0px 0px #000 !important;\n}\n  \nhr.metadata-separator-line {\nbackground: #303030 !important;\nborder-bottom-color: #303030 !important;\n}\n\n/* Footer */\n\nbody #footer-container {\nbackground-color: #1b1b1b !important;\nborder-top: 1px solid #292929 !important;\n}\n\n#footer-main {\nborder-bottom-width: 0px !important;\n}\n\n#footer-logo img {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -131px -219px !important;\n}\n\n#footer-links-primary a {\ncolor: #999 !important;\n}\n\n.yt-uix-button-default:active, .yt-uix-button-default.yt-uix-button-toggled, .yt-uix-button-default.yt-uix-button-active, .yt-uix-button-default.yt-uix-button-active:focus, .yt-uix-button-text:active {\nbackground: #1f1f1f !important;\n}\n\n.yt-uix-button-panel:hover #watch-like-dislike-buttons .yt-uix-button-text.yt-uix-button-toggled {\nborder-color: #303030 !important;\nbackground-color: #222 !important;\nbackground-image: -moz-linear-gradient(top,#222 0,#2e2e2e 100%) !important;\nbackground-image: -ms-linear-gradient(top,#222 0,#2e2e2e 100%) !important;\nbackground-image: -o-linear-gradient(top,#222 0,#2e2e2e 100%) !important;\nbackground-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,#222),color-stop(100%,#2e2e2e)) !important;\nbackground-image: -webkit-linear-gradient(top,#222 0,#2e2e2e 100%) !important;\nbackground-image: linear-gradient(to bottom,#222 0,#2e2e2e 100%) !important;\n}\n\n.video-extras-sparkbar-likes {\nbackground: #590 !important;\n}\n\n.video-extras-sparkbar-dislikes {\nbackground: #F00 !important;\n}\n\n#share-panel-buttons .yt-uix-button:hover, #share-panel-buttons .yt-uix-button:active, #share-panel-buttons .yt-uix-button.yt-uix-button-active, #share-panel-buttons .yt-uix-button.yt-uix-button-toggled {\nborder-bottom-color: #ccc !important;\n}\n\n#share-panel-buttons .yt-uix-button {\ncolor: #aaa !important;\n}\n\n.action-panel-content .report-video-title {\nborder-color:#ccc !important;\n}\n\n.yt-uix-form-input-text, .yt-uix-form-input-textarea {\nbackground: #111 !important;\nborder-color: #2b2b2b !important;\ncolor: #aaa !important;\n}\n\n.yt-uix-button .yt-uix-button-icon-action-panel-transcript {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -172px -159px !important;\n}\n\n.yt-uix-button-icon-action-panel-report {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -81px -62px !important;\n}\n\n.yt-uix-button-icon-action-panel-stats {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -61px -225px !important;\n}\n\n.yt-uix-button-icon-watch-like {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -168px -253px !important;\npadding-bottom: 2px !important;\n}\n\n.yt-uix-button:hover .yt-uix-button-icon-watch-like {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) 0 0 !important;\n}\n\n.actionable .yt-uix-button:active .yt-uix-button-icon-watch-like, .actionable .yt-uix-button.yt-uix-button-toggled .yt-uix-button-icon-watch-like {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -195px -253px !important;\n}\n\n.yt-uix-button-icon-watch-dislike {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -15px -339px !important;\npadding-bottom: 5px !important;\n}\n\n.yt-uix-button:hover .yt-uix-button-icon-watch-dislike {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -209px -399px !important;\n}\n\n\n.yt-uix-button:active .yt-uix-button-icon-watch-dislike, .yt-uix-button.yt-uix-button-toggled .yt-uix-button-icon-watch-dislike {\nbackground: no-repeat url(http://i.imgur.com/DDNZc3U.png) -15px -316px !important;\n}\n\n#yt-masthead-user-displayname {\ncolor: #aaa !important;\n}\n\n#masthead-search-term {\ncolor: #aaa !important;\n}\n\n.search-header {\nborder-bottom-color: #303030 !important;\n}\n\n\n#watch7-user-header .yt-user-name {\ncolor: #2793e6 !important;\n}\n\n#eow-title {\ncolor: #888!important;\n}\n\n.yt-default h1, .yt-default h2, .yt-default h3, .yt-default h4, .yt-default h5, .yt-default h6, h1.yt, h2.yt, h3.yt, h4.yt, h5.yt, h6.yt {\ncolor: #888 !important;\n}\n\n#comments-view .comment-text a {\ncolor: #2793e6 !important;\n}\n\n.g-hovercard.yt-uix-sessionlink.yt-user-name {\nword-wrap: break-word;\n}\n\n.yt-uix-button img, .yt-uix-button-icon-wrapper+.yt-uix-button-content {\ncolor: #888 !important;\n}\n\n.comment-text, .comment .author {\ncolor: #aaa !important;\n}\n\n#watch7-headline h1 .long-title {\ncolor: #999 !important;\n}\n\n.yt-uix-button-subscribed-branded .yt-uix-button-content span, .yt-uix-button-subscribe-branded .yt-uix-button-content, .share-email label, #comments-view h4, #comments-view h4 a, #watch7-views-info {\ncolor: #aaa!important;\n}\n\n.yt-uix-button-subscribed-branded:hover .yt-uix-button-content span, .yt-uix-button-subscribe-branded:hover .yt-uix-button-content, .yt-uix-expander-head {\ncolor: #ccc!important;\n}\n\n.watch-view-count {\ncolor: #ddd!important;\n}\n\n#watch7-user-header .yt-user-videos, #watch-description-extra-info .metadata-info-title, #action-panel-addto .watch-playlists-drawer h3, .watch-playlists-drawer .playlist-addto-title-options label {\ncolor: #999!important;\n}\n\n.comments-section-description {\ncolor: #777!important;\n}\n\n.epic-nav-dropdown-group:hover, body a.yt-uix-button-epic-nav-item:hover, body a.yt-uix-button-epic-nav-item.selected, body a.yt-uix-button-epic-nav-item.yt-uix-button-toggled, button.yt-uix-button-epic-nav-item:hover, button.yt-uix-button-epic-nav-item.selected, button.yt-uix-button-epic-nav-item.yt-uix-button-toggled, .epic-nav-item:hover, .epic-nav-item.selected, .epic-nav-item.yt-uix-button-toggled, .epic-nav-item-heading {\ncolor: #aaa !important;\n}\n\n.account-container {\nbackground: #1b1b1b !important;\nborder-color: #303030 !important;\n}\n\n.account-header h2 {\ncolor: #bbb !important;\n}\n  \nh3.account-section-header {\ncolor: #999 !important;\n}\n  \n.account-content {\ncolor: #888 !important;\n}\n\n.account-section-setting {\ncolor: #999 !important;\n}\n\n.account-features-list tr {\nborder-bottom-color: #303030 !important;\n}\n\n.social-connector {\nborder-color: #303030 !important;\nbackground: #2b2b2b !important;\ncolor: #ccc !important;\n}\n\n.yt-horizontal-rule {\nborder-top-color: #303030 !important;\n}\n\n.yt-uix-form-input-checkbox, .yt-uix-form-input-checkbox-element {\nbackground: #2a2a2a !important;\nborder-color: #555 !important;\n}\n\n.yt-uix-form-input-checkbox-container input:checked+.yt-uix-form-input-checkbox-element {\nbackground: no-repeat #2a2a2a url(http://i.imgur.com/DDNZc3U.png) -155px -62px !important;\nborder: 1px solid #36649c !important;\n}\n\n.yt-badge {\nborder-color: #303030 !important;\ncolor: #aaa !important;\n}\n\n.no-adsense-text .yt-uix-button {\ncolor: #fff !important;\n}\n\n#google-cookie-alert {\nborder-top-color: #303030 !important;\n}\n\n.search-header {\nborder-bottom-color: #303030 !important;\n}\n\n.search-header .num-results, .search-header .num-results strong, .search-header .yt-uix-button-content, .filter-col-title, .filter {\ncolor: #aaa !important;\n}\n\n.watch-card {\ncolor: #aaa !important;\n}\n\n.watch-card .watch-card-title a, .watch-card .yt-uix-tabs-tab:hover, .watch-card .watch-card-more-tab:hover, .watch-card .watch-card-more-row:hover td {\ncolor: #ccc !important;\n}\n\n.watch-card .yt-uix-tabs-selected {\ncolor: #aaa !important;\n}\n    \n.watch-card-list td {\nborder: 1px solid #303030 !important;\n}\n      \n.watch-card-list .watch-card-data-col {\npadding-left: 5px !important;\npadding-right: 5px !important;\ntext-align: center !important;\n}\n    \n#filter-dropdown {\nbackground-color: #222 !important;\n}\n\n/* Button Menu (dropdown) */\n\n.yt-uix-button-menu {\nborder-color: #444 !important;\nbackground: #222 !important;\n}\n  \n.yt-uix-button-menu .yt-uix-button-menu-item {\ncolor: #ccc !important;\n}\n\n.menu-item-top-divider {\nborder-top-color: #444 !important;\n}\n\n.vm-action-menu-content .yt-uix-button-menu-item.menu-subheading {\nbackground: #292929 !important;\n}\n\n.yt-uix-button-menu .yt-uix-button-menu-item.menu-subheading {\nborder-top-color: #444 !important;\ncolor: #ccc !important;\n}\n\n#shared-addto-menu .playlists {\nborder-bottom-color: #444 !important;\n}\n\n/* Youtube Broken Page */\n\n#error-page-content p {\ncolor: #aaa !important;\ntext-shadow: 0px 0 0 #000 !important;\n}\n\n#masthead-search .search-btn-component .yt-uix-button-content {\nbackground: no-repeat url(http://i.imgur.com/VirN1wE.png) -170px -201px !important;\n}\n\n/* Youtube Stop Download Script */\n\n#stop-download {\nmargin-left: 5px !important;\n}\n\n#stpdownload {\ncolor: #fff !important;\n}\n\n/* OPTIONALS */";
    css4 += "#watch7-sidebar .watch-sidebar-section, #watch7-content, #watch-discussion {\nbackground-color: rgb(10,10,10)!important;\nbackground-image: url(http://i44.tinypic.com/9fsn50.jpg)!important;\ncolor: #aaa!important;\n}\n\n#watch7-sidebar .watch-sidebar-section {\nborder-top: 12px solid transparent !important;\n border-left: 5px solid transparent !important;\n border-right-width: 0px !important;\n border-bottom: 10px solid transparent !important;\n}\n\n#watch7-content {\nborder-bottom: 2px solid #292929;\n}\n\n#eow-title {\ncolor: #fff!important;\nfont-weight:bold;\n}\n\n#watch7-headline h1 a {\ncolor: #ff0 !important;\n}\n\n"
//    css4 += ".pf {\npadding: 1px 10px 2px 8px !important;\n}\n\n.lg {\npadding: 0 0 0 58px !important;\n}\n\nimg.go.Wh {\ndisplay:none !important;\n}\n\n.Jx {\nmargin: 0 0 0 -33px !important;\n}\n\n.yJa {\nwidth: 345px !important;\n zoom: 0.9 !important;\n}\n\n.wy, .Sea, .eR {\nopacity:0.4 !important;\nzoom:0.8 !important;\n}\n\n.Xa {\npadding: 0 0 13px 0 !important;\n}\n\n.r3 .b2 {\npadding-right: 5px !important;\npadding-top: 66px !important;\nmargin: 0 !important;\nzoom: 0.7 !important;\n}\n\n.mj {\nwidth:400px !important;\nbottom:0px !important\n;padding: 8px 0 47px 0 !important;\nposition: absolute !important;\nzoom: 0.8 !important;\n}\n\n.BJa {\npadding: 0 0 20px 0 !important;\n left: 307px !important;\n top: 10px !important;\nposition: fixed !important;\n zoom: 0.7 !important;\n}\n\n.wPa {\npadding: 10px 8px 10px !important;\n zoom: 0.8 !important;\n}\n\n.ve.oba {\nmargin-left:-5px !important;\n}\n.comments-iframe-container {\nmargin-left: 0px !important;\nmax-height:222px !important;\n}\n\n#comments-test-iframe {\nwidth:311px !important;\n}\n\n.comments-iframe-container {\nmax-width:311px !important;\n}\n\n#widget_bounds {\nwidth:311px !important;\n}\n\n.yJa, .BJa, .mj {\nbackground: transparent !important;\n}\n\n.yDa {\nbackground-color: #222 !important;\n}\n  \n.DJa {\nbackground-color: transparent !important;\ncolor: #999 !important;\n}\n\n.E5, .e4 {\nbackground-color: #111 !important;\nborder-color: #303030 !important;\nborder-top: 1px solid #303030 !important;\n}\n  \n.Jea {\nborder-color: #303030 !important;\nborder-bottom-color: transparent !important;\nborder-left-color: transparent !important;\n}\n\n.Mga {\ndisplay: none !important;\n}\n  \n.dn, .ve.oba, .Aq,.OF, .e4, .cp {\ncolor: #aaa !important;\n}\n  \n.gj.d-s, .qg {\ncolor: #777 !important;\n}\n      \n.g9 .Xa.va .vy, .g9 .Xa.va .dp.d-s, .g9 .Xa.va .ot-anchor, .g9 .Xa.va .ot-hashtag, .g9 .Xa.va .proflink, .g9 .Xa.va .proflinkPrefix, .g9 .Xa.va .gj.d-s, .Xa.va .qg, .Xa.va .mi.d-s {\ncolor: #427fed !important;\n}\n\n.ot-hashtag, .proflink, .zDa {\ncolor: #bbb !important;\n}\n\n.d-A, .d-Kl, .d-A-yb .d-A-B, .d-A-u .d-A-B {\ncolor: #ccc !important;\n}\n\n.bmd {\ncolor:#590;\n}\n\n.r3 .r0 {\nborder-color: #303030 !important;\nbackground: #242323 !important;\ncolor: #aaa !important;\n}\n    \n.d-y-r-c {\nbackground-color: #2b2b2b !important;\nbackground-image: -webkit-linear-gradient(top,#222 0,#2c2c2c 100%) !important;\nbackground-image: linear-gradient(to bottom,#222 0,#2c2c2c 100%) !important;\nborder-color: #444 !important;\ncolor: #bbb !important;\n}\n    \n.xN .d-y-r-c-ha, .Pga.d-A .d-A-B {\ncolor: #bbb !important;\n}\n    \n.d-k-l.d-y-r-c-Qa {\nbackground: no-repeat url(http://i.imgur.com/ho8PnMO.png) -131px -17px !important;\n}\n\n.d-r {\nbackground: #222 !important;\nborder: 1px solid #444 !important;\n}\n\n.d-A-yb, .d-A-u {\nbackground-color: #333 !important;\nborder-style: solid !important;\nborder-color: #333 !important\n}\n\n.Hma .Pga.d-A-yb {\nborder: none !important;\n}\n\n.ot-anchor {\ncolor: #6f6f6f !important;\n}\n\n.dga {\nbackground-color: #151515 !important;\nborder-color: #303030 !important;\n}\n\n.mj .g-h-f-vc-B {\nborder-color: #303030 !important;\n}\n    \n.mj .tm {\nbackground: no-repeat url(http://i.imgur.com/VpPZ6yW.png) -13px -719px !important;\n}\n\n.g-h-f-k .g-h-f-V-nb {\nborder-color: #303030 !important;\n}\n    \n.g-h-f-V-nb {\nbackground: #222 !important;\n}\n  \n.d-cm {\nborder-top-color: #303030 !important;\n}\n\n.g-h-f-m-wc-E, .g-h-f-m-Ed-wc-E {\nbackground: no-repeat url(http://i.imgur.com/p4Hnp94.png) -21px -25px !important;\n}\n\n.jbgcdb {\ncolor: #aaa !important;\n}\n\n.IGPVEc {\nbackground: no-repeat url(http://i.imgur.com/k5G05JP.png) -131px 0 !important;\n}\n\n.FnlLyd:hover {\nbackground-color: #222 !important;\nborder-color: #303030 !important;\n}\n    \n.FnlLyd:active {\nbackground-color: #2a2a2a !important;\nborder-color: #444 !important;\n}\n        \n.Kgb, .Y8b .TD {\nbackground-color: #3a3a3a !important;\n}\n\n.MJa.JMc {\nbackground: no-repeat url(http://i.imgur.com/G39kb8k.png) 0 -186px !important;\n}\n\n.LJa.Zld {\nbackground: no-repeat url(http://i.imgur.com/G39kb8k.png) 0 -204px !important;\n}\n\n.Bl {\nbackground: no-repeat url(http://i.imgur.com/IjLPagd.png) 0 -49px !important;\n}\n  \n.Kx {\nbackground: no-repeat url(http://i.imgur.com/IjLPagd.png) -171px -21px !important;\n}";
if (false || (location.href.replace(location.hash,'') == "https://www.youtube.com/upload") || (location.href.replace(location.hash,'') == "http://www.youtube.com/upload") || (document.location.href.indexOf("http://www.youtube.com/edit") == 0) || (document.location.href.indexOf("https://www.youtube.com/edit") == 0))
	css4 += "h4 {\ncolor: #aaa !important;\n}";
if (false || (new RegExp("^https://apis.google.com/u/0/(.*)/_/widget/render/comments\\?usegapi=1&first_party_property=YOUTUBE&href=(.*)$")).test(document.location.href) || (new RegExp("^https://plus.googleapis.com/_/im/_/widget/render/comments\\?usegapi=1&first_party_property=YOUTUBE&href=(.*)$")).test(document.location.href))
	css4 += ".yJa, .BJa, .mj {\nbackground: transparent !important;\n}\n\n.yDa {\nbackground-color: #222 !important;\n}\n  \n.DJa {\nbackground-color: transparent !important;\ncolor: #999 !important;\n}\n\n.E5, .e4 {\nbackground-color: #111 !important;\nborder-color: #303030 !important;\nborder-top: 1px solid #303030 !important;\n}\n  \n.Jea {\nborder-color: #303030 !important;\nborder-bottom-color: transparent !important;\nborder-left-color: transparent !important;\n}\n\n.Mga {\ndisplay: none !important;\n}\n  \n.dn, .ve.oba, .Aq,.OF, .e4, .cp {\ncolor: #aaa !important;\n}\n  \n.gj.d-s, .qg {\ncolor: #777 !important;\n}\n      \n.g9 .Xa.va .vy, .g9 .Xa.va .dp.d-s, .g9 .Xa.va .ot-anchor, .g9 .Xa.va .ot-hashtag, .g9 .Xa.va .proflink, .g9 .Xa.va .proflinkPrefix, .g9 .Xa.va .gj.d-s, .Xa.va .qg, .Xa.va .mi.d-s {\ncolor: #427fed !important;\n}\n\n.ot-hashtag, .proflink, .zDa {\ncolor: #bbb !important;\n}\n\n.d-A, .d-Kl, .d-A-yb .d-A-B, .d-A-u .d-A-B {\ncolor: #ccc !important;\n}\n\n.bmd {\ncolor:#590;\n}\n\n.r3 .r0 {\nborder-color: #303030 !important;\nbackground: #242323 !important;\ncolor: #aaa !important;\n}\n    \n.d-y-r-c {\nbackground-color: #2b2b2b !important;\nbackground-image: -webkit-linear-gradient(top,#222 0,#2c2c2c 100%) !important;\nbackground-image: linear-gradient(to bottom,#222 0,#2c2c2c 100%) !important;\nborder-color: #444 !important;\ncolor: #bbb !important;\n}\n    \n.xN .d-y-r-c-ha, .Pga.d-A .d-A-B {\ncolor: #bbb !important;\n}\n    \n.d-k-l.d-y-r-c-Qa {\nbackground: no-repeat url(http://i.imgur.com/ho8PnMO.png) -131px -17px !important;\n}\n\n.d-r {\nbackground: #222 !important;\nborder: 1px solid #444 !important;\n}\n\n.d-A-yb, .d-A-u {\nbackground-color: #333 !important;\nborder-style: solid !important;\nborder-color: #333 !important\n}\n\n.Hma .Pga.d-A-yb {\nborder: none !important;\n}\n\n.ot-anchor {\ncolor: #6f6f6f !important;\n}\n\n.dga {\nbackground-color: #151515 !important;\nborder-color: #303030 !important;\n}\n\n.mj .g-h-f-vc-B {\nborder-color: #303030 !important;\n}\n    \n.mj .tm {\nbackground: no-repeat url(http://i.imgur.com/VpPZ6yW.png) -13px -719px !important;\n}\n\n.g-h-f-k .g-h-f-V-nb {\nborder-color: #303030 !important;\n}\n    \n.g-h-f-V-nb {\nbackground: #222 !important;\n}\n  \n.d-cm {\nborder-top-color: #303030 !important;\n}\n\n.g-h-f-m-wc-E, .g-h-f-m-Ed-wc-E {\nbackground: no-repeat url(http://i.imgur.com/p4Hnp94.png) -21px -25px !important;\n}\n\n.jbgcdb {\ncolor: #aaa !important;\n}\n\n.IGPVEc {\nbackground: no-repeat url(http://i.imgur.com/k5G05JP.png) -131px 0 !important;\n}\n\n.FnlLyd:hover {\nbackground-color: #222 !important;\nborder-color: #303030 !important;\n}\n    \n.FnlLyd:active {\nbackground-color: #2a2a2a !important;\nborder-color: #444 !important;\n}\n        \n.Kgb, .Y8b .TD {\nbackground-color: #3a3a3a !important;\n}\n\n.MJa.JMc {\nbackground: no-repeat url(http://i.imgur.com/G39kb8k.png) 0 -186px !important;\n}\n\n.LJa.Zld {\nbackground: no-repeat url(http://i.imgur.com/G39kb8k.png) 0 -204px !important;\n}\n\n.Bl {\nbackground: no-repeat url(http://i.imgur.com/IjLPagd.png) 0 -49px !important;\n}\n  \n.Kx {\nbackground: no-repeat url(http://i.imgur.com/IjLPagd.png) -171px -21px !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css4);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css4);
} else if (typeof addStyle != "undefined") {
	addStyle(css4);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css4));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
      
}







//Youtube Css Layout


  if(window.location.href.indexOf("youtube.com/watch") >= 0)         {  
 
//      $('#content, #yt-masthead-container').detach();
      if (GM_config.get("reverser")) {
    $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","311px" );
    $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","1px" );
    $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-moz-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-webkit-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-o-calc(100% - 312px)");  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","calc(100% - 312px)"); 
    $("#watch7-main-container, #yt-masthead-container").css( "right","0" );
    $("#watch7-main-container, #yt-masthead-container").css( "left","auto" );
    $("#watch7-main-container, #yt-masthead-container").css( "float","right" );
    $("#watch7-playlist-tray, #watch7-playlist-tray-mask").css( "right","0" );
    $("#watch7-playlist-tray, #watch7-playlist-tray-mask").css( "left","4px" );
    $(".watch7-playlist-bar-right, #watch7-playlist-tray-container, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "right","0" );
    $(".watch7-playlist-bar-right, #watch7-playlist-tray-container, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "left","auto" );
}    
      
       if (GM_config.get("hider")) {
    $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","0px" );
    $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","0px" );
    $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "width","100%" );
    $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container, #lightsOut").css( "display","none" );
    }
if (!GM_config.get("hider")) {     $("#player").css("width","-moz-calc(100% - 312px)"); $("#player").css("width","-webkit-calc(100% - 312px)"); $("#player").css("width","-o-calc(100% - 312px)");  $("#player").css("width","calc(100% - 312px)");   $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "display","block" );} 
function GM_addStyle(css) {
	var parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	var style = document.createElement("style");
	style.type = "text/css";
	var textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
}
GM_addStyle(" \
.html5-main-video, .html5-video-content {position: absolute; width: 100% !important; height: 100% !important;}\
.player-height {height: 100%;}\
.player-width {width: 100%;}\
#page.watch, #content, #page-container {padding-bottom:0px !important;}\
.watch7-playlist-bar {height:0px !important;}\
#guide, #footer-container, .yt-uix-overlay, #comments-view .video-list, #yt-masthead-content #masthead-upload-button-group, #yt-masthead-signin, #yt-masthead-user #sb-button-notify, #yt-masthead-user-displayname, #yt-masthead-user .yt-masthead-user-icon, #comments-view .comment .yt-user-photo, #watch-owner-container, .watch7-card-promo, .distiller-first-time-promo, .distiller-first-time-promo.slim {display:none !important;}\
.site-left-aligned.guide-enabled #player, #player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy, .site-left-aligned.guide-enabled #player, .site-left-aligned.guide-enabled #player-legacy, .site-left-aligned.guide-enabled #player-legacy { padding-left: 311px; padding-right: 1px; z-index:inherit; position: fixed;  width: 100%; background-color:transparent !important; -webkit-transition: 0 !important;transition:  0 !important}\
#yt-masthead-container.yt-grid-box {border:0px; padding: 0px; width: 311px; float: left; position: relative; z-index: 7; padding-bottom:0px; display:none;}\
#watch7-main-container {padding-left: 0 !important; position: absolute; left: 0; top: 0; float: left; width: 311px; margin-top: 38px; display:none;}\
.sidebar-expanded #player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy { width: auto; height:100%;}\
#watch7-container {padding-top: 0px; padding-left: 0px;}\
#watch7-content {width: 311px; margin-top:0px !important;}\
#watch7-main.clearfix { width: auto!important; left: 0px!important; min-width:0px!important;}\
#page.watch {margin-left: 0px!important;}\
#watch7-views-info { position: absolute!important; top: 62px; right: 22px; min-width: 160px!important; max-width: 160px!important; zoom: 0.9!important; -moz-transform: scale(0.96); -moz-transform-origin: 800px 0 0; -o-transform: scale(0.96);}\
#watch7-secondary-actions .yt-uix-button { float:left; height: 3em!important; margin-left: 6px!important;}\
#watch7-user-header {zoom: 0.96; -moz-transform: scale(0.96); -moz-transform-origin: 0 0; -o-transform: scale(0.9); padding: 0px!important; margin-left: 3px;}\
#watch7-user-header .yt-uix-button-subscription-container, #watch7-user-header .ypc-container {margin-left: 10px!important; zoom: 0.9!important; -moz-transform: scale(0.9); -moz-transform-origin: 0 0; -o-transform: scale(0.9);}\
#watch7-sentiment-actions { float: left!important; margin-top: 8px!important; zoom:0.8;  -moz-transform: scale(0.8);  -moz-transform-origin: 0 0; -o-transform: scale(0.8);}\
#watch7-headline, #watch7-notification-area, #watch7-user-header { padding: 5px 0!important; border:0px;}\
.action-panel-content {padding: 5px 0!important; width: 310px!important;}\
#watch7-sidebar {clear: left!important; float: left!important; width: 310px!important; padding: 0!important; padding-top:10px !important; margin-top: 2px!important; padding-right: 5px!important; margin-left: -5px!important;}\
.watch-wide #watch7-sidebar, .watch-playlist #watch7-sidebar, .watch-branded #watch7-sidebar {margin-top: 0px !important;}\
#watch-discussion {border: 0px; margin-left: 0px; overflow-x: hidden;}\
#watch-discussion {padding: 15px 2px !important;}\
.yJa {width: 311px !important;}\
#comments-test-iframe, #widget_bounds, #comments-test-iframe iframe {width: 311px !important;}\
#watch-discussion .comments-iframe-container {max-width: 311px !important;}\
#watch-discussion .comments-post-container {padding-bottom: 0px!important; padding-top: 10px!important; width: 85%; zoom: 0.9;  -moz-transform: scale(0.9); -moz-transform-origin: 0 0; -o-transform: scale(0.9);}\
#comments-view hr {margin: 0!important;}\
.site-left-aligned #yt-masthead-content {max-width: 244px!important; zoom: 0.9!important;  -moz-transform: scale(0.9); -moz-transform-origin: 0 0; -o-transform: scale(0.9);}\
.site-left-aligned.sidebar-expanded #yt-masthead {margin:0 !important;}\
#yt-masthead #logo-container {margin-left: 0px!important;margin-right: 0px!important;}\
.site-left-aligned.exp-new-site-width #yt-masthead, #yt-masthead, .site-left-aligned #yt-masthead-container {min-width: 311px!important; max-width: 311px!important;}\
#watch7-action-buttons {padding: 0; border:0px; border-bottom:1px solid #E6E6E6;}\
#watch-description.yt-uix-expander-collapsed #watch-description-content {margin-bottom: 8px;}\
#watch-description-expand, #watch-description-collapse {zoom:0.8;  -moz-transform: scale(0.8); -moz-transform-origin: 0 0; -o-transform: scale(0.8);}\
#watch7-headline.yt-uix-expander-collapsed h1 {white-space: normal;}\
#watch7-headline h1 {font-size: 15px;}\
.comment-list .comment .content {width: 300px;}\
#watch-description-clip {width: 300px;}\
#yt-masthead-user {margin-left: 5px;}\
#watch7-secondary-actions {float: left; margin-top: 22px; zoom: 0.9;  -moz-transform: scale(0.9); -moz-transform-origin: 0 0;  -o-transform: scale(0.9);}\
#watch7-action-panels {border: 0px;  border-bottom: 1px solid #292929;}\
.yt-uix-button-panel {margin-left: 2px;}\
.comments-pagination, #action-panel-share .share-panel {zoom: 0.8;  -moz-transform: scale(0.8);  -moz-transform-origin: 0 0; -o-transform: scale(0.8);}\
.caption-line-text {width: 300px;}\
p.metadata {zoom: 0.8;  -moz-transform: scale(0.8); -moz-transform-origin: 0 0; -o-transform: scale(0.8); position:absolute; bottom:2px; right:0;}\
#comments-view .comment {margin: 0 0 14px;}\
#comments-view .comment-actions {zoom: 0.8;  -moz-transform: scale(0.8); -moz-transform-origin: 0 0; -o-transform: scale(0.8); opacity:0.4; margin-right: 175px;}\
#comments-view .comment.child, #comments-view .comment .comments-post {margin-left: 0px;}\
#yt-masthead-dropdown {position: relative; display: inline-block; border: 7px solid transparent; border-top-color: #999; top: 9px; right:3px;}\
#comments-view .comment-text p, #comments-view h4, #comments-view h4 a {margin: 0px 0; overflow: visible;}\
#comments-view h4, #comments-view h4 a {margin-top: 10px;}\
.yt-uix-pager, #comments-view .comments-pagination {zoom: 0.8;  -moz-transform: scale(0.8); -moz-transform-origin: 0 0; -o-transform: scale(0.8);}\
#yt-masthead #search-btn .yt-uix-button-content {margin: 0 8px;}\
body { overflow-x: hidden; }\
#player-api, .watch-medium #player-api, .watch-large #player-api, #player-legacy, .site-left-aligned.guide-enabled #player-legacy {height:100%; width:100%; overflow-y:hidden; background: transparent; z-index:3333}\
#watch-description.yt-uix-expander-collapsed {cursor: default;}\
.comments-post-alert, .comments-textarea-container textarea {height: 16px;}\
#comments-view .video-thumb.yt-thumb.yt-thumb-48 {height: 28px; width: 28px; z-index:-90;}\
 #comments-view .comments-textarea-container {margin-left: 18px; width:250px;}\
#comments-view .content, #comments-view .comment.child, #comments-view .comment .child, #comments-view .comment .comments-post, #comments-view .comments-approval-hold-warning, #comments-view .comments-remaining, #comments-view .comments-threshold-countdown {margin-left: 0px; width:300px; position: relative;}\
.comments-post.has-focus .needs-focus {zoom: 0.9; -moz-transform: scale(0.9); -moz-transform-origin: 0 0;  -o-transform: scale(0.9); margin-right: 16px;}\
.comments-post-buttons {z-index: 2;}\
#page.watch {padding-top: 0px;}\
.watch7-playlist-bar-left {position: fixed;bottom: 0;left: 0;z-index: 999;width: 344px; zoom: 0.9;  -moz-transform: scale(0.9); -moz-transform-origin: 0 100%; -o-transform: scale(0.9);}\
.watch7-playlist-bar-right {z-index: 980; left: 0; bottom: 0; width: 348px; position: fixed; margin-left: -4px; height:27.5%; zoom: 0.9;  -moz-transform: scale(0.9); -moz-transform-origin: 0 100%; -o-transform: scale(0.9);}\
#watch7-playlist-tray-container {z-index: 990; left: 0; bottom: 0; width: 348px; position: fixed; margin-left: -4px; height:25%; zoom: 0.9;  -moz-transform: scale(0.9); -moz-transform-origin: 0 100%; -o-transform: scale(0.9);}\
#watch7-playlist-tray .video-list-item a {padding: 4px 0;}\
#ytclBtnLoad, #ytclExpand {zoom:0.8; display:none;}\
#ytclProgressOverlay, #ytclProgress, #ytcl-progress-inner, #ytcl-progress-bar-wrapper {display:none !important; visibility: hidden !important; opacity:0 !important;}\
#watch-headline-title .YouTubeLyricsByRobWPageActionIcon, .LyricsHereByRobWPageActionIcon {position: absolute; top: 66px !important; right: 22px !important; zoom: 0.6;}\
#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy, #watch7-main, #playlist {min-width: 0px !important;}\
#comments-view .comment, #comments-view .comments-post, #comments-view .video-list {position: static !important;}\
.watch-sidebar {margin-right: 0px;}\
.yt-default h1, .yt-default h2, .yt-default h3, .yt-default h4, .yt-default h5, .yt-default h6, h1.yt, h2.yt, h3.yt, h4.yt, h5.yt, h6.yt {margin-bottom: 6px;}\
#comments-view .yt-user-photo, .comments-textarea-container .comments-textarea-tip, #comments-view .comment .close, .exp-top-guide #masthead-positioner-height-offset, .exp-top-guide #masthead-positioner-height-offset, #masthead-appbar {display: none;}\
p.metadata {opacity:0;}\
#comments-view .comment:hover p.metadata {opacity:0.4;}\
#watch-discussion .yt-uix-button {height: 15px;}\
#watch7-sidebar .watch-sidebar-section {margin:0;}\
.comments-pagination {text-align: left; padding-top: 2px; display:none;}\
.video-list-item {margin-bottom: 10px;}\
#watch-description.yt-uix-expander-collapsed #watch-description-content {margin-bottom: 0px;}\
#masthead-positioner {right:auto; width:311px;}\
.site-center-aligned.flex-width-enabled #alerts, .site-center-aligned.flex-width-enabled #content, .site-center-aligned .yt-base-gutter {min-width: 0;}\
.cardified-page #masthead-appbar-container {background-color: transparent !important; border-bottem:0px; -webkit-box-shadow: none; box-shadow: none; }\
#appbar-primary-container {width: 36px; overflow: hidden; zoom: 0.9;}\
.site-center-aligned .yt-base-gutter {padding-left: 0px;padding-right: 0px;}\
#watch7-action-panels #watch7-action-panel-footer {display: none !important;}\
#watch7-sidebar .watch-sidebar-section {width: 311px !important;}\
\ ");
// .yt-uix-button {border:none !important;}\

  var element = $('#playlist-tray, #watch7-playlist-tray-container').detach();
$('#content').append(element);
  
    var element = $('#playlist').detach();
$('#content').append(element);

        var element = $('#playlist-legacy').detach();
$('#content').append(element);
 

/*#watch7-playlist-tray, #watch7-playlist-tray-mask {border:0px !important; position: fixed; z-index: 3; width: 346px; height: auto; background: #2B2B2B; left: 0; bottom: 34px; zoom:0.9;  -moz-transform: scale(0.9); -moz-transform-origin: 0 150px 0;  -o-transform: scale(0.9);}\
.watch7-playlist-bar {height:50px; border-top: 0px !important;}\
.sidebar-expanded .watch7-playlist-bar-right, #watch7-playlist-tray-container {width: 314px; z-index: 9; left: 0; bottom:0; position: fixed; margin-left: -4px;}\
#player-container, .watch7-playlist {padding-top:0 !important;}\
#watch7-playlist-tray { height: 22%; }\
*/

  
  
  
  
  
  
//----------- Z X C Keydown func.  
  
function GRT_key(event) {
   element = event.target;
   elementName = element.nodeName.toLowerCase();
   if (elementName == "input") {
     typing = (element.type == "text" || element.type == "password");
   } else {
     typing = (elementName == "textarea");
   }
   if (typing) return true;
   if (String.fromCharCode(event.which)=="Z" && !event.ctrlKey && !event.altKey && !event.metaKey) {
       if (GM_config.get("reverser")) {       $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","0px" );  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","0px" ); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "width","100%" );  $("#lightsOut, #watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "display","none" ); }else{ 
       $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","0px" );  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","0px" ); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "width","100%" );  $("#lightsOut, #watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "display","none" );
 		}
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }
       if (String.fromCharCode(event.which)=="X" && !event.ctrlKey && !event.altKey && !event.metaKey) {
       if (GM_config.get("reverser")) {   $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-moz-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-webkit-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-o-calc(100% - 312px)");  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","calc(100% - 312px)");     $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","311px" );  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","1px" );   $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "display","block" ); }else{ 
       $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-moz-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-webkit-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-o-calc(100% - 312px)");  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","calc(100% - 312px)");    $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","311px" );  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","1px" );   $(".watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container, #watch7-main-container, #yt-masthead-container").css( "display","block" );
 		}
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }
        if (String.fromCharCode(event.which)=="C" && !event.ctrlKey && !event.altKey && !event.metaKey) {
 
GM_config.open();
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }  
 }
      
document.addEventListener("keydown", GRT_key, false);
if (!GM_config.get("nomouse")) {
//document.addEventListener("keydown", GRT_key, false);
$("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").bind('mousedown', function(e) { 
   if( (e.which == 2) ) {
      e.preventDefault();
      if (GM_config.get("reverser")) {        $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","0px" );  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","1px" ); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "width","100%" ); $("#lightsOut, #watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "display","none" ); }
      else  { $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","0px" );  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","1px" ); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "width","100%" ); $("#lightsOut, #watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "display","none" );
}
}});
    if (!GM_config.get("reverser")) {
$(window).mousemove(function(e) {
   var now = e.pageX;
   var past =  $(window).width()-2;
   if(now > past) {   $("#lightsOut, #watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "display","none" ); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "width","100%" ); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","0px" ); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","0px" );
  }
});
    }
    else{
        $(window).mousemove(function(e) {
   var now = e.pageX;
   var past = 2;
   if(now < past) {   $("#lightsOut, #watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "display","none" ); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "width","100%" ); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","0px" ); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","0px" );
  }
});
    }
}

if (GM_config.get("reverser")) {
    $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","311px" );
    $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","1px" );
    $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-moz-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-webkit-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-o-calc(100% - 312px)");  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","calc(100% - 312px)"); 
    $("#watch7-main-container, #yt-masthead-container").css( "right","0" );
    $("#watch7-main-container, #yt-masthead-container").css( "left","auto" );
    $("#watch7-main-container, #yt-masthead-container").css( "float","right" );
    $("#watch7-playlist-tray, #watch7-playlist-tray-mask").css( "right","0" );
    $("#watch7-playlist-tray, #watch7-playlist-tray-mask").css( "left","4px" );
    $(".watch7-playlist-bar-right, #watch7-playlist-tray-container, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "right","0" );
    $(".watch7-playlist-bar-right, #watch7-playlist-tray-container, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "left","auto" );
}                 
if (GM_config.get("sbhider")) {
   $(document).ready(function() {
       GM_addStyle("::-webkit-scrollbar { display: none !important; }" );
       });
 }      

 if (GM_config.get("hider")) {
    $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","0px" );
    $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","0px" );
    $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "width","100%" );
    $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container, #lightsOut").css( "display","none" );
    }
if (!GM_config.get("hider")) {  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-moz-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-webkit-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-o-calc(100% - 312px)");  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","calc(100% - 312px)");  $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "display","block" );}     
if (!GM_config.get("reverser")) {
    $(window).bind('mousewheel', function () { $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "display","block" ); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-moz-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-webkit-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-o-calc(100% - 312px)");  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","calc(100% - 312px)");   $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","311px" );  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","1px" );  } );
    $(window).bind('DOMMouseScroll', function () { $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-moz-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-webkit-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-o-calc(100% - 312px)");  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","calc(100% - 312px)");  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","311px" );  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","1px" );    $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "display","block" );} );
    }
else {
    $(window).bind('mousewheel', function () { $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-moz-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-webkit-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-o-calc(100% - 312px)");  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","calc(100% - 312px)");  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","311px" );    $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "display","block" );  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","1px" );} );
    $(window).bind('DOMMouseScroll', function () { $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-moz-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-webkit-calc(100% - 312px)"); $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","-o-calc(100% - 312px)");  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css("width","calc(100% - 312px)");  $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-right","311px" );   $("#player, #player-legacy, .site-left-aligned.guide-enabled #player-legacy").css( "padding-left","1px" );  $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray-container, #watch7-playlist-tray, .watch7-playlist-bar-left, #watch7-playlist-tray-container").css( "display","block" );} );
    }
    
if(document.getElementById("watch7-ytcenter-buttons")) {
        $("#watch7-ytcenter-buttons").css( "zoom","0.8" );
        $("#watch7-ytcenter-buttons").css( "-moz-transform","scale(0.8)" );
        $("#watch7-ytcenter-buttons").css( "-moz-transform-origin","0 0" );
        $("#watch7-views-info").css( "top","88px" );
    }
if (GM_config.get("cshider")) {
    GM_addStyle("#watch7-discussion {display:none;}" );
 }
if (GM_config.get("rvhider")) {
    GM_addStyle("#watch7-sidebar {display:none;}" );
 }
if (GM_config.get("ybhider")) {
    GM_addStyle("#watch7-main-container {margin-top: 0px; z-index:8;}" );
 }
if (GM_config.get("ybfixer")) {
    GM_addStyle("#yt-masthead-container.yt-grid-box {position:fixed; }" );
 }
if (GM_config.get("lbhider")) {
    GM_addStyle("#watch7-views-info, watch7-sentiment-actions {display:none;}" );
 }
      
     



        
if (!GM_config.get("vrhider")) {
     GM_addStyle("#comments-view .video-list {display:block; }" );
    }
        
                  if (GM_config.get("collapse")) {
 $("#watch-discussion").css( "max-height","244px" ); 
 $("#watch-discussion").css( "overflow","hidden" ); 
 $("#watch-discussion").on( 'mouseenter', function(){
    timer2 = setTimeout(function () {  $("#watch-discussion").css( "height","auto" ); $("#watch-discussion").css( "max-height","none" );  $(".comments-pagination").css( "display","block" );  }, 700);
}); 
    $('#watch-discussion').mouseleave(function() {
    clearTimeout(timer2);
}); 
} 
 
    

        var p;
    $(".watch7-playlist-bar-left, #watch7-playlist-tray-container").click(function(){
      if ( p ) {
        p.appendTo("body");
        p = null;
      } else {
        p = $(".watch7-playlist-bar-right, #watch7-playlist-tray-container").detach();
      }
        });
      
 




var toge = document.createElement('button');
toge.setAttribute('style', 'padding: 0px 5px; opacity:1; zoom:0.8; margin-left: 9px;  -moz-transform: scale(0.8); -moz-transform-origin: 0 0; -o-transform: scale(0.8);');
toge.setAttribute('class','yt-subscription-button  yt-uix-button yt-uix-button-hh-default yt-uix-tooltip');
var togplacese = document.getElementById("watch7-user-header");
	togplacese.appendChild(toge);
	toge.addEventListener('click', function() { GM_config.open() }, false);
var offButton2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAFM0aXcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAkFJREFUeNpi+v//P8OqVatcmVavXt3JwMDwGAAAAP//Yvr//z/D////GZhWr179f/Xq1RMBAAAA//9igqr5D8WKTAwQ0MPAwPCEgYGhBwAAAP//TMtBEUBQAAXA9ZsII8IrIIQOBHF5EdwU42TGffcT+/8e2No+MLAmmaDtMnC3PTEnuV4AAAD//zTOQRGCUAAG4YWrCbxSwQzYYDt452AGHCKQ4H9gAYNwcsabMeDyKLD7nY01SZfkn2ROMiV5n80euABf9VoFA3ArpYyt+gEe9bEDW6Uu6rMFUH8VcgdeaqMOAAcZZIiDMBQE0cdv0jQhQREMGDRB9B5Ihssguc2OhHsg4ACoKhQgSIPAbDGsG7GZee/HHhFVRByHPPRPbJ+BGbCxPU5HdQHewBrosvMFXCX1BTgAVQ4ZAXdgZftWgB3/9wRcJC3T8jaRpulgX2zXwAKY51cDXICmSOqTrQNOwEdSK+nxZZJ8VSIKoyD+24uw3CAIYhAEBZNdbK6r0ShM9AH2abRpNwhnwEfQVaPYDQZBk4KIZTX4p8wut33nMMw3Z2a6d/aqqp93W1WvSfm4gxlUVTvzIfYOgF/gy/ZzrF6KjJHtx+i9Bu5st9MeIOkGWAO+o38VuAJOgTdgPUQXwCYwB9DYHof1CegHdChpT9JI0gpwm/0BMAE+bY8bSUNgPil9BHRm+9L2ie0XYDv7+5jXkzScNv4HOAcWMr8Du6nccn5+SB//4tHs5gmwBeyEdRE46hDtS9pIhk084n8AVJscCePQvIsAAAAASUVORK5CYII=";
var imgLights2 = toge.appendChild(document.createElement('img'));
    imgLights2.alt = '';
    imgLights2.src = offButton2;
    imgLights2.setAttribute('style', 'padding: 0px 0px;');
function toggles3() {
GM_config.open()
}
if (GM_config.get("expander")) {
  $("#watch-description-content").css( "height","auto" );
  $("#watch-description-expand, #watch-description-collapse").css( "display","none" );
  $("#watch-description-extras").css( "display","block" );
    }
var timer;
if (GM_config.get("expande2")) {
  $("#watch-description-expand, #watch-description-collapse").css( "display","none" );
  $("#watch-description-content.extra-info").css( "min-height","0px" ).css( "height","auto").css( "max-height","119px" );
  $("#watch-description").on( 'mouseenter', function(){
    timer = setTimeout(function () { $("#watch-description-content").css( "height","auto" );  $("#watch-description-extras").css( "display","block" );   $("#watch-description-content.extra-info").css( "max-height","auto" );}, 700);
});
    $('#watch-description').mouseleave(function() {
    clearTimeout(timer);
});
    }

if (GM_config.get("collapse")) {
 $("#comments-view").css( "max-height","300px" ); 
 $("#comments-view").css( "overflow","hidden" );  
 $("#comments-view").on( 'mouseenter', function(){
    timer2 = setTimeout(function () {  $("#comments-view").css( "height","auto" ); $("#comments-view").css( "max-height","none" ); }, 700);
}); 
    $('#comments-view').mouseleave(function() {
    clearTimeout(timer2);
}); 
}         
if (GM_config.get("collaps2")) {
 $("#watch7-sidebar").css( "height","233px" ).css( "opacity","0.3" );; 
 $("#watch7-sidebar").css( "overflow","hidden" );       
 $("#watch7-sidebar").on( 'mouseenter', function(){
    timer3 = setTimeout(function () {  $("#watch7-sidebar").css( "height","auto" ); $("#watch7-sidebar").css( "opacity","0.9" );  }, 700);
}); 
        $('#watch7-sidebar').mouseleave(function() {
    clearTimeout(timer3);
}); 
} 

if (!GM_config.get("cooler")) {
GM_addStyle("#watch7-content, #watch7-headline, #watch7-notification-area, #watch7-user-header, #watch7-action-panels #watch7-action-panel-footer, .watch-branded #watch7-sidebar, #watch7-sidebar, #player-container {background:#F1F1F1;}" ); 
}


//meşhur kapama
}
//sakın silme



// flashla ilgili

for (var ems = document.embeds, i = 0, em; em = ems[i]; i++) {
	em.setAttribute('wmode', 'direct');
	var nx = em.nextSibling, pn = em.parentNode;
	pn.removeChild(em);
	pn.insertBefore(em, nx);
}



// Logo redirection

if (GM_config.get("relogo")) {
document.getElementById("logo-container").href = "/feed/subscriptions/u";
}











//---------- Youtube Thumbs

const LOOP_INTERVAL = 1000; // 1000 = 1 second
var loopHandler, img, imgs;

document.addEventListener('mouseover', mo, false);

function mo(evt)
{
	if( evt.target.nodeName=='IMG' && evt.target.getAttribute('src') && (evt.target.getAttribute('src').search(/default\.jpg$/)>-1 || 
	evt.target.getAttribute('src').search(/0\.jpg$/)>-1) )     // vfede's fix
	{
		start(evt);
		evt.target.addEventListener('mouseout', end, false);		
	}
}

function start(evt) {
	img = evt.target;
	imgZIndex(evt);
	img.setAttribute('src', img.getAttribute('src').replace(/\/[^\/]+\.jpg$/, '/1.jpg'));
	loopHandler = setInterval(loop, LOOP_INTERVAL);
}

function loop() {
	var num = parseInt( img.getAttribute('src').match(/(\d)\.jpg$/)[1] );
        if(num==1) 
		num++; // vfede's fix
	if(num==3) 
		num = 0;	
	else 
		num++;
	img.setAttribute('src', img.getAttribute('src').replace(/\d\.jpg$/, +num+'.jpg')); 
}

function end(evt) {
	var node;
	clearInterval(loopHandler);
	evt.target.setAttribute('src', img.getAttribute('src').replace(/\/[^\/]+\.jpg$/, '/0.jpg'));            // vfede's fix
	img.style.zIndex = null;
	img = null;
}

function imgZIndex(evt) {
	if(GM_getValue('noButtons') || evt.ctrlKey){
		img.style.zIndex = '999999999';
	}else{
		img.style.zIndex = null;
	}	
}






//-------Youtube Ratings Bar

var loaded = {};
var containerName="yt-thumb-default"
loaded[""] = true;
window.addEventListener (
    'scroll',
    function (e) {
      iterateClips(document.getElementsByClassName(containerName));
    },
    false);
var wm = document.getElementById("watch-more-related");
if (wm) {
  // On "Load More Suggestions" button click
  wm.addEventListener (
    'DOMNodeInserted',
    function (e) {
      iterateClips(e.target.getElementsByClassName(containerName));
    },
    false);
}

// starts here 
iterateClips(document.getElementsByClassName(containerName));

function iterateClips(clips)
{
  if (clips)
  {
    for (var i=0; i<clips.length; ++i) 
      if (isVisible(clips[i])) 
        requestRating(clips[i]);
  } 
}

function requestRating(box)
{ 
  var id = getVideoId(box);

  if (loaded[id])
    return;

  loaded[id] = true;
  setTimeout( function() {
    GM_xmlhttpRequest({
      method: 'GET',
      url: "http://gdata.youtube.com/feeds/api/videos/" + id + "?v=2&alt=json&fields=yt:rating",
      onload: function(response) 
      {
        if (response.status == 200) 
        {
          var rsp = eval( '(' + response.responseText + ')' );
          if (rsp && rsp.entry && rsp.entry.yt$rating)
            attachBar(box, parseInt(rsp.entry.yt$rating.numLikes),
                           parseInt(rsp.entry.yt$rating.numDislikes));
        } 
        else
          delete loaded[id]; // give it a chance to reload while scrolling 
      }
    });
  }, 0);
}

function getVideoId(box)
{
  var anchor=box.parentNode.parentNode;
  var isAnchorFound = 2;
  while (anchor && anchor.tagName != undefined) 
  {
    if (anchor.tagName.toLowerCase()=="a")
      break;
    anchor = anchor.parentNode; 
    --isAnchorFound;
    if (0==isAnchorFound)
      break;
  }
  if ( isAnchorFound>0 )
  {
    var href = anchor.getAttribute("href");
    if (href)
    {
      var id = href.replace(/.*v=([^&]*).*/, "$1");
      if (id.length<href.length) 
        return id;
    }
  }
  return "";
}

function attachBar(videoThumb, likes, dislikes) 
{
  var total = likes + dislikes;

  if (total > 0)
  {
    var ratingDiv = document.createElement("div");
    ratingDiv.setAttribute("class", "video-extras-sparkbarks");
    ratingDiv.setAttribute("style", "position: relative; top: 1px;" );
    ratingDiv.setAttribute("title",  likes + " likes, " + dislikes + " dislikes");

    var likesDiv = document.createElement("div");
    likesDiv.setAttribute("class", "video-extras-sparkbar-likes"); 
    likesDiv.setAttribute("style", "height: 4px; width: "+(100*likes)/total+"%"); 

    var dislikesDiv = document.createElement("div");
    dislikesDiv.setAttribute("class", "video-extras-sparkbar-dislikes"); 
    dislikesDiv.setAttribute("style", "height: 4px; width: "+(100*dislikes)/total+"%;"+"background: #C00;"); 

    ratingDiv.appendChild(likesDiv);
    ratingDiv.appendChild(dislikesDiv);
    videoThumb.parentNode.parentNode.appendChild(ratingDiv);
    //videoThumb.appendChild(ratingDiv);

    // fixing time element position to be inside of the thumb image
    var spans = videoThumb.parentNode.parentNode.getElementsByTagName("span");
    for (var i=0; i<spans.length; ++i )
      if (spans[i].getAttribute("class")=="video-time")
      {
        spans[i].style.bottom = "6px";
        break;
      }
  }
}

function isVisible ( el )
{
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
 );
} 
