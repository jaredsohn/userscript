if (document.URL.indexOf('youtube.com/watch') > -1) { 
  var video_id = document.URL.split('v=')[1]; 
  var ampersandPosition = video_id.indexOf('&'); 
  if (ampersandPosition != -1) { 
     video_id = video_id.substring(0, ampersandPosition); 
  } 
  window.location = 'http://toogl.es/#/view/' + video_id; 
}

// ==UserScript==
// @name            Toogles Redirect
// @description     Toogles bookmarklet stuffed into a greasemonkey script.
// @include         https://www.youtube.com/watch*
// @include         http://www.youtube.com/watch*
// @include         https://youtube.com/watch*
// @include         http://youtube.com/watch*
// ==/UserScript==