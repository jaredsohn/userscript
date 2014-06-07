// ==UserScript==
// @name        RI Filter Table Names V2
// @namespace   *
// @description Adds a tooltip in filter designer that displays the table names of each filter criteria.
// @include     https://interact*.responsys.net/interact/jsp/en/testfilters.jsp*
// @version     1
// @grant       none
// ==/UserScript==

window.addEventListener ("load", tableMap, false);

function tableMap()
{
	//Return URL parameters
	var xmlFilterUrl = '/interact/wfFilter/getFilter';
	var xmlTableUrl = '/interact/wfFilter/listProfileAndExtensionColumnsData';
	var filterParams = window.location.search;

	//Retrieve XML
	var filterXml = xmlGet(xmlFilterUrl + filterParams);
	var tableXml = xmlGet(xmlTableUrl + filterParams);
	var profileAttributes = filterXml.querySelectorAll('profileString, filterCondition');

	var profileTds = document.getElementsByClassName('kids kidsOdd')[0].getElementsByClassName('ruleLabel');

	//Count of profile attributes in filter
	var filterNodeCount = profileAttributes.length;

	var tableName, id, columnName, conNum;

	for(var i = 0; i < filterNodeCount; i++)
		{
		conNum = i + 1
		
		//Get attribute information from XML
		id = profileAttributes[i].id;
		
		//Get table name and add tooltip
		tableName = tableXml.querySelector("[id='" + id + "']").getAttribute('name');
		profileTds[i].setAttribute('title', tableName);
		tableName = '';
		}
}
	
//Return XML from URL
function xmlGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send();
    return xmlHttp.responseXML;
}