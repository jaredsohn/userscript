// ==UserScript==
// @name          Igoogle Themes To Netvibes
// @include       http://www.google.com/help/ig/art/artists/*
// ==/UserScript==

function changeTheLink(){
  var theLinkHref = document.getElementById("main").getElementsByTagName("div")[0].getElementsByTagName("a")[0].getAttribute("href");
  var theLinkNewHref = theLinkHref.replace("http://www.google.com/ig/sharetheme?skin=", "http://www.netvibes.com?theme=");
  document.getElementById("main").getElementsByTagName("div")[0].getElementsByTagName("a")[0].setAttribute("href", theLinkNewHref);

  var theDescText = document.getElementById("main").getElementsByTagName("div")[0].getElementsByTagName("p")[0].firstChild.data;
  var theDescNewText = theDescText.replace("iGoogle", "Netvibes");
  document.getElementById("main").getElementsByTagName("div")[0].getElementsByTagName("p")[0].firstChild.data = theDescNewText;
}

window.addEventListener('load', function(){changeTheLink();}, false);
