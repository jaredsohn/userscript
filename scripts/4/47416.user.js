// ==UserScript==
// @name           Wikipedia Redirection
// @namespace      http://userscripts.org/users/45256
// @description    Redirect zh-cn to zh. 將錯誤的連結導向到正確的網址
// @include        http://*cn.wikipedia.org/*
// ==/UserScript==

div = document.createElement('div');
div.innerHTML = '<span style="font-size:60pt;color:black;">Redirecting...</span>';
div.id = 'redirect';
div.style.position='absolute';
//div.style.margin = 'auto';
div.style.top ='5%';
div.style.left='10%';
div.style.width='80%';
div.style.height='40%';
div.style.textAlign='center';
div.style.border='3px dashed black';
div.style.lineHeight='200px';
div.style.background='#e6e6e6';

document.body.appendChild(div);

pattern=/http:\/\/zh\-cn\./;
if (pattern.test(location.href))
    location.replace(location.href.replace('zh-cn', 'zh'));