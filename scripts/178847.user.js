// ==UserScript==
// @name          Ninja Commuters
// @namespace     http://dominicklim.com/userscripts
// @description   Leverages Google Maps API and piggybacks off of Ninja Courses to show how long it takes to get to classes.
// @include       http://ninjacourses.com/schedule/*
// @include       http://www.ninjacourses.com/schedule/*
// @include       https://ninjacourses.com/schedule/*
// @include       https://www.ninjacourses.com/schedule/*
// @include       http://schedulebuilder.berkeley.edu/schedule/*
// @include       http://www.schedulebuilder.berkeley.edu/schedule/*
// @include       https://schedulebuilder.berkeley.edu/schedule/*
// @include       https://www.schedulebuilder.berkeley.edu/schedule/*
// ==/UserScript==

// Prototype extensions
Array.prototype.getUnique = function(){
  var u = {}, a = [];
  for(var i = 0, l = this.length; i < l; ++i){
    if(u.hasOwnProperty(this[i])) {
      continue;
    }

    a.push(this[i]);
    u[this[i]] = 1;
  }
  return a;
}

var buildingCorrections = {
    "gpb":"Genetics and Plant Biology",
    "valley lsb":"Valley Life Sciences Building",
    "wheeler aud":"Wheeler Hall",
    "morrison":"Morrison Hall",
    "hertz":"Morrison Hall",
    "unit iii din":"RES HALL UNIT III DINING",
    "rec sprt fac":"Recreational Sports Facility",
    "spieker pool":"Spieker Aquatics Complex",
    "tan":"Tan Hall",
    "lhs":"Lawrence Hall of Sciences",
    "univ hall":"University Hall",
    "gspp":"Goldman School of Public Policy",
    "durant":"Durant Hall",
    "kerr":"Kerr Field",
    "lsa":"Life Sciences Addition",
    "mlk st union":"Martin Luther King Student Union",
    "pac":"Film ARC St Pacific Film Archive",
    "chavez":"Cesar E. Chavez Student Center",
    "donner lab":"Donner Laboratory",
    "dwinelle an":"Dwinelle Annex",
    "gilman":"Gilman Hall",
    "bancroft lib":"Bancroft Library",
    "bechtel aud":"Bechtel Engineering Center",
    "berk art mus":"Berkeley Art Museum",
    "bot garden":"Botanical Gardens",
    "soda":"Soda Hall",
    "off campus":"2150 Shattuck Ave",
    "hearst min":"Department of Materials Science and Engineering"
  }
  , showCommuteTimes = (localStorage["showCommuteTimes"]) ? localStorage["showCommuteTimes"] !== "false" : true
  , homeAddress = (localStorage["homeAddress"]) ? localStorage["homeAddress"] : ""
  , minutesToFirstClass = (localStorage["minutesToFirstClass"]) ? localStorage["minutesToFirstClass"] : "";

function sectionGroupsMake() {
  var sections = document.getElementsByClassName('schedule-section-wrapper')
    , uniqueValues = uniqueOffsetLeftsFromSections(sections)
    , sectionGroupsMade = sectionGroups(uniqueValues, sections);

  return addMinutesAvailable(sectionGroupsMade);
}

function uniqueOffsetLeftsFromSections(sections) {
  return [].map.call(sections, function (el) { return el.offsetLeft; }).getUnique();
}

// returns dictionary where keys are section offsetLeft values
function sectionGroups(uniqueValues, sections) {
  var sectionGroups = {};
  for (var i = 0; i < uniqueValues.length; i++) {
    sectionGroups[uniqueValues[i]] = [];
  }

  return populateSectionGroups(sectionGroups, sections);
}

// populate dictionary with elements that have the given key as the element's
// offsetLeft property
function populateSectionGroups(sectionGroups, sections) {
  var sectionOffsetLeft;

  for (i = 0; i < sections.length; i++) {
    sectionOffsetLeft = sections[i].offsetLeft;
    if (sectionOffsetLeft !== undefined) {
      sectionGroups[sectionOffsetLeft].push(sections[i]);
    }
  }

  return sectionGroups;
}

function addMinutesAvailable(sectionGroups) {
  for (var key in sectionGroups) {
    var sectionGroup = sectionGroups[key];

    sortSectionGroup(sectionGroup);
    cacheMinutesAvailable(sectionGroup);
    getDurationForSectionGroup(sectionGroup);
  }

  return sectionGroups;
}

// sort sections by their top attribute (smaller means earlier)
function sortSectionGroup(sectionGroup) {
  sectionGroup.sort(function(a, b){
    return a.offsetTop - b.offsetTop;
  });
}

// determine the time available for going from section to section by height of 
// sections
function cacheMinutesAvailable(sectionGroup) {
  for (var i = 0; i < sectionGroup.length; i++) {
    if (i < sectionGroup.length - 1) {
      var section = sectionGroup[i];
      section.setAttribute('data-minutes-available', minutesAvailableBetweenSections(section, sectionGroup[i + 1]));
    }
  }
}

function getDurationForSectionGroup(sectionGroup) {
  for (var i = 0; i < sectionGroup.length; i++) {
    var section = sectionGroup[i];
    if (!locationOfSection(section)) {
      continue;
    }
    if (i === 0 && isHomeDefined()) {
      getDurationFromHome(section);
    }

    if (getCachedMinutesAvailable(section)) {
      var nextSection = sectionGroup[i + 1];
      if (locationOfSection(nextSection)) {
        getDurationBetweenSections(section, nextSection);
      }
    }
  }
}

function getDurationFromHome(section) {
  getDuration(homeAddress, locationOfSection(section), function (duration) {
    addDurationOverlayFromHome(section, duration);
  });
}

function getDurationBetweenSections(section, nextSection) {  
  getDuration(locationOfSection(section), locationOfSection(nextSection), function (duration) {
    addDurationOverlayToNextSection(section, nextSection, duration);
  });
}

function getDuration(fromLocation, toLocation, durationCallback) {
  var url = directionURLBetween(localizeInBerkeley(fromLocation), localizeInBerkeley(toLocation));
  $.ajax({
    dataType: "json",
    url: url,
    context: document.body,
    complete: function (data) {
      if (data) {
        var json = $.parseJSON(data["responseText"])
          , routes = json["routes"]
          , legs = routes[0]["legs"]
          , duration = 0;

        for (var i = 0; i < legs.length; i++) {
          duration += legs[i]["duration"]["value"];
        }

        durationCallback(duration);
      }
    }
  });
}

function addDurationOverlayToNextSection(section, nextSection, duration) {
  addDurationOverlay(locationOfSection(section), nextSection, getCachedMinutesAvailable(section), duration);
}

function addDurationOverlayFromHome(section, duration) {
  addDurationOverlay(homeAddress, section, minutesToFirstClass, duration);
}

function addDurationOverlay(fromLocation, section, minutesAvailable, duration) {
  var cushion = minutesAvailable * 60 - duration
    , minutes = Math.ceil(duration / 60)
    , seconds = duration - minutes * 60
    , fromLocation = fromLocation.toLowerCase() === homeAddress.toLowerCase() ? "Home" : fromLocation
    , href = hrefOfSection(section)
    , background = document.createElement("a")
    , backgroundClass = "background"
    , detailMinutes = "<p class='details minutes'>" + minutes + " min</p>"
    , detailFrom = "<p class='details'>from " + fromLocation + "</p>"
    , detailAvailable = "<p class='details'>You have " + minutesAvailable + " min</p>"
    , durationParent = "<div class='duration'>" + detailMinutes + detailFrom + detailAvailable + "</div>";

  backgroundClass += showCommuteTimes ? " highlighted" : "";
  if (cushion < 0) {
    backgroundClass += " bad";
  } else if (cushion < 180) {
    backgroundClass += " okay";
  }

  background.className = backgroundClass;
  background.setAttribute('href', href);
  background.innerHTML = durationParent;
  section.appendChild(background);
}

function getCachedMinutesAvailable(section) {
  return section.getAttribute('data-minutes-available');
}

function contentOfSection(section) {
  return firstChildWithClassName(section, 'schedule-section-content');
}

function hrefOfSection(section) {
  return firstChildWithTagName(contentOfSection(section), 'a').getAttribute('href');
}

function locationOfSection(section) {
  var location = firstChildWithClassName(contentOfSection(section), 'location');
  if (typeof(location) === "undefined") {
    return false;
  } else {
    var locationArr = location.innerHTML.split(" ");

    for (var i = locationArr.length - 1; i >= 0; i--) {
      if (/\d/.test(locationArr[i])) {
        locationArr.splice(i, 1);
      }
    }

    return locationArr.join(" ");
  }
}

// Helpers
function minutesAvailableBetweenSections(section, nextSection) {
  var borderHeight = 3
    , berkeleyTime = 10
    , halfHourHeight = document.getElementsByClassName('schedule-half-hour schedule-hour')[0].offsetHeight;;

  return (((nextSection.offsetTop - (section.offsetTop + section.offsetHeight + borderHeight)) / halfHourHeight) * 30) + berkeleyTime;
}

function directionURLBetween(origin, destination) {
  return "//maps.googleapis.com/maps/api/directions/json?v=3&origin=" + origin + "&destination=" + destination + "&sensor=false&mode=walking";
}

function localizeInBerkeley(building) {
  if (building) {
    if (building.indexOf(',') === -1) {
      building = buildingCorrections[building.toLowerCase()] || building;
      building += ", berkeley, ca";
    }
  } else {
    building = "berkeley, ca";
  }
  return building;
}

function isHomeDefined() {
  if (homeAddress) {
    var strippedHome = homeAddress.replace(/\W/g, '');
    return strippedHome.length > 0;
  }

  return false;
}

// DOM
function firstChildWithClassName(parent, className) {
  return parent.getElementsByClassName(className)[0];
}

function firstChildWithTagName(parent, tagName) {
  return parent.getElementsByTagName(tagName)[0];
}

function toggleCommuteTimes() {
  var all = document.getElementsByClassName('background');
  showCommuteTimes = !showCommuteTimes;
  localStorage["showCommuteTimes"] = showCommuteTimes;
  var toggleVerb = showCommuteTimes ? "Hide" : "Show";
  for (var i = 0; i < all.length; i++) {
    var className = all[i].className;
    var highlightedClass = " highlighted";
    if (className.indexOf(highlightedClass) !== -1) {
      className = className.replace(highlightedClass, "");
    }
    if (showCommuteTimes) {
      className += " highlighted";
    }
    all[i].className = className;
  }
  document.getElementById("toggle-duration").innerHTML = toggleVerb + " Commute Times";
  return false;
}

function checkIfReceivedSchedule() {
  while ($("#schedule-wrapper").length === 0) {
    setTimeout(checkIfReceivedSchedule, 500);
    return;
  }

  doShit();
}

function doShit() {
  var toggleVerb = showCommuteTimes ? "Hide" : "Show"
    , minutes = parseInt($("#first-class").val());

  minutesToFirstClass = minutes ? minutes : 10;
  homeAddress = $("#where-live").val();
  localStorage["homeAddress"] = homeAddress;
  localStorage["minutesToFirstClass"] = minutesToFirstClass;

  $("a.background").remove();
  $("#toggle-duration").remove();
  $("div#course-pane").append("<a id='toggle-duration'' href='#'>" + toggleVerb + " Commute Times</a>");
  $("#toggle-duration").click(toggleCommuteTimes);

  sectionGroupsMake();
  $("li.page").bind("click", checkIfReceivedSchedule);
}

window.addEventListener("load", function(e) {
  var css = 'a.background { background: #27AE60; color: white; width: 100%; height: 100%; margin: 0px auto; position: absolute; top: 0; left: 0; opacity: 0.2; text-align: center;} a.background.bad {background: #C0392B;} a.background.okay {background: #F39C12;} a.background.last-class {background: #9B59B6;} div.duration {pointer-events: none; position: absolute; bottom: 0; margin: 0px auto; text-align: center; display: block; width: 100%; cursor: default;} a.background:hover {opacity: 0.85;} a.background.highlighted {opacity: 0.85;} a.background.highlighted:hover {opacity: 0.2;} p.details {margin: 0px auto; font-size: 0.65em;} p.details.minutes {font-size: 1em; font-weight: bold;} input.djl-input {width: 100%;}'
    , head = document.getElementsByTagName('head')[0]
    , style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);

  var form = document.createElement("form");
  form.setAttribute("id", "home-search");
  form.setAttribute("action", "");
  form.setAttribute("method", "get");
  form.setAttribute("onsubmit", "return false;");

  var whereLive = "<input type='text' id='where-live' class='djl-input' name='where-live' placeholder='Where do you live?' value='" + homeAddress + "'></input>";
  var firstClass = "<input type='text' id='first-class' class='djl-input' name='first-class' placeholder='Max commute for first class? (minutes)' value='" + minutesToFirstClass + "'></input>";
  var searchDiv = "<div>" + whereLive + firstClass + "</div>";
  var clearDiv = "<div class='clear-both'></div>"

  form.innerHTML = searchDiv + clearDiv;
  document.getElementById("course-pane").appendChild(form);
}, false);

$("#generate-submit").click(checkIfReceivedSchedule);
