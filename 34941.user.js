// ==UserScript==
// @name           Twitter Enhancements: Jaiku Theme
// @namespace      http://eden.com
// @description   Restyle Twitter pages using Jaiku's bubble theme
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var gRevertPaginationStyle = true;

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

function addGlobalStyle(cssRule) { gblCssRules += cssRule; }

// Merged from: Twitter Enhancements: Revert to the Old-Style Twitter Pagination (http://userscripts.org/scripts/show/44541)
// ==============  Twitter Page Utils Begins ============= 
TwitterPage = {
  init: function(bAppendPageNumToTitle) {
    this.pageType = document.body.id;
    this.curPageNum = parseInt($('meta[name="page"]').attr('content'));
    this.pageUserName = $('meta[name="page-user-screen_name"]').attr('content');
    this.sessionUserName = $('meta[name="session-user-screen_name"]').attr('content');
    if (bAppendPageNumToTitle && (document.title.indexOf(' - Page ') == -1))
      document.title = document.title + ' - Page ' + this.curPageNum;
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
    return this.getExpandedUrl() + '?page=' + (this.curPageNum - 1);
  },
  
  getNextPageUrl: function() {
    return this.getExpandedUrl() + '?page=' + (this.curPageNum + 1);
  },
  
  isStatusEmpty: function() { return ($('#status').text() == ''); }
};
// ==============  Twitter Page Utils Ends ============= 

function revertPaginationStyle() {
  if ($('#old-pagination').length) return;
  TwitterPage.init(true);
  addGlobalStyle('#pagination {display: none;}');
  addGlobalStyle('#old-pagination {text-align: right; margin: 10px 20px; font-size: 10pt}');
  addGlobalStyle('#old-pagination a {border: none; background: url(http://mycustomization.googlecode.com/svn/trunk/images/jaiku/button-up.png) no-repeat top left; padding: 3px 6px; }');
  addGlobalStyle('#old-pagination a:hover {border: none; background: url(http://mycustomization.googlecode.com/svn/trunk/images/jaiku/button-hover.png) no-repeat top left; padding: 3px 6px; text-decoration: none; }');
  addGlobalStyle('#old-pagination a .title { padding: 0 10px 0 7px!important; }');
  var innerHTML = '<a href="' + TwitterPage.getNextPageUrl() + '"><span class="title">Next&gt;&gt;</span></a>';
  if (TwitterPage.curPageNum > 1)
    innerHTML = '<a href="' + TwitterPage.getPrevPageUrl() + '"><span class="title">&lt;&lt;Prev</span></a>&nbsp;&nbsp;&nbsp;' + innerHTML;
  $('#pagination').attr('id', 'old-pagination').html(innerHTML);
}

// =================  MAIN ================= 
function main() {
  var url = window.location.href;

  $('.hentry').each(function (idx) {
    var author = $('.status-body strong', this).html();
    var replyTitle = $('.reply a').attr('title');
    var replyHref = $('.reply a').attr('href');
    var actions = '<span class="reply"><a title="' + replyTitle + '" href="' + replyHref + '"><span class="reply-icon icon"/></a></span>';
    actions += $('.actions', this).html();
    var newContent = '<div class="entry-content">' + $('.entry-content', this).html() + '</div>';
    newContent += '<div class="status-meta">';
    if (author)
      newContent += '<span class="status-author">By <strong>' + author + '</strong></span>';
    newContent += '<span class="meta entry-meta">' + $('.entry-meta', this).html() + '</span></div>';
    newContent = '<div class="top"><div class="bottom">' + newContent + '</div></div>';
    $('.status-body', this).html(newContent);
    $('.status-body', this).after('<span class="actions actions-hover">' + actions + '</span>');
  });

  addGlobalStyle('li.hentry {width: 634px;} li.hentry span.status-body div.entry-content, body#home li.hentry span.status-body div.entry-content, body#profile li.hentry span.status-body div.entry-content, body#replies li.hentry span.status-body div.entry-content, body#direct_messages li.hentry span.status-body div.entry-content, body#sent li.hentry span.status-body div.entry-content, body#favourings li.hentry span.status-body div.entry-content, body#public_timeline li.hentry span.status-body div.entry-content {width: 500px;}');
  addGlobalStyle('body#home #timeline, body.status #timeline, .doing td, .note, .note li+li, body#profile #timeline, body#replies #timeline, body#favourings #timeline { border: 0px !important; }');
  addGlobalStyle('li.hentry .thumb {width: 66px; height: 66px;} li.hentry .thumb img { padding: 10px 5px 10px 5px; width: 56px; height: 56px; float:left;}'); 
  addGlobalStyle('li.hentry span.status-body .status-meta { padding-top: 20px; }');
  addGlobalStyle('li.hentry span.status-body .status-meta span.meta { display:inline; margin-right: 40px; }');  /* float:right; */
  addGlobalStyle('#content #doingForm .info {text-align: left;} #content #doingForm textarea {margin:4px 8px 0 12px; width: 620px; } #content #doingForm .status-btn {margin: 5px 20px;} ');
  addGlobalStyle('li.hentry span.status-body, li.hentry span.status-body div, body#home li.hentry span.status-body div, body#replies li.hentry span.status-body div, body#direct_messages li.hentry span.status-body div, body#sent li.hentry span.status-body div, body#favourings li.hentry span.status-body div, body#public_timeline li.hentry span.status-body div {width: 534px;}');
  addGlobalStyle('body#profile li.hentry {width: 554px;} body#profile li.hentry span.status-body div {width: 534px;}');
  addGlobalStyle('li.hentry .status-body div.bottom {background:transparent url(http://mycustomization.googlecode.com/svn/trunk/images/jaiku/bg-stream-top.gif) no-repeat scroll 0 0;min-height:50px;overflow:visible;padding:10px 12px 10px 15px;position:relative;}');
  addGlobalStyle('li.hentry .status-body div.top {background:transparent url(http://mycustomization.googlecode.com/svn/trunk/images/jaiku/bg-stream-bottom.gif) no-repeat 0 100%; min-height:50px; margin: 0 0 5px 7px;}');
  addGlobalStyle('.actions .non-fav, .actions .fav-throb, .actions .fav, .actions .reply {margin-bottom:13px;} li.hentry .actions-hover span.icon {margin-left:0px;}');

  if (gRevertPaginationStyle) revertPaginationStyle();
  applyGlobalStyle();
}

$(document).ready(function() { main(); });