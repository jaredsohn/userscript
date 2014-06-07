// ==UserScript==
// @name           SH Assistant
// @namespace      http://www.source.site90.com/
// @description    Makes playing slavehack a bit easier
// @include        http://www.slavehack.com/index2.php*
// @version       1.4
// ==/UserScript==

// Chrome users can replace localhost with something else to mask their IP with.
var IP_MASK = "localhost";

if (GM_registerMenuCommand){
    GM_registerMenuCommand("Change IP Mask", changeMask);
}

if (document.getElementById("editlog")){ // No log file on page - nothing to do
    var myip = document.getElementById("content").getElementsByTagName("h2")[0].innerHTML.split("'")[1];
    if (document.getElementById("editlog").innerHTML.match(myip)){ // Log file found and contains your ip
        if (GM_getValue){
            if (GM_getValue.toString && GM_getValue.toString().indexOf("not supported")!=-1){
                var mask = IP_MASK;
            }
            else{
                var mask = GM_getValue("mask", "localhost");
            }
        }
        else{
            var mask = IP_MASK;
        }
        var logFile = document.getElementById("editlog");
        var events = logFile.innerHTML.split("\n");
        var replacement = "";
        for (i = 0; i < events.length; i++){
            events[i] = events[i].replace(myip, mask);
            replacement = replacement + events[i] + "\n";
        }
        logFile.innerHTML = replacement;
        document.getElementById("editlog").parentNode.submit()
    }
    else{ // Log file does not contain your ip
        var listButton = document.createElement("input");
        listButton.type = "button";
        listButton.value = "list Addresses";
        listButton.id = "listButton";
        document.getElementById("editlog").parentNode.insertBefore(listButton, document.getElementById("editlog"));
        document.getElementById("listButton").addEventListener("click", list, true);
        
        var filterButton = document.createElement("input");
        filterButton.type = "button";
        filterButton.value = "Filter Addresses";
        filterButton.id = "filterButton";
        document.getElementById("editlog").parentNode.insertBefore(filterButton, document.getElementById("editlog"));
        document.getElementById("filterButton").addEventListener("click", filter, true);
        
    }
}

function list(){
    var events = document.getElementById("editlog").innerHTML.split("\n");
    var replacement = "";
    for (i = 0; i < events.length; i++){
        ipaddr = events[i].match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/)
        if (ipaddr){
            replacement = replacement + ipaddr + "\n";
        }
        document.getElementById("editlog").innerHTML = replacement;
    }
}

function filter(){
    var events = document.getElementById("editlog").innerHTML.split("\n");
    var replacement = "";
    for (i = 0; i < events.length; i++){
        ipaddr = events[i].match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/)
        if (ipaddr){
            replacement = replacement + events[i] + "\n";
        }
        document.getElementById("editlog").innerHTML = replacement;
    }
}

function changeMask(){
    if (GM_getValue){
        mask = GM_getValue("mask", "localhost");
        newMask = prompt("New IP mask:", mask);
        GM_setValue("mask", newMask);
    }
    else{
        alert("Upgrade your version of greasemonkey to use this feature");
    }
}
