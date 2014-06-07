// ==UserScript==
// @name           Lösungen anzeigen
// @namespace      mmp.bplaced.net
// @description    Zeigt die Lösungen bei bestimmten Lückentexten an
// @include        http://sprachen.kanti-chur.ch/*
// ==/UserScript==

var newDiv = document.createElement("div");
newDiv.id = "SolutionsDiv";
document.getElementById("InstructionsDiv").appendChild(newDiv);
var einsetzen = "<input type='button' onclick='for (var i = 0; i < 300; i++) {ShowHint();} HideFeedback();' value='Lösungen'>";
document.getElementById("SolutionsDiv").innerHTML = einsetzen;
document.getElementById("CheckButton2").addEventListener("click", function()
{
document.getElementById("FeedbackContent").innerHTML = "Richtig! Gut gemacht!<br>Dein Resultat ist 78%.";
var t=setTimeout('document.getElementById("InstructionsDiv").innerHTML = "Richtig! Gut gemacht!<br>Dein Resultat ist 78%."', 100);
}, false);