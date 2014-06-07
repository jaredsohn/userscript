// ==UserScript==
// @name        Download video from http://video.google.com/
// @version     1.00
// @date        2008-03-23
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/video_google_com.js
// @include     http://video.google.com/videohosted*
// @include     http://*.video.google.com/videohosted*
// ==/UserScript==

(function(){
  var url = '';
  function isOpera9()
  {
    if(typeof(window.opera.version) == 'function' && window.opera.version() >= 9)
      return true;
    else
      return false;
  }
  
  window.opera.addEventListener('BeforeScript', function(e){
    var t = e.element.text;
    if(t && !e.element.getAttribute('src', false))
    {
      if(t.search(/var\s*flashobj\s*=/i) != -1)
      {
        var fo = t.match(/var\s*flashobj\s*=\s*[\x22\x27]([^\x22\x27]+)[\x22\x27]/i)
        if(fo && fo.length > 1 && fo[1].search(/videourl\\75/i) != -1)
        {
          var u = fo[1].match(/videourl\\75([^\\\s]+)/i);
          if(u && u.length > 1 && u[1].search(/^http/i) != -1)
          {
            url = decodeURIComponent(u[1]);
          }
        }
      }      
    }
  }, false);
  
  function onLoad()
  {
    var linkStyle = 'font-weight: normal; text-decoration: none;';
    var html = '', sep = '';
    if(url)
    {
      html += '<a href="' + url + '" style="' + linkStyle + '">flv</a>';
      sep = '&nbsp;|&nbsp;';
    }
    
    var id = [
      ['macdownloadlink', 'avi'],
      ['ipoddownloadlink', 'mp4'],
      ['pspdownloadlink', 'mp4']
    ];
    
    for(var i = 0; i < id.length; i++)
    {
      var e = document.getElementById(id[i][0]);
      if(e && e.href)
      {
        html += sep + '<a href="' + e.href + '" style="' + linkStyle + '">' + id[i][1] + '</a>';
        sep = '&nbsp;|&nbsp;';
      }
    }
    
    var panelId = 'ujs__google_video_helper';
    if(html)
    {
      var div = document.createElement('div');
      div.id = panelId;
      div.setAttribute('style', 'color: #000; background-color: #d5ddf3; border: 1px solid #3366cc; font-size: 14pt !important; padding: 5px 0; margin-bottom: 10px; text-align: center;', false);            
      div.innerHTML = 'Download:&nbsp;&nbsp;&nbsp;' + html;
      try
      {
        var d = window.parent.document;
        if(d && d.body && !d.getElementById(panelId))
        {
          d.body.insertBefore(div, d.body.firstChild);
        }  
      }
      catch(err)  
      {
        if(!document.getElementById(panelId))
        {
          document.body.insertBefore(div, document.body.firstChild);
          document.body.style.marginTop = '36px';
          div.style.marginTop = '-36px';
        }  
      }
    }    
  }
  
  if(isOpera9())
    document.addEventListener('DOMContentLoaded', onLoad, false);
  else
    document.addEventListener('load', onLoad, false);
})();
