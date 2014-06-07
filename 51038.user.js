// ==UserScript==
// @name          Travian Color MarketPlace
// @autor         Dark Simon
// @namespace     http://traviantrucchi.org
// @version	  1.0
// @description   This Script color market offer so as to immediately recognize big deals (green) favorable (red) and without any gain (yellow)
// @source 	  http://userscripts.org/scripts/review/51038
// @identifier 	  http://userscripts.org/scripts/source/51038.user.js
// @include       http://*.travian.*/build.php?id=*&t=1*
// @include       http://*.travian.*/build.php?gid=17&t=1*
// ==/UserScript==

GM_addStyle(".red { background-color: #FFCFEB; } .green { background-color: #E1FFD9; } .yellow { background-color: #FFFFBB; }")

	var table = document.getElementById('range');

	for ( var i=2; i<table.rows.length-1; ++i ) 
	{
		var offer
		var wanted;
		
		offer = table.rows[i].cells[0];
		wanted = table.rows[i].cells[1];
	
		offer.value = parseInt( offer.childNodes.item(2).nodeValue );
		wanted.value = parseInt( wanted.childNodes.item(2).nodeValue );

		O = offer.value;
		W = wanted.value;


		if (O < W)
		{
			//is red
			for(j=0; j<5; ++j)
			{
				cell = table.rows[i].cells[j];
				cell.setAttribute('class', 'red');
			}
		}

		if (O > W)
		{
			//is green
			for(j=0; j<5; ++j)
			{
				cell = table.rows[i].cells[j];
				cell.setAttribute('class', 'green');
			}
		}

		if (O == W)
		{
			//is yellow
			for(j=0; j<5; ++j)
			{
				cell = table.rows[i].cells[j];
				cell.setAttribute('class', 'yellow');
			}
		}

	}