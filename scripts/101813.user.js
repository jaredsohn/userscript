// ==UserScript==
// @name           vcdq
// @version        1.0.8
// @namespace      http://userscripts.org/scripts/review/101813
// @description    Add more search site to vcdq site.
// @include        *vcdq.com/release/*
// @grant          none
// @icon           http://www.vcdq.com/images/logo-silver.gif
// @downloadURL    https://userscripts.org/scripts/source/101813.user.js
// @updateURL      https://userscripts.org/scripts/source/101813.meta.js
// ==/UserScript==

//var googleSearchURL_torrent = 'http://www.google.com/search?&as_epq=' + getMovieName() +  '&as_dt=e&as_filetype=torrent&as_sitesearch=bitshare.ro%2C+extratorrent.com&num=100';
var googleSearchURL_direct = 'http://www.google.com/search?q="'+getMovieName()+'" ("rapidshare.com/files"||"hotfile.com/dl"||"letitbit.net"||"badongo.com/file/"||"depositfiles.com/"||"vip-file.com/download"||"filefactory.com/file"||"storage.to/get"||"hotfile.com/dl"||"netload.in/date")+&num=100&hl=en&lr=&btnG=Search';
//var googleSearchURL_direct = 'http://www.google.com/search?as_epq="'+getMovieName()+'" ("rapidshare.com/files"||"megaupload.com/?d"||"hotfile.com/dl"||"letitbit.net"||"badongo.com/file/"||"depositfiles.com/"||"vip-file.com/download"||"filefactory.com/file"||"storage.to/get"||"hotfile.com/dl"||"netload.in/date")+&num=100&&client=google-csbe&filter=0&ie=utf8';
var torrentSearchURL = 'http://metasearch.torrentproject.com/?search=' + getMovieName();
var torrentSearchKAT = 'http://kat.ph/usearch/' + getMovieName() + '/';
var torrentSearchTPB = 'http://thepiratebay.se/search/' + getMovieName() + '/0/99/200';
var torrentSearchYTS = 'http://yts.re/browse-movie/' + getMovieTitle() + '/All/All/0/latest';

//insert new element to page
function insert() {
  results = xpath( '//div[@class="rlsDetails"]/dl' );
  for (var i = results.snapshotLength -1; i >= 0; --i) {
    title = document.createElement('dt');
    title.setAttribute('class','c6');
    title.innerHTML = 'Download';
    results.snapshotItem(i).insertBefore(title, results.nextSibling);
    addLink('Search on Torrent Meta Search', torrentSearchURL, i);
    addLink('Search on KickassTorrents', torrentSearchKAT, i);
    addLink('Search on ThePirateBay', torrentSearchTPB, i);
    addLink('Search on YTS', torrentSearchYTS, i);
    //addLink('Search on Google (Torrent)', googleSearchURL_torrent, i);
    addLink('Search on Google (Direct Download)', googleSearchURL_direct, i);
  }
}// end function insert

//The xpath function 
function xpath(query) {
  return document.evaluate(query, document, null,
         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//Get release name
function getMovieName() {
  //console.log('getMovieName: ' + getStringByXPath('//div[@class="rlsDetails"]/dl/dd'));
  return getStringByXPath('//div[@class="rlsDetails"]/dl/dd');
}

//Get release name
function getMovieTitle() {
  //console.log('getMovieTitle: ' + getStringByXPath('//div[@class="rlsDetails"]/dl/dd[starts-with(@id, "title_clean-")]'));
  return getStringByXPath('//div[@class="rlsDetails"]/dl/dd[starts-with(@id, "title_clean-")]');
}

function addLink(name, searchlink, i) {
  add = document.createElement('dd');
  link = document.createElement('a');
  link.innerHTML = name;
  link.setAttribute('href',searchlink);
  link.setAttribute('target','_blank');
  add.appendChild(link)
  results.snapshotItem(i).insertBefore(add, results.nextSibling);
}

function getStringByXPath(xpath, node) {
  var node = node || document
  var doc = node.ownerDocument ? node.ownerDocument : node
  var str = doc.evaluate(xpath, node, null,
      XPathResult.STRING_TYPE, null)
  return (str.stringValue) ? str.stringValue : ''
}

function getElementsByXPath(xpath, node) {
  var node = node || document
  var doc = node.ownerDocument ? node.ownerDocument : node
  var nodesSnapshot = doc.evaluate(xpath, node, null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
  var data = []
  for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
      data.push(nodesSnapshot.snapshotItem(i))
  }
  return (data.length >= 1) ? data : null
}

function getFirstElementByXPath(xpath, node) {
  var node = node || document
  var doc = node.ownerDocument ? node.ownerDocument : node
  var result = doc.evaluate(xpath, node, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null)
  return result.singleNodeValue ? result.singleNodeValue : null
}

function removeAdds() {
  head = document.getElementsByTagName('head')[0];
  if (head)
  {
    style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML =
      'td.ado { display: none; }\n' +
      '#rlsContent { width: 100%; }\n' +
      'dd br { display: none; }\n' +
    head.appendChild(style);
  }
}

removeAdds();
insert();