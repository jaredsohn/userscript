// ==UserScript==
// @name       AnidbImpr-anime
// @namespace  terrukallan_scripts
// @version    0.2
// @description  Usability improvements for anidb anime pages
// @match      http://anidb.net/perl-bin/*show=anime&*
// @copyright  2012 terrukallan
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

(function() {
    var hideSection = function(item) {
        var $container = $('div.g_section.' + item);
        var $header = $('h4', $container);
        var $body = $container.children(':not(h4)');
        $header.addClass('collapsed');
        $body.addClass('hide');
    }
    
    //hideSection('info');
    hideSection('vote');
    hideSection('mylist');
    hideSection('categories');
    hideSection('tags');
    hideSection('relations');
    hideSection('similaranime');
    hideSection('recommendations');
    hideSection('forum');
    //hideSection('episodes');
})();