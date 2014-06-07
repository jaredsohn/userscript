// ==UserScript==
// @name             VCD Quality Review Page Newzleech
// @namespace        
// @description      Linkify the folder name on the review page to a search for the folder name on Newzleech.com
// @include          http://www.vcdreview.com/*
// ==/UserScript==



// -- Variable Info ---------------------------------
// var g0url = This url template is used when not searching for group name ($1=release name).
// -- Configure -------------------------------------
   var g0url = 'http://www.newzleech.com/usenet/?group=&minage=&age=160&min=min&max=max&q=$1&mode=usenet&adv=1'
// --------------------------------------------------


function vcdq_fixlinks()
{
   var allElements, thisElement;
   allElements = document.getElementsByTagName('td');
   
   for(var i=0; i < allElements.length; i++)
   {
      thisElement = allElements[i];
      
      if (thisElement.innerHTML.indexOf("Folder ::") >= 0 && thisElement.height != 185){
        thisElement = allElements[++i];
        rlsname = thisElement.innerHTML; 
        
        
  
         var url;
         
         url = g0url.replace(new RegExp(/\$1/), rlsname);
         
         thisElement.innerHTML = '<a href="' + url + '">' + rlsname + '</a>';
      }
   }
}


vcdq_fixlinks();




