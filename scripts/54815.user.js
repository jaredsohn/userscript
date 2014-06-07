// ==UserScript==
// @name           Unfuddle
// @namespace      com.telligent
// @description    Changes text in Unfuddle to match its use type. 
// @include        https://telliproduct.unfuddle.com/*
// ==/UserScript==

// Add jQuery

  var GM_JQ = document.createElement('script');
  GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
  GM_JQ.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(GM_JQ);
  var GM_JQnC = document.createElement('script');
  GM_JQnC.innerHTML = 'jQuery.noConflict();';
  document.getElementsByTagName('head')[0].appendChild(GM_JQnC);
  
// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { 
      $_ = unsafeWindow.jQuery.noConflict(); executeChanges(); }
    }
    
    GM_wait();
    
function executeChanges() {
  // Severity > Discipline
  $_('#tickets_report_table .report_table th a:contains(Severity)').text('Discipline');
  $_('.ticket_contents td:contains(Severity:)').text('Discipline:');
  $_('#new_ticket_project_ticket_meta_container .ticket_new_options table table td.label:contains(Severity:)').text('Discipline:');
  
  // Component > Virtual Team
  $_('#tickets_report_table .report_table th a:contains(Component)').text('Virtual Team');
  $_('.ticket_contents td:contains(Component:)').text('Virtual Team:');
  $_('#new_ticket_project_ticket_meta_container .ticket_new_options table table td.label:contains(Component:)').text('Virtual Team:');
  
  // Virtual Team <none> > Core
  $_('#show_ticket_render .ticket_contents td:contains(Virtual Team:)').next('td:contains(<none>)').text('Core');
  $_('#show_ticket_edit .ticket_contents td:contains(Virtual Team:)').next('td').find('select option:contains(<none>)').text('Core');
  $_('#new_ticket_project_ticket_meta_container .ticket_new_options table table td.label:contains(Virtual Team:)').next('td').find('select option:contains(<none>)').text('Core');
  
  // Version > Work Item Type
  $_('.ticket_contents td:contains(Version:)').text('Work Item Type:');
  $_('#new_ticket_project_ticket_meta_container .ticket_new_options table table td.label:contains(Version:)').text('Work Item Type:');

  // Hours > Points
  $_('.report_table th a:contains(Hours)').text('Points');
  $_('#new_ticket_project_ticket_meta_container .ticket_new_options table table td.label:contains(Hours:)').text('Points:');
  
  // Current Est. > Points
  $_('#tickets_report_table .report_table th a:contains(Current Est.)').text('Points');
  
  // Hours Spent > Points
  $_('#ticket_status_ticket_status_bar_actual_hours_div').html($_('#ticket_status_ticket_status_bar_actual_hours_div').html().replace("Hours Spent", "Points Completed"));
  // Estimated Hours > Total Points
  $_('#ticket_status_ticket_status_bar_estimated_hours_div').html($_('#ticket_status_ticket_status_bar_estimated_hours_div').html().replace("Estimated Hours", "Total Points"));
  
  
  // Milestone > Backlog
  $_('#tickets_report_table .report_table th a:contains(Milestone)').text('Backlog');
  $_('#new_ticket_project_ticket_meta_container .ticket_new_options table table td.label:contains(Milestone:)').text('Backlog:');
}