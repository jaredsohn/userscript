// ==UserScript==
// @name           Hobowars Explorer Hotkey
// @namespace      http://www.turtlebomb.com
// @description    Adds hotkeys for exploring on hobowars2 Q,W,E,A,D,Z,X,C
// @include        http://www.hobowars.com/*
// @include        http://hobowars.com/*
// @include        http://www.hobowars2.com/*
// @include        http://hobowars2.com/*
// ==/UserScript==


var pageurl = window.location.href;
var exploretest = pageurl.match('&cmd=explore&do=move');


if (exploretest) {

  var searchx = pageurl.search("&x=");
  var searchy = pageurl.search("&y=");
  var searchz = pageurl.search("&dir=d");

  var xpos = pageurl.slice(searchx,searchy);
  var ypos = pageurl.slice(searchy,searchz);

  document.addEventListener('keypress', function(e){
    var xcode = e.charCode 
    if(xcode==81 || xcode==113) {
      xpos-=1;
      ypos+=1;
      location.href = pageurl.slice(0,searchx) + "&x=" + xpos + "&y=" + ypos + pageurl.slice(searchz);
      }
    if(xcode==87 || xcode==119) {
      ypos+=1;
      location.href = pageurl.slice(0,searchx) + "&x=" + xpos + "&y=" + ypos + pageurl.slice(searchz);
      }
    if(xcode==69 || xcode==101) {
      xpos+=1;
      ypos+=1;
      location.href = pageurl.slice(0,searchx) + "&x=" + xpos + "&y=" + ypos + pageurl.slice(searchz);
      }
    if(xcode==65 || xcode==97) {
      xpos-=1;
      location.href = pageurl.slice(0,searchx) + "&x=" + xpos + "&y=" + ypos + pageurl.slice(searchz);
      }
    if(xcode==68 || xcode==100) {
      xpos+=1;
      location.href = pageurl.slice(0,searchx) + "&x=" + xpos + "&y=" + ypos + pageurl.slice(searchz);
      }
    if(xcode==90 || xcode==122) {
      xpos-=1;
      ypos-=1;
      location.href = pageurl.slice(0,searchx) + "&x=" + xpos + "&y=" + ypos + pageurl.slice(searchz);
      }
    if(xcode==88 || xcode==120) {
      ypos-=1;
      location.href = pageurl.slice(0,searchx) + "&x=" + xpos + "&y=" + ypos + pageurl.slice(searchz);
      }
    if(xcode==67 || xcode==99) {
      xpos+=1;
      ypos-=1;
      location.href = pageurl.slice(0,searchx) + "&x=" + xpos + "&y=" + ypos + pageurl.slice(searchz);
      }

  }, true);
}