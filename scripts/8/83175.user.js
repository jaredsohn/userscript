// ==UserScript==
// @name           impView
// @author	   Powind3h
// @namespace      Powind3h
// @version 	0.3
// @description	   Add level description to buildings on planet surface (Imperion)
// @include        http://*.imperion.*/planet/*
// @include	   http://*.imperion.*/building/*
// @exclude        http://forum.imperion.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


/*			many thanks to Phasma Ex Machina for code and	*/
/*			inspiration.					*/


/*			are we on the planet surface?			*/

   if ( $('div#planetSurface')) {

/*			okay, let's check to see what race we are	*/
/*			keeping a default color just in case.		*/

		var raceColor = '#000000';
		var checkStr = $('#navigation div.helper a.interface_navigation_galaxy').css('background-image');

		if(checkStr.match(/\/titans\//)) 	{ raceColor = '#0654CA';  }
		else if(checkStr.match(/\/xen\//))	{ raceColor = '#4C9D16';  }
		else 					{ raceColor = '#D19E00';  }


/*			okay, then we'll add the display style		*/

	GM_addStyle('\
		area * { display:block; } \
		div.buildingLevel { \
		display:inline; padding:2px 4px; border:2px outset #666; \
		background:#000; z-index:100000; color:#aaa; font-size:10px; -moz-border-radius:10px; \
					} \
				');


	$('div#planetSurface div.circle').each(function(i) {

		if(!this.className.match(/new/)) {

			var position = this.id.match(/\d+$/)[0];
			var buildingLevel = parseInt($('area#area_' + position).attr('title').match(/\d+$/)[0]);
			
			$('a', this).html( '<div class="buildingLevel" style="' +
					'background-color:' + raceColor + '; color:#fff; border:2px solid #000;' +
					'">' + buildingLevel + '</div>'); 
			}
		});	
	}
