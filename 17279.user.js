// ==UserScript==
// @name           Facebook Scrabulous Ad Remover
// @description    Removes ads from the Scrabulous application interface on Facebook.
// @author         Matt Dolan
// @namespace      http://www.mgdproductions.co.uk
// @include        http://apps.facebook.com/scrabulous/*
// @include        http://74.54.87.124/facebook/*
// ==/UserScript==

function getElementsByClassName(className, tag, elm){
  var testClass = new RegExp("(^|\\\\s)" + className + "(\\\\s|$)");
  var tag = tag || "*";
  var elm = elm || document;
  var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
  var returnElements = [];
  var current;
  var length = elements.length;
  for(var i=0; i<length; i++){
    current = elements[i];
    if(testClass.test(current.className)){
      returnElements.push(current);
    }
  }
  return returnElements;
}

function up (el,tagName) {
  if ((!el) || (!el.parentNode)) return false;
  el = el.parentNode;
  tagName = tagName.toUpperCase();

  while ((el.tagName!=tagName) && (el.parentNode))
    el = el.parentNode;
  if ((el) && (el.tagName==tagName))
    return el;
  else
    return false;
}

function next (el,tagName) {
  if ((!el) || (!el.nextSibling)) return false;
  el = el.nextSibling;
  tagName = tagName.toUpperCase();

  while ((el.tagName!=tagName) && (el.nextSibling))
    el = el.nextSibling;
  if ((el) && (el.tagName==tagName))
    return el;
  else
    return false;
}



  // Remove all iframes
  var iframes = document.getElementsByTagName("iframe");
  for (var i = iframes.length-1; i>=0; i--) {
    if (iframes[i].src.indexOf('facebook/?action=viewboard')==-1)  // don't delete the iframe containing the whole thing!
      iframes[i].parentNode.removeChild(iframes[i]);
  }
  
  // Remove all divs with an ID containing 'banner'
  els = document.getElementsByTagName('div');
  for (var i=els.length-1;i>=0;i--) {
    if (els[i].id.toLowerCase().indexOf('banner')!=-1)
      els[i].parentNode.removeChild(els[i]);
  }


  // stuff to do only on the Facebook page ****************
  if (document.body.className=='fbframe') {
       iframes = document.getElementsByTagName('iframe');
       if ((iframes) && (iframes.length>0)) {
         iframes[0].style.height='580px';
         iframes[0].style.overflow = 'hidden';
       }
  }
  //*****************


  // stuff to do only on the Scrabulous 'viewboard' page **************
  if (document.location.href.indexOf('viewboard')!=-1) {

    // remove the top ad, and reposition the header (logo and buttons)
    tm = getElementsByClassName('topmenu');
    if (tm.length>0) {
      var t = up(tm[0],'div');
      if (t) {
        t.parentNode.insertBefore(tm[0],t);
        t.parentNode.removeChild(t);
        tm[0].style.marginLeft = '10px';
      }
    }


    els = document.getElementsByTagName('table');
    for (var i=els.length-1;i>=0;i--) {
        els[i].parentNode.removeChild(els[i]);
    }


    // remove a couple of bits under the board
    var e = next(document.getElementById('flashcontent'),'center');
    if (e) e.parentNode.removeChild(e);
    var e = next(document.getElementById('flashcontent'),'table');
    if (e) e.parentNode.removeChild(e);

    // Remove text ads (needed when, eg. the 'alernate screen' is shown)
    var els = document.getElementsByTagName('a');
    for (var i=els.length-1;i>=0;i--)
      if (els[i].href.indexOf('/facebook/rotate/click.php')!=-1)
        els[i].parentNode.removeChild(els[i]);

//fbswf
  }
  //*****************