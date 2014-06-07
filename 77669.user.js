// ==UserScript==
// @name        Download video from http://loadup.ru/
// @version     1.00
// @date        2007-12-04
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/loadup_ru.js
// @include     http://loadup.ru/*
// @include     http://*.loadup.ru/*
// ==/UserScript==

(function(){
  var getDescription = function()
  {
    var e = document.getElementsByTagName('td');
    for(var i = 0; i < e.length; i++)
    {
      if(e[i].className == 'title')
      {
        var n = e[i].innerText;
        n = n.replace(/[\x2F\x5C\x3A\x7C]/g, '-');
        n = n.replace(/[\x2A\x3F]/g, '');
        n = n.replace(/\x22/g, '\'');
        n = n.replace(/\x3C/g, '(');
        n = n.replace(/\x3E/g, ')');
        n = n.replace(/(?:^\s+)|(?:\s+$)/g, '');
        return n;
      }
    }
  };
  
  var showLink = function(url)
  {
    if(!url)
      return;
      
    var name = getDescription();
    if(name)
      name += '.flv';
      
    var d = document.createElement('div');
    d.setAttribute('style', 'color: #339933; background-color: #edfceb; border: 1px solid #3ed322; padding: 5px 0; text-align: center; ', false);
    d.innerHTML = '<a href="' + url + '" style="color: #339933; font-size: 125%; font-weight: bold;">Download</a>&nbsp;&nbsp; ' + name;
    document.body.insertBefore(d, document.body.firstChild);
  };
  
  var getUrl = function(id)
  {
    var post = 'devid=LoadupFlashPlayer&after_adv=0&before_adv=1&frame_url=0&video_url=1&ticket=' + id;
    var x = new XMLHttpRequest();
    x.open("POST", 'http://loadup.ru/video/view/url/', true);
    x.setRequestHeader("User-Agent", navigator.userAgent);
    x.setRequestHeader("Host", window.location.host);
    x.setRequestHeader("Referer", window.location.href);
    x.setRequestHeader("Content-Length", post.length);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.onreadystatechange = function() {
      if(this.readyState == 4)
      {
        var url = this.responseText.match(/vidurl=([^&\s]+)/i);
        if(url && url.length > 1)
        {
          showLink(url[1]);
        }
      }  
    };
    x.send(post);
  };
  
  var onLoad = function()
  {
    var e = document.getElementsByTagName('embed');
    for(var i = 0; i < e.length; i++)
    {
      var flashvars = e[i].getAttribute('flashvars', false);
      if(flashvars)
      {
        var id = flashvars.match(/file=(v\w+)/i);
        if(id && id.length > 1)
        {
          getUrl(id[1]);
        }
      }
    }
  };
  
  if(typeof(window.opera.version) == 'function' && window.opera.version() >= 9)
    document.addEventListener('DOMContentLoaded', onLoad, false);  
  else
    document.addEventListener('load', onLoad, false);
  
})();
