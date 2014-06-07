// ==UserScript==
// @name        YouTube - Bigger Profile Images
// @namespace   http://userscripts.org/users/23652
// @description Click on a user's YouTube thumbnail to enlarge. Clickable thumbnails will glow in a blue outline
// @include     http://*.youtube.com/*
// @include     https://*.youtube.com/*
// @include     http://youtube.com/*
// @include     https://youtube.com/*
// @include     https://apis.google.com/*/comments*
// @copyright   JoeSimmons
// @version     1.0.3
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require     https://raw.github.com/joesimmons/jsl/master/jsl.user.js
// @require     https://raw.github.com/joesimmons/jsl/master/jsl.ajax.js
// @downloadURL http://userscripts.org/scripts/source/172288.user.js
// @updateURL   http://userscripts.org/scripts/source/172288.meta.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/* CHANGELOG

1.0.3 (11/18/2013)
    - fixed bug with some bigger images not hiding when you click

1.0.2 (11/16/2013)
    - fixed after YouTube change to Google+ for comments (what a bitch that was... thanks Google)

1.0.1
    - used JSL
    - removed CSS3 animation. it was causing 40% cpu usage constantly
    - slightly improved alignCenter()

1.0.0
    - created

---------- */

(function () {

    'use strict';

    var rGoogleUrl = /^https?:\/\/apis\.google\.com\/.+\/comments.+YOUTUBE.+/,
        $1jpg = /\/([hm]q)?1\.jpg/i,
        $s48 = /([\/=])s\d{1,3}(-)?/i,
        rGoogleImg = /googleusercontent\.com\/.+[\/=]s\d{1,3}/i,
        rYtimg = /\w+\.ytimg\.com\/.+\/([hm]q)?1\.jpg/i;

    function inFrame() {
        return window !== window.top && window.location.href.match(rGoogleUrl) != null;
    }

    function process(event) {
        var thumb = JSL(event.target),
            th = JSL('#thumb-hover'),
            src = '';

        // do nothing if it's not a left click
        if (event.button !== 0) { return; }

        if ( thumb.exists && thumb.is('a') ) {
            thumb = JSL('.//img[ @width and @alt and ( contains(@src, "1.jpg") or contains(@src, "googleusercontent.com") ) ]', thumb[0]);
        }

        if ( thumb.exists && thumb.is('img[src]') ) {
            src = thumb.prop('src');
            if ( ( src.match(rGoogleImg) || src.match(rYtimg) ) && !thumb.is('#thumb-hover') ) {
                event.preventDefault();

                if ( inFrame() ) {
                    return window.top.postMessage('__BIGIMG__' + src, '*');
                } else {
                    if ( src.match(rYtimg) ) {
                        JSL.ajax([
                            src.replace($1jpg, '/hq1.jpg'),
                            src.replace($1jpg, '/mq1.jpg')
                        ], {
                            method : 'HEAD',
                            onload : function (resp) {
                                if (resp.status === 200) {
                                    JSL.ajax().clear();
                                    JSL('#thumb-hover').attribute('src', resp.url);
                                }
                            }
                        });
                    }
                    return th.prop( 'src', src.replace($s48, '$1s720$2') );
                }
            }
        } else if ( inFrame() ) {
            return window.top.postMessage('__HIDE', '*'); 
        }

        th.hide().prop('src', '');
    }

    // Make sure the page is not in a frame
    if (typeof GM_xmlhttpRequest !== 'function') { return; }

    window.addEventListener('message', function (event) {
        var rPrefix = /^__BIGIMG__/, url;

        if ( event.data.match(rPrefix) ) {
            url = event.data.replace(rPrefix, '');

            process({
                'button' : 0,
                'preventDefault' : function () {},
                'stopPropagation' : function () {},
                'target' : JSL.create('img', {src : url, alt : ''})
            });
        } else if (event.data === '__HIDE') {
            JSL('#thumb-hover').hide().prop('src', '');
        }
    }, false);

    JSL.runAt('end', function () {
        JSL.addStyle('' +
            '.yt-user-photo, ' +
            '.feed-author-bubble, ' +
            ( inFrame() ? 'img[src*="ytimg.com"][src*="1.jpg"], ' : '') +
            'img[src*="googleusercontent.com"] { ' +
                'border-width: 2px !important; ' +
                'border-style: solid !important; ' +
                'border-radius: 2px !important; ' +
                'border-color: #0093FF !important; ' +
            '}' +
            // --------------------------------------------
            '#thumb-hover { ' +
                'z-index: 999999; ' +
                'border: 2px solid #000000; ' +
                'background-color: #000000; ' +
                'max-height: 800px; ' +
                'max-width: 720px; ' +
            '}' +
        '', 'bigger-profile-images');

        JSL(document.body).append(
            JSL.create('img', {id : 'thumb-hover', style : 'display: none; position: fixed;', onload : function () {
                if ( !inFrame() ) {
                    JSL(this).show().center();
                }
            }})
        );

        JSL.addEvent(window, 'click', process);

        if ( inFrame() ) {
            JSL.setInterval(function () {
                JSL('//a[@target="_blank"]/img/ancestor::a').each(function (elem) {
                    elem.removeAttribute('target');
                    elem.removeAttribute('href');
                });
            }, 1000);
        }
    });

}());