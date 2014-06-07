// ==UserScript==
// @name           simpleYoutubeToMp3 Mod
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @description    convert youtube videos to mp3's - mod of possumboy's script
// @include        http://*.youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*&*
// @include        http://*.youtube.com/watch?v=*&*
// ==/UserScript==

GM_addStyle('#mp3_download_submit { margin: 5px 0; padding: 5px; border: 1px solid #ccc}');
GM_addStyle('#watch-video-quality-setting { height: auto !important}');
GM_addStyle('#mp3_download_submit {font: 12px \'arial\' bold; color: #1f85c1; text-align: center; background: transparent url(http://s.ytimg.com/yt/img/master-vfl69326.gif) repeat-x scroll 0 -410px; cursor: pointer; margin:top: 5px}');
GM_addStyle('#mp3_download_image { position: relative; vertical-align: middle; margin: -3px 2px 0 0}');
GM_addStyle('#mp3_download_submit:hover { text-decoration: underline}');
var b = document.getElementById('watch-video-quality-setting'), dlBox = document.createElement('form'),
	div = document.createElement("div"), text = document.createTextNode('Download audio as .mp3'),
	img = document.createElement('img'), input1 = document.createElement('input');
b.appendChild(dlBox);
dlBox.appendChild(input1);
dlBox.appendChild(div);
div.appendChild(img);
div.appendChild(text);
with(input1){type='hidden';value=window.location.href;name='URL'}with(img){src='data:image/gif,GIF89a%10%00%10%00%C4%00%00%85%8E%97%CA%CA%CA%88%9Bz%D3%D3%D3hhj%B9%BA%BA%C3%C3%C3%F3%F3%F3%DA%DA%DA%E4%E4%E4yz%7B%A9%AB%A6a%8DD%7D%AFZ%E9%E9%E9%ED%ED%ED%93%CD_%8E%CBU%B5%B5%B5%93%C8k%99%D7Z%FB%FB%FBXY%5D%F4%F6%F8qqq%F3WWaaa%9E%9E%9E%CE%CE%CE%F0%F0%F0c%8FE%FF%FF%FF!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%00%10%00%00%05%9F%E0\'%8E_%D4%90%24b%18%8B%E0%99%9E%20l%40!%1A%E4%DBx%E2u%01%22%5B%C2C%A4L%88%1E%CEE%11%FC%24*%1E%08%05%12aT8%1F%E6G%F2A%20%0E%9EF%83%D1%E1%601%A2E%17%1180%C8%06%F3%07%FDQ%0F%06%05I%A7%23%91%C8%E9vwf%83r%04%22%1B%07%7B%0F%8B%0F%0E%8E%8E%86%1F%1B%1D*%05%96%96%12%05%1C%0E%91%93w%03%1C%01%1F%13%06%19%06%09%1A%87%17%9F%A1%01%2B%06%05%1D%A9%1F%00%08%17%1D%8D%8F%0E%09%1D%01%16%22%00%0A%C2%18%18%04%C6%1A%C8%16%91(%CC%24!%00%3B';id='mp3_download_image'}with(div){id='mp3_download_submit';addEventListener('click',function(){document.getElementById('mp3_download_form').submit();text.textContent += ' (working...)'},false)}with(dlBox){action='http://www.youtubecatcher.com/videotomp3/index.php';method='post';id='mp3_download_form'}