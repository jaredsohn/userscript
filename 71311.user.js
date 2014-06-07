// ==UserScript==
// @name           Fleet Info
// @namespace      apache1990.dod.net
// @description    Shows your selected fleets ship count and tonnage under the caliber rating. (Note: In I5 there is no caliber rating, but the script still functions in the same way.)
// @include        *.war-facts.com/fleet_navigation.php?*
// ==/UserScript==

var req, tonnage, shipCount, pages;

// Stop and grab fleet ID for later
// [BEGIN] Fleet ID getter stolen from WF-Explore Standard v0.5
// Get objFleetMain (<p> tag), depending on what instance we are playing
	var objFleetMain = document.getElementsByName('form2')[0].parentNode.parentNode.parentNode.parentNode.parentNode;
// Get the fleet id. We could just get this from the URL, but that would be too easy.
	var fleet1 = objFleetMain.getElementsByTagName('strong')[1].innerHTML.match(/Fleet Registry #(\d+)/)[1];
// [END] Fleet ID getter stolen from WF-Explore Standard v0.5

function loadXMLDoc(url)
{
    // branch for native XMLHttpRequest object
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        req.onreadystatechange = processReqChange;
        req.open("GET", url, true);
        req.send(null);
    }
}

function processReqChange() 
{
    // only if req shows "complete"
    if (req.readyState == 4) {
        // only if "OK"
        if (req.status == 200) {
            pages = req.responseText;
            if(pages.indexOf("tfleet="+fleet1) != -1){
		    pages = pages.substring(pages.indexOf("tfleet="+fleet1));
	            pages = pages.substring(pages.indexOf("<td class=strong>")+3);
	            if(window.location.hostname == "www4.war-facts.com" || window.location.hostname == "test.war-facts.com"){
	            	pages = pages.substring(pages.indexOf("<td class=strong>")+3);
	            }
	            pages = pages.substring(pages.indexOf("<td class=strong>")+17);
	            shipCount = pages.substring(0, pages.indexOf("</td>"));
	            pages = pages.substring(pages.indexOf("<td class=strong>")+17);
	            tonnage = pages.substring(0, pages.indexOf("</td>"));
		    // Write Output
		    var minitable = document.createElement('table');
	            var row1 = document.createElement('tr');
	            var shipcount2 = document.createElement('td');
	            shipcount2.setAttribute("class", "head");
	            var tonnage2 = document.createElement('td');
	            tonnage2.setAttribute("class", "head");
	            var tonnage3 = document.createElement('td');
	            tonnage3.innerHTML = tonnage;
	            tonnage3.setAttribute("class", "strong");
	            var shipcount3 = document.createElement('td');
	            shipcount3.innerHTML = shipCount;
	            shipcount3.setAttribute("class", "strong");
	            shipcount2.innerHTML = "Ship Count:";
	            tonnage2.innerHTML = "Tonnage:";
	            row1.appendChild(shipcount2);
	            row1.appendChild(shipcount3);
	            row1.appendChild(tonnage2);
	            row1.appendChild(tonnage3);
	            minitable.appendChild(row1);
	            var stats= document.getElementsByTagName('strong')[1];
	            stats.appendChild(minitable);
	    }else{
		    var noScan = document.createElement('table');
		    noScan.innerHTML = "<tr><td class='strong'>Fleet Info Unavailable: Scanner Required to Get Fleet Info in Open Space</td></tr>";
		    var stats= document.getElementsByTagName('strong')[1];
	            stats.appendChild(noScan);
	    }
        } else {
            alert("There was a problem retrieving the perimeter scan data:\n" + req.statusText);
        }
    }
}

loadXMLDoc("http://" + window.location.hostname + "/extras/scan.php?fleet=" + fleet1);