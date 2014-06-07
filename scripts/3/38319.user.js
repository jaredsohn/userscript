// ==UserScript==
// @name          Google Code: Project Page
// @namespace     http://almaer.com/firefox/userscripts/
// @description   Add a link to my projects
// @include       http://code.google.com/p/*
// ==/UserScript==

// Capture the keystroke
window.addEventListener("load", function(e) {
 addMyProjects(); 
 addSubversionTrunk();
}, true);

/*
 * Add a "Trunk" tab that sends you directly to the Subversion trunk
 */
function addSubversionTrunk() {
  var table = document.getElementById("mt");
  var sourceTab = table.getElementsByTagName("th")[4];

  var project = window.location.href.match(/\/p\/(.*?)\//)[1];
//  var trunkUrl = 'http://' + project + '.googlecode.com/svn/trunk/';
  var trunkUrl = "http://code.google.com/p/" + project + "/source/browse/trunk";

  var svnTab = document.createElement("th");
  svnTab.setAttribute("onclick", "if (!cancelBubble) _go('" + trunkUrl + "');");
  svnTab.setAttribute("class", "int4");
  svnTab.innerHTML = '<div class="tc1"><div class="tc2"><div class="tc3"></div></div></div><div class="tT"><a href="' + trunkUrl + '" onclick="cancelBubble=true;">Trunk</a></div>';

  // Add the new svn tab to the menu
  sourceTab.parentNode.insertBefore(svnTab, sourceTab.nextSibling);

  // Add a td for spacing
  var td = document.createElement("td");
  td.innerHTML = ' &nbsp;&nbsp; ';
  sourceTab.parentNode.insertBefore(td, sourceTab.nextSibling);
}

/*
 * This function adds a "My Projects" link to the top right menu bar
 */
function addMyProjects() {
  var header = document.getElementById("gaia");
  var user   = header.getElementsByTagName("b")[0];

  var bar = document.createTextNode(" | ");
  var myprojects = document.createElement("a");
  myprojects.setAttribute("href", "http://code.google.com/u/dalmaer/");
  myprojects.setAttribute("title", "Go to your open source projects on Google Code");
  myprojects.innerHTML = 'My Projects';

  user.parentNode.insertBefore(myprojects, user.nextSibling);
  user.parentNode.insertBefore(bar, user.nextSibling);
}
