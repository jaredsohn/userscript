// ==UserScript==
// @version		1.19
// @name		EU2 Beyond
// @author		PimpTrizkit
// @namespace	PimpNation
// @include		http://*.looki.*/*
// @exclude		http://www.looki.*

// ==/UserScript==
//GM_log (document.documentElement.innerHTML);
// ***** BEGIN ***** EU2 BEYOND ***** //
// ***** BEGIN ***** VARIABLE DECLARATIONS *****//
var starttime = new Date().getTime();
var eu2bLoadTimeLabelDiv = null;
var tDiv,tDiv2, eu2bButtonsDiv, eu2bMainButtonDiv, eu2bMainDiv, eu2bChatButtonDiv,eu2bSearchButtonDiv,eu2bSearchDiv ;
var ssPlanetsButtonDiv, ssFleetsButtonDiv,ssWormholesButtonDiv,ssWreckagesButtonDiv,ssAsteroidsButtonDiv,eu2bGalaxyMapDiv,eu2bRoidsButtonDiv,eu2bRoidsDiv;
var ssPlanetsListDiv,ssFleetsListDiv,ssWormholesListDiv,ssWreckagesListDiv,ssAsteroidsListDiv,cSS,eu2bWreckagesDiv,eu2bWreckagesButtonDiv;
var eu2bWormholesButtonDiv,eu2bWormholesDiv,myFleets,eu2bOptionsButtonDiv,eu2bOptionsDiv, myLangArray, myServer, myP;
var eu2bWormholesRouteDiv,eu2bWormRouteButtonDiv, eu2MinRouteTemp,triangulationString;
var orbTypes = ["Planets","Fleets","Asteroids","Wreckages", "Wormholes"];
var myLocation = document.location.href;
var eu2bVersion = "1.18";
var LOG_LEVEL = 0; // 0 = quiet , 1 = noisy
var thisElem, nextElem, researchTimer, researchPercent, researchMinutesPassed, researchHoursPassed, researchDaysPassed,researchTimeLeft, researchDaysLeft, researchHoursLeft, researchMinutesLeft, researchDateDone, myElem; //variables for Research Time
// ***** END ***** VARIABLE DECLARATIONS *****//
// ***** BEGIN ***** FUNCTION DECLARATIONS *****//

function bLog(tString) {
	if ( LOG_LEVEL == 1 ) GM_log (tString);
}

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function getLangArray ( myLoc ){
	var newLang = myLoc.match(/\.([a-zA-Z0-9]*)(?=\/)/)[1];
	myServer = myLoc.match(/http:\/\/([a-zA-Z0-9]*)\./)[1] + "-" + newLang;
	bLog("server = " + myServer );
	var newLangArray;
	switch(newLang){
	  // German - by Pimp Trizkit
		case "de":		newLangArray = [["Freie Schiffe","Rohstoffe", "Asteroiden", "Trümmer", "components", "resources", "stuff", "Battle"], // These words must be as they appear in EU2 or else functionality is lost."Free Ships" is seen on the EU2 Fleets screen. Its the second tab's name. "Resources" is seen when loading/unloading cargo at a planet. Its the first tab name. "Asteroiden" and "Wreckage" is used to detect objects in the StarSystem screen.
										["Chat","Main","Roids","Wreckages","Wormhole","Search","Battles", "Options", "WH Route","Find SS"], // eu2b Buttons
										["Total Asteroids","Total Wreckages","Total Wormholes","Total Results"], // Totals
										["Objects","Star Systems","Planets","Fleets","Asteroids","Wreckages","Wormholes", "Keep<br>Current", "Goto", "Star System", "Star System not in Database!"], // eu2b Main screen words
										["Total","empty cargo", "mins (or", "hrs)", "to deplete","till full", "res"], // eu2b words added to EU2 Collect screen
										["Freie Schiffe auf", "Rohstoffe auf", "empty", "Asc", "Dec", "Reload", "load:", "ms", "None", "no info", "Asteroiden", "Trümmer", "Benötigte XP", "Error", "Not Miner", "Full", "In Use", "Goto Options, Click <i>Save New</i> for ", " to update this screen."], // Other words used
										["Delete","Database","Click OK to Delete All the", "-&nbsp;Delete&nbsp;-<br>-&nbsp;Databases&nbsp;-","+&nbsp;Save&nbsp;+", "Keep Saved", "All", "New&nbsp;Data", "+&nbsp;New&nbsp;+<br>+&nbsp;Data&nbsp;+", "Delete&nbsp;New", "Save&nbsp;New", "Save database on exit, close, reload and unload."], // All those words on the eu2b options screen
										["Direct", "WH", "to", "Processing", "Please Wait!", "Your Browser will be frozen during this time.", "Improper Data.", "The Best Route I Can Find Is The Long Way:", "pc", "Just take the wormhole:", "Calculated in",  "seconds.", "Duplicates Removed", "Permutations", "Direct Route", "End", "WHs", "Distance", "Saved", "Find", "From:", "To:", "-- To Calculate route --<br>1)Indicate the source system.<br>2)Indicate the target system<br>3)Click on 'Find'<br><br>Warning! This could take several seconds! Depending on the number of wormholes in your database and the speed of your computer.<br><br>This <i>will</i> find the best possible route using 3 wormholes or less."], //Words on the Wormhole travel planner
										["System","Distance","The first and/or second SS # and/or Distances are bad.","The third SS # and/or Distance is bad.","Either, the distance between SS 1 and 2 is zero, or they are too far apart, or one is contained inside the other.", "The distances between SS 1 and 3 and/or between 2 and 3 are either: zero, or too far apart, or one is inside the other.","Pairs","Intersects","Averaged Intersects","Result","Other Guesses","-- To find a Star System --<br>1) Enter the Star System #  and its distance to an unknown Star System.<br>2) Click Find.<br><br><i><b>Note:</b> You must use atleast 2 Star Systems (SS) and 2 distances (you will get two possible results). If you use 3 SSs and 3 distances you will get one result.</i>"], //Words on the triangulation tool
                                        ["The exploration of new technology gets started now!","The beginnings are always the hardest, but our research launch went smoothly.","Taking small technical difficulties aside, our work so far is almost no problem.","We have now completed the concept phase and are trying the first prototypes.","We are still balancing small setbacks, but we are not far from our goal.","We now have the first quarter complete, slowly but surely our ideas become reality.","We have successfully implemented expert indications into the plans, allowing us to perfect the technology even further.","Some subtle changes had to be made to the basic design, so we may be delayed.","Major problems now belong to the past, we are now ready to take the technology outside of laboratory conditions.","The first test failed, but our researchers have already discovered the error and fixed it.","Most give up halfway, when research won't work, but we will continue working our hardest.","We are nearing the completion of our first prototypes, and we have completed more than half of the planned research.","The many hours of hard work are paying off now, despite several setbacks - the prototype seems to be working smoothly.","We have assigned several teams of experts to identify and eliminate any flaws in the technology, so we can prevent failures in the future.","No significant problems were reported during the troubleshooting, so we now begin the last stage wholeheartedly!","The final run begins, it can not be long before we have the research done.","We are proceeding on schedule and the final tests are nearing completion.","We have the bulk of the research behind us, we now need to concentrate on fine-tuning the smaller details.","Our Scientists are still working under high pressure.","The new technology will be available soon.","Our research will be finished within the next few minutes!"]]; //Words for determining percent status on research. (May Need Translating)
						break;
		// French - by Pimp Trizkit
		case "fr":		newLangArray = 	[["Vaisseaux disponibles","Ressources", "Asteroiden", "Champs de débris ", "components", "resources", "stuff", "Battle"], // These words must be as they appear in EU2 or else functionality is lost."Free Ships" is seen on the EU2 Fleets screen. Its the second tab's name. "Resources" is seen when loading/unloading cargo at a planet. Its the first tab name. "Asteroiden" and "Wreckage" is used to detect objects in the StarSystem screen.
										["Chat","Main","Roids","Wreckages","Wormhole","Search","Battles", "Options", "WH Route","Find SS"], // eu2b Buttons
										["Total Asteroids","Total Wreckages","Total Wormholes","Total Results"], // Totals
										["Objets","Système sol","Planètes","Flottes","Astéroïdes","épaves","trous de ver", "se tenir<br>au courant", "Aller", "Système sol", "Ce système solaire n'est pas dans la base de données!"], // eu2b Main screen words
										//["Objects","Star Systems","Planets","Fleets","Asteroids","Wreckages","Wormholes", "Keep<br>Current", "Goto", "Star System", "Ce système solaire n'est pas dans la base"],
										["Total","empty cargo", "mins (or", "hrs)", "to deplete","till full", "res"], // eu2b words added to EU2 Collect screen
										["Vaisseaux disponibles à", "Ressources à", "empty", "Asc", "Dec", "Reload", "load:", "ms", "Aucun", "pas d`info", "Astéroïde", "Champs de débris", "Nécessaire XP", "Error", "Not Miner", "Full", "In Use", "Goto Options, Click <i>Save New</i> for ", " to update this screen."], // Other words used
										["Supprimer","Database","Click OK to Delete All the", "-&nbsp;Delete&nbsp;-<br>-&nbsp;Databases&nbsp;-","+&nbsp;Save&nbsp;+", "Keep Saved", "All", "New&nbsp;Data", "+&nbsp;New&nbsp;+<br>+&nbsp;Data&nbsp;+", "Delete&nbsp;New", "Save&nbsp;New", "Save database on exit, close, reload and unload."], // All those words on the eu2b options screen
										["Direct", "WH", "to", "Processing", "Please Wait!", "Your Browser will be frozen during this time.", "Improper Data.", "The Best Route I Can Find Is The Long Way:", "pc", "Just take the wormhole:", "Calculated in",  "seconds.", "Duplicates Removed", "Permutations", "Direct Route", "End", "WHs", "Distance", "Saved", "Find", "From:", "To:", "-- To Calculate route --<br>1)Indicate the source system.<br>2)Indicate the target system<br>3)Click on 'Find'<br><br>Warning! This could take several seconds! Depending on the number of wormholes in your database and the speed of your computer.<br><br>This <i>will</i> find the best possible route using 3 wormholes or less."], //Words on the Wormhole travel planner
										["Système","Distance","The first and/or second SS # and/or Distances are bad.","The third SS # and/or Distance is bad.","Either, the distance between SS 1 and 2 is zero, or they are too far apart, or one is contained inside the other.", "The distances between SS 1 and 3 and/or between 2 and 3 are either: zero, or too far apart, or one is inside the other.","Pairs","Intersects","Averaged Intersects","Result","Other Guesses","-- To find a Star System --<br>1) Enter the Star System #  and its distance to an unknown Star System.<br>2) Click Find.<br><br><i><b>Note:</b> You must use atleast 2 Star Systems (SS) and 2 distances (you will get two possible results). If you use 3 SSs and 3 distances you will get one result.</i>"], //Words on the triangulation tool
                                        ["The exploration of new technology gets started now!","The beginnings are always the hardest, but our research launch went smoothly.","Taking small technical difficulties aside, our work so far is almost no problem.","We have now completed the concept phase and are trying the first prototypes.","We are still balancing small setbacks, but we are not far from our goal.","We now have the first quarter complete, slowly but surely our ideas become reality.","We have successfully implemented expert indications into the plans, allowing us to perfect the technology even further.","Some subtle changes had to be made to the basic design, so we may be delayed.","Major problems now belong to the past, we are now ready to take the technology outside of laboratory conditions.","The first test failed, but our researchers have already discovered the error and fixed it.","Most give up halfway, when research won't work, but we will continue working our hardest.","We are nearing the completion of our first prototypes, and we have completed more than half of the planned research.","The many hours of hard work are paying off now, despite several setbacks - the prototype seems to be working smoothly.","We have assigned several teams of experts to identify and eliminate any flaws in the technology, so we can prevent failures in the future.","No significant problems were reported during the troubleshooting, so we now begin the last stage wholeheartedly!","The final run begins, it can not be long before we have the research done.","We are proceeding on schedule and the final tests are nearing completion.","We have the bulk of the research behind us, we now need to concentrate on fine-tuning the smaller details.","Our Scientists are still working under high pressure.","The new technology will be available soon.","Our research will be finished within the next few minutes!"]]; //Words for determining percent status on research. (May Need Translating)
						break;
		// Nederland - by King Solomon
		case "nl": 		newLangArray = [["Vrije Schepen","grondstoffen", "Asteroiden", "Wrak", "components", "resources", "stuff", "Battle"], // These words must be as they appear in EU2 or else functionality is lost."Free Ships" is seen on the EU2 Fleets screen. Its the second tab's name. "Resources" is seen when loading/unloading cargo at a planet. Its the first tab name. "Asteroiden" and "Wreckage" is used to detect objects in the StarSystem screen.
										["Chat","Main","Roids","Wreckages","Wormhole","Search","Battles", "Options", "WH Route","Find SS"], // eu2b Buttons
										["Total Asteroids","Total Wrecks","Total Wormholes","Total Results"], // Totals
										["Objects","Star Systems","Planets","Fleets","Asteroids","Wreckages","Wormholes", "Keep<br>Current", "Goto", "Star System", "Star System not in Database!"], // eu2b Main screen words
										["Total","empty cargo", "mins (or", "hrs)", "to deplete","till full", "res"], // eu2b words added to EU2 Collect screen
										["Free Ships at", "Resources at", "empty", "Asc", "Dec", "Reload", "t=", "ms", "None", "no info", "Asteroid", "Wreckage", "Nodig XP", "Error", "Not Miner", "Full", "In Use", "Goto Options, Click <i>Save New</i> for ", " to update this screen."], // Other words used
										["Delete","Database","Click OK to Delete All the", "-&nbsp;Delete&nbsp;-<br>-&nbsp;Databases&nbsp;-","+&nbsp;Save&nbsp;+", "Keep Saved", "All", "New&nbsp;Data", "+&nbsp;New&nbsp;+<br>+&nbsp;Data&nbsp;+", "Delete&nbsp;New", "Save&nbsp;New", "Save database on exit, close, reload and unload."], // All those words on the eu2b options screen
										["Direct", "WH", "to", "Processing", "Please Wait!", "Your Browser will be frozen during this time.", "Improper Data.", "The Best Route I Can Find Is The Long Way:", "pc", "Just take the wormhole:", "Calculated in",  "seconds.", "Duplicates Removed", "Permutations", "Direct Route", "End", "WHs", "Distance", "Saved", "Find", "From:", "To:", "-- To Calculate route --<br>1)Indicate the source system.<br>2)Indicate the target system<br>3)Click on 'Find'<br><br>Warning! This could take several seconds! Depending on the number of wormholes in your database and the speed of your computer.<br><br>This <i>will</i> find the best possible route using 3 wormholes or less."], //Words on the Wormhole travel planner
										["System","Distance","The first and/or second SS # and/or Distances are bad.","The third SS # and/or Distance is bad.","Either, the distance between SS 1 and 2 is zero, or they are too far apart, or one is contained inside the other.", "The distances between SS 1 and 3 and/or between 2 and 3 are either: zero, or too far apart, or one is inside the other.","Pairs","Intersects","Averaged Intersects","Result","Other Guesses","-- To find a Star System --<br>1) Enter the Star System #  and its distance to an unknown Star System.<br>2) Click Find.<br><br><i><b>Note:</b> You must use atleast 2 Star Systems (SS) and 2 distances (you will get two possible results). If you use 3 SSs and 3 distances you will get one result.</i>"], //Words on the triangulation tool
                                        ["The exploration of new technology gets started now!","The beginnings are always the hardest, but our research launch went smoothly.","Taking small technical difficulties aside, our work so far is almost no problem.","We have now completed the concept phase and are trying the first prototypes.","We are still balancing small setbacks, but we are not far from our goal.","We now have the first quarter complete, slowly but surely our ideas become reality.","We have successfully implemented expert indications into the plans, allowing us to perfect the technology even further.","Some subtle changes had to be made to the basic design, so we may be delayed.","Major problems now belong to the past, we are now ready to take the technology outside of laboratory conditions.","The first test failed, but our researchers have already discovered the error and fixed it.","Most give up halfway, when research won't work, but we will continue working our hardest.","We are nearing the completion of our first prototypes, and we have completed more than half of the planned research.","The many hours of hard work are paying off now, despite several setbacks - the prototype seems to be working smoothly.","We have assigned several teams of experts to identify and eliminate any flaws in the technology, so we can prevent failures in the future.","No significant problems were reported during the troubleshooting, so we now begin the last stage wholeheartedly!","The final run begins, it can not be long before we have the research done.","We are proceeding on schedule and the final tests are nearing completion.","We have the bulk of the research behind us, we now need to concentrate on fine-tuning the smaller details.","Our Scientists are still working under high pressure.","The new technology will be available soon.","Our research will be finished within the next few minutes!"]]; //Words for determining percent status on research. (May Need Translating)
						break;
		// Turkey - by nemox
		case "tr": 		newLangArray = [["Bostaki gemiler","Hammadde", "Asteroiden", "Enkaz" , "components", "resources", "stuff", "Battle"],// These words must be as they appear in EU2 or else functionality is lost."Free Ships" is seen on the EU2 Fleets screen. Its the second tab's name. "Resources" is seen when loading/unloading cargo at a planet. Its the first tab name. "Asteroiden" and "Wreckage" is used to detect objects in the StarSystem screen.
										["Chat","Main","Roids","Wreckages","Wormhole","Search","Battles", "Options", "WH Route","Find SS"], // eu2b Buttons
										["Total Asteroids","Total Wrecks","Total Wormholes","Total Results"], // Totals
										["Objects","Star Systems","Planets","Fleets","Asteroids","Wreckages","Wormholes", "Keep<br>Current", "Goto", "Star System", "Star System not in Database!"], // eu2b Main screen words
										["Total","empty cargo", "mins (or", "hrs)", "to deplete","till full", "res"], // eu2b words added to EU2 Collect screen
										["Free Ships at", "Resources at", "empty", "Asc", "Dec", "Reload", "t=", "ms", "None", "no info", "Göktasi", "Enkaz", "Nodig XP", "Error", "Not Miner", "Full", "In Use", "Goto Options, Click <i>Save New</i> for ", " to update this screen."], // Other words used
										["Delete","Database","Click OK to Delete All the", "-&nbsp;Delete&nbsp;-<br>-&nbsp;Databases&nbsp;-","+&nbsp;Save&nbsp;+", "Keep Saved", "All", "New&nbsp;Data", "+&nbsp;New&nbsp;+<br>+&nbsp;Data&nbsp;+", "Delete&nbsp;New", "Save&nbsp;New", "Save database on exit, close, reload and unload."], // All those words on the eu2b options screen
										["Direct", "WH", "to", "Processing", "Please Wait!", "Your Browser will be frozen during this time.", "Improper Data.", "The Best Route I Can Find Is The Long Way:", "pc", "Just take the wormhole:", "Calculated in",  "seconds.", "Duplicates Removed", "Permutations", "Direct Route", "End", "WHs", "Distance", "Saved", "Find", "From:", "To:", "-- To Calculate route --<br>1)Indicate the source system.<br>2)Indicate the target system<br>3)Click on 'Find'<br><br>Warning! This could take several seconds! Depending on the number of wormholes in your database and the speed of your computer.<br><br>This <i>will</i> find the best possible route using 3 wormholes or less."], //Words on the Wormhole travel planner
										["System","Distance","The first and/or second SS # and/or Distances are bad.","The third SS # and/or Distance is bad.","Either, the distance between SS 1 and 2 is zero, or they are too far apart, or one is contained inside the other.", "The distances between SS 1 and 3 and/or between 2 and 3 are either: zero, or too far apart, or one is inside the other.","Pairs","Intersects","Averaged Intersects","Result","Other Guesses","-- To find a Star System --<br>1) Enter the Star System #  and its distance to an unknown Star System.<br>2) Click Find.<br><br><i><b>Note:</b> You must use atleast 2 Star Systems (SS) and 2 distances (you will get two possible results). If you use 3 SSs and 3 distances you will get one result.</i>"], //Words on the triangulation tool
                                        ["The exploration of new technology gets started now!","The beginnings are always the hardest, but our research launch went smoothly.","Taking small technical difficulties aside, our work so far is almost no problem.","We have now completed the concept phase and are trying the first prototypes.","We are still balancing small setbacks, but we are not far from our goal.","We now have the first quarter complete, slowly but surely our ideas become reality.","We have successfully implemented expert indications into the plans, allowing us to perfect the technology even further.","Some subtle changes had to be made to the basic design, so we may be delayed.","Major problems now belong to the past, we are now ready to take the technology outside of laboratory conditions.","The first test failed, but our researchers have already discovered the error and fixed it.","Most give up halfway, when research won't work, but we will continue working our hardest.","We are nearing the completion of our first prototypes, and we have completed more than half of the planned research.","The many hours of hard work are paying off now, despite several setbacks - the prototype seems to be working smoothly.","We have assigned several teams of experts to identify and eliminate any flaws in the technology, so we can prevent failures in the future.","No significant problems were reported during the troubleshooting, so we now begin the last stage wholeheartedly!","The final run begins, it can not be long before we have the research done.","We are proceeding on schedule and the final tests are nearing completion.","We have the bulk of the research behind us, we now need to concentrate on fine-tuning the smaller details.","Our Scientists are still working under high pressure.","The new technology will be available soon.","Our research will be finished within the next few minutes!"]]; //Words for determining percent status on research. (May Need Translating)
						break;
		// Polish - by MrHayt 
		case "pl":		newLangArray = 	[["Wolne statki","Surowce", "Asteroid", "Zlom", "components", "resources", "stuff", "Battle"], // These words must be as they appear in EU2 or else functionality is lost."Free Ships" is seen on the EU2 Fleets screen. Its the second tab's name. "Resources" is seen when loading/unloading cargo at a planet. Its the first tab name. "Asteroiden" and "Wreckage" is used to detect objects in the StarSystem screen.
										["Chat","Main","Aster","Pola zlomu","Czerwotocze","Szukaj","Battles", "Opcje", "WH Route","Find SS"], // eu2b Buttons
										["Wszystkie Asteroid","Caly Zlom","Wszystkie Czerwotocze","Wszystkie Wyniki"], // Totals
										["Obiektów","Sys.Gw.","Planet","Flot","Asteroid","Zlomu","Czerwotoczy", "Zachowaj<br>Aktualne", "Iz do", "Sys.Gw.", "Sytemu Gwiezdnego nie ma w Bazie!"], // eu2b Main screen words
										["Razem","Wolna ladownosc", "min. (lub", "godz.)", "Do zebrania","Do pelna", "jednostek"], // eu2b words added to EU2 Collect screen
										["Wolnych statków na", "Surowców na", "pusty", "1>9", "9>1", "Reload", "load:", "ms", "brak", "brak info", "Asteroida", "Zlom", "Potrzebne XP", "Error", "Not Miner", "Full", "In Use", "Goto Options, Click <i>Save New</i> for ", " to update this screen."], // Other words used
										["Usun","Bazy","Kliknij OK Aby usunac wszstkie", "-&nbsp;Delete&nbsp;-<br>-&nbsp;Databases&nbsp;-","+&nbsp;Save&nbsp;+", "Keep Saved", "All", "New&nbsp;Data", "+&nbsp;New&nbsp;+<br>+&nbsp;Data&nbsp;+", "Delete&nbsp;New", "Save&nbsp;New", "Save database on exit, close, reload and unload."], // All those words on the eu2b options screen
										["Direct", "WH", "to", "Processing", "Please Wait!", "Your Browser will be frozen during this time.", "Improper Data.", "The Best Route I Can Find Is The Long Way:", "pc", "Just take the wormhole:", "Calculated in",  "seconds.", "Duplicates Removed", "Permutations", "Direct Route", "End", "WHs", "Distance", "Saved", "Find", "From:", "To:", "-- To Calculate route --<br>1)Indicate the source system.<br>2)Indicate the target system<br>3)Click on 'Find'<br><br>Warning! This could take several seconds! Depending on the number of wormholes in your database and the speed of your computer.<br><br>This <i>will</i> find the best possible route using 3 wormholes or less."], //Words on the Wormhole travel planner
										["System","Distance","The first and/or second SS # and/or Distances are bad.","The third SS # and/or Distance is bad.","Either, the distance between SS 1 and 2 is zero, or they are too far apart, or one is contained inside the other.", "The distances between SS 1 and 3 and/or between 2 and 3 are either: zero, or too far apart, or one is inside the other.","Pairs","Intersects","Averaged Intersects","Result","Other Guesses","-- To find a Star System --<br>1) Enter the Star System #  and its distance to an unknown Star System.<br>2) Click Find.<br><br><i><b>Note:</b> You must use atleast 2 Star Systems (SS) and 2 distances (you will get two possible results). If you use 3 SSs and 3 distances you will get one result.</i>"],
                                        ["exploration", "beginnings", "technical", "concept", "balancing", "quarter", "implemented", "subtle", "Major", "discovered", "halfway", "planned", "paying", "eliminate", "troubleshooting", "begins", "proceeding", "bulk", "pressure", "soon", "minutes"], //Words on the triangulation tool
                                        ["The exploration of new technology gets started now!","The beginnings are always the hardest, but our research launch went smoothly.","Taking small technical difficulties aside, our work so far is almost no problem.","We have now completed the concept phase and are trying the first prototypes.","We are still balancing small setbacks, but we are not far from our goal.","We now have the first quarter complete, slowly but surely our ideas become reality.","We have successfully implemented expert indications into the plans, allowing us to perfect the technology even further.","Some subtle changes had to be made to the basic design, so we may be delayed.","Major problems now belong to the past, we are now ready to take the technology outside of laboratory conditions.","The first test failed, but our researchers have already discovered the error and fixed it.","Most give up halfway, when research won't work, but we will continue working our hardest.","We are nearing the completion of our first prototypes, and we have completed more than half of the planned research.","The many hours of hard work are paying off now, despite several setbacks - the prototype seems to be working smoothly.","We have assigned several teams of experts to identify and eliminate any flaws in the technology, so we can prevent failures in the future.","No significant problems were reported during the troubleshooting, so we now begin the last stage wholeheartedly!","The final run begins, it can not be long before we have the research done.","We are proceeding on schedule and the final tests are nearing completion.","We have the bulk of the research behind us, we now need to concentrate on fine-tuning the smaller details.","Our Scientists are still working under high pressure.","The new technology will be available soon.","Our research will be finished within the next few minutes!"]]; //Words for determining percent status on research. (May Need Translating)
						break;
		// English - by Pimp Trizkit
		case "com":
		default:		newLangArray = [["Free ships","Resources", "Asteroids", "Wreckage", "components" , "Resources", "stuff", "Battle"], // These words must be as they appear in EU2 or else functionality is lost."Free Ships" is seen on the EU2 Fleets screen. Its the second tab's name. "Resources" is seen when loading/unloading cargo at a planet. Its the first tab name. "Asteroiden" and "Wreckage" is used to detect objects in the StarSystem screen.
										["Chat","Main","Roids","Wreckages","Wormhole","Search", "Battles", "Options", "WH Route","Find SS"], // eu2b Buttons
										["Total Asteroids","Total Wreckages","Total Wormholes","Total Results"], // Totals
										["Objects","Star Systems","Planets","Fleets","Asteroids","Wreckages","Wormholes", "Keep<br>Current", "Goto", "Star System", "Star System not in Database!"], // eu2b Main screen words. Also used on buttons in Options screen.
										["Total","empty cargo", "mins (or", "hrs)", "to deplete","till full", "res"], // eu2b words added to EU2 Collect screen
										["Free Ships at", "Resources at", "empty", "Asc", "Dec", "Reload", "load:", "ms", "None", "no info", "Asteroid", "Wreckage", "Needed XP", "Error", "Not Miner", "Full", "In Use", "Goto Options, Click <i>Save New</i> for ", " to update this screen."], // Other words used
										["Delete","Database","Click OK to Delete All the", "-&nbsp;Delete&nbsp;-<br>-&nbsp;Databases&nbsp;-","+&nbsp;Save&nbsp;+", "Keep Saved", "All", "New&nbsp;Data", "+&nbsp;New&nbsp;+<br>+&nbsp;Data&nbsp;+", "Delete&nbsp;New", "Save&nbsp;New", "Save database on exit, close, reload and unload."], // All those words on the eu2b options screen
										["Direct", "WH", "to", "Processing", "Please Wait!", "Your Browser will be frozen during this time.", "Improper Data.", "The Best Route I Can Find Is The Long Way:", "pc", "Just take the wormhole:", "Calculated in",  "seconds.", "Duplicates", "Permutations", "Direct Route", "End", "WHs", "Distance", "Saved", "Find", "From:", "To:", "-- To Calculate route --<br>1)Indicate the source system.<br>2)Indicate the target system<br>3)Click on 'Find'<br><br>Warning! This could take several seconds! Depending on the number of wormholes in your database and the speed of your computer.<br><br>This <i>will</i> find the best possible route using 3 wormholes or less."], //Words on the Wormhole travel planner
										["System","Distance","The first and/or second SS # and/or Distances are bad.","The third SS # and/or Distance is bad.","Either, the distance between SS 1 and 2 is zero, or they are too far apart, or one is contained inside the other.", "The distances between SS 1 and 3 and/or between 2 and 3 are either: zero, or too far apart, or one is inside the other.","Pairs","Intersects","Averaged Intersects","Result","Other Guesses","-- To find a Star System --<br>1) Enter the Star System #  and its distance to an unknown Star System.<br>2) Click Find.<br><br><i><b>Note:</b> You must use atleast 2 Star Systems (SS) and 2 distances (you will get two possible results). If you use 3 SSs and 3 distances you will get one result.</i>"], //Words on the triangulation tool
                                        ["The exploration of new technology gets started now!","The beginnings are always the hardest, but our research launch went smoothly.","Taking small technical difficulties aside, our work so far is almost no problem.","We have now completed the concept phase and are trying the first prototypes.","We are still balancing small setbacks, but we are not far from our goal.","We now have the first quarter complete, slowly but surely our ideas become reality.","We have successfully implemented expert indications into the plans, allowing us to perfect the technology even further.","Some subtle changes had to be made to the basic design, so we may be delayed.","Major problems now belong to the past, we are now ready to take the technology outside of laboratory conditions.","The first test failed, but our researchers have already discovered the error and fixed it.","Most give up halfway, when research won't work, but we will continue working our hardest.","We are nearing the completion of our first prototypes, and we have completed more than half of the planned research.","The many hours of hard work are paying off now, despite several setbacks - the prototype seems to be working smoothly.","We have assigned several teams of experts to identify and eliminate any flaws in the technology, so we can prevent failures in the future.","No significant problems were reported during the troubleshooting, so we now begin the last stage wholeheartedly!","The final run begins, it can not be long before we have the research done.","We are proceeding on schedule and the final tests are nearing completion.","We have the bulk of the research behind us, we now need to concentrate on fine-tuning the smaller details.","Our Scientists are still working under high pressure.","The new technology will be available soon.","Our research will be finished within the next few minutes!"]]; //Words for determining percent status on research.
						break;
	}
	return newLangArray;
}

function loadData () {
	var tCoords,ss,x,y,z, tO;
	cSS = unsafeWindow.starsystem_id;
	if ( typeof(cSS) == "undefined" ) cSS = getVal("currentSS" , 0);
	bLog("Loading..   cSS = " + cSS + "  unsafeSS = " + unsafeWindow.starsystem_id);

	if ( typeof (myP.myOrbs) == "undefined" || myP.myOrbs == null || typeof (myP.myTotals) == "undefined" || myP.myTotals == null) {
		bLog("parent.myOrbs is undefined... Loading database into parent.");
		myP.myTotals = new Object();
		myP.myTotals["Planets"] = 0;
		myP.myTotals["Fleets"] = 0;
		myP.myTotals["Wormholes"] = 0;
		myP.myTotals["Wreckages"] = 0;
		myP.myTotals["Asteroids"] = 0;
		myP.myTotals["Orbs"] = 0;
		myP.myTotals["StarSystems"] = 0;
		myP.myOrbs = new Object();	
	} else {
		bLog("Using exisiting database in parent.");
	}
	for ( var j = 0 ; j < orbTypes.length ; ++j ) addIndexFromDatabase(orbTypes[j]);

}

function addIndexFromDatabase(index) {
	if ( typeof(myP.myOrbs[index]) != "undefined" && myP.myOrbs[index] != null ) return;
	myP.myOrbs[index] = new Object();
	var Orbs = myP.myOrbs;
	var tOrbTot = myP.myTotals;
	var tP = getVal(index,"").split("ì");
	tOrbTot[index] = (tP.length-1);
	tOrbTot["Orbs"] += tOrbTot[index];
	for ( var i = 0 ; i < (tP.length-1) ; ++i ) {
		tP[i] = tP[i].split("¬");
		tCoords = tP[i][0].split(":");
		ss = "s" + tCoords[0];
		x = "x" + tCoords[1];
		y = "y" + tCoords[2];
		z = "z" + tCoords[3];
		if ( typeof(Orbs[index][ss]) == "undefined" ) {
			if ( index == "Planets" ) ++tOrbTot["StarSystems"];
			Orbs[index][ss] = new Object();
		}
		if ( typeof(Orbs[index][ss][x]) == "undefined" ) Orbs[index][ss][x] = new Object();
		if ( typeof(Orbs[index][ss][x][y]) == "undefined" ) Orbs[index][ss][x][y] = new Object();
		if ( typeof(Orbs[index][ss][x][y][z]) == "undefined" ) Orbs[index][ss][x][y][z] = new Object();
		else bLog ("Duplicate in dataBase");
		Orbs[index][ss][x][y][z].coords = tP[i][0];
		Orbs[index][ss][x][y][z].name = tP[i][1];
		if ( (index == "Asteroids" || index == "Wreckages") && (typeof(tP[i][1]) == "undefined" || tP[i][1] == null || tP[i][1] == "" ) ) Orbs[index][ss][x][y][z].name = myLangArray[5][9];
		if ( index == "Planets" || index == "Fleets" ) Orbs[index][ss][x][y][z].alignment = tP[i][2];
	}
}

function addOrbData(dBase, index, tOrbArray, tSS) {
	var SS = "s" + tSS;
	var X = parseInt(tOrbArray[1]) + 50;
	var Y = parseInt(tOrbArray[2]) + 50;
	var Z = parseInt(tOrbArray[3]) + 50;
	var XX = "x" + X;
	var YY = "y" + Y;
	var ZZ = "z" + Z;
	if ( typeof(dBase[index][SS]) == "undefined"				|| dBase[index][SS] == null)				dBase[index][SS] = new Object();
	if ( typeof(dBase[index][SS][XX]) == "undefined"			|| dBase[index][SS][XX] == null)			dBase[index][SS][XX] = new Object();
	if ( typeof(dBase[index][SS][XX][YY]) == "undefined" 		|| dBase[index][SS][XX][YY] == null)		dBase[index][SS][XX][YY] = new Object();
	if ( typeof(dBase[index][SS][XX][YY][ZZ]) == "undefined"	|| dBase[index][SS][XX][YY][ZZ] == null)	dBase[index][SS][XX][YY][ZZ] = new Object();
	dBase[index][SS][XX][YY][ZZ].coords = tSS + ":" + X + ":" + Y + ":" + Z;

	if ( index == "Planets" || index == "Fleets" ) {
		switch ( tOrbArray[5] ) {
			case "neutral" :	dBase[index][SS][XX][YY][ZZ].alignment = "n";
								break;
			case "emp" :		dBase[index][SS][XX][YY][ZZ].alignment = "e";
								break;
			case "nap" :		dBase[index][SS][XX][YY][ZZ].alignment = "p";
								break;
			case "ally" :		dBase[index][SS][XX][YY][ZZ].alignment = "a";
								break;
			case "own" : 		dBase[index][SS][XX][YY][ZZ].alignment = "o";
								break;
			case "ga" :			dBase[index][SS][XX][YY][ZZ].alignment = "b";
								break;
			case "war" : 		dBase[index][SS][XX][YY][ZZ].alignment = "w";
								break;
			case "npc" :		dBase[index][SS][XX][YY][ZZ].alignment = "c";
								break;
			case "enemy" :		dBase[index][SS][XX][YY][ZZ].alignment = "x";
								break;
			default:			dBase[index][SS][XX][YY][ZZ].alignment = tOrbArray[5];
								bLog ( "Unknown alignment>" + tOrbArray[5] );
		}
		dBase[index][SS][XX][YY][ZZ].name = ripName(tOrbArray[6]);
	} else if ( index == "Wormholes" ) {
		dBase[index][SS][XX][YY][ZZ].name = parseInt(ripName(tOrbArray[6]).split(":")[1]);
	} else if ( typeof(dBase[index][SS][XX][YY][ZZ].name) == "undefined" || dBase[index][SS][XX][YY][ZZ].name == "" ) {
		dBase[index][SS][XX][YY][ZZ].name = myLangArray[5][9];
	}
}

function isObjectEmpty(obj) {
	if ( typeof(obj) == "undefined" || obj == null || obj == "" ) return true;
	for ( var i in obj ) return false;
	return true;
}

function logData (index, myOrbTot, myOs ) {
	var iSS, iX, iY, iZ, ss, aa = 0;
	var returnString = new Object();
	myOrbTot["Orbs"] = 0;
	myOrbTot["StarSystems"] = 0;
	var tAsteroidString = "";
	var tWreckageString = "";
	var tWormholeString = "";
	var tMF = myP.myF;
	if ( isObjectEmpty(tMF) ) {
		bLog("logData>didnt find fleets. Setting myFleets empty.");
		tMF = new Object();
	}
	for ( var i in myOs ) {
		if  ( (index != -1) && (!getVal("eu2bTrack"+i+"CB",true) || (index != i)) ) {
			myOrbTot["Orbs"] += myOrbTot[i];
			continue;
		}
		myOrbTot[i] = 0;
		returnString[i] = "";
		for (iSS in myOs[i]) {
			if ( i == "Planets" ) ++myOrbTot["StarSystems"]; 
			for (iX in myOs[i][iSS])
				for (iY in myOs[i][iSS][iX])
					for (iZ in myOs[i][iSS][iX][iY]) {
						if ( typeof(myOs[i][iSS][iX][iY][iZ]) != "undefined" && myOs[i][iSS][iX][iY][iZ] != null && typeof(myOs[i][iSS][iX][iY][iZ].coords) != "undefined" ) {
							++myOrbTot[i];
							returnString[i] = returnString[i] + myOs[i][iSS][iX][iY][iZ].coords;
							if ( typeof(myOs[i][iSS][iX][iY][iZ].name) != "undefined" && myOs[i][iSS][iX][iY][iZ].name != null && myOs[i][iSS][iX][iY][iZ].name != myLangArray[5][9])
								returnString[i] = returnString[i] + "¬" + myOs[i][iSS][iX][iY][iZ].name;
							if ( typeof(myOs[i][iSS][iX][iY][iZ].alignment) != "undefined" )
								returnString[i] = returnString[i] + "¬" + myOs[i][iSS][iX][iY][iZ].alignment;
							returnString[i] = returnString[i] + "ì";
							var y = (myOrbTot[i]-1)%35;
							var x = Math.floor((myOrbTot[i]-1)/35);
							ss = iSS.split("s")[1];
							var myColor = "white";
							if ( i != "Fleets" ) {
								if ( typeof(myOs["Fleets"]) != "undefined" && myOs["Fleets"] != null && typeof(myOs["Fleets"][iSS]) != "undefined" && myOs["Fleets"][iSS] != null && typeof(myOs["Fleets"][iSS][iX]) != "undefined" && typeof(myOs["Fleets"][iSS][iX][iY]) != "undefined" && typeof(myOs["Fleets"][iSS][iX][iY][iZ]) != "undefined") aa = myOs["Fleets"][iSS][iX][iY][iZ].alignment;
								else aa = "";
								if ( typeof(tMF[iSS]) != "undefined" && typeof(tMF[iSS][iX]) != "undefined" && typeof(tMF[iSS][iX][iY]) != "undefined" && typeof(tMF[iSS][iX][iY][iZ]) != "undefined" ) myColor = tMF[iSS][iX][iY][iZ].myColor;
							}
							if ( i == "Asteroids" )	{
								var tmp = myOs[i][iSS][iX][iY][iZ].name.replace(/<br>/g,"</font></td></tr><tr><td><font size=2 color=black>");
								tmp = tmp.replace(/, /g,"</font></td><td><font size=2 color=black>");
								tmp = "<table border=1 cellspacing=0><tbody><tr><td><font size=2 color=black>" + tmp + "</font></td></tr></tbody></table>";
								tAsteroidString += "<div class='" + myOs[i][iSS][iX][iY][iZ].coords + "' onclick=\"this.style.background='green'; this.onmouseout = '';document.getElementById('main').setAttribute('src','/galaxy/galaxy_overview.php?area=galaxy&starsystem_id=" + ss + "&fleet_id=&from='); \" style='position:absolute;top:" + (y*13) + ";left:" + ((x*110)+1) + ";cursor:pointer;width:112px;color:" + myColor + "' onmouseover=\"this.style.background = '#000088';var popTool = document.getElementById('eu2bToolTipA'); popTool.innerHTML = '" + tmp + "';popTool.style.top = event.clientY - (event.clientY > 299 ? (80+popTool.offsetHeight) : 62);var tLeft = event.clientX - (event.clientX > 875 ? (741+popTool.offsetWidth) : 730) + parentNode.scrollLeft; if ( tLeft < 1 ) popTool.style.left = 1; else popTool.style.left = tLeft;popTool.style.visibility = 'visible';\" onmouseout=\"this.style.background = 'black';var popTool = document.getElementById('eu2bToolTipA'); popTool.style.visibility = 'hidden';\">";
								tAsteroidString += myOs[i][iSS][iX][iY][iZ].coords + " (" + aa + ")</div>";
							} else if ( i == "Wreckages" ) {
								var tmp = myOs[i][iSS][iX][iY][iZ].name.replace(/<br>/g,"</font></td></tr><tr><td><font size=2 color=black>");
								tmp = tmp.replace(/, /g,"</font></td><td><font size=2 color=black>");
								tmp = "<table border=1 cellspacing=0><tbody><tr><td><font size=2 color=black>" + tmp + "</font></td></tr></tbody></table>";
								tWreckageString += "<div class='" + myOs[i][iSS][iX][iY][iZ].coords + "' onclick=\"this.style.background='green'; this.onmouseout = '';document.getElementById('main').setAttribute('src','/galaxy/galaxy_overview.php?area=galaxy&starsystem_id=" + ss + "&fleet_id=&from='); \" style='position:absolute;top:" + (y*13) + ";left:" + ((x*110)+1) + ";cursor:pointer;width:112px;color:" + myColor + "' onmouseover=\"this.style.background = '#000088';var popTool = document.getElementById('eu2bToolTipK'); popTool.innerHTML = '" + tmp + "';popTool.style.top = event.clientY - (event.clientY > 299 ? (80+popTool.offsetHeight) : 62);popTool.style.left = event.clientX - (event.clientX > 875 ? (741+popTool.offsetWidth) : 730) + parentNode.scrollLeft;popTool.style.visibility = 'visible';\" onmouseout=\"this.style.background = 'black';var popTool = document.getElementById('eu2bToolTipK'); popTool.style.visibility = 'hidden';\">";
								tWreckageString += myOs[i][iSS][iX][iY][iZ].coords + " (" + aa + ")</div>";
							} else if ( i == "Wormholes" ) {
								tWormholeString += "<div class='" + myOs[i][iSS][iX][iY][iZ].coords + "' onclick=\"this.style.background='green'; this.onmouseout = ''; document.getElementById('main').setAttribute('src','/galaxy/galaxy_overview.php?area=galaxy&starsystem_id=" + ss + "&fleet_id=&from='); \" style='position:absolute;top:" + (y*13) + ";left:" + ((x*152)+1) + ";cursor:pointer;width:152px;color:" + myColor + "' onmouseover=\"this.style.background = '#000088';\" onmouseout=\"this.style.background = 'black';\">";
								tWormholeString += myOs[i][iSS][iX][iY][iZ].coords + " to " + myOs[i][iSS][iX][iY][iZ].name + " (" + aa + ")</div>";
							}
						} else bLog("empty data in logData> type>" + i + "<\nObject>" + myOs[i][iSS][iX][iY][iZ] + "<\nCoords>" + myOs[i][iSS][iX][iY][iZ].coords);
					}
		}
		myOrbTot["Orbs"] += myOrbTot[i];
	}
	if ( tAsteroidString != "" ) {
		tAsteroidString += "<div id='eu2bToolTipA' style='position:absolute;top:10px;left:30px;background:rgb(200,200,255);visibility:hidden;border:solid;border-color:grey;border-width:1px;padding:0px 0px 0px 0px'>Ti:123456<br>Cu:123456<br>Fe:123456<br>Al:123456<br>Hg:123456<br>Si:123456<br>Ur:123456<br>Kr:123456<br>Ni:123456<br>H:123456</div>";
		myP.asteroidString = tAsteroidString;
	}
	if ( tWreckageString != "" ) {
		tWreckageString += "<div id='eu2bToolTipK' style='position:absolute;top:10px;left:30px;background:rgb(200,255,200);visibility:hidden;border:solid;border-color:grey;border-width:1px;padding:0px 0px 0px 0px'>Ti:123456<br>Cu:123456<br>Fe:123456<br>Al:123456<br>Hg:123456<br>Si:123456<br>Ur:123456<br>Kr:123456<br>Ni:123456<br>H:123456</div>";
		myP.wreckageString = tWreckageString;
	}
	if ( tWormholeString != "" ) {
		myP.wormholeString = tWormholeString;
	}
	
	return returnString;
}

function doSearchUp() {
	var tD = myP.document.getElementById("eu2bSearchSearch");
	var tD2 = myP.document.getElementById("eu2bSearchTB");
	var Orbs = myP.myOrbs;
	var found = "";
	var count = 0;
	if ( tD != null ) {
		for ( var i in Orbs )
			for ( var ss in Orbs[i] )
				for ( var xx in Orbs[i][ss] )
					for ( var yy in Orbs[i][ss][xx] )
						for ( var zz in Orbs[i][ss][xx][yy] ) {
							/*if ( typeof(Orbs[i][ss][xx][yy][zz].alignment) != "undefined" && Orbs[i][ss][xx][yy][zz].alignment.indexOf ( searchTB.value ) != -1 ) {
								found += "<div onclick=\"document.getElementById('main').setAttribute('src','/galaxy/galaxy_overview.php?area=galaxy&starsystem_id=" + ss.split("s")[1] + "&fleet_id=&from=');\" style='position:absolute;top:" + (count++ * 18) + ";left:20;cursor:pointer'>";
								found += i.slice(0,-1) + "," + Orbs[i][ss][xx][yy][zz].coords;
								found += "," + Orbs[i][ss][xx][yy][zz].alignment;
								if ( typeof(Orbs[i][ss][xx][yy][zz].name) != "undefined" ) found += "," + Orbs[i][ss][xx][yy][zz].name;
								found += "</div>";
							} else */if ( Orbs[i][ss][xx][yy][zz].coords.indexOf ( tD2.value ) != -1 ) {
								found += "<div class='" + Orbs[i][ss][xx][yy][zz].coords + "' onclick=\"this.style.background='green'; document.getElementById('main').setAttribute('src','/galaxy/galaxy_overview.php?area=galaxy&starsystem_id=" + ss.split("s")[1] + "&fleet_id=&from=');\" onmouseover=\"this.style.background = '#000088';\" onmouseout=\"this.style.background = 'black';\" style='position:absolute;top:" + (count++ * 14) + ";left:0px;cursor:pointer;background:black;width:268px'>";
								found += i.slice(0,-1) + "," + Orbs[i][ss][xx][yy][zz].coords;
								if ( typeof(Orbs[i][ss][xx][yy][zz].alignment) != "undefined" ) found += "," + Orbs[i][ss][xx][yy][zz].alignment;
								if ( i != "Asteroids" && i != "Wreckages" && typeof(Orbs[i][ss][xx][yy][zz].name) != "undefined" && Orbs[i][ss][xx][yy][zz].name != null && Orbs[i][ss][xx][yy][zz].name != "" ) found += "," + Orbs[i][ss][xx][yy][zz].name;
								found += "</div>";
							} else if ( typeof(Orbs[i][ss][xx][yy][zz].name) != "undefined" && (new String(Orbs[i][ss][xx][yy][zz].name).toLowerCase().indexOf ( tD2.value.toLowerCase() )) != -1 ) {
								found += "<div class='" + Orbs[i][ss][xx][yy][zz].coords + "' onclick=\"this.style.background='green'; document.getElementById('main').setAttribute('src','/galaxy/galaxy_overview.php?area=galaxy&starsystem_id=" + ss.split("s")[1] + "&fleet_id=&from=');\" onmouseover=\"this.style.background = '#000088';\" onmouseout=\"this.style.background = 'black';\" style='position:absolute;top:" + (count++ * 14) + ";left:0px;cursor:pointer;background:black;width:268px'>";
								found += i.slice(0,-1) + "," + Orbs[i][ss][xx][yy][zz].coords;
								if ( typeof(Orbs[i][ss][xx][yy][zz].alignment) != "undefined" ) found += "," + Orbs[i][ss][xx][yy][zz].alignment;
								if ( i != "Asteroids" && i != "Wreckages" ) found += "," + Orbs[i][ss][xx][yy][zz].name;
								found += "</div>";
							}
						}
		tD.style.background = "#000088";
	} else bLog ( "doSearchUp - cant find the button");
	myP.document.getElementById("eu2bResults").innerHTML = found;
	myP.document.getElementById("eu2bSearchTotalTitle").innerHTML = myLangArray[2][3]+": " + count;
	
}

function returnSSData (tSS,i) {
	var iX, iY, iZ;
	var returnString = new Array();
	returnString[0] = 0;
	returnString[1] = "";
	tSS = "s" + tSS;
	var tOrbs = myP.myOrbs;
	for (iX in tOrbs[i][tSS]) {
		for (iY in tOrbs[i][tSS][iX]) {
			for (iZ in tOrbs[i][tSS][iX][iY]) {
				++returnString[0];
				returnString[1] += tOrbs[i][tSS][iX][iY][iZ].coords;
				if ( typeof(tOrbs[i][tSS][iX][iY][iZ].alignment) != "undefined" && tOrbs[i][tSS][iX][iY][iZ].alignment != "" ) returnString[1] += ", " + tOrbs[i][tSS][iX][iY][iZ].alignment;
				if ( typeof(tOrbs[i][tSS][iX][iY][iZ].name) !="undefined" && tOrbs[i][tSS][iX][iY][iZ].name != "" ) {
					if ( i == "Asteroids" || i == "Wreckages" ) {
						returnString[1] += "<br>&emsp;" + tOrbs[i][tSS][iX][iY][iZ].name.replace(/<br>/g,"<br>&emsp;") + "<br>";
					} else {
						returnString[1] += ", " + tOrbs[i][tSS][iX][iY][iZ].name;
					}
				}
				returnString[1] += "<br>";
			}
		}
	}
	if ( returnString[0] < 1 ) {
		if ( i == "Planets" ) returnString[1] = myLangArray[3][10];
		else returnString[1] = myLangArray[5][8];
	}
	return returnString.join("¬");
}

function ripName (tHTML) {
	var sHTML = tHTML.split(">");
	if ( sHTML.length == 1 ) return sHTML[0];
	return sHTML[1].split("<")[0];
}

function loadSS(tSS, tOrbs) {
	var orbArray;
	cSS = tSS;
	var iSS = "s"+tSS;
	bLog("Loading SS> " + tOrbs.toSource() + "<");
	var tOr = new Object();
	tOr["Planets"] = new Object();
	tOr["Fleets"] = new Object();
	tOr["Wormholes"] = new Object();
	tOr["Wreckages"] = new Object();
	tOr["Asteroids"] = new Object();
	var Orbs = myP.myOrbs;
	
	for ( var i = 0 ; i < tOrbs.length ; ++i ) {
		orbArray = tOrbs[i].split(",");
		switch (orbArray[0]) {
			case "planet" :			addOrbData(tOr,"Planets",orbArray,tSS);									
									break;
			case "wormhole_end" :
			case "wormhole_start" : addOrbData(tOr,"Wormholes", orbArray, tSS);
									break;
			case "wreckage" : 		addOrbData(tOr,"Wreckages",orbArray, tSS);
									break;
			case "fleet" : 			addOrbData(tOr,"Fleets", orbArray, tSS);
									break;
			case "asteroid" : 		addOrbData(tOr,"Asteroids", orbArray, tSS);
									break;
			case "sun":				break; // Is there something we need to know about the stars?
			default:				bLog ("Unknown Orb: " + tOrbs[i]);
									break;
		}
	}
	for ( var i in Orbs ) {
		if ( i != "Asteroids" && i != "Wreckages" ) continue;
		for ( var iXX in Orbs[i][iSS] )
			for ( var iYY in Orbs[i][iSS][iXX] )
				for ( var iZZ in Orbs[i][iSS][iXX][iYY] ) {
					if ( typeof(Orbs[i][iSS][iXX][iYY][iZZ]) == "undefined"			|| Orbs[i][iSS][iXX][iYY][iZZ] == null || typeof(Orbs[i][iSS][iXX][iYY][iZZ].coords) == "undefined" || Orbs[i][iSS][iXX][iYY][iZZ].coords == null || Orbs[i][iSS][iXX][iYY][iZZ].coords == "" || typeof(Orbs[i][iSS][iXX][iYY][iZZ].name) == "undefined" || Orbs[i][iSS][iXX][iYY][iZZ].name == null || Orbs[i][iSS][iXX][iYY][iZZ].name == "") continue;
					if ( typeof(tOr[i][iSS]) == "undefined"							|| tOr[i][iSS] == null ) continue;
					if ( typeof(tOr[i][iSS][iXX]) == "undefined"					|| tOr[i][iSS][iXX] == null ) continue;
					if ( typeof(tOr[i][iSS][iXX][iYY]) == "undefined"				|| tOr[i][iSS][iXX][iYY] == null ) continue;
					if ( typeof(tOr[i][iSS][iXX][iYY][iZZ]) == "undefined" 			|| tOr[i][iSS][iXX][iYY][iZZ] == null ) continue;
					if ( typeof(tOr[i][iSS][iXX][iYY][iZZ].coords) == "undefined"	|| tOr[i][iSS][iXX][iYY][iZZ].coords == null	|| tOr[i][iSS][iXX][iYY][iZZ].coords == "") continue;
					tOr[i][iSS][iXX][iYY][iZZ].name = Orbs[i][iSS][iXX][iYY][iZZ].name;
				}
	}
	
	for ( var i in Orbs ) {
		//if (  !getVal("eu2bTrack"+i+"CB",true) ) Orbs[i] = new Object();
		Orbs[i][iSS] = tOr[i][iSS];
	}
	if ( getVal("KeepCurrent") ) setVal ("currentSS",tSS);	
}

function saveData(index, ot, o){
	var st = new Date().getTime(); 
	var dBase = logData(index,ot,o);
	var s = "";
	for ( var i in dBase ) {
		s += i + ", ";
		if ( typeof(dBase[i]) != "undefined" && dBase[i] != "" ) setVal(i, dBase[i]);
	}
	if ( s == "" ) bLog("Saved nothing!");
	else bLog ("Saved " + s.slice(0,-2) + " in " + ((new Date().getTime()) - st) + " ms.");
}

// Begin Main Menu Button Listeners
function showChat() {
	tDiv = myP.document.getElementById("myContent");
	bLog("got click on Chat Button>" + typeof(tDiv));
	if (tDiv != null ) {
		tDiv.style.visibility = "visible";
		eu2bMainDiv.style.visibility = "hidden";
		eu2bRoidsDiv.style.visibility = "hidden";
		eu2bWreckagesDiv.style.visibility = "hidden";
		eu2bWormholesDiv.style.visibility = "hidden";
		eu2bSearchDiv.style.visibility = "hidden";	
		eu2bOptionsDiv.style.visibility = "hidden";
		eu2bWormholesRouteDiv.style.visibility = "hidden";
		eu2bTriangulationDiv.style.visibility = "hidden";
		
		ssPlanetsListDiv.style.visibility = "hidden";
		ssFleetsListDiv.style.visibility = "hidden";
		ssWormholesListDiv.style.visibility = "hidden";
		ssWreckagesListDiv.style.visibility = "hidden";
		ssAsteroidsListDiv.style.visibility = "hidden";
	}
}

function showMain(){
	tDiv = myP.document.getElementById("myContent");
	bLog("got click on Main Button>" + typeof(tDiv));
	if ( tDiv != null )	{
		tDiv.style.visibility = "hidden";
		eu2bMainDiv.style.visibility = "visible";
		eu2bRoidsDiv.style.visibility = "hidden";
		eu2bWreckagesDiv.style.visibility = "hidden";
		eu2bSearchDiv.style.visibility = "hidden";
		eu2bWormholesDiv.style.visibility = "hidden";
		eu2bOptionsDiv.style.visibility = "hidden";
		eu2bWormholesRouteDiv.style.visibility = "hidden";
		eu2bTriangulationDiv.style.visibility = "hidden";
		
		if ( ssPlanetsButtonDiv.style.background.indexOf("green") != -1 ) ssPlanetsListDiv.style.visibility = "visible";
		else if ( ssFleetsButtonDiv.style.background.indexOf("green") != -1 ) ssFleetsListDiv.style.visibility = "visible";
		else if ( ssWormholesButtonDiv.style.background.indexOf("green") != -1 ) ssWormholesListDiv.style.visibility = "visible";
		else if ( ssWreckagesButtonDiv.style.background.indexOf("green") != -1 ) ssWreckagesListDiv.style.visibility = "visible";
		else if ( ssAsteroidsButtonDiv.style.background.indexOf("green") != -1 ) ssAsteroidsListDiv.style.visibility = "visible";
	}
}

function showRoids() {
	tDiv = myP.document.getElementById("myContent");
	bLog("got click on Roids Button>" + typeof(tDiv));
	if ( tDiv != null )	{
		tDiv.style.visibility = "hidden";
		eu2bMainDiv.style.visibility = "hidden";
		eu2bRoidsDiv.style.visibility = "visible";
		eu2bWreckagesDiv.style.visibility = "hidden";
		eu2bSearchDiv.style.visibility = "hidden";
		eu2bWormholesDiv.style.visibility = "hidden";
		eu2bOptionsDiv.style.visibility = "hidden";	
		eu2bWormholesRouteDiv.style.visibility = "hidden";
		eu2bTriangulationDiv.style.visibility = "hidden";
	}
}

function showWreckages() {
	tDiv = myP.document.getElementById("myContent");
	bLog("got click on Wreckages Button>" + typeof(tDiv));
	if ( tDiv != null )	{
		tDiv.style.visibility = "hidden";
		eu2bMainDiv.style.visibility = "hidden";
		eu2bRoidsDiv.style.visibility = "hidden";
		eu2bWreckagesDiv.style.visibility = "visible";
		eu2bSearchDiv.style.visibility = "hidden";
		eu2bWormholesDiv.style.visibility = "hidden";
		eu2bOptionsDiv.style.visibility = "hidden";
		eu2bWormholesRouteDiv.style.visibility = "hidden";
		eu2bTriangulationDiv.style.visibility = "hidden";
	}
}

function showWormholes() {
	tDiv = myP.document.getElementById("myContent");
	bLog("got click on Wormholes Button>" + typeof(tDiv));
	if ( tDiv != null )	{
		tDiv.style.visibility = "hidden";
		eu2bMainDiv.style.visibility = "hidden";
		eu2bRoidsDiv.style.visibility = "hidden";
		eu2bWreckagesDiv.style.visibility = "hidden";
		eu2bSearchDiv.style.visibility = "hidden";
		eu2bWormholesDiv.style.visibility = "visible";
		eu2bOptionsDiv.style.visibility = "hidden";	
		eu2bWormholesRouteDiv.style.visibility = "hidden";
		eu2bTriangulationDiv.style.visibility = "hidden";
	}
}

function showSearch(){
	tDiv = myP.document.getElementById("myContent");
	bLog("got click on Search Button>" + typeof(tDiv));
	if ( tDiv != null )	{
		tDiv.style.visibility = "hidden";
		eu2bMainDiv.style.visibility = "hidden";
		eu2bRoidsDiv.style.visibility = "hidden";
		eu2bWreckagesDiv.style.visibility = "hidden";
		eu2bSearchDiv.style.visibility = "visible";
		eu2bWormholesDiv.style.visibility = "hidden";
		eu2bOptionsDiv.style.visibility = "hidden";	
		eu2bWormholesRouteDiv.style.visibility = "hidden";
		eu2bTriangulationDiv.style.visibility = "hidden";
	}
}

function showOptions(){
	tDiv = myP.document.getElementById("myContent");
	bLog("got click on Options Button>" + typeof(tDiv));
	if ( tDiv != null )	{
		tDiv.style.visibility = "hidden";
		eu2bMainDiv.style.visibility = "hidden";
		eu2bRoidsDiv.style.visibility = "hidden";
		eu2bWreckagesDiv.style.visibility = "hidden";
		eu2bSearchDiv.style.visibility = "hidden";
		eu2bWormholesDiv.style.visibility = "hidden";
		eu2bOptionsDiv.style.visibility = "visible";	
		eu2bWormholesRouteDiv.style.visibility = "hidden";
		eu2bTriangulationDiv.style.visibility = "hidden";
	}
}

function showRoute(){
	tDiv = parent.document.getElementById("myContent");
	bLog("got click on Route Button>" + typeof(tDiv));
	if ( tDiv != null )	{
		tDiv.style.visibility = "hidden";
		eu2bMainDiv.style.visibility = "hidden";
		eu2bRoidsDiv.style.visibility = "hidden";
		eu2bWreckagesDiv.style.visibility = "hidden";
		eu2bSearchDiv.style.visibility = "hidden";
		eu2bWormholesDiv.style.visibility = "hidden";
		eu2bWormholesRouteDiv.style.visibility = "visible";
		eu2bTriangulationDiv.style.visibility = "hidden";		
		eu2bOptionsDiv.style.visibility = "hidden";	
	}
}

function showTriangulationTool(){

	tDiv = myP.document.getElementById("myContent");
	bLog("got click triangulationTool Button>" + typeof(tDiv));
	if ( tDiv != null )	{		
		tDiv.style.visibility = "hidden";
		eu2bMainDiv.style.visibility = "hidden";
		eu2bRoidsDiv.style.visibility = "hidden";
		eu2bWreckagesDiv.style.visibility = "hidden";
		eu2bSearchDiv.style.visibility = "hidden";
		eu2bWormholesDiv.style.visibility = "hidden";
		eu2bOptionsDiv.style.visibility = "hidden";	
		eu2bWormholesRouteDiv.style.visibility = "hidden";
		eu2bTriangulationDiv.style.visibility = "visible";				
	}
}


// End Main Menu Button Listeneres
// Begin SS Objects Table Button Listeners
function showSSPlanets () {
	ssPlanetsListDiv.style.visibility = "visible";
	ssFleetsListDiv.style.visibility = "hidden";
	ssWormholesListDiv.style.visibility = "hidden";
	ssWreckagesListDiv.style.visibility = "hidden";
	ssAsteroidsListDiv.style.visibility = "hidden";
}

function showSSFleets () {
	ssPlanetsListDiv.style.visibility = "hidden";
	ssFleetsListDiv.style.visibility = "visible";
	ssWormholesListDiv.style.visibility = "hidden";
	ssWreckagesListDiv.style.visibility = "hidden";
	ssAsteroidsListDiv.style.visibility = "hidden";
}

function showSSWormholes () {
	ssPlanetsListDiv.style.visibility = "hidden";
	ssFleetsListDiv.style.visibility = "hidden";
	ssWormholesListDiv.style.visibility = "visible";
	ssWreckagesListDiv.style.visibility = "hidden";
	ssAsteroidsListDiv.style.visibility = "hidden";
}

function showSSWreckages () {
	ssPlanetsListDiv.style.visibility = "hidden";
	ssFleetsListDiv.style.visibility = "hidden";
	ssWormholesListDiv.style.visibility = "hidden";
	ssWreckagesListDiv.style.visibility = "visible";
	ssAsteroidsListDiv.style.visibility = "hidden";
}

function showSSAsteroids () {
	ssPlanetsListDiv.style.visibility = "hidden";
	ssFleetsListDiv.style.visibility = "hidden";
	ssWormholesListDiv.style.visibility = "hidden";
	ssWreckagesListDiv.style.visibility = "hidden";
	ssAsteroidsListDiv.style.visibility = "visible";
}

function clearChildren(obj) {
	while(obj.firstChild) obj.removeChild(obj.firstChild);
}

function update(index,ot){
	switch (index) {
		case "Asteroids":	updateRoids(myP,ot);
							break;
		case "Wreckages":	updateWreckages(myP,ot);
							break;
		case "Wormholes":	updateWormholes(myP,ot);
							break;
		default:			bLog("uhh, what just happened?>" + index + "<");
	}
}

function updateRoids(tMyP, oTot) {
	bLog ( "Updating Roids");
	tDiv = tMyP.document.getElementById("eu2bAsteroidsList");
	tDiv2 = tMyP.document.getElementById("eu2bAsteroidsTotalTitle");
	if ( tDiv != null && tDiv2 != null ) {
		if ( typeof(myP.asteroidString) != "string" || myP.asteroidString == '' )  tDiv.innerHTML = myLangArray[5][17] + myLangArray[3][4] + myLangArray[5][18] + "";
		else tDiv.innerHTML = myP.asteroidString;
		tDiv2.removeChild ( tDiv2.firstChild );
		tDiv2.appendChild ( document.createTextNode(myLangArray[2][0] + ": " + oTot["Asteroids"]) );
	} else bLog("Killing update Roids - no list div found");
}

function updateWreckages(tMyP, oTot) {
	bLog ( "Updating Wreckages");
	tDiv = tMyP.document.getElementById("eu2bWreckagesList");
	tDiv2 = tMyP.document.getElementById("eu2bWreckagesTotalTitle");
	if ( tDiv != null && tDiv2 != null ) {
		if ( typeof(myP.wreckageString) != "string" || myP.wreckageString == '' )  tDiv.innerHTML = myLangArray[5][17] + myLangArray[3][5] + myLangArray[5][18] + "";
		else tDiv.innerHTML = myP.wreckageString;
		tDiv2.removeChild ( tDiv2.firstChild );
		tDiv2.appendChild ( document.createTextNode(myLangArray[2][1] + ": " + oTot["Wreckages"]) );
	} else bLog("Killing update Wreckages - no list div found");
}

function updateWormholes(tMyP, oTot) {
	bLog ( "Updating Wormholes");
	tDiv = tMyP.document.getElementById("eu2bWormholesList");
	tDiv2 = tMyP.document.getElementById("eu2bWormholesTotalTitle");
	if ( tDiv != null && tDiv2 != null ) {
		if ( typeof(myP.wormholeString) != "string" || myP.wormholeString == '' )  tDiv.innerHTML = myLangArray[5][17] + myLangArray[3][6] + myLangArray[5][18] + "";
		else tDiv.innerHTML = myP.wormholeString;
		tDiv2.removeChild ( tDiv2.firstChild );
		tDiv2.appendChild ( document.createTextNode(myLangArray[2][2] + ": " + oTot["Wormholes"]) );
	} else bLog("Killing update Wormholes - no list div found");
}

function updateMain() {
	var currentSS = getVal ("currentSS",0);
	var tOT = myP.myTotals;
	bLog ("UpdatingMainMenu>" + currentSS + "  orbTot>" + tOT["Orbs"] + "  ssTot>" + tOT["StarSystems"] + "  planetTot>" + tOT["Planets"]);
	tDiv = myP.document.getElementById("eu2bMainObjectsTotalTitle");
	if ( tDiv != null ) {
		tDiv.removeChild(tDiv.firstChild);
		tDiv.appendChild ( document.createTextNode(myLangArray[3][0] + ": " + tOT["Orbs"]) );
		tDiv = myP.document.getElementById("eu2bMainSSTotalTitle");
		tDiv.removeChild(tDiv.firstChild);
		tDiv.appendChild ( document.createTextNode(myLangArray[3][1] + ":" + tOT["StarSystems"]) );
		tDiv = myP.document.getElementById("eu2bMainPlanetsTitle");
		tDiv.removeChild(tDiv.firstChild);
		tDiv.appendChild ( document.createTextNode(myLangArray[3][2] + ": " + tOT["Planets"]) );
		tDiv = myP.document.getElementById("eu2bMainFleetsTitle");
		tDiv.removeChild(tDiv.firstChild);
		tDiv.appendChild ( document.createTextNode(myLangArray[3][3] + ": " + tOT["Fleets"]) );
		tDiv = myP.document.getElementById("eu2bMainWormholesTitle");
		tDiv.removeChild(tDiv.firstChild);
		tDiv.appendChild ( document.createTextNode(myLangArray[3][6] + ": " + tOT["Wormholes"]) );
		tDiv = myP.document.getElementById("eu2bMainWreckagesTitle");
		tDiv.removeChild(tDiv.firstChild);
		tDiv.appendChild ( document.createTextNode(myLangArray[3][5] + ": " + tOT["Wreckages"]) );
		tDiv = myP.document.getElementById("eu2bMainAsteroidsTitle");
		tDiv.removeChild(tDiv.firstChild);
		tDiv.appendChild ( document.createTextNode(myLangArray[3][4] + ": " + tOT["Asteroids"]) );
	} else bLog("killing top part of update");
	if ( currentSS > 0 && currentSS < 10001 ) {
		tDiv = myP.document.getElementById("eu2bMMSSTB");
		if ( tDiv != null ) {
			tDiv.value = currentSS;
			var theX = 0;
			var theY = currentSS%100;
			if ( theY == 0 ) {
				theX = (currentSS/100) - 1;
				theY = 100;
			} else theX = (currentSS - (currentSS%100))/100;
			theX += 22;
			theY += 118;

			tDiv  = myP.document.getElementById("eu2bXLine" );
			tDiv.style.top = theX + "px";
			tDiv.style.left = (theY - 10) + "px";

			tDiv  = myP.document.getElementById("eu2bYLine" );
			tDiv.style.left = theY + "px";
			tDiv.style.top = (theX - 10) + "px";
		
			var tD = returnSSData(currentSS,"Planets").split("¬");
//			bLog("updateMain>SSdataPlanets>" + tD + "<");
			tDiv = myP.document.getElementById("ssPlanetsButton");
			if ( tD[1][0] == "S" ) tDiv.innerHTML = "Planets<br>-";
			else tDiv.innerHTML = "Planets<br>" + tD[0];
			myP.document.getElementById("ssPlanetsList").innerHTML = tD[1];
		
			tD = returnSSData(currentSS,"Fleets").split("¬");
			tDiv = myP.document.getElementById("ssFleetsButton");
			if ( tD[1][0] == "N" ) tDiv.innerHTML = "Fleets<br>-";
			else tDiv.innerHTML = "Fleets<br>" + tD[0];
			myP.document.getElementById("ssFleetsList").innerHTML = tD[1];

			tD = returnSSData(currentSS,"Wormholes").split("¬");
			tDiv = myP.document.getElementById("ssWormholesButton");
			if ( tD[1][0] == "N" ) tDiv.innerHTML = "Wormholes<br>-";
			else tDiv.innerHTML = "Wormholes<br>" + tD[0];
			myP.document.getElementById("ssWormholesList").innerHTML = tD[1];
		
			tD = returnSSData(currentSS,"Wreckages").split("¬");
			tDiv = myP.document.getElementById("ssWreckagesButton");
			if ( tD[1][0] == "N" ) tDiv.innerHTML = "Wreckages<br>-";
			else tDiv.innerHTML = "Wreckages<br>" + tD[0];
			myP.document.getElementById("ssWreckagesList").innerHTML = tD[1];
		
			tD = returnSSData(currentSS,"Asteroids").split("¬");
			tDiv = myP.document.getElementById("ssAsteroidsButton");
			if ( tD[1][0] == "N" ) tDiv.innerHTML = "Roids<br>-";
			else tDiv.innerHTML = "Roids<br>" + tD[0];
			myP.document.getElementById("ssAsteroidsList").innerHTML = tD[1];
		}else bLog("killing bottom part of update cause of no eu2bMMSSTB"); 
	}else bLog("killing bottom part of update cause no currentSS");
}

function flipKeepCurrent() {
	tDiv = myP.document.getElementById("eu2bKeepCurrentCB");
	if ( tDiv != null ) {
		setVal("KeepCurrent", tDiv.checked);
		bLog( "got click on Keep Current  checked>" + tDiv.checked + "  unsafeSS>" + unsafeWindow.starsystem_id + "   cSS>" + cSS);
		if ( tDiv.checked ) {
			if ( typeof (unsafeWindow.starsystem_id) == "undefined" ) setVal("currentSS", cSS);
			else setVal ("currentSS", unsafeWindow.starsystem_id);
			updateMain();
		}
	} else bLog("eu2bKeepCurrentCB is null");
}

function flipCB(evt) {
	//GM_log("Flipped!>" + evt.target.id + ", " + evt.target.checked );
	setVal(""+evt.target.id, evt.target.checked);
}

function findRouteLauncher() {
//	myP.document.body.style.cursor = "wait";
	var tOutDiv = myP.document.getElementById("eu2bWormholesRouteList");
	if ( tOutDiv == null ) return false;
	var tStartSSr = parseInt(myP.document.getElementById("eu2bOSStartRoute").value);
	var tEndSSr = parseInt(myP.document.getElementById("eu2bOSEndRoute").value);
	if ( isNaN(tStartSSr) || tStartSSr < 1 || tStartSSr > 10000 || isNaN(tEndSSr) || tEndSSr < 1 || tEndSSr > 10000 ) {
		tOutDiv.innerHTML = "<br>"+myLangArray[7][6];
		return false;
	}
	tOutDiv.innerHTML += "<br><br>&nbsp;&nbsp;&nbsp;---&nbsp;&nbsp;&nbsp;"+tStartSSr+" "+myLangArray[7][2]+" "+tEndSSr+"&nbsp;&nbsp;&nbsp;---<br>&nbsp;&nbsp;&nbsp;---&nbsp;&nbsp;&nbsp;"+myLangArray[7][3]+"&nbsp;&nbsp;&nbsp;---&nbsp;&nbsp;&nbsp;"+myLangArray[7][4]+"&nbsp;&nbsp;&nbsp;---<br><br>"+myLangArray[7][5];
	setTimeout(function () { findRoute(tStartSSr,tEndSSr,tOutDiv); },10)
}

function findRoute(startSSr,endSSr,tOutDiv) {
	var tWormholes = new Array();
	var sTime = new Date().getTime();

	var tResult = '';
	var tWHOrbsP = myP.myOrbs["Wormholes"];
	var tWHOrbs = new Array();
	var tCount1 = new Object();
	var tCount2 = "";
	var tCount3 = "";
	var magicalCookie = new Array(2);
	magicalCookie[0] = 0;
	magicalCookie[1] = new Array();
	var magicalCookieCrumbs = 0;
	var tA, tB;
	var tNumOfDups = 0;
	var tNumOfWHs = 0;
	
	for (var tSS in tWHOrbsP) {
		for (var iX in tWHOrbsP[tSS]) {
			for (var iY in tWHOrbsP[tSS][iX]) {
				for (var iZ in tWHOrbsP[tSS][iX][iY]) {
					tCount2 = parseInt(tSS.slice(1));
					tCount3 = parseInt(tWHOrbsP[tSS][iX][iY][iZ].name);
					if ( !isNaN(tCount3) && typeof(tCount1[tCount2+"_"+tCount3]) == "undefined" ) {
						tCount1[tCount2+"_"+tCount3] = new Object();
						tCount1[tCount3+"_"+tCount2] = new Object();
						tA = calcDistance(startSSr,tCount2);
						tB = calcDistance(startSSr,tCount3);
						if ( tB < tA ) tWHOrbs.push([0,tCount3,tCount2,tB]);					
						else tWHOrbs.push([0,tCount2,tCount3,tA]);
						++tNumOfWHs;
					} else {
						++tNumOfDups;
					}
				}
			}
		}
	}
	tCount1 = 0;
	tCount2 = 0;
	tCount3 = 0;
	
	function getRoute (startSS,endSS,permsLeft) {
		var tKeeperTot = calcDistance(startSS,endSS);  // Direct Time
		if ( permsLeft < 1 || tKeeperTot < 2 ) return [0,tKeeperTot,-1,startSS,endSS];
		var tKeeperWHa = 0;
		var tKeeperJumps = 0;
		var tKeeperSeg = 1;
		var nA,nB,dA,dB,tmpWHa,tP,tKeeperJa,tKeeperJb,tKeeperWHb,tKeeperWHi,totJumps,tSeg;
		for ( var iWH = 0 ; iWH < tWHOrbs.length ; ++iWH ) {
			tmpWHa = tWHOrbs[iWH];
			if ( tmpWHa[0] == 1 ) continue;
			++tCount1;
			if ( permsLeft == 1 && startSS == startSSr ) {
				if (tmpWHa[3] >= (tKeeperTot-1) ) continue;
				nA = tmpWHa[1];
				nB = tmpWHa[2];
				dA = [0,tmpWHa[3],-1,startSS,nA];
				dB = [0,calcDistance(nB,endSS),-1,nB,endSS];
			} else {
				++tCount2;
				tmpWHa[0] = 1;
				tP = permsLeft-1;
				nA = tmpWHa[1];
				nB = tmpWHa[2];
				dA = getRoute(startSS,nA,tP);
				dB = getRoute(startSS,nB,tP);
				if ( dB[1] < dA[1] ) {
					dA = dB;
					dB = nA;
					nA = nB;
					nB = dB;
				}
				if ( dA[1] >= (tKeeperTot-1) ) {
					tmpWHa[0] = 0;
					continue;
				}
				if (dA[2] > -1 ) tWHOrbs[dA[2]][0] = 1;
				dB = getRoute(nB,endSS,tP);
				if (dA[2] > -1 ) tWHOrbs[dA[2]][0] = 0;
				tmpWHa[0] = 0;
			}
			totJumps = dB[0] + dA[0] + 1;
			tP = dB[1] + dA[1];               // Total Distance (Recycle variables)
			if ( tP > tKeeperTot || (tP == tKeeperTot && totJumps > tKeeperJumps) ) continue;
			tSeg = ((dA[0]<1&&dA[1]<1)?0:(dA.length==5?1:dA[3].length)) + ((dB[0]<1&&dB[1]<1)?0:(dB.length==5?1:dB[3].length)) + 1;
			if ( tP == tKeeperTot && totJumps == tKeeperJumps && tSeg >= tKeeperSeg ) continue;
			if ( tP == tKeeperTot && permsLeft == 2 ) {
				if ( totJumps == tKeeperJumps ) ++magicalCookie[0];
				else ++magicalCookieCrumbs;
			}
			tKeeperWHi = iWH;
			tKeeperJa = dA;
			tKeeperWHa = nA;
			tKeeperWHb = nB;
			tKeeperJb = dB;
			tKeeperTot = tP;
			tKeeperJumps = totJumps;
			tKeeperSeg = tSeg;
			++tCount3;
		}

		if ( tKeeperWHa < 1 ) return [0,tKeeperTot,-1,startSS,endSS];		//Direct Route
		else {																//Took a WH
			var tRoutes = new Array();
			if ( tKeeperJa[0] > 0 || tKeeperJa[1] > 0 ) tRoutes.push(tKeeperJa);
			tRoutes.push([1,0,tKeeperWHi,tKeeperWHa,tKeeperWHb]);
			if ( tKeeperJb[0] > 0 || tKeeperJb[1] > 0 ) tRoutes.push(tKeeperJb);
			if (tRoutes.length == 1 ) return tRoutes[0];
			else return [tKeeperJumps,tKeeperTot,tKeeperWHi,tRoutes];
		}
	}
	var msInitElapse = (new Date().getTime() - sTime);
	sTime = new Date().getTime();	
	var tRouteData = getRoute(startSSr,endSSr, 2);
	var msElapse = ((new Date().getTime()) - sTime);
	var tDirectDis = calcDistance(startSSr,endSSr);
	if ( tRouteData[0] < 1 ) {
		tResult += "<br>"+myLangArray[7][7]+"<br>&nbsp;&nbsp;&nbsp;"+myLangArray[7][0]+"&nbsp;>&nbsp;"+startSSr+" "+myLangArray[7][2]+" "+endSSr+" > "+tDirectDis+" "+myLangArray[7][8];
	} else if ( tRouteData.length == 5 ) {
		tResult += "<br>"+myLangArray[7][9]+"<br>&nbsp;&nbsp;&nbsp;"+myLangArray[7][1]+"&nbsp;>&nbsp;"+startSSr+" "+myLangArray[7][2]+" "+endSSr+" > 0 "+myLangArray[7][8];
	} else {
		tResult += whRouteDataToString(tRouteData);
	}
	var sMagicalCookie = "<br><br>";
	if ( magicalCookieCrumbs > 0 ) {
		if ( magicalCookieCrumbs == 1 ) sMagicalCookie += "<br>You found a Dollar!";
		else sMagicalCookie += "<br>You found " + magicalCookieCrumbs + " Dollars!";
	}
	if ( magicalCookie[0] > 0 ) {
		if ( magicalCookie[0] == 1 ) sMagicalCookie += "<br>You found a Thousand Dollars!";
		else sMagicalCookie += "<br>You found " + magicalCookie[0] + " Thousand Dollars! That was quite lucky!";
	}
	tOutDiv.innerHTML = "<br>&nbsp;&nbsp;&nbsp;---&nbsp;&nbsp;&nbsp;"+startSSr+"&nbsp;&nbsp;&nbsp;"+myLangArray[7][2]+"&nbsp;&nbsp;&nbsp;"+endSSr+"&nbsp;&nbsp;&nbsp;---<br><br>Init: "+msInitElapse+"ms<br>"+myLangArray[7][10]+": " + (msElapse/1000) + " "+myLangArray[7][11]+"<br>"+myLangArray[2][2]+": "+tNumOfWHs+", "+myLangArray[7][12]+": "+tNumOfDups+"<br>"+myLangArray[7][13]+": "+tCount1+", "+tCount2+", "+tCount3+"<br>P/WH="+(Math.round((tCount1/tNumOfWHs)*100)/100)+", P/ms="+(Math.round((tCount1/msElapse)*100)/100)+", ms/WH="+(Math.round((msElapse/tNumOfWHs)*100)/100)+"<br><br><br>"+myLangArray[7][14]+": "+tDirectDis+" "+myLangArray[7][8]+"."+tResult+"<br>"+myLangArray[7][15]+"&nbsp;>&nbsp;"+myLangArray[7][16]+":&nbsp;" + tRouteData[0] + ", "+myLangArray[7][17]+": " + tRouteData[1] + " "+myLangArray[7][8]+". "+myLangArray[7][18]+": " + (tDirectDis-tRouteData[1]) + " "+myLangArray[7][8]+sMagicalCookie;
//	myP.document.body.style.cursor = "default";

}

function whRouteDataToString(tRouteData) {
	var tString = "";
	if ( tRouteData.length == 5 ) {
		if ( tRouteData[0] < 1 ) tString = "<br>"+myLangArray[7][0]+"&nbsp;>&nbsp;";
		else tString = "<br>"+myLangArray[7][1]+"&nbsp;>&nbsp;";
		tString += "<span class='" + tRouteData[3] + "' style='cursor:pointer' onmouseover='this.style.backgroundColor=\"blue\";' onclick='this.style.backgroundColor=\"green\"; document.getElementById(\"main\").setAttribute(\"src\",\"/galaxy/galaxy_overview.php?area=galaxy&starsystem_id=" + tRouteData[3] + "&fleet_id=&from=\");' onmouseout='this.style.backgroundColor=\"black\";' onmousedown='this.style.backgroundColor=\"rgb(0,119,119)\";'>" + tRouteData[3] + "</span> "+myLangArray[7][2]+" <span class='" + tRouteData[4] + "' style='cursor:pointer' onclick='this.style.backgroundColor=\"green\";document.getElementById(\"main\").setAttribute(\"src\",\"/galaxy/galaxy_overview.php?area=galaxy&starsystem_id=" + tRouteData[4] + "&fleet_id=&from=\");' onmouseover='this.style.backgroundColor=\"blue\";' onmouseout='this.style.backgroundColor=\"black\";' onmousedown='this.style.backgroundColor=\"rgb(0,119,119)\";'>" + tRouteData[4] + "</span>";
		if ( tRouteData[0] < 1 ) return tString + " > " + tRouteData[1] + " "+myLangArray[7][8];
		else return tString;
	} else {
		for ( var i = 0 ; i < tRouteData[3].length ; ++i ) tString += whRouteDataToString(tRouteData[3][i]);
		return tString;
	}
}

function calcDistance(sourceOs, destOs) {
	return	Math.round( Math.sqrt(Math.pow((Math.floor((sourceOs-1) / 100) - Math.floor((destOs-1) / 100)),2) + Math.pow((((sourceOs-1) % 100) - ((destOs-1) % 100)),2)));
}

function getIntersects(x0, y0, r0, x1, y1, r1, d) {
	var a = ((r0*r0) - (r1*r1) + (d*d)) / (2*d);
	var h = Math.sqrt((r0*r0) - (a*a));
	var x2 = x0 + a * ( x1 - x0 ) / d;
	var y2 = y0 + a * ( y1 - y0 ) / d;
	var x3p = x2 + h * ( y1 - y0 ) / d;
	var y3p = y2 - h * ( x1 - x0 ) / d;
	var x3n = x2 - h * ( y1 - y0 ) / d;
	var y3n = y2 + h * ( x1 - x0 ) / d;
	return [[x3p,y3p],[x3n,y3n]];
}

function getAveragedIntersectsXY(pA, pB) {
	var d;
	var best = 999999;
	var bestXY = [-13,-42];
	for ( var i = 0 ; i < 2 ; ++i ) {
		for ( var s = 0 ; s < 2 ; ++s ) {
			d = calcDistanceXY(pA[i][0], pA[i][1], pB[s][0], pB[s][1]);
			if ( d < best ) {
				bestXY[0] = (pA[i][0] + pB[s][0])/2;
				bestXY[1] = (pA[i][1] + pB[s][1])/2;
				best = d;
			}
		}
	}
	return bestXY;
}

function calcTriangulation() {
	var tOutDiv = myP.document.getElementById("eu2bTriangulationList");
	if ( tOutDiv == null ) return false;
	var ss0 = parseInt(parent.document.getElementById("eu2bOSStartTriangulation1").value);
	var ss1 = parseInt(parent.document.getElementById("eu2bOSStartTriangulation2").value);
	var ss2 = parseInt(parent.document.getElementById("eu2bOSStartTriangulation3").value);
	var r0 = parseInt(parent.document.getElementById("eu2bDistanceTriangulation1").value);
	var r1 = parseInt(parent.document.getElementById("eu2bDistanceTriangulation2").value);
	var r2 = parseInt(parent.document.getElementById("eu2bDistanceTriangulation3").value);
	if ( isNaN(ss0) || ss0 < 1 || ss0 > 10000 || isNaN(ss1) || ss1 < 1 || ss1 > 10000 || isNaN(r0) || r0 < 1 || r0 > 143  || isNaN(r1) || r1 < 1 || r1 > 143 ) {
		tOutDiv.innerHTML = "<br>"+myLangArray[7][6] + " 1 - "+myLangArray[8][2];
		return false;
	}
	if ( isNaN(ss2) || isNaN(r2) ) ss2 = -1;
	else if ( ss2 < 1 || ss2 > 10000 || r2 < 1 || r2 > 143 ) {
		tOutDiv.innerHTML = "<br>"+myLangArray[7][6] + " 2 - "+myLangArray[8][3];
		return false;
	}
	--ss0; --ss1; --ss2;
	var x0 = ss0 % 100;
	var x1 = ss1 % 100;
	var x2 = ss2 % 100;
	var y0 = Math.floor( ss0 / 100 );
	var y1 = Math.floor( ss1 / 100 );
	var y2 = Math.floor( ss2 / 100 );
	var d01 = calcDistanceXY ( x0, y0, x1, y1 );
	var d02 = calcDistanceXY ( x0, y0, x2, y2 );
	var d12 = calcDistanceXY ( x1, y1, x2, y2 );
	if ( d01 < 1 || d01 > (r0+r1) || d01 < Math.abs(r0-r1) ) {
		tOutDiv.innerHTML = "<br>"+myLangArray[7][6] + " 3 - "+myLangArray[8][4];
		return false;
	}
	if ( ss2 > -1 && (d02 < 1 || d12 < 1 || d02 > (r0+r2) || d12 > (r1+r2) || d02 < Math.abs(r0-r2) || d12 < Math.abs(r1-r2)) ) {
		tOutDiv.innerHTML = "<br>"+myLangArray[7][6] + " 4 - "+myLangArray[8][5];
		return false;
	}
	tOutDiv.innerHTML = "<b>"+myLangArray[8][6]+":</b><br>&nbsp;&nbsp;&nbsp;&nbsp;A) " + ssLink(ss0+1) + " (" + (x0+1) + ", " + (y0+1) + ") <--> " + ssLink(ss1+1) + " (" + (x1+1) + ", " + (y1+1) + ")";
	if ( ss2 > -1 ) {
		tOutDiv.innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;B) " + ssLink(ss0+1) + " (" + (x0+1) + ", " + (y0+1) + ") <--> " + ssLink(ss2+1) + " (" + (x2+1) + ", " + (y2+1) + ")";
		tOutDiv.innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;C) " + ssLink(ss1+1) + " (" + (x1+1) + ", " + (y1+1) + ") <--> " + ssLink(ss2+1) + " (" + (x2+1) + ", " + (y2+1) + ")";
	}
	var thePointsA = getIntersects(x0,y0,r0,x1,y1,r1,d01);
	tOutDiv.innerHTML += "<br><br><b>"+myLangArray[8][7]+":</b><br>&nbsp;&nbsp;&nbsp;&nbsp;A) (" + ((Math.floor(thePointsA[0][0]*100)/100)+1) + ", " + ((Math.floor(thePointsA[0][1]*100)/100)+1) + ") <--> (" + ((Math.floor(thePointsA[1][0]*100)/100)+1) + ", " + ((Math.floor(thePointsA[1][1]*100)/100)+1) + ")";
	if ( ss2 > -1 ) {
		var thePointsB = getIntersects(x0,y0,r0,x2,y2,r2,d02);
		var thePointsC = getIntersects(x1,y1,r1,x2,y2,r2,d12);
		var dAB = getAveragedIntersectsXY ( thePointsA, thePointsB );
		var dAC = getAveragedIntersectsXY ( thePointsA, thePointsC );
		var dBC = getAveragedIntersectsXY ( thePointsB, thePointsC );
		var pX = (dAB[0]+dAC[0]+dBC[0]) / 3;
		var pY = (dAB[1]+dAC[1]+dBC[1]) / 3; 
		var remX = Math.round(pX - Math.floor(pX));
		var remY = Math.round(pY - Math.floor(pY));
		if ( remX == 0 ) remX = -1;
		if ( remY == 0 ) remY = -1;
		tOutDiv.innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;B) (" + ((Math.floor(thePointsB[0][0]*100)/100)+1) + ", " + ((Math.floor(thePointsB[0][1]*100)/100)+1) + ") <--> (" + ((Math.floor(thePointsB[1][0]*100)/100)+1) + ", " + ((Math.floor(thePointsB[1][1]*100)/100)+1) + ")";
		tOutDiv.innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;C) (" + ((Math.floor(thePointsC[0][0]*100)/100)+1) + ", " + ((Math.floor(thePointsC[0][1]*100)/100)+1) + ") <--> (" + ((Math.floor(thePointsC[1][0]*100)/100)+1) + ", " + ((Math.floor(thePointsC[1][1]*100)/100)+1) + ")";
		tOutDiv.innerHTML += "<br><br><b>"+myLangArray[8][8]+":</b><br>&nbsp;&nbsp;&nbsp;&nbsp;AB -> (" + ((Math.floor(dAB[0]*100)/100)+1) + ", " + ((Math.floor(dAB[1]*100)/100)+1) + ")<br>&nbsp;&nbsp;&nbsp;&nbsp;AC -> (" + ((Math.floor(dAC[0]*100)/100)+1) + ", " + ((Math.floor(dAC[1]*100)/100)+1) + ")<br>&nbsp;&nbsp;&nbsp;&nbsp;BC -> (" + ((Math.floor(dBC[0]*100)/100)+1) + ", " + ((Math.floor(dBC[1]*100)/100)+1) + ")";
		tOutDiv.innerHTML += "<br><br><b>"+myLangArray[8][9]+":</b><br>&nbsp;&nbsp;&nbsp;&nbsp;SS# " + ssLink(XYtoSS(pX,pY)) + "&nbsp;&nbsp;&nbsp;(or nearby).<br>&nbsp;&nbsp;&nbsp;&nbsp;XY: ("+((Math.floor(pX*100)/100)+1)+", "+((Math.floor(pY*100)/100)+1)+")";
		tOutDiv.innerHTML += "<br><br><b>"+myLangArray[8][10]+":</b>";
		tOutDiv.innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;SS# " + ssLink(XYtoSS((pX+remX),pY));
		tOutDiv.innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;SS# " + ssLink(XYtoSS(pX,(pY+remY)));
		tOutDiv.innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;SS# " + ssLink(XYtoSS((pX+remX),(pY+remY)));
	} else {
		var pXa = thePointsA[0][0];
		var pYa = thePointsA[0][1];
		var pXb = thePointsA[1][0];
		var pYb = thePointsA[1][1];
		var remXa = Math.round(pXa - Math.floor(pXa));
		var remYa = Math.round(pYa - Math.floor(pYa));
		var remXb = Math.round(pXb - Math.floor(pXb));
		var remYb = Math.round(pYb - Math.floor(pYb));
		if ( remXa == 0 ) remXa = -1;
		if ( remYa == 0 ) remYa = -1;
		if ( remXb == 0 ) remXb = -1;
		if ( remYb == 0 ) remYb = -1;
		var tSS1a = XYtoSS((pXa+remXa),pYa);
		var tSS2a = XYtoSS(pXa,(pYa+remYa));
		var tSS3a = XYtoSS((pXa+remXa),(pYa+remYa));
		var tSS1b = XYtoSS((pXb+remXb),pYb);
		var tSS2b = XYtoSS(pXb,(pYb+remYb));
		var tSS3b = XYtoSS((pXb+remXb),(pYb+remYb));
		tOutDiv.innerHTML += "<br><br><b>"+myLangArray[8][9]+":</b><br>&nbsp;&nbsp;&nbsp;&nbsp;Its either SS# " + ssLink(XYtoSS(pXa,pYa)) + " or SS# " + ssLink(XYtoSS(pXb,pYb)) + ".<br>&nbsp;&nbsp;&nbsp;(or nearby one of these)";
		tOutDiv.innerHTML += "<br><br><b>"+myLangArray[8][10]+":</b>";
		tOutDiv.innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;"+(tSS1a=="nothing"?"":"SS# " + ssLink(tSS1a)) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+(tSS1b=="nothing"?"":"SS# " + ssLink(tSS1b));
		tOutDiv.innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;"+(tSS2a=="nothing"?"":"SS# " + ssLink(tSS2a)) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+(tSS2b=="nothing"?"":"SS# " + ssLink(tSS2b));
		tOutDiv.innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;"+(tSS3a=="nothing"?"":"SS# " + ssLink(tSS3a)) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+(tSS3b=="nothing"?"":"SS# " + ssLink(tSS3b));
	}
	return true;
}

function ssLink ( ss ) {
	return "<span class='" + ss + "' style='cursor:pointer' onmouseover='this.style.backgroundColor=\"blue\";' onclick='this.style.backgroundColor=\"green\"; document.getElementById(\"main\").setAttribute(\"src\",\"/galaxy/galaxy_overview.php?area=galaxy&starsystem_id=" + parseInt(ss) + "&fleet_id=&from=\");' onmouseout='this.style.backgroundColor=\"black\";' onmousedown='this.style.backgroundColor=\"rgb(0,119,119)\";'>" + ss + "</span>";
}

function XYtoSS( x, y ) {
	if ( x < 0 || x > 99 || y < 0 || y > 99 ) return "nothing";
	x = Math.floor(x) + 1;
	y = Math.floor(y)*100;
	if ( x < 10 && y > 0 ) x = "0" + x;
	if ( y < 1 ) y = "";
	return y + x + "";
}

function calcDistanceXY(x0, y0, x1, y1) {
	return Math.sqrt( Math.pow((x0-x1),2) + Math.pow((y0-y1),2) );
}

function drawEU2() {  // ** BEGIN drawEU2()  **  Start main setup draw, most of this only runs once.

	tDiv = myP.document.getElementById("chat_motd");
	if ( tDiv == null ) {
		bLog("Killing Draw Main Menu cause of no chat_motd");
		return; //Kill menu if i cant find our Div
	}

	if ( myP.document.getElementById("chat").style.display == "none" ) { //If not yet clicked to attempt log in to chat
		// Kill the onclick after chat login, so our buttons will work.
		if ( tDiv.getAttribute("onclick").length == 63) tDiv.setAttribute("onclick", "this.style.display='none';thechatparentobject.style.display='';this.onclick='';");
		bLog("Killing Draw Main Menu cause of no login attempt");
		return; //Kill Draw Menu unil reload after chat login attempt
	}
	
	tDiv.style.display = "";
	eu2bButtonsDiv = myP.document.getElementById("eu2bButtons");
	if ( eu2bButtonsDiv != null ) {
		bLog(" Killing draw.. its already here ...returning");
		return;
	}
	bLog ("Drawing Main Menu");
	// This stuff is only done once.
	tDiv.setAttribute("onclick", "");
	var mtmp = myP.document.getElementById("right_menu");
	mtmp = mtmp.nextSibling;
	var mCount = 0;
	while ( mtmp.tagName != "DIV" && mCount < 5 ) {
		mtmp = mtmp.nextSibling;
		++mCount;
	}
	bLog("removing ad>" + mtmp + "<\nad.tagName>" + mtmp.tagName + "<\nad.innerHTML>" + mtmp.innerHTML + "<");
	mtmp.innerHTML = "";
	// Reload button and load time
	tDiv2 = myP.document.getElementById("linkline");
	if ( tDiv2 != null ) tDiv2.innerHTML += "|&nbsp;<div onclick='document.location.href = document.location.href;' onmouseover='this.style.textDecoration=\"underline\";' onmouseout='this.style.textDecoration=\"none\";' style='display:inline;cursor:pointer'>" + myLangArray[5][5] + "</div>&nbsp;<div id='eu2bLoadTimeLabel' style='display:inline;font-weight:normal'>(" + myLangArray[5][6] + "?)</div>";
//position:absolute;top:1;left:200;width:100;  // position:absolute;top:1;left:250;width:100;
	//prepare chat_motd for drawing then draw
//	tDiv.setAttribute("style", "border: 0px dashed gold; margin: 0px auto; padding: 10px; overflow: hidden; font-family: Verdana; font-size: 10px; color: white; background:black; position: absolute; top: 0px; left: 0px; width: 252px; height: 530px; text-align: left; z-index: 11;");
	clearChildren(tDiv);
	eu2bMainDiv = document.createElement("div");
	eu2bMainDiv.setAttribute("id","eu2bMain");
	eu2bMainDiv.setAttribute("style", "position: absolute; background:black; height: 520px; width: 272px; top: 0px; left: 0px; color:white;font-size:10px");
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bMainTitle");
	tDiv2.setAttribute("style", "background:grey;padding-bottom:2px;padding-left:2px;font-size:12px;");
	tDiv2.setAttribute("onMouseOver", "if ( Math.random() > 0.5 ) this.style.background='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')'; else this.style.color='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')';");
	tDiv2.appendChild ( document.createTextNode("eu2b - v" + eu2bVersion + " - Main") );
	eu2bMainDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bMainObjectsTotalTitle");
	tDiv2.setAttribute("style", "position: absolute;top:23px;left:5px;background:black;");
	tDiv2.appendChild ( document.createTextNode(myLangArray[3][0] + ": " + myP.myTotals["Orbs"]) );
	eu2bMainDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bMainSSTotalTitle");
	tDiv2.setAttribute("style", "position: absolute;top:38px;left:5px;background:black");
	tDiv2.appendChild ( document.createTextNode(myLangArray[3][1] + ":" + myP.myTotals["StarSystems"]) );
	eu2bMainDiv.appendChild ( tDiv2 );	
	
	tDiv2 = document.createElement("div"); // make a loop for these
	tDiv2.setAttribute("id","eu2bMainPlanetsTitle");
	tDiv2.setAttribute("style", "position: absolute;top:53px;left:5px;background:black;");
	tDiv2.appendChild ( document.createTextNode(myLangArray[3][2] + ": " + myP.myTotals["Planets"]) );
	eu2bMainDiv.appendChild ( tDiv2 );	

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bMainFleetsTitle");
	tDiv2.setAttribute("style", "position: absolute;top:68px;left:5px;background:black;");
	tDiv2.appendChild ( document.createTextNode(myLangArray[3][3] + ": " + myP.myTotals["Fleets"]) );
	eu2bMainDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bMainAsteroidsTitle");
	tDiv2.setAttribute("style", "position:absolute;top:83px;left:5px;background:black;");
	tDiv2.appendChild ( document.createTextNode(myLangArray[3][4] + ": " + myP.myTotals["Asteroids"]) );
	eu2bMainDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bMainWreckagesTitle");
	tDiv2.setAttribute("style", "position: absolute;top:98px;left:5px;background:black;");
	tDiv2.appendChild ( document.createTextNode(myLangArray[3][5] + ": " + myP.myTotals["Wreckages"]) );
	eu2bMainDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bMainWormholesTitle");
	tDiv2.setAttribute("style", "position: absolute;top:113px;left:5px;background:black;");
	tDiv2.appendChild ( document.createTextNode(myLangArray[3][6] + ": " + myP.myTotals["Wormholes"]) );
	eu2bMainDiv.appendChild ( tDiv2 );				
		
	eu2bGalaxyMapDiv = document.createElement("div");
	eu2bGalaxyMapDiv.setAttribute ( "id", "eu2bGalaxyMap" );
	eu2bGalaxyMapDiv.setAttribute ( "style", "position:absolute;left:117px;top:20px;width:102;height:102;background:black;border: 1px solid rgb(128, 128, 200)");
	eu2bMainDiv.appendChild ( eu2bGalaxyMapDiv );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute ( "id", "eu2b50XLine");
	tDiv2.setAttribute ( "style", "position:absolute;top:71px;left:111px;width:115;height:0;border-style:solid;border-width:1px 0px 0px 0px;border-color:grey;");
	eu2bMainDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute ( "id", "eu2b50YLine");
	tDiv2.setAttribute ( "style", "position:absolute;top:18px;left:168px;width:0;height:108;border-style:solid;border-width:0px 0px 0px 1px;border-color:grey;");
	eu2bMainDiv.appendChild ( tDiv2 );

	var currentSS = getVal ("currentSS",cSS);
	bLog("DrawMain>currentSS>" + currentSS);
	if ( currentSS < 1 || currentSS > 10000 ) currentSS = 4950;

	// Begin SS objects chart
	var tD = document.createElement("input");
	tD.setAttribute("id","eu2bKeepCurrentCB");
	tD.setAttribute("type","checkbox");
	tD.setAttribute("style","cursor:pointer");
	tD.checked = true;
	setVal ( "KeepCurrent", true );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bKeepCurrentCBDiv");
	tDiv2.setAttribute("style", "position: absolute;top:144px;left:12px;background:black;font-size:10px");
	tDiv2.appendChild(tD);
	eu2bMainDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bKeepCurrentTitle");
	tDiv2.setAttribute("style", "position: absolute;top:140px;left:38px;background:black;font-size:10px");
	tDiv2.innerHTML = myLangArray[3][7];
	eu2bMainDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bMainSSTitle");
	tDiv2.setAttribute("style", "position: absolute;top:137px;left:110px;background:black;font-size:12px");
	tDiv2.innerHTML = myLangArray[3][9] + ":";
	eu2bMainDiv.appendChild ( tDiv2 );

	tD = document.createElement("div");
	tD.setAttribute("id","eu2bMMSSTBD");
	tD.setAttribute("style", "position: absolute;top:135px;left:215px;background:black;");
	tDiv2 = document.createElement("input");
	tDiv2.setAttribute("id", "eu2bMMSSTB");
	tDiv2.setAttribute("type", "text");
	tDiv2.setAttribute("maxlength","4");
	tDiv2.setAttribute("size","2");
	tDiv2.setAttribute("value", currentSS );
	tD.appendChild ( tDiv2 );
	eu2bMainDiv.appendChild ( tD );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute ( "id", "eu2bRightButton" );
	tDiv2.setAttribute ( "style", "position:absolute;top:133px;left:255px;width:15;height:22;background:#000088;border-style:solid;border-width:1px;border-color:grey;cursor:pointer;text-align:center;vertical-align:middle");
	tDiv2.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';");
	tDiv2.setAttribute("onMouseOut", "this.style.borderColor='grey'; this.style.backgroundColor='#000088';");
	tDiv2.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
	tDiv2.setAttribute("onMouseUp", "this.style.borderColor='grey';this.style.backgroundColor='#007700';");
	tDiv2.appendChild ( document.createTextNode(">") );
	eu2bMainDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute ( "id", "eu2bLeftButton" );
	tDiv2.setAttribute ( "style", "position:absolute;top:133px;left:199px;width:15;height:22;background:#000088;border-style:solid;border-width:1px;border-color:grey;cursor:pointer;text-align:center;vertical-align:middle");
	tDiv2.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';");
	tDiv2.setAttribute("onMouseOut", "this.style.borderColor='grey'; this.style.backgroundColor='#000088';");
	tDiv2.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
	tDiv2.setAttribute("onMouseUp", "this.style.borderColor='grey';this.style.backgroundColor='#007700';");
	tDiv2.appendChild ( document.createTextNode("<") );
	eu2bMainDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute ( "id", "eu2bUpButton" );
	tDiv2.setAttribute ( "style", "position:absolute;top:110px;left:225px;width:15;height:22;background:#000088;border-style:solid;border-width:1px;border-color:grey;cursor:pointer;text-align:center;vertical-align:middle");
	tDiv2.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';");
	tDiv2.setAttribute("onMouseOut", "this.style.borderColor='grey'; this.style.backgroundColor='#000088';");
	tDiv2.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
	tDiv2.setAttribute("onMouseUp", "this.style.borderColor='grey';this.style.backgroundColor='#007700';");
	tDiv2.appendChild ( document.createTextNode("/\\") );
	eu2bMainDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute ( "id", "eu2bDownButton" );
	tDiv2.setAttribute ( "style", "position:absolute;top:157px;left:225px;width:15;height:22;background:#000088;border-style:solid;border-width:1px;border-color:grey;cursor:pointer;text-align:center;vertical-align:middle");
	tDiv2.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';");
	tDiv2.setAttribute("onMouseOut", "this.style.borderColor='grey'; this.style.backgroundColor='#000088';");
	tDiv2.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
	tDiv2.setAttribute("onMouseUp", "this.style.borderColor='grey';this.style.backgroundColor='#007700';");
	tDiv2.appendChild ( document.createTextNode("\\/") );
	eu2bMainDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute ( "id", "eu2bGoButton" );
	tDiv2.setAttribute ( "style", "position:absolute;top:157px;left:150px;width:32;height:18;background:#000088;border-style:solid;border-width:1px;border-color:grey;text-align:center;cursor:pointer");
	tDiv2.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';");
	tDiv2.setAttribute("onMouseOut", "this.style.borderColor='grey'; this.style.backgroundColor='#000088';");
	tDiv2.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
	tDiv2.setAttribute("onMouseUp", "this.style.borderColor='grey';this.style.backgroundColor='#007700';");
	tDiv2.appendChild ( document.createTextNode(myLangArray[3][8]) );
	eu2bMainDiv.appendChild ( tDiv2 );
	
	var theX = 0;
	var theY = currentSS%100;
	if ( theY == 0 ) {
		theX = (currentSS/100) - 1;
		theY = 100;
	} else theX = (currentSS - (currentSS%100))/100;
	theX += 22;
	theY += 118;

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute ( "id", "eu2bXLine" );
	tDiv2.setAttribute ( "style", "position:absolute;top:" + theX + "px;left:"+(theY-10)+"px;width:20;height:0;border-style:solid;border-width:1px 0px 0px 0px;border-color:red;");
	eu2bMainDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute ( "id", "eu2bYLine");
	tDiv2.setAttribute ( "style", "position:absolute;top:"+(theX-10)+"px;left:" + theY + "px;width:0;height:20;border-style:solid;border-width:0px 0px 0px 1px;border-color:red;");
	eu2bMainDiv.appendChild ( tDiv2 );
	
	tD = returnSSData(currentSS,"Planets").split("¬");
	ssPlanetsButtonDiv = document.createElement("div");   // need to convert these div creations into a few  loops
	ssPlanetsButtonDiv.setAttribute("id","ssPlanetsButton");
	ssPlanetsButtonDiv.setAttribute("class","ssMBs");
	ssPlanetsButtonDiv.setAttribute("style", "position: absolute; background:rgb(0, 119, 0);border-style:solid;border-width:1px;border-color:grey; top: 181px; left: 1px; z-index:auto;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	ssPlanetsButtonDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	ssPlanetsButtonDiv.setAttribute("onMouseOut", "this.style.borderColor='grey';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	ssPlanetsButtonDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555'; this.oldColor = this.style.backgroundColor; var tmp = this.parentNode.getElementsByClassName('ssMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {if (tmp[i].style.backgroundColor!='rgb(0, 119, 0)') {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}} this.style.backgroundColor='rgb(0, 119, 119)';");
	ssPlanetsButtonDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';if (this.style.backgroundColor=='rgb(0, 119, 119)') {var tmp = this.parentNode.getElementsByClassName('ssMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}this.style.backgroundColor='rgb(0, 119, 0)';this.oldColor = 'rgb(0, 119, 0)';}else{this.style.backgroundColor=this.oldColor;}");
	if ( tD[1][0] == "S" ) ssPlanetsButtonDiv.innerHTML = "Planets<br>-";
	else ssPlanetsButtonDiv.innerHTML = "Planets<br>" + tD[0];
	ssPlanetsButtonDiv.addEventListener("click", showSSPlanets, false);
	eu2bMainDiv.appendChild(ssPlanetsButtonDiv);

	ssPlanetsListDiv = document.createElement("div");
	ssPlanetsListDiv.setAttribute("id","ssPlanetsList");
	ssPlanetsListDiv.setAttribute("style", "position: absolute; background:black; top: 215px; left: 2px; z-index:auto;color:white;font-size:10px;text-align:left;padding-top:0px;padding-bottom:2px;padding-left:2px;padding-right:3px;");
	ssPlanetsListDiv.innerHTML = tD[1];
	eu2bMainDiv.appendChild(ssPlanetsListDiv);

	tD = returnSSData(currentSS,"Fleets").split("¬");
	ssFleetsButtonDiv = document.createElement("div");
	ssFleetsButtonDiv.setAttribute("id","ssFleetsButton");
	ssFleetsButtonDiv.setAttribute("class","ssMBs");
	ssFleetsButtonDiv.setAttribute("style", "position: absolute; background:#000088;border-style:solid;border-width:1px;border-color:grey; top: 181px; left: 51px; z-index:auto;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	ssFleetsButtonDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	ssFleetsButtonDiv.setAttribute("onMouseOut", "this.style.borderColor='grey';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	ssFleetsButtonDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555'; this.oldColor = this.style.backgroundColor; var tmp = this.parentNode.getElementsByClassName('ssMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {if (tmp[i].style.backgroundColor!='rgb(0, 119, 0)') {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}} this.style.backgroundColor='rgb(0, 119, 119)';");
	ssFleetsButtonDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';if (this.style.backgroundColor=='rgb(0, 119, 119)') {var tmp = this.parentNode.getElementsByClassName('ssMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}this.style.backgroundColor='rgb(0, 119, 0)';this.oldColor = 'rgb(0, 119, 0)';}else{this.style.backgroundColor=this.oldColor;}");
	if ( tD[1][0] == "N" ) ssFleetsButtonDiv.innerHTML = "Fleets<br>-";
	else ssFleetsButtonDiv.innerHTML = "Fleets<br>" + tD[0];
	ssFleetsButtonDiv.addEventListener("click", showSSFleets, false);
	eu2bMainDiv.appendChild(ssFleetsButtonDiv);
	
	ssFleetsListDiv = document.createElement("div");
	ssFleetsListDiv.setAttribute("id","ssFleetsList");
	ssFleetsListDiv.setAttribute("style", "position: absolute; background:black; top: 215px; left: 2px; z-index:auto;color:white;font-size:10px;text-align:left;padding-top:0px;padding-bottom:2px;padding-left:2px;padding-right:3px");
	ssFleetsListDiv.innerHTML = tD[1];
	eu2bMainDiv.appendChild(ssFleetsListDiv);

	tD = returnSSData(currentSS,"Wormholes").split("¬");
	ssWormholesButtonDiv = document.createElement("div");
	ssWormholesButtonDiv.setAttribute("id","ssWormholesButton");
	ssWormholesButtonDiv.setAttribute("class","ssMBs");
	ssWormholesButtonDiv.setAttribute("style", "position: absolute; background:#000088;border-style:solid;border-width:1px;border-color:grey; top: 181px; left: 93px; z-index:auto;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	ssWormholesButtonDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	ssWormholesButtonDiv.setAttribute("onMouseOut", "this.style.borderColor='grey';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	ssWormholesButtonDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555'; this.oldColor = this.style.backgroundColor; var tmp = this.parentNode.getElementsByClassName('ssMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {if (tmp[i].style.backgroundColor!='rgb(0, 119, 0)') {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}} this.style.backgroundColor='rgb(0, 119, 119)';");
	ssWormholesButtonDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';if (this.style.backgroundColor=='rgb(0, 119, 119)') {var tmp = this.parentNode.getElementsByClassName('ssMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}this.style.backgroundColor='rgb(0, 119, 0)';this.oldColor = 'rgb(0, 119, 0)';}else{this.style.backgroundColor=this.oldColor;}");
	if ( tD[1][0] == "N" ) ssWormholesButtonDiv.innerHTML = "Wormholes<br>-";
	else ssWormholesButtonDiv.innerHTML = "Wormholes<br>" + tD[0];
	ssWormholesButtonDiv.addEventListener("click", showSSWormholes, false);
	eu2bMainDiv.appendChild(ssWormholesButtonDiv);
		
	ssWormholesListDiv = document.createElement("div");
	ssWormholesListDiv.setAttribute("id","ssWormholesList");
	ssWormholesListDiv.setAttribute("style", "position: absolute; background:black; top: 215px; left: 2px; z-index:auto;color:white;font-size:10px;text-align:left;padding-top:0px;padding-bottom:2px;padding-left:2px;padding-right:3px");
	ssWormholesListDiv.innerHTML = tD[1];
	eu2bMainDiv.appendChild(ssWormholesListDiv);

	tD = returnSSData(currentSS,"Wreckages").split("¬");
	ssWreckagesButtonDiv = document.createElement("div");
	ssWreckagesButtonDiv.setAttribute("id","ssWreckagesButton");
	ssWreckagesButtonDiv.setAttribute("class","ssMBs");
	ssWreckagesButtonDiv.setAttribute("style", "position: absolute; background:#000088;border-style:solid;border-width:1px;border-color:grey; top: 181px; left: 165px; z-index:auto;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	ssWreckagesButtonDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	ssWreckagesButtonDiv.setAttribute("onMouseOut", "this.style.borderColor='grey';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	ssWreckagesButtonDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555'; this.oldColor = this.style.backgroundColor; var tmp = this.parentNode.getElementsByClassName('ssMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {if (tmp[i].style.backgroundColor!='rgb(0, 119, 0)') {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}} this.style.backgroundColor='rgb(0, 119, 119)';");
	ssWreckagesButtonDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';if (this.style.backgroundColor=='rgb(0, 119, 119)') {var tmp = this.parentNode.getElementsByClassName('ssMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}this.style.backgroundColor='rgb(0, 119, 0)';this.oldColor = 'rgb(0, 119, 0)';}else{this.style.backgroundColor=this.oldColor;}");
	if ( tD[1][0] == "N" ) ssWreckagesButtonDiv.innerHTML = "Wreckages<br>-";
	else ssWreckagesButtonDiv.innerHTML = "Wreckages<br>" + tD[0];
	ssWreckagesButtonDiv.addEventListener("click", showSSWreckages, false);
	eu2bMainDiv.appendChild(ssWreckagesButtonDiv);
		
	ssWreckagesListDiv = document.createElement("div");
	ssWreckagesListDiv.setAttribute("id","ssWreckagesList");
	ssWreckagesListDiv.setAttribute("style", "position: absolute; background:black; top: 215px; left: 2px; height:301px;width:265px; z-index:auto;color:white;font-size:10px;text-align:left;padding-top:0px;padding-bottom:2px;padding-left:2px;padding-right:3px;overflow:auto");
	ssWreckagesListDiv.innerHTML = tD[1];
	eu2bMainDiv.appendChild(ssWreckagesListDiv);

	tD = returnSSData(currentSS,"Asteroids").split("¬");
	ssAsteroidsButtonDiv = document.createElement("div");	
	ssAsteroidsButtonDiv.setAttribute("id","ssAsteroidsButton");
	ssAsteroidsButtonDiv.setAttribute("class","ssMBs");
	ssAsteroidsButtonDiv.setAttribute("style", "position: absolute; background:#000088;border-style:solid;border-width:1px;border-color:grey; top: 181px; left: 235px; z-index:auto;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	ssAsteroidsButtonDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	ssAsteroidsButtonDiv.setAttribute("onMouseOut", "this.style.borderColor='grey';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	ssAsteroidsButtonDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555'; this.oldColor = this.style.backgroundColor; var tmp = this.parentNode.getElementsByClassName('ssMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {if (tmp[i].style.backgroundColor!='rgb(0, 119, 0)') {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}} this.style.backgroundColor='rgb(0, 119, 119)';");
	ssAsteroidsButtonDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';if (this.style.backgroundColor=='rgb(0, 119, 119)') {var tmp = this.parentNode.getElementsByClassName('ssMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}this.style.backgroundColor='rgb(0, 119, 0)';this.oldColor = 'rgb(0, 119, 0)';}else{this.style.backgroundColor=this.oldColor;}");
	if ( tD[1][0] == "N" ) ssAsteroidsButtonDiv.innerHTML = "Roids<br>-";
	else ssAsteroidsButtonDiv.innerHTML = "Roids<br>" + tD[0];
	ssAsteroidsButtonDiv.addEventListener("click", showSSAsteroids, false);
	eu2bMainDiv.appendChild(ssAsteroidsButtonDiv);
	ssAsteroidsListDiv = document.createElement("div");
	ssAsteroidsListDiv.setAttribute("id","ssAsteroidsList");
	ssAsteroidsListDiv.setAttribute("style", "position: absolute; background:black; top: 215px; left: 2px;height:301px;width:265px;z-index:auto;color:white;font-size:10px;text-align:left;padding-top:0px;padding-bottom:2px;padding-left:2px;padding-right:3px;overflow:auto");
	ssAsteroidsListDiv.innerHTML = tD[1]
	eu2bMainDiv.appendChild(ssAsteroidsListDiv);

	ssFleetsListDiv.style.visibility = "hidden";
	ssWormholesListDiv.style.visibility = "hidden";
	ssWreckagesListDiv.style.visibility = "hidden";
	ssAsteroidsListDiv.style.visibility = "hidden";
	// End SS Objects Chart
	tDiv.appendChild(eu2bMainDiv);
	
	eu2bRoidsDiv = document.createElement("div");
	eu2bRoidsDiv.setAttribute("id","eu2bRoids");
	eu2bRoidsDiv.setAttribute("style", "position: absolute; background:black; height: 520px; width: 272px; top: 0px; left: 0px; z-index:auto;color:white;font-size:10px;visibility:hidden");

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bRoidsTitle");
	tDiv2.setAttribute("style", "background:grey;padding-bottom:2px;padding-left:2px;font-size:12px");
	tDiv2.setAttribute("onMouseOver", "if ( Math.random() > 0.5 ) this.style.background='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')'; else this.style.color='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')';");
	tDiv2.appendChild ( document.createTextNode("eu2b - v" + eu2bVersion + " - Asteroids") );
	eu2bRoidsDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bAsteroidsTotalTitle");
	tDiv2.setAttribute("style", "position: absolute;top:20px;left:10px;background:black;font-size:14px");
	tDiv2.appendChild ( document.createTextNode(myLangArray[2][0] + ": " + myP.myTotals["Asteroids"]) );
	eu2bRoidsDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bAsteroidsSearchAsc");
	tDiv2.setAttribute("style", "position: absolute;top:20px;left:200px;background:#000088;border-style:solid;border-width:1px;border-color:grey;font-size:12px;padding-left:2px;padding-right:2px;cursor:pointer");
	tDiv2.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';this.oldColor = this.style.backgroundColor;");
	tDiv2.setAttribute("onMouseOut", "this.style.borderColor='grey';if (typeof(this.oldColor) != 'undefined') this.style.backgroundColor=this.oldColor;else this.style.backgroundColor='#000000';");
	tDiv2.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
	tDiv2.setAttribute("onMouseUp", "this.style.borderColor='grey';this.nextSibling.style.backgroundColor='#000088'; this.style.backgroundColor='#007700';this.oldColor = '#007700';");
	tDiv2.appendChild ( document.createTextNode(myLangArray[5][3]) );
	eu2bRoidsDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bAsteroidsSearchDec");
	tDiv2.setAttribute("style", "position: absolute;top:20px;left:230px;background:#000088;border-style:solid;border-width:1px;border-color:grey;font-size:12px;padding-left:2px;padding-right:2px;cursor:pointer");
	tDiv2.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';this.oldColor = this.style.backgroundColor;");
	tDiv2.setAttribute("onMouseOut", "this.style.borderColor='grey';if (typeof(this.oldColor) != 'undefined') this.style.backgroundColor=this.oldColor;else this.style.backgroundColor='#000000';");
	tDiv2.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
	tDiv2.setAttribute("onMouseUp", "this.style.borderColor='grey';this.previousSibling.style.backgroundColor='#000088'; this.style.backgroundColor='#007700';this.oldColor = '#007700';");
	tDiv2.appendChild ( document.createTextNode(myLangArray[5][4]) );
	eu2bRoidsDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bAsteroidsList");
	tDiv2.setAttribute("style", "position: absolute;top:40px;left:2px;height:475;width:270;background:black;font-size:10px;overflow:auto");
	if ( typeof(myP.asteroidString) != "string" || myP.asteroidString == '' )  tDiv2.innerHTML = myLangArray[5][17] + myLangArray[3][4] + myLangArray[5][18] + "";
	else tDiv2.innerHTML = myP.asteroidString;
	eu2bRoidsDiv.appendChild ( tDiv2 );
	
	tDiv.appendChild(eu2bRoidsDiv);
	
	eu2bWreckagesDiv = document.createElement("div");
	eu2bWreckagesDiv.setAttribute("id","eu2bWreckages");
	eu2bWreckagesDiv.setAttribute("style", "position: absolute; background:black; height: 520px; width: 272px; top: 0px; left: 0px; z-index:auto;color:white;font-size:10px;visibility:hidden");

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bWreckagesTitle");
	tDiv2.setAttribute("style", "background:grey;padding-bottom:2px;padding-left:2px;font-size:12px");
	tDiv2.setAttribute("onMouseOver", "if ( Math.random() > 0.5 ) this.style.background='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')'; else this.style.color='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')';");
	tDiv2.appendChild ( document.createTextNode("eu2b - v" + eu2bVersion + " - Wreckages") );
	eu2bWreckagesDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bWreckagesTotalTitle");
	tDiv2.setAttribute("style", "position: absolute;top:20px;left:10px;background:black;font-size:14px");
	tDiv2.appendChild ( document.createTextNode(myLangArray[2][1] + ": " + myP.myTotals["Wreckages"]) );
	eu2bWreckagesDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bWreckagesSearchAsc");
	tDiv2.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';this.oldColor = this.style.backgroundColor;");
	tDiv2.setAttribute("onMouseOut", "this.style.borderColor='grey';if (typeof(this.oldColor) != 'undefined') this.style.backgroundColor=this.oldColor;else this.style.backgroundColor='#000000';");
	tDiv2.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
	tDiv2.setAttribute("onMouseUp", "this.style.borderColor='grey';this.nextSibling.style.backgroundColor='#000088'; this.style.backgroundColor='#007700';this.oldColor = '#007700';");
	tDiv2.setAttribute("style", "position: absolute;top:20px;left:200px;background:#000088;border-style:solid;border-width:1px;border-color:grey;font-size:12px;padding-left:2px;padding-right:2px;cursor:pointer");
	tDiv2.appendChild ( document.createTextNode(myLangArray[5][3]) );
	eu2bWreckagesDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bWreckagesSearchDec");
	tDiv2.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';this.oldColor = this.style.backgroundColor;");
	tDiv2.setAttribute("onMouseOut", "this.style.borderColor='grey';if (typeof(this.oldColor) != 'undefined') this.style.backgroundColor=this.oldColor;else this.style.backgroundColor='#000000';");
	tDiv2.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
	tDiv2.setAttribute("onMouseUp", "this.style.borderColor='grey';this.previousSibling.style.backgroundColor='#000088'; this.style.backgroundColor='#007700';this.oldColor = '#007700';");
	tDiv2.setAttribute("style", "position: absolute;top:20px;left:230px;background:#000088;border-style:solid;border-width:1px;border-color:grey;font-size:12px;padding-left:2px;padding-right:2px;cursor:pointer");
	tDiv2.appendChild ( document.createTextNode(myLangArray[5][4]) );
	eu2bWreckagesDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bWreckagesList");
	tDiv2.setAttribute("style", "position: absolute;top:40px;left:2px;height:475;width:270;background:black;font-size:10px;overflow:auto");
	if ( typeof(myP.wreckageString) != "string" || myP.wreckageString == '' )  tDiv2.innerHTML = myLangArray[5][17] + myLangArray[3][5] + myLangArray[5][18] + "";
	else tDiv2.innerHTML = myP.wreckageString;
	eu2bWreckagesDiv.appendChild ( tDiv2 );
	
	tDiv.appendChild(eu2bWreckagesDiv);
	
	eu2bWormholesDiv = document.createElement("div");
	eu2bWormholesDiv.setAttribute("id","eu2bWormholes");
	eu2bWormholesDiv.setAttribute("style", "position: absolute; background:black; height: 520px; width: 272px; top: 0px; left: 0px; z-index:auto;color:white;font-size:10px;visibility:hidden");

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bWormholesTitle");
	tDiv2.setAttribute("style", "background:grey;padding-bottom:2px;padding-left:2px;font-size:12px");
	tDiv2.setAttribute("onMouseOver", "if ( Math.random() > 0.5 ) this.style.background='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')'; else this.style.color='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')';");
	tDiv2.appendChild ( document.createTextNode("eu2b - v" + eu2bVersion + " - Wormholes") );
	eu2bWormholesDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bWormholesTotalTitle");
	tDiv2.setAttribute("style", "position: absolute;top:20px;left:10px;background:black;font-size:14px");
	tDiv2.appendChild ( document.createTextNode(myLangArray[2][2] + ": " + myP.myTotals["Wormholes"]) );
	eu2bWormholesDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bWormholesSearchAsc");
	tDiv2.setAttribute("style", "position: absolute;top:20px;left:200px;background:#000088;border-style:solid;border-width:1px;border-color:grey;font-size:12px;padding-left:2px;padding-right:2px;cursor:pointer");
	tDiv2.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';this.oldColor = this.style.backgroundColor;");
	tDiv2.setAttribute("onMouseOut", "this.style.borderColor='grey';if (typeof(this.oldColor) != 'undefined') this.style.backgroundColor=this.oldColor;else this.style.backgroundColor='#000000';");
	tDiv2.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
	tDiv2.setAttribute("onMouseUp", "this.style.borderColor='grey';this.nextSibling.style.backgroundColor='#000088'; this.style.backgroundColor='#007700';this.oldColor = '#007700';");
	tDiv2.appendChild ( document.createTextNode(myLangArray[5][3]) );
	eu2bWormholesDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bWormholesSearchDec");
	tDiv2.setAttribute("style", "position: absolute;top:20px;left:230px;background:#000088;border-style:solid;border-width:1px;border-color:grey;font-size:12px;padding-left:2px;padding-right:2px;cursor:pointer");
	tDiv2.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';this.oldColor = this.style.backgroundColor;");
	tDiv2.setAttribute("onMouseOut", "this.style.borderColor='grey';if (typeof(this.oldColor) != 'undefined') this.style.backgroundColor=this.oldColor;else this.style.backgroundColor='#000000';");
	tDiv2.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
	tDiv2.setAttribute("onMouseUp", "this.style.borderColor='grey';this.previousSibling.style.backgroundColor='#000088';this.style.backgroundColor='#007700';this.oldColor = '#007700';");
	tDiv2.appendChild ( document.createTextNode(myLangArray[5][4]) );
	eu2bWormholesDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bWormholesList");
	tDiv2.setAttribute("style", "position: absolute;top:40px;left:2px;height:475;width:270;background:black;font-size:10px;overflow:auto");
	if ( typeof(myP.wormholeString) != "string" || myP.wormholeString == '' )  tDiv2.innerHTML = myLangArray[5][17] + myLangArray[3][6] + myLangArray[5][18] + "";
	else tDiv2.innerHTML = myP.wormholeString;
	eu2bWormholesDiv.appendChild ( tDiv2 );
	
	tDiv.appendChild(eu2bWormholesDiv);

	eu2bWormholesRouteDiv = document.createElement("div");
	eu2bWormholesRouteDiv.setAttribute("id","eu2bWormholesRoute");
	eu2bWormholesRouteDiv.setAttribute("style", "position: absolute; background:black; height: 520px; width: 272px; top: 0px; left: 0px; z-index:auto;color:white;font-size:10px;visibility:hidden");

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bWormholesRouteTitle");
	tDiv2.setAttribute("onMouseOver", "if ( Math.random() > 0.5 ) this.style.background='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')'; else this.style.color='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')';");
	tDiv2.setAttribute("style", "background:grey;padding-bottom:2px;padding-left:2px;font-size:12px");
	tDiv2.appendChild ( document.createTextNode("eu2b - v" + eu2bVersion + " - " + myLangArray[1][8]) );
	eu2bWormholesRouteDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bWormholesRouteOSStart");
	tDiv2.setAttribute("style", "position: absolute;top:20px;left:1px;background:black;font-size:14px");
	tDiv2.appendChild ( document.createTextNode(myLangArray[7][20]) );
	eu2bWormholesRouteDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("input");
	tDiv2.setAttribute("id","eu2bOSStartRoute");
	tDiv2.setAttribute("type","text");
	tDiv2.setAttribute("style", "position:absolute;top:20px;left:45px;font-size:10px;color:black;background:white;cursor:text" );	
	tDiv2.setAttribute("size","5");
	tDiv2.setAttribute("maxLength","5");
	tDiv2.setAttribute("value","");
	eu2bWormholesRouteDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bWormholesRouteOSEnd");
	tDiv2.setAttribute("style", "position: absolute;top:20px;left:100px;background:black;font-size:14px");
	tDiv2.appendChild ( document.createTextNode(myLangArray[7][21]) );
	eu2bWormholesRouteDiv.appendChild ( tDiv2 );	

	tDiv2 = document.createElement("input");
	tDiv2.setAttribute("id","eu2bOSEndRoute");
	tDiv2.setAttribute("type","text");
	tDiv2.setAttribute("style", "position:absolute;top:20px;left:135px;font-size:10px;color:black;background:white;cursor:text" );	
	tDiv2.setAttribute("size","5");
	tDiv2.setAttribute("maxLength","5");
	tDiv2.setAttribute("value","");
	eu2bWormholesRouteDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bWormholesSearchRoute");
	tDiv2.setAttribute("style", "position: absolute;top:20px;left:230px;background:#000088;border-style:solid;border-width:1px;border-color:grey;font-size:12px;padding-left:2px;padding-right:2px;cursor:pointer");
	tDiv2.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';");
	tDiv2.setAttribute("onMouseOut", "this.style.borderColor='grey';this.style.backgroundColor='#000088';");
	tDiv2.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
	tDiv2.setAttribute("onMouseUp", "this.style.borderColor='grey';this.style.backgroundColor='#000088';");
	tDiv2.appendChild ( document.createTextNode(myLangArray[7][19]) );
	eu2bWormholesRouteDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bWormholesRouteList");
	tDiv2.setAttribute("style", "position: absolute;top:40px;left:2px;height:475;width:270;background:black;font-size:10px;overflow:auto");
	tDiv2.innerHTML = myLangArray[7][22];
	eu2bWormholesRouteDiv.appendChild ( tDiv2 );
	
	tDiv.appendChild(eu2bWormholesRouteDiv);	

	eu2bTriangulationDiv = document.createElement("div");
	eu2bTriangulationDiv.setAttribute("id","eu2bTriangulation");
	eu2bTriangulationDiv.setAttribute("style", "position: absolute; background:black; height: 520px; width: 272px; top: 0px; left: 0px; z-index:auto;color:white;font-size:10px;visibility:hidden");

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bTriangulationTitle");
	tDiv2.setAttribute("onMouseOver", "if ( Math.random() > 0.5 ) this.style.background='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')'; else this.style.color='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')';");
	tDiv2.setAttribute("style", "background:grey;padding-bottom:2px;padding-left:2px;font-size:12px");
	tDiv2.appendChild ( document.createTextNode("eu2b - v" + eu2bVersion + " - " + myLangArray[1][9]) );
	eu2bTriangulationDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bTriangulationOSStart1");
	tDiv2.setAttribute("style", "position: absolute;top:20px;left:1px;background:black;font-size:10px");
	tDiv2.appendChild ( document.createTextNode(myLangArray[8][0]) );
	eu2bTriangulationDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("input");
	tDiv2.setAttribute("id","eu2bOSStartTriangulation1");
	tDiv2.setAttribute("type","text");
	tDiv2.setAttribute("style", "position:absolute;top:20px;left:48px;font-size:10px;color:black;background:white;cursor:text" );	
	tDiv2.setAttribute("size","4");
	tDiv2.setAttribute("maxLength","4");
	tDiv2.setAttribute("value","");
	eu2bTriangulationDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bTriangulationDistance1");
	tDiv2.setAttribute("style", "position: absolute;top:20px;left:90px;background:black;font-size:10px");
	tDiv2.appendChild ( document.createTextNode(myLangArray[8][1]) );
	eu2bTriangulationDiv.appendChild ( tDiv2 );	

	tDiv2 = document.createElement("input");
	tDiv2.setAttribute("id","eu2bDistanceTriangulation1");
	tDiv2.setAttribute("type","text");
	tDiv2.setAttribute("style", "position:absolute;top:20px;left:140px;font-size:10px;color:black;background:white;cursor:text" );	
	tDiv2.setAttribute("size","3");
	tDiv2.setAttribute("maxLength","3");
	tDiv2.setAttribute("value","");
	eu2bTriangulationDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bTriangulationOSStart2");
	tDiv2.setAttribute("style", "position: absolute;top:40px;left:1px;background:black;font-size:10px");
	tDiv2.appendChild ( document.createTextNode(myLangArray[8][0]) );
	eu2bTriangulationDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("input");
	tDiv2.setAttribute("id","eu2bOSStartTriangulation2");
	tDiv2.setAttribute("type","text");
	tDiv2.setAttribute("style", "position:absolute;top:40px;left:48px;font-size:10px;color:black;background:white;cursor:text" );	
	tDiv2.setAttribute("size","4");
	tDiv2.setAttribute("maxLength","4");
	tDiv2.setAttribute("value","");
	eu2bTriangulationDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bTriangulationDistance2");
	tDiv2.setAttribute("style", "position: absolute;top:40px;left:90px;background:black;font-size:10px");
	tDiv2.appendChild ( document.createTextNode(myLangArray[8][1]) );
	eu2bTriangulationDiv.appendChild ( tDiv2 );	

	tDiv2 = document.createElement("input");
	tDiv2.setAttribute("id","eu2bDistanceTriangulation2");
	tDiv2.setAttribute("type","text");
	tDiv2.setAttribute("style", "position:absolute;top:40px;left:140px;font-size:10px;color:black;background:white;cursor:text" );	
	tDiv2.setAttribute("size","3");
	tDiv2.setAttribute("maxLength","3");
	tDiv2.setAttribute("value","");
	eu2bTriangulationDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bTriangulationOSStart3");
	tDiv2.setAttribute("style", "position: absolute;top:60px;left:1px;background:black;font-size:10px");
	tDiv2.appendChild ( document.createTextNode(myLangArray[8][0]) );
	eu2bTriangulationDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("input");
	tDiv2.setAttribute("id","eu2bOSStartTriangulation3");
	tDiv2.setAttribute("type","text");
	tDiv2.setAttribute("style", "position:absolute;top:60px;left:48px;font-size:10px;color:black;background:white;cursor:text" );	
	tDiv2.setAttribute("size","4");
	tDiv2.setAttribute("maxLength","4");
	tDiv2.setAttribute("value","");
	eu2bTriangulationDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bTriangulationDistance3");
	tDiv2.setAttribute("style", "position: absolute;top:60px;left:90px;background:black;font-size:10px");
	tDiv2.appendChild ( document.createTextNode(myLangArray[8][1]) );
	eu2bTriangulationDiv.appendChild ( tDiv2 );	

	tDiv2 = document.createElement("input");
	tDiv2.setAttribute("id","eu2bDistanceTriangulation3");
	tDiv2.setAttribute("type","text");
	tDiv2.setAttribute("style", "position:absolute;top:60px;left:140px;font-size:10px;color:black;background:white;cursor:text" );	
	tDiv2.setAttribute("size","3");
	tDiv2.setAttribute("maxLength","3");
	tDiv2.setAttribute("value","");
	eu2bTriangulationDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bcalcTriangulation");
	tDiv2.setAttribute("style", "position: absolute;top:20px;left:230px;background:#000088;border-style:solid;border-width:1px;border-color:grey;font-size:12px;padding-left:2px;padding-right:2px;cursor:pointer");
	tDiv2.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';");
	tDiv2.setAttribute("onMouseOut", "this.style.borderColor='grey';this.style.backgroundColor='#000088';");
	tDiv2.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
	tDiv2.setAttribute("onMouseUp", "this.style.borderColor='grey';this.style.backgroundColor='#000088';");	
	tDiv2.appendChild (document.createTextNode(myLangArray[7][19]));
	eu2bTriangulationDiv.appendChild (tDiv2);

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bTriangulationList");
	tDiv2.setAttribute("style", "position: absolute;top:90px;left:2px;height:475;width:270;background:black;font-size:10px;overflow:auto");
	tDiv2.innerHTML = myLangArray[8][11];	
	eu2bTriangulationDiv.appendChild ( tDiv2 );
	
	tDiv.appendChild(eu2bTriangulationDiv);		
	
	eu2bSearchDiv = document.createElement("div");
	eu2bSearchDiv.setAttribute("id","eu2bSearch");
	eu2bSearchDiv.setAttribute("style", "position: absolute; background:black; height: 520px; width: 272px; top: 0px; left: 0px; z-index:auto;color:white;font-size:10px;visibility:hidden");

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bSearchTitle");
	tDiv2.setAttribute("onMouseOver", "if ( Math.random() > 0.5 ) this.style.background='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')'; else this.style.color='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')';");
	tDiv2.setAttribute("style", "background:grey;padding-bottom:2px;padding-left:2px;font-size:12px");
	tDiv2.appendChild ( document.createTextNode("eu2b - v" + eu2bVersion + " - Search") );
	eu2bSearchDiv.appendChild ( tDiv2 );

	tD = document.createElement("div");
	tD.setAttribute("id","eu2bSearchTBD");
	tD.setAttribute("style", "position: absolute;top:20px;left:2px;background:black;");
	tDiv2 = document.createElement("input");
	tDiv2.setAttribute("id", "eu2bSearchTB");
	tDiv2.setAttribute("type", "text");
	tDiv2.setAttribute("maxlength","50");
	tDiv2.setAttribute("size","40");
	tDiv2.setAttribute("value", "" );
	tD.appendChild ( tDiv2 );
	eu2bSearchDiv.appendChild ( tD );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bSearchSearch");
	tDiv2.setAttribute("style", "position: absolute;top:45px;left:10px;width:100;background:#000088;border-style:solid;border-width:1px;border-color:grey;font-size:14px;text-align:center;cursor:pointer");
	tDiv2.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';");
	tDiv2.setAttribute("onMouseOut", "this.style.borderColor='grey'; this.style.backgroundColor='#000088';");
	tDiv2.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
	tDiv2.setAttribute("onMouseUp", "this.style.borderColor='grey';this.style.backgroundColor='#007700';");
	tDiv2.appendChild ( document.createTextNode("Search") );
	eu2bSearchDiv.appendChild ( tDiv2 );
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bSearchTotalTitle");
	tDiv2.setAttribute("style", "position: absolute;top:45px;left:120px;background:black;font-size:14px");
	tDiv2.appendChild ( document.createTextNode(myLangArray[2][3] + ": 0") );
	eu2bSearchDiv.appendChild ( tDiv2 );

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bResults");
	tDiv2.setAttribute("style", "position: absolute;top:65px;left:2px;height:450;width:270;background:black;font-size:10px;overflow:auto");
	tDiv2.innerHTML = myLangArray[5][8];
	eu2bSearchDiv.appendChild ( tDiv2 );
	
	tDiv.appendChild(eu2bSearchDiv);

	eu2bOptionsDiv = document.createElement("div");
	eu2bOptionsDiv.setAttribute("id","eu2bOptions");
	eu2bOptionsDiv.setAttribute("style", "position: absolute; background:black; height: 520px; width: 272px; top: 0px; left: 0px; z-index:auto;color:white;font-size:10px;visibility:hidden");
	
	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bOptionsTitle");
	tDiv2.setAttribute("style", "background:grey;padding-bottom:2px;padding-left:2px;font-size:12px");
	tDiv2.setAttribute("onMouseOver", "if ( Math.random() > 0.5 ) this.style.background='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')'; else this.style.color='rgb('+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+','+(Math.round(Math.random()*1000000) % 256)+')';");
	tDiv2.appendChild ( document.createTextNode("eu2b - v" + eu2bVersion + " - "+ myLangArray[1][7]) );
	eu2bOptionsDiv.appendChild ( tDiv2 );
	var mOrbs = myP.myOrbs;
	mCount = 2;
	if ( getVal("eu2bTrackPlanetsCB",42) == 42 ) setVal("eu2bTrackPlanetsCB",false);
	if ( getVal("eu2bTrackFleetsCB",42) == 42 ) setVal("eu2bTrackFleetsCB",false);
	if ( getVal("eu2bTrackAsteroidsCB",42) == 42 ) setVal("eu2bTrackAsteroidsCB",true);
	if ( getVal("eu2bTrackWreckagesCB",42) == 42 ) setVal("eu2bTrackWreckagesCB",true);
	if ( getVal("eu2bTrackWormholesCB",42) == 42 ) setVal("eu2bTrackWormholesCB",false);
	var tString = "<table style='font-size:10px'><tbody><tr><td></td><td style='border-style:solid;border-width:0px 1px 0px 0px;border-color:grey;'>&nbsp;</td><td colspan=2 style='background:rgb(80,0,0);text-align:center;border-style:solid;border-width:0px 1px 0px 0px;border-color:grey;'>"+myLangArray[6][3]+"</td><td style='background:rgb(0,80,0);text-align:center;border-style:solid;border-width:0px 1px 0px 0px;border-color:grey;'>"+myLangArray[6][4]+"</td></tr><tr><td style='border-style:solid;border-width:0px 1px 1px 0px;border-color:grey;text-align:center'>"+myLangArray[6][1]+"</td><td style='border-style:solid;border-width:0px 1px 1px 0px;border-color:grey;text-align:center'>"+myLangArray[6][5]+"</td><td style='background:rgb(80,0,0);border-style:solid;border-width:0px 1px 1px 0px;border-color:grey;text-align:center'>"+myLangArray[6][6]+"</td><td style='background:rgb(80,0,0);border-style:solid;border-width:0px 1px 1px 0px;border-color:grey;text-align:center'>"+myLangArray[6][7]+"</td><td style='background:rgb(0,80,0);border-style:solid;border-width:0px 1px 1px 0px;border-color:grey;text-align:center'>"+myLangArray[6][8]+"</td></tr>";
	for ( var g = 0 ; g < orbTypes.length ; ++g ) {
		tString += "<tr><td style='border-style:solid;border-width:0px 1px 1px 0px;border-color:grey;text-align:center'>"+myLangArray[3][mCount++]+"</td><td style='border-style:solid;border-width:0px 1px 1px 0px;border-color:grey;text-align:center'><input id='eu2bTrack"+orbTypes[g]+"CB' type='checkbox' "+(getVal("eu2bTrack"+orbTypes[g]+"CB",true)?'CHECKED':'')+" style='cursor:pointer'></input></td><td style='background:rgb(80,0,0);border-style:solid;border-width:0px 1px 1px 0px;border-color:grey;text-align:center'><div id='eu2bAll"+orbTypes[g]+"Delete' style='background:#000088;border-style:solid;border-width:1px;border-color:grey;font-size:10px;text-align:center;padding:2px;cursor:pointer' onmouseover='this.style.borderColor=\"#cccccc\";' onmouseout='this.style.borderColor=\"grey\"; this.style.backgroundColor=\"#000088\";' onmousedown='this.style.borderColor=\"#555555\";this.style.backgroundColor=\"#007777\";' onmouseup='this.style.borderColor=\"grey\";this.style.backgroundColor=\"#000088\";'>"+myLangArray[6][6]+"</div></td><td style='background:rgb(80,0,0);border-style:solid;border-width:0px 1px 1px 0px;border-color:grey;text-align:center'><div id='eu2bNew"+orbTypes[g]+"Delete' style='background:#000088;border-style:solid;border-width:1px;border-color:grey;font-size:10px;text-align:center;padding:2px;cursor:pointer' onmouseover='this.style.borderColor=\"#cccccc\";' onmouseout='this.style.borderColor=\"grey\"; this.style.backgroundColor=\"#000088\";' onmousedown='this.style.borderColor=\"#555555\";this.style.backgroundColor=\"#007777\";' onmouseup='this.style.borderColor=\"grey\";this.style.backgroundColor=\"#000088\";'>"+myLangArray[6][9]+"</div></td><td style='background:rgb(0,80,0);border-style:solid;border-width:0px 1px 1px 0px;border-color:grey;text-align:center'><div id='eu2bSaveNew"+orbTypes[g]+"' style='background:#000088;border-style:solid;border-width:1px;border-color:grey;font-size:10px;text-align:center;padding:2px;cursor:pointer' onmouseover='this.style.borderColor=\"#cccccc\";' onmouseout='this.style.borderColor=\"grey\"; this.style.backgroundColor=\"#000088\";' onmousedown='this.style.borderColor=\"#555555\";this.style.backgroundColor=\"#007777\";' onmouseup='this.style.borderColor=\"grey\";this.style.backgroundColor=\"#000088\";'>"+myLangArray[6][10]+"</div></td></tr>"
	}
	eu2bOptionsDiv.innerHTML += tString + "</tbody></table><br><br><input id='eu2bSaveOnExitCB' type='checkbox' "+(getVal("eu2bSaveOnExitCB",true)?'CHECKED':'')+" style='cursor:pointer'>"+myLangArray[6][11]+"</input>";

	tDiv.appendChild(eu2bOptionsDiv);

	eu2bButtonsDiv = document.createElement("div");
	eu2bButtonsDiv.setAttribute("id","eu2bButtons");
	eu2bButtonsDiv.setAttribute("style", "position: absolute; background:black; height: 35px; width: 272px; top: 515px; left: 0px");
	
	eu2bChatButtonDiv = document.createElement("div");
	eu2bChatButtonDiv.setAttribute("id","eu2bChatButton");
	eu2bChatButtonDiv.setAttribute("class","eu2bMBs");
	eu2bChatButtonDiv.setAttribute("style", "position: absolute; background:#000088; top: -1px; left: 29px;width:25; border-style:solid;border-width:1px;border-color:grey;z-index:auto;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	eu2bChatButtonDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bChatButtonDiv.setAttribute("onMouseOut", "this.style.borderColor='grey';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bChatButtonDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555'; this.oldColor = this.style.backgroundColor; var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {if (tmp[i].style.backgroundColor!='rgb(0, 119, 0)') {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}} this.style.backgroundColor='rgb(0, 119, 119)';");
	eu2bChatButtonDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';if (this.style.backgroundColor=='rgb(0, 119, 119)') {var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}this.style.backgroundColor='rgb(0, 119, 0)';this.oldColor = 'rgb(0, 119, 0)';}else{this.style.backgroundColor=this.oldColor;}");
	eu2bChatButtonDiv.addEventListener("click", showChat, false);
	eu2bChatButtonDiv.appendChild(document.createTextNode(myLangArray[1][0]));
	eu2bButtonsDiv.appendChild(eu2bChatButtonDiv);
	
	eu2bMainButtonDiv = document.createElement("div");
	eu2bMainButtonDiv.setAttribute("id","eu2bMainButton");
	eu2bMainButtonDiv.setAttribute("class","eu2bMBs");
	eu2bMainButtonDiv.setAttribute("style", "position: absolute; background:green; top: -1px; left: 63px; border-style:solid;border-width:1px;border-color:grey;z-index:auto;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	eu2bMainButtonDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bMainButtonDiv.setAttribute("onMouseOut", "this.style.borderColor='grey';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bMainButtonDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555'; this.oldColor = this.style.backgroundColor; var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {if (tmp[i].style.backgroundColor!='rgb(0, 119, 0)') {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}} this.style.backgroundColor='rgb(0, 119, 119)';");
	eu2bMainButtonDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';if (this.style.backgroundColor=='rgb(0, 119, 119)') {var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}this.style.backgroundColor='rgb(0, 119, 0)';this.oldColor = 'rgb(0, 119, 0)';}else{this.style.backgroundColor=this.oldColor;}");
	eu2bMainButtonDiv.addEventListener("click", showMain, false);
	eu2bMainButtonDiv.appendChild(document.createTextNode(myLangArray[1][1]));
	eu2bButtonsDiv.appendChild(eu2bMainButtonDiv);
	
	eu2bRoidsButtonDiv = document.createElement("div");
	eu2bRoidsButtonDiv.setAttribute("id","eu2bRoidsButton");
	eu2bRoidsButtonDiv.setAttribute("class","eu2bMBs");
	eu2bRoidsButtonDiv.setAttribute("style", "position: absolute; background:#000088; top: -1px; left: 98px;border-style:solid;border-width:1px;border-color:grey;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	eu2bRoidsButtonDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bRoidsButtonDiv.setAttribute("onMouseOut", "this.style.borderColor='grey';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bRoidsButtonDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555'; this.oldColor = this.style.backgroundColor; var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {if (tmp[i].style.backgroundColor!='rgb(0, 119, 0)') {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}} this.style.backgroundColor='rgb(0, 119, 119)';");
	eu2bRoidsButtonDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';if (this.style.backgroundColor=='rgb(0, 119, 119)') {var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}this.style.backgroundColor='rgb(0, 119, 0)';this.oldColor = 'rgb(0, 119, 0)';}else{this.style.backgroundColor=this.oldColor;}");
	eu2bRoidsButtonDiv.addEventListener("click", showRoids, false);
	eu2bRoidsButtonDiv.appendChild(document.createTextNode(myLangArray[1][2]));
	eu2bButtonsDiv.appendChild(eu2bRoidsButtonDiv);

	eu2bWreckagesButtonDiv = document.createElement("div");
	eu2bWreckagesButtonDiv.setAttribute("id","eu2bWreckagesButton");
	eu2bWreckagesButtonDiv.setAttribute("class","eu2bMBs");
	eu2bWreckagesButtonDiv.setAttribute("style", "position: absolute; background:#000088; top: -1px; left: 138px; border-style:solid;border-width:1px;border-color:grey;z-index:auto;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	eu2bWreckagesButtonDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bWreckagesButtonDiv.setAttribute("onMouseOut", "this.style.borderColor='grey';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bWreckagesButtonDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555'; this.oldColor = this.style.backgroundColor; var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {if (tmp[i].style.backgroundColor!='rgb(0, 119, 0)') {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}} this.style.backgroundColor='rgb(0, 119, 119)';");
	eu2bWreckagesButtonDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';if (this.style.backgroundColor=='rgb(0, 119, 119)') {var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}this.style.backgroundColor='rgb(0, 119, 0)';this.oldColor = 'rgb(0, 119, 0)';}else{this.style.backgroundColor=this.oldColor;}");
	eu2bWreckagesButtonDiv.addEventListener("click", showWreckages, false);
	eu2bWreckagesButtonDiv.appendChild(document.createTextNode(myLangArray[1][3]));
	eu2bButtonsDiv.appendChild(eu2bWreckagesButtonDiv);
	
	eu2bWormholesButtonDiv = document.createElement("div");
	eu2bWormholesButtonDiv.setAttribute("id","eu2bWormholesButton");
	eu2bWormholesButtonDiv.setAttribute("class","eu2bMBs");
	eu2bWormholesButtonDiv.setAttribute("style", "position: absolute; background:#000088; top: -1px; left: 208px; border-style:solid;border-width:1px;border-color:grey;z-index:auto;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	eu2bWormholesButtonDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bWormholesButtonDiv.setAttribute("onMouseOut", "this.style.borderColor='grey';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bWormholesButtonDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555'; this.oldColor = this.style.backgroundColor; var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {if (tmp[i].style.backgroundColor!='rgb(0, 119, 0)') {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}} this.style.backgroundColor='rgb(0, 119, 119)';");
	eu2bWormholesButtonDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';if (this.style.backgroundColor=='rgb(0, 119, 119)') {var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}this.style.backgroundColor='rgb(0, 119, 0)';this.oldColor = 'rgb(0, 119, 0)';}else{this.style.backgroundColor=this.oldColor;}");
	eu2bWormholesButtonDiv.addEventListener("click", showWormholes, false);
	eu2bWormholesButtonDiv.appendChild(document.createTextNode(myLangArray[1][4]));
	eu2bButtonsDiv.appendChild(eu2bWormholesButtonDiv);
	
	eu2bSearchButtonDiv = document.createElement("div");
	eu2bSearchButtonDiv.setAttribute("id","eu2bSearchButton");
	eu2bSearchButtonDiv.setAttribute("class","eu2bMBs");
	eu2bSearchButtonDiv.setAttribute("style", "position: absolute; background:#000088; top: 17px; left: 40px; border-style:solid;border-width:1px;border-color:grey;z-index:auto;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	eu2bSearchButtonDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bSearchButtonDiv.setAttribute("onMouseOut", "this.style.borderColor='grey';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bSearchButtonDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555'; this.oldColor = this.style.backgroundColor; var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {if (tmp[i].style.backgroundColor!='rgb(0, 119, 0)') {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}} this.style.backgroundColor='rgb(0, 119, 119)';");
	eu2bSearchButtonDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';if (this.style.backgroundColor=='rgb(0, 119, 119)') {var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}this.style.backgroundColor='rgb(0, 119, 0)';this.oldColor = 'rgb(0, 119, 0)';}else{this.style.backgroundColor=this.oldColor;}");
	eu2bSearchButtonDiv.addEventListener("click", showSearch, false);
	eu2bSearchButtonDiv.appendChild(document.createTextNode(myLangArray[1][5]));
	eu2bButtonsDiv.appendChild(eu2bSearchButtonDiv);
	
	eu2bTriangulationButtonDiv = document.createElement("div");
	eu2bTriangulationButtonDiv.setAttribute("id","eu2bTriangulationButton");
	eu2bTriangulationButtonDiv.setAttribute("class","eu2bMBs");
	eu2bTriangulationButtonDiv.setAttribute("style", "position: absolute; background:#000088; top: 17px; left: 91px; border-style:solid;border-width:1px;border-color:grey;z-index:auto;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	eu2bTriangulationButtonDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';this.oldColor = this.style.backgroundColor;");
	eu2bTriangulationButtonDiv.setAttribute("onMouseOut", "this.style.borderColor='grey'; if (typeof(this.oldColor) != 'undefined') this.style.backgroundColor=this.oldColor;else this.style.backgroundColor='#000000';");
	eu2bTriangulationButtonDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
	eu2bTriangulationButtonDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';if ( this.parentNode ) {var tKids = this.parentNode.getElementsByClassName('eu2bMBs');for(var k = 0 ; k < tKids.length ; ++k) {tKids[k].style.backgroundColor='#000088';}}this.style.backgroundColor='#007700';this.oldColor = '#007700';");
	eu2bTriangulationButtonDiv.addEventListener("click", showTriangulationTool, false);
	eu2bTriangulationButtonDiv.appendChild(document.createTextNode(myLangArray[1][9]));
	eu2bButtonsDiv.appendChild(eu2bTriangulationButtonDiv);
	
	eu2bWormRouteButtonDiv = document.createElement("div");
	eu2bWormRouteButtonDiv.setAttribute("id","eu2bWormRouteButton");
	eu2bWormRouteButtonDiv.setAttribute("style", "position: absolute; background:#000088; top: 17px; left: 146px; border-style:solid;border-width:1px;border-color:grey;z-index:auto;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	eu2bWormRouteButtonDiv.setAttribute("class","eu2bMBs");
	eu2bWormRouteButtonDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bWormRouteButtonDiv.setAttribute("onMouseOut", "this.style.borderColor='grey';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bWormRouteButtonDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555'; this.oldColor = this.style.backgroundColor; var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {if (tmp[i].style.backgroundColor!='rgb(0, 119, 0)') {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}} this.style.backgroundColor='rgb(0, 119, 119)';");
	eu2bWormRouteButtonDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';if (this.style.backgroundColor=='rgb(0, 119, 119)') {var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}this.style.backgroundColor='rgb(0, 119, 0)';this.oldColor = 'rgb(0, 119, 0)';}else{this.style.backgroundColor=this.oldColor;}");
	eu2bWormRouteButtonDiv.addEventListener("click", showRoute, false);
	eu2bWormRouteButtonDiv.appendChild(document.createTextNode(myLangArray[1][8]));
	eu2bButtonsDiv.appendChild(eu2bWormRouteButtonDiv);

	eu2bOptionsButtonDiv = document.createElement("div");
	eu2bOptionsButtonDiv.setAttribute("id","eu2bOptionsButton");
	eu2bOptionsButtonDiv.setAttribute("class","eu2bMBs");
	eu2bOptionsButtonDiv.setAttribute("style", "position: absolute; background:#000088; top: 17px; left: 216px; border-style:solid;border-width:1px;border-color:grey;z-index:auto;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	eu2bOptionsButtonDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bOptionsButtonDiv.setAttribute("onMouseOut", "this.style.borderColor='grey';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
	eu2bOptionsButtonDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555'; this.oldColor = this.style.backgroundColor; var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {if (tmp[i].style.backgroundColor!='rgb(0, 119, 0)') {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}} this.style.backgroundColor='rgb(0, 119, 119)';");
	eu2bOptionsButtonDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';if (this.style.backgroundColor=='rgb(0, 119, 119)') {var tmp = this.parentNode.getElementsByClassName('eu2bMBs'); for ( var i = 0 ; i < tmp.length ; ++i ) {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}this.style.backgroundColor='rgb(0, 119, 0)';this.oldColor = 'rgb(0, 119, 0)';}else{this.style.backgroundColor=this.oldColor;}");
	eu2bOptionsButtonDiv.addEventListener("click", showOptions, false);
	eu2bOptionsButtonDiv.appendChild(document.createTextNode(myLangArray[1][7]));
	eu2bButtonsDiv.appendChild(eu2bOptionsButtonDiv);

	tDiv.appendChild(eu2bButtonsDiv);

// Buttons not on eu2b Main Menu (near log button)

	tDiv = myP.document.getElementById("button_log").parentNode.parentNode.parentNode;
	myP.document.getElementById("button_log").parentNode.parentNode.style.top = "18px";
	eu2bBattleButtonDiv = document.createElement("div");
	eu2bBattleButtonDiv.setAttribute("id","eu2bBattleButton");
	eu2bBattleButtonDiv.setAttribute("style", "position: absolute; top: 82px; left: 520px; background:#000088; border-style:solid;border-width:1px;border-color:grey;z-index:99999;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	eu2bBattleButtonDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';");
	eu2bBattleButtonDiv.setAttribute("onMouseOut", "this.style.borderColor='grey';this.style.backgroundColor='#000088';");
	eu2bBattleButtonDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555'; this.style.backgroundColor = 'rgb(0, 119, 119)';");
	eu2bBattleButtonDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';this.style.backgroundColor='#007700';");
	eu2bBattleButtonDiv.addEventListener("click", showBA, false);
	eu2bBattleButtonDiv.appendChild(document.createTextNode(myLangArray[1][6]));
	tDiv.appendChild(eu2bBattleButtonDiv);

	tDiv2 = document.createElement("div");
	tDiv2.setAttribute("id","eu2bNotePadButton");
	tDiv2.setAttribute("style", "position: absolute; top: 57px; left: 517px; background:#000088; border-style:solid;border-width:1px;border-color:grey;z-index:99999;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:2px;padding-right:3px;cursor:pointer");
	tDiv2.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';");
	tDiv2.setAttribute("onMouseOut", "this.style.borderColor='grey';this.style.backgroundColor='#000088';");
	tDiv2.setAttribute("onMouseDown", "this.style.borderColor='#555555'; this.style.backgroundColor = 'rgb(0, 119, 119)';");
	tDiv2.setAttribute("onMouseUp", "this.style.borderColor='grey';this.style.backgroundColor='#007700';");
	tDiv2.addEventListener("click", showNotePad, false);
	tDiv2.appendChild(document.createTextNode("NotePad"));
	tDiv.appendChild(tDiv2);
	
	registerEvents();
	/* END of drawEU2()	**/
}

function doQuickCollect(evt) {
	var sUrl = evt.target.getAttribute("sUrl");
	var httpRequest = new XMLHttpRequest();
	httpRequest.open("GET",sUrl, true);
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState == 4 && httpRequest.status == 200) { // ok
			var holder = document.createElement('div');
			holder.innerHTML = httpRequest.responseText;
			var tDs = holder.getElementsByTagName("div");
			var i,lsc;
			for ( i = 0 ; i < tDs.length ; ++i ) {
				if ( tDs[i].id == "layer_site_content" ) {
					lsc = tDs[i];
					break;
				}
			}
			var tImg = lsc.getElementsByTagName("div");
			if ( tImg.length < 2 ) {
				bLog("Quick Collect> Error> " + holder.getElementsByClassName("font_pink_bold")[1].innerHTML);
				var tWhites = holder.getElementsByClassName("font_white");
				bLog("Quick Collect> Error Reason> " + tWhites[0].innerHTML );
				var tReason = myLangArray[5][13];
				if (tWhites.length > 0 ) {
					if ( tWhites[0].innerHTML.indexOf(myLangArray[0][4]) != -1 ) tReason = myLangArray[5][14];
					else if ( tWhites[0].innerHTML.indexOf(myLangArray[0][5]) != -1 ) tReason = myLangArray[5][15];
					else if ( tWhites[0].innerHTML.indexOf(myLangArray[0][6]) != -1 ) tReason = myLangArray[5][16];
					GM_log("The Error Message :" + tWhites[0].innerHTML );
				}
				evt.target.style.backgroundColor = "black";
				evt.target.setAttribute("oldColor","black");
				evt.target.innerHTML = tReason;
				return;
			}
			var fw = tImg[1].getElementsByClassName("font_white");
			tImg = tImg[0].getElementsByTagName("img");
			tImg = tImg[0].src;
			var orbType = tImg.split("/");
			orbType = orbType[orbType.length-1].split(".")[0];
			if ( orbType.indexOf("asteroid") != -1 ) orbType = "Asteroids";
			else if ( orbType.indexOf("wreckage") != -1 ) orbType = "Wreckages";
			else orbType = "";
			if ( orbType != "" ) {
				var i;
				var res = 0;
				var resType;
				var resAmount;
				var toolString = "";
				for ( i = 0 ;  (i+1 < fw.length) && (fw[i].innerHTML.indexOf(";") != -1)  ; i += 2 ){
					resType = fw[i].getElementsByTagName("img")[0].src.split("/");
					resType = resType[resType.length-1].split(".")[0];
					switch ( resType ) {
						case "titanium":	resType = "Ti";
											break;
						case "copper":		resType = "Cu";
											break;
						case "iron":		resType = "Fe";
											break;
						case "aluminium":	resType = "Al";
											break;
						case "mercury":		resType = "Hg";
											break;
						case "silicon":		resType = "Si";
											break;
						case "uranium":		resType = "U";
											break;
						case "krypton":		resType = "Kr";
											break;
						case "nitrogen":	resType = "N";
											break;
						case "hydrogen":	resType = "H";
											break;
						default:			resType = "--";
											bLog("fleet_collect>unknown resType>" + resType + "<");
					}
					resAmount = parseInt(fw[i+1].innerHTML);
					res += resAmount;

					if ( i > 3 && i % 4 == 0) toolString += "<br>";
					else if ( i > 0 ) toolString += ", ";
					toolString += resType + ":" + addCommas(resAmount);
				}
				var orbCoords = evt.target.getAttribute("sCoords");
				if ( orbCoords != "") {
					var orbC = orbCoords.split(":");
					var SS = "s" + orbC[0];
					var XX = "x" + orbC[1];
					var YY = "y" + orbC[2];
					var ZZ = "z" + orbC[3];
					var tOrbs = myP.myOrbs;
					if ( typeof(tOrbs) == "undefined" || tOrbs == null ){ bLog("Crash time!"); return; }
					if ( typeof(tOrbs[orbType][SS]) == "undefined"				|| tOrbs[orbType][SS] == null )				tOrbs[orbType][SS] = new Object();
					if ( typeof(tOrbs[orbType][SS][XX]) == "undefined"			|| tOrbs[orbType][SS][XX] == null )			tOrbs[orbType][SS][XX] = new Object();
					if ( typeof(tOrbs[orbType][SS][XX][YY]) == "undefined"		|| tOrbs[orbType][SS][XX][YY] == null )		tOrbs[orbType][SS][XX][YY] = new Object();
					if ( typeof(tOrbs[orbType][SS][XX][YY][ZZ]) == "undefined"	|| tOrbs[orbType][SS][XX][YY][ZZ] == null )	tOrbs[orbType][SS][XX][YY][ZZ] = new Object();
					tOrbs[orbType][SS][XX][YY][ZZ].coords = orbCoords;
					tOrbs[orbType][SS][XX][YY][ZZ].name = toolString;
					bLog("At coordinates " + orbCoords + " found " + toolString);
					saveData(orbType,myP.myTotals, tOrbs);
					update(orbType, unsafeWindow.parent.parent.myTotals);
				}
				i += 2;
				var factor = fw[i].innerHTML.split(" ")[0].slice(1);
				if ( factor.indexOf(".") != -1 ) factor = parseFloat(factor) * 1000;
				else factor = parseInt(factor);
				var total = Math.round((res/factor)*100)/100;
				var cargo = fw[i+2].innerHTML.split("/");
				cargo = parseInt(cargo[1]) - parseInt(cargo[0]);
				var totalc = Math.round((cargo/factor)*100)/100;
				var tTime, tOption;
				if ( totalc < total ) tTime = totalc;
				else tTime = total;
				if ( tTime > 45 ) {
					tOption = 60;
				} else if ( tTime > 22.5 ) {
					tOption = 30;
				} else if ( tTime > 8 ) {	
					tOption = 15;
				} else if ( tTime > 1 ) {
					tOption = 5;
				} else {
					tOption = 1;
				}
				var tInputs = holder.getElementsByTagName("input");
				var sParams = tInputs[0].name+"="+tOption+"&";
				for ( i = 5 ; i < tInputs.length ; ++i ){
					sParams += tInputs[i].name + "=" + tInputs[i].value + "&";
				}
				sParams = sParams.slice(0,-1);
				sUrl = holder.getElementsByTagName("form")[0].action.split("/").slice(4)[0].split("?");
				sParams = sUrl[1] + "&" + sParams;
				sUrl = sUrl[0];
				post(sUrl,sParams, function(httpReq,opts) {
					if (httpReq.readyState == 4 && httpReq.status == 200) { // ok
						document.location.href = "/fleet/fleet_overview.php";
					}
				}, null);
			}
		} else if ( httpRequest.status != 200 ) {
			bLog("request for collect failed");
		}
	};
	httpRequest.send(null);
}

function doSSChange() {
	var t = myP.document.getElementById("eu2bMMSSTB");
	if ( t != null ) {
		for ( var k = 0 ; (k < t.value.length && parseInt(t.value[k]) > -1 && parseInt(t.value[k]) < 10 && parseInt(t.value) > 0 && parseInt(t.value) < 10101 ); k++ );
		if ( k = t.value.length ) {
			setVal("currentSS", t.value);
			updateMain();
		}
	}
}

function doButtonUp(e) {
	var tD = e.target;
	if ( tD != null ) {
		var ss;
		switch ( tD.id ) {
			case "eu2bUpButton":	ss = getVal("currentSS", 0);
									if ( ss > 100 ) {
										setVal("currentSS", (ss-100));
										updateMain();
									}
									break;
			case "eu2bDownButton":	ss = getVal("currentSS", 0);
									if ( ss < 9901 ) {
										setVal("currentSS", (ss+100));
										updateMain();
									}
									break;
			case "eu2bRightButton":	ss = getVal("currentSS", 0);
									if ( ss < 10000 ) {
										setVal("currentSS", (ss+1));
										updateMain();
									}
									break;
			case "eu2bLeftButton":	ss = getVal("currentSS", 0);
									if ( ss > 1 ) {
										setVal("currentSS", (ss-1));
										updateMain();
									}
									break;
			case "eu2bGoButton":	ss = getVal("currentSS", 0);
									if ( ss > 0 ) myP.document.getElementById('main').setAttribute('src','/galaxy/galaxy_overview.php?area=galaxy&starsystem_id=' + ss + '&fleet_id=&from=');
									break;
			case "eu2bSearchTB":	if (e.keyCode == 13) doSearchUp();
									break;
			case "eu2bAsteroidsSearchAsc":		sort("Asteroids",0);
												break;
			case "eu2bAsteroidsSearchDec":		sort("Asteroids",1);
												break;
			case "eu2bWreckagesSearchAsc":		sort("Wreckages",0);
												break;
			case "eu2bWreckagesSearchDec":		sort("Wreckages",1);
												break;
			case "eu2bWormholesSearchAsc":		sort("Wormholes",0);
												break;
			case "eu2bWormholesSearchDec":		sort("Wormholes",1);
												break;
			case "eu2bAllPlanetsDelete":		deleteData("Planets", 2, true);
												break;
			case "eu2bAllFleetsDelete":			deleteData("Fleets", 3, true);
												break;
			case "eu2bAllAsteroidsDelete":		deleteData("Asteroids", 4, true);
												break;
			case "eu2bAllWreckagesDelete":		deleteData("Wreckages", 5, true);
												break;
			case "eu2bAllWormholesDelete":		deleteData("Wormholes", 6,true);
												break;
			case "eu2bNewPlanetsDelete":		deleteData("Planets",2,false);
												break;
			case "eu2bNewFleetsDelete":			deleteData("Fleets",3,false);
												break;
			case "eu2bNewAsteroidsDelete":		deleteData("Asteroids",4,false);
												break;
			case "eu2bNewWreckagesDelete":		deleteData("Wreckages",5,false);
												break;
			case "eu2bNewWormholesDelete":		deleteData("Wormholes",6,false);
												break;
			case "eu2bSaveNewPlanets":
			case "eu2bSaveNewFleets":
			case "eu2bSaveNewAsteroids":
			case "eu2bSaveNewWreckages":
			case "eu2bSaveNewWormholes":		ss = tD.id.split("New")[1];
												saveData(ss,myP.myTotals,myP.myOrbs);
												myP.document.getElementById('main').setAttribute('src','/galaxy/galaxy_overview.php?area=galaxy&starsystem_id=' + getVal("currentSS", 5050) + '&fleet_id=&from=');
												break;
			case "eu2bOSStartRoute":
			case "eu2bOSEndRoute":				if (e.keyCode != 13) break;
			case "eu2bWormholesSearchRoute":	findRouteLauncher();
												break;
			case "eu2bOSStartTriangulation1":
			case "eu2bDistanceTriangulation1":
			case "eu2bOSStartTriangulation2":
			case "eu2bDistanceTriangulation2":
			case "eu2bOSStartTriangulation3":
			case "eu2bDistanceTriangulation3":	if (e.keyCode != 13) break;
			case "eu2bcalcTriangulation":		calcTriangulation();
												break;
		}
	}
} 

function post(url, data, callback, options) {
	var httpRequest = new XMLHttpRequest();
	//data = encodeURI(data);
	httpRequest.open("POST", url, true);
	httpRequest.onreadystatechange = function() {
		callback(httpRequest, options)
	};
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.setRequestHeader("Content-length", data.length);
	httpRequest.setRequestHeader("Connection", "close");
	//httpRequest.overrideMimeType('text/html');
	httpRequest.overrideMimeType("application/xhtml+xml");
	httpRequest.send(data);
	//httpRequest.close();
}

function deleteData ( index, langIndex, dSaved ) {
	if ( confirm(myLangArray[6][2] + " " + myLangArray[3][langIndex]) ) {
		if ( dSaved ) delVal(index);
		myP.myOrbs[index] = null;
		myP.myTotals[index] = 0;
		bLog("deleted>" + index + "< deleted saved>" + dSaved + "<");
//		loadData();
		myP.document.getElementById('main').setAttribute('src','/galaxy/galaxy_overview.php?area=galaxy&starsystem_id=' + getVal("currentSS", 5050) + '&fleet_id=&from=');
	}
}

function sort(index,direction) {
	var firstSS = null;
	var currSS = null;
	var newSS = null;
	var Orbs = myP.myOrbs;
	var tSS;
	for ( var iSS in Orbs[index] ) {
		if ( typeof(Orbs[index][iSS]) == "undefined" || Orbs[index][iSS] == null ) continue;
		tSS = parseInt(iSS.slice(1));
		if ( firstSS == null ) {
			firstSS = new Object();
			firstSS.data = Orbs[index][iSS];
			firstSS.ss = tSS;
			firstSS.next = null;
			firstSS.prev = null;
		} else {
			currSS = firstSS;
			if ( direction == 0 ) while ( currSS.ss < tSS && currSS.next != null) currSS = currSS.next; // Ascending
			else if ( direction == 1 ) while ( currSS.ss > tSS && currSS.next != null) currSS = currSS.next;
			newSS = new Object();
			newSS.data = Orbs[index][iSS];
			newSS.ss = tSS;
			newSS.next = null;
			newSS.prev = null;
			if ( (direction == 0 && currSS.ss < tSS) || (direction == 1 && currSS.ss > tSS) ) {
				newSS.next = currSS.next;
				if (currSS.next != null) currSS.next.prev = newSS;
				currSS.next = newSS;
				newSS.prev = currSS;
			} else {
				newSS.prev = currSS.prev;
				newSS.next = currSS;
				if ( currSS.prev != null ) currSS.prev.next = newSS;
				currSS.prev = newSS;
				if ( currSS == firstSS ) firstSS = newSS;
			}
		}
	}
	Orbs[index] = new Object();
	currSS = firstSS;
	var tText = "";
	while ( currSS != null ) {
		Orbs[index]["s"+currSS.ss] = currSS.data;
		tText += "," + currSS.ss;
		currSS = currSS.next;
	}
	bLog("sorted>" + tText + "<" );
	saveData(index, myP.myTotals, Orbs);
	update(index, myP.myTotals);
}

function unRegisterEvents() {
	bLog("Unregistering Events.");
	setVal("piCount", -1);
	myP = unsafeWindow.parent;
	for ( var i = 0 ; i < 10 && myP.location.href.indexOf("/index.php") < 0  && myP != myP.parent; ++i )  myP = myP.parent;
	if ( myP.location.href.indexOf("/index.php") > -1 ) {
		bLog( "("+myP.myTotals["Planets"] + " planets)");
		myLangArray = getLangArray(myLocation);
		if ( getVal("eu2bSaveOnExitCB",true) ) saveData(-1, myP.myTotals, myP.myOrbs);
		saveNotePad();
	}
	tDiv = document.getElementById("eu2bKeepCurrentCB");
	if ( tDiv != null ) tDiv.removeEventListener("click", flipKeepCurrent, false);

	tDiv = document.getElementById("eu2bMMSSTB");
	if ( tDiv != null ) tDiv.removeEventListener("keyup", doSSChange, false);
	
	tDiv = document.getElementById("eu2bUpButton");
	if ( tDiv != null ) tDiv.removeEventListener("click", doButtonUp, false);

	tDiv = document.getElementById("eu2bDownButton");
	if ( tDiv != null ) tDiv.removeEventListener("click", doButtonUp, false);

	tDiv = document.getElementById("eu2bLeftButton");
	if ( tDiv != null ) tDiv.removeEventListener("click", doButtonUp, false);

	tDiv = document.getElementById("eu2bRightButton");
	if ( tDiv != null ) tDiv.removeEventListener("click", doButtonUp, false);
	
	tDiv = document.getElementById("eu2bGoButton");
	if ( tDiv != null ) tDiv.removeEventListener("click", doButtonUp, false);

	tDiv = document.getElementById("eu2bSearchSearch");
	if ( tDiv != null ) tDiv.removeEventListener("click", doSearchUp, false);
	
	tDiv = document.getElementById("eu2bAsteroidsSearchAsc");
	if ( tDiv != null ) tDiv.removeEventListener("click", doButtonUp, false);
	
	tDiv = document.getElementById("eu2bAsteroidsSearchDec");
	if ( tDiv != null ) tDiv.removeEventListener("click", doButtonUp, false);

	tDiv = document.getElementById("eu2bWreckagesSearchAsc");
	if ( tDiv != null ) tDiv.removeEventListener("click", doButtonUp, false);
	
	tDiv = document.getElementById("eu2bWreckagesSearchDec");
	if ( tDiv != null ) tDiv.removeEventListener("click", doButtonUp, false);

	tDiv = document.getElementById("eu2bWormholesSearchAsc");
	if ( tDiv != null ) tDiv.removeEventListener("click", doButtonUp, false);
	
	tDiv = document.getElementById("eu2bWormholesSearchDec");
	if ( tDiv != null )	tDiv.removeEventListener("click", doButtonUp, false);
	
	tDiv = document.getElementById("eu2bSearchTB");
	if ( tDiv != null ) tDiv.removeEventListener("keyup", doButtonUp, false);
	
	tDiv = document.getElementById("eu2bWormholesSearchRoute");
	if ( tDiv != null ) tDiv.removeEventListener("click", doButtonUp, false);

	tDiv = myP.document.getElementById("eu2bOSEndRoute");
	if ( tDiv != null ) tDiv.removeEventListener("keyup", doButtonUp, false);

	tDiv = myP.document.getElementById("eu2bOSStartRoute");
	if ( tDiv != null ) tDiv.removeEventListener("keyup", doButtonUp, false);

	tDiv = document.getElementById("eu2bcalcTriangulation");
	if ( tDiv != null )	tDiv.removeEventListener("click", doButtonUp, false);	
	
	tDiv = myP.document.getElementById("eu2bOSStartTriangulation1");
	if ( tDiv != null ) tDiv.removeEventListener("keyup", doButtonUp, false);
	tDiv = myP.document.getElementById("eu2bDistanceTriangulation1");
	if ( tDiv != null ) tDiv.removeEventListener("keyup", doButtonUp, false);
	tDiv = myP.document.getElementById("eu2bOSStartTriangulation2");
	if ( tDiv != null ) tDiv.removeEventListener("keyup", doButtonUp, false);
	tDiv = myP.document.getElementById("eu2bDistanceTriangulation2");
	if ( tDiv != null ) tDiv.removeEventListener("keyup", doButtonUp, false);
	tDiv = myP.document.getElementById("eu2bOSStartTriangulation3");
	if ( tDiv != null ) tDiv.removeEventListener("keyup", doButtonUp, false);
	tDiv = myP.document.getElementById("eu2bDistanceTriangulation3");
	if ( tDiv != null ) tDiv.removeEventListener("keyup", doButtonUp, false);

	tDiv = myP.document.getElementById("eu2bSaveOnExitCB");
	if ( tDiv != null ) tDiv.removeEventListener("click", flipCB, false);
	
	var mOrbs = myP.myOrbs;
	for ( var g in mOrbs ) {
		tDiv = myP.document.getElementById("eu2bAll"+g+"Delete");
		if ( tDiv != null ) tDiv.removeEventListener("click", doButtonUp, false);
		tDiv = myP.document.getElementById("eu2bTrack"+g+"CB");
		if ( tDiv != null ) tDiv.removeEventListener("click", flipCB, false);
		tDiv = myP.document.getElementById("eu2bNew"+g+"Delete");
		if ( tDiv != null ) tDiv.removeEventListener("click", doButtonUp, false);
		tDiv = myP.document.getElementById("eu2bSaveNew"+g);
		if ( tDiv != null ) tDiv.removeEventListener("click", doButtonUp, false);
	}

	var tICB = top.document.getElementsByClassName("eu2bIgnoreNums");
	var tGCB = top.document.getElementsByClassName("eu2bGroupByShipName");
	var tTCB = top.document.getElementsByClassName("eu2bIgnore");
	var tITB = top.document.getElementsByClassName("eu2bIgnoreText");
	for ( var i = 0 ; i < tICB.length ; ++i ) {
		tICB[i].removeEventListener("click", doToggleBACB, false);
		tGCB[i].removeEventListener("click", doToggleBACB, false);
		tTCB[i].removeEventListener("click", doToggleBACB, false);
		tITB[i].removeEventListener("change", doToggleBACB, false);
	}
	
	document.removeEventListener("mousemove", moveResizeWindow, false);

}

function registerEvents () {
	bLog("Registering Events");
	tDiv = myP.document.getElementById("eu2bKeepCurrentCB");
	if ( tDiv != null ) tDiv.addEventListener("click", flipKeepCurrent, false);

	tDiv = myP.document.getElementById("eu2bMMSSTB");
	if ( tDiv != null ) tDiv.addEventListener("keyup", doSSChange, false);

	tDiv = myP.document.getElementById("eu2bUpButton");
	if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);

	tDiv = myP.document.getElementById("eu2bDownButton");
	if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);

	tDiv = myP.document.getElementById("eu2bLeftButton");
	if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);

	tDiv = myP.document.getElementById("eu2bRightButton");
	if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);
	
	tDiv = myP.document.getElementById("eu2bGoButton");
	if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);

	tDiv = myP.document.getElementById("eu2bSearchSearch");
	if ( tDiv != null ) tDiv.addEventListener("click", doSearchUp, false);

	tDiv = myP.document.getElementById("eu2bAsteroidsSearchAsc");
	if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);
	
	tDiv = myP.document.getElementById("eu2bAsteroidsSearchDec");
	if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);

	tDiv = myP.document.getElementById("eu2bWreckagesSearchAsc");
	if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);
	
	tDiv = myP.document.getElementById("eu2bWreckagesSearchDec");
	if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);
	
	tDiv = myP.document.getElementById("eu2bWormholesSearchAsc");
	if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);
	
	tDiv = myP.document.getElementById("eu2bWormholesSearchDec");
	if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);
	
	tDiv = myP.document.getElementById("eu2bSearchTB");
	if ( tDiv != null ) tDiv.addEventListener("keyup", doButtonUp, false);
	
	tDiv = myP.document.getElementById("eu2bWormholesSearchRoute");
	if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);

	tDiv = myP.document.getElementById("eu2bcalcTriangulation");
	if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);	

	tDiv = myP.document.getElementById("eu2bOSEndRoute");
	if ( tDiv != null ) tDiv.addEventListener("keyup", doButtonUp, false);

	tDiv = myP.document.getElementById("eu2bOSStartRoute");
	if ( tDiv != null ) tDiv.addEventListener("keyup", doButtonUp, false);

	tDiv = myP.document.getElementById("eu2bOSStartTriangulation1");
	if ( tDiv != null ) tDiv.addEventListener("keyup", doButtonUp, false);
	tDiv = myP.document.getElementById("eu2bDistanceTriangulation1");
	if ( tDiv != null ) tDiv.addEventListener("keyup", doButtonUp, false);
	tDiv = myP.document.getElementById("eu2bOSStartTriangulation2");
	if ( tDiv != null ) tDiv.addEventListener("keyup", doButtonUp, false);
	tDiv = myP.document.getElementById("eu2bDistanceTriangulation2");
	if ( tDiv != null ) tDiv.addEventListener("keyup", doButtonUp, false);
	tDiv = myP.document.getElementById("eu2bOSStartTriangulation3");
	if ( tDiv != null ) tDiv.addEventListener("keyup", doButtonUp, false);
	tDiv = myP.document.getElementById("eu2bDistanceTriangulation3");
	if ( tDiv != null ) tDiv.addEventListener("keyup", doButtonUp, false);

	tDiv = myP.document.getElementById("eu2bSaveOnExitCB");
	if ( tDiv != null ) tDiv.addEventListener("click", flipCB, false);

	var mOrbs = myP.myOrbs;
	for ( var g in mOrbs ) {
		tDiv = myP.document.getElementById("eu2bAll"+g+"Delete");
		if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);
		tDiv = myP.document.getElementById("eu2bTrack"+g+"CB");
		if ( tDiv != null ) tDiv.addEventListener("click", flipCB, false);
		tDiv = myP.document.getElementById("eu2bNew"+g+"Delete");
		if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);
		tDiv = myP.document.getElementById("eu2bSaveNew"+g);
		if ( tDiv != null ) tDiv.addEventListener("click", doButtonUp, false);
	}
}

function updateLoadTime(){
	if ( typeof(myP) == "undefined" || myP == null ) return;
	tDiv = myP.document.getElementById("eu2bLoadTimeLabel");
	if ( tDiv != null ) tDiv.innerHTML = "(" + myLangArray[5][6] + " " + ((new Date().getTime()) - starttime) + myLangArray[5][7] + ")";
	else bLog("couldnt find the timer thingie>script load time>" + ((new Date().getTime()) - starttime) + "ms");
}

function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function eu2bTrim (str) {
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}

function drawBattleReport ( tDestination, tShipList, groupByShipName, tIgnore, tIgnoreTextCB, tIgnoreText ) {
	var tReport = document.createElement("div");
	tReport.setAttribute("class","eu2bBattleReport");
	tReport.setAttribute("style", "overflow:auto;z-index:99999;");
	var tBattleData = new Object();
	var i,c;
	for ( var k in tShipList ) {
		if (tShipList[k]['ship_id'] < 0) {
			continue;
		} else if ( tShipList[k]["font_color"] == "font_green_bold" ) {
			if ( typeof(tBattleData["Friendly"]) == "undefined" ) {
				tBattleData["Friendly"] = new Object();
				tBattleData["Enemy"] = new Object();
			}
			FFindex1 = "Friendly";
		} else if (tShipList[k]["font_color"] == "font_red_bold") {
			if ( typeof(tBattleData["Friendly"]) == "undefined" ) {
				tBattleData["Friendly"] = new Object();
				tBattleData["Enemy"] = new Object();
			}
			FFindex1 = "Enemy";
		} else {
			if ( typeof(tBattleData["All"]) == "undefined" ) tBattleData["All"] = new Object();
			FFindex1 = "All";
		}
		var tShipName;
		if ( (groupByShipName[0] && FFindex1 == "Friendly") || (groupByShipName[1] && FFindex1 == "Enemy") ) {	// Group by name must be on for the ignore to work
			tShipName = "" + tShipList[k]['caption'];
			if ( (tIgnore[0] && FFindex1 == "Friendly") || (tIgnore[1] && FFindex1 == "Enemy") ) {				// Group with ignore periods and numbers.
				tShipName = eu2bTrim(tShipName.replace(/[\.0-9]/g,""));
			}
			if (tIgnoreText[0] != '' && tIgnoreTextCB[0] && FFindex1 == "Friendly") {							// Group with ignore text
				tShipName = eu2bTrim(tShipName.replace(new RegExp(tIgnoreText[0],"g"),""));
			} else if (tIgnoreText[1] != '' && tIgnoreTextCB[1] && FFindex1 == "Enemy") {						// Group with ignore text
				tShipName = eu2bTrim(tShipName.replace(new RegExp(tIgnoreText[1],"g"),""));
			}
			
		} else {
			tShipName = parseInt(tShipList[k]['ship_id']);														// No Grouping, long list of individual ships
		}
		if ( typeof(tBattleData[FFindex1][tShipName]) == "undefined" ) {
			tBattleData[FFindex1][tShipName] = new Object();
			tBattleData[FFindex1][tShipName]['caption'] = "" + tShipList[k]['caption'];
			tBattleData[FFindex1][tShipName]['Lives'] = 1;
			for ( i in tShipList[k] ) {
				if ( i != "ship_id" && i != "experience" && i != "font_color" && i != "caption" ) {
					tBattleData[FFindex1][tShipName][i] = parseInt(tShipList[k][i]);
				}
			}
		} else {
			for ( i in tShipList[k] ) {
				if ( i != "ship_id" && i != "experience" && i != "font_color" && i != "caption" ) {
					tBattleData[FFindex1][tShipName][i] += parseInt(tShipList[k][i]);
				}
			}
			++tBattleData[FFindex1][tShipName]['Lives'];
		}
	}
	var myReport = new Object();
	var myTotals = new Object();
	var sTotalShotsOut = new Object();
	var sTotalShotsIn = new Object();
	for ( var t in tBattleData ) {
		myReport[t] = "";
		myTotals[t] = new Object();
		myTotals[t]["Lives"] = 0;
		myTotals[t]["Deaths"] = 0;
		myTotals[t]["Retreats"] = 0;
		myTotals[t]["DieTime"] = 0;
		myTotals[t]["LifeTime"] = 0;
		myTotals[t]["AttacksOut"] = 0;
		myTotals[t]["AttacksOutS"] = 0;
		myTotals[t]["AttacksOutNS"] = 0;
		myTotals[t]["AttacksIn"] = 0;
		myTotals[t]["MissesOut"] = 0;
		myTotals[t]["MissesIn"] = 0;
		myTotals[t]["DamOutHull"] = 0;
		myTotals[t]["DamOutHullS"] = 0;
		myTotals[t]["DamOutHullNS"] = 0;
		myTotals[t]["DamInHull"] = 0;
		myTotals[t]["DamOutShield"] = 0;
		myTotals[t]["DamInShield"] = 0;
		myTotals[t]["DamOutAiming"] = 0;
		myTotals[t]["DamInAiming"] = 0;
		myTotals[t]["DamOutTotal"] = 0;
		myTotals[t]["DamInTotal"] = 0;

		var tCount = 0;
		var sTotalOutDamage = 0;
		var sTotalInDamage = 0;
		var sTotalLives = 0;
		sTotalShotsOut[t] = 0;
		sTotalShotsIn[t] = 0;
		for ( var p in tBattleData[t] ){
			++tCount;
			sTotalOutDamage = tBattleData[t][p]['DamOutHull'] + tBattleData[t][p]['DamOutShield'];
			sTotalInDamage = tBattleData[t][p]['DamInHull'] + tBattleData[t][p]['DamInShield'];
			sTotalShotsOut[t] = tBattleData[t][p]['AttacksOut'] + tBattleData[t][p]['MissesOut'];
			sTotalShotsIn[t] = tBattleData[t][p]['AttacksIn'] + tBattleData[t][p]['MissesIn'];
			if ( t == "Enemy" ) {
				if ( groupByShipName[1] ) sLives = '<br>('+tBattleData[t][p]['Lives']+')';
				else sLives = '<br>('+tBattleData[t][p]['caption']+')';
			} else {
				if ( groupByShipName[0] ) sLives = '<br>('+tBattleData[t][p]['Lives']+')';
				else sLives = '<br>('+tBattleData[t][p]['caption']+')';
			}
			myReport[t] += '<tr><td><center>'+p+''+sLives+'</center></td><td><center>'+tBattleData[t][p]['Deaths']+'/'+tBattleData[t][p]['Retreats']+'</center></td><td><center>'+tBattleData[t][p]['DieTime']+'<br>('+(Math.round((tBattleData[t][p]['DieTime']/tBattleData[t][p]['Deaths'])*10)/10)+')</center></td><td><center>'+tBattleData[t][p]['LifeTime']+'<br>('+(Math.round((tBattleData[t][p]['LifeTime']/tBattleData[t][p]['Lives'])*10)/10)+')</center></td><td><center>'+sTotalShotsOut[t]+'<br>('+(Math.round((tBattleData[t][p]['AttacksOut']/sTotalShotsOut[t])*1000)/10)+'%)</center></td><td><center>'+tBattleData[t][p]['DamOutHull']+'/'+tBattleData[t][p]['DamOutHullS']+'/'+tBattleData[t][p]['DamOutHullNS']+'<br>('+Math.round(tBattleData[t][p]['DamOutHull']/sTotalShotsOut[t])+'/'+Math.round(tBattleData[t][p]['DamOutHullS']/tBattleData[t][p]['AttacksOutS'])+'/'+Math.round(tBattleData[t][p]['DamOutHullNS']/tBattleData[t][p]['AttacksOutNS'])+')</center></td><td><center>'+tBattleData[t][p]['DamOutShield']+'<br>('+(Math.round(((tBattleData[t][p]['DamOutShield']/sTotalShotsOut[t])*10))/10)+'/'+(Math.round(((tBattleData[t][p]['DamOutShield']/tBattleData[t][p]['AttacksOutS'])*10))/10)+')</center></td><td><center>'+tBattleData[t][p]['DamOutAiming']+'<br>('+(Math.round(((tBattleData[t][p]['DamOutAiming']/sTotalShotsOut[t])*10))/10)+')</center></td><td bgcolor=#000077><center>'+sTotalOutDamage+'<br>('+(Math.round(((sTotalOutDamage/sTotalShotsOut[t])*10))/10)+')</center></td><td><center>'+sTotalShotsIn[t]+'<br>('+(Math.round((tBattleData[t][p]['AttacksIn']/sTotalShotsIn[t])*1000)/10)+'%)</center></td><td><center>'+tBattleData[t][p]['DamInHull']+'<br>('+(Math.round(((tBattleData[t][p]['DamInHull']/sTotalShotsIn[t])*10))/10)+')</center></td><td><center>'+tBattleData[t][p]['DamInShield']+'<br>('+(Math.round(((tBattleData[t][p]['DamInShield']/sTotalShotsIn[t])*10))/10)+')</center></td><td><center>'+tBattleData[t][p]['DamInAiming']+'<br>('+(Math.round(((tBattleData[t][p]['DamInAiming']/sTotalShotsIn[t])*10))/10)+')</center></td><td bgcolor=#000077><center>'+sTotalInDamage+'<br>('+(Math.round(((sTotalInDamage/sTotalShotsIn[t])*10))/10)+')</center></td><td><center>'+p+'</center></td></tr>';
			if ( tCount % 10 == 0 ) myReport[t] += '<tr><td bgcolor=#007700><b>Ship Name</b></td><td bgcolor=#007700><b>Deaths / Retreats</b></td><td bgcolor=#007700><b>Die Time</b></td><td bgcolor=#007700><b>Life Time</b></td><td bgcolor=#007700><b>Attacks Out</b></td><td bgcolor=#007700><b>Hull Out<br>Tot/S/NS</b></td><td bgcolor=#007700><b>Shield Out<br>(Tot/S)</b></td><td bgcolor=#007700><b>Aiming Out</b></td><td bgcolor=#000077><b>Dam Out</b></td><td bgcolor=#007700><b>Attacks In</b></td><td bgcolor=#007700><b>Hull In</b></td><td bgcolor=#007700><b>Shield In</b></td><td bgcolor=#007700><b>Aiming In</b></td><td bgcolor=#000077><b>Dam In</b></td><td bgcolor=#007700><b>Ship Name</b></td></tr>';
			myTotals[t]["Lives"] += tBattleData[t][p]['Lives'];
			myTotals[t]["Deaths"] += tBattleData[t][p]['Deaths'];
			myTotals[t]["Retreats"] += tBattleData[t][p]['Retreats'];
			myTotals[t]["DieTime"] += tBattleData[t][p]['DieTime'];
			myTotals[t]["LifeTime"] += tBattleData[t][p]['LifeTime'];
			myTotals[t]["AttacksOut"] += tBattleData[t][p]['AttacksOut'];
			myTotals[t]["AttacksOutS"] += tBattleData[t][p]['AttacksOutS'];
			myTotals[t]["AttacksOutNS"] += tBattleData[t][p]['AttacksOutNS'];
			myTotals[t]["AttacksIn"] += tBattleData[t][p]['AttacksIn'];
			myTotals[t]["MissesOut"] += tBattleData[t][p]['MissesOut'];
			myTotals[t]["MissesIn"] += tBattleData[t][p]['MissesIn'];
			myTotals[t]["DamOutHull"] += tBattleData[t][p]['DamOutHull'];
			myTotals[t]["DamOutHullS"] += tBattleData[t][p]['DamOutHullS'];
			myTotals[t]["DamOutHullNS"] += tBattleData[t][p]['DamOutHullNS'];
			myTotals[t]["DamInHull"] += tBattleData[t][p]['DamInHull'];
			myTotals[t]["DamOutShield"] += tBattleData[t][p]['DamOutShield'];
			myTotals[t]["DamInShield"] += tBattleData[t][p]['DamInShield'];
			myTotals[t]["DamOutAiming"] += tBattleData[t][p]['DamOutAiming'];
			myTotals[t]["DamInAiming"] += tBattleData[t][p]['DamInAiming'];
			myTotals[t]["DamOutTotal"] += sTotalOutDamage;
			myTotals[t]["DamInTotal"] += sTotalInDamage;
		}
		sTotalShotsOut[t] = myTotals[t]["AttacksOut"] + myTotals[t]["MissesOut"];
		sTotalShotsIn[t] = myTotals[t]["AttacksIn"] + myTotals[t]["MissesIn"];

	}
	var tString = "";
	var i = 0;
	var k;

	for ( k in myReport ) {
		tString += '&nbsp;&nbsp;<b>'+k+' Ships:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="eu2bGroupByShipName" id="eu2bGroupByShipName_'+k+'" type="checkbox" style="cursor:pointer;vertical-align:middle">Group by Ship Names.</input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="eu2bIgnoreNums" id="eu2bIgnoreNums_'+k+'" type="checkbox" style="cursor:pointer;vertical-align:middle">Ignore dots (.) and numbers (0-9) in ship names.</input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="eu2bIgnore" id="eu2bIgnore_'+k+'" type="checkbox" style="cursor:pointer;vertical-align:middle">Ignore </input><input class="eu2bIgnoreText" id="eu2bIgnoreText_'+k+'" type="text" style="cursor:text;vertical-align:middle;width:100px"> in Ship Names. (RegEx)</input><br><table border="1" cellpadding="1" cellspacing="0" width="auto" class="font_white"><tbody>'
					+'<tr><td bgcolor=#007700><b>Ship Name</b></td><td bgcolor=#007700><b>Deaths / Retreats</b></td><td bgcolor=#007700><b>Die Time</b></td><td bgcolor=#007700><b>Life Time</b></td><td bgcolor=#007700><b>Attacks Out</b></td><td bgcolor=#007700><b>Hull Out<br>Tot/S/NS</b></td><td bgcolor=#007700><b>Shield Out<br>(Tot/S)</b></td><td bgcolor=#007700><b>Aiming Out</b></td><td bgcolor=#000077><b>Dam Out</b></td><td bgcolor=#007700><b>Attacks In</b></td><td bgcolor=#007700><b>Hull In</b></td><td bgcolor=#007700><b>Shield In</b></td><td bgcolor=#007700><b>Aiming In</b></td><td bgcolor=#000077><b>Dam In</b></td><td bgcolor=#007700><b>Ship Name</b></td></tr>'
					+ myReport[k]
					+'<tr><td><b><center>Totals:<br>('+myTotals[k]['Lives']+')</center></b></td><td><center><b>'+myTotals[k]['Deaths']+'/'+myTotals[k]['Retreats']+'</b></center></td><td><center><b>'+myTotals[k]['DieTime']+'</b></center></td><td><center><b>'+myTotals[k]['LifeTime']+'</b></center></td><td><center><b>'+sTotalShotsOut[k]+'<br>('+(Math.round((myTotals[k]['AttacksOut']/sTotalShotsOut[k])*1000)/10)+'%)</b></center></td><td><center><b>'+myTotals[k]['DamOutHull']+'/'+myTotals[k]['DamOutHullS']+'/'+myTotals[k]['DamOutHullNS']+'<br>('+Math.round(myTotals[k]['DamOutHull']/sTotalShotsOut[k])+'/'+Math.round(myTotals[k]['DamOutHullS']/myTotals[k]["AttacksOutS"])+'/'+Math.round(myTotals[k]['DamOutHullNS']/myTotals[k]["AttacksOutNS"])+')</b></center></td><td><center><b>'+myTotals[k]['DamOutShield']+'<br>('+(Math.round(((myTotals[k]['DamOutShield']/sTotalShotsOut[k])*10))/10)+'/'+(Math.round(((myTotals[k]['DamOutShield']/myTotals[k]['AttacksOutS'])*10))/10)+')</b></center></td><td><center><b>'+myTotals[k]['DamOutAiming']+'<br>('+(Math.round(((myTotals[k]['DamOutAiming']/sTotalShotsOut[k])*10))/10)+')</b></center></td><td bgcolor=#000077><center><b>'+myTotals[k]['DamOutTotal']+'<br>('+(Math.round(((myTotals[k]['DamOutTotal']/sTotalShotsOut[k])*10))/10)+')</b></center></td><td><center><b>'+sTotalShotsIn[k]+'<br>('+(Math.round((myTotals[k]['AttacksIn']/sTotalShotsIn[k])*1000)/10)+'%)</b></center></td><td><center><b>'+myTotals[k]['DamInHull']+'<br>('+(Math.round(((myTotals[k]['DamInHull']/sTotalShotsIn[k])*10))/10)+')</b></center></td><td><center><b>'+myTotals[k]['DamInShield']+'<br>('+(Math.round(((myTotals[k]['DamInShield']/sTotalShotsIn[k])*10))/10)+')</b></center></td><td><center><b>'+myTotals[k]['DamInAiming']+'<br>('+(Math.round(((myTotals[k]['DamInAiming']/sTotalShotsIn[k])*10))/10)+')</b></center></td><td bgcolor=#000077><center><b>'+myTotals[k]['DamInTotal']+'<br>('+(Math.round(((myTotals[k]['DamInTotal']/sTotalShotsIn[k])*10))/10)+')</b></center></td><td><b><center>:Totals</center></b></td></tr></tbody></table>'
	}

	tString += "<br>";
	tReport.innerHTML = tString;
	if ( tDestination.firstChild ) tDestination.insertBefore(tReport, tDestination.firstChild);
	else tDestination.appendChild(tReport);
	var ignoreCB = tDestination.getElementsByClassName("eu2bIgnoreNums");
	var groupByShipNameCB = tDestination.getElementsByClassName("eu2bGroupByShipName");
	var ignoreTextCB = tDestination.getElementsByClassName("eu2bIgnore");
	var tITB = tDestination.getElementsByClassName("eu2bIgnoreText");
	for ( i = 0; i < ignoreCB.length ; ++i ) {
		groupByShipNameCB[i].addEventListener("click", doToggleBACB, false);
		groupByShipNameCB[i].checked = groupByShipName[i];
		ignoreCB[i].checked = tIgnore[i];
		ignoreTextCB[i].checked = tIgnoreTextCB[i];
		if ( groupByShipName[i] ) {
			ignoreCB[i].addEventListener("click", doToggleBACB, false);
			ignoreTextCB[i].addEventListener("click", doToggleBACB, false);
			ignoreCB[i].disabled=false;
			ignoreTextCB[i].disabled=false;
		} else {
			ignoreCB[i].style.cursor="";
			ignoreCB[i].disabled=true;
			ignoreTextCB[i].style.cursor = "";
			ignoreTextCB[i].disabled=true;
		}
		if ( tIgnoreTextCB[i] ) tITB[i].addEventListener("change", doToggleBACB, false);
		tITB[i].value = tIgnoreText[i];
	}
}

function doToggleBACB (evt) {
	var tBR = evt.target.parentNode.parentNode;
	bLog("doToggleBACB name = " + tBR.id +", " +tBR.firstChild.className);
	if ( tBR.firstChild.className == "eu2bBattleReport" ) {
		var tICB = tBR.firstChild.getElementsByClassName("eu2bIgnoreNums");
		var tGCB = tBR.firstChild.getElementsByClassName("eu2bGroupByShipName");
		var tTCB = tBR.firstChild.getElementsByClassName("eu2bIgnore");
		var tITB = tBR.firstChild.getElementsByClassName("eu2bIgnoreText");
		var tIgnrs = [tICB[0].checked,false];
		var tGroupShip = [tGCB[0].checked,true];
		var tIText = [tTCB[0].checked,true];
		var tText = ['',''];
		if ( tICB.length > 1  ) {
			tIgnrs[0] = tICB[0].checked;
			tIgnrs[1] = tICB[1].checked;
			tGroupShip[0] = tGCB[0].checked;
			tGroupShip[1] = tGCB[1].checked;
			tIText[0] = tTCB[0].checked;
			tIText[1] = tTCB[1].checked;
			tText[0] = tITB[0].value;
			tText[1] = tITB[1].value;
			tICB[1].removeEventListener("click", doToggleBACB, false);
			tGCB[1].removeEventListener("click", doToggleBACB, false);
			tTCB[1].removeEventListener("click", doToggleBACB, false);
			tITB[1].removeEventListener("change", doToggleBACB, false);
		}
		tICB[0].removeEventListener("click", doToggleBACB, false);
		tGCB[0].removeEventListener("click", doToggleBACB, false);
		tTCB[0].removeEventListener("click", doToggleBACB, false);
		tITB[0].removeEventListener("change", doToggleBACB, false);
		tBR.removeChild(tBR.firstChild);
		var activeTabID = parseInt(tBR.id.split("_")[1]);
		drawBattleReport (tBR, myP.eu2bShipList["BL_"+activeTabID], tGroupShip,tIgnrs,tIText,tText);
	}
}

function activateBATab(evt) {
	var i;
	var activeTabDiv = evt.target;
	var activeTabID = parseInt(activeTabDiv.id.split("_")[1]);
	myP.eu2bActiveBAID = activeTabID;
	var tTabBar = activeTabDiv.parentNode;
	var tBattleWindow = tTabBar.parentNode;
	tDiv = tBattleWindow.getElementsByClassName("eu2bBA");
	for ( i = 0 ; i < tDiv.length ; ++i ) tDiv[i].style.visibility = "hidden"; //tDiv[i].style.display = "none";
	tDiv = myP.document.getElementById("eu2bBA_"+activeTabID);
	if ( tDiv != null ) {
		bLog("found BA! displaying it! from tab event");
		tDiv.style.visibility = "visible";
//		tDiv.style.display = "";
	} else bLog ("Cant Find the Battle Analysis to switch to!");
	return false;
}

function activateNPTab(evt) {
	bLog("activating NP Tag");
	var activeTabDiv = evt.target;
	var activeTabID = parseInt(activeTabDiv.id.split("_")[1]);
	drawNotePad(activeTabID,1);
	return false;
}

function saveNotePad() {
	tDiv = myP.document.getElementsByClassName("eu2bNP");
	tDiv2 = myP.document.getElementById("eu2bNPWindow");
	if (tDiv.length < 1 || tDiv2 == null || typeof(myP.eu2bActiveNPID) == "undefined" || myP.eu2bActiveNPID == null || myP.eu2bActiveNPID == "" ) return false;
	var tString = myP.eu2bActiveNPID + "¬" + tDiv2.style.top + "¬" + tDiv2.style.left;
	for ( var i = 0 ; i < tDiv.length ; ++i ) {
		tString += "¬" + tDiv[i].id.split("_")[1] + "¬" + tDiv[i].style.fontFamily + "¬" + tDiv[i].style.fontSize + "¬" + tDiv[i].style.width + "¬" + tDiv[i].style.height + "¬" + tDiv[i].value;
	}
	setVal("NotePadData",tString);
	bLog("Saved Note Data>" + getVal("NotePadData",0) );
}

function drawBattleAnalyzer(activeTabID) {
	if ( typeof(activeTabID) == "undefined" || activeTabID == null || activeTabID < 1 ) return false;
	var i;
	var tBattleWindow = myP.document.getElementById("eu2bBAWindow");
	if ( tBattleWindow != null ) {
		bLog("found battle window!  making visible");
		tBattleWindow.style.display = "";
		//tBattleWindow.style.visibility = "visible";
		var tTabBar = myP.document.getElementById("eu2bBATabBar");
	} else {
		bLog("drawing battle window and tab bar");
		tBattleWindow = document.createElement("div");
		tBattleWindow.setAttribute("id","eu2bBAWindow");
		tBattleWindow.setAttribute("style", "position:absolute;top:0;left:0;height:100%;width:100%;overflow:auto;border-style:solid;border-width:1px;background:#222222; z-index:9900;color:white;font-size:10px;padding:0px;");
		tBattleWindow.innerHTML = '<center><font class="font_pink_bold">eu2b Battle Analyzer from Hell</font>&nbsp;&nbsp;&nbsp;&nbsp;(<a class="font_white" style="cursor:pointer" target="_blank" href="http://userscripts.org/topics/54124">Help</a>)</center>';
		tDiv = document.createElement("div");
		tDiv.setAttribute("id","eu2bBAClose");
		tDiv.setAttribute("style", "position:absolute;top:3;right:5;height:16;width:11;border-style:solid;border-width:1px;font-weight:bold;background:red; z-index:9999;color:white;font-size:10px;text-align:center;vertical-align:middle;padding:0px;cursor:pointer");
		tDiv.setAttribute("onMouseOver", "this.style.borderWidth='2px';");
		tDiv.setAttribute("onMouseOut", "this.style.borderWidth='1px'; this.style.backgroundColor='red';");
		tDiv.setAttribute("onMouseDown", "this.style.borderWidth='2px'; this.style.backgroundColor='#007777';");
//		tDiv.setAttribute("onMouseUp", "this.style.borderWidth='1px'; this.style.backgroundColor='#007700';");
//		tDiv.setAttribute("onClick", "this.parentNode.style.visibility = 'hidden';");
		tDiv.setAttribute("onClick", "this.parentNode.style.display = 'none';");
		tDiv.innerHTML = "X";
		tBattleWindow.appendChild(tDiv);
		var tTabBar = document.createElement("div");
		tTabBar.setAttribute("id","eu2bBATabBar");
		tTabBar.setAttribute("style", "position:relative;left:1%;float:left;height:auto;width:96%;border-style:solid;border-width:1px 1px 0px 1px;background:black; z-index:9901;padding:0px");
		tBattleWindow.appendChild(tTabBar);
		myP.document.body.appendChild(tBattleWindow);
	}
	tDiv = tBattleWindow.getElementsByClassName("eu2bBATab");
	for ( i = 0 ; i < tDiv.length ; ++i ) tDiv[i].style.backgroundColor = "#000077";
	tDiv = myP.document.getElementById("eu2bBATab_"+activeTabID);
	if ( tDiv != null ) {
		tDiv.style.backgroundColor='green';
	} else {
		tDiv = document.createElement("div");
		tDiv.setAttribute("id","eu2bBATab_"+activeTabID);
		tDiv.setAttribute("class", "eu2bBATab");
		tDiv.setAttribute("style", "float:left;width:60;border-style:solid;border-width:0px 1px 1px 0px;background:rgb(0, 119, 0); z-index:9902;color:white;font-weight:normal;font-size:10px;text-align:center;vertical-align:middle;padding:0px;cursor:pointer;display:;visibility:visible;");
		tDiv.setAttribute("onMouseOver", "this.style.textDecoration='underline';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
		tDiv.setAttribute("onMouseOut", "this.style.textDecoration='none';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
		tDiv.setAttribute("onMouseDown", "this.style.textDecoration='underline'; this.oldColor = this.style.backgroundColor; var tmp = this.parentNode.getElementsByClassName('eu2bBATab'); for ( var i = 0 ; i < tmp.length ; ++i ) {if (tmp[i].style.backgroundColor!='rgb(0, 119, 0)') {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}} this.style.backgroundColor='rgb(0, 119, 119)';");
		tDiv.setAttribute("onMouseUp", "if (this.style.backgroundColor=='rgb(0, 119, 119)') {var tmp = this.parentNode.getElementsByClassName('eu2bBATab'); for ( var i = 0 ; i < tmp.length ; ++i ) {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}this.style.backgroundColor='rgb(0, 119, 0)';this.oldColor = 'rgb(0, 119, 0)';}else{this.style.backgroundColor=this.oldColor;}");
		tDiv.innerHTML = ""+activeTabID;
		tDiv.addEventListener("click",activateBATab, false);
		tTabBar.appendChild(tDiv);
	}
	tDiv = tBattleWindow.getElementsByClassName("eu2bBA");
	for ( i = 0 ; i < tDiv.length ; ++i ) tDiv[i].style.visibility = "hidden";//tDiv[i].style.display = "none";
	tDiv = myP.document.getElementById("eu2bBA_"+activeTabID);
	if ( tDiv != null ) { 
		bLog("found BA! displaying it! from draw BA");
		tDiv.style.visibility = "visible";
//		tDiv.style.display = "";
	} else {
		getBattleData(activeTabID);
		tDiv = document.createElement("div");
		tDiv.setAttribute("id","eu2bBA_"+activeTabID);
		tDiv.setAttribute("class", "eu2bBA");
		tDiv.setAttribute("style", "position:absolute;top:33px;left:0px;border-style:solid;border-width:1px;background:black; z-index:9903;padding:0px;display:;visibility:visible;");
		drawBattleReport(tDiv, myP.eu2bShipList["BL_"+activeTabID],[true,true],[false,false],[false,false],['','']);
		bLog("appending new battle anal");
		tBattleWindow.appendChild(tDiv);
	}
	return true;
}

function moveResizeWindow(evt){
	var dO = myP.resizeObj;
	if ( dO && dO.id.indexOf("eu2bNP_") > -1 ) {
		var dir = dO.direction;
		if (dir == 1 || dir == 2 || dir == 3 || dir == 6 || dir == 7 || dir == 8  ) {
			dO.style.height = (parseInt(dO.style.height)+((evt.clientY-dO.lastY)*(dir<4?-1:1)))+"px";
			dO.lastY = evt.clientY;
		}
		if (dir == 1 || dir == 4 || dir == 6) {
			dO.style.width = (parseInt(dO.style.width)-(evt.clientX-dO.lastX))+"px";
			dO.lastX = evt.clientX;
		} else if (	dir == 3 || dir == 5 || dir == 8 ) {
			dO.style.width = (parseInt(dO.style.width)+(evt.clientX-dO.lastX))+"px";
			dO.lastX = evt.clientX;
		}
	}
	dO = myP.dragObj;
	if ( dO ) {
		var dir = dO.direction;
		if ( dir == 0 || dir == 1 || dir == 2 || dir == 3 ) {
			dO.style.top =  (parseInt(dO.style.top) +(evt.clientY-dO.lastY))+"px";
			dO.lastY = evt.clientY;
		}
		if ( dir == 0 || dir == 1 || dir == 4 || dir == 6 ) {
			dO.style.left = (parseInt(dO.style.left)+(evt.clientX-dO.lastX))+"px";
			dO.lastX = evt.clientX;
		}
	}
	return false;
}

function cancelMoveResizeWindow(evt) {
	myP.dragObj = null;
	myP.resizeObj = null;
}

function changeNoteFont(evt) {
	tDiv = myP.document.getElementById("eu2bNP_"+myP.eu2bActiveNPID);
	if ( tDiv.style.fontFamily == "monospace" ) tDiv.style.fontFamily = "sans-serif";
	else if ( tDiv.style.fontFamily == "sans-serif" ) tDiv.style.fontFamily = "serif";
	else if ( tDiv.style.fontFamily == "serif" ) tDiv.style.fontFamily = "monospace";
}

function changeNoteFontSize(evt) {
	tDiv = myP.document.getElementById("eu2bNP_"+myP.eu2bActiveNPID);
	tDiv2 = parseInt(tDiv.style.fontSize) + 1;
	if ( tDiv2 > 20 ) tDiv2 = 10;
	tDiv.style.fontSize = tDiv2;
}

function addNote() {
	bLog("Add note");
	var i = -1;
	var nNPID = 0;
	var tNP = myP.document.body.getElementsByClassName("eu2bNP");
	while ( i < 0 ) { 
		++nNPID;
		for ( i = 0 ; i < tNP.length ; ++i ) {
			if ( tNP[i].id == "eu2bNP_"+nNPID ) {
				i = -1;
				break;
			}
		}
	}
	drawNotePad(nNPID,1);
}

function deleteNote(evt) {
	bLog("Delete note");
	tDiv = myP.document.getElementById("eu2bNP_"+myP.eu2bActiveNPID);
	if ( tDiv != null ) tDiv.parentNode.removeChild(tDiv);
	tDiv = myP.document.getElementById("eu2bNPTab_"+myP.eu2bActiveNPID);
	if ( tDiv != null ) tDiv.parentNode.removeChild(tDiv);
	
	tDiv = myP.document.body.getElementsByClassName("eu2bNP");
	if (tDiv.length > 0 ) drawNotePad(parseInt(tDiv[0].id.split("_")[1]),1);
	
}

function closeNP(evt){
	evt.target.parentNode.style.display = "none";
	saveNotePad();
}

function drawNotePad(activeTabID,iClose) {
	if ( typeof(activeTabID) == "undefined" || activeTabID == null || activeTabID == "" || isNaN(activeTabID) || activeTabID < 1 ) {
		addNote();
		return true;
	} else myP.eu2bActiveNPID = activeTabID;
	var i;
	var tNPdBData = [activeTabID,"581px","375px",activeTabID,"monospace","12px","378px","83px",""];
	var tNotePadWindow = myP.document.getElementById("eu2bNPWindow");
	if ( tNotePadWindow != null ) {
		bLog("found notepad window!  making visible, or not...");
		if ( iClose == 0 && tNotePadWindow.style.display == "" ) {
			tNotePadWindow.style.display = "none";
			saveNotePad();
			return false;
		} else tNotePadWindow.style.display = "";
		var tTabBar = myP.document.getElementById("eu2bNPTabBar");
		var tNote = myP.document.getElementById("eu2bNoteTD");
	} else {
		i = getVal("NotePadData", 0);
		if ( i != 0 && i.length > 0 ) {
			i = i.split("¬");
			if ( i.length > 8 ) tNPdBData = i;
		}
		activeTabID = tNPdBData[0];
		myP.eu2bActiveNPID = activeTabID;
		
		bLog("drawing notepad window and tab bar");
		tNotePadWindow = document.createElement("div");
		tNotePadWindow.setAttribute("id","eu2bNPWindow");
		tNotePadWindow.setAttribute("style", "position:absolute;top:"+tNPdBData[1]+";left:"+tNPdBData[2]+";height:auto;width:auto;background:#222222; z-index:9910;padding:0px;margin:0px;");
		tNotePadWindow.innerHTML =	'<table cellspacing="0" cellpadding="0"><tbody><tr><td style="background-color:white;width:1px;height:1px;cursor:nwse-resize;" onmouseover="this.style.width=\'5px\';this.style.height=\'5px\';this.parentNode.parentNode.parentNode.parentNode.style.left = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.left)-2)+\'px\';this.parentNode.parentNode.parentNode.parentNode.style.top = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.top)-2)+\'px\';" onmouseout="this.parentNode.parentNode.parentNode.parentNode.style.left = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.left)+2)+\'px\';this.parentNode.parentNode.parentNode.parentNode.style.top = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.top)+2)+\'px\';this.style.width=\'1px\';this.style.height=\'1px\';" onmouseup="parent.resizeObj=null;parent.dragObj=null;" onmousedown="parent.resizeObj = parent.document.getElementById(\'eu2bNP_\'+parent.eu2bActiveNPID); parent.dragObj = this.parentNode.parentNode.parentNode.parentNode; parent.resizeObj.lastX = event.clientX;parent.resizeObj.lastY = event.clientY;parent.resizeObj.direction=1;parent.dragObj.lastX = event.clientX;parent.dragObj.lastY = event.clientY;parent.dragObj.direction=1;return false;"></td><td style="background-color:gray;width:auto;height:1px;cursor:ns-resize;" onmouseover="this.style.height=\'5px\';this.parentNode.parentNode.parentNode.parentNode.style.top = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.top)-2)+\'px\';" onmouseout="this.parentNode.parentNode.parentNode.parentNode.style.top = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.top)+2)+\'px\';this.style.height=\'1px\';" onmouseup="parent.resizeObj=null;parent.dragObj=null;" onmousedown="parent.resizeObj = parent.document.getElementById(\'eu2bNP_\'+parent.eu2bActiveNPID); parent.dragObj = this.parentNode.parentNode.parentNode.parentNode; parent.resizeObj.lastX = event.clientX;parent.resizeObj.lastY = event.clientY;parent.resizeObj.direction=2;parent.dragObj.lastX = event.clientX;parent.dragObj.lastY = event.clientY;parent.dragObj.direction=2;return false;"></td><td style="background:white;width:1px;height:1px;cursor:nesw-resize;" onmouseover="this.style.width=\'5px\';this.style.height=\'5px\';this.parentNode.parentNode.parentNode.parentNode.style.left = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.left)-2)+\'px\';this.parentNode.parentNode.parentNode.parentNode.style.top = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.top)-2)+\'px\';" onmouseout="this.parentNode.parentNode.parentNode.parentNode.style.left = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.left)+2)+\'px\';this.parentNode.parentNode.parentNode.parentNode.style.top = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.top)+2)+\'px\';this.style.width=\'1px\';this.style.height=\'1px\';" onmouseup="parent.resizeObj=null;parent.dragObj=null;" onmousedown="parent.resizeObj = parent.document.getElementById(\'eu2bNP_\'+parent.eu2bActiveNPID); parent.dragObj = this.parentNode.parentNode.parentNode.parentNode; parent.resizeObj.lastX = event.clientX;parent.resizeObj.lastY = event.clientY;parent.resizeObj.direction=3;parent.dragObj.lastX = event.clientX;parent.dragObj.lastY = event.clientY;parent.dragObj.direction=3;return false;"></td></tr><tr><td style="background:gray;width:1px;height:auto;cursor:ew-resize;" onmouseover="this.style.width=\'5px\';this.parentNode.parentNode.parentNode.parentNode.style.left = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.left)-2)+\'px\';" onmouseout="this.parentNode.parentNode.parentNode.parentNode.style.left = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.left)+2)+\'px\';this.style.width=\'1px\';" onmouseup="parent.resizeObj=null;parent.dragObj=null;" onmousedown="parent.resizeObj = parent.document.getElementById(\'eu2bNP_\'+parent.eu2bActiveNPID); parent.dragObj = this.parentNode.parentNode.parentNode.parentNode; parent.resizeObj.lastX = event.clientX;parent.resizeObj.lastY = event.clientY;parent.resizeObj.direction=4;parent.dragObj.lastX = event.clientX;parent.dragObj.lastY = event.clientY;parent.dragObj.direction=4;return false;"></td><td id="eu2bNoteTD" style="width:auto;height:auto;">'
								  +	'<div id="eu2bNPNew" style="float:left;background-color:green;width:12px;height:11px;font-size:10px;text-align:center;border-style:solid;border-color:gray;border-width:1px;cursor:pointer;" onmouseover="this.style.borderColor=\'#cccccc\';this.style.backgroundColor=\'rgb(0,140,0)\';" onmouseout="this.style.borderColor=\'grey\';this.style.backgroundColor=\'green\';" onmousedown="this.style.borderColor=\'#555555\'; this.style.backgroundColor = \'rgb(0, 119, 119)\';return false;" onmouseup="this.style.borderColor=\'#cccccc\';this.style.backgroundColor=\'rgb(0,140,0)\';">+</div><div id="eu2bNPDelete" style="float:left;background-color:rgb(119,0,0);width:12px;height:11px;font-size:10px;text-align:center;border-style:solid;border-color:gray;border-width:1px;cursor:pointer;" onmouseover="this.style.borderColor=\'#cccccc\';this.style.backgroundColor=\'rgb(140,0,0)\';" onmouseout="this.style.borderColor=\'grey\';this.style.backgroundColor=\'rgb(119,0,0)\';" onmousedown="this.style.borderColor=\'#555555\'; this.style.backgroundColor = \'rgb(0, 119, 119)\';return false;" onmouseup="this.style.borderColor=\'#cccccc\';this.style.backgroundColor=\'rgb(140,0,0)\';">-</div><div style="float:left;height:11px;">&nbsp;</div><div id="eu2bNPChangeFont" style="float:left;background-color:rgb(119,0,119);width:12px;height:11px;font-size:10px;text-align:center;border-style:solid;border-color:gray;border-width:1px;cursor:pointer;" onmouseover="this.style.borderColor=\'#cccccc\';this.style.backgroundColor=\'rgb(140,0,140)\';" onmouseout="this.style.borderColor=\'grey\';this.style.backgroundColor=\'rgb(119,0,119)\';" onmousedown="this.style.borderColor=\'#555555\'; this.style.backgroundColor = \'rgb(0, 119, 119)\';return false;" onmouseup="this.style.borderColor=\'#cccccc\';this.style.backgroundColor=\'rgb(140,0,140)\';">F</div><div id="eu2bNPChangeFontSize" style="float:left;background-color:rgb(119,119,0);width:12px;height:11px;font-size:10px;text-align:center;border-style:solid;border-color:gray;border-width:1px;cursor:pointer;" onmouseover="this.style.borderColor=\'#cccccc\';this.style.backgroundColor=\'rgb(140,140,0)\';" onmouseout="this.style.borderColor=\'grey\';this.style.backgroundColor=\'rgb(119,119,0)\';" onmousedown="this.style.borderColor=\'#555555\'; this.style.backgroundColor = \'rgb(0, 119, 119)\';return false;" onmouseup="this.style.borderColor=\'#cccccc\';this.style.backgroundColor=\'rgb(140,140,0)\';">S</div><div style="background-color:rgb(0,0,100);text-align:center;" onmouseover="this.style.backgroundColor=\'rgb(0,0,120)\';" onmouseup="this.style.cursor=\'\';this.style.backgroundColor=\'rgb(0,0,70)\';parent.dragObj = null;parent.resizeObj = null;" onmouseout="this.style.backgroundColor=\'rgb(0,0,100)\';" onmousedown="this.style.cursor=\'move\';this.style.backgroundColor=\'rgb(0,119,119)\';parent.dragObj = this.parentNode.parentNode.parentNode.parentNode.parentNode;parent.dragObj.lastX = event.clientX;parent.dragObj.lastY = event.clientY;parent.dragObj.direction=0;return false;"><font class="font_pink_bold">eu2b NotePad</font></div>'
								  +	'</td><td style="background-color:gray;width:1px;height:auto;cursor:ew-resize;" onmouseover="this.style.width=\'5px\';this.parentNode.parentNode.parentNode.parentNode.style.left = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.left)-2)+\'px\';" onmouseout="this.parentNode.parentNode.parentNode.parentNode.style.left = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.left)+2)+\'px\';this.style.width=\'1px\';" onmouseup="parent.resizeObj=null;" onmousedown="parent.resizeObj = parent.document.getElementById(\'eu2bNP_\'+parent.eu2bActiveNPID); parent.resizeObj.lastX = event.clientX;parent.resizeObj.lastY = event.clientY;parent.resizeObj.direction=5;return false;"></td></tr><tr><td style="background-color:white;width:1px;height:1px;cursor:nesw-resize;" onmouseover="this.style.width=\'5px\';this.style.height=\'5px\';this.parentNode.parentNode.parentNode.parentNode.style.left = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.left)-2)+\'px\';this.parentNode.parentNode.parentNode.parentNode.style.top = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.top)-2)+\'px\';" onmouseout="this.parentNode.parentNode.parentNode.parentNode.style.left = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.left)+2)+\'px\';this.parentNode.parentNode.parentNode.parentNode.style.top = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.top)+2)+\'px\';this.style.width=\'1px\';this.style.height=\'1px\';" onmouseup="parent.resizeObj=null;parent.dragObj=null;" onmousedown="parent.resizeObj = parent.document.getElementById(\'eu2bNP_\'+parent.eu2bActiveNPID); parent.dragObj = this.parentNode.parentNode.parentNode.parentNode; parent.resizeObj.lastX = event.clientX;parent.resizeObj.lastY = event.clientY;parent.resizeObj.direction=6;parent.dragObj.lastX = event.clientX;parent.dragObj.lastY = event.clientY;parent.dragObj.direction=6;return false;"></td><td style="background:gray;width:auto;height:1px;cursor:ns-resize;" onmouseover="this.style.height=\'5px\';this.parentNode.parentNode.parentNode.parentNode.style.top = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.top)-2)+\'px\';" onmouseout="this.parentNode.parentNode.parentNode.parentNode.style.top = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.top)+2)+\'px\';this.style.height=\'1px\';" onmouseup="parent.resizeObj=null;" onmousedown="parent.resizeObj = parent.document.getElementById(\'eu2bNP_\'+parent.eu2bActiveNPID); parent.resizeObj.lastX = event.clientX;parent.resizeObj.lastY = event.clientY;parent.resizeObj.direction=7;return false;"></td><td style="background:white;width:1px;height:1px;cursor:nwse-resize;" onmouseover="this.style.width=\'5px\';this.style.height=\'5px\';this.parentNode.parentNode.parentNode.parentNode.style.left = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.left)-2)+\'px\';this.parentNode.parentNode.parentNode.parentNode.style.top = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.top)-2)+\'px\';" onmouseout="this.parentNode.parentNode.parentNode.parentNode.style.left = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.left)+2)+\'px\';this.parentNode.parentNode.parentNode.parentNode.style.top = (parseInt(this.parentNode.parentNode.parentNode.parentNode.style.top)+2)+\'px\';this.style.width=\'1px\';this.style.height=\'1px\';" onmouseup="parent.resizeObj=null;parent.dragObj=null;" onmousedown="parent.resizeObj = parent.document.getElementById(\'eu2bNP_\'+parent.eu2bActiveNPID); parent.dragObj = this.parentNode.parentNode.parentNode.parentNode; parent.resizeObj.lastX = event.clientX;parent.resizeObj.lastY = event.clientY;parent.resizeObj.direction=8;parent.dragObj.lastX = event.clientX;parent.dragObj.lastY = event.clientY;parent.dragObj.direction=8;return false;"></td></tr></tbody></table>'
								  +	'<div id ="eu2bNPClose" style="position:absolute;top:0px;right:0px;margin:3px;height:16px;width:11px;border-style:solid;border-width:1px;font-weight:bold;background:rgb(140,0,0); z-index:9999;color:white;font-size:10px;text-align:center;vertical-align:middle;padding:0px;cursor:pointer" onmouseover="this.style.borderWidth=\'2px\';this.style.backgroundColor=\'rgb(170,0,0)\';" onmouseout="this.style.borderWidth=\'1px\'; this.style.backgroundColor=\'rgb(140,0,0)\';" onmousedown="this.style.borderWidth=\'2px\'; this.style.backgroundColor=\'#007777\';">X</div>';
		myP.document.addEventListener("mousemove", moveResizeWindow, false);
		myP.document.addEventListener("mouseup", cancelMoveResizeWindow, false);
		var tTabBar = document.createElement("div");
		tTabBar.setAttribute("id","eu2bNPTabBar");
		tTabBar.setAttribute("style", "height:13px;width:auto;border-style:solid;border-width:1px 0px 1px 0px;background:black; z-index:9901;margin:0px;padding:0px;");
		myP.document.body.appendChild(tNotePadWindow);
		var tNote = myP.document.getElementById("eu2bNoteTD");
		tNote.appendChild(tTabBar);
		tDiv = myP.document.getElementById("eu2bNPNew");
		tDiv.addEventListener("click", addNote,false);
		tDiv = myP.document.getElementById("eu2bNPDelete");
		tDiv.addEventListener("click", deleteNote,false);
		tDiv = myP.document.getElementById("eu2bNPChangeFont");
		tDiv.addEventListener("click", changeNoteFont,false);
		tDiv = myP.document.getElementById("eu2bNPChangeFontSize");
		tDiv.addEventListener("click", changeNoteFontSize,false);
		tDiv = myP.document.getElementById("eu2bNPClose");
		tDiv.addEventListener("click", closeNP,false);
	}
	tDiv = tNotePadWindow.getElementsByClassName("eu2bNPTab");
	for ( i = 0 ; i < tDiv.length ; ++i ) tDiv[i].style.backgroundColor = "#000077";
	tDiv = myP.document.getElementById("eu2bNPTab_"+activeTabID);
	if ( tDiv != null ) {
		tDiv.style.backgroundColor='rgb(0, 119, 0)';
	} else {
		for ( i = 3 ; i < tNPdBData.length ; i += 6 ) {
			tDiv = document.createElement("div");
			tDiv.setAttribute("id","eu2bNPTab_"+tNPdBData[i]);
			tDiv.setAttribute("class", "eu2bNPTab");
			tDiv.setAttribute("style", "float:left;width:30px;height:13px;border-style:solid;border-width:0px 1px 0px 0px;background:"+(tNPdBData[i]==activeTabID?"rgb(0, 119, 0)":"#000077")+"; z-index:9902;color:white;font-weight:normal;font-size:10px;text-align:center;vertical-align:middle;padding:0px;cursor:pointer;display:;visibility:visible;");
			tDiv.setAttribute("onMouseOver", "this.style.textDecoration='underline';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
			tDiv.setAttribute("onMouseOut", "this.style.textDecoration='none';var tmpC = this.style.backgroundColor; if ( typeof(this.oldColor) != 'undefined' ) this.style.backgroundColor = this.oldColor; this.oldColor = tmpC;");
			tDiv.setAttribute("onMouseDown", "this.style.textDecoration='underline'; this.oldColor = this.style.backgroundColor; var tmp = this.parentNode.getElementsByClassName('eu2bNPTab'); for ( var i = 0 ; i < tmp.length ; ++i ) {if (tmp[i].style.backgroundColor!='rgb(0, 119, 0)') {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}} this.style.backgroundColor='rgb(0, 119, 119)';return false;");
			tDiv.setAttribute("onMouseUp", "if (this.style.backgroundColor=='rgb(0, 119, 119)') {var tmp = this.parentNode.getElementsByClassName('eu2bNPTab'); for ( var i = 0 ; i < tmp.length ; ++i ) {tmp[i].style.backgroundColor='#000088';tmp[i].oldColor = '#000088';}this.style.backgroundColor='rgb(0, 119, 0)';this.oldColor = 'rgb(0, 119, 0)';}else{this.style.backgroundColor=this.oldColor;}");
			tDiv.innerHTML = ""+tNPdBData[i];
			tDiv.addEventListener("click",activateNPTab, false);
			tTabBar.appendChild(tDiv);
		}
	}
	tDiv = tNotePadWindow.getElementsByClassName("eu2bNP");
	for ( i = 0 ; i < tDiv.length ; ++i ) tDiv[i].style.display = "none";//tDiv[i].style.display = "none";
	tDiv = myP.document.getElementById("eu2bNP_"+activeTabID);
	if ( tDiv != null ) { 
		bLog("found NP! displaying it! from draw NP");
		tDiv.style.display = "";
//		tDiv.style.visibility = "visible";
	} else {
		for ( i = 3 ; i < tNPdBData.length ; i += 6 ) {
			tDiv = document.createElement("textarea");
			tDiv.setAttribute("id","eu2bNP_"+tNPdBData[i]);
			tDiv.setAttribute("wrap", "off");
			tDiv.setAttribute("class", "eu2bNP");
			tDiv.setAttribute("style", "float:left;height:"+tNPdBData[i+4]+";width:"+tNPdBData[i+3]+";overflow:auto;padding:0px;margin:0px;cursor:text;background:black;color:white;font-family:"+tNPdBData[i+1]+";font-size:"+tNPdBData[i+2]+";font-weight:normal;display:"+(tNPdBData[i]==activeTabID?"":"none")+";");
			tDiv.innerHTML = tNPdBData[i+5];
			bLog("appending new NotePad");
			tNote.appendChild(tDiv);
		}
	}
	return true;
}

function showBA (evt) {
	bLog("Add/Show BA.\nparent.parent.location = " + parent.parent.location + "\nBAID = " + myP.eu2bActiveBAID);
	if ( !drawBattleAnalyzer(myP.eu2bActiveBAID) ) evt.target.style.backgroundColor = "black";
}

function showNotePad (evt) {
	bLog("Showing NotePad!");
	if ( !drawNotePad(myP.eu2bActiveNPID,0) ) evt.target.style.backgroundColor = "black";
}

function getBattleData(activeBAID) {
	tBattleLog = unsafeWindow.battle_log;
	tShipList = unsafeWindow.shiplist;
	var k, FFindex1, FFindex2;
	var attackCount = new Object();
	attackCount["Friendly"] = new Array(2);
	attackCount["Friendly"][0] = 0;
	attackCount["Friendly"][1] = 0;
	attackCount["Enemy"] = new Array(2);
	attackCount["Enemy"][0] = 0;
	attackCount["Enemy"][1] = 0;
	attackCount["All"] = new Array(2);
	attackCount["All"][0] = 0;
	attackCount["All"][1] = 0;
	for ( var i = 0 ; i < tBattleLog.length ; ++i ) {
		for ( k = 1 ; k < 3 ; ++k ) { // Initialize variables
			if ( (k == 1 && typeof(tShipList[tBattleLog[i][k]]['AttacksOut']) == "undefined") || (k == 2 && tBattleLog[i].length > 2 && tBattleLog[i][0] != "new_ship" && tBattleLog[i][0] != "ret" && typeof(tShipList[tBattleLog[i][k]]['AttacksOut']) == "undefined") ) {
				tShipList[tBattleLog[i][k]]["Deaths"] = 0;
				tShipList[tBattleLog[i][k]]["Retreats"] = 0;
				tShipList[tBattleLog[i][k]]["DieTime"] = 0;
				tShipList[tBattleLog[i][k]]["LifeTime"] = 0;
				tShipList[tBattleLog[i][k]]["AttacksOut"] = 0;
				tShipList[tBattleLog[i][k]]["AttacksOutS"] = 0;
				tShipList[tBattleLog[i][k]]["AttacksOutNS"] = 0;
				tShipList[tBattleLog[i][k]]["AttacksIn"] = 0;
				tShipList[tBattleLog[i][k]]["DamOutHull"] = 0;
				tShipList[tBattleLog[i][k]]["DamOutHullS"] = 0;
				tShipList[tBattleLog[i][k]]["DamOutHullNS"] = 0;
				tShipList[tBattleLog[i][k]]["DamInHull"] = 0;
				tShipList[tBattleLog[i][k]]["DamOutShield"] = 0;
				tShipList[tBattleLog[i][k]]["DamInShield"] = 0;
				tShipList[tBattleLog[i][k]]["DamOutAiming"] = 0;
				tShipList[tBattleLog[i][k]]["DamInAiming"] = 0;
				tShipList[tBattleLog[i][k]]["MissesOut"] = 0;
				tShipList[tBattleLog[i][k]]["MissesIn"] = 0;
			}
		}
		if ( tShipList[tBattleLog[i][1]]["font_color"].indexOf("green") > -1 ) {
			FFindex1 = "Friendly";
			FFindex2 = "Enemy";
		} else if ( tShipList[tBattleLog[i][1]]["font_color"].indexOf("red") > -1 ) { // == "font_red_bold") {
			FFindex1 = "Enemy";
			FFindex2 = "Friendly";
		} else {
			FFindex1 = "All";
			FFindex2 = FFindex1;
		}
		if ( tBattleLog[i].length < 3 ) {	//Destroy
			++tShipList[tBattleLog[i][1]]["Deaths"];
			tShipList[tBattleLog[i][1]]["DieTime"] += attackCount[FFindex2][0];  // Save the number of attacks it survived.
			tShipList[tBattleLog[i][1]]["LifeTime"] += (attackCount[FFindex2][0] + attackCount[FFindex2][1]);  // Save the number of attack attempts it survived.
		} else if ( tBattleLog[i][0] == "new_ship" ) {
			tShipList[tBattleLog[i][1]]["LifeTime"] = (-1) * (attackCount[FFindex2][0] + attackCount[FFindex2][1]);
			tShipList[tBattleLog[i][1]]["DieTime"] = (-1) * (attackCount[FFindex2][0]);
		} else if ( tBattleLog[i][0] == "ret" ) {
			++tShipList[tBattleLog[i][1]]["Retreats"];
			tShipList[tBattleLog[i][1]]["LifeTime"] += (attackCount[FFindex2][0] + attackCount[FFindex2][1]);  // Save the number of attack attempts it survived.			
		} else {							//Attack attempt
			if ( tBattleLog[i][3] < 1 && tBattleLog[i][4] < 1 && tBattleLog[i][5] < 1  ) {	// A Miss
				++attackCount[FFindex1][1];											//Add up misses for fleet.
				++tShipList[tBattleLog[i][1]]["MissesOut"];
				++tShipList[tBattleLog[i][2]]["MissesIn"];
			} else {																			// A Hit
				++attackCount[FFindex1][0];
				++tShipList[tBattleLog[i][1]]["AttacksOut"];
				++tShipList[tBattleLog[i][2]]["AttacksIn"];
				tShipList[tBattleLog[i][1]]["DamOutHull"] += tBattleLog[i][3];
				if ( tBattleLog[i][4] > 0 ) {
					tShipList[tBattleLog[i][1]]["DamOutHullS"] += tBattleLog[i][3];
					tShipList[tBattleLog[i][1]]["DamOutShield"] += tBattleLog[i][4];
					++tShipList[tBattleLog[i][1]]["AttacksOutS"];
				} else {
					tShipList[tBattleLog[i][1]]["DamOutHullNS"] += tBattleLog[i][3];
					++tShipList[tBattleLog[i][1]]["AttacksOutNS"];
				}
				tShipList[tBattleLog[i][2]]["DamInHull"] += tBattleLog[i][3];
				tShipList[tBattleLog[i][2]]["DamInShield"] += tBattleLog[i][4];
				tShipList[tBattleLog[i][1]]["DamOutAiming"] += tBattleLog[i][5];
				tShipList[tBattleLog[i][2]]["DamInAiming"] += tBattleLog[i][5];
			}
		}
	}
	for ( var k in tShipList ) {
		if ( tShipList[k]["font_color"].indexOf("green") > -1 ) {
			FFindex2 = "Enemy";
		} else if (tShipList[k]["font_color"].indexOf("red" ) > -1 ) {
			FFindex2 = "Friendly";
		} else if (tShipList[k]['ship_id'] == -1) {
			continue;
		} else {
			FFindex2 = "All";
		}
		if ( typeof (tShipList[k]['AttacksOut']) == "undefined" ) { // This ship neither took a shot, nor was shot at. Initialize Variables.
			tShipList[k]["Deaths"] = 0;
			tShipList[k]["Retreats"] = 0;
			tShipList[k]["DieTime"] = 0;
			tShipList[k]["LifeTime"] = attackCount[FFindex2][0] + attackCount[FFindex2][1];
			tShipList[k]["AttacksOut"] = 0;
			tShipList[k]["AttacksOutS"] = 0;
			tShipList[k]["AttacksOutNS"] = 0;
			tShipList[k]["AttacksIn"] = 0;
			tShipList[k]["DamOutHull"] = 0;
			tShipList[k]["DamOutHullS"] = 0;
			tShipList[k]["DamOutHullNS"] = 0;
			tShipList[k]["DamInHull"] = 0;
			tShipList[k]["DamOutShield"] = 0;
			tShipList[k]["DamInShield"] = 0;
			tShipList[k]["DamOutAiming"] = 0;
			tShipList[k]["DamInAiming"] = 0;
			tShipList[k]["MissesOut"] = 0;
			tShipList[k]["MissesIn"] = 0;
		} else if ( tShipList[k]["LifeTime"] < 1 ) {
			tShipList[k]["LifeTime"] += attackCount[FFindex2][0] + attackCount[FFindex2][1];
		}
		if ( tShipList[k]["DieTime"] < 0 ) {
			tShipList[k]["DieTime"] = 0;
		}
	}
	if ( typeof(myP.eu2bShipList) == "undefined" ) {
		myP.eu2bShipList = new Object();
	}
	myP.eu2bShipList["BL_"+activeBAID] = tShipList;
	bLog("done with getBattleData>" );
}

function insertAfter( referenceNode, newNode ) {
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

function setVal( vName, vValue ) {
    vName = myServer + "_" + vName;
    GM_setValue(vName, vValue);
    return true;
}

function delVal( vName ) {
    vName = myServer + "_" + vName;
    GM_deleteValue(vName);
    return true;
}

function getVal( vName, vValue ) {
    vName = myServer + "_" + vName;
    return GM_getValue(vName, vValue);
}

function eu2bOnLoad (evt) {
	bLog("Onload!");
	unsafeWindow.document.onclick = unsafeWindow.document.oncontextmenu = unsafeWindow.document.onmousedown  = unsafeWindow.document.onmouseup =  null;
	//unsafeWindow.document.body.onclick = unsafeWindow.document.body.oncontextmenu = unsafeWindow.document.body.onmousedown  = unsafeWindow.document.body.onmouseup =  null;
}
// ***** END ***** FUNCTION DECLARATIONS ***** //
// ***** BEGIN **** GLOBAL CODE BLOCK 1 ***** //
bLog("location>" + myLocation);
//window.addEventListener('load', eu2bLoad, false);

// ** Begin Kill Script - This code kills the script at the wrong times (for the right reasons).
tDiv = document.getElementsByTagName("h1");
if ( tDiv != null && tDiv.length > 0 && tDiv[0].innerHTML == "Empire Universe 2 Downtime" ) {
	bLog ( "Script killed cause of downtown");
	updateLoadTime();
	return; // Kill the script during downtime.
}

if ( myLocation.indexOf('/index.php') != -1 ) {
	unsafeWindow.chatOpen = function () {
		document.getElementById('chat_motd').style.display='none';
		document.getElementById( 'chat' ).style.display='';
		unsafeWindow.chatOpen = function(){};
	};
	window.addEventListener('unload', unRegisterEvents, false);
	bLog ( "At index: added unload events. Now, Script killed.");
	//GM_log (document.documentElement.innerHTML);
	window.addEventListener("load", eu2bOnLoad,false);

	//updateLoadTime();
	return;  //Kill script cause its the wrong window
}

if ( myLocation.indexOf('login') != -1 ) {
	bLog ( "Script killed cause we are on the login screen"); // WIKI:Auto login???
	updateLoadTime();
	return;  //Kill script cause its the wrong window
}

if ( myLocation.indexOf('/message_overview.php') != -1 ) {
	bLog ( "Script killed cause we are reading messages");
	updateLoadTime();
	return;  //Kill script cause its the wrong window
}

if ( myLocation.indexOf('/message_view.php') != -1 ) {
	bLog ( "Script killed cause we are reading a message");
	updateLoadTime();
	return;  //Kill script cause its the wrong window
}

if ( myLocation.indexOf('/message_folder_edit.php') != -1 ) {
	bLog ( "Script killed cause we are editing the message folders.");
	updateLoadTime();
	return;  //Kill script cause its the wrong window
}

if ( myLocation.indexOf('/gamelog_overview.php') != -1 ) {
	bLog ( "Script killed cause we are looking at the game log.");
	updateLoadTime();
	return;  //Kill script cause its the wrong window
}

if ( myLocation.indexOf('/battle_overview.php') != -1 ) {
	bLog ( "Script killed cause we are watching a battle.");
	updateLoadTime();
	return;  //Kill script cause its the wrong window
}

if ( myLocation.indexOf('/toplist_overview.php') != -1 ) {
	bLog ( "Script killed cause we are looking at the Ranking Screen."); 
	updateLoadTime();
	return;  //Kill script cause its the wrong window
}

if ( myLocation.indexOf('/settings_overview.php') != -1 ) {
	bLog ( "Script killed cause we are looking at the Settings Screen."); 
	updateLoadTime();
	return;  //Kill script cause its the wrong window
}

if ( myLocation.indexOf('/message_new.php') != -1 ) {
	bLog ( "Script killed cause we are sending a message to support! Good Luck! (hey where did the tabs go?)"); 
	updateLoadTime();
	return;  //Kill script cause its the wrong window
}

if ( myLocation.indexOf('/empire_overview.php') != -1 ) {
	bLog ( "Script killed cause we are checking out how awesome our Empire is."); 
	updateLoadTime();
	return;  //Kill script cause its the wrong window
}

if ( myLocation.indexOf('marketing') != -1 ) {
	bLog ( "Script killed cause we are.... somewhere else."); 
	updateLoadTime();
	return;  //Kill script cause its the wrong window
}

myLangArray = getLangArray(myLocation);

var myP = unsafeWindow.parent;
for ( var i = 0 ; i < 10 && myP.location.href.indexOf("/index.php") < 0  && myP != myP.parent; ++i )  myP = myP.parent;
if ( myP.location.href.indexOf("/index.php") < 0 ) {
	bLog("Init> Cant find parent, exiting...");
	return;
}

document.addEventListener("mousemove", moveResizeWindow, false);
document.addEventListener("mouseup", cancelMoveResizeWindow, false);
//window.addEventListener("load", eu2bOnLoad,false);
// ** Active Planet Indicator - This code finds the active planet and draws a * on top of it so you can see which planet you have active.
var activePlanet = null;
tDiv = myP.document.getElementById("layer_planet");
tDiv2 = myP.document.getElementById("myStar");
var piCount = -1;
if ( tDiv != null ) {
	piCount = 0;
	var tC,i;
	activePlanet = tDiv.getElementsByTagName("img");
	for ( i = 0 ; i < activePlanet.length ; ++i ) {
		tC = activePlanet[i].getAttribute("class");
		if ( tC == "planet_inactive" ) piCount++;
		else if ( tC == "planet_active" ) break;
	}

	if ( i < activePlanet.length ) {
		bLog("Found active planet, setting activePlanet and saving to GM.");
		activePlanet = activePlanet[i].title;
		if ( getVal("piCount",-1) == piCount && (typeof(tDiv2) != "undefined" && tDiv2 != null) ) {
			piCount = -1;
		} else {
			setVal("activePlanet",activePlanet);
			setVal("piCount", piCount);
		}
	} else {
		var tj = "parent\img\class>";
		for ( var i  = 0 ; i < activePlanet.length ; ++i) tj += activePlanet[i].getAttribute("class") + ",";
		activePlanet = getVal("activePlanet","");
		piCount = getVal("piCount",-1);
		bLog("Error in active planet, found the layer but not the active planet! Loaded activePlanet from GM>" + activePlanet + "<\n-" + tj);
	}
} else {
	activePlanet = getVal("activePlanet","");
	piCount = getVal("piCount",-1);
	bLog("Didnt find layer_planet. Loaded activePlanet from GM>" + activePlanet + "<");
}
if ( piCount > -1  && tDiv != null ) {
	if (tDiv2 != null ) tDiv2.parentNode.removeChild(tDiv2);
	tDiv.innerHTML += "<div id='myStar' style='position: absolute;font-weight: bold;font-size:22px;top: 14px;left: " + (5 + piCount*20) + "px;color:yellow'>*</div>";
} else bLog ("Either, piCount is less than zero>" + piCount + "<\nor tDiv is null>" + tDiv + "<");
// ***** END ***** GLOBAL CODE BLOCK 1 ****//
// ***** BEGIN ***** LOCATION SPECIFIC CODE BLOCK 1 ***** //
if ( parent.location.href.indexOf("/index.php") == -1 && myLocation.indexOf('fleet_overview') == -1) {
	if (myLocation.indexOf("/commander_info.php?") != -1) {
		tDiv = document.getElementById("layer_site_content");
		if ( tDiv != null ) {
			tDiv2 = tDiv.getElementsByClassName("font_white");
			if ( tDiv2.length > 31 ) {
				var thePoints = parseInt(tDiv2[3].innerHTML.replace(/<b>|\./g,""));
				for ( var i = 6 ; i < 19 ; i += 2 ) {
					tDiv2[i].parentNode.innerHTML += "<td class='font_pink_bold' valign='middle' style='text-align:right' width=''>" + Math.round((parseInt(tDiv2[i].innerHTML.replace(/\./g,"")) / thePoints) * 10000)/100 + "%</td>";
				}
				var theXP = parseInt(tDiv2[27].innerHTML);//.replace(/\./g,""));
                if ( isNaN(theXP) ) {
                    theXP = parseInt(tDiv2[31].innerHTML.replace(/\./g,""));
                    var theNextXP = parseInt(tDiv2[33].innerHTML.replace(/\./g,""));
                } else {
                    theXP = parseInt(tDiv2[29].innerHTML.replace(/\./g,""));
                    var theNextXP = parseInt(tDiv2[31].innerHTML.replace(/\./g,""));
                }
				theXP = theNextXP - theXP;
				if ( theXP < 0 ) theXP = "N/A";
				var theTable = tDiv2[31].parentNode.parentNode;
				var theLastChild = theTable.lastChild;
				theTable.removeChild(theTable.lastChild);
				var theSecondToLastChild = theTable.lastChild;
				theTable.removeChild(theTable.lastChild);
				theTable.innerHTML += '<tr><td><img src="http://static.empireuniverse2.de/default/en/empty.gif" height="1" width="20" /></td><td class="font_white" valign="top" width="">'+myLangArray[5][12]+'</td><td><img src="http://static.empireuniverse2.de/default/en/empty.gif" height="1" width="20" /></td><td class="font_white" valign="top" width="">'+theXP+'</td></tr>';
				theTable.appendChild(theSecondToLastChild);
				theTable.appendChild(theLastChild);
			}
			tDiv2 = tDiv.getElementsByTagName("table");
			if ( tDiv2.length > 2 ) {
				tDiv = tDiv2[2].getElementsByClassName("table_entry");
				if ( tDiv.length == 12 ) {
					var totalLevels = new Object();
					totalLevels[0] = 0;
					var Offset = 0;
					var j = 1;
					if ( isNaN(parseInt(tDiv[4].innerHTML)) ) Offset = 2;
					else Offset = 3;
					for ( var i = 1 ; i < (Offset*6) ; i += Offset ) {
						totalLevels[j] = parseInt(tDiv[i].innerHTML);
						totalLevels[0] += totalLevels[j];
						++j;
					}
					tDiv = tDiv2[2].firstChild.getElementsByTagName("tr");
					tDiv2[2].firstChild.firstChild.innerHTML += '<td class="table_title" align="left" background="http://static.empireuniverse2.de/default/en/default/table/table_1/title_back.gif" height="21" width="50">Percent</td>';
					j = 1;
					for ( var i = 1 ; i < 12; i += 2 ) {
						tDiv[i].innerHTML += '<td id="" class="table_entry" onclick="" colspan="" style="text-align: center;" width="">'+(Math.round((totalLevels[j]/totalLevels[0])*10000)/100)+'%</td>';
						++j;
					}
				}
			}
		}
	} else if ( myLocation.indexOf("/fleet_edit.php?") != -1 ) {
		tDiv = document.getElementsByClassName("font_pink_bold"); //looking for the name of the orb, saving for later. The cargo screen (for some reason) does not have the orb name this fleet is at.
		if ( tDiv.length > 1 ) {
			setVal("FLEETPLANET", tDiv[1].innerHTML);
			bLog("fleet_edit>Stored Orb name>" + tDiv[1].innerHTML + "<" );
		}
		var tCoords = "";
		var tFonts = document.getElementsByClassName("font_white"); // looking for the coordinates, saving for later. The collect screen (for some reason) does not have the coordinates of this orb you are mining (wierd? huh?)
		if ( tFonts != null && tFonts.length > 10 ) {
			tDiv2 = tFonts[tFonts.length-9].innerHTML.split("-");
			if ( tDiv2.length == 4 ) tCoords = tDiv2.join(":");
			setVal("FLEETCOORDS",  tCoords);
			bLog("fleet_edit>Stored orb coords>" + tCoords+ "<");
		}

		if ( typeof(tFonts[14]) != "undefined" && isNaN(parseInt(tFonts[14].innerHTML)) ) {
			tDiv = parseInt(tFonts[24].innerHTML.replace(/\./g,""));
			tDiv2 = tFonts[23].innerHTML.split("<table")[0].split(" ");
			tDiv2 = parseInt(tDiv2[tDiv2.length-1].replace(/\./g,""));
			if ( tDiv < tDiv2 ) {
				tDiv = document.getElementById("button_collect");
				if ( tDiv != null && tDiv.src.indexOf("disabled") == -1 ) {
					tDiv = tDiv.parentNode;
					tDiv.innerHTML += "<div id='eu2bFEQuickCollect' style='position:relative;float:left;top:3px;left:-5px;width:40px;background:#000088;cursor:pointer;border-style:solid;border-width:1px;border-color:grey;text-align:center;vertical-align:middle' onmouseover='this.style.borderColor=\"#cccccc\";this.setAttribute(\"oldColor\",this.style.backgroundColor);' onmouseout='this.style.borderColor=\"grey\";this.style.background=this.getAttribute(\"oldColor\");' onmousedown='this.style.borderColor=\"#555555\";this.style.background=\"#007777\";' onmouseup='this.style.borderColor=\"grey\";this.style.background=\"#007700\";'>Quick Collect</div>";
					tDiv = document.getElementById("eu2bFEQuickCollect");
					tDiv.setAttribute("sUrl", document.getElementById("button_collect").getAttribute("onclick").split("'")[1] );
					tDiv.setAttribute("sCoords", tCoords);
					tDiv.addEventListener("click", doQuickCollect, false);
				} else bLog("Quick Collect> didnt find collect button, or its disabled, dont draw button.");
			} else bLog("Quick Collect> no cargo space, dont draw button.");
		} else bLog ("Quick Collect> Busy (in transit?), dont draw button.");

		tDiv = parent.document.getElementById("eu2bPlanetTitleFleetEdit");
		if ( tDiv == null ) {
			tDiv = document.createElement("div");
			tDiv.setAttribute("id","eu2bPlanetTitleFleetEdit");
			tDiv.setAttribute("style", "position: absolute; background:black; top: 0px; left: 30px; z-index:9999;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:3px;padding-right:3px;border-width:1px;border-color:grey;border-style:solid");
			tDiv.appendChild(document.createTextNode(getVal("activePlanet","")));
			parent.document.body.appendChild(tDiv);
		}

	} else if (myLocation.indexOf("/fleet_cargo.php?") != -1) {
		tDiv = document.body.getElementsByClassName("tab_active");
		var p = getVal("FLEETPLANET","unknown");
		if ( tDiv != null ) for ( var i in tDiv ) if ( tDiv[i].innerHTML == myLangArray[0][1] ) tDiv[i].innerHTML = myLangArray[5][1] + " " + p;
		tDiv = document.body.getElementsByClassName("tab_inactive");
		if ( tDiv != null ) for ( var i in tDiv ) if ( tDiv[i].innerHTML == myLangArray[0][1] ) tDiv[i].innerHTML = myLangArray[5][1] + " " + p;
		var tDiv = document.body.getElementsByClassName("font_white");
		var sumCargo = parseInt(document.getElementById("sum_cargo").innerHTML.replace(/\./g,""));
		if (tDiv != null && sumCargo != null) {
			var maxCargo = parseInt(tDiv[3].innerHTML.split("</span>")[1].split("/")[1].replace(/\./g,""));
			var rem = Math.round(maxCargo - sumCargo);
			tDiv[3].firstChild.innerHTML += '&nbsp;(<span id="cargo_remain">' + addCommas(rem) + '</span>&nbsp;' + myLangArray[5][2] + ')&nbsp;';
		}
		var oldUpdateCargo = unsafeWindow.update_cargo;
		unsafeWindow.update_cargo = function() {
			oldUpdateCargo();
			var CR = document.getElementById("cargo_remain");
			var tDiv = document.body.getElementsByClassName("font_white");
			var sumCargo = parseInt(document.getElementById("sum_cargo").innerHTML.replace(/\./g,""));
			if ( CR != null && tDiv != null && sumCargo != null) {
				var maxCargo = parseInt(tDiv[3].innerHTML.split("</span>")[1].split("/")[1].replace(/\./g,""));
				var rem = Math.round(maxCargo - sumCargo);
				CR.innerHTML = addCommas(rem);
			}
		};
	} else if (myLocation.indexOf("/fleet_collect.php?") != -1 && myLocation.indexOf("action=submit") == -1) {
		var lsc = document.getElementById("layer_site_content");
		var tImg = lsc.getElementsByTagName("div");
		if ( tImg.length < 2 ) {
			bLog("Killing rest of script because of Call up Error on collect screen.");
			updateLoadTime();
			return;
		}
		var fw = tImg[1].getElementsByClassName("font_white");//crashs sometimes
		tImg = tImg[0].getElementsByTagName("img");
		tImg = tImg[0].src;
		var orbType = tImg.split("/");
		orbType = orbType[orbType.length-1].split(".")[0];
		if ( orbType.indexOf("asteroid") != -1 ) orbType = "Asteroids";
		else if ( orbType.indexOf("wreckage") != -1 ) orbType = "Wreckages";
		else orbType = "";
		bLog("fleet_collect>type>" + orbType + "<");
		if ( orbType != "" ) {
			var i;
			var res = 0;
			var resType;
			var resAmount;
			var toolString = "";
			for ( i = 0 ;  (i+1 < fw.length) && (fw[i].innerHTML.indexOf(";") != -1)  ; i += 2 ){
				resType = fw[i].getElementsByTagName("img")[0].src.split("/");
				resType = resType[resType.length-1].split(".")[0];
				switch ( resType ) {
					case "titanium":	resType = "Ti";
										break;
					case "copper":		resType = "Cu";
										break;
					case "iron":		resType = "Fe";
										break;
					case "aluminium":	resType = "Al";
										break;
					case "mercury":		resType = "Hg";
										break;
					case "silicon":		resType = "Si";
										break;
					case "uranium":		resType = "U";
										break;
					case "krypton":		resType = "Kr";
										break;
					case "nitrogen":	resType = "N";
										break;
					case "hydrogen":	resType = "H";
										break;
					default:			resType = "--";
										bLog("fleet_collect>unknown resType>" + resType + "<");
				}
				resAmount = parseInt(fw[i+1].innerHTML);
				res += resAmount;
				
				if ( i > 3 && i % 4 == 0) toolString += "<br>";
				else if ( i > 0 ) toolString += ", ";
				toolString += resType + ":" + addCommas(resAmount);
			}
			var orbCoords = getVal ( "FLEETCOORDS","");
			if ( orbCoords != "") {
				var orbC = orbCoords.split(":");
				var SS = "s" + orbC[0];
				var XX = "x" + orbC[1];
				var YY = "y" + orbC[2];
				var ZZ = "z" + orbC[3];
				var tOrbs = myP.myOrbs;
				
				if ( typeof(tOrbs) == "undefined" || tOrbs == null ) bLog("Crash time!");
				if ( typeof(tOrbs[orbType][SS]) == "undefined"				|| tOrbs[orbType][SS] == null )				tOrbs[orbType][SS] = new Object();
				if ( typeof(tOrbs[orbType][SS][XX]) == "undefined"			|| tOrbs[orbType][SS][XX] == null )			tOrbs[orbType][SS][XX] = new Object();
				if ( typeof(tOrbs[orbType][SS][XX][YY]) == "undefined"		|| tOrbs[orbType][SS][XX][YY] == null )		tOrbs[orbType][SS][XX][YY] = new Object();
				if ( typeof(tOrbs[orbType][SS][XX][YY][ZZ]) == "undefined"	|| tOrbs[orbType][SS][XX][YY][ZZ] == null )	tOrbs[orbType][SS][XX][YY][ZZ] = new Object();
				tOrbs[orbType][SS][XX][YY][ZZ].coords = orbCoords;
				tOrbs[orbType][SS][XX][YY][ZZ].name = toolString;
				bLog("At coordinates " + orbCoords + " found " + toolString);
				saveData(orbType,myP.myTotals, tOrbs);
				update(orbType, myP.myTotals);
			}
			i += 2;
			var factor = fw[i].innerHTML.split(" ")[0].slice(1);
			if ( factor.indexOf(".") != -1 ) factor = parseFloat(factor) * 1000;
			else factor = parseInt(factor);
			var total = Math.round((res/factor)*100)/100;
			var cargo = fw[i+2].innerHTML.split("/");
			cargo = parseInt(cargo[1]) - parseInt(cargo[0]);
			var totalc = Math.round((cargo/factor)*100)/100;
			var theParent = fw[i-2].parentNode.parentNode;
			theParent.innerHTML += '<tr><td><img src="http://static.empireuniverse2.de/empty.gif" height="1" width="20"></td><td class="font_white" valign="top"><img src="' + tImg + '" height="10">&nbsp;&nbsp;' + myLangArray[4][0] + '</td><td><img src="http://static.empireuniverse2.de/empty.gif" height="1" width="20"></td><td class="font_white">' + res +  '&emsp;=&nbsp;' + total + ' ' + myLangArray[4][2] + ' ' + (Math.round((total/60)*100)/100) + ' ' + myLangArray[4][3] + ' ' + myLangArray[4][4] + '</td></tr><br>';
			var theParent = fw[i+2].parentNode.parentNode;
			theParent.innerHTML += '<tr><td><img src="http://static.empireuniverse2.de/empty.gif" height="1" width="20"></td><td class="font_white" valign="top">' + myLangArray[4][1] + '</td><td><img src="http://static.empireuniverse2.de/empty.gif" height="1" width="20"></td><td class="font_white">' + cargo + '&emsp;=&nbsp;' + totalc + ' ' + myLangArray[4][2] + ' ' + (Math.round((totalc/60)*100)/100) + ' ' + myLangArray[4][3] + ' ' + myLangArray[4][5] + '</td></tr>';
			var tTime, tOption;
			if ( totalc < total ) tTime = totalc;
			else tTime = total;
			if ( tTime > 45 ) {
				tOption = 60;
			} else if ( tTime > 22.5 ) {
				tOption = 30;
			} else if ( tTime > 8 ) {	
				tOption = 15;
			} else if ( tTime > 1 ) {
				tOption = 5;
			} else {
				tOption = 1;
			}
			fw = document.getElementsByName("f_amount");
			for ( i = 0 ; i < fw.length ; ++i ) {
				if ( tOption == fw[i].value ) fw[i].parentNode.innerHTML += "(" + (parseInt(fw[i].value)*factor) + " " + myLangArray[4][6] + ") *";
				else fw[i].parentNode.innerHTML += "(" + (parseInt(fw[i].value)*factor) + " " + myLangArray[4][6] + ")";
			}
		}
	} else if (myLocation.indexOf("/planet_info.php?") != -1 && myLocation.indexOf("&plantype=") != -1) {
		var orbType = myLocation.split("?")[1].split("&")[1].split("=")[1];
		switch (orbType) {
			case "asteroid":	orbType = "Asteroids";
								break;
			case "wreckage":	orbType = "Wreckages";
								break;
			default:			orbType = "";
		}
		bLog("type>" + orbType +"<");
		if ( orbType != "" ) {
			tDiv = document.getElementsByClassName("font_white");
			var orbCoords = tDiv[7].innerHTML;
			var resType;
			var resAmount;
			var toolString = "";
			var debugString = "";
			for ( var i = 8 ; i < 27 && i < tDiv.length && tDiv[i].innerHTML.length < 200; i += 2 ){
				resType = tDiv[i].getElementsByTagName("img")[0].src.split("/");
				resType = resType[resType.length-1].split(".")[0];
				switch ( resType ) {
					case "titanium":	resType = "Ti";
										break;
					case "copper":		resType = "Cu";
										break;
					case "iron":		resType = "Fe";
										break;
					case "aluminium":	resType = "Al";
										break;
					case "mercury":		resType = "Hg";
										break;
					case "silicon":		resType = "Si";
										break;
					case "uranium":		resType = "U";
										break;
					case "krypton":		resType = "Kr";
										break;
					case "nitrogen":	resType = "N";
										break;
					case "hydrogen":	resType = "H";
										break;
					default:			resType = "--";
										bLog("planet_info>unknown resType>" + resType + "<");

				}
				resAmount = tDiv[i+1].innerHTML;
				if ( i > 11 && i % 4 == 0) toolString += "<br>";
				else if ( i > 8 ) toolString += ", ";
				toolString += resType + ":" + addCommas(resAmount);
			}
			var orbC = orbCoords.split(":");
			var SS = "s" + orbC[0];
			var XX = "x" + orbC[1];
			var YY = "y" + orbC[2];
			var ZZ = "z" + orbC[3];
			var tOrbs = myP.myOrbs;
			if ( typeof(tOrbs[orbType][SS])				== "undefined"	|| tOrbs[orbType][SS]				== null ) tOrbs[orbType][SS]					= new Object();
			if ( typeof(tOrbs[orbType][SS][XX])			== "undefined"	|| tOrbs[orbType][SS][XX]			== null ) tOrbs[orbType][SS][XX]				= new Object();
			if ( typeof(tOrbs[orbType][SS][XX][YY])		== "undefined"	|| tOrbs[orbType][SS][XX][YY]		== null ) tOrbs[orbType][SS][XX][YY]		= new Object();
			if ( typeof(tOrbs[orbType][SS][XX][YY][ZZ])	== "undefined"	|| tOrbs[orbType][SS][XX][YY][ZZ]	== null ) tOrbs[orbType][SS][XX][YY][ZZ]	= new Object();
			tOrbs[orbType][SS][XX][YY][ZZ].coords = orbCoords;
			tOrbs[orbType][SS][XX][YY][ZZ].name = toolString;
			bLog("At coordinates " + orbCoords + " found: " + toolString);
			saveData(orbType,myP.myTotals, tOrbs);
			update(orbType, myP.myTotals);
		}
    }
    else if (myLocation.indexOf("/technology_overview.php") != -1) {
        tDiv = parent.document.getElementById("eu2bSubPlanetTitle");
		if ( tDiv == null ) {
			tDiv = document.createElement("div");
			tDiv.setAttribute("id","eu2bSubPlanetTitle");
			tDiv.setAttribute("style", "position: absolute; background:black; top: 0px; left: 30px; z-index:9999;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:3px;padding-right:3px;border-width:1px;border-color:grey;border-style:solid");
			tDiv.appendChild(document.createTextNode(getVal("activePlanet","")));
			parent.document.body.appendChild(tDiv);
		} else bLog ("eu2bSubPlanetTitle exists!");
		tDiv = document.getElementById("layer_site_content");
		if ( tDiv != null ) {
            tDiv2 = document.getElementsByTagName("div");
            for (var i = 0; i < tDiv2.length; i++){
                thisElem = tDiv2[i];
                nextElem = tDiv2[i+1];
                if(thisElem.textContent == "Time so far:"){
                    researchTimer = nextElem.textContent;
                }
            }
			tDiv2 = document.getElementsByClassName("font_white");
			for (var i=0; i<tDiv2.length; i++) {
                thisElem = tDiv2[i];
                switch (thisElem.textContent)  {  //Add percents to the text
                    case myLangArray[9][0]:
                        thisElem.textContent = thisElem.textContent + " (0% done)"; // change it
                        researchPercent = 0;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][1]:
                        thisElem.textContent = thisElem.textContent + " (2% done)"; // change it
                        researchPercent = 2;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][2]:
                        thisElem.textContent = thisElem.textContent + " (5% done)"; // change it
                        researchPercent = 5;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][3]:
                        thisElem.textContent = thisElem.textContent + " (11% done)"; // change it
                        researchPercent = 11;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][4]:
                        thisElem.textContent = thisElem.textContent + " (16% done)"; // change it
                        researchPercent = 16;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][5]:
                        thisElem.textContent = thisElem.textContent + " (21% done)"; // change it
                        researchPercent = 21;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][6]:
                        thisElem.textContent = thisElem.textContent + " (26% done)"; // change it
                        researchPercent = 26;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][7]:
                        thisElem.textContent = thisElem.textContent + " (32% done)"; // change it
                        researchPercent = 32;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][8]:
                        thisElem.textContent = thisElem.textContent + " (37% done)"; // change it
                        researchPercent = 37;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][9]:
                        thisElem.textContent = thisElem.textContent + " (42% done)"; // change it
                        researchPercent = 42;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][10]:
                        thisElem.textContent = thisElem.textContent + " (47% done)"; // change it
                        researchPercent = 47;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][11]:
                        thisElem.textContent = thisElem.textContent + " (53% done)"; // change it
                        researchPercent = 53;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][12]:
                        thisElem.textContent = thisElem.textContent + " (58% done)"; // change it
                        researchPercent = 58;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][13]:
                        thisElem.textContent = thisElem.textContent + " (63% done)"; // change it
                        researchPercent = 63;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][14]:
                        thisElem.textContent = thisElem.textContent + " (68% done)"; // change it
                        researchPercent = 68;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][15]:
                        thisElem.textContent = thisElem.textContent + " (74% done)"; // change it
                        researchPercent = 74;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][16]:
                        thisElem.textContent = thisElem.textContent + " (79% done)"; // change it
                        researchPercent = 79;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][17]:
                        thisElem.textContent = thisElem.textContent + " (84% done)"; // change it
                        researchPercent = 84;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][18]:
                        thisElem.textContent = thisElem.textContent + " (89% done)"; // change it
                        researchPercent = 89;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][19]:
                        thisElem.textContent = thisElem.textContent + " (95% done)"; // change it
                        researchPercent = 95;
                        myElem = thisElem.parentNode;
                        break;
                    case myLangArray[9][20]:
                        thisElem.textContent = thisElem.textContent + " (99% done)"; // change it
                        researchPercent = 99;
                        myElem = thisElem.parentNode;
                        break;
                    default: GM_log("Research Status Line: '" + thisElem.textContent + "' was not found in the language array.  This feature may not be supported in the local language.");
                    break;
                }
            }
            switch(researchTimer.length){
                case 5:
                    researchMinutesPassed = researchTimer.slice(0,2);
                    researchHoursPassed = 0;
                    break;
                case 8:
                    if (researchTimer.charAt(1) === "D") {
                        researchDaysPassed = researchTimer.slice(0,1);
                        researchHoursPassed = researchDaysPassed * 24;
                        researchMinutesPassed = researchTimer.slice(3,5);
                    } else {
                        researchHoursPassed = researchTimer.slice(0,2);
                        researchMinutesPassed = researchTimer.slice(3,5);
                    }
                    break;
                case 9: 
                    researchDaysPassed = researchTimer.slice(0,2);
                    researchHoursPassed = researchDaysPassed * 24;
                    researchMinutesPassed = researchTimer.slice(4,6);
                    break;
                case 11:
                    researchDaysPassed = researchTimer.slice(0,1);
                    researchHoursPassed = parseFloat(researchTimer.slice(3,5)) + (parseFloat(researchDaysPassed) * 24);
                    researchMinutesPassed = researchTimer.slice(6,8);
                    break;
                case 12:
                    researchDaysPassed = researchTimer.slice(0,2);
                    researchHoursPassed = parseFloat(researchTimer.slice(4,6)) + (parseFloat(researchDaysPassed) * 24);
                    researchMinutesPassed = researchTimer.slice(7,9);
                    break;
                default:
                    researchHoursPassed = 0;
                    researchMinutesPassed = 0;
            }
            
            //researchTimeLeft, researchDaysLeft, researchHoursLeft, researchMinutesLeft, researchDateDone

            researchHoursPassed = parseFloat(researchHoursPassed) + (parseFloat(researchMinutesPassed) / 60);
    
            if (researchPercent > 0) {
                researchHoursLeft = ((100 / researchPercent) * researchHoursPassed) - researchHoursPassed;
                var researchD = new Date();
                var researchTime = researchD.getTime();
                researchD.setTime(researchTime + (researchHoursLeft * 3600000));
                var researchTimeHours = pad(researchD.getHours(), 2);
                var researchTimeMin = pad(researchD.getMinutes(), 2);
                var researchTimeMonth = researchD.getMonth() + 1;
                var researchTimeDate = researchD.getDate();
                researchDateDone = " We should be done around " + researchTimeHours + ":" + researchTimeMin + " on " + researchTimeMonth + "-" + researchTimeDate + ".";
          
                researchTimeLeft = "We have roughly: ";
                if (researchHoursLeft >= 24) {
                    researchDaysLeft = Math.floor(researchHoursLeft/24);
                    researchHoursLeft = researchHoursLeft - (researchDaysLeft * 24);
                    researchTimeLeft = researchTimeLeft + researchDaysLeft + " days and ";
                }
                researchMinutesLeft = researchHoursLeft - Math.floor(researchHoursLeft);
                researchHoursLeft = pad(Math.floor(researchHoursLeft),2);
                if (researchMinutesLeft > 0) {
                    researchMinutesLeft = Math.floor(researchMinutesLeft * 60);
                }
                researchMinutesLeft = pad(researchMinutesLeft, 2);
        
                researchTimeLeft = researchTimeLeft + researchHoursLeft + ":" + researchMinutesLeft + " hours left.";
            }
            else {
                researchTimeLeft = "We're not far enough in our research to estimate the time remaining.";
                researchDateDone = "";
            }
            tDiv = document.createElement("tr");
            tDiv2 = document.createElement("td");
            tDiv2.innerHTML += '<img width="20" height="1" src="http://static.empireuniverse2.de/default/en/empty.gif">';
            tDiv.appendChild(tDiv2);
            tDiv2 = document.createElement("td");
            tDiv2.setAttribute("class","font_white");
            tDiv2.setAttribute("width","");
            tDiv2.setAttribute("valign", "top");
            tDiv2.setAttribute("style", "");
            tDiv2.innerHTML += researchTimeLeft + researchDateDone;
            tDiv.appendChild(tDiv2);
            tDiv2 = document.createElement("td");
            tDiv2.innerHTML += '<img width="20" height="1" src="http://static.empireuniverse2.de/default/en/empty.gif">';
            tDiv.appendChild(tDiv2);
            tDiv2 = document.createElement("td");
            tDiv2.setAttribute("width", "");
            tDiv2.setAttribute("valign", "top");
            tDiv2.setAttribute("style", "");
            tDiv2.setAttribute("class", "font_white");
            tDiv.appendChild(tDiv2);
            myElem.parentNode.appendChild(tDiv);
		}
	} else if (myLocation.indexOf("/shipyard_overview.php") != -1 || myLocation.indexOf("/resource_overview.php") != -1 || myLocation.indexOf("/communication_overview.php") != -1 || myLocation.indexOf("/defense_overview.php") != -1 || myLocation.indexOf("/government_overview.php") != -1 || myLocation.indexOf("/university_overview.php") != -1 || myLocation.indexOf("/tradepost_overview.php") != -1 || myLocation.indexOf("/bunker_overview.php") != -1 || myLocation.indexOf("/control_overview.php") != -1 || myLocation.indexOf("/spacedock_overview.php") != -1 || myLocation.indexOf("/building_build_overview.php") != -1) {
		tDiv = parent.document.getElementById("eu2bSubPlanetTitle");
		if ( tDiv == null ) {
			tDiv = document.createElement("div");
			tDiv.setAttribute("id","eu2bSubPlanetTitle");
			tDiv.setAttribute("style", "position: absolute; background:black; top: 0px; left: 30px; z-index:9999;color:white;font-size:10px;text-align:center;padding-top:0px;padding-bottom:0px;padding-left:3px;padding-right:3px;border-width:1px;border-color:grey;border-style:solid");
			tDiv.appendChild(document.createTextNode(getVal("activePlanet","")));
			parent.document.body.appendChild(tDiv);
		} else bLog ("eu2bSubPlanetTitle exists!");
	} else if ( myLocation.indexOf('battle_report_info.php?area=interactive') != -1 ) {
		myP.eu2bActiveBAID = parseInt(location.search.split("battle_report_id=")[1]);
		tDiv2 = document.getElementById("layer_site_content");
		tDiv = document.createElement("div");
		tDiv.setAttribute("id","eu2bBAButton");
		tDiv.setAttribute("style", "background:#000088; width:200; z-index:auto;color:white;font-size:10px;text-align:center;vertical-align:middle;padding:0px;cursor:pointer;border-style:solid;border-width:1px;border-color:grey;");
		tDiv.setAttribute("onMouseOver", "this.style.borderColor='#cccccc';");
		tDiv.setAttribute("onMouseOut", "this.style.borderColor='grey'; this.style.backgroundColor='#000088';");
		tDiv.setAttribute("onMouseDown", "this.style.borderColor='#555555';this.style.backgroundColor='#007777';");
		tDiv.setAttribute("onMouseUp", "this.style.borderColor='grey';this.style.backgroundColor='#007700';");
		tDiv.addEventListener("click", showBA, false);
		tDiv.appendChild(document.createTextNode("Add/Show battle #"+myP.eu2bActiveBAID+" in Analyzer"));
		tDiv2.insertBefore(tDiv,tDiv2.firstChild);
	} else if ( (myLocation.indexOf('battle_report_info.php?area=information') != -1) || (myLocation.indexOf('battle_report_info.php?battle_report_id') != -1) ) {
		var tMom = document.body.getElementsByClassName("font_white")[2].firstChild.firstChild;
		var tSplit = tMom.innerHTML.split("</tr>");
		var tHTML = tSplit[0] + '</tr><tr class="font_white"><td><img src="http://static.empireuniverse2.de/default/en/empty.gif" height="1" width="20"></td><td>Battle ID</td><td><img src="http://static.empireuniverse2.de/default/en/empty.gif" height="1" width="20"></td><td>'+(parseInt(location.search.split("battle_report_id=")[1]))+'</td></tr>';
		for ( var i = 1 ; i < (tSplit.length-1) ; ++i ) tHTML += tSplit[i] + "</tr>";
		tMom.innerHTML = "" + tHTML;
	}
	bLog("Killing rest of script cause wrong parent.");
	updateLoadTime();
	return;
} else {
	if ( (myLocation.indexOf('/battle_report_overview.php') > -1) && (myLocation.indexOf('ground') < 0 ) ) {
		var battleI = document.body.getElementsByClassName("table_entry");
		for ( var i = 0 ; i < battleI.length ; ++i ) {
			battleI[i].parentNode.getElementsByClassName("table_entry_onclick")[2].innerHTML += "&nbsp;&nbsp;&nbsp;( " + battleI[i].firstChild.id.split("_")[1] + " )";
		}
		updateLoadTime();
		return;
	}
}
// ***** END ***** LOCATION SPECIFIC CODE BLOCK 1 ***** //
// ** End Kill Script
// ***** BEGIN ***** GLOBAL CODE BLOCK 2 ****//
loadData();
// ***** END ***** GLOBAL CODE BLOCK 2 ****//

// ***** BEGIN ***** LOCATION SPECIFIC CODE BLOCK 2 ***** //
if (myLocation.indexOf('/galaxy_overview.php') != -1 ) {
	loadSS(unsafeWindow.starsystem_id,unsafeWindow.orb);
	saveData(0,myP.myTotals,myP.myOrbs);
	updateMain();
	updateRoids(myP,myP.myTotals);
	updateWreckages(myP,myP.myTotals);
	updateWormholes(myP,myP.myTotals);

//	updateRoids(parent,orbTotals);
//	updateWreckages(parent,orbTotals);
//	updateWormholes(parent,orbTotals);
	var uo = unsafeWindow.orb;
	var tn, ts, j = 0, k = 0;
	for ( var i = 0 ; i < uo.length ; ++i ) {
		tn = uo[i].split(',');
		ts = false;
		if ( tn[6] == myLangArray[0][2] ) {
			ts = true;
			tn[6] = myLangArray[5][10] + " # " + (++j);
		} else if ( tn[6] == myLangArray[0][3] ) {
			ts = true;
			tn[6] = myLangArray[5][11] + " # " + (++k);
		}
		if ( ts ) uo[i] = tn.join(',');
	}
} else if ( myLocation.indexOf('building_overview') != -1 && activePlanet != null && activePlanet != "") {
	document.body.innerHTML += "<div style='position:absolute;top:20px;left:300px;font-weight:bold;font-size:26;color:rgb(0,200,0);background:black;border-style:solid;border-width:1px;border-color:grey;padding-left:8px;padding-right:8px;padding-top:5px;padding-bottom:5px'>" + activePlanet + "</div>";
} else if ( myLocation.indexOf('fleet_overview') != -1 && activePlanet != null && activePlanet != "" ) {
	var i,y;
	tDiv = document.body.getElementsByClassName("tab_active");
	if ( tDiv != null ) for ( i = 0 ; i < tDiv.length ; ++i ) if ( tDiv[i].innerHTML == myLangArray[0][0] ) tDiv[i].innerHTML = myLangArray[5][0] + " " + activePlanet;
	tDiv = document.body.getElementsByClassName("tab_inactive");
	if ( tDiv != null ) for ( i = 0 ; i < tDiv.length ; ++i ) if ( tDiv[i].innerHTML == myLangArray[0][0] ) tDiv[i].innerHTML = myLangArray[5][0] + " " + activePlanet;
	var myFleets = myP.myF;
	for ( var ss in myFleets ) {
		tDiv = myP.document.getElementsByClassName(ss.slice(1));
		for ( y = 0 ; y < tDiv.length ; ++y ) tDiv[y].style.color = "white";

		for ( var xx in myFleets[ss] ) {
			for ( var yy in myFleets[ss][xx] ) {
				for ( var zz in myFleets[ss][xx][yy] ) {
					tDiv = myP.document.getElementsByClassName(myFleets[ss][xx][yy][zz].myCoords);
					for ( y = 0 ; y < tDiv.length ; ++y ) tDiv[y].style.color = "white";
				}
			}
		}
	}
	var cc;

	tDiv = document.body.getElementsByClassName("table_entry_onclick");
	myFleets = new Object();
	for ( i = 0 ; i < tDiv.length ; ++i ) {
		cc = tDiv[i].innerHTML.split("-");
		if ( cc.length == 4 ) {
			var myColor = "white";
			if ( cc[0].length > 5 ) {
				cc[0] = cc[0].slice(-4);
				cc[3] = cc[3].split("<")[0];
				myColor = "yellow";
				tDiv2 = myP.document.getElementsByClassName(cc[0]);
				for ( y = 0 ; y < tDiv2.length ; ++y ) tDiv2[y].style.color = myColor;
				cc = cc.join(":");
				tDiv2 = myP.document.getElementsByClassName(cc);
				for ( y = 0 ; y < tDiv2.length ; ++y ) tDiv2[y].style.color = myColor;
			} else {
				myColor = "rgb(50,255,50)";//light-green
				tDiv2 = myP.document.getElementsByClassName(cc[0]);
				for ( y = 0 ; y < tDiv2.length ; ++y ) tDiv2[y].style.color = myColor;
				cc = cc.join(":");
				tDiv2 = myP.document.getElementsByClassName(cc);
				for ( y = 0 ; y < tDiv2.length ; ++y ) tDiv2[y].style.color = myColor;
			}
			var cc2 = cc.split(":");
			var iSS = "s" + cc2[0];
			var iX = "x" + cc2[1];
			var iY = "y" + cc2[2];
			var iZ = "z" + cc2[3];
			if ( typeof(myFleets[iSS]) == "undefined") myFleets[iSS] = new Object();
			if ( typeof(myFleets[iSS][iX]) == "undefined") myFleets[iSS][iX] = new Object();
			if ( typeof(myFleets[iSS][iX][iY]) == "undefined") myFleets[iSS][iX][iY] = new Object();
			myFleets[iSS][iX][iY][iZ] = new Object();
			myFleets[iSS][iX][iY][iZ].myColor = myColor;
			myFleets[iSS][iX][iY][iZ].myCoords = cc;
		}
		if ( tDiv[i].width == 30 ) {
			tDiv2 = tDiv[i].getElementsByTagName("img")[0].src;
			if ( (tDiv2.indexOf("wreckage") != -1) || (tDiv2.indexOf("asteroid") != -1)){
				if ( i > 1 && tDiv[i-2].innerHTML.indexOf('id="fleet_') == -1 && tDiv[i-2].innerHTML.indexOf(myLangArray[0][7]) == -1 ) {
					var sUrl = "/fleet/fleet_collect.php?fleet_id="+parseInt(tDiv[i-2].getAttribute("onclick").split("fleet_id=")[1]);
					tDiv[i-2].setAttribute("onclick", "");
					tDiv[i-2].innerHTML += '<div id="eu2bFOQuickCollect_'+i+'" style="float:right;background:#000088; color:white;font-size:10px;text-align:center;vertical-align:middle;padding:0px 3px 0px 3px;cursor:pointer;border-style:solid;border-width:1px;border-color:grey;" onmouseover="this.style.borderColor=\'#cccccc\';this.setAttribute(\'oldColor\',this.style.backgroundColor);" onmouseout="this.style.borderColor=\'grey\';this.style.backgroundColor=this.getAttribute(\'oldColor\');" onmousedown="this.style.borderColor=\'#555555\';this.style.backgroundColor=\'#007777\';" onmouseup="this.style.borderColor=\'grey\';this.style.backgroundColor=\'#007700\';">Collect</div>';
					tDiv2 = document.getElementById("eu2bFOQuickCollect_"+i);
					tDiv2.setAttribute("sUrl", sUrl);
					tDiv2.setAttribute("sCoords", tDiv[i+1].innerHTML.replace(/-/g,":"));
					tDiv2.addEventListener("click", doQuickCollect, true)
				}
			}
		}
	}

	myP.myF = myFleets;
} 
// ***** END ***** LOCATION SPECIFIC CODE BLOCK 2 ***** //
// ***** BEGIN **** GLOBAL CODE BLOCK 3 ***** //
drawEU2();

updateLoadTime();
// ***** END ***** GLOBAL CODE BLOCK 3 ****//
// ***** END ***** EU2 BEYOND ***** //