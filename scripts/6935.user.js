// ==UserScript==
// @namespace     http://www.radioblogclub.com/
// @name          RadioBlogClub.com - clean and pretty
// @description   desc
// @include       *radioblogclub.com/search/0*
// ==/UserScript==

function getElementsByClass(className)
{
	var result = [];
	var elements = document.getElementsByTagName("div");
	for(var i = 0; i < elements.length; ++i)
		if(elements[i].className == className)
			result.push(elements[i]);

	return result;
}
function phraseList(node) {
	var TRs, TDs, a;
	TRs = node.getElementsByTagName("tr");
	for (var i = 0; i < TRs.length; ++i)
	{
		TDs = TRs[i].getElementsByTagName("td");
		a = TDs[5].getElementsByTagName("a")[0];
		a.href = unescape(TRs[i].getElementsByTagName("input")[0].getAttribute("onclick").split(/\('|'\)/g)[1].replace(/\\'/gi, "'"));
		if (a.href.substring(a.href.length-4) != ".swf") {
			a.target = "dl";
			a.innerHTML = a.innerHTML
				.replace(/_/g, " ")
				.replace(/^[0-9][0-9][0-9]? ?(-|\.)?/, "")
				.replace(/(.mp3)$/, "")
				.replace(/( ?- ?)/g, " - ")
				.replace(/- [0-9][0-9][0-9]? -/g, " - ")
				.toLowerCase();
		}
		else
			a.parentNode.style.display = "none";

		TDs[0].style.display = TDs[1].style.display = TDs[2].style.display = TDs[3].style.display = TDs[4].style.display = "none";
	}
	return node;
}
(function() {
	var styleString = "body, div, a, a:hover, b { color: #333; }" +
			  "#_header { opacity: 0.8; border-bottom: 1px #C1FF2D solid; padding: 15px 5px; position: fixed; background: #fff; width: 740px !important; }" +
			  "#_header input, #_header a { border: 0; border-bottom: 1px #0BCEFF solid; margin-bottom: 5px; font: 20px arial, helvetica, sans-serif; font-weight: bold; }" +
			  "#_header a { position: absolute; left: 255px; top: 16px; display: block; padding-top: 1px; padding-left: 9px; width: 22px; height: 25px; margin-left: 5px; border-bottom: 1px #0BCEFF solid; background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAAoAQMAAAGN8dUFAAAABlBMVEX%2F%2F%2F7B%2Fy2r6OlrAAAAAXRSTlMAQObYZgAAADFJREFUOI1jYBgFtAGCqIBBCRUwuKAChg5UMOL1M%2BEFDBx4AYMCXsDQgBeM2j2y7AYAf12uUqsTyWIAAAAASUVORK5CYII%3D') }" +
			  "#header_right { top: 15px; position: absolute; margin-left: 350px; }" +
			  "#header_right iframe { margin-top: 17px; margin-left: 35px; border: 0 #0BCEFF solid; width: 320px; height: 16px; }"+
			  "#ads, #sidebar { margin-top: 79px; }" +
			  "html { padding-bottom: 50px; }" +
			  "#page > div > table td { border-bottom: 1px #0BCEFF dashed; }" +
			  "#page > div > table td a { background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAaCAYAAACHD21cAAAABGdBTUEAALGPC%2FxhBQAAABd0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYyLjG76g3nAAAAa0lEQVQ4T2NgGAXDLgSmTJnyHx0T5UmQpm%2FfvsExzBCCmrFpvHPnDtgVeDXDNF65cgVsK9HORrcR3dk4bUW2EWQrDMNsJ6gR2SYYG68%2FB8ZGbImA6PgkGOEjTQEjIyMDKRgePqRoAqklWyMAYQ%2F0h4g8KXcAAAAASUVORK5CYII%3D) no-repeat; }" +
			  "#page > div > table td a:hover { background: #C1FF2D url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAaCAYAAACHD21cAAAABGdBTUEAALGPC%2FxhBQAAABd0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYyLjG76g3nAAAAa0lEQVQ4T2NgGAXDLgSmTJnyHx0T5UmQpm%2FfvsExzBCCmrFpvHPnDtgVeDXDNF65cgVsK9HORrcR3dk4bUW2EWQrDMNsJ6gR2SYYG68%2FB8ZGbImA6PgkGOEjTQEjIyMDKRgePqRoAqklWyMAYQ%2F0h4g8KXcAAAAASUVORK5CYII%3D) no-repeat; }" +
			  "#page > div > table td a:visited { background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAaCAYAAACHD21cAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABd0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYyLjG76g3nAAAAe0lEQVQ4T%2BWUMQrAMAhF6%2F1Xj%2BZZXFN%2BQbA2MY3QLgm4BN9Xo5GI6CgdgBUrQVeWlWjbgSu9vD0OQGZuM4NfF1TVNjKIpqCItGgQew3C0QS%2BBa1GRPT1pqn6tpij3Q1B7xDb4gUf7YjRDI7DkYI2EL2J2u5bre6e%2F5fVCUSP1nxAOiinAAAAAElFTkSuQmCC) no-repeat; }" +
			  "#page > div > table td a:visited:hover { background: #C1FF2D url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAaCAYAAACHD21cAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABd0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYyLjG76g3nAAAAe0lEQVQ4T%2BWUMQrAMAhF6%2F1Xj%2BZZXFN%2BQbA2MY3QLgm4BN9Xo5GI6CgdgBUrQVeWlWjbgSu9vD0OQGZuM4NfF1TVNjKIpqCItGgQew3C0QS%2BBa1GRPT1pqn6tpij3Q1B7xDb4gUf7YjRDI7DkYI2EL2J2u5bre6e%2F5fVCUSP1nxAOiinAAAAAElFTkSuQmCC) no-repeat; }" +
			  "#page > div > table td a { padding: 5px 5px 5px 19px; display: block; text-transform: capitalize; }" +
			  ".active_loading { position: absolute; top: 22px; left: 323px; width: 32px; height: 32px; background: url(data:image/gif;base64,R0lGODlhIAAgAPMAAP%2F%2F%2FzOcsdHo7ZzO2cTi6K7X316wwXe9y9%2Fv8unz9snk6UqnujadsgAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2Fh1CdWlsdCB3aXRoIEdJRiBNb3ZpZSBHZWFyIDQuMAAh%2FhVNYWRlIGJ5IEFqYXhMb2FkLmluZm8AIfkECQoAAAAsAAAAACAAIAAABOcQyElpYaXqzediS4UknUYMFaNSAkGUVLIsB6UyU%2BIqMDUvL8ltonAhepPBzDAZAhA7JMUwQwGcLgJJKiH8SEMoQUARbwEEgyEzOVQ1ulzROCmoDYegYMHutLJkFAd3eEc9WQQKZxQEg3dIYoYddgZBPZIwCVZcnFyIOwkCBQOkpZyfO6Wqm0ioiqKrrJ2zHZgwtrV0JZFIc4mLclk8SH8ugRPFibeWCb6SYr8TWhpix09FZzoEmH9HWV0uwD3aQd9PUZxzhuYA6lxiw2guOew9c2f1f55jjPNl4h0S2CoSj9aGZgA3RAAAIfkECQoAAAAsAAAAACAAIAAABOoQyElpWaTqzadZRjUUnUaQ1KJSBsOUVGIYR7pKhbvA7KxMqp1k4RrwJoVZbXgb6I6UwwwVBCBcDBQUQJgZEoDqwRWaIAgEsAQxGPwmUoOxkhNIEgo0ATFRtNt8VgYZJQJ6BHYUBH8jajCHCo4UbIxHZ3swfgOJPIE8CYRboluHaJF4paFHqQQKeamiqaevh6O2llueMJe6G7xHtJEbqKZQhnqcEsdoyb6hxJhresISaRqXyQh5jqDRymh8etVokkfdhOJWxaKvgekA7bnrXGgT51uvju8Ax6SIivUmlSuRoFeeN7c44BnIIQIAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpMaTqzecxRzVkXYUolaFSx7KUVDKMlGpMhHvD0zwgE1vQNeBNFL7gCjDQGSmFGQogTLgWpEkChvBthc1FqMdgFLQEBXASpVUKC4EEXmYUJQiCXrEFyOQdAgZ1DDsTAnp6An0whFgbCQqJUzADZXcdeQRrPAecJQmfT6OjiZMJkaZ6pKp7kq2sqnypqqS2o6IluRyauxS9Rq9pjDHClDCIiYCHpsu8WbSbE5rDOMR4ir%2BSjAl6n8lAiRKJ1zzdqwDiAJrHwd7j6ACvvhvsOPHnWTyvjOoSyaUIOPOHp1yHUBUktbulIZLBDREAACH5BAkKAAAALAAAAAAgACAAAATnEMhJqRii6s1nGUVVEJ2WINWgUodhlFRCENmkDhPhvnA%2BJ7aVpGUI9SSImSKIAxRchyNFMUMBboDEjhSDyX7X1QBKGSwW3CxBYZUIqhqdVXdeNAFJJVDd3ggOdQtRFjMzAnswgQZpMVSFRwVndxx5fSUDiCUnUpydEwygoQsFCY6FjD2hqgymp52rDKOlpzOetkeWJbmUcLq9MKYKmROzSlJvhTUTyIYwScSmbXlriATDeM0TCFSIX33IKI8Ahdde4uJ5S52Oc7US7JzpPmlfqCWO1e5u%2Bj3ZEuLaynHYNGXNLU3CpEQAACH5BAkKAAAALAAAAAAgACAAAATuEMhJKSqo6s0nKUWlZF2VkBMYpsNQUglBCJQ6Ia37enKSgpOcYneTDSU2gCJHpChkJFsih5L4SrEewEZorZAGA2ESG1EEUI1gcCUcwoYvQkZQXGNVDeINP1TQdAJXL3AGB0cmT3REBWFfHHMEeR1sRCdNmJkTC5ydcQmKdGOYnaULoaKZpgtioKIymrFEA5OQTQMMDDodkbUaubkLj2ShiCUCBsAMBn%2BiNCVzKQvAu5F1gwSDRTMUuAyjAFlVgBmLAHTalubmkcZEiiTmSmlN7TzgWeA7itiwE4CYZDyTIE8CgnRY8jxxJysRQg4RAAAh%2BQQJCgAAACwAAAAAIAAgAAAE8xDISWlSqerNpyJKJSCdlpAUoaZFUVqqkK4S0hLvTGSSivctWa6mCvVogpZr6FGhfICEEjXhdRK%2BDDRZ%2BEkUgwEVq6ACBE4NYlcLh42AdZGHNZsK7sFygvYJrCV5YhsXPl4lAm8vcnYdbDknTJKTEwaWlwc7H4aHOZefBpuck6AGmYWjlKo5A4AljRwFCwsDi2k5s7MGnRKoIEMIB7kLByKGQh0DDEIEBrm1RHMTjxQHDAwGFAPOXlgEZn0kUAnXDHtM3j9QAMoMC5SbTzQAC9fQwEXT8wTlkptW6yQYuObKEQFkAAJK0CMpEoUPcFYRwsAkAgAh%2BQQJCgAAACwAAAAAIAAgAAAE6xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIkTA4yNBXd9P4iNlAORkkuVA49pejaKoDoDeIJLBAYGBX9BQ6ioB58mfTl%2FB64GB3R6XB0FC1wEtqiqRDUYO3gDCwu5EwWosVGBZCgM1gAJywuxS1cS1gwSygsGik1C4BMGywOISbTpEgTaiE098RIHy6QbcxP44ri9OERhAYMFoUoUYEBMRwQAIfkECQoAAAAsAAAAACAAIAAABO8QyElpUqnqzaciSoVkXZUgFaFSwlpOiSpQKgGr4TvVJFB7KpROgsDtXEXQkPIhCH8xVU8y3UQJmV9yNkn2YgqhpOXUxEiXmjgJQpc7CbKsIicIqpxa29p0vZJiHIBLI0MnS4iJR3oYaXo2iI84fXqJko2UfoqbJViESwIDAzkdgzqiqIEwfaQlCQWoAwV0elwdBAZCCLGkbBhjDAMaAwYGB0yiYlGBBgwMxwvRAAnFBpCIBc4MGdELEgXFx4kLzsIA3RMHxbNLA87eEugSuMWI5Azs59LpxXgczgYoyJtQ4JoOWBUMLAjI6daCfC8iAAAh%2BQQJCgAAACwAAAAAIAAgAAAE8BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR%2BipslhToIB4RBLwMMDANDfRgbBAumpoZ1XBMGrwwGsxsCA2h9YqWmCwVEwhoEAwPDXR89BaaoEwcLC6gG1gAJyAOBVinTCxnWBhIK2ooG09DiEwXIOUMD0%2BMS60TmS%2BgLkAD1Eu28S6aFonWNCbcSxyocMDCQUx4DynREAAAh%2BQQJCgAAACwAAAAAIAAgAAAE6xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehgFCwyQkYl6NQqRlwyTlI2PmIqfQ4U6CQOEQS8DCwsFQ30YGwQGqqqGdVwTB7MLB7cbRWh9YqmqBjYACMUaWxQIHz0EqqW4BgalA9cAV3gmKdQGGdfSSTmIB9SsAOFAb0MF1AcT6lQ%2FS97G6dgTZNsb7xTyXfjBQjehwACCoDYIGNCrRAQAIfkECQoAAAAsAAAAACAAIAAABOgQyElpUqnqzaciSoVkXZUgFaFSwlpOiSpQKgGr4TvVJFB7KpROgsDtXEXQkPIhCH8xVU8y3UQJmV9yNkn2CAzGgBXUxEiXmhAwCDMWBaqzlGjVuBODm2HAl2ogVRIFC3tDSWscbWJLI4djS5GSEoA4CYR7YZKVOJlum5UYmJmTpYeCVpA6iC8FBgZxOk2BGwoHr69DdYB%2BALe4B4kaRWiza66vBzYACQO9AFsUCB9fr7GDAwM2UDwvVQjZA1lIRpLhOT8STcIlCuFHy8zpQ%2BFr8wB2qBvZ8T4uXfo2FKnwIYcpDhcCVogAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF1VDBWhUsJaTgnDGJRKwGr4TjJzSzaPCrGbDGSLSRCAyBUpCxkKEEzYSLBXoUcMNgkCyhdLWBimEoPsoLGSLjaiZLCoG34CBnqTaNnCFAd1dQdyLzYgWDUGg0k7X4YcdAsFTyNFCXtPm5uIOVYHBqKjnJ45o6g0nZ4YBKGpnLGblztWlkMvCgMDgLk2GBsIu8OYfiq9EifDBYoaTW8fuBK6uwWAbs7HYh9YwgM6En5dK1YqzW0V5QQZS1%2FgT9FySwDxs05ALgDqm9Fk%2BQB%2BznHQpuQfE4EcEkSiB0LWiwsINUQAADsAAAAAAAAAAAA%3D) no-repeat; }" +
			  "#top, #footer, #sidebar, #stats, #search, .clearer, .button_off, .boxtop, .boxbottom { display: none; }";

	var style = document.createElement("style");
	style.innerHTML = styleString;
	document.getElementsByTagName("head")[0].appendChild(style);

	if(getElementsByClass("content")[2].getElementsByTagName("div")[0]){getElementsByClass("content")[2].getElementsByTagName("div")[0].style.display = "none";}

	var h3, numOfResults, parent;
	h3 = document.getElementsByTagName("h3")[0];
	parent = h3.parentNode;
	numOfResults = parent.getElementsByTagName("b")[1]?parent.getElementsByTagName("b")[1].innerHTML:0;
	parent.innerHTML = "<div id=\"_header\"><div><input id=\"searchstr\" type=\"text\" value=\"" + h3.innerHTML + "\" /><a id=\"submit\" href=\"http://radioblogclub.com/search/0/" + h3.innerHTML.replace(/ /g, '_').toLowerCase() + "\">&gt;</a></div><b>Found " + numOfResults + " results</b><div id=\"_loadingbar\"></div><div id=\"header_right\"><iframe name=\"dl\" id=\"dl\"></iframe></div>";
	document.getElementById('searchstr').addEventListener('keyup', function(event) {
		if (event.keyCode == 13)
			location.href='http://radioblogclub.com/search/0/' + document.getElementById('searchstr').value.replace(/ /g, "_").toLowerCase();
		else
			document.getElementById('submit').href = 'http://radioblogclub.com/search/0/' + document.getElementById('searchstr').value.replace(/ /g, "_").toLowerCase();
	}, true);
	window.addEventListener('mouseover', function(event) {
			document.getElementById('submit').href = 'http://radioblogclub.com/search/0/' + document.getElementById('searchstr').value.replace(/ /g, "_").toLowerCase();
	}, true);
	document.getElementById('searchstr').focus();

	var table, box, isAd = 0;
	table = document.getElementsByTagName("table")[0];
	if (!table) return false
	if (table.parentNode.id == "ads") {
		isAd = 1;
		table = document.getElementsByTagName("table")[1];
		table.style.marginTop = "5px";
		phraseList(table);
	}
	else
		phraseList(table);

	var jsString = "var i=0, req, isAd="+isAd+", max="+(numOfResults-50)+";document.getElementsByTagName(\"html\")[0].setAttribute(\"onscroll\", \"isScroll()\");function isScroll() { if (document.documentElement.offsetHeight <= (self.pageYOffset + self.innerHeight + 300)) {if(i<max){document.getElementsByTagName(\"html\")[0].setAttribute(\"onscroll\", '');getMoreResults(i+=50);document.getElementById(\"_loadingbar\").className='active_loading';}} };function getMoreResults(i) {var name = document.location.href.split(\"/\");req = new XMLHttpRequest();req.onreadystatechange = function() {if (req.readyState == 4) {if (req.status == 200) {var html = document.createElement(\"html\");html.innerHTML = req.responseText;document.getElementsByTagName(\"table\")[isAd].parentNode.appendChild(phraseList(html.getElementsByTagName(\"table\")[0]));document.getElementById(\"_loadingbar\").className='';document.getElementsByTagName(\"html\")[0].setAttribute(\"onscroll\", \"isScroll()\");}}};req.open('GET', 'http://radioblogclub.com/search/'+i+'/'+name[name.length-1], true);req.send(null);};function phraseList(node) {var TRs, TDs, a;TRs = node.getElementsByTagName(\"tr\");for (var i = 0; i < TRs.length; ++i){TDs = TRs[i].getElementsByTagName(\"td\");a = TDs[5].getElementsByTagName(\"a\")[0];a.href = unescape(TRs[i].getElementsByTagName(\"input\")[0].getAttribute(\"onclick\").split(/\\('|'\\)/g)[1].replace(/\\\\'/gi, \"'\"));if ((a.href.substring(a.href.length-4) != \".swf\")) {a.target = \"dl\";a.innerHTML = a.innerHTML.replace(/_/g, ' ').replace(/^[0-9][0-9][0-9]? ?(-|\.)?/, '').replace(/(.mp3)$/, '').replace(/( ?- ?)/g, ' - ').replace(/- [0-9][0-9][0-9]? -/g, ' - ').toLowerCase();}else {a.parentNode.style.display = \"none\";};TDs[0].style.display = TDs[1].style.display = TDs[2].style.display = TDs[3].style.display = TDs[4].style.display = \"none\";}return node;}";
	var script = document.createElement("script");
	script.innerHTML = jsString;
	document.getElementsByTagName("head")[0].appendChild(script);

	getElementsByClass("button_off")[2].parentNode.style.display = "none";

	box = getElementsByClass("box");
	if (box[2].getElementsByTagName("iframe")[0]) {
		box[0].style.display = box[1].style.display = box[2].getElementsByTagName("h1")[0].style.display = "none";
		document.getElementsByTagName("table")[isAd].style.width="570px !important";
		box[2].getElementsByTagName("iframe")[0].style.position="absolute";
		box[2].getElementsByTagName("iframe")[0].style.top="290px";
		box[2].getElementsByTagName("iframe")[0].style.left="580px";
		document.getElementById("sidebar").style.display = "block";
	}
	var style = document.createElement("style");
	style.innerHTML = "#page > div { width: 100% !important; }";
	document.getElementsByTagName("head")[0].appendChild(style);
})();
