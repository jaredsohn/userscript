// ==UserScript==
// @name           Colour code your recently snatched torrents at TVChaos
// @author	   	   d4005
// @namespace      http://userscripts.org/users/169438
// @description    On the Recently Snatched page (ONLY!!), it highlights the Ratio in Green if it's >= 1.00, or highlights the Seed Time in Green if you've seeded for >= X Days. If neither are true, it highlights both the Ratio and Seed Time in Red. It allows you to quickly see which torrents need to keep seeding. Don't ask me for an "invite", because (a) you mean "invitation" not "invite", and (2) I don't have any.
// @include        *tvchaosuk.com*
// @grant          none
// @version        1.00
// ==/UserScript==

(function(){

	var MinimumNumberOfDaysForSeeding = 1;	//This was 2 but was reduced to 1 on Oct 3rd 2013

											//Note, this applies to single episodes. Series torrents are 3 days !!!!!!!!

	function check() {
		var Red = "#FF4040";
		var Green = "#40FF40";

		//loop through the TDs on the page
		var TDs = document.getElementsByTagName("TD");
		for(var i=0;i<TDs.length;i++) {

			//check if this TD was already checked
			if(TDs[i].getAttribute("checkedAlready"))
				continue;

			//mark this TD as checked now
			TDs[i].setAttribute("checkedAlready","true");

			//check if this looks like the ratio float
			var origTDVal = TDs[i].textContent;
			var floatVal = parseFloat(origTDVal);
			var floatStr = floatVal.toString();	//convert the float back into a string so we can see if that's all the column had in it
			var floatStr0 = floatStr+"0";		//make one that needed one trailing zero adding
			var floatStr00 = floatStr+"00";		//make one that needed two trailing zeroes adding

			var zeroRatioFound = origTDVal==="---" || origTDVal==="Inf." || origTDVal==="0.00";
			if(zeroRatioFound)
				floatVal = 0;	//if we found ---, Inf. or 0.00 then they all mean ratio zero

			//if we found a zero ratio or the number parsed and converted back to string is all that was in the TD, then it's a float
			var floatFound = zeroRatioFound || origTDVal === floatStr || origTDVal === floatStr0 || origTDVal === floatStr00;

			//but to confirm it's the float we're looking for, the next field should be a time measurement that will include
			//either seconds, minutes, hours, days, or years (at least one of these). The plural s is dropped as is the first potentially
			//capitalised character.
			var nextField = TDs[i+1].textContent;
			var nextFieldIsTime = nextField.indexOf("econd")>-1 || nextField.indexOf("inute")>-1 || nextField.indexOf("our")>-1 || nextField.indexOf("ay")>-1 || nextField.indexOf("ear")>-1;

			//so if we found a float in this TD and a time measurement in the next, then we found ratio and seed time in the next TD
			if(floatFound && nextFieldIsTime) {
				TDs[i+1].setAttribute("checkedAlready","true");	//no point looking at this one next i in the loop
				if(floatVal >= 1.0)
					TDs[i].style.backgroundColor = Green;	//we're green due to ratio
				else {
					//The ratio is < 1, so check the days seeded
					var nextTDVal = TDs[i+1].textContent;	//get the text from the next TD

					//get the first three characters of the first text/word after the first space
					var firstText = nextTDVal.substring(nextTDVal.indexOf(" ")+1,nextTDVal.indexOf(" ")+4);

					//if it's indicating Years, Months, or Weeks (then we're good)
					//or if it's showing days, then parse the number before the space to see if it's > MinimumNumberOfDaysForSeeding
					if(firstText == "Yea" || firstText == "Mon" || firstText == "Wee" || (firstText == "Day" && parseInt(nextTDVal) >= MinimumNumberOfDaysForSeeding))
						TDs[i+1].style.backgroundColor = Green;	//we're green due to seeding time
					else {
						TDs[i].style.backgroundColor = Red;		//we're red due to ratio
						TDs[i+1].style.backgroundColor = Red;	//and seeding time
					}
				}
			}
		}
	}
	//need to use setinterval because page is dynamic via AJAX, need to keep rechecking
	setInterval(check,500);
})();
