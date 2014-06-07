// ==UserScript==
// @name       ESL Admin Match Check
// @version    0.2
// @include    http://www.esl.eu/*/admin_match/*
// @description  Sets Status: close, Calc: yes, ticks all checkboxes and scrolls down to match parameters
// @updateURL http://meric.shmoozle.de/esl_admin_match_check.user.js
// ==/UserScript==

function checkMatch() {
    var form = document.forms[2];
    form.status.selectedIndex = 3;
    form.calculate.selectedIndex = 0;
    for (var i=0;i < form.length; ++i) {
        if(form.elements[i].type == "checkbox" && form.elements[i].name != "featured") {
            form.elements[i].checked = true;
        }
    }
    var matches = document.querySelectorAll("div.TitleS");
    var newAnchor = document.createElement("a");
    newAnchor.setAttribute("name", "checked");
    matches[2].appendChild(newAnchor, matches[2].firstChild);
    var targetRes = form.elements[(form.length)-8];
    targetRes.select();
    targetRes.focus();
}

var newLI = document.createElement("li");
var i = document.querySelectorAll("#tabnav .menu ul li").length;
document.querySelector("#tabnav .menu ul").insertBefore(newLI);
var LIlink = document.createElement("a");
LIlink.setAttribute("href", "#checked");
var linkText = document.createTextNode("Check Match");
LIlink.appendChild(linkText);
document.querySelectorAll("#tabnav .menu ul li")[i].appendChild(LIlink);
document.querySelectorAll("#tabnav .menu ul li")[i].addEventListener("click", checkMatch, false);
document.querySelectorAll("#tabnav .menu ul li")[i].style.marginLeft = "15px";
document.querySelectorAll("#tabnav .menu ul li")[i].style.border = "solid 1px #c8c8c8";
document.querySelectorAll("#tabnav .menu ul li")[i].style.fontSize = "11px";
document.querySelectorAll("#tabnav .menu ul li")[i].style.fontColor = "#666666";
document.querySelectorAll("#tabnav .menu ul li")[i].style.fontFamily = "Tahoma,Arial,Helvetica,sans-serif";