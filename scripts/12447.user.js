// ==UserScript==
// @name           Facebook custom app hider v 0.7
// @namespace      geologicalhammers.com
// @description    Hide custom applications on Facebook. Updated version now available!
// @include        http://*.facebook.com/profile.php?id=*
// ==/UserScript==

//Begin facebook functions//
function FlexToggle() {
	if (remove_css_class_name(profileBox,'flex_shut')) {
		profileBox.className+=' flex_open';
	} else {
		remove_css_class_name(profileBox,'flex_open');
		profileBox.className+=' flex_shut';
	}
}
function remove_css_class_name(elem,cname) {
	var old=elem.className;
	elem.className=elem.className.replace(new RegExp('\\b'+cname+'\\b'),'');
	return elem.className!=old;
}

//end facebook functions//

function getAppName(id) {
	var name = document.getElementById("box_head_"  + id).childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerHTML;
	stripTags = /<\/?[^>]+>/gi;
	return name.replace(stripTags,"");
}

function show_App(id) {
	if (document.getElementById("box_app_" + id)) document.getElementById("box_app_" + id).style.display = "block"; 
	if (document.getElementById("icon_app" + id)) document.getElementById("icon_app" + id).style.display = "block";
}

function hideApp(id) {
	if (document.getElementById("box_app_" + id)) document.getElementById("box_app_" + id).style.display = "none"; 
	if (document.getElementById("icon_app" + id)) document.getElementById("icon_app" + id).style.display = "none";
}

function hideAppNow() {
	var id = this.id.substring(2);
	hideApp(id);
	document.cookie = id + '=' + getAppName(id) + '; expires=Fri, 3 Aug 2030 20:00:00 UTC; path=/';
	if (!document.getElementById("myText")) {createAppBox();} else {listHiddenApp(id, getAppName(id));}
	countHiddenApps();
}
function showAppNow() {
	var id = this.id.substring(2);
	if (document.getElementById("span_" + id)) {document.getElementById("span_" + id).style.display = "none";}
	show_App(id);
	document.cookie = id + '=shown; expires=Fri, 3 Aug 1999 20:00:00 UTC; path=/';
	if (!document.cookie) {myText.innerHTML = "No applications hidden.";}
	countHiddenApps();
}

function createAppBox() {
	//Create a "hidden items" "application" at the end of the main column, so hidden apps can be restored.
	profileBox = document.createElement("div");
	profileBox.id = "box_app_2200123456";
	profileBox.box = "box_app_2200123456";
	profileBox.className = "profile_box clearfix flex_shut";
	//<div onclick="boxFlexToggle(this.parentNode);" title="Click to Expand/Collapse" id="box_head_2719290516" 
	box_head = document.createElement("div");
	box_head.id = "box_head_2200123456";
	box_head.addEventListener("click", FlexToggle, true);
	box_head.className = "box_head clearfix"
	table = document.createElement("table");
	table.className = "head_table";
	table.width = "100%";
	table.cellSpacing = "0";
	table.cellPadding = "0";
	table.border = "0";
	tbody = document.createElement("tbody");
	tr = document.createElement("tr");
	td = document.createElement("td");
	h2  = document.createElement("h2");
	
	a = document.createElement("a");
	a.className = "non_link";
	a.innerHTML = "Hidden Items";
	
//	<tbody><tr><td><h2 id="title_app_2719290516"><a id="wall" class="non_link" name="wall"/>The Wall</h2></td><td align="right"><a class="box_remove icon box_action" id="x_2719290516"/></td></tr></tbody></table></div>
	
	h2.appendChild(a);
	td.appendChild(h2);
	tr.appendChild(td);
	tbody.appendChild(tr);
	table.appendChild(tbody);
	box_head.appendChild(table);
	
	//That's the title bar done. Now: The box content
	
	app_content = document.createElement("div");
	app_content.className = "inside_the_box clearfix app_content_2200123456";
	div = document.createElement("div");
	myTitle = document.createElement("h4");
	myTitle.className = "info_section";
	myTitle.innerHTML = "Hidden Applications";
	myTable = document.createElement("table");
	myTable.className = "profileTable";
	myTable.cellSpacing = "0";
	myTable.cellPadding = "0";
	myTbody = document.createElement("tbody");
	myTr = document.createElement("tr");
	myLabel = document.createElement("td");
	myLabel.innerHTML = "On this page:";
	myLabel.className = "label";
	myText = document.createElement("td");
	myText.className = "data";	
	myText.id = "myText";
	
	myCountRow = document.createElement("tr");
	myCountLabel = document.createElement("td");
	myCountLabel.innerHTML = "Total:";
	myCountLabel.className = "label";
	myCount = document.createElement("td");
	myCount.className="data";
	
	//Fill the app content box
	
	myCountRow.appendChild(myCountLabel);
	myCountRow.appendChild(myCount);
	myTr.appendChild(myLabel);
	myTr.appendChild(myText);
	myTbody.appendChild(myTr);
	myTbody.appendChild(myCountRow);
	myTable.appendChild(myTbody);
	div.appendChild(myTitle);
	div.appendChild(myTable);
	app_content.appendChild(div);
	
	//Add our new box to the page
	profileBox.appendChild(box_head);
	profileBox.appendChild(app_content);
	document.getElementById("moveable_wide").appendChild(profileBox);
	
	//Now populate the new box with the app names
	var hiddenApps = document.cookie.split("; ");
	for (var i=0; i<hiddenApps.length; i++) {
		hiddenApp = hiddenApps[i].split("=");
		for (var j=0; j<appsOnPage.length; j++) {
			if (appsOnPage[j] == hiddenApp[0]) {listHiddenApp(hiddenApp[0], hiddenApp[1]); hideApp(hiddenApp[0]);}
		}
		
	}
	countHiddenApps();
}

function countHiddenApps() {
	var counter = document.cookie.split("; ");
	if (counter[1]) {myCount.innerHTML = counter.length + " applications hidden."; myCountRow.style.display = "table-row";} else myCountRow.style.display = "none";
}

function listHiddenApp(id, name) {
	if (myText.innerHTML == "No applications hidden.") {myText.innerHTML = "";}
	appName = document.createTextNode(name + " (");
	showApp = document.createElement("a");
	showApp.innerHTML = "show";
	showApp.id = "sa" + id;
	showApp.addEventListener("click", showAppNow, true);
	closeBracket = document.createTextNode(")");
	br = document.createElement("br");
	span = document.createElement("span");
	span.id = "span_" + id;
	span.appendChild(appName);
	span.appendChild(showApp);
	span.appendChild(closeBracket);		
	span.appendChild(br);
	document.getElementById("myText").appendChild(span);
	document.getElementById("myText").appendChild(span);
}

function prep(div) {
//works out if it should add an "X" to a div, and does so if necessary
	var id = div.id.substring(8);
	xBox = document.getElementById("box_head_"  + id).childNodes[1].childNodes[0].childNodes[0].childNodes[1];
	if (!xBox.innerHTML) {
		//Populate table cell with a link
		xLink = document.createElement("a");
		xLink.className = "box_remove icon box_action";
		xLink.id = "x_" + id;
		xLink.addEventListener("click", hideAppNow, true);
		xBox.appendChild(xLink);
	} else if (xBox.childNodes[0].innerHTML != '&nbsp;') {
		//Add a new table cell to the left of the existing, which probably says "add".
		xLink = document.createElement("a");
		xLink.className = "box_remove icon box_action";
		xLink.id = "x_" + id;
		xLink.addEventListener("click", hideAppNow, true);
		xCell = document.createElement("td");
		xCell.align = "right";
		xCell.style.width="13px";
		xCell.appendChild(xLink);
		xBox.parentNode.appendChild(xCell);
	}
	return id;
}

var divs = document.getElementsByTagName("div");
//Scan through all the Divs, and add an "X" to any without one there already.
var appsOnPage = Array();
for (var i=0; i<divs.length; i++) {
   if(divs[i].id.indexOf('box_app_') === 0) appsOnPage[i] = prep(divs[i]);
}

if (document.cookie) {
	createAppBox();
}
