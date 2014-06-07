// ==UserScript==
// @name           CodeProject in FullScreen
// @namespace      http://userscripts.org/users/74338
// @include        http://www.codeproject.com/*
// @include        https://www.codeproject.com/*
// ==/UserScript==

// hide the sidebar
var ctl00_LeftNavCell = document.getElementById('ctl00_LeftNavCell');

if (ctl00_LeftNavCell)
{
  ctl00_LeftNavCell.style.display = 'none';
}


// collapse the headers
var ctl00_AT = document.getElementById('ctl00_AT')

if (ctl00_AT && ctl00_AT.rows.length > 2)
{
  ctl00_AT.rows[0].style.visibility = 'collapse';
  ctl00_AT.rows[1].style.visibility = 'collapse';
}