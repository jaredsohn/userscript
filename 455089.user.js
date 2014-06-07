// ==UserScript==
// @name        RI Export Campaigns to CSV
// @namespace   *
// @description Export campaigns and dashboard settings to a CSV format.
// @include     https://interact*.responsys.net/*
// @version     1
// @grant       none
// ==/UserScript==


window.addEventListener ("load", exportCampaignsScript, false);

function exportCampaignsScript()
{
	//Add menu entry under campaigns
	var a=document.createElement('a');
	var hr=document.createElement('hr');
	a.id = 'customMenuExportCsv';
	a.href='javascript:void(0)\;';
	a.addEventListener("click", exportCampaigns, false);
	a.innerHTML = 'Export to CSV';
	document.getElementById('MprogMenu').appendChild(hr);
	document.getElementById('MprogMenu').appendChild(a);

	function exportCampaigns()
	{
		//https://interact5.responsys.net/interact/api/campaigns.json?_dc=1394747514957&listId=1011&startRowNum=0&numRows=9999999&sortAttribute=NAME&sortAscending=false&channel=EMAIL

		var jCampaign = httpGet('/interact/api/campaigns.json?startRowNum=0&numRows=9999999&sortAttribute=NAME&sortAscending=false&channel=EMAIL');
		var a = JSON.parse(jCampaign);

		var csvStr = '';

		//Iterate through campaigns
		var campaignCount = a.campaignSummaries.length;
		for (var i = 0; i < campaignCount; i++)
		{
			var aCampaign = a.campaignSummaries[i];

			//Enumerate
			for (var prop in aCampaign) 
			{
			  if (aCampaign.hasOwnProperty(prop)) 
			  { 
				switch(prop)
				{
					case 'folder':
						if (aCampaign.folder != null)
						{
							csvStr = csvStr + '"' + aCampaign['folder'].name + '"' + ',';
						}
						break;
					case 'list':
						if (aCampaign.list != null)
						{
							csvStr = csvStr + '"' + aCampaign.list.name + '"' + ',';
						}
						break;
					default:
						csvStr = csvStr + '"' + aCampaign[prop] + '"' + ',';
				}
			  }
			}
			if (endsWith(csvStr, ','))
			{
				csvStr = csvStr.substring(0, csvStr.length - 1);
			}
			csvStr = csvStr + '\n';
		}
		csvStr = printHeader() + csvStr;
		window.open("data:text/csv;charset=utf-8," + escape(csvStr));

		function printHeader()
		{
			var csvHeaderStr = '';
			aCampaign = a.campaignSummaries[0];
			for (var prop in aCampaign) 
			{
			  if (aCampaign.hasOwnProperty(prop)) 
			  { 
				  csvHeaderStr = csvHeaderStr + '"' + prop + '"' + ',';
			  }
			}
			if (endsWith(csvHeaderStr, ','))
			{
				csvHeaderStr = csvHeaderStr.substring(0, csvHeaderStr.length - 1);
			}
			csvHeaderStr = csvHeaderStr + '\n';
			return csvHeaderStr;
		}

		function endsWith(str, suffix) {
			return str.indexOf(suffix, str.length - suffix.length) !== -1;
		}

		//Return source from URL
		function httpGet(theUrl)
		{
			var textHttp = null;

			textHttp = new XMLHttpRequest();
			textHttp.open( "GET", theUrl, false );
			textHttp.send();
			return textHttp.responseText;
		}
	}
}
