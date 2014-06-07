// ==UserScript==
// @name        Download video from liveinternet.ru
// @version     1.10
// @date        2007-10-19
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/liveinternet_ru_video.js
// @include     http://*liveinternet.ru/*
// ==/UserScript==

(function(){
  try
  {
    if(window.parent != window)
    {
      return;
    }
  }
  catch(e)
  {
    return;
  }

  var insertLink = null, onLoad = null;
  var getLink = function(id, parent)
  {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", 'http://' + window.location.host + '/playlist.php?a=get_v&id=' + id + '&rand=' + (new Date()).getTime(), true);
    xmlhttp.setRequestHeader("Referer", window.location.href);
    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4)
      {
        if(this.responseXML)
        {
          var d = this.responseXML;
          var v = d.getElementsByTagName('videofile');          
          if(v && v.length > 0)
          {
            v = v.item(0);
            var link = v.attributes.getNamedItem('FLVPath').nodeValue;            
            if(link && insertLink && typeof(insertLink) == 'function')
            {
              insertLink(link, parent);
            }
          }
        }
      }      
    };
    xmlhttp.send();
  };
  
  if(window.location.href.search(/liveinternet\.ru\/flash\/zum_flv_player\.swf\?id=/i) != -1)
  {
    var id = /id=(\d+)/i.exec(window.location.search);
    if(!id || id.length < 2)
      return;
    
    id = id[1];
    getLink(id, insertLink, null)
    
    insertLink = function(link, parent)
    {
      var d = document.createElement('div');            
      d.setAttribute('style', 'color: #000; display: block; font-size: 16pt; padding: 10px 0; text-align: center;', false);
      d.innerHTML = '<a href="' + link + '" style="text-decoration: underline;">Download</a>'
      document.documentElement.insertBefore(d, document.documentElement.firstChild);
    };
  
    onLoad = function()
    {
      if(document.body)
      {
        document.body.style.background = '#009933';
      }
      
      var e = document.getElementsByTagName('embed');
      if(e && e.length > 0)
      {
        e[0].setAttribute('width', '400', false);
        e[0].setAttribute('height', '420', false);
        e[0].setAttribute('style', 'display: block; margin: 0 auto;', false);
      }
    };
  }
  else
  {
    if(window.location.hostname.indexOf('liveinternet.ru') == -1)
    {
      var checkPage = function()
      {
        var l = document.getElementsByTagName('link');
        for(var i = 0; i < l.length; i++)
        {
          var rel = l[i].getAttribute('rel', false);
          var href = l[i].getAttribute('href', false);
          if(rel == 'openid.server' && href == 'http://www.liveinternet.ru/openid.php')
            return true;
        }
        return false;
      };
      if(!checkPage())
        return;
    }
    
    insertLink = function(link, parent)
    {
      var d = document.createElement('div');            
      d.setAttribute('style', 'color: #000; display: block; font-size: 16pt; padding: 10px 0;', false);
      d.innerHTML = '<a href="' + link + '" style="text-decoration: underline;">Download</a>'
      parent.insertBefore(d, parent.firstChild);
    };
    
    onLoad = function()
    {
      var e = document.getElementsByTagName('embed');
      for(var i = 0; i < e.length; i++)
      {
        var src = e[i].getAttribute('src', false);
        if(src)
        {
          if(src.search(/\/flash\/zum_flv_player\.swf\?id=/i) != -1)
          {
            var id = /\?id=(\d+)/i.exec(src);
            if(id && id.length > 1)
            {
              getLink(id[1], e[i].parentNode.parentNode);
            }
          }
          else if(src.search(/\/flash\/zum_flv_player\.swf/i) != -1)
          {
            var fv = e[i].getAttribute('flashvars', false);
            if(fv)
            {
              var id = /id=(\d+)/i.exec(fv);              
              if(id && id.length > 1)
              {
                var parent =  e[i].parentNode;
                while(parent)
                {
                  if(parent.tagName == 'DIV' || parent.tagName == 'BODY' || parent.tagName == 'HTML')
                    break;
                    
                  parent = parent.parentNode;  
                }
                getLink(id[1], parent);
              }
            }
          }
        }
      }
    };
  }

  if(onLoad)
  {  
    if(typeof(window.opera.version) == 'function' && window.opera.version() >= 9)
      document.addEventListener('DOMContentLoaded', onLoad, false);  
    else
      document.addEventListener('load', onLoad, false);
  }
})();
