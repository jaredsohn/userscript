// ==UserScript==
// @name           Navigation Pre-Trip-Planner
// @namespace      MB
// @description    Create stations list for your navigation system using Google Maps Route Planning Functions
// @include        http://maps.google.*/                          
// @include        http://maps.google.*/*
// @include        http://www.markus-bader.de/navigation/*
// ==/UserScript==


var navbar, newElement;
navbar = document.getElementById('link');
if (navbar) 
{    
    newElement = document.createElement("div");
    newElement.innerHTML='<script type="text/javascript"> function ExportStationlist() '+
    '{ '+
    ' var a = document.getElementById("link"); '+
    ' var linkref=a.href; '+
    ' var paramstr = linkref.indexOf("?"); '+
    ' var Extrakt = linkref.slice(paramstr, linkref.length); '+    
    ' window.location.href = "http://www.markus-bader.de/navigation/stationlistexport.php4"+Extrakt; '+
    '} '+
    '</script>';
    navbar.parentNode.insertBefore(newElement, navbar.nextSibling);

    newElement = document.createElement("a");
    newElement.innerHTML="<span><font color=red>Export station list to Navigation System</font></span>";
    newElement.href ="javascript:ExportStationlist();";    
    newElement.id="stationlist";    
    navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
}

var preparebrowserdescription = document.getElementById("preparebrowserdescription");
if (preparebrowserdescription)
{
  preparebrowserdescription.innerHTML="";
}
