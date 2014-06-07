// ==UserScript==
// @name           to follow by another account
// @namespace      http://web.zgo.jp/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @exclude        http://twitter.com/*/*
// @exclude        https://twitter.com/*/*
// ==/UserScript==

var twitterInfo = { 
    "username" : "",
    "password" : ""
};
function postTwitter(){
    this.initialize.apply(this, arguments);
}  
postTwitter.prototype = {
    initialize: function(screenName){
      this.screenName = screenName;
        this.post();
    },
    post: function(){
        if (twitterInfo.username != "" && twitterInfo.password != "") {
          var twitterEndPoint   = [
                                   'https://',
                                   twitterInfo.username,
                                   ':',
                                   twitterInfo.password,
                                   '@twitter.com/friendships/create/id.json'
                                   ].join('');
          this.postTwit(twitterEndPoint);
        }else{
          var twitterEndPoint = 'http://twitter.com/friendships/create/id.json';
          this.postTwit(twitterEndPoint);
        }
    },
    postTwit: function(endPoint) {
        GM_xmlhttpRequest({
          method: 'POST',
              url: endPoint,
              data: 'screen_name=' + this.screenName,
              headers: {
              'Content-Type' : 'application/x-www-form-urlencoded'
              },
              onload : function (res) {
                  GM_log("POST!" +res);
                  comment.value = "フォローしました"
              },
              onerror: function(res) {
                alert('post failed!')
              },
        });
  }
}
var fl_button = document.getElementById("follow_control");
if(!fl_button)
  return;
var comment = document.createElement("input");
  	comment.type = "submit";
  	comment.value = "別アカウントでフォロー";
  	comment.size = 40;
    comment.addEventListener('click', function(e) {
          var screenName = document.getElementsByName("page-user-screen_name")[0].content;
          new postTwitter(screenName);
    }, false)
fl_button.appendChild(comment);
