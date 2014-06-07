// ==UserScript==
// @name           KanMusu Source Script
// @description    KanMusu Source Script modded from /u/JonnyRobby's Comment Faces Script
// @namespace      http://userscripts.org/scripts/show/486271
// @author         labmember_001
// @include        http*://*.reddit.com/r/kanmusu/*
// @grant          none
// @updateURL      http://userscripts.org/scripts/source/486271.user.js
// @downloadURL    none
// @version        1.0.07
// ==/UserScript==

		
var selectedFace = "";
var faceIdChar = "";
var thumbDialWidth = "160px";
var thumbDialHeight = "60px";
var divAlreadyShown = false;
var settingsAlreadyShown = false;
var selectedText = {
    start: 0, lenghth: 0, boxIndex: 0
};
var loadingIcon = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";
var settingsIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIxSURBVHjapFO5iiJRFL3l1iIq7hi4NIgKIjSCiqCgDYbm/oCYGhqq/2Bi2KGZgaHgDAqtKEhj5pooiLuRuE+dh8oMMx3Ng1t16t5zXt165xZXKBTom5XlI3PHufvzX0twvV4pGo0Sf8/yUQW+P2e+wVVw75i4fD7/fJvP56PhcEgajYbUajVptVq63W60Xq9ps9mwu81mo1ar9exKdLlc8BD2er2k0+lIqVQy4mKxYBgLGBtarVaSSCTk8Xio3W6H2Sdgg1gs9t7v92m/35NAIGBku91OYrGYBTByqIEDLjTQis7nM3uLQqGg+XxOer2eXl5eqNFoUL1eZ7VQKESBQIAOhwPrBlwsaAX8JVssFm9IoigUCtEe4kc6neYQwMih9tgAGmixQSYej5PRaCSz2UwikYi63S6lUqn3h1XAyKEGDrjQQCs6nU40mUz+8PbR4r9y4MMRBLAwGAxyg8EgghOfTqdkMBhILpfT5+dnxOFwfEBULperbrf7VSqVsu5weLVaDXOQY2eQSCS45XLJhLvdjtnlcrkilUrlhgBGDjVwwIUG2qcLOByTycQcmM1mzDZMGxbaRU4mk7ENYOPDBaHf76dms1l1Op2vGKbRaMTIvV6Pjscjs/br64tZiNb5T6HtdkulUinCT+nHYxJ/8jZFgMfjMXu7SqWi32dktVoRf1as/U6nwzTPSQyHw1n+noPfb29vnMVigffsZ0EAI4caOODeNcQlk8n/+p1/CTAASVxppUgA6l4AAAAASUVORK5CYII=";
//elements section


function initializeSettings() {
	//alert("Settings comming soon...");
	if (!settingsAlreadyShown) buildSettingsDiv();
	textSett["awwSettingsHeight"].value = parseInt(awwFacedDialogObj.style.height, 10);
	textSett["awwSettingsWidth"].value = parseInt(awwFacedDialogObj.style.width, 10);
	textSett["awwSettingsTop"].value = parseInt(awwFacedDialogObj.style.top, 10);
	textSett["awwSettingsLeft"].value = parseInt(awwFacedDialogObj.style.left, 10);
	
	textSett["awwSettingsLeft"].style.color = "#000000";
	textSett["awwSettingsTop"].style.color = "#000000";
	textSett["awwSettingsHeight"].style.color = "#000000";
	textSett["awwSettingsWidth"].style.color = "#000000";
	window.settingsWrapper.style.display = "inline";
}

function addSettRow(description, elemName) {
	rowSett = document.createElement("tr");
	spanSettWr = document.createElement("td");
		spanSettWr.style.width = "180px";
	textSettWr = document.createElement("td");
		//textSettWr.style.width = "50%";
		textSettWr.style.padding = "5px";
	spanSett = document.createElement("span");
		spanSett.innerHTML = description;
	    textSett[elemName] = new Object();
	    textSett[elemName] = document.createElement("input");
		textSett[elemName].type = "text";
		textSett[elemName].id = elemName;
		textSett[elemName].style.width = "100%";
		textSett[elemName].oninput = function(){settingTextChange(this);};
	//window.textSett = textSett;
	spanSettWr.appendChild(spanSett);
	textSettWr.appendChild(textSett[elemName]);
	rowSett.appendChild(spanSettWr);
	rowSett.appendChild(textSettWr);
	return rowSett;
}

function isNormalInteger(str) {
    var n = ~~Number(str);
    return String(n) === str && n >= 0;
 }

function settingTextChange(txtBox){
	var throwErr = false;
	if (isNormalInteger(textSett["awwSettingsTop"].value) == false) {
		textSett["awwSettingsTop"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsTop"].value, 10) <= 0) {
		textSett["awwSettingsTop"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsTop"].style.color = "#000000";
		textSett["awwSettingsTop"].value = parseInt(textSett["awwSettingsTop"].value, 10)
	}
	//check left
	if (isNormalInteger(textSett["awwSettingsLeft"].value, 10) == false) {
		textSett["awwSettingsLeft"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsLeft"].value, 10) <= 0) {
		textSett["awwSettingsLeft"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsLeft"].style.color = "#000000";
	}
	//check Width
	if (isNormalInteger(textSett["awwSettingsWidth"].value, 10) == false) {
		textSett["awwSettingsWidth"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsWidth"].value, 10) <= 0) {
		textSett["awwSettingsWidth"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsWidth"].style.color = "#000000";
	}
	//check　height
	if (isNormalInteger(textSett["awwSettingsHeight"].value, 10) == false) {
		textSett["awwSettingsHeight"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsHeight"].value, 10) <= 0) {
		textSett["awwSettingsHeight"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsHeight"].style.color = "#000000";
	}
	
	if (parseInt(textSett["awwSettingsHeight"].value, 10) + parseInt(textSett["awwSettingsTop"].value, 10) > window.innerHeight) {
		textSett["awwSettingsHeight"].style.color = "#FF0000";
		textSett["awwSettingsTop"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (throwErr == false) {
		textSett["awwSettingsHeight"].style.color = "#000000";
		textSett["awwSettingsTop"].style.color = "#000000";
	}
	if (parseInt(textSett["awwSettingsWidth"].value, 10) + parseInt(textSett["awwSettingsLeft"].value, 10) > window.innerWidth) {
		textSett["awwSettingsWidth"].style.color = "#FF0000";
		textSett["awwSettingsLeft"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (throwErr == false) {
		textSett["awwSettingsWidth"].style.color = "#000000";
		textSett["awwSettingsLeft"].style.color = "#000000";
	}
	
	if (throwErr == false) {changeSize(parseInt(textSett["awwSettingsTop"].value, 10), parseInt(textSett["awwSettingsLeft"].value, 10), parseInt(textSett["awwSettingsWidth"].value, 10), parseInt(textSett["awwSettingsHeight"].value, 10));}
}

function buildSettingsDiv() {
		//settings window
		window.settingsWrapper = document.createElement("div");
			settingsWrapper.id = "settingsWrapper";
			settingsWrapper.style.display = "none";
			settingsWrapper.style.position = "fixed"
			settingsWrapper.style.zIndex = "201";
			settingsWrapper.style.width = "250px";
			settingsWrapper.style.height = "auto";
			settingsWrapper.style.backgroundColor = "#FFFFFF";
			settingsWrapper.style.boxShadow = "0px 0px 20px 2px #000000";
			settingsWrapper.style.top = window.innerHeight/2 - 85 + "px";
			settingsWrapper.style.left = window.innerWidth/2 - 125 + "px";
			settingsWrapper.style.padding = "10px";
		//generating table
		var settingsTable = document.createElement("table");
			settingsTable.id = "settingsTable";
			settingsTable.style.width = "100%";
		window.textSett = {};
		settingsTable.appendChild(addSettRow("Dialog width (px): ", "awwSettingsWidth"));
		settingsTable.appendChild(addSettRow("Dialog height (px): ", "awwSettingsHeight"));
		settingsTable.appendChild(addSettRow("Position form left (px): ", "awwSettingsLeft"));
		settingsTable.appendChild(addSettRow("Position from top (px): ", "awwSettingsTop"));
		/*settingsTable.appendChild(addSettRow("Background color (hex): 0x", "awwSettingsBgC")); //may implement later
		settingsTable.appendChild(addSettRow("Text color (hex): 0x", "awwSettingsTxtC"));
		settingsTable.appendChild(addSettRow("Selection color (hex): 0x", "awwSettingsSelC"));*/
		// /table
		//buttons wrapper
		var settingsButtonWrapper = document.createElement("div");
		
		var settingsOK = document.createElement("input");
			settingsOK.type = "button";
			settingsOK.value = "OK";
			settingsOK.style.margin = "5px";
			settingsOK.style.width = "70px";
			settingsOK.style.cssFloat = "right";
			settingsOK.onclick = function(){okchangeSize();}
		settingsButtonWrapper.appendChild(settingsOK);
		var settingsCancel = document.createElement("input");
			settingsCancel.type = "button";
			settingsCancel.value = "Cancel";
			settingsCancel.style.margin = "5px";
			settingsCancel.style.width = "70px";
			settingsCancel.style.cssFloat = "right";
			settingsCancel.onclick = function(){settingsWrapper.style.display = "none";}
		settingsButtonWrapper.appendChild(settingsCancel);
		settingsWrapper.appendChild(settingsTable);
		settingsWrapper.appendChild(settingsButtonWrapper);
		settingsAlreadyShown = true;
		document.body.appendChild(settingsWrapper);
}

function okchangeSize() {
	var errorMsg = "Error:\n";
	var throwErr = false;
	//check top
	if (isNormalInteger(textSett["awwSettingsTop"].value, 10) == false) {
		errorMsg = errorMsg + "Value in 'Top' is not a number.\n";
		textSett["awwSettingsTop"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsTop"].value, 10) <= 0) {
		errorMsg = errorMsg + "Value in 'Top' has to be greater than 0.\n";
		textSett["awwSettingsTop"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsTop"].style.color = "#000000";
	}
	//check left
	if (isNormalInteger(textSett["awwSettingsLeft"].value, 10) == false) {
		errorMsg = errorMsg + "Value in 'Left' is not a number.\n";
		textSett["awwSettingsLeft"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsLeft"].value, 10) <= 0) {
		errorMsg = errorMsg + "Value in 'Left' has to be greater than 0.\n";
		textSett["awwSettingsLeft"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsLeft"].style.color = "#000000";
	}
	//check Width
	if (isNormalInteger(textSett["awwSettingsWidth"].value, 10) == false) {
		errorMsg = errorMsg + "Value in 'Width' is not a number.\n";
		textSett["awwSettingsWidth"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsWidth"].value, 10) <= 0) {
		errorMsg = errorMsg + "Value in 'Width' has to be greater than 0.\n";
		textSett["awwSettingsWidth"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsWidth"].style.color = "#000000";
	}
	//check　height
	if (isNormalInteger(textSett["awwSettingsHeight"].value, 10) == false) {
		errorMsg = errorMsg + "Value in 'Height' is not a number.\n";
		textSett["awwSettingsHeight"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsHeight"].value, 10) <= 0) {
		errorMsg = errorMsg + "Value in 'Height' has to be greater than 0.\n";
		textSett["awwSettingsHeight"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsHeight"].style.color = "#000000";
	}
	
	if (parseInt(textSett["awwSettingsHeight"].value, 10) + parseInt(textSett["awwSettingsTop"].value, 10) > window.innerHeight) {
		errorMsg = errorMsg + "Dialog cannot be out of borders.\n";
		textSett["awwSettingsHeight"].style.color = "#FF0000";
		textSett["awwSettingsTop"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (throwErr == false) {
		textSett["awwSettingsHeight"].style.color = "#000000";
		textSett["awwSettingsTop"].style.color = "#000000";
	}
	if (parseInt(textSett["awwSettingsWidth"].value, 10) + parseInt(textSett["awwSettingsLeft"].value, 10) > window.innerWidth) {
		errorMsg = errorMsg + "Dialog cannot be out of borders.\n";
		textSett["awwSettingsWidth"].style.color = "#FF0000";
		textSett["awwSettingsLeft"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (throwErr == false) {
		textSett["awwSettingsWidth"].style.color = "#000000";
		textSett["awwSettingsLeft"].style.color = "#000000";
	}
		
	if (throwErr == false) {
		changeSize(parseInt(textSett["awwSettingsTop"].value, 10), parseInt(textSett["awwSettingsLeft"].value, 10), parseInt(textSett["awwSettingsWidth"].value, 10), parseInt(textSett["awwSettingsHeight"].value, 10));
		localStorage.setItem("aww2_width", parseInt(textSett["awwSettingsWidth"].value, 10));
		localStorage.setItem("aww2_height", parseInt(textSett["awwSettingsHeight"].value, 10));
		localStorage.setItem("aww2_top", parseInt(textSett["awwSettingsTop"].value, 10));
		localStorage.setItem("aww2_left", parseInt(textSett["awwSettingsLeft"].value, 10));
		settingsWrapper.style.display = "none";
	}
	else {
		alert(errorMsg);
	}
	
}

function changeSize(top, left, width, height){
	console.log("changing size...");
	//console.log(textSett["awwSettingsTop"].value);
	//console.log(textSett["awwSettingsLeft"].value);
	//console.log(textSett["awwSettingsWidth"].value);
	//console.log(textSett["awwSettingsHeight"].value);
	
	awwFacedDialogObj.style.top = top + "px";
	awwFacedDialogObj.style.left = left + "px";
	awwFacedDialogObj.style.width = width + "px";
	awwFacedDialogObj.style.height = height + "px";
    tableWrap.style.height = (height - 62) + "px";
	titleFace.style.width = (width - 448) + "px";
}

function createFacesDiv() {
    //alert("Loaded...");
    console.log("AWWFACES");
    var objTo = document.body;
    window.awwFacedDialogObj = document.createElement("div");
    window.tableWrap = document.createElement("div");
    var controls = document.createElement("div");
    //tableWrap.style.height = (455 + dialogHeight) + "px";
    tableWrap.id = "awwFacesTableWrapper";
    tableWrap.style.overflowY = "scroll";
    tableWrap.style.margin = "10px";
    awwFacedDialogObj.appendChild(tableWrap);
    
    var titleCapt = document.createElement("span");
    titleCapt.innerHTML = "Source URL:";
    titleCapt.style.margin = "10px";
    controls.appendChild(titleCapt);
    
    window.titleFace = document.createElement("input");
    titleFace.type = "text";
    titleFace.id = "awwFaceId";
    //titleFace.style.width = "387px";
    titleFace.style.margin = "10px";
    controls.appendChild(titleFace);
    
    var addFaceB = document.createElement("input");
    addFaceB.type = "button";
    addFaceB.value = "Add source"
    addFaceB.style.margin = "10px";
    addFaceB.style.width = "80px";
    addFaceB.onclick = function(){addFace();return false;};
    controls.appendChild(addFaceB);
    
    var cancel = document.createElement("input");
    cancel.type = "button";
    cancel.value = "Cancel"
    cancel.style.margin = "10px";
    cancel.style.width = "80px";
    cancel.onclick = function(){hideSelect()};
    controls.appendChild(cancel);
    
    window.wikiLink = document.createElement("a");
    wikiLink.href = "http://www.reddit.com/r/awwnime/wiki/sourcesandpixivguide";
    wikiLink.innerHTML = "Source Help";
    wikiLink.style.margin = "10px";
    controls.appendChild(wikiLink);
	
	var settings = document.createElement("img");
	settings.src = settingsIcon;
	settings.alt = "settings";
	settings.style.margin = "13px";
	settings.style.marginLeft = "0px";
	settings.style.position = "absolute";
	settings.title = "Settings...";
	settings.onclick = function(){initializeSettings();}
	controls.appendChild(settings);
    
    awwFacedDialogObj.appendChild(controls)
    objTo.appendChild(awwFacedDialogObj);
    awwFacedDialogObj.id = "awwFacesDialog";
    awwFacedDialogObj.style.position = "fixed";
    awwFacedDialogObj.style.top = "200px";
    awwFacedDialogObj.style.width = "835px";
    //awwFacedDialogObj.style.height = (500 + dialogHeight) + "px";
    awwFacedDialogObj.style.backgroundColor = "#FFFFFF";
    awwFacedDialogObj.style.display = "none"; //diaply none
    awwFacedDialogObj.style.boxShadow = "0px 0px 20px 2px #000000";
    awwFacedDialogObj.style.zIndex = "200";
    appendFaces();
    divAlreadyShown = true;
}

function addFace() {
    var faceCode = "";
    var inputEvent = new Event('input');
    var title = document.getElementById("awwFaceId").value;
     //[](Your text#name_of_face)
    var bbCode = ""
    var startText = document.getElementsByTagName("textarea")[selectedText.boxIndex].value;
    if (selectedFace == "") {
        alert("You have not selected any face.");
        return;
    }
    if (title == "") {
        bbCode = "[](" + faceIdChar + selectedFace + ")";
    }
    else {
        bbCode = "[](" + title + faceIdChar + selectedFace + ")";
    }
    console.log(bbCode);
    var endText = startText.substr(0, selectedText.start) + bbCode + startText.substring(selectedText.start + selectedText.length, startText.length);
    console.log(endText);
    document.getElementsByTagName("textarea")[selectedText.boxIndex].value = endText;
    awwFacedDialogObj.style.display = "none";
    document.getElementsByTagName("textarea")[selectedText.boxIndex].dispatchEvent(inputEvent);
    //var element = document.getElementsByTagName("textarea")[selectedText.boxIndex];
}

function appendFaceThumb(name, new_width, new_height) {
    var col = document.createElement("div");
    var divtest = document.createElement("a");
    divtest.innerHTML = "";
    divtest.title = "[](" + faceIdChar + name + ")";
    divtest.href = faceIdChar + name;
    divtest.id = name;
    divtest.style.margin = "auto";
    divtest.style.display = "block";
	divtest.style.position = "absolute";
	divtest.style.top = "0px";
	divtest.style.left = "0px";
	divtest.style.right = "0px";
	divtest.style.bottom = "0px";
    //test
    if (new_width != "" && new_height != "") {
        divtest.style.setProperty("background-size", new_width + "px " + new_height + "px", "important");
        divtest.style.setProperty("height", new_height + "px", "important");
        divtest.style.setProperty("width", new_width + "px", "important");
    }
    //divtest.style.height = 78;
    //divtest.verticalAlign = "middle";
    divtest.onclick=function(){faceClick(divtest.id);return false;};
    divtest.ondblclick=function(){faceClick(divtest.id);addFace();return false;};
	var gifLoad = document.createElement("img");

	gifLoad.style.position = "absolute";
	/*
	thumbDialWidth = "200px";
		thumbDialHeight
		Math.round(x)
		parseInt("10",10)
		
		*/
	/*gifLoad.style.top = "42px";
	gifLoad.style.left = "67px";*/
	gifLoad.style.top = (Math.round((parseInt(thumbDialHeight.substr(0, thumbDialHeight.length-2), 10)/2)-8)) +"px";
	gifLoad.style.left = (Math.round((parseInt(thumbDialWidth.substr(0, thumbDialWidth.length-2), 10)/2)-8)) +"px";
	gifLoad.style.zIndex = "-1";
    col.appendChild(divtest);
	col.appendChild(gifLoad);
	/*thumbDialWidth = "150px";
		thumbDialHeight*/
    col.style.width = thumbDialWidth;
    col.style.height = thumbDialHeight;
	col.style.position = "relative";
    col.style.margin = "5px";
    col.style.cssFloat = "left";
    return col;
}

function faceClick(faceId) {
    var allFaces = awwFacedDialogObj.getElementsByTagName("a");
    for (var i = 0; i < allFaces.length; i++) {
        allFaces[i].style.boxShadow = "";
    }
    document.getElementById(faceId).style.boxShadow = "0px 0px 20px 10px #F9401A";
    selectedFace = faceId;
    //alert(faceId);
}

function appendFaces() {
    var objTo = tableWrap;
    var regex = /https?:\/\/((www\.)?|(pay\.)?|(.{2}\.)?)reddit\.com\/r\/(\w+)\/.*/;
    var subreddit = document.URL.replace(regex, "$5").toLowerCase();
    if (subreddit == "kanmusu") {
	    faceIdChar = "#";
		wikiLink.href = "http://www.reddit.com/r/awwnime/wiki/sourcesandpixivguide";
		thumbDialWidth = "160px";
		thumbDialHeight = "50px";
        objTo.appendChild(appendFaceThumb("source", 128, 51));
        objTo.appendChild(appendFaceThumb("album", 128, 51));
        objTo.appendChild(appendFaceThumb("sourcensfw", 128, 51));
        objTo.appendChild(appendFaceThumb("albumnsfw", 128, 51));
        objTo.appendChild(appendFaceThumb("BBSource", 50, 19));
        objTo.appendChild(appendFaceThumb("CASource", 50, 19));
        objTo.appendChild(appendFaceThumb("CLSource", 50, 19));
        objTo.appendChild(appendFaceThumb("CVSource", 50, 19));
        objTo.appendChild(appendFaceThumb("DDSource", 50, 19));
        objTo.appendChild(appendFaceThumb("AVSource", 50, 19));
        objTo.appendChild(appendFaceThumb("SSSource", 50, 19));
        objTo.appendChild(appendFaceThumb("OtherSource", 50, 19));
        objTo.appendChild(appendFaceThumb("BBAlbum", 96, 19));
        objTo.appendChild(appendFaceThumb("CAAlbum", 96, 19));
        objTo.appendChild(appendFaceThumb("CLAlbum", 96, 19));
        objTo.appendChild(appendFaceThumb("CVAlbum", 96, 19));
        objTo.appendChild(appendFaceThumb("DDAlbum", 96, 19));
        objTo.appendChild(appendFaceThumb("AVAlbum", 96, 19));
        objTo.appendChild(appendFaceThumb("SSAlbum", 96, 19));
        objTo.appendChild(appendFaceThumb("OtherAlbum", 96, 19));
        objTo.appendChild(appendFaceThumb("BBNSFW", 104, 19));
        objTo.appendChild(appendFaceThumb("CANSFW", 104, 19));
        objTo.appendChild(appendFaceThumb("CLNSFW", 104, 19));
        objTo.appendChild(appendFaceThumb("CVNSFW", 104, 19));
        objTo.appendChild(appendFaceThumb("DDNSFW", 104, 19));
        objTo.appendChild(appendFaceThumb("AVNSFW", 104, 19));
        objTo.appendChild(appendFaceThumb("SSNSFW", 104, 19));
        objTo.appendChild(appendFaceThumb("OtherNSFW", 104, 19));
        objTo.appendChild(appendFaceThumb("BBNSFWAlbum", 149, 19));
        objTo.appendChild(appendFaceThumb("CANSFWAlbum", 149, 19));
        objTo.appendChild(appendFaceThumb("CLNSFWAlbum", 149, 19));
        objTo.appendChild(appendFaceThumb("CVNSFWAlbum", 149, 19));
        objTo.appendChild(appendFaceThumb("DDNSFWAlbum", 149, 19));
        objTo.appendChild(appendFaceThumb("AVNSFWAlbum", 149, 19));
        objTo.appendChild(appendFaceThumb("SSNSFWAlbum", 149, 19));
        objTo.appendChild(appendFaceThumb("OtherNSFWAlbum", 149, 19));

    }

}

function hideSelect() {
    awwFacedDialogObj.style.display = "none";
}

function showSelect(thisLink) {
    var inputTextFields = document.getElementsByTagName("textarea");
    for (var i = 0; i < inputTextFields.length; i++) {
        if (thisLink.parentNode.previousSibling.firstChild == inputTextFields[i]) selectedText.boxIndex = i;
    }
    selectedText.start = inputTextFields[selectedText.boxIndex].selectionStart;
    selectedText.length = inputTextFields[selectedText.boxIndex].selectionEnd - inputTextFields[selectedText.boxIndex].selectionStart;
    console.log("Box index: " + selectedText.boxIndex + ", selection start: " + selectedText.start + ", selection length: " + selectedText.length);
    if (divAlreadyShown == false) createFacesDiv();
    //document.getElementById("awwFacesDialog").style.left = ((window.innerWidth/2))-417 + "px";
    //document.getElementById("awwFacesDialog").style.left = ((window.innerWidth/2))-417 + "px";
    //divtest.style.left = "200px";
	/*
    if (window.innerWidth <= 1100 ) {
        awwFacedDialogObj.style.top = (dialogTop + 200) + "px";
        awwFacedDialogObj.style.left = (dialogLeft + 10) + "px";
        awwFacedDialogObj.style.width = (dialogWidth + 835) + "px";
        awwFacedDialogObj.style.height = (dialogHeight + 275) + "px";
        tableWrap.style.height = (dialogHeight + 218) + "px";
    }
    else if (window.innerWidth >= 1700) {
        awwFacedDialogObj.style.top = (dialogTop + 200) + "px";
        awwFacedDialogObj.style.left = (dialogLeft + 300) + "px";
        awwFacedDialogObj.style.width = (dialogWidth + 835) + "px";
        awwFacedDialogObj.style.height = (dialogHeight + 745) + "px";
        tableWrap.style.height = (dialogHeight + 693) + "px";
    }
    else {
        awwFacedDialogObj.style.top = (dialogTop + 200) + "px";
        awwFacedDialogObj.style.left = (dialogLeft + 200) + "px";
        awwFacedDialogObj.style.width = (dialogWidth + 835) + "px";
        awwFacedDialogObj.style.height = (dialogHeight + 500) + "px";
        tableWrap.style.height = (dialogHeight + 448) + "px";
    }
	*/
	if (localStorage.getItem("aww2_top") == null || localStorage.getItem("aww2_left") == null || localStorage.getItem("aww2_width") == null || localStorage.getItem("aww2_height") == null) {
		localStorage.setItem("aww2_width", 842);
		localStorage.setItem("aww2_height", 500);
		localStorage.setItem("aww2_top", Math.round((window.innerHeight-500)/2));
		localStorage.setItem("aww2_left", Math.round((window.innerWidth-842)/2));
		/*localStorage.setItem("aww2_bgc", "FFFFFF"); //may implement later
		localStorage.setItem("aww2_txtc", "000000");
		localStorage.setItem("aww2_sc", "F9401A");*/
		changeSize(localStorage.getItem("aww2_top"), localStorage.getItem("aww2_left"), localStorage.getItem("aww2_width"), localStorage.getItem("aww2_height"));
	}
	else if (((parseInt(localStorage.getItem("aww2_top"), 10) + parseInt(localStorage.getItem("aww2_height"), 10)) < window.innerHeight) && ((parseInt(localStorage.getItem("aww2_left"), 10) + parseInt(localStorage.getItem("aww2_width"), 10)) < window.innerWidth)) {
		changeSize(localStorage.getItem("aww2_top"), localStorage.getItem("aww2_left"), localStorage.getItem("aww2_width"), localStorage.getItem("aww2_height"));
	}
	else {
		alert("Faces dialog cannot fit into the browser window. Temporarily sizing and moving the dialog...");
		changeSize((window.innerHeight-350)/2, (window.innerWidth-692)/2, "692", "350");
	}
    console.log("Window width: " + window.innerWidth + "px");
    awwFacedDialogObj.style.display = "block";
}

function main() {
    //if user changed dialog properties...
    console.log("Awwfaces begin")
    /*if (dialogTop != 0 || dialogLeft != 0 || dialogWidth != 0 || dialogHeight != 0) {
        console.log("LocalStorage not set, but user dialog size detected. Creating localStorage...");
        //...create localstorege
        localStorage.setItem("aww_top", dialogTop);
        localStorage.setItem("aww_left", dialogLeft);
        localStorage.setItem("aww_width", dialogWidth);
        localStorage.setItem("aww_height", dialogHeight);
    }
    //check if localStorage is already set, but properties are to default 0's (because of script update)...
    if (localStorage.getItem("aww_left") != null && localStorage.getItem("aww_top") != null && localStorage.getItem("aww_height") != null && localStorage.getItem("aww_width") != null && dialogTop == 0 && dialogLeft == 0 && dialogHeight == 0 && dialogWidth == 0) {
        console.log("localStorage detected. changing dialog size.")
        //...overwrite those zeroes.
        dialogTop = parseInt(localStorage.getItem("aww_top"));
        dialogLeft = parseInt(localStorage.getItem("aww_left"));
        dialogWidth = parseInt(localStorage.getItem("aww_width"));
        dialogHeight = parseInt(localStorage.getItem("aww_height"));
    }
    //if user sets delete flag to 1
    if (deleteDialogPositionData == 1) {
        //delete localstorage
        console.log("deleting localstorage");
        alert("Position data deleted. Turn the flag back to 0, save and reload.");
        localStorage.removeItem("aww_top");
        localStorage.removeItem("aww_left");
        localStorage.removeItem("aww_width");
        localStorage.removeItem("aww_height");
    }
    //log developement
    console.log(localStorage.getItem("aww_top"));
    console.log(localStorage.getItem("aww_left"));
    console.log(localStorage.getItem("aww_width"));
    console.log(localStorage.getItem("aww_height"));
    */
    var bottomArea = document.getElementsByClassName("bottom-area");
    console.log("bottom area: " + bottomArea.length);
    for (var i = 0; i < bottomArea.length; i++) {
        var showDialogLink = document.createElement("a");
        showDialogLink.innerHTML = "Add a source";
        /*showDialogLink.style.fontSize = "smaller";
        showDialogLink.style.color = "#336699";
        showDialogLink.style.margin = "5px 0px 0px 10px";
        showDialogLink.style.display = "block";
        showDialogLink.style.cssFloat = "right";*/
        showDialogLink.style.cursor = "pointer";
        showDialogLink.className = "addFaceLink reddiquette";
        bottomArea[i].insertBefore(showDialogLink, bottomArea[i].childNodes[3]);
    }
    appendListenerToLink();
    appendListenerToReply();
}

var showSelectFunction = function(){showSelect(this);};

function appendListenerToLink() {
    console.log("Appending listener to 'Add Faces' links");
    var links = document.getElementsByClassName("addFaceLink");
    console.log("Found " + links.length + "'add' link(s)");
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", showSelectFunction);
    }
}
function appendListenerToReply() {
    console.log("Appending listener to 'reply' links");
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        if (links[i].innerHTML == "reply") {
            console.log("appending listener to reply...")
            links[i].addEventListener("click", function(){appendListenerToLink();});
        }
    }
}

main();
