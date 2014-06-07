// ==UserScript==
// @name                Digg Custom Tabs
// @namespace      		http://digg.com
// @description       	Add custom tabs(or topics), such as searches to the sidebar along with technology, science, view all, videos, etc.
// @include             http://digg.com/*
// @include             http://*.digg.com/*
// ==/UserScript==
//Lots of other stuff based on the GMail Saved Searches Script from http://persistent.info/archives/2005/03/01/gmail-searches, by mihai
var cTabs=new Array();
var header;
var gmCustomize;
const defaultTabs = {
  "Google": "http://digg.com/search?area=all&age=all&sort=new&search-buried=1&s=Google&submit=Search",
  "Yahoo": "http://digg.com/search?area=all&age=all&sort=new&search-buried=1&s=Yahoo&submit=Search"
};

//const RED_X="data:image/gif,GIF89a%0C%00%0C%00%80%00%00%FF%00%00%FF%FF%FF!%F9%04%01%00%00%01%00%2C%00%00%00%00%0C%00%0C%00%00%02%19%0C%1E%99%B8l~%80r-%D2z%B1%DA%2Fc%C9Y%D16v%13UfQ%01%00%3B";
const RED_X="data:image/gif;base64,R0lGODlhEAAQAJEAAP8AAP%2F%2F%2F%2F%2F%2F%2FwAAACH5BAEAAAIALAAAAAAQABAAAAIdjI%2Bpy%2B1vAECSyRluu9px%2BHkctnSdUh0pxLYuVAAAOw%3D%3D";
const TABS_COOKIE="gm-diggtabs_";

insertStyle();
loadTabs();
addTabs();
checkPageLocation();

function insertStyle(){
	const RULES = new Array(
	  // Edit page
	  ".innerContainer {text-align: left;}",
	  ".tabList {width: 100%;}",
	  ".tabList th {text-align: left;}",
	  ".tabList td {padding: 0 0 0 0; vertical-align: bottom;}",
	  ".tabList td.divider {height: 2px; padding: 0;}", //#80A71F
	  ".editItem {font-size: 120%;}",
	  ".labelCell {width: 180px;}",
	  ".labelCell input {width: 170px;}",
	  ".editCell {width: 100%}",
	  ".editCell input {width: 94%}",
	  ".saveButton {margin-left: 5px; margin-right: 5px; font-weight: bold;}",
	  ".cancelButton {margin-right: 5px; font-weight: bold;}",
	  ".addTabButton {margin-left: auto; margin-right: 0px; font-weight: bold; text-align: right;}",
	  "img.redx {border: 1px solid #ccc; vertical-align: bottom; padding: 1px; margin-left: 3px;}",
	  
	  //Save Search
	  "a.saveSearch {font-weight: normal; vertical-align: middle;}"
	);
	GM_addStyle(RULES.join("\n"));
}
function loadTabs(){
	var cookie;
	cTabs=new Array();
	if ((cookie=getCookie(TABS_COOKIE)) != null) {
		var serializedTabs = cookie.split("|");
  
		for (var i=0; i < serializedTabs.length; i++) {
			cTabs.push(getTabfromString(serializedTabs[i]));
		}
	} else {
		for (var query in defaultTabs) {
		  cTabs.push(new CustomTab(query, defaultTabs[query]));
		}
	}
}

function addTabs(){
	header = document.getElementById("header-primary");
	if (header!=null){
		header=header.childNodes[1];
		GM_log(header);
		GM_log("header: "+header.tagName);
		var customize=header.childNodes[header.childNodes.length-1];
		var lir;
		
		for (var i=0;i<cTabs.length;i++){
			lir = document.createElement("li");
			lir.name="sidebar_cTabs";
			lir.id="sidebar_cTabs_"+i;
			lir.className = "view-all";
			lir.innerHTML="<a href="+cTabs[i].location+"><strong>"+cTabs[i].label+"</strong></a>";
			header.insertBefore(lir,customize);
		}
		//GM_log(ulr[1].innerHTML);
	}
}

function refreshTabs(){
	header = document.getElementById("header-primary").firstChild;
	var tab;
	for (var i=0;(tab=document.getElementById("sidebar_cTabs_"+i))!=null;i++){
		header.removeChild(tab);
	}
	
	addTabs();
}

function checkPageLocation(){
	//<div id="sidebar"><h3>Username</h3>
	//var username=sidebar.innerHTML.match(/<h3>([a-zA-Z0-9]+)<\/h3>/)[1];
	//GM_log("Username="+username);
	//http://digg.com/users/JohnM5/edit/topics
	if (document.location.toString().match(/http:\/\/.*digg.com\/users\/([a-zA-Z0-9]+)\/edit\/topics/))
		insertCustomize();
	else if (document.location.toString().match(/http:\/\/.*digg.com\/search.*/))
		insertAddSearch();
}

function insertCustomize(){
	//alert('Customize!');
	GM_log("Customize!");
	var contents=document.getElementById("wrapper");
	gmCustomize=document.createElement('fieldset');
	gmCustomize.id="gmCustomize";
	var legend=document.createElement('legend'); legend.innerHTML="Custom Tabs";
	gmCustomize.appendChild(legend);
	
	var innerContainer = document.createElement("div");
 	innerContainer.className = "innerContainer";
  	innerContainer.innerHTML += 
    	'<p>Delete an items label or location to remove it.</p>';
	gmCustomize.appendChild(innerContainer);
	
	var tabList
	tabList = document.createElement("table");
  	tabList.className = "tabList";
	tabList.id = "tabList";
  	innerContainer.appendChild(tabList);
  
  	var headerRow = document.createElement("tr");
  	tabList.appendChild(headerRow);
  	headerRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Label"));
  	headerRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Location"));
	
	for (var i=0; i < cTabs.length; i++) {
		var tab=cTabs[i];
  		tabList.appendChild(getEditItem(tab,i));
		
		if (i!=cTabs.length-1){
			var dividerRow = document.createElement("tr");
			var dividerCell = dividerRow.appendChild(document.createElement("td"));
			dividerCell.className = "divider";
			dividerCell.colSpan = 3;
			tabList.appendChild(dividerRow);
		}
	}
	
	var newRow = document.createElement("tr");
	var newCell = newRow.appendChild(document.createElement("td"));
	newCell.colSpan = 3;
	newCell.appendChild(document.createTextNode("Create a new tab:"));
	
	tabList.appendChild(newRow);
	tabList.appendChild(getEditItem(new CustomTab("","",-1)));
  	
	var buttonContainer = document.createElement("div");
	buttonContainer.className = "buttonContainer";
	var saveButton = document.createElement("button");
	saveButton.appendChild(document.createTextNode("Save Changes"));
	saveButton.className = "saveButton";
	saveButton.addEventListener("click", saveEditCustomTabs, false);
	buttonContainer.appendChild(saveButton);
	
	var cancelButton = document.createElement("button");
	cancelButton.appendChild(document.createTextNode("Cancel"));
	cancelButton.className = "cancelButton";
	cancelButton.addEventListener("click", cancelEditCustomTabs, false);
	buttonContainer.appendChild(cancelButton);
	
	innerContainer.appendChild(buttonContainer);
  
	contents.appendChild(gmCustomize);
	
	//GM_log(contents.innerHTML);
}

function cancelEditCustomTabs(){
	//loadTabs();
	refreshEditCustomTabs();
}

function refreshEditCustomTabs(){
	var contents=document.getElementById("wrapper");
	var gm=document.getElementById("gmCustomize");
	contents.removeChild(gm);
	insertCustomize();
}

function saveEditCustomTabs(){
	cTabs=new Array();
	var tabList=document.getElementById("tabList");
	for (var row = tabList.firstChild; row; row = row.nextSibling) {
		var cells = row.getElementsByTagName("td");
		if (cells.length != 2 && cells.length != 3) {
		  continue;
		}
		var label = cells[0].getElementsByTagName("input")[0].value;
		var query = cells[1].getElementsByTagName("input")[0].value;
	
		if (label && query) {
			cTabs.push(new CustomTab(label, query));
		}
	}
	saveTabs();
	
	refreshEditCustomTabs();
	
	//refreshTabs();
	
}

function insertAddSearch(){
	var saveSearch=document.createElement('a');
	//<a href="javascript:;" onclick="toggleDisclosureWidget('advanced-search-options');"class="advanced-search">Advanced Options</a>
	saveSearch.href="javascript:;";
	saveSearch.className="saveSearch";
	saveSearch.innerHTML="Save Search";
	saveSearch.addEventListener("click", saveSearchToTab, false);
	var search=document.getElementById("advanced-search-options");
	search.appendChild(saveSearch);
	/*
	var asToggle;
	var thisForm=document.getElementById("thisform");
	var node1=thisForm.childNodes[5];
	var node2=node1.childNodes[0];
	var asToggle=node2.childNodes[1];
	node2.insertBefore(saveSearch,asToggle);
	*/
}

function saveSearchToTab(){
	//alert("Save search to tab");
	var loc=document.location;
	var label;
	var fullSearch=document.location.search.substring(1);//It starts with a ? and we dont want that...
	//area=promoted&age=all&sort=new&s=iPod&submit=Search
	var splitSearch=fullSearch.split('&');
	for (var i in splitSearch){
		//GM_log('a: '+splitSearch[i]);
		var search=splitSearch[i].split('=');
		if (search[0]=='s'){
			label=decodeURIComponent(search[1]).replace('+'," ");
			break;
		}
	}
	
	if (label==null) label="Im null!";
	cTabs.push(new CustomTab(label, loc));
	
	saveTabs();
	//refreshTabs();
}

function saveTabs(){
  var serializedTabs = new Array();
  
  for (var i=0; i < cTabs.length; i++) {
    serializedTabs.push(cTabs[i].toString());
  }
  
  setCookie(TABS_COOKIE, serializedTabs.join("|"));
}

function CustomTab(label, location) {  
  this.label = label;
  this.location = location;
}

CustomTab.prototype.toString = function() {
  return "&label="+this.label+"&location="+encodeURIComponent(this.location);
}

function getTabfromString(serialized) {
	var loc=serialized.indexOf("&location=");
	var label=serialized.substring(7,loc);
	var location=decodeURIComponent(serialized.substring(loc+10));

	return new CustomTab(label, location);
}
//CustomTab.prototype.getEditItem = function(pos) {
function getEditItem(tab,pos) {
	var editItem;
    editItem = document.createElement("tr");
    editItem.className = "editItem";

    var labelCell = document.createElement("td");
    labelCell.className = "labelCell";
    var labelInput = document.createElement("input");
    labelInput.value = tab.label;
    labelCell.appendChild(labelInput);
    editItem.appendChild(labelCell);
    
    var editCell = document.createElement("td");
    editCell.className = "editCell";
    var queryInput = document.createElement("input");
    queryInput.value = tab.location;
	editCell.appendChild(queryInput);
	if (tab.label!="" && tab.location!=""){
		var redx = document.createElement("img");
		redx.src=RED_X;
		redx.className="redx";
		redx.name=pos;
		redx.addEventListener("click", removeTab, false);

		editCell.appendChild(redx);
	}
    editItem.appendChild(editCell);    
	
	return editItem;
}

function removeTab(event){
	var pos=event.target.name;
	//GM_log("Pos: "+pos);
	//GM_log('remove tab');
	if (pos!=-1){
		cTabs.splice(pos,1);
		
		refreshEditCustomTabs();
	}
}
function getSearchField(){
	var searchField=document.createElement("tr");
	
	searchField.innerHTML=
		'<td>'+
		'<span class="search">'+
			'<input type="text" name="s" id="search" value="" size="30" />'+
			'<input type="submit" name="submit" value="Search" />'+
		
			'<select name="area">'+
				'<option value="all" selected="selected">All Stories</option>'+
				'<option value="promoted">Front Page Stories</option>'+
				'<option value="dig">Upcoming Stories</option>'+
			'</select>'+
		
			'<select name="age">'+
				'<option value="7" selected="selected">Last 7 days</option>'+
				'<option value="30">Last 30 days</option>'+
				'<option value="365">Last 365 days</option>'+
				'<option value="all">From All Time</option>'+
			'</select>'+
		
			'<select name="sort">'+
				'<option value="new" selected="selected">Newest First</option>'+
				'<option value="old">Oldest First</option>'+
				'<option value="most">Most Diggs</option>'+
			'</select>'+
		
			'<input type="checkbox" name="search-buried" id="search-buried" style="vertical-align: middle;" value="1"/>'+
			'<label for="search-buried" style="font-weight: normal;">Include Buried Stories</label>'+
		 '</span>'+
		'</td>';
	
	//var cell=document.createElement('td');
	//cell["colspan"]=2;
	//cell.innerHTML=
	//searchField.appendChild(cell);
	
	return searchField;
}

function setCookie(name, value) {
  	GM_setValue(name, value);
}

function getCookie(name){
	return GM_getValue(name);
}
