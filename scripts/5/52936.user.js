// ==UserScript==
// @name			RBR Czech - Class Addendum
// @namespace 		RBRCzechScripts
// @author			Maggot
// @version 		0.1.2
// @description		Adds omitted class links on rbr.onlineracing.cz
// @description		Also adds missing tracks on the "Ranks" and "Record" pages everywhere. Added dropdown-menu with stage select on stagerec/stagerank pages.
// @description		Unfortunately, the times and car names are not displayed (major hurdle).
// @include		http://rbr.onlineracing.cz/index.php?act=tourmntres*
// @include		http://rbr.onlineracing.cz/index.php?act=urec*
// @include		http://rbr.onlineracing.cz/index.php?act=urank*
// @include		http://rbr.onlineracing.cz/index.php?act=stagerec*
// @include		http://rbr.onlineracing.cz/index.php?act=stagerank*
// @include		http://rbr.onlineracing.cz/index.php?act=tstats*

// ==/UserScript==

function parseurl( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( document.URL );
  if( results == null )
    return "";
  else
    return results[1];
}

function makeLinkBase(){
	var doLinkow = new Array();
	if (whereAmI == "urec" || whereAmI == "urank") { doLinkow[0] = whereAmI.replace("u", "stage"); }
	else { if (whereAmI == "tstats") { switch (parseurl("type")) { case "1": doLinkow[0] = "stagerec"; break; case "3": doLinkow[0] = "stagerank"; break; default: doLinkow[0] = "stagerec"; break; }}}
	doLinkow[1] = parseurl("classid");
	doLinkow[2] = parseurl("state");
	if (doLinkow[1] == "") { doLinkow[1] = 1; }
	
	return doLinkow;
}

function findResultsTable(){
	var tables = document.getElementsByTagName("table");
	for (var i = 0; i < tables.length; i++) {
		if (tables[i].width == '70%'){
			return tables[i].children[0];
		}
	}
	return null;
}

function clearBlanks(){
	var linkiWewn = tabelkaRekordy.getElementsByTagName("a");
	for (var i = linkiWewn.length-1; i >= 0; i--){ if (linkiWewn[i].innerHTML == "") { tabelkaRekordy.removeChild(linkiWewn[i].parentNode.parentNode); } }
}

function createStage( nazwaos , stageid , base , rowstyl , column2 , column3 , column4 , column5 ) {
	var rowTemp = document.createElement("tr");
	var komTemp = document.createElement("td");
	rowTemp.setAttribute("class", rowstyl);
	komTemp.innerHTML = '<a href="http://rbr.onlineracing.cz/index.php?act=' + base[0] + '&stageid=' + stageid + '&classid=' + base[1] + '&state=' + base[2] + '">' + nazwaos + '</a>';
	rowTemp.appendChild(komTemp);
	var tdcount;
	var tempTD;
	if (whereAmI == "urec" || whereAmI == "urank") {tdcount = 5; } else {tdcount = 4;}
	for(var i = 1; i<tdcount; i++) {
		tempTD = document.createElement("td");
		tempTD.innerHTML = "";
		if (i == 1 && typeof column2 != "undefined") { tempTD.innerHTML = column2; }
		if (i == 2 && typeof column3 != "undefined") { tempTD.innerHTML = column3; }
		if (i == 3 && typeof column4 != "undefined") { tempTD.innerHTML = column4; }
		if (i == 4 && typeof column5 != "undefined") { tempTD.innerHTML = column5; }
		rowTemp.appendChild(tempTD);
	}
	
	return rowTemp;
}

function createSub ( subtitle , flag ) {
	var rowSub = document.createElement("tr");
	var thSub = document.createElement("th");
	thSub.setAttribute("colspan", "5");
	thSub.setAttribute("style", 'background-color: darkkhaki; background-image: none !important; color: black; font-weight: normal;');
	thSub.innerHTML = subtitle;
	if (flag != undefined) {
		var flagIcon = document.createElement("IMG");
		flagIcon.src = flag;
		flagIcon.setAttribute("style", "float: left; margin-left: 3px; border: 1px solid black;");
		flagIcon.setAttribute("alt", subtitle);
		flagIcon.setAttribute("title", subtitle);
		thSub.appendChild(flagIcon);
	}
	rowSub.appendChild(thSub);
		
	return rowSub;
}

function addGTLink(){
	
	var links = document.getElementsByTagName("a");

	for (var i = 0; i < links.length; i++) {
		var isLastClass = links[i].href.indexOf("&class=11");
		
		if (isLastClass > -1 && links[i].text == "H"){
			var gthref 	= links[i].href.replace("&class=11","&class=14");
			
			var gt		= document.createElement("a");
			gt.href		= gthref;
			gt.innerHTML = "GT";
			gt.style.position = "relative";
			gt.style.left = "-5px";
			gt.style.top = "0px"
			
			var parent = links[i].parentNode;
			parent.appendChild(gt);
		}
	}
}

function appendClasses(){
	
	var classbox = document.getElementById("classid");
	var currClass = parseurl("classid");
	
	classbox.length = 10;					// Fills the list with all the classes
	classbox.options[1].text 	= "S2000";
	classbox.options[1].value	= 13;
	classbox.options[2].text 	= "N4";
	classbox.options[2].value	= 3;
	classbox.options[3].text 	= "S1600";
	classbox.options[3].value	= 2;
	classbox.options[4].text 	= "A8";
	classbox.options[4].value	= 4;
	classbox.options[5].text 	= "A7";
	classbox.options[5].value	= 5;
	classbox.options[6].text 	= "N3";
	classbox.options[6].value	= 8;
	classbox.options[7].text 	= "A5";
	classbox.options[7].value	= 7;
	classbox.options[8].text 	= "GT";
	classbox.options[8].value	= 14;
	classbox.options[9].text 	= "H";
	classbox.options[9].value	= 11;
	
	switch(currClass){						// Checks the current page and changes focus accordingly
		case "13":
			classbox.selectedIndex = 1;
			break;
		case "3" :
			classbox.selectedIndex = 2; 
			break;
		case "2" :
			classbox.selectedIndex = 3; 
			break;
		case "4" :
			classbox.selectedIndex = 4; 
			break;
		case "5" :
			classbox.selectedIndex = 5; 
			break;
		case "8" :
			classbox.selectedIndex = 6; 
			break;
		case "7" :
			classbox.selectedIndex = 7; 
			break;
		case "14" :
			classbox.selectedIndex = 8; 
			break;
		case "11" :
			classbox.selectedIndex = 9; 
			break;
		default   :
			classbox.selectedIndex = 0;
	}		
}

function addMissingRanks(){
	tabelkaRekordy.insertBefore(createStage("Sikakama II", "16", linkBase, "row3"), tabelkaRekordy.children[7]);
	tabelkaRekordy.insertBefore(createStage("Autiovaara II", "17", linkBase, "row2"), tabelkaRekordy.children[8]);
	
	tabelkaRekordy.insertBefore(createStage("Falstone II", "26", linkBase, "row3"), tabelkaRekordy.children[15]);
	tabelkaRekordy.insertBefore(createStage("Shepherds Shield II", "27", linkBase, "row2"), tabelkaRekordy.children[16]);
	
	tabelkaRekordy.insertBefore(createStage("Greenhills II", "30", linkBase, "row2"), tabelkaRekordy.children[17]);
	tabelkaRekordy.insertBefore(createStage("Mineshaft II", "37", linkBase, "row3"), tabelkaRekordy.children[24]);
	
	tabelkaRekordy.insertBefore(createStage("Bisanne II", "47", linkBase, "row3"), tabelkaRekordy.children[31]);
	tabelkaRekordy.insertBefore(createStage("Joux Plane II", "48", linkBase, "row2"), tabelkaRekordy.children[32]);
	
	tabelkaRekordy.insertBefore(createStage("Sipirkakim II", "50", linkBase, "row2"), tabelkaRekordy.children[33]);
	tabelkaRekordy.insertBefore(createStage("Pirka Menoko II", "57", linkBase, "row3"), tabelkaRekordy.children[40]);
	
	tabelkaRekordy.insertBefore(createStage("Frazier Wells II", "60", linkBase, "row2"), tabelkaRekordy.children[41]);
	tabelkaRekordy.insertBefore(createStage("Hualapai Nation II", "67", linkBase, "row3"), tabelkaRekordy.children[48]);
	
	tabelkaRekordy.appendChild(createStage("Strýčkovy - Zadní Poříčí", "106", linkBase, "row2"));
	tabelkaRekordy.appendChild(createStage("PTD Rallysprint", "107", linkBase, "row3"));
	tabelkaRekordy.appendChild(createStage("Oslí - Strýčkovy", "108", linkBase, "row2"));
	tabelkaRekordy.appendChild(createStage("Hrádek 1", "516", linkBase, "row3"));
	tabelkaRekordy.appendChild(createStage("Hrádek 2", "517", linkBase, "row2"));
	tabelkaRekordy.appendChild(createStage("Liptakov 1", "518", linkBase, "row3"));
	tabelkaRekordy.appendChild(createStage("Liptakov 2", "519", linkBase, "row2"));
}

function addMontekland(){ // Separate function, because it has to be added both to the records and ranks.
	tabelkaRekordy.appendChild(createStage("Lernovec", "491", linkBase, "row3"));
	tabelkaRekordy.appendChild(createStage("Úzkotín", "492", linkBase, "row2"));
	tabelkaRekordy.appendChild(createStage("Hroudovany", "493", linkBase, "row3"));
	tabelkaRekordy.appendChild(createStage("Šnekovice", "494", linkBase, "row2"));
	tabelkaRekordy.appendChild(createStage("Lernovec II", "495", linkBase, "row3"));
	tabelkaRekordy.appendChild(createStage("Úzkotín II", "496", linkBase, "row2"));
	tabelkaRekordy.appendChild(createStage("Hroudovany II", "497", linkBase, "row3"));
	tabelkaRekordy.appendChild(createStage("Šnekovice II", "498", linkBase, "row2"));
}

function addSubtitles(){
	tabelkaRekordy.insertBefore(createSub("Sweden", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAMCAIAAAAPshHVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAdUlEQVR4XmNkiJ7JgAREOL+9yG1nYGDwXRO7/Z4ashQaYEIXIBoMhE4WXdGXyHwBju8QhgL/BzQpNMD456IYuhhxgALXWi1OR+YLsP/YFraQgYGheJ/n8adyyFJogOXUcxlkvgjnNwjj1jsRNCk0QL5rB0InAHXKG0Xt0ZzbAAAAAElFTkSuQmCC"), tabelkaRekordy.children[1]);
	tabelkaRekordy.insertBefore(createSub("Great Britain", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAMCAIAAAD3UuoiAAAACXBIWXMAAAsTAAALEwEAmpwYAAACHUlEQVR4XmO8n1QkUZL5S1a2b97RCQtOfPz8gwEGhAQ4H3TZ3Q1LZ2BgENyzUSFkIVyKgYFBRoKv0EXO/+mZ/6/fSBRnMB2UN3pS3/2uoKrCTe7BgaK6XAcBXg5kDZhARoKvN0Znr/pL/0u7xONDZVfOWvKYkSlh8c2gr3oH5Yye1HV/KKqudJO7f6CoLteBH5txyEZIJYbJLJ+x8P5/FecJmXWbGRlUaiGKdNXEi80FrK8cYuHjkSjJ/CElM3f12TQlBojXJA9vXbrypM/j08zv34sXpbOaGs5Zda5j5qEnLz5BtDO+vHADbiEDAwMPJxvD928MjAzM3DwMDAxfT557lF/LwMCgunkRExfH////mXl4GBgYfv3++/3nb2SNjOdFtJH5ZAMmdAFyAeOXE2fRxZDAt3OXn9Z1MzAwKC6cyCIsiC6NBFiEk7ZAWDISfJUZtnGBBj9PnnvZN/O/hPh+VcsIfRWI7C8V1V13Pwe7a37edfDV5Hl/NdRX8WtP23b7AyzdMf389UdUiKu30uPq9pxwqX+PwtOfzV+1Uc/N8ZJgxdLLEEUMDAzfvv8Oy1tp4Dt9138x5U0LJexMI46u2mvxozhQk4Od5eevPyxT6n1Swox+nz7/JDLjr6DgFj23/j2Pnhy8wsDAICTACTcIAi7fehmWt1JXTbw2xyF425JPW/bET1sQZae1kl+fJV6REdMI/ADTuJgp8wDNGeOWwdn8qwAAAABJRU5ErkJggg=="), tabelkaRekordy.children[10]);
	tabelkaRekordy.insertBefore(createSub("Australia", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAMCAIAAAD3UuoiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB6UlEQVR4XqWRPWgTYRjH/+97d70kl14uQqGmEC2mjZ+oQSLqIDgUB1spgQxm9AO6mC6lW50MBZ1EBHET66C0UEKH0EFc7BAyWMQrVqKDDRFs78P0yiX34XDluATBgr/p+f/geXj5v0SZKzVOXX7wVlta2uR5xsjVfocl8cURlqWFDOayujUymi428C+Y5x9vit/khxeVW/eyap84iU8WH95i4m/GtRuTx58oJ+/M1zsdJ7gzNnbUth1VNYOSbN8tAgiF2Ei7hXgc5TIEAZkMYrHWbqdt2r/2aPpVIrhTKJyo17W1ta5nsof0JgDoAABVRasFy4KiQFGiAADLZIGuQwsLsjdEIqxhWN7MPG1ObV26fnb8wt5ue76RvjbKGOkzpeHb566ONHY6M99PT304bJo2gFRKsm3XmwEIAre6ml9c/OIZsvm6Iq5XH7/Hs/Wo47h+2ZLET98/Xxz+8fmdfOVlP4DZ2ezGxs7y8lfvEIBYjNe0/aaIQEomw1vWfp0C67gghkW8yHGU46j/fp9kUhwYCNdqP31DgEd+oJQkk/2q2tZ103Fc3x8EGgyDg8LKSq5SyYliX9AfhK5DQ0NRx3EpJYmE92N/Z2LiWCol9Ug2GKrVZj5fBiDL20HfA8cxkhTqkV0d/Q9/AJ4juJNr9fkSAAAAAElFTkSuQmCC"), tabelkaRekordy.children[21]);
	tabelkaRekordy.insertBefore(createSub("France", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAIAAADgcHrrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAALUlEQVR4XmNkUJjPgASYmRj/3I1HFmH48+ervhuKCAMDExqfSDCqDQOMasMAAOYcBneTndJJAAAAAElFTkSuQmCC"), tabelkaRekordy.children[30]);
	tabelkaRekordy.insertBefore(createSub("Japan", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAIAAADgcHrrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAs0lEQVR4XmP8//8/A+mACV2AOMCCLsDAwMDA8OHQ6bfbDjIyMgr7OvJbGaFLMzAw/McAt4s79jGowdHd6n50Ff//M/5H9dv7fScuOMcjizAwMBgdXY5mJ7rf3m7ehybCwMDwdvN+NBF0bVjDFc1FDJjahL3t0UQYGBiEvR3QRNC1Cblay+TEIIvIlSQL2JogizAwMKAHCQS8333s7bYDDIyMwr5Ogo7m6NK4tBEE6I4kEgAACYpXERJDFPwAAAAASUVORK5CYII="), tabelkaRekordy.children[39]);
	tabelkaRekordy.insertBefore(createSub("United States", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAMCAIAAAAGWbGvAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNElEQVR4XpXLP0/CQBzG8Ts8ei30D9ACA1ESlMnNuDgY4+Tu4gtQBndn3oSTb0HfgImTiYmjm7oQB0I0IviH2vZ6d79zcDGXG+wnz/QkX9zfG47G0363JQGexrO1bpMLOX5+7y1Hw9urjsjQP+Bo66TZcFkuKo4FUiVZ7ru2kDCdx9enR6udUC9MCID6HVJIAkgJSiEAJSU8DoZxSeqFCQlr1STNG0GVWuTl7bPmVxxa/oqzqO52Dwe9lq8XJgQhtEiywHNSxhffzKvaKcvjJLOp+3pxadOSXpgQxkU79DHGNi23Ix8hVLFpq+GljHsb60HN0QsTcnywzXJBLYIUYlxQiyiluACrvOTPJ3z2oRcmZP/+Tv/+yPXDjNR3NvWvODI5O9e/4nD8MNK/4vDNyq7+FfcD8XOAmPd6SvIAAAAASUVORK5CYII="), tabelkaRekordy.children[48]);
	tabelkaRekordy.insertBefore(createSub("Czech Republic", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAIAAADgcHrrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAtElEQVR4XmNI71j77tO3/yQC5nuMGiv3XFSWFlKVFWEgGjBzKtt//f5r3YEr95+9s9ZX5GRnRVeCDTBzKttDWFfvvyTeWoQ2BgYGiLX3nr2zIWQtijYIuHb/5co9F5SkhfFYy4IuwMDAwMDw89Wb+/GpNz89RJeAASzaHD/cL3l8VPDPj//oMgiAok3gz4+Sx8ecPtxDFsQKENqcPtwvfnxU8M8PJFmcgIWBFEvggIUkS+AAABEnfPPydHkIAAAAAElFTkSuQmCC"), tabelkaRekordy.children[57]);
	tabelkaRekordy.insertBefore(createSub("Montekland", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAIAAACHs/j/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAD5klEQVR4Xl2TbUxbVRjHn+ee+35v29s3oGtBbZnRDChjsNE007llwsYSNbwMo0OIMca4qYnJwhKDxrlojPEDw5e4+AKZ7wlxWczitwW3IQw3MIw5ySoQMyhvZW1vL+297fUDrBn8vpxzPvx/ef455wBsAKtrilxuAZESRdLdU3Dht5DNxtsUYegqd2XoOYuF9Xjl/nMFbe1FG4PrkI1HtFjJ13322TnH3Kza3GIeOMSXBlyipL7QkSos4FU1c/KUGg6Xnflci0RWAIBhaIHndN1Yz2+wAYgSe/oTW/Nh75XfNV9JxF9qULnyXM5LEQVQgBwCNZRJux/ffZMX1Oqd1KMPmz2nycREbINFkIQ9e+1VVXaPR3mm0T0ySheXkOMncHCYSqySlIGqAaoBqkGv6iEtE44ucamMMjW9u6pKvn8mem3RVO32JPNlb+H27SV6OjowkEjE+Rvj4cV5hWFvNTaNhR/TAQHAyOIgIFptoCYaX3n50rVrybxrMyUPypf/YFMGdLxEAQAgIIXByqDdLnW9g9FlUPW1GSFl4PlfrbW7lPJypazc6vdbZVmC/FUgoiSJDENoWt67V+3/GW+Mm2ACmBCdi+q6bhjURx+YUxGMzlFbPCDJ5kOB9JH24NNP2ZAk/xoz5uc10zQBABxO57Otrh9+LF2K12m6K2VAfBU/7obCIgQAROh6m8wuEYeT1B2oa2s/sueJUFMLGf+b6j3r83gVAOpevXtwHKc4LC2HrSOjnGrAcgJ/6ieRGez7jvSeZZMZHL6+nkHAgD/Asqwkwp9j3OWr7lePbgkEFJ5nIV82m83ShCp+oHR/nd3pnCcMrCwjL+DO2lx8BRYWcFWjBi6ad++CCRCLxXK5bFMzlgWL7/y3NZ0Gmo0vLbLptAkAwDD0jmrnL+f8k1Oh29NcNEbW+r77HhNdppIZuLMIyQz88y998hTldAMiNBzCuAbdn9lEUV4vCABrT0YQBYtMmwB6xpQtpLtHqT84bSIsLeCH71MuF+Xx5hCQ41Bx5HZUZ6OzlMtFG1m/2209/ubkV2eSGV2/X7oOw5Bjxx7R0qFYgool2ZReoWYckRlqcJhEZlDVUTO4lSSd0l0Tt2RfsSMUdrzVZdlVa0fc/LsAALZts42MFXae8FZUukeuBzVDTKX3a/rzWqZVyzy5qgc13fdNn9jUvPX8hcrmVjsiIqIgCCzLbnbxPH+wwe0rlgmhfT7rwnJbLEkdfcN6c7ImZbAjo8y335dphrOz00YhJYpcRaXN7rBttuQhhORn3rdPmV2oqm+wCBL/6Rf1KcPS8aJYUCRfvFTz2uvOfESSpPx+jf8Bk4d9ASiTkI4AAAAASUVORK5CYII="), tabelkaRekordy.children[67]);
}

function rearrangeRows(){
	if (parseurl("classid") == "2") {tabelkaRekordy.insertBefore(createStage("Frazier Wells II", "60", linkBase, "row3"), tabelkaRekordy.children[41]); }
	if (parseurl("classid") == "14") {
		tabelkaRekordy.insertBefore(createStage("Tanner II", "56", linkBase, ""), tabelkaRekordy.children[40]);
		tabelkaRekordy.insertBefore(createStage("Pirka Menoko II", "57", linkBase, ""), tabelkaRekordy.children[41]);
	}
	tabelkaRekordy.insertBefore(tabelkaRekordy.children[15], tabelkaRekordy.children[14]); // moved Greenhils II down
	
	tabelkaRekordy.insertBefore(tabelkaRekordy.children[17], tabelkaRekordy.children[23]); // moved Greenhils II down
	tabelkaRekordy.insertBefore(tabelkaRekordy.children[23], tabelkaRekordy.children[25]); // moved Mineshaft II down
	
	tabelkaRekordy.insertBefore(tabelkaRekordy.children[30], tabelkaRekordy.children[29]); // moved cote darbroz
	
	tabelkaRekordy.insertBefore(tabelkaRekordy.children[33], tabelkaRekordy.children[39]); // moved spirkakim II
	tabelkaRekordy.insertBefore(tabelkaRekordy.children[40], tabelkaRekordy.children[39]); // moved pirka menoko II
	
	tabelkaRekordy.insertBefore(tabelkaRekordy.children[41], tabelkaRekordy.children[46]); // moved frazier wells II
	
	tabelkaRekordy.insertBefore(tabelkaRekordy.children[53], tabelkaRekordy.children[59]); // moved ptd rallysprint
	
	tabelkaRekordy.insertBefore(createStage("Sosnová", "96", linkBase, "row3", "Autodrom Racing Aréně Česká Lípa" ), tabelkaRekordy.children[54]); // adding Sosnova
	
	tabelkaRekordy.children[51].children[0].children[0].innerHTML = "Strýčkovy - okruh";
	if (whereAmI == "urec" || parseurl("type") == "1") { 
		tabelkaRekordy.children[52].children[0].children[0].innerHTML = "Strýčkovy - Zadní Poříčí";
		tabelkaRekordy.children[53].children[0].children[0].innerHTML = "Oslí - Strýčkovy";
	}
		
	tabelkaRekordy.insertBefore(tabelkaRekordy.children[49], tabelkaRekordy.children[17]); // rallyschool    moved up (to GB section)
	tabelkaRekordy.insertBefore(tabelkaRekordy.children[50], tabelkaRekordy.children[18]); // rallyschool II moved up
}

function reClassifyRows(){
	var rowStyl = 0;
	for (var i = 1; i < tabelkaRekordy.getElementsByTagName("tr").length; i++){
		rowStyl = (i%2) + 2;
		tabelkaRekordy.children[i].setAttribute("class", "row" + rowStyl);
	}
}

function createStageDropdown(){
	var newSelect = document.createElement("select");
	
	newSelect.setAttribute("id", "stageid");
	newSelect.setAttribute("name", "stageid");
	newSelect.setAttribute("style", "width: 200px;");
	newSelect.setAttribute("onChange", "document.getElementById('records').submit()");
	
	newSelect.length = 68;
	newSelect.options[0].text  = "Choose another stage";
	newSelect.options[0].value = parseurl("stageid");
	
	newSelect.options[1].text  = "Kaihuavaara";
	newSelect.options[1].value = 10;
	newSelect.options[2].text  = "Mustaselka";
	newSelect.options[2].value = 11;
	newSelect.options[3].text  = "Sikakama";
	newSelect.options[3].value = 12;
	newSelect.options[4].text  = "Autiovaara";
	newSelect.options[4].value = 13;
	newSelect.options[5].text  = "Kaihuavaara II";
	newSelect.options[5].value = 14;
	newSelect.options[6].text  = "Mustaselka II";
	newSelect.options[6].value = 15;
	newSelect.options[7].text  = "Sikakama II";
	newSelect.options[7].value = 16;
	newSelect.options[8].text  = "Autiovaara II";
	newSelect.options[8].value = 17;
	
	newSelect.options[9].text   = "Harwood Forest";
	newSelect.options[9].value  = 20;
	newSelect.options[10].text   = "Falstone";
	newSelect.options[10].value  = 21;
	newSelect.options[11].text  = "Chirdonhead";
	newSelect.options[11].value = 22;
	newSelect.options[12].text  = "Shepherds Shield";
	newSelect.options[12].value = 23;
	newSelect.options[13].text  = "Harwood Forest II";
	newSelect.options[13].value = 24;
	newSelect.options[14].text  = "Falstone II";
	newSelect.options[14].value = 26;
	newSelect.options[15].text  = "Chirdonhead II";
	newSelect.options[15].value = 25;
	newSelect.options[16].text  = "Shepherds Shield II";
	newSelect.options[16].value = 27;
	newSelect.options[17].text  = "Rally School Stage";
	newSelect.options[17].value = 71;
	newSelect.options[18].text  = "Rally School Stage II";
	newSelect.options[18].value = 90;
	
	newSelect.options[19].text  = "New Bobs";
	newSelect.options[19].value = 31;
	newSelect.options[20].text  = "Greenhills";
	newSelect.options[20].value = 32;
	newSelect.options[21].text  = "Mineshaft";
	newSelect.options[21].value = 33;
	newSelect.options[22].text  = "East-West";
	newSelect.options[22].value = 34;
	newSelect.options[23].text  = "New Bobs II";
	newSelect.options[23].value = 35;
	newSelect.options[24].text  = "Greenhills II";
	newSelect.options[24].value = 30;
	newSelect.options[25].text  = "Mineshaft II";
	newSelect.options[25].value = 37;
	newSelect.options[26].text  = "East-West";
	newSelect.options[26].value = 36;
	
	newSelect.options[27].text  = "Cote D'Arbroz";
	newSelect.options[27].value = 41;
	newSelect.options[28].text  = "Joux Verte";
	newSelect.options[28].value = 42;
	newSelect.options[29].text  = "Bisanne";
	newSelect.options[29].value = 43;
	newSelect.options[30].text  = "Joux Plane";
	newSelect.options[30].value = 44;
	newSelect.options[31].text  = "Cote D'Arbroz II";
	newSelect.options[31].value = 46;
	newSelect.options[32].text  = "Joux Verte II";
	newSelect.options[32].value = 45;
	newSelect.options[33].text  = "Bisanne II";
	newSelect.options[33].value = 47;
	newSelect.options[34].text  = "Joux Plane II";
	newSelect.options[34].value = 48;
	
	newSelect.options[35].text  = "Noiker";
	newSelect.options[35].value = 51;
	newSelect.options[36].text  = "Sipirkakim";
	newSelect.options[36].value = 52;
	newSelect.options[37].text  = "Pirka Menoko";
	newSelect.options[37].value = 53;
	newSelect.options[38].text  = "Tanner";
	newSelect.options[38].value = 54;
	newSelect.options[39].text  = "Noiker II";
	newSelect.options[39].value = 55;
	newSelect.options[40].text  = "Sipirkakim II";
	newSelect.options[40].value = 50;
	newSelect.options[41].text  = "Pirka Menoko II";
	newSelect.options[41].value = 57;
	newSelect.options[42].text  = "Tanner II";
	newSelect.options[42].value = 56;
	
	newSelect.options[43].text  = "Fraizer Wells";
	newSelect.options[43].value = 61;	
	newSelect.options[44].text  = "Prospect Ridge";
	newSelect.options[44].value = 62;
	newSelect.options[45].text  = "Diamond Creek";
	newSelect.options[45].value = 63;
	newSelect.options[46].text  = "Hualapai Nation";
	newSelect.options[46].value = 64;
	newSelect.options[47].text  = "Fraizer Wells II";
	newSelect.options[47].value = 60;	
	newSelect.options[48].text  = "Prospect Ridge II";
	newSelect.options[48].value = 65;
	newSelect.options[49].text  = "Diamond Creek II";
	newSelect.options[49].value = 66;
	newSelect.options[50].text  = "Hualapai Nation II";
	newSelect.options[50].value = 67;
	
	newSelect.options[51].text  = "Strýčkovy - okruh";
	newSelect.options[51].value = 94;
	newSelect.options[52].text  = "Strýčkovy - Zadní Poříčí";
	newSelect.options[52].value = 106;
	newSelect.options[53].text  = "Oslí - Strýčkovy";
	newSelect.options[53].value = 108;
	newSelect.options[54].text  = "Sosnová";
	newSelect.options[54].value = 96;
	newSelect.options[55].text  = "Hradek 1";
	newSelect.options[55].value = 516;
	newSelect.options[56].text  = "Hradek 2";
	newSelect.options[56].value = 517;
	newSelect.options[57].text  = "Liptakov 1";
	newSelect.options[57].value = 518;
	newSelect.options[58].text  = "Liptakov 2";
	newSelect.options[58].value = 519;
	
	newSelect.options[59].text  = "PTD Rallysprint";
	newSelect.options[59].value = 107;
	
	newSelect.options[60].text  = "Lernovec";
	newSelect.options[60].value = 491;
	newSelect.options[61].text  = "Úzkotín";
	newSelect.options[61].value = 492;
	newSelect.options[62].text  = "Hroudovany";
	newSelect.options[62].value = 493;
	newSelect.options[63].text  = "Šnekovice";
	newSelect.options[63].value = 494;
	newSelect.options[64].text  = "Lernovec II";
	newSelect.options[64].value = 495;
	newSelect.options[65].text  = "Úzkotín II";
	newSelect.options[65].value = 496;
	newSelect.options[66].text  = "Hroudovany II";
	newSelect.options[66].value = 497;
	newSelect.options[67].text  = "Šnekovice II";
	newSelect.options[67].value = 498;
	
	newSelect.selectedIndex = 0;
		
	return newSelect;
}
// KONIEC FUNKCJI POMOCNICZYCH ************************************************************************************
// Zaczynamy prawidłowe duperele w dokumencie

if (document.getElementById("classid")) { appendClasses(); }

var whereAmI = parseurl("act");

if (whereAmI.indexOf("tourmntres") == -1) { var tabelkaRekordy = findResultsTable(); var linkBase = makeLinkBase(); }
else { addGTLink(); }

switch(whereAmI) {
	case "urank":
	case "tstats":
		if (parseurl("type") !="1"){
			addMissingRanks();
		}
	case "urec":
		clearBlanks();
		addMontekland();
		rearrangeRows();
		reClassifyRows();
		addSubtitles();
		break;
	case "stagerec":
	case "stagerank":
		document.getElementById("records").removeChild(document.getElementsByTagName("input")[1]);
		
		document.getElementById("state").parentNode.insertBefore(createStageDropdown(), document.getElementById("state"));
		document.getElementById("state").parentNode.insertBefore(document.createElement("br"), document.getElementById("state"));
		document.getElementById("state").parentNode.insertBefore(document.createElement("br"), document.getElementById("state"));
		break;
	default:
		break;
}
