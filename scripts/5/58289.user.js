// TM Training Overview Coloring
// version 0.3
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
// @name          TM Training Overview Coloring
// @description   Uses a better contrast row coloring of the training rows, highlights significant drops in TI (>20%) as well as (assumed) blooming (>6 TI if player is older than 21, >10 TI if older than 18 and >20 if younger than 19)
// @include       http://trophymanager.com/training.php*
// ==/UserScript==



 document.PaintCells = function(titleRow, row) 
    {
    var cells2 = titleRow.getElementsByTagName("td");

    if ((row%2)==1) 
       {
	 cells2[5].style.background ='#101020';
	 cells2[6].style.background ='#101020';
	 cells2[7].style.background ='#101020';
	 cells2[8].style.background ='#101020';
	 cells2[9].style.background ='#101020';
	 cells2[10].style.background ='#101020';
	 cells2[11].style.background ='#101020';
	 cells2[12].style.background ='#101020';
	 cells2[13].style.background ='#101020';
	 cells2[14].style.background ='#101020';
	 cells2[15].style.background ='#101020';
	 cells2[16].style.background ='#101020';
	 cells2[17].style.background ='#101020';
	 cells2[18].style.background ='#101020';
	}
else
       { 
	 cells2[5].style.background ='#202040';
	 cells2[6].style.background ='#202040';
	 cells2[7].style.background ='#202040';
	 cells2[8].style.background ='#202040';
	 cells2[9].style.background ='#202040';
	 cells2[10].style.background ='#202040';
	 cells2[11].style.background ='#202040';
	 cells2[12].style.background ='#202040';
	 cells2[13].style.background ='#202040';
	 cells2[14].style.background ='#202040';
	 cells2[15].style.background ='#202040';
	 cells2[16].style.background ='#202040';
	 cells2[17].style.background ='#202040';
	 cells2[18].style.background ='#202040';
	}

      ti1 = cells2[19].innerHTML;
      ti2 = cells2[20].innerHTML;
      age = cells2[3].textContent;

      // Blooming
      if ( (ti2>10) && (age>18) ) {cells2[20].style.background ='#40e040';}
      if ( (ti2>20) && (age<19) ) {cells2[20].style.background ='#40e040';}
      if ( (ti2>6) && (age>21) ) {cells2[20].style.background ='#40e040';}

      // TI drop
      if ( (ti2<ti1*0.8) && (ti1>8) ) {cells2[20].style.background ='#a02040';}

    };


 (function() {

  rows = document.getElementsByTagName("TR");

  for (i = 1; i < rows.length; i++) 
    {
      cells2 = rows[i].getElementsByTagName("td");
      if (cells2.length>18)
         { document.PaintCells (rows[i], i);  }
    }


 })();