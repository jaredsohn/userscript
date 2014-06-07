// ==UserScript==
// @name           Installs Since Last Visit
// @namespace      Pi
// @include        http://userscripts.org/home/scripts
// @version        2.0
// ==/UserScript==



var debug = false;
function log(message)
{
	if(debug) GM_log(message);
}

var scriptIDPattern = /scripts\/show\/(\d+)/
function getChildrenByTagName(currentNode, tagName, attributeName, attributeValue, CallBack)
{
	var returnArray = new Array();
	var xpath = "./" + tagName;
	if(attributeName && attributeValue)
	{
		xpath += "[@" + attributeName + "='" + attributeValue + "']";
	}
	var nodesSnapshot = document.evaluate(xpath, currentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
		returnArray.push(CallBack ? CallBack(nodesSnapshot.snapshotItem(i)) : nodesSnapshot.snapshotItem(i));
		
	return returnArray;
}

function getChildrenByXPath(currentNode, xpath, CallBack)
{
	var returnArray = new Array();	
	var nodesSnapshot = document.evaluate(xpath, currentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
		returnArray.push(CallBack ? CallBack(nodesSnapshot.snapshotItem(i)) : nodesSnapshot.snapshotItem(i));

	return returnArray;
}

function getScriptID(linkItem)
{
	return findFirstMatch(scriptIDPattern, linkItem.href);	
}

function findLastInstalls(installNode)
{
	var scriptID = getChildrenByTagName(installNode.parentNode.cells[0], 'a', 'class', 'title', getScriptID)[0];
	var currentInstalls = installNode.innerHTML;
	installNode.lastInstallValue = GM_getValue('lastInstall' + scriptID, currentInstalls);
	installNode.scriptID = scriptID;
	GM_setValue('lastInstall' + scriptID, currentInstalls);
	return installNode;
}

function findFirstMatch(regex, string)
{
	var result = null;
	var match = regex.exec(string);
	if(match && match.length > 1)
		result = match[1];
	return result;
}

var installTDs = getChildrenByXPath(document, "//table[@class='wide forums']/tbody/tr/td[6]", findLastInstalls);
var date = new Date();
var oldDateStr = GM_getValue('lastRecordedDate', date.toString());
GM_setValue('lastRecordedDate', date.toString());

for(i = 0; i < installTDs.length; i++)
{
	diff = parseInt(installTDs[i].innerHTML, 10) - parseInt(installTDs[i].lastInstallValue, 10);
	log('diff for script ID ' + installTDs[i].scriptID + ' = ' + diff);
	var color = diff > 0 ? 'red' : 'black';
	var title = "Recorded at : " + oldDateStr;
	var newSpan = "<span style='color:"+ color +"' title='"+ title +"'> <b>(" + diff + ") </b></span>";
	installTDs[i].innerHTML = installTDs[i].innerHTML + (installTDs[i].lastInstallValue ? newSpan : "");
}