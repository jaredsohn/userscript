// ==UserScript==
// @name            Udacity EXT - Auto next video&quiz
// @description     Udacity Extension -- Automatically go to the next video or quiz question upon reaching the end of the current one
// @namespace       http://sepczuk.com/
// @version         0.11
// @include         http://www.udacity.com/view*
// @match           http://www.udacity.com/view*
// @copyright       2012, Damian Sepczuk
// @downloadURL     https://userscripts.org/scripts/source/126694.user.js
// @updateURL       https://userscripts.org/scripts/source/126694.meta.js
// ==/UserScript==

function mainWrapper(){
    function main(){
        if (window.App.player === undefined) {
            setTimeout(main, 300);
            return;
        }
        
        App.player.addEventListener('onStateChange', function(p){
            if (p.data === YT.PlayerState.ENDED) {
                $('#course-next-button .button').click(); // THX: Hugo Lopes Tavares
            }
        })
    };

    main();
};


if (!document.xmlVersion) {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ mainWrapper +')();'));
    document.documentElement.appendChild(script);
}