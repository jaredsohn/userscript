// ==UserScript==
// @name        FileFactory helper for Opera 8 - 9
// @version     1.11
// @date        2007-08-04
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/filefactory_com.js
// @include     http://filefactory.com/*
// @include     http://*.filefactory.com/*
// @include     http://mediamgr.ugo.com*/*
// ==/UserScript==

// Discussion: http://operafan.net/forum/index.php?topic=2831.0

// Other scripts:
// Rapidshare.com: http://www.puzzleclub.ru/files/rapidshare_com.js
// MEGAUPLOAD: http://www.puzzleclub.ru/files/megaupload_com.js
// DepositFiles.com: http://www.puzzleclub.ru/files/depositfiles_com.js

(function(){

  var bPlaySound = true;
  var soundSource = 'data:audio/midi;base64,TVRoZAAAAAYAAQACAPBNVHJrAAAAGwD/WAQEAhgIAP9RAwknwI8A/1EDB6EgAP8vAE1UcmsAAAAtAP8DBVN0YWZmAMANVpBNfx5IfyGATQAOSACBDpBNfxlIfx6ATQAOSAAA/y8A';
  // Repetition interval in milliseconds. 0 - disable repetition.
  var soundRepetitionInterval = 60000; // 1 minute; 
  var soundTimerId = '';
  
  if(window.location.hostname == 'mediamgr.ugo.com')
  {    
    window.stop();
    return;
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
  
  var prevent = function(e) {
    e.preventDefault();
  };
  
  if(!bFrame)
  {
    window.opera.addEventListener('BeforeExternalScript', function (e) {      
      var src = e.element.getAttribute('src', false);
      if(src.indexOf('http://pagead2.googlesyndication.com') != -1)
        e.preventDefault();
      else if(src.indexOf('http://mediamgr.ugo.com') != -1)
        e.preventDefault();
      else if(src.indexOf('http://www.statcounter.com') != -1)
        e.preventDefault();
      else if(src.indexOf('http://amch.questionmarket.com') != -1)
          e.preventDefault();
      else if(src.indexOf('http://content.dl-rms.com') != -1)
          e.preventDefault();

      removeFrames();    
    }, false);
    
    window.opera.addEventListener('BeforeScript', function(e){
      var t = e.element.text;
      if(t.search(/setTimeout/) != -1)
        e.preventDefault();      

      removeFrames();    
    }, false);
    
    var removeFrames = function()
    {
      var f = document.getElementsByTagName('iframe');
      for(var i = 0; i < f.length; i++)
      {
        var src = f[i].getAttribute('src', false);
        if(!src || (src.indexOf('http://') == 0 && src.indexOf('filefactory.com/') == -1))
          f[i].parentNode.removeChild(f[i]);
      }
    };
    
    var refreshPage = function()
    {
      window.history.go(0);
    };
    
    var modifyPage = function()
    {     
      var obj = document.getElementById('basicLink');
      if(obj && obj.tagName == 'A' && obj.href)
      {
        window.location.href = obj.href;
      }
      else
      {
        obj = document.getElementById('left_content');
        if(obj)
        {
          var div = obj.getElementsByTagName('div');
          for(var i = 0; i < div.length; i++)
          {
            if(div[i].className == 'error')
            {
              setTimeout(refreshPage, 60000);
              return;
            }
          }
        }
      }        
    };
    
    var onLoad = function()
    {
      removeFrames();
      modifyPage();
    };
    
    var count = 0;
    var addStyle = function(css)
    {
      if(!document || !document.documentElement)
      {
        if(count < 500)
        {
          setTimeout(addStyle, 25, css);
          count++;
        }
        return;
      }
        
      var s = document.createElement('style');
      s.setAttribute('type', 'text/css');
      s.setAttribute('style', 'display:none !important;');			
      s.appendChild(document.createTextNode(css));
      document.documentElement.appendChild(s); 
    };
    
    var css = 'div#widead, div#right_content, div#header img {display: none !important;}';
    if(typeof(opera.version) == 'function' && opera.version() >= 9)
      css += ' iframe[src*="ugo.com"], img[src*="ugo.com"] {display: none !important;}';
    else
      css += ' iframe[width="775"], iframe[height="600"] {display: none !important;}';
      
    addStyle(css);    
    
    if(typeof(opera.version) == 'function' && opera.version() >= 9)
      document.addEventListener('DOMContentLoaded', onLoad, false);  
    else
      document.addEventListener('load', onLoad, false);
  }
  else if(window.location.href.indexOf('http://www.filefactory.com/check/?f=') == 0)
  {
    function playSound()
    {
      var f = document.createElement('IFRAME');
      f.src = soundSource;
      f.width = 0;
      f.height = 0;
      f.frameBorder = 'no';
      f.scrolling = 'no';    
      document.documentElement.appendChild(f);
      
      var i = 0;
      var soundLoop = function()
      { 
        var s = soundSource + '#' + i;
        f.setAttribute('src', s, false);
        i++;
      };
      
      if(soundRepetitionInterval > 0)
        soundTimerId = setInterval(soundLoop, soundRepetitionInterval);
    };
    
    var onLoad = function()
    {
      var captcha = document.getElementById('captcha');
      if(captcha && captcha.tagName == 'INPUT' && captcha.focus)
        captcha.focus();
      
      if(bPlaySound && document.forms.length > 0)      
        playSound();      
    };
    
    if(typeof(opera.version) == 'function' && opera.version() >= 9)
      document.addEventListener('DOMContentLoaded', onLoad, false);  
    else
      document.addEventListener('load', onLoad, false);
  } 
})();
