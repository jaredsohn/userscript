// ==UserScript==
// @name           Flvcd Download Links
// @namespace      http://qixinglu.com
// @description    替换在线视频的下载链接为 flvcd.com 的解析链接
// @include        http://v.youku.com/v_show/*.htm*
// @include        http://v.youku.com/v_playlist/*.htm*
// @include        http://www.tudou.com/playlist/*.htm*
// @include        http://www.tudou.com/albumplay/*.htm*
// @include        http://www.tudou.com/programs/view/*
// ==/UserScript==

function create_flvcd_url(format) {
    return 'http://www.flvcd.com/parse.php?kw=' + encodeURIComponent(document.URL) + '&flag=&format=' + format;
}

var title = '用 Flvcd 下载视频';
var sites = [
    {
        domain: 'youku.com',
        handler: function() {
            var source_link_node = document.getElementById('fn_download');
            var new_link_node = source_link_node.cloneNode();
            new_link_node.href = create_flvcd_url('super');
            new_link_node.title = title;
            source_link_node.parentNode.replaceChild(new_link_node, source_link_node);
        }
    },
    {
        domain: 'tudou.com',
        handler: function() {
            var source_link_node = document.getElementById('download');
            var new_link_node = source_link_node.cloneNode();
            if (source_link_node.parentNode.className === 'player_extra') {
                new_link_node.id = 'flvcd-' + source_link_node.id;
                new_link_node.classList.remove('disabled')
            } else {
                new_link_node.classList.remove('download');
                new_link_node.style.width = '71px';
            }
            new_link_node.href = create_flvcd_url('real');
            new_link_node.title = title;
            source_link_node.parentNode.replaceChild(new_link_node, source_link_node);
        }
    }
];

var url = document.URL;
var i, site;
for (i = 0; i < sites.length; i += 1) {
    site = sites[i];
    if (url.indexOf(site.domain) != -1) {
        site.handler();
        break;
    }
}
