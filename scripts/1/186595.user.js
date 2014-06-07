// ==UserScript==
// @name        Leaderboard Export
// @namespace   com.erepublik.gazonkfoo
// @include		http://*.erepublik.com/*/main/leaderboards-*
// @include		https://*.erepublik.com/*/main/leaderboards-*
// @version     1
// ==/UserScript==

$ = unsafeWindow.jQuery;
var erepublik = unsafeWindow.erepublik

var exportButton = $('<a href="#" title="Export" class="open_settings" style="width: 45px; height: 15px; right: 48px; padding: 5px 0px 5px 10px; color: #EEF7DF; text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5)"><span>Export</span></a>');
exportButton.click(exportClick);
$(".selectors_area").append(exportButton);

function exportClick(e) {
	e.stopImmediatePropagation();
	
	var citizen = {};
	load("damage", citizen);
	load("kills", citizen);
	load("snowman", citizen);
	
	var csv = '"Name";"Division";"Damage";"Kills";"Snowman"\r\n';
	$.each(citizen, function() {
		csv += '"'+ (this.name ? this.name : '') +'";';
		csv += '"'+ (this.division ? this.division : '') +'";';
		csv += '"'+ (this.damage ? this.damage : 0) +'";';
		csv += '"'+ (this.kills ? this.kills : 0) +'";';
		csv += '"'+ (this.snowman ? this.snowman : 0) +'"\r\n';
	});
	
	saveFile("Leaderboards.csv", csv);
}

function load(current_tab, citizen) {
	var id = $('#leaderboard_flag').val();
	var week = $('#leaderboard_week').val();
	var mu_id = $('#leaderboard_mu').val();
	
	var url = 'http://' + erepublik.settings.hostname + '/' + erepublik.settings.culture + '/main/leaderboards-' + current_tab + '-rankings/' + id + '/' + week;
	
	if (current_tab != 'snowman' && typeof mu_id !== 'undefined' && !isNaN(mu_id))
		url += '/' + mu_id + '/0';
	
	$.ajax({
		url: url,
		dataType: 'json',
		async: false,
		success: function(data) {
			$.each(data.top, function() {
				if(!citizen[this.id]) {
					if(current_tab == 'snowman') return;
					citizen[this.id] = {name: this.name, division: this.myDivision};
				}
				citizen[this.id][current_tab] = this.values;
			});
		}
	});
}

function saveFile(fileName, data) {
	var downloadLink = document.createElement("a");
	downloadLink.style.display = "none";
	downloadLink.innerHTML = "Download File";
	downloadLink.download = fileName;
	downloadLink.href = window.URL.createObjectURL(new Blob([data], {type:'text/plain'}));
	
	downloadLink.onclick = function(event) {
		document.body.removeChild(event.target);
	}
	document.body.appendChild(downloadLink);

	downloadLink.click();
}