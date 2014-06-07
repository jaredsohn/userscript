// ==UserScript==
// @name          YouTube - Button Container (@require) fix
// @namespace     http://userscripts.org/users/23652
// @description   Creates a button container, under the video, onto which buttons can be added
// @include       http://*.youtube.com/*
// @include       http://youtube.com/*
// @include       https://*.youtube.com/*
// @include       https://youtube.com/*
// @copyright     JoeSimmons
// @version       1.0.2
// @license       LGPL version 3 or any later version; http://www.gnu.org/copyleft/lgpl.html
// @grant         GM_addStyle
// ==/UserScript==

/* CHANGELOG

    1.0.2 (1/15/2014)
        - changed license to LGPL
        - updated style
        - added a test mode, so I can work on visual changes more easily
        - modified the main function to return the created button

    1.0.1 (12/13/2013)
        - slight tweak for more flexible styles
            buttons now have a special class which you can modify.
            you can even put buttons outside of the container with
            that class, and they will have that style applied

    1.0.0 (12/13/2013)
        - created

*/

var addButtonToContainer = (function () {
    'use strict';

    var rYoutubeWhitelistedUrls = /^https?:\/\/([^\.]+\.)?youtube\.com\/(watch|user\/|channel\/)/;

    var TEST_MODE = false; // if true, will replace the current style with this one

    // helper functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function addStyle(contents) {
        var head = document.head || query('html > head'),
            style = document.createElement('style');

        style.id = 'underMovieDivStyle';
        style.type = 'text/css';
        style.appendChild( document.createTextNode(contents) );

        if (head) {
            head.appendChild(style);
        }
    }
    function id(name) {
        return document.getElementById(name);
    }
    function query(name) {
        return document.querySelector(name);
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    function waitForHeadReady() {
        if ( document.head || query('html > head') ) {
            window.setTimeout(handleStyleCreation, TEST_MODE === true ? 3000 : 0);
        } else {
            window.setTimeout(waitForHeadReady, 200);
        }
    }

    function handleStyleCreation() {
        var umdv = id('underMovieDivStyle'),
            obs = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.target.id === 'underMovieDivStyle') {
                        handleStyleCreation();
                    }
                });
            });

        if (TEST_MODE === true || !umdv) {
            if (umdv) {
                umdv.parentNode.removeChild(umdv);
            }

            addStyle('' +
                '#under-movie-div { ' +
                    'background: transparent !important; ' +
                    'display: block; ' +
                    'padding-top: 4px; ' +
                    'padding-bottom: 8px; ' +
                    'text-align: left; ' +
                    'z-index: 999999; ' +
                '}\n\n' +
                '.under-movie-div-button { ' +
                    'background-image: linear-gradient(to top, #F6F6F6 0px, #FCFCFC 100%) !important; ' +
                    'border: 1px solid #CCCCCC; ' +
                    'border-radius: 2px; ' +
                    'color: #666666 !important; ' +
                    'font-size: 12px !important; ' +
                    'font-family: arial, sans-serif !important; ' +
                    'font-weight: 400 !important; ' +
                    'height: auto !important; ' +
                    'line-height: 20px !important; ' +
                    'margin-right: 6px; ' +
                    'padding: 2px 10px !important; ' +
                '}\n\n' +
                // - - - - - - - - - - - - - - - - - - -
                '#upsell-video { ' +
                    'overflow: visible !important; ' + // allow the button container to show on non-video pages
                '}' +
            '');

            // observe the style for changes if test mode enabled
            if (TEST_MODE === true) {
                obs.observe(id('underMovieDivStyle'), {
                    childList : true,
                    attributes : true,
                    characterData : true
                });
            }
        }
    }

    function handleContainerCreation() {
        var holder = query('#watch7-headline, #gh-overviewtab div.c4-spotlight-module-component'),
            container = id('under-movie-div');

        if (container == null) {
            container = document.createElement('div');
            container.id = 'under-movie-div';

            if (holder) {
                holder.appendChild(container);
            }
        }

        return container;
    }

    function add(text, onclick, ID) {
        var upsellVideo = id('upsell-video'),
            container = handleContainerCreation(),
            button = document.createElement('button'),
            span = document.createElement('span');
            ID = ID || text.replace(/[^a-zA-Z0-9-_]/, '');

        if ( !location.href.match(rYoutubeWhitelistedUrls) || id(ID) ) { return; }
        if (typeof text !== 'string' || typeof onclick !== 'function') { return; }

        span.setAttribute('class', 'yt-uix-button-content');
        span.appendChild( document.createTextNode(text) );

        button.id = ID;
        button.addEventListener('click', function () {
            window.setTimeout(onclick, 0);
        }, false);

        button.type = 'button';
        button.setAttribute('class', 'under-movie-div-button yt-uix-button yt-uix-button-text yt-uix-tooltip');
        button.appendChild(span);

        return container.appendChild(button);
    }

    waitForHeadReady();

    return add;
}());

/* EXAMPLE BUTTON
    addButtonToContainer('A Test Button', function () { alert('Test.'); }, 'test-button');
*/
