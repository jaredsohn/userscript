// ==UserScript==
// @name        TEDToYouTube
// @description Redirect from a talk page on www.ted.com to the corresponding video on YouTube automatically
// @updateURL   http://userscripts.org/scripts/source/174390.meta.js
// @namespace   abiteasier.in
// @include     http://www.ted.com/talks/*.html
// @include     http://www.youtube.com/user/TEDtalksDirector/search?query=*&redirected_from_TED=true*
// @exclude     http://www.ted.com/talks/*.html?*
// @version     0.7.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @run-at      document-start
// @grant       GM_log
// ==/UserScript==

var url = window.location.href;

if (url.indexOf('http://www.ted.com') == 0) {
    var talk_name = url.split("/").pop();
    talk_name = talk_name.substring(0, talk_name.lastIndexOf('.html'));
    var noredirect_url = url + '?redirect_to_YouTube=false';
    replaceWithNoRedirect(noredirect_url);
    
    var youtube_search_url = 'http://www.youtube.com/user/TEDtalksDirector/search?query=' + talk_name + '&redirected_from_TED=true';
    window.location.href = youtube_search_url;
}
else if (url.indexOf('redirected_from_TED=true') > 0) {
    $(document).ready( function() {
        var noredirect_url = url.replace('&redirected_from_TED=true', '');
        replaceWithNoRedirect(noredirect_url);
        
        var a = $("li.channels-browse-content-list-item:first").find("a.yt-uix-tile-link");

        var style = 'style="background-color:yellow; width:auto; padding:0px; border:0px"';
        var loading_text = '<div><strong ' + style + '><em>(Loading this video automatically, please wait...)</em></strong></div>';
        a.after(loading_text);

        window.location.href = a.attr('href');
    } );
}

function replaceWithNoRedirect(noredirect_url) {
    if (window.history && window.history.replaceState) {
        //So that the user can go Back to the previous page if they want, without having to fight the redirection
        window.history.replaceState( {}, '', noredirect_url); 
    }
}

