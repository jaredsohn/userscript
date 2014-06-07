// ==UserScript==
// @name           eRepublik Battlefield song
// @namespace      http://www.erepublik.com
// @include        http://www.erepublik.com/en/battlefield/*
// ==/UserScript==
elmHead = document.getElementsByTagName('body')[0];
elmStyle = document.createElement('div');
elmHead.appendChild(elmStyle);
elmStyle.innerHTML = '<object width="1" height="1"><param name="movie" value="http://www.youtube.com/v/_uUVX376U4M&amp;hl=en_US&amp;fs=1?rel=0&autoplay=1&loop=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/_uUVX376U4M&amp;hl=en_US&amp;fs=1?rel=0&autoplay=1&loop=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="1" height="1"></embed></object>';