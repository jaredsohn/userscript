// ==UserScript==

// @name           egovDonate

// @namespace      egovDonate

// @description	   Changes profiles link to donation links.

// @include        http://egov4you.info/pl/miniArmy/*

// @include        http://www.egov4you.info/pl/miniArmy/*



// ==/UserScript==

//niestety troche psuje formatowanie egova...
//autor: turysta2050

function addColumnAndInput()

{

	var query = window.location.search.substring(1);

	var value = 0;

	if (query != "")

	{

		query = query.substring(4, query.length);

		value = parseFloat(query);

		if (isNaN(value)) value = 0;

	}	



	var body = document.getElementById("container");

	body.innerHTML = 'dof (wpisz i wciśnij enter): <form action="#"> <input type="text" name="dof" value='+value+'  size = "3"/>pln/1k </form>' + body.innerHTML;

	var rows = document.getElementsByTagName("table")[1].getElementsByTagName("tr");

	rows[0].innerHTML += "<th>pln</th>";



	for (i=1; i<rows.length; ++i)

	{

		var columns = rows[i].getElementsByTagName("td");

		var influ = columns[3].innerHTML;

		while (true)

		{

			if (influ.indexOf(' ') == -1) break;

			influ = influ.replace(' ','');

		}

		rows[i].innerHTML += "<td>"+(parseInt(influ)*value/1000)+"</td>";

	}

}



function changeLinksToDonate()

{

	var collection = document.getElementsByTagName("table")[1].getElementsByTagName("a");

		

	for (var i=0; i<collection.length; ++i)

	{

		if (collection[i].href.indexOf("http://www.erepublik.com/en/citizen/profile/") >= 0)

		{

			collection[i].href = collection[i].href.replace("http://www.erepublik.com/en/citizen/profile/", "http://economy.erepublik.com/en/citizen/donate/money/");

		}

			

	}

}



function init()

{

	addColumnAndInput();

	changeLinksToDonate();

}



init();