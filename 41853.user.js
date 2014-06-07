// ==UserScript==
// @name           River of Reddit
// @namespace      autoPage
// @description    Loads next page when you scroll to bottom of reddit.
// @include        http://www.reddit.com/*
// ==/UserScript==

(function(){

    var openString = '<div id="siteTable"';
    var closeString = '<div class="footer">';
    var log = GM_log;
    var target = document.getElementById('siteTable');

    var getNextPage = function(){
      var pageUrl = document.getElementsByClassName('nextprev');
      var anchor, found;

      for(var ii=pageUrl.length-1; ii>=0; ii--){
        var a = pageUrl[ii].getElementsByTagName('a');
        if(a && !found){
          //get last anchor
          anchor = a[a.length-1].href;
          found = true;
        }
        pageUrl[ii].parentNode.removeChild(pageUrl[ii]);
      }
      return anchor;
    };

    var parsePage = function(details){
      var response = details.responseText;
      response = response.replace(/<script(.|\s)*?\/script>/g, "");
      var from = response.indexOf(openString);
      var to = response.indexOf(closeString);
      if(from){
        response = "<div " + response.substring(from + openString.length, to);
        appendPage(response);
      }
    };

    var appendPage = function(response){
      var div = document.createElement('div');
      div.innerHTML = response;
      progress(0);
      target.appendChild(div);
    };

    var progress = function(state){
      if(state){
        var p = document.createElement('p');
        p.innerHTML = 'Loading...';
        p.id = 'progress';
        p.className = 'morelink';
        target.appendChild(p);
      }else{
        var p = document.getElementById('progress');
        p.parentNode.removeChild(p);
      }
    };

    var start = function(){
      var nextPage = getNextPage();
      if(nextPage){
        progress(1);
        GM_xmlhttpRequest({
            method: "GET",
            url: nextPage,
            headers: {
              "User-Agent":"monkeyagent",
              "Accept":"text/monkey,text/xml",
            },
            onload: parsePage
        });
      }
    };

    var handleScroll = function(){
      if( (window.scrollMaxY - window.innerHeight) < window.scrollY){
        start();
      }
    };
    window.addEventListener('scroll', handleScroll, false);
})();
