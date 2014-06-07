// ==UserScript==
// @name         Pivotal Tracker ZoomFixer
// @description  Make zooming in suck less in Pivotal Tracker.
// @version      0.2
// @match        https://www.pivotaltracker.com/projects/*
// ==/UserScript==

function disableHeader()
{
  var elem = document.getElementById("header");
  elem.style.overflow = "hidden";
  elem.style.height   = "0px";
}
    
function disableControlPanel()
{
  var elem = document.getElementById("controlPanel");
  elem.style.overflow = "hidden";
  elem.style.height   = "0px";
}

function enableHeader()
{
  var elem = document.getElementById("header");
  elem.style.height   = "";
  elem.style.overflow = "";
}

function enableControlPanel()
{
  var elem = document.getElementById("controlPanel");
  elem.style.height   = "";
  elem.style.overflow = "";
}

function resetContentWidth()
{
  var elem = document.getElementById("content");
  var padding = 5;
  elem.style.width  = String(window.innerWidth  - padding) + "px";
  elem.style.height = "100%";
}

function resizeFlyovers()
{
  var new_width = Math.floor(0.65*window.innerWidth);
  if(new_width > 475) { new_width = 475; }

  var elems = document.getElementsByClassName("overlayContentWrapper storyFlyover flyover");
  for(var i=0; i<elems.length; i++)
  {
    elems[i].style.width = new_width + "px";
     
    var sub_elem = elems[i].getElementsByClassName("metaInfo")[0].parentNode;
    sub_elem.style.width = new_width + "px";
  }
}

function pollWidth()
{
  var min_height_px = 450;
  if(window.innerHeight < min_height_px)
  {
    disableHeader();
    disableControlPanel();
  }
  else
  {
    enableHeader();
    enableControlPanel();
  }

  resetContentWidth();
  resizeFlyovers();
}

var pollingIntervalMsec = 500;
window.setInterval(pollWidth, pollingIntervalMsec);