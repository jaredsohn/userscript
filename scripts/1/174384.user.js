// ==UserScript==
// @name           Waze Forum Filter
// @namespace      http://userscripts.org/users/419370
// @description    Tidies up the Waze Forum interface for users
// @match          http://*.waze.com/forum/*
// @match          https://*.waze.com/forum/*
// @author         timbones
// @version        1.3
// ==/UserScript==

// enable this variable to hide the Waze banner and navigation bar
var hideWazeBanner = true;

// enable this variable to hide Unlock or Update Requests that have been replied to
var hideURReplies = false;

// ======================================================================================

// alias for unsafeWindow in Chrome
if(typeof(unsafeWindow) == "undefined") {
  unsafeWindow = window;
}

function $(id)
{
  return document.getElementById(id);
}

function getElementsByClassName(classname, node)
{
  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for (var i=0,j=els.length; i<j; i++)
    if (re.test(els[i].className)) a.push(els[i]);
  return a;
}

function getVisible(index)
{
  index = parseInt(index, 10);
  if (localStorage.WazeForumFilter) {
    var visible = JSON.parse(localStorage.WazeForumFilter);
    if (visible != null) {
      console.log("getVisible("+index+") = " + visible[index]);
      return visible[index];
    }
  }
  console.log("getVisible("+index+") = false (not found)");
  return false;
}

function setVisible(index, value)
{
  index = parseInt(index, 10);
  var visible = null;
  if (localStorage.WazeForumFilter)
    visible = JSON.parse(localStorage.WazeForumFilter);

  if (visible == null)
    visible = [];

  visible[index] = value;
  console.log("setVisible("+index+", "+value+")");
  localStorage.WazeForumFilter = JSON.stringify(visible);
}

function toggleVisible()
{
  var currentforum = location.search.match(/.f=([0-9]*)/);
  var visible = !getVisible(currentforum[1]);
  setVisible(currentforum[1], visible);
  if (visible)
    $('viscontrol').innerHTML = "<i>This forum will now appear in search results</i>";
  else
    $('viscontrol').innerHTML = "<i>This forum will now be hidden from search results</i>";
    
  return false;
}

function showHiddenThreads()
{
  rows = getElementsByClassName('row', $('page-body'));
  for (var i=0,j=rows.length; i<j; i++)
    rows[i].style.display = 'block';
    
  $('viscontrol').innerHTML = "<i>All threads now shown</i>";
   
  return false;
}


// first-time initialisation
if (!localStorage.WazeForumFilter) {
  // show these forums from the search results (others are hidden)
  var defaults = new Array();
  defaults[18]  = 1;   // Official Announcements
  
  defaults[3]   = 1;   // Waze App
  defaults[5]   = 1;   // + Search
  defaults[6]   = 1;   // + Navigation
  defaults[657] = 1;   // + App Issues and Requests
  defaults[373]   = 1; // + App Beta Testing
  
  defaults[8]   = 1;   // Waze Map Editor
  defaults[655] = 1;   // + House Numbers (Addresses)
  defaults[656] = 1;   // + WME Issues and Requests
  defaults[199] = 1;   // + Update/Unlock requests
  defaults[211] = 1;   // + WME Beta Testing
  defaults[819] = 1;   // + Addons, Extensions, and Scripts
  
//defaults[19]  = 1;   // Country (Language) Forums
  
  defaults[12]  = 1;   // Website, Community, General
  defaults[14]  = 1;   // + Ranks and Points
  defaults[16]  = 1;   // + Website & Community Issues and Requests
  defaults[276] = 1;   // + Wiki Updates and Discussion
//defaults[262] = 1;   // + Off-topic
  defaults[212] = 1;   // + Waze Global Champs
  defaults[294] = 1;   //   + Community/Support direct-access
  defaults[290] = 1;   // + Moderators forum
  defaults[17]  = 1;   // + Bugs
  
  defaults[417] = 1;   // Localization
  
  defaults[815] = 1;   // World's Mega Traffic Events
  
  defaults[562] = 1;   // Experts
  defaults[551] = 1;   // + Client Experts- General
  defaults[552] = 1;   // + iOS expert
  defaults[554] = 1;   // + Android expert
  defaults[555] = 1;   // + Editing experts
  defaults[560] = 1;   // + Social Media experts
  defaults[559] = 1;   // + Localization experts
  defaults[558] = 1;   // + Points experts
  defaults[557] = 1;   // + Navigation / Routing experts
  defaults[563] = 1;   // + Coordinators
  defaults[564] = 1;   // + Wazeperts
  defaults[623] = 1;   //   + Scripting Experts
  defaults[674] = 1;   // + Server tests

  localStorage.WazeForumFilter = JSON.stringify(defaults);
}

// style hacks
if (hideWazeBanner) {
  document.body.style.backgroundImage = 'none';
  var navigation = getElementsByClassName('navigation', $('content_wrapper'));
  if (navigation.length > 0)
    navigation[0].style.display = 'none';
}

// add missing login button
var navbar = getElementsByClassName('navbar', $('wrap'));
if (navbar.length > 0) {
  var linklist = getElementsByClassName('linklist', navbar[0]);

  if (linklist.length > 1) {
    var iconucp = getElementsByClassName('icon-ucp', linklist[1]);

    if (iconucp.length == 0) {
      login = document.createElement('li');
      login.className = 'icon-ucp leftside';
      login.innerHTML = '<a href="/forum/ucp.php">Login</a>';
      linklist[1].appendChild(login);
    }
  }
}

// fix the title to be useful
if (document.title.match(/ View topic - /))
  document.title = document.title.replace(/.* View topic - /, '') + ' | Waze.com';

// hide threads for hidden forums
if (location.pathname == '/forum/search.php' &&
    location.search.indexOf('search_id') > 0 &&
    location.search.indexOf('egosearch') == -1) {
  rows = getElementsByClassName('row', $('page-body'));
  var num = 0;
  for (var i=0,j=rows.length; i<j; i++) {
    var found = rows[i].innerHTML.match(/viewforum.php.f=([0-9]*)"/);
    if (found == null)
      continue;

    // don't hide any threads I've posted to
    mythread = rows[i].innerHTML.match(/topic_unread_mine.gif|topic_read_mine.gif/);
    if (mythread != null)
      continue;

    // hide Update requests and Unlock requests with more than 1 replies
    if (hideURReplies) {
      noreplies = rows[i].innerHTML.match(/class="posts">0/);
      if (noreplies == null && (found[1] == 199)) {
        rows[i].style.display = 'none';
      }
    }

    // hide any threads from forums not in whitelist
    if (!getVisible(found[1])) {
      rows[i].style.display = 'none';
      num++;
    }
  }
  
  var vislink = document.createElement('a');    
  vislink.innerHTML = "show all";
  vislink.href = "#";
  vislink.onclick = showHiddenThreads;
  
  var viscontrol = document.createElement('p');
  viscontrol.style.cssFloat = "right";
  viscontrol.id = "viscontrol";
  viscontrol.appendChild(document.createTextNode('[ Hidden ' + num + ' threads - '));
  viscontrol.appendChild(vislink);
  viscontrol.appendChild(document.createTextNode(" ]"));
 
  var pagebody = $('page-body');
  pagebody.insertBefore(viscontrol, pagebody.firstChild);
}

// hide [Share] button
if (location.pathname == '/forum/viewtopic.php') {
  posts = getElementsByClassName('postbody', $('page-body'));
  for (var i=0,j=posts.length; i<j; i++) {
   divs = posts[i].getElementsByTagName('div');
   if (divs[0].innerHTML.match(/www.addthis.com/))
      divs[0].style.display = 'none';
  }
}

// add controls to hide/show forums
if (location.pathname == "/forum/viewforum.php") {
  var currentforum = location.search.match(/.f=([0-9]*)/);
  var pagebody = $('page-body');

  if (currentforum != null && pagebody != null) {
    var visible = getVisible(currentforum[1]);
        
    var vislink = document.createElement('a');    
    if (visible)
      vislink.innerHTML = "Hide this forum from search results";
    else
      vislink.innerHTML = "Show this forum in search results";
    vislink.href = "#";
    vislink.onclick = toggleVisible;
      
    var viscontrol = document.createElement('p');
    viscontrol.style.cssFloat = "right";
    viscontrol.id = "viscontrol";
    viscontrol.appendChild(document.createTextNode("[ "));
    viscontrol.appendChild(vislink);
    viscontrol.appendChild(document.createTextNode(" ]"));
    
    pagebody.insertBefore(viscontrol, pagebody.firstChild);
  }
}
// end