// ==UserScript==
// @name        bilibili hide threads
// @version     v0.2
// @include     http://space.bilibili.tv/*
// ==/UserScript==

// push
function push() {
  var push_tids = document.getElementsByClassName("main_list")[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
  for (var push_index = 0; push_index < push_tids.length; push_index++) {
    var push_a = push_tids[push_index].getElementsByTagName("a");
    if (push_a.length) {
      push_tidString = String(push_a[0].getAttribute("href"));
      var push_tid = push_tidString.split("/")[4];
      var push_myinput = document.createElement("input");
      push_myinput.setAttribute("name", "BILIBILI");
      push_myinput.setAttribute("type", "button");
      push_myinput.setAttribute("value", "hide");
      var push_mykey = "\"BILIBILI_" + push_tid + "\"";
      var push_myvalue = "\"" + push_tid + "\"";
      var push_myfunc = "localStorage.setItem(" + push_mykey + "," + push_myvalue + ");window.location.reload();";
      push_myinput.setAttribute("onclick", push_myfunc);
      push_tids[push_index].getElementsByClassName("c")[0].appendChild(push_myinput);
    }
  }
}

// pull
function pull() {
  for (var pull_index = 0; pull_index < localStorage.length; pull_index++) {
    var pull_key = localStorage.key(pull_index);
    if (pull_key.search("^BILIBILI") != -1) {
      var pull_url = "http://www.bilibili.tv/video/" + localStorage.getItem(pull_key) + "/";
      var pull_tids = document.getElementsByClassName("main_list")[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
      for (var pull_j = 0; pull_j < pull_tids.length; pull_j++) {
        var pull_tid = pull_tids[pull_j].getElementsByTagName("a")[0];
        if (pull_tid == pull_url) {
          pull_tids[pull_j].innerHTML = "";
        }
      }
    }
  }
}

pull();
push();
