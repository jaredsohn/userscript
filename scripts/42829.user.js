// ==UserScript==
// @name           Replace Find Username
// @namespace      rfu@kw.com
// @description    Replace the "Find Members" link with a textbox to search for a specific username.
// @include        http://*.roosterteeth.com/*
// @include        http://roosterteeth.com/*
// @include        http://redvsblue.com/*
// @include        http://achievementhunter.com/*
// @include        http://strangerhood.com/*
// @include        http://roosterteethcomics.com/*
// ==/UserScript==

(function() {
    var commtab = document.getElementById("navDiv5").getElementsByTagName("div")[0];
    var allLinks = commtab.getElementsByTagName("a");
    var memberslink;
    for(i in allLinks) {
        if(allLinks[i].innerHTML == "Find Members") {
            memberslink = allLinks[i];
            break;
        }
    }
    var newForm = document.createElement("form");
    newForm.method = "POST";
    newForm.action = "/members/find/userResults.php";
    
    var input = document.createElement("input");
    input.type = "text";
    input.maxLength = "20";
    input.name = "user";
    input.style.width = "99%";
    input.defaultValue = "User Search";
    input.style.color = "grey";
    input.style.fontStyle = "italic";
    input.addEventListener("click", function() {
        if(input.value == "User Search") {
            input.value = "";
            input.style.color = "black";
            input.style.fontStyle = "normal";
        }
    }, false);
    input.addEventListener("blur", function() {
        if(input.value == "") {
            input.value = "User Search";
            input.style.color = "grey";
            input.style.fontStyle = "italic";
        }
    }, false);

    var newTd = document.createElement("td");
    var newTd2 = document.createElement("td");
    var newTd3 = document.createElement("td");
    var newTr = document.createElement("tr");
    var newTbody = document.createElement("tbody");
    var newTable = document.createElement("table");
    
    newTd.appendChild(input);
    newTd.width = "122px";
    newTr.appendChild(newTd3);
    newTr.appendChild(newTd);
    newTr.appendChild(newTd2);
    newTbody.appendChild(newTr);
    newTable.appendChild(newTbody);
    newTable.cellPadding = "2px";
    newForm.appendChild(newTable);

    commtab.replaceChild(newForm, memberslink);
})();