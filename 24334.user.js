// ==UserScript==
// @name           Liquibet Graph
// @namespace      http://teamliquid.net
// @description    Insert a graph showing your liquibet history
// @include        http://teamliquid.net/liquibet/userstats.php
// @include        http://www.teamliquid.net/liquibet/userstats.php
// ==/UserScript==

/**
 * Paints a SVG graph showing your liquibet history below your liquibet stats. 
 * Can only display data from the time you install the script on. 
 * Relies on you doing liquibets regularly, or the graph data will not
 * be updated. 
 * 
 * Stores graph data in greasemonkey variables. you can delete them via
 * URL about:config (filter for greasemonkey*)
 *
 * Mainly developed as a proof-of-concept for SVG usage in userscripts. 
 * 
 */
(function() {

// helper functions
function xpath(node, expr) {
	var resultSet =  document.evaluate(expr, node, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var found = [];
	var res;
	for (var i = 0; i < resultSet.snapshotLength; i++) {
		found.push(resultSet.snapshotItem(i));
	}
	return found;
}
// create foreign namespace element
function c(element) {
	var elem = document.createElementNS("http://www.w3.org/2000/svg", element);
	for (var i = 1; i < c.arguments.length; i++) {
		elem.setAttribute(c.arguments[i], c.arguments[++i]);
	}	
	return elem;
}

// register funnction to reset your liquibet data: 
GM_registerMenuCommand('Reset Liquibet Graph', function () {
	// resets all stores liquibet points (new season)
	GM_setValue('tl.net-myPoints', '');
	GM_setValue('tl.net-possiblePoints', '' ); 
	GM_setValue('tl.net-bestPoints', '');
});

// update cached points with current stats
function updatePoints() {

	var myCurrentPoints = xpath(document.body,
								"//table[@width='600']/tbody/tr/td/table/tbody/tr[3]/td[2]/b")
								[0].innerHTML;
	
	var currentPossiblePoints = xpath(document.body,
								"//table[@width='600']/tbody/tr/td/table/tbody/tr[10]/td[2]/b")
								[0].innerHTML;	
								
	GM_xmlhttpRequest({ // start of xmlHTTPRequest()
        method: 'GET',
        url: 'http://teamliquid.net/liquibet/ranking.php',
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': '*/*'
        },
        onload: function(responseDetails) {
			var src = responseDetails.responseText;
			var pos1 = src.indexOf('</TR><TR><TD>1</TD><TD>') + 23;
			var pos2 = src.indexOf('<', pos1);
			
			var currentBestPoints = src.substring(pos1, pos2);
			
			if (GM_getValue('tl.net-possiblePoints') != ( null || '') )  {
				// check whether there are new liquibet points
				var possiblePoints = GM_getValue('tl.net-possiblePoints').split(',');
				if (parseInt(possiblePoints[possiblePoints.length-1]) < parseInt(currentPossiblePoints)) {
					// new liquibet points!
					GM_log('new liquibet points, updating...');
					
					GM_setValue('tl.net-myPoints', 
						GM_getValue('tl.net-myPoints')+','+myCurrentPoints);
						
					GM_setValue('tl.net-possiblePoints', 
						GM_getValue('tl.net-possiblePoints')+','+currentPossiblePoints);
						
					GM_setValue('tl.net-bestPoints', 
						GM_getValue('tl.net-bestPoints')+','+currentBestPoints);
				}
			} else {
				// 1st run or new season! create variables: 
				GM_setValue('tl.net-bestPoints', ''+currentBestPoints );
				GM_setValue('tl.net-myPoints', ''+myCurrentPoints) ;
				GM_setValue('tl.net-possiblePoints', ''+currentPossiblePoints);
			}
        }
	});// end of xmlHTTPRequest()
}

// create the SVG image
function paintGraph(myPoints, bestPoints, possiblePoints) {
	
	// create basic painting area
	var svg = c("svg");
	svg.setAttribute("width", "502");
	svg.setAttribute('height', '322');
	var rect = c('rect', 'x', "1", 'y', "1", 'width',"500", 'height',"320",
					'fill',"#ffffff", 'stroke',"black", 'stroke-width',"1");
	svg.appendChild(rect);
	
	// paint the axis
	// paint Y-Axis
	var yMax = possiblePoints[possiblePoints.length-1];
	var yFactor = Math.floor(300 / yMax);
		
	if (yMax >= 100) {
		var yAxisSteps = Math.ceil(yMax / 50)*10;
	} else {
		var yAxisSteps = Math.ceil(yMax / 5);
	}
	

	for (var i=1; i <= 5 ; i++ ) {
		var s =  c('polyline', 'style', "stroke:black; stroke-width: 1; fill : none;");
		var points = ' 0,'+(320-i*yAxisSteps*yFactor)+' 10,'+(320-i*yAxisSteps*yFactor);
		s.setAttribute('points', points);
		svg.appendChild(s);
		var yAxisText = c('text', 'style',"fill:black;", 'x','15', 'y',(320-i*yAxisSteps*yFactor)+4);
		yAxisText.textContent = i*yAxisSteps;
		svg.appendChild(yAxisText);
	}

	// user's liquibet stats
	var myStatsLine = c('polyline', 'style', "stroke:red; stroke-width: 2; fill : none;");
	// best' liquibet stats
	var bestStatsLine = c('polyline', 'style', "stroke:blue; stroke-width: 2; fill : none;");
	// best possible liquibet stats
	var possibleStatsLine = c('polyline', 'style', "stroke:green; stroke-width: 2; fill : none;");
	
	// calculate x and y scales
	var xDis = Math.floor(500 / myPoints.length);

	
	// compose point attributes of the 3 line graphs
	var myLinePoints = '';
	var bestLinePoints = '';
	var possibleLinePoints = '';
	var i=0;
	for (; i < myPoints.length; i++) {
		myLinePoints = myLinePoints + ' '+ (xDis*i) + ',' + (320 - parseInt(myPoints[i])*yFactor);
		bestLinePoints = bestLinePoints + ' '+ (xDis*i) + ',' + (320 - parseInt(bestPoints[i])*yFactor);
		possibleLinePoints = possibleLinePoints + ' '+ (xDis*i) + ',' + (320 - parseInt(possiblePoints[i])*yFactor);
	}
	
	myStatsLine.setAttribute('points', myLinePoints);
	bestStatsLine.setAttribute('points', bestLinePoints);
	possibleStatsLine.setAttribute('points', possibleLinePoints);
	
	svg.appendChild(myStatsLine);
	svg.appendChild(bestStatsLine);
	svg.appendChild(possibleStatsLine);
	
	// add legend
	var text1 = c('text', 'style',"fill:red;", 'x',"400", 'y',"270");
	text1.textContent = 'Your stats';
	var text2 = c('text', 'style',"fill:blue;", 'x',"400", 'y',"287");
	text2.textContent = 'Best stats';
	var text3 = c('text', 'style',"fill:green;", 'x',"400", 'y',"304");
	text3.textContent = 'Possible stats';

	// add text to the end of each line graph (current points)
	i = i -1;
	var text1a = c('text', 'style',"fill:red;", 'x',(xDis*i)+3, 'y',(324 - parseInt(myPoints[i])*yFactor));
	text1a.textContent = myPoints[i];
	var text2a = c('text', 'style',"fill:blue;", 'x',(xDis*i)+3, 'y',(324 - parseInt(bestPoints[i])*yFactor));
	text2a.textContent = bestPoints[i];
	var text3a = c('text', 'style',"fill:green;", 'x',(xDis*i)+3, 'y',(324 - parseInt(possiblePoints[i])*yFactor));
	text3a.textContent = possiblePoints[i];	
	
	svg.appendChild(text1);
	svg.appendChild(text2);
	svg.appendChild(text3);	
	svg.appendChild(text1a);
	svg.appendChild(text2a);
	svg.appendChild(text3a);
	
	return svg;
}

//
// main loop
// 
if (-1 != window.location.pathname.indexOf('/liquibet/userstats.php')) {
	//
	// right now you HAVE TO visit userstats.php to update your 
	// liquibet history. this is not really pretty, but hey...
	//
	updatePoints();
	
	var insertHere = xpath(document.body, "//table[@width='600']/tbody")[2];
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	td.style.textAlign = 'center';
	
	// retrieve cached points
	var myPoints = GM_getValue('tl.net-myPoints').split(',');
	var bestPoints = GM_getValue('tl.net-bestPoints').split(',');
	var possiblePoints = GM_getValue('tl.net-possiblePoints').split(',');
	
	var svg = paintGraph(myPoints, bestPoints, possiblePoints);
	
	tr.appendChild(td);
	td.appendChild(svg);
	insertHere.appendChild(tr);
}
})();