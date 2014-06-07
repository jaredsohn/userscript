// ==UserScript==
// @name          Ikariam YouTube link embedder
// @version       1.1
// @description	  Ima so l33t h4x0r
// @include       http://*.ikariam.tld/index.php?*view=diplomacyAdvisorAlly*topicId=*
// @include       http://*.ikariam.tld/index.php?*topicId=*view=diplomacyAdvisorAlly*
// ==/UserScript==
document.body.innerHTML=document.body.innerHTML.replace("[yt]http://www.youtube.com/watch?v=",'###embed src="http://www.youtube.com/v/');
document.body.innerHTML=document.body.innerHTML.replace('[/yt]',  '?version=3&amp;hl=hu_HU&amp;rel=0" type="application/x-shockwave-flash" width="500" height="286" allowscriptaccess="always" allowfullscreen="true" />');
document.body.innerHTML=document.body.innerHTML.replace('###', '<');
