// ==UserScript==
// @name          Google Contacts Compact
// @version       0.9.2
// @description   Mimics a "Compact" density setting for Google Contacts (until it is implemented natively by Google)
// @namespace     http://userscripts.org/users/377329
// @author        Jonathan Brochu (http://userscripts.org/users/377329)
// @license       GPLv3 or later (http://www.gnu.org/licenses/gpl-3.0.en.html)
// @include       http://www.google.com/contacts/*
// @include       https://www.google.com/contacts/*
// @exclude       http://www.google.com/contacts/_/*
// @exclude       https://www.google.com/contacts/_/*
// @grant         GM_addStyle
// @updateURL     https://userscripts.org/scripts/source/133981.meta.js
// @downloadURL   https://userscripts.org/scripts/source/133981.user.js
// ==/UserScript==

/***
 * Script Details & Goal:
 *
 *   The creation of this script came about following the need to have Google's
 *   newly dedicated contacts page (https://www.google.com/contacts/) displayed in
 *   a denser format, similar to the "Compact" density setting in Gmail/Google Mail.
 *
 *   The main goal was to devise a CSS-only solution (apart from the CSS injection
 *   code) to modify the page and replicate a "Compact" density setting. As such,
 *   this script could easily be translated into a user style for use with Stylish
 *   or any other similar add-on.
 *
 *   The main drawback of a CSS-only solution is that some aspects of the page's UI
 *   cannot be changed. The most obvious one is the width of the contacts list and
 *   those of the columns within, which are set programmatically based on the
 *   horizontal space available right of the groups list. Maximizing the width of
 *   the contacts list would involve replicating and overriding the page's function
 *   responsible for changing those widths following a window resize. Also, although
 *   it would be possible to modify/reduce the width of the groups list as well, we
 *   would still need to re-implement the contacts list resizing to take advantage
 *   of the newly available horizontal space.
 *
 *   In any case, this script is meant as a temporary solution until Google makes
 *   available a density setting for the Google Contacts page.
 *
 */
 
/***
 * History:
 *
 * 0.9.2  Changes made:
 *        - Updated @namespace to the value used for (my) other scripts.
 *        - Added script update capability.
 *        (2014-01-27)
 * 0.9.1  Changes made:
 *        - Updated CSS code with support for contact stars (specified for
 *          all versions since this is for new elements).
 *        (2014-01-21)
 * 0.9.0  Changes made:
 *        - Upgraded script to support the new Google Products menu (that
 *          replaces the old topmost black bar).
 *        (2013-10-22)
 * 0.8.5  Changes made:
 *        - Fixed priority for two CSS selectors.
 *        (2013-07-26)
 * 0.8.4  Changes made:
 *        - Updated script with new CSS rules following the change made by
 *          Google on the logo sprites.
 *        (2012-12-14)
 * 0.8.3  Changes made:
 *        - Updated script with new CSS rules following the change made by
 *          Google on the logo sprites.
 *        - Re-worked the positioning of top bars (topmost black bar, search
 *          bar and toolbar) so it's now in-line with that of the "Compact"
 *          setting used by other Google services.
 *        - Also fixed the positioning of dropdown menus for the topmost
 *          black bar.
 *        (2012-11-24)
 * 0.8.2  Minor change made:
 *        - Added the @grant key to the metadata block.
 *        (2012-10-19)
 * 0.8.1  Changes made:
 *        - Fixed left margin for inactive group parents (i.e. folders).
 *        - Specified license under which this script is being released.
 *        - Added script details and history log.
 *        (2012-05-23)
 * 0.8    First public release. (2012-05-22)
 *
 */

(function() {
    // css definitions
    var css_v1 =
            '@namespace url(http://www.w3.org/1999/xhtml);\n' +
        '/* Top Bars */\n' +
            // change top offset for bars (incl. topmost black bar and search bar)
            '#gbx1, #gb #gbx1, #gbq, #gbu, #gb #gbq, #gb #gbu { top: 24px /* original: 30px */ !important; }\n' +
            // change height of topmost black bar (absolute-positioned content + flow placeholder)
            '#gbzw, #gbz { height: 24px /* original: 30px */ !important; }\n' +
            '#gbx3, #gbx4 { height: 23px /* original: 29px */ !important; }\n' +
            // change line-height of topmost black bar + that div left of it
            '#gbzw .gbt { line-height: 20px /* original: 27px */ !important; }\n' +
            // change top offset of menus for the topmost black bar
            '#gbz .gbto #gbd, #gbz .gbto #gbs { top: 22px /* original: 29px */ !important; }\n' +
            // change left margin of topmost black bar items
            '#gbzw { margin-left: 6px /* original: 34px */ !important; }\n' +
            // change height of grey search bar
            '#gbx1, #gbx2 { height: 45px /* original: 71px */ !important; }\n' +
            // switch to smaller version of Google logo
            // **WARNING**: Could break once themes are used
            '#gbql { background-position: -242px 0px /* original: -45px 0 */ !important;' +
                   ' height: 38px /* original: 45px */ !important;' +
                   ' width: 96px /* original: 116px */ !important; }\n' +
            // adjust vertical alignment of new Google logo (through parent)
            '#gbqlw { height: 45px /* original: 71px */ !important; }\n' +
            // change left margin of Google logo (through grand-parent)
            '#gbq1 { margin-left: 16px /* original: 44px */ !important; }\n' +
            // change top offset of search box
            '#gbq2 { padding-top: 8px /* original: 20px */ !important; }\n' +
            // change top offset of Google+ -related elements, at right on the search bar
            '#gbu { padding-top: 8px /* original: 20px */ !important;' +
                  ' top: 24px /* original: 30px */ !important; }\n' +
            // eliminate right margin of Google+ -related elements, at right on the search bar
            '#gbu { margin-right: 0 /* original: 28px */ !important; }\n' +
            // reduce left margin of each Google+ -related elements (between the previous one)
            '#gbu .gbt { margin-left: 6px /* original: 15px */ !important; }\n' +
            // change total height of top section (topmost black bar + search bar)
            '#gb { height: 70px /* original: 102px */ !important; }\n' +
        '/* Toolbar */\n' +
            // change top & bottom offset of top toolbar
            '.XoqCub.GcwpPb-Z8OBDd.sziXU { margin-bottom: 7px /* original: 5px */ !important; }\n' +
            '.VP5otc-pzeoBf { margin-top: 0 /* original: 9px */ !important;' +
                            ' padding-bottom: 8px /* original: 14px */ !important; }\n' +
            // change right margin of top toolbar
            '.VP5otc-pzeoBf { padding-right: 16px /* original: 44px */ !important; }\n' +
            // change top & bottom offset of "Contact" label, at the left of top toolbar
            '.JvwNte { padding-top: 0 /* original: 9px */ !important;' +
                     ' padding-bottom: 16px /* original: 29px */ !important; }\n' +
            // change left margin of "Contacts" label
            '.piU2Fc { margin-left: 16px /* original: 44px */ !important; }\n' +
            // change minimum width of toolbar buttons...
            '.tk3N6e-LgbsSe { min-width: 20px /* original: 54px */ !important; }\n' +
            // ...except for page-nav buttons
            '.tk3N6e-LgbsSe.tk3N6e-LgbsSe-vhaaFf-qwU8Me, .tk3N6e-LgbsSe.tk3N6e-LgbsSe-vhaaFf-LK5yu {' +
                     ' min-width: 33px /* original: 54px */ !important; }\n' +
            // change right margin (i.e. spacing) between toolbar buttons...
            // (note: newer implementation uses left-margin instead)
            '.tk3N6e-LgbsSe { margin-right: 7px /* original: 16px */ !important; }\n' +
            // ...except for buttons not ending a group
            '.tk3N6e-LgbsSe.tk3N6e-LgbsSe-vhaaFf-qwU8Me { margin-right: 0 /* original: 0 */ !important; }\n' +
            // sadly, changing alignment for the nav group is trickier, since
            // width is adjusted dynamically
        '/* Groups List */\n' +
            // change top & bottom padding for elements left-hand side groups list (i.e. row height)
            '.cPAfuf { padding-bottom: 1px /* original: 6px */ !important;' +
                     ' padding-top: 1px /* original: 6px */ !important; }\n' +
            // eliminate right margin of groups list box
            '.LYZ5re { margin-right: 0 /* original: 16px */ !important; }\n' +
            // change left margin of buttons above & links below groups list ("New Contact" + "New Group", "Import Contacts...", etc)
            '.xLRFCe, .yWE1y { margin-left: 17px /* original: 44px */ !important; }\n' +
            // change padding below "New Contact" button
            '.xLRFCe { padding-bottom: 8px /* original: 14px */ !important; }\n' +
            // change padding of elements within the groups list
            'div.PCbdGf { padding-left: 2px /* original: 28px */ !important; }\n' +
            // change the left border width of arrows for active group parents
            '.fy1Lpf { border-left-width: 2px /* original: 4px */ !important; }\n' +
            // adjust left margin of active group parents
            'div.mF2WFb { margin-left: -2px /* original: -4px */ !important; }\n' +
            // change left margin of captions within the groups list (must match arrows box width, changed next)
            '.XQRo3 { margin-left: 15px /* original: 17px */ !important; }\n' +
            // change box width of arrows for group parents
            '.GoZNCd { /* collapsed */ width: 15px /* original: 17px */ !important; }\n' +
            '.qY5wPb { /* expanded  */ width: 15px /* original: 17px */ !important; }\n' +
            // re-adjust vertical position of arrows for group parents
            '.GoZNCd { /* collapsed */ background-position: 6px 7px /* original: 6px 13px */ !important; }\n' +
            '.qY5wPb { /* expanded  */ background-position: 4px 8px /* original: 4px 14px; */ !important; }\n' +
        '/* Contacts List */\n' +
            // change row height for the contacts list
            '.dqpCVe .K9ln3e, .dqpCVe .rfza3e { height: 2.8ex /* original: 39px */ !important; }\n' +
            // eliminate right padding of contacts list box
            '.TXWmsf, .bsvFKf { padding-right: 0 /* original: 29px */ !important; }\n' +
            // Re-adjust padding for the "star" cells (2014-01-21)
            'td.cnYuxb { padding-top: 0 /* original: 3px, and then overriden to 11px */ !important;' +
                       ' padding-bottom: 0 /* original: 0, and then overriden to 9px */ !important; }\n' +
        '/* Menus */\n' +
            // change toolbar menu items padding (normal)
            '.VIpgJd-j7LFlb, .VIpgJd-pWKtN, .VIpgJd-SFgmFf { padding: /* trbl */ 1px 22px 1px 24px /* original: 6px 30px 6px 44px */ !important; }\n' +
            // change toolbar menu items padding (hover)
            '.VIpgJd-j7LFlb-sn54Q, .VIpgJd-j7LFlb-ZmdkE { padding-bottom: 0 !important; padding-top: 0 !important; border-bottom-width: 1px !important; border-top-width: 1px !important; }\n' +
            '.VIpgJd-pWKtN-sn54Q, .VIpgJd-SFgmFf-sn54Q { padding-bottom: 0 !important; padding-top: 0 !important; border-bottom-width: 1px !important; border-top-width: 1px !important; }\n' +
            // change toolbar menu items height
            '.VIpgJd-j7LFlb-MPu53c, .VIpgJd-j7LFlb-Bz112c { height: 16px !important; }\n' +
            // change position of magnifying glass right of groups search box
            '.xpqH9b { padding-top: 14px !important; }\n' +
            // <<end>>
            '';
    // css code versions defined near the end (conditional definitions)
    
    // reference some outside objects
    window.console = window.console || (function() {
        if (typeof(unsafeWindow) == 'undefined') return { 'log': function() {} };
        return unsafeWindow.console;
    })();
    // self-explanatory
    document.addStyle = function(css) {
        if (typeof(GM_addStyle) != 'undefined') {
            GM_addStyle(css);
        } else {  
            var heads = this.getElementsByTagName('head');
            if (heads.length > 0) {
                var node = this.createElement('style');
                node.type = 'text/css';
                node.appendChild(this.createTextNode(css));
                heads[0].appendChild(node); 
            }
        }
    };
    
    /*
     * helpers using code taken from the MooTools framework (http://mootools.net/)
     * source revision: 1.4.5; build: core/76bf47062d6c1983d66ce47ad66aa0e0
     * licensed as: MIT-style license
     */
    /* <mootools-code> */
    // Array extensions
    Array.prototype.each = Array.prototype.forEach || function(fn, bind) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (i in this) fn.call(bind, this[i], i, this);
        }
    };
    Array.prototype.rgbToHex = function(array) {
        if (this.length < 3) return null;
        if (this.length == 4 && this[3] == 0 && !array) return 'transparent';
        var hex = [];
        for (var i = 0; i < 3; i++) {
            var bit = (this[i] - 0).toString(16);
            hex.push((bit.length == 1) ? '0' + bit : bit);
        }
        return (array) ? hex : '#' + hex.join('');
    }
    // String extensions
    String.prototype.camelCase = function() {
        return String(this).replace(/-\D/g, function(match) {
            return match.charAt(1).toUpperCase();
        });
    };
    String.prototype.capitalize = function() {
        return String(this).replace(/\b[a-z]/g, function(match) {
            return match.toUpperCase();
        });
    },
    String.prototype.hyphenate = function() {
        return String(this).replace(/[A-Z]/g, function(match) {
            return ('-' + match.charAt(0).toLowerCase());
        });
    };
    String.prototype.toInt = function(base) {
        return parseInt(this, base || 10);
    };
    String.prototype.toFloat = function() {
        return parseFloat(this);
    };
    String.prototype.rgbToHex = function(array) {
        var rgb = String(this).match(/\d{1,3}/g);
        return (rgb) ? rgb.rgbToHex(array) : null;
    };
    // partial Browser object
    var ua = navigator.userAgent.toLowerCase(),
        platform = navigator.platform.toLowerCase(),
        UA = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, 'unknown', 0],
        mode = UA[1] == 'ie' && document.documentMode;
    var Browser = {
        extend: function() {},
        name: (UA[1] == 'version') ? UA[3] : UA[1],
        version: mode || parseFloat((UA[1] == 'opera' && UA[4]) ? UA[4] : UA[2]),
        Platform: {
            name: ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0]
        },
        Features: {
            xpath: !!(document.evaluate),
            air: !!(window.runtime),
            query: !!(document.querySelector),
            json: !!(window.JSON)
        },
        Plugins: {}
    };
    Browser[Browser.name] = true;
    Browser[Browser.name + parseInt(Browser.version, 10)] = true;
    Browser.Platform[Browser.Platform.name] = true;
    // getComputedStyle() & getStyle()
    var html = document.html = document.documentElement,
        floatName = (html.style.cssFloat == null) ? 'styleFloat' : 'cssFloat',
        hasOpacity = (html.style.opacity != null),
        hasFilter = (html.style.filter != null),
        reAlpha = /alpha\(opacity=([\d.]+)\)/i;
    var getComputedStyle = function(element, property) {
        if (element.currentStyle) return element.currentStyle[property.camelCase()];
        var defaultView = element.ownerDocument.defaultView,
            computed = defaultView ? defaultView.getComputedStyle(element, null) : null;
        return (computed) ? computed.getPropertyValue((property == floatName) ? 'float' : property.hyphenate()) : null;
    };
    var getOpacity = (hasOpacity ? function(element) {
        var opacity = element.style.opacity || element.getComputedStyle('opacity');
        return (opacity == '') ? 1 : opacity.toFloat();
    } : (hasFilter ? function(element) {
        var filter = (element.style.filter || element.getComputedStyle('filter')),
            opacity;
        if (filter) opacity = filter.match(reAlpha);
        return (opacity == null || filter == null) ? 1 : (opacity[1] / 100);
    } : function(element) {
        return (element.style.visibility == 'hidden' ? 0 : 1);
    }));
    var getStyle = function(element, property) {
        if (property == 'opacity') return getOpacity(element);
        property = (property == 'float' ? floatName : property).camelCase();
        var result = element.style[property];
        if (!result || property == 'zIndex') {
            result = getComputedStyle(element, property);
        }
        if (result) {
            result = String(result);
            var color = result.match(/rgba?\([\d\s,]+\)/);
            if (color) result = result.replace(color[0], color[0].rgbToHex());
        }
        if (Browser.ie && isNaN(parseFloat(result))) {
            if ((/^(height|width)$/).test(property)) {
                var values = (property == 'width') ? ['left', 'right'] : ['top', 'bottom'], size = 0;
                values.each(function(value) {
                    size += getStyle(element, 'border-' + value + '-width').toInt() + getStyle(element, 'padding-' + value).toInt();
                }, element);
                return element['offset' + property.capitalize()] - size + 'px';
            }
            if (Browser.opera && String(result).indexOf('px') != -1) return result;
            if ((/^border(.+)Width|margin|padding/).test(property)) return '0px';
        }
        return result;
    }
    /* </mootools-code> */
    
    // look for the new Google Products menu
    var gbwa = document.getElementById('gbwa');
    if (!gbwa) { 
        // check if we still have the topmost black bar instead (backward compatibility)
        var gbql = document.getElementById('gbql');
        if (!gbql) {
            console.log('[Google Contacts Compact] Elements "#gbwa" (new Google Products menu) and "#gbql" (with topmost black bar) not found!');
            return;
        }
        var css_v2 = css_v1.replace(/#gbql \{.*\}\n/, 
                  '#gbql { background-position: -30px -19px /* original: 0 -61px !important */;' +
                         ' height: 37px /* original: 45px !important */;' +
                         ' width: 95px /* original: 116px !important */; }\n');
        var css_v3 = css_v1.replace(/#gbql \{.*\}\n/, 
                  '#gbql { background-position: -63px 0 /* original: -178px 0 !important */;' +
                         ' height: 37px /* original: 45px !important */;' +
                         ' width: 95px /* original: 116px !important */; }\n');
        console.log('[Google Contacts Compact] NOTE: Working in backward-compatibility mode (with topmost black bar)');
        gbqlBgPos = getStyle(gbql, 'background-position');
        // css injection
        document.addStyle(/-45px 0(?:px)?/.test(gbqlBgPos) ? css_v1 : (/0(?:px)? -61px/.test(gbqlBgPos) ? css_v2 : css_v3));
    } else {
        // new Google Products menu: remove css code dedicated to top bars, everything else stays the same
        var css_v4 = css_v1.replace(/\/\* Top Bars \*\/([\r\n]|.)*\/\* Toolbar \*\//, '/* Toolbar */');
        // css injection
        document.addStyle(css_v4);
    }
})();