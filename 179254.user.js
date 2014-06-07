// ==UserScript==
// @name       [private]QSC - osu! Beatmap推荐生成
// @version    0.11
// @match      https://osu.ppy.sh/b/*
// @match      http://osu.ppy.sh/b/*
// ==/UserScript==

text = '[font=Hiragino Sans GB W3, 微软雅黑]\n\
　　[url=https://s.ppy.sh/mp3/preview/$[BID].mp3][img]https://s.ppy.sh/mt/$[BID]l[/img][/url]\n\
　　[b][url=http://osu.ppy.sh/s/$[BID]]$[BID][/url]　$[TITLE] / from \n\
[/b]　　——————\n\
　　[b][color=#FF6633]歌曲　★☆☆[/color][/b]\n\
　　[b][color=#9933CC]游戏　★☆☆[/color][/b]\n\
　　[b][color=#33CC66]其他　★☆☆[/color][/b]\n\
　　——————\n\
　　COMMENT\n\
[/font]';

downloadElement = document.querySelector("div.beatmapDownloadButton>a");
url = downloadElement.href;
bid = url.match(/[0-9]+/)[0];

title = document.title;

text = text.replace(/\$\[BID\]/g, bid);
text = text.replace(/\$\[TITLE\]/g, title);

var recordText = document.createElement("TEXTAREA");

recordText.setAttribute("id", "recordText");
recordText.style.left = "0";
recordText.style.top = "0";
recordText.style.width = "500px";
recordText.style.height = "150px";
recordText.style.position = "absolute";
recordText.style.zIndex = "51";
recordText.style.fontFamily = "宋体";

t=document.querySelector("div.mainbody2");
t.appendChild(recordText);

recordText.value = text;