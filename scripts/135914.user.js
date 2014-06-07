// ==UserScript==
// @name           Euro2012 antyspam
// @author         pan_sarin
// @description    Script for replacing euro2012 facebook content into not so annoying content
// @version        0.0.3
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @todo           user definied content ( links / images ) or more random dummy content from some rss 
// ==/UserScript==


var replace_spam = function(){
  var spans = document.body.getElementsByTagName('span');
  var my_regexp = /([Ee]uro|[Ss]muda|[Mm]ecz|[Pp]ol(sk[ia]|a[cy|ków])|[Kk]oko)/
  if (spans)
  {
    for (var i in spans)
    {
      if (spans[i].innerHTML && my_regexp.test(spans[i].innerHTML))
      {
        spans[i].innerHTML = 'Zostaw ten internet - nie znajdziesz tu nic mądrego';
      }
    }
  }
}

replace_spam();



 