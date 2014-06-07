// ==UserScript==
// @name        zaycev.net helper for Opera 9 - 10
// @version     2.01
// @date        2010-09-09
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/zaycev_net.js
// @include     http://zaycev.net/*
// @include     http://*.zaycev.net/*
// ==/UserScript==

(function(){
  // Settings
  
  // File extension that will be automatically download.
  // 0 - mp3, 1 - exe, 2 - rar
  downloadFormat = 0; // mp3
 
  // For those who have the "Cached Images" mode.
  var autoReloadCaptchaImage = false;
  
  // Comment width. Example: '740px'
  var commentWidth = '';
  
  var skipCaptcha = false;
  
  var autoStartDownloading = true;
  
  // /Settings
  ///////////////////////////////////////////////////////////////////
  
  var downloadFormFrameId = 'ujs_download_form_frame';
  var hostRegexp = new RegExp(location.hostname.replace(/\./, '\\.') + '\\/', 'i');
  var addStyleCount = 0;
  
  
  // Remove banners  
  window.opera.addEventListener('BeforeScript', function(e){
    var src = e.element.getAttribute('src', false);
    if(src)
    {
      if(src.search(/http:\/\//i) != -1 && src.search(hostRegexp) == -1)
      {
        e.preventDefault();
      }
    }
    else
    {
      var t = e.element.text;
      if(t.search(/document\.write\s*\(/) != -1 && t.search(/miniplayer|mini|\.mp3/i) == -1)
      {
        e.preventDefault();
      }  
    }

    removeFrames();
  }, false);
  
  function removeFrames()
  {
    var e = document.getElementsByTagName('iframe');
    for(var i = 0; i < e.length; i++)
    {
      var src = e[i].getAttribute('src', false);
      if(src)
      {
        if(src.search(/http:\/\//i) != -1 && src.search(hostRegexp) == -1)
        {
          e[i].parentNode.removeChild(e[i]);
        }
      }
    }
  }
  
  function addStyle(css)
  {
    if(!document || !document.body)
    {
      if(addStyleCount < 500)
      {
        setTimeout(addStyle, 25, css);
        addStyleCount++;
      }
      return;
    }
      
    var s = document.createElement('style');
    s.type = 'text/css';
    s.text = css;
    
    var head = document.getElementsByTagName('head');
    if(head.length > 0)
    {
      head = head[0];
    }  
    else
    {
      head = document.createElement('head');
      document.body.parentNode.insertBefore(head, document.body);
    }  
      
    head.appendChild(s); 
  }
  
  addStyle('#infobar,#ibp,#feedback-floater,a[href*="www.botva.ru"]{display:none !important;content:"" !important;}');
  // /Remove banners
  
  
  function refreshPage()
  {
    window.history.go(0);
  }  
  
  function showDownloadForm()
  {
    var re = null;
    switch(downloadFormat)
    {
      case 1:
        re = /\.exe\b/i;
        break;
        
      case 2:
        re = /\.rar\b/i;
        break;
        
      default:
        re = /\.mp3\b/i;
        break;
    }
    
    var a = document.getElementsByTagName('a');
    for(var i = a.length - 1; i >= 0; i--)
    {
      if(a[i].href && (a[i].href.search(/\/download\.php\?/i) != -1) && (a[i].href.search(re) != -1))
      {          
        var parent = null, p = a[i].parentNode;
        while(p)
        {
          if(p == document.body || p == document.documentElement)
            break;
            
          if(p.className.search(/box|unit-wunit-content/i) != -1)
          {
            parent = p;
          }
          
          p = p.parentNode;
        }
        
        if(parent)
        {
          var f = document.createElement('iframe');
          f.id = downloadFormFrameId;
          f.src = a[i].href;
          f.width = "100%"
          f.height = "300";
          f.frameborder = "no";
          f.scrolling = "no";
          f.setAttribute('style', 'border: none !important; display: block; margin-bottom: 10px;', false);
          parent.insertBefore(f, parent.firstChild);
          
          f.scrollIntoView(true);
          if(window.scrollBy)
            window.scrollBy(0, -80);
        }
        else
        {
          //a[i].click();
        }
        break;
      }
    }
  }  
  
  function getFormParams(f)
  {    
    var params = '', sep = '';
    for(var i = 0; i < f.elements.length; i++)
    {
      if(f.elements[i].name)
      {
        if(f.elements[i].tagName == 'INPUT' && f.elements[i].type == 'checkbox')
        {
          if(f.elements[i].checked)
          {
            params += sep + f.elements[i].name + '=on';
            sep = '&';
          }
        }
        else if(f.elements[i].tagName == 'INPUT' && f.elements[i].type == 'radio')
        {
          if(f.elements[i].checked)
          {
            params += sep + f.elements[i].name + '=' + encodeURIComponent(f.elements[i].value);
            sep = '&';
          }
        }
        else if(f.elements[i].name != 'ass' && f.elements[i].name != 'id')
        {
          params += sep + f.elements[i].name + '=';
          if(f.elements[i].value)
          {
            params += encodeURIComponent(f.elements[i].value);
          }          
          sep = '&';
        }      
      }    
    }
      
    var input = f.getElementsByTagName('input');  
    for(var i = 0; i < input.length; i++)
    {
      if(input[i].type == 'image' && input[i].name)
      {
        params += sep + input[i].name + '.x=0&' + input[i].name + '.y=0';
        sep = '&';
      }
    }
      
    return params;
  }
  
  function getDownloadLink(f)
  {
    if(f.ok)
    {
      f.ok.disabled = true;
      f.ok.value = '\u041f\u043e\u0434\u043e\u0436\u0434\u0438\u0442\u0435';
    }

    var url = '';
    /*if(f.action)
      url += f.action;
    else*/
      url += location.href;
      
    if(url.indexOf('?') == -1)
      url += '?' +getFormParams(f);
    else
      url += '&' +getFormParams(f);
      
    var xmlhttp = new XMLHttpRequest();          
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("User-Agent", navigator.userAgent);
    xmlhttp.setRequestHeader("Referer", location.href);
    xmlhttp.setRequestHeader("Cookie", document.cookie);
    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4)
      {        
        var link = this.responseText.match(/(?:url=|href=\x22)(http:\/\/dl\.zaycev\.net\/[^\x22\s]+)/i);
        if(link && link.length > 1)
        { 
          link = link[1];

          if(autoStartDownloading)  
          {
            top.location.href = link;
          }
          
          document.body.setAttribute('style', 'width: 100%; height: 100%;', false);
          var html = (
            '<table style="width:100%;height:100%;"><tr><td style="width:100%;height:100%;text-align:center;vertical-align:middle;">'
            +'<a href="' + link + '" target="_blank" style="font-size: 16pt; font-weight: bold;">\u0421\u043a\u0430\u0447\u0430\u0442\u044c</a>'
            +'</td></tr></table>'
          );            
          document.body.innerHTML = html;
        }
        else if(this.responseText.search(/\u043d\u0435\s*\u0432\u0435\u0440\u043d\u044b\u0439\s*\u043a\u043e\u0434/i) != -1)
        {
          var s = document.createElement('span');
          s.innerHTML = '\u0432\u044b \u0432\u0432\u0435\u043b\u0438 \u043d\u0435 \u0432\u0435\u0440\u043d\u044b\u0439 \u043a\u043e\u0434';
          alert(s.innerHTML);
          refreshPage();
        }        
        else
        {
          document.open();
          document.write(this.responseText);
        }        
      }
    };
    xmlhttp.send();
  }
  
  function reloadCaptcha()
  {
    if(!autoReloadCaptchaImage)
      return;

    var img = document.getElementsByTagName('img');
    for(var i = 0; i < img.length; i++)
    {      
      if(img[i].src && img[i].src.search(/\/captcha\/\d+\//i) != -1)
      {
        imgReloader.reload(img[i]);
        break;
      }
    }
  }

  function getCaptchaElement()
  {    
    for(var i = 0; i < document.forms.length; i++)
    {
      var e = document.forms[i].text_check;
      if(e && e.tagName == 'INPUT')
      {
        return e;
      }
    }
    
    return null;
  }
  
  // Image reloader
  var imgReloader = {
    remove: function(obj)
    {
      if(obj && obj.parentNode)
        obj.parentNode.removeChild(obj);
    },
    
    refresh: function(img)
    {
      if(opera.version >= 10)
        return;

      if(img.currentStyle.display != 'none')
      {
        var d = img.currentStyle.display;
        img.style.display = 'none';          
        setTimeout(function(){img.style.display = d;}, 100);
      }      
    },
    
    reload: function(img)
    {
      if(img.complete)
        return false;

      var e = document.createElement('object');
      e.data = img.src;
      e.onload = function(){
        imgReloader.remove(this);
        imgReloader.refresh(img);
      };
      document.documentElement.appendChild(e);
    
      var onload = function(){
        if(img.complete)
        {
          imgReloader.remove(e);
          imgReloader.refresh(img);
        }  
        else
          setTimeout(onload, 100);
      };
      
      setTimeout(onload, 100);
      setTimeout(function(){imgReloader.remove(e)}, 60000);
      return true;
    }
  };
  // /Image reloader
  
  function onLoad()
  {
    if(window.location.href.search(/\/pages\/\d+\/\d+\.\w/i) != -1)
    {
      showDownloadForm();
    }
    else if(window.location.href.search(/\/download\.php\?/i) != -1)
    {      
      var e = getCaptchaElement();
      if(e)
      {
        reloadCaptcha();
          
        if(e.focus)
          setTimeout(function(){e.focus()}, 1000);

        if(e.form)
        {
          if(skipCaptcha)
          {
            getDownloadLink(e.form);
          }
          else
            e.form.addEventListener('submit', function(){getDownloadLink(e.form)}, false);
        }      
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', onLoad, false);
})();