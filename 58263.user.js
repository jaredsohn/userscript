// ==UserScript==
// @name           PT Email Word Count
// @namespace      http://axisofevil.net/~xtina/
// @description    Adds a "Word Count" button on the Psychology Today email page.
// @include        http://*.psychologytoday.com/*/email_prof.php*
// ==/UserScript==

// With thanks here:
// http://javascript.internet.com/forms/word-count.html

var emailBody = document.getElementsByTagName("textarea")[0];

var buttonRow = emailBody.parentNode.parentNode.nextSibling.nextSibling.childNodes[0].nextSibling.nextSibling;

var newButton = document.createElement("input");
newButton.setAttribute("type", "button");
newButton.setAttribute("value", "Word Count");
newButton.setAttribute("onClick", "var emailBody = document.getElementsByTagName(\"textarea\")[0]; var char_count = emailBody.value.length; var fullStr = emailBody.value + \" \"; var initial_whitespace_rExp = /^[^A-Za-z0-9]+/gi; var left_trimmedStr = fullStr.replace(initial_whitespace_rExp, \"\"); var non_alphanumerics_rExp = rExp = /[^A-Za-z0-9]+/gi; var cleanedStr = left_trimmedStr.replace(non_alphanumerics_rExp, \" \"); var splitString = cleanedStr.split(\" \"); var word_count = splitString.length -1; if (fullStr.length <2) { word_count = 0; } if (word_count == 1) { wordOrWords = \" word\"; } else { wordOrWords = \" words\"; } alert (\"Word Count: Roughly \" + word_count + wordOrWords + \" (of 200)\");");

buttonRow.appendChild(newButton);
