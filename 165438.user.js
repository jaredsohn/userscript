// ==UserScript==
// @name        التحويل إلى اليوتيوب النقي
// @namespace   التحويل إلى اليوتيوب النقي
// @description تحول المستخدم إختيارياً من يوتيوب إلى موقع اليوتيوب النقي cleanutube.com
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @include     http://m.youtube.com/*
// @include     https://m.youtube.com/*
// @version     1
// ==/UserScript==
var unsafeWindow = unsafeWindow || null,
    wnd = unsafeWindow || window,
    doc = wnd.document,
    result = /v=([^&]+)(?:&.*)*/i.exec(doc.location.search);

if(result)
{
    if(!wnd.sessionStorage.getItem("__cleanYTPrompted") && wnd.confirm("هل تريد التحول إلى اليوتيوب النقي للمشاهدة الآمنة؟"))
        wnd.location.href = "http://cleanutube.com/play-" + result[1];

    wnd.sessionStorage.setItem("__cleanYTPrompted", true);
}