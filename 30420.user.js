// ==UserScript==
// @name           Twitter Enhancements: Mark Read Items
// @namespace      http://twitter.com
// @description    Mark read tweets using a customizable background color.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @author         Ziru
// ==/UserScript==

const gblBackgroundColorForReadItems = '#DDD7DF';

const gblEnableDebugLog = false;
function debug(msg) { if (gblEnableDebugLog) GM_log(msg); }

// ==============  Twitter Page Utils Begins ============= 
TwitterPage = {
  init: function(bAppendPageNumToTitle) {
    this.pageType = document.body.id;
    this.statusElem = document.getElementById("status");
    
    var metaElems = document.getElementsByTagName('meta');
    for (var i = 0; i < metaElems.length; i++) {
      if (metaElems[i].name == 'page')
        this.curPageNum = parseInt(metaElems[i].content);
      else if (metaElems[i].name == 'page-user-screen_name')
        this.pageUserName = metaElems[i].content;
      else if (metaElems[i].name == 'session-user-screen_name')
        this.sessionUserName = metaElems[i].content;
    }
    
    if (!bAppendPageNumToTitle) return;
    var pagePrefix = ' - Page ';
    if ((this.curPageNum != undefined) && (document.title.indexOf(pagePrefix) == -1))
      document.title = document.title + pagePrefix + this.curPageNum;
  },
  
  getExpandedUrl: function() {
    if (this.expandedUrl != undefined) return this.expandedUrl;
    url = document.location.href;
    var re = /^(https?:\/\/twitter.com\/).*$/;
    this.expandedUrl = '';
    if (this.pageType == 'home') {
      this.expandedUrl = re.exec(url)[1] + 'home';
    } else if (this.pageType == 'replies') {
      this.expandedUrl = re.exec(url)[1] + 'replies';
    } else if (this.pageType == 'profile') {
      this.expandedUrl = re.exec(url)[1] + this.pageUserName + '/';
    } else if (this.pageType == 'favorites') {
      this.expandedUrl = re.exec(url)[1] + 'favorites';
    } else if (this.pageType == 'profile_favorites') {
      this.expandedUrl = re.exec(url)[1] + this.pageUserName + '/favorites';
    } else if (this.pageType == 'inbox') {
      this.expandedUrl = re.exec(url)[1] + 'inbox';
    } else if (this.pageType == 'sent') {
      this.expandedUrl = re.exec(url)[1] + 'sent';
    }
    return this.expandedUrl;
  },
  
  getPrevPageUrl: function() {
    if (this.getExpandedUrl() == '') return;
    if ((this.curPageNum == undefined) || (this.curPageNum == 1)) return;
    return this.getExpandedUrl() + '?page=' + (this.curPageNum - 1);
  },
  
  getNextPageUrl: function() {
    if (this.getExpandedUrl() == '') return;
    if (this.curPageNum == undefined) return;
    return this.getExpandedUrl() + '?page=' + (this.curPageNum + 1);
  },
  
  isStatusEmpty: function() { return (this.statusElem && this.statusElem.value == ''); }
};
// ==============  Twitter Page Utils Ends ============= 

function updateCurrentReadStatus(statusId) {
  GM_setValue('currentReadStatusId', statusId);
  GM_setValue('currentReadStatusSession', Date.now().toString());
  debug('updateCurrentReadStatus: ' + statusId);
}

function updateLastReadStatus() {
  var currentReadStatusId = GM_getValue('currentReadStatusId', '')
  if (currentReadStatusId == '') return;
  GM_setValue('lastReadStatusId', currentReadStatusId);
  GM_setValue('lastReadStatusSession', GM_getValue('currentReadStatusSession', ''));      // Date.now().toString()
  debug('updateLastReadStatus: ' + currentReadStatusId);
}

function getStatusId(entryElem) {
  var m = /^status_(\d+)$/.exec(entryElem.id);
  if (m) return m[1];
  else debug('ERROR! Failed to extract status id for such twitter entry: id = ' + entryElem.parentNode.id);
}

// ==============  HACK for Google Chrome ============= 
if (!window.GM_setValue) {
  GM_setValue = function(name, value) {
    var date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));   // expires one-year later
    var expires = "; expires="+date.toGMTString();
    document.cookie = name + "=" + value + expires + "; path=/";
  };
}

if(!window.GM_getValue) {
  GM_getValue = function(name, defaultValue) { 
    var nameEQ = name + "=";
    var cookieArr = document.cookie.split(';');
    for(var i=0;i < cookieArr.length;i++) {
      var cookie = cookieArr[i];
      cookie = cookie.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      if (cookie.indexOf(nameEQ) == 0)
        return cookie.substring(nameEQ.length, cookie.length);
    }
    return defaultValue;
  };
}

// =================  MAIN ================= 
TwitterPage.init(true);
if (TwitterPage.pageType != 'home') return;
if (!TwitterPage.isStatusEmpty()) return;
var entryElems = document.getElementsByClassName('hentry');
if (!entryElems) return;

var lastReadStatusSession = GM_getValue('lastReadStatusSession', '');
if (TwitterPage.curPageNum == 1) {
  updateLastReadStatus();
  updateCurrentReadStatus(getStatusId(entryElems[0]));        // store the current read status when opening the user's first twitter page
}
var lastReadStatusId = GM_getValue('lastReadStatusId', '');
var markReadItems = (lastReadStatusId != '');

var hasReadItems = false;
for (var i = 0; i < entryElems.length; i++) {
  var entry = entryElems[i];
  if (markReadItems && (getStatusId(entry) <= lastReadStatusId)) {
    // mark the entries which have been read using a different background color
    entry.style.backgroundColor = gblBackgroundColorForReadItems;
    hasReadItems = true;
  }
}

if (hasReadItems) updateLastReadStatus();