// ==UserScript==
// @name           C&C: Tiberium Alliances Shortcuts
// @version        2.2.0
// @author         Gryphon - Based on MrHIDEn's code. Modified.
// @downloadURL    https://userscripts.org/scripts/source/160302.user.js
// @updateURL      https://userscripts.org/scripts/source/160302.meta.js
// @description    Hotkey script for inserting your player data into multiple areas and Login/Logout for up to 9 accounts.
// @grant          none
// @include        *tiberiumalliances.com*
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==

// Based on MrHIDEn's CnC: Tiberium Alliances Shortcuts. Original at http://userscripts.org/scripts/show/135806
// Script has been stripped down to Login, Logout and player info.

//Alt+1 - Login to accounts 1-9. (Alt+1, Alt+2, ... Alt+9)
//Alt+0 - Logout
//Alt+Y - Message/Forum Signature
//Alt+I - Insert to message/chat/post all your bases/cities info

var Logins = [ //"email","password" table
	   "email1", "password1",
	   "email2", "password2",
	   "email3", "password3",
	   "email4", "password4",
	   "email5", "password5",
	   "email6", "password6",
	   "email7", "password7",
	   "email8", "password8",
	   "email9", "password9"
	];
var lang = "en";

function Ini() {
	console.log("CnC: TA Shortcuts has been loaded.");
};

function Login(id) {
	if (Logins.length == 0) return;
	if ((id * 2) > Logins.length) return;
	if (window.location.pathname != ("/login/auth")) {
		window.location.assign("https://alliances.commandandconquer.com/" + lang + "/game/world");
		return;
	}
	var em = Logins[2 * id - 2];
	var pw = Logins[2 * id - 1];
	//localStorage.Logins = Logins;
	document.getElementById("username").value = em;
	document.getElementById("password").value = pw;
	var inputs = document.getElementsByTagName("INPUT");
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type != "submit") continue;
		inputs[i].click();
	}
};


function Key(e) {
	var s = String.fromCharCode(e.keyCode);
	// ALT+
	if (e.altKey && !e.altGraphKey && !e.ctrlKey && !e.shiftKey) {
		//console.log("Alt+"+s);	
		switch (s) {
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			Login(s);
			break;
		case "0":
		        window.location.assign("https://alliances.commandandconquer.com/logout");
		        break;
		case "Y":
        // Signature Line
        var inputField = document.querySelector('input:focus, textarea:focus');
        if (inputField != null) {
          var apc = ClientLib.Data.MainData.GetInstance().get_Cities();
          var Alliance = apc.get_CurrentOwnCity().get_AllianceName();
          var PlayerName = apc.get_CurrentOwnCity().get_PlayerName();
          var getRole = ClientLib.Data.MainData.GetInstance().get_Alliance().get_CurrentMemberRoleInfo().Name;
          if (getRole == "Leader") {
            var Role = "CiC";
          }	
          else if (getRole == "Second Commander") {
            var Role = "SiC";
          }
          else {
            var Role = getRole;
          }
          var txt = "[player]" + PlayerName + "[/player]" + "\r\n" + Role + "\r\n" + "[alliance]" + Alliance + "[/alliance]";
          inputField.value += txt; 	
        }
        break;	
		case "I":
        // player bases info to share with others
        var serverName = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
        var inputField = document.querySelector('input:focus, textarea:focus');
        if (inputField != null) {
          var apc = ClientLib.Data.MainData.GetInstance().get_Cities();//all player cities
          var PlayerName = apc.get_CurrentOwnCity().get_PlayerName();
		  var Alliance = apc.get_CurrentOwnCity().get_AllianceName();
          var txt = '[b]Player: ' + PlayerName + "[/b]" + "\r\n----------------------------------\r\n";
          var apcl = apc.get_AllCities().d;//all player cities list
          for (var key in apcl) {
            var c = apcl[key];
            try {
              var sd = c.get_SupportData();
              var sn = '--';
              var sl = '--';
              if(sd !== null) {
                sl = sd.get_Level().toString();
                sn = c.get_SupportWeapon().dn; 
              }
              txt += "Base \'" + c.get_Name() + "\' info:\r\n"; //m_Level
              txt += "Base       lvl: " + c.get_LvlBase().toFixed(2).toString() + "\r\n";
              txt += "Defense lvl: " + c.get_LvlDefense().toFixed(2).toString() + "\r\n";
              txt += "Offense  lvl: " + c.get_LvlOffense().toFixed(2).toString() + "\r\n";
              txt += "Support  lvl: " + sl + " - " + sn + "\r\n";
              txt += "Distance to center: " + Math.round(ClientLib.Base.Util.CalculateDistance(ClientLib.Data.MainData.GetInstance().get_Server().get_ContinentWidth() / 2, ClientLib.Data.MainData.GetInstance().get_Server().get_ContinentHeight() / 2, c.get_PosX(), c.get_PosY())) + "\r\n";
              txt += "[coords]" + c.get_PosX() + ":" + c.get_PosY() + "[/coords]\r\n";
			  link += "playername=" + PlayerName;
			  link += "&alliancename=" + Alliance;
            } catch (e) {
              console.warn("MHTools.Shortcuts.INFO exception: ", e); 
            }
            txt += "----------------------------------\r\n";
          }
          inputField.value += txt;
        }
		break;	
		default:
			// other letters
		}
	}
};

// Events
document.addEventListener("keyup", Key, false);
Ini();