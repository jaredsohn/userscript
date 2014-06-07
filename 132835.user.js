// ==UserScript==
// @name           HellsGamers Forum Activity
// @author         HG | Papa John
// @icon           http://a0.twimg.com/profile_images/231469218/ppj_normal.JPG
// @description    Yo Dawg I Heard U Like HG Activity
// @homepage       http://www.hellsgamers.com
// @include        http://hellsgamers.com/showroster
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version        v1.0
// ==/UserScript==

if (typeof jQuery == 'undefined') {
		alert('jQuery has not been loaded!');
	}

	$('br').each(function(index) {

		$(this).remove();
	    
	});
	
	$('ol[id="showroster_list"]').each(function(index) {

		if( index != 10 && index != 11 ){
			$(this).remove();
		}
	    
	});
	
	$('table[id="showroster_table"]').each(function(index) {

		if( index != 9 && index != 10 ){
			
			$(this).remove();
			
		}else{

			$(this).find('tr[class!="columnsort"]').each(function(i, el) {

				lastActivity = $("td:nth-child(4)", this).html();
				
				if( lastActivity != "Yesterday" && lastActivity != "Today" ){

					C_TIME = new Date().getTime();

					// Members List
					if( index === 9 ){
					
						PARSED_TIME = Date.parse(lastActivity);
						PASSED_TIME = Math.floor( ( C_TIME - PARSED_TIME ) / 1000 / 60 / 60 / 24 ); // 1000 milliseconds in a second / 60 seconds in a minute / 60 minutes in an hour / 24 hours in a day


						// Remove Members with more then 30 days of inactivity
						if( PASSED_TIME < 60 ){
							
							$(this).remove();

						}

					// Recruit List
					}else{

						PARSED_TIME = Date.parse(lastActivity);
						PASSED_TIME = Math.floor( ( C_TIME - PARSED_TIME ) / 1000 / 60 / 60 / 24 ); // 1000 milliseconds in a second / 60 seconds in a minute / 60 minutes in an hour / 24 hours in a day


						// Remove Recruit with less then 30 days of inactivity
						if( PASSED_TIME < 60 ){
							
							$(this).remove();

						}
						
					}

				}else{

					// Was on either Yesterday Or Today so remove...
					$(this).remove();

				}
				
	        });

		}

	});