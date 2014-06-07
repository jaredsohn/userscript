// ==UserScript==
// @name           BitHUmen helper
// @namespace      *
// @include        *bithumen.ru/browse.php?*genre=*
// ==/UserScript==

////////////////////////////////////////
///////////---PARAMETER---////////////
////////////////////////////////////////
var filterValue=7.0;//////////
////////////////////////////////////////

var torrentsTable=document.getElementById('torrenttable');
var ttBody=torrentsTable.tBodies[0];
var rows=ttBody.rows;
var result=new Array();

//Check all rows
var len=rows.length;
for(i=1;i<len;i++)
{
	var currentRow=rows[i];
	
	var cv=0;
	var canGo=true;
	links=currentRow.getElementsByTagName("a");
	canGo=currentRow.cells[1].innerHTML.match("imdb");
	if(canGo==null)
	{
		canGo=false;
	}
	var linksLen=links.length;
	///////////////////////////
	while(canGo && !(links[cv].innerHTML).match("imdb") && cv<linksLen-1)
	{	
		cv++;
	}
	///////////////////////////
	if(cv>=6 || !canGo)
	{
		result.push(currentRow);
	}
	else
	{
		var imdbData=links[cv];
		var hasData=(imdbData.innerHTML.split("/b>")[1].split("<b")[0]).match(":");
		if(hasData!=null)
		{
			var imdbValue=imdbData.innerHTML.split("/b>")[1].split(": ")[1].split("<b")[0];
			if(imdbValue>=filterValue)
			{				
				result.push(currentRow);
			}
		}
		else
		{
			result.push(currentRow);
		}
	}
}

//refresh the rows
ttBody.innerHTML="";
for(i=0;i<result.length;i++)
{
	ttBody.innerHTML+=result[i].innerHTML;
}

//alert("A");