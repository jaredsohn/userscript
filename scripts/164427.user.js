// ==UserScript==
//
// @name IEU Old Homepage
// @author Firat Akandere
// @description Izmir University of Economics old homepage view
// @include /^https?://www\.ieu\.edu\.tr/(tr|en)/?/
// @version 1.0
//
// ==/UserScript==

var toReplace = 'class="duyurular"';
var replaceWith ='id="duyurular" class="duyurular"';
document.body.innerHTML = document.body.innerHTML.replace(toReplace, replaceWith);

var news = document.getElementById('haberler');
var announcements = document.getElementById('duyurular');
var temp = document.createElement('div');
var slider = document.getElementById('featured');

slider.parentNode.removeChild(slider);
news.parentNode.insertBefore(temp, news);
announcements.parentNode.insertBefore(news, announcements);
temp.parentNode.insertBefore(announcements, temp);
temp.parentNode.removeChild(temp);