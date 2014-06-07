// ==UserScript==
// @name            Inline IMDB ratings
// @namespace    http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description    Inserts rating values next to all the imdb links that it finds. Now working with movielens.org.
// @include         *
// @exclude        http://www.imdb.com/title/*
// @exclude        http://akas.imdb.com/title/*
// @exclude        http://imdb.com/title/*
// ==/UserScript==

function scanLinks() {
  var links = getLinks();

  for (var i=0; i < links.length; i++){
      var link = links[i];
      var imdbID = findImdbID(link.href)
      if (imdbID) {
          insertImdbNode(link, imdbID);
      }
  }
}

function insertImdbNode(link, imdbID) {
  getMovieInfo(imdbID, function(movieInfo) {
    var imdbNode = unsafeWindow.document.createElement('span');

    imdbNode.innerHTML = "[imdb: " + movieInfo.rating + "/10]";
    imdbNode.style.paddingLeft = "5px";
    imdbNode.style.paddingRight = "5px";
    link.parentNode.insertBefore(imdbNode, link.nextSibling); 
  });
}

function findImdbID(url) {
  var m = url.match(/^http:\/\/(www.|akas.)?imdb.com\/title\/(tt\d*)/i);

  if (m) return m[2];
  return null;
}

function getLinks() {
   var doc_links = document.links;
   var links = new Array();
   for (var i=0; i < doc_links.length; i++){
       links.push(doc_links[i]);
   }
   return links;
}

function makeMovieUrl(imdbID) {
  return "http://www.imdb.com/title/" + imdbID;
}

function getMovieInfo(imdbID, callback) {
  var url = makeMovieUrl(imdbID);

  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(details) {
      callback(extractMovieInfo(details.responseText));
    }
  });
}

function extractMovieInfo(content) {
  
  // <b>User Rating:</b> 
  // <b>2.1/10</b> 
  var match = content.match(/<b>(\d.\d)\/10<\/b>/);
  return { rating: match[1] };
}


var image = "data:image/x-icon;base64,AAABAAIAEBAQAAEABAAoAQAAJgAAABAQAAABAAgAaAUAAE4BAAAoAAAAEAAAACAAAAABAAQAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAgAAAAICAAIAAAACAAIAAgIAAAICAgADAwMAAAAD%2FAAD%2FAAAA%2F%2F8A%2FwAAAP8A%2FwD%2F%2FwAA%2F%2F%2F%2FABM3MQAAAAAAE5MRBhYAAAATUTEXeIAAABM3c3OI%2F1AAEXuJOYh%2FIAADiItzgw9AABE4n1N4%2BDAAAXmPB5NCAAATOxgzEAAAAAF5MxAAAAAAATeHkxAAAAABOTiHMTAAAAAXE4i3kwAAADEwEREwEAAAARAAAAAAAAAAMAAAAAAAA%2F8AAAIfAAAADwAAAAcAAAAHAACABwAAAAcAAIAPAAAAfwAAgf8AAIB%2FAACAHwAAwA8AAMQHAADn%2FwAA9%2F8AACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAABAAD%2F%2F%2F8ACSlkABI%2FgQAtb78Ar9zyAI%2FD6QBuqt8AQILOACdirgAkXacAVJPVABpKjgBXltcAHU%2BVADF2xwAtbbsAJl6mABtFhgAubLkADi1dAH2q3gBQe7QAF0CAADl8ywAub74Aha7fAAAAAABIapMAKmCnAD43MgBKitIAXJrZAOvs7ABBQEEAOXfCAE6RzAC60uYAwMTEACxotAAyd78AV4zBAG9sawAUFhcADDFuACVeqACAoMEAwsbGAJ%2BgoADp6%2BsAI1ymADF3xwAmYKsAn7PFAOHk5ADl5%2BcAEz%2BAAHZ0cgCeoKAApqqqAKKlpAAZSY0AJ2WsACFbowATPn8AGkuPAC10wQAeU5oA%2FPz8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUBBQUIBGhoaGhoaGhoaGgE8PT4%2FARodHR0dGhoaGhoBNwEBAQEBODk6Ox0aGhoaASsxHh4yMyw0NTU2HRoaGgErHwYGHiYsLS4vMB0aGhoaAQYEBh8mJygpKkMdGhoaAQEeHx8gISIjJEMlHRoaGhoBFxgZQxobHB0dHRoaGhoBARIPExQVFgEaGhoaGhoaGgEODxARARoaGhoaGhoaGhoBCwcGDA0BARoaGhoaGhoaAQIJAQQGCgMBARoaGhoaGhoBAwIBBAUGBwgBGhoaGhoaAQECGgEBAQEBAQEaGhoaGhoBARoaGhoaGhoaGhoaGhoaGgEaGhoaGhoaGhoaGgP%2FAAACHwAAAA8AAAAHAAAABwAAgAcAAAAHAACADwAAAH8AAIH%2FAACAfwAAgB8AAMAPAADEBwAA5%2F8AAPf%2FAAA%3D";


scanLinks();

