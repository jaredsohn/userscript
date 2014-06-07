// ==UserScript==
// @name           Facebook - Mouse Hunt Auto-Hunt LOL
// @namespace      Facebook - Mouse Hunt Auto-Hunt LOL
// @description    Facebook - Mouse Hunt Auto-Hunt LOL
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// @include        *mousehuntgame.com*
// @include		   *facebook.com/common/error*
// ==/UserScript==
/*
var inputs = document.getElementsByTagName("input");
var DelayBeforeHORN = -1;
var pause = false;

if (inputs)
{
   //search the clue thru the mousehunt page to find a hidden
   //  countdown timer or king reward captcha.
   for(i = 0; i < inputs.length; i++)
   {
      if(inputs[i].id.indexOf("hornWaitValue") != -1)
      {
         //when the hidden timer is found, assign the value to a variable
         DelayBeforeHORN = parseInt(inputs[i].value) + Math.round(Math.random() * mhDelay_max) + mhDelay_min;
         break;
      }
   }
   
   for(i = 0; i < inputs.length; i++)
   {
      if(inputs[i].name.indexOf("puzzle") != -1)
      {
         //when the king reward is detected, pause the script
         //  to prevent detection by game server.
         pause = true;
         break;
      }
   }
}*/

if (document.body.textContent.indexOf('Claim Your Reward') > -1)
{
	var timeoutxxx = Math.floor(Math.random()*780+24) * 2000;

	setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/index.php'; } , 1000000 + timeoutxxx);
}
else {
	timeoutValueA = 5500 + Math.round(Math.random() * 43500);
	timeoutValueB = 7500 + Math.round(Math.random() * 64500);
	timeoutValueC = 900000 + Math.round(Math.random() * 120000)
	lolFailCats = Math.ceil(Math.random() * 22);
 	if (lolFailCats == 1) {
 		setTimeout(function(){document.location = 'http://apps.facebook.com/mousehunt/boards.php';}, timeoutValueB);
 	}
 	else if (lolFailCats == 2) {
		setTimeout(function(){document.location = 'http://apps.facebook.com/mousehunt/inventory.php?tab=2';}, timeoutValueA);
 	}
 	else if (lolFailCats == 3) {
 		setTimeout(function(){document.location = 'http://apps.facebook.com/mousehunt/inventory.php';}, timeoutValueB);
 	}
 	else if (lolFailCats == 4) {
		setTimeout(function(){document.location = 'http://apps.facebook.com/mousehunt/scoreboards.php';}, timeoutValueA);
 	}
 	else if (lolFailCats == 5) {
 		setTimeout(function(){document.location = 'http://apps.facebook.com/mousehunt/boards.php';}, timeoutValueB);
	}
	else {
 		setTimeout(function(){document.location = 'http://apps.facebook.com/mousehunt/soundthehorn.php';}, timeoutValueC);
 	}
}