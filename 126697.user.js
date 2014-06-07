// ==UserScript==
// @name            Udacity EXT - 720p layout
// @description     Udacity Extension -- Change the layout of the page to accomodate 720p sized videos
// @namespace       http://sepczuk.com/
// @version         0.1.1
// @include         http://www.udacity.com/view*
// @match           http://www.udacity.com/view*
// @copyright       2012, Damian Sepczuk
// @downloadURL     https://userscripts.org/scripts/source/126697.user.js
// @updateURL       https://userscripts.org/scripts/source/126697.meta.js
// ==/UserScript==

function mainWrapper(){
    function main(){
        if (window.App.player === undefined) {
            setTimeout(main, 300);
            return;
        }

        $('.player').attr('style', 'width: 1289px;height: 755px;');
        $('div.width960').attr('style', 'width: 1560px;');
        $('div.units ul.scroll-list').attr('style', 'max-height: 755px;');
        // App.i.player.setPlaybackQuality('hd720'); // Good resolution is automatically selected
    };

    main();
};


if (!document.xmlVersion) {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ mainWrapper +')();'));
    document.documentElement.appendChild(script);
}