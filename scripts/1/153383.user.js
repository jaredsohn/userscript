// ==UserScript==
// @name Youku flash to ios
// ==/UserScript==
var embeds = document.getElementsByTagName("embed");
var i;
for (i=0;i<embeds.length;++i)
{
    var el = embeds[i];
    var src = el.src || "";
    var j = src.match(/http:\/\/.*\.youku\.com\/.*VideoIDS=([^ "&]*)\//);
    var f = j?j[1]:null;
    if (!f)
    {
        j = src.match(/http:\/\/.*\.youku\.com\/.*\/sid\/(.*)\//);
        f = j?j[1]:null;
    }
    console.log(j);
    if (f != null)
    {
        var html = '<video src="http://v.youku.com/player/getRealM3U8/vid/@videoId@/type//video.m3u8" height="100%" width="100%" controls="controls">您的浏览器不支持html5。</video>';
        var vid = document.createElement("video");
        vid.setAttribute("src","http://v.youku.com/player/getRealM3U8/vid/"+f+"/type//video.m3u8");
        vid.setAttribute("width","100%");
        vid.setAttribute("height","480px");
        vid.setAttribute("controls","controls");
        el.parentNode.replaceChild(vid,el);
        var link = document.createElement("a");
        link.href = "http://v.youku.com/v_show/id_"+f+".html";
        link.innerHTML = "这是一个链接";
        vid.parentNode.insertBefore(link,vid);
    }
}
