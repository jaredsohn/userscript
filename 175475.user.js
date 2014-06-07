// ==UserScript==
// @id             www.erepublik.com-e6c30bf6-32aa-407e-a701-ddb64932171a@dejan.erep
// @name           eRep Turnir
// @version        0.1
// @namespace      dejan.erep
// @author         Dejan
// @description    
// @include        http://www.erepublik.com/en
// @include        https://www.erepublik.com/en
// @include        http://www.erepublik.com/en?*
// @include        https://www.erepublik.com/en?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require        http://tablesorter.com/__jquery.tablesorter.min.js
// @run-at         document-end
// @grant 	   	   GM_addStyle
// @grant 	   	   GM_xmlhttpRequest
// ==/UserScript==

$.tablesorter.addParser({ 
    id: 'thousands',
    is: function(s) { return false; }, 
    format: function(s) { return s.replace(/ /g,'');}, 
    type: 'numeric' 
}); 

var eRepCountryRanking = "http://www.erepublik.com/en/main/countries-tournament-world-rankings";
var eRepPersonRanking = "http://www.erepublik.com/en/main/countries-tournament-national-rankings/79";

$(document).ready(function () {

    GM_addStyle(".mybutton { position: fixed; left: 3px; width: 50px; height: 50px; background: #ccc; border-radius: 10px; line-height: 50px; text-align: center; cursor: pointer; font-family: Segoe UI, sans-serif; }");
    GM_addStyle(".myholder { position: fixed; padding: 20px; left: 25%; top:10%; width: 50%; height: 80%; background: #fff; border-radius: 10px; border: 5px solid #666; display: none; z-index: 10000; overflow: scroll; overflow-x: hidden; 	resize: both; }");
	
    GM_addStyle("#playerRanking { top: 10px }");
    GM_addStyle("#countryRanking { top: 80px }");
	
	GM_addStyle(".closeBtn { position: absolute; top: 5px; right: 10px; font:bold 20px Arial; cursor: pointer}");

	GM_addStyle(".myholder th { cursor: pointer; text-align: center; font-weight: bold; padding: 0 16px 0 4px;border:1px solid lightgray }");
	GM_addStyle(".myholder td { padding: 0 6px 0 4px; border: 1px solid lightgray }");
	GM_addStyle(".myholder .num { text-align: right }");
   
    GM_addStyle(".myholder table { margin: 0 auto }");
    GM_addStyle(".myholder table th.leftAlign { text-align: left }");

    GM_addStyle(".myholder .header { background-position: right center; background-repeat: no-repeat; }");
    
	GM_addStyle(".myholder .header { background-image: url(data:image/gif;base64,R0lGODlhFQAJAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAkAAAIXjI+AywnaYnhUMoqt3gZXPmVg94yJVQAAOw==); }");
	GM_addStyle(".myholder .header.headerSortDown { background-color: #eee; background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjB+gC+jP2ptn0WskLQA7); }");
	GM_addStyle(".myholder .header.headerSortUp {  background-color: #eee; background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjI8Bya2wnINUMopZAQA7); }");

	//end of styles
	
    $("body").append( "<div class='mybutton' id='playerRanking'>Player</div>");
    $("body").append( "<div class='mybutton' id='countryRanking'>Country</div>");
	
    $("body").append( "<div class='myholder' id='playerHolder'><table id='playerTable'><thead><tr><th>#</th><th>Rank</th><th class='leftAlign'>Name</th><th>Damage</th><th>Target</th><th>Percent</th></thead><tbody></tbody></table><div class='closeBtn'>X</div></div>");
	
    $("body").append("<div class='myholder' id='countryHolder'><table id='countryTable'><thead><tr><th>#</th><th>Rank</th><th class='leftAlign'>Country</th><th>Damage</th><th>Target</th><th>Percent</th></thead><tbody></tbody></table><div class='closeBtn'>X</div></div>");
	
    $("#playerRanking").click(showPlayerHolder);
    $("#countryRanking").click(showCountryHolder);

    $(".closeBtn").click( function() { $(this).parent().fadeOut(); });	
});

function showPlayerHolder() {
	$("#countryHolder").hide();
    $("#playerHolder").fadeIn();
    populateRankingData("player");
}

function showCountryHolder() {
	$("#playerHolder").hide();
    $("#countryHolder").fadeIn();
    populateRankingData("country");
}

function populateRankingData(what) {

	var loadUrl = (what == "country") ? eRepCountryRanking : eRepPersonRanking;
	var tableId = (what == "country") ? "#countryTable" : "#playerTable";
	
	if ( $(tableId + ' tr').length > 10 ) return;
	
    GM_xmlhttpRequest({
        method: "GET",
        url: loadUrl,
        onload: function (response) {
            appendData(response.responseText, tableId);
			if ($.fn.tablesorter) {
				var $table = $(tableId);
				$table.tablesorter({
					headers: {
						0: { sorter: false },
						3: { sorter:'thousands' },
						4: { sorter:'thousands' }
					}
				});
				$table.bind("sortEnd",function() { 
					var i = 1;
					$table.find("tr:gt(0)").each(function(){
						$(this).find("td:eq(0)").text(i);
						i++;
					});
				}); 
			}
        }
    });
}

function appendData(data, tableId) {
	var myData = JSON.parse(data);
    var $table = $(tableId + " tbody");
    $.each(myData.top, function(i, item) {
		var tableRow = "<tr><td>" + item.rank + "</td>" + 
					   "<td class='num'>" + item.rank + "</td>" +
					   "<td>" + item.name.replace(' (FYROM)','') + "</td>" +
					   "<td class='num'>" + addCommas(item.damage) + "</td>" +
					   "<td class='num'>" + addCommas(item.target) + "</td>" +
					   "<td class='num'>" + item.percent + "</td></tr>";
		//console.log(tableRow);
        $table.append(tableRow);
    });
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ' ' + '$2');
	}
	return x1 + x2;
}