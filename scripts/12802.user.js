// ==UserScript==
// @name           hdbHideStickiedTorrents
// @description    allows to hide those random old torrents sticking on top of the list
// @include        https://hdbits.org/browse.php
// @include        http://hdbits.org/browse.php
// @include        https://hdbits.org/browse.php?update_last_browse=1
// @include        http://hdbits.org/browse.php?update_last_browse=1
// ==/UserScript==


/*************  CONFIG  ***************/

maxNumberOfOldTorrentsToHide = 2;

daysTillExpiration = 7;

linkColor = "maroon";


/***  NO NEED TO TOUCH STUFF BELOW  ***/


rows = document.getElementsByTagName('tr');

for(j=0;j<rows.length;j++){
   if(rows[j].style.backgroundColor == 'rgb(230, 230, 250)'){
       
       // torrentID = getTorrentId(rows[j]); // would do too
       torrentID = getTorrentId(rows[j].firstChild.nextSibling.nextSibling.nextSibling);
       
       addLink2Hide(rows[j],torrentID);
       
       potentiallyHideTorrent(rows[j],torrentID);
       
       if(--maxNumberOfOldTorrentsToHide <= 0){
           break;
       }
   }
}

function getTorrentId(obj){
   return (obj.innerHTML.match(/id=([^&]+)&/)[1]);
}

function potentiallyHideTorrent(obj,torrentID){
   cookieName = 'torrentID'+torrentID;
   if(getCookie(cookieName) == 'hide'){
       obj.style.display = 'none';
   }
}

function addLink2Hide(obj,torrentID){
   link = obj.firstChild.nextSibling.nextSibling.nextSibling.firstChild;
   span = document.createElement('span');
   span.id = 'torrentID'+torrentID;
   span.innerHTML = ' (<b style="color:'+linkColor+';">hide</b>)';
   //span.style.color = 'maroon';
   
   link.parentNode.insertBefore(span,link.nextSibling);
   
   funcName = 'hide'+torrentID;    
       
   bruteForce = "var exdate = new Date();\n" +
                "exdate.setDate(exdate.getDate() + "+daysTillExpiration+");\n" +  
                "document.cookie = 'torrentID"+torrentID +
                "=hide;expires='+exdate.toGMTString();\n" +
                "document.getElementById('torrentID"+torrentID +
                "').parentNode.parentNode.style.display = 'none';";
     
      window[funcName] = new Function(bruteForce);
   span.addEventListener("click",eval(funcName),true);
}

function getCookie(name){
  if (document.cookie.length > 0){
      c_start=document.cookie.indexOf(name + "=");
      if (c_start != -1){
         
          c_start = c_start + name.length+1 ;
          c_end = document.cookie.indexOf(";",c_start);
         
          if (c_end == -1) {
              c_end = document.cookie.length;
          }
          return unescape(document.cookie.substring(c_start,c_end));
      }
  }
  return "";
}