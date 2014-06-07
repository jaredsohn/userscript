// ==UserScript==
// @name           Travian Date Fix
// @namespace      http://userscripts.org/scripts/show/69509
// @description    Replaces the word 'today' with today's UTC date 
// @version        1
// @date           2010-02-20
// @author         Inc
// @license        AGPL
// @include        *.travian.*
// @exclude http://forum.travian.com/
// @exclude http://*.travian.*/dorf1.php
// ==/UserScript==

(function(){
		var arrDateInstances = document.body.innerHTML.match(/today/ig);
	
	
var date = new Date();


var date=new Date();
var month=new Array(12);
month[0]="01";
month[1]="02";
month[2]="03";
month[3]="04";
month[4]="05";
month[5]="06";
month[6]="07";
month[7]="08";
month[8]="09";
month[9]="10";
month[10]="11";
month[11]="12";

var curDate = new Date();
var curYear = curDate.getUTCFullYear();
curYear = curYear.toString().slice(2);


var replaceDate = date.getUTCDate() + "." + month[date.getUTCMonth()] + "." + curYear
var myOldString = "today";
var myNewString = myOldString.replace("today", replaceDate);
	
	if (arrDateInstances != null)
	{
		if (arrDateInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/today/ig,myNewString);
		}	
	}
	
})();