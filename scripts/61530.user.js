// ==UserScript==
// @name           Crosspointe Quicklook
// @namespace      CrosspointeQuicklook
// @description    Speeds Crosspointe by using AJAX for certain actions rather than reloading the page
// @include        http*://scsparentportal.sarasota.k12.fl.us/portal/dscy_pp_stud_assign_summ.aspx
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

$.fn.toggleIcon = function (targetIsVisible) {
  var newIcon = targetIsVisible ? 'collapse' : 'expand';
  this.attr('src', '/portal/images/icon_' + newIcon + '.gif')
}

$.expr[':'].isAssignmentHeader = function (el) {
  return el.id.match(/rpt_assignment_main_ctl\d+_tr_assignment_header/);
}

var expandLink = $('#lbt_expand_lbt');
if(expandLink.css('display') == 'block') { // expansion still necessary
  location.href = expandLink.attr('href');
} else { // already expanded
  var imageInputSelector = 'input[type=image]';
  $('tr:isAssignmentHeader').hide();
  function toggleTable(table, icon) {
    table.toggle();
    $(icon).toggleIcon(table.is(':visible'));
  }
  $(imageInputSelector + '[id$=img_m_collapse]').click(function (e) {
    var table = $(this).closest('table').parent().closest('table').closest('tr').next();
    toggleTable(table, this);
    e.preventDefault();
  }).toggleIcon(false);
  $(imageInputSelector + '[id$=img_h_collapse]').click(function (e) {
    var table = $(this).closest('table').closest('tr').next();
    toggleTable(table, this);
    e.preventDefault();
  });
}