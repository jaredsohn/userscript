// ==UserScript==
// @name           LoL Tribunal Hide Player Names
// @namespace      http://www.leagueoflegends.com
// @include        http://www.leagueoflegends.com/tribunal/case/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function(){
	var chatLoadCount = 0;
	//setup an object indexed by the players' real names returning their masked name, and again by their masked names to do the opposite.
	var maskedNames = new Object();
	var teammateCount = 1;
	var enemyCount = 1;

	//Create the button that the user will click, and give it a click event.
	var toggleNames = $("<a id='toggleSummonerNames' href='#'>Toggle Summoner Names</a>");

	$("#judger_chat").parent().find("div.judger_holder_top").before( toggleNames );

	toggleNames.click(
		function()
		{
			$("span.chat_user").each(
				function()
				{
					$(this).text( maskedNames[ $(this).text() ] );
				}
			);

			return false;
		}
	);

	//Listen for new elements.
	document.body.addEventListener(
		'DOMNodeInserted',
		function( event ) {
			var elem = event.target;
			handleInsertedElement( elem );
		},
		false
	);

	function handleInsertedElement( elem )
	{
		if ( elem.tagName == "DIV" && elem.id == "judger_chat_text" )
		{
			chatLoadCount++;

			//The judger chat is "inserted" four times each time you change the game drop-down,
			//and once for the initial load. We only want to apply styles once per game change.
			if ( chatLoadCount == 1 || ( chatLoadCount - 1 ) % 4 == 0 )
			{
				maskedNames.length = 0;
				teammateCount = 1;
				enemyCount = 1;

				var foundNameCount = 0;

				$("span.chat_user").each(
					function()
					{
						var name = $(this).text().replace( " [All]", "" );
						var isReported = $(this).hasClass("reported");
						var isTeammate = $(this).hasClass("allied");

						if ( maskedNames[name] == null )
						{
							foundNameCount++;
							var maskedName;

							if ( isReported )
							{
								maskedName = "Reported";
							}
							else if ( isTeammate )
							{
								maskedName = "Ally" + teammateCount++;
							}
							else
							{
								maskedName = "Enemy" + enemyCount++;
							}

							maskedNames[name] = maskedName;
							maskedNames[maskedName] = name;

							maskedNames[name + " [All]"] = maskedName + " [All]";
							maskedNames[maskedName + " [All]"] = name + " [All]";

							//if we found all ten names, we can exit the each loop. This is done by returning false.
							if ( foundNameCount == 10 )
							{
								return false;
							}
						}
					}
				);
			}
		}
	}
	
})();