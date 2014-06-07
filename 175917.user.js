// ==UserScript==
// @name        Netease Music Download
// @namespace   qixinglu.com
// @description 网易云音乐下载地址
// @include     http://music.163.com/*
// @grant       none
// ==/UserScript==

var api = {

    detailUrl: function(songIds) {
        var tpl = 'http://music.163.com/api/song/detail?ids=[${songIds}]';
        return tpl.replace('${songIds}', songIds.join(','));
    },

    detail: function(songIds, callback) {
        var req = new XMLHttpRequest();
        req.open('GET', this.detailUrl(songIds), true);
        req.onload = function() {
            callback(JSON.parse(this.responseText));
        };
        req.send();
    },

    mediaUrl: function(songId) {
        return 'http://music.163.com/api/song/media?id=' + songId;
    },

    media: function(songId, callback) {
        var req = new XMLHttpRequest();
        req.open('GET', this.mediaUrl(songId), true);
        req.onload = function() {
            callback(JSON.parse(this.responseText));
        };
        req.send();
    },

};

var innerFrame = document.querySelector('iframe');

var pages = [
{
    url: 'http://music.163.com/#/m/song?id=',
    handler: function() {
        var songId = location.href.match(/id=([0-9]+)/)[1];
        var downloadLine = this.createDownloadLine(songId);

        var innerFrameDoc = innerFrame.contentWindow.document;
        var albumNode = innerFrameDoc.querySelectorAll('p.des.s-fc4')[1];
        var parentNode = albumNode.parentNode;
        parentNode.insertBefore(downloadLine, albumNode.nextElementSibling);
    },
    createDownloadLine: function(songId) {
        var disableStyle = function(link) {
            link.text += '(无)';
            link.style.color = 'gray';
            link.style.textDecoration = 'none';
            link.style.cursor = 'auto';
        };

        var mp3Link = this.createLink('歌曲');
        var lyricLink = this.createLink('歌词');

        api.detail([songId], function(result) {
            var song = result.songs[0];
            mp3Link.href = song.mp3Url;
        });
        api.media(songId, function(result) {
            if (result.lyric) {
                lyricLink.href = 'data:text/plain;charset=utf-8,' +
                                 encodeURIComponent(result.lyric);
            } else {
                disableStyle(lyricLink);
            }
        });

        var container = this.createLineContainer('下载');
        container.appendChild(mp3Link);
        container.appendChild(lyricLink);
        return container;
    },
    createLink: function(label) {
        var link = document.createElement('a');
        link.innerHTML = label;
        link.className = 's-fc7';
        link.style.marginRight = '10px';
        link.href = 'javascript:void(0);';
        return link;
    },
    createLineContainer: function(label) {
        var container = document.createElement('p');
        container.className = 'desc s-fc4';
        container.innerHTML = label + '：';
        container.style.margin = '10px 0';
        return container;
    },
},
]

if (innerFrame) {
    innerFrame.addEventListener('load', function() {
        var i, page;
        for (i = 0; i < pages.length; i += 1) {
            var page = pages[i];
            if (location.href.indexOf(page.url) == 0) {
                page.handler();
            }
        }
    });
}
