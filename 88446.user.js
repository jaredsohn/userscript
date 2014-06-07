// ==UserScript==
// @name           allegro wystaw ponownie kiedy sprzedane / sell again even if sold 
// @namespace      outleter.pl
// @description    Dodaje link "wystaw przedmiot ponownie" do zakończonej aukcji w której sprzedano przedmiot.
// @include        http://allegro.pl/show_item.php*
// ==/UserScript==

var soldLinks = document.getElementsByClassName('spec-flex');

if (soldLinks) {
   
  var
    lastLink            = soldLinks[0],
    newElement          = document.createElement('hr'),
    sellAgainLink       = document.createElement('a'),
    sellAgainText       = document.createTextNode('wystaw przedmiot ponownie'),
    sellAgainHref       = 'http://allegro.pl/sell_item.php?again_item_id='+document.location.href.replace('http://allegro.pl/show_item.php?item=', '')
    ;
    
    sellAgainLink.setAttribute('href', sellAgainHref);
    //sellAgainLink.innerText="Wystaw ponownie";
    sellAgainLink.appendChild(sellAgainText);
    
    // GM_log('--- jestem w if');
    
    lastLink.parentNode.insertBefore(sellAgainLink, lastLink);
    
    lastLink.parentNode.insertBefore(newElement, lastLink);
    
    
    
    //newElement.insertBefore(sellAgainLink, newElement.nextSibling);
}