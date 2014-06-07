// KwikSearch 0.5
// Author: Karthik Veeramani (karthikveeramani@gmail.com)
// KwikSearch lets you search the common search engines smarter, by using
// keywords that route you to various specific-search pages (like image, video etc.)
// Read the usage at http://www.employees.org/~vkarthik/downloads/kwiksearch/kwiksearch.html
// 
// ==UserScript==
// @name          KwikSearch
// @namespace     http://www.employees.org/~vkarthik/downloads/kwiksearch/
// @description   Same old search engines, a bit smarter
// @include  http*://*google*.co*
// @include  http*://*yahoo*.co*
// @exclude  http*://mail\.*
// ==/UserScript==

var preventDefault = 1;

function getRE(str)
{
  re = new RegExp('^' + str);
  return re;
}

function routeSearch(event)
{
  if(window.location.href.match(/\.google\.co/))
  {
    routeGoogleSearch(event);
  }
  if(window.location.href.match(/\.yahoo\.co/))
  {
    routeYahooSearch(event);
  }
  if(preventDefault) { event.preventDefault(); }
}

function routeYahooSearch(event)
{
  var searchfor;
  var txtBox = document.getElementById("yschsp");
  if(txtBox) searchfor = txtBox.value;
  else { txtBox = (document.getElementsByName("p"))[0]; }
  if(txtBox) searchfor = txtBox.value; 
  else { txtBox = document.getElementById("stx"); }
  if(txtBox) searchfor = txtBox.value; 
  else preventDefault = 0;

  var getvars = "";

  //var param = document.evaluate("//input[@type='hidden' and @name and @value]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
  //for(i=0;i<param.snapshotLength;i++) 
  //{
  //  getvars += "&" + param.snapshotItem(i).name + "=" + param.snapshotItem(i).value;
  //}
  

  var param = document.evaluate("//input[@name='ei' and @type='hidden']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  if(param.snapshotLength > 0) 
  {
    getvars += "&ei=" + param.snapshotItem(0).value;
  }
  param = document.evaluate("//input[@name='fr' and @type='hidden']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  if(param.snapshotLength > 0) 
  {
    getvars += "&fr=" + param.snapshotItem(0).value;
  }
  param = document.evaluate("//input[@name='fl' and @type='hidden']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  if(param.snapshotLength > 0) 
  {
    getvars += "&fl=" + param.snapshotItem(0).value;
  }
  param = document.evaluate("//input[@name='cv' and @type='hidden']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  if(param.snapshotLength > 0) 
  {
    getvars += "&cv=" + param.snapshotItem(0).value;
  }
  param = document.evaluate("//input[@name='x' and @type='hidden']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  if(param.snapshotLength > 0) 
  {
    getvars += "&x=" + param.snapshotItem(0).value;
  }
  param = document.evaluate("//input[@name='toggle' and @type='hidden']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  if(param.snapshotLength > 0) 
  {
    getvars += "&toggle=" + param.snapshotItem(0).value;
  }
  param = document.evaluate("//input[@name='cop' and @type='hidden']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  if(param.snapshotLength > 0) 
  {
    getvars += "&cop=" + param.snapshotItem(0).value;
  }
  
  getvars = getvars.substring(1);
  
  searchWebUrl = 'http://search.yahoo.com/search?sm=Yahoo%21+Search&' + getvars + '&p=';
  searchImageUrl = 'http://images.search.yahoo.com/search/images?' + getvars + '&p=';
  searchVideoUrl = 'http://video.search.yahoo.com/search/video?' + getvars + '&p=';
  searchAudioUrl = 'http://audio.search.yahoo.com/search/audio?' + getvars + '&p=';
  searchDirectoryUrl = 'http://search.yahoo.com/search/dir?' + getvars + '&p=';
  searchNewsUrl = 'http://news.search.yahoo.com/search/news?' + getvars + '&p=';
  searchShoppingUrl = 'http://shopping.yahoo.com/search?' + getvars + '&p=';
  searchGroupUrl = 'http://groups.yahoo.com/search?submit=Search&query='
  // searchLocalUrl = 'http://local.yahoo.com/results?stx=beethoven&toggle=1&ei=UTF-8&fl=0&fr=FP-tab-web-t&qry=';

 webKeyword = "web:";
 imageKeyword = 'image:';
 groupKeyword = 'group:';
 newsKeyword  = 'news:';
 shoppingKeyword = 'shop:';
 //localKeyword = 'local:';
 videoKeyword = 'video:';
 audioKeyword = 'audio:';
 directoryKeyword = 'dir:';

 var finalsearch;
 var finalhref;
 if(searchfor.match(/^\\/))
 {
   txtBox.value = searchfor.substring(1);
   preventDefault = 0;
 }
 else if(searchfor.match(getRE(webKeyword)))
 {
   finalsearch = searchfor.substring(webKeyword.length);
   finalhref = searchWebUrl + finalsearch;
 }
 else if(searchfor.match(getRE(imageKeyword)))
 {
   finalsearch = searchfor.substring(imageKeyword.length);
   finalhref = searchImageUrl + finalsearch;
 }
 else if(searchfor.match(getRE(groupKeyword)))
 {
   finalsearch = searchfor.substring(groupKeyword.length);
   finalhref = searchGroupUrl + finalsearch;
 }
 else if(searchfor.match(getRE(newsKeyword)))
 {
   finalsearch = searchfor.substring(newsKeyword.length);
   finalhref = searchNewsUrl + finalsearch;
 }
 else if(searchfor.match(getRE(shoppingKeyword)))
 {
   finalsearch = searchfor.substring(shoppingKeyword.length);
   finalhref = searchShoppingUrl + finalsearch;
 }
 else if(searchfor.match(getRE(videoKeyword)))
 {
   finalsearch = searchfor.substring(videoKeyword.length);
   finalhref = searchVideoUrl + finalsearch;
 }
 else if(searchfor.match(getRE(audioKeyword)))
 {
   finalsearch = searchfor.substring(audioKeyword.length);
   finalhref = searchAudioUrl + finalsearch;
 }
 else if(searchfor.match(getRE(directoryKeyword)))
 {
   finalsearch = searchfor.substring(directoryKeyword.length);
   finalhref = searchDirectoryUrl + finalsearch;
 }
 else 
 {
   preventDefault = 0;
 }
 //window.location = encodeURIComponent(finalhref);
 window.location = finalhref;
}

function routeGoogleSearch(event)
{
 var txtBox = (document.getElementsByName("q"))[0];
 if(txtBox) searchfor = txtBox.value;
 else preventDefault = 0;

 l = document.getElementsByName('hl');
 lang = l[0].value;

 webKeyword = 'web:';
 imageKeyword = 'image:';
 groupKeyword = 'group:';
 newsKeyword  = 'news:';
 froogleKeyword = 'froogle:';
 //localKeyword = 'local:';
 videoKeyword = 'video:';
 scholarKeyword = 'scholar:';
 linuxKeyword = "linux:";

 searchWebUrl = 'http://www.google.com/search?hl=' + lang + '&btnG=Google+Search&q=';
 searchImageUrl = 'http://images.google.com/images?hl=' + lang + '&btnG=Google+Search&sa=N&tab=wi&q=';
 searchGroupUrl = 'http://groups.google.com/groups?hl=' + lang + '&qt_s=Search&q=';
 searchNewsUrl = 'http://news.google.com/news?hl=' + lang + '&btnG=Google+Search&sa=N&tab=in&q=';
 searchFroogleUrl = 'http://froogle.google.com/froogle?hl=' + lang + '&ie=UTF-8&sa=N&tab=nf&q=';
 //searchLocalUrl = 'http://local.google.com/local?ie=UTF-8&sa=N&tab=fl&q=';
 searchVideoUrl = 'http://video.google.com/videosearch?q=';
 searchScholarUrl = 'http://scholar.google.com/scholar?ie=UTF-8&oe=UTF-8&hl=' + lang + '&btnG=Search&q=';
 searchLinuxUrl = 'http://www.google.com/linux?ie=UTF-8&oe=UTF-8&hl=' + lang + '&btnG=Search&q=';

 var finalsearch;
 var finalhref;
 if(searchfor.match(/^\\/))
 {
   txtBox.value = searchfor.substring(1);
   preventDefault = 0;
 }
 else if(searchfor.match(getRE(webKeyword)))
 {
   finalsearch = searchfor.substring(webKeyword.length);
   finalhref = searchWebUrl + finalsearch;
 }
 else if(searchfor.match(getRE(imageKeyword)))
 {
   finalsearch = searchfor.substring(imageKeyword.length);
   finalhref = searchImageUrl + finalsearch;
 }
 else if(searchfor.match(getRE(groupKeyword)))
 {
   finalsearch = searchfor.substring(groupKeyword.length);
   finalhref = searchGroupUrl + finalsearch;
 }
 else if(searchfor.match(getRE(newsKeyword)))
 {
   finalsearch = searchfor.substring(newsKeyword.length);
   finalhref = searchNewsUrl + finalsearch;
 }
 else if(searchfor.match(getRE(froogleKeyword)))
 {
   finalsearch = searchfor.substring(froogleKeyword.length);
   finalhref = searchFroogleUrl + finalsearch;
 }
 else if(searchfor.match(getRE(videoKeyword)))
 {
   finalsearch = searchfor.substring(videoKeyword.length);
   finalhref = searchVideoUrl + finalsearch;
 }
 else if(searchfor.match(getRE(scholarKeyword)))
 {
   finalsearch = searchfor.substring(scholarKeyword.length);
   finalhref = searchScholarUrl + finalsearch;
 }
 else if(searchfor.match(getRE(linuxKeyword)))
 {
   finalsearch = searchfor.substring(linuxKeyword.length);
   finalhref = searchLinuxUrl + finalsearch;
 }
 else 
 {
   preventDefault = 0;
 }
 //window.location = encodeURIComponent(finalhref);
 if(preventDefault) window.location = finalhref;
}

function setupHandler()
{
  if(window.location.href.match(/\.google\.co/))
  {
    var btn = document.evaluate("//input[@type='submit']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i = 0; i < btn.snapshotLength; i++) {
      btn.snapshotItem(i).addEventListener('click',routeSearch,false);
    }      
    
  }
  if(window.location.href.match(/\.yahoo\.co/))
  {
    var btn = document.evaluate("//input[@type='submit']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i = 0; i < btn.snapshotLength; i++) {
      btn.snapshotItem(i).addEventListener('click',routeSearch,false);
    }      
  }
}

setupHandler();
