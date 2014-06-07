// ==UserScript==
// @name           LoL Tribunal Enemy Chat Dimmer
// @namespace      http://www.leagueoflegends.com
// @description    Removes lines of chat that the reported person wouldn't see. It can be confusing if their opponents are saying a lot of things in their team chat. It makes it hard to tell who the reported person is replying to.
// @include        http://www.leagueoflegends.com/tribunal/case/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function(){
		
	var chatLoadCount = 0;
	
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
				$("span.enemy:not(:contains('[All]'))").css("color","#ddd").siblings("span").css("color","#ddd");
			}
		}
	}
	
})();