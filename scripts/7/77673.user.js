// ==UserScript==
// @name        MusicFond helper for Opera 9 - 10
// @version     2.02
// @date        2009-08-02
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/musicfond_com.js
// @include     http://musicfond.com/*
// ==/UserScript==

(function(){
  ///////////////////////////////////////////////////////////////////
  // SETTINGS

  var autoGetDownloadLinks = false;
  var getExactMP3Links = false;

  ///////////////////////////////////////////////////////////////////
  // DO NOT EDIT
  
  var btn_id_prefix = 'ujs_mfh_btn_';
  var info_id_prefix = 'ujs_mfh_info_';
  
  function showLinks(links, id)
  {
    var obj = document.getElementById(id);
    if(!obj)
    {
      return;
    }
    
    obj.innerHTML = '<!-- empty -->';
    
    var success = false;
    for(var i in links)
    {
      if(links[i])
      {
        success = true;
        var a = document.createElement('a');
        a.href = links[i];
        a.innerHTML = '&nbsp;[' + i + ']';
        a.style.margin = '0 5px;';
        obj.appendChild(a);
      }
    }
    
    if(!success)
    {
      obj.innerHTML = '\u043e\u0448\u0438\u0431\u043a\u0430'; // error     
    }
  }
  
  
  
  window.ujs_mfh_showLinks = showLinks;
    
  
  
  function busy(id)
  {
    var parent = document.getElementById(id);
    if(!parent)
    {
      return;
    }

    parent.innerHTML = '';
    var e = document.createElement('span');
    e = parent.appendChild(e);
    e.setAttribute('style', 'font-family: "courier new", "lucida console", monospace;', false);
      
    var i = 0;
    var text = ['&nbsp;&nbsp;&nbsp;','.&nbsp;&nbsp;','..&nbsp;','...','..&nbsp;','.&nbsp;&nbsp;'];
    
    var setText = function()
    {
      if(i >= text.length)
      {
        i = 0;
      }
      e.innerHTML = text[i];
      i++;
      setTimeout(setText, 200);
    }
    
    setText();
  }
  
  
  
  function getDownloadLink(url, box_id, callback)
  {
    var link_id = url.match(/\?id=(\d+)/i);
    if(!link_id || link_id.length < 2)
    {
      callback(null, box_id);
      return;
    }  

    busy(box_id);
      
    var request3 = function(r){
      if(r.responseText)
      {
        var res = {};        
        r.responseText.replace(/href\s*=\s*[\x22\x27]([^\x22\x27]+)[\x22\x27]/ig, function(s, p){
          if(p)
          {
            var ext = p.match(/\.(mp3|zip|doc)$/i);
            if(ext && ext.length > 1)
            {
              res[ext[1]] = p;
            }
          }
          return s;
        });
        
        if(getExactMP3Links && res['mp3'])
        {
          sendRequest(res['mp3'], function(r2){
            if(r2.getResponseHeader('Location'))
            {
              res['mp3'] = r2.getResponseHeader('Location');
            }
            
            callback(res, box_id);
            return;
          }, 'HEAD', window.location.href);
          
          return;
        }
        else
        {          
          callback(res, box_id);
          return;
        }
      }
      
      callback(null, box_id);
    };
    
    var request2 = function(r){
      if(r.responseText)
      {
        var getLinksCount = 0;
        
        var getLinksFunc = function(){
        
          setTimeout(function(){
          
            sendRequest('http://musicfond.com/music/track/ajax/download/link/draw/', function(r){
              if(!r.responseText && getLinksCount < 2)
              {
                getLinksCount++;
                setTimeout(getLinksFunc, 3000);
                return;
              }
              
              request3(r);
            }, '', url, 'id=' + link_id[1], r.getResponseHeader('cookie'), '', [['X-Requested-With', 'XMLHttpRequest'], ['X-Prototype-Version', '1.6.0.3']]);
            
          }, 1000);   
          
        };

        getLinksFunc();        
        return;
      }
      
      callback(null, box_id);
    };
    
    var request1 = function(r){
      if(r.responseText)
      {
        var ticket = '';        
        r.responseText.replace(/\<input([^\>]+)/ig, function(s, a){
          if(a && a.search(/name=[\"\']ticket[\"\']/i) != -1)
          {
            var t = a.match(/value=[\"\']([^\s\"\']+)/i);
            if(t && t.length > 1)            
              ticket = t[1];
          }
          
          return s;
        });
      
        if(ticket)
        {
          sendRequest(url, request2, '', url, 'ticket=' + ticket, r.getResponseHeader('cookie'));
          return;
        }
      }
      
      callback(null, box_id);
    };
    
    sendRequest(url, request1, '', location.href/*, '', document.cookie/*.replace(/mf_id=[a-f\d]+/i)*/);
  }  
  


  window.ujs_mfh_getDownloadLink = getDownloadLink;
  
  
  
  window.ujs_mf_showAllLinks = function(){
    count = 0;
    
    function objClick(){
      var obj = document.getElementById(btn_id_prefix + count.toString());
      if(obj)
      {
        obj.click();
        count++;
        setTimeout(objClick, 1000);
      }
    };
    
    objClick();
  };
  
  
  
  function createDownloadButtons()
  {
    var links = {};
    count = 0;
    var a = document.getElementsByTagName('a');    
    for(var i = a.length - 1; i >= 0; i--)
    {
      if(a[i].href && a[i].href.search(/musicfond\.com\/music\/track\/\-\/([^\/]+\/)+\?id=\d+/i) != -1)
      {
        if(!links[a[i].href])
        {
          links[a[i].href] = 1;
          var id1 = btn_id_prefix + count.toString();
          var id2 = info_id_prefix + count.toString();
          count++;

          var btn = document.createElement('a');
          btn.id = id1;
          btn.href = 'javascript:window.ujs_mfh_getDownloadLink(\'' + a[i].href + '\', \'' + id2 + '\', window.ujs_mfh_showLinks);';
          btn.innerHTML = '&rsaquo;&rsaquo;&rsaquo;';
          btn.setAttribute('style', 'margin-left: 20px; text-decoration: none; font-family: tahoma, verdana, helvetica, sans-serif; font-weight: normal; font-size: 11pt; line-height: 0.9; padding: 0;', false);
          a[i].parentNode.appendChild(btn);

          var info = document.createElement('span');
          info.id = id2;
          info.innerHTML = '   ';
          info.setAttribute('style', 'margin-left: 10px;', false);
          a[i].parentNode.appendChild(info);
        }  
      }
    }
    
    if(autoGetDownloadLinks)
    {
      window.ujs_mf_showAllLinks();
    }
  }
  
  
  
  function autoClickButton()
  {
    var input = document.getElementsByTagName('input');
    for(var i = input.length - 1; i >= 0; i--)
    {
      if(input[i].type == 'submit' && input[i].className == 'DownloadBtn')
      {
        input[i].click();
        break;
      }
    }
  }
  
  
  function onLoad()
  {
    createDownloadButtons();
    autoClickButton();
  }
  
  
  function sendRequest(url, callback, method, referer, post, cookie, user_agent, header)
  {
    var req = new XMLHttpRequest();
    if (!req)
      return;

    method = method ? method : ((post) ? 'POST' : 'GET');
    user_agent = user_agent ? user_agent : navigator.userAgent;
    
    req.open(method, url, true);
    
    req.setRequestHeader('User-Agent', user_agent);
    if(referer)
    {
      req.setRequestHeader('Referer', referer);
    }
    if(cookie)
    {
      req.setRequestHeader('Cookie', cookie);
    }
    if (post)
    {
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      req.setRequestHeader("Content-Length", post.length);
    }
    if(header)
    {
      for(var i = 0; i < header.length; i++)
      {
        req.setRequestHeader(header[i][0], header[i][1]);
      }
    }
    
    req.onreadystatechange = function ()
    {
      if (req.readyState != 4)
        return;
      
      callback(req);
    };
    
    if (req.readyState == 4)
    {
      return;
    }  
    
    if(post)
      req.send(post);
    else
      req.send();
  }



  function getRandomString()
  {
    var r = '';
    var str = '01234567890abcdef';
    for(var i = 0; i < 32; i++)
    {
      r += str.charAt(Math.round(Math.random() * 15));
    }
    
    return r;
  }  
  
  
  if(typeof(window.opera.version) == 'function' && window.opera.version() >= 9)
    document.addEventListener('DOMContentLoaded', onLoad, false);  
  else
    document.addEventListener('load', onLoad, false);
})();