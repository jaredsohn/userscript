// ==UserScript==
// @name           538 Backtyper
// @description    Adds comment history link and prev/next page for comments
// @namespace      http://userscripts.org/users/120564
// @include        http://www.fivethirtyeight.com/*
// @include        https://www.blogger.com/comment*
// ==/UserScript==

var commentsElem = document.evaluate(
    '//div[@class="comments" or @id="comments"]//h4',
    document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var comments = Number(commentsElem.textContent.replace(/[^0-9]/g, ' '));

var commentsPerPage = 200;

var page = Number(ExtractQueryString().commentPage) || Number(ExtractQueryString().page);

if (isNaN(page))
  page = 1;

var entries = document.evaluate(
    '(//dl[@id="comments-block"]//dt//text()[contains(., "said")]|' + 
    '//dt[@class="comment-author"]//text()[contains(., "said")])' + 
    '/..//a[@rel="nofollow"]',
    document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < entries.snapshotLength; i++)
{
  var a = entries.snapshotItem(i);
  var link = document.createElement('a');                       
  var url = a.getAttribute('href');
  url = url.replace('http://', '');
  url = url.replace(/\//g, '%252f');
  link.setAttribute('href', 'http://www.backtype.com/url/' + url);     
  link.appendChild(document.createTextNode('#' + (i + (page - 1) * commentsPerPage + 1) + ': '));

  a.parentNode.insertBefore(link, a);
}

if (location.host != 'www.blogger.com') {
  var commentsStart = commentsPerPage * (page - 1) + 1;
  var commentsEnd = page * commentsPerPage;
  if (commentsEnd > comments)
    commentsEnd = comments;

  var cb = document.getElementById('comments-block').nextSibling;
  
  var tr;
  var td;
  var div = document.createElement('div');
  div.setAttribute('class', 'blog-pager');
  
  var span;
  var a;

  if (page != 1) {  
    span = document.createElement('span');
    span.setAttribute('style', 'float:left');
    a = document.createElement('a');
    a.setAttribute('href', location.protocol+'//'+location.host+location.pathname+'?commentPage='+(page-1)+'#comments');
    a.appendChild(document.createTextNode('<< ' + Math.max(1, commentsStart - commentsPerPage) + '-' + (commentsStart - 1)));
    span.appendChild(a);
    div.appendChild(span);
  }

  if (comments > commentsPerPage && commentsEnd < comments) {
    span = document.createElement('span');
    span.setAttribute('style', 'float:right');
    a = document.createElement('a');
    a.setAttribute('href', location.protocol+'//'+location.host+location.pathname+'?commentPage='+(page+1)+'#comments');
    a.appendChild(document.createTextNode((commentsEnd + 1) + '-' + Math.min(commentsEnd + 200, comments) + ' >>'));
    span.appendChild(a);
    div.appendChild(span);
  }

  var b = document.createElement('b');
  b.appendChild(document.createTextNode(commentsStart + '-' + commentsEnd + ' of ' + comments + ' comments'));
  div.appendChild(b);

  cb.parentNode.replaceChild(div.cloneNode(true), commentsElem);

  cb.parentNode.insertBefore(div, cb);

  div = document.createElement('div');
  div.setAttribute('style', 'clear:left');
  cb.parentNode.insertBefore(div, cb);
  div = document.createElement('div');
  div.setAttribute('style', 'clear:right');
  cb.parentNode.insertBefore(div, cb);
}


function ExtractQueryString() {
  var oResult = {};
  if (location.search != '') {
    var aQueryString = (location.search.substr(1)).split("&");
    for (var i = 0; i < aQueryString.length; i++) {
      var aTemp = aQueryString[i].split("=");
      if (aTemp[1].length > 0) {
          oResult[aTemp[0]] = unescape(aTemp[1]);
      }
    }
  }
  return oResult;
}
