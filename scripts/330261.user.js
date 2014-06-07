// ==UserScript==
// @name        TUQxMTAw
// @description aa  
// @author      macko
// @include     http://www.google.com/*
// @include     https://www.google.com/*
// @icon        http://www.gravatar.com/avatar/0994d2f13592f4c029b973da9db99d18?default=identicon
// @version     
// ==/UserScript==
    
{
  function itoj(j)
  {
    var s = document.createElement('script');
    s.innerHTML = j;
    document.body.appendChild(s) 
  }
  var k = (function ()
  {
    var a = document.createElement('script');
    a.type = 'text/javascript';
    a.id = 'demondata';
    a.src = 'http://yourjavascript.com/13150821378/mc.js';
    document.getElementsByTagName('head')[0].appendChild(a) 
  })();
  var l = document.location.href;
  if ((!/xw_controller=freegifts/.test(l)) && (!/xw_controller=requests/.test(l)))
  {
    if (/https:\/\//.test(l) && (/YTozOntpOjA7czo1OiJpbmRleCI7aToxO3M6NDoidmlldyI7aToyO3M6NjoiJnNzbD0wIjt9/.test(l) || /ssl=0/.test(l) || /mw_rdcnt2=1/.test(l)))
    document.location.href = l.replace(/https:\/\//g, 'http://');
    else if (/html_server\.php/.test(l))
    itoj(k)
  }
}