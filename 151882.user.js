// ==UserScript==
// @name          Google Calendar Collapsible Nav
// @version       0.2.0
// @description   Makes the left-hand side navigation pane in Google Calendar collapsible.
// @namespace     http://userscripts.org/users/377329
// @author        Jonathan Brochu (http://userscripts.org/users/377329)
// @license       GPLv3 or later (http://www.gnu.org/licenses/gpl-3.0.en.html)
// @require       http://userscripts.org/scripts/version/44063/70779.user.js
// @include       http://www.google.com/calendar/*
// @include       https://www.google.com/calendar/*
// @include       http://*.google.com/calendar/*
// @include       https://*.google.com/calendar/*
// @grant         GM_addStyle
// @grant         GM_getValue
// @grant         GM_setValue
// @updateURL     https://userscripts.org/scripts/source/151882.meta.js
// @downloadURL   https://userscripts.org/scripts/source/151882.user.js
// ==/UserScript==

/***
 * History:
 *
 * 0.2.0  Changes made:
 *        - Now script stores and remembers last state of the nav pane between
 *          sessions (i.e. either collapsed or expanded).
 *        - Moved code using MooTools features within the payload() function
 *          (technically, the @require scripts are retrieved only once, when
 *          the user script is installed, so it should always be loaded and
 *          available within the sandbox, but just in case it isn't).
 *        - Added script update capability.
 *        (2014-01-27)
 * 0.1.3  Change made:
 *        - Reduced left margin of restore handle for when layout density is in
 *          "Compact" mode.
 * 0.1.2  Changes made:
 *        - Reverted to the original (pre-release) location of the handle used
 *          to restore the navigation pane, i.e. at left of the Calendar logo,
 *          as when at the current location (above the timezones column) the
 *          handle gets detroyed when changing views (i.e. agenda, month, etc.)
 *        - Changed and standardized variable names and element ids for the
 *          collapse (hide) and restore (show) handles and their containers,
 *          so the script makes a bit more sense when reading it.
 *        - Removed some debug calls.
 *        (2012-11-07)
 * 0.1.1  Changes made:
 *        - Removed some test strings left behind after testing localization
 *          support.
 *        - Corrected the fact that "localization" is 12-letter long, not 13.
 *        (2012-11-07)
 * 0.1    First implementation.
 *        Currently using a modified version of MooTools v1.2.1 compatible
 *        with Greasemonkey (by kchmck, http://userscripts.org/users/kchmck).
 *        (2012-11-07)
 *
 */

(function() {
    // constants
    var BUILD_RESTORE_HANDLE_LEFT_OF_LOGO = 1;
    var USERSCRIPT_NAME = 'Google Calendar Collapsible Nav';
    var ID_NAV_COLLAPSE_HANDLE = 'nav-collapse-handle';
    var ID_NAV_RESTORE_HANDLE = 'nav-restore-handle';
    
    // reference some outside objects
    window.console = unsafeWindow.console || { 'log': function(){} };
    
    // extend MooTools library with features added since mootools-1.2.1
    var extendMooTools = function() {
        // typeOf (added in the mootools-1.4.x branch)
        window.typeOf = function (item){
            if (item == null) return 'null';
            // before mootools-1.3.x, $family was an object, not a function
            if (typeof(item.$family) == 'function') return item.$family();
            if (typeof(item.$family) == 'object' && typeof(item.$family.name) != 'undefined') return item.$family.name;
            if (item.nodeName) {
                if (item.nodeType == 1) return 'element';
                if (item.nodeType == 3) return (/\S/).test(item.nodeValue) ? 'textnode' : 'whitespace';
            } else if (typeof item.length == 'number') {
                if (item.callee) return 'arguments';
                if ('item' in item) return 'collection';
            }
            return typeof item;
        };
        if (typeof(Object.append) == 'undefined') {
            // Not using $extend(), since it only allows one extension object
            Object.append = function(original /*, extension, extension, [...] */) {
                for (var i = 1, l = arguments.length; i < l; i++) {
                    var extension = arguments[i] || {};
                    for (var key in extension) original[key] = extension[key];
                }
                return original;
            };
        }
        if (typeof(Object.clone) == 'undefined') {
            Object.clone = function(original) {
                var clone = {};
                for (var key in original)
                    switch (typeOf(original[key])) { // No need of typeOf() here
                        case 'array': clone[key] = Array.clone(original[i]);
                        case 'object': clone[key] = Object.clone(original[i]);
                        default: clone[i] = original[i];
                    }
                    clone[key] = cloneOf(object[key]);
                return clone;
             };
         }
        if (typeof(Object.each) == 'undefined') {
            Object.each = function(object, fn, bind) {
                if (typeof(object) == 'array') {
                    return Array.each(object, fn, bind);
                } else {
                    var hasOwnProperty = Object.prototype.hasOwnProperty;
                    for (var key in object){
                        if (hasOwnProperty.call(object, key)) fn.call(bind, object[key], key, object);
                    }
                }
            };
        }
        if (typeof(Array.clone) == 'undefined') {
            Array.clone = function(original) {
                var i = original.length,
                    clone = new Array(i);
                while (i--)
                    switch (typeof(original[i])) { // No need of typeOf() here
                        case 'array': clone[i] = Array.clone(original[i]);
                        case 'object': clone[i] = Object.clone(original[i]);
                        default: clone[i] = original[i];
                    }
                return clone;
            };
        }
        if (typeof(Array.each) == 'undefined') {
            Array.each = function(iterable, fn, bind) {
                if (typeof(iterable) == 'object') {
                    return Object.each(iterable, fn, bind);
                } else {
                    for (var i = 0, l = iterable.length; i < l; i++) {
                        fn.call(bind, iterable[i], i, iterable);
                    }
                }
            };
        }
    }
    
    // payload to be executed once MooTools and the document are available
    var payload = function() {        
        // init localized strings
        // 2012-11-08: Moved within payload() function, even if most js engines
        //             use lazy parsing nowadays.
        var docLangs = [];
        var l10n = {
            '_default_': 'en',
            'en': {
                '$1': 'Show navigation pane',
                '$2': 'Hide navigation pane'
            },
            'fr': {
                '$1': 'Restaurer le panneau de navigation',
                '$2': 'Cacher le panneau de navigation'
            },
            'getString': function(strId /*, langId */){
                // build array of possible languages in order of priority
                var langs = Array.clone(docLangs).include(arguments[1] || this._default_);
                // try for each language
                for (var i=0; i < langs.length; i++) {
                    var langId = langs[i];
                    if (this[langId] && this[langId][strId]) return this[langId][strId];
                }
            }
        }

        // get locale(s) of Google Calendar
        document.body.className.split(' ').each(function(item){
            if (parts = item.split('-'), parts[0] == 'loc') docLangs.push(parts[1]);
        });
        if (docLangs.length == 0) docLangs.push('en');
        // get elements
        var calcontent = window.$('calcontent');
        if (!calcontent) { console.log('[' + USERSCRIPT_NAME + ']: Element "#calcontent" not found'); return; }
if (BUILD_RESTORE_HANDLE_LEFT_OF_LOGO){
        var restoreHandleContainer = window.$('vr-nav').getElement('div.applogo');
        if (!restoreHandleContainer) { console.log('[' + USERSCRIPT_NAME + ']: Element "#vr-nav div.applogo" not found'); return; }

} else { // (!BUILD_RESTORE_HANDLE_LEFT_OF_LOGO)
        var restoreHandleContainer = calcontent.getElement('#mothertable #gridcontainer');
        if (!restoreHandleContainer) { console.log('[' + USERSCRIPT_NAME + ']: Element "#gridcontainer" not found'); return; }
} // if (BUILD_RESTORE_HANDLE_LEFT_OF_LOGO)
        var mainlogo = window.$('mainlogo');
        if (!mainlogo) { console.log('[' + USERSCRIPT_NAME + ']: Element "#mainlogo" not found'); return; }
        var mainbody = window.$('mainbody');
        if (!mainbody) { console.log('[' + USERSCRIPT_NAME + ']: Element "#mainbody" not found'); return; }
        var nav = window.$('nav');
        if (!nav) { console.log('[' + USERSCRIPT_NAME + ']: Element "#nav" not found'); return; }
        // get other elements
        var collapseHandleContainer = nav.getElement('#sidebar > div.qnb-container');
        if (!collapseHandleContainer) { console.log('[' + USERSCRIPT_NAME + ']: Element "#sidebar > div.qnb-container" not found'); return; }
        // destruct previous elements
        navCollapseHandle = window.$(ID_NAV_RESTORE_HANDLE);
        navRestoreHandle = window.$(ID_NAV_RESTORE_HANDLE);
        if (navCollapseHandle) navCollapseHandle.destroy();
        if (navRestoreHandle) navRestoreHandle.destroy();
        // re-enable previous nav pane state
        var navCollapsed = GM_getValue('navCollapsed', false);
        if (navCollapsed) {
            nav.addClass('collapsed');
            mainbody.addClass('full-left');
        }
        // create UI elements to hide and restore nav pane
        var navCollapseHandle = new Element('span', {
            'id': ID_NAV_COLLAPSE_HANDLE,
            'title': l10n.getString('$2'),
            'events': {
                'click': function() {
                    if (!nav.hasClass('collapsed')) {
                        GM_setValue('navCollapsed', true);
                        mainbody.addClass('full-left');
                        (function() {
                            nav.addClass('collapsed');
                            navRestoreHandle.removeClass('hidden');
                        }).delay(250); // just a bit more than the #nav[transition] and #mainbody[transition]
                    }
                }
            }
        }).inject(collapseHandleContainer);
        var navRestoreHandle = new Element('span', {
            'id': ID_NAV_RESTORE_HANDLE,
            'title': l10n.getString('$1'),
            'class': (navCollapsed ? '' : 'hidden'),
            'events': {
                'click': function() {
                    if (nav.hasClass('collapsed')) {
                        GM_setValue('navCollapsed', false);
                        nav.removeClass('collapsed');
                        mainbody.removeClass('full-left');
                        this.addClass('hidden');
                    }
                }
            }
        }).inject(restoreHandleContainer);
        // dump css of #mainlogo
        var mainlogoCss = '';
        Object.each(
            mainlogo.getStyles('color', 'cursor', 'font-size', 'vertical-align'),
            function (item, key, object) {
                mainlogoCss += '    ' + key + ': ' + item + ';\n';
            }
        );
        // TODO: add possibility to add ourselves to the Google Calendar menu
        /*
        console.log($$('div.goog-menu-vertical:first-child[class~="goog-menuheader"]'));
        */
        // build css code to inject
        var css = '@namespace url(http://www.w3.org/1999/xhtml);\n';
        css += '#' + ID_NAV_COLLAPSE_HANDLE + ', #' + ID_NAV_RESTORE_HANDLE + ' {\n' +
               '    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAzCAMAAAC+N+gCAAAAGXRFWHRTb2Z0d2FyZQBBZG9i' +
                                                               'ZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFzDMz/8e/////tQcVFAAAAAN0Uk5T//8A18oNQQAA' +
                                                               'AHlJREFUeNrUlNsOgCAMQzv//6ONArJZ1pCoCfLAyA5sZVywpQ0PEGDBBlR88Kwgqz7zrOYa' +
                                                               'sSZjwC6FzLr4w+ftzKo8V65Q7EtUQ9Tw9fP6AoEmdoTWcUBifnhjIUJkU6vyXEKh2Nf6h3Je' +
                                                               'wmD/8hzW+RxUDantAgwAZ8IIoeE+68YAAAAASUVORK5CYII=);\n' +
               '    display: inline-block;\n' +
               '    font-weight: bold;\n' +
               '    height: 17px;\n' +
               '    opacity: 0.45;\n' +
               '    width: 26px;\n' +
                    mainlogoCss +
               '}\n';
        css += '#' + ID_NAV_COLLAPSE_HANDLE + ' {\n' +
               '    background-position: 0px -34px;\n' +
               '    margin-left: 24px;\n' +
               '    position: relative;\n' +
               '}\n';
if (BUILD_RESTORE_HANDLE_LEFT_OF_LOGO){
        css += '#' + ID_NAV_RESTORE_HANDLE + ' {\n' +
               '    background-position: 0px 0px;\n' +
               '    margin-left: 16px;\n' +
               '    position: relative;\n' +
               '}\n';
} else { // (!BUILD_RESTORE_HANDLE_LEFT_OF_LOGO)
        css += '#' + ID_NAV_RESTORE_HANDLE + ' {\n' +
               '    background-position: 0px 0px;\n' +
               '    position: absolute;\n' +
               '    left: 4px;\n' +
               '    top: 0px;\n' +
               '}\n';
} // if (BUILD_RESTORE_HANDLE_LEFT_OF_LOGO)
        css += '#' + ID_NAV_COLLAPSE_HANDLE + ':hover, #' + ID_NAV_RESTORE_HANDLE + ':hover {\n' +
               '    opacity: 1;\n' +
               '}\n';
        css += '#' + ID_NAV_COLLAPSE_HANDLE + '.hidden, #' + ID_NAV_RESTORE_HANDLE + '.hidden  {\n' +
               '    display: none;\n' +
               '}\n';
        css += '#calcontent.eui-t #' + ID_NAV_RESTORE_HANDLE + ' {\n' +
               '    background-position: 0px -17px;\n' +
               '    font-weight: normal;\n' +
               '    margin-left: 10px;\n' +
               '}\n';
        css += '#nav.collapsed {\n' +
               '    display: none !important;\n' +
               '}\n';
        css += '#calcontent #mainbody.full-left {\n' +
               '    margin-left: 44px !important;\n' +
               '}\n';
        css += '#calcontent.eui-s #mainbody.full-left {\n' +
               '    margin-left: 28px !important;\n' +
               '}\n';
        css += '#calcontent.eui-t #mainbody.full-left {\n' +
               '    margin-left: 16px !important;\n' +
               '}\n';
        // inject css
        if (typeof GM_addStyle != 'undefined') {
            GM_addStyle(css);
        } else if (typeof addStyle != 'undefined') {
            addStyle(css);
        } else {  
            var heads = document.getElementsByTagName('head');
            if (heads.length > 0) {
                var node = document.createElement('style');
                node.type = 'text/css';
                node.appendChild(document.createTextNode(css));
                heads[0].appendChild(node); 
            }
        }
    };
    
    // *** execution starts here ***
    
    // make sure MooTools is available
    if (typeof(MooTools) == 'undefined') {
        console.log('[' + USERSCRIPT_NAME + ']: MooTools not available');
        return;
    }
    
    // extend the MooTools library
    extendMooTools();
    
    // execute payload once Google Calendar has finished loading delayed content
    var tryPayload = function() {
        // check if element #sidebar > div.qnb-container is available
        var nav = window.$('nav'), ctn = null;
        if (nav) ctn = nav.getElement('#sidebar > div.qnb-container');
        if (ctn) {
            // execute payload
            payload();
        } else {
            // try again later
            tryPayload.delay(50);
        }
    };
    tryPayload.delay(10);
})();