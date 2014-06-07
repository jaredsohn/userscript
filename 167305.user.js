// ==UserScript==
// @name        IMO Waz Toolz
// @namespace   imo_addon_waz
// @author      Wazir A
// @description IMO Waz Toolz (Translation + Compact Buddy List + Left-Side Buddy List)
// @include     https://imo.im*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @updateURL   https://userscripts.org/scripts/source/167305.meta.js
// @downloadURL https://userscripts.org/scripts/source/167305.user.js
// @grant       GM_xmlhttpRequest
// @version     1.1
// ==/UserScript==
// Updating to try and fix Install counter - 21Jun13
/** 
 * IMO Waz Toolz - http://userscripts.org/scripts/show/167305
 *
 * TERMS OF USE - IMO Waz Toolz
 * Open source under the BSD License.
 * 
 * Copyright © 2013, Wazir A
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met: 
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer. 
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution. 
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * The views and conclusions contained in the software and documentation are those
 * of the authors and should not be interpreted as representing official policies, 
 * either expressed or implied, of the FreeBSD Project.
 */

var KEYCODE_F8 = 119;
var KEYCODE_F9 = 120;
var KEYCODE_F10 = 121;
var KEYCODE_ENTER = 13;

$(function() {
    // Get Current Window Id - User un helper functions below
    var currentWindowId = 'div[class="windowbody"]';
    var addon_wa = {};	// Prefs for this addon

    // Setup languages
    var languages = {en:'English',ar:'Arabic',bg:'Bulgarian',ca:'Catalan',zh_CN:'Chinese (simplified)',zh_TW:'Chinese (traditional)',hr:'Croatian',cs:'Czech',da:'Danish',nl:'Dutch',et:'Estonian',tl:'Filipino',fi:'Finnish',fr:'French',de:'German',el:'Greek',iw:'Hebrew',hi:'Hindi',hu:'Hungarian',is:'Icelandic',id:'Indonesian',it:'Italian',ja:'Japanese',ko:'Korean',lv:'Latvian',lt:'Lithuanian',no:'Norwegian',pl:'Polish',pt:'Portuguese',ro:'Romanian',ru:'Russian',sr:'Serbian',sk:'Slovak',sl:'Slovenian',es:'Spanish',sv:'Swedish',th:'Thai',tr:'Turkish',uk:'Ukrainian',ur:'Urdu',vi:'Vietnamese'};

    // Build language dropdown html
    var languagesDrowdownOptionsHtml = '';
    for (var key in languages) {
        languagesDrowdownOptionsHtml += '<option value="' + key + '">' + languages[key] + '</option>';
    }

    // Load preferences
    waitUntilExists('blist', function() {
        waitUntilExists.stop("blist");
        loadPreferences();
    });

    /**
     * Helper Functions
     */

    function savePreferences() {
        if (!localStorage) {
            location.href = 'javascript:void(IMO.NM.add_notification("Unable to save preferences for Waz Toolz. Some or all of the features may not work as intended.",IMO.REUI.Notification.types.error,{momentary:true}))';
            return;
        }

        // Save in localStorage
        localStorage['addon_wa'] = JSON.stringify(addon_wa);
    }

    function loadPreferences() {
        if (!localStorage) {
            location.href = 'javascript:void(IMO.NM.add_notification("Unable to load preferences for Waz Toolz. Some or all of the features may not work as intended.",IMO.REUI.Notification.types.error,{momentary:true}))';
            return;
        }

        // Initialize/Retrieve Preferences

        if (typeof localStorage['addon_wa'] === 'undefined') {
            // Default prefs
            addon_wa.prefs = {};
            addon_wa.prefs.translation_enabled = true;
            addon_wa.prefs.show_original_enabled = true;
            addon_wa.prefs.back_translate_enabled = true;
            addon_wa.prefs.translation_my_lang = 'en';
            addon_wa.prefs.minimal_list_enabled = true;
            addon_wa.prefs.buddypanel_left_position_left = true;	// true=left | false=right (default)
            addon_wa.contacts = {};
            //addon_wa.contacts.contact_hash = {};
            //addon_wa.contacts.contact_hash.lang = 'en';

            // Save in localStorage
            savePreferences();
        }
        else {
            // Load prefs from localStorage
            addon_wa = JSON.parse(localStorage['addon_wa']);
        }

        if (addon_wa.prefs.translation_enabled) {
            injectTranslationControls();
            registerTranslationEvents();
            $('<style>div#imo.addon-wa-translation-enabled .floatingwindowholder{min-width:448px!important;}</style>').appendTo('head');
            $('div#imo').addClass('addon-wa-translation-enabled');
        }

        if (addon_wa.prefs.minimal_list_enabled) {
            enableMinimalList();
        }

        if (addon_wa.prefs.buddypanel_left_position_left) {
            enableBuddyPanelLeft();
        }

        // Inject Addon Styles
        injectBuddyPanelLeftStyles();
        injectMinimalListStyles();

        // Customize Active Chat Style - Set background color, etc.
        customizeActiveChatStyle();

        // Load bootstrap style
        $('<style>.bootstrap-btn { -moz-border-bottom-colors: none; -moz-border-left-colors: none; -moz-border-right-colors: none; -moz-border-top-colors: none; background-color: #F5F5F5; background-image: linear-gradient(to bottom, #FFFFFF, #E6E6E6); background-repeat: repeat-x; border-color: #CCCCCC #CCCCCC #B3B3B3; border-image: none; border-radius: 4px 4px 4px 4px; border-style: solid; border-width: 1px; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 1px 2px rgba(0, 0, 0, 0.05); color: #333333; cursor: pointer; display: inline-block; font-size: 14px; line-height: 20px; margin-bottom: 0; padding: 4px 12px; text-align: center; text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75); vertical-align: middle; font-family: "Helvetica Neue",Helvetica,Arial,sans-serif; font-weight: normal;}.bootstrap-select { background-color: #FFFFFF; border: 1px solid #CCCCCC; width: 120px; height: 30px; margin-top: 11px; border-radius: 4px 4px 4px 4px; color: #555555; display: inline-block; font-size: 14px; line-height: 20px; margin-bottom: 10px; padding: 4px 6px; vertical-align: middle; font-family: "Helvetica Neue",Helvetica,Arial,sans-serif; font-weight: normal; cursor: pointer;}.bootstrap-btn:hover,.bootstrap-btn:focus,.bootstrap-btn:active,.bootstrap-btn.active,.bootstrap-btn.disabled,.bootstrap-btn[disabled] { background-color: #d9d9d9; background-color: #e6e6e6; color: #333333; } .bootstrap-btn:active,.bootstrap-btn.active { background-color: #cccccc \9; } .bootstrap-btn:first-child { margin-left: 0; } .bootstrap-btn:hover,.bootstrap-btn:focus { background-position: 0 -15px; color: #333333; moz-transition: background-position 0.1s linear; o-transition: background-position 0.1s linear; text-decoration: none; transition: background-position 0.1s linear; webkit-transition: background-position 0.1s linear; } .bootstrap-btn:focus { outline: 5px auto -webkit-focus-ring-color; outline: thin dotted #333; outline-offset: -2px; } .bootstrap-btn.active,.bootstrap-btn:active { background-image: none; box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05); moz-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05); outline: 0; webkit-box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05); } .bootstrap-btn.disabled,.bootstrap-btn[disabled] { background-image: none; box-shadow: none; cursor: default; filter: alpha(opacity=65); moz-box-shadow: none; opacity: 0.65; webkit-box-shadow: none; }bootstrap-select:focus { outline: thin dotted #333333; outline-offset: -2px; background-color: #FFFFFF; border: 1px solid #CCCCCC; width: 120px; height: 30px; line-height: 30px; border-radius: 4px 4px 4px 4px; color: #555555; display: inline-block; font-size: 14px; margin-bottom: 10px; padding: 4px 6px; vertical-align: middle; font-family: "Helvetica Neue",Helvetica,Arial,sans-serif; font-weight: normal; cursor: pointer;}</style>').appendTo('head');

        location.href = 'javascript:void(IMO.NM.add_notification("Addon Loaded: Waz Toolz",IMO.REUI.Notification.types.info,{momentary:true}))';
    }

    function injectBuddyPanelLeftStyles() {
        $('<style>div#imo.addon-wa-buddypanel-left div#account-console div.accounts-list{padding:10px 0 10px 10px!important;} div#imo.addon-wa-buddypanel-left .notification-container{left:auto!important;right:70px!important;top:100px;} div#imo.addon-wa-buddypanel-left #mnp-panel{left:auto!important;right:0!important} div#imo.addon-wa-buddypanel-left div#body div#main.with_mnp{right:300px!important} div#imo.addon-wa-buddypanel-left div#body div#main{left:300px!important;right:0!important} div#imo.addon-wa-buddypanel-left div#header div#account-bar{float:left!important} div#imo.addon-wa-buddypanel-left div#header ul{left:400px!important;top:0!important} div#imo.addon-wa-buddypanel-left div#header img.sprite_logo_small_2{float:none!important} div#imo.addon-wa-buddypanel-left div#blist .options_container{right:120px!important} div#imo.addon-wa-buddypanel-left div#buddypanel{left:0!important;position:absolute!important;right:auto!important} div#imo.addon-wa-buddypanel-left div.tooltip{left:300px!important;right:auto!important} div#imo.addon-wa-buddypanel-left div#account-console,div#imo.addon-wa-buddypanel-left div.statusmsg-popup,div#imo.addon-wa-buddypanel-left div#buddysearch .options-container,div#imo.addon-wa-buddypanel-left div.tooltip div.tooltip-arrow{left:0!important;right:auto!important}</style>').appendTo('head');
    }
    function injectMinimalListStyles() {
        $('<style>div#imo.addon-wa-minimal-list div#buddypanel div#buddysearch{height:27px!important} div#imo.addon-wa-minimal-list div#buddypanel div#buddysearch > *{margin:5px 0 0 11px !important} div#imo.addon-wa-minimal-list div#buddypanel div#buddysearch #buddysearch_input_div{margin:2px 0!important} div#imo.addon-wa-minimal-list div#buddypanel div#buddysearch #buddysearch_input_div input{height:20px!important} div#imo.addon-wa-minimal-list div#buddypanel div#buddysearch #buddysearch_input_div img{top:3px!important} div#imo.addon-wa-minimal-list .sprite_profile_popover_arrow{background-position:-672px -80px!important} div#imo.addon-wa-minimal-list div#buddypanel div.bar.white span.title{left:30px!important} div#imo.addon-wa-minimal-list div#buddypanel div.blist-container .buddyitem .buddyimg{margin:-10px 10px!important} div#imo.addon-wa-minimal-list div#buddypanel div.blist-container.icon_view .buddyitem{font-size:12px!important;height:20px!important;line-height:20px!important} div#imo.addon-wa-minimal-list div#buddypanel div.blist-container.icon_view .buddyitem span.imgwrap{height:20px!important} div#imo.addon-wa-minimal-list div#buddypanel div.blist-container.icon_view .buddyitem img.icon{width:20px!important} div#imo.addon-wa-minimal-list div.bar{font-size:14px!important} div#imo.addon-wa-minimal-list div.bar.white{height:20px!important;line-height:20px!important} div#imo.addon-wa-minimal-list div#buddypanel div.blist-container.icon_view .buddyitem .control_container .control_buttons .control_button{margin-top:1px!important} div#imo.addon-wa-minimal-list div#buddypanel div.bar.white .button img.sprite_icn_expand,div#imo.addon-wa-minimal-list div#buddypanel div.bar.white .button img.sprite_icn_collapse{margin:2px 0!important}</style>').appendTo('head');
    }

    function enableBuddyPanelLeft() {
        $('div#imo').addClass('addon-wa-buddypanel-left');
    }
    function disableBuddyPanelLeft() {
        $('div#imo').removeClass('addon-wa-buddypanel-left');
    }

    function enableMinimalList() {
        $('div#imo').addClass('addon-wa-minimal-list');
    }
    function disableMinimalList() {
        $('div#imo').removeClass('addon-wa-minimal-list');
    }

    function customizeActiveChatStyle() {
        $('<style>.buddyitem.active.focused { background-color: powderblue !important; } div.titlebar-tabbed.focused { background-color: powderblue !important; } .convlog .convlogitem.bk0 { background-color: palegoldenrod;} </style>').appendTo('head');
    }

    function injectTranslationControls() {
        if ($('.buddyitem.active.focused').length) {

            // Make space for translator controls
            $(currentWindowId).find('.convpanel div.convmain div.convbottom').css('height', '88px');
            $(currentWindowId).find('.convlog').css('bottom', '88px');
            $(currentWindowId).find('.convpanel div.convmain div.convbottom div.convinput').css('top', '30px');
            $(currentWindowId).find('.convpanel div.convmain div.convbottom div.convtyping').css('left', '6px');
            $(currentWindowId).find('.convpanel div.convmain div.convbottom div.primary-button, .convpanel div.convmain div.convbottom div.voicerecord').css('top', '30px');

            // Attach translator controls
            if ($(currentWindowId).find('.translation-controls').length == 0) {
                $(currentWindowId).find('.convinput').before('<div class="translation-controls" style="margin-left: 3px; margin-top: -9px;"><button class="translate-btn bootstrap-btn">Translate (F8)</button> <button class="translate-incoming-btn bootstrap-btn">Translate Incoming (F10)</button> <select class="translate-languages bootstrap-select">' + languagesDrowdownOptionsHtml + '</select> <span style="margin-left: 5px; color: teal;">Tip: F9 = translate + send</span><span style="float: right; margin-right: 75px; margin-top: 5px; color: crimson; font-weight: bold;" class="translation-error" original-msg="" back-translate-msg=""></span></div>');

                // Inject placeholder message for chat box
                $(currentWindowId).find('.convinput-text-container textarea').attr('placeholder', 'You are now chatting with ' + $('.buddyitem.active.focused .accountdisplay .display').text());
            }

            // Select saved language for contact
            var contactUid = getActiveContactId();
            // Save language preference for current contact			
            if (typeof addon_wa.contacts[contactUid] === 'undefined') {
                addon_wa.contacts[contactUid] = {};
            }

            if (typeof addon_wa.contacts[contactUid]['lang'] === 'undefined') {
                $(currentWindowId).find('.translate-languages').change();
            } else {
                $(currentWindowId).find('.translate-languages').val(addon_wa.contacts[contactUid]['lang']);
            }
        }
    }

    // Translate incoming messages
    function translateIncomingMessages() {
        // Get incoming messages not translated
        $(currentWindowId).find('.convlogitem.bk0:not(:has(.translated-msg))').each(function(index, val) {
            var $lastMessage = $(this);

            // Get message to be translated
            var qString = $lastMessage.find('.ms span').text();
            var sl = $(currentWindowId).find('.translate-languages').val();
            var tl = addon_wa.prefs.translation_my_lang;
            ;
            doTranslation(qString, sl, tl, function(translatedText) {
                $lastMessage.append('<div class="translated-msg" style="color: crimson;"><span style="font-weight: bold; margin-left: 3px;">Translated:</span> <span>' + translatedText + '</span></div>');
                $(currentWindowId).find('.convlog').scrollTop($(currentWindowId).find('.convlog').height())
            });
        });
    }

    // Translate message before sending
    function translateOutgoingMessageBeforeSend(qString, translatedText) {
        // Translate outgoing message and place in textarea
        $(currentWindowId).find('.translation-error').attr('original-msg', qString);
        $(currentWindowId).find('.convinput textarea').val(translatedText);
    }

    function doBackTranslation(translatedText, sl, tl) {
        // Do back-translate (swap sl & tl)
        if (addon_wa.prefs.back_translate_enabled) {
            doTranslation(translatedText, tl, sl, function(backTranslatedText) {
                // Get last message sent by me and append
                $(currentWindowId).find('.convlogitem.me:last').append('<div style="color: #9E9E9E; border-bottom: 1px solid lightgray;" class="translated-msg back-translation"><span style="font-weight: bold; margin-left: 0px;">b Translate:</span> <span>' + backTranslatedText + '</span></div>');
                $(currentWindowId).find('.convlog').scrollTop($(currentWindowId).find('.convlog').height())
            });
        }
    }

    function getActiveContactId() {
        return $('.buddyitem.active.focused').attr('id').slice(0, -17);
    }

    function doTranslation(qString, sl, tl, callbackFunction) {

        if (typeof qString === 'undefined' || $.trim(qString) == '') {
            return;
        }

        var lang, translateURL;
        lang = sl + "|" + tl;
        translateURL = "http://www.google.com/translate_a/t?&client=t&text=" + encodeURIComponent(qString) + "&sl=" + sl + "&tl=" + tl + "&ie=UTF8&oe=UTF8&hl=" + tl;

        GM_xmlhttpRequest({
            method: 'GET',
            url: translateURL,
            onload: function(response) {
                try {
                    var translatedText = extractResult(response);

                    // Translate incoming message and pass to callback function
                    if (callbackFunction instanceof Function) {
                        callbackFunction(translatedText);
                    }
                    else {
                        // Translate outgoing message and place in textarea
                        $(currentWindowId).find('.translation-error').attr('original-msg', qString);
                        $(currentWindowId).find('.convinput textarea').val(translatedText);
                    }
                } catch (e) {
                    location.href = 'javascript:void(IMO.NM.add_notification("Error: ' + e.message + '",IMO.REUI.Notification.types.error,{momentary:true}))';
                }
            },
            onerror: function(response) {
                location.href = 'javascript:void(IMO.NM.add_notification("Error: ' + response + '",IMO.REUI.Notification.types.error,{momentary:true}))';
            },
            onabort: function(response) {
                location.href = 'javascript:void(IMO.NM.add_notification("Error: ' + response + '",IMO.REUI.Notification.types.error,{momentary:true}))';
            }
        });
    }

    function extractResult(response) {
        var res = $.parseJSON(response.responseText);
        var result = '';
        for (var i = 0; i < res[0].length; i++) {
            result += res[0][i][0];
        }
        return result;
    }
    /***************************
     * Listen for events
     ***************************/
    function registerTranslationEvents() {

        $(currentWindowId).find('.translate-languages').live('change', function(event) {
            var contactUid = getActiveContactId();

            // Save language preference for current contact
            if (typeof addon_wa.contacts[contactUid] === 'undefined') {
                addon_wa.contacts[contactUid] = {};
            }
            addon_wa.contacts[contactUid]['lang'] = $(this).val();
            savePreferences();
            location.href = 'javascript:void(IMO.NM.add_notification("Contact language changed to ' + $(this).find('option:selected').text() + '",IMO.REUI.Notification.types.info,{momentary:true}))';
        });

        $('.titlebar-tabbed.focused, .floatingwindow.focused').live('click', function(event) {
            injectTranslationControls();
        });

        $('div.buddygrouplist div.buddyitem').live('click', function(event) {
            injectTranslationControls();
        });

        $(currentWindowId).find('.convlog-msgs').live("DOMSubtreeModified", function(event) {
            if (typeof $(currentWindowId).find('.translation-error').attr('original-msg') === 'undefined') {
                injectTranslationControls();
            }

            // Get last message and translate it if it is not from me
            if ($(currentWindowId).find('.convlogitem:last .translated-msg').length == 0) {
                var $lastMessage = $(currentWindowId).find('.convlogitem:last');

                if ($lastMessage.hasClass('me')) {
                    // Only show original if there is any original text
                    if (addon_wa.prefs.show_original_enabled && $(currentWindowId).find('.translation-error').attr('original-msg') != '') {
                        var originalMessage = $(currentWindowId).find('.translation-error').attr('original-msg');
                        $(currentWindowId).find('.translation-error').attr('original-msg', '');
                        $lastMessage.append('<div class="translated-msg original-message" style="color: cornflowerblue;"><span style="font-weight: bold; margin-left: 19px;">Original:</span> <span>' + originalMessage + '</span></div>');
                    }
                }
            }
        });

        $(currentWindowId).find('.convinput-text-container').live('keypress', function(e) {
            // Get keycode for cross browser
            var keyCode = e.keyCode;
            if (keyCode == KEYCODE_F8) {
                var qString = $(currentWindowId).find('.convinput textarea').val();
                var sl = addon_wa.prefs.translation_my_lang;
                var tl = $(currentWindowId).find('.translate-languages').val();
                doTranslation(qString, sl, tl, function(translatedText) {
                    $(currentWindowId).find('.translation-error').attr('original-msg', qString);
                    $(currentWindowId).find('.convinput textarea').val(translatedText);

//					doBackTranslation(translatedText, sl, tl);
                });
            }
            else if (keyCode == KEYCODE_F9) {
                // Translate and send
                var qString = $(currentWindowId).find('.convinput textarea').val();
                var sl = addon_wa.prefs.translation_my_lang;
                var tl = $(currentWindowId).find('.translate-languages').val();
                doTranslation(qString, sl, tl, function(translatedText) {
                    doBackTranslation(translatedText, sl, tl);

                    $(currentWindowId).find('.translation-error').attr('original-msg', qString);
                    $(currentWindowId).find('.convinput textarea').val(translatedText);
                    $(currentWindowId).find('.sprite_btn_send').click();
                });
            }
            else if (keyCode == KEYCODE_F10) {
                translateIncomingMessages();
            }
            return true;
        });

        $(currentWindowId).find('.translate-btn').live('click', function(event) {
            var qString = $(currentWindowId).find('.convinput textarea').val();
            var sl = addon_wa.prefs.translation_my_lang;
            var tl = $(currentWindowId).find('.translate-languages').val();
            doTranslation(qString, sl, tl);
        });

        $(currentWindowId).find('.translate-incoming-btn').live('click', function(event) {
            translateIncomingMessages();
        });
    }

    $('#account-console .action:nth-child(5)').live('click', function(event) {
        // Wait 0.5 seconds before injecting preferences to unsure pref dialog is visible
        //window.setInterval(function() {}, 500);
        var $prefsDialog = $('.modal-popup-titled:visible');

        // Check if pref dialog exists in DOM
        if ($prefsDialog.length == 1) {
            // Check if Addon prefs are already loaded			
            if ($prefsDialog.find('.addon_wa_prefs').length == 0) {
                $('<style>.preference-widget{width:345px;}</style>').appendTo('head');
                $prefsDialog.css('width', '680px');

                var addon_wa_prefs_html = '<div class="preference-widget addon_wa_prefs" style="height: 490px; width: 335px; right: 0px; position: absolute; border-left: 1px solid lightgray; top: 0px; padding-top: 10px;"> <div class=" pref-section"><div class=" pref-section-title"> <span class="translation_span">Translation</span></div><div class="pref-option" style="position: relative;"> <input type="checkbox" id="addon_wa_translation_enabled"> <div style="display: inline; margin-top: 0px;"><label style="position: absolute; margin-top: 0px; cursor: pointer;" for="addon_wa_translation_enabled">Enable/Disable<br><span style="font-size: 11px; color: crimson; font-weight: bold;">(Reload Required)</span></label></div> <div style="right: 0px; display: inline; position: absolute; top: -2px; width: 150px;"> <span style="position: relative;">My Language:</span> <select id="addon_wa_translation_my_lang" style="width: 70px;">' + languagesDrowdownOptionsHtml + '</select></div></div><div style="margin-top: 20px;" class="pref-option"><input type="checkbox" id="addon_wa_show_original_enabled" checked="checked" /> <label style="cursor: pointer; margin-left: -3px;" for="addon_wa_show_original_enabled">Show Original <span style="color:gray">(message before translation)</span></label></div> <div class="pref-option"><input type="checkbox" id="addon_wa_back_translate_enabled" /> <label style="cursor: pointer; margin-left: -3px;" for="addon_wa_back_translate_enabled">Show Back Translate <span style="color:gray">(b Translate)</span></label></div><div class=" clear"></div> </div> <div class=" pref-section" style="margin-top: 20px;"><div class=" pref-section-title"> <span class="translation_span">Buddy List</span></div><div class="pref-option"> <input type="checkbox" id="addon_wa_minimal_list_enabled"> <label style="cursor: pointer; margin-left: -3px;" for="addon_wa_minimal_list_enabled">Compact List</label></div><fieldset style="border: 1px solid lightgray; padding:10px; margin-top:10px"> <legend>List Position</legend> <div class="pref-option"> <input type="radio" id="addon_wa_buddypanel_left_position_left" name="addon_wa_buddypanel_left_position" value="left"> <label for="addon_wa_buddypanel_left_position_left" style="cursor: pointer;">Left</label> <input type="radio" checked="checked" id="addon_wa_buddypanel_left_position_right" name="addon_wa_buddypanel_left_position" style="margin-left: 20px;" value="right"> <label for="addon_wa_buddypanel_left_position_right" style="cursor: pointer;">Default (Right)</label></div></fieldset><div class=" clear"></div></div><div style="position: absolute; bottom: 0px; margin:0 10px; text-align: center; width: 100%; background-color: palegoldenrod;" class="pref-section-right-status"></div></div>';
                $prefsDialog.find('.preference-widget').after(addon_wa_prefs_html);

                // Add preferences tab
                var addon_wa_prefs_tab_html = '<span style="color: white; position: absolute; padding: 0px 10px; font-size: 14px; top: 5px; left: 344px; background-color: rgb(25, 174, 230); border-radius: 5px 5px 0px 0px;">Waz Toolz</span>';
                $prefsDialog.find('.modal-popup-titlebar span:first').after(addon_wa_prefs_tab_html);

                // Update prefs dialog with saved settings
                $('#addon_wa_translation_my_lang').val(addon_wa.prefs.translation_my_lang);
                if (addon_wa.prefs.translation_enabled) {
                    $('#addon_wa_translation_enabled').attr('checked', 'checked');
                }
                if (addon_wa.prefs.minimal_list_enabled) {
                    $('#addon_wa_minimal_list_enabled').attr('checked', 'checked');
                }
                if (addon_wa.prefs.buddypanel_left_position_left) {
                    $('#addon_wa_buddypanel_left_position_left').attr('checked', 'checked');
                }
                if (addon_wa.prefs.show_original_enabled) {
                    $('#addon_wa_show_original_enabled').attr('checked', 'checked');
                }
                if (addon_wa.prefs.back_translate_enabled) {
                    $('#addon_wa_back_translate_enabled').attr('checked', 'checked');
                }
            }
        }
        else {
            location.href = 'javascript:void(IMO.NM.add_notification("Could not load Waz Toolz Preferences dialog.",IMO.REUI.Notification.types.error,{momentary:true}))';
        }
    });

    $('#addon_wa_translation_my_lang').live('change', function(event) {
        addon_wa.prefs.translation_my_lang = $(this).val();
        savePreferences();
        $('.pref-section-right-status').text('My language changed to ' + $(this).find('option:selected').text());
        location.href = 'javascript:void(IMO.NM.add_notification("My language changed to ' + $(this).find('option:selected').text() + '",IMO.REUI.Notification.types.info,{momentary:false}))';
    });

    $('#addon_wa_translation_enabled').live('change', function(event) {
        addon_wa.prefs.translation_enabled = $(this).is(':checked');
        savePreferences();

        if (addon_wa.prefs.translation_enabled) {
            $('.pref-section-right-status').text('Translation Enabled. Please Reload Page.');
        }
        else {
            $('.pref-section-right-status').text('Translation Disabled. Please Reload Page.');
        }
        location.href = 'javascript:void(IMO.NM.add_notification("Settings updated - please reload the page for settings to take effect.",IMO.REUI.Notification.types.info,{momentary:false}))';
    });

    $('#addon_wa_minimal_list_enabled').live('change', function(event) {
        addon_wa.prefs.minimal_list_enabled = $(this).is(':checked');
        savePreferences();
        if (addon_wa.prefs.minimal_list_enabled) {
            enableMinimalList();
            $('.pref-section-right-status').text('Compact Buddy List Enabled');
        }
        else {
            disableMinimalList();
            $('.pref-section-right-status').text('Compact Buddy List Disabled');
        }
    });

    $('#addon_wa_show_original_enabled').live('change', function(event) {
        addon_wa.prefs.show_original_enabled = $(this).is(':checked');
        savePreferences();

        if (addon_wa.prefs.show_original_enabled) {
            $('.pref-section-right-status').text('Show Original Enabled');
        }
        else {
            $('.pref-section-right-status').text('Show Original Disabled');
        }
    });

    $('#addon_wa_back_translate_enabled').live('change', function(event) {
        addon_wa.prefs.back_translate_enabled = $(this).is(':checked');
        savePreferences();

        if (addon_wa.prefs.back_translate_enabled) {
            $('.pref-section-right-status').text('Show Back Translate Enabled');
        }
        else {
            $('.pref-section-right-status').text('Show Back Translate Disabled');
        }
    });

    $('input[name=addon_wa_buddypanel_left_position]').live('change', function(event) {
        var $selectedOption = $('input[name=addon_wa_buddypanel_left_position]:checked');
        var optionVal = $selectedOption.val();
        if (optionVal == 'left') {
            addon_wa.prefs.buddypanel_left_position_left = true;
            enableBuddyPanelLeft();
        }
        else {
            addon_wa.prefs.buddypanel_left_position_left = false;
            disableBuddyPanelLeft();
        }
        savePreferences();
        $('.pref-section-right-status').text('Buddy List Position: ' + $('label[for=' + $selectedOption.attr('id') + ']').text());
    });

});

/*
 * Wait Until Exists Version v0.2 - http://javascriptisawesome.blogspot.com/
 *
 *
 * TERMS OF USE - Wait Until Exists
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2011 Ivan Castellanos
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

(function() {
    var _waitUntilExists = {
        pending_functions: [],
        loop_and_call: function()
        {
            if (!_waitUntilExists.pending_functions.length) {
                return
            }
            for (var i = 0; i < _waitUntilExists.pending_functions.length; i++)
            {
                var obj = _waitUntilExists.pending_functions[i];
                var resolution = document.getElementById(obj.id);
                if (obj.id == document) {
                    resolution = document.body;
                }
                if (resolution) {
                    var _f = obj.f;
                    _waitUntilExists.pending_functions.splice(i, 1)
                    if (obj.c == "itself") {
                        obj.c = resolution
                    }
                    _f.call(obj.c)
                    i--
                }
            }
        },
        global_interval: setInterval(function() {
            _waitUntilExists.loop_and_call()
        }, 5)
    }
    if (document.addEventListener) {
        document.addEventListener("DOMNodeInserted", _waitUntilExists.loop_and_call, false);
        clearInterval(_waitUntilExists.global_interval);
    }
    window.waitUntilExists = function(id, the_function, context) {
        context = context || window
        if (typeof id == "function") {
            context = the_function;
            the_function = id;
            id = document
        }
        _waitUntilExists.pending_functions.push({f: the_function, id: id, c: context})
    }
    waitUntilExists.stop = function(id, f) {
        for (var i = 0; i < _waitUntilExists.pending_functions.length; i++) {
            if (_waitUntilExists.pending_functions[i].id == id && (typeof f == "undefined" || _waitUntilExists.pending_functions[i].f == f))
            {
                _waitUntilExists.pending_functions.splice(i, 1)
            }
        }
    }
    waitUntilExists.stopAll = function() {
        _waitUntilExists.pending_functions = []
    }
})()