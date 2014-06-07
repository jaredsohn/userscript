// ==UserScript==
// @name        MEGAUPLOAD helper for Opera 8 - 9
// @version     1.10
// @date        2007-08-06
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/megaupload_com.js
// @include     http://www.megaupload.com/*
// @include     http://*.megaupload.com/*
// ==/UserScript==

// Discussion: http://operafan.net/forum/index.php?topic=2831.0

// Other scripts:
// Rapidshare.com: http://www.puzzleclub.ru/files/rapidshare_com.js
// DepositFiles.com: http://www.puzzleclub.ru/files/depositfiles_com.js
// FileFactory: http://www.puzzleclub.ru/files/filefactory_com.js
 

(function(){

  // For those who have the "Cached Images" mode.
  var autoReloadCaptchaImage = false;
  
  var bPlaySound = true;
  var soundSource = 'data:audio/midi;base64,TVRoZAAAAAYAAQACAPBNVHJrAAAAGwD/WAQEAhgIAP9RAwknwI8A/1EDB6EgAP8vAE1UcmsAAAAtAP8DBVN0YWZmAMANVpBNfx5IfyGATQAOSACBDpBNfxlIfx6ATQAOSAAA/y8A';
  // Repetition interval in milliseconds. 0 - disable repetition.
  var soundRepetitionInterval = 60000; // 1 minute;
  var soundTimerId = '';

  window.opera.addEventListener('BeforeScript', function(e){    
    if(e.element.text)
    {
      if(e.element.text.search(/topbannerswf|bottombannerswf|topswf|rightunitswf|extreme-dm\.com/i) != -1) 
        e.preventDefault();
    }
  }, false);
  
  var counterName = '';
  
  window.opera.addEventListener('AfterScript', function(e){
    if(e.element.text)
    {
      if(e.element.text.search(/function countdown()/i) != -1)
      {
        window.popup = function(){return 0;};
        window.popup2 = function(){return 0;};
        window.popup3 = function(){return 0;};
        
        var v = /x(\d+)=\d+;/gi.exec(e.element.text);
        if(v && v.length > 1)
        {
          v = 'x' + v[1];
          counterName = v;
          showTime();
        }
      }
    }  
  }, false);
 
  window.opera.addEventListener('BeforeExternalScript', function (e) {      
    var src = e.element.getAttribute('src', false);
    if(src.search(/http:\/\/\w+\.adbrite\.com\//i) != -1)
      e.preventDefault();
  }, false);

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
  
  var css = 'iframe, #mu4 {display: none !important;}';
  if(typeof(opera.version) == 'function' && opera.version() >= 9)
  {
    css += ' img[src="http://www.megaupload.com/gui2/spacer.gif"] {display: none !important;}';
  }
  
  addStyle(css);
  
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
  
  var onReady = function()
  {
    document.title = 'MU: ready';
    if(bPlaySound)
      playSound();

    var btn = document.getElementById('dlbutton');    
    if(btn)
    {
      btn = btn.firstChild;
      if(btn && btn.tagName == 'A')
      {        
        btn.addEventListener('mouseup', function(e){
          clearInterval(soundTimerId);
        }, false);
      }
    }
  };
  
  var time = undefined;  
  var showTime = function()
  {
    var c = undefined;
    if(counterName)
    {
      eval('c=' + counterName);
    }
    
    if(time != c)
      time = c;
      
    if(time != undefined)  
    {      
      if(time <= 0)  
      {
        onReady();
        return;
      }
      
      document.title = 'MU: ' + time.toString();
    }
    else
    {
      var btn = document.getElementById('dlbutton');    
      if(btn)
      {
        btn = btn.firstChild;
        if(btn && btn.tagName == 'A')
        {
          onReady();
          return;
        }
      }      
    }
    
    setTimeout(showTime, 100);
  };
  
  var onLoad = function(e)
  {
    var f = document.getElementById('captchafrm');
    if(f)
    {
      var text = document.getElementById('imagestring');
      if(text && text.tagName == 'INPUT' && text.focus)
        text.focus();
        
      if(autoReloadCaptchaImage)
      {
        var img = document.getElementsByTagName('img');
        for(var i = 0; i < img.length; i++)
        {
          var src = img[i].getAttribute('src', false);
          if(src && src.indexOf('capgen.php?') != -1)
          {
            reloadImage(img[i]);
            break;
          }
        }
      }
    }
  };
  
  if(typeof(opera.version) == 'function' && opera.version() >= 9)
    document.addEventListener('DOMContentLoaded', onLoad, false);
  else
    document.addEventListener('load', onLoad, false);

})();