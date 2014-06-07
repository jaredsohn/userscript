// ==UserScript==
// @name       All 赞 for Qzone
// @namespace  
// @version    0.1
// @description  Automatically click all "赞"s on a Qzone page
// @match      http://*.qzone.qq.com/*
// @copyright  2013,gyf
// ==/UserScript==
    
function zan()
{
    var x = document.getElementsByClassName("qz_like_btn_v3");
    var count = 0;
    for (var i = 0; i < x.length; ++i) 
    { 
        if (x[i].innerHTML.match(/^赞/) && typeof x[i].click ==="function") 
        {
            x[i].click(); 
            ++count; 
        }
    }
    if (count > 0)
    {
        console.log("Zans:"+count.toString());
    }
 }

setTimeout(zan, 4000);
setInterval(zan, 10000);