// ==UserScript==
// @name           	OBGHelper Chat - Ikariam.com - V0.3
// @namespace     	http://userscripts.org/scripts/show/91032
// @description    	Your direct link to the chat servers of Gameforge.
// @author       	Nightlion & JosDaBosS
//
// @include        	http://s*.us.ikariam.com/index.php?view=diplomacyAdvisorAlly
// @include             http://s*.us.ikariam.com/index.php?view=options
// @include             http://s*.us.ikariam.com/index.php?view=island*
// @exclude        	http://board.ikariam.*/*
//
// @require             http://userscripts.org/scripts/source/57756.user.js
//
// @version             0.3
// @history		0.3 Fix for 0.4.1
// @history             0.2 Auto-update
// @history             0.1 First release
// ==/UserScript==

ScriptUpdater.check(91032, "0.3");

var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var serverName = gameServerParts[0];


var InfoChat = "The standard channel is the alliance tag combined with the server name. If your alliance uses a other channel you can change it here. If you want a channel-management bot like chanserv we recommend: '[alliance tag]-[server name]'. For example: test-alpha, so no # needed";


function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function nameserverName(){
	switch(serverName){
		case "s666" :
			return "test.com";
		case "s1" :
			return "alpha.com";
		case "s2" :
			return "beta.com";
		case "s3" :
			return "gamma.com";
		case "s4" :
			return "delta.com";
		case "s5" :
			return "epsilon.com";
		case "s6" :
			return "zeta.com";
		case "s7" :
			return "eta.com";
		case "s8" :
			return "theta.com";
		case "s9" :
			return "lota.com";
		case "s10" :
			return "kappa.com";
		case "s11" :
			return "lambda.com";
		case "s12" :
			return "my.com";
		case "s13" :
			return "ny.com";
		case "s14" :
			return "xi.com";
	}
}

function addlinks() {
		var tbodys = document.getElementById("allyinfo");
		totalElement = document.createElement("tr");
		td1 = document.createElement("td");
		td1.setAttribute("class","job");
		td1.innerHTML = '<br />Alliance chat:';
		td2 = document.createElement("td");
		td2.innerHTML = '<input type="button" class="button" id="btn1" name="btn1" value="Chat Now!" onclick="chat()" />';
		totalElement.appendChild(td1);
		totalElement.appendChild(td2);
		tbodys.appendChild(totalElement);
		totalElement = document.createElement("tr");
		td3 = document.createElement("td");
		td3.setAttribute("class","job");
		td3.innerHTML = '<br />Alliance Support:';
		td4 = document.createElement("td");
		td4.innerHTML = '<input type="button" class="button" id="btn1" name="btn1" value="OBG-Helper Forum" onclick="forum()" />';
		totalElement.appendChild(td3);
		totalElement.appendChild(td4);
		tbodys.appendChild(totalElement);
}

unsafeWindow.chat = function() {
	window.open(chat,"_blank");
}

unsafeWindow.forum = function() {
	window.open("http://board.obg-helper.com","_blank");
}

if ((document.getElementsByTagName('body')[0].id=="diplomacyAdvisorAlly") && (document.getElementById('allyinfo').innerHTML.length>400)){
	if(GM_getValue('OBGUser'+serverName,'OBGUser')=='OBGUser'){
		GM_openInTab("http://"+ gameServer + "/index.php?view=options");
		setTimeout('window.location.reload()', 3000);
	}
	if(GM_getValue('OBGAlly'+serverName,'OBGAlly')=='OBGAlly'){
		var allLinks = document.evaluate('//a[@tabindex]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		GM_openInTab(allLinks.snapshotItem(3));
		setTimeout('window.location.reload()', 3000);
	}
	else{
	var chat = "http://widget.mibbit.com/?server=webirc.ogamenet.net:%2B8070&channel=%23" +
GM_getValue('OBGAlly'+serverName,'OBGAlly') +
"%2c%23ikariam.com%2c%23trainer&noServerTab=false&autoConnect=true&nick=" +
GM_getValue('OBGUser'+serverName,'OBGUser');
	addlinks();
	}
}

if (document.getElementsByTagName('body')[0].id=="island"){
	if(GM_getValue('OBGAlly'+serverName,'OBGAlly')=='OBGAlly'){
		var owner = document.getElementsByClassName('owner');
		var ally = document.getElementsByClassName('ally');
		for (var i=0; i<owner.length; i++) {
			if(owner[i].firstChild.nextSibling.nodeValue.replace(/\s+$/,"")==GM_getValue('OBGUser'+serverName,'OBGUser')) {
				GM_setValue('OBGAlly'+serverName, ally[i].firstChild.nextSibling.firstChild.nodeValue + "-" + nameserverName());
			}
		}
	}
}

if (document.getElementsByTagName('body')[0].id=="options"){
	var userdata = document.getElementById("options_userData");
	var f = userdata.getElementsByTagName("input");
	for (var i=0; i<f.length; i++) {
		if (f[i].name=="name") {
			playerName = f[i].value;
			GM_setValue('OBGUser'+serverName, playerName);
		}
	}
	var newElement = document.createElement("form");
	newElement.setAttribute('id', 'optionOBGHelper');
	newElement.innerHTML =
	  "<div class='contentBox01h'>" +
		 "<h3 class='header'>" +
			"<a href='http://userscripts.org/scripts/show/90327' target='_blank'>OBGHelper - Alliance chat</a>" +
		 "</h3>" +
		 "<div class='content'>" +
			"<table cellpadding='0' cellspacing='0'>" +
			   "<tbody>" +
				  "<tr>" +
					 "<th id='AllyChat'>Ally Chat</th>" +
						"<td><input class='textfield' style='width: 120px;' type='text' id='AllyChatValue' value='" + GM_getValue('OBGAlly'+serverName,'OBGAlly') + "'></td>" +
				  "</tr>" +
			   "</tbody>" +
			"</table>" +
			"<div class='content'><p>" + InfoChat + "</p></div>" +
			"<div class='centerButton'>" +
			   "<input class='button' id='saveOptions' value='Save'>" +
			"</div>" +
		 "</div>" +
		 "<div class='footer'></div>" +
	  "</div>";

	document.getElementById('mainview').insertBefore(newElement, document.getElementById('vacationMode'));

	//Add button event
	document.getElementById('saveOptions').addEventListener('click', function ()
	{
	  GM_setValue('OBGAlly'+serverName, document.getElementById('AllyChatValue').value);
	  //change text to option page
	  document.getElementById('AllyChatValue').innerHTML = GM_getValue('OBGAlly'+serverName,'OBGAlly');
	  document.getElementById('AllyChatValue').focus();
	}, false);
}