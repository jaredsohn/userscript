// ==UserScript==
// @name                Keyboard Shortcuts Enhancement for Yahoo/Google Search by sagar arora
// @namespace           com.search.keyboard.hacks
// @description         Press ESC to set/grab focus to/from the search input element; alt+n to switch to news search; alt+w to switch to web search; alt+/ to switch search engine (yahoo<->google); alt+c to switch to baidu search; alt+PgDn for next page; alt+PgUp for previous page
// @include             http://www.google.com/search*
// @include             http://news.google.com/news*
// @include             http://www.google.com/notebook*
// @include             https://mail.google.com/*
// @include             http://search.yahoo.com/search*
// @include             http://news.search.yahoo.com/search*
// @include             http://www.baidu.com/s*
// @include             http://news.baidu.com/ns*
// @include             http://twitter.com/*
// @include             http://www.flickr.com/*
// @include             http://jiwai.de/*
// @author             cool dude of orkut sagar arora
// ==/UserScript==

PageUpDnHandler = function() {}
PageUpDnHandler.prototype = {
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
      if (url.indexOf('?') >= 0) url = url + '&' + pageArg;
      else url = url + '?' + pageArg;
        
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

TwitterHandler = function(pageType) {
  this.pageType = pageType;
  this.pageUpDnHandler = new PageUpDnHandler();
  this.inputBox = document.getElementById("status");
  if (this.inputBox) {
    this.inputBoxHandler = new InputBoxHandler(this.inputBox);
    setTimeout(function() { document.getElementById("status").blur(); }, 200);
    setTimeout(function() { document.getElementById("status").blur(); }, 1000);
    setTimeout(function() { document.getElementById("status").blur(); }, 2000);
  }
}

TwitterHandler.prototype = {
  onKeyPressed_ESC: function(e) {
    if (this.inputBoxHandler)
      this.inputBoxHandler.onKeyPressed_ESC(e);
  },
  
  onKeyPressed_Alt_PgDn: function(e) {
    this.pageUpDnHandler.displayNewPage('page', true, 1, 1);
  },
  
  onKeyPressed_Alt_PgUp: function(e) {
    this.pageUpDnHandler.displayNewPage('page', false, 1, 1);
  },
}

JiwaiHandler = function(pageType) {
  this.pageType = pageType;
  this.pageUpDnHandler = new PageUpDnHandler();
  this.inputBox = document.getElementById("jw_status");
  if (this.inputBox) {
    this.inputBoxHandler = new InputBoxHandler(this.inputBox);
    setTimeout(function() { document.getElementById("jw_status").blur(); }, 200);
    setTimeout(function() { document.getElementById("jw_status").blur(); }, 2000);
    setTimeout(function() { document.getElementById("jw_status").blur(); }, 5000);
  }
}

JiwaiHandler.prototype = {
  onKeyPressed_ESC: function(e) {
    if (this.inputBoxHandler)
      this.inputBoxHandler.onKeyPressed_ESC(e);
  },
  
  onKeyPressed_Alt_PgDn: function(e) {
    this.pageUpDnHandler.displayNewPage('page', true, 1, 1);
  },
  
  onKeyPressed_Alt_PgUp: function(e) {
    this.pageUpDnHandler.displayNewPage('page', false, 1, 1);
  },
}

FlickrHandler = function(pageType) {
  this.pageType = pageType;
  this.inputBox = document.getElementById("header_search_q");
  this.inputBoxHandler = new InputBoxHandler(this.inputBox);
}

FlickrHandler.prototype = {
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

YahooSearchHandler = function(pageType) {
  this.pageType = pageType;
  this.inputBox = document.getElementById("yschsp");
  this.inputBoxHandler = new InputBoxHandler(this.inputBox);
  this.pageUpDnHandler = new PageUpDnHandler();
  if (document.location.href.indexOf('?') < 0 )
    this.inputBoxHandler.setSearchBoxFocus(true);
}
  
YahooSearchHandler.prototype = {
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
    this.pageUpDnHandler.displayNewPage('b', true, 1, this.getNumOfResultsPerPage());
  },
  
  onKeyPressed_Alt_PgUp: function(e) {
    this.pageUpDnHandler.displayNewPage('b', false, 1, this.getNumOfResultsPerPage());
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

GoogleSearchHandler = function(pageType) {
  this.pageType = pageType;
  this.inputBox = document.getElementsByName('q')[0];
  this.inputBoxHandler = new InputBoxHandler(this.inputBox);
  this.pageUpDnHandler = new PageUpDnHandler();
}
  
GoogleSearchHandler.prototype = {
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
    this.pageUpDnHandler.displayNewPage('start', true, 0, this.getNumOfResultsPerPage());
  },
  
  onKeyPressed_Alt_PgUp: function(e) {
    this.pageUpDnHandler.displayNewPage('start', false, 0, this.getNumOfResultsPerPage());
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

BaiduSearchHandler = function(pageType) {
  this.pageType = pageType;
  if (isSearchNewsNow())
    this.inputBox = document.getElementsByName('word')[0];
  else
    this.inputBox = document.getElementsByName('wd')[0];
  this.inputBoxHandler = new InputBoxHandler(this.inputBox);
  this.pageUpDnHandler = new PageUpDnHandler();
}
  
BaiduSearchHandler.prototype = {
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
    this.pageUpDnHandler.displayNewPage('pn', true, 0, this.getNumOfResultsPerPage());
  },
  
  onKeyPressed_Alt_PgUp: function(e) {
    this.pageUpDnHandler.displayNewPage('pn', false, 0, this.getNumOfResultsPerPage());
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

function keypressHandler(e) {
  if ((e.which == 110) && e.altKey) {
    if (gPageEventHandler.onKeyPressed_Alt_N) gPageEventHandler.onKeyPressed_Alt_N(e);
  } else if ((e.which == 119) && e.altKey) {
    if (gPageEventHandler.onKeyPressed_Alt_W) gPageEventHandler.onKeyPressed_Alt_W(e);
  } else if ((e.which == 47) && e.altKey) {
    if (gPageEventHandler.onKeyPressed_Alt_Slash) gPageEventHandler.onKeyPressed_Alt_Slash(e);
  } else if ((e.which == 99) && e.altKey) {
    if (gPageEventHandler.onKeyPressed_Alt_C) gPageEventHandler.onKeyPressed_Alt_C();
  }
}

function keydownHandler(e) {
  if (e.which == 27) {                                                   // ESC key pressed
    if (gPageEventHandler.onKeyPressed_ESC) gPageEventHandler.onKeyPressed_ESC(e);
  } else if ((e.which == 34) && e.altKey) {                                // alt+PgDn key pressed
    if (gPageEventHandler.onKeyPressed_Alt_PgDn) gPageEventHandler.onKeyPressed_Alt_PgDn(e);
  } else if ((e.which == 33) && e.altKey) {                                // alt+PgUp key pressed
    if (gPageEventHandler.onKeyPressed_Alt_PgUp) gPageEventHandler.onKeyPressed_Alt_PgUp(e);
  }
}

var gPageEventHandler = null;
if (document.domain.indexOf('yahoo.com') != -1)
  gPageEventHandler = new YahooSearchHandler('yahoo');
else if (document.domain.indexOf('google.com') != -1)
  gPageEventHandler = new GoogleSearchHandler('google');
else if (document.domain.indexOf('baidu.com') != -1)
  gPageEventHandler = new BaiduSearchHandler('baidu');
else if (document.domain.indexOf('twitter.com') != -1)
  gPageEventHandler = new TwitterHandler('twitter');
else if (document.domain.indexOf('flickr.com') != -1)
  gPageEventHandler = new FlickrHandler('flickr');
else if (document.domain.indexOf('jiwai.de') != -1)
  gPageEventHandler = new JiwaiHandler('jiwai');
else
  alert('non-supported-page-type');
  
if (gPageEventHandler) {
  document.addEventListener('keydown', keydownHandler, true);
  document.addEventListener('keypress', keypressHandler, true);
}