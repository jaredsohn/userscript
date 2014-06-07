// ==UserScript==

// @name           dcdnet.ru links
// @namespace      http://dcdnet.ru/*
// @include        http://dcdnet.ru/artists/*/
// @include        http://dcdnet.ru/albums/*/

// ==/UserScript==

//Copyright Ilya Strukov <iley@iley.ru>, 2010


var LastfmEnabled = true, //чтобы не отображать ссылку на last.fm, замените "true" на "false"
    WhatcdEnabled = true,
    DiscogsEnabled = true,
    AllMusicEnabled = true,
    WikipediaEnEnabled = true,
    WikipediaRuEnabled = true;

var linkPrefix = "";    //здесь можно указать текст, который будет добавляться в начало ссылки

function pasteMyHTML(id, html){
    var element = document.getElementById(id);
    var tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    var childs = tmp.childNodes;
    for (var i = 0; i < childs.length; i++)
        element.parentNode.insertBefore(childs[i], element);
    element.parentNode.removeChild(element);
}

function main() {
    var div = document.createElement('div');
    var sidebar = document.getElementById('sidebar');
    div.id = 'iley_links';
    sidebar.appendChild(div);
    var content = document.getElementById('content');
    var html, artist;

    if(document.URL.indexOf("artist") != -1) {
        artist = content.getElementsByTagName('span')[0].innerHTML;
        var artist_url = artist.replace(/\s/g, '+');
        var artist_wiki = artist.replace(/\s/g, '_');

        html = '<div id="additional_links" class="supplementary">' + 
                    '<div class="inner">' +
                    '<h3><span>Ссылки</span></h3>' + 
                    '<p class="info">' + artist + ' на других сайтах</p>';

        if(AllMusicEnabled) {
            html += '<form name="allmusic_search" action="http://www.allmusic.com/cg/amg.dll" method="post">' +
                        '<input type="hidden" name="P" value="amg" />' +
                        '<input type=hidden name=sql value="' + artist + '"/>' +
                        '<input type=hidden name=opt1 value=1 />' +
                        '<input TYPE=HIDDEN name="samples" VALUE="1">' +
                    '</form>';
        }

        html += '<ul>';

        if(LastfmEnabled) {
            html += '<li><a href="http://lastfm.ru/music/' + artist_url + '">' + linkPrefix + 'Last.fm</a>';
        }

        if(WhatcdEnabled) {
            html += '<li><a href="http://what.cd/artist.php?name=' + artist_url + '">' + linkPrefix + 'What.cd</a>';
        }

        if(DiscogsEnabled) {
            html += '<li><a href="http://www.discogs.com/artist/' + artist_url + '">' + linkPrefix + 'Discogs.com</a>';
        }

        if(AllMusicEnabled) {
            html += '<li><a href="javascript:document.forms.allmusic_search.submit()">' + linkPrefix + 'AllMusic.com</a>';
        }

        if(WikipediaEnEnabled) {
            html += '<li><a href="http://en.wikipedia.org/wiki/' + artist_wiki + '">' + linkPrefix + 'Wikipedia.org (en)</a>';
        }

        if(WikipediaRuEnabled) {
            html += '<li><a href="http://ru.wikipedia.org/wiki/' + artist_wiki + '">' + linkPrefix + 'Wikipedia.org (ru)</a>';
        }

        html += '</ul>  </div></div>';

    } else if (document.URL.indexOf("album") != -1) {
        artist = content.getElementsByTagName('a')[0].innerHTML;
        var artist_url = artist.replace(/\s/g, '+');
        var album = content.getElementsByTagName('span')[3].innerHTML;
        var album_url = album.replace(/\s/g, '+');
        var album_wiki = album.replace(/\s/g, '_');


        html = '<div id="additional_links" class="supplementary">' +
                    '<div class="inner">' +
                        '<h3><span>Ссылки</span></h3>'
                        '<p class="info">' + album + ' на других сайтах</p>';

        if(AllMusicEnabled) {
            html += '<form name="allmusic_search" action="http://www.allmusic.com/cg/amg.dll" method="post">' +
                        '<input type="hidden" name="P" value="amg" />' +
                        '<input type=hidden name=sql value="' + album + '"/>' +
                        '<input type=hidden name=opt1 value=2 />' +
                        '<input TYPE=HIDDEN name="samples" VALUE="1">' +
                    '</form>';
        }

        html += '<ul>';

        if(LastfmEnabled)
            html += '<li><a href="http://lastfm.ru/music/' + artist_url + '/' + album_url + '">' + linkPrefix + 'Last.fm</a>';

        if(WhatcdEnabled)
            html += '<li><a href="http://what.cd/torrents.php?type=&userid=&artistname=' + artist_url + '&action=advanced&torrentname=' + album_url + '&remastertitle=&filelist=&bitrate=&format=&media=&year=&haslog=&hascue=&scene=&freeleech=&remastered=&searchtags=&tags_type=0&order_by=s3&order_way=desc">' + linkPrefix + 'What.cd</a>';

        if(DiscogsEnabled)
            html += '<li><a href="http://www.discogs.com/search?ev=hs&q=' + artist_url + '+' + album_url + '">' + linkPrefix + 'Discogs.com</a>';

        if(AllMusicEnabled) {
            html += '<li><a href="javascript:document.forms.allmusic_search.submit()">' + linkPrefix + 'AllMusic.com</a>';
        }

        if(WikipediaEnEnabled) {
            html += '<li><a href="http://en.wikipedia.org/wiki/' + album_wiki + '">' + linkPrefix + 'Wikipedia.org (en)</a>';
        }

        if(WikipediaRuEnabled) {
            html += '<li><a href="http://ru.wikipedia.org/wiki/' + album_wiki + '">' + linkPrefix + 'Wikipedia.org (ru)</a>';
        }

        html += '</ul>  </div></div>';
    }

    pasteMyHTML('iley_links', html);
}

window.addEventListener("load", main, false);
