// ==UserScript==
// @name           bravoerotica enhanced diaporama
// @namespace      none
// @description    Enhanced diaporama
// @include        http://www.bravoerotica.com/*
// @license      GPL version 2 or any later version; http://www.gnu.org/copyleft/gpl.html
// @grant none
// ==/UserScript==

if (location.href.lastIndexOf('.html') > 0)
{

      // Go back to the first page if we finished 
      if (document.getElementsByTagName('h1') && document.getElementsByTagName('h1')[0] && document.getElementsByTagName('h1')[0].innerHTML.indexOf('404') > -1)
        location.href=location.href.substring(0,location.href.lastIndexOf('/') + 1) + '1.html';
      
      // Remove header
      document.getElementsByClassName('pay')[0].parentNode.removeChild(document.getElementsByClassName('pay')[0]);
      // Next 3 lines makes pictures link to next one
     var ext = location.href.substring(location.href.lastIndexOf('/') + 1);
     var n = parseInt(ext.substring(0, ext.lastIndexOf('.html'))) + 1;
    document.getElementsByTagName('img')[0].parentNode.href= location.href.substring(0,location.href.lastIndexOf('/') + 1) + n + '.html';
    // Click else go to the next picture
    document.body.onclick= function(){location.href=location.href.substring(0,location.href.lastIndexOf('/') + 1) + n + '.html';}
    // Zoom out
    document.getElementsByTagName('img')[0].height = window.innerHeight;
    document.getElementsByTagName('img')[0].style.border = '0';
    // Zoom in if mouse inside picture
    document.getElementsByTagName('img')[0].onmouseover=function(evt){evt.target.removeAttribute('height');}
    document.getElementsByTagName('img')[0].onmouseout=function(evt){evt.target.height=window.innerHeight;}
    // Next functions are needed to save background color
      function createCookie(name,value,days) {
        if (days) {
          var date = new Date();
          date.setTime(date.getTime()+(days*24*60*60*1000));
          var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
      }

      function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
      }

      function eraseCookie(name) {
        createCookie(name,"",-1);
      }
      // Function to apply and save background color
     function saveBG(evt)
     {
        var elm = evt.target.parentNode;
        var color = elm.getAttribute('bgcolor');
        document.bgColor = color;
        createCookie('bgColor', color, 360);
     }
     // Replace existing function with the one saving the color
     var imgs=document.getElementsByTagName('img');
     for (var i = 1; i < imgs.length; i++)
      imgs[i].parentNode.onmouseover= saveBG;
     var color = readCookie('bgColor');
     if (color != null)
      document.bgColor = color;
}
else
{
  // Directly redirect to the first picture instead of the index
  var a = document.getElementsByTagName('a');
  for (var i = 0; i < a.length; i++)
    if (a[i].getAttribute('href') == '1.html')
    location.href = a[i].getAttribute('href');
}