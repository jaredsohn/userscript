// ==UserScript==
// @name        YouTube - Add "Stop Video" Button
// @namespace   http://userscripts.org/users/23652
// @description Adds a 'Stop Video' button below the video
// @include     http://*.youtube.com/watch*v=*
// @include     https://*.youtube.com/watch*v=*
// @include     http://youtube.com/watch*v=*
// @include     https://youtube.com/watch*v=*
// @include     http://youtube.com/user/*
// @include     https://youtube.com/user/*
// @include     http://youtube.com/channel/*
// @include     https://youtube.com/channel/*
// @include     http://*.youtube.com/user/*
// @include     https://*.youtube.com/user/*
// @include     http://*.youtube.com/channel/*
// @include     https://*.youtube.com/channel/*
// @copyright   JoeSimmons
// @version     1.1.0
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require     http://userscripts.org/scripts/source/186053.user.js?name=YouTube_Button_Container
// @downloadURL http://userscripts.org/scripts/source/174846.user.js
// @updateURL   http://userscripts.org/scripts/source/174846.meta.js
// @grant       GM_addStyle
// ==/UserScript==

/* CHANGELOG

1.1.0 (12/13/2013)
    - changed license to GPLv3

1.0.9 (12/13/2013)
    - started using my new @require for adding buttons to the page

1.0.8 (12/11/2013)
    - started adding the stop button to a div under the movie player
        so other scripts can use that space to add buttons to also

1.0.7 (11/23/2013)
    - fixed something I missed in 1.0.6

1.0.6 (11/23/2013)
    - adapted to site change

1.0.5 (9/6/2013)
    - made it work on user/channel pages

1.0.4 (9/1/2013)
    - made it support the YouTube 'red bar' feature

1.0.3 (8/31/2013)
    - included https pages

1.0.2 (8/30/2013)
    - now supports native Chrome & Opera

1.0.1
    - made it more cross-browser compatible

1.0.0
    - created

*/

(function () {
    'use strict';

    var verif = /youtube\.com\/((watch\?[a-zA-Z]+=)|(user|channel))/,
        button_id = 'movie_stop_button';

    function run(t) {
        var s = document.createElement('script');
            s.innerHTML = t;
        document.body.appendChild(s);
        document.body.removeChild(s);
    }

    function stopVideo() {
        run('' +
            '(function () {' +
                'var player = document.querySelector("#c4-player, #movie_player");' +
                'if (player.stopVideo) {' +
                    'player.stopVideo();' +
                '} else if (player.pauseVideo) {' +
                    'player.pauseVideo();' +
                '} else if (player.pause) {' +
                    'player.pause();' +
                '}' +
            '}());' +
        '');
    }

    function addButton() {
        var button = document.getElementById(button_id);

        if (button == null) {
            addButtonToContainer('Stop Video', stopVideo, button_id);
        }
    }

    // make sure the page is not in a frame
    if (window !== window.top) { return; }

    window.setInterval(addButton, 1000);

}());

