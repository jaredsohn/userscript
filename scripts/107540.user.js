// ==UserScript==
// @name            BA Forum Helper
// @description     Makes BA Forums friendlier
// @author          stupac2
// @version         2.1.0
// @include         http://beeradvocate.com/forum/read/*
// @include			http://beeradvocate.com/beer/profile/*
// ==/UserScript==

divs = document.getElementsByTagName("div");
new_post_count = 0;
newest_post = 0;
post_links = [];
BAPostArray = [];
BAPostArrayLoc = 0;
BAScoreTable = [4.75,4.5,4.25,4,3.75,3.5,2.5,2,1];
BAGradeTable = ["A+","A","A-","B+","B","B-","C","D","F"];

date_reg = /\w{3} \d{2}, \d{4} - \d{2}:\d{2}:\d{2} \w{3}/
two_weeks = 14*24*3600*1000;
cur_date = new Date();
first_date = true;
old_thread = false;
previously_read = false;
latest_read = 10000000000;

url = document.location.href.match(/\d+/);

spans = document.getElementsByTagName("span");
for(i=0;i<spans.length;i++) {
	if(spans[i].className == "BAscore_big") {
		rAvg = 0;
		grade = 0;
		tds = document.getElementsByTagName("td")
		for(j=0;j<tds.length;j++) {
			if(tds[j].innerHTML.indexOf("rAvg") != -1) {
				rAvg = tds[j].innerHTML.match(/\d\.\d\d/);
				j = tds.length;
			}
		}
		for(k=0;k<BAScoreTable.length;k++) {
			if(rAvg>BAScoreTable[k]) {
				grade = k;
				k = BAScoreTable.length;
			}
		}
		spans[i].innerHTML = BAGradeTable[grade];
		i = spans.length;
	}
}

for(j=0;j<divs.length;j++) {
    spans = divs[j].getElementsByTagName("span");
    if(spans.length == 1 && spans[0].innerHTML == "new") {
		new_post_count++;
		anchors = divs[j].parentNode.getElementsByTagName("a");
		for(l=0;l<anchors.length;l++) {
			if(anchors[l].innerHTML.indexOf("Permalink") != -1) {
				post_links.push(anchors[l].getAttribute("href"))
			}
		}
    } else if(spans.length > 1 && spans[1].innerHTML.indexOf("Posted") == 0) {
		date = "" + spans[1].innerHTML.match(date_reg);
		post_date = new Date(date);
		if(first_date) {
			first_date = false;
			if(cur_date-post_date > two_weeks) {
				old_thread = true;
				if(GM_getValue("BAPostArray","empty") != "empty") {
					BAPostArray = GM_getValue("BAPostArray").split("|");
					for (q = 0; q < BAPostArray.length/2; q++) {
						if(BAPostArray[2*q] == url) {
							BAPostArrayLoc = 2*q;
							previously_read = true;
							latest_read = BAPostArray[2*q+1];
							newest_post = latest_read;
						}
					}
				}
			}
		}
		anchors = divs[j].getElementsByTagName("a");
		for(l=0;l<anchors.length;l++) {
			if(anchors[l].innerHTML.indexOf("Permalink") != -1) {
				href = anchors[l].getAttribute("href").match(/\d+/);
				if(href > latest_read) {
					post_links.push(anchors[l].getAttribute("href"));
					new_post_count++;
					if(newest_post < href) {
						newest_post = href;
					}
				}
			}
		}
	}
}

current = 0;
if(!old_thread) {
	for(j=0;j<divs.length;j++) {
		spans = divs[j].getElementsByTagName("span");
		if(spans.length == 1 && spans[0].innerHTML == "new" && current<post_links.length-1) {
			link = "<a href=\"".concat(post_links[current+1],"\">new</a>");
			spans[0].innerHTML = link;
			current++;
		}
	}
} else if(previously_read) {
	div_text = "<div style=\"padding:5px 0px 5px 5px; z-index:3; float:right; display:inline-block;\">&nbsp;&nbsp;<span style=\"color:#000000; background-color:#FFCC00; padding:5px;\">"
	for(j=0;j<divs.length;j++) {
		spans = divs[j].getElementsByTagName("span");
		if(spans.length > 1 && spans[1].innerHTML.indexOf("Posted") == 0 && current<post_links.length-1) {
			anchors = divs[j].getElementsByTagName("a");
			for(l=0;l<anchors.length;l++) {
				if(anchors[l].innerHTML.indexOf("Permalink") != -1) {
					href = anchors[l].getAttribute("href");
					if(href == post_links[current]) {
						link = div_text + "<a href=\"".concat(post_links[current+1],"\">new</a></span></div>");
						link_div = document.createElement('span');
						link_div.innerHTML = link;
						divs[j].parentNode.insertBefore(link_div, divs[j].parentNode.firstChild);
						current++;
						//j++;
					}
				}
			}
		} else if(spans.length > 1 && spans[1].innerHTML.indexOf("Posted") == 0 && current == post_links.length-1) {
			anchors = divs[j].getElementsByTagName("a");
			for(l=0;l<anchors.length;l++) {
				if(anchors[l].innerHTML.indexOf("Permalink") != -1) {
					href = anchors[l].getAttribute("href");
					if(href == post_links[current]) {
						link = div_text + "new</span></div>";
						link_div = document.createElement('span');
						link_div.innerHTML = link;
						divs[j].parentNode.insertBefore(link_div, divs[j].parentNode.firstChild);
						current++;
						j++;
					}
				}
			}
		}
	}
	BAPostArray[BAPostArrayLoc+1] = newest_post;
} else {
	anchors = document.getElementsByTagName("a");
	for(l=0;l<anchors.length;l++) {
		if(anchors[l].innerHTML.indexOf("Last reply from") != -1) {
			newest_post = anchors[l].getAttribute("href").match(/\d+/);
		}
	}
	BAPostArray.push(url+"|"+newest_post);
}

if(old_thread) {
	window.setTimeout(function() {GM_setValue("BAPostArray",BAPostArray.join("|"));}, 0);
}

bolds = document.getElementsByTagName("b");
replies_text = "";
if(new_post_count>0 && post_links[0].indexOf("#") != -1) {
	link = "<a href=\"".concat(post_links[0],"\">");
	replies_text = " | ".concat(link, new_post_count, " new replies </a>");
} else if(post_links.length > 1 && post_links[0].indexOf("#") == -1) {
	link = "<a href=\"".concat(post_links[1],"\">");
	replies_text = " | ".concat(link, new_post_count-1, " new replies </a>");
} else if(post_links.length == 1 && post_links[0].indexOf("#") == -1) {
	replies_text = " | 0 new replies";
} else {
	replies_text = " | ".concat(new_post_count, " new replies");
}

for(i=0;i<bolds.length;i++) {
	if(bolds[i].innerHTML.indexOf("replies") != -1) {
		text = bolds[i].innerHTML.concat(replies_text);
		bolds[i].innerHTML = text;
	}
}