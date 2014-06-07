// ==UserScript==
// @name           GameFAQs Page Marker
// @author         Adam Lesinski
// @namespace      adam
// @description    Saves your spot in a GameFAQs FAQ
// @include        http://www.gamefaqs.com/*/*/file/*
// ==/UserScript==

var initYPos = 50;
var initXPos = 0;
var initWidth = 200;
var initHeight = 50;
var expiryTime = 7;

var resetWrapper = document.createElement("div");
resetWrapper.style.width = initWidth + "px";
resetWrapper.style.height = initHeight + "px";
resetWrapper.style.position = "fixed";
resetWrapper.style.right = initXPos + "px";
resetWrapper.style.top = initYPos + "px";
resetWrapper.style.borderStyle = "dashed";
resetWrapper.style.borderWidth = "2px";
resetWrapper.style.borderColor = "black";

var resetButton = document.createElement("div");
resetButton.innerHTML = "RESET PAGE MARKER";
resetButton.style.textAlign = "center";
resetButton.style.fontFamily = "courier new";
resetButton.style.color = "black";
resetButton.style.paddingTop = "16px";
resetButton.style.paddingBottom = "16px";
resetButton.style.cursor = "pointer";

function updatePageMarker()
{
  var yOffset = window.pageYOffset;
  GM_setValue(window.location.href, yOffset);
}

function resetPageMarker()
{
  GM_setValue(window.location.href, 0);
  window.scrollTo(0, 0);
}

function init()
{
  var yOffset = GM_getValue(window.location.href);
  if(!yOffset)
  {
    updatePageMarker();
  }
  else
  {
    window.scrollTo(0, yOffset);
  }
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + expiryTime);
  var expireDateString = expireDate.toDateString();
  GM_setValue("date: " + window.location.href, expireDateString);
  
  var currentDate = new Date();
  var currentMilliseconds = Date.parse(currentDate.toDateString());
  var previousValues = GM_listValues();
  
  for(var i = 0; i < previousValues.length; i++)
  {
    if(previousValues[i].substring(0, 6) == "date: ")
    {
      if(currentMilliseconds > Date.parse(GM_getValue(previousValues[i])))
      {
        GM_deleteValue(previousValues[i]);
        GM_deleteValue(previousValues[i].substring(6));
      }
    }
  }
}

resetButton.addEventListener("click", resetPageMarker, false);
window.addEventListener("scroll", updatePageMarker, false);
document.body.appendChild(resetWrapper);
resetWrapper.appendChild(resetButton);
init();
