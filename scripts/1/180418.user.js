// ==UserScript== 
// @name    [YouTube] Disable Playlist Looping
// @version 3 March 2014
// @url     http://userscripts.org/scripts/show/180418
// @include http://youtube.com/* 
// @include http://*.youtube.com/* 
// @include https://youtube.com/* 
// @include https://*.youtube.com/* 
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==
waitForKeyElements (".toggle-autoplay", function(jNode) {
        if (document.querySelector('.currently-playing').getAttribute('data-index') ==
            document.querySelector('.playlist-videos-list').children.length) {
                window.location.href = "http://youtube.com/watch?v=" + 
                document.querySelector('[itemprop=videoId]').content 
        }
    return false;
}
)