// ==UserScript==
// @name           MyFreeFarm - Autologin
// @namespace      glimmMyFreeFarm
// @author         glimm
// @description    Autologin in MyFreeFarm
// @version        0.2.1b
// @date           2010-03-19
// @include        http://www.myfreefarm.de/*start=1*
// @include        http://s*.myfreefarm.de/main.php
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////////////

// URL-Pruefung fuer Darstellungsunterscheidung
var url = document.URL.search(/http:\/\/s.+\.myfreefarm\.de\/main\.php/);

// Haupsielseite beim Einlogen neuladen
if(url != -1 && !GM_getValue("hauptspielseite"))
{
	GM_setValue("hauptspielseite", true);	
	location.reload();
}
else
	GM_setValue("hauptspielseite", false);
		
/*------- GM-Variablen einlesen --------*/
var server_conf = (GM_getValue("server")) ? GM_getValue("server") : "";
var nickname_conf = (GM_getValue("nickname")) ? GM_getValue("nickname") : "";
var passwort_conf = (GM_getValue("passwort")) ? GM_getValue("passwort") : "";
var autologin_conf = (GM_getValue("autologin")) ? GM_getValue("autologin") : false;
var autologinzeit_conf = (GM_getValue("autologinzeit")) ? GM_getValue("autologinzeit") : "10";
/*------- einlesen ENDE --------*/

/*------- GM-Menue Eintraege --------*/
GM_registerMenuCommand('Autologin Einstellungen', function (){document.getElementById("settings_box").style.display = "block";});
GM_registerMenuCommand('Autologin Ein-/Ausschalten', setAutoLogin);
/*------- GM-Menue ENDE --------*/

/*------- HTML-Knoten-Definition --------*/
// Einstellungsfenster oeffnen
settings_open_link = document.createElement("a");
settings_open_link.innerHTML = "Autologin";
settings_open_link.addEventListener("click", function (){document.getElementById("settings_box").style.display = "block";}, false);
settings_open_link.setAttribute("class", "loginlink");
settings_open_link.setAttribute("href", "#");
settings_open_link.setAttribute("style", "font-weight: bold; font-size: 15px; color:#FFB504; position: absolute;  top: 12px; left: 230px;");

// Einstellungsfenster
settings_box = document.createElement("div");
settings_box.setAttribute("id", "settings_box");
if(url != -1)
	settings_box.setAttribute("style", "background: url(http://www.myfreefarm.de/pics/back_textur.jpg); border: solid 2px; text-align: left; padding: 5px 5px 5px 10px;   width: 300px; height: 200px; display: none; background-color: #FFFFFF; position: absolute;  top: 150px; left: 200px; z-index: 33;");
else
	settings_box.setAttribute("style", "background: url(http://www.myfreefarm.de/pics/back_textur.jpg); border: solid 2px; text-align: left; padding: 5px 5px 5px 10px;   width: 300px; height: 200px; display: none; background-color: #FFFFFF; position: absolute;  top: 195px; left: 444px; z-index: 33;");
/*------- HTML-Knoten-Definition ENDE --------*/

/*------- HTML-Knoten einfuegen --------*/
// Einstellungsfenster
if(url != -1)
   document.getElementById("garten_komplett").appendChild(settings_box);
else
{
   document.getElementById("main_container").appendChild(settings_box);
   document.getElementsByTagName("form")[2].appendChild(settings_open_link);
}

// Einstellungsfenster mit Inhalt fuellen
document.getElementById("settings_box").innerHTML = "\n<div id=\"settings_close\" align=\"right\"><img src=\"http://dqt9wzym747n.cloudfront.net/pics/close.jpg\" height=\"15\" width=\"15\" id=\"settings_close_img\" alt=\"[x]\"></div>"
+"\n<h1 style=\"font-size: 18px; font-weight: bold; color: rgb(255, 181, 4); margin: 10px 0px 5px;\">Autologin Einstellungen:</h1>"
+"\n<div style=\"clear: both; height: 1px; width: 1px;\"></div>"
+"\n<div style=\"float: left; color: rgb(255, 181, 4); font-size: 11px; width: 100px; font-weight: bold; margin-top: 5px;\">Server:</div>"
+"\n<div style=\"float: left; color: rgb(255, 181, 4); font-size: 11px; width: 200px; font-weight: bold; margin-top: 5px;\" id=\"div_server\"><input maxlength=\"3\" size=\"3\" id=\"input_server\" type=\"text\" /></div>"
+"\n<div style=\"clear: both; height: 1px; width: 1px;\"></div>"
+"\n<div style=\"float: left; color: rgb(255, 181, 4); font-size: 11px; width: 100px; font-weight: bold; margin-top: 5px;\">Nickname:</div>"
+"\n<div style=\"float: left; color: rgb(255, 181, 4); font-size: 11px; width: 200px; font-weight: bold; margin-top: 5px;\" id=\"div_nick\"><input id=\"input_nick\" type=\"text\" /></div>"
+"\n<div style=\"clear: both; height: 1px; width: 1px;\"></div>"
+"\n<div style=\"float: left; color: rgb(255, 181, 4); font-size: 11px; width: 100px; font-weight: bold; margin-top: 5px;\">Passwort:</div>"
+"\n<div style=\"float: left; color: rgb(255, 181, 4); font-size: 11px; width: 200px; font-weight: bold; margin-top: 5px;\" id=\"div_passwort\"><input id=\"input_passwort\" type=\"password\" /></div>"
+"\n<div style=\"clear: both; height: 1px; width: 1px;\"></div>"
+"\n<div style=\"float: left; color: rgb(255, 181, 4); font-size: 11px; width: 100px; font-weight: bold; margin-top: 5px;\">Autologin:</div>"
+"\n<div style=\"float: left; color: rgb(255, 181, 4); font-size: 11px; width: 200px; font-weight: bold; margin-top: 5px;\" id=\"div_autologin\"><input id=\"input_autologin\" type=\"checkbox\" /></div>"
+"\n<div style=\"clear: both; height: 1px; width: 1px;\"></div>"
+"\n<div style=\"float: left; color: rgb(255, 181, 4); font-size: 11px; width: 100px; font-weight: bold; margin-top: 5px;\">Zeit bis Autologin:</div>"
+"\n<div style=\"float: left; color: rgb(255, 181, 4); font-size: 11px; width: 200px; font-weight: bold; margin-top: 5px;\" id=\"div_autologinzeit\"> <input style=\"background: none repeat scroll 0% 0% rgb(153, 153, 153); color: rgb(68, 68, 68);\" disabled=\"disabled\" maxlength=\"3\" size=\"3\" id=\"input_autologinzeit\" type=\"text\" /> Sek.</div>"
+"\n<div style=\"clear: both; height: 1px; width: 1px;\"></div>"
+"\n<div style=\"float: left; color: rgb(255, 181, 4); font-size: 11px; width: 200px; font-weight: bold; margin-top: 5px; margin-left: 100px;\" id=\"div_button\"><input value=\"Speichern\" id=\"button_save\" type=\"button\" /><input style=\"margin-left: 10px;\" value=\"Löschen\" id=\"button_reset\" type=\"button\" /></div>"
+"\n";
/*------- HTML-Knoten einfuegen ENDE --------*/

/*------- Evente setzen --------*/
document.getElementById("settings_close_img").addEventListener("click", function(){document.getElementById("settings_box").style.display = "none";}, false);
document.getElementById("input_autologin").addEventListener("click", function (){(document.getElementById("input_autologin").checked) ? checked(true) : checked(false);}, false);
document.getElementById("button_save").addEventListener("click", setLoginData, false);
document.getElementById("button_reset").addEventListener("click", clearLoginData, false);
/*------- Evente ENDE --------*/

/*------- Inhalt des Einstellungsfenster setzen --------*/
document.getElementById("input_server").value = server_conf;
document.getElementById("input_nick").value = nickname_conf;
document.getElementById("input_passwort").value = passwort_conf;
checked((autologin_conf) ? true : false);
document.getElementById("input_autologinzeit").value = autologinzeit_conf;
/*------- Inhalt des Einstellungsfenster ENDE --------*/

/*------- Inhalt des Loginformulars setzen --------*/
if(url == -1)
{
	for(var i=0; i<2; i++)
	{
		document.getElementsByName("server")[i].value = server_conf;
		document.getElementsByName("username")[i].value = nickname_conf;
		document.getElementsByName("password")[i].value = passwort_conf;
		(autologin_conf) ? window.setTimeout("document.forms["+(i+1)+"].submit()", autologinzeit_conf*1000) : "";
	}
}
/*------- Inhalt des Loginformulars ENDE --------*/

/*------- Funktionen --------*/
// Checkbox Autologin
function checked(auto)
{
   if(auto)
   {
      document.getElementById("input_autologin").checked = true;
      document.getElementById("input_autologinzeit").disabled = false;
      document.getElementById("input_autologinzeit").style.background = "#FFFFFF";
      document.getElementById("input_autologinzeit").style.color = "#000000";
   }
   else
   {
      document.getElementById("input_autologin").checked = false;
      document.getElementById("input_autologinzeit").disabled = true;
      document.getElementById("input_autologinzeit").style.background = "#999999";
      document.getElementById("input_autologinzeit").style.color = "#444444";
   }
}

// ueberprueft ob ein Wert von Typ Int ist bzw. ein String einen Int-Wert enthaelt
 function isInt(x)
{
   var y = parseInt(x);
   if (isNaN(y))
      return false;
   else
		return x == y && x.toString() == y.toString();
}

// Speichert Logindaten in GM-Variablen
function setLoginData()
{
   document.getElementById("input_server").value = (isInt(document.getElementById("input_server").value)) ? document.getElementById("input_server").value : "";
   if(document.getElementById("input_server").value && document.getElementById("input_nick").value)
   {
      GM_setValue("server", document.getElementById("input_server").value);
      GM_setValue("nickname", document.getElementById("input_nick").value);
      GM_setValue("passwort", document.getElementById("input_passwort").value);
      GM_setValue("autologin", (document.getElementById("input_autologin").checked) ? true : false);
      GM_setValue("autologinzeit", (isInt(document.getElementById("input_autologinzeit").value)) ? document.getElementById("input_autologinzeit").value : "10");
      location.reload();
   }
}

// Ein-/Ausschalten von Autologin ueber GM-Menue
function setAutoLogin()
{
   var text = (autologin_conf) ? "deaktivieren" : "aktivieren";

   var autologin_confirm = confirm("Autologin "+text+"?");
   
	if(autologin_conf && autologin_confirm)
		GM_setValue("autologin", false);

   if(!autologin_conf && autologin_confirm)
   	GM_setValue("autologin", true);

   location.reload();
}

// Loeschen Logindaten und GM-Variablen
function clearLoginData()
{
   document.getElementById("input_server").value = "";
   document.getElementById("input_nick").value = "";
   document.getElementById("input_passwort").value = "";
   checked(false);
   document.getElementById("input_autologinzeit").value = "10";
   
   GM_deleteValue("server");
   GM_deleteValue("nickname");
   GM_deleteValue("passwort");
   GM_deleteValue("autologin");
   GM_deleteValue("autologinzeit");
   GM_deleteValue("hauptspielseite");
}
/*------- Funktionen ENDE --------*/