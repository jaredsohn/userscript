// ==UserScript==
// @name           Eksi Duyuru Message Notifier
// @namespace      fader
// @description    Yeni mesaj goze sokturgaci
// @include        http://www.eksiduyuru.com/*
// @version        1.2
// ==/UserScript==

var path = window.location;
var regex = /mesajlar/i;

if(!regex.test(path))
{
  var m = document.getElementsByClassName('spsm-msg01');
  if(m.length > 0)
  {
    if(confirm('yeni mesaj gelmis gibi, mesaj sayfasina bak?'))
    {
    window.location = 'http://www.eksiduyuru.com/mesajlar/';
    }
  }
  else
    return;
}