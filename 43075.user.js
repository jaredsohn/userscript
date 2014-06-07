// ==UserScript==
// @name           UpUp.us Favorite Mall Searches
// @namespace      http://kol.upup.us/scripts/
// @description    Facilities for saved mall searches.  This is an unofficial patched version to allow some functionality with recent KOL mall search updates.
// @include        http://*kingdomofloathing.com/searchmall.php*
// @include        http://*kingdomofloathing.com/mall.php*
// @include        http://127.0.0.1:*/searchmall.php*
// @include        http://127.0.0.1:*/mall.php*
// @version        1.1
// ==/UserScript==

// Version 1.1
//  - fix for mall changes in the game
// Version 1.0
// temporary fixes by clump/fig bucket for new mall search
//  - can search
//  - can save new searches
//  - edit _seems_ to work...
//  - still need to prune out old option material and change to new 

savedArray = eval(GM_getValue('savedArray','[]'));

//create edit button
var editButton = document.createElement('input');
editButton.value = "Edit";
editButton.type = "submit";
editButton.className = "button";
editButton.setAttribute('style','margin-bottom: 5px;');
editButton.addEventListener('click',toggleOverlay,false);
document.getElementsByTagName('center')[2].insertBefore(editButton,document.getElementsByTagName('center')[2].firstChild);
if (editButton.nextSibling)
	editButton.parentNode.insertBefore(document.createElement('br'),editButton.nextSibling);
else
	editButton.parentNode.appendChild(document.createElement('br'));

//create select menu
var selectMenu = document.createElement('select');
selectMenu.id = "savedsearchmenu";
var opt=document.createElement('option');
opt.text = "---";
opt.value = 0;
selectMenu.appendChild(opt);
populateSelectMenu();
selectMenu.setAttribute('style','margin: 0 10px 5px 0;');
selectMenu.addEventListener('change',onChangeSelect,false);
document.getElementsByTagName('center')[2].insertBefore(selectMenu,document.getElementsByTagName('center')[2].firstChild);
selectTitle = document.createTextNode("Saved searches: ");
document.getElementsByTagName('center')[2].insertBefore(selectTitle,document.getElementsByTagName('center')[2].firstChild);

var closePic = "data:image/gif;base64,R0lGODlhDwAPAIABAP%2F%2F%2F%2F%2F%2F%2FyH5BAEAAAEALAAAAAAPAA8AAAIlhI%2Bpi%2BEPQ5MRuHZentvc%2FIGSOFqamJxeyZYW6nFVaEYQg%2BdJAQA7";
var gridPic = "data:image/gif;base64,R0lGODlhAgACAIABADQhW%2F%2F%2F%2FyH5BAEAAAEALAAAAAACAAIAAAIDRAIFADs%3D";
var savePic = "data:image/gif;base64,R0lGODlhDgAOAJEAAMzMzP%2F%2F%2FwAAAAAAACH5BAAAAAAALAAAAAAOAA4AAAIolI8JEu3NzHoPTQqXuHhLhgWeF4oaoCXbibYuKqUqq2Zxbd6JLapqAQA7";

var upPic = "data:image/gif;base64,R0lGODlhDQALAIABAAAAAP%2F%2F%2FyH5BAEAAAEALAAAAAANAAsAAAIVjA%2BnCr3c3It00Ysu1jxjq00h%2BAUFADs%3D";
var downPic = "data:image/gif;base64,R0lGODlhDQALAIABAAAAAP%2F%2F%2FyH5BAEAAAEALAAAAAANAAsAAAIXjIEJxqHZzltxUmcfzpfXGUlQKJLNxRQAOw%3D%3D";
var trashPic = "data:image/gif;base64,R0lGODlhCQAKAJECAP%2F%2F%2FwAAAP%2F%2F%2FwAAACH5BAEAAAIALAAAAAAJAAoAAAIVlIMmyB0AI3BuzRsOnvr5joHfQgkFADs%3D";


//create save current search button
var saveIcon = document.createElement('img');
saveIcon.src = savePic;
saveIcon.alt = "Save current search";
saveIcon.setAttribute('style','margin-left: 10px;cursor: pointer;');
saveIcon.addEventListener('click',saveCurrentSearch,false);

//find "save current search button" insert point
var inputs = document.getElementsByTagName('input');
for(i=0;i<inputs.length;i++){
	if(inputs[i].type == "submit" && inputs[i].value == "Search"){
		inputs[i].parentNode.insertBefore(saveIcon,inputs[i].nextSibling);
		break;
	}
}

//create hidden form
overlay = document.createElement('div');
overlay.id = "overlay";

Dialog = document.createElement('div');
Dialog.id = "Dialog";
DialogContent = document.createElement('div');
DialogContent.id = "DialogContent";
innerDialogHeader = document.createElement('div');
innerDialogHeader.id = "innerDialogHeader";

formArea = document.createElement('div');
formArea.id = "formArea";

//create save button
saveButton = document.createElement('input');
saveButton.type = "Submit";
saveButton.className="button";
saveButton.value = "Save";
saveButton.addEventListener('click',saveOverlay,false);

//create cancel button
closeIcon = document.createElement('img');
closeIcon.src = closePic;
closeIcon.alt = "Close Dialog";
closeIcon.setAttribute('style','float: right; margin:3px; cursor: pointer;');
closeIcon.addEventListener('click',toggleOverlay,false);

headerMessage = document.createTextNode("Edit Saved Searches");
fieldTitles = document.createTextNode("Edit Saved Searches");

//create cancel button
cancelButton = document.createElement('input');
cancelButton.type = "Submit";
cancelButton.className="button";
cancelButton.value = "Cancel";
cancelButton.addEventListener('click',toggleOverlay,false);

var upButton = document.createElement('img');
upButton.className = "sideButton";
upButton.src = upPic;
upButton.title = "Move selected item up";
upButton.addEventListener('click',moveUp,false);

var downButton = document.createElement('img');
downButton.className = "sideButton";
downButton.src = downPic;
downButton.title = "Move selected item down";
downButton.addEventListener('click',moveDown,false);

var trashButton = document.createElement('img');
trashButton.className = "sideButton";
trashButton.src = trashPic;
trashButton.title = "Delete selected item";
trashButton.addEventListener('click',deleteItem,false);

newGroupButton = document.createElement('input');
newGroupButton.type = "button";
newGroupButton.className="button";
newGroupButton.value = "New Group";
newGroupButton.addEventListener('click',newGroup,false);

newSearchButton = document.createElement('input');
newSearchButton.type = "button";
newSearchButton.className="button";
newSearchButton.value = "New Search";
newSearchButton.addEventListener('click',createBlankRow,false);

//append everything together
innerDialogHeader.appendChild(closeIcon);
innerDialogHeader.appendChild(headerMessage);
Dialog.appendChild(innerDialogHeader);

DialogContent.appendChild(newGroupButton);
DialogContent.appendChild(newSearchButton);

DialogContent.appendChild(upButton);
DialogContent.appendChild(downButton);
DialogContent.appendChild(trashButton);



DialogContent.appendChild(formArea);
DialogContent.appendChild(saveButton);
DialogContent.appendChild(cancelButton);

Dialog.appendChild(DialogContent);
overlay.appendChild(Dialog);
document.body.appendChild(overlay);

//style overlay section
addGlobalStyle(' \n\
#savedsearchmenu optgroup option{ \n\
	padding-left:2px; \n\
	color:black; \n\
	background-color:white; \n\
} \n\
#savedsearchmenu optgroup { \n\
	text-indent:2px; \n\
	margin-top:2px; \n\
	background-color:#dfecf5; \n\
	font-style:normal; \n\
} \n\
img.sideButton { \n\
	cursor:pointer; \n\
	margin:2px; \n\
	float:right; \n\
	clear:right; \n\
} \n\
body { \n\
	min-height:100%; \n\
	position:relative; \n\
	margin:0; \n\
	padding:8px; \n\
} \n\
html { \n\
	height:100%; \n\
} \n\
#overlay { \n\
	visibility: hidden; \n\
	position: absolute; \n\
	left: 0px; \n\
	top: 0px; \n\
	width:100%; \n\
	height:100%; \n\
	text-align:center; \n\
	z-index: 1000; \n\
	background-image: url('+gridPic+'); \n\
} \n\
#Dialog { \n\
	width:275px; \n\
	margin: 100px auto 0 auto; \n\
	background-color: #fff; \n\
	border:1px solid blue; \n\
	text-align:left; \n\
} \n\
#DialogContent { \n\
	padding:4px 20px 10px 12px; \n\
} \n\
#DialogContent Input { \n\
	margin:5px 5px 5px 0; \n\
} \n\
#formArea { \n\
	overflow: auto; \n\
	max-height: 300px; \n\
} \n\
#formArea div { \n\
	padding:3px; \n\
} \n\
#formArea Input { \n\
	border-style:solid; \n\
	border-width:1px; \n\
	margin:0 3px 0 0; \n\
} \n\
div.selectedItem { \n\
	background-color:#a9c2d4;\n\
}\n\
div.selectedItem input {\n\
	background-color:#c5e3f8;\n\
}\n\
input.groupTitle { \n\
	border:1px solid gray;\n\
	background-color:#eee;\n\
	font-weight:bold;\n\
	font-style:italic;\n\
}\n\
#innerDialogHeader { \n\
	width: 100%; \n\
	color: white; \n\
	background-color: blue; \n\
	text-align: center; \n\
	font-weight: bold; \n\
}');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function populateSelectMenu() {
	if (savedArray && savedArray.length>0) {
		var optionGroup = false;
		for(i=0,l=savedArray.length;i<l;i++){
			var currData = savedArray[i];
			if(currData.length>1) {
				var opt=document.createElement('option');
				opt.text = currData[0];
				opt.value = i;
				if(optionGroup) {
					optionGroup.appendChild(opt)
				} else {
					selectMenu.appendChild(opt);
				}
			} else {
 				optionGroup = document.createElement('optgroup');
 				optionGroup.label=currData[0];
 				selectMenu.appendChild(optionGroup);
 			}
		}
	}
}

//called when clicking + button and opening overlay with no saved info.
function createBlankRow() {
	formArea = document.getElementById("formArea");
	
	var div = document.createElement('div');
	div.addEventListener('mousedown',select,false);
	var whichitem = document.createElement('input');
	whichitem.type = 'text';
	var cheaponly = document.createElement('input');
	cheaponly.type = 'checkbox';
	var shownum = document.createElement('input');
	shownum.type = 'text';
	shownum.size = 2;
	
	div.appendChild(whichitem);
	div.appendChild(cheaponly);
	div.appendChild(shownum);
	
	formArea.appendChild(div);
}

//called when saving overlay or saving new search
function repopulateSelectMenu() {
	var selectMenu = document.getElementById('savedsearchmenu');
	for(var i=selectMenu.childNodes.length-1;i>0;i--) {
		var node=selectMenu.childNodes[i];
		selectMenu.removeChild(node);
	}
	populateSelectMenu();
}

//called when clicking save search button
function saveCurrentSearch() {
	var whichitem = document.forms.namedItem("searchform").elements.namedItem("pudnuggler").value.replace('"','\"');
	if (whichitem != null && whichitem != ""){
		//var cheaponly = document.forms.namedItem("searchform").elements.namedItem("cheaponly").checked;
		//var shownum = document.forms.namedItem("searchform").elements.namedItem("shownum").value;
		
		//savedArray.push([whichitem,cheaponly,shownum]);
		savedArray.push([whichitem,false,"5"]); // save with unused extra fields
		GM_setValue('savedArray',uneval(savedArray));
		repopulateSelectMenu();
	}
}

//called when saving or sorting overlay

function readDialog() {
	var sections = formArea.childNodes;
	var readArray = new Array();
	
	for(var i=0,l=sections.length;i<l;i++) {
		var nodes=sections[i].childNodes;
		if(nodes.length>1) {
			readArray.push([nodes[0].value,nodes[1].checked,nodes[2].value]);
		} else {
			readArray.push([nodes[0].value]);
		}
	}/*
	
	var inputs = document.getElementById("formArea").getElementsByTagName('input');
	var readArray = new Array();
	for(i=0;i<inputs.length-2;i++) {
		if((i+3)%3==0){
			if(inputs[i].value != null && inputs[i].value != "") {
				readArray.push([inputs[i].value,inputs[i+1].checked,inputs[i+2].value]);
			}
		}
	}*/
	return readArray;
}

//called from save button
function saveOverlay() {
	savedArray = readDialog();
	GM_setValue('savedArray',uneval(savedArray));
	repopulateSelectMenu();
	document.getElementById("overlay").style.visibility = "hidden";
}

//called when changing saved searches select menu
function onChangeSelect() {
	if(selectMenu.selectedIndex != 0) {
		var num=selectMenu.value;
		document.forms.namedItem("searchform").elements.namedItem("pudnuggler").value = savedArray[num][0];
		//document.forms.namedItem("searchform").elements.namedItem("cheaponly").checked = savedArray[num][1];
		//document.forms.namedItem("searchform").elements.namedItem("shownum").value = savedArray[num][2];
		document.forms.namedItem("searchform").submit();
	}
}

function newGroup() {
	formArea = document.getElementById("formArea");
	
	var div = document.createElement('div');
	div.addEventListener('mousedown',select,false);

	var groupTitle = document.createElement('input');
	groupTitle.type = 'text';
	groupTitle.size = 25;
	groupTitle.className = "groupTitle";
	
	div.appendChild(groupTitle);
	
	formArea.appendChild(div);
}
//called from dialog sort button
function sortOverlay() {
	formArea = document.getElementById("formArea");
	var	temp_savedArray = readDialog().sort(sortByFirstField);
		if(temp_savedArray.length >= 1) {
			formArea.innerHTML = "";
			for(i=0;i<temp_savedArray.length;i++)
			{	
				var div = document.createElement('div');

				var whichitem = document.createElement('input');
				whichitem.type = 'text';
				whichitem.value = temp_savedArray[i][0];
				var cheaponly = document.createElement('input');
				cheaponly.type = 'checkbox';
				cheaponly.checked = temp_savedArray[i][1];
				var shownum = document.createElement('input');
				shownum.type = 'text';
				shownum.size = 2;
				shownum.value = temp_savedArray[i][2];
				
				div.appendChild(whichitem);
				div.appendChild(cheaponly);
				div.appendChild(shownum);

				formArea.appendChild(div);
			}
		}
}
function moveDown(e) {
	var xp = ".//div[@class='selectedItem']";
	var selected = find(xp,formArea);
	if(a=selected.nextSibling) {
		formArea.insertBefore(selected,a.nextSibling);
	}
}
function moveUp(e) {
	var xp = ".//div[@class='selectedItem']";
	var selected = find(xp,formArea);
	if(a=selected.previousSibling) {
		formArea.insertBefore(selected,a);
	}
}
function deleteItem(e) {
	var xp = ".//div[@class='selectedItem']";
	var selected = find(xp,formArea);
	formArea.removeChild(selected);
}
function find(xp,location) {
	if(!location)location=document;
	var temp = document.evaluate(xp, location, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	return temp.singleNodeValue;
}
function select(e) {
	if (e.currentTarget && (e.currentTarget != e.target)) {
		elem = e.currentTarget
	} else {
		elem = e.target
	}
	var theDivs=elem.parentNode.childNodes;
	for(var i=0,l=theDivs.length;i<l;i++) {
		theDivs[i].className="";
	}
	elem.className="selectedItem";
}


//called from "edit" menu or overlay cancel button
function toggleOverlay() {
	var overlay = document.getElementById("overlay");
	if (overlay.style.visibility == "visible"){
		overlay.style.visibility = "hidden";
	} else {
		formArea = document.getElementById("formArea");
	 	formArea.innerHTML = "";
		if(savedArray && savedArray.length>0) {
			for(i=0,l=savedArray.length;i<l;i++)
			{	
				var currData = savedArray[i];
				
				var div = document.createElement('div');
				div.addEventListener('mousedown',select,false);
				
				if(currData.length>1) {
					var whichitem = document.createElement('input');
					whichitem.name = "whichitem";
					whichitem.type = 'text';
					whichitem.value = currData[0];
					var cheaponly = document.createElement('input');
					cheaponly.name = "cheaponly";
					cheaponly.type = "checkbox";
					cheaponly.checked = currData[1];
					var shownum = document.createElement('input');
					shownum.name = "shownum";
					shownum.type = 'text';
					shownum.size = 2;
					shownum.value = currData[2];
					
					div.appendChild(whichitem);
					div.appendChild(cheaponly);
					div.appendChild(shownum);
				} else {
					var groupTitle = document.createElement('input');
					groupTitle.type = 'text';
					groupTitle.size = 25;
					groupTitle.className = "groupTitle";
					groupTitle.value = currData[0];
					div.appendChild(groupTitle);
				}
				formArea.appendChild(div);
				
			}
		}	else {
				createBlankRow();
		}
		overlay.style.visibility = "visible";
	}
}

//Sort order for saved searches array
function sortByFirstField(a,b){
	x = a[0].toLowerCase().replace(/["\\']/gi,'');
	y = b[0].toLowerCase().replace(/["\\']/gi,'');
	return x > y ? 1 : x < y ? -1 : 0;
}
