// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Old GS", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Old GS
// @namespace     http://monkey/projects/greasemonkey/
// @description   Script to hide Gupshup side menu and make the old menu appear
// @include       http://*paklinks.com/gs/*
// ==/UserScript==

// 'makeWider' sets the parent table width in the page to 100%.
function makeWider()
{
    var aElms=document.getElementsByTagName('TABLE');
    aElms.item(0).setAttribute('width','100%');
}

(function() {

  // GM_log("\Check if the page is paklinks...", 0);
  currentURL = location.href;
  currentDoc = document;

  if (currentURL.match(/^http:\/\/(www\.)?paklinks\.com\/gs\//))
  {   
  // GM_log("\Old Menu Creation", 0);

		old_menu = currentDoc.createElement('table');
		old_menu.id = 'old_menu';
		old_menu.align="center";
		old_menu.innerHTML = '<tr>'+
'<td width="100%" align="center"><font face="Verdana" size="1"><p style="line-height: 100%"><font face="Verdana" size="1">Quickie:'+
'&nbsp;'+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=255">Cafe</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=254">Gen</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=305">Khl</a> '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=267">1</a> '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=306">2</a> '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=293">arc</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=317">Shor</a> '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=268">1</a> '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=318">2</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=283">Img</a> '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=284">1</a> '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=285">2</a> '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=287">3</a> '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=286">4</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=288">Aud</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=304">Vid</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=294">Pak</a> '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=256">1</a>	'+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=295">2</a>	'+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=276">3</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=265">Rlgn</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=277">Wrld</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=298">S&P</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=261">Cul</a> |'+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=301">Poet</a> '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=262">1</a> '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=302">2</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=296">Life</a> '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=273">1</a> '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=297">2</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=263">Jok</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=291">Baz</a> <br> '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=266">C&A</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=300">Eco</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=274">Comp</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=278">Trav</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=289">Feed</a> |'+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=272">Mod</a> | '+
'<a href="http://www.paklinks.com/gs/forumdisplay.php?f=280">RF</a> |'+
'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
'Features:'+
'&nbsp;'+
'<b>'+
'<a target="_blank" href="http://www.paklinks.com/gs/chat/flashchat.php">'+
'chat</a>'+
'</b>'+
'&nbsp; |&nbsp;'+
'<b><a href="http://www.paklinks.com/gs/journal.php">journals </b></a>'+
'|&nbsp;'+
'<b><a href="/gs/arcade.php?">arcade/games</a></b>'+
'&nbsp;|&nbsp;'+
'<b><a href="/gs/gallery/">gallery</a></b>'+
'&nbsp;|&nbsp;'+
'<b><a href="/gs/gallery/browseimages.php?c=61">e-Cards</a></b>'+
'&nbsp;'+
'</font></td>'+
'</tr>'+
'</table>';
		
<!-- Menu Logic-->

  	// GM_log("Locate place holder for old quickie menu: first break tag", 0);						 							
	var quickie_menu  = currentDoc.getElementsByTagName("BR").item(1);

	// GM_log("Locate place holder for the ugly side menu", 0);						 							
	var side_menu  = currentDoc.getElementById('collapseobj_module_31');
	var side_column = side_menu.parentNode.parentNode;
	var row = side_column.parentNode;

	// GM_log("Remove side menu column first", 0);						 							
	row.removeChild(side_column);

	// GM_log("Locate & Remove image filler column", 0);						 							
	var cells = row.cells;
	row.removeChild(cells[1]);

	// GM_log("Insert old menu", 0);						 							
    	quickie_menu.parentNode.insertBefore(old_menu, quickie_menu);				

	// GM_log("Ensure first table width is reset to 100 percent", 0);						 							
	makeWider();
  }//end if


  // GM_log("GS Menu replacer is done.", 0);

})();

