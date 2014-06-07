// ==UserScript==
// @id             4ed740f2-2088-46df-ac84-f68531d22338
// @name           GameFAQs Board Manager
// @namespace      Takato
// @author         Takato
// @copyright      2012+, Takato (http://userscripts.org/users/82358)
// @licence        Summary: Free for personal non-commercial use; http://userscripts.org/scripts/show/131720
// @description    Manage your GameFAQs Board List
// @version        2012.04.24
// @updateURL      http://userscripts.org/scripts/source/131720.meta.js
// @downloadURL    http://userscripts.org/scripts/source/131720.user.js
// @website        http://userscripts.org/scripts/show/131720
// @include        http://www.gamefaqs.com/boards
// @include        http://www.gamefaqs.com/boards/
// ==/UserScript==
script = {};
script.version = "2012.04.24";

// SETTINGS -----------------------------
// You can set up your settings on GameFAQs 
// --------------------------------------

// Everything below this line shouldn't be edited unless you are an advanced user and know what you are doing.

// Defining script constants
script.name = "GameFAQs Board Manager";
script.shortname = "GBM";
script.website = "http://userscripts.org/scripts/show/131720";
script.discussion = "http://userscripts.org/scripts/discuss/131720";
script.icon = "";
script.icon64 = "";
script.mainCSS = "";
script.mainCSS = "";

// Script icons
icon = {};
icon.gear = "http://i.imgur.com/uFPKl.png";
icon.save = "http://i.imgur.com/VHU3d.png";
icon.rename = "http://i.imgur.com/t3HkW.png";
icon.remove = "http://i.imgur.com/M0iFv.png";
icon.add = "http://i.imgur.com/x7cTl.png";
icon.boardTop = "http://i.imgur.com/XqXod.png";
icon.boardUp = "http://i.imgur.com/ZDZZB.png";
icon.boardDown = "http://i.imgur.com/jJWaW.png";
icon.boardBottom = "http://i.imgur.com/jeyII.png";
// http://www.famfamfam.com/lab/icons/silk/icons/arrow_down.png
// http://www.famfamfam.com/lab/icons/silk/icons/arrow_left.png
// http://www.famfamfam.com/lab/icons/silk/icons/arrow_right.png
// http://www.famfamfam.com/lab/icons/silk/icons/arrow_up.png
// http://www.famfamfam.com/lab/icons/silk/icons/asterisk_yellow.png
// http://www.famfamfam.com/lab/icons/silk/icons/bullet_wrench.png
// http://www.famfamfam.com/lab/icons/silk/icons/cancel.png
// http://www.famfamfam.com/lab/icons/silk/icons/delete.png
// http://www.famfamfam.com/lab/icons/silk/icons/exclamation.png
// http://www.famfamfam.com/lab/icons/silk/icons/error.png
// http://www.famfamfam.com/lab/icons/silk/icons/folder.png
// http://www.famfamfam.com/lab/icons/silk/icons/folder_add.png
// http://www.famfamfam.com/lab/icons/silk/icons/folder_delete.png
// http://www.famfamfam.com/lab/icons/silk/icons/folder_edit.png
// http://www.famfamfam.com/lab/icons/silk/icons/folder_wrench.png
// http://www.famfamfam.com/lab/icons/silk/icons/help.png
// http://www.famfamfam.com/lab/icons/silk/icons/information.png
// http://www.famfamfam.com/lab/icons/silk/icons/pencil.png
// http://www.famfamfam.com/lab/icons/silk/icons/pencil_add.png
// http://www.famfamfam.com/lab/icons/silk/icons/pencil_delete.png
// http://www.famfamfam.com/lab/icons/silk/icons/tick.png


// Check browser support for GM_getValue() and GM_setValue()
supportGM = false;
try {
	GM_setValue("gmSupport", true);
	doesIt = GM_getValue("gmSupport");
	if (doesIt) {
		supportGM = true;
	} else {
		supportGM = false;
	}
} catch (ex) {
	supportGM = false;
}

// End if browser doesn't support GM_ functions
if (!supportGM) { 
	topBox = document.getElementById("content").childNodes[0];
	topBox.innerHTML = "<p class='error'><B>" + script.name + "</B> - You have installed " + script.name + ", however your browser doesn't support Greasemonkey functions. <br/>Chrome users, please uninstall this script, install the <a href=\"https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo\">Tampermonkey</a> extension, then install this script using Tampermonkey. Other browser users, please install <a href=\"http://userscripts.org/scripts/show/105153\">Greasemonkey Emulation Script</a>. For support, visit the <a href='" + script.website + "'>script page</a>.</p>" + topBox.innerHTML;
	return;
}

var categoryBoards = new Array();
var categorySettings = new Array();

loadArrays();

initialLayout();

settingButton = document.createElement("img");
settingButton.setAttribute("src", icon.gear);
settingButton.setAttribute("id", "gbmSettingButton");
settingButton.setAttribute("style", "float:right !important; cursor:pointer !important;");
pageHead = document.getElementById("main_col").getElementsByClassName("title")[0];
pageHead.appendChild(settingButton);
settingButton.addEventListener("click", startManage, true); 

//startManage();





// ---------------------------------------
// FUNCTIONS -----------------------------
// ---------------------------------------


// Load all the arrays from string format into array format.
function loadArrays() {
	try {
		arrCategoryBoards = GM_getValue("categoryBoards").split("|");
		arrCategorySettings = GM_getValue("categorySettings").split("|");
		count = 0;
		while (count < arrCategoryBoards.length) {
			arrCategoryBoards[count] = arrCategoryBoards[count].split("~");
			count++;
		}
		count = 0;
		while (count < arrCategorySettings.length) {
			arrCategorySettings[count] = arrCategorySettings[count].split("~");
			count++;
		}
		categoryBoards = arrCategoryBoards;
		categorySettings = arrCategorySettings;
	} catch(ex) {
		firstRun();
	}
}

// Save all the arrays from array format to string format.
function saveArrays() {
	strCategoryBoards = categoryBoards;
	strCategorySettings = categorySettings;
	count = 0;
	while (count < strCategoryBoards.length) {
		strCategoryBoards[count] = strCategoryBoards[count].join("~");
		count++;
	}
	count = 0;
	while (count < strCategorySettings.length) {
		strCategorySettings[count] = strCategorySettings[count].join("~");
		count++;
	}
	GM_setValue("categoryBoards", strCategoryBoards.join("|"));
	GM_setValue("categorySettings", strCategorySettings.join("|"));
}


function firstRun() {
	boardList = document.getElementsByClassName("board")[0];
	currentCategory = 0;
	boardRows = boardList.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	count = 0;
	categoryBoards = [];
	categoryBoards[0] = [];
	categorySettings = [];
	categorySettings[0] = ["Favourite Boards", 0];
	while (count < boardRows.length) {
		if (boardRows[count].classList.contains("head")) {
			if (boardRows[count].getAttribute("categoryID") == "-1") {
				return;
			}
			currentCategory++;
			categorySettings[currentCategory] = [boardRows[count].getElementsByTagName("th")[0].innerHTML, 0];
			categoryBoards[currentCategory] = [];
		} else {
			try {
				boardID = boardRows[count].getElementsByTagName("td")[0].getElementsByTagName("a")[0].getAttribute("href");
				boardID = boardID.substring(8);
				boardID = boardID.substring(0, boardID.indexOf("-"));
				categoryBoards[currentCategory].push(boardID);
			} catch (ex) {
				//boardID = boardRows[count].getElementsByTagName("td")[0].innerHTML;
				//categoryBoards[currentCategory].push(boardID);
			}
		}
		count++;
	}
	saveArrays();
}


function initialLayout() {
	boardList = document.getElementById("main_col").getElementsByClassName("board")[0];
	boardListBody = boardList.getElementsByTagName("tbody")[0];
	boardListRows = boardListBody.getElementsByTagName("tr");
	
	// Mark each row with the board ID
	count = 0;
	while (count < boardListRows.length) { 
		if (!boardListRows[count].classList.contains("head")) {
			try {
				boardID = boardListRows[count].getElementsByTagName("a")[0].getAttribute("href");
				boardID = boardID.substring(8);
				boardID = boardID.substring(0, boardID.indexOf("-"));
			} catch (ex) {
				boardID = "notBoard";
			}
			boardListRows[count].setAttribute("boardID", boardID);
			boardListRows[count].classList.add("board" + boardID);
		}
		count++;
	}
	
	// Remove default category heads
	count = 0;
	boardListHeads = boardListBody.getElementsByClassName("head");
	while (count < boardListHeads.length) { 
		boardListBody.removeChild(boardListHeads[0]);
	}
	
	// Insert "Unsorted" category head
	unsortedHead = document.createElement("tr");
	unsortedHead.setAttribute("class", "head");
	unsortedHead.setAttribute("id", "unsortedboards");
	unsortedHead.setAttribute("categoryID", "-1");
	unsortedHead.innerHTML = "<th colspan='4' scope='col'>Unsorted Boards</th>";
	boardListBody.insertBefore(unsortedHead, boardListBody.firstChild);
	
	// Build each category
	catCount = 0;
	boardCount = 0;
	catHead = {};
	boardRow = {};
	while (catCount < categorySettings.length) {
		if (catCount !=0) { // Header (all categories except the first)
			catHead[catCount] = document.createElement("tr");
			catHead[catCount].setAttribute("class", "head");
			catHead[catCount].setAttribute("categoryID", catCount);
			catHead[catCount].innerHTML = "<th colspan='4' scope='col'>" + categorySettings[catCount][0] + "</th>";
			boardListBody.insertBefore(catHead[catCount], unsortedHead);
		}
		boardCount = 0;
		boardRow[catCount] = {};
		while (boardCount < categoryBoards[catCount].length) { // Each board in this category
			try {
				boardRow[catCount][boardCount] = boardListBody.getElementsByClassName("board" + categoryBoards[catCount][boardCount])[0];
				boardListBody.insertBefore(boardRow[catCount][boardCount], unsortedHead);
			} catch (ex) {
			}
			boardCount++;
		}
		catCount++;
	}
	
	if (boardListRows[boardListRows.length-1].getAttribute("categoryID") == "-1") {
		boardListRows[boardListRows.length-1].parentNode.removeChild(boardListRows[boardListRows.length-1]);
	}
	removeOddEven();
	addOddEven();
}

// Remove "Even" from rows so all rows are the same
function removeOddEven() { 
	boardList = document.getElementById("main_col").getElementsByClassName("board")[0];
	boardListBody = boardList.getElementsByTagName("tbody")[0];
	boardListRowsEven = boardListBody.getElementsByClassName("even");
	while (boardListRowsEven.length > 0) { 
		boardListRowsEven[0].classList.remove("even");
	}
}

// Add "Even" to every 2nd row
function addOddEven() {
	boardList = document.getElementById("main_col").getElementsByClassName("board")[0];
	boardListBody = boardList.getElementsByTagName("tbody")[0];
	boardListRows = boardListBody.getElementsByTagName("tr");
	count = 0;
	even = false;
	while (count < boardListRows.length) {
		if (!boardListRows[count].classList.contains("head")) {
			if (even) {
				boardListRows[count].classList.add("even");
			}
			even = !even;
		}
		count++;
	}
}

// Add a category
function addCategory() {
	// Ask for name
	name = "";
	name = prompt("Name for new category.\nThis new category will appear above \"Unsorted Boards\".", "New Category");
	
	if (name != null) {
		// Make sure the name is okay
		bad = false;
		badCharacters = ["\"", "~", ";", ":", "|", "<", ">"];
		count = 0;
		while (count < badCharacters.length) {
			if (name.indexOf(badCharacters[count]) > -1) {
				bad = true;
				alert("Category names can't contain \" " + badCharacters[count] + " \". Try a different name.");
			}
			count++;
		}
		
		if (!bad) {
			unsorted = document.getElementById("unsortedboards");
			newCat = document.createElement("tr");
			newCat.setAttribute("class", "head");
			newCat.innerHTML = "<th scope='col' colspan='4'>"+name+"</th>" + controlBlockCategory();
			unsorted.parentNode.insertBefore(newCat, unsorted);
			registerCategoryEvents();
		}
	}
}

// Rename a category - triggered on button click
function catRenameClick(e) {
	// Get the current name
	eTarget = e.target;
	while (eTarget.nodeName != "TR") {
		eTarget = eTarget.parentNode;
	}
	currentName = eTarget.firstChild.innerHTML;
	
	// Ask for new name
	newName = "";
	newName = prompt("Rename Category \"" + currentName + "\"", currentName);
	
	if (newName != null) {
		// Make sure the new name is okay
		bad = false;
		badCharacters = ["\"", "~", ";", ":", "|", "<", ">"];
		count = 0;
		while (count < badCharacters.length) {
			if (newName.indexOf(badCharacters[count]) > -1) {
				bad = true;
				alert("Category names can't contain \" " + badCharacters[count] + " \". Try a different name.");
			}
			count++;
		}
		
		if (!bad) {
			eTarget.firstChild.innerHTML = newName;
		}
	}
}

// Delete a category - triggered on button click
function catDeleteClick(e) {
	// Get the category
	eTarget = e.target;
	while (eTarget.nodeName != "TR") {
		eTarget = eTarget.parentNode;
	}
	catName = eTarget.firstChild.innerHTML;
	catID = eTarget.getAttribute("categoryID");
	
	// Confirm delete
	confirmed = false;
	confirmed = confirm("Are you sure you want to delete category \"" + catName + "\"? \nAll boards inside this category will be moved to \"Unsorted Boards\".");
	
	if (confirmed) {
		boardList = document.getElementById("main_col").getElementsByClassName("board")[0];
		boardListBody = boardList.getElementsByTagName("tbody")[0];
		// Move all boards in this category to "Unsorted Boards"
		while (!eTarget.nextSibling.classList.contains("head")) {
			boardListBody.appendChild(eTarget.nextSibling);
		}
		// Remove category
		eTarget.parentNode.removeChild(eTarget);
	}
	
}

// Move a board to Top of category - triggered on button click
function boardTopClick(e) {
	// Get the board
	eTarget = e.target;
	while (eTarget.nodeName != "TR") {
		eTarget = eTarget.parentNode;
	}
	
	// Find the top board
	currentTop = eTarget;
	foundTop = false;
	while (!foundTop) {
		if (currentTop.previousSibling == null) {
			foundTop = true;
		} else if (currentTop.previousSibling.classList.contains("head")) {
			foundTop = true;
		}
		if (!foundTop) {
			currentTop = currentTop.previousSibling;
		}
	}
		
	// Move board to top
	if (eTarget != currentTop) {
		eTarget.parentNode.insertBefore(eTarget, currentTop);
	}
		
}

// Move a board up one space - triggered on button click
function boardUpClick(e) {
	// Get the board
	eTarget = e.target;
	while (eTarget.nodeName != "TR") {
		eTarget = eTarget.parentNode;
	}
	
	// Check the board above
	boardAbove = eTarget.previousSibling;
	canMove = true;
	if (boardAbove == null) {
		canMove = false;
	}
	
	// Move the board up one space
	if (canMove) {
		eTarget.parentNode.insertBefore(eTarget, boardAbove);
	}
}

// Move a board down one space - triggered on button click
function boardDownClick(e) {
	// Get the board
	eTarget = e.target;
	while (eTarget.nodeName != "TR") {
		eTarget = eTarget.parentNode;
	}
	
	// Check the board below
	boardBelow = eTarget.nextSibling;
	canMove = true;
	if (boardBelow == null) {
		canMove = false;
	}
	
	// Move the board down one space
	if (canMove) {
		eTarget.parentNode.insertBefore(eTarget, boardBelow.nextSibling);
	}
}

// Move a board to Bottom of category - triggered on button click
function boardBottomClick(e) {
	// Get the board
	eTarget = e.target;
	while (eTarget.nodeName != "TR") {
		eTarget = eTarget.parentNode;
	}
	
	// Find the bottom board
	currentBottom = eTarget;
	foundBottom = false;
	while (!foundBottom) {
		if (currentBottom.nextSibling == null) {
			foundBottom = true;
		} else if (currentBottom.nextSibling.classList.contains("head")) {
			foundBottom = true;
		}
		if (!foundBottom) {
			currentBottom = currentBottom.nextSibling;
		}
	}
	
	// Move board to bottom
	if (eTarget != currentBottom) {
		eTarget.parentNode.insertBefore(eTarget, currentBottom.nextSibling);
	}
		
}

// Return the control block for categories
function controlBlockCategory() { 
	return "<th class='gbmCatControls'> <img class='gbmCatRename' src='" + icon.rename + "' style='cursor:pointer !important;'/> <img class='gbmCatDelete' src='" + icon.remove + "' style='cursor:pointer !important;'/> </th>";
}

// Return the control block for boards
function controlBlockBoard() {
	return "<td class='gbmBoardControls'> <img class='gbmBoardTop' src='" + icon.boardTop + "' style='cursor:pointer !important;'/> <img class='gbmBoardUp' src='" + icon.boardUp + "' style='cursor:pointer !important;'/> <img class='gbmBoardDown' src='" + icon.boardDown + "' style='cursor:pointer !important;'/> <img class='gbmBoardBottom' src='" + icon.boardBottom + "' style='cursor:pointer !important;'/></td>";
}

// Register event listeners for the Category control block
function registerCategoryEvents() {
	catRename = document.getElementsByClassName("gbmCatRename"); // Category - Rename
	count = 0;
	while (count < catRename.length) {
		catRename[count].addEventListener("click", catRenameClick, true);
		count++;
	}
	catDelete = document.getElementsByClassName("gbmCatDelete"); // Category - Delete
	count = 0;
	while (count < catDelete.length) {
		catDelete[count].addEventListener("click", catDeleteClick, true);
		count++;
	}
}

// Register event listeners for the Board control block
function registerBoardEvents() {
	boardTop = document.getElementsByClassName("gbmBoardTop"); // Board - Move to Top
	count = 0;
	while (count < boardTop.length) {
		boardTop[count].addEventListener("click", boardTopClick, true);
		count++;
	}
	boardUp = document.getElementsByClassName("gbmBoardUp"); // Board - Move up
	count = 0;
	while (count < boardUp.length) {
		boardUp[count].addEventListener("click", boardUpClick, true);
		count++;
	}
	boardDown = document.getElementsByClassName("gbmBoardDown"); // Board - Move down
	count = 0;
	while (count < boardDown.length) {
		boardDown[count].addEventListener("click", boardDownClick, true);
		count++;
	}
	boardBottom = document.getElementsByClassName("gbmBoardBottom"); // Board - Move to Bottom
	count = 0;
	while (count < boardBottom.length) {
		boardBottom[count].addEventListener("click", boardBottomClick, true);
		count++;
	}
}

function startManage() {
	settingButton.setAttribute("style", "display:none !important; float:right !important; cursor:pointer !important;");
	manageBlock = document.createElement("div");
	manageBlock.setAttribute("id", "gbmSideblock");
	manageBlock.setAttribute("class", "pod");
	manageBlock.innerHTML = "<div class='head'> <h2 class='title'>Board Manager</h2> </div> <div class='body'> <p><B>Actions:</B> (Click here) <ul> <li id='gbmNewCat' style='cursor:pointer !important;'><img src='" + icon.add + "'/> Add New Category</li> <li id='gbmSaveChanges' style='cursor:pointer !important;'><img src='" + icon.save + "'/> Save Changes</li> <li>Refresh page to discard changes</li></ul></p> <p><b>Key:</b> (for buttons on the board list) <ul> <li><img src='" + icon.boardTop + "'/> Move board to top of category </li> <li><img src='" + icon.boardUp + "'/> Move board up one space </li> <li><img src='" + icon.boardDown + "'/> Move board down one space </li> <li><img src='" + icon.boardBottom + "'/> Move board to bottom of category </li> </ul> </p></div>";
	document.getElementById("side_col").insertBefore(manageBlock, document.getElementById("side_col").firstChild.siblingNode);
	document.getElementById("gbmNewCat").addEventListener("click", addCategory, true);
	document.getElementById("gbmSaveChanges").addEventListener("click", endManage, true);
	removeOddEven();
	
	boardList = document.getElementById("main_col").getElementsByClassName("board")[0];
	boardListBody = boardList.getElementsByTagName("tbody")[0];
	boardListRows = boardListBody.getElementsByTagName("tr");
	
	// Add controls to each board and category
	count = 0;
	while (count < boardListRows.length) {
		thisRow = boardListRows[count];
		if (thisRow.classList.contains("head")) {
			if (thisRow.getAttribute("id") != "unsortedboards") {
				thisRow.innerHTML += controlBlockCategory();
			}
		} else {
			thisRow.innerHTML += controlBlockBoard();
		}
		count++;
	}
	
	// Set up event listeners on the controls
	registerCategoryEvents();
	registerBoardEvents();
	
	
}

function endManage() {
	settingButton.setAttribute("style", "float:right !important; cursor:pointer !important;");
	manageBlock = document.getElementById("gbmSideblock");
	manageBlock.parentNode.removeChild(manageBlock);
	addOddEven();
	
	// Remove controls
	catControls = document.getElementsByClassName("gbmCatControls");
	while (catControls.length != 0) {
		catControls[0].parentNode.removeChild(catControls[0]);
	}
	boardControls = document.getElementsByClassName("gbmBoardControls");
	while (boardControls.length != 0) {
		boardControls[0].parentNode.removeChild(boardControls[0]);
	}
	
	
	firstRun();
	saveArrays();
	
}



// End of script