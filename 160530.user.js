// ==UserScript==
// @name           StockReports
// @namespace      http://userscripts.org/users/183236
// @description    Tool to make reporting easier
//
// @version		1.01
// @include		https://tls.passthepopcorn.me/reportsv2.php?*
// @grant       none
//
// ==/UserScript==
/*---------------------Version History--------------------
0.10	-	Initial script
0.15    -	Added buttons
0.20    -	Three buttons
0.21	-	Added low quality
0.22	-	Added hard subs
1.00	-	Added second row of buttons specific to screen issues
		-	Updated to work with new report form
1.01	- 	Added GP eval button
--------------------------------------------------------*/

// Create a new div to put the links in and append it to the content div
links_div1 = document.createElement('div');//makes a div
links_div1.setAttribute('class', 'box');//makes it look the same as rest of page
document.getElementById('content').appendChild(links_div1);//adds div to the page

//second div for second row of buttons
links_div2 = document.createElement('div');//makes a div
links_div2.setAttribute('class', 'box');//makes it look the same as rest of page
document.getElementById('content').appendChild(links_div2);//adds div to the page

//third div
links_div3 = document.createElement('div');//makes a div
links_div3.setAttribute('class', 'box');//makes it look the same as rest of page
document.getElementById('content').appendChild(links_div3);//adds div to the page

//makes buttons in new divs
links_div1.innerHTML += '<button type="button" id="cropID">Poor cropping</button>   ';
links_div1.innerHTML += '<button type="button" id="subsID">No Eng subs</button>   ';
links_div1.innerHTML += '<button type="button" id="lowqualID">Low quality</button>   ';
links_div1.innerHTML += '<button type="button" id="hardsubsID">Hard subs</button>   ';

links_div2.innerHTML += '<button type="button" id="sar_screensID">SAR screens</button>   ';
links_div2.innerHTML += '<button type="button" id="comp_screensID">Compressed screens</button>   ';
links_div2.innerHTML += '<button type="button" id="res_screensID">Incorrect res</button>   ';

links_div3.innerHTML += '<button type="button" id="gpevalID">GP eval</button>   ';




//makes them clickable
addButtonListener();

function addButtonListener() {
	//first div
    document.getElementById("cropID").addEventListener("click", function(){cropping()}, true);
	document.getElementById("subsID").addEventListener("click", function(){engsubs()}, true);
	document.getElementById("lowqualID").addEventListener("click", function(){lowqual()}, true);
	document.getElementById("hardsubsID").addEventListener("click", function(){hardsubs()}, true);
	//second div
	document.getElementById("sar_screensID").addEventListener("click", function(){sar_screens()}, true);
	document.getElementById("comp_screensID").addEventListener("click", function(){comp_screens()}, true);
	document.getElementById("res_screensID").addEventListener("click", function(){res_screens()}, true);
	//third div
	document.getElementById("gpevalID").addEventListener("click", function(){gpeval()}, true);
}

//links_div.innerHTML += '<a id="croplink" href="">Poor cropping.</a>   ';

function engsubs(){
document.getElementById("type").value = "trumpable";
ChangeReportType();
setTimeout(function(){document.getElementById("extra").value = "No English subs."},500);
}

function cropping(){
document.getElementById("type").value = "trumpable";
ChangeReportType();
setTimeout(function(){document.getElementById("extra").value = "Poor cropping"},500);
}

function screens(){
document.getElementById("type").value = "screenshots and rip ";
ChangeReportType();
setTimeout(function(){document.getElementById("extra").value = "This torrent has incorrect screens in the description."},500);
}

function lowqual(){
document.getElementById("type").value = "trumpable";
ChangeReportType();
setTimeout(function(){document.getElementById("extra").value = "Low quality."},500);
}

function hardsubs(){
document.getElementById("type").value = "trumpable";
ChangeReportType();
setTimeout(function(){document.getElementById("extra").value = "Hard subs."},500);
}

function sar_screens(){
document.getElementById("type").value = "SAR screens";
ChangeReportType();
}

function comp_screens(){
document.getElementById("type").value = "Heavily compressed screens";
ChangeReportType();
}

function res_screens(){
document.getElementById("type").value = "Wrong screen resolution";
ChangeReportType();
}

function gpeval(){
document.getElementById("type").value = "other";
ChangeReportType();
setTimeout(function(){document.getElementById("extra").value = "GP eval"},500);
}