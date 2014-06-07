// ==UserScript==
// @name           Myfitnesspal - Percentages left
// @namespace      http://gawd.at
// @description    A user script to add display of percentages to the daily calorie etc. intake
// @include        http://www.myfitnesspal.com/food/diary
// ==/UserScript==
window.gebc = function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
};

window.percent = function percent(remainingNode, total, goal) {
	remainingNode.firstChild.nodeValue = ( 100 * (1 - total / goal) ).toFixed(0) + "%";
};

window.remaining = function remaining(remainingNode, total, goal) {
	remainingNode.firstChild.nodeValue = goal - total;
};

window.eaten = function eaten(remainingNode, total, goal) {
	remainingNode.firstChild.nodeValue = ( 100 * total / goal ).toFixed(0) + "%";
};

window.parsetime = function parsetime(ttp) {
	// parsing needs the following steps:
	// AM/PM or a/p first
	// decide whether minutes are included (more than 2 digits)
	// convert to minutes
	ttp = ttp.toLowerCase();
	re = new RegExp(/([0-9:]+)([ap]?)m?/);
	res = re.exec(ttp);
	tmp = res[1].replace(/:/, "");
	if (tmp.length > 2) {
		h = parseInt(tmp.substr(0, tmp.length - 2));
		m = parseInt(tmp.slice(tmp.length - 2));
		if (m == "00") {
			m = 0;
		}
		ttp_t = (h * 60) + m;
	}
	if (res[2] == 'p') {
		ttp_t += 12 * 60;
	}
	return ttp_t;
}

window.progress = function progress(remainingNode, total, goal) {
	d = new Date();
	now = d.getHours() * 60 + d.getMinutes();
	// for food intake to be even, we'd have to figure out what time you need to start counting.
	// the night is a problem, since there is this 8 hour window of no calorie intake. we
	// approximate by saying when the first food is eaten and when the last...
	start = GM_getValue("daystart");
	end = GM_getValue("dayend");
	if (!(start && end)) {
		bfast = window.parsetime(prompt("When do you usually have breakfast?", "6:00"));
		beddy = window.parsetime(prompt("When do you usually go to bed?", "10:00p"));
		start = (bfast - .2 * beddy) / .8;
		GM_setValue("daystart", start + "");
		GM_setValue("dayend", beddy + "");
	} else {
		start = GM_getValue("daystart");
		end = GM_getValue("dayend");
	}
	// start = 240; // that's 4a
	// end = 1320; // 10p
	portion = (now - start) / (end - start);
	ontrack = ( 100 * (portion - (total / goal) )).toFixed(0);
	res = (portion * goal - total).toFixed(0) + " ";
	if (Math.abs(ontrack) < 10) {
		res += " ";
	} else if (ontrack >= 10) {
		res += "+";
	} else {
		res += "-";
	}
	remainingNode.firstChild.nodeValue = res;
	// the following is housecleaning: get a timer to recompute the current calorie expectation
	// oddly enough, the timer gets called a bunch of times, so that you get a cascading effect if you
	// don't limit it. here, the progress function defines mytimers, and compute will reset it
	// thus only if compute is called again will the timer reset.
	if (!window.mytimers) {
		window.setTimeout(window.compute, 30000);
		window.mytimers = true;
	}
};

window.data_array = null;
window.compute = function compute() {
	window.mytimers = undefined;
	percent = window.mytitle;
	titles = ['Remaining', 'Percentage Left', 'Percentage Eaten', 'On Track'];
	if (window.data_array != null) {
		remainingTitle = window.data_array[0];
		totals = window.data_array[1];
		goals = window.data_array[2];
		remainings = window.data_array[3];
	} else {
		totals = window.gebc("total", null, "tr")[0].getElementsByTagName("td");
		goals = window.gebc("total alt", null, "tr")[0].getElementsByTagName("td");
		remainings = window.gebc("total remaining", null, "tr")[0].getElementsByTagName("td");
		remainingTitle = remainings[0].firstChild;
		window.data_array = [remainingTitle, totals, goals, remainings];
	}
	titleParts = remainingTitle.nodeValue.split(':');
	if (titleParts.length > 1) {
		remainingTitle.nodeValue = titles[percent] + titleParts[1];
	} else {		
		remainingTitle.nodeValue = titles[percent];
	}
	for (i = 1; i < totals.length; i++) {
		if (totals[i].firstChild != null) {
			total = totals[i].firstChild.nodeValue
			goal = goals[i].firstChild.nodeValue
			// remove spurious characters
			total = total.replace(",", "");
			goal = goal.replace(",", "");
			switch (percent) {
				case 0: window.remaining(remainings[i], total, goal); break;
				case 1: window.percent(remainings[i], total, goal); break;
				case 2: window.eaten(remainings[i], total, goal); break;
				case 3: window.progress(remainings[i], total, goal); break;
			}
		}
	}
};

window.click = function click() {
	if (!window.mytitle) {
		window.mytitle = 0;
	}
	window.mytitle = (window.mytitle + 1) % 4;
	window.compute()
}

window.mytitle = 3;
window.compute();
node = window.gebc("total remaining")[0];
node.addEventListener("click", window.click, true);
