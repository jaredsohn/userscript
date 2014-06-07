// Google Reader Facebook Sharer
//
//Places an expandable Facebook Sharer into each Google Reader item so that websites 
//can be shared with Facebook friends and on a Facebook profile from Reader with a couple clicks (includes image attachment).
//
// Based on the Google Reader Preview Enhanced (GPE) by Julien CAROSI
//
// ==UserScript==
// @name           Share with Facebook in Google Reader
// @description    Adds a "Preview button" that allows you to view actual article in a frame. Clicking again on that button goes back to RSS view. Does work both in List view and expanded view.
// @namespace      http://userscripts.org/scripts/show/63997
// @include        https://*.google.com/reader*
// @include        http://*.google.com/reader*
// ==/UserScript==

//Update of the script Facebook Sharer + Google Reader By Thadk 
//http://userscripts.org/scripts/show/9594

function getFirstElementMatchingClassName(root, tag, class) {
  var elements = root.getElementsByTagName(tag);
  var i = 0;
  while (elements[i] && !elements[i].className.match(class)) {
    i++;
  }
  return ((!elements[i]) ? null : (elements[i]));
}

function getElementsByClassName(root, tag, class) {
  var elements = root.getElementsByTagName(tag);
  var results = new Array();
  for ( var i = 0; i < elements.length; i++) {
    if (elements[i].className.indexOf(class) > -1) {
      results.push(elements[i]);
    }
  }
  return (results);
}

function findParentNode(el, tag, class) {
  el = el.parentNode;
  if (arguments.length == 3) {
    // Find first element's parent node matching tag and className
    while (el.nodeName.toLowerCase() != 'body'
        && (el.nodeName.toLowerCase() != tag || (el.className != class && el.className.indexOf(class + ' ') == -1))) {
      el = el.parentNode;
    }
    return ((el.nodeName.toLowerCase() != 'body') ? el : false);
  } else {
    // Find first element's parent node matching tag
    while (el.nodeName.toLowerCase() != 'body' && el.nodeName.toLowerCase() != tag) {
      el = el.parentNode;
    }
    return ((el.nodeName.toLowerCase() != 'body') ? el : false);
  }
}

function catchEntryAdded(e) {
  var entry = e.target;
  var el;
  if (entry.nodeName == 'DIV' && entry.className.indexOf('entry') > -1) {
    if (entry.className.indexOf('entry-actions') > -1) {
      // Expanding article in list view
      el = entry;
      entry = findParentNode(el, 'div', 'entry');
      addFacebookButton(entry, el);
    } else {
      // Adding article in expanded view
      el = getFirstElementMatchingClassName(entry, 'div', 'entry-actions');
      addFacebookButton(entry, el);
    }
  }
}

function addFacebookButton(entry, el) {
  var span = document.createElement('span');
  span.className = 'read-state-not-kept-unread read-state link unselectable';
  span.innerHTML = 'Share to Facebook';
  el.appendChild(span);
  span.addEventListener('click', facebookSharer, false);
}

function calcEntryIndex(e) {
  var index = 0;
  while (e.previousSibling) {
    index++;
    e = e.previousSibling;
  }
  return index;
}

function facebookSharer(e) {
  var el = e.target;
  var entry = findParentNode(el, 'div', 'entry');
  var index = calcEntryIndex(entry);
  var facebookSharer;

  // Update entry with preview mode, need to do it before scrolling, because
  // scrolling will repaint preview button (list view only)
  if (entry.className.indexOf('facebookSharer') == -1) {
    entry.className = entry.className + ' facebookSharer';
    el.className = el.className.replace('read-state-not-kept-unread', 'read-state-kept-unread');
    facebookSharer = true;
  } else {
    entry.className = entry.className.replace('facebookSharer', '');
    el.className = el.className.replace('read-state-kept-unread', 'read-state-not-kept-unread');
    facebookSharer = false;
  }

  // Need to scroll before changing entry-body, because scrolling repaints
  // article from scratch (list view only)
  // scrollTo(index);

  root = getEntryDOMObject(index);
  var body = getFirstElementMatchingClassName(entry, 'div', 'entry-body');

  if (facebookSharer) {
    // iframe creation/display
    var iframe = getFirstElementMatchingClassName(entry, 'iframe', 'facebookSharer');
    if (iframe) {
      // iframe already in document, display it
      iframe.style.display = 'block';
    } else {
      // iframe not in document, create it
      iframe = document.createElement('iframe');
      iframe.setAttribute('width', '650px');
      iframe.setAttribute('height', '350px');
      iframe.setAttribute('name', 'fred');
      iframe.setAttribute('target', 'fred');
      var shareurl = getFirstElementMatchingClassName(entry, 'a', 'entry-title-link');
      var e = encodeURIComponent;
      var fbsharer = 'http://www.facebook.com/sharer.php?&u=' + e(shareurl.href) + '&t='
          + e(shareurl.textContent);
      iframe.setAttribute('src', fbsharer);
      iframe.className = 'facebookSharer';
      body.appendChild(iframe);
    }

    // Scale article container to fullwidth
    body.setAttribute('style', gpeStyles.entryBody);
  } else {
    // hide iframe
    var iframe = getFirstElementMatchingClassName(entry, 'iframe', 'facebookSharer');
    iframe.style.display = 'none';

    // Go back to initial width
    body.removeAttribute('style', '');
  }
  scrollTo(150, facebookSharer);
}

function getEntryDOMObject(index) {
  // Because of repaint, entry doesn't point to correct DOM object, we need
  // to
  // find entry using index
  var entries = document.getElementById('entries');
  var i = 0;
  entry = entries.firstChild;
  while ((i++) < index) {
    entry = entry.nextSibling;
  }
  return entry;
}

function catchAllEntries() {
  var root = document.getElementById('entries');
  var entries = getElementsByClassName(root, 'div', 'entry');
  for ( var i = 0; i < entries.length; i++) {
    catchEntryAdded({target:entries[i]});
  }
}

function scrollTo(offset, dir) {
  var view = document.getElementById('viewer-container');
  view.scrollTop += ((dir) ? 1 : -1) * offset;
  // Force scrolling to top of article
  // location.href = 'javascript:void(s.V=-1);';
  // location.href = 'javascript:void(s.pf('+index+'));';
}

var gpeStyles = {
  entryBody : 'max-width: 98%'
};

document.body.addEventListener('DOMNodeInserted', catchEntryAdded, false);
//document.addEventListener('load', catchAllEntries, false);
catchAllEntries();

