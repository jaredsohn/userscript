// ==UserScript==
// @name           Twitter Loves Kohmi Hirose
// @namespace      http://www.rhathymia.net/
// @description    Replace Twitter logo by "ヒゥィッヒヒー" logo. 
// @include        http://twitter.com/*
// ==/UserScript==

(function () {
   var logo_img = document.getElementsByTagName('img')[1];
   if (logo_img) {
       logo_img.setAttribute('src','http://10.media.tumblr.com/EUHwj8khhq8ekxx9g5SCU0dio1_400.png');
       logo_img.setAttribute('width','160');
       logo_img.setAttribute('height','36');
   }

})();