// ==UserScript==
// @name           BvS Minimenu Hotkeys
// @namespace      Serne
// @description    // @description    For the minimenu at the top of the page. No Hotkeys for Karma and Forum. Uses the top row of keys starting with Q for the Main. W for Village. Proceeds like this until teams Jutsu and bucket which are J K L. Is disabled on village page so you can type in chat.
// @include        http://*animecubed.com/billy/bvs/*
// @exclude        http://*animecubed.com/billy/bvs/village.html
// ==/UserScript==
	// Main - Q 81 minim1
	// Village - W 87 minim 6
	// Party House - E 69 minim 5
	// Shop - R 82 minim11
	// Consumables - T 84 minim11
	// World Kai - Y 89 minim 13
	// Missions - U 85 minim2
	// Quests - I 73 minim4
	// Spar - O 79 minim3
	// Arena - P 80 minim10
	// team - J 74 minim7
	// jutsu - K 75 minim 9
	// bucket  - L 76minim12
      function process_event(event) {
              if (event.keyCode==81){         //when the 'Q' key is hit go to the main page
                     			document.forms.namedItem("minim1").submit();
                 }
              if (event.keyCode==87){         //when the 'W' key is hit go to Village page
                     			document.forms.namedItem("minim6").submit();
                 }
              if (event.keyCode==69){         //when the 'E' key is hit go to Partyhouse Page
                     			document.forms.namedItem("minim5").submit();
                 }
              if (event.keyCode==82){         //when the 'R' key is hit go to Shop Page
                     			document.forms.namedItem("minim8").submit();
                 }
              if (event.keyCode==84){         //when the 'T' key is hit go to Consumables Page
                     			document.forms.namedItem("minim11").submit();
                 }
              if (event.keyCode==89){         //when the 'Y' key is hit go to World Kai Page
                     			document.forms.namedItem("minim13").submit();
                 }
              if (event.keyCode==85){         //when the 'U' key is hit go to Missions Page
                     			document.forms.namedItem("minim2").submit();
                 }
              if (event.keyCode==73){         //when the 'I' key is hit go to Quests Page
                     			document.forms.namedItem("minim4").submit();
                 }
              if (event.keyCode==79){         //when the 'O' key is hit go to Spar Page
                     			document.forms.namedItem("minim3").submit();
                 }
              if (event.keyCode==80){         //when the 'P' key is hit go to Arena Page
                     			document.forms.namedItem("minim10").submit();
                 }
              if (event.keyCode==74){         //when the 'J' key is hit go to Teams Page
                     			document.forms.namedItem("minim7").submit();
                 }
              if (event.keyCode==75){         //when the 'K' key is hit go to Jutsu Page
                     			document.forms.namedItem("minim9").submit();
                 }
              if (event.keyCode==76){         //when the 'L' key is hit go to Bucket Page.
                     			document.forms.namedItem("minim12").submit();
                 }
        }
         
        window.addEventListener("keyup", process_event, false);