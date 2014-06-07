// ==UserScript==
// @name           MP-Autoclicker
// @namespace      David
// @include        *marcophono.net*
// @description    Der MP-Autoclicker (Marcophono-Autoclicker) waehlt automatisch den richtigen Namen des "Opfers" aus und fuegt die Telefonnummer ein. Wenn die Leitungen belegt sind wird ein neuer Versuch gestartet ;)
// @version        0.98
// @author         David
// @homepage       http://userscripts.org/scripts/show/80959
// ==/UserScript==
if (typeof GM_getValue("Erstes_Mal") == "undefined")
{
  alert("Danke, dass du dich fuer den Marcophono-Autoclicker entschieden hast.\nFuege einfach den Namen des \"Opfers\" und seine Telefonnummer ein,\ndann geht es los.\nWenn du dreimal auf das s auf deiner Tastatur drueckst, gelangst du wieder auf die Startseite von Marcophono.\nViel Spass ;)");
  GM_setValue("Erstes_Mal", "erlebt");
}




if (document.URL.search(/nummer=(\d+)/) != -1)
{
  GM_setValue("nummer", RegExp.$1 + "");
}
else if (typeof GM_getValue("nummer") == "undefined")
{
  GM_setValue("nummer", "1");
}
if (document.URL.search(/name=(.*)/) != -1)
{
  GM_setValue("name", unescape(RegExp.$1) + "");
  window.location.href = window.location.href.replace(/\?name=(.*)/, '');
}
else if (typeof GM_getValue("name") == "undefined")
{
  GM_setValue("name", "Alexander");
}
if (document.URL.search(/name2=(.*)/) != -1)
{
  GM_setValue("name2", unescape(RegExp.$1) + "");
  window.location.href = window.location.href.replace(/\?name2=(.*)/, '');
}
else if (typeof GM_getValue("name2") == "undefined")
{
  GM_setValue("name2", "Aileen");
}
if (document.URL.search(/tele=(.*)/) != -1)
{
  GM_setValue("tele", unescape(RegExp.$1).replace(/\s/g, "") + "");
  window.location.href = window.location.href.replace(/\?tele=(.*)/, '');
}
else if (typeof GM_getValue("tele") == "undefined")
{
  GM_setValue("tele", "0");
}
var ausdruck = new RegExp("flatrate_" + GM_getValue("nummer") + "_a", "");
var ausdruck2 = new RegExp("game=" + GM_getValue("nummer"), "");
var ausdruck3 = /flatrate_(\d+)/;
var radio = "";
var name = "Name";
if(document.URL.search(/flatrate_4/) != -1)
{
 radio = "<br>\"Dein\" Name: <input id='namefeld2' type='text' value='" + GM_getValue("name2") + "'><input type='button' value='&Auml;ndern' onclick=\"window.location.href = window.location.href+'?name2='+document.getElementById('namefeld2').value;\">";
 name = "Name des \"Opfers\"";
}
for (var i = 0; i < document.getElementsByTagName("div").length; i++)
{
  if (document.getElementsByTagName("div")[i].innerHTML.search(/viel Spa/) != -1 || document.getElementsByTagName("div")[i].innerHTML == "")
  {
    var text = document.createElement("div");
    text.innerHTML = name+": <input id='namefeld' type='text' value='" + GM_getValue("name") + "'><input type='button' value='&Auml;ndern' onclick=\"window.location.href = window.location.href+'?name='+document.getElementById('namefeld').value;\">";
	text.innerHTML += radio;
    text.innerHTML += "<br>Telefonnummer: <input id='telefeld' type='text' value='" + GM_getValue("tele") + "'><input type='button' value='&Auml;ndern' onclick=\"window.location.href = window.location.href+'?tele='+document.getElementById('telefeld').value;\">";
    text.innerHTML += "<br><font size='1'><a href='http://david97.kilu.de/' target='_blank'>Meine Website (Neues Fenster)</a></font>";
    if (document.URL.search(/flatrate/) != -1) text.innerHTML += "<br><input type='button' value='Szenario wechseln & starten' onclick=\"window.location.href = window.location.href+'?nummer=" + ausdruck3.exec(window.location.href)[1] + "';\">";
    document.getElementsByTagName("div")[i].appendChild(text);
    break;
  }
}
var s = 0;
function pruef(eve)
{
  if (!eve) eve = window.event;
  if (eve.which == 83) s++;
  if(s >= 3) window.location.href = "http://www.marcophono.net/home.html";
}
window.addEventListener('keydown', pruef, true);








if (document.URL.search(ausdruck) != -1)
{
  for (var i = 0; i < document.getElementById("flatrate_namen_2").getElementsByTagName("option").length; i++)
  {
    if (document.getElementById("flatrate_namen_2").getElementsByTagName("option")[i].innerHTML == GM_getValue("name"))
    {
      document.getElementById("flatrate_namen_2").getElementsByTagName("option")[i].selected = true;
      break;
    }
  }
  if(document.URL.search(/flatrate_4/) != -1)
{
  for (var i = 0; i < document.getElementById("flatrate_namen_1").getElementsByTagName("option").length; i++)
  {
    if (document.getElementById("flatrate_namen_1").getElementsByTagName("option")[i].innerHTML == GM_getValue("name2"))
    {
      document.getElementById("flatrate_namen_1").getElementsByTagName("option")[i].selected = true;
      break;
    }
  }
  }
  document.getElementById("flatrate_input_nummer").value = GM_getValue("tele").replace(/\s/g, "");
  for (var i = 0; i < document.getElementsByTagName("input").length; i++)
  {
    if (document.getElementsByTagName("input")[i].value == "anrufen")
    {
      break;
    }
  }

  setTimeout("document.getElementsByTagName('input')[" + i + "].click();", 1000);
}
else if (document.URL.search(ausdruck2) != -1)
{
  if (document.body.innerHTML.search(/Leider sind im Moment alle/) != -1)
  {
    setTimeout("window.location.href = 'http://www.marcophono.net/flatrate_" + GM_getValue("nummer") + "_a.html';", 1000);
  }
}