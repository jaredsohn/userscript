// FCC Monkey-Wrenching
//
// How 'bout some good-old civil disobedience?
//
// NOTE: it's probably a felony or something to file a false
// complaint, and your submissions can be tracked by your IP
// address, so it's a good idea to use this only when you're
// connected to an unsecured wireless network or behind an
// anonymizing proxy.
//------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "FCC Monkey", and click Uninstall.
//
//------------------------------------------------------------
//
// ==UserScript==
// @name          FCC Monkey
// @description   autofill FCC obscenity complaint forms
// @include       http://svartifoss2.fcc.gov/*
// @include       https://www.parentstv.org/ptc/fcc/*
// ==/UserScript==

function randomInt(max) { return Math.floor(Math.random()*max); }

function makeRandomSelection(select)
{
  var c = randomInt(select.length);
  select.selectedIndex = c;
}
function makeRandomSelection1(select) // Skip first selection
{
  var c = randomInt(select.length-1)+1;
  select.selectedIndex = c;
}
function chooseSelection(select, choiceText)
{
  var re = new RegExp(choiceText, "i");
  for (var i = 0; i < select.options.length; i++) {
    var option = select.options[i].text;
    if (option.match(re)) {
      select.selectedIndex = i;
      return;
    }
  }
}
function makeRandomDate(days) {
  // Return a reasonable date in the last 10 days
  var now = new Date();
  var pick = new Date();
  pick.setTime(now.getTime()-(randomInt(9)+1)*1000*3600*24);
  var day = pick.getDay();
  if (!days.match(/(sat|sun|m|t|w|th|f)/i)) {
    if (day != 0 && day != 6) {
      return (pick.getMonth()+1)+"/"+pick.getDate()+"/"+pick.getFullYear();
    }
    return makeRandomDate(days); // Try again if saturday/sunday picked
  }
  // days is (e.g.) 'Th' or "MWF" or "SunMTWThFSat"
  // Match based on longest substring first:
  var toMatch = [ 'sun', 'sat', 'th', 'm', 't', 'w', 'f' ];
  var toMatchD = [ 0, 6, 4, 1, 2, 3, 5 ];
  var dd = days;
  for (var i = 0; i < 7; i++) {
    var re = new RegExp(toMatch[i], 'i');
    if (re.test(dd)) {
      dd = dd.replace(re, '');
      if (day == toMatchD[i]) {
        return (pick.getMonth()+1)+"/"+pick.getDate()+"/"+pick.getFullYear();
      }
    }
  }
  return makeRandomDate(days); // Keep picking until we match days.
}
function randomPickFromArray(a)
{
  var nkeys = 0;
  for (var k in a) { ++nkeys; }
  var whichKey = randomInt(nkeys);
  var i = 0;
  for (var k in a) {
    if (i == whichKey) { return a[k]; }
    ++i;
  }
  return null;
}

var lastnames = [ "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller",
                  "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White",
                  "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark",
                  "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez",
                  "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker",
                  "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner",
                  "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins" ];
var firstnames = [ "James", "John", "Robert", "Michael", "William", "David", "Richard",
                   "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark",
                   "Donald", "George", "Ken", "Steven", "Ed", "Brian", "Ronald", "Tony",
                   "Kevin", "Jason", "Jeff", "Mary", "Patricia", "Linda", "Barbara", "Liz",
                   "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy",
                   "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon",
                    "Michelle", "Laura", "Sarah", "Kim", "Deborah" ];
var streets = ["2nd St", "Third Street", "Park", "Main St.", "Oak St.",
                        "Pine Street", "Maple Street", "Cedar", "Elm ST",
                        "View Ave.", "Spring St", "North St", "Ridge Street",
                        "Lincoln", "Willow", "Sunset Ave", "Jackson St", "Cherry St",
                        "West St", "Center St", "Highland Street", "River Ave", "Meadow St"];
var emailproviders = ["aol.com", "gmail.com", "mailinator.com","yahoo.com","msn.com",
                               "postmark.net", "iboom.com"];
function makeRandomEmail(firstname, lastname)
{
  var result = firstname.toLowerCase();
  result += lastname.toLowerCase().substring(0, randomInt(2));
  if (randomInt(100) < 20) { result += (""+randomInt(11)+3); }
  result += "@";
  result += randomPickFromArray(emailproviders);
  return result;
}

/**
 * Strip out HTML tags, and leading/traling space
 */
function HTMLToText(text)
{
  text = text.replace(/<br>/ig, "\n");
  text = text.replace(/<[^>]*>/g, '');
  text = text.replace(/^\s*/, '');
  text = text.replace(/\s*$/, '');
  return text;
}

/**
 * Parse information in an HTML table and return the data, indexed
 * by the first column.
 * id must be table id.
 * elt must be starting element
 * columns is an array of column names
 * skipRows is number of header rows to skip
 *
 * E.g. if table columns are:   Title  Time  Stations
 *  will return array with this structure:
 *   a['SomeTitle'][0]['SomeTime'] = ...;
 *   a['SomeTitle'][0]['SomeStations'] = ...;
 */
function parseTable(id, elt, columns, skipRows)
{
  var key = columns[0];
  var xRows = document.evaluate("//table[@id='"+id+"']/tbody/tr",
               elt, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var nRows = xRows.snapshotLength

  var a = new Array();
  for (var i = skipRows; i < nRows; i++) {
    var tdPath = "//table[@id='"+id+"']/tbody/tr["+(i+1)+"]/td";
    var xCols = document.evaluate(tdPath,
           elt, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var keyValue = HTMLToText((xCols.snapshotItem(0)).innerHTML);
    var thisIndex = 0;
    if (typeof a[keyValue] == 'undefined') {
      thisIndex = 0;
      a[keyValue] = new Array();
      a[keyValue][thisIndex] = { };
    }
    else {
      thisIndex = a[keyValue].length;
      a[keyValue][thisIndex] = { };
    }
    for (var j = 0; j < xCols.snapshotLength; j++) {
      var td = xCols.snapshotItem(j);
      var index = j;
      if (typeof columns[j] != 'undefined') { index = columns[j]; }
        a[keyValue][thisIndex][index] = HTMLToText(td.innerHTML);
      }
  }
  return a;
}

function personalizeText(t, a)
{
  for (var k in a) {
    var re = new RegExp("\\["+k+"\\]", "i");
    t = t.replace(re, a[k]);
  }
  return t;
}

// Fetch info from the wiki:
var wikiURL = "http://freetalklive.com/wiki/index.php?title=FCC_Monkey";
GM_xmlhttpRequest({
  method: 'GET',
  url: wikiURL,
  headers: { 'User-Agent' : 'FCCmonkey/1.0' },
  onload: function(r) {
    // Parse into a <div> so we can use DOM methods to extract data:
    var div = document.createElement("div");
    var re = /<body([^>])*>(.|\n)*<\/body>/i;
    var bodyText = (re.exec(r.responseText))[0];
    bodyText = bodyText.replace(/<body([^>])*>/i, '');
    bodyText = bodyText.replace(/\/body>/i, '');
    div.innerHTML = bodyText;
    div.style.display="none";
    (document.body||document.getElementsByTagName("body")[0]).appendChild(div);
    var shows = parseTable('showtimes', div, ['Title', 'Time', 'Stations'], 1);
    var stations = parseTable('stations', div, ['CallLetters', 'Network', 'Type',
                                           'City', 'State', 'Zip', 'TimeZone'], 1);
    var complaints = parseTable('complaints', div, ['Title', 'Complaint'], 1);
    var comments = parseTable('comments', div, ['Where', 'Comment'], 1);

    var firstname = randomPickFromArray(firstnames);
    var lastname = randomPickFromArray(lastnames);
    var show = randomPickFromArray(randomPickFromArray(shows));
    var title = show['Title'];
    var callLetters = HTMLToText(randomPickFromArray(show['Stations'].split(',')));
    var station = stations[callLetters];
    if ((typeof station) == 'undefined') {
        GM_log("Wiki data error: no station "+callLetters);
        station = randomPickFromArray(stations);
    }
    station = station[0];

    // Ok, generate a random complaint:
    var complaintText = "";
    // 50% chance to pick random "Before" comment
    if (randomInt(100) < 50) {
        complaintText += (randomPickFromArray(comments['Before']))['Comment']+"\n\n";
    }
    // 33% chance for some blah blah blah:
    var filler = "";
    if (randomInt(100) < 33) {
        filler = (randomPickFromArray(comments['Anywhere']))['Comment'];
        complaintText += filler + "\n";
    }
    // Now show-specific complaint (if we've got one)
    if ((typeof complaints[title]) == 'object' && randomInt(100) > 10) {
        complaintText += (randomPickFromArray(complaints[title]))['Complaint'] + "\n\n";
    }
    else {
        complaintText += (randomPickFromArray(complaints['Any']))['Complaint'] + "\n\n";
    }
    // 33% chance for some more blah blah blah
    if (randomInt(100) < 33) {
        var t = (randomPickFromArray(comments['Anywhere']))['Comment'];
        // avoid repeating ourselves:
        if (t != filler) { complaintText += t + "\n\n"; }
    }
    // 50% chance to pick random "After" comment
    if (randomInt(100) < 50) {
        complaintText += (randomPickFromArray(comments['After']))['Comment'] + "\n";
    }
    // Now replace [firstname] [lastname] tags:
    complaintText = personalizeText(complaintText,
          { 'firstname' : firstname, 'lastname' : lastname,
                  'title' : title });

    // Break up show['Time'] into time and (maybe) days:
    var timeRE = /(\d+:\d+\s*(am|pm))\s*([a-z]*)$/i;
    var timeDays = timeRE.exec(show['Time']);
    show['Time'] = timeDays[1];
    show['Days'] = timeDays[3];

    var fieldsToFill;
    if (window.location.href.match(/fcc\.gov/)) {
      fieldsToFill = {
        "CompFirstName" : function(e) { e.value = firstname; },
        "ComplLastName" : function(e) { e.value = lastname; },
        "ComplaintAddress" : function(e) { e.value = (randomInt(659)+3)+" "+randomPickFromArray(streets); },
        "ComplainantState" : function(e) { chooseSelection(e, station['State']); },
        "ComplainantCity" : function(e) { e.value = station['City']; },
        "Zip" : function(e) { e.value = station['Zip']; },
        "EmailAdd" : function(e) { e.value = makeRandomEmail(firstname, lastname); },
        "Program" : function(e) { e.value = show['Title']; },
        "ProgramDate" : function(e) { e.value = makeRandomDate(show['Days']); },
        "ProgramTime" : function(e) { e.value = show['Time']; },
        "Network" : function(e) {
            if (station['Type'] != 'RADIO') { e.value = station['Network']; }
         },
        "CallSign" : function(e) { e.value = station['CallLetters']; },
        "CityState" : function(e) { e.value = station['City']+", "+station['State']; },
        "ComplaintSum" : function(e) { e.value = complaintText; },
      };
    }
    else if (window.location.href.match(/parentstv\.org/)){
      fieldsToFill = {
        "Body" : function(e) { e.value = complaintText; },
        "FirstName" : function(e) { e.value = firstname; },
        "LastName" : function(e) { e.value = lastname; },
        "Address" : function(e) { e.value = (randomInt(659)+3)+" "+randomPickFromArray(streets); },
        "Email" : function(e) { e.value = makeRandomEmail(firstname, lastname); },
        "Program" : function(e) { e.value = show['Title']; },
        "BroadcastDate" : function(e) { e.value = makeRandomDate(show['Days']); },
        "Network" : function(e) {
          if (station['Type'] == 'RADIO') { chooseSelection(e, 'RADIO'); }
          else { chooseSelection(e, station['Network']); }
          },
        "broadcastTime" : function(e) { chooseSelection(e, show['Time']); },
        "Timezone" : function(e) { chooseSelection(e, station['TimeZone']); },
        "affiliate" : function(e) { e.value = station['CallLetters']; },
        "State" : function(e) { chooseSelection(e, station['State']); },
        "City" : function(e) { e.value = station['City']; },
        "Zip" : function(e) { e.value = station['Zip']; },
      };
      document.getElementsByName("C1")[0].checked=false;
    }

    for (f in fieldsToFill) {
        fieldsToFill[f](document.getElementsByName(f)[0]);
    }
  }
});
