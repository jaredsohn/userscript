// ==UserScript==

// @name           Auto My Village Changer

// @author         z4w3p (Malaysian)

// @description    Auto change village if user have more than one village and want using Farming Machine for Travian 3.5 to control farming in each village they have

// @namespace      myVC

// @include        http://*.travian.*/dorf1.php*

// @email          mr.z4w3p@gmail.com

// @version        0.09.11.20

// ==/UserScript==

var server = location.hostname;
var rootPath = "http://" + server + "/";
var currentVillage; // Will set currentVillage to null if no village ID was selected

// Please change this 2 variables v1 & v2
var v1 = ""; // Set first village ID
var v2 = ""; // Set second village ID
// **************************************

function checkCurrentVillageID(key, default_) // Get query string process
{
  if (default_==null) default_="";
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}


	currentVillage = checkCurrentVillageID('newdid');
			
	if (currentVillage == v1)
		{
			currentVillage = v2;
		}
	else if (currentVillage == v2)
		{
			currentVillage = v1;
		}
			
	if (currentVillage.length == 0)
		{
			currentVillage = v1;
		}
			
	setTimeout("window.location.replace('" + rootPath + "dorf1.php?newdid=" + currentVillage + "')",120000) // Will change to next village in 2 minutes