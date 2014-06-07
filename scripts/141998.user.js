// ==UserScript==
// @name           Dark AnimeFtw Layout
// @description    A darker layout for animeftw.tv
// @include        http://www.animeftw.tv/*
// ==/UserScript==


function changePage(){
  document.body.style.background = "#141423"
  document.getElementById("va").style = "color:white; font-weight:bold;";
  document.getElementById("socialbar").style.background = "#141423";

  var searchBar = "background:#000000; color:#FFFFFF; border:solid #11B4E9 1px; border-top:none;"
  var newsText = "color:#11B4E9;"
  var socialLinks = "background:#141423; border:solid red 2px;"
  var deleteFooter = "display:none;"
  elementFilter("div", "header-search-nav", searchBar);
  elementFilter("span", "search-text-pre", newsText);
  elementFilter("td", "footer-panels", deleteFooter);
}


function elementFilter(myElement, myClass, demands){
  var total = document.getElementsByTagName(myElement).length;
  var i = 0;
  for (i=0; i<total; i++){
    if(document.getElementsByTagName(myElement)[i].className == myClass){
      document.getElementsByTagName(myElement)[i].style = demands;
    }
  }
}


changePage();