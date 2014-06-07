// ==UserScript==
// @name          iCalendar for Deutsche Bahn Grosskundenportal
// @namespace     http://esquifit.myopenid.com/
// @description   Adds iCalendar buttons for downloading Hinfart and Rückfahrt calendar events
// @include       https://grosskunden.bahn.de/grosskunde/buchen/kasse.post;*
// ==/UserScript==

const UNST = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
const FONT = XPathResult.FIRST_ORDERED_NODE_TYPE;

const mainTab_xpath = '//table[contains(@class,"result")]/tbody';
const CRLF = "\n";

/* 
 The Calendar icon is taken from Mark James' "Silk Icons" free icons collection:
         http://www.famfamfam.com/ (c) by Mark James,  Creative Commons Attribution 2.5 
         License available under: http://creativecommons.org/licenses/by/2.5/
 Converted to data: pseudo-protocol with the aid of "The data URL Kitchen"
         available under http://software.hixie.ch/utilities/cgi/data/data
         (c) 2003-2006 by Ian Hickson 
*/
const CAL_ICON = "data:image/png;base64," + 
        "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0" + 
        "U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJlSURBVDjLpZNbaM9hGMc%2Fv8NsTqF2yMhZKI" + 
        "exmpFyRZIiblwouZDauLYoTVEryg2uXIoIOUU5zJkh4e9QDmtJbWxrbUzz%2F72%2F9%2Fm6%2BP3HLs" + 
        "lbT9%2F3ufm%2Bn%2Ff7Pm8gif9ZMcDxe717JLZ62UQzwxukZnhveBOptyHl8anwZk%2F3b5pZEwOYtG" + 
        "NDzejSfzm58dTH%2Bb8JvFkpwMizdSCBT8E8OJftkzy4BPIOnONHQzPO%2BeIhBoM5CCrLwNKslBZM8u" + 
        "DykCbwtgMAl%2Fo%2FGXhvBYMA2rtAlpGYZSR%2BUIGKCgCSggGSOHy1Q%2F0DTifufZUknbr%2FRZJ0" + 
        "%2BmHWn3mU9edbMu3qG9DmQ08lKSNw3jCJOIKzjzqJopBzLZ3EEVx40smDr%2Fu4e96QGUXPGpkzYQSJ" + 
        "ywjCwSsIiKOADUvKiUNYX1tOUQhra8oJg4hZ02cQhhGrqyuyp03tTwbOGzKIQ7j8rIsn3Qd4fEVIIn6%" + 
        "2BkzAMaH35Fn37wbZD68gnCUl%2BEbAkI3CpIYmiCNZUlwEwbfIUgiBg1cIyJqbzGFPiWbl8GXUb66mq" + 
        "nkrJ2IvUbq88GEI2dQBRGHDjZTcAbZ8%2BERDQnOvm%2BfszVM1egA89C8avwAeO2nlLAeqRxK7j79Tz" + 
        "Pa%2FmXJck6darTG8XdM3uhbry%2BpiGrou5I1pcP17h7wwk5k4aRUfPANMrhtP2pZ8J44bx7nMfff29" + 
        "vGl%2FSNP1LQA0XdtCa2cO4GdhkPRg78kPVYm3kS71uNTjU8N5I%2FUpxSWracndZOn8ZVx6dZRhQcz9" + 
        "F3cAjgR%2F%2B51rt1c2AXXAaOA7cLTlcHvDL6y6kIpO9lqsAAAAAElFTkSuQmCC";

var main_tab = document.evaluate(mainTab_xpath,document,null,FONT,null).singleNodeValue;
var tab = dom2e4x( main_tab );


var i = 1;
    // TODO: exception handling in access to e4x objects?
while (tab.TR[i]){  // while rows are available

    // event rows
    var event = i; 

    //  initialize event data
    var summary     = ''; 
    var location    = '';
    var description = '';
    var timestamp   = '';
    var uid         = '';
    var timestamp   = '';

    // START TIME
    // TODO: exception handling in access to e4x objects?
    var event_day, event_time, time_start, time_end;

    event_day  = tab.TR[i].TD[2].text()[0].toString().replace(/\D*(\d+)\.(\d+)\.(\d+).*/, "$3$2$1"); 
    event_time = tab.TR[i].TD[3].text()[0].toString().replace( /\D*(\d+):(\d+).*/, "$1$2"+"00");
    time_start = event_day + 'T' + event_time;
   
   // LOCATION
    // TODO: exception handling in access to e4x objects?
    location = tab.TR[i].TD[1].text()[0];

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

    // UID
    uid = 'iCal_DBahn-' + timestamp;

    // DESCRIPTION
    do{
        // TODO: exception handling in access to e4x objects?
        var desc = tab.TR[i].TD[4].text()[0] + "\\n" +                                     // Zug ID
                   tab.TR[i].TD[1].text()[0] + " "  + tab.TR[i].TD[3].text()[0]  + "\\n" + // München ab 06:00
                   tab.TR[i].TD[1].text()[1] + " "  + tab.TR[i].TD[3].text()[1]  + "\\n" + // Nürnberg an 07:24
                   tab.TR[i].TD[5].text()[0] + "\\n \\n";                                  // Reservierung ...
        description = description.concat(desc);

        i++;
    // TODO: exception handling in access to e4x objects?
    } while(tab.TR[i] && tab.TR[i].TD[0] == '');  // next row in same loop only if first cell is empty

    // END TIME
    // TODO: exception handling in access to e4x objects?
    event_day     = tab.TR[i-1].TD[2].text()[0].toString().replace(/\D*(\d+)\.(\d+)\.(\d+).*/, "$3$2$1"); 
    event_time_ab = tab.TR[i-1].TD[3].text()[0].toString().replace( /\D*(\d+):(\d+).*/, "$1$2"+"00");
    event_time_an = tab.TR[i-1].TD[3].text()[1].toString().replace( /\D*(\d+):(\d+).*/, "$1$2"+"00");
    // if the last traject goes through midnight, arrival date is one day greater
    if(event_time_an < event_time_ab) event_day = increment(event_day);  
    time_end   = event_day + 'T' + event_time_an;

    // SUMMARY
    // TODO: exception handling in access to e4x objects?
    summary = 'Reiseziel: ' + tab.TR[i-1].TD[1].text()[1];

    //  Create event url
    var cal_string = getCalendarString(time_start, time_end, summary, location, description, uid, timestamp);
    //  Create clickable calendar icon
    var cal_button = make_calendar( cal_string);

    target = main_tab.rows[event].cells[0];
    target.insertBefore(cal_button,target.firstChild);
} 


function getCalendarString(time_start, time_end, summary, location, description, uid, timestamp) {

  //GM_log( [time_start, time_end, summary, location, description, uid, timestamp].join("\n") );
  
  description = iCalcFold(description);

// build RFC 2445 conform calendar object
  var cal_string = [
    "BEGIN:VCALENDAR"
    ,       "VERSION:2.0"                         // required for reminder to work!
    ,       "METHOD:PUBLISH"                      // new appointment
    
    ,       "BEGIN:VEVENT"

                         // general data
    ,               "DTSTART:"     + time_start
    ,               "DTEND:"       + time_end
    ,               "SUMMARY:"     + summary
    ,               "LOCATION:"    + location
    ,               "DESCRIPTION:" + description
    ,               "UID:"         + uid          // mandatory
    ,               "SEQUENCE:0"                  // initial appointment
    ,               "DTSTAMP:"     + timestamp    // ex.: 20060707T143451Z  (this is mandatory)
                         
                         // reminder (one hour before start)
    ,               "BEGIN:VALARM"
    ,                    "TRIGGER:-PT60M"         // 60 min. before start
    ,                    "ACTION:DISPLAY"         // other values: "AUDIO","EMAIL","PROCEDURE"
    ,                    "DESCRIPTION:Hey!"       // ???
    ,               "END:VALARM"
    
    ,       "END:VEVENT"
    ,       
    "END:VCALENDAR"].join(CRLF);

  // generate URL pointing to the calendar object (MIME type is text/calendar; see RFC 2445)
  // Content-Type 'text/x-vCalendar;' is also used sometimes.
  return "data:text/calendar;charset=utf-8," + encodeURIComponent(cal_string);

}

function make_calendar( cal_url){
    var xmlParser       = new DOMParser;
    var icon_span       = <span xmlns="http://www.w3.org/1999/xhtml" />;
    icon_span.link      = <a style="text-decoration:none;" href={cal_url}>
                             <img src={CAL_ICON} title='Kalender hinzufügen'/>
                          </a>;
    var dom_tree_button = xmlParser.parseFromString(icon_span.toXMLString(),'text/xml');  // [object XMLDocument]
    return dom_tree_button.firstChild; // [object HTMLUnknownElement]
}

function iCalcFold(string) {
  // TODO: fold according to RFC 2445
//   Content lines are delimited by a line break,
//   which is a CRLF sequence (US-ASCII decimal 13, followed by US-ASCII decimal 10).
//
//   Lines of text SHOULD NOT be longer than 75 octets, excluding the line break.
//   Long content lines SHOULD be split into a multiple line
//   representations using a line "folding" technique. That is, a long
//   line can be split between any two characters by inserting a CRLF
//   immediately followed by a single linear white space character (i.e.,
//   SPACE, US-ASCII decimal 32 or HTAB, US-ASCII decimal 9).
//   Any sequence of CRLF followed immediately by a single linear white space character
//   is ignored (i.e., removed) when processing the content type.

  return string;
}


function dom2e4x( doc ){
  var serializer = new XMLSerializer();
  return new XML(serializer.serializeToString(doc));  // now things like doc.td[1].text() are possible :)
}

// increment a date in format YYYYMMDD on one day
function increment(date){
  var date_obj = new Date();
  // For the Date objet, first day of the month is 0.  Sigh...
  date_obj.setFullYear(date.substring(0,4), parseInt(date.substring(4,6)) - 1 , date.substring(6,8) );
  date_obj =  new Date (date_obj.getTime() + 86400000);
  var year  = date_obj.getFullYear(); 
  var month = date_obj.getMonth() + 1 ; if(month <10) month = '0' + month.toString();
  var day   = date_obj.getDate();       if(day<10)    day   = '0' + day.toString();
  return [ year, month, day ].join('');  
}

