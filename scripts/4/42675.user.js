// ==UserScript==
// @name		DiG Alliance Tools
// @version 	2
// @namespace 	Bigboom
// @author		Bigboom
// @description	The DiG alliance Tools - ika-core
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched.
// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=82;
var scriptlocation="http://userscripts.org/scripts/source/39451.user.js";

// Settings for every server
switch (location.host) {
   default:
      alliancefullnm='Doorman is God';
      alliancenm='DiG';      
      alliance=[   ['?o alliance'   , NoAlliance],
               [ alliancenm   , Alliance   ],
               ['CCC'         , Allies   ],
	       ['C L'         , Allies   ],
               ['VKG'         , Allies   ],
               ['300'         , Allies   ],         
               ['NMA'         , Allies   ],
               ['GOW'         , Allies   ],   
               ['Jolly'      , Enemies    ],
               ['Poff'         , Enemies   ],
               ['NED'         , Enemies   ],
               ['ARES'         , Enemies   ],
               ['PrG'         , Enemies   ],
               ['M-A'         , Enemies   ],
               ['PMU'         , Enemies   ],
               ['AFP'         , Enemies   ],
               ['TCE'         , Enemies   ],
               ['J4Rck'      , Enemies   ],
               ['IFM'         , Enemies   ],
               ['SPh'         , Enemies   ],
               ['HT-MK'      , Enemies   ],
               ['TITAN'      , Enemies   ], ];
		
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='.';
		//forumurl='.';
		forumurl='http://digikariam.freeforums.org/';
		//forumurlnew='.';
		forumurlnew='http://digikariam.freeforums.org/search.php?search_id=newposts';
		break;
	
}
	main();
	ToolsMenu();
	fixtreaties();
	
    // addsbubble(<advisor_name>, quote, duration_in_seconds);
   
var showbubble=Math.floor(Math.random()*10);
switch(showbubble){
   case 0:
      addsbubble('diplomat', "Doorman is god", 30);
      addsbubble('scientist', "There is only science!", 35);
      break;
   case 1:
      addsbubble('general', "I've got these cheeseburgers man", 30);
      addsbubble('mayor', "Tofu of beef?", 35);
      addsbubble('general', "There's a difference?", 40);
      addsbubble('mayor', ":sigh:", 45);
      break;
   case 2:
      addsbubble('diplomat', "Where is Neilio when you need him?", 20);
      break;
   case 3:
      addsbubble('general', "DiG till I die!", 30);
      addsbubble('mayor', "That's nice, now go back to sleep!", 42);
      break;
   case 4:
      addsbubble('diplomat', "Behold the power of Doorman", 30);
      addsbubble('mayor', "All hail Doorman!", 36);
      break;
   case 5:
      addsbubble('general', "Kenya!  Kenya Kenya! Kenyaaaa", 40);
      addsbubble('scientist', "We've got lions and tigers", 45);
      addsbubble('diplomat', "Only in Kenya!", 50);
      addsbubble('mayor', "Forget Norway!", 55);
      addsbubble('general', "Kenya! Oh Kenya!", 60);
      addsbubble('scientist', "Everybody else has had more sex than me...", 75);
      break;
   case 6:
      addsbubble('general', "Could someone tell Limbo that I need him", 40);
      addsbubble('mayor', "What now?", 45);
      addsbubble('general', "Either DiG's being attacked or something broke again", 50);
      break;
   case 7:
      addsbubble('diplomat', "So what does it mean to be in the ISAF?", 40);
      addsbubble('general', "That I can make things go boom!", 45);
      break;
   case 8:
      addsbubble('scientist', "Who is this Doorman?", 40);
      addsbubble('mayor', "Do not question our god!", 45);
      break;
   case 9:
      addsbubble('mayor', "Bigboom, we need to talk.", 40);
      addsbubble('mayor', "I think I deserve a raise.", 50);
      addsbubble('mayor', "Do you have any clue how much I handle?", 60);
      addsbubble('mayor', "I'm in charge of every citizen of every island!", 70);
      break;
   case 10:
      addsbubble('mayor', "Doorman", 20);
      addsbubble('general', "is", 24);
      addsbubble('scientist', "God", 28);
      addsbubble('diplomat', "http://www.doormanisgod.com", 35);
      break;
   default:
      addsbubble('mayor', "Someone set us up the bomb!", 20);
      break;
}