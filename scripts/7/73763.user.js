// ==UserScript==
// @name         Freaking LONGTAIL auto horn
// @namespace     Pissed off betatester
// @description   sounds the horn every 2 minutes+a few seconds in longtail, should stop when there's a kings reward waiting
// @include        *apps.facebook.com/mh_longtail/turn.php*
// @include        *apps.facebook.com/mh_longtail*
// @exclude        *apps.facebook.com/mh_longtail/cheeseshoppe.php*
// @exclude        *apps.facebook.com/mh_longtail/inventory.php*
// @exclude        *apps.facebook.com/mh_longtail/travel.php*
// @exclude        *apps.facebook.com/mh_longtail/crafting.php*
// @exclude        *apps.facebook.com/mh_longtail/boards.php*
// @exclude 	   *apps.facebook.com/mh_longtail/shops.php*
// @exclude 	   *apps.facebook.com/mh_longtail/adversaries.php*
// @exclude 	   *apps.facebook.com/mh_longtail/adversaries.php*
// @exclude 	   *apps.facebook.com/mh_longtail/trapsmith.php*

// ==/UserScript==


if (document.title.match(/Claim a King's Reward!$/))
  {
  alert("Claim a King's Reward!");
  }
else
{
  //alert ("Page ok - no king's reward");
  setTimeout
  (
    function() 
    { 
      document.location = 'http://apps.facebook.com/mh_longtail/turn.php';
      //alert('Let the hunt commence!'); 
    } , 
    123000 + Math.floor(Math.random() * 5088)
  );
}  