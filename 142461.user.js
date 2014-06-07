// Last Updated: 6th September 2012
// Lead Programmer: Waser Lave
//
// ==UserScript==
// @name          Neopets Mysterious Negg Solver
// @namespace     http://www.neocodex.us
// @description   Automatically solves the Mysterious Negg puzzle
// @include       http://www.neopets.com/shenkuu/neggcave/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var solutionsList;
var curSolution = 0;
var checkTimer;

function run_sidebar()
{
	runStatus = GM_getValue("MNS_Status", 0);
	
	if(runStatus == 1)
	{
		textButton = "Stop";
		textStatus = "<span id='mnsStatus'>Status: <font color='green'><b>Active</b></font></span>";
	}else{
		textButton = "Start";
		textStatus = "<span id='mnsStatus'>Status: <font color='red'><b>Stopped</b></font></span>";
	}
	
	sideTD = document.evaluate("id('content')/table/tbody/tr/td[1]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);

	var newDIV = document.createElement("div");
	newDIV.setAttribute("class","sidebarModule");
	newDIV.setAttribute("style","margin-top: 7px;");
	newDIV.innerHTML = "<table width=\"158\" cellpadding=\"2\" cellspacing=\"0\" border=\"0\" class=\"sidebarTable\"><tr><td valign=\"middle\" class=\"sidebarHeader medText\">Negg Solutions List</td></tr><tr><td class=\"neofriend\" align=\"center\">"+textStatus+"<br />"+"<textarea name='sollist' cols='13' rows='10'></textarea><br /><br /></td></tr></table>";
	
	var newBut = document.createElement("input");
	newBut.setAttribute('type','button');
	newBut.setAttribute('name','mnsButton');
	newBut.setAttribute('value',textButton);
	
	newBut.addEventListener('click', runSolving, false);
	
	newDIV.getElementsByTagName('td')[1].appendChild(newBut);
	
	sideTD.appendChild(newDIV);
}

function runSolving()
{
	runStatus = GM_getValue("MNS_Status", 0);
	
	if(runStatus == 1)
	{
		stopSolving();
	}else{
		startSolving();
	}	
}

function updateLabels(i,j)
{
	runStatus = GM_getValue("MNS_Status", 0);
	
	if(runStatus == 1)
	{
		if(j > 0){
			document.getElementById("mnsStatus").innerHTML = "Status: <font color='green'><b>Active ("+i+"/"+j+")</b></font>";
			document.getElementsByName("mnsButton")[0].value = "Stop";
		}else{
			document.getElementById("mnsStatus").innerHTML = "Status: <font color='green'><b>Active</b></font>";
			document.getElementsByName("mnsButton")[0].value = "Stop";
		}
	}else{
		document.getElementById("mnsStatus").innerHTML = "Status: <font color='red'><b>Stopped</b></font>";
		document.getElementsByName("mnsButton")[0].value = "Start";
	}	
}

function checkInterval()
{
	runStatus = GM_getValue("MNS_Status", 0);
	
	if(runStatus == 0)
	{
		return;
	}
	
	if($('#mnc_popup_generic_incorrect').is(':visible')) {
		$('#mnc_intercept').hide();
		$('#mnc_popup_generic_incorrect').hide();
	}else if($('#mnc_popup_generic_correct').is(':visible')) {
		alert("Correct solution found!");
		stopSolving();
	}		
	
	var curPattern = solutionsList[curSolution];
	updateLabels(curSolution+1,solutionsList.length);
	fillPuzzle(curPattern);
	curSolution++;
	
	if(curSolution == solutionsList.length){
		stopSolving();
	}
}

function fillPuzzle(pattern)
{
	unsafeWindow.NeggCave.resetGridConfirm();
	var patternParts = pattern.split(",");
	var re = new RegExp(/s([0-9])c([0-9])/);
	
	var cells = [[ [-1, -1], [-1, -1], [-1, -1] ],	[ [-1, -1], [-1, -1], [-1, -1] ],[ [-1, -1], [-1, -1], [-1, -1] ]];
	
	if(patternParts.length == 9)
	{
		var y = 0;
		for(var i=0;i<9;i++)
		{
			runStatus = GM_getValue("MNS_Status", 0);
			
			if(runStatus == 0)
			{
				updateLabels(0,0);
				break;
			}
			var x = i%3;
			
			if(i > 0 && i%3 == 0){
				y++;	
			}
			
			var sc = patternParts[i];
			var m = re.exec(sc);
			
			if(m != null)
			{
				var s = m[0][1];
				var c = m[0][3];

				cells[x][y][0] = Number(s);
				cells[x][y][1] = Number(c);
				
				unsafeWindow.NeggCave.cells = cells;
				unsafeWindow.NeggCave.renderGrid();
			}	
		}
		unsafeWindow.NeggCave.submitGrid();
		
		if($('#mnc_popup_generic_incorrect').is(':visible')) {
			$('#mnc_intercept').hide();
			$('#mnc_popup_generic_incorrect').hide();
		}else if($('#mnc_popup_generic_correct').is(':visible')) {
			alert("Correct solution found!");
			stopSolving();
		}		
	}else{
		alert("Pattern needs 9 parts");
	}
}

function startSolving()
{
	GM_setValue("MNS_Status", 1);
	updateLabels(0,0);
	
	solutionsList = document.getElementsByName("sollist")[0].value.split(/[\n\r]+/);
	curSolution = 0;
	checkTimer = setInterval(checkInterval,3000);
}

function stopSolving()
{
	clearInterval(checkTimer);
	GM_setValue("MNS_Status", 0);
	updateLabels(0,0);
}

run_sidebar()