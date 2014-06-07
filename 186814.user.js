// ==UserScript==
// @name        [CB] MU Export
// @namespace   com.erepublik.cb
// @include		http://*.erepublik.com/*/main/group-list/members/*
// @include		https://*.erepublik.com/*/main/group-list/members/*
// @version     1.5
// ==/UserScript==

$ = unsafeWindow.jQuery;

var exportButton = $('<a href="#" title="Export" class="plain_blue_small"><span>Export</span></a>');
exportButton.click(exportClick);
$(".regiment_drop_down").prepend(exportButton);

function exportClick() {
	var csv = '"Regiment";"Member name";"Member link";"Military Rank";"Fights yesterday";"Last fight";"Status"\r\n';
	$("#regiments_lists > option").each(function() {
		var regiment=$(this).text().trim();
		$.ajax({
			url: $(this).attr("url"),
			async: false,
			success: function(data) {
				$(data).find(".members").each(function() {
					csv += '"'+ regiment +'";';
					csv += '"'+ $(this).find("a").first().text() +'";';
					csv += '"http://www.erepublik.com'+ $(this).find("a").first().attr("href") +'";';
					csv += '"'+ $(this).find(".mrank > span").first().text() +'";';
					csv += '"'+ $(this).find(".strength > span").text() +'";';
					csv += '"'+ $(this).find(".last_fight > span").text() +'";';
					csv += '"'+ $(this).find("strong").text() +'"\r\n';
				});
			}
		});
	});
	var fileName = $(".header_content > h2 > span").text() +".csv";
	saveFile(fileName, csv);
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