// ==UserScript==
// @name        Amazon AWS Status Page Filter
// @namespace   http://userscripts.org/hal1900-AmazonAWSStatusPageFilter
// @description When services have problems, hide services where no problems exist. When no problems exist, show full list as normal.
// @include     http://status.aws.amazon.com/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     9
// ==/UserScript==

/*jslint white:true */
/*global jQuery */

(function($){
  'use strict';
  var $currentEvents = $('#current_events_block'); // "Current Status" table, as opposed to "Status History" table

  function processIssues(regionId) {
    var $header, $allServices, $available, $issues, $el, message, filterMessage, style;
    
    $header = $currentEvents.find(regionId).find('thead tr th:first-child'); // "Current Status" table heading for selected region
    if ($header.find('div').length !== 1){
      $allServices = $currentEvents.find(regionId).find('tbody tr td:first-child img');
      $available = $allServices.filter('[src="images/status0.gif"]');
      $issues = $allServices.not('[src="images/status0.gif"]');
      
      if ($issues.size() > 0) {
        message = $issues.size() + ' out of ' + $allServices.size() + ' services are experiencing issues';
        style = { 'background-color': '#DA0428' }; // red
        $available.closest('tr').hide();
        filterMessage = 'The list below has been filtered to show only issues';
      } else {
        message = 'None of the ' + $allServices.size() + ' services are experiencing issues';
        style = { 'background-color': '#1C8F58' }; // green
      }
      
      $el = $('<div style="padding-top:2px; padding-bottom:2px;"><span style="color:white; padding: 0 2px;"></span></div>');
      $el.find('span:first').css(style).text(message);
      if (filterMessage) {
        $el.find('span:first').after('<span style="display: block; padding-top:2px; padding-bottom:2px;">' + filterMessage + '</span>');
      }
      
      $header.append($el);
    }
    $allServices, $available, $issues, $header, $el = null;
  }

  var initialRegion = $currentEvents.find('li.tabStandard.selected div a').attr('href');
  processIssues(initialRegion);

  $currentEvents.find('li.tabStandard div a').click(function (e) {
    var regionHash = $(this).attr('href');
    processIssues(regionHash);
  });

}(jQuery));