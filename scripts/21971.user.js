// ==UserScript==
// @name           Little Buddy
// @namespace      http://eveningnewbs.googlepages.com
// @description    A little buddy...for you to flatten.
// @include        *
// ==/UserScript==

// Begin Script Update Checker code
var version_scriptURL = "http://userscripts.org/scripts/source/21971.user.js"; // Change this URL to point to a permanent copy of your own script.
var version_timestamp = 1201742166843; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
if(parseInt(GM_getValue("lastUpdate","0"))+86400000<=(new Date().getTime())){GM_xmlhttpRequest({method:"GET",url:version_scriptURL+"?"+new Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(xhrResponse){GM_setValue("lastUpdate",new Date().getTime()+"");if(parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(xhrResponse.responseText)[1])>version_timestamp){if(confirm("There is an update available for the Greasemonkey script \""+xhrResponse.responseText.split("@name")[1].split("\n")[0].replace(/^\s+|\s+$/g,"")+".\"\nWould you like to go to the install page now?")){GM_openInTab(version_scriptURL);}}}});}
// End Script Update Checker code

alive = true;
wings = 0;
direction = 0;
repeats = 0;
clipWidth = 21;
clipHeight = 21;

flies = "data:image/gif;base64,R0lGODlhVAAqAKIEAAD/gICAgAAAAP///////wAAAAAAAAAAACH5BAEAAAQALAAAAABUACoAAAP/SLrc/jDKSSsR4maKc9cb54QNqZiTAAAqmw6wEMwCPKAQiS+6xa+t3ckWC9SIqE7vImLyPrwSxogpMY5IYqyEVJ6aSuzt+pyZq9+r9rbWrW3eVOe9fdZkZuMNrc6Kxzx0WkIXgkgjMUp1D2J3h32GYVeKhoCQjouIcGxwmnR4QSdANJFSWJh7S42cdRsyR2EdNECiLDSxsEZRq41OX7yHIaB/RbeTZ29Tuk7Anb4gm6d8F3qpYbMuF6NUsUUmzZlcMaw4xEjYrtvmzpBsvTmJc5aBlZJ2GJXzf6jh0HjIUIbkI7RuULtxBsmc+GcsTaFPASNQSnaQFbtnILhZERgP/w2hNGEe0YNT7eIIILQkRnQFZtK0kf9OpUCZzceSHAorfNj5MoeHjyOCMhLqo6jRo0iTKrW51KHOn3JcxYm40CPRjQrj5KApRFoeKhcbecg5dNc7RlzhdTmzj2MXlimqUsQoi6qrNsgSFkzFAZ8gYWXy8BGGl5TegRwQ27nx9c40c6/mPiwlUfGliUnwEtOx115VvxA9MT7LZHPJTh64JUNXC1SyKW7Otd016PQYV4JxsdZmi9u1M09q7+MsfJCwr8hjcj6DvPGv4sEORhZJjW2s3UFuXQfuQXObZ41Of1NdOBRv121gjyS52VPIfqBfr5z4ej17yf4a8634vXI9+1OMGSaSMAxREYVbnyT232QkCejMN7C9dNdfPY0QX3/DsZXQSSykJBocVsUFTX+TKaNhPz90WJNoVdxU1i+kgfCZVB+1WCMUSeC0kVZN9XjgUjskAAA7";
splat = "data:image/gif;base64,R0lGODlhFQAVAJECAAAAAAD/gP///wAAACH5BAEAAAIALAAAAAAVABUAAAJMlI+pe+CMngGhAihouLluqFmdyITfyJXeR6VgqLmYeWaS3ayW413xpAuyejRibyQ82lKxpCzi2/0wHSZJVYNhSaYn0qVdOJ5jqvlQAAA7";

function moveFly()
{
	maxTop = document.body.clientHeight - 23;
	maxLeft = document.body.clientWidth - 24;
	if (!alive)
		{return;}
	if (repeats <= 0)
		{repeats = 180;}
	if (wings == 0) {wings = 1;}
	else {wings = 0;}
	newDir = Math.floor(Math.random() * 20);
	if (newDir < 4)
		{direction = newDir;}
	switch (direction)
	{
		case 0: // move up
			fly.style.top = ((parseInt(fly.style.top) < 4)?0:parseInt(fly.style.top)-4) + "px"; break;
		case 3: // move down
			fly.style.top = ((parseInt(fly.style.top)+4 > maxTop)?maxTop:parseInt(fly.style.top)+4) + "px"; break;
		case 2: // move right
			fly.style.left = ((parseInt(fly.style.left)+4 > maxLeft)?maxLeft:parseInt(fly.style.left)+4) + "px"; break;
		case 1: // move left
			fly.style.left = ((parseInt(fly.style.left) < 4)?0:parseInt(fly.style.left)-4) + "px"; break;
	}
	fly.style.backgroundPosition = (direction*clipWidth) + "px " + (wings*clipHeight) + "px";

	repeats--;
	if (repeats <= 0)
	{
		clearTimeout(theTimer);
		fly.style.backgroundPosition = (direction*clipWidth) + "px " + (wings*clipHeight) + "px";
		wings = 0;
		return;
	}
	else
		{theTimer = setTimeout(moveFly, 30);}
}

function killFly()
{
	if (alive)
	{
		alive = false;
		fly.style.background = "url(" + splat + ")";
		fly.style.backgroundPosition = "0px 0px";
	}
}

function initialize()
{
	fly = document.createElement("div");
	fly.style.top = Math.floor(Math.random() * document.body.clientHeight - 23) + "px";
	fly.style.left = Math.floor(Math.random() * document.body.clientWidth - 24) + "px";
	fly.style.position = "absolute";
	fly.style.zIndex = "99";
	fly.style.height = "21px";
	fly.style.width = "21px";
	fly.style.backgroundAttachment = "fixed";
	fly.style.background = "url(" + flies + ")";
	document.body.appendChild(fly);
	//'<div id="gmFlyDiv" style="position:absolute; top:50%; left:50%; z-index:99; height:21; width:21; background-attachment:fixed;"></div>';
	//fly = document.getElemtentById("gmFlyDiv");
	fly.addEventListener('mouseover', moveFly, true);
	fly.addEventListener('click', killFly, true);
}

window.addEventListener('load', initialize, false);
