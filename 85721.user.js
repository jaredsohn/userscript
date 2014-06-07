// ==UserScript==
// @name           MatchArchiveFilter
// @namespace      THandboll
// @description    Adds a filter for game type in the match archive display
// @include        http://teamhb.org/index.php?page=team&subpage=marchive&team_id=*
// @include        http://www.teamhb.org/index.php?page=team&subpage=marchive&team_id=*
// @version        0.0.1.0
// ==/UserScript==

//The basic structure of the script is taken from the highlightSkills script by pstimpel

var timeout = 100;

// The types of matches. Can be appended and renamed (e.g. for translation purposes)
var matchTypes = new Array("Cup", "Friendly", "League", "HBLC");
// The style of the match table cell containing the date and game type. This is used for an XPath search
var matchCellStyle = '"border: 1px solid rgb(170, 170, 170); font-size: 10px; font-family: verdana,arial,sans-serif;"';
// The style of the match rows. This is used to make filtered rows reappear
var matchRowStyle = "background-color: rgb(238, 238, 238);";

window.setTimeout( function()
{
	// create the filter and add the event listener
	var matchFilter = document.createElement("select");
	matchFilter.setAttribute("id","matchFilter");
	matchFilter.setAttribute("style","border: 1px solid rgb(0, 0, 0); font-size: 0.8em;");
	matchFilter.addEventListener('change', (function(n) {
		filterGames(n);
	}) , true);

	// add the filter options
	var option = document.createElement('option');
	option.text = '';
	option.value = '';
	matchFilter.options.add(option,null);
	for(var i=0; i<matchTypes.length; i++){
		option = document.createElement('option');     
		option.text = matchTypes[i];
		option.value = matchTypes[i];
		matchFilter.options.add(option,matchFilter.length);
	}
	
	// add the filter right behind the season selector (insertBefore(...,null) is a bit of a hack)
	var selectSeason = document.getElementById('selsea');
	selectSeason.parentNode.insertBefore(matchFilter, null);

},timeout);

// Sets all table rows with matches not corresponding to the selected match type to display:none
// parameter n - Event (not used)
function filterGames(n) {
	// If the first element is selected, set match type to the empty string. That way, all matches will be displayed.
	var matchFilter = document.getElementById("matchFilter");
	var mtype;
	if (matchFilter.selectedIndex==0) {
		mtype = '';
	} else {
		mtype = matchTypes[matchFilter.selectedIndex-1];
	}

	// Find the table cells containing match date and type
	var xpath = '//td[@style=' + matchCellStyle + ']';
	var gameRows = document.evaluate(xpath,
                                       document,
                                       null,
                                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
                                       null);

	// Go through all rows, set style to display:none unless it matches the match type
	for (var k = 0; k < gameRows.snapshotLength; k++) {
		gameCell = gameRows.snapshotItem(k);	
		if (gameCell.innerHTML.match(mtype + "$")) {
			gameCell.parentNode.setAttribute("style",matchRowStyle);
		} else {
			gameCell.parentNode.setAttribute("style","display:none;");
		}
	}
}