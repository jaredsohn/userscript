// ==UserScript==
// @name           Skip Steam age check
// @namespace      http://bmeakings.dyndns.org
// @description    Skip the age verification on Steam's website
// @include        http://store.steampowered.com/agecheck/*
// ==/UserScript==

var ageCheckForm = document.forms[1];

var ageFields = ageCheckForm.getElementsByTagName("select");
ageFields[0].options[26].selected = true;
ageFields[1].options[6].selected = true;
ageFields[2].options[86].selected = true;

ageCheckForm.submit();
