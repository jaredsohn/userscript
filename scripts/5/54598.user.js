// ==UserScript==
// @name           JungleScene Anti-Necromancy Greasemonkey Script
// @namespace      http://www.xlotus.net
// @description    Helps you recognize old posts.
// @include        http://junglescene.com/forums/topic-*.html
// ==/UserScript==

var dateHunter = /(?:&nbsp;|\w+)([\d]{1,2}\s[\w]{3}\s(?:199|200)\d).+<br><b>[\+=\-]+<\/b>/img;
var tds = document.getElementsByTagName("td");
var yearInMsecs = 31556926279.7;

function log(s) {
	if (window.console) {
		window.console.log(s);
	}
}

for (var table in tds) {
	
	var res = dateHunter.exec(tds[table].innerHTML);
	var nowDate = new Date();
		
	if (res != null) {
		
		var thenDate = new Date(res[1]);
		if ((thenDate.valueOf() + yearInMsecs) < (nowDate.valueOf())) {
			
			var x = Math.floor(((nowDate.valueOf() - thenDate.valueOf()) / yearInMsecs));
			insertString = ' <font color=#990000><b>This post is ' + x + ' years old!</b></font>';
			if (x == 1) insertString.replace("years", "year");
			
			insertObject = document.createElement("span");
			insertObject.innerHTML = insertString;
			
			try {
				tds[table]
					.getElementsByTagName("table")[0]
					.getElementsByTagName("tbody")[0]
					.getElementsByTagName("tr")[0]
					.getElementsByTagName("td")[0].appendChild(insertObject);
			} catch(ex){
			}
		}
		
	}

}
