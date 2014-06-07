// ==UserScript==
// @name        xperteleven Förändringsrapporter 2.0
// @include     *www.xperteleven.com/changeReports.aspx?dh=*&TeamID=*
// @grant       GM_xmlhttpRequest
// ==/UserScript==



// FOR CHROME
// @name        xperteleven Förändringsrapporter
// @match     	http://www.xperteleven.com/changeReports.aspx?dh=*&TeamID=*
// @match     	https://www.xperteleven.com/changeReports.aspx?dh=*&TeamID=*
// @run-at 			document-end



function in_bounds(proposed, displayed) {

	return Math.round(proposed) === displayed;
}

function copyarray(arrayin) {
	
	var arr = [];
	for(var i = 0; i < arrayin.length; i++)
		arr.push(arrayin[i]);
	
	return arr;
	
}

function getworstcase(arr) {
	
	var worstcase = arr[0] - 0.5;

	for(var i = 1; i < arr.length; i += 2)
	{
		var proposedworstcase = (0.995 + arr[i]/100) * worstcase;
		
		if( in_bounds(proposedworstcase, arr[i+1]) )
		{
			worstcase = proposedworstcase;
		}
		else
		{
			if( proposedworstcase < arr[i+1] - 0.5 )
				worstcase = arr[i+1] - 0.5;
			else
				return 666;
		}
	}
	
	var crap = arr.pop();
	arr.push(worstcase);
	arr.reverse();
	
	var testval1 = arr[0];
	var testval2 = arr[0];
	for(var i = 1; i < arr.length; i += 2)
	{
		testval1 = testval1 / (0.995 + arr[i]/100);
		testval2 = testval2 / (1.00499999 + arr[i]/100);
	}
	var startval = arr.pop();
	
	console.log("worst case " + worstcase + " reversed to " + testval1 + " for proposed startvalue " + startval + "\n");
	
	if( !in_bounds(testval1, startval) && !in_bounds(testval2, startval) )
		return 666;
	
	
	

	return worstcase;
}

function getbestcase(arr) {
	
	var bestcase = arr[0] + 0.499999;

	for(var i = 1; i < arr.length; i += 2)
	{
		var proposedbestcase = (1.00499999 + arr[i]/100) * bestcase;
		
		if( in_bounds(proposedbestcase, arr[i+1]) )
		{
			bestcase = proposedbestcase;
		}
		else
		{
			if( proposedbestcase >= arr[i+1] + 0.5 )
				bestcase = arr[i+1] + 0.499999;
			else
				return -1;
		}
	}
	
	var crap = arr.pop();
	arr.push(bestcase);
	arr.reverse();
	
	var testval1 = arr[0];
	var testval2 = arr[0];
	for(var i = 1; i < arr.length; i += 2)
	{
		testval1 = testval1 / (1.00499999 + arr[i]/100);
		testval2 = testval2 / (0.995 + arr[i]/100);
	}
	var startval = arr.pop();
	
	console.log("best case " + bestcase + " reversed to " + testval1 + " for proposed startvalue " + startval + "\n");
	
	if( !in_bounds(testval1, startval) && !in_bounds(testval2, startval) )
		return -1;

	return bestcase;
}

function evaluate(arr) {

	var forworst = copyarray(arr);
	var forbest = copyarray(arr);

	var worst = getworstcase(forworst);
	var best = getbestcase(forbest);

	var displayedskill = arr.pop();

	if(worst === 666 || best === -1)
		return [-1,0,0,0];
	else
		return [arr[0], displayedskill, worst, best];
}

function formatoutcome(arr, single, equal) {
	
	var displayed = "";
	
	if(!single && !equal)
		displayed += "<tr><th colspan='3'>Om spelarens skicklighet före första uppdateringen var " + arr[0] + ":</th><th></th></tr>";
	
	if(arr[2] < arr[1] - 0.5)
		arr[2] = arr[1] - 0.5;
	if(arr[3] > arr[1] + 0.494999)
		arr[3] = arr[1] + 0.494999;
	
	
	displayed += "<tr><td style='width: 170px;'>Lägsta möjliga skicklighet:</td><td style='width: 30px;text-align: right;'>" + arr[2].toFixed(2) + "</td><td></td></tr>";
	displayed += "<tr><td style='width: 50px;'>Synlig skicklighet:</td><td style='width: 30px;text-align: right;'>" + arr[1].toFixed(2) + "</td></tr>";
	displayed += "<tr><td style='width: 50px;'>Högsta möjliga skicklighet:</td><td style='width: 30px;text-align: right;'>" + arr[3].toFixed(2) + "</td></tr>";
	
	//if(!single)
		displayed += "<tr><td style='width: 170px;'><div style='height: 10px;'></div></td></tr>";
		
	if(single)
	{
		displayed += "<tr><td colspan='3'>Spelarens skicklighet före första uppdateringen var " + arr[0] + "</td></tr>";
	}
	
	return displayed;
}

function calculate() {
    
	var uglystring = document.getElementsByClassName('tableinsection')[1].innerHTML;
	var arr = uglystring.split('<span nowrap="" title="');

	//var v = arr[0].split('selected="selected"');
	//var vv = v[1].split('>');
	//var name = vv[1].replace('</option', '');

	var trace = new Array();
	for(var i = 1; i < arr.length; i++)
	{
		var mess = arr[i].replace( /<\/?[^>]+(>|$)/g, "" );
		mess = mess.replace( '">', '' );
		mess = mess.replace( /\s+/g, ' ' );
		var vals = mess.split(' ');
		trace.push( parseFloat(vals[0]) );
		trace.push( parseFloat( vals[1].replace('%', '') ) );
	}

	if(trace.length > 0)
	{
		trace.reverse();

		var trace1 = trace.slice(0); trace1.unshift(trace[1] - 2);
		var trace2 = trace.slice(0); trace2.unshift(trace[1] - 1);
		var trace3 = trace.slice(0); trace3.unshift(trace[1]);
		var trace4 = trace.slice(0); trace4.unshift(trace[1] + 1);
		var trace5 = trace.slice(0); trace5.unshift(trace[1] + 2);
		var traces = [trace1, trace2, trace3, trace4, trace5];

		var validresults = [];

		for(var i = 0; i < traces.length; i++)
		{
			result = evaluate(traces[i]);

			if(result[0] !== -1)
				validresults.push(result);
		}
		
		var newNode = document.createElement("div");
		newNode.id = "mynode";
		var refNode = document.getElementById('ctl00_cphMain_dpdPlayers');
		refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
		document.getElementById('mynode').style.cssText = 'background-color: #F0F0F0; border: 1pt solid #DDDDDD; font-family: verdana; font-size: 8pt; padding: 5px; margin-top: 5px;'; 

		var alertstring = "<table style='border-collapse: collapse; '>";
		if(validresults.length === 1)
		{
			alertstring += formatoutcome(validresults[0], true, false);
			alertstring += "</table>";
			document.getElementById('mynode').innerHTML = alertstring;
		}
		else
		{
			var equal = validresults[0][2] === validresults[1][2] && validresults[0][3] === validresults[1][3];
			
			if(equal)
			{
				alertstring += formatoutcome(validresults[0], false, equal);
			}
			else
			{
				for(var i = 0; i < validresults.length; i++)
				{
					alertstring += formatoutcome(validresults[i], false, equal);
				}
			}
			
			if(equal)
			{
				alertstring += "<tr><td colspan='3'>Spelarens skicklighet före första uppdateringen var " + validresults[0][0] + " eller " + validresults[1][0] + " (spelar ingen roll för beräkningen)</td></tr>";
			}
			
			alertstring += "</table>";
			document.getElementById('mynode').innerHTML = alertstring;
		}

	}
}

window.onload = function() {
    
	calculate();
};
