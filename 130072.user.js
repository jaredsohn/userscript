// ==UserScript==
// @name           Animated Dots
// @namespace      pbr/ad
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// ==/UserScript==

window.setTimeout( function() {
//document.getElementById("replay_container").style.MozTransform = "scale(2)";
	unsafeWindow.updateFrame = updateFrame;
}, 2000);

var angles = new Array();

var images = new Array();
images.push("http://oi40.tinypic.com/2hfq9uh.jpg");
images.push("http://oi41.tinypic.com/1z5qjcl.jpg");
images.push("http://oi41.tinypic.com/okpq2c.jpg");
images.push("http://oi43.tinypic.com/24zc0o3.jpg");
images.push("http://oi42.tinypic.com/dfgbwn.jpg");
images.push("http://oi43.tinypic.com/r9h6rc.jpg");
images.push("http://oi39.tinypic.com/b565vp.jpg");
images.push("http://s5.tinypic.com/2h4vs7k_th.jpg");

images.push("http://oi41.tinypic.com/34r64jk.jpg");

function updateFrame() {
	var cf = parseFloat(unsafeWindow.currentFrame);
	for (var i = 1; i < unsafeWindow.play_data[cf].length; i++) {
		var data = unsafeWindow.play_data[cf][i];
		if (unsafeWindow.orientation == 'horizontal') {
			unsafeWindow.updatePlayer(data.id, data.y, 517 - data.x, data.p, data.icon, data.br, data.mo);
		}
		else {
			unsafeWindow.updatePlayer(data.id, data.x, data.y, data.p, data.icon, data.br, data.mo);

			var lf = cf-1;
			if (unsafeWindow.play_data[lf] != null) {
				var image = document.getElementById(data.id.toString());
				if (angles[data.id] == null) {
					angles[data.id] = new Array();
					image.src = "http://s13.postimage.org/e62lvjh5v/image.png";
				}
				if (angles[data.id][cf] == null) {
					var dx = data.x - unsafeWindow.play_data[lf][i].x;
					var dy = data.y - unsafeWindow.play_data[lf][i].y;
					if ((dx == 0) && (dy == 0)) {
						angles[data.id][cf] = 8;
					}
					else {
						var angle = Math.atan2(dy,dx);
						var deg = 180 * (angle+Math.PI/2) / Math.PI;

						deg += 22.5;
						while (deg < 0) deg += 360;
						angles[data.id][cf] = Math.floor(deg / 45);
					}
				}

				if (angles[data.id][cf] != angles[data.id][lf]) {
					image.src = images[angles[data.id][cf]];
				}
			}
		}
		if (unsafeWindow.drawTargets) {
			unsafeWindow.updateTarget(data.id, data.tx, data.ty);
		}
	}

	// ball
	if (unsafeWindow.orientation == 'horizontal') {
		unsafeWindow.updatePlayer('ball', unsafeWindow.play_data[cf][0].y, 517 - unsafeWindow.play_data[cf][0].x, unsafeWindow.play_data[cf][0]['z'], unsafeWindow.play_data[cf][0].ty, 517 - unsafeWindow.play_data[cf][0].tx);
	}
	else {
		unsafeWindow.updatePlayer('ball', unsafeWindow.play_data[cf][0].x, unsafeWindow.play_data[cf][0].y, unsafeWindow.play_data[cf][0]['z'], unsafeWindow.play_data[cf][0].tx, unsafeWindow.play_data[cf][0].ty);
	}

	unsafeWindow.positionFrame();

	if (unsafeWindow.drawVectors) {
		unsafeWindow.updateVectors(unsafeWindow.currentFrame);
	}
}

