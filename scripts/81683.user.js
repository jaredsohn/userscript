// TM Squad Overview 2
// version 0.1
// 2010-Jul-17
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Author: Hampsters United

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "TM Training Overview Coloring", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TM Squad Overview 2
// @description   Replaces the green spot on the squad overview with a dollar sign.
// @include       http://trophymanager.com/klubhus_squad.php*
// ==/UserScript==



 document.PaintCells = function(titleRow, row) 
    {
    var cells2 = titleRow.getElementsByTagName("td");

    if(cells2.length>7)

      {
 	str = cells2[7].innerHTML;
	if (str.search('green.gif')>-1)
		{cells2[7].textContent = cells2[7].textContent + '$'}
      }	

    };


 (function() {

  rows = document.getElementsByTagName("TR");

  for (i = 1; i < rows.length; i++) 
    {
      cells2 = rows[i].getElementsByTagName("td");
      document.PaintCells (rows[i], i);
    }


 })();