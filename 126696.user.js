// ==UserScript==
// @name           LoL Tribunal - Common Insult Highlighter
// @namespace      http://www.leagueoflegends.com
// @include        *.leagueoflegends.com/tribunal/case/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version        0.1
// ==/UserScript==

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//main code "stolen" from ToddMoon -> http://userscripts.org/users/97702 so he deserves the main credit (^.^)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

$.expr[':'].contains = function(a,i,m)
{
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
};


(function()
{
	var chatLoadCount = 0;
		
    // Listen for new elements.
	document.body.addEventListener(
		'DOMNodeInserted',
		function( event ) 
		{
			var elem = event.target;
			handleInsertedElement( elem );
		},
		false
	);
	
	function handleInsertedElement( elem )
	{
		if ( elem.tagName == "DIV" && elem.id == "judger_chat_text" )
		{
			// offensive language eng
			$("span:contains('noob')").css("color","red").css("font-weight","bold");
			$("span:contains('n00b')").css("color","red").css("font-weight","bold");
			$("span:contains('nooo')").css("color","red").css("font-weight","bold");
			$("span:contains('retard')").css("color","red").css("font-weight","bold");
			$("span:contains('bitch')").css("color","red").css("font-weight","bold");
			$("span:contains('stfu')").css("color","red").css("font-weight","bold");
			$("span:contains('fuck')").css("color","red").css("font-weight","bold");
			$("span:contains('tard')").css("color","red").css("font-weight","bold");
			$("span:contains('bg')").css("color","red").css("font-weight","bold");
			$("span:contains('cunt')").css("color","red").css("font-weight","bold");
			$("span:contains('ass')").css("color","red").css("font-weight","bold");
			$("span:contains('shut')").css("color","red").css("font-weight","bold");
			$("span:contains('gtfo')").css("color","red").css("font-weight","bold");
			$("span:contains('omg')").css("color","red").css("font-weight","bold");
			$("span:contains('idiot')").css("color","red").css("font-weight","bold");
			$("span:contains('dump')").css("color","red").css("font-weight","bold");
			$("span:contains('nigger')").css("color","red").css("font-weight","bold");
			$("span:contains('gay')").css("color","red").css("font-weight","bold");
			$("span:contains('penis')").css("color","red").css("font-weight","bold");
			$("span:contains('jew')").css("color","red").css("font-weight","bold");
			$("span:contains('xxx')").css("color","red").css("font-weight","bold");
			
			//de
			$("span:contains('arsch')").css("color","red").css("font-weight","bold");
			$("span:contains('fotze')").css("color","red").css("font-weight","bold");
			$("span:contains('hure')").css("color","red").css("font-weight","bold");
			$("span:contains('hitler')").css("color","red").css("font-weight","bold");
			$("span:contains('nazi')").css("color","red").css("font-weight","bold");
			$("span:contains('wixx')").css("color","red").css("font-weight","bold");
			$("span:contains('jude')").css("color","red").css("font-weight","bold");
			$("span:contains('xxx')").css("color","red").css("font-weight","bold");
			
			//fr
			$("span:contains('putain')").css("color","red").css("font-weight","bold");
			$("span:contains('faire')").css("color","red").css("font-weight","bold");
			$("span:contains('fag')").css("color","red").css("font-weight","bold");
			$("span:contains('ane')").css("color","red").css("font-weight","bold");
			$("span:contains('xxx')").css("color","red").css("font-weight","bold");	

			//sp
			$("span:contains('baboso')").css("color","red").css("font-weight","bold");
			$("span:contains('tonto')").css("color","red").css("font-weight","bold");
			$("span:contains('puto')").css("color","red").css("font-weight","bold");
			$("span:contains('pendejo')").css("color","red").css("font-weight","bold");
			$("span:contains('puta')").css("color","red").css("font-weight","bold");
			$("span:contains('concha')").css("color","red").css("font-weight","bold");
			$("span:contains('mierda')").css("color","red").css("font-weight","bold");
			$("span:contains('xxx')").css("color","red").css("font-weight","bold");			
			
			//por
			$("span:contains('otario')").css("color","red").css("font-weight","bold");
			$("span:contains('foder')").css("color","red").css("font-weight","bold");
			$("span:contains('rabeta')").css("color","red").css("font-weight","bold");
			$("span:contains('picha')").css("color","red").css("font-weight","bold");
			$("span:contains('xxx')").css("color","red").css("font-weight","bold");
		
		}
	}
	
})();