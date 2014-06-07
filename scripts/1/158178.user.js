// ==UserScript==
// @name       buzzerbeaterfrance Cleaner
// @version    1.0
// @description    Supprime le bug de buzzerbeaterfrance qui fait bouger l'input de réponse quand on passe la souris sur une option
// @match      http://buzzerbeaterfrance.forumpro.fr/*
// ==/UserScript==
var formatButtons = document.getElementById("format-buttons");
var helpBox = document.getElementById("helpbox");
if((helpBox != null) && (formatButtons != null))
{
    formatButtons.appendChild(helpBox);
}