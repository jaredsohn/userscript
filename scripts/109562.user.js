// ==UserScript==
// @name           Strac running points
// @description    Displays running total of story points as well a button to update the points
// @namespace      http://www.atomicobject.com
// @match          https://strac.atomicobject.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==


addRecalculateButton();
// execScript();


function addRecalculateButton()
{
  $("<button id='update_backlog_running_points_button' style='float:right;'>Update backlog running points</button>").insertAfter($('#content .section h2'));
  $('#update_backlog_running_points_button').bind('click', execScript);
}


function execScript()
{
  // Clear existing running points
  $('#iteration_nil .running_points').remove();

  var totalRunningPoints = 0;
  
  // for each story in the backlog
  $('#iteration_nil .story_card .header').each(function(index, story){
    var storyObj = $(story);

    // Calculate current running points
    var points = $(storyObj.find('.points'));
    totalRunningPoints += Number(points.text());
    
    // Append to DOM after the story points
    var runningPointsSpan = String.concat("<span class='running_points'> (", String.concat(totalRunningPoints, ") </span>"));
    $(runningPointsSpan).insertAfter(points)
  });
}

