// ==UserScript==
// @name        ScrumDoBoardBurndown
// @namespace   dk.syddjurs.scrumdo
// @description Adds a burndown chart to the ScrumDo Scrum Board
// @include     http*://www.scrumdo.com/projects/project/*/iteration/*/board*
// @version     1
// ==/UserScript==

var flot=document.createElement('script');
flot.setAttribute("type","text/javascript");
flot.setAttribute("src", "https://d1wvwjh87wwdl4.cloudfront.net/1352942579/site_media/static/js/flot.js");
document.getElementsByTagName("head")[0].appendChild(flot);

var burndown=document.createElement('script');
burndown.setAttribute("type","text/javascript");
burndown.setAttribute("src", "https://d1wvwjh87wwdl4.cloudfront.net/1352942579/site_media/static/js/burndown.js");
document.getElementsByTagName("head")[0].appendChild(burndown);

$("body").prepend (
      '<div id="customburndown" style="pointer-events:none;opacity:0.5;position:fixed;left:-2px;top:77px;margin-left:0;margin-right:0"></div>'
);

document.getElementById("med_stories").click();
document.getElementById("scrum-board-options").style.display = "none";

DrawBurnDownBoard();

var rtime = new Date(1, 1, 2000, 12,00,00);
var timeout = false;
var delta = 200;
$(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        DrawBurnDownBoard();;
    }               
}

function DrawBurnDownBoard()
{
	$("#customburndown").width((document.body.clientWidth + 5));
	$("#customburndown").height((document.body.clientHeight + - 112));
	GenerateBurnDownBoard( '#customburndown',document.location.pathname.split('/')[3],document.location.pathname.split('/')[5]);
}



function GenerateBurnDownBoard(divID, projectSlug, iterationID) {
	if (iterationID != "null") {
		$.ajax({
			url: "/projects/project/" + projectSlug + "/" + iterationID + "/burndown",
			method: 'GET',
			dataType: 'json',
			success: function(series) {
				burndownData[divID] = series;
				plotBurndownBoard(divID);
				showBurnUp();
			}
		});
	} 
	else {
		$.ajax({
			url: "/projects/project/" + projectSlug + "/burndown",
			method: 'GET',
			dataType: 'json',
			success: function(series) {
				burndownData[divID] = series;
				plotBurndownBoard(divID);
			}
		});
	}
} 

function plotBurndownBoard(divID) {
	var series = burndownData[divID];
	var options = {
		colors: ["red", "#ccc", "#ECFF1A"],
		xaxis: {
			show: false,
			minTickSize: [1, "day"],
			mode: "time",
			timeformat: "%d/%m/%y"			
		},
		yaxis: {
			show: false,
			min: 0
		},
		grid: {
			hoverable: false
		},
		legend: {
			show: false,
			position: "nw"
		},
		series: {
			lines: {
				show: true,
				fill: false
			},
			points: {
				radius: 1,
				show: true,
				fill: true
			}
		}
	};
	var total_series = series[0];
	var done_series = series[10];
	var burndownSeriesData = [];
	var estimateSeriesData = []
	var lastPoint;
	var firstPoint;
	for(var i = 0 ; i < total_series.data.length ; i++) {
		if( done_series.data.length > i ) {
			lastPoint = [ total_series.data[i][0],total_series.data[i][1] - done_series.data[i][1]];
			if(!firstPoint) {
				firstPoint = lastPoint;
			}
			burndownSeriesData.push(lastPoint);
		} else {
			estimateSeriesData.push(lastPoint);
			estimateSeriesData.push( [total_series.data[i][0],
				estimateEnd( total_series.data[0][0], // first date
					total_series.data[0][1], // first points
					total_series.data[i][0], // last date
					lastPoint[0], // last estimate date
					lastPoint[1] // last estimate points
				)
			]);
		}
	}
	var computedSeries = {label:"Points Remaining", data:burndownSeriesData};
	var estimatedSeries = {label:"Forecast", data:estimateSeriesData, lines: { show: true, fill: false }};
	var burndownSeries = [ computedSeries];
	if(estimateSeriesData.length>0) {
		burndownSeries.push(estimatedSeries);
	}
	if( series.length > 12) {
		if( series[12].data.length > 0 ) {
			burndownSeries.push( series[12] )
		} else if( series[11].data.length > 0 ) {
			burndownSeries.push( series[11] )
		}
	}
	if (burndownSeries[0].data.length > 0) {
		$.plot($(divID), burndownSeries, options);
		$(divID).bind("plothover", hoverHandler);
	} else {
		$(divID).addClass("noData");
		$(divID).html("Not enough data"); // No data
		$(divID).hide(true);
	}
} 