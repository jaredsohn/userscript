// Digg.com Comment Helper user script
// version 0.2 BETA!
// 2006-08-14
// Copyright (c) 2006, Mike Grabski
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Digg.com Comment Helper", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Digg.com Comment Helper
// @namespace     http://www.awhisperedlie.com/greasemonkey/diggcommenthelper
// @description	  Highlights and links user's comments and comments about the user when viewing a digg.com article summary
// @include	  http://digg.com/*
// ==/UserScript==

String.prototype.lTrim = function() { return this.replace(/^\s*/, ""); }
String.prototype.rTrim = function() { return this.replace(/\s*$/, ""); }
String.prototype.trim = function() { return this.lTrim().rTrim(); }
String.prototype.isMatch = function(expr) { return this.match(expr) != null; }

// Gets a cookie by name
function getCookie(name) {
	var cookie = unescape(document.cookie)+";";
	if (cookie.indexOf(name+"=") < 0)
		return "";
	cookie = cookie.split(name+"=");
	cookie = cookie[1].split(";")
	return cookie[0];
}

// Gets the user's login name, looks through comments and highlights any 
// made by the user, and creates a list of links in the left sidebar.
function getCommentsAndReferences(e)
{
  var contents, items, div, c, userAnchor, id, sidebar, 
      sidebarList, sidebarItem, ucl, rl,
      ucli, uclia, rli, rlia, ctotal, matches, diggs, 
      loginName, color, comment, rtotal;

  loginName = getCookie("loginname");

  if (loginName.length == 0)
    return;

  ctotal = 0;
  rtotal = 0;

  ucl = document.createElement("UL");
  rl = document.createElement("UL");

  ucl.style.marginBottom = ".2em";
  rl.style.marginBottom = ".2em";

  items = document.body.getElementsByTagName("LI");
  c = items.length;

  for (var x = 0; x < c; x++)
  {
    id = new String(items[x].id);

    if ((matches = id.match(/^c([0-9]+)$/)) != null)
    {

      div = items[x].firstChild;
      userAnchor = div.getElementsByTagName("STRONG")[0].firstChild;
      diggs = document.getElementById("strong-" + matches[1]);
      comments = document.getElementById("cbody" + matches[1]);

      matches = diggs.innerHTML.match(/(\-|\+)\s([0-9]+)/);
     
      if (userAnchor.text.trim() == loginName)       
      {
        if (matches[1] == "+")
        {
           if (matches[2] == "0")
             color = "orange";
           else
             color = "green";
        }
        else
          color = "red";

        userAnchor.style.color = color;
        items[x].style.border="2px solid " + color;
	
        ucli = document.createElement("LI");
        uclia = document.createElement("A");

	ucli.style.backgroundImage = "none";

        uclia.innerHTML = id + " (" + diggs.innerHTML + ")";
        uclia.href = "#" + id;
        uclia.style.fontSize = ".8em";
        uclia.style.color = color;
        uclia.style.marginLeft = ".4em";

        ucli.appendChild(uclia);
        ucl.appendChild(ucli);

        ctotal++;
      }
      else if (comments.innerHTML.isMatch(loginName))
      {
        userAnchor.style.color = "blue";
        items[x].style.border="2px solid blue";

        rli = document.createElement("LI");
        rlia = document.createElement("A");

        rli.style.backgroundImage = "none";

        rlia.innerHTML = userAnchor.innerHTML + " (" + diggs.innerHTML + ")";
        rlia.href = "#" + id;
        rlia.style.fontSize = ".8em";
        rlia.style.color = "blue";
        rlia.style.marginLeft = ".4em";

        rli.appendChild(rlia);
        rl.appendChild(rli);

        rtotal++;
      }
    }
  }

  sidebarItem = document.createElement("LI");
  sidebarItem.className = "menu-special";

  if (ctotal > 0)
  {
    sidebarItem.appendChild(document.createTextNode(ctotal + " comment" + (ctotal == 1 ? "" : "s") + " from you:"));
    sidebarItem.appendChild(ucl);
  }
  else
  { 
    sidebarItem.appendChild(document.createTextNode("No comments from you"));
    sidebarItem.appendChild(document.createElement("BR"));
  }

  if (rtotal > 0)
  {
    sidebarItem.appendChild(document.createTextNode(rtotal + " comment" + (rtotal == 1 ? "": "s") + " about you:"));
    sidebarItem.appendChild(rl);
  }
  else
    sidebarItem.appendChild(document.createTextNode("No comments about you"));

  sidebar = document.getElementById("sidebar");
  sidebarList = sidebar.getElementsByTagName("UL")[0];
  sidebarList.appendChild(sidebarItem);
  sidebarList.appendChild(sidebarItem);
}

window.addEventListener("load",getCommentsAndReferences, false);