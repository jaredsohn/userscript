// ==UserScript==
// @name        Google Music album sorter
// @version     1.2.0
// @date        27.09.2011
// @author      ki0 <ki0@ua.fm>
// @download    http://userscripts.org/scripts/source/113110.user.js
// @include     http://music.google.com/music/listen*
// ==/UserScript==

var sortAlbums = ' \
var sortAsk = false; \
var addDownload = true; \
 \
function Load(){ \
    var val = localStorage.getItem("sortAsk"); \
    if (val != null) \
        sortAsk = (val == "true"); \
    val = localStorage.getItem("addDownload"); \
    if (val != null) \
        addDownload = (val == "true"); \
} \
 \
Load(); \
 \
function Save(){ \
    localStorage.setItem("sortAsk", sortAsk); \
    localStorage.setItem("addDownload", addDownload); \
} \
 \
function sortAlbumsFunc(e) { \
    var AlbumsArr = new Array(); \
    albums = document.getElementsByClassName("artistViewAlbumHeaderRow"); \
    if (albums.length > 0) { \
        if (albums[0]["sorted"] == true) \
            return; \
        var container = albums[0].parentElement; \
        while (albums.length > 0) { \
            var album = albums[0]; \
            AlbumsArr[AlbumsArr.length] = album; \
            album.sortParam = sortParam(album); \
            var el = album.nextSibling; \
            album.songs = new Array(); \
            do { \
                songAddDownload(el); \
                album.songs[album.songs.length] = el; \
                el.removeAttribute("style"); \
                var next = el.nextSibling; \
                container.removeChild(el); \
                el = next; \
            } \
            while ((el != null) && (el.getAttribute("class") != "artistViewAlbumHeaderRow")); \
            container.removeChild(album); \
        } \
         \
        function softFunc(a, b) { \
            if (a.sortParam == b.sortParam) \
                return 0; \
            else \
                return ((sortAsk) ^ (a.sortParam > b.sortParam)) ? -1 : 1; \
        } \
         \
        AlbumsArr.sort(softFunc); \
         \
        for (i = 0; i < AlbumsArr.length; i++) { \
            AlbumsArr[i]["sorted"] = true; \
            container.appendChild(AlbumsArr[i]); \
            for (j = 0; j < AlbumsArr[i].songs.length; j++) { \
                container.appendChild(AlbumsArr[i].songs[j]); \
            } \
        } \
    } \
} \
 \
function sortParam(album) { \
    var param = ""; \
    var date = album.getElementsByClassName("albumViewSubInfo"); \
    if (date.length == 2) { \
        param = date[1].firstChild.nodeValue; \
        var albumName = album.getElementsByClassName("albumViewAlbumTitle songListLink"); \
        if (albumName.length > 0) \
            param = param + albumName[0].innerText; \
    } \
    return param; \
} \
 \
var imgSrc = "data:image/png;base64, \
iVBORw0KGgoAAAANSUhEUgAAAAwAAAANCAYAAACdKY9CAAAAAXNSR0IArs4c6QAAAARnQU1BAACx \
jwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41 \
Ljg3O4BdAAAAXElEQVQoU2NgQAPvl2b/R8bo8hj8UQ3AEMMIle9rq/9/v7YVjtFDCV0ObMD/Z9dQ \
wh5dE4j//d45VNtAAtgUYlUMcyc2TRgmo3sKWdP3o3MwPY0trXy/d/Q/LsUAC6XaiCcn2wsAAAAA \
SUVORK5CYII="; \
 \
function songAddDownload(song) { \
    if ((addDownload == false) || (song.getAttribute("id") == null)) \
        return; \
 \
    var img = document.createElement("img"); \
    img.src = imgSrc; \
    img.setAttribute("title", "Download"); \
    img.addEventListener("click", songDownload, false); \
    var col = song.lastChild; \
    col.appendChild(img); \
} \
 \
var reqArr = new Array(); \
 \
function songDownload(e) { \
    reqArr = new Array(); \
 \
    var list = document.getElementsByClassName("selectedSong"); \
    if (list.length < 2) { \
        var id = e.target.parentElement.parentElement.getAttribute("id"); \
        id = id.substr(6); \
        var req = new XMLHttpRequest(); \
        req.open("GET", "http://music.google.com/music/play?u=0&songid=" + id, true); \
        req.onreadystatechange = songUrlReadyStateChangeOne; \
        reqArr[0] = req; \
        req.send(); \
    } \
    else for (i = 0; i < list.length; i++) { \
        var id = list[i].getAttribute("id"); \
        id = id.substr(6); \
        var req = new XMLHttpRequest(); \
        req.open("GET", "http://music.google.com/music/play?u=0&songid=" + id, true); \
        req.onreadystatechange = songUrlReadyStateChange; \
        var i = 0; \
        while ((i < reqArr.length) && (reqArr[i] != null)) i++; \
        reqArr[i] = req; \
        req.send(); \
    } \
} \
 \
function songUrlReadyStateChangeOne() { \
    if ((reqArr[0].readyState == 4) && (reqArr[0].status == 200)) { \
        var jsonUrl = JSON.parse(this.responseText); \
        window.location.href = jsonUrl.url; \
    } \
} \
 \
function songUrlReadyStateChange() { \
    var i = 0; \
    var req = null; \
    while (i < reqArr.length) { \
        if (reqArr[i] != null) \
            if (reqArr[i].readyState == 4) \
                if (reqArr[i].status == 200) { \
                    req = reqArr[i]; \
                    reqArr[i] = null; \
                    break; \
                } \
        i++; \
    } \
    if (req != null) { \
        var jsonUrl = JSON.parse(this.responseText); \
        window.open(jsonUrl.url, "_blank", "location=no,menubar=no,status=no,titlebar=no,toolbar=no"); \
    } \
} \
';

function addScript(text) {
    var start = document.createElement("script");
    start.type = "text/javascript";
    start.innerHTML = text;
    document.body.appendChild(start);
}

var settings = " \
<div class='settings-section-header settings-manager-my-device'><div class='settings-title'>UserScript Settings</div></div> \
<div class='settings-section-content'><p></p> \
<div class='settings-email-news-offers'> \
<input id='setting-sort-ascending' type='checkbox' \" + (sortAsk ? \"checked\" : \"\") + \" onclick='sortAsk = ! sortAsk ; Save();'> \
<label for='setting-sort-ascending' class='settings-email-news-offers'>Sort albums ascending by date.</label> \
<p/> \
<input id='setting-download-link' type='checkbox' \" + (addDownload ? \"checked\" : \"\") + \" onclick='addDownload = ! addDownload;  Save();'> \
<label for='setting-download-link' class='settings-email-news-offers'>Allow song downloading.</label> \
</div> \
</div> \
";

var addSettings = " \
function addSettings(){ \
    var set = document.getElementById('settings-view'); \
    var newSett = document.createElement('div'); \
    newSett.innerHTML = \"" + settings + "\"; \
    set.appendChild(newSett); \
} \
";

addScript(sortAlbums + addSettings + ' \
SJBpostOrg = SJBpost; \
SJBpost = function (e, a, d) { \
    SJBpostOrg(e, a, d); \
    sortAlbumsFunc(); \
    setTimeout(addSettings, 1000); \
}');



