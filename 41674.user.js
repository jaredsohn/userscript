// ==UserScript==
// @name           Ultimate-Guitar Quick Scroll To Your Post
// @namespace      http://userscripts.org/users/23652
// @description    Quickly scrolls to your last post on a thread by click of a link; comes with an option to do it automatically. Double click the link to hide it
// @include        http://www.ultimate-guitar.com/forum/showthread.php?*
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

var username = 'tenfold'; // Name - Required
var user_id = '991123'; // User ID Number - Optional but preferable
var auto_scroll = true; // Scroll to the first post of yours on page load

//////////////////

function ScrollToElement(theElement){

  var selectedPosX = 0;
  var selectedPosY = 0;
              
  while(theElement != null){
    selectedPosX += theElement.offsetLeft;
    selectedPosY += theElement.offsetTop;
    theElement = theElement.offsetParent;
  }
                        		      
 window.scrollTo(selectedPosX,selectedPosY);

}

function scroll() {
var link = document.evaluate("//a["+(user_id!=''?'@href=\'member.php?u='+user_id+'\' and ':'')+"text()='"+username+"']",document,null,7,null);
if(link.snapshotLength==1) ScrollToElement(link.snapshotItem(0));
else if(link.snapshotLength>1) ScrollToElement(link.snapshotItem(link.snapshotLength-1));
}

if(auto_scroll) window.addEventListener('load', scroll, false);

var a = document.createElement('a');
if(document.evaluate("//a["+(user_id!=''?'@href=\'member.php?u='+user_id+'\' and ':'')+"text()='"+username+"']",document,null,9,null).singleNodeValue !=null) {
a.setAttribute('href', 'javascript:void(0);');
a.textContent = 'Scroll to your last post';
}
else {
a.textContent = 'No posts by you here';
}
a.setAttribute('style', 'position:fixed; bottom:0; left:0; padding:3px; color:#fff;');
a.addEventListener('click', scroll, false);
a.addEventListener('dblclick', function(){this.parentNode.removeChild(this);}, false);
document.body.insertBefore(a, document.body.firstChild);