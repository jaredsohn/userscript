// ==UserScript==
// @name                Subscene auto-language
// @version             1.0.2
// @description         Autoselect subscene's language based on the one of your browser.
// @include             http://subscene.com/*
// @include             http://*.subscene.com/*
// @homepageURL         http://userscripts.org/scripts/show/160056
// @grant               GM_log
// @updateURL           https://raw.github.com/bre7/userscripts/master/subscene_autolang/subscene_autolang.user.js
// @downloadURL         https://raw.github.com/bre7/userscripts/master/subscene_autolang/subscene_autolang.user.js
// @copyright           2013+
// ==/UserScript==


var langNames = {"Arabic": 2, "Danish": 10, "Dutch": 11, "English": 13, "French": 18, "Indonesian": 44, "Italian": 26, "Norwegian": 30, "Spanish": 38, "Swedish": 39, "Vietnamese": 45, "Albanian": 1, "Azerbaijani": 55, "Bengali": 54, "Bosnian": 60, "Bulgarian": 5, "Catalan": 49, "Croatian": 8, "Czech": 9, "Esperanto": 47, "Estonian": 16, "Finnish": 17, "German": 19, "Greek": 21, "Greenlandic": 57, "Hebrew": 22, "Hindi": 51, "Hungarian": 23, "Icelandic": 25, "Japanese": 27, "Korean": 28, "Kurdish": 52, "Latvian": 29, "Lithuanian": 43, "Macedonian": 48, "Malay": 50, "Polish": 31, "Portuguese": 32, "Romanian": 33, "Russian": 34, "Serbian": 35, "Sinhala": 58, "Slovak": 36, "Slovenian": 37, "Tagalog": 53, "Tamil": 59, "Thai": 40, "Turkish": 41, "Ukranian": 56, "Urdu": 42};
// Add own lang
var langCodes = {"en": "English", "fr": "French", "es": "Spanish", "ar": "Arabic"};

document.addEventListener("DOMContentLoaded", SetCookie, false);

function SetCookie() {
    //Create new cookie if it doesn't exist
    if (document.cookie.indexOf("LanguageFilter") < 0) {
        // ToDo: Check paths
        var language = navigator.language ? navigator.language : navigator.userLanguage;
        language = language.split('-');
        var parsedLang = langNames[langCodes[language]];

        CreateCookies(parsedLang);
        GM_log("Cookies created =P");
		GM_log(">User lang.: " + language + " >Lang name: " + langCodes[language] + " >Site lang number: " + parsedLang);
    }
}

function CreateCookies(lang, impared) {
    document.cookie = "LanguageFilter=" + lang + "; path=/";
    /*
     * HearingImpaired values:
     * 0 => Don't show HearingImpaired
     * 1 => Show HearingImpaired only
     *   => Show all
     */
    document.cookie = "HearingImpaired=" + "; path=/";
}


/* ICE: If more langs are added, uncomment following line and update array. No need to run it every time we visit the site.
 * document.addEventListener( "DOMContentLoaded", GenerateLangArray, false );
 */
function GenerateLangArray() {
    /* siteLangs: Get DIV that contains all the checkboxes
     * 
     * regex:
     *  Checkbox value => Value to be used for the cookies
     *  Label text     => Language in string format
     */
    var siteLangs = document.getElementById('columns').innerHTML, match, regex = /type="checkbox" value="([\d]+)"><label for="[\w]+">([\w]+)<\/label>/ig;
    //var returnArray;
    var aux = '{';
    while (match = regex.exec(siteLangs)) {
        //returnArray[match[2]] = match[1];
        aux += '"' + match[2] + '" : ' + match[1] + ',';
    }
    aux += '}';
    GM_log(aux);
}