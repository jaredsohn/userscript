// ==UserScript==
// @name           Facebook Photo
// @namespace      ZhsHero
// @description    Shows the full sized photo picture when you hover over photo images, in search results or thumbnails on photos or walls.
// @include        http://*.myyearbook.com/*
// ==/UserScript==

  
  
       
   
   
   
      function pastUrl(aElement) {
   
      var url = aElement.href;
   
      var textBox = document.getElementById('urlText');
 
      textBox.value = url;
  
      }
 
    
  
  
      <a href='http://www.google.com' onmouseover='pastUrl(this)'>Google</a> <br>
 
      <a href='http://www.google.com/search?hl=en&q=anchor&btnG=Search&meta=&aq=f&oq=' onmouseover='pastUrl(this)'>Google with params</a><br>
 
      <a href='http://www.yahoo.com' onmouseover='pastUrl(this)'>Yahoo</a><br>

       
 
      <input type='text' id='urlText' style='width:400px;'/>
  
      </body>
  
      </html>











