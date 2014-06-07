// ==UserScript==
// @name           ShowYouTubeCommentProfile
// @namespace      http://www.henshi.net/k/
// @description    insert commenters' age, location and gender after their name on YouTube.
// @include        http://youtube.com/*
// @include        http://*.youtube.com/*
// @include        https://youtube.com/*
// @include        https://*.youtube.com/*
// ==/UserScript==

(function() {
  var impl = function() {
    var process = function(comment) {
      var user = function() {
        var nodes = comment.getElementsByClassName("yt-user-name");
        return nodes[0];
      }();
      var username = user.pathname.replace("/user/", "");
      var url = "http://gdata.youtube.com/feeds/api/users/" + username;
      var callback = function(r){
        var r = r.responseText;
        var name = username, age = "", gender = "", loc = "";
        if (/<yt:age>(.*)<\/yt:age>/.test(r)) {
          age = RegExp.$1;
        }
        if (/<yt:gender>(.*)<\/yt:gender>/.test(r)) {
          gender = RegExp.$1;
        }
        if (/<yt:location>(.*)<\/yt:location>/.test(r)) {
          if (/(.*,\s*)*(.*)$/.test(RegExp.$1)) {
            loc = RegExp.$2;
          }
        }
        if (/<name>(.*)<\/name>/.test(r)) {
          name = RegExp.$1;
        }
        if (loc || age || gender) {
          var text = name;
          text += " (" + loc;
          if (age || gender)
            text += ":"+age+":"+gender;
          text += ")";
          user.textContent = text;
        }
      };
      GM_xmlhttpRequest({method: 'GET', url: url, onload: callback});
    }
    var comments = document.getElementsByClassName("comment");
    for (var i = 0; i < comments.length; ++i) {
      process(comments[i]);
    }
  };
  impl();
})();