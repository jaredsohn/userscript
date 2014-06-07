// ==UserScript==
// @name           MusicBrainz: Release day of the week
// @namespace      http://userscripts.org/users/430716
// @description    Display the day of the week for release events.
// @version        2014-04-03.01
// @include        http*://*musicbrainz.org/release*
// @include        http*://*musicbrainz.org/edit/*
// @include        http*://*musicbrainz.org/*/edits
// @include        http*://*musicbrainz.org/label/*
// @include        http*://*musicbrainz.org/search/*
// @include        http*://*musicbrainz.org/artist/*/releases*
// @include        http*://*musicbrainz.org/area/*/releases*
// ==/UserScript==

// Author: Jugdish (http://userscripts.org/users/25590)
var monthStartComn = [ 0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5 ];
var monthStartLeap = [ 6, 2, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5 ];
var dayOfWeek = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]; // en
// var dayOfWeek = [ "P", "E", "T", "K", "N", "R", "L" ]; // ee
// var dayOfWeek = [ "dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam." ]; // fr
// var dayOfWeek = [ "CN", "T2", "T3", "T4", "T5", "T6", "T7" ]; // vi
// var dayOfWeek = [ "\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F" ]; // ja

function _calcDayOfWeek(year,month,day) {
  var century = Math.floor(year/100);
  if (century < 19 || century > 20 || month < 1 || month > 12 || day < 1 || day > 31) return "";
  year %= 100;
  var dayNum = ((3-(century%4))*2 + year + Math.floor(year/4) + (year % 4 ? monthStartComn[month-1] : monthStartLeap[month-1]) + day) % 7;
  return " "+dayOfWeek[dayNum];
}

function calcDayOfWeek(dateString) {
  var pieces = dateString.split("-");
  return _calcDayOfWeek(Number(pieces[0]),Number(pieces[1]),Number(pieces[2]));
}


// Author: SultS
function correctDayCheck(releaseCountry,dayOfTheWeek,relDate) {
  var countryReleaseDay = [];
  countryReleaseDay.push({country:'Australia', releaseDay:dayOfWeek[1]});
  countryReleaseDay.push({country:'France', releaseDay:dayOfWeek[1]});
  countryReleaseDay.push({country:'Germany2005-', releaseDay:dayOfWeek[1]});
  countryReleaseDay.push({country:'Germany2005+', releaseDay:dayOfWeek[5]});
  countryReleaseDay.push({country:'Japan', releaseDay:dayOfWeek[3]});
  countryReleaseDay.push({country:'New Zealand', releaseDay:dayOfWeek[1]});
  countryReleaseDay.push({country:'United Kingdom', releaseDay:dayOfWeek[1]});
  countryReleaseDay.push({country:'United States', releaseDay:dayOfWeek[2]});
  var weekDay = dayOfTheWeek;
  for (c=0; c<countryReleaseDay.length; c++) {
    if (releaseCountry === 'Germany' && (parseInt(relDate.split('-')[0]) < 2005 || (parseInt(relDate.split('-')[0]) == 2005 && parseInt(relDate.split('-')[1]) <= 8))) {
      releaseCountry = 'Germany2005-';
    } else if (releaseCountry === 'Germany' && (parseInt(relDate.split('-')[0]) > 2005 || (parseInt(relDate.split('-')[0]) == 2005 && parseInt(relDate.split('-')[1]) > 9))) { 
      releaseCountry = 'Germany2005+';
    }
    // alert(releaseCountry);
    // alert(weekDay);
    if (releaseCountry === countryReleaseDay[c].country && dayOfTheWeek === countryReleaseDay[c].releaseDay) {
      weekDay = '<font color="green">' + dayOfTheWeek + '</font>';
      return weekDay;
    } else if (releaseCountry === countryReleaseDay[c].country && dayOfTheWeek !== countryReleaseDay[c].releaseDay) {
      weekDay = '<font color="#F60">' + dayOfTheWeek + '</font>';
      return weekDay;
    } else {
      weekDay = '<font color="grey">' + dayOfTheWeek + '</font>';
    }
  }
  return weekDay;
}

function getSingleDate(releaseEvents) {
  for (re=0; re<releaseEvents.length; re++) {
    if (releaseEvents[re].getElementsByTagName('span')[0] && releaseEvents[re].getElementsByTagName('span')[0].getAttribute('class') === '') {
      var releaseDateLocation = releaseEvents[re].getElementsByTagName('span')[0].childNodes[2];
      var releaseCountry = releaseEvents[re].getElementsByTagName('bdi')[0].firstChild.nodeValue.trim();
    } else if (releaseEvents[re].getElementsByTagName('span')[0]) { // RELEASE PAGE
      var releaseDateLocation = releaseEvents[re].childNodes[2].firstChild;
      var releaseCountry = releaseEvents[re].getElementsByTagName('bdi')[0].firstChild.nodeValue.trim();
    } else if (releaseEvents[re].parentNode.getAttribute('class') === 'links') { // RELEASE GROUP, ARTIST RELEASES, AREA RELEASES OR LABEL PAGE
      var releaseDateLocation = releaseEvents[re].firstChild;
      var releaseCountry = releaseEvents[re].parentNode.parentNode.nextSibling.nextSibling.getElementsByTagName('li')[re].getElementsByTagName('abbr')[0].getAttribute('title').trim();
    } else {
      break;
    }
    var relDate = releaseDateLocation.nodeValue.trim();
    if (relDate.match(/\d{4}-\d{2}-\d{2}$/)) {
      var dayOfTheWeek = calcDayOfWeek(relDate).trim();
      var day = correctDayCheck(releaseCountry,dayOfTheWeek,relDate);
      releaseEvents[re].innerHTML += ' <b>' + day + '</b>';
    }
  }
}

var currentURL = document.location.href;
if ((currentURL.match(/\/release-group|label|artist|area\//i)) && !currentURL.match(/\/edit/i)) { // RELEASE GROUP, ARTIST RELEASES, AREA RELEASES OR LABEL PAGE
  var releases = document.querySelectorAll("div#content table.tbl > tbody > tr:not([style='display: none;'])");
  var release_count = releases.length;
  for (r=0; r<release_count; r++) {
    if (releases[r].getElementsByTagName('th')[0]) { // skip release status rows
      continue;
    }
    if (currentURL.match(/\/(release-group\/|releases)/i) && !currentURL.match(/\/edit/i)) { // RELEASE GROUP OR ARTIST RELEASES PAGE
      var releaseEvents = releases[r].getElementsByClassName('links')[0].getElementsByTagName('li');
    } else { // LABEL PAGE
      var releaseEvents = releases[r].getElementsByTagName('td')[5].getElementsByTagName('ul')[0].getElementsByTagName('li');
    }
    getSingleDate(releaseEvents);
  }
} else if (currentURL.match(/\/release\//i) && !currentURL.match(/\/edit/i)) { // RELEASE PAGE
  if(document.getElementById('sidebar').getElementsByClassName('labels').length > 0) { // if there is label data
    var releaseEvents = document.getElementById('sidebar').getElementsByClassName('links')[1].getElementsByTagName('li');
  } else {
    var releaseEvents = document.getElementById('sidebar').getElementsByClassName('links')[0].getElementsByTagName('li');
  }
  getSingleDate(releaseEvents);
} else if (currentURL.match(/\/edits(\?|\/|$)/i)) { // EDIT HISTORY OR SEARCH PAGE
  var editList = document.getElementsByClassName('edit-list');
  for (e=0; e<editList.length; e++) {
    var editDescription = editList[e].getElementsByTagName('h2')[0].getElementsByTagName('a')[0].firstChild.nodeValue;
    if (editDescription.match(/add release$/i)) { // NGS RELEASE ADD
      var releaseData = editList[e].getElementsByClassName('edit-details')[0].getElementsByClassName('details add-release')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
      for (rd=1; rd<releaseData.length; rd++) {
        if (releaseData[rd].getElementsByTagName('th')[0].firstChild.nodeValue.match(/release events:$/i)) {
          var releaseEvents = releaseData[rd].getElementsByTagName('td')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
          continue;
        }
      }
      getSingleDate(releaseEvents);
    } else if (editDescription.match(/edit release$/i)) { // NGS RELEASE EDIT
      var releaseData = editList[e].getElementsByClassName('edit-details')[0].getElementsByClassName('details edit-release')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
      for (rd=1; rd<releaseData.length; rd++) {
        if (releaseData[rd].getElementsByTagName('th')[0].firstChild.nodeValue.match(/release events:$/i)) {
          var releaseEvents = releaseData[rd].getElementsByTagName('td')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
          getSingleDate(releaseEvents);
          var releaseEvents = releaseData[rd].getElementsByTagName('td')[1].getElementsByTagName('ul')[0].getElementsByTagName('li');
          getSingleDate(releaseEvents);
        }
      }
    }
  }
} else if (currentURL.match(/\/edit\//i)) { // EDIT PAGE
  var editDescription = document.getElementById('content').getElementsByTagName('div')[0].getElementsByTagName('h1')[0].firstChild.nodeValue.trim();
  if (editDescription.match(/add release$/i)) { // NGS RELEASE ADD
    var releaseData = document.getElementById('content').getElementsByClassName('details add-release')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for (rd=1; rd<releaseData.length; rd++) {
      if (releaseData[rd].getElementsByTagName('th')[0].firstChild.nodeValue.match(/release events:$/i)) {
        var releaseEvents = releaseData[rd].getElementsByTagName('td')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
        continue;
      }
    }
    getSingleDate(releaseEvents);
  } else if (editDescription.match(/edit release$/i)) { // NGS RELEASE EDIT
    var releaseData = document.getElementById('content').getElementsByClassName('details edit-release')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for (rd=1; rd<releaseData.length; rd++) {
      if (releaseData[rd].getElementsByTagName('th')[0].firstChild.nodeValue.match(/release events:$/i)) {
        var releaseEvents = releaseData[rd].getElementsByTagName('td')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
        getSingleDate(releaseEvents);
        var releaseEvents = releaseData[rd].getElementsByTagName('td')[1].getElementsByTagName('ul')[0].getElementsByTagName('li');
        getSingleDate(releaseEvents);
      }
    }
  }
}