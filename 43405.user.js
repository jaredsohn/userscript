// ==UserScript==
// @name           Search Groups Easier
// @namespace      joey@jwvmods.com
// @include        http://*.roosterteeth.com/*
// @include        https://*.roosterteeth.com/*
// ==/UserScript==

(function() {
    var m4 = document.getElementById("m4");
    var allLinks = m4.getElementsByTagName("a");
    var memberslink;
    for(i in allLinks) {
        if(allLinks[i].innerHTML == "Groups Network (BETA)") {
            memberslink = allLinks[i];
            break;
        }
    }
    var newForm = document.createElement("form");
    newForm.method = "GET";
    newForm.action = "/groups/searchResults.php";
    
    var input = document.createElement("input");
    input.type = "text";
    input.maxLength = "20";
    input.name = "keywords";
    input.style.width = "99%";
    input.defaultValue = "Groups Search";
    input.style.color = "grey";
    input.style.fontStyle = "italic";
    input.addEventListener("click", function() {
        if(input.value == "Groups Search") {
            input.value = "";
            input.style.color = "black";
            input.style.fontStyle = "normal";
        }
    }, false);
    input.addEventListener("blur", function() {
        if(input.value == "") {
            input.value = "Groups Search";
            input.style.color = "grey";
            input.style.fontStyle = "italic";
        }
    }, false);
    
    //var newDiv = document.createElement("div");
   // newDiv.width = "80%";
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
   // newForm.appendChild(newDiv);
    m4.replaceChild(newForm, memberslink);
})();