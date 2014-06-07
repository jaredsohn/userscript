// ==UserScript==
// @name           Yahoo Fantasy Basketball Players by Rank
// @namespace      http://userscripts.org/users/Trecetratops/playersbyrank
// @description    Every link pointing to Players search page is rewritten to sort them by
//                 Rank based on Average stats (monthly for Roti and weekly for H2H).
// @include        http://basketball.fantasysports.yahoo.com/nba/*

// @license        Creative Commons Reconocimiento-No comercial-Sin obras derivadas 3.0
//                 España License
// @author         Trecetratops
// @version        0.3
// @date           2010-Sep-24

// ==/UserScript==
/*
   When looking for a player to add I always have to select average stats (monthly for
   Roti and weekly for H2H) and sort by Rank to see the players with a hot streak. 

   I eventually "fixed" (no pun intended) the search to match what I was looking for.
   This is useful for me and may not be for you.
   
   Anyway I recommend you sort by O-Rank from time to time in order not to miss those
   injured FA's.

   Change log:

      2010-Sep-24  Modified h2h filter from "Last 7 Days (avg)" to "Last 14 Days (avg)",
                   being more representative if only two games were played last week.
      2009-Nov-30  Added the h2h check to filter by "Last Week (avg)" in that case.
      2009-Nov-23  Initial version. 
   
   Known issues:
       None at the moment.

   Credits:
       Based mainly on Yahoo! Fantasy Baseball URL Target Fixer by Dan Russell.
       By the way, his script works for basketball just changing the include URL.
*/

(function() {
	var psearchLinx, oneLink, addFilter;
	var itemLabels = document.getElementById('yspnav').getElementsByClassName('yuimenuitemlabel');
    if (scoringType('Matchup') == 'H2H') {
         addFilter = 'stat1=S_AL14';}
	else {
         addFilter = 'stat1=S_AL30';}
	addFilter = addFilter + '&sort=AR';
    // excludes those links already filtered and/or sorted
    psearchLinx = document.evaluate( "//a[contains(@href,'players') and \
                                      not(starts-with(@href,'http')) and \
                                      not(contains(@href,'watch')) and \
                                      not(contains(@href,'stat1')) and \
                                      not(contains(@href,'sort'))]", 
                                     document,
                                     null,
                                     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                     null
                                    ); 
    for (var i = 0; i < psearchLinx.snapshotLength; i++) {
       oneLink = psearchLinx.snapshotItem(i);
       var foundParams = oneLink.href.match(/\?/);
       if (foundParams) {
 	                //Keep adding params
 	                oneLink.href = oneLink.href + '&';}
       else {
 	                // No previous params
 	                oneLink.href = oneLink.href + '?';}
       oneLink.href = oneLink.href + addFilter;
   }
   function scoringType(t) {
        var st = 'Roti';
        for (var j = 0; j < itemLabels.length; j++) {
             if (itemLabels[j].text == t) {
                       st = 'H2H';}}
        return st;
   }
})();