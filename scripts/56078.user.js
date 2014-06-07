// ==UserScript==
// @name           TweetsCounter
// @version        0.0.1
// @namespace      http://userscripts.org/scripts/show/56078
// @description    show tweets of current location
// @include        http://*
// @exclude        */search?*
// @exclude        http://tweetmeme.com/story/*
// ==/UserScript==


var api_url ="http://api.tweetmeme.com/url_info.json?url=" + location.href;

if (window == window.parent){
  gettweets(api_url);
}

function gettweets(url){
  GM_xmlhttpRequest({
    method:"GET", 
    url:url,
    onload:function(x){
      parseJSON(x.responseText);
    }
  });
}

function parseJSON(str){
  var tweets = eval("(" + str + ")");
  if ((tweets.status == "success")&&(tweets.story.url_count>0)){
  showTweets(tweets.story.url_count);
  }
}

function showTweets(len){
  var tweetsbox = document.createElement('div');
  tweetsbox.id = "gmtweetsbox";
  tweetsbox.innerHTML = "<a href='http://tweetmeme.com/story/" + encodeURI(location.href) + "' target='_blank'>" + len + "&nbsp;tws<\/a>";
  document.body.appendChild(tweetsbox);
  GM_addStyle(<><![CDATA[
      #gmtweetsbox {
      }
      #gmtweetsbox a {
          z-index: 9999;
          display: block;
          position: fixed;
          bottom: 0px;
          right: 0px;
          margin: 3px;
          padding: 3px 4px;
          background-color: #80B62A;
          border: 1px solid  #80B62A;
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
          color: #80B62A;
          background-color: #FFF;
      }
  ]]></>
  );
}