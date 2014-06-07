// ==UserScript==
// @name          Zip.ca and IMDb interlinking updated
// @description   Interlink zip.ca and IMDb movie pages
// @author        cottser
// @namespace     http://userscripts.org/users/cottser
// @version       1.0.4
// @include       http://*.imdb.com/title/*
// @include       http://imdb.com/title/*
// @include       http://www.zip.ca/Browse/Title*
// @include       http://www.zip.ca/browse/title*
// ==/UserScript==

// Add links from Zip.ca and IMDb movie pages to each other's sites.

(function() {
  // Call the main function.
  insertLinks();
})();

function getMovieNameFromIMDbTitle() {
  // Pull the <title> from the document and extract the title of the movie from
  // IMDb.
  var theTitle = document.title;
  if (theTitle) {
    var pos = theTitle.indexOf('(');
    if (pos >= 0)
      theTitle = theTitle.substring(0, pos-1);
  }

  return theTitle;
}

function getMovieNameFromZipTitle() {
  // Pull the <title> from the document and extract the title of the movie from
  // Zip.ca.
  var theTitle = document.title;
  if (theTitle) {
    var pos = theTitle.indexOf('-');
    var endpos = theTitle.indexOf('Online');
    if (pos >= 0)
      theTitle = theTitle.substring(pos+2, endpos-1);
  }

  return theTitle;
}

function makeZipLink(movieName) {
  // Create the link to Zip.ca.
  if (movieName !== null && movieName.length > 0) {
    var container = document.createElement('div');
    container.setAttribute('style', 'position: relative; top: -4px;');

    var image = document.createElement('img');
    image.setAttribute('src', 'data:image/png;base64,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');
    image.setAttribute('border', '0');
    image.setAttribute('title', 'Search for this title on Zip.ca');

    var newLink = document.createElement('a');
    newLink.setAttribute('href', 'http://www.zip.ca/Browse/Search.aspx?s=' + movieName);

    newLink.appendChild(image);
    container.appendChild(newLink);

    return(container);
  }

  return(null);
}

function makeIMDbLink(movieName) {
  // Create the link to IMDb.
  if (movieName !== null && movieName.length > 0) {
    var container = document.createElement('li');

    var image = document.createElement('img');
    image.setAttribute('src', 'data:image/gif;base64,R0lGODlhNwAbANUAACEfKykmK8+0N8yzRPXhQlhVTW9oTUZER8esQevYSl5cWPjmQtnHbuPWcsmrMNS+YdO6RMi5bIZ8W/PhTfHdSNvER5SKaM2wLvn01dG1L+POSLOpdo6DVu/hadW6MefXVfTePDo5O/jmTfvqRP7vRbusYu3eVfPlWXZ0b+/ikvnoT9m+MaGRLN3KWL+2e822VqaijcqwNu/aP6Wda9G3ONS7OcSoNCQgIOjSPhcVHte/Oh8cHeLMPdzFOxIQFv///yH5BAAAAAAALAAAAAA3ABsAAAb/wJ8QI1IZVUWRUjRhTp5QykRKqVYTCQp2y91qEpqGcPxLLRa4NA+35rnf7x6vR6/b67qebs/f1/I8GhhkGGcyOnByc3N3eHl9On+RNZQ1NJY0mTQxAm4pQ2YECz04JGenogSqqyAyrTIyFLCzOLC1abi5bDZyPQ0YqzJ0qgskxiMyxSPLsAsjpyA4qwQgrWxrFNZwazUOeXQT0aTEDDPmLhMu5uYtFBvrMxEm7+slLyZpEesROL0xNjx0xIjRo8IEGTxkqJJBYkaOHD4KnCjg42GOGR0AWPRhoEOIihVzADjwYAQKkBIoyInBgkWMOQQryEpDANYIhzt8KJjo48YN/x8cGgDYseNnxwM5bkAk6uPACQk+ckoQ8WVFSxp0YuiokEBGmlk3k+rk6ZNjBKJlj+bYccAAUaINOPT0YWFGAQMP9OjRIWBr1zW2Fjj8ubNAUqMbDhvtgJSjUKIA4vbcEcCH5QMtVvDpy5XNLRyCxRbuqfSABdKLGytoEACy5Bs7QoR4G2EFJb41Oq/BRWCwThOGfVJWoJgjY4irW++IDPWnhQ1RAdSedAlCAs9qeoueQDF2gO/eUyNnDZmBXOeJl9fGJKAGBA1troHwrQD4wwLKc+AXr5P88gbNAZWedB5oIgAN77Xxhgz02ecDCrMpBWFOBnygmn8AmDfXc2sRKP/Ah5kkmAiDogFnmQWGEQVDa45dqFyGAXIwYAQZCMAJDQK8p0gdONCXAEV0nVTUihRaiBwDLzIQ44AlZDBQDDgOoMGOdPQo2geG0QUVZS7AxpGRZg21nJIbznjBk1FO6QYdOlhJGJYnzlDRARF4aUADSMV2QFFEkWmUBB2WcAECDjiwyQAVIBKQHj1GFRGcQJUAUQEPMFXhAVEtldMBH2y5w0M5BfDCBQ7YYEMNMSCqqCQ9zADAqwpgSZQESO6AVwAa3bnnd7gGUEAJFQCKK4QiWUCDqaZ2o2pCAVHSAgPQMlDDsww8UAG0D0BQbbUCPFDtA+BmK4AD4Vr7wgwlHGubqqE62DAAH6TIQIkH9NJLgwcZ4BtDBvwKwG8GZ14gsMAOnFnowaUWXKqpBKlrAwYNQGAJG5x8aKONTz7pwD8xbLwusiCHLLINApk6wCc/YADBJdF4tk0iizSCx15+TEJJJn3VYGoEg4yRQiYy2/EIzZDYXMnNmGiC44fI9jyGyhBEDcEAU1c9wNVYZ501AgMg4PXXYIcddgRjBAEAOw%3D%3D');
    image.setAttribute('border', '0');
    image.setAttribute('title', 'Search for this title on IMDb');

    var newLink = document.createElement('a');
    newLink.setAttribute('href', 'http://www.imdb.com/find?s=tt&q=' + movieName);

    newLink.appendChild(image);
    container.appendChild(newLink);

    return(container);
  }

  return(null);
}

function insertLinks() {
  var movieName, allElements, targetElement, newElement;
  // We're on IMDb.
  if (location.href.indexOf('imdb.com') >= 0) {
    // Double check to see if we have the title.
    movieName = getMovieNameFromIMDbTitle();
    if (movieName) {
      allElements = document.evaluate(
        '//div[contains(@class, "infobar")]',
        document,
         null,
         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
         null);
      targetElement = allElements.snapshotItem(0);

      newElement = makeZipLink(movieName);
      targetElement.parentNode.insertBefore(newElement, targetElement.nextSibling);
    }
  }


  // We're on Zip.ca.
  if (location.href.indexOf('zip.ca') >= 0) {
    // Double check to see if we have the title.
    movieName = getMovieNameFromZipTitle();
    if (movieName) {
      allElements = document.evaluate(
         '//ul[contains(@class, "zip-opts")]/li[last()]',
         document,
         null,
         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
         null);
      targetElement = allElements.snapshotItem(0);

      newElement = makeIMDbLink(movieName);
      targetElement.parentNode.insertBefore(newElement, targetElement.nextSibling);
    }
  }
}
