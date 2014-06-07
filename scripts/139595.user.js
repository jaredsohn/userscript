// ==UserScript==
// @name        Boater Exam Skipper
// @namespace   williamstamper.com
// @include     *boaterexam*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
//
window.setInterval(
  function(){
    if($('.hlNext').first().hasClass('enabled')&& !$('.hlExamCenter').first().hasClass('enabled')){
      var url = window.location.href;
      url = url.split('=');
      url[url.length-1]++;
      url = url.join('=');
      window.location = url;
    }
  }
,1000);
