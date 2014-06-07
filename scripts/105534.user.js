// ==UserScript==
// @name           What.cd? Sort Collage By Year
// @description    Sorts a collage on what.cd by the release year
// @include        http://what.cd/collages.php?action=manage&collageid=*
// ==/UserScript==

function processAlbums(postdata, i) {
    if (i >= postdata.length) {
        alert("Done!");
        window.location.reload();
    }
    GM_xmlhttpRequest({ 'method'  : "POST",
                        'url'     : 'http://what.cd/collages.php',
                        'headers' : {'Content-type' : 'application/x-www-form-urlencoded'},
                        'data'    : postdata[i],
                        'onload'  : function(responseDetails) {
                            //alert(postdata[i] + ": " + responseDetails.status + ":" + responseDetails.statusText);
                            processAlbums(postdata, i+1);
                            },
                        'onerror' : function(responseDetails) {
                            alert(responseDetails.statusText);
                        }
                       });
}

function sortByYear() {
    if (!window.confirm("Sort releases by year?"))
        return false;
    
    sortButton.innerHTML = 'Processing Albums... Please Wait';
    
    var items = document.getElementsByTagName("tr");
    var years = new Array();
    for (var i = 1; i < items.length; i++) { // Starts at one to skip the heading
        var year = items[i].getElementsByTagName("td")[1].innerText.match(/\[(\d\d\d\d)\]$/);
        years.push(year[1] + "," + i);
    }
    years = years.sort();
    
    var postsdata = new Array();
    for (var i = 0; i < years.length; i++) {
       var postdata = "action=manage_handle";
       var row = items[years[i].split(",")[1]];
       var inputs = row.getElementsByTagName("input");
       var collageid = 0, groupid = 0, auth = 0;
        
       for (input in inputs) {
           if (inputs[input].getAttribute("name") == "collageid") {
               collageid = inputs[input].value;
           } else if (inputs[input].getAttribute("name") == "groupid") {
               groupid = inputs[input].value;
           } else if (inputs[input].getAttribute("name") == "auth") {
               auth = inputs[input].value;
           }
           if (collageid && groupid && auth) {
               break;
           }
       }
        
       postdata += "&collageid=" + collageid + "&groupid=" + groupid + "&auth=" + auth;
       postdata += "&sort="      + ((i + 1) * 10);
       postdata += "&submit=Edit";
       postsdata.push(postdata);
    }
    //alert(postsdata);
    processAlbums(postsdata, 0);
    //return false;
}
GM_registerMenuCommand("What.cd? Sort collage by year", sortByYear);

//Add button to the page
var sortButton = document.createElement("a");
sortButton.innerHTML = '[Sort collages by release year]';
sortButton.addEventListener("click", sortByYear, true);
sortButton.href="#";
//sortButton.style.margin = "1em";

var mainTable = document.getElementsByTagName("table")[0];
mainTable.parentNode.insertBefore(sortButton, mainTable);
