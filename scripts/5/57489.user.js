// ==UserScript==



// @name        WykopaliskoToiletFlush

// @author 	wykop_veteran



// @description   Usuwa linki z wykopaliska o stosunku wykopow do zakopow mniejszym niz zadane, a takze te, ktore juz zakopalismy.

// @namespace     wykop.pl



// @include       *wykop.pl/wykopalisko*



// ==/UserScript==



var ratio = 3;

var minimum = 3;



//i copied some code from fanzonun's script for bigger comment textarea, as you can see

$ = unsafeWindow.jQuery;

$(document).ready

(

	function()

	{

		$('div .wykop-item').each(

			function()

			{

					var id = $(this).attr("id");

					

					//tutaj odsiewamy pare "cudow" w postaci boksow reklamowych, czy czegos. Polecam inny skrypt do usuwania reklam z wykopu, jest na userscripts.com (wykop cleaner)

					if (!id || id=="linkid-0")

					{

						return;

					}

					var wykopy = parseInt($("#"+id +" .wykop-vote a .wykop-vote-counter").text());

					var zakopy = parseInt($("#"+id +" .wykop-details .wykop-info .ico-zakop a").text().match(/\d+/g));

					

					/*

						pierwsza czesc warunku - wspolczynnik zakopow/wykopow

						druga - usuwanie tych zakopanych (sprawdzamy w prostacki sposob, czy jestesmy zalogowani; sprawdzamy, czy znalezisko nie zostalo wykopane, sprawdzamy czy jest pole do zakopywania)

					*/

					if (zakopy >= minimum && wykopy < ratio*zakopy || ($(".usettings").length>0 && $("#"+id +" .wykop-vote a .wykop-vote-action").text() == "wykop" && $("#"+id +" .wykop-details .wykop-info .ico-zakop div").length==0) || $("#"+id +" .cofnij a .wykop-vote-action").text() == "cofnij")

					{

						//"powiedz czesc kolegom, nie ma cie tutaj"

						$("#"+id).remove();

					}

			}

		);

	}

)