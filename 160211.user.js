// ==UserScript==
// @name            Google Translate Keyboard Everywhere
// @description     25 keyboard shortcuts (with on-screen help) to use GT at rapid pace.
// @icon            http://translate.google.com/favicon.ico
// @version         2.1.20130908
// @namespace       http://jakub-g.github.com
// @author          http://jakub-g.github.com
// @license         Apache 2.0
// @downloadURL     https://raw.github.com/jakub-g/greasemonkey-userscripts/master/googleTranslate/keyboardEverywhere.js
// @userscriptsOrg  http://userscripts.org/scripts/show/160211
// @grant           none
// @include         http://translate.google.tld/*
// ==/UserScript==

// History:
// 1.0 initial version
// 2.0 add min mode, fix not working things after HTML changes in GT
// 2.1 prevent ALT+1, ALT+3 from hiding language selection popups (was hanging Firefox when clicked
//       quickly several times); use ESC instead.

//var console = unsafeWindow.console;

// Tested on Firefox 19.
// You're welcome to report issues on https://github.com/jakub-g/greasemonkey-userscripts/issues

//
// Default shortcuts map on QWERTY keyboard:
//  1234     0
//  qwertyu  p
//  asdfgh k
//  zxcvb
//
// Push ALT+H or ALT+0 (zero) to display all shortcuts on screen in their proper places.
//
// All the keyboards are bound to LEFT ALT only, because right Alt (AltGr) is used e.g. to input
// national characters in some languages like Polish.
//
// Because some of things in GT are input language dependent and asynchronous, not all shortcuts
// might be displayed and/or after changing langs, help hints may disappear. Use the shortcuts
// twice to toggle the shortcuts off and on again. The shortcuts will work even if they are not displayed.

// Customize the shortcuts on your own risk. I didn't put much fool-proof error-checking in the code.
// Note that the entries below should not contain duplicates, it's up to you to check.
// Note also that function names in exports.actions must match (automagical binding of shortcuts
// to the functions).
//
// As a convention, each entry has its help-display function with the same name.
//
// Keys in 'chooseLangs' and 'changeLangsFromShortlist' have special meanings - they are an array
// in which element corresponds to a certain button next to each other in the Google language bars.
//
// I the other entries, multiple values mean all of those shortcuts is equivalent
// (e.g. 0 and h in 'toggleDisplayHelp').

// =================================================================================================
//                                               CONFIG
// =================================================================================================

var exports = { // container for globals
    status : {
        helpersDisplayed : false // internal
    },
    settings : {
        minMode : true, // hide unnecessary things; shrink and center. Useful in conjuction with Tile Tabs addon to have GT above/below the other window: https://addons.mozilla.org/pl/firefox/addon/tile-tabs/
        acceptRightAlt : false // default false, toggle to true if you don't use right alt + letter to type diacritics
    }
};

// Tested only for a..z 0..9 keys!
exports.listeners = {
    toggleDisplayHelp : [
        '0', 'h'
    ],
    chooseLangs : [
        '1', '2', '3', '4'
    ],
    changeLangsFromShortlist : [
        'q', 'w', 'e', 'r',
        't', 'y', 'u'
    ],
    clearInputAndFocus : [
        'x'
    ],
    inputFocus : [
        'z'
    ],
    turnOnVKeyboard : [ // displayed when input = french, spanish, russian etc.
        'a'
    ],
    selectInputType : [ // displayed when input = russian, german etc.
        's'
    ],

    inPlay : [
        'd'
    ],
    inShowSample : [ // displayed when input = popular langs like english, spanish, french
        'f'
    ],
    inDisplayPhonetical : [ // displayed when input = russian etc.
        'g'
    ],

    outCopy : [
        'k'
    ],

    outPlay : [
        'c'
    ],
    outShowSample : [ // displayed when output = popular langs like english, spanish, french
        'v'
    ],
    outDisplayPhonetical : [ // displayed when output = russian etc.
        'b'
    ],

    spellingOrLangCorrection : [ // "Did you mean: ..." or "Translate from lang: ..."
        'p'
    ],
};

// =================================================================================================
//                       DO NOT EDIT BELOW UNLESS YOU KNOW WHAT YOU'RE DOING
// =================================================================================================

exports.actions = {

    toggleDisplayHelp : function() {
        // GT page is very dynamic and nodes are refreshed in reaction to some events
        // hence we can't just toggle shortcuts by hide/show as they'll disappear in the meantime

        if (! exports.status.helpersDisplayed) {
            for(var fnName in exports.listeners) {
                //  fire all helper functions connected to the bindings
                if(DisplayHelpUtil[fnName]){
                    DisplayHelpUtil[fnName]();
                }
            }

            exports.status.helpersDisplayed = true;
        } else {

            var allElems = document.querySelectorAll('.gt-shortcut-helper');
            for(var i = 0; i < allElems.length; i++){
                allElems[i].parentNode.removeChild(allElems[i]);
            }

            exports.status.helpersDisplayed = false;
            document.getElementById('gt-shortcut-helper-main-placeholder').innerHTML = '';
        }
    },

    chooseLangs  : function(keyCode) {
        var idxToIdMap = ['gt-sl-gms', 'gt-swap', 'gt-tl-gms', 'gt-submit'];

        var charCode = KeyUtil.charCodeFromKeyCode(keyCode);
        var charVal = String.fromCharCode(charCode);
        var idx = exports.listeners.chooseLangs.indexOf(charVal);

        // simulate a click on the target button
        var targetHtmlElem = document.getElementById(idxToIdMap[idx]);

        // Only allow to display the popup with Alt+1, Alt+3
        // To dismiss it, you have to click ESC which is handled by GT itself
        // (anyway, this is the only working way in Chrome)
        //
        // Without that, in Firefox, when user quickly clicks the same combination
        // from the keyboard multiple times, the CPU starts spinning up to 100%
        // Not sure how to work around it better...
        if(idx == 0 || idx == 2) {
            var pop1 = document.getElementById('gt-sl-gms-menu');
            var pop2 = document.getElementById('gt-tl-gms-menu');
        }
        if((idx == 0 && pop1 && pop1.style.display != 'none') ||
           (idx == 2 && pop2 && pop2.style.display != 'none')) {
            return; // Click ESC from keyboard to hide the popup...

            /*0. hide it directly: spins CPU to 100%
            setTimeout(function() {
                pop1.style.display = 'none';
                pop2.style.display = 'none';
            }, 100);
            */

            /* 1. simulate click outside the popup to hide it: this is prone to the same 100% CPU issue...
            setTimeout(function() {
                MouseUtil.dispatchMouseEventsToHtmlElement(document.getElementById('gt-c'));
            }, 100);
            */

            /* 2. dispatching fake ESC doesn't hide the popup, even though event listeners are really invoked
            setTimeout(function () {
                var kbdEvent = document.createEvent("KeyboardEvent");
                kbdEvent.initKeyEvent("keydown", true, true, window, false, false, false, false, 27, 0);
                document.getElementById('gt-sl-gms').dispatchEvent(kbdEvent);
            }, 100);
            */
        }else {
            setTimeout(function() {
                MouseUtil.dispatchMouseEventsToHtmlElement(targetHtmlElem);
            }, 100);
        }
    },

    changeLangsFromShortlist : function(keyCode) {
        // look up the config to see at which index this specific keyCode is
        var charCode = KeyUtil.charCodeFromKeyCode(keyCode);
        var charVal = String.fromCharCode(charCode);
        var idx = exports.listeners.changeLangsFromShortlist.indexOf(charVal);

        var allElems = document.querySelectorAll('#gt-sl-sugg > div, #gt-tl-sugg > div');

        // reset style of all buttons - they keep hover class redundantly
        for(var i = 0; i < allElems.length; i++){
            var htmlElem = allElems[i];
            htmlElem.className = htmlElem.className.replace('goog-toolbar-button-hover', '');
        }

        // simulate a click on the target button
        var targetHtmlElem = allElems[idx];
        MouseUtil.dispatchMouseEventsToHtmlElement(targetHtmlElem);
    },
    clearInputAndFocus : function () {
        document.getElementById('source').value = "";
        document.getElementById('source').focus();
    },
    inputFocus : function () {
        document.getElementById('source').focus();
    },

    turnOnVKeyboard  : function() {
        GTUtil.clickBySelector('#gt-src-tools a', 0);
    },

    selectInputType : function () {
        GTUtil.clickBySelector('#gt-src-tools a', 1);
    },

    inPlay : function () {
        GTUtil.clickById('gt-src-listen');
    },
    inShowSample : function () {
        GTUtil.clickById('gt-src-ex-bt');
    },
    inDisplayPhonetical : function () {
        GTUtil.clickById('gt-src-roman');
    },

    outCopy : function () {
        GTUtil.clickById('gt-res-select');
    },

    outPlay : function () {
        GTUtil.clickById('gt-res-listen');
    },
    outShowSample : function() {
        GTUtil.clickById('gt-res-ex-bt');
    },
    outDisplayPhonetical : function() {
        GTUtil.clickById('gt-res-roman');
    },

    spellingOrLangCorrection : function () {
        GTUtil.clickBySelector('#spelling-correction > a');
    },
};

// =================================================================================================

var DisplayHelpUtil = {

    _initialHelp : function () {
        var container = document.querySelector('#gbx1');
        var shortcuts = '{' + exports.listeners.toggleDisplayHelp.join('|') + '}';

        container.innerHTML += '<div id="gt-shortcut-helper-main" style="margin-left:140px; font-weight:bold; color:red;">\
            <div id="gt-shortcut-helper-main-welcome">Press LEFT ALT+'+shortcuts+' at any time to toggle display of ALT-prefixed keyboard shortcuts (click me to hide)</div>\
            <div id="gt-shortcut-helper-main-placeholder"></div>\
            </div>';
        container.addEventListener('click', function () {
            document.getElementById('gt-shortcut-helper-main-welcome').style.display = 'none';
        });
    },

    changeLangsFromShortlist : function () {
        var keys = exports.listeners.changeLangsFromShortlist;
        var allElems = document.querySelectorAll('#gt-sl-sugg > div > div > div, #gt-tl-sugg > div > div > div');

        for(var i = 0; i < allElems.length; i++){
            var elem = allElems[i];
            elem.innerHTML += '<span class="gt-shortcut-helper"> [' + keys[i] + ']</span>';
        }
    },

    chooseLangs : function () {
        var makeSpan = DisplayHelpUtil._makeSpan;
        var keys = exports.listeners.chooseLangs;

        //var idxToIdMap = ['gt-sl-gms', 'gt-swap', 'gt-tl-gms', 'gt-submit'];
        document.querySelector('#gt-sl-gms > div:first-of-type').innerHTML += makeSpan(keys[0]);
        document.querySelector('#gt-swap')                      .innerHTML += makeSpan(keys[1]);
        document.querySelector('#gt-tl-gms > div:first-of-type').innerHTML += makeSpan(keys[2]);
        document.querySelector('#gt-lang-submit')               .innerHTML += makeSpan(keys[3]);
    },

    clearInputAndFocus : function clearInputAndFocus() {
        GTUtil.writeKeysBySelector('#gt-src-tools', arguments.callee.name, 'Focus & clear: ', 'float:right');
    },
    inputFocus : function inputFocus() {
        GTUtil.writeKeysBySelector('#gt-src-tools', arguments.callee.name, 'Focus: ', 'float:right');
    },

    turnOnVKeyboard : function () {
        var res = document.querySelectorAll('#itamenu a');
        if(res.length == 1) {
            GTUtil.writeKeysBySelector('#gt-src-tools', 'turnOnVKeyboard');
        } else if (res.length == 2) {
            GTUtil.writeKeysBySelector('#gt-src-tools', 'turnOnVKeyboard');
            GTUtil.writeKeysBySelector('#gt-src-tools', 'selectInputType');
        }
    },

    inPlay : function inPlay() {
        GTUtil.writeKeysById('gt-src-listen', arguments.callee.name);
    },
    inShowSample : function inShowSample() {
        GTUtil.writeKeysById('gt-src-ex-bt', arguments.callee.name);
    },
    inDisplayPhonetical : function inDisplayPhonetical() {
        GTUtil.writeKeysById('gt-src-roman', arguments.callee.name);
    },

    outCopy : function outCopy() {
        GTUtil.writeKeysById('gt-res-select', arguments.callee.name);
    },

    outPlay : function outPlay() {
        GTUtil.writeKeysById('gt-res-listen', arguments.callee.name);
    },
    outShowSample : function outShowSample() {
        GTUtil.writeKeysById('gt-res-ex-bt', arguments.callee.name);
    },
    outDisplayPhonetical : function outDisplayPhonetical() {
        GTUtil.writeKeysById('gt-res-roman', arguments.callee.name);
    },

    spellingOrLangCorrection : function spellingOrLangCorrection() {
        GTUtil.writeKeysBySelector('#spelling-correction', arguments.callee.name);
    },

    _makeSpan : function(text) {
        return '<span class="gt-shortcut-helper"> [' + text + ']</span>';
    },

    _makeSpanForAppend : function(text, cssText) {
        var newEl = document.createElement('span');
        newEl.className = 'gt-shortcut-helper';
        newEl.style.cssText = cssText;
        newEl.innerHTML = '[' + text + ']';
        return newEl;
    },
};

// =================================================================================================

var KeyUtil = { // only tested for a..z 0..9
    charCodeFromKeyCode : function(keyCode){
        var charCode = keyCode;
        if(charCode >= 97-32 && charCode <= 122-32){ // a..z
                charCode += 32;
        }
        return charCode;
    },

    keyCodeFromCharCode : function(charCode){
        var keyCode = charCode;
        if(keyCode >= 97 && keyCode <= 122){ // a..z
            keyCode -= 32;
        }
        return keyCode;
    },

    /**
     * Converts  {foo: ['1', '2'], bar : ['3']} to {'1' : 'foo', '2' : 'foo', '3': 'bar'}
     */
    mapKeyCodesToListeners : function (listeners) {
        var keyToFunctionMap = {};
        for (funcName in listeners) {
            var aKeyNames = listeners[funcName];
            aKeyNames.forEach(function(sKeyName){
                var charCode = sKeyName.charCodeAt(0);
                var keyCode = KeyUtil.keyCodeFromCharCode(charCode);
                keyToFunctionMap[keyCode] = funcName;
            });
        }
        return keyToFunctionMap;
    }
};

// =================================================================================================

var MouseUtil = {
    /**
     * Inspired by http://stackoverflow.com/a/7137323/245966
     */
    dispatchMouseEventsToHtmlElement : function (htmlEl) {
        if(!htmlEl) {
            return;
        }

        try {
            htmlEl.click(); // for links
        } catch(e){}

        // for non-links
        var clickEvent;

        clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent('mouseover', true, true);
        htmlEl.dispatchEvent(clickEvent);

        setTimeout(function() {
            clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('mousedown', true, true);
            htmlEl.dispatchEvent(clickEvent);

            clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('mouseup', true, true);
            htmlEl.dispatchEvent(clickEvent);
        }, 200);
    }
};

// =================================================================================================

var GTUtil = {
    writeKeysBySelector : function (selector, fnName, additionalText, cssText) {
        //if(selector == '#gt-src-tools') selector = '#gt-src-tools';
        var keys = exports.listeners[fnName];

        var el = document.querySelector(selector);
        if(el) {
            var text = (additionalText || '') + keys.join(' | ');
            // using innerHTML breaks event listeners sometimes
            el.appendChild( DisplayHelpUtil._makeSpanForAppend(text, cssText) );
        }
    },
    writeKeysById : function (id, fnName) {
        var makeSpan = DisplayHelpUtil._makeSpan;
        var keys = exports.listeners[fnName];

        var el = document.getElementById(id);
        if(el) {
            el.innerHTML += makeSpan(keys.join(' | '));
        }
    },

    clickById : function (id) {
        GTUtil._resetHelperButtonsHover();

        var elem = document.getElementById(id);
        MouseUtil.dispatchMouseEventsToHtmlElement(elem);
    },
    clickBySelector : function (selector, idx) {
        GTUtil._resetHelperButtonsHover();

        var elem;
        idx = idx || 0;
        if(idx == 0) {
            elem = document.querySelector(selector);
        }else {
            elem = document.querySelectorAll(selector)[idx];
        }
        MouseUtil.dispatchMouseEventsToHtmlElement(elem);
    },


    _resetHelperButtonsHover : function () {
        var selector = '#gt-src-listen, \
            #gt-src-ex-bt, \
            #gt-src-roman, \
            #gt-res-select, \
            #gt-res-listen, \
            #gt-res-ex-bt, \
            #gt-res-roman';
        var allElems = document.querySelectorAll(selector);

        // reset style of all buttons - they keep hover class redundantly
        for(var i = 0; i < allElems.length; i++){
            var htmlElem = allElems[i];
            htmlElem.className = htmlElem.className.replace('goog-toolbar-button-hover', '');
        }

    },
};

// =================================================================================================

var MinModeUtil = {
    _hideById : function(aIds) {
        aIds.forEach(function(id){
            document.getElementById(id).setAttribute('style', 'display: none !important');
        });
    },

    _hideBySelector : function(selector) {
        document.querySelector(selector).setAttribute('style', 'display: none !important');
    },

    _floatCenter : function(containerId, subContainersQuery) {
        document.getElementById(containerId).style.cssText += 'text-align:center;'
        var nlElems = document.querySelectorAll(subContainersQuery);
        [].forEach.call(nlElems, function(elem) {
            elem.style.cssText += 'display: inline-block; float:none;';
        });
    },

    _squeezeAndCenter : function() {
        document.getElementById('gt-form-c').style.cssText += 'margin: 0 auto; max-width: 800px;';
        document.getElementById('gt-c').style.cssText += 'min-width: 400px;' // was causing problem on zoom-text-only ctrl++

        setTimeout(function() {
            document.getElementById('result_box').style.cssText += 'min-height:49px'; // 89px originally
            document.getElementById('source').    style.cssText += 'height:65px'; // 105px originally
        }, 1000);
    },

    activateMinMode : function() {
        MinModeUtil._hideById(['gt-appname', 'gb', 'gt-ft', 'gt-ft-res']);
        MinModeUtil._hideBySelector('#gt-question-promo > span');
        MinModeUtil._floatCenter('gt-langs', '#gt-langs > div');
        MinModeUtil._squeezeAndCenter();

        setTimeout(function(){
            MinModeUtil._hideById(['select_document']);
        }, 800)
    }
};

// =================================================================================================

var init = function (){
    exports.keycodeToFunctionMap = KeyUtil.mapKeyCodesToListeners(exports.listeners);

    document.body.onkeydown = function(e){
        e = e || window.event;

        if (!e.altKey || (exports.settings.acceptRightAlt !== true && e.altKey && e.ctrlKey)) { // AltGr activates both alt and ctrl...
            return;
        }
        var keyCode = e.keyCode;

        if(exports.keycodeToFunctionMap[keyCode]){
            e.preventDefault(); // to not trigger browser shortcuts, e.g. ALT+T = expand Tools in Firefox

            var fnName = exports.keycodeToFunctionMap[keyCode];
            //console.log(fnName, keyCode);
            var fn = exports.actions[fnName];
            if(fn && typeof fn === "function"){
                fn(keyCode);
            }
        }
    };

    DisplayHelpUtil._initialHelp();

    if(exports.settings.minMode) {
        MinModeUtil.activateMinMode();
    }
};

init();
