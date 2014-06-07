// ==UserScript==
// @name           3 Salon Letters on One Page
// @namespace      ~rmm
// @description    Put all Salon comment 'letters' on one page. This also can do the same for all letters from any sub-page onwards. Occasionally this script does not recognize that a sub page has loaded and you will see an unconverted frame - in this case there will be a pink message you can click on to reload such sub-pages. When letters are displayed in oldest first order, there will be a pink message near the bottom you can click on to check for new comments. This action will just reload the last sub-page inline and avoid having to reload all the other sub-pages which would happen if you refreshed the top level page. This can save a good deal of time if there are lots of sub-pages. Every page seen by this script gets a small purple bar placed at the top of the page. Try reloading the page if the bar is not present. There seem to be a few bugs in Firefox or Greasemonkey which are causing the above problems -- they are being investigated
// @include        http://letters.salon.com/*
// @include        http://www.salon.com/*
// ==/UserScript==

// Copyright (c) 2007 Roderick M McGuire

Debug = true; // set this to "true" to see some messages in the Error Console.

function myGM_log(arg){
 if (Debug) GM_log(arg);
}
function Main(){
 var host = document.location.host;
 var hash = document.location.hash;
 if (host == 'www.salon.com'){
  slapNoticeOnTopOfPage('Greasemonkey active on a <b>www.salon.com</b> page', 'salonLoad',
   'font-size: 7pt; background-color: rgb(230, 220, 255)');
  mungSalonPage();
  return;
  }
 if (hash == '#asIframe'){
  slapNoticeOnTopOfPage('Loaded as an IFRAME', 'iFrameNote',
   'font-size: 20pt; background-color: rgb(230, 220, 255)');
  unsafeWindow.iframeLoaded = true;
  return;
  }
 if (host == 'letters.salon.com'){
  slapNoticeOnTopOfPage('Greasemonkey active on a <b>letters.salon.com</b> page',
   'lettersLoad', 'font-size: 7pt; background-color: rgb(230, 220, 255)');
  if (hash == '#lastPage'){
   var lastNo = findLastPageNo(document);
   if (lastNo != 1) return document.location.pathname = pageHref(lastNo); // will cause a reload
   }
  mungSideBar();
  if (!XP_firstNode(document, LetterPageToolsP)) return;  // not a real 'letters' page.
  mungLettersPage();
  }
}
// this lets me see if Greasemonkey has seen a page.
function slapNoticeOnTopOfPage(text, class, style){
 var ddiv = document.createElement('div');
 ddiv.innerHTML = '<div id="' + class + '">' + text + '</div>';
 GM_addStyle('#' + class + ' {' + style + '}');
 document.body.insertBefore(ddiv.firstChild, document.body.firstChild);
}

// this sort of delay sometimes seems to prevent some mysterious problems 
// though I shouldn't have to do this.
window.addEventListener('load', Main, false);

function newDiv(){
 return document.createElement('div');
}
function XP_orderedSnapshot(node, xpath, namespaceResolver){
 return document.evaluate(xpath,
  node, namespaceResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function XP_firstNode(node, xpath, namespaceResolver){
 return document.evaluate(xpath,
  node, namespaceResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
//========================
//
// www.salon.com STUFF
//
//=======================

function mungSalonPage(){
 var sidebarLIsP 
  ="//div[@id='content_sidebar_column']/div[@class='greenwald_sidebar_group' and @id='current_greenwald']/ul/li";
 var sSnap = XP_orderedSnapshot(document, sidebarLIsP);
 for (var i=0; i<sSnap.snapshotLength; i++){
  var li = sSnap.snapshotItem(i);
  li.appendChild(showLettersDiv(li));
 }
 GM_addStyle('.showLetters {background-color: rgb(255, 220, 255)}'); // pink
}
function showLettersDiv(li){
 var href = XP_firstNode(li, './a/@href').nodeValue;
 href = href.replace('index.html','view/index1.html');
 href = href.replace(/http\:\/\/www.salon.com/, '');
 href = 'http://letters.salon.com' + href;
// if(!confirm('href = ' + href)) throw "bail out";
 var dumd = newDiv();
 dumd.innerHTML = '<div>'  
  + '<a class="showLetters" href="' + href + '?show=all&order=asc">'
  + 'All</a> or <a class="showLetters" href="' + href + '?show=ec&order=asc'
  + '">Editors\' choices</a> or '
  + '<a class="showLetters" href="' + href + '?show=all&order=asc#lastPage">Last</a> comments</div>';
 return dumd.firstChild;
}
//------------------------------
//
// letters.salon.com STUFF
//
//------------------------------
// the sitewise url for the first letter page can be any of 
//  http://letters.salon.com/opinion/greenwald/2007/02/14/neoconservatism/view/?show=all
//  http://letters.salon.com/opinion/paglia/2007/02/14/return/view/index.html
//  http://letters.salon.com/opinion/paglia/2007/02/14/return/view/index1.html

function topHref(){
 var path = document.location.pathname;
 path = path.replace(/\/view\/$/, '/view/index1.html');
 path = path.replace('/index.html', '/index1.html');
 return path;
}
LetterPageToolsP = "//div[@id='main_content']/div[@class='letter_page_tools']";

function giveLPTsIds (){ // so we can distinguish the top from the bottom.
 var snap =  XP_orderedSnapshot(document, LetterPageToolsP);

 var ids = ['topLPT', 'bottomLPT'];
 for (i=0; i<=1; i++){
  lptD = snap.snapshotItem(i);
  lptD.setAttribute('id', ids[i]);
  }
}
function mungSideBar(){
 var lisSnap 
  = XP_orderedSnapshot(document, "//div[@class='sidebar_group' and @id='current']/ul/li");
 for (var i=0; i<lisSnap.snapshotLength; i++){
  var li = lisSnap.snapshotItem(i);
  var d =  showLettersDiv(li);
  li.replaceChild(d, li.lastChild);
 }
 GM_addStyle('.showLetters {background-color: rgb(255, 220, 255)}'); // pink
}
function mungLettersPage(){
 var firstLetter = XP_firstNode(document, '//div[@class="letter_entry" and .//p]');
 if (!firstLetter) return;                     // incase not a real 'letters' page
 giveLPTsIds(); // give the <div class='letter_page_tools'>s ids.
 if (document.location.hash == '#singlePage') return;
 GM_addStyle('.subPageHead {background-color: rgb(220, 200, 255);}'); // purple
 GM_addStyle('.spReload    {background-color: rgb(255, 220, 255);}'); // pink
 GM_addStyle('.spReload    {margin-right: 2em; margin-left: 2em;}');
 GM_addStyle('#checkNew    {margin-bottom: 1em}');

 updateLPT(findLastPageNo(document)); // this is here just to make sure this function works.

 var dumd = newDiv();
 var link = topHref();
 var pageNo = urlPageNo(link);
 dumd.innerHTML
  = '<div class="subPage" id="topPage">'
  +  '<div class="subPageHead"> Show '
  +   '<a href="' + link + '#singlePage"><b>Page ' + pageNo + ' (only)</b></a>'
  +    ' or <a href="' + link + '"><b>Page ' + pageNo + '+</b></a>'
  +    ' (which is this page)' 
  +    '<span class="spReload">[[click to reload unconverted subpages]]'
  +   '</span></div>';
 var spDiv = dumd.firstChild;
 addClickFunction(spDiv, subPageClick);
 firstLetter.parentNode.insertBefore(spDiv, firstLetter);
 addClickFunction(spDiv, subPageClick);
 addFollowingPages();
}
function urlPageNo(href){
 var no = 1;
 var mat = href.match(/\/.*\/index(\d+)\.html/);
 if(mat) no = Number(mat[1]);
 return no;
}
function findLastPageNo(doc){
 var pageNo = urlPageNo(topHref());
 var lptD = XP_firstNode(doc, LetterPageToolsP);
 if (!lptD) return 1;                            // might not be a 'real' letters page
 var snap = XP_orderedSnapshot(lptD, './/a/@href');
 for (var i=0; i<snap.snapshotLength; i++){
  var no = urlPageNo(snap.snapshotItem(i).nodeValue);
  if (no > pageNo) pageNo = no;
  }
 return pageNo;
}
// this will update the <div class='letter_page_tools'>s for when a subpage says
// there are new subpages.
function updateLPT(lastPageNo){
 var lptSnap = XP_orderedSnapshot(document, LetterPageToolsP);
 for (var j=0; j<lptSnap.snapshotLength; j++){
  var lptDiv = lptSnap.snapshotItem(j);
  var newLPT 
   = rebuildLPT(topHref(), urlPageNo(topHref()), lastPageNo);
  lptDiv.replaceChild(newLPT, lptDiv.firstChild);
  }
}

function rebuildLPT(href, thisPageNo, lastPageNo){
 function buildPageA (pageNo,hrefPre, text){
   var dum = document.createElement('div');
   dum.innerHTML = '<a href="' + hrefPre + pageNo + '.html"> ' + text + ' </a>';
   return dum.firstChild;
   }
 var hrefPrefix = topHref().replace(/\d*.html/, '');
 var ldiv = document.createElement('div');
 ldiv.innerHTML = 'Page ';
 if (thisPageNo != 1)
  ldiv.appendChild(buildPageA(thisPageNo-1, hrefPrefix, " << Prev \nPage ")); 
 for (var i=1; i<= lastPageNo; i++){
  if (i == thisPageNo){
   var dum = document.createElement('div');
   dum.innerHTML = '<span class="thispagenum"> ' + i + ' </span>';
   ldiv.appendChild(dum.firstChild);
   }
  else ldiv.appendChild(buildPageA(i, hrefPrefix, i));
 }
 if (thisPageNo != lastPageNo)
  ldiv.appendChild(buildPageA(thisPageNo+1, hrefPrefix, " Next Page >> "));
 return ldiv;
}
// are letters in ascending order?
function lettersAscend(){
 var button = XP_firstNode(document, "//input[@id='asc_letters_radio']/@checked");
 if (button) return (button.nodeValue == 'checked');
 if (topHref().match(/\/author\//)) return false;  // if on a author page
 return true;
}
LastSubPageDiv = null; // nothing untill any subpages are added.

function addFollowingPages(){
 var bottomToolsDiv = XP_firstNode(document, '//div[@id="bottomLPT"]');
 if (!bottomToolsDiv) return;  // we may not be on a 'real' letters page.

 // insert a SubPages div
 var ddiv = document.createElement('div');
 ddiv.innerHTML = '<div id="SubPages">';
 SubPagesDiv = ddiv.firstChild;  // GLOBAL
 bottomToolsDiv.parentNode.insertBefore(SubPagesDiv, bottomToolsDiv);
 addNewCommentCheck();

 // insert Iframes that will eventually be converted to plain comments.
 // Glenn's letters = http://letters.salon.com/ed5ca3007d7ae628dd365be552a7b6eb/author/index.html
 var topPageNo = urlPageNo(topHref());
 var lastPageNo = findLastPageNo(document);
 var askConfirm = topHref().match(/\/author\//); // confirm showing all of an author's letters
 for (var i=topPageNo+1; i<=lastPageNo; i++){
  if (askConfirm){
   askConfirm = false;
   if(!confirm('show following pages of this author\'s letters?')) return convertSubPages();
   }

  addSubPage(pageHref(i), i);
  }
 convertSubPages();
}

function addNewCommentCheck(){
 var dumDiv = document.createElement('div');
 var href = topHref();
 var pageNo = urlPageNo(href);
 dumDiv.innerHTML 
  = '<div id="checkNew" class="subPageHead">'
  + '<span class="spReload">[[click here to check for new comments]]</span>'
  + '(this link will show '
  + '<a href="' + href +'#singlePage"><b>Page ' + pageNo + ' (only)</b></a>)</div>';
 var checkDiv = dumDiv.firstChild;
 SubPagesDiv.parentNode.insertBefore(checkDiv, SubPagesDiv.nextSibling);
 addClickFunction(checkDiv, newCommentsClick, !lettersAscend());
}
function addClickFunction(spDiv, funct, hide){
 var reloadS = XP_firstNode(spDiv, './/span[@class="spReload"]');
 reloadS.setAttribute('title', 'click here');
 reloadS.addEventListener('click', funct, false);
 if (hide) reloadS.style.display = 'none';
}
function addSubPage(link, pageNo){
 var dumDiv = document.createElement('div');
 dumDiv.innerHTML 
  = '<div class="subPage">'
  +  '<div class="subPageHead"> Show '
  +   '<a href="' + link + '#singlePage"><b>Page ' + pageNo + ' (only)</b></a>'
  +    ' or <a href="' + link + '"><b>Page ' + pageNo + '+</b></a>'
  +    '<span class="spReload">[[click to reload unconverted subpages]]</span></div>';
  var spDiv = dumDiv.firstChild;
  spDiv.setAttribute('href', link);
  SubPagesDiv.appendChild(spDiv);
  initSubPageContents(spDiv, link);
  addClickFunction(spDiv, subPageClick);
  LastSubPageDiv = spDiv;
  SuckDelay = 1;
}
function newCommentsClick(){
 if (LastSubPageDiv){
  ClickYScroll = window.scrollY; // remember pos before reloaded 
  initSubPageContents(LastSubPageDiv);
  setReloadVisable('');
  SuckDelay = 1;
  convertSubPages();
 }
 else document.location.reload();  // could put scrollY into the hash.
}
ClickYScroll = -1;  // place to scroll back to init undefined

function subPageClick(){
 myGM_log('\subPageClick - a.k.a trying to force sub-pages to convert');
 ClickYScroll = window.scrollY; // remember pos before reloaded
 try {
  convertSubPages(); // convert now if waiting for timeout 
  }
 catch (e){
//  alert(e);
  }
// Above does not work if using window.iframeLoaded flag. if error message was 
//   [Exception... "'Permission denied to get property Window.iframeLoaded' when calling method: [nsIDOMEventListener::handleEvent]" nsresult: "0x8057001e (NS_ERROR_XPC_JS_THREW_STRING)" location: "<unknown>" data: no]
// then that will just recause the error.
// Reloading the iframes seems to fix the problem.
// using iframe.contentDocument.getElementById can give error message:
//  uncaught exception: Permission denied to get property HTMLDocument.getElementById
 var snap = XP_orderedSnapshot(SubPagesDiv, './div[@class="subPage" and .//iframe]');
 var nIframes = snap.snapshotLength;
 for (var i=0; i<snap.snapshotLength; i++){
  initSubPageContents(snap.snapshotItem(i))
  }
 SuckDelay = 1;
 convertSubPages();
}
function initSubPageContents(subPage){
 var href = subPage.getAttribute('href');
 var oldC = XP_firstNode(subPage, './div[@class = "spContent"]');
 if (oldC) subPage.removeChild(oldC);
 var dum = document.createElement('div');
 dum.innerHTML 
  = '<div class="spContent"><div>**WAITING**<iframe src="http://letters.salon.com' + href + '#asIframe"></div></div>';
// myGM_log('\n want an IFRAME: href = ' + href);
 var cDiv = dum.firstChild;
 subPage.appendChild(cDiv);
 logIframeLoad(XP_firstNode(cDiv, './/iframe'));
 return cDiv;
}
function logIframeLoad(iframe){
 iframe.addEventListener('load', function(){iframeLoaded(iframe);}, false);
}
function iframeLoaded(iframe){
 myGM_log('\niframe loaded: ' + iframe.src);
 convertSubPages();
}
SuckTimeout = null;  // initially there is no active timeout
SuckDelay = 1;       // 1 second initial delay for re-sucking

function pageHref(n){
 return topHref().replace(/\/index\d+.html/, '/index' + n + '.html');
}
function convertSubPages(){
 try {convertSubPages_1();}
 catch (e) {
//  alert('convertSubPages caught Exception: ' + e);
  myGM_log('\n convertSubPages caught: ' + e);
 }
}
function convertSubPages_1(){
 if (SuckTimeout) clearTimeout(SuckTimeout);
 var snap = XP_orderedSnapshot(SubPagesDiv, './/div[@class="spContent" and .//iframe]');
 var nIframes = snap.snapshotLength;
 var nConverted = 0;
 var newPages = false; // no new comment pages found.
// if (!confirm('sucking ' + nIframes + ' iframes')) return;
 for (var i=0; i<snap.snapshotLength; i++){
  var spContent = snap.snapshotItem(i);
  var iframe = XP_firstNode(spContent, './div/iframe');
//  if (iframe.contentWindow.wrappedJSObject.iframeLoaded){
  if (iframe.contentDocument.getElementById('iFrameNote')){
   cloneLetters(iframe.contentDocument, spContent);
   var currentLastPage = findLastPageNo(document);
   var spLastPage = findLastPageNo(iframe.contentDocument);
   if (spLastPage > currentLastPage){
//    if(!confirm('new pages: current = ' + currentLastPage + ', new: ' + spLastPage)) throw "get out";
    for (var j=currentLastPage+1; j<=spLastPage; j++){
     addSubPage(pageHref(j), j, false);
     }
    updateLPT(spLastPage);
    newPages = true;
    SuckTimeout = 1;
    }
   spContent.removeChild(iframe.parentNode);
   nConverted += 1;
   }
  }
 // if done then scroll to previous position and quit.
 if (!newPages && (nIframes == nConverted)){
  setReloadVisable('none');
  if (ClickYScroll > 0){
   window.scrollTo(0, ClickYScroll);
   ClickYScroll = -1;
   }
  return;
  }
 // else continue to wait for IFRAMEs and suck them in.
 SuckDelay = SuckDelay*1.5;
 myGM_log('\n '+ SuckDelay +' seconds until next check on ' + topHref());
 SuckTimeout = setTimeout(convertSubPages, SuckDelay*1000); // try again in n seconds
}
function setReloadVisable(vis){
 var msnap = XP_orderedSnapshot(SubPagesDiv, '//span[@class="spReload"]');
 msL = msnap.snapshotLength;
 for (var i=0; i<msL-1; i++){
  msnap.snapshotItem(i).style.display = vis;
 }
} 
function cloneLetters(doc, lettersDiv){
 var cloneP 
  = "//div[@id='main_content']/div[(@class='letter_entry' and .//p) or @class='ad_content']";
 var snap = XP_orderedSnapshot(doc, cloneP);
 for (var i=0; i<snap.snapshotLength; i++){
  // I don't know if I really have to clone nodes out of an iframe or just take them
  lettersDiv.appendChild(snap.snapshotItem(i).cloneNode(true));  
  }
}
// FINIS
