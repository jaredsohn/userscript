// ==UserScript==
// @name           YouTube Japanese Lyrics
// @namespace  http://d.hatena.ne.jp/tanihito/
// @version        0.1.0
// @description  Shows Japanese lyrics on YouTube under the movie player.
// @include        http://*youtube.com/watch?*
// ==/UserScript==
( function(){

const DEBUG = false;

main();

function main(){
    var category = getCategory();
    if (category != "music") {
        return;
    }

    var queries = makeQueries(document.title);
    if (queries.length >= 2) {
        var song = getSong(queries[0], queries[1]) || getSong(queries[1], queries[0]);
        if (song) {
            insertLyricPanel(song);
        }
    } 
}

function makeQueries(title){
    var str = title.replace(" - YouTube", "");
    str = str.replace(/\(.*\)|（.*）|［.*］|＜.*＞|【.*】|\[.*\]/g, "");
    str = str.replace(/[-‐\/／:「」『』・#]+/g, "#");
    if (str.indexOf("#") < 0) {
        str = str.replace(/[　\s]+/g, "#");
    }
    str = str.replace(/^[　\s#]*|[　\s#]*$/g, "").replace(/[　\s]*#[　\s]*/g, "#")
    var queries = str.split("#");
    log("# queries: ");
    log(queries);
    return queries;
}

function getCategory(){
    var eowCategory = document.getElementById("eow-category");
    var path = eowCategory.childNodes.item(0).getAttribute("href");
    var category = path.replace(/\\/g, "/").replace(/.*\//, '');
    log("# eow-category: " + category);
    return category;
}

function insertLyricPanel(song){
    log("# Inserting Lyric Panel");
    log(song);
    var lyricPanel = document.createElement("div");
    lyricPanel.id = "lyricPanel";
    lyricPanel.appendChild(document.createTextNode(song.lyric));
    lyricPanel.appendChild(document.createTextNode(" (" + song.artist + " - " + song.title + ") "));
    lyricPanel.style.paddingBottom = "10px";
    var watchPanel = document.getElementById("watch-panel");
    watchPanel.insertBefore(lyricPanel, watchPanel.firstChild);
}

function Song(unum, title, artist, lyric){
    this.unum = unum;
    this.title = title;
    this.artist = artist
    this.lyric = lyric;
}

function getSong(title_, artist_){
    const SEARCH_SONG_URL = "http://www.utamap.com/searchkasi.php?searchname=title&sortname=3&word=";
    var url = SEARCH_SONG_URL + encodeURI(title_);
    var src = sendGetRequest(url, null);
    var p = /<A href=".\/?showkasi.php\?surl=(.+)">(.+)<\/A><\/td>[\s]*?<TD class=ct120>(.+)<\/td>/g;
    while ((m = p.exec(src)) != null) {
        var unum = RegExp.$1;
        var title = RegExp.$2;
        var artist = RegExp.$3;
        log("# unum: " + unum + ", title: " + title + ", artist: " + artist);
        if (artist == artist_) {
            var lyric = getLyricByUnum(unum);
            return new Song(unum, title, artist, lyric);
        }
    }
}

function getLyricByUnum(unum){
    const LYRIC_URL = "http://www.utamap.com/phpflash/flashfalsephp.php?unum=";
    var url = LYRIC_URL + unum;
    var src = sendGetRequest(url, "UTF-8");
    var lyric = src.split('test2=')[1];
    return lyric;
}

function sendGetRequest(url, charset){
    return sendRequest(url, "GET", charset);
}

function sendRequest(url, method, charset){
    const MAX_TRY = 2;
    const ALLOW_ANY_ORIGIN_URL = "http://allow-any-origin.appspot.com/";
    var url = ALLOW_ANY_ORIGIN_URL + url;
    for (var i = 1; i <= MAX_TRY; i++) {
        log("# sending request (" + i + "/" + MAX_TRY + ") " + url);
        var req = new XMLHttpRequest();  
        if (charset) {
            req.overrideMimeType("text/html; charset=" + charset);
        }
        req.open(method, url, false);   
        req.send(null);
        if (req.status == 200) {
            return req.responseText;
        }
    }
}

function log(m){
    if (DEBUG) {
        console.log(m);
    }
}

}) (); 