// ==UserScript==
// @name           Travian quick links (Arabic)
// @namespace      *
// @description    Travian quick links (Arabic)
// @include        http://*.travian.*
// ==/UserScript==

var urlBase = location.href.substring(0, location.href.indexOf('/', 14)) + "/";

var links = new Array();



//Don't modify below this if you don't know what you're doing



links = eval(GM_getValue('a1', '[]')); 

var target = document.getElementById("side_info");
target.appendChild(document.createElement('br'));

var tbl     = document.createElement("table");

var tblHead = document.createElement("thead");
var tblBody = document.createElement("tbody");

        for (var j = 0; j < links.length/2; j++) {
            // creates a table row
            var row = document.createElement("tr");

            for (var i = 0; i < 2; i++) {
                var cell = document.createElement("td");

				if (i == 0) {
				var test = document.createElement("span");
				test.innerHTML = "&#x25CF";
				var cellText = test;
				if (document.location.href == links[2*j+1]) {
				cell.setAttribute("class", "dot hl");
				}
				else {
				cell.setAttribute("class", "dot");
				}
				}
				else if (i == 1) {
				var curId = i - 1;
				var alink = document.createElement("a");
				alink.setAttribute("href", links[2*j+1]);
				cell.setAttribute("class", "link");
				alink.appendChild(document.createTextNode(links[2*j]));
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
		alink.appendChild(document.createTextNode("الروابط:"));
 		alink.addEventListener("click", function () { AddNewLink(); }, false);
		cell.appendChild(alink);
		cell.setAttribute("colspan", "5");
		row.appendChild(cell);
		tblHead.appendChild(row);
		
		tbl.appendChild(tblHead);
        tbl.appendChild(tblBody);
		
        target.appendChild(tbl);
		
        tbl.setAttribute("cellspacing", "1");
		tbl.setAttribute("cellpadding", "1");
		tbl.setAttribute("id", "llist");



function AddNewLink(){
 GM_log("AddNewLink() :: called");

 loc =  document.location.href;
 GM_log("links :" + links.length);

 new_link = prompt("اكتب الرابط",loc);
 if(!new_link) { return}
 new_link_name = prompt("اكتب الاسم","");
 if(!new_link_name) { return; }
 
// links[links.length][0] = new_link_name;
// links[links.length][1] = new_link;
 links.push(new_link_name);
 links.push(new_link);
 

 GM_setValue('a1', uneval(links));
// GM_log(links);

 document.location.href = loc;
 
 

}