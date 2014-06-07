// ==UserScript==
// @name           Pigskin empire: Add scouting links to recruits page
// @copyright      wozz
// @version        0.1
// @description    
// @include        http://*pigskinempire.com/recruiting.aspx*
// ==/UserScript==

window.setTimeout(function(){addScoutLink();},100);

function addScoutLink() {
	
	var grid = document.getElementById("CPH1_tblRecruits");
	var tableRows = grid.getElementsByTagName("tr");

	for(i=1; i<tableRows.length; i++) {

	    // Find the player link
	    var nameCell = tableRows[i].children[0];
	    var link = nameCell.getElementsByTagName("a");

	    var newLink = link[0].href.toString().replace("player.aspx?","prospect.aspx?V=S&m=P&");

	    // Get the cell holding the position
	    var positionCell = tableRows[i].children[3];

	    // Replace the position with a link
	    positionCell.innerHTML = '<a href=' + newLink + '>' + positionCell.innerHTML +'</a>';
	}

}