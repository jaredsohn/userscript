// ==UserScript==
// @name           Broken Turnovers
// @namespace      pbr
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// ==/UserScript==

unsafeWindow.updateFrame = gmupdateFrame;

function gmupdateFrame() {
	var cf = parseInt(unsafeWindow.currentFrame);
	for (var i = 1; i < unsafeWindow.play_data[cf].length; i++) {
		if (unsafeWindow.currentFrame % 1 == 0 || !unsafeWindow.play_data[cf + 1] || !unsafeWindow.play_data[cf + 1][i]) {
			// Even or last frame
			var data = unsafeWindow.play_data[cf][i];
			unsafeWindow.updatePlayer(data.id, data.x, data.y, data.p, data.icon);
			if (unsafeWindow.drawTargets) {
				unsafeWindow.updateTarget(data.id, data.tx, data.ty);
			}
		}
	else {
		// Odd, half frame
		var data = unsafeWindow.play_data[cf][i];
		var data2 = unsafeWindow.play_data[cf + 1][i];
		if (data2.id != data.id) {
			if (i >= 11) {
				data2 = unsafeWindow.play_data[cf + 1][i - 11];
			}
			else {
				data2 = unsafeWindow.play_data[cf + 1][i + 11];
			}
		}
		if (data2.id != data.id) {
			var html = "<table><tr class='nonalternating_color'><td>#</td><td>data</td><td>data2</td><td>data2-11</td><td>data2+11</td></tr>";
			for (var x=0; x<unsafeWindow.play_data[cf].length; x++) {
				html += "<tr class='alternating_color"+((x%2)+1)+"'><td>"+x+"</td><td>"+
						unsafeWindow.play_data[cf][x].id+"</td><td>"+
						unsafeWindow.play_data[cf+1][x].id+"</td><td>";
				if (x >= 11) {
						html += unsafeWindow.play_data[cf+1][x-11].id+"</td><td>";
				}
				else {
						html += "</td><td>";
						html += unsafeWindow.play_data[cf+1][x+11].id+"</td><td>";
				}
				html += "</tr>";
			}
			html += "</table>";
			document.getElementById("footer").innerHTML = html;
			unsafeWindow.pause();
			return;
		}
		unsafeWindow.updatePlayer(data.id, (data.x + data2.x) / 2, (data.y + data2.y) / 2, data.p && data.p != data2.p ? 2 : data.p, data.icon);
		}
	}
	// ball
	if (unsafeWindow.currentFrame % 1 == 0 || !unsafeWindow.play_data[cf + 1]) {
		unsafeWindow.updatePlayer('ball', unsafeWindow.play_data[cf][0].x, unsafeWindow.play_data[cf][0].y, unsafeWindow.play_data[cf][0]['z'], unsafeWindow.play_data[cf][0].tx, unsafeWindow.play_data[cf][0].ty);
	}
	else {
		unsafeWindow.updatePlayer('ball', (unsafeWindow.play_data[cf][0].x + unsafeWindow.play_data[cf + 1][0].x) / 2, (unsafeWindow.play_data[cf][0].y + unsafeWindow.play_data[cf + 1][0].y) / 2, (unsafeWindow.play_data[cf][0]['z'] + unsafeWindow.play_data[cf + 1][0]['z']) / 2, (unsafeWindow.play_data[cf][0]['tx'] + unsafeWindow.play_data[cf + 1][0]['tx']) / 2, (unsafeWindow.play_data[cf][0]['ty'] + unsafeWindow.play_data[cf + 1][0]['ty']) / 2);
	}
	unsafeWindow.positionFrame();	
}
 
