// ==UserScript==
// @name           Kara-+
// @include        http://www.karachan.org/*
// @author         Danone_e
// @version        RPK_0.1.7.1
// @description    Antysmalec + autocaptcha + anty 1x1 youtube 
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace('Homoseksualne prawiczki i miłośnicy pszczół', 'Random')
//document.body.innerHTML = document.body.innerHTML.replace('/B/REIVIK', 'Random')
document.title = document.title.replace('Homoseksualne prawiczki i miłośnicy pszczół', 'Random') 
//document.title = document.title.replace('/B/REIVIK', 'Random') 
document.body.innerHTML = document.body.innerHTML.replace('background-image:url(data:image/gif;base64,', '<--//')
document.body.innerHTML = document.body.innerHTML.replace('/css/images/empty_captcha.png"', 'http://www.karachan.org/captcha.php?" ')    
document.body.innerHTML = document.body.innerHTML.replace('height="1"', 'height="200"')    
document.body.innerHTML = document.body.innerHTML.replace('width="1"', 'width="200"')
document.body.innerHTML = document.body.innerHTML.replace('?autoplay=1"', '?autoplay=0"')
document.body.innerHTML = document.body.innerHTML.replace('"/sek/"', '"http://sek.karachan.org/"')
document.body.innerHTML = document.body.innerHTML.replace('>b</a>', '>b</a> / <a href="/&#1101;&#1083;&#1080;&#1090;&#1072;/" title="ruski">ruski</a>')
