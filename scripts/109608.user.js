// ==UserScript==
// @name           Twitter Twitpic profile link
// @description    Adds Twitpic link to Twitter page
// @author         Kapow
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==


var add_twitpic = function(){
  if (document.getElementById('page-container')) {
    var sn = "";
    
    var divs = document.getElementsByClassName("profile-card-inner");
    if (divs.length > 0 && divs[0].hasAttribute("data-screen-name")) {
      sn = divs[0].getAttribute("data-screen-name");
    } else {
      return;
    }
    
    //new style
    var ps = document.getElementsByClassName("location-and-url");
    if (ps.length > 0) {
      var tp_span = document.createElement("span");
      tp_span.className = "url";
      
      var tp_a = document.createElement("a");
      tp_a.href = "http://twitpic.com/photos/"+sn;
      tp_a.innerHTML = "[Twitpic]";
      
      tp_span.appendChild(tp_a);
      ps[0].appendChild(tp_span);
    }
    
    //old style
    var headings = document.getElementsByTagName('h2');
    for (var i=0; i<headings.length; i++) {
      if (headings[i].className == "dashboard-profile-title") {
        var tp = document.createElement("a");
        tp.href = "http://twitpic.com/photos/"+sn;
        tp.style.marginLeft = "4px";
        tp.innerHTML = "[Twitpic]";
        headings[i].appendChild(tp);
      }
    }
  }
}

window.addEventListener('load', function(){
  setTimeout(add_twitpic, 2000);
}, false);
