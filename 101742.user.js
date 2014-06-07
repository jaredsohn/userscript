// ==UserScript==
// @name           Reddit Down Refresh Counter
// @namespace      nemec
// @description    Tells you how long since you last refreshed when Reddit is down.
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

function create(){
  var counter_box = document.createElement('div');
  counter_box.id = "counter_box";
  counter_box.setAttribute("style", "\
    position:absolute;\
    text-align:center;\
    vertical-align:middle;\
    left:0;\
    top:0;\
    width:160px;\
    height:50px;\
    display:block;\
    margin-top:10px;\
    margin-left:10px;\
    background-color: rgb(0, 0, 0);\
    background-color: rgba(0, 0, 0, 0.7);\
    -moz-border-radius: 10px;\
    border-radius: 10px;\
    z-index: 100;\
  ");

  var label = document.createElement('div');
  label.setAttribute("style", "\
    position:relative;\
    top:12%;\
    color:#F40;\
  ");
  label.innerHTML = "Time since refresh:";
  counter_box.appendChild(label);

  var counter = document.createElement('div');
  counter.id = "counter";
  counter.innerHTML = "0s";
  counter.time = "0";
  counter.setAttribute("style", "\
    position:relative;\
    top:12%;\
    color:#F40;\
    font-weight:bold;\
  ");
  counter_box.appendChild(counter);
  document.getElementsByTagName('body')[0].appendChild(counter_box);

  setInterval(count, 1000);
}

function count(){
  var ct = document.getElementById('counter');
  var time = parseInt(ct.time);
  ct.time = time + 1;
  var hours = Math.floor(time / 3600);
  time -= hours * 3600;
  var minutes = Math.floor(time / 60);
  time -= minutes * 60;
  var str = "";
  if(hours > 0)
    str += hours + "h ";
  if(hours > 0 || minutes > 0)
    str += minutes + "m ";
  str += time + "s";
  ct.innerHTML = str;
}

down_titles = ["Ow! -- reddit.com", "Reddit broke!"];
for(var i=0; i<down_titles.length; i++){
  if(document.title == down_titles[i]){
    create();
    break;
  }
}

