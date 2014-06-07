// ==UserScript==
// @name        iFolder remote uploader for Opera 8 - 9
// @version     2.01
// @date        2008-02-26
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/ifolder_remote_uploader.js
//
// @include     http://ifolder.ru/remote_upload/*
// @include     http://*.ifolder.ru/remote_upload/*
// @include     http://*ifolder.ru/file_exchange/*
// @include     http://ifolder.ru/folders_explorer*
// @include     http://*.ifolder.ru/folders_explorer*
// 
// @include     http://filearchiv.ru/remote_upload/*
// @include     http://*.filearchiv.ru/remote_upload/*
// @include     http://filearchiv.ru/folders_explorer*
// @include     http://*.filearchiv.ru/folders_explorer*
//
// @include     http://files.ariom.ru/remote_upload/*
// @include     http://*.files.ariom.ru/remote_upload/*
// @include     http://files.ariom.ru/folders_explorer*
// @include     http://*.files.ariom.ru/folders_explorer*
// ==/UserScript==

(function(){  
  var cancelTimerCount = 5;  
  var cancelButtonValue = '\u041e\u0442\u043c\u0435\u043d\u0430';

  var bPlaySound = true;
  var soundSource = 'data:audio/midi;base64,TVRoZAAAAAYAAQACAPBNVHJrAAAAGwD/WAQEAhgIAP9RAwknwI8A/1EDB6EgAP8vAE1UcmsAAAAtAP8DBVN0YWZmAMANVpBNfx5IfyGATQAOSACBDpBNfxlIfx6ATQAOSAAA/y8A';
  // Repetition interval in milliseconds. 0 - disable repetition.
  var soundRepetitionInterval = 60000; // 1 minute; 
  var soundTimerId = '';  
  
  var cookieName = 'rs2if_url';

  var setCookie = function(name, value, expires, path, domain)
  {
    var curCookie = name + "=" + escape(value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "");
	
    if ((name + "=" + escape(value)).length <= 4000)
      document.cookie = curCookie;
  };

  var getCookie = function(name)
  {
    var prefix = name + "=";
    var cookieStartIndex = document.cookie.indexOf(prefix);
    if (cookieStartIndex == -1)
      return null;
		
    var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
    if (cookieEndIndex == -1)
      cookieEndIndex = document.cookie.length;
		
    var len = prefix.length;
		
    return unescape(document.cookie.substring(cookieStartIndex + len, cookieEndIndex));
  };

  deleteCookie = function(name, path, domain)
  {
    setCookie(name, '', '', path, domain);
  };
  
  var refreshPage = function()
  {
    window.history.go(0);
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
  
  if(bFrame)
  {
    function playSound()
    {
      if(!bPlaySound)
        return;

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
    
    var getRapidshareCaptcha = function()
    {
      if(document.forms.length > 0)
      {
        var c = document.forms[0].accesscode;
        if(c)
          return c;
      }
      
      return null;
    };
    
    
    var wait = function(seconds)
    {
      if(seconds < -1)
      {
        if(document.forms.length > 0)
        {
          var captcha = getRapidshareCaptcha();
          if(captcha && captcha.value.length == 4)
          {
            var submit = document.getElementById('downloadSubmit');
            if(!submit)
            {
              submit = document.forms[0].actionstring;
            }
            
            if(submit && submit.tagName == 'INPUT' && submit.type == 'submit')            
              submit.click();
            else
              document.forms[0].submit();
          }          
        }
        return;
      }
      
      setTimeout(wait, 1000, seconds - 1);
    };
    
    var onLoad = function()
    {
      var host = 'ifolder.ru';
      var h = window.location.hash;
      if(h && h.indexOf('host=') != -1)
      {
        var i = h.indexOf('host=');
        h = h.substring(i + 5);
        host = h;
      }

      var a = document.getElementsByTagName('a');
      for(var i = 0; i < a.length; i++)
      {
        if(a[i].href && a[i].href.toLowerCase().indexOf(host + '/remote_upload') != -1)
        {
          a[i].target = '_top';
          setTimeout(function(){a[i].click();}, 3000);
          return;
        }
      }

      if(document.title.toLowerCase().indexOf('error') != -1)
      {
        var a = document.createElement('a');
        a.href = 'http://' + host + '/remote_upload/';
        a.target = '_top';
        a.innerHTML = '&nbsp;';
        a = document.documentElement.appendChild(a);
        setTimeout(function(){a.click();}, 3000);
        return;
      }
      
      if(document.getElementById('rapida_site_form'))
      {
        addStyle('div#rapida_form {display: block !important;}');
        
        var captcha = getRapidshareCaptcha();
        if(captcha && captcha.focus)
        {
          setTimeout(function(){captcha.focus(); captcha.onkeypress = function(){clearInterval(soundTimerId);};}, 1000);
        }
        
        if(window.c)
        {
          wait(window.c);
        }

        var img = document.getElementsByTagName('img');
        for(var i = 0; i < img.length; i++)
        {
          reloadImage(img[i]);
        }
      }
      
      deleteCookie(cookieName, '/', host);
      playSound();
    };    
    
    if(typeof(window.opera.version) == 'function' && window.opera.version() >= 9)
      document.addEventListener('DOMContentLoaded', onLoad, false);  
    else
      document.addEventListener('load', onLoad, false);

    return;
  }
  
  
  
  window.opera.addEventListener('BeforeExternalScript', function (e){      
    var src = e.element.getAttribute('src', false);
    if(src)
    {
      if(src.search(/http:\/\/testsbox\.ru\//i) != -1)
        e.preventDefault();      
    }    
  }, false);
  
  window.opera.addEventListener('BeforeScript', function(e){
    var t = e.element.text, src = e.element.getAttribute('src', false);
    if(t && !src)
    {
      if(t.search(/adriver\.ru|liveinternet\.ru|tbn\.ru|adbn\.ru|bannerid|bannertext/i) != -1)
        e.preventDefault();      
    }
    
    if(src.search(/\/xloader\.js/i) != -1)  
    {
      e.element.text = e.element.text.replace(/(sr\.target\.innerhtml\s*=\s*sr\.content;)/i, '$1 setTimeout(function(){window.ujs_prolong();}, 1000)');
    }
  }, false);
  
  if(typeof(window.opera.version) == 'function' && window.opera.version() >= 9)
  {
    addStyle('img[src*="rambler.ru/"], img[src*="top.list.ru/"], img[src*="tns-counter.ru/"], img[src*="holm.ru/"], noindex {display: none;}');
  }
  
  var bAutoSubmit = false;
  var autoSubmitForm = function(submit, mode)
  {
    if(bAutoSubmit)
    {
      return;
    }
    bAutoSubmit = true;

    var count = cancelTimerCount;
    var timer = '';
    
    var d = document.createElement('div');
    d.setAttribute('style', 'display: block; text-align: center; padding: 5px 0;', false);    
          
    var b = document.createElement('input');
    b.type = 'button';
    b.value = cancelButtonValue + ' ' + count.toString();
    b.setAttribute('align', 'center', false);
    b.onclick = function(){
      clearTimeout(timer);
      if(mode == 0)
      {
        deleteCookie(cookieName, '/', window.location.hostname);
        onLoad();
      }  
    };
    d.appendChild(b);

    if(submit.form)
      submit.form.parentNode.appendChild(d);
    else
      submit.parentNode.parentNode.parentNode.appendChild(d);
      
          
    var wait = function()
    {
      count--;
      if(count < 1)
      {
        b.style.display = 'none';
        submit.click();
        return;
      }
      
      b.value = cancelButtonValue + ' ' + count.toString();
      timer = setTimeout(wait, 1000);            
    };
    
    timer = setTimeout(wait, 1000);
  };
  
  var prolong = function()
  {
    var id1 = 'ujs_prolong_form_', id2 = 'ujs_prolong_all_btn';
    
    if(!document.getElementById(id1 + '0'))
    {
      var count = 0;
      var a = document.getElementsByTagName('a');
      for(var i = 0; i < a.length; i++)
      {
        if(a[i].href && a[i].href.search(/http:\/\/[^\/]+\/control\//i) != -1)
        {
          var target = 'ujs_prolong_' + count.toString();
          
          if(!document.getElementById(target))
          {
            var fr = document.createElement('iframe');
            fr.id = target;
            fr.name = target;
            fr.width = 0;
            fr.height = 0;
            fr.frameborder = 'no';
            fr.scrolling = 'no';
            fr.setAttribute('style', 'display: none;', false);
            document.documentElement.appendChild(fr);
          }
        
          var f = document.createElement('form');   
          f.id = id1 + count.toString();
          f.action = a[i].href;
          f.method = 'post';
          f.name = 'form_prolong';
          f.target = target;
          f.setAttribute('style', 'display: block; margin: 0;', false);
          
          var s = document.createElement('input');
          s.name = 'prolong';
          s.type = 'submit';        
          s.value = '\u043f\u0440\u043e\u0434\u043b\u0438\u0442\u044c';
          s.className = 'button';          
          s.setAttribute('ujs_prolong', '1', false);
          f.setAttribute('style', 'margin: 10px 0 0 0;', false);
          f.appendChild(s);
          a[i].parentNode.appendChild(f);
          
          count++;
        }
      }
    }

    if(!document.getElementById(id2))
    {
      var parent = null, before = null;
      with(document)  
      {
        before = getElementById('delete_files_action') ? getElementById('delete_files_action') : getElementById('move_files_action');
      }
      
      if(!before)
      {
        parent = document.files ? document.files : document.getElementById('files_div');
        if(!parent)
          parent = document.body;
      }    
      
      var b = document.createElement('input');
      b.type = 'button';
      b.id = id2;
      b.value = '\u041f\u0440\u043e\u0434\u043b\u0438\u0442\u044c \u0432\u0441\u0435 \u0444\u0430\u0439\u043b\u044b';
      b.className = 'button2';
      b.setAttribute('style', 'width: auto;', false);
      b.onclick = function(){
        var b = document.getElementsByTagName('input');
        for(var i = 0; i < b.length; i++)
        {
          if(b[i].getAttribute('ujs_prolong'))
          {
            b[i].click();
          }
        }
      };
      
      if(before)
        before.parentNode.insertBefore(b, before);
      else if(parent)
        parent.appendChild(b);
      else
        document.body.appendChild(b);
      }  
  };
  
  window.ujs_prolong = prolong;

  var onLoad = function()
  {
    if(window.location.href.search(/http:\/\/[^\/]+\/folders_explorer/i) != -1)
    {
      prolong();
      return;
    }
    
    if(document.form1 && document.form1.confirm_queue)
    {
      deleteCookie(cookieName, '/', window.location.hostname);
      autoSubmitForm(document.form1.confirm_queue, 1);
      return;
    }

    if(document.title && document.title.toLowerCase().indexOf('error') != -1)
    {
      refreshPage();
      return;
    };
    
    if(!document.form1 || !document.form1.remote_url || !document.form1.add_queue)
    {
      var bFrame = false;
      
      var ifr = document.getElementsByTagName('iframe');
      for(var i = 0; i < ifr.length; i++)
      {
        var src = ifr[i].getAttribute('src', false);
        if(src && src.search(/http:\/\/[^\/]+\/file_exchange\//i) != -1)
        {
          ifr[i].setAttribute('src', src + '#host=' + window.location.hostname, false);
          bFrame = true;
          break;
        }
      }
      
      if(!bFrame)
      {
        deleteCookie(cookieName, '/', window.location.hostname);        
        return;
      }
    }

    var url = getCookie(cookieName);
    if(url)
    {
      var remote_url = document.getElementById('remote_url');
      if(remote_url)
      {
        remote_url.value = url;
        var add_queue = document.getElementById('add_queue');
        if(add_queue)
        {
          autoSubmitForm(add_queue, 0);
          return;
        }
      }
    }
    
    var f = document.getElementById('form1');
    if(f)
    {
      f.addEventListener('submit', function(e){
        var remote_url = document.getElementById('remote_url');
        if(remote_url)
        {
          remote_url = remote_url.value;
          if(remote_url)
          {
            setCookie(cookieName, remote_url, '', '/', window.location.hostname);
          }
        }
      }, false);
      return;
    }
    
    var d = document.getElementsByTagName('div');
    for(var i = 0; i < d.length; i++)
    {
      if(d[i].className && d[i].className == 'sys_msg')
      {
        setTimeout(refreshPage, 7000);
        break;
      }
    }
  };
  
  if(typeof(window.opera.version) == 'function' && window.opera.version() >= 9)
    document.addEventListener('DOMContentLoaded', onLoad, false);  
  else
    document.addEventListener('load', onLoad, false);

})();