// ==UserScript==
// // @name          WowForumCleaner
// // @description   Makes the World of Warcraft Forums less flashy.
// // @include       http://forums.worldofwarcraft.com/*
// // ==/UserScript==
// Written by Ralnur

  var COLOR = "#1b1b1b"; // the new background color

  // just delete some parts of the site
  // like the header, nav bars, search bars
  document.getElementById("wowmap").innerHTML = "";
  document.getElementById("header").innerHTML = "";
  document.getElementById("header").style.height = "auto";
  document.getElementById("shared_topnav").innerHTML = "";
  document.getElementById("search").innerHTML = "";

  // deleteing this icon is tricky
  var fh = document.getElementById("forumHead");
  for (var i = 0; i < fh.childNodes.length; i++) {
    if(fh.childNodes[i].className == "icon") {
      fh.childNodes[i].innerHTML = "";
    }
  }

  var els = document.getElementsByTagName("*");
  for (var i = 0; i < els.length; i++) {
    var cur = els[i];

    // for every element, we set the background color
    // if it is an image, replace it with its alt-text
    // also, remove the adverts and avatars.
    if(cur.nodeType == 1) { // 1 == Node.ELEMENT_NODE
      cur.style.background = COLOR; // "none";
      if(cur.nodeName == "IMG") {
        var text = cur.getAttribute("alt");
        if (text) {
          if (text.length > 8) {
            cur.parentNode.innerHTML = text.substring(0,8);
          }
          else {
            cur.parentNode.innerHTML = text;
          }
        }
        else {
          cur.parentNode.innerHTML = "[Img]";
        }
      }
      else if(cur.nodeName == "DIV") {
        if(cur.className.indexOf("advertise") == 0) {
          cur.innerHTML = "";
        }
        else if (cur.id.indexOf("avatar") == 0) {
          cur.style.display = "none";
        }
      }
    }
  }