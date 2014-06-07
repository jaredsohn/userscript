// ==UserScript==
// @name            JIRA: Add Named Watchers (newest)
// @namespace       JIRA
// @include         */jira/browse/*
// @description     Add an icon next to the "Watchers (view)" link, that allows easily adding watchers from a pre-enumerated list.
// ==/UserScript==

// Created by Ones Self, bp1juuz02 AT sneakemail DOT com in 2005
// Enhanced and currently maintained by Vladimir DOT Alexiev AT Sirma DOT bg
// - tooltip over the "Watchers: N" number, icon and "Watching:" operation that shows the current watchers
// - addition of watchers uses XMLHttpRequest instead of going to the ManageWatchers page: extremely useful while adding a comment
// Version 20090611

function runScript() {
	addNamedWatchers();
};
window.addEventListener("load", function() { runScript() }, false);

var viewWatchersLink = document.getElementById("view_watchers"); // link at the "Watchers: N" number: will add title (tooltip)
var img; // We will add an icon next to the "Watchers: N" number
var viewWatchersLink2 = document.getElementById("watcher_issue"); // link at the "Watching:" operation: will add title (tooltip)
var watchersUrl = document.getElementById('view_watchers').href; // URL to get current watchers: .../jira/secure/ManageWatchers!default.jspa?id=???
var startWatchersUrl = watchersUrl.replace (/default/, "startWatchers"); // action URL to add watchers

function toggleQuickAddWatchersDialog() {
	var popupDiv = document.getElementById("jiraaddnamedwatchersPopup");
	if(popupDiv.style.visibility == 'hidden')
	{
		popupDiv.style.visibility = 'visible';
		var confText = document.getElementById("jiraaddnamedwatchersConfText");
		confText.value = getWatchers();
	}
	else 
	{
		popupDiv.style.visibility = 'hidden';
		var confDiv = document.getElementById("jiraaddnamedwatchersConf");
		confDiv.style.visibility = 'hidden';
	}
}

function showCurrentWatchers() {
  // get current watchers and show them as title (tooltip) of Number, "Watching:" and icon
  var re = /watcher_link_([^\"]+)/mg; // go through all matches
  var s; var res; var m; 
  GM_xmlhttpRequest({method: 'GET', url: watchersUrl,
    onload: function(r) {
      s = r.responseText;
      while (m = re.exec(s)) {
        if (res) {res += ', '} else {res = ''};
        res += m[1];
      };
      if (!res) res = 'None';
      viewWatchersLink.title = viewWatchersLink2.title = img.title = res;
    }});
}

var pixelWidth = 300; // width of the Add Watchers popup
  // TODO: make this dynamically calculated in getWatchers()
  // pixelWidth = 8*logins;
  // if (pixelWidth<200) pixelWidth = 200;

function getWatchers() {
	var watchers = document.getElementById("jiraaddnamedwatchersWatchers");
	var emptyMessage = "There are no logins defined.  Please click \"Conf\" to add.";
	var confWatchersList = GM_getValue("jiraaddnamedwatchers.list");
	if(confWatchersList == undefined || confWatchersList == "")	{
		watchers.innerHTML = emptyMessage;
		return "";
	}
	var logins = confWatchersList.split(/\s*,\s*/);
	if(logins.length == 0) {
		watchers.innerHTML = emptyMessage;
		return "";
	}
	var watchersHtml = "";
  for(var i = 0; i < logins.length; ++i){
		watchersHtml += "  <a href=\"javascript:addWatcher('" + logins[i] + "');\" style='font-size: 8pt;'>" + logins[i] + "</a>";
		if( logins.length - 1 != i ) {
			watchersHtml += ", ";
		}
	}
	watchers.innerHTML = watchersHtml;
	return confWatchersList;
}

function saveConfiguration() {
	var confText = document.getElementById("jiraaddnamedwatchersConfText");
	GM_setValue("jiraaddnamedwatchers.list", confText.value);
	refreshWatchers();
}

function showConfiguration() {
}


function addNamedWatchers()
{
  var doc = window.document;
  var bullet = "  &nbsp;&nbsp;<img src='/jira/images/icons/bullet_creme.gif' align='absmiddle' border='0' height='8' width='8'>&nbsp;";
	var html = "";
	html += "<!-- start jiraaddnamedwatchers script -->\n";
  html += "<form autocomplete=\"on\" name=\"startform\">\n";
	html += "  <script language=\"JavaScript\" type=\"text/javascript\">\n";
  html += "  function addWatcher(login) {\n";
  html += "    if (document.getElementById(\"userNames\").value != \"\")\n";
  html += "      {document.getElementById(\"userNames\").value += \",\"}\n";
  html += "    document.getElementById(\"userNames\").value += login};\n";
  html += "  function toggleConfiguration() {\n";
  html += "    var conf = document.getElementById('jiraaddnamedwatchersConf');\n";
  html += "    conf.style.visibility = (conf.style.visibility == 'hidden' ? 'visible' : 'hidden')};\n";
  html += "  function clearUserNames() {\n";
  html += "    document.getElementById('userNames').value=''};\n";
  html += "  function closePopup() {\n";
  html += "    document.getElementById('jiraaddnamedwatchersPopup').style.visibility='hidden'};\n";
  html += "  function startWatchers() {\n";
  html += "    var r = new XMLHttpRequest();\n";
  html += "    r.open('GET','"+startWatchersUrl+"&userNames='+document.startform.userNames[0].value);\n";
  html += "    r.send(null);\n";
  html += "    clearUserNames(); closePopup();\n";
  html += "    document.getElementById('view_watchers').style.backgroundColor='red'};\n";
	html += "  </script>\n";
	html += "<table class='small' style='width: 200px; background-color: #F0F0F0; border: 1px solid #BBB; border-collapse: collapse; padding: 2px;'>\n";
	html += "<tr><td><span id='jiraaddnamedwatchersWatchers'></span></td></tr>\n";
	html += "  <tr><td><input type=\"text\" autocomplete=\"on\" name=\"userNames\" id=\"userNames\" class=\"textfield\" style=\"width: "+pixelWidth+"px;\"></td></tr>\n";
	html += "<tr><td style='text-align: right;'>\n";
	html += bullet + "<a name='jiraaddnamedwatchersConfShow' href=\"javascript:var v=toggleConfiguration();\"><b>Conf</b></a>\n";
	html += bullet + "<a href=\"javascript:var v=startWatchers();\" value='Add'><b>Add</b></a>\n";
	html += bullet + "<a href=\"javascript:var v=clearUserNames();\"><b>Clear</b></a>\n";
	html += bullet + "<a href=\"javascript:var v=closePopup();\"><b>Close</b></a>\n";
	html += "</td></tr>\n";
	html += "</table>\n";
	html += "<div id='jiraaddnamedwatchersConf' style='visibility: hidden; position: absolute;'>\n";
	html += "<table class='small' style='width: 200px; background-color: #F0F0F0; border: 1px solid #BBB; border-collapse: collapse; padding: 2px;'>\n";
	html += "  <tr><td colspan='2'>Comma seprated list of JIRA logins:</td></tr>\n";
	html += "<tr>\n";
	html += "<td><input type='text' id='jiraaddnamedwatchersConfText' name='userNames' id='userNames' class='textfield' style='width: 145px;'></td>\n";
	html += "<img src='/jira/images/icons/bullet_creme.gif' align='absmiddle' border='0' height='8' width='8'>&nbsp;<a id='jiraaddnamedwatchersConfSave' href=\"javascript:var v=alert('Saved');\"><b>Save</b></a></td>\n";
	html += "</tr>\n";
	html += "</table>\n";
	html += "</div>\n";
	html += "<form>\n";
	html += "<!-- stop jiraaddnamedwatchers script -->\n";

	//var element = document.evaluate('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/TABLE[2]/TBODY[1]/TR[7]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

  var newElement = doc.createElement ("span");

	img = doc.createElement("img");
	//img.src = "/jira/images/icons/linkext7.gif";
	img.src = "/jira/images/icons/form_blue_small.gif";
  img.title = "Add watchers popup";
	img.addEventListener("click", toggleQuickAddWatchersDialog, true);
	insertAfter(img, viewWatchersLink);
	newElement.appendChild(img);

	var popupDiv = doc.createElement("div");
	popupDiv.innerHTML = html;
	popupDiv.id = "jiraaddnamedwatchersPopup";
	popupDiv.style.visibility = 'hidden';
	popupDiv.style.position = 'absolute';
	newElement.appendChild(popupDiv);

	insertAfter(newElement, viewWatchersLink);

	var confSave = document.getElementById("jiraaddnamedwatchersConfSave");
	confSave.addEventListener("click", saveConfiguration, true);
	var confShow = document.getElementById("jiraaddnamedwatchersConfShow");
	confSave.addEventListener("click", showConfiguration, true);

  // add tooltip to number of watchers, image, and "Watching" link
  viewWatchersLink.addEventListener("mouseover", showCurrentWatchers, true);
  img.addEventListener("mouseover", showCurrentWatchers, true);
  viewWatchersLink2.addEventListener("mouseover", showCurrentWatchers, true);
}

function insertAfter(newNode, target) {
  var parent = target.parentNode;
  var refChild = target.nextSibling;
  if(refChild != null)
    parent.insertBefore(newNode, refChild);
  else
    parent.appendChild(newNode);
};

//.user.js
