// ==UserScript==
// @name           What.CD bitrate options
// @namespace      something
// @description    Makes sure you don't select an invalid bitrate on the upload form
// @include        http://what.cd/upload.php*
// @include        https://ssl.what.cd/upload.php*
// ==/UserScript==

function Format() {
	var bitrateOptions = [ [0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,1,0,1,1,0], [0,1,1,1,1,1,1,1,1,1,0,0,0], [0,1,1,1,1,1,1,1,0,1,1,1,0], [0,0,1,1,1,0,1,1,1,0,1,1,0], [0,1,1,1,1,1,1,1,1,1,1,1,0], [0,1,1,1,1,1,1,1,1,1,1,1,0]]
	var bitrateBox = $("#bitrate").raw();
	var perfectBitrateList = ["---", "192", "APS (VBR)", "V2 (VBR)", "V1 (VBR)", "256", "APX (VBR)", "V0 (VBR)", "q8.x (VBR)", "320", "Lossless", "24bit Lossless", "Other"];
	if (bitrateBox.options.length == perfectBitrateList.length) {
		for (var i = 0; i < perfectBitrateList.length; i++) {
			if (bitrateBox.options[i].value == perfectBitrateList[i]) {
				bitrateBox.options[i].disabled = bitrateOptions[$("#format").raw().selectedIndex][i];
			} else {
				bitrateBox.options[i].disabled = 0;
				break;
			}
		}
	}

	if ($("#format").raw().options[$("#format").raw().selectedIndex].value == "FLAC") {
		for (var i = 0; i < $("#bitrate").raw().options.length; i++) {
			if ($("#bitrate").raw().options[i].value == "Lossless") {
				$("#bitrate").raw()[i].selected = true;
			}
		}
		$("#upload_logs").show();
		$("#other_bitrate_span").hide();
	} else {
		$("#bitrate").raw()[0].selected = true;
		$("#upload_logs").hide();
	}
}


var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = Format;

document.body.appendChild(script);