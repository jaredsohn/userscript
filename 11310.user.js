// ==UserScript==
// @name            Add Ed2k Links To Emule
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Inserts a one-click download link (via emule) next to ed2k links
// @include         *
// ==/UserScript== 


var emuleUrl = "http://base.monstuff.com:81//"; // needs to be manually edited before using the script
// example: var emuleUrl = "http://yourEmuleUrl:yourEmulePort/";

var password = "password"; // needs to be edited before using the script


if (emuleUrl == "") { alert('You need to configure the "Add Ed2k Links To Emule" user script with your Emule url before using it.'); }


function scanLinks() {
  var links = getLinks();

  for (var i=0; i < links.length; i++){
      var link = links[i];
      if (match(link.href)) {
          var emuleLink = makeEmuleLink(link);
          link.parentNode.insertBefore(emuleLink, link.nextSibling);
      }
  }
}

function makeEmuleLink(link) {
    var emuleLink = document.createElement('a');
    emuleLink.setAttribute("href", makeHomeUrl(link.href, password));
    emuleLink.setAttribute("target", "_blank");
    emuleLink.style.paddingLeft = "5px";
    emuleLink.innerHTML = "<img src=\"" + image + "\" style='border: 0px' />";
    
    return emuleLink; 
}

function match(url) {
   if (url.match(/ed2k:\/\//i)) {
       return true;
   }
   return false;
}

function makeHomeUrl(url, password) {
   return emuleUrl + "?w=password&p=" + password + "&cat=0&c=" + escape(url);
}

function getLinks() {
   var doc_links = document.links;
   var links = new Array();
   for (var i=0; i < doc_links.length; i++){
       links.push(doc_links[i]);
   }
   return links;
}

var image = "data:image/x-icon;base64,AAABAAIAEBAQAAEABAAoAQAAJgAAABAQAAABAAgAaAUAAE4BAAAoAAAAEAAAACAAAAABAAQAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAgAAAAICAAIAAAACAAIAAgIAAAICAgADAwMAAAAD%2FAAD%2FAAAA%2F%2F8A%2FwAAAP8A%2FwD%2F%2FwAA%2F%2F%2F%2FABM3MQAAAAAAE5MRBhYAAAATUTEXeIAAABM3c3OI%2F1AAEXuJOYh%2FIAADiItzgw9AABE4n1N4%2BDAAAXmPB5NCAAATOxgzEAAAAAF5MxAAAAAAATeHkxAAAAABOTiHMTAAAAAXE4i3kwAAADEwEREwEAAAARAAAAAAAAAAMAAAAAAAA%2F8AAAIfAAAADwAAAAcAAAAHAACABwAAAAcAAIAPAAAAfwAAgf8AAIB%2FAACAHwAAwA8AAMQHAADn%2FwAA9%2F8AACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAABAAD%2F%2F%2F8ACSlkABI%2FgQAtb78Ar9zyAI%2FD6QBuqt8AQILOACdirgAkXacAVJPVABpKjgBXltcAHU%2BVADF2xwAtbbsAJl6mABtFhgAubLkADi1dAH2q3gBQe7QAF0CAADl8ywAub74Aha7fAAAAAABIapMAKmCnAD43MgBKitIAXJrZAOvs7ABBQEEAOXfCAE6RzAC60uYAwMTEACxotAAyd78AV4zBAG9sawAUFhcADDFuACVeqACAoMEAwsbGAJ%2BgoADp6%2BsAI1ymADF3xwAmYKsAn7PFAOHk5ADl5%2BcAEz%2BAAHZ0cgCeoKAApqqqAKKlpAAZSY0AJ2WsACFbowATPn8AGkuPAC10wQAeU5oA%2FPz8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUBBQUIBGhoaGhoaGhoaGgE8PT4%2FARodHR0dGhoaGhoBNwEBAQEBODk6Ox0aGhoaASsxHh4yMyw0NTU2HRoaGgErHwYGHiYsLS4vMB0aGhoaAQYEBh8mJygpKkMdGhoaAQEeHx8gISIjJEMlHRoaGhoBFxgZQxobHB0dHRoaGhoBARIPExQVFgEaGhoaGhoaGgEODxARARoaGhoaGhoaGhoBCwcGDA0BARoaGhoaGhoaAQIJAQQGCgMBARoaGhoaGhoBAwIBBAUGBwgBGhoaGhoaAQECGgEBAQEBAQEaGhoaGhoBARoaGhoaGhoaGhoaGhoaGgEaGhoaGhoaGhoaGgP%2FAAACHwAAAA8AAAAHAAAABwAAgAcAAAAHAACADwAAAH8AAIH%2FAACAfwAAgB8AAMAPAADEBwAA5%2F8AAPf%2FAAA%3D";

scanLinks();


