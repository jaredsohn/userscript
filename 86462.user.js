// ==UserScript==
// @name           DS AdvancedRanking
// @namespace      314159265358979
// @description    Verbessert die Rangliste durch Sortiermöglichkeiten
// @include        http://*.die-staemme.de/game.php*screen=ranking*
// ==/UserScript==

var erste = document.getElementsByTagName("table")[0];
// Für PA/nicht PA
if (erste.innerHTML.match("Notizen")) // Für PA
{
var tablenr = "24"	
}
else // Für ohne PA
{
var tablenr = "14"
}
var zelle = document.getElementsByTagName("table")[tablenr].rows[1].cells[0];
var ziffern = zelle.innerHTML.length;
var platznr = zelle.innerHTML.substr(0, ziffern);

function clearURL(s)
{
	return s
	.replace("&sort=average_players", "")
	.replace("&sort=average_villages", "")
	.replace("&sort=points_top_40", "")
	.replace("&sort=villages", "")
	.replace("&sort=average", "")
	.replace("&sort=name", "")
	.replace("&sort=ally", "")
	.replace("&sort=members", "")
	.replace("&sort=points", "");
}

function appendSortParam(s)
{
	var tds = document.getElementById("player_ranking_table").nextSibling.getElementsByTagName("tr")[0].getElementsByTagName("td");

	var l0 = tds[0].getElementsByTagName("a")[0];
	var l1 = tds[1].getElementsByTagName("a")[0];

	if(l0 != undefined)
		l0.href += "&sort=" + s;

	if(l1 != undefined)
		l1.href += "&sort=" + s;
}

(function()
{
	if(document.getElementById("player_ranking_table") != undefined)
	{
		var tr = document.getElementById("player_ranking_table").getElementsByTagName("tr")[0];

		tr.getElementsByTagName("th")[0].innerHTML =
		'<a href="' + clearURL(location.href) + '&from=' + platznr + '">Rang</a>';

		tr.getElementsByTagName("th")[1].innerHTML =
		'<a href="' + clearURL(location.href) + '&sort=name' + '&from=' + platznr + '">Name</a>';

		tr.getElementsByTagName("th")[2].innerHTML =
		'<a href="' + clearURL(location.href) + '&sort=ally' + '&from=' + platznr + '">Stamm</a>';

		tr.getElementsByTagName("th")[3].innerHTML =
		'<a href="' + clearURL(location.href) + '&from=' + platznr + '">Punkte</a>';

		tr.getElementsByTagName("th")[4].innerHTML =
		'<a href="' + clearURL(location.href) + '&sort=villages' + '&from=' + platznr + '">Dörfer</a>';

		tr.getElementsByTagName("th")[5].innerHTML =
		'<a href="' + clearURL(location.href) + '&sort=average' + '&from=' + platznr + '">Punkteschnitt Dorf</a>';

		if(location.href.match("http://de\\d*.die-staemme.de/game.php.*screen=ranking.*&sort=villages"))
		{
			var numbers = [];
			for(var i = 1; i <= 20; ++i)
			{
    				var tr = document.getElementById("player_ranking_table").getElementsByTagName("tr")[i];
    				numbers.push( [ tr.getElementsByTagName("td")[4].innerHTML, tr ] );
			}

			numbers.sort(function(a, b)
			{
    				return parseInt(a[0]) < parseInt(b[0]);
			});


			for(var i = 0; i < 20; ++i)
    				document.getElementById("player_ranking_table").appendChild(numbers[i][1]);

			appendSortParam("villages");
		}

		else if(location.href.match("http://de\\d*.die-staemme.de/game.php.*screen=ranking.*&sort=average"))
		{
			var numbers = [];
			for(var i = 1; i <= 20; ++i)
			{
    				var tr = document.getElementById("player_ranking_table").getElementsByTagName("tr")[i];
    				numbers.push( [ tr.getElementsByTagName("td")[5].innerHTML, tr ] );
			}

			numbers.sort(function(a, b)
			{
    				return parseInt(a[0]) < parseInt(b[0]);
			});


			for(var i = 0; i < 20; ++i)
    				document.getElementById("player_ranking_table").appendChild(numbers[i][1]);
			
			appendSortParam("average");
		}

		else if(location.href.match("http://de\\d*.die-staemme.de/game.php.*screen=ranking.*&sort=name"))
		{
			var numbers = [];
			for(var i = 1; i <= 20; ++i)
			{
    				var tr = document.getElementById("player_ranking_table").getElementsByTagName("tr")[i];
    				numbers.push( [ tr.getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML.toLowerCase(), tr ] );
			}

			numbers.sort(function(a, b)
			{
    				return a[0] > b[0];
			});

			for(var i = 0; i < 20; ++i)
    				document.getElementById("player_ranking_table").appendChild(numbers[i][1]);
			
			appendSortParam("name");
		}

		else if(location.href.match("http://de\\d*.die-staemme.de/game.php.*screen=ranking.*&sort=ally"))
		{
			var numbers = [];
			for(var i = 1; i <= 20; ++i)
			{
    				var tr = document.getElementById("player_ranking_table").getElementsByTagName("tr")[i];
    				numbers.push( [ tr.getElementsByTagName("td")[2].getElementsByTagName("a")[0].innerHTML.toLowerCase(), tr ] );
			}

			numbers.sort(function(a, b)
			{
    				return a[0] > b[0];
			});

			for(var i = 0; i < 20; ++i)
    				document.getElementById("player_ranking_table").appendChild(numbers[i][1]);

			appendSortParam("ally");
		}
	}

	else if(document.getElementById("ally_ranking_table") != undefined)
	{
		var tr = document.getElementById("ally_ranking_table").getElementsByTagName("tr")[0];

		tr.getElementsByTagName("th")[0].innerHTML =
		'<a href="' + clearURL(location.href) + '&from=' + platznr + '">Rang</a>';

		tr.getElementsByTagName("th")[1].innerHTML =
		'<a href="' + clearURL(location.href) + '&sort=name' + '&from=' + platznr + '">Stammesname</a>';

		tr.getElementsByTagName("th")[2].innerHTML =
		'<a href="' + clearURL(location.href) + '&from=' + platznr + '">Punkte der 40 besten Spieler</a>';

		tr.getElementsByTagName("th")[3].innerHTML =
		'<a href="' + clearURL(location.href) + '&sort=points' + '&from=' + platznr + '">Gesamtpunkte</a>';

		tr.getElementsByTagName("th")[4].innerHTML =
		'<a href="' + clearURL(location.href) + '&sort=members' + '&from=' + platznr + '">Mitglieder</a>';

		tr.getElementsByTagName("th")[5].innerHTML =
		'<a href="' + clearURL(location.href) + '&sort=average_players' + '&from=' + platznr + '">Punkteschnitt Spieler</a>';

		tr.getElementsByTagName("th")[6].innerHTML =
		'<a href="' + clearURL(location.href) + '&sort=villages' + '&from=' + platznr + '">Dörfer</a>';

		tr.getElementsByTagName("th")[7].innerHTML =
		'<a href="' + clearURL(location.href) + '&sort=average_villages' + '&from=' + platznr + '">Punkteschnitt Dorf</a>';

		if(location.href.match("http://de\\d*.die-staemme.de/game.php.*screen=ranking.*&mode=ally.*&sort=name"))
		{
			var numbers = [];
			for(var i = 1; i <= 20; ++i)
			{
    				var tr = document.getElementById("ally_ranking_table").getElementsByTagName("tr")[i];
    				numbers.push( [ tr.getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML.toLowerCase(), tr ] );
			}

			numbers.sort(function(a, b)
			{
    				return a[0] > b[0];
			});

			for(var i = 0; i < 20; ++i)
    				document.getElementById("ally_ranking_table").appendChild(numbers[i][1]);

			
			appendSortParam("name");
		}

		else if(location.href.match("http://de\\d*.die-staemme.de/game.php.*screen=ranking.*&mode=ally.*&sort=points"))
		{
			var numbers = [];
			for(var i = 1; i <= 20; ++i)
			{
    				var tr = document.getElementById("ally_ranking_table").getElementsByTagName("tr")[i];
    				numbers.push( [ tr.getElementsByTagName("td")[3].innerHTML, tr ] );
			}

			numbers.sort(function(a, b)
			{
    				return parseInt(a[0].replace('<span class="grey">.</span>', '')) < parseInt(b[0].replace('<span class="grey">.</span>', ''));
			});

			for(var i = 0; i < 20; ++i)
    				document.getElementById("ally_ranking_table").appendChild(numbers[i][1]);

			
			appendSortParam("points");
		}

		else if(location.href.match("http://de\\d*.die-staemme.de/game.php.*screen=ranking.*&mode=ally.*&sort=members"))
		{
			var numbers = [];
			for(var i = 1; i <= 20; ++i)
			{
    				var tr = document.getElementById("ally_ranking_table").getElementsByTagName("tr")[i];
    				numbers.push( [ tr.getElementsByTagName("td")[4].innerHTML, tr ] );
			}

			numbers.sort(function(a, b)
			{
    				return parseInt(a[0]) < parseInt(b[0]);
			});

			for(var i = 0; i < 20; ++i)
    				document.getElementById("ally_ranking_table").appendChild(numbers[i][1]);

			
			appendSortParam("members");
		}


		else if(location.href.match("http://de\\d*.die-staemme.de/game.php.*screen=ranking.*&mode=ally.*&sort=average_players"))
		{
			var numbers = [];
			for(var i = 1; i <= 20; ++i)
			{
    				var tr = document.getElementById("ally_ranking_table").getElementsByTagName("tr")[i];
    				numbers.push( [ tr.getElementsByTagName("td")[5].innerHTML, tr ] );
			}

			numbers.sort(function(a, b)
			{
    				return parseInt(a[0].replace('<span class="grey">.</span>', '')) < parseInt(b[0].replace('<span class="grey">.</span>', ''));
			});

			for(var i = 0; i < 20; ++i)
    				document.getElementById("ally_ranking_table").appendChild(numbers[i][1]);

			
			appendSortParam("average_players");
		}

		else if(location.href.match("http://de\\d*.die-staemme.de/game.php.*screen=ranking.*&mode=ally.*&sort=villages"))
		{
			var numbers = [];
			for(var i = 1; i <= 20; ++i)
			{
    				var tr = document.getElementById("ally_ranking_table").getElementsByTagName("tr")[i];
    				numbers.push( [ tr.getElementsByTagName("td")[6].innerHTML, tr ] );
			}

			numbers.sort(function(a, b)
			{
    				return parseInt(a[0]) < parseInt(b[0]);
			});

			for(var i = 0; i < 20; ++i)
    				document.getElementById("ally_ranking_table").appendChild(numbers[i][1]);

			
			appendSortParam("villages");
		}


		else if(location.href.match("http://de\\d*.die-staemme.de/game.php.*screen=ranking.*&mode=ally.*&sort=average_villages"))
		{
			var numbers = [];
			for(var i = 1; i <= 20; ++i)
			{
    				var tr = document.getElementById("ally_ranking_table").getElementsByTagName("tr")[i];
    				numbers.push( [ tr.getElementsByTagName("td")[7].innerHTML, tr ] );
			}

			numbers.sort(function(a, b)
			{
    				return parseInt(a[0].replace('<span class="grey">.</span>', '')) < parseInt(b[0].replace('<span class="grey">.</span>', ''));
			});

			for(var i = 0; i < 20; ++i)
    				document.getElementById("ally_ranking_table").appendChild(numbers[i][1]);

			
			appendSortParam("average_villages");
		}
	}
})();