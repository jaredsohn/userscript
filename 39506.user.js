// ==UserScript==
// @name           Court Rivals Player Page Update
// @namespace      http://courtrivals.com
// @description    Slightly more informative player page showing attributes after skills/chems/sliders
// @include        http://www.courtrivals.com/showPlayerProfile.php?pid=*
// ==/UserScript==

var player_name = 'Adrian Walker';
var team_id = '281';

// Define the array locations for the different attributes
var SPEED 					= 0;
var ENDURANCE 				= 1;
var BALL_HANDLING 			= 2;
var PASSING 				= 3;
var SHOOTING 				= 4;
var THREE_POINT_SHOOTING	= 5;
var FREE_THROWS 			= 6;
var DUNKING 				= 7;
var REBOUNDING 				= 8;
var BLOCKING 				= 9;
var DEFENSE 				= 10;
var LEADERSHIP 				= 11;

window.setTimeout( function() 
{
	var document_lines = document.documentElement.innerHTML;			
	var all_lines = document_lines.split("\n");
		
	
	// ==============================================================================
	//  Get the player name, attributes, sliders, and skills
	// ==============================================================================
	var oAttributes = new Array();
	var oSkills = new Array();
	var skills_counter = 0;
	var counter = 0;
	var name_found = 0;
	var sliders = new Array();
	var found_sliders = 0;
	var player_id = 0;
	var total_points = 0;

	//var name_re = /showPlayerProfile.php\?pid=544"><b>(.*)<\/b>/;
	var name_re = /<strong>Name :<\/strong><\/td>/;
	var actual_name_re = /F1E7C5">(.*)<\/td>/i;
	var player_id_re = /parent.location=\'showPlayerProfile.php\?pid=(.*)&/;

	var team_re = /showTeamProfile.php\?(tid=\d+)/;
	var attrib_re = /<strong>(.*): <\/strong>(\d+)/;
	var total_points_re = /<strong>Total Points :/;


	// Slider reg exps
	var sliders_re = /(\S+) <b>(.*)<\/b><br>/;
	var sliders_neutral_re = /Neutral/i;
	var sliders_3pt_re = /(\d+)\%.*(More|Less)/;		// 0 - Take More/Less 3's
	var sliders_shoot_re = /(\d+)\%.*(Shoot|Pass)/; 	// 1 - Pass/Shoot more
	var sliders_jump_re = /(\d+)\%.*(Attack|Jump)/; 	// 2 - Attack the basket
	var sliders_crash_re = /(\d+)\%.*(Crash|Back)/; 	// 3 - Crash the boards/back on defense
	var sliders_take_re = /(\d+)\%.*(Take|Play)/;   	// 4 - Take chances/Play Conservative
	
	// Skills regexps
	var skills_re = /<strong>Skills.*<\/strong>/;
	var specific_skill_re = /<b>(.*):<\/b> (\d)/;

	//Neutral <b>3 Point Frequency</b><br>56% <b>Shoot More</b><br>54% <b>Take Jump Shots</b><br>56% <b>Get Back on Defense</b><br>Neutral <b>Take Chances on Defense/Play Conservative Defense</b><br>
		
	
	for(var i=0; i < all_lines.length; i++)
	{		
		// ==============================================================================
		//  This looks for the name
		// ==============================================================================
		if(name_re.test(all_lines[i]))
		{
			//alert('Looking at -> ' + all_lines[i + 1]);
			var OK = actual_name_re.exec(all_lines[i + 1]);
			player_name = OK[1];
			//alert('Found first part of player name -> ' + all_lines[i] + ' and then we found ' + OK[1]);
			name_found = 1;
		}
	
	
		// ==============================================================================
		//  This looks for the team id (to find player chems)
		// ==============================================================================
		if(team_re.test(all_lines[i]))
		{
			var OK = team_re.exec(all_lines[i]);
			//alert('Found team id = ' + OK[1]);
			team_id = OK[1];			
		}
		
		// ==============================================================================
		//  This looks for the player id (used to save off data)
		// ==============================================================================
		if(player_id_re.test(all_lines[i]))
		{
			var OK = player_id_re.exec(all_lines[i]);
			//alert('Found player id = ' + OK[1]);
			player_id = OK[1];			
		}
	
		// ==============================================================================
		//  This looks for total points
		// ==============================================================================
		if(total_points_re.test(all_lines[i]))
		{
			var points_re = /(\d+)<\/td>/;
			var OK = points_re.exec(all_lines[i + 1]);
			if(OK[1])
			{
				//alert('Total points = ' + OK[1]);
				total_points = OK[1];
			}
		}
	
	
		if(name_found)
		{
			// ==============================================================================
			//  This gets the attribute and value assuming we found  a name
			// ==============================================================================	
			if(attrib_re.test(all_lines[i]))
			{
				var OK = attrib_re.exec(all_lines[i]);
				//alert('Found an attribute ' + OK[1] + ' = ' + OK[2]);
				oAttributes[counter] = new attributes(OK[1], OK[2]);
				counter++;
			}	
		
		
			// ==============================================================================
			//  Now we get sliders assuming we found a name and attributes
			// ==============================================================================
			if(counter > 0) // counter > 0 means we found attributes
			{
				// See if this line contains sliders
				if(sliders_re.test(all_lines[i])) 
				{
					// It does, split on <br> to break up each slider into its own line
					var slider_lines = all_lines[i].split("<br>");
					found_sliders = 1;
					// Loop through those lines
					for(var j = 0; j < slider_lines.length - 1; j++) // last line is null
					{
						sliders[j] = 0;
						
						if(!sliders_neutral_re.test(slider_lines[j]))
						{
							// Slider is not neutral
							if(j == 0)	// More/Less 3 pt shooting
							{
								var OK = sliders_3pt_re.exec(slider_lines[j]);
								
								if(OK[1] && (OK[2] == 'Less') )
								{
									sliders[j] = -1 * (OK[1] / 100);
									//alert('Minus -> Line ' + j + ': ' + OK[2] + ' = ' + sliders[j]);
								}
								else if(OK[1] && (OK[2] == 'More'))
								{
									sliders[j] = 1 * (OK[1] / 100);
									//alert('Plus  -> Line ' + j + ': ' + OK[2] + ' = ' + sliders[j]);									
								}
								else
								{
									//alert('Didn\'t like something' + OK[1] + '   ' + OK[2] + ' from line ' + slider_lines[j]);
								}
							}
							else if(j == 1)	// Pass/shoot more
							{
								var OK = sliders_shoot_re.exec(slider_lines[j]);
								
								if(OK[1] && (OK[2] == 'Pass') )
								{
									sliders[j] = -1 * (OK[1] / 100);
									//alert('Minus -> Line ' + j + ': ' + OK[2] + ' = ' + sliders[j]);
								}
								else if(OK[1] && (OK[2] == 'Shoot'))
								{
									sliders[j] = 1 * (OK[1] / 100);
									//alert('Plus  -> Line ' + j + ': ' + OK[2] + ' = ' + sliders[j]);									
								}
								else
								{
									//alert('Didn\'t like something' + OK[1] + '   ' + OK[2] + ' from line ' + slider_lines[j]);
								}
							}
							else if(j == 2)	// Attack/Jump
							{
								var OK = sliders_jump_re.exec(slider_lines[j]);
								
								if(OK[1] && (OK[2] == 'Attack') )
								{
									sliders[j] = -1 * (OK[1] / 100);
									//alert('Minus -> Line ' + j + ': ' + OK[2] + ' = ' + sliders[j]);
								}
								else if(OK[1] && (OK[2] == 'Jump'))
								{
									sliders[j] = 1 * (OK[1] / 100);
									//alert('Plus  -> Line ' + j + ': ' + OK[2] + ' = ' + sliders[j]);									
								}
								else
								{
									//alert('Didn\'t like something' + OK[1] + '   ' + OK[2] + ' from line ' + slider_lines[j]);
								}
							}
							else if(j == 3)	// Crash/Back
							{
								var OK = sliders_crash_re.exec(slider_lines[j]);
								
								if(OK[1] && (OK[2] == 'Crash') )
								{
									sliders[j] = -1 * (OK[1] / 100);
									//alert('Minus -> Line ' + j + ': ' + OK[2] + ' = ' + sliders[j]);
								}
								else if(OK[1] && (OK[2] == 'Back'))
								{
									sliders[j] = 1 * (OK[1] / 100);
									//alert('Plus  -> Line ' + j + ': ' + OK[2] + ' = ' + sliders[j]);									
								}
								else
								{
									//alert('Didn\'t like something' + OK[1] + '   ' + OK[2] + ' from line ' + slider_lines[j]);
								}
							}
							else if(j == 4)	// Take Chances/Play Conservatively
							{
								var OK = sliders_take_re.exec(slider_lines[j]);
								
								if(OK[1] && (OK[2] == 'Take') )
								{
									sliders[j] = -1 * (OK[1] / 100);
									//alert('Minus -> Line ' + j + ': ' + OK[2] + ' = ' + sliders[j]);
								}
								else if(OK[1] && (OK[2] == 'Play'))
								{
									sliders[j] = 1 * (OK[1] / 100);
									//alert('Plus  -> Line ' + j + ': ' + OK[2] + ' = ' + sliders[j]);									
								}
								else
								{
									//alert('Didn\'t like something' + OK[1] + '   ' + OK[2] + ' from line ' + slider_lines[j]);
								}
							}
						}
					}
				}
			}
			
			
			// ==============================================================================
			//  Now we get skills assuming we found name, attributes, and sliders
			// ==============================================================================
			if(found_sliders != 0)
			{
				if(skills_re.test(all_lines[i]))
				{
					var skill_lines = all_lines[i + 2].split("<br>");
					for(var j = 0; j < skill_lines.length - 1; j++) // last line is null
					{
						var OK = specific_skill_re.exec(skill_lines[j]);
						if(OK[1] && OK[2])
						{
							oSkills[skills_counter] = new skills(OK[1], OK[2]);
							skills_counter++;
							//alert(OK[1] + ' = ' + OK[2]);
						}
						//alert('We probably care about this line -> ' + skill_lines[j]);
					}									
				}
			}	
		}
	}
	
	
	// ==============================================================================
	//  Ok, now we'll get our chemistries assuming we found sliders
	// ==============================================================================	
	if(found_sliders != 0)
	{
		GM_xmlhttpRequest({
	      method: 'GET',
              //url: 'http://www.courtrivals.com/teams.php', // this is the only way to see chems it appears
              url: 'http://www.courtrivals.com/ajax/Team-Roster.php',
	      headers: {
	         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	         'Accept': 'application/atom+xml,application/xml,text/xml',
	      },
	      onload: function(chem) {
			var data = chem.responseText;
			//alert(data);
			if(1)
			{
				//var chem_page_lines = data.split('changeStarter');
                                var chem_page_lines = data.split('onmouseout=');
				var re_string = player_name + "</a>";
				var re = new RegExp(re_string);
				
				
				for(var i=0; i < chem_page_lines.length; i++)
				{	
					var OK = re.exec(chem_page_lines[i]);	
					
					if(re.test(chem_page_lines[i]))
					{					
						var find_chem_re = /\\\((.*) Level (\d)\\\) with /;
						var OK_2 = find_chem_re.exec(chem_page_lines[i]);
						
						if(OK_2 && (OK_2[1] && OK_2[2]))
						{
							//alert(OK_2[1] + ' = ' + OK_2[2]);
							// Look for oAttributes name equal to OK[1]
							for(var j = 0; j < oAttributes.length; j++)
							{
								if(oAttributes[j].name == OK_2[1])
								{
									oAttributes[j].chem = OK_2[2];
									//alert('set ' + oAttributes[j].name + ' to chem value ' + oAttributes[j].chem);
								}
							}
						}
					}
				}


			   	// ==============================================================================
				//  At this point we should have chems and skills so we can figure out attributes prior to chems
				// ==============================================================================	
				var sk_ctr = 0;
				for(var j = 0; j < oAttributes.length; j++)
				{
					//alert('j = ' + j + ' with this attribute being ' + oAttributes[j].name);
				
					oAttributes[j].adjustedValue = oAttributes[j].value;
					
					// First thing is to multiply by any skills
					if(oAttributes[j].name == "Speed")
					{
						for(sk_ctr = 0; sk_ctr < oSkills.length; sk_ctr++)
						{
							if( (oSkills[sk_ctr].name == "Quick Feet"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (1.5 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
						}
					}
					else if(oAttributes[j].name == "Ball Handling")
					{
						for(sk_ctr = 0; sk_ctr < oSkills.length; sk_ctr++)
						{
							if( (oSkills[sk_ctr].name == "Hand-in-Hand"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (1.5 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
							else if( (oSkills[sk_ctr].name == "Fundamentals"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (0.25 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
						}
					}
					else if(oAttributes[j].name == "Passing")
					{
						for(sk_ctr = 0; sk_ctr < oSkills.length; sk_ctr++)
						{
							if( (oSkills[sk_ctr].name == "Court Vision"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (1.5 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
						}
					}
					else if(oAttributes[j].name == "Shooting")
					{
						for(sk_ctr = 0; sk_ctr < oSkills.length; sk_ctr++)
						{
							//alert('In ' + oAttributes[j].name + ' looking at a skill of ' + oSkills[sk_ctr].name);
						
							if( (oSkills[sk_ctr].name == "Smooth Shooting"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (1.5 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name + ' with adjusted value ' + oAttributes[j].adjustedValue);
							}
							else if( (oSkills[sk_ctr].name == "Triple Threat"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (0.25 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
						}
					}
					else if(oAttributes[j].name == "3 Point Shooting")
					{
						for(sk_ctr = 0; sk_ctr < oSkills.length; sk_ctr++)
						{
							if( (oSkills[sk_ctr].name == "Sharpshooter"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (1.5 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
							else if( (oSkills[sk_ctr].name == "Triple Threat"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (0.25 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
						}
					}
					else if(oAttributes[j].name == "Free Throws")
					{
						for(sk_ctr = 0; sk_ctr < oSkills.length; sk_ctr++)
						{
							if( (oSkills[sk_ctr].name == "Perfect Form"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (1.5 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
							else if( (oSkills[sk_ctr].name == "Fundamentals"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (0.25 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
						}
					}
					else if(oAttributes[j].name == "Dunking")
					{
						for(sk_ctr = 0; sk_ctr < oSkills.length; sk_ctr++)
						{
							if( (oSkills[sk_ctr].name == "Inside Presence"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (1.5 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
							else if( (oSkills[sk_ctr].name == "Triple Threat"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (0.25 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
						}
					}
					else if(oAttributes[j].name == "Rebounding")
					{
						for(sk_ctr = 0; sk_ctr < oSkills.length; sk_ctr++)
						{
							if( (oSkills[sk_ctr].name == "Above the Rim"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (1.5 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
							else if( (oSkills[sk_ctr].name == "Total Coverage"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (0.25 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
						}
					}
					else if(oAttributes[j].name == "Defense")
					{
						for(sk_ctr = 0; sk_ctr < oSkills.length; sk_ctr++)
						{
							if( (oSkills[sk_ctr].name == "Blanket Defender"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (1.5 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
							else if( (oSkills[sk_ctr].name == "Total Coverage"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (0.25 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
						}
					}
					else if(oAttributes[j].name == "Blocking")
					{
						for(sk_ctr = 0; sk_ctr < oSkills.length; sk_ctr++)
						{
							if( (oSkills[sk_ctr].name == "SWAT Team"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (1.5 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
							else if( (oSkills[sk_ctr].name == "Total Coverage"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (0.25 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
						}
					}
					else if(oAttributes[j].name == "Leadership")
					{
						for(sk_ctr = 0; sk_ctr < oSkills.length; sk_ctr++)
						{
							if( (oSkills[sk_ctr].name == "Natural Leader"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (1.5 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
							else if( (oSkills[sk_ctr].name == "Fundamentals"))
							{
								oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (0.25 * oSkills[sk_ctr].value));
								//alert('Found ' + oSkills[sk_ctr].name + ' for player ' + player_name);
							}
						}
					}
				}							
			   
			    // ==============================================================================
				//  We've calculated an adjusted value with skills, now add in chems
				// ==============================================================================	
				for(var j = 0; j < oAttributes.length; j++)
				{
					//alert('Chem checks: ' + oAttributes[j].name + ' with chem value of ' + oAttributes[j].chem);
					if(oAttributes[j].chem != 0)
					{
						//alert('Found a chemistry -> ' + oAttributes[j].name + ' = ' + oAttributes[j].chem);
						oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].adjustedValue * (0.5 * oAttributes[j].chem));
					}
				}
				
				// ==============================================================================
				//  Tack on athleticism
				// ==============================================================================
				for(sk_ctr = 0; sk_ctr < oSkills.length; sk_ctr++)
				{
					if( (oSkills[sk_ctr].name == "Athleticism"))
					{
						// Loop through all attributes and add a base amount
						for(var j = 0; j < oAttributes.length; j++)
						{
							oAttributes[j].adjustedValue = +oAttributes[j].adjustedValue + (oAttributes[j].value * (oAttributes[ENDURANCE].value/100));
						}
					}
				}
				
				
				// ==============================================================================
				//  Last attribute modification....take sliders into account
				// ==============================================================================	
				
				// Slider[0] is for 3pt frequency
				if(sliders[0] < 0)
				{
					// Less 3s increase leadership and ball handling equally and take away from 3pt shooting
					var value = oAttributes[THREE_POINT_SHOOTING].adjustedValue * (-1 * sliders[0]);  // This is how much goes away....
					var adjustment = value / 2;
					oAttributes[THREE_POINT_SHOOTING].adjustedValue -= value;
					oAttributes[BALL_HANDLING].adjustedValue = +oAttributes[BALL_HANDLING].adjustedValue + adjustment;
					oAttributes[LEADERSHIP].adjustedValue = +oAttributes[LEADERSHIP].adjustedValue + adjustment;
					
				}
				else if(sliders[0] > 0)
				{
					// More 3s decrease ball handling and add to 3pt shooting
					var value = oAttributes[BALL_HANDLING].adjustedValue * sliders[0];  // This is how much goes away....
					oAttributes[BALL_HANDLING].adjustedValue -= value;
					oAttributes[THREE_POINT_SHOOTING].adjustedValue = +oAttributes[THREE_POINT_SHOOTING].adjustedValue + value;
				}
				
				// Slider[1] is for Passing/Shoot more
				if(sliders[1] < 0)
				{
					// Increases Ball Handling and Passing equally, decreases Free Throws
					var value = oAttributes[FREE_THROWS].adjustedValue * (-1 * sliders[1]);  // This is how much goes away....
					var adjustment = value / 2;
					oAttributes[FREE_THROWS].adjustedValue -= value;
					oAttributes[BALL_HANDLING].adjustedValue = +oAttributes[BALL_HANDLING].adjustedValue + adjustment;
					oAttributes[PASSING].adjustedValue = +oAttributes[PASSING].adjustedValue + adjustment;
					
				}
				else if(sliders[1] > 0)
				{
					// Increases Free Throws and Shooting equally. Decreases Passing.
					var value = oAttributes[PASSING].adjustedValue * sliders[1];  // This is how much goes away....
					var adjustment = value / 2;
					oAttributes[PASSING].adjustedValue -= value;
					oAttributes[FREE_THROWS].adjustedValue = +oAttributes[FREE_THROWS].adjustedValue + adjustment;
					oAttributes[SHOOTING].adjustedValue = +oAttributes[SHOOTING].adjustedValue + adjustment;
				}

				// Slider[2] is for Jump Shots/Attack Basket
				if(sliders[2] < 0)
				{
					// Increases Free Throws (25%) and Dunking (75%). Decreases Shooting.
					var value = oAttributes[SHOOTING].adjustedValue * (-1 * sliders[2]);  // This is how much goes away....
					var adjustment_25 = value / 4;
					var adjustment_75 = value - adjustment_25;
					
					oAttributes[SHOOTING].adjustedValue -= value;
					oAttributes[FREE_THROWS].adjustedValue = +oAttributes[FREE_THROWS].adjustedValue + adjustment_25;
					oAttributes[DUNKING].adjustedValue = +oAttributes[DUNKING].adjustedValue + adjustment_75;
					
				}
				else if(sliders[2] > 0)
				{
					// Increases Free Throws (25%) and Shooting (75%).Decreases Dunking.
					var value = oAttributes[DUNKING].adjustedValue * sliders[2];  // This is how much goes away....
					var adjustment_25 = value / 4;
					var adjustment_75 = value - adjustment_25;

					oAttributes[DUNKING].adjustedValue -= value;
					oAttributes[FREE_THROWS].adjustedValue = +oAttributes[FREE_THROWS].adjustedValue + adjustment_25;
					oAttributes[SHOOTING].adjustedValue = +oAttributes[SHOOTING].adjustedValue + adjustment_75;
				}
				
				
				// Slider[3] is for Crash Boards/Get back on D
				if(sliders[3] < 0)
				{
					// Crash the Boards - Increase Rebounding. Decrease Speed.
					var value = oAttributes[SPEED].adjustedValue * (-1 * sliders[3]);  // This is how much goes away....

					oAttributes[SPEED].adjustedValue -= value;
					oAttributes[REBOUNDING].adjustedValue = +oAttributes[REBOUNDING].adjustedValue + value;				
				}
				else if(sliders[3] > 0)
				{
					// Get Back on D - Increases Speed. Decreases Rebounding.
					var value = oAttributes[REBOUNDING].adjustedValue * sliders[3];  // This is how much goes away....

					oAttributes[REBOUNDING].adjustedValue -= value;
					oAttributes[SPEED].adjustedValue = +oAttributes[SPEED].adjustedValue + value;
				}
				
				// Slider[4] is for Take Chances/Play Conservative
				if(sliders[4] < 0)
				{
					// Take Chances - Increases Defense or Blocking (Whichever is your higher stat). Decreases Leadership.
					var value = oAttributes[LEADERSHIP].adjustedValue * (-1 * sliders[4]);  // This is how much goes away....

					oAttributes[LEADERSHIP].adjustedValue -= value;
					
					// Assuming higher stat is based on skill adjusted value...may not be true
					if( +oAttributes[DEFENSE].adjustedValue >= +oAttributes[BLOCKING].adjustedValue)
					{
						oAttributes[DEFENSE].adjustedValue = +oAttributes[DEFENSE].adjustedValue + value;			
					}						
					else
					{
						oAttributes[BLOCKING].adjustedValue = +oAttributes[BLOCKING].adjustedValue + value;
					}
				}
				else if(sliders[4] > 0)
				{
					// Play Conservative - Increases Leadership. Decreases Defense.
					var value = oAttributes[DEFENSE].adjustedValue * sliders[4];  // This is how much goes away....

					oAttributes[DEFENSE].adjustedValue -= value;
					oAttributes[LEADERSHIP].adjustedValue = +oAttributes[LEADERSHIP].adjustedValue + value;
				}
				
				
				// ==============================================================================
				//  Lets grab some old values
				// ==============================================================================
				var returnedString = GM_getValue(player_id + "_notes", null);
				var old_skill_values = new Array();
				if(returnedString)
				{
					old_skill_values = returnedString.split("\n");
				}
				
				// ==============================================================================
				//  Now put the stuff back where we can find it
				// ==============================================================================									
				var re = new RegExp('\\b' + 'loginBottomText' + '\\b');		
				var re_2 = new RegExp('\\b' + 'regTable' + '\\b');		
				var find_attributes_re = /Speed/i;
				var els = document.getElementsByTagName("*");
				var replaced = 0;
				
			 
				for(var i=0; i < els.length; i++) 
				{       
					if( (re_2.test(els[i].className)) && returnedString)
					{
						//alert('Class = ' + els[i].className + ' gives us -> ' + els[i].innerHTML);
						var my_re = new RegExp('\(<td bgcolor=.*>)(\\d+)(<\/td>\)');						
						var OK = my_re.exec(els[i].innerHTML);
						if(OK[1] && !replaced)
						{				
						
							//alert('Replacing: ' + OK[1] + ' ... ' + OK[2] + ' ... ' + OK[3] + ' as classname = ' + els[i]);
							replaced = 1;
							els[i].innerHTML = els[i].innerHTML.replace(OK[1] + OK[2] + OK[3], OK[1] + OK[2] + ' \(' + old_skill_values[ old_skill_values.length - 1] + ' @ ' + old_skill_values[old_skill_values.length - 2] + '\) ' + OK[3]);
						}
					}
					else if(re.test(els[i].className))
					{	
						if(find_attributes_re.test(els[i].innerHTML))
						{
							for(var j = 0; j < oAttributes.length; j++)
							{
								var my_re = new RegExp('\(<strong>' + oAttributes[j].name + '.*strong>\\d+\)');
								var OK = my_re.exec(els[i].innerHTML);
								if(OK[1])
								{
									var difference = 0;
									if(returnedString)
									{
										difference = oAttributes[j].value - old_skill_values[j];
									}
									
									if(difference != 0)
									{
										var symbol;
										if(difference < 0)
										{
											els[i].innerHTML = els[i].innerHTML.replace(OK[1], OK[1] + ' ' + difference + '    \(' + roundNumber(oAttributes[j].adjustedValue,2) + '\) ');
										}
										else
										{
											symbol = "+";
											els[i].innerHTML = els[i].innerHTML.replace(OK[1], OK[1] + ' +' + difference + '    \(' + roundNumber(oAttributes[j].adjustedValue,2) + '\) ');
										}
										//alert('Going to replace ' + OK[1]);
										
										//els[i].innerHTML = els[i].innerHTML.replace(OK[1], OK[1] + '  <center>\(' + oAttributes[j].adjustedValue + '\)<\/center>');
										//els[i].innerHTML = els[i].innerHTML.replace(OK[1], OK[1] + '  <nobr><div align=\"center\">\(' + oAttributes[j].adjustedValue + '\)<\/div><\/nobr>');
									}
									else
									{
										els[i].innerHTML = els[i].innerHTML.replace(OK[1], OK[1] + '     \(' + roundNumber(oAttributes[j].adjustedValue,2) + '\) ');
									}
									
								}	
							}								
						}
					}
				}
				
				
				// We still have total points too...
				if(returnedString && (total_points != old_skill_values[ old_skill_values.length - 1]) )
				{
					//alert('Looks like total points was ' + old_skill_values[ old_skill_values.length - 1] + ' but is now ' + total_points);
				}

				
				
				
				// ==============================================================================
				//  Save off the current values to determine activity.  Also tack on date/time and total points			
				// ==============================================================================	
				var currentTime = new Date();
				var month = currentTime.getMonth() + 1;
				var day = currentTime.getDate();
				var hour = currentTime.getHours();
				var min = currentTime.getMinutes();
				if (min < 10)
				{
					min = "0" + min;
				}

				var formatted_date = hour + ':' + min + ' on ' + month + '/' + day;
				var string = oAttributes[0].value + '\n';
				for(var i = 1; i < oAttributes.length; i++)
				{
					string += oAttributes[i].value + '\n';
				}
				string += formatted_date + '\n';
				string += total_points;

				GM_setValue(player_id  + "_notes",string);
			}        
	      }
	   });	
	}
	

function attributes(name, value, chem)
{
	this.name = name;
	this.value = value;
	this.chem = 0;
	this.adjustedValue = 0;
}

function skills (name, value)
{
	this.name = name;
	this.value = value;
}

function roundNumber(num, dec) 
{
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}


function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');

	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className))
		{	
			//alert('Found an element ' + els[i].innerHTML);
			a.push(els[i].innerHTML);
		}
	}
	return a;
};


}, 100);