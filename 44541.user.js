// ==UserScript==
// @name           Twitter Enhancements: Revert to the Old-Style Twitter Pagination
// @namespace      http://eden.com
// @description    Revert the twitter pagination to the old-style prev/next page links
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

var gblCssRules = '';

function applyGlobalStyle() {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';

  if (navigator.userAgent.indexOf('Firefox') != -1) {
    style.innerHTML = gblCssRules;
    head.appendChild(style);
  } else {
    head.appendChild(style);
    var sheet = style.sheet;
    var cssRules = gblCssRules.replace(/}/g, '}#####,').split('#####,');
    for (var i = 0; i < cssRules.length; i++) {
      var rule = cssRules[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      if (rule.length > 0)
        sheet.insertRule(rule, sheet.cssRules.length);
    }
  }
}

function addGlobalStyle(cssRule) {
  gblCssRules += cssRule;
}

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

function revertPaginationStyle() {
  if (document.getElementById('old-pagination')) return;
  var paginationElem = document.getElementById('pagination');
  if (paginationElem) {
    TwitterPage.init(true);
    var prevUrl = TwitterPage.getPrevPageUrl();
    var nextUrl = TwitterPage.getNextPageUrl();

    addGlobalStyle('#pagination {display: none;}');
    addGlobalStyle('#old-pagination {text-align: right; margin: 10px 20px; font-size: 10pt}');
    addGlobalStyle('#old-pagination a {border: none; background: url(http://mycustomization.googlecode.com/svn/trunk/images/jaiku/button-up.png) no-repeat top left; padding: 3px 6px; }');
    addGlobalStyle('#old-pagination a:hover {border: none; background: url(http://mycustomization.googlecode.com/svn/trunk/images/jaiku/button-hover.png) no-repeat top left; padding: 3px 6px; text-decoration: none; }');
    addGlobalStyle('#old-pagination a .title { padding: 0 10px 0 7px!important; }');
    var newPaginationElem = document.createElement('div');
    newPaginationElem.id = 'old-pagination';
    var innerHTML = '<a href="' + nextUrl + '"><span class="title">Next&gt;&gt;</span></a>';
    if (prevUrl) innerHTML = '<a href="' + prevUrl + '"><span class="title">&lt;&lt;Prev</span></a>&nbsp;&nbsp;&nbsp;' + innerHTML;
    newPaginationElem.innerHTML = innerHTML;
    paginationElem.parentNode.replaceChild(newPaginationElem, paginationElem);
  }
}

revertPaginationStyle();

applyGlobalStyle();