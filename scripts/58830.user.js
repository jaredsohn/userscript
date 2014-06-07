// ==UserScript==
// @name           Création du Rendez vous
// @namespace      http://nantes.onvasortir.com
// @description Création de ical sur mon agenda (c) ovs Nantes 2009 0.3 alpha
// @include        http://*/vue_sortie_perso.php
// ==/UserScript==


// @include        *
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.pack.js"></script>
const mois = {
	"Jan" : 0,
	"Fev" : 1,
	"Mar" : 2,
	"Avr" : 3,
	"Mai" : 4,
	"Jui" : 5,
	"Jul" : 6,
	"Aou" : 7,
	"Sep" : 8,
	"Oct" : 9,
	"Nov" : 10,
	"Dec" : 11
};
function generate_xml_date(start_td)
{
var year = start_td.getUTCFullYear();
var month = start_td.getUTCMonth();
var day = start_td.getUTCDate();
var hours = start_td.getUTCHours();
var mins = start_td.getUTCMinutes();
var secs = start_td.getUTCSeconds();
return  year + ((month+1) < 10 ? '0' + (month+1) : (month+1).toString())
		+ (day < 10 ? '0' + day : day.toString()) + 'T'
		+ (hours < 10 ? '0' + hours : hours.toString())
		+ (mins < 10 ? '0' + mins : mins.toString())
		+ (secs < 10 ? '0' + secs : secs.toString()) + 'Z';
}



var summary = '';
var location = '';
var description = '';
var time_start = '';
var time_end = '';

var allLabelsTD = document.evaluate("//tr[@class='suisinscrit']", document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


for ( var i = 0; i < allLabelsTD.snapshotLength; i++) {
	var dataHTML;
	var thisLink = allLabelsTD.snapshotItem(i);
	var label = thisLink.innerHTML.toString();
//	GM_log(thisLink.firstChild.nextSibling.innerHTML);
	var date_french=thisLink.firstChild.nextSibling.getElementsByTagName("td");

			var sortie_jour=date_french[1].innerHTML.toString();
			var sortie_mois=mois[date_french[2].innerHTML.toString().replace("\.","")];
//			var sortie_mois=date_french[2].innerHTML.toString().replace("\.","");
			var sortie_heure=date_french[3].innerHTML.toString().split(':')[0];
			var sortie_minute=date_french[3].innerHTML.toString().split(':')[1];
//		}
	var sortie_titre=thisLink.childNodes[3].getElementsByTagName("a")[0].innerHTML.toString();


var start_td = new Date(2009,sortie_mois,sortie_jour, 
		sortie_heure, sortie_minute, 0);
if (start_td<new Date())
		start_td = new Date(2010,sortie_mois,sortie_jour, 
		sortie_heure, sortie_minute, 0);
var time_start=generate_xml_date(start_td);
start_td.setTime(start_td.getTime() + (1.5*60*60*1000))
var time_end=generate_xml_date(start_td);
var time_actuelle=generate_xml_date(new Date());
var summary="OVS - "+sortie_titre;
var uid="1234567";
var location="Ovs";
var description=sortie_titre;

var cal_string = [ 
"BEGIN:VCALENDAR",
"VERSION:2.0",
"METHOD:PUBLISH",
"BEGIN:VEVENT", 
"DTSTAMP:" + time_actuelle, 
"DTSTART:" + time_start,
"DTEND:" + time_end,
"SUMMARY:" + summary,
"LOCATION:" + location, 
"DESCRIPTION:" + description, 
"UID:" + uid, 
"SEQUENCE:0", 
//"DTSTAMP:" + timestamp, 
"END:VEVENT", 
"END:VCALENDAR" 
].join("\n");

var ical_li = document.createElement("li");
var ical_a = document.createElement("a");
var ical_text = document.createTextNode("iCal");
ical_a.href = "data:text/calendar;charset=utf-8,"
	+ encodeURIComponent(cal_string);
ical_a.appendChild(ical_text);
ical_li.appendChild(ical_a);

allLabelsTD.snapshotItem(i).appendChild(ical_li);
}

