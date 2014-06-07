// TM Squad Colored Skills
// version 1.0
// Created: 23-Sep-2009
// Updated: 24-Dec-2009
// Inspired by TrExMa, and copypasted some of its contents
// Author: Hampsters United
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "TM Squad Colored Skills", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TM Squad Colored Skills
// @description   Groups the skills on the squad page by coloring them differently.
// @include       http://trophymanager.com/squad.php*
// ==/UserScript==



 document.PaintCells = function(titleRow, row) 
    {

    var cells2 = titleRow.getElementsByTagName("td");

    var trexma = 1;

    titleRow.setAttribute("onmouseover", "this.style.borderBottom = '1px solid silver'; this.style.borderTop = '1px solid silver';");

    titleRow.style.borderBottom = '1px solid green';
    titleRow.style.borderTop = '1px solid green';

    titleRow.setAttribute("onmouseout", "this.style.borderBottom = '1px solid green';");

    cells2[0].setAttribute('style','width:35px');

    if (cells2.length>20) 
       {
          trexma = cells2[21].innerHTML; 
          if (trexma>60) 
 	     { cells2[21].style.background ='#2e2e6e';}
          if (trexma>70) 
 	     { cells2[21].style.background ='#ae7e0e';}
          if (trexma>75) 
 	     { cells2[21].style.background ='#debe1e';}
          if (trexma>80) 
 	     { cells2[21].style.background ='#fe7e1e';}

          trexma = cells2[20].innerHTML; 

          if (trexma>60) 
 	     { cells2[20].style.background ='#2e2e6e';}
          if (trexma>70) 
 	     { cells2[20].style.background ='#ae7e0e';}
          if (trexma>75) 
 	     { cells2[20].style.background ='#debe1e';}
          if (trexma>80) 
 	     { cells2[20].style.background ='#fe7e1e';}
       };


    if ((row%2)==1) 
       {
	 cells2[0].style.background = '#70b210';
	 cells2[1].style.background = '#70b210';
	 cells2[2].style.background = '#70b210';
	 cells2[3].style.background = '#70b210';
	 cells2[4].style.background = '#70b210';

	 cells2[5].style.background = '#6e7e4e';
	 cells2[6].style.background = '#6e7e4e';
	 cells2[7].style.background = '#6e7e4e';

	 cells2[8].style.background ='#2e6e8e';
	 cells2[9].style.background ='#2e6e8e';

	 cells2[10].style.background ='#6e7e4e';
	 cells2[11].style.background ='#6e7e4e';

	 cells2[12].style.background ='#ae8e2e';
	 cells2[13].style.background ='#ae8e2e';
	 cells2[14].style.background ='#ae8e2e';

	 cells2[15].style.background ='#ae6e2e';
	 cells2[16].style.background ='#ae6e2e';
	 cells2[17].style.background ='#ae6e2e';

	 cells2[18].style.background = '#70b210';
	 cells2[19].style.background = '#70b210';

	}
    else
       { 

	 cells2[0].style.background = '#489807';
	 cells2[1].style.background = '#489807';
	 cells2[2].style.background = '#489807';
	 cells2[3].style.background = '#489807';
	 cells2[4].style.background = '#489807';

	 cells2[5].style.background = '#3e4e3e';
	 cells2[6].style.background = '#3e4e3e';
	 cells2[7].style.background = '#3e4e3e';

	 cells2[8].style.background ='#1e4e7e';
	 cells2[9].style.background ='#1e4e7e';

	 cells2[10].style.background ='#3e4e3e';
	 cells2[11].style.background ='#3e4e3e';

	 cells2[12].style.background ='#7e6e3e';
	 cells2[13].style.background ='#7e6e3e';
	 cells2[14].style.background ='#7e6e3e';

	 cells2[15].style.background ='#7e4e3e';
	 cells2[16].style.background ='#7e4e3e';
	 cells2[17].style.background ='#7e4e3e';

	 cells2[18].style.background = '#489807';
	 cells2[19].style.background = '#489807';

	};

    };

 (function() {

  playertables = document.getElementsByTagName("TABLE");
  rows = playertables[0].getElementsByTagName("TR");

  for (var i = 1; i < rows.length; i++) 
    {
      document.PaintCells (rows[i], i);
    }

 })();