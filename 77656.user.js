// ==UserScript==
// @name        drivec.ru link extractor for Opera 8 - 9
// @version     1.01
// @date        2008-02-26
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/drivec_ru.js
// @include     http://drivec.ru/?lid=*
// ==/UserScript==

(function(){

  window.opera.addEventListener('BeforeScript', function(e){
    var t = e.element.text, src = e.element.getAttribute('src', false);;
    if(t && !src)
    {
      if(t.search(/\.src\s*=\s*[\x22\x27]http:\/\/(\w+\.)?drivec\.ru\/get\.php\?/i) != -1)
      {
        var s = t.match(/\.src\s*=\s*[\x22\x27]([^\x22\x27]+)[\x22\x27]/i);
        if(s && s.length > 1)
        {
          setTimeout(getLink, 19000, s[1]);
        }  
      }  
    }
    
    if(src.search(/drivec\.ru\/get\.php\?/i) != -1)
    {
      e.element.text = e.element.text.replace(/innerhtml\s*=\s*[\x22\x27]<a/i, function(s, p){
        return s.replace(/\<a/i, '<a id="ujs_link"');
      });
      e.element.text += '; var link = document.getElementById("ujs_link"); if(link){link.click();}';
    }
  }, false);
  
  function getLink(url)
  {
    var xmlhttp = new XMLHttpRequest();      
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Content-Type", "text/javascript");
    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4)
      {
        if(this.responseText)
        {
          var link = this.responseText.match(/href\s*=\s*[\x22\x27]([^\x22\x27]+)[\x22\x27]/i);
          if(link && link.length > 1)
            window.location.href = link[1];
        }
        else
          setTimeout(getLink, 2000, url);
      }
    };
    xmlhttp.send();
  }
  
})();