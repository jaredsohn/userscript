// ==UserScript==
// @name        simplify_tencent_weibo
// @description 清除腾讯微博无用的广告、推荐等内容
// @namespace   http://liselsia.org/javascript
// @include     http://t.qq.com/*
// @version     1
// ==/UserScript==
//

window.addEventListener('load', function() {
    var block_id = [
        'micro-oly-ctn', 'app_channel', 'app_ad', 'app_recStars',
        'app_olypicCheer', 'app_hotTopics'
        ]
    , block_div_class = [
        'sc_banner', 'main_bn'
    ]
    , i = 0
    , j = 0
    , e = null;
    for (i = 0; i < block_id.length; i++) {
        e = document.getElementById(block_id[i]);
        if (e)
            e.parentNode.removeChild(e);
    }
    for (i = 0; i < block_div_class.length; i++) {
        e = document.getElementsByTagName('div');
        for (j in e) {
            if ((" " + e[j].className + " ").indexOf(" " + block_div_class[i] + " ") > -1) {
                e[j].style.display = 'none';
                //e[j].parentNode.removeChild(e[j]);
            }
        }

    }
});
