// ==UserScript==
// @name       OpenAir dynamic timesheet tweaks
// @namespace  http://relevantsite.com
// @version    0.1
// @description  makes dropdowns nicer
// @match      https://www.openair.com/timesheet.pl*
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @copyright  2012+, Jerry Wang
// ==/UserScript==

jQuery('body').delegate('.dhx_combo_select','focus', function(){ $(this).attr("size",30); });
var timesheetGrid = jQuery('#timesheet_grid');
timesheetGrid.width(1600);
jQuery(timesheetGrid.children('div')[1]).width(1600);