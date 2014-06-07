// ==UserScript==
// @name           YouTube Auto Pause On Tab/Window Change
// @namespace      http://userscripts.org/users/23652
// @description    Automatically pauses the video when you switch to a different tab or window, and automatically plays when you come back to it
// @include        http://*.youtube.com/watch?*v=*
// @include        http://youtube.com/watch?*v=*
// @include        https://*.youtube.com/watch?*v=*
// @include        https://youtube.com/watch?*v=*
// @require        https://raw.github.com/joesimmons/jsl/master/jsl.user.js
// @copyright      JoeSimmons
// @version        1.0.2
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @downloadURL    http://userscripts.org/scripts/source/58720.user.js
// @updateURL      http://userscripts.org/scripts/source/58720.meta.js
// ==/UserScript==

/* CHANGELOG

1.0.2
    - started this changelog
    - used JSL
    - fixed script

*/

+function () {

    var isOn = GM_getValue('on', true);

    function run(t) {
        var s = document.createElement('script');
        s.innerHTML = t;
        document.body.appendChild(s);
        document.body.removeChild(s);
    }

    function videoDo() {
        if ( GM_getValue('on', true) === true ) {
            run('document.getElementById("movie_player").' + this + 'Video();');
        }
    }

    function toggle(event) {
        var isOn = GM_getValue('on', true);

        event.preventDefault();

        GM_setValue('on', isOn === true ? false : true );

        JSL('#autopause').text( 'Auto-pause ==> ' + (isOn === true ? 'Off' : 'On') );
    }

    JSL.runAt('interactive', function () {
        JSL('#watch7-headline').first(
            JSL.create('a', {id : 'autopause', textContent : 'Auto-pause ==> ' + (isOn === true ? 'On' : 'Off'), href : '#', style : 'display: block; padding: 4px 6px;', onclick : toggle})
        );

        JSL.addEvent( window, 'blur', videoDo.bind('pause') );
        JSL.addEvent( window, 'focus', videoDo.bind('play') );
    });

}();