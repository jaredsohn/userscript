// ==UserScript==
// @name           Yahoo! Filter
// @namespace      bmeakings.dyndns.org
// @description    Filter unwanted websites from Yahoo! search results
// @include        http://*.search.yahoo.com/*
// @include        http://search.yahoo.com/*
// ==/UserScript==

/*
  This script is based on a Google filter script originally written by arnab on
  userscripts.org.
*/

// ---------------------------------------------------------------------------------

/*
  These two variables determine how the script behaves when it blocks a website. By
  default, when a website is blocked a notification bar appears telling you how many
  sites were blocked and gives you an option to un-hide those sites. If you're sure
  that you never want to see those blocked sites, set showUnblockBar to false.

  When showUnblockBar is set to false, the script will show a simple message saying
  "[sitename] has been blocked" where the blocked websites would normally appear in
  the results page. This is controlled by the showBlockedSites variable. To disable
  this behaviour and make this filter script totally transparent, set both variables
  to false.
*/

var showUnblockBar = true;   // Show bar so user can unhide blocked websites
var showBlockedSites = true; // Has no effect when showUnblockBar is true

// Blacklist

var blacklistOfDoom =
[
"www.downloadprofessional.com",
"fullcrackserialkeygen.com",
"www.crackserialkeygen.com",
"www.crackserialcodes.com",
"www.experts-exchange.com",
"www.fullfilereleases.com",
"www.fullfileaccess.com",
"www.downloadwarez.org",
"www.fullreleases.biz",
"www.fullreleases.com",
"www.fullreleasez.com",
"www.filefortune.com",
"www.warezaccess.com",
"www.dailykeys.com",
"onebigtorrent.org",
"www.twilight.ws",
"www.fulldls.com",
"www.ddlspot.com",
"www.ddlsite.com"
];

var resultsDiv = document.getElementById("web");
var allDivs = resultsDiv.getElementsByTagName("div");
var removedSites = [];

for (var i = 0; i < allDivs.length; i++)
{
  var s = 0;
  if (allDivs[i].className.indexOf("res") != -1)
  {
    var thisResult = allDivs[i];
    var href = thisResult.getElementsByTagName("a")[0].href;
    var removeThis = false;
    for (var j = 0; !removeThis && j < blacklistOfDoom.length; j++)
    {
      if (href.indexOf("http://" + blacklistOfDoom[j]) != -1)
      {
        removeThis = true;
        s = j;
      }
    }
    if (removeThis)
    {
      removedSites[removedSites.length] = thisResult;
      if (showBlockedSites && !showUnblockBar)
      {
        thisResult.style.background = "#fdd";
        thisResult.style.border = "1px solid #000";
        thisResult.style.width = "600px";
        thisResult.innerHTML = blacklistOfDoom[s] + " has been blocked.";
      }
      else
      {
        thisResult.style.background = "#ddd";
        thisResult.style.display = "none";
      }
    }
  }
}

if (showUnblockBar && removedSites.length > 0)
{
  window.removedSites = removedSites;
  var newElement = document.createElement("div");
  newElement.style.margin = "0px";
  newElement.style.padding = "1px 0px 1px 3px";
  newElement.style.fontSize = "small";
  newElement.style.cursor = "pointer";
  newElement.style.background = "#fdd";
  newElement.style.border = "solid 1px #000";
  newElement.innerHTML = removedSites.length + " item(s) filtered out by Yahoo! Filter user script - Click here to show";
  resultsDiv.insertBefore(newElement,resultsDiv.firstChild);
  toggleDisplay = function()
  {
    removedSites = window.removedSites;
    display = removedSites[0].style.display;
    display = (display == "" ? "none" : "");
    for (var i = 0; i < removedSites.length; i++)
    {
      removedSites[i].style.display = display;
    }
  }
  newElement.addEventListener("click",toggleDisplay,true);
}
