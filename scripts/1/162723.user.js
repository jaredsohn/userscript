// ==UserScript==
// @name           WeeklySurvivorRankings_V03
// @namespace      glb.warriorgeneral.com
// @include        http://goallineblitz.com/game/leagues.pl
// @include        http://glb.warriorgeneral.com/game/leagues.pl
// ==/UserScript==


window.setTimeout(function() {	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////
	////////////   Survivor Rankings
	////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var mydiv = document.createElement("div");
    var text = document.createTextNode( "Weekly Survivors Rankings Script: " );
	mydiv.appendChild(text);
	
	var WeekSelect = document.createElement('select');
	WeekSelect.id = 'WeekSel';
	var blankop2 = document.createElement('option');
	blankop2.value = 0;
	blankop2.innerHTML = '';
	WeekSelect.appendChild(blankop2);

	for (i=1; i <= 21; i++) {
		var op = document.createElement('option');
		op.value = i;
		op.innerHTML = i;
		WeekSelect.appendChild(op);
	}
    var text = document.createTextNode( " Week: " );
	mydiv.appendChild(text);
	mydiv.appendChild(WeekSelect);

	//	var content = document.getElementById("content");
	//	content.insertBefore(WeekSelect,content.firstChild.nextSibling.nextSibling.nextSibling);	
	
	var DepthSelect = document.createElement('select');
	DepthSelect.id = 'DepthSel';
	var blankop2 = document.createElement('option');
	blankop2.value = 0;
	blankop2.innerHTML = '';
	DepthSelect.appendChild(blankop2);

	
	for (i=-1; i <= 5; i++) {
		var op = document.createElement('option');
		op.value = i;
		op.innerHTML = i;
		DepthSelect.appendChild(op);
	}
    var text = document.createTextNode( " Winner Depth: " );
	mydiv.appendChild(text);	
	mydiv.appendChild(DepthSelect);

	
	var CutOffSelect = document.createElement('select');
	CutOffSelect.id = 'CutOffSel';
	var blankop2 = document.createElement('option');
	blankop2.value = 0;
	blankop2.innerHTML = '';
	CutOffSelect.appendChild(blankop2);

	
	for (i=1; i <= 20; i++) {
		var op = document.createElement('option');
		op.value = i;
		op.innerHTML = i;
		CutOffSelect.appendChild(op);
	}
    var text = document.createTextNode( " CutOff: " );
	mydiv.appendChild(text);	
	mydiv.appendChild(CutOffSelect);
	
	var button = document.createElement("input");
    button.setAttribute("value","Survivor EffRP Rankings");
    button.setAttribute("type","button");
    button.setAttribute("id","sSWbutton");
    button.addEventListener("click",mainSurvWinner,false);    
	mydiv.appendChild(button);
	//	var content = document.getElementById("content");
	//	content.insertBefore(button,content.firstChild.nextSibling.nextSibling.nextSibling);
	
		    var cb = document.createElement( "input" );
        cb.type = "checkbox";
		cb.className = "debugModeSW";
        cb.checked = false;
        var text = document.createTextNode( "Debug Mode" );
		mydiv.appendChild(text);
		mydiv.appendChild(cb);
		
		

	
	var content = document.getElementById("content");	
	content.insertBefore(mydiv,content.firstChild.nextSibling.nextSibling.nextSibling);

	
	
	
	//build a div to put in the location
	var div = document.createElement('div');
	div.setAttribute('id', 'SurvRankings');

	var	location = document.getElementById('content');
	location.insertBefore(div,location.firstChild);

	location = document.getElementById('SurvRankings');
	
	// add async stuff
	
	var div = document.createElement('div');
	div.setAttribute('id', 'SurvRankingInput');
	content.appendChild(div);


	//build a div to store the data temporarily
	div = document.createElement('div');
	div.setAttribute('id', 'SurvRankingData');
	div.setAttribute("style","visibility: hidden; display:none;");
	content.appendChild(div);


	
}, 1000);

var links = [];
var listofusers = [];
var lsrvstr = "http://glb.warriorgeneral.com/game/league_survivor.pl?league_id=";
var lgstr = "http://glb.warriorgeneral.com/game/league.pl?league_id=";
var ustphystr = "http://glb.warriorgeneral.com/game/home.pl?user_id=";
var usrsrvstr = "http://glb.warriorgeneral.com/game/user_survivor.pl?user_id="

var s28links = [280,83,5,11,17,15,13,1,9,2,3,4,6,7,8,10,12,14,16,18,26,41,42,43,44,45,38,39,103,137,138,145,99,100,101,102,37,156,171,203,204,205,111,112,113,114,153,154,157,158,184,188,201,202,231,242,65,66,67,68,69,70,71,72,73,74,55,224,189,190,191,75,76,77,78,211,234,212,235,213,236,214,237,215,216,24,20,32,33,34,36,51,35,50,152,48,151,227,108,225,259,263,264,265,155,161,162,165,110,144,243,245];
var s29lowerlinks = [111,112,113,114,153,158,184,188,201,202,231,242,65,66,67,68,69,70,71,72,73,74,55,224,189,190,191,75,76,234,212,235,213,236,214,237,215,216,155,161,162,110,144,243,245];


// rankings globals
var stopsign = false;
var g_ranks = true;
var g_nextdelay = 7000;

var realListOfUsers1 = [];
var listOusers1 = [];

var listofconfs = new Array();
var listofusers = new Array();

var g_Week = 5;
var g_Depth = 1;
var g_Winners_Week = 5;
var g_denom = 24960; // 2496;	
var g_conferencesNum = 0;

//===================================================================================================================
// =====                  Survivor Winnners
//===================================================================================================================

// total number of winslots to fill 
var g_slotstodisplay = 1;
// max number of winners before we consolidate into a X users tied.. statement
var g_maxwinners = 5;
var allweeksmode = false;

function mainSurvWinner() 
{
	
	
	if( parseInt(document.getElementById('WeekSel').value))
		g_Winners_Week = parseInt(document.getElementById('WeekSel').value);
	
	if( parseInt(document.getElementById('DepthSel').value))
		g_slotstodisplay = parseInt(document.getElementById('DepthSel').value);

	if( parseInt(document.getElementById('CutOffSel').value))
		g_maxwinners = parseInt(document.getElementById('CutOffSel').value);
		
	console.log("Starting Week - " + g_Winners_Week);
	
		document.getElementById("sSWbutton").disabled = true;
	
		for each (var l in document.links) {
			var lgid = parseInt(l.toString().split("league_id=")[1]);
			if (isNaN(lgid) == true) continue;
			
			if (links.indexOf(lgid) == -1) {
				links.push(lgid);
			}
		
	}

	if(document.getElementsByClassName('debugModeSW')[0].checked == true)
		links=[280,188,112];


//		links=[280,188,112,158,184, 24, 4, 8,259,265, 212, 66];

	g_denom = links.length*g_Winners_Week;
	g_conferencesNum = links.length;

	
	
		//clear the SurvRankingInput and give the user progress feedback
	document.getElementById('SurvRankingInput').innerHTML = '<span id="progress">Getting Rankings: 0%</span><span id="working">.</span>';	
	
	//build a table in SurvRankingData
	location = document.getElementById('SurvRankingData');
	
	var table = document.createElement('table');
	table.setAttribute('id', 'SurvRankingDataTable');
	location.appendChild(table);
	
	location = document.getElementById('SurvRankingDataTable');

	// Set up the SurvRankingDataTable (where we store everything)...
	for(var i=0; i<g_conferencesNum; i++)
	{
		tr = document.createElement('tr');
		tr.style.borderStyle="solid";
		tr.id = links[i];
		location.appendChild(tr);
		tr = location.getElementsByTagName('tr')[i];		
				
		// Set up the columns in the table...
		// One column for each week
		
//		for(var j=0; j<78; j++)
		for(var j=0; j<=g_Winners_Week; j++)
		{
			var td = document.createElement('td');
			td.innerHTML = '';
			tr.appendChild(td);
		}
	}
	
	
	
	forkhandleSurvWinner(links);
	
	/*
	
    for (var i=0; i< g_conferencesNum; i++) 
	{
		for (var j=0; j<=g_Winners_Week; j++)
		{
		
			window.setTimeout(handleSurvWinner, 5000, j, links[i]); 
		}
    }
	
	*/

//	GetSurvWinners(listofconfs, listofusers, 1,  g_Winners_Week, links);
}



function forkhandleSurvWinner(my_links)
{
	if(my_links.length > 0)
	{
		for (var j=0; j<=g_Winners_Week; j++)
		{
			handleSurvWinner(j, my_links[0]);
		}

		// wait 10 seconds then start the next conference
		window.setTimeout(forkhandleSurvWinner, 50*g_Winners_Week, my_links.slice(1)); 
	}
}




var getsurvwinners_S28output = "World League,280,280,15,37658,buffalobills_tw,1,280,13,57194,mstrbtngbear,2,280,12,228269,reddogrw,3,African Pro League,83,83,18,174877,Landrys Legacy,1,83,17,183441,NtropiK,2,83,17,236193,patrickrobe,2,83,16,21964,HaplosDog,3,83,16,88380,.spider.,3,Canadian Pro League,5,5,18,173019,kswetnam,1,5,17,37577,Veracocha,2,5,17,64857,Little M,2,5,17,91676,queenbee,2,5,16,41603,jayman,3,5,16,64412,dboys194,3,5,16,184607,Wicked_Cthulhu,3,Eastern Europe Pro League,11,11,17,234954,cheese sandwich,1,11,17,423597,tigerbloodwinning,1,11,16,32652,Outlaw Dogs,2,11,16,372561,Ravens26,2,11,15,183441,NtropiK,3,Oceania Pro League,17,17,17,21576,daryls61,1,17,17,21964,HaplosDog,1,17,17,41603,jayman,1,17,17,173019,kswetnam,1,17,16,930,aceinthehouse,2,17,15,22160,ShakeNBake,3,17,15,35668,kdunkin,3,17,15,113703,nycdude,3,17,15,216461,Bluehaze,3,South America Pro League,15,15,16,10784,gRryNn,1,15,16,35629,Turner3233,1,15,16,62959,glink,1,15,16,149047,rcopromo,1,15,16,201382,Sugar Kapaa,1,15,15,930,aceinthehouse,2,15,15,31070,sceri,2,15,15,43499,sewinston,2,15,15,64351,Sockamidic,2,15,15,64857,Little M,2,15,15,161061,Rowdie,2,15,15,366775,mstackpole,2,15,14,236316,danielbateman,3,15,14,179043,20dolla,3,15,14,391243,DA KING of KINGS,3,15,14,234954,cheese sandwich,3,Southeast Asia Pro League,13,13,19,113703,nycdude,1,13,18,21964,HaplosDog,2,13,18,64351,Sockamidic,2,13,18,80306,Emy,2,13,18,173019,kswetnam,2,13,17,35523,sanmantodd,3,13,17,37658,buffalobills_tw,3,13,17,82385,slashxtreme,3,13,17,234954,cheese sandwich,3,USA Pro League,1,1,18,133867,Crash.0,1,1,17,930,aceinthehouse,2,1,17,21576,daryls61,2,1,17,35629,Turner3233,2,1,17,74797,The Ape,2,1,17,192280,merenoise,2,1,17,251389,Mad LBer 41,2,1,16,216461,Bluehaze,3,Western Europe Pro League,9,9,16,237440,Kloz,1,9,14,161061,Rowdie,2,9,13,21964,HaplosDog,3,9,13,199935,Rocky Redskin,3,Regional Pro Elite #1,2,2,17,10040,jpjn94,1,2,17,234962,sborats,1,2,16,930,aceinthehouse,2,2,14,174877,Landrys Legacy,3,2,14,293962,iliketowin,3,Regional Pro Competitive #2,3,3,18,37577,Veracocha,1,3,18,57194,mstrbtngbear,1,3,18,407879,Scottie Johnson,1,3,17,37658,buffalobills_tw,2,3,16,10040,jpjn94,3,3,16,34330,gtinker63,3,3,16,88380,.spider.,3,Regional Pro Competitive #3,4,4,11,43499,sewinston,1,4,10,930,aceinthehouse,2,4,10,88380,.spider.,2,4,10,121279,WalterManning,2,4,10,161061,Rowdie,2,4,10,205520,Havo,2,4,10,234207,Rabid Monty,2,4,10,261465,buttstinky,2,4,10,368518,lexden11,2,4,9,64857,Little M,3,4,9,236316,danielbateman,3,4,9,34330,gtinker63,3,4,9,126547,blitzboy,3,Regional Pro Competitive #4,6,6,20,337344,chopper409,1,6,19,133867,Crash.0,2,6,19,21576,daryls61,2,6,19,113703,nycdude,2,6,18,368518,lexden11,3,6,18,234207,Rabid Monty,3,6,18,930,aceinthehouse,3,6,18,161061,Rowdie,3,6,18,36567,hornyeskimo,3,Regional Pro Competitive #5,7,7,16,88380,.spider.,1,7,15,173019,kswetnam,2,7,14,391243,DA KING of KINGS,3,Regional Pro Competitive #6,8,8,20,82385,slashxtreme,1,8,19,57194,mstrbtngbear,2,8,19,126547,blitzboy,2,8,17,88380,.spider.,3,8,17,323639,ltsply2,3,Regional Pro League #7,10,10,18,37658,buffalobills_tw,1,10,18,57194,mstrbtngbear,1,10,18,113703,nycdude,1,10,18,137614,pwoo10,1,10,18,323639,ltsply2,1,10,18,337344,chopper409,1,10,17,234962,sborats,2,10,15,274337,jalvin,3,Regional Pro League #8,12,12,15,34330,gtinker63,1,12,15,35668,kdunkin,1,12,15,133867,Crash.0,1,12,15,234962,sborats,1,12,15,337344,chopper409,1,12,14,274337,jalvin,2,12,14,323639,ltsply2,2,12,12,43499,sewinston,3,Regional Pro League #9,14,14,17,368518,lexden11,1,14,16,173114,beersy,2,14,16,293962,iliketowin,2,14,14,337344,chopper409,3,Semi Pro Elite #1,26,26,15,35668,kdunkin,1,26,15,234207,Rabid Monty,1,26,8,237440,Kloz,2,26,2,43499,sewinston,3,26,2,34330,gtinker63,3,26,2,21576,daryls61,3,26,2,111578,WestSideR,3,26,2,368518,lexden11,3,26,2,37658,buffalobills_tw,3,26,2,74614,peteyskugog,3,26,2,43790,Sapper06,3,26,2,293962,iliketowin,3,26,2,415516,C17Ajax,3,26,2,391243,DA KING of KINGS,3,26,2,930,aceinthehouse,3,26,2,412147,GrEeN-MaFiA-KiLlA,3,26,2,133867,Crash.0,3,26,2,126547,blitzboy,3,26,2,260273,AC,3,26,2,15047,bdnannac,3,Semi Pro Elite #2,41,41,17,10040,jpjn94,1,41,17,280816,mowenumdown,1,41,16,930,aceinthehouse,2,41,16,21576,daryls61,2,41,16,102494,mhayes,2,41,16,261465,buttstinky,2,41,15,411536,Johnny Ringo17,3,Semi Pro Competitive #3,42,,Semi Pro Competitive #4,43,,Semi Pro League #5,44,,Semi Pro League #6,45,,National Minor Elite #1,38,38,16,368518,lexden11,1,38,15,670,godgib,2,38,14,126547,blitzboy,3,38,14,234207,Rabid Monty,3,National Minor Competitive #2,39,39,10,37658,buffalobills_tw,1,39,5,15047,bdnannac,2,39,5,43499,sewinston,2,39,5,176536,Thundercat_12,2,39,5,237440,Kloz,2,39,4,102494,mhayes,3,39,4,670,godgib,3,39,4,133610,sektor,3,39,4,234207,Rabid Monty,3,39,4,930,aceinthehouse,3,39,4,133867,Crash.0,3,39,4,142863,NUNYO,3,39,4,5066,QBall13,3,39,4,10040,jpjn94,3,39,4,113703,nycdude,3,39,4,21576,daryls61,3,National Minor League #3,103,103,19,337344,chopper409,1,103,16,32652,Outlaw Dogs,2,103,16,413951,dahman32,2,103,13,234207,Rabid Monty,3,Regional Minor Elite #1,99,99,12,342839,MoW,1,99,11,11995,monkeybutt,2,99,10,337344,chopper409,3,Regional Minor Elite #2,100,100,17,173114,beersy,1,100,17,421422,Megacrack,1,100,15,418875,BrunoFlu,2,100,8,234207,Rabid Monty,3,Regional Minor Competitive #3,101,101,17,10040,jpjn94,1,101,17,21576,daryls61,1,101,17,259855,Vuijox,1,101,17,414408,rooke,1,101,13,930,aceinthehouse,2,101,13,133867,Crash.0,2,101,12,234207,Rabid Monty,3,101,12,337344,chopper409,3,Regional Minor League #4,102,102,12,415516,C17Ajax,1,102,11,293962,iliketowin,2,102,11,337344,chopper409,2,102,10,43499,sewinston,3,102,10,234207,Rabid Monty,3,University Elite #1,37,37,12,366775,mstackpole,1,37,11,337344,chopper409,2,37,7,14995,sharks87,3,37,7,391243,DA KING of KINGS,3,University Competitive #2,156,156,18,126547,blitzboy,1,156,18,234207,Rabid Monty,1,156,17,930,aceinthehouse,2,156,17,10040,jpjn94,2,156,14,216461,Bluehaze,3,University Competitive #3,171,171,13,311918,home field advantage,1,171,12,113703,nycdude,2,171,8,293962,iliketowin,3,University League #4,203,203,17,234207,Rabid Monty,1,203,13,311918,home field advantage,2,203,10,137614,pwoo10,3,University League #5,204,204,15,35668,kdunkin,1,204,12,126547,blitzboy,2,204,12,234207,Rabid Monty,2,204,12,420509,windfire,2,204,9,10040,jpjn94,3,Prep Competitive #1,111,111,19,126547,blitzboy,1,111,16,413951,dahman32,2,111,13,21270,rekcuf,3,111,13,311918,home field advantage,3,Prep Competitive #2,112,112,17,341178,snowtrucks09,1,112,16,15128,Sequtugh,2,112,12,113703,nycdude,3,112,12,293962,iliketowin,3,Prep Competitive #3,113,113,18,216461,Bluehaze,1,113,17,126547,blitzboy,2,113,16,234207,Rabid Monty,3,Prep League #4,114,114,14,930,aceinthehouse,1,114,13,34330,gtinker63,2,114,12,10040,jpjn94,3,114,12,15128,Sequtugh,3,Prep League #5,153,153,16,930,aceinthehouse,1,153,16,10040,jpjn94,1,153,16,234207,Rabid Monty,1,153,13,342839,MoW,2,153,12,15128,Sequtugh,3,153,12,113703,nycdude,3,Rookie League #1,158,158,17,14995,sharks87,1,158,16,414408,rooke,2,158,7,199935,Rocky Redskin,3,158,7,234207,Rabid Monty,3,Rookie League #2,184,184,16,930,aceinthehouse,1,184,15,247866,dallas10121,2,184,14,10040,jpjn94,3,Rookie League #3,188,188,7,165455,fuzzypoopy,1,188,5,70518,lebron jam24,2,188,5,293962,iliketowin,2,188,3,43499,sewinston,3,188,3,311918,home field advantage,3,Rookie League #4,201,201,17,414408,rooke,1,201,14,14995,sharks87,2,201,10,15822,MrPereira,3,201,10,43499,sewinston,3,Rookie League #5,202,202,6,414408,rooke,1,202,4,126547,blitzboy,2,202,3,930,aceinthehouse,3,202,3,10040,jpjn94,3,202,3,51674,schneidsm,3,202,3,133610,sektor,3,202,3,311918,home field advantage,3,Rookie League #6,231,231,7,293962,iliketowin,1,231,5,43499,sewinston,2,231,5,234207,Rabid Monty,2,231,5,256666,Danny7185,2,231,5,391243,DA KING of KINGS,2,231,3,311918,home field advantage,3,231,3,133610,sektor,3,231,3,414138,sexybaby,3,231,3,10040,jpjn94,3,231,3,414408,rooke,3,231,3,11995,monkeybutt,3,231,3,930,aceinthehouse,3,231,3,101734,dencon156,3,231,3,5066,QBall13,3,Rookie League #7,242,242,15,251389,Mad LBer 41,1,242,13,234207,Rabid Monty,2,242,13,251109,jace0221,2,242,13,414408,rooke,2,242,12,930,aceinthehouse,3,242,12,10040,jpjn94,3,Rookie-Soph D League #1,65,65,9,8921,Robbnva,1,65,6,213257,Big Poppa,2,65,6,311918,home field advantage,2,65,5,930,aceinthehouse,3,Rookie-Soph D League #2,66,66,6,234207,Rabid Monty,1,66,3,74614,peteyskugog,2,66,2,311918,home field advantage,3,66,2,930,aceinthehouse,3,66,2,113703,nycdude,3,66,2,10040,jpjn94,3,66,2,133610,sektor,3,Rookie-Soph D League #3,67,67,10,930,aceinthehouse,1,67,7,293962,iliketowin,2,67,2,43499,sewinston,3,67,2,311918,home field advantage,3,67,2,113703,nycdude,3,Rookie-Soph D League #4,68,68,4,930,aceinthehouse,1,68,4,10040,jpjn94,1,68,4,43499,sewinston,1,68,4,126547,blitzboy,1,68,4,133610,sektor,1,68,4,234207,Rabid Monty,1,68,4,293962,iliketowin,1,68,4,311918,home field advantage,1,68,3,410364,DATKID,2,68,1,121450,Buletpruf,3,68,1,36567,hornyeskimo,3,68,1,95643,ChrisGiles,3,68,1,57194,mstrbtngbear,3,Rookie-Soph D League #5,69,69,11,293962,iliketowin,1,69,8,10040,jpjn94,2,69,8,74614,peteyskugog,2,69,5,930,aceinthehouse,3,69,5,133610,sektor,3,Rookie-Soph D League #6,70,70,3,126547,blitzboy,1,70,3,311918,home field advantage,1,70,3,414134,chefxxx,1,70,1,293962,iliketowin,2,70,1,36567,hornyeskimo,2,70,1,113703,nycdude,2,70,1,57194,mstrbtngbear,2,Rookie-Soph D League #7,71,71,5,930,aceinthehouse,1,71,1,36567,hornyeskimo,2,71,1,43499,sewinston,2,71,1,126547,blitzboy,2,71,1,57194,mstrbtngbear,2,71,1,234207,Rabid Monty,2,71,1,10040,jpjn94,2,71,1,5066,QBall13,2,Rookie-Soph D League #8,72,72,8,311918,home field advantage,1,72,4,930,aceinthehouse,2,72,4,10040,jpjn94,2,72,4,43499,sewinston,2,72,4,126547,blitzboy,2,72,4,133610,sektor,2,72,4,234207,Rabid Monty,2,72,4,269728,mikeyrocksck,2,72,1,36567,hornyeskimo,3,Rookie-Soph D League #9,73,73,5,234207,Rabid Monty,1,73,5,311918,home field advantage,1,73,4,930,aceinthehouse,2,73,4,5066,QBall13,2,73,4,10040,jpjn94,2,73,4,133610,sektor,2,73,3,113703,nycdude,3,73,3,293962,iliketowin,3,Rookie-Soph D League #10,74,74,12,293962,iliketowin,1,74,6,930,aceinthehouse,2,74,6,10040,jpjn94,2,74,6,43499,sewinston,2,74,6,122391,mdterpsrock3,2,74,6,126547,blitzboy,2,74,6,133610,sektor,2,74,6,234207,Rabid Monty,2,74,1,36567,hornyeskimo,3,74,1,113703,nycdude,3,74,1,199723,AntJenks,3,74,1,57194,mstrbtngbear,3,Prep D League #1,55,55,8,234207,Rabid Monty,1,55,5,293962,iliketowin,2,55,3,113703,nycdude,3,Prep D League #2,224,224,5,293962,iliketowin,1,224,3,126547,blitzboy,2,224,2,311918,home field advantage,3,224,2,234207,Rabid Monty,3,224,2,930,aceinthehouse,3,224,2,10040,jpjn94,3,224,2,133610,sektor,3,University D League #1,189,189,7,113703,nycdude,1,189,7,133610,sektor,1,189,7,234207,Rabid Monty,1,189,4,930,aceinthehouse,2,189,4,5066,QBall13,2,189,4,10040,jpjn94,2,189,4,311918,home field advantage,2,189,1,293962,iliketowin,3,189,1,57194,mstrbtngbear,3,University D League #2,190,190,3,43499,sewinston,1,190,2,311918,home field advantage,2,190,2,126547,blitzboy,2,190,1,293962,iliketowin,3,Local Minor D League #1,191,191,7,74614,peteyskugog,1,191,6,43499,sewinston,2,191,3,237440,Kloz,3,191,3,930,aceinthehouse,3,191,3,10040,jpjn94,3,191,3,133610,sektor,3,191,3,5066,QBall13,3,191,3,126547,blitzboy,3,Regional Minor D League #1,75,75,1,311918,home field advantage,1,75,1,36567,hornyeskimo,1,75,1,133610,sektor,1,75,1,930,aceinthehouse,1,75,1,113703,nycdude,1,75,1,126547,blitzboy,1,75,1,122288,thomdunco32,1,75,1,410364,DATKID,1,75,1,234207,Rabid Monty,1,75,1,10040,jpjn94,1,75,1,5066,QBall13,1,National Minor D League #1,76,76,8,293962,iliketowin,1,76,5,10040,jpjn94,2,76,5,133610,sektor,2,76,5,208470,sportzdude1,2,76,5,338460,green_eggs_and_ham,2,76,5,347123,Im it 008,2,76,5,358656,Hookem horns 2011,2,76,5,372558,Broncoswin,2,76,4,339535,Pro vs joe,3,Semi Pro D League #1,77,77,9,261465,buttstinky,1,77,8,930,aceinthehouse,2,77,8,10040,jpjn94,2,77,8,231594,sportzdude3,2,77,8,234207,Rabid Monty,2,77,8,338486,ed reed is the best,2,77,7,133610,sektor,3,77,7,237440,Kloz,3,77,7,285059,Organized_Chaos,3,77,7,311918,home field advantage,3,Regional Pro D League #1,78,78,17,74614,peteyskugog,1,78,15,237440,Kloz,2,78,12,407879,Scottie Johnson,3,Pee Wee Gold League,211,211,15,64412,dboys194,1,211,14,234207,Rabid Monty,2,211,13,100105,xsujx,3,Pee Wee Copper League #1,234,234,11,293962,iliketowin,1,234,8,126547,blitzboy,2,234,6,43499,sewinston,3,Pee Wee Silver League #1,212,212,18,169706,Burns1221,1,212,9,234207,Rabid Monty,2,212,9,293962,iliketowin,2,212,5,311918,home field advantage,3,Pee Wee Copper League #2,235,235,7,133610,sektor,1,235,6,113703,nycdude,2,235,6,169706,Burns1221,2,235,5,930,aceinthehouse,3,235,5,10040,jpjn94,3,235,5,43499,sewinston,3,235,5,234207,Rabid Monty,3,Pee Wee Silver League #2,213,213,16,426062,The_Joker_9,1,213,14,366111,Honey Badger,2,213,7,43499,sewinston,3,Pee Wee Copper League #3,236,236,13,368518,lexden11,1,236,10,43499,sewinston,2,236,9,133610,sektor,3,Pee Wee Silver League #3,214,214,15,126547,blitzboy,1,214,13,293962,iliketowin,2,214,13,368518,lexden11,2,214,9,10040,jpjn94,3,214,9,311918,home field advantage,3,Pee Wee Copper League #4,237,237,14,30908,Wutzke,1,237,12,169706,Burns1221,2,237,11,10040,jpjn94,3,Pee Wee Silver League #4,215,215,16,169706,Burns1221,1,215,13,274337,jalvin,2,215,13,366111,Honey Badger,2,215,11,930,aceinthehouse,3,215,11,15047,bdnannac,3,215,11,234207,Rabid Monty,3,Pee Wee Silver League #5,216,216,11,293962,iliketowin,1,216,4,930,aceinthehouse,2,216,4,10040,jpjn94,2,216,4,76855,carumba10,2,216,4,126547,blitzboy,2,216,4,133610,sektor,2,216,4,234207,Rabid Monty,2,216,4,311918,home field advantage,2,216,3,391243,DA KING of KINGS,3,216,3,43499,sewinston,3,216,3,260273,AC,3,Casual Pro League,24,24,16,338486,ed reed is the best,1,24,14,74614,peteyskugog,2,24,14,100105,xsujx,2,24,14,338460,green_eggs_and_ham,2,24,12,285059,Organized_Chaos,3,Regional Pro Casual Elite #1,20,20,9,293962,iliketowin,1,20,9,313806,pierjam,1,20,8,16093,Ketze55,2,20,7,43499,sewinston,3,Regional Pro Casual Elite #2,32,32,18,74614,peteyskugog,1,32,15,423880,simoto,2,32,8,43499,sewinston,3,32,8,236316,danielbateman,3,32,8,337344,chopper409,3,Regional Pro Casual Competitive #3,33,33,18,57194,mstrbtngbear,1,33,17,930,aceinthehouse,2,33,17,410361,DaAmazingBeast,2,33,15,34330,gtinker63,3,33,15,234207,Rabid Monty,3,Regional Pro Casual Competitive #4,34,34,18,323639,ltsply2,1,34,17,57194,mstrbtngbear,2,34,16,234954,cheese sandwich,3,Regional Pro Casual #5,36,36,18,36567,hornyeskimo,1,36,18,113703,nycdude,1,36,18,234207,Rabid Monty,1,36,18,337344,chopper409,1,36,17,313806,pierjam,2,36,14,10040,jpjn94,3,36,14,323639,ltsply2,3,Semi Pro Casual Elite #1,35,35,18,74614,peteyskugog,1,35,15,167483,LionFan 54,2,35,14,274337,jalvin,3,Semi Pro Casual Competitive #2,50,50,4,337344,chopper409,1,50,3,267482,chancepli,2,50,3,261465,buttstinky,2,50,3,161061,Rowdie,2,50,3,234207,Rabid Monty,2,50,3,10040,jpjn94,2,50,3,133610,sektor,2,50,3,341170,gators10,2,50,3,293962,iliketowin,2,50,3,930,aceinthehouse,2,50,2,36567,hornyeskimo,3,50,2,113703,nycdude,3,Semi Pro Casual #3,152,,National Minor Casual Elite #1,48,48,19,213257,Big Poppa,1,48,17,126547,blitzboy,2,48,14,234207,Rabid Monty,3,48,14,337344,chopper409,3,National Minor Casual #2,151,151,17,930,aceinthehouse,1,151,17,113703,nycdude,1,151,17,299160,Amboy Duke,1,151,17,411388,duncan3310,1,151,14,391243,DA KING of KINGS,2,151,13,100105,xsujx,3,151,13,275693,rlhaggard21,3,151,13,280816,mowenumdown,3,Regional Minor Casual Elite #1,108,108,15,228472,kidhammerhead,1,108,14,415516,C17Ajax,2,108,12,930,aceinthehouse,3,108,12,10040,jpjn94,3,Regional Minor Casual Competitive #2,225,225,12,289578,terripans09,1,225,10,293962,iliketowin,2,225,6,311918,home field advantage,3,University Casual Elite #1,263,263,18,4064,Zickzack,1,263,18,37114,CTEC04,1,263,15,930,aceinthehouse,2,263,15,173114,beersy,2,263,14,10040,jpjn94,3,263,14,418875,BrunoFlu,3,University Casual Competitive #2,264,264,17,930,aceinthehouse,1,264,17,113703,nycdude,1,264,17,126547,blitzboy,1,264,17,234207,Rabid Monty,1,264,16,32652,Outlaw Dogs,2,264,15,82385,slashxtreme,3,University Casual #3,265,265,13,10040,jpjn94,1,265,12,930,aceinthehouse,2,265,9,391243,DA KING of KINGS,3,Prep Casual Competitive #1,155,155,15,213257,Big Poppa,1,155,12,293962,iliketowin,2,155,10,43499,sewinston,3,155,10,322270,rat48rat,3,Prep Casual Competitive #2,161,161,14,274337,jalvin,1,161,11,173114,beersy,2,161,11,234207,Rabid Monty,2,161,10,43499,sewinston,3,Prep Casual #3,162,162,17,34330,gtinker63,1,162,16,293962,iliketowin,2,162,11,423587,DeadGuy,3,Rookie Casual #1,110,110,9,10040,jpjn94,1,110,9,100105,xsujx,1,110,7,234207,Rabid Monty,2,110,7,213257,Big Poppa,2,110,7,133610,sektor,2,110,7,341178,snowtrucks09,2,110,7,289578,terripans09,2,110,7,126547,blitzboy,2,110,7,930,aceinthehouse,2,110,6,293962,iliketowin,3,110,6,113703,nycdude,3,Rookie Casual #2,144,144,13,234207,Rabid Monty,1,144,10,10040,jpjn94,2,144,10,126547,blitzboy,2,144,9,930,aceinthehouse,3,144,9,4064,Zickzack,3,144,9,43499,sewinston,3,144,9,391243,DA KING of KINGS,3,Rookie Casual #3,243,243,14,425287,TheWassy,1,243,10,43499,sewinston,2,243,8,113703,nycdude,3,Rookie Casual #4,245,245,14,423597,tigerbloodwinning,1,245,12,293962,iliketowin,2,245,10,43499,sewinston,3"; 
/*
s30 output: 
[[["World League", 280], [[280, 13, 139943, "chazno", 1], [280, 13, 415516, "C17Ajax", 1], [280, 12, 14995, "sharks87", 2], [280, 12, 16315, "twong1987", 2], [280, 12, 343980, "mattras", 2], [280, 11, 10040, "jpjn94", 3], [280, 10, 91676, "queenbee", 4], [280, 10, 124057, "zoso", 4], [280, 10, 128051, "moepoker", 4], [280, 10, 304983, "snakes22", 4], [280, 10, 351731, "fogie55", 4], [280, 9, 36567, "hornyeskimo", 5], [280, 9, 173019, "kswetnam", 5], [280, 9, 337344, "chopper409", 5], [280, 9, 368518, "lexden11", 5], [280, 9, 394125, "Gambler75", 5]]], [["African Pro League", 83], [[83, 18, 420509, "windfire", 1], [83, 17, 930, "aceinthehouse", 2], [83, 17, 197640, "awsalick", 2], [83, 17, 352855, "tsmuve", 2], [83, 15, 124057, "zoso", 3], [83, 14, 32652, "Outlaw Dogs", 4], [83, 14, 174877, "Landrys Legacy", 4], [83, 14, 276334, "Golan", 4], [83, 13, 173019, "kswetnam", 5], [83, 13, 311758, "BooRadley", 5]]], [["Canadian Pro League", 5], [[5, 19, 126547, "blitzboy", 1], [5, 18, 930, "aceinthehouse", 2], [5, 18, 133867, "Crash.0", 2], [5, 18, 305623, "Buzz42day", 2], [5, 18, 421422, "Megacrack", 2], [5, 17, 276334, "Golan", 3], [5, 17, 415516, "C17Ajax", 3], [5, 16, 228472, "kidhammerhead", 4], [5, 16, 352855, "tsmuve", 4], [5, 15, 368518, "lexden11", 5]]], [["Eastern Europe Pro League", 11], [[11, 17, 228472, "kidhammerhead", 1], [11, 17, 403558, "tendril", 1], [11, 16, 201541, "TJC", 2], [11, 15, 169411, "Kaotik", 3], [11, 14, 21964, "HaplosDog", 4], [11, 12, 58431, "MudBugs", 5], [11, 12, 137614, "pwoo10", 5], [11, 12, 176536, "Thundercat_12", 5]]], [["Oceania Pro League", 17], [[17, 19, 21576, "daryls61", 1], [17, 18, 37658, "buffalobills_tw", 2], [17, 18, 133867, "Crash.0", 2], [17, 18, 209131, "supanooba", 2], [17, 17, 34330, "gtinker63", 3], [17, 17, 343971, "kpeezy", 3], [17, 17, 368518, "lexden11", 3], [17, 15, 15284, "Abstract Actuary", 4], [17, 15, 26437, "spindoctor02", 4], [17, 15, 312238, "DSmooth", 4], [17, 14, 930, "aceinthehouse", 5], [17, 14, 57194, "mstrbtngbear", 5]]], [["South America Pro League", 15], [[15, 18, 192220, "shadow123517", 1], [15, 18, 368518, "lexden11", 1], [15, 17, 21964, "HaplosDog", 2], [15, 17, 58431, "MudBugs", 2], [15, 17, 286545, "j_reimy", 2], [15, 17, 312238, "DSmooth", 2], [15, 16, 21576, "daryls61", 3], [15, 15, 15127, "firedog", 4], [15, 15, 36991, "jacksnyder", 4], [15, 15, 163428, "darkwingaa", 4], [15, 15, 403558, "tendril", 4], [15, 14, 214687, "mlsntx", 5]]], [["Southeast Asia Pro League", 13], [[13, 13, 32652, "Outlaw Dogs", 1], [13, 13, 37658, "buffalobills_tw", 1], [13, 12, 930, "aceinthehouse", 2], [13, 12, 51674, "schneidsm", 2], [13, 12, 57194, "mstrbtngbear", 2], [13, 12, 305623, "Buzz42day", 2], [13, 12, 337344, "chopper409", 2], [13, 12, 403558, "tendril", 2], [13, 11, 21964, "HaplosDog", 3], [13, 11, 45834, "Backes-to-Backes", 3], [13, 11, 126547, "blitzboy", 3], [13, 10, 173019, "kswetnam", 4], [13, 10, 261308, "Hook82", 4], [13, 10, 286545, "j_reimy", 4], [13, 9, 197640, "awsalick", 5], [13, 9, 289458, "caspian44", 5]]], [["USA Pro League", 1], [[1, 18, 15127, "firedog", 1], [1, 18, 286545, "j_reimy", 1], [1, 18, 310699, "Crime", 1], [1, 17, 173114, "beersy", 2], [1, 17, 192220, "shadow123517", 2], [1, 17, 423885, "Helador", 2], [1, 16, 46329, "TaySC", 3], [1, 16, 197640, "awsalick", 3], [1, 16, 368518, "lexden11", 3], [1, 14, 930, "aceinthehouse", 4], [1, 14, 14995, "sharks87", 4], [1, 14, 21576, "daryls61", 4], [1, 14, 169411, "Kaotik", 4], [1, 14, 289458, "caspian44", 4], [1, 12, 133867, "Crash.0", 5], [1, 12, 312238, "DSmooth", 5]]], [["Western Europe Pro League", 9], [[9, 19, 21964, "HaplosDog", 1], [9, 19, 368518, "lexden11", 1], [9, 18, 15127, "firedog", 2], [9, 18, 15284, "Abstract Actuary", 2], [9, 18, 21576, "daryls61", 2], [9, 18, 340922, "SandyNurse", 2], [9, 17, 173019, "kswetnam", 3], [9, 17, 197640, "awsalick", 3], [9, 16, 58431, "MudBugs", 4], [9, 16, 137614, "pwoo10", 4], [9, 16, 192220, "shadow123517", 4], [9, 16, 209131, "supanooba", 4], [9, 16, 415516, "C17Ajax", 4], [9, 15, 8263, "drewd21", 5]]], [["Regional Pro Elite #1", 2], [[2, 18, 137614, "pwoo10", 1], [2, 15, 930, "aceinthehouse", 2], [2, 15, 14995, "sharks87", 2], [2, 14, 313806, "pierjam", 3], [2, 11, 15127, "firedog", 4], [2, 11, 113703, "nycdude", 4], [2, 11, 197640, "awsalick", 4], [2, 11, 286545, "j_reimy", 4], [2, 11, 312238, "DSmooth", 4], [2, 10, 32652, "Outlaw Dogs", 5]]], [["Regional Pro Elite #2", 3], [[3, 18, 133610, "sektor", 1], [3, 17, 352855, "tsmuve", 2], [3, 17, 368518, "lexden11", 2], [3, 16, 415516, "C17Ajax", 3], [3, 14, 201143, "drawkward", 4], [3, 14, 313806, "pierjam", 4], [3, 13, 930, "aceinthehouse", 5], [3, 13, 15127, "firedog", 5], [3, 13, 124057, "zoso", 5], [3, 13, 276334, "Golan", 5], [3, 13, 312238, "DSmooth", 5], [3, 13, 343980, "mattras", 5]]], [["Regional Pro Competitive #3", 4], [[4, 19, 37658, "buffalobills_tw", 1], [4, 19, 126547, "blitzboy", 1], [4, 18, 62675, "ninja turtles", 2], [4, 18, 197640, "awsalick", 2], [4, 18, 368518, "lexden11", 2], [4, 18, 423880, "simoto", 2], [4, 16, 403558, "tendril", 3], [4, 15, 137614, "pwoo10", 4], [4, 11, 286545, "j_reimy", 5]]], [["Regional Pro Competitive #4", 6], [[6, 18, 36567, "hornyeskimo", 1], [6, 18, 37658, "buffalobills_tw", 1], [6, 18, 57194, "mstrbtngbear", 1], [6, 18, 133867, "Crash.0", 1], [6, 18, 197640, "awsalick", 1], [6, 18, 403558, "tendril", 1], [6, 17, 34330, "gtinker63", 2], [6, 17, 337344, "chopper409", 2], [6, 17, 343971, "kpeezy", 2], [6, 17, 368518, "lexden11", 2], [6, 15, 415516, "C17Ajax", 3], [6, 14, 930, "aceinthehouse", 4], [6, 13, 15127, "firedog", 5], [6, 13, 343980, "mattras", 5], [6, 13, 21576, "daryls61", 5]]], [["Regional Pro Competitive #5", 7], [[7, 19, 15127, "firedog", 1], [7, 19, 37658, "buffalobills_tw", 1], [7, 19, 133610, "sektor", 1], [7, 19, 286545, "j_reimy", 1], [7, 18, 343980, "mattras", 2], [7, 17, 411737, "hl12345", 3], [7, 15, 930, "aceinthehouse", 4], [7, 15, 337344, "chopper409", 4], [7, 13, 113703, "nycdude", 5], [7, 13, 137614, "pwoo10", 5]]], [["Regional Pro Competitive #6", 8], [[8, 18, 126547, "blitzboy", 1], [8, 18, 403558, "tendril", 1], [8, 16, 133867, "Crash.0", 2], [8, 15, 113703, "nycdude", 3], [8, 15, 343971, "kpeezy", 3], [8, 14, 15127, "firedog", 4], [8, 9, 337344, "chopper409", 5]]], [["Regional Pro Competitive #7", 10], [[10, 18, 368518, "lexden11", 1], [10, 15, 930, "aceinthehouse", 2], [10, 15, 21576, "daryls61", 2], [10, 13, 274337, "jalvin", 3], [10, 11, 57194, "mstrbtngbear", 4], [10, 11, 10040, "jpjn94", 4], [10, 11, 34330, "gtinker63", 4], [10, 11, 113703, "nycdude", 4], [10, 10, 36567, "hornyeskimo", 5]]], [["Regional Pro League #8", 12], [[12, 15, 343971, "kpeezy", 1], [12, 15, 368518, "lexden11", 1], [12, 11, 137614, "pwoo10", 2], [12, 10, 201143, "drawkward", 3], [12, 8, 57194, "mstrbtngbear", 4], [12, 8, 34330, "gtinker63", 4], [12, 6, 15127, "firedog", 5], [12, 6, 313806, "pierjam", 5], [12, 6, 133867, "Crash.0", 5], [12, 6, 197640, "awsalick", 5], [12, 6, 37658, "buffalobills_tw", 5], [12, 6, 113703, "nycdude", 5], [12, 6, 126547, "blitzboy", 5]]], [["Regional Pro League #9", 14], [[14, 18, 201143, "drawkward", 1], [14, 17, 930, "aceinthehouse", 2], [14, 17, 37658, "buffalobills_tw", 2], [14, 17, 169411, "Kaotik", 2], [14, 15, 113703, "nycdude", 3], [14, 14, 21576, "daryls61", 4], [14, 14, 310699, "Crime", 4], [14, 14, 368518, "lexden11", 4], [14, 13, 197640, "awsalick", 5]]], [["Regional Pro League #10", 16], [[16, 18, 16093, "Ketze55", 1], [16, 18, 113703, "nycdude", 1], [16, 16, 197640, "awsalick", 2], [16, 16, 313806, "pierjam", 2], [16, 10, 27480, "kevinsnyder", 3], [16, 8, 15127, "firedog", 4], [16, 8, 343971, "kpeezy", 4], [16, 5, 310699, "Crime", 5]]], [["Regional Pro League #11", 18], [[18, 19, 37658, "buffalobills_tw", 1], [18, 18, 10040, "jpjn94", 2], [18, 18, 36567, "hornyeskimo", 2], [18, 18, 197640, "awsalick", 2], [18, 18, 337344, "chopper409", 2], [18, 15, 352769, "DwightnBeets", 3], [18, 15, 368518, "lexden11", 3], [18, 12, 930, "aceinthehouse", 4], [18, 11, 21576, "daryls61", 5], [18, 11, 312238, "DSmooth", 5], [18, 11, 343971, "kpeezy", 5]]], [["Regional Pro League #12", 19], [[19, 15, 368518, "lexden11", 1], [19, 13, 312238, "DSmooth", 2], [19, 12, 15127, "firedog", 3], [19, 11, 64857, "Little M", 4], [19, 9, 37658, "buffalobills_tw", 5]]], [["Regional Pro League #13", 21], [[21, 20, 37658, "buffalobills_tw", 1], [21, 19, 10040, "jpjn94", 2], [21, 17, 197640, "awsalick", 3], [21, 5, 15127, "firedog", 4], [21, 5, 57194, "mstrbtngbear", 4], [21, 5, 234954, "cheese sandwich", 4], [21, 5, 5066, "QBall13", 4], [21, 5, 930, "aceinthehouse", 4], [21, 5, 313806, "pierjam", 4], [21, 5, 21576, "daryls61", 4], [21, 5, 341178, "snowtrucks09", 4], [21, 5, 133610, "sektor", 4], [21, 5, 286545, "j_reimy", 4], [21, 5, 43499, "sewinston", 4], [21, 5, 18260, "jensnyder", 4], [21, 5, 34330, "gtinker63", 4], [21, 5, 113703, "nycdude", 4], [21, 5, 72978, "Boozer", 4], [21, 4, 11995, "monkeybutt", 5], [21, 4, 36991, "jacksnyder", 5], [21, 4, 169411, "Kaotik", 5], [21, 4, 74614, "peteyskugog", 5]]], [["Semi Pro Elite #1", 26], [[26, 17, 368518, "lexden11", 1], [26, 16, 930, "aceinthehouse", 2], [26, 12, 234, "nsergi2", 3], [26, 11, 414408, "rooke", 4], [26, 11, 429049, "Sergeant808", 4], [26, 10, 62809, "VegasABD", 5], [26, 10, 407879, "Scottie Johnson", 5]]], [["Semi Pro Competitive #2", 41], [[41, 13, 368518, "lexden11", 1], [41, 11, 312238, "DSmooth", 2], [41, 10, 27480, "kevinsnyder", 3], [41, 10, 137614, "pwoo10", 3], [41, 8, 10040, "jpjn94", 4], [41, 8, 34330, "gtinker63", 4], [41, 8, 36991, "jacksnyder", 4], [41, 8, 57194, "mstrbtngbear", 4], [41, 8, 126547, "blitzboy", 4], [41, 8, 337344, "chopper409", 4], [41, 6, 414408, "rooke", 5]]], [["Semi Pro League #3", 42], [[42, 14, 37658, "buffalobills_tw", 1], [42, 5, 337344, "chopper409", 2], [42, 3, 930, "aceinthehouse", 3], [42, 3, 21576, "daryls61", 3], [42, 3, 43499, "sewinston", 3], [42, 3, 62809, "VegasABD", 3], [42, 3, 133610, "sektor", 3], [42, 3, 201143, "drawkward", 3], [42, 3, 265249, "rrrravens838", 3], [42, 3, 429049, "Sergeant808", 3], [42, 2, 313806, "pierjam", 4], [42, 2, 124057, "zoso", 4], [42, 1, 169411, "Kaotik", 5], [42, 1, 310699, "Crime", 5], [42, 1, 260273, "AC", 5], [42, 1, 11995, "monkeybutt", 5], [42, 1, 148242, "jaycorp", 5], [42, 1, 312238, "DSmooth", 5], [42, 1, 422768, "Cosaco", 5], [42, 1, 81110, "Notak", 5], [42, 1, 15127, "firedog", 5], [42, 1, 429716, "jlwtdw359", 5], [42, 1, 18260, "jensnyder", 5], [42, 1, 165476, "xhail2skinsx", 5]]], [["National Minor Elite #1", 38], [[38, 19, 126547, "blitzboy", 1], [38, 18, 10040, "jpjn94", 2], [38, 18, 15127, "firedog", 2], [38, 15, 36567, "hornyeskimo", 3], [38, 12, 429049, "Sergeant808", 4], [38, 9, 14995, "sharks87", 5], [38, 9, 57194, "mstrbtngbear", 5], [38, 9, 113703, "nycdude", 5]]], [["National Minor Elite #2", 39], [[39, 18, 10040, "jpjn94", 1], [39, 16, 137614, "pwoo10", 2], [39, 12, 37658, "buffalobills_tw", 3], [39, 9, 34330, "gtinker63", 4], [39, 9, 36567, "hornyeskimo", 4], [39, 9, 57194, "mstrbtngbear", 4], [39, 9, 337344, "chopper409", 4], [39, 9, 368518, "lexden11", 4], [39, 6, 27480, "kevinsnyder", 5], [39, 6, 36991, "jacksnyder", 5], [39, 6, 201143, "drawkward", 5], [39, 6, 311758, "BooRadley", 5]]], [["National Minor Competitive #3", 103], [[103, 14, 368518, "lexden11", 1], [103, 13, 10040, "jpjn94", 2], [103, 7, 27480, "kevinsnyder", 3], [103, 7, 37658, "buffalobills_tw", 3], [103, 7, 133610, "sektor", 3], [103, 7, 337344, "chopper409", 3], [103, 6, 64857, "Little M", 4], [103, 6, 311758, "BooRadley", 4], [103, 6, 403558, "tendril", 4], [103, 5, 5066, "QBall13", 5], [103, 5, 62809, "VegasABD", 5]]], [["National Minor League #4", 137], [[137, 13, 15127, "firedog", 1], [137, 11, 930, "aceinthehouse", 2], [137, 10, 312238, "DSmooth", 3], [137, 9, 133610, "sektor", 4], [137, 5, 403558, "tendril", 5]]], [["Regional Minor Elite #1", 99], [[99, 15, 304419, "peadawg", 1], [99, 11, 930, "aceinthehouse", 2], [99, 8, 429049, "Sergeant808", 3], [99, 5, 169411, "Kaotik", 4], [99, 5, 137614, "pwoo10", 4], [99, 5, 27480, "kevinsnyder", 4], [99, 5, 173114, "beersy", 4], [99, 5, 201143, "drawkward", 4], [99, 5, 124057, "zoso", 4], [99, 4, 11995, "monkeybutt", 5], [99, 4, 5066, "QBall13", 5], [99, 4, 15127, "firedog", 5], [99, 4, 43499, "sewinston", 5], [99, 4, 133610, "sektor", 5], [99, 4, 312238, "DSmooth", 5], [99, 4, 174877, "Landrys Legacy", 5], [99, 4, 36991, "jacksnyder", 5], [99, 4, 311758, "BooRadley", 5], [99, 4, 337344, "chopper409", 5], [99, 4, 18260, "jensnyder", 5], [99, 4, 126547, "blitzboy", 5], [99, 4, 10040, "jpjn94", 5], [99, 4, 21270, "rekcuf", 5]]], [["Regional Minor Competitive #2", 100], [[100, 18, 337344, "chopper409", 1], [100, 14, 15127, "firedog", 2], [100, 8, 312238, "DSmooth", 3], [100, 7, 368518, "lexden11", 4], [100, 7, 113703, "nycdude", 4], [100, 7, 27480, "kevinsnyder", 4], [100, 6, 930, "aceinthehouse", 5], [100, 6, 429049, "Sergeant808", 5], [100, 6, 133610, "sektor", 5]]], [["Regional Minor Competitive #3", 101], [[101, 19, 126547, "blitzboy", 1], [101, 17, 312238, "DSmooth", 2], [101, 16, 201143, "drawkward", 3], [101, 16, 343766, "Big-Nasty", 3], [101, 15, 36567, "hornyeskimo", 4], [101, 11, 337344, "chopper409", 5], [101, 11, 429049, "Sergeant808", 5]]], [["Regional Minor League #4", 102], [[102, 12, 429049, "Sergeant808", 1], [102, 11, 343766, "Big-Nasty", 2], [102, 11, 368518, "lexden11", 2], [102, 10, 10040, "jpjn94", 3], [102, 10, 16093, "Ketze55", 3], [102, 6, 201143, "drawkward", 4], [102, 6, 337344, "chopper409", 4], [102, 5, 137614, "pwoo10", 5]]], [["Regional Minor League #5", 146], [[146, 8, 126547, "blitzboy", 1], [146, 6, 113703, "nycdude", 2], [146, 6, 368518, "lexden11", 2], [146, 5, 137614, "pwoo10", 3], [146, 5, 169411, "Kaotik", 3], [146, 4, 133610, "sektor", 4], [146, 4, 311918, "home field advantage", 4], [146, 3, 62809, "VegasABD", 5]]], [["University Elite #1", 37], [[37, 8, 201541, "TJC", 1], [37, 7, 137614, "pwoo10", 2], [37, 7, 133610, "sektor", 2], [37, 7, 57194, "mstrbtngbear", 2], [37, 7, 36567, "hornyeskimo", 2], [37, 7, 930, "aceinthehouse", 2], [37, 6, 368518, "lexden11", 3], [37, 6, 126547, "blitzboy", 3], [37, 5, 27480, "kevinsnyder", 4], [37, 5, 51674, "schneidsm", 4], [37, 5, 201143, "drawkward", 4], [37, 4, 11995, "monkeybutt", 5], [37, 4, 187817, "mhardman", 5]]], [["University Competitive #2", 156], [[156, 18, 930, "aceinthehouse", 1], [156, 18, 57194, "mstrbtngbear", 1], [156, 17, 10040, "jpjn94", 2], [156, 17, 133610, "sektor", 2], [156, 17, 137614, "pwoo10", 2], [156, 16, 113703, "nycdude", 3], [156, 12, 36567, "hornyeskimo", 4], [156, 10, 15127, "firedog", 5], [156, 10, 201143, "drawkward", 5], [156, 10, 126547, "blitzboy", 5], [156, 10, 365589, "ftb_wolfie", 5]]], [["University Competitive #3", 171], [[171, 17, 137614, "pwoo10", 1], [171, 16, 299160, "Amboy Duke", 2], [171, 9, 36567, "hornyeskimo", 3], [171, 9, 57194, "mstrbtngbear", 3], [171, 5, 10040, "jpjn94", 4], [171, 5, 27480, "kevinsnyder", 4], [171, 5, 32652, "Outlaw Dogs", 4], [171, 5, 187282, "Dub J", 4], [171, 5, 201143, "drawkward", 4], [171, 5, 368518, "lexden11", 4], [171, 4, 11995, "monkeybutt", 5], [171, 4, 187817, "mhardman", 5]]], [["University League #4", 203], [[203, 8, 15127, "firedog", 1], [203, 6, 36567, "hornyeskimo", 2], [203, 5, 368518, "lexden11", 3], [203, 3, 62809, "VegasABD", 4], [203, 2, 187817, "mhardman", 5]]], [["University League #5", 204], [[204, 13, 15127, "firedog", 1], [204, 11, 10040, "jpjn94", 2], [204, 7, 36567, "hornyeskimo", 3], [204, 7, 126547, "blitzboy", 3], [204, 3, 34330, "gtinker63", 4], [204, 3, 57194, "mstrbtngbear", 4], [204, 1, 368518, "lexden11", 5], [204, 1, 187817, "mhardman", 5], [204, 1, 311918, "home field advantage", 5], [204, 1, 36991, "jacksnyder", 5], [204, 1, 113703, "nycdude", 5], [204, 1, 5066, "QBall13", 5], [204, 1, 27480, "kevinsnyder", 5]]], [["Prep Competitive #1", 111], [[111, 17, 15127, "firedog", 1], [111, 17, 368518, "lexden11", 1], [111, 16, 343980, "mattras", 2], [111, 13, 26437, "spindoctor02", 3], [111, 9, 36991, "jacksnyder", 4], [111, 4, 11995, "monkeybutt", 5], [111, 4, 27480, "kevinsnyder", 5]]], [["Prep Competitive #2", 112], [[112, 13, 930, "aceinthehouse", 1], [112, 12, 10040, "jpjn94", 2], [112, 12, 126547, "blitzboy", 2], [112, 9, 133610, "sektor", 3], [112, 8, 15127, "firedog", 4], [112, 7, 102494, "mhayes", 5], [112, 7, 57194, "mstrbtngbear", 5], [112, 7, 36567, "hornyeskimo", 5]]], [["Prep Competitive #3", 113], [[113, 17, 368518, "lexden11", 1], [113, 14, 113703, "nycdude", 2], [113, 13, 15127, "firedog", 3], [113, 4, 11995, "monkeybutt", 4], [113, 4, 91694, "blue024", 4], [113, 3, 205049, "jaytotheson", 5], [113, 3, 313505, "nomad127", 5], [113, 3, 137614, "pwoo10", 5], [113, 3, 10040, "jpjn94", 5], [113, 3, 930, "aceinthehouse", 5], [113, 3, 43499, "sewinston", 5], [113, 3, 187282, "Dub J", 5], [113, 3, 133610, "sektor", 5], [113, 3, 343980, "mattras", 5], [113, 3, 201143, "drawkward", 5], [113, 3, 126547, "blitzboy", 5], [113, 3, 36991, "jacksnyder", 5], [113, 3, 18260, "jensnyder", 5], [113, 3, 5066, "QBall13", 5], [113, 3, 26437, "spindoctor02", 5], [113, 3, 311918, "home field advantage", 5]]], [["Prep Competitive #4", 114], [[114, 16, 14995, "sharks87", 1], [114, 14, 15127, "firedog", 2], [114, 13, 133610, "sektor", 3], [114, 13, 126547, "blitzboy", 3], [114, 12, 368518, "lexden11", 4], [114, 11, 10040, "jpjn94", 5], [114, 11, 113703, "nycdude", 5], [114, 11, 930, "aceinthehouse", 5]]], [["Prep League #5", 153], [[153, 18, 126547, "blitzboy", 1], [153, 18, 368518, "lexden11", 1], [153, 17, 10040, "jpjn94", 2], [153, 17, 36567, "hornyeskimo", 2], [153, 17, 133610, "sektor", 2], [153, 16, 113703, "nycdude", 3], [153, 15, 18260, "jensnyder", 4], [153, 11, 260273, "AC", 5]]], [["Prep League #6", 154], [[154, 14, 133610, "sektor", 1], [154, 12, 930, "aceinthehouse", 2], [154, 12, 343980, "mattras", 2], [154, 8, 10040, "jpjn94", 3], [154, 8, 57194, "mstrbtngbear", 3], [154, 8, 201143, "drawkward", 3], [154, 8, 420509, "windfire", 3], [154, 7, 36567, "hornyeskimo", 4], [154, 6, 274337, "jalvin", 5]]], [["Rookie League #1", 158], [[158, 9, 45834, "Backes-to-Backes", 1], [158, 7, 126547, "blitzboy", 2], [158, 7, 137614, "pwoo10", 2], [158, 6, 133610, "sektor", 3], [158, 5, 32652, "Outlaw Dogs", 4], [158, 4, 43499, "sewinston", 5], [158, 4, 148242, "jaycorp", 5]]], [["Rookie League #2", 184], [[184, 14, 394125, "Gambler75", 1], [184, 12, 930, "aceinthehouse", 2], [184, 10, 113703, "nycdude", 3], [184, 10, 368518, "lexden11", 3], [184, 9, 14995, "sharks87", 4], [184, 9, 261308, "Hook82", 4], [184, 8, 10040, "jpjn94", 5], [184, 8, 133610, "sektor", 5]]], [["Rookie League #3", 188], [[188, 11, 57194, "mstrbtngbear", 1], [188, 9, 113703, "nycdude", 2], [188, 8, 368518, "lexden11", 3], [188, 7, 261308, "Hook82", 4], [188, 7, 411536, "Johnny Ringo17", 4], [188, 6, 411388, "duncan3310", 5]]], [["Rookie League #4", 201], [[201, 13, 133610, "sektor", 1], [201, 11, 201143, "drawkward", 2], [201, 10, 310699, "Crime", 3], [201, 8, 930, "aceinthehouse", 4], [201, 8, 10040, "jpjn94", 4], [201, 8, 15127, "firedog", 4], [201, 8, 18260, "jensnyder", 4], [201, 8, 36991, "jacksnyder", 4], [201, 8, 57194, "mstrbtngbear", 4], [201, 8, 261308, "Hook82", 4], [201, 7, 43499, "sewinston", 5]]], [["Rookie League #5", 202], [[202, 18, 10040, "jpjn94", 1], [202, 16, 310699, "Crime", 2], [202, 12, 15127, "firedog", 3], [202, 12, 201143, "drawkward", 3], [202, 10, 930, "aceinthehouse", 4], [202, 10, 343971, "kpeezy", 4], [202, 9, 113703, "nycdude", 5], [202, 9, 312691, "r1ck ramb1s", 5]]], [["Rookie League #6", 231], [[231, 16, 930, "aceinthehouse", 1], [231, 13, 15127, "firedog", 2], [231, 13, 57194, "mstrbtngbear", 2], [231, 13, 261308, "Hook82", 2], [231, 11, 113703, "nycdude", 3], [231, 10, 310699, "Crime", 4], [231, 8, 10040, "jpjn94", 5], [231, 8, 18260, "jensnyder", 5], [231, 8, 133610, "sektor", 5]]], [["Rookie-Soph D League #1", 65], [[65, 11, 36991, "jacksnyder", 1], [65, 9, 201143, "drawkward", 2], [65, 9, 126547, "blitzboy", 2], [65, 8, 930, "aceinthehouse", 3], [65, 8, 133610, "sektor", 3], [65, 8, 113703, "nycdude", 3], [65, 8, 18260, "jensnyder", 3], [65, 7, 368518, "lexden11", 4], [65, 7, 43499, "sewinston", 4], [65, 7, 36567, "hornyeskimo", 4], [65, 7, 15127, "firedog", 4], [65, 7, 10040, "jpjn94", 4], [65, 5, 57194, "mstrbtngbear", 5], [65, 5, 5066, "QBall13", 5], [65, 5, 27480, "kevinsnyder", 5]]], [["Rookie-Soph D League #2", 66], [[66, 4, 311918, "home field advantage", 1], [66, 2, 15127, "firedog", 2], [66, 2, 57194, "mstrbtngbear", 2], [66, 1, 133610, "sektor", 3], [66, 1, 43499, "sewinston", 3], [66, 1, 260273, "AC", 3], [66, 1, 201143, "drawkward", 3], [66, 1, 930, "aceinthehouse", 3], [66, 1, 18260, "jensnyder", 3], [66, 1, 360954, "auzrealmw", 3], [66, 1, 122391, "mdterpsrock3", 3], [66, 1, 165476, "xhail2skinsx", 3], [66, 1, 10040, "jpjn94", 3]]], [["Rookie-Soph D League #3", 67], [[67, 11, 36991, "jacksnyder", 1], [67, 5, 126547, "blitzboy", 2], [67, 5, 368518, "lexden11", 2], [67, 3, 15127, "firedog", 3], [67, 3, 10040, "jpjn94", 3], [67, 3, 410361, "DaAmazingBeast", 3], [67, 3, 18260, "jensnyder", 3], [67, 3, 5066, "QBall13", 3], [67, 3, 311918, "home field advantage", 3], [67, 1, 36567, "hornyeskimo", 4], [67, 1, 133610, "sektor", 4], [67, 1, 43499, "sewinston", 4], [67, 1, 260273, "AC", 4], [67, 1, 113703, "nycdude", 4], [67, 1, 930, "aceinthehouse", 4], [67, 1, 165476, "xhail2skinsx", 4]]], [["Rookie-Soph D League #4", 68], [[68, 13, 57194, "mstrbtngbear", 1], [68, 5, 368518, "lexden11", 2], [68, 4, 113703, "nycdude", 3], [68, 4, 201143, "drawkward", 3], [68, 4, 429586, "SwooSh27", 3], [68, 3, 311918, "home field advantage", 4], [68, 2, 62809, "VegasABD", 5]]], [["Rookie-Soph D League #5", 69], [[69, 13, 368518, "lexden11", 1], [69, 11, 930, "aceinthehouse", 2], [69, 11, 18260, "jensnyder", 2], [69, 11, 113703, "nycdude", 2], [69, 9, 133610, "sektor", 3], [69, 6, 43499, "sewinston", 4], [69, 5, 5066, "QBall13", 5]]], [["Rookie-Soph D League #6", 70], [[70, 9, 57194, "mstrbtngbear", 1], [70, 2, 133610, "sektor", 2], [70, 2, 201143, "drawkward", 2], [70, 2, 10040, "jpjn94", 2], [70, 2, 43499, "sewinston", 2], [70, 2, 930, "aceinthehouse", 2], [70, 2, 414138, "sexybaby", 2], [70, 1, 36567, "hornyeskimo", 3], [70, 1, 311918, "home field advantage", 3], [70, 1, 260273, "AC", 3], [70, 1, 113703, "nycdude", 3], [70, 1, 18260, "jensnyder", 3], [70, 1, 397045, "joe5254", 3], [70, 1, 165476, "xhail2skinsx", 3], [70, 1, 27480, "kevinsnyder", 3]]], [["Rookie-Soph D League #7", 71], [[71, 7, 43499, "sewinston", 1], [71, 6, 10040, "jpjn94", 2], [71, 6, 15127, "firedog", 2], [71, 6, 18260, "jensnyder", 2], [71, 5, 5066, "QBall13", 3], [71, 4, 429036, "On_Another_Level", 4], [71, 3, 930, "aceinthehouse", 5], [71, 3, 133610, "sektor", 5]]], [["Rookie-Soph D League #8", 72], [[72, 5, 62809, "VegasABD", 1], [72, 2, 133610, "sektor", 2], [72, 2, 113703, "nycdude", 2], [72, 2, 27480, "kevinsnyder", 2], [72, 1, 57194, "mstrbtngbear", 3], [72, 1, 368518, "lexden11", 3], [72, 1, 15127, "firedog", 3], [72, 1, 36567, "hornyeskimo", 3], [72, 1, 311918, "home field advantage", 3], [72, 1, 43499, "sewinston", 3], [72, 1, 36991, "jacksnyder", 3], [72, 1, 260273, "AC", 3], [72, 1, 201143, "drawkward", 3], [72, 1, 930, "aceinthehouse", 3], [72, 1, 18260, "jensnyder", 3], [72, 1, 100237, "abs", 3], [72, 1, 126547, "blitzboy", 3], [72, 1, 165476, "xhail2skinsx", 3], [72, 1, 10040, "jpjn94", 3], [72, 1, 5066, "QBall13", 3]]], [["Rookie-Soph D League #9", 73], [[73, 8, 930, "aceinthehouse", 1], [73, 7, 10040, "jpjn94", 2], [73, 6, 43499, "sewinston", 3], [73, 5, 15127, "firedog", 4], [73, 5, 18260, "jensnyder", 4], [73, 5, 126547, "blitzboy", 4]]]]";
*/


function updateProgress(){
	updateIcon();
	var progress = document.getElementsByClassName('completed');
	//	var denom = 2496;
	// 32 for every field  78 fields right now


	console.log(progress.length, " denom ", g_denom);
	
	document.getElementById('progress').innerHTML = 'Getting Rankings: ' + parseInt((progress.length/g_denom)*100) + '%  ('+ progress.length+'/'+g_denom+')';
	if(progress.length == g_denom){ 
		slapitalltogether();  // call when done pulling the data.
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


function handleSurvWinner(week, leagueID) 
{



	GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://glb.warriorgeneral.com/game/league_survivor.pl?league_id=' + leagueID + '&week=' +week,
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response)
			{
			
							
			
				try 
				{		
					console.log("League "+leagueID + " Week " + week);
										
					var div = document.createElement("div");
					div.innerHTML = response.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
									
					var table = div.getElementsByTagName("table")[1];
					var rows = table.getElementsByTagName("tr");
					
					if (week == 0)
					{
						document.getElementById(leagueID).getElementsByTagName('td')[week].innerHTML = (div.innerHTML.split("league_id=")[1]).split("<\/a>")[0].split(">")[1];
					}
					else
					{					
						if(rows.length >1)
						{
							var addmestring = "";
							
							for (var i=1; i<rows.length; i++) 
							{
								var h = rows[i].children[0].innerHTML;
				
								var user_id = parseInt(h.toString().split("user_id=")[1]);
								var user_name = (h.toString().split("user_id=")[1]).split("<\/a>")[0].split("\">")[1];
								var elimin = (rows[i].children[2].innerHTML.toString()).indexOf(">ELIMINATED<");
								
								addmestring += user_id +";;"+user_name+";;"+elimin+"|||";
							}
							
							document.getElementById(leagueID).getElementsByTagName('td')[week].innerHTML = addmestring;
							// console.log(addmestring);
			
						}
						
						div.innerHTML = "";

						document.getElementById(leagueID).getElementsByTagName('td')[week].setAttribute('class', 'completed');
						updateProgress();	
					}
					
					div.innerHTML = "";					
				}
				catch (e) 
				{
					console.log(e);
				}
			}
		});
}			

// conferencelist= s_winners
// [[[leaguename, leadid, [bloodbath array]], [[leagueid, week, user_id, user_name, winslot],[leagueid, week, user_id, user_name, winslot]]], [ next league ...]];
// [[["World League", 280, [0, 1]], [[280, 1, 4579, "whodey08", 1], [280, 1, 6165, "Joe Webb14", 1], [280, 1, 11995, "monkeybutt", 1], [280, 1, 15127, "firedog", 1], [280, 1, 15284, "Abstract Actuary", 1], [280, 1, 21576, "daryls61", 1], [280, 1, 26750, "T\u26602\u2660", 1], [280, 1, 28354, "ron2288", 1], [280, 1, 36567, "hornyeskimo", 1], [280, 1, 41108, "bstemple", 1], [280, 1, 49799, "Steelernutt68", 1], [280, 1, 57194, "mstrbtngbear", 1], [280, 1, 64351, "Sockamidic", 1], [280, 1, 72978, "Boozer", 1], [280, 1, 79954, "livebytheblitz", 1], [280, 1, 83772, "Vic Koenning", 1], [280, 1, 90268, "LT56", 1], [280, 1, 91746, "SlimG", 1], [280, 1, 92783, "Toric", 1], [280, 1, 100198, "Boomy DTD", 1], [280, 1, 103732, "upsair", 1], [280, 1, 124505, "Tigroklaws", 1], [280, 1, 133439, "Wikod", 1], [280, 1, 149763, "tonnyrat", 1], [280, 1, 161061, "Rowdie", 1], [280, 1, 163428, "darkwingaa", 1], [280, 1, 169411, "Kaotik", 1], [280, 1, 169706, "Burns1221", 1], [280, 1, 173114, "beersy", 1], [280, 1, 179043, "20dolla", 1], [280, 1, 181594, "lethalweapon 2", 1], [280, 1, 187282, "Dub J", 1], [280, 1, 187817, "mhardman", 1], [280, 1, 206666, "The Avenger", 1], [280, 1, 215802, "mrmaomao", 1], [280, 1, 220631, "Ice Nine", 1], [280, 1, 229104, "P@nda", 1], [280, 1, 234962, "sborats", 1], [280, 1, 236316, "danielbateman", 1], [280, 1, 236775, "SG\u272C21", 1], [280, 1, 252864, "Digger Bones", 1], [280, 1, 263470, "Dustin.", 1], [280, 1, 276334, "Golan", 1], [280, 1, 304983, "snakes22", 1], [280, 1, 305623, "Buzz42day", 1], [280, 1, 312238, "DSmooth", 1], [280, 1, 317543, "FBfan4life", 1], [280, 1, 330973, "SHINKANSEN", 1], [280, 1, 340918, "SnackWrap", 1], [280, 1, 340919, "Thurm", 1], [280, 1, 351731, "fogie55", 1], [280, 1, 363030, "Cleveland Browns", 1], [280, 1, 368518, "lexden11", 1], [280, 1, 375882, "ajensen", 1], [280, 1, 403558, "tendril", 1], [280, 1, 420509, "windfire", 1], [280, 1, 428784, "leathn", 1], [280, 1, 429924, "qwertyasdfghjkl", 1], [280, 1, 430135, "seemerun2", 1], [280, 1, 430218, "12344321", 1], [280, 1, 431280, "Wherdigo1", 1]]], [["Rookie League #3", 188, [0, 1]], [[188, 1, 4579, "whodey08", 1], [188, 1, 15127, "firedog", 1], [188, 1, 26750, "T\u26602\u2660", 1], [188, 1, 36567, "hornyeskimo", 1], [188, 1, 57194, "mstrbtngbear", 1], [188, 1, 91746, "SlimG", 1], [188, 1, 137614, "pwoo10", 1], [188, 1, 169411, "Kaotik", 1], [188, 1, 181594, "lethalweapon 2", 1], [188, 1, 304808, "Super Duper Cudi", 1], [188, 1, 414671, "kage5000", 1], [188, 1, 428784, "leathn", 1]]], [["Prep Competitive #2", 112, [0, 1]], [[112, 1, 4579, "whodey08", 1], [112, 1, 15127, "firedog", 1], [112, 1, 36567, "hornyeskimo", 1], [112, 1, 57194, "mstrbtngbear", 1], [112, 1, 91746, "SlimG", 1], [112, 1, 137614, "pwoo10", 1], [112, 1, 169411, "Kaotik", 1], [112, 1, 173114, "beersy", 1], [112, 1, 428784, "leathn", 1], [112, 1, 431758, "Hawtpokkitz", 1]]], [["Rookie League #1", 158, [0, 1]], [[158, 1, 4579, "whodey08", 1], [158, 1, 15127, "firedog", 1], [158, 1, 26750, "T\u26602\u2660", 1], [158, 1, 36567, "hornyeskimo", 1], [158, 1, 57194, "mstrbtngbear", 1], [158, 1, 91746, "SlimG", 1], [158, 1, 137614, "pwoo10", 1], [158, 1, 169411, "Kaotik", 1], [158, 1, 174877, "Landrys Legacy", 1], [158, 1, 181594, "lethalweapon 2", 1], [158, 1, 214687, "mlsntx", 1], [158, 1, 304808, "Super Duper Cudi", 1], [158, 1, 428784, "leathn", 1]]], [["Rookie League #2", 184, [0, 1]], [[184, 1, 4579, "whodey08", 1], [184, 1, 15127, "firedog", 1], [184, 1, 26750, "T\u26602\u2660", 1], [184, 1, 36567, "hornyeskimo", 1], [184, 1, 57194, "mstrbtngbear", 1], [184, 1, 91746, "SlimG", 1], [184, 1, 134571, "guttermouth70", 1], [184, 1, 137614, "pwoo10", 1], [184, 1, 149639, "Dr. E", 1], [184, 1, 169411, "Kaotik", 1], [184, 1, 181594, "lethalweapon 2", 1], [184, 1, 187282, "Dub J", 1], [184, 1, 197009, "KingCheez", 1], [184, 1, 304808, "Super Duper Cudi", 1], [184, 1, 428784, "leathn", 1]]], [["Casual Pro League", 24, [0, 1]], [[24, 1, 11995, "monkeybutt", 1], [24, 1, 15127, "firedog", 1], [24, 1, 15284, "Abstract Actuary", 1], [24, 1, 21576, "daryls61", 1], [24, 1, 36567, "hornyeskimo", 1], [24, 1, 49799, "Steelernutt68", 1], [24, 1, 56657, "sunder B", 1], [24, 1, 57194, "mstrbtngbear", 1], [24, 1, 83772, "Vic Koenning", 1], [24, 1, 90268, "LT56", 1], [24, 1, 100198, "Boomy DTD", 1], [24, 1, 103732, "upsair", 1], [24, 1, 137614, "pwoo10", 1], [24, 1, 169411, "Kaotik", 1], [24, 1, 173114, "beersy", 1], [24, 1, 187282, "Dub J", 1], [24, 1, 206666, "The Avenger", 1], [24, 1, 234962, "sborats", 1], [24, 1, 236316, "danielbateman", 1], [24, 1, 312238, "DSmooth", 1], [24, 1, 340919, "Thurm", 1], [24, 1, 351731, "fogie55", 1], [24, 1, 403558, "tendril", 1], [24, 1, 420509, "windfire", 1], [24, 1, 428784, "leathn", 1]]], [["Regional Pro Competitive #3", 4, [0, 1]], [[4, 1, 4579, "whodey08", 1], [4, 1, 15127, "firedog", 1], [4, 1, 21576, "daryls61", 1], [4, 1, 36567, "hornyeskimo", 1], [4, 1, 57194, "mstrbtngbear", 1], [4, 1, 91746, "SlimG", 1], [4, 1, 100198, "Boomy DTD", 1], [4, 1, 169411, "Kaotik", 1], [4, 1, 173114, "beersy", 1], [4, 1, 215802, "mrmaomao", 1], [4, 1, 220631, "Ice Nine", 1], [4, 1, 234962, "sborats", 1], [4, 1, 236316, "danielbateman", 1], [4, 1, 340919, "Thurm", 1], [4, 1, 368518, "lexden11", 1], [4, 1, 403558, "tendril", 1], [4, 1, 428784, "leathn", 1], [4, 1, 430218, "12344321", 1]]], [["Regional Pro Competitive #6", 8, [0, 1]], [[8, 1, 4579, "whodey08", 1], [8, 1, 15127, "firedog", 1], [8, 1, 21576, "daryls61", 1], [8, 1, 36567, "hornyeskimo", 1], [8, 1, 57194, "mstrbtngbear", 1], [8, 1, 91746, "SlimG", 1], [8, 1, 105983, "TheBear", 1], [8, 1, 169411, "Kaotik", 1], [8, 1, 201933, "usa13509", 1], [8, 1, 215802, "mrmaomao", 1], [8, 1, 234962, "sborats", 1], [8, 1, 236316, "danielbateman", 1], [8, 1, 340919, "Thurm", 1], [8, 1, 368518, "lexden11", 1], [8, 1, 403558, "tendril", 1], [8, 1, 428784, "leathn", 1], [8, 1, 430218, "12344321", 1]]], [["Regional Minor Casual #3", 259, [0, 1]], []], [["University Casual #3", 265, [0, 1]], [[265, 1, 15127, "firedog", 1], [265, 1, 36567, "hornyeskimo", 1], [265, 1, 57194, "mstrbtngbear", 1], [265, 1, 137614, "pwoo10", 1], [265, 1, 169411, "Kaotik", 1], [265, 1, 173114, "beersy", 1], [265, 1, 311918, "home field advantage", 1], [265, 1, 340918, "SnackWrap", 1], [265, 1, 352855, "tsmuve", 1], [265, 1, 368518, "lexden11", 1], [265, 1, 423885, "Helador", 1], [265, 1, 424753, "taytay21", 1]]]]


function slapitalltogether()
{
	//clear the SurvRankingInput and give the user progress feedback
	document.getElementById('SurvRankingInput').innerHTML = "<p>Calculating Rankings<span id='working'>.</span></p>";

	var results = new Array();

	for(var i=0; i<g_conferencesNum; i++)
	{
		results[i] = new Array();
		// initialize results
		for(var f=0; f<=g_Winners_Week; f++)
			results[i][f] = "";

		location = document.getElementById('SurvRankingDataTable').getElementsByTagName('tr');
			
		for(var f=0; f<=g_Winners_Week; f++)
			results[i][f] = location[i].getElementsByTagName('td')[f].innerHTML;
	}
	
	// console.log(results.toSource());
	
	
	// results now has all of our data
	
	// iterate through the conferences
	// each tr is a conference, each td is a week (first td is the conference name	

	var conferencelist = new Array();

	var winslot = 1;
	
	// Go through each conference
	for(var i=0; i< results.length; i++)
	{


		var winslot = 1;
	
		// Grab the conference name (first td)
		var conferencename = results[i][0];
		// Add a list for this conference.
		var conf_list1 = new Array();							
		// Add Conference list name
		conf_list1.push(conferencename);
		console.log (conferencename);
		
		var confID = parseInt(document.getElementById('SurvRankingDataTable').getElementsByTagName('tr')[i].id);
 
		// Add Conference ID
		conf_list1.push(confID);
		
		// Add Bloodbath = 0
		// [Bloobath, lovebath, week];
		conf_list1.push([0, 0, g_Winners_Week]);		 // week = g_max...
		conferencelist.push([conf_list1,new Array()]);

		
		var conf_list = new Array();	
		var bloodbath = 0;
		var lovebath = 0;
		
		// Go through this conference
		
		// Start at Week 1, work up to last week.
		
		var spentuserlist = new Array();
		
		for(var week=g_Winners_Week; week>=1; week--)
		{

			var temp = results[i][week].split("|||");
			
		//	console.log(temp.toSource());
			//if there is an entry;
			if(temp != -1)
			{
				var checkwinslot = false;   // use this to check if we take a winslot
				
				//split the entry.
				for (var x = 0; x< temp.length -1; x++)
				{
					var user_id = parseInt(temp[x].split(";;")[0]);
					var user_name = temp[x].split(";;")[1];
					var elimin = parseInt(temp[x].split(";;")[2]);
					
					// spentuser list just means we've already made an entry for the user (survived until)...
					if(spentuserlist.indexOf(user_id) == -1)
					{
						// if the user wasn't eliminated this week							
						if(elimin == -1)
						{
							// add user to survivor list																					
							conf_list.push([confID, week, user_id, user_name, winslot]);
							// Now spend the user
							spentuserlist.push(user_id);							
							// and indicate that we've used up a winslot with this week.
							checkwinslot = true;
							lovebath++;
						}
						else
						{
							// if the user was elinated this week then we should increment the number of eliminated users ... ie. bloodbath count.
							bloodbath++;
							
							if (week == 1)
							{
								// If eliminated in week 1, we need to add as an eliminated, otherwise the normal script will pick up.
								conf_list.push([confID, week-1, user_id, user_name, 0]);
								spentuserlist.push(user_id);							
							}
							
						}
						
						// don't need to make a list of the eliminated users because we'll infer that after the fact.
												
					}
					// else, user accounted for in a previous week... ignore.
					
					
					
					
					
				}
				// End splitting and adding users from the entry array for this week.
				
				
				
				// if we generated a winslot this week, then increment the total number of winslots used up.
				if (checkwinslot)
					winslot ++;	

				// Get the index of the current conference (last on the stack).
				var indexcon = conferencelist.length -1;

				// Check the latest week to see if we had a bloodbath.
				if (week == g_Winners_Week)
				{
					console.log("bloodbath #", bloodbath, "lovebath #", lovebath);
					conferencelist[indexcon][0][2][0] =bloodbath;
					conferencelist[indexcon][0][2][1] =lovebath;							
					//console.log(conferencelist[indexcon].toSource());
				}

				
				// if we generated any data for this week, add it to the overall list.
				if(conf_list.length > 0)
				{
				// [[[leaguename, leadid, [bloodbath array]], [[leagueid, week, user_id, user_name, winslot],[leagueid, week, user_id, user_name, winslot]]], [ next league ...]];
				// [[["World League", 280, [0, 1]], [[280, 1, 4579, "whodey08", 1], [280, 1, 6165, "Joe Webb14", 1], [280, 1, 11995, "monkeybutt", 1], [280, 1, 15127, "firedog", 1], [280, 1, 15284, "Abstract Actuary", 1], [280, 1, 21576, "daryls61", 1], [280, 1, 26750, "T\u26602\u2660", 1], [280, 1, 28354, "ron2288", 1], [280, 1, 36567, "hornyeskimo", 1], [280, 1, 41108, "bstemple", 1], [280, 1, 49799, "Steelernutt68", 1], [280, 1, 57194, "mstrbtngbear", 1], [280, 1, 64351, "Sockamidic", 1], [280, 1, 72978, "Boozer", 1], [280, 1, 79954, "livebytheblitz", 1], [280, 1, 83772, "Vic Koenning", 1], [280, 1, 90268, "LT56", 1], [280, 1, 91746, "SlimG", 1], [280, 1, 92783, "Toric", 1], [280, 1, 100198, "Boomy DTD", 1], [280, 1, 103732, "upsair", 1], [280, 1, 124505, "Tigroklaws", 1], [280, 1, 133439, "Wikod", 1], [280, 1, 149763, "tonnyrat", 1], [280, 1, 161061, "Rowdie", 1], [280, 1, 163428, "darkwingaa", 1], [280, 1, 169411, "Kaotik", 1], [280, 1, 169706, "Burns1221", 1], [280, 1, 173114, "beersy", 1], [280, 1, 179043, "20dolla", 1], [280, 1, 181594, "lethalweapon 2", 1], [280, 1, 187282, "Dub J", 1], [280, 1, 187817, "mhardman", 1], [280, 1, 206666, "The Avenger", 1], [280, 1, 215802, "mrmaomao", 1], [280, 1, 220631, "Ice Nine", 1], [280, 1, 229104, "P@nda", 1], [280, 1, 234962, "sborats", 1], [280, 1, 236316, "danielbateman", 1], [280, 1, 236775, "SG\u272C21", 1], [280, 1, 252864, "Digger Bones", 1], [280, 1, 263470, "Dustin.", 1], [280, 1, 276334, "Golan", 1], [280, 1, 304983, "snakes22", 1], [280, 1, 305623, "Buzz42day", 1], [280, 1, 312238, "DSmooth", 1], [280, 1, 317543, "FBfan4life", 1], [280, 1, 330973, "SHINKANSEN", 1], [280, 1, 340918, "SnackWrap", 1], [280, 1, 340919, "Thurm", 1], [280, 1, 351731, "fogie55", 1], [280, 1, 363030, "Cleveland Browns", 1], [280, 1, 368518, "lexden11", 1], [280, 1, 375882, "ajensen", 1], [280, 1, 403558, "tendril", 1], [280, 1, 420509, "windfire", 1], [280, 1, 428784, "leathn", 1], [280, 1, 429924, "qwertyasdfghjkl", 1], [280, 1, 430135, "seemerun2", 1], [280, 1, 430218, "12344321", 1], [280, 1, 431280, "Wherdigo1", 1]]], [["Rookie League #3", 188, [0, 1]], [[188, 1, 4579, "whodey08", 1], [188, 1, 15127, "firedog", 1], [188, 1, 26750, "T\u26602\u2660", 1], [188, 1, 36567, "hornyeskimo", 1], [188, 1, 57194, "mstrbtngbear", 1], [188, 1, 91746, "SlimG", 1], [188, 1, 137614, "pwoo10", 1], [188, 1, 169411, "Kaotik", 1], [188, 1, 181594, "lethalweapon 2", 1], [188, 1, 304808, "Super Duper Cudi", 1], [188, 1, 414671, "kage5000", 1], [188, 1, 428784, "leathn", 1]]], [["Prep Competitive #2", 112, [0, 1]], [[112, 1, 4579, "whodey08", 1], [112, 1, 15127, "firedog", 1], [112, 1, 36567, "hornyeskimo", 1], [112, 1, 57194, "mstrbtngbear", 1], [112, 1, 91746, "SlimG", 1], [112, 1, 137614, "pwoo10", 1], [112, 1, 169411, "Kaotik", 1], [112, 1, 173114, "beersy", 1], [112, 1, 428784, "leathn", 1], [112, 1, 431758, "Hawtpokkitz", 1]]], [["Rookie League #1", 158, [0, 1]], [[158, 1, 4579, "whodey08", 1], [158, 1, 15127, "firedog", 1], [158, 1, 26750, "T\u26602\u2660", 1], [158, 1, 36567, "hornyeskimo", 1], [158, 1, 57194, "mstrbtngbear", 1], [158, 1, 91746, "SlimG", 1], [158, 1, 137614, "pwoo10", 1], [158, 1, 169411, "Kaotik", 1], [158, 1, 174877, "Landrys Legacy", 1], [158, 1, 181594, "lethalweapon 2", 1], [158, 1, 214687, "mlsntx", 1], [158, 1, 304808, "Super Duper Cudi", 1], [158, 1, 428784, "leathn", 1]]], [["Rookie League #2", 184, [0, 1]], [[184, 1, 4579, "whodey08", 1], [184, 1, 15127, "firedog", 1], [184, 1, 26750, "T\u26602\u2660", 1], [184, 1, 36567, "hornyeskimo", 1], [184, 1, 57194, "mstrbtngbear", 1], [184, 1, 91746, "SlimG", 1], [184, 1, 134571, "guttermouth70", 1], [184, 1, 137614, "pwoo10", 1], [184, 1, 149639, "Dr. E", 1], [184, 1, 169411, "Kaotik", 1], [184, 1, 181594, "lethalweapon 2", 1], [184, 1, 187282, "Dub J", 1], [184, 1, 197009, "KingCheez", 1], [184, 1, 304808, "Super Duper Cudi", 1], [184, 1, 428784, "leathn", 1]]], [["Casual Pro League", 24, [0, 1]], [[24, 1, 11995, "monkeybutt", 1], [24, 1, 15127, "firedog", 1], [24, 1, 15284, "Abstract Actuary", 1], [24, 1, 21576, "daryls61", 1], [24, 1, 36567, "hornyeskimo", 1], [24, 1, 49799, "Steelernutt68", 1], [24, 1, 56657, "sunder B", 1], [24, 1, 57194, "mstrbtngbear", 1], [24, 1, 83772, "Vic Koenning", 1], [24, 1, 90268, "LT56", 1], [24, 1, 100198, "Boomy DTD", 1], [24, 1, 103732, "upsair", 1], [24, 1, 137614, "pwoo10", 1], [24, 1, 169411, "Kaotik", 1], [24, 1, 173114, "beersy", 1], [24, 1, 187282, "Dub J", 1], [24, 1, 206666, "The Avenger", 1], [24, 1, 234962, "sborats", 1], [24, 1, 236316, "danielbateman", 1], [24, 1, 312238, "DSmooth", 1], [24, 1, 340919, "Thurm", 1], [24, 1, 351731, "fogie55", 1], [24, 1, 403558, "tendril", 1], [24, 1, 420509, "windfire", 1], [24, 1, 428784, "leathn", 1]]], [["Regional Pro Competitive #3", 4, [0, 1]], [[4, 1, 4579, "whodey08", 1], [4, 1, 15127, "firedog", 1], [4, 1, 21576, "daryls61", 1], [4, 1, 36567, "hornyeskimo", 1], [4, 1, 57194, "mstrbtngbear", 1], [4, 1, 91746, "SlimG", 1], [4, 1, 100198, "Boomy DTD", 1], [4, 1, 169411, "Kaotik", 1], [4, 1, 173114, "beersy", 1], [4, 1, 215802, "mrmaomao", 1], [4, 1, 220631, "Ice Nine", 1], [4, 1, 234962, "sborats", 1], [4, 1, 236316, "danielbateman", 1], [4, 1, 340919, "Thurm", 1], [4, 1, 368518, "lexden11", 1], [4, 1, 403558, "tendril", 1], [4, 1, 428784, "leathn", 1], [4, 1, 430218, "12344321", 1]]], [["Regional Pro Competitive #6", 8, [0, 1]], [[8, 1, 4579, "whodey08", 1], [8, 1, 15127, "firedog", 1], [8, 1, 21576, "daryls61", 1], [8, 1, 36567, "hornyeskimo", 1], [8, 1, 57194, "mstrbtngbear", 1], [8, 1, 91746, "SlimG", 1], [8, 1, 105983, "TheBear", 1], [8, 1, 169411, "Kaotik", 1], [8, 1, 201933, "usa13509", 1], [8, 1, 215802, "mrmaomao", 1], [8, 1, 234962, "sborats", 1], [8, 1, 236316, "danielbateman", 1], [8, 1, 340919, "Thurm", 1], [8, 1, 368518, "lexden11", 1], [8, 1, 403558, "tendril", 1], [8, 1, 428784, "leathn", 1], [8, 1, 430218, "12344321", 1]]], [["Regional Minor Casual #3", 259, [0, 1]], []], [["University Casual #3", 265, [0, 1]], [[265, 1, 15127, "firedog", 1], [265, 1, 36567, "hornyeskimo", 1], [265, 1, 57194, "mstrbtngbear", 1], [265, 1, 137614, "pwoo10", 1], [265, 1, 169411, "Kaotik", 1], [265, 1, 173114, "beersy", 1], [265, 1, 311918, "home field advantage", 1], [265, 1, 340918, "SnackWrap", 1], [265, 1, 352855, "tsmuve", 1], [265, 1, 368518, "lexden11", 1], [265, 1, 423885, "Helador", 1], [265, 1, 424753, "taytay21", 1]]]]
								
					conferencelist[indexcon][1]= conf_list;
				}
				
				
				
				
				
			}
			// End This week. 
			// otherwise just continue on to the next week
			
			
			
			
			
			
			
		}	

//		console.log(conferencelist.toSource());

		
	//	document.getElementById("sSWbutton").value = results.length-i  +" remaining ";
			
	}
	// End of this conference, start the next.
	
						
						
	document.getElementById("sSWbutton").value = "Analyzing List";
						

	console.log("conferencelist before print winners", conferencelist.toSource());
						
	prints_winners(conferencelist);
						
}


function prints_winners(s_winners)
{


 // Setup the table

	var wins_table = document.createElement("table");
	wins_table.setAttribute("id","survivorConfWinsTable");
	var wins_table2 = document.createElement("table");
	wins_table2.setAttribute("id","survivorConfWinsTable2");
	
	var RP_table = document.createElement("table");
	RP_table.setAttribute("id","survivorConfRPTable");
	var RP_table2 = document.createElement("table");
	RP_table2.setAttribute("id","survivorConfRP2Table");

	
	var aw_table = document.createElement("table");
	aw_table.setAttribute("id","survivorAvgWeekTable");
	var aw_table2 = document.createElement("table");
	aw_table2.setAttribute("id","survivorAvgWeekTable2");
	
	var Every_table = document.createElement("table");
	Every_table.setAttribute("id","survivorEveryTable");	
	var Every_table2 = document.createElement("table");
	Every_table2.setAttribute("id","survivorEveryTable");	
	
	var conf_table = document.createElement("table");
	conf_table.setAttribute("id","survivorConfTable");
	var conf_table2 = document.createElement("table");
	conf_table2.setAttribute("id","survivorConfTable2");
	
	
//	console.log(s_winners.toSource());
	
	var userRP = new Array();
	var userSW = new Array();
	var confRP = new Array();
	var confRPWL = new Array();
	
	var ctr = document.createElement("tr");						
	for each (title in ["Wk", "ConfRP", "CurRP", "Confernce", "Orig", "Elim", "Alive", "%" , "AvgSurvW", "ConfLink"])
	{
		var th = document.createElement("th");
		th.innerHTML = title;
		ctr.appendChild(th);
	}
	conf_table.appendChild(ctr);
	
	
	for each ([conf, winner_list] in s_winners)
	{
		if (conf != null)
		{
		
			var cont_done = false;
		
			var conf_tr = document.createElement("tr");

			// Conference Name
			// Total users entered this season: 
			// Users eliminated in Week X : 

			var avg_surv_week =0;
			
			var week1mayhem = false;
			
			// league average survival week.
			for each (winner in winner_list)
			{
				if (winner[1] == 0)
				{
					week1mayhem = true;
				}
				
				avg_surv_week += winner[1];
			}
			
			avg_surv_week /= winner_list.length;
									
			var spentusers = new Array();
			var temp_winnercount = 0;
			var winner_count = 0;
			
			try
			{	
				if(winner_list.length > 0)
				{
					// need a count of how many survivors we had this week.
					// But first, if it is week 1, wee need to take care of the first week elimination case.
					if (week1mayhem)
					{
						var allelim = true;
						
						for each (winner2 in winner_list)
						{
							// Switch to 1 if anyone wasn't eliminated
							if(winner2[4] == 1)
								allelim = false;
						}
						
						// Keep week = 0 for these losers, but make their winslot 1 if they all were eliminated, otherwise switch to 0
						for (var f = 0; f<winner_list.length; f++)
						{
							if (allelim)
								winner_list[f][4] = 1;
							else
							{
								if(winner_list[f][4] == 0)
									winner_list[f][4] = 2;
							}
						}						
					}

					// finally now lets count the winners.
					for each (winnerd in winner_list)
					{
						if (winnerd[4] == 1)
							winner_count++;
					}
				}
				
			}
			catch (e) 
			{
				console.log(e);
				console.log("winner_count", winner_count, "winner_list", winner_list.toSource(), "winner_list[winner_count]", winner_list[winner_count]);
				winner_count = 1;
			}
			
			var temp_array = new Array();
			confRP.push(temp_array);
			var temp_array2 = new Array();
			confRPWL.push(temp_array2);
			
			var totalthisweek = parseInt(conf[2][0]) + parseInt(conf[2][1]);

				
			// set up the conference table
			for each (entry in [conf[2][2] /* Week */, RP_Lookup(conf[0]) /*RP for Conference*/, (RP_Lookup(conf[0])/winner_count).toFixed(2) , conf[0] /*Conference name*/, winner_list.length  /* Contests */, conf[2][0] /* Survivors */ , conf[2][1] /* Eliminated */ , (conf[2][1]/totalthisweek).toFixed(2) /* eliminatedthisweek */, avg_surv_week.toFixed(2)   /* Average Surv Week */, lsrvstr + conf[1] /* conference link */])
			{
				var ctd = document.createElement("td");
				ctd.innerHTML = entry;
				conf_tr.appendChild(ctd);
				confRP[confRP.length-1].push(entry);
				confRPWL[confRPWL.length-1].push(entry);				
 
			}		
			conf_table.appendChild(conf_tr);			
			
			confRPWL[confRPWL.length-1].push(winner_list);

			
			for each (winner in winner_list)
			{
			
				// Structure of winner:
				// [league ID, week, user_id, user_name, winslot]
				
				// make an avg survivor week list.
				userSW;
				if(userSW[winner[2]] == null)
				{
					userSW[winner[2]] = new Array();
					userSW[winner[2]][0] = winner[3];
					userSW[winner[2]][1] = 0; // Sum of avg Week
					userSW[winner[2]][2] = 0; // Count of Contests
				}
				
				userSW[winner[2]][1] += winner[1]; // add the survival week
				userSW[winner[2]][2] ++; // increment the contests			
			
				// If we haven't already seen this user.
				if (spentusers.indexOf(winner[2]) == -1)
				{
													
					if(winner[4] == 1)
					{
						rp_value = RP_Lookup(conf[0]);
						// Add the RP
						if(userRP[winner[2]] == null)
						{
							userRP[winner[2]] = new Array();
							userRP[winner[2]][0] = winner[3];
							userRP[winner[2]][1] = 0; // rp_value
							userRP[winner[2]][2] = 0; // Wins
							userRP[winner[2]][3] = winner[2]; // user ID
						}
					
						rp_value = rp_value/winner_count;
						userRP[winner[2]][1] += rp_value;
						userRP[winner[2]][2] ++;
						
					}
					
					// if winnner [4] = 1   and it's less than this week or the winner list is only 1 long... you've got a winner.
//					if(winner[4]==1 && ((winner[1] < g_Winners_Week && winner[1] != 0) || winner_list.length == 1))
					// removed the !=0 check since we have the winner slot fixed now.
					if((winner[4]==1 && ((winner[1] < g_Winners_Week) ) || winner_list.length == 1))
					{
						confRP[confRP.length-1].push(winner[3]);
					}			
			
					// Put the user on the spent user list
					spentusers.push(winner[2]);
				
					
				}				
			}
			

			

			
			
		}
	}
	
	console.log(confRPWL.toSource());
	
	var big_all_table = document.createElement("table");
	big_all_table.setAttribute("id","survivorConfBigTable");
		
	var big_done_table = document.createElement("table");
	big_done_table.setAttribute("id","survivorConfBigDoneTable");
	



	
	// Traverse the confRPWL array  (has confRP and Winner List)

	for each ([cWeek, cRP, cURP, cName, cContests, cEliminated, cSurvivors,  cElimTW, cAvgSW, cLink, cWinnerList] in confRPWL)
	{
		// Go through each conference.
		// Print the conference data
		
		var bigtr = document.createElement("tr");
		var bigtd = document.createElement("td");
		var bigtr2 = document.createElement("tr");

		var bigtd2 = document.createElement("td");

		console.log("cWeek, cRP, cURP, cName, cContests, cEliminated, cSurvivors, cElimTW, cAvgSW, cLink", cWeek, cRP, cURP, cName, cContests, cEliminated, cSurvivors, cElimTW, cAvgSW, cLink);
		
		cSurvivors = parseInt(cSurvivors);
		cEliminated = parseInt(cEliminated);
		cContests = parseInt(cContests);
		var totalthisweek = cSurvivors+cEliminated;

					
		bigtd.innerHTML = "[u][b]"+cName+ "  ("+cRP+" RP) [/b][/u] -" + cLink + "<br> &nbsp;&nbsp;&nbsp; Total Users entered this season: " + cContests +  "<br>&nbsp;&nbsp;&nbsp; Avg Survival Week: " + cAvgSW + "<br> &nbsp;&nbsp;&nbsp;" + cEliminated +" users of "+ totalthisweek +" eliminated in Week " + cWeek +  "<br>" ;
		bigtr.appendChild(bigtd);
		big_all_table.appendChild(bigtr);	
		
		// Check if there is a winner - week < current or only 1 survivor
		if(cWinnerList.length >0 && (cSurvivors == 1 || cWinnerList[0][1] < g_Winners_Week))
		{
			// Header
			var done_tr = document.createElement("tr");
			var done_td = document.createElement("td");
			done_td.innerHTML = bigtd.innerHTML;	
			done_tr.appendChild(done_td);
			big_done_table.appendChild(done_tr);	
			
			// Entries = all == 1 winslot
			for (var j = 0; j<cWinnerList.length && cWinnerList[j][4] == 1; j++)
			{
				var done_tr = document.createElement("tr");
				var done_td = document.createElement("td");

				// only entry... winner!
				done_td.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+cWinnerList[j][4]+ "     [b]" + cWinnerList[j][3] +"[/b]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Week "+ cWinnerList[j][1]+ " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[b] RP: "+ cURP +"[/b]";
				done_tr.appendChild(done_td);
				big_done_table.appendChild(done_tr);		
			}					
			
			var blank_tr = document.createElement("tr");
			blank_tr.innerHTML = "<td>&nbsp;&nbsp;</td>";
			big_done_table.appendChild(blank_tr);		

		}
		
		// Done with Done table
		

		// Now do All table

		if(g_maxwinners == -1)
		{
			//noop
		}
		else if(cSurvivors > g_maxwinners && g_maxwinners == 1)
		{
			bigtd.innerHTML += "&nbsp;&nbsp;&nbsp;"+ cSurvivors + " users currently tied  &nbsp;&nbsp;&nbsp;Week "+ cWeek+ "&nbsp;&nbsp;&nbsp;[b] RP: "+ cURP+"[/b]";	
			bigtr.appendChild(bigtd);
			big_all_table.appendChild(bigtr);	
		}
		else
		{
			var subloop_index = 0;
			
			console.log("here", cWinnerList.toSource());

			while (subloop_index < cWinnerList.length && cWinnerList[subloop_index][4] <= g_slotstodisplay) 
			{
	//			console.log(subloop_index);
				var bigtr = document.createElement("tr");
				var bigtd = document.createElement("td");
			
				bigtd.innerHTML += "&nbsp;&nbsp;&nbsp;"+cWinnerList[subloop_index][4]+ "     [b]" + cWinnerList[subloop_index][3] +"[/b]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Week "+ cWinnerList[subloop_index][1];
				bigtr.appendChild(bigtd);
				big_all_table.appendChild(bigtr);	
						
				subloop_index ++;
			}
		}	
	}

		
	// Add User Survival week Data into UserRP
	
	for each (winnerRP in userRP)
	{
		userRP[winnerRP[3]][1] = userRP[winnerRP[3]][1].toFixed(2)
		userRP[winnerRP[3]][4] = userSW[winnerRP[3]][1]; // Sum of avg Week;
		userRP[winnerRP[3]][5] = userSW[winnerRP[3]][2]; // Count of Contests
		userRP[winnerRP[3]][6] = (userSW[winnerRP[3]][1]/userSW[winnerRP[3]][2]).toFixed(2) // avg Week;
						
	}

	
	// after traversing winner_list ... userRP now has all of our users with RP.
	
	userRP_temp = new Array();
	removeBlanks(userRP,userRP_temp);
	userRP = userRP_temp;


// Don't do this yet.
//	userSW_temp = new Array();
//	removeBlanks(userSW,userSW_temp);	
//	userSW = userSW_temp;
//	userSW.sort(sortByRP);


	userRP.sort(sortByRP);

	


	// EffRP Table
	
	
	
	var tr = document.createElement("tr");						
	for each (title in ["EffRP",  "Username", "Alive", "Enter", "AvgSurW", "UserLink"])
	{
		var th = document.createElement("th");
		th.innerHTML = title;
		tr.appendChild(th);
	}
	RP_table.appendChild(tr);
	
	for each (winnerRP in userRP)
	{
		var tr = document.createElement("tr");

		if(winnerRP != null)
		{
			for each (entry in [winnerRP[1] /*EffRP*/, winnerRP[0] /*Username*/, winnerRP[2] /* Wins */ , winnerRP[5]  /* Contests */, winnerRP[6]   /* Average Surv Week */, usrsrvstr + winnerRP[3] /* user link */])
			{
				var td = document.createElement("td");
				td.innerHTML = entry;
				tr.appendChild(td);
			}					
		}
		
		RP_table.appendChild(tr);
	}		
	var returnedText = convertTableToText(RP_table);
//	console.log(returnedText);
	var tr = document.createElement("tr");
	tr.innerHTML =returnedText;
	RP_table2.appendChild(tr);	

	
	
	
	userRP.sort(sortByWins);

// Wins Table
	
	var tr = document.createElement("tr");						
	for each (title in ["Alive",  "Username", "EffRP", "Enter", "AvgSurW", "UserLink"])
	{
		var th = document.createElement("th");
		th.innerHTML = title;
		tr.appendChild(th);
	}
	wins_table.appendChild(tr);
	
	for each (winnerRP in userRP)
	{
		var tr = document.createElement("tr");

		if(winnerRP != null)
		{
			for each (entry in [winnerRP[2] /* Wins */, winnerRP[0] /*Username*/,  winnerRP[1]/*EffRP*/, winnerRP[5] /* Contests */, winnerRP[6] /* Average Surv Week */, usrsrvstr + winnerRP[3] /* user link */])
			{
				var td = document.createElement("td");
				td.innerHTML = entry;
				tr.appendChild(td);
			}					
		}
		
		wins_table.appendChild(tr);
	}		
	var returnedText = convertTableToText(wins_table);
//	console.log(returnedText);
	var tr = document.createElement("tr");
	tr.innerHTML =returnedText;
	wins_table2.appendChild(tr);
	
	
	

// AW Table

	userRP.sort(sortByAW);

	
	var tr = document.createElement("tr");						
	for each (title in ["AvgSurW",  "Username", "Alive", "Enter", "EffRP", "UserLink"])
	{
		var th = document.createElement("th");
		th.innerHTML = title;
		tr.appendChild(th);
	}
	aw_table.appendChild(tr);
	
	for each (winnerRP in userRP)
	{
		var tr = document.createElement("tr");

		if(winnerRP != null)
		{
			for each (entry in [winnerRP[6] /* Average Surv Week */, winnerRP[0] /*Username*/, winnerRP[2] /* Wins */ , winnerRP[5] /* Contests */, winnerRP[1]/*EffRP*/ , usrsrvstr + winnerRP[3] /* user link */])
			{
				var td = document.createElement("td");
				td.innerHTML = entry;
				tr.appendChild(td);
			}					
		}
		
		aw_table.appendChild(tr);
	}		
	var returnedText = convertTableToText(aw_table);
//	console.log(returnedText);
	var tr = document.createElement("tr");
	tr.innerHTML =returnedText;
	aw_table2.appendChild(tr);	


	
	var returnedText = convertTableToText(conf_table);
//	console.log(returnedText);
	var tr = document.createElement("tr");
	tr.innerHTML =returnedText;
	conf_table2.appendChild(tr);	
	

	
	// place the table
	var content = document.getElementById("content");
	var content_maploc =  document.getElementById("america_map");
	
	
	// RP Leaders
	var spandiv = document.createElement("div");
    spandiv.innerHTML = "<br><hr>RP<br><br>[b] -------- EffRP Leaderboard -------- [/b]<br>"	
	content.insertBefore(spandiv,content_maploc);	
	content.insertBefore(RP_table2, content_maploc);	
	
	// Wins Leaders
	var spandiv = document.createElement("div");
    spandiv.innerHTML = "<br><hr>Wins<br><br>[b] -------- Alive Leaderboard -------- [/b]<br>"	
	content.insertBefore(spandiv,content_maploc);	
	content.insertBefore(wins_table2, content_maploc);

	// AVG Week Leaders
	var spandiv = document.createElement("div");
    spandiv.innerHTML = "<br><hr>AVG Week<br><br>[b] -------- Avg Week Leaderboard -------- [/b]<br>"	
	content.insertBefore(spandiv,content_maploc);	
	content.insertBefore(aw_table2, content_maploc);

	// Conf Table Contests
	var spandiv = document.createElement("div");
    spandiv.innerHTML = "<br><hr>ConfTable<br><br>[b] -------- Conferences -------- [/b]<br>"	
	content.insertBefore(spandiv,content_maploc);	
	content.insertBefore(conf_table2, content_maploc);

	// Big Done Contests
	var spandiv = document.createElement("div");
    spandiv.innerHTML = "<br><hr>BigDone<br><br>[b] -------- Done Contests -------- [/b]<br>"	
	content.insertBefore(spandiv,content_maploc);	
	content.insertBefore(big_done_table, content_maploc);
	
	// Big All Contests
	var spandiv = document.createElement("div");
    spandiv.innerHTML = "<br><hr>BigAll<br><br>[b] -------- All Contests -------- [/b]<br>"	
	content.insertBefore(spandiv,content_maploc);	
	content.insertBefore(big_all_table, content_maploc);



	
	
	//content.insertBefore(table,content.firstChild.nextSibling.nextSibling.nextSibling.nextSibling);

	
	
}

function convertTableToText(tableToConvert)
{

	var returnText ="";
	// Figure out the longest string in each Column;
	var longest = new Array();
	for (var c = 0; c < tableToConvert.rows[0].cells.length; c++)
		longest.push(0);
	
	
	for (var i = 0, row; row = tableToConvert.rows[i]; i++) 
	{
		//iterate through rows
		//rows would be accessed using the "row" variable assigned in the for loop
		for (var j = 0, col; col = row.cells[j]; j++) 
		{
			if(col.innerHTML.toString().length > longest[j])
				longest[j] = col.innerHTML.toString().length;			
		}  
	}
	
//	console.log(longest);
	
	// Iterate and fill in with space plus dots...
	
	
	// i's and l's are 1/2
	
	
	for (var i = 0, row; row = tableToConvert.rows[i]; i++) 
	{
		//iterate through rows
		//rows would be accessed using the "row" variable assigned in the for loop
		for (var j = 0, col; col = row.cells[j]; j++) 
		{		
			returnText += col.innerHTML + "&nbsp;";
			if (j<row.cells.length-1)
			{
				// find number of i's and l's
				var content = col.innerHTML.toString();
				var contentlength = 2*content.length;
				contentlength -= content.split("i").length - 1;
				contentlength -= content.split("I").length - 1;
				contentlength -= content.split("l").length - 1;
				contentlength -= content.split("j").length - 1;
				contentlength -= content.split("t").length - 1;
				contentlength -= content.split(".").length - 1;
				contentlength -= content.split("f").length - 1;
				contentlength += content.split("m").length - 1;
				contentlength += content.split("M").length - 1;
				
				for(z = 0; z< 2*longest[j] - contentlength; z++)
					returnText += ".";
				returnText += ".";
				returnText += "&nbsp;";
			}			
		}  
		returnText +="<br>";
	}
	
	return returnText;

}


// Bear Awards --  give to the highest placed contest, eliminate tie sharing

function prints_winners_bear(s_winners)
{


 // Setup the table

	var bear_table = document.createElement("table");
	bear_table.setAttribute("id","survivorBearTable");


	var RP_table = document.createElement("table");
	RP_table.setAttribute("id","survivorConfRPTable");
	
	
	var userRP = new Array();

	console.log("pre RP sort", s_winners.toSource());

	
	// Need to sort by contest RP first.
	s_winners.sort(sortByRP_contests);
	
	console.log("post RP sort", s_winners.toSource());
	

		// Take the spent users list out to here
	var spentusers = new Array();
	
	for each ([conf, winner_list] in s_winners)
	{
		if (conf != null)
		{
		
			var cont_done = false;
		
			var tr = document.createElement("tr");
			var td = document.createElement("td");

			var tr2 = document.createElement("tr");
			var td2 = document.createElement("td");

			
			
			// Name, 
			td.innerHTML = "[u][b]"+conf[0]+ "  ("+RP_Lookup(conf[0])+" RP) [/b][/u] -" + lsrvstr + conf[1]+ "<br>";
			td2.innerHTML = td.innerHTML;
				
			// now we're doling it out
			var winner_found = false;
			var winner_winslot = 1;
			
			for each (winner in winner_list)
			{
			
				// Structure of winner:
				// [league ID, week, user_id, user_name, winslot]
			
				// if our user is spent, move on.
				if (spentusers.indexOf(winner[2]) == -1)
				{
					//winner_found = true;
					
					// winner[4] is the winslot (ie place for the winner)
					// ideally we give it to the 1st place, but sometimes they got higher awards so we need to drop down to the next highest place without a winner
					
					// if a winner is found, we set the winner_winslot to that level.
					if (winner_found)
					{
						if(winner_winslot == winner[4])
						{
							// this means that this is a "tie" for that winslot
							// award the loving bitches!
							
							// award RP here
							rp_value = RP_Lookup(conf[0]);
							// Add the RP
							if(userRP[winner[2]] == null)
							{
								userRP[winner[2]] = new Array();
								userRP[winner[2]][0] = winner[3];
								userRP[winner[2]][1] = 0;
								userRP[winner[2]][2] = 0;
							}
						
							userRP[winner[2]][1] += rp_value;
							userRP[winner[2]][2] ++;
						
							td.innerHTML += "&nbsp;&nbsp;&nbsp;"+winner[4]+ "     [b]" + winner[3] +"[/b]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Week "+ winner[1]+ " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[b] RP: "+ rp_value.toFixed(2) +"[/b]<br>";						
							// and eliminate the user
							spentusers.push(winner[2]);							
						}
						else
						{
							// winslot is above (assume it is sorted) the winner_winslot.. which means no win for you user.
						}
					}
					else
					{
						// means we don't have a winner yet (because they've been spent thus far, but never fear, the current winner is our winner.. so set the shit.
						winner_found = true;
						winner_winslot = winner[4];
						
						// and award the RP here too

						rp_value = RP_Lookup(conf[0]);
						// Add the RP
						if(userRP[winner[2]] == null)
						{
							userRP[winner[2]] = new Array();
							userRP[winner[2]][0] = winner[3];
							userRP[winner[2]][1] = 0;
							userRP[winner[2]][2] = 0;
						}
					
						userRP[winner[2]][1] += rp_value;
						userRP[winner[2]][2] ++;
						
						
						td.innerHTML += "&nbsp;&nbsp;&nbsp;"+winner[4]+ "     [b]" + winner[3] +"[/b]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Week "+ winner[1]+ " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[b] RP: "+ rp_value.toFixed(2) +"[/b]<br>";

						// and eliminate the user
						spentusers.push(winner[2]);
					}
								
					
				}				
			}
						
			td.innerHTML += "<br>";				
			tr.appendChild(td);
			bear_table.appendChild(tr);			
			
		}
	}

	
	
	// after traversing winner_list ... userRP now has all of our users with RP.
	
	userRP_temp = new Array();
	removeBlanks(userRP,userRP_temp);
	
	userRP = userRP_temp;
	

	userRP.sort(sortByRP);
	console.log("1114 - userRP - Post Sort", userRP.toSource());	
	var tr = document.createElement("tr");
	var td = document.createElement("td");

	for each (winnerRP in userRP)
	{
		if(winnerRP != null)
			td.innerHTML += winnerRP[1].toFixed(2) + " RP &nbsp;&nbsp;&nbsp;[b]" +winnerRP[0]+ "  [/b]&nbsp;&nbsp;&nbsp; Total Wins: " + winnerRP[2] +"<br>";		
	}
	
	td.innerHTML += "<br>";					
	tr.appendChild(td);
	RP_table.appendChild(tr);
	
	// place the table
	var content = document.getElementById("content");
	var content_maploc =  document.getElementById("america_map");
	
	
	// RP Leaders
	var spandiv = document.createElement("div");
    spandiv.innerHTML = "<br><hr>RP<br><br>[b] -------- Bear EffRP Leaderboard -------- [/b]<br>"	
	content.insertBefore(spandiv,content_maploc);	
	content.insertBefore(RP_table, content_maploc);	
	
	// All Contests
	var spandiv = document.createElement("div");
    spandiv.innerHTML = "<br><hr>All<br><br>[b] -------- Bear Table Contests -------- [/b]<br>"	
	content.insertBefore(spandiv,content_maploc);	
	content.insertBefore(bear_table, content_maploc);


	//content.insertBefore(table,content.firstChild.nextSibling.nextSibling.nextSibling.nextSibling);

	
	
}



/////////////////////////////////////
////// SORTING /////////////////////
/////////////////////////////////////



function sortConfByName (zB, zA)
{
	if(zB[0] == null)
		return 1;
	else if (zA[0] == null)
		return -1 ;
	if (zA[0]  >  zB[0])
        return -1;
     else if (zA[0]  <  zB[0])
        return 1;
     else
        return 0;
}

// zA [wins,UID, Name, [Conf #, ConfName], [,]...]
function SortByContests (zA, zB)
{
	if(zA[0] == null && zB[0] == null)
		return 0;
	else if(zA[0] == null)
		return 1;
	else if (zB[0] == null)
		return -1;
	else if (zA[0]  >  zB[0])
        return -1;
     else if (zA[0]  <  zB[0])
        return 1;
     else
        return 0;
}


function sortByWeek (zA, zB)
{

	if(zA[1] == null)
		return 1;
	else if (zB[1] == null)
		return -1;
    else if (zA[1]  >  zB[1])
        return -1;
     else if (zA[1]  <  zB[1])
        return 1;
     else
	{
		if(zA[4] == null)
			return -1;
		else if (zB[4] == null)
			return 1;
		else if (zA[4]  <  zB[4])
			return -1;
		else if (zA[4]  >  zB[4])
			return 1;
		else
			return 0;
	}
}


function sortByRP_contests (zA, zB)
{

	//					[[Rookie #4, 241], [[data[0], 20, user_id, user_name], [data[0], week, user_id, user_name], [data[0], week, user_id, user_name]] , [[data[0], 19, user_id, user_name], [data[0], week, user_id, user_name], [data[0], week, user_id, user_name]]   ]		
//RP_Lookup(conf[0])
	if(zA[0][0] == null)
		return 1;
	else if (zB[0][0] == null)
		return -1;
    else if (parseInt(RP_Lookup(zA[0][0]))  >  parseInt(RP_Lookup(zB[0][0])))
        return -1;
    else if (parseInt(RP_Lookup(zA[0][0]))  <  parseInt(RP_Lookup(zB[0][0])))
        return 1;
     else
		return 0;
}



function sortByRP (zA, zB)
{
	if(zA[1] == null)
		return 1;
	else if (zB[1] == null)
		return -1;
    else if (parseInt(zA[1])  >  parseInt(zB[1]))
        return -1;
    else if (parseInt(zA[1])  <  parseInt(zB[1]))
        return 1;
     else
		return 0;
}




function sortByWins (zA, zB)
{
	if(zA[2] == null)
		return 1;
	else if (zB[2] == null)
		return -1;
	else if (parseInt(zA[2])  >  parseInt(zB[2]))
        return -1;
	else if (parseInt(zA[2])  <  parseInt(zB[2]))
        return 1;
     else
		return 0;
			
		
}

function sortByAW (zA, zB)
{
	if(zA[6] == null)
		return 1;
	else if (zB[6] == null)
		return -1;
	else if (parseFloat(zA[6])  >  parseFloat(zB[6]))
        return -1;
	else if (parseFloat(zA[6])  <  parseFloat(zB[6]))
        return 1;
     else
		return 0;
			
		
}









/////////////////////////////////////
////// HELPERS /////////////////////
/////////////////////////////////////

function removeBlanks(array1, array2)
{
	for each (user in array1)
	{
		if (array1 != null)
			array2.push(user);
	}	

}



function getInetPageSurv(address, func) {
    console.log("getInetPage : "+address);
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
			func(address, this);
		}
	};

	req.send(null);
	return req;
}


function RP_Lookup(conference_name)
{

	var trophyvalue = 100;
	if(conference_name.indexOf("World League") != -1)
		trophyvalue = 10000;
	else if(conference_name.indexOf("Casual Pro League") != -1)
		trophyvalue = 1000;
	else if(conference_name.indexOf("Pee Wee Gold") != -1)
		trophyvalue = 500;
	else if(conference_name.indexOf("Regional Pro League") != -1)
		trophyvalue = 400;	
	else if(conference_name.indexOf("Semi Pro") != -1)
		trophyvalue = 300;
	else if(conference_name.indexOf("Pro League") != -1)
		trophyvalue = 500;
	else if(conference_name.indexOf("Regional Pro") != -1)
		trophyvalue = 400;
	else if(conference_name.indexOf("National Minor") != -1)
		trophyvalue = 250;
	else if(conference_name.indexOf("Regional Minor") != -1)
		trophyvalue = 225;
	else if(conference_name.indexOf("Local Minor") != -1)
		trophyvalue = 200;
	else if(conference_name.indexOf("University") != -1)
		trophyvalue = 175;
	else if(conference_name.indexOf("Prep") != -1)
		trophyvalue = 150;
	else if(conference_name.indexOf("Sophomore") != -1)
		trophyvalue = 125;

	return trophyvalue;
}





