// ==UserScript==
// @name        Hulu Queue Show Display Toggle
// @namespace   https://userscripts.org/scripts/show/154849
// @description Adds buttons to Hulu's Queue to enable expanding/collapsing all shows
// @include     http://www.hulu.com/profile/queue*
// @include		http://www.hulu.com/account/queue*
// @exclude	    http://www.hulu.com/profile/queue?view=list
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.2
// ==/UserScript==

 //console.log("test");
 //Function to toggle all items
 var toggle = function (collapse){

 	return function () {
		//console.log("activated");
		var showsToClick = document.querySelectorAll("#queue > div." + (collapse ? "open" : "closed") + " a.show-name");
		//console.log(showsToClick.length + " items");
		for(var i=0; i < showsToClick.length; i++){
			showsToClick[i].onclick();
		}
	};
};

 //Function to toggle autoCollapse setting according to checkbox state
 var toggleAutoCollapseSetting = function (){
	var checked = document.getElementById("AutoCollapseSetting").checked;
 	GM_setValue("autoCollapse", checked);
	if(checked){
		 document.getElementById("AutoExpandSetting").checked = false;
		 toggleAutoExpandSetting();
	}
	//console.log("autoCollapseSetting Updated");
 };
 
//Function to toggle autoCollapse setting according to checkbox state
 var toggleAutoExpandSetting = function (){
	var checked = document.getElementById("AutoExpandSetting").checked;
 	GM_setValue("autoExpand", checked);
	if(checked){
		document.getElementById("AutoCollapseSetting").checked = false;
		toggleAutoCollapseSetting();
	}
	//console.log("autoExpandSetting Updated");

 };
  
 //Get DOM elements of places to put collapse/expand functions
 var placesToAppend = document.querySelectorAll("div.queue-actions");
 
 //perform autoCollapse if set
 if(GM_getValue( "autoCollapse", false)){
 	toggle(true)();
 	//console.log("autocollapse run.");
 } 
 
 if(GM_getValue( "autoExpand", false)){
 	toggle(false)();
 	//console.log("autoExpand run.");
 } 

 
 //Add collapse/expand buttons
 for(var i=0; i < placesToAppend.length; i++){
	var expandAllButton = document.createElement("a");
	expandAllButton.innerHTML = "Expand All";
	expandAllButton.style.cursor = "pointer";
	expandAllButton.style.margin = "0 4px";
	expandAllButton.addEventListener("click", toggle(false));
//	console.log("Made expand button " + (i+1));
	
	var collapseAllButton = document.createElement("a");
	collapseAllButton.innerHTML = "Collapse All";
	collapseAllButton.addEventListener("click", toggle(true));
	collapseAllButton.style.cursor = "pointer";
	collapseAllButton.style.margin = "0 4px";

//	console.log("Made collapse button " + (i+1));

	
	placesToAppend[i].appendChild(expandAllButton);
	placesToAppend[i].appendChild(collapseAllButton);
 }
 
 //Add autoCollapse setting checkbox
 var autoCollapseCheckbox = document.createElement("input");
 autoCollapseCheckbox.id = "AutoCollapseSetting";
 autoCollapseCheckbox.type = "checkbox";
 autoCollapseCheckbox.checked = GM_getValue( "autoCollapse", false);
 autoCollapseCheckbox.addEventListener("change", toggleAutoCollapseSetting);
 
 var autoCollapseLabel = document.createElement("label");
 autoCollapseLabel.style.margin = "0 10px";

 autoCollapseLabel.appendChild(autoCollapseCheckbox);
 autoCollapseLabel.appendChild(document.createTextNode("  AutoCollapse"));
 
 placesToAppend[0].appendChild(autoCollapseLabel);
 //console.log("Collapse label added.");





  //Add autoExpand setting checkbox
 
 var autoExpandCheckbox = document.createElement("input");
 autoExpandCheckbox.id = "AutoExpandSetting";
 autoExpandCheckbox.type = "checkbox";
 autoExpandCheckbox.checked = GM_getValue( "autoExpand", false);
 autoExpandCheckbox.addEventListener("change", toggleAutoExpandSetting);
 
 var autoExpandLabel = document.createElement("label");
 autoExpandLabel.style.margin = "0 10px";

 autoExpandLabel.appendChild(autoExpandCheckbox);
 autoExpandLabel.appendChild(document.createTextNode("  AutoExpand"));


 placesToAppend[0].appendChild(autoExpandLabel);
 //console.log("Expand label added.");
