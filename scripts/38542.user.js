// ==UserScript==
// @author	   Trey Moore
// @name           Google Reader 'Print What You Like' Button
// @description    Adds a button to print the current entry using printwhatyoulike.com
// @include        http://www.google.com/reader/view/*
// @version        3.0
// ==/UserScript==


function printWhatYouLike(entry)
{
	  window.open('http://www.printwhatyoulike.com/print?url='+entry.getElementsByClassName('entry-title-link')[0].href);
}

window.setTimeout(function(){
   var linksContainer = document.getElementById('viewer-footer');
   
   if (!linksContainer) {
   	GM_log('!linksContainer');

      return;
   }
  
   printButton3 = document.createElement('div');
   printButton3.addEventListener("click", function() { printWhatYouLike(document.getElementById('entries')) }, false);
   printButton3.innerHTML ='<div role="wairole:button" tabindex="0" class="goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-button-tight" id="entries-down"><div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-top-shadow">&nbsp;</div><div class="goog-button-base-content"><div class="goog-button-body"><div class="text">Print What You Like</div></div></div></div></div></div></div>';
   linksContainer.appendChild(printButton3); }, 6000);


