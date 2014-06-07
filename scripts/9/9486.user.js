// ==UserScript==
// @name           OUT Desktop Left
// @namespace      http://www.outeverywhere.com
// @description    Adds Desktop OUT to the top of the left-hand side window
// @include        http://www.outeverywhere.com/*
// @include        http://tools.outeverywhere.com/*
// @include        http://www.journalhound.com/*
// @include        http://tools.journalhound.com/*
// ==/UserScript==

var objBody = document.getElementById("outeverywhere")
if (objBody)
{
  var objMenuDiv = document.getElementById("menu");
  if (objMenuDiv)
  {
    var strUserID = String(document.links[1].href).split("=")[1];
    var objIframe = document.createElement("iframe");
    objIframe.setAttribute("id", "desktopIframe");
    objIframe.setAttribute("name", "desktopIframe");
    objIframe.src = "http://www.outeverywhere.com/desktop.cgi?u=" + strUserID;
    objIframe.width = "200px";
    objIframe.height = "400px";
    objIframe.style.border = "none";
    objIframe.style["margin-bottom"] = "50px";
    if (objMenuDiv.hasChildNodes())
      objMenuDiv.insertBefore(objIframe, objMenuDiv.firstChild);
    else
      objMenuDiv.appendChild(objIframe);
  }
}

var strDocURL = String(document.location.href).toUpperCase();
if (strDocURL.indexOf("/DESKTOP.CGI") > -1)
{
  if (window.name == "desktopIframe")
  {
    var objDesktopForm = document.forms[0];
    objDesktopForm.target = "_top";
  }
}