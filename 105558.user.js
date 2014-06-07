// ==UserScript==
// @name           What.cd? View Collage In Order
// @description    Sorts the view of a collage on what.cd by year, seeders, or snatched
// @include        http://what.cd/collages.php?id=*
// ==/UserScript==

var torrentTable = document.getElementById("discog_table");

function sortByYear() {
    return sortBy('year');
}

function sortBySeeders() {
    return sortBy('totalSeeders');
}

function sortBySnatches() {
    return sortBy('totalSnatches');
}

function showOriginal() {
    var mainColumn = document.getElementById("collage_table").parentNode;
    for (tn in tableNames) {
        var table = document.getElementById(tableNames[tn]);
        if (table) {
            mainColumn.removeChild(table);
        }
    }
    for (tn in sortedTables) {
        if (sortedTables[tn].tableName == 'discog_table') {
            mainColumn.appendChild(sortedTables[tn].table);
        }
    }
    return false;
}

var tableNames   = ['yearTable', 'totalSeedersTable', 'totalSnatchesTable'];
var sortedTables = new Array();
sortedTables.push({tableName: 'discog_table', table: torrentTable});
 
function sortByValue(a, b) {
    return ((a.value < b.value) ? -1 : (a.value > b.value) ? 1 : 
        (a.index < b.index) ? -1 : (a.index > b.index) ? 1 : 0);
}

function sortBy(key) {
    var tableName  = key + 'Table';
    var mainColumn = document.getElementById("collage_table").parentNode;
    for (tn in tableNames) {
        var table = document.getElementById(tableNames[tn]);
        if (table) {
            mainColumn.removeChild(table);
        }
    }
    for (tn in sortedTables) {
        if (sortedTables[tn].tableName == tableName) {
            mainColumn.appendChild(sortedTables[tn].table);
            return false;
        }
    }
                  
    var order = new Array();
    var rows  = torrentTable.getElementsByTagName("tr");
    
    var totalValue = 0;
    var startIndex = 1;
    
    for (var i = 1; i < rows.length; i++) { // Starts at one to skip the heading
        if (rows[i].getAttribute("class") == "group discog") {
            if (key == 'year') {
                var year = rows[i].getElementsByTagName("td")[2].getElementsByTagName("strong")[0].innerText.match(/\[(\d\d\d\d)\]$/);
                order.push({value: parseInt(year[1]), index: i});
            } else if (i > 1) {
                order.push({value: totalValue, index: startIndex});
                totalValue = 0;
                startIndex = i;
            }
        } else {
            var cells = rows[i].getElementsByTagName("td");
            if (key != 'year' && cells.length == 5) {
                var cellIndex;
                if (key == 'totalSnatches') {
                    cellIndex = 2;
                } else if (key == 'totalSeeders') {
                    cellIndex = 3;
                }
                totalValue += parseInt(cells[cellIndex].innerText.replace(/\,/g,''));
            }
        }
    }
    order = order.sort(sortByValue);
    // alert(order);
    
    sortTable = torrentTable.cloneNode(false);
    var tbody = document.createElement("tbody");
    sortTable.appendChild(tbody);
    
    // copy table header
    tbody.appendChild(rows[0].cloneNode(true));

    for (i in order) {
        var j = order[i].index;
        var groupRow = rows[j++].cloneNode(true);
        if (key == 'totalSnatches' || key == 'totalSeeders') {
            var keyInfo = document.createTextNode("(" + order[i].value + ") ");
            var groupTitle = groupRow.getElementsByTagName("td")[2];
            var groupTags  = groupTitle.getElementsByTagName("div")[0];
            groupTitle.insertBefore(keyInfo, groupTags);
        }
        tbody.appendChild(groupRow);
        while (j < rows.length && rows[j].getAttribute("class") != "group discog") {
            tbody.appendChild(rows[j++].cloneNode(true));
        }
    }

    sortTable.setAttribute("id", tableName);
    sortTable.getElementsByTagName("tr")[0].getElementsByTagName("td")[0].style.width = "50px !important";
    mainColumn.appendChild(sortTable);
    //torrentTable.parentNode.insertBefore(sortTable, torrentTable);
    if (document.getElementById("discog_table")) {
        mainColumn.removeChild(torrentTable);
    }
    //torrentTable.style.display = 'none';
    //sortTable.style.display    = '';
    
    sortedTables.push({tableName: tableName, table: sortTable});
    return false;
} 
GM_registerMenuCommand("What.cd? View Collage by Year", sortByYear);

//Add button to the page
var sortYearButton = document.createElement("a");
sortYearButton.innerHTML = '[View Collage by Year]';
sortYearButton.addEventListener("click", sortByYear, false);
sortYearButton.href = "#";

var sortSeedersButton = document.createElement("a");
sortSeedersButton.innerHTML = '[View Collage by Seeders]';
sortSeedersButton.addEventListener("click", sortBySeeders, false);
sortSeedersButton.href = "#";

var sortSnatchesButton = document.createElement("a");
sortSnatchesButton.innerHTML = '[View Collage by Snatches]';
sortSnatchesButton.addEventListener("click", sortBySnatches, false);
sortSnatchesButton.href = "#";

var originalButton = document.createElement("a");
originalButton.innerHTML = '[Show Original Collage]';
originalButton.addEventListener("click", showOriginal, false);
originalButton.href = "#";

var content = document.getElementById("content");
var linkbox = content.getElementsByClassName("linkbox")[0];
var links   = linkbox.getElementsByTagName("a");

var buttons = [sortYearButton, sortSeedersButton, sortSnatchesButton, originalButton];
var firstLink = links[0];

for (button in buttons) {
    var blank = document.createTextNode(" ");
    linkbox.insertBefore(blank, firstLink);
    linkbox.insertBefore(buttons[button], blank);
    firstLink = buttons[button];
}
