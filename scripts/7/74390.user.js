// ==UserScript==
// @name           FM's Remove Facebook Chat
// @namespace      Force Master
// @description    Whether you've connected to AIM or simply don't want it, this script removes FB Chat both visually & functionally.
// @include        http://*.facebook.*/*
// @include        https://*.facebook.*/*
// @version        1.1.2
//
// @history        1.1.2   - Added https include.
// @history        1.1.1   - Minor tweak of null checks.
// @history        1.1.0   - Implemented complete data checks to make sure the body of the webpage is not null.
//                         - Began storing the language globally; it is now persistent.
// @history        1.0.0   - Added a rudimentary update feature. Checks for updates, alerts user when one is found.
//                           If the latest isn't installed, 12 hours must pass before the user is alerted again.
//                           Used PhasmaExMachina's ScriptUpdater source code to learn how to fetch the current version:
//                             http://userscripts.org/scripts/show/57756
//                           - Changed error alerting technique & changed error alert URL to go to a specific error
//                           reporting topic on the script page.
//                           - Rephrased/condensed output texts.
// @history        0.0.2   - Fixed a bug where 'thanksMessages' used 'language' before the latter had been initialized.
// @history        0.0.1   - Began with support for full English (US) & tentative English (UK).
//                           - Offered English (Pirate) but without the expected styles.
//                           - All others were on an English default.
// ==/UserScript==
/*
 * If you have a problem, comment, or suggestion, feel free to post here:
 *    http://userscripts.org/scripts/show/74390
 *
 * Also, I REALLY need help completing language translations! If you know any
 *    other than English (US), please help me!
 *    (even if you only help with something such as changing the grammar/speech
 *    patterns of the English (UK) version to be more typical of that region)
 */

var lang, errorMessages, thanksMessages, version='1.1.2',
scriptNameLong = 'Force Master\'s Remove Facebook Chat',
scriptNameShort = 'Force Master\'s Remove FB Chat',
scriptURL = 'http://userscripts.org/scripts/show/74390';
errorsURL = 'http://userscripts.org/topics/51556';

///////////////////////////////////////////////////////////////////////////////
//////////////////////////    heart of the script    //////////////////////////
///////////////////////////////////////////////////////////////////////////////
function removeChatComponents(key)  {try  {
    // first, get rid of the scripts that insert Chat elements, then something else referencing Chat
    document.body.innerHTML =
        key.replace(/\nonloadRegister.function ().*new ChatNotifications.*/g,'')
           .replace(/\n<script>big_pipe.onPageletArrive.{2}"id":"pagelet_chat_home".*/g,'')
           .replace(/\n<script>big_pipe.onPageletArrive.{2}"id":"pagelet_presence".*/g,'')
           .replace(/|chat\\\//,'');
    
    // now that they can't be regenerated, get rid of the Chat elements
    if ( key=document.getElementById('pagelet_presence') )  { key.parentNode.removeChild(key); }
    if ( key=document.getElementById('pagelet_chat_home') ) { key.parentNode.removeChild(key); }
}catch (e)  { alert(errorMessages[lang] +'\n'+ errorsURL +'\n\nremoveChatComponents() :: '+e); } }

function run()  {try  {
    lang = GM_getValue('lang');
    if (!lang)  { lang = 'en_US'; }
    
    constructMessages();
    var b = document.body;
    if ( b==null || b.className==null || b.innerHTML==null )  { return; }

    lang = b.className.replace(/.*Locale_/,''); // make sure the language hasn't changed
    GM_setValue('lang',lang);
    
    if ( !GM_getValue('initialized') )  {
        GM_setValue('initialized',true);
        alert( thanksMessages[lang] );
    }
    removeChatComponents(b.innerHTML);
    checkForNewVers();
}catch (e)  { alert(errorMessages[lang] +'\n'+ errorsURL +'\n\nrun() :: '+e); } }

run();

///////////////////////////////////////////////////////////////////////////////
////////////////////////////////    updates    ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function notifyNewVers(latest,updateLevel)  {try  {
    if ( parseInt( GM_getValue('lastUpdateAlert') )
       > new Date().getTime() - (1000*60*60*12) )  {
        return; // 12 hrs has yet to pass since the last update alert
    }

    var s
        ='A new version of '+scriptNameLong+' is available.'
        +'\nYour version:    '+version
        +'\nLatest version: '+latest
        +'\nThis is a';
    if      (updateLevel==0)  { s += 'n important'; }
    else if (updateLevel==1)  { s += ' recommended'; }
    else if (updateLevel==2)  { s += ' minor but probably useful'; }
    s += ' update.'
      +'\n\nWould you like to go to the script page to view the new version?'
        +'\nURL: '+scriptURL
        +'\n(Note: You may have to bypass your pop-up blocker)';
    
    if ( confirm(s) )  {
        window.open(scriptURL,"_blank");
    }
    GM_setValue('lastUpdateAlert', new Date().getTime()+'');
}catch (e)  { alert(errorMessages[lang] +'\n'+ errorsURL +'\n\nnotifyNewVers() :: '+e); } }

function checkForNewVers()  {try  {
    GM_xmlhttpRequest  ( {
        method: 'GET',
        url: 'http://userscripts.org/scripts/source/74390.meta.js',
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',

        onload: function (response)  {
            var current = version.split('.'),
                latest = ('\n'+response.responseText.match(/.*@version.*\d.\d.\d/g))
                          .replace(/[\D|\s]{2,99}/g,''),
                latestS = latest.split('.');
            for (var i=0 ; i<3 ; i++)  {
                if (current[i] < latestS[i])  {
                    notifyNewVers(latest,i);
                    return;
                }
            }
        }

    } );
}catch (e)  { alert(errorMessages[lang] +'\n'+ errorsURL +'\n\ncheckForNewVers() :: '+e); } }

///////////////////////////////////////////////////////////////////////////////
////////////////////////    language initialization    ////////////////////////
///////////////////////////////////////////////////////////////////////////////
function constructMessages()  {try  {
var unsupported ='(Sorry, your language isn\'t supported yet. :( If you can read this, please post a translation'
                +' at the link below. Thank you!)\n\nINTERNAL ERROR!\nPlease post the rest of this message and the version number you\'re using here:';
errorMessages = {
    'af_ZA':unsupported,
    'az_AZ':unsupported,
    'id_ID':unsupported,
    'ms_MY':unsupported,
    'bs_BA':unsupported,
    'ca_ES':unsupported,
    'cs_CZ':unsupported,
    'cy_GB':unsupported,
    'da_DK':unsupported,
    'de_DE':unsupported,
    'et_EE':unsupported,
    'en_PI': '(This Pirate speech may not be finished. If you can help complete it, please post your changes at the link below. Thank you!)\n\n'
           + 'INTERNAL ERROR!\nPlease post the rest of this message and the version number you\'re using here:',
    'en_GB': '(This UK English may not be phrased to match regional speech styles. If you can help, please post your changes at the link below. Thank you!)\n\n'
           + 'INTERNAL ERROR!\nPlease post the rest of this message and the version number you\'re using here:',
    'en_UD': '(This Upside Down text may not be finished. If you can help complete it, please post your changes at the link below.. Thank you!)\n\n'
           + 'INTERNAL ERROR!\nPlease post the rest of this message and the version number you\'re using here:',
    'en_US': 'INTERNAL ERROR!\nPlease post the rest of this message and the version number you\'re using here:',
    'es_LA':unsupported,
    'es_ES':unsupported,
    'eo_EO':unsupported,
    'eu_ES':unsupported,
    'tl_PH':unsupported,
    'fo_FO':unsupported,
    'fr_CA':unsupported,
    'fr_FR':unsupported,
    'ga_IE':unsupported,
    'gl_ES':unsupported,
    'ko_KR':unsupported,
    'is_IS':unsupported,
    'it_IT':unsupported,
    'ka_GE':unsupported,
    'sw_KE':unsupported,
    'ku_TR':unsupported,
    'lv_LV':unsupported,
    'fb_LT':unsupported,
    'lt_LT':unsupported,
    'la_VA':unsupported,
    'hu_HU':unsupported,
    'nl_NL':unsupported,
    'ja_JP':unsupported,
    'nb_NO':unsupported,
    'nn_NO':unsupported,
    'pl_PL':unsupported,
    'pt_BR':unsupported,
    'pt_PT':unsupported,
    'ro_RO':unsupported,
    'ru_RU':unsupported,
    'sq_AL':unsupported,
    'sk_SK':unsupported,
    'sl_SI':unsupported,
    'fi_FI':unsupported,
    'sv_SE':unsupported,
    'th_TH':unsupported,
    'vi_VN':unsupported,
    'tr_TR':unsupported,
    'zh_CN':unsupported,
    'zh_TW':unsupported,
    'zh_HK':unsupported,
    'el_GR':unsupported,
    'be_BY':unsupported,
    'bg_BG':unsupported,
    'mk_MK':unsupported,
    'sr_RS':unsupported,
    'uk_UA':unsupported,
    'hy_AM':unsupported,
    'he_IL':unsupported,
    'ar_AR':unsupported,
    'ps_AF':unsupported,
    'fa_IR':unsupported,
    'ne_NP':unsupported,
    'hi_IN':unsupported,
    'bn_IN':unsupported,
    'pa_IN':unsupported,
    'ta_IN':unsupported,
    'te_IN':unsupported,
    'ml_IN':unsupported,
    'unsup':unsupported
};

unsupported = '(Sorry, your language isn\'t supported yet. :( If you can read this, please post a translation at the link below. Thank you!)\n\n'
        +'Thank you for installing '+scriptNameLong+'! Start by opening a new page/tab.\nPlease post this as your  status:\n\n\"installed '
        +scriptNameShort+' for Greasemonkey-compatible browsers! Whether you\'ve connected to AIM or simply don\'t want it, this script removes FB '
        +'Chat both visually & functionally. It\'s great to get rid of those annoying pop-ups or when FB Chat slows down your computer! '+scriptURL+'\"',
thanksMessages = {
    'af_ZA':unsupported,
    'az_AZ':unsupported,
    'id_ID':unsupported,
    'ms_MY':unsupported,
    'bs_BA':unsupported,
    'ca_ES':unsupported,
    'cs_CZ':unsupported,
    'cy_GB':unsupported,
    'da_DK':unsupported,
    'de_DE':unsupported,
    'et_EE':unsupported,

    'en_PI':'(This Pirate speech may not be finished. If you can help complete it, please post your changes at the link below.. Thank you!)\n\n'
        +'Thank you for installing '+scriptNameLong+'! Start by opening a new page/tab.\nPlease post this as your status:\n\n\"installed '
        +scriptNameShort+' for Greasemonkey-compatible browsers! Whether you\'ve connected to AIM or simply don\'t want it, this script removes FB '
        +'Chat both visually & functionally. It\'s great to get rid of those annoying pop-ups or when FB Chat slows down your computer! '+scriptURL+'\"',

    'en_GB':'(This UK English may not be phrased to match regional speech styles. If you can help, please post your changes at the link below. Thank you!)\n\n'
        +'Thank you for installing '+scriptNameLong+'! Start by opening a new page/tab.\nPlease post this as your status:\n\n\"installed '
        +scriptNameShort+' for Greasemonkey-compatible browsers! Whether you\'ve connected to AIM or simply don\'t want it, this script removes FB '
        +'Chat both visually & functionally. It\'s great to get rid of those annoying pop-ups or when FB Chat slows down your computer! '+scriptURL+'\"',

    'en_UD': '(This Upside Down text may not be finished. If you can help complete it, please post your changes at the link below.. Thank you!)\n\n'
        +'Thank you for installing '+scriptNameLong+'! Start by opening a new page/tab.\nPlease post this as your status:\n\n\"installed '
        +scriptNameShort+' for Greasemonkey-compatible browsers! Whether you\'ve connected to AIM or simply don\'t want it, this script removes FB '
        +'Chat both visually & functionally. It\'s great to get rid of those annoying pop-ups or when FB Chat slows down your computer! '+scriptURL+'\"',

    'en_US': 'Thank you for installing '+scriptNameLong+'! Start by opening a new page/tab.\nPlease post this as your status:\n\n\"installed '
        +scriptNameShort+' for Greasemonkey-compatible browsers! Whether you\'ve connected to AIM or simply don\'t want it, this script removes FB '
        +'Chat both visually & functionally. It\'s great to get rid of those annoying pop-ups or when FB Chat slows down your computer! '+scriptURL+'\"',

    'es_LA':unsupported,
    'es_ES':unsupported,
    'eo_EO':unsupported,
    'eu_ES':unsupported,
    'tl_PH':unsupported,
    'fo_FO':unsupported,
    'fr_CA':unsupported,
    'fr_FR':unsupported,
    'ga_IE':unsupported,
    'gl_ES':unsupported,
    'ko_KR':unsupported,
    'is_IS':unsupported,
    'it_IT':unsupported,
    'ka_GE':unsupported,
    'sw_KE':unsupported,
    'ku_TR':unsupported,
    'lv_LV':unsupported,
    'fb_LT':unsupported,
    'lt_LT':unsupported,
    'la_VA':unsupported,
    'hu_HU':unsupported,
    'nl_NL':unsupported,
    'ja_JP':unsupported,
    'nb_NO':unsupported,
    'nn_NO':unsupported,
    'pl_PL':unsupported,
    'pt_BR':unsupported,
    'pt_PT':unsupported,
    'ro_RO':unsupported,
    'ru_RU':unsupported,
    'sq_AL':unsupported,
    'sk_SK':unsupported,
    'sl_SI':unsupported,
    'fi_FI':unsupported,
    'sv_SE':unsupported,
    'th_TH':unsupported,
    'vi_VN':unsupported,
    'tr_TR':unsupported,
    'zh_CN':unsupported,
    'zh_TW':unsupported,
    'zh_HK':unsupported,
    'el_GR':unsupported,
    'be_BY':unsupported,
    'bg_BG':unsupported,
    'mk_MK':unsupported,
    'sr_RS':unsupported,
    'uk_UA':unsupported,
    'hy_AM':unsupported,
    'he_IL':unsupported,
    'ar_AR':unsupported,
    'ps_AF':unsupported,
    'fa_IR':unsupported,
    'ne_NP':unsupported,
    'hi_IN':unsupported,
    'bn_IN':unsupported,
    'pa_IN':unsupported,
    'ta_IN':unsupported,
    'te_IN':unsupported,
    'ml_IN':unsupported,
    'unsup':unsupported
};
}catch (e)  { alert(errorMessages['en_US'] +'\n'+ errorsURL +'\n\nconstructMessages() :: '+e); } }