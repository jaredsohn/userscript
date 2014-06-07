// ==UserScript==
// @name           Show Flag by Scripts You Flagged
// @namespace      localhost
// @description    Displays a flag to remind you you've flagged a script as spam/malware on userscripts.org.  (Version 20071208)
// @include        http://userscripts.org/scripts
// @include        http://userscripts.org/scripts?page=*
// @include        http://userscripts.org/flag/Script/*
// ==/UserScript==

var flagData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIvSURBVDjLpdNdSFNhHMdx6YVIhaALC8GLoFcso5dVRHVRFFQISlJeVFYQgdKKiEprldrmS8KgWYK2raZGbaOcafamLVxq6qxs5qxIHYpkUiYsmVvn2zmnGBbkhbv48Ryeh//n+Z/D/4QBYaHkvweagxujb6cttzlOLuqtP7Wgx3I0tjr38Gp9TnIMYu6L2TEh8DkjQhgzJSL0tSC4rAR0K+i8EId/9BtPLq2RERnQ7Fs7xZs/4643b/qYN3caXrWY7KkEGnQw2AkjA9DnhN5G7FU38DzVUHYiTgIOyUBByqqI0ZyZ9bSUgNMIzeL6/iF4mqDrAQy8+b3fdJUipYK+51q0KfMkIFoG9EeWLfRlRrbLQFkilCZAbSa0ikU9DvHmF+KznmHzcZ81XcGHe0qpmOBHtB2bn+BXz/HQoofyJLi1B+qy4FU59Iutd9WIXRXTWaEbthdsprtG9TfgzJirFhza7zxWgXkvWPbDMzW8NcPXbvhYC+5qWiv1vDPtpvHKNglwBYEvmshK8YaA3LphOzw6B+134JOdQKvx54gx6YfPGO9/XZ4uAxXn10tAdhAYzY94KTQWQlupGBNCRyW+QgVDqkih7fJOp79em9x/84BhZUwULsMuilNjJWBTELAol5R0qKK8Q1nhwmBmuOA+PdtnTl3cMH4mxIIt19OWyh2Mf/8JB+kfIM92cUNIgLu5KD4kQC6uK9gaHOFJAdaz6yTgzGSAa3/+QmmdNf7sF2A4ynPOLQFtAAAAAElFTkSuQmCC";

var links = document.evaluate("//tr/td[@class='script-install']/a[1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var flaggedArray = GM_getValue('flaggedArray', null);
if (flaggedArray !== null) {
	var flagged = flaggedArray.split(":");
	if (!flagged.length) { return; }
	for (i=0; i<links.snapshotLength; i++) {
		link = links.snapshotItem(i);
		if (link.href.match(/\/source\//)) {
			script_no = link.href.match(/\/(\d+)/)[1];
			for (j=0; j<flagged.length; j++) {
				if (script_no == flagged[j]) {
					var script_no = link.href.match(/\/(\d+)/)[1];
					flag = document.createElement('img');
					flag.title = "You flagged this script!";
					flag.src = flagData;
					link.parentNode.appendChild(flag);
					break;
				}
			}
		}
	}
}

var script = window.location.href.match(/(\d+)/);
if (script) { var script_no = script[1]; }
// add event listener to Flag It button
var flagIt = document.getElementsByName('commit')[0];
if (flagIt) {
	flagIt.addEventListener('click', flag, false);
}

function flag() {
		flaggedArray = GM_getValue('flaggedArray', null);
		GM_setValue('flaggedArray', flaggedArray + script_no + ":");
}
