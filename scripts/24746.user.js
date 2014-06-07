// ==UserScript==
// @name          Reformed Alignmentism Pop Soda Fountain
// @description   Fills the Grey Space on all pages of the CasualCollective.com with a fountain of Pop Soda
// @include       http://casualcollective.com/*
// @include       http://*.casualcollective.com/*
// ==/UserScript==
// © 2008 by John "Ruffnekk" Willemse for the Reformed Alignmentism.
// Free to distribute unmodified.

ccBody = document.getElementsByTagName("body")[0];
ccBodyTables = ccBody.getElementsByTagName("table");
ccAppendTable = ccBodyTables[3];
ccAppendBody = ccAppendTable.getElementsByTagName("tbody")[0];
ccAppendRow = ccAppendBody.getElementsByTagName("tr")[0];

ccAppendRow.innerHTML += "<td><img src='http://www.casualcollective.com/images/spacer.gif' alt='' height='5' width='5'></td><td valign='top' width='90%'><div class='brownTitle'><div class='txt'><b>REFORMED ALIGNMENTISM</b></div></div><div><table border='0' cellpadding='0' cellspacing='0'><object><embed src='http://www.stormloader.com/users/ruffnekk/RA.swf' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' name='ReformedAlignmentism' width='256' height='561' quality='High'></object></table></div>";
