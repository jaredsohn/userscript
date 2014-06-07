// ==UserScript==
// @name        Download video from http://www.eztakes.com/
// @version     1.01
// @date        2008-02-04
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/eztakes_com_movie.js
// @include     http://*eztakes.com/store/streaming/watch.jsp*
// ==/UserScript==

(function(){
  var getMovieName = function(name)
  {
    var n = name;
    if(n)
    {
      n = n.replace(/[\x2F\x5C\x3A\x7C]/g, '-');
      n = n.replace(/[\x2A\x3F]/g, '');
      n = n.replace(/\x22/g, '\'');
      n = n.replace(/\x3C/g, '(');
      n = n.replace(/\x3E/g, ')');
      n = n.replace(/(?:^\s+)|(?:\s+$)/g, '');
    }
    
    if(n)
    {
      n += '.flv';
    }
    
    return n;
  };
  
  var createAnchor = function()
  {    
    var e = document.getElementById('flvplayer');
    if(!e)
      return;    
    
    var url = e.getAttribute('flashvars', false);
    if(url)
    {
      url = url.replace(/config=/i, '');
    }

    if(!url)
      return;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Referer", window.location.href);
    xmlhttp.setRequestHeader("Cookie", document.cookie);    
    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4)
      {
        if(this.responseText)
        {          
          var link = '', name = '';
          this.responseText.replace(/<player_settings[^>]+>/ig, function(s){            
            if(s.search(/name=\x22flvpath\x22/i) != -1)
            {
              var l = s.match(/value=\x22([^\x22\s]+)\x22/i);
              if(l && l.length > 1 && l[1].search(/\/movie\//i) != -1)
              {
                link = l[1];
              }
            }
            return s;
          });  
          
          var name = document.title.replace(/\s*-\s*free streaming movie/i, '');          

          if(!link)
            return;

          var parent = document.getElementById('flashcontent2');
          if(!parent)
          {
            parent = document.body;
          }
          
          name = getMovieName(name);
          var div = document.createElement('div');
          div.setAttribute('style', 'display: block; font-size: 16pt; padding: 10px 0; text-align: center;', false);
          div.innerHTML = '<a href="' + link + '" style="text-decoration: underline;">Download</a> ' + name;
          parent.insertBefore(div, parent.firstChild);
        }        
      }
    };
    xmlhttp.send();
  };
  
  
  window.opera.addEventListener('AfterScript', function(e){
    var t = e.element.text;
    if(t.search(/new\s+swfobject/i) != -1)
    {
      createAnchor();
    }
  }, false);
})();