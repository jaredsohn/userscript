// ==UserScript==
// @name           Travian Common Links
// @namespace      travian_links.user.js
// @description    Gives links to commonly used buildings under your village list under your 

village list: links to rally point, alliance, marketplace, stables, and barracks
// @include     http://s*.travian.*/*
// @include     http://s*.travian3.*/*
// @exclude     http://forum.travian.*

// ==/UserScript==
var LOG_LEVEL = 1; // 0 - quiet, 1 - nearly quite, 2 - verbose, 3 - detailed

function xpath(query, object) {
	if(!object) var object = document;
	return document.evaluate(query, document, null, 

XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function linkInsert()
{
	//make sure we're not on the logout page, which can still have the 5 links on the top 

that we check to see if we are on a viable page to display information
	var re = /logout.php/i;
	if (re.test(window.location.href)) {
		return false;
	}
	//check to see if we're on a page that should display the links (exclude login pages 

and such, anything that doesn't have the 5 top links to fields, village center, etc
	dtest=xpath("id('ltop5')");
	if(dtest.snapshotItem(0))
	{
		newInside='<table width="250" border="0" cellspacing="2">'+
		'<tr>'+
		'<td align="center"><a href="build.php?gid=19"><img src="img/un/g/g19.gif" 

title="Quartel" style="margin:0 5px"/></a></td>'+
		'<td align="center"><a href="build.php?gid=17"><img src="img/un/g/g17.gif" 

title="Mercado" style="margin:0 5px"/></a></td>'+
                '<td align="center"><a href="build.php?gid=11"><img src="img/un/g/g11.gif" 

title="Celeiro" style="margin:0 5px"/></a></td>'+
                '<td align="center"><a href="build.php?gid=12"><img src="img/un/g/g12.gif" 

title="Ferreiro" style="margin:0 5px"/></a></td>'+
		'<td align="center"><a href="allianz.php"><img src="img/un/g/g18.gif" 

title="Embaixada" style="margin:0 5px"/></td>'+
	  '</tr>'+
		'<tr>'+
		'<td align="center"><a href="build.php?gid=20"><img src="img/un/g/g20.gif" 

title="Cavalariça" style="margin:0 5px"/></a></td>'+
                '<td align="center"><a href="build.php?gid=22"><img src="img/un/g/g22.gif" 

title="Academia" style="margin:0 5px"/></a></td>'+
                '<td align="center"><a href="build.php?gid=10"><img src="img/un/g/g10.gif" 

title="Armazem" style="margin:0 5px"/></a></td>'+
                '<td align="center"><a href="build.php?gid=13"><img src="img/un/g/g13.gif" 

title="Armaduras" style="margin:0 5px"/></a></td>'+
		'<td align="center"><a href="build.php?gid=16"><img src="img/un/g/g16.gif" 

title="Ponto Reunião Militar" style="margin:0 5px"/></a></td>'+
		'<td align="center">&nbsp;</td>'+
	  '</tr>'
	'</table>';
		dtest=xpath("id('lright1')");
		if(dtest.snapshotItem(0))
		{

			var inside=dtest.snapshotItem(0).innerHTML
			fStart=inside.indexOf('<ul ');
			//alert("first part: "+inside.substring(0,fStart+16));

			
	
		}
		else
		{
			//user only has one village, attach the container div onto our value
			//newInside='<div id="lright1">'+newInside+'</div>';
			//and reset our destination to be the main container
			var container = document.createElement('div');


			container.setAttribute('id', 'lright1');
			dtest=xpath("id('lmidall')");
			dtest.snapshotItem(0).appendChild(container);
			dtest=xpath("id('lright1')");

		}
		dtest.snapshotItem(0).innerHTML=dtest.snapshotItem(0).innerHTML+newInside;
												

				
	}


}

window.addEventListener( 'load', linkInsert, false);