// ==UserScript==
// @name           D2JSP_GVaultNumbers
// @namespace      http://dknightstudios.org
// @description    Shows player vault numbers in the member's current guild page
// @include        http://*.d2jsp.org/guild.php?a=1
// @include	   http://*.d2jsp.org/guild.php?*&o=*

// @version        1.1.0
// @require        http://userscripts.org/scripts/source/74144.user.js
// ==/UserScript==

try {
	ScriptUpdater.check(101036, "1.1.0");
} catch(e) { };

var x, y, z;
var cTable, cRow, cTD, cA, cLink, cAdminCheck;
var allRows;
var datTD, datTH;
var isAdmin=false;
var allTables = document.getElementsByTagName("table");

cTable = allTables[1];

if(cTable.getElementsByTagName("input").length > 0){
    isAdmin = true;
}
else{
    isAdmin = false;
}


allRows = cTable.getElementsByTagName("tr");

datTH = document.createElement("th");
datTH.innerHTML = "Vault #";

if(isAdmin){
    allRows[0].insertBefore(datTH, allRows[0].getElementsByTagName("th")[2]);
}
else{
    allRows[0].insertBefore(datTH, allRows[0].getElementsByTagName("th")[1]);
}



//alert(allRows[0].getElementsByTagName("th")[1].innerHTML)

for(x = 1; x < allRows.length; x++){
    cRow = allRows[x];
    cTD = cRow.getElementsByTagName("td")[0];
    //cAdminCheck = cRow.getElementsByTagName("input");
    //alert(cAdminCheck.length);
    if(isAdmin){
        cTD = cRow.getElementsByTagName("td")[1];
    }
    else{
        cTD = cRow.getElementsByTagName("td")[0];
    }
    
    
    
    cA = cRow.getElementsByTagName("a")[0];
    cLink = cA.getAttribute("href").substr(11);
    
    datTD = document.createElement("td");
    datTD.innerHTML = cLink;
    
    if(isAdmin){
        cRow.insertBefore(datTD, cRow.getElementsByTagName("td")[2]);
    }
    else{
        cRow.insertBefore(datTD, cRow.getElementsByTagName("td")[1]);
    }
    
    //alert(cLink);
    
    
}
