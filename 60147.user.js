// ==UserScript==
// @name          My Craigslist
// @namespace     http://jeffpalm.com/mycraigslist/
// @description   Allows you to save craigslist postings
// @include       http://*craigslist.org/*
// @include       http://*jeffpalm.com/mycraigslist/manage*
// ==/UserScript==

/*
 * Copyright 2009 Jeffrey Palm.
 */

// ----------------------------------------------------------------------
// State
// ----------------------------------------------------------------------

var saveLinkParent;

const TESTING = true;
const COLOR_GREEN = '#007700';
const COLOR_RED   = '#770000';

// ----------------------------------------------------------------------
// Values
// ----------------------------------------------------------------------

const KEY_PREFIX = "_mycraigslist_";

function getValue(key,defaultValue) {
  if (!defaultValue) defaultValue = "";
  return GM_getValue(KEY_PREFIX+key,defaultValue);
}

function setValue(key,value) {
  GM_setValue(KEY_PREFIX+key,value);
}

function getURLs() {
  var urlsString = getValue("urls","");
  return urlsString.split(/,/);
}

function addURL(url) {
  if (!url) url = String(document.location);
  var urlsString = getValue("urls","");
  if (urlsString.match(new RegExp(url))) return;
  urlsString += "," + url;
  setValue("urls",urlsString);
  var title = getPageTitle(url);
  setValue(url,title);
}

function removeURL(url) {
  if (!url) url = String(document.location);
  var urls = getURLs();
  var newString;
  for (var i=0; i<urls.length; i++) {
    if (urls[i] == url) continue;
    if (newString) newString += ",";
    newString += urls[i];
  }
  setValue("urls",newString);
}

function getPostingTitle(url) {
  return getValue(url);
}
	
// ----------------------------------------------------------------------
// Misc
// ----------------------------------------------------------------------

function $n(tag,on) {
  var e = document.createElement(tag);
  if (on) on.appendChild(e);
  if (arguments.length > 2) setId(e,arguments[2]);
  return e;
}

function $t(text,on) {
  var e = document.createTextNode(text);
  if (on) on.appendChild(e);
  return e;
}

function $(id) {
  if (typeof id == "string") {
    var el = document.getElementById(id);
    return el;
  }
  return id;
}

// ----------------------------------------------------------------------
// Manage
// ----------------------------------------------------------------------

function showPostings() {
  var d = $('postings');
  var urls = getURLs();
  for (var i=0; i<urls.length; i++) {
    var u = urls[i];
    if (!u || typeof(u) == 'undefined') continue;
    var title = getPostingTitle(u);
    if (!title) continue;
    var li = $n('li',d);
    var a;
    a = $n('a',li);
    a.href = u;
    a.innerHTML = title;
    $t(' ',li);
    a = $n('a',li);
    a.href = '#';
    a.innerHTML = 'remove';
    a.style.color = COLOR_RED;
    a.style.fontSize = '0.9em';
    a.addEventListener('click',newRemoveFunction(d,u,li),true);
  }
}

function newRemoveFunction(d,u,li) {
  var _d = d;
  var _u = u;
  var _li = li;
  return function(e) {
    removeURL(_u);
    _d.removeChild(_li);
  };
}

// ----------------------------------------------------------------------
// Craigslist
// ----------------------------------------------------------------------

function getPageTitle() {
  var h2s = document.getElementsByTagName("H2");
  if (h2s.length<1) return "";
  return h2s[0].innerHTML;
}

function showSavedPostings() {
  var as = document.getElementsByTagName("A");
  var urls = getURLs();
  for (var i=0; i<as.length; i++) {
    var a = as[i];
    if (!a.href) continue;
    if (!a.href.match(/\/\d+\.html$/)) continue;
    var re = new RegExp(a.href);
    for (var j=0; j<urls.length; j++) {
      var u = urls[j];
      if (!u) continue;
      if (u.match(re)) {
	a.style.color = COLOR_GREEN;
	break;
      }
    }
  }
}

function insertAddPostingLink(efA) {
  var loc = String(document.location);
  var urls = getURLs();
  var haveIt = false;
  for (var i=0; i<urls.length; i++) {
    var u = urls[i];
    if (u == loc) {
      haveIt = true;
      break;
    }
  }
  saveLinkParent = efA.parentNode;
  if (haveIt) {
    changeToSavedPosting();
  } else {
    changeToUnsavedPosting();
  }
}

function changeToSavedPosting() {
  var text = 'Remove posting';
  var fun = removePosting;
  var color = COLOR_RED;    
  addSaveLink(text,fun,color);
}

function changeToUnsavedPosting() {
  var text = 'Save posting';
  var fun = savePosting;
  var color = COLOR_GREEN;    
  addSaveLink(text,fun,color);
}

function addSaveLink(text,fun,color) {
  var a = $('_addSaveLink');
  if (a) a.parentNode.removeChild(a);
  a = $n('a',saveLinkParent);
  a.id = '_addSaveLink';
  a.innerHTML = text;
  a.href = '#';
  a.addEventListener('click',function(e) {fun();},true);
  a.style.color = color;
}

function savePosting() {
  addURL();
  changeToSavedPosting();
}

function removePosting() {
  removeURL();
  changeToUnsavedPosting();
}

function main() {
  //
  // Determine what kind of page we're on
  //
  if (String(document.location).match(/\/mycraigslist\/manage/)) {
    showPostings();
    return;
  }
  var efA = $('ef');
  if (efA) {
    if (efA.href && efA.href.match(/\/email/)) {
      insertAddPostingLink(efA);
    } else {
      showSavedPostings();
    }
  } else {

  }
}

try {main();} catch (e) {if (TESTING) alert("ERROR:" + e);}