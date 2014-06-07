// ==UserScript==
// @name           fix-liga-table
// @namespace      www.sport5.co.il
// @include        http://www.sport5.co.il/liga.aspx*
// @date           2009-09-28
// @version        0.1
// @author			 hashi
// ==/UserScript==


var XbuildAndSend =
function buildAndSend(lsnum,cycleNum,controlCounter)
{
	var xmlDoc;
	var placeHolderId;
	var sUrl;

	xmlDoc = "<content><lsnum>" + lsnum + "</lsnum><cycle>" + cycleNum + "</cycle><count>" + controlCounter + "</count></content>";


	var placeHolderId1			= "leagueStatistic_rpt__ctl"+controlCounter+"_leagueTable_cyclePlace";
	var placeHolderId2			= "leagueStatistic_cyclePlace";

	if(document.getElementById(placeHolderId1))
	{
		placeHolderId			= placeHolderId1;
	}
	else if(document.getElementById(placeHolderId2))
	{
		placeHolderId			= placeHolderId2;
	}
	sUrl					= "../../Statistical/LeagueCycleTable/LeagueCycleTable.html.aspx";
	sUrl					+= "?lsnum="+lsnum+"&cycle="+cycleNum+"&count="+controlCounter;	// 4 output cache

	document.getElementById(placeHolderId).innerHTML = postXMLData(sUrl, xmlDoc);
}

//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''


var XsearchCycle = function searchCycle(o,lsnum,controlCounter)
{
	var tid				= "teams_" + controlCounter;
	var cid				= "cycle_" + controlCounter;
	var	dlg_data		= {};
	dlg_data.window	= window;
	//dlg_data.oAll	= document.all;
	dlg_data.lsnum	= lsnum;

	var sUrl		= LeagueCycleTableSearchURL;
	sUrl		   += "?lsnum="		+ lsnum;
	sUrl		   += "&team="		+ document.getElementById(tid).value;
	sUrl		   += "&teamname="	+ escape(document.getElementById(tid).options[document.getElementById(tid).selectedIndex].text);
	sUrl		   += "&cycle="		+ document.getElementById(cid).value;
	sUrl		   += "&cyclename="	+ escape(document.getElementById(cid).options[document.getElementById(cid).selectedIndex].text);
	sUrl		   += "&counter="	+ CInt(controlCounter);

	var res = window.showModalDialog(sUrl, dlg_data,"dialogHeight:393px; dialogWidth:605px; status:yes; help:No;");
};




//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

XpostXMLData = function postXMLData(xmlpath, xmldoc)
{
	try
	{
		xmlpath = xmlpath + ((xmlpath.indexOf('?') != -1) ? '&' : '?') + 'Ajax_UniqueID=' + new Date().valueOf();
		var xmlhttp						= new XMLHttpRequest();
		xmlhttp.open("POST", xmlpath, false);
		// xmlhttp.setRequestHeader("Content-Type", "text/xml; charset='utf-8' ");
		xmlhttp.send(xmldoc);
	}
	catch (e){alert("error: postXMLData() "+e.description);}
	return xmlhttp.responseText;

}


//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

	var script = document.createElement('script');
	script.innerHTML = 	XbuildAndSend +
								XsearchCycle +
								XpostXMLData;
	document.getElementsByTagName('head')[0].appendChild(script);



