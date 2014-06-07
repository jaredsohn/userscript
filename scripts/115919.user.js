// ==UserScript==
// @name           OFFLINE ALERT
// @author         Written by Jefferson Scher
// @namespace      Requested by *Barbiegirl* (thread http://userscripts.org/topics/91003)(thankyou Jefferson)
// @description    When in Work Offline Mode, the webpage you are on will display OFFLINE to alert you that you are in Offline Mode.
// @include        http://*
// @include        https://*
// @include        about:blank
// ==/UserScript==


GM_addStyle("#offlinenotice{position:fixed!important;top:0!important;left:0!important;background:#ccc!important;opacity:0.95!important;padding:25% 0!important;text-align:center!important;z-index:999!important;color:#CC0000!important;font-family:verdana!important;font-size:10em!important;}");

function offNotice(e){
  var d = document.createElement("div");
  d.id = "offlinenotice";
  d.style.height = window.innerHeight + "px";
  d.style.width = window.innerWidth + "px";
  d.appendChild(document.createTextNode("OFFLINE"));
  document.body.appendChild(d);
}

function removeNotice(e){
  var d = document.getElementById("offlinenotice");
  if (d) d.parentNode.removeChild(d);
}

document.body.addEventListener("offline", offNotice, false);
document.body.addEventListener("online", removeNotice, false);

function offNotice(e){
  var d = document.createElement("div");
  d.id = "offlinenotice";
  d.style.height = window.innerHeight + "px";
  d.style.width = window.innerWidth + "px";
  d.appendChild(document.createTextNode("OFFLINE"));
  document.body.appendChild(d);
  // Hide Flash players
  var players = document.querySelectorAll("object, embed");
  for (var i=0; i<players.length; i++){
    if (players[i].hasAttribute("type")){ if (players[i].getAttribute("type") == "application/x-shockwave-flash"){
      if (window.getComputedStyle(players[i],null).getPropertyValue("visibility") == "visible"){
        players[i].style.visibility = "hidden";
        players[i].setAttribute("offlinehidden", "yes");
      }
    }}
  }
}

function removeNotice(e){
  var d = document.getElementById("offlinenotice");
  if (d) d.parentNode.removeChild(d);
  // Restore Flash players
  var restoreset = document.querySelectorAll("object[offlinehidden], embed[offlinehidden]");
  for (var i=0; i<restoreset.length; i++){
    restoreset[i].style.visibility = "visible";
    restoreset[i].removeAttribute("offlinehidden");
  }
}