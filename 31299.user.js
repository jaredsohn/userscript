// ==UserScript==
// @name           Show Reddit Comment Karma
// @description    Show Reddit comment Karma along with your existing karma
// @include        http://www.reddit.com/comments/*
// @include        http://reddit.com/comments/*
// @include        http://www.reddit.com/user/*
// @include        http://reddit.com/user/*
// ==/UserScript==

var header = document.getElementById('header-top');
var user_span = header.getElementsByTagName('span')[0];
var anchor = user_span.getElementsByTagName('a');
var href = anchor[0].href;

GM_xmlhttpRequest({
  method: 'GET',
  url: href,
  headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'text/html',
      },
  onload: function(responseDetails) {
      var exp ='(comment karma: &#32;<b>)(\\d+)';
      var re = new RegExp(exp,["i"]);
      var result = re.exec(responseDetails.responseText)[0];
      var karma = '';
      for (i = 23; i < result.length; i++) {
	karma = karma + result[i];
      }
      
      user_span.appendChild(document.createTextNode(' (' + karma + ')'));
  }
});

