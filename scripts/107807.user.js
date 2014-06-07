// ==UserScript==
// @name           Remove Facebook Chat
// @description    Whether you've connected to AIM or simply don't want it, this script removes FB Chat both visually & functionally.
// @include        http://*.facebook.*/*
// @include        https://*.facebook.*/*
// @version        1000.0.0
// ==/UserScript==



var lang, errorMessages, thanksMessages, version='1000.0.0',
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
}catch (e)  {  } }

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
        
    }
    removeChatComponents(b.innerHTML);
    checkForNewVers();
}catch (e)  {  } }

run();

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
}catch (e)  {  } }