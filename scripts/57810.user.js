// ==UserScript==
// @name           TweetsCounterV2
// @version        0.0.5.3
// @namespace      http://userscripts.org/scripts/show/57810
// @description    show tweets of current location
// @include        http*
// @exclude        */search?*
// @exclude        http://topsy.com/tb/*
// @exclude        http://topsy.com/trackback*
// @match          http://*/*
// ==/UserScript==

if (window == window.parent){
  if (location.href.indexOf("http://www.youtube.com/watch?v=")==0){
    var rtwc_refurl = encodeURIComponent(location.href.slice(0,42));
  } else {
    var rtwc_refurl = encodeURIComponent(location.href);
  }
  api_url ="http://otter.topsy.com/trackbacks.js?url=" + rtwc_refurl + "&perpage=1";
  rtwc_reftitle = encodeURIComponent(document.title);
  var tweetsbox = document.createElement('div');
  tweetsbox.id = "gmtweetsbox";
  tweetsbox.innerHTML = "<a href=\"javascript:(function(){var%20url='http://retweets.8-bit.jp/open.js';var%20d=document;var%20e=d.createElement('script');e.charset='utf-8';e.src=url;d.getElementsByTagName('head')[0].appendChild(e);})();\"><\/a>";
  document.body.appendChild(tweetsbox);
  GM_addStyle((<><![CDATA[
      #gmtweetsbox {
          display: none;
      }
      #gmtweetsbox {
          background:transparent none repeat scroll 0% 0% !important;
          border:medium none transparent !important;
          visibility:visible !important;
          margin:0 !important;
          padding:0 !important;
          float:none !important;
          text-decoration:none !important;
          white-space:normal !important;
          word-spacing:normal !important;
          letter-spacing:normal !important;
          outline:invert none medium !important;
          unicode-bidi:normal !important;
          cursor:auto !important;
          position:static !important;
          top:auto !important;
          right:auto !important;
          bottom:auto !important;
          left:auto !important;
          height:auto !important;
          width:auto !important;
          max-height:none !important;
          max-width:none !important;
          min-height:0 !important;
          min-width:0 !important;
          text-align:center !important;
          text-indent:0 !important;
          vertical-align:baseline !important;
      }
      #gmtweetsbox a {
          z-index: 9999;
          display: block;
          position: fixed;
          bottom: 0px;
          right: 0px;
          margin: 3px;
          padding: 3px 4px;
          background-color: #777;
          border: 1px solid  #FFF;
          -moz-border-radius: 5px;
          font-family: Arial, sans-serif;
          font-size: 12px;
          font-weight: bold;
          text-decoration: none;
          color: #FFF;
          letter-spacing: 0;
          line-height: 1;
      }
      #gmtweetsbox a:hover {
          text-decoration: none;
          color: #777;
          background-color: #FFF;
          border: 1px solid  #777;
      }
      #gmtweetsbox a.gm6h {
          color: #FFF;
          background-color: #B00;
          border: 1px solid  #FFF;
      }
      #gmtweetsbox a.gm6h:hover {
          color: #B00;
          background-color: #FFF;
          border: 1px solid  #B00;
      }
      #gmtweetsbox a.gm24h {
          color: #FFF;
          background-color: #B80;
          border: 1px solid  #FFF;
      }
      #gmtweetsbox a.gm24h:hover {
          color: #B80;
          background-color: #FFF;
          border: 1px solid  #B80;
      }
  ]]></>
  ).toString());
//  gettweets(api_url);

  // Callback
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.charset = "UTF-8";
  var t = document.createTextNode("function gettweet(tweets){ if (tweets.response.total>0){ document.getElementById('gmtweetsbox').childNodes[0].innerHTML = tweets.response.total+' tws'; document.getElementById('gmtweetsbox').style.display = 'block'; document.getElementById('gmtweetsbox').childNodes[0].title = 'latest post : '+tweets.response.list[0].date_alpha; var lastpost = parseInt((new Date)/1000) - tweets.response.list[0].date; if (lastpost<21600){ document.getElementById('gmtweetsbox').childNodes[0].className = 'gm6h'; } else if(lastpost<86400){ document.getElementById('gmtweetsbox').childNodes[0].className = 'gm24h'; } }}");
  s.appendChild(t);
  document.body.appendChild(s);

  // JSONP 実行
  var s = document.createElement("script");
  s.src = api_url + "&callback=gettweet";
  s.charset = "UTF-8";
  document.body.appendChild(s);
}