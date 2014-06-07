// ==UserScript==
// @name        FixLingq
// @namespace   http://userscript.org/users/spatterson
// @include     http://www.lingq.com/learn/*/reader*
// @version     2
// @grant       none
// ==/UserScript==

(function() {
  //document.body.style.backgroundColor = "#707070";
  //document.body.style.backgroundColor = "#666666";
  //document.body.style.backgroundColor = "#555555";
  //document.body.style.backgroundColor = "white";
  document.body.style.backgroundColor = "#F5F2F7";
  document.body.style.backgroundImage = "none";
  
  var pokemonDiv = document.getElementById("avatar-widget");
  if (pokemonDiv) {
     pokemonDiv.style.display = "none";
  }
  
  var hdDiv = document.getElementById("hd");
  hdDiv.style.backgroundImage = "none";
  
  var bdDiv = document.getElementById("bd");
  bdDiv.style.width = "95%";
  

  
  // 60/40 for the reading/details pane
  var readingDiv = document.getElementById("main-col");
  readingDiv.style.width = "60%";
  
  var sideDiv = document.getElementById("sidebar");
  sideDiv.style.width = "40%";
  
  var pageDiv = document.getElementById("page");
  /*
  pageDiv.style.borderWidth = '0em'; 
  pageDiv.style.borderRadius = '0em'; 
  pageDiv.style.MozBorderRadius = '0em';
  pageDiv.style.WebkitBorderRadius = '0em';
  */
  
  // Reduce the margins a bit on the content
  var contentDiv = document.getElementById("content");
  contentDiv.style.marginLeft = "5px";
  
  var readingList = document.querySelectorAll(".reading-block");
  if (readingList) {
    readingList[0].style.paddingLeft = "5px";
  }
  
  
})();