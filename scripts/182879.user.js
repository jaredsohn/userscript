// ==UserScript==
// @name        YouTube - Display Flashvars
// @namespace   http://userscripts.org/users/23652
// @include     http://*.youtube.com/*
// @include     http://youtube.com/*
// @include     https://*.youtube.com/*
// @include     https://youtube.com/*
// @copyright   JoeSimmons
// @version     1.0.0
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require     https://raw.github.com/joesimmons/jsl/master/jsl.user.js
// @downloadURL http://userscripts.org/scripts/source/182879.user.js
// @updateURL   http://userscripts.org/scripts/source/182879.meta.js
// @grant       GM_setClipboard
// ==/UserScript==

+function () {

    function doCenter() {
        JSL('#flashvars').center();
    }

    function toggleFlashvars() {
        var rAmp = /^&/,
            fvElem = JSL('#flashvars'),
            flashvars = JSL('embed#movie_player').attribute('flashvars'),
            fvArray = flashvars.split(/(&?\w+=[^&]*)/).map(function (value) {
                return value.replace(rAmp, '');
            }).sort();

        fvElem.toggle();

        if (flashvars && fvElem[0].offsetHeight > 0 && fvElem[0].offsetWidth > 0) {
            fvElem.find('div.flashvar_single').remove();
            doCenter();

            JSL.each(fvArray, function (thisVar) {
                var key = thisVar.getMatch(/^&?([^=]+)/, 1),
                    value = thisVar.getMatch(/^[^=]+=(.+)/, 1);

                if (key !== '') {
                    fvElem.append('' +
                        '<div class="flashvar_single">' +
                            '<div class="bold">' + key + '</div>' +
                            '<div class="fv-value">' + value + '</div>' +
                        '</div>' +
                    '');
                }
            });

            fvElem.addEvent('click', function (event) {
                var thisElement = JSL(event.target);

                if ( typeof GM_setClipboard === 'function' && thisElement.is('.fv-value') ) {
                    GM_setClipboard( thisElement.text() );
                    alert('Copied!');
                }
            });
        }

        if (fvElem.visible) {
            JSL('#getflashvars').attribute('value', 'Hide Flashvars');
        } else {
            JSL('#getflashvars').attribute('value', 'Show Flashvars');
        }
    }

    // String.prototype.getMatch by JoeSimmons
    // e.g., 'foobar'.getMatch(/foo(bar)/, 1) ==> 'bar'
    Object.defineProperty(String.prototype, 'getMatch', {
        value : function (regex, index) {
            var match = this.match(regex) || ['', '', '', '', '', '', '', '', '', ''];

            if (typeof index === 'number' && index > -1) {
                return match[index];
            }

            return match[0];
        }
    });

    JSL.runAt('interactive', function () {
        JSL.addStyle('' +
            '#getflashvars { ' +
                'position: fixed; ' +
                'z-index: 999999; ' +
                'right: 4px; ' +
                'top: 4px; ' +
                'z-index: 999999; ' +
                'font-family: arial, verdana; ' +
                'font-size: 12pt; ' +
                'padding: 2px 16px; ' +
            '}\n\n' +
            '#flashvars { ' +
                'position: fixed; ' +
                'z-index: 999999; ' +
                'width: 80%; ' +
                'height: 80%; ' +
                'padding: 14px; ' +
                'background: #DDFFFF; ' +
                'border: 2px solid #009797; ' +
                'font-family: consolas, courier new, monospace; ' +
                'font-size: 9pt; ' +
                'overflow: auto; ' +
            '}\n\n' +
            '.flashvar_single { ' +
                'display: block; ' +
                'padding: 20px 0; ' +
                'border-bottom: 1px solid #C0C0C0; ' +
                'line-height: 14px; ' +
            '}\n\n' +
            '.flashvar_single div { ' +
                'padding: 8px 4px; ' +
                'word-wrap: break-word; ' +
                'overflow: auto; ' +
                'max-height: 120px; ' +
            '}' +
            '.bold { ' +
                'font-size: 11pt !important; ' +
                'font-weight: bold; ' +
            '}' +
        '');

        JSL(document.body).append(
            JSL.create('input', {type : 'button', id : 'getflashvars', value : 'Show Flashvars', onclick : toggleFlashvars})
        );

        JSL(document.body).append('<div id="flashvars" style="display: none"></div>');
    });

    JSL.addEvent(window, 'resize', doCenter);
    
}();