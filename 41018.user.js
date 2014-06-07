// ==UserScript==
// @name           TUWIS-Prüfungen to ICS
// @namespace      https://tuwis.tuwien.ac.at
// @include        https://tuwis.tuwien.ac.at/*
// ==/UserScript==

// aktuelle VERSION: 1.4
//	* fixed small bug
// VERSION: 1.3
//  * include geändert.
// VERSION: 1.2
//  * mehrere kleine Bugs behoben
//  * Texte (Summary, Description, Location) werden in ein Format gebracht dass iCal richtig importiert (sollte RFC2445 entsprechen)
// VERSION: 1.1
//	* möglichst alle Links auf Hörsäle werden jetzt gefunden und umbenannt
//	* Wegweiser Links geändert
//
// large Parts of this script have been copied from http://userscripts.org/scripts/review/36975 (iCalendar for Deutsche Bahn Großkundenportal)

// Constants
const CRLF = "\n";
const CAL_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAANkE3LLaAgAABNFJREFUeJy9lk1oG0cUx38zu5ZTxU1rTOSGFOr0kPqgYlvIKjSBYKFACTi9xLkUUmhzKKXgSyG9lJCzS3rooQQa0kMvUcmxXxeLNrdcLMtR5UIgOpQSOXLzYVsfq92ZHla7XkkrR05pH4hZ/efj/ee9/7wZQaeJo0ePvnnu3Ln3AOmBWmuUUiil/IHef8uyzGazOWTZlv3grwc/ZDKZ3JUrV2wGNNENpNPpj97f2vl60AWU1rS0pq4VTxz1JDoz9WUsnf7iwoULO4PMl92A4zjmoM4BpBAMScmwlAzDS3/+Xvp0VIjvL1++HHkuAs9jEhhqE4k0GiPjx469czKR+O3atWtH/hcC7kKCiBAIpdG1upg5ceKtV0dHswsLC8ZzERibnAxt9+ozhMDQmq3HjxkbG+Pt06dPfriw8PPS0tLBfn562E1MTKRmWvaZerUKQHcbhtWrVfekANt2i6eRCGb0Bf6uVDh05Mjrh4aH3z1z9uyPt27detztr+cUnDp16pMPao2vxiYn2Vxfp7v1dtzdV11fx1KKqmVRru3wxLZBSoYjEcxDL9ZePn78m9dSqc8XFxefDkSgX8j6mcatFxqwtcZSioZSbDk2TUexZbf+KLwy/vHt27eXg/P2deT2MtEmIXC1EDUMDhoGY5EISmueOs4bvz56NA3sTcAwDOZ/+QkhBEopisUiyWSSWq3m7lRrSqUSyWSSnR231iilKJVKJBIJNjc3sW0brTX37t0jlUrx8OFDGo0G31282FMbQiMgpUQIgdYaIQRCCKSUHf8BvzUMAyEEhmFw4MABlOPgKMXQ0BCmaWKaJpFIBMMwmgMRCDr1vr2f1rpjTN85SiGli5mm68Y0zZ47IpRAsVjsiEChUKDVavkp6MXwMcuy/LRIaVAsFqnX6yilMAxDP5OAlJJkMukTyOfzTE9P+/1aa1ZXV5mamuqYl8/nfUxrjdaaQqFAPB73CYVZaAQcx0EIgeM4OI4DQKvV8sNv2zZCCJrNpo95cxqNhn99W5aFlJLt7W13nZC6uy8NeIctKMKgLujSi5QSBL6AZQiDUAKFQqEjbPl83o8E7Xx3YG0yq/k8tm13YGuFNVqt1v5SkEgk/J2trKwwMzOzu8s2IU8XHt6tFQ/zdLEvAkopvxAFc9wOgP/tFRytdY9WtNa+VizLwrZtDKP3Zu4h4DkPnnFg91jSWQO660Q37n2HOe8bgXw+7+42EN7dELoiXFlZ8bHguKAugnODKXwmgaAGwqwf3t2n0b5o90XArWKyRzjdi3Q4C/a1r2UPD1trTwJhGgDIZrOcP38egDt37nD37l1isRjRaJS5uTnK5TLLy8vEYjFmZ2c5fPhwz8U1EIH2DKQUBDd2//59pJSsra2Ry+W49NklCPTfvHmTubk5ZlMp/IntFNAnBaGPUiFF+6kUru5yuUw8HkcKiRC71XJ+fp5sNsu3N25Qr9ddXAqElAgZ/v4NJ0DvUQrayMgIGxsbXqD8cfF4nKtXr1Kr1cjlcrvkQ127NtCTrDuP6XSaSqXC9evXGR8fJxqNkk6nyeVy/ispHo/777R++Q+1TCazqP8jy2Qyi8+KgKhWqxtLS0uDM96HVSqVDXbfr67DrjESiAETwEE6NP6vTAA7QBnYAPyi8A/deOmSXjY8pwAAAABJRU5ErkJggg%3D%3D";

// Add jQuery script-element
GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	// Check if jQuery's loaded
    if(typeof unsafeWindow.jQuery == 'undefined') { 
		window.setTimeout(GM_wait,100);
	} else {
		$ = unsafeWindow.jQuery; letsGO();
	}
}

// wait for jQuery to load
GM_wait();

function letsGO() {
	// RegExp filter
	$.extend(
	    $.expr[':'], {
	        regex: function(a, i, m, r) {
	            var r = new RegExp(m[3], 'i');
	            return r.test($(a).text());
	        }
	    }
	);
	
	addWegweiserLinks();
}

function addWegweiserLinks() {
	
	// Auf einer Hörsaalseite tun wir nichts.
	if ( $("h2:regex('^TUWIS\\+\\+ Hörsaalbelegung')").length == 0 ) {
		
		// Suche nach Links die "tpp/lv/hs_html" enthalten außer wir sind auf einer Hörsaalseite
		location_links = $("a[ href *= 'lv/hs_html' ]");

		// wird benötigt, damit wir wissen wann alle Links ausgebessert wurden.
		var location_count = location_links.length;
		var location_loaded = 0;
		
		if (location_count == 0)
			insertCalendars();
		else {
		
			// Wegweiserlinks hinzufügen
			location_links.each(function() {
				var link = this;

				// URL in Wegweiser URL verwandeln und dann makeCalendar aufrufen
				link_url = $(link).attr("href");
				$(link).parent().load(link_url + " a:regex('^Lage$')", null, function() {
					$(this).prepend(" (>");
					$(this).prepend(link);
					$(this).find("a:eq(1)").text("Wegweiser");
					$(this).append(")");

					// Hochzählen
					location_loaded++;
					
					// Wenn alle Links geändert wurden "Make Calendar" aufrufen
					if (location_loaded == location_count) {
						insertCalendars();
					}
				});
			});
		}
	}
}

function insertCalendars() {

	// LVA-Titel + Nummer aus der Überschrift
	heading = $("body > h2:first b");
	if (heading.length == 0) {
		heading_text = " - ";
	} else {
		heading_text = heading.text();
	}
		
	lva = heading_text.split(' - ');
	lva_id = lva[0];
	lva_title = lva[1];

	// Suche auf Prüfungsseiten:
	// 		  <b>Termine:
	//		  -> 2 Elemente weiter (= ein <br/> überspringen)
	//		  ist das nächste Element ein Table, dann wird nach Zeilen (<tr>) gesucht die auch <td> enthalten (Table-Header mit <th> fällt somit weg)	
	exams_rows = $("b:regex('^Termine$')").next().next().filter('table').find("tr:has('td')");
	exams_rows.each (function() {
		row = this;
		// Zusammenfassung, URL
		event_summary = "Prüfung: " + lva_title;
	    event_description = $(row).find("td:eq(0)").text();
	
		location = $(row).find("td:eq(4)");
		location_link = $(row).find("td:eq(4) a:eq(0)");
		
		if (location_link.length == 0)
			event_location = location.text();
		else
			event_location = location_link.text();
			
		wegweiser_url = $(row).find("td:eq(4) a:eq(1)");
		if (wegweiser_url.length == 0)
			event_url = "";
		else
			event_url = wegweiser_url.attr("href");

		// Zeit
		time = $(row).find("td:eq(2)").text();
		day = $(row).find("td:eq(3)").text().replace(/\D*(\d+)\.(\d+)\.(\d+).*/, "$3$2$1");
		event_start_time = day + "T" + time.split(" bis ")[0].replace( /\D*(\d+):(\d+).*/, "$1$2"+"00");
		event_end_time = day + "T" + time.split(" bis ")[1].replace( /\D*(\d+):(\d+).*/, "$1$2"+"00");
		event_uid         = 'tu-exam-' + lva_id + '-' + day;

		// Kalender-URL erzeugen
	    cal_url = getCalendarString(event_start_time, event_end_time, event_summary, event_location, event_description, event_uid, event_url, makeTimeStamp());

		// Kalender einhängen
		$(row).append("<td class='boxed'>" + 
							"<a type='text/calendar' style='text-decoration:none;' href=" + cal_url + ">" +
	                    		"<img style='height: 1.7em; width:1.7em; border: none;' src=" + CAL_ICON + " title='iCal-Export'/>" +
	                    	"</a>" +
					 	"</td>");
	});
}
 
function getCalendarString(time_start, time_end, summary, location, description, uid, url, timestamp) {

  // build RFC 2445 conform calendar object
  cal_string = [
    "BEGIN:VCALENDAR"
    ,       "VERSION:2.0"                         // required for reminder to work!
    ,       "METHOD:PUBLISH"                      // new appointment
    ,       "BEGIN:VEVENT"

                    // data
    ,               "DTSTART:"     + time_start
    ,               "DTEND:"       + time_end
    ,               "SUMMARY:"     + iCalCompatibleText(summary)
    ,               "LOCATION:"    + iCalCompatibleText(location)
	,				"URL:"		   + url
    ,               "DESCRIPTION:" + iCalCompatibleText(description)
    ,               "UID:"         + uid          // mandatory, needed for updates of a calendar
    ,               "SEQUENCE:0"                  // initial appointment
    ,               "DTSTAMP:"     + timestamp    // time when cal object was created, ex.: 20060707T143451Z  (this is mandatory)

    ,       "END:VEVENT"
    ,       
    "END:VCALENDAR"].join(CRLF);


  // generate URL pointing to the calendar object (MIME type is text/calendar; see RFC 2445)
  // Content-Type 'text/x-vCalendar;' is also used sometimes.
  return "data:text/calendar;charset=utf-8," + encodeURIComponent(cal_string);
}

function iCalCompatibleText(string) {

  // Trimmen
  string = $.trim(string);

  // NewLines durch "-" ersetzen
  string = string.replace(CRLF, " - ");

  // doppelte Whitespaces ersetzen
  string = string.replace("  ", " ");

  // fold according to RFC 2445
  folded = "";
  while (checkLength(string) > 75) {
	char_count = 75;
	while ( checkLength( string.substring(0,char_count) ) > 75)
		char_count--;
	folded += string.substring(0, char_count) + CRLF + " ";
	string = string.substring(char_count,string.length);
  } 

  folded += string;

  return folded;
}

function checkLength(string) {
	var countMe = string;
	var escapedStr = encodeURI(countMe);
	if (escapedStr.indexOf("%") != -1) {
		var count = escapedStr.split("%").length - 1;
		if (count == 0) count++;  //perverse case; can't happen with real UTF-8
		var tmp = escapedStr.length - (count * 3);
		count = count + tmp;
	} else {
		count = escapedStr.length;
	}
   
	return count;
}

function makeTimeStamp() {
	// TIMESTAMP (UTC)
    var now   =  new Date();

    var year  =  now.getUTCFullYear();
    var month =  now.getUTCMonth();
    var day   =  now.getUTCDate();
    var hours =  now.getUTCHours();
    var mins  =  now.getUTCMinutes();
    var secs  =  now.getUTCSeconds();
    timestamp =  year + 
                (month < 10 ? '0' + month : month.toString() ) + 
                (day   < 10 ? '0' + day   : day.toString()   ) + 'T' +
                (hours < 10 ? '0' + hours : hours.toString() ) + 
                (mins  < 10 ? '0' + mins  : mins.toString()  ) + 
                (secs  < 10 ? '0' + secs  : secs.toString()  ) + 'Z';

	return timestamp;
}