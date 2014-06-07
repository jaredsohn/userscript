// ==UserScript==
// @name           bla bla
// @namespace      bla bla
// @description    bla bla
// @include        http://www.ghost-trappers.com/fb/*
// ==/UserScript==
/*********** bla bla ***********/


if (document.body.innerHTML.indexOf("<div class=\"dcReminder\">") != -1)
	{
		//"Countess Wilhelmina" = 1
		//"Selena Darkblade" = 2
		//"Nurse Chapham" = 3
		//"Lorelle TMF" = 4
		//"Midnight Rider" = 5
		//"Midnight Smash" = 6
		//"Ghost fox" = 7
		//"Ghost owl" = 8
		//"Ghost beaver" = 9 
		//"Ghost Badger" = 10 
		//"Balthasar the sorcerer" = 11 
		//"Mr. Arlington Steele" = 12
		//"Firefighter Nero Jones" = 13
		//"Gardener Rodrick Greenthumb" = 14
		//"Prodigy Eli McGrommit" = 15
		//"Beastmaster Esca" = 16
		//"Verdant Unicorn" = 18
		//"Starsworn Unicorn" = 19
		//replace # in the line below with the ID value of your daily click you want.
		document.location = "http://www.ghost-trappers.com/fb/dc.php?dc_id=18";
	}

	if (document.body.innerHTML.indexOf("Congratulations! Your reward has been added to your inventory!") != -1 && GM_getValue("GTSAH.AutoDC", false))
	{
		GM_setValue("GTSAH.AutoDC", false);
	}