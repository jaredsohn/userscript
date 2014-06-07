// ==UserScript==
// @name       CreditKarma Manual Credit Score Updater
// @version    130801
// @description  Returns the ability to manually update your credit score daily on CK Insight
// @match      https://www.creditkarma.com/dashboard
// @grant      none
// ==/UserScript==

var tsb = document.getElementById("transriskScoreBlock");
tsb.setAttribute("shouldautoupdatescore","yes");
var updatebtn = document.createElement("a");
updatebtn.textContent = "(Update Now)";
updatebtn.setAttribute("style", "margin-left:10px;");
updatebtn.setAttribute("onclick", "CK.App.Default.Dashboard.scoreUpdate();");
tsb.firstElementChild.appendChild(updatebtn);