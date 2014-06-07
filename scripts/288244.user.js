// ==UserScript==
// @name        LoL Counters for summoning.net
// @namespace   Pietu1998
// @include     http://www.summoning.net/v1/lyralei/*/*
// @require     http://code.jquery.com/jquery-1.10.2.min.js
// @version     1.3.2
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var loadingBox = $("<div>Loading counters...</div>");
var mainCounters = $("<h2>Counters: fetching...</h2>");
$("#spectate-time").parent().parent().append(mainCounters);
var blueCounters = $("<div></div>");
$("h1.team-100").parent().append(blueCounters);
var purpleCounters = $("<div></div>");
$("h1.team-200").parent().append(purpleCounters);
loadingBox.css({
	"position": "fixed",
	"top": "50px",
	"left": "100px",
	"background": "white",
	"border-radius": "5px",
	"padding": "10px",
	"z-index": "100000"
});
var loaded = 0, size = [0, 0], counterPercent = [0, 0, 0, 0], teams = [ [], [] ];

$("tr.uk-table-middle").each(function(){
	var isblue = $(this).hasClass("strip-team-100") ? 1 : 0;
	size[isblue]++;
	var champelem = $(this).find(".hero-name");
	var champ = champelem.text().trim();
	champ = (champ != "") ? champ : "velkoz";
	teams[isblue][teams[isblue].length] = champ.toLowerCase();
	var url = "http://www.lolcounter.com/champ/" + champ.replace(/[^A-Za-z]/g, "").toLowerCase();
	champelem.html("<a href=\"" + url + "\" target=\"_blank\">" + champ + "</a>");
	var counters = { counteredBy: {}, countersThese: {}, goodWith: {} };
	var xhr = GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(response){
			function bar(e){
				return parseInt($(e).find(".bar").attr("style").substring(6));
			}
			var data = $(response.responseText);
			var percent = [0, 0];
			$(data).find("#counterpicks-list .picks-panel a.picks-panel-link").each(function(){
				var name = $(this).attr("href");
				var value = counters.counteredBy[name] = bar(this);
				if(teams[1 - isblue].indexOf(name) > -1){
					percent[0] += value;
				}
			});
			$(data).find("#goodagainst-list .picks-panel a.picks-panel-link").each(function(){
				var name = $(this).attr("href");
				if(counters.counteredBy[name]){
					if(teams[1 - isblue].indexOf(name) > -1){
						percent[0] -= counters.counteredBy[name];
					}
					counters.counteredBy[name] = 0;
				}
				else{
					var value = counters.countersThese[name] = bar(this);
					if(teams[1 - isblue].indexOf(name) > -1){
						percent[1] += value;
					}
				}
			});
			$(data).find("#duopicks-list .picks-panel a.picks-panel-link").each(function(){
				counters.goodWith[$(this).attr("href")] = bar(this);
			});
			counterPercent[isblue * 2] += percent[0];
			counterPercent[isblue * 2 + 1] += percent[1];
			loaded += 1;
			if(loaded == size[0] + size[1]){
				$(blueCounters).html("Good Counters: " + Math.round(counterPercent[3] / size[0]) + "%</div><div>Bad Counters: " + Math.round(counterPercent[2] / size[0]) + "%");
				$(purpleCounters).html("<div>Good Counters: " + Math.round(counterPercent[1] / size[1]) + "%</div><div>Bad Counters: " + Math.round(counterPercent[0] / size[1]) + "%</div>");
				var difference = ((counterPercent[3] - counterPercent[2]) / size[0] + (counterPercent[0] - counterPercent[1]) / size[1]) / 2;
				$(mainCounters).html("Counters: " + Math.round(Math.abs(difference)) + "%");
				if(difference > 0){
					mainCounters.addClass("team-100");
				}
				if(difference < 0){
					mainCounters.addClass("team-200");
				}
				loadingBox.html("Loaded counters.").delay(2000).fadeOut("slow");
			}
		}
	});
	$(this).hover(function(){
		$(this).css({ background: "#999999" });
		$("tr.uk-table-middle" + ((isblue) ? ".strip-team-200" : ".strip-team-100")).each(function(){
			var champion = $(this).find(".hero-name").text().toLowerCase();
			if(counters.counteredBy[champion]){
				$(this).css({"background": "linear-gradient(to right, #ff0000 0%,#ff0000 " + counters.counteredBy[champion] + "%,#cccccc " + counters.counteredBy[champion] + ".001%,#cccccc 100%)"});
			}else if(counters.countersThese[champion]){
				$(this).css({"background": "linear-gradient(to right, #00ff00 0%,#00ff00 " + counters.countersThese[champion] + "%,#cccccc " + counters.countersThese[champion] + ".001%,#cccccc 100%)"});
			}
		});
		$("tr.uk-table-middle" + ((isblue) ? ".strip-team-100" : ".strip-team-200")).each(function(){
			var champion = $(this).find(".hero-name").text().toLowerCase();
			if(counters.goodWith[champion]){
				$(this).css({"background": "linear-gradient(to right, #00ff00 0%,#00ff00 " + counters.goodWith[champion] + "%,#cccccc " + counters.goodWith[champion] + ".001%,#cccccc 100%)"});
			}
		});
	}, function(){
		$("tr.uk-table-middle").css({ background: "white" });
	});
});

if(size[0] > 0){
	$("body").append(loadingBox);
}