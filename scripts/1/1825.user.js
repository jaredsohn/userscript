// Created by Patrick Smith
// http://patricksmith.org
//
// Market Hardware, Inc. 
// http://markethardware.com
//
// v. 0.1
// 2005_09_17
//
// ! Only tested with Firefox 1.0.4 !
//
// ==UserScript==
// @name        basecamp_quicklinks
// @version   0.1
// @description quick links for adding messages, to-do lists, milestones, files & hours to an exisiting project; also a shortcut to create new basecamp projects
// @namespace   https://projects.markethardware.com/
// @include     https://*.updatelog.*/*
// @include     https://*.clientsection.*/*
// @include     https://*.seework.*/*
// @include     https://*.grouphub.*/*
// @include     https://*.projectpath.*/*
// ==/UserScript==
//
// To Configure:
// 1. Add your basecamp person_id
// 2. Run the script and check JS console for test output
// 3. Set logging to false

// CONFIGURE #1. basecamp person identifier
const person_id = null;

// CONFIGURE #3. logging constant
const logging = true;

// get the project id
var href = window.location.href;
var projid = href.match(/[0-9]+/);

// get date info
var mo = getMo();
var year = String(new Date().getFullYear());
var mo_year = mo + year;
var day = String(new Date().getDate());

// tests
var ok = true;
if (null == person_id) {
  logger ('You must add your basecamp person_id to the script.', true);
  ok = false;
}
else {
  logger ('Test OK: person_id - ' + person_id);
}

if (year < 2000) {
  logger ('Year: ' + year + '. If this is not the correct year, this script will not work for you without changes. This relies on browser implementation of getFullYear()', true);
  ok = false;
}
else {
  logger ("Date Test OK \nConfirm the following are correct: \n" +
    'year: ' + year + "\n" +
    'mo: ' + mo + "\n" +
    'day: ' + day);
}

// do our stuff
if (ok) {

  // only if we're in a project
  if (null != projid) {
    // add link to new project in StatusLeft
    var sl = document.getElementById('StatusLeft');
    var sl_orig = sl.innerHTML;
    var sl_new = sl_orig.match(/[\w+ \b]+/) + '&nbsp;'; // gets the project name
    sl_new += getNewStatusLeftHTML();
    sl.innerHTML = sl_new;

    // Add quicklinks to header
    var head = document.getElementById('Header');
    var admin = head.getElementsByTagName('h3').item(0);
    var quicklinks = document.createElement('div');
    quicklinks.innerHTML = getQuicklinksHTML();
    assignQLStyle(quicklinks);
    admin.appendChild(quicklinks);

    // append quicklink styles to the inline stylesheet
    appendQLStylesheet(document.styleSheets[2]);

    // add the time form    
    var sidebar = getElementByClass ('div', 'Sidebar');
    if (sidebar) {
      var timetrack = getTimetrackHTML();
      var timeform = document.createElement('div');
      timeform.innerHTML = timetrack;
      var timehead = document.createElement('h1');
      timehead.innerHTML = 'Log Your Time';
      sidebar.insertBefore(timeform, sidebar.firstChild);
      sidebar.insertBefore(timehead, sidebar.firstChild);
    }
  }
}


// supporting functions
function logger (msg, force){
  if (logging || force){
    GM_log("\n" + msg);
  }

}

function getMo () {
  var mo = String(new Date().getMonth() + 1);
  if (10 > mo) mo = '0' + mo;
  return mo;
}

function getElementByClass (tagName, className) {
  elements = document.getElementsByTagName(tagName);
  for (var i=0; i < elements.length; i++){
    if (elements[i].className == className) {
      return elements[i];
    }
  }
  return null;
}

function assignQLStyle (ql_div) {
  ql_div.id = 'quicklinks';
}

function appendQLStylesheet (mycss) {
  mycss.insertRule("#quicklinks { font-size: 11px; color: #F00; float: right; width: 400px; padding-top: 11px; }", mycss.cssRules.length);
  mycss.insertRule("#quicklinks a.quicklinks:link, #quicklinks a.quicklinks:visited  { color: #F00; }", mycss.cssRules.length);
  mycss.insertRule("#quicklinks a.quicklinks:hover { color: #FFF; background-color: #F00; }", mycss.cssRules.length);
}

function getNewStatusLeftHTML () {
  var sl_new = '<span class="light">(</span>';
  sl_new += '<a href="/clients" title="See all your clients and projects">Dashboard</a>';
  sl_new += ' | ';
  sl_new += '<a href="/project/new" title="Add a new project">New Project</a>';
  sl_new += ' | ';
  sl_new += ' <a href="#" onclick="toggleP2P(); return false;">Switch projects</a>';
  sl_new += ' <span class="light">)</span>';
  return sl_new;
}

function getQuicklinksHTML () {
  var links = '<a class="quicklinks" href="/projects/' + projid + '/msg/all/new">Add message</a> | ';
  links += '<a class="quicklinks" href="/projects/' + projid + '/todos/new_list">Add to-do list</a> | ';
  links += '<a class="quicklinks" href="/projects/' + projid + '/milestones/new">Add milestone</a> | ';
  links += '<a class="quicklinks" href="/projects/' + projid + '/files/new">Add file</a>';
  return links;
}

function getTimetrackHTML () {
  var timetrack = '<br />';
  timetrack += '<script src="/javascripts/time.js" type="text/javascript"></script>';
  timetrack += '    <script type="text/javascript">';
  timetrack += '  timeHandler.urls = {';
  timetrack += '    edit_entry:   \'/projects/' + projid + '/time/edit_entry\',';
  timetrack += '    save_entry:   \'/projects/' + projid + '/time/save_entry\',';
  timetrack += '    delete_entry: \'/projects/' + projid + '/time/delete_entry\'';
  timetrack += '  }';
  timetrack += '</script>';
  timetrack += '<form onsubmit="timeHandler.onSave(); return false" id="entry_adder">';
  timetrack += '<table id="entries" class="TimeTrack">';
  timetrack += '  <tbody>';
  timetrack += '  <tr id="header_row">';
  timetrack += '    <th>&nbsp;</th>';
  timetrack += '    <th>&nbsp;</th>';
  timetrack += '    <th class="hours">Hours</th>';
  timetrack += '    <th class="desc">Description</th>';
  timetrack += '  </tr>';

  /* hidden date & person */
  timetrack += '  <tr class="AddTimeTrack" id="edit_entry_0">';
  timetrack += '  <td class="date">';
  timetrack += '    <input type="hidden" name="entry[date(2i)]" value="' + mo_year + '">';
  timetrack += '    <input type="hidden" name="entry[date(3i)]" value="' + day + '">';
  timetrack += '  </td>';
  timetrack += '  <td class="person">';
  timetrack += '      <input type="hidden" id="entry_person_id_0" name="entry[person_id]" value="' + person_id + '">';
  timetrack += '  </td>';

  timetrack += '  <td class="hours">';
  timetrack += '    <input id="entry_hours_0" name="entry[hours]" size="4" value="" type="text">';
  timetrack += '  </td>';
  timetrack += '  <td class="desc">';
  timetrack += '        <input id="entry_description_0" name="entry[description]" size="18" value="" type="text">';
  timetrack += '  </td>';
  timetrack += '</tr>';

  timetrack += '  <tr class="AddTimeTrack">';
  timetrack += '  <td></td>';
  timetrack += '  <td></td>';
  timetrack += '  <td></td>';
  timetrack += '  <td class="action">';
  timetrack += '    <img alt="Indicator" id="edit_spinner_0" src="/images/indicator.gif" style="display: none;" height="16" width="16">';
  timetrack += '      <input id="entry_submit_0" name="commit" value="Add to log" type="submit">';
  timetrack += '  </td>';
  timetrack += '</tr>';
  timetrack += '</tbody></table>';
  timetrack += '</form>';
  return timetrack;
}