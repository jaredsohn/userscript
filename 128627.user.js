// ==UserScript==
// @name            Udacity EXT - 480p layout
// @description     Udacity Extension -- Change the layout of the page to accomodate 480p sized videos and get a wider Python code window
// @namespace       http://aks1.com/
// @version         0.1.2
// @include         http://www.udacity.com/view*
// @match           http://www.udacity.com/view*
// @copyright       2012, Damian Sepczuk, Svyatoslav Zarutskiy
// ==/UserScript==

function mainWrapper(){
    function main(){
        if (window.App.player === undefined) {
            setTimeout(main, 300);
            return;
        }

        $('.player').attr('style', 'width: 900px;height: 506px;');
        $('div.width960').attr('style', 'width: 1150px;');
        $('div.units ul.scroll-list').attr('style', 'max-height: 506px;');
        $('div.assignment-view').attr('style', 'width: 900px;height: 420px;');
        $('div.ace-eclipse').attr('style', 'width: 898px;height: 450px;');
        $('div.ace_scroller').attr('style', 'left: 51px; width: 830px;height: 450px;');
        $('div.ace_sb').attr('style', 'width: 17px;height: 450px;');
        // App.i.player.setPlaybackQuality('hd720'); // Good resolution is automatically selected
    };

    main();
};


if (!document.xmlVersion) {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ mainWrapper +')();'));
    document.documentElement.appendChild(script);
}
