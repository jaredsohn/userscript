// ==UserScript==
// @name        Discogs: Release day of the week
// @namespace   http://userscripts.org/users/430716
// @description    Display the release day of the week on release pages
// @version        2014-03-28.01
// @include     http://www.discogs.com/*release/*
// @exclude     http://www.discogs.com/history/release/*
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
    if (releaseCountry === 'Germany' && (parseInt(relDate.split('-')[0]) < 2005 || (parseInt(relDate.split('-')[0]) == 2005 && parseInt(relDate.split('-')[1]) <= 5))) {
      releaseCountry = 'Germany2005-';
    } else if (releaseCountry === 'Germany' && (parseInt(relDate.split('-')[0]) > 2005 || (parseInt(relDate.split('-')[0]) == 2005 && parseInt(relDate.split('-')[1]) > 5))) { 
      releaseCountry = 'Germany2005+';
    }
    if (releaseCountry === countryReleaseDay[c].country && dayOfTheWeek === countryReleaseDay[c].releaseDay) {
      weekDay = '<font color="green">' + dayOfTheWeek + '</font>';
      return weekDay;
    } else if (releaseCountry === countryReleaseDay[c].country && dayOfTheWeek !== countryReleaseDay[c].releaseDay) {
      weekDay = '<font color="red">' + dayOfTheWeek + '</font>';
      return weekDay;
    } else {
      weekDay = '<font color="grey">' + dayOfTheWeek + '</font>';
    }
  }
  return weekDay;
}

function getSingleDate(releaseDateLocation) {
  var relDate = releaseDateLocation.firstChild.nodeValue.trim();
  if (relDate.match(/\d{2} \w{3} \d{4}/)) { // if Discogs has full date
    relDate = new Date(relDate);
    relMonth = ('0' + (relDate.getMonth() + 1)).slice(-2);
    relDayOfTheMonth = ('0' + relDate.getDate()).slice(-2);
    relDate = relDate.getFullYear() + '-' + relMonth + '-' + relDayOfTheMonth;
    if (relDate.match(/\d{4}-\d{2}-\d{2}$/)) {
      var dayOfTheWeek = calcDayOfWeek(relDate).trim();
      var day = correctDayCheck(releaseCountry,dayOfTheWeek,relDate);
      releaseDateLocation.innerHTML += ' <b>' + day + '</b>';
    }
  }
}

 var contentClassLength = document.getElementById('page_content').getElementsByClassName('body')[0].getElementsByClassName('profile')[0].getElementsByClassName('content').length;
var releaseCountry = document.getElementById('page_content').getElementsByClassName('body')[0].getElementsByClassName('profile')[0].getElementsByClassName('content')[contentClassLength-4].getElementsByTagName('a')[0].firstChild.nodeValue.trim();
var releaseDateLocation = document.getElementById('page_content').getElementsByClassName('body')[0].getElementsByClassName('profile')[0].getElementsByClassName('content')[contentClassLength-3].getElementsByTagName('a')[0];
getSingleDate(releaseDateLocation);