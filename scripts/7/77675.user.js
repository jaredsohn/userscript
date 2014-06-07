// ==UserScript==
// @name        Download video from http://rutube.ru/
// @version     2.06
// @date        2010-08-03
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/rutube_ru.js
// @include     http://rutube.ru/*
// @include     http://*.rutube.ru/*
// ==/UserScript==

(function(){
  var hash = '#ujs_rutube_ru_helper';
  var msgPrefix = 'ujs_rutube_ru_helper_msg';
  var frameId = 'ujs_rutube_ru_helper_frame';
  
  if(location.href.search(/rutube\.ru\/stat\.html\?/i) != -1)
  {
    var rmLink = getRmLink(location.href);
    if(rmLink)
      location.href = rmLink;
  }
  
  var bFrame = false;
  try
  {
    if(window.parent != window)
    {
      bFrame = true;
    }
  }
  catch(e)
  {
    bFrame = true;
  }    

  function prevent(e)
  {
    e.preventDefault();
  }
  
  function postMessage(msg, doc, wnd)
  {
    window.postMessage ? wnd.postMessage(msg, '*') : doc.postMessage(msg, '*');
  }
  
  function addMessageEventListener(func)
  {
    if(typeof(window.opera.version) == 'function' && window.opera.version() >= 10)
    {
      window.addEventListener('message', func, false);
      return;
    }  
    
    document.addEventListener('message', func, false);
  }
  
  function getId()
  {
    var e = document.getElementById('addr');    
    if(e && e.value && e.value.search(/rutube\.ru/i) != -1)
    {
      var id = /\bv=(\w+)/i.exec(e.value);
      if(id && id.length > 1)
      {
        return id[1];
      }
    }
    
    var id = /\bv=(\w+)/i.exec(window.location.search);
    if(id && id.length > 1)
    {
      return id[1];
    }
    
    return '';
  }
  
  function getRmLink(href)
  {
    var link = href.match(/(?:\?|&)link=([^\s\&]+)/i);
    if(link && link.length > 0)
      return decodeURIComponent(link[1]);
      
    return null;  
  }
  
  function getLink()
  {
    var id = getId();
    if(!id)
      return '';     
    
    var link = 'http://video.rutube.ru/' + id + '.iflv?referer=' + escape(window.location.href);
    return link;
  }
  
  function getName()
  {
    var h1 = $$('h1[title]');
    if(h1)
      return modifyName(h1[0].innerText);

    var n = document.title;
    if(n)
    {
      n = n.replace(/\s*::\s*[^:]+$/i, '');
      if(n)
        return modifyName(n);
    }

    return '';
  }
  
  function modifyName(name)
  {
    var n = name;
    n = n.replace(/[\x2F\x5C\x3A\x7C]/g, '-');
    n = n.replace(/[\x2A\x3F]/g, '');
    n = n.replace(/\x22/g, '\'');
    n = n.replace(/\x3C/g, '(');
    n = n.replace(/\x3E/g, ')');
    n = n.replace(/(?:^\s+)|(?:\s+$)/g, '');
    return n;
  }
  
  function showLink(link, name)
  {
    box = document.getElementById('player');
    if(box)
      box = box.parentNode;
    else  
      box = document.body;

    ta = 'center';
    
    var size = name.length + 8;
    if(size > 64)
      size = 64;
    
    var d= document.createElement('div');
    d.setAttribute('style', 'display: block; text-align: ' + ta + ' !important; padding: 0 0 10px 0;', false);
    d.innerHTML = '<a href="' + link + '" style="font-size: x-large; text-decoration: none;">\u0421\u043a\u0430\u0447\u0430\u0442\u044c</a>' +
    ' &nbsp; <input type="text" size="' + size + '" value="' + name + '" style="font-size: medium;" onfocus="if(this.value && this.select){this.select()}">';
    box.insertBefore(d, box.firstChild);
  }  
  
  function createFrame(url)
  {
    var f = document.createElement('iframe');
    f.src = url + hash;
    f.id = frameId;
    f.width = 0;
    f.height = 0;
    f.frameBorder = 'no';
    f.scrolling = 'no';
    f.setAttribute('ujs_external_unblocked', '1', false);
    document.documentElement.appendChild(f);
  }
   
  function onLoad()
  {
    var id = getId();
    if(!id)
    {
      return;
    }
    
    createFrame('http://bl.rutube.ru/' + id + '.xml?schema=http' + hash);
  }
  
  if(!bFrame)
  {   
    addMessageEventListener(function(e){
      if(e.data && (e.data.indexOf(msgPrefix) == 0))
      { 
        var d = e.data.split('\n');
        if(d.length == 0)
        {
          return false;
        }      

        if(d[0] == msgPrefix)
        {
          var link;
          if(d.length > 1)
          {
            link = decodeURIComponent(d[1]);            
            if(link)
            {
              var n = getName();
              if(n)
              {
                n += '.flv';
              }
              showLink(link, n);
            }
          }
          
          var frame = document.getElementById(frameId);
          if(frame)      
          {
            frame.parentNode.removeChild(frame);
          }
        }
      }
    });
    
    if(typeof(window.opera.version) == 'function' && window.opera.version() >= 9)
      document.addEventListener('DOMContentLoaded', onLoad, false);  
    else
      document.addEventListener('load', onLoad, false);
      
    document.addEventListener('mousedown', function(e){
      var obj = e.target;
      if(obj && obj.tagName == 'A' && obj.href)
      {
        var rmLink = getRmLink(obj.href);
        if(rmLink)
          obj.href = rmLink;
      }
    }, false);
  }
  else if(location.hash.indexOf(hash) == 0)
  {
    window.opera.addEventListener('BeforeEventListener.DOMContentLoaded', prevent, false);
    window.opera.addEventListener('BeforeEventListener.load', prevent, false);
    window.opera.addEventListener('BeforeEventListener.message', prevent, false);

    var link = '';  
    var finalAddress = document.getElementsByTagName('finalAddress');
    if(finalAddress && finalAddress.length > 0)
    {
      if(finalAddress.item(0).firstChild)
        link = finalAddress.item(0).firstChild.nodeValue;
      else
        link = finalAddress.item(0).nodeValue;
    }
    
    var msg = msgPrefix + '\n' + encodeURIComponent(link);
    postMessage(msg, window.parent.document, window.parent);
  }
})();