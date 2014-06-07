// ==UserScript==
// @name           CR TP to Dashboard
// @namespace      http://www.courtrivals.com
// @description    Courtrivals script that adds a column for total trained points for each player
// @include        http://www.courtrivals.com/dashboard.php
// ==/UserScript==

var j=0, k=0, c=0, index=0;
var dash = new Array(); 
var playerCell = new Array();
var links = new Array();
var TP = new Array();

Button = document.createElement('button');
Button.innerHTML = '<input type="button" id="TP Button">Add TP to Dashboard</input>';



//Get all cells on the page
var cells = document.evaluate(
	'//td',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
	var rows = document.evaluate(
	'//tbody',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
//Get all cells that contain the 'Player' text
for ( i=0; i < cells.snapshotLength-1; i++)
{
	if( cells.snapshotItem(i).innerHTML.indexOf('Player')>=0)
	{
		playerCell[j] = cells.snapshotItem(i);
		j++;		
	}
}	

//Get the last cell that we found with the 'Player' text
//Since this cell is nested within others, the last cell will be the innermost cell
var playerCell = playerCell[playerCell.length-1];

//Define the dashboard, dashboard rows, and player count
var dash = playerCell.parentNode.parentNode;			
var dashRows = dash.getElementsByTagName('tr');
var playerCount = dashRows.length-1;

dash.parentNode.parentNode.insertBefore(Button, dash.parentNode);


Button.addEventListener('click', function()
{
	Button.parentNode.removeChild(Button);
	Everything();
}, true);

//Everything else runs once the button is pressed
function Everything(){
	//Define the cells of the dashboard in order to look for our playerlinks
	var dashCells = dash.getElementsByTagName('td');
	var playerLinkCells = new Array();

	//Find which cells contain player links and store them in an array
	var n=0;
	for (i = 0; i<dashCells.length-1; i++)
	{
		if (dashCells[i].innerHTML.indexOf('/playerSw')>=0)
		{
			playerLinkCells[n] = dashCells[i];
			links[n] = dashCells[i].innerHTML
			links[n] = links[n].substring( links[n].indexOf('/playerSwitch')+22, links[n].indexOf('">'));
			links[n] = 'http://www.courtrivals.com/showPlayerProfile.php?pid=' + links[n];
			//alert(links[n]);
			n++;
		}
	}


	//Insert empty cells onto dashboard where the TP will go
	for ( i=0; i<playerLinkCells.length; i++)
	{
		var td = document.createElement('td');
		playerLinkCells[i].parentNode.insertBefore( td, playerLinkCells[i].nextSibling);
	}


	//Calls a function which puts the TP title at the top of the dashboard
	insertTPhdr();

	function insertTPhdr()
	{	
		var TPcol = document.createElement('td');
		TPcol.setAttribute('width', '4%');
		TPcol.setAttribute('bgcolor', '#000000');
		TPcol.innerHTML = TPcol.innerHTML +'<center>TP</center></td>' 
		playerCell.parentNode.insertBefore( TPcol, playerCell.nextSibling);
	}


	//Calls a function that gets the TP for every player of the dashboard
	getTP(index);

	//Player page hits
	function getTP(index)
	{
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: links[index],
			headers:
			{
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails)
			{   
				reference = responseDetails.responseText;
				wait();
			}
		});
	}
		

	function wait()
	{
		if(reference != undefined)
		{
		 TPVals(reference);
		}
		else
		{
			window.setTimeout( function()
			{
				wait();
			}, 500);
		}
	}

	//Grabs TP from a player page, inserts it onto dashboard, then calls the getTP function for the next page
	function TPVals(reference)
	{
		TP[index] = reference.substring( reference.indexOf('Total Points :')+69, reference.length);
		TP[index] = TP[index].substring( 0, TP[index].indexOf('</td'));
		playerLinkCells[index].nextSibling.innerHTML = TP[index];
		index++;
		if(index>links.length-1)
		{
			return;
		}
		else
		{
			getTP(index);
		}
	}

}