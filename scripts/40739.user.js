// ==UserScript==
// @name        iFolder helper for Opera 8, 9
// @version     1.16
// @date        2007-09-11
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/ifolder.js
// @exclude *
// @include http://ifolder.ru/*
// @include http://*.ifolder.ru/*
// ==/UserScript==

(function(){
  // For those who have the "Cached Images" mode.
  var autoReloadCaptchaImage = true;

  var autoClickAdvertisingLink = true;

  var hash = '#userjs';  
  var timerId = null;
  
  window.opera.addEventListener('BeforeScript', function(e){
      var t = e.element.text;
      if(t)
      {
        if(t.search(/<iframe|ad\.text\.tbn\.ru|ad\.tbn\.ru|ad\.\w+\.tbn\.ru/i) != -1)
          e.preventDefault();      
      }
    }, false);

  var prevent = function(e) {
    e.preventDefault();
  };  
  
  var addStyle = function()
  {
    if(!document || !document.documentElement)
    {
      timerId = setInterval(addStyle, 300);
      return;
    }
      
    clearInterval(timerId);  
      
    var css = (
      '.side_ban * {display: none !important;}'      
      +'img[alt="TBN Text"] {display: none !important;}'
    );
    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
		s.setAttribute('style', 'display:none !important;');			
		s.appendChild(document.createTextNode(css));
    document.documentElement.appendChild(s);    
  };
  
  window.opera.addEventListener('BeforeExternalScript', prevent ,false);
  
  if(window.location.href.search(/http:\/\/ints\.ifolder\.ru\/ints\/\?(?:[\w-]+\.)?ifolder.ru/i) != -1 ||
    window.location.href.indexOf('http://ints.ifolder.ru/ints/sponsor/') != -1)
  {
    window.opera.addEventListener('BeforeScript', prevent, false);
  }
  
  if(window.location.href.indexOf('http://ints.ifolder.ru/ints/sponsor/') != -1)
  {
    var ind = window.location.href.indexOf('session=');
    if(ind > 0)
    {
      var href = window.location.href.substr(ind);
      ind = href.indexOf('&');
      if(ind > 0);
        href = href.substring(0, ind);
        
      href = 'http://ints.ifolder.ru/ints/frame/?' + href + hash;
      window.location.href = href;
    }
  }
  else if(window.location.href.indexOf('http://ints.ifolder.ru/ints/frame/') != -1 &&
    window.location.hash == hash)
  {    
    window.opera.defineMagicFunction(
      'UpdateTimer',
      function() {
        window.delay--;        
        if(window.delay <= 0)
        {
          if(window.Stop)
            window.Stop();
            
          window.location.reload();
        }
        else if(window.Start)
        {        
          window.Start();
        }
      }
    );
  }
  
  var reloadImage = function(img)
  {
    var f = document.createElement('iframe');
    f.src = img.src;
    f.width = 0;
    f.height = 0;
    f.frameBorder = 'no';
    f.scrolling = 'no';
    f.onload = function(){
      this.parentNode.removeChild(this);
      if(typeof(opera.version) == 'function' && opera.version() >= 9.10)
      {
        var refreshImg = function(i, d)
        {
          i.style.display = d;
        };
        
        if(img.currentStyle.display != 'none')
        {
          var display = img.currentStyle.display;
          img.style.display = 'none';          
          setTimeout(refreshImg, 10, img, display);
        }      
      }     
    };
    document.documentElement.appendChild(f);
  };
  
  var onLoad = function(e) 
  {
    clearInterval(timerId);
    if(window.location.href.search(/http:\/\/ints\.ifolder\.ru\/ints\/\?(?:[\w-]+\.)?ifolder.ru/i) != -1)  
    { 
      var a = document.getElementsByTagName('a');
      for(var i = 0; i < a.length; i++)
      {
        var href = a[i].getAttribute('href', false);
        if(href)
        {
          var ind = href.indexOf('http%3A%2F%2Fints.ifolder.ru%2Fints%2Fsponsor%2F');
          if(ind >= 0)
          {          
            href = href.substr(ind);
            href = unescape(href);
            window.location = href;
            break;
          }                
        }
      }     
    }
    else if(window.location.href.search(/http:\/\/(?:[\w-]+\.)?ifolder\.ru\/\d+/i) != -1)
    {
      if(autoClickAdvertisingLink)
      {
        var a = document.getElementsByTagName('a');
        for(var i = 0; i < a.length; i++)
        {
          if(a[i].href && a[i].href.search(/http:\/\/ints\.ifolder\.ru\/ints\/\?(?:[\w-]+\.)?ifolder.ru/i) != -1)
          {
            window.location = a[i].href;
            return;          
          }
        }
      }      
    }
    
    var code = document.getElementById('confirmed_number');
    if(code && code.tagName == 'INPUT' && code.focus)
    {
      setTimeout(function(){code.focus();}, 1000);
    }
    
    if(autoReloadCaptchaImage)
    {      
      var captcha = document.getElementById('humanyckeck');
      if(captcha)
        reloadImage(captcha);
    }
  };
  
  addStyle();
  
  if(typeof(opera.version) == 'function' && opera.version() >= 9)  
    document.addEventListener('DOMContentLoaded', onLoad, false);
  else  
    document.addEventListener('load', onLoad, false);
  
})();