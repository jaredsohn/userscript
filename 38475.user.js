// ==UserScript==

// @name Facebook to Google Calendar

// @namespace http://userscripts.org/scripts/show/38475

// @description Add your facebook events to currently logged in Google Calendar.

// @include http*://*.facebook.com/event.php?eid=*

// @include http*://*.facebook.com/*#/event.php?eid=*

//

//Version 1.3.1

//Based on P. Organisciak's (discontinued) script at http://userscripts.org/scripts/show/8294

//

// ==/UserScript==

  var version_timestamp = 1236446871000;

  

  // List of all supported languages (defaults to en_GB). If your language is missing, let me know!

  var languages = {

  

    // English (UK)

    "Locale_en_GB": {

      

      // Named list of months

      "months": {

        "January": "01",

        "February": "02",

        "March": "03",

        "April": "04",

        "May": "05",

        "June": "06",

        "July": "07",

        "August": "08",

        "September": "09",

        "October": "10",

        "November": "11",

        "December": "12",

      },

      

      // Regexp to match against a date string, e.g. 25 December 2008

      "dateRegExp": "([0-9]+) ([A-Z][a-z]+) ([0-9]+)",

      

      "dateFields": [

        "day",

        "monthstr",

        "year"

      ],

      

      // Regexp to match against a time string, e.g. 13:00

      "timeRegExp": "([0-1][0-9]|2[0-3]):([0-5][0-9])",



      "timeFields": [

        "hours",

        "minutes"

      ],

      

      // The labels of all the fields

      "fields": {

        "host": "Host",

        "eventType": "Type",

        "network": "Network",

        "location": "Location",

        "town": "Town/City",

        "date": "Date",

        "startStr": "Start Time",

        "endStr": "End Time",

        "time": "Time"

      },

      

      // "Add to GCal" label

      "label": "Add to GCal"

    },

    

    // English (US)

    "Locale_en_US": {

      

      // Named list of months

      "months": {

        "January": "01",

        "February": "02",

        "March": "03",

        "April": "04",

        "May": "05",

        "June": "06",

        "July": "07",

        "August": "08",

        "September": "09",

        "October": "10",

        "November": "11",

        "December": "12",

      },

      

      // Regexp to match against a date string, e.g. December 25, 2008

      "dateRegExp": "([A-Z][a-z]+) ([0-9]+), ([0-9]+)",

      

      "dateFields": [

        "monthstr",

        "day",

        "year"

      ],

    

      // Regexp to match against a time string, e.g. 1:00pm

      "timeRegExp": "([1-9]|1[0-2]):([0-5][0-9])(am|pm)",

      

       "timeFields": [

        "hours",

        "minutes",

        "indicator"

      ],

      

      // the PM indicator

      "pm": "pm",

      

      // The labels of all the fields

      "fields": {

        "host": "Host",

        "eventType": "Type",

        "network": "Network",

        "location": "Location",

        "town": "City/Town",

        "date": "Date",

        "startStr": "Start Time",

        "endStr": "End Time",

        "time": "Time"

      },

      

      // "Add to GCal" label

      "label": "Add to GCal"

    },



    // Finnish (Suomi)

    "Locale_fi_FI": {

      

      // Named list of months

      "months": {

        "tammikuuta": "01",

        "helmikuuta": "02",

        "maaliskuuta": "03",

        "huhtikuuta": "04",

        "toukokuuta": "05",

        "kesäkuuta": "06",

        "heinäkuuta": "07",

        "elokuuta": "08",

        "syyskuuta": "09",

        "lokakuuta": "10",

        "marraskuuta": "11",

        "joulukuuta": "12",

      },

      

      // Regexp to match against a date string, e.g. 25 joulukuuta 2008

      "dateRegExp": "([0-9]+)\. ([a-z]+) ([0-9]+)",

      

      "dateFields": [

        "day",

        "monthstr",

        "year"

      ],

    

      // Regexp to match against a time string, e.g. 13:00

      "timeRegExp": "([0-9]|1[0-9]|2[0-3]):([0-5][0-9])",

      

      "timeFields": [

        "hours",

        "minutes"

      ],

      

      // The labels of all the fields

      "fields" : {

        "host" : "Järjestäjä",

        "eventType" : "Luokitus",

        "network" : "Verkosto",

        "location" : "Paikka",

        "town" : "Kaupunki/Kunta",

        "date" : "Päivämäärä",

        "startStr" : "Alkaa",

        "endStr" : "Loppuu",

        "time" : "Ajankohta"

      },

      

      // "Add to GCal" label

      "label" : "Lisää GCal"

    }

  }

  

  // Add jQuery  

  var GM_JQ = document.createElement('script');  

  GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js';  

  GM_JQ.type = 'text/javascript';  

  document.getElementsByTagName('head')[0].appendChild(GM_JQ);  

  

  // Check if jQuery's loaded

  function GM_wait() {

    if (typeof unsafeWindow.jQuery == 'undefined') {

      window.setTimeout(GM_wait,100);

    }

    else {

      $ = unsafeWindow.jQuery;

      letsJQuery();

    }

  }

  GM_wait();



  function letsJQuery() {

    

    // Auto-update Script, by Jarett (http://userscripts.org/users/38602)

    function updateCheck(forced) {

      if ((forced) || (parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {

        try {

          GM_xmlhttpRequest({

            method: "GET",

            url: "http://userscripts.org/scripts/review/38475" + "?" + new Date().getTime(),

            headers: {'Cache-Control': 'no-cache'},

            onload: function(xhrResponse) {

              GM_setValue("lastUpdate", new Date().getTime() + "");

              var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "");

              var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1];

              GM_setValue("targetScriptName", scriptName);

              if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {

                if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {

                  GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);

                }

              } else if (forced) {

                alert("No update is available for \"" + scriptName + ".\"");

              }

            }

          });

        } catch (err) {

          if (forced) {

            alert("An error occurred while checking for updates:\n" + err);

          }

        }

      }

    }

    

    GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);});

    updateCheck(false);



    // Get a named field from the Facebook event page

    function getFbEventField(name) {

      var rtn = "";

      $('td.label').filter(':contains(' + name + ':")').next().each(function(el) {

        rtn = $(this).text();

      });

      return rtn;

    }

  

    // Left pad a string

    function lpad(str, len, chr) {

      while(str.length < len) {

        str = chr + str;

      }

      return str;

    }

  

    // Work out the current language from the class name of the body element of the page

    var lang = "Locale_en_US";

    for (l in languages) {

      if ($("body." + l).length > 0)

        lang = l;

    }

  

    function parseDate(str, date) {

      date["day"] = str.match(dateRegExp)[dateFields.indexOf("day") + 1];

      date["month"] = months[str.match(dateRegExp)[dateFields.indexOf("monthstr") + 1]];

      date["year"] = str.match(dateRegExp)[dateFields.indexOf("year") + 1];

      return date;

    }

    

    function parseTime(str, date) {

      

      // If 12-hour clock add 12 to PM time

      if (timeFields.toString().indexOf("indicator") != -1 && str.indexOf(languages[lang]["pm"]) != -1) {

        date["hours"] = parseInt(str.match(timeRegExp)[timeFields.indexOf("hours") + 1]) + 12;

      } else {

        date["hours"] = str.match(timeRegExp)[timeFields.indexOf("hours") + 1];

      }

      date["minutes"] = str.match(timeRegExp)[timeFields.indexOf("minutes") + 1];

      return date;

    }

    

    // Date as yyyymmddThhmm00 format

    function dateToString(date) {

      return lpad(date["year"], 4, "20") + lpad(date["month"], 2, "0") + lpad(date["day"], 2, "0") 

          + "T" + lpad(date["hours"], 2, "0") + lpad(date["minutes"], 2, "0") + "00";

    }

    

    var fields = languages[lang]["fields"];

    var details = new Object();

    var timeRegExp = languages[lang]["timeRegExp"];

    var timeFields = languages[lang]["timeFields"];

    var dateRegExp = languages[lang]["dateRegExp"];

    var dateFields = languages[lang]["dateFields"];

    var months = languages[lang]["months"];

  

    // Get all the fields...

    details["name"] = $("div.event_profile_title > h3").text();

    details["tagline"] = $("div.event_profile_title").text().substr(details["name"].length);

    for (key in fields) {

      details[key] = getFbEventField(fields[key]);

    }

    

    details["description"] = "";

    details["description"] += window.location.href.toString() + "\n";

    if (details["tagline"] != null && details["tagline"] != "")

      details["description"] += details["tagline"] + "\n";

    details["description"] += details["eventType"] + "\n";

    details["description"] += details["network"] + "\n";

    if (details["town"] != null && details["town"] != "")

      details["location"] += ", " + details["town"];

    

    var startDate = new Object();

    var endDate = new Object();

    

    // Single day event

    if (details["startStr"] == "") {

    

      // Parse date from details["date"]

      startDate = parseDate(details["date"].match(dateRegExp)[0], startDate);

      endDate = parseDate(details["date"].match(dateRegExp)[0], endDate);

      

      // Parse start time from details["time"]

      startDate = parseTime(details["time"].match(timeRegExp)[0], startDate);

      

      // Remove the just found time string and find the second one (endTime)

      details["time"] = details["time"].substr(details["time"].indexOf(details["time"].match(timeRegExp)[0]) + details["time"].match(timeRegExp)[0].length);

      endDate = parseTime(details["time"].match(timeRegExp)[0], endDate);

    } else {

      

      // Parse start date

      startDate = parseDate(details["startStr"].match(dateRegExp)[0], startDate);

      startDate = parseTime(details["startStr"].match(timeRegExp)[0], startDate);

      

      // Parse end date

      endDate = parseDate(details["endStr"].match(dateRegExp)[0], endDate);

      endDate = parseTime(details["endStr"].match(timeRegExp)[0], endDate);

    }

    

    // Create link to add event page

    $('div.ical_section_event').append('<div class="ical_section" style="margin-bottom:1em;float:left;clear:left;">' 

      + '<div class="ical_text"> '

      + '<a class="ical" target="_fbtogcal" href="http://www.google.com/calendar/event' 

      + '?action=TEMPLATE&text=' + encodeURIComponent(details["name"]) + '&dates=' + dateToString(startDate) + "/" + dateToString(endDate) + '&details=' + encodeURIComponent(details["description"])

      +  '&location=' + encodeURIComponent(details["location"]) + '&trp=true' + '&sprop=www.facebook.com&sprop=name:" class="tools">' + languages[lang]["label"] + '</a></div></div>');	

  }