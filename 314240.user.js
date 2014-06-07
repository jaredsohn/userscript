// ==UserScript==
// @name        ComicBrowser
// @namespace   http://trgwii.net/
// @include     /^https?://(www\.)?(amazingsuperpowers|cad-comic|calmblueoceans|forlackofabettercomic|happyjar|hejibits|legacy-control|lfgcomic|mercworks|mspaintadventures|oglaf|screencuisine|toonhole|(what-if\.)?xkcd)\.(com|net)/.*$/
// @version     1
// @grant       none
// ==/UserScript==

doc = document;
keys = [];

function prependZeros(input, digits){
  input = input.toString();
  while(input.length < digits) input = "0" + input;
  return input;
}

function isDomain(input){
  if(document.domain.indexOf(input) !== -1) return true;
  else return false;
}

function byClassName(input){
  return document.getElementsByClassName(input)[0];
}


scriptTag = document.createElement("script");
scriptTag.innerHTML = 
  "Object.prototype.searchByAttr = function(attr, val){\n" +
  "  for(i=0;i<this.length;i++){\n" +
  "    if(this[i][attr] == val) return this[i];\n" +
  "    else if(this[i].getAttribute(attr) == val) return this[i];\n" +
  "  }\n" +
  "}\n"
;
document.head.appendChild(scriptTag);

onkeydown = function(e){
  e = e || event;
  arrow(e.keyCode);
  keys[e.keyCode] = true;
}
onkeyup = function(e){
  e = e || event;
  keys[e.keyCode] = false;
}

function arrow(key){
  l = 37;
  r = 39;

  if(isDomain("amazingsuperpowers.com")){
    if(key == l) byClassName("navi-prev").click();
    else if(key == r) byClassName("navi-next").click();
  }
  else if(isDomain("cad-comic.com")){
    if(key == l) byClassName("nav-back").click();
    else if(key == r) byClassName("nav-next").click();
  }
  else if(isDomain("calmblueoceans.com")){
    if(key == l) byClassName("navi-prev").click();
    else if(key == r) byClassName("navi-next").click();
  }
  else if(isDomain("forlackofabettercomic.com")){
    if(key == l) byClassName("navbar").getElementsByTagName("a").searchByAttr("innerHTML", "Prev").click();
    else if(key == r) byClassName("navbar").getElementsByTagName("a").searchByAttr("innerHTML", "Next").click();
  }
  else if(isDomain("happyjar.com")){
    if(key == l) byClassName("navi-prev").click();
    else if(key == r) byClassName("navi-next").click();
  }
  else if(isDomain("hejibits.com")){
    if(key == l) byClassName("navi-prev").click();
    else if(key == r) byClassName("navi-next").click();
  }
  else if(isDomain("legacy-control.com")){
    if(key == l) byClassName("navi-prev").click();
    else if(key == r) byClassName("navi-next").click();
  }
  else if(isDomain("lfgcomic.com")){
    if(key == l) doc.getElementById("navtop-prev").click();
    else if(key == r) doc.getElementById("navtop-next").click();
  }
  else if(isDomain("mercworks.net")){
    if(key == l) byClassName("navi-prev").click();
    else if(key == r) byClassName("navi-next").click();
  }
  else if(isDomain("mspaintadventures.com")){
    if(key == l) doc.getElementsByTagName("a").searchByAttr("innerHTML", "Go Back").click();
    else if(key == r) doc.getElementsByTagName("font").searchByAttr("size", "5").getElementsByTagName("a")[0].click();
  }
  else if(isDomain("oglaf.com")){
    // Dropped support until further notice! :(
  }
  else if(isDomain("screencuisine.net")){
    if(key == l) doc.getElementsByTagName("img").searchByAttr("src", "templates/prevbutton.jpg").parentNode.click();
    else if(key == r) doc.getElementsByTagName("img").searchByAttr("src", "templates/nextbutton.jpg").parentNode.click();
  }
  else if(isDomain("toonhole.com")){
    if(key == l) byClassName("comicnav_images")[0].getElementsByTagName("a").searchByAttr("rel", "prev").click();
    else if(key == r) byClassName("comicnav_images")[0].getElementsByTagName("a").searchByAttr("rel", "next").click();
  }
  else if(isDomain("what-if.xkcd.com")){
    if(key == l) byClassName("nav-prev").getElementsByTagName("a")[0].click();
    else if(key == r) byClassName("nav-next").getElementsByTagName("a")[0].click();
  }
  else if(isDomain("xkcd.com")){
    if(key == l) byClassName("comicNav").getElementsByTagName("a").searchByAttr("accesskey", "p").click();
    else if(key == r) byClassName("comicNav").getElementsByTagName("a").searchByAttr("accesskey", "n").click();
  }
}

function alt(){
  if(isDomain("amazingsuperpowers.com")){
    return document.getElementById("comic-1").getElementsByTagName("img")[0].title;
  }
  else if(isDomain("hejibits.com")){
    return document.getElementById("comic-1").getElementsByTagName("img")[0].title;
  }
  else if(isDomain("mercworks.net")){
    return document.getElementById("comic-1").getElementsByTagName("img")[0].title;
  }
  else if(isDomain("xkcd.com")){
    return document.getElementById("comic").getElementsByTagName("img")[0].title;
  }
}

if(alt() != null){
  altTextTag = document.createElement("div")
  altTextTag.innerHTML = "<span style=\"font-weight:bold;\">Alt-text:</span> " + alt();
  altTextTag.style = "position:fixed;right:0px;bottom:0px;z-index:1337;background-color:lightgray;";
  document.body.appendChild(altTextTag);
}
