// ==UserScript==
// @name No more pony
// @namespace nomorepony.js
//@include *
// @version 2
// ==/UserScript==
(function () {
	var replacements, regex, key, textnodes, node, s;

	replacements = {

		"my little pony": "The Third Reich",
		"mylittle pony": "The Third Reich",
		"my littlepony": "The Third Reich",
		"mylittlepony": "The Third Reich",
		"pony": "Nazi",
		"ponies": "Nazis",
		"brony": "SS Officer",
		"bronies": "SS Officers",
		"mlp": "The Nazi Party",
		"equestrian": "Nazi-era German",
		"equestria": "Nazi-Controlled Germany",
		"cutie mark crusader": "Hitler Youth",
		"cutiemarkcrusader": "Hitler Youth",
		"cutiemark crusader": "Hitler Youth",
		"cutie markcrusader": "Hitler Youth",
		"rainbow dash": "Heinrich Himmler",
		"rainbowdash": "Heinrich Himmler",
		"applejack": "Oskar Dirlewanger",
		"apple jack": "Oskar Dirlewanger",
		"pinkie pie": "Odilo Globocnik",
		"pinkiepie": "Odilo Globocnik",
		"fluttershy": "Adolf Eichmann",
		"flutter shy": "Adolf Eichmann",
		"twilight sparkle": "Joseph Mengele",
		"twilightsparkle": "Joseph Mengele",
		"celestia": "Adolf Hitler",
		"cutie mark": "swastika",
		"lauren faust": "an Evil Reptilian Race Overlord",
		"laurenfaust": "an Evil Reptilian Race Overlord",
		//"" : "", //use this to make your own
	};

	regex = {};
	for (key in replacements) {
		regex[key] = new RegExp(key, 'ig');
	}

	textnodes = document.evaluate("//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < textnodes.snapshotLength; i++) {
		node = textnodes.snapshotItem(i);
		s = node.data;
		//s = s.toLowerCase();
		for (key in replacements) {
			s = s.replace(regex[key], replacements[key]);
		}
		node.data = s;
	}

})();


// 
// 
// Considered it too tasteless to add these into the list
// but too good to leave out for all users. :V Works pretty well in most cases.
// "Not all Nazy party members bring jews to the shower"