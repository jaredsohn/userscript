// ==UserScript==
// @name           TAMU Class Registration Checker
// @namespace      wjw
// @description    Edit the 'courseInfo' array for the sections you wish to monitor. Edit the baseURL to setup for different semesters, campuses. Default is Fall 2012 College Station
// @include        *tamu.edu/*
// @exclude        *howdy.tamu.edu/*
// ==/UserScript==

//Adapted from UBC Course Registration: https://userscripts.org/scripts/review/92056


//list your CRNs in the Array below:
var courseInfo = new Array("14368","14369","21754"); 															
//this URL changes over semester. The term_in value is the year + semester spring=1,summer=2,fall=3 + campus college station=1, galveston=2, qatar=3. Example:2012+3+1 => ?term_in=201231&crn=
//
var baseURL = "https://compass-ssb.tamu.edu/pls/PROD/bwykschd.p_disp_detail_sched?term_in=201231&crn_in=";

function getChildrenByXPath(currentNode, xpath, CallBack)
{
	var returnArray = new Array();	
	var nodesSnapshot = document.evaluate(xpath, currentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
		returnArray.push(CallBack ? CallBack(nodesSnapshot.snapshotItem(i)) : nodesSnapshot.snapshotItem(i));

	return returnArray;
}

function checkRemainingSeats()
{
for (i=0;i<courseInfo.length;i++)
{
regurl = baseURL + courseInfo[i];
	GM_xmlhttpRequest ({
		method: "GET",
		url: regurl,
		onload: function (response)
		{
			var container = document.createElement('div');
			container.innerHTML = response.responseText;
			thchildren = getChildrenByXPath(container, '//th');
			name = thchildren[0].textContent; //index is hard coded, may change as page layout changes.
			tdchildren = getChildrenByXPath(container, '//td');
			capacity = parseInt(tdchildren[8].textContent, 10); //index is hard coded, may change as page layout changes.
			actual = parseInt(tdchildren[9].textContent, 10); //index is hard coded, may change as page layout changes.
			remaining = parseInt(tdchildren[10].textContent, 10); //index is hard coded, may change as page layout changes.

				if(capacity > actual && remaining > 0)
				{
					alert('TAMU Class Registration Checker: \n\n' + name + ' has ' + remaining + ' open seat(s). ');
				}
				else
					setTimeout(checkRemainingSeats, (4 + Math.random() * 3) * 60000); //refresh every 4-7 minutes.
				}
	});
}}

checkRemainingSeats();