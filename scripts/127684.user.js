// ==UserScript==
// @name         Amazon Associate Graphs
// @namespace    www.monkeyspannered.com/amazon-associate-graphs
// @include      https://*.amazon.*/gp/associates/network/reports/report.html*
// @author       Pete Matthews
// @description  Adds useful graphing to Amazon Associates pages
// ==/UserScript==

function main() {
  var $frm = $('form[name="htmlReport"]');
  if (($('#reportTypeSelect option:selected').val() == "trendsReport") ||
	  ($('#reportTypeSelect option:selected').val() == "earningsReport") )
  {
  }
  else
  {
	return;
  }
  
  $('<table class="report" id="graphHolder"><tr><td><div class="reportHeading"><h2 class="f10">' + $('div[class="reportHeading"] h2[class="f10"]:first').text() + '</h2><h3 class="f7">' + $('div[class="reportHeading"] h3[class="f7"]:first').text() + '</h3><a class="f1" id="glossaryLink" href="/gp/associates/network/help/glossary" target="glossary">Glossary</a></div></td></tr><tr><td><div id="placeholder" style="margin:5px;"></div></td></tr></table>').insertAfter('div[class="reporttext"]');
  $('#placeholder').height(300);
  
  $('<form action="https://www.paypal.com/cgi-bin/webscr" method="post" style="text-align:center"><input type="hidden" name="cmd" value="_donations"><input type="hidden" name="business" value="MEW9E2CHC3HBW"><input type="hidden" name="lc" value="GB"><input type="hidden" name="currency_code" value="GBP"><input type="hidden" name="bn" value="PP-DonationsBF:btn_donate_SM.gif:NonHosted">If you\'re finding these graphs handy, why not donate a little to the continued development? <input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online."></form></div>').insertAfter('#placeholder');
  
  $.get($frm.attr("action") + "?" + $frm.serialize() + "&submit.download_XML.x=1&submit.download_XML.y=1", 
	  function (data) {
		var seriesData = [];
		var opts = {};
		var roundTo = 0;
		if ($('#reportTypeSelect option:selected').val() == "trendsReport")
		{
			var $xmlDoc = $( data );
			var unique_visitors = [];
			var clicks = [];
			var orders = [];
			$xmlDoc.find("Day").each(function(i) {
				$date = Date.parse($(this).attr("Date"));
				unique_visitors.push([$date, $(this).attr("Visitors")]);
				clicks.push([$date, $(this).attr("Clicks")]);
				orders.push([$date, $(this).attr("Units")]);
			});
			
			if (unique_visitors.length == 1)
			{
				unique_visitors.push([unique_visitors[0][0] + 1, unique_visitors[0][1]]);
				clicks.push([clicks[0][0] + 1, clicks[0][1]]);
				orders.push([orders[0][0] + 1, orders[0][1]]);
			}
			
			opts = {
				xaxis: {
					mode: "time",
					timeformat: "%y/%m/%d",
					minTickSize: [1, "day"]
				},
				legend: {
					position: "nw"
				},
				grid: {
					hoverable: true
				}
			};
			
			seriesData = [{label: "Visitors", data: unique_visitors},
		                  {label: "Clicks", data: clicks},
						  {label: "Orders", data: orders}];
		}
		
		if ($('#reportTypeSelect option:selected').val() == "earningsReport")
		{
			var $xmlDoc = $( data );
			var earnings = {};
			var firstDate = 0;
			var lastDate = 0; 
			
			$xmlDoc.find("Item").each(function(i) {
				$date = $(this).attr("EDate") * 1000;
				earnings[$date] = 0;
				firstDate = $date;
				lastDate = $date;
			});
			
			$xmlDoc.find("Item").each(function(i) {
				$date = $(this).attr("EDate") * 1000;
				if ($date < firstDate)
				{
					firstDate = $date;
				}
				if ($date > lastDate)
				{
					lastDate = $date;
				}
				
				earnings[$date] += parseFloat($(this).attr("Earnings"));
			});
			
			var earningsPairs = [];
			var rollingAvg = [];
			var total = 0;
			var num_samples = 0;
			for (var i = firstDate; i <= lastDate; i += (24 * 60 * 60 * 1000))
			{
				num_samples++;
				if (i in earnings)
				{
					earningsPairs.push([i, earnings[i]]);
					total += earnings[i];
				}
				else
				{
					earningsPairs.push([i, 0]);
				}
				
				rollingAvg.push([i, total/num_samples]);
			}
			
			opts = {
				xaxis: {
					mode: "time",
					timeformat: "%y/%m/%d",
					minTickSize: [1, "day"]
				},
				legend: {
					position: "nw"
				},
				grid: {
					hoverable: true
				}
			};
			
			seriesData = [{label: "Earnings", data: earningsPairs}, {label: "Rolling Daily Average", data: rollingAvg}];
			roundTo = 2;
		}
		
		
		
		$.plot($('#placeholder'), seriesData, opts);
		
		$('.legendColorBox').css({border: "none", backgroundColor: "transparent"});
		$('.legendLabel').css({border: "none", backgroundColor: "transparent"});
		
		function showTooltip(x, y, contents) {
			$('<div id="tooltip">' + contents + '</div>').css( {
				position: 'absolute',
				display: 'none',
				top: y + 5,
				left: x + 5,
				border: '1px solid #fdd',
				padding: '2px',
				'background-color': '#fee',
				opacity: 0.80
			}).appendTo("body").fadeIn(200);
		}

		var previousPoint = null;
		$("#placeholder").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));

			if (true) {
				if (item) {
					if (previousPoint != item.dataIndex) {
						previousPoint = item.dataIndex;
						
						$("#tooltip").remove();
						var sampleDate = new Date(item.datapoint[0]);
						var x = sampleDate.getFullYear() + "-" + (sampleDate.getMonth() + 1) + "-" + sampleDate.getDate(),
							y = item.datapoint[1];
						
						showTooltip(item.pageX, item.pageY,
									x + "<br />" + y.toFixed(roundTo) + " " + item.series.label);
					}
				}
				else {
					$("#tooltip").remove();
					previousPoint = null;            
				}
			}
		});
	  }
  );
}



function addFlot() {
  var script = document.createElement("script");
  script.setAttribute("src", "http://cdnjs.cloudflare.com/ajax/libs/flot/0.7/jquery.flot.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + main.toString() + ")()";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery() {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = main.toString() + ";(" + addFlot.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}



// load jQuery and execute the main function
addJQuery();