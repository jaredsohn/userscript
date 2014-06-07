// ==UserScript==
// @name           Mouse Hunt auto horn
// @namespace      MouseHunt
// @description    Automatically sounds the horn every 15 minutes
// @include        *apps.facebook.com/mousehunt*
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
      document.location = 'http://apps.facebook.com/mousehunt/soundthehorn.php';
      //alert('Let the hunt commence!'); 
    } , 
    900135 + Math.floor(Math.random() * 50838)
  );
}  