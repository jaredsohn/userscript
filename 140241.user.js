// ==UserScript==
// @name        Hypersubs
// @version     0.1.9
// @description A better way to set your Supersubs in Fantasyleague.com's Classic Premier League fantasy football game.
// @match       http://www.fantasyleague.com/Classic/*
// @match       https://www.fantasyleague.com/Classic/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js
// @icon        http://img9.imageshack.us/img9/6439/hypersubs.png
// @updateURL   http://userscripts.org/scripts/source/140241.meta.js
// @downloadURL https://userscripts.org/scripts/source/140241.user.js 
// ==/UserScript==


/////////////////////////////////////////////////////////////////////////////////////
//
//  Hypersubs provides an alternative way to set your Supersubs in 
//  Fantasyleague.com's Classic Premier League fantasy football game.
//
//  Hypersubs automatically makes clear-cut choices for you, like fielding all 
//  of your full backs when you have no more than two active in a set of fixtures.
//  On those few occasions when you have to leave an active player out, Hypersubs
//  lets you choose.
//
//
//  WHAT YOU NEED   
//  
//  To use this version of Hypersubs, you need either:
//
//      Chrome v20.0 with the Tampermonkey extension v2.5
//  or
//      Firefox v12.0 with the Greasemonkey extension v0.9.8 
//
//  or newer compatible versions. Due to some current (as of Aug'12) incompatibilities 
//  between Greasemonkey and Tampermonkey's facilities for automatic updates, 
//  Firefox+Greasemonkey users need to either check for updates manually from 
//  userscripts.org or uncheck the "Require secure updates" checkbox in the 
//  Greasemonkey options so that automatic updates will work. 
//
// 
//  LIMITATIONS AND DISCLAIMERS
//
//  This version of Hypersubs is intended to be compatible with the Fantasyleague.com 
//  Classic Premier League competition as of August 2012. Other competitions are not 
//  supported.
//
//  Hypersubs relies on the existing structure of the Fantasy League web site. 
//  It will stop working properly -- possibly without any warning! -- as soon as 
//  Fantasy League change how their Supersubs pages are structured.
//
//  Use at your own risk. This program was written as a personal exercise to learn 
//  the basics of a few technologies. It may well have bugs. Always be sure to 
//  check the Fantasy League site or their confirmation email to be certain that 
//  everything went right!
//
//
//  TECHNICAL NOTES
//
//  This is the first time I program in JavaScript, the first time I write a user 
//  script, and the first time I use any of jQuery / jQuery UI / CSS3. I'm still 
//  learning about all of these, and it shows in the code. Large parts of the 
//  program are also a bit weird because they have been translated 
//  semi-automatically from some Scala code that was experimental to begin with. 
//  There's a bit of spaghetti in there, probably some cargo-cult stuff, and quite 
//  possibly some memory leakage. This is also unoptimized, but... 16 players. 
//  
/////////////////////////////////////////////////////////////////////////////////////







////////// CHECK THAT THE BROWSER IS OK AND JQUERY IS AVAILABLE ///////////////////


var HYPERSUBS_VERSION = "v0.1.9";
var FIREFOX_THRESHOLD = 12;
var CHROME_THRESHOLD = 20;
var SITE_COMPATIBILITY_CHECKED_DATE = "August 2012";

function checkBrowser() {
  function checkFor(browserInfo, browserName, majorVersionThreshold) {
    var nameIndex = browserInfo.indexOf(browserName);
    if (nameIndex >= 0) {
      var version = browserInfo.substring(nameIndex + browserName.length + 1);
      var semicolon = version.indexOf(";");
      version = semicolon >= 0 ? version.substring(0, semicolon) : version;
      var space = version.indexOf(" ");
      version = parseInt(space >= 0 ? version.substring(0, space) : version, 10);
      if (version >= 0 && version < majorVersionThreshold) {
        alert("You appear to be running version " + version + " of " + browserName + ", which is not recognized by Hypersubs.\n\n" + 
              "To use Hypersubs, please install a new version of " + browserName + " (" + majorVersionThreshold + "+).");
      }
      return version;
    } else {
      return -1;
    }
  }

  if (checkFor(navigator.userAgent, "Chrome", CHROME_THRESHOLD) < 0) {
    if (checkFor(navigator.userAgent, "Firefox", FIREFOX_THRESHOLD) < 0) {
      alert("You don't appear to be running Firefox or Chrome.\n\nHypersubs only works with Firefox " + FIREFOX_THRESHOLD + ".0+ (with the Greasemonkey extension) and " + 
             "Chrome " + CHROME_THRESHOLD + ".0+ (with the Tampermonkey extension).\n\nYour browser info was detected as:\n" + navigator.userAgent);
      throw "Hypersubs: Incompatible browser.";
    }
  } else {
    if (typeof(jQuery) == "undefined") {
      alert("Failed to load the jQuery framework required by Hypersubs.\n\n" + 
            "One reason why this may happen in Chrome is that you have installed Hypersubs as a regular Chrome script rather than a Tampermonkey script.\n\n" +
            "Make sure you have installed Hypersubs using the Tampermonkey extension (and remove any other installations of Hypersubs).");
      throw "Hypersubs: Failed to load jQuery";
    }
  }
}

checkBrowser();

(function ($) {

  
  
  var currentPage;
  if (/\/Supersubs\.aspx/i.exec(window.location.pathname) != null) {
    currentPage = "supersubs page";
  } else if (/\/SupersubsConfirmation\.aspx/i.exec(window.location.pathname) != null){
    currentPage = "confirmation page";
  } else if (/\/FriendsLeague\/View.aspx/i.exec(window.location.pathname) != null){
    currentPage = "league page";
  } else if (/\/PremierLeague\/Default.aspx/i.exec(window.location.pathname) != null){
    currentPage = "league page";
  } else {
    currentPage = "miscellaneous page";
  }  
  
  if (currentPage == "supersubs page") {
    try {
      $("body").prepend("<div id='hypersubs-splash' style='font-family: Candara, Tahoma, Geneva, sans-serif;\
                                                border-radius: 15px; border: 3px solid #4CA20B; background-color: #285C00; z-index: 10000; \
                                                position: fixed; top: " + ($(window).height() / 2) + "px; left: " + ($(window).width() / 2) + "px;\
                                                width: 440px; height: 150px; margin-left: -220px; margin-top: -75px; text-align: center;'>\
                                                <div style='letter-spacing: 4px; margin-top: 35px; color: white; font-size: 40px;'>HYPERSUBS</div>\
                                                <div style='color: yellow; font-size: 15px; line-height: 25px;'>Will start in a moment.</div></div>");
    } catch (error) {
      console.log("Hypersubs: Failed to display splash screen.");
    }
  }

  $(document).ready(function () {

    console.log("Hypersubs: DOM ready. Now on a " + currentPage + ".");

    ////////// NON-SUPERSUBS PAGES: MISCELLANEOUS FEATURES  /////////////////////////////
    
    try {

      function addHypersubsShortcuts() {
        $("#userTeams table.myTeams tbody tr").each(function() {
          if (isClassicPrem(this)) { 
            $(this).find("td:nth(2)").append("<span style='background: none; margin-top: 0px; height: 14px; width: 14px; background-color: rgba(170,219,129,1);\
                                              border-radius: 6px; position:absolute;' title='Hypersubs'><a href='http://www.fantasyleague.com/Classic/Team/Supersubs.aspx?" + getTeamID(this) + "'\
                                              style='font-size: 11px; font-weight: bold; position:absolute; top: 0px; left: 3px; margin: 0px; color: white; text-decoration: none;'>H</a></span>");
            }
        });
      }

      function getTeamID(teamTr) {
        var teamURL = $(teamTr).find("td:nth(1) a").attr("href");
        var idPartStart = teamURL.indexOf("teamid=");
        if (idPartStart < 0) {
          return null;
        }
        return teamURL.substring(idPartStart);
      }
    
      function isClassicPrem(teamTr) {
        var teamURL = $(teamTr).find("td:nth(1) a").attr("href");
        return /\/Classic\//i.exec(teamURL) != null;
      }

      function setDoneCount(count) {
        GM_setValue("INTERNALfixturesJustSet", count);
      }

      function clearDoneCount() {
        setDoneCount(-1);
      }

      function getDoneCount() {
        return GM_getValue("INTERNALfixturesJustSet", -1);
      }

      function addTeamInfo(tableElem) {
        var teamTrs = $("#userTeams table.myTeams tbody tr");
        var error = { name: "ERROR", week: 0, live: true, total: 0, subsUntil: "", transfers: 0, position: 0 };          

        function addTeamsFrom(teamIndex) {
          if (teamIndex >= teamTrs.length) {
            return;
          }
          if (isClassicPrem(teamTrs[teamIndex])) {
            var url = "http://www.fantasyleague.com/Classic/Team/Default.aspx?" + getTeamID(teamTrs[teamIndex]);
            var dataWrapper = $("<div style='display:none'></div>");
            dataWrapper.load(url + " #wrapper", function(responseText, textStatus) {
              var teamInfo = { };
              var subs = dataWrapper.find("div.supersubs-set");
              if (subs.length > 1) {
                console.log("Hypersubs: More than one supersubs-set element: " + subs.length);
                tableElem.append(formulateTeamInfo(error));
                return;
              }
              if (subs.length == 0) {
                teamInfo.subsUntil = "NOT SET";
              } else {
                teamInfo.subsUntil = subs.text().replace("Supersubs set until ", "").replace("View", "");
              }
              
              var mainInfo = dataWrapper.find("#mainInfo");
              if (mainInfo.length != 1) {
                console.log("Hypersubs: Unexpected number of mainInfo elements: " + mainInfo.length);
                tableElem.append(formulateTeamInfo(error));
                return;
              }
              
              var teamInfoPanel = mainInfo.find("table.general:nth(1)");
              if (mainInfo.length != 1) {
                console.log("Hypersubs: Couldn't find team info panel.");
                tableElem.append(formulateTeamInfo(error));
                return;
              }
              
              teamInfo.name = teamInfoPanel.find("thead tr th:nth(0)").text().replace("Team: ", "");
              teamInfo.week = parseInt(teamInfoPanel.find("tbody tr:nth(0) td:nth(1)").text(), 10);
              teamInfo.total = parseInt(teamInfoPanel.find("tbody tr:nth(2) td:nth(1)").text(), 10);
              teamInfo.transfers = parseInt(teamInfoPanel.find("tbody tr:nth(2) td:nth(4)").text(), 10);
              teamInfo.position = parseInt(teamInfoPanel.find("tbody tr:nth(3) td:nth(4)").text(), 10);
              var package = teamInfoPanel.find("tbody tr:nth(4) td:nth(4)").text();
              teamInfo.live = package == "Silver" || package == "Gold";
              tableElem.append(formulateTeamInfo(teamInfo));
              addTeamsFrom(teamIndex + 1);
            });
          } else {
            addTeamsFrom(teamIndex + 1);
          }
        }

        if (teamTrs.length == 0) {
          tableElem.append(formulateTeamInfo({ name: "N/A", week: 0, live: true, total: 0, subsUntil: "N/A", transfers: 0, position: 0 }));          
        } else {
          addTeamsFrom(0);
        }
      }

      
      function formulateTeamInfo(info) {
        return "<tr><td>" + info.name + "</td><td class='hypersubs-right-aligned'>" + ((info.total - info.week) + " + " + info.week + " = " + info.total) + "</td><td>" + (info.live ? "live" : "&nbsp;") + "</td><td class='hypersubs-right-aligned'>" + info.position + "</td><td class='hypersubs-right-aligned'>" + info.transfers + "</td><td class='hypersubs-right-aligned'>" + info.subsUntil + "</td></tr>"; 
      }
      
      
      function addMoreInfoButton() {
        var thElem = $("#userTeams table.myTeams thead th:first");
        if (thElem.length != 1) {
          console.log("Hypersubs: No place to insert More Info button found on page. This may be due to, e.g., not being logged in.");
          return;
        }

        var MORE_INFO_CSS = ".hypersubs-more-info-tooltip-invisible                       { opacity: 0; }\
                             .hypersubs-more-info-tooltip-visible                         { z-index: 2500; font-family: Candara, Tahoma, Geneva, sans-serif; font-size: 12px; padding: 5px; position: fixed; \
                                                                                            opacity: 0.95; background-color: #9FDAEE; color: black; text-align: left; border: 1px dotted blue; \
                                                                                            box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1); -webkit-box-shadow: 5px 5px rgba(0, 0, 0, 0.1); -moz-box-shadow: 5px 5px rgba(0, 0, 0, 0.1); }\
                             #hypersubs-more-info-tooltip .explanation          { border-top-left-radius: 7px; border-bottom-right-radius: 7px; border-bottom-left-radius: 7px; }\
                             #hypersubs-more-info-tooltip .explanation table th { font-weight: bold; font-size: 15px; padding: 3px 6px 3px 3px; }\
                             #hypersubs-more-info-tooltip .explanation table td { font-size: 14px; padding: 3px 6px 3px 3px; }\
                             #hypersubs-more-info-tooltip .explanation table .hypersubs-right-aligned { text-align: right; }\
                             "; 
        $('head').append('<style type="text/css">' + MORE_INFO_CSS + '</style>');
        $("body").append("<div id='hypersubs-more-info-tooltip'><div class='explanation hypersubs-more-info-tooltip-invisible'></div></div>");
        $("body").append("<div id='hypersubs-more-info-button' style='position: absolute; font-size: 11px; padding: 3px; font-weight: bold; color: rgba(27,117,208,1); text-decoration: underline; background-color: rgba(170,219,129,1); border: 1px solid rgba(130,189,109,1); border-radius: 3px; cursor: pointer !important;'>More&nbsp;Info</div>");

        var button = $("#hypersubs-more-info-button");
        button.position({ my: "right", at: "right", of: thElem, offset: "0px 0px" });
        button.click(function () { 
            var tooltipDiv = $("#hypersubs-more-info-tooltip .explanation");
            if (tooltipDiv.hasClass("hypersubs-more-info-tooltip-visible")) {
              tooltipDiv.removeClass("hypersubs-more-info-tooltip-visible");
              tooltipDiv.addClass("hypersubs-more-info-tooltip-invisible");
            } else {
              tooltipDiv.html("<table><tr><th width='230'>Team</th><th width='80' class='hypersubs-right-aligned'>Points</th><th>Live?</th><th>Position</th><th>Transfers</th><th width='120' class='hypersubs-right-aligned'>Subs Set Until</th></tr></table>");
              tooltipDiv.addClass("hypersubs-more-info-tooltip-visible");
              tooltipDiv.position({ my: "right top", at: "left bottom", of: button, offset: "2px -2px", collision: "fit" });
              addTeamInfo(tooltipDiv.find("table"));
              tooltipDiv.removeClass("hypersubs-more-info-tooltip-invisible");
            }
          });
        $("#hypersubs-more-info-tooltip .explanation").click(function () {
          $(this).removeClass("hypersubs-more-info-tooltip-visible");
          $(this).addClass("hypersubs-more-info-tooltip-invisible");
        });
      }
      
      
      // Confirmation Page
      
      function augmentConfirmationPage() {
        var doneCount = getDoneCount();
        clearDoneCount();
        var prune = GM_getValue("pruneConfirmation", false);
        console.log("Hypersubs: Augmenting confirmation page. " + 
                    (prune ? "Will prune inactives. " : "Won't prune inactives. ") + 
                    (doneCount < 0 ? "No Hypersubs set just before loading this page. " : (doneCount + " fixture block(s) set using Hypersubs. "))); 

        var fixtureBlockDivs = $("div.content table.general"); 
        if (fixtureBlockDivs.length == 0) {
          console.log("Hypersubs: Didn't find any fixture data on the confirmation page. Can't proceed.")
          return;
        }
        if (fixtureBlockDivs.length > 1) {
          throw "Hypersubs: Unexpected formatting on confirmation page. A change/bug in the FL site?";
        }
        var fixtureData = $(fixtureBlockDivs[0]);
        
        fixtureData.find("thead tr").each(function(blockNumber) {
          var dateElem = $(this).find("th:nth(1)");
          if (doneCount >= 0) {
            var thisBlockDone = blockNumber < doneCount;
            dateElem.append("<div style='position: relative; float: right; font-weight: bold; color: " + (thisBlockDone ? "green" : "orange") + "; '>" + (thisBlockDone ? "Hypersubs set" : "Hypersubs NOT SET") + "</div>"); 
          }
        });
        
        fixtureData.children("tbody").each(function() { // for each list of players within a fixture block
          var count = 0; 
          var inNotSelectedPart = false;
          $(this).children("tr").each(function() { // for each row in player list
            var kids = $(this).find("td");
            if (prune && kids.length == 3 && $(kids[1]).hasClass("text-right") && $(kids[1]).hasClass("highlight") && $.trim($(this).children("td:nth(2)").text()) == "") {
              $(this).css('display', 'none'); // hide irrelevant players
            } else if ($(this).find("td:contains('Playing but not selected')").length > 0) {
              inNotSelectedPart = true;
              count = 0;
            } else if (prune) {
              count++;
              if (count % 2 == 0) {
                $(this).addClass("on");
                $(this).removeClass("off");
              } else {
                $(this).removeClass("on");
                $(this).addClass("off");
              }
            } 
            if (inNotSelectedPart) {
              $(this).find('td').css('color', '#ff0000');
            }
          });
        });
      }

      // League Page
      
      function augmentLeaguePage() {
        var openTabs = $("#mainContent div.content ul.tabs li.tab-cur");
        if ($.trim($(openTabs[0]).text()) != "League Table" || $.trim($(openTabs[1]).text()) != "Season") {
          console.log("Hypersubs: Not in the League Table / Season tab; won't augment the page.");
          return;
        }
        if (openTabs.length != 2) {
          throw "Hypersubs: Unexpected number of open tabs on league page: " + openTabs.length + ". Won't augment the page.";
        }
      
        console.log("Hypersubs: Augmenting league page."); 

        createTransferColumn();
      }
      
      
      function createTransferColumn() {
        var reportURL = $("#mainContent div.content ul.tabs li:contains('League Report') a").attr("href");
        var reportWrapper = $("<div style='display:none'></div>");
        reportWrapper.load("http://www.fantasyleague.com" + reportURL + " #mainContent div.content", function(responseText, textStatus) {
          var report = reportWrapper.find("div.content"); 
          if (report.length == 0) {
            throw "Hypersubs: Failed to load League Report data.";
          }
          if (report.length > 1) {
            throw "Hypersubs: Unexpected number of content elements in the League Report page; a change/bug in the FL site?";
          }
          writeTransfers(loadTransfersMade(report));
        });      
      }
      
      function loadTransfersMade(report) {
        var transfersMade = { };
        report.find("div.league-tab div table:not(.general) tbody").each(function() {
          var teamName = $.trim($(this).find("tr:nth(0) th:nth(1)").text().substring("Team: ".length));
          var transfers = parseInt($.trim($(this).find("tr:nth(0) th:nth(2)").text()).substring("Transfers Done: ".length), 10);
          if (teamName == "" || isNaN(transfers)) {
            throw "Hypersubs: Unexpected structure in the League Report page; a change/bug in the FL site?"; 
          }
          if (transfersMade.hasOwnProperty(teamName)) {
            throw "Hypersubs: Team name " + teamName + " is not unique. ";
          } else {
            transfersMade[teamName] = transfers;
          }
        });
        return transfersMade;
     }
      
      function writeTransfers(transfersMade) {
        var dgpHeader = $("div.content table.general thead th:contains('DGP')");
        var insertLocation = dgpHeader.index();
        var teamLocation = $("div.content table.general thead th:contains('Team')").index();
        var managerLocation = $("div.content table.general thead th:contains('Manager')").index();
        if (insertLocation < 0 || teamLocation < 0 || managerLocation < 0) {
          throw "Hypersubs: Couldn't find the appropriate kind of league table; aborting.";
        }
        dgpHeader.after("<th style='width: 26px;' title='Transfers Left'>TR</th>");
        $("div.content table.general tbody tr").each(function() { 
          var managerName = $.trim($(this).find("td:nth(" + managerLocation + ")").text()); 
          var teamName = $.trim($(this).find("td:nth(" + teamLocation + ")").text());
          var dgpCell = $(this).find("td:nth(" + insertLocation + ")");
          dgpCell.after("<td>" + (25 - transfersMade[teamName]) + "</td>");
        });
      }
      
      

      // Choose based on page type:
    
      if (GM_getValue("showHypersubsShortcuts", true)) {
        addHypersubsShortcuts();
      }
    
      if (GM_getValue("showMoreInfoButton", true)) {
        addMoreInfoButton();
      }
    
      if (currentPage == "confirmation page") {
        augmentConfirmationPage();
        return;
      } 
    
      clearDoneCount();

      if (currentPage == "league page") {
        if (GM_getValue("showLeagueTransfers", true)) {
          augmentLeaguePage();
        }
        return;      
      }
    
      if (currentPage == "miscellaneous page") {
        return;      
      }
    
         // else: this is the Supersubs page; proceed with Hypersubs proper
    

      var ownershipComplaint = $("#mainContent:contains('You are not the owner of this team.')");
      if (ownershipComplaint.length > 0) {
        $('#hypersubs-splash').css('display', 'none');
        console.log("Hypersubs: Someone else's supersubs page visited; not starting Hypersubs.");
        return;
      }


///////////////////////////////////// UTILITIES ////////////////////////////////////////////////// 


      // Scala-inspired additions to JavaScript's Array type.

      Array.prototype.size = function () {
        return this.length;
      }
      Array.prototype.count = function (pred) {
        return this.filter(pred).size();
      } 
      Array.prototype.take = function (howMany) {
        return this.slice(0, Math.max(0, howMany));
      }
      Array.prototype.sortNaturally = function () {
        return this.sort(function (a, b) {
          return a.compare(b);
        });
      }
      Array.prototype.foldLeft = function (initial, operation) {
        return this.reduce(operation, initial);
      }
      Array.prototype.flatten = function () {
        var flat = new Array(this.map(function (componentArray) { return componentArray.size(); }).sum());
        var target = 0;
        for (var i = 0; i < this.length; i++) {
          for (var j = 0; j < this[i].length; j++) {
            flat[target] = this[i][j];
            target++;
          }
        }
        return flat;
      }
      Array.prototype.flatMap = function (mapper) {
        return this.map(mapper).flatten();
      }
      Array.prototype.sum = function () {
        return this.foldLeft(0, function (a, b) {
          return a + b;
        });
      }
      Array.prototype.mkString = function (start, middle, end) {
        if (this.size() == 0) { 
          return "";
        } else {
          return start + this.join(middle) + end;            
        }
      }
      Array.prototype.groupBy = function (grouper) {
        var grouped = {};
        for (var i = 0; i < this.length; i++) {
          var value = this[i];
          var key = grouper(value);
          if (grouped.hasOwnProperty(key)) grouped[key] = grouped[key].concat(value);
          else grouped[key] = [value];
        }
        return grouped;
      }
      Array.prototype.contains = function (candidate) {
        return this.indexOf(candidate) >= 0;
      }

      // PlayerName

      function PlayerName(separatedNames, isPureInitialism) {
        this.separatedNames = separatedNames;
        this.isPureInitialism = isPureInitialism;
      }
      PlayerName.cache = {}
      PlayerName.prototype.firstNamesToInitials = function () {
        return new PlayerName([this.firstNames().map(PlayerName._toInitialsDotted), this.lastNames()], this.isPureInitialism);
      }
      PlayerName.prototype.allToInitials = function () {
        var firstInitials = this.firstNames().map(PlayerName._toInitialsTotal);
        var lastInitials = this.lastNames().map(PlayerName._toInitialsTotal);
        return new PlayerName([ [], [firstInitials.concat(lastInitials).mkString("", "", "")] ], true);
      }
      PlayerName.prototype.firstNames = function () {
        return this.separatedNames[0];
      }
      PlayerName.prototype.lastNames = function () {
        return this.separatedNames[1];
      }
      PlayerName.prototype.fullNameString = function () {
        var combined = this.firstNames().concat(this.lastNames()).mkString("", " ", "");
        return this.isPureInitialism ? combined : combined.replace("-", "- ");
      }
      PlayerName._separateNames = function (arrayOfNames) {
        if (arrayOfNames.length < 2) {
          return [[], arrayOfNames];
        }
        var i = 1;
        while (i < arrayOfNames.length - 1 && !PlayerName._startsLastName(arrayOfNames[i])) {
          i++;
        }
        return [arrayOfNames.slice(0, i), arrayOfNames.slice(i)];
      }
      PlayerName.LAST_NAME_START_WORDS = ["de", "da", "di", "do", "das", "dos", "st.", "of", "ben", "bin", "von", "af", "dalla", "al", "el", "auf", "der", "die", "das", "des", "du", "van", "boa", "vaz"];
      PlayerName._startsLastName = function (name) {
        return (name[0].toLowerCase() == name[0]) || PlayerName.LAST_NAME_START_WORDS.indexOf(name.toLowerCase()) >= 0;
      }
      PlayerName._toInitialsDotted = function (name) {
        return name[0] + ".";
      }
      PlayerName._toInitialsTotal = function (name) {
        var shorter = name[0];
        for (var i = 1; i < name.length; i++) {
          var letter = name[i];
          shorter = (letter.toUpperCase() == letter && letter != ".") ? shorter + letter : shorter;
        }
        return shorter;
      }
      PlayerName.fromString = function (nameString) {
        nameString = $.trim(nameString);
        if (PlayerName.cache.hasOwnProperty(nameString)) {
          return PlayerName.cache[nameString];
        }
        var nameObj = new PlayerName(PlayerName._separateNames(nameString.split(/[\s]+/)), false);
        PlayerName.cache[nameString] = nameObj;
        return nameObj;
      }


      ///////////////////////////// THE INTERNAL MODEL ////////////////////////////////////////////////// 


      // Club

      function Club(name) {
        this.name = name;
        this.hasStrongAttack = false;
        this.hasStrongDefense = false;
        Club.values[this.name] = this;
      }
      Club.prototype.isSafeDefendingAgainst = function (opponent) {
        return this.hasStrongDefense || opponent == null || !opponent.hasStrongAttack;
      }
      Club.prototype.compare = function (another) {
        return this.name.localeCompare(another.name);
      }
      Club.prototype.toString = function () {
        return this.name;
      }
      Club.fromString = function (name) {
        if (name == null) {
          return null;
        }
        if (Club.values.hasOwnProperty(name)) {
          return Club.values[name];
        } else {
          return new Club(name);
        }
      }
      Club.values = {}

      // Status

      function Status(id, description, countsAsInactive, likelihoodToPlay) {
        this.id = id;
        this.description = description;
        this.countsAsInactive = countsAsInactive;
        this.likelihoodToPlay = likelihoodToPlay;
      }
      Status.prototype.toString = function () {
        return this.id;
      }
      Status.values = {
        INELIGIBLE: new Status("ineligible", "ineligible to play in this match", true, 10001), // the 10001 is a bit of a hack; cf. Player.fillUpOrdering 
        SUSPENDED: new Status("suspended", "suspended", true, 2),
        INTERNATIONALDUTY: new Status("internationalduty", "on duty elsewhere", true, 10),
        INJURED: new Status("injured", "injured", true, 100),
        DOUBTFUL: new Status("doubtful", "doubtful", false, 1000),
        LATEFITNESSTEST: new Status("latefitnesstest", "late fitness test", false, 2000),
        UNKNOWN: new Status("unknown", "unknown status type; considered ok", false, 9999),
        READY: new Status("ready", "ready to play", false, 10000)
      }

      // Position

      function Position(name, fullName, isSafe, min, max) {
        this.name = name;
        this.fullName = fullName;
        this.isSafe = isSafe;
        this.min = min;
        this.max = max;
      }
      Position.prototype.compare = function (another) {
        return this.name.localeCompare(another.name);
      }
      Position.prototype.toString = function () {
        return this.name;
      }
      Position.values = {
        GK: new Position("GK", "goalkeeper", false, 1, 1),
        FB: new Position("FB", "full back", false, 2, 2),
        CB: new Position("CB", "centre back", false, 2, 3),
        MF: new Position("MF", "midfielder", true, 3, 5),
        ST: new Position("ST", "striker", true, 1, 3)
      }

      // Player

      function Player(shirtNumber, name, position, club, opponentOrNull, atHome, status, statusDetails) {
        this.shirtNumber = shirtNumber;
        this.name = name;
        this.position = position;
        this.club = club;
        this.status = status;
        this.statusDetails = this._processDetails(statusDetails);
        this.theoreticalOpponent = opponentOrNull;
        this.opponent = this.status == Status.values.INELIGIBLE ? null : opponentOrNull;
        this.atHome = atHome;
      }
      Player.prototype._processDetails = function(detailsString) {
        if ((this.status != Status.values.INJURED && this.status != Status.values.LATEFITNESSTEST && this.status != Status.values.DOUBTFUL) || typeof(detailsString) == "undefined") {
          return "";
        } else {
          return ": " + detailsString;
        }
      }
      Player.prototype.isLikelyActive = function () {
        return this.hasOpponent() && !this.status.countsAsInactive;
      }
      Player.prototype.hasOpponent = function () {
        return this.opponent != null;
      }
      Player.prototype.isSafe = function () {
        return this.position.isSafe || this.club.isSafeDefendingAgainst(this.opponent)
      }
      Player.prototype.isA = function (positionName) {
        return this.position == Position.values[positionName];
      }
      Player.prototype.toString = function () {
        return this.name + "(" + this.club.name + " " + this.position + ")" + (this.hasOpponent() ? " vs. " + this.opponent.name + " (" + this.status + ")" + (this.isSafe() ? "" : " DANGER!") : "(inactive)");
      }
      Player.prototype.activityHTML = function () {
        if (this.hasOpponent()) {
            return "<span class='vs'>vs.</span><span class='opponent'>" + (this.atHome ? this.opponent.name.toUpperCase() : this.opponent.name.toLowerCase()) + "</span>";
        } else {
            return "<span class='inactive'>(idle)</span>";
        }
      }
      Player.prototype.fullHTML = function () {
        var name = "<div class='name'>" + this.name + "</div>";
        var shirtPic = "<div class='shirtPic club-medium club-medium-" + this.club.picName + (this.isA("GK") ? "-gk" : "") + "'></div>";
        var clubAndPos = "<div class='club-and-pos'>" + this.position.fullName + " for " + this.club.name + "</div>";
        var opponent = "<div class='opponent'>" + (this.theoreticalOpponent != null ? ("game " + (this.atHome ? "at home to " : "away at ") + this.theoreticalOpponent.name) : "no game in this set of fixtures") + "</div>";
        var status = (this.theoreticalOpponent != null && this.status != Status.values.READY) ? "<div class='status'>" + this.status.description + this.statusDetails + "</div>" : "";
        return name + shirtPic + clubAndPos + opponent + status;
      }
      Player.prototype.compare = function (another) {
        var pc = this.position.compare(another.position);
        if (pc != 0) return pc;
        var cc = this.club.compare(another.club);
        if (cc != 0) return cc;
        return this.name.localeCompare(another.name);
      };
      Player.fillUpOrdering = function (player, another) {
        var mine = !player.hasOpponent();
        var yours = !another.hasOpponent();
        if (mine != yours) return mine - yours;
        mine = -player.status.likelihoodToPlay;
        yours = -another.status.likelihoodToPlay;
        if (mine != yours) return mine - yours;
        return player.compare(another);
      }
      Player.naturalOrdering = function (player, another) {
        return player.compare(another);
      }

      // PositionChoice 

      function PositionChoice(position, choosable, chosen, onTheBench, min, max) {
        this.position = position;
        this.choosable = choosable;
        this.chosen = chosen;
        this.onTheBench = onTheBench;
        this.min = min;
        this.max = max;
        this.chosenCount = this.chosen.size();
      }
      PositionChoice.create = function (position, choosable) {
        return new PositionChoice(position, choosable, [], [], position.min, position.max);
      }
      PositionChoice.prototype.playersInSquad = function () {
        return this.chosenCount + this.onTheBench.size() + this.choosable.size();
      }
      PositionChoice.prototype.likelyActiveCount = function () {
        return this.choosable.count(function (p) {
          return p.isLikelyActive();
        });
      }
      PositionChoice.prototype.potentiallyActiveCount = function () {
        return this.choosable.count(function (p) {
          return p.hasOpponent();
        });
      }
      PositionChoice.prototype.dangerCount = function () {
        return this.position.isSafe ? 0 : this.choosable.count(function (p) {
          return !p.isSafe();
        });
      }
      PositionChoice.prototype.forcedChoices = function () {
        return this.fieldOnlyOnesAvailable().fillToMinWhenNobodyPlaying(true);
      }
      PositionChoice.prototype.fieldOnlyOnesAvailable = function () {
        return this.choosable.size() == this.min ? this.field(this.choosable) : this;
      }
      PositionChoice.prototype.fillToMinWhenNobodyPlaying = function (beSafe) {
        return ((beSafe ? this.potentiallyActiveCount() : this.likelyActiveCount()) == 0) ? this.fillToMin() : this;
      }
      PositionChoice.prototype.fieldObviousActives = function () {
        return (this.isSafe() && this.likelyActiveCount() <= this.min) ? this.fieldAllActives() : this;
      }
      PositionChoice.prototype.fieldAllActives = function () {
        return this.field(this.choosable.filter(function (p) {
          return p.isLikelyActive();
        }));
      }
      PositionChoice.prototype.isSafe = function () {
        return this.dangerCount() == 0;
      }
      PositionChoice.prototype.isDangerouslySelected = function () {
        return this.chosen.some(function(player) { return !player.isSafe(); }); 
      }
      PositionChoice.prototype.fieldOne = function (toBeMoved) {
        return this.field([toBeMoved]);
      }
      PositionChoice.prototype.field = function (toBeMoved) {
        return new PositionChoice(this.position, this.choosable.filter(function (p) {
          return !toBeMoved.contains(p);
        }), this.chosen.concat(toBeMoved), this.onTheBench, this.min - toBeMoved.size(), this.max - toBeMoved.size());
      }
      PositionChoice.prototype.reset = function () {
        return this._unfield(this.chosen)._unbench(this.onTheBench);
      }
      PositionChoice.prototype._unfield = function (toBeMoved) {
        return new PositionChoice(this.position, this.choosable.concat(toBeMoved), this.chosen.filter(function (p) {
          return !toBeMoved.contains(p);
        }), this.onTheBench, this.min + toBeMoved.size(), this.max + toBeMoved.size());
      }
      PositionChoice.prototype._unbench = function (toBeMoved) {
        return new PositionChoice(this.position, this.choosable.concat(toBeMoved), this.chosen, this.onTheBench.filter(function (p) {
          return !toBeMoved.contains(p);
        }), this.min, this.max);
      }
      PositionChoice.prototype.bench = function (toBeMoved) {
        return new PositionChoice(this.position, this.choosable.filter(function (p) {
          return !toBeMoved.contains(p);
        }), this.chosen, this.onTheBench.concat(toBeMoved), this.min, this.max);
      }
      PositionChoice.prototype.benchAllInactives = function () {
        return this.bench(this.choosable.filter(function (p) {
          return !p.isLikelyActive();
        }))
      };
      PositionChoice.prototype.reduce = function () {
        return this.bench(this.choosable.filter(function (p) {
          return !p.isLikelyActive() || !p.isSafe();
        }));
      }
      PositionChoice.prototype.isValid = function () {
        return this.choosable.size() >= this.min;
      }
      PositionChoice.prototype.isOveractive = function () {
        return this.likelyActiveCount() > this.max;
      }
      PositionChoice.prototype.fillToMin = function () {
        return this.field(this.choosable.sort(Player.fillUpOrdering).take(this.min));
      }
      PositionChoice.prototype.isDone = function () {
        return this.max == 0;
      }
      PositionChoice.prototype.benchAll = function () {
        return this.bench(this.choosable);
      }
      PositionChoice.prototype.getAllPlayers = function () {
        return this.chosen.concat(this.choosable, this.onTheBench);
      }
      PositionChoice.prototype._minimumBenchSize = function () {
        return this.onTheBench.size() + Math.max(0, this.choosable.size() - this.max);
      }
      PositionChoice.prototype.addToIndex = function (indexed, benchStart) {
        var fieldNames = ["choosable", "onTheBench", "chosen"];
        var locationNames = ["squad", "bench", "team"];
        for (var i = 0; i < fieldNames.length; i++) {
          var players = this[fieldNames[i]];
          if (fieldNames[i] == "onTheBench") {
            for (var j = 0; j < players.size(); j++) {
              indexed[players[j]] = { group: locationNames[i], position: this.position, index: j + benchStart };
            }
          } else {
            for (var j = 0; j < players.size(); j++) {
              indexed[players[j]] = { group: locationNames[i], position: this.position, index: j, of: players.size() };
            }
          }
        }
        return this._minimumBenchSize();
      }

      // HypersubsSelection

      function HypersubsSelection(choiceLists) {
        this.choiceLists = choiceLists;
        this.choiceListsByPosition = {};
        this.choiceListsByPosition["GK"] = choiceLists[0];
        this.choiceListsByPosition["FB"] = choiceLists[1];
        this.choiceListsByPosition["CB"] = choiceLists[2];
        this.choiceListsByPosition["MF"] = choiceLists[2];
        this.choiceListsByPosition["ST"] = choiceLists[2];
        this.playerStates = this._indexByPlayer();
      }
      HypersubsSelection.createFromSquad = function (squad, smartFill) {
        var playersByPosition = squad.groupBy(function (p) {
          return p.position.name;
        });
        return new HypersubsSelection([ChoiceList.create(playersByPosition, [Position.values.GK], 1, smartFill),
                                   ChoiceList.create(playersByPosition, [Position.values.FB], 2, smartFill),
                                   ChoiceList.create(playersByPosition, [Position.values.CB, Position.values.MF, Position.values.ST], 8, smartFill)
                                  ]);
      }
      HypersubsSelection.prototype._indexByPlayer = function () {
        var indexed = {};
        var benchStartForCL = 0;
        for (var i = 0; i < this.choiceLists.length; i++) {
          var choiceList = this.choiceLists[i];
          var benchOffset = 0;
          for (var j = 0; j < choiceList.positions.size(); j++) {
            benchOffset += choiceList.positions[j].addToIndex(indexed, benchStartForCL + benchOffset);
          }
          benchStartForCL += choiceList.benchSize();
        }
        return indexed;
      }
      HypersubsSelection.prototype.pickManuallyByPlayer = function (player, smartFill) {
        var targetChoiceList = this.choiceListsByPosition[player.position.name];
        var newArray = new Array(this.choiceLists.length);
        for (var i = 0; i < this.choiceLists.length; i++) {
          if (this.choiceLists[i] == targetChoiceList) {
            newArray[i] = this.choiceLists[i].pickManuallyByPlayer(player, smartFill);
          } else {
            newArray[i] = this.choiceLists[i];
          }
        }
        return new HypersubsSelection(newArray);
      }
      HypersubsSelection.prototype.greatestChoosableCount = function () {
        return Math.max(this.choiceLists[0].greatestChoosableCount(), this.choiceLists[1].greatestChoosableCount(), this.choiceLists[2].greatestChoosableCount());
      }
      HypersubsSelection.prototype.reset = function (smartFill) {
        return new HypersubsSelection([this.choiceLists[0].reset(smartFill), this.choiceLists[1].reset(smartFill), this.choiceLists[2].reset(smartFill)]);
      }
      HypersubsSelection.prototype.isDone = function () {
        return this.choiceLists.every(function (cl) {
          return cl.isDone();
        });
      }
      HypersubsSelection.prototype.getAllPlayers = function () {
        return this.choiceLists[0].getAllPlayers().concat(this.choiceLists[1].getAllPlayers(), this.choiceLists[2].getAllPlayers());
      }
      HypersubsSelection.prototype.isDangerouslySelected = function () {
        return this.choiceLists[0].isDangerouslySelected() || this.choiceLists[1].isDangerouslySelected() || this.choiceLists[2].isDangerouslySelected();
      }
      
        
    // ChoiceList

    function ChoiceList(positions, totalChosen, open) {
        this.positions = positions;
        this.totalChosen = totalChosen;
        this.open = open;
        var that = this;
        this.positions.forEach(function (posChoice, index) {
          that["pos" + posChoice.position.name] = posChoice;
        });
      }
      ChoiceList.create = function (squad, positions, size, smartFill) {
        var positionChoices = positions.map(function (pos) {
          return PositionChoice.create(pos, squad[pos.name]);
        });
        return new ChoiceList(positionChoices, 0, size).reset(smartFill);
      }
      ChoiceList.prototype._derive = function (formula) {
        var newPositions = formula(this.positions);
        var nowChosen = newPositions.map(function (p) {
          return p.chosenCount;
        }).sum();
        return new ChoiceList(newPositions, nowChosen, this.open - (nowChosen - this.totalChosen))
      }
      ChoiceList.prototype._deriveWith = function (formula) {
        var remover = function (poslist, nextPos) {
            return poslist.filter(function (pos) {
              return pos != nextPos;
            });
          };
        var replacer = function (current, nextPos) {
            return current._derive(function (poslist) {
              return remover(poslist, nextPos).concat(formula(nextPos));
            })
          };
        return this.positions.foldLeft(this, replacer);
      }
      ChoiceList.prototype.benchSize = function () {
        return this.totalPlayers() - this.open - this.totalChosen;
      }
      ChoiceList.prototype.totalPlayers = function () {
        return this.positions.map(function (pos) {
          return pos.playersInSquad();
        }).sum();
      }
      ChoiceList.prototype.likelyActiveCount = function () {
        return this.positions.map(function (pos) {
          return pos.likelyActiveCount();
        }).sum();
      }
      ChoiceList.prototype.isDone = function () {
        return this.open == 0;
      }
      ChoiceList.prototype._forcedChoices = function () {
        return this._derive(function (poslist) {
          return poslist.map(function (pos) { return pos.forcedChoices(); });
        });
      }
      ChoiceList.prototype._doSmartFill = function () {
        return this._derive(function (poslist) { return poslist.map(function (pos) { return pos.fillToMinWhenNobodyPlaying(false); }); })
                   ._derive(function (poslist) { return poslist.map(function (pos) { return pos.fieldObviousActives(); }); })
                   ._fieldUnconflictingSafes()._pruneSelection()._fillUpIfDone(false)
                   ._benchLeftovers();
      }
      ChoiceList.prototype._doStupidFill = function () {
        return this._fillUpIfDone(true)._benchLeftovers();
      }
      ChoiceList.prototype._fieldUnconflictingSafes = function () {
        var slotsToBeFilled = this.open - this.positions.map(function (pos) {
          return Math.max(0, pos.min - pos.likelyActiveCount()); 
        }).sum();
        return (this.likelyActiveCount() <= slotsToBeFilled && this.positions.count(function (pos) { return pos.isOveractive(); }) <= 1) ? 
               this._derive(function (poslist) { return poslist.map(function (pos) { return (pos.isOveractive() || !pos.isSafe()) ? pos : pos.fieldAllActives(); }); }) : 
               this;
      }
      ChoiceList.prototype._pruneSelection = function () {
        var hypotheticalTeam = this.positions.map(function (pos) {
          return pos.reduce();
        });
        if (hypotheticalTeam.every(function (pos) {
          return pos.isValid();
        }) && hypotheticalTeam.map(function (pos) {
          return Math.min(pos.max, pos.choosable.size());
        }).sum() >= this.open) {
          return this._derive(function (poslist) {
            return poslist.map(function (pos) {
              return pos.benchAllInactives();
            });
          });
        } else {
          return this;
        }
      }
      ChoiceList.prototype._fillUpIfDone = function (beSafe) {
        var done = beSafe ? 
                   this.positions.every(function (pos) { return pos.potentiallyActiveCount() == 0; }) : 
                   this.positions.every(function (pos) { return pos.likelyActiveCount() == 0; });
        return done ? this._fillEachToMin()._fillToGlobalMax() : this;
      }
      ChoiceList.prototype._fillEachToMin = function () {
        return this._deriveWith(function (pos) {
          return pos.fillToMin();
        });
      }
      ChoiceList.prototype._fillToGlobalMax = function () {
        var bestsPerPosition = this.positions.map(function (pos) {
          return pos.choosable.sort(Player.fillUpOrdering).take(pos.max);
        });
        var selected = bestsPerPosition.flatten().sort(Player.fillUpOrdering).take(this.open);
        var toBeAdded = selected.groupBy(function (p) {
          return p.position.name;
        });
        return this._deriveWith(function (pos) {
          return toBeAdded.hasOwnProperty(pos.position.name) ? pos.field(toBeAdded[pos.position.name]) : pos;
        });
      }
      ChoiceList.prototype._benchLeftovers = function () {
        var cl = this;
        var urgencyCheck = function (position, cl) { return cl.open > 0 && position.min == cl.open; };
        var listsWithNonUrgentsBenched = ((this.positions.some(function (pos) { return urgencyCheck(pos, cl); })) ? 
                                           this.positions.map(function (pos) { return urgencyCheck(pos, cl) ? pos : pos.benchAll(); }) : 
                                           this.positions);
        var urgentsDone = this._derive(function (pos) { return listsWithNonUrgentsBenched; });
        return (this.isDone()) ? 
                urgentsDone._derive(function (poslist) { return poslist.map(function (pos) { return pos.benchAll(); }); }) : 
                urgentsDone._derive(function (poslist) { return poslist.map(function (pos) { return (pos.isDone()) ? pos.benchAll() : pos; }); });
      }
      ChoiceList.prototype.toString = function () {
        var chosen = this.positions.flatMap(function (pos) { return pos.chosen; }).sortNaturally();
        var choosable = this.positions.flatMap(function (pos) { return pos.choosable; }).sortNaturally();
        var bench = this.positions.flatMap(function (pos) { return pos.onTheBench; }).sortNaturally();
        return this.positions.map(function (pos) { return pos.position; }).mkString(
              "BOX FOR: ", " ", "\n") + 
              chosen.mkString("CHOSEN (" + chosen.size() + "):   \t", " ---- ", "\n") + 
              choosable.mkString("CHOOSE " + this.open + " FROM:\t", " ---- ", "\n") + 
              bench.mkString("BENCH (" + bench.size() + "):   \t", " ---- ", "\n");
      }
      ChoiceList.prototype.modifyManually = function (chosenOne, operation) {
        return this._derive(function (poslist) {
          return poslist.map(function (pos) {
            return pos.position == chosenOne.position ? operation(pos) : pos;
          });
        });
      }
      ChoiceList.prototype.pickManuallyByPlayer = function (chosenOne, smartFill) {
        var modified = this.modifyManually(chosenOne, function (pos) { return pos.fieldOne(chosenOne); });
        return smartFill ? modified._benchLeftovers()._doSmartFill() : modified._doStupidFill();
      }
      ChoiceList.prototype.reset = function (smartFill) {
        var refreshed = this._derive(function (poslist) { return poslist.map(function (pos) { return pos.reset(); }); })._forcedChoices();
        return smartFill ? refreshed._doSmartFill() : refreshed._doStupidFill();
      }
      ChoiceList.prototype.greatestChoosableCount = function () {
        return this.positions.foldLeft(0, function (result, current) {
          return Math.max(result, current.choosable.size());
        });
      }
      ChoiceList.prototype.getAllPlayers = function () {
        return this.positions.foldLeft([], function (result, current) {
          return result.concat(current.getAllPlayers());
        });
      }
      ChoiceList.prototype.isDangerouslySelected = function () {  
        return this.positions.some(function (pos) { return pos.isDangerouslySelected(); }); 
      }


      /////////////////////////////// GUI CONSTANTS ////////////////////////////////////////////////////////  

      // var FANTASY_LEAGUE_INJURY_ICONS = "http://www.fantasyleague.com/Themes/Classic/default/images/icons/InjuryIcons_16x16.gif";
      var TWEAKED_INJURY_ICONS = "http://img31.imageshack.us/img31/1733/injuryicons16x16transpa.gif";
      var INJURY_ICON_OFFSETS = {}
      INJURY_ICON_OFFSETS[Status.values.LATEFITNESSTEST.id] = "0px 0px";
      INJURY_ICON_OFFSETS[Status.values.INTERNATIONALDUTY.id] = "-16px 0px";
      INJURY_ICON_OFFSETS[Status.values.INJURED.id] = "-32px 0px";
      INJURY_ICON_OFFSETS[Status.values.SUSPENDED.id] = "-48px 0px";
      INJURY_ICON_OFFSETS[Status.values.DOUBTFUL.id] = "-64px 0px";
      INJURY_ICON_OFFSETS[Status.values.INELIGIBLE.id] = "-80px 0px";

      var MAIN_DIALOG_WIDTH = 900;
      var MAIN_DIALOG_HEIGHT = 725;
      var CONFIRMATION_DIALOG_WIDTH = 460;
      var SETTINGS_DIALOG_WIDTH = 340;
      var HELP_DIALOG_WIDTH = 600;
      var HELP_DIALOG_HEIGHT = 600;
      var SECONDARY_DIALOG_OPACITY = 0.94;

      
      var Z_TOOLTIP = 2100;
      var Z_UNDO_HINT = 2000;
      var Z_ANIMATED_PLAYER = 2200;
      var Z_STATIC_PLAYER = 1800;

      
      var PLAYER_COLOR_SCHEME = {
        white: {
          lighter: "#FFFFFF",
          darker: "#CCCCCC",
          border: "#AAAAAA",
          explanation: "idle"
        },
        red: {
          lighter: "#F7ABAB",
          darker: "#FF5151",
          border: "#7A5555",
          explanation: "dangerous fixture"
        },
        orange: {
          lighter: "#FFB05B",
          darker: "#AF793F",
          border: "#C48746",
          explanation: "dangerous, but presumably won't play"
        },
        grey: {
          lighter: "#BFBFBF",
          darker: "#929292",
          border: "#555555",
          explanation: "presumably won't play"
        },
        green: {
          lighter: "rgba(170,219,129,1)",
          darker: "rgba(115,153,92,1)",
          border: "#637F4B",
          explanation: "ready for action"
        },
        blue: {
          lighter: "#ACC2F2",
          darker: "#84C9B3",
          border: "#6AA08E",
          explanation: "no big worries"
        }
      };
      
      var TEAM_SHAPE_X = {
        GK: [
          [10]
        ],
        FB: [
          [205, 205]
        ],
        CB: [
          [120, 120, 120],
          [140, 140]
        ],
        MF: [
          [372, 305, 305, 372, 372],
          [350, 305, 305, 350],
          [325, 325, 325]
        ],
        ST: [
          [457, 487, 457],
          [467, 467],
          [477]
        ]
      };

      var TEAM_SHAPE_Y = {
        GK: [
          [106]
        ],
        FB: [
          [6, 206]
        ],
        CB: [
          [31, 106, 181],
          [66, 146]
        ],
        MF: [
          [6, 56, 156, 206, 106],
          [4, 68, 144, 208],
          [26, 106, 186]
        ],
        ST: [
          [16, 106, 196],
          [66, 146],
          [106]
        ]
      };

      var BENCH_SHAPE_X = [0, 65, 0, 65, 0];
      var BENCH_SHAPE_Y = [0, 50, 100, 150, 200];

      var SELECTOR_SHAPE_X = [7, 74, 7, 74, 7, 74, 7, 74, 7, 74];
      var SELECTOR_SHAPE_Y = [5, 53, 101, 149, 197, 245, 293, 341, 389, 437];
      
        
      var MAX_PLAYER_NAME_FONT_SIZE = 14;
      var MIN_PLAYER_NAME_FONT_SIZE = 9;
      var NAME_MAX_WIDTH = 62;  
      var NAME_MAX_HEIGHT = 36;

      var MONTHS = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      

      /////////////////////////////////// CSS AND HTML ////////////////////////////////////////////


      var HYPERSUBS_DIALOG_CSS =
    //  GENERAL
    "\
.hypersubs-dialog                                 { font-size: 13px; position: absolute; color: white; }\
.hypersubs-dialog p                               { margin: 9px 0px 3px 0px; }\
.hypersubs-dialog ul                              { margin: 1px; }\
.hypersubs-dialog ul li                           { margin: 3px 5px 3px 20px; }\
.hypersubs-dialog h2                              { color: white; margin-top: 15px; font-size: 19px; }\
.hypersubs-dialog h3                              { color: white; margin-top: 15px; font-size: 18px; }\
.hypersubs-dialog em                              { color: yellow; }\
.hypersubs-dialog .button-name                    { }\
.hypersubs-dialog .question                       { color: #dddddd; font-weight: bold; text-decoration: underline; }\
.cantselect                                       { -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; user-select: none; cursor: default; }\
" +
      // MAIN DIALOG, BIG DIVS:
      "\
#hypersubs-main-dialog                            { font-size: 13px; font-family: 'lucida grande', tahoma, verdana, arial, sans-serif; }\
#hypersubs-content                                { position: absolute; top: 0px; left: 0px; width: 800px; height: 630px; font-size: 13px; color: black; }\
#hypersubs-team-and-bench                         { position: absolute; top: 0px; left: 0px; height: 325px; width: 855px; overflow: auto; }\
#hypersubs-squad                                  { position: absolute; top: 300px; left: 0px; width: 880px; height: 320px; }\
#hypersubs-team                                   { position: absolute; top: 20px; left: 235px; width: 600px; height: 281px; border: 2px solid #f2f2f2; }\
#hypersubs-bench                                  { position: absolute; top: 30px; left: 45px; border-radius: 5px; width: 145px; height: 260px; text-align: center; }\
#hypersubs-selector-container                     { position: absolute; top: 30px; width: 860px; height: 300px; overflow: auto; }\
#hypersubs-selector-container .hypersubs-selector { position: relative; float: left; top: 0px; left: 10px; width: 145px; min-height: 290px; background-color: #3A8104; border-radius: 5px; padding: 5px; }\
#hypersubs-right-column                           { position: absolute; top: 22px; left: 861px; width: 25px; height: 608px; }\
" + 
      // PLAYER CIRCLES:
      "\
#hypersubs-content .hypersubs-player              { position: absolute; width: 70px; height: 70px; border-radius: 50%; cursor: default; text-align: center;}\
#hypersubs-content .hypersubs-player .topBit      { position: absolute; width: 70px; height: 15px; overflow: hidden; color: #444444; }\
#hypersubs-content .hypersubs-player .club        { font-size: 10px; margin-right: 3px; }\
#hypersubs-content .hypersubs-player .position    { font-size: 10px; font-weight: 900; }\
#hypersubs-content .hypersubs-player .middleBit   { position: absolute; height: " + NAME_MAX_HEIGHT + "px; left: 4px; width: " + NAME_MAX_WIDTH + "px; top: 16px; margin: 0px; padding: 0px; }\
#hypersubs-content .hypersubs-player .name        { position: absolute; left: 0px; top: 50%; height: " + NAME_MAX_HEIGHT + "px; width: " + (NAME_MAX_WIDTH) + "px; overflow: visible; }\
#hypersubs-content .hypersubs-player .lowerBit    { position: absolute; width: 70px; top: 48px; height: 16px; overflow: hidden; }\
#hypersubs-content .hypersubs-player .vs          { font-size: 9px; margin-right: 1px; }\
#hypersubs-content .hypersubs-player .opponent    { font-size: 12px; }\
#hypersubs-content .hypersubs-player .inactive    { font-size: 12px; }\
#hypersubs-content .hypersubs-player .status      { position: absolute; bottom: 3px; right: 1px; overflow: hidden; width: 16px; height: 16px; background: url(" + TWEAKED_INJURY_ICONS +") no-repeat 0 0 }\
.hypersubs-player-hover                           { border: 2px solid #333333 !important; cursor: pointer !important; }\
.hypersubs-player-name-test                       { position: fixed; visibility: hidden; text-align: center }\
#hypersubs-player-name-height-test                { top: 100px; left: 300px; height: auto; }\
#hypersubs-player-name-width-test                 { top: 100px; left: 600px; height: auto; width: auto; }\
" +
      // FLANGE COUNTER:
      "\
#hypersubs-flange-counter                            { position: absolute; width: 18px; height: auto; bottom: 3px; left: 2px; }\
#hypersubs-flange-counter .hypersubs-flange          { position: relative; float: left; width: 15px; height: 15px; margin: 2px; padding: 1px; font-size: 11px; border-radius: 3px; text-align: center; overflow: hidden; }\
#hypersubs-flange-counter .hypersubs-flange-current  { margin: 1px; border: 1px solid red; }\
#hypersubs-flange-counter .hypersubs-flange-skipped  { margin: 1px; border: 1px solid rgba(115,153,92,1); }\
#hypersubs-flange-counter .hypersubs-flange-reviewed { background-color: rgba(115,153,92,1); }\
#hypersubs-flange-counter .hypersubs-flange-danger   { color: red; }\
" +
      // TOOLTIPS:
      "\
.hypersubs-tooltip-invisible                       { opacity: 0; }\
.hypersubs-tooltip-visible                         { z-index: " + Z_TOOLTIP + "; transition: opacity 0.1s linear 1.0s; -moz-transition: opacity 0.1s linear 1.0s; \
                                                     -webkit-transition: opacity 0.1s linear 1.0s; font-family: Candara, Tahoma, Geneva, sans-serif; font-size: 12px; \
                                                     padding: 5px; position: fixed; opacity: 0.9; background-color: #9FDAEE; color: black; text-align: left; \
                                                     border: 1px dotted blue; box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1); -webkit-box-shadow: 5px 5px rgba(0, 0, 0, 0.1); -moz-box-shadow: 5px 5px rgba(0, 0, 0, 0.1); }\
#hypersubs-player-tooltip .explanation            { border-top-right-radius: 7px; border-bottom-right-radius: 7px; border-bottom-left-radius: 7px; }\
#hypersubs-player-tooltip .name                   { min-width: 250px; text-align: center; text-decoration: underline; font-size: 14px; margin-bottom: 2px;}\
#hypersubs-player-tooltip .shirtPic               { position:relative; float:left; margin-right: 2px;}\
#hypersubs-player-tooltip .clubAndPos             { }\
#hypersubs-player-tooltip .opponent               { }\
#hypersubs-player-tooltip .status                 { }\
#hypersubs-player-tooltip .color                  { }\
#hypersubs-flange-tooltip .explanation            { text-align: center; border-top-left-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; }\
#hypersubs-undo-hint                              { position: fixed; font-size: 14px; font-family: Candara, Tahoma, Geneva, sans-serif; border: 1px dotted black; \
                                                    background-color: yellow; color: black; padding: 5px; z-index: " + Z_UNDO_HINT + "; border-top-right-radius: 7px; \
                                                    border-bottom-right-radius: 7px; border-bottom-left-radius: 7px; box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1); \
                                                    -webkit-box-shadow: 5px 5px rgba(0, 0, 0, 0.1); -moz-box-shadow: 5px 5px rgba(0, 0, 0, 0.1); height: auto; width: 255px; opacity: 0.0;}\
" +
      // HELP: 
      "\
#hypersubs-help-button                            { position: absolute; left: 1px; top: 2px; width: 20px; height: 20px; }\
.hypersubs-secondary-dialog                       { font-size: 14px; font-family: Candara, Tahoma, Geneva, sans-serif; }\
" +
      // SETTINGS DIALOG:
      "\
#hypersubs-preferences-dialog                     { }\
.hypersubs-setting-item                           { padding: 3px; }\
.hypersubs-textfield                              { width: 260px; }\
" +
      // LABELS AND ADVICE:
      "\
.hypersubs-vertical                               { transform: rotate(270deg); -webkit-transform: rotate(270deg); -moz-transform: rotate(270deg); }\
.hypersubs-title                                  { font-size: 18px; color: yellow; letter-spacing: 1px; }\
#hypersubs-title-bench                            { position: absolute; top: 120px; left: -120px; width: 200px; height: 20px; color: yellow;  }\
#hypersubs-title-team                             { position: absolute; top: 65px; left: -117px; width: 200px; height: 20px; color: yellow;  }\
.hypersubs-advice                                 { position: absolute; font-size: 13px; color: yellow; text-align: center; height: 20px; top: 13px; }\
#hypersubs-advice-gk                              { left: 15px; width: 145px; }\
#hypersubs-advice-fb                              { left: 195px; width: 145px; }\
#hypersubs-advice-cb                              { left: 375px; width: 145px; }\
#hypersubs-advice-mf                              { left: 375px; width: 465px; }\
#hypersubs-advice-st                              { left: 695px; width: 145px; }\
";

      var HYPERSUBS_HTML = "\
<div id='hypersubs-main-dialog'>\
  <div id='hypersubs-player-tooltip'><div class='explanation hypersubs-tooltip-invisible'></div></div>\
  <div id='hypersubs-flange-tooltip'><div class='explanation hypersubs-tooltip-invisible'></div></div>\
  <div id='hypersubs-content' class='cantselect'>\
    <div id='hypersubs-player-name-height-test' class='hypersubs-player-name-test'></div>\
    <div id='hypersubs-player-name-width-test' class='hypersubs-player-name-test'></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div class='hypersubs-player cantselect'><div class='topBit'><span class='club'></span><span class='position'></span></div><div class='middleBit'><span class='name'></span></div><div class='lowerBit'></div><div class='status'></div></div>\
    <div id='hypersubs-squad' class='cantselect'>\
      <div id='hypersubs-advice-gk' class='hypersubs-advice cantselect'></div>\
      <div id='hypersubs-advice-fb' class='hypersubs-advice cantselect'></div>\
      <div id='hypersubs-advice-cb' class='hypersubs-advice cantselect'></div>\
      <div id='hypersubs-advice-mf' class='hypersubs-advice cantselect'></div>\
      <div id='hypersubs-advice-st' class='hypersubs-advice cantselect'></div>\
      <div id='hypersubs-selector-container' class='cantselect'>\
        <div class='hypersubs-selector cantselect' position='GK' style='margin-right: 22px'></div>\
        <div class='hypersubs-selector cantselect' position='FB' style='margin-right: 22px'></div>\
        <div class='hypersubs-selector cantselect' position='CB' style='margin-right: 5px'></div>\
        <div class='hypersubs-selector cantselect' position='MF' style='margin-right: 5px'></div>\
        <div class='hypersubs-selector cantselect' position='ST'></div>\
      </div>\
    </div>\
    <div id='hypersubs-team-and-bench' class='cantselect'>\
      <div id='hypersubs-team' class='cantselect'><div id='hypersubs-title-team' class='hypersubs-title hypersubs-vertical'>The pitch</div></div>\
      <div id='hypersubs-bench' class='cantselect'><div id='hypersubs-title-bench' class='hypersubs-title hypersubs-vertical'>The bench</div></div>\
    </div>\
  </div>\
  <div id='hypersubs-right-column' class='cantselect'>\
    <div id='hypersubs-help-button'></div>\
    <div id='hypersubs-flange-counter'></div>\
  </div>\
</div>\
<div id='hypersubs-undo-hint'>Use the buttons below to start over if you want to undo any selections or change how Hypersubs automatically selects players. Or click the question mark in the top right-hand corner for more help.</div>\
<div id='hypersubs-preferences-dialog' class='hypersubs-secondary-dialog'>\
  <div id='hypersubs-setting-animate' title='If checked, players smoothly slide into position when selected/benched. (May be not-so-smooth in some browsers.)' class='hypersubs-setting-item'>\
    <input type='checkbox'/> Animate selections\
  </div>\
  <div id='hypersubs-setting-smartfill' title='If checked, Smartfill will be enabled whenever you start Hypersubs or click Next. If unchecked, Smartfill will be disabled instead.' class='hypersubs-setting-item'>\
    <input type='checkbox'/> Enable Smartfill for each new set of fixtures\
  </div>\
  <div id='hypersubs-setting-always-require-next' title=\"If you uncheck this box, the Hypersubs window won\'t even show fixtures that are so straightforward that all 11 players can be automatically selected (in which you would normally just click \'Next\'). Hypersubs will only display those fixtures where you need to make choices. This makes setting your Hypersubs quicker.\" class='hypersubs-setting-item'>\
    <input type='checkbox'/> Always require me to click Next\
  </div>\
  <div id='hypersubs-setting-show-hypersubs-shortcuts' title='If checked, direct links to the Supersubs/Hypersubs page appear in the Your Teams section for each of your Classic Premier League teams.' class='hypersubs-setting-item'>\
    <input type='checkbox'/> Show shortcuts to Hypersubs\
  </div>\
  <div id='hypersubs-setting-prune-confirmation'  title='If checked, the Supersubs confirmation page will list only players who have opponents. This should make it faster to confirm that everything is as you prefer.' class='hypersubs-setting-item'><input type='checkbox'/>\
    Hide inactive players on the confirmation page\
  </div>\
  <div id='hypersubs-setting-show-league-transfers' title=\"Bonus feature: If checked, each team\'s remaining transfers will be shown on league pages. (Only works if all team names in the league are unique, and only where you have the rights to access the League Report.)\" class='hypersubs-setting-item'>\
    <input type='checkbox'/> Show remaining transfers in leagues\
  </div>\
  <div id='hypersubs-setting-show-more-info-button' title=\"Bonus feature: If checked, a More Info button will appear in the Your Teams section. The button allows you to conveniently access some pertinent information about each of your teams.\" class='hypersubs-setting-item'>\
    <input type='checkbox'/> Show More Info button\
  </div>\
  <div id='hypersubs-setting-strong-attacks'  title=\"The clubs with the strongest attacks. A defender playing against these clubs will be highlighted as dangerous unless he plays for a club with a strong defense. (Dangerous players are not picked automatically except when there\'s no choice.) Use Fantasyleague.com's abbreviations. Separate with commas.\" class='hypersubs-setting-item'>\
    Clubs with a strong attack:<br/> <input type='text' class='hypersubs-textfield' />\
  </div>\
  <div id='hypersubs-setting-strong-defenses' title=\"The clubs with the strongest defenses. Players from these clubs are never highlighted as dangerous. (Dangerous players are not picked automatically except when there\'s no choice.) Use Fantasyleague.com's abbreviations. Separate with commas.\" class='hypersubs-setting-item'>\
    Clubs with a strong defense:<br/> <input type='text' class='hypersubs-textfield'/>\
  </div>\
</div>\
<div id='hypersubs-confirmation-dialog' class='hypersubs-secondary-dialog'>\
  <p>Really exit without saving any of your Hypersubs?</p><p>If you do, you can set your Supersubs normally or reload the page to start over from the first upcoming set of fixtures.</p></p> \
<div>\
<div id='hypersubs-help-dialog' class='hypersubs-secondary-dialog'>\
  <h2>Hypersubs " + HYPERSUBS_VERSION + " Help</h2>\
  <h3>Instructions</h3><p>Click on players to pick them for your team. The <span class='button-name'>Reset</span> button lets you undo your selections. Click <span class='button-name'>Next</span> to move to the \
                          next set of fixtures, and remember to click <span class='button-name'>Finish</span> to actually set your Supersubs on the Fantasy League site. Review your team on the site to make sure that everything went to plan.</p>\
                       <p>If you have the \"Smartfill\" option enabled, Hypersubs will automatically pick players that seem like obvious selections (for instance, fielding active players rather than inactive ones). \
                          Often, all the choices will be clear-cut, and all you have to do is accept what Smartfill suggests by clicking <span class='button-name'>Next</span>.</p> \
                       <p>For greater manual control, click <span class='button-name'>Disable Smartfill</span>. (Even with Smartfill off, Hypersubs will automatically make some truly trivial \"choices\" such as picking the only players you have available, and picking \"just anybody\" when everyone is idle.)</p> \
                       <p>By default, Smartfill turns on each time you start working on a new set of fixtures. You can change this, and other things, through the <span class='button-name'>Preferences</span> button.</p>\
                       <p>If you're wondering why a player has an unusual background color, hover the mouse over the player to find out.</p>\
  <h3>Frequently Asked Questions</h3>\
                       <p><span class='question'>Hypersubs has selected a player who I want to leave on the bench. How do I unselect him?</span> Answer: You can disable Smartfill (see above). Or you can go to Preferences \
                             and set the Strong Attacks and Strong Defenses to your liking so that the player will be highlighted as dangerous and won't be selected automatically. Or you can even hit \
                             Cancel and set Supersubs in the traditional way, if you really want.</p>\
                       <p><span class='question'>How do I go back to a previous set of fixtures?</span> Answer: Currently, the only way to do that is to close the Hypersubs window (e.g., with Cancel) and reload the page to start over.</p>\
                       <p><span class='question'>Hypersubs works great, but clicking Next so many times seems unnecessary, don't you think?</span> Answer: You can unselect \"Always require me to click Next\" in the Preferences to speed up you Hypersubs even more. \
                             If you do, make sure the Strong Attacks and Strong Defenses are to your liking and be extra sure to take a look at the confirmation page.</p>\
                       <p><span class='question'>Isn't there any way of quickly telling if a player has a home or away fixture?</span> Answer: In the main Hypersubs view, capital letters indicate a home fixture for the player and lowercase letters indicate away an away fixture. (Also, the mouseover text spells out the fixtures.)</p>\
                       <p><span class='question'>The bonus features are nice. Could you also add a feature that automatically updates my teams' points in real time during the weekend?</span> Answer: I won't, because Fantasy League want us to pay for that functionality with a Silver or Gold upgrade.</p>\
  <h3>Limitations and Disclaimers</h3>\
                       <p>This version of Hypersubs is compatible with the Fantasyleague.com Classic Premier League competition as of " + SITE_COMPATIBILITY_CHECKED_DATE + ". Other competitions are not supported.</p>\
                       <p>Hypersubs relies on the existing structure of the Fantasy League web site. <em>It will stop working properly &mdash; possibly without any warning!&nbsp;&mdash; as soon as Fantasy League change how their Supersubs pages are structured.</em></p>\
                       <p>Hypersubs only works in:</p>\
                          <ul><li>Chrome v" + CHROME_THRESHOLD + ".0+ with the Tampermonkey extension v2.5+, and</li><li>Firefox v" + FIREFOX_THRESHOLD + ".0+ with the Greasemonkey extension v0.9.8+.</li></ul>\
                       <p>The animations may run more smoothly in Chrome.</p>\
                       <p>Use at your own risk. This program was written as an exercise to learn the basics of a few technologies. It may well be buggy. \
                          Again, be sure to check the Fantasy League site or their confirmation email to be certain that everything went right!</p>\
</div>";


      /////////////////////////////// ADD THE GUI TO THE PAGE ////////////////////////////////////////////////  

      var THEME_PATH = "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/themes/le-frog";
      $('head').append('<link rel="stylesheet" href="' + THEME_PATH + '/jquery-ui.css" type="text/css" />');
      $('head').append('<style type="text/css">' + HYPERSUBS_DIALOG_CSS + '</style>');
      $('body').append(HYPERSUBS_HTML);

      

      /////////////////////////////// PLAYERBOX WIDGET ////////////////////////////////////////////////////////  


      $.widget("hypersubs.playerCircle", {
        options: {
          player: null,
          colorExplanation: null
        }, // default options
        setPlayer: function (newPlayer) {
          this.options = {
            player: newPlayer
          };
          this._setInfo();
          this.refresh();
        },
        getPlayer: function () {
          return this.options.player;
        },
        getColorExplanation: function () {
          return this.options.colorExplanation;
        },
        _setInfo: function () {
          var p = this.options.player;
          var metrics = NameBoxMetrics.getForName(p.name, MAX_PLAYER_NAME_FONT_SIZE, MIN_PLAYER_NAME_FONT_SIZE);
          var displayName = metrics[0];
          var fontSize = metrics[1];
          var nameHeight = metrics[2] + 2;
          var nameDiv = $(this.element).find(".name");
          nameDiv.css("font-size", fontSize + "px");
          nameDiv.css("line-height", fontSize + "px");
          nameDiv.css("height", nameHeight + "px");
          nameDiv.css("margin-top", (-(nameHeight / 2)) + "px");
          nameDiv.html(displayName);
          $(this.element).find(".club").html(p.club.name);
          $(this.element).find(".position").html(p.position.name);
          $(this.element).find(".lowerBit").html(p.activityHTML());
          if (p.status == Status.values.UNKNOWN || p.status == Status.values.READY) {
            $(this.element).find(".status").css('display', 'none');
          } else {
            $(this.element).find(".status").css('display', 'block');
            $(this.element).find(".status").css('background-position', INJURY_ICON_OFFSETS[p.status.id]);
          }
        },
        refresh: function () { // update those aspects of the view which may change without the player changing (currently: danger levels -> colors)
          var colorName = this._determineColor();
          var color = PLAYER_COLOR_SCHEME[colorName];
          this.options.colorExplanation = "<div class='color'>" + colorName + " means: " + color.explanation + "</div>";
          $(this.element).css("background", "linear-gradient(top, " + color.lighter + " 0%," + color.darker + " 100%)");
          $(this.element).css("background", "-moz-linear-gradient(top, " + color.lighter + " 0%, " + color.darker + " 100%)");
          $(this.element).css("background", "-webkit-linear-gradient(top, " + color.lighter + " 0%," + color.darker + " 100%)");
          $(this.element).css('border', '1px solid ' + color.border);
        },
        _determineColor: function () {
          var p = this.options.player;
          if (!p.hasOpponent()) return "white";
          if (!p.isSafe()) return p.isLikelyActive() ? "red" : "orange";
          if (!p.isLikelyActive()) return "grey";
          return p.status == Status.values.READY ? "green" : "blue";
        },
        _slide: function(startingPoint, newCoords) {
          var circle = $(this.element);
          var parent = $("#hypersubs-content");
          if (startingPoint.group == "squad") { 
            var animStartCoords = this._determineSquadCoords(startingPoint, true);
            animStartCoords.y = Math.min(animStartCoords.y, parent.height() - circle.height() - 2);
            circle.css('left', animStartCoords.x + "px");
            circle.css('top', animStartCoords.y + "px");
          } 
          parent.append(circle);
          var delay = (startingPoint.group == "bench" || startingPoint.group == "team") ? 300 : 0;
          circle.css('z-index', Z_ANIMATED_PLAYER);
          circle.delay(delay).animate({ left: newCoords.x + "px", top: newCoords.y + "px" }, 
                                        700 + Math.floor((Math.random() * 400)), "swing", 
                                        function () { $(this).css('z-index', Z_STATIC_PLAYER); }); 
        },
        _teleport: function(destination, newCoords) {
          var parent = destination.group == "squad" ? $("#hypersubs-squad .hypersubs-selector[position='" + destination.position.name + "']") : $("#hypersubs-content");
          var circle = $(this.element);
          circle.css('left', newCoords.x + "px");
          circle.css('top', newCoords.y + "px");
          parent.append(circle);
        },
        move: function(oldSelections, newSelections, transitionFromPreviousState) {
          var destination = newSelections.playerStates[this.options.player];
          var newCoords = this._determineCoords(destination);
          if (!transitionFromPreviousState || Math.round(newCoords.x) != Math.round($(this.element).position().left) || Math.round(newCoords.y) != Math.round($(this.element).position().top)) { // if the circle's location has changed or this is a "reset" 
            if (userPreferences.animate && transitionFromPreviousState && (destination.group == "bench" || destination.group == "team")) {
              this._slide(oldSelections.playerStates[this.options.player], newCoords);
            } else { 
              this._teleport(destination, newCoords);
            }
          }
        },
        // TODO: Refactor the following out of here.
        _determineCoords: function(playerState) { 
          if (playerState.group == "team") {
            return this._determineTeamCoords(playerState);
          } else if (playerState.group == "bench") {
            return this._determineBenchCoords(playerState);
          } else if (playerState.group == "squad") {
            return this._determineSquadCoords(playerState, false);
          } else {
            throw "Hypersubs: Invalid player location: not bench/team/squad.";
          }
        },
        _determineTeamCoords: function(playerState) {
          var offsetX = $("#hypersubs-team").position().left;
          var offsetY = $("#hypersubs-team").position().top;
          var position = playerState.position;
          var xCoords = TEAM_SHAPE_X[position.name];
          var yCoords = TEAM_SHAPE_Y[position.name];
          var assumedTotalInPosition = Math.max(playerState.of, position.min);
          var teamShapeIndex = position.max - assumedTotalInPosition;
          return {
            x: (offsetX + xCoords[teamShapeIndex][playerState.index]),
            y: (offsetY + yCoords[teamShapeIndex][playerState.index])
          };
        },
        _determineBenchCoords: function(playerState) {
          var offsetX = $("#hypersubs-bench").position().left;
          var offsetY = $("#hypersubs-bench").position().top;
          return {
            x: (offsetX + BENCH_SHAPE_X[playerState.index]),
            y: (offsetY + BENCH_SHAPE_Y[playerState.index])
          };
        },
        _determineSquadCoords: function(playerState, absolute) {
          var offsetX = 0;
          var offsetY = 0;
          if (absolute) {
            offsetX += $("#hypersubs-squad").position().left;
            offsetY += $("#hypersubs-squad").position().top;
            offsetX += $("#hypersubs-squad .hypersubs-selector[position='" + playerState.position.name + "']").position().left;
            offsetY += $("#hypersubs-squad .hypersubs-selector[position='" + playerState.position.name + "']").position().top;
          }
          return {
            x: (offsetX + SELECTOR_SHAPE_X[playerState.index]),
            y: (offsetY + SELECTOR_SHAPE_Y[playerState.index])
          };
        }
      });

      // Turn divs into playerCircle widgets:
      $("#hypersubs-content .hypersubs-player").playerCircle();

      
      // Event handlers:

      $("#hypersubs-content .hypersubs-player").each(function () {
        $(this).click(function () {
          var player = $(this).playerCircle("getPlayer");
          var oldSelections = state.hypersubs; 
          if (oldSelections.playerStates[player].group == "squad") { 
            $(this).removeClass("hypersubs-player-hover");
            $("#hypersubs-player-tooltip .explanation").removeClass("hypersubs-tooltip-visible");
            $("#hypersubs-player-tooltip .explanation").addClass("hypersubs-tooltip-invisible");
            state.hypersubs = oldSelections.pickManuallyByPlayer(player, state.smartFillCurrentlyOn); 
            transitionToView(oldSelections, state);
          } else {
            var hintDiv = $("#hypersubs-undo-hint");
            hintDiv.stop(true, true);
            hintDiv.css('opacity', 0);
            hintDiv.position({ my: "left top", at: "right bottom", of: $(this), offset: "-12px -12px", collision: "fit" });
            hintDiv.animate({ opacity: 0.90 }, 500, "swing");
          }
        });
        $(this).hover(
          function () { // hover starts
            var player = $(this).playerCircle("getPlayer");
            if (!$(this).is(':animated')) {
              if (state.hypersubs.playerStates[player].group == "squad") { 
                $(this).addClass("hypersubs-player-hover");
              }
              var tooltipDiv = $("#hypersubs-player-tooltip .explanation");
              tooltipDiv.addClass("hypersubs-tooltip-visible");
              tooltipDiv.html(player.fullHTML() + $(this).playerCircle("getColorExplanation"));
              tooltipDiv.removeClass("hypersubs-tooltip-invisible");
              tooltipDiv.position({ my: "left top", at: "right bottom", of: $(this), offset: "-12px -12px", collision: "fit" });
            }
          }, function () { // hover ends 
            $("#hypersubs-undo-hint").stop(true, true); 
            $("#hypersubs-undo-hint").css('opacity', 0);  
            $(this).removeClass("hypersubs-player-hover");
            $('selector').css('cursor', 'default');
            var tooltipDiv = $("#hypersubs-player-tooltip .explanation");
            tooltipDiv.removeClass("hypersubs-tooltip-visible");
            tooltipDiv.addClass("hypersubs-tooltip-invisible");
          });
      });

      
        
        // NameBoxMetrics

      function NameBoxMetrics(name, fontSize, minFontSize, maxFontSize) {
        this.name = name;
        this.fontSize = fontSize;
        this.minFontSize = minFontSize;
        this.maxFontSize = maxFontSize;
      }
      NameBoxMetrics.prototype._fitsWidth = function (words) {
        return this._getWidth(words) <= NAME_MAX_WIDTH;
      }
      NameBoxMetrics.prototype._fitsHeight = function () {
        return this.getHeight(4) <= NAME_MAX_HEIGHT;
      }
      NameBoxMetrics.prototype.getHeight = function (narrowing) {
        var testDiv = $("#hypersubs-player-name-height-test");
        testDiv.css('width', (NAME_MAX_WIDTH - narrowing) + "px");
        testDiv.css("font-size", this.fontSize + "px");
        testDiv.css("line-height", this.fontSize + "px");
        testDiv.html(this.name.fullNameString());
        return testDiv.height();
      }
      NameBoxMetrics.prototype._getWidth = function (words) {
        var testDiv = $("#hypersubs-player-name-width-test");
        testDiv.css("font-size", this.fontSize + "px");
        testDiv.css("line-height", this.fontSize + "px");
        testDiv.html(words.flatMap(function (name) {
          return name.replace("-", "- ").split(" ");
        }).mkString("", "<br/>", ""));
        return testDiv.width();
      }
      NameBoxMetrics.prototype._partialInitialism = function () {
        return new NameBoxMetrics(this.name.firstNamesToInitials(), this.fontSize, this.minFontSize, this.maxFontSize);
      }
      NameBoxMetrics.prototype._fullInitialism = function () {
        return new NameBoxMetrics(this.name.allToInitials(), this.maxFontSize, this.minFontSize, this.maxFontSize);
      }
      NameBoxMetrics.prototype._doFirstNameWidths = function () {
        return this._fitsWidth(this.name.firstNames()) ? this : this._partialInitialism();
      };
      NameBoxMetrics.prototype._doLastNameWidths = function () {
        return this._fitsWidth(this.name.lastNames()) ? this : (this.fontSize > this.minFontSize ? new NameBoxMetrics(this.name, this.fontSize - 1, this.minFontSize, this.maxFontSize)._doLastNameWidths() : this._fullInitialism());
      }
      NameBoxMetrics.prototype._improve = function () {
        if (this._fitsHeight()) {
          return this._doFirstNameWidths()._doLastNameWidths();
        } else {
          var shortened = this._partialInitialism();
          return shortened._fitsHeight() ? shortened._doLastNameWidths() : this._fullInitialism();
        }
      }
      NameBoxMetrics.cache = {}
      NameBoxMetrics.getForName = function (fullName, defaultFontSize, minFontSize) {
        fullName = fullName.replace(/#*/g, "");
        var id = fullName + "#" + defaultFontSize + "#" + minFontSize;
        if (NameBoxMetrics.cache.hasOwnProperty(id)) {
          return NameBoxMetrics.cache[id];
        }
        var fitted = new NameBoxMetrics(PlayerName.fromString(fullName), defaultFontSize, minFontSize, defaultFontSize)._improve();
        var metrics = [fitted.name.fullNameString(), fitted.fontSize, fitted.getHeight(0)];
        NameBoxMetrics.cache[id] = metrics;
        return metrics;
      }

      
        /////////////////////////////// MAIN DIALOG ////////////////////////////////////////////////////////  

      $('#hypersubs-main-dialog').dialog({
        dialogClass: 'hypersubs-dialog',
        autoOpen: false,
        show: { effect: "fade", duration: 200 },
        hide: { effect: "fade", duration: 200 },
        title: "Hypersubs",
        width: MAIN_DIALOG_WIDTH,
        height: MAIN_DIALOG_HEIGHT,
        position: "center",
        buttons: [ { text: "Preferences...", click: function () {} }, 
                   { text: "Smartfill", click: function () {} }, 
                   { text: "Reset", click: function () {} }, 
                   { text: "Cancel", click: function () {} }, 
                   { text: "Finish", click: function () {} }, 
                   { text: "Next", click: function () {} } 
                 ],
        modal: true
      });

      // The buttons at the bottom:


      $("#hypersubs-main-dialog").dialog('widget').find(".ui-dialog-buttonpane .ui-dialog-buttonset").css('float', 'none');
      $("#hypersubs-main-dialog").dialog('widget').find(".ui-dialog-buttonpane button").each(function (index, button) { 
        if ($(button).text() == "Preferences...") {
          $(button).button({ icons: { primary: "ui-icon-wrench" } });
          $(button).css('float', 'left');
          $(button).attr('title', 'Adjust your Hypersubs preferences.');
          $(button).click(function () {
            openPreferencesDialog();
          });
        } else if ($(button).text() == "Smartfill") {
          $(button).css('float', 'left');
          $(button).click(function () {
            loadFlange(state.currentFlange, !state.smartFillCurrentlyOn); 
            setView(state); 
          });
        } else if ($(button).text() == "Reset") {
          $(button).button({ icons: { primary: "ui-icon-arrowreturnthick-1-s" } });
          $(button).css('float', 'left');
          $(button).attr('title', 'Start over with this set of fixtures (keeping the current Smartfill setting).');
          $(button).click(function () {
            resetFlange();
          });
        } else if ($(button).text() == "Cancel") {
          $(button).button({ icons: { primary: "ui-icon-closethick" } });
          $(button).css('float', 'right');
          $(button).attr('title', 'Exit Hypersubs without saving any selections for any fixture.');
          //  $(button).addClass('ui-priority-secondary');
          $(button).click(function () {
            $("#hypersubs-main-dialog").dialog("close");         
          });
        } else if ($(button).text() == "Finish") {
          $(button).button({ icons: { primary: "ui-icon-check" } });
          $(button).attr('title', 'Close the Hypersubs window and save the selections.');
          $(button).css('float', 'right');
          $(button).click(function () {
            state.hypersubs.setSupersubsCheckboxes(state.currentFlange); 
            setDoneCount(state.currentFlange + 1);
            reallyExit = true;
            $("#hypersubs-main-dialog").dialog("close");
            $("body").prepend("<div id='confirmationconfirmation' style='font-family: Candara, Tahoma, Geneva, sans-serif; letter-spacing: 0px;\
                           border-radius: 15px; border: 3px solid #4CA20B; background-color: #285C00; z-index: 10000; \
                           position: fixed; top: " + ($(window).height() / 2) + "px; left: " + ($(window).width() / 2) + "px;\
                           width: 780px; height: 130px; margin-top: -65px; margin-left: -390px; text-align: center'>\
                           <div style='margin-top: 35px; color: white; font-size: 36px; line-height: 40px;'>\
                           Setting Hypersubs for " + (state.currentFlange + 1) + " of " + state.numberOfFlanges + " sets of fixtures.</div>\
                           <div style='color: yellow; font-size: 15px; line-height: 25px;'>(Waiting for the Fantasy League site to confirm.)</div></div>");
            $("#selection_submit")[0].click();
          });
        } else if ($(button).text() == "Next") {
          $(button).button({
            icons: { primary: "ui-icon-arrowthick-1-e" } });
          $(button).attr('title', 'Begin picking players for the next set of fixtures.');
          $(button).css('float', 'right');
          $(button).click(function () {
            state.hypersubs.setSupersubsCheckboxes(state.currentFlange);
            loadFlange(state.currentFlange + 1, userPreferences.smartFill);
          });
        }
      });

      // Cancel-confirmation dialog
      
      var reallyExit = false;  // TODO argh

      $("#hypersubs-confirmation-dialog").dialog({
        dialogClass: 'hypersubs-dialog',
        autoOpen: false,
        show: { effect: "fade", duration: 200 },
        hide: { effect: "fade", duration: 200 },
        title: "\"Can't stop now, don't you know, I ain't never gonna let you go...\"",
        width: CONFIRMATION_DIALOG_WIDTH,
        position: "center",
        buttons: [ { text: "No, I'll stay", click: function () { $(this).dialog("close"); } },
                   { text: "Yes, exit", click: function () { reallyExit = true; $(this).dialog("close"); $("#hypersubs-main-dialog").dialog("close");} } ],
        modal: true
      });
      
      $("#hypersubs-main-dialog").keydown(function (event) {
        if (event.keyCode == 27) {
          $("#hypersubs-main-dialog").dialog("close");         }
      });

      $("#hypersubs-main-dialog").bind('dialogbeforeclose', function (event) {
        if (reallyExit) {
          return true;
        } else {
          $("#hypersubs-confirmation-dialog").dialog('option', 'position', { my: 'center', at: 'center', of: $('#hypersubs-main-dialog'), offset: "0 0", collision: "fit" });
          $("#hypersubs-confirmation-dialog").dialog("open");
          return false;
        }
      });

      
      // Help button:

      $("#hypersubs-help-button").button({
        icons: { primary: "ui-icon-help" },
        text: false
      });

      $("#hypersubs-help-button").click(function () {
        $("#hypersubs-help-dialog").dialog('option', 'position', { my: 'center', at: 'center', of: $('#hypersubs-main-dialog'), offset: "0 0", collision: "fit" });
        $('#hypersubs-help-dialog').dialog('open');
      });

      // React to changes:

      function updatePositionSelectors(newSelections) {

        $("#hypersubs-squad .hypersubs-selector").each(function () {
          $(this).height(newSelections.greatestChoosableCount() * 48 + 22); 
        });
        var fillingAdvice = new FillingAdvice(newSelections); 
        $("#hypersubs-advice-gk").html(fillingAdvice.gk());
        $("#hypersubs-advice-fb").html(fillingAdvice.fb());
        $("#hypersubs-advice-cb").html("");
        $("#hypersubs-advice-mf").html("");
        $("#hypersubs-advice-st").html("");
        var cbmfstAdvice = fillingAdvice.cbmfst();
        if (cbmfstAdvice != null) {
          $(cbmfstAdvice.location).html(cbmfstAdvice.text);
        }
      }
      
        
      function updateButtons(newState) {
        var dialog = $("#hypersubs-main-dialog").dialog('widget'); 
        var nextButton = dialog.find(".ui-dialog-buttonpane button:contains('Next')");
        var finishButton = dialog.find(".ui-dialog-buttonpane button:contains('Finish')");
        var smartFillButton = dialog.find(".ui-dialog-buttonpane button:contains('Smartfill')");
        var enterButton;
        var thisFlangeDone = state.hypersubs.isDone();
        if (newState.currentFlange < newState.numberOfFlanges - 1) {
          nextButton.button('option', 'label', 'Next '); //(#' + (newState.currentFlange + 1) + "/" + newState.numberOfFlanges + ")");
          nextButton.button("option", "disabled", !thisFlangeDone); 
          enterButton = nextButton;
        } else { 
          nextButton.button('option', 'label', 'Next');
          nextButton.button("option", "disabled", true);
          enterButton = thisFlangeDone ? finishButton : null; 
        }
        finishButton.button("option", "disabled", !thisFlangeDone); 
        if (enterButton != null && !enterButton.button("option", "disabled")) {
          enterButton.focus();
        }
        smartFillButton.attr('title', newState.smartFillCurrentlyOn ? 'Disable Smartfill for this set of fixtures and start over.' : 'Enable Smartfill for this set of fixtures and start over.'); 
        smartFillButton.button('option', 'label', newState.smartFillCurrentlyOn ? 'Disable Smartfill' : 'Enable Smartfill'); 
      }

      function updateDialogTitle(newState) { 
        $("#hypersubs-main-dialog").dialog('option', 'title', 'Hypersubs&nbsp; &mdash; #' + (newState.currentFlange + 1) + " of " + newState.numberOfFlanges + " Sets of Fixtures (" + newState.date + ")&nbsp; &mdash; " + newState.teamName);
      }

      // FillingAdvice

      function FillingAdvice(selections) {
        this.missingCounts = { 
          GK: selections.choiceLists[0].open,
          FB: selections.choiceLists[1].open,
          CB: { min: selections.choiceLists[2].posCB.min, max: selections.choiceLists[2].posCB.max, choosable: selections.choiceLists[2].posCB.choosable.size() },
          MF: { min: selections.choiceLists[2].posMF.min, max: selections.choiceLists[2].posMF.max, choosable: selections.choiceLists[2].posMF.choosable.size() },
          ST: { min: selections.choiceLists[2].posST.min, max: selections.choiceLists[2].posST.max, choosable: selections.choiceLists[2].posST.choosable.size() },
          CBMFST: selections.choiceLists[2].open
        };
      }
      FillingAdvice._singlePosAdvice = function(needed, posNameOrNames) {
        return needed > 0 ? "Pick " + needed + " " + FillingAdvice._maybePlural(needed, posNameOrNames) + "." : "";
      }
      FillingAdvice.prototype.gk = function() {
        return FillingAdvice._singlePosAdvice(this.missingCounts.GK, "GK");
      }
      FillingAdvice.prototype.fb = function() {
        return FillingAdvice._singlePosAdvice(this.missingCounts.FB, "FB");
      }
      FillingAdvice._maybePlural = function(count, posNameOrNames) {
        return count == 1 ? posNameOrNames : posNameOrNames + "s";
      }
      FillingAdvice._adviceRangeString = function(posAndLimits) { 
        var min = Math.max(posAndLimits.limits.min, 0);
        var max = Math.min(posAndLimits.limits.max, posAndLimits.limits.choosable);
        return min == max ? min + " " + FillingAdvice._maybePlural(min, posAndLimits.name) : min + " to " + max + " " + posAndLimits.name + "s";
      }
      FillingAdvice.prototype.cbmfst = function() {
        var totalNeeded = this.missingCounts.CBMFST;
        if (totalNeeded == 0) {
          return null;
        }
        var poss = ["CB", "MF", "ST"];
        var counts = this.missingCounts; 
        var relevantNames = poss.filter(function (name) {
          return counts[name].choosable > 0;
        });
        if (relevantNames.length == 1) { // "Pick N XXs." 
          var relevantName = relevantNames[0];
          return { location: "#hypersubs-advice-" + relevantName.toLowerCase(), text: FillingAdvice._singlePosAdvice(totalNeeded, relevantName) };
        }
        if (totalNeeded == 1) { // "Pick 1 XX/YY/ZZ."
          return { location: "#hypersubs-advice-mf", text: "Pick 1 " + relevantNames.join("/") + "." };
        }
        var relevants = relevantNames.map(function (posName) { return { name: posName, limits: counts[posName] }; }); 
        var overallPart = "Pick " + totalNeeded + " " + relevants.map(function (relevant) { return FillingAdvice._maybePlural(totalNeeded, relevant.name); }).join("/"); // "Pick N XXs/YYs/ZZs."
        var specificPart = "(" + relevants.map(function (relevant) {return FillingAdvice._adviceRangeString(relevant); }).join(", ") + ")"; // "(N1 to N2 XXs, N3 to N4 YYs, ...)"
        return { location: "#hypersubs-advice-mf", text: overallPart + " " + specificPart + "." };
      }

      // FlangeCounter
      // TODO: --> widget object
      
      function updateFlangeCounter(newState) {
        var flangeMarkers = $("#hypersubs-flange-counter .hypersubs-flange");
        if (flangeMarkers.length == 0) {
          createFlangeCounter(newState.numberOfFlanges);
          flangeMarkers = $("#hypersubs-flange-counter .hypersubs-flange");
        }
        if (newState.currentFlange > 0) {
          $(flangeMarkers[newState.currentFlange - 1]).removeClass('hypersubs-flange-current');
        }
        var currentMarker = $(flangeMarkers[newState.currentFlange]);
        if (newState.hypersubs.isDangerouslySelected()) {
          currentMarker.addClass('hypersubs-flange-danger');
        } else {
          currentMarker.removeClass('hypersubs-flange-danger');
        }
        if (newState.hypersubs.isDone()) {
          if (newState.skip) { 
            currentMarker.addClass('hypersubs-flange-skipped');
          } else {
            currentMarker.addClass('hypersubs-flange-current');
            currentMarker.addClass("hypersubs-flange-reviewed"); 
          }
        } else {
          currentMarker.addClass('hypersubs-flange-current');
          currentMarker.removeClass("hypersubs-flange-reviewed");
        }
      }
      
      function createFlangeCounter(numberOfFlanges) {
        for (var i = 0; i < numberOfFlanges; i++) {
          $("#hypersubs-flange-counter").append("<div class='hypersubs-flange cantselect'>" + (i + 1) + "</div>");
        }
        $("#hypersubs-flange-counter .hypersubs-flange").each(function () { // TODO: not DRY, cf. PlayerCircle tooltips
          $(this).hover(
            function () { // hover starts
              var tooltipDiv = $("#hypersubs-flange-tooltip .explanation");
              tooltipDiv.addClass("hypersubs-tooltip-visible");
              tooltipDiv.removeClass("hypersubs-tooltip-invisible");
              tooltipDiv.html(getFlangeTooltip($(this)));
              tooltipDiv.position({ my: "right top", at: "left bottom", of: $(this), offset: "1px -3px", collision: "fit" });
            }, function () { // hover ends 
              var tooltipDiv = $("#hypersubs-flange-tooltip .explanation");
              tooltipDiv.removeClass("hypersubs-tooltip-visible");
              tooltipDiv.addClass("hypersubs-tooltip-invisible");
           });
        });
      }
      
      function getFlangeTooltip(flange) {
        var number = flange.text();
        var text = "Fixture Block #" + flange.text() + "<br/>" + supersubs.flanges[parseInt(number, 10) - 1].date + "<br/>";
        if (flange.hasClass("hypersubs-flange-current")) {
          text += "Displayed right now.";
        } else {
          if (flange.hasClass("hypersubs-flange-reviewed")) {
            text += "Already done.";
          } else if (flange.hasClass("hypersubs-flange-skipped")){
            text += "Filled by Hypersubs (not shown).<br/>Review the confirmation page/email later!";
          } else {
            text += "Coming up later.";
          }
        }
        if (flange.hasClass("hypersubs-flange-danger")) {
          text += "<br/>(The red number means that one<br/>or more of the selected defensive<br/>players has a dangerous fixture.)";
        }
        return text;
      }
      

      /////////////////////////////// SETTINGS DIALOG  ////////////////////////////////////////////////////////  


      $('#hypersubs-preferences-dialog').dialog({
        dialogClass: 'hypersubs-dialog',
        autoOpen: false,
        title: "\"...each careful step along the byway...\"",
        show: { effect: "fade", duration: 400 },
        hide: { effect: "fade", duration: 400 },
        width: SETTINGS_DIALOG_WIDTH,
        buttons: [ { text: "Save", click: function () {} }, { text: "Cancel", click: function () {} } ],
        modal: true
      });

      $('#hypersubs-preferences-dialog').dialog('widget').css('opacity', SECONDARY_DIALOG_OPACITY);

      // TODO: Refactor --> widget methods?

      function openPreferencesDialog() {
        $("#hypersubs-setting-animate input").prop('checked', userPreferences.animate);
        $("#hypersubs-setting-smartfill input").prop('checked', userPreferences.smartFill);
        $("#hypersubs-setting-always-require-next input").prop('checked', userPreferences.alwaysRequireNext);
        $("#hypersubs-setting-prune-confirmation input").prop('checked', userPreferences.pruneConfirmation);
        $("#hypersubs-setting-show-hypersubs-shortcuts input").prop('checked', userPreferences.showHypersubsShortcuts);
        $("#hypersubs-setting-show-league-transfers input").prop('checked', userPreferences.showLeagueTransfers); 
        $("#hypersubs-setting-show-more-info-button input").prop('checked', userPreferences.showMoreInfoButton);
        $("#hypersubs-setting-strong-attacks input").val(userPreferences.strongAttacks);
        $("#hypersubs-setting-strong-defenses input").val(userPreferences.strongDefenses);
        $("#hypersubs-preferences-dialog").dialog('option', 'position', { my: 'center', at: 'center', of: $('#hypersubs-main-dialog'), offset: "0 0", collision: "fit" });
        $('#hypersubs-preferences-dialog').dialog('open');
        $('#hypersubs-preferences-dialog').dialog('widget').find(".ui-dialog-buttonpane button:contains('Save')").focus(); 
      }

      $('#hypersubs-preferences-dialog').dialog('widget').find(".ui-dialog-buttonpane button").each(function (index, button) { 
        if ($(button).text() == "Save") {
          $(button).button({ icons: { primary: "ui-icon-check" } });
          $(button).attr('title', 'Save your preferences and close this window.');
          $(button).click(function () {
            applyAndSavePreferences({
              smartFill: $("#hypersubs-setting-smartfill input").prop('checked'),
              alwaysRequireNext: $("#hypersubs-setting-always-require-next input").prop('checked'),
              showHypersubsShortcuts: $("#hypersubs-setting-show-hypersubs-shortcuts input").prop('checked'),
              showLeagueTransfers: $("#hypersubs-setting-show-league-transfers input").prop('checked'),
              showMoreInfoButton: $("#hypersubs-setting-show-more-info-button input").prop('checked'),
              pruneConfirmation: $("#hypersubs-setting-prune-confirmation input").prop('checked'),
              animate: $("#hypersubs-setting-animate input").prop('checked'),
              strongAttacks: $("#hypersubs-setting-strong-attacks input").val(),
              strongDefenses: $("#hypersubs-setting-strong-defenses input").val()
            });
            $("#hypersubs-preferences-dialog").dialog("close");
          });
        } else if ($(button).text() == "Cancel") {
          $(button).button({ icons: { primary: "ui-icon-closethick" } });
          //  $(button).addClass('ui-priority-secondary');
          $(button).attr('title', 'Close this window and retain earlier preferences.');
          $(button).click(function () {
            $("#hypersubs-preferences-dialog").dialog("close");
          });
        }
      });
      
      /////////////////////////////// HELP DIALOG ////////////////////////////////////////////////////////  

      $('#hypersubs-help-dialog').dialog({
        dialogClass: 'hypersubs-dialog',
        autoOpen: false,
        show: { effect: "fade", duration: 600 },
        hide: { effect: "fade", duration: 600 },
        title: "\"Now I find I've changed my mind, and opened up the...\"",
        width: HELP_DIALOG_WIDTH,
        height: HELP_DIALOG_HEIGHT,
        buttons: [ { text: "Close", click: function () { $(this).dialog('close'); } }],
        modal: true
      });

      $('#hypersubs-help-dialog').dialog('widget').css('opacity', SECONDARY_DIALOG_OPACITY);


    ///////////////////////////// WINDOWING EFFECTS //////////////////////////////////////////////////////


      $(window).resize(function (event) {
        if (!$(event.target).hasClass('ui-resizable')) { // if not a jquery object, and therefore presumably the browser window (find better way to do this?) 
          $("#hypersubs-main-dialog").dialog('option', 'position', { my: 'center top', at: 'center top', of: $('body'), offset: "0 200", collision: "fit" });
        }
      });

      $(window).unload(function () {
        $('#confirmationconfirmation').css('display', 'none');
      });

      $('div.ui-dialog').draggable({
        start: function (event, ui) {
          $(this).removeClass('ui-draggable-dragging');
        }
      }); // hack to locally counter FL's stylesheet that makes dragged objects transparent (that should not apply to hypersubs dialog) 

      
        /////////////////////////////// USER SETTINGS ////////////////////////////////////////////////////////  

      // TODO: Reposition these

      function updateClubStrengths(preferences) {
        var attacks = preferences.strongAttacks.replace(/\s*/g, "").toUpperCase().split(",");
        var defenses = preferences.strongDefenses.replace(/\s*/g, "").toUpperCase().split(",");
        var somethingChanged = false;
        for (clubName in Club.values) {
          var oldAttack = Club.values[clubName].hasStrongAttack;
          var oldDefense = Club.values[clubName].hasStrongDefense;
          Club.values[clubName].hasStrongAttack = attacks.indexOf(clubName.toUpperCase()) >= 0;
          Club.values[clubName].hasStrongDefense = defenses.indexOf(clubName.toUpperCase()) >= 0;
          if (oldAttack != Club.values[clubName].hasStrongAttack || oldDefense != Club.values[clubName].hasStrongDefense) {
            somethingChanged = true;
          }
        }
        return somethingChanged;
      }

      function loadPreferences(defaults) {
        var preferences = {};
        for (setting in defaults) {
          preferences[setting] = GM_getValue(setting, defaults[setting]);
        }
        updateClubStrengths(preferences);
        return preferences;
      }

      function applyAndSavePreferences(preferences) {
        userPreferences = preferences;
        for (setting in preferences) {
          GM_setValue(setting, preferences[setting]);
        }
        if (updateClubStrengths(preferences)) {
          $("#hypersubs-content .hypersubs-player").each(function () {
            $(this).playerCircle("refresh");
          });
          resetFlange();
        }
      }

      ///////////////////////////// INTERFACING WITH THE SUPERSUBS PAGE ////////////////////////////////////////////////// 


      // In from page:

      function SupersubsPage() {
        this.teamName = this._readTeamName();
        this.flanges = this._readFlanges();
      }
      SupersubsPage.prototype.getSquad = function(flangeNumber) {
        return this.flanges[flangeNumber].getSquad();        
      }
      SupersubsPage.prototype._readTeamName = function() {
        var match = /\s*Classic\s*-\s*Team\s*-\s*(.+)\s*-\s*Fantasy\s+League\s*/i.exec(document.title);
        return match == null ? "(couldn't determine team name)" : match[1];
      }
      SupersubsPage.prototype._readFlanges = function() {
        var flangeDivs = $("#supersubs div[id^=fixtureBlock]"); 
        var flanges = new Array(flangeDivs.length); 
        flangeDivs.each(function(i, div) {
          flanges[i] = new Flange(div);
        });
        return flanges;
      }
      
      function Flange(flangeDiv) {
        this.date = this._parseDate(flangeDiv);
        this.fixtures = this._parseFixtures(flangeDiv); 
      }
      Flange.prototype.getSquad = function() {
        return this.fixtures.map(function(fixture) { return fixture.player; })        
      }
      Flange.prototype._parseDate = function(flangeDiv) {
        var flangeHeader = $(flangeDiv).find("table[class='general narrowFixtures'] thead th");
        if (flangeHeader.length != 1) {
          throw "Hypersubs: Failed to find a unique fixture block date. A change/bug in the FL site?";
        } 
        if ($.trim(flangeHeader.text()) != "") {
          return flangeHeader.text();
        } else {
          return "(no date given)";
        }
      }
      Flange.prototype._parseFixtures = function(flangeDiv) {
        var fixtures = new Array(16);
        var fixtureRow = $(flangeDiv).find("table[class='general'] tbody tr");
        if (fixtureRow.length != 16) {
          throw "Hypersubs: Unexpected number of players in fixture block: " + fixtureRow.length + ". A change/bug in the FL site?"; 
        }
        var date = this.date;
        fixtureRow.each(function(i, row) {
          fixtures[i] = new FixtureRow(date, i, row);
        });
        return fixtures;
      }
      
      function FixtureRow(currentDate, shirtNumber, rowElem) {
        // TDs: 0. checkbox, 1. pos, 2. name, 3. status, 4. club, 5. club graphic, 6. opponent
        this.checkbox = this._getData(rowElem, "td:nth(0) input[type='checkbox']", function(elem) { return elem; }, "checkbox");
        var position = this._getData(rowElem, "td:nth(1) div[class*='pos']", FixtureRow._extractPosition, "playing position");
        var name = this._getData(rowElem, "td:nth(2)", function(elem) { return $(elem).text(); }, "player name")
        var status = this._getData(rowElem, "td:nth(3)", FixtureRow._extractStatus, "status");
        var statusDetails = this._getData(rowElem, "td:nth(3)", FixtureRow._extractStatusDetails, "status title");
        if (status == Status.values.INJURED && FixtureRow._statusEnded(currentDate, statusDetails)) {
          status = Status.values.DOUBTFUL;
          statusDetails = statusDetails + "<br/>(expected to return from earlier injury by this time)";
        } else if ((status == Status.values.SUSPENDED || status == Status.values.INTERNATIONALDUTY) && FixtureRow._statusEnded(currentDate, statusDetails)) {
          status = Status.values.READY;
        }
        var club = Club.fromString(this._getData(rowElem, "td:nth(4)", function(elem) { return $(elem).text(); }, "club name"));
        if (typeof(club.picName) == "undefined") {
          club.picName = this._getData(rowElem, "td:nth(5) div[class*='club-tiny-']", FixtureRow._extractPicName, "club shirt pic");
        }
        var opponent = Club.fromString(this._getData(rowElem, "td:nth(6)", FixtureRow._extractOpponent, "opponent")); 
        var isAtHome = this._getData(rowElem, "td:nth(6)", FixtureRow._extractHome, "opponent");
        this.player = new Player(shirtNumber, name, position, club, opponent, isAtHome, status, statusDetails);
      }
      FixtureRow.prototype._getData = function(rowElem, elementToFind, extractor, description) {
        var found = $(rowElem).find(elementToFind);
        if (found.length != 1) {
          throw "Hypersubs: Unexpected number of " + description + " elements: " + found.length + ". A change/bug in the FL site?";
        }
        var data = extractor(found);
        if (data === "") {
          throw "Hypersubs: Apparently missing " + description + " in: " + found.html() + ". A change/bug in the FL site?";
        }
        return data;
      }
      FixtureRow._extractPosition = function(posDiv) {
        var classes = $(posDiv).attr('class');  
        var candidate;
        var chosen;
        classes.split(" ").forEach(function (current) {
          candidate = FixtureRow.codesToPositions[current.toLowerCase()];
          if (typeof(candidate) != "undefined") {
            chosen = candidate;
          }
        });
        
        if (typeof(chosen) != "undefined") {
          return chosen;            
        } else {
          throw "Hypersubs: Unexpected playing position definition: " + classes + ". A change/bug in the FL site?";
        }
      }
      FixtureRow._extractStatus = function(td) {
        var statusDiv = $(td).find("div[class*='playerstatus']");
        if (statusDiv.length == 0) {
          return Status.values.READY; 
        } 
        if (statusDiv.length > 1) {
          throw "Hypersubs: Unexpected number of status items: " + statusDiv.length + ". A bug/change in the FL site?";
        }
        var classes = $(statusDiv).attr('class'); 
        var prioritized = null;
        classes.split(" ").forEach(function (current) {
          var status = FixtureRow.codesToStatuses[current.toLowerCase()];
          if (typeof(status) != "undefined") {
            if (prioritized == null || status == Status.values.INELIGIBLE || (status != Status.values.INELIGIBLE && status.likelihoodToPlay < prioritized.likelihoodToPlay)) {
              prioritized = status;
            }
          }
        });
        if (prioritized == null) {
          console.log("Hypersubs: Unexpected player status type: " + classes + ". Treating as ready to play.");
          return Status.values.UNKNOWN;
        } else {
          return prioritized;
        }
      }
      FixtureRow._extractStatusDetails = function(td) {
        var statusDiv = $(td).find("div[class*='playerstatus']");
        if (statusDiv.length == 0) {
          return "&nbsp;"; 
        }
        if (statusDiv.length > 1) {
          throw "Hypersubs: Unexpected number of status items: " + statusDiv.length + ". A bug/change in the FL site?";
        }
        return $(statusDiv).attr('title');
      }
      FixtureRow._statusEnded = function(date, statusDetails) {
        var match = /(\d+)\/(\d+)\/(\d+)/.exec(statusDetails);
        if (match == null) {
          console.log("Hypersubs: Warning: Failed to find return date in status details: '" + statusDetails + "'. Treating status as being immediately over.");
          return true;
        }
        var expiryYear = parseInt(match[3], 10);
        var expiryMonth = parseInt(match[2], 10);
        var expiryDay = parseInt(match[1], 10);
        
        match = /\s+(\d+)-([A-Z][a-z][a-z])\s+/.exec(date);
        if (match == null) {
          console.log("Hypersubs: Warning: Failed to parse fixture date: '" + date + "'. This can cause glitches in the durations of injuries/suspensions/etc.");
          return true;
        }
        var fixtureDay = parseInt(match[1], 10);
        var fixtureMonth = MONTHS.indexOf(match[2]);
        
        if (fixtureMonth < 0 || isNaN(fixtureDay) || isNaN(expiryYear) || isNaN(expiryDay) || isNaN(expiryMonth)) {
          console.log("Hypersubs: Warning: Failed to parse date information. This can cause glitches in the durations of injuries/suspensions/etc.");
          return true;
        }
        var realTime = new Date();
        var realYear = realTime.getFullYear();
        var realMonth = realTime.getMonth();
        var expiryDate = new Date(expiryYear, expiryMonth - 1, expiryDay);
        var fixtureYear = (realMonth < 6 || fixtureMonth > 5) ? realYear : realYear + 1;
        var fixtureDate = new Date(fixtureYear, fixtureMonth, fixtureDay);
        return expiryDate <= fixtureDate;
      }
      FixtureRow._extractPicName = function(picDiv) {
        var classes = $(picDiv).attr('class');  
        var picName;
        classes.split(" ").forEach(function (current) {
          if (current.indexOf("club-tiny-") == 0) {
            picName = current.substring("club-tiny-".length);
          }
        });
        return picName;            
      }
      FixtureRow._extractOpponent = function(opponentDiv) {
        var opponentText = $.trim($(opponentDiv).text());
        if (opponentText == "") {
          return null;
        }
        var paren = opponentText.indexOf("(");
        if (paren < 0) {
          throw "Hypersubs: Unexpected opponent description: " + opponentText + ". A change/bug in the FL site?";
        }
        return opponentText.substring(0, paren);
      }
      FixtureRow._extractHome = function(opponentDiv) {
        var opponentText = $.trim($(opponentDiv).text());
        if (opponentText == "") {
          return true;
        }
        var paren = opponentText.indexOf("(");
        if (paren < 0) {
          throw "Hypersubs: Unexpected opponent description: " + opponentText + ". A change/bug in the FL site?";
        }
        var groundLetter = opponentText[paren + 1];
        if ((groundLetter != "h" && groundLetter != "a") || opponentText[paren + 2] != ")") {
          throw "Hypersubs: Unexpected opponent description: " + opponentText + ". A change/bug in the FL site?"; 
        }
        return groundLetter == "h";
      }
      
      FixtureRow.codesToPositions = { };
      FixtureRow.codesToPositions["pos1"] = Position.values.GK; 
      FixtureRow.codesToPositions["pos2"] = Position.values.FB;
      FixtureRow.codesToPositions["pos3"] = Position.values.CB;
      FixtureRow.codesToPositions["pos4"] = Position.values.MF;
      FixtureRow.codesToPositions["pos6"] = Position.values.ST;
      FixtureRow.codesToStatuses = { };
      FixtureRow.codesToStatuses["ineligible"] = Status.values.INELIGIBLE;
      FixtureRow.codesToStatuses["suspended"] = Status.values.SUSPENDED;
      FixtureRow.codesToStatuses["internationalduty"] = Status.values.INTERNATIONALDUTY;
      FixtureRow.codesToStatuses["international"] = Status.values.INTERNATIONALDUTY;
      FixtureRow.codesToStatuses["injured"] = Status.values.INJURED;
      FixtureRow.codesToStatuses["doubtful"] = Status.values.DOUBTFUL;
      FixtureRow.codesToStatuses["latefitnesstest"] = Status.values.LATEFITNESSTEST;
      FixtureRow.codesToStatuses["ready"] = Status.values.READY; 

      // Out as checkboxes:

      SupersubsPage.prototype.set = function(flangeNumber, selection) {
        this.flanges[flangeNumber].select(selection);
      }
      
      Flange.prototype.select = function(selection) {
        this.fixtures.forEach(function(player, index) { 
          player.setSelected(selection[index]);
        });
      }
      
      FixtureRow.prototype.setSelected = function(isOrIsnt) {
        $(this.checkbox).prop('checked', isOrIsnt);
      }
    
    
      PositionChoice.prototype.toSupersubs = function() {
          return            this.chosen.map(function (player) { return { playerNumber: player.shirtNumber, selected: true }; })
                    .concat(this.choosable.map(function (player) { return { playerNumber: player.shirtNumber, selected: false }; }), 
                            this.onTheBench.map(function (player) {return { playerNumber: player.shirtNumber, selected: false};  }));
      }
      
      HypersubsSelection.prototype._toSupersubs = function () { 
        var results = [];
        for (var i = 0; i < this.choiceLists.length; i++) {
          for (var j = 0; j < this.choiceLists[i].positions.size(); j++) {
            results = results.concat(this.choiceLists[i].positions[j].toSupersubs());
          }
        }
        return results.sort(function (a, b) { return a.playerNumber - b.playerNumber; })
                      .map(function (player) { return player.selected; });
      }

      HypersubsSelection.prototype.setSupersubsCheckboxes = function(flangeNumber) {
        supersubs.set(flangeNumber, this._toSupersubs());
      }
      

      //////////////////////// CONTROLLING UPDATES ////////////////////////////////////////////////////////////////////
      
      // TODO: Reposition these

      function setView(newState) {
        _updateView(null, newState);
      }

      function transitionToView(oldSelections, newState) {
        _updateView(oldSelections, newState);
      }

      function _updateView(oldSelections, newState) { 
        var newSelections = newState.hypersubs;
        movePlayers(oldSelections, newSelections);
        updatePositionSelectors(newSelections);
        updateButtons(newState); 
        updateDialogTitle(newState); 
        updateFlangeCounter(newState); 
      }

      function movePlayers(oldSelections, newSelections) {
        var transitionFromPreviousState = oldSelections != null;
        if (!transitionFromPreviousState) {
          $("#hypersubs-content .hypersubs-player").stop(true, true);
        }
        $("#hypersubs-content .hypersubs-player").each(function () {
          $(this).playerCircle('move', oldSelections, newSelections, transitionFromPreviousState);
        });
      }
      
      function resetFlange() {
        loadFlange(state.currentFlange, state.smartFillCurrentlyOn); 
      }
      
      function loadFlange(flangeNumber, smartFill) {
        state.smartFillCurrentlyOn = smartFill;
        state.currentFlange = flangeNumber;
        state.teamName = supersubs.teamName;
        state.date = supersubs.flanges[flangeNumber].date;
        state.numberOfFlanges = supersubs.flanges.length;
        state.hypersubs = HypersubsSelection.createFromSquad(supersubs.getSquad(flangeNumber), smartFill);
        state.skip = !userPreferences.alwaysRequireNext && state.currentFlange < state.numberOfFlanges - 1 && state.hypersubs.isDone();   
        if (state.skip) { 
          state.hypersubs.setSupersubsCheckboxes(flangeNumber); 
          updateFlangeCounter(state);
          loadFlange(flangeNumber + 1, smartFill);
        } else {
          var allPlayers = state.hypersubs.getAllPlayers();
          $("#hypersubs-content .hypersubs-player").each(function (index) {
            $(this).playerCircle("setPlayer", allPlayers[index]);
          });
          setView(state);
        }
      }

      /////////////////////////////// "MAIN" ////////////////////////////////////////////////////////////

      var state = { }
      
        // Load data from Fantasy League site:

      var supersubs;
      try {
        supersubs = new SupersubsPage();
        console.log("Hypersubs: Loaded Supersubs data for " + supersubs.flanges.length + " sets of fixtures.");
      } catch (error) {
        console.log("Hypersubs: Failed to read Supersubs page; aborting.");
        console.log(error);
        alert(error);
        $('#hypersubs-splash').css('display', 'none');
        return;
      }

      if (supersubs.flanges.length == 0) {
        console.log("Hypersubs: No fixtures found. Nothing to do; aborting.")
        $('#hypersubs-splash').css('display', 'none');
        return;
      }
      
      // Load preferences
      var userPreferences = loadPreferences({ smartFill: true, showHypersubsShortcuts: true, showLeagueTransfers: true, showMoreInfoButton: true, alwaysRequireNext: true, pruneConfirmation: false, animate: true, strongAttacks: "MC, MU, CHE, ARS", strongDefenses: "MC, MU, CHE, ARS" }); // TODO: not quite DRY
      

      
      // Wait for jQuery UI theme to load, then launch: 

      function launchApp() {
        console.log("Hypersubs: Launching.");
        $('#hypersubs-main-dialog').dialog('open');
        $('#hypersubs-splash').css('display', 'none');
        loadFlange(0, userPreferences.smartFill);
      }
      
      var WAIT_INTERVAL = 50; // in ms
      var patience = 200; // in intervals
      var waitForThemeToLoad = true;
      var themeLoadWaiter = setInterval(function() {
        patience--;
        try {
          waitForThemeToLoad = $(".ui-icon").css("background-image").indexOf(THEME_PATH) < 0; // check for arbitrary bit of css  
        } catch (error) {
          console.log(error);
        }
        if (patience == 0) {
          console.log("Hypersubs: jQuery theme loading unexpectedly slowly. Will launch anyway.")
          waitForThemeToLoad = false;
        }
        if (!waitForThemeToLoad) {
          clearInterval(themeLoadWaiter)
          launchApp();
        }
      }, WAIT_INTERVAL);       


      /////////////////////////////////////////////////////////////////////////////////////////////////////  


    } catch (error) {
        console.log("Hypersubs: Failed to launch; aborting.");
        console.log(error);
        clearDoneCount();
        alert(error);
        $('#hypersubs-splash').css('display', 'none');
    } 
  });
})(jQuery);
