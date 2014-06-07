// ==UserScript==
// @name             NFOrce TorrentSearch
// @namespace        http://jaxocode.blogspot.com
// @description      Search for torrents directly from NFOrce's release lists, just click on a release.
// @include          http://www.nforce.nl/*
// ==/UserScript==



// -- Variable Info ---------------------------------
// var strip = Strip the release name from tags (ie; PROPER, SVCD, REPACK) and year? (Recommended!)
// var group = Include the group name as a keyword in the search for a more specific search?
// var g1url = This url template is used when group name is included in the search ($1=release name, $2=group name).
// var g0url = This url template is used when not searching for group name ($1=release name).
// -- Configure -------------------------------------
   var strip = true;
   var group = true;
   var g1url = 'http://tp.searching.com/torrents-search.php?search=%2B"$1"+%2B"$2"&cat=0&sort=id&d=desc';
   var g0url = 'http://tp.searching.com/torrents-search.php?search=%2B"$1"&cat=0&sort=id&d=desc';
// --------------------------------------------------



function nforce_fixlinks()
{
   var allElements, thisElement;
   allElements = document.getElementsByTagName('a');
   
   for(var i=0; i < allElements.length; i++)
   {
      thisElement = allElements[i];
      
      if (thisElement.href.indexOf("viewnfo") >= 0){
         
         var rlsname = thisElement.innerHTML;
         
         if(strip){
            var j = rlsname.indexOf("*");
            var h = rlsname.indexOf("(");
            if(j != -1){
               rlsname = rlsname.substring(0, j-1);}
            if(h != -1){
               rlsname = rlsname.substring(0, h-1);}
         }
         
         var url;
         
         if(group){
            url = g1url.replace(new RegExp(/\$1/), rlsname);
            url = url.replace(new RegExp(/\$2/), allElements[i+1].innerHTML);
         }
         else{
            url = g0url.replace(new RegExp(/\$1/), rlsname);
         }
         
         thisElement.href = url;
      }
   }
}


nforce_fixlinks();

