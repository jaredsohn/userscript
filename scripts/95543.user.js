// ==UserScript==
// @name           last.fm lyrics
// @namespace      http://meh.doesntexist.org
// @description    Puts lyrics everywhere on last.fm
// @include        http://last.fm/*
// @include        http://*.last.fm/*
// @include        http://lastfm.tld/*
// @include        http://*.lastfm.tld/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

Function.prototype.bind = function (context) {
    var __method = this

    return function() {
        return __method.apply(context, arguments);
    }
}

function decodeHTML (str) {
    var t = document.createElement('textarea');
    t.innerHTML = str;
    return t.value
}

function Lyrics () {
    this.callbacks = {
        'lyrics.wikia.com': function (song) {
            var song = JSON.parse(this.http(
                'http://lyrics.wikia.com/api.php?action=lyrics&fmt=json&func=getSong' +
                '&artist=' + encodeURIComponent(song.artist) +
                '&song=' + encodeURIComponent(song.title)
            ).replace(/^.*song.*?\{/, '{').replace(/'/g, '"').replace(/\\"/, "'"))

            if (song.lyrics == 'Not found') {
                return;
            }

            song.lyrics = decodeHTML(this.http(song.url).replace(/[\r\n]/g, '').match(/<div class='lyricbox' ?>(<div class='rtMatcher'>.*?<\/div>)?(.*?)<\/?div/)[2]).replace(/<br.*?>/g, "\n")

            if (song.lyrics.match('Unfortunately, we are not licensed to display the full lyrics for this song at the moment.')) {
                return;
            }

            return song;
        }.bind(this),

        'lyricstime.com': function (song) {
            var url = 'http://www.lyricstime.com' + this.http('http://www.lyricstime.com/search/?t=default&q=' + encodeURIComponent(song.artist + ' ' + song.title), 'ISO-8859-1').match(
                /<li><a href="(.*?)">/i
            )[1];

            return {
                url:    url,
                lyrics: this.http(url, 'ISO-8859-1').match(/<div id="songlyrics" >[\s\S]*?<p>([\s\S]+?)<\/p>/)[1].replace(/<br.*?>/g, '').replace(/\r/g, '').trim()
            };
        }.bind(this),

        'allyrics.net': function (song) {
            var url = 'http://www.allyrics.net' + this.http('http://www.allyrics.net/search_result.php?check=song&Submit.x=0&Submit.y=0&q=' + encodeURIComponent(song.title), 'ISO-8859-1').match(
                new RegExp("1. <a href='(.*?)'>")
            )[1];

            var lyrics = this.http(url, 'ISO-8859-1').match(/<div class='c_tl'>([\s\S]+?)<\/div>/im)[1].replace(/<script[\s\S]*?<\/script>/g, '').replace(/<br.*?>/g, '').replace(/\r/g, '').replace(/\n[ ]+/g, '\n').trim();

            if (lyrics.match(/It's not currently on our database/i)) {
                return;
            }

            return {
                url:    url,
                lyrics: lyrics
            };
        }.bind(this),

        'lyricsmode.com': function (song) {
            var url = 'http://www.lyricsmode.com' + this.http('http://www.lyricsmode.com/search.php?what=songs&s=' + encodeURIComponent(song.title)).match(
                new RegExp(song.artist.replace(/\s/g, '.*?') + '</a></td>[\\r\\n\\s]*?<td><a href="(.*?)" class="b"', 'i')
            )[1];

            return {
                url:    url,
                lyrics: this.http(url).match(/<div id='songlyrics_h' class='dn'>([\s\S]+?)<\/div>/)[1].replace(/<br.*?>/g, '').replace(/\r/g, '')
            };
        }.bind(this),

        'elyricsworld.com': function (song) {
            var result;
            var content = this.http('http://google.com/search?q=' + encodeURIComponent('inurl:elyricsworld.com +' + song.artist + ' ' + song.title));
    
            for each (var link in content.match(/<a href="([^"]+)" class=l /g) || []) {
                link = link.match(/href="([^"]+)"/)[1]
    
                if (link.match(/elyricsworld/)) {
                    result = {
                        url:    link,
                        lyrics: this.http(link, 'ISO-8859-1').match(/<p .*?>([\s\S]*?)<\/p>/im)[1].replace(/<br.*?>/g, '').replace(/<strong>.*?<\/strong>/, '').replace(/\r/g, '').replace(link+"\n", '').trim()
                    };

                    break;
                }
            }
    
            return result;
        }.bind(this)
    }

    this.http = function (url, encoding) {
        return GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            synchronous: true,
            overrideMimeType: "text/html; charset=" + (encoding || 'UTF-8')
        }).responseText
    }

    this.song = function () {
        if (window.location.href.match(/last.*\/user\/.+/)) {
            if (!$('#recentTracks tr:first-child td.dateCell')[0].innerHTML.match(/Listening now/)) {
                return;
            }

            return {
                artist: $('#recentTracks tr:first-child td.subjectCell a:nth-child(1)')[0].innerHTML,
                title:  $('#recentTracks tr:first-child td.subjectCell a:nth-child(2)')[0].innerHTML
            };
        }
        else if (window.location.href.match(/last.*\/music\/.+/)) {
            return {
                artist: $('#content .leftCol .breadcrumb a:nth-child(2)')[0].innerHTML,
                title:  $('#content .leftCol .breadcrumb span')[0].innerHTML
            };
        }
        else if (window.location.href.match(/last.*\/listen/)) {
            return {
                artist: $('li.nowPlaying a:nth-child(2)')[0].innerHTML,
                title:  $('li.nowPlaying a:nth-child(3)')[0].innerHTML
            };
        }
    }

    this.lyrics = function (song) {
        song = song || this.song();

        if (!song) {
            return;
        }
    
        var result;
        var ok = !this.used;
    
        for (callback in this.callbacks) {
            if (!ok) {
                if (callback == this.used) {
                    ok = true;
                }

                continue;
            }

            try {
                result = this.callbacks[callback](song);
            } catch (e) {
                GM_log(e);
            }
    
            if (result) {
                result.callback = this.used = callback
                break;
            }
        }

        if (!result) {
            this.reset();
        }
    
        return result;
    }

    this.reset = function () {
        delete this.used;
    }
}

$(function gm_meh () {
    var system = new Lyrics;

    if (!system.song() || $('#gm-meh-lyrics').length > 0) {
        return;
    }

    GM_addStyle((<><![CDATA[

    #gm-meh-lyrics {
        border: 1px solid #CCCCCC;
        margin-top: 5px;
    }

    #gm-meh-lyrics-title {
        font-size: 14px;
        font-weight: bold;
        border-bottom: 1px solid #CCCCCC;
        margin-bottom: 2px;
        padding: 3px;
    }

    #gm-meh-lyrics-service {
        font-size: 10px;
        padding-left: 5px;
    }

    #gm-meh-lyrics-functions {
        float: right;
    }

    #gm-meh-lyrics-functions-next {
        font-size: 10px;
        margin-right: 3px;
    }

    #gm-meh-lyrics-content {
        padding: 5px;
        white-space: pre;
    }

    tr.gm-meh:hover {
        background: transparent !important;
    }

    ]]></>).toString());

    if (window.location.href.match(/last.*\/user\/.+/)) {
        $('<tr class="gm-meh"><td colspan=6><div id="gm-meh-lyrics"></div></td></tr>').insertAfter('.recentTracksContainer tr:first-child')
        $('table#recentTracks').bind('DOMNodeInserted', gm_meh);
    }
    else if (window.location.href.match(/last.*\/music\/.+/)) {
        $('<div id="gm-meh-lyrics"></div>').appendTo('#catalogueHead');
    }
    else if (window.location.href.match(/last.*\/listen/)) {
        $('<div id="gm-meh-lyrics"></div>').prependTo('#nowPlayingMeta');
        $('#nowPlayingMeta').bind('DOMNodeRemoved', gm_meh);
    }

    $('<div id="gm-meh-lyrics-title">Lyrics</div>').appendTo('#gm-meh-lyrics');
    $('<div id="gm-meh-lyrics-content"></div>').appendTo('#gm-meh-lyrics');

    var content = $('#gm-meh-lyrics-content')[0];

    function fill () {
        var lyrics = system.lyrics();

        if (lyrics) {
            content.innerHTML = lyrics.lyrics;
            $('#gm-meh-lyrics-service').html('(<a target="_blank" href="'+ lyrics.url +'">' + lyrics.callback + '</a>)')
        }
        else {
            content.innerHTML = 'Lyrics not found.';
            $('#gm-meh-lyrics-service').html('')
        }
    }

    // Various lyrics functions
    $('<span id="gm-meh-lyrics-service"></span>').appendTo('#gm-meh-lyrics-title');
    $('<div id="gm-meh-lyrics-functions"></div>').appendTo('#gm-meh-lyrics-title');

    // Function: get lyrics from the next website
    $('<a id="gm-meh-lyrics-functions-next" href="javascript:void(0);">next</a>').appendTo('#gm-meh-lyrics-functions');
    $('#gm-meh-lyrics-functions-next').click(fill);

    // Function: hide/show the lyrics
    $('<a id="gm-meh-lyrics-functions-toggle" href="javascript:void(0);">'+ (GM_getValue('hidden', false) ? 'v' : '^') +'</a>').appendTo('#gm-meh-lyrics-functions');

    if (GM_getValue('hidden', false)) {
        $('#gm-meh-lyrics-content').css('display', 'none');
    }

    $('#gm-meh-lyrics-functions-toggle').click(function () {
        if (GM_getValue('hidden', false)) {
            $('#gm-meh-lyrics-content').css('display', 'block')
            $('#gm-meh-lyrics-functions-toggle').html('^')
            GM_setValue('hidden', false);
        }
        else {
            $('#gm-meh-lyrics-content').css('display', 'none')
            $('#gm-meh-lyrics-functions-toggle').html('v')
            GM_setValue('hidden', true);
        }
    });

    content.innerHTML = 'Loading...'; fill();
});
