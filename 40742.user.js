// ==UserScript==
// @name        Rapidshare.com helper for Opera 8 - 9
// @version     1.23
// @date        2007-08-04
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/rapidshare_com.js
// @include http://*.rapidshare.com/*
// @include http://rapidshare.com/*
// ==/UserScript==

// By motive of Greasemonkey user script "Rapidshare Bundle":
// http://userscripts.org/scripts/show/5907

// Discussion: http://operafan.net/forum/index.php?topic=2831.0

// Other scripts:
// MEGAUPLOAD: http://www.puzzleclub.ru/files/megaupload_com.js
// DepositFiles.com: http://www.puzzleclub.ru/files/depositfiles_com.js
// FileFactory: http://www.puzzleclub.ru/files/filefactory_com.js

(function(){
  // For those who have the "Cached Images" mode.
  var autoReloadCaptchaImage = false;
  
  // Sound
  var bPlaySound = true;
  var soundSource = 'data:audio/midi;base64,TVRoZAAAAAYAAQACAPBNVHJrAAAAGwD/WAQEAhgIAP9RAwknwI8A/1EDB6EgAP8vAE1UcmsAAAAtAP8DBVN0YWZmAMANVpBNfx5IfyGATQAOSACBDpBNfxlIfx6ATQAOSAAA/y8A';
  // Repetition interval in milliseconds. 0 - disable repetition.
  var soundRepetitionInterval = 60000; // 1 minute; 

  var timerId = '';
  var soundTimerId = '';
  var captchaName = 'accesscode';
  var submitName = 'actionstring';
  
  var minWait = 0;
  
  var addStyle = function(css)
  {
    if(!document || !document.documentElement)
      return;
      
    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
		s.setAttribute('style', 'display:none !important;');			
		s.appendChild(document.createTextNode(css));
    document.documentElement.appendChild(s); 
  };

  var clickFreeButton = function()
  {
    var input = document.getElementsByTagName('input')
    for(var i in input)
    {
      if(input[i].type == 'submit' && input[i].value.toLowerCase() == 'free')
      {
        input[i].click();
        return true;
      }
    }
    
    return false;
  };
  
  var replaceButtonToLink = function()
  {
    if(window.c != undefined)
    {
      if(window.c <= 0)
        document.title = 'RS: ready';
      else
      {
        var d = window.c / 60;
        if(d)
        {
          d = d.toFixed(1);
          if(minWait != d) 
          {          
            minWait = d;        
            document.title = 'RS: ' + d + ' minutes';
          }
        }
      }
    }

    var form = document.forms['dl'];
    if(!form)
      return;
      
    var captcha = form.elements[captchaName];
    if(!captcha)
      return;
      
    var submit = form.elements[submitName];
    if(!submit)
      return;
      
    if(autoReloadCaptchaImage)
    {
      var img = document.getElementsByTagName('img');      
      for(var i = 0; i < img.length; i++)
      {
        if(!img[i].complete && img[i].src && img[i].src.indexOf('access') > 0)
        {
          reloadImage(img[i]);
          break;
        }
      }            
    }

    if(captcha.focus)
      captcha.focus();
      
    clearInterval(timerId);
    
    if(bPlaySound)
      playSound();
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      var code = captcha.value;          
      if(!code)
      {        
        alert('Please enter the captcha code.');
        return;
      }

      var link = document.createElement('a');
      link.href = form.action + "?actionstring=" + encodeURIComponent(submit.value) +
        "&accesscode=" + code;        
      link.innerText = submit.value;
      submit.outerHTML = link.outerHTML;
      
      clearInterval(soundTimerId);
      
    }, false);    
  };
  
  var refreshPage = function()
  {
    window.history.go(0);
  };
  
  var showWaitTime = function(minutes, obj)
  {    
    if(typeof(minutes) == 'number' &&  minutes <= 0)
    {
      setTimeout(refreshPage, 1000);
    }
    else
    {
      document.title = 'RS: ' + minutes.toString() + ' minutes';
      obj.innerHTML = obj.innerHTML.replace(/or wait (\d+) minute/i, 'Or wait ' + minutes + ' minute');
      setTimeout(showWaitTime, 60000, minutes - 1, obj);
    }
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
  }  
  
  var restoreImage = function(img){};
  if(typeof(opera.version) == 'function' && opera.version() >= 9.10)
  {
    var restoreImage = function(img)
    {      
      if(!img)
        return;
        
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
    };
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
      restoreImage(img);
    };
    document.documentElement.appendChild(f);
  };
  
  var modifyPage = function()
  {
    var css = (      
      'form[name="ul"] {display: none !important;}'
      +'table#premiumtable2 {display: none !important;}'
    );

    if(window.c != undefined || document.forms['dl'])
    {
      addStyle(css);
      timerId = setInterval(replaceButtonToLink, 1000);
    }
    else
    {    
      var p = document.getElementsByTagName('p');    
      var obj = null;
      var min;
      for(var i = 0; i < p.length; i++)
      {
        if(p[i].innerText)
        {
          if(p[i].innerText.indexOf('You have reached the download-limit') == 0)
          {
            obj = p[i];          
            min = p[i].innerText.match(/or wait (\d+) minute/i);
            break;
          }
          else if(p[i].innerText.match(/your ip-address[\d\.\s]*is already downloading a file/i))
          {
            addStyle(css);
            setTimeout(refreshPage, 60000);
            return;
          }
        }
      }

      if(min && min.length > 1)
      {
        min = parseInt(min[1]);
        if(isNaN(min))
          return;
        else
        {
          addStyle(css);
          showWaitTime(min, obj);
        }        
      }    
      else      
        return;
    }    
  }
  
  addStyle('div#header {display: none !important;}');
    
  if(typeof(opera.version) == 'function' && opera.version() >= 9)
  {
    document.addEventListener('DOMContentLoaded', function(e){      
      if(!clickFreeButton())
        modifyPage();        
    }, false);  
  }
  else
  {
    document.addEventListener('load', function(e){
      if(!clickFreeButton())
        modifyPage();
    }, false);
  }
})();
