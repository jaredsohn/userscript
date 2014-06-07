// ==UserScript==
// @name           bvs_mission
// @namespace      SirDuck36
// @description    helps missions
// @include        http://*animecubed.com/billy/bvs/missions*
// @include        http://*animecubed.com/billy/bvs/questattempt*
// ==/UserScript==

stoplist = [

    // General...
    "One of your Allies has potential to level here!",

    // D-rank
    "Clean the Ninja Dog Pen",
    "Ninja Academy Demonstration",

    // C-rank
    "Clear out the Forest of Death!",
    "Challenge a Dojo Master!",


    // B-rank
    "Tame a Scout Wolf!", // Rover's mom
    "Confess their Emo Love!",  // Pinky L2
    "Defend the WhiteEye Princess!", // Stalker L2
    "Defeat an Evil Pirate!",  // Billy L2

    "Chase down Timmy!"    // Mr. Smith

];

// My stuff (SirDuck36)

function KeyCheck(event)
{
   var KeyID = event.keyCode;

  

    for (var i=0;i<stoplist.length;i++)
	if (document.body.innerHTML.indexOf(stoplist[i]) >= 0)
	    return;

    if (KeyID == 69) // 'e' push
    {
	var obj = document.getElementById('jutsu374');
	obj.checked = true;
    }


   if (KeyID == 66)  // 'n' push
   {
       if (/Act in the Kage's Place/.exec(document.body.innerHTML))
       {
	   var obj = document.getElementById('jutsu484');
	   obj.checked = true;
       }

       unsafeWindow.document.attempt.submit();
   }


   if (KeyID == 77) // 'm'
   {
       unsafeWindow.document.domission.submit();
   }

   if (KeyID == 88) // 'b'  push
   {
       if (unsafeWindow.document.goquest)
       {
	   unsafeWindow.document.goquest.submit();
       }

       if (unsafeWindow.document.attack)
       {
	   unsafeWindow.document.attack.submit();
       }
   }


}

document.documentElement.addEventListener("keyup", KeyCheck, true);