// ==UserScript==
// @name           SSW Maze Arrows
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Lets you use arrows in the mazes
// @include        http://www.secretsocietywars.com/index.php?p=planets&a=daily_maze*
// @include        http://www.secretsocietywars.com/index.php?p=quests&a=quest*
// ==/UserScript==

document.addEventListener("keydown", maze_kp, false);

function maze_kp(ev) {
	var dirs;
	var wanted_direction;
	var backtrack_div;

	if(ev.which == 37 || ev.which == 100) {
		wanted_direction = 'w';
	} else if(ev.which == 38 || ev.which == 104) {
		wanted_direction = 'n';
	} else if(ev.which == 39 || ev.which == 102) {
		wanted_direction = 'e';
	} else if(ev.which == 40 || ev.which == 98) {
		wanted_direction = 's';
	} else {
		return;
	}

	backtrack_div = document.evaluate('//div[@id="backtrackDirections"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if(backtrack_div && (backtrack_div.style.display != "none")) {
		return;
	}

	dirs = document.evaluate('//a[contains(@href,"&go='+wanted_direction+'")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(dirs.snapshotLength > 0) {
		ev.preventDefault();
		window.location.href = dirs.snapshotItem(0);
	}
}
						