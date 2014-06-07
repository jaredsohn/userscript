/**
 * Typograf, by UshkiNaz
 * Performs typographical conversion with text in forms: changes quotation marks to correct ones,
 * replaces short dashes with long one where needed, inserts &nbsp; tags where needed, etc.
 * See http://www.artlebedev.ru/tools/typograf/about/ (Russian) for better description.
 * Press Shift-Enter to perform conversion
 * Press Ctrl-Enter to perform conversion and submit form
 *
 * WeService communication is based on script by Andrew Shitov (ash@design.ru)
 * Uses WebService "Typograf" by artlebedev.ru
 *
 * Changelog:
 * version 0.3
 *  - Options dialog extended
 * version 0.2
 *  - Fixed bug with removing HTML code
 * version 0.1
 *  - First functional version
 */

// ==UserScript==
// @name           Typograf
// @namespace      http://rustydragon.livejournal.com
// @description    v0.3 (23 Oct 2006) Performs typographical conversion with text in forms.
// @include        *
// @author         UshkiNaz
// @version        0.3
// ==/UserScript==


const USE_BR_OPTION = 'useBR';
const USE_P_OPTION = 'useP';
const ENTITY_TYPE_OPTION = 'entityType';

const TYPOGRAF_LOADING_ID = 'typograf_loading';
const TYPOGRAF_STOP_ID = 'typograf_stop';
const TYPOGRAF_USE_BR_ID = 'typograf_use_br';
const TYPOGRAF_USE_P_ID = 'typograf_use_p';
const TYPOGRAF_ENTITY_TYPE_ID = 'typograf_entity_type';
const TYPOGRAF_SETTINGS_ID = 'typograf_settings';

const ENTITY_TYPE_HTML = 1;
const ENTITY_TYPE_XML = 2;
const ENTITY_TYPE_NONE = 3;
const ENTITY_TYPE_MIX = 4;

var optionUseBR = GM_getValue(USE_BR_OPTION, false);
var optionUseP = GM_getValue(USE_P_OPTION, false);
var entityType = GM_getValue(ENTITY_TYPE_OPTION, ENTITY_TYPE_MIX);

var requestIsInProcess = false;
var shouldSubmit = false;

var textarea = null;

/**
 * Prepares request to WebService and sends it.
 */
function remoteTypograf(text) {
    text = text.replace(/&/g, '&amp;');
    text = text.replace(/</g, '&lt;');
    text = text.replace(/>/g, '&gt;');
    var xmlRequest = '<?xml version="1.0" encoding="UTF-8"?>' + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' + '<soap:Body>' +
                     '<ProcessText xmlns="http://typograf.artlebedev.ru/webservices/">\n' +
                     '\t<text>' + text + '</text>\n' +
                     '\t<entityType>' + entityType + '</entityType>\n' +
                     '\t<useBr>' + optionUseBR + '</useBr>\n' +
                     '\t<useP>' + optionUseP + '</useP>\n' +
                     '</ProcessText>\n' +
                     '</soap:Body>\n' +
                     '</soap:Envelope>\n';
    requestTypograf('http://typograf.artlebedev.ru/webservices/typograf.asmx', xmlRequest);
}

/**
 * Asynchronously requests WebService, sets callback function
 */
function requestTypograf(url, text) {
    showTypografConversionProgress(true);
    //GM_log("Request:" + text);
    GM_xmlhttpRequest({
        method: 'POST',
        url: url,
        headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey Typograf Userscript (rustydragon18@yahoo.com)',
            'Accept' :'application/xml'},
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
    //GM_log("Response:" + responseDetails.responseText);
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
    var re = /<ProcessTextResult>\s*((.|\n)*?)\s*<\/ProcessTextResult>/m;
    var response = re.exec(text);
    response = RegExp.$1;
    response = response.replace(/&gt;/g, '>');
    response = response.replace(/&lt;/g, '<');
    response = response.replace(/&amp;/g, '&');

    if (textarea) { // To be sure that user was not faster than script
        textarea.value = response;
        if (shouldSubmit) {
            submitForm(textarea);
        }
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
 * If CTRL-ENTER or SHIFT-ENTER are pressed - performs typografic conversion.
 */
function onKeyDownEvent(e) {
    if ((e.keyCode == 13) && (e.ctrlKey || e.shiftKey)) {
        shouldSubmit = e.ctrlKey;
        e.preventDefault();
        if (this.nodeName == 'TEXTAREA' || (this.nodeName == 'INPUT' && this.type == "text")) {
            if (requestIsInProcess) {
                return false;
                // Aleady in process, cancel
            }
            textarea = this;
            requestIsInProcess = true;
            remoteTypograf(this.value)
        } else {
            if (shouldSubmit) {
                submitForm(this);
            }
        }
        return false;
    }
    return true;
}

/**
 * Submits form, to which element belongs.
 */
function submitForm(element) {
    // Pretty stright forward. Should 
    var p = element.parentNode;
    var i = 0;
    while (p.nodeName != 'FORM' && i++ < 100) {
        p = p.parentNode;
    }

    if (p.nodeName == 'FORM') {
        p.submit();
    }
}

/**
 * Returns CSS for DIVs used for displaying various information.
 */
function getDivCSS(left, top) {
    return 'z-index: 99; border: 1px solid navy; padding: 6px; background: white; color: black; position: absolute;' +
           'left:' + left + 'px; top: ' + top + 'px; text-align: left;';
}

/**
 * Saves settings into persistent storage, closes settings dialog.
 */
function settingsSave(ev) {
    optionUseBR = document.getElementById(TYPOGRAF_USE_BR_ID).checked;
    GM_setValue(USE_BR_OPTION, optionUseBR);

    optionUseP = document.getElementById(TYPOGRAF_USE_P_ID).checked;
    GM_setValue(USE_P_OPTION, optionUseP);

    var checkboxes = document.getElementsByName(TYPOGRAF_ENTITY_TYPE_ID);
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            entityType = checkboxes[i].value;
            break;
        }
    }
    GM_setValue(ENTITY_TYPE_OPTION, entityType);

    closeSettings();
}

/**
 * Called when 'cancel' button is pressed on setting dialog
 */
function settingsCancel(ev) {
    closeSettings();
}

/**
 * Closess settings dialog. Called after 'save' or 'cancel' button is pressed
 */
function closeSettings() {
    var settingsDiv = document.getElementById(TYPOGRAF_SETTINGS_ID);
    if (settingsDiv) {
        settingsDiv.parentNode.removeChild(settingsDiv);
    }
}

/**
 * Shows settings dialog. If already on screen - does nothing
 */
function showSettingsDialog() {
    var oldPopup = document.getElementById(TYPOGRAF_SETTINGS_ID);
    if (oldPopup) {
        return;
    }

    var div = document.createElement('div');
    div.id = TYPOGRAF_SETTINGS_ID;
    div.style.cssText = getDivCSS(10, 200);
    div.innerHTML = '<fieldset style="margin-bottom:1em"><legend>Typograf settings</legend>' +
                    '<input type="checkbox" id="' + TYPOGRAF_USE_BR_ID + '" ' + ((optionUseBR)?'CHECKED':'') + '><label for="' + TYPOGRAF_USE_BR_ID + '" title="Use <BR> tag for marking line ends">use BR tag</label><br />' +
                    '<input type="checkbox" id="' + TYPOGRAF_USE_P_ID + '" ' + ((optionUseP)?'CHECKED':'') + '><label for="' + TYPOGRAF_USE_P_ID + '" title="Use <P> tag for marking paragraphs">use P tag</label><br />' +
                    '<br />' +
                    'Output symbols as:<br />' +
                    '&nbsp;<input name="' + TYPOGRAF_ENTITY_TYPE_ID + '" id="entity_' + ENTITY_TYPE_MIX + '" value="' + ENTITY_TYPE_MIX + '" type="radio"><label for="entity_' + ENTITY_TYPE_MIX + '" title="Universal. Compatible with most new and old browsers.">named and numeric entities</label><br />' +
                    '&nbsp;<input name="' + TYPOGRAF_ENTITY_TYPE_ID + '" id="entity_' + ENTITY_TYPE_HTML + '" value="' + ENTITY_TYPE_HTML + '" type="radio"><label for="entity_' + ENTITY_TYPE_HTML + '" title="Good for XML, old browsers may get it wrong.">named entities</label><br />' +
                    '&nbsp;<input name="' + TYPOGRAF_ENTITY_TYPE_ID + '" id="entity_' + ENTITY_TYPE_XML + '" value="' + ENTITY_TYPE_XML + '" type="radio"><label for="entity_' + ENTITY_TYPE_XML + '" title="Old browsers may get render it incorrect.">numeric entities</label><br />' +
                    '&nbsp;<input name="' + TYPOGRAF_ENTITY_TYPE_ID + '" id="entity_' + ENTITY_TYPE_NONE + '" value="' + ENTITY_TYPE_NONE + '" type="radio"><label for="entity_' + ENTITY_TYPE_NONE + '" title="Symbols are returned in the way readers will see it.">symbols</label><br />' +
                    '</fieldset>' +
                    '<button type="button" id="typograf_save">Save settings</button>&nbsp;' +
                    '<button type="button" id="typograf_cancel">Cancel</button>';

    document.body.appendChild(div);
    document.getElementById('entity_' + entityType).checked = true;

    div.style.cssText = getDivCSS(window.scrollX + Math.floor((window.innerWidth - div.clientWidth) / 2),
            window.scrollY + Math.floor((window.innerHeight - div.clientHeight) / 3));

    var button = document.getElementById('typograf_save');
    button.addEventListener('click', settingsSave, false);

    button = document.getElementById('typograf_cancel');
    button.addEventListener('click', settingsCancel, false);
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
    //Register menu command
    GM_registerMenuCommand('Typograf settings', showSettingsDialog);
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
