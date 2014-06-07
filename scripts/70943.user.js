// ==UserScript==
// @name           Portal Travian
// @description    Portal travian link
// @include        http://*.travian.*/*
// @version        1.3
// ==/UserScript==


var urlBase = location.href.substring(0, location.href.indexOf('/', 14)) + "/";

var links = new Array();
links[0] = ["Portal Travian", "http://" + "www.grepoutils.webxxs.com/"];


//Don't modify below this if you don't know what you're doing

var target = document.getElementById("side_info");

var tbl     = document.createElement("table");
var tblHead = document.createElement("thead");
var tblBody = document.createElement("tbody");

        for (var j = 0; j < links.length; j++) {
            // creates a table row
            var row = document.createElement("tr");

            for (var i = 0; i < 2; i++) {
                var cell = document.createElement("td");
				if (i == 0) {
				var test = document.createElement("span");
				test.innerHTML = "&bull;";
				var cellText = test;
				if (document.location.href == links[j][1]) {
				cell.setAttribute("class", "dot hl");
				}
				else {
				cell.setAttribute("class", "dot");
				}
				}
				else if (i == 1) {
				var curId = i - 1;
				var alink = document.createElement("a");
				alink.setAttribute("href", links[j][1]);
				cell.setAttribute("class", "link");
				alink.appendChild(document.createTextNode(links[j][0]));
                var cellText = alink;
				}
                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            tblBody.appendChild(row);
        }

		var row = document.createElement("tr");
        var cell = document.createElement("td");
		var alink = document.createElement("a");
		alink.setAttribute("href", "#");
		alink.appendChild(document.createTextNode("Quick links"));
		cell.appendChild(alink);
		cell.setAttribute("colspan", "2");
		row.appendChild(cell);
		tblHead.appendChild(row);
		
		tbl.appendChild(tblHead);
        tbl.appendChild(tblBody);
		
        target.appendChild(tbl);
		
        tbl.setAttribute("cellspacing", "1");
		tbl.setAttribute("cellpadding", "1");
		tbl.setAttribute("id", "vlist");
