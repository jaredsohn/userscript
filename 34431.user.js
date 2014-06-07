// ==UserScript==
// @name           Razzas Fantasy Premier League script
// @namespace      FPL
// @description    Show more information on players to help with transfers, and fix a bug with the FPL site
// @include        http://fantasy.premierleague.com/*
// @include        http://www.statto.com/*
// @include        http://crackthecode.fiso.co.uk/home.html
// ==/UserScript==
// Options

/*

C = Complete
B = Broken

C	1. Allows all stats to be shown in the player profile window.
C	2. Enlarge the player profile window 
C	3. Allows you to click a player's points in the transfer page to see points from last 3 games and fixtures for next 3 games 
C	4. Show more info about each player in graphical view such as price paid, sells for, price now, form, value form 
B	5. Show info on the effectiveness of your squad and 'best 11' such as overall form, points to help decide if transfers are worthwhile 
C	6. Add more stats to sort players on such as score last season, NTIs, NTOs, and a rating I calculate for each player
B	7. Show a link to each manager's history page from league pages 
B	8. Show how well the captain has done on each week and an overall total on history page.
B	11. The team information is updated after every time you change the squad 
C	12. Added Megatons Rating 
C	15. Added 'My Team' to the list of filters in the transfer page 
B	19. Hover over the team name in league list to see how the team has done that week
C	20. Add home and Away information to player information window
C	21. Add fixture info to razzarating
C	22. Save username and password info - chrome doesn't offer option
C	23. Display player's points alongside every stat
C	24. Add ability to sort by crack the code data (price change liklihood)
C	25. First stab at showing difficultyof upcoming fixture, more to come on this including next n fixtures

*/

// Once stealISMData() is called this will contain all the good data about players, teams etc
var ismData;
// Once stealISMData() is called this will contain the data about the player most recently shown in playerInfo window
var ismPlayerData;
// All URLs that need to be retrieved to get data
var MyStattoURLs = new Array();
var MyStattoURLIndex = 1;
var MyCTCURLs = new Array();
var MyCTCURLIndex = 1;
var StattoStats;
var MyTeamAbbreviations = new Array();
var showExtraColumnInFilter = true;
var extraColumnToShowInFilter;
var RRWeeksToLookAhead = 3;

// This is the function called once the script has been inserted if in Chrome, or once firefox/opera are ready
function CorrectPage()
{
// TODO: REMOVE this to the correct place
// $('a[href^="/entry/"]').parent().html(function (index,oldHTML) {return oldHTML + "&nbsp;<a class='razzahover' href='" + $(this).children(0).attr('href').replace('history','event-history') + "1'>Week 1</a>";});
// $(".razzahover").each(function (index) {  $.ajax( {url: $(this).attr('href'), myObject: this, success: function(data) {$(this.myObject).append("&nbsp;Score = " + data.match("[0-9]+<sub>pts</sub>")[0]); }} )  });

/*
last years home 10
last years home bottom half 20
last years bottom half 10
last years 10
this years home 10
this years home bottom half 20
this years bottom half 10
this years 10
*/

	
	// 1 & 2 & 20
	// Expand player info window to remove tabs on all pages
	if (document.URL.match("http://fantasy.premierleague.com/"))
	{
		// Get access to the internal data of players etc
		stealISMData()
		DefineExternalData();
		
		enhancePlayerInformationWindow(); // 1 & 2 20
	}
	
	// 3
	// Show fixture info when clicking on points
	if (document.URL.match("http://fantasy.premierleague.com/transfers/"))
	{
		var to = setTimeout( showFixturesWhenScoreClicked, 700);
		
	}
	
	// 4
	// Show more info on player in the graphical layouts
	if (document.URL.match("http://fantasy.premierleague.com/"))
	{
		addExtraPlayerInfoOnGraphicalLayout(); 
	}
	
	// 6, 12
	// Add more stats to sort players on such as score last season, NTIs, NTOs, and a rating I calculate for each player
	// Needs a delay as need to wait to steal ISM Data
	if (document.URL.match("http://fantasy.premierleague.com/transfers/"))
	{
		// TODO: Temporary until ISM fix the player stats such as last season, form, ppg etc
		// var to = setTimeout( getJSONForEachPlayer, 1700);
		var to = setTimeout( addSortableStats, 1700); 
		// var to = setTimeout( addSortableStats, 700); 
	}
	
	// 15
	// Add 'My Team' to filter for player transfers
	// Needs a delay as need to wait to steal ISM Data
	if (document.URL.match("http://fantasy.premierleague.com/transfers/"))
	{
		var to = setTimeout( addMyTeam, 300); 
	}
	
	// 19
	// Hover over the team name in league list to see how the team has done that week
	if (document.URL.match("http://fantasy.premierleague.com/"))
	{
		ShowCurrentScoresAndPlayerPlayed(); 
	}
	
	// 22
	// Save username and password
	/*
	if (document.URL.match("^http://fantasy.premierleague.com/$"))
	{
		addSaveCredentialsDiv();
		loadCredentials();
	}
	*/
	
	if (document.URL.match("http://fantasy.premierleague.com/transfers/"))
	{
		prepareLeagueTableRetrieval()
	}
}

function prepareLeagueTableRetrieval ()
{
	window.addEventListener("message", receiveMessage, false);  
	// unsafeWindow.AddCallbackFrame = AddCallbackFrame;
	
	// Get the last time the data was updated in order to display that info
	var ctcUpdateTime= "";
	if (localStorage.getItem('CTCUpdateTime'))
	{
		ctcUpdateTime = localStorage.getItem('CTCUpdateTime');
	}
	else
	{
		ctcUpdateTime = "Never";
	}
	var playerInfoUpdateTime= "";
	if (localStorage.getItem('PlayerInfoUpdateTime'))
	{
		playerInfoUpdateTime = localStorage.getItem('PlayerInfoUpdateTime');
	}
	else
	{
		playerInfoUpdateTime = "Never";
	}

	$('body').append('<div id="dialog" title="Please Wait"><p>The script is collecting and storing the needed info please wait up to 1 minute.  This dialogue box will close automatically when done.</p><div id="progressbar"></div><div id="progress"></div></div>');
	$('#dialog').dialog({autoOpen : false});
	$( "#progressbar" ).progressbar();
	$('.ismSection3').after("<button id='showRazzaFPLOptions' class='AddInfoButton' style='font-size: 80%;'>Show Razzas FPL Script options</button>");
	
	razzasFPLOptionsHTML = '<div id="razzasFPLOptionsDialog" title="Razza\'s FPL config options">';
	razzasFPLOptionsHTML += "<a href='http://Statto.com' style='font-size: 65%;'>Fixture info from Statto.com - @ <span id='StattoUpdatedTime'>" + playerInfoUpdateTime + "</span></a>";
	razzasFPLOptionsHTML += "<button id='addStattoInfo' title='Retrieve fixture stats and store for later use' class='AddInfoButton' style='font-size: 80%;'>Add Player Fixture Info</button>";
	razzasFPLOptionsHTML += "<br/><a href='http://www.fiso.co.uk/crackthecode.php' style='font-size: 65%;'>CracktheCode from Fiso - @ <span id='CTCUpdatedTime'>" + ctcUpdateTime + "</span></a>";
	razzasFPLOptionsHTML += "<button id='addCTCInfo' title='Retrieve crack the code stats and store for later use' class='AddInfoButton' style='font-size: 80%;'>Add Crack The Code Info</button>";
	razzasFPLOptionsHTML += "<br/><div style='padding-top :5px; font-size: 65%;'>Click the button to turn on/off showing an extra column of data for each player</div>";
	razzasFPLOptionsHTML += "<div id='addTotalScoreInfoCheckboxDiv' style='width:160px;'><input type='checkbox' id='addTotalScoreInfo' class='AddInfoButton' onClick=\"toggleShowExtraColumn()\"/><label for='addTotalScoreInfo' style='font-size: 80%;'>Show another column of stats</label></div>";
	razzasFPLOptionsHTML += "<br/><div style='padding-top :5px; font-size: 65%;'>How many fixtures to look ahead to for Razzarating (inc fixtures)</div>";
	razzasFPLOptionsHTML += "<select id='LookAheadWeeks'></Select>";
	razzasFPLOptionsHTML += "</div>";
	
	$('body').append(razzasFPLOptionsHTML);
	optelem = document.createElement("option"); optelem.text = "1"; optelem.value = "1"; $('#LookAheadWeeks')[0].options.add(optelem);
	optelem = document.createElement("option"); optelem.text = "2"; optelem.value = "2"; $('#LookAheadWeeks')[0].options.add(optelem);
	optelem = document.createElement("option"); optelem.text = "3"; optelem.value = "3"; $('#LookAheadWeeks')[0].options.add(optelem);
	optelem = document.createElement("option"); optelem.text = "5"; optelem.value = "5"; $('#LookAheadWeeks')[0].options.add(optelem);
	optelem = document.createElement("option"); optelem.text = "7"; optelem.value = "7"; $('#LookAheadWeeks')[0].options.add(optelem);
	optelem = document.createElement("option"); optelem.text = "10"; optelem.value = "10"; $('#LookAheadWeeks')[0].options.add(optelem);
	optelem = document.createElement("option"); optelem.text = "15"; optelem.value = "15"; $('#LookAheadWeeks')[0].options.add(optelem);
	$('#LookAheadWeeks').change(function(){RRWeeksToLookAhead = $('#LookAheadWeeks')[0].value;getJSONForEachPlayer();});
	
	$('#dialog').dialog({autoOpen : false});
	$('#razzasFPLOptionsDialog').dialog({autoOpen : false});
	$('.AddInfoButton').button();
	
	$('#showRazzaFPLOptions').click(function (){$('#razzasFPLOptionsDialog').dialog('open');});
	$('#addStattoInfo').click(AddStattoCallbackFrames);
	$('#addCTCInfo').click(AddCTCCallbackFrames);
	
}

function toggleShowExtraColumn()
{
	showExtraColumnInFilter = $('#addTotalScoreInfo').attr('checked');
	$('#ismElementFilter').trigger("change");
}

function DefineExternalData()
{
	MyStattoURLs[MyStattoURLs[1] = "http://www.statto.com/football/stats/england/premier-league/2010-2011/true-table/full"] = 1;
	MyStattoURLs[MyStattoURLs[2] = "http://www.statto.com/football/stats/england/premier-league/2010-2011/true-table/home"] = 2;
	MyStattoURLs[MyStattoURLs[3] = "http://www.statto.com/football/stats/england/premier-league/2010-2011/true-table/away"] = 3;
	MyStattoURLs[MyStattoURLs[4] = "http://www.statto.com/football/stats/england/premier-league/2010-2011/versus-top-half/full"] = 4;
	MyStattoURLs[MyStattoURLs[5] = "http://www.statto.com/football/stats/england/premier-league/2010-2011/versus-top-half/home"] = 5;
	MyStattoURLs[MyStattoURLs[6] = "http://www.statto.com/football/stats/england/premier-league/2010-2011/versus-top-half/away"] = 6;
	MyStattoURLs[MyStattoURLs[7] = "http://www.statto.com/football/stats/england/premier-league/2010-2011/versus-bottom-half/full"] = 7;
	MyStattoURLs[MyStattoURLs[8] = "http://www.statto.com/football/stats/england/premier-league/2010-2011/versus-bottom-half/home"] = 8;
	MyStattoURLs[MyStattoURLs[9] = "http://www.statto.com/football/stats/england/premier-league/2010-2011/versus-bottom-half/away"] = 9;
	MyStattoURLs[MyStattoURLs[10] = "http://www.statto.com/football/stats/england/premier-league/2011-2012/true-table/full"] = 10;
	MyStattoURLs[MyStattoURLs[11] = "http://www.statto.com/football/stats/england/premier-league/2011-2012/true-table/home"] = 11;
	MyStattoURLs[MyStattoURLs[12] = "http://www.statto.com/football/stats/england/premier-league/2011-2012/true-table/away"] = 12;
	MyStattoURLs[MyStattoURLs[13] = "http://www.statto.com/football/stats/england/premier-league/2011-2012/versus-top-half/full"] = 13;
	MyStattoURLs[MyStattoURLs[14] = "http://www.statto.com/football/stats/england/premier-league/2011-2012/versus-top-half/home"] = 14;
	MyStattoURLs[MyStattoURLs[15] = "http://www.statto.com/football/stats/england/premier-league/2011-2012/versus-top-half/away"] = 15;
	MyStattoURLs[MyStattoURLs[16] = "http://www.statto.com/football/stats/england/premier-league/2011-2012/versus-bottom-half/full"] = 16;
	MyStattoURLs[MyStattoURLs[17] = "http://www.statto.com/football/stats/england/premier-league/2011-2012/versus-bottom-half/home"] = 17;
	MyStattoURLs[MyStattoURLs[18] = "http://www.statto.com/football/stats/england/premier-league/2011-2012/versus-bottom-half/away"] = 18;
	MyCTCURLs[MyCTCURLs[1] = "http://crackthecode.fiso.co.uk/home.html"] = 1;
	
	StattoStats = new Object();
	StattoStats.LastYear = new Object();
	StattoStats.LastYear.True = new Object();
	StattoStats.LastYear.True.Full = 1;
	StattoStats.LastYear.True.Home = 2;
	StattoStats.LastYear.True.Away = 3;
	StattoStats.LastYear.VersusTopHalf = new Object();
	StattoStats.LastYear.VersusTopHalf.Full = 4;
	StattoStats.LastYear.VersusTopHalf.Home = 5;
	StattoStats.LastYear.VersusTopHalf.Away = 6;
	StattoStats.LastYear.VersusBottomHalf = new Object();
	StattoStats.LastYear.VersusBottomHalf.Full = 7;
	StattoStats.LastYear.VersusBottomHalf.Home = 8;
	StattoStats.LastYear.VersusBottomHalf.Away = 9;
	StattoStats.ThisYear = new Object();
	StattoStats.ThisYear.True = new Object();
	StattoStats.ThisYear.True.Full = 10;
	StattoStats.ThisYear.True.Home = 11;
	StattoStats.ThisYear.True.Away = 12;
	StattoStats.ThisYear.VersusTopHalf = new Object();
	StattoStats.ThisYear.VersusTopHalf.Full = 13;
	StattoStats.ThisYear.VersusTopHalf.Home = 14;
	StattoStats.ThisYear.VersusTopHalf.Away = 15;
	StattoStats.ThisYear.VersusBottomHalf = new Object();
	StattoStats.ThisYear.VersusBottomHalf.Full = 16;
	StattoStats.ThisYear.VersusBottomHalf.Home = 17;
	StattoStats.ThisYear.VersusBottomHalf.Away = 18;
	
	StattoStats.Name = 0;
	StattoStats.Played = 1;
	StattoStats.Won = 2;
	StattoStats.Drawn = 3;
	StattoStats.Lost = 4;
	StattoStats.CleanSheet = 5;
	StattoStats.FailedToScore = 6;
	StattoStats.For = 7;
	StattoStats.Against = 8;
	StattoStats.GoalDifference = 9;
	StattoStats.Points = 10;
	StattoStats.PointsPerGame = 11;
	
	MyTeamAbbreviations["Arsenal"] = MyTeamAbbreviations["Arsenal"] = ["Arsenal","ARS",1];
	MyTeamAbbreviations["Aston Villa"] = MyTeamAbbreviations["Aston Villa"] = ["Aston Villa","AVL",2];
	MyTeamAbbreviations["Blackburn"] = MyTeamAbbreviations["Blackburn Rovers"] = ["Blackburn","BLA",4];
	MyTeamAbbreviations["Bolton"] = MyTeamAbbreviations["Bolton Wanderers"] = ["Bolton","BOL",6];
	MyTeamAbbreviations["Chelsea"] = MyTeamAbbreviations["Chelsea"] = ["Chelsea","CHE",7];
	MyTeamAbbreviations["Everton"] = MyTeamAbbreviations["Everton"] = ["Everton","EVE",8];
	MyTeamAbbreviations["Fulham"] = MyTeamAbbreviations["Fulham"] = ["Fulham","FUL",9];
	MyTeamAbbreviations["Liverpool"] = MyTeamAbbreviations["Liverpool"] = ["Liverpool","LIV",10];
	MyTeamAbbreviations["Man City"] = MyTeamAbbreviations["Manchester City"] = ["Man City","MCI",11];
	MyTeamAbbreviations["Man Utd"] = MyTeamAbbreviations["Manchester United"] = ["Man Utd","MUN",12];
	MyTeamAbbreviations["Newcastle"] = MyTeamAbbreviations["Newcastle United"] = ["Newcastle","NEW",13];
	MyTeamAbbreviations["Stoke City"] = MyTeamAbbreviations["Stoke City"] = ["Stoke City","STO",14];
	MyTeamAbbreviations["Sunderland"] = MyTeamAbbreviations["Sunderland"] = ["Sunderland","SUN",15];
	MyTeamAbbreviations["Tottenham"] = MyTeamAbbreviations["Tottenham Hotspur"] = ["Tottenham","TOT",16];
	MyTeamAbbreviations["West Brom"] = MyTeamAbbreviations["West Bromwich Albion"] = ["West Brom","WBA",17];
	MyTeamAbbreviations["Wigan"] = MyTeamAbbreviations["Wigan Athletic"] = ["Wigan","WIG",19];
	MyTeamAbbreviations["Wolves"] = MyTeamAbbreviations["Wolverhampton Wndrs"] = ["Wolves","WOL",20];
	MyTeamAbbreviations["Norwich"] = MyTeamAbbreviations["Norwich City"] = ["Norwich","NOR",21];
	MyTeamAbbreviations["QPR"] = MyTeamAbbreviations["Queens Park Rangers"] = ["QPR","QPR",22];
	MyTeamAbbreviations["Swansea"] = MyTeamAbbreviations["Swansea City"] = ["Swansea","SWA",23];
	MyTeamAbbreviations["Birmingham"] = MyTeamAbbreviations["Birmingham City"] = ["Birmingham","BC",3];
	MyTeamAbbreviations["Blackpool"] = MyTeamAbbreviations["Blackpool"] = ["Blackpool","BL",5];
	MyTeamAbbreviations["West Ham"] = MyTeamAbbreviations["West Ham United"] = ["West Ham","WH",18];
}
	
// Functions to recieve data from the statto website 
function receiveMessage(event)  
{
	// seperate
	// localStorage.clear();
	var commaPos, secondCommaPos;
	var frameName = event.data.substring(0, commaPos = event.data.indexOf(','));
	var URL = event.data.substring(commaPos + 1, secondCommaPos = event.data.indexOf(',',commaPos + 1));
	var HTML = event.data.substring(secondCommaPos + 1);
	
	$('#' + frameName).remove();
	if (frameName.match("statto"))
	{
		var d=new Date();
		var PlayerInfoUpdateTime = d.getHours() + ":" + d.getMinutes() + " " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
		localStorage.setItem('PlayerInfoUpdateTime',PlayerInfoUpdateTime);
		$('#StattoUpdatedTime').html(PlayerInfoUpdateTime);

		var TeamInfoRegex = /class="team"><[^>]*>([^<]*)<[\s\S]*?([+-]?[0-9.]+)[\s\S]*?([+-]?[0-9.]+)[\s\S]*?([+-]?[0-9.]+)[\s\S]*?([+-]?[0-9.]+)[\s\S]*?([+-]?[0-9.]+)[\s\S]*?([+-]?[0-9.]+)[\s\S]*?([+-]?[0-9.]+)[\s\S]*?([+-]?[0-9.]+)[\s\S]*?([+-]?[0-9.]+)[\s\S]*?([+-]?[0-9.]+)[\s\S]*?([+-]?[0-9.]+)/ig;
		while (TeamInfoMatch = TeamInfoRegex.exec(HTML))
		{
			TeamInfoMatch.shift();
			// alert(MStattoStats.CleanSheetyTeamAbbreviations[TeamInfoMatch[0]].join(",") + " - " + TeamInfoMatch.join(","));
			localStorage.setItem(MyTeamAbbreviations[TeamInfoMatch[0]][1] + "," + MyStattoURLs[URL],TeamInfoMatch);
		}
		
		$( "#progressbar" ).progressbar( "option", "max", 18 );
		$( "#progressbar" ).progressbar( "option", "value", MyStattoURLIndex );
		$( "#progress" ).html( MyStattoURLIndex + '\\' + 18 );

		
		if (MyStattoURLIndex < 18)
		{
		  	MyStattoURLIndex++;
			AddCallbackFrame("statto" + MyStattoURLIndex,MyStattoURLs[ MyStattoURLIndex ],500);
		}
		else
		{
		      getJSONForEachPlayer();
		      $('#dialog').dialog('close');
		}
	}
	else if (frameName.match("CTC"))
	{
		var d=new Date();
		var CTCUpdateTime = d.getHours() + ":" + d.getMinutes() + " " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
		localStorage.setItem('CTCUpdateTime',CTCUpdateTime);
		$('#CTCUpdatedTime').html(CTCUpdateTime);

		// HTML is the crack the code XML
		$(HTML).find('PLAYER').each(function () {
			var playerId = $(this).find('ID').text();
			var CUR_NTI_PERCENT = parseInt($(this).find('NTI_PERCENT').text(), 10);
			var CUR_NTI = parseInt($(this).find('NTI').text(), 10);
			localStorage.setItem(playerId + ",CTC",CUR_NTI_PERCENT);
			ismData.elInfo[playerId][ismData.elStat.CrackTheCode] = CUR_NTI_PERCENT;
		});
		addExtraPlayerInfoOnGraphicalLayout();
		$('#dialog').dialog('close');
	}  
}

var JSONPlayersProcessed = 0;
var TotalPlayersToProcess = 0;

function getJSONForEachPlayer()
{
	JSONPlayersProcessed = 0;
	TotalPlayersToProcess = ismData.elInfo.length - 1;
	$('#dialog').dialog('open');
	$.each( ismData.elInfo, function (index, value) {
		if ((index > 0) && (index <= 1001))
		{
		      $.ajax({
			      url: '/web/api/elements/' + (index) + '/',
			      dataType: 'json',
			      success: processJSONForEachPlayer
		      });
		}
	});
}

function processJSONForEachPlayer()
{
	if (arguments[0].web_name)
	{
		var Player = arguments[0];
		var FixtureDifficulty = 0;
		var CurrentGameweek = parseInt(getCurrentGameweek());
		var FixtureToEvaluate
		for (FixtureToEvaluate = 0;FixtureToEvaluate<Player.fixtures.all.length;FixtureToEvaluate++)
		{
			var Gameweek = parseInt((Player.fixtures.all[FixtureToEvaluate][1].match("Gameweek ([0-9]*)"))[1]);
			// console.log("Gameweek " + Gameweek + " CurrentGameweek " + CurrentGameweek);
			if (Gameweek <= CurrentGameweek + parseInt(RRWeeksToLookAhead) && Gameweek > CurrentGameweek)
			{
				var arrMatch = Player.fixtures.all[FixtureToEvaluate][2].match("(.*) \\((.)\\)");
				
				if (arrMatch)
				{
					//console.log("Team to play is " + arrMatch);
					var TeamToPlay = MyTeamAbbreviations[arrMatch[1]][1];
					// The team they are playing will be away if this team is at home, and vice versa
					var LeagueTableToUse = arrMatch[2] == "H" ? StattoStats.ThisYear.True.Away : StattoStats.ThisYear.True.Home;
					console.log("Gameweek " + Gameweek + " CurrentGameweek " + CurrentGameweek + "Table to use is " + LeagueTableToUse + " Team to play is " + TeamToPlay);
					
					FixtureDifficulty += (getFixtureDifficulty(TeamToPlay, LeagueTableToUse, Player) * 100 | 0) / 100;
				}
			}
		}
		/*
		if (localStorage[TeamToPlay + "," + 1])
		{
			FixtureDifficulty = localStorage[TeamToPlay + "," + 1].split(",")[StattoStats.CleanSheet]
		}
		else
		{
			FixtureDifficulty = Player.fixtures.summary[0][1].substr(5,1) == "H" ? 0 : 1;
		}
		*/
		// Already has stored the crack the code value
		FixtureDifficulty = (FixtureDifficulty * 100 | 0) / 100;
		var rrif = (FixtureDifficulty * ismData.elInfo[Player.id][ismData.elStat.RazzaRating] * 100 | 0) / 100;
		localStorage.setItem(Player.id, FixtureDifficulty + "," + rrif);
		ismData.elInfo[Player.id][ismData.elStat.NextGamesDifficulty] = FixtureDifficulty;
		ismData.elInfo[Player.id][ismData.elStat.RazzaRatingFixtures] = rrif;
		
		// TODO: Remove this when the stats are populated
		if (Player.season_history.length > 0)
		{
			ismData.elInfo[Player.id][ismData.elStat.last_season_points] = Player.season_history[Player.season_history.length - 1][15];
		}

// These stats are now populated
//		if (Player.fixture_history.all.length > 0)
//		{
//			ismData.elInfo[Player.id][ismData.elStat.form] = Player.total_points / Player.fixture_history.all.length;
//			ismData.elInfo[Player.id][ismData.elStat.points_per_game] = Player.total_points / Player.fixture_history.all.length;
//		}
//		else
//		{
//			ismData.elInfo[Player.id][ismData.elStat.form] = 0;
//			if (Player.season_history.length > 0)
//			{
//				ismData.elInfo[Player.id][ismData.elStat.points_per_game] = ismData.elInfo[Player.id][ismData.elStat.last_season_points] / (Player.season_history[Player.season_history.length - 1][1] / 90);
//			}
//			else
//			{
//				ismData.elInfo[Player.id][ismData.elStat.points_per_game] = 0
//			}
//		}
		
		var homeTotal = 0;
		var homeGamesPlayed = 0;
		var awayTotal = 0;
		var awayGamesPlayed = 0;
		for (var i=0; i<Player.fixture_history.all.length; i++)
		{
			if (Player.fixture_history.all[i][2].match(/\(H\)/))
			{
				homeTotal += parseInt(Player.fixture_history.all[i][18]);
				if (Player.fixture_history.all[i][3] > 0)
				{
					homeGamesPlayed++;
				}
			}
			else if (Player.fixture_history.all[i][2].match(/\(A\)/))
			{
				awayTotal += parseInt(Player.fixture_history.all[i][18]);
				if (Player.fixture_history.all[i][3] > 0)
				{
					awayGamesPlayed++;
				}							
			}
		}
		var homeAverage = ((((homeTotal * 10) / homeGamesPlayed) | 0) / 10);
		var awayAverage = ((((awayTotal * 10) / awayGamesPlayed) | 0) / 10);
		ismData.elInfo[Player.id][ismData.elStat.HomePPG] = homeAverage;
		ismData.elInfo[Player.id][ismData.elStat.AwayPPG] = awayAverage;
		var diffAverage = (((Math.abs(homeAverage - awayAverage) * 10) | 0) / 10 );
		ismData.elInfo[Player.id][ismData.elStat.DiffPPG] = diffAverage;
	}
	JSONPlayersProcessed++;
	$( "#progressbar" ).progressbar( "option", "max", TotalPlayersToProcess );
	$( "#progressbar" ).progressbar( "option", "value", JSONPlayersProcessed );
	$( "#progress" ).html( JSONPlayersProcessed + '\\' + TotalPlayersToProcess );
	
	if (JSONPlayersProcessed == TotalPlayersToProcess)
	{
		$('#dialog').dialog('close');
	}
}

function getFixtureDifficulty(TeamToPlay, LeagueTableToUse, Player)
{
	var TeamToPlay = arguments[0];
	var LeagueTableToUse = arguments[1];
	var Player = arguments[2];
	
	if (!(localStorage.getItem(TeamToPlay + "," + LeagueTableToUse)))
	{
		TeamToPlay = "BC"; // Dont have stats for previous season - use top relegated team instead
	}
	
	var LeagueTableStats = localStorage.getItem(TeamToPlay + "," + LeagueTableToUse).split(",");
	
	// Higher is better attack
	function AttackMarksOutOf10()
	{
		// Work out opponent average values
		var AverageFailedToScore = LeagueTableStats[StattoStats.FailedToScore] / LeagueTableStats[StattoStats.Played];
		var AverageGoalsFor = LeagueTableStats[StattoStats.For] / LeagueTableStats[StattoStats.Played];
		// Opponent Attack Marks out of 10 (ish)
		var AttackMarksOutOf10 = (6 * (1 - AverageFailedToScore)) + (2 * AverageGoalsFor);
		return AttackMarksOutOf10;
	}
	
	// Higher is better defence
	function DefenceMarksOutOf10()
	{
		// Work out opponent average values
		var AverageCleanSheets = LeagueTableStats[StattoStats.CleanSheet] / LeagueTableStats[StattoStats.Played];
		var AverageGoalsAgainst = LeagueTableStats[StattoStats.Against] / LeagueTableStats[StattoStats.Played];
		// Opponent Attack Marks out of 10 (ish)
		var DefenceMarksOutOf10 = (6 * AverageCleanSheets) + (6 - 2 * AverageGoalsAgainst);
		return DefenceMarksOutOf10;
	}
	
	// Lower score is more difficult
	switch (Player.element_type_id)
	{
	case 1:
		// Goalkeeper
		var FixtureDifficulty = (((10 - AttackMarksOutOf10()) * 1.0 + (10 - DefenceMarksOutOf10()) * 0.0 ) * 0.6) + 2
		return FixtureDifficulty;
	case 2:
	// Defender
		var FixtureDifficulty = (((10 - AttackMarksOutOf10()) * 0.9 + (10 - DefenceMarksOutOf10()) * 0.1 ) * 0.6) + 2
		return FixtureDifficulty;
	case 3:
	// Midfielder
		var FixtureDifficulty = (((10 - AttackMarksOutOf10()) * 0.15 + (10 - DefenceMarksOutOf10()) * 0.85 ) * 0.5) + 2
		return FixtureDifficulty;
	case 4:
	// Attacker
		var FixtureDifficulty = (((10 - AttackMarksOutOf10()) * 0.0 + (10 - DefenceMarksOutOf10()) * 1.0 ) * 0.4) + 2
		return FixtureDifficulty;
	}
}

function AddStattoCallbackFrames()
{
	$('#dialog').dialog('open');
	MyStattoURLIndex = 1;
	AddCallbackFrame("statto" + MyStattoURLIndex,MyStattoURLs[ MyStattoURLIndex ],500); 
}

function AddCTCCallbackFrames()
{
	$('#dialog').dialog('open');
	MyCTCURLIndex = 1;
	AddCallbackFrame("CTC" + MyCTCURLIndex,MyCTCURLs[ MyCTCURLIndex ],5000); 
}

function AddCallbackFrame(id,url,timeout)
{
	/*
	// Doesn't seem to work in FF and GM
	var ifrm = document.createElement("IFRAME"); 
	ifrm.setAttribute("id", id ); 
	ifrm.setAttribute("src", url ); 
	ifrm.style.width = 640+"px"; 
	ifrm.style.height = 480+"px"; 
	ifrm.onload = function(){setTimeout(function () {document.getElementById(id).contentWindow.postMessage('GetContent,' + id,'*');},timeout);};
	document.body.appendChild(ifrm); 
	*/
	
	$(document.body).append('<IFRAME id="' + id + '" width="640px" height="480px">');
	$('iframe#' + id).attr('src', url);
	$('iframe#' + id).load(function() 
	{
		setTimeout(function () {document.getElementById(id).contentWindow.postMessage('GetContent,' + id,'*');},timeout);
	});}

// A devious little function to get a handle on the data used by ISM
function stealISMData()
{
	var origISMeiwImage = ISM.eiwImage;
	ISM.eiwImage = function saveDataReference(data, pageData) {
		ismData = pageData;
		ismPlayerData = data;
		origISMeiwImage(data,pageData);
	}
	$('#ismEiw').dialog( "destroy");
	$($('.ismViewProfile')[0]).click();
	var close = setTimeout( function () { 
		$('#ismEiw').dialog( {autoOpen: false} ) 
		$('#ismEiw').dialog( "option", "position", "centre" );
		$('#ismEiw').dialog( "option", "minHeight", 0 );
		$('#ismEiw').dialog( "option", "height", 600 );
		$('#ismEiw').dialog( "option", "width", 750 );
	}, 1300);
}

// Adds additional calculated player info to player info window
function enhancePlayerInformationWindow()
{
	if (arguments.length == 0)
	{
		// Called on page startup only - add extra event handler
		$('body').delegate('.ismViewProfile','click',function(event) {
			event.preventDefault();
			var regexp = /#(\d+)/;
			var matches = regexp.exec(this.href);
			$.ajax({
				url: '/web/api/elements/' + matches[1] + '/',
				dataType: 'json',
				success: enhancePlayerInformationWindow
			});
		});
		
		//Alter dimensions and remove tabs
		$('#ismEiw .ismTabs').tabs('destroy'); 
		$('#ismEiw').dialog( "option", "height", 600 );
		$('#ismEiw').dialog( "option", "resizable", true );
		$('#ismEIWHistory').before("<DIV id='ism_player_home'></DIV>");
	}
	else if (arguments[0].web_name)
	{
		// Successful ajax call so work out home and away points and add in a new table
		// TODO: Tidy this code up so more JQuery like
		var Player = arguments[0];
		var home = '<h1>Home Fixtures</h1><table class="ismTable">' + $('#ismEiwMatchesPast thead').html();
		var homeTotal = new Array();
		var homeOddRow = true;
		var homeGamesPlayed = 0;
		var away = '<h1>Away Fixtures</h1><table class="ismTable"><thead>' + $('#ismEiwMatchesPast thead').html();
		var awayTotal = new Array();
		var awayOddRow = true;
		var awayGamesPlayed = 0;
		for (var i=0; i<Player.fixture_history.all.length; i++)
		{
			if (Player.fixture_history.all[i][2].match(/\(H\)/))
			{
				home += (homeOddRow ? '<tr class="ism_row_1 ism_row_0">' : "<tr>");
				for (var j=0; j<19; j++)
				{
					home += "<td>" + Player.fixture_history.all[i][j] + "</td>";
				}
				home += "</tr>";
				homeOddRow = !homeOddRow;
				if (homeTotal[18] == null)
				{
					homeTotal[18] = 0;
				}
				homeTotal[18] += parseInt(Player.fixture_history.all[i][18]);
				if (Player.fixture_history.all[i][3] > 0)
				{
					homeGamesPlayed++;
				}
			}
			else if (Player.fixture_history.all[i][2].match(/\(A\)/))
			{
				away += (awayOddRow ? '<tr class="ism_row_1 ism_row_0">' : "<tr>");
				for (var j=0; j<19; j++)
				{
					away += "<td>" + Player.fixture_history.all[i][j] + "</td>";
				}
				away += "</tr>";
				awayOddRow = !awayOddRow;
				if (awayTotal[18] == null)
				{
					awayTotal[18] = 0;
				}
				awayTotal[18] += parseInt(Player.fixture_history.all[i][18]);
				if (Player.fixture_history.all[i][3] > 0)
				{
					awayGamesPlayed++;
				}							
			}
		}
		home += "</table><h1>Points per home game PLAYED " + ((((homeTotal[18] * 10) / homeGamesPlayed) | 0) / 10) + "</h1><br/>";
		away += "</table><h1>Points per away game PLAYED " + ((((awayTotal[18] * 10) / awayGamesPlayed) | 0) / 10) + "</h1><br/>";
		document.getElementById("ism_player_home").innerHTML = home + away;
	}
}

function showFixturesWhenScoreClicked()
{
	// TODO: Show previous games
	if (arguments[0]  && arguments[0].web_name)
	{
		var player = arguments[0];
		var contents = "";
		$.each( player.fixture_history.summary, function (index, value) {
			if ($("#fixturehistory-" + player.id + "-" + index).length > 0)
			{
				$("#fixturehistory-" + player.id + "-" + index).remove();
			}
			else
			{
				contents = contents + "<tr id='fixturehistory-" + player.id + "-" + index + "'><td>" + value[0] + "</td><td>" + value[1] + "</td><td colspan='3'>" + value[2] + "</td></tr>";
			}
		});
		$.each( player.fixtures.summary, function (index, value) {
			if ($("#fixtures-" + player.id + "-" + index).length > 0)
			{
				$("#fixtures-" + player.id + "-" + index).remove();
			}
			else
			{
				contents = contents + "<tr id='fixtures-" + player.id + "-" + index + "'><td>" + value[0] + "</td><td>" + value[1] + "</td><td colspan='3'>" + value[2] + "</td></tr>";
			}
		});
		$('#ismElementDataTable .ismInfo[href="#' + player.id + '"]').parent().parent().after(contents);
	}
	else
	{
		// Wrap the score in an anchor tag and give it a class
		$('#ismElementDataTable tr').each(function(index, element) {
			if ($(this).children('td')[4])
			{
				var playerId = $(this).find('.ismViewProfile').attr('href').substr(1);
				var playerInfo = ismData.elInfo[playerId];
				var statId = ismData.elStat;
				var playerScore = "";
				if (showExtraColumnInFilter)
				{
					if (!extraColumnToShowInFilter) {extraColumnToShowInFilter = statId.total_points}
					playerScore = "&nbsp;" + playerInfo[extraColumnToShowInFilter];
				}
				$($(this).children('td')[4]).html(function(index, oldHTML) {
					return "<a class='showFixtures'>" + oldHTML + "</a>" + playerScore;
				})
			}
		})
		
		$('body').undelegate('.showFixtures');
		
		// Create a delegate for whenever an item of that type is clicked
		$('body').delegate('.showFixtures','click.showFixtures', function(event) {
			event.preventDefault();
			var regexp = /#(\d+)/;
			var matches = regexp.exec($(this).parent().parent().find('.ismInfo').attr('href'));
			$.ajax({
				url: '/web/api/elements/' + matches[1] + '/',
				dataType: 'json',
				success: showFixturesWhenScoreClicked
			});
		});
		
		$('body').delegate('#ismElementFilter, #ismStatSort, #ismMaxCost','change.showFixtures',function() { var t=setTimeout(showFixturesWhenScoreClicked,500)}); // showFixturesWhenScoreClicked);
	}
}

// Loop through each player and add the extra info for each of them
function addExtraPlayerInfoOnGraphicalLayout()
{
	// resize the shirt images
	$('.ismShirtContainer img').css({width: '24px', height: '32px'})
	
	// resize the pitch, and make space for extra info if available
	if (JSON.parse($('#ismJson script').html()).picks)
	{
		$('.ismPitchRow1').css('height','146px');
		$('.ismPitchRow2').css('height','146px');
		$('.ismPitchRow3').css('height','146px');
		$('.ismPitchRow4').css('height','146px');
		$('.ismPitchRow5').css('height','146px');
		$('#ism .ismPitch').css('height','600px');
		$('#ism .ismPitch').css('background-size','cover');
		$('#ism .ismPlayerContainer').css('height','146px');
		$('.ismLastUnit').css('overflow','visible');
	}

	// Hook an event for when players get added to the squad to show their details
        $('#ismElementDataTable').delegate('.ismAddElement','click',
        function(event) {
            var regexp = /#(\d+)/;
            var matches = regexp.exec(this.href);
            addExtraPlayerInfoByPlayerId(matches[1]);
            event.preventDefault();
        });
	
	// Hook an event for when players get removed from the squad to show their details
        $('body').delegate('.ismRemove','click',
        function(event) {
            var regexp = /#(\d+)/;
            var matches = regexp.exec(this.href);
	    var playerId = JSON.parse($('#ismJson script').html()).picks[matches[1]].elid;
            addExtraPlayerInfoByPlayerId(playerId);
            event.preventDefault();
        });
	
	// Loop through each player and get their ID, request their AJAX details, and then send the results to the addExtraPlayerInfoByPlayerId function
	$('[id^="ismGraphical"] .ismInfo').each(function requestExtraPlayerInfo(id, domElement) {
		var playerId = $(domElement).attr("href").match('#(\\d+)')[1];
		addExtraPlayerInfoByPlayerId(playerId, domElement);
	});
}

// playerId should be their unique id (1-~500) domElement should be the domElement that is similar to <a href="#184" class="ismViewProfile ismInfo">...</a> 
function addExtraPlayerInfoByPlayerId (playerId, domElement)
{
	$.ajax({
		url: '/web/api/elements/' + playerId + '/',
		dataType: 'json',
		success: addExtraPlayerInfo,
		context: domElement
	});
}
// Add the extra data to the correct 
function addExtraPlayerInfo(data)
{	
	var newPlayerInfo = "";
	
	// Try getting transfer information
	if (JSON.parse($('#ismJson script').html()).picks)
	{
		// if a new player is added to squad need to resize their shirt
		$('.ismShirtContainer img').css({width: '24px', height: '32px'})
		$('#ism .ismPlayerContainer').css('height','146px');
		
		// myPlayerId will be 1-15 and their squad number
		var myPlayerId = $('[id^="ismGraphical"] .ismInfo[href="#' + data.id + '"]').parent().parent().parent().attr('id').match('ismGraphical(\\d+)')[1];
		var playerPrices = JSON.parse($('#ismJson script').html()).picks[myPlayerId]; // pageData
		if (playerPrices.elid == data.id)
		{
			newPlayerInfo = "Paid: " + (playerPrices.paid/10) + "<br/>Sells: " + (playerPrices.sell/10) + "<br/>";
		}
		newPlayerInfo = newPlayerInfo + "Costs: " + (data.now_cost/10) + "<br/><a href='http://www.fiso.co.uk/crackthecode.php' style='font-size: 85%'>Crack the code</a>: " + getCrackTheCode(data.id) + "<br/>";
		newPlayerInfo = newPlayerInfo + "Form: " + data.form + "<br/>PPG: " + data.points_per_game + "<br/>Opponent: " + data.fixtures.summary[0][1];
		$('[id^="ismGraphical"] .ismInfo[href="#' + data.id + '"]').parent().parent().find('.ismPitchStat').html(newPlayerInfo);
	}
	else if(document.URL.match("event-history"))
	{
		newPlayerInfo = newPlayerInfo + "Form: " + data.form + "<br/>PPG: " + data.points_per_game + "<br/>Opponent: " + data.fixtures.summary[0][1];
		$('[id^="ismGraphical"] .ismInfo[href="#' + data.id + '"]').parent().parent().find('.ismPitchStat').prepend("Points")
		$('[id^="ismGraphical"] .ismInfo[href="#' + data.id + '"]').parent().parent().find('.ismPitchStat').append("<br/>" + newPlayerInfo);  

	}
	else
	{
		newPlayerInfo = newPlayerInfo + "Form: " + data.form + "<br/>PPG: " + data.points_per_game + "<br/>Opponent: " + data.fixtures.summary[0][1];
		$('[id^="ismGraphical"] .ismInfo[href="#' + data.id + '"]').parent().parent().find('.ismPitchStat').html(newPlayerInfo);
	}
	// For all pages
	$('[id^="ismGraphical"] .ismInfo[href="#' + data.id + '"]').parent().parent().find('.ismPitchStat').css("font-size", "75%");
	$('.ismElementDetail dd').css('height','200px');
}

function addSortableStats()
{
	addEachStat("Last Seasons Points [Adjusted]"		,"LSPAdjusted"			,100	,getAdjustedLastSeasonsPoints		, false);
	addEachStat("Net Transfers In"				,"NTIs"				,101	,getNTIs				, true);
	addEachStat("Net Transfers Out"				,"NTOs"				,102	,getNTOs				, true);
	addEachStat("Last Seasons Points"			,"LastSeasonsPoints"		,108	,getLastSeasonsPoints			, true);
	addEachStat("Last Seasons Points (Value)"		,"LastSeasonsPointsVal"		,109	,getLastSeasonsPointsValue		, true);
	addEachStat("Megaton's Rating"				,"MegatonRating"		,103	,getMegatonRating			, true);
	addEachStat("Razza Rating (RR)"				,"RazzaRating"			,104	,getRazzaRating				, true);
	addEachStat("RR (Value)"				,"RazzaRatingVal"		,106	,getRazzaRatingValue			, true);
	addEachStat("RR - Ignoring Injuries"			,"RazzaRatingIgnoreInjuries"	,105	,getRazzaRatingIgnoreInjuries		, true);
	addEachStat("RR - Ignoring Injuries (Value)"		,"RazzaRatingIgnoreInjuriesVal"	,107	,getRazzaRatingIgnoreInjuriesValue	, true);
	addEachStat("Next game's difficulty"			,"NextGamesDifficulty"		,110	,getNextGamesDifficulty			, true);
	addEachStat("RR Include Fixture Info"			,"RazzaRatingFixtures"		,111	,getRazzaRatingFixtures			, true);
	addEachStat("Crack The Code Percentage"			,"CrackTheCode"			,112	,getCrackTheCode			, true);
	addEachStat("Home Points Per Game"			,"HomePPG"			,113	,function (){}				, true);
	addEachStat("Away Points Per Game"			,"AwayPPG"			,114	,function (){}				, true);
	addEachStat("Diff between Home and Away PPG"		,"DiffPPG"			,115	,function (){}				, true);
	
	getJSONForEachPlayer();
}

function addEachStat(Name,ShortName,id,CalculatingFunction, Show)
{
	if (Show)
	{
		$('#ismStatSort').append('<option value="' + ShortName + '">' + Name + '</option>');
	}
	eval("ismData.elStat." + ShortName + " = " + id);
	$.each(ismData.elInfo, function (index, value) {if (value != null) {value[id] = CalculatingFunction(value[ismData.elStat.id])}});  
}

function getCrackTheCode(playerId)
{
	if (localStorage.getItem(playerId + ",CTC"))
	{
		return localStorage.getItem(playerId + ",CTC");
	}
	else
	{
		return 0;
	}
}

function getNextGamesDifficulty(playerId)
{
	if (localStorage.getItem(playerId))
	{
		return (localStorage.getItem(playerId).split(",")[0] * 100 | 0) / 100;
	}
	else
	{
		return 0;
	}
}

function getRazzaRatingFixtures(playerId)
{
	if (localStorage.getItem(playerId))
	{
		return (localStorage.getItem(playerId).split(",")[1] * 100 | 0) / 100;
	}
	else
	{
		return 0;
	}
}

function getLastSeasonsPoints(playerId)
{
	var playerInfo = ismData.elInfo[playerId];
	var statId = ismData.elStat;
	var LastSeasonsPoints = playerInfo[statId.last_season_points];
	if (getCurrentGameweek() == 0)
	{
		// Probably before season started
		LastSeasonsPoints = playerInfo[statId.total_points]
	}
	return LastSeasonsPoints;
}

function getLastSeasonsPointsValue(playerId)
{
	var playerInfo = ismData.elInfo[playerId];
	var statId = ismData.elStat;
	var LastSeasonsPointsValue = playerInfo[statId.LastSeasonsPoints] / playerInfo[statId.now_cost]
	return (LastSeasonsPointsValue * 100 | 0) / 100;
}

function getAdjustedLastSeasonsPoints(playerId)
{
	var playerInfo = ismData.elInfo[playerId];
	var statId = ismData.elStat;
	var AdjustedLastSeasonsPoints = playerInfo[statId.LSPAdjusted];
	if (AdjustedLastSeasonsPoints == null)
	{
		var LastSeasonsPoints = playerInfo[statId.last_season_points];
		if (getCurrentGameweek() == 0)
		{
			// Probably before season started
			LastSeasonsPoints = playerInfo[statId.total_points]
		}
		if (LastSeasonsPoints == 0)
		{
			LastSeasonsPoints = (playerInfo[statId.points_per_game] * 25) | 0;
		}
		if (LastSeasonsPoints < 100)
		{
			LastSeasonsPoints = (LastSeasonsPoints / 2 + playerInfo[statId.points_per_game] * 19) | 0;
		}
		return LastSeasonsPoints;
	}
	return AdjustedLastSeasonsPoints
}

function getRazzaRating(playerId)
{
	var playerInfo = ismData.elInfo[playerId];
	var statId = ismData.elStat;
	var CurrentGameweek = getCurrentGameweek(38);
	var AdjustedLastSeasonsPoints = getAdjustedLastSeasonsPoints(playerId);
	var RazzaRating = (AdjustedLastSeasonsPoints + ((playerInfo[statId.total_points] * 38) / CurrentGameweek) + (playerInfo[statId.form] * 19)) | 0;
	return (RazzaRating * 10 | 0) / 10;
}

function getRazzaRatingIgnoreInjuries(playerId)
{
	var playerInfo = ismData.elInfo[playerId];
	var statId = ismData.elStat;
	var AdjustedLastSeasonsPoints = getAdjustedLastSeasonsPoints(playerId);
	var RazzaRating = (AdjustedLastSeasonsPoints + ((playerInfo[statId.points_per_game] * 38)) + (playerInfo[statId.form] * 19)) | 0;
	return (RazzaRating * 10 | 0) / 10;
}

function getRazzaRatingValue(playerId)
{
	var playerInfo = ismData.elInfo[playerId];
	var statId = ismData.elStat;
	var RazzaRating = playerInfo[statId.RazzaRating] / playerInfo[statId.now_cost]
	return (RazzaRating * 100 | 0) / 100;
}

function getRazzaRatingIgnoreInjuriesValue(playerId)
{
	var playerInfo = ismData.elInfo[playerId];
	var statId = ismData.elStat;
	var RazzaRating = playerInfo[statId.RazzaRatingIgnoreInjuries] / playerInfo[statId.now_cost]
	return (RazzaRating * 100 | 0) / 100;
}

function getMegatonRating(playerId)
{
	var playerInfo = ismData.elInfo[playerId];
	var statId = ismData.elStat;
	var CurrentGameweek = getCurrentGameweek(38);
	var MegatonRating = (((38 / CurrentGameweek) * (playerInfo[statId.total_points]	/ playerInfo[statId.now_cost]) * (playerInfo[statId.total_points] / playerInfo[statId.minutes]))  * 100 | 0) / 100;
	return MegatonRating;
}

function getNTIs(playerId)
{
	// ToDo: Get the current game week
	var NTIs = ismData.elInfo[playerId][ismData.elStat.transfers_balance];
	return NTIs;
}

function getNTOs(playerId)
{
	// ToDo: Get the current game week
	var NTOs = 0 - ismData.elInfo[playerId][ismData.elStat.transfers_balance];
	return NTOs;
}

// Returns the current gameweek, or the argument passed in if gameweek is 0
function getCurrentGameweek()
{
	var CurrentGameweek = ismPlayerData.fixture_history.all.length;
	if (CurrentGameweek == 0 && arguments.length > 0)
	{
		return arguments[0];
	}
	else
	{
		return CurrentGameweek
	}
}

function addMyTeam()
{
	// Add an identical drop down that when changed will change the original, but
	// when a new item is chosen will do some 'magic' first
	$('#ismElementFilter').css('display', 'none');
	$('#ismElementFilter').parent().append('<select class="ismIndentLeftRazza" name="selection_filters_form-view_razza" id="ismElementFilterRazza">' + $('#ismElementFilter').html() + '</select>');
	var elSel = $('#ismElementFilterRazza')[0];
	
	var elOptNew = document.createElement('option');
	elOptNew.text = 'My Team';
	elOptNew.value = 'watchlist';
	elOptNew.calss = 'ismOptionMisc'
	var elOptOld = elSel.options[1];  
	try {
	  elSel.add(elOptNew, elOptOld); // standards compliant; doesn't work in IE
	}
	catch(ex) {
	  elSel.add(elOptNew, elSel.selectedIndex); // IE only
	}
	// $($('#ismElementFilterRazza option')[0]).after('<option value=​watchlist class=​ismOptionMisc>​My Team</option>​');
	$('#ismElementFilterRazza').change(function () {
		// If they selected a newly added item we need to do something first
		if ($('#ismElementFilterRazza option:selected').text() == "My Team")
		{
			ismData.watchlistBackup = ismData.watchlist;
			ismData.watchlist = new Array();
			$(ismData.picks).each(function (index, value) {
				if (value != null)
				{
					ismData.watchlist[index - 1] = value.elid
				}
			});
			$('#ismEiw').data().wl = ismData.watchlist;
		}
		// Update the original drop down
		$('#ismElementFilter').val($('#ismElementFilterRazza').val());
		// Then fire the change event
		$('#ismElementFilter').change();
		if ($('#ismElementFilterRazza option:selected').text() == "My Team")
		{
			ismData.watchlist = ismData.watchlistBackup;
			$('#ismEiw').data().wl = ismData.watchlist;
		}
	});
}

/*
// Chrome doesn't ask to save credentials so we can save it instead
function addSaveCredentialsDiv()
{
	$('.ismSubmit').before('<button id=\'SaveCredentials\'>Save Current Credentials</button>')
	$('#SaveCredentials').button();
	$('#SaveCredentials').click( saveCredentials );
}

// Save the credentials in localStorage
function saveCredentials()
{
	var myUserId = $('#ismEmail').val();
	var myPassword = $('#id_password').val();
	localStorage['UserID'] = myUserId;
	localStorage['Password'] = myPassword;
}

// Load and display credentials from localStorage
function loadCredentials()
{
	$('#ismEmail').val(localStorage['UserID']);
	$('#id_password').val(localStorage['Password']);
}
*/


function receiveStattoMessage(event)  
{  
	// alert(event.data + event.origin + event.source);
	if (event.data.indexOf("GetContent") == 0)
	{
		var frameName = event.data.substring(event.data.indexOf(',') + 1);
		event.source.postMessage(frameName + "," + document.URL + "," + document.body.innerHTML,"*");
	}
}

function receivecrackthecodeMessage(event)  
{
	// alert(event.data + event.origin + event.source);
	if (event.data.indexOf("GetContent") == 0)
	{
		// var frameName = event.data.substring(event.data.indexOf(',') + 1);
		// event.source.postMessage(frameName + "," + document.URL + "," + document.body.innerHTML,"*");
		$.ajax({
			url: 'http://crackthecode.fiso.co.uk/CTC.XML',
			dataType: 'text',
			success: function (data) {
				var frameName = event.data.substring(event.data.indexOf(',') + 1);
				event.source.postMessage(frameName + "," + document.URL + "," + data,"*");
			}
		});
	}
}

function ShowCurrentScoresAndPlayerPlayed()
{
	$('tr a[href*="event-history"]').each(function (index,domElement){
		$.ajax({
			url: domElement.href,
			dataType: 'text',
			success: function (data) {
				var returnedHTML = data;
				var returnedHTMLobj = $(returnedHTML);
				var returnedPoints = returnedHTMLobj.find('.ismSBPrimary').text().trim();
				var transfers = returnedHTMLobj.find('.ismSBDefList dd').next().next().text().trim().replace(/\s+/,'');
				var totalPoints = returnedHTMLobj.find('.ismRHSDefList').children()[1].innerHTML;
				var playersPlayed = 0;
				returnedHTMLobj.find('#ismDataElements').children().each(function (index,elem) {if (index < 11 ) {$(elem).children()[2].innerHTML.trim() > 0 ? playersPlayed++ : 0}});
				
				domElement.innerHTML += " - " + playersPlayed + "/11 - Transfers - " + transfers;
				$(domElement).parent().next().next().html(returnedPoints + " (" + $(domElement).parent().next().next().html() + ")");
				$(domElement).parent().next().next().next().html(totalPoints + " (" + $(domElement).parent().next().next().next().html() + ")");
			}
		});
	});
}


/* Everything below here is to make things work in both Chrome and Firefox */

function InsertJSIntoPage()
{
	// Running in chrome
	// Insert this script in to the actual page so it can be evaluated in that isolated world
	var script = document.createElement('script'); 
	script.type = 'text/javascript'; 
	script.src =  chrome.extension.getURL('script.js'); // "http://localhost/34049.user.js?" + Math.random(); // 'http://userscripts.org/scripts/source/34047.user.js' - Use this to always use latest version
	document.body.appendChild(script); 
}

if (!(typeof chrome === 'undefined') && !(typeof unsafeWindow === 'undefined'))
{
	// In chrome, but not inside the document's isolated world so can't access JS variables
	// alert("Not inside document's isolated world - loading it now");
	InsertJSIntoPage();
}
else
{
	// Either in FF, or chrome (and inside the document's isolated world)
	// either way JS variables are accessible.
	// alert("Inside document's isolated world - loaded!");
	try {
		if (typeof unsafeWindow === 'undefined')
		{	
			// We shold only get here in chrome as the JS variables are only available from unsafeWindow in FF
			// alert("Chrome!");
			// So we don't have to change the rest of the script just create a new unsafeWindow variable for chrome
			// If it's not done in an eval it goes wrong in FF for some reason
			eval("var unsafeWindow = window;");
		}
		else
		{
			// For firefox make sure the $ is accesible
			$ = unsafeWindow.$;
			ISM = unsafeWindow.ISM;
		}
	}
	catch(err)
	{
		alert(err);
	}
	
	if (document.location.hostname == "www.statto.com")
	{
		window.addEventListener("message", receiveStattoMessage, false);  
	}
	else if (document.location.hostname == "crackthecode.fiso.co.uk")
	{
		window.addEventListener("message", receivecrackthecodeMessage, false);
	}
	else
	{
		$(document).ready(function() {var t=setTimeout(CorrectPage,500);});
	}
	
}