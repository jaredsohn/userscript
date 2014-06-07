// ==UserScript==
// @name           smf (simple machines forum) - ignore list
// @namespace      www.reeloo.net
// @include        http://www.simplemachines.org/community/*
// @version        0.1
// @author         reeloo
// ==/UserScript==

//to make this script working you have to edit "Include Pages" in Greasemonkey settings according to your forum
//ie.: "http://www.simplemachines.org/community/index.php?..." transform to "http://www.simplemachines.org/community/*"

//edit 'smf_url' line according to your forum
//it has to start with "http://" and end with "index.php"
var smf_url = 'http://www.simplemachines.org/community/index.php';

var banned = new Array();
//to ignore user with id 1, 2 a 3 uncomment the following lines, evtl. add more lines in format "banned.push(uid);"
banned.push(1680);



for (var i = 0; i < banned.length; i++){
	var uid = banned[i];
	var url = 'http://www.simplemachines.org/community/index.php?action=profile;u=' + uid;
	var expression = '//tr[td/table/tbody/tr/td/table/tbody/tr/td/b/a[@href = "' + url + '"]]';
	
	var nodes = document.evaluate(expression, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var j = 0; j < nodes.snapshotLength; j++) {
		var node = nodes.snapshotItem(j);
		node.style.display = 'none';
	}
}