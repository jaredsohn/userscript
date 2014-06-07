// ==UserScript==	EVO Alliance Member enhancements
// @name                Evo Easy-Alliance Management
// @version		0.6
// @description		Message,buddylist or scan multiple people in evolution
// @include		http://ev5.neondragon.net/*
// @author		podd
// @author		pinky [Slight modifications / bug fixes]
// ==/UserScript==

GM_log("start");

var pageHandlers = new Array();
regPageHandler(/^\/alliances\/(.*)\/members/i, masspm);
regPageHandler(/^\/scans/i, massscan);


// Generic functions
function getcoords(userstring) {
var startindex = userstring.indexOf("(");
var endindex = userstring.indexOf(")");
return userstring.substring(startindex,endindex+1);
}

function buildgenericurl(form) {
var workingform = document.getElementById( form );
var baseurl = '';
	for( e = 0; e < workingform.elements.length; e++ ) {
	if (e != 0) { baseurl += "&"; }
	baseurl += workingform.elements[e].name + "=" + escape(workingform.elements[e].value.replace('\n','<P>'));
	}
return baseurl;
}
//massscan

function massscan(){

var scantype= GM_getValue("goscan");
//alert (scantype);
if (!(scantype) || (scantype == "no")) {
return;
} else {

var p = 0;


if (scantype == "sector") {p=1;}

var scan_idnodes = document.evaluate('id("content")/form//select',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
scan_idnode = scan_idnodes.snapshotItem(0);
scan_idnode.selectedIndex = p;
scan_idnode.value=scan_idnode.selectedIndex.value;

var scan2_idnodes = document.evaluate('id("content")/form//input[@name="launch_scan"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
scan2_idnode = scan2_idnodes.snapshotItem(0);
scan2_idnode.type = "hidden";
scan2_idnode.value="Launch";

submitformnode = document.evaluate('id("content")/form',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
submitform = submitformnode.snapshotItem(0);
submitform.submit();

GM_setValue("goscan","no");
}

}
// mass pm
function masspm() {

unsafeWindow.clearbuttons = function() {
document.getElementById('submitform').elements[0].type = "hidden";
document.getElementById('submitform').elements[1].type = "hidden";
document.getElementById('submitform').elements[2].type = "hidden";
document.getElementById('submitform').elements[3].type = "hidden";
document.getElementById('confirmation').innerHTML = '';
}

unsafeWindow.showsubmit = function() {
document.getElementById('submitform').elements[0].type = "submit";
document.getElementById('submitform').elements[1].type = "submit";
document.getElementById('submitform').elements[2].type = "submit";
document.getElementById('submitform').elements[3].type = "submit";
}

// scans
unsafeWindow.clearscan = function (url,map) {
GM_setValue("goscan","no");
}

unsafeWindow.sendscan = function (url,map,scantype) {
	if (scantype == "0") {
	GM_setValue("goscan","sector");
	} else {
	GM_setValue("goscan","creature");
	}
GM_openInTab("http://ev5.neondragon.net/scans" + url);
}


unsafeWindow.sendscanpm = function(scantype) {
	unsafeWindow.clearbuttons();
	
	// build selected users array
	const selectedArray = new Array();
	const selectedArraymap = new Array();
	
	var selObj = document.getElementById('alliancelist').elements[0];
	var i;
	var count = 0;
	for (i=0; i<selObj.options.length; i++) {
		if (selObj.options[i].selected) {
		selectedArray[count] = unsafeWindow.coordarray[i];
		selectedArraymap[count] = i;
		count++;
		}
	}
	if (count == 0) {alert("Select someone to scan"); showsubmit(); return false;}
	else {
	
	j = 0;
	while (selectedArray[j]) {
	
	var cleancoords = '';
	cleancoords = selectedArray[j].replace(")","");
	cleancoords = cleancoords.replace("(","");
	
	var coordx = cleancoords.substring(0,cleancoords.indexOf(","));
	cleancoords = cleancoords.replace(coordx + ",","");
	
	var coordy = cleancoords.substring(0,cleancoords.indexOf(","));
	cleancoords = cleancoords.replace(coordy + ",","");
	
	var coordz = cleancoords.substring(0,cleancoords.indexOf(":"));
	cleancoords = cleancoords.replace(coordz + ":","");
	
	var coordc = cleancoords;
	
	url = "?";

	url += "&x=" + coordx + "&y=" + coordy + "&z=" + coordz + "&c=" + coordc;
	GM_log(url);
	setTimeout('sendscan("' + url + '",' + selectedArraymap[j] + ',' + scantype + ')', (9732 * j));
	j++;
	}
	setTimeout('clearscan()', (9732 * j + 1000));
	setTimeout('showsubmit()', (9732 * j + 1000));
	}
  
}

// masspm
unsafeWindow.sendpm = function (url,map) {

	GM_xmlhttpRequest({

	method: 'POST',
	url: 'http://ev5.neondragon.net/send_message',
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: url,
	onload:  function(responseDetails) {
		GM_log('Success');
		GM_log(responseDetails.responseText);
		var confirm = document.getElementById('confirmation');
			if (confirm) {
			var oldhtml = confirm.innerHTML;
			oldhtml += '<P style="margin: 0px 100px 10px 100px;">Message sent to:' + unsafeWindow.memberarray[map] +'</P>';
			confirm.innerHTML = oldhtml;
			}
		},
	onerror: function(responseDetails) {
		GM_log('Failure');
		GM_log(responseDetails.responseHeaders);
		GM_log(responseDetails.responseText);
		var confirm = document.getElementById('confirmation');
			if (confirm) {
			var oldhtml = confirm.innerHTML;
			oldhtml += '<P>FAILED:' + unsafeWindow.memberarray[map];
			confirm.innerHTML = oldhtml;
			}
		}
	});

}

unsafeWindow.sendmasspm = function() {

unsafeWindow.clearbuttons();

	var baseurl = buildgenericurl("messageform");
	baseurl = "&totype=coords&" + baseurl.replace(" ","+");


// build selected users array
  const selectedArray = new Array();
  const selectedArraymap = new Array();

  var selObj = document.getElementById('alliancelist').elements[0];
  var i;
  var count = 0;
  for (i=0; i<selObj.options.length; i++) {
    if (selObj.options[i].selected) {
      selectedArray[count] = unsafeWindow.coordarray[i];
      selectedArraymap[count] = i;
      count++;
    }
  }
if (count == 0) {alert("Select someone to pm"); showsubmit(); return false;}
else {

j = 0;
while (selectedArray[j]) {

var cleancoords = '';
cleancoords = selectedArray[j].replace(")","");
cleancoords = cleancoords.replace("(","");

var coordx = cleancoords.substring(0,cleancoords.indexOf(","));
cleancoords = cleancoords.replace(coordx + ",","");

var coordy = cleancoords.substring(0,cleancoords.indexOf(","));
cleancoords = cleancoords.replace(coordy + ",","");

var coordz = cleancoords.substring(0,cleancoords.indexOf(":"));
cleancoords = cleancoords.replace(coordz + ":","");

var coordc = cleancoords;

url = "x=" + coordx + "&y=" + coordy + "&z=" + coordz + "&c=" + coordc + baseurl;
GM_log(url);
setTimeout('sendpm("' + url + '",' + selectedArraymap[j]  + ')', (1000 * j));
j++;
}
setTimeout('showsubmit()', (1000 * j + 1000));


}

}

// addbuddy
unsafeWindow.addbuddy = function (url,map) {

	GM_xmlhttpRequest({

	method: 'POST',
	url: 'http://ev5.neondragon.net/buddies/add',
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: url,
	onload:  function(responseDetails) {
		GM_log('Success');
		GM_log(responseDetails.responseText);
		var confirm = document.getElementById('confirmation');
			if (confirm) {
			var oldhtml = confirm.innerHTML;
			oldhtml += '<P style="margin: 0px 100px 10px 100px;">Added to buddy list:' + unsafeWindow.memberarray[map] +'</P>';
			confirm.innerHTML = oldhtml;
			}
		},
	onerror: function(responseDetails) {
		GM_log('Failure');
		GM_log(responseDetails.responseHeaders);
		GM_log(responseDetails.responseText);
		var confirm = document.getElementById('confirmation');
			if (confirm) {
			var oldhtml = confirm.innerHTML;
			oldhtml += '<P>FAILED:' + unsafeWindow.memberarray[map];
			confirm.innerHTML = oldhtml;
			}
		}
	});

}

unsafeWindow.sendaddbuddy = function() {

unsafeWindow.clearbuttons();


// build selected users array
  const selectedArray = new Array();
  const selectedUser = new Array();
  const selectedArraymap = new Array();

  var selObj = document.getElementById('alliancelist').elements[0];
  var i;
  var count = 0;
  for (i=0; i<selObj.options.length; i++) {
    if (selObj.options[i].selected) {
      selectedArray[count] = unsafeWindow.coordarray[i];
	selectedUser[count] = unsafeWindow.memberarray[i];
      selectedArraymap[count] = i;
      count++;
    }
  }
if (count == 0) {alert("Select someone to pm"); showsubmit(); return false;}
else {

j = 0;
while (selectedArray[j]) {

	var cleancoords = '';
cleancoords = selectedArray[j].replace(")","");
cleancoords = cleancoords.replace("(","");

var coordx = cleancoords.substring(0,cleancoords.indexOf(","));
cleancoords = cleancoords.replace(coordx + ",","");

var coordy = cleancoords.substring(0,cleancoords.indexOf(","));
cleancoords = cleancoords.replace(coordy + ",","");

var coordz = cleancoords.substring(0,cleancoords.indexOf(":"));
cleancoords = cleancoords.replace(coordz + ":","");

var coordc = cleancoords;

var nickname = selectedUser[j].substring(selectedUser[j].indexOf("]"))
if (selectedUser[j].indexOf("]") == 0){ nickname = nickname.substring(2) }
var nick = nickname.split(" of")[0].replace(/]/g,"");

var tagMethod = GM_getValue('buddyTag','G');

if (tagMethod == 'G'){
	var alliance = prompt('Add these users to which buddy group?');
}else if (tagMethod == 'P'){
	var alliance = (selectedUser[j].match(/\[(.*)\]/) != null) ? selectedUser[j].match(/\[(.*)\]/)[1]: 'Unallied';
}else{
	var alliance = unescape( window.location.href.match(/\/alliances\/(.*)\/members$/)[1] ); // get the alliance's tag
}


url = "x=" + coordx + "&y=" + coordy + "&z=" + coordz + "&c=" + coordc + "&nickname=" + nick + "&label="+alliance+"&othertext=";
GM_log(url);
setTimeout('addbuddy("' + url + '",' + selectedArraymap[j]  + ')', 1);
j++;
}
setTimeout('showsubmit()', (1 * j + 1000));


}
 
}

// Add menu item
GM_registerMenuCommand("Edit Buddy Adding", (function () { var buddyTag = prompt('Do you want to type in a group [G], use the current alliance page tag [A] or use the person\'s primary tag [P] ?'); GM_setValue('buddyTag', buddyTag); alert("Please reload the page for the changes to take effect."); }), '', '', 't');



unsafeWindow.memberarray = new Array();
unsafeWindow.coordarray = new Array();

pmnodes = document.evaluate("//table[@class='membertable']//a[@onclick[starts-with(.,'javascript:return continentBox(')]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

var numberofmembers = pmnodes.snapshotLength;

		for( i = 0; i < numberofmembers; i++ ) {
		pmnode = pmnodes.snapshotItem(i).textContent;
		unsafeWindow.coordarray[i] = getcoords(pmnode);
		unsafeWindow.memberarray[i] = pmnode.replace(unsafeWindow.coordarray[i],"");
	}


var formhtml = '<table style="text-align:center;width:90%;"><tr><td><form name="alliancelist" id="alliancelist" action="" onsubmit="return false;" method="post" style="text-align:right;"><select name="allianceselect[]" multiple size="' + numberofmembers + '">';

	for( x = 0; optionuser = unsafeWindow.memberarray[x]; x++ ) {
	formhtml += '<option>' + unsafeWindow.coordarray[x] + ' ' + optionuser + '</option>';
}

formhtml +='</select></form></td><td style="padding:10px;"><form name="messageform" id="messageform" action="" onsubmit="return false;" method="post"><input type="text" size="50" style="width:100%;"name="msgsubject" value="" /><BR><textarea rows="12" cols="40" style="width: 100%;"name="message" id="messagebox"></textarea></form><form name="submitform" id="submitform" onsubmit="return false;"><input type="submit" onclick="sendmasspm();" value="Send Message" /><input type="submit" onclick="sendscanpm(0);" value="Sector Scan" /><input type="submit" onclick="sendscanpm(1);" value="Creature Scan" /><input type="submit" onclick="sendaddbuddy();" value="Add Buddy" /></form></td></tr></table><div id="confirmation" name="confirmation"></div>';

masspmformdiv = document.createElement("div");
masspmformdiv.innerHTML = formhtml;
masspmformdiv.id = 'masspmformdiv';

var placeholder = document.evaluate('id("alliancememberlist")/h3[1]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (placeholder.snapshotItem(0) == null){
	var placeholder = document.evaluate('id("alliancememberlist")/form/h3[1]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
thenode = placeholder.snapshotItem(0);
thenode.parentNode.insertBefore(masspmformdiv, thenode);

}

//
// ***************************************************************************
// ** MAIN
// ***************************************************************************
//
(function () {

	// Dispatch
	// -----------------------------------------------------------------------
	for(var i = 0; i < pageHandlers.length; i++ ) {
		if( pageHandlers[i].urlRegEx == null || pageHandlers[i].urlRegEx.test(document.location.pathname) )
			pageHandlers[i].handler();
	}

}) ();

// ***************************************************************************
// ** Objects
// ***************************************************************************

//
// Page Handler hooks
function pageHandler(urlRegEx, handler) {
	this.urlRegEx = urlRegEx;
	this.handler = handler;
}
function regPageHandler(urlRegEx, handler) {
	pageHandlers.push(new pageHandler(urlRegEx,  handler));
}

GM_log("end");

