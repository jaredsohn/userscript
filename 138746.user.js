// ==UserScript==
// @name        SPRMail
// @namespace   Personal
// @include     http://rdweb*report*
// @version     1.1
// ==/UserScript==

// This userecript customizes spr page
//*********************************************************************************************

//Expandable panels
var script = document.createElement('SCRIPT');
script.src = 'http://i4848/bin/utils.js';
script.type = 'text/javascript';
document.body.insertBefore(script, null);

//CSS
var link = document.createElement('LINK');
link.rel = 'stylesheet';
link.href = 'http://i4848/bin/main.css';
link.type = 'text/css';
document.body.insertBefore(link, null);
 
var tableSpan = document.getElementsByTagName("table")[16]; 

var OuterSpan = document.createElement("div");
var row = 	<table border="1" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td><table border="0" cellpadding="1" cellspacing="2" width="100%"><tbody><tr><b><font color="#000000" face="Helvetica,Arial,Sans-Serif" size="2"><a href="http://i4848/SPRXYZ/SPRXYZ.html" target="_blank">  Open Emails</a></font></b></tr>
									<tr><div class="panel"><h2><b><font color="#000000" face="Helvetica,Arial,Sans-Serif" size="2">Emails</font></b></h2><div style="" class="panelcontent" id="Email"><object type="text/html" data="http://i4848/SPRXYZ/SPRXYZ.html" width="100%" height="800"></object></div></div></tr></tbody></table></td></tr></tbody></table>;
			
//Extract spr number
var titles = document.getElementsByTagName("title");
var sprNo = titles[0].innerHTML;
sprNo = sprNo.replace("SPR", "");
sprNo = sprNo.replace("Details", "");
sprNo = sprNo.replace(/^\s+|\s+$/g, ""); //trim
var spr = sprNo.toString();
row = row.toString().replace(/XYZ/g, spr); //replace with spr no

//Append to spr page				
OuterSpan.innerHTML = row;
var table = document.getElementsByTagName("div")[0];
tableSpan.appendChild(OuterSpan);