// ==UserScript==
// @namespace hmage.mthai
// @name Download Mthai Videos
// @description Download Mthai Videos (201310241218)
// @author High Magician (highmagician@gmail.com)
// @version 1.0.0
// @include http://video.mthai.com/player.php?id=*

// ==/UserScript==
(function() {
	var script = document.createElement("script");
	script.textContent = '('
			+ function() {
				// = Begin script =======

				function escapeFileName(string, replacement) {
					if (replacement === undefined) {
						replacement = "_";
					}
					
					return string.replace(/[\s\\\/:*?\"<>|]/g, "_");
				}

				// Get clip files
				var clips = [];
				for ( var c in obClip) {
					var obClipEach = obClip[c];

					var clip = {
						"label" : obClipEach.label,
						"url" : obClipEach.source
					};
					var extensionIndex = clip.url.lastIndexOf(".") + 1;
					clip.extension = (extensionIndex <= 0 ? "flv" : clip.url
							.substring(extensionIndex));

					clips.push(clip);
				}

				// Get ID
				var id = "";
				var locationSearchs = location.search.substring(1).split("&");
				for ( var s in locationSearchs) {
					var locationSearch = locationSearchs[s].split("=");

					if (locationSearch[0] == "id") { // [0] = key
						id = locationSearch[1]; // [1] = value

						break;
					}
				}

				// Get title
				var title = document.querySelector(".new-page-title a").textContent;

				// Create buttons
				var parentNode = document.createElement("span");
				parentNode.textContent = 'Download: ';

				var fileNameTitle = escapeFileName(title, "_").replace(/(_)+/g, "_");
				for ( var c in clips) {
					var clip = clips[c];

					var a = document.createElement("a");
					a.href = clip.url;
					a.download = id + "_" + clip.label + "_"
							+ fileNameTitle
							+ "." + clip.extension;
					a.target = "_blank";
					a.textContent = clip.label;

					parentNode.appendChild(a);
				}

				document.querySelector("#box-clip-mthai-inner").appendChild(
						parentNode);

				// = End script=======
			} + ')();';
	document.head.appendChild(script);
	script.parentNode.removeChild(script);
})();