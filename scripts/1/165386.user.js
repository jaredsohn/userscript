// ==UserScript==
// @name          Another GM script to fix bilibili player
// @description   this script can force browser use original bilibili flash player
// @namespace     JaHIY
// @author        JaHIY
// @version       0.2.6
// @match         http://www.bilibili.tv/video/av*
// @downloadURL   https://userscripts.org/scripts/source/165386.user.js
// @updateURL     https://userscripts.org/scripts/source/165386.meta.js
// ==/UserScript==

'use strict';

var GM_xmlhttpRequest,
    bilibili_player_fix = function(current_player_parent_node) {
    var $video_info = document.URL.match(/^http:\/\/www\.bilibili\.tv\/video\/av([0-9]+)\/(?:index_([0-9]+)\.html)?$/),
        $video_id = $video_info[1],
        $video_page = $video_info[2],
        $video_box = current_player_parent_node,
        $current_player = $video_box.getElementsByTagName('embed')[0] || $video_box.getElementsByTagName('iframe')[0],
        $appkey = '57dc40b9ff8b6bff';
    return {
        'is_fake_player': function() {
            var current_player = $current_player;
            return (current_player === undefined);
        },
        'replace_player': function(cid) {
            var video_box = $video_box,
                video_box_child_nodes = video_box.childNodes,
                l = video_box_child_nodes.length,
                real_player = document.createElement('iframe'),
                aid = $video_id;
            real_player.src = 'https://secure.bilibili.tv/secure,cid=' + cid + '&aid=' + aid;
            real_player.width = '950px';
            real_player.height = '588px';
            real_player.style.overflow = 'hidden';
            real_player.style.border = 'none';
            while(l > 0) {
                video_box.removeChild(video_box_child_nodes[--l]);
            }
            video_box.appendChild(real_player);
            return this;
        },
        'send_xmlhttpRequest': (function() {
            if (!!GM_xmlhttpRequest && typeof GM_xmlhttpRequest === 'function') {
                return function(request_url, callback_onload) {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: request_url,
                        headers: {
                            'User-Agent': 'Mozilla/5.0',
                            'Cache-Control': 'no-cache',
                            'Origin': 'http://api.bilibili.tv',
                            'Referer': window.location.href,
                            'Cookie': document.cookie
                        },
                        onload: function(res) {
                            callback_onload(JSON.parse(res.responseText));
                        }
                    });
                    return this;
                }
            } else {
                return function(request_url, callback_onload) {
                    var req = new XMLHttpRequest();
                    req.addEventListener('load', function() {
                        callback_onload(JSON.parse(req.responseText).query.results.json);
                    }, false);
                    req.open('GET', 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from json where url="' + request_url + '"') + '&callback=&format=json', true);
                    req.send();
                    return this;
                }
            }
        }()),
        'link_start': function() {
            var video_id = $video_id,
                video_page = $video_page,
                appkey = $appkey,
                bilibili_api_request = 'http://api.bilibili.tv/view?type=json&appkey=' + appkey + '&id=' + video_id + ((video_page !== undefined) ? '&page=' + video_page : ''),
                that = this;
            this.is_fake_player() && this.send_xmlhttpRequest(bilibili_api_request, function(e) {
                that.replace_player(e.cid);
            });
        }
    }
}

bilibili_player_fix(document.getElementById('bofqi')).link_start();