// ==UserScript==
// @name           Ikariam Quickbar
// @version        1.0
// @namespace      http://ikariamwikibar.googlepages.com/home
// @description    Adds a tab to the left side of the game window that holds "Quickmarks" for you. When you find a page that you'd like to save, expand the tab and click "Quickmark current page" to name and save it. Later, you can open the tab and click one of your quick quickmarks to visit it! Mouse over the tab to expand it and click again (or mouseout) to close it.
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==
// ===========================================================================
// This script was made by EnigmaBrand.

unsafeWindow.places = GM_getValue("places","0");
var version="1.6";
var opened=0;

// Create my div and append it to the body tag
vquickbar = document.createElement("div");
vquickbar.setAttribute("id", "quickbar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vquickbar);

// this function shows the tab when you mouseover it
unsafeWindow.showquick = function() {
	if(document.getElementById("quickbar").style.left == "-412px")
	{
		document.getElementById("quickbar").style.left = "0px;"
		unsafeWindow.qbbuildinterior();
	}
	if(opened==0)
	{
	unsafeWindow.qbbuildinterior();
	opened=1;
	}
}

// this function closes the tab
unsafeWindow.hidequick = function() {
	document.getElementById("quickbar").style.left = "-412px;"
}

// this function deletes a quickmark
unsafeWindow.qbdeleteentry = function(deleteme) {
	deleteme = deleteme.slice(0,-1);
	var splitplaces = unsafeWindow.places.split(/;/);
	for(i = 0; i < splitplaces.length-1; i++){
		if(splitplaces[i] == deleteme){
			splitplaces.splice(i,1);
			break;
		}
	}
	if(splitplaces.length-1 > 0){
		unsafeWindow.places = splitplaces.join(';');
	}
	else{
		unsafeWindow.places = "0";
	}
	window.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);
	unsafeWindow.qbbuildinterior();
}

// this function renames one of your quickmarks
unsafeWindow.qbrenameentry = function(renameme) {
	var renameto = prompt("Rename your Quickmark:","");
	if((renameto == '') || (renameto == '^') || (renameto == ';'))
	{
		alert("Invalid name! Cannot have ^ or ;!");
		return;
	}
	renameme = renameme.slice(0,-1);
	var splitplaces = unsafeWindow.places.split(/;/);
	var splitpiece = '';
	for(i = 0; i < splitplaces.length-1; i++){
		if(splitplaces[i] == renameme){
			splitpiece = splitplaces[i].split('|');
			splitplaces[i] = renameto + '|' + splitpiece[1];
			break;
		}
	}
	if(splitplaces.length-1 > 0){
		unsafeWindow.places = splitplaces.join(';');
	}
	window.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);
	unsafeWindow.qbbuildinterior();
}

// this function adds a new entry to your quickmark list
unsafeWindow.qbaddentry = function() {
	
	var addname = prompt("What would you like to name this location?","");
	if((addname.search(/\|/) != -1) || (addname.search(/;/) != -1))
	{
		alert('Invalid location name! No | or ;!');
		exit;
	}
	var addlocation = window.location;
	
	if(unsafeWindow.places != "0")
	{
	unsafeWindow.places += addname + '|' + addlocation + ';';
	}
	else
	{
	unsafeWindow.places = addname + '|' + addlocation + ';';
	}
	window.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);
	unsafeWindow.qbbuildinterior();
}

// this function exports your quickmarks so you can import them laters
unsafeWindow.qbexport = function() {
	if(unsafeWindow.places != "0"){
		prompt("Copy this! You can import it later!", unsafeWindow.places);
	}
	else {
		alert("You have no Quickmarks to export!");
	}
	unsafeWindow.qbbuildinterior();
}

// this function imports quickmarks that you paste into the prompt
unsafeWindow.qbimport = function() {
	var imported = prompt("Paste you Quickmark(s) here. Make sure they follow the correct format! (nameofquickmark|http://pagelocationgoeshere.com;)","");
	if(unsafeWindow.places == "0"){
	unsafeWindow.places = imported;
	}
	else {
	unsafeWindow.places += imported;
	}
	unsafeWindow.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);	
	unsafeWindow.qbbuildinterior();
}

// this function deletes all of your quickmarks
unsafeWindow.qbdeleteall = function() {
	if(confirm("Are you absolutely sure you want to delete all your quickmarks?"))
	{
		unsafeWindow.places = "0";
		window.setTimeout(GM_setValue, 0, "places", "0");		
	}
	unsafeWindow.qbbuildinterior();
}


// this function moves one of your quickmarks up 1 in the list
unsafeWindow.qbmovedown = function(moveitdown) {
	moveitdown = moveitdown.slice(0,-1);
	var splitplaces = unsafeWindow.places.split(/;/);
	for(i = 0; i < splitplaces.length-1; i++){
		if(splitplaces[i] == moveitdown){
			if(i<splitplaces.length-1)
			{
				splitplaces[i] = splitplaces[i+1];
				splitplaces[i+1] = moveitdown;
				break;
			}
			else
			{
				alert("This quickmark is already the last in the list.");
				break;
			}
		}
	}
	unsafeWindow.places = splitplaces.join(';');
	window.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);
	unsafeWindow.qbbuildinterior();
}


// this function moves one of your quickmarks up 1 in the list
unsafeWindow.qbmoveup = function(moveitup) {
	moveitup = moveitup.slice(0,-1);
	var splitplaces = unsafeWindow.places.split(/;/);
	var moveitdown = '';
	for(i = 0; i < splitplaces.length-1; i++){
		if(splitplaces[i] == moveitup){
			if(i<splitplaces.length-1)
			{
				splitplaces[i] = splitplaces[i-1];
				splitplaces[i-1] = moveitup;
				break;
			}
			else
			{
				alert("This quickmark is already the last in the list.");
				break;
			}
		}
	}
	unsafeWindow.places = splitplaces.join(';');
	window.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);
	unsafeWindow.qbbuildinterior();
}

// this function builds the innerHTML of the tab without a page reload
unsafeWindow.qbbuildinterior = function()
{
	var qbHTML = '<div id="quicktab" onmouseover="javascript:showquick()" onclick="javascript:hidequick()"></div>';
	qbHTML += '<div id="qhead"><a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://userscripts.org/users/55264/scripts">Ikiariam Quickbar v'+version+'</a></div>';
	qbHTML += '<div id="qplaces">';

	// Build the places list
	if(unsafeWindow.places != "0")
	{
		qbHTML += '<div style="border-bottom:1px #F3DDB5 solid; width:376px; margin-top:3px; height:315px; overflow-y:auto; overflow-x:hidden;"><table style="width:375px; border: none;">';
		var placepiece = '';
		var splitplaces = unsafeWindow.places.split(";");
		for(i = 0; i < splitplaces.length-1; i++){
			placepiece = splitplaces[i].split("|");
			qbHTML += '<tr>';
			qbHTML += '<td width="20%" align="right" valign="bottom">';
			if(i>0){
			qbHTML += '<a title="Move Quickmark Up" href="javascript:qbmoveup(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="http://www.imgboot.com/images/enigmabrand/moveup_1.png" border="0"></a>';
			}
			else {
			qbHTML += '<img src="http://www.imgboot.com/images/enigmabrand/movetrans.png" width="10" height="10" border="0">';
			}
			if(i<splitplaces.length-2){
			qbHTML += '<a title="Move Quickmark Down" href="javascript:qbmovedown(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="http://www.imgboot.com/images/enigmabrand/movedown_1.png" border="0"></a>';
			}
			else {
			qbHTML += '<img src="http://www.imgboot.com/images/enigmabrand/movetrans.png" height="10" width="10" border="0">';
			}
			qbHTML += '<a title="Delete Quickmark" href="javascript:qbdeleteentry(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="http://imgboot.com/images/enigmabrand/redx.png" border="0"></a>';
			qbHTML += ' <a title="Rename Quickmark" href="javascript:qbrenameentry(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="http://imgboot.com/images/enigmabrand/rename.png" border="0"></a> - </td>';
			qbHTML += '<td align="left" width="80%" valign="bottom">&nbsp;<a href="' + placepiece[1] + '">' + placepiece[0] + '</a></td>';
			qbHTML += '</tr>';
		}
		qbHTML += '</table></div>';
	}
	else
	{
	qbHTML += '<div style="border-bottom:1px #F3DDB5 solid; width:376px; height:315px; overflow-y:auto; overflow-x:hidden;"><table style="width:375px; border: none;"><tr><td align="center">No places saved</td></tr></table></div>';
	}

	qbHTML += '<a href="javascript:qbaddentry();">Quickmark current page</a><br>';
	qbHTML += '<a href="javascript:qbexport();" title="Export list"><img src="http://www.imgboot.com/images/enigmabrand/export.gif" border="0"></a>';
	qbHTML += ' <a href="javascript:qbimport();" title="Import list (Append)"><img src="http://www.imgboot.com/images/enigmabrand/import.gif" border="0"></a>';
	qbHTML += ' <a href="javascript:qbdeleteall();" title="Delete all Quickmarks"><img src="http://www.imgboot.com/images/enigmabrand/redx2_1.png" border="0"></a>';
	qbHTML += '</div>';
	qbHTML += '<div id="qfoot"></div>';
	document.getElementById("quickbar").innerHTML = qbHTML;
}

// Add the style
GM_addStyle("#quickbar { width:410px; position:fixed; left:-412px; height:400px; top:215px; z-index: 500; background:url(http://www.imgboot.com/images/enigmabrand/bgnotebarmid.gif); background-repeat:repeat-y; border:1px black solid;}");
GM_addStyle("#qhead { height:30px; width:410px; position:absolute; left:0px; top:0px; background:url(http://www.imgboot.com/images/enigmabrand/bgnotebartop.gif); line-height:38px; font-weight:bold; font-size:11px;} ");
GM_addStyle("#quickbar:hover { left:0px; }");
GM_addStyle("#qfoot { width:410px; height:3px; background:url(http://www.imgboot.com/images/enigmabrand/bgnotebarbot.gif); position:absolute; bottom:0px; left:0px;}");
GM_addStyle("#quicktab { z-index:496; background:url(http://www.imgboot.com/images/enigmabrand/tabquickbar.png); width:26px; height:100px; position:absolute; right:-26px; top:0px; } ");
GM_addStyle("#quicktab:hover { cursor: pointer; } ");
GM_addStyle("#qplaces { position:absolute; top:30px; bottom:3px; left:29px; overflow:auto; } ");

document.getElementById("quickbar").innerHTML = '<div id="quicktab" onmouseover="showquick()" onclick="hidequick()"></div>';

///// End of script /////