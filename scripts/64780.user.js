// ==UserScript==
// @name           LastFM auto-refresher
// @namespace      userscripts.org
// @description    AJAX auto-Refreshes recent tracks, shouts, and artists on the user page for Last.fm without a full page refresh
// @include        http://www.last.fm/user/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        1.08
// ==/UserScript==

var refreshInterval = GM_getValue("timer");
var refreshState = GM_getValue("refresh");

GM_addStyle("#hiddenOptions{position:absolute; right:15px; top:15px; border:3px solid; display:none; padding:10px;}"+
            "#refreshSettings{position:absolute; right:15px; top:15px;}"+
            "#refreshNow{margin-top:20px; margin-bottom:20px;}"+
            ".rightCol h2.first{margin-top:0px;}"+
            "#hiddenOptions a.dialogClose{margin:0;}"+
            "#hiddenOptions input.confirmButton{margin-top:10px;}");

$(document).ready(function(){
  $("h2.first").removeClass("first");
  
  // Building the select drop down programmatically to stuff into the Auto Refresh panel
  var selectOptions = '';
  for (var i = 1; i <= 10; i++){
    selectOptions += '<option value="'+ i +'">'+ i +'</option>';
  }
  
  $("div.rightCol").prepend('<h2 class="first heading">'+
                                    '<span class="h2Wrapper">Auto Refresh</span></h2>' +
                                    '<a href="#" class="mEdit icon" id="refreshSettings">'+                                    
                                    '<img height="9" width="9" src="http://cdn.last.fm/flatness/clear.gif" class="icon settings_icon"><span>Settings</span></a>'+
                                    '<div class="dialogBox" id="hiddenOptions">'+
                                    '<a href="#" class="dialogStatus dialogClose"></a>'+
                                    '<div>Refresh every <select id="refreshForm">'+ selectOptions +'</select> minutes</div>'+
                                    '<input type="submit" id="confirmRefresh" value="Confirm" class="confirmButton" name="refreshConfirm"></div>'+                                    
                                    '<div id="auto-refresh">Auto-Refresh: <a href="#toggleAuto">On</a></div>'+
                                    '<input type="submit" id="refreshNow" value="Refresh Now" class="confirmButton" name="refreshNow">');
  
  // Make sure the refresh state isn't starting on if the user has selected to turn it off
  if (refreshState == "Off"){
    myinterval = clearInterval(myinterval);
    $("#auto-refresh a").html("Off");
  }
  
  console.log(refreshInterval);
  // If the refresh interval is not set it needs to default to 3 minutes.
  if (!refreshInterval){
    refreshInterval = 180000;
  }
  
  // The settings form says minutes instead of using milliseconds for clarity so we need to convert back and forth on occasion
  var refreshIntMin = refreshInterval / 60000;
  var refreshFormMs = $("#refreshForm").val() * 60000;
  
  $("#refreshForm").val(refreshIntMin);  
  var myinterval = window.setInterval(refreshFunc, refreshInterval);
  
  // Open the option panel
  $("#refreshSettings").bind("click", function(){
    $("#hiddenOptions").fadeIn();
  });
  
  // Closing without confirming resets the value of the drop-down
  $("#hiddenOptions a.dialogClose").bind("click", function(){
    $("#hiddenOptions").fadeOut();
    $("#refreshForm").val(refreshIntMin);
  });
  
  // Confirming clears the current loop and sets the timer to start again with the updated value
  $("#confirmRefresh").bind("click", function(){
    refreshInterval = refreshFormMs = $("#refreshForm").val() * 60000;
    refreshIntMin = refreshInterval / 60000;
    GM_setValue("timer", refreshFormMs);
    myinterval = clearInterval(myinterval);
    myinterval = window.setInterval(refreshFunc, refreshInterval);
    $("#hiddenOptions").fadeOut();
  });
  
  // Set the auto refresh to on or off when a user clicks on the on/off link
  $("#auto-refresh a").bind("click", function(){
    myhtml = $(this).html();
    switch(myhtml){
      case 'On':
        $(this).html("Off");
        GM_setValue("refresh", "Off");
        myinterval = clearInterval(myinterval);
        break;
      case 'Off':
        $(this).html("On");
        GM_setValue("refresh", "On");
        myinterval = window.setInterval(refreshFunc, refreshInterval);
        break;
    }
  });
  
  $("#refreshNow").bind("click", function(){
    refreshFunc();
  });
  
});

// Function that goes and grabs the user page you are on and replaces the recent track and artists html in the recent tracks and artist tables
function refreshFunc(){
  try{
    $.ajax({
      url: document.location.pathname,
      cache: false,
      success: function(html){
        parsed_html = $(html);
        $("table#recentTracks").replaceWith(parsed_html.find("table#recentTracks"));
        $("ul.artistsLarge").replaceWith(parsed_html.find("ul.artistsLarge"));
        $("ul#shoutList").replaceWith(parsed_html.find("ul#shoutList"));
      }
    });
  }
  catch(err){
    $("div.recentTracksContainer").html("<p style='color:red; font-weight:bold;'>Error: " + err + "</p>" +
      "<p>It appears the last.fm servers are busy at the moment. This should be resolved momentarily.</p>");
  }
}