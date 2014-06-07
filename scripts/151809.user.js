// ==UserScript==
// @name           PardusMessaging for Arty
// @namespace      jirina42@seznam.cz
// @description    Adds some useful features to the standard IGM messaging in Pardus. Modified by Anthonya to fit the NPA.
// @version	   1.15
// @include        http://artemis.pardus.at/messages_private.php*
// @include        http://artemis.pardus.at/messages_alliance.php*
// @include        http://artemis.pardus.at/sendmsg.php*
// @include	   http://chat.pardus.at/chat.php*
// @include     http://www.phpbbserver.com/terranfederatio/groupcp.php?*
// ==/UserScript==
// ////////////////////////////////////////////////////////////////////////
// Imported -- Rhindon's Standard Cookie Code 
//          -- Stores GreaseMonkey Values instead of actual Cookies
// ////////////////////////////////////////////////////////////////////////
function createCookie(name,value) {
	
	GM_setValue(name,value);
	
}
function readCookie(name) {
	
	try {
		var temp = GM_getValue(name);
		if(temp != '~~~DELETED~~~') return temp;
		return null;
       	} catch(err) {
       		return null;
	}
}
function eraseCookie(name) {
	createCookie(name,"~~~DELETED~~~");
}
// ////////////////////////////////////////////////////////////////////////
// End imported code
// ////////////////////////////////////////////////////////////////////////
var scriptCode = "@#$>";
function mysendmsg() {
	// Search for the messages
	var cbs = document.getElementsByName("checkbox[]");
	var player = this.getAttribute("to");
	var subject = this.getAttribute("subj");
	var from = this.getAttribute("from");
	var last = this.getAttribute("last");
	var index = this.getAttribute("table");
	var private = this.getAttribute("private") == "true";
	var txt = "";
	
	var body = this.parentNode.parentNode.parentNode;
	var msgcelltop = body.getElementsByTagName("TR")[private?2:3];
	var msgcell = msgcelltop.getElementsByTagName("TD")[0];
	var subjcell = body.getElementsByTagName("TR")[private?1:2].getElementsByTagName("B")[0];
	var playercell = body.getElementsByTagName("TR")[0].getElementsByTagName("A")[0];
	var sentcell = playercell.parentNode.parentNode.nextSibling.nextSibling;
	
	txt = "\n\n---------------------------------------------------------------------\n";
	txt = txt + playercell.previousSibling.nodeValue + playercell.childNodes[0].nodeValue + "\n";
	txt = txt + subjcell.childNodes[0].nodeValue + "\n";
	txt = txt + "Sent: " + sentcell.childNodes[sentcell.childNodes.length-1].nodeValue + "\n\n";
	var skipbr = 0;
	for (var i=0; i<msgcell.childNodes.length; i++) {
		var element = msgcell.childNodes[i];
		if (element.nodeName == "BR") {
			if (skipbr == 0)
				txt = txt + "\n";
			else
				skipbr = 0;
		}
		else if (element.nodeName == "HR")
			break;
		else if (element.nodeName == "A")
			txt = txt + "[url="+element.getAttribute("href")+"]"+element.childNodes[0].nodeValue+"[/url]";
		else if (last == "yes" && element.nodeValue == "--------------------------------------------------------------------- ")
			break;
		else if (element.nodeValue.indexOf (scriptCode) >= 0) {
			skipbr = 1;
			continue;
		}
		else
			txt = txt + element.nodeValue;
		
		
	}
	
	
	createCookie ("NPA_Reply", txt)
	window.open("sendmsg.php?to="+player+"&subj="+subject,"_blank","width=640,height=434,left=0,top=0");
	
}
function processFlagScript (messageTable, scriptCode) {
	var param = scriptCode.split(":");
	var cb = messageTable.getElementsByTagName("input")[0];
	var cell = cb.parentNode;
	var newcell = document.createElement ("TD");
	var newrow = document.createElement ("TR");
	newrow.appendChild(newcell);
	
	var flag = document.createElement ("DIV");
	var bold = document.createElement("B");
	bold.appendChild(document.createTextNode (param[1]));
	flag.appendChild (bold);
	flag.setAttribute ("align", "right");
	flag.setAttribute ("style", "color:#59FF88");
	newcell.appendChild (flag);
	
	cell.parentNode.parentNode.appendChild (newrow);
	
	return 1;
}
function processPromotionScript (messageTable, scriptCode) {
	var param = scriptCode.split(":");
	var pilot = "NPA_Rank:" + param[1];
	var newtime = messageTable.getElementsByTagName("TBODY")[0].getElementsByTagName("TR")[0].getElementsByTagName("TD")[1].childNodes[0].nodeValue;
	var newrank = param[2] + " - promoted at " + newtime;
	
	var cookieval = readCookie(pilot);
	if(cookieval != null && cookieval != "")
	{	
		var oldrank = cookieval.split(" - promoted at ")[0];
		var oldtime = cookieval.split(" - promoted at ")[1];
		
		if(oldrank == newrank)
		{
			return 1;
		}
		else
		{
			var olddate = new Date(oldtime).getTime();
			var newdate = new Date(newtime).getTime();
			if(newdate < olddate)
			{
				return 1;
			}		
		}
	}
	
	GM_log (pilot);
	GM_log (newrank);
	
	createCookie (pilot,newrank);
	
	return 1;
}
function processCallsignScript (messageTable, scriptCode) {
	var param = scriptCode.split(":");
	var pilot = "NPA_Call:" + param[1];
	var newcall = "\""+param[2]+"\"";
	var cookieval = readCookie(pilot);
	if(cookieval != null && cookieval != "")
	{
		var oldcall = cookieval.split("\"")[0];
		if(oldcall == newcall)
		{
			return 1;
		}
		
	}
	
	GM_log (pilot);
	GM_log (newcall);
	
	createCookie (pilot,newcall);
	return 1;
}
function showRank () {
	var ifr = document.getElementsByTagName("iframe")[0];
	var idoc = ifr.contentDocument;
	var div = idoc.getElementsByTagName("DIV")[0];
	
	var divs = div.getElementsByTagName("DIV");
	for (var i=0; i<divs.length;i++) {
		try {
			var row = divs[i];
			var pilot = row.getElementsByTagName("SPAN")[1].childNodes[0];
			var pilotName = pilot.childNodes[0].childNodes[0].nodeValue;
			var cookieName = "NPA_Rank:" + pilotName;
			var cookie = readCookie (cookieName);
			var cookieName2 = "NPA_Call:" + pilotName;
			var cookie2 = readCookie (cookieName2);
			
			
			
			if (cookie != null && cookie2 != null) {
				var rank = cookie.split(" - promoted at ")[0];
				var time = cookie.split(" - promoted at ")[1];
				
				pilot.title = rank +" "+ cookie2 +" - promoted at " + time;
			}
			else if(cookie2 != null)
				pilot.title = cookie2 +" - unknown rank";
			else if(cookie != null)
				pilot.title = cookie;
			else
				pilot.title = "unknown rank";
		} catch (err) {
			continue;
		}
	}
}
function processScriptCode (messageTable, scriptCode) {
	var param = scriptCode.split(":",1)[0];
	if (param=="flag")
		return processFlagScript (messageTable, scriptCode);
	else if (param == "promotion") 
		return processPromotionScript (messageTable, scriptCode);
	else if (param == "callsign")
		return processCallsignScript (messageTable, scriptCode);
	
	return 1;
}
function processMessageScript (messageTable, private) {
	var msgCell = messageTable.getElementsByTagName("tr")[private?2:3].getElementsByTagName("td")[0];
	var skipBR = 0;
	var emptyElement = document.createTextNode("");
	
	for (var i=0; i<msgCell.childNodes.length; i++) {
		var element = msgCell.childNodes[i];
		if (element.nodeValue != null && element.nodeValue.substr (0,scriptCode.length) == scriptCode) {
			skipBR = 0;
			var processed = processScriptCode (messageTable, element.nodeValue.substr(4));
			if (processed) {
				//emptyElement = element.cloneNode (false);
				//emptyElement.nodeValue = "";
				element.parentNode.replaceChild (emptyElement.cloneNode(false), element); 
				skipBR = 1;
			}
		} else if (element.nodeName == "BR") {
			if (skipBR==1) {
				element.parentNode.replaceChild (emptyElement.cloneNode(false), element); 
				skipBR = 0;
			}
		}
	}
}
function addLinksToMessage (messageTable, private, index) {
	// Log
	//GM_log ("addLinksToMessage Start");	
	
	var body = messageTable.getElementsByTagName("TBODY")[0];
	body.setAttribute ("name", "npa_"+index);
	var newcell = document.createElement ("TD");
	var newrow = document.createElement ("TR");
	newrow.appendChild(newcell);
	
	var msgcelltop = body.getElementsByTagName("TR")[private?2:3];
	var msgcell = msgcelltop.getElementsByTagName("TD")[0];
	var subj = body.getElementsByTagName("TR")[private?1:2].getElementsByTagName("B")[0].childNodes[0].nodeValue;
	
	playercell = body.getElementsByTagName("TR")[0];
	if (playercell.getElementsByTagName("A").length == 0)
		return;
	var player = playercell.getElementsByTagName("A")[0].childNodes[0].nodeValue;	
	
	subj = subj.substr(9);
	
	var btn = document.createElement("input");
	//btn.id = cb.value;
	btn.type = "button";
	btn.value = "Reply";
	btn.addEventListener("click", mysendmsg, false);
	btn.setAttribute ("to", player);
	btn.setAttribute ("from", player);
	btn.setAttribute ("subj", subj);
	btn.setAttribute ("last", "no");
	btn.setAttribute ("table", "npa_"+index);
	btn.setAttribute ("private", private);
	newcell.appendChild(btn);
	newcell.appendChild (document.createTextNode(" "));
	
	var btn = document.createElement("input");
	//btn.id = cb.value;
	btn.type = "button";
	btn.value = "Reply (Last)";
	btn.addEventListener("click", mysendmsg, false);
	btn.setAttribute ("to", player);
	btn.setAttribute ("from", player);
	btn.setAttribute ("subj", subj);
	btn.setAttribute ("last", "yes");
	btn.setAttribute ("table", "npa_"+index);
	btn.setAttribute ("private", private);
	newcell.appendChild(btn);
	newcell.appendChild (document.createTextNode(" "));
	
	var btn = document.createElement("input");
	//btn.id = cb.value;
	btn.type = "button";
	btn.value = "Foward";
	btn.addEventListener("click", mysendmsg, false);
	btn.setAttribute ("to", "");
	btn.setAttribute ("from", player);
	btn.setAttribute ("subj", subj);
	btn.setAttribute ("last", "no");
	btn.setAttribute ("table", "npa_"+index);
	btn.setAttribute ("private", private);
	newcell.appendChild(btn);
	newcell.appendChild (document.createTextNode(" "));
	
	var btn = document.createElement("input");
	//btn.id = cb.value;
	btn.type = "button";
	btn.value = "Foward (Last)";
	btn.addEventListener("click", mysendmsg, false);
	btn.setAttribute ("to", "");
	btn.setAttribute ("from", player);
	btn.setAttribute ("subj", subj);
	btn.setAttribute ("last", "yes");
	btn.setAttribute ("table", "npa_"+index);
	btn.setAttribute ("private", private);
	newcell.appendChild(btn);
	newcell.appendChild (document.createTextNode(" "));
	
	body.appendChild (document.createTextNode(""));
	body.appendChild (newrow);
	
}
function addLinks() {
	// Log
	GM_log ("addLinks Start");	
	
	// Check that we're on the right page
	var text = document.URL;
	var private;
	if (text.indexOf("messages_private.php") >= 0)
		private = true;
	else if (text.indexOf("messages_alliance.php") >= 0)
		private = false;
	else 
		return;
	
	
	// Search for the messages
	var tables;
	var min;
	var max;
	if (private) {
		var form1 = document.getElementsByName("form1")[0];
		tables = form1.getElementsByTagName("table");
		min = 0;
		max = tables.length;
	} else {
		var search = document.getElementsByName("search")[0];
		var container = search.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		tables = container.getElementsByTagName("table");
		min = 1;
		max = tables.length - 2;
	}
	
	
	for (var i = max-1; i >= min; i--) {
		addLinksToMessage (tables[i], private, i); 
		processMessageScript (tables[i], private);
	}	
	
	// Log
	GM_log ("addLinks End");
}
function addReply() {
	// Check that we're on the correct page
	var text = document.URL;
	var letter;
	if (text.indexOf("sendmsg.php") < 0) {
		return;
	}
	
	var reply = readCookie ("NPA_Reply");
	if (reply == null)
		return;
	
	var input = document.getElementById("textarea");
	input.value = reply;
	eraseCookie ("NPA_Reply");
	
}
function addChat() {
	// Check that we're on the correct page
	var text = document.URL;
	
	if (text.indexOf("chat.php") < 0) {
		return;
	}
	
	var color = document.getElementsByTagName("input")[0];
	var myRow = color.parentNode;
	var space = color.nextSibling.cloneNode(true);
	myRow.appendChild (space);
	
	var btn = document.createElement("input");
	btn.id = "rank";
	btn.type = "button";
	btn.value = "Rank - Arty";
	btn.addEventListener("click", showRank, false);
	myRow.appendChild(btn);
	
	
	
}
function promotePilot(pilotName, groupName) {
	var pilot = "NPA_Rank:" + pilotName;
	var newtime = new Date();			
	var newrank = groupName + " - promoted at " + newtime;
	
	var cookieval = GM_getValue(pilot);
	
	if(cookieval != null && cookieval != ""){	
		var oldrank = cookieval.split(" - promoted at ")[0];
		var oldtime = cookieval.split(" - promoted at ")[1];
		
		if(oldrank == newrank){
			return 1;
		}else{
			var olddate = new Date(oldtime).getTime();
			var newdate = new Date(newtime).getTime();
			if(newdate < olddate){
				return 1;
			}
		}
	}
	GM_setValue(pilot,newrank);
}
function grabber(){
	
	var tabledata = document.getElementsByTagName("td"); //stores all <td> elements
	var groupName = ""; //stores the groupName, which is inside the <td> element NEXT TO the "Group name:" - node. 
	var selected = ""; //stores one (the only) <td> element, which contains the groupName
	
	for(var i = 0; i < tabledata.length; i++){
		if(tabledata[i].innerHTML.match(/Group name:/)){
			selected = tabledata[i+1].getElementsByTagName("strong")[0];
		}	
	}
	
	if(selected.innerHTML != null){
		groupName = selected.innerHTML;	
	}else{
		alert("Group name not found! Program terminated.");
		return;
	}
	
	var tablerows = document.getElementsByTagName("tr"); //contains all tablerows of the document
	
	var startLoop; //determines the first of the tablerows containing the names of TF pilots
	
	for(var i = 0; i < tablerows.length; i++){
		if(tablerows[i].innerHTML.match(/Group Members/)){
			startLoop = i+1; //avoid the "Group Members" <tr>, go directly to the names.
		}
	}
	
	var pilotName; //stores one name after another to perform the promotion
	
	for(var i = startLoop; i < tablerows.length; i++){
		if(tablerows[i].innerHTML.length < 900){
			return; //The innerHTML after the relevant namelist is shorter than 900. All names will be captured, then the script aborts.
		}
		if(tablerows[i].getElementsByTagName("a")[1]){
			pilotName = tablerows[i].getElementsByTagName("a")[1].innerHTML;
			promotePilot(pilotName, groupName);
		}
	}
}
text = document.URL;
if (text.indexOf("groupcp.php?g=") > -1) {
	grabber();
	return;
}else if(text.indexOf("groupcp.php?mforum=") > -1){	
	var minID = 4;
	var maxID = 21;
	var frameID = minID; //needed to call the correct appendMyFrame
	
	var usergroups = document.getElementsByTagName("td")[5];
	usergroups.innerHTML = "Usergroups - Preparing update...";	
	
	function appendMyFrame(){
		groupcp = document.createElement("iframe");
		groupcp.id = "frame"+frameID++;
		groupcp.src = "http://www.phpbbserver.com/terranfederatio/groupcp.php?g="+frameID;
		document.head.appendChild(groupcp);
		
		var percent = Math.round((frameID-minID) / (maxID-minID)*10000)/100;
		if(percent < 100){
		usergroups.innerHTML = "Usergroups - Updating TF ranks: "+percent+"%";
		}else{
			usergroups.innerHTML = "Usergroups - Update complete!";
		}
	}
	
	for(var i = minID; i < maxID; i++){
		setTimeout(appendMyFrame, i*500);
	}
	
	return;
}
addLinks();
addReply();
addChat();