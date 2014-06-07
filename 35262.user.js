// ==UserScript==
// @name            Pardus Coords Addon
// @namespace   pardus.at
// @author          Yog
// @version         0.5beta
// @description  Adds coordinates around the Pardus navigation grid. For better visual experience you can use UserStyle "Pardus Style Remake" at http://userstyles.org/styles/7154
// @include         http://*.pardus.at/main.php*
// ==/UserScript==

// --User Options---------------------------------------------------
// Use this section to turn on/off features created by the script.
// Just change from 'true' to 'false' to turn something off..

var HasPardusStyleRemakeInstalled = false; var UsingThisUserscriptOnly = true; //Best set true only one, not both. 
// --end User Options-----------------------------------------------

var SectorName = document.getElementsByTagName('span')[0].textContent;

var db = document.body.innerHTML;
var coordX = db.match(/\d+(?=,\d+\])/)[0];
var coordY = db.match(/\d+(?=\])/)[0];


var td = document.getElementsByTagName('td');
    for(var i = 0; i < td.length; i++)
    {
      if((td[i].getAttribute('style') == 'background-color: rgb(0, 0, 28);') || (td[i].getAttribute('style') == 'background-color:#00001C;'))
      {
		if(UsingThisUserscriptOnly) {
		  var divStarter = "<div class='coordsh1' name='allh1' style='width:64px; padding-bottom:13px; font-weight:bold; float:left; text-align:center;'>";
		  var divStarter2 = "<div class='coordsh2 mbfix' name='allh2' style='width:64px; font-weight:bold; float:left; text-align:center;'>";
		}
		if(HasPardusStyleRemakeInstalled) {
		  var divStarter = "<div class='coordsh1' name='allh1'>";
		  var divStarter2 = "<div class='coordsh2' name='allh2'>";
		}

		var coordXa = coordX-3 + "</div>";
		var coordXb = coordX-2 + "</div>";
		var coordXc = coordX-1 + "</div>";
		var coordXe = coordX-(-1) + "</div>";
		var coordXf = coordX-(-2) + "</div>";
		var coordXg = coordX-(-3) + "</div>";

		if(UsingThisUserscriptOnly) {
		  td[i-1].setAttribute("style", "background-image:none; vertical-align:bottom; text-align:right;");
		  td[i+2].setAttribute("style", "background-image:none; vertical-align:bottom; text-align:left;");
		  td[i+55].setAttribute("style", "background-image:none; vertical-align:top; text-align:right;");
		  td[i+57].setAttribute("style", "background-image:none; vertical-align:top; text-align:left;");
		}
		
		td[i].innerHTML = divStarter + coordXa + divStarter + coordXb + divStarter + coordXc + divStarter + coordX + "</div>" + divStarter + coordXe + divStarter + coordXf + divStarter + coordXg + td[i].innerHTML ;		
		td[i+56].innerHTML = td[i+56].innerHTML + divStarter2 + coordXa + divStarter2 + coordXb + divStarter2 + coordXc + divStarter2 + coordX + "</div>" + divStarter2 + coordXe + divStarter2 + coordXf + divStarter2 + coordXg ;
		
		if(UsingThisUserscriptOnly) {
		  td[i].setAttribute("style", "background-image:url(http://static.pardus.at/images/text2.png); background-position:bottom; background-repeat:repeat-x; vertical-align:top;");
		  td[i+56].setAttribute("style", "background-image:url(http://static.pardus.at/images/text7.png); background-position:top; background-repeat:repeat-x; vertical-align:top;");
		}
		td[i+1].parentNode.parentNode.parentNode.setAttribute("style", "display:none;");


		if(UsingThisUserscriptOnly) {
		  var divStarter = "<div class='coordsv1 mfix' name='allv1' style='width:18px; height:39px; padding-top:25px; padding-right:12px; font-weight:bold; text-align:right;'>";
		  var divStarter2 = "<div class='coordsv2 mfix' name='allv2' style='width:18px; height:39px; padding-top:25px; padding-left:12px; font-weight:bold; text-align:left;'>";
		}
		if(HasPardusStyleRemakeInstalled) {
		  var divStarter = "<div class='coordsv1' name='allv1'>";
		  var divStarter2 = "<div class='coordsv2' name='allv2'>";
		}

		var coordYa = coordY-3 + "</div>";
		var coordYb = coordY-2 + "</div>";
		var coordYc = coordY-1 + "</div>";
		var coordYe = coordY-(-1) + "</div>";
		var coordYf = coordY-(-2) + "</div>";
		var coordYg = coordY-(-3) + "</div>";
		td[i+3].innerHTML = td[i+3].innerHTML + "<div style='margin:-14px 0px 0px 0px;'>" + divStarter + coordYa + divStarter + coordYb + divStarter + coordYc + divStarter + coordY + "</div>" + divStarter + coordYe + divStarter + coordYf + divStarter + coordYg + "</div>";
		td[i+54].innerHTML = td[i+54].innerHTML + "<div style='margin:-14px 0px 0px 0px;'>" + divStarter2 + coordYa + divStarter2 + coordYb + divStarter2 + coordYc + divStarter2 + coordY + "</div>" + divStarter2 + coordYe + divStarter2 + coordYf + divStarter2 + coordYg + "</div>";
		
		if(UsingThisUserscriptOnly) {
		  td[i+3].setAttribute("style", "background-image:url(http://static.pardus.at/images/text4.png); background-position:right; background-repeat:repeat-y;");
		  td[i+54].setAttribute("style", "background-image:url(http://static.pardus.at/images/text5.png); background-position:left; background-repeat:repeat-y;");
		}
		break;
      }
    }
