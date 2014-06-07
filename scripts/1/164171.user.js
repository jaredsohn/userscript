// ==UserScript==
// @name        DirtyDDL
// @icon        http://i.imgur.com/YIA9na2.png
// @namespace   http://www.softcreatr.de
// @author      Sascha Greuel
// @description Direct download videos from "dirty" websites
// @version     1.7.4
// @run-at      document-end
// @grant       none
//
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.3.1/jquery.cookie.min.js
// @require     http://yourjavascript.com/4021335332/aes.js
// @require     http://yourjavascript.com/2203502261/md5.js
//
// @include     /^https?://(www\.)?4tube\.com/videos/([0-9]+)/.*/
// @include     /^https?://(www\.)?beeg\.com/([0-9]+)/
// @include     /^https?://(www\.)?behentai.com/galleries/([0-9]+)/([0-9]+)/.*\.php/
// @include     /^https?://(www\.)?camelstyle\.net/video/.*/
// @include     /^https?://(www\.)?deviantclip\.com/watch/.*/
// @include     /^https?://(www\.)?drtuber\.com/video/([0-9]+)/.*/
// @include     /^https?://(www\.)?extremetube\.com/video/.*-([0-9]+)/
// @include     /^https?://(www\.)?foxytube\.com/videos/([0-9]+)/.*\.html/
// @include     /^https?://(www\.)?hentaistream.com/watch/.*/
// @include     /^https?://(www\.)?hentaitube.biz/view/([0-9]+)/.*/
// @include     /^https?://(www\.)?hentaitube\.tv/video/([0-9]+)/.*/
// @include     /^https?://(www\.)?keezmovies\.com/video/.*-([0-9]+)$/
// @include     /^https?://(www\.)?mofosex\.com/videos/([0-9]+)/.*-([0-9]+)\.html/
// @include     /^https?://(www\.)?motherless\.com/([a-z0-9]+)/
// @include     /^https?://(www\.)?myxvids\.com/video/.*-([a-z0-9]+)\.html/
// @include     /^https?://(www\.)?nuvid\.com/video/([0-9]+)/.*/
// @include     /^https?://(www\.)?overthumbs\.com/galleries/.*/
// @include     /^https?://(www\.)?porn.com/videos/.*-([0-9]+)\.html/
// @include     /^https?://(www\.)?porn\.to/video/.*/
// @include     /^https?://(www\.)?pornbanana\.com/video\.aspx\?id=([0-9]+)/
// @include     /^https?://(www\.)?pornerbros\.com/([0-9]+)/.*\.html/
// @include     /^https?://(www\.)?pornhub\.com/view_video.php\?viewkey=([0-9]+)/
// @include     /^https?://(www\.)?pornper\.com/video/([0-9]+)/.*/
// @include     /^https?://(www\.)?rawtube\.com/videos/.*-([0-9]+)\.html/
// @include     /^https?://(www\.)?redtube\.com/([0-9]+)/
// @include     /^https?://(www\.)?sluttyred\.com/videos/.*-([0-9]+)\.html/
// @include     /^https?://(www\.)?spankwire\.com/.*/video([0-9]+)/
// @include     /^https?://(www\.)?submityourdude\.com/videos/([0-9]+)/.*\.html/
// @include     /^https?://(www\.)?submityourflicks\.com/videos/([0-9]+)/.*\.html/
// @include     /^https?://(www\.)?submityourmom\.com/videos/([0-9]+)/.*\.html/
// @include     /^https?://(www\.)?submityourtapes\.com/videos/([0-9]+)/.*\.html/
// @include     /^https?://(www\.)?tube8\.com/.*/.*/([0-9]+)/
// @include     /^https?://(www\.)?tubehentai\.com/videos/.*-([0-9]+)\.html/
// @include     /^https?://(www\.)?xhamster\.com/movies/([0-9]+)/.*\.html/
// @include     /^https?://(www\.)?xtube\.com/watch\.php\?v=([a-z0-9]+)\-S([0-9]+)-/
// @include     /^https?://(www\.)?xvideos\.com/video([0-9]+)/.*/
// @include     /^https?://(www\.)?xxxymovies\.com/watch/([0-9]+)/.*\.html/
// @include     /^https?://(www\.)?yobt\.com/content/([0-9]+)/.*\.html/
// ==/UserScript==

(function ($) {
    function dddlBox(url) {
        $('head').append('<style type="text/css">#dirtyDDL{position:fixed;right:5px;bottom:5px;z-index:1000;opacity:0.8}#dirtyDDL a{font-size:11px;font-family:Verdana;font-weight:700;color:#008C00!important;text-align:center;outline:none;background-color:#DFF1FD;border:1px solid #B6D9EE;display:block;text-decoration:none;padding:4px}#dirtyDDL a:hover{border:1px solid #AE150E}#dirtyDDL img{background:none;border:none;vertical-align:middle;margin:0;padding:0}</style>');

        $('body').append('<div id="dirtyDDL"><a title="Download" target="_blank" href="' + decodeURIComponent(url) + '" onclick="location.reload(true);"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACTUlEQVQ4jY2SP2gTcRTHP3e/a0yapk3a/DHBkv7/hy0tXVzExUVBFBwVcXWrU5dKQbuLDkVpJwmCiIjgn81B0MWTOlm72KLF2jaXa9Lk0ubufueQtLSYgG967/F9H77v8RTqxWPoDka8o63V66ZST6rVBQB+v8ZoLEHJrvBjx2wkawxo83cwlpzEsAoYe8vAdl2d2gjQJIKETqQI+uI0iWBDB8f2mng1vASMH9Tne85glgt82fh2VPZ16fLyxD8OdF2//yD5aDyqJCjZFhF/iPXCJvn9IhF/iJJtEdpv41Z+anxhYeH+MQe6rncJIVb7e0coyRLXPl7le2GZU61xANYLWwy0DLE4mUFUBK/fvKRY3O2enp5eO3Aw29EeQwhBe6CNZ+de0NXcw0p2jZXsGunmHp6efU48FEXTfHR2dmFZ1iyAout6WAhh9veOIITg98YfUqk4Wcvg0vsLxEWS27E7eJZGwK8y0NdNYbdAJrNIPp+PaMBUS7AVIQQAqeRJ8CAaiPHp4mc8z0NKiSsltu1Qqdj4mnwkEimy2eyUouu66bheWFUUFEWpXqU2JKXEdV1c6SLdWn5Yu5imuaPZth0+PTqGoigocAip+7fApr2JLWzSgTTzD+fDWi6XA+Dtuw+oQkWoahWm1GBH3mV4KM3c+l2IwtzgPQzDQDMMA4Ct7RxDg2mEUFFVFVWtOqIGAyiXyxT3Svwq/sSVLrlcrgpoDvi5eePKf62Q6XtSTSTYto0yMzNjOo4TdhwHx3EODyWlxPM8PM9rgAJg5y/H/fqcUtIgwQAAAABJRU5ErkJggg%3D%3D" width="16" height="16" /> Download this clip!</a></div>');
    }

    // Create Cookie and reload the site
    function doCookie(name, value) {
        if ($.cookie(name) !== value) {
            $.cookie(name, value, {
                expires: 90
            });

            location.reload(true);
        }
    }

    // Declare vars
    var $loc = $(location).attr('href').toLowerCase(),
        $url = '',
        $tempvar1 = '',
        $tempvar2 = '',
        $tempvar3 = '',
        $tempvar4 = '';

    $.ajaxSetup({
        async: false
    });

    /***************************************/

    if ($loc.match(/4tube\.com/)) {
        $("script:contains('flashvars')").each(function () {
            $tempvar1 = $(this).text().split('config=')[1].split('%26')[0];
        });

        $.ajax({
            url: $tempvar1,
            dataType: 'html',
            success: function (data) {
                $url = data.split("<file>")[1].split("</file>")[0];
            }
        });

        /***************************************/

    } else if ($loc.match(/beeg\.com/)) {
        $("script:contains('file')").each(function () {
            $url = $(this).text().split("'file': '")[1].split("'")[0];
        });

        /***************************************/

    } else if ($loc.match(/behentai\.com/)) {
        $.ajax({
            url: '/galleries/' + location.pathname.split("/")[2] + '/' + location.pathname.split("/")[3] + '/jw_playlist.php',
            dataType: 'html',
            success: function (data) {
                $url = data.split('<location>')[1].split('</location>')[0];
            }
        });

        /***************************************/

    } else if ($loc.match(/deviantclip\.com/)) {
        $("script:contains('openAdStreamer')").each(function () {
            $url = $(this).text().split('file":"')[1].split('"')[0];
        });


        /***************************************/

    } else if ($loc.match(/drtuber\.com/)) {
        $tempvar1 = 'PT6l13umqV8K827';
        $tempvar2 = $("#player").html().split('flashvars="config=')[1].split('&amp;')[0];
        $tempvar3 = $tempvar2.split('vkey=')[1];
        $tempvar4 = decodeURIComponent($tempvar2 + '&pkey=' + md5($tempvar3 + $tempvar1));

        $.ajax({
            url: $tempvar4,
            dataType: 'html',
            success: function (data) {
                $url = data.split('<video_file>')[1].split('</video_file>')[0];
            }
        });

        /***************************************/

    } else if ($loc.match(/extremetube\.com/)) {
        doCookie('age_verified', '1');

        $("script:contains('htmlStr')").each(function () {
            $url = $(this).text().split("video_url=")[1].split("&amp;postroll_url")[0];
        });

        /***************************************/

    } else if ($loc.match(/foxytube\.com/)) {
        $("script:contains('SWFObject')").each(function () {
            $url = $(this).text().split('"file", "')[1].split('"')[0];
        });

        /***************************************/

    } else if ($loc.match(/hentaistream\.com/)) {
        $("script:contains('flashvars')").each(function (index, value) {
            $tempvar1 = $(this).text().split("file: '")[1].split("'")[0];
        });

        $.ajax({
            url: $tempvar1,
            dataType: 'html',
            success: function (data) {
                $url = data.split('<location>')[1].split('</location>')[0];
            }
        });

        /***************************************/

    } else if ($loc.match(/hentaitube\.biz/)) {
        $("script:contains('s1')").each(function (index, value) {
            $url = $(this).text().split('"file","')[1].split('"')[0];
        });

        /***************************************/

    } else if ($loc.match(/hentaitube\.tv/)) {
        $url = '/flvideo/' + location.pathname.split("/")[2] + '.flv';

        /***************************************/

    } else if ($loc.match(/keezmovies\.com/)) {
        doCookie('age_verified', '1');

        $("script:contains('flashvars')").each(function () {
            $tempvar1 = $(this).text().split('video_title=')[1].split('&')[0];
            $tempvar2 = decodeURIComponent($(this).text().split('video_url=')[1].split('&')[0]);
            $url = Aes.Ctr.decrypt($tempvar2, $tempvar1, 256);
        });

        /***************************************/

    } else if ($loc.match(/mofosex\.com/)) {
        $("script:contains('video_url')").each(function () {
            $url = $(this).text().split("video_url = '")[1].split("'")[0];
        });

        /***************************************/

    } else if ($loc.match(/motherless\.com/)) {
        $("script:contains('flashplayer')").each(function () {
            $url = $(this).text().split("file: '")[1].split("'")[0] + '?start=0';
        });

        /***************************************/

    } else if ($loc.match(/nuvid\.com/)) {
        $tempvar1 = 'hyr14Ti1AaPt8xR';
        $tempvar2 = $("#player").html().split('flashvars="config=')[1].split('&amp;')[0];
        $tempvar3 = $tempvar2.split('vkey=')[1];
        $tempvar4 = decodeURIComponent($tempvar2 + '&pkey=' + md5($tempvar3 + $tempvar1));

        $.ajax({
            url: $tempvar4,
            dataType: 'html',
            success: function (data) {
                $url = data.split('<video_file>')[1].split('</video_file>')[0];
            }
        });

        /*****************************************/

    } else if ($loc.match(/overthumbs\.com/)) {
        $("script:contains('VideoID')").each(function () {
            $tempvar1 = $(this).text().split('VideoID = "')[1].split('"')[0];
        });

        $.ajax({
            url: '/flvplayer/player/xml_connect.php?code=' + $tempvar1,
            dataType: 'html',
            success: function (data) {
                $url = data.split("<urlMOV1>")[1].split("</urlMOV1>")[0];
            }
        });

        /***************************************/

    } else if ($loc.match(/porn\.com/)) {
        $("script:contains('playlist')").each(function () {
            $url = $(this).text().split('playlist: ["')[1].split('"]')[0];
        });

        /***************************************/

    } else if ($loc.match(/pornbanana\.com/)) {
        $("script:contains('regularVideoUrl')").each(function () {
            $url = $(this).text().split("_regularVideoUrl = '")[1].split("'")[0];
        });

        /***************************************/

    } else if ($loc.match(/pornerbros\.com/)) {
        $.ajax({
            url: '/content/' + location.pathname.split("/")[1] + '.js',
            dataType: 'html',
            success: function (data) {
                $url = data.split("url:escape('")[1].split("'")[0];
            }
        });

        /***************************************/

    } else if ($loc.match(/pornhub\.com/)) {
        doCookie('age_verified', '1');

        $("script:contains('flashvars')").each(function () {
            $tempvar1 = ($(this).text().split('"video_title":"')[1].split('"')[0]).split('+').join(' ');
            $tempvar2 = decodeURIComponent($(this).text().split('"video_url":"')[1].split('"')[0]);
            $url = Aes.Ctr.decrypt($tempvar2, $tempvar1, 256);
        });

        /***************************************/

    } else if ($loc.match(/pornper\.com/)) {
        $("script:contains('file')").each(function () {
            $url = $(this).text().split("'file': '")[1].split("'")[0];
        });

        /***************************************/

    } else if ($loc.match(/rawtube\.com/)) {
        $("script:contains('flashvars')").each(function () {
            $url = 'http://' + $(this).text().split('flashvars.site="')[1].split('"')[0] + '.rawtube.com/flvs/' + $(this).text().split('flashvars.id="')[1].split('"')[0] + '.flv';
        });

        /***************************************/

    } else if ($loc.match(/redtube\.com/)) {
        doCookie('cookAV', '1');

        $("script:contains('redtube_flv_player')").each(function () {
            $url = $(this).text().split("source src='")[1].split("'")[0];
        });

        /***************************************/

    } else if ($loc.match(/sluttyred\.com/)) {
        $("script:contains('file')").each(function () {
            $url = $(this).text().split('file: "')[1].split('"')[0];
        });

        /***************************************/

    } else if ($loc.match(/spankwire\.com/)) {
        doCookie('adultd', '1');
        doCookie('sexpref', 'Straight');

        $("script:contains('video_url')").each(function () {
            $url = $(this).text().split('video_url = "')[1].split('"')[0];
        });

        /***************************************/

    } else if ($loc.match(/submityourflicks\.com/) || $loc.match(/submityourtapes\.com/) || $loc.match(/submityourmom\.com/) || $loc.match(/submityourdude\.com/)) {
        doCookie('adultd', '1');

        $("script:contains('SWFObject')").each(function () {
            $url = $(this).text().split('"file", "')[1].split('"')[0];
        });

        /***************************************/

    } else if ($loc.match(/tube8\.com/)) {
        doCookie('t8disclaimer', '1');

        $("script:contains('flashvars')").each(function () {
            $tempvar1 = decodeURIComponent($(this).text().split('"video_title":"')[1].split('"')[0]);
            $tempvar2 = $(this).text().split('"video_url":"')[1].split('"')[0].split('\\/').join('/');
            $url = Aes.Ctr.decrypt($tempvar2, $tempvar1, 256);
        });

        /***************************************/

    } else if ($loc.match(/tubehentai\.com/)) {
        $tempvar1 = location.pathname.split("/")[2].match(/[0-9]+\.html/)[0].split('.')[0];
        $tempvar2 = [];
        $tempvar3 = $tempvar1.toString();

        for (var i = 0, len = $tempvar3.length; i < len; i += 1) {
            $tempvar2.push($tempvar3.charAt(i));

        }

        $url = 'http://tubehentai.com/media/videos/' + $tempvar2.join('/') + '/./' + $tempvar1 + '.flv';

        /***************************************/

    } else if ($loc.match(/xhamster\.com/)) {
        $("script:contains('flashvars')").each(function () {
            $tempvar1 = $(this).text().split("'srv': '")[1].split("'")[0];
            $tempvar2 = $(this).text().split("'file': '")[1].split("'")[0];

            $url = $tempvar1 + '/key=' + $tempvar2;
        });

        /***************************************/

    } else if ($loc.match(/xtube\.com/)) {
        doCookie('cookie_warning', 'S');

        $("script:contains('contentId')").each(function () {
            $tempvar1 = $(this).text().split("contentOwnerId = '")[1].split("'")[0];
            $tempvar2 = $(this).text().split("contentId = '")[1].split("'")[0];
        });

        $.post("/find_video.php", {
            user_id: $tempvar1,
            video_id: $tempvar2
        }, function (data) {
            $url = data.substr(10);
        });

        /***************************************/

    } else if ($loc.match(/xvideos\.com/)) {
        doCookie('disclamer_display', 'OK');

        $url = $('embed[id=flash-player-embed]').attr("flashvars").split("flv_url=")[1].split("&")[0];

        /***************************************/

    } else if ($loc.match(/xxxymovies\.com/)) {
        $("script:contains('SWFObject')").each(function () {
            $tempvar1 = $(this).text().split("'file','")[1].split("'")[0];
        });

        $.ajax({
            url: $tempvar1,
            dataType: 'html',
            success: function (data) {
                $url = data.split('<media:content url="')[1].split('" />')[0];
            }
        });

        /***************************************/

    } else if ($loc.match(/yobt\.com/)) {
        $url = $('meta[itemprop=embedUrl]').attr("content");

        /***************************************/

    } else if ($loc.match(/camelstyle\.net/)) {
        $("script:contains('createPlayer')").each(function (index, value) {
            if (index === 1) {
                $url = $(this).text().split('createPlayer("')[1].split('"')[0];
            }
        });

        /***************************************/

    } else if ($loc.match(/myxvids\.com/)) {
        $("script:contains('video_url')").each(function () {
            $url = $(this).text().split("video_url = '")[1].split("'")[0];
        });

        /***************************************/

    } else if ($loc.match(/porn\.to/)) {
        $("script:contains('createPlayer')").each(function (index, value) {
            $url = $(this).text().split("createPlayer('")[1].split("'")[0];
        });

        /***************************************/

    }

    if ($url !== undefined && $url !== null && $url.length && $url !== 'undefined') {
        dddlBox($url);
    }

    /***************************************/

}(jQuery));