// ==UserScript==
// @name           Schedule
// @namespace      http://www.lucernestudios.com
// @description    View schedule button for CUNY Fall2010
// @include        https://esims.cuny.edu/*
// ==/UserScript==
//Written by Mohammed Oza of LucerneStudios
window.addEventListener(
    'load', 
    function() {
var NavBar = document.getElementById('HM_Menu1_4');
var NavItem = document.getElementById('HM_Item1_4_1');

var myanchor = document.createElement('a');
myanchor.setAttribute('href', 'javascript:newWindow("https://esims.cuny.edu/LoggedInServlet?CurrentCommand=ScheduleDisplay&Term=201009")');
//myanchor.setAttribute('target', '_blank');
myanchor.appendChild(document.createTextNode("Fall 2010 Schedule"));
var wrappingDiv = document.createElement('div');
wrappingDiv.setAttribute('id', 'HM_Item1_4_2');
wrappingDiv.setAttribute('style', 'padding: 3px; position: absolute; visibility: visible; cursor: pointer; background-color: rgb(255, 206, 45); color: rgb(0, 5, 214); font-family: Arial,sans-serif; font-style: normal; font-variant: normal; font-weight: bold; font-size: 12px; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; left: 10px; width: 80px; top: 60px;');
wrappingDiv.appendChild(myanchor);
document.body.insertBefore(wrappingDiv, NavItem);
//NavBar.insertBefore(wrappingDiv, NavItem);
}, 'true');