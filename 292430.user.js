// ==UserScript==
// @name        itasa-torrentz-search
// @description myitasa search button on torrentz.eu
// @include     http://www.italiansubs.net/*option=com_myitasa*
// @grant       none
// ==/UserScript==

$('[id$="sub2"]').each(function(){
    var text = $('a',this).attr('title');
    var button = $('<button><img src="http://torrentz.eu/favicon.ico" alt="Tz"></button>');
    button.click(function(){
        var search = text.replace(/(\d\d)x(\d\d)/,'S$1E$2').replace(/(\d)x(\d\d)/,'S0$1E$2');
        search += ' 1080p';
        search = 'http://torrentz.eu/search?f='+encodeURIComponent(search);
        window.open(search); 
    });
   $('span:first',this).after(button);
});