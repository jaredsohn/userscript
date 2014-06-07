// ==UserScript==
// @name       Popup killer for Maven FUCKING Central webui
// @version    0.1
// @description  Removes damn FUCKING useless popups from maven central webui.
// @match      http://search.maven.org/**
// ==/UserScript==

var popupTable = document.getElementById("popup")
popupTable.parentNode.removeChild(popupTable)