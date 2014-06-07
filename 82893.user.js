// ==UserScript==
// @name           Youtube: Bypass age verification (basic)
// @namespace      tag:brainonfire.net,2010-08-03:youtube-bypass-age
// @description    Bypass YouTube's age verification requirement to watch marked videos. Loads comments below video.
// @include        http://www.youtube.com/verify_age?next_url=*
// @license        GPL
// @version        1.2
// ==/UserScript==


/** Run entire script inside page. From http://wiki.greasespot.net/Content_Scope_Runner */
if(typeof __PAGE_SCOPE_RUN__ == 'undefined') {
   (function page_scope_runner() {
      var script = document.createElement('script');
      script.setAttribute("type", "application/javascript");
      script.textContent = "(function() { var __PAGE_SCOPE_RUN__ = 'yes'; (" + page_scope_runner.caller.toString() + ")(); })();";
      document.documentElement.appendChild(script);
      document.documentElement.removeChild(script);
   })();
   return;
}

/* Retrieve decoded value for first instance of key in querystring of received URL. */
function qsFirst(key, str) {
   var finder = RegExp("[^#]+[?&]"+encodeURIComponent(key)+"=([^&$#]*)");
   var found = finder.exec(str);
   if(!found) return null;
   
   return decodeURIComponent(found[1]);
}


var buttonContainer, button, buttonContent;

function showVideo(ev) {
   buttonContainer.removeChild(button);
   document.getElementById('verify-age-thumb').style.display = 'none';
   document.getElementById('verify-age-details').style.display = 'none';
   
   var videoID = qsFirst('v', qsFirst('next_url', document.location));
   var su_videoID = encodeURIComponent(videoID);
   
   var vidHTML = ' \
<object width="425" height="355"> \
   <param name="movie" value="http://www.youtube.com/v/'+su_videoID+'&autoplay=0&loop=0&showinfo=1&volume=100&start=0&fs=1"></param> \
   <param name="allowscriptaccess" value="always"></param> \
   <param name="volume" value="100"></param> \
   <param name="wmode" value="transparent"></param> \
   <param name="allowFullScreen" value="true"></param> \
    \
   <embed src="http://www.youtube.com/v/'+su_videoID+'&autoplay=0&loop=0&showinfo=1&volume=100&start=0&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" wmode="transparent" allowFullScreen="true" width="425" height="355" volume="100"></embed> \
</object> \
   ';
   
   var commentsHTML = '<iframe id="injected-comments" src="/comment_servlet?all_comments=1&v='+su_videoID+'" width="500" height="1000" />';
   
   buttonContainer.innerHTML += vidHTML + commentsHTML;
}

function buildButton() {
   buttonContainer = document.getElementById('verify-age-actions');
   
   button = buttonContainer.appendChild(document.createElement('button'));
   button.setAttribute('type', 'button');
   button.setAttribute('class', 'yt-uix-button');
   button.setAttribute('style', 'display: block; margin: 0 auto;');
   
   buttonContent = button.appendChild(document.createElement('span'));
   buttonContent.setAttribute('class', 'yt-uix-button-content');
   buttonContent.appendChild(document.createTextNode('Watch here anyway!'));

   button.addEventListener('click', showVideo, false);
}

function useTitle() {
   document.title = document.getElementById('verify-age').getElementsByTagName('h2')[0].textContent.replace(/^\s+|\s+$/g,'') + ' | YouTube: Verify age';
}

try{useTitle();}catch(e){}
buildButton();
