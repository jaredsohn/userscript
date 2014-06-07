// ==UserScript==
// @name           Bears Survivor Suite
// @namespace      glb.warriorgeneral.com
// @description    Adds rankings and available goodness to survivor 
// @include        http://goallineblitz.com/game/leagues.pl
// @include        http://glb.warriorgeneral.com/game/leagues.pl
// @include        http://glb.warriorgeneral.com/game/league_survivor.pl?league_id=*&week=*
// @include        http://glb.goallineblitz.com/game/league_survivor.pl?league_id=*&week=*
// ==/UserScript==

window.setTimeout(
    function() 
	{
		var url = window.location.href; // Get current page URL
		console.log(url);

		if (url.indexOf("leagues.pl") !== -1 )
		{
			console.log("leagues.pl");
			doLeaguesListStuff();
		}
		else
		{
				console.log("league");
			doLeagueStuff();
		}
	}
, 100);


// Globals

	var sorted = new Array();
	var otherspicks = new Array();
	var g_glbsavedpicks = "glbsavedpicks";

	
	var links = [];
var lsrvstr = "http://glb.warriorgeneral.com/game/league_survivor.pl?league_id=";
var lgstr = "http://glb.warriorgeneral.com/game/league.pl?league_id=";

// rankings globals
var stopsign = false;
var g_ranks = true;
var g_nextdelay = 45000;
var g_targetdepth = 3;
var g_threshold = 100;
var g_skipalreadypicked = true;
var g_quickprepick = false;
var forceselect = false;
var scorebased = true;
var autosubmit = true;
var g_glbsavedpicks = "glbsavedpicks";
	
var s29lowerlinks = [111,112,113,114,153,158,184,188,201,202,231,242,65,66,67,68,69,70,71,72,73,74,55,224,189,190,191,234,212,235,213,236,214,237,215,216,155,161,162,110,144,243,245];

//var s29lowerlinks = [111,112,113,114,153,158,184,188,201];



// Do the League Survivor STuff
function doLeagueStuff()
{	
	var mydiv = document.createElement("div");
	mydiv.innerHTML = " Reset All Stored Picks: ";
	
	var button = document.createElement("input");
    button.setAttribute("value","Picks_Reset");
    button.setAttribute("type","button");
    button.setAttribute("id","Picks_Reset");
    button.addEventListener("click",resetAllPicks,false);    
    mydiv.appendChild(button); //  only enable when wanting to reset the season
	


	
	var button = document.createElement("input");
    button.setAttribute("value","showSavedPicks");
    button.setAttribute("type","button");
    button.setAttribute("id","showSavedPicks");
    button.addEventListener("click",showSavedPicks,false);    
	mydiv.appendChild(button);

	var head = document.getElementsByClassName("medium_head")[1];
	head.parentNode.insertBefore(mydiv, document.getElementsByTagName("table")[1]); //

	getPlayerID();
	
	chow_main();
    
}

	
// League Survivor Stuff
function chow_main() {

 console.log("start Chow Main");
	var picks = new Array();
	var table = document.getElementsByTagName("table")[1];
	var rows = table.getElementsByTagName("tr");
	for (var i=1; i<rows.length; i++) {
		var h = rows[i].children[1].innerHTML;
		
		if (rows[i].children[2] != null && rows[i].children[2].innerHTML.indexOf("ELIMINATED") != -1) {
			h = h+" (incorrect)";

		}
		else {
		
	
var re = /team_id=(\d+).*team_id=(\d+)/;

var teams = h.match( re );

//	console.log(teams);
			//h = "<b>"+h+"</b>   " + "<a href=\"http://glb.warriorgeneral.com/game/compare_teams.pl?team1=" + teams[1] + "&team2=" + teams[2] + "\"> Link </a>";
			//f = "<a href=\"http://glb.warriorgeneral.com/game/compare_teams.pl?team1=" + teams[1] + "&team2=" + teams[2] + "\"> Link </a>";

		}
		

		if (picks[h] == null) {
			picks[h] = [h,0];

		}
		picks[h] = [picks[h][0], picks[h][1]+1];
	}


	for each (var p in picks) {
		if (sorted[p[1]] == null) sorted[p[1]] = new Array();
		sorted[p[1]].push(p[0]);
	}

	var tr = document.createElement("tr");
	tr.setAttribute("class","nonalternating_color");
	var td1 = document.createElement("td");
	td1.innerHTML = "<td>Count</td>";
	var td2 = document.createElement("td");
	td2.innerHTML += "<td>Pick</td>";

	var td4 = document.createElement("td");
	td4.innerHTML += "<td>Link</td>";
	tr.appendChild(td1);
	tr.appendChild(td2);

	tr.appendChild(td4);
	
	var tbody = document.createElement("tbody");
	tbody.appendChild(tr);

	var x = 1;
	var y = 0;
	for (var i=sorted.length-1; i>0; i--) {
		if (sorted[i] == null) continue;
		for (var j=0; j<sorted[i].length; j++) {
			
			var teams = sorted[i][j].match( /team_id=(\d+).*team_id=(\d+)/ );
			if (i>100)
				otherspicks[y] = [teams[1],"_"+i];
			if (i>10)				
				otherspicks[y] = [teams[1],"__"+i];
			else
				otherspicks[y] = [teams[1],"___"+i];				


			y++;
 

			var td1 = document.createElement("td");
			td1.innerHTML = "<td>"+i+"</td>";
			var td2 = document.createElement("td");
			td2.innerHTML += "<td>"+sorted[i][j]+"</td>";

			var td4 = document.createElement("td");
			td4.innerHTML += "<td>"+"<a href=\"http://glb.warriorgeneral.com/game/compare_teams.pl?team1=" + teams[1] + "&team2=" + teams[2] + "\"> Link </a>"+"</td>";
			
			
			var tr = document.createElement("tr");
			tr.setAttribute("class","alternating_color"+((x++)%2+1));
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td4);
			tbody.appendChild(tr);
		}
	}

	var table = document.createElement("table");
	table.setAttribute('id', 'othersPicks');
	table.appendChild(tbody);

	var head = document.getElementsByClassName("medium_head")[1];
	head.parentNode.insertBefore(table, document.getElementsByTagName("table")[1]);

addRankingInfo();

}




function doLeaguesListStuff()
{

	var mydiv = document.createElement("div");
	mydiv.innerHTML = " Rankings Script: ";
	
	
	var button = document.createElement("input");
    button.setAttribute("value","SurvRanks_All");
    button.setAttribute("type","button");
    button.setAttribute("id","S29button");
    button.addEventListener("click",s29ranks,false);    
	mydiv.appendChild(button);
	
//	var content = document.getElementById("content");
//	content.insertBefore(button, document.getElementById("america_map"));
	
	var button = document.createElement("input");
    button.setAttribute("value","SurvRanks_Lower");
    button.setAttribute("type","button");
    button.setAttribute("id","S29buttonlower");
    button.addEventListener("click",s29rankslower,false);    
//	mydiv.appendChild(button);
	
//	var content = document.getElementById("content");
//	content.insertBefore(button, document.getElementById("america_map"));



		

	
	var button = document.createElement("input");
    button.setAttribute("value","Stop");
    button.setAttribute("type","button");
    button.setAttribute("id","stopS29button");
    button.addEventListener("click",stopS29,false);    
//	mydiv.appendChild(button);
	
//	var content = document.getElementById("content");
//	content.insertBefore(button, document.getElementById("america_map"));



	var button = document.createElement("input");
    button.setAttribute("value","Submit All");
    button.setAttribute("type","button");
    button.setAttribute("id","submitallS29button");
    button.addEventListener("click",submitall,false);    	
	mydiv.appendChild(button);
	
	/*
	var andiv = document.createElement('div');
	andiv.setAttribute('id', 'inputsForm');
	andiv.innerHTML = 	'<input type="checkbox" class="debugMode" />' +
			'<span style="padding-right: 1%;">Debug Mode</span>' +
			'<input type="checkbox" class="forceChk" />' +
			'<span style="padding-right: 1%;">Force All</span>';


	*/

			var PickDepthSelect = document.createElement('select');
		PickDepthSelect.id = 'PickDepthSel';
		var blankop2 = document.createElement('option');
		blankop2.value = 0;
		blankop2.innerHTML = '';
		PickDepthSelect.appendChild(blankop2);

		for (i=1; i <= 10; i++) {
			var op = document.createElement('option');
			op.value = i;
			op.innerHTML = i;
			PickDepthSelect.appendChild(op);
		}
		var text = document.createTextNode( " Pick Depth: " );
		mydiv.appendChild(text);	
		mydiv.appendChild(PickDepthSelect);
		
		var TresholdSelect = document.createElement('select');
		TresholdSelect.id = 'ThresholdSel';
		var blankop2 = document.createElement('option');
		blankop2.value = 0;
		blankop2.innerHTML = '';
		TresholdSelect.appendChild(blankop2);
		var op = document.createElement('option');
		op.value = 0;
		op.innerHTML = '';
		TresholdSelect.appendChild(op);
		var op = document.createElement('option');
		op.value = 50;
		op.innerHTML = '50';
		TresholdSelect.appendChild(op);
		var op = document.createElement('option');
		op.value = 100;
		op.innerHTML = '100';
		TresholdSelect.appendChild(op);
		var op = document.createElement('option');
		op.value = 200;
		op.innerHTML = '200';
		TresholdSelect.appendChild(op);
		var op = document.createElement('option');
		op.value = 300;
		op.innerHTML = '300';
		TresholdSelect.appendChild(op);
		var text = document.createTextNode( " Diff Threshold: " );
		mydiv.appendChild(text);	
		mydiv.appendChild(TresholdSelect);
	

	    var cb = document.createElement( "input" );
        cb.type = "checkbox";
		cb.className = "debugMode";
        cb.checked = false;
        var text = document.createTextNode( "Debug Mode" );
		mydiv.appendChild(text);
		mydiv.appendChild(cb);
	
	    var cb = document.createElement( "input" );
        cb.type = "checkbox";
		cb.className = "forceChk";
        cb.checked = false;
        var text = document.createTextNode( "ForceAll" );
		mydiv.appendChild(text);
		mydiv.appendChild(cb);

	    var cb = document.createElement( "input" );
        cb.type = "checkbox";
		cb.className = "ScoreBase";
        cb.checked = true;
        var text = document.createTextNode( "ScoreBased" );
		mydiv.appendChild(text);
		mydiv.appendChild(cb);
		
		var cb = document.createElement( "input" );
        cb.type = "checkbox";
		cb.className = "AutoSubmit";
        cb.checked = true;
        var text = document.createTextNode( "AutoSubmit" );
		mydiv.appendChild(text);
		mydiv.appendChild(cb);
		
		var cb = document.createElement( "input" );
        cb.type = "checkbox";
		cb.className = "SkipPicked";
        cb.checked = true;
        var text = document.createTextNode( "SkipPicked" );
//		mydiv.appendChild(text);
//		mydiv.appendChild(cb);

		var cb = document.createElement( "input" );
        cb.type = "checkbox";
		cb.className = "QuickPrePick";
        cb.checked = false;
        var text = document.createTextNode( "QuickPrePick" );
//		mydiv.appendChild(text);
//		mydiv.appendChild(cb);

		

		
		var button = document.createElement("input");
		button.setAttribute("value","loadSavedPicks");
		button.setAttribute("type","button");
		button.setAttribute("id","loadSavedPicks");
		button.addEventListener("click",loadSavedPicks,false);    
		mydiv.appendChild(button);
		
		var button = document.createElement("input");
		button.setAttribute("value","printSavedPicks");
		button.setAttribute("type","button");
		button.setAttribute("id","printSavedPicks");
		button.addEventListener("click",printSavedPicks,false);    
		mydiv.appendChild(button);
		
		
		
		// For Multi
		getPlayerID();

		
		
	var content = document.getElementById("content");
	content.insertBefore(mydiv, document.getElementById("america_map"));
		
}




function s29ranks() {
	g_ranks = true;
	main("glbsurvivorbear");
	
}


function stopS29() {
	stopsign = true;
	addListeners();
}


function main(survivorstring) {
	document.getElementById("S29button").disabled = true;
	
	if (GM_getValue(survivorstring) != null) {	
		console.log("saved leagues exist --> "+GM_getValue(survivorstring));
		links = GM_getValue(survivorstring).split(",");
		console.log(links.length+") "+links);
	}
	if ((GM_getValue(survivorstring) == null) || (isNaN(parseInt(links[0])) == true)) {	
		console.log("no saved leagues. reloading.");
		for each (var l in document.links) {
			var lgid = parseInt(l.toString().split("league_id=")[1]);
			if (isNaN(lgid) == true) continue;
			
			if (links.indexOf(lgid) == -1) {
				links.push(lgid);
			}
		}
	}
	
				
	if(document.getElementsByClassName('forceChk')[0].checked == true)
		forceselect = true;

	if(document.getElementsByClassName('ScoreBase')[0].checked == false)
		scorebased = false;

	if(document.getElementsByClassName('AutoSubmit')[0].checked == false)
		autosubmit = false;
		
	console.log(autosubmit, "autosbumit");
		
	if(document.getElementsByClassName('debugMode')[0].checked == true)
		links=[1,15];
		//links=[5,6, 8, 16];
		
		
	console.log("user", g_glbsavedpicks);
	
	if(document.getElementsByClassName('SkipPicked')[0].checked == false)
		g_skipalreadypicked = false;	
		
	if( parseInt(document.getElementById('PickDepthSel').value))
		g_targetdepth = parseInt(document.getElementById('PickDepthSel').value);

	if( parseInt(document.getElementById('ThresholdSel').value))
		g_threshold = parseInt(document.getElementById('ThresholdSel').value);

	if(document.getElementsByClassName('QuickPrePick')[0].checked == true)
	{
		g_quickprepick = true;			
		g_nextdelay = 600;
	}
		
		
	var table = document.createElement("table");
	table.setAttribute("id","survivorTable");
	
	var content = document.getElementById("content");
	content.insertBefore(table, document.getElementById("america_map"));
	
	getInetPage(lsrvstr+links[0], links[0], getLeagues, links.slice(1));
}


function s29rankslower() {
	document.getElementById("S29buttonlower").disabled = true;
	
	var table = document.createElement("table");
	table.setAttribute("id","survivorTable");
	
	var content = document.getElementById("content");
	content.insertBefore(table, document.getElementById("america_map"));
	
	getInetPage(lsrvstr+s29lowerlinks[0], s29lowerlinks[0], getLeagues, s29lowerlinks.slice(1));
}


function loadSavedPicks() {
    var b = prompt('Enter the picks string here', GM_getValue(g_glbsavedpicks));
	console.log("atload ---> "+GM_getValue(g_glbsavedpicks));	

    if (b)
	{
		GM_setValue(g_glbsavedpicks,b);
		console.log("saved --> "+GM_getValue(g_glbsavedpicks));
    } 
	else 
	{
        alert('Invalid picks string ');
    }
}


function getLeagues(address, lgID, page, data) {
	var div = document.createElement("div");
	div.innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
	var elimin = false;

	var alreadypicked = false;
	
	

	try {
		var a = address.split(".com/")[1].replace("_survivor","")+'">';
		var leagueName = div.innerHTML.split(a)[1].split("<")[0];
		
		
		var table = document.getElementById("survivorTable");  // the table with each of the survivor rows... no need for ID.
		table.setAttribute("class","nonalternating_color");		
		var tbody = document.createElement("tbody");
		table.appendChild(tbody);
		
		var tr = document.createElement("tr");
		tr.setAttribute("class","alternating_color"+((table.rows.length%2)+1));
		tr.setAttribute("style", "white-space:nowrap");
		

		var select = div.getElementsByTagName("select");

		if(select.length == 0)
		{
			console.log("empty select"+lgID);
			elimin = true;
		}

		for (var s=0; s<select.length; s++) 
		{
			// found our select-really there should only be one
			if (select[s].getAttribute("name") == "my_pick") 
			{

    			var idx = select[s].selectedIndex;
    			var str = leagueName+") "+select[s].options[idx].text+" ("+select[s].options[idx].value+")";
    
    			// week is in the td before my_pick.
    			var currentweek = div.innerHTML.split("<td><select name=\"my_pick\">")[0].split("<td>").pop().replace("</td>","");
    
    			if(select[s].value != 0)
    			{
    				alreadypicked = true;
    			}
    
    
    			var td = document.createElement("td");
    			//			td.innerHTML = "<a style='color:black' href='"+address.replace("_survivor","")+"'>"+leagueName+"</a>";
    			td.innerHTML = "<a style='color:black' href='"+address+"&week="+currentweek+"'>"+leagueName+"</a>";
    
    			tr.appendChild(td);
    		
    			// add the week #
    			var td = document.createElement("td");
    
    			td.innerHTML = "<div style='color:black'>" + currentweek +"</div>";
    			tr.appendChild(td);
    
    			// get the rankings
    
    
    			var td = document.createElement("td");	// td for rankings stuff
    
    			//build a div to put in the location
    			var div = document.createElement('div');
    			div.setAttribute('id', 'rankings'+lgID);  // add the leagueid
    
    			//place the div		
    			td.appendChild(div);
    			
    
    
    
    			//build a div to store the input
    			div = document.createElement('div');
    			div.setAttribute('id', 'rankingInput'+lgID);
    			div.setAttribute("style","color:black");
    			td.appendChild(div);
    
    			//build a div to store the data temporarily
    			div = document.createElement('div');
    			div.setAttribute('id', 'rankingData'+lgID);
    			div.setAttribute("style","visibility: hidden; display:none;");
    			td.appendChild(div);
    
    			//build a div to store pages temporarily
    			div = document.createElement('div');
    			div.setAttribute('id', 'rankingTemp'+lgID);
    			div.setAttribute("style","visibility: hidden; display:none;");
    			td.appendChild(div);
    
    
    			//build a second div to store other pages temporarily
    			div = document.createElement('div');
    			div.setAttribute('id', 'newDocumentTemp'+lgID);
    			div.setAttribute("style","visibility: hidden; display:none;");
    			td.appendChild(div);
    
    
    			tr.appendChild(td);
    
    			// add the select
    
    			var td = document.createElement("td");
    			td.innerHTML = select[s].parentNode.innerHTML;				
    			tr.appendChild(td);
    				
    			table.appendChild(tr);
			
			}
			else if (s == select.length -1)
    	      {
    			console.log("Odd eliminated in"+lgID);
    			elimin = true;
    		}
    	}

	}
	catch (e) {
		console.log(e);
	}
	if (stopsign)
	{
		return 1;
	}
	else if (data.length > 0) {
	
	
		//lgID = current league ID
		//data[0] is next league to look at
		// So if data length is 0, then it is time to stop

	
		document.getElementById("S29button").value = data.length+" remaining";

		// call off the rankings stuff with the appropriate league id data[0].
		// ignore the other user picks for now
		// just get the rankings		

		if(alreadypicked == true && g_skipalreadypicked == true)
		{
			console.log("already picked, skipping lgID="+lgID);
			// recurse to the next lgID (Data[0])
			// reduce delay to 1 second, it's not like we're loading anything else here.
			window.setTimeout(getInetPage, 1000, lsrvstr+data[0], data[0], getLeagues, data.slice(1) );
		}
		else if(elimin==false && g_ranks == true)
		{
			// collect the current lgID.
			// Kick off GatherData for the current league ID..  
			if(g_quickprepick)
				getInetPage(lgstr+lgID, lgID, gatherData3, null);			
			else if (scorebased)
				getInetPage(lgstr+lgID, lgID, gatherData2, null);
			else
				getInetPage(lgstr+lgID, lgID, gatherData, null);
			

			// recurse to the next lgID (Data[0])
			window.setTimeout(getInetPage, g_nextdelay, lsrvstr+data[0], data[0], getLeagues, data.slice(1) );
			addListeners();	

		}
		else
		{
			console.log("eliminated in lgID="+lgID);
			// recurse to the next lgID (Data[0])
			// reduce delay to 1 second, it's not like we're loading anything else here.
			window.setTimeout(getInetPage, 500, lsrvstr+data[0], data[0], getLeagues, data.slice(1) );
		}
		
	
	}
	else {
		
		// have to finish off the last guy
		if(elimin==false && g_ranks == true)
		{
			// collect the current lgID.
			if(g_quickprepick)
				getInetPage(lgstr+lgID, lgID, gatherData3, null);			
			else if (scorebased)
				getInetPage(lgstr+lgID, lgID, gatherData2, null);
			else
				getInetPage(lgstr+lgID, lgID, gatherData, null);
			
			
		}
		else
		{
			console.log("eliminated in lgID="+lgID);
		}
		
		// alphabetize();
		addListeners();
		document.getElementById("S29button").value = "done";
		
				
		
	}
}


function addListeners() {
	var inputs = document.getElementsByTagName("input");
	for each (var btn in inputs) {
		if (btn.type == "submit") {
		    btn.addEventListener("click",submit,false);		
		}
	}
}

function submit(event) {
	var btn = event.target;
	var lgid = parseInt(btn.parentNode.parentNode.cells[0].firstChild.href.toString().split("=")[1]);
	var idx = parseInt(btn.parentNode.firstChild.selectedIndex);
	var selected = btn.parentNode.firstChild.options[idx].value;
		
	var data = "league_id="+lgid+"&my_pick="+selected+"&action=Submit+Pick";
	
    var req = new XMLHttpRequest();
	req.open( "POST", "http://glb.warriorgeneral.com/game/league_survivor.pl", true );
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Content-length", data.length);
	req.setRequestHeader("Connection", "close");	
	req.onreadystatechange = function() {
		if(req.readyState == 4 && req.status == 200) {
			event.target.value = "Submitted";
		}
		else { 
			event.target.value = req.status;
		}
	};
	req.send(data);
	return req;
}


function submitall() {

	var inputs = document.getElementsByTagName("input");
	for each (var btn in inputs) 
	{
		if (btn.type == "submit") 
		{
		
			var evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, true);
			btn.dispatchEvent(evt); 
		}
	}
}

function submitallauto() 
{



	try{

	addListeners();	
	
	/// select[0] may need to do something here.
	
	
	var select = location.getElementsByTagName("select");	
		for (var s=0; s<select.length; s++) 
		{
			select[s].value = 0;
		}
		
		var inputs = document.getElementsByTagName("input");
		for each (var btn in inputs) 
		{
			if (btn.type == "submit") 
			{
			
				var evt = document.createEvent("MouseEvents");
				evt.initEvent("click", true, true);
				btn.dispatchEvent(evt); 
			}
		}
	}
	catch (e) {
		console.log(e);
	}
	
}



function getInetPage(address, myid, func, data) {
    console.log("getInetPage : "+address);
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
			func(address, myid, this, data);
		}
	};

	req.send(null);
	return req;
}
















// NOW WITH RANKINGS!!!


function gatherData(address, lgID, page, data) {
	

	//console.log("gatherData:" + 'newDocumentTemp'+lgID);

 	document.getElementById('newDocumentTemp'+lgID).innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
	

	//clear the rankingInput and give the user progress feedback
	document.getElementById('rankingInput'+lgID).innerHTML = '<span id="progress'+lgID+'">Getting Rankings: 0%</span><span id="working'+lgID+'">.</span>';	
	
	//build a table in rankingData
	location = document.getElementById('rankingData'+lgID);
	
	var table = document.createElement('table');

	// !!! THiS will be a problem for mass tabling.

	table.setAttribute('id', 'rankingDataTable'+lgID);
	location.appendChild(table);
	
	location = document.getElementById('rankingDataTable'+lgID);

	for(var i=0; i<32; i++){
		tr = document.createElement('tr');
		tr.style.borderStyle="solid";
		location.appendChild(tr);
		tr = location.getElementsByTagName('tr')[i];		
		for(var j=0; j<78; j++){
			var td = document.createElement('td');
			td.innerHTML = '';
			tr.appendChild(td);
		}
	}

		location = document.getElementById('newDocumentTemp'+lgID).getElementsByClassName('conference')[0];
	
	
	
// Get the teams here				

	//----------fill the table with data	
	var teamId = new Array();	
	var j=0;
	//fill in the team name column and set the row id to the team id	
	for (var i=1; i<17; i++){

// !!! Need to modify to make global
// Pull this from the league page...
// Make sure document is the league page and we're golden.


		var teamPage = location.getElementsByTagName('tr')[i].childNodes[3].firstChild.href.split('=', 2);
	
		if (teamPage[0] == "http://glb.warriorgeneral.com/game/league.pl?league_id") { // WORLD LEAGUE
			teamPage = location.getElementsByTagName('tr')[i].childNodes[5].firstChild.href.split('=', 2);
			var teamName = location.getElementsByTagName('tr')[i].childNodes[5].firstChild.innerHTML;
		} else {
			var teamName = location.getElementsByTagName('tr')[i].childNodes[3].firstChild.innerHTML;
		}
		teamId[j] = teamPage[1];

		document.getElementById('rankingDataTable'+lgID).getElementsByTagName('tr')[j].id = teamId[j];
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].innerHTML = teamName;
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].setAttribute('class', 'completed'+lgID);

		j++;		

		updateProgress(lgID);
	}	
	
	
	
	// go to the second conference list
	location = document.getElementById('newDocumentTemp'+lgID).getElementsByClassName('conference')[1];
	
	
		for (var i=1; i<17; i++){

// !!! Need to modify to make global
// Pull this from the league page...
// Make sure document is the league page and we're golden.


		var teamPage = location.getElementsByTagName('tr')[i].childNodes[3].firstChild.href.split('=', 2);
	
		if (teamPage[0] == "http://glb.warriorgeneral.com/game/league.pl?league_id") { // WORLD LEAGUE
			teamPage = location.getElementsByTagName('tr')[i].childNodes[5].firstChild.href.split('=', 2);
			var teamName = location.getElementsByTagName('tr')[i].childNodes[5].firstChild.innerHTML;
		} else {
			var teamName = location.getElementsByTagName('tr')[i].childNodes[3].firstChild.innerHTML;
		}
		teamId[j] = teamPage[1];

		document.getElementById('rankingDataTable'+lgID).getElementsByTagName('tr')[j].id = teamId[j];
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].innerHTML = teamName;
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].setAttribute('class', 'completed'+lgID);

		j++;		

		updateProgress(lgID);
	}	
	


	for(var i=0; i<32; i++)
	{
			document.getElementById(teamId[i]).getElementsByTagName('td')[1].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[1].setAttribute('class', 'completed'+lgID);
			updateProgress(lgID);	
			document.getElementById(teamId[i]).getElementsByTagName('td')[2].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[2].setAttribute('class', 'completed'+lgID);
			document.getElementById(teamId[i]).getElementsByTagName('td')[3].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[3].setAttribute('class', 'completed'+lgID);
			updateProgress(lgID);
		
	}

	//figure out how many regular season games we need to look at

		
	for(var i=0; i<32; i++){
		getTeamPage(teamId[i], lgID);
		getTeamEffLVLPage(teamId[i], lgID);
	}		

	// remove the newDocumentTemp  to save memory space
 	document.getElementById('newDocumentTemp'+lgID).innerHTML = "";
	
}

function calculateResults(lgID){


try
{
	//clear the rankingInput and give the user progress feedback
	document.getElementById('rankingInput'+lgID).innerHTML = "<p>Calculating Rankings<span id='working"+lgID+"'>.</span></p>";

	var results = new Array();
	for(i=0; i<32; i++)
	{
		results[i] = new Array();
		location = document.getElementById('rankingDataTable'+lgID).getElementsByTagName('tr');
		results[i][0] = parseInt(location[i].id); //Team Id
		location = location[i].getElementsByTagName('td');		
		results[i][1] = location[0].innerHTML; //Team Name
		results[i][2] = location[1].innerHTML; //blank
		results[i][3] = location[2].innerHTML; //Player Count (non CPU)
		results[i][4] = location[3].innerHTML; //AVG Value (for those players)
		results[i][5] = location[4].innerHTML; //Effective Lvl (for the team)
		results[i][6] = location[5].innerHTML; //chemistry		
		results[i][7] = location[6].innerHTML; //cpu players				
		
	}

	
	document.getElementById('rankingInput'+lgID).innerHTML = "<p>Done Calculating<span id='working"+lgID+"'>.</span></p>";

	}
	catch (e) {
		console.log(e);
	}
	
	
	var otherspicks = new Array();

	var weekID = parseInt(document.getElementById('rankings'+lgID).parentNode.previousSibling.firstChild.innerHTML);
	
	getOthersPicksThenUpdateSelects(results, otherspicks, lgID, weekID);
	// UpdateTheDropDowns(results, lgID);


	
}


function getOthersPicksThenUpdateSelects(results, otherspicks, lgID, weekID) {
	GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://glb.warriorgeneral.com/game/league_survivor.pl?league_id=' + lgID + '&week='+weekID,
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response)
			{
			
				document.getElementById('rankingInput'+lgID).innerHTML = "<p>Tabulating Others' Picks <span id='working"+lgID+"'>.</span></p>";

			
				var div = document.createElement("div");
				div.innerHTML = response.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
				
				// use div to get the otherspicks
				
				var unsorted = new Array();
				var sorted = new Array();
				var picks = new Array();
				var table = div.getElementsByTagName("table")[1];
				var rows = table.getElementsByTagName("tr");
				var user = "";
				var lex = 0;
				var chop = 0;
				var bills = 0;
				
				for (var i=1; i<rows.length; i++) 
				{
					var h = rows[i].children[1].innerHTML;

					try
					{
						user = rows[i].children[0].innerHTML.split('user_id=')[1].split('\">')[0];					
						user = parseInt(user);
					}
					catch (e)
					{
						console.log(e, user,"",rows[i].children[1].innerHTML);
					}
					
					var team1 = h.match( /team_id=(\d+).*team_id=(\d+)/ )[1];  // team1 number
					
					if (user == 337344) // chopper49
						chop = team1;
					if (user == 37658) // buffallobills_tw
						lex = team1;
					if (user  == 368518) // lexden
						bills = team1;		
						
					if(picks[team1] == null)
					{
						//first occurance of team1 winning
						picks[team1] = [team1, 0];
					}
					// set picks to the team1 and picks # +1
					picks[team1] = [team1, picks[team1][1]+1];
				}
				
				var y = 0;
				for each (var p in picks)
				{

					if (p[1]>100)
						otherspicks[y] = [p[0],"_"+p[1]];
					else if (p[1]>10)				
						otherspicks[y] = [p[0],"__"+p[1]];
					else
						otherspicks[y] = [p[0],"___"+p[1]];	
					y++;
				}
				
				otherspicks[y] = [chop, lex, bills];

			
			// Determine which type of layout
			if (g_quickprepick)
				UpdateTheDropDownsQuick(results, otherspicks, lgID, weekID);				
			else if (scorebased)
				UpdateTheDropDownsMain(results, otherspicks, lgID, weekID);
			else
				UpdateTheDropDownsEarly(results, otherspicks, lgID, weekID);

			}
		});
}			


//////////////////////////////
//
//  UpdateTheDropDownsEarly
//
//////////////////////////////


function UpdateTheDropDownsEarly(results, otherspicks, lgID, weekID)
{
	document.getElementById('rankingInput'+lgID).innerHTML = "<p>Generating Scores <span id='working"+lgID+"'>.</span></p>";

	var location = document.getElementById('newDocumentTemp'+lgID).parentNode.nextSibling; 
	
	var select = location.getElementsByTagName("select");

	try
	{

		var difflist = new Array();
		var difflist2 = new Array();
		difflist = [[0,0],[0,0],[0,0],[0,0],[0,0]];
		
		var max_i = 0;
		var second_i = 0;
		var third_i = 0;
		var max_diff = 0;
		var second_diff = 0;
		var third_diff =0;
		var sel;
		var selected;
		var PRESELECTED = false;
		
		for (var s=0; s<select.length; s++) 
		{
			// found our select-really there should only be one
			if (select[s].getAttribute("name") == "my_pick") 
			{
				sel = select[s];
				selected = sel.value;

				//////////////////////////////
				// PRESELECT TIME !! //////////////////////////////
				//////////////////////////////
				
				// lgID
				// weekID
				var listofpicksbyconf = new Array();
				extractSavedPicks(listofpicksbyconf);
				var selectedvalue = "";
				
				for (var xi = 0; xi<listofpicksbyconf.length; xi++)
					if (listofpicksbyconf[xi][0] == lgID)
						selectedvalue = listofpicksbyconf[xi][1];
				
				var thepickslist = new Array();
			
				if(typeof selectedvalue != 'undefined')
				{
					var listofweeks = selectedvalue.split(',');							
					for each (var mentry in listofweeks)
					{
						var mweekwinner = mentry.split('w');
						if (mweekwinner[0] == weekID)
							thepickslist.push(mweekwinner[1])
					}
				}	
				
				

				
				
				for (var i=1; i<sel.options.length; i++) 
				{
					
					// HACK, asssuming nobody have ' over ' in their team name.			
					
					// team1 is [0] team2 is [1].
					var teams = sel.options[i].innerHTML.split(' over ');

					var team1 = '';
					var team1id = '';
					var team2 = '';
					

					//each team
					// get the array index for the two teams
					for(var f=0; f<32; f++)
					{ 

						
						if (results[f][1] == teams[0])
						{
							team1 = f;
							team1id = results[f][0];
						}
						if (results[f][1] == teams[1])
							team2 = f;
					}
					
					
					// Now use magic
					
					var expected1 = parseInt(results[team1][4]);
					var expected2 = parseInt(results[team2][4]);

					expdiff = expected1 - expected2;
					
			//				console.log(expdiff, expected1, expected2, results[team1], results[team2]);
					
					
					var jasonvalue1;
					var jasonvalue2;
					
					
					// bands of players
					var team1_playercount = parseInt(results[team1][3]);
					var team2_playercount = parseInt(results[team2][3]);
					var multiplier1 = 1;
					var multiplier2 = 1;
					// bands
					// 50 - 55   *2
					// 45 - 49   *1.90
					// 40 - 44   *1.70
					// below = player count / 40 = percentage  0 - 100  * .6 (gives you a percentage of the .6 + 1
					if(team1_playercount>50)
						multiplier1 += 1;
					else if(team1_playercount>45)
						multiplier1 += .9;
					else if(team1_playercount>40)
						multiplier1 += .7
					else
						multiplier1 += (team1_playercount/40)*.6;
						
					if(team2_playercount>50)
						multiplier2 += 1;
					else if(team2_playercount>45)
						multiplier2 += .9;
					else if(team2_playercount>40)
						multiplier2 += .7
					else
						multiplier2 += (team2_playercount/40)*.6;	
										
					var multiplier1_1 = multiplier1+(.001*parseInt(results[team1][6]));
					var multiplier2_2 = multiplier2+(.001*parseInt(results[team2][6]));
					
					jasonvalue1 = expected1 * multiplier1_1;
					jasonvalue2 = expected2 * multiplier2_2;

					expected1 = parseInt(jasonvalue1.toFixed());
					expected2 = parseInt(jasonvalue2.toFixed());
					expdiff = parseInt((expected1 - expected2));

					
					
				//	console.log(expected1, jasonvalue1, team1_playercount, multiplier1, multiplier1_1, parseInt(results[team1][6]));
				//	console.log(expected2, jasonvalue2, team2_playercount, multiplier2, multiplier2_2, parseInt(results[team2][6]));
					
					// value for real players
					var team1_value = parseInt(results[team1][4]) * results[team1][3];

					// pick a winner and loser
					var outcometext = 'z_LOSS ';
					if (expdiff > 0)
					{
						outcometext = 'WIN ';
						difflist2.push([expdiff, i]);
					}

					
					
					


					//find team in other picks list
					// this could be optimized.

					document.getElementById('rankingInput'+lgID).innerHTML = "<p>Updating Select <span id='working"+lgID+"'>.</span></p>";


					for(var q=0; q<otherspicks.length-1; q++)
					{ 
						// if others have picked the current team
						if(otherspicks[q][0] == results[team1][0])
							outcometext = otherspicks[q][1] + " " + outcometext;
					}

					// now change the select item
					sel.options[i].innerHTML = outcometext + expdiff + " " + teams[0] + "("+results[team1][5]+") " + "("+results[team1][3]+"*"+ results[team1][6] +"%) " +expected1 +"("+parseInt(results[team1][4]) +") - " + expected2 +"("+parseInt(results[team2][4]) +")" + "("+results[team2][5]+") "  + "("+results[team2][3]+"*"+ results[team2][6] +"%) "+ teams[1];

					
					
					// if thepicklist has an entry, then we've preselected a pick for this week.
// SET saved values
					if (thepickslist.length !=0 && team1id == thepickslist[0])
					{
						console.log("setpick switch to ", team1, thepickslist.toSource(), team1id, sel.options[i].value);
						// Take the first one only.
						sel.selectedIndex = i;
						selected =  sel.options[i].value;
						PRESELECTED = true;
					}			
					
				}
				
				
				// set selected now.
				// only set it if it is 0
				if(!PRESELECTED && (selected == 0 || forceselect)) // means not selected yet
				{
					difflist2.sort(sortByDiff);
				//	console.log(difflist2.toSource());

					var my_index =0;
					
					if(difflist2.length > 0)
					{
						// there is something is our list.
						// lets shoot for the targeted depth and take the next closest if that depth is not possible.
											
						
						if(g_targetdepth-1 < difflist2.length)
						{
							// means we have at least g_targetdepth elements in our list
							// so grab g_targetdepth
							
							my_index = g_targetdepth-1;
																	
						}
						else
						{
							// otherwise grab the last element in the list
							// this of course is risky
							
							my_index = difflist2.length-1;
						
						}
				

						// now satisfy the threshold
						if(difflist2[my_index][0] < g_threshold)
						{
							var  p = my_index;
							while (p>0 && difflist2[p][0] < g_threshold)
							{
								p--;
							}
							// either p = 0 or p is something greater, either way, setR up.
							
							
							my_index = p;
					
						}

				
					//		console.log(my_index);							
						sel.selectedIndex = difflist2[my_index][1];
						selected =  sel.options[difflist2[my_index][1]].value;
					//	console.log(difflist2[my_index]);

					
					}
					else
					{
						// list is empty, means we didn't have any picks
						// so don't pick anything
					}
				
		
					//sel.options[max_i].innerHTML = "<b><font color=\"red\">"+ sel.options[max_i].innerHTML +"</font></b>" ;	

				}

			
			// alphabetize it
	
			
			for (var i=1; i<sel.options.length-1; i++) {
						for (var j=i+1; j<sel.options.length; j++) {
							var isSelected1 = (sel.options[i].innerHTML).indexOf("_") == 0;
							var isSelected2 = (sel.options[j].innerHTML).indexOf("_") == 0;	
							if (isSelected1 && isSelected2)
							{
								var firstval = (sel.options[i].innerHTML).match(/_+(\d+).*/)[1];
								var secondval = (sel.options[j].innerHTML).match(/_+(\d+).*/)[1];
								
						

								if(parseInt(firstval) < parseInt(secondval))
								{
								var temp = sel.options[i].innerHTML;
								sel.options[i].innerHTML = sel.options[j].innerHTML;
								sel.options[j].innerHTML = temp;

								var temp = sel.options[i].value;
								sel.options[i].value = sel.options[j].value;
								sel.options[j].value = temp;

				

							}
							}
							else if ((sel.options[i].innerHTML).toLowerCase() > (sel.options[j].innerHTML).toLowerCase()) 
							{
								var temp = sel.options[i].innerHTML;
								sel.options[i].innerHTML = sel.options[j].innerHTML;
								sel.options[j].innerHTML = temp;

								var temp = sel.options[i].value;
								sel.options[i].value = sel.options[j].value;
								sel.options[j].value = temp;
							}

							if (sel.options[i].value == selected) {
								sel.selectedIndex = i;
							}
						}
					}
				
				
			}
		}

		
		if(PRESELECTED)
			document.getElementById('rankingInput'+lgID).innerHTML = "<p>Done<span id='working"+lgID+"'>.PS</span></p>";
		else
			document.getElementById('rankingInput'+lgID).innerHTML = "<p>Done<span id='working"+lgID+"'>.</span></p>";
			
			
		// if auto submit is set.. submit now.
		
		if(autosubmit == true)
		{	
			console.log(autosubmit, "autosbumit");
			var btn = document.getElementById('newDocumentTemp'+lgID).parentNode.nextSibling.childNodes[2];

			var data = "league_id="+lgID+"&my_pick="+selected+"&action=Submit+Pick";
			
			var req = new XMLHttpRequest();
			req.open( "POST", "http://glb.warriorgeneral.com/game/league_survivor.pl", true );
			req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			req.setRequestHeader("Content-length", data.length);
			req.setRequestHeader("Connection", "close");	
			req.onreadystatechange = function() {
				if(req.readyState == 4 && req.status == 200) {
					btn.value = "Submitted";
				}
				else { 
					btn.value = req.status;
				}
			};
			req.send(data);

			
			
			
		}


	}
	catch (e) 
	{
		console.log(e);
	}
	
}



//////////////////////////////
//
//  UpdateTheDropDowns
//
//////////////////////////////






function UpdateTheDropDowns(output, results, leagueID, weekID)
{

	var select = document.getElementsByTagName("select");
	for (var s=0; s<select.length; s++) 
	{
		// found our select-really there should only be one
		if (select[s].getAttribute("name") == "my_pick") 
		{
			var sel = select[s];
			var selected = sel.value;
				
			// Check for a pre-selection
	/*		console.log("checking for", 'l'+leagueID +'w'+ weekID) 
			var selectedvalue = GM_getValue('l'+leagueID +'w'+ weekID);
			var thepick = 0;
			if(typeof selectedvalue != 'undefined')
			{
				thepick = selectedvalue.split("v")[0];
			}	
		*/		
			for (var i=1; i<sel.options.length; i++) 
			{
				
				// HACK, asssuming nobody have ' over ' in their team name.			

				// team1 is [0] team2 is [1].
				var teams = sel.options[i].innerHTML.split(' over ');

				var teamids = sel.options[i].value.split('_');
				
				var team1 = -1;
				var team2 = -1;
			
				
				//each team
				for(var f=0; f<32; f++)
				{ 

					if (results[f][0] == teamids[1])
						team1 = f;
					if (results[f][0] == teamids[2])
						team2 = f;
				}
				
				if (team1 == -1 || team2 == -1)
					{

						console.log("team1ID:"+team1+" team2ID:" + team2);
						console.log(results);
						continue;
					}
					
				var expected1 = results[team1][10] / results[team1][7]; 	// T1 avg PF
				expected1 *= results[team2][11] / results[team2][7]; 		// T2 avg PA
				expected1 /= Math.sqrt(results[team1][12] * results[team2][13]);		// geometric mean of T1 OppAvgPA and T2 OppAvgPF
				var expected2 = results[team2][10] / results[team2][7]; 	// T2 avg PF
				expected2 *= results[team1][11] / results[team1][7]; 		// T1 avg PA
				expected2 /= Math.sqrt(results[team2][12] * results[team1][13]);		// geometric mean of T2 OppAvgPA and T1 OppAvgPF
				
							if (expected1 > 255)
					expected1 = 255;
				if (expected2 > 255)
					expected2 = 255;

				// pick a winner and loser
				var outcometext = 'z_LOSS ';
				if (expected1 > expected2)
					outcometext = 'WIN ';
				
				//find team in other picks list
				// this could be optimized.

				for(var q=0; q<otherspicks.length-1; q++)
				{ 
					if(otherspicks[q][0] == results[team1][0])
						outcometext = otherspicks[q][1] + " " + outcometext;
				}
				
				
				// now change the select item
				
					var expectedPV1 = parseInt(results[team1][61]);
					var expectedPV2 = parseInt(results[team2][61]);

					expdiff = expectedPV1 - expectedPV2;
					if (expdiff >50)
						expdiff = "<b><font color=\"green\">(" + expdiff + ")</font></b>" ;
					else if (expdiff <-50)
						expdiff = "<b><font color=\"red\">(" + expdiff + ")</font></b>" ;					
				
		
					var temprank1 = parseInt(results[team1][26]);
					
					if (temprank1 < 7)
						temprank1 = "<b><font color=\"blue\">(" + temprank1 + ")</font></b>" ;		
					else if (temprank1 > 24)
						temprank1 = "<b><font color=\"orange\">(" + temprank1 + ")</font></b>" ;						
					else
						temprank1 = "(" + temprank1 + ")" ;		
						
					var temprank2 = parseInt(results[team2][26]);
					
					if (temprank2 < 7)
						temprank2 = "<b><font color=\"blue\">(" + temprank2 + ")</font></b>" ;		
					else if (temprank2 > 24)
						temprank2 = "<b><font color=\"orange\">(" + temprank2 + ")</font></b>" ;						
					else
						temprank2 = "(" + temprank2 + ")" ;		
												
					
					var tempplayers1 = parseInt(results[team1][63]);					
					if (tempplayers1 < 30)
						tempplayers1 = "<b><font color=\"orange\">" + tempplayers1 + "</font></b>" ;		
					else if (tempplayers1 > 50)
						tempplayers1 = "<b><font color=\"blue\">" + tempplayers1 + "</font></b>" ;						
					
					var tempplayers2 = parseInt(results[team2][63]);					
					if (tempplayers2 < 30)
						tempplayers2 = "<b><font color=\"orange\">" + tempplayers2 + "</font></b>" ;		
					else if (tempplayers2 > 50)
						tempplayers2 = "<b><font color=\"blue\">"+ tempplayers2 + "</font></b>" ;						
					
					
								

					
					
				
					sel.options[i].innerHTML = outcometext + teams[0] +temprank1;

					if (expected1 > expected2+30)
						sel.options[i].innerHTML += "<b><font color=\"purple\">"+ expected1.toFixed() +" - " + expected2.toFixed()+"</b></font>";
					else	
						sel.options[i].innerHTML += expected1.toFixed() +" - " + expected2.toFixed();
						
					sel.options[i].innerHTML += temprank2 + teams[1] + " -- [" +   expdiff + "]  [" +      "("+results[team1][62]+") " + "("+tempplayers1+"*"+ results[team1][60] +"%) " +expectedPV1 +" - " + expectedPV2 + "("+results[team2][62]+") "  + "("+tempplayers2+"*"+ results[team2][60] +"%) "       + "]";
//					sel.options[i].innerHTML = outcometext + expdiff + " " + teams[0] + "("+results[team1][62]+") " + "("+results[team1][60]+"*"+ results[team1][63] +"%) " +expected1 +" - " + expected2 + "("+results[team2][62]+") "  + "("+results[team2][60]+"*"+ results[team2][63] +"%) "+ teams[1];		


			}

						// alphabetize it
	
			
			for (var i=1; i<sel.options.length-1; i++) {
						for (var j=i+1; j<sel.options.length; j++) {
							var isSelected1 = (sel.options[i].innerHTML).indexOf("_") == 0;
							var isSelected2 = (sel.options[j].innerHTML).indexOf("_") == 0;	
							if (isSelected1 && isSelected2)
							{
								var firstval = (sel.options[i].innerHTML).match(/_+(\d+).*/)[1];
								var secondval = (sel.options[j].innerHTML).match(/_+(\d+).*/)[1];
								
						

								if(parseInt(firstval) < parseInt(secondval))
								{
								var temp = sel.options[i].innerHTML;
								sel.options[i].innerHTML = sel.options[j].innerHTML;
								sel.options[j].innerHTML = temp;

								var temp = sel.options[i].value;
								sel.options[i].value = sel.options[j].value;
								sel.options[j].value = temp;

				

							}
							}
							else if ((sel.options[i].innerHTML).toLowerCase() > (sel.options[j].innerHTML).toLowerCase()) 
							{
								var temp = sel.options[i].innerHTML;
								sel.options[i].innerHTML = sel.options[j].innerHTML;
								sel.options[j].innerHTML = temp;

								var temp = sel.options[i].value;
								sel.options[i].value = sel.options[j].value;
								sel.options[j].value = temp;
							}

							if (sel.options[i].value == selected) {
								sel.selectedIndex = i;
							}
						}
					}


		
		}
	}


}



//////////////////////////////
//
//  UpdateTheDropDownsMain
//
//////////////////////////////

function UpdateTheDropDownsMain(results, otherspicks, lgID, weekID)
{
	console.log("UpdatethedropdownsMain", lgID, weekID, results);

	document.getElementById('rankingInput'+lgID).innerHTML = "<p>Generating Scores <span id='working"+lgID+"'>.</span></p>";

	var location = document.getElementById('newDocumentTemp'+lgID).parentNode.nextSibling; 
	
	var select = location.getElementsByTagName("select");

	try
	{

		var difflist = new Array();
		var difflist2 = new Array();
		difflist = [[0,0],[0,0],[0,0],[0,0],[0,0]];
		
		var max_i = 0;
		var second_i = 0;
		var third_i = 0;
		var max_diff = 0;
		var second_diff = 0;
		var third_diff =0;
		var sel;
		var selected;
		var PRESELECTED = false;
		
		for (var s=0; s<select.length; s++) 
		{
			// found our select-really there should only be one
			if (select[s].getAttribute("name") == "my_pick") 
			{
				sel = select[s];
				selected = sel.value;

				//////////////////////////////
				// PRESELECT TIME !! //////////////////////////////
				//////////////////////////////
				
				// lgID
				// weekID
				var listofpicksbyconf = new Array();
				extractSavedPicks(listofpicksbyconf);
				var selectedvalue = "";
				
				for (var xi = 0; xi<listofpicksbyconf.length; xi++)
					if (listofpicksbyconf[xi][0] == lgID)
						selectedvalue = listofpicksbyconf[xi][1];
				
				var thepickslist = new Array();
			
				if(typeof selectedvalue != 'undefined')
				{
					var listofweeks = selectedvalue.split(',');							
					for each (var mentry in listofweeks)
					{
						var mweekwinner = mentry.split('w');
						if (mweekwinner[0] == weekID)
							thepickslist.push(mweekwinner[1])
					}
				}	
				
				

				
				
				for (var i=1; i<sel.options.length; i++) 
				{
					
					// HACK, asssuming nobody have ' over ' in their team name.			
					
					// team1 is [0] team2 is [1].
					var teams = sel.options[i].innerHTML.split(' over ');

					var team1 = '';
					var team1id = '';
					var team2 = '';
					

					//each team
					// get the array index for the two teams
					for(var f=0; f<32; f++)
					{ 

						
						if (results[f][1] == teams[0])
						{
							team1 = f;
							team1id = results[f][0];
						}
						if (results[f][1] == teams[1])
							team2 = f;
					}
					
					var expected1 = results[team1][10] / results[team1][7]; 	// T1 avg PF
					expected1 *= results[team2][11] / results[team2][7]; 		// T2 avg PA
					expected1 /= Math.sqrt(results[team1][12] * results[team2][13]);		// geometric mean of T1 OppAvgPA and T2 OppAvgPF
					var expected2 = results[team2][10] / results[team2][7]; 	// T2 avg PF
					expected2 *= results[team1][11] / results[team1][7]; 		// T1 avg PA
					expected2 /= Math.sqrt(results[team2][12] * results[team1][13]);		// geometric mean of T2 OppAvgPA and T1 OppAvgPF
					
					if (expected1 > 255)
						expected1 = 255;
					if (expected2 > 255)
						expected2 = 255;

					expdiff = parseInt((expected1 - expected2));
						
					// pick a winner and loser
					var outcometext = 'z_LOSS ';
					if (expdiff > 0)
					{
						outcometext = 'WIN ';
						difflist2.push([expdiff, i]);
					}
			


					//find team in other picks list
					// this could be optimized.

					document.getElementById('rankingInput'+lgID).innerHTML = "<p>Updating Select <span id='working"+lgID+"'>.</span></p>";


					for(var q=0; q<otherspicks.length-1; q++)
					{ 
						// if others have picked the current team
						if(otherspicks[q][0] == results[team1][0])
							outcometext = otherspicks[q][1] + " " + outcometext;
					}

					// now change the select item
					var expectedPV1 = parseInt(results[team1][61]);
					var expectedPV2 = parseInt(results[team2][61]);

					expdiff = expectedPV1 - expectedPV2;
					if (expdiff >50)
						expdiff = "<b><font color=\"green\">(" + expdiff + ")</font></b>" ;
					else if (expdiff <-50)
						expdiff = "<b><font color=\"red\">(" + expdiff + ")</font></b>" ;					
				
		
					var temprank1 = parseInt(results[team1][26]);
					
					if (temprank1 < 7)
						temprank1 = "<b><font color=\"blue\">(" + temprank1 + ")</font></b>" ;		
					else if (temprank1 > 24)
						temprank1 = "<b><font color=\"orange\">(" + temprank1 + ")</font></b>" ;						
					else
						temprank1 = "(" + temprank1 + ")" ;		
						
					var temprank2 = parseInt(results[team2][26]);
					
					if (temprank2 < 7)
						temprank2 = "<b><font color=\"blue\">(" + temprank2 + ")</font></b>" ;		
					else if (temprank2 > 24)
						temprank2 = "<b><font color=\"orange\">(" + temprank2 + ")</font></b>" ;						
					else
						temprank2 = "(" + temprank2 + ")" ;		
												
					
					var tempplayers1 = parseInt(results[team1][63]);					
					if (tempplayers1 < 30)
						tempplayers1 = "<b><font color=\"orange\">" + tempplayers1 + "</font></b>" ;		
					else if (tempplayers1 > 50)
						tempplayers1 = "<b><font color=\"blue\">" + tempplayers1 + "</font></b>" ;						
					
					var tempplayers2 = parseInt(results[team2][63]);					
					if (tempplayers2 < 30)
						tempplayers2 = "<b><font color=\"orange\">" + tempplayers2 + "</font></b>" ;		
					else if (tempplayers2 > 50)
						tempplayers2 = "<b><font color=\"blue\">"+ tempplayers2 + "</font></b>" ;						
					
					
								

					console.log("team1 1607", results[team1].toSource());
					console.log("team2 1608", results[team2].toSource());


					
				
					sel.options[i].innerHTML = outcometext + teams[0] +temprank1;

					if (expected1 > expected2+30)
						sel.options[i].innerHTML += "<b><font color=\"purple\">"+ expected1.toFixed() +" - " + expected2.toFixed()+"</b></font>";
					else	
						sel.options[i].innerHTML += expected1.toFixed() +" - " + expected2.toFixed();
						
					sel.options[i].innerHTML += temprank2 + teams[1] + " -- [" +   expdiff + "]  [" +      "("+results[team1][62]+") " + "("+tempplayers1+"*"+ results[team1][60] +"%) " +expectedPV1 +" - " + expectedPV2 + "("+results[team2][62]+") "  + "("+tempplayers2+"*"+ results[team2][60] +"%) "       + "]";
	
					
					
					
//					sel.options[i].innerHTML = outcometext + expdiff + " " + teams[0] + "("+results[team1][5]+") " + "("+results[team1][3]+"*"+ results[team1][6] +"%) " +expected1 +"("+parseInt(results[team1][4]) +") - " + expected2 +"("+parseInt(results[team2][4]) +")" + "("+results[team2][5]+") "  + "("+results[team2][3]+"*"+ results[team2][6] +"%) "+ teams[1];

					
					
					// if thepicklist has an entry, then we've preselected a pick for this week.
// SET saved values
					if (thepickslist.length !=0 && team1id == thepickslist[0])
					{
						console.log("setpick switch to ", team1, thepickslist.toSource(), team1id, sel.options[i].value);
						// Take the first one only.
						sel.selectedIndex = i;
						selected =  sel.options[i].value;
						PRESELECTED = true;
					}			
					
				}
				
				
				// set selected now.
				// only set it if it is 0
				if(!PRESELECTED && (selected == 0 || forceselect)) // means not selected yet
				{
					difflist2.sort(sortByDiff);
				//	console.log(difflist2.toSource());

					var my_index =0;
					
					if(difflist2.length > 0)
					{
						// there is something is our list.
						// lets shoot for the targeted depth and take the next closest if that depth is not possible.
											
						
						if(g_targetdepth-1 < difflist2.length)
						{
							// means we have at least g_targetdepth elements in our list
							// so grab g_targetdepth
							
							my_index = g_targetdepth-1;
																	
						}
						else
						{
							// otherwise grab the last element in the list
							// this of course is risky
							
							my_index = difflist2.length-1;
						
						}
				

						// now satisfy the threshold
						if(difflist2[my_index][0] < g_threshold)
						{
							var  p = my_index;
							while (p>0 && difflist2[p][0] < g_threshold)
							{
								p--;
							}
							// either p = 0 or p is something greater, either way, setR up.
							
							
							my_index = p;
					
						}

				
					//		console.log(my_index);							
						sel.selectedIndex = difflist2[my_index][1];
						selected =  sel.options[difflist2[my_index][1]].value;
					//	console.log(difflist2[my_index]);

					
					}
					else
					{
						// list is empty, means we didn't have any picks
						// so don't pick anything
					}
				
		
					//sel.options[max_i].innerHTML = "<b><font color=\"red\">"+ sel.options[max_i].innerHTML +"</font></b>" ;	

				}

				
										// alphabetize it
	
			
			for (var i=1; i<sel.options.length-1; i++) {
						for (var j=i+1; j<sel.options.length; j++) {
							var isSelected1 = (sel.options[i].innerHTML).indexOf("_") == 0;
							var isSelected2 = (sel.options[j].innerHTML).indexOf("_") == 0;	
							if (isSelected1 && isSelected2)
							{
								var firstval = (sel.options[i].innerHTML).match(/_+(\d+).*/)[1];
								var secondval = (sel.options[j].innerHTML).match(/_+(\d+).*/)[1];
								
						

								if(parseInt(firstval) < parseInt(secondval))
								{
								var temp = sel.options[i].innerHTML;
								sel.options[i].innerHTML = sel.options[j].innerHTML;
								sel.options[j].innerHTML = temp;

								var temp = sel.options[i].value;
								sel.options[i].value = sel.options[j].value;
								sel.options[j].value = temp;

				

							}
							}
							else if ((sel.options[i].innerHTML).toLowerCase() > (sel.options[j].innerHTML).toLowerCase()) 
							{
								var temp = sel.options[i].innerHTML;
								sel.options[i].innerHTML = sel.options[j].innerHTML;
								sel.options[j].innerHTML = temp;

								var temp = sel.options[i].value;
								sel.options[i].value = sel.options[j].value;
								sel.options[j].value = temp;
							}

							if (sel.options[i].value == selected) {
								sel.selectedIndex = i;
							}
						}
					}
					

			}
		}

		if(PRESELECTED)
			document.getElementById('rankingInput'+lgID).innerHTML = "<p>Done<span id='working"+lgID+"'>.PS</span></p>";
		else
			document.getElementById('rankingInput'+lgID).innerHTML = "<p>Done<span id='working"+lgID+"'>.</span></p>";
			
		
		// if auto submit is set.. submit now.
		
		console.log(autosubmit, "autosumbit pre");
		
		if(autosubmit == true)
		{	
					console.log(autosubmit, "autosbumit");
			var btn = document.getElementById('newDocumentTemp'+lgID).parentNode.nextSibling.childNodes[2];

			var data = "league_id="+lgID+"&my_pick="+selected+"&action=Submit+Pick";
			
			var req = new XMLHttpRequest();
			req.open( "POST", "http://glb.warriorgeneral.com/game/league_survivor.pl", true );
			req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			req.setRequestHeader("Content-length", data.length);
			req.setRequestHeader("Connection", "close");	
			req.onreadystatechange = function() {
				if(req.readyState == 4 && req.status == 200) {
					btn.value = "Submitted";
				}
				else { 
					btn.value = req.status;
				}
			};
			req.send(data);

			
			
			
		}
		
		
		
		
		
		


	}
	catch (e) 
	{
		console.log(e);
	}
	
}



//////////////////////////////
//
//  UpdateTheDropDownsQuick
//
//////////////////////////////

function UpdateTheDropDownsQuick(results, otherspicks, lgID, weekID)
{
//	console.log("UpdatethedropdownsQuick", lgID, weekID, results);

	document.getElementById('rankingInput'+lgID).innerHTML = "<p>Generating Scores <span id='working"+lgID+"'>.</span></p>";

	var location = document.getElementById('newDocumentTemp'+lgID).parentNode.nextSibling; 
	
	var select = location.getElementsByTagName("select");

	try
	{
		var sel;
		var selected;
		var PRESELECTED = false;
		
		for (var s=0; s<select.length; s++) 
		{
			// found our select-really there should only be one
			if (select[s].getAttribute("name") == "my_pick") 
			{
				sel = select[s];
				selected = sel.value;

				//////////////////////////////
				// PRESELECT TIME !! //////////////////////////////
				//////////////////////////////
				
				// lgID
				// weekID
				var listofpicksbyconf = new Array();
				extractSavedPicks(listofpicksbyconf);
				var selectedvalue = "";
				
				for (var xi = 0; xi<listofpicksbyconf.length; xi++)
					if (listofpicksbyconf[xi][0] == lgID)
						selectedvalue = listofpicksbyconf[xi][1];
				
				var thepickslist = new Array();
			
				if(typeof selectedvalue != 'undefined')
				{
					var listofweeks = selectedvalue.split(',');							
					for each (var mentry in listofweeks)
					{
						var mweekwinner = mentry.split('w');
						if (mweekwinner[0] == weekID)
							thepickslist.push(mweekwinner[1])
					}
				}	
				
				

				
				
				for (var i=1; i<sel.options.length; i++) 
				{
					
					// HACK, asssuming nobody have ' over ' in their team name.			
					
					// team1 is [0] team2 is [1].
					var teams = sel.options[i].innerHTML.split(' over ');

					var team1 = '';
					var team1id = '';
					var team2 = '';
					

					//each team
					// get the array index for the two teams
					for(var f=0; f<32; f++)
					{ 						
						if (results[f][1] == teams[0])
						{
							team1 = f;
							team1id = results[f][0];
						}
						if (results[f][1] == teams[1])
							team2 = f;
					}
					
					document.getElementById('rankingInput'+lgID).innerHTML = "<p>Updating Select <span id='working"+lgID+"'>.</span></p>";

					if (thepickslist.length !=0 && team1id == thepickslist[0])
					{
						console.log("setpick switch to ", team1, thepickslist.toSource(), team1id, sel.options[i].value);
						// Take the first one only.
						sel.selectedIndex = i;
						selected =  sel.options[i].value;
						PRESELECTED = true;
					}
					
					
					var outcometext = '';
					var outcometextEND = '';
					for(var q=0; q<otherspicks.length-1; q++)
					{ 
					
						try
						{	
							// if others have picked the current team
							if(otherspicks[q][0] == results[team1][0])
							{
								outcometext = otherspicks[q][1] + " " + outcometext;
								
								if(otherspicks[otherspicks.length-1][0] == results[team1][0])
									outcometextEND = outcometextEND + "<-Chop";
								if(otherspicks[otherspicks.length-1][1] == results[team1][0])
									outcometextEND = outcometextEND + "<-Lex";
								if(otherspicks[otherspicks.length-1][2] == results[team1][0])
									outcometextEND = outcometextEND + "<-Bills";
									
							}
						}
						catch (e) 
						{
							console.log(e, team1, q, teams, results);
						}
						
					}

					// now change the select item
					sel.options[i].innerHTML = outcometext + sel.options[i].innerHTML + outcometextEND;
					
					
				}
			}
			
			
							// alphabetize it
				for (var i=1; i<sel.options.length-1; i++) 
				{
					for (var j=i+1; j<sel.options.length; j++) 
					{
						var isSelected1 = (sel.options[i].innerHTML).indexOf("_") == 0;
						var isSelected2 = (sel.options[j].innerHTML).indexOf("_") == 0;	
						if (isSelected1 && isSelected2)
						{
							var firstval = (sel.options[i].innerHTML).match(/_+(\d+).*/)[1];
							var secondval = (sel.options[j].innerHTML).match(/_+(\d+).*/)[1];
							
					

							if(parseInt(firstval) < parseInt(secondval))
							{
								var temp = sel.options[i].innerHTML;
								sel.options[i].innerHTML = sel.options[j].innerHTML;
								sel.options[j].innerHTML = temp;

								var temp = sel.options[i].value;
								sel.options[i].value = sel.options[j].value;
								sel.options[j].value = temp;



							}
						}
						else if(((sel.options[i].innerHTML).substring(0,3) == "WIN") && ((sel.options[j].innerHTML).substring(0,3) == "WIN"))
						{
							// Both wins, so sort
							var firstval = (sel.options[i].innerHTML).match(/WIN (\d+).*/)[1];
							var secondval = (sel.options[j].innerHTML).match(/WIN (\d+).*/)[1];
							
					

							if(parseInt(firstval) < parseInt(secondval))
							{
								var temp = sel.options[i].innerHTML;
								sel.options[i].innerHTML = sel.options[j].innerHTML;
								sel.options[j].innerHTML = temp;

								var temp = sel.options[i].value;
								sel.options[i].value = sel.options[j].value;
								sel.options[j].value = temp;



							}
						
							
							
						}
						else if ((sel.options[i].innerHTML).toLowerCase() > (sel.options[j].innerHTML).toLowerCase()) 
						{
						
							// else alphabetical
								
							var temp = sel.options[i].innerHTML;
							sel.options[i].innerHTML = sel.options[j].innerHTML;
							sel.options[j].innerHTML = temp;

							var temp = sel.options[i].value;
							sel.options[i].value = sel.options[j].value;
							sel.options[j].value = temp;
						}

						if (sel.options[i].value == selected) {
							sel.selectedIndex = i;
						}

					}
				}
			
			
		}

		if(PRESELECTED)
			document.getElementById('rankingInput'+lgID).innerHTML = "<p>Done<span id='working"+lgID+"'>.PS</span></p>";
		else
			document.getElementById('rankingInput'+lgID).innerHTML = "<p>Done<span id='working"+lgID+"'>.</span></p>";
		
		// if auto submit is set.. submit now.
		
		if(autosubmit == true)
		{	
					console.log(autosubmit, "autosbumit");
			var btn = document.getElementById('newDocumentTemp'+lgID).parentNode.nextSibling.childNodes[2];

			var data = "league_id="+lgID+"&my_pick="+selected+"&action=Submit+Pick";
			
			var req = new XMLHttpRequest();
			req.open( "POST", "http://glb.warriorgeneral.com/game/league_survivor.pl", true );
			req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			req.setRequestHeader("Content-length", data.length);
			req.setRequestHeader("Connection", "close");	
			req.onreadystatechange = function() {
				if(req.readyState == 4 && req.status == 200) {
					btn.value = "Submitted";
				}
				else { 
					btn.value = req.status;
				}
			};
			req.send(data);

			
			
			
		}


	}
	catch (e) 
	{
		console.log(e);
	}
	
}

function sortByDiff (zB, zA)
{
	if (zA[0]  <  zB[0])
		return -1;
	else if (zA[0]  >  zB[0])
		return 1;
	else
		return 0;
}


function updateProgress(lgID){
	// updateIcon();
	working = document.getElementById('working'+lgID);

	switch(working.innerHTML){
		case '*1111': working.innerHTML = '1*111'; break;
		case '1*111': working.innerHTML = '11*11'; break;
		case '11*11': working.innerHTML = '111*1'; break;
		case '111*1': working.innerHTML = '1111*'; break;
		case '1111*': working.innerHTML = '*1111'; break;
		default : working.innerHTML = '*1111'; break;		
	}
	
	
	var progress = document.getElementsByClassName('completed'+lgID);

	var denom = 224;
	var denomscore = 2656; // TBD
	var denomquick = 128; // TBD
	
	if (g_quickprepick)
	{
		document.getElementById('progress'+lgID).innerHTML = 'Getting Rankings: ' + parseInt((progress.length/denomscore)*100) + '%';
		
		if(progress.length == denomquick)
		{ 	
			calculateResults3(lgID);
		}
		
	}
	else if (scorebased)
	{
		document.getElementById('progress'+lgID).innerHTML = 'Getting Rankings: ' + parseInt((progress.length/denomscore)*100) + '%';

		if(progress.length == denomscore)
		{ 	
			calculateResults2(lgID);
		}
	}
	else
	{
		// 32 for every field
		document.getElementById('progress'+lgID).innerHTML = 'Getting Rankings: ' + parseInt((progress.length/denom)*100) + '%';
		if(progress.length == denom)
		{
			calculateResults(lgID);  // call when done pulling the data.
		}

	}
}



function getTeamPage(teamId, lgID){
	GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://glb.warriorgeneral.com/game/team.pl?team_id=' + teamId,
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response)
			{
			
				
				var chemistry = response.responseText.split("Team Chemistry")[1];
				chemistry = parseInt(chemistry.split("rating_bar_fill rating_bar_fill")[1].split("<\/div")[0].split("\">")[1]);

				
				//write the gameCount to the table
				document.getElementById(teamId).getElementsByTagName('td')[5].innerHTML = chemistry;
				document.getElementById(teamId).getElementsByTagName('td')[5].setAttribute('class', 'completed'+lgID);
				updateProgress(lgID);
			}
	});
}




function getTeamEffLVLPage(teamId, lgID){
	GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://glb.warriorgeneral.com/game/roster.pl?team_id=' + teamId,
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response)
			{
				try
				{
					var tempdiv = document.createElement("div");
					tempdiv.innerHTML = response.responseText.split('<div id="content_contracts')[0].replace(/<img/g,"<div").replace(/\/img/g,"/div>");
		
					var numPlayers = tempdiv.getElementsByClassName("player_name").length;
					var cpuPlayers = tempdiv.getElementsByClassName("cpu").length;
					numPlayers -= cpuPlayers;
				
					tempdiv.innerHTML = "";

					var efflvl = 0;
					var avgval = 0;
					var playercount = 0;
					
					efflvl = response.responseText.split("Avg Player Value")[1];
					avgval = parseInt(efflvl.split("(Effective Lv")[0].split("\">")[1]);

					efflvl = parseInt(efflvl.split("(Effective Lv ")[1].split(")<")[0]);

					playercount = response.responseText.split("Total Player Count")[1];
					playercount = parseInt(playercount.split("(Avg Lv")[0].split("\">")[1]);
				
				}
				catch (e) 
				{
					console.log( response.responseText, e, teamId);
					// kludge for S30 team issues.
					efflvl = 0;
					avgval = 0;
					playercount = 0;
					
				}	
				
						
//				document.getElementById(teamId).getElementsByTagName('td')[2].innerHTML = playercount;
//				document.getElementById(teamId).getElementsByTagName('td')[2].setAttribute('class', 'completed'+lgID);				
				
				
				document.getElementById(teamId).getElementsByTagName('td')[3].innerHTML = avgval;
				document.getElementById(teamId).getElementsByTagName('td')[3].setAttribute('class', 'completed'+lgID);
				
				document.getElementById(teamId).getElementsByTagName('td')[4].innerHTML = efflvl;
				document.getElementById(teamId).getElementsByTagName('td')[4].setAttribute('class', 'completed'+lgID);
				
				document.getElementById(teamId).getElementsByTagName('td')[2].innerHTML = numPlayers;
				document.getElementById(teamId).getElementsByTagName('td')[2].setAttribute('class', 'completed'+lgID);
				
				document.getElementById(teamId).getElementsByTagName('td')[6].innerHTML = cpuPlayers;
				document.getElementById(teamId).getElementsByTagName('td')[6].setAttribute('class', 'completed'+lgID);
				
				
				updateProgress(lgID);
			}
	});
}


function gatherData2(address, lgID, page, data) {

	//console.log("gatherData:" + 'newDocumentTemp'+lgID);

 	document.getElementById('newDocumentTemp'+lgID).innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
	

	//clear the rankingInput and give the user progress feedback
	document.getElementById('rankingInput'+lgID).innerHTML = '<span id="progress'+lgID+'">Getting Rankings: 0%</span><span id="working'+lgID+'">.</span>';	
	
	//build a table in rankingData
	location = document.getElementById('rankingData'+lgID);
	
	var table = document.createElement('table');

	// !!! THiS will be a problem for mass tabling.

	table.setAttribute('id', 'rankingDataTable'+lgID);
	location.appendChild(table);
	
	location = document.getElementById('rankingDataTable'+lgID);

	for(var i=0; i<32; i++){
		tr = document.createElement('tr');
		tr.style.borderStyle="solid";
		location.appendChild(tr);
		tr = location.getElementsByTagName('tr')[i];		
		for(var j=0; j<85; j++){
			var td = document.createElement('td');
			td.innerHTML = '';
			tr.appendChild(td);
		}
	}

		location = document.getElementById('newDocumentTemp'+lgID).getElementsByClassName('conference')[0];
	
	
	
// Get the teams here				

	//----------fill the table with data	
	var teamId = new Array();	
	var j=0;
	//fill in the team name column and set the row id to the team id	
	for (var i=1; i<17; i++){

// !!! Need to modify to make global
// Pull this from the league page...
// Make sure document is the league page and we're golden.


		var teamPage = location.getElementsByTagName('tr')[i].childNodes[3].firstChild.href.split('=', 2);
	
		if (teamPage[0] == "http://glb.warriorgeneral.com/game/league.pl?league_id") { // WORLD LEAGUE
			teamPage = location.getElementsByTagName('tr')[i].childNodes[5].firstChild.href.split('=', 2);
			var teamName = location.getElementsByTagName('tr')[i].childNodes[5].firstChild.innerHTML;
		} else {
			var teamName = location.getElementsByTagName('tr')[i].childNodes[3].firstChild.innerHTML;
		}
		teamId[j] = teamPage[1];

		document.getElementById('rankingDataTable'+lgID).getElementsByTagName('tr')[j].id = teamId[j];
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].innerHTML = teamName;
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].setAttribute('class', 'completed'+lgID);

		j++;		

		updateProgress(lgID);
	}	
	
	
	
	// go to the second conference list
	location = document.getElementById('newDocumentTemp'+lgID).getElementsByClassName('conference')[1];
	
	
		for (var i=1; i<17; i++){

// !!! Need to modify to make global
// Pull this from the league page...
// Make sure document is the league page and we're golden.


		var teamPage = location.getElementsByTagName('tr')[i].childNodes[3].firstChild.href.split('=', 2);
	
		if (teamPage[0] == "http://glb.warriorgeneral.com/game/league.pl?league_id") { // WORLD LEAGUE
			teamPage = location.getElementsByTagName('tr')[i].childNodes[5].firstChild.href.split('=', 2);
			var teamName = location.getElementsByTagName('tr')[i].childNodes[5].firstChild.innerHTML;
		} else {
			var teamName = location.getElementsByTagName('tr')[i].childNodes[3].firstChild.innerHTML;
		}
		teamId[j] = teamPage[1];

		document.getElementById('rankingDataTable'+lgID).getElementsByTagName('tr')[j].id = teamId[j];
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].innerHTML = teamName;
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].setAttribute('class', 'completed'+lgID);

		j++;		

		updateProgress(lgID);
	}	
	


	for(var i=0; i<32; i++)
	{
			document.getElementById(teamId[i]).getElementsByTagName('td')[1].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[1].setAttribute('class', 'completed'+lgID);
			updateProgress(lgID);	
			document.getElementById(teamId[i]).getElementsByTagName('td')[2].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[2].setAttribute('class', 'completed'+lgID);
			document.getElementById(teamId[i]).getElementsByTagName('td')[3].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[3].setAttribute('class', 'completed'+lgID);
			updateProgress(lgID);
		
	}

	//figure out how many regular season games we need to look at


		
	for(var i=0; i<32; i++){
		getTeamPageScore(teamId[i], lgID);
		getTeamEffLVLPageScore(teamId[i], lgID);
	}		

	// remove the newDocumentTemp  to save memory space
 	document.getElementById('newDocumentTemp'+lgID).innerHTML = "";
	
	
}




function getTeamPageScore(teamId, lgID)
{
	GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://glb.warriorgeneral.com/game/team.pl?team_id=' + teamId,
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response){
				document.getElementById('rankingTemp'+lgID).innerHTML = response.responseText;
				location = document.getElementById('rankingTemp'+lgID);				
				var scheduleContent = location.getElementsByClassName('schedule_content');
				var gameCount=0;

				document.getElementById(teamId).getElementsByTagName('td')[4].innerHTML = '';
				document.getElementById(teamId).getElementsByTagName('td')[4].setAttribute('class', 'completed'+lgID);
				
				
				var chemistry = response.responseText.split("Team Chemistry")[1];
				chemistry = parseInt(chemistry.split("rating_bar_fill rating_bar_fill")[1].split("<\/div")[0].split("\">")[1]);

			
			
				document.getElementById(teamId).getElementsByTagName('td')[80].innerHTML = chemistry;
				document.getElementById(teamId).getElementsByTagName('td')[80].setAttribute('class', 'completed'+lgID);
				updateProgress(lgID);
			
				
				//get pre-season games if needed	


// change i=0 to i=2 to allow for new data
// add clear for 11
		
	for(var q=6; q<18; q++)
	{
		document.getElementById(teamId).getElementsByTagName('td')[q].innerHTML = '';
		document.getElementById(teamId).getElementsByTagName('td')[q].setAttribute('class', 'completed'+lgID);
	}	
	updateProgress(lgID);
				
								// [6] [7] [8] preseason game 1
				// [9] [10] [11] preseason game 2
				// [12] [13] [14] preseason game 3
				// [15] [16] [17] preseason game 4
				
				// Hijack [6] - [17] for other data
				// [6] chemistry
				// [7] AVG Value (for those players)
				// [8] Effective Lvl (for the team)
				// [9] Player Count (non CPU)
				// [10] cpu players
	
				
				// onward is reg season
				// [18] oppID, [19] team1score, [20] team2score
				// ... [63] , [64], [65]
				// [66] ... [80] playoff data
				
				
				
				//load regular season data << this is the default
				var section = 0; //this tells me which section to look				
				if(1){			
					gameCount=4;					
					for (var i=0; i<16; i++){
						var j = 2 + 2*i;
						var k = 18 + 3*i;
						var location = scheduleContent[section].childNodes[1].childNodes[j].childNodes[5].childNodes[0];
						if (location.innerHTML != 'Matchup'){ 
							var gameId = location.href.split('game_id=', 2)[1];
						} else {
							var gameId = '';
						}
						if (gameId != ''){		
							//alert(location.parentNode.parentNode.innerHTML);
							//alert(location.parentNode.parentNode.childNodes[3].innerHTML);
							var temp = location.parentNode.parentNode.childNodes[3];
							if(temp.firstChild.tagName.toUpperCase() == 'SPAN'){
								var team2Id = temp.childNodes[1].href.split('=', 2)[1]; 
							}else{
								var team2Id = temp.firstChild.href.split('=', 2)[1]; 
							}
							var team1Score = parseInt(location.innerHTML.split(' ', 2)[1].split('-', 2)[0]);
							var team2Score = parseInt(location.innerHTML.split(' ', 2)[1].split('-', 2)[1]);
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team2Id;
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed'+lgID);
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team1Score;
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed'+lgID);
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team2Score;
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed'+lgID);
							gameCount++;
						} else {
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed'+lgID);
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed'+lgID);
							k++;
							//alert('3');
							var temp = location.parentNode.parentNode.childNodes[3];
							if(temp.firstChild.tagName.toUpperCase() == 'SPAN'){
								var team2Id = temp.childNodes[1].href.split('=', 2)[1]; 
							}else{
								var team2Id = temp.firstChild.href.split('=', 2)[1]; 
							}
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team2Id; // save this here for next matchup
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed'+lgID);
						}
					updateProgress(lgID);
					}
				} else {
					for (var i=0; i<16; i++){
						var k = 18 + 3*i;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed'+lgID);
						k++;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed'+lgID);
						k++;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed'+lgID);
						updateProgress(lgID);
					}					
				}

				// Don't need playoff data
					for (var i=0; i<4; i++){
						var k = 66 + 3*i;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed'+lgID);
						k++;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed'+lgID);

						k++;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed'+lgID);

						updateProgress(lgID);
					}
					
				

				//write the gameCount to the table
				document.getElementById(teamId).getElementsByTagName('td')[5].innerHTML = gameCount;
				document.getElementById(teamId).getElementsByTagName('td')[5].setAttribute('class', 'completed'+lgID);
				updateProgress(lgID);
				}
	});
}


function getTeamEffLVLPageScore(teamId, lgID)
{
	GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://glb.warriorgeneral.com/game/roster.pl?team_id=' + teamId,
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response)
			{
			
				try
				{
					var tempdiv = document.createElement("div");
					tempdiv.innerHTML = response.responseText.split('<div id="content_contracts')[0].replace(/<img/g,"<div").replace(/\/img/g,"/div>");
		
					var numPlayers = tempdiv.getElementsByClassName("player_name").length;
					var cpuPlayers = tempdiv.getElementsByClassName("cpu").length;
					numPlayers -= cpuPlayers;
				
					tempdiv.innerHTML = "";

					var efflvl = 0;
					var avgval = 0;
					var playercount = 0;
					
					efflvl = response.responseText.split("Avg Player Value")[1];
					avgval = parseInt(efflvl.split("(Effective Lv")[0].split("\">")[1]);

					efflvl = parseInt(efflvl.split("(Effective Lv ")[1].split(")<")[0]);

					playercount = response.responseText.split("Total Player Count")[1];
					playercount = parseInt(playercount.split("(Avg Lv")[0].split("\">")[1]);
				
				}
				catch (e) 
				{
					console.log( response.responseText, e, teamId);
					// kludge for S30 team issues.
					efflvl = 0;
					avgval = 0;
					playercount = 0;
					
				}				
					
					
					document.getElementById(teamId).getElementsByTagName('td')[81].innerHTML = avgval;
					document.getElementById(teamId).getElementsByTagName('td')[81].setAttribute('class', 'completed'+lgID);
					
					document.getElementById(teamId).getElementsByTagName('td')[82].innerHTML = efflvl;
					document.getElementById(teamId).getElementsByTagName('td')[82].setAttribute('class', 'completed'+lgID);
					
					document.getElementById(teamId).getElementsByTagName('td')[83].innerHTML = numPlayers;
					document.getElementById(teamId).getElementsByTagName('td')[83].setAttribute('class', 'completed'+lgID);
					
					document.getElementById(teamId).getElementsByTagName('td')[84].innerHTML = cpuPlayers;
					document.getElementById(teamId).getElementsByTagName('td')[84].setAttribute('class', 'completed'+lgID);
					
					
									// [6] [7] [8] preseason game 1
					// [9] [10] [11] preseason game 2
					// [12] [13] [14] preseason game 3
					// [15] [16] [17] preseason game 4
					
					// Hijack [6] - [17] for other data
					// [6] chemistry
					// [7] AVG Value (for those players)
					// [8] Effective Lvl (for the team)
					// [9] Player Count (non CPU)
					// [10] cpu players
		
					
					
					
					
					updateProgress(lgID);

			}
	});
}




function calculateResults2(lgID)
{

	//clear the rankingInput and give the user progress feedback
	document.getElementById('rankingInput'+lgID).innerHTML = "<p>Calculating Rankings<span id='working"+lgID+"'>.</span></p>";

	var results = new Array();
	for(i=0; i<32; i++){
		results[i] = new Array();
			// initialize results
	


	
	for(var f=0; f<=36; f++)
		results[i][f] = "";
			
		location = document.getElementById('rankingDataTable'+lgID).getElementsByTagName('tr');
		results[i][0] = parseInt(location[i].id); //Team Id
		location = location[i].getElementsByTagName('td');		
		results[i][1] = location[0].innerHTML; //Team Name
		
		
		results[i][6] = parseInt(location[5].innerHTML) - 1; //Last Game

		//calculate wins, losses, games, points
		var wins = 0;
		var losses = 0;
		var games = 0;
		var pointsFor = 0.0001;
		var pointsAlw = 0.0001;

// Regular season only
			for(var j=0; j<16; j++){
				var k = 18 + j*3;
				if(location[k].innerHTML != ''){
					games++;
					k++;					
					var score1 = parseInt(location[k].innerHTML);
					k++
					var score2 = parseInt(location[k].innerHTML);
					if(score1 > score2){
						wins++;
					}
					if(score1 < score2){
						losses++;
					}
					pointsFor += score1;
					pointsAlw += score2;
				} else {
				
					// opponent
					results[i][40+j]=location[k+2].innerHTML;							
					
				}						
			}
	
		// results[i]
		// [24] = pf;
		// [25] = pa;
		//  [30] = rrw/31;
		// [40...56] = opponent info
	
		results[i][7] = games; //total games played
		results[i][8] = wins; //total games won
		results[i][9] = losses; //total games lost
		results[i][10] = pointsFor; //total points for
		results[i][11] = pointsAlw; //total points allowed			
			

		results[i][60] = location[80].innerHTML; //Player Count (non CPU)
		results[i][61] = location[81].innerHTML; //AVG Value (for those players)
		results[i][62] = location[82].innerHTML; //Effective Lvl (for the team)
		results[i][63] = location[83].innerHTML; //chemistry		
		results[i][64] = location[84].innerHTML; //cpu players		

		
		
		// load up our customs
		
						// Hijack [6] - [17] for other data
				// [6] chemistry
				// [7] AVG Value (for those players)
				// [8] Effective Lvl (for the team)
				// [9] Player Count (non CPU)
				// [10] cpu players

	
	}

console.log(results[5]);
		console.log(document.getElementById('rankingDataTable'+lgID).getElementsByTagName('tr')[5].innerHTML);
	
	
	//put all the games in an array
	var games = new Array();

	for(i=0; i<32; i++){
		games[i] = new Array();
		for(var j=0; j<24; j++){		
			games[i][j] = new Array();			
			var k = 6 + 3*j;						
			games[i][j][0] = results[i][0]; //team1Id


// Have to load the leaguePage before getting here.
			games[i][j][1] = document.getElementById(results[i][0]).getElementsByTagName('td')[k].innerHTML;//team2Id

			k++;

			games[i][j][2] = parseInt(document.getElementById(results[i][0]).getElementsByTagName('td')[k].innerHTML);//team1Score

			k++;

			games[i][j][3] = parseInt(document.getElementById(results[i][0]).getElementsByTagName('td')[k].innerHTML);//team2Score


		}
	}

	//calculate opponents points for and against, & SOR (overall, teams beaten, and teams lost to)
	for(i=0; i<32; i++){
		results[i][12] = 0; //--Opponents Points Allowed-- TEMP
		results[i][13] = 0; //--Opponents Points Scored-- TEMP
		results[i][14] = 0; //--Opponent Wins-- TEMP
		results[i][15] = 0; //--Opponent Games --TEMP
		results[i][16] = 0; //--Op Wins that you beat --TEMP
		results[i][17] = 0; //--Op Games that you beat --TEMP
		results[i][18] = 0; //--Op Wins that you lost to --TEMP
		results[i][19] = 0; //--Op Games that you lost to-- TEMP
		 
		for(var j=0; j<24; j++){
			oppTeam = games[i][j][1];
			if (oppTeam != ''){
				for (var k=0; k<32; k++){
					if (oppTeam == results[k][0]){
						results[i][12] += results[k][11];
						results[i][13] += results[k][10];
						results[i][14] += results[k][8];
						results[i][15] += results[k][7];
						if (games[i][j][2] > games[i][j][3]){ //you won 
							results[i][16] += results[k][8];
							results[i][17] += results[k][7];						
						}
						if (games[i][j][3] > games[i][j][2]) { //you lost
							results[i][18] += results[k][8];
							results[i][19] += results[k][7];
						}
					}
				} 
			}								
		}
		
		//write semi-permanent variables
		var temp = results[i][12]/results[i][15];
		results[i][12] = temp.toFixed(3); //Average Opponent Points Allw
		temp = results[i][13]/results[i][15];
		results[i][13] = temp.toFixed(3); //Average Opponent Points Scr
		temp = results[i][14]/results[i][15];
		results[i][14] = temp.toFixed(3); //SOR	(all opps win percentage)
		temp = results[i][16]/results[i][17];
		results[i][15] = temp.toFixed(3); //SOR (teams you beat) (defeated teams' win pcts)
		temp = results[i][18]/results[i][19];
		results[i][16] = temp.toFixed(3); //SOR (teams you lost to) (lost-to teams' win pcts)
		results[i][17] = results[i][10]/results[i][12]; //offensive efficiency
		results[i][18] = results[i][11]/results[i][13];	//defensive efficiency
	}
	
	//calculate raw game grades
	for(var i=0; i<32; i++){ //each team
		for(var j=0; j<24; j++){ //each game
			if(games[i][j][1] != ''){
				for(var k=0; k<32; k++){ //find opponent
					if(games[i][j][1] == results[k][0]){ //once opponent is found
						var expected1 = ((results[i][10]/results[i][7])+(results[k][11]/results[k][7]))/2;
						var expected2 = ((results[k][10]/results[k][7])+(results[i][11]/results[i][7]))/2;
						if (expected1 > 255)
							expected1 = 255;
						if (expected2 > 255)
							expected2 = 255;
						//compare actual to expected
						var oGrade = (games[i][j][2]/expected1)-1;
						var dGrade = 1-(games[i][j][3]/expected2); 
						if (oGrade > 1)
							oGrade = 1;
						if (dGrade < -1)
							dGrade = -1;

						if(games[i][j][2] > games[i][j][3]){ //you won
							var grade = .67 + (oGrade)/4 + (dGrade)/4;
							
						} else if(games[i][j][2] < games[i][j][3]){ //you lost
							var grade = .33 + (oGrade)/4 + (dGrade)/4;
						
						} else { //you tied
							var grade = .5 + (oGrade)/4 + (dGrade)/4;
						}
						if(grade > 1)
							grade = 1;
						if(grade < 0)
							grade = 0;
					
						games[i][j][2] = oGrade; //oGrade
						games[i][j][3] = dGrade; //dGrade
						games[i][j][4] = grade; //Grade
						k = 32;
					}
				}
			}	
		}
	}
	
	var momentum = new Array();
	
	for (var i = 0; i < 32; i++) {
		momentum[i] = new Array();
		for (var j = 0; j < 24; j++) {
			momentum[i][j] = 1;
		}
	}
		

	//---------------------round robin-----------------------------
	
	for(var i=0; i<32; i++){
		pf = 0;
		pa = 0;
		rrw = 0;		
		for(var j=0; j<32; j++){
			if(results[i][0] != results[j][0]){
				temp1 = (((results[i][10]/results[i][7])*results[j][18])+((results[j][11]/results[j][7])*results[i][17]))/2;
				temp2 = (((results[j][10]/results[j][7])*results[i][18])+((results[i][11]/results[i][7])*results[j][17]))/2;
				pf += temp1;
				pa += temp2;
				if(temp1 > temp2){
					rrw++;
				}
			}			
		}
		results[i][24] = pf;
		results[i][25] = pa;
		results[i][30] = rrw/31;
	}	
	
	//---------------------elo time--------------------------------
	
	//get total game grade (ie record) for each team
	for (var i = 0; i < 32; i++) { //each team
		results[i][19] = 0; //initialize team rating
	}
	
	//elo
	done=0;
	i=0;
	do {
		done++;
		do {	
			diff = getDiff(i, results, games);
			if(Math.abs(diff) > .5) {
				done = 0;
				results[i][19] += diff;				
			}
		} while (diff > .5)
		if(i==31){
			i=0;
		} else {
			i++;
		}

	} while (done < 32)
	
	function getDiff(i, results, games){
		diff=0;
		rating=0;
		for (var j=0; j < 24; j++) { //each game
			if(games[i][j][1] != ''){
				for (var k = 0; k < 32; k++) { //find opponent rating
					if(games[i][j][1] == results[k][0]){
						rating=results[k][19];
						k=32;
					}			
				}
				temp = results[i][19] - rating;
				if (temp > 50) {
					temp = 50;
				} else if(temp < -50) {
					temp = -50;
				}
				diff += (games[i][j][4] - ((temp/100)+.5))*momentum[i][j];
			}
		}
		return diff;
	}

	//calculate overall rank
	for (i = 0; i < 32; i++) {
			results[i][20] = .75*(results[i][19]+50);
	}
		
	//define rank
	for (var i=0; i<32; i++){
		results[i][21] = 1; //overall rank
		results[i][22] = 1; //offense rank
		results[i][23] = 1; //defense rank
		for (var j = 0; j < 32; j++) {
			if (results[i][0] != results[j][0]) {  //don't compare to yourself
				if (results[i][20] < results[j][20]) {
					results[i][21]++;
				}
				if(results[i][24] < results[j][24]){
					results[i][22]++;
				}
				if(results[i][25] > results[j][25]){
					results[i][23]++;
				}
			}
		}	
	

	}

console.log(results[5]);
	
	//sort ranks
	var output = new Array();
	for (var i=0; i<32; i++){
		output[i]=new Array();
	}
	
	for(var i=0; i<32; i++){
		var temp = 33;
		var rank = 33;
		for(var j=0; j<32; j++){
			if (rank > results[j][21]){
				temp = j;
				rank= results[j][21];
			}
		}
		output[i] = results[temp];
		output[i][26] = results[temp][21];		
		results[temp][21]=33;
	}


	document.getElementById('rankingInput'+lgID).innerHTML = "<p>Done Calculating<span id='working"+lgID+"'>.</span></p>";
	
	var otherspicks = new Array();

	var weekID = parseInt(document.getElementById('rankings'+lgID).parentNode.previousSibling.firstChild.innerHTML);
	
	getOthersPicksThenUpdateSelects(results, otherspicks, lgID, weekID);
	// UpdateTheDropDowns(results, lgID);
	

}



function gatherData3(address, lgID, page, data) {

	//console.log("gatherData:" + 'newDocumentTemp'+lgID);

 	document.getElementById('newDocumentTemp'+lgID).innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
	

	//clear the rankingInput and give the user progress feedback
	document.getElementById('rankingInput'+lgID).innerHTML = '<span id="progress'+lgID+'">Getting Rankings: 0%</span><span id="working'+lgID+'">.</span>';	
	
	//build a table in rankingData
	location = document.getElementById('rankingData'+lgID);
	
	var table = document.createElement('table');

	// !!! THiS will be a problem for mass tabling.

	table.setAttribute('id', 'rankingDataTable'+lgID);
	location.appendChild(table);
	
	location = document.getElementById('rankingDataTable'+lgID);

	for(var i=0; i<32; i++){
		tr = document.createElement('tr');
		tr.style.borderStyle="solid";
		location.appendChild(tr);
		tr = location.getElementsByTagName('tr')[i];		
		for(var j=0; j<85; j++){
			var td = document.createElement('td');
			td.innerHTML = '';
			tr.appendChild(td);
		}
	}

		location = document.getElementById('newDocumentTemp'+lgID).getElementsByClassName('conference')[0];
	
	
	
// Get the teams here				

	//----------fill the table with data	
	var teamId = new Array();	
	var j=0;
	//fill in the team name column and set the row id to the team id	
	for (var i=1; i<17; i++){

// !!! Need to modify to make global
// Pull this from the league page...
// Make sure document is the league page and we're golden.


		var teamPage = location.getElementsByTagName('tr')[i].childNodes[3].firstChild.href.split('=', 2);
	
		if (teamPage[0] == "http://glb.warriorgeneral.com/game/league.pl?league_id") { // WORLD LEAGUE
			teamPage = location.getElementsByTagName('tr')[i].childNodes[5].firstChild.href.split('=', 2);
			var teamName = location.getElementsByTagName('tr')[i].childNodes[5].firstChild.innerHTML;
		} else {
			var teamName = location.getElementsByTagName('tr')[i].childNodes[3].firstChild.innerHTML;
		}
		teamId[j] = teamPage[1];

		document.getElementById('rankingDataTable'+lgID).getElementsByTagName('tr')[j].id = teamId[j];
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].innerHTML = teamName;
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].setAttribute('class', 'completed'+lgID);

		j++;		

		updateProgress(lgID);
	}	
	
	
	
	// go to the second conference list
	location = document.getElementById('newDocumentTemp'+lgID).getElementsByClassName('conference')[1];
	
	
		for (var i=1; i<17; i++){

// !!! Need to modify to make global
// Pull this from the league page...
// Make sure document is the league page and we're golden.


		var teamPage = location.getElementsByTagName('tr')[i].childNodes[3].firstChild.href.split('=', 2);
	
		if (teamPage[0] == "http://glb.warriorgeneral.com/game/league.pl?league_id") { // WORLD LEAGUE
			teamPage = location.getElementsByTagName('tr')[i].childNodes[5].firstChild.href.split('=', 2);
			var teamName = location.getElementsByTagName('tr')[i].childNodes[5].firstChild.innerHTML;
		} else {
			var teamName = location.getElementsByTagName('tr')[i].childNodes[3].firstChild.innerHTML;
		}
		teamId[j] = teamPage[1];

		document.getElementById('rankingDataTable'+lgID).getElementsByTagName('tr')[j].id = teamId[j];
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].innerHTML = teamName;
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].setAttribute('class', 'completed'+lgID);

		j++;		

		updateProgress(lgID);
	}	
	


	for(var i=0; i<32; i++)
	{
			document.getElementById(teamId[i]).getElementsByTagName('td')[1].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[1].setAttribute('class', 'completed'+lgID);
			updateProgress(lgID);	
			document.getElementById(teamId[i]).getElementsByTagName('td')[2].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[2].setAttribute('class', 'completed'+lgID);
			document.getElementById(teamId[i]).getElementsByTagName('td')[3].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[3].setAttribute('class', 'completed'+lgID);
			updateProgress(lgID);
		
	}

 	document.getElementById('newDocumentTemp'+lgID).innerHTML = "";	
}


function calculateResults3(lgID)
{

	//clear the rankingInput and give the user progress feedback
	document.getElementById('rankingInput'+lgID).innerHTML = "<p>Calculating Rankings<span id='working"+lgID+"'>.</span></p>";

	var results = new Array();
	for(i=0; i<32; i++)
	{
		results[i] = new Array();
			// initialize results
	


	
		for(var f=0; f<=36; f++)
			results[i][f] = "";
			
		location = document.getElementById('rankingDataTable'+lgID).getElementsByTagName('tr');
		results[i][0] = parseInt(location[i].id); //Team Id
		location = location[i].getElementsByTagName('td');		
		results[i][1] = location[0].innerHTML; //Team Name
	}

	document.getElementById('rankingInput'+lgID).innerHTML = "<p>Done Calculating<span id='working"+lgID+"'>.</span></p>";
	
	var otherspicks = new Array();

	var weekID = parseInt(document.getElementById('rankings'+lgID).parentNode.previousSibling.firstChild.innerHTML);
	
	getOthersPicksThenUpdateSelects(results, otherspicks, lgID, weekID);
	// UpdateTheDropDowns(results, lgID);
	

}


function getPlayerID(){
	GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://glb.warriorgeneral.com/game/home.pl',
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response)
			{
			
				try
				{

					if(response.responseText.indexOf("MMORPG") != -1)
				        alert('User is not logged in');
				
					if(response.responseText.indexOf("mstrbtngbear") != -1)
						g_glbsavedpicks = "glbsavedpicks_p2";

				}
				catch (e) 
				{
					console.log( response.responseText, e);					
				}				
										
			}
	});
}















// =======================================================================================================  League Page ==========================
























// NOW WITH RANKINGS!!!


var g_effranks = true;

// Rankings globals
var season		= 17; // what season number are we in?
var leagueID = window.location.search.match(/.*league_id=(\d+)/)[1];
if(leagueID == '')
{
	leagueID = 280;
}


	//build a div to put in the location
	var div = document.createElement('div');
	div.setAttribute('id', 'rankings');

	var div1 = document.createElement('div');
	div1.setAttribute('id', 'userPicksTemp');
	
	var div2 = document.createElement('div');
	div2.setAttribute('id', 'rankingsTableNew');

	
	
	//locate an area to place the button
//	update to the bottom
	var	location = document.getElementById('content');
	if(!location){
		return 1;
	}	
	else
	{
//		location = location.firstChild.nextSibling.nextSibling;
//			//place the div	
//console.log(location.firstChild.nextSibling.nextSibling.nextSibling);	
		location.insertBefore(div,location.firstChild.nextSibling.nextSibling.nextSibling);

		location.appendChild(div1);
		
		location.appendChild(div2);

	}

	



	

	//locate the div to place the button and user input in
	location = document.getElementById('rankings');

	//build a div to store the input
	div = document.createElement('div');
	div.setAttribute('id', 'rankingInput');
	location.appendChild(div);


	//build a div to store the data temporarily
	div = document.createElement('div');
	div.setAttribute('id', 'rankingData');
	div.setAttribute("style","visibility: hidden; display:none;");
	location.appendChild(div);

	
	
	//build a div to store pages temporarily
	div = document.createElement('div');
	div.setAttribute('id', 'rankingTemp');
	div.setAttribute("style","visibility: hidden; display:none;");
	location.appendChild(div);

	
	
	//build a second div to store other pages temporarily
	div = document.createElement('div');
	div.setAttribute('id', 'newDocumentTemp');
	div.setAttribute("style","visibility: hidden; display:none;");
	location.appendChild(div);





//-------------------------------Main Function

// add all of the ranking goodness.
function addRankingInfo()
{
	getLeaguePageThenGatherData();

}





//-------------------------------First level Functions


	//User Input Key
	// 0 = pre-season 0
	// 1 = regular season  1
	// 2 = playoffs 0
	// 3 = Games are equal yes/no  1
	// 4 = pre-season weight  1
	// 5 = regular season weight 4
	// 6 = playoff weight 2
	// 7 = include momentum 0
	// 8 = mometum weight 4
	// 9 = momentum steps 2
	//10 = include talent 0
	//11 = include history 0
	//12 = preSeason length 4
	//13 = current season  17
	//14 = forum post formatted  1
	//15 = output matchups  1
	//16 = fantasy matchup teamId 1
	//17 = fantasy matchup teamId 2
	//18 = show team record in matchups 0 


function gatherDataSL() {
	//clear the rankingInput and give the user progress feedback
	document.getElementById('rankingInput').innerHTML = '<span id="progress">Getting Rankings: 0%</span><span id="working">.</span>';	
	
	//build a table in rankingData
	location = document.getElementById('rankingData');
	
	var table = document.createElement('table');

// !!! THiS will be a problem for mass tabling.

	table.setAttribute('id', 'rankingDataTable');
	location.appendChild(table);
	
	location = document.getElementById('rankingDataTable');

	// Set up the rankingDataTable (where we store everything)...
	for(var i=0; i<32; i++){
		tr = document.createElement('tr');
		tr.style.borderStyle="solid";
		location.appendChild(tr);
		tr = location.getElementsByTagName('tr')[i];		
		
		// Set up the columns in the table...

//		for(var j=0; j<78; j++)
		for(var j=0; j<85; j++)
		{
		
			var td = document.createElement('td');
			td.innerHTML = '';
			tr.appendChild(td);
		}
	}


// Get the teams here				

	//----------fill the table with data	
	var teamId = new Array();	
	var j=0;
	//fill in the team name column and set the row id to the team id	
	for (var i=0; i<34; i++)
	{
		if(i == 0 || i == 17)
		{								
			i++;			
		}

// !!! Need to modify to make global
// Pull this from the league page...
// Make sure document is the league page and we're golden.



		var teamPage = document.getElementById('conferences').getElementsByTagName('tr')[i].childNodes[3].firstChild.href.split('=', 2);
		var conferences = document.getElementById('conference');


		if (teamPage[0] == "http://glb.warriorgeneral.com/game/league.pl?league_id") { // WORLD LEAGUE
			teamPage = document.getElementById('conferences').getElementsByTagName('tr')[i].childNodes[5].firstChild.href.split('=', 2);
			var teamName = document.getElementById('conferences').getElementsByTagName('tr')[i].childNodes[5].firstChild.innerHTML;
		} else {
			var teamName = document.getElementById('conferences').getElementsByTagName('tr')[i].childNodes[3].firstChild.innerHTML;
		}
		teamId[j] = teamPage[1];

		document.getElementById('rankingDataTable').getElementsByTagName('tr')[j].id = teamId[j];
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].innerHTML = teamName;
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].setAttribute('class', 'completed');

		var confNum = 0;
		if(i>16)
			confNum =1;		
	
		document.getElementById(teamId[j]).getElementsByTagName('td')[2].innerHTML = confNum;
		document.getElementById(teamId[j]).getElementsByTagName('td')[2].setAttribute('class', 'completed');
		
		j++;		

		updateProgressSL();
	}		

	for(var i=0; i<32; i++)
	{			
			document.getElementById(teamId[i]).getElementsByTagName('td')[1].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[1].setAttribute('class', 'completed');
			updateProgressSL();	
		
	}


	for(var i=0; i<32; i++)
	{
	

			document.getElementById(teamId[i]).getElementsByTagName('td')[3].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[3].setAttribute('class', 'completed');
			updateProgressSL();
		
	}

	//figure out how many regular season games we need to look at

	var gamesPlayed = getGamesPlayed();
		
	for(var i=0; i<32; i++){
		getTeamPageSL(gamesPlayed, teamId[i]);
		if (g_effranks)
			getTeamEffLVLPageSL(teamId[i]);
	}		
}

function calculateResultsSL()
{



	//clear the rankingInput and give the user progress feedback
	document.getElementById('rankingInput').innerHTML = "<p>Calculating Rankings<span id='working'>.</span></p>";

	var results = new Array();
	for(i=0; i<32; i++){
		results[i] = new Array();
			// initialize results
			
if(g_effranks)
{
		for(var f=0; f<=36; f++)
			results[i][f] = "";
			
}
		location = document.getElementById('rankingDataTable').getElementsByTagName('tr');
		results[i][0] = parseInt(location[i].id); //Team Id
		location = location[i].getElementsByTagName('td');		
		results[i][1] = location[0].innerHTML; //Team Name
		results[i][2] = parseInt(location[2].innerHTML); //Conference	
		
		results[i][6] = parseInt(location[5].innerHTML) - 1; //Last Game

		//calculate wins, losses, games, points
		var wins = 0;
		var losses = 0;
		var games = 0;
		var pointsFor = 0.0001;
		var pointsAlw = 0.0001;

// Regular season only
			for(var j=0; j<16; j++){
				var k = 18 + j*3;
				if(location[k].innerHTML != ''){
					games++;
					k++;					
					var score1 = parseInt(location[k].innerHTML);
					k++
					var score2 = parseInt(location[k].innerHTML);
					if(score1 > score2){
						wins++;
					}
					if(score1 < score2){
						losses++;
					}
					pointsFor += score1;
					pointsAlw += score2;
				} else {
				
					// opponent
					results[i][40+j]=location[k+2].innerHTML;							
					
				}						
			}
	
		// results[i]
		// [24] = pf;
		// [25] = pa;
		//  [30] = rrw/31;
		// [40...56] = opponent info
	
		results[i][7] = games; //total games played
		results[i][8] = wins; //total games won
		results[i][9] = losses; //total games lost
		results[i][10] = pointsFor; //total points for
		results[i][11] = pointsAlw; //total points allowed			
			
if(g_effranks)
{	
		results[i][60] = location[80].innerHTML; //Player Count (non CPU)
		results[i][61] = location[81].innerHTML; //AVG Value (for those players)
		results[i][62] = location[82].innerHTML; //Effective Lvl (for the team)
		results[i][63] = location[83].innerHTML; //chemistry		
		results[i][64] = location[84].innerHTML; //cpu players		
}
		
		
		// load up our customs
		
						// Hijack [6] - [17] for other data
				// [6] chemistry
				// [7] AVG Value (for those players)
				// [8] Effective Lvl (for the team)
				// [9] Player Count (non CPU)
				// [10] cpu players

	
	}

console.log(results[5]);
		console.log(document.getElementById('rankingDataTable').getElementsByTagName('tr')[5].innerHTML);
	
	
	//put all the games in an array
	var games = new Array();

	for(i=0; i<32; i++){
		games[i] = new Array();
		for(var j=0; j<24; j++){		
			games[i][j] = new Array();			
			var k = 6 + 3*j;						
			games[i][j][0] = results[i][0]; //team1Id


// Have to load the leaguePage before getting here.
			games[i][j][1] = document.getElementById(results[i][0]).getElementsByTagName('td')[k].innerHTML;//team2Id

			k++;

			games[i][j][2] = parseInt(document.getElementById(results[i][0]).getElementsByTagName('td')[k].innerHTML);//team1Score

			k++;

			games[i][j][3] = parseInt(document.getElementById(results[i][0]).getElementsByTagName('td')[k].innerHTML);//team2Score


		}
	}

	//calculate opponents points for and against, & SOR (overall, teams beaten, and teams lost to)
	for(i=0; i<32; i++){
		results[i][12] = 0; //--Opponents Points Allowed-- TEMP
		results[i][13] = 0; //--Opponents Points Scored-- TEMP
		results[i][14] = 0; //--Opponent Wins-- TEMP
		results[i][15] = 0; //--Opponent Games --TEMP
		results[i][16] = 0; //--Op Wins that you beat --TEMP
		results[i][17] = 0; //--Op Games that you beat --TEMP
		results[i][18] = 0; //--Op Wins that you lost to --TEMP
		results[i][19] = 0; //--Op Games that you lost to-- TEMP
		 
		for(var j=0; j<24; j++){
			oppTeam = games[i][j][1];
			if (oppTeam != ''){
				for (var k=0; k<32; k++){
					if (oppTeam == results[k][0]){
						results[i][12] += results[k][11];
						results[i][13] += results[k][10];
						results[i][14] += results[k][8];
						results[i][15] += results[k][7];
						if (games[i][j][2] > games[i][j][3]){ //you won 
							results[i][16] += results[k][8];
							results[i][17] += results[k][7];						
						}
						if (games[i][j][3] > games[i][j][2]) { //you lost
							results[i][18] += results[k][8];
							results[i][19] += results[k][7];
						}
					}
				} 
			}								
		}
		
		//write semi-permanent variables
		var temp = results[i][12]/results[i][15];
		results[i][12] = temp.toFixed(3); //Average Opponent Points Allw
		temp = results[i][13]/results[i][15];
		results[i][13] = temp.toFixed(3); //Average Opponent Points Scr
		temp = results[i][14]/results[i][15];
		results[i][14] = temp.toFixed(3); //SOR	(all opps win percentage)
		temp = results[i][16]/results[i][17];
		results[i][15] = temp.toFixed(3); //SOR (teams you beat) (defeated teams' win pcts)
		temp = results[i][18]/results[i][19];
		results[i][16] = temp.toFixed(3); //SOR (teams you lost to) (lost-to teams' win pcts)
		results[i][17] = results[i][10]/results[i][12]; //offensive efficiency
		results[i][18] = results[i][11]/results[i][13];	//defensive efficiency
	}
	
	//calculate raw game grades
	for(var i=0; i<32; i++){ //each team
		for(var j=0; j<24; j++){ //each game
			if(games[i][j][1] != ''){
				for(var k=0; k<32; k++){ //find opponent
					if(games[i][j][1] == results[k][0]){ //once opponent is found
						var expected1 = ((results[i][10]/results[i][7])+(results[k][11]/results[k][7]))/2;
						var expected2 = ((results[k][10]/results[k][7])+(results[i][11]/results[i][7]))/2;
						if (expected1 > 255)
							expected1 = 255;
						if (expected2 > 255)
							expected2 = 255;
						//compare actual to expected
						var oGrade = (games[i][j][2]/expected1)-1;
						var dGrade = 1-(games[i][j][3]/expected2); 
						if (oGrade > 1)
							oGrade = 1;
						if (dGrade < -1)
							dGrade = -1;

						if(games[i][j][2] > games[i][j][3]){ //you won
							var grade = .67 + (oGrade)/4 + (dGrade)/4;
							
						} else if(games[i][j][2] < games[i][j][3]){ //you lost
							var grade = .33 + (oGrade)/4 + (dGrade)/4;
						
						} else { //you tied
							var grade = .5 + (oGrade)/4 + (dGrade)/4;
						}
						if(grade > 1)
							grade = 1;
						if(grade < 0)
							grade = 0;
					
						games[i][j][2] = oGrade; //oGrade
						games[i][j][3] = dGrade; //dGrade
						games[i][j][4] = grade; //Grade
						k = 32;
					}
				}
			}	
		}
	}
	
	var momentum = new Array();
	
	for (var i = 0; i < 32; i++) {
		momentum[i] = new Array();
		for (var j = 0; j < 24; j++) {
			momentum[i][j] = 1;
		}
	}
		

	//---------------------round robin-----------------------------
	
	for(var i=0; i<32; i++){
		pf = 0;
		pa = 0;
		rrw = 0;		
		for(var j=0; j<32; j++){
			if(results[i][0] != results[j][0]){
				temp1 = (((results[i][10]/results[i][7])*results[j][18])+((results[j][11]/results[j][7])*results[i][17]))/2;
				temp2 = (((results[j][10]/results[j][7])*results[i][18])+((results[i][11]/results[i][7])*results[j][17]))/2;
				pf += temp1;
				pa += temp2;
				if(temp1 > temp2){
					rrw++;
				}
			}			
		}
		results[i][24] = pf;
		results[i][25] = pa;
		results[i][30] = rrw/31;
	}	
	
	//---------------------elo time--------------------------------
	
	//get total game grade (ie record) for each team
	for (var i = 0; i < 32; i++) { //each team
		results[i][19] = 0; //initialize team rating
	}
	
	//elo
	done=0;
	i=0;
	do {
		done++;
		do {	
			diff = getDiff(i, results, games);
			if(Math.abs(diff) > .5) {
				done = 0;
				results[i][19] += diff;				
			}
		} while (diff > .5)
		if(i==31){
			i=0;
		} else {
			i++;
		}
		updateIcon();		
	} while (done < 32)
	
	function getDiff(i, results, games){
		diff=0;
		rating=0;
		for (var j=0; j < 24; j++) { //each game
			if(games[i][j][1] != ''){
				for (var k = 0; k < 32; k++) { //find opponent rating
					if(games[i][j][1] == results[k][0]){
						rating=results[k][19];
						k=32;
					}			
				}
				temp = results[i][19] - rating;
				if (temp > 50) {
					temp = 50;
				} else if(temp < -50) {
					temp = -50;
				}
				diff += (games[i][j][4] - ((temp/100)+.5))*momentum[i][j];
			}
		}
		return diff;
	}

	
	//--------------------------elo done -----------

	//calculate ovr, off, and def score
//	for(var i=0; i<32; i++){
//		results[i][24] = 0; //offScore
//		results[i][25] = 0; //defScore
//		for(var j=0; j<24; j++){
//			if(games[i][j][1] == ''){
//			} else {
//				results[i][19] += games[i][j][4] * momentum[i][j];				
//				results[i][24] += games[i][j][2] * momentum[i][j];
//				results[i][25] += games[i][j][3] * momentum[i][j];
//			}
//		}
//	}
	
	//calculate overall rank
	for (i = 0; i < 32; i++) {
			results[i][20] = .75*(results[i][19]+50);
	}
		
	//define rank
	for (var i=0; i<32; i++){
		results[i][21] = 1; //overall rank
		results[i][22] = 1; //offense rank
		results[i][23] = 1; //defense rank
		for (var j = 0; j < 32; j++) {
			if (results[i][0] != results[j][0]) {  //don't compare to yourself
				if (results[i][20] < results[j][20]) {
					results[i][21]++;
				}
				if(results[i][24] < results[j][24]){
					results[i][22]++;
				}
				if(results[i][25] > results[j][25]){
					results[i][23]++;
				}
			}
		}	
	

	}

console.log(results[5]);
	
	//sort ranks
	var output = new Array();
	for (var i=0; i<32; i++){
		output[i]=new Array();
	}
	
	for(var i=0; i<32; i++){
		var temp = 33;
		var rank = 33;
		for(var j=0; j<32; j++){
			if (rank > results[j][21]){
				temp = j;
				rank= results[j][21];
			}
		}
		output[i] = results[temp];
		output[i][26] = results[temp][21];		
		results[temp][21]=33;
	}



// Output Matchups
// If the season has started, but not ended yet
// if ((results[0][7]>0) && (results[0][7]<16))
//	outputMatchups(results, games);		

	var weekID = parseInt(window.location.search.match(/.*week=(\d+)/)[1]);

UpdateTheDropDownsSL(output, results, leagueID,weekID);
UpdateOthersPicksTable(output, results);



getInetPage2('http://glb.warriorgeneral.com/game/league_survivor.pl?league_id=' + leagueID, output, outputResults, results, games);
	
//	var weekID = parseInt(window.location.search.match(/.*week=(\d+)/)[1]);
	if(weekID != '')
	{
		weekID--;
		UpdateOthersPicksTableNeedPicks('http://glb.warriorgeneral.com/game/league_survivor.pl?league_id=' + leagueID + '&week='+ weekID, weekID);
		
	}
	

}



function getInetPage2(address, myid, func, data, data2) {
    console.log("getInetPage : "+address);
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
			func(address, myid, this, data, data2);
		}
	};

	req.send(null);
	return req;
}





function getRecord(resultsLine) {
	var record = resultsLine[8] + '-' + resultsLine[9];
	var ties = ( 1 + resultsLine[6] - resultsLine[8] - resultsLine[9] );
	ties = ( ties - 4 );
	
	if (ties)
		record += '-' + ties;
	return record;
}





//getInetPage('http://glb.warriorgeneral.com/game/league_survivor.pl?league_id=' + leagueID, output, outputResults, results);

function outputResults(myaddress, output, page, results, games)
{

	var tempEditResponse = page.responseText.split("<td>Outcome<\/td>")[1].split("my_pick\">")[0];

	var re = /.*team_id=(\d+).*team_id=(\d+).*/g;
	var linematch = tempEditResponse.match( re );

	var winners = new Array();
	var losers = new Array();

	for(var i in linematch)
	{
		var re = /.*team_id=(\d+).*team_id=(\d+).*/;
		var result = linematch[i].match( re );
	
		winners.push(parseInt(result[1]));
		losers.push(parseInt(result[2]));
	}

	
	for(var i=0; i<32; i++) //each team
	{
	
		// Can Win
		output[i][35] = '';
		
		
		
		if(winners.indexOf(output[i][0]) == -1)
		{
			output[i][35] = 'W';
		}
		
		// Can lose
		output[i][36] = '';
		
		if(losers.indexOf(output[i][0]) == -1)
		{
			output[i][36] = 'L';
		}
	}
	
	
	// Now onto orig Output Results.

	var currentWeek;
	
			
	var teamRecord;
	var html = '';
	
		html = '<table><tr>' +
					'<th><u>Rnk</u></th>' +
					'<td>&nbsp;</td>' +
					'<th><u>Off</u></th>' +
					'<td>&nbsp;</td>' +
					'<th><u>Def</u></th>' +
					'<td>&nbsp;</td>' +
					'<th><u>SoS</u></th>' +
					'<td>&nbsp;</td>' +
					'<td><u>W-L-T</u></td>' +
					'<th><u>Team</u></th>' +
					'<th><u>Can W</u></th>' +
					'<th><u>Can L</u></th>';

// Add remaining weeks (up to 16)

// week is in the td before my_pick.
var currentweek = page.responseText.split("<td><select name=\"my_pick\">")[0].split("<td>").pop().replace("</td>","");					


for(var x=parseInt(currentweek); x <= 16; x++)
{
	html +=  '<th></th><th><u>W'+x+'</u></th>';
}
					
					
html += '</tr>';
	for(var i=0; i<32; i++)
	{
		if (output[i][2] == 0)
		{
		html += '<tr><td>' + output[i][26];
		html += '</td><td>......';
		html += '</td><td>' + output[i][22] + '</td><td>......';
		html += '</td><td>' + output[i][23] + '</td><td>........</td>' +
						'<td>' + output[i][14] + '</td>' + //14
						'<td>........</td>';
		teamRecord = getRecord(output[i]);
		html += '<td>' + teamRecord;
		if (teamRecord.length < 6) // justifying for length
			html += '..';
		if (teamRecord.length < 5)
			html += '..';
		if (teamRecord.length < 4)
			html += '..';
		html += '</td><td nowrap="nowrap">' + output[i][1] + '</td>';
		html += '<td>' + output[i][35] + '</td>';
		html += '<td>' + output[i][36] + '</td>';
		
		// Now fill in the matchups for the remaining schedule, ugg, store this in the end of results.
		
		var mylgid = myaddress.split("=")[1];

		var listofpicksbyconf = new Array();
		extractSavedPicks(listofpicksbyconf);
		var selectedvalue = "";
		
		for (var xi = 0; xi<listofpicksbyconf.length; xi++)
		{
			if (listofpicksbyconf[xi][0] == mylgid)
			{
				selectedvalue = listofpicksbyconf[xi][1];
			}
		}
		
//		for(var x=parseInt(currentweek); x <= 16; x++)
		for(var x=parseInt(currentweek); x <= 20; x++)
		{
			// 
			// Check if we have already checked something
			var thepick = "";
			var thepickslist = new Array();
			
			if(typeof selectedvalue != 'undefined')
			{

				//17w1824,19w1824,18w1869  EXAMPLE
				var listofweeks = selectedvalue.split(',');
						
				for each (var mentry in listofweeks)
				{
					var mweekwinner = mentry.split('w');
					if (mweekwinner[0] == x)
						thepickslist.push(mweekwinner[1])
				}
			}
			// now thepickslist contains all picks to check for this current week

			if(x>16)
			{
				if(output[i][35] != '' && output[i][26] <20) // if we haven't been chosen to win and we're in the top of the rankings (no way to get the absolute top 16 at this point)
				{

					if (thepickslist.indexOf((output[i][0]).toString()) != -1)
					{
						// If we're in the playoffs the loss doesn't matter anymore, but the wins do.
						html +=  '<td></td><td nowrap="nowrap"><input type="checkbox" class='+ output[i][40+x-1]  +' name='+mylgid+ 'l value=' + x +'w'+output[i][0]+' checked>.. W ..  </td>';		
					}
					else
						html +=  '<td></td><td nowrap="nowrap"><input type="checkbox" class='+ output[i][40+x-1] +' name='+mylgid+ 'l value=' + x +'w'+output[i][0]+'>.. W ..  </td>';
						


				}
				else
				{
					// already picked to win so make it blank
					html += '<td></td><td></td>';
				}
			}
			else if(output[i][35] == '' && output[i][36] == '') 			// if our team has been chosen to win and lose, it's pointless, we can't chose this game.
			{
				html += '<td></td><td></td>';
			}
			else
			{
			
				// Need to create a input table here.

		

		
				// html +=  '<td>'+  results[i][40+x-1]  +'</td>';


		
				var temper = output_matchup_constrained(output[i][0], output[i][40+x-1], i , output);
				

				if(temper == "")
				{
					html +=  '<td></td><td nowrap="nowrap">' + temper +'</td>';				

				}
				else 
				{
				


					if (thepickslist.indexOf((output[i][0]).toString()) != -1)
					{
						html +=  '<td></td><td nowrap="nowrap"><input type="checkbox" class='+ output[i][40+x-1]  +' name='+mylgid +'l value='+ x +'w'+output[i][0]+' checked>..'+  temper +'</td>';	
	

					}
					else
					{
					
//					html +=  '<td></td><td nowrap="nowrap"><input type="checkbox" name=l'+mylgid+'w'+ x +'m'+output[i][0] +'v'+output[i][40+x-1] +' value="glb"/>..'+  temper +'</td>';		
						html +=  '<td></td><td nowrap="nowrap"><input type="checkbox" class='+ output[i][40+x-1]  + ' name='+mylgid +'l value='+ x +'w'+output[i][0]+ '>..'+  temper +'</td>';	
					}
					// button.addEventListener("click",stop,false);    
					
				}
			
				
			}	
			
		}
		
		
		html += '</tr>';
		}
	}
	
	html += '<tr class="alternating_color2"><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td></tr>';
	// Second Pass for Conference 2
	
	for(var i=0; i<32; i++)
	{
		if (output[i][2] == 1)
		{
		html += '<tr><td>' + output[i][26];
		html += '</td><td>......';
		html += '</td><td>' + output[i][22] + '</td><td>......';
		html += '</td><td>' + output[i][23] + '</td><td>........</td>' +
						'<td>' + output[i][14] + '</td>' + //14
						'<td>........</td>';
		teamRecord = getRecord(output[i]);
		html += '<td>' + teamRecord;
		if (teamRecord.length < 6) // justifying for length
			html += '..';
		if (teamRecord.length < 5)
			html += '..';
		if (teamRecord.length < 4)
			html += '..';
		html += '</td><td nowrap="nowrap">' + output[i][1] + '</td>';
		html += '<td>' + output[i][35] + '</td>';
		html += '<td>' + output[i][36] + '</td>';
		
		// Now fill in the matchups for the remaining schedule, ugg, store this in the end of results.
		
		var mylgid = myaddress.split("=")[1];

		var listofpicksbyconf = new Array();
		extractSavedPicks(listofpicksbyconf);
		var selectedvalue = "";
		
		for (var xi = 0; xi<listofpicksbyconf.length; xi++)
		{
			if (listofpicksbyconf[xi][0] == mylgid)
			{
				selectedvalue = listofpicksbyconf[xi][1];
			}
		}
		
//		for(var x=parseInt(currentweek); x <= 16; x++)
		for(var x=parseInt(currentweek); x <= 20; x++)
		{
			// 
			// Check if we have already checked something
			var thepick = "";
			var thepickslist = new Array();
			
			if(typeof selectedvalue != 'undefined')
			{

				//17w1824,19w1824,18w1869  EXAMPLE
				var listofweeks = selectedvalue.split(',');
						
				for each (var mentry in listofweeks)
				{
					var mweekwinner = mentry.split('w');
					if (mweekwinner[0] == x)
						thepickslist.push(mweekwinner[1])
				}
			}
			// now thepickslist contains all picks to check for this current week

			if(x>16)
			{
				if(output[i][35] != '' && output[i][26] <20) // if we haven't been chosen to win and we're in the top of the rankings (no way to get the absolute top 16 at this point)
				{

					if (thepickslist.indexOf((output[i][0]).toString()) != -1)
					{
						// If we're in the playoffs the loss doesn't matter anymore, but the wins do.
						html +=  '<td></td><td nowrap="nowrap"><input type="checkbox"  class='+ output[i][40+x-1] +' name='+mylgid+ 'l value=' + x +'w'+output[i][0]+' checked>.. W ..  </td>';		
					}
					else
						html +=  '<td></td><td nowrap="nowrap"><input type="checkbox"  class='+ output[i][40+x-1]  +' name='+mylgid+ 'l value=' + x +'w'+output[i][0]+' >.. W ..  </td>';								
				

				}
				else
				{
					// already picked to win so make it blank
					html += '<td></td><td></td>';
				}
			}
			else if(output[i][35] == '' && output[i][36] == '') 			// if our team has been chosen to win and lose, it's pointless, we can't chose this game.
			{
				html += '<td></td><td></td>';
			}
			else
			{
			
				// Need to create a input table here.

		

		
				// html +=  '<td>'+  results[i][40+x-1]  +'</td>';
				
				var temper = output_matchup_constrained(output[i][0], output[i][40+x-1], i , output);

				
				if(temper == "")
				{
					html +=  '<td></td><td nowrap="nowrap">' + temper +'</td>';				

				}
				else 
				{
				
// Add L vs W


					if (thepickslist.indexOf((output[i][0]).toString()) != -1)
					{
						html +=  '<td></td><td nowrap="nowrap"><input type="checkbox"  class='+ output[i][40+x-1]  +  ' name='+mylgid +'l value='+ x +'w'+output[i][0]+' checked>..'+  temper +'</td>';	
	

					}
					else
					{
					
//					html +=  '<td></td><td nowrap="nowrap"><input type="checkbox" name=l'+mylgid+'w'+ x +'m'+output[i][0] +'v'+output[i][40+x-1] +' value="glb"/>..'+  temper +'</td>';		
						html +=  '<td></td><td nowrap="nowrap"><input type="checkbox"  class='+ output[i][40+x-1]  + ' name='+mylgid +'l value='+ x +'w'+output[i][0]+ '>..'+  temper +'</td>';	
					}
					// button.addEventListener("click",stop,false);    
					
				}
			
				
			}	
			
		}
		
		
		html += '</tr>';
		}
	}
	
	
	
	
	html += '</table>';
	
	
	location = document.getElementById('rankingsTableNew');
	location.innerHTML = html;
	
	//build table	
	
	
	// Load line coloring and matchup eliminating
	markupChecks();
	
	
	// Output Matchups
// If the season has started, but not ended yet
if ((results[0][7]>0) && (results[0][7]<16))
	outputMatchups(results, games);		
	
	
	// 
	document.documentElement.addEventListener("click", handleChange, true);
	
}


function markupChecks()
{
	
	document.getElementsByClassName
	var listofts = document.getElementsByTagName('input');
	// put all checkboxes in a list of ts
	
	for each (var t in listofts)
	{

		if(t.type == 'checkbox' && t.checked == true)
		{
			// Check
			// Turn the row red
			t.parentNode.parentNode.style.backgroundColor= "grey";
			
		
		
			// turn all others blue
			try
			{
				for each (var otherspicksid in document.getElementsByClassName(t.className))
				{

					otherspicksid.parentNode.style.color = "#0000FF";
				}
			}
			catch (e)
			{
				console.log(e);
			}
		}
	}
}

function resetAllPicks()
{
    
    var b = confirm('Are you sure you want to clear all picks?e');
    if (b)
	{
    	GM_setValue(g_glbsavedpicks,"");				
    	console.log("saved --> "+GM_getValue(g_glbsavedpicks));
    } 
	else 
	{
        alert('aborted ');
    }
    
}


function showSavedPicks() 
{

    var b = GM_getValue(g_glbsavedpicks)
	prompt("saved picks string", b);

}

function printSavedPicks() 
{

		var listofpicksbyconf = new Array();
		extractSavedPicks(listofpicksbyconf);

		alert(listofpicksbyconf.toSource());

}

function extractSavedPicks(listofpicksbyconf)
{
		var savedpicks = GM_getValue(g_glbsavedpicks);
		if(typeof savedpicks != 'undefined')
		{
			var savedpicklist = savedpicks.split("@");
//			console.log("1042savedpicklist", savedpicklist);
			savedpicklist.shift();
			
			for each (var leaguelist in savedpicklist)
			{
				listofpicksbyconf.push([leaguelist.split("l")[0],leaguelist.split("l")[1]]);
			}
		}
		else
		{
//			alert("no saved picks");
		}
}

function ResetThisLeaguePicks()
{
		var listofpicksbyconf = new Array();
		extractSavedPicks(listofpicksbyconf);
		
		
}

function storeSavedPicks(listofpicksbyconf)
{

	var savemestring = "";

	console.log("1062 - Storing", listofpicksbyconf.toSource());
	if(listofpicksbyconf.length != 0)
	{
		for each (var mentry in listofpicksbyconf)
		{
	//		console.log("1066 - mentry:", mentry);
			savemestring += "@"+mentry[0]+"l"+mentry[1];
		}
	}
//	console.log("1083 savemestring", savemestring);	
	GM_setValue(g_glbsavedpicks,savemestring);				
	console.log("saved --> "+GM_getValue(g_glbsavedpicks));
}


function handleChange(event)
{
	var t = event.target;

	
//	try
//	{
		if (isCheckbox(t))
		{
		
			var listofpicksbyconf = new Array();
			extractSavedPicks(listofpicksbyconf);

			var lg_index = -1;
			var currentsetting = "";
			
	//		console.log("1087 setting up -> ",listofpicksbyconf.toSource());
			
			for (var i = 0; i<listofpicksbyconf.length; i++)
			{
				if (listofpicksbyconf[i][0] == t.name.split("l")[0])
				{
					lg_index = i;
					currentsetting = listofpicksbyconf[i][1];
				}
			}
			
			console.log("1098 check index", lg_index, "currentsetting", currentsetting);
			// and if we don't find it... add it
			if (lg_index == -1)
			{
				var namest = t.name.split("l");
				console.log("t name", t.name, namest[0]);
				listofpicksbyconf.push([t.name.split("l")[0], currentsetting]);
	//			console.log("1104 Check", lg_index, listofpicksbyconf.length);
				lg_index = listofpicksbyconf.length-1;
				console.log("index", lg_index);
			}
		
			// @1l17w5816

			
			
			if(t.checked == true)
			{
				// Check
				// Turn the row red
				t.parentNode.parentNode.style.backgroundColor= "grey";
				
			
				var newstring ="";
				if (typeof listofpicksbyconf[lg_index][1] == 'undefined' || listofpicksbyconf[lg_index][1].length == 0)
				{
					newstring = t.value;
	//				console.log("1112 - newstring", newstring, lg_index, listofpicksbyconf.toSource());
				}
				else
					newstring = listofpicksbyconf[lg_index][1] + ","+ t.value;	
				listofpicksbyconf[lg_index][1] = newstring;
				
				
				// turn all others blue
				try
				{
					for each (var otherspicksid in document.getElementsByClassName(t.className))
					{

						otherspicksid.parentNode.style.color = "#0000FF";
					}
				}
				catch (e)
				{
					console.log(e);
				}
			}
			else
			{
				// Uncheck, remove any instances of the unchecked pick.
				// Turn the row white
				t.parentNode.parentNode.style.backgroundColor= "white";
				
				console.log("currentsetting", currentsetting);
				
				for each (var otherspicksid in document.getElementsByClassName(t.className))
				{
					otherspicksid.parentNode.style.color = "#000000";
				}
				
				
				if(currentsetting.length != 0)
				{
					var newpicksstring = "";
					// 17w5816
					var weekwinner = t.value.split('w'); // Week,winner
					// 17w5816,18w5816,
					var listofweeks = currentsetting.split(',');
							
					for each (var mentry in listofweeks)
					{
						var mweekwinner = mentry.split('w');
						if (mweekwinner[0] != weekwinner[0] || mweekwinner[1] != weekwinner[1])
						{
							// Not already in list
							if (newpicksstring.length != 0)
								newpicksstring += ",";
							newpicksstring += mweekwinner[0] + "w" + mweekwinner[1];
						}
						// else do nothing (effectively drop it and any duplicates)...
					}
					
					listofpicksbyconf[lg_index][1] = newpicksstring;			
				}
				else
				{
					console.log("empty currentsetting", listofpicksbyconf.toSource());
				}
				
				// don't need an else.. else we have nothing to remove.
			}
			
			console.log("storeSavedPicks", lg_index, listofpicksbyconf.toSource(), currentsetting);
			// Put it back into the setting
			storeSavedPicks(listofpicksbyconf);
			
		}
//	}
//	catch (e) 
//	{
//		console.log(e);

//	}
	//console.log("not a checkbox?");
}

function handleChangeOld(event)
{
	var t = event.target;

	if (isCheckbox(t))
	{
	
		if(t.checked == true)
		{
			console.log(t.name);
			console.log(t.value);
			var currentsetting = GM_getValue(t.name);

			// could order this with a split and sort.
			// have to do this in order to weed out the repeat
			
			console.log(currentsetting);
			if(typeof currentsetting != 'undefined')
				GM_setValue(t.name,currentsetting+t.value);
			else
				GM_setValue(t.name,t.value);
				
			console.log("saved --> "+GM_getValue(t.name));
		}
		else
		{
			console.log("unchecked");
			// it was unchecked so remove that value from the setting.
			var currentsetting = GM_getValue(t.name);
			if(typeof currentsetting != 'undefined')
			{

				var newpicksstring = "";
				var winner = t.value.split('m')[1];
				var week = t.value.split('w')[1].split('m')[0];
				var listofweeks = currentsetting.split('w');
				listofweeks.shift(); // remove the leading blank
				console.log(winner,week,listofweeks);
						
				for each (var mentry in listofweeks)
				{
					var mwinner = mentry.split('m')[1];
					var mweek = mentry.split('m')[0];
					if (mweek != week || mwinner != winner)
					{
						// Not already in list
						newpicksstring += "w" + mweek + "m" + mwinner;
					}
					// else do nothing (effectively drop it and any duplicates)...
				}
				
				GM_setValue(t.name,newpicksstring);
				console.log("saved --> "+GM_getValue(t.name));
			}
			// don't need an else.. else we have nothing to remove.
		}
	}
}

function isCheckbox(elt)
{
  // tagName requires toUpperCase because of HTML vs XHTML
  return (elt.tagName.toUpperCase() == "INPUT" && elt.type == "checkbox");
}


function output_matchup_constrained(team1id, team2id, team1, output)
{



	//each team
	for(var f=0; f<32; f++)
	{ 
		if (output[f][0] == team2id)
			team2 = f;
	}


				
	if (team1 == -1 || team2 == -1)
	{

		console.log("team1ID:"+team1+" team2ID:" + team2);
		console.log(output);
		return "error";
	}
	
	
	if(output[team2][35] == '' && output[team2][36] == '')
		return "";
				
				
	var expected1 = output[team1][10] / output[team1][7]; 	// T1 avg PF
	expected1 *= output[team2][11] / output[team2][7]; 		// T2 avg PA
	expected1 /= Math.sqrt(output[team1][12] * output[team2][13]);		// geometric mean of T1 OppAvgPA and T2 OppAvgPF
	var expected2 = output[team2][10] / output[team2][7]; 	// T2 avg PF
	expected2 *= output[team1][11] / output[team1][7]; 		// T1 avg PA
	expected2 /= Math.sqrt(output[team2][12] * output[team1][13]);		// geometric mean of T2 OppAvgPA and T1 OppAvgPF
				
	if (expected1 > 255)
		expected1 = 255;
	if (expected2 > 255)
		expected2 = 255;

	
	// pick a winner and loser
	if (expected1 > expected2)
	{
	
		
//		console.log ("team1:" + team1id + output[team1][0]+ " team2:" + team2id +output[team2][0]);

	
	
		// team1 wins
		if(output[team1][35] == "W" && output[team2][36] == "L")
			return "<b>W("+output[team2][26]+")"+ expected1.toFixed() +"-" + expected2.toFixed()+"</b>" ;
		else
			return "";
	}				
	else
	{
		// team1 loses
		if(output[team2][35] == "W" && output[team1][36] == "L")
			return "L("+output[team2][26]+")"+ expected1.toFixed() +"-" + expected2.toFixed() ;
		else
			return  "";	
		
		// if for we can't do the straight up and the opposite is not possible, make it ""
	}
	
	// never get here
	return ""


}


function output_a_prediction(resultLine1, resultLine2) {
	var expected1 = resultLine1[10] / resultLine1[7]; 	// T1 avg PF

	expected1 *= resultLine2[11] / resultLine2[7]; 		// T2 avg PA
	expected1 /= Math.sqrt(resultLine1[12] * resultLine2[13]);		// geometric mean of T1 OppAvgPA and T2 OppAvgPF
	if (expected1 > 255)
		expected1 = 255;
	var expected2 = resultLine2[10] / resultLine2[7]; 	// T2 avg PF
	expected2 *= resultLine1[11] / resultLine1[7]; 		// T1 avg PA
	expected2 /= Math.sqrt(resultLine2[12] * resultLine1[13]);		// geometric mean of T2 OppAvgPA and T1 OppAvgPF
	if (expected2 > 255)
		expected2 = 255;

	// pick a winner and loser
	if (expected2 > expected1) {
		var Winner = resultLine2;
		var Loser = resultLine1;
		var wScore = expected2;
		var lScore = expected1;
	} else {
		var Winner = resultLine1;
		var Loser = resultLine2;
		var wScore = expected1;
		var lScore = expected2;
	}

	// people always complain about teams showing 1 point.  Frankly 2 points is unlikely too,
	// as are 4, 5, and 8 (in GLB).  I just get rid of 1, 4 and 5, and make 2 unlikely.
	if (wScore < 2.0)
		wScore = 0.0;
	if (lScore < 2.0)
		lScore = 0.0;

	// may as well get rid of 4 & 5 too
	if (wScore.toFixed(0)==4 || wScore.toFixed(0)==5) {
		if (wScore < 4.5)
			wScore = 3.0;
		else
			wScore = 6.0;
	}
	if (lScore.toFixed(0)==4 || lScore.toFixed(0)==5) {
		if (lScore < 4.5)
			lScore = 3.0;
		else
			lScore = 6.0;
	}

	// output
	var html = '<table><tr><td>';
	wScore = wScore.toFixed(0);
	lScore = lScore.toFixed(0);
	// output the predicted score
	if (wScore < 100)
		html += '&amp;nbsp;&amp;nbsp;'
	if (wScore < 10)
		html += ' &amp;nbsp;'
	html += wScore + ' - ';
	if (lScore < 100)
		html += '&amp;nbsp;&amp;nbsp;'
	if (lScore < 10)
		html += ' &amp;nbsp;'
	html += lScore;
	
	html += '&amp;nbsp; &amp;nbsp;';

	html += '</td>';
	html += '<td>' + Winner[1]+"("+Winner[26]+")";
	
	if (wScore == lScore)
		html += ' ties ';
	else
		html += ' def. ';
	html += Loser[1]+"("+Loser[26]+")";
	
// 26 should be the overall rank.

	html += '</td></tr></table>';
	location = document.getElementById('rankingsTableNew');
	location.innerHTML += html;
}



//////////////////////////////
//
//  UpdateTheDropDowns
//
//////////////////////////////






function UpdateTheDropDownsSL(output, results, leagueID, weekID)
{

	var select = document.getElementsByTagName("select");
	for (var s=0; s<select.length; s++) 
	{
		// found our select-really there should only be one
		if (select[s].getAttribute("name") == "my_pick") 
		{
			var sel = select[s];
			var selected = sel.value;
				
			for (var i=1; i<sel.options.length; i++) 
			{
				
				// HACK, asssuming nobody have ' over ' in their team name.			

				// team1 is [0] team2 is [1].
				var teams = sel.options[i].innerHTML.split(' over ');

				var teamids = sel.options[i].value.split('_');
				
				var team1 = -1;
				var team2 = -1;
			
				
				//each team
				for(var f=0; f<32; f++)
				{ 

					if (results[f][0] == teamids[1])
						team1 = f;
					if (results[f][0] == teamids[2])
						team2 = f;
				}
				
				if (team1 == -1 || team2 == -1)
					{

						console.log("team1ID:"+team1+" team2ID:" + team2);
						console.log(results);
						continue;
					}
				
			
				var expected1 = results[team1][10] / results[team1][7]; 	// T1 avg PF
				expected1 *= results[team2][11] / results[team2][7]; 		// T2 avg PA
				expected1 /= Math.sqrt(results[team1][12] * results[team2][13]);		// geometric mean of T1 OppAvgPA and T2 OppAvgPF
				var expected2 = results[team2][10] / results[team2][7]; 	// T2 avg PF
				expected2 *= results[team1][11] / results[team1][7]; 		// T1 avg PA
				expected2 /= Math.sqrt(results[team2][12] * results[team1][13]);		// geometric mean of T2 OppAvgPA and T1 OppAvgPF
				
							if (expected1 > 255)
					expected1 = 255;
				if (expected2 > 255)
					expected2 = 255;

				// pick a winner and loser
				var outcometext = 'z_LOSS ';
				if (expected1 > expected2)
					outcometext = 'WIN ';
				
				//find team in other picks list
				// this could be optimized.

				for(var q=0; q<otherspicks.length; q++)
				{ 
					if(otherspicks[q][0] == results[team1][0])
						outcometext = otherspicks[q][1] + " " + outcometext;
				}
				
				
				// now change the select item
				
				if(g_effranks)
				{
				
					var expectedPV1 = parseInt(results[team1][61]);
					var expectedPV2 = parseInt(results[team2][61]);

					expdiff = expectedPV1 - expectedPV2;
					if (expdiff >50)
						expdiff = "<b><font color=\"green\">(" + expdiff + ")</font></b>" ;
					else if (expdiff <-50)
						expdiff = "<b><font color=\"red\">(" + expdiff + ")</font></b>" ;					
				
		
					var temprank1 = parseInt(results[team1][26]);
					
					if (temprank1 < 7)
						temprank1 = "<b><font color=\"blue\">(" + temprank1 + ")</font></b>" ;		
					else if (temprank1 > 24)
						temprank1 = "<b><font color=\"orange\">(" + temprank1 + ")</font></b>" ;						
					else
						temprank1 = "(" + temprank1 + ")" ;		
						
					var temprank2 = parseInt(results[team2][26]);
					
					if (temprank2 < 7)
						temprank2 = "<b><font color=\"blue\">(" + temprank2 + ")</font></b>" ;		
					else if (temprank2 > 24)
						temprank2 = "<b><font color=\"orange\">(" + temprank2 + ")</font></b>" ;						
					else
						temprank2 = "(" + temprank2 + ")" ;		
												
					
					var tempplayers1 = parseInt(results[team1][63]);					
					if (tempplayers1 < 30)
						tempplayers1 = "<b><font color=\"orange\">" + tempplayers1 + "</font></b>" ;		
					else if (tempplayers1 > 50)
						tempplayers1 = "<b><font color=\"blue\">" + tempplayers1 + "</font></b>" ;						
					
					var tempplayers2 = parseInt(results[team2][63]);					
					if (tempplayers2 < 30)
						tempplayers2 = "<b><font color=\"orange\">" + tempplayers2 + "</font></b>" ;		
					else if (tempplayers2 > 50)
						tempplayers2 = "<b><font color=\"blue\">"+ tempplayers2 + "</font></b>" ;						
					
					
								
					console.log("team1 1607", results[team1].toSource());
					console.log("team2 1608", results[team2].toSource());
					
					
					
				
					sel.options[i].innerHTML = outcometext + teams[0] +temprank1;

					if (expected1 > expected2+30)
						sel.options[i].innerHTML += "<b><font color=\"purple\">"+ expected1.toFixed() +" - " + expected2.toFixed()+"</b></font>";
					else	
						sel.options[i].innerHTML += expected1.toFixed() +" - " + expected2.toFixed();
						
					sel.options[i].innerHTML += temprank2 + teams[1] + " -- [" +   expdiff + "]  [" +      "("+results[team1][62]+") " + "("+tempplayers1+"*"+ results[team1][60] +"%) " +expectedPV1 +" - " + expectedPV2 + "("+results[team2][62]+") "  + "("+tempplayers2+"*"+ results[team2][60] +"%) "       + "]";
//					sel.options[i].innerHTML = outcometext + expdiff + " " + teams[0] + "("+results[team1][62]+") " + "("+results[team1][60]+"*"+ results[team1][63] +"%) " +expected1 +" - " + expected2 + "("+results[team2][62]+") "  + "("+results[team2][60]+"*"+ results[team2][63] +"%) "+ teams[1];
				}
				else
				{
					sel.options[i].innerHTML = outcometext + teams[0] + "("+results[team1][26]+") " + expected1.toFixed() +" - " + expected2.toFixed() + "("+results[team2][26]+") "+ teams[1];
				/*		
					results[i][1] = location[0].innerHTML; //Team Name
					results[i][2] = location[1].innerHTML; //blank
					results[i][3] = location[2].innerHTML; //Player Count (non CPU)
					results[i][4] = location[3].innerHTML; //AVG Value (for those players)
					results[i][5] = location[4].innerHTML; //Effective Lvl (for the team)
					results[i][6] = location[5].innerHTML; //chemistry		
					results[i][7] = location[6].innerHTML; //cpu players
					
					
					results[i][60] = location[80].innerHTML; //Player Count (non CPU)
					results[i][61] = location[81].innerHTML; //AVG Value (for those players)
					results[i][62] = location[82].innerHTML; //Effective Lvl (for the team)
					results[i][63] = location[83].innerHTML; //chemistry		
					results[i][64] = location[84].innerHTML; //cpu players	
					
					
									var expected1 = parseInt(results[team1][4]);
				var expected2 = parseInt(results[team2][4]);

				expdiff = expected1 - expected2;
					
					
				*/	
				
				}
				
		


			}

						// alphabetize it
	
			
			for (var i=1; i<sel.options.length-1; i++) {
						for (var j=i+1; j<sel.options.length; j++) {
							var isSelected1 = (sel.options[i].innerHTML).indexOf("_") == 0;
							var isSelected2 = (sel.options[j].innerHTML).indexOf("_") == 0;	
							if (isSelected1 && isSelected2)
							{
								var firstval = (sel.options[i].innerHTML).match(/_+(\d+).*/)[1];
								var secondval = (sel.options[j].innerHTML).match(/_+(\d+).*/)[1];
								
						

								if(parseInt(firstval) < parseInt(secondval))
								{
								var temp = sel.options[i].innerHTML;
								sel.options[i].innerHTML = sel.options[j].innerHTML;
								sel.options[j].innerHTML = temp;

								var temp = sel.options[i].value;
								sel.options[i].value = sel.options[j].value;
								sel.options[j].value = temp;

				

							}
							}
							else if ((sel.options[i].innerHTML).toLowerCase() > (sel.options[j].innerHTML).toLowerCase()) 
							{
								var temp = sel.options[i].innerHTML;
								sel.options[i].innerHTML = sel.options[j].innerHTML;
								sel.options[j].innerHTML = temp;

								var temp = sel.options[i].value;
								sel.options[i].value = sel.options[j].value;
								sel.options[j].value = temp;
							}

							if (sel.options[i].value == selected) {
								sel.selectedIndex = i;
							}
						}
					}


		
		}
	}


}




function UpdateOthersPicksTable(output, results)
{


	var trs = document.getElementById('othersPicks').getElementsByTagName('tr');

	// skip the title
	for (var s=1; s<trs.length; s++) 
	{
		// found our select-really there should only be one
		

		var matchupstring = trs[s].children[2].innerHTML;
	
		// <a href=\"http://glb.warriorgeneral.com/game/compare_teams.pl?team1=" + teams[1] + "&team2=" + teams[2] + "\"> Link </a>";

		var re = /team1=(\d+).*team2=(\d+)/;
		
		var teams = matchupstring.match( re );		

		// to get the results index
		var team1 = '';
		var team2 = '';
		
		//each team in results		
		for(var f=0; f<32; f++)
		{ 

			if (results[f][0] == teams[1])
				team1 = f;
			if (results[f][0] == teams[2])
				team2 = f;
		}

		var expected1 = results[team1][10] / results[team1][7]; 	// T1 avg PF
		expected1 *= results[team2][11] / results[team2][7]; 		// T2 avg PA
		expected1 /= Math.sqrt(results[team1][12] * results[team2][13]);		// geometric mean of T1 OppAvgPA and T2 OppAvgPF
		var expected2 = results[team2][10] / results[team2][7]; 	// T2 avg PF
		expected2 *= results[team1][11] / results[team1][7]; 		// T1 avg PA
		expected2 /= Math.sqrt(results[team2][12] * results[team1][13]);		// geometric mean of T2 OppAvgPA and T1 OppAvgPF
		
		if (expected1 > 255)
			expected1 = 255;
		if (expected2 > 255)
			expected2 = 255;

			
		// Update the pick string
		
		// pick a winner and loser
		var outcometext = 'z_LOSS ';
		
		if (expected1 > expected2)
			trs[s].children[1].innerHTML = "WIN : ";
		else
			trs[s].children[1].innerHTML = "LOSS: ";
			
		trs[s].children[1].innerHTML += "<a href=\"http://glb.warriorgeneral.com/game/team.pl?team_id=" + team1+"\">"+ results[team1][1] +"</a>";
		trs[s].children[1].innerHTML += "("+results[team1][26]+") " + expected1.toFixed() +" - " + expected2.toFixed() + "("+results[team2][26]+") "
		trs[s].children[1].innerHTML += "<a href=\"http://glb.warriorgeneral.com/game/team.pl?team_id=" + team1+"\">"+ results[team2][1] +"</a>";		
	}


}




function UpdateOthersPicksTableNeedPicks(myaddress, weekID){
    console.log("getInetPage : "+myaddress);
    var req = new XMLHttpRequest();
	req.open( 'GET', myaddress, true );
	req.onload = function() {
		if (this.status != 200) 
		{
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+myaddress)

			var tempEditResponse = this.responseText.split("<table cellspacing")[2].split("</table>")[0];
							
					var table = document.createElement("table");
					table.setAttribute('id', 'othersLastWeekPicks');
					tempEditResponse = "<div class=\"medium_head\">Other Agents Picks for Week "+ weekID +"</div><table cellspacing" + tempEditResponse + "</table>";
					
					table.innerHTML = tempEditResponse

				
					var location = document.getElementById('userPicksTemp');
					location.innerHTML += tempEditResponse;
					
												
			}
		};
		
	req.send(null);
	return req;
}



function outputMatchups(results, games) {
	var html = '<br><br>';
	
		html += '<p>[b]NEXT WEEK\'S MATCHUPS[/b]</p>';
		html += '<table><tr><td>[u]Exp Score[/u]</td><td>&amp;nbsp;[u]Matchup[/u]</td></tr></table>';
	
	location = document.getElementById('rankingsTableNew');
	location.innerHTML += html;
	for(var i=0; i<32; i++){ //each team
		// next game
		var j = results[i][6]+1;
		if(games[i][j][3] != '') { // 3 is opponent if the game hasn't been played yet
			for(var k=i+1; k<32; k++){ //find opponent
				if(games[i][j][3] == results[k][0]){ //once opponent is found

					output_a_prediction(results[i],results[k]);
					k=32;
				}
			}
		}
	}




}


//----------------------------------Supporting Functions

function getSurvivor(){

var tempEditResponse;
var tempEditResponse2;

	GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://glb.warriorgeneral.com/game/league_survivor.pl?league_id=' + leagueID,
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
	    onload: function(responseDetails) {



var re = /.*my_pick(.*)<\/select>/;

		tempEditResponse = responseDetails.responseText.split("my_pick\">")[1];
tempEditResponse = tempEditResponse.split("</select>")[0];



tempEditResponse = tempEditResponse.replace("<option value=\"\"></option>","");
tempEditResponse= tempEditResponse.replace(" SELECTED","");
tempEditResponse= tempEditResponse.replace(/<option value=\"\d+_\d+_\d+\">/g,"<input type=\"checkbox\"\/>");
tempEditResponse= tempEditResponse.replace(/<b>/g,"");
tempEditResponse= tempEditResponse.replace(/<\/b>/g,"");
tempEditResponse= tempEditResponse.replace(/ over /g," def\. ");

var winningStrings = tempEditResponse.split("<input type=\"checkbox\"\/>");

location = document.getElementById('rankings');

location.innerHTML += "<hr><br>";


for(var i in winningStrings)
{
if (i!=0)
{
winningStrings[i] = winningStrings[i].replace(/<\/option>/g,"").trim();

if(location.innerHTML.indexOf(winningStrings[i]) != -1)
{
location.innerHTML += "<input type=\"checkbox\" CHECKED\/>" + "  "+ winningStrings[i] + "<br>";

location.innerHTML = location.innerHTML.replace(winningStrings[i] , "<b>"+winningStrings[i]+"</b>");

}
else
{  

location.innerHTML += "<input type=\"checkbox\"\/>" + "  "+ winningStrings[i] + "<br>";
}
}



}

	


				}
	});	






}





function getOverall(teamId){
	GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://glb.warriorgeneral.com/game/compare_teams.pl?team1=' + teamId + '&team2=' + teamId,
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response){
				document.getElementById('rankingTemp').innerHTML = response.responseText;
				var overall = document.getElementById('rankingTemp').getElementsByClassName('rating_bar_fill')[0].innerHTML; 		

				document.getElementById(teamId).getElementsByTagName('td')[1].innerHTML = overall;
				document.getElementById(teamId).getElementsByTagName('td')[1].setAttribute('class', 'completed');
				updateProgressSL();
			}
	});	
}

function updateProgressSL(){
	updateIcon();
	var progress = document.getElementsByClassName('completed');
//	var denom = 2496;
		// 32 for every field  78 fields right now

	var denom = 2496;		
	
	// add 5

	if(g_effranks)	
		denom = 2656;
	
	document.getElementById('progress').innerHTML = 'Getting Rankings: ' + parseInt((progress.length/denom)*100) + '%';
	if(progress.length == denom){ 
		calculateResultsSL();  // call when done pulling the data.
	}
}

function updateIcon(){
	working = document.getElementById('working');
	switch(working.innerHTML){
		case '.': working.innerHTML = '..'; break;
		case '..': working.innerHTML = '...'; break;
		case '...': working.innerHTML = '....'; break;
		case '....': working.innerHTML = '.....'; break;
		case '.....': working.innerHTML = '......'; break;
		case '......': working.innerHTML = '.......'; break;
		case '.......': working.innerHTML = '........'; break;
		case '........': working.innerHTML = '.........'; break;
		default : working.innerHTML = '.'; break;		
	}
}


function getGamesPlayed(){
	record = document.getElementById('conferences').getElementsByTagName('tr')[1].childNodes[5].innerHTML;
	var a = parseInt(record.split('-', 3)[0]);
	var b = parseInt(record.split('-', 3)[1]);
	var c = parseInt(record.split('-', 3)[2]);
	var dataLength = (a + b + c);
	return dataLength;
}



function getTeamPageSL(gamesPlayed, teamId){
	GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://glb.warriorgeneral.com/game/team.pl?team_id=' + teamId,
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response){
				document.getElementById('rankingTemp').innerHTML = response.responseText;
				location = document.getElementById('rankingTemp');				
				var scheduleContent = location.getElementsByClassName('schedule_content');
				var gameCount=0;

				document.getElementById(teamId).getElementsByTagName('td')[4].innerHTML = '';
				document.getElementById(teamId).getElementsByTagName('td')[4].setAttribute('class', 'completed');
				
				
				var chemistry = response.responseText.split("Team Chemistry")[1];
				chemistry = parseInt(chemistry.split("rating_bar_fill rating_bar_fill")[1].split("<\/div")[0].split("\">")[1]);

			
if(g_effranks)
{				
				document.getElementById(teamId).getElementsByTagName('td')[80].innerHTML = chemistry;
				document.getElementById(teamId).getElementsByTagName('td')[80].setAttribute('class', 'completed');
				updateProgressSL();
}				
				
				//get pre-season games if needed	


// change i=0 to i=2 to allow for new data
// add clear for 11
		
	for(var q=6; q<18; q++)
	{
		document.getElementById(teamId).getElementsByTagName('td')[q].innerHTML = '';
		document.getElementById(teamId).getElementsByTagName('td')[q].setAttribute('class', 'completed');
	}	
	updateProgressSL();
				
								// [6] [7] [8] preseason game 1
				// [9] [10] [11] preseason game 2
				// [12] [13] [14] preseason game 3
				// [15] [16] [17] preseason game 4
				
				// Hijack [6] - [17] for other data
				// [6] chemistry
				// [7] AVG Value (for those players)
				// [8] Effective Lvl (for the team)
				// [9] Player Count (non CPU)
				// [10] cpu players
	
				
				// onward is reg season
				// [18] oppID, [19] team1score, [20] team2score
				// ... [63] , [64], [65]
				// [66] ... [80] playoff data
				
				
				
				//load regular season data << this is the default
				var section = 0; //this tells me which section to look				
				if(1){			
					gameCount=4;					
					for (var i=0; i<16; i++){
						var j = 2 + 2*i;
						var k = 18 + 3*i;
						var location = scheduleContent[section].childNodes[1].childNodes[j].childNodes[5].childNodes[0];
						if (location.innerHTML != 'Matchup'){ 
							var gameId = location.href.split('game_id=', 2)[1];
						} else {
							var gameId = '';
						}
						if (gameId != ''){		
							//alert(location.parentNode.parentNode.innerHTML);
							//alert(location.parentNode.parentNode.childNodes[3].innerHTML);
							var temp = location.parentNode.parentNode.childNodes[3];
							if(temp.firstChild.tagName.toUpperCase() == 'SPAN'){
								var team2Id = temp.childNodes[1].href.split('=', 2)[1]; 
							}else{
								var team2Id = temp.firstChild.href.split('=', 2)[1]; 
							}
							var team1Score = parseInt(location.innerHTML.split(' ', 2)[1].split('-', 2)[0]);
							var team2Score = parseInt(location.innerHTML.split(' ', 2)[1].split('-', 2)[1]);
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team2Id;
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team1Score;
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team2Score;
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							gameCount++;
						} else {
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							//alert('3');
							var temp = location.parentNode.parentNode.childNodes[3];
							if(temp.firstChild.tagName.toUpperCase() == 'SPAN'){
								var team2Id = temp.childNodes[1].href.split('=', 2)[1]; 
							}else{
								var team2Id = temp.firstChild.href.split('=', 2)[1]; 
							}
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team2Id; // save this here for next matchup
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						}
						updateProgressSL();
					}
				} else {
					for (var i=0; i<16; i++){
						var k = 18 + 3*i;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						k++;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						k++;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						updateProgressSL();
					}					
				}

				// Don't need playoff data
					for (var i=0; i<4; i++){
						var k = 66 + 3*i;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						k++;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						k++;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						updateProgressSL();
					}
					
				

				//write the gameCount to the table
				document.getElementById(teamId).getElementsByTagName('td')[5].innerHTML = gameCount;
				document.getElementById(teamId).getElementsByTagName('td')[5].setAttribute('class', 'completed');
				updateProgressSL();
				}
	});
}


function getTeamEffLVLPageSL(teamId){
	GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://glb.warriorgeneral.com/game/roster.pl?team_id=' + teamId,
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response)
			{
			
				try
				{
					var tempdiv = document.createElement("div");
					tempdiv.innerHTML = response.responseText.split('<div id="content_contracts')[0].replace(/<img/g,"<div").replace(/\/img/g,"/div>");
		
					var numPlayers = tempdiv.getElementsByClassName("player_name").length;
					var cpuPlayers = tempdiv.getElementsByClassName("cpu").length;
					numPlayers -= cpuPlayers;
				
					tempdiv.innerHTML = "";

					var efflvl = 0;
					var avgval = 0;
					var playercount = 0;
					
					efflvl = response.responseText.split("Avg Player Value")[1];
					avgval = parseInt(efflvl.split("(Effective Lv")[0].split("\">")[1]);

					efflvl = parseInt(efflvl.split("(Effective Lv ")[1].split(")<")[0]);

					playercount = response.responseText.split("Total Player Count")[1];
					playercount = parseInt(playercount.split("(Avg Lv")[0].split("\">")[1]);
				
				}
				catch (e) 
				{
					console.log( response.responseText, e, teamId);
					// kludge for S30 team issues.
					efflvl = 0;
					avgval = 0;
					playercount = 0;
					
				}				
					
					
					document.getElementById(teamId).getElementsByTagName('td')[81].innerHTML = avgval;
					document.getElementById(teamId).getElementsByTagName('td')[81].setAttribute('class', 'completed');
					
					document.getElementById(teamId).getElementsByTagName('td')[82].innerHTML = efflvl;
					document.getElementById(teamId).getElementsByTagName('td')[82].setAttribute('class', 'completed');
					
					document.getElementById(teamId).getElementsByTagName('td')[83].innerHTML = numPlayers;
					document.getElementById(teamId).getElementsByTagName('td')[83].setAttribute('class', 'completed');
					
					document.getElementById(teamId).getElementsByTagName('td')[84].innerHTML = cpuPlayers;
					document.getElementById(teamId).getElementsByTagName('td')[84].setAttribute('class', 'completed');
					
					
									// [6] [7] [8] preseason game 1
					// [9] [10] [11] preseason game 2
					// [12] [13] [14] preseason game 3
					// [15] [16] [17] preseason game 4
					
					// Hijack [6] - [17] for other data
					// [6] chemistry
					// [7] AVG Value (for those players)
					// [8] Effective Lvl (for the team)
					// [9] Player Count (non CPU)
					// [10] cpu players
		
					
					
					
					
					updateProgressSL();

			}
	});
}




function getLeaguePageThenGatherData(){

	GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://glb.warriorgeneral.com/game/league.pl?league_id='+ leagueID,
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response)
			{
document.getElementById('newDocumentTemp').innerHTML = response.responseText;

gatherDataSL();

			}
	});
}

