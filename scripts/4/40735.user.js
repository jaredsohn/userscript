// ==UserScript==
// @name        DepositFiles.com helper for Opera 8 - 9
// @version     1.15
// @date        2007-08-14
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/depositfiles_com.js
// @include     http://depositfiles.com/files/*
// @include     http://depositfiles.com/*/files/*
// @include     http://*depositfiles.com/*
// ==/UserScript==

// Discussion: http://operafan.net/forum/index.php?topic=2831.0

// Other scripts:
// Rapidshare.com: http://www.puzzleclub.ru/files/rapidshare_com.js
// MEGAUPLOAD: http://www.puzzleclub.ru/files/megaupload_com.js
// FileFactory: http://www.puzzleclub.ru/files/filefactory_com.js 

(function(){
  // For those who have the "Cached Images" mode.
  var autoReloadCaptchaImage = false;
  // Delay before closing the page in milliseconds
  var autoClosePageDelay = 500;

  var bPlaySound = true;
  var soundSource = 'data:audio/midi;base64,TVRoZAAAAAYAAQACAPBNVHJrAAAAGwD/WAQEAhgIAP9RAwknwI8A/1EDB6EgAP8vAE1UcmsAAAAtAP8DBVN0YWZmAMANVpBNfx5IfyGATQAOSACBDpBNfxlIfx6ATQAOSAAA/y8A';
  // Repetition interval in milliseconds. 0 - disable repetition.
  var soundRepetitionInterval = 60000; // 1 minute;
  var soundTimerId = '';

  window.opera.addEventListener('BeforeScript', function(e){
    if(e.element.text && e.element.text.indexOf('window.open(popunder_url') != -1)
      e.preventDefault();
  }, false);

  var refreshPage = function()
  {
    window.history.go(0);
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

  var onReady = function()
  {
    document.title = 'DF: ready';
    if(bPlaySound)
      playSound();

    var btn = document.getElementById('dwn_link');
    if(btn)
    {
      //var timer = soundTimerId;
      btn.onMouseUp = clearInterval(soundTimerId);
    }
  };

  var onLoad = function()
  {  
    window.is_popup_showed = true;
    
    if(window.location.href.search(/http:\/\/depositfiles\.com\/files\/\d+/i) != -1)
    {
      var html = document.getElementsByTagName('html');
      if(html && html.length > 0)
      {
        html = html[0];
        if(html.getAttribute('dir', false) == 'ltr' && html.hasAttribute('lang'))
        {
          var dig = /http:\/\/depositfiles\.com\/files\/(\d+)/i.exec(window.location.href);
          if(dig && dig.length > 1)
          {
            dig = dig[1];       
            var re = '\\\/\\w+\\\/files\\\/' + dig + '$';
            re = new RegExp(re, 'i');            
         
            var a = document.getElementsByTagName('a');
            for(var i = 0; i < a.length; i++)
            {
              var href = a[i].getAttribute('href', false);
              if(href.search(re) != -1)
              {
                window.location.href = a[i].href;
                return;
              }
            }
          }
        }
      }
    }

    var f = document.getElementById('gateway_form');
    if(f && f.action && f.action.indexOf('http://depositfiles.com/') == 0)
    {      
      f.submit();
      setTimeout(function(){window.close();}, autoClosePageDelay);
    }
    else if(document.getElementById('download_url'))
    {      
      var d = document.getElementById('download_url');
      if(d)
        d.style.display = '';
        
      d = document.getElementById('download_mirrors'); 
      if(d)
        d.style.display = '';  

      d = document.getElementById('img_code_block');
      if(d)
        d.style.display = '';
        
      var imgCode = document.getElementById('img_code');
      if(imgCode && imgCode.tagName == 'INPUT' && imgCode.focus)
        imgCode.focus();

      if(autoReloadCaptchaImage)
      {
        var img = d.getElementsByTagName('img');
        if(img && img.length > 0 && !img[0].complete && img[0].src)
          reloadImage(img[0]);
      }

      var time = 0;
      var showTime = function()
      {
        var d = document.getElementById('instead_img_code_block');
        if(d && d.style.display != 'none')
        {
          onReady();
          return;
        }

        var e = document.getElementById('download_waiter_remain');
        if(e)
        {
          var t = e.innerText;
          if(t)
          {
            t = parseFloat(t);
            if(!isNaN(t))
            {
              t = t.toFixed(0);
              if(t != time)
              {
                time = t;
                if(time <= 0)
                {
                  onReady();
                  return;
                }
                else
                  document.title = 'DF: ' + t;
              }
            }
          }
        }
        else
        {
          e = document.getElementById('download_waiter');
          if(e && e.style.display == 'none')
          {
            onReady();
            return;
          }
        }

        setTimeout(showTime, 100);
      }

      setTimeout(showTime, 100);
    }
    else
    {
      var d = document.getElementById('download_file_info_block');
      if(d && d.innerText.search('From yours IP addresses already') != -1)
      {
        setTimeout(refreshPage, 60000);
        return;
      }
    }
  };

  if(typeof(opera.version) == 'function' && opera.version() >= 9)
    document.addEventListener('DOMContentLoaded', onLoad, false);
  else
    document.addEventListener('load', onLoad, false);
})();
