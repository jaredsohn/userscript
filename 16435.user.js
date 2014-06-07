// ==UserScript==
// @name                Keyboard Shortcuts Enhancement for Yahoo/Google/Baidu/Twitter/Jiwai/Flickr/Delicious/FriendFeed
// @namespace           http://twitter.com/ziru
// @description         Press ESC to set/grab focus to/from the search input element; alt+n to switch to news search; alt+w to switch to web search; alt+/ to switch search engine (yahoo<->google); alt+c to switch to baidu search; alt+PgDn for next page; alt+PgUp for previous page
// @include             http://www.google.com/search*
// @include             http://news.google.com/news*
// @include             http://www.google.com/notebook*
// @include             http://mail.google.com/*
// @include             https://mail.google.com/*
// @include             http://search.yahoo.com/search*
// @include             http://news.search.yahoo.com/search*
// @include             http://www.baidu.com/s*
// @include             http://news.baidu.com/ns*
// @include             http://search.twitter.com/*
// @include             https://search.twitter.com/*
// @include             http://twitter.com/*
// @include             https://twitter.com/*
// @include             http://www.flickr.com/*
// @include             http://jiwai.de/*
// @include             http://del.icio.us/*
// @include             http://*delicious.com/*
// @include             http://friendfeed.com/*
// @include             http://*
// @include             https://*
// @author              Ziru
// ==/UserScript==

GenericPageUpDnHandler = {
  displayNewPage: function(bNext) {
    var pos = -1;
    var url = document.location.href;
    var re = /^(.*page=)(\d*)(.*)$/;
    var m = re.exec(url);
    if (m) {
      pos = (m[2] == '') ? 1 : parseInt(m[2]);
    } else {
      var pat = new RegExp('^([^;]*[^\\d]+)(\\d+)([^\\d;]*|[^\\d]*;.*)$');
      m = pat.exec(url);
      if (m) pos = parseInt(m[2]);
    }
    if (!m) return;
    if (bNext) pos = pos +1;
    else pos = pos - 1;
    var newUrl = m[1] + pos + m[3];
    document.location.href = newUrl;
  },  

  onKeyPressed_Alt_PgDn: function(e) {
    this.displayNewPage(true);
  },
  
  onKeyPressed_Alt_PgUp: function(e) {
    this.displayNewPage(false);
  },
}

PageUpDnUtils = {
  displayNewPage: function(startPageArg, bNext, defaultCurStartPos, offset) {
    var url = document.location.href;
    var pat = new RegExp(startPageArg + '=(\\d*)');
    var m = url.match(pat);
    var curStartPos = defaultCurStartPos, newStartPos;
    if (m) curStartPos = parseInt(m[1]);
    if (bNext) newStartPos = curStartPos + offset;
    else {
      if (curStartPos <= defaultCurStartPos) return;
      newStartPos = curStartPos - offset;
    }
    if (newStartPos < defaultCurStartPos) newStartPos = defaultCurStartPos;
      
    var pageArg = startPageArg + '=' + newStartPos;
    if (m) url = url.replace(pat, pageArg);
    else
      if (url.indexOf('?') >= 0 || url.indexOf('&') >= 0) 
        url = url + '&' + pageArg;
      else 
        url = url + '?' + pageArg;
        
    document.location.href = url;
  },  
}

InputBoxHandler = function(inputBox) {
  this.iframeHackElem = null;
  this.iframeHackElem = document.createElement('iframe');
  this.iframeHackElem.id = 'iframeHackElem';
  this.iframeHackElem.src = 'data:application/vnd.mozilla.xul+xml,<window/>';
  this.iframeHackElem.style.display = 'none';
  document.documentElement.appendChild(this.iframeHackElem);
  
  this.inputBox = inputBox;
}

InputBoxHandler.prototype = {
  onKeyPressed_ESC: function(e) {
    this.setSearchBoxFocus(!this.isSearchBoxFocused());
  },
  
  isSearchBoxFocused: function() {
    return this.iframeHackElem && this.iframeHackElem.contentDocument 
      && this.iframeHackElem.contentDocument.commandDispatcher 
      && (this.iframeHackElem.contentDocument.commandDispatcher.focusedElement == this.inputBox);
  },
  
  setSearchBoxFocus: function(bFocus) {
  	if (bFocus) {
  		this.inputBox.focus();
      this.inputBox.select();
  	} else {
  		this.inputBox.blur();
  	}
  },
}

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
    if (TwitterPage.getExpandedUrl() == '') return;
    if (TwitterPage.curPageNum > 1)
      return TwitterPage.getExpandedUrl() + '?page=' + (TwitterPage.curPageNum - 1);
  },
  
  getNextPageUrl: function() {
    if (TwitterPage.getExpandedUrl() == '') return;
    return TwitterPage.getExpandedUrl() + '?page=' + (TwitterPage.curPageNum + 1);
  },
};

TwitterHandler = {
  init: function() {
    this.pageType = 'twitter';
    this.inputBox = document.getElementById("status");
    if (this.inputBox) {
      this.inputBoxHandler = new InputBoxHandler(this.inputBox);
      setTimeout(function() { document.getElementById("status").blur(); }, 200);
      setTimeout(function() { document.getElementById("status").blur(); }, 1000);
      setTimeout(function() { document.getElementById("status").blur(); }, 2000);
    }
  },

  onKeyPressed_ESC: function(e) {
    if (this.inputBoxHandler)
      this.inputBoxHandler.onKeyPressed_ESC(e);
  },
  
  onKeyPressed_Alt_PgDn: function(e) {
    TwitterPage.init();
    var nextUrl = TwitterPage.getNextPageUrl();
    if (nextUrl)
      document.location.href = nextUrl;
  },
  
  onKeyPressed_Alt_PgUp: function(e) {
    TwitterPage.init();
    var prevUrl = TwitterPage.getPrevPageUrl();
    if (prevUrl)
      document.location.href = prevUrl;
  },
}

TwitterSearchHandler = {
  init: function() {
    this.pageType = 'twitterSearch';
    this.inputBox = document.getElementById("searchBox");
    if (this.inputBox) {
      this.inputBoxHandler = new InputBoxHandler(this.inputBox);
    }
  },

  displayNewPage: function(bNext) {
    var pos = 1;
    var url = document.location.href;
    var re = /^(.*page=)(\d*)(.*)$/;
    var m = re.exec(url);
    if (m) {
      pos = (m[2] == '') ? 1 : parseInt(m[2]);
    }
    if (bNext) pos = pos +1;
    else pos = pos - 1;
    var newUrl = (m) ? m[1] + pos + m[3] : url + '&page=' + pos;
    document.location.href = newUrl;
  },  

  onKeyPressed_Alt_PgDn: function(e) {
    this.displayNewPage(true);
  },
  
  onKeyPressed_Alt_PgUp: function(e) {
    this.displayNewPage(false);
  },

  onKeyPressed_ESC: function(e) {
    if (this.inputBoxHandler)
      this.inputBoxHandler.onKeyPressed_ESC(e);
  },
}

JiwaiHandler = {
  init: function() {
    this.pageType = 'jiwai';
    this.inputBox = document.getElementById("jw_status");
    if (this.inputBox) {
      this.inputBoxHandler = new InputBoxHandler(this.inputBox);
      setTimeout(function() { document.getElementById("jw_status").blur(); }, 200);
      setTimeout(function() { document.getElementById("jw_status").blur(); }, 2000);
      setTimeout(function() { document.getElementById("jw_status").blur(); }, 5000);
    }
  },

  onKeyPressed_ESC: function(e) {
    if (this.inputBoxHandler)
      this.inputBoxHandler.onKeyPressed_ESC(e);
  },
  
  onKeyPressed_Alt_PgDn: function(e) {
    PageUpDnUtils.displayNewPage('page', true, 1, 1);
  },
  
  onKeyPressed_Alt_PgUp: function(e) {
    PageUpDnUtils.displayNewPage('page', false, 1, 1);
  },
}

FlickrHandler = {
  init: function() {
    this.pageType = 'flickr';
    this.inputBox = document.getElementById("header_search_q");
    this.inputBoxHandler = new InputBoxHandler(this.inputBox);
  },

  onKeyPressed_ESC: function(e) {
    this.inputBoxHandler.onKeyPressed_ESC(e);
  },
  
  onKeyPressed_Alt_PgDn: function(e) {
    this.displayNewPage(true);
  },
  
  onKeyPressed_Alt_PgUp: function(e) {
    this.displayNewPage(false);
  },
  
  displayNewPage: function(bNext) {
    var curPageNum = 1;
    var url = document.location.href;
    // if the url contains string like /pageX/, return X;
    // otherwise, return default page number 1
    var pat = /\/page(\d*)\//;
    var m = url.match(pat);
    if (m) curPageNum = parseInt(m[1]);

    if (bNext) newPageNum = curPageNum + 1;
    else {
      if (curPageNum <= 1) return;
      newPageNum = curPageNum - 1;
    }
    if (curPageNum < 1) curPageNum = 1;

    var pageArg = '/page' + newPageNum + '/';
    if (m) url = url.replace(pat, pageArg);
    else
      url = url + pageArg;
      
    document.location.href = url;
  },
}

DeliciousHandler = {
  init: function() {
    this.pageType = 'delicious';
    var elems = document.getElementsByName("p");
    if (elems && elems[0]) this.inputBox = elems[0];
    if (this.inputBox) {
      this.inputBoxHandler = new InputBoxHandler(this.inputBox);
    }
  },

  onKeyPressed_ESC: function(e) {
    if (this.inputBoxHandler)
      this.inputBoxHandler.onKeyPressed_ESC(e);
  },
  
  onKeyPressed_Alt_PgDn: function(e) {
    PageUpDnUtils.displayNewPage('page', true, 1, 1);
  },
  
  onKeyPressed_Alt_PgUp: function(e) {
    PageUpDnUtils.displayNewPage('page', false, 1, 1);
  },
}

FriendFeedHandler = {
  init: function() {
    this.pageType = 'friendfeed';
    var elems = document.getElementsByName("q");
    if (elems && elems[0]) this.inputBox = elems[0];
    if (this.inputBox)
      this.inputBoxHandler = new InputBoxHandler(this.inputBox);
    if (document.location.href.indexOf('http://friendfeed.com/search?') < 0 )
      this.numOfResultsPerPage = 30;
    else this.numOfResultsPerPage = 10;
  },

  onKeyPressed_ESC: function(e) {
    if (this.inputBoxHandler)
      this.inputBoxHandler.onKeyPressed_ESC(e);
  },
  
  onKeyPressed_Alt_PgDn: function(e) {
    PageUpDnUtils.displayNewPage('start', true, 0, this.numOfResultsPerPage);
  },
  
  onKeyPressed_Alt_PgUp: function(e) {
    PageUpDnUtils.displayNewPage('start', false, 0, this.numOfResultsPerPage);
  },
}

YahooSearchHandler = {
  init: function() {
    this.pageType = 'yahoo';
    this.inputBox = document.getElementById("yschsp");
    this.inputBoxHandler = new InputBoxHandler(this.inputBox);
    if (document.location.href.indexOf('?') < 0 )
      this.inputBoxHandler.setSearchBoxFocus(true);
  },
  
  onKeyPressed_Alt_N: function(e) {
    if (!isSearchNewsNow()) searchOnYahoo(this.inputBox.value, true);
  },

  onKeyPressed_Alt_W: function(e) {
    if (isSearchNewsNow()) searchOnYahoo(this.inputBox.value, false);
  },

  onKeyPressed_Alt_Slash: function(e) {
    searchOnGoogle(this.inputBox.value, isSearchNewsNow());
  },

  onKeyPressed_Alt_C: function(e) {
    searchOnBaidu(this.inputBox.value, isSearchNewsNow());
  },
  
  onKeyPressed_ESC: function(e) {
    this.inputBoxHandler.onKeyPressed_ESC(e);
  },
  
  onKeyPressed_Alt_PgDn: function(e) {
    PageUpDnUtils.displayNewPage('b', true, 1, this.getNumOfResultsPerPage());
  },
  
  onKeyPressed_Alt_PgUp: function(e) {
    PageUpDnUtils.displayNewPage('b', false, 1, this.getNumOfResultsPerPage());
  },
  
  getNumOfResultsPerPage: function() {
  	var resultsCount = 10;
    if (isSearchNewsNow())
   		resultsCount = document.evaluate("count(//a[@class='yschttl'])", document, null, 1, null).numberValue;
    else
      resultsCount = document.evaluate("count(//a[@class='yschttl'])", document, null, 1, null).numberValue;

    // magic round up
  	if ((resultsCount % 10 > 0) && (resultsCount % 10 < 5))
  		resultsCount = resultsCount - resultsCount % 10;
    if (resultsCount < 5) resultsCount = 10;
  	return resultsCount;
  },
}

GoogleSearchHandler = {
  init: function() {
    this.pageType = 'google';
    this.inputBox = document.getElementsByName('q')[0];
    this.inputBoxHandler = new InputBoxHandler(this.inputBox);
  },
  
  onKeyPressed_Alt_N: function(e) {
    if (!isSearchNewsNow()) searchOnGoolge(this.inputBox.value, true);
  },

  onKeyPressed_Alt_W: function(e) {
    if (isSearchNewsNow()) searchOnGoolge(this.inputBox.value, false);
  },

  onKeyPressed_Alt_Slash: function(e) {
    searchOnYahoo(this.inputBox.value, isSearchNewsNow());
  },

  onKeyPressed_Alt_C: function(e) {
    searchOnBaidu(this.inputBox.value, isSearchNewsNow());
  },
  
  onKeyPressed_ESC: function(e) {
    this.inputBoxHandler.onKeyPressed_ESC(e);
  },
  
  onKeyPressed_Alt_PgDn: function(e) {
    PageUpDnUtils.displayNewPage('start', true, 0, this.getNumOfResultsPerPage());
  },
  
  onKeyPressed_Alt_PgUp: function(e) {
    PageUpDnUtils.displayNewPage('start', false, 0, this.getNumOfResultsPerPage());
  },
  
  getNumOfResultsPerPage: function() {
  	var resultsCount = 10;
    if (isSearchNewsNow())
   		resultsCount = document.evaluate("count(//td[@class='j'])", document, null, 1, null).numberValue;
    else
      resultsCount = document.evaluate("count(//div[@class='g'])", document, null, 1, null).numberValue;

    // magic round up
  	if ((resultsCount % 10 > 0) && (resultsCount % 10 < 5))
  		resultsCount = resultsCount - resultsCount % 10;
    if (resultsCount < 5) resultsCount = 10;
  	return resultsCount;
  },
}

BaiduSearchHandler = {
  init: function() {
    this.pageType = 'baidu';
    if (isSearchNewsNow())
      this.inputBox = document.getElementsByName('word')[0];
    else
      this.inputBox = document.getElementsByName('wd')[0];
    this.inputBoxHandler = new InputBoxHandler(this.inputBox);
  },
  
  onKeyPressed_Alt_N: function(e) {
    if (!isSearchNewsNow()) searchOnBaidu(this.inputBox.value, true);
  },

  onKeyPressed_Alt_W: function(e) {
    if (isSearchNewsNow()) searchOnBaidu(this.inputBox.value, false);
  },

  onKeyPressed_Alt_Slash: function(e) {
    searchOnGoogle(this.inputBox.value, isSearchNewsNow());
  },

  onKeyPressed_ESC: function(e) {
    this.inputBoxHandler.onKeyPressed_ESC(e);
  },
  
  onKeyPressed_Alt_PgDn: function(e) {
    PageUpDnUtils.displayNewPage('pn', true, 0, this.getNumOfResultsPerPage());
  },
  
  onKeyPressed_Alt_PgUp: function(e) {
    PageUpDnUtils.displayNewPage('pn', false, 0, this.getNumOfResultsPerPage());
  },
  
  getNumOfResultsPerPage: function() {
  	var resultsCount = 10;
    if (isSearchNewsNow())
  		resultsCount = document.evaluate("count(//td[@class='zh'])", document, null, 1, null).numberValue;
    else
  		resultsCount = document.evaluate("count(//td[@class='f'])", document, null, 1, null).numberValue;

    // magic round up
  	if ((resultsCount % 10 > 0) && (resultsCount % 10 < 5))
  		resultsCount = resultsCount - resultsCount % 10;
    if (resultsCount < 5) resultsCount = 10;
  	return resultsCount;
  },
}

function isSearchNewsNow() {
  return document.domain.indexOf('news') == 0;
}

function searchOnYahoo(query, bSearchNews) {
  if (bSearchNews)
    document.location.href = 'http://news.search.yahoo.com/search/news?ei=UTF-8&p=' + encodeURIComponent(query);
  else
    document.location.href = 'http://search.yahoo.com/search?ei=UTF-8&p=' + encodeURIComponent(query);
}

function searchOnGoogle(query, bSearchNews) {
  if (bSearchNews)
    document.location.href = 'http://news.google.com/news?ie=UTF-8&q=' + encodeURIComponent(query);
  else
    document.location.href = 'http://www.google.com/search?&ie=UTF-8&q=' + encodeURIComponent(query);
}

function searchOnBaidu(query, bSearchNews) {
  if (bSearchNews)
    document.location.href = 'http://news.baidu.com/ns?word=' + encodeURIComponent(query);
  else
    document.location.href = 'http://www.baidu.com/s?ie=UTF-8&wd=' + encodeURIComponent(query);
}

// Mozilla: https://developer.mozilla.org/en/DOM/Event/UIEvent/KeyEvent
// Safari/Chrome: http://www.w3.org/TR/DOM-Level-3-Events/keyset.html#KeySet-Set
function keydownHandler(e) {
  if ((e.keyIdentifier == 'U+001B') || (e.which == 27)) {
    // ESC key pressed
    if (gPageEventHandler.onKeyPressed_ESC) gPageEventHandler.onKeyPressed_ESC(e);
  } else if (((e.keyIdentifier == 'PageDown') || (e.which == 34)) && e.altKey) {
    // alt+PgDn key pressed
    if (gPageEventHandler.onKeyPressed_Alt_PgDn) gPageEventHandler.onKeyPressed_Alt_PgDn(e);
  } else if (((e.keyIdentifier == 'PageUp') || (e.which == 33)) && e.altKey) {
    // alt+PgUp key pressed
    if (gPageEventHandler.onKeyPressed_Alt_PgUp) gPageEventHandler.onKeyPressed_Alt_PgUp(e);
  } else if (((e.keyIdentifier == 'U+0043') || (e.which == 67)) && e.altKey) {
    // alt+C key pressed
    if (gPageEventHandler.onKeyPressed_Alt_C) gPageEventHandler.onKeyPressed_Alt_C();
  } else if (((e.keyIdentifier == 'U+004E') || (e.which == 78)) && e.altKey) {
    // alt+N key pressed
    if (gPageEventHandler.onKeyPressed_Alt_N) gPageEventHandler.onKeyPressed_Alt_N();
  } else if (((e.keyIdentifier == 'U+0057') || (e.which == 87)) && e.altKey) {
    // alt+W key pressed
    if (gPageEventHandler.onKeyPressed_Alt_W) gPageEventHandler.onKeyPressed_Alt_W();
  } else if (((e.keyIdentifier == 'U+00BF') || (e.keyIdentifier == 'U+002F') || (e.which == 191)) && e.altKey) {
    // alt+/ key pressed
    if (gPageEventHandler.onKeyPressed_Alt_Slash) gPageEventHandler.onKeyPressed_Alt_Slash();
  }
}

var gPageEventHandler = null;
if (document.domain.indexOf('search.yahoo.com') != -1)
  gPageEventHandler = YahooSearchHandler;
else if (document.domain.indexOf('google.com') != -1)
  gPageEventHandler = GoogleSearchHandler;
else if (document.domain.indexOf('baidu.com') != -1)
  gPageEventHandler = BaiduSearchHandler;
else if (document.domain.indexOf('search.twitter.com') != -1)
  gPageEventHandler = TwitterSearchHandler;
else if (document.domain.indexOf('twitter.com') != -1)
  gPageEventHandler = TwitterHandler;
else if (document.domain.indexOf('flickr.com') != -1)
  gPageEventHandler = FlickrHandler;
else if (document.domain.indexOf('jiwai.de') != -1)
  gPageEventHandler = JiwaiHandler;
else if ((document.domain.indexOf('del.icio.us') != -1) || (document.domain.indexOf('delicious.com') != -1))
  gPageEventHandler = DeliciousHandler;
else if (document.domain.indexOf('friendfeed.com') != -1)
  gPageEventHandler = FriendFeedHandler;
else
  gPageEventHandler = GenericPageUpDnHandler;
  // alert('non-supported-page-type');
  
if (gPageEventHandler) {
  if (gPageEventHandler.init) gPageEventHandler.init();
  document.addEventListener('keydown', keydownHandler, true);
}