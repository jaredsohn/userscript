  // ==UserScript==
  // @name           Put yahoo search instead of live search
  // @author         yahoo.com
  // @namespace      yahoo.com
  // @description    Put yahoo search instead of live search
  // @include        http://club.live.com/GamePlay.aspx?page=*
  // ==/UserScript==
  
  setTimeout(function() {
  
  this.GameShowAPI.Search = function (term, a, b) {
     this.sel.src = 'http://search.yahoo.com/search?p='. term;
  }
  var sel = document.getElementById('ifSearchResult');
  sel.src = 'http://search.yahoo.com/search';
  }, 500);