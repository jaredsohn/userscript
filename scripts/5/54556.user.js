// ==UserScript==
// @name           Spotify release spreadsheet link fix
// @namespace      http://wezz.se
// @description    This script makes the spotify urls in the spreadsheets clickable
// @include        http://spreadsheets.google.com/pub*
// @version        1.0 - 26 Juli 2009
// ==/UserScript==

/* We have a main table */
if(document.getElementById('tblMain'))
{
	//Get the first sub data table
	var objFirstMainTable = document.getElementById('tblMain_0');
	//Fetch the second row (first data row) so we can validate that this is a spotify release spreadsheet
	var objSecondRow = objFirstMainTable.getElementsByTagName('tr')[1];
	//The spotify link is in the last TD cell
	if(objSecondRow.lastChild.innerHTML.indexOf('spotify:') > -1)
	{
		//Add the replacement script to the browsers local scope
		embedFunction(checkaRegExp);
		//We can now implement the link that activates the replacement
		document.getElementById('sheettabs').innerHTML += '<li><a href="javascript:checkaRegExp();">Create spotify links</a></li>'
	}
}

function checkaRegExp()
{
	//Create the reg exp that will find all the spotify links
	var objRegExp = new RegExp('spotify:([a-z]+):([a-zA-Z0-9]+)','ig');
	//Replace the spotify urls to links
	
	//### Option 1: create http links
	//document.getElementById('tblMain').innerHTML = document.getElementById('tblMain').innerHTML.replace(objRegExp,'<a href="http://open.spotify.com/$1/$2" target="_blank">http://open.spotify.com/$1/$2</a>') 
	
	//### Options 2: Create spotify: links
	document.getElementById('tblMain').innerHTML = document.getElementById('tblMain').innerHTML.replace(objRegExp,'<a href="spotify:$1:$2">http://open.spotify.com/$1/$2</a>')
}

function embedFunction(s)
{
document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}
