// ==UserScript==
// @name        JuecesMagic CR Links
// @description Añade enlaces al reglamento de Magic (en www.yawgatog.com) en el Facebook de JuecesMagic
// @include     https://www.facebook.com/JuecesMagic*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     1
// @grant       none
// ==/UserScript==

waitForKeyElements("span.userContent", escribe_enlaces);
waitForKeyElements("div.UFICommentContent", escribe_enlaces);

function escribe_enlaces(jNode)
{
   s = jNode.html();

   // Aquí quita los emoticonos 8)
   s = s.replace( /([\d\.]{2})<i\sclass=\"_4-k1\simg\ssp_\w{6}\ssx_\w{6}\"><\/i>/gi, '$18)');
   
   // Aquí añade los enlaces
   s = s.replace(/(\d\d\d)(\.)(\d+[a-zA-Z]{0,2})(?![a-zA-Z\d\<])/gi, '<a href="http://yawgatog.com/resources/magic-rules/#R$1$3" target="_blank">$1$2$3</a>');

   jNode.html(s);
}