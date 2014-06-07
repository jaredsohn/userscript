// ==UserScript==
// @name           Highlight CF
// @namespace      http://www.top-info.de/thein
// @description    Highlight specific CF Entries
// @include        http://www.codingforums.com/forumdisplay.php?f=*
// @grant          all
// ==/UserScript==

function Trim(orgString) {
   return orgString.replace(/^\s+|$\s+/g, "");
}

window.addEventListener('load', function() {
   var myAlt1 = document.getElementsByClassName('alt1');
   if(self==top) {
      for(i=0; i<myAlt1.length; i++) {
         if(myAlt1[i].id != "" && myAlt1[i].id.indexOf('td_threadtitle') != -1) {
            var isNew = myAlt1[i].getElementsByTagName('div')[0].getElementsByTagName('a').length > 1 && myAlt1[i].getElementsByTagName('div')[0].getElementsByTagName('a')[0].parentNode.tagName != 'SPAN';
            if(isNew) {
               var entryTD = null;
               var userLast = null;
               if(myAlt1[i].nextSibling.nodeType==3) {
                  entryTD = myAlt1[i].nextSibling.nextSibling.nextSibling.nextSibling;
                  userLast = myAlt1[i].nextSibling.nextSibling;
               } else {
                  entryTD = myAlt1[i].nextSibling.nextSibling;
                  userLast = myAlt1[i].nextSibling;
               }
               var smallfonts = myAlt1[i].getElementsByClassName('smallfont');
               var spans = smallfonts[smallfonts.length-1].getElementsByTagName('span');
               var userFirst = Trim(spans[spans.length-1].innerHTML);
               //alert(userFirst);
               var entries = -1;
               var userName = "";
               if(entryTD.innerHTML.length>10) {
                  entries = parseInt(entryTD.getElementsByTagName('a')[0].innerHTML, 10);
               }
               if(userLast.innerHTML.length > 10) {
                  userName = Trim(userLast.getElementsByTagName('a')[0].innerHTML);
               }

               // new entries without answer
               if(entries==0) {
                  myAlt1[i].style.backgroundColor = 'red';
               }
               
               // new entries where only the author answered himself
               if(entries==1) {
                  if(userFirst == userName)
                     myAlt1[i].style.backgroundColor = 'orange';
               }
            }
         }
      }
   }
}, false);
