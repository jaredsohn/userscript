// ==UserScript==
// @name           hurf durf fran is fat joke
// @namespace      hurf durf fran is fat joke
// @description    If Chawin or Skyman posts and it includes "Fran", this converts their posts to "hurf durf fran is fat joke"
// @include        http://*.forumwarz.com/discussions/view/*
// @include        http://forumwarz.com/discussions/view/*
// ==/UserScript==

var names = new Array("Chawin","Skyman747");
var namesNoSpace = new Array();

for(var name in names) {
 var tempName = names[name];
 while(tempName.indexOf(" ") > -1) {
  tempName = tempName.slice(0,tempName.indexOf(" ")) + "%20" + tempName.slice(tempName.indexOf(" ")+1);
 }
 namesNoSpace[name] = tempName;
}

var h1 = document.getElementsByTagName("h1");
var karlKoch = new Array();

for(var i=0;i<h1.length;i++) {
  for(var nameNoSpace in namesNoSpace) {
  if(h1[i].children[0].pathname == "/profiles/" + namesNoSpace[nameNoSpace]) {
   karlKoch[karlKoch.length] = h1[i];
  }
  }
}

for(var i = 0; i<karlKoch.length;i++) {
var karledText = karlKoch[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].children[1];
if(karledText.innerHTML.toLowerCase().indexOf("fran") > -1) {
  karledText.innerHTML = "hurf durf fran is fat joke<p></p>";
 }
}

var blockQuotes = document.getElementsByTagName("blockquote");

for(var i = 0; i<blockQuotes.length;i++) {
 if(blockQuotes[i].children.length > 0) {
  for(var name in names) {
   if(blockQuotes[i].children[0].innerHTML == names[name] + " Posted:" && blockQuotes[i].children[0].tagName == "STRONG" && blockQuotes[i].innerHTML.toLowerCase().indexOf("fran") > -1) {
    blockQuotes[i].innerHTML = "<strong>" + names[name] + " Posted:</strong><p></p><p>hurf durf fran is fat joke</p>"
   }
  }
 }
}
