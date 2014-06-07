// ==UserScript==
// @name           PalmDevLogin
// @namespace      http://chofter.com/apps
// @description    Auto logs you in to the Palm developer site
// @include        https://developer.palm.com/*
// @include        http://developer.palm.com/*
// ==/UserScript==


var myUserName = null;
var myPwd = null;

if(window.location.href.indexOf("index.php?option=com_user&view=login") < 0) {
  var anchors = document.querySelectorAll("div.wrapper ul#globalnav li a");
  var found = false;
  
  for(var i = 0; i < anchors.length; i++) {
    if(anchors[i].innerHTML == "Sign In") {
      found = true;
      window.location.href = "https://developer.palm.com/index.php?option=com_user&view=login";
      break;
    }
  }
  if(!found) {
  
    var navList = document.getElementById("globalnav");
    if(navList) {
      var listElements = document.querySelectorAll("div.wrapper ul#globalnav li");
    

      var li = document.createElement("li");
      var a = document.createElement("a");
      a.innerHTML = "Forums";
      a.href = "http://developer.palm.com/distribution/index.php";
      li.appendChild(a);
      navList.insertBefore(li, listElements[1]);

      li = document.createElement("li");
      var a = document.createElement("a");
      a.innerHTML = "Reference Library";
      a.href = "http://developer.palm.com/index.php?option=com_content&view=article&id=1654&Itemid=20";
      li.appendChild(a);
      navList.insertBefore(li, listElements[1]);
    }
  }
  
} else {
  // In the log in window
  var user = document.querySelectorAll("input[name=username]")[0];
  var pwd = document.querySelectorAll("input[name=passwd]")[0];
  var btn = document.querySelectorAll("form#login input.type_submit")[0];
  
  if(user && pwd && user.value && pwd.value) {
    btn.click();
  } else if(myUserName && myPwd) {
    user.value = myUserName;
    pwd.value = myPwd;
    btn.click();
  }
}