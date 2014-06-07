// ==UserScript==
// @name fastpars.habrahabr.ru
// @namespace fastpars.habrahabr.ru
// @match http://habrahabr.ru/*
// @author fastpars
// @version 0.4.1
// @icon http://habrahabr.ru/media/userpic/avatar/60/03/31/46797.png
// ==/UserScript==

var hideStyle = '#layout{min-width:0;max-width:none}'+
  '.sidebar_right{display:none}'+
  '.content_left{width:100%}'+

  '#main-content{width:100%}'+
  '#sidebar{display:none}'+
  '#viva-la-w3c{width:100%}'+
  'div.header{max-width:none}'+
  '#wrapper{max-width:none}'+
  '#inner{max-width:none}';

var
  bg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAYAAABxVAqfAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAACJElEQVRYw+2XTUsbURSGn/ligpkESRNBMEjAkhbRWZTubAnddJFdcVlw59KdP6F/wJ1LwY0g3WVRCn4Ud9JiWkSioGAoWNrYoOlHHOdOF1nFkGQaZyZNnbM8XHjue86Zc+eVHMdx6EPI9Ck8AS+sbrC4tt2UW1zbZmF1IzjFtVqlP6W2besO9DgEh+CewUII1ndLbB2UPQOrbg4dfanyrvQZgIQRYTqdCkZxdjRB3swAsLKzz2nlwhvFnXbqzbBswfJmkVezTwZzuFSApZfPuh588+mEQvEETZGZz5nB9Pjw7JzC3jEAczOTjCfjwUz1xMgwTx+MkTSGPJlo12BZlpl9nA1XZggOwcGCFUXrD9gw7rk6J4XeKQT34hRvhuM4Le5R9VKFENdY1m8sqw6ApuloWgRJUnp7Ft1Gvf6Dq6tfTc5RCJtIJO5vj2372lXOc8W2bXF5WWvKxWKG/+BOIN/B/7xi2W/FrsBbB2XWd0sIIYLr8cfyV16/PwJgaixFdjThf49PKxes7OwDkDczPUP/WvHyZhHLbpS3UGx4pG7Rzm8Nxnc8nzNZevsByxbkzQzPpzK3nmpJkohGh5Akqf1UjyfjzM1MNkq9d8zh2fmtFMdiBoYRbQttKvV0OsWLR/f5VvvJxMhwsJsr9zD9f+zqTpcIX6fBVKwoGtXq96ZLtPNSHoPVFsWKovoP1vUosqy0/N76DpZlFV030PXufb57bvEPwGa//UAVYhEAAAAASUVORK5CYII=";

var D_p  = qS(".main_menu");
if(D_p.length == undefined){
  var
    D_p_l        = qS(".main_menu> div"),
    navBar       = D_p.appendChild(cE('div'));
} else {
  D_p          = qS("ul.panel-nav-top");
  var
    D_p_l        = qS("ul.panel-nav-top li"),
    navBar       = D_p.insertBefore(cE('li'), D_p_l[D_p_l.length-1]);
}


function qS(qCSS) {
  var s = document.querySelectorAll(qCSS);
  if(s.length == 1) return s[0];
  return s;
}

function gTN(tagName) {
  var t = document.getElementsByTagName(tagName);
  if(t.length == 1) return t[0];
  return t;
}

function cE(eName) {
  return document.createElement(eName);
}

var ua = navigator.userAgent.toLowerCase();

function chUA(str) {
  return ua.indexOf(str) != -1;
}

var
  head = gTN('head'),
  css = cE('style');

head.appendChild(css);

function setStyle(style){
  css.innerHTML = style;
}

function hideRColl(){
  setStyle(hideStyle);
  navBar.style.backgroundPosition = "0 -30px";
  localStorage.showRColl = false;
}

function showRColl(){
  setStyle('');
  navBar.style.backgroundPosition = "0 0";
  localStorage.showRColl = true;
}

function toggleRead(){
  if(localStorage.showRColl == "true"){
    hideRColl();
  } else {
    showRColl();
  }
}

navBar.setAttribute("style", "background:url("+ bg +") no-repeat; float:left; height:30px; width:30px; cursor:pointer;margin-top:6px;");

if(localStorage.showRColl == undefined){
  localStorage.showRColl = true;
} else if(localStorage.showRColl == "false"){
  hideRColl();
}

if(chUA('firefox'))
  navBar.setAttribute("onclick", "toggleRead()");
else
  navBar.onclick = function(){toggleRead();}

unsafeWindow.toggleRead = function(){toggleRead();}