// ==UserScript==
// @name           Maxmodels EXT - automatycznie wczytaj następną stronę
// @description    Maxmodels Extension -- automatycznie wczytuje następną stronę portfolio/galerii/... Wymaga kilknięcia co 10 stron.
// @version        0.01
// @copyright      2012, Damian Sepczuk
// @namespace      http://sepczuk.com
// @include        http://www.maxmodels.pl*
// @match          http://www.maxmodels.pl*
// @downloadURL    https://userscripts.org/scripts/source/156210.user.js
// @updateURL      https://userscripts.org/scripts/source/156210.meta.js
// ==/UserScript==

function mainWrapper(){
// ------------------------------------------------------------------------------------------------------------------------------------------------------------
var scrollInAction = false;
var autoLoadNumPages = 10;
var counter = 1;

$('.loadMore a').click(function() {
    if(!scrollInAction) {
        counter = 1;
    }
})
        
$(window).scroll(function() {
    var reactFromBottom = -1000;
    var diff=parseInt($('body').scrollTop()+$(window).height())-parseInt($(document).innerHeight());
    if (diff>=reactFromBottom) {
        console.log('reaction '+diff+'px');
        if (scrollInAction) return false;        
        
        console.log(counter % autoLoadNumPages);
        if (counter > autoLoadNumPages) return false;
        console.log('Loading! ' + counter );
        counter += 1;
        scrollInAction=true;
        $('.loadMore a').click()
        setTimeout(function(){
        scrollInAction=false;}, 1000);
    }
});
// ------------------------------------------------------------------------------------------------------------------------------------------------------------
    main();
};


if (!document.xmlVersion) {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ mainWrapper +')();'));
    document.documentElement.appendChild(script);
}