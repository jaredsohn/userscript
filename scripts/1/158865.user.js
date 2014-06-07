// ==UserScript==
// @id             ulozto - klikaci odkazy ve vysledcich hledani 
// @name           ulozto - klikaci odkazy ve vysledcich hledani
// @version        1.1
// @namespace      daemonicky
// @author         daemonicky
// @description    
// @include        http://www.ulozto.cz/hledej*
// @include        http://www.ulozto.sk/hledej*
// @include        http://www.uloz.to/hledej*
// @include        http://ulozto.cz/hledej*
// @include        http://ulozto.sk/hledej*
// @include        http://uloz.to/hledej*
// @include        http://www.ulozto.cz/soubory*
// @include        http://www.ulozto.sk/soubory*
// @include        http://www.uloz.to/soubory*
// @include        http://ulozto.cz/soubory*
// @include        http://ulozto.sk/soubory*
// @include        http://uloz.to/soubory*
// @run-at         window-load
// ==/UserScript==

// historie zmen:
// 1.1 zmena jmena

function repair_links()
{
 var hrefs = [];
 /*
  * get hyper links
  */
 var url_wrap = document.querySelectorAll(".jsFavoritesNope");
 for(i=0;i<url_wrap.length;i++)
 {
  // url seem to always start with x
  hrefs . push( "http://www.ulozto.cz/x" + url_wrap[i].innerHTML.match("fileId=[^&]+")[0] . slice(7,7+20));
 }

 /*
  * replace ulozto's fake links with normal links
  */
 var div_links = document.querySelectorAll(".fileName");
 for(i=0;i<div_links.length;i++)
 {
  // make new A element to erase all properties of ulozto link
  var new_link = document.createElement("a");
  new_link["href"] = hrefs[i];
  new_link.innerHTML = div_links[i].innerHTML;
  // replace link
  var div_link_parent = div_links[i].parentNode;
  div_link_parent.replaceChild( new_link, div_links[i] );
 }
}

window.setTimeout( repair_links, 3*1000 /*msec*/ );