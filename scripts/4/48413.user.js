// ==UserScript==
// @name        CN Colour Changer
// @namespace     CN Colour Changer
// @description	 Provides the user with much nation building info
// @include        http://*cybernations.net/*
// @exclude       http://tournament.cybernations.net/*
// @exclude       http://forums.cybernations.net/*

// Written by Lord Emares of BAPS

// Change the value of tdcolour to a colour of your choice using the handy
// reference provided below

// CN Team Colour Code Reference
// Aqua "66FFFF"
// Black "000000"
// Blue "0000CC"
// Brown "663300"
// Green "003300"
// Orange "FF6600"
// Pink "FF00CC"
// Purple "660066"
// Red "FF0000"
// Maroon "660033"
// Yellow "FFFF00"
// White "FFFFFF"
// None "333333"
// ==/UserScript==

tdcolour = "000080";

function ChangeColour(){
  strTmp = document.body.innerHTML;

  strTmp = strTmp.replace(/000080/g,tdcolour);

  document.body.innerHTML = strTmp;
}

function refreshContent() { //aka main()

	// ******************** Change the HTML around ********************
  ChangeColour();

}

refreshContent();