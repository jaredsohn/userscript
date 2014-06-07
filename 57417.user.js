// ==UserScript==
// @name           Keyboard forum navigator
// @author         CommisGordon
// @namespace      imhfo.net
// @include        *endoftheinter.net/*
// @description    this script allows for easy navigation of the boards and links using just a keyboard. To turn a page just press ctrl + arrow key (left/right) in the direction you want to turn. To scroll through topics, press ctrl + arrow key (up/down) When the link you'd like to view is hi-lited just hit enter to enter that topic or link.
// ==/UserScript==

var select_color = "WHITE";  // Change this to the color you want your hilited topics to be
var trs;
var tr_index = 1;
var next = true;

//Lets check to see if we're on the last page
var stuff = document.body.innerHTML.match(/Page (.*?) of <span>(.*?)<\/span>/);
if(stuff==undefined || stuff[1]==stuff[2]){
  next = false;
}

//Function to hijack user input
function handlepress(e){
var code = e.keyCode;
var mods = e.ctrlKey;
if(code==39 && mods){
  var next_page;
  var newLoc = window.location.toString().split("?")[0];
  var get = window.location.toString().split("?")[1].split("&");
  var loc = -1;
  for(var i=0;i<get.length;i++){
    if(get[i].indexOf("page")!=-1){
      loc = i;
    }
  }
  if(loc!=-1){
    if(next){
      var page = get[loc].split("=")[1];
      page++;
      next_page=page+1;
      get[loc]="page="+page;
    }else{
      alert("You are on the last page");
    }
  }else{
    get.push("page=2");
  }
  newLoc+="?"+get.join("&");
  window.location =newLoc
}
if(code==37 && mods){
  var go = 1;
  var newLoc = window.location.toString().split("?")[0];
  var get = window.location.toString().split("?")[1].split("&");
  var loc = -1;
  for(var i=0;i<get.length;i++){
    if(get[i].indexOf("page")!=-1){
      loc = i;
    }
  }
  if(loc!=-1){
    var page = get[loc].split("=")[1];
    if(page>1){
      page--;
    }else{
      go=0;
    }
    get[loc]="page="+page;
  }
  newLoc+="?"+get.join("&");
  if(go){
    window.location =newLoc;
  }else{
    alert("You are already on the first page");
  }
}
else if(code==38 && mods && tr_index>1){
  decolor(trs[tr_index]);
  tr_index--;
  color(trs[tr_index]);
  window.scrollTo(0,trs[tr_index].offsetTop);

}else if(code==40 && mods && tr_index<trs.length-1){
  decolor(trs[tr_index]);
  tr_index++;
  color(trs[tr_index]);
  window.scrollTo(0,trs[tr_index].offsetTop);
}
else if(code==13){
  var link = trs[tr_index].getElementsByTagName("a");
  window.location = link[0].href;
}
}

window.addEventListener("keypress",handlepress,false);

//Event handler to get the topic list
window.addEventListener("load",function(e){
var tables = document.getElementsByTagName("table");
if(tables.length>0){
  trs = tables[1].getElementsByTagName("tr");
  color(trs[tr_index]);
}
},false);

//Function to hilite topics
function color(tr){
  if(tr!=null){
    var tds = tr.getElementsByTagName("td");
    for(var i=0;i<tds.length;i++){
      tds[i].setAttribute("style","background-color:"+select_color+"; height:30px"); //Sets the style of the highlited topic (CSS users only)
    }
  }
}

//Function to set topics back to original color
function decolor(tr){
  if(tr!=null){
    var tds = tr.getElementsByTagName("td");
    for(var i=0;i<tds.length;i++){
      tds[i].setAttribute("style","background-color:none; height:inherit;");
    }
  }
}
  