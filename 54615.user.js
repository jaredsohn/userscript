// ==UserScript==
// @name           Comic Filter
// @namespace      comicfilter@kwierso.com
// @description    Filters the comic
// @include        http://folksoftheforum.smackjeeves.com/archive/
// ==/UserScript==

(function() {
    var main2 = document.getElementById("main2");
    var tableElement = main2.getElementsByTagName("table")[0];
    var imageElement = main2.getElementsByTagName("img")[0];
    var selectElement = document.createElement("select");
    var buttonElement = document.createElement("button");

    buttonElement.innerHTML = "GO";
    buttonElement.addEventListener("click", filterTable, false);
    selectElement.id = "filterSelect";
    var option0 = document.createElement("option");
    option0.innerHTML = "Show everything";
    var option1 = document.createElement("option");
    option1.innerHTML = "Show series";
    var option2 = document.createElement("option");
    option2.innerHTML = "Show fillers and guest comics";

    selectElement.appendChild(option0);
    selectElement.appendChild(option1);
    selectElement.appendChild(option2);

    option0.selected = true;
    main2.insertBefore(selectElement, imageElement);
    main2.insertBefore(buttonElement, imageElement);
})();

function filterTable(e) {
    var aDoc = this.ownerDocument;
    var index = aDoc.getElementById("filterSelect").selectedIndex;
    var tableElement = aDoc.getElementById("main2").getElementsByTagName("table")[0];
    var rowArray = tableElement.getElementsByTagName("tr");

    switch(index) {
        case 0:
            for(i in rowArray)
            rowArray[i].style.display = "table-row";
            break;
        case 1:
            for(i=1; i<rowArray.length;i++) {
                if(rowArray[i].getElementsByTagName("a")[0].innerHTML.search(/FotF\: Bonus/) >= 0 ||
                   rowArray[i].getElementsByTagName("a")[0].innerHTML.search(/FotF\: Filler/) >= 0 ||
                   rowArray[i].getElementsByTagName("a")[0].innerHTML.search(/FotF Guest Comic\:/) >= 0) {
                    try {
                        rowArray[i].style.display = "none";
                    } catch(e) {};
                } else {
                    rowArray[i].style.display = "table-row";
                }
            }
            break;
        case 2:
            for(i=1; i<rowArray.length;i++) {
                if(rowArray[i].getElementsByTagName("a")[0].innerHTML.search(/FotF\: Bonus/) < 0 &&
                   rowArray[i].getElementsByTagName("a")[0].innerHTML.search(/FotF\: Filler/) < 0 &&
                   rowArray[i].getElementsByTagName("a")[0].innerHTML.search(/FotF Guest Comic\:/) < 0) {
                    try {
                        rowArray[i].style.display = "none";
                    } catch(e) {};
                } else {
                    rowArray[i].style.display = "table-row";
                }
            }
            break;
        default:
    }
}