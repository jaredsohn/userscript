// ==UserScript==
// @name       Headphiles Customized
// @version    3.0
// @match      http://www.headphiles.org/*
// @copyright  2012+, valacirca
// ==/UserScript==

// Remove text from control panel. Leave only images.
var cpTable = document.getElementById("UserControlPanel").getElementsByTagName("li");
var cp = document.getElementById("UserControlPanel");

for (i = 0; i < cpTable.length; i++) {
	var tempDiv = document.createElement('div');
	tempDiv.innerHTML = cpTable[i].firstChild.innerHTML;
	cpTable[i].firstChild.innerHTML=(tempDiv.getElementsByTagName("img"))[0].outerHTML;
}

// For customization specific to home page
if (parent.location.href == 'http://www.headphiles.org/index.php' || (parent.location.href).indexOf('t=i') !== -1){
	var welcome = (document.getElementsByTagName("td")[0]).getElementsByClassName("GenText")[0];
	cp.innerHTML = welcome.innerHTML + cp.innerHTML
	welcome.innerHTML = "";
}

// For customization specific to forum views
if ((parent.location.href).indexOf('t=thread') !== -1){
	var threads = document.getElementsByClassName("clear pad")[0].getElementsByTagName("tr");
	var colorSwitch = 0;
	for (i = 0; i < threads.length; i++) {
		if (i == 0){
			var tempNode = (threads[i].getElementsByClassName("wa"))[0];
			var tempCell = document.createElement('th');
			tempCell.class = 'wo';
			tempCell.innerHTML = 'Started By';
			tempCell.style.float = 'center';
			tempNode.parentNode.insertBefore(tempCell,tempNode.nextSibling);
		} else{
			var tempNode = (threads[i].getElementsByClassName("RowStyleA"))[0];
			var tempCell = document.createElement('td');
			tempCell.class = 'RowStyleB';
			tempCell.innerHTML = (tempNode.getElementsByClassName("TopBy"))[0].getElementsByTagName("a")[0].outerHTML;
			tempCell.style.float = 'center';
			tempNode.parentNode.insertBefore(tempCell,tempNode.nextSibling);
			(tempNode.getElementsByClassName("TopBy"))[0].style.display = 'none';
		}
	}

	for (i = 0; i < threads.length; i++) {
		var cells = threads[i].getElementsByTagName("td");

		var bgcolor = '';
		if (colorSwitch == 0){
			bgColor = '#FAFAFA';
			colorSwitch = 1;
		} else {
			bgColor = '#EEEEEE';
			colorSwitch = 0;
		}
		for (j = 0; j < cells.length; j++) {

			cells[j].style.backgroundColor=bgColor;
		}
	}
}
// For customization specific to unread message views
if ((parent.location.href).indexOf('t=selmsg') !== -1){
	var unreads = document.getElementsByClassName("ContentTable")[0].getElementsByTagName("tr");
	for (i = 0; i < unreads.length; i++) {
		var temp = unreads[i].getElementsByClassName("SelTS");
		if (temp.length == 0){
			unreads[i].style.display = "none";
		}
	}
}
/*
// For customization specific to thread views
if ((parent.location.href).indexOf('t=msg') !== -1){
	var threadContent = (document.getElementsByClassName('ContentTable'))[0];
	var contentRows = threadContent.getElementsByTagName('tr');
	var mainRows = [];

	for (i = 0; i < contentRows.length; i++) {
		if (i%7 == 0){
			mainRows[i/7] = contentRows[i];
		}
	}

	for (i = 0; i < mainRows.length; i++) {
		var profile = (mainRows[i].getElementsByClassName('msgud'))[0];
		var tenure = (mainRows[i].getElementsByClassName('msgud'))[1].childNodes[0];
		var online = profile.childNodes[1];
		var user = profile.childNodes[3];
		var msgsLbl = profile.childNodes[6];
		var msgsVal = profile.childNodes[7];
		var regLbl = profile.childNodes[9];
		var regVal = profile.childNodes[10];
		var locLbl = profile.childNodes[12];
		var locVal = profile.childNodes[13];
		console.log((mainRows[i].getElementsByClassName('msgot'))[0].childNodes);
	}
}*/
