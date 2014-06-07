// ==UserScript==
// @name        LibraryThing more "editions" links
// @namespace   http://userscripts.org/users/maxstarkenburg
// @description Add more direct links to the editions pages of works, which can be useful for combining/separating activities
// @include     http*://*librarything.tld/series/*
// @include     http*://*librarything.tld/publisherseries/*
// @include     http*://*librarything.tld/place/*
// @include     http*://*librarything.tld/bookaward/*
// @include     http*://*librarything.tld/events/*
// @include     http*://*librarything.tld/author/*
// @include     http*://*librarything.tld/author_split.php?author=*&page=assign
// @include     http*://*librarything.tld/work/*/editions
// @include     http*://*librarything.tld/tag/*
// @include     http*://*librarything.tld/combine.php?*
// @include     http*://*librarything.tld/list/*
// @include     http*://*librarything.tld/commonknowledge/*
// @include     http*://*librarything.tld/log_helpers.php*
// @include     http*://*librarything.tld/catalog_bottom.php*
// @include     http*://*librarything.com/series/*
// @include     http*://*librarything.com/publisherseries/*
// @include     http*://*librarything.com/place/*
// @include     http*://*librarything.com/bookaward/*
// @include     http*://*librarything.com/events/*
// @include     http*://*librarything.com/author/*
// @include     http*://*librarything.com/author_split.php?author=*&page=assign
// @include     http*://*librarything.com/work/*/editions
// @include     http*://*librarything.com/tag/*
// @include     http*://*librarything.com/combine.php?*
// @include     http*://*librarything.com/list/*
// @include     http*://*librarything.com/commonknowledge/*
// @include     http*://*librarything.com/log_helpers.php*
// @include     http*://*librarything.com/catalog_bottom.php*
// @version     1.4
// @grant       none
// ==/UserScript==

// The extra set of .com includes are because .tld doesn't work in Opera. :-(

var url = document.URL;

// I got this styling part started thanks to Mark Pilgrim at http://greasemonkey.win-start.de/patterns/add-css.html
var head = document.getElementsByTagName("head")[0];
var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = '\
  .tinygray a{ color: grey }\
  .tinygray a:visited{ color: #551A8B }\
  .moreeditions{ font-size: .9em\; }\
  ';
head.appendChild(style);


// If we're on a "Series" or "Publisher Series" page
if (url.indexOf("/series") > -1 || url.indexOf("/publisherseries") > -1 || url.indexOf("/place") > -1 || url.indexOf("/bookaward") > -1 || url.indexOf("/events")) {

  var seriesLinks = document.evaluate(
    '//table[@class="worksinseries"]//td[not(@class)]/a[1]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i=0; i<seriesLinks.snapshotLength; i++) {
    var link = seriesLinks.snapshotItem(i);
    newLink = document.createElement('span');
    newLink.className = "tinygray";
    newLink.innerHTML = '(<a href="' + link + '/editions">editions</a>)'
    var par = link.parentNode;
    var space = document.createTextNode(" ");
    par.appendChild(space);
    par.appendChild(newLink);
  }

}

// If we're on an author page, listing all of their works
if (url.indexOf("/author") > -1) {

  var authorLinks = document.evaluate(
    '//li[@class="li_donthave" or @class="li_have"]//a',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i=0; i<authorLinks.snapshotLength; i++) {
    var link = authorLinks.snapshotItem(i);
    newLink = document.createElement('span');
    newLink.className = "moreeditions moreeditions-author";
    newLink.innerHTML = '(<a href="' + link + '/editions">editions</a>)'
    var par = link.parentNode;
    var space = document.createTextNode(" ");
    par.insertBefore(newLink, link.nextSibling);
    par.insertBefore(space, newLink);
  }

}

// If we're on an editions page, it can be useful to have direct "editions" links for the list of works in in the "combine/separate potentials"
if (url.indexOf("/editions") > -1) {

  var editionsLinks = document.evaluate(
    '//div[@id="potentialworkcombinations"]/div/a',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i=0; i<editionsLinks.snapshotLength; i++) {
    var link = editionsLinks.snapshotItem(i);
    newLink = document.createElement('span');
    newLink.className = "tinygray";
    newLink.innerHTML = '(<a href="' + link + '/editions">editions</a>)'
    var par = link.parentNode;
    var space = document.createTextNode(" ");
    par.insertBefore(newLink, link.nextSibling.nextSibling.nextSibling);
    par.insertBefore(space, newLink);
  }
  
} 

// If we're on an tag page ("titles" view) or tagmash page, though this only works for the first tag page
if (url.indexOf("/tag/") > -1) {

  var tagLinks = document.evaluate(
    '//div[@class="list"]/ul/li/a[1]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i=0; i<tagLinks.snapshotLength; i++) {
    var link = tagLinks.snapshotItem(i);
    newLink = document.createElement('span');
    newLink.className = "moreeditions moreeditions-tag";
    newLink.innerHTML = '(<a href="' + link + '/editions">editions</a>)'
    var par = link.parentNode;
    var space = document.createTextNode(" ");
    par.insertBefore(newLink, link.nextSibling);
    par.insertBefore(space, newLink);
  }

}


// If we're on the combinination/separation page of an author or work
if (url.indexOf("/combine.php") > -1) {

  var combineLinks = document.evaluate(
    '//table[contains(@class,"combinetable")]/tbody/tr/td/h2/span/a',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i=0; i<combineLinks.snapshotLength; i++) {
    var link = combineLinks.snapshotItem(i);
    newLink = document.createElement('span');
    newLink.innerHTML = '<a href="' + link + '/editions">go to editions</a>'
    var par = link.parentNode;
    var semispace = document.createTextNode("; ");
    par.insertBefore(newLink, link.nextSibling);
    par.insertBefore(semispace, newLink);
  }

}

// If we're on the page for splitting and assigning homonymous authors ...
if (url.indexOf("/author_split") > -1) {

  var splitLinks = document.evaluate(
    '//table[@class="works"]/tbody/tr/td/a',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i=0; i<splitLinks.snapshotLength; i++) {
    var link = splitLinks.snapshotItem(i);
    newLink = document.createElement('span');
    newLink.className = "moreeditions moreeditions-split";
    newLink.innerHTML = '(<a href="' + link + '/editions" onclick="event.stopPropagation();">editions</a>)'
    var par = link.parentNode;
    var space = document.createTextNode(" ");
    par.insertBefore(newLink, link.nextSibling);
    par.insertBefore(space, newLink);
  }
  
  var divisionHistoryLinks = document.evaluate(
    '//div[@class="splithistory"][1]/p//a[starts-with(@href,"/work/")]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i=0; i<divisionHistoryLinks.snapshotLength; i++) {
    var link = divisionHistoryLinks.snapshotItem(i);
    newLink = document.createElement('span');
    newLink.innerHTML = '(<a href="' + link + '/editions">editions</a>)';
    var par = link.parentNode;
    var space = document.createTextNode(" ");
    par.insertBefore(newLink, link.nextSibling);
    par.insertBefore(space, newLink);
  }

}

// If we're on an author page, listing all of their works
if (url.indexOf("/list") > -1) {

  var listLinks = document.evaluate(
    '//td/div[@class="t"]//a',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i=0; i<listLinks.snapshotLength; i++) {
    var link = listLinks.snapshotItem(i);
    newLink = document.createElement('span');
    newLink.className = "moreeditions";
    newLink.innerHTML = '(<a href="' + link + '/editions">editions</a>)'
    var par = link.parentNode;
    var space = document.createTextNode(" ");
    par.insertBefore(newLink, link.nextSibling);
    par.insertBefore(space, newLink);
  }

}

// If we're on an Common Knowledge log/history page ...
if (url.indexOf("/commonknowledge/") > -1) {

  var ckLinks = document.evaluate(
    '//tr/td[@class="fwikiBrowseCWhat"]/div/a[starts-with(@href,"/work/")]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i=0; i<ckLinks.snapshotLength; i++) {
    var link = ckLinks.snapshotItem(i);
    newLink = document.createElement('span');
    newLink.className = "moreeditions";
    newLink.innerHTML = '(<a href="' + link + '/editions">editions</a>)'
    var par = link.parentNode;
    var space = document.createTextNode(" ");
    par.insertBefore(newLink, link.nextSibling);
    par.insertBefore(space, newLink);
  }

}

// If we're on the "Helpers Log" page ...
if (url.indexOf("log_helpers.php") > -1) {  

  var logLinks = document.evaluate(
    '//div[@class="content"]/p//a[starts-with(@href,"/work/")]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i=0; i<logLinks.snapshotLength; i++) {
    var link = logLinks.snapshotItem(i);
    newLink = document.createElement('span');
    newLink.className = "moreeditions";
    newLink.innerHTML = '(<a href="' + link + '/editions">editions</a>)'
    var par = link.parentNode;
    var space = document.createTextNode(" ");
    par.insertBefore(newLink, link.nextSibling);
    par.insertBefore(space, newLink);
  }

}


// If we're on the Catalog page ...
if (url.indexOf("catalog_bottom.php") > -1) {  

  var catalogLinks = document.evaluate(
    '//a[@class="lt-title"]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i=0; i<catalogLinks.snapshotLength; i++) {
    var link = catalogLinks.snapshotItem(i);
//    var bookEditions = link;
//    bookEditions = bookEditions.replace("/book/","/editions/");
    newLink = document.createElement('span');
    newLink.className = "moreeditions";
    newLink.innerHTML = '(<a href="' + link.href.replace("/book/","/editions/") + '">editions</a>)'
    var par = link.parentNode;
    var space = document.createTextNode(" ");
    par.insertBefore(newLink, link.nextSibling);
    par.insertBefore(space, newLink);
  }

}
