// ==UserScript==
// @name           Starfleet Commander Attack Alarm
// @namespace      http://www.playstarfleet.com
// @include        http://*playstarfleet*/fleet*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var MyEmail        = "delete this"; //set your email here.
var EmailURL       = "delete this"; //the lovely php server to do the magic.
var sAirRaidSiren  = "http://www.ilovewavs.com/Effects/War/Sound%20Effect%20-%20Air%20Raid%20Siren%2002.wav"; //the even more lovely alarm noise.
TTAtotal = 0;
TTAminute = 0;
TTAmessage = "";
attack_detected = 0;
EmailWindowTimeout = 600000;

function oaPlaySound() {
  var emb = document.getElementById("oaSound");
  if ( emb != null ) document.removeChild(emb);
  emb = document.createElement("embed");
  emb.src = sAirRaidSiren;
  emb.setAttribute("id", "oaSound");
  emb.setAttribute("autostart", "true");
  emb.setAttribute("loop", "true");
  emb.setAttribute("hidden", "true");
  emb.setAttribute("volume", 100);	
  document.body.appendChild(emb);
}

function oaSendMail(from,subject,content) {
  if ( EmailURL == "delete this" )
  {
    GM_log("You need to set the EmailURL at the top of the code. To use the Incoming Attack Email Alarm.");
    return;
  }
	
  var tForm = document.createElement("FORM");
  tForm.setAttribute("action",EmailURL); 
  tForm.setAttribute("method", "post");
  tForm.setAttribute("target","_self");
  tForm.setAttribute("type","hidden");
  var tElement1 = document.createElement("INPUT");
  tElement1.setAttribute("type","text");
  tElement1.setAttribute("name","name");
  tElement1.setAttribute("value",subject); 
  var tElement2 = document.createElement("INPUT");
  tElement2.setAttribute("type","text");
  tElement2.setAttribute("name","email");
  tElement2.setAttribute("value",from); 
  var tElement3 = document.createElement("INPUT"); // to Conform to the standard Forms2Email.php page
  tElement3.setAttribute("name","comments");
  tElement3.setAttribute("value", content);
  var tElement4 = document.createElement("INPUT");
  tElement4.setAttribute("type","submit");
  tElement4.setAttribute("value","send");
  tElement4.setAttribute("id","SendIt");
	
  tForm.appendChild(tElement1);
  tForm.appendChild(tElement2);
  tForm.appendChild(tElement3);
  tForm.appendChild(tElement4);
	
  if ( typeof (newWin) == "undefined" || newWin == null ) newWin = window.open("","EmailerWindow");  // Create a new window to put this form in and send off the email. Then trys to close the window after 15 seconds.
  newWin.document.body.appendChild(tForm);
  tElement4.click();
  setTimeout("newWin = window.open(\"\",\"EmailerWindow\"); if (newWin != null) newWin.close();", EmailWindowTimeout);
  bLog("Sent Email>from: " + from + ", subject: " + subject + ", content: " + content);
}

$('td.time tr.attack:eq(0)').each(function() {
  attack_detected = 1;
  TTA = $(this).find('.countdown').html();
  TTAslice1 = $(this).find('.countdown').html().slice(0,1);
  TTAslice2 = $(this).find('.countdown').html().slice(1,2);
  TTAslice3 = $(this).find('.countdown').html().slice(3,4);
  TTAslice4 = $(this).find('.countdown').html().slice(4,5);
  TTAslice5 = $(this).find('.countdown').html().slice(6,7);
  TTAslice6 = $(this).find('.countdown').html().slice(7,8);
  TTAtotal = TTAslice1+TTAslice2;
  TTAminute = TTAslice3+TTAslice4;
  TTAsecond = TTAslice5+TTAslice6;
  TTAorigin = $(this).parent().parent().parent().parent().find('.origin').find('a').html()
  TTAdestination = $(this).parent().parent().parent().parent().find('.destination').find('a').html()
  TTAmessage = "Incoming attack from " + TTAorigin + " on " + TTAdestination + ".";
});

if(attack_detected == 1 && TTAtotal == 0 && TTAminute <= 59) {
  oaPlaySound();
  TTAshow = TTAtotal + ":" + TTAminute + ":" + TTAsecond;
  oaSendMail("support@bluefroggaming.com",MyEmail,TTAmessage + " " + TTAshow + " till attack hits. Courtesy of BFG.");
}
//set your own timeout for page reloading - 900000 = 15 minutes
setTimeout("document.location.reload()",900000);