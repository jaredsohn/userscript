// ==UserScript==
// @name           DIV Controller
// @namespace      blueiris4
// @description    Some advertisements use div tag. So you can add a close button and then hide or re-show them.
// @include        http*://*
// ==/UserScript==

var allDIVs, thisDIV;
var hasCloser = false;
allDIVs = document.getElementsByTagName("div");
function div_control(flag)
{
  for (var i = 0; i < allDIVs.length; i++)
  {
    thisDIV = allDIVs[i];
    thisDIV.style.visibility = (flag==1) ? "hidden" : "visible";
  }
}

function show_closer()
{
  if(!hasCloser)
    for (var i = 0; i < allDIVs.length; i++)
    {
      thisDIV = allDIVs[i];
      thisDIV.innerHTML = "<span name='blueiris4_divcontroller_span' style='font:bold 14px;position:absolute;background-color:#CCCCCC;cursor:pointer;' onclick='this.parentNode.style.visibility=\"hidden\";this.style.visibility=\"hidden\"'>×</span>" + thisDIV.innerHTML;
      hasCloser = true;
    }
  else
  {
    var allClosers = document.getElementsByName("blueiris4_divcontroller_span");
    for (var i = 0; i < allClosers.length; i++)
    {
      thisCloser = allClosers[i];
      if(thisCloser.parentNode.style.visibility != "hidden") thisCloser.style.visibility = "visible";
    }
  }
}
function hide_closer()
{
  var allClosers = document.getElementsByName("blueiris4_divcontroller_span");
  for (var i = 0; i < allClosers.length; i++)
  {
    thisCloser = allClosers[i];
    thisCloser.style.visibility = "hidden";
  }
}

GM_registerMenuCommand("show closeButton to all DIVs", show_closer);
GM_registerMenuCommand("hide closeButton to all DIVs", hide_closer);
GM_registerMenuCommand("hide all DIVs", function() { div_control(1); });
GM_registerMenuCommand("show all DIVs", function() { div_control(0);show_closer(); });