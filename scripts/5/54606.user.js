// ==UserScript==
// @name           Navigate Webcomics with the Arrow Keys
// @namespace      www.integerzero.net
// @description    A script which allows you to navigate webcomics with the arrow keys.
// @include        http://www.gunnerkrigg.com/archive_page.php?comicID=*
// @include        http://questionablecontent.net/view.php?comic=*
// ==/UserScript==

function getParameter(name2) {

   var url = window.location.href;

   var paramsStart = url.indexOf("?");
   

   if(paramsStart != -1) {
      var paramString = url.substr(paramsStart + 1);
      var tokenStart = paramString.indexOf(name2);

      if(tokenStart != -1) {
         paramToEnd = paramString.substr(tokenStart + name2.length + 1);

         var delimiterPos = paramToEnd.indexOf("&");

         if(delimiterPos == -1) {

            return paramToEnd;
         }
         else {

            return paramToEnd.substr(0, delimiterPos);

         }

      }
   }
}

var comics = new Object;
comics['www.gunnerkrigg.com'] = Array("http://www.gunnerkrigg.com/archive_page.php?", "comicID");
comics['questionablecontent.net'] = Array("http://questionablecontent.net/view.php?", "comic");
//Add support for more webcomics here

var base = comics[location.href.substring(7,location.href.lastIndexOf('/'))][0];
var field = comics[location.href.substring(7,location.href.lastIndexOf('/'))][1];
var num = getParameter(field);


num = parseInt(num);

p = (num-1)+'';

n = (num+1)+'';


function handleArrowKeys(evt) {
   evt = (evt) ? evt : ((window.event) ? event : null);

   if (evt) {

      if (evt.keyCode == 37) {

         window.location = base+field+"="+p;
      }
      else {
         if (evt.keyCode == 39) {
            window.location = base+field+"="+n;

    		}
    	}
   }
}


window.addEventListener('keyup', handleArrowKeys, true);

document.onkeyup = handleArrowKeys;