// ==UserScript==
// @name       College Football Conference Comparer
// @namespace  radreichley
// @author     JamesSwift
// @version    1.3
// @description  Scrapes NCAA football standings and compares the results for out of conference games.
// @match      http://espn.go.com/college-football/standings*
// @copyright  2012+
// ==/UserScript==

(function() {
  
    ////////////////////
   // Custom Methods //
  ////////////////////
  
  // DOM Exception 8 thrown without this for some reason...
  Element.prototype.prependChild = function(child) { this.insertBefore(child, this.firstChild); };
  // Allow forEach enumeration on NodeLists
  var forEach = Array.prototype.forEach;
  // Quick functional filtering
  var reject = function (obj, predicate) {
    var newCollection = [];
    forEach.call( obj, function (item) {
      if( !predicate( item ) ) {
        newCollection.push( item );
      }
    });
    return newCollection;
  };
  
    /////////////
   // Classes //
  /////////////
  
  // Record
  function Record() {
    this.wins = 0;
    this.losses = 0;
  }
  Record.prototype.winRate = function (decimalPlaces) {
    decimalPlaces = (typeof decimalPlaces === "undefined") ? 0 : decimalPlaces;
    return ( this.losses == 0 ? 100 : (this.wins/(this.wins+this.losses) * 100).toFixed(decimalPlaces) );
  };
  
  // Records
  function Records() {
    this.conference = new Record();
    this.overall = new Record();
    this.nonconference = new Record();
  }
  Records.prototype.inferNonconference = function () {
    this.nonconference.wins = this.overall.wins - this.conference.wins;
    this.nonconference.losses = this.overall.losses - this.conference.losses;
    return this;
  };
  
  // Conference
  function Conference() {
    this.name = "";
    this.teams = [];
    this.records = new Records();
  }
  
  // Team
  function Team() {
    this.name = "";
    this.records = new Records();
  }
  
// ------------------------------------------------------------------------------
// Begin Actual Script
// ------------------------------------------------------------------------------
    
    ///////////////////
   // Screen Scrape //
  ///////////////////
  
  var conferenceTables = document.getElementsByClassName("mod-no-header"),
      conferences = [];
  forEach.call( conferenceTables, function ( conferenceTable ) {
    var conference = new Conference();
      
    // e.g. "ACC Standings"
    conference.name = conferenceTable.getElementsByTagName("h4")[0].textContent;
    // e.g. "ACC"
    conference.name = conference.name.substring( 0, conference.name.length - " Standings".length );
    
    team_rows = conferenceTable.getElementsByTagName("tr");
    // Remove if it isn't an actual team row (i.e. it is a header row)
    team_rows = reject(team_rows, function( row ) {
      return row.className.indexOf("team") == -1;
    });
    
    forEach.call(team_rows, function( row ) {
      var name = row.getElementsByTagName("a")[0].textContent,
          conf_rec = row.getElementsByTagName("td")[1].textContent.split("-"),
          overall_rec = row.getElementsByTagName("td")[2].textContent.split("-");
      
      // Parse out the wins/losses
      var conf_wins = parseInt(conf_rec[0]),
          conf_losses = parseInt(conf_rec[1]),
          overall_wins = parseInt(overall_rec[0]),
          overall_losses = parseInt(overall_rec[1]);
      
      // Build JS object
      var team = new Team();
      team.name = name;
      team.records.overall.wins = overall_wins;
      team.records.overall.losses = overall_losses;
      
      // Independents don't have a conference record
      if (conference.name != "IA Independents") {
        team.records.conference.wins = conf_wins;
        team.records.conference.losses = conf_losses;
      }
      team.records.inferNonconference();
          
      conference.teams.push(team);
    });
    
    conferences.push( conference );
  });
  
    ////////////////////////////
   // Sum up and sort totals //
  ////////////////////////////
    
  conferences.forEach( function( conference ) {
    conference.teams.forEach( function( team ) {
      conference.records.conference.wins += team.records.conference.wins;
      conference.records.conference.losses += team.records.conference.losses;
      
      conference.records.overall.wins += team.records.overall.wins;
      conference.records.overall.losses += team.records.overall.losses;
    });
    conference.records.inferNonconference();
  });
  
  conferences = sortBy( conferences, "nonconf.wr.desc" );
  
    /////////////////////////////////
   // Build and insert DOM object //
  /////////////////////////////////
  
  var outerDiv = document.createElement("div"),
      innerDiv = document.createElement("div"),
      clearDiv = document.createElement("div"),
      divHeader = document.createElement("div"),
      divContent = document.createElement("div");
  
  outerDiv.className = "span-4";
  innerDiv.className = "mod-container mod-table mod-no-header mod-no-footer";
  clearDiv.className = "clear";
  divHeader.className = "mod-header stathead";
  divContent.className = "mod-content";
  divContent.id = "dookiebooty";
  
  divHeader.innerHTML = "<h4 style='background:#000; color:#FF0000;'>Conference Summary</h4>";
  innerDiv.appendChild(divHeader);
  
  buildTable(divContent, "nonconf.wr.desc");
  
  innerDiv.appendChild(divContent);
  outerDiv.appendChild(innerDiv);
  document.getElementsByClassName("span-4")[0].prependChild( outerDiv );
  document.getElementById("nonconf.wr.desc").innerText = "Win Rate ↓";
  
  // Add onClick handlers to enable sorting
  tds = document.getElementsByClassName("sortable");
  attachSortHandlers(tds);
  
// ------------------------------------------------------------------------------
// End Actual Script
// ------------------------------------------------------------------------------
  
    //////////////////////
   // Helper functions //
  //////////////////////
  
  function buildTable (theDiv, sortStr) {
    // NBSP's added to make the sort less jarring when we append an arrow to the end of the innerText
    conferences = sortBy(conferences, sortStr);
    
    var htmlStr = '<table class="tablehead" cellpadding="3" cellspacing="1" style="background:#FFFFFF;"><tbody>';
    htmlStr += '<tr align="center" class="colhead"><td align="center" rowspan="2">Conference Name</td><td colspan="3">Nonconference</td><td colspan="3">Overall</td></tr>';
    htmlStr += '<tr align="center" class="colhead"><td class="sortable" id="nonconf.wr.desc">Win Rate&nbsp;</td><td class="sortable" id="nonconf.wins.desc">W&nbsp;</td><td class="sortable" id="nonconf.losses.desc">L&nbsp;</td>';
    htmlStr += '<td class="sortable" id="overall.wr.desc">Win Rate&nbsp;</td><td class="sortable" id="overall.wins.desc">W&nbsp;</td><td class="sortable" id="overall.losses.desc">L&nbsp;</td></tr>';
    
    var i = 1;
    conferences.forEach( function (conference) {
      htmlStr += '<tr align="center" class="';
      htmlStr += (i++%2 == 1) ? 'oddrow' : 'evenrow';
      htmlStr += '"><td align="left">' + conference.name + '</td>';
      htmlStr += '<td>&nbsp;' + conference.records.nonconference.winRate(2) + '</td><td>&nbsp;' + conference.records.nonconference.wins + '</td><td>&nbsp;' + conference.records.nonconference.losses + '</td>';
      htmlStr += '<td>&nbsp;' + conference.records.overall.winRate(2) + '</td><td>&nbsp;' + conference.records.overall.wins + '</td><td>&nbsp;' + conference.records.overall.losses + '</td></tr>';
    });
    htmlStr += '</tbody></table>';
    theDiv.innerHTML = htmlStr;
  }
  
  function attachSortHandlers(theTds) {
    forEach.call(theTds, function (td) {
      td.addEventListener("click", function() {
        var oldId = this.id;
        buildTable(divContent, oldId);
        attachSortHandlers(theTds);
        
        // We have to explicitly search for the TD because we are handgenerating new TDs
        // in the buildTable method each time we sort. Also note that the generated id
        // will always have the default suffix of 'desc' so we need to account for that
        var newTd = document.getElementById( oldId.split(".").splice(0,2).join(".") + ".desc" );
        newTd.id = toggleSortOrder(oldId);
        newTd.innerText = newTd.innerText.split("").slice(0,-1).join("") + ((oldId.split(".")[2] == "asc") ? " \u2191" : " \u2193");
      });
    });
  }
  
  function toggleSortOrder(oldId) {
    // e.g. oldId == "nonconf.wins.asc"
    var parsedId = oldId.split(".");
    parsedId[2] = (parsedId[2] == "asc") ? "desc" : "asc";
    return parsedId.join(".");
  }
  
  function sortBy (arr, key) {
    var sortPrefs = key.split(".");
    return arr.sort( function(a,b) {
      switch (sortPrefs[0]) {
        case "conf":
          a = a.records.conference;
          b = b.records.conference;
          break;
        case "overall":
          a = a.records.overall;
          b = b.records.overall;
          break;
        default:
          a = a.records.nonconference;
          b = b.records.nonconference;
          break;
      }
      switch (sortPrefs[1]) {
        case "wins":
          a = a.wins;
          b = b.wins;
          break;
        case "losses":
          a = a.losses;
          b = b.losses;
          break;
        default:
          a = a.winRate(10);
          b = b.winRate(10);
          break;
      }
      if (a < b) {
        return (sortPrefs[2]) == "asc" ? -1 : 1;
      } else if (a > b) {
        return (sortPrefs[2]) == "asc" ? 1 : -1;
      }
      return 0;
    }); 
  }
  
})();