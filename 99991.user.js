/**
 * Performs typographical conversion with text in forms: changes quotation marks to correct ones,
 * replaces short dashes with long one where needed, inserts &nbsp; tags where needed, etc.
 * See http://www.typograf.ru/help/ (Russian) for better description.
 * Press Ctrl-' to perform conversion
 *
 * Script based on script by UshkiNaz (http://rustydragon.livejournal.com)
 * WebService communication is based on script by Andrew Shitov (ash@design.ru)
 * Uses WebService typograf.ru
 *
 */

// ==UserScript==
// @name           Typograf.ru
// @namespace      olexiy-k.livejournal.com
// @description    Performs typographical conversion with text in forms.
// @include        *
// @author         olexiy.k
// @version        0.1
// ==/UserScript==


const TYPOGRAF_LOADING_ID = 'typograf_loading';
const TYPOGRAF_STOP_ID = 'typograf_stop';

var requestIsInProcess = false;

var textarea = null;

/**
 * Prepares request to WebService and sends it.
 */
function remoteTypograf(text) {
    var xml = '<?xml version="1.0" encoding="windows-1251" ?>'
    +'<preferences>'
    +'<!-- Теги -->'
    +'<tags delete="0">1</tags>'
    +'<!-- Абзацы -->'
    +'<paragraph insert="1">'
    +'<start><![CDATA[<p>]]></start>'
    +'<end><![CDATA[</p>]]></end>'
    +'</paragraph>'
    +'<!-- Переводы строк -->'
    +'<newline insert="1"><![CDATA[<br />]]></newline>'
    +'<!-- Переводы строк <p>&nbsp;</p> -->'
    +'<cmsNewLine valid="0" />'
    +'<!-- DOS текст -->'
    +'<dos-text delete="0" />'
    +'<!-- Неразрывные конструкции -->'
    +'<nowraped insert="1" nonbsp="0" length="0">'
    +'<start><![CDATA[<nobr>]]></start>'
    +'<end><![CDATA[</nobr>]]></end>'
    +'</nowraped>'
    +'<!-- Висячая пунктуация -->'
    +'<hanging-punct insert="0" />'
    +'<!-- Удалять висячие слова -->'
    +'<hanging-line delete="0" />'
    +'<!-- Символ минус -->'
    +'<minus-sign><![CDATA[&ndash;]]></minus-sign>'
    +'<!-- Переносы -->'
    +'<hyphen insert="0" length="0" />'
    +'<!-- Акронимы -->'
    +'<acronym insert="0"></acronym>'
    +'<!-- Вывод символов 0 - буквами 1 - числами -->'
    +'<symbols type="0" />'
    +'<!-- Параметры ссылок -->'
    +'<link target="" class="" />'
    +'</preferences>';

    var xmlRequest = 'text='+escape(text) + '&xml='+escape(xml);
    requestTypograf('http://www.typograf.ru/webservice/', xmlRequest);
}


/**
 * Asynchronously requests WebService, sets callback function
 */
function requestTypograf(url, text) {
    showTypografConversionProgress(true);
    GM_log("Request:" + text);
    GM_xmlhttpRequest({
        method: 'POST',
        url: url,
        headers: {
            'User-Agent': 'Mozilla/4.0 (compatible)',
            'Content-type': 'application/x-www-form-urlencoded',
            'Connection': 'close'
        },
        data:text,
        onerror:function (res) {
            requestIsInProcess = false;
            GM_log('onerror: ' + res);
        },
        onload: typografCallback
    });
}

/**
 * Callback function. Called when WebService returns an answer.
 * Asynchronous.
 */
function typografCallback(responseDetails) {
    GM_log("Response:" + responseDetails.responseText);
    if (!requestIsInProcess || textarea == null) { // Was canceled
        return;
    }
    requestIsInProcess = false;
    if (responseDetails.status == 200) {
        parseTypografAnswer(responseDetails.responseText);
    }
    showTypografConversionProgress(false);
}

/**
 * Parses response from WebService, extracts an answer, sets value to text area and submits the form.
 */
function parseTypografAnswer(text) {
    var response = text;
    response = response.replace(/&gt;/g, '>');
    response = response.replace(/&lt;/g, '<');
    response = response.replace(/&amp;/g, '&');

    if (textarea) { // To be sure that user was not faster than script
        textarea.value = response;
    }
    textarea = null;
}

/**
 * Show Typograf conversion 'loading' dialog.
 */
function showTypografConversionProgress(show) {
    var oldPopup = document.getElementById(TYPOGRAF_LOADING_ID);

    if (!show) {
        if (oldPopup) {
            document.body.removeChild(oldPopup);
            return;
        }
    } else {
        // Showing it already. Actually we shouldn't be here
        if (oldPopup) {
            return;
        }
    }
    var div = document.createElement('div');
    div.id = TYPOGRAF_LOADING_ID;
    div.style.cssText = getDivCSS(10, 200);
    div.innerHTML = LOADING_HTML;

    document.body.appendChild(div);
    //    div.style.cssText = getDivCSS(window.scrollX + Math.floor((window.innerWidth - div.clientWidth) / 2),
    //            window.scrollY + Math.floor((window.innerHeight - div.clientHeight) / 3));

    div.style.cssText = getDivCSS(window.scrollX + (window.innerWidth - div.clientWidth) - 20,
            window.scrollY + (window.innerHeight - div.clientHeight ) - 20);

    var button = document.getElementById(TYPOGRAF_STOP_ID);
    button.addEventListener('click', stopTypograf, false);
}

/**
 * Called when user cancels Typograf conversion.
 */
function stopTypograf() {
    requestIsInProcess = false;
    textarea = null;
    showTypografConversionProgress(false);
}

/**
 * Called when user presses a key on form element.
 * If CTRL-'
 */
function onKeyDownEvent(e) {
    if ((e.keyCode == 222) && (e.ctrlKey)) {
        e.preventDefault();
        if (this.nodeName == 'TEXTAREA' || (this.nodeName == 'INPUT' && this.type == "text")) {
            if (requestIsInProcess) {
                return false;
                // Aleady in process, cancel
            }
            textarea = this;
            requestIsInProcess = true;
            remoteTypograf(this.value)
        }
        return false;
    }
    return true;
}

/**
 * Returns CSS for DIVs used for displaying various information.
 */
function getDivCSS(left, top) {
    return 'z-index: 99; border: 1px solid navy; padding: 6px; background: white; color: black; position: absolute;' +
           'left:' + left + 'px; top: ' + top + 'px; text-align: left;';
}

/**
 * Ataches event listeners, registers menu item.
 */
function init() {
    // Main entry - walk through all form elemets and attach keyhandlers
    var allInps = document.evaluate("//textarea | //select | //input", document, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var left;
    var top;
    var formElement;
    for (var i = 0; i < allInps.snapshotLength; i++) {
        formElement = allInps.snapshotItem(i);
        formElement.addEventListener("keydown", onKeyDownEvent, 0);
    }
}

const LOADING_HTML = '<nobr><img src="data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t' +
                     '3d3bu7u6qqqpmZmYiIiHd3d2ZmZlVVVURERDMzMyIiIhEREQAR' +
                     'AAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05F' +
                     'VFNDQVBFMi4wAwEAAAAh+QQFBwAQACwAAAAAEAAQAAAFdyAkQgGJJOWoQgIjBM8jkKsoPEzgyMGs' +
                     'CjPDw7ADpkQBxRDmSCRetpRA6Rj4kFBkgLC4IlUGhbNQIwXOYYWCXDufzYPDMaoKGBoKb886OjAK' +
                     'dgZAAgQkfCwzAgsDBAUCgl8jAQkHEAVkAoA1AgczlyIDczUDA2UhACH5BAUHABAALAAAAAAPABAA' +
                     'AAVjICSO0IGIATkqIiMKDaGKC8Q49jPMYsE0hQdrlABCGgvT45FKiRKQhWA0mPKGPAgBcTjsspBC' +
                     'AoH4gl+FmXNEUEBVAYHToJAVZK/XWoQQDAgBZioHaX8igigFKYYQVlkCjiMhACH5BAUHABAALAAA' +
                     'AAAQAA8AAAVgICSOUGGQqIiIChMESyo6CdQGdRqUENESI8FAdFgAFwqDISYwPB4CVSMnEhSej+Fo' +
                     'gNhtHyfRQFmIol5owmEta/fcKITB6y4choMBmk7yGgSAEAJ8JAVDgQFmKUCCZnwhACH5BAUHABAA' +
                     'LAAAAAAQABAAAAViICSOYkGe4hFAiSImAwotB+si6Co2QxvjAYHIgBAqDoWCK2Bq6A40iA4yYMgg' +
                     'NZKwGFgVCAQZotFwwJIF4QnxaC9IsZNgLtAJDKbraJCGzPVSIgEDXVNXA0JdgH6ChoCKKCEAIfkE' +
                     'BQcAEAAsAAAAABAADgAABUkgJI7QcZComIjPw6bs2kINLB5uW9Bo0gyQx8LkKgVHiccKVdyRlqjF' +
                     'SAApOKOtR810StVeU9RAmLqOxi0qRG3LptikAVQEh4UAACH5BAUHABAALAAAAAAQABAAAAVxICSO' +
                     '0DCQKBQQonGIh5AGB2sYkMHIqYAIN0EDRxoQZIaC6bAoMRSiwMAwCIwCggRkwRMJWKSAomBVCc5l' +
                     'UiGRUBjO6FSBwWggwijBooDCdiFfIlBRAlYBZQ0PWRANaSkED1oQYHgjDA8nM3kPfCmejiEAIfkE' +
                     'BQcAEAAsAAAAABAAEAAABWAgJI6QIJCoOIhFwabsSbiFAotGMEMKgZoB3cBUQIgURpFgmEI0EqjA' +
                     'CYXwiYJBGAGBgGIDWsVicbiNEgSsGbKCIMCwA4IBCRgXt8bDACkvYQF6U1OADg8mDlaACQtwJCEA' +
                     'IfkEBQcAEAAsAAABABAADwAABV4gJEKCOAwiMa4Q2qIDwq4wiriBmItCCREHUsIwCgh2q8MiyEKO' +
                     'DK7ZbHCoqqSjWGKI1d2kRp+RAWGyHg+DQUEmKliGx4HBKECIMwG61AgssAQPKA19EAxRKz4QCVIh' +
                     'ACH5BAUHABAALAAAAAAQABAAAAVjICSOUBCQqHhCgiAOKyqcLVvEZOC2geGiK5NpQBAZCilgAYFM' +
                     'ogo/J0lgqEpHgoO2+GIMUL6p4vFojhQNg8rxWLgYBQJCASkwEKLC17hYFJtRIwwBfRAJDk4Obwsi' +
                     'dEkrWkkhACH5BAUHABAALAAAAQAQAA8AAAVcICSOUGAGAqmKpjis6vmuqSrUxQyPhDEEtpUOgmgY' +
                     'ETCCcrB4OBWwQsGHEhQatVFhB/mNAojFVsQgBhgKpSHRTRxEhGwhoRg0CCXYAkKHHPZCZRAKUERZ' +
                     'MAYGMCEAIfkEBQcAEAAsAAABABAADwAABV0gJI4kFJToGAilwKLCST6PUcrB8A70844CXenwILRk' +
                     'IoYyBRk4BQlHo3FIOQmvAEGBMpYSop/IgPBCFpCqIuEsIESHgkgoJxwQAjSzwb1DClwwgQhgAVVM' +
                     'IgVyKCEAIfkECQcAEAAsAAAAABAAEAAABWQgJI5kSQ6NYK7Dw6xr8hCw+ELC85hCIAq3Am0U6JUK' +
                     'jkHJNzIsFAqDqShQHRhY6bKqgvgGCZOSFDhAUiWCYQwJSxGHKqGAE/5EqIHBjOgyRQELCBB7EAQH' +
                     'fySDhGYQdDWGQyUhADs="> Typograf is working&hellip;&nbsp;' +
                     '<button type="button" id="' + TYPOGRAF_STOP_ID + '">Cancel</button></nobr>';

init();