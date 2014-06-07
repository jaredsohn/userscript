// ==UserScript==
// @name        RFD Forums - exclude selected forums from New Posts search
// @author      RenegadeX  
// @namespace   http://userscripts.org/users/238624
// @description Modifies the RedFlagDeals.com forums 'New Posts' button by excluding selected forums (hidden forums are chosen via a GM 'User Script Commands' submenu)
// @grant       GM_registerMenuCommand
// @grant       GM_getValue
// @grant       GM_setValue
// @grant		GM_addStyle
// @include     http://forums.redflagdeals.com/*
// @version.....1.0
// ==/UserScript==

// Read forums dropdown and build array w forum name and ID in format: forums[[23,2]];
var allforums = document.evaluate("//form[@action='/forumdisplay.php']/select/optgroup[@label='Forums']/option", document, null, 7, null);
var forums = [[,],[,]]; // make 2-dimensional array


for (f=0;f<allforums.snapshotLength;f++){
    forums[[f,1]] = allforums.snapshotItem(f).text;  // forum name
    forums[[f,2]] = allforums.snapshotItem(f).value; // forum ID
}

function RFDshowOptions() // create Options pane
{
	// Don't do if no forums list can be loaded; instead show error alert, then exit
	if (allforums.snapshotLength == 0) {
		alert("Sorry, in order for this script to load the current RFD forums list, you need to be on a RFD forums page that contains a forums drop-down list. This page doesn't have one - find a page that has one and try again!");
		return; // exit function
		}
	
	var div1=document.getElementById("RFD_modalDiv");
	if (div1==null)
	{
		GM_addStyle("#RFD_modalDiv{position:fixed; top:0px; left:0px; z-index:200; width:100%; height:100%; background-color:black; opacity:0.75;}");
		GM_addStyle(".RFD_hidden{display:none; visibility:hidden;}");

		div1=document.createElement("DIV");
		div1.id="RFD_modalDiv";
		div1.className="RFD_hidden";
		div1.title="Click to cancel and close";
		document.body.appendChild(div1);
		
		div1.addEventListener("click",hideOptions,false);
	}
	var div2=document.getElementById("RFD_optionsDiv");
	if (div2==null)
	{
		GM_addStyle(".RFD_optionsTable{vertical-align:middle !important;border-spacing: 2px !important; border: 1px solid #000 !important; border-collapse: collapse !important;padding-left:10px !important;margin-bottom:3px !important;color:#000 !important;}");
		GM_addStyle("#RFD_optionsDiv{overflow:auto;position:fixed !important; top:3%; left:20%; z-index:210; width:50%; height:70%; background-color:white !important; border:solid 3px #0033CC !important;}");
		
		div2=document.createElement("DIV");
		div2.id="RFD_optionsDiv";
		div2.className="RFD_hidden";
		div2.setAttribute("style","text-align:justify !important;padding:10px !important;font-family:verdana,arial !important;font-size:8pt !important;");
		
		var text1="";
		text1+="<center><font size=\"+1\">RFD New Post Forum Hider Options</font></center>";
		text1+="<form id=\"RFD-NPFHO\" name=\"titleform\"><ul>";
		
		// populate form w items & radio buttons for Enable/Disable
		text1+="<table border=\"0\" width=\"100%\" id=\"table1\">";
		
		for (b=0;b<allforums.snapshotLength;b++) {
			text1+="<tr><td width=\"80%\">"+forums[[b,1]]+": </td>";
			text1+="<td><align=\"right\"><input type=\"radio\" id="+forums[[b,2]]+"hidden"+" name=\"f"+forums[[b,2]]+"\" value=\"0\"><label for=\""+forums[[b,2]]+"hidden\"> Hide</label>  <input type=\"radio\" id="+forums[[b,2]]+"show"+" name=\"f"+forums[[b,2]]+"\" value=\"1\" checked=\"checked\"><label for=\""+forums[[b,2]]+"show\"> Show</label></td></tr>";
		}
		text1+="</ul><center><input type=\"button\" value=\"Ok\" id=\"okButton\" /><input type=\"button\" value=\"Cancel\" id=\"cancelButton\"/><input type=\"reset\" value=\"Reset to Defaults\" style=\"float: right\"></center></form>";
		div2.innerHTML=text1;
		
		document.body.appendChild(div2);
		
		document.getElementById("okButton").addEventListener("click",function(){saveOptions();hideOptions();updateNewPostsLink();},false);
		document.getElementById("cancelButton").addEventListener("click",function(){hideOptions();},false);
	}
	document.getElementById("RFD_optionsDiv").className="";
	document.getElementById("RFD_modalDiv").className="";
	setOptions();
	checkNew2(v);
	div1.className="";
	div2.className="";
}

function setOptions() // Set default Option values
{	
	for (b=0;b<allforums.snapshotLength;b++) {
		document.getElementById(''+[forums[[b,2]]+"show"]+'').checked = true;
	}
	
	// Read previously-set stored values
	var excludeFromNPS = GM_getValue('excludeFromNPS', excludeFromNPS);
	var fNums = excludeFromNPS.split(",");
	for (r=0;r<fNums.length;r++) {
		document.getElementById(''+fNums[r]+"hidden"+'').checked = true;
	}
}

function saveOptions() // push checked 'hide' buttons into array, join in string, and save it
{
	var f2exclude = [];
	for (b=0;b<allforums.snapshotLength;b++) {
		if (document.getElementById(''+[forums[[b,2]]+"hidden"]+'').checked) {
			f2exclude.push([forums[[b,2]]]);
		}
	}
	var excludeFromNPS = f2exclude.join();
	GM_setValue('excludeFromNPS', excludeFromNPS);
}

function hideOptions()
{
	document.body.removeChild(document.getElementById("RFD_optionsDiv"));
	document.body.removeChild(document.getElementById("RFD_modalDiv"));
}
// create GM User Script Command menu option
GM_registerMenuCommand('RFD Hide Forums in New Posts options', RFDshowOptions);

var RFDhideForums = GM_getValue("RFDhideForums", true); RFDhideForums == true ? RFDhideForumsToggle = "On" : RFDhideForumsToggle = "Off"; GM_registerMenuCommand("Toggle RFDhideForums (" + RFDhideForumsToggle + ")", toggleRFDhideForums); function toggleRFDhideForums() { RFDhideForums == true ? RFDhideForums = false : RFDhideForums = true; GM_setValue("RFDhideForums", RFDhideForums);}

function updateNewPostsLink() // modify the 'New Posts' link w user set forum exclusion preferences
{
	var newPostsLink = document.evaluate("//ul[@id='navbar' and @class='navbar']/li/a[(text()='New Posts')]", document,null, 9, null).singleNodeValue;
	var excludeFromNPS = GM_getValue('excludeFromNPS', excludeFromNPS);
	
	if (excludeFromNPS.length > 0) {
		// strip '&exclude=' and data if already exist, then update page
		var sLink = newPostsLink.href.split(/&exclude=([0-9].*|,).*/m);
		newPostsLink.href =sLink[0] + "&exclude=" + excludeFromNPS;
	} else {
		// 0 exclusion so strip '&exclude=' if exists
		var sLink = newPostsLink.href.split(/&exclude=([0-9].*|,).*/m);
		newPostsLink.href =sLink[0];
	}
}

// Update the Link on page load
updateNewPostsLink();