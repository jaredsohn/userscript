// ==UserScript==
// @name       qzone点赞
// @namespace  
// @version    0.1
// @description  
// @match      user.qzone.qq.com/*
// @require    http://code.jquery.com/jquery-1.10.2.min.js
// @copyright  yfy
// ==/UserScript==

setInterval(function() {
    var zan = $(".qz_like_btn_v3");
    var st;
    for (var i in zan)
    {
        st = zan[i].innerText;
        if (st[0] == "赞")
        {
            zan[i].click();
            break;
        }
    }
}, 3000);
