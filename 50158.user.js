// ==UserScript==
// @name           GeneraBIkariam
// @namespace      general.js
// @description    Skrypt dla GeneraBa
// @include        http://*.ikariam.*/index.php?view=embassyGeneralAttacksToAlly&*
// ==/UserScript==


var headings = document.evaluate("//tr[@class='rowRanks']", document, null, XPathResult.ANY_TYPE, null );

var thisHeading = headings.iterateNext();
var alertText = "<p style=\"color:red\">Aktualne ataki na członków sojuszu:</p><br/>";
var alertText2 = "";



while (thisHeading) {
  alertText += thisHeading.textContent + "<br/>";
  alertText2 += thisHeading.textContent;
  thisHeading = headings.iterateNext();
}

var alertSound     = "http://simplythebest.net/sounds/WAV/events_WAV/event_WAV_files/alarm_3.wav";
var warningSound   = "http://www.ilovewavs.com/Effects/Beeps/FlyinOff.wav";
var WARNING_VOLUME = 50   // "0" = silent "100" = full volume
var ALERT_VOLUME   = 100   // "0" = silent "100" = full volume

var clock= 3600000;


function playSound(sound, volume) {
  var body = document.getElementsByTagName("body")[0];
  var emb = document.createElement("embed");
  emb.src = sound;
  emb.setAttribute("autostart", "true");
  emb.setAttribute("loop", "false");
  emb.setAttribute("hidden", "true");
  emb.setAttribute("volume", volume);
  body.appendChild(emb);
}

function odswiezPo(sek) {
  setTimeout("window.location.reload()", sek*1000);
}

  setTimeout("window.location.reload()", 120*1000);


if (alertText2 == "Członkowie Twojego sojuszu są w tej chwili nieatakowani.") {
}else {
playSound(alertSound, ALERT_VOLUME);
//odswiezPo(60);
  var body = document.getElementById("mainview");
  var divek = document.createElement("div");
  divek.setAttribute("style", "text-align:center;margin-top:0;margin: 0 auto; width: 80%; height: auto; border: 1px solid black");
  divek.innerHTML=alertText;
  body.appendChild(divek);

};
