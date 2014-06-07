// ==UserScript==
// @name           Facebook Album Previous-Next Overlay
// @namespace      JeffersonScher
// @version        0.5.0
// @copyright      © 2011 Jefferson Scher
// @license        CC BY http://creativecommons.org/licenses/by/3.0/
// @description    Click left side of photo to go to Previous, right side to go to Next. Updated 2011-09-06.
// @include        http://www.facebook.com/*
// ==/UserScript==

// ID, identifying element, overlay parent, previous link, next link, zindex++
var modes = new Array();
modes[0] = ["C","#photoborder","#photoborder","#fbPhotoPageHeader a|1","#fbPhotoPageHeader a|2",""]; // Classic
modes[1] = ["S","#fbPhotoSnowbox",".stageWrapper",".arrowLeft a",".arrowRight a","#fbPhotoStageActions"]; // Aug. 2011

setupPage();
document.body.addEventListener("DOMSubtreeModified", checkURI, false);

function checkURI(e){
  if (location.href.indexOf("photo.php")>-1 || location.href.indexOf("album.php")>-1) setupPage();
}
function setupPage(){
  var i, tgt, ns;
  for (i=0; i<modes.length; i++){
    if (document.querySelector(modes[i][1])){
      if (!document.getElementById("JSOverlayPreviousPhoto"+ modes[i][0])){
        // Add overlays
        tgt = document.querySelector(modes[i][2])
        addJSOverlays(tgt, modes[i][0], modes[i][5]);
        // Set action
        assignClickAction(modes[i][0]);
        // Add note after links
        ns = document.createElement("span");
        ns.setAttribute("style","margin:0 4px;color:#888;cursor:pointer;");
        ns.className = "JSOverlaySpan";
        ns.appendChild(document.createTextNode("Overlay Active"));
        ns.addEventListener("click",toggleJSOverlays,true);
        tgt.appendChild(ns);
      }
    }
  }
}
function addJSOverlays(el, str, els) {
  var dp = document.createElement("div");
  dp.setAttribute("style", "width:50%;height:100%;background:transparent;cursor:pointer;position:absolute;top:0;z-index:101");
  dp.style.left = "0";
  dp.id = "JSOverlayPreviousPhoto" + str;
  el.appendChild(dp);
  var dn = document.createElement("div");
  dn.setAttribute("style", "width:50%;height:100%;background:transparent;cursor:pointer;position:absolute;top:0;z-index:101");
  dn.style.right = "0";
  dn.id = "JSOverlayNextPhoto" + str;
  el.appendChild(dn);
  // Promote elements in front of overlays if needed
  if (els != ""){
    document.querySelector(els).style.zIndex = "201";
  }
}
function assignClickAction(str) {
  var ppo = document.getElementById("JSOverlayPreviousPhoto"+str);
  var npo = document.getElementById("JSOverlayNextPhoto"+str);
  if (ppo && npo) {
    ppo.addEventListener("click",navPhoto,true);
    npo.addEventListener("click",navPhoto,true);
  }
}
function navPhoto(e){
  var ov, i, tglink, evt;
  ov = e.target;
  gen = ov.id.substr(ov.id.length-1);
  if (ov.id.indexOf("JSOverlayPrevious")>-1) {
    for (i=0; i<modes.length; i++) {
      if (gen == modes[i][0]){
        if (modes[i][3] != ""){ // try mouse event
          if (modes[i][3].indexOf("|") > -1){
            tglink = document.querySelectorAll(modes[i][3].split("|")[0])[modes[i][3].split("|")[1]];
          } else {
            tglink = document.querySelector(modes[i][3]);
          }
          if (tglink){
            evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            tglink.dispatchEvent(evt);
          }
        } else { // try keyboard event
          evt = document.createEvent("KeyboardEvent");
          evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 37, 0); //left arrow 
          document.querySelector(modes[i][1]).dispatchEvent(evt);
        }
        return;
      }
    }
  }
  if (ov.id.indexOf("JSOverlayNext")>-1) {
    for (i=0; i<modes.length; i++) {
      if (gen == modes[i][0]){
        if (modes[i][4] != ""){ // try mouse event
          if (modes[i][4].indexOf("|") > -1){
            tglink = document.querySelectorAll(modes[i][4].split("|")[0])[modes[i][4].split("|")[1]];
          } else {
            tglink = document.querySelector(modes[i][4]);
          }
          if (tglink){
            evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            tglink.dispatchEvent(evt);
          }
        } else { // try keyboard event
          evt = document.createEvent("KeyboardEvent");
          evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 38, 0); //right arrow  
          document.querySelector(modes[i][1]).dispatchEvent(evt);
        }
        return;
      }
    }
  }
}
function toggleJSOverlays(e) {
  var btn, tog, i, ovl, j, thea, snow, ppo, npo, ppot, npot, spans, i;
  btn = e.target;
  tog = "";
  if (btn.textContent == "Overlay Active") {
    // Attempt to hide overlays if visible
    for (i=0; i<modes.length; i++){
      ovl = document.getElementById("JSOverlayPreviousPhoto"+ modes[i][0]);
      if (ovl){ if (ovl.style.display != "none"){
        if (tog == "") tog = confirm("Remove Previous and Next overlay?");
        if (tog) {
          ovl.style.display = "none";
          document.getElementById("JSOverlayNextPhoto"+ modes[i][0]).style.display = "none";
          spans = document.getElementsByClassName("JSOverlaySpan");
          for (j=0;j<spans.length;j++) spans[j].textContent = "Overlay Inactive";
        }
      }}
    }
  } else {
    // Attempt to show overlays if not visible
    for (i=0; i<modes.length; i++){
      ovl = document.getElementById("JSOverlayPreviousPhoto"+ modes[i][0]);
      if (ovl){ if (ovl.style.display == "none"){
        if (tog == "") tog = confirm("Restore Previous and Next overlay?");
        if (tog) {
          ovl.style.display = "";
          document.getElementById("JSOverlayNextPhoto"+ modes[i][0]).style.display = "";
          spans = document.getElementsByClassName("JSOverlaySpan");
          for (j=0;j<spans.length;j++) spans[j].textContent = "Overlay Active";
        }
      }}
    }
  }
}
