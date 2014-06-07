// ==UserScript==
// @name           Background be gone
// @namespace      bg_be_gone
// @description    Script to set the background color to white on der-/die-/dasstandard.at
// @author         Dominik Grafenhofer, http://www.grafenhofer.at
// @description    Entfernt farbigen Hintergrund von derstandard.at
// @include        http*://derstandard.at/*
// @include        http*://diestandard.at/*
// @include        http*://mobil.derstandard.at/*
// ==/UserScript==

// Version 0.1.2, License: GPL v2 or GPL v3 at your choice

var domain = window.location.hostname;
var tmpelements;

if (domain == "derstandard.at" || domain == "diestandard.at") {                  // der-/diestandard.at forum
  var tmpelement = document.getElementById("documentCanvas");
  if (tmpelement) { tmpelement.style.backgroundColor = "white"; }
  tmpelement = document.getElementById("navigation");
  if (tmpelement) { tmpelement.style.backgroundColor = "white"; }
  document.body.style.backgroundColor = "white";
  tmpelements = document.getElementsByClassName("up");
  if (tmpelements[0]) {
    tmpelements = document.getElementsByClassName(tmpelements[0].firstChild.className);            // class name of postings is "Resort"-dependent
    for (i = 0; i < tmpelements.length; i++) {
      tmpelements[i].style.backgroundColor = "white";
    }
  }
  tmpelements = document.getElementsByClassName("SponsorCFrame");
  for (i = 0; i < tmpelements.length; i++) {
    tmpelements[i].style.backgroundColor = "white";
  }
  tmpelements = document.getElementsByClassName("SponsorCFrame2");
  for (i = 0; i < tmpelements.length; i++) {
    tmpelements[i].style.backgroundColor = "white";
  }
}

if (domain == "mobil.derstandard.at") {                  // mobil.derstandard.at
  document.body.style.backgroundColor = "white";
  tmpelements = document.getElementsByClassName("orientation");
  for (i = 0; i < tmpelements.length; i++) {
    tmpelements[i].style.backgroundColor = "white";
  }
}