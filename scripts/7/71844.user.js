// ==UserScript==
// @name           Bind hotkeys in the Google search page
// @namespace      http://www.arnau-sanchez.com/
// @description    Press Ctr+Alt+N to open the N-th result of a search in Google.
// @include        http*://www.google.*
// ==/UserScript==

function toArray(object) {
  return [].slice.call(object, 0);
}

function get_google_search_links() {
  return toArray(document.getElementsByClassName('l'));
}

function click_link(link) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    link.dispatchEvent(event);
}

window.addEventListener('keydown', function(ev) { 
  if (ev.ctrlKey && ev.altKey) {
    var ascii = String.fromCharCode(ev.keyCode);
    if (ascii >= '0' && ascii <= '9') {
      num = parseInt(ascii);
      if (num == 0)
        num = 10;    
      var link = get_google_search_links()[num-1];    
      if (link) {
        if (ev.shiftKey)
          window.open(link.href);
        else
          click_link(link);
      }
    }
  }
}, true);

get_google_search_links().forEach(function(link, index, links) {
  var info = document.createElement("span");
  info.style["margin-left"] = "10px";
  info.appendChild(document.createTextNode("[" + (index+1) + "]"));
  link.parentNode.insertBefore(info, link.nextSibling);
});