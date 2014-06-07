// Ikariam Building end time
// Copyright (c) 2011,  scorpion
//
// Acknowledges
// Adapted from 'Ikariam missing resources' - http://userscripts.org/scripts/show/48732
// Huge know-how and language detection from 'Empire board' - http://userscripts.org/scripts/show/41051
//
// ==UserScript==
// @name          Ikariam building end time
// @namespace     http://ikariam.org/
// @description   Displays the exact end time of upgrading a building
// @include       http://s*.ikariam.*/*
// @version       1.0.2
//
// @history 1.0.2 Original Version
// ==/UserScript==
var upgrElement = document.getElementById('buildingUpgrade');
if (upgrElement) { // we are in building page

  var abbreviationFor = {
    "bg" : {"day":"Д.", "hour":"ч.", "min":"мин.", "sec":"с.", "end":"Завършване на строежа"},
    "en" : {"day":"D", "hour":"h", "min":"m", "sec":"s", "end":"Building completion"},
//    "de" : {"day":"T", "hour":"h", "min":"m", "sec":"s", "end":"Bauen fertig"},
  };
  
  
// define current language #############
  var currLang = "";
  
  var sCode = '';
  var scripts = document.getElementsByTagName("script");
  for (var j = 0; j < scripts.length; j++) {
    sCode = scripts[j].innerHTML;
    if (sCode.indexOf('LocalizationStrings') >= 0) {
      break;
    }
  }//for scripts
  
  if (sCode != '') {
    var reg = /LocalizationStrings\['language'\]\s+=\s+'(.+)';/;
    var res = reg.exec(sCode);
    if (res != null) currLang = res[1];
  }
  
  if (abbreviationFor[currLang] == null) {
	  throw new Error("Please translate this script for the locale \'"+currLang+"\' and contribute it to the author.");
	  return; 
  }
//eof define current language ##########

  
  var alreadyInProgress = false;
  var timeLiElement;

  var timeStrToParse;
  
  var timeCounterElement = document.getElementById('upgradeCountDown');
  if(timeCounterElement) {
    timeStrToParse = timeCounterElement.textContent; // [XXDays] [XXh] [XXmin.] [XXsec.]
    alreadyInProgress = true;
  }
  
  if ( ! alreadyInProgress) {
      var divContentElement = upgrElement.getElementsByTagName('div')[0]; // div.content
      if (divContentElement) {
          var ulResourcesElement = divContentElement.getElementsByTagName('ul')[0]; //ul.resources
          if (ulResourcesElement) {
              var liElements = ulResourcesElement.getElementsByTagName('li');
              var liElement;
              for (var i=0; i < liElements.length; i++) {
                  liElement = liElements[i];
                  if (liElement.className == 'time') {
                      timeLiElement = liElement;
                      var liTextContent = liElement.textContent; // Build time: Xh. XXmin. XXsec.
                      var buildTimeStr = liElement.title;
                      var timeStrToParse = liTextContent.substr(liTextContent.indexOf(buildTimeStr) + buildTimeStr.length + 2);
                      break;
                  }//if li.time
              }//for liElements
          }//if ul
      }//if div
  }//if not in progress
  
  var daysToAdd = 0;
  var hoursToAdd = 0;
  var minutesToAdd = 0;
  var secondsToAdd = 0;
  
// parse time string =========
  var parts = timeStrToParse.split(" ");
  if(parts == null || parts.length == 0) {
      parts[0] = timeStrToParse;
  }
  var part;
  for (var i = 0; i<parts.length; i++) {
    part = parts[i];
    if(part.indexOf(abbreviationFor[currLang]['day']) > -1) { // XXd
      daysToAdd = parseInt(part.replace(abbreviationFor[currLang]['day'], "").trim());
    }
    if(part.indexOf(abbreviationFor[currLang]['hour']) > -1) { // XXh
      hoursToAdd = parseInt(part.replace(abbreviationFor[currLang]['hour'], "").trim());
    }
    if(part.indexOf(abbreviationFor[currLang]['min']) > -1) { // XXm
      minutesToAdd = parseInt(part.replace(abbreviationFor[currLang]['min'], "").trim());
    }
    if(part.indexOf(abbreviationFor[currLang]['sec']) > -1) { // XXs
      secondsToAdd = parseInt(part.replace(abbreviationFor[currLang]['sec'], "").trim());
    }
  }//for each part
//eof parse time string =========
  
  
  
// calculate end date **********
  var now = new Date();
  var millisToAdd = 1000*(secondsToAdd + 60*(minutesToAdd + 60*(hoursToAdd + 24*daysToAdd)));
  var endTime = new Date(now.getTime()+millisToAdd);

  // endTimeStr := "~@ " + endTime.getHours()+":"+endTime.getMinutes()+"(!)";
  var endTimeStr = "~@ ";
  // adds leading zero to h and min *#*#*#*#*
  if(endTime.getHours()<10) {
      endTimeStr = endTimeStr+"0";
  }
  endTimeStr = endTimeStr + endTime.getHours();
  endTimeStr = endTimeStr + ":";
  
  // adds leading zero to h and min *#*#*#*#*
  if(endTime.getMinutes()<10) {
      endTimeStr = endTimeStr+"0";
  }
  endTimeStr = endTimeStr +endTime.getMinutes();
  
  if(now.getDate() != endTime.getDate()) {
    endTimeStr = endTimeStr+"(!)";
  }
//eof calculate end date **********

// display HTML elements >>>>>>>>>
  if (alreadyInProgress) {
    var progressContainer = document.getElementById('upgradeInProgress');
    progressContainer.innerHTML = progressContainer.innerHTML + 
    '<div class="time" id="upgradeCountDown" style="top:75px">'+endTimeStr+'</div>';
  }
  else {
    /*create <li title="+abbreviationFor[currLang]['end']+" class="time">
    <span class="textLabel">"+abbreviationFor[currLang]['end']+"</span>@04:17(!)</li>*/
    var newLiElement = document.createElement('li');
    newLiElement.title = abbreviationFor[currLang]['end'];
    newLiElement.className = 'time';
    newLiElement.style.backgroundImage = 'none';
    newLiElement.innerHTML = '<span class="textLabel">'+abbreviationFor[currLang]["end"]+'</span>'+endTimeStr;

    timeLiElement.parentNode.insertBefore(newLiElement, timeLiElement.nextSibling);
  }
//eof display HTML elements >>>>>>>>>
  
}//if 'buildingUpgrade'
