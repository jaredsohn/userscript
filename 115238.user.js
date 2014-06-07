// ==UserScript==
// @name          Hide Drupal.org Projects from Issue Page
// @namespace     https://www.userscripts.org/users/isaacsukin
// @description	  Hides Drupal.org projects from issue page
// @include       https://drupal.org/project/user*
// @include       http://drupal.org/project/user*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

$('table.projects').before('<div id="toggle-projects-table" style="text-align: center;"><a href="#">Show projects table</a></div>');
$('table.projects').hide();
$('.view-filters').hide();
$('#toggle-projects-table').click(function(e) {
  $('table.projects').toggle();
  $('.view-filters').toggle();
  if ($('table.projects').is(':visible')) {
    $(this).find('a').html('Hide projects table');
  }
  else {
    $(this).find('a').html('Show projects table');
  }
  e.preventDefault();
});