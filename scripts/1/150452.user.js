// ==UserScript==
// @name         HN Slapdown
// @description  Show ranking scores and highlight "slapped down" posts on Hacker News
// @namespace    http://userscripts.org/users/thomaspark
// @include      http://news.ycombinator.com/*
// @include      https://news.ycombinator.com/*
// @include      http://hhn.domador.net/*
// @match        https://news.ycombinator.com/*
// @match        http://news.ycombinator.com/*
// @match        http://hhn.domador.net/*
// @grant        none
// @version      0.2
// ==/UserScript==

(function(){

	function calcScore(p, t, g) {
		return ((p - 1) / Math.pow((2 + t), g));
	}

	function createNode(s, m) {

		var n = document.createElement("span");
		n.innerHTML = s.toFixed(2);

		if ((document.title == "Hacker News") && (s > 0.1)) {
			if (m / s < 0.5) {
				n.style.color = "red";
				n.style.fontWeight = "bold";
			} else if (m / s < 1) {
				n.style.color = "orange";
			}
		}

		return n;
	}

	var subtexts = document.getElementsByClassName("subtext"),
		subtext,
		point,
		age,
		hours,
		unit,
		gravity = 1.8,
		score,
		scoreMin = 999,
		scoreNode;

	for(var i=0; i < subtexts.length; i++) {

		subtext = subtexts[i].childNodes;

		if(subtext.length >= 5){

			point = subtext[0].textContent.replace(/ points?/, "");
			age = subtext[3].textContent.split(" ");
			hours = parseInt(age[1], 10);
			unit = age[2][0];

			if (unit == "d") {
				hours *= 24;
			} else if (unit == "m"){
				hours /= 60;
			}

			score = calcScore(point, hours, gravity);
			scoreNode = createNode(score, scoreMin);
			subtexts[i].insertBefore(scoreNode, subtexts[i].lastChild);
			subtexts[i].insertBefore(document.createTextNode(" | "), subtexts[i].lastChild);

			if (score < scoreMin) { scoreMin = score; }
		}
	}

}());