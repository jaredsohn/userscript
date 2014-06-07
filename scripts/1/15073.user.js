// ==UserScript==
// @name           Trash That Script
// @namespace      localhost
// @description    Provides a trashcan icon for each script, clicking on which will trash any script which has escaped your other filters.  (Version 20071207)
// @include        http://userscripts.org/scripts
// @include        http://userscripts.org/scripts?page=*
// ==/UserScript==

/*
The trashcan icon comes from
http://www.famfamfam.com/lab/icons/silk/
which is a very nice collection of free icons.
*/

var links = document.evaluate("//tr/td[@class='script-meat']/a[1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var trashArray = GM_getValue('trashArray', null);
if (trashArray !== null) {
	var trashed = trashArray.split(":");
	if (!trashed.length) { return; }
	for (i=0; i<links.snapshotLength; i++) {
		link = links.snapshotItem(i);
		if (link.href.match(/\/show\//)) {
			script_no = link.href.match(/\/(\d+)/)[1];
			for (j=0; j<trashed.length; j++) {
				if (script_no == trashed[j]) {
					reject = link.parentNode.parentNode;
					reject.parentNode.removeChild(reject);
					GM_log("Rejected script #" + script_no);
					break;
				}
			}
		}
	}
}

var alinks = document.evaluate("//tr/td[@class='script-install']/a[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (k=0; k<alinks.snapshotLength; k++) {
	var link = alinks.snapshotItem(k);
	if (link.href.match(/\/source\//)) {
		var script_no = link.href.match(/\/(\d+)/)[1];
		trashcan = document.createElement('img');
		trashcan.title = "Trash script";
		trashcan.src =
		'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
		'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFtSURBVBgZBcE9b01hAADg55x72mrdnqrE'+
		'1SCkCUEivu7SxGKppGMHNhKj2KRisYkY2MTcRFQMGh8/QGLxMRikJklJkN5B0N72cu95z3uO50lq'+
		'AAAAQAYACxP16KF8vhotvxSPNgfF/QFJDWBhOF7Yfyk9EXemRn73P359GJce1BkA1Y1918+MtxSi'+
		'Rmtrtjfzc9qtpAYvkmhl4/L4pNKGnglDfng6uLMt42WjOhD3xOGTzQ/acpVa0PDe5AgZ1eF4szxb'+
		'NvvJlHeCTKEhOOUVsmfNeO/Y3G5D1q3giERUWreuQFqea81N+acvN2Pcqu0SYzpqAWm4Mu2XTV1b'+
		'Em2raqmGQi0gDbsy3/X19fzV1PUHFKKAtPjWc1THJ109DAxUKkGlRFo8+azpuNNyBNEOlVrDmID0'+
		'6uOV5ddyuVFj3jioZa/crI5yjYzi/Nvl7nxbJXheN5O7SqUY4lpsk9Tg2sVwu+yUm+XS4iIA8B+6'+
		'i5xffIyBpQAAAABJRU5ErkJggg==';
		trashcan.setAttribute('id', script_no);
		trashcan.addEventListener("click", trash, false);
		link.parentNode.appendChild(trashcan);
	}
}

function trash() {
	script_no = this.getAttribute('id');
	if (confirm("Really trash script #" + script_no + "?")) {
		script_row = this.parentNode.parentNode;
		script_row.parentNode.removeChild(script_row);
		trashArray = GM_getValue('trashArray', null);
		GM_setValue('trashArray', trashArray + script_no + ":");
	}
}
