// ==UserScript==
// @name           Nico Nickname
// @namespace      http://web.zgo.jp/
// @description    うｐ主のニックネームを調べるスクリプト
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==

(function() {

    // var video_id = location.href.match(/watch\/[sn]m(\d+)/)[1];
    var videoTitle = document.getElementsByClassName('video_title')[0];
    var owner = document.getElementsByClassName("img_sq48")[0];
    if (!videoTitle && !owner) return;
    var nickname = owner.alt;//Alt要素

    // var svlink = 'http://www.smilevideo.jp/allegation/allegation/' + video_id + '/';
    //    GM_xmlhttpRequest({
    //        method: 'GET',
    //        url: svlink,
    //        headers: { "User-Agent": "Mozilla/5.0" },
    //        onload: function(res) {
    //            nickname = 'no name'; // can't get nickname
    //            if (/<strong(?:\s*[^>]*|)>(.*?)<\/strong>.*?が投稿/.test(res.responseText)) {
    //                nickname = decodeURIComponent(RegExp.$1);
    //            }
    //            window.gm_nicoNickname = nickname;
    //            var span = document.createElement('span');
    //            //p.setAttribute('class', 'TXT12');
    //            span.style.cssText = 'font-size:small; margin-top:4px; line-height:1.25;';
    //            //cssのスタイルを変える。
    //            span.innerHTML = '　うｐ主：<a href="http://www.nicochart.jp/name/' + nickname + '" title ="' + nickname + '">' + nickname + '</a>';
    //            videoTitle.appendChild(span); // insert position
    //        },
    //        //nextをfirstにするとタイトル前に表示
    //        onerror: function(res) {
    //            GM_log(res.status + ':' + res.statusText);
    //        }
    //    });

    window.gm_nicoNickname = nickname;
    var span = document.createElement('span');
    //p.setAttribute('class', 'TXT12');
    span.style.cssText = 'font-size:small; margin-top:4px; line-height:1.25;';
    //cssのスタイルを変える。
    span.innerHTML = '　うｐ主：<a href="http://www.nicochart.jp/name/' + nickname + '" title ="' + nickname + '">' + nickname + '</a>';
    videoTitle.appendChild(span);
})();
