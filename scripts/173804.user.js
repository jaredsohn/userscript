// ==UserScript==
// @name        NinjaKiwi - Easily Resize Game
// @namespace   http://userscripts.org/users/23652
// @description Adds a slider bar so you can adjust the game window size
// @include     http://ninjakiwi.com/Games/*/Play/*.html*
// @include     http://staging.ninjakiwi.com/Games/*/Play/*.html*
// @copyright   JoeSimmons
// @version     1.0.3
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @downloadURL http://userscripts.org/scripts/source/173804.user.js
// @updateURL   http://userscripts.org/scripts/source/173804.meta.js
// @require     https://raw.github.com/joesimmons/jsl/master/jsl.user.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

/* CHANGELOG

1.0.3
    - changed the slider to an HTML5 range slider for more consistency
    - changed min width to 400 and max width to 1200

1.0.2
    - updated the user interface
    - removed Resize button. it will now resize when you stop sliding the bar

1.0.1
    - drastically changed how the script works
        it now has a slider bar you can use to adjust the game size

1.0.0
    - created

*/



JSL.runAt('end', function () {

    'use strict';

    var MIN_WIDTH = 400,
        MAX_WIDTH = 1200,
        DEFAULT_WIDTH = 800,
        DEFAULT_HEIGHT = 620,
        WIDTH = parseInt( GM_getValue('nk-width', DEFAULT_WIDTH), 10 ),
        HEIGHT = parseInt( GM_getValue('nk-height', DEFAULT_HEIGHT), 10 ),
        GAME = JSL('#game'),
        CONTAINER = JSL('#game_container');

    function handleSliderChange() {
        var width = parseInt( JSL('#size_slider')[0].value, 10 ),
            ratio = 800 / 620, height;

        if (width < MIN_WIDTH) {
            width = MIN_WIDTH;
        } else if (width > MAX_WIDTH) {
            width = MAX_WIDTH;
        }

        // avoid any weird errors
        if ( isNaN(width) ) {
            width = DEFAULT_WIDTH;
        }

        // get height from width. keep aspect ratio of the original game 800x620
        height = Math.floor(width / ratio);

        resizeGame(width, height);
    }

    function changeText(s) {
        JSL('#game_size').text(s);
    }

    function resizeGame(width, height) {
        // update variables WIDTH and HEIGHT for the listener on #game_container
        WIDTH = width;
        HEIGHT = height;

        // apply the new size
        GAME.attribute('width', width + '').attribute('height', height + '');
        CONTAINER.css('width', width + 'px').css('height', height + 'px');

        // reflect the changes in our UI
        changeText(width + 'x' + height);

        // change the slider value
        // this is here just for the previous value that
        // gets set upon page load
        JSL('#size_slider')[0].value = width;

        // save the new size so it can be applied next load
        GM_setValue('nk-width', width);
        GM_setValue('nk-height', height);
    }
    
    function setDefault() {
        resizeGame(DEFAULT_WIDTH, DEFAULT_HEIGHT);
    }

    // Make sure the page is not in a frame
    if (window.self !== window.top) { return; }

    CONTAINER[0].addEventListener('DOMAttrModified', function () {
        if ( this.style.width !== (WIDTH + 'px') || this.style.height !== (HEIGHT + 'px') ) {
            resizeGame(WIDTH, HEIGHT);
        }
    }, false);

    JSL.addStyle('' +
        '#game_container { padding-bottom: 12px; }\n\n' +
        '#primary { padding: 2px !important; text-align: center; width: auto !important; height: auto !important; min-width: ' + DEFAULT_WIDTH + 'px; min-height: ' + DEFAULT_HEIGHT + 'px;}\n\n' +
        '#game_resize { font-family: sans-serif, arial; font-style: normal; z-index: 999999; margin: 4px 0 10px 0; width: 100%; }' +
        '#default_size { float: right; margin-right: 40px; font-size: 9pt; padding: 1px 8px; }\n\n' +
        '#display_holder { display: block; padding: 2px; font-size: 11pt; cursor: pointer; text-align: center; }' +
        '#game_size { margin-left: 6px; }\n\n' +
        '#size_slider { width: 800px; }' +
    '');

    CONTAINER.before('' +
        '<div id="game_resize">' +
            'Game Size: ' +
            '<span id="game_size">' + WIDTH + 'x' + HEIGHT + '</span>' +
            '<input id="default_size" type="button" value="Default Size" />' +
            '<input id="size_slider" type="range" value="' + WIDTH + '" min="' + MIN_WIDTH + '" max="' + MAX_WIDTH + '" step="50" />' +
        '</div>' +
    '');
    JSL('#default_size')[0].addEventListener('click', setDefault, false);
    JSL('#size_slider')[0].addEventListener('change', handleSliderChange, false);
    
    // set the width & height that the user had set last time, if any
    resizeGame(WIDTH, HEIGHT);

});