// ==UserScript==
// @name           FurAffinity Custom Mood
// @namespace      http://celestialmechanics.net/
// @include        http://www.furaffinity.net/controls/profile/
// ==/UserScript==

s = document.getElementsByName('mood')[0];
news = document.createElement('input');
news.name = 'mood';
news.className = 'textbox';
news.type = 'text';
news.value = s.value;
s.parentNode.insertBefore(news, s);
s.parentNode.removeChild(s);
