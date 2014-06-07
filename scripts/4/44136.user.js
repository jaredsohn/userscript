// ==UserScript==
// @name           What.cd? Sort Collage By Year
// @namespace      http://death2y.uuuq.com/
// @description    Sorts a collage on what.cd by the release year
// @include        http*://*what.cd/collage.php?action=manage&collageid=*
// ==/UserScript==

var pending = 0; //How many are waiting to be updated

function sortByYear() {
    if (!window.confirm("Sort releases by year?"))
        return false;
    
    var items = document.getElementsByTagName("tr");
    var years = new Array();
    for (var i=1; i<items.length; i++) { //Starts at one to skip the heading
        var info = items[i].getElementsByTagName("td");
        var year = info[1].innerHTML;
        year = year.split("[")[1].split("]")[0];
        years.push(year);
    }
    years = years.sort();
    GM_log(years);
    
    //Go through each year in the array
    var foundsList = new Array(); //Array of what ones have been ordered
    foundsList.push(null);
    for (i in years)
        foundsList.push(false);
    GM_log(foundsList);
    
    for (i in years) {
        //Find the first torrent in the list that has that year
        var notFound = true;
        var index = 0;
        while (notFound) {
            index++; //Again, start search at one, not zero
            var info = items[index].getElementsByTagName("td");
            var year = info[1].innerHTML;
            year = year.split("[")[1].split("]")[0];
            //Check if this is the year we're looking for
            if ( (years[i] == year) && (foundsList[index] == false) ) {
                notFound = false; //We found it
                foundsList[index] = true;
                //info[0].getElementsByTagName("input")[3].value = i + "0";
                //Submit the data to update it
                pending++; //One more is pending
                var postdata = "action=manage_handle";
                var data = info[0].getElementsByTagName("input");
                postdata += "&collageid=" + data[1].value;
                postdata += "&groupid="   + data[2].value;
                postdata += "&sort="      + (i*1+1) + '0';
                postdata += "&submit=Edit";
                GM_xmlhttpRequest({ 'method' : "POST",
                                    'url' : data[0].form.action,
                                    'headers' : {'Content-Type' : 'application/x-www-form-urlencoded'},
                                    'data' : postdata,
                                    'onload' : function() {
                                        pending--;
                                        if (pending == 0)
                                            alert("Done!");
                                            window.location.reload();
                                    }
                });
            }
        }
    }
    
    //alert("Done!");
}
GM_registerMenuCommand("What.cd? Sort collage by year",sortByYear);

//Add button to the page
var sortButton = document.createElement("a");
sortButton.innerHTML = '[Sort collages by release year]';
sortButton.addEventListener("click",sortByYear,true);
sortButton.href="#";
sortButton.style.margin = "1em";

var mainTable = document.getElementsByTagName("table")[0];
mainTable.parentNode.insertBefore(sortButton,mainTable);
