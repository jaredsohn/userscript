// ==UserScript==
// @name           hdbRecolorReadPosts
// @description    greyish color for read posts
// @include        https://hdbits.org/forums.php?action=viewtopic*#*
// @include        http://hdbits.org/forums.php?action=viewtopic*#*
// ==/UserScript==


if(location.hash != "#last"){    // remove "last", as it interferes :/

   last = document.getElementsByName('last')[0];
   last.parentNode.removeChild(last.nextSibling);    // silly space
   last.parentNode.removeChild(last);    // "last" anchor
}

if(location.hash != ""){
   
   hash = location.hash.substring(1);
   dothemall = false;
   links = document.getElementsByTagName("a");

   
   if(hash == "last"){
       dothemall = true;
       
   }
   
   for(var j = 0; j < links.length; j++){
       if(links[j].name != "" && links[j].name != "top"
               && (dothemall || parseInt(links[j].name) <= parseInt(hash) )){
           
           linkObj = links[j];
           myhit = linkObj.nextSibling.nextSibling.nextSibling.nextSibling;
           table = myhit.firstChild.nextSibling;
           
           if (table === null){    // <-- happens if hash = 'last', in which case last post should not be colored.
               break;
           }
               table.style.backgroundColor='#b0bdc8';    // background color
               table.firstChild.firstChild.nextSibling.style.color='#777777';    // font color
           
       }    
   }    
}