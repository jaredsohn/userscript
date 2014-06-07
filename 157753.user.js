// ==UserScript==
// @name        Ingress Mods
// @namespace   http://herohtar.com:1313/
// @description Various Ingress intel site modifications
// @include     http://www.ingress.com/intel*
// @include     https://www.ingress.com/intel*
// @version     0.7.2
// @copyright   2013, Caleb Martin
// @require     http://code.jquery.com/jquery-latest.min.js
// @updateURL   https://userscripts.org/scripts/source/157753.meta.js
// @downloadURL https://userscripts.org/scripts/source/157753.user.js
// ==/UserScript==

/*************
 * Functions *
 *************/

// This function injects JavaScript into the page so it can run within the correct scope
function inject(func) {
  var source = func.toString();
  var script = document.createElement('script');
  script.innerHTML = "(" + source + ")()";
  document.body.appendChild(script);
}

// This function contains code to be injected into the page
function injection() {
  // *** Begin injected code ***

  // This function returns true if the portal meets the level criteria
  Ae = function (a) {
    // Only show portals in a specified range: (a.e >= min) && (a.e <= max)
    return ((a.p.length ? a.d : 0) >= $('#hero_portal_min').val()) && ((a.p.length ? a.d : 0) <= $('#hero_portal_max').val());
  }

  // *** End injected code ***
}

// Adds a filter option to COMM; removes all resonator/link/etc notifications
function addFilterCheckbox() {
  $('<br/><input id="hero_filter_checkbox" type="checkbox"></input><div id="pl_checkbox_text">Filter COMM</div>').insertAfter('#plext_viewport_restrict_checkbox_container #pl_checkbox_text');
  $('#hero_filter_checkbox').click(
    function () {
      if ($(this).is(':checked')) {
        // Hide all messages with the broadcast class
        $('.pl_broad').parent().hide();
      } else {
        // Restore hidden messages
        $('.pl_broad').parent().show();
      }
    }
  );
}

// Adds a dropdown to select how many lines of chat to load at once
function addLoadCount() {
  //$('<div id="hero_dropdown" style="float:right;"><select id="hero_load_count"><option value="50">50 lines per load</option><option value="100" selected="true">100 lines per load</option><option value="250">250 lines per load</option><option value="500">500 lines per load</option></select></div>').insertBefore('#plext_primary_title');
}

// Adds extra AP info and provides some formatting
function addAPInfo() {
  // AP needed for each level
  apLevels = [0,10000,30000,70000,150000,300000,600000,1200000];

  // Get info from the display
  playerLevel = $('#player_level').html();
  currentAP = $('#ap .number:first');
  neededAP = $('#ap .number:last');

  // AP from previous level
  prevAP = apLevels[playerLevel - 1];

  // Actual AP values for current level
  currentAP_actual = currentAP.html() - prevAP;
  neededAP_actual = neededAP.html() - prevAP;

  // Calculate percent and difference for use later
  //percent = ((currentAP.html() - prevAP)/(neededAP.html() - prevAP))*100;
  percent = (currentAP.html()/neededAP.html())*100;
  percent_actual = (currentAP_actual/neededAP_actual)*100;
  difference = neededAP.html() - currentAP.html();

  // Format the values
  currentAP.html(currentAP.html().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  neededAP.html(neededAP.html().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  currentAP_actual = currentAP_actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  neededAP_actual = neededAP_actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Add AP display below the XM progress bar
  $('<div id="hero_ap" style="float:left;"><span style="font-family:verdana;">'+currentAP.html()+' <span class="color_orange">/ '+neededAP.html()+' AP</span> (<span class="color_orange">'+percent_actual.toFixed(1)+'%</span>)</span></div>').insertBefore('#xm');
  //$('<div id="hero_ap" style="float:left;"><span style="font-family:verdana;">'+currentAP_actual+' <span class="color_orange">/ '+neededAP_actual+' AP</span> (<span class="color_orange">'+percent_actual.toFixed(1)+'%</span>)</span></div>').insertBefore('#xm');

  // Add percent to stats display
  $('#ap div:first').html($('#ap div:first').html() + ' <span class="color_orange">(' + percent.toFixed(1) + '% of total)</span>');

  // Add the amount of AP remaining to the stats display
  $('<div id="hero_diff"><span class="number">' + difference.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span> AP to go</div>').insertAfter('#ap div:last');
}

// Create options link and window and set up option events
function addOptions() {
  // Add button for options
  $('<div id="hero_options_link" class="nav_link" style="cursor:pointer;">Options</div>').insertAfter('#community').click(function(){$(this).addClass('selected');$('#hero_options').fadeIn();});

  // CSS for options window
  var optionsCSS = {
    'background': 'rgba(0, 0, 0, 0.85)',
    'border': '1px solid #ebbc4a',
    'top': ($(document).height() / 2) + 'px',
    'color': '#ebbc4a',
    'padding': '8px 20px 10px 20px',
    'position': 'absolute',
    'left': ($(document).width() / 2) + 'px',
    'z-index': '100'
  }
  // Add box for options
  $('<div id="hero_options"></div>').insertBefore('#butterbar').css(optionsCSS);
  $('#hero_options').append('<b>Options</b><br/>');
  
  // Update timer option
  $('#hero_options').append('<br/><input id="hero_update_checkbox" type="checkbox"></input><div id="pl_checkbox_text">Continual refresh</div>')
    .click(
      function(){
        localStorage.updateTimer = $('#hero_update_checkbox').prop('checked');
      }
    );
  
  // Remove "investigation" option
  $('#hero_options').append('<br/><input id="hero_remove_i_checkbox" type="checkbox"></input><div id="pl_checkbox_text">Remove "Investigation" link</div>')
    .click(
      function(){
        localStorage.removeInvestigation = $('#hero_remove_i_checkbox').prop('checked');
        $('#hero_remove_i_checkbox').is(':checked') ? $('#investigation').hide() : $('#investigation').show();
      }
    );
  
  // Remove "community" option
  $('#hero_options').append('<br/><input id="hero_remove_c_checkbox" type="checkbox"></input><div id="pl_checkbox_text">Remove "G+ Community" link</div>')
    .click(
      function(){
        localStorage.removeCommunity = $('#hero_remove_c_checkbox').prop('checked');
        $('#hero_remove_c_checkbox').is(':checked') ? $('#community').hide() : $('#community').show();
      }
    );

  // Chat radius option
  $('#hero_options').append('<br/><input id="hero_show_local_radius" type="checkbox"></input><div id="pl_checkbox_text">Show local chat radius (20km)</div>')
    .click(
      function(){
        localStorage.showLocalRadius = $('#hero_show_local_radius').prop('checked');
        radius1.setVisible($('#hero_show_local_radius').is(':checked'));
      }
    );

  // Load lines option
  $('#hero_options').append('<br/><select id="hero_load_count"><option value="50">50 lines per load</option><option value="100" selected="true">100 lines per load</option><option value="250">250 lines per load</option><option value="500">500 lines per load</option></select>');

  // Close button
  $('<br/><br/><span style="border:1px solid #ebbc4a;cursor:pointer;float:right;">Close</span>').appendTo('#hero_options').click(function(){$(this).parent().fadeOut();$('#hero_options_link').removeClass('selected');});
  $('#hero_options').offset({top: ($(document).height() - $('#hero_options').height()) / 2, left: ($(document).width() - $('#hero_options').width()) / 2});
  $('#hero_options').hide();
}

// Create and add controls to filter portals by level
function addPortalControls() {
  // Add the portal level controls
  $('<div id="hero_min" class="nav_link">Min. level: <select id="hero_portal_min"><option value="0">Neutral</option><option value="1">Level 1</option><option value="2">Level 2</option><option value="3" selected="true">Level 3</option><option value="4">Level 4</option><option value="5">Level 5</option><option value="6">Level 6</option><option value="7">Level 7</option><option value="8">Level 8</option></select></div>').insertAfter('#hero_options_link');
  $('<div id="hero_max" class="nav_link">Max. level: <select id="hero_portal_max"><option value="0">Neutral</option><option value="1">Level 1</option><option value="2">Level 2</option><option value="3">Level 3</option><option value="4">Level 4</option><option value="5" selected="true">Level 5</option><option value="6">Level 6</option><option value="7">Level 7</option><option value="8">Level 8</option></select></div>').insertAfter('#hero_min');

  // Events for the portal level boxes
  $('#hero_portal_min').change(
    function () {
      // Don't let min be higher than max
      if ($(this).val() > $('#hero_portal_max').val()) {
        $('#hero_portal_max').val($(this).val()).change();
      }
      // I have no clue what this function is, but it seems to refresh the portal display, so I'll take it
      V.e().Z(false);
    }
  );
  $('#hero_portal_max').change(
    function () {
      // Don't let max be less than min
      if ($(this).val() < $('#hero_portal_min').val()) {
        $('#hero_portal_min').val($(this).val());
      }
      // I have no clue what this function is, but it seems to refresh the portal display, so I'll take it
      V.e().Z(false);
    }
  );
}

// Add handlers to the page's AJAX events so we can modify/view the data passing through
function addAjaxEvents() {
  // Triggers before an AJAX request is sent
  $(document).ajaxSend(
    function(event,xhr,settings) {
      // Set the number of COMM lines to load
      if (JSON.parse(settings.data).method == "dashboard.getPaginatedPlextsV2") {
        // Unpack the data, modify the value, and pack it back up
        data = JSON.parse(settings.data);
        data.desiredNumItems = $('#hero_load_count').val();
        settings.data = JSON.stringify(data);
      }
    }
  )

  // Triggers after an AJAX request has completed
  $(document).ajaxComplete(
    function(event,xhr,settings) {
      // Filter COMM if new messages have been loaded
      if (JSON.parse(settings.data).method == "dashboard.getPaginatedPlextsV2" && $('#hero_filter_checkbox').is(':checked')) {
        $('.pl_broad').parent().hide();
      }
      // TODO: Once passcodes are working on the site again, results code will go here
    }
  );

  // Triggers on AJAX errors
  $(document).ajaxError(
    function(event,xhr,settings,exception) {
        // Display error message for passcode results
        if (JSON.parse(settings.data).method == "dashboard.redeemReward") {
          $('#hero_results span').html(exception);
          $('#hero_results').slideDown();
        }
    }
  );
}

// Create and add a box to display passcode results
function addResultsBox() {
  // CSS for passcode results window (copied from butterbar)
  var resultsCSS = {
    'background': 'rgb(1, 1, 1)',
    'background': 'rgba(0, 0, 0, 0.85)',
    'border': '1px solid #ebbc4a',
    'bottom': '50px',
    'color': '#ebbc4a',
    'cursor': 'pointer',
    'padding': '8px 20px 10px 20px',
    'position': 'absolute',
    'right': '150px',
    'z-index': '1'
  };

  // Add box for passcode results
  $('<div id="hero_results" style="display: none;">Passcode results:<br/><span></span></div>').insertBefore('#butterbar').css(resultsCSS).click(function(){$(this).slideUp();});
}

// Initializes the options
function initializeOptions() {
  // Update timer option
  if (localStorage.updateTimer == null) {
    localStorage.updateTimer = true;
  }
  // Have to parse the boolean value because localStorage converts everything to strings
  $('#hero_update_checkbox').prop('checked', JSON.parse(localStorage.updateTimer));
  
  // Remove "investigation" option
  if (localStorage.removeInvestigation == null) {
    localStorage.removeInvestigation = false;
  }
  // Same as above
  var remove = $('#hero_remove_i_checkbox').prop('checked', JSON.parse(localStorage.removeInvestigation)).is(':checked');
  if (remove) {
    $('#investigation').hide();
  } // No need to .show() for the other case since it is shown by default

  // Remove "community" option
  if (localStorage.removeCommunity == null) {
    localStorage.removeCommunity = false;
  }
  // Same as above
  var remove = $('#hero_remove_c_checkbox').prop('checked', JSON.parse(localStorage.removeCommunity)).is(':checked');
  if (remove) {
    $('#community').hide();
  } // No need to .show() for the other case since it is shown by default

  // Show chat radius option
  if (localStorage.showLocalRadius == null) {
    localStorage.showLocalRadius = true;
  }
  // Have to parse the boolean value because localStorage converts everything to strings
  $('#hero_show_local_radius').prop('checked', JSON.parse(localStorage.showLocalRadius));
}

// Updates the inactivity timer to avoid timeouts
function updateTimer() {
  if ($('#hero_update_checkbox').is(':checked')) {
    // Call the function that updates the timer
    V.e().aa();
    // Continue updating the timer
    setTimeout(updateTimer, 29E4);
  }
}

// Shows the change in stats from the previous visit/refresh
function showStats() {
  // Initialize local storage
  if (localStorage.ap == null) {
    localStorage.ap = 0;
  }
  if (localStorage.xm == null) {
    localStorage.xm = 0;
  }
  
  // Calculate the change in AP and XM 
  ap_change = PLAYER.ap - localStorage.ap;
  xm_change = PLAYER.energy - localStorage.xm;

  // Update the saved values
  localStorage.ap = PLAYER.ap;
  localStorage.xm = PLAYER.energy;

  // CSS for stats window
  var statsCSS = {
    'background': 'rgba(0, 0, 0, 0.85)',
    'border': '1px solid #ebbc4a',
    'top': ($(document).height() / 2) + 'px',
    'color': '#ebbc4a',
    'cursor': 'pointer',
    'padding': '8px 20px 10px 20px',
    'position': 'absolute',
    'left': ($(document).width() / 2) + 'px',
    'z-index': '100'
  }
  // Add box for stats
  $('<div id="hero_stats"></div>').insertBefore('#butterbar').css(statsCSS);
  $('#hero_stats').append('<b>Since last time:</b><br/>');
  $('#hero_stats').append(((ap_change >= 0) ? '<span style="color:green;">+' : '<span style="color:red;">') + ap_change.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span> AP<br/>');
  $('#hero_stats').append(((xm_change >= 0) ? '<span style="color:green;">+' : '<span style="color:red;">') + xm_change.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span> XM<br/>');
  $('#hero_stats').offset({top: ($(document).height() - $('#hero_stats').height()) / 2, left: ($(document).width() - $('#hero_stats').width()) / 2});
  $('#hero_stats').click(
    function() {
      $(this).hide();
    }
  );
}

/*************
 * Main Code *
 *************/

// Add an ID to the "Investigation" and "Community" links so they're easier to deal with later
$('#nav .nav_link:nth-child(2)').prop('id', 'investigation');
$('#nav .nav_link:nth-child(3)').prop('id', 'community');

// Attempt to make a joke at the expense of the Enlightened :P
$('<span>You must be Enlightened. </span>').insertBefore('#butterbar span');

// Add controls and events
addOptions();
addPortalControls();
addAjaxEvents();
addResultsBox();

var radius1;
var radius2;

// Execute setup functions
// This is for items that can't be added until the page has been fully built
// Checks to make sure the necessary elements exist before trying to add to them
function setup() {
  if (($('#plext_viewport_restrict_checkbox_container #pl_checkbox_text').length > 0) && ($('#ap').length > 0)) {
    addFilterCheckbox();
    addLoadCount();
    addAPInfo();
    initializeOptions();
    
    var visible = JSON.parse(localStorage.showLocalRadius);
    radius1 = new google.maps.Circle({map:V.e().q,center:V.e().q.getCenter(),radius:20000,strokeColor:"red",strokeWeight:2,fillColor:"red",fillOpacity:0.05,clickable:false,visible:visible});
    //radius2 = new google.maps.Circle({map:V.e().q,center:V.e().q.getCenter(),radius:200000,strokeColor:"red",strokeWeight:2,fillColor:"red",clickable:false});
    Rd = function(a) {
      T != a && (T = a, _gaq.push(["_trackEvent", "Map", "Zoom level change", a]), B(Qd, function(a) {
        a()
      }));
      radius1.setCenter(V.e().q.getCenter());
      //radius2.setCenter(V.e().q.getCenter());
    };
  } else {
    setTimeout(setup, 100);
  }
}

// Start checking for elements
setTimeout(setup, 100);

// Start the timer update
setTimeout(updateTimer, 1E4);

// Inject extra JavaScript
inject(injection);

// Show stat change
showStats();