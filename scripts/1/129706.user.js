// ==UserScript==
// @name           SC2Ranks Custom Divisions
// @namespace      zergling.co.il
// @version        1.2.7
// @description    Modification to aznpluckys Starcraft 2 Enhanced Battle.net Profiles script.
// @include        http://*.battle.net/*
// @include   	   http://userscripts.org/*
// @include   	   http://sc2ranks.com/*
// @match          http://*.battle.net/*
// @match   	   http://userscripts.org/*
// @match   	   http://sc2ranks.com/*
// ==/UserScript==



// Note that Blizzard has their own String.trim() prototype function, which we use in our injected code.  
// If Blizzard ever removes that, we'll have to recode the stuff that depends on it.
String.prototype.trim=function(){a=this.replace(/^\s+/,'');return a.replace(/\s+$/,'');}
	
/**
 * Add javascript to page so it can respond to browser interactions
 * http://wiki.greasespot.net/Content_Script_Injection
 */
function contentEval(source) {
	// Check for function input.
	if ('function' == typeof source) {
		// Execute this function with no arguments, by adding parentheses.
		// One set around the function, required for valid syntax, and a second empty set calls the surrounded function.
		source = '(' + source + ')();'
	}

	// Create a script node holding this  source code.
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;

	// Insert the script node into the page, so it will run, and immediately remove it to clean up.
	document.body.appendChild(script);
	document.body.removeChild(script);
}

/**
 * Global objects.  These need to be declared before the other contentEval() calls.
 * Very loose MVC structure:
 * ----------------------------------------------------------------------------------
 * Models: 
 *   MD       Match Data (for current profile only)
 *   FD       Friends Data (includes match histories and leagues/divisions)
 *
 * Controllers / Views: 
 *   MHS      Match History Stats
 *   FMH      Friends Match History
 *   FMHS     Friends Match History Stats
 *   FR       Friends Ranks
 *
 * Helpers / Libraries:
 *   BP       Bonus pool data and methods
 *   FDTM     Friends Data Thread Manager
 *   Common   Shared methods and properties
 *   Lex      Language library (try to keep most l10n work here)
 * ----------------------------------------------------------------------------------
 **/
 
evalGlobals = '\
	var MD = new Object();\
	var MHS = new Object();\
	var FD = new Object();\
	var FDTM = new Object();\
	var FMH = new Object();\
	var FMHS = new Object();\
	var FR = new Object();\
	var FRA = new Object();\
	var FP = new Object();\
	var BP = new Object();\
	var Common = new Object();\
	var Lex = new Object();\
	var whichBrowser = new Object();\
	var myRegion = new Object();\
	var matchesCounter = new Object();\
	var profiles = new Object();\
	var divisions = new Object();\
	var progress = new Object();\
	var showOwnDivision = new Object();\
	var ownDivisionJSON = new Object();\
	var bonusPools = {\
	eu:0,\
	cn:0,\
	kr:0,\
	sea:0,\
	us:0};\
	var regionName = new Object();\
	var totalBonusPool = new Object();\
	var SVC = new Object();\
	var myLeague = new Object();\
	var currentCustomDivisionName = new Object();\
	var currentCustomDivisionURLAPI = new Object();\
	var currentCustomDivisionURL = new Object();\
	var customDivisionArr = new Object();\
	var hasNewData = new Object();\
	var leaguesArr = new Object();\
	var leagueNamesArr = new Object();\
	var checkBoxState = new Object();\
';
contentEval(evalGlobals);
		
/**
 * Check if there is a newer version of the script. 
 * This is important since the script depends heavily on the page's html structure, 
 * and if Blizzard changes this, the script will likely break and need to be updated.
 */

var SVC = {
	currentVersion: '1.2.7',
	latestVersion: '',
	scriptName: "SC2Ranks Custom Divisions",
	scriptNum: '129706',
	sc2ranksReponse: '',
	bonus: '',
		
	// Returns positive if a > b, negative if a < b, and 0 if a == b
	compare: function(a, b) {
		var aa = a.split('.');
		var bb = b.split('.');
		for (var i = 0; i < Math.min(aa.length, bb.length); i++) {
			if      (aa[i] > bb[i]) return 1;
			else if (aa[i] < bb[i]) return -1;
		}
		return aa.length - bb.length;
	},
	
	getInfo: function() {
	var versionURL = 'http://userscripts.org/scripts/source/' + SVC.scriptNum + '.meta.js';
	//var playersURL = 'http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost';
	var bonusPoolURL = 'http://sc2ranks.com/api/bonus/pool?appKey=localhost';
	//alert('sending request to ' + localStorage['customDivisionURL']);
	SVC.sc2ranksReponse = [];
	if (SVC.whichBrowser() == 'Firefox') //firefox version
	{
		GM_xmlhttpRequest({
		method: "GET",
		url: versionURL,
		onload: function(response) {
			var regex = /@version\s*(.+)/i;
			SVC.latestVersion = regex.test(response.responseText) ? regex.exec(response.responseText)[1] : '';
			SVC.showInfo();	
		}});
		for (var i = 0; i < customDivisionArr.length; i++)
			GM_xmlhttpRequest({
				method: "GET",
				url: customDivisionArr[i].urlapi,
				i:i,
				onload: function(response2) {
					SVC.sc2ranksReponse[this.i] = response2.responseText;
					SVC.getJSON(this.i);
			}});
		GM_xmlhttpRequest({ //uncommented
			method: "GET",
			url: bonusPoolURL,
			onload: function(response3) {
				var sub = response3.responseText.substring(48, response3.responseText.length-9);
				SVC.bonus = sub;
				SVC.getBonus();
		}});
	}
	else //non firefox version
	{	
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if ((xhr.readyState == 4) && (xhr.status == 200)) 
			{
				var regex = /@version\s*(.+)/i;
				SVC.latestVersion = regex.test(xhr.responseText) ? regex.exec(xhr.responseText)[1] : '';
				SVC.showInfo();	
			}
		}
		xhr.open('GET', versionURL, true);
		xhr.send();
		
		var xhr2 = [];
		for (var i = 0; i < customDivisionArr.length; i++)
		{
			xhr2[i] = new XMLHttpRequest();
			xhr2[i].i = i;
			xhr2[i].onreadystatechange = function() {
			if (this.readyState == 4)
			{
				if (this.status == 200) {
				SVC.sc2ranksReponse[this.i] = this.responseText;
				SVC.getJSON(this.i);
				}
			}}
			xhr2[i].open('GET', customDivisionArr[i].urlapi, true);//true - separate thread. false - single thread
			xhr2[i].send();
		}
		
		var xhr3 = new XMLHttpRequest(); //uncommented
		xhr3.onreadystatechange = function() {
			if ((xhr3.readyState == 4) && (xhr3.status == 200)) 
			{
				SVC.bonus = xhr3.responseText;
				SVC.getBonus();
			}
		}
		xhr3.open('GET', bonusPoolURL, true);
		xhr3.send();
	}		
			
		return;
	},
	
	showInfo: function() {
		var el = document.getElementById('EBP-status');
		if (el == null) {
			el = document.createElement('div');
			el.setAttribute('id', 'EBP-status');
			el.setAttribute('style', 'padding:0 0 0 6px; color:#0065bd; font-size:0.9em;');
			p = document.getElementById('profile-left');
			p.appendChild(el);
		}
		var txt = SVC.scriptName + ' <span style="color:#6EA6CA">v' + SVC.currentVersion + '</span>';
		if (SVC.latestVersion) {
			if (SVC.compare(SVC.latestVersion, SVC.currentVersion) > 0) {
				txt += '<br/>Newer <span style="color:#C1FFFF">v' + SVC.latestVersion + '</span> available. ';
				txt += '<a href="http://userscripts.org/scripts/show/' + SVC.scriptNum + '">Update Now</a>';
			}
			else {
				txt += '<br/>Version up to date.';
			}
		}
		txt += '<br/><br/>Made by NotThat.<br/><br/>Based on Enhanced Battle.net Profiles<br/>by Aznplucky.';

		el.innerHTML = txt;
	},
	
	getJSON: function(i) {
		var	el2 = document.createElement('div');
		el2.setAttribute('id', 'custom-div-json' + i);
		el2.setAttribute('value', SVC.sc2ranksReponse[i]);
		p = document.getElementById('profile-left');
		p.appendChild(el2);
	},
	
	getBonus: function() {
		var	el3 = document.createElement('div');
		el3.setAttribute('id', 'bonus-pools');
		el3.setAttribute('value', SVC.bonus);
		p = document.getElementById('profile-left');
		p.appendChild(el3);
	},
	
	whichBrowser: function () {
	var agt=navigator.userAgent.toLowerCase();
	if (agt.indexOf("opera") != -1) return 'Opera';
	if (agt.indexOf("staroffice") != -1) return 'Star Office';
	if (agt.indexOf("webtv") != -1) return 'WebTV';
	if (agt.indexOf("beonex") != -1) return 'Beonex';
	if (agt.indexOf("chimera") != -1) return 'Chimera';
	if (agt.indexOf("netpositive") != -1) return 'NetPositive';
	if (agt.indexOf("phoenix") != -1) return 'Phoenix';
	if (agt.indexOf("firefox") != -1) return 'Firefox';
	if (agt.indexOf("safari") != -1) return 'Safari';
	if (agt.indexOf("skipstone") != -1) return 'SkipStone';
	if (agt.indexOf("msie") != -1) return 'Internet Explorer';
	if (agt.indexOf("netscape") != -1) return 'Netscape';
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
	if (agt.indexOf('\/') != -1) {
	if (agt.substr(0,agt.indexOf('\/')) != 'mozilla') {
	return navigator.userAgent.substr(0,agt.indexOf('\/'));}
	else return 'Netscape';} else if (agt.indexOf(' ') != -1)
	return navigator.userAgent.substr(0,agt.indexOf(' '));
	else return navigator.userAgent;
	},

	
};

// Browser Detection Javascript
// copyright 1 February 2003, by Stephen Chapman, Felgall Pty Ltd
// You have permission to copy and use this javascript provided that
// the content of the script is not changed in any way.

/**
 * Lexicon of strings displayed to user. (also see sandboxed Lex below)
 * Want to volunteer to translate into another language? Leave a comment @ http://userscripts.org/scripts/discuss/103651
 */
contentEval(function() {
	// Get locale: <a href="/sc2/en/">Battle.net</a>
	var a = document.getElementById('logo').getElementsByTagName('a')[0].getAttribute('href');
	Lex.locale = (a.split('/').length == 4) ? a.split('/')[2] : 'en';

	switch (Lex.locale) {
		case 'en':
		case 'de':  // Anyone want to help translate deutsche?
		case 'es':  // Anyone want to help translate espanol?
		case 'it':  // Anyone want to help translate italiano?
		case 'ru':  // Anyone want to help translate russian?
		case 'ko':  // Anyone want to help translate korean?
		case 'zh':  // Anyone want to help translate chinese?
		default:
			// Outcome for friends' match history table
			Lex.resultWin = 'Win';
			Lex.resultLoss = 'Loss';
			Lex.resultLeft = 'Left';
			Lex.resultObs = 'Observer';
		
			// Filtering and Sorting links
			Lex.filterPlayerAll = 'Show All Friends';
			Lex.filterPlayerSome = 'Show Only Real ID';
			Lex.filterTypeAll = 'Show All Types';
			Lex.filterTypeSome = 'Show Only Ladder';
		
			Lex.filterType0 = 'All';
			Lex.filterType1 = '1v1';
			Lex.filterType2 = '2v2';
			Lex.filterType3 = '3v3';
			Lex.filterType4 = '4v4';
			Lex.filterType5 = 'Custom';
			
			Lex.sortByPlayer = 'Sort Friend';
			Lex.sortByTeam = 'Sort Team';
			Lex.sortByType = 'Sort Type';
			Lex.sortByWins = 'Sort Wins';
			Lex.sortByPoints = 'Sort Points';
			Lex.sortByAPoints = 'Sort Adj';
			Lex.sortByRatio = 'Sort Ratio';
			Lex.sortByDate = 'Sort Date';
			Lex.sortByRank = 'Sort Rank';
			Lex.sortByBonus = 'Sort Bonus';
			
			// Progress status
			Lex.statusGetMatches = "Getting match history...";
			Lex.statusGetFriends = "Getting friends' match histories...";
			Lex.statusGetProfiles = "Getting players profile info...";
			Lex.statusGetDivisions = "Getting players divisions...";
			Lex.statusCreateTable = "Generating table...";
		
			// Button labels (used for setting active class to li elements) !!! Make sure you also update the sandboxed Lex !!!
			Lex.buttonMHS = 'Match History Stats';
			Lex.buttonFMH = 'Friends Match History';
			Lex.buttonFMHS = 'Friends Match Stats';
			Lex.buttonFR = 'Friends Ranks';
			Lex.buttonFP = 'Friends Popular';
			
			// Table titles
			Lex.tableMHS1 = 'Match History Stats';
			Lex.tableMHS2 = 'Match History Stats by Map';
			Lex.tableFMH = 'Friends Match History';
			Lex.tableFMHS = 'Friends Match Stats';
			Lex.tableFR = ' ';
			//'<a href="http://userscripts.org/scripts/show/' + SVC.scriptNum + '">Update Now</a>'
			Lex.tableFP1 = 'Popular Game Types';
			Lex.tableFP2 = 'Popular Maps';
			
			// Table header rows
			Lex.headerMap = 'Map';
			Lex.headerType = 'Position';
			Lex.headerOutcome = 'Outcome';
			Lex.headerDate = 'Date';
			Lex.headerWins = 'Wins';
			Lex.headerLosses = 'Losses';
			Lex.headerLeft = 'Left';
			Lex.headerObs = 'Obs / Other';
			Lex.headerTotal = 'Total';
			Lex.headerNetTotal = 'Net Total';			
			Lex.headerPlayer = 'Player';
			Lex.headerTeam = 'Player';
			Lex.headerPoints = 'Points';
			Lex.headerAPoints = 'Adj Points';
			Lex.headerBonus = 'Bonus';
			Lex.headerRatio = 'Ratio';
			Lex.headerDivision = 'Division';
			Lex.headerRank = 'Rank';
			Lex.headerWinPercent = 'Win %';
						
			// Please wait...
			Lex.lockedFDlist = "Friends List being collected, please wait. \nIf nothing happens after a while, reload the page and try again.";
			Lex.lockedFDmatches = "Friends' match histories being collected, please wait. \nIf nothing happens after a while, reload the page and try again. \n(If you have a huge friends list this could take a while.)";
			Lex.lockedFDrlinks = "Friends' profiles being collected, please wait. \nIf nothing happens after a while, reload the page and try again. \n(If you have a huge friends list this could take a while.)";
			Lex.lockedFDranks = "Friends' divisions being collected, please wait. \nIf nothing happens after a while, reload the page and try again. \n(If you have a huge friends list this could take a while.)";
			Lex.lockedMDmatches = "Match histories being collected, please wait. \nIf nothing happens after a while, reload the page and try again.";
			
			// Leagues
			Lex.leagueGrandmaster = 'grandmaster';
			Lex.leagueMaster = 'master';
			Lex.leagueDiamond = 'diamond';
			Lex.leaguePlatinum = 'platinum';
			Lex.leagueGold = 'gold';
			Lex.leagueSilver = 'silver';
			Lex.leagueBronze = 'bronze';
			Lex.leagueWood = 'wood';
			
			Lex.ladderTypes = ['1v1', '2v2', '3v3', '4v4'];
			break;
			
		case 'fr':  // Not complete yet...
			// Outcome for friends' match history table
			Lex.resultWin = 'Victoire';
			Lex.resultLoss = 'Defaite';
			Lex.resultLeft = 'Restant';
			Lex.resultObs = 'Restant';
		
			// Filtering and Sorting links
			Lex.filterPlayerAll = 'Montre Tous Amis';
			Lex.filterPlayerSome = 'Montre Read ID';
			Lex.filterTypeAll = 'Montre Tous Types';
			Lex.filterTypeSome = 'Montre Ladder';
		
			Lex.filterType0 = 'Tous';
			Lex.filterType1 = '1c1';
			Lex.filterType2 = '2c2';
			Lex.filterType3 = '3c3';
			Lex.filterType4 = '4c4';
			Lex.filterType5 = 'Personnalise';
			
			Lex.sortByPlayer = 'Trier Ami';
			Lex.sortByTeam = 'Trier Equipe';
			Lex.sortByType = 'Trier Type';
			Lex.sortByWins = 'Trier Victoires';
			Lex.sortByPoints = 'Trier Points';
			Lex.sortByAPoints = 'Trier Adj';
			Lex.sortByRatio = 'Trier Ratio';
			Lex.sortByDate = 'Trier Date';
			Lex.sortByRank = 'Trier Rang';
			Lex.sortByBonus = 'Trier Bonus';
			
			// Progress status
			Lex.statusGetMatches = "La collecte des historique des matchs...";
			Lex.statusGetFriends = "La collecte des historique des matchs des amis...";
			Lex.statusGetProfiles = "La collecte des profils des amis...";
			Lex.statusGetDivisions = "La collecte des divisions des amis...";
			Lex.statusCreateTable = "Creer la table...";
		
			// Button labels (used for setting active class to li elements) !!! Make sure you also update the sandboxed Lex !!!
			Lex.buttonMHS  = 'Historique Stats';
			Lex.buttonFMH  = 'Amis Historique Des Matchs';
			Lex.buttonFMHS = 'Amis Historique Stats';
			Lex.buttonFR   = 'Amis Rangs';
			Lex.buttonFP   = 'Amis Populaire';
					
			// Table titles
			Lex.tableMHS1 = 'Historique Des Matchs: Stats Par Carte';
			Lex.tableMHS2 = 'Historique Des Matchs: Stats Par Map';
			Lex.tableFMH = 'Amis Historique Des Matchs';
			Lex.tableFMHS = 'Amis Historique Stats';
			Lex.tableFR = 'Amis Rangs';
			Lex.tableFP1 = 'Types Populaires';
			Lex.tableFP2 = 'Cartes Populaires';
			
			// Table header rows
			Lex.headerMap = 'Carte';
			Lex.headerType = 'Type';
			Lex.headerOutcome = 'Resultat';
			Lex.headerDate = 'Date';
			Lex.headerWins = 'Victoires';
			Lex.headerLosses = 'Defaites';
			Lex.headerLeft = 'Restant';
			Lex.headerObs = 'Obs / Autre';
			Lex.headerTotal = 'Total';
			Lex.headerNetTotal = 'Net Total';
			Lex.headerPlayer = 'Player';
			Lex.headerTeam = 'Equipe';
			Lex.headerPoints = 'Points';
			Lex.headerAPoints = 'Adj';
			Lex.headerBonus = 'Bonus';
			Lex.headerRatio = 'Ratio';
			Lex.headerDivision = 'Division';
			Lex.headerRank = 'Rang';
			Lex.headerWinPercent = 'Victoire %';
			
			// Please wait...
			Lex.lockedFDlist = "La collecte des amis, attendez s'il vous plait. \nSi rien ne se passe apres un certain temps, rafraichir la page.";
			Lex.lockedFDmatches = "La collecte des historique des matchs des amis, attendez s'il vous plait. \nSi rien ne se passe apres un certain temps, rafraichir la page. \n(Si tu as beaucoup d'amis, cela va prendre un certain temps.)";
			Lex.lockedFDrlinks = "La collecte des profils des amis, attendez s'il vous plait. \nSi rien ne se passe apres un certain temps, rafraichir la page. \n(Si tu as beaucoup d'amis, cela va prendre un certain temps.)";
			Lex.lockedFDranks = "La collecte des divisions des amis, attendez s'il vous plait. \nSi rien ne se passe apres un certain temps, rafraichir la page. \n(Si tu as beaucoup d'amis, cela va prendre un certain temps.)";
			Lex.lockedMDmatches = "La collecte des historique des matchs, attendez s'il vous plait. \nSi rien ne se passe apres un certain temps, rafraichir la page.";
			
			// Leagues
			Lex.leagueGrandmaster = 'Grand Maitre';
			Lex.leagueMaster = 'Maitre';
			Lex.leagueDiamond = 'Diamant';
			Lex.leaguePlatinum = 'Platine';
			Lex.leagueGold = 'Or';
			Lex.leagueSilver = 'Argent';
			Lex.leagueBronze = 'Bronze';

			Lex.ladderTypes = ['1c1', '2c2', '3c3', '4c4'];
			break;
	}
});

/**
 * Common Object for shared methods and properties
 */
contentEval(function() {
	Common.arrayIndexOf = function(needle, haystack) {
		for (var key in haystack) {
			if (needle === haystack[key]) {
				return key;
			}
		}
		return -1;
	};

	Common.inArray = function(needle, haystack) {
		for (var key in haystack) {
			if (needle === haystack[key]) {
				return true;
			}
		}
    return false;
	}

	Common.ucfirst = function(s) {
		return s.charAt(0).toUpperCase() + s.slice(1);
	}

	Common.clearTable = function(table) {
		if (table == null)
			return;
		while (table.rows.length > 0) {
			table.deleteRow(0);
		}
	}

	// Deleting individual cells and their contents seems to improve memory leaks?
	Common.clearTable2 = function(table) {
		if (table == null)
			return;
		while (table.rows.length > 0) {
			while (table.rows[0].cells.length > 0) {
				table.rows[0].cells[0].innerHTML = '';
				table.rows[0].deleteCell(0);
			}
			table.deleteRow(0);
		}
	}
	
	Common.makeActive = function(needle, els) {
		for (var i = 0; i < els.length; i++) {
			a = els[i].getElementsByTagName('a')[0];
			if (a.innerHTML == needle) {
				els[i].setAttribute('class', 'active');
			}
			else {
				els[i].setAttribute('class', '');
			}
		}
	}
	
	Common.sortByType = function(a, b) {
		var x = a.type.toLowerCase();
		var y = b.type.toLowerCase();
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	}
	
	Common.sortByMap = function(a, b) {
		var x = a.map.toLowerCase();
		var y = b.map.toLowerCase();
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	}
	
	Common.sortByMostPlayed = function(a, b) {
		var x = parseInt(a.win) + parseInt(a.loss);
		var y = parseInt(b.win) + parseInt(b.loss);
		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
		//return (b.win + b.loss) - (a.win + a.loss);
	}	

	Common.sortByWinDiff = function(a, b) {
		var x = parseInt(a.win) - parseInt(a.loss);
		var y = parseInt(b.win) - parseInt(b.loss);
		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
		//return (b.win - b.loss) - (a.win - a.loss);
	}	
	
	Common.sortByPointsDiff = function(a, b) {
		var x = parseInt(a.pwon) + parseInt(a.plost);
		var y = parseInt(b.pwon) + parseInt(b.plost);
		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
		//return (b.pwon + b.plost) - (a.pwon + a.plost);
	}	
	
	Common.sortByWinRatio = function(a, b) {
		var xt = parseInt(a.win) + parseInt(a.loss);
		var x = (xt > 0) ? Math.round(parseInt(a.win) / xt * 100) : 0;
		var yt = parseInt(b.win) + parseInt(b.loss);
		var y = (yt > 0) ? Math.round(parseInt(b.win) / yt * 100) : 0;
		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	}

	Common.sortBySdate = function(a, b) {
		var x = a.sdate;
		var y = b.sdate;
		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	}	

	Common.sortByPlayer = function(a, b) {
		var x = a.pname.toLowerCase();
		var y = b.pname.toLowerCase();
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	}	

	Common.sortByPoints = function(a, b) {
		var x = a.points ? parseInt(a.points) : 0;
		var y = b.points ? parseInt(b.points) : 0;
		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
		//return b.points - a.points;
	}

	Common.sortByAPoints = function(a, b) {
		var x = a.apoints ? parseInt(a.apoints) : 0;
		var y = b.apoints ? parseInt(b.apoints) : 0;
		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
		//return b.apoints - a.apoints;
	}
	
	Common.sortByBonus = function(a, b) {
		var x = a.bonus ? parseInt(a.bonus) : 0;
		var y = b.bonus ? parseInt(b.bonus) : 0;
		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	}
	
	Common.sortByWins = function(a, b) {
		var x = a.win ? parseInt(a.win) : 0;
		var y = b.win ? parseInt(b.win) : 0;
		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	}

	Common.sortByRank = function(a, b) {
		var x = a.rank ? parseInt(a.rank) : 0;
		var y = b.rank ? parseInt(b.rank) : 0;
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	}

	Common.sortByTotal = function(a, b) {
		var x = a.total ? parseInt(a.total) : 0;
		var y = b.total ? parseInt(b.total) : 0;
		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	}

});

/**
 * Bonus Pool object
 */
contentEval(function() {
	BP.region = typeof Core.buildRegion != 'undefined' ? Core.buildRegion : 'us';
	if (BP.region == 'tw')
		BP.region = 'kr'; //same servers for bonus pool
	BP.dates = [
		{region:'eu', date:new Date(2012,1,15,05,50,31)},
		{region:'kr', date:new Date(2012,1,15,22,38,31)},
		{region:'sea', date:new Date(2012,1,15,23,58,31)},
		{region:'us', date:new Date(2012,1,14,14,54,31)},
		{region:'cn', date:new Date(2012,1,13,22,6,31)}
		/*{region:'kr', date:new Date(2012,1,15,05,30,7)},
		{region:'tw', date:new Date(2012,1,15,05,30,7)},
		{region:'ru', date:new Date(2012,1,15,05,30,7)},
		{region:'la', date:new Date(2012,1,15,05,30,7)},*/
	];
	BP.bonus1 = false;
	BP.bonus2 = false;
	BP.bonus3 = false;
	BP.bonus4 = false;
	
	// For profile update
	BP.bonusTotal = false;
	BP.bonusLeft = false;
	BP.ladder = false;
	BP.h3html = '';
	
	// Calculate ladder start dates for each region based on current bonus pool points (manually fill in current points)
	// http://sc2ranks.com/api/bonus/pool?appKey=localhost
	BP.getDates = function() {	

		var data = [{region:'eu',  points:586, date:null},
		            {region:'kr', points:577, date:null},
					{region:'sea', points:602, date:null},
					{region:'us',  points:594, date:null},
		            {region:'cn',  points:603, date:null}];
		            /*{region:'kr',  points:0, date:null},
		            {region:'la',  points:0, date:null},
		            {region:'tw',  points:0, date:null},
		            {region:'ru',  points:0, date:null},*/
		var t = new Date();
		var j = "BP.dates = [\n";
		for (var i = 0; i < data.length; i++) {
			var minutes = data[i].points * 112;    // Minutes since start of ladder
			data[i].date = new Date(t.getTime() - (minutes * 60 * 1000));
			j += "\t{region:'" + data[i].region + "', date:new Date(" + data[i].date.getFullYear() + ',' + (data[i].date.getMonth()+1) + ',' + data[i].date.getDate() + ',' + data[i].date.getHours() + ',' + data[i].date.getMinutes() + ',' + data[i].date.getSeconds() + ")},\n";
		}
		j += '];';
		alert(j);
		return;
	}

	// Calculate bonus points based on ladder start dates for each region
	// Formula: http://www.teamliquid.net/forum/viewmessage.php?topic_id=195273
	BP.getBonus = function(debug) {
		var debug = typeof debug != 'undefined' ? debug : false;
		//var debug = true;
		var t = new Date();

		// Get bonus pool for current region.
		for (var i = 0; i < BP.dates.length; i++) {
			if (BP.dates[i].region == BP.region) {
				BP.bonus1 = Math.floor((t.getTime() - BP.dates[i].date.getTime()) / (1000 * 60 * 112));
				BP.bonus2 = Math.floor((t.getTime() - BP.dates[i].date.getTime()) / (1000 * 60 * 168));
				BP.bonus3 = Math.floor((t.getTime() - BP.dates[i].date.getTime()) / (1000 * 60 * 336));
				BP.bonus4 = BP.bonus3;
				BP.bonusTotal = BP.bonus1;
				break;
			}
		}
		// If no region match found, set to US pool
		if (BP.bonusTotal === false) {
			BP.bonusTotal = Math.floor((t.getTime() - BP.dates[7].date.getTime()) / (1000 * 60 * 112));
		}
		
		if (debug) {
			// Get bonus pool for each region
			var s = '';
			for (var i = 0; i < BP.dates.length; i++) {
				var points = Math.floor((t.getTime() - BP.dates[i].date.getTime()) / (1000 * 60 * 112));
				s += 'region: ' + BP.dates[i].region + ", points: " + points + "\n";
			}
			s += "\nBP.region=" + BP.region + ', BP.poolTotal=' + BP.bonusTotal;
			s += "\nBP.bonus1=" + BP.bonus1 + ', BP.bonus2=' + BP.bonus2 + ', BP.bonus3=' + BP.bonus3 + ', BP.bonus4=' + BP.bonus4;
			alert(s);
		}
	}
	
	BP.getDivisionLink = function() {
		// If we're on the main page, grab link directly and pass to getDivisionInfo()
		//var el = document.getElementsByClassName('snapshot')[0];
		
		/*if (el != null) {
			if (el.getAttribute('class').indexOf('empty-season') >= 0) {
				var el = document.getElementById('profile-header-more');
				el.innerHTML = 'No 1v1 division';
				return;
			}
			var url = el.getElementsByTagName('a')[0].getAttribute('href');
			BP.getDivisionInfo(url);
			return;
		}*/

		// Query main profile page to get division link
		var el = document.getElementById('profile-header');
		if (el == null) return;
		var el = el.getElementsByTagName('h2');
		if (el == null) return;
		var el = el[0].getElementsByTagName('a');
		if (el == null) return;
		var url = el[0].getAttribute('href');
		if (url == null) return; //1.5
		url += 'ladder/leagues';

		/*var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState==4 && this.status==200) {
				// Get ladder div

				var div_pattern = /<div class="ladder(.|\s)*?<div class="division/gim;
				var div_matches = this.responseText.match(div_pattern);
				if (div_matches == null) {
					// Ladder div not found (should never happen)
					return;
				}
				
				// Check if player has placed in a 1v1 division
				var league_pattern = /badge-([^\s\d\-]+)["\s]/i;
				var league_matches = div_matches[0].match(league_pattern);
				var league = league_matches ? league_matches[1] : 'none';
				if (league == 'none') {
					// Player has no 1v1 division
					var el = document.getElementById('profile-header-more');
					el.innerHTML = 'Outdated 1v1 division';
					return;
				}
				
				// Get url for division
				var url_pattern = /<a href="(.*)">/i;
				var url_matches = div_matches[0].match(url_pattern);
				if (url_matches == null) {
					// Division url doesn't exist (shuold never happen)
					return;
				}
				var url = url_matches[1];

				// Get division info
				BP.getDivisionInfo(url);
	  	}
		}
		xmlhttp.open('GET', url, true);
		xmlhttp.send(null);*/
		BP.getDivisionInfo(url);
		return;
	}
	
	BP.getDivisionInfo = function(url) {
	if (document.URL.toString().indexOf("eu.battle.net") != -1)
		myRegion = 'eu';
	else if (document.URL.toString().indexOf("us.battle.net") != -1)
		myRegion = 'us';
	else if (document.URL.toString().indexOf("sea.battle.net") != -1)
		myRegion = 'sea';
	else if (document.URL.toString().indexOf("kr.battle.net") != -1)
		myRegion = 'kr';
	else if (document.URL.toString().indexOf("tw.battle.net") != -1)
		myRegion = 'tw';		
	else if (document.URL.toString().indexOf("cn.battle.net") != -1)
		myRegion = 'cn';
	else
		myRegion = 'eu';
	
	var league;
	
	//var el5 = document.getElementById('profile-right').getElementsByTagName('a')[0].childNodes[1];
	/*var el5 = document.getElementById('career-stats').getElementsByClassName('badge')[1];
	//console.log(el5);
	if ((el5 == null) || (el5 == 'undefined'))
	{
		console.log('could not get division link.');
		league = 'Not Found';
	}
	else {
		var el5 = el5.className; //league badge text
		if (el5.indexOf('grandmaster') != -1)
			league = 'grandmaster';
		else if (el5.indexOf('master') != -1)
			league = 'master';
		else if (el5.indexOf('diamond') != -1)
			league = 'diamond';
		else if (el5.indexOf('platinum') != -1)
			league = 'platinum';
		else if (el5.indexOf('gold') != -1)
			league = 'gold';
		else if (el5.indexOf('silver') != -1)
			league = 'silver';
		else if (el5.indexOf('bronze') != -1)
			league = 'bronze';
		else
		{
			console.log('error: could not find 1v1 league. is user 1v1 ranked?');
			return;
		}
	}*/
	//console.log(league);
	
	var divisionMod_pattern = /ladder\/(\d+)[^#]/g;
	var divisionNumber = url.match(divisionMod_pattern);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open('GET', url, true);
	xmlhttp.onreadystatechange = function() { 
		if (this.readyState==4) 
		{			
			if (this.status==200) 
			{	
				//get league of user
				var el5 = this.responseText;
				if (el5.indexOf('badge-banner') == -1)
					league = 'Not Found';
				else
				{
					el5 = el5.substr(el5.indexOf('badge-banner'));
					if (el5.indexOf('grandmaster') != -1)
						league = 'grandmaster';
					else if (el5.indexOf('master') != -1)
						league = 'master';
					else if (el5.indexOf('diamond') != -1)
						league = 'diamond';
					else if (el5.indexOf('platinum') != -1)
						league = 'platinum';
					else if (el5.indexOf('gold') != -1)
						league = 'gold';
					else if (el5.indexOf('silver') != -1)
						league = 'silver';
					else if (el5.indexOf('bronze') != -1)
						league = 'bronze';
					else
					{
						console.log('error: could not find 1v1 league. is user 1v1 ranked?');
						league = 'Not Found';
					}
				}
			
				if (league != 'Not Found') //only get all this if we know the league
				{					
					//only grab profile-right segment. this is necessary to avoid profile name from appearing twice if it contains non english characters
					var rightProfile_pattern = /id="profile-right">((.|\n|\r)*)/gi;
					var rightProfile_text = this.responseText.match(rightProfile_pattern);
					
					//var row_pattern = /\/sc2\/en\/profile\/\d+\/\d\/([^\/]*\/)/g; //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
					//if (myRegion == 'kr')
					//	row_pattern = /\/sc2\/ko\/profile\/\d+\/\d\/([^\/]*\/)/g;
					//else if (myRegion == 'tw')
					//	row_pattern = /\/sc2\/zh\/profile\/\d+\/\d\/([^\/]*\/)/g;
					var row_pattern = /\/sc2\/.*\/profile\/\d+\/\d\/([^\/]*\/)/g;
					
					var row_matches = rightProfile_text[0].match(row_pattern);
					
					row_matches = row_matches.sort();   //sort the array to remove duplicate links
					var sorted = [];
					
					for (var i = 0; i < row_matches.length - 1; i++)
						if (row_matches[i] != row_matches[i+1])//there's a bug here that keeps 2 copies of profile owner if he uses non english characters in name
							sorted.push(row_matches[i]);
					sorted.push(row_matches[row_matches.length-1]); // last one didnt get added in loop
	
					if (row_matches == null)
						console.log('error: row_matches = null in BP.getDivisionInfo()');
					
					var names = [];
					for (var i = 0; i < sorted.length; i++)
					{
						names.push(sorted[i]);
						names[i] = names[i].substr(0, names[i].length-1); //remove final /
						names[i] = names[i].substr((names[i].lastIndexOf('/')+1)); //extract name
					}
	
					//var name_pattern = /<\/strong>(.*)<br/im;
					//var divisionName = document.getElementById('best-team-1').innerHTML;
					//divisionName = divisionName.match(name_pattern);
					//divisionName = divisionName[1].substr(1);
					
					var dataArr = [];
					for (var i = 0; i < sorted.length; i++)
						dataArr.push({	name:names[i],
										region:myRegion,
										urlprofile:sorted[i],
										//urldivision:sorted[i]+divisionNumber,
										urldivision:sorted[i]+'ladder/leagues',
										rank:'',
										points:'',
										apoints:'',
										//divisionname:divisionName,
										divisionname:'',
										league:league,
										bonus:'',
										win:'',
										loss:'',
										tdStatus:'',
										team:'',
										type:1,
										inUserOwnDivision:true
						});
					var dataArrJSON = JSON.stringify(dataArr); 
					var	el6 = document.createElement('div');
	
					el6.setAttribute('id', 'userOwnDivision');
					el6.setAttribute('value', dataArrJSON);
					el6.setAttribute('myleague', league);
					p = document.getElementById('profile-left');
					p.appendChild(el6);
				
				} 

				var row_pattern = /id="current-rank(.|\s)*?\/tr>/im;
				var row_matches = this.responseText.match(row_pattern);

				if (row_matches == null) {
					// User not found in division. This could happen if profile shows Grandmaster but player has actually been kicked out of Grandmaster.
					var el = document.getElementById('profile-header-more');
					el.innerHTML = 'Outdated 1v1 division';
					return;
				}

				// Get ladder points
				var info_pattern = /<td class="align(.|\s)*?\/td>/gim;
				var info_matches = row_matches[0].match(info_pattern);
				if (info_matches == null) {
					alert('omg');
					return;
				}
				var points = info_matches[2].substring(info_matches[2].indexOf('>') + 1, info_matches[2].indexOf('</td>')).trim();
				BP.ladder = parseInt(points);

				// Get bonus pool
				var bonus_pattern = /id="bonus-pool".*<span>(\d*)<\/span>/im;
				var bonus_matches = this.responseText.match(bonus_pattern);
				if (bonus_matches == null) {
					bonus_matches = 0;
					//return;
				}
				var bonus;
				if (bonus_matches == 0)
					bonus = 0;
				else
					bonus = bonus_matches[1].trim();

				BP.bonusLeft = parseInt(bonus);
				BP.updateProfile();
				return;
			}
			else if (this.status==404) 
			{
				console.log('error 404 could not find own user division page.');
				return;
			}
			else if (this.status==500)
			{
				console.log('500 in BP.getDivisionInfo. Retrying.');
				BP.getDivisionInfo(url);
				return;
			}
		}
	}
	xmlhttp.send(null);
	return;
	}	

	
	BP.getLadder = function() {
		// Check if we're on a profile page
		if (document.location.href.indexOf('/profile/') < 0) {
			return;
		}
		
		// Save original h3 html, then update it
		var el = document.getElementById('profile-header');
		if (el == null) return;
		el = el.getElementsByTagName('h3');
		if (el == null) return;
		BP.h3html = el[0].innerHTML;
		el[0].innerHTML += ' <span id="profile-header-more" style="font-size:12px; font-weight:normal; color:#0059be">Getting 1v1 Ladder...</span>';
		BP.getDivisionLink();
	}
	
	BP.whichBrowser = function () {
	var agt=navigator.userAgent.toLowerCase();
	if (agt.indexOf("opera") != -1) return 'Opera';
	if (agt.indexOf("staroffice") != -1) return 'Star Office';
	if (agt.indexOf("webtv") != -1) return 'WebTV';
	if (agt.indexOf("beonex") != -1) return 'Beonex';
	if (agt.indexOf("chimera") != -1) return 'Chimera';
	if (agt.indexOf("netpositive") != -1) return 'NetPositive';
	if (agt.indexOf("phoenix") != -1) return 'Phoenix';
	if (agt.indexOf("firefox") != -1) return 'Firefox';
	if (agt.indexOf("safari") != -1) return 'Safari';
	if (agt.indexOf("skipstone") != -1) return 'SkipStone';
	if (agt.indexOf("msie") != -1) return 'Internet Explorer';
	if (agt.indexOf("netscape") != -1) return 'Netscape';
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
	if (agt.indexOf('\/') != -1) {
	if (agt.substr(0,agt.indexOf('\/')) != 'mozilla') {
	return navigator.userAgent.substr(0,agt.indexOf('\/'));}
	else return 'Netscape';} else if (agt.indexOf(' ') != -1)
	return navigator.userAgent.substr(0,agt.indexOf(' '));
	else return navigator.userAgent;
	},
	
	
	BP.sleep = function ZZzzzZZzzzzzzZZZz(naptime){
        naptime = naptime;
        var sleeping = true;
        var now = new Date();
        var alarm;
        var startingMSeconds = now.getTime();
        //alert("starting nap at timestamp: " + startingMSeconds + "\nWill sleep for: " + naptime + " ms");
        while(sleeping){
            alarm = new Date();
            alarmMSeconds = alarm.getTime();
            if(alarmMSeconds - startingMSeconds > naptime){ sleeping = false; }
        }        
        //alert("Wakeup!");
    }
	
	BP.updateProfile = function() {
	//BP.sleep(1000);		//wait for sc2ranks query for bonus pools to complete
	var bonus;
	el3 = document.getElementById('bonus-pools'); //uncommented
	if (el3 == null)
	{
		console.log('at top: could not fetch bonus pools from sc2ranks. using manual calculation');
		//new season fix until sc2ranks updates bonus pools
		
		//season 7 dates
		//seasonStartEU = new Date('Wed Apr 11 2012 05:34:54 GMT+0300');
		//seasonStartAM = new Date('Tue Apr 10 2012 14:34:13 GMT+0300');
		//seasonStartKR = new Date('Wed Apr 11 2012 21:34:16 GMT+0300');
		//seasonStartSEA = new Date('Mon Apr 09 2012 22:35:47 GMT+0300');
		
		//add 9 weeks for season 8
		//seasonStartEU = new Date('Wed Jun 13 2012 05:34:54 GMT+0300');
		//seasonStartAM = new Date('Tue Jun 12 2012 14:34:13 GMT+0300');
		//seasonStartKR = new Date('Wed Jun 13 2012 21:34:16 GMT+0300');
		//seasonStartSEA = new Date('Mon Jun 11 2012 22:35:47 GMT+0300');
		
		var now = new Date();
		var seasonStartEU = new Date('Wed Jun 13 2012 05:34:54 GMT+0300');
		var calcedBPEU = Math.floor((now-seasonStartEU) / (1000 * 60 * 112));
		var seasonStartAM = new Date('Tue Jun 12 2012 14:34:54 GMT+0300');
		var calcedBPAM = Math.floor((now-seasonStartAM) / (1000 * 60 * 112));
		var seasonStartKR = new Date('Wed Jun 13 2012 21:34:16 GMT+0300');
		var calcedBPKR = Math.floor((now-seasonStartKR) / (1000 * 60 * 112));
		var seasonStartSEA = new Date('Mon Jun 11 2012 22:35:47 GMT+0300');
		var calcedBPSEA = Math.floor((now-seasonStartSEA) / (1000 * 60 * 112));	
		
		var findNewSeasonBP = false;
		//findNewSeasonBP = true; //dont forget to update times here and at the one other location
		if (findNewSeasonBP)
		{
			if (myRegion == 'eu')
			{
			var nextBP = 330;
			var nextBPEU = new Date(seasonStartEU.getTime() + nextBP * (1000*60*112));
			console.log(nextBP + ' ' + nextBPEU);
			alert(nextBP + ' ' + nextBPEU);
			}
			if (myRegion == 'us')
			{
			var nextBP = 7;
			var nextBPAM = new Date(seasonStartAM.getTime() + nextBP * (1000*60*112));
			console.log(nextBP + ' ' + nextBPAM);
			alert(nextBP + ' ' + nextBPAM);
			}
			if (myRegion == 'kr')
			{
			var nextBP = 606;
			var nextBPKR = new Date(seasonStartKR.getTime() + nextBP * (1000*60*112));
			console.log(nextBP + ' ' + nextBPKR);
			alert(nextBP + ' ' + nextBPKR + ' now ' + now);
			}
			if (myRegion == 'sea')
			{
			var nextBP = 16;
			var nextBPSEA = new Date(seasonStartSEA.getTime() + nextBP * (1000*60*112));
			console.log(nextBP + ' ' + nextBPSEA);
			alert(nextBP + ' ' + nextBPSEA);
			}
		}
		
		bonusPools.eu = 0+calcedBPEU;
		bonusPools.cn = 0+calcedBPEU; //to be added
		bonusPools.fea = 0+calcedBPKR;
		bonusPools.sea = 0+calcedBPSEA;
		bonusPools.am = 0+calcedBPAM;
	}
	else //uncommented
	{
	if (BP.whichBrowser() == 'Firefox') //firefox version
	{
		var temp = el3.getAttribute('value');
		var regex=/(\w{2,3}(?=\s))|(\d+)/g; //dear god...
				
		var result = [];
		result.push(temp.match(regex));
		for (var i=0; i < 20; i++) 
		{
			if (result[0][i]=='eu')
				bonusPools.eu = parseInt(result[0][i+1]);
			else if (result[0][i]=='cn')
				bonusPools.cn = parseInt(result[0][i+1]);
			else if (result[0][i]=='fea')
				bonusPools.fea = parseInt(result[0][i+1]);
			else if (result[0][i]=='sea')
				bonusPools.sea = parseInt(result[0][i+1]);
			else if (result[0][i]=='am')
				bonusPools.am = parseInt(result[0][i+1]);
		}
		}
	else //non firefox version
		{	
			bonus = el3.getAttribute('value');
			bonusPools = JSON.parse(bonus);
		}		
	}
	
	if (document.URL.toString().indexOf("us.battle.net") != -1)
		BP.bonusTotal = bonusPools.am;
	else if (document.URL.toString().indexOf("sea.battle.net") != -1)
		BP.bonusTotal = bonusPools.sea;
	else if (document.URL.toString().indexOf("kr.battle.net") != -1)
		BP.bonusTotal = bonusPools.fea;
	else if (document.URL.toString().indexOf("tw.battle.net") != -1)
		BP.bonusTotal = bonusPools.fea;
	else if (document.URL.toString().indexOf("cn.battle.net") != -1)
		BP.bonusTotal = bonusPools.cn;
	else
		BP.bonusTotal = bonusPools.eu;
		
	var el = document.getElementById('profile-header').getElementsByTagName('h3')[0];
		el.innerHTML = BP.h3html + '<span style="color:#003076"> | </span>'
								 + '<span style="color:#47C5FF">' + BP.ladder + '</span>'
								 + '<span style="color:#003076"> | </span>'
								 + '<span style="color:#00d683">' + parseInt(BP.ladder - (BP.bonusTotal - BP.bonusLeft)) + '</span>';
	}
	//beginning of BP main execution function
	BP.getBonus();
	BP.getLadder();
	//BP.getDates();  // Run this at the start of each ladder season, then update BP.dates
});

/**
 * Match History Data
 */
contentEval(function() {
	// Data
	MD.matches = [];

	// Lock data when it is being updated.
	MD.matchesLocked = false;

	// Check if any of the MD hashes are currently being udpated.
	MD.isLocked = function() {
		if (MD.matchesLocked) {
			alert(Lex.lockedMDmatches);
			return true;
		}
		return false;
	}

	// Get URL for match history page
	MD.getURL = function() {
		// Try the left menu
		var lis = document.getElementById('profile-menu').getElementsByTagName('li');
		for (var i = 0; i < lis.length; i++) {
			var a = lis[i].getElementsByTagName('a')[0];
			if (a.innerHTML.trim() == 'Match History') {
				url = a.getAttribute('href');
				return url;
			}
		}
		// If left menu fails, try the profile header
		profile = document.getElementById('profile-header');
		if (profile != null) {
			url = profile.getElementsByTagName('h2')[0].getElementsByTagName('a')[0].getAttribute('href') + 'matches';
			return url;
		}
		return false;
	}
	
	// Grab recent match info
	MD.getMatches = function() {	
		// If MD.matches is not empty and not locked, assume data is complete.
		if (MD.matches.length > 0) {
			MHS.prepareType();
			MHS.prepareMap();
			MHS.displayType();
			MHS.displayMap();
			return;
		}

		// Find url for match history.  Grab from current page rather than hardcoding in case Blizzard changes it in the future.
		var url = MD.getURL();
		if (!url) {
			alert('Unable to get match history.');
			return;
		}

		// Lock MHS data
		MD.matchesLocked = true;
		
		// Send AJAX request for match history
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			// status == 302 probably means the Blizzard "swallowed a bug" page, or user was logged out, or both
			// In general, you want to handle status >= 300 by telling the user something went wrong, and to refresh the page
			if (xmlhttp.readyState==4 && this.status==200) {
				var tr_pattern = /<tr class="match-row(.|\s)*?\/tr>/gim;
				var tr_matches = this.responseText.match(tr_pattern);
				var tmp = '';
				for (var i = 0; i < tr_matches.length; i++) {
					// -----------------------------------
					// EXAMPLE OF MATCH ROW:
					// -----------------------------------
					//	<tr class="match-row fours">
					//		<td style="width: 15px;" data-tooltip="#match-mode-2">
					//	
					//			<img src="/sc2/static/images/icons/ladder/view-more.gif" alt="+" />
					//	
					//			<div id="match-mode-2" style="display: none;">
					//				<strong>Type:</strong> 4c4<br />
					//				<strong>Vitesse :</strong> Plus rapide
					//			</div>
					//		</td>
					//	
					//		<td>Megatonne</td>
					//		<td class="align-center">4c4</td>
					//		<td>
					//			<span class="match-win">Victoire</span>
					//					(<span class="text-green">+16</span>)
					//		</td>
					//		<td class="align-right">
					//	
					//			2/5/2011
					//		</td>
					//	</tr>
					// -----------------------------------
					var td_pattern = /<td(.|\s)*?\/td>/gim;
					var td_matches = tr_matches[i].match(td_pattern);

					var map = td_matches[1].substring(td_matches[1].indexOf('>') + 1, td_matches[1].indexOf('</td>')).trim();
					var type = td_matches[2].substring(td_matches[2].indexOf('>') + 1, td_matches[2].indexOf('</td>')).trim();

					var span_pattern = /<span(.|\s)*?\/span>/gim;
					var span_matches = td_matches[3].match(span_pattern);
					// Can't use span.innerHTML because of different languages
					//var result = span_matches[0].substring(span_matches[0].indexOf('>') + 1, span_matches[0].indexOf('</span>')).trim();
					var result = span_matches[0].substring(span_matches[0].indexOf('match-') + 6, span_matches[0].indexOf('">')).trim();
					var points = (span_matches.length > 1) ? span_matches[1].substring(span_matches[1].indexOf('>') + 1, span_matches[1].indexOf('</span>')).trim() : '0';

					var date = td_matches[4].substring(td_matches[4].indexOf('>') + 1, td_matches[4].indexOf('</td>')).trim();
					
					tmp += map + " : " + type + " : " + result + " : " + points + " : " + date + "\n";
					MD.matches.push({map:map, type:type, result:result, points:points, date:date});
				}
				//alert(tmp);
				
				// Unlock MHS data
				MD.matchesLocked = false;
				
				MHS.prepareType();
				MHS.prepareMap();
				MHS.displayType();
				MHS.displayMap();
				return;
	  	}
		}
		xmlhttp.open('GET', url, true);
		xmlhttp.send(null);
		return;
	}
});

/**
 * Match History Stats
 */
contentEval(function() {
	MHS.dataType = [];
	MHS.dataMap = [];
	
	MHS.prepareType = function() {
		// Can't hardcode types array because of different languages
		//var types = Common.ladderTypes.slice(0);
		var types = []
		for (var i = 0; i < MD.matches.length; i++) {
			if (!Common.inArray(MD.matches[i].type, types)) {
				types.push(MD.matches[i].type);
			}
		}
		// Initialize dataType
		for (var i = 0; i < types.length; i++) {
			MHS.dataType[i] = {type: types[i], win:0, loss:0, other:0, pwon:0, plost:0};
		}
		// Populate dataType
		for (var i = 0; i < MD.matches.length; i++) {
			var idx = Common.arrayIndexOf(MD.matches[i].type, types);
			if (MD.matches[i].result == 'win') {
				MHS.dataType[idx].win++;
				MHS.dataType[idx].pwon += parseInt(MD.matches[i].points);
			}
			else if (MD.matches[i].result == 'loss') {
				MHS.dataType[idx].loss++;
				MHS.dataType[idx].plost += parseInt(MD.matches[i].points);
			}
			else {
				MHS.dataType[idx].other++;
			}
		}
		MHS.dataType.sort(Common.sortByType);
		return;
	}
	
	MHS.prepareMap = function() {
		// Get all maps in match history
		var maps = [];
		for (var i = 0; i < MD.matches.length; i++) {
			if (!Common.inArray(MD.matches[i].map, maps)) {
				maps.push(MD.matches[i].map);
			}
		}
		// Initialize dataMap
		for (var i = 0; i < maps.length; i++) {
			MHS.dataMap[i] = {map: maps[i], type: '', win:0, loss:0, other:0, pwon:0, plost:0};
		}		
		// Populate dataMap
		for (var i = 0; i < MD.matches.length; i++) {
			idx = Common.arrayIndexOf(MD.matches[i].map, maps);
			if (MD.matches[i].result == 'win') {
				MHS.dataMap[idx].win++;
				MHS.dataMap[idx].pwon += parseInt(MD.matches[i].points);
			}
			else if (MD.matches[i].result == 'loss') {
				MHS.dataMap[idx].loss++;
				MHS.dataMap[idx].plost += parseInt(MD.matches[i].points);
			}
			else {
				MHS.dataMap[idx].other++;
			}
			if (MHS.dataMap[idx].type.indexOf(MD.matches[i].type) < 0) {
				MHS.dataMap[idx].type = MHS.dataMap[idx].type ? MHS.dataMap[idx].type + ',' + MD.matches[i].type : MD.matches[i].type;
			}
		}
		// Re-order the type field in case there are multiple types for a single map (e.g. 1v1 and 2v2 for metal)
		for (var i = 0; i < MHS.dataMap.length; i++) {
			if (MHS.dataMap.type) {
				tmp = MHS.dataMap.type.split(',');
				tmp.sort();
				MHS.dataMap.type = tmp.join(', ');
			}
		}
		MHS.dataMap.sort(Common.sortByMap);		
		MHS.dataMap.sort(Common.sortByMostPlayed);
		MHS.dataMap.sort(Common.sortByPointsDiff);
		MHS.dataMap.sort(Common.sortByWinDiff);
		MHS.dataMap.sort(Common.sortByWinRatio);
		//MHS.dataMap.sort(Common.sortByType);
	}
	
	MHS.displayType = function() {
		// Clear table
		var table = document.getElementById('MHS-table-type');
		Common.clearTable(table);
		
		// Create header row
		var thead = table.createTHead()
		var tr = thead.insertRow(-1);
		var th1 = tr.insertCell(-1);
		var th2 = tr.insertCell(-1);
		var th3 = tr.insertCell(-1);
		var th4 = tr.insertCell(-1);
		var th5 = tr.insertCell(-1);
		var th6 = tr.insertCell(-1);

		th1.innerHTML = Lex.headerMap;
		th1.setAttribute('style', 'color: #C1FFFF; padding: 14px 14px 14px 32px; width: 120px;');
		th2.innerHTML = Lex.headerType;
		th2.setAttribute('class', 'align-center');
		th2.setAttribute('style', 'color: #C1FFFF; padding: 14px; width: 100px;');
		th3.innerHTML = Lex.headerWins;
		th3.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th4.innerHTML = Lex.headerLosses;
		th4.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th5.innerHTML = Lex.headerNetTotal;
		th5.setAttribute('style', 'color: #C1FFFF; padding: 14px 14px 14px 32px;');
		th5.setAttribute('class', 'align-left');
		th6.innerHTML = Lex.headerWinPercent;
		th6.setAttribute('style', 'color: #C1FFFF; padding: 14px 28px 14px 14px;');
		th6.setAttribute('class', 'align-right');

		// Summary by game type (1v1, 2v2, 3v3, 4v4)
		for (var i = 0; i < MHS.dataType.length; i++) {
			var tr = table.insertRow(-1);
			tr.setAttribute('class', 'match-row');
			tr.setAttribute('onmouseover', 'javascript:this.setAttribute("style", "background:#000a19")');
			tr.setAttribute('onmouseout', 'javascript:this.setAttribute("style", "")');
			var td1 = tr.insertCell(-1);
			var td2 = tr.insertCell(-1);
			var td3 = tr.insertCell(-1);
			var td4 = tr.insertCell(-1);
			var td5 = tr.insertCell(-1);
			var td6 = tr.insertCell(-1);
			td1.innerHTML = 'All Maps';
			td1.setAttribute('style', 'padding-left: 32px;');
			td2.innerHTML = MHS.dataType[i].type;
			td2.setAttribute('class', 'align-center');
			td3.innerHTML = '<span class="match-win">' + MHS.dataType[i].win + '</span> (<span class="text-green">+' + MHS.dataType[i].pwon + '</span>)';
			td4.innerHTML = '<span class="match-loss">' + MHS.dataType[i].loss + '</span> (<span class="text-red">' + MHS.dataType[i].plost + '</span>)';

			var netGames = MHS.dataType[i].win - MHS.dataType[i].loss;
			var netPoints = MHS.dataType[i].pwon + MHS.dataType[i].plost;
			
			if      (netGames > 0) games = '<span class="text-green">+' + netGames + '</span>';
			else if (netGames < 0) games = '<span class="text-red">' + netGames + '</span>';
			else                   games = netGames;
			
			if      (netPoints > 0) points = '<span class="text-green">+' + netPoints + '</span>';
			else if (netPoints < 0) points = '<span class="text-red">' + netPoints + '</span>';
			else                    points = netPoints;

			td5.innerHTML = games + ' (' + points + ')';
			td5.setAttribute('class', 'align-left');
			td5.setAttribute('style', 'padding-left:32px;');

			var ratio = (MHS.dataType[i].win + MHS.dataType[i].loss) > 0 ? Math.round(MHS.dataType[i].win / (MHS.dataType[i].win + MHS.dataType[i].loss) * 100) : 0;

			td6.innerHTML = ratio + '%';
			td6.setAttribute('class', 'align-right');
			td6.setAttribute('style', 'padding-right:28px;');
		}
		return;
	}
	
	MHS.displayMap = function() {
		// Clear table
		var table = document.getElementById('MHS-table-map');
		Common.clearTable(table);
		
		// Create header row
		var thead = table.createTHead()
		var tr = thead.insertRow(-1);
		var th1 = tr.insertCell(-1);
		var th2 = tr.insertCell(-1);
		var th3 = tr.insertCell(-1);
		var th4 = tr.insertCell(-1);
		var th5 = tr.insertCell(-1);
		var th6 = tr.insertCell(-1);

		th1.innerHTML = Lex.headerMap;
		th1.setAttribute('style', 'color: #C1FFFF; padding: 14px 14px 14px 32px; width: 120px;');
		th2.innerHTML = Lex.headerType;
		th2.setAttribute('class', 'align-center');
		th2.setAttribute('style', 'color: #C1FFFF; padding: 14px; width: 100px;');
		th3.innerHTML = Lex.headerWins;
		th3.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th4.innerHTML = Lex.headerLosses;
		th4.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th5.innerHTML = Lex.headerNetTotal;
		th5.setAttribute('style', 'color: #C1FFFF; padding: 14px 14px 14px 32px;');
		th5.setAttribute('class', 'align-left');
		th6.innerHTML = Lex.headerWinPercent;
		th6.setAttribute('style', 'color: #C1FFFF; padding: 14px 28px 14px 14px;');
		th6.setAttribute('class', 'align-right');

		// Summary by game type (1v1, 2v2, 3v3, 4v4)
		for (var i = 0; i < MHS.dataMap.length; i++) {
			var tr = table.insertRow(-1);
			tr.setAttribute('class', 'match-row');
			tr.setAttribute('onmouseover', 'javascript:this.setAttribute("style", "background:#000a19")');
			tr.setAttribute('onmouseout', 'javascript:this.setAttribute("style", "")');
			td1 = tr.insertCell(-1);
			td2 = tr.insertCell(-1);
			td3 = tr.insertCell(-1);
			td4 = tr.insertCell(-1);
			td5 = tr.insertCell(-1);
			td6 = tr.insertCell(-1);
			td1.innerHTML = MHS.dataMap[i].map;
			td1.setAttribute('style', 'padding-left: 32px;');
			td2.innerHTML = MHS.dataMap[i].type;
			td2.setAttribute('class', 'align-center');
			td3.innerHTML = '<span class="match-win">' + MHS.dataMap[i].win + '</span> (<span class="text-green">+' + MHS.dataMap[i].pwon + '</span>)';
			td4.innerHTML = '<span class="match-loss">' + MHS.dataMap[i].loss + '</span> (<span class="text-red">' + MHS.dataMap[i].plost + '</span>)';

			var netGames = MHS.dataMap[i].win - MHS.dataMap[i].loss;
			var netPoints = MHS.dataMap[i].pwon + MHS.dataMap[i].plost;
			
			if      (netGames > 0) games = '<span class="text-green">+' + netGames + '</span>';
			else if (netGames < 0) games = '<span class="text-red">' + netGames + '</span>';
			else                   games = netGames;
			
			if      (netPoints > 0) points = '<span class="text-green">+' + netPoints + '</span>';
			else if (netPoints < 0) points = '<span class="text-red">' + netPoints + '</span>';
			else                    points = netPoints;

			td5.innerHTML = games + ' (' + points + ')';
			td5.setAttribute('class', 'align-left');
			td5.setAttribute('style', 'padding-left:32px;');

			var ratio = (MHS.dataMap[i].win + MHS.dataMap[i].loss) > 0 ? Math.round( MHS.dataMap[i].win / (MHS.dataMap[i].win + MHS.dataMap[i].loss) * 100) : 0;

			td6.innerHTML = ratio + '%';
			td6.setAttribute('class', 'align-right');
			td6.setAttribute('style', 'padding-right:28px;');
		}
		return;		
	}

	MHS.launch = function() {
		if (MD.isLocked()) {
			return;
		}
		var lis = document.getElementById('profile-menu').getElementsByTagName('li');
		Common.makeActive(Lex.buttonMHS, lis);
		
		var divProfileRight = document.getElementById('profile-right');
		divProfileRight.innerHTML = '';
		
		divMatchHistory = document.createElement('div');
		divMatchHistory.setAttribute('id', 'match-history');
		
		// Type table
		var divDataTitle = document.createElement('div');
		divDataTitle.setAttribute('class', 'data-title');
		
		var divDataLabel = document.createElement('div');
		divDataLabel.setAttribute('class', 'data-label');
		
		var divDataLabelH3 = document.createElement('h3');
		divDataLabelH3.setAttribute('class', 'title-graph');
		divDataLabelH3.innerHTML = Lex.tableMHS1;
		divDataLabel.appendChild(divDataLabelH3);
		divDataTitle.appendChild(divDataLabel);
		
		var tableDataTable = document.createElement('table');
		tableDataTable.setAttribute('class', 'data-table');
		tableDataTable.setAttribute('id', 'MHS-table-type');
		
		var trSpacer = tableDataTable.insertRow(-1);
		var tdSpacer = trSpacer.insertCell(-1);
		tdSpacer.setAttribute('align', 'left');
		tdSpacer.innerHTML = Lex.statusGetMatches;
		
		divMatchHistory.appendChild(divDataTitle);
		divMatchHistory.appendChild(tableDataTable);

		// Map table
		var divDataTitle = document.createElement('div');
		divDataTitle.setAttribute('class', 'data-title');

		var divDataLabel = document.createElement('div');
		divDataLabel.setAttribute('class', 'data-label');

		var divDataLabelH3 = document.createElement('h3');
		divDataLabelH3.setAttribute('class', 'title-graph');
		divDataLabelH3.innerHTML = Lex.tableMHS2;
		divDataLabel.appendChild(divDataLabelH3);
		divDataTitle.appendChild(divDataLabel);

		var tableDataTable = document.createElement('table');
		tableDataTable.setAttribute('class', 'data-table');
		tableDataTable.setAttribute('id', 'MHS-table-map');

		var trSpacer = tableDataTable.insertRow(-1);
		var tdSpacer = trSpacer.insertCell(-1);
		tdSpacer.setAttribute('align', 'left');
		tdSpacer.innerHTML = Lex.statusGetMatches;
		
		divMatchHistory.appendChild(divDataTitle);
		divMatchHistory.appendChild(tableDataTable);
				
		divProfileRight.appendChild(divMatchHistory);
		
		MD.getMatches();
		return;
	}
});

/**
 * Friends Data Thread Manager Object
 *
 * Manages multiple AJAX threads
 * Status Codes:  0 = not fetched
 *                1 = fetching
 *                2 = fetched
 */
contentEval(function() {
	FDTM.maxThreads = 5;//causes issues on short lists - multi core programming style
	FDTM.matches = [];
	FDTM.rlinks = [];
	
	FDTM.initialize = function(type, len) {
		switch (type) {
			case 'matches':
				FDTM.matches = [];
				for (var i = 0; i < len; i++) {
					FDTM.matches.push(0);
				}
				break;
			case 'rlinks':
				FDTM.rlinks = [];
				for (var i = 0; i < len; i++) {
					FDTM.rlinks.push(0);
				}
				break;
			default:
				break;
		}				
	}
	
	// Get next friend to be fetched
	// Returns:
	//   index of next item to be fetched, or
	//   -2 if nothing is unfetched or being fetched, or
	//   -1 if nothing is unfetched.
	
	//	1 - processing rlinks stage
	//	2 - finished rlinks
	// 	3 - processing ranks stage
	//	4 - finished ranks
	//	8 - do not scan this user, he is from another list
	//	9 - do not scan this user
	//	stage switches between FDTM.getNext handling 0->1 or it handling 2->3 transition
	//	either way rlinksthread handles 1->2 transitions and ranksthread handles 3->4 transition
	FDTM.getNext = function(type, stage) {
		switch (type) {
			case 'rlinks':
			if (stage == 0)
			{
				i0 = Common.arrayIndexOf(0, FDTM.rlinks);
				i1 = Common.arrayIndexOf(1, FDTM.rlinks);
				ret = (i0 >= 0) ? i0 : (i1 >= 0) ? -1 : -2
			}
			else if (stage == 1)
			{
				i0 = Common.arrayIndexOf(2, FDTM.rlinks);
				i1 = Common.arrayIndexOf(3, FDTM.rlinks);
				ret = (i0 >= 0) ? i0 : (i1 >= 0) ? -1 : -2
			}
				break;
			default:
				break;
		}
		if (ret >= 0)
		{
			if (stage == 0)
				FDTM.updateStatus(type, ret, 1);
			else if (stage == 1)
				FDTM.updateStatus(type, ret, 3);
			else
				alert('error FDTM.getNext: unknown stage');
		}
		return ret;
	}
	
	// Update status code
	FDTM.updateStatus = function(type, index, value) {
		//var value = typeof value != 'undefined' ? value : 2;
		switch (type) {
			case 'list':
				FDTM.list[index] = value;
				break;
			case 'matches':
				FDTM.matches[index] = value;
				break;
			case 'rlinks':
				FDTM.rlinks[index] = value;
				break;
			default:
				break;
		}
		return;
	}
});
 
/**
 * Friends Data Object
 */
contentEval(function() {
	// Data
	FD.matches = [];
	
	// Lock data when it is being updated.
	FD.listLocked = false;
	FD.matchesLocked = false;
	FD.rlinksLocked = false;
	FD.ranksLocked = false;

	// Check if any of the FD hashes are currently being udpated.
	FD.isLocked = function() {
		if (FD.listLocked) {
			alert(Lex.lockedFDlist);
			return true;
		}
		if (FD.matchesLocked) {
			alert(Lex.lockedFDmatches);
			return true;
		}
		if (FD.rlinksLocked) {
			alert(Lex.lockedFDrlinks);
			return true;
		}
		if (FD.ranksLocked) {
			alert(Lex.lockedFDranks);
			return true;
		}
		return false;
	}	
	
	// Get friends list.
	FD.getList = function(callback, showOwnDivision) {
		var callback = typeof callback != 'undefined' ? callback : '';

		// Lock FD.list
		FD.listLocked = true;
		
		matchesCounter = 0;
		
		for (var i = 0; i < FR.dataBase.length; i++)
		{
			if (FR.dataBase[i].region != myRegion)
			{
				FDTM.rlinks[i] = 9; //dont query users from another region
				continue;
			}
			if ((FR.dataBase[i].urlapi != currentCustomDivisionURLAPI) && (!showOwnDivision))//dont query users from other SC2Ranks custom divisions
			{
				if ((FDTM.rlinks[i] == 4) || (FDTM.rlinks[i] == 8))
					FDTM.rlinks[i] = 8; //don't display user in this iteration, but remember that we got all his info so dont query again
				else
					FDTM.rlinks[i] = 9;
				continue;
			}
			if (FDTM.rlinks[i] == 8)
			{
				FDTM.rlinks[i] = 4;
				continue;
			}
			if (FDTM.rlinks[i] == 4)//user profile complete
				continue;
				
			if (showOwnDivision) //only displaying users in own division
			{
				if (FR.dataBase[i].inUserOwnDivision) 
					FDTM.rlinks[i] = 2; //query these users
				else
					FDTM.rlinks[i] = 9; //dont query users not from own division
			}
			else	//only displaying users in custom division
			{
				if (FR.dataBase[i].inUserOwnDivision)
					FDTM.rlinks[i] = 9; //dont query users from own division
				else
				{	
					FDTM.rlinks[i] = 0;
					if (!leaguesArr[FR.dataBase[i].league])
						FDTM.rlinks[i] = 9; //user needs more levels...
				}
			}
		}
		
		for (var i = 0; i < FR.dataBase.length; i++)
			if ((FDTM.rlinks[i] == 0) || (FDTM.rlinks[i] == 2))
				matchesCounter++; //how many users we have to check. used for threads count and display.

		divisions = matchesCounter;
		profiles = matchesCounter;
	
		// Unlock FD.list
		FD.listLocked = false;
		FD.rlinksLocked = false;
		
		if (showOwnDivision)
		{
			progress = '<span style="color:#6EA6CA;">' + Lex.statusGetDivisions  + '</span> <span id="fr-progress-2"> </span>';
			document.getElementById('fr-progress').innerHTML = progress;
			FD.getRanks(callback, showOwnDivision);
		}
		else
		{
		// Execute "callback"
		switch (callback) {
			case 'FR':
				FD.getRlinks(callback, showOwnDivision);
				break;
			default:
				break;
		}
		}
				
		return;
	}
	
	// Thread for AJAX calls to update data
	FD.rlinksThread = function(callback, showOwnDivision) {
		// Get next friend to fetch	
		var fid = FDTM.getNext('rlinks', 0);
	
		// If there are no more "unfetched" or "fetching" friends, halt thread and execute callbacks
		if (fid == -2) {
			//FD.addSelf(callback);
			FD.rlinksLocked = false;
			if(profiles == 0)
			{
				progress += ' <span style="color:#6EA6CA;">' + Lex.statusGetDivisions  + '</span> <span id="fr-progress-2"> </span>';
				document.getElementById('fr-progress').innerHTML = progress;
				profiles--;
			}
			FD.getRanks(callback, showOwnDivision);
			return;
		}

		// If there are no more "unfetched" friends but some are still "fetching," simply halt thread
		if (fid == -1) {
			return;
		}
			
		if ((FDTM.rlinks[fid] == 4) || (FDTM.rlinks[fid] == 9) || (FDTM.rlinks[fid] == 8)) //either bad profile or already fully scanned
		{
			console.log('error: in rlinksthread got FDTM.rlinks 4, 8 or 9. this should never happen.');
			FD.rlinksThread(callback, showOwnDivision);
			return;
		}
		
		//make sure we have all necessary requirements
		if (FR.dataBase[fid].urlprofile == '')
		{
			console.log('rlinksthread: FR.dataBase['+fid+'].urlprofile is empty');
			FDTM.updateStatus('rlinks', fid, 2);
			FD.rlinksThread(callback, showOwnDivision);
		}
		
		if(profiles > 0)
		{
			// Update progress display
			progress = '[ ' + (parseInt(matchesCounter - profiles--)+1) + ' / ' + matchesCounter + ' ]';
			//progress = (parseInt(matchesCounter - profiles)+1) == matchesCounter ? progress + ' <span style="color:#6EA6CA;">' + Lex.statusGetDivisions  + '</span> <span id="fr-progress-2"> </span>' : progress;
			document.getElementById('fr-progress').innerHTML = progress;
		}
		
		
		/*if (FR.dataBase[fid].urldivision != '')
		{
			FDTM.updateStatus('rlinks', fid ,2);
			FD.rlinksThread(callback, showOwnDivision);
			return;
		}*/
		
		FR.dataBase[fid].urldivision = FR.dataBase[fid].urlprofile + 'ladder/leagues'; //new in 1.5?
		FDTM.updateStatus('rlinks', fid ,2); // mark this person as completed
		FD.rlinksThread(callback, showOwnDivision);
		
		/*
		// Send AJAX request for friend's match history
		var urlprofile = FR.dataBase[fid].urlprofile;
		var xmlhttp = new XMLHttpRequest(); //these are the requests for the player's profile pages
		xmlhttp.fid = fid;
		xmlhttp.name = FR.dataBase[fid].name;
		xmlhttp.callback = callback;
		xmlhttp.open('GET', urlprofile, true);
		xmlhttp.onreadystatechange = function() {
			if (this.readyState==4) {			
				if (this.status==200) 
				{
					var div_pattern = /<div class="ladder(.|\s)*?<div class="division/gim;
					var div_matches = this.responseText.match(div_pattern);
					if (div_matches != null) {
						FR.dataBase[this.fid].urldivision = '';
						for (var i = 0; i < div_matches.length; i++) {
							// -----------------------------------
							// EXAMPLE OF PROFILE'S LADDER DIV:
							// -----------------------------------
							// <div class="ladder" data-tooltip="#best-team-2">
							// 	<a href="/sc2/en/profile/537033/1/RitsuTainaka/ladder/46492#current-rank">
							// 		<span class="badge badge-diamond badge-medium-4">
							// 		</span>
							// 	</a>
							// 	<div id="best-team-2" style="display: none;">
							// 		<div class="tooltip-title">Highest Ranked in 2v2</div>
							// 		<div>
							// 			<strong>Division:</strong> Kaloth Pi<br />
							// 			<strong>Rank:</strong> 3
							// 		</div>
							// 	</div>
							// </div>
							// <div class="division">2v2</div>
							// -----------------------------------
						
							// Get league first so we can test against "none"
							var league_pattern = /badge-([^\s\d\-]+)["\s]/i;
							var league_matches = div_matches[i].match(league_pattern);
							var thisleague = league_matches ? league_matches[1] : 'none';
							if (thisleague == 'none') {
								continue;
							}
	
							// Get type (1v1, 2v2, 3v3, or 4v4)
							var type_pattern = /#best-team-([1-4])/i;
							var type_matches = div_matches[i].match(type_pattern);
							//var type = type_matches ? type_matches[0].charAt(type_matches[0].length - 1) : 'Unknown';
							var type = type_matches ? type_matches[1] : 'Unknown';
						
							// Get url for division
							var url_pattern = /<a href="(.*)">/i;
							var url_matches = div_matches[i].match(url_pattern);
							//var url = url_matches ? url_matches[0].substring(9, url_matches[0].length - 2) : 'Unknown';
							var url = url_matches ? url_matches[1] : '#';

							if(type == 1)
							{
								FR.dataBase[this.fid].urldivision = url;
								i = div_matches.length-1;							
							}	
						}
					}
					if (FR.dataBase[this.fid].urldivision == '') //user has no 1v1 division
						FR.dataBase[this.fid].league = 'wood';
					FDTM.updateStatus('rlinks', this.fid ,2); // mark this person as completed
					FD.rlinksThread(this.callback, showOwnDivision);
					return;
				}
				else if (this.status==404) 
				{//player not found. probably changed his bnet name / wrong capitalization of name on sc2ranks profile
					FR.dataBase[this.fid].league = 'wood';
					FR.dataBase[this.fid].urldivision = '';
					FDTM.updateStatus('rlinks', this.fid, 2);
					FD.rlinksThread(this.callback, showOwnDivision);
					return;
				}
				else if (this.status == 500) { //unknown error
					profiles++;//for page progress display
					FDTM.updateStatus('rlinks', this.fid, 0); //mark this person as still needing to be queried
					FD.rlinksThread(this.callback, showOwnDivision);
					return;
				}
				else //for example user left page while still queried, but may be other net problems as well
				{
					console.log('profile fetch - unknown status: ' + this.status); 
					profiles++;
					FDTM.updateStatus('rlinks', this.fid, 0); //mark this person as still needing to be queried
					FD.rlinksThread(this.callback, showOwnDivision);
				}
			}
		}
		xmlhttp.send(null);
		*/
		
		return;
	}
	
	// Get league and ladder points of all friends.
	// here FD.getRlinks FD.getRanks
	
	FD.getRlinks = function(callback, showOwnDivision) {
		var callback = typeof callback != 'undefined' ? callback : '';
		
		// Lock FD.matches
		FD.rlinksLocked = true;

		// Launch AJAX threads
		var min = FDTM.maxThreads;
		if (min > matchesCounter - 4)
			min = matchesCounter - 4;
		if (min < 1)
			min = 1;

		for (var i = 0; i < min; i++) {
		//for (var i = 0; i < FDTM.maxThreads; i++) {
			setTimeout(function() {FD.rlinksThread(callback, showOwnDivision)}, i*800);
		}
		
		return;
	}

	// Add user's own divisions to rlinks
	/*FD.addSelf = function(callback) {
		// Get url for own profile
		var url= document.getElementById('user-portrait').getElementsByTagName('a')[0].getAttribute('href');
		var pname = document.getElementsByClassName('character-name')[0].innerHTML.trim();
		var fid = -1;
		
		var xmlhttp = new XMLHttpRequest(); 
		xmlhttp.fid = fid;
		xmlhttp.pname = pname;
		xmlhttp.callback = callback;
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState==4 && this.status==200) {
				var div_pattern = /<div class="ladder(.|\s)*?<div class="division/gim;
				var div_matches = this.responseText.match(div_pattern);
				var debug = '';
				if (div_matches != null) {
					for (var i = 0; i < div_matches.length; i++) {
						// Get league first so we can test against "none"
						var league_pattern = /badge-([^\s\d\-]+)["\s]/i;
						var league_matches = div_matches[i].match(league_pattern);
						var league = league_matches ? league_matches[1] : 'none';
						if (league == 'none') {
							continue;
						}

						// Get type (1v1, 2v2, 3v3, or 4v4)
						var type_pattern = /#best-team-([1-4])/i;
						var type_matches = div_matches[i].match(type_pattern);
						//var type = type_matches ? type_matches[0].charAt(type_matches[0].length - 1) : 'Unknown';
						var type = type_matches ? type_matches[1] : 'Unknown';
						
						// Get url for division
						var url_pattern = /<a href="(.*)">/i;
						var url_matches = div_matches[i].match(url_pattern);
						//var url = url_matches ? url_matches[0].substring(9, url_matches[0].length - 2) : 'Unknown';
						var url = url_matches ? url_matches[1] : '#';
						//alert('url = ' + url);
						
						// Get division name
						var division_pattern = /<\/strong>(.*)<br/im;
						var division_matches = div_matches[i].match(division_pattern);
						var division = division_matches ? division_matches[1].trim() : 'Unknown';
						
						// Get division rank (needed to identify duplicate rlinks for teams of multiple friends)
						var rank_pattern = /<\/strong>\s*(\d*)\s*<\/div>/im;
						var rank_matches = div_matches[i].match(rank_pattern);
						var rank = rank_matches ? rank_matches[1] : 'Unknown';
						
						debug += type + " : " + league + " : " + division + " : " + url + "\n";
						FD.rlinks.push({fid:this.fid, type:type, league:league, division:division, rank:rank, url:url})
					}
				}
				//alert('#' + this.fid + ":\n" + debug);

				FD.trimRlinks();
				FD.getRanks(callback);
				FD.rlinksLocked = false;
				return;
			} // END if (xmlhttp.readyState==4 && this.status==200)
		} // END xmlhttp.onreadystatechange = function() {
		
		xmlhttp.open('GET', url, true);
		xmlhttp.send(null);
		return;
	}*/
	
	// Thread for AJAX calls to update data
	FD.ranksThread = function(callback, showOwnDivision) {
		// Get next friend to fetch
		var fid = FDTM.getNext('rlinks', 1);
		
		// If there are no more "unfetched" or "fetching" divisions, halt thread and execute callbacks
		if (fid == -2) {
			FD.ranksLocked = false;
			FR.prepareData(showOwnDivision);
			FR.displayData(showOwnDivision);
			return;
		}
		
		// If there are no more "unfetched" divisions but some are still "fetching," simply halt thread
		if (fid == -1) {
			return;
		}
		
		// Update progress display
		progress = '[ ' + (parseInt(matchesCounter - divisions)+1) + ' / ' + matchesCounter + ' ]';
		progress = (parseInt(matchesCounter - divisions)+1) == matchesCounter ? progress + ' ' + Lex.statusCreateTable : progress;
		document.getElementById('fr-progress-2').innerHTML = progress;
		divisions--;
		
		if ((FDTM.rlinks[fid] == 4) || (FDTM.rlinks[fid] == 9) || (FDTM.rlinks[fid] == 8)) //either bad profile or already fully scanned
		{
			console.log('rlinks FDTM.rlinks[fid] = 4, 8 or 9');
			FD.ranksThread(callback, showOwnDivision);
			return;
		}
	
		//make sure we have all necessary requirements
		// Send AJAX request for friend's match history
		if ((FR.dataBase[fid].league == 'wood') && (FR.dataBase[fid].urldivision == '')) //player division page not found
		{
			var tdStatus = '<td class="align-center" style="width: 15px;">' + "\n\t";
			tdStatus += ' -- ' + "\n";
			tdStatus += '</td>';
			var t = '<a href="' + FR.dataBase[fid].urlprofile + '" style="padding: 1px 0 2px 2px;">' + "\n\t";
			t += FR.dataBase[fid].name + "\n";
			t += '</a>';
			var team = [t];  // This needs to be an array
			FR.dataBase[fid].tdStatus = tdStatus;
			FR.dataBase[fid].team = team;
			//divisions--;
			FDTM.updateStatus('rlinks', fid, 4);
			FD.ranksThread(callback, showOwnDivision);
			return;
		}

		var url = FR.dataBase[fid].urldivision;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.fid = fid;
		xmlhttp.callback = callback;
		xmlhttp.open('GET', url, true);
		xmlhttp.onreadystatechange = function() { //these are the requests for division pages
			if (this.readyState==4) 
			{			
				if (this.status==200) 
				{
					// -----------------------------------
					// EXAMPLE OF PLAYER'S DIVISION ROW:
					// -----------------------------------
					// <tr class="row2" id="current-rank">
					// 	<td class="align-center" style="width: 15px;" data-tooltip="Joined Division: 5/21/2011">
					// 		<img src="/sc2/static/images/icons/ladder/exclamation.gif" alt="" />
					// 	</td>
					// 	<td class="align-center" style="width: 40px;">3rd</td>
					// 	<td>
					// 		<a href="/sc2/en/profile/537033/1/RitsuTainaka/" class="race-zerg" data-tooltip="#player-info-537033">
					// 			RitsuTainaka
					// 		</a>
					// 		<div id="player-info-537033" style="display: none;">
					// 			<div class="tooltip-title">RitsuTainaka</div>
					// 			<strong>Previous Rank:</strong> 0<br />
					// 			<strong>Favorite Race:</strong> Zerg
					// 		</div>
					// 	</td>
					// 	<td>
					// 		<a href="/sc2/en/profile/1063655/1/superpooper/" class="race-random" data-tooltip="#player-info-1063655">
					// 			superpooper
					// 		</a>
					// 		<div id="player-info-1063655" style="display: none;">
					// 			<div class="tooltip-title">superpooper</div>
					// 			<strong>Previous Rank:</strong> 0<br />
					// 			<strong>Favorite Race:</strong> Random
					// 		</div>
					// 	</td>
					// 	<td class="align-center">146</td>
					// 	<td class="align-center">9</td>
					// 	<td class="align-center">6</td>    <!-- Only for Masters and Grandmaster -->
					// </tr>					
					// -----------------------------------
					var row_pattern = /id="current-rank(.|\s)*?\/tr>/im;
					var row_matches = this.responseText.match(row_pattern);
					if (row_matches == null) {
						// User not found in division. This could happen if profile shows Grandmaster but player has actually been kicked out of Grandmaster.
						var tdStatus = '<td class="align-center" style="width: 15px;">' + "\n\t";
						tdStatus += ' -- ' + "\n";
						tdStatus += '</td>';
						var t = '<a href="' + FR.dataBase[this.fid].urlprofile + '" style="padding: 1px 0 2px 2px;">' + "\n\t";
						t += FR.dataBase[this.fid].name + "\n";
						t += '</a>';
						var team = [t];  // This needs to be an array
						FR.dataBase[this.fid].tdStatus = tdStatus;
						FR.dataBase[this.fid].team = team;
						console.log('user not found in division. name: ' + FR.dataBase[this.fid].name + ' url = ' + url);
						
						/*FR.dataBase[this.fid].tdStatus = '';
						FR.dataBase[this.fid].rank = '';
						FR.dataBase[this.fid].points = '';
						FR.dataBase[this.fid].apoints = '';
						FR.dataBase[this.fid].win = '';
						FR.dataBase[this.fid].loss = '';
						FR.dataBase[this.fid].bonus = '';
						FR.dataBase[this.fid].team = '';		
						FR.dataBase[this.fid].league = '';
						FR.dataBase[this.fid].divisionname = '';*/
						FR.dataBase[this.fid].league = 'wood';
						FR.dataBase[this.fid].urldivision = '';
						//divisions++;
						
						FDTM.updateStatus('rlinks', this.fid, 4); //mark this person as completed - nothing we can do, he's not on blizzard division page
						FD.ranksThread(this.callback, showOwnDivision);
						
						//FDTM.updateStatus('rlinks', this.fid, 0); //mark this person as brand new
						//FD.rlinksThread(this.callback, showOwnDivision);
						return;
					}
					var team_pattern = /<td>(.|\s)*?\/td>/gim;
					var team_matches = row_matches[0].match(team_pattern);
					var info_pattern = /<td class="align(.|\s)*?\/td>/gim;
					var info_matches = row_matches[0].match(info_pattern);

					if (team_matches == null || info_matches == null || info_matches.length < 4) {
						// This should never happen, but just to be safe...
						console.log('error: ranksthread no team found');
						FDTM.updateStatus('rlinks', this.fid, 4);
						FR.dataBase[this.fid].league = 'wood';
						FD.ranksThread(this.callback, showOwnDivision);
						return;
					}
					var tdStatus = info_matches[0];
					var rank = info_matches[1].substring(info_matches[1].indexOf('>') + 1, info_matches[1].indexOf('</td>')).trim();
					var points = info_matches[2].substring(info_matches[2].indexOf('>') + 1, info_matches[2].indexOf('</td>')).trim();
					var win = info_matches[3].substring(info_matches[3].indexOf('>') + 1, info_matches[3].indexOf('</td>')).trim();
					var loss = (info_matches.length > 4) ? info_matches[4].substring(info_matches[4].indexOf('>') + 1, info_matches[4].indexOf('</td>')).trim() : '';
					var team = [];
					for (var i = 0; i < team_matches.length; i++) 
					{
						team.push(team_matches[i].substring(team_matches[i].indexOf('>') + 1, team_matches[i].indexOf('</td>')).trim());
					}
					// -----------------------------------
					// EXAMPLE OF BONUS POOL SPAN:
					// -----------------------------------
					// <span id="bonus-pool">Bonus Pool: <span>659</span></span>
					// -----------------------------------
					var bonus_pattern = /id="bonus-pool".*<span>(\d*)<\/span>/im;
					var bonus_matches = this.responseText.match(bonus_pattern);
					var bonus = bonus_matches ? bonus_matches[1] : 'Unknown';
					
					// Total bonus pool is based on number of players on team, not type.  A random 3v3 division will have the same bonus pool as a 1v1.
					//var apoints = team.length == 1 ? parseInt(points) - (BP.bonus1 - parseInt(bonus)) :
				    //          team.length == 2 ? parseInt(points) - (BP.bonus2 - parseInt(bonus)) :
				    //          team.length == 3 ? parseInt(points) - (BP.bonus3 - parseInt(bonus)) :
				    //          team.length == 4 ? parseInt(points) - (BP.bonus4 - parseInt(bonus)) : '';
					
					totalBonusPool = FR.regionBonusPool(FR.dataBase[this.fid].region);				
					var apoints = parseInt(points) - (totalBonusPool - parseInt(bonus));
					
					league_pattern = /badge-([^\s\d\-]+)["\s]/i;
					var league_matches = this.responseText.match(league_pattern);
					var thisleague = league_matches[1];
					
					//<div xmlns="http://www.w3.org/1999/xhtml" class="data-label">
					//<h3>
					//						6 ?p <span>-</span> 
					//
					//1v1 ???
					//
					//<span>?? ?? v</span>                //final sign means division
					//</h3>
					//</div>
					
					var division_pattern = /\sclass="data-label">((.|\n|\r)*?)<\/h3/ig;
					var division_matches = this.responseText.match(division_pattern);
					var division_pattern2 = /<span>(.*)</ig;
					var division_matches2 = division_matches[0].match(division_pattern2);
					
					if (division_matches2[1] == null)
						var divisionName = 'Grandmaster'; //grandmaster league has no assigned division name
					else
					{
						var divisionName = division_matches2[1].toString();
						if (myRegion == 'kr') //remove korean sign for 'division' at end of name
							divisionName = divisionName.substr(6, divisionName.length - 8);
						else //remove the word 'division' at beginning
							divisionName = divisionName.substr(15, divisionName.length - 16);
					}
									
					FR.dataBase[this.fid].tdStatus = tdStatus;
					FR.dataBase[this.fid].rank = rank;
					FR.dataBase[this.fid].points = points;
					FR.dataBase[this.fid].apoints = apoints;
					FR.dataBase[this.fid].win = win;
					FR.dataBase[this.fid].loss = loss;
					FR.dataBase[this.fid].bonus = bonus;
					FR.dataBase[this.fid].team = team;		
					FR.dataBase[this.fid].league = thisleague;
					FR.dataBase[this.fid].divisionname = divisionName;
					FDTM.updateStatus('rlinks', this.fid, 4); //mark this person as completed
					FD.ranksThread(this.callback, showOwnDivision);
					return;
				} 
				else if (this.status==404)
				{
					//user changed division since last time.
					//reset his info and query his profile page by calling rlinksthread.
					console.log(FR.dataBase[this.fid].name + ' division page 404. Incorrect player name?');
					FR.dataBase[this.fid].league = 'wood';
					FR.dataBase[this.fid].urldivision = '';
					FDTM.updateStatus('rlinks', this.fid, 4); //mark this person as completed
					FD.ranksThread(this.callback, showOwnDivision);
					return;
					/*console.log('ranksthread 404 status. resetting ' + FR.dataBase[this.fid].name + ' data.');
					FR.dataBase[this.fid].tdStatus = '';
					FR.dataBase[this.fid].rank = '';
					FR.dataBase[this.fid].points = '';
					FR.dataBase[this.fid].apoints = '';
					FR.dataBase[this.fid].win = '';
					FR.dataBase[this.fid].loss = '';
					FR.dataBase[this.fid].bonus = '';
					FR.dataBase[this.fid].team = '';		
					FR.dataBase[this.fid].league = '';
					FR.dataBase[this.fid].divisionname = '';
					FR.dataBase[this.fid].urldivision = '';
					divisions++;//for progress display
					
					FDTM.updateStatus('rlinks', this.fid, 0); //mark this person as brand new
					FD.rlinksThread(this.callback, showOwnDivision);
					return;*/
				}
				else if (this.status==500)
				{
					divisions++;//for progress display
					FDTM.updateStatus('rlinks', this.fid, 2); //mark this person as still needing to be queried
					FD.ranksThread(this.callback, showOwnDivision);
					return;
				}
				else
				{
					console.log('division fetch - unnknown status: ' + this.status);
					divisions++;//for progress display
					FDTM.updateStatus('rlinks', this.fid, 2); //mark this person as still needing to be queried
					FD.ranksThread(this.callback, showOwnDivision);
					return;
				}
			}
		}
		xmlhttp.send(null);
		return;
	}
	
	// Get league and ladder points of all friends.
	FD.getRanks = function(callback, showOwnDivision) {
		var callback = typeof callback != 'undefined' ? callback : '';
		
		// Lock FD.matches
		FD.ranksLocked = true;

		// Launch AJAX threads
		
		var min = FDTM.maxThreads;
		if (min > matchesCounter - 4)
			min = matchesCounter - 4;
		if (min < 1)
			min = 1;
		//for (var i = 0; i < FDTM.maxThreads; i++) {
		for (var i = 0; i < min; i++) {
			setTimeout(function() {FD.ranksThread(callback, showOwnDivision)}, i*800);
		}
		
		return;
	}

});



/**
 * Friends Match History Object
 */
contentEval(function() {
	FMH.data = [];
	
	FMH.prepareData = function() {
		if (FMH.data.length > 0) {
			// FHM.data has already been created, no need to re-create it.
			return;
		}
		for (var i = 0; i < FD.matches.length; i++) {
			var real = false;
			var player = '<a href="' + FD.list[FD.matches[i].fid].url + 'matches">';
			player += FD.list[FD.matches[i].fid].pname;
			player += '</a>';
			if (FD.list[FD.matches[i].fid].rname != '') {
				player += '<br/><span style="font-size:0.9em;">(' + FD.list[FD.matches[i].fid].rname + ')</span>';
				real = true;
			}
			var map = FD.matches[i].map;
			var type = FD.matches[i].type;
			var outcome = '';
			if (FD.matches[i].result == 'win') {
				outcome = '<span class="match-win">' + Lex.resultWin + '</span>';
			}
			else if (FD.matches[i].result == 'bailer') {
				outcome = '<span class="match-bailer">' + Lex.resultLeft + '</span>';
			}
			else if (FD.matches[i].result == 'watcher') {
				outcome = '<span class="match-watcher">' + Lex.resultObs + '</span>';
			}
			else {
				outcome = '<span class="match-loss">' + Lex.resultLoss + '</span>';
			}			
			if (parseInt(FD.matches[i].points) > 0) {
				outcome += ' (<span class="text-green">' + FD.matches[i].points + ')</span>';
			}
			else if (parseInt(FD.matches[i].points) < 0) {
				outcome += ' (<span class="text-red">' + FD.matches[i].points + ')</span>';
			}
			else {
				outcome += '';
			}
			var date = FD.matches[i].date;
			
			// Used for sorting
			var sdate = FD.matches[i].sdate;
			var pname = FD.list[FD.matches[i].fid].pname;
			
			FMH.data.push({player:player, map:map, type:type, outcome:outcome, date:date, sdate:sdate, real:real, pname:pname});
		}
		
		FMH.data.sort(Common.sortBySdate);
	}
	
	FMH.displayData = function() {
		var table = document.getElementById('FMH-table');
		Common.clearTable(table);
		document.getElementById('fmh-options').setAttribute('style', 'padding:6px 12px; visibility:hidden');
		
		// Create header row
		var thead = table.createTHead()
		var tr = thead.insertRow(-1);
		var th1 = tr.insertCell(-1);
		var th2 = tr.insertCell(-1);
		var th3 = tr.insertCell(-1);
		var th4 = tr.insertCell(-1);
		var th5 = tr.insertCell(-1);

		th1.innerHTML = Lex.headerPlayer;
		th1.setAttribute('style', 'color: #C1FFFF; padding: 14px 14px 14px 32px; width: 140px;');
		th2.innerHTML = Lex.headerMap;
		th2.setAttribute('style', 'color: #C1FFFF; padding: 14px; width: 150px;');
		th3.innerHTML = Lex.headerType;
		th3.setAttribute('class', 'align-center');
		th3.setAttribute('style', 'color: #C1FFFF; padding: 14px; width: 100px;');
		th4.innerHTML = Lex.headerOutcome;
		th4.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th5.innerHTML = Lex.headerDate;
		th5.setAttribute('style', 'color: #C1FFFF; padding: 14px 28px 14px 14px;');
		th5.setAttribute('class', 'align-right');

		for (var i = 0; i < FMH.data.length; i++) {
			var tr = table.insertRow(-1);
			var trc1 = FMH.data[i].real ? 'fmh-real' : 'fmh-fake';
			var trc2 = Common.inArray(FMH.data[i].type, Lex.ladderTypes) ? 'fmh-ladder' : 'fmh-custom';
			tr.setAttribute('class', 'match-row ' + trc1 + ' ' + trc2);
			tr.setAttribute('onmouseover', 'javascript:this.setAttribute("style", "background:#000a19")');
			tr.setAttribute('onmouseout', 'javascript:this.setAttribute("style", "")');
			var td1 = tr.insertCell(-1);
			var td2 = tr.insertCell(-1);
			var td3 = tr.insertCell(-1);
			var td4 = tr.insertCell(-1);
			var td5 = tr.insertCell(-1);
			td1.innerHTML = FMH.data[i].player;
			td1.setAttribute('style', 'padding: 4px 10px 4px 32px;');
			td2.innerHTML = FMH.data[i].map;
			td3.innerHTML = FMH.data[i].type;
			td3.setAttribute('class', 'align-center');
			td4.innerHTML = FMH.data[i].outcome;
			td5.innerHTML = FMH.data[i].date;
			td5.setAttribute('class', 'align-right');
			td5.setAttribute('style', 'padding-right:28px;');
		}
		
		document.getElementById('fmh-options').setAttribute('style', 'padding:6px 12px; visibility:visible');
		return;
	}
	
	FMH.filter = function(option) {
		var option = typeof option != 'undefined' ? option : '';

		// Get current state
		var optionPlayer = document.getElementById('fmh-option-filter-player').innerHTML;
		var optionType = document.getElementById('fmh-option-filter-type').innerHTML;
		var hidePlayer = false;
		var hideType = false;
		
		// Determine hide/show rules
		if (option == 'player') {
			hidePlayer = (optionPlayer == Lex.filterPlayerAll) ? false : true;
			hideType = (optionType == Lex.filterTypeAll) ? true : false;
		}
		else if (option == 'type') {
			hidePlayer = (optionPlayer == Lex.filterPlayerAll) ? true : false;
			hideType = (optionType == Lex.filterTypeAll) ? false : true;
		}
		else {
			hidePlayer = (optionPlayer == Lex.filterPlayerAll) ? true : false;
			hideType = (optionType == Lex.filterTypeAll) ? true : false;
		}
		
		// Manipulate table
		var trs = document.getElementsByClassName('match-row');
		if (trs == null) {
			return;
		}
		for (var i = 0; i < trs.length; i++) {
			if (trs[i].getAttribute('class').indexOf('fmh-fake') >= 0 && hidePlayer) {
				trs[i].setAttribute('style', 'display:none');
			}
			else if (trs[i].getAttribute('class').indexOf('fmh-custom') >= 0 && hideType) {
				trs[i].setAttribute('style', 'display:none');
			}
			else {
				trs[i].setAttribute('style', '');
			}
		}		

		// Update filter links
		if (option == 'player') {
			document.getElementById('fmh-option-filter-player').innerHTML = optionPlayer == Lex.filterPlayerAll ? Lex.filterPlayerSome : Lex.filterPlayerAll;
		}
		else if (option == 'type') {
			document.getElementById('fmh-option-filter-type').innerHTML = optionType == Lex.filterTypeAll ? Lex.filterTypeSome : Lex.filterTypeAll;
		}

		return;
	}
	
	FMH.sortBy = function(by) {
		document.getElementById('FMH-table').setAttribute('style', 'opacity:0.4;filter:alpha(opacity=40)');
		setTimeout(function() {
			if      (by == 'player') FMH.data.sort(Common.sortByPlayer);
			else if (by == 'date')   FMH.data.sort(Common.sortBySdate);
			FMH.displayData(); 
			FMH.filter();
			document.getElementById('FMH-table').setAttribute('style', 'opacity:1.0;filter:alpha(opacity=100)');
		}, 500);
		return;
	}
		
	FMH.launch = function() {
		if (FD.isLocked()) {
			return;
		}
		var lis = document.getElementById('profile-menu').getElementsByTagName('li');
		Common.makeActive(Lex.buttonFMH, lis);
		
		var divProfileRight = document.getElementById('profile-right');
		divProfileRight.innerHTML = '';
		
		var divMatchHistory = document.createElement('div');
		divMatchHistory.setAttribute('id', 'match-history');
		
		var divDataTitle = document.createElement('div');
		divDataTitle.setAttribute('class', 'data-title');
		
		var divDataLabel = document.createElement('div');
		divDataLabel.setAttribute('class', 'data-label');
		
		var divDataLabelH3 = document.createElement('h3');
		divDataLabelH3.setAttribute('class', 'title-friends');
		divDataLabelH3.innerHTML = Lex.tableFMH;

		var divDataOptions = document.createElement('div');
		divDataOptions.setAttribute('class', 'data-options');
		divDataOptions.setAttribute('id', 'fmh-options');
		divDataOptions.setAttribute('style', 'padding:6px 12px; visibility:hidden');
		divDataOptions.innerHTML = '<a id="fmh-option-filter-player" style="font-size:0.9em; padding:2px 6px;" href="javascript:void(0);" onclick="FMH.filter(\'player\');">' + Lex.filterPlayerSome + '</a> | ';
		divDataOptions.innerHTML += '<a id="fmh-option-filter-type" style="font-size:0.9em; padding:2px 6px;" href="javascript:void(0);" onclick="FMH.filter(\'type\');">' + Lex.filterTypeSome + '</a> | ';
		divDataOptions.innerHTML += '<a id="fmh-option-sort-player" style="font-size:0.9em; padding:2px 6px;" href="javascript:void(0);" onclick="FMH.sortBy(\'player\');">' + Lex.sortByPlayer + '</a> |';
		divDataOptions.innerHTML += '<a id="fmh-option-sort-date" style="font-size:0.9em; padding:2px 6px;" href="javascript:void(0);" onclick="FMH.sortBy(\'date\');">' + Lex.sortByDate + '</a>';
		
		divDataLabel.appendChild(divDataLabelH3);
		divDataLabel.appendChild(divDataLabelH3);
		divDataTitle.appendChild(divDataOptions);
		divDataTitle.appendChild(divDataLabel);

		var tableDataTable = document.createElement('table');
		tableDataTable.setAttribute('class', 'data-table');
		tableDataTable.setAttribute('id', 'FMH-table');
		
		var trSpacer = tableDataTable.insertRow(-1);
		var tdSpacer = trSpacer.insertCell(-1);
		tdSpacer.setAttribute('align', 'left');
		tdSpacer.setAttribute('style', 'padding: 14px 14px 14px 32px;');
		tdSpacer.innerHTML = Lex.statusGetFriends;
		tdSpacer.innerHTML += ' <span id="fmh-progress" style="color: #C1FFFF;"> </span>';
		
		divMatchHistory.appendChild(divDataTitle);
		divMatchHistory.appendChild(tableDataTable);
				
		divProfileRight.appendChild(divMatchHistory);
		
		setTimeout(function() { FD.getList('FMH'); }, 100);
		return;
	}	
});

/**
 * Friends Match History Stats Object
 */
contentEval(function() {
	FMHS.data = [];
	
	FMHS.prepareData = function() {
		if (FMHS.data.length > 0) {
			// FHMS.data has already been created, no need to re-create it.
			return;
		}
		
		// Populate hash
		for (var i = 0; i < FD.matches.length; i++) {
			// FD.matches.push({fid:FD.matchesThreadIndex3, map:map, type:type, result:result, points:points, date:date, sdate:sdate});
			
			// Find index of FMHS.data
			var found = false;
			for (j = 0; j < FMHS.data.length; j++) {
				if ((FMHS.data[j].fid == FD.matches[i].fid) &&  (FMHS.data[j].type == FD.matches[i].type)) {
					found = true;
					break;
				}
			}
			if (found === false) {
				// Insert new entry
				if (FD.matches[i].result == 'win') {
					var win = 1;
					var loss = 0;
					var other = 0;
					var pwon = parseInt(FD.matches[i].points);
					var plost = 0;
				}
				else if (FD.matches[i].result == 'loss') {
					win = 0;
					loss = 1;
					other = 0;
					pwon = 0;
					plost = parseInt(FD.matches[i].points);
				}
				else {
					win = 0;
					loss = 0;
					other = 1;
					pwon = 0;
					plost = 0;
				}
				var f = FD.matches[i].fid;
				FMHS.data.push({fid:f, pname:FD.list[f].pname, rname:FD.list[f].rname, url:FD.list[f].url, type:FD.matches[i].type, win:win, loss:loss, other:other, pwon:pwon, plost:plost});				
			}
			else {
				// Update existing entry
				if (FD.matches[i].result == 'win') {
					FMHS.data[j].win++;
					FMHS.data[j].pwon += parseInt(FD.matches[i].points);
				}
				else if (FD.matches[i].result == 'loss') {
					FMHS.data[j].loss++;
					FMHS.data[j].plost += parseInt(FD.matches[i].points);
				}
				else {
					FMHS.data[j].other++;
				}
			}
		}
		
		// Sort hash
		/*FMHS.data.sort(Common.sortByPlayer);
		FMHS.data.sort(Common.sortByMostPlayed);
		FMHS.data.sort(Common.sortByPointsDiff);
		FMHS.data.sort(Common.sortByWinDiff);
		FMHS.data.sort(Common.sortByWinRatio);*/
	}

	FMHS.displayData = function() {
		// Clear table
		var table = document.getElementById('FMHS-table');
		Common.clearTable(table);
		document.getElementById('fmhs-options').setAttribute('style', 'padding:6px 12px; visibility:hidden');
		
		// Create header row
		var thead = table.createTHead()
		var tr = thead.insertRow(-1);
		var th1 = tr.insertCell(-1);
		var th2 = tr.insertCell(-1);
		var th3 = tr.insertCell(-1);
		var th4 = tr.insertCell(-1);
		var th5 = tr.insertCell(-1);
		var th6 = tr.insertCell(-1);

		th1.innerHTML = Lex.headerPlayer;
		th1.setAttribute('style', 'color: #C1FFFF; padding: 14px 14px 14px 24px; width: 120px;');
		th2.innerHTML = Lex.headerType;
		th2.setAttribute('class', 'align-center');
		th2.setAttribute('style', 'color: #C1FFFF; padding: 14px; width: 100px;');
		th3.innerHTML = Lex.headerWins;
		th3.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th4.innerHTML = Lex.headerLosses;
		th4.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th5.innerHTML = Lex.headerNetTotal;
		th5.setAttribute('style', 'color: #C1FFFF; padding: 14px 14px 14px 32px;');
		th5.setAttribute('class', 'align-left');
		th6.innerHTML = Lex.headerWinPercent;
		th6.setAttribute('style', 'color: #C1FFFF; padding: 14px 28px 14px 14px;');
		th6.setAttribute('class', 'align-right');

		// Add data rows
		for (var i = 0; i < FMHS.data.length; i++) {
			var tr = table.insertRow(-1);
			var trc1 = FMHS.data[i].rname ? 'fmhs-real' : 'fmhs-fake';
			var trc2 = Common.inArray(FMHS.data[i].type, Lex.ladderTypes) ? 'fmhs-ladder' : 'fmhs-custom';
			tr.setAttribute('class', 'match-row ' + trc1 + ' ' + trc2);
			tr.setAttribute('onmouseover', 'javascript:this.setAttribute("style", "background:#000a19")');
			tr.setAttribute('onmouseout', 'javascript:this.setAttribute("style", "")');
			var td1 = tr.insertCell(-1);
			var td2 = tr.insertCell(-1);
			var td3 = tr.insertCell(-1);
			var td4 = tr.insertCell(-1);
			var td5 = tr.insertCell(-1);
			var td6 = tr.insertCell(-1);
			
			var player = '<a href="' + FMHS.data[i].url + 'matches">' + FMHS.data[i].pname + '</a>';
			if (FMHS.data[i].rname) {
				player += '<br/><span style="font-size:0.9em;">(' + FMHS.data[i].rname + ')</span>';
			}
			
			td1.innerHTML = player;
			td1.setAttribute('style', 'padding: 4px 10px 4px 24px;');
			//td2.innerHTML = FMHS.data[i].type;
			td2.innerHTML = i;
			td2.setAttribute('class', 'align-center');
			td3.innerHTML = '<span class="match-win">' + FMHS.data[i].win + '</span> (<span class="text-green">+' + FMHS.data[i].pwon + '</span>)';
			td4.innerHTML = '<span class="match-loss">' + FMHS.data[i].loss + '</span> (<span class="text-red">' + FMHS.data[i].plost + '</span>)';

			var netGames = FMHS.data[i].win - FMHS.data[i].loss;
			var netPoints = FMHS.data[i].pwon + FMHS.data[i].plost;
			
			if      (netGames > 0) games = '<span class="text-green">+' + netGames + '</span>';
			else if (netGames < 0) games = '<span class="text-red">' + netGames + '</span>';
			else                   games = netGames;
			
			if      (netPoints > 0) points = '<span class="text-green">+' + netPoints + '</span>';
			else if (netPoints < 0) points = '<span class="text-red">' + netPoints + '</span>';
			else                    points = netPoints;

			td5.innerHTML = games + ' (' + points + ')';
			td5.setAttribute('class', 'align-left');
			td5.setAttribute('style', 'padding-left:32px;');

			var ratio = (FMHS.data[i].win + FMHS.data[i].loss) > 0 ? Math.round( FMHS.data[i].win / (FMHS.data[i].win + FMHS.data[i].loss) * 100) : 0;

			td6.innerHTML = ratio + '%';
			td6.setAttribute('class', 'align-right');
			td6.setAttribute('style', 'padding-right:28px;');
		}

		document.getElementById('fmhs-options').setAttribute('style', 'padding:6px 12px; visibility:visible');
		return;
	}

	FMHS.filter = function(option) {
		var option = typeof option != 'undefined' ? option : '';

		// Get current state
		var optionPlayer = document.getElementById('fmhs-option-filter-player').innerHTML;
		var optionType = document.getElementById('fmhs-option-filter-type').innerHTML;
		var hidePlayer = false;
		var hideType = false;
		
		// Determine hide/show rules
		if (option == 'player') {
			hidePlayer = (optionPlayer == Lex.filterPlayerAll) ? false : true;
			hideType = (optionType == Lex.filterTypeAll) ? true : false;
		}
		else if (option == 'type') {
			hidePlayer = (optionPlayer == Lex.filterPlayerAll) ? true : false;
			hideType = (optionType == Lex.filterTypeAll) ? false : true;
		}
		else {
			hidePlayer = (optionPlayer == Lex.filterPlayerAll) ? true : false;
			hideType = (optionType == Lex.filterTypeAll) ? true : false;
		}
		
		// Manipulate table
		var trs = document.getElementsByClassName('match-row');
		if (trs == null) {
			return;
		}
		for (var i = 0; i < trs.length; i++) {
			if (trs[i].getAttribute('class').indexOf('fmhs-fake') >= 0 && hidePlayer) {
				trs[i].setAttribute('style', 'display:none');
			}
			else if (trs[i].getAttribute('class').indexOf('fmhs-custom') >= 0 && hideType) {
				trs[i].setAttribute('style', 'display:none');
			}
			else {
				trs[i].setAttribute('style', '');
			}
		}		

		// Update filter links
		if (option == 'player') {
			document.getElementById('fmhs-option-filter-player').innerHTML = optionPlayer == Lex.filterPlayerAll ? Lex.filterPlayerSome : Lex.filterPlayerAll;
		}
		else if (option == 'type') {
			document.getElementById('fmhs-option-filter-type').innerHTML = optionType == Lex.filterTypeAll ? Lex.filterTypeSome : Lex.filterTypeAll;
		}

		return;
	}

	FMHS.sortBy = function(by) {
		document.getElementById('FMHS-table').setAttribute('style', 'opacity:0.4;filter:alpha(opacity=40)');
		setTimeout(function() {
			if      (by == 'player') FMHS.data.sort(Common.sortByPlayer);
			else if (by == 'type')   FMHS.data.sort(Common.sortByType);
			else if (by == 'wins')   FMHS.data.sort(Common.sortByWinDiff);
			else if (by == 'points') FMHS.data.sort(Common.sortByPointsDiff);
			else if (by == 'ratio')  FMHS.data.sort(Common.sortByWinRatio);
			FMHS.displayData(); 
			FMHS.filter();
			document.getElementById('FMHS-table').setAttribute('style', 'opacity:1.0;filter:alpha(opacity=100)');
		}, 500);
		return;
	}
		
	FMHS.launch = function() {
		if (FD.isLocked()) {
			return;
		}
		var lis = document.getElementById('profile-menu').getElementsByTagName('li');
		Common.makeActive(Lex.buttonFMHS, lis);
		
		var divProfileRight = document.getElementById('profile-right');
		divProfileRight.innerHTML = '';
		
		var divMatchHistory = document.createElement('div');
		divMatchHistory.setAttribute('id', 'match-history');
		
		var divDataTitle = document.createElement('div');
		divDataTitle.setAttribute('class', 'data-title');
		
		var divDataLabel = document.createElement('div');
		divDataLabel.setAttribute('class', 'data-label');
		
		var divDataLabelH3 = document.createElement('h3');
		divDataLabelH3.setAttribute('class', 'title-graph');
		divDataLabelH3.innerHTML = Lex.tableFMHS;

		var divDataOptions = document.createElement('div');
		divDataOptions.setAttribute('class', 'data-options');
		divDataOptions.setAttribute('id', 'fmhs-options');
		divDataOptions.setAttribute('style', 'padding:6px 12px; visibility:hidden');
		divDataOptions.innerHTML = '<a id="fmhs-option-filter-player" style="font-size:0.9em; padding:2px 4px;" href="javascript:void(0);" onclick="FMHS.filter(\'player\');">' + Lex.filterPlayerSome + '</a> | ';
		divDataOptions.innerHTML += '<a id="fmhs-option-filter-type" style="font-size:0.9em; padding:2px 4px;" href="javascript:void(0);" onclick="FMHS.filter(\'type\');">' + Lex.filterTypeSome + '</a> | ';
		divDataOptions.innerHTML += '<a id="fmhs-option-player" style="font-size:0.9em; padding:2px 4px;" href="javascript:void(0);" onclick="FMHS.sortBy(\'player\');">' + Lex.sortByPlayer + '</a> | ';
		divDataOptions.innerHTML += '<a id="fmhs-option-type" style="font-size:0.9em; padding:2px 4px" href="javascript:void(0);" onclick="FMHS.sortBy(\'type\');">' + Lex.sortByType + '</a> | ';
		divDataOptions.innerHTML += '<a id="fmhs-option-wins" style="font-size:0.9em; padding:2px 4px;" href="javascript:void(0);" onclick="FMHS.sortBy(\'wins\');">' + Lex.sortByWins + '</a> | ';
		divDataOptions.innerHTML += '<a id="fmhs-option-points" style="font-size:0.9em; padding:2px 4px;" href="javascript:void(0);" onclick="FMHS.sortBy(\'points\');">' + Lex.sortByPoints + '</a> | ';
		divDataOptions.innerHTML += '<a id="fmhs-option-ratio" style="font-size:0.9em; padding:2px 4px;" href="javascript:void(0);" onclick="FMHS.sortBy(\'ratio\');">' + Lex.sortByRatio + '</a>';
		
		divDataLabel.appendChild(divDataLabelH3);
		divDataLabel.appendChild(divDataLabelH3);
		divDataTitle.appendChild(divDataOptions);
		divDataTitle.appendChild(divDataLabel);

		var tableDataTable = document.createElement('table');
		tableDataTable.setAttribute('class', 'data-table');
		tableDataTable.setAttribute('id', 'FMHS-table');
		
		var trSpacer = tableDataTable.insertRow(-1);
		var tdSpacer = trSpacer.insertCell(-1);
		tdSpacer.setAttribute('align', 'left');
		tdSpacer.setAttribute('style', 'padding: 14px 14px 14px 32px;');
		tdSpacer.innerHTML = Lex.statusGetFriends;
		tdSpacer.innerHTML += ' <span id="fmh-progress" style="color: #C1FFFF;"> </span>';
		
		divMatchHistory.appendChild(divDataTitle);
		divMatchHistory.appendChild(tableDataTable);
				
		divProfileRight.appendChild(divMatchHistory);
		
		setTimeout(function() { FD.getList('FMHS'); }, 100);
		return;
	}	
});


/**
 * Friends Ranks Object
 */
 //var FR = {
contentEval(function() {

	FR.dataBase = [];
	FR.firstRun = true;
	FR.initialized = false;
	FR.dataBaseDisplay = [];
	
	FR.prepareData = function(showOwnDivision) {	
		
		if ((localStorage['historyDataBase'] != null) && (localStorage['historyDataBase'] != 'undefined'))
			var historyDataArr = JSON.parse(localStorage['historyDataBase']);
		else 
			var historyDataArr = [];
		
		FR.dataBaseDisplay = [];
		for (var i = 0; i < FR.dataBase.length; i++) {
			if ((FDTM.rlinks[i] == 9) || (FDTM.rlinks[i] == 8))//dont display users with no data, or from other lists
				continue;	
			if (isNaN(FR.dataBase[i].apoints)){ //sometimes bonuspool 0 becomes NaN. lets fix that
				totalBonusPool = FR.regionBonusPool(FR.dataBase[i].region);
				FR.dataBase[i].apoints = FR.dataBase[i].points - totalBonusPool;
				FR.dataBase[i].bonus = 0;
			}
			if (FR.dataBase[i].league == 'wood')
			{
				FR.dataBase[i].divisionname = 'Not Found';
				FR.dataBase[i].rank = '-';
				FR.dataBase[i].points = -999;
				FR.dataBase[i].apoints = -999;
				FR.dataBase[i].win = 0;
				FR.dataBase[i].loss = 0;
				FR.dataBase[i].bonus = 0;
			}
			if ((!showOwnDivision) && (!(FR.dataBase[i].inUserOwnDivision))) //only add custom list
			{
				FR.dataBaseDisplay.push(FR.dataBase[i]);
				if (FR.dataBase[i].league != 'wood') //only add if we have player data.
					FR.addToHistory(historyDataArr, FR.dataBase[i].name, FR.dataBase[i].apoints, FR.dataBase[i].league, FR.dataBase[i].urlprofile, FR.dataBase[i].urlapi);
			}
			else if ((showOwnDivision) && (FR.dataBase[i].inUserOwnDivision)) //only add division list
				FR.dataBaseDisplay.push(FR.dataBase[i]);				
		}

		storage = [];
		for (var i = 0; i < FR.dataBase.length; i++)
			if ((!FR.dataBase[i].inUserOwnDivision) && ((FR.dataBase[i].league != 'wood') || (FDTM.rlinks[i] == 8)))
				storage.push(FR.dataBase[i]);
		
		localStorage['historyDataBase'] = JSON.stringify(historyDataArr);
		localStorage['dataBase'] = JSON.stringify(storage);
		//localStorage['dataBase'] = JSON.stringify(FR.dataBase);
		
		FR.dataBaseDisplay.sort(Common.sortByAPoints);		
		return;
	}
	
	FR.dateToString = function(date) {
	
		function padStr(i) {
			return (i < 10) ? "0" + i : "" + i;
		}
		
		function padStr2(i) {
			if (i < 10)
				return "00" + i;
			if (i < 100)
				return "0" + i;
			return i;
		}
		
	//YYYY-MM-DDTHH:mm:ss.sssZ
	var month = date.getMonth() + 1;
	var dateStr = 	padStr(date.getFullYear().toString()) + '-' +
					padStr(month.toString()) + '-' +
					padStr(date.getDate().toString()) + 'T' +
					padStr(date.getHours().toString()) + ':' +
					padStr(date.getMinutes().toString()) + ':' +
					padStr(date.getSeconds().toString()) + '.' +
					padStr2(date.getMilliseconds().toString()) + 'Z';	
	return dateStr;
	}

	FR.displayData = function(showOwnDivision) {
		// Global table and summmary info
		var table = document.getElementById('FR-table');
		Common.clearTable(table);
		//document.getElementById('fr-options').setAttribute('style', 'padding:6px 12px; visibility:hidden');

		var stats = {grandmaster:0, master:0, diamond:0, platinum:0, gold:0, silver:0, bronze:0, wood:0};
		for (var i = 0; i < FR.dataBaseDisplay.length; i++)
			stats[FR.dataBaseDisplay[i].league]++;
			
		var tr = table.insertRow(-1);
		//tr.setAttribute('class', 'match-row fr-row-1 fr-row-2 fr-row-3 fr-row-4');
		tr.setAttribute('class', 'match-row fr-row-0');
		var td = tr.insertCell(-1);
		//here14
		totalBonusPool = FR.regionBonusPool(myRegion);
		regionName = FR.regionName(myRegion);
		var summary = 'Total bonus pool this season so far in ' + regionName + ': ' + '<a href="http://sc2ranks.com/api/bonus/pool?appKey=localhost">' + totalBonusPool + '</a>';

		/*summary += '<br /><span style="color:#C1FFFF;">' + stats.grandmaster + '</span> ' + Common.ucfirst(Lex.leagueGrandmaster) + ', ';
		summary += '<span style="color:#C1FFFF;">' + stats.master + '</span> ' + Common.ucfirst(Lex.leagueMaster) + ', ';
		summary += '<span style="color:#C1FFFF;">' + stats.diamond + '</span> ' + Common.ucfirst(Lex.leagueDiamond) + ', ';
		summary += '<span style="color:#C1FFFF;">' + stats.platinum + '</span> ' + Common.ucfirst(Lex.leaguePlatinum) + ', ';
		summary += '<span style="color:#C1FFFF;">' + stats.gold + '</span> ' + Common.ucfirst(Lex.leagueGold) + ', ';
		summary += '<span style="color:#C1FFFF;">' + stats.silver + '</span> ' + Common.ucfirst(Lex.leagueSilver) + ', ';
		summary += '<span style="color:#C1FFFF;">' + stats.bronze + '</span> ' + Common.ucfirst(Lex.leagueBronze);*/
		td.setAttribute('style', 'padding-left:12px;');
		td.innerHTML = summary;
		document.getElementById('fr-options').setAttribute('style', 'padding:6px 12px; visibility:visible');
		
		var positionNumber = 1; //players position in custom division counter
		var min;
		var max;
		var averageArr = [];
		var medianArr = [];
		var average;
		var median;
		
		for (var i = 0; i < leagueNamesArr.length; i++) {

			if (showOwnDivision)
			{
				if (leagueNamesArr[i] != myLeague)
					continue;
			}
			else if (!leaguesArr[leagueNamesArr[i]])
				continue;
			
			var table = document.getElementById('FR-table-' + i);
			Common.clearTable(table);
			//document.getElementById('fr-options').setAttribute('style', 'padding:6px 12px; visibility:hidden');
			
			// Create header row
			var thead = table.createTHead()
			var tr = thead.insertRow(-1);
			//var th1 = tr.insertCell(-1);
			var th9 = tr.insertCell(-1);
			var th2 = tr.insertCell(-1);
			var th25 = tr.insertCell(-1);
			var th3 = tr.insertCell(-1);
			var th4 = tr.insertCell(-1);
			var th5 = tr.insertCell(-1);
			var th6 = tr.insertCell(-1);
			var th65 = tr.insertCell(-1);
			var th7 = tr.insertCell(-1);
			var th8 = tr.insertCell(-1);
			
			//th1.innerHTML = ' ';
			//th1.setAttribute('style', 'width:15px;');
			th9.innerHTML = Lex.headerType;
			th9.setAttribute('style', 'color: #C1FFFF;  width: 20px;');
			th9.setAttribute('class', 'align-center');
			th2.innerHTML = Lex.headerTeam;
			th2.setAttribute('style', 'color: #C1FFFF; padding: 14px 10px 14px 0px; width: 120px;');
			th25.innerHTML = Lex.headerAPoints;
			th25.setAttribute('style', 'color: #C1FFFF; padding: 14px 10px 14px 10px;');
			th25.setAttribute('class', 'align-right');
			th3.innerHTML = Lex.headerPoints;
			th3.setAttribute('style', 'color: #C1FFFF; padding: 14px 10px 14px 10px;');
			th3.setAttribute('class', 'align-right');
			th4.innerHTML = Lex.headerBonus;
			th4.setAttribute('style', 'color: #C1FFFF; padding: 14px 10px 14px 10px;');
			th4.setAttribute('class', 'align-right');
			th5.innerHTML = Lex.headerWins;
			th5.setAttribute('style', 'color: #C1FFFF; padding: 14px 4px 14px 14px;');
			th5.setAttribute('class', 'align-right');
			th6.innerHTML = (i <= 1) ? Lex.headerLosses : '';
			th6.setAttribute('style', 'color: #C1FFFF; padding: 14px 4px 14px 4px; width:40px;');
			th6.setAttribute('class', 'align-right');
			th65.innerHTML = (i <= 1) ? Lex.headerRatio : '';
			th65.setAttribute('style', 'color: #C1FFFF; padding: 14px 14px 14px 4px; width:40px;');
			th65.setAttribute('class', 'align-right');
			th7.innerHTML = Lex.headerDivision;
			th7.setAttribute('style', 'color: #C1FFFF; padding: 14px 10px 14px 10px; width: 130px;');
			th8.innerHTML = Lex.headerRank;
			th8.setAttribute('style', 'color: #C1FFFF; padding: 14px 10px 14px 10px;');
			th8.setAttribute('class', 'align-center');
			
			average = 0;
			var rowCounter=0;

			for (var j = 0; j < FR.dataBaseDisplay.length; j++) {
				if (FR.dataBaseDisplay[j].league != leagueNamesArr[i])
					continue;
				if (FR.dataBaseDisplay[j].region != myRegion)
					continue;
				if ((FR.dataBaseDisplay[j].urlapi != currentCustomDivisionURLAPI) && (!showOwnDivision))
					continue;
				
				rowCounter++;	//for league stats calculations			
				if (rowCounter == 1)
				{
					min = FR.dataBaseDisplay[j].apoints;
					max = FR.dataBaseDisplay[j].apoints;
				}
				else
				{
					if (FR.dataBaseDisplay[j].apoints < min)
						min = FR.dataBaseDisplay[j].apoints;
					if (FR.dataBaseDisplay[j].apoints > max)
						max = FR.dataBaseDisplay[j].apoints;
				}
				averageArr.push(FR.dataBaseDisplay[j].apoints);
				medianArr.push(FR.dataBaseDisplay[j].apoints);
		
				var tr = table.insertRow(-1);
				var trc = 'fr-row-' + FR.dataBaseDisplay[j].type;
				tr.setAttribute('class', 'match-row  fr-row-0 ' + trc);
				tr.setAttribute('onmouseover', 'javascript:this.setAttribute("style", "background:#000a19")');
				tr.setAttribute('onmouseout', 'javascript:this.setAttribute("style", "")');
				//var td1 = tr.insertCell(-1);
				var td9 = tr.insertCell(-1);
				var td2 = tr.insertCell(-1);
				var td25 = tr.insertCell(-1);
				var td3 = tr.insertCell(-1);
				var td4 = tr.insertCell(-1);
				var td5 = tr.insertCell(-1);
				var td6 = tr.insertCell(-1);
				var td65 = tr.insertCell(-1);
				var td7 = tr.insertCell(-1);
				var td8 = tr.insertCell(-1);

				var tooltip_pattern = /tooltip="(.*)"/i;
				var tooltip_matches = FR.dataBaseDisplay[j].tdStatus.match(tooltip_pattern);
				var tooltip = tooltip_matches ? tooltip_matches[1] : '';
				var img_pattern = />\s*(.*)\s*<\/td>/im;
				var img_matches = FR.dataBaseDisplay[j].tdStatus.match(img_pattern);
				var img = img_matches ? img_matches[1] : '';
				
				/*td1.innerHTML = img;
				td1.setAttribute('class', 'align-center');
				td1.setAttribute('style', 'width: 15px;');
				td1.setAttribute('data-tooltip', tooltip);*/

				/*var type = FR.data[j].type == 1 ? Lex.filterType1 : 
				           FR.data[j].type == 2 ? Lex.filterType2 :
				           FR.data[j].type == 3 ? Lex.filterType3 :
				           FR.data[j].type == 4 ? Lex.filterType4 : '';

				td9.innerHTML = type;*/
				td9.innerHTML = positionNumber++;
				td9.setAttribute('class', 'align-right');
				td9.setAttribute('style', 'color: #C1FFFF; padding: 14px 10px 14px 10px;');
			
				//var tempTeam = FR.dataBase[j].team.slice(0);//copy array
				//td2.innerHTML = tempTeam.join('<br/>');
				td2.innerHTML = FR.dataBaseDisplay[j].team;
				td2.setAttribute('style', 'padding: 14px 14px 14px 0px; width: 120px;');

				td25.innerHTML = FR.dataBaseDisplay[j].apoints;
				td25.setAttribute('class', 'align-right');
				//td25.setAttribute('style', 'color: #00E4FF; padding: 14px 10px 14px 10px;');
				td25.setAttribute('style', 'color: #00E4FF; font-weight: bold; padding: 14px 10px 14px 10px;');
				
				td3.innerHTML = FR.dataBaseDisplay[j].points;
				td3.setAttribute('class', 'align-right');
				td3.setAttribute('style', 'color: #C1FFFF; padding: 14px 10px 14px 10px;');
				
				td4.innerHTML = FR.dataBaseDisplay[j].bonus;
				td4.setAttribute('class', 'align-right');
				td4.setAttribute('style', 'padding: 14px 10px 14px 10px;');

				td5.innerHTML = '<span class="text-green">' + FR.dataBaseDisplay[j].win + '</span>';
				td5.setAttribute('class', 'align-right');
				td5.setAttribute('style', 'padding: 14px 4px 14px 14px;');

				td6.innerHTML = (i <= 1) ? '<span class="text-red">' + FR.dataBaseDisplay[j].loss + '</span>' : '';
				td6.setAttribute('class', 'align-right');
				td6.setAttribute('style', 'padding: 14px 4px 14px 4px;');
        
				var ratio = Math.round(parseInt(FR.dataBaseDisplay[j].win) / (parseInt(FR.dataBaseDisplay[j].win) + parseInt(FR.dataBaseDisplay[j].loss)) * 100);
				td65.innerHTML = (i <= 1 && ratio >= 0) ? '' + ratio + '%' : '';
				td65.setAttribute('class', 'align-right');
				td65.setAttribute('style', 'padding: 14px 10px 14px 4px;');

				td7.innerHTML = '<a href="' + FR.dataBaseDisplay[j].urldivision + '">' + FR.dataBaseDisplay[j].divisionname + '</a>';
				td7.setAttribute('style', 'padding: 14px 10px 14px 10px; width: 130px;');
				
				td8.innerHTML = FR.dataBaseDisplay[j].rank;
				td8.setAttribute('style', 'padding: 14px 10px 14px 10px;');
				td8.setAttribute('class', 'align-center');
			}
			//document.getElementById('fr-options-' + i).style.visibility='visible';
			document.getElementById('fr-options-' + i).setAttribute('style', 'padding:6px 12px; visibility:visible');
			
			if (rowCounter > 0)
			{
				for (var k = 0; k < averageArr.length; k++)
					average += averageArr[k];
				average = Math.round(average / averageArr.length);
				averageArr.sort();
				median = averageArr[Math.round(averageArr.length / 2) - 1];
				
				if (showOwnDivision)
				{
				//////////////////////////////////
				var node = document.getElementById('fr-options-' + i);; 
				//node.setAttribute('font-weight', 'bold');
				node.style.fontWeight="800";
				node.style.paddingRight="5.5cm";
				node.style.letterSpacing="0.5px";
				node.style.wordSpacing="6px";
				//node.style.textAlign="center";//"left|right|center|justify|inherit"
				node.innerHTML += 'Min: ' + min + ' Max: ' + max + ' Average: ' + average + ' Median: ' + median;
				//////////////////////////////////
				}
			}		
		}
		document.getElementById('fr-options').setAttribute('style', 'padding:6px 12px; visibility:visible');
		return;
	}

	FR.filterStyle = function(option) {
		for (var i = 0; i <= 4; i++) {
			var e = document.getElementById('fr-option-filter-' + i);
			e.style.backgroundColor = (i == option) ? '#00509a' : '#00213e';
		}
		return;
	}
	
	FR.filter = function(option) {
		var option = typeof option != 'undefined' ? option : 0;

		// Mark active class
		var els = document.getElementById('fr-options').getElementsByTagName('a');
		for (var i = 0; i < els.length; i++) {
			if (i == option) {
				els[i].setAttribute('class', 'active');
			}
			else {
				els[i].setAttribute('class', '');
			}
		}
		
		// Filter rows
		var trs = document.getElementsByClassName('match-row');
		if (trs == null) {
			return;
		}
		for (var i = 0; i < trs.length; i++) {
			if (trs[i].getAttribute('class').indexOf('fr-row-' + option) < 0) {
				trs[i].setAttribute('style', 'display:none');
			}
			else {
				trs[i].setAttribute('style', '');
			}
		}
			
		FR.filterStyle(option);
		return;
	}

	FR.getRegion = function(){
		if (document.URL.toString().indexOf("eu.battle.net") != -1)
			return 'eu';
		else if (document.URL.toString().indexOf("us.battle.net") != -1)
			return 'us';
		else if (document.URL.toString().indexOf("sea.battle.net") != -1)
			return 'sea';
		else if (document.URL.toString().indexOf("kr.battle.net") != -1)
			return 'kr';
		else if (document.URL.toString().indexOf("tw.battle.net") != -1)
			return 'tw';
		else if (document.URL.toString().indexOf("cn.battle.net") != -1)
			return 'cn';
		else
			return 'eu';
	}

	
	FR.regionName = function(myRegion){
		switch (myRegion)
		{
			case 'eu': 
				return 'Europe';
			case 'us': 
				return 'America';
			case 'kr': 
				return 'Korea / Taiwan';
			case 'sea': 
				return 'South East Asia';
			case 'cn': 
				return 'China';
			default: 
				return 'my region';
		}
	}
	
	FR.regionBonusPool = function(myRegion) {
		switch (myRegion)
		{
			case 'eu':
				return bonusPools.eu;
			case 'us':
				return bonusPools.am;
			case 'kr':
				return bonusPools.fea;
			case 'sea':
				return bonusPools.sea;
			case 'cn':
				return bonusPools.cn;
			default:
				return bonusPools.eu;
		}
	}
	
	FR.sortBy = function(by, tid) {
		document.getElementById('match-history').setAttribute('style', 'opacity:0.4;filter:alpha(opacity=40)');
		setTimeout(function() {
			if      (by == 'points')  FR.dataBase.sort(Common.sortByPoints);
			else if (by == 'apoints') FR.dataBase.sort(Common.sortByAPoints);
			else if (by == 'type')    FR.dataBase.sort(Common.sortByType);
			else if (by == 'bonus')   FR.dataBase.sort(Common.sortByBonus);
			else if (by == 'wins')    FR.dataBase.sort(Common.sortByWins);
			else if (by == 'ratio')   FR.dataBase.sort(Common.sortByWinRatio);
			else if (by == 'rank')    FR.dataBase.sort(Common.sortByRank);
			
			// Get current filter state and apply to re-rendered tables
			var els = document.getElementById('fr-options').getElementsByTagName('a');
			var active = 0;
			for (var i = 0; i < els.length; i++) {
				active = els[i].getAttribute('class') ? i : active;
			}
			FR.displayData();
			FR.filter(0);
			document.getElementById('match-history').setAttribute('style', 'opacity:1.0;filter:alpha(opacity=100)');
		}, 500);
		return;
	}
	
	FR.whichBrowser = function () {
	var agt=navigator.userAgent.toLowerCase();
	if (agt.indexOf("opera") != -1) return 'Opera';
	if (agt.indexOf("staroffice") != -1) return 'Star Office';
	if (agt.indexOf("webtv") != -1) return 'WebTV';
	if (agt.indexOf("beonex") != -1) return 'Beonex';
	if (agt.indexOf("chimera") != -1) return 'Chimera';
	if (agt.indexOf("netpositive") != -1) return 'NetPositive';
	if (agt.indexOf("phoenix") != -1) return 'Phoenix';
	if (agt.indexOf("firefox") != -1) return 'Firefox';
	if (agt.indexOf("safari") != -1) return 'Safari';
	if (agt.indexOf("skipstone") != -1) return 'SkipStone';
	if (agt.indexOf("msie") != -1) return 'Internet Explorer';
	if (agt.indexOf("netscape") != -1) return 'Netscape';
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
	if (agt.indexOf('\/') != -1) {
	if (agt.substr(0,agt.indexOf('\/')) != 'mozilla') {
	return navigator.userAgent.substr(0,agt.indexOf('\/'));}
	else return 'Netscape';} else if (agt.indexOf(' ') != -1)
	return navigator.userAgent.substr(0,agt.indexOf(' '));
	else return navigator.userAgent;
	},
	
	
	
	
inheriting={},AmCharts={Class:function(a){var b=function(){arguments[0]!==inheriting&&(this.events={},this.construct.apply(this,arguments))};a.inherits?(b.prototype=new a.inherits(inheriting),b.base=a.inherits.prototype,delete a.inherits):(b.prototype.createEvents=function(){for(var a=0,b=arguments.length;a<b;a++)this.events[arguments[a]]=[]},b.prototype.listenTo=function(a,b,d){a.events[b].push({handler:d,scope:this})},b.prototype.addListener=function(a,b,d){this.events[a].push({handler:b,scope:d})},
b.prototype.removeListener=function(a,b,d){a=a.events[b];for(b=a.length-1;0<=b;b--)a[b].handler===d&&a.splice(b,1)},b.prototype.fire=function(a,b){for(var d=this.events[a],h=0,j=d.length;h<j;h++){var k=d[h];k.handler.call(k.scope,b)}});for(var d in a)b.prototype[d]=a[d];return b},charts:[],addChart:function(a){AmCharts.charts.push(a)},removeChart:function(a){for(var b=AmCharts.charts,d=b.length-1;0<=d;d--)b[d]==a&&b.splice(d,1)}};
document.attachEvent&&(AmCharts.isNN=!1,AmCharts.isIE=!0,AmCharts.dx=0,AmCharts.dy=0);if(document.addEventListener||window.opera)AmCharts.isNN=!0,AmCharts.isIE=!1,AmCharts.dx=0.5,AmCharts.dy=0.5;window.chrome&&(AmCharts.chrome=!0);AmCharts.IEversion=0;-1!=navigator.appVersion.indexOf("MSIE")&&document.documentMode&&(AmCharts.IEversion=document.documentMode);9<=AmCharts.IEversion&&(AmCharts.ddd=0.5);
AmCharts.handleResize=function(){for(var a=AmCharts.charts,b=0;b<a.length;b++){var d=a[b];d&&d.div&&d.handleResize()}};AmCharts.handleMouseUp=function(a){for(var b=AmCharts.charts,d=0;d<b.length;d++){var e=b[d];e&&e.handleReleaseOutside(a)}};AmCharts.handleMouseMove=function(a){for(var b=AmCharts.charts,d=0;d<b.length;d++){var e=b[d];e&&e.handleMouseMove(a)}};AmCharts.resetMouseOver=function(){for(var a=AmCharts.charts,b=0;b<a.length;b++){var d=a[b];if(d)d.mouseIsOver=false}};
AmCharts.onReadyArray=[];AmCharts.ready=function(a){AmCharts.onReadyArray.push(a)};AmCharts.handleLoad=function(){for(var a=AmCharts.onReadyArray,b=0;b<a.length;b++)(0,a[b])()};AmCharts.useUTC=!1;AmCharts.updateRate=40;AmCharts.uid=0;AmCharts.getUniqueId=function(){AmCharts.uid++;return"AmChartsEl-"+AmCharts.uid};
AmCharts.isNN&&(document.addEventListener("mousemove",AmCharts.handleMouseMove,!0),window.addEventListener("resize",AmCharts.handleResize,!0),document.addEventListener("mouseup",AmCharts.handleMouseUp,!0),window.addEventListener("load",AmCharts.handleLoad,!0));AmCharts.isIE&&(document.attachEvent("onmousemove",AmCharts.handleMouseMove),window.attachEvent("onresize",AmCharts.handleResize),document.attachEvent("onmouseup",AmCharts.handleMouseUp),window.attachEvent("onload",AmCharts.handleLoad));AmCharts.AmChart=AmCharts.Class({construct:function(){this.version="2.6.9";AmCharts.addChart(this);this.createEvents("dataUpdated");this.height=this.width="100%";this.dataChanged=!0;this.chartCreated=!1;this.previousWidth=this.previousHeight=0;this.backgroundColor="#FFFFFF";this.borderAlpha=this.backgroundAlpha=0;this.color=this.borderColor="#000000";this.fontFamily="Verdana";this.fontSize=11;this.numberFormatter={precision:-1,decimalSeparator:".",thousandsSeparator:","};this.percentFormatter={precision:2,
decimalSeparator:".",thousandsSeparator:","};this.labels=[];this.allLabels=[];this.titles=[];this.autoMarginOffset=0;var a=document.createElement("div"),b=a.style;b.overflow="hidden";b.position="relative";b.textAlign="left";this.chartDiv=a;a=document.createElement("div");b=a.style;b.overflow="hidden";b.position="relative";this.legendDiv=a;this.balloon=new AmCharts.AmBalloon;this.balloon.chart=this;this.titleHeight=0;this.prefixesOfBigNumbers=[{number:1E3,prefix:"k"},{number:1E6,prefix:"M"},{number:1E9,
prefix:"G"},{number:1E12,prefix:"T"},{number:1E15,prefix:"P"},{number:1E18,prefix:"E"},{number:1.0E21,prefix:"Z"},{number:1.0E24,prefix:"Y"}];this.prefixesOfSmallNumbers=[{number:1.0E-24,prefix:"y"},{number:1.0E-21,prefix:"z"},{number:1.0E-18,prefix:"a"},{number:1.0E-15,prefix:"f"},{number:1.0E-12,prefix:"p"},{number:1.0E-9,prefix:"n"},{number:1.0E-6,prefix:"\u03bc"},{number:0.001,prefix:"m"}];this.panEventsEnabled=!1},drawChart:function(){var a=this.container,b=this.realWidth,d=this.realHeight,e=
this.set,f=AmCharts.polygon(a,[0,b-1,b-1,0],[0,0,d-1,d-1],this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);this.background=f;e.push(f);if(f=this.backgroundImage)this.path&&(f=this.path+f),this.bgImg=a=a.image(f,0,0,b,d),e.push(a);this.redrawLabels();this.drawTitles()},drawTitles:function(){var a=this.titles;if(AmCharts.ifArray(a))for(var b=20,d=0;d<a.length;d++){var e=a[d],f=e.color;void 0==f&&(f=this.color);var g=e.size;isNaN(e.alpha);var h=this.marginLeft,f=AmCharts.text(this.container,
e.text,f,this.fontFamily,g);f.translate(h+(this.divRealWidth-this.marginRight-h)/2,b);h=!0;void 0!=e.bold&&(h=e.bold);h&&f.attr({"font-weight":"bold"});b+=g+6;this.freeLabelsSet.push(f)}},write:function(a){var b=this.balloon;b&&!b.chart&&(b.chart=this);this.listenersAdded||(this.addListeners(),this.listenersAdded=!0);this.div=a="object"!=typeof a?document.getElementById(a):a;a.style.overflow="hidden";var b=this.chartDiv,d=this.legendDiv,e=this.legend,f=d.style,g=b.style;this.measure();if(e)switch(e.position){case "bottom":a.appendChild(b);
a.appendChild(d);break;case "top":a.appendChild(d);a.appendChild(b);break;case "absolute":var h=document.createElement("div");h.style.position="relative";a.appendChild(h);f.position="absolute";g.position="absolute";void 0!=e.left&&(f.left=e.left);void 0!=e.right&&(f.right=e.right);void 0!=e.top&&(f.top=e.top);void 0!=e.bottom&&(f.bottom=e.bottom);h.appendChild(b);h.appendChild(d);break;case "right":f.position="relative";g.position="absolute";a.appendChild(b);a.appendChild(d);break;case "left":f.position=
"relative",g.position="absolute",a.appendChild(b),a.appendChild(d)}else a.appendChild(b);this.initChart()},createLabelsSet:function(){AmCharts.remove(this.labelsSet);this.labelsSet=this.container.set();this.freeLabelsSet.push(this.labelsSet)},initChart:function(){this.divIsFixed=AmCharts.findIfFixed(this.chartDiv);this.previousHeight=this.realHeight;this.previousWidth=this.realWidth;this.destroy();var a=0;if(document.attachEvent&&!window.opera){var a=1,b=this.legend;if(b&&(b=b.position,"right"==b||
"left"==b))a=2}this.mouseMode=a;a=this.container=new AmCharts.AmDraw(this.chartDiv,this.realWidth,this.realHeight);this.set=a.set();this.gridSet=a.set();this.columnSet=a.set();this.graphsSet=a.set();this.trendLinesSet=a.set();this.axesLabelsSet=a.set();this.axesSet=a.set();this.cursorSet=a.set();this.scrollbarsSet=a.set();this.bulletSet=a.set();this.freeLabelsSet=a.set();this.balloonsSet=a.set();this.zoomButtonSet=a.set();this.linkSet=a.set();this.drb();this.renderFix()},measure:function(){var a=
this.div,b=this.chartDiv,d=a.offsetWidth,e=a.offsetHeight,f=this.container;a.clientHeight&&(d=a.clientWidth,e=a.clientHeight);var a=AmCharts.toCoordinate(this.width,d),g=AmCharts.toCoordinate(this.height,e);if(a!=this.previousWidth||g!=this.previousHeight)b.style.width=a+"px",b.style.height=g+"px",f&&f.setSize(a,g),this.balloon.setBounds(2,2,a-2,g);this.realWidth=a;this.realHeight=g;this.divRealWidth=d;this.divRealHeight=e},destroy:function(){this.chartDiv.innerHTML="";this.clearTimeOuts()},clearTimeOuts:function(){var a=
this.timeOuts;if(a)for(var b=0;b<a.length;b++)clearTimeout(a[b]);this.timeOuts=[]},clear:function(){AmCharts.callMethod("clear",[this.chartScrollbar,this.scrollbarV,this.scrollbarH,this.chartCursor]);this.chartCursor=this.scrollbarH=this.scrollbarV=this.chartScrollbar=null;this.clearTimeOuts();this.container&&this.container.remove();AmCharts.removeChart(this)},setMouseCursor:function(a){"auto"==a&&AmCharts.isNN&&(a="default");this.chartDiv.style.cursor=a;this.legendDiv.style.cursor=a},redrawLabels:function(){this.labels=
[];var a=this.allLabels;this.createLabelsSet();for(var b=0;b<a.length;b++)this.drawLabel(a[b])},drawLabel:function(a){if(this.container){var b=a.y,d=a.text,e=a.align,f=a.size,g=a.color,h=a.rotation,j=a.alpha,k=a.bold,l=AmCharts.toCoordinate(a.x,this.realWidth),b=AmCharts.toCoordinate(b,this.realHeight);l||(l=0);b||(b=0);void 0==g&&(g=this.color);isNaN(f)&&(f=this.fontSize);e||(e="start");"left"==e&&(e="start");"right"==e&&(e="end");"center"==e&&(e="middle",h?b=this.realHeight-b+b/2:l=this.realWidth/
2-l);void 0==j&&(j=1);void 0==h&&(h=0);b+=f/2;a=AmCharts.text(this.container,d,g,this.fontFamily,f,e,k,j);a.translate(l,b);0!=h&&a.rotate(h);this.labelsSet.push(a);this.labels.push(a)}},addLabel:function(a,b,d,e,f,g,h,j,k){a={x:a,y:b,text:d,align:e,size:f,color:g,alpha:j,rotation:h,bold:k};this.container&&this.drawLabel(a);this.allLabels.push(a)},clearLabels:function(){for(var a=this.labels,b=a.length-1;0<=b;b--)a[b].remove();this.labels=[];this.allLabels=[]},updateHeight:function(){var a=this.divRealHeight,
b=this.legend;if(b){var d=this.legendDiv.offsetHeight,b=b.position;if("top"==b||"bottom"==b)a-=d,0>a&&(a=0),this.chartDiv.style.height=a+"px"}return a},updateWidth:function(){var a=this.divRealWidth,b=this.divRealHeight,d=this.legend;if(d){var e=this.legendDiv,f=e.offsetWidth,g=e.offsetHeight,e=e.style,h=this.chartDiv.style,d=d.position;if("right"==d||"left"==d)a-=f,0>a&&(a=0),h.width=a+"px","left"==d?h.left=AmCharts.findPosX(this.div)+f+"px":e.left=a+"px",e.top=(b-g)/2+"px"}return a},getTitleHeight:function(){var a=
0,b=this.titles;if(0<b.length)for(var a=15,d=0;d<b.length;d++)a+=b[d].size+6;return a},addTitle:function(a,b,d,e,f){isNaN(b)&&(b=this.fontSize+2);a={text:a,size:b,color:d,alpha:e,bold:f};this.titles.push(a);return a},addListeners:function(){var a=this,b=a.chartDiv;AmCharts.isNN&&(a.panEventsEnabled&&"ontouchstart"in document.documentElement&&(b.addEventListener("touchstart",function(b){a.handleTouchMove.call(a,b)},!0),b.addEventListener("touchmove",function(b){a.handleTouchMove.call(a,b)},!0),b.addEventListener("touchstart",
function(b){a.handleTouchStart.call(a,b)}),b.addEventListener("touchend",function(b){a.handleTouchEnd.call(a,b)})),b.addEventListener("mousedown",function(b){a.handleMouseDown.call(a,b)},!0),b.addEventListener("mouseover",function(b){a.handleMouseOver.call(a,b)},!0),b.addEventListener("mouseout",function(b){a.handleMouseOut.call(a,b)},!0));AmCharts.isIE&&(b.attachEvent("onmousedown",function(b){a.handleMouseDown.call(a,b)}),b.attachEvent("onmouseover",function(b){a.handleMouseOver.call(a,b)}),b.attachEvent("onmouseout",
function(b){a.handleMouseOut.call(a,b)}))},dispDUpd:function(){this.dispatchDataUpdated&&(this.dispatchDataUpdated=!1,this.fire("dataUpdated",{type:"dataUpdated",chart:this}))},drb:function(){var a="m,o,c,.,s,t,r,a,h,c,m,a".split(",").reverse().join(""),b=window.location.hostname.split(".");if(2<=b.length)var d=b[b.length-2]+"."+b[b.length-1];AmCharts.remove(this.bbset);if(d!=a){a+="/?utm_source=swf&utm_medium=demo&utm_campaign=jsDemo";b=AmCharts.rect(this.container,145,20,"#FFFFFF",1);d=AmCharts.text(this.container,
"m,o,c,.,s,t,r,a,h,c,m,a, ,y,b, ,t,r,a,h,c".split(",").reverse().join(""),"#000000","Verdana",11,"start");d.translate(5,8);this.bbset=b=this.container.set([b,d]);this.linkSet.push(b);b.click(function(){window.location.href="http://"+a});for(d=0;d<b.length;d++)b[d].attr({cursor:"pointer"})}},invalidateSize:function(){var a=this;a.measure();var b=a.legend;if((a.realWidth!=a.previousWidth||a.realHeight!=a.previousHeight)&&a.chartCreated){if(b){clearTimeout(a.legendInitTO);var d=setTimeout(function(){b.invalidateSize()},
100);a.timeOuts.push(d);a.legendInitTO=d}clearTimeout(a.initTO);d=setTimeout(function(){a.initChart()},100);a.timeOuts.push(d);a.initTO=d}a.renderFix();b&&b.renderFix()},validateData:function(a){this.chartCreated&&(this.dataChanged=!0,this.initChart(a))},validateNow:function(){this.initChart()},showItem:function(a){a.hidden=!1;this.initChart()},hideItem:function(a){a.hidden=!0;this.initChart()},hideBalloon:function(){var a=this;a.hoverInt=setTimeout(function(){a.hideBalloonReal.call(a)},80)},hideBalloonReal:function(){var a=
this.balloon;a&&a.hide()},showBalloon:function(a,b,d,e,f){var g=this;clearTimeout(g.balloonTO);g.balloonTO=setTimeout(function(){g.showBalloonReal.call(g,a,b,d,e,f)},1)},showBalloonReal:function(a,b,d,e,f){this.handleMouseMove();var g=this.balloon;g.enabled&&(g.followCursor(!1),g.changeColor(b),d||g.setPosition(e,f),g.followCursor(d),a&&g.showBalloon(a))},handleTouchMove:function(a){this.hideBalloon();var b=this.chartDiv;a.touches&&(a=a.touches.item(0),this.mouseX=a.pageX-AmCharts.findPosX(b),this.mouseY=
a.pageY-AmCharts.findPosY(b))},handleMouseOver:function(){AmCharts.resetMouseOver();this.mouseIsOver=!0},handleMouseOut:function(){AmCharts.resetMouseOver();this.mouseIsOver=!1},handleMouseMove:function(a){if(this.mouseIsOver){var b=this.chartDiv;a||(a=window.event);var d,e;if(a){switch(this.mouseMode){case 2:d=a.x-AmCharts.findPosX(b);e=a.y-AmCharts.findPosY(b);break;case 1:d=a.x;e=a.y;break;case 0:this.divIsFixed?(d=a.clientX-AmCharts.findPosX(b),e=a.clientY-AmCharts.findPosY(b)):(d=a.pageX-AmCharts.findPosX(b),
e=a.pageY-AmCharts.findPosY(b))}this.mouseX=d;this.mouseY=e}}},handleTouchStart:function(a){this.handleMouseDown(a)},handleTouchEnd:function(a){AmCharts.resetMouseOver();this.handleReleaseOutside(a)},handleReleaseOutside:function(){},handleMouseDown:function(a){AmCharts.resetMouseOver();this.mouseIsOver=!0;a&&a.preventDefault&&a.preventDefault()},addLegend:function(a){this.legend=a;a.chart=this;a.div=this.legendDiv;var b=this.handleLegendEvent;this.listenTo(a,"showItem",b);this.listenTo(a,"hideItem",
b);this.listenTo(a,"clickMarker",b);this.listenTo(a,"rollOverItem",b);this.listenTo(a,"rollOutItem",b);this.listenTo(a,"rollOverMarker",b);this.listenTo(a,"rollOutMarker",b);this.listenTo(a,"clickLabel",b)},removeLegend:function(){this.legend=void 0},handleResize:function(){(AmCharts.isPercents(this.width)||AmCharts.isPercents(this.height))&&this.invalidateSize();this.renderFix()},renderFix:function(){if(!AmCharts.VML){var a=this.container;a&&a.renderFix()}}});AmCharts.Slice=AmCharts.Class({construct:function(){}});
AmCharts.SerialDataItem=AmCharts.Class({construct:function(){}});AmCharts.GraphDataItem=AmCharts.Class({construct:function(){}});AmCharts.Guide=AmCharts.Class({construct:function(){}});AmCharts.toBoolean=function(a,b){if(void 0==a)return b;switch((""+a).toLowerCase()){case "true":case "yes":case "1":return!0;case "false":case "no":case "0":case null:return!1;default:return Boolean(a)}};AmCharts.removeFromArray=function(a,b){for(var d=a.length-1;0<=d;d--)a[d]==b&&a.splice(d,1)};AmCharts.formatMilliseconds=function(a,b){if(-1!=a.indexOf("fff")){var d=b.getMilliseconds(),e=""+d;10>d&&(e="00"+d);10<=d&&100>d&&(e="0"+d);a=a.replace(/fff/g,e)}return a};
AmCharts.ifArray=function(a){return a&&0<a.length?!0:!1};AmCharts.callMethod=function(a,b){for(var d=0;d<b.length;d++){var e=b[d];if(e){if(e[a])e[a]();var f=e.length;if(0<f)for(var g=0;g<f;g++){var h=e[g];if(h&&h[a])h[a]()}}}};AmCharts.toNumber=function(a){return"number"==typeof a?a:Number((""+a).replace(/[^0-9\-.]+/g,""))};
AmCharts.toColor=function(a){if(""!=a&&void 0!=a)if(-1!=a.indexOf(","))for(var a=a.split(","),b=0;b<a.length;b++){var d=a[b].substring(a[b].length-6,a[b].length);a[b]="#"+d}else a=a.substring(a.length-6,a.length),a="#"+a;return a};AmCharts.toCoordinate=function(a,b,d){var e;void 0!=a&&(a=a.toString(),d&&d<b&&(b=d),e=Number(a),-1!=a.indexOf("!")&&(e=b-Number(a.substr(1))),-1!=a.indexOf("%")&&(e=b*Number(a.substr(0,a.length-1))/100));return e};
AmCharts.fitToBounds=function(a,b,d){a<b&&(a=b);a>d&&(a=d);return a};AmCharts.isDefined=function(a){return void 0==a?!1:!0};AmCharts.stripNumbers=function(a){return a.replace(/[0-9]+/g,"")};AmCharts.extractPeriod=function(a){var b=AmCharts.stripNumbers(a),d=1;b!=a&&(d=Number(a.slice(0,a.indexOf(b))));return{period:b,count:d}};
AmCharts.resetDateToMin=function(a,b,d,e){void 0==e&&(e=1);var f=a.getFullYear(),g=a.getMonth(),h=a.getDate(),j=a.getHours(),k=a.getMinutes(),l=a.getSeconds(),m=a.getMilliseconds(),a=a.getDay();switch(b){case "YYYY":f=Math.floor(f/d)*d;g=0;h=1;m=l=k=j=0;break;case "MM":g=Math.floor(g/d)*d;h=1;m=l=k=j=0;break;case "WW":0==a&&0<e&&(a=7);h=h-a+e;m=l=k=j=0;break;case "DD":h=Math.floor(h/d)*d;m=l=k=j=0;break;case "hh":j=Math.floor(j/d)*d;m=l=k=0;break;case "mm":k=Math.floor(k/d)*d;m=l=0;break;case "ss":l=
Math.floor(l/d)*d;m=0;break;case "fff":m=Math.floor(m/d)*d}return a=new Date(f,g,h,j,k,l,m)};AmCharts.getPeriodDuration=function(a,b){void 0==b&&(b=1);var d;switch(a){case "YYYY":d=316224E5;break;case "MM":d=26784E5;break;case "WW":d=6048E5;break;case "DD":d=864E5;break;case "hh":d=36E5;break;case "mm":d=6E4;break;case "ss":d=1E3;break;case "fff":d=1}return d*b};AmCharts.roundTo=function(a,b){if(0>b)return a;var d=Math.pow(10,b);return Math.round(a*d)/d};
AmCharts.intervals={s:{nextInterval:"ss",contains:1E3},ss:{nextInterval:"mm",contains:60,count:0},mm:{nextInterval:"hh",contains:60,count:1},hh:{nextInterval:"DD",contains:24,count:2},DD:{nextInterval:"",contains:Infinity,count:3}};AmCharts.getMaxInterval=function(a,b){var d=AmCharts.intervals;return a>=d[b].contains?(a=Math.round(a/d[b].contains),b=d[b].nextInterval,AmCharts.getMaxInterval(a,b)):"ss"==b?d[b].nextInterval:b};
AmCharts.formatDuration=function(a,b,d,e,f,g){var h=AmCharts.intervals,j=g.decimalSeparator;if(a>=h[b].contains){var k=a-Math.floor(a/h[b].contains)*h[b].contains;"ss"==b&&(k=AmCharts.formatNumber(k,g),1==k.split(j)[0].length&&(k="0"+k));if(("mm"==b||"hh"==b)&&10>k)k="0"+k;d=k+""+e[b]+""+d;a=Math.floor(a/h[b].contains);b=h[b].nextInterval;return AmCharts.formatDuration(a,b,d,e,f,g)}"ss"==b&&(a=AmCharts.formatNumber(a,g),1==a.split(j)[0].length&&(a="0"+a));if(("mm"==b||"hh"==b)&&10>a)a="0"+a;d=a+""+
e[b]+""+d;if(h[f].count>h[b].count)for(a=h[b].count;a<h[f].count;a++)b=h[b].nextInterval,"ss"==b||"mm"==b||"hh"==b?d="00"+e[b]+""+d:"DD"==b&&(d="0"+e[b]+""+d);":"==d.charAt(d.length-1)&&(d=d.substring(0,d.length-1));return d};
AmCharts.formatNumber=function(a,b,d,e,f){a=AmCharts.roundTo(a,b.precision);isNaN(d)&&(d=b.precision);var g=b.decimalSeparator,b=b.thousandsSeparator,h=0>a?"-":"",a=Math.abs(a),j=a.toString();if(-1==j.indexOf("e")){for(var j=j.split("."),k="",l=j[0].toString(),m=l.length;0<=m;m-=3)k=m!=l.length?0!=m?l.substring(m-3,m)+b+k:l.substring(m-3,m)+k:l.substring(m-3,m);void 0!=j[1]&&(k=k+g+j[1]);void 0!=d&&0<d&&"0"!=k&&(k=AmCharts.addZeroes(k,g,d))}else k=j;k=h+k;""==h&&!0==e&&0!=a&&(k="+"+k);!0==f&&(k+=
"%");return k};AmCharts.addZeroes=function(a,b,d){a=a.split(b);void 0==a[1]&&0<d&&(a[1]="0");return a[1].length<d?(a[1]+="0",AmCharts.addZeroes(a[0]+b+a[1],b,d)):void 0!=a[1]?a[0]+b+a[1]:a[0]};AmCharts.scientificToNormal=function(a){var b,a=a.toString().split("e");if("-"==a[1].substr(0,1)){b="0.";for(var d=0;d<Math.abs(Number(a[1]))-1;d++)b+="0";b+=a[0].split(".").join("")}else{var e=0;b=a[0].split(".");b[1]&&(e=b[1].length);b=a[0].split(".").join("");for(d=0;d<Math.abs(Number(a[1]))-e;d++)b+="0"}return b};
AmCharts.toScientific=function(a,b){if(0==a)return"0";var d=Math.floor(Math.log(Math.abs(a))*Math.LOG10E);Math.pow(10,d);mantissa=mantissa.toString().split(".").join(b);return mantissa.toString()+"e"+d};AmCharts.randomColor=function(){function a(){return Math.floor(256*Math.random()).toString(16)}return"#"+a()+a()+a()};
AmCharts.hitTest=function(a,b,d){var e=!1,f=a.x,g=a.x+a.width,h=a.y,j=a.y+a.height,k=AmCharts.isInRectangle;e||(e=k(f,h,b));e||(e=k(f,j,b));e||(e=k(g,h,b));e||(e=k(g,j,b));!e&&!0!=d&&(e=AmCharts.hitTest(b,a,!0));return e};AmCharts.isInRectangle=function(a,b,d){return a>=d.x-5&&a<=d.x+d.width+5&&b>=d.y-5&&b<=d.y+d.height+5?!0:!1};AmCharts.isPercents=function(a){if(-1!=(""+a).indexOf("%"))return!0};AmCharts.dayNames="Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(",");
AmCharts.shortDayNames="Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",");AmCharts.monthNames="January,February,March,April,May,June,July,August,September,October,November,December".split(",");AmCharts.shortMonthNames="Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");
AmCharts.formatDate=function(a,b){var d,e,f,g,h,j,k,l;AmCharts.useUTC?(d=a.getUTCFullYear(),e=a.getUTCMonth(),f=a.getUTCDate(),g=a.getUTCDay(),h=a.getUTCHours(),j=a.getUTCMinutes(),k=a.getUTCSeconds(),l=a.getUTCMilliseconds()):(d=a.getFullYear(),e=a.getMonth(),f=a.getDate(),g=a.getDay(),h=a.getHours(),j=a.getMinutes(),k=a.getSeconds(),l=a.getMilliseconds());var m=(""+d).substr(2,2),p=e+1;9>e&&(p="0"+p);var q=f;10>f&&(q="0"+f);var n="0"+g,o=h;24==o&&(o=0);var r=o;10>r&&(r="0"+r);b=b.replace(/JJ/g,
r);b=b.replace(/J/g,o);o=h;0==o&&(o=24);r=o;10>r&&(r="0"+r);b=b.replace(/HH/g,r);b=b.replace(/H/g,o);o=h;11<o&&(o-=12);r=o;10>r&&(r="0"+r);b=b.replace(/KK/g,r);b=b.replace(/K/g,o);o=h;12<o&&(o-=12);r=o;10>r&&(r="0"+r);b=b.replace(/LL/g,r);b=b.replace(/L/g,o);o=j;10>o&&(o="0"+o);b=b.replace(/NN/g,o);b=b.replace(/N/g,j);j=k;10>j&&(j="0"+j);b=b.replace(/SS/g,j);b=b.replace(/S/g,k);k=l;10>k&&(k="00"+k);100>k&&(k="0"+k);j=l;10>j&&(j="00"+j);b=b.replace(/QQQ/g,k);b=b.replace(/QQ/g,j);b=b.replace(/Q/g,l);
b=12>h?b.replace(/A/g,"am"):b.replace(/A/g,"pm");b=b.replace(/YYYY/g,"@IIII@");b=b.replace(/YY/g,"@II@");b=b.replace(/MMMM/g,"@XXXX@");b=b.replace(/MMM/g,"@XXX@");b=b.replace(/MM/g,"@XX@");b=b.replace(/M/g,"@X@");b=b.replace(/DD/g,"@RR@");b=b.replace(/D/g,"@R@");b=b.replace(/EEEE/g,"@PPPP@");b=b.replace(/EEE/g,"@PPP@");b=b.replace(/EE/g,"@PP@");b=b.replace(/E/g,"@P@");b=b.replace(/@IIII@/g,d);b=b.replace(/@II@/g,m);b=b.replace(/@XXXX@/g,AmCharts.monthNames[e]);b=b.replace(/@XXX@/g,AmCharts.shortMonthNames[e]);
b=b.replace(/@XX@/g,p);b=b.replace(/@X@/g,e+1);b=b.replace(/@RR@/g,q);b=b.replace(/@R@/g,f);b=b.replace(/@PPPP@/g,AmCharts.dayNames[g]);b=b.replace(/@PPP@/g,AmCharts.shortDayNames[g]);b=b.replace(/@PP@/g,n);return b=b.replace(/@P@/g,g)};AmCharts.findPosX=function(a){for(var b=a.offsetLeft;a=a.offsetParent;)b+=a.offsetLeft,a!=document.body&&a!=document.documentElement&&(b-=a.scrollLeft);return b};
AmCharts.findPosY=function(a){for(var b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop,a!=document.body&&a!=document.documentElement&&(b-=a.scrollTop);return b};AmCharts.findIfFixed=function(a){for(;a=a.offsetParent;)if("fixed"==a.style.position)return!0;return!1};AmCharts.formatValue=function(a,b,d,e,f,g,h,j){if(b){void 0==f&&(f="");for(var k=0;k<d.length;k++){var l=d[k],m=b[l];void 0!=m&&(m=g?AmCharts.addPrefix(m,j,h,e):AmCharts.formatNumber(m,e),a=a.replace(RegExp("\\[\\["+f+""+l+"\\]\\]","g"),m))}}return a};
AmCharts.formatDataContextValue=function(a,b){if(a)for(var d=a.match(/\[\[.*?\]\]/g),e=0;e<d.length;e++){var f=d[e],f=f.substr(2,f.length-4);void 0!=b[f]&&(a=a.replace(RegExp("\\[\\["+f+"\\]\\]","g"),b[f]))}return a};AmCharts.massReplace=function(a,b){for(var d in b){var e=b[d];void 0==e&&(e="");a=a.replace(d,e)}return a};AmCharts.cleanFromEmpty=function(a){return a.replace(/\[\[[^\]]*\]\]/g,"")};
AmCharts.addPrefix=function(a,b,d,e){var f=AmCharts.formatNumber(a,e),g="",h;if(0==a)return"0";0>a&&(g="-");a=Math.abs(a);if(1<a)for(h=b.length-1;-1<h;h--){if(a>=b[h].number){a/=b[h].number;e=Number(e.precision);1>e&&(e=1);a=AmCharts.roundTo(a,e);f=g+""+a+""+b[h].prefix;break}}else for(h=0;h<d.length;h++)if(a<=d[h].number){a/=d[h].number;e=Math.abs(Math.round(Math.log(a)*Math.LOG10E));a=AmCharts.roundTo(a,e);f=g+""+a+""+d[h].prefix;break}return f};AmCharts.remove=function(a){a&&a.remove()};
AmCharts.copyProperties=function(a,b){for(var d in a)"events"!=d&&void 0!=a[d]&&"function"!=typeof a[d]&&(b[d]=a[d])};AmCharts.recommended=function(){var a="js";document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")||swfobject&&swfobject.hasFlashPlayerVersion("8")&&(a="flash");return a};AmCharts.getEffect=function(a){">"==a&&(a="easeOutSine");"<"==a&&(a="easeInSine");"elastic"==a&&(a="easeOutElastic");return a};AmCharts.Bezier=AmCharts.Class({construct:function(a,b,d,e,f,g,h,j,k,l){var m="none";void 0!=k&&(m=k);"object"==typeof h&&(h=h[0]);"object"==typeof j&&(j=j[0]);g={fill:h,"fill-opacity":j,"stroke-dasharray":m,"stroke-width":g};isNaN(f)||(g["stroke-opacity"]=f);e&&(g.stroke=e);e="M"+Math.round(b[0])+","+Math.round(d[0]);f=[];for(h=0;h<b.length;h++)f.push({x:b[h],y:d[h]});1<f.length&&(b=this.interpolate(f),e+=this.drawBeziers(b));l?e+=l:AmCharts.VML||(e+="M0,0 L0,0");this.path=a.path(e).attr(g)},interpolate:function(a){var b=
[];b.push({x:a[0].x,y:a[0].y});var d=a[1].x-a[0].x,e=a[1].y-a[0].y;b.push({x:a[0].x+d/6,y:a[0].y+e/6});for(var f=1;f<a.length-1;f++){var g=a[f-1],h=a[f],e=a[f+1],d=e.x-h.x,e=e.y-g.y,g=h.x-g.x;g>d&&(g=d);b.push({x:h.x-g/3,y:h.y-e/6});b.push({x:h.x,y:h.y});b.push({x:h.x+g/3,y:h.y+e/6})}e=a[a.length-1].y-a[a.length-2].y;d=a[a.length-1].x-a[a.length-2].x;b.push({x:a[a.length-1].x-d/3,y:a[a.length-1].y-e/6});b.push({x:a[a.length-1].x,y:a[a.length-1].y});return b},drawBeziers:function(a){for(var b="",d=
0;d<(a.length-1)/3;d++)b+=this.drawBezierMidpoint(a[3*d],a[3*d+1],a[3*d+2],a[3*d+3]);return b},drawBezierMidpoint:function(a,b,d,e){var f=Math.round,g=this.getPointOnSegment(a,b,0.75),h=this.getPointOnSegment(e,d,0.75),j=(e.x-a.x)/16,k=(e.y-a.y)/16,l=this.getPointOnSegment(a,b,0.375),a=this.getPointOnSegment(g,h,0.375);a.x-=j;a.y-=k;b=this.getPointOnSegment(h,g,0.375);b.x+=j;b.y+=k;d=this.getPointOnSegment(e,d,0.375);j=this.getMiddle(l,a);g=this.getMiddle(g,h);h=this.getMiddle(b,d);l=" Q"+f(l.x)+
","+f(l.y)+","+f(j.x)+","+f(j.y);l+=" Q"+f(a.x)+","+f(a.y)+","+f(g.x)+","+f(g.y);l+=" Q"+f(b.x)+","+f(b.y)+","+f(h.x)+","+f(h.y);return l+=" Q"+f(d.x)+","+f(d.y)+","+f(e.x)+","+f(e.y)},getMiddle:function(a,b){return{x:(a.x+b.x)/2,y:(a.y+b.y)/2}},getPointOnSegment:function(a,b,d){return{x:a.x+(b.x-a.x)*d,y:a.y+(b.y-a.y)*d}}});AmCharts.Cuboid=AmCharts.Class({construct:function(a,b,d,e,f,g,h,j,k,l,m,p,q){this.set=a.set();this.container=a;this.h=Math.round(d);this.w=Math.round(b);this.dx=e;this.dy=f;this.colors=g;this.alpha=h;this.bwidth=j;this.bcolor=k;this.balpha=l;this.colors=g;q?0>b&&0==m&&(m=180):0>d&&270==m&&(m=90);this.gradientRotation=m;0==e&&0==f&&(this.cornerRadius=p);this.draw()},draw:function(){var a=this.set;a.clear();var b=this.container,d=this.w,e=this.h,f=this.dx,g=this.dy,h=this.colors,j=this.alpha,k=this.bwidth,
l=this.bcolor,m=this.balpha,p=this.gradientRotation,q=this.cornerRadius;if(0<f||0<g){var n=h,o=h;"object"==typeof h&&(n=h[0],o=h[h.length-1]);var r=AmCharts.adjustLuminosity(n,-0.2),r=AmCharts.adjustLuminosity(n,-0.2),n=AmCharts.polygon(b,[0,f,d+f,d,0],[0,g,g,0,0],r,j,0,0,0,p);if(0<m)var s=AmCharts.line(b,[0,f,d+f],[0,g,g],l,m,k);if(0<Math.abs(e)&&0<Math.abs(d)){var t=AmCharts.polygon(b,[0,0,d,d,0],[0,e,e,0,0],r,j,0,0,0,0,p);t.translate(f,g);if(0<m)var u=AmCharts.line(b,[f,f],[g,g+e],l,1,k);var x=
AmCharts.polygon(b,[0,0,f,f,0],[0,e,e+g,g,0],r,j,0,0,0,p),y=AmCharts.polygon(b,[d,d,d+f,d+f,d],[0,e,e+g,g,0],r,j,0,0,0,p);if(0<m)var D=AmCharts.line(b,[d,d+f,d+f,d],[0,g,e+g,e],l,m,k)}r=AmCharts.adjustLuminosity(o,0.2);o=AmCharts.polygon(b,[0,f,d+f,d,0],[e,e+g,e+g,e,e],r,j,0,0,0,p);if(0<m)var v=AmCharts.line(b,[0,f,d+f],[e,e+g,e+g],l,m,k)}1>Math.abs(e)&&(e=0);1>Math.abs(d)&&(d=0);b=0==e?AmCharts.line(b,[0,d],[0,0],l,m,k):0==d?AmCharts.line(b,[0,0],[0,e],l,m,k):0<q?AmCharts.rect(b,d,e,h,j,k,l,m,q,
p):AmCharts.polygon(b,[0,0,d,d,0],[0,e,e,0,0],h,j,k,l,m,p);e=0>e?[n,s,t,u,x,y,D,o,v,b]:[o,v,t,u,x,y,n,s,D,b];for(s=0;s<e.length;s++)(t=e[s])&&a.push(t)},width:function(a){this.w=a;this.draw()},height:function(a){this.h=a;this.draw()},animateHeight:function(a,b){var d=this;d.easing=b;d.totalFrames=1E3*a/AmCharts.updateRate;d.rh=d.h;d.frame=0;d.height(1);setTimeout(function(){d.updateHeight.call(d)},AmCharts.updateRate)},updateHeight:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b&&(b=
a.easing(0,a.frame,1,a.rh-1,b),a.height(b),setTimeout(function(){a.updateHeight.call(a)},AmCharts.updateRate))},animateWidth:function(a,b){var d=this;d.easing=b;d.totalFrames=1E3*a/AmCharts.updateRate;d.rw=d.w;d.frame=0;d.width(1);setTimeout(function(){d.updateWidth.call(d)},AmCharts.updateRate)},updateWidth:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b&&(b=a.easing(0,a.frame,1,a.rw-1,b),a.width(b),setTimeout(function(){a.updateWidth.call(a)},AmCharts.updateRate))}});AmCharts.AmLegend=AmCharts.Class({construct:function(){this.createEvents("rollOverMarker","rollOverItem","rollOutMarker","rollOutItem","showItem","hideItem","clickMarker","rollOverItem","rollOutItem","clickLabel");this.position="bottom";this.borderColor=this.color="#000000";this.borderAlpha=0;this.markerLabelGap=5;this.verticalGap=10;this.align="left";this.horizontalGap=0;this.spacing=10;this.markerDisabledColor="#AAB3B3";this.markerType="square";this.markerSize=16;this.markerBorderAlpha;this.markerBorderThickness=
1;this.marginBottom=this.marginTop=0;this.marginLeft=this.marginRight=20;this.autoMargins=!0;this.valueWidth=50;this.switchable=!0;this.switchType="x";this.switchColor="#FFFFFF";this.rollOverColor="#CC0000";this.selectedColor;this.reversedOrder=!1;this.labelText="[[title]]";this.valueText="[[value]]";this.useMarkerColorForLabels=!1;this.rollOverGraphAlpha=1;this.textClickEnabled=!1;this.equalWidths=!0;this.dateFormat="DD-MM-YYYY";this.backgroundColor="#FFFFFF";this.backgroundAlpha=0;this.ly;this.lx},
setData:function(a){this.data=a;this.invalidateSize()},invalidateSize:function(){this.destroy();this.entries=[];this.valueLabels=[];AmCharts.ifArray(this.data)&&this.drawLegend()},drawLegend:function(){var a=this.chart,b=this.position,d=this.width,e=a.realWidth,f=a.realHeight,g=this.div,h=this.data;isNaN(this.fontSize)&&(this.fontSize=a.fontSize);if("right"==b||"left"==b)this.maxColumns=1,this.marginLeft=this.marginRight=10;else if(this.autoMargins){this.marginRight=a.marginRight;this.marginLeft=
a.marginLeft;var j=a.autoMarginOffset;"bottom"==b?(this.marginBottom=j,this.marginTop=0):(this.marginTop=j,this.marginBottom=0)}this.divWidth=b=void 0!=d?AmCharts.toCoordinate(d,e):a.realWidth;g.style.width=b+"px";this.container=new AmCharts.AmDraw(g,b,f);this.lx=0;this.ly=8;f=this.markerSize;0<f&&(this.lx+=f+this.markerLabelGap,this.ly=f/2-2);this.titleWidth=0;if(f=this.title)a=AmCharts.text(this.container,f,this.color,a.fontFamily,this.fontSize,"start",!0),a.translate(0,this.marginTop+this.verticalGap+
this.ly+1),this.titleWidth=a.getBBox().width+15;for(a=this.index=this.maxLabelWidth=0;a<h.length;a++)this.createEntry(h[a]);for(a=this.index=0;a<h.length;a++)this.createValue(h[a]);this.arrangeEntries();this.updateValues()},arrangeEntries:function(){var a=this.position,b=this.marginLeft+this.titleWidth,d=this.marginRight,e=this.marginTop,f=this.marginBottom,g=this.horizontalGap,h=this.div,j=this.divWidth,k=this.maxColumns,l=this.verticalGap,m=this.spacing,p=j-d-b,q=0,n=0,o=this.container,r=o.set();
this.set=r;o=o.set();r.push(o);for(var s=this.entries,t=0;t<s.length;t++){var u=s[t].getBBox(),x=u.width;x>q&&(q=x);u=u.height;u>n&&(n=u)}for(var y=x=0,D=g,t=0;t<s.length;t++){var v=s[t];this.reversedOrder&&(v=s[s.length-t-1]);var u=v.getBBox(),B;this.equalWidths?B=g+y*(q+m+this.markerLabelGap):(B=D,D=D+u.width+g+m);B+u.width>p&&0<t&&(x++,y=0,B=g,D=B+u.width+g+m);v.translate(B,(n+l)*x);y++;!isNaN(k)&&y>=k&&(y=0,x++);o.push(v)}u=o.getBBox();k=u.height+2*l-1;"left"==a||"right"==a?(j=u.width+2*g,h.style.width=
j+b+d+"px"):j=j-b-d-1;d=AmCharts.polygon(this.container,[0,j,j,0],[0,0,k,k],this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);r.push(d);r.translate(b,e);d.toBack();b=g;if("top"==a||"bottom"==a)"center"==this.align?b=g+(j-u.width)/2:"right"==this.align&&(b=g+j-u.width);o.translate(b,l+1);a=k+e+f+1;0>a&&(a=0);h.style.height=Math.round(a)+"px"},createEntry:function(a){if(!1!==a.visibleInLegend){var b=this.chart,d=a.markerType;d||(d=this.markerType);var e=a.color,f=a.alpha;
a.legendKeyColor&&(e=a.legendKeyColor());a.legendKeyAlpha&&(f=a.legendKeyAlpha());!0==a.hidden&&(e=this.markerDisabledColor);d=this.createMarker(d,e,f);this.addListeners(d,a);d=this.container.set([d]);this.switchable&&d.setAttr("cursor","pointer");if(f=this.switchType){var g;g="x"==f?this.createX():this.createV();g.dItem=a;!0!=a.hidden?"x"==f?g.hide():g.show():"x"!=f&&g.hide();this.switchable||g.hide();this.addListeners(g,a);a.legendSwitch=g;d.push(g)}f=this.color;a.showBalloon&&this.textClickEnabled&&
void 0!=this.selectedColor&&(f=this.selectedColor);this.useMarkerColorForLabels&&(f=e);!0==a.hidden&&(f=this.markerDisabledColor);if(e=AmCharts.massReplace(this.labelText,{"[[title]]":a.title})){var h=AmCharts.text(this.container,e,f,b.fontFamily,this.fontSize,"start");h.translate(this.lx,this.ly);d.push(h);b=h.getBBox().width;this.maxLabelWidth<b&&(this.maxLabelWidth=b)}this.entries[this.index]=d;a.legendEntry=this.entries[this.index];a.legendLabel=h;this.index++}},addListeners:function(a,b){var d=
this;a&&a.mouseover(function(){d.rollOverMarker(b)}).mouseout(function(){d.rollOutMarker(b)}).click(function(){d.clickMarker(b)})},rollOverMarker:function(a){this.switchable&&this.dispatch("rollOverMarker",a);this.dispatch("rollOverItem",a)},rollOutMarker:function(a){this.switchable&&this.dispatch("rollOutMarker",a);this.dispatch("rollOutItem",a)},clickMarker:function(a){this.switchable?!0==a.hidden?this.dispatch("showItem",a):this.dispatch("hideItem",a):this.textClickEnabled&&this.dispatch("clickMarker",
a)},rollOverLabel:function(a){a.hidden||(this.textClickEnabled&&a.legendLabel&&a.legendLabel.attr({fill:this.rollOverColor}),this.dispatch("rollOverItem",a))},rollOutLabel:function(a){if(!a.hidden){if(this.textClickEnabled&&a.legendLabel){var b=this.color;void 0!=this.selectedColor&&a.showBalloon&&(b=this.selectedColor);this.useMarkerColorForLabels&&(b=a.lineColor,void 0==b&&(b=a.color));a.legendLabel.attr({fill:b})}this.dispatch("rollOutItem",a)}},clickLabel:function(a){this.textClickEnabled?a.hidden||
this.dispatch("clickLabel",a):this.switchable&&(!0==a.hidden?this.dispatch("showItem",a):this.dispatch("hideItem",a))},dispatch:function(a,b){this.fire(a,{type:a,dataItem:b,target:this,chart:this.chart})},createValue:function(a){var b=this,d=b.fontSize;if(!1!==a.visibleInLegend){var e=b.maxLabelWidth;b.equalWidths||(b.valueAlign="left");"left"==b.valueAlign&&(e=a.legendEntry.getBBox().width);var f=e;if(b.valueText){var g=b.color;b.useMarkerColorForLabels&&(g=a.color);!0==a.hidden&&(g=b.markerDisabledColor);
var h=b.valueText,e=e+b.lx+b.markerLabelGap+b.valueWidth,j="end";"left"==b.valueAlign&&(e-=b.valueWidth,j="start");g=AmCharts.text(b.container,h,g,b.chart.fontFamily,d,j);g.translate(e,b.ly);b.entries[b.index].push(g);f+=b.valueWidth+b.markerLabelGap;g.dItem=a;b.valueLabels.push(g)}b.index++;g=b.markerSize;g<d+7&&(g=d+7,AmCharts.VML&&(g+=3));d=b.container.rect(b.markerSize+b.markerLabelGap,0,f,g,0,0).attr({stroke:"none",fill:"#FFFFFF","fill-opacity":0.005});d.dItem=a;b.entries[b.index-1].push(d);
d.mouseover(function(){b.rollOverLabel(a)}).mouseout(function(){b.rollOutLabel(a)}).click(function(){b.clickLabel(a)})}},createV:function(){var a=this.markerSize;return AmCharts.polygon(this.container,[a/5,a/2,a-a/5,a/2],[a/3,a-a/5,a/5,a/1.7],this.switchColor)},createX:function(){var a=this.markerSize-3,b={stroke:this.switchColor,"stroke-width":3},d=this.container,e=AmCharts.line(d,[3,a],[3,a]).attr(b),a=AmCharts.line(d,[3,a],[a,3]).attr(b);return this.container.set([e,a])},createMarker:function(a,
b,d){var e=this.markerSize,f=this.container,g,h=this.markerBorderThickness,j=this.markerBorderAlpha;switch(a){case "square":g=AmCharts.polygon(f,[0,e,e,0],[0,0,e,e],b,d,h,b,j);break;case "circle":g=AmCharts.circle(f,e/2,b,d,h,b,j);g.translate(e/2,e/2);break;case "line":g=AmCharts.line(f,[0,e],[e/2,e/2],b,d,h);break;case "dashedLine":g=AmCharts.line(f,[0,e],[e/2,e/2],b,d,h,3);break;case "triangleUp":g=AmCharts.polygon(f,[0,e/2,e,e],[e,0,e,e],b,d,h,b,j);break;case "triangleDown":g=AmCharts.polygon(f,
[0,e/2,e,e],[0,e,0,0],b,d,h,b,j);break;case "bubble":g=AmCharts.circle(f,e/2,b,d,h,b,j,!0),g.translate(e/2,e/2)}return g},validateNow:function(){this.invalidateSize()},updateValues:function(){for(var a=this.valueLabels,b=this.chart,d=0;d<a.length;d++){var e=a[d],f=e.dItem;if(void 0!=f.type){var g=f.currentDataItem;if(g){var h=this.valueText;f.legendValueText&&(h=f.legendValueText);f=h;f=b.formatString(f,g);e.text(f)}else e.text(" ")}else g=b.formatString(this.valueText,f),e.text(g)}},renderFix:function(){if(!AmCharts.VML){var a=
this.container;a&&a.renderFix()}},destroy:function(){this.div.innerHTML="";AmCharts.remove(this.set)}});AmCharts.AmBalloon=AmCharts.Class({construct:function(){this.enabled=!0;this.fillColor="#CC0000";this.fillAlpha=1;this.borderThickness=2;this.borderColor="#FFFFFF";this.borderAlpha=1;this.cornerRadius=6;this.maximumWidth=220;this.horizontalPadding=8;this.verticalPadding=5;this.pointerWidth=10;this.pointerOrientation="V";this.color="#FFFFFF";this.textShadowColor="#000000";this.adjustBorderColor=!1;this.showBullet=!0;this.show=this.follow=!1;this.bulletSize=3},draw:function(){var a=this.pointToX,b=
this.pointToY;if(!isNaN(a)){var d=this.chart,e=d.container,f=this.set;AmCharts.remove(f);AmCharts.remove(this.pointer);this.set=f=e.set();d.balloonsSet.push(f);if(this.show){var g=this.l,h=this.t,j=this.r,k=this.b,l=this.textShadowColor;this.color==l&&(l=null);var m=this.balloonColor,p=this.fillColor,q=this.borderColor;void 0!=m&&(this.adjustBorderColor?q=m:p=m);var n=this.horizontalPadding,o=this.verticalPadding,m=this.pointerWidth,r=this.pointerOrientation,s=this.cornerRadius,t=d.fontFamily,u=this.fontSize;
void 0==u&&(u=d.fontSize);d=AmCharts.text(e,this.text,this.color,t,u);f.push(d);if(void 0!=l){var x=AmCharts.text(e,this.text,l,t,u,"middle",!1,0.4);f.push(x)}l=d.getBBox();f=l.height+2*o;l=l.width+2*n;window.opera&&(f+=2);n=l/2;o=f/2-2;d.translate(n,o);x&&x.translate(n+1,o+1);"H"!=r?(o=a-l/2,n=b<h+f+10&&"down"!=r?b+m:b-f-m):(2*m>f&&(m=f/2),n=b-f/2,o=a<g+(j-g)/2?a+m:a-l-m);n+f>=k&&(n=k-f);n<h&&(n=h);o<g&&(o=g);o+l>j&&(o=j-l);0<s||0==m?(q=AmCharts.rect(e,l,f,p,this.fillAlpha,this.borderThickness,q,
this.borderAlpha,this.cornerRadius),this.showBullet&&(e=AmCharts.circle(e,this.bulletSize,p,this.fillAlpha),e.translate(a,b),this.pointer=e)):(k=[],s=[],"H"!=r?(g=a-o,g>l-m&&(g=l-m),g<m&&(g=m),k=[0,g-m,a-o,g+m,l,l,0,0],s=b<h+f+10&&"down"!=r?[0,0,b-n,0,0,f,f,0]:[f,f,b-n,f,f,0,0,f]):(h=b-n,h>f-m&&(h=f-m),h<m&&(h=m),s=[0,h-m,b-n,h+m,f,f,0,0],k=a<g+(j-g)/2?[0,0,a-o,0,0,l,l,0]:[l,l,a-o,l,l,0,0,l]),q=AmCharts.polygon(e,k,s,p,this.fillAlpha,this.borderThickness,q,this.borderAlpha));this.set.push(q);q.toFront();
x&&x.toFront();d.toFront();this.set.translate(o,n);l=q.getBBox();this.bottom=n+l.y+l.height;this.yPos=l.y+n}}},followMouse:function(){if(this.follow&&this.show){var a=this.chart.mouseX,b=this.chart.mouseY;this.pointToX=a;this.pointToY=b;if(a!=this.previousX||b!=this.previousY)if(this.previousX=a,this.previousY=b,0==this.cornerRadius)this.draw();else{var d=this.set;if(d){var e=d.getBBox(),a=a-e.width/2,f=b-e.height-10;a<this.l&&(a=this.l);a>this.r-e.width&&(a=this.r-e.width);f<this.t&&(f=b+10);d.translate(a,
f)}}}},changeColor:function(a){this.balloonColor=a},setBounds:function(a,b,d,e){this.l=a;this.t=b;this.r=d;this.b=e},showBalloon:function(a){this.text=a;this.show=!0;this.draw()},hide:function(){this.follow=this.show=!1;this.destroy()},setPosition:function(a,b,d){this.pointToX=a;this.pointToY=b;d&&(a!=this.previousX||b!=this.previousY)&&this.draw();this.previousX=a;this.previousY=b},followCursor:function(a){var b=this;(b.follow=a)?(b.pShowBullet=b.showBullet,b.showBullet=!1):void 0!=b.pShowBullet&&
(b.showBullet=b.pShowBullet);clearInterval(b.interval);var d=b.chart.mouseX,e=b.chart.mouseY;!isNaN(d)&&a&&(b.pointToX=d,b.pointToY=e,b.interval=setInterval(function(){b.followMouse.call(b)},40))},destroy:function(){clearInterval(this.interval);AmCharts.remove(this.set);AmCharts.remove(this.pointer)}});AmCharts.AmCoordinateChart=AmCharts.Class({inherits:AmCharts.AmChart,construct:function(){AmCharts.AmCoordinateChart.base.construct.call(this);this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem");this.plotAreaFillColors="#FFFFFF";this.plotAreaFillAlphas=0;this.plotAreaBorderColor="#000000";this.plotAreaBorderAlpha=0;this.startAlpha=1;this.startDuration=0;this.startEffect="elastic";this.sequencedAnimation=!0;this.colors="#FF6600,#FCD202,#B0DE09,#0D8ECF,#2A0CD0,#CD0D74,#CC0000,#00CC00,#0000CC,#DDDDDD,#999999,#333333,#990000".split(",");
this.balloonDateFormat="MMM DD, YYYY";this.valueAxes=[];this.graphs=[]},initChart:function(){AmCharts.AmCoordinateChart.base.initChart.call(this);this.createValueAxes();AmCharts.VML&&(this.startAlpha=1);var a=this.legend;a&&a.setData(this.graphs)},createValueAxes:function(){0==this.valueAxes.length&&this.addValueAxis(new AmCharts.ValueAxis)},parseData:function(){this.processValueAxes();this.processGraphs()},parseSerialData:function(){AmCharts.AmSerialChart.base.parseData.call(this);var a=this.graphs,
b=this.seriesIdField;b||(b=this.categoryField);this.chartData=[];var d=this.dataProvider;if(d){var e=!1;this.categoryAxis&&(e=this.categoryAxis.parseDates);if(e)var f=AmCharts.extractPeriod(this.categoryAxis.minPeriod),g=f.period,f=f.count;var h={};this.lookupTable=h;for(var j=0;j<d.length;j++){var k={},l=d[j],m=l[this.categoryField];k.category=m;h[l[b]]=k;e&&(m=new Date(m.getFullYear(),m.getMonth(),m.getDate(),m.getHours(),m.getMinutes(),m.getSeconds(),m.getMilliseconds()),m=AmCharts.resetDateToMin(m,
g,f),k.category=m,k.time=m.getTime());var p=this.valueAxes;k.axes={};k.x={};for(var q=0;q<p.length;q++){var n=p[q].id;k.axes[n]={};k.axes[n].graphs={};for(var o=0;o<a.length;o++){var m=a[o],r=m.id,s=m.periodValue;if(m.valueAxis.id==n){k.axes[n].graphs[r]={};var t={};t.index=j;t.values=this.processValues(l,m,s);this.processFields(m,t,l);t.category=k.category;t.serialDataItem=k;t.graph=m;k.axes[n].graphs[r]=t}}}this.chartData[j]=k}}for(b=0;b<a.length;b++)m=a[b],m.dataProvider&&this.parseGraphData(m)},
processValues:function(a,b,d){var e={},f=Number(a[b.valueField+d]);isNaN(f)||(e.value=f);f=Number(a[b.openField+d]);isNaN(f)||(e.open=f);f=Number(a[b.closeField+d]);isNaN(f)||(e.close=f);f=Number(a[b.lowField+d]);isNaN(f)||(e.low=f);f=Number(a[b.highField+d]);isNaN(f)||(e.high=f);return e},parseGraphData:function(a){var b=a.dataProvider,d=a.seriesIdField;d||(d=this.seriesIdField);d||(d=this.categoryField);for(var e=0;e<b.length;e++){var f=b[e],g=this.lookupTable[""+f[d]],h=a.valueAxis.id;g&&(h=g.axes[h].graphs[a.id],
h.serialDataItem=g,h.values=this.processValues(f,a,a.periodValue),this.processFields(a,h,f))}},addValueAxis:function(a){a.chart=this;this.valueAxes.push(a);this.validateData()},removeValueAxesAndGraphs:function(){for(var a=this.valueAxes,b=a.length-1;-1<b;b--)this.removeValueAxis(a[b])},removeValueAxis:function(a){var b=this.graphs,d;for(d=b.length-1;0<=d;d--){var e=b[d];e&&e.valueAxis==a&&this.removeGraph(e)}b=this.valueAxes;for(d=b.length-1;0<=d;d--)b[d]==a&&b.splice(d,1);this.validateData()},addGraph:function(a){this.graphs.push(a);
this.chooseGraphColor(a,this.graphs.length-1);this.validateData()},removeGraph:function(a){for(var b=this.graphs,d=b.length-1;0<=d;d--)b[d]==a&&(b.splice(d,1),a.destroy());this.validateData()},processValueAxes:function(){for(var a=this.valueAxes,b=0;b<a.length;b++){var d=a[b];d.chart=this;d.id||(d.id="valueAxis"+b);if(!0===this.usePrefixes||!1===this.usePrefixes)d.usePrefixes=this.usePrefixes}},processGraphs:function(){for(var a=this.graphs,b=0;b<a.length;b++){var d=a[b];d.chart=this;d.valueAxis||
(d.valueAxis=this.valueAxes[0]);d.id||(d.id="graph"+b)}},formatString:function(a,b){var d=b.graph,e=d.valueAxis;e.duration&&b.values.value&&(e=AmCharts.formatDuration(b.values.value,e.duration,"",e.durationUnits,e.maxInterval,e.numberFormatter),a=a.split("[[value]]").join(e));a=AmCharts.massReplace(a,{"[[title]]":d.title,"[[description]]":b.description,"<br>":"\n"});return a=AmCharts.cleanFromEmpty(a)},getBalloonColor:function(a,b){var d=a.lineColor,e=a.balloonColor,f=a.fillColors;"object"==typeof f?
d=f[0]:void 0!=f&&(d=f);if(b.isNegative){var f=a.negativeLineColor,g=a.negativeFillColors;"object"==typeof g?f=g[0]:void 0!=g&&(f=g);void 0!=f&&(d=f)}void 0!=b.color&&(d=b.color);void 0==e&&(e=d);return e},getGraphById:function(a){for(var b,d=this.graphs,e=0;e<d.length;e++){var f=d[e];f.id==a&&(b=f)}return b},processFields:function(a,b,d){if(a.itemColors){var e=a.itemColors,f=b.index;b.color=f<e.length?e[f]:AmCharts.randomColor()}e="color,alpha,fillColors,description,bullet,customBullet,bulletSize,bulletConfig,url".split(",");
for(f=0;f<e.length;f++){var g=e[f],h=a[g+"Field"];h&&(h=d[h],AmCharts.isDefined(h)&&(b[g]=h))}b.dataContext=d},chooseGraphColor:function(a,b){if(void 0==a.lineColor){var d;d=this.colors.length>b?this.colors[b]:AmCharts.randomColor();a.lineColor=d}},handleLegendEvent:function(a){var b=a.type;if(a=a.dataItem){var d=a.hidden,e=a.showBalloon;switch(b){case "clickMarker":e?this.hideGraphsBalloon(a):this.showGraphsBalloon(a);break;case "clickLabel":e?this.hideGraphsBalloon(a):this.showGraphsBalloon(a);
break;case "rollOverItem":d||this.highlightGraph(a);break;case "rollOutItem":d||this.unhighlightGraph();break;case "hideItem":this.hideGraph(a);break;case "showItem":this.showGraph(a)}}},highlightGraph:function(a){var b=this.graphs,d,e=0.2;this.legend&&(e=this.legend.rollOverGraphAlpha);for(d=0;d<b.length;d++){var f=b[d];f!=a&&f.changeOpacity(e)}},unhighlightGraph:function(){for(var a=this.graphs,b=0;b<a.length;b++)a[b].changeOpacity(1)},showGraph:function(a){a.hidden=!1;this.initChart()},hideGraph:function(a){a.hidden=
!0;this.initChart()},hideGraphsBalloon:function(a){a.showBalloon=!1;this.updateLegend()},showGraphsBalloon:function(a){a.showBalloon=!0;this.updateLegend()},updateLegend:function(){this.legend&&this.legend.invalidateSize()},animateAgain:function(){var a=this.graphs;if(a)for(var b=0;b<a.length;b++)a[b].animationPlayed=!1}});AmCharts.AmRectangularChart=AmCharts.Class({inherits:AmCharts.AmCoordinateChart,construct:function(){AmCharts.AmRectangularChart.base.construct.call(this);this.createEvents("zoomed");this.marginRight=this.marginBottom=this.marginTop=this.marginLeft=20;this.verticalPosition=this.horizontalPosition=this.depth3D=this.angle=0;this.heightMultiplyer=this.widthMultiplyer=1;this.zoomOutText="Show all";this.zbSet;this.zoomOutButton={backgroundColor:"#b2e1ff",backgroundAlpha:1};this.trendLines=[];this.autoMargins=
!0;this.marginsUpdated=!1;this.autoMarginOffset=10},initChart:function(){AmCharts.AmRectangularChart.base.initChart.call(this);this.updateDxy();var a=!0;!this.marginsUpdated&&this.autoMargins&&(this.resetMargins(),a=!1);this.updateMargins();this.updatePlotArea();this.updateScrollbars();this.updateTrendLines();this.updateChartCursor();this.updateValueAxes();a&&(this.scrollbarOnly||this.updateGraphs())},drawChart:function(){AmCharts.AmRectangularChart.base.drawChart.call(this);this.drawPlotArea();if(AmCharts.ifArray(this.chartData)){var a=
this.chartCursor;a&&a.draw();a=this.zoomOutText;""!=a&&a&&this.drawZoomOutButton()}},resetMargins:function(){var a={};if("serial"==this.chartType){for(var b=this.valueAxes,d=0;d<b.length;d++){var e=b[d];e.ignoreAxisWidth||(e.setOrientation(this.rotate),e.fixAxisPosition(),a[e.position]=!0)}if((d=this.categoryAxis)&&!d.ignoreAxisWidth)d.setOrientation(!this.rotate),d.fixAxisPosition(),d.fixAxisPosition(),a[d.position]=!0}else{e=this.xAxes;b=this.yAxes;for(d=0;d<e.length;d++){var f=e[d];f.ignoreAxisWidth||
(f.setOrientation(!0),f.fixAxisPosition(),a[f.position]=!0)}for(d=0;d<b.length;d++)e=b[d],e.ignoreAxisWidth||(e.setOrientation(!1),e.fixAxisPosition(),a[e.position]=!0)}a.left&&(this.marginLeft=0);a.right&&(this.marginRight=0);a.top&&(this.marginTop=0);a.bottom&&(this.marginBottom=0);this.fixMargins=a},measureMargins:function(){var a=this.valueAxes,b,d=this.autoMarginOffset,e=this.fixMargins,f=this.realWidth,g=this.realHeight,h=d,j=d,k=f-d;b=g-d;for(var l=0;l<a.length;l++)b=this.getAxisBounds(a[l],
h,k,j,b),h=b.l,k=b.r,j=b.t,b=b.b;if(a=this.categoryAxis)b=this.getAxisBounds(a,h,k,j,b),h=b.l,k=b.r,j=b.t,b=b.b;e.left&&h<d&&(this.marginLeft=Math.round(-h+d));e.right&&k>f-d&&(this.marginRight=Math.round(k-f+d));e.top&&j<d&&(this.marginTop=Math.round(this.marginTop-j+d+this.titleHeight));e.bottom&&b>g-d&&(this.marginBottom=Math.round(b-g+d));this.animateAgain();this.initChart()},getAxisBounds:function(a,b,d,e,f){if(!a.ignoreAxisWidth){var g=a.labelsSet,h=a.tickLength;a.inside&&(h=0);if(g)switch(g=
a.getBBox(),a.position){case "top":a=g.y;e>a&&(e=a);break;case "bottom":a=g.y+g.height;f<a&&(f=a);break;case "right":a=g.x+g.width+h+3;d<a&&(d=a);break;case "left":a=g.x-h,b>a&&(b=a)}}return{l:b,t:e,r:d,b:f}},drawZoomOutButton:function(){var a=this,b=a.container.set();a.zoomButtonSet.push(b);var d=a.color,e=a.fontSize,f=a.zoomOutButton;if(f&&(f.fontSize&&(e=f.fontSize),f.color))d=f.color;d=AmCharts.text(a.container,a.zoomOutText,d,a.fontFamily,e,"start");e=d.getBBox();d.translate(29,6+e.height/2);
f=AmCharts.rect(a.container,e.width+40,e.height+15,f.backgroundColor,f.backgroundAlpha);b.push(f);a.zbBG=f;void 0!=a.pathToImages&&(f=a.container.image(a.pathToImages+"lens.png",0,0,16,16),f.translate(7,e.height/2-1),f.toFront(),b.push(f));d.toFront();b.push(d);f=b.getBBox();b.translate(a.marginLeftReal+a.plotAreaWidth-f.width,a.marginTopReal);b.hide();b.mouseover(function(){a.rollOverZB()}).mouseout(function(){a.rollOutZB()}).click(function(){a.clickZB()}).touchstart(function(){a.rollOverZB()}).touchend(function(){a.rollOutZB();
a.clickZB()});for(f=0;f<b.length;f++)b[f].attr({cursor:"pointer"});a.zbSet=b},rollOverZB:function(){this.zbBG.show()},rollOutZB:function(){this.zbBG.hide()},clickZB:function(){this.zoomOut()},zoomOut:function(){this.updateScrollbar=!0;this.zoom()},drawPlotArea:function(){var a=this.dx,b=this.dy,d=this.marginLeftReal,e=this.marginTopReal,f=this.plotAreaWidth,g=this.plotAreaHeight,h=this.plotAreaFillColors,j=this.plotAreaFillAlphas,k=this.plotAreaBorderColor,l=this.plotAreaBorderAlpha;this.trendLinesSet.clipRect(d,
e,f,g);"object"==typeof j&&(j=j[0]);h=AmCharts.polygon(this.container,[0,f,f,0],[0,0,g,g],h,j,1,k,l);h.translate(d+a,e+b);this.set.push(h);0!=a&&0!=b&&(h=this.plotAreaFillColors,"object"==typeof h&&(h=h[0]),h=AmCharts.adjustLuminosity(h,-0.15),f=AmCharts.polygon(this.container,[0,a,f+a,f,0],[0,b,b,0,0],h,j,1,k,l),f.translate(d,e+g),this.set.push(f),a=AmCharts.polygon(this.container,[0,0,a,a,0],[0,g,g+b,b,0],h,j,1,k,l),a.translate(d,e),this.set.push(a))},updatePlotArea:function(){this.realWidth=this.updateWidth()-
1;this.realHeight=this.updateHeight()-1;var a=this.realWidth-this.marginLeftReal-this.marginRightReal-this.dx,b=this.realHeight-this.marginTopReal-this.marginBottomReal;1>a&&(a=1);1>b&&(b=1);this.plotAreaWidth=Math.round(a);this.plotAreaHeight=Math.round(b)},updateDxy:function(){this.dx=this.depth3D*Math.cos(this.angle*Math.PI/180);this.dy=-this.depth3D*Math.sin(this.angle*Math.PI/180)},updateMargins:function(){var a=this.getTitleHeight();this.titleHeight=a;this.marginTopReal=this.marginTop-this.dy+
a;this.marginBottomReal=this.marginBottom;this.marginLeftReal=this.marginLeft;this.marginRightReal=this.marginRight},updateValueAxes:function(){for(var a=this.valueAxes,b=this.marginLeftReal,d=this.marginTopReal,e=this.plotAreaHeight,f=this.plotAreaWidth,g=0;g<a.length;g++){var h=a[g];h.axisRenderer=AmCharts.RecAxis;h.guideFillRenderer=AmCharts.RecFill;h.axisItemRenderer=AmCharts.RecItem;h.dx=this.dx;h.dy=this.dy;h.viW=f;h.viH=e;h.marginsChanged=!0;h.viX=b;h.viY=d;this.updateObjectSize(h)}},updateObjectSize:function(a){a.width=
this.plotAreaWidth*this.widthMultiplyer;a.height=this.plotAreaHeight*this.heightMultiplyer;a.x=this.marginLeftReal+this.horizontalPosition;a.y=this.marginTopReal+this.verticalPosition},updateGraphs:function(){for(var a=this.graphs,b=0;b<a.length;b++){var d=a[b];d.x=this.marginLeftReal+this.horizontalPosition;d.y=this.marginTopReal+this.verticalPosition;d.width=this.plotAreaWidth*this.widthMultiplyer;d.height=this.plotAreaHeight*this.heightMultiplyer;d.index=b;d.dx=this.dx;d.dy=this.dy;d.rotate=this.rotate;
d.chartType=this.chartType}},updateChartCursor:function(){var a=this.chartCursor;a&&(a.x=this.marginLeftReal,a.y=this.marginTopReal,a.width=this.plotAreaWidth,a.height=this.plotAreaHeight,a.chart=this)},updateScrollbars:function(){},addChartCursor:function(a){AmCharts.callMethod("destroy",[this.chartCursor]);a&&(this.listenTo(a,"changed",this.handleCursorChange),this.listenTo(a,"zoomed",this.handleCursorZoom));this.chartCursor=a},removeChartCursor:function(){AmCharts.callMethod("destroy",[this.chartCursor]);
this.chartCursor=null},zoomTrendLines:function(){var a=this.trendLines;for(i=0;i<a.length;i++){var b=a[i];b.valueAxis.recalculateToPercents?b.set&&b.set.hide():(b.x=this.marginLeftReal+this.horizontalPosition,b.y=this.marginTopReal+this.verticalPosition,b.draw())}},addTrendLine:function(a){this.trendLines.push(a)},removeTrendLine:function(a){for(var b=this.trendLines,d=b.length-1;0<=d;d--)b[d]==a&&b.splice(d,1)},adjustMargins:function(a,b){var d=a.scrollbarHeight;"top"==a.position?b?this.marginLeftReal+=
d:this.marginTopReal+=d:b?this.marginRightReal+=d:this.marginBottomReal+=d},getScrollbarPosition:function(a,b,d){a.position=b?"bottom"==d||"left"==d?"bottom":"top":"top"==d||"right"==d?"bottom":"top"},updateChartScrollbar:function(a,b){if(a){a.rotate=b;var d=this.marginTopReal,e=this.marginLeftReal,f=a.scrollbarHeight,g=this.dx,h=this.dy;"top"==a.position?b?(a.y=d,a.x=e-f):(a.y=d-f+h,a.x=e+g):b?(a.y=d+h,a.x=e+this.plotAreaWidth+g):(a.y=d+this.plotAreaHeight+1,a.x=this.marginLeftReal)}},showZB:function(a){var b=
this.zbSet;b&&(a?b.show():b.hide(),this.zbBG.hide())},handleReleaseOutside:function(a){AmCharts.AmRectangularChart.base.handleReleaseOutside.call(this,a);(a=this.chartCursor)&&a.handleReleaseOutside()},handleMouseDown:function(a){AmCharts.AmRectangularChart.base.handleMouseDown.call(this,a);var b=this.chartCursor;b&&b.handleMouseDown(a)},handleCursorChange:function(){}});AmCharts.TrendLine=AmCharts.Class({construct:function(){this.createEvents("click");this.isProtected=!1;this.dashLength=0;this.lineColor="#00CC00";this.lineThickness=this.lineAlpha=1},draw:function(){var a=this;a.destroy();var b=a.chart,d=b.container,e,f,g,h,j=a.categoryAxis,k=a.initialDate,l=a.initialCategory,m=a.finalDate,p=a.finalCategory,q=a.valueAxis,n=a.valueAxisX,o=a.initialXValue,r=a.finalXValue,s=a.initialValue,t=a.finalValue,u=q.recalculateToPercents;j&&(k&&(e=j.dateToCoordinate(k)),l&&(e=
j.categoryToCoordinate(l)),m&&(f=j.dateToCoordinate(m)),p&&(f=j.categoryToCoordinate(p)));n&&!u&&(isNaN(o)||(e=n.getCoordinate(o)),isNaN(r)||(f=n.getCoordinate(r)));q&&!u&&(isNaN(s)||(g=q.getCoordinate(s)),isNaN(t)||(h=q.getCoordinate(t)));!isNaN(e)&&!isNaN(f)&&!isNaN(g)&&!isNaN(g)&&(b.rotate?(j=[g,h],f=[e,f]):(j=[e,f],f=[g,h]),g=a.lineColor,e=AmCharts.line(d,j,f,g,a.lineAlpha,a.lineThickness,a.dashLength),f=AmCharts.line(d,j,f,g,0.005,5),d=d.set([e,f]),d.translate(b.marginLeftReal,b.marginTopReal),
b.trendLinesSet.push(d),a.line=e,a.set=d,f.mouseup(function(){a.handleLineClick()}).mouseover(function(){a.handleLineOver()}).mouseout(function(){a.handleLineOut()}))},handleLineClick:function(){var a={type:"click",trendLine:this,chart:this.chart};this.fire(a.type,a)},handleLineOver:function(){var a=this.rollOverColor;void 0!=a&&this.line.attr({stroke:a})},handleLineOut:function(){this.line.attr({stroke:this.lineColor})},destroy:function(){AmCharts.remove(this.set)}});AmCharts.AmSerialChart=AmCharts.Class({inherits:AmCharts.AmRectangularChart,construct:function(){AmCharts.AmSerialChart.base.construct.call(this);this.createEvents("changed");this.columnSpacing=5;this.columnWidth=0.8;this.updateScrollbar=!0;var a=new AmCharts.CategoryAxis;a.chart=this;this.categoryAxis=a;this.chartType="serial";this.zoomOutOnDataUpdate=!0;this.skipZoom=!1;this.minSelectedTime=0},initChart:function(){AmCharts.AmSerialChart.base.initChart.call(this);this.updateCategoryAxis();this.dataChanged&&
(this.updateData(),this.dataChanged=!1,this.dispatchDataUpdated=!0);this.updateScrollbar=!0;this.drawChart();this.autoMargins&&!this.marginsUpdated&&(this.marginsUpdated=!0,this.measureMargins())},validateData:function(a){this.marginsUpdated=!1;this.zoomOutOnDataUpdate&&!a&&(this.endTime=this.end=this.startTime=this.start=NaN);AmCharts.AmSerialChart.base.validateData.call(this)},drawChart:function(){AmCharts.AmSerialChart.base.drawChart.call(this);var a=this.chartData;if(AmCharts.ifArray(a)){var b=
this.chartScrollbar;b&&b.draw();var b=a.length-1,d,e;d=this.categoryAxis;if(d.parseDates&&!d.equalSpacing){if(d=this.startTime,e=this.endTime,isNaN(d)||isNaN(e))d=a[0].time,e=a[b].time}else if(d=this.start,e=this.end,isNaN(d)||isNaN(e))d=0,e=b;this.endTime=this.startTime=this.end=this.start=void 0;this.zoom(d,e)}else this.cleanChart();this.chartCreated=!0;this.dispDUpd()},cleanChart:function(){AmCharts.callMethod("destroy",[this.valueAxes,this.graphs,this.categoryAxis,this.chartScrollbar,this.chartCursor])},
updateCategoryAxis:function(){var a=this.categoryAxis;a.id="categoryAxis";a.rotate=this.rotate;a.axisRenderer=AmCharts.RecAxis;a.guideFillRenderer=AmCharts.RecFill;a.axisItemRenderer=AmCharts.RecItem;a.setOrientation(!this.rotate);a.x=this.marginLeftReal;a.y=this.marginTopReal;a.dx=this.dx;a.dy=this.dy;a.width=this.plotAreaWidth;a.height=this.plotAreaHeight;a.viW=this.plotAreaWidth;a.viH=this.plotAreaHeight;a.viX=this.marginLeftReal;a.viY=this.marginTopReal;a.marginsChanged=!0},updateValueAxes:function(){AmCharts.AmSerialChart.base.updateValueAxes.call(this);
for(var a=this.valueAxes,b=0;b<a.length;b++){var d=a[b],e=this.rotate;d.rotate=e;d.setOrientation(e);e=this.categoryAxis;if(!e.startOnAxis||e.parseDates)d.expandMinMax=!0}},updateData:function(){this.parseData();var a=this.countColumns(),b=this.chartCursor;b&&b.updateData();for(var b=this.graphs,d=0;d<b.length;d++){var e=b[d];e.columnCount=a;e.data=this.chartData}},updateMargins:function(){AmCharts.AmSerialChart.base.updateMargins.call(this);var a=this.chartScrollbar;a&&(this.getScrollbarPosition(a,
this.rotate,this.categoryAxis.position),this.adjustMargins(a,this.rotate))},updateScrollbars:function(){this.updateChartScrollbar(this.chartScrollbar,this.rotate)},zoom:function(a,b){var d=this.categoryAxis;d.parseDates&&!d.equalSpacing?this.timeZoom(a,b):this.indexZoom(a,b);this.updateColumnsDepth()},timeZoom:function(a,b){var d=this.maxSelectedTime;if(!isNaN(d)&&(b!=this.endTime&&b-a>d&&(a=b-d,this.updateScrollbar=!0),a!=this.startTime&&b-a>d))b=a+d,this.updateScrollbar=!0;var e=this.minSelectedTime;
if(0<e&&b-a<e)var f=Math.round(a+(b-a)/2),e=Math.round(e/2),a=f-e,b=f+e;var g=this.chartData,f=this.categoryAxis;if(AmCharts.ifArray(g)&&(a!=this.startTime||b!=this.endTime)){var h=f.minDuration();this.firstTime=e=g[0].time;var j=g[g.length-1].time;this.lastTime=j;a||(a=e,isNaN(d)||(a=j-d));b||(b=j);a>j&&(a=j);b<e&&(b=e);a<e&&(a=e);b>j&&(b=j);b<a&&(b=a+h);this.startTime=a;this.endTime=b;d=g.length-1;h=this.getClosestIndex(g,"time",a,!0,0,d);g=this.getClosestIndex(g,"time",b,!1,h,d);f.timeZoom(a,b);
f.zoom(h,g);this.start=AmCharts.fitToBounds(h,0,d);this.end=AmCharts.fitToBounds(g,0,d);this.zoomAxesAndGraphs();this.zoomScrollbar();a!=e||b!=j?this.showZB(!0):this.showZB(!1);this.dispatchTimeZoomEvent()}},indexZoom:function(a,b){var d=this.maxSelectedSeries;if(!isNaN(d)&&(b!=this.end&&b-a>d&&(a=b-d,this.updateScrollbar=!0),a!=this.start&&b-a>d))b=a+d,this.updateScrollbar=!0;if(a!=this.start||b!=this.end){var e=this.chartData.length-1;isNaN(a)&&(a=0,isNaN(d)||(a=e-d));isNaN(b)&&(b=e);b<a&&(b=a);
b>e&&(b=e);a>e&&(a=e-1);0>a&&(a=0);this.start=a;this.end=b;this.categoryAxis.zoom(a,b);this.zoomAxesAndGraphs();this.zoomScrollbar();0!=a||b!=this.chartData.length-1?this.showZB(!0):this.showZB(!1);this.dispatchIndexZoomEvent()}},updateGraphs:function(){AmCharts.AmSerialChart.base.updateGraphs.call(this);for(var a=this.graphs,b=0;b<a.length;b++){var d=a[b];d.columnWidth=this.columnWidth;d.categoryAxis=this.categoryAxis}},updateColumnsDepth:function(){var a,b=this.graphs;AmCharts.remove(this.columnsSet);
this.columnsArray=[];for(a=0;a<b.length;a++){var d=b[a],e=d.columnsArray;if(e)for(var f=0;f<e.length;f++)this.columnsArray.push(e[f])}this.columnsArray.sort(this.compareDepth);if(0<this.columnsArray.length){b=this.container.set();this.columnSet.push(b);for(a=0;a<this.columnsArray.length;a++)b.push(this.columnsArray[a].column.set);d&&b.translate(d.x,d.y);this.columnsSet=b}},compareDepth:function(a,b){return a.depth>b.depth?1:-1},zoomScrollbar:function(){var a=this.chartScrollbar,b=this.categoryAxis;
a&&this.updateScrollbar&&(b.parseDates&&!b.equalSpacing?a.timeZoom(this.startTime,this.endTime):a.zoom(this.start,this.end),this.updateScrollbar=!0)},updateTrendLines:function(){for(var a=this.trendLines,b=0;b<a.length;b++){var d=a[b];d.chart=this;d.valueAxis||(d.valueAxis=this.valueAxes[0]);d.categoryAxis=this.categoryAxis}},zoomAxesAndGraphs:function(){if(!this.scrollbarOnly){for(var a=this.valueAxes,b=0;b<a.length;b++)a[b].zoom(this.start,this.end);a=this.graphs;for(b=0;b<a.length;b++)a[b].zoom(this.start,
this.end);this.zoomTrendLines();(b=this.chartCursor)&&b.zoom(this.start,this.end,this.startTime,this.endTime)}},countColumns:function(){for(var a=0,b=this.valueAxes.length,d=this.graphs.length,e,f,g=!1,h,j=0;j<b;j++){f=this.valueAxes[j];var k=f.stackType;if("100%"==k||"regular"==k){g=!1;for(h=0;h<d;h++)e=this.graphs[h],!e.hidden&&e.valueAxis==f&&"column"==e.type&&(!g&&e.stackable&&(a++,g=!0),e.stackable||a++,e.columnIndex=a-1)}if("none"==k||"3d"==k)for(h=0;h<d;h++)e=this.graphs[h],!e.hidden&&e.valueAxis==
f&&"column"==e.type&&(e.columnIndex=a,a++);if("3d"==k){for(j=0;j<d;j++)e=this.graphs[j],e.depthCount=a;a=1}}return a},parseData:function(){AmCharts.AmSerialChart.base.parseData.call(this);this.parseSerialData()},getCategoryIndexByValue:function(a){for(var b=this.chartData,d,e=0;e<b.length;e++)b[e].category==a&&(d=e);return d},handleCursorChange:function(a){this.updateLegendValues(a.index)},handleCursorZoom:function(a){this.updateScrollbar=!0;this.zoom(a.start,a.end)},handleScrollbarZoom:function(a){this.updateScrollbar=
!1;this.zoom(a.start,a.end)},dispatchTimeZoomEvent:function(){if(this.prevStartTime!=this.startTime||this.prevEndTime!=this.endTime){var a={type:"zoomed"};a.startDate=new Date(this.startTime);a.endDate=new Date(this.endTime);a.startIndex=this.start;a.endIndex=this.end;this.startIndex=this.start;this.endIndex=this.end;this.prevStartTime=this.startTime;this.prevEndTime=this.endTime;var b=this.categoryAxis,d=AmCharts.extractPeriod(b.minPeriod).period,b=b.dateFormatsObject[d];a.startValue=AmCharts.formatDate(a.startDate,
b);a.endValue=AmCharts.formatDate(a.endDate,b);a.chart=this;a.target=this;this.fire(a.type,a)}},dispatchIndexZoomEvent:function(){if(this.prevStartIndex!=this.start||this.prevEndIndex!=this.end){this.startIndex=this.start;this.endIndex=this.end;var a=this.chartData;if(AmCharts.ifArray(a)&&!isNaN(this.start)&&!isNaN(this.end)){var b={chart:this,target:this,type:"zoomed"};b.startIndex=this.start;b.endIndex=this.end;b.startValue=a[this.start].category;b.endValue=a[this.end].category;this.categoryAxis.parseDates&&
(this.startTime=a[this.start].time,this.endTime=a[this.end].time,b.startDate=new Date(this.startTime),b.endDate=new Date(this.endTime));this.prevStartIndex=this.start;this.prevEndIndex=this.end;this.fire(b.type,b)}}},updateLegendValues:function(a){for(var b=this.graphs,d=0;d<b.length;d++){var e=b[d];e.currentDataItem=isNaN(a)?void 0:this.chartData[a].axes[e.valueAxis.id].graphs[e.id]}this.legend&&this.legend.updateValues()},getClosestIndex:function(a,b,d,e,f,g){0>f&&(f=0);g>a.length-1&&(g=a.length-
1);var h=f+Math.round((g-f)/2),j=a[h][b];if(1>=g-f){if(e)return f;e=a[g][b];return Math.abs(a[f][b]-d)<Math.abs(e-d)?f:g}return d==j?h:d<j?this.getClosestIndex(a,b,d,e,f,h):this.getClosestIndex(a,b,d,e,h,g)},zoomToIndexes:function(a,b){this.updateScrollbar=!0;var d=this.chartData;if(d){var e=d.length;0<e&&(0>a&&(a=0),b>e-1&&(b=e-1),e=this.categoryAxis,e.parseDates&&!e.equalSpacing?this.zoom(d[a].time,d[b].time):this.zoom(a,b))}},zoomToDates:function(a,b){this.updateScrollbar=!0;var d=this.chartData;
if(this.categoryAxis.equalSpacing){var e=this.getClosestIndex(d,"time",a.getTime(),!0,0,d.length),d=this.getClosestIndex(d,"time",b.getTime(),!1,0,d.length);this.zoom(e,d)}else this.zoom(a.getTime(),b.getTime())},zoomToCategoryValues:function(a,b){this.updateScrollbar=!0;this.zoom(this.getCategoryIndexByValue(a),this.getCategoryIndexByValue(b))},formatString:function(a,b){var d=b.graph;if(-1!=a.indexOf("[[category]]")){var e=b.serialDataItem.category;if(this.categoryAxis.parseDates){var f=this.balloonDateFormat,
g=this.chartCursor;g&&(f=g.categoryBalloonDateFormat);-1!=a.indexOf("[[category]]")&&(f=AmCharts.formatDate(e,f),-1!=f.indexOf("fff")&&(f=AmCharts.formatMilliseconds(f,e)),e=f)}a=a.replace(/\[\[category\]\]/g,""+e)}d=d.numberFormatter;d||(d=this.numberFormatter);e=b.graph.valueAxis;if((f=e.duration)&&!isNaN(b.values.value))e=AmCharts.formatDuration(b.values.value,f,"",e.durationUnits,e.maxInterval,d),a=a.replace(RegExp("\\[\\[value\\]\\]","g"),e);e=["value","open","low","high","close"];f=this.percentFormatter;
a=AmCharts.formatValue(a,b.percents,e,f,"percents.");a=AmCharts.formatValue(a,b.values,e,d,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=AmCharts.formatValue(a,b.values,["percents"],f);-1!=a.indexOf("[[")&&(a=AmCharts.formatDataContextValue(a,b.dataContext));return a=AmCharts.AmSerialChart.base.formatString.call(this,a,b)},addChartScrollbar:function(a){AmCharts.callMethod("destroy",[this.chartScrollbar]);a&&(a.chart=this,this.listenTo(a,"zoomed",this.handleScrollbarZoom));
this.rotate?void 0==a.width&&(a.width=a.scrollbarHeight):void 0==a.height&&(a.height=a.scrollbarHeight);this.chartScrollbar=a},removeChartScrollbar:function(){AmCharts.callMethod("destroy",[this.chartScrollbar]);this.chartScrollbar=null},handleReleaseOutside:function(a){AmCharts.AmSerialChart.base.handleReleaseOutside.call(this,a);AmCharts.callMethod("handleReleaseOutside",[this.chartScrollbar])}});AmCharts.AmRadarChart=AmCharts.Class({inherits:AmCharts.AmCoordinateChart,construct:function(){AmCharts.AmRadarChart.base.construct.call(this);this.marginRight=this.marginBottom=this.marginTop=this.marginLeft=0;this.chartType="radar";this.radius="35%"},initChart:function(){AmCharts.AmRadarChart.base.initChart.call(this);this.dataChanged&&(this.updateData(),this.dataChanged=!1,this.dispatchDataUpdated=!0);this.drawChart()},updateData:function(){this.parseData();for(var a=this.graphs,b=0;b<a.length;b++)a[b].data=
this.chartData},updateGraphs:function(){for(var a=this.graphs,b=0;b<a.length;b++){var d=a[b];d.index=b;d.width=this.realRadius;d.height=this.realRadius;d.x=this.marginLeftReal;d.y=this.marginTopReal;d.chartType=this.chartType}},parseData:function(){AmCharts.AmRadarChart.base.parseData.call(this);this.parseSerialData()},updateValueAxes:function(){for(var a=this.valueAxes,b=0;b<a.length;b++){var d=a[b];d.axisRenderer=AmCharts.RadAxis;d.guideFillRenderer=AmCharts.RadarFill;d.axisItemRenderer=AmCharts.RadItem;
d.autoGridCount=!1;d.x=this.marginLeftReal;d.y=this.marginTopReal;d.width=this.realRadius;d.height=this.realRadius}},drawChart:function(){AmCharts.AmRadarChart.base.drawChart.call(this);var a=this.updateWidth(),b=this.updateHeight(),d=this.marginTop+this.getTitleHeight(),e=this.marginLeft,b=b-d-this.marginBottom;this.marginLeftReal=e+(a-e-this.marginRight)/2;this.marginTopReal=d+b/2;this.realRadius=AmCharts.toCoordinate(this.radius,a,b);this.updateValueAxes();this.updateGraphs();a=this.chartData;
if(AmCharts.ifArray(a)){a=a.length-1;e=this.valueAxes;for(d=0;d<e.length;d++)e[d].zoom(0,a);e=this.graphs;for(d=0;d<e.length;d++)e[d].zoom(0,a)}else this.cleanChart();this.chartCreated=!0;this.dispDUpd()},formatString:function(a,b){var d=b.graph;-1!=a.indexOf("[[category]]")&&(a=a.replace(/\[\[category\]\]/g,""+b.serialDataItem.category));d=d.numberFormatter;d||(d=this.numberFormatter);a=AmCharts.formatValue(a,b.values,["value"],d,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);
return a=AmCharts.AmRadarChart.base.formatString.call(this,a,b)},cleanChart:function(){this.callMethod("destroy",[this.valueAxes,this.graphs])}});AmCharts.AxisBase=AmCharts.Class({construct:function(){this.viY=this.viX=this.y=this.x=this.dy=this.dx=0;this.axisWidth;this.axisThickness=1;this.axisColor="#000000";this.axisAlpha=1;this.gridCount=this.tickLength=5;this.gridAlpha=0.15;this.gridThickness=1;this.gridColor="#000000";this.dashLength=0;this.labelFrequency=1;this.showLastLabel=this.showFirstLabel=!0;this.fillColor="#FFFFFF";this.fillAlpha=0;this.labelsEnabled=!0;this.labelRotation=0;this.autoGridCount=!0;this.valueRollOverColor="#CC0000";
this.offset=0;this.guides=[];this.visible=!0;this.counter=0;this.guides=[];this.ignoreAxisWidth=this.inside=!1;this.titleColor;this.titleFontSize;this.titleBold=!0},zoom:function(a,b){this.start=a;this.end=b;this.dataChanged=!0;this.draw()},fixAxisPosition:function(){var a=this.position;"H"==this.orientation?("left"==a&&(a="bottom"),"right"==a&&(a="top")):("bottom"==a&&(a="left"),"top"==a&&(a="right"));this.position=a},draw:function(){var a=this.chart;void 0==this.titleColor&&(this.titleColor=a.color);
isNaN(this.titleFontSize)&&(this.titleFontSize=a.fontSize+1);this.allLabels=[];this.counter=0;this.destroy();this.fixAxisPosition();this.labels=[];var b=a.container,d=b.set();a.gridSet.push(d);this.set=d;b=b.set();a.axesLabelsSet.push(b);this.labelsSet=b;this.axisLine=new this.axisRenderer(this);this.autoGridCount&&("V"==this.orientation?(a=this.height/35,3>a&&(a=3)):a=this.width/75,this.gridCount=a);this.axisWidth=this.axisLine.axisWidth;this.addTitle()},setOrientation:function(a){this.orientation=
a?"H":"V"},addTitle:function(){var a=this.title;if(a){var b=this.chart;this.titleLabel=AmCharts.text(b.container,a,this.titleColor,b.fontFamily,this.titleFontSize,"middle",this.titleBold)}},positionTitle:function(){var a=this.titleLabel;if(a){var b,d,e=this.labelsSet,f=e.getBBox();e.push(a);var e=f.x,g=f.y;AmCharts.VML&&(this.rotate?e-=this.x:g-=this.y);var h=f.width,f=f.height,j=this.viW,k=this.viH;a.getBBox();var l=0,m=this.titleFontSize/2,p=this.inside;switch(this.position){case "top":b=j/2;d=
g-10-m;break;case "bottom":b=j/2;d=g+f+10+m;break;case "left":b=e-10-m;p&&(b-=5);d=k/2;l=-90;break;case "right":b=e+h+10+m-3,p&&(b+=7),d=k/2,l=-90}this.marginsChanged?(a.translate(b,d),this.tx=b,this.ty=d):a.translate(this.tx,this.ty);this.marginsChanged=!1;0!=l&&a.rotate(l)}},pushAxisItem:function(a){var b=a.graphics();0<b.length()&&this.set.push(b);(a=a.getLabel())&&this.labelsSet.push(a)},addGuide:function(a){this.guides.push(a)},removeGuide:function(a){for(var b=this.guides,d=0;d<b.length;d++)b[d]==
a&&b.splice(d,1)},handleGuideOver:function(a){clearTimeout(this.chart.hoverInt);var b=a.graphics.getBBox(),d=b.x+b.width/2,b=b.y+b.height/2,e=a.fillColor;void 0==e&&(e=a.lineColor);this.chart.showBalloon(a.balloonText,e,!0,d,b)},handleGuideOut:function(){this.chart.hideBalloon()},addEventListeners:function(a,b){var d=this;a.mouseover(function(){d.handleGuideOver(b)});a.mouseout(function(){d.handleGuideOut(b)})},getBBox:function(){var a=this.labelsSet.getBBox();AmCharts.VML||(a={x:a.x+this.x,y:a.y+
this.y,width:a.width,height:a.height});return a},destroy:function(){AmCharts.remove(this.set);AmCharts.remove(this.labelsSet);var a=this.axisLine;a&&AmCharts.remove(a.set);AmCharts.remove(this.grid0)}});AmCharts.ValueAxis=AmCharts.Class({inherits:AmCharts.AxisBase,construct:function(){this.createEvents("axisChanged","logarithmicAxisFailed","axisSelfZoomed","axisZoomed");AmCharts.ValueAxis.base.construct.call(this);this.dataChanged=!0;this.gridCount=8;this.stackType="none";this.position="left";this.unitPosition="right";this.recalculateToPercents=this.includeHidden=this.includeGuidesInMinMax=this.integersOnly=!1;this.duration;this.durationUnits={DD:"d. ",hh:":",mm:":",ss:""};this.scrollbar=!1;this.maxDecCount;
this.baseValue=0;this.radarCategoriesEnabled=!0;this.gridType="polygons";this.useScientificNotation=!1;this.axisTitleOffset=10},updateData:function(){0>=this.gridCount&&(this.gridCount=1);this.data=this.chart.chartData;"xy"!=this.chart.chartType&&(this.stackGraphs("smoothedLine"),this.stackGraphs("line"),this.stackGraphs("column"),this.stackGraphs("step"));this.recalculateToPercents&&this.recalculate();this.synchronizationMultiplyer&&this.synchronizeWithAxis?this.foundGraphs=!0:(this.foundGraphs=
!1,this.getMinMax())},draw:function(){AmCharts.ValueAxis.base.draw.call(this);var a=this.chart,b=this.set;"duration"==this.type&&(this.duration="ss");!0==this.dataChanged&&(this.updateData(),this.dataChanged=!1);if(this.logarithmic&&(0>=this.getMin(0,this.data.length-1)||0>=this.minimum))this.fire("logarithmicAxisFailed",{type:"logarithmicAxisFailed",chart:a});else{this.grid0=null;var d,e,f=a.dx,g=a.dy,h=!1,j=this.logarithmic,k=a.chartType;if(!isNaN(this.min)&&!isNaN(this.max)&&this.foundGraphs&&
Infinity!=this.min&&-Infinity!=this.max){var l=this.labelFrequency,m=this.showFirstLabel,p=this.showLastLabel,q=1,n=0,o=Math.round((this.max-this.min)/this.step)+1;if(!0==j){var r=Math.log(this.max)*Math.LOG10E-Math.log(this.minReal)*Math.LOG10E;this.stepWidth=this.axisWidth/r;2<r&&(o=Math.ceil(Math.log(this.max)*Math.LOG10E)+1,n=Math.round(Math.log(this.minReal)*Math.LOG10E),o>this.gridCount&&(q=Math.ceil(o/this.gridCount)))}else this.stepWidth=this.axisWidth/(this.max-this.min);d=0;1>this.step&&
-1<this.step&&(e=this.step.toString(),d=-1!=e.indexOf("e-")?Number(e.split("-")[1]):e.split(".")[1].length);this.integersOnly&&(d=0);d>this.maxDecCount&&(d=this.maxDecCount);isNaN(this.precision)||(d=this.precision);this.max=AmCharts.roundTo(this.max,this.maxDecCount);this.min=AmCharts.roundTo(this.min,this.maxDecCount);var s={};s.precision=d;s.decimalSeparator=a.numberFormatter.decimalSeparator;s.thousandsSeparator=a.numberFormatter.thousandsSeparator;this.numberFormatter=s;var t=this.guides,u=t.length;
if(0<u){var x=this.fillAlpha;for(e=this.fillAlpha=0;e<u;e++){var y=t[e],D=NaN;if(!isNaN(y.toValue)){var D=this.getCoordinate(y.toValue),v=new this.axisItemRenderer(this,D,"",!0,NaN,NaN,y);this.pushAxisItem(v)}var B=NaN;isNaN(y.value)||(B=this.getCoordinate(y.value),v=new this.axisItemRenderer(this,B,y.label,!0,NaN,(D-B)/2,y),this.pushAxisItem(v));isNaN(D-B)||(v=new this.guideFillRenderer(this,B,D,y),this.pushAxisItem(v),v=v.graphics(),y.graphics=v,y.balloonText&&this.addEventListeners(v,y))}this.fillAlpha=
x}t=!1;for(e=n;e<o;e+=q)v=AmCharts.roundTo(this.step*e+this.min,d),-1!=(""+v).indexOf("e")&&(t=!0,(""+v).split("e"));this.duration&&(this.maxInterval=AmCharts.getMaxInterval(this.max,this.duration));for(e=n;e<o;e+=q)if(n=this.step*e+this.min,n=AmCharts.roundTo(n,this.maxDecCount+1),!(this.integersOnly&&Math.round(n)!=n)){!0==j&&(0==n&&(n=this.minReal),2<r&&(n=Math.pow(10,e)),t=-1!=(""+n).indexOf("e")?!0:!1);this.useScientificNotation&&(t=!0);this.usePrefixes&&(t=!1);t?(v=-1==(""+n).indexOf("e")?n.toExponential(15):
""+n,v=v.split("e"),d=Number(v[0]),v=Number(v[1]),10==d&&(d=1,v+=1),v=d+"e"+v,0==n&&(v="0"),1==n&&(v="1")):(j&&(d=(""+n).split("."),s.precision=d[1]?d[1].length:-1),v=this.usePrefixes?AmCharts.addPrefix(n,a.prefixesOfBigNumbers,a.prefixesOfSmallNumbers,s):AmCharts.formatNumber(n,s,s.precision));this.duration&&(v=AmCharts.formatDuration(n,this.duration,"",this.durationUnits,this.maxInterval,s));this.recalculateToPercents?v+="%":(d=this.unit)&&(v="left"==this.unitPosition?d+v:v+d);Math.round(e/l)!=
e/l&&(v=void 0);if(0==e&&!m||e==o-1&&!p)v=" ";d=this.getCoordinate(n);v=new this.axisItemRenderer(this,d,v);this.pushAxisItem(v);if(n==this.baseValue&&"radar"!=k){var O,E,u=this.viW,x=this.viH,n=this.viX,v=this.viY;"H"==this.orientation?0<=d&&d<=u+1&&(O=[d,d,d+f],E=[x,0,g]):0<=d&&d<=x+1&&(O=[0,u,u+f],E=[d,d,d+g]);O&&(d=AmCharts.fitToBounds(2*this.gridAlpha,0,1),d=AmCharts.line(a.container,O,E,this.gridColor,d,1,this.dashLength),d.translate(n,v),this.grid0=d,a.axesSet.push(d),d.toBack())}}f=this.baseValue;
this.min>this.baseValue&&this.max>this.baseValue&&(f=this.min);this.min<this.baseValue&&this.max<this.baseValue&&(f=this.max);j&&f<this.minReal&&(f=this.minReal);this.baseCoord=this.getCoordinate(f);a={type:"axisChanged",target:this,chart:a};a.min=j?this.minReal:this.min;a.max=this.max;this.fire("axisChanged",a);this.axisCreated=!0}else h=!0;j=this.axisLine.set;a=this.labelsSet;this.positionTitle();"radar"!=k?(k=this.viX,f=this.viY,b.translate(k,f),a.translate(k,f)):j.toFront();!this.visible||h?(b.hide(),
j.hide(),a.hide()):(b.show(),j.show(),a.show())}},stackGraphs:function(a){var b=this.stackType;"stacked"==b&&(b="regular");"line"==b&&(b="none");"100% stacked"==b&&(b="100%");this.stackType=b;var d=[],e=[],f=[],g=[],h,j=this.chart.graphs,k,l,m,p=this.baseValue;if(("line"==a||"step"==a||"smoothedLine"==a)&&("regular"==b||"100%"==b))for(m=0;m<j.length;m++)h=j[m],h.hidden||(l=h.type,h.chart==this.chart&&h.valueAxis==this&&a==l&&h.stackable&&(k&&(h.stackGraph=k),k=h));for(k=this.start;k<=this.end;k++)for(m=
0;m<j.length;m++)if(h=j[m],!h.hidden&&(l=h.type,h.chart==this.chart&&h.valueAxis==this&&a==l&&h.stackable&&(l=this.data[k].axes[this.id].graphs[h.id],h=l.values.value,!isNaN(h)&&(g[k]=isNaN(g[k])?Math.abs(h):g[k]+Math.abs(h),"regular"==b)))){if("line"==a||"step"==a||"smoothedLine"==a)isNaN(d[k])?(d[k]=h,l.values.close=h,l.values.open=this.baseValue):(l.values.close=isNaN(h)?d[k]:h+d[k],l.values.open=d[k],d[k]=l.values.close);"column"==a&&!isNaN(h)&&(l.values.close=h,0>h?(l.values.close=h,isNaN(e[k])?
l.values.open=p:(l.values.close+=e[k],l.values.open=e[k]),e[k]=l.values.close):(l.values.close=h,isNaN(f[k])?l.values.open=p:(l.values.close+=f[k],l.values.open=f[k]),f[k]=l.values.close))}for(k=this.start;k<=this.end;k++)for(m=0;m<j.length;m++)h=j[m],h.hidden||(l=h.type,h.chart==this.chart&&h.valueAxis==this&&a==l&&h.stackable&&(l=this.data[k].axes[this.id].graphs[h.id],h=l.values.value,isNaN(h)||(d=100*(h/g[k]),l.values.percents=d,l.values.total=g[k],"100%"==b&&(isNaN(e[k])&&(e[k]=0),isNaN(f[k])&&
(f[k]=0),0>d?(l.values.close=d+e[k],l.values.open=e[k],e[k]=l.values.close):(l.values.close=d+f[k],l.values.open=f[k],f[k]=l.values.close)))))},recalculate:function(){for(var a=this.chart.graphs,b=0;b<a.length;b++){var d=a[b];if(d.valueAxis==this){var e="value";if("candlestick"==d.type||"ohlc"==d.type)e="open";var f,g,h=this.end+2,h=AmCharts.fitToBounds(this.end+1,0,this.data.length-1),j=this.start;0<j&&j--;for(var k=this.start;k<=h&&!(g=this.data[k].axes[this.id].graphs[d.id],f=g.values[e],!isNaN(f));k++);
for(e=j;e<=h;e++){g=this.data[e].axes[this.id].graphs[d.id];g.percents={};var j=g.values,l;for(l in j)g.percents[l]="percents"!=l?100*(j[l]/f)-100:j[l]}}}},getMinMax:function(){for(var a=!1,b=this.chart,d=b.graphs,e=0;e<d.length;e++){var f=d[e].type;if("line"==f||"step"==f||"smoothedLine"==f)this.expandMinMax&&(a=!0)}a&&(0<this.start&&this.start--,this.end<this.data.length-1&&this.end++);"serial"==b.chartType&&!0==b.categoryAxis.parseDates&&!a&&this.end<this.data.length-1&&this.end++;this.min=this.getMin(this.start,
this.end);this.max=this.getMax();a=this.guides.length;if(this.includeGuidesInMinMax&&0<a)for(b=0;b<a;b++)if(d=this.guides[b],d.toValue<this.min&&(this.min=d.toValue),d.value<this.min&&(this.min=d.value),d.toValue>this.max&&(this.max=d.toValue),d.value>this.max)this.max=d.value;isNaN(this.minimum)||(this.min=this.minimum);isNaN(this.maximum)||(this.max=this.maximum);this.min>this.max&&(a=this.max,this.max=this.min,this.min=a);isNaN(this.minTemp)||(this.min=this.minTemp);isNaN(this.maxTemp)||(this.max=
this.maxTemp);this.minReal=this.min;this.maxReal=this.max;0==this.min&&0==this.max&&(this.max=9);this.min>this.max&&(this.min=this.max-1);a=this.min;b=this.max;d=this.max-this.min;e=0==d?Math.pow(10,Math.floor(Math.log(Math.abs(this.max))*Math.LOG10E))/10:Math.pow(10,Math.floor(Math.log(Math.abs(d))*Math.LOG10E))/10;isNaN(this.maximum)&&isNaN(this.maxTemp)&&(this.max=Math.ceil(this.max/e)*e+e);isNaN(this.minimum)&&isNaN(this.minTemp)&&(this.min=Math.floor(this.min/e)*e-e);0>this.min&&0<=a&&(this.min=
0);0<this.max&&0>=b&&(this.max=0);"100%"==this.stackType&&(this.min=0>this.min?-100:0,this.max=0>this.max?0:100);d=this.max-this.min;e=Math.pow(10,Math.floor(Math.log(Math.abs(d))*Math.LOG10E))/10;this.step=Math.ceil(d/this.gridCount/e)*e;d=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E));d=d.toExponential(0).split("e");e=Number(d[1]);9==Number(d[0])&&e++;d=this.generateNumber(1,e);e=Math.ceil(this.step/d);5<e&&(e=10);5>=e&&2<e&&(e=5);this.step=Math.ceil(this.step/(d*e))*d*e;1>d?
(this.maxDecCount=Math.abs(Math.log(Math.abs(d))*Math.LOG10E),this.maxDecCount=Math.round(this.maxDecCount),this.step=AmCharts.roundTo(this.step,this.maxDecCount+1)):this.maxDecCount=0;this.min=this.step*Math.floor(this.min/this.step);this.max=this.step*Math.ceil(this.max/this.step);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);1<this.minReal&&1<this.max-this.minReal&&(this.minReal=Math.floor(this.minReal));d=Math.pow(10,Math.floor(Math.log(Math.abs(this.minReal))*Math.LOG10E));0==
this.min&&(this.minReal=d);0==this.min&&1<this.minReal&&(this.minReal=1);0<this.min&&0<this.minReal-this.step&&(this.minReal=this.min+this.step<this.minReal?this.min+this.step:this.min);d=Math.log(b)*Math.LOG10E-Math.log(a)*Math.LOG10E;this.logarithmic&&(2<d?(this.minReal=this.min=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E)),this.max=Math.pow(10,Math.ceil(Math.log(Math.abs(b))*Math.LOG10E))):(b=Math.pow(10,Math.floor(Math.log(Math.abs(this.min))*Math.LOG10E))/10,a=Math.pow(10,Math.floor(Math.log(Math.abs(a))*
Math.LOG10E))/10,b<a&&(this.minReal=this.min=10*a)))},generateNumber:function(a,b){var d="",e;e=0>b?Math.abs(b)-1:Math.abs(b);for(var f=0;f<e;f++)d+="0";return 0>b?Number("0."+d+(""+a)):Number(""+a+d)},getMin:function(a,b){for(var d,e=a;e<=b;e++){var f=this.data[e].axes[this.id].graphs,g;for(g in f){var h=this.chart.getGraphById(g);if(h.includeInMinMax&&(!h.hidden||this.includeHidden)){isNaN(d)&&(d=Infinity);this.foundGraphs=!0;h=f[g].values;this.recalculateToPercents&&(h=f[g].percents);var j;if(this.minMaxField)j=
h[this.minMaxField],j<d&&(d=j);else for(var k in h)"percents"!=k&&"total"!=k&&(j=h[k],j<d&&(d=j))}}}return d},getMax:function(){for(var a,b=this.start;b<=this.end;b++){var d=this.data[b].axes[this.id].graphs,e;for(e in d){var f=this.chart.getGraphById(e);if(f.includeInMinMax&&(!f.hidden||this.includeHidden)){isNaN(a)&&(a=-Infinity);this.foundGraphs=!0;f=d[e].values;this.recalculateToPercents&&(f=d[e].percents);var g;if(this.minMaxField)g=f[this.minMaxField],g>a&&(a=g);else for(var h in f)"percents"!=
h&&"total"!=h&&(g=f[h],g>a&&(a=g))}}}return a},dispatchZoomEvent:function(a,b){var d={type:"axisZoomed",startValue:a,endValue:b,target:this,chart:this.chart};this.fire(d.type,d)},zoomToValues:function(a,b){if(b<a)var d=b,b=a,a=d;a<this.min&&(a=this.min);b>this.max&&(b=this.max);d={type:"axisSelfZoomed"};d.chart=this.chart;d.valueAxis=this;d.multiplyer=this.axisWidth/Math.abs(this.getCoordinate(b)-this.getCoordinate(a));d.position="V"==this.orientation?this.reversed?this.getCoordinate(a)-this.y:this.getCoordinate(b)-
this.y:this.reversed?this.getCoordinate(b)-this.x:this.getCoordinate(a)-this.x;this.fire(d.type,d)},coordinateToValue:function(a){if(isNaN(a))return NaN;var b=this.axisWidth,d=this.stepWidth,e=this.reversed,f=this.rotate,g=this.min,h=this.minReal;return!0==this.logarithmic?Math.pow(10,(f?!0==e?(b-a)/d:a/d:!0==e?a/d:(b-a)/d)+Math.log(h)*Math.LOG10E):!0==e?f?g-(a-b)/d:a/d+g:f?a/d+g:g-(a-b)/d},getCoordinate:function(a){if(isNaN(a))return NaN;var b=this.rotate,d=this.reversed,e=this.axisWidth,f=this.stepWidth,
g=this.min,h=this.minReal;!0==this.logarithmic?(a=Math.log(a)*Math.LOG10E-Math.log(h)*Math.LOG10E,b=b?!0==d?e-f*a:f*a:!0==d?f*a:e-f*a):b=!0==d?b?e-f*(a-g):f*(a-g):b?f*(a-g):e-f*(a-g);b=this.rotate?b+(this.x-this.viX):b+(this.y-this.viY);return Math.round(b)},synchronizeWithAxis:function(a){this.synchronizeWithAxis=a;this.removeListener(this.synchronizeWithAxis,"axisChanged",this.handleSynchronization);this.listenTo(this.synchronizeWithAxis,"axisChanged",this.handleSynchronization)},handleSynchronization:function(){var a=
this.synchronizeWithAxis,b=a.min,d=a.max,a=a.step,e=this.synchronizationMultiplyer;e&&(this.min=b*e,this.max=d*e,this.step=a*e,b=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E)),b=Math.abs(Math.log(Math.abs(b))*Math.LOG10E),this.maxDecCount=b=Math.round(b),this.draw())}});AmCharts.CategoryAxis=AmCharts.Class({inherits:AmCharts.AxisBase,construct:function(){AmCharts.CategoryAxis.base.construct.call(this);this.minPeriod="DD";this.equalSpacing=this.parseDates=!1;this.position="bottom";this.startOnAxis=!1;this.firstDayOfWeek=1;this.gridPosition="middle";this.boldPeriodBeginning=!0;this.periods=[{period:"ss",count:1},{period:"ss",count:5},{period:"ss",count:10},{period:"ss",count:30},{period:"mm",count:1},{period:"mm",count:5},{period:"mm",count:10},{period:"mm",count:30},
{period:"hh",count:1},{period:"hh",count:3},{period:"hh",count:6},{period:"hh",count:12},{period:"DD",count:1},{period:"WW",count:1},{period:"MM",count:1},{period:"MM",count:2},{period:"MM",count:3},{period:"MM",count:6},{period:"YYYY",count:1},{period:"YYYY",count:2},{period:"YYYY",count:5},{period:"YYYY",count:10},{period:"YYYY",count:50},{period:"YYYY",count:100}];this.dateFormats=[{period:"fff",format:"JJ:NN:SS"},{period:"ss",format:"JJ:NN:SS"},{period:"mm",format:"JJ:NN"},{period:"hh",format:"JJ:NN"},
{period:"DD",format:"MMM DD"},{period:"WW",format:"MMM DD"},{period:"MM",format:"MMM"},{period:"YYYY",format:"YYYY"}];this.nextPeriod={};this.nextPeriod.fff="ss";this.nextPeriod.ss="mm";this.nextPeriod.mm="hh";this.nextPeriod.hh="DD";this.nextPeriod.DD="MM";this.nextPeriod.MM="YYYY"},draw:function(){AmCharts.CategoryAxis.base.draw.call(this);this.generateDFObject();var a=this.chart.chartData;this.data=a;if(AmCharts.ifArray(a)){var b=this.chart,d=this.start,e=this.labelFrequency,f=0,g=this.end-d+1,
h=this.gridCount,j=this.showFirstLabel,k=this.showLastLabel,l,m="",m=AmCharts.extractPeriod(this.minPeriod);l=AmCharts.getPeriodDuration(m.period,m.count);var p,q,n,o,r;p=this.rotate;var s=this.firstDayOfWeek,a=AmCharts.resetDateToMin(new Date(a[a.length-1].time+1.05*l),this.minPeriod,1,s).getTime();this.endTime>a&&(this.endTime=a);if(this.parseDates&&!this.equalSpacing){if(this.timeDifference=this.endTime-this.startTime,d=this.choosePeriod(0),e=d.period,p=d.count,q=AmCharts.getPeriodDuration(e,p),
q<l&&(e=m.period,p=m.count,q=l),a=e,"WW"==a&&(a="DD"),this.stepWidth=this.getStepWidth(this.timeDifference),h=Math.ceil(this.timeDifference/q)+1,m=AmCharts.resetDateToMin(new Date(this.startTime-q),e,p,s).getTime(),a==e&&1==p&&(n=q*this.stepWidth),this.cellWidth=l*this.stepWidth,g=Math.round(m/q),d=-1,g/2==Math.round(g/2)&&(d=-2,m-=q),0<this.gridCount)for(g=d;g<=h;g++){o=m+1.5*q;o=AmCharts.resetDateToMin(new Date(o),e,p,s).getTime();l=(o-this.startTime)*this.stepWidth;r=!1;this.nextPeriod[a]&&(r=
this.checkPeriodChange(this.nextPeriod[a],1,o,m));var t=!1;r?(m=this.dateFormatsObject[this.nextPeriod[a]],t=!0):m=this.dateFormatsObject[a];this.boldPeriodBeginning||(t=!1);m=AmCharts.formatDate(new Date(o),m);if(g==d&&!j||g==h&&!k)m=" ";l=new this.axisItemRenderer(this,l,m,!1,n,0,!1,t);this.pushAxisItem(l);m=o}}else if(this.parseDates){if(this.parseDates&&this.equalSpacing){f=this.start;this.startTime=this.data[this.start].time;this.endTime=this.data[this.end].time;this.timeDifference=this.endTime-
this.startTime;d=this.choosePeriod(0);e=d.period;p=d.count;q=AmCharts.getPeriodDuration(e,p);q<l&&(e=m.period,p=m.count,q=l);a=e;"WW"==a&&(a="DD");this.stepWidth=this.getStepWidth(g);h=Math.ceil(this.timeDifference/q)+1;m=AmCharts.resetDateToMin(new Date(this.startTime-q),e,p,s).getTime();this.cellWidth=this.getStepWidth(g);g=Math.round(m/q);d=-1;g/2==Math.round(g/2)&&(d=-2,m-=q);g=this.start;g/2==Math.round(g/2)&&g--;0>g&&(g=0);n=this.end+2;n>=this.data.length&&(n=this.data.length);s=!1;for(this.end-
this.start>this.gridCount&&(s=!0);g<n;g++)if(o=this.data[g].time,this.checkPeriodChange(e,p,o,m)){l=this.getCoordinate(g-this.start);r=!1;this.nextPeriod[a]&&(r=this.checkPeriodChange(this.nextPeriod[a],1,o,m));t=!1;r?(m=this.dateFormatsObject[this.nextPeriod[a]],t=!0):m=this.dateFormatsObject[a];m=AmCharts.formatDate(new Date(o),m);if(g==d&&!j||g==h&&!k)m=" ";s?s=!1:(l=new this.axisItemRenderer(this,l,m,void 0,void 0,void 0,void 0,t),l.graphics(),this.pushAxisItem(l));m=o}}}else if(this.cellWidth=
this.getStepWidth(g),g<h&&(h=g),f+=this.start,this.stepWidth=this.getStepWidth(g),0<h){h=Math.floor(g/h);g=f;g/2==Math.round(g/2)&&g--;0>g&&(g=0);for(n=0;g<=this.end+2;g+=h){n++;m=0<=g&&g<this.data.length?this.data[g].category:"";l=this.getCoordinate(g-f);s=0;"start"==this.gridPosition&&(l-=this.cellWidth/2,s=this.cellWidth/2);if(g==d&&!j||g==this.end&&!k)m=" ";Math.round(n/e)!=n/e&&(m=" ");a=this.cellWidth;p&&(a=NaN);l=new this.axisItemRenderer(this,l,m,!0,a,s,void 0,!1,s);this.pushAxisItem(l)}}for(g=
0;g<this.data.length;g++)if(j=this.data[g])k=this.parseDates&&!this.equalSpacing?Math.round((j.time-this.startTime)*this.stepWidth+this.cellWidth/2):this.getCoordinate(g-f),j.x[this.id]=k}j=this.guides.length;for(g=0;g<j;g++)k=this.guides[g],n=h=d=NaN,k.toCategory&&(n=b.getCategoryIndexByValue(k.toCategory),isNaN(n)||(d=this.getCoordinate(n-f),l=new this.axisItemRenderer(this,d,"",!0,NaN,NaN,k),this.pushAxisItem(l))),k.category&&(n=b.getCategoryIndexByValue(k.category),isNaN(n)||(h=this.getCoordinate(n-
f),n=(d-h)/2,l=new this.axisItemRenderer(this,h,k.label,!0,NaN,n,k),this.pushAxisItem(l))),k.toDate&&(this.equalSpacing?(n=b.getClosestIndex(this.data,"time",k.toDate.getTime(),!1,0,this.data.length-1),isNaN(n)||(d=this.getCoordinate(n-f))):d=(k.toDate.getTime()-this.startTime)*this.stepWidth,l=new this.axisItemRenderer(this,d,"",!0,NaN,NaN,k),this.pushAxisItem(l)),k.date&&(this.equalSpacing?(n=b.getClosestIndex(this.data,"time",k.date.getTime(),!1,0,this.data.length-1),isNaN(n)||(h=this.getCoordinate(n-
f))):h=(k.date.getTime()-this.startTime)*this.stepWidth,n=(d-h)/2,l="H"==this.orientation?new this.axisItemRenderer(this,h,k.label,!1,2*n,NaN,k):new this.axisItemRenderer(this,h,k.label,!1,NaN,n,k),this.pushAxisItem(l)),d=new this.guideFillRenderer(this,h,d,k),h=d.graphics(),this.pushAxisItem(d),k.graphics=h,h.index=g,k.balloonText&&this.addEventListeners(h,k);this.axisCreated=!0;b=this.x;f=this.y;this.set.translate(b,f);this.labelsSet.translate(b,f);this.positionTitle();(b=this.axisLine.set)&&b.toFront()},
choosePeriod:function(a){var b=AmCharts.getPeriodDuration(this.periods[a].period,this.periods[a].count);return Math.ceil(this.timeDifference/b)<=this.gridCount?this.periods[a]:a+1<this.periods.length?this.choosePeriod(a+1):this.periods[a]},getStepWidth:function(a){var b;this.startOnAxis?(b=this.axisWidth/(a-1),1==a&&(b=this.axisWidth)):b=this.axisWidth/a;return b},getCoordinate:function(a){a*=this.stepWidth;this.startOnAxis||(a+=this.stepWidth/2);return Math.round(a)},timeZoom:function(a,b){this.startTime=
a;this.endTime=b+this.minDuration()},minDuration:function(){var a=AmCharts.extractPeriod(this.minPeriod);return AmCharts.getPeriodDuration(a.period,a.count)},checkPeriodChange:function(a,b,d,e){var e=new Date(e),f=this.firstDayOfWeek,d=AmCharts.resetDateToMin(new Date(d),a,b,f).getTime(),a=AmCharts.resetDateToMin(e,a,b,f).getTime();return d!=a?!0:!1},generateDFObject:function(){this.dateFormatsObject={};for(var a=0;a<this.dateFormats.length;a++){var b=this.dateFormats[a];this.dateFormatsObject[b.period]=
b.format}},xToIndex:function(a){var b=this.data,d=this.chart,e=d.rotate,f=this.stepWidth;this.parseDates&&!this.equalSpacing?(a=this.startTime+Math.round(a/f)-this.minDuration()/2,d=d.getClosestIndex(b,"time",a,!1,this.start,this.end+1)):(this.startOnAxis||(a-=f/2),d=this.start+Math.round(a/f));var d=AmCharts.fitToBounds(d,0,b.length-1),g;b[d]&&(g=b[d].x[this.id]);e?g>this.height+1&&d--:g>this.width+1&&d--;0>g&&d++;return d=AmCharts.fitToBounds(d,0,b.length-1)},dateToCoordinate:function(a){return this.parseDates&&
!this.equalSpacing?(a.getTime()-this.startTime)*this.stepWidth:this.parseDates&&this.equalSpacing?this.getCoordinate(this.chart.getClosestIndex(this.data,"time",a.getTime(),!1,0,this.data.length-1)-this.start):NaN},categoryToCoordinate:function(a){return this.chart?this.getCoordinate(this.chart.getCategoryIndexByValue(a)-this.start):NaN},coordinateToDate:function(a){return this.equalSpacing?(a=this.xToIndex(a),new Date(this.data[a].time)):new Date(this.startTime+a/this.stepWidth)}});AmCharts.RecAxis=AmCharts.Class({construct:function(a){var b=a.chart,d=a.axisThickness,e=a.axisColor,f=a.axisAlpha,g=a.offset,h=a.dx,j=a.dy,k=a.viX,l=a.viY,m=a.viH,p=a.viW,q=b.container;"H"==a.orientation?(e=AmCharts.line(q,[0,p],[0,0],e,f,d),this.axisWidth=a.width,"bottom"==a.position?(a=d/2+g+m+l-1,d=k):(a=-d/2-g+l+j,d=h+k)):(this.axisWidth=a.height,"right"==a.position?(e=AmCharts.line(q,[0,0,-h],[0,m,m-j],e,f,d),a=l+j,d=d/2+g+h+p+k-1):(e=AmCharts.line(q,[0,0],[0,m],e,f,d),a=l,d=-d/2-g+k));e.translate(d,
a);b.axesSet.push(e);this.set=e}});AmCharts.RecItem=AmCharts.Class({construct:function(a,b,d,e,f,g,h,j,k){b=Math.round(b);void 0==d&&(d="");k||(k=0);void 0==e&&(e=!0);var l=a.chart.fontFamily,m=a.fontSize;void 0==m&&(m=a.chart.fontSize);var p=a.color;void 0==p&&(p=a.chart.color);var q=a.chart.container,n=q.set();this.set=n;var o=a.axisThickness,r=a.axisColor,s=a.axisAlpha,t=a.tickLength,u=a.gridAlpha,x=a.gridThickness,y=a.gridColor,D=a.dashLength,v=a.fillColor,B=a.fillAlpha,O=a.labelsEnabled,E=a.labelRotation,U=a.counter,J=a.inside,
L=a.dx,F=a.dy,Y=a.orientation,K=a.position,Q=a.previousCoord,ea=a.viH,aa=a.viW,ba=a.offset,ca,M;if(h){if(O=!0,isNaN(h.tickLength)||(t=h.tickLength),void 0!=h.lineColor&&(y=h.lineColor),isNaN(h.lineAlpha)||(u=h.lineAlpha),isNaN(h.dashLength)||(D=h.dashLength),isNaN(h.lineThickness)||(x=h.lineThickness),!0==h.inside&&(J=!0),!isNaN(h.labelRotation))E=h.labelRotation}else d||(u/=3,t/=2);M="start";f&&(M="middle");var R=E*Math.PI/180,ha,C=0,w=0,fa=0,da=ha=0;"V"==Y&&(E=0);if(O)var S=AmCharts.text(q,d,p,
l,m,M,j),da=S.getBBox().width;if("H"==Y){if(0<=b&&b<=aa+1&&(0<t&&0<s&&b+k<=aa+1&&(ca=AmCharts.line(q,[b+k,b+k],[0,t],r,s,x),n.push(ca)),0<u))M=AmCharts.line(q,[b,b+L,b+L],[ea,ea+F,F],y,u,x,D),n.push(M);w=0;C=b;h&&90==E&&(C-=m);!1==e?(M="start",w="bottom"==K?J?w+t:w-t:J?w-t:w+t,C+=3,f&&(C+=f/2,M="middle"),0<E&&(M="middle")):M="middle";1==U&&0<B&&!h&&Q<aa&&(e=AmCharts.fitToBounds(b,0,aa),Q=AmCharts.fitToBounds(Q,0,aa),ha=e-Q,0<ha&&(fill=AmCharts.rect(q,ha,a.height,v,B),fill.translate(e-ha+L,F),n.push(fill)));
"bottom"==K?(w+=ea+m/2+ba,J?0<E?(w=ea-da/2*Math.sin(R)-t-3,C+=da/2*Math.cos(R)):w-=t+m+3+3:0<E?(w=ea+da/2*Math.sin(R)+t+3,C-=da/2*Math.cos(R)):w+=t+o+3+3):(w+=F+m/2-ba,C+=L,J?0<E?(w=da/2*Math.sin(R)+t+3,C-=da/2*Math.cos(R)):w+=t+3:0<E?(w=-(da/2)*Math.sin(R)-t-6,C+=da/2*Math.cos(R)):w-=t+m+3+o+3);"bottom"==K?ha=(J?ea-t-1:ea+o-1)+ba:(fa=L,ha=(J?F:F-t-o+1)-ba);g&&(C+=g);F=C;0<E&&(F+=da/2*Math.cos(R));if(S&&(K=0,J&&(K=da*Math.cos(R)),F+K>aa+1||0>F))S.remove(),S=null}else{if(0<=b&&b<=ea+1&&(0<t&&0<s&&
b+k<=ea+1&&(ca=AmCharts.line(q,[0,t],[b+k,b+k],r,s,x),n.push(ca)),0<u))M=AmCharts.line(q,[0,L,aa+L],[b,b+F,b+F],y,u,x,D),n.push(M);M="end";if(!0==J&&"left"==K||!1==J&&"right"==K)M="start";w=b-m/2;1==U&&0<B&&!h&&(e=AmCharts.fitToBounds(b,0,ea),Q=AmCharts.fitToBounds(Q,0,ea),R=e-Q,fill=AmCharts.polygon(q,[0,a.width,a.width,0],[0,0,R,R],v,B),fill.translate(L,e-R+F),n.push(fill));w+=m/2;"right"==K?(C+=L+aa+ba,w+=F,J?(C-=t+4,g||(w-=m/2+3)):(C+=t+4+o,w-=2)):J?(C+=t+4-ba,g||(w-=m/2+3),h&&(C+=L,w+=F)):(C+=
-t-o-4-2-ba,w-=2);ca&&("right"==K?(fa+=L+ba+aa,ha+=F,fa=J?fa-o:fa+o):(fa-=ba,J||(fa-=t+o)));g&&(w+=g);J=-3;"right"==K&&(J+=F);if(S&&(w>ea+1||w<J))S.remove(),S=null}ca&&ca.translate(fa,ha);!1==a.visible&&(ca&&ca.remove(),S&&(S.remove(),S=null));S&&(S.attr({"text-anchor":M}),S.translate(C,w),0!=E&&S.rotate(-E),a.allLabels.push(S),this.label=S);a.counter=0==U?1:0;a.previousCoord=b;0==this.set.node.childNodes.length&&this.set.remove()},graphics:function(){return this.set},getLabel:function(){return this.label}});AmCharts.RecFill=AmCharts.Class({construct:function(a,b,d,e){var f=a.dx,g=a.dy,h=a.orientation,j=0;if(d<b)var k=b,b=d,d=k;var l=e.fillAlpha;isNaN(l)&&(l=0);k=a.chart.container;e=e.fillColor;"V"==h?(b=AmCharts.fitToBounds(b,0,a.viH),d=AmCharts.fitToBounds(d,0,a.viH)):(b=AmCharts.fitToBounds(b,0,a.viW),d=AmCharts.fitToBounds(d,0,a.viW));d-=b;isNaN(d)&&(d=4,j=2,l=0);0>d&&"object"==typeof e&&(e=e.join(",").split(",").reverse());"V"==h?(a=AmCharts.rect(k,a.width,d,e,l),a.translate(f,b-j+g)):(a=AmCharts.rect(k,
d,a.height,e,l),a.translate(b-j+f,g));this.set=k.set([a])},graphics:function(){return this.set},getLabel:function(){}});AmCharts.RadAxis=AmCharts.Class({construct:function(a){var b=a.chart,d=a.axisThickness,e=a.axisColor,f=a.axisAlpha,g=a.x,h=a.y;this.set=b.container.set();b.axesSet.push(this.set);var j=a.axisTitleOffset,k=a.radarCategoriesEnabled,l=a.chart.fontFamily,m=a.fontSize;void 0==m&&(m=a.chart.fontSize);var p=a.color;void 0==p&&(p=a.chart.color);if(b){this.axisWidth=a.height;for(var a=b.chartData,q=a.length,n=0;n<q;n++){var o=180-360/q*n,r=g+this.axisWidth*Math.sin(o/180*Math.PI),s=h+this.axisWidth*Math.cos(o/
180*Math.PI);this.set.push(AmCharts.line(b.container,[g,r],[h,s],e,f,d));if(k){var t="start",r=g+(this.axisWidth+j)*Math.sin(o/180*Math.PI),s=h+(this.axisWidth+j)*Math.cos(o/180*Math.PI);if(180==o||0==o)t="middle",r-=5;0>o&&(t="end",r-=10);180==o&&(s-=5);0==o&&(s+=5);o=AmCharts.text(b.container,a[n].category,p,l,m,t);o.translate(r+5,s);this.set.push(o);o.getBBox()}}}}});AmCharts.RadItem=AmCharts.Class({construct:function(a,b,d,e,f,g,h){void 0==d&&(d="");var j=a.chart.fontFamily,k=a.fontSize;void 0==k&&(k=a.chart.fontSize);var l=a.color;void 0==l&&(l=a.chart.color);var m=a.chart.container;this.set=e=m.set();var p=a.axisColor,q=a.axisAlpha,n=a.tickLength,o=a.gridAlpha,r=a.gridThickness,s=a.gridColor,t=a.dashLength,u=a.fillColor,x=a.fillAlpha,y=a.labelsEnabled,f=a.counter,D=a.inside,v=a.gridType,b=b-a.height,B,g=a.x,O=a.y;h?(y=!0,isNaN(h.tickLength)||(n=h.tickLength),
void 0!=h.lineColor&&(s=h.lineColor),isNaN(h.lineAlpha)||(o=h.lineAlpha),isNaN(h.dashLength)||(t=h.dashLength),isNaN(h.lineThickness)||(r=h.lineThickness),!0==h.inside&&(D=!0)):d||(o/=3,n/=2);var E="end",U=-1;D&&(E="start",U=1);if(y){var J=AmCharts.text(m,d,l,j,k,E);J.translate(g+(n+3)*U,b);e.push(J);this.label=J;B=AmCharts.line(m,[g,g+n*U],[b,b],p,q,r);e.push(B)}b=a.y-b;if("polygons"==v){for(var L=[],F=[],Y=a.data.length,d=0;d<Y;d++)j=180-360/Y*d,L.push(b*Math.sin(j/180*Math.PI)),F.push(b*Math.cos(j/
180*Math.PI));L.push(L[0]);F.push(F[0]);d=AmCharts.line(m,L,F,s,o,r,t)}else d=AmCharts.circle(m,b,"#FFFFFF",0,r,s,o);d.translate(g,O);e.push(d);if(1==f&&0<x&&!h){h=a.previousCoord;if("polygons"==v){for(d=Y;0<=d;d--)j=180-360/Y*d,L.push(h*Math.sin(j/180*Math.PI)),F.push(h*Math.cos(j/180*Math.PI));L=AmCharts.polygon(m,L,F,u,x)}else L=AmCharts.wedge(m,0,0,0,-360,b,b,h,0,{fill:u,"fill-opacity":x,stroke:0,"stroke-opacity":0,"stroke-width":0});e.push(L);L.translate(g,O)}!1==a.visible&&(B&&B.hide(),J&&J.hide());
a.counter=0==f?1:0;a.previousCoord=b},graphics:function(){return this.set},getLabel:function(){return this.label}});AmCharts.RadarFill=AmCharts.Class({construct:function(a,b,d,e){var f=Math.max(b,d),b=d=Math.min(b,d),d=a.chart.container,g=e.fillAlpha,h=e.fillColor,f=Math.abs(f)-a.y,b=Math.abs(b)-a.y,j=-e.angle,e=-e.toAngle;isNaN(j)&&(j=0);isNaN(e)&&(e=-360);this.set=d.set();void 0==h&&(h="#000000");isNaN(g)&&(g=0);if("polygons"==a.gridType){for(var e=[],k=[],l=a.data.length,m=0;m<l;m++)j=180-360/l*m,e.push(f*Math.sin(j/180*Math.PI)),k.push(f*Math.cos(j/180*Math.PI));e.push(e[0]);k.push(k[0]);for(m=l;0<=m;m--)j=
180-360/l*m,e.push(b*Math.sin(j/180*Math.PI)),k.push(b*Math.cos(j/180*Math.PI));this.fill=AmCharts.polygon(d,e,k,h,g)}else this.fill=AmCharts.wedge(d,0,0,j,e-j,f,f,b,0,{fill:h,"fill-opacity":g,stroke:0,"stroke-opacity":0,"stroke-width":0});this.set.push(this.fill);this.fill.translate(a.x,a.y)},graphics:function(){return this.set},getLabel:function(){}});AmCharts.AmGraph=AmCharts.Class({construct:function(){this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem");this.type="line";this.stackable=!0;this.columnCount=1;this.columnIndex=0;this.centerCustomBullets=this.showBalloon=!0;this.maxBulletSize=50;this.minBulletSize=0;this.balloonText="[[value]]";this.hidden=this.scrollbar=this.animationPlayed=!1;this.columnWidth=0.8;this.pointPosition="middle";this.depthCount=1;this.includeInMinMax=!0;this.negativeBase=
0;this.visibleInLegend=!0;this.showAllValueLabels=!1;this.showBalloonAt="close";this.lineThickness=1;this.dashLength=0;this.connect=!0;this.lineAlpha=1;this.bullet="none";this.bulletBorderThickness=2;this.bulletAlpha=this.bulletBorderAlpha=1;this.bulletSize=8;this.hideBulletsCount=this.bulletOffset=0;this.labelPosition="top";this.cornerRadiusTop=0;this.cursorBulletAlpha=1;this.gradientOrientation="vertical";this.dy=this.dx=0;this.periodValue="";this.y=this.x=0},draw:function(){var a=this.chart,b=
a.container;this.container=b;this.destroy();var d=b.set();a.graphsSet.push(d);var e=b.set();a.bulletSet.push(e);this.bulletSet=e;if(!this.scrollbar){var f=a.marginLeftReal,a=a.marginTopReal;d.translate(f,a);e.translate(f,a)}if("column"==this.type)var g=b.set();AmCharts.remove(this.columnsSet);d.push(g);this.set=d;this.columnsSet=g;this.columnsArray=[];this.ownColumns=[];this.allBullets=[];this.animationArray=[];AmCharts.ifArray(this.data)&&(b=!1,"xy"==this.chartType?this.xAxis.axisCreated&&this.yAxis.axisCreated&&
(b=!0):this.valueAxis.axisCreated&&(b=!0),!this.hidden&&b&&this.createGraph())},createGraph:function(){var a=this.chart;"inside"==this.labelPosition&&(this.labelPosition="bottom");this.startAlpha=a.startAlpha;this.seqAn=a.sequencedAnimation;this.baseCoord=this.valueAxis.baseCoord;this.fillColors||(this.fillColors=this.lineColor);void 0==this.fillAlphas&&(this.fillAlphas=0);void 0==this.bulletColor&&(this.bulletColor=this.lineColor,this.bulletColorNegative=this.negativeLineColor);void 0==this.bulletAlpha&&
(this.bulletAlpha=this.lineAlpha);this.bulletBorderColor||(this.bulletBorderAlpha=0);if(!isNaN(this.valueAxis.min)&&!isNaN(this.valueAxis.max)){switch(this.chartType){case "serial":this.createSerialGraph();break;case "radar":this.createRadarGraph();break;case "xy":this.createXYGraph(),this.positiveClip(this.set)}this.animationPlayed=!0}},createXYGraph:function(){var a=[],b=[],d=this.xAxis,e=this.yAxis;this.pmh=e.viH+1;this.pmw=d.viW+1;this.pmy=this.pmx=0;for(var f=this.start;f<=this.end;f++){var g=
this.data[f].axes[d.id].graphs[this.id],h=g.values,j=h.x,k=h.y,h=d.getCoordinate(j),l=e.getCoordinate(k);!isNaN(j)&&!isNaN(k)&&(a.push(h),b.push(l),(j=this.createBullet(g,h,l,f))||(j=0),this.labelText&&this.positionLabel(this.createLabel(g,h,l),this.labelPosition,j))}this.drawLineGraph(a,b);this.launchAnimation()},createRadarGraph:function(){for(var a=this.valueAxis.stackType,b=[],d=[],e,f,g=this.start;g<=this.end;g++){var h=this.data[g].axes[this.valueAxis.id].graphs[this.id],j;j="none"==a||"3d"==
a?h.values.value:h.values.close;if(isNaN(j))this.drawLineGraph(b,d),b=[],d=[];else{var k=this.y-(this.valueAxis.getCoordinate(j)-this.height),l=180-360/(this.end-this.start+1)*g;j=k*Math.sin(l/180*Math.PI);k*=Math.cos(l/180*Math.PI);b.push(j);d.push(k);(l=this.createBullet(h,j,k,g))||(l=0);this.labelText&&this.positionLabel(this.createLabel(h,j,k),this.labelPosition,l);isNaN(e)&&(e=j);isNaN(f)&&(f=k)}}b.push(e);d.push(f);this.drawLineGraph(b,d);this.launchAnimation()},positionLabel:function(a,b,d){var e=
a.getBBox(),f=0,g=this.fontSize;void 0==g&&(g=this.chart.fontSize);var g=g/2-2,h=0,j=0;switch(b){case "left":f-=(e.width+d)/2+2;h=e.width/2;j=-2;break;case "top":g-=(d+e.height)/2+1;h=e.width/2-1;break;case "right":f+=(e.width+d)/2+2;h=e.width/2;j=-2;break;case "bottom":g+=(d+e.height)/2+3,h=e.width/2-1,j=-e.height/2+3}AmCharts.VML?a.translate(e.x+f+h,e.y+g+j):a.attr({x:f,y:g})},createSerialGraph:function(){var a=this.id,b=this.index,d=this.data,e=this.chart.container,f=this.valueAxis,g=this.type,
h=this.columnWidth,j=this.width,k=this.height,l=this.y,m=this.rotate,p=this.columnCount,q=AmCharts.toCoordinate(this.cornerRadiusTop,h/2),n=this.connect,o=[],r=[],s,t,u=this.chart.graphs.length,x,y=this.dx/this.depthCount,D=this.dy/this.depthCount,v=f.stackType,B=this.labelPosition,O=this.start,E=this.end,U=this.scrollbar,J=this.categoryAxis,L=this.baseCoord,F=this.negativeBase,Y=this.columnIndex,K=this.lineThickness,Q=this.lineAlpha,ea=this.lineColor,aa=this.dashLength,ba=this.set;"above"==B&&(B=
"top");"below"==B&&(B="bottom");var ca=270;"horizontal"==this.gradientOrientation&&(ca=0);var M=this.chart.columnSpacing,R=J.cellWidth,ha=(R*h-p)/p;M>ha&&(M=ha);var C,w,fa,da=k+1,S=j+1,Ga=0,Oa=0,Pa,Qa,Ha,Ia,ob=this.fillColors,Ca=this.negativeFillColors,va=this.negativeLineColor,Da=this.fillAlphas,Ea=this.negativeFillAlphas;"object"==typeof Da&&(Da=Da[0]);"object"==typeof Ea&&(Ea=Ea[0]);var Ja=f.getCoordinate(f.min);f.logarithmic&&(Ja=f.getCoordinate(f.minReal));this.minCoord=Ja;this.resetBullet&&
(this.bullet="none");if(!U&&("line"==g||"smoothedLine"==g||"step"==g))if(1==d.length&&"step"!=g&&"none"==this.bullet&&(this.bullet="round",this.resetBullet=!0),Ca||void 0!=va){var wa=F;wa>f.max&&(wa=f.max);wa<f.min&&(wa=f.min);f.logarithmic&&(wa=f.minReal);var pa=f.getCoordinate(wa),hb=f.getCoordinate(f.max);m?(da=k,S=Math.abs(hb-pa),Pa=k,Qa=Math.abs(Ja-pa),Ia=Oa=0,f.reversed?(Ga=0,Ha=pa):(Ga=pa,Ha=0)):(S=j,da=Math.abs(hb-pa),Qa=j,Pa=Math.abs(Ja-pa),Ha=Ga=0,f.reversed?(Ia=l,Oa=pa):Ia=pa+1)}var qa=
Math.round;this.pmx=qa(Ga);this.pmy=qa(Oa);this.pmh=qa(da);this.pmw=qa(S);this.nmx=qa(Ha);this.nmy=qa(Ia);this.nmh=qa(Pa);this.nmw=qa(Qa);h="column"==g?(R*h-M*(p-1))/p:R*h;1>h&&(h=1);var N;if("line"==g||"step"==g||"smoothedLine"==g){if(0<O)for(N=O-1;-1<N;N--)if(C=d[N],w=C.axes[f.id].graphs[a],fa=w.values.value){O=N;break}if(E<d.length-1)for(N=E+1;N<d.length;N++)if(C=d[N],w=C.axes[f.id].graphs[a],fa=w.values.value){E=N;break}}E<d.length-1&&E++;var ka=[],la=[],Ra=!1;if("line"==g||"step"==g||"smoothedLine"==
g)if(this.stackable&&"regular"==v||"100%"==v)Ra=!0;for(N=O;N<=E;N++){C=d[N];w=C.axes[f.id].graphs[a];w.index=N;var ma=NaN,A=NaN,z=NaN,X=NaN,T=NaN,Ka=NaN,xa=NaN,La=NaN,ya=NaN,V=NaN,W=NaN,ra=NaN,sa=NaN,P=NaN,ja=void 0,ta=ob,Fa=Da,Z=ea;void 0!=w.color&&(ta=w.color);w.fillColors&&(ta=w.fillColors);isNaN(w.alpha)||(Fa=w.alpha);var na=w.values;f.recalculateToPercents&&(na=w.percents);if(na){P=!this.stackable||"none"==v||"3d"==v?na.value:na.close;if("candlestick"==g||"ohlc"==g)var P=na.close,Sa=na.low,xa=
f.getCoordinate(Sa),Ta=na.high,ya=f.getCoordinate(Ta);var ia=na.open,z=f.getCoordinate(P);isNaN(ia)||(T=f.getCoordinate(ia));if(!U)switch(this.showBalloonAt){case "close":w.y=z;break;case "open":w.y=T;break;case "high":w.y=ya;break;case "low":w.y=xa}var ma=C.x[J.id],za=Math.round(R/2),Ua=za;"start"==this.pointPosition&&(ma-=R/2,za=0,Ua=R);U||(w.x=ma);-1E5>ma&&(ma=-1E5);ma>j+1E5&&(ma=j+1E5);m?(A=z,X=T,T=z=ma,isNaN(ia)&&(X=L),Ka=xa,La=ya):(X=A=ma,isNaN(ia)&&(T=L));switch(g){case "line":if(isNaN(P))n||
(this.drawLineGraph(o,r,ka,la),o=[],r=[],ka=[],la=[]);else if(P<F&&(w.isNegative=!0),o.push(A),r.push(z),V=A,W=z,ra=A,sa=z,Ra)ka.push(X),la.push(T);break;case "smoothedLine":if(isNaN(P))n||(this.drawSmoothedGraph(o,r,ka,la),o=[],r=[],ka=[],la=[]);else if(P<F&&(w.isNegative=!0),o.push(A),r.push(z),V=A,W=z,ra=A,sa=z,Ra)ka.push(X),la.push(T);break;case "step":isNaN(P)?n||(this.drawLineGraph(o,r,ka,la),o=[],r=[],ka=[],la=[]):(P<F&&(w.isNegative=!0),m?(isNaN(s)||(o.push(s),r.push(z-za)),r.push(z-za),o.push(A),
r.push(z+Ua),o.push(A)):(isNaN(t)||(r.push(t),o.push(A-za)),o.push(A-za),r.push(z),o.push(A+Ua),r.push(z)),s=A,t=z,V=A,W=z,ra=A,sa=z);break;case "column":if(!isNaN(P)){P<F&&(w.isNegative=!0,Ca&&(ta=Ca),void 0!=va&&(Z=va));var ib=f.min,jb=f.max;if(!(P<ib&&(ia<ib||void 0==ia)||P>jb&&ia>jb))if(m){if("3d"==v)var H=z-0.5*(h+M)+M/2+D*Y,I=X+y*Y;else H=z-(p/2-Y)*(h+M)+M/2,I=X;var G=h,V=A,W=H+h/2,ra=A,sa=H+h/2;H+G>k&&(G=k-H);0>H&&(G+=H,H=0);var $=A-X,pb=I,I=AmCharts.fitToBounds(I,0,j),$=$+(pb-I),$=AmCharts.fitToBounds($,
-I,j-I);H<k&&0<G&&(ja=new AmCharts.Cuboid(e,$,G,y,D,ta,Fa,K,Z,Q,ca,q,m),"bottom"!=B&&(B="right",0>P?B="left":(V+=this.dx,"regular"!=v&&"100%"!=v&&(W+=this.dy))))}else{"3d"==v?(I=A-0.5*(h+M)+M/2+y*Y,H=T+D*Y):(I=A-(p/2-Y)*(h+M)+M/2,H=T);G=h;V=I+h/2;W=z;ra=I+h/2;sa=z;I+G>j+Y*y&&(G=j-I+Y*y);0>I&&(G+=I,I=0);var $=z-T,qb=H,H=AmCharts.fitToBounds(H,0,k),$=$+(qb-H),$=AmCharts.fitToBounds($,-H,k-H);I<j+Y*y&&0<G&&(ja=new AmCharts.Cuboid(e,G,$,y,D,ta,Fa,K,Z,this.lineAlpha,ca,q,m),0>P?B="bottom":("regular"!=
v&&"100%"!=v&&(V+=this.dx),W+=this.dy))}if(ja){var oa=ja.set;oa.translate(I,H);this.columnsSet.push(oa);w.url&&oa.setAttr("cursor","pointer");if(!U){"none"==v&&(x=m?(this.end+1-N)*u-b:u*N+b);"3d"==v&&(m?(x=(u-b)*(this.end+1-N),W=H+h/2):(x=(u-b)*(N+1),V+=y*this.columnIndex),W+=D*this.columnIndex);if("regular"==v||"100%"==v)B="middle",x=m?0<na.value?(this.end+1-N)*u+b:(this.end+1-N)*u-b:0<na.value?u*N+b:u*N-b;this.columnsArray.push({column:ja,depth:x});w.x=m?H+G/2:I+G/2;this.ownColumns.push(ja);this.animateColumns(ja,
N,A,X,z,T);this.addListeners(oa,w)}w.columnSprite=oa}}break;case "candlestick":if(!isNaN(ia)&&!isNaN(Ta)&&!isNaN(Sa)&&!isNaN(P)){var Ma,Va;P<ia&&(w.isNegative=!0,Ca&&(ta=Ca),Ea&&(Fa=Ea),void 0!=va&&(Z=va));if(m){if(H=z-h/2,I=X,G=h,H+G>k&&(G=k-H),0>H&&(G+=H,H=0),H<k&&0<G){var Wa,Xa;P>ia?(Wa=[A,La],Xa=[X,Ka]):(Wa=[X,La],Xa=[A,Ka]);z<k&&0<z&&(Ma=AmCharts.line(e,Wa,[z,z],Z,Q,K),Va=AmCharts.line(e,Xa,[z,z],Z,Q,K));$=A-X;ja=new AmCharts.Cuboid(e,$,G,y,D,ta,Da,K,Z,Q,ca,q,m)}}else if(I=A-h/2,H=T+K/2,G=h,
I+G>j&&(G=j-I),0>I&&(G+=I,I=0),$=z-T,I<j&&0<G){var ja=new AmCharts.Cuboid(e,G,$,y,D,ta,Fa,K,Z,Q,ca,q,m),Ya,Za;P>ia?(Ya=[z,ya],Za=[T,xa]):(Ya=[T,ya],Za=[z,xa]);A<j&&0<A&&(Ma=AmCharts.line(e,[A,A],Ya,Z,Q,K),Va=AmCharts.line(e,[A,A],Za,Z,Q,K))}if(ja&&(oa=ja.set,ba.push(oa),oa.translate(I,H),Ma&&(ba.push(Ma),ba.push(Va)),V=A,W=z,ra=A,sa=z,!U))w.x=m?H+G/2:I+G/2,this.animateColumns(ja,N,A,X,z,T),this.addListeners(oa,w)}break;case "ohlc":if(!isNaN(ia)&&!isNaN(Ta)&&!isNaN(Sa)&&!isNaN(P)){P<ia&&(w.isNegative=
!0,void 0!=va&&(Z=va));var $a,ab,bb;if(m){var cb=z-h/2,cb=AmCharts.fitToBounds(cb,0,k),kb=AmCharts.fitToBounds(z,0,k),db=z+h/2,db=AmCharts.fitToBounds(db,0,k);ab=AmCharts.line(e,[X,X],[cb,kb],Z,Q,K,aa);0<z&&z<k&&($a=AmCharts.line(e,[Ka,La],[z,z],Z,Q,K,aa));bb=AmCharts.line(e,[A,A],[kb,db],Z,Q,K,aa)}else{var eb=A-h/2,eb=AmCharts.fitToBounds(eb,0,j),lb=AmCharts.fitToBounds(A,0,j),fb=A+h/2,fb=AmCharts.fitToBounds(fb,0,j);ab=AmCharts.line(e,[eb,lb],[T,T],Z,Q,K,aa);0<A&&A<j&&($a=AmCharts.line(e,[A,A],
[xa,ya],Z,Q,K,aa));bb=AmCharts.line(e,[lb,fb],[z,z],Z,Q,K,aa)}ba.push(ab);ba.push($a);ba.push(bb);V=A;W=z;ra=A;sa=z}}if(!U&&!isNaN(P)){var mb=this.hideBulletsCount;if(this.end-this.start<=mb||0==mb){var Aa=this.createBullet(w,ra,sa,N);Aa||(Aa=0);if(this.labelText){var ga=this.createLabel(w,0,0),ua=0,Ba=0,nb=ga.getBBox(),Na=nb.width,gb=nb.height;switch(B){case "left":ua=-(Na/2+Aa/2+3);break;case "top":Ba=-(gb/2+Aa/2+3);break;case "right":ua=Aa/2+2+Na/2;break;case "bottom":m&&"column"==g?(V=L,0>P?(ua=
-6,ga.attr({"text-anchor":"end"})):(ua=6,ga.attr({"text-anchor":"start"}))):(Ba=Aa/2+gb/2,ga.x=-(Na/2+2));break;case "middle":"column"==g&&(m?(ua=-(A-X)/2-y,0>$&&(ua+=y),Math.abs(A-X)<Na&&!this.showAllValueLabels&&(ga.remove(),ga=null)):(Ba=-(z-T)/2,0>$&&(Ba-=D),Math.abs(z-T)<gb&&!this.showAllValueLabels&&(ga.remove(),ga=null)))}if(ga)if(V+=ua,W+=Ba,ga.translate(V,W),m){if(0>W||W>k)ga.remove(),ga=null}else if(0>V||V>j)ga.remove(),ga=null}}}}}if("line"==g||"step"==g||"smoothedLine"==g)"smoothedLine"==
g?this.drawSmoothedGraph(o,r,ka,la):this.drawLineGraph(o,r,ka,la),U||this.launchAnimation()},animateColumns:function(a,b){var d=this,e=d.chart.startDuration;0<e&&!d.animationPlayed&&(d.seqAn?(a.set.hide(),d.animationArray.push(a),e=setTimeout(function(){d.animate.call(d)},1E3*e/(d.end-d.start+1)*(b-d.start)),d.timeOuts.push(e)):d.animate(a))},createLabel:function(a,b,d){var e=this.chart,f=this.color;void 0==f&&(f=e.color);var g=this.fontSize;void 0==g&&(g=e.fontSize);a=e.formatString(this.labelText,
a,this);a=AmCharts.cleanFromEmpty(a);e=AmCharts.text(this.container,a,f,e.fontFamily,g);e.translate(b,d);this.bulletSet.push(e);this.allBullets.push(e);return e},positiveClip:function(a){a.clipRect(this.pmx,this.pmy,this.pmw,this.pmh)},negativeClip:function(a){a.clipRect(this.nmx,this.nmy,this.nmw,this.nmh)},drawLineGraph:function(a,b,d,e){if(1<a.length){var f=this.set,g=this.container,h=g.set(),j=g.set();f.push(h);f.push(j);var k=this.lineAlpha,l=this.lineThickness,m=this.dashLength,f=this.fillAlphas,
p=this.fillColors,q=this.negativeLineColor,n=this.negativeFillColors,o=this.negativeFillAlphas,r=this.baseCoord,s=AmCharts.line(g,a,b,this.lineColor,k,l,m,!1,!0);h.push(s);void 0!=q&&(k=AmCharts.line(g,a,b,q,k,l,m,!1,!0),j.push(k));if(0<f&&(k=a.join(";").split(";"),l=b.join(";").split(";"),"serial"==this.chartType&&(0<d.length?(d.reverse(),e.reverse(),k=a.concat(d),l=b.concat(e)):this.rotate?(l.push(l[l.length-1]),k.push(r),l.push(l[0]),k.push(r),l.push(l[0]),k.push(k[0])):(k.push(k[k.length-1]),
l.push(r),k.push(k[0]),l.push(r),k.push(a[0]),l.push(l[0]))),a=AmCharts.polygon(g,k,l,p,f),h.push(a),n||void 0!=q))o||(o=f),n||(n=q),g=AmCharts.polygon(g,k,l,n,o),j.push(g);this.applyMask(j,h)}},applyMask:function(a,b){var d=a.length();"serial"==this.chartType&&!this.scrollbar&&(this.positiveClip(b),0<d&&this.negativeClip(a));0==d&&AmCharts.remove(a)},drawSmoothedGraph:function(a,b){if(1<a.length){var d=this.set,e=this.container,f=e.set(),g=e.set();d.push(f);d.push(g);var h=this.lineAlpha,j=this.lineThickness,
d=this.dashLength,k=this.fillAlphas,l=this.fillColors,m=this.negativeLineColor,p=this.negativeFillColors,q=this.negativeFillAlphas,n=this.baseCoord,o=new AmCharts.Bezier(e,a,b,this.lineColor,h,j,l,0,d);f.push(o.path);void 0!=m&&(h=new AmCharts.Bezier(e,a,b,m,h,j,l,0,d),g.push(h.path));if(0<k&&(h="",this.rotate?(h+=" L"+n+","+b[b.length-1],h+=" L"+n+","+b[0]):(h+=" L"+a[a.length-1]+","+n,h+=" L"+a[0]+","+n),h+=" L"+a[0]+","+b[0],l=new AmCharts.Bezier(e,a,b,NaN,0,0,l,k,d,h),f.push(l.path),p||void 0!=
m))q||(q=k),p||(p=m),e=new AmCharts.Bezier(e,a,b,NaN,0,0,p,q,d,h),g.push(e.path);this.applyMask(g,f)}},launchAnimation:function(){var a=this,b=a.chart.startDuration;if(0<b&&!a.animationPlayed){var d=a.set,e=a.bulletSet;AmCharts.VML||(d.attr({opacity:a.startAlpha}),e.attr({opacity:a.startAlpha}));d.hide();e.hide();a.seqAn?(b=setTimeout(function(){a.animateGraphs.call(a)},1E3*a.index*b),a.timeOuts.push(b)):a.animateGraphs()}},animateGraphs:function(){var a=this.chart,b=this.set,d=this.bulletSet,e=this.x,
f=this.y;b.show();d.show();var g=a.startDuration,a=a.startEffect;b&&(this.rotate?(b.translate(-1E3,f),d.translate(-1E3,f)):(b.translate(e,-1E3),d.translate(e,-1E3)),b.animate({opacity:1,translate:e+","+f},g,a),d.animate({opacity:1,translate:e+","+f},g,a))},animate:function(a){var b=this.chart,d=this.container,e=this.animationArray;!a&&0<e.length&&(a=e[0],e.shift());d=d[AmCharts.getEffect(b.startEffect)];b=b.startDuration;a&&(this.rotate?a.animateWidth(b,d):a.animateHeight(b,d),a.set.show())},legendKeyColor:function(){var a=
this.legendColor,b=this.lineAlpha;void 0==a&&(a=this.lineColor,0==b&&(b=this.fillColors)&&(a="object"==typeof b?b[0]:b));return a},legendKeyAlpha:function(){var a=this.legendAlpha;void 0==a&&(a=this.lineAlpha,0==a&&this.fillAlphas&&(a=this.fillAlphas),0==a&&(a=this.bulletAlpha),0==a&&(a=1));return a},createBullet:function(a,b,d){var e=this.container,f=this.bulletOffset,g=this.bulletSize;isNaN(a.bulletSize)||(g=a.bulletSize);if(!isNaN(this.maxValue)){var h=a.values.value;isNaN(h)||(g=h/this.maxValue*
this.maxBulletSize)}g<this.minBulletSize&&(g=this.minBulletSize);this.rotate?b+=f:d-=f;var j;if("none"!=this.bullet||a.bullet){var k=this.bulletColor;a.isNegative&&void 0!=this.bulletColorNegative&&(k=this.bulletColorNegative);void 0!=a.color&&(k=a.color);f=this.bullet;a.bullet&&(f=a.bullet);var h=this.bulletBorderThickness,l=this.bulletBorderColor,m=this.bulletBorderAlpha,p=this.bulletAlpha,q=a.alpha;isNaN(q)||(p=q);switch(f){case "round":j=AmCharts.circle(e,g/2,k,p,h,l,m);break;case "square":j=
AmCharts.polygon(e,[0,g,g,0],[0,0,g,g],k,p,h,l,m);b-=g/2;d-=g/2;break;case "triangleUp":j=AmCharts.triangle(e,g,0,k,p,h,l,m);break;case "triangleDown":j=AmCharts.triangle(e,g,180,k,p,h,l,m);break;case "triangleLeft":j=AmCharts.triangle(e,g,270,k,p,h,l,m);break;case "triangleRight":j=AmCharts.triangle(e,g,90,k,p,h,l,m);break;case "bubble":j=AmCharts.circle(e,g/2,k,p,h,l,m,!0)}}if(this.customBullet||a.customBullet)if(f=this.customBullet,a.customBullet&&(f=a.customBullet),f)j&&j.remove(),"function"==
typeof f?(j=new f,j.chart=this.chart,a.bulletConfig&&(j.availableSpace=d,j.graph=this,a.bulletConfig.minCoord=this.minCoord-d,j.bulletConfig=a.bulletConfig),j.write(e),j=j.set):(this.chart.path&&(f=this.chart.path+f),j=e.image(f,0,0,g,g).attr({preserveAspectRatio:!0}),this.centerCustomBullets&&(b-=g/2,d-=g/2));if(j){a.url&&j.setAttr("cursor","pointer");this.allBullets.push(j);if("serial"==this.chartType&&(0>b||b>this.width||d<-g/2||d>this.height))j.remove(),j=null;j&&(this.bulletSet.push(j),j.translate(b,
d),this.addListeners(j,a))}return g},showBullets:function(){for(var a=this.allBullets,b=0;b<a.length;b++)a[b].show()},hideBullets:function(){for(var a=this.allBullets,b=0;b<a.length;b++)a[b].hide()},addListeners:function(a,b){var d=this;a.mouseover(function(){d.handleRollOver(b)}).mouseout(function(){d.handleRollOut(b)}).click(function(){d.handleClick(b)}).dblclick(function(){d.handleDoubleClick(b)})},handleRollOver:function(a){if(this.showBalloon&&a){var b=this.chart,d={type:"rollOverGraphItem",
item:a,index:a.index,graph:this,target:this,chart:this.chart};this.fire("rollOverGraphItem",d);b.fire("rollOverGraphItem",d);clearTimeout(b.hoverInt);d=!0;b.chartCursor&&"serial"==this.chartType&&(d=!1,b.chartCursor.valueBalloonsEnabled||(d=!0));d&&(d=b.formatString(this.balloonText,a,a.graph),d=AmCharts.cleanFromEmpty(d),a=b.getBalloonColor(this,a),b.balloon.showBullet=!1,b.balloon.pointerOrientation="V",b.showBalloon(d,a,!0))}},handleRollOut:function(a){this.chart.hideBalloon();a&&(a={type:"rollOutGraphItem",
item:a,index:a.index,graph:this,target:this,chart:this.chart},this.fire("rollOutGraphItem",a),this.chart.fire("rollOutGraphItem",a))},handleClick:function(a){if(a){var b={type:"clickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart};this.fire("clickGraphItem",b);this.chart.fire("clickGraphItem",b);a=a.url;b=this.urlTarget;a&&("_self"==b||!b?window.location.href=a:(b=document.getElementsByName(b)[0])?b.src=a:window.open(a))}},handleDoubleClick:function(a){a&&(a={type:"doubleClickGraphItem",
item:a,index:a.index,graph:this,target:this,chart:this.chart},this.fire("doubleClickGraphItem",a),this.chart.fire("doubleClickGraphItem",a))},zoom:function(a,b){this.start=a;this.end=b;this.draw()},changeOpacity:function(a){var b=this.set;b&&b.setAttr("opacity",a);for(var b=this.ownColumns,d=0;d<b.length;d++){var e=b[d].set;e&&e.setAttr("opacity",a)}(b=this.bulletSet)&&b.setAttr("opacity",a)},destroy:function(){AmCharts.remove(this.set);AmCharts.remove(this.bulletSet);var a=this.timeOuts;if(a)for(var b=
0;b<a.length;b++)clearTimeout(a[b]);this.timeOuts=[]}});AmCharts.ChartCursor=AmCharts.Class({construct:function(){this.createEvents("changed","zoomed","onHideCursor","draw");this.enabled=!0;this.cursorAlpha=1;this.selectionAlpha=0.2;this.cursorColor="#CC0000";this.categoryBalloonAlpha=1;this.color="#FFFFFF";this.type="cursor";this.zoomed=!1;this.zoomable=!0;this.pan=!1;this.animate=!0;this.categoryBalloonDateFormat="MMM DD, YYYY";this.categoryBalloonEnabled=this.valueBalloonsEnabled=!0;this.rolledOver=!1;this.cursorPosition="middle";this.bulletsEnabled=
this.skipZoomDispatch=!1;this.bulletSize=8;this.oneBalloonOnly=!1},draw:function(){var a=this;a.destroy();var b=a.chart,d=b.container;a.rotate=b.rotate;a.container=d;d=d.set();d.translate(a.x,a.y);a.set=d;b.cursorSet.push(d);d=new AmCharts.AmBalloon;d.chart=b;a.categoryBalloon=d;d.cornerRadius=0;d.borderThickness=0;d.borderAlpha=0;d.showBullet=!1;b=a.categoryBalloonColor;void 0==b&&(b=a.cursorColor);d.fillColor=b;d.fillAlpha=a.categoryBalloonAlpha;d.borderColor=b;d.color=a.color;a.rotate&&(d.pointerOrientation=
"H");"cursor"==a.type?a.createCursor():a.createCrosshair();a.interval=setInterval(function(){a.detectMovement.call(a)},40)},updateData:function(){var a=this.chart.chartData;this.data=a;AmCharts.ifArray(a)&&(this.firstTime=a[0].time,this.lastTime=a[a.length-1].time)},createCursor:function(){var a=this.chart,b=this.cursorAlpha,d=a.categoryAxis,e=d.position,f=d.inside,g=d.axisThickness,h=this.categoryBalloon,j,k,l=a.dx,m=a.dy,p=this.x,q=this.y,n=this.width,o=this.height,a=a.rotate,r=d.tickLength;h.pointerWidth=
r;a?(j=[0,n,n+l],k=[0,0,m]):(j=[l,0,0],k=[m,0,o-1]);this.line=b=AmCharts.line(this.container,j,k,this.cursorColor,b,1);this.set.push(b);a?(f&&(h.pointerWidth=0),"right"==e?f?h.setBounds(p,q+m,p+n+l,q+o+m):h.setBounds(p+n+l+g,q+m,p+n+1E3,q+o+m):f?h.setBounds(p,q,n+p,o+q):h.setBounds(-1E3,-1E3,p-r-g,q+o+15)):(h.maxWidth=n,d.parseDates&&(r=0,h.pointerWidth=0),"top"==e?f?h.setBounds(p+l,q+m,n+l+p,o+q):h.setBounds(p+l,-1E3,n+l+p,q+m-r-g):f?h.setBounds(p,q,n+p,o+q-r):h.setBounds(p,q+o+r+g-1,p+n,q+o+r+g));
this.hideCursor()},createCrosshair:function(){var a=this.cursorAlpha,b=this.container,d=AmCharts.line(b,[0,0],[0,this.height],this.cursorColor,a,1),a=AmCharts.line(b,[0,this.width],[0,0],this.cursorColor,a,1);this.set.push(d);this.set.push(a);this.vLine=d;this.hLine=a;this.hideCursor()},detectMovement:function(){var a=this.chart;if(a.mouseIsOver){var b=a.mouseX-this.x,d=a.mouseY-this.y;0<b&&b<this.width&&0<d&&d<this.height?(this.drawing?this.rolledOver||a.setMouseCursor("crosshair"):this.pan&&(this.rolledOver||
a.setMouseCursor("move")),this.rolledOver=!0,this.setPosition()):this.rolledOver&&(this.handleMouseOut(),this.rolledOver=!1)}else this.rolledOver&&(this.handleMouseOut(),this.rolledOver=!1)},getMousePosition:function(){var a,b=this.width,d=this.height;a=this.chart;this.rotate?(a=a.mouseY-this.y,0>a&&(a=0),a>d&&(a=d)):(a=a.mouseX-this.x,0>a&&(a=0),a>b&&(a=b));return a},updateCrosshair:function(){var a=this.chart,b=a.mouseX-this.x,d=a.mouseY-this.y,e=this.vLine,f=this.hLine,b=AmCharts.fitToBounds(b,
0,this.width),d=AmCharts.fitToBounds(d,0,this.height);0<this.cursorAlpha&&(e.show(),f.show(),e.translate(b,0),f.translate(0,d));this.zooming&&this.updateSelectionSize(b,d);!a.mouseIsOver&&!this.zooming&&this.hideCursor()},updateSelectionSize:function(a,b){AmCharts.remove(this.selection);var d=this.selectionPosX,e=this.selectionPosY,f=0,g=0,h=this.width,j=this.height;if(!isNaN(a)&&(d>a&&(f=a,h=d-a),d<a&&(f=d,h=a-d),d==a))f=a,h=0;if(!isNaN(b)&&(e>b&&(g=b,j=e-b),e<b&&(g=e,j=b-e),e==b))g=b,j=0;0<h&&0<
j&&(d=AmCharts.rect(this.container,h,j,this.cursorColor,this.selectionAlpha),d.translate(f+this.x,g+this.y),this.selection=d)},arrangeBalloons:function(){var a=this.valueBalloons,b=this.x,d=this.y,e=this.height+d;a.sort(this.compareY);for(var f=0;f<a.length;f++){var g=a[f].balloon;g.setBounds(b,d,b+this.width,e);g.draw();e=g.yPos-3}this.arrangeBalloons2()},compareY:function(a,b){return a.yy<b.yy?1:-1},arrangeBalloons2:function(){var a=this.valueBalloons;a.reverse();for(var b,d=this.x,e,f=0;f<a.length;f++){var g=
a[f].balloon;b=g.bottom;var h=g.bottom-g.yPos;0<f&&b-h<e+3&&(g.setBounds(d,e+3,d+this.width,e+h+3),g.draw());g.set&&g.set.show();e=g.bottom}},showBullets:function(){AmCharts.remove(this.allBullets);var a=this.container,b=a.set();this.set.push(b);this.set.show();this.allBullets=b;for(var b=this.chart.graphs,d=0;d<b.length;d++){var e=b[d];if(e.showBalloon&&!e.hidden&&e.balloonText){var f=this.data[this.index].axes[e.valueAxis.id].graphs[e.id],g=f.y;if(!isNaN(g)){var h,j;h=f.x;this.rotate?(j=g,g=h):
j=h;e=AmCharts.circle(a,this.bulletSize/2,this.chart.getBalloonColor(e,f),e.cursorBulletAlpha);e.translate(j,g);this.allBullets.push(e)}}}},destroy:function(){this.clear();AmCharts.remove(this.selection);this.selection=null;var a=this.categoryBalloon;a&&a.destroy();this.destroyValueBalloons();AmCharts.remove(this.set)},clear:function(){clearInterval(this.interval)},destroyValueBalloons:function(){var a=this.valueBalloons;if(a)for(var b=0;b<a.length;b++)a[b].balloon.destroy()},zoom:function(a,b,d,
e){var f=this.chart;this.destroyValueBalloons();this.zooming=!1;var g;this.rotate?this.selectionPosY=g=f.mouseY:this.selectionPosX=g=f.mouseX;this.start=a;this.end=b;this.startTime=d;this.endTime=e;this.zoomed=!0;var h=f.categoryAxis,f=this.rotate;g=this.width;var j=this.height;h.parseDates&&!h.equalSpacing?(a=e-d+h.minDuration(),a=f?j/a:g/a):a=f?j/(b-a):g/(b-a);this.stepWidth=a;this.setPosition();this.hideCursor()},hideObj:function(a){a&&a.hide()},hideCursor:function(a){void 0==a&&(a=!0);this.hideObj(this.set);
this.hideObj(this.categoryBalloon);this.hideObj(this.line);this.hideObj(this.vLine);this.hideObj(this.hLine);this.hideObj(this.allBullets);this.destroyValueBalloons();AmCharts.remove(this.selection);this.previousIndex=NaN;a&&this.fire("onHideCursor",{type:"onHideCursor",chart:this.chart,target:this});this.chart.setMouseCursor("auto")},setPosition:function(a,b){void 0==b&&(b=!0);if("cursor"==this.type){if(AmCharts.ifArray(this.data)){a||(a=this.getMousePosition());if((a!=this.previousMousePosition||
!0==this.zoomed||this.oneBalloonOnly)&&!isNaN(a)){var d=this.chart.categoryAxis.xToIndex(a);if(d!=this.previousIndex||this.zoomed||"mouse"==this.cursorPosition||this.oneBalloonOnly)this.updateCursor(d,b),this.zoomed=!1}this.previousMousePosition=a}}else this.updateCrosshair()},updateCursor:function(a,b){var d=this.chart,e=d.mouseX-this.x,f=d.mouseY-this.y;this.drawingNow&&(AmCharts.remove(this.drawingLine),this.drawingLine=AmCharts.line(this.container,[this.drawStartX,e],[this.drawStartY,f],this.cursorColor,
1,1));if(this.enabled){void 0==b&&(b=!0);this.index=a;var g=d.categoryAxis,h=d.dx,j=d.dy,k=this.x,l=this.y,m=this.width,p=this.height,q=this.data[a],n=q.x[g.id],o=d.rotate,r=g.inside,s=this.stepWidth,t=this.categoryBalloon,u=this.firstTime,x=this.lastTime,y=this.cursorPosition,D=g.position,v=this.zooming,B=this.panning,O=d.graphs,E=g.axisThickness;if(d.mouseIsOver||v||B||this.forceShow)if(this.forceShow=!1,B){m=this.panClickPos;d=this.panClickEndTime;v=this.panClickStartTime;k=this.panClickEnd;l=
this.panClickStart;e=(o?m-f:m-e)/s;if(!g.parseDates||g.equalSpacing)e=Math.round(e);0!=e&&(m={type:"zoomed",target:this},m.chart=this.chart,g.parseDates&&!g.equalSpacing?(d+e>x&&(e=x-d),v+e<u&&(e=u-v),m.start=v+e,m.end=d+e,this.fire(m.type,m)):k+e>=this.data.length||0>l+e||(m.start=l+e,m.end=k+e,this.fire(m.type,m)))}else{"start"==y&&(n-=g.cellWidth/2);"mouse"==y&&(n=o?f-2:e-2);if(o){if(0>n)if(v)n=0;else{this.hideCursor();return}if(n>p+1)if(v)n=p+1;else{this.hideCursor();return}}else{if(0>n)if(v)n=
0;else{this.hideCursor();return}if(n>m)if(v)n=m;else{this.hideCursor();return}}0<this.cursorAlpha&&(u=this.line,o?u.translate(0,n+j):u.translate(n,0),u.show());this.linePos=o?n+j:n;v&&(o?this.updateSelectionSize(NaN,n):this.updateSelectionSize(n,NaN));u=!0;v&&(u=!1);this.categoryBalloonEnabled&&u?(o?(r&&("right"==D?t.setBounds(k,l+j,k+m+h,l+n+j):t.setBounds(k,l+j,k+m+h,l+n)),"right"==D?r?t.setPosition(k+m+h,l+n+j):t.setPosition(k+m+h+E,l+n+j):r?t.setPosition(k,l+n):t.setPosition(k-E,l+n)):"top"==
D?r?t.setPosition(k+n+h,l+j):t.setPosition(k+n+h,l+j-E+1):r?t.setPosition(k+n,l+p):t.setPosition(k+n,l+p+E-1),g.parseDates)?(g=AmCharts.formatDate(q.category,this.categoryBalloonDateFormat),-1!=g.indexOf("fff")&&(g=AmCharts.formatMilliseconds(g,q.category)),t.showBalloon(g)):t.showBalloon(q.category):t.hide();O&&this.bulletsEnabled&&this.showBullets();this.destroyValueBalloons();if(O&&this.valueBalloonsEnabled&&u&&d.balloon.enabled){this.valueBalloons=g=[];if(this.oneBalloonOnly)for(var h=Infinity,
U,u=0;u<O.length;u++)s=O[u],s.showBalloon&&!s.hidden&&s.balloonText&&(t=q.axes[s.valueAxis.id].graphs[s.id],x=t.y,isNaN(x)||(o?Math.abs(e-x)<h&&(h=Math.abs(e-x),U=s):Math.abs(f-x)<h&&(h=Math.abs(f-x),U=s)));for(u=0;u<O.length;u++)if(s=O[u],!(this.oneBalloonOnly&&s!=U)&&s.showBalloon&&!s.hidden&&s.balloonText&&(t=q.axes[s.valueAxis.id].graphs[s.id],x=t.y,!isNaN(x))){j=t.x;n=!0;if(o){if(h=x,0>j||j>p)n=!1}else if(h=j,j=x,0>h||h>m)n=!1;n&&(r=d.getBalloonColor(s,t),n=new AmCharts.AmBalloon,n.chart=d,AmCharts.copyProperties(d.balloon,
n),n.setBounds(k,l,k+m,l+p),n.pointerOrientation="H",n.changeColor(r),void 0!=s.balloonAlpha&&(n.fillAlpha=s.balloonAlpha),void 0!=s.balloonTextColor&&(n.color=s.balloonTextColor),n.setPosition(h+k,j+l),s=d.formatString(s.balloonText,t,s),""!=s&&n.showBalloon(s),!o&&n.set&&n.set.hide(),g.push({yy:x,balloon:n}))}o||this.arrangeBalloons()}b?(m={type:"changed"},m.index=a,m.target=this,m.chart=this.chart,m.zooming=v,m.position=o?f:e,m.target=this,d.fire("changed",m),this.fire("changed",m),this.skipZoomDispatch=
!1):(this.skipZoomDispatch=!0,d.updateLegendValues(a));this.previousIndex=a}}else this.hideCursor()},enableDrawing:function(a){this.enabled=!a;this.hideCursor();this.rolledOver=!1;this.drawing=a},isZooming:function(a){a&&a!=this.zooming&&this.handleMouseDown("fake");!a&&a!=this.zooming&&this.handleMouseUp()},handleMouseOut:function(){if(this.enabled)if(this.zooming)this.setPosition();else{this.index=void 0;var a={type:"changed",index:void 0,target:this};a.chart=this.chart;this.fire("changed",a);this.hideCursor()}},
handleReleaseOutside:function(){this.handleMouseUp()},handleMouseUp:function(){var a=this.chart,b=a.mouseX-this.x,d=a.mouseY-this.y;if(this.drawingNow){this.drawingNow=!1;AmCharts.remove(this.drawingLine);var e=this.drawStartX,f=this.drawStartY;if(2<Math.abs(e-b)||2<Math.abs(f-d))a={type:"draw",target:this,chart:a,initialX:e,initialY:f,finalX:b,finalY:d},this.fire(a.type,a)}if(this.enabled){if(this.pan)this.rolledOver=!1;else if(this.zoomable&&this.zooming){a={type:"zoomed",target:this};a.chart=this.chart;
if("cursor"==this.type){if(this.rotate?this.selectionPosY=d:this.selectionPosX=d=b,!(2>Math.abs(d-this.initialMouse)&&this.fromIndex==this.index))this.index<this.fromIndex?(a.end=this.fromIndex,a.start=this.index):(a.end=this.index,a.start=this.fromIndex),d=this.chart.categoryAxis,d.parseDates&&!d.equalSpacing&&(a.start=this.data[a.start].time,a.end=this.data[a.end].time),this.skipZoomDispatch||this.fire(a.type,a)}else{var g=this.initialMouseX,h=this.initialMouseY;3>Math.abs(b-g)&&3>Math.abs(d-h)||
(e=Math.min(g,b),f=Math.min(h,d),b=Math.abs(g-b),d=Math.abs(h-d),a.selectionHeight=d,a.selectionWidth=b,a.selectionY=f,a.selectionX=e,this.skipZoomDispatch||this.fire(a.type,a))}AmCharts.remove(this.selection)}this.panning=this.zooming=this.skipZoomDispatch=!1}},handleMouseDown:function(a){if(this.zoomable||this.pan||this.drawing){var b=this.rotate,d=this.chart,e=d.mouseX-this.x,f=d.mouseY-this.y;if(0<e&&e<this.width&&0<f&&f<this.height||"fake"==a)this.setPosition(),this.drawing?(this.drawStartY=
f,this.drawStartX=e,this.drawingNow=!0):this.pan?(this.zoomable=!1,d.setMouseCursor("move"),this.panning=!0,this.hideCursor(!0),this.panClickPos=b?f:e,this.panClickStart=this.start,this.panClickEnd=this.end,this.panClickStartTime=this.startTime,this.panClickEndTime=this.endTime):this.zoomable&&("cursor"==this.type?(this.fromIndex=this.index,b?(this.initialMouse=f,this.selectionPosY=this.linePos):(this.initialMouse=e,this.selectionPosX=this.linePos)):(this.initialMouseX=e,this.initialMouseY=f,this.selectionPosX=
e,this.selectionPosY=f),this.zooming=!0)}}});AmCharts.SimpleChartScrollbar=AmCharts.Class({construct:function(){this.createEvents("zoomed");this.backgroundColor="#D4D4D4";this.backgroundAlpha=1;this.selectedBackgroundColor="#EFEFEF";this.scrollDuration=this.selectedBackgroundAlpha=1;this.resizeEnabled=!0;this.hideResizeGrips=!1;this.scrollbarHeight=20;this.updateOnReleaseOnly=!1;9>document.documentMode&&(this.updateOnReleaseOnly=!0);this.dragIconWidth=11;this.dragIconHeight=18},draw:function(){var a=this;a.destroy();a.interval=setInterval(function(){a.updateScrollbar.call(a)},
40);var b=a.chart.container,d=a.rotate,e=a.chart,f=b.set();a.set=f;e.scrollbarsSet.push(f);var g,h;d?(g=a.scrollbarHeight,h=e.plotAreaHeight):(h=a.scrollbarHeight,g=e.plotAreaWidth);a.width=g;if((a.height=h)&&g){var j=AmCharts.rect(b,g,h,a.backgroundColor,a.backgroundAlpha);a.bg=j;f.push(j);j=AmCharts.rect(b,g,h,"#000",0.005);f.push(j);a.invisibleBg=j;j.click(function(){a.handleBgClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()}).touchend(function(){a.handleBgClick()});
j=AmCharts.rect(b,g,h,a.selectedBackgroundColor,a.selectedBackgroundAlpha);a.selectedBG=j;f.push(j);g=AmCharts.rect(b,g,h,"#000",0.005);a.dragger=g;f.push(g);g.mousedown(function(b){a.handleDragStart(b)}).mouseup(function(){a.handleDragStop()}).mouseover(function(){a.handleDraggerOver()}).mouseout(function(){a.handleMouseOut()}).touchstart(function(b){a.handleDragStart(b)}).touchend(function(){a.handleDragStop()});g=e.pathToImages;d?(j=g+"dragIconH.gif",h=a.dragIconWidth,g=a.dragIconHeight):(j=g+
"dragIcon.gif",g=a.dragIconWidth,h=a.dragIconHeight);d=b.image(j,0,0,g,h);g=b.image(j,0,0,g,h);h=AmCharts.rect(b,10,20,"#000",0.005);j=AmCharts.rect(b,10,20,"#000",0.005);d=b.set([d,j]);b=b.set([g,h]);a.iconLeft=d;f.push(a.iconLeft);a.iconRight=b;f.push(b);d.mousedown(function(){a.leftDragStart()}).mouseup(function(){a.leftDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(){a.leftDragStart()}).touchend(function(){a.leftDragStop()});b.mousedown(function(){a.rightDragStart()}).mouseup(function(){a.rightDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(){a.rightDragStart()}).touchend(function(){a.rightDragStop()});
AmCharts.ifArray(e.chartData)?f.show():f.hide();a.hideDragIcons()}f.translate(a.x,a.y);a.clipDragger(!1)},updateScrollbarSize:function(a,b){var d=this.dragger,e,f,g,h;this.rotate?(e=0,f=a,g=this.width+1,h=b-a,d.setAttr("height",b-a),d.setAttr("y",f)):(e=a,f=0,g=b-a,h=this.height+1,d.setAttr("width",b-a),d.setAttr("x",e));this.clipAndUpdate(e,f,g,h)},updateScrollbar:function(){var a,b=!1,d,e,f=this.x,g=this.y,h=this.dragger,j=this.getDBox();d=j.x+f;e=j.y+g;var k=j.width,j=j.height,l=this.rotate,m=
this.chart,p=this.width,q=this.height,n=m.mouseX,o=m.mouseY;a=this.initialMouse;m.mouseIsOver&&(this.dragging&&(m=this.initialCoord,l?(a=m+(o-a),0>a&&(a=0),m=q-j,a>m&&(a=m),h.setAttr("y",a)):(a=m+(n-a),0>a&&(a=0),m=p-k,a>m&&(a=m),h.setAttr("x",a))),this.resizingRight&&(l?(a=o-e,a+e>q+g&&(a=q-e+g),0>a?(this.resizingRight=!1,b=this.resizingLeft=!0):(0==a&&(a=0.1),h.setAttr("height",a))):(a=n-d,a+d>p+f&&(a=p-d+f),0>a?(this.resizingRight=!1,b=this.resizingLeft=!0):(0==a&&(a=0.1),h.setAttr("width",a)))),
this.resizingLeft&&(l?(d=e,e=o,e<g&&(e=g),e>q+g&&(e=q+g),a=!0==b?d-e:j+d-e,0>a?(this.resizingRight=!0,this.resizingLeft=!1,h.setAttr("y",d+j-g)):(0==a&&(a=0.1),h.setAttr("y",e-g),h.setAttr("height",a))):(e=n,e<f&&(e=f),e>p+f&&(e=p+f),a=!0==b?d-e:k+d-e,0>a?(this.resizingRight=!0,this.resizingLeft=!1,h.setAttr("x",d+k-f)):(0==a&&(a=0.1),h.setAttr("x",e-f),h.setAttr("width",a)))),this.clipDragger(!0))},clipDragger:function(a){var b=this.getDBox(),d=b.x,e=b.y,f=b.width,b=b.height,g=!1;if(this.rotate){if(d=
0,f=this.width+1,this.clipY!=e||this.clipH!=b)g=!0}else if(e=0,b=this.height+1,this.clipX!=d||this.clipW!=f)g=!0;g&&(this.clipAndUpdate(d,e,f,b),a&&(this.updateOnReleaseOnly||this.dispatchScrollbarEvent()))},maskGraphs:function(){},clipAndUpdate:function(a,b,d,e){this.clipX=a;this.clipY=b;this.clipW=d;this.clipH=e;this.selectedBG.clipRect(a,b,d,e);this.updateDragIconPositions();this.maskGraphs(a,b,d,e)},dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart;a.hideBalloon();
var b=this.getDBox(),d=b.x,e=b.y,f=b.width,b=b.height;this.rotate?(d=e,f=this.height/b):f=this.width/f;a={type:"zoomed",position:d,chart:a,target:this,multiplyer:f};this.fire(a.type,a)}},updateDragIconPositions:function(){var a=this.getDBox(),b=a.x,d=a.y,e=this.iconLeft,f=this.iconRight,g,h,j=this.scrollbarHeight;this.rotate?(g=this.dragIconWidth,h=this.dragIconHeight,e.translate((j-h)/2,d-g/2),f.translate((j-h)/2,d+a.height-g/2)):(g=this.dragIconHeight,h=this.dragIconWidth,e.translate(b-h/2,(j-g)/
2),f.translate(b+-h/2+a.width,(j-g)/2))},showDragIcons:function(){this.resizeEnabled&&(this.iconLeft.show(),this.iconRight.show())},hideDragIcons:function(){!this.resizingLeft&&!this.resizingRight&&!this.dragging&&(this.hideResizeGrips&&(this.iconLeft.hide(),this.iconRight.hide()),this.removeCursors())},removeCursors:function(){this.chart.setMouseCursor("auto")},relativeZoom:function(a,b){this.dragger.stop();this.multiplyer=a;this.position=b;this.updateScrollbarSize(b,this.rotate?b+this.height/a:
b+this.width/a)},destroy:function(){this.clear();AmCharts.remove(this.set)},clear:function(){clearInterval(this.interval)},handleDragStart:function(){var a=this.chart;this.dragger.stop();this.removeCursors();this.dragging=!0;var b=this.getDBox();this.rotate?(this.initialCoord=b.y,this.initialMouse=a.mouseY):(this.initialCoord=b.x,this.initialMouse=a.mouseX)},handleDragStop:function(){this.updateOnReleaseOnly&&(this.updateScrollbar(),this.skipEvent=!1,this.dispatchScrollbarEvent());this.dragging=!1;
this.mouseIsOver&&this.removeCursors();this.updateScrollbar()},handleDraggerOver:function(){this.handleMouseOver()},leftDragStart:function(){this.dragger.stop();this.resizingLeft=!0},leftDragStop:function(){this.resizingLeft=!1;this.mouseIsOver||this.removeCursors();this.updateOnRelease()},rightDragStart:function(){this.dragger.stop();this.resizingRight=!0},rightDragStop:function(){this.resizingRight=!1;this.mouseIsOver||this.removeCursors();this.updateOnRelease()},iconRollOut:function(){this.removeCursors()},
iconRollOver:function(){this.rotate?this.chart.setMouseCursor("n-resize"):this.chart.setMouseCursor("e-resize");this.handleMouseOver()},getDBox:function(){return this.dragger.getBBox()},handleBgClick:function(){if(!this.resizingRight&&!this.resizingLeft){this.zooming=!0;var a,b,d=this.scrollDuration,e=this.dragger;a=this.getDBox();var f=a.height,g=a.width;b=this.chart;var h=this.y,j=this.x,k=this.rotate;k?(a="y",b=b.mouseY-f/2-h,b=AmCharts.fitToBounds(b,0,this.height-f)):(a="x",b=b.mouseX-g/2-j,b=
AmCharts.fitToBounds(b,0,this.width-g));this.updateOnReleaseOnly?(this.skipEvent=!1,e.setAttr(a,b),this.dispatchScrollbarEvent(),this.clipDragger()):(b=Math.round(b),k?e.animate({y:b},d,">"):e.animate({x:b},d,">"))}},updateOnRelease:function(){this.updateOnReleaseOnly&&(this.updateScrollbar(),this.skipEvent=!1,this.dispatchScrollbarEvent())},handleReleaseOutside:function(){if(this.set){if(this.resizingLeft||this.resizingRight||this.dragging)this.updateOnRelease(),this.removeCursors();this.mouseIsOver=
this.dragging=this.resizingRight=this.resizingLeft=!1;this.hideDragIcons();this.updateScrollbar()}},handleMouseOver:function(){this.mouseIsOver=!0;this.showDragIcons()},handleMouseOut:function(){this.mouseIsOver=!1;this.hideDragIcons()}});AmCharts.ChartScrollbar=AmCharts.Class({inherits:AmCharts.SimpleChartScrollbar,construct:function(){AmCharts.ChartScrollbar.base.construct.call(this);this.graphLineColor="#BBBBBB";this.graphLineAlpha=0;this.graphFillColor="#BBBBBB";this.graphFillAlpha=1;this.selectedGraphLineColor="#888888";this.selectedGraphLineAlpha=0;this.selectedGraphFillColor="#888888";this.selectedGraphFillAlpha=1;this.gridCount=0;this.gridColor="#FFFFFF";this.gridAlpha=0.7;this.skipEvent=this.autoGridCount=!1;this.color="#FFFFFF";
this.scrollbarCreated=!1},init:function(){var a=this.categoryAxis,b=this.chart;a||(this.categoryAxis=a=new AmCharts.CategoryAxis);a.chart=b;a.id="scrollbar";a.dateFormats=b.categoryAxis.dateFormats;a.axisItemRenderer=AmCharts.RecItem;a.axisRenderer=AmCharts.RecAxis;a.guideFillRenderer=AmCharts.RecFill;a.inside=!0;a.fontSize=this.fontSize;a.tickLength=0;a.axisAlpha=0;if(this.graph&&(a=this.valueAxis,a||(this.valueAxis=a=new AmCharts.ValueAxis,a.visible=!1,a.scrollbar=!0,a.axisItemRenderer=AmCharts.RecItem,
a.axisRenderer=AmCharts.RecAxis,a.guideFillRenderer=AmCharts.RecFill,a.labelsEnabled=!1,a.chart=b),b=this.unselectedGraph,b||(b=new AmCharts.AmGraph,b.scrollbar=!0,this.unselectedGraph=b),b=this.selectedGraph,!b))b=new AmCharts.AmGraph,b.scrollbar=!0,this.selectedGraph=b;this.scrollbarCreated=!0},draw:function(){var a=this;AmCharts.ChartScrollbar.base.draw.call(a);a.scrollbarCreated||a.init();var b=a.chart,d=b.chartData,e=a.categoryAxis,f=a.rotate,g=a.x,h=a.y,j=a.width,k=a.height,l=b.categoryAxis,
m=a.set;e.setOrientation(!f);e.parseDates=l.parseDates;e.rotate=f;e.equalSpacing=l.equalSpacing;e.minPeriod=l.minPeriod;e.startOnAxis=l.startOnAxis;e.viW=j;e.viH=k;e.width=j;e.height=k;e.gridCount=a.gridCount;e.gridColor=a.gridColor;e.gridAlpha=a.gridAlpha;e.color=a.color;e.autoGridCount=a.autoGridCount;e.parseDates&&!e.equalSpacing&&e.timeZoom(d[0].time,d[d.length-1].time);e.zoom(0,d.length-1);if(l=a.graph){var p=a.valueAxis,q=l.valueAxis;p.id=q.id;p.rotate=f;p.setOrientation(f);p.width=j;p.height=
k;p.viW=j;p.viH=k;p.dataProvider=d;p.reversed=q.reversed;p.logarithmic=q.logarithmic;p.gridAlpha=0;p.axisAlpha=0;m.push(p.set);f?p.y=h:p.x=g;for(var g=Infinity,h=-Infinity,n=0;n<d.length;n++){var o=d[n].axes[q.id].graphs[l.id].values,r;for(r in o)if("percents"!=r&&"total"!=r){var s=o[r];s<g&&(g=s);s>h&&(h=s)}}Infinity!=g&&(p.minimum=g);-Infinity!=h&&(p.maximum=h+0.1*(h-g));g==h&&(p.minimum-=1,p.maximum+=1);p.zoom(0,d.length-1);r=a.unselectedGraph;r.id=l.id;r.rotate=f;r.chart=b;r.chartType=b.chartType;
r.data=d;r.valueAxis=p;r.chart=l.chart;r.categoryAxis=a.categoryAxis;r.valueField=l.valueField;r.openField=l.openField;r.closeField=l.closeField;r.highField=l.highField;r.lowField=l.lowField;r.lineAlpha=a.graphLineAlpha;r.lineColor=a.graphLineColor;r.fillAlphas=a.graphFillAlpha;r.fillColors=a.graphFillColor;r.connect=l.connect;r.hidden=l.hidden;r.width=j;r.height=k;q=a.selectedGraph;q.id=l.id;q.rotate=f;q.chart=b;q.chartType=b.chartType;q.data=d;q.valueAxis=p;q.chart=l.chart;q.categoryAxis=e;q.valueField=
l.valueField;q.openField=l.openField;q.closeField=l.closeField;q.highField=l.highField;q.lowField=l.lowField;q.lineAlpha=a.selectedGraphLineAlpha;q.lineColor=a.selectedGraphLineColor;q.fillAlphas=a.selectedGraphFillAlpha;q.fillColors=a.selectedGraphFillColor;q.connect=l.connect;q.hidden=l.hidden;q.width=j;q.height=k;b=a.graphType;b||(b=l.type);r.type=b;q.type=b;d=d.length-1;r.zoom(0,d);q.zoom(0,d);q.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});
r.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});m.push(r.set);m.push(q.set)}m.push(e.set);m.push(e.labelsSet);a.bg.toBack();a.invisibleBg.toFront();a.dragger.toFront();a.iconLeft.toFront();a.iconRight.toFront()},timeZoom:function(a,b){this.startTime=a;this.endTime=b;this.timeDifference=b-a;this.skipEvent=!0;this.zoomScrollbar()},zoom:function(a,b){this.start=a;this.end=b;this.skipEvent=!0;this.zoomScrollbar()},
dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart.chartData,b,d,e=this.dragger.getBBox();b=e.x;d=e.y;var f=e.width,e=e.height;this.rotate?(b=d,d=e):d=f;f={type:"zoomed",target:this};f.chart=this.chart;var e=this.categoryAxis,g=this.stepWidth;if(e.parseDates&&!e.equalSpacing){var a=a[0].time,h=e.minDuration(),e=Math.round(b/g)+a,a=this.dragging?e+this.timeDifference:Math.round((b+d)/g)+a-h;e>a&&(e=a);if(e!=this.startTime||a!=this.endTime)this.startTime=e,this.endTime=
a,f.start=e,f.end=a,f.startDate=new Date(e),f.endDate=new Date(a),this.fire(f.type,f)}else if(e.startOnAxis||(b+=g/2),d-=this.stepWidth/2,g=e.xToIndex(b),b=e.xToIndex(b+d),g!=this.start||this.end!=b){e.startOnAxis&&(this.resizingRight&&g==b&&b++,this.resizingLeft&&g==b&&(0<g?g--:b=1));this.start=g;this.end=this.dragging?this.start+this.difference:b;f.start=this.start;f.end=this.end;if(e.parseDates&&(a[this.start]&&(f.startDate=new Date(a[this.start].time)),a[this.end]))f.endDate=new Date(a[this.end].time);
this.fire(f.type,f)}}},zoomScrollbar:function(){var a,b;b=this.chart.chartData;var d=this.categoryAxis,e;d.parseDates&&!d.equalSpacing?(e=d.stepWidth,b=b[0].time,a=e*(this.startTime-b),b=e*(this.endTime-b+d.minDuration())):(a=b[this.start].x[d.id],b=b[this.end].x[d.id],e=d.stepWidth,d.startOnAxis||(d=e/2,a-=d,b+=d));this.stepWidth=e;this.updateScrollbarSize(a,b)},maskGraphs:function(a,b,d,e){var f=this.selectedGraph;f&&f.set.clipRect(a,b,d,e)},handleDragStart:function(){AmCharts.ChartScrollbar.base.handleDragStart.call(this);
this.difference=this.end-this.start;this.timeDifference=this.endTime-this.startTime;0>this.timeDifference&&(this.timeDifference=0)},handleBackgroundClick:function(){AmCharts.ChartScrollbar.base.handleBackgroundClick.call(this);this.dragging||(this.difference=this.end-this.start,this.timeDifference=this.endTime-this.startTime,0>this.timeDifference&&(this.timeDifference=0))}});AmCharts.circle=function(a,b,d,e,f,g,h,j){if(void 0==f||0==f)f=1;void 0==g&&(g="#000000");void 0==h&&(h=0);e={fill:d,stroke:g,"fill-opacity":e,"stroke-width":f,"stroke-opacity":h};a=a.circle(0,0,b).attr(e);j&&a.gradient("radialGradient",[d,AmCharts.adjustLuminosity(d,-0.6)]);return a};AmCharts.text=function(a,b,d,e,f,g,h,j){g||(g="middle");d={fill:d,"font-family":e,"font-size":f,opacity:j};!0==h&&(d["font-weight"]="bold");d["text-anchor"]=g;return a.text(b,d)};
AmCharts.polygon=function(a,b,d,e,f,g,h,j,k){isNaN(g)&&(g=0);isNaN(j)&&(j=f);var l=e,m=!1;"object"==typeof l&&1<l.length&&(m=!0,l=l[0]);void 0==h&&(h=l);for(var f={fill:l,stroke:h,"fill-opacity":f,"stroke-width":g,"stroke-opacity":j},g=AmCharts.dx,h=AmCharts.dy,j=Math.round,l="M"+(j(b[0])+g)+","+(j(d[0])+h),p=1;p<b.length;p++)l+=" L"+(j(b[p])+g)+","+(j(d[p])+h);a=a.path(l+" Z").attr(f);m&&a.gradient("linearGradient",e,k);return a};
AmCharts.rect=function(a,b,d,e,f,g,h,j,k,l){isNaN(g)&&(g=0);void 0==k&&(k=0);void 0==l&&(l=270);isNaN(f)&&(f=0);var m=e,p=!1;"object"==typeof m&&(m=m[0],p=!0);void 0==h&&(h=m);void 0==j&&(j=f);var b=Math.round(b),d=Math.round(d),q=0,n=0;0>b&&(b=Math.abs(b),q=-b);0>d&&(d=Math.abs(d),n=-d);q+=AmCharts.dx;n+=AmCharts.dy;f={fill:m,stroke:h,"fill-opacity":f,"stroke-opacity":j};a=a.rect(q,n,b,d,k,g).attr(f);p&&a.gradient("linearGradient",e,l);return a};
AmCharts.triangle=function(a,b,d,e,f,g,h,j){if(void 0==g||0==g)g=1;void 0==h&&(h="#000");void 0==j&&(j=0);var e={fill:e,stroke:h,"fill-opacity":f,"stroke-width":g,"stroke-opacity":j},b=b/2,k;0==d&&(k=" M"+-b+","+b+" L0,"+-b+" L"+b+","+b+" Z");180==d&&(k=" M"+-b+","+-b+" L0,"+b+" L"+b+","+-b+" Z");90==d&&(k=" M"+-b+","+-b+" L"+b+",0 L"+-b+","+b+" Z");270==d&&(k=" M"+-b+",0 L"+b+","+b+" L"+b+","+-b+" Z");return a.path(k).attr(e)};
AmCharts.line=function(a,b,d,e,f,g,h,j,k){j="none";void 0!=h&&(j=h);g={fill:"none","stroke-dasharray":j,"stroke-width":g};isNaN(f)||(g["stroke-opacity"]=f);e&&(g.stroke=e);for(var e=Math.round,f=AmCharts.dx,h=AmCharts.dy,j="M"+(e(b[0])+f)+","+(e(d[0])+h),l=1;l<b.length;l++)j+=" L"+(e(b[l])+f)+","+(e(d[l])+h);if(AmCharts.VML)return a.path(j,void 0,!0).attr(g);k&&(j+=" M0,0 L0,0");return a.path(j).attr(g)};
AmCharts.wedge=function(a,b,d,e,f,g,h,j,k,l){var m=Math.round,g=m(g),h=m(h),j=m(j),p=m(h/g*j),q=AmCharts.VML;-359.9>=f&&(f=-359.9);var n=1/180*Math.PI,o=b+Math.cos(e*n)*j,r=d+Math.sin(-e*n)*p,s=b+Math.cos(e*n)*g,t=d+Math.sin(-e*n)*h,u=b+Math.cos((e+f)*n)*g,x=d+Math.sin((-e-f)*n)*h,y=b+Math.cos((e+f)*n)*j,n=d+Math.sin((-e-f)*n)*p,D={fill:AmCharts.adjustLuminosity(l.fill,-0.2),"stroke-opacity":0},v=0;180<Math.abs(f)&&(v=1);var e=a.set(),B;q&&(o=m(10*o),s=m(10*s),u=m(10*u),y=m(10*y),r=m(10*r),t=m(10*
t),x=m(10*x),n=m(10*n),b=m(10*b),k=m(10*k),d=m(10*d),g*=10,h*=10,j*=10,p*=10,1>Math.abs(f)&&1>=Math.abs(u-s)&&1>=Math.abs(x-t)&&(B=!0));if(0<k){var O;q?(path=" M"+o+","+(r+k)+" L"+s+","+(t+k),B||(path+=" A"+(b-g)+","+(k+d-h)+","+(b+g)+","+(k+d+h)+","+s+","+(t+k)+","+u+","+(x+k)),path+=" L"+y+","+(n+k),0<j&&(path+=" B"+(b-j)+","+(k+d-p)+","+(b+j)+","+(k+d+p)+","+y+","+(k+n)+","+o+","+(k+r))):(path=" M"+o+","+(r+k)+" L"+s+","+(t+k),path+=" A"+g+","+h+",0,"+v+",1,"+u+","+(x+k)+" L"+y+","+(n+k),0<j&&
(path+=" A"+j+","+p+",0,"+v+",0,"+o+","+(r+k)));path+=" Z";c=a.path(path,void 0,void 0,"1000,1000").attr(D);e.push(c);f=a.path(" M"+o+","+r+" L"+o+","+(r+k)+" L"+s+","+(t+k)+" L"+s+","+t+" L"+o+","+r+" Z",void 0,void 0,"1000,1000").attr(D);k=a.path(" M"+u+","+x+" L"+u+","+(x+k)+" L"+y+","+(n+k)+" L"+y+","+n+" L"+u+","+x+" Z",void 0,void 0,"1000,1000").attr(D);e.push(f);e.push(k)}q?(B||(O=" A"+m(b-g)+","+m(d-h)+","+m(b+g)+","+m(d+h)+","+m(s)+","+m(t)+","+m(u)+","+m(x)),g=" M"+m(o)+","+m(r)+" L"+m(s)+
","+m(t)+O+" L"+m(y)+","+m(n)):g=" M"+o+","+r+" L"+s+","+t+(" A"+g+","+h+",0,"+v+",1,"+u+","+x)+" L"+y+","+n;0<j&&(q?B||(g+=" B"+(b-j)+","+(d-p)+","+(b+j)+","+(d+p)+","+y+","+n+","+o+","+r):g+=" A"+j+","+p+",0,"+v+",0,"+o+","+r);a=a.path(g+" Z",void 0,void 0,"1000,1000").attr(l);e.push(a);return e};
AmCharts.adjustLuminosity=function(a,b){a=(""+a).replace(/[^0-9a-f]/gi,"");6>a.length&&(a=""+a[0]+(""+a[0])+(""+a[1])+(""+a[1])+(""+a[2])+(""+a[2]));var b=b||0,d="#",e,f;for(f=0;3>f;f++)e=parseInt(a.substr(2*f,2),16),e=Math.round(Math.min(Math.max(0,e+e*b),255)).toString(16),d+=("00"+e).substr(e.length);return d};AmCharts.AmPieChart=AmCharts.Class({inherits:AmCharts.AmChart,construct:function(){this.createEvents("rollOverSlice","rollOutSlice","clickSlice","pullOutSlice","pullInSlice");AmCharts.AmPieChart.base.construct.call(this);this.colors="#FF0F00,#FF6600,#FF9E01,#FCD202,#F8FF01,#B0DE09,#04D215,#0D8ECF,#0D52D1,#2A0CD0,#8A0CCF,#CD0D74,#754DEB,#DDDDDD,#999999,#333333,#000000,#57032A,#CA9726,#990000,#4B0C25".split(",");this.pieAlpha=1;this.pieBaseColor;this.pieBrightnessStep=30;this.groupPercent=0;this.groupedTitle=
"Other";this.groupedPulled=!1;this.groupedAlpha=1;this.marginLeft=0;this.marginBottom=this.marginTop=10;this.marginRight=0;this.minRadius=10;this.hoverAlpha=1;this.depth3D=0;this.startAngle=90;this.angle=this.innerRadius=0;this.outlineColor="#FFFFFF";this.outlineAlpha=0;this.outlineThickness=1;this.startRadius="500%";this.startDuration=this.startAlpha=1;this.startEffect="bounce";this.sequencedAnimation=!1;this.pullOutRadius="20%";this.pullOutDuration=1;this.pullOutEffect="bounce";this.pullOnHover=
this.pullOutOnlyOne=!1;this.labelsEnabled=!0;this.labelRadius=30;this.labelTickColor="#000000";this.labelTickAlpha=0.2;this.labelText="[[title]]: [[percents]]%";this.hideLabelsPercent=0;this.balloonText="[[title]]: [[percents]]% ([[value]])\n[[description]]";this.dataProvider;this.urlTarget="_self";this.previousScale=1;this.autoMarginOffset=10},initChart:function(){AmCharts.AmPieChart.base.initChart.call(this);this.dataChanged&&(this.parseData(),this.dispatchDataUpdated=!0,this.dataChanged=!1,this.legend&&
this.legend.setData(this.chartData));this.drawChart()},handleLegendEvent:function(a){var b=a.type;if(a=a.dataItem){var d=a.hidden;switch(b){case "clickMarker":d||this.clickSlice(a);break;case "clickLabel":d||this.clickSlice(a);break;case "rollOverItem":d||this.rollOverSlice(a,!1);break;case "rollOutItem":d||this.rollOutSlice(a);break;case "hideItem":this.hideSlice(a);break;case "showItem":this.showSlice(a)}}},invalidateVisibility:function(){this.recalculatePercents();this.initChart();var a=this.legend;
a&&a.invalidateSize()},drawChart:function(){var a=this;AmCharts.AmPieChart.base.drawChart.call(a);var b=a.chartData;if(AmCharts.ifArray(b)){AmCharts.VML&&(a.startAlpha=1);var d=a.startDuration,e=a.container,f=a.updateWidth();a.realWidth=f;var g=a.updateHeight();a.realHeight=g;var h=AmCharts.toCoordinate,j=h(a.marginLeft,f),k=h(a.marginRight,f),l=h(a.marginTop,g)+a.getTitleHeight(),m=h(a.marginBottom,g);a.chartDataLabels=[];a.ticks=[];var p,q,n,o=AmCharts.toNumber(a.labelRadius),r=a.measureMaxLabel();
if(!a.labelText||!a.labelsEnabled)o=r=0;p=void 0==a.pieX?(f-j-k)/2+j:h(a.pieX,a.realWidth);q=void 0==a.pieY?(g-l-m)/2+l:h(a.pieY,g);n=h(a.radius,f,g);a.pullOutRadiusReal=AmCharts.toCoordinate(a.pullOutRadius,n);n||(f=0<=o?f-j-k-2*r:f-j-k,g=g-l-m,n=Math.min(f,g),g<f&&(n/=1-a.angle/90,n>f&&(n=f)),a.pullOutRadiusReal=AmCharts.toCoordinate(a.pullOutRadius,n),n=0<=o?n-1.8*(o+a.pullOutRadiusReal):n-1.8*a.pullOutRadiusReal,n/=2);n<a.minRadius&&(n=a.minRadius);a.pullOutRadiusReal=h(a.pullOutRadius,n);h=h(a.innerRadius,
n);h>=n&&(h=n-1);g=AmCharts.fitToBounds(a.startAngle,0,360);0<a.depth3D&&(g=270<=g?270:90);l=n-n*a.angle/90;for(m=0;m<b.length;m++)if(f=b[m],!0!=f.hidden&&0<f.percents){var s=360*-f.percents/100,k=Math.cos((g+s/2)/180*Math.PI),r=Math.sin((-g-s/2)/180*Math.PI)*(l/n),j={fill:f.color,stroke:a.outlineColor,"stroke-width":a.outlineThickness,"stroke-opacity":a.outlineAlpha};f.url&&(j.cursor="pointer");j=AmCharts.wedge(e,p,q,g,s,n,l,h,a.depth3D,j);a.addEventListeners(j,f);f.startAngle=g;b[m].wedge=j;if(0<
d){var t=a.startAlpha;a.chartCreated&&(t=f.alpha);j.setAttr("opacity",t)}f.ix=k;f.iy=r;f.wedge=j;f.index=m;if(a.labelsEnabled&&a.labelText&&f.percents>=a.hideLabelsPercent){s=g+s/2;0>=s&&(s+=360);var k=p+k*(n+o),t=q+r*(n+o),u,r=0;if(0<=o){var x;90>=s&&0<=s?(x=0,u="start",r=8):360>=s&&270<s?(x=1,u="start",r=8):270>=s&&180<s?(x=2,u="end",r=-8):180>=s&&90<s&&(x=3,u="end",r=-8);f.labelQuarter=x}else u="middle";s=a.formatString(a.labelText,f);s=AmCharts.text(e,s,a.color,a.fontFamily,a.fontSize,u);s.translate(k+
1.5*r,t);f.tx=k+1.5*r;f.ty=t;t=setTimeout(function(){a.showLabels.call(a)},1E3*d);a.timeOuts.push(t);j.push(s);f.label=s;a.chartDataLabels[m]=s;f.tx=k;f.tx2=k+r}a.graphsSet.push(j);(0==f.alpha||0<d&&!a.chartCreated)&&j.hide();g-=360*f.percents/100;0>=g&&(g+=360)}0<o&&a.arrangeLabels();a.pieXReal=p;a.pieYReal=q;a.radiusReal=n;a.innerRadiusReal=h;0<o&&a.drawTicks();a=this;a.chartCreated?a.pullSlices(!0):(t=setTimeout(function(){a.pullSlices.call(a)},1200*d),a.timeOuts.push(t));a.chartCreated||a.startSlices();
a.chartCreated=!0;a.dispDUpd()}a.setDepths()},setDepths:function(){for(var a=this.chartData,b=0;b<a.length;b++){var d=a[b],e=d.wedge,d=d.startAngle;90>=d&&0<=d||360>=d&&270<d?e.toFront():(270>=d&&180<d||180>=d&&90<d)&&e.toBack()}},addEventListeners:function(a,b){var d=this;a.mouseover(function(){d.rollOverSlice(b,!0)}).mouseout(function(){d.rollOutSlice(b)}).click(function(){d.clickSlice(b)})},formatString:function(a,b){a=AmCharts.formatValue(a,b,["value"],this.numberFormatter,"",this.usePrefixes,
this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=AmCharts.formatValue(a,b,["percents"],this.percentFormatter);a=AmCharts.massReplace(a,{"[[title]]":b.title,"[[description]]":b.description,"<br>":"\n"});return a=AmCharts.cleanFromEmpty(a)},drawTicks:function(){for(var a=this.chartData,b=0;b<a.length;b++)if(this.chartDataLabels[b]){var d=a[b],e=d.ty,f=this.radiusReal,e=AmCharts.line(this.container,[this.pieXReal+d.ix*f,d.tx,d.tx2],[this.pieYReal+d.iy*f,e,e],this.labelTickColor,this.labelTickAlpha);
d.wedge.push(e);this.ticks[b]=e}},arrangeLabels:function(){for(var a=this.chartData,b=a.length,d,e=b-1;0<=e;e--)d=a[e],0==d.labelQuarter&&!d.hidden&&this.checkOverlapping(e,d,0,!0,0);for(e=0;e<b;e++)d=a[e],1==d.labelQuarter&&!d.hidden&&this.checkOverlapping(e,d,1,!1,0);for(e=b-1;0<=e;e--)d=a[e],2==d.labelQuarter&&!d.hidden&&this.checkOverlapping(e,d,2,!0,0);for(e=0;e<b;e++)d=a[e],3==d.labelQuarter&&!d.hidden&&this.checkOverlapping(e,d,3,!1,0)},checkOverlapping:function(a,b,d,e,f){var g,h,j=this.chartData,
k=j.length,l=b.label;if(l){if(!0==e)for(h=a+1;h<k;h++)(g=this.checkOverlappingReal(b,j[h],d))&&(h=k);else for(h=a-1;0<=h;h--)(g=this.checkOverlappingReal(b,j[h],d))&&(h=0);!0==g&&100>f&&(g=b.ty+3*b.iy,b.ty=g,l.translate(b.tx2,g),this.checkOverlapping(a,b,d,e,f+1))}},checkOverlappingReal:function(a,b,d){var e=!1,f=a.label,g=b.label;a.labelQuarter==d&&!a.hidden&&!b.hidden&&g&&(f=f.getBBox(),d={},d.width=f.width,d.height=f.height,d.y=a.ty,d.x=a.tx,a=g.getBBox(),g={},g.width=a.width,g.height=a.height,
g.y=b.ty,g.x=b.tx,AmCharts.hitTest(d,g)&&(e=!0));return e},startSlices:function(){for(var a=this,b=500*(a.startDuration/a.chartData.length),d=0;d<a.chartData.length;d++)if(0<a.startDuration&&a.sequencedAnimation){var e=setTimeout(function(){a.startSequenced.call(a)},b*d);a.timeOuts.push(e)}else a.startSlice(a.chartData[d])},pullSlices:function(a){for(var b=this.chartData,d=0;d<b.length;d++){var e=b[d];e.pulled&&this.pullSlice(e,1,a)}},startSequenced:function(){for(var a=this.chartData,b=0;b<a.length;b++)if(!a[b].started){this.startSlice(this.chartData[b]);
break}},startSlice:function(a){a.started=!0;var b=a.wedge,d=this.startDuration;if(b&&0<d){0<a.alpha&&b.show();var e=AmCharts.toCoordinate(this.startRadius,this.radiusReal);b.translate(Math.round(a.ix*e),Math.round(a.iy*e));b.animate({opacity:a.alpha,translate:"0,0"},d,this.startEffect)}},showLabels:function(){for(var a=this.chartData,b=0;b<a.length;b++)if(0<a[b].alpha){var d=this.chartDataLabels[b];d&&d.show();(d=this.ticks[b])&&d.show()}},showSlice:function(a){isNaN(a)?a.hidden=!1:this.chartData[a].hidden=
!1;this.hideBalloon();this.invalidateVisibility()},hideSlice:function(a){isNaN(a)?a.hidden=!0:this.chartData[a].hidden=!0;this.hideBalloon();this.invalidateVisibility()},rollOverSlice:function(a,b){isNaN(a)||(a=this.chartData[a]);clearTimeout(this.hoverInt);this.pullOnHover&&this.pullSlice(a,1);var d=this.innerRadiusReal+(this.radiusReal-this.innerRadiusReal)/2;a.pulled&&(d+=this.pullOutRadiusReal);1>this.hoverAlpha&&a.wedge&&a.wedge.attr({opacity:this.hoverAlpha});var e;e=a.ix*d+this.pieXReal;var d=
a.iy*d+this.pieYReal,f=this.formatString(this.balloonText,a),g=AmCharts.adjustLuminosity(a.color,-0.15);this.showBalloon(f,g,b,e,d);e={type:"rollOverSlice",dataItem:a,chart:this};this.fire(e.type,e)},rollOutSlice:function(a){isNaN(a)||(a=this.chartData[a]);a.wedge&&a.wedge.attr({opacity:a.alpha});this.hideBalloon();a={type:"rollOutSlice",dataItem:a,chart:this};this.fire(a.type,a)},clickSlice:function(a){isNaN(a)||(a=this.chartData[a]);this.hideBalloon();a.pulled?this.pullSlice(a,0):this.pullSlice(a,
1);var b=a.url,d=this.urlTarget;b&&("_self"==d||!d?window.location.href=b:(d=document.getElementsByName(d)[0])?d.src=b:window.open(b));a={type:"clickSlice",dataItem:a,chart:this};this.fire(a.type,a)},pullSlice:function(a,b,d){var e=a.ix,f=a.iy,g=this.pullOutDuration;!0===d&&(g=0);var d=a.wedge,h=this.pullOutRadiusReal;d&&d.animate({translate:b*e*h+","+b*f*h},g,this.pullOutEffect);1==b?(a.pulled=!0,this.pullOutOnlyOne&&this.pullInAll(a.index),a={type:"pullOutSlice",dataItem:a,chart:this}):(a.pulled=
!1,a={type:"pullInSlice",dataItem:a,chart:this});this.fire(a.type,a)},pullInAll:function(a){for(var b=this.chartData,d=0;d<this.chartData.length;d++)d!=a&&b[d].pulled&&this.pullSlice(b[d],0)},pullOutAll:function(){for(var a=this.chartData,b=0;b<a.length;b++)a[b].pulled||this.pullSlice(a[b],1)},parseData:function(){var a=[];this.chartData=a;var b=this.dataProvider;if(void 0!=b){for(var d=b.length,e=0,f=0;f<d;f++){var g={},h=b[f];g.dataContext=h;g.value=Number(h[this.valueField]);var j=h[this.titleField];
j||(j="");g.title=j;g.pulled=AmCharts.toBoolean(h[this.pulledField],!1);(j=h[this.descriptionField])||(j="");g.description=j;g.url=h[this.urlField];g.visibleInLegend=AmCharts.toBoolean(h[this.visibleInLegendField],!0);j=h[this.alphaField];g.alpha=void 0!=j?Number(j):this.pieAlpha;h=h[this.colorField];void 0!=h&&(g.color=AmCharts.toColor(h));e+=g.value;g.hidden=!1;a[f]=g}for(f=b=0;f<d;f++)g=a[f],g.percents=100*(g.value/e),g.percents<this.groupPercent&&b++;1<b&&(this.groupValue=0,this.removeSmallSlices(),
a.push({title:this.groupedTitle,value:this.groupValue,percents:100*(this.groupValue/e),pulled:this.groupedPulled,color:this.groupedColor,url:this.groupedUrl,description:this.groupedDescription,alpha:this.groupedAlpha}));for(f=0;f<a.length;f++)if(this.pieBaseColor?h=AmCharts.adjustLuminosity(this.pieBaseColor,f*this.pieBrightnessStep/100):(h=this.colors[f],void 0==h&&(h=AmCharts.randomColor())),void 0==a[f].color)a[f].color=h;this.recalculatePercents()}},recalculatePercents:function(){for(var a=this.chartData,
b=0,d=0;d<a.length;d++){var e=a[d];!e.hidden&&0<e.value&&(b+=e.value)}for(d=0;d<a.length;d++)e=this.chartData[d],e.percents=!e.hidden&&0<e.value?100*e.value/b:0},removeSmallSlices:function(){for(var a=this.chartData,b=a.length-1;0<=b;b--)a[b].percents<this.groupPercent&&(this.groupValue+=a[b].value,a.splice(b,1))},animateAgain:function(){var a=this;a.startSlices();var b=setTimeout(function(){a.pullSlices.call(a)},1200*a.startDuration);a.timeOuts.push(b)},measureMaxLabel:function(){for(var a=this.chartData,
b=0,d=0;d<a.length;d++){var e=this.formatString(this.labelText,a[d]),e=AmCharts.text(this.container,e,this.color,this.fontFamily,this.fontSize),f=e.getBBox().width;f>b&&(b=f);e.remove()}return b}});AmCharts.AmXYChart=AmCharts.Class({inherits:AmCharts.AmRectangularChart,construct:function(){AmCharts.AmXYChart.base.construct.call(this);this.createEvents("zoomed");this.xAxes;this.yAxes;this.scrollbarV;this.scrollbarH;this.maxZoomFactor=20;this.chartType="xy"},initChart:function(){AmCharts.AmXYChart.base.initChart.call(this);this.dataChanged&&(this.updateData(),this.dataChanged=!1,this.dispatchDataUpdated=!0);this.updateScrollbar=!0;this.drawChart();this.autoMargins&&!this.marginsUpdated&&(this.marginsUpdated=
!0,this.measureMargins());var a=this.marginLeftReal,b=this.marginTopReal,d=this.plotAreaWidth,e=this.plotAreaHeight;this.graphsSet.clipRect(a,b,d,e);this.bulletSet.clipRect(a,b,d,e);this.trendLinesSet.clipRect(a,b,d,e)},createValueAxes:function(){var a=[],b=[];this.xAxes=a;this.yAxes=b;for(var d=this.valueAxes,e=0;e<d.length;e++){var f=d[e],g=f.position;if("top"==g||"bottom"==g)f.rotate=!0;f.setOrientation(f.rotate);g=f.orientation;"V"==g&&b.push(f);"H"==g&&a.push(f)}0==b.length&&(f=new AmCharts.ValueAxis,
f.rotate=!1,f.setOrientation(!1),d.push(f),b.push(f));0==a.length&&(f=new AmCharts.ValueAxis,f.rotate=!0,f.setOrientation(!0),d.push(f),a.push(f));for(e=0;e<d.length;e++)this.processValueAxis(d[e],e);a=this.graphs;for(e=0;e<a.length;e++)this.processGraph(a[e],e)},drawChart:function(){AmCharts.AmXYChart.base.drawChart.call(this);AmCharts.ifArray(this.chartData)?(this.chartScrollbar&&(this.updateScrollbars(),this.scrollbarH.draw(),this.scrollbarV.draw()),this.zoomChart()):this.cleanChart();this.chartCreated=
!0;this.dispDUpd()},cleanChart:function(){AmCharts.callMethod("destroy",[this.valueAxes,this.graphs,this.scrollbarV,this.scrollbarH,this.chartCursor])},zoomChart:function(){this.toggleZoomOutButton();this.zoomObjects(this.valueAxes);this.zoomObjects(this.graphs);this.zoomTrendLines();this.dispatchAxisZoom()},toggleZoomOutButton:function(){1==this.heightMultiplyer&&1==this.widthMultiplyer?this.showZB(!1):this.showZB(!0)},dispatchAxisZoom:function(){for(var a=this.valueAxes,b=0;b<a.length;b++){var d=
a[b];if(!isNaN(d.min)&&!isNaN(d.max)){var e,f;"V"==d.orientation?(e=d.coordinateToValue(-this.verticalPosition),f=d.coordinateToValue(-this.verticalPosition+this.plotAreaHeight)):(e=d.coordinateToValue(-this.horizontalPosition),f=d.coordinateToValue(-this.horizontalPosition+this.plotAreaWidth));if(!isNaN(e)&&!isNaN(f)){if(e>f){var g=f;f=e;e=g}d.dispatchZoomEvent(e,f)}}}},zoomObjects:function(a){for(var b=a.length,d=0;d<b;d++){var e=a[d];this.updateObjectSize(e);e.zoom(0,this.chartData.length-1)}},
updateData:function(){this.parseData();for(var a=this.chartData,b=a.length-1,d=this.graphs,e=this.dataProvider,f=0;f<d.length;f++){var g=d[f];g.data=a;g.zoom(0,b);var h=g.valueField,j=0;if(h)for(var k=0;k<e.length;k++){var l=e[k][h];l>j&&(j=l)}g.maxValue=j}if(a=this.chartCursor)a.updateData(),a.type="crosshair",a.valueBalloonsEnabled=!1},zoomOut:function(){this.verticalPosition=this.horizontalPosition=0;this.heightMultiplyer=this.widthMultiplyer=1;this.zoomChart();this.zoomScrollbars()},processValueAxis:function(a){a.chart=
this;a.minMaxField="H"==a.orientation?"x":"y";a.minTemp=NaN;a.maxTemp=NaN;this.listenTo(a,"axisSelfZoomed",this.handleAxisSelfZoom)},processGraph:function(a){a.xAxis||(a.xAxis=this.xAxes[0]);a.yAxis||(a.yAxis=this.yAxes[0])},parseData:function(){AmCharts.AmXYChart.base.parseData.call(this);this.chartData=[];for(var a=this.dataProvider,b=this.valueAxes,d=this.graphs,e=0;e<a.length;e++){for(var f={axes:{},x:{},y:{}},g=a[e],h=0;h<b.length;h++){var j=b[h].id;f.axes[j]={};f.axes[j].graphs={};for(var k=
0;k<d.length;k++){var l=d[k],m=l.id;if(l.xAxis.id==j||l.yAxis.id==j){var p={};p.serialDataItem=f;p.index=e;var q={},n=Number(g[l.valueField]);isNaN(n)||(q.value=n);n=Number(g[l.xField]);isNaN(n)||(q.x=n);n=Number(g[l.yField]);isNaN(n)||(q.y=n);p.values=q;this.processFields(l,p,g);p.serialDataItem=f;p.graph=l;f.axes[j].graphs[m]=p}}}this.chartData[e]=f}},formatString:function(a,b){var d=b.graph.numberFormatter;d||(d=this.numberFormatter);a=AmCharts.formatValue(a,b.values,["value","x","y"],d);-1!=a.indexOf("[[")&&
(a=AmCharts.formatDataContextValue(a,b.dataContext));return a=AmCharts.AmSerialChart.base.formatString.call(this,a,b)},addChartScrollbar:function(a){AmCharts.callMethod("destroy",[this.chartScrollbar,this.scrollbarH,this.scrollbarV]);if(a){var b=new AmCharts.SimpleChartScrollbar,d=new AmCharts.SimpleChartScrollbar;b.skipEvent=!0;d.skipEvent=!0;b.chart=this;d.chart=this;this.listenTo(b,"zoomed",this.handleVSBZoom);this.listenTo(d,"zoomed",this.handleHSBZoom);var e="backgroundColor,backgroundAlpha,selectedBackgroundColor,selectedBackgroundAlpha,scrollDuration,resizeEnabled,hideResizeGrips,scrollbarHeight,updateOnReleaseOnly".split(",");
AmCharts.copyProperties(a,b,e);AmCharts.copyProperties(a,d,e);b.rotate=!0;d.rotate=!1;this.scrollbarHeight=a.scrollbarHeight;this.scrollbarH=d;this.scrollbarV=b;this.chartScrollbar=a}},updateTrendLines:function(){for(var a=this.trendLines,b=0;b<a.length;b++){var d=a[b];d.chart=this;d.valueAxis||(d.valueAxis=this.yAxes[0]);d.valueAxisX||(d.valueAxisX=this.xAxes[0])}},updateMargins:function(){AmCharts.AmXYChart.base.updateMargins.call(this);var a=this.scrollbarV;a&&(this.getScrollbarPosition(a,!0,this.yAxes[0].position),
this.adjustMargins(a,!0));if(a=this.scrollbarH)this.getScrollbarPosition(a,!1,this.xAxes[0].position),this.adjustMargins(a,!1)},updateScrollbars:function(){this.updateChartScrollbar(this.scrollbarV,!0);this.updateChartScrollbar(this.scrollbarH,!1)},zoomScrollbars:function(){var a=this.scrollbarH;a&&a.relativeZoom(this.widthMultiplyer,-this.horizontalPosition/this.widthMultiplyer);(a=this.scrollbarV)&&a.relativeZoom(this.heightMultiplyer,-this.verticalPosition/this.heightMultiplyer)},fitMultiplyer:function(a){a>
this.maxZoomFactor&&(a=this.maxZoomFactor);return a},handleHSBZoom:function(a){var b=this.fitMultiplyer(a.multiplyer),a=-a.position*b,d=-(this.plotAreaWidth*b-this.plotAreaWidth);a<d&&(a=d);this.widthMultiplyer=b;this.horizontalPosition=a;this.zoomChart()},handleVSBZoom:function(a){var b=this.fitMultiplyer(a.multiplyer),a=-a.position*b,d=-(this.plotAreaHeight*b-this.plotAreaHeight);a<d&&(a=d);this.heightMultiplyer=b;this.verticalPosition=a;this.zoomChart()},handleCursorZoom:function(a){var b=this.widthMultiplyer*
this.plotAreaWidth/a.selectionWidth,d=this.heightMultiplyer*this.plotAreaHeight/a.selectionHeight,b=this.fitMultiplyer(b),d=this.fitMultiplyer(d);this.horizontalPosition=(this.horizontalPosition-a.selectionX)*b/this.widthMultiplyer;this.verticalPosition=(this.verticalPosition-a.selectionY)*d/this.heightMultiplyer;this.widthMultiplyer=b;this.heightMultiplyer=d;this.zoomChart();this.zoomScrollbars()},handleAxisSelfZoom:function(a){if("H"==a.valueAxis.orientation){var b=this.fitMultiplyer(a.multiplyer),
a=-a.position/this.widthMultiplyer*b,d=-(this.plotAreaWidth*b-this.plotAreaWidth);a<d&&(a=d);this.horizontalPosition=a;this.widthMultiplyer=b}else b=this.fitMultiplyer(a.multiplyer),a=-a.position/this.heightMultiplyer*b,d=-(this.plotAreaHeight*b-this.plotAreaHeight),a<d&&(a=d),this.verticalPosition=a,this.heightMultiplyer=b;this.zoomChart();this.zoomScrollbars()},removeChartScrollbar:function(){AmCharts.callMethod("destroy",[this.scrollbarH,this.scrollbarV]);this.scrollbarV=this.scrollbarH=null},
handleReleaseOutside:function(a){AmCharts.AmXYChart.base.handleReleaseOutside.call(this,a);AmCharts.callMethod("handleReleaseOutside",[this.scrollbarH,this.scrollbarV])}});AmCharts.AmDraw=AmCharts.Class({construct:function(a,b,d){AmCharts.SVG_NS="http://www.w3.org/2000/svg";AmCharts.SVG_XLINK="http://www.w3.org/1999/xlink";AmCharts.hasSVG=!!document.createElementNS&&!!document.createElementNS(AmCharts.SVG_NS,"svg").createSVGRect;1>b&&(b=10);1>d&&(d=10);this.div=a;this.width=b;this.height=d;this.rBin=document.createElement("div");if(AmCharts.hasSVG){var e=this.createSvgElement("svg");e.style.position="absolute";e.style.width=b+"px";e.style.height=d+"px";e.setAttribute("version",
"1.1");e.setAttribute("xmlns",AmCharts.SVG_NS);a.appendChild(e);this.container=e;this.R=new AmCharts.SVGRenderer(this)}else AmCharts.isIE&&(AmCharts.VML=!0,AmCharts.vmlStyleSheet||(document.namespaces.add("v","urn:schemas-microsoft-com:vml"),b=document.createStyleSheet(),b.addRule("v\\:shape","behavior:url(#default#VML); display:inline-block; antialias:true"),b.addRule("v\\:polyline","behavior:url(#default#VML); display:inline-block; antialias:true"),b.addRule("v\\:roundrect","behavior:url(#default#VML); display:inline-block; antialias:true"),
b.addRule("v\\:stroke","behavior:url(#default#VML); display:inline-block; antialias:true"),b.addRule("v\\:fill","behavior:url(#default#VML); display:inline-block; antialias:true"),b.addRule("v\\:oval","behavior:url(#default#VML); display:inline-block; antialias:true"),b.addRule("v\\:curve","behavior:url(#default#VML); display:inline-block; antialias:true"),AmCharts.vmlStyleSheet=b),this.container=a,this.R=new AmCharts.VMLRenderer(this),this.R.disableSelection(a))},createSvgElement:function(a){return document.createElementNS(AmCharts.SVG_NS,
a)},circle:function(a,b,d,e){var f=new AmCharts.AmDObject("circle",this);f.attr({r:d,cx:a,cy:b});this.addToContainer(f.node,e);return f},setSize:function(){},rect:function(a,b,d,e,f,g,h){var j=new AmCharts.AmDObject("rect",this);AmCharts.VML&&(f=100*f/Math.min(d,e),d+=2*g,e+=2*g,j.bw=g,j.node.style.marginLeft=-g,j.node.style.marginTop=-g);1>d&&(d=1);1>e&&(e=1);j.attr({x:a,y:b,width:d,height:e,rx:f,ry:f,"stroke-width":g});this.addToContainer(j.node,h);return j},image:function(a,b,d,e,f,g){var h=new AmCharts.AmDObject("image",
this);h.attr({x:b,y:d,width:e,height:f});this.R.path(h,a);this.addToContainer(h.node,g);return h},addToContainer:function(a,b){b||(b=this.container);b.appendChild(a)},text:function(a,b,d){return this.R.text(a,b,d)},path:function(a,b,d,e){var f=new AmCharts.AmDObject("path",this);e||(e="100,100");f.attr({cs:e});d?f.attr({dd:a}):f.attr({d:a});this.addToContainer(f.node,b);return f},set:function(a){return this.R.set(a)},remove:function(a){if(a){var b=this.rBin;b.appendChild(a);b.innerHTML=""}},bounce:function(a,
b,d,e,f){return(b/=f)<1/2.75?e*7.5625*b*b+d:b<2/2.75?e*(7.5625*(b-=1.5/2.75)*b+0.75)+d:b<2.5/2.75?e*(7.5625*(b-=2.25/2.75)*b+0.9375)+d:e*(7.5625*(b-=2.625/2.75)*b+0.984375)+d},easeInSine:function(a,b,d,e,f){return-e*Math.cos(b/f*(Math.PI/2))+e+d},easeOutSine:function(a,b,d,e,f){return e*Math.sin(b/f*(Math.PI/2))+d},easeOutElastic:function(a,b,d,e,f){var a=1.70158,g=0,h=e;if(0==b)return d;if(1==(b/=f))return d+e;g||(g=0.3*f);h<Math.abs(e)?(h=e,a=g/4):a=g/(2*Math.PI)*Math.asin(e/h);return h*Math.pow(2,
-10*b)*Math.sin((b*f-a)*2*Math.PI/g)+e+d},renderFix:function(){var a=this.container,b=a.style;b.left="0px";b.top="0px";a=a.getScreenCTM()||a.createSVGMatrix();b.left=-(a.e-Math.floor(a.e))+"px";b.top=-(a.f-Math.floor(a.f))+"px"}});AmCharts.AmDObject=AmCharts.Class({construct:function(a,b){this.D=b;this.R=b.R;this.node=this.R.create(this,a);this.children=[]},attr:function(a){this.R.attr(this,a);return this},getAttr:function(a){return this.node.getAttribute(a)},setAttr:function(a,b){this.R.setAttr(this,a,b);return this},clipRect:function(a,b,d,e){this.R.clipRect(this,a,b,d,e)},translate:function(a,b){this.R.move(this,Math.round(a),Math.round(b))},rotate:function(a){this.R.rotate(this,a)},animate:function(a,b,d){for(var e in a){var f=
e,g=a[e],d=AmCharts.getEffect(d);this.R.animate(this,f,g,b,d)}},push:function(a){if(a){var b=this.node;b.appendChild(a.node);var d=a.clipPath;d&&b.appendChild(d);(d=a.grad)&&b.appendChild(d);this.children.push(a)}},text:function(a){this.R.setText(this,a)},remove:function(){this.R.remove(this)},clear:function(){var a=this.node;if(a.hasChildNodes())for(;1<=a.childNodes.length;)a.removeChild(a.firstChild)},hide:function(){this.setAttr("visibility","hidden")},show:function(){this.setAttr("visibility",
"visible")},getBBox:function(){return this.R.getBBox(this)},toFront:function(){var a=this.node;if(a){var b=a.parentNode;b&&b.appendChild(a)}},toBack:function(){var a=this.node;if(a){var b=a.parentNode;if(b){var d=b.firstChild;d&&b.insertBefore(a,d)}}},mouseover:function(a){this.R.addListener(this,"mouseover",a);return this},mouseout:function(a){this.R.addListener(this,"mouseout",a);return this},click:function(a){this.R.addListener(this,"click",a);return this},dblclick:function(a){this.R.addListener(this,
"dblclick",a);return this},mousedown:function(a){this.R.addListener(this,"mousedown",a);return this},mouseup:function(a){this.R.addListener(this,"mouseup",a);return this},touchstart:function(a){this.R.addListener(this,"touchstart",a);return this},touchend:function(a){this.R.addListener(this,"touchend",a);return this},stop:function(){var a=this.animationX;a&&AmCharts.removeFromArray(this.R.animations,a);(a=this.animationY)&&AmCharts.removeFromArray(this.R.animations,a)},length:function(){return this.node.childNodes.length},
gradient:function(a,b,d){this.R.gradient(this,a,b,d)}});AmCharts.VMLRenderer=AmCharts.Class({construct:function(a){this.D=a;this.cNames={circle:"oval",rect:"roundrect",path:"shape"};this.styleMap={x:"left",y:"top",width:"width",height:"height","font-family":"fontFamily","font-size":"fontSize",visibility:"visibility"};this.animations=[]},create:function(a,b){var d;if("group"==b)d=document.createElement("div"),a.type="div";else if("text"==b)d=document.createElement("div"),a.type="text";else if("image"==b)d=document.createElement("img"),a.type="image";else{a.type=
"shape";a.shapeType=this.cNames[b];d=document.createElement("v:"+this.cNames[b]);var e=document.createElement("v:stroke");d.appendChild(e);a.stroke=e;e=document.createElement("v:fill");d.appendChild(e);a.fill=e}d.style.position="absolute";d.style.top=0;d.style.left=0;return d},path:function(a,b){a.node.setAttribute("src",b)},setAttr:function(a,b,d){if(void 0!==d){if(8===document.documentMode)var e=!0;var f=a.node,g=a.type,h=f.style;"r"==b&&(h.width=2*d,h.height=2*d);if("roundrect"==a.shapeType&&("width"==
b||"height"==b))d-=1;"cursor"==b&&(h.cursor=d);"cx"==b&&(h.left=d-this.removePx(h.width)/2);"cy"==b&&(h.top=d-this.removePx(h.height)/2);var j=this.styleMap[b];void 0!=j&&(h[j]=d);if("text"==g){if("text-anchor"==b&&(a.anchor=d,j=f.clientWidth,"end"==d&&(h.marginLeft=-j+"px"),"middle"==d&&(h.marginLeft=-(j/2)+"px"),"start"==d))h.marginLeft="0px";"fill"==b&&(h.color=d);"font-weight"==b&&(h.fontWeight=d)}h=a.children;for(j=0;j<h.length;j++)h[j].setAttr(b,d);if("shape"==g){"cs"==b&&(f.style.width="100px",
f.style.height="100px",f.setAttribute("coordsize",d));"d"==b&&f.setAttribute("path",this.svgPathToVml(d));"dd"==b&&f.setAttribute("path",d);g=a.stroke;a=a.fill;"stroke"==b&&(e?g.color=d:g.setAttribute("color",d));"stroke-width"==b&&(e?g.weight=d:g.setAttribute("weight",d));"stroke-opacity"==b&&(e?g.opacity=d:g.setAttribute("opacity",d));"stroke-dasharray"==b&&(h="solid",0<d&&3>d&&(h="dot"),3<=d&&6>=d&&(h="dash"),6<d&&(h="longdash"),e?g.dashstyle=h:g.setAttribute("dashstyle",h));if("fill-opacity"==
b||"opacity"==b)0==d?e?a.on=!1:a.setAttribute("on",!1):e?a.opacity=d:a.setAttribute("opacity",d);"fill"==b&&(e?a.color=d:a.setAttribute("color",d));"rx"==b&&(e?f.arcSize=d+"%":f.setAttribute("arcsize",d+"%"))}}},attr:function(a,b){for(var d in b)this.setAttr(a,d,b[d])},text:function(a,b,d){var e=new AmCharts.AmDObject("text",this.D),f=e.node;f.style.whiteSpace="nowrap";a=document.createTextNode(a);f.appendChild(a);this.D.addToContainer(f,d);this.attr(e,b);return e},getBBox:function(a){return this.getBox(a.node)},
getBox:function(a){var b=a.offsetLeft,d=a.offsetTop,e=a.offsetWidth,f=a.offsetHeight,g;if(a.hasChildNodes()){for(var h,j,k=0;k<a.childNodes.length;k++){g=this.getBox(a.childNodes[k]);var l=g.x;isNaN(l)||(isNaN(h)?h=l:l<h&&(h=l));var m=g.y;isNaN(m)||(isNaN(j)?j=m:m<j&&(j=m));l=g.width+l;isNaN(l)||(e=Math.max(e,l));g=g.height+m;isNaN(g)||(f=Math.max(f,g))}0>h&&(b+=h);0>j&&(d+=j)}return{x:b,y:d,width:e,height:f}},setText:function(a,b){var d=a.node;d&&(d.removeChild(d.firstChild),d.appendChild(document.createTextNode(b)));
this.setAttr(a,"text-anchor",a.anchor)},addListener:function(a,b,d){a.node["on"+b]=d},move:function(a,b,d){var e=a.node,f=e.style;"text"==a.type&&(d-=this.removePx(f.fontSize)/2-1);"oval"==a.shapeType&&(b-=this.removePx(f.width)/2,d-=this.removePx(f.height)/2);a=a.bw;isNaN(a)||(b-=a,d-=a);e.style.left=b+"px";e.style.top=d+"px"},removePx:function(a){return Number(a.substring(0,a.length-2))},svgPathToVml:function(a){for(var b=a.split(" "),a="",d,e=Math.round,f=0;f<b.length;f++){var g=b[f],h=g.substring(0,
1),g=g.substring(1),j=g.split(","),k=e(j[0])+","+e(j[1]);"M"==h&&(a+=" m "+k);"L"==h&&(a+=" l "+k);"Z"==h&&(a+=" x e");if("Q"==h){var l=d.length,m=d[l-1],p=j[0],q=j[1],k=j[2],n=j[3];d=e(d[l-2]/3+2/3*p);m=e(m/3+2/3*q);p=e(2/3*p+k/3);q=e(2/3*q+n/3);a+=" c "+d+","+m+","+p+","+q+","+k+","+n}"A"==h&&(a+=" wa "+g);"B"==h&&(a+=" at "+g);d=j}return a},animate:function(a,b,d,e,f){var g=this,h=a.node;if("translate"==b){var j=d.split(","),b=j[1],d=h.offsetTop,h={obj:a,frame:0,attribute:"left",from:h.offsetLeft,
to:j[0],time:e,effect:f};g.animations.push(h);e={obj:a,frame:0,attribute:"top",from:d,to:b,time:e,effect:f};g.animations.push(e);a.animationX=h;a.animationY=e}g.interval||(g.interval=setInterval(function(){g.updateAnimations.call(g)},AmCharts.updateRate))},updateAnimations:function(){for(var a=this.animations.length-1;0<=a;a--){var b=this.animations[a],d=1E3*b.time/AmCharts.updateRate,e=b.frame+1,f=b.obj,g=b.attribute;if(e<=d){b.frame++;var h=Number(b.from),j=Number(b.to)-h,b=this.D[b.effect](0,e,
h,j,d);0==j?this.animations.splice(a,1):f.node.style[g]=b}else f.node.style[g]=Number(b.to),this.animations.splice(a,1)}},clipRect:function(a,b,d,e,f){a.node.style.clip="rect("+d+"px "+(b+e)+"px "+(d+f)+"px "+b+"px)"},rotate:function(a,b){var d=a.node,e=d.style,f=this.getBGColor(d.parentNode);e.backgroundColor=f;e.paddingLeft=1;var f=b*Math.PI/180,g=Math.cos(f),h=Math.sin(f),j=this.removePx(e.left),k=this.removePx(e.top),l=d.offsetWidth,d=d.offsetHeight,m=b/Math.abs(b);e.left=j+l/2-l/2*Math.cos(f)-
m*d/2*Math.sin(f)+3;e.top=k-m*l/2*Math.sin(f)+m*d/2*Math.sin(f);e.cssText=e.cssText+"; filter:progid:DXImageTransform.Microsoft.Matrix(M11='"+g+"', M12='"+-h+"', M21='"+h+"', M22='"+g+"', sizingmethod='auto expand');"},getBGColor:function(a){var b="#FFFFFF";if(a.style){var d=a.style.backgroundColor;""!=d?b=d:a.parentNode&&(b=this.getBGColor(a.parentNode))}return b},set:function(a){var b=new AmCharts.AmDObject("group",this.D);this.D.container.appendChild(b.node);if(a)for(var d=0;d<a.length;d++)b.push(a[d]);
return b},gradient:function(a,b,d,e){var f="";"radialGradient"==b&&(b="gradientradial",d.reverse());"linearGradient"==b&&(b="gradient");for(var g=0;g<d.length;g++){var h=Math.round(100*g/(d.length-1)),f=f+(h+"% "+d[g]);g<d.length-1&&(f+=",")}a=a.fill;90==e?e=0:270==e?e=180:180==e?e=90:0==e&&(e=270);8===document.documentMode?(a.type=b,a.angle=e):(a.setAttribute("type",b),a.setAttribute("angle",e));f&&(a.colors.value=f)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);this.D.remove(a.node)},
disableSelection:function(a){void 0!=typeof a.onselectstart&&(a.onselectstart=function(){return!1});a.style.cursor="default"}});AmCharts.SVGRenderer=AmCharts.Class({construct:function(a){this.D=a;this.animations=[]},create:function(a,b){return document.createElementNS(AmCharts.SVG_NS,b)},attr:function(a,b){for(var d in b)this.setAttr(a,d,b[d])},setAttr:function(a,b,d){void 0!==d&&a.node.setAttribute(b,d)},animate:function(a,b,d,e,f){var g=this,h=a.node;"translate"==b?(h=(h=h.getAttribute("transform"))?(""+h).substring(10,h.length-1):"0,0",h=h.split(", ").join(" "),h=h.split(" ").join(","),0==h&&(h="0,0")):h=h.getAttribute(b);
b={obj:a,frame:0,attribute:b,from:h,to:d,time:e,effect:f};g.animations.push(b);a.animationX=b;g.interval||(g.interval=setInterval(function(){g.updateAnimations.call(g)},AmCharts.updateRate))},updateAnimations:function(){for(var a=this.animations.length-1;0<=a;a--){var b=this.animations[a],d=1E3*b.time/AmCharts.updateRate,e=b.frame+1,f=b.obj,g=b.attribute;if(e<=d){b.frame++;if("translate"==g)var h=b.from.split(","),g=Number(h[0]),h=Number(h[1]),j=b.to.split(","),k=Number(j[0]),j=Number(j[1]),k=0==
k-g?k:Math.round(this.D[b.effect](0,e,g,k-g,d)),b=0==j-h?j:Math.round(this.D[b.effect](0,e,h,j-h,d)),g="transform",b="translate("+k+","+b+")";else h=Number(b.from),k=Number(b.to),k-=h,b=this.D[b.effect](0,e,h,k,d),0==k&&this.animations.splice(a,1);this.setAttr(f,g,b)}else"translate"==g?(j=b.to.split(","),k=Number(j[0]),j=Number(j[1]),f.translate(k,j)):(k=Number(b.to),this.setAttr(f,g,k)),this.animations.splice(a,1)}},getBBox:function(a){if(a=a.node)try{return a.getBBox()}catch(b){}return{width:0,
height:0,x:0,y:0}},path:function(a,b){a.node.setAttributeNS(AmCharts.SVG_XLINK,"xlink:href",b)},clipRect:function(a,b,d,e,f){var g=a.node,h=a.clipPath;h&&this.D.remove(h);if(g=g.parentNode){var h=document.createElementNS(AmCharts.SVG_NS,"clipPath"),j=AmCharts.getUniqueId();h.setAttribute("id",j);this.D.rect(b,d,e,f,0,0,h);g.appendChild(h);this.setAttr(a,"clip-path","url(#"+j+")");this.clipPathC++;a.clipPath=h}},text:function(a,b,d){var e=new AmCharts.AmDObject("text",this.D);e.node.appendChild(document.createTextNode(a));
a=0;AmCharts.chrome&&(a=1);this.setAttr(e,"y",b["font-size"]/2+a);this.attr(e,b);this.D.addToContainer(e.node,d);return e},setText:function(a,b){var d=a.node;d&&(d.removeChild(d.firstChild),d.appendChild(document.createTextNode(b)))},move:function(a,b,d){this.setAttr(a,"transform","translate("+b+","+d+")")},rotate:function(a,b){var d=a.node.getAttribute("transform"),e="rotate("+b+")";d&&(e=d+" "+e);this.setAttr(a,"transform",e)},set:function(a){var b=new AmCharts.AmDObject("g",this.D);this.D.container.appendChild(b.node);
if(a)for(var d=0;d<a.length;d++)b.push(a[d]);return b},addListener:function(a,b,d){a.node["on"+b]=d},gradient:function(a,b,d,e){var f=a.node,g=a.grad;g&&this.D.remove(g);b=document.createElementNS(AmCharts.SVG_NS,b);g=AmCharts.getUniqueId();b.setAttribute("id",g);if(!isNaN(e)){var h=0,j=0,k=0,l=0;90==e?k=100:270==e?l=100:180==e?h=100:0==e&&(j=100);b.setAttribute("x1",h+"%");b.setAttribute("x2",j+"%");b.setAttribute("y1",k+"%");b.setAttribute("y2",l+"%")}for(e=0;e<d.length;e++)h=document.createElementNS(AmCharts.SVG_NS,
"stop"),j=100*e/(d.length-1),0==e&&(j=0),h.setAttribute("offset",j+"%"),h.setAttribute("stop-color",d[e]),b.appendChild(h);f.parentNode.appendChild(b);f.setAttribute("fill","url(#"+g+")");a.grad=b},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);a.grad&&this.D.remove(a.grad);this.D.remove(a.node)}});AmCharts.AmDSet=AmCharts.Class({construct:function(){this.create("g")},attr:function(a){this.R.attr(this.node,a)},move:function(a,b){this.R.move(this.node,a,b)}});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	FR.Graph = function(leagueToFilter, divisionToFilter){		
		var divProfileRight = document.getElementById('profile-right');
		divProfileRight.innerHTML = '';
		
		if (!FR.initialized)
			FR.initialize();
			

		var displayByLeague = false;
		var displayByLeague = true;
		var leagueFilter = leagueToFilter;
		
		var displayByDivision = false;
		var displayByDivision = true;
		var divisionFilter = divisionToFilter;
		
		var historyDataArr = JSON.parse(localStorage.getItem('historyDataBase'));
		if ((historyDataArr == null) || (historyDataArr == 'undefined'))
			historyDataArr = [];
		
		/*var now = new Date();
		var counter = 0;
		for (var j = 0; j < historyDataArr.length; j++)
		{
			if (historyDataArr[j].name == 'NotThat')
				console.log(historyDataArr[j]);
			if (historyDataArr[j].pointsArr.length == 0)
			{
				historyDataArr.splice(j, 1);
				j--;
				continue;
			}
			for (var i = 0; i < historyDataArr[j].pointsArr.length; i++)
			{
				var date = new Date(historyDataArr[j].pointsArr[i].date);
				if (now.getTime() - date.getTime() < 60*120*1000)
				{
					counter++;
					historyDataArr[j].pointsArr.splice(i, 1);
					i--;
				}*
			}
		}
			
		localStorage['historyDataBase'] = JSON.stringify(historyDataArr);
		//console.log(historyDataArr);
		return;*/
		
		
		//get profile name of player
		var header = document.getElementById('profile-header');
		header = header.getElementsByTagName('a');
		var playerName = header[3].childNodes[0].nodeValue
			
		var apoints = '';
		var league = 'wood';
		
		var	el3 = document.getElementById('userOwnDivision');
		if (el3 == null)
			console.log('Could not get user league info.');
		else
			league = el3.getAttribute('myleague');
			
		if ((leagueFilter == '') || (leagueFilter == null) || (leagueFilter == 'undefined'))
			leagueFilter = league;
		if ((divisionFilter == '') || (divisionFilter == null) || (divisionFilter == 'undefined'))
			divisionFilter = currentCustomDivisionURLAPI;
		
		var divDropDown = document.createElement('div'); 
		var leagueSelect = document.createElement('select');
		var leagues = ['Grandmaster', 'Master', 'Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze'];
		for (var i = 0; i < leagues.length; i++)
		{
			var newOption = document.createElement('option');
			//newOption.setAttribute('id', 'leagueOption' + i);
			var Text = document.createTextNode(leagues[i]);
			newOption.appendChild(Text);
			leagueSelect.appendChild(newOption);
			if (leagues[i].toLowerCase() == leagueFilter)
				leagueSelect.selectedIndex = i;
		}
		
		leagueSelect.onchange = function(){
			FR.Graph(leagues[this.selectedIndex].toLowerCase(), divisionToFilter);
		};
		
		var divDropDown = document.createElement('div'); 
		var divisionSelect = document.createElement('select');
		for (var i = 0; i < customDivisionArr.length; i++)
		{
			var newOption = document.createElement('option');
			//newOption.setAttribute('id', 'divisionOption' + i);
			newOption.appendChild(document.createTextNode(customDivisionArr[i].name));
			divisionSelect.appendChild(newOption);
			if (customDivisionArr[i].urlapi == divisionFilter)
				divisionSelect.selectedIndex = i;
		}
		
		divisionSelect.onchange = function(){
			
			currentCustomDivisionName	= customDivisionArr[this.selectedIndex].name;
			currentCustomDivisionURLAPI	= customDivisionArr[this.selectedIndex].urlapi;
			currentCustomDivisionURL	= customDivisionArr[this.selectedIndex].url;
			
			localStorage['customDivisionName'] 	 = currentCustomDivisionName;
			localStorage['customDivisionURLAPI'] = currentCustomDivisionURLAPI;
			localStorage['customDivisionURL'] 	 = currentCustomDivisionURL;
			
			FR.Graph(leagueToFilter, customDivisionArr[this.selectedIndex].urlapi);
		};

		
		//sort - positive means b before a
		historyDataArr.sort(function (a,b){
			return b.last - a.last;
			});
		
		//get apoints
		if (league != 'wood')
		{
			var header = document.getElementById('profile-header');
			header = header.getElementsByTagName('h3');
			header = header[0].getElementsByTagName('span');
			if ((header[3] != null) && (header[3] != 'undefined'))
			apoints = parseInt(header[3].childNodes[0].nodeValue);
		}
		var playerNameIndex = -1;
		if ((apoints == '') || (league == 'wood'))
		{
			console.log('unable to get stats of player for current season. searching database for old record...');
			for (var i = 0; i < historyDataArr.length; i++)
			{
				if (historyDataArr[i].urlprofile == window.location.pathname)
				{
					playerNameIndex = i;
					break;
				}
			}
			//console.log('found player in data history at ' + playerNameIndex);
		}
		else
		{
			playerNameIndex = FR.addToHistory(historyDataArr, playerName, apoints, league, window.location.pathname);
			localStorage['historyDataBase'] = JSON.stringify(historyDataArr);
		}
		
		if (historyDataArr.length == 0)
		{
			divProfileRight.innerHTML = 'Please first load SC2Ranks Custom Division data using the buttons on the main menu.';
			return;
		}
		
		if (playerNameIndex != -1) //player exists in database under some division. make sure its the one we're displaying
		{
			if (historyDataArr[playerNameIndex].urlapi != divisionFilter)
				playerNameIndex = -1;
		}

		var lis = document.getElementById('profile-menu').getElementsByTagName('li');
		Common.makeActive(Lex.buttonFR, lis);
		
		var divProfileRight = document.getElementById('profile-right');
		
		var newDiv = document.createElement("div");
		newDiv.appendChild(document.createTextNode('Displaying ')); 
		newDiv.appendChild(leagueSelect);//league selector dropdown
		newDiv.appendChild(document.createTextNode(' league players in ')); 
		newDiv.appendChild(divisionSelect);
		newDiv.appendChild(document.createElement('br'));
		divProfileRight.appendChild(newDiv);
		
		var dataArrTest = [];	
		var namesArr = [];
		var showHowMany = historyDataArr.length;
		var min = 1000;
		var max = -1000;

		var first = new Date(historyDataArr[0].pointsArr[0].date);
		for (var i = 0; i < historyDataArr.length; i++)
		{
			if ((displayByLeague) && (historyDataArr[i].pointsArr[historyDataArr[i].pointsArr.length - 1].league != leagueFilter))
				continue;
			if ((displayByDivision) && (historyDataArr[i].urlapi != divisionFilter))
				continue;
			if (min > historyDataArr[i].min)
				min = historyDataArr[i].min;
			if (max < historyDataArr[i].max)
				max = historyDataArr[i].max;
			var newDate = new Date(historyDataArr[i].pointsArr[0].date);
			if (newDate.getTime() < first.getTime())
				first = new Date(newDate.getTime()-120000);//first entry needs to be prior to all other entries
			for (var j = 0; j < historyDataArr[i].pointsArr.length; j++)
			{
				var tmp = {};
				tmp['date'] = new Date(historyDataArr[i].pointsArr[j].date);
				tmp['apoints'+i] = historyDataArr[i].pointsArr[j].apoints;
				tmp['league'+i] = historyDataArr[i].pointsArr[j].league;
				dataArrTest.push(tmp);
				if (tmp['date'].getTime() < first.getTime())
					first = tmp['date'];
			}
		}

		//var first = new Date('Wed Apr 11 2012 18:30:41 GMT+0300');
		var tmp = {};
		tmp['date'] = first;
		for (var i = 0; i < historyDataArr.length; i++) //add a data point prior to any others, where all players have their initial value
		{
			if ((displayByLeague) && (historyDataArr[i].pointsArr[historyDataArr[i].pointsArr.length - 1].league != leagueFilter))
				continue;
			if ((displayByDivision) && (historyDataArr[i].urlapi != divisionFilter))
				continue;
			namesArr.push({name:historyDataArr[i].name, i:i});
			tmp['apoints'+i] = historyDataArr[i].pointsArr[0].apoints;
			tmp['league'+i] = historyDataArr[i].pointsArr[0].league;
		}
		dataArrTest.push(tmp);
		
		dataArrTest.sort(function (a,b){
		return a.date - b.date;	});
		
		for (var i = 1; i < dataArrTest.length; i++)
		{
			for (var j = 0; j < historyDataArr.length; j++)
			{
				if ((displayByLeague) && (historyDataArr[j].pointsArr[historyDataArr[j].pointsArr.length - 1].league != leagueFilter))
					continue;
				if (dataArrTest[i]['apoints'+j] == null)
					dataArrTest[i]['apoints'+j] = dataArrTest[i-1]['apoints'+j];
				if (dataArrTest[i]['league'+j] == null)
					dataArrTest[i]['league'+j] = dataArrTest[i-1]['league'+j];
			}	
		}

		//lets clear out the unnecessary values
		for (var i = 1; i < dataArrTest.length; i++)
		{
			if (Math.abs(dataArrTest[i-1].date - dataArrTest[i].date) < 1000) //if dates are within one second, combine them into one entry
			{	
				for (var j = 0; j < namesArr.length; j++)
					dataArrTest[i-1]['apoints'+namesArr[j].i] = dataArrTest[i]['apoints'+namesArr[j].i];
				dataArrTest.splice(i,1);
				i--;
			}
		}
		
		   	var chart;
            var chartData = [];

			// SERIAL CHART    
			chart = new AmCharts.AmSerialChart();
			//chart.pathToImages = "/lib/samples/javascript/images/";
			
			chart.panEventsEnabled = true;
			chart.useUTC = true;//can i utilize this better than current solution?
				
			chart.zoomOutButton = {
				backgroundColor: "#BEBEBE",
				backgroundAlpha: 0.15
			};
			//chart.dataProvider = historyDataArr[playerNameIndex].pointsArr;
			chart.dataProvider = dataArrTest;
			chart.categoryField = "date";

			// category                
			var categoryAxis = chart.categoryAxis;
			categoryAxis.parseDates = true;
			categoryAxis.minPeriod = "mm";
			categoryAxis.dashLength = 2;
			categoryAxis.gridAlpha = 0.15;
			categoryAxis.axisColor = "#000000";
			

			// value axis		
			var valueAxis1 = new AmCharts.ValueAxis();
			valueAxis1.lineColor = "#000000";
			valueAxis1.axisColor = "#000000";
			valueAxis1.axisThickness = 2;
			valueAxis1.gridAlpha = 0;
			if (max < 250)
				valueAxis1.maximum = 300;
			else
				valueAxis1.maximum = Math.floor(2+max/100)*100;
			if (min > 50)
				valueAxis1.minimum = 0;
			else
				valueAxis1.minimum = Math.floor(min/100)*100;
			chart.addValueAxis(valueAxis1);

			// GRAPHS
			var graphsArr = [];
			var counter = 0;
			var playerInList = false;
			var displayingSomething = false;
			
			for (var i = 0; i < historyDataArr.length; i++)
			{
				if ((displayByLeague) && (historyDataArr[i].pointsArr[historyDataArr[i].pointsArr.length - 1].league != leagueFilter))
					continue;
				if ((displayByDivision) && (historyDataArr[i].urlapi != divisionFilter))
					continue;
				if (i == playerNameIndex)
					playerInList = true;
			}

			for (var i = 0; i < historyDataArr.length; i++)
			{
				if ((displayByLeague) && (historyDataArr[i].pointsArr[historyDataArr[i].pointsArr.length - 1].league != leagueFilter))
					continue;
				if ((displayByDivision) && (historyDataArr[i].urlapi != divisionFilter))
					continue;
				counter++;
				if (counter > 80)
					break;
				var apointsString = 'apoints' + i.toString();
				var leagueString = 'league' + i.toString();
				graphsArr.push(new AmCharts.AmGraph());
				var pos = graphsArr.length-1;
				//graphsArr[pos].type = "smoothedLine"; //new
				graphsArr[pos].valueAxis = valueAxis1;
				graphsArr[pos].valueField = apointsString;
				graphsArr[pos].lineColor = get_random_color();
				graphsArr[pos].title = counter + ') ' + historyDataArr[i].name;
				graphsArr[pos].bullet = "round";
				graphsArr[pos].hideBulletsCount = 30;
				graphsArr[pos].balloonText = historyDataArr[i].name + ': [[value]], [['+leagueString+']]';
				graphsArr[pos].hidden = true;
				if (!displayingSomething) //make sure we display at least 1 player otherwise graph background wont appear
				{
					if (!playerInList)
					{
						graphsArr[pos].hidden = false;
						displayingSomething = true;
					}
					else if (i == playerNameIndex)
					{
						graphsArr[pos].hidden = false;
						displayingSomething = true;
					}
				}
				chart.addGraph(graphsArr[pos]);
			}			
				
			function get_random_color() {
				var letters = '0123456789ABCDEF'.split('');
				var color = '#';
				for (var i = 0; i < 6; i++ ) {
					color += letters[Math.round(Math.random() * 15)];}
				return color;
			}	

			// CURSOR
			var chartCursor = new AmCharts.ChartCursor();
			chartCursor.cursorPosition = "mouse";
			chart.addChartCursor(chartCursor);

			// SCROLLBAR
			var chartScrollbar = new AmCharts.ChartScrollbar();
			chart.addChartScrollbar(chartScrollbar);

			// LEGEND
			var legend = new AmCharts.AmLegend();
			//legend.adjustWidth=true;
			//legend.marginLeft = 110;
			//legend.valueText = historyDataArr[playerNameIndex].name;
			legend.valueText = '';
			if (counter > 85)
				legend.fontSize = 10;
			else
				legend.fontSize = 11;
			legend.marginRight = 0;
			legend.spacing = 0;
			legend.marginLeft = 0;
			legend.marginBottom = 110;
			/*legend.spacing = 2;
			legend.verticalGap = 15;
			legend.marginBottom = 2;
			legend.marginLeft = 2;
			legend.marginTop = 2;*/
			chart.addLegend(legend);
			
			// GUIDES are used to create horizontal range fills
				var guide = new AmCharts.Guide();
                guide.value = -99999;
                guide.toValue = 0;
				guide.fillColor = "#0065ff";
                guide.fillAlpha = 0.25;
                guide.lineAlpha = 0;
                valueAxis1.addGuide(guide);
				
				var guide = new AmCharts.Guide();
                guide.value = 0;
                guide.toValue = 100;
				guide.fillColor = "#00d5ff";
                guide.fillAlpha = 0.2;
                guide.lineAlpha = 0;
                valueAxis1.addGuide(guide);

                var guide = new AmCharts.Guide();
                guide.value = 100
                guide.toValue = 200;
				guide.fillColor = "#00ffc9";
                guide.fillAlpha = 0.15;
                guide.lineAlpha = 0;
                valueAxis1.addGuide(guide);

                var guide = new AmCharts.Guide();
                guide.value = 200;
                guide.toValue = 300;
				guide.fillColor = "#00ff49";
                guide.fillAlpha = 0.1;
                guide.lineAlpha = 0;
                valueAxis1.addGuide(guide);

                var guide = new AmCharts.Guide();
                guide.value = 300;
                guide.toValue = 400;
				guide.fillColor = "#c7ff00";
                guide.fillAlpha = 0.05;
                guide.lineAlpha = 0;
                valueAxis1.addGuide(guide);

                var guide = new AmCharts.Guide();
                guide.value = 400;
                guide.toValue = 500;
				guide.fillColor = "#fff700";
                guide.fillAlpha = 0.1;
                guide.lineAlpha = 0;
                valueAxis1.addGuide(guide);

                var guide = new AmCharts.Guide();
                guide.value = 500;
                guide.toValue = 600;
				guide.fillColor = "#ffa700";
                guide.fillAlpha = 0.1;
                guide.lineAlpha = 0;
                valueAxis1.addGuide(guide);

                var guide = new AmCharts.Guide();
                guide.value = 600;
                guide.toValue = 700;
				guide.fillColor = "#ff6700";
                guide.fillAlpha = 0.15;
                guide.lineAlpha = 0;
                valueAxis1.addGuide(guide);

                var guide = new AmCharts.Guide();
                guide.value = 700;
                guide.toValue = 99999;
				guide.fillColor = "#ff1700";
                guide.fillAlpha = 0.3;
                guide.lineAlpha = 0;
                valueAxis1.addGuide(guide);

			// WRITE
					
			var newChart = document.createElement('div');
			newChart.setAttribute('id', 'chartdiv');
			var height = Math.floor(450 + counter*8.25);
			newChart.setAttribute('style', 'width: 100%; height: '+height+'px; background-color:#FFFFFF;');
			divProfileRight.appendChild(newChart);
			chart.write("chartdiv");
			
	
		var myButton= document.createElement('input');
		myButton.setAttribute('type','button');
		myButton.setAttribute('name','btn');
		myButton.setAttribute('value','Display as table');
		myButton.onclick = outputTable;
		divProfileRight.appendChild(myButton);

		//return;
		function outputTable()
		{
		myButton.onclick = selectElementContents;
		myButton.setAttribute('value', 'Select table');
		newDiv = document.createElement("div");
		newContent = document.createTextNode("Format the Date column as dates in Excel.");
		newDiv.appendChild(newContent); 
		divProfileRight.appendChild(newDiv);
		
		mytable2    = document.createElement("table");
		mytable2.setAttribute('id', 'myTable');
        mytablebody = document.createElement("tbody");
		mytable2.setAttribute('style', 'border: 1px solid black;');
		var cellCounter = 1;
		
		mycurrent_row=document.createElement("tr");
		mycurrent_cell = document.createElement("td");
		mycurrent_cell.setAttribute('style', 'text-align:center; background-color:white; color:black; border: 1px solid black; border-collapse:collapse; text-align:center;');
		currenttext = document.createTextNode('#'); //#
		mycurrent_cell.appendChild(currenttext);
		mycurrent_row.appendChild(mycurrent_cell);
		mycurrent_cell = document.createElement("td");
		mycurrent_cell.setAttribute('style', 'text-align:center; background-color:white; color:black; border: 1px solid black; border-collapse:collapse; text-align:center;');
		currenttext = document.createTextNode('Date'); //Date
		mycurrent_cell.appendChild(currenttext);
		mycurrent_row.appendChild(mycurrent_cell);
		for(var i = 0; i < counter; i++) {
               mycurrent_cell = document.createElement("td");
               mycurrent_cell.setAttribute('style', 'text-align:center; background-color:white; color:black; border: 1px solid black; border-collapse:collapse; text-align:center;');
			   //mycurrent_cell.colSpan = 2;
			   currenttext = document.createTextNode(namesArr[i].name); //player name
               mycurrent_cell.appendChild(currenttext);
               mycurrent_row.appendChild(mycurrent_cell);
           }
		mytablebody.appendChild(mycurrent_row);
		
		/*mycurrent_row=document.createElement("tr");
		mycurrent_cell = document.createElement("td");
        mycurrent_cell.setAttribute('style', 'text-align:center; background-color:white; color:black; border: 1px solid black; border-collapse:collapse; text-align:center;');
		currenttext = document.createTextNode('Date');
        mycurrent_cell.appendChild(currenttext);
        mycurrent_row.appendChild(mycurrent_cell);
		for(var i = 0; i < counter; i++) {
		//for(var i = 0; i < 2; i++) {
               mycurrent_cell = document.createElement("td");
               mycurrent_cell.setAttribute('style', 'text-align:center; background-color:white; color:black; border: 1px solid black; border-collapse:collapse; text-align:center;');
			   currenttext = document.createTextNode('Points');
               mycurrent_cell.appendChild(currenttext);
               mycurrent_row.appendChild(mycurrent_cell);
			   mycurrent_cell = document.createElement("td");
               mycurrent_cell.setAttribute('style', 'text-align:center; background-color:white; color:black; border: 1px solid black; border-collapse:collapse; text-align:center;');
			   currenttext = document.createTextNode('League');
               mycurrent_cell.appendChild(currenttext);
               mycurrent_row.appendChild(mycurrent_cell);
           }
		mytablebody.appendChild(mycurrent_row);*/
		var millisecondsToDays = 1000 * 60 * 60 * 24;
        for(var j = 0; j < dataArrTest.length; j++) {
			if (j > 0) //compare this entry to previous entry, and don't write it into table if they're identical
			{
				var flag = true;
				for (var i = 0; i < counter; i++)
				{
					if (dataArrTest[j]['apoints'+namesArr[i].i] != dataArrTest[j-1]['apoints'+namesArr[i].i])
					{
						flag = false;
						break;
					}
				}
				if (flag)
					continue;
			}
			mycurrent_row=document.createElement("tr");
			mycurrent_cell = document.createElement("td");
			mycurrent_cell.setAttribute('style', 'text-align:center; background-color:white; color:black; border: 1px solid black; border-collapse:collapse;');
			currenttext = document.createTextNode(cellCounter++); //cell count
			mycurrent_cell.appendChild(currenttext);
			mycurrent_row.appendChild(mycurrent_cell);
			mycurrent_cell = document.createElement("td");
			mycurrent_cell.setAttribute('style', 'text-align:center; background-color:white; color:black; border: 1px solid black; border-collapse:collapse;');
			currenttext = document.createTextNode((dataArrTest[j].date.getTime() + 2208988800000) / millisecondsToDays); //excel counts since 1.1.1900, getTime since 1.1.1970. add the difference
            mycurrent_cell.appendChild(currenttext);
            mycurrent_row.appendChild(mycurrent_cell);
			for(var i = 0; i < counter; i++) {
			mycurrent_cell = document.createElement("td");
			mycurrent_cell.setAttribute('style', 'text-align:center; background-color:white; color:black; border: 1px solid black; border-collapse:collapse;');
			//if (dataArrTest[j]['league'+namesArr[i].i] == leagueFilter){ //only display points if player is in same league as me in this data point
				if (j == 0)
					currenttext = document.createTextNode(dataArrTest[j]['apoints'+namesArr[i].i]);
				else if (dataArrTest[j]['apoints'+namesArr[i].i] != dataArrTest[j-1]['apoints'+namesArr[i].i])
					currenttext = document.createTextNode(dataArrTest[j]['apoints'+namesArr[i].i]);
				else
					currenttext = document.createTextNode('');
			//}

			mycurrent_cell.appendChild(currenttext);
			mycurrent_row.appendChild(mycurrent_cell);
			}
           mytablebody.appendChild(mycurrent_row);
        }
        mytable2.appendChild(mytablebody);
		divProfileRight.appendChild(mytable2);
		selectElementContents();
		function selectElementContents() {
		var el = document.getElementById('myTable');
        var body = document.body, range, sel;
        if (body.createTextRange) {
            range = body.createTextRange();
            range.moveToElementText(el);
            range.select();
        } else if (document.createRange && window.getSelection) {
            range = document.createRange();
            range.selectNodeContents(el);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
		}
		}

	}
	
	FR.addToHistory = function(historyDataArr, playerName, apoints, league, urlprofile, urlapi)
	{
		var index = -1;
		for (var i = 0; i < historyDataArr.length; i++)
			//if (urlprofile == historyDataArr[i].urlprofile)
			if (historyDataArr[i].urlprofile.indexOf(urlprofile.substr(0, urlprofile.substr(0, urlprofile.length-1).lastIndexOf('/'))) != -1) //names may be changed. url prior to name always stays the same though
			{
				index = i;
				if (historyDataArr[i].name != playerName)
					historyDataArr[i].name = playerName;
				break;
			}

		var date = new Date();
		date = FR.dateToString(date);
		
		if (index == -1) //player did not exist in history array
		{
			if ((urlapi == 'undefined') || (urlapi == null)) //no urlapi given and player doesn't already exist, can not add him
				return -1;
			var pointsArr = [];	
			pointsArr.push({date:date, apoints:apoints, league:league});
			historyDataArr.push({urlprofile:urlprofile, name:playerName, min:apoints, max:apoints, last:apoints, pointsArr:pointsArr, urlapi:urlapi});
			return (historyDataArr.length - 1);
		}
		else //player found at index index
		{
			if ((historyDataArr[index].last == apoints) || (historyDataArr[index].last - 1 == apoints) || (historyDataArr[index].last + 1 == apoints))
				return index;
			historyDataArr[index].pointsArr.push({date:date, apoints:apoints, league:league});
			if (historyDataArr[index].min > apoints)
				historyDataArr[index].min = apoints;
			if (historyDataArr[index].max < apoints)
				historyDataArr[index].max = apoints;
			historyDataArr[index].last = apoints;
			return index;
		}
	}
	
	FR.MMRCalc = function(){
		var lis = document.getElementById('profile-menu').getElementsByTagName('li');
		Common.makeActive(Lex.buttonFR, lis);
		
		var divProfileRight = document.getElementById('profile-right');
		divProfileRight.innerHTML = '';
		
		if (!FR.initialized)
			FR.initialize();
		
		var serverBP = FR.regionBonusPool(myRegion);
		
		function selectAll()
		{
			this.focus();
			this.select();
		};
		
		var divOpponentStats = document.createElement('div');
		
		var oppLadderPtsText = document.createElement('div');
		oppLadderPtsText.setAttribute('style','float:left; height:20px; padding-top:3px; margin-left:2px; width:400px; text-align:right');
		var h3Text = document.createElement('h3');
		h3Text.innerHTML = "Enter your opponent's ladder points after the match: ";
		oppLadderPtsText.appendChild(h3Text);
		
		var oppLadderPts = document.createElement("input");
		oppLadderPts.setAttribute('style','float:left; width:50px;');
		oppLadderPts.id = 'oppLadderPts';
		oppLadderPts.onclick = selectAll;
		
		var oppUnspentPtsText = document.createElement('div');
		oppUnspentPtsText.setAttribute('style','float:left; height:20px; padding-top:3px; margin-left:2px; width:400px; text-align:right');
		var h3Text = document.createElement('h3');
		h3Text.innerHTML = "Enter your opponent's unspent bonus pool points after the match: ";
		oppUnspentPtsText.appendChild(h3Text);
		
		var oppUnspentPts = document.createElement("input");
		oppUnspentPts.setAttribute('style','float:left; width:50px;');
		oppUnspentPts.id = 'oppUnspentPts';
		oppUnspentPts.onclick = selectAll;
		
		var oppLeagueText = document.createElement('div');
		oppLeagueText.setAttribute('style','float:left; height:20px; padding-top:3px; margin-left:2px; width:400px; text-align:right');
		var h3Text = document.createElement('h3');
		h3Text.innerHTML = "Your opponent's league: ";
		oppLeagueText.appendChild(h3Text);

		var	el3 = document.getElementById('userOwnDivision');
		if (el3 != null)
			var league = el3.getAttribute('myleague');			
		
		var opponentLeagueDropBox = document.createElement('select');
		opponentLeagueDropBox.setAttribute('id', 'division-drop-box');
		opponentLeagueDropBox.setAttribute('style', 'float:left; margin-top:4px;');
		for (var i = 0; i < leagueNamesArr.length; i++)
		{
			var newOption = document.createElement('option');
			var Text = document.createTextNode(Common.ucfirst(leagueNamesArr[i]));
			newOption.appendChild(Text);
			opponentLeagueDropBox.appendChild(newOption);
			if (leagueNamesArr[i] == league)
				opponentLeagueDropBox.selectedIndex = i;
		}
		
		var oppWonText = document.createElement('div');
		oppWonText.setAttribute('style','float:left; height:20px; padding-top:3px; margin-left:2px; width:400px; text-align:right');
		var h3Text = document.createElement('h3');
		h3Text.innerHTML = "The opponent: Won";
		oppWonText.appendChild(h3Text);
		
		var wonRadio = document.createElement('input');
		wonRadio.setAttribute('type', 'radio');
		wonRadio.setAttribute('name', 'won');
		wonRadio.setAttribute('id', 'won-radio');
		wonRadio.setAttribute('style', 'float:left; margin-top: 6px;');
		wonRadio.onclick = radioFunc;
		
		var oppLostText = document.createElement('div');
		oppLostText.setAttribute('style','float:left; height:20px; padding-top:3px; margin-left:2px; width:25px; text-align:right');
		var h3Text = document.createElement('h3');
		h3Text.innerHTML = "Lost";
		oppLostText.appendChild(h3Text);
		
		var lostRadio = document.createElement('input');
		lostRadio.setAttribute('type', 'radio');
		lostRadio.setAttribute('name', 'lost');
		lostRadio.setAttribute('id', 'lost-radio');
		lostRadio.setAttribute('style', 'float:left; margin-top: 6px;');
		lostRadio.onclick = radioFunc;
		
		function radioFunc(){
			var won = document.getElementById('won-radio');
			var lost = document.getElementById('lost-radio');
			if(this.name == 'won')
			{
				lost.checked = false;
				var oldDiv = document.getElementById('lost-div');
				if (oldDiv != null)
					oldDiv.parentNode.removeChild(oldDiv);
				divMiddle.appendChild(wonDiv);
			}
			else
			{
				won.checked = false;
				var oldDiv = document.getElementById('won-div');
				if (oldDiv != null)
					oldDiv.parentNode.removeChild(oldDiv);
				divMiddle.appendChild(lostDiv);
			}
			
		};
		
		divOpponentStats.appendChild(oppLadderPtsText);
		divOpponentStats.appendChild(oppLadderPts);
		divOpponentStats.appendChild(oppUnspentPtsText);
		divOpponentStats.appendChild(oppUnspentPts);
		divOpponentStats.appendChild(oppLeagueText);
		divOpponentStats.appendChild(opponentLeagueDropBox);
		divOpponentStats.appendChild(oppWonText);
		divOpponentStats.appendChild(wonRadio);
		divOpponentStats.appendChild(oppLostText);
		divOpponentStats.appendChild(lostRadio);
		
		var divMiddle = document.createElement('div');
		var lostDiv = document.createElement('div');
		lostDiv.setAttribute('id', 'lost-div');
		var wonDiv = document.createElement('div');
		wonDiv.setAttribute('id', 'won-div');
		
		var howManyPointsLostText = document.createElement('div');
		howManyPointsLostText.setAttribute('style','float:left; height:20px; padding-top:3px; margin-left:2px; width:400px; text-align:right');
		var h3Text = document.createElement('h3');
		h3Text.innerHTML = "How many points did your opponent lose? ";
		howManyPointsLostText.appendChild(h3Text);
		
		var howManyPointsLost = document.createElement("input");
		howManyPointsLost.setAttribute('style','float:left; width:50px;');
		howManyPointsLost.id = 'howManyPointsLost';
		howManyPointsLost.onclick = selectAll;
		
		lostDiv.appendChild(howManyPointsLostText);
		lostDiv.appendChild(howManyPointsLost);
		
		var howManyPointsWonText = document.createElement('div');
		howManyPointsWonText.setAttribute('style','float:left; height:20px; padding-top:3px; margin-left:2px; width:400px; text-align:right');
		var h3Text = document.createElement('h3');
		h3Text.innerHTML = "How many points did your opponent win, not including bonus pool points? If you're not sure, ask him, or wait until you win a match before using this calculator.";
		howManyPointsWonText.appendChild(h3Text);
		
		var howManyPointsWon = document.createElement("input");
		howManyPointsWon.setAttribute('style','float:left; width:50px; margin-top:16px;');
		howManyPointsWon.id = 'howManyPointsWon';
		howManyPointsWon.onclick = selectAll;
	
		wonDiv.appendChild(howManyPointsWonText);
		wonDiv.appendChild(howManyPointsWon);
		
		var calcBtn = document.createElement("input");
		calcBtn.setAttribute('type', 'button');
		calcBtn.setAttribute('value', 'Calculate MMR');
		calcBtn.setAttribute('style', 'margin-left: 380px; margin-top:15px; float:left;');
		
		
		calcBtn.onclick = function() {
			var oppLadderPoints = parseInt(document.getElementById('oppLadderPts').value);
			var oppUnspentBonusPool = parseInt(document.getElementById('oppUnspentPts').value);
			var oppLeague = document.getElementById('division-drop-box').options[document.getElementById('division-drop-box').selectedIndex].value;
			var oppWon;
			var oppPointsChange;
			var MMR;
			if (isNaN(oppLadderPoints))
			{
				alert('Please enter a number for your opponent ladder points');
				return;
			}
			if (isNaN(oppUnspentBonusPool))
			{
				alert('Please enter a number for your opponent unspent bonus pool points');
				return;
			}
			if ((oppLeague == 'Master') || (oppLeague == 'Grandmaster'))
				var oppAdjusted = oppLadderPoints + oppUnspentBonusPool - serverBP;
			
			else
				var oppAdjusted = Math.floor(oppLadderPoints + oppUnspentBonusPool - serverBP * (52.2/90));
			
			if (document.getElementById('won-radio').checked)
				oppWon = true;
			else
				oppWon = false;
			if (oppWon)
			{
				oppPointsChange = parseInt(document.getElementById('howManyPointsWon').value);
				if (isNaN(oppPointsChange))
				{
					alert('Please enter number of points opponent won');
					return;
				}
				if ((oppPointsChange < 0) || (oppPointsChange > 24))
				{
					alert('Number of points opponent won must be between 0 and 24');
					return;
				}
				MMR = oppAdjusted - oppPointsChange + (oppPointsChange - 12) * 32;
			}
			else
			{
				oppPointsChange = parseInt(document.getElementById('howManyPointsLost').value);
				if (isNaN(oppPointsChange))
				{
					alert('Please enter number of points opponent lost');
					return;
				}
				if ((oppPointsChange < 0) || (oppPointsChange > 24))
				{
					alert('Number of points opponent lost must be between 0 and 24');
					return;
				}
				MMR = oppAdjusted + oppPointsChange + (12 - oppPointsChange) * 32;
			}
			var bottom = document.getElementById('div-bottom');
			if (bottom != null)
				bottom.parentNode.removeChild(bottom);
			bottom = document.createElement('div');
			bottom.setAttribute('id', 'div-bottom');
			bottom.setAttribute('style', 'float:left; width:100%;');
			var resultText = document.createElement('div');
			resultText.setAttribute('style','float:left; position:absolute; height:20px; width:650px; padding-top:3px; text-align:center;');
			var h3Text = document.createElement('h3');
			var text = document.createTextNode('Your MMR is between ' + (MMR - 16) + ' and ' + (MMR + 16) + ' compared to ' + oppLeague + ' league adjusted points.');			
			h3Text.appendChild(text);
			if ((oppLeague != 'Master') && (oppLeague != 'Grandmaster'))
			{
				h3Text.appendChild(document.createElement('br'));
				h3Text.appendChild(document.createTextNode('Keep in mind leagues below Master have multiple division tiers, thus the reported MMR results will vary when playing multiple opponents below Master league.'));
			}
			resultText.appendChild(h3Text);
			bottom.appendChild(resultText);
			
			divProfileRight.appendChild(bottom);
		};
						
		//divProfileRight.appendChild(divOpponentStats);
		//divProfileRight.appendChild(divMiddle);
		//divProfileRight.appendChild(document.createElement('br'));
		//divProfileRight.appendChild(calcBtn);
		var h1Text = document.createElement('h1');
		h1Text.innerHTML = '<a href="http://www.teamliquid.net/forum/viewmessage.php?topic_id=334561">Download the automatic MMR Calculator from here.</a><br/><br/><br/>';
		var Text2 = document.createElement('h1');
		Text2.innerHTML = '<a href="http://www.teamliquid.net/forum/viewmessage.php?topic_id=332391">Explanation about how it works.</a><br/><br/><br/>';
		divProfileRight.appendChild(h1Text);
		divProfileRight.appendChild(Text2);
		return;
		
	};
	
	FR.initialize = function(){
		
		leaguesArr = {grandmaster:false, master:false, diamond:false, platinum:false, gold:false, silver:false, bronze:false};
		leagueNamesArr = ['grandmaster', 'master', 'diamond', 'platinum', 'gold', 'silver', 'bronze'];
		checkBoxState = [true, true, true, true, true, true, true]; //whether the checkboxes should be checked or not upon loading
		customDivisionArr = [];
		customDivisionArr = JSON.parse(localStorage.getItem('customDivisionArr'));
		if ((customDivisionArr == null) || (customDivisionArr.length == 0))
		{
			var region = FR.getRegion();
			if (region == 'eu')
				customDivisionArr = [{	url:'http://sc2ranks.com/c/169/israel-division', 
									urlapi:'http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost',
									name:'Israeli Custom Division',
									updated:{grandmaster:false, master:false, diamond:false, platinum:false, gold:false, silver:false, bronze:false}}];
			else if (region == 'us')
				customDivisionArr = [{	url:'http://sc2ranks.com/c/12336/american-pros/', 
									urlapi:'http://sc2ranks.com/api/clist/12336/all/all/1/0.json?appKey=localhost',
									name:'American Pros',
									updated:{grandmaster:false, master:false, diamond:false, platinum:false, gold:false, silver:false, bronze:false}}];
			else if (region == 'kr')
				customDivisionArr = [{	url:'http://sc2ranks.com/c/12337/korean-pros/', 
									urlapi:'http://sc2ranks.com/api/clist/12337/all/all/1/0.json?appKey=localhost',
									name:'Korean Pros',
									updated:{grandmaster:false, master:false, diamond:false, platinum:false, gold:false, silver:false, bronze:false}}];
			else if (myRegion == 'sea')
				customDivisionArr = [{	url:'http://sc2ranks.com/c/12394/sea-pros/', 
									urlapi:'http://sc2ranks.com/api/clist/12394/all/all/1/0.json?appKey=localhost',
									name:'SEA Pros',
									updated:{grandmaster:false, master:false, diamond:false, platinum:false, gold:false, silver:false, bronze:false}}];
									
			localStorage['customDivisionURLAPI'] = customDivisionArr[0].urlapi;
			localStorage['customDivisionURL'] = customDivisionArr[0].url;
			localStorage['customDivisionName'] = customDivisionArr[0].name;
		}
		
		for (var i = 0; i < customDivisionArr.length; i++)
			customDivisionArr[i].updated = {grandmaster:false, master:false, diamond:false, platinum:false, gold:false, silver:false, bronze:false}; //no league is updated
		
		localStorage['customDivisionArr'] = JSON.stringify(customDivisionArr);
		
		if (localStorage['customDivisionURLAPI'] == null)
			localStorage['customDivisionURLAPI'] = customDivisionArr[0].urlapi;
		if (localStorage['customDivisionURL'] == null)
			localStorage['customDivisionURL'] = customDivisionArr[0].url;
		if (localStorage['customDivisionName'] == null)
			localStorage['customDivisionName'] = customDivisionArr[0].name;
			
		currentCustomDivisionName = localStorage['customDivisionName'];
		currentCustomDivisionURLAPI = localStorage['customDivisionURLAPI'];
		currentCustomDivisionURL = localStorage['customDivisionURL'];	
									
			var storageVersion = 120;
			if ((localStorage['version'] == 'undefined') || (localStorage['version'] == null))
				localStorage['version'] = storageVersion;	
			else if (localStorage['version'] < storageVersion)
			{
				//localStorage.clear();//remove all elements
				//localStorage.removeItem('historyDataBase');
				localStorage.removeItem('dataBase');				
				console.log('deleted dataBase from storage');
				console.log(localStorage);
				
				if (localStorage['version'] == 118) //necessary change from 118
				{
				var historyDataArr = JSON.parse(localStorage.getItem('historyDataBase'));
				for (var i = 0; i < historyDataArr.length; i++)
				{
					var tmp = {};
					tmp['urlprofile'] = historyDataArr[i].urlprofile;
					tmp['name'] = historyDataArr[i].name;
					tmp['min'] = historyDataArr[i].min;
					tmp['max'] = historyDataArr[i].max;
					tmp['last'] = historyDataArr[i].last;
					tmp['pointsArr'] = historyDataArr[i].pointsArr;
					tmp['urlapi'] = 'http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost';
					historyDataArr.splice(i, 1);
					historyDataArr.unshift(tmp);
					if (historyDataArr[0].urlapi != 'http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost')
						alert('error updating graph users database to new version ' + storageVersion + ' at ' + i);
				}
				localStorage['historyDataBase'] = JSON.stringify(historyDataArr);
				}
				
				customDivisionArr = JSON.parse(localStorage.getItem('customDivisionArr'));
				for (var i = 0; i < customDivisionArr.length; i++)
				{
					var tmp = {};
					tmp['url'] = customDivisionArr[0].url;
					tmp['urlapi'] = customDivisionArr[0].urlapi;
					tmp['name'] = customDivisionArr[0].name;
					tmp['updated'] = {grandmaster:false, master:false, diamond:false, platinum:false, gold:false, silver:false, bronze:false};
					customDivisionArr.push(tmp);
					customDivisionArr.splice(0, 1);
				}
				localStorage['customDivisionArr'] = JSON.stringify(customDivisionArr);
				localStorage['version'] = storageVersion;
			}
		FR.initialized = true;
	}
	
	FR.launch = function(showOwnDivision) {	
		if (FD.isLocked()) {
			return;
		}
					
		if (FR.firstRun)
		{

			FR.firstRun = false;
			myRegion = FR.getRegion();
			
			hasNewData = false; //only display users if we already refreshed some of them.

			if (!FR.initialized)
				FR.initialize();
				
			var fromLocalStorage = JSON.parse(localStorage.getItem('dataBase'));
			
			var loc = {};
			loc['eu']  = '/sc2/en/profile/';
			loc['us']  = '/sc2/en/profile/';
			loc['sea'] = '/sc2/en/profile/';
			loc['kr']  = '/sc2/ko/profile/';
			loc['tw']  = '/sc2/zh/profile/';
			loc['cn']  = '/sc2/zh/profile/';
				
			var	el3 = document.getElementById('userOwnDivision');
			if (el3 == null)
			{
				console.log('Could not get user 1v1 division info.');
				var numberToScan = 0;
			}
			else
			{
				ownDivisionJSON = el3.getAttribute('value');
				ownDivisionJSON = JSON.parse(ownDivisionJSON); 
				
				myLeague = el3.getAttribute('myleague');
				var numberToScan = ownDivisionJSON.length;
				//alert(ownDivisionJSON[0].league); //hello

				for (var i = 0; i < numberToScan; i++)
					FR.dataBase.push({	name:ownDivisionJSON[i].name, 
									region:ownDivisionJSON[i].region,
									urlprofile:ownDivisionJSON[i].urlprofile,
									urldivision:ownDivisionJSON[i].urldivision,
									rank:'',
									points:'',
									apoints:'',
									divisionname:ownDivisionJSON[i].divisionname,
									league:ownDivisionJSON[i].league,
									bonus:'',
									win:'',
									loss:'',
									tdStatus:'',
									team:'',
									type:1, //1v1 teams only
									inUserOwnDivision:true,
									urlapi:-1
									});
			}
			
			var playerListArr = [];
			var playersAmount = 0;
			var foundCustomDivisionFlag = false;
			
			for (var divNum = 0; divNum < customDivisionArr.length; divNum++)
			{
				var element = document.getElementById('custom-div-json' + divNum);	
				if (element == null)
					continue;
				foundCustomDivisionFlag = true;
				playerListArr[divNum] = JSON.parse(element.getAttribute('value'));
			
				playersAmount += playerListArr[divNum].length;

				if (fromLocalStorage == null)
				{
					for (var i = 0; i < playerListArr[divNum].length; i++)
					{					
						FR.dataBase.push({	name:playerListArr[divNum][i].members[0].name, 
											region:playerListArr[divNum][i].members[0].region,
											urlprofile:loc[playerListArr[divNum][i].members[0].region] + playerListArr[divNum][i].members[0].bnet_id + '/1/' + playerListArr[divNum][i].members[0].name + '/', 
											urldivision:'',
											rank:'',
											points:'',
											apoints:'',
											divisionname:'',
											league:playerListArr[divNum][i].league,
											bonus:'',
											win:'',
											loss:'',
											tdStatus:'',
											team:'',
											type:1, //1v1 teams only
											inUserOwnDivision:false,
											urlapi:customDivisionArr[divNum].urlapi
											}); 	
					}
				}
				else
				{
					var found = false;

					for (var i = 0; i < playerListArr[divNum].length; i++)
					{
						for (var j = 0; j < fromLocalStorage.length; j++)
						{
							if (fromLocalStorage[j].urlprofile == loc[playerListArr[divNum][i].members[0].region] + playerListArr[divNum][i].members[0].bnet_id + '/1/' + playerListArr[divNum][i].members[0].name + '/')
							{
								found = true;
								FR.dataBase.push(fromLocalStorage[j]);
								j = fromLocalStorage.length;
							}
						}
						if (found)
							found = false;
						else
							FR.dataBase.push({	name:playerListArr[divNum][i].members[0].name, 
												region:playerListArr[divNum][i].members[0].region,
												urlprofile:loc[playerListArr[divNum][i].members[0].region] + playerListArr[divNum][i].members[0].bnet_id + '/1/' + playerListArr[divNum][i].members[0].name + '/', 
												urldivision:'',
												rank:'',
												points:'',
												apoints:'',
												divisionname:'',
												league:playerListArr[divNum][i].league,
												bonus:'',
												win:'',
												loss:'',
												tdStatus:'',
												team:'',
												type:1, //1v1 teams only
												inUserOwnDivision:false,
												urlapi:customDivisionArr[divNum].urlapi
							});
					}
				}
			}
			if (!foundCustomDivisionFlag) // could not get any custom divisions from sc2ranks. maybe its down
			{
				console.log('Could not fetch player lists. Displaying list from local history.');
				if ((fromLocalStorage == null) || (fromLocalStorage.length == 0))
				{
					console.log('localStorage has no division data. Using hard coded version');
					fromLocalStorage = [{"name":"SkippeR","region":"eu","urlprofile":"/sc2/en/profile/1955949/1/SkippeR/","urldivision":"/sc2/en/profile/1955949/1/SkippeR/ladder/88765#current-rank","rank":"43rd","points":"137","apoints":62,"divisionname":"Marauder Alamo","league":"master","bonus":"67","win":"5","loss":"4","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 16/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1955949/1/SkippeR/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1955949\">\r\n\t\t\t\t\t\t\t\t\t\tSkippeR\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1955949\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">SkippeR</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"NOMOmer","region":"eu","urlprofile":"/sc2/en/profile/2520163/1/NOMOmer/","urldivision":"/sc2/en/profile/2520163/1/NOMOmer/ladder/87504#current-rank","rank":"71st","points":"30","apoints":13,"divisionname":"Moria Xi","league":"master","bonus":"125","win":"1","loss":"3","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 13/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2520163/1/NOMOmer/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-2520163\">\r\n\t\t\t\t\t\t\t\t\t\tNOMOmer\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2520163\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">NOMOmer</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"elius","region":"eu","urlprofile":"/sc2/en/profile/813451/1/elius/","urldivision":"/sc2/en/profile/813451/1/elius/ladder/86051#current-rank","rank":"78th","points":"67","apoints":42,"divisionname":"Khaydarin Juliet","league":"gold","bonus":"117","win":"5","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/813451/1/elius/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-813451\">\r\n\t\t\t\t\t\t\t\t\t\telius\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-813451\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">elius</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Devilslayer","region":"eu","urlprofile":"/sc2/en/profile/1278885/1/Devilslayer/","urldivision":"/sc2/en/profile/1278885/1/Devilslayer/ladder/88607#current-rank","rank":"74th","points":"0","apoints":1,"divisionname":"Nova Pi","league":"gold","bonus":"143","win":"0","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 15/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1278885/1/Devilslayer/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1278885\">\r\n\t\t\t\t\t\t\t\t\t\tDevilslayer\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1278885\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Devilslayer</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Divi","region":"eu","urlprofile":"/sc2/en/profile/238263/1/Divi/","urldivision":"/sc2/en/profile/238263/1/Divi/ladder/88332#current-rank","rank":"14th","points":"178","apoints":131,"divisionname":"Zealot Gravity","league":"diamond","bonus":"95","win":"13","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 15/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/238263/1/Divi/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-238263\">\r\n\t\t\t\t\t\t\t\t\t\tDivi\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-238263\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Divi</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"qTp?OzRe","region":"eu","urlprofile":"/sc2/en/profile/1924938/1/qTp?OzRe/","urldivision":"/sc2/en/profile/1924938/1/qTp?OzRe/ladder/86125#current-rank","rank":"77th","points":"73","apoints":19,"divisionname":"Sentry Lima","league":"diamond","bonus":"88","win":"19","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1924938/1/qTp?OzRe/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-1924938\">\r\n\t\t\t\t\t\t\t\t\t\tqTp?OzRe\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1924938\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">qTp?OzRe</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Finaldash","region":"eu","urlprofile":"/sc2/en/profile/2016128/1/Finaldash/","urldivision":"/sc2/en/profile/2016128/1/Finaldash/ladder/86029#current-rank","rank":"11th","points":"267","apoints":192,"divisionname":"Gorn Chi","league":"gold","bonus":"67","win":"20","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2016128/1/Finaldash/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-2016128\">\r\n\t\t\t\t\t\t\t\t\t\tFinaldash\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2016128\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Finaldash</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 16<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Izabo","region":"eu","urlprofile":"/sc2/en/profile/1717983/1/Izabo/","urldivision":"/sc2/en/profile/1717983/1/Izabo/ladder/86618#current-rank","rank":"78th","points":"30","apoints":16,"divisionname":"Marine Nu","league":"platinum","bonus":"128","win":"1","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1717983/1/Izabo/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1717983\">\r\n\t\t\t\t\t\t\t\t\t\tIzabo\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1717983\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Izabo</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 84<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"sKaz","region":"eu","urlprofile":"/sc2/en/profile/1301003/1/sKaz/","urldivision":"/sc2/en/profile/1301003/1/sKaz/ladder/88133#current-rank","rank":"48th","points":"61","apoints":7,"divisionname":"SCV Gravity","league":"platinum","bonus":"88","win":"4","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 14/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1301003/1/sKaz/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1301003\">\r\n\t\t\t\t\t\t\t\t\t\tsKaz\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1301003\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">sKaz</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"MoxeR","region":"eu","urlprofile":"/sc2/en/profile/583598/1/MoxeR/","urldivision":"/sc2/en/profile/583598/1/MoxeR/ladder/85931#current-rank","rank":"14th","points":"268","apoints":198,"divisionname":"UED Xi","league":"diamond","bonus":"72","win":"60","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/583598/1/MoxeR/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-583598\">\r\n\t\t\t\t\t\t\t\t\t\tMoxeR\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-583598\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">MoxeR</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 23<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"IRTaltalim","region":"eu","urlprofile":"/sc2/en/profile/2288094/1/IRTaltalim/","urldivision":"/sc2/en/profile/2288094/1/IRTaltalim/ladder/86435#current-rank","rank":"39th","points":"161","apoints":85,"divisionname":"Char Theta","league":"platinum","bonus":"66","win":"6","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2288094/1/IRTaltalim/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-2288094\">\r\n\t\t\t\t\t\t\t\t\t\tIRTaltalim\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2288094\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">IRTaltalim</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 75<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"OOAK","region":"eu","urlprofile":"/sc2/en/profile/1735454/1/OOAK/","urldivision":"/sc2/en/profile/1735454/1/OOAK/ladder/86505#current-rank","rank":"25th","points":"175","apoints":111,"divisionname":"Roach Dixie","league":"silver","bonus":"78","win":"24","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1735454/1/OOAK/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1735454\">\r\n\t\t\t\t\t\t\t\t\t\tOOAK\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1735454\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">OOAK</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 18<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Magic","region":"eu","urlprofile":"/sc2/en/profile/438740/1/Magic/","urldivision":"/sc2/en/profile/438740/1/Magic/ladder/86991#current-rank","rank":"2nd","points":"248","apoints":170,"divisionname":"Argo Rho","league":"platinum","bonus":"64","win":"57","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/438740/1/Magic/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-438740\">\r\n\t\t\t\t\t\t\t\t\t\tMagic\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-438740\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Magic</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 32<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"EsrBHmaster","region":"eu","urlprofile":"/sc2/en/profile/2016925/1/EsrBHmaster/","urldivision":"/sc2/en/profile/2016925/1/EsrBHmaster/ladder/85822#current-rank","rank":"21st","points":"506","apoints":379,"divisionname":"New Folsom Charlie","league":"master","bonus":"15","win":"57","loss":"59","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2016925/1/EsrBHmaster/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-2016925\">\r\n\t\t\t\t\t\t\t\t\t\tEsrBHmaster\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2016925\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">EsrBHmaster</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 13<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Sectorix","region":"eu","urlprofile":"/sc2/en/profile/485647/1/Sectorix/","urldivision":"/sc2/en/profile/485647/1/Sectorix/ladder/86143#current-rank","rank":"20th","points":"193","apoints":116,"divisionname":"Gorn Victor","league":"platinum","bonus":"65","win":"20","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/485647/1/Sectorix/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-485647\">\r\n\t\t\t\t\t\t\t\t\t\tSectorix\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-485647\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Sectorix</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 43<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Shmulix","region":"eu","urlprofile":"/sc2/en/profile/239177/1/Shmulix/","urldivision":"/sc2/en/profile/239177/1/Shmulix/ladder/87575#current-rank","rank":"42nd","points":"68","apoints":39,"divisionname":"Zekrath Yankee","league":"gold","bonus":"113","win":"5","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 13/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/239177/1/Shmulix/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-239177\">\r\n\t\t\t\t\t\t\t\t\t\tShmulix\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-239177\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Shmulix</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"walidbadir","region":"eu","urlprofile":"/sc2/en/profile/2720793/1/walidbadir/","urldivision":"/sc2/en/profile/2720793/1/walidbadir/ladder/87432#current-rank","rank":"9th","points":"482","apoints":343,"divisionname":"Augustgrad Upsilon","league":"master","bonus":"3","win":"47","loss":"44","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2720793/1/walidbadir/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-2720793\">\r\n\t\t\t\t\t\t\t\t\t\twalidbadir\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2720793\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">walidbadir</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 10<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"qTpCormorant","region":"eu","urlprofile":"/sc2/en/profile/1367601/1/qTpCormorant/","urldivision":"/sc2/en/profile/1367601/1/qTpCormorant/ladder/85840#current-rank","rank":"32nd","points":"329","apoints":209,"divisionname":"Xerana Lambda","league":"master","bonus":"22","win":"29","loss":"28","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1367601/1/qTpCormorant/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1367601\">\r\n\t\t\t\t\t\t\t\t\t\tqTpCormorant\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1367601\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">qTpCormorant</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 40<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"EnderTX","region":"us","urlprofile":"/sc2/en/profile/3017843/1/EnderTX/","urldivision":"","rank":"","points":"","apoints":"","divisionname":"","league":"diamond","bonus":"","win":"","loss":"","tdStatus":"","team":"","type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Ben","region":"eu","urlprofile":"/sc2/en/profile/502047/1/Ben/","urldivision":"/sc2/en/profile/502047/1/Ben/ladder/86979#current-rank","rank":"98th","points":"0","apoints":1,"divisionname":"Queen Dixie","league":"gold","bonus":"143","win":"1","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/502047/1/Ben/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-502047\">\r\n\t\t\t\t\t\t\t\t\t\tBen\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-502047\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Ben</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"PwBulugulu","region":"eu","urlprofile":"/sc2/en/profile/1443696/1/PwBulugulu/","urldivision":"/sc2/en/profile/1443696/1/PwBulugulu/ladder/86867#current-rank","rank":"11th","points":"463","apoints":330,"divisionname":"Xerana Sierra","league":"master","bonus":"9","win":"29","loss":"17","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1443696/1/PwBulugulu/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-1443696\">\r\n\t\t\t\t\t\t\t\t\t\tPwBulugulu\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1443696\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">PwBulugulu</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 51<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Astunad","region":"eu","urlprofile":"/sc2/en/profile/211206/1/Astunad/","urldivision":"/sc2/en/profile/211206/1/Astunad/ladder/89343#current-rank","rank":"36th","points":"83","apoints":31,"divisionname":"Hive Omicron","league":"diamond","bonus":"90","win":"3","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 19/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/211206/1/Astunad/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-211206\">\r\n\t\t\t\t\t\t\t\t\t\tAstunad\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-211206\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Astunad</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"soydeN","region":"eu","urlprofile":"/sc2/en/profile/1620508/1/soydeN/","urldivision":"/sc2/en/profile/1620508/1/soydeN/ladder/85689#current-rank","rank":"59th","points":"126","apoints":103,"divisionname":"Uraj Gamma","league":"platinum","bonus":"119","win":"17","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1620508/1/soydeN/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1620508\">\r\n\t\t\t\t\t\t\t\t\t\tsoydeN\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1620508\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">soydeN</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"StreetCat","region":"eu","urlprofile":"/sc2/en/profile/2441420/1/StreetCat/","urldivision":"/sc2/en/profile/2441420/1/StreetCat/ladder/86937#current-rank","rank":"42nd","points":"128","apoints":87,"divisionname":"Warp Prism Echo","league":"bronze","bonus":"101","win":"8","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2441420/1/StreetCat/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-2441420\">\r\n\t\t\t\t\t\t\t\t\t\tStreetCat\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2441420\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">StreetCat</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"eranww","region":"eu","urlprofile":"/sc2/en/profile/821117/1/eranww/","urldivision":"/sc2/en/profile/821117/1/eranww/ladder/85890#current-rank","rank":"43rd","points":"143","apoints":75,"divisionname":"Medic Kappa","league":"gold","bonus":"74","win":"13","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/821117/1/eranww/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-821117\">\r\n\t\t\t\t\t\t\t\t\t\teranww\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-821117\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">eranww</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 42<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"beharon","region":"eu","urlprofile":"/sc2/en/profile/1372924/1/beharon/","urldivision":"/sc2/en/profile/1372924/1/beharon/ladder/86522#current-rank","rank":"43rd","points":"125","apoints":106,"divisionname":"Zerus Gamma","league":"diamond","bonus":"123","win":"14","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1372924/1/beharon/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1372924\">\r\n\t\t\t\t\t\t\t\t\t\tbeharon\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1372924\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">beharon</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Osiris","region":"eu","urlprofile":"/sc2/en/profile/2299888/1/Osiris/","urldivision":"/sc2/en/profile/2299888/1/Osiris/ladder/86919#current-rank","rank":"88th","points":"12","apoints":4,"divisionname":"Nova Epsilon","league":"master","bonus":"134","win":"2","loss":"7","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2299888/1/Osiris/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-2299888\">\r\n\t\t\t\t\t\t\t\t\t\tOsiris\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2299888\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Osiris</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"BloodyAlex","region":"eu","urlprofile":"/sc2/en/profile/2007150/1/BloodyAlex/","urldivision":"/sc2/en/profile/2007150/1/BloodyAlex/ladder/89292#current-rank","rank":"16th","points":"167","apoints":89,"divisionname":"Liberty Xi","league":"diamond","bonus":"64","win":"6","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 19/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2007150/1/BloodyAlex/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-2007150\">\r\n\t\t\t\t\t\t\t\t\t\tBloodyAlex\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2007150\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">BloodyAlex</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Assaf","region":"eu","urlprofile":"/sc2/en/profile/1317338/1/Assaf/","urldivision":"/sc2/en/profile/1317338/1/Assaf/ladder/88169#current-rank","rank":"38th","points":"139","apoints":15,"divisionname":"Grizzly Lambda","league":"master","bonus":"18","win":"10","loss":"9","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 14/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1317338/1/Assaf/\"\r\n\t class=\"race-random\"\r\n\t data-tooltip=\"#player-info-1317338\">\r\n\t\t\t\t\t\t\t\t\t\tAssaf\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1317338\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Assaf</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Random\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"TESRA","region":"eu","urlprofile":"/sc2/en/profile/1084268/1/TESRA/","urldivision":"/sc2/en/profile/1084268/1/TESRA/ladder/85680#current-rank","rank":"34th","points":"415","apoints":291,"divisionname":"Scourge Xi","league":"master","bonus":"18","win":"26","loss":"25","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1084268/1/TESRA/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1084268\">\r\n\t\t\t\t\t\t\t\t\t\tTESRA\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1084268\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">TESRA</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 31<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"tomer","region":"eu","urlprofile":"/sc2/en/profile/1614230/1/tomer/","urldivision":"/sc2/en/profile/1614230/1/tomer/ladder/89303#current-rank","rank":"96th","points":"0","apoints":1,"divisionname":"Talematros Gamma","league":"platinum","bonus":"143","win":"0","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 19/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1614230/1/tomer/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1614230\">\r\n\t\t\t\t\t\t\t\t\t\ttomer\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1614230\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">tomer</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"GalaxyWar","region":"eu","urlprofile":"/sc2/en/profile/2355469/1/GalaxyWar/","urldivision":"/sc2/en/profile/2355469/1/GalaxyWar/ladder/85573#current-rank","rank":"60th","points":"163","apoints":86,"divisionname":"Roach Chi","league":"diamond","bonus":"65","win":"80","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2355469/1/GalaxyWar/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-2355469\">\r\n\t\t\t\t\t\t\t\t\t\tGalaxyWar\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2355469\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">GalaxyWar</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 61<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Syo","region":"eu","urlprofile":"/sc2/en/profile/216698/1/Syo/","urldivision":"/sc2/en/profile/216698/1/Syo/ladder/85957#current-rank","rank":"50th","points":"217","apoints":134,"divisionname":"Guardian Theta","league":"master","bonus":"59","win":"8","loss":"7","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/216698/1/Syo/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-216698\">\r\n\t\t\t\t\t\t\t\t\t\tSyo\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-216698\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Syo</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 76<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"wuffwuff","region":"eu","urlprofile":"/sc2/en/profile/1102001/1/wuffwuff/","urldivision":"/sc2/en/profile/1102001/1/wuffwuff/ladder/89336#current-rank","rank":"77th","points":"0","apoints":1,"divisionname":"Sargas Hawk","league":"master","bonus":"143","win":"0","loss":"2","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 19/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1102001/1/wuffwuff/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1102001\">\r\n\t\t\t\t\t\t\t\t\t\twuffwuff\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1102001\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">wuffwuff</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Jiddu","region":"eu","urlprofile":"/sc2/en/profile/2170227/1/Jiddu/","urldivision":"/sc2/en/profile/2170227/1/Jiddu/ladder/86816#current-rank","rank":"33rd","points":"143","apoints":91,"divisionname":"Victory Delta","league":"gold","bonus":"90","win":"9","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2170227/1/Jiddu/\"\r\n\t class=\"race-random\"\r\n\t data-tooltip=\"#player-info-2170227\">\r\n\t\t\t\t\t\t\t\t\t\tJiddu\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2170227\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Jiddu</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Random\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"ColDreamS","region":"eu","urlprofile":"/sc2/en/profile/2152304/1/ColDreamS/","urldivision":"/sc2/en/profile/2152304/1/ColDreamS/ladder/89482#current-rank","rank":"12th","points":"265","apoints":141,"divisionname":"New Folsom Juliet","league":"master","bonus":"18","win":"77","loss":"15","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 20/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2152304/1/ColDreamS/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-2152304\">\r\n\t\t\t\t\t\t\t\t\t\tColDreamS\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2152304\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">ColDreamS</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Tomer","region":"eu","urlprofile":"/sc2/en/profile/1540183/1/Tomer/","urldivision":"/sc2/en/profile/1540183/1/Tomer/ladder/86674#current-rank","rank":"88th","points":"17","apoints":10,"divisionname":"Mar Sara Mars","league":"bronze","bonus":"135","win":"2","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1540183/1/Tomer/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-1540183\">\r\n\t\t\t\t\t\t\t\t\t\tTomer\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1540183\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Tomer</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"AmorphiS","region":"eu","urlprofile":"/sc2/en/profile/1606589/1/AmorphiS/","urldivision":"/sc2/en/profile/1606589/1/AmorphiS/ladder/88307#current-rank","rank":"6th","points":"236","apoints":159,"divisionname":"Auriga Mars","league":"gold","bonus":"65","win":"30","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 14/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1606589/1/AmorphiS/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1606589\">\r\n\t\t\t\t\t\t\t\t\t\tAmorphiS\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1606589\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">AmorphiS</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"PwShadowmoor","region":"eu","urlprofile":"/sc2/en/profile/548518/1/PwShadowmoor/","urldivision":"/sc2/en/profile/548518/1/PwShadowmoor/ladder/85797#current-rank","rank":"36th","points":"332","apoints":237,"divisionname":"Sargas Sigma","league":"master","bonus":"47","win":"38","loss":"38","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/548518/1/PwShadowmoor/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-548518\">\r\n\t\t\t\t\t\t\t\t\t\tPwShadowmoor\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-548518\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">PwShadowmoor</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 25<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Nocturnus","region":"eu","urlprofile":"/sc2/en/profile/1148436/1/Nocturnus/","urldivision":"/sc2/en/profile/1148436/1/Nocturnus/ladder/86787#current-rank","rank":"76th","points":"29","apoints":25,"divisionname":"Drone Tango","league":"silver","bonus":"138","win":"3","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1148436/1/Nocturnus/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1148436\">\r\n\t\t\t\t\t\t\t\t\t\tNocturnus\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1148436\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Nocturnus</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 71<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Dgandalf","region":"eu","urlprofile":"/sc2/en/profile/345901/1/Dgandalf/","urldivision":"/sc2/en/profile/345901/1/Dgandalf/ladder/85701#current-rank","rank":"34th","points":"167","apoints":90,"divisionname":"Goliath X-Ray","league":"platinum","bonus":"65","win":"14","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/345901/1/Dgandalf/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-345901\">\r\n\t\t\t\t\t\t\t\t\t\tDgandalf\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-345901\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Dgandalf</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 57<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Nahmani","region":"eu","urlprofile":"/sc2/en/profile/994207/1/Nahmani/","urldivision":"/sc2/en/profile/994207/1/Nahmani/ladder/85971#current-rank","rank":"76th","points":"72","apoints":54,"divisionname":"Meinhoff Oscar","league":"platinum","bonus":"124","win":"6","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/994207/1/Nahmani/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-994207\">\r\n\t\t\t\t\t\t\t\t\t\tNahmani\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-994207\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Nahmani</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"ubershmekel","region":"eu","urlprofile":"/sc2/en/profile/410336/1/ubershmekel/","urldivision":"/sc2/en/profile/410336/1/ubershmekel/ladder/87272#current-rank","rank":"65th","points":"66","apoints":41,"divisionname":"Anselm Indigo ","league":"diamond","bonus":"117","win":"8","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/410336/1/ubershmekel/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-410336\">\r\n\t\t\t\t\t\t\t\t\t\tubershmekel\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-410336\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">ubershmekel</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"AviadxxDan","region":"eu","urlprofile":"/sc2/en/profile/1070771/1/AviadxxDan/","urldivision":"/sc2/en/profile/1070771/1/AviadxxDan/ladder/88787#current-rank","rank":"90th","points":"0","apoints":1,"divisionname":"Archon Mu","league":"gold","bonus":"143","win":"1","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 17/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1070771/1/AviadxxDan/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1070771\">\r\n\t\t\t\t\t\t\t\t\t\tAviadxxDan\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1070771\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">AviadxxDan</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"InAPMWeTrust","region":"eu","urlprofile":"/sc2/en/profile/552929/1/InAPMWeTrust/","urldivision":"/sc2/en/profile/552929/1/InAPMWeTrust/ladder/85910#current-rank","rank":"71st","points":"135","apoints":17,"divisionname":"Dragoon Victor","league":"master","bonus":"24","win":"13","loss":"17","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/552929/1/InAPMWeTrust/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-552929\">\r\n\t\t\t\t\t\t\t\t\t\tInAPMWeTrust\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-552929\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">InAPMWeTrust</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 81<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Noman","region":"eu","urlprofile":"/sc2/en/profile/313292/1/Noman/","urldivision":"/sc2/en/profile/313292/1/Noman/ladder/85583#current-rank","rank":"26th","points":"219","apoints":140,"divisionname":"Ramsey Yankee","league":"diamond","bonus":"63","win":"36","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/313292/1/Noman/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-313292\">\r\n\t\t\t\t\t\t\t\t\t\tNoman\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-313292\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Noman</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 12<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Ran","region":"eu","urlprofile":"/sc2/en/profile/348951/1/Ran/","urldivision":"/sc2/en/profile/348951/1/Ran/ladder/86404#current-rank","rank":"10th","points":"232","apoints":207,"divisionname":"Lockwell Quest","league":"diamond","bonus":"117","win":"31","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/348951/1/Ran/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-348951\">\r\n\t\t\t\t\t\t\t\t\t\tRan\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-348951\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Ran</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"NotThat","region":"eu","urlprofile":"/sc2/en/profile/2033279/1/NotThat/","urldivision":"/sc2/en/profile/2033279/1/NotThat/ladder/87621#current-rank","rank":"15th","points":"331","apoints":220,"divisionname":"Reaper Phi","league":"master","bonus":"31","win":"22","loss":"20","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 13/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2033279/1/NotThat/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-2033279\">\r\n\t\t\t\t\t\t\t\t\t\tNotThat\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2033279\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">NotThat</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Zanubis","region":"eu","urlprofile":"/sc2/en/profile/793717/1/Zanubis/","urldivision":"/sc2/en/profile/793717/1/Zanubis/ladder/85680#current-rank","rank":"8th","points":"634","apoints":517,"divisionname":"Scourge Xi","league":"master","bonus":"25","win":"88","loss":"80","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/793717/1/Zanubis/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-793717\">\r\n\t\t\t\t\t\t\t\t\t\tZanubis\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-793717\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Zanubis</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 4<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"DarkRespect","region":"eu","urlprofile":"/sc2/en/profile/532496/1/DarkRespect/","urldivision":"/sc2/en/profile/532496/1/DarkRespect/ladder/86828#current-rank","rank":"94th","points":"0","apoints":-4,"divisionname":"Horner Zeta","league":"platinum","bonus":"138","win":"1","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/532496/1/DarkRespect/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-532496\">\r\n\t\t\t\t\t\t\t\t\t\tDarkRespect\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-532496\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">DarkRespect</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"IamEroX","region":"eu","urlprofile":"/sc2/en/profile/174258/1/IamEroX/","urldivision":"/sc2/en/profile/174258/1/IamEroX/ladder/86231#current-rank","rank":"23rd","points":"429","apoints":295,"divisionname":"Kaloth Tango","league":"master","bonus":"8","win":"30","loss":"24","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t--\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/174258/1/IamEroX/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-174258\">\r\n\t\t\t\t\t\t\t\t\t\tIamEroX\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-174258\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">IamEroX</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 23<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Moshto","region":"eu","urlprofile":"/sc2/en/profile/1179477/1/Moshto/","urldivision":"/sc2/en/profile/1179477/1/Moshto/ladder/87932#current-rank","rank":"28th","points":"152","apoints":75,"divisionname":"Daggoth Kappa","league":"platinum","bonus":"65","win":"10","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 13/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1179477/1/Moshto/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1179477\">\r\n\t\t\t\t\t\t\t\t\t\tMoshto\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1179477\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Moshto</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 45<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Gulzar","region":"eu","urlprofile":"/sc2/en/profile/1106802/1/Gulzar/","urldivision":"/sc2/en/profile/1106802/1/Gulzar/ladder/88773#current-rank","rank":"1st","points":"320","apoints":241,"divisionname":"Phoenix Foxtrot","league":"diamond","bonus":"63","win":"49","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 16/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1106802/1/Gulzar/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1106802\">\r\n\t\t\t\t\t\t\t\t\t\tGulzar\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1106802\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Gulzar</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"EchoeS","region":"eu","urlprofile":"/sc2/en/profile/423383/1/EchoeS/","urldivision":"/sc2/en/profile/423383/1/EchoeS/ladder/86183#current-rank","rank":"99th","points":"0","apoints":1,"divisionname":"Brontes November","league":"master","bonus":"143","win":"0","loss":"12","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/423383/1/EchoeS/\"\r\n\t class=\"race-random\"\r\n\t data-tooltip=\"#player-info-423383\">\r\n\t\t\t\t\t\t\t\t\t\tEchoeS\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-423383\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">EchoeS</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Random\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"LikeableGuy","region":"eu","urlprofile":"/sc2/en/profile/1046413/1/LikeableGuy/","urldivision":"/sc2/en/profile/1046413/1/LikeableGuy/ladder/85931#current-rank","rank":"6th","points":"307","apoints":251,"divisionname":"UED Xi","league":"diamond","bonus":"86","win":"42","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1046413/1/LikeableGuy/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1046413\">\r\n\t\t\t\t\t\t\t\t\t\tLikeableGuy\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1046413\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">LikeableGuy</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 14<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"PwSnykes","region":"eu","urlprofile":"/sc2/en/profile/1212399/1/PwSnykes/","urldivision":"/sc2/en/profile/1212399/1/PwSnykes/ladder/85680#current-rank","rank":"9th","points":"633","apoints":497,"divisionname":"Scourge Xi","league":"master","bonus":"6","win":"102","loss":"91","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1212399/1/PwSnykes/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1212399\">\r\n\t\t\t\t\t\t\t\t\t\tPwSnykes\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1212399\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">PwSnykes</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 35<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"maoda","region":"eu","urlprofile":"/sc2/en/profile/604479/1/maoda/","urldivision":"/sc2/en/profile/604479/1/maoda/ladder/86867#current-rank","rank":"89th","points":"0","apoints":1,"divisionname":"Xerana Sierra","league":"master","bonus":"143","win":"1","loss":"2","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/604479/1/maoda/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-604479\">\r\n\t\t\t\t\t\t\t\t\t\tmaoda\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-604479\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">maoda</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"PwYuMi","region":"eu","urlprofile":"/sc2/en/profile/512496/1/PwYuMi/","urldivision":"/sc2/en/profile/512496/1/PwYuMi/ladder/85680#current-rank","rank":"100th","points":"0","apoints":1,"divisionname":"Scourge Xi","league":"master","bonus":"143","win":"0","loss":"1","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/512496/1/PwYuMi/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-512496\">\r\n\t\t\t\t\t\t\t\t\t\tPwYuMi\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-512496\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">PwYuMi</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"COOPtomer","region":"eu","urlprofile":"/sc2/en/profile/1625493/1/COOPtomer/","urldivision":"/sc2/en/profile/1625493/1/COOPtomer/ladder/85735#current-rank","rank":"49th","points":"128","apoints":51,"divisionname":"Bucephalus Upsilon","league":"gold","bonus":"65","win":"21","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1625493/1/COOPtomer/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1625493\">\r\n\t\t\t\t\t\t\t\t\t\tCOOPtomer\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1625493\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">COOPtomer</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 44<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"RoyiempZ","region":"eu","urlprofile":"/sc2/en/profile/1156066/1/RoyiempZ/","urldivision":"/sc2/en/profile/1156066/1/RoyiempZ/ladder/87504#current-rank","rank":"18th","points":"307","apoints":191,"divisionname":"Moria Xi","league":"master","bonus":"26","win":"33","loss":"25","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1156066/1/RoyiempZ/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1156066\">\r\n\t\t\t\t\t\t\t\t\t\tRoyiempZ\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1156066\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">RoyiempZ</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 17<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"NutPro","region":"eu","urlprofile":"/sc2/en/profile/1166500/1/NutPro/","urldivision":"/sc2/en/profile/1166500/1/NutPro/ladder/86202#current-rank","rank":"81st","points":"36","apoints":-9,"divisionname":"Torus Zed ","league":"master","bonus":"97","win":"6","loss":"15","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1166500/1/NutPro/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1166500\">\r\n\t\t\t\t\t\t\t\t\t\tNutPro\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1166500\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">NutPro</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 88<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Malkishua","region":"eu","urlprofile":"/sc2/en/profile/621667/1/Malkishua/","urldivision":"/sc2/en/profile/621667/1/Malkishua/ladder/88734#current-rank","rank":"96th","points":"0","apoints":1,"divisionname":"Augustgrad Epsilon","league":"gold","bonus":"143","win":"0","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 16/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/621667/1/Malkishua/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-621667\">\r\n\t\t\t\t\t\t\t\t\t\tMalkishua\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-621667\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Malkishua</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Rani","region":"eu","urlprofile":"/sc2/en/profile/524972/1/Rani/","urldivision":"/sc2/en/profile/524972/1/Rani/ladder/89271#current-rank","rank":"30th","points":"86","apoints":44,"divisionname":"Antioch Upsilon","league":"gold","bonus":"100","win":"3","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 19/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/524972/1/Rani/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-524972\">\r\n\t\t\t\t\t\t\t\t\t\tRani\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-524972\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Rani</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Froster","region":"eu","urlprofile":"/sc2/en/profile/1179051/1/Froster/","urldivision":"/sc2/en/profile/1179051/1/Froster/ladder/85724#current-rank","rank":"20th","points":"207","apoints":130,"divisionname":"Lockwell Yankee","league":"gold","bonus":"65","win":"26","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1179051/1/Froster/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-1179051\">\r\n\t\t\t\t\t\t\t\t\t\tFroster\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1179051\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Froster</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 36<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Sparox","region":"eu","urlprofile":"/sc2/en/profile/1904349/1/Sparox/","urldivision":"/sc2/en/profile/1904349/1/Sparox/ladder/85953#current-rank","rank":"50th","points":"135","apoints":81,"divisionname":"Agria Mu","league":"platinum","bonus":"88","win":"42","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1904349/1/Sparox/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1904349\">\r\n\t\t\t\t\t\t\t\t\t\tSparox\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1904349\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Sparox</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 41<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"yeshu","region":"eu","urlprofile":"/sc2/en/profile/204281/1/yeshu/","urldivision":"/sc2/en/profile/204281/1/yeshu/ladder/87822#current-rank","rank":"30th","points":"127","apoints":64,"divisionname":"Phoenix Uncle","league":"platinum","bonus":"79","win":"6","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 19/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/204281/1/yeshu/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-204281\">\r\n\t\t\t\t\t\t\t\t\t\tyeshu\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-204281\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">yeshu</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Pure","region":"eu","urlprofile":"/sc2/en/profile/1201158/1/Pure/","urldivision":"/sc2/en/profile/1201158/1/Pure/ladder/89336#current-rank","rank":"21st","points":"191","apoints":102,"divisionname":"Sargas Hawk","league":"master","bonus":"53","win":"25","loss":"2","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 19/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1201158/1/Pure/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1201158\">\r\n\t\t\t\t\t\t\t\t\t\tPure\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1201158\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Pure</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"regba","region":"eu","urlprofile":"/sc2/en/profile/790022/1/regba/","urldivision":"/sc2/en/profile/790022/1/regba/ladder/86428#current-rank","rank":"16th","points":"503","apoints":361,"divisionname":"Jorgensen Chi","league":"master","bonus":0,"win":"107","loss":"107","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/790022/1/regba/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-790022\">\r\n\t\t\t\t\t\t\t\t\t\tregba\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-790022\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">regba</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 19<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Draver","region":"eu","urlprofile":"/sc2/en/profile/1576986/1/Draver/","urldivision":"/sc2/en/profile/1576986/1/Draver/ladder/85675#current-rank","rank":"67th","points":"102","apoints":101,"divisionname":"Akilae Mars","league":"gold","bonus":"141","win":"10","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1576986/1/Draver/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1576986\">\r\n\t\t\t\t\t\t\t\t\t\tDraver\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1576986\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Draver</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Rez","region":"eu","urlprofile":"/sc2/en/profile/470072/1/Rez/","urldivision":"/sc2/en/profile/470072/1/Rez/ladder/86860#current-rank","rank":"66th","points":"86","apoints":44,"divisionname":"Arbiter Theta","league":"diamond","bonus":"100","win":"4","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/470072/1/Rez/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-470072\">\r\n\t\t\t\t\t\t\t\t\t\tRez\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-470072\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Rez</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 90<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"vovalol","region":"eu","urlprofile":"/sc2/en/profile/1346151/1/vovalol/","urldivision":"/sc2/en/profile/1346151/1/vovalol/ladder/87010#current-rank","rank":"14th","points":"301","apoints":166,"divisionname":"Dragoon Lima","league":"master","bonus":"7","win":"57","loss":"47","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1346151/1/vovalol/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1346151\">\r\n\t\t\t\t\t\t\t\t\t\tvovalol\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1346151\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">vovalol</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 21<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"CheapCheese","region":"eu","urlprofile":"/sc2/en/profile/523469/1/CheapCheese/","urldivision":"/sc2/en/profile/523469/1/CheapCheese/ladder/86199#current-rank","rank":"37th","points":"176","apoints":119,"divisionname":"Liberty Psi","league":"platinum","bonus":"85","win":"73","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/523469/1/CheapCheese/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-523469\">\r\n\t\t\t\t\t\t\t\t\t\tCheapCheese\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-523469\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">CheapCheese</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 28<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"TheRiddler","region":"eu","urlprofile":"/sc2/en/profile/384232/1/TheRiddler/","urldivision":"/sc2/en/profile/384232/1/TheRiddler/ladder/87660#current-rank","rank":"86th","points":"0","apoints":1,"divisionname":"Carrier Alamo","league":"silver","bonus":"143","win":"0","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 13/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/384232/1/TheRiddler/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-384232\">\r\n\t\t\t\t\t\t\t\t\t\tTheRiddler\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-384232\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">TheRiddler</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Simpart","region":"eu","urlprofile":"/sc2/en/profile/2105880/1/Simpart/","urldivision":"/sc2/en/profile/2105880/1/Simpart/ladder/88287#current-rank","rank":"12th","points":"175","apoints":118,"divisionname":"Samiku Eta","league":"gold","bonus":"85","win":"12","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 14/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2105880/1/Simpart/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-2105880\">\r\n\t\t\t\t\t\t\t\t\t\tSimpart\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2105880\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Simpart</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"StinkyCop","region":"eu","urlprofile":"/sc2/en/profile/1595103/1/StinkyCop/","urldivision":"/sc2/en/profile/1595103/1/StinkyCop/ladder/85910#current-rank","rank":"63rd","points":"166","apoints":35,"divisionname":"Dragoon Victor","league":"master","bonus":"11","win":"38","loss":"41","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1595103/1/StinkyCop/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1595103\">\r\n\t\t\t\t\t\t\t\t\t\tStinkyCop\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1595103\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">StinkyCop</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 67<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Gozal","region":"eu","urlprofile":"/sc2/en/profile/1347229/1/Gozal/","urldivision":"/sc2/en/profile/1347229/1/Gozal/ladder/86919#current-rank","rank":"11th","points":"472","apoints":335,"divisionname":"Nova Epsilon","league":"master","bonus":"5","win":"38","loss":"40","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1347229/1/Gozal/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1347229\">\r\n\t\t\t\t\t\t\t\t\t\tGozal\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1347229\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Gozal</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 13<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"LeSmurf","region":"eu","urlprofile":"/sc2/en/profile/2573402/1/LeSmurf/","urldivision":"/sc2/en/profile/2573402/1/LeSmurf/ladder/85733#current-rank","rank":"64th","points":"136","apoints":52,"divisionname":"Thor Gravity","league":"master","bonus":"58","win":"8","loss":"3","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2573402/1/LeSmurf/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-2573402\">\r\n\t\t\t\t\t\t\t\t\t\tLeSmurf\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2573402\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">LeSmurf</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Flyling","region":"eu","urlprofile":"/sc2/en/profile/893992/1/Flyling/","urldivision":"/sc2/en/profile/893992/1/Flyling/ladder/85975#current-rank","rank":"18th","points":"493","apoints":385,"divisionname":"Shiloh Alamo","league":"master","bonus":"34","win":"59","loss":"52","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t--\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/893992/1/Flyling/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-893992\">\r\n\t\t\t\t\t\t\t\t\t\tFlyling\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-893992\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Flyling</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 18<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"IGAmiel","region":"eu","urlprofile":"/sc2/en/profile/2113943/1/IGAmiel/","urldivision":"/sc2/en/profile/2113943/1/IGAmiel/ladder/85855#current-rank","rank":"36th","points":"161","apoints":97,"divisionname":"Khala Pi","league":"gold","bonus":"78","win":"26","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2113943/1/IGAmiel/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-2113943\">\r\n\t\t\t\t\t\t\t\t\t\tIGAmiel\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2113943\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">IGAmiel</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 21<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"NOMYuvalShot","region":"eu","urlprofile":"/sc2/en/profile/1333503/1/NOMYuvalShot/","urldivision":"/sc2/en/profile/1333503/1/NOMYuvalShot/ladder/85719#current-rank","rank":"3rd","points":"766","apoints":662,"divisionname":"Brood Lord Phi","league":"master","bonus":"38","win":"93","loss":"65","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1333503/1/NOMYuvalShot/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1333503\">\r\n\t\t\t\t\t\t\t\t\t\tNOMYuvalShot\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1333503\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">NOMYuvalShot</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 1<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Gargamel","region":"eu","urlprofile":"/sc2/en/profile/422615/1/Gargamel/","urldivision":"/sc2/en/profile/422615/1/Gargamel/ladder/86857#current-rank","rank":"17th","points":"200","apoints":121,"divisionname":"Zerus Uncle","league":"platinum","bonus":"63","win":"27","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/422615/1/Gargamel/\"\r\n\t class=\"race-random\"\r\n\t data-tooltip=\"#player-info-422615\">\r\n\t\t\t\t\t\t\t\t\t\tGargamel\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-422615\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Gargamel</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 50<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Random\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"TopNotch","region":"eu","urlprofile":"/sc2/en/profile/1969059/1/TopNotch/","urldivision":"/sc2/en/profile/1969059/1/TopNotch/ladder/88874#current-rank","rank":"42nd","points":"34","apoints":18,"divisionname":"Hanson Bravo","league":"gold","bonus":"126","win":"2","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 16/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1969059/1/TopNotch/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1969059\">\r\n\t\t\t\t\t\t\t\t\t\tTopNotch\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1969059\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">TopNotch</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Amit","region":"eu","urlprofile":"/sc2/en/profile/537923/1/Amit/","urldivision":"/sc2/en/profile/537923/1/Amit/ladder/86121#current-rank","rank":"40th","points":"232","apoints":99,"divisionname":"Overseer Whiskey","league":"master","bonus":"9","win":"15","loss":"14","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/537923/1/Amit/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-537923\">\r\n\t\t\t\t\t\t\t\t\t\tAmit\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-537923\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Amit</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 80<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"TomTTT","region":"eu","urlprofile":"/sc2/en/profile/1902053/1/TomTTT/","urldivision":"/sc2/en/profile/1902053/1/TomTTT/ladder/85853#current-rank","rank":"34th","points":"173","apoints":95,"divisionname":"Thor Beta","league":"platinum","bonus":"64","win":"14","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1902053/1/TomTTT/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1902053\">\r\n\t\t\t\t\t\t\t\t\t\tTomTTT\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1902053\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">TomTTT</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 28<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Infested","region":"eu","urlprofile":"/sc2/en/profile/1947004/1/Infested/","urldivision":"/sc2/en/profile/1947004/1/Infested/ladder/88822#current-rank","rank":"80th","points":"0","apoints":1,"divisionname":"Raynor Lima","league":"bronze","bonus":"143","win":"0","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 16/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1947004/1/Infested/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1947004\">\r\n\t\t\t\t\t\t\t\t\t\tInfested\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1947004\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Infested</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Kazinorian","region":"us","urlprofile":"/sc2/en/profile/1082519/1/Kazinorian/","urldivision":"","rank":"","points":"","apoints":"","divisionname":"","league":"master","bonus":"","win":"","loss":"","tdStatus":"","team":"","type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Taz","region":"eu","urlprofile":"/sc2/en/profile/1125255/1/Taz/","urldivision":"/sc2/en/profile/1125255/1/Taz/ladder/88526#current-rank","rank":"26th","points":"109","apoints":32,"divisionname":"Anselm Bravo","league":"platinum","bonus":"65","win":"9","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 15/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1125255/1/Taz/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-1125255\">\r\n\t\t\t\t\t\t\t\t\t\tTaz\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1125255\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Taz</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"IRTrogdor","region":"eu","urlprofile":"/sc2/en/profile/2516433/1/IRTrogdor/","urldivision":"/sc2/en/profile/2516433/1/IRTrogdor/ladder/86735#current-rank","rank":"62nd","points":"79","apoints":24,"divisionname":"Duke Epsilon","league":"diamond","bonus":"87","win":"14","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2516433/1/IRTrogdor/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-2516433\">\r\n\t\t\t\t\t\t\t\t\t\tIRTrogdor\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2516433\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">IRTrogdor</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 51<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Surf","region":"eu","urlprofile":"/sc2/en/profile/586841/1/Surf/","urldivision":"/sc2/en/profile/586841/1/Surf/ladder/86720#current-rank","rank":"17th","points":"213","apoints":135,"divisionname":"Valerian Upsilon","league":"diamond","bonus":"64","win":"24","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/586841/1/Surf/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-586841\">\r\n\t\t\t\t\t\t\t\t\t\tSurf\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-586841\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Surf</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 33<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"tHeReaveR","region":"eu","urlprofile":"/sc2/en/profile/850789/1/tHeReaveR/","urldivision":"/sc2/en/profile/850789/1/tHeReaveR/ladder/88010#current-rank","rank":"37th","points":"100","apoints":20,"divisionname":"Jorgensen Rho","league":"diamond","bonus":"62","win":"8","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 14/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/850789/1/tHeReaveR/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-850789\">\r\n\t\t\t\t\t\t\t\t\t\ttHeReaveR\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-850789\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">tHeReaveR</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 90<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Adonminus","region":"us","urlprofile":"/sc2/en/profile/2879077/1/Adonminus/","urldivision":"","rank":"","points":"","apoints":"","divisionname":"","league":"master","bonus":"","win":"","loss":"","tdStatus":"","team":"","type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Penance","region":"eu","urlprofile":"/sc2/en/profile/2022959/1/Penance/","urldivision":"/sc2/en/profile/2022959/1/Penance/ladder/85568#current-rank","rank":"4th","points":"264","apoints":185,"divisionname":"Felanis Sierra","league":"diamond","bonus":"63","win":"42","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2022959/1/Penance/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-2022959\">\r\n\t\t\t\t\t\t\t\t\t\tPenance\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2022959\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Penance</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 17<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"NOMAdonminus","region":"eu","urlprofile":"/sc2/en/profile/484607/1/NOMAdonminus/","urldivision":"/sc2/en/profile/484607/1/NOMAdonminus/ladder/85885#current-rank","rank":"7th","points":"603","apoints":466,"divisionname":"Goliath Iota","league":"master","bonus":"5","win":"48","loss":"39","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/484607/1/NOMAdonminus/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-484607\">\r\n\t\t\t\t\t\t\t\t\t\tNOMAdonminus\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-484607\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">NOMAdonminus</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 57<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"MoskoPwR","region":"eu","urlprofile":"/sc2/en/profile/699828/1/MoskoPwR/","urldivision":"/sc2/en/profile/699828/1/MoskoPwR/ladder/86616#current-rank","rank":"30th","points":"294","apoints":158,"divisionname":"Adun Kilo","league":"master","bonus":"6","win":"27","loss":"17","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/699828/1/MoskoPwR/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-699828\">\r\n\t\t\t\t\t\t\t\t\t\tMoskoPwR\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-699828\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">MoskoPwR</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 41<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Sublime","region":"eu","urlprofile":"/sc2/en/profile/908979/1/Sublime/","urldivision":"/sc2/en/profile/908979/1/Sublime/ladder/86404#current-rank","rank":"38th","points":"149","apoints":90,"divisionname":"Lockwell Quest","league":"diamond","bonus":"83","win":"39","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/908979/1/Sublime/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-908979\">\r\n\t\t\t\t\t\t\t\t\t\tSublime\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-908979\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Sublime</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 33<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"IMTheHell","region":"eu","urlprofile":"/sc2/en/profile/2342080/1/IMTheHell/","urldivision":"/sc2/en/profile/2342080/1/IMTheHell/ladder/85789#current-rank","rank":"76th","points":"48","apoints":8,"divisionname":"Hyperion Eta","league":"silver","bonus":"102","win":"8","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2342080/1/IMTheHell/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-2342080\">\r\n\t\t\t\t\t\t\t\t\t\tIMTheHell\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2342080\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">IMTheHell</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 83<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Jocularity","region":"eu","urlprofile":"/sc2/en/profile/2090346/1/Jocularity/","urldivision":"/sc2/en/profile/2090346/1/Jocularity/ladder/88765#current-rank","rank":"82nd","points":"14","apoints":1,"divisionname":"Marauder Alamo","league":"master","bonus":"129","win":"2","loss":"1","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 16/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2090346/1/Jocularity/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-2090346\">\r\n\t\t\t\t\t\t\t\t\t\tJocularity\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2090346\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Jocularity</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"iSneak","region":"eu","urlprofile":"/sc2/en/profile/1443049/1/iSneak/","urldivision":"/sc2/en/profile/1443049/1/iSneak/ladder/85913#current-rank","rank":"26th","points":"202","apoints":125,"divisionname":"Talematros Hawk","league":"diamond","bonus":"65","win":"17","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1443049/1/iSneak/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1443049\">\r\n\t\t\t\t\t\t\t\t\t\tiSneak\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1443049\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">iSneak</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 55<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"frozzz","region":"eu","urlprofile":"/sc2/en/profile/1711531/1/frozzz/","urldivision":"/sc2/en/profile/1711531/1/frozzz/ladder/87857#current-rank","rank":"65th","points":"46","apoints":24,"divisionname":"Kaloth Nu","league":"master","bonus":"120","win":"2","loss":"0","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 13/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1711531/1/frozzz/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1711531\">\r\n\t\t\t\t\t\t\t\t\t\tfrozzz\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1711531\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">frozzz</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"CZed","region":"eu","urlprofile":"/sc2/en/profile/1672153/1/CZed/","urldivision":"/sc2/en/profile/1672153/1/CZed/ladder/85964#current-rank","rank":"12th","points":"263","apoints":193,"divisionname":"Judicator Juliet","league":"silver","bonus":"72","win":"37","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1672153/1/CZed/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1672153\">\r\n\t\t\t\t\t\t\t\t\t\tCZed\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1672153\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">CZed</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 13<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"GunSlinger","region":"eu","urlprofile":"/sc2/en/profile/190424/1/GunSlinger/","urldivision":"/sc2/en/profile/190424/1/GunSlinger/ladder/89073#current-rank","rank":"2nd","points":"393","apoints":315,"divisionname":"Broodling Tau","league":"platinum","bonus":"64","win":"72","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 17/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/190424/1/GunSlinger/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-190424\">\r\n\t\t\t\t\t\t\t\t\t\tGunSlinger\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-190424\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">GunSlinger</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Starscream","region":"eu","urlprofile":"/sc2/en/profile/1022000/1/Starscream/","urldivision":"/sc2/en/profile/1022000/1/Starscream/ladder/87345#current-rank","rank":"54th","points":"98","apoints":-35,"divisionname":"Warp Prism Quest","league":"master","bonus":"9","win":"27","loss":"35","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1022000/1/Starscream/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-1022000\">\r\n\t\t\t\t\t\t\t\t\t\tStarscream\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1022000\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Starscream</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 79<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Warsfear","region":"eu","urlprofile":"/sc2/en/profile/1982510/1/Warsfear/","urldivision":"/sc2/en/profile/1982510/1/Warsfear/ladder/86034#current-rank","rank":"65th","points":"139","apoints":79,"divisionname":"Fole Rho","league":"master","bonus":"82","win":"12","loss":"9","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1982510/1/Warsfear/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-1982510\">\r\n\t\t\t\t\t\t\t\t\t\tWarsfear\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1982510\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Warsfear</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"udii","region":"eu","urlprofile":"/sc2/en/profile/263126/1/udii/","urldivision":"/sc2/en/profile/263126/1/udii/ladder/88150#current-rank","rank":"52nd","points":"47","apoints":15,"divisionname":"Argo Alamo","league":"gold","bonus":"110","win":"4","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 14/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/263126/1/udii/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-263126\">\r\n\t\t\t\t\t\t\t\t\t\tudii\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-263126\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">udii</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"NOMBlight","region":"eu","urlprofile":"/sc2/en/profile/2467726/1/NOMBlight/","urldivision":"/sc2/en/profile/2467726/1/NOMBlight/ladder/87067#current-rank","rank":"2nd","points":"704","apoints":571,"divisionname":"Kerrigan Tau","league":"master","bonus":"9","win":"52","loss":"49","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2467726/1/NOMBlight/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-2467726\">\r\n\t\t\t\t\t\t\t\t\t\tNOMBlight\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2467726\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">NOMBlight</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 5<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Polymeron","region":"eu","urlprofile":"/sc2/en/profile/2088266/1/Polymeron/","urldivision":"/sc2/en/profile/2088266/1/Polymeron/ladder/87744#current-rank","rank":"26th","points":"126","apoints":80,"divisionname":"Tosh Sigma","league":"platinum","bonus":"96","win":"3","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 13/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2088266/1/Polymeron/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-2088266\">\r\n\t\t\t\t\t\t\t\t\t\tPolymeron\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2088266\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Polymeron</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 34<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"ChoboTerran","region":"eu","urlprofile":"/sc2/en/profile/1594760/1/ChoboTerran/","urldivision":"/sc2/en/profile/1594760/1/ChoboTerran/ladder/86607#current-rank","rank":"48th","points":"165","apoints":104,"divisionname":"Queen Kilo","league":"diamond","bonus":"81","win":"18","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1594760/1/ChoboTerran/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-1594760\">\r\n\t\t\t\t\t\t\t\t\t\tChoboTerran\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1594760\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">ChoboTerran</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 29<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Blight","region":"eu","urlprofile":"/sc2/en/profile/287919/1/Blight/","urldivision":"/sc2/en/profile/287919/1/Blight/ladder/85733#current-rank","rank":"16th","points":"458","apoints":322,"divisionname":"Thor Gravity","league":"master","bonus":"6","win":"51","loss":"50","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/287919/1/Blight/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-287919\">\r\n\t\t\t\t\t\t\t\t\t\tBlight\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-287919\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Blight</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 22<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"lotp","region":"eu","urlprofile":"/sc2/en/profile/293595/1/lotp/","urldivision":"/sc2/en/profile/293595/1/lotp/ladder/85975#current-rank","rank":"57th","points":"178","apoints":65,"divisionname":"Shiloh Alamo","league":"master","bonus":"29","win":"19","loss":"17","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/293595/1/lotp/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-293595\">\r\n\t\t\t\t\t\t\t\t\t\tlotp\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-293595\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">lotp</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 64<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Evildildo","region":"eu","urlprofile":"/sc2/en/profile/801768/1/Evildildo/","urldivision":"/sc2/en/profile/801768/1/Evildildo/ladder/86330#current-rank","rank":"23rd","points":"193","apoints":168,"divisionname":"Brood Lord Sierra","league":"silver","bonus":"117","win":"25","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/801768/1/Evildildo/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-801768\">\r\n\t\t\t\t\t\t\t\t\t\tEvildildo\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-801768\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Evildildo</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Hitt","region":"eu","urlprofile":"/sc2/en/profile/1511436/1/Hitt/","urldivision":"/sc2/en/profile/1511436/1/Hitt/ladder/89316#current-rank","rank":"81st","points":"0","apoints":1,"divisionname":"Nahaan Pepper","league":"gold","bonus":"143","win":"0","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 19/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1511436/1/Hitt/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-1511436\">\r\n\t\t\t\t\t\t\t\t\t\tHitt\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1511436\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Hitt</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"qTp?TearAx","region":"eu","urlprofile":"/sc2/en/profile/1237347/1/qTp?TearAx/","urldivision":"/sc2/en/profile/1237347/1/qTp?TearAx/ladder/85719#current-rank","rank":"49th","points":"242","apoints":112,"divisionname":"Brood Lord Phi","league":"master","bonus":"12","win":"15","loss":"21","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1237347/1/qTp?TearAx/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-1237347\">\r\n\t\t\t\t\t\t\t\t\t\tqTp?TearAx\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1237347\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">qTp?TearAx</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 62<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Fish","region":"eu","urlprofile":"/sc2/en/profile/212603/1/Fish/","urldivision":"/sc2/en/profile/212603/1/Fish/ladder/86997#current-rank","rank":"67th","points":"29","apoints":-9,"divisionname":"Goliath Charlie","league":"platinum","bonus":"104","win":"7","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/212603/1/Fish/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-212603\">\r\n\t\t\t\t\t\t\t\t\t\tFish\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-212603\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Fish</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Packman","region":"eu","urlprofile":"/sc2/en/profile/1068238/1/Packman/","urldivision":"/sc2/en/profile/1068238/1/Packman/ladder/89576#current-rank","rank":"8th","points":"146","apoints":69,"divisionname":"Praetor Foxtrot","league":"silver","bonus":"65","win":"6","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 20/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1068238/1/Packman/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-1068238\">\r\n\t\t\t\t\t\t\t\t\t\tPackman\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1068238\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Packman</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Majadra","region":"eu","urlprofile":"/sc2/en/profile/604660/1/Majadra/","urldivision":"/sc2/en/profile/604660/1/Majadra/ladder/86125#current-rank","rank":"74th","points":"88","apoints":64,"divisionname":"Sentry Lima","league":"diamond","bonus":"118","win":"7","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/604660/1/Majadra/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-604660\">\r\n\t\t\t\t\t\t\t\t\t\tMajadra\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-604660\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Majadra</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"eSrDisturbed","region":"eu","urlprofile":"/sc2/en/profile/273089/1/eSrDisturbed/","urldivision":"/sc2/en/profile/273089/1/eSrDisturbed/ladder/85680#current-rank","rank":"15th","points":"538","apoints":414,"divisionname":"Scourge Xi","league":"master","bonus":"18","win":"71","loss":"79","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/273089/1/eSrDisturbed/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-273089\">\r\n\t\t\t\t\t\t\t\t\t\teSrDisturbed\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-273089\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">eSrDisturbed</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 10<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"PizzaBoy","region":"eu","urlprofile":"/sc2/en/profile/1391653/1/PizzaBoy/","urldivision":"/sc2/en/profile/1391653/1/PizzaBoy/ladder/89685#current-rank","rank":"97th","points":"0","apoints":1,"divisionname":"Hauler Alpha","league":"platinum","bonus":"143","win":"0","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 21/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1391653/1/PizzaBoy/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1391653\">\r\n\t\t\t\t\t\t\t\t\t\tPizzaBoy\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1391653\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">PizzaBoy</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"vor","region":"eu","urlprofile":"/sc2/en/profile/1552949/1/vor/","urldivision":"/sc2/en/profile/1552949/1/vor/ladder/86496#current-rank","rank":"12th","points":"215","apoints":138,"divisionname":"Urun Uncle","league":"gold","bonus":"65","win":"26","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1552949/1/vor/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1552949\">\r\n\t\t\t\t\t\t\t\t\t\tvor\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1552949\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">vor</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 9<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Hawk","region":"eu","urlprofile":"/sc2/en/profile/396702/1/Hawk/","urldivision":"/sc2/en/profile/396702/1/Hawk/ladder/86957#current-rank","rank":"24th","points":"198","apoints":122,"divisionname":"Overseer Nu","league":"gold","bonus":"66","win":"38","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/396702/1/Hawk/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-396702\">\r\n\t\t\t\t\t\t\t\t\t\tHawk\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-396702\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Hawk</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 43<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"foxypie","region":"eu","urlprofile":"/sc2/en/profile/1439049/1/foxypie/","urldivision":"/sc2/en/profile/1439049/1/foxypie/ladder/85699#current-rank","rank":"34th","points":"328","apoints":186,"divisionname":"Archon Echo","league":"master","bonus":0,"win":"84","loss":"73","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1439049/1/foxypie/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-1439049\">\r\n\t\t\t\t\t\t\t\t\t\tfoxypie\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1439049\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">foxypie</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 41<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"wrj","region":"eu","urlprofile":"/sc2/en/profile/556525/1/wrj/","urldivision":"/sc2/en/profile/556525/1/wrj/ladder/85680#current-rank","rank":"26th","points":"447","apoints":354,"divisionname":"Scourge Xi","league":"master","bonus":"49","win":"33","loss":"28","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/556525/1/wrj/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-556525\">\r\n\t\t\t\t\t\t\t\t\t\twrj\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-556525\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">wrj</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 14<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Fourleaf","region":"eu","urlprofile":"/sc2/en/profile/571798/1/Fourleaf/","urldivision":"/sc2/en/profile/571798/1/Fourleaf/ladder/87067#current-rank","rank":"87th","points":"14","apoints":0,"divisionname":"Kerrigan Tau","league":"master","bonus":"128","win":"2","loss":"3","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/571798/1/Fourleaf/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-571798\">\r\n\t\t\t\t\t\t\t\t\t\tFourleaf\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-571798\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Fourleaf</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"PwGlobEX","region":"eu","urlprofile":"/sc2/en/profile/1696889/1/PwGlobEX/","urldivision":"/sc2/en/profile/1696889/1/PwGlobEX/ladder/85774#current-rank","rank":"11th","points":"517","apoints":382,"divisionname":"Infestor Nu","league":"master","bonus":"7","win":"97","loss":"99","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1696889/1/PwGlobEX/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-1696889\">\r\n\t\t\t\t\t\t\t\t\t\tPwGlobEX\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1696889\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">PwGlobEX</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 12<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"MnM","region":"eu","urlprofile":"/sc2/en/profile/319033/1/MnM/","urldivision":"/sc2/en/profile/319033/1/MnM/ladder/86607#current-rank","rank":"75th","points":"97","apoints":82,"divisionname":"Queen Kilo","league":"diamond","bonus":"127","win":"9","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/319033/1/MnM/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-319033\">\r\n\t\t\t\t\t\t\t\t\t\tMnM\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-319033\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">MnM</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"NOMOmer","region":"us","urlprofile":"/sc2/en/profile/298847/1/NOMOmer/","urldivision":"","rank":"","points":"","apoints":"","divisionname":"","league":"master","bonus":"","win":"","loss":"","tdStatus":"","team":"","type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"MrPepo","region":"eu","urlprofile":"/sc2/en/profile/608311/1/MrPepo/","urldivision":"/sc2/en/profile/608311/1/MrPepo/ladder/87745#current-rank","rank":"77th","points":"0","apoints":-19,"divisionname":"Queen Victor","league":"diamond","bonus":"123","win":"3","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 13/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/608311/1/MrPepo/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-608311\">\r\n\t\t\t\t\t\t\t\t\t\tMrPepo\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-608311\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">MrPepo</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"GaMBa","region":"eu","urlprofile":"/sc2/en/profile/274879/1/GaMBa/","urldivision":"/sc2/en/profile/274879/1/GaMBa/ladder/87611#current-rank","rank":"2nd","points":"274","apoints":197,"divisionname":"Carrier Juliet","league":"platinum","bonus":"65","win":"29","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 13/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/274879/1/GaMBa/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-274879\">\r\n\t\t\t\t\t\t\t\t\t\tGaMBa\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-274879\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">GaMBa</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 6<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"JigiT","region":"eu","urlprofile":"/sc2/en/profile/937010/1/JigiT/","urldivision":"/sc2/en/profile/937010/1/JigiT/ladder/86194#current-rank","rank":"38th","points":"148","apoints":83,"divisionname":"Khas Sigma","league":"diamond","bonus":"77","win":"11","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/937010/1/JigiT/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-937010\">\r\n\t\t\t\t\t\t\t\t\t\tJigiT\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-937010\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">JigiT</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 68<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"eman","region":"eu","urlprofile":"/sc2/en/profile/1080403/1/eman/","urldivision":"/sc2/en/profile/1080403/1/eman/ladder/85719#current-rank","rank":"11th","points":"581","apoints":440,"divisionname":"Brood Lord Phi","league":"master","bonus":"1","win":"82","loss":"72","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1080403/1/eman/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-1080403\">\r\n\t\t\t\t\t\t\t\t\t\teman\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1080403\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">eman</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 15<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"CrimsoNuke","region":"eu","urlprofile":"/sc2/en/profile/723064/1/CrimsoNuke/","urldivision":"/sc2/en/profile/723064/1/CrimsoNuke/ladder/87579#current-rank","rank":"9th","points":"171","apoints":117,"divisionname":"Devourer Xi","league":"silver","bonus":"88","win":"12","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 13/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/723064/1/CrimsoNuke/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-723064\">\r\n\t\t\t\t\t\t\t\t\t\tCrimsoNuke\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-723064\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">CrimsoNuke</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"PwJabote","region":"eu","urlprofile":"/sc2/en/profile/1289184/1/PwJabote/","urldivision":"/sc2/en/profile/1289184/1/PwJabote/ladder/86885#current-rank","rank":"38th","points":"173","apoints":94,"divisionname":"Norad Alpha","league":"diamond","bonus":"63","win":"38","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1289184/1/PwJabote/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1289184\">\r\n\t\t\t\t\t\t\t\t\t\tPwJabote\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1289184\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">PwJabote</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 14<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"YosisoY","region":"eu","urlprofile":"/sc2/en/profile/1482935/1/YosisoY/","urldivision":"/sc2/en/profile/1482935/1/YosisoY/ladder/87585#current-rank","rank":"76th","points":"0","apoints":1,"divisionname":"Executor Sigma","league":"diamond","bonus":"143","win":"1","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 13/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/1482935/1/YosisoY/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-1482935\">\r\n\t\t\t\t\t\t\t\t\t\tYosisoY\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-1482935\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">YosisoY</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"GoRush","region":"eu","urlprofile":"/sc2/en/profile/2016068/1/GoRush/","urldivision":"/sc2/en/profile/2016068/1/GoRush/ladder/86352#current-rank","rank":"75th","points":"58","apoints":50,"divisionname":"Azimar Indigo ","league":"master","bonus":"134","win":"7","loss":"9","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2016068/1/GoRush/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-2016068\">\r\n\t\t\t\t\t\t\t\t\t\tGoRush\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2016068\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">GoRush</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"IOnlyAllin","region":"eu","urlprofile":"/sc2/en/profile/864698/1/IOnlyAllin/","urldivision":"/sc2/en/profile/864698/1/IOnlyAllin/ladder/87966#current-rank","rank":"8th","points":"331","apoints":256,"divisionname":"Braxis Sigma","league":"master","bonus":"67","win":"13","loss":"11","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 14/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/864698/1/IOnlyAllin/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-864698\">\r\n\t\t\t\t\t\t\t\t\t\tIOnlyAllin\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-864698\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">IOnlyAllin</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 12<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"KakiVarod","region":"eu","urlprofile":"/sc2/en/profile/2386956/1/KakiVarod/","urldivision":"/sc2/en/profile/2386956/1/KakiVarod/ladder/85859#current-rank","rank":"25th","points":"223","apoints":144,"divisionname":"Baneling Pepper","league":"platinum","bonus":"63","win":"22","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2386956/1/KakiVarod/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-2386956\">\r\n\t\t\t\t\t\t\t\t\t\tKakiVarod\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2386956\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">KakiVarod</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 35<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"regander","region":"eu","urlprofile":"/sc2/en/profile/2265432/1/regander/","urldivision":"/sc2/en/profile/2265432/1/regander/ladder/85738#current-rank","rank":"45th","points":"167","apoints":94,"divisionname":"Forge Pi","league":"diamond","bonus":"69","win":"16","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t--\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2265432/1/regander/\"\r\n\t class=\"race-protoss\"\r\n\t data-tooltip=\"#player-info-2265432\">\r\n\t\t\t\t\t\t\t\t\t\tregander\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2265432\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">regander</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 45<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Protoss\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Watsfordiner","region":"eu","urlprofile":"/sc2/en/profile/337006/1/Watsfordiner/","urldivision":"/sc2/en/profile/337006/1/Watsfordiner/ladder/87359#current-rank","rank":"31st","points":"149","apoints":86,"divisionname":"Zergling Pepper","league":"platinum","bonus":"79","win":"9","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 12/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-down.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/337006/1/Watsfordiner/\"\r\n\t class=\"race-zerg\"\r\n\t data-tooltip=\"#player-info-337006\">\r\n\t\t\t\t\t\t\t\t\t\tWatsfordiner\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-337006\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Watsfordiner</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 25<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Zerg\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"EnderTX","region":"eu","urlprofile":"/sc2/en/profile/581155/1/EnderTX/","urldivision":"/sc2/en/profile/581155/1/EnderTX/ladder/86294#current-rank","rank":"88th","points":"30","apoints":16,"divisionname":"Anselm Phi","league":"diamond","bonus":"128","win":"1","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/exclamation.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/581155/1/EnderTX/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-581155\">\r\n\t\t\t\t\t\t\t\t\t\tEnderTX\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-581155\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">EnderTX</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 0<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"JonyJ","region":"eu","urlprofile":"/sc2/en/profile/214815/1/JonyJ/","urldivision":"/sc2/en/profile/214815/1/JonyJ/ladder/87621#current-rank","rank":"43rd","points":"199","apoints":66,"divisionname":"Reaper Phi","league":"master","bonus":"9","win":"53","loss":"47","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 13/4/2012\">\r\n\t\r\n\t\t--\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/214815/1/JonyJ/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-214815\">\r\n\t\t\t\t\t\t\t\t\t\tJonyJ\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-214815\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">JonyJ</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 43<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"},{"name":"Nayro","region":"eu","urlprofile":"/sc2/en/profile/2380045/1/Nayro/","urldivision":"/sc2/en/profile/2380045/1/Nayro/ladder/86927#current-rank","rank":"31st","points":"168","apoints":90,"divisionname":"Muadun Pepper","league":"diamond","bonus":"64","win":"16","loss":"","tdStatus":"<td class=\"align-center\" style=\"width: 15px\" data-tooltip=\"Joined Division: 11/4/2012\">\r\n\t\r\n\t\t<img src=\"/sc2/static/images/icons/ladder/arrow-up.gif\" alt=\"\" />\r\n\t\t\t\t\t\t\t</td>","team":["<a href=\"/sc2/en/profile/2380045/1/Nayro/\"\r\n\t class=\"race-terran\"\r\n\t data-tooltip=\"#player-info-2380045\">\r\n\t\t\t\t\t\t\t\t\t\tNayro\r\n\t</a>\r\n\r\n\t\t\t\t\t\t\t\t\t<div id=\"player-info-2380045\" style=\"display: none\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"tooltip-title\">Nayro</div>\r\n\t\t\t\t\t\t\t\t\t\t<strong>Previous Rank:</strong> 34<br />\r\n\t\t\t\t\t\t\t\t\t\t<strong>Favorite Race:</strong> Terran\r\n\t\t\t\t\t\t\t\t\t</div>"],"type":1,"inUserOwnDivision":false,"urlapi":"http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost"}];
				}	
				playersAmount = fromLocalStorage.length;
				for (var j = 0; j < fromLocalStorage.length; j++)
					FR.dataBase.push(fromLocalStorage[j]);
			}
			
			FDTM.initialize('rlinks', numberToScan + playersAmount);
			
			var el3 = document.getElementById('bonus-pools');
			if (el3 == null) //no response from sc2ranks bonus pools api
			{
				var now = new Date();
				var seasonStartEU = new Date('Wed Jun 13 2012 05:34:54 GMT+0300');
				var calcedBPEU = Math.floor((now-seasonStartEU) / (1000 * 60 * 112));
				var seasonStartAM = new Date('Tue Jun 12 2012 14:34:54 GMT+0300');
				var calcedBPAM = Math.floor((now-seasonStartAM) / (1000 * 60 * 112));
				var seasonStartKR = new Date('Wed Jun 13 2012 21:34:16 GMT+0300');
				var calcedBPKR = Math.floor((now-seasonStartKR) / (1000 * 60 * 112));
				var seasonStartSEA = new Date('Mon Jun 11 2012 22:35:47 GMT+0300');
				var calcedBPSEA = Math.floor((now-seasonStartSEA) / (1000 * 60 * 112));				
				
				bonusPools.eu = 0+calcedBPEU;
				bonusPools.cn = 0+calcedBPEU; //to be added
				bonusPools.fea = 0+calcedBPKR;
				bonusPools.sea = 0+calcedBPSEA; //to be added
				bonusPools.am = 0+calcedBPAM;
			}
			else 
			{
				if (FR.whichBrowser() == 'Firefox') //firefox version
				{
					var temp = el3.getAttribute('value');
					var regex=/(\w{2,3}(?=\s))|(\d+)/g; //dear god...
					var result = [];
					result.push(temp.match(regex));
					for (var i=0; i < 20; i++) 
					{
						if (result[0][i]=='eu')
							bonusPools.eu = parseInt(result[0][i+1]);
						else if (result[0][i]=='cn')
							bonusPools.cn = parseInt(result[0][i+1]);
						else if (result[0][i]=='fea')
							bonusPools.fea = parseInt(result[0][i+1]);
						else if (result[0][i]=='sea')
							bonusPools.sea = parseInt(result[0][i+1]);
						else if (result[0][i]=='am')
							bonusPools.am = parseInt(result[0][i+1]);
					}
				}
				else
					bonusPools = JSON.parse(el3.getAttribute('value'));
			}
		}
		
		progress = '';
		//fea / eu / sea / am / cn used regions. fea is kr+taiwan
		//us / la / ru / tw / kr deprecated
		
		var lis = document.getElementById('profile-menu').getElementsByTagName('li');
		Common.makeActive(Lex.buttonFR, lis);
		
		var divProfileRight = document.getElementById('profile-right');
		divProfileRight.innerHTML = '';
		
		/*////////////////////////////////////////////////
		var divDataTitle = document.createElement('div');
		divDataTitle.setAttribute('class', 'data-title');
		
		var divDataLabel = document.createElement('div');
		divDataLabel.setAttribute('class', 'data-label');
		
		var divDataLabelH3 = document.createElement('h3');
		divDataLabelH3.setAttribute('class', 'title-user'); 
		
		divDataLabelH3.innerHTML = currentCustomDivisionName + ': ' + '<a href="'+currentCustomDivisionURL+'">'+currentCustomDivisionURL+'</a>'; //division header
		/////////////////////////////////////////////////*/
		
		//beginning of new ui
		var divUI = document.createElement('div');
		divUI.setAttribute('style', 'position: relative; width: 745px; background-color:#00213E;');
		
		var divTopRow = document.createElement('div');
		//divTopRow.setAttribute('class', 'data-title');
		divTopRow.setAttribute('style', 'width: 745px; height: 25px;');
		
		var divisionNameDropBox = document.createElement('select');
		divisionNameDropBox.setAttribute('id', 'division-drop-box');
		divisionNameDropBox.setAttribute('style', 'float:left; margin-top:4px;');
		for (var i = 0; i < customDivisionArr.length; i++)
		{
			var newOption = document.createElement('option');
			newOption.setAttribute('id', 'option' + i);
			var Text = document.createTextNode(customDivisionArr[i].name);
			newOption.appendChild(Text);
			divisionNameDropBox.appendChild(newOption);
			if (customDivisionArr[i].name == currentCustomDivisionName)
				divisionNameDropBox.selectedIndex = i;
		}
		
		var checkBox = [];
		var checkBoxImage = [];
		var checkBoxImageContainer = [];
		var bgs = ['/sc2/static/images/icons/league/grandmaster.png', '/sc2/static/images/icons/league/master.png', '/sc2/static/images/icons/league/diamond.png', '/sc2/static/images/icons/league/platinum.png', '/sc2/static/images/icons/league/gold.png', '/sc2/static/images/icons/league/silver.png', '/sc2/static/images/icons/league/bronze.png', '/sc2/static/images/icons/league/bronze.png'];		

		for (var i = 0; i < 7; i++)
		{
			checkBox[i] = document.createElement("input");
			checkBox[i].setAttribute('type', 'checkbox');
			checkBox[i].setAttribute('style', 'float:left;');
			checkBox[i].setAttribute('id', 'checkbox-'+i);
			checkBox[i].checked = checkBoxState[i];
			checkBoxImageContainer[i] = document.createElement('div');
			checkBoxImageContainer[i].setAttribute('id', i);
			checkBoxImageContainer[i].onclick=function(){ 
				if(checkBox[this.id].checked)
				{
					checkBox[this.id].checked = false;
					this.style.opacity=0.4;
				}
				else
				{
					checkBox[this.id].checked = true;
					this.style.opacity=1.0;
				}
			};
			//checkBoxImageContainer[i].setAttribute('style', 'background-image: url("'+bgs[i]+'"); background-position:-145px 0px; background-repeat:no-repeat; position: relative; overflow: hidden; cursor:pointer; width:25px; height:25px; float:left; opacity:1;');
			checkBoxImageContainer[i].setAttribute('style', 'position: relative; overflow: hidden; cursor:pointer; width:25px; height:25px; float:left; opacity:1; -webkit-user-select: none;  -khtml-user-select: none;   -moz-user-select: none; -o-user-select: none;    user-select: none; ');
			checkBoxImage[i] = document.createElement("img");
			checkBoxImage[i].src = bgs[i];
			checkBoxImage[i].setAttribute('style', 'position: absolute; left: -145px;');
			checkBoxImage[i].draggable = false; //prevent user from dragging icon and seeing full image (ugly)
			if (checkBox[i].checked)
				checkBoxImageContainer[i].style.opacity = 1.0;
			else
				checkBoxImageContainer[i].style.opacity = 0.4;
			checkBoxImageContainer[i].appendChild(checkBoxImage[i]);
		}
		
		var fetchBtn = document.createElement("input");
		fetchBtn.setAttribute('type', 'button');
		fetchBtn.setAttribute('value', 'Fetch Data');
		fetchBtn.setAttribute('style', 'margin-top:3px;');
		
		fetchBtn.onclick = function(){
		var index = document.getElementById('division-drop-box').selectedIndex;
		var oldIndex = -1;
		for (var i = 0; i < customDivisionArr.length; i++)
			if (customDivisionArr[i].name == currentCustomDivisionName)
			{
				oldIndex = i;
				break;
			}
		
		for (var i = 0; i < leagueNamesArr.length; i++)
			customDivisionArr[oldIndex].updated[leagueNamesArr[i]] = leaguesArr[leagueNamesArr[i]];
		
		localStorage['customDivisionArr'] = JSON.stringify(customDivisionArr);
		currentCustomDivisionName 	= customDivisionArr[index].name;
		currentCustomDivisionURLAPI = customDivisionArr[index].urlapi;
		currentCustomDivisionURL 	= customDivisionArr[index].url;
		if (oldIndex != index)
			for (var i = 0; i < leagueNamesArr.length; i++)
				leaguesArr[leagueNamesArr[i]] = customDivisionArr[index].updated[leagueNamesArr[i]];
		
		for (var i = 0; i < checkBox.length; i++)
		{
			if ((checkBox[i].checked) || (leaguesArr[leagueNamesArr[i]]))
				leaguesArr[leagueNamesArr[i]] = true;
			else
				leaguesArr[leagueNamesArr[i]] = false;
				
			checkBoxState[i] = checkBox[i].checked;
		}
		
		localStorage['customDivisionName'] 	 = currentCustomDivisionName;
		localStorage['customDivisionURLAPI'] = currentCustomDivisionURLAPI;
		localStorage['customDivisionURL'] 	 = currentCustomDivisionURL;
		hasNewData = true;

		FR.launch(showOwnDivision);
		};
		
		var displayAddNewDivisionElementsBtn = document.createElement("input");
		displayAddNewDivisionElementsBtn.setAttribute('type', 'button');
		displayAddNewDivisionElementsBtn.setAttribute('value', 'Add Division');
		displayAddNewDivisionElementsBtn.setAttribute('style', 'margin-top:3px;');
		displayAddNewDivisionElementsBtn.onclick = displayAddNewDivisionElementsFunc;
		
		function displayAddNewDivisionElementsFunc(){
		divUI.setAttribute('style', 'width: 100%; height: 90px; background-color:#00213E;');
		divUI.appendChild(divNewDivisionElements);
		this.parentNode.removeChild(this);
		};
		
		var removeBtn = document.createElement("input");
		removeBtn.setAttribute('type', 'button');
		removeBtn.setAttribute('value', 'Remove Division');
		removeBtn.setAttribute('style', 'float:right; margin-right:15px; margin-top: 3px;');
		removeBtn.onclick = removeSelected;

		function removeSelected(){ //remove division from list
			if (customDivisionArr.length == 1)
			{
				alert('Must keep at least 1 division');
				return;
			}
			if (divisionNameDropBox.selectedIndex > customDivisionArr.length + 1)
			{
				alert('error: selected option not found in storage');
				return;
			}
			var fromLocalStorage = JSON.parse(localStorage.getItem('dataBase'));
			var counter=0;
			for (var i = 0; i < fromLocalStorage.length; i++) //remove all users of said division from local storage
				if (fromLocalStorage[i].urlapi == currentCustomDivisionURLAPI)
				{
					counter++;
					fromLocalStorage.splice(i, 1);
					i--;
				}
			console.log('removed ' + counter + ' users from active users database.');
			localStorage['dataBase'] = JSON.stringify(fromLocalStorage);
			
			var historyDataArr = JSON.parse(localStorage.getItem('historyDataBase'));
			var counter=0;
			for (var i = 0; i < historyDataArr.length; i++) //remove all users of said division from local storage
				if (historyDataArr[i].urlapi == currentCustomDivisionURLAPI)
				{
					counter++;
					historyDataArr.splice(i, 1);
					i--;
				}
			console.log('removed ' + counter + ' users from graph database.');
			localStorage['historyDataBase'] = JSON.stringify(historyDataArr);
			
			var option = document.getElementById('option' + divisionNameDropBox.selectedIndex);
			customDivisionArr.splice(divisionNameDropBox.selectedIndex, 1);
			localStorage['customDivisionArr'] = JSON.stringify(customDivisionArr);
			option.parentNode.removeChild(option);
			localStorage['customDivisionName'] 	 = currentCustomDivisionName 	= customDivisionArr[0].name;
			localStorage['customDivisionURLAPI'] = currentCustomDivisionURLAPI  = customDivisionArr[0].urlapi;
			localStorage['customDivisionURL'] 	 = currentCustomDivisionURL 	= customDivisionArr[0].url;
			for (var i = 0; i < leagueNamesArr.length; i++)
				leaguesArr[leagueNamesArr[i]] = customDivisionArr[0].updated[leagueNamesArr[i]];
				
			hasNewData = false;
			for (var i = 0; i < leagueNamesArr.length; i++)
				if (leaguesArr[leagueNamesArr[i]])
				{
					hasNewData = true;
					break;
				}
			
			FR.launch(showOwnDivision);
		};
		
		divTopRow.appendChild(divisionNameDropBox);
		for (var i = 0; i < checkBox.length; i++)
		{
			//divTopRow.appendChild(checkBox[i]);
			divTopRow.appendChild(checkBoxImageContainer[i]);
		}
		divTopRow.appendChild(fetchBtn);
		divTopRow.appendChild(displayAddNewDivisionElementsBtn);
		divTopRow.appendChild(removeBtn);
		
		var divNewDivisionElements = document.createElement('div');
		divNewDivisionElements.setAttribute('style', 'width: 100%; height: 50px;');
		//divNewDivisionElements.setAttribute('class', 'data-table');
		
		var divNewDivisionTopRow = document.createElement('div');
		divNewDivisionTopRow.setAttribute('style', 'width: 100%; height: 25px;');
		var divNewDivisionBottomRow = document.createElement('div');
		divNewDivisionBottomRow.setAttribute('style', 'width: 100%; height: 25px;');
		
		var nameTextContainer = document.createElement('div');
		nameTextContainer.setAttribute('style','float:left; height:20px; padding-top:3px; margin-left:2px; width:82px;');
		var nameText = document.createTextNode('Division Name: ');
		nameTextContainer.appendChild(nameText);
		
		var nameInput = document.createElement("input");
		nameInput.setAttribute('style','float:left; width:220px;');
		nameInput.value = 'Custom Division Name';
		nameInput.id = 'nameInput';
		nameInput.onclick = selectAll;
		
		var link = document.createElement("a");
		link.setAttribute('style','float:left; height:20px; padding-top:3px; padding-left:3px;');
		link.setAttribute("href", "http://sc2ranks.com/custom_create");
		link.appendChild(document.createTextNode(" Create new SC2Ranks division"));
		
		var urlTextContainer = document.createElement('div');
		urlTextContainer.setAttribute('style','float:left; height:20px; padding-top:3px; margin-left:2px; width:82px;');
		var urlText = document.createTextNode('URL:');
		urlTextContainer.appendChild(urlText);
		
		var urlInput = document.createElement("input");
		urlInput.setAttribute('style','float:left; width:220px;');
		urlInput.value = 'http://sc2ranks.com/c/<number>/name/';
		urlInput.id = 'urlInput';
		urlInput.onclick = selectAll;
		
		var addNewDivisionBtn = document.createElement("input");
		addNewDivisionBtn.setAttribute('type', 'button');
		addNewDivisionBtn.setAttribute('value', 'Import SC2Ranks Division');
		addNewDivisionBtn.onclick = importSC2RanksDivision;
		
		function importSC2RanksDivision(){ //add new division
			var name = document.getElementById('nameInput').value;
			var url = document.getElementById('urlInput').value;
			if ((name == '') || (name == null))
			{
				alert('Please enter a name for your custom division');
				return;
			}
			if (name.length > 40)
			{
				alert('Maximum 40 characters allowed in Division Name');
				return;
			}
			if ((url == '') || (url == null))
			{
				alert('Please enter custom division url, such as http://sc2ranks.com/c/169/israel-division');
				return;
			}
			if (url.indexOf('http://sc2ranks.com/c/') != 0)
			{
				alert('url must match format: http://sc2ranks.com/c/<number>/name');
				return;
			}
			for (var i = 0; i < customDivisionArr.length; i++)
			{
				if (customDivisionArr[i].name == name)
				{
					alert('Name already exist. Please enter a unique name');
					return;
				}
				if (customDivisionArr[i].url == url)
				{
					alert('Custom division already exists');
					return;
				}
			}
			
			var iChars = "[]\\\';\"<>";

			for (var i = 0; i < url.length; i++) {
				if (iChars.indexOf(url.charAt(i)) != -1) {
					alert("Division URL can not contain " + url.charAt(i));
				return;
				}
			}
			
			for (var i = 0; i < name.length; i++) {
				if (iChars.indexOf(name.charAt(i)) != -1) {
					alert("Division name can not contain " + name.charAt(i));
				return;
				}
			}

			var regex = /\d+/g;
			var matches = url.match(regex);
			if ((matches == null) || (matches.length < 2) || (matches[1] == 'undefined'))
			{
				alert('url has to match format: http://sc2ranks.com/c/<number>/name/');
				return;
			}
			var urlapi = 'http://sc2ranks.com/api/clist/' + matches[1] + '/all/all/1/0.json?appKey=localhost';
			customDivisionArr.push({url:url, urlapi:urlapi, name:name, updated:{grandmaster:false, master:false, diamond:false, platinum:false, gold:false, silver:false, bronze:false}});
			localStorage['customDivisionArr'] = JSON.stringify(customDivisionArr);
			
			var newOption = document.createElement('option');
			newOption.setAttribute('id', 'option' + (customDivisionArr.length-1));
			var Text = document.createTextNode(name);
			newOption.appendChild(Text);
			divisionNameDropBox.appendChild(newOption);
			document.getElementById('reminder-text').style.visibility = 'visible';
		};

		var reminderTextContainer = document.createElement('div');
		//reminderTextContainer.setAttribute('style','float:left; height:20px; padding-top:3px; margin-left:2px;');
		reminderTextContainer.setAttribute('style','height:20px; padding-top:3px; margin-left:2px; visibility:hidden');
		reminderTextContainer.setAttribute('id', 'reminder-text');
		var reminderText = document.createTextNode('Refresh the page in order to display division.');
		reminderTextContainer.appendChild(reminderText);
		
		divNewDivisionTopRow.appendChild(nameTextContainer);
		divNewDivisionTopRow.appendChild(nameInput);
		divNewDivisionTopRow.appendChild(link)
		divNewDivisionBottomRow.appendChild(urlTextContainer);
		divNewDivisionBottomRow.appendChild(urlInput);
		divNewDivisionBottomRow.appendChild(addNewDivisionBtn);
		divNewDivisionBottomRow.appendChild(reminderTextContainer);
		
		divNewDivisionElements.appendChild(divNewDivisionTopRow);
		divNewDivisionElements.appendChild(divNewDivisionBottomRow);
		
		divUI.appendChild(divTopRow);
		if (!showOwnDivision) //only display options ui if viewing custom divisions
			divProfileRight.appendChild(divUI);
		//end of new ui
		
		function selectAll()
		{
			this.focus();
			this.select();
		}
		
		var divMatchHistory = document.createElement('div');
		divMatchHistory.setAttribute('id', 'match-history');
		
		//divMatchHistory.appendChild(divDropDown);

		// Global header and summary table
		var divDataTitle = document.createElement('div');
		divDataTitle.setAttribute('class', 'data-title');
		
		var divDataLabel = document.createElement('div');
		divDataLabel.setAttribute('class', 'data-label');
		
		var divDataLabelH3 = document.createElement('h3');
		divDataLabelH3.setAttribute('class', 'title-user');
		
		if (!showOwnDivision)
		{
			if(hasNewData)
				divDataLabelH3.innerHTML = currentCustomDivisionName + ': ' + '<a href="'+currentCustomDivisionURL+'">'+currentCustomDivisionURL+'</a>'; //division header
			else
				divDataLabelH3.innerHTML = 'Select Division and League, and press fetch data.';
		}
		else
			divDataLabelH3.innerHTML = 'Personal 1v1 Division';
		
		var divDataOptions = document.createElement('div');
		divDataOptions.setAttribute('class', 'data-options');
		divDataOptions.setAttribute('id', 'fr-options');
		divDataOptions.setAttribute('style', 'padding:6px 12px; visibility:hidden');
		//divDataOptions.innerHTML = '<a id="fr-option-filter-player" style="font-size:0.9em; padding:2px 4px;" href="javascript:void(0);" onclick="FR.filter(\'player\');">' + Lex.filterPlayerSome + '</a> | ';
		//divDataOptions.innerHTML += '<a id="fr-option-filter-0" style="font-size:1em; padding:2px 32px; margin:0 4px; border:1px solid #6EA6CA; background-color:#00509a;" class="active" onmouseover="this.style.borderColor=\'#C1FFFF\'" onmouseout="this.style.borderColor=\'#6EA6CA\'" href="javascript:void(0);" onclick="FR.filter(0);">' + Lex.filterType0 + '</a>';
		//divDataOptions.innerHTML += '<a id="fr-option-filter-1" style="font-size:1em; padding:2px 32px; margin:0 4px; border:1px solid #6EA6CA; background-color:#00213e;" onmouseover="this.style.borderColor=\'#C1FFFF\'" onmouseout="this.style.borderColor=\'#6EA6CA\'" href="javascript:void(0);" onclick="FR.filter(1);">' + Lex.filterType1 + '</a>';
		divDataOptions.innerHTML += '<a id="fr-option-filter-1" style="font-size:1em; padding:2px 32px; margin:0 4px; border:1px solid #6EA6CA; background-color:#00213e;" onmouseover="this.style.borderColor=\'#C1FFFF\'" onmouseout="this.style.borderColor=\'#6EA6CA\'" href="javascript:void(0);" onclick="">' + Lex.filterType1 + '</a>';
		/*divDataOptions.innerHTML += '<a id="fr-option-filter-2" style="font-size:1em; padding:2px 32px; margin:0 4px; border:1px solid #6EA6CA; background-color:#00213e;" onmouseover="this.style.borderColor=\'#C1FFFF\'" onmouseout="this.style.borderColor=\'#6EA6CA\'" href="javascript:void(0);" onclick="FR.filter(2);">' + Lex.filterType2 + '</a>';
		divDataOptions.innerHTML += '<a id="fr-option-filter-3" style="font-size:1em; padding:2px 32px; margin:0 4px; border:1px solid #6EA6CA; background-color:#00213e;" onmouseover="this.style.borderColor=\'#C1FFFF\'" onmouseout="this.style.borderColor=\'#6EA6CA\'" href="javascript:void(0);" onclick="FR.filter(3);">' + Lex.filterType3 + '</a>';
		divDataOptions.innerHTML += '<a id="fr-option-filter-4" style="font-size:1em; padding:2px 32px; margin:0 4px; border:1px solid #6EA6CA; background-color:#00213e;" onmouseover="this.style.borderColor=\'#C1FFFF\'" onmouseout="this.style.borderColor=\'#6EA6CA\'" href="javascript:void(0);" onclick="FR.filter(4);">' + Lex.filterType4 + '</a>';*/
		divDataLabel.appendChild(divDataLabelH3);
		divDataTitle.appendChild(divDataOptions);
		divDataTitle.appendChild(divDataLabel);
	
		var tableDataTable = document.createElement('table');
		tableDataTable.setAttribute('class', 'data-table');
		tableDataTable.setAttribute('id', 'FR-table');
		
		var trSpacer = tableDataTable.insertRow(-1);
		var tdSpacer = trSpacer.insertCell(-1);
		tdSpacer.setAttribute('align', 'left');
		tdSpacer.setAttribute('style', 'padding: 14px 14px 14px 32px;');
		
		if ((hasNewData) || (showOwnDivision))
		{
			if (!showOwnDivision)
				tdSpacer.innerHTML = Lex.statusGetProfiles;
			else
				tdSpacer.innerHTML = '';
			tdSpacer.innerHTML += ' <span id="fr-progress" style="color: #C1FFFF;"> </span>';
		}
		
		divMatchHistory.appendChild(divDataTitle);
		divMatchHistory.appendChild(tableDataTable);
		
		var bgs = ['/sc2/static/images/icons/league/grandmaster.png', '/sc2/static/images/icons/league/master.png', '/sc2/static/images/icons/league/diamond.png', '/sc2/static/images/icons/league/platinum.png', '/sc2/static/images/icons/league/gold.png', '/sc2/static/images/icons/league/silver.png', '/sc2/static/images/icons/league/bronze.png', '/sc2/static/images/icons/league/bronze.png'];
		for (var i = 0; i < leagueNamesArr.length; i++) {
			if ((showOwnDivision) && (leagueNamesArr[i] != myLeague))
				continue;
			if ((!showOwnDivision) && (hasNewData)) //display all leagues that we have data for, and only them
			{
				if (!leaguesArr[leagueNamesArr[i]])
					continue;
			}
			
			var divDataTitle = document.createElement('div');
			divDataTitle.setAttribute('class', 'data-title');

			var divDataLabel = document.createElement('div');
			divDataLabel.setAttribute('class', 'data-label');
			divDataLabel.style.padding = '0';
			
			var divDataLabelH3 = document.createElement('h3');
			divDataLabelH3.setAttribute('class', 'title-trophy');
			divDataLabelH3.style.background = "url('" + bgs[i] + "') no-repeat scroll -145px 5px transparent";
			divDataLabelH3.style.padding = '9px 0 9px 30px';
			divDataLabelH3.innerHTML = Common.ucfirst(leagueNamesArr[i]);
	
			var divDataOptions = document.createElement('div');
			divDataOptions.setAttribute('class', 'data-options');
			divDataOptions.setAttribute('id', 'fr-options-' + i);
			divDataOptions.setAttribute('style', 'padding:6px 12px; visibility:hidden');
			/*divDataOptions.innerHTML += '<a id="fr-option-type" style="font-size:0.9em; padding:2px 4px;" href="javascript:void(0);" onclick="FR.sortBy(\'type\', ' + i + ');">' + Lex.sortByType + '</a> | ';
			//divDataOptions.innerHTML += '<a id="fr-option-team" style="font-size:0.9em; padding:2px 4px;" href="javascript:void(0);" onclick="FR.sortBy(\'team\', ' + i + ');">' + Lex.sortByTeam + '</a> | ';
			divDataOptions.innerHTML += '<a id="fr-option-points" style="font-size:0.9em; padding:2px 4px;" href="javascript:void(0);" onclick="FR.sortBy(\'points\', ' + i + ');">' + Lex.sortByPoints + '</a> | ';
			divDataOptions.innerHTML += '<a id="fr-option-apoints" style="font-size:0.9em; padding:2px 4px;" href="javascript:void(0);" onclick="FR.sortBy(\'apoints\', ' + i + ');">' + Lex.sortByAPoints + '</a> | ';
			divDataOptions.innerHTML += '<a id="fr-option-bonus" style="font-size:0.9em; padding:2px 4px;" href="javascript:void(0);" onclick="FR.sortBy(\'bonus\', ' + i + ');">' + Lex.sortByBonus + '</a> | ';
			divDataOptions.innerHTML += '<a id="fr-option-wins" style="font-size:0.9em; padding:2px 4px" href="javascript:void(0);" onclick="FR.sortBy(\'wins\', ' + i + ');">' + Lex.sortByWins + '</a> | ';
			divDataOptions.innerHTML += '<a id="fr-option-ratio" style="font-size:0.9em; padding:2px 4px" href="javascript:void(0);" onclick="FR.sortBy(\'ratio\', ' + i + ');">' + Lex.sortByRatio + '</a> | ';
			divDataOptions.innerHTML += '<a id="fr-option-rank" style="font-size:0.9em; padding:2px 4px;" href="javascript:void(0);" onclick="FR.sortBy(\'rank\', ' + i + ');">' + Lex.sortByRank + '</a>';*/
			
			divDataLabel.appendChild(divDataLabelH3);
			divDataLabel.appendChild(divDataLabelH3);
			divDataTitle.appendChild(divDataOptions);
			divDataTitle.appendChild(divDataLabel);
	
			var tableDataTable = document.createElement('table');
			tableDataTable.setAttribute('class', 'data-table');
			tableDataTable.setAttribute('id', 'FR-table-' + i);
			
			var trSpacer = tableDataTable.insertRow(-1);
			var tdSpacer = trSpacer.insertCell(-1);
			tdSpacer.setAttribute('align', 'left');
			tdSpacer.setAttribute('style', 'padding: 14px 14px 14px 32px;');
			tdSpacer.innerHTML = ' ';
			
			divMatchHistory.appendChild(divDataTitle);
			divMatchHistory.appendChild(tableDataTable);
		}
				
		divProfileRight.appendChild(divMatchHistory);
		
		if ((!hasNewData) && (!showOwnDivision)) //only query division if pressed fetch button
			return;
		
		//if (league == null)
		//	return;
		
		setTimeout(function() { FD.getList('FR', showOwnDivision); }, 100);
		return;
	}
		
});








/**
 * Friends Popular Object
 */
contentEval(function() {
	FP.dataType = [];
	FP.dataMap = [];

	FP.prepareType = function() {
		if (FP.dataType.length > 0) {
			// FP.dataType has already been created, no need to re-create it.
			return;
		}

		// Populate hash
		for (var i = 0; i < FD.matches.length; i++) {
			var win = (FD.matches[i].result == 'win') ? 1 : 0;
			var loss = (FD.matches[i].result == 'loss') ? 1 : 0;
			var left = (FD.matches[i].result == 'bailer') ? 1 : 0;
			//var observer = (FD.matches[i].result == 'observer') ? 1 : 0;
			var other = (win || loss || left) ? 0 : 1;
			
			// Find index of FP.dataType
			var found = false;
			for (j = 0; j < FP.dataType.length; j++) {
				if (FP.dataType[j].type == FD.matches[i].type) {
					found = true;
					break;
				}
			}
			if (found === false) {
				FP.dataType.push({type:FD.matches[i].type, win:win, loss:loss, left:left, other:other, total:1});
			}
			else {
				FP.dataType[j].win += win;
				FP.dataType[j].loss += loss;
				//FP.dataType[j].observer += observer;
				FP.dataType[j].left += left;
				FP.dataType[j].other += other;
				FP.dataType[j].total++;
			}
		}
		
		// Sort hash
		FP.dataType.sort(Common.sortByType);
		return;
	}

	FP.prepareMap = function() {
		if (FP.dataMap.length > 0) {
			// FP.dataMap has already been created, no need to re-create it.
			return;
		}

		// Populate hash
		for (var i = 0; i < FD.matches.length; i++) {
			// FD.matches.push({fid:FD.matchesThreadIndex3, map:map, type:type, result:result, points:points, date:date, sdate:sdate});
			var win = (FD.matches[i].result == 'win') ? 1 : 0;
			var loss = (FD.matches[i].result == 'loss') ? 1 : 0;
			var left = (FD.matches[i].result == 'bailer') ? 1 : 0;
			//var observer = (FD.matches[i].result == 'Observer') ? 1 : 0;
			var other = (win || loss || left) ? 0 : 1;
			var type = FD.matches[i].type;
			
			// Find index of FP.dataType
			var found = false;
			for (j = 0; j < FP.dataMap.length; j++) {
				if (FP.dataMap[j].map == FD.matches[i].map) {
					found = true;
					break;
				}
			}
			if (found === false) {
				FP.dataMap.push({map:FD.matches[i].map, type:[type], win:win, loss:loss, left:left, other:other, total:1});
			}
			else {
				FP.dataMap[j].win += win;
				FP.dataMap[j].loss += loss;
				//FP.dataMap[j].observer += observer;
				FP.dataMap[j].left += left;
				FP.dataMap[j].other += other;
				FP.dataMap[j].total++;
				
				// Check if FD.matches.type is different from FP.dataMap.type
				if (!Common.inArray(FD.matches[i].type, FP.dataMap[j].type)) {
					FP.dataMap[j].type.push(type);
					FP.dataMap[j].type.sort();
				}
			}
		}
				
		// Sort hash
		FP.dataMap.sort(Common.sortByTotal);
		return;
	}
	
	FP.displayType = function() {
		// Clear table
		var table = document.getElementById('FP-table-types');
		Common.clearTable(table);
		
		// Create header row
		var thead = table.createTHead()
		var tr = thead.insertRow(-1);
		var th1 = tr.insertCell(-1);
		var th2 = tr.insertCell(-1);
		var th3 = tr.insertCell(-1);
		var th4 = tr.insertCell(-1);
		var th5 = tr.insertCell(-1);
		var th6 = tr.insertCell(-1);
		var th7 = tr.insertCell(-1);
		var th8 = tr.insertCell(-1);

		th1.innerHTML = '';
		th1.setAttribute('style', 'width:15px;');

		th2.innerHTML = Lex.headerType;
		th2.setAttribute('style', 'color: #C1FFFF; padding: 14px; width: 180px;');

		th3.innerHTML = Lex.headerWins;
		th3.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th3.setAttribute('class', 'align-left');

		th4.innerHTML = Lex.headerLosses;
		th4.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th4.setAttribute('class', 'align-left');

		th5.innerHTML = Lex.headerLeft;
		th5.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th5.setAttribute('class', 'align-left');
		
		th6.innerHTML = Lex.headerObs;
		th6.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th6.setAttribute('class', 'align-left');
		
		th7.innerHTML = Lex.headerTotal;
		th7.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th7.setAttribute('class', 'align-right');

		th8.innerHTML = '%';
		th8.setAttribute('style', 'color: #C1FFFF; padding: 14px 28px 14px 14px;');
		th8.setAttribute('class', 'align-right');

		// Add data rows
		for (var i = 0; i < FP.dataType.length; i++) {
			var tr = table.insertRow(-1);
			tr.setAttribute('class', 'match-row');
			tr.setAttribute('onmouseover', 'javascript:this.setAttribute("style", "background:#000a19")');
			tr.setAttribute('onmouseout', 'javascript:this.setAttribute("style", "")');
			var td1 = tr.insertCell(-1);
			var td2 = tr.insertCell(-1);
			var td3 = tr.insertCell(-1);
			var td4 = tr.insertCell(-1);
			var td5 = tr.insertCell(-1);
			var td6 = tr.insertCell(-1);
			var td7 = tr.insertCell(-1);
			var td8 = tr.insertCell(-1);

			var percent = Math.round(FP.dataType[i].total / FD.matches.length * 100);
			var tooltip = '<img src="/sc2/static/images/icons/ladder/view-more.gif" alt="+"/>';
			tooltip += '<div id="fp-type-' + i + '" style="display:none">';
			tooltip += '<strong>' + percent + '%</strong> of all matches';
			tooltip += '</div>';
			
			td1.innerHTML = tooltip;
			td1.setAttribute('style', 'width:15px;');
			td1.setAttribute('data-tooltip', '#fp-type-' + i);
			
			//td2.innerHTML = FP.dataType[i].type;
			td2.innerHTML = i;
			td2.setAttribute('style', 'padding: 14px; width: 180px;');

			td3.innerHTML = '<span class="match-win">' + FP.dataType[i].win + '</span>';
			td3.setAttribute('style', 'padding: 14px;');
			td3.setAttribute('class', 'align-left');

			td4.innerHTML = '<span class="match-loss">' + FP.dataType[i].loss + '</span>';
			td4.setAttribute('style', 'padding: 14px;');
			td4.setAttribute('class', 'align-left');

			td5.innerHTML = '<span class="match-bailer">' + FP.dataType[i].left + '</span>';
			td5.setAttribute('style', 'padding: 14px;');
			td5.setAttribute('class', 'align-left');

			td6.innerHTML = '<span class="match-watcher">' + FP.dataType[i].other + '</span>';
			td6.setAttribute('style', 'padding: 14px;');
			td6.setAttribute('class', 'align-left');

			td7.innerHTML = FP.dataType[i].total;
			td7.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
			td7.setAttribute('class', 'align-right');

			td8.innerHTML = '' + percent + '%';
			td8.setAttribute('style', 'padding: 14px 28px 14px 14px;');
			td8.setAttribute('class', 'align-right');
		}

		return;
	}

	FP.displayMap = function() {
		// Clear table
		var table = document.getElementById('FP-table-maps');
		Common.clearTable(table);
		
		// Create header row
		var thead = table.createTHead()
		var tr = thead.insertRow(-1);
		var th1 = tr.insertCell(-1);
		var th2 = tr.insertCell(-1);
		var th3 = tr.insertCell(-1);
		var th4 = tr.insertCell(-1);
		var th5 = tr.insertCell(-1);
		var th6 = tr.insertCell(-1);
		var th7 = tr.insertCell(-1);

		th1.innerHTML = ' ';
		th1.setAttribute('style', 'width:15px;');

		th2.innerHTML = Lex.headerMap;
		th2.setAttribute('style', 'color: #C1FFFF; padding: 14px; width: 200px;');

		th3.innerHTML = Lex.headerWins;
		th3.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th3.setAttribute('class', 'align-left');

		th4.innerHTML = Lex.headerLosses;
		th4.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th4.setAttribute('class', 'align-left');

		th5.innerHTML = Lex.headerLeft;
		th5.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th5.setAttribute('class', 'align-left');

		th6.innerHTML = Lex.headerObs;
		th6.setAttribute('style', 'color: #C1FFFF; padding: 14px;');
		th6.setAttribute('class', 'align-left');
		
		th7.innerHTML = Lex.headerTotal;
		th7.setAttribute('style', 'color: #C1FFFF; padding: 14px 32px 14px 14px;');
		th7.setAttribute('class', 'align-right');

		// Add data rows
		for (var i = 0; i < FP.dataMap.length; i++) {
			var tr = table.insertRow(-1);
			var trc = 'fr-row-0';
			// Rather than include all types in trc, use a hierarchy based on what users typically search for. 
			trc += Common.inArray(Lex.filterType1, FP.dataMap[i].type) ? ' fr-row-1' :
			       Common.inArray(Lex.filterType2, FP.dataMap[i].type) ? ' fr-row-2' :
			       Common.inArray(Lex.filterType3, FP.dataMap[i].type) ? ' fr-row-3' :
			       Common.inArray(Lex.filterType4, FP.dataMap[i].type) ? ' fr-row-4' :
			       Common.inArray(Lex.filterType5, FP.dataMap[i].type) ? ' fr-row-5' : '';
			/*
			for (var j = 0; j < FP.dataMap[i].type.length; j++) {
				trc += FP.dataMap[i].type[j] == '1v1'    ? ' fr-row-1' :
				       FP.dataMap[i].type[j] == '2v2'    ? ' fr-row-2' :
				       FP.dataMap[i].type[j] == '3v3'    ? ' fr-row-3' :
				       FP.dataMap[i].type[j] == '4v4'    ? ' fr-row-4' :
				       FP.dataMap[i].type[j] == 'Custom' ? ' fr-row-5' : '';
			}
			*/
			tr.setAttribute('class', 'match-row ' + trc);
			tr.setAttribute('onmouseover', 'javascript:this.setAttribute("style", "background:#000a19")');
			tr.setAttribute('onmouseout', 'javascript:this.setAttribute("style", "")');
			var td1 = tr.insertCell(-1);
			var td2 = tr.insertCell(-1);
			var td3 = tr.insertCell(-1);
			var td4 = tr.insertCell(-1);
			var td5 = tr.insertCell(-1);
			var td6 = tr.insertCell(-1);
			var td7 = tr.insertCell(-1);

			var tooltip = '<img src="/sc2/static/images/icons/ladder/view-more.gif" alt="+"/>';
			tooltip += '<div id="fp-map-' + i + '" style="display:none">';
			tooltip += '<strong>Types:</strong> ' + FP.dataMap[i].type.join(', ');
			tooltip += '</div>';

			td1.innerHTML = tooltip;
			td1.setAttribute('style', 'width:15px;');
			td1.setAttribute('data-tooltip', '#fp-map-' + i);

			td2.innerHTML = FP.dataMap[i].map;
			td2.setAttribute('style', 'padding: 14px; width: 200px;');
			
			td3.innerHTML = '<span class="match-win">' + FP.dataMap[i].win + '</span>';
			td3.setAttribute('style', 'padding: 14px;');
			td3.setAttribute('class', 'align-left');

			td4.innerHTML = '<span class="match-loss">' + FP.dataMap[i].loss + '</span>';
			td4.setAttribute('style', 'padding: 14px;');
			td4.setAttribute('class', 'align-left');

			td5.innerHTML = '<span class="match-bailer">' + FP.dataMap[i].left + '</span>';
			td5.setAttribute('style', 'padding: 14px;');
			td5.setAttribute('class', 'align-left');

			td6.innerHTML = '<span class="match-watcher">' + FP.dataMap[i].other + '</span>';
			td6.setAttribute('style', 'padding: 14px;');
			td6.setAttribute('class', 'align-left');

			td7.innerHTML = FP.dataMap[i].total;
			td7.setAttribute('style', 'color: #C1FFFF; padding: 14px 32px 14px 14px;');
			td7.setAttribute('class', 'align-right');
		}

		document.getElementById('fp-options-map').setAttribute('style', 'padding:6px 12px; visibility:visible');
		return;
	}

	FP.filterStyle = function(option) {
		for (var i = 0; i <= 5; i++) {
			var e = document.getElementById('fp-option-filter-' + i);
			e.style.backgroundColor = (i == option) ? '#00509a' : '#00213e';
		}
		return;
	}
	
	FP.filter = function(option) {
		var option = typeof option != 'undefined' ? option : 0;

		// Mark active class
		var els = document.getElementById('fp-options-map').getElementsByTagName('a');
		for (var i = 0; i < els.length; i++) {
			if (i == option) {
				els[i].setAttribute('class', 'active');
			}
			else {
				els[i].setAttribute('class', '');
			}
		}
		
		// Filter rows
		var trs = document.getElementById('FP-table-maps').getElementsByClassName('match-row');
		if (trs == null) {
			return;
		}
		for (var i = 0; i < trs.length; i++) {
			if (trs[i].getAttribute('class').indexOf('fr-row-' + option) < 0) {
				trs[i].setAttribute('style', 'display:none');
			}
			else {
				trs[i].setAttribute('style', '');
			}
		}
			
		FP.filterStyle(option);
		return;
	}
	
	FP.launch= function() {
		if (FD.isLocked()) {
			return;
		}
		var lis = document.getElementById('profile-menu').getElementsByTagName('li');
		Common.makeActive(Lex.buttonFP, lis);

		var divProfileRight = document.getElementById('profile-right');
		divProfileRight.innerHTML = '';
		
		var divMatchHistory = document.createElement('div');
		divMatchHistory.setAttribute('id', 'match-history');

		// Popular game types
		var divDataTitle = document.createElement('div');
		divDataTitle.setAttribute('class', 'data-title');
		
		var divDataLabel = document.createElement('div');
		divDataLabel.setAttribute('class', 'data-label');
		
		var divDataLabelH3 = document.createElement('h3');
		divDataLabelH3.setAttribute('class', 'title-globe');
		divDataLabelH3.innerHTML = Lex.tableFP1;

		divDataLabel.appendChild(divDataLabelH3);
		divDataTitle.appendChild(divDataLabel);

		var tableDataTable = document.createElement('table');
		tableDataTable.setAttribute('class', 'data-table');
		tableDataTable.setAttribute('id', 'FP-table-types');
		
		var trSpacer = tableDataTable.insertRow(-1);
		var tdSpacer = trSpacer.insertCell(-1);
		tdSpacer.setAttribute('align', 'left');
		tdSpacer.setAttribute('style', 'padding: 14px 14px 14px 32px;');
		tdSpacer.innerHTML = Lex.statusGetFriends;
		tdSpacer.innerHTML += ' <span id="fmh-progress" style="color: #C1FFFF;"> </span>';
		
		divMatchHistory.appendChild(divDataTitle);
		divMatchHistory.appendChild(tableDataTable);

		// Popular maps
		var divDataTitle = document.createElement('div');
		divDataTitle.setAttribute('class', 'data-title');
		
		var divDataLabel = document.createElement('div');
		divDataLabel.setAttribute('class', 'data-label');
		
		var divDataLabelH3 = document.createElement('h3');
		divDataLabelH3.setAttribute('class', 'title-globe');
		divDataLabelH3.innerHTML = Lex.tableFP2;

		var divDataOptions = document.createElement('div');
		divDataOptions.setAttribute('class', 'data-options');
		divDataOptions.setAttribute('id', 'fp-options-map');
		divDataOptions.setAttribute('style', 'padding:6px 12px; visibility:hidden');
		divDataOptions.innerHTML += '<a id="fp-option-filter-0" style="font-size:1em; padding:2px 24px; margin:0 4px; border:1px solid #6EA6CA; background-color:#00509a;" class="active" onmouseover="this.style.borderColor=\'#C1FFFF\'" onmouseout="this.style.borderColor=\'#6EA6CA\'" href="javascript:void(0);" onclick="FP.filter(0);">' + Lex.filterType0 + '</a>';
		divDataOptions.innerHTML += '<a id="fp-option-filter-1" style="font-size:1em; padding:2px 24px; margin:0 4px; border:1px solid #6EA6CA; background-color:#00213e;" onmouseover="this.style.borderColor=\'#C1FFFF\'" onmouseout="this.style.borderColor=\'#6EA6CA\'" href="javascript:void(0);" onclick="FP.filter(1);">' + Lex.filterType1 + '</a>';
		divDataOptions.innerHTML += '<a id="fp-option-filter-2" style="font-size:1em; padding:2px 24px; margin:0 4px; border:1px solid #6EA6CA; background-color:#00213e;" onmouseover="this.style.borderColor=\'#C1FFFF\'" onmouseout="this.style.borderColor=\'#6EA6CA\'" href="javascript:void(0);" onclick="FP.filter(2);">' + Lex.filterType2 + '</a>';
		divDataOptions.innerHTML += '<a id="fp-option-filter-3" style="font-size:1em; padding:2px 24px; margin:0 4px; border:1px solid #6EA6CA; background-color:#00213e;" onmouseover="this.style.borderColor=\'#C1FFFF\'" onmouseout="this.style.borderColor=\'#6EA6CA\'" href="javascript:void(0);" onclick="FP.filter(3);">' + Lex.filterType3 + '</a>';
		divDataOptions.innerHTML += '<a id="fp-option-filter-4" style="font-size:1em; padding:2px 24px; margin:0 4px; border:1px solid #6EA6CA; background-color:#00213e;" onmouseover="this.style.borderColor=\'#C1FFFF\'" onmouseout="this.style.borderColor=\'#6EA6CA\'" href="javascript:void(0);" onclick="FP.filter(4);">' + Lex.filterType4 + '</a>';
		divDataOptions.innerHTML += '<a id="fp-option-filter-5" style="font-size:1em; padding:2px 24px; margin:0 4px; border:1px solid #6EA6CA; background-color:#00213e;" onmouseover="this.style.borderColor=\'#C1FFFF\'" onmouseout="this.style.borderColor=\'#6EA6CA\'" href="javascript:void(0);" onclick="FP.filter(5);">' + Lex.filterType5 + '</a>';


		divDataLabel.appendChild(divDataLabelH3);
		divDataTitle.appendChild(divDataOptions);
		divDataTitle.appendChild(divDataLabel);

		var tableDataTable = document.createElement('table');
		tableDataTable.setAttribute('class', 'data-table');
		tableDataTable.setAttribute('id', 'FP-table-maps');
		
		var trSpacer = tableDataTable.insertRow(-1);
		var tdSpacer = trSpacer.insertCell(-1);
		tdSpacer.setAttribute('align', 'left');
		tdSpacer.setAttribute('style', 'padding: 14px 14px 14px 32px;');
		tdSpacer.innerHTML = '';
		
		divMatchHistory.appendChild(divDataTitle);
		divMatchHistory.appendChild(tableDataTable);
		
		divProfileRight.appendChild(divMatchHistory);

		setTimeout(function() { FD.getList('FP'); }, 100);
		return;
	}

});

/*****************************************************
 * Main
 * (1) Determine which type of bnet page we are on.
 * (2) Add buttons to the left panel based on current page.
 */
 
if (document.URL.toString().indexOf("eu.battle.net") != -1)
	myRegion = 'eu';
else if (document.URL.toString().indexOf("us.battle.net") != -1)
	myRegion = 'us';
else if (document.URL.toString().indexOf("sea.battle.net") != -1)
	myRegion = 'sea';
else if (document.URL.toString().indexOf("kr.battle.net") != -1)
	myRegion = 'kr';
else if (document.URL.toString().indexOf("tw.battle.net") != -1)
	myRegion = 'tw';
else if (document.URL.toString().indexOf("cn.battle.net") != -1)
	myRegion = 'cn';
else
	myRegion = 'eu';
	
	
// Get language
var Lex = new Object();
var a = document.getElementById('logo').getElementsByTagName('a')[0].getAttribute('href');
Lex.locale = (a.split('/').length == 4) ? a.split('/')[2] : 'en';
	
// Local (Sandboxed) Lex
switch (Lex.locale) {
	case 'en':
	case 'de':  // Anyone want to help translate deutsche?
	case 'es':  // Anyone want to help translate espanol?
	case 'it':  // Anyone want to help translate italiano?
	case 'ru':  // Anyone want to help translate russian?
	case 'ko':  // Anyone want to help translate korean?
	case 'zh':  // Anyone want to help translate chinese?
	default:
		Lex.buttonMHS  	= 'Match History Stats';
		Lex.buttonFMH  	= 'Friends Match History';
		Lex.buttonFMHS 	= 'Friends Match Stats';
		Lex.buttonFR   	= 'SC2Ranks Divisions';
		Lex.buttonFRA	= 'Custom Divisions Full';
		Lex.buttonFUD	= 'Personal 1 v 1 Division';
		Lex.buttonFP   	= 'Friends Popular';
		break;
	//case 'fr':  // Anyone want to help translate francais?
	//	Lex.buttonMHS  = 'Historique Stats';
	//	Lex.buttonFMH  = 'Amis Historique Des Matchs';
	//	Lex.buttonFMHS = 'Amis Historique Stats';
	//	Lex.buttonFR   = 'Amis Rangs';
	//	Lex.buttonFP   = 'Amis Populaire';
	//	break;
}

// Determine which page we are on
var onProfilePage = false;
var onProfilePageRoot = false;
var onProfilePageOwn = false;

var menu = document.getElementById('profile-menu');
if (menu != null) {
	onProfilePage = true;
	var profileLink = menu.getElementsByTagName('li');
	if (profileLink !=  null) {
		var profileSpan = profileLink[0].getElementsByTagName('span');
		if (profileSpan.length == 0) {
			onProfilePageRoot = true;
			a = profileLink[profileLink.length - 1].getElementsByTagName('a')[0];
			if (a != null && a.getAttribute('href').indexOf('friends') >= 0) {
				onProfilePageOwn = true;
			}
		}
		else {
			// On sub-profile page
		}
	}
	else {
		// Something went wrong
	}
}

// Add buttons to left profile menu
if (onProfilePageRoot) {

	var liMatchHistoryStats = document.createElement('li');
	liMatchHistoryStats.innerHTML = '<a href="javascript:void(0)" onclick="MHS.launch();" style="padding-left:25px;">' + Lex.buttonMHS + '</a>';
	menu.insertBefore(liMatchHistoryStats, menu.getElementsByTagName('li')[3]);

	var liUserDivision = document.createElement('li');
	liUserDivision.innerHTML = '<a href="javascript:void(0)" onclick="FR.launch(true);" style="padding-left:10px;">' + Lex.buttonFUD + '</a>';
	menu.appendChild(liUserDivision);
	
	var liFriendsRank = document.createElement('li');	
	liFriendsRank.innerHTML = '<a href="javascript:void(0)" onclick="FR.launch(false);" style="padding-left:10px;">' + Lex.buttonFR + '</a>';
	menu.appendChild(liFriendsRank);
	
	var Data = document.createElement('li');
	Data.innerHTML = '<a href="javascript:void(0)" onclick="FR.Graph();" style="padding-left:10px;">Points History Graph</a>';
	menu.appendChild(Data);
	
	var MMRCalc = document.createElement('li');
	MMRCalc.innerHTML = '<a href="javascript:void(0)" onclick="FR.MMRCalc();" style="padding-left:10px;">MMR Calculator</a>';
	menu.appendChild(MMRCalc);

	/*	var localStorage = window.localStorage;
		localStorage.setItem('foo', 'bar');
		var foo = localStorage.getItem('foo');
		alert(foo); // bar
		//alert(window.locaStorage);*/
		//alert(localStorage);
		
		//FR.dataBase = JSON.parse(localStorage.getItem('dataBase'));
		//alert('FR.dataBase after = ');
		//alert(FR.dataBase);
		//localStorage.clear();
		//return;
		//alert('localStorage[version] before = ' + localStorage['version']);
		//alert(localStorage);
		//localStorage.removeItem('version');//remove an element by key
		//alert('localStorage[version] after = ' + localStorage['version']);
		//alert('localStorage = ' + localStorage);
		//localStorage.clear();//remove all elements	
		
		//var leaguesArr = {grandmaster:false, master:false, diamond:false, platinum:false, gold:false, silver:false, bronze:false};
		var customDivisionArr = [];
		customDivisionArr = JSON.parse(localStorage.getItem('customDivisionArr'));
		if ((customDivisionArr == null) || (customDivisionArr.length == 0))
		{
			if (myRegion == 'eu')
				customDivisionArr = [{	url:'http://sc2ranks.com/c/169/israel-division', 
									urlapi:'http://sc2ranks.com/api/clist/169/all/all/1/0.json?appKey=localhost',
									name:'Israeli Custom Division',
									updated:{grandmaster:false, master:false, diamond:false, platinum:false, gold:false, silver:false, bronze:false}}];
			else if (myRegion == 'us')
				customDivisionArr = [{	url:'http://sc2ranks.com/c/12336/american-pros/', 
									urlapi:'http://sc2ranks.com/api/clist/12336/all/all/1/0.json?appKey=localhost',
									name:'American Pros',
									updated:{grandmaster:false, master:false, diamond:false, platinum:false, gold:false, silver:false, bronze:false}}];
			else if (myRegion == 'kr' || myRegion == 'tw')
				customDivisionArr = [{	url:'http://sc2ranks.com/c/12337/korean-pros/', 
									urlapi:'http://sc2ranks.com/api/clist/12337/all/all/1/0.json?appKey=localhost',
									name:'Korean Pros',
									updated:{grandmaster:false, master:false, diamond:false, platinum:false, gold:false, silver:false, bronze:false}}];
			else if (myRegion == 'sea')
				customDivisionArr = [{	url:'http://sc2ranks.com/c/12394/sea-pros/', 
									urlapi:'http://sc2ranks.com/api/clist/12394/all/all/1/0.json?appKey=localhost',
									name:'SEA Pros',
									updated:{grandmaster:false, master:false, diamond:false, platinum:false, gold:false, silver:false, bronze:false}}];
			
			localStorage['customDivisionURLAPI'] = customDivisionArr[0].urlapi;
			localStorage['customDivisionURL'] = customDivisionArr[0].url;
			localStorage['customDivisionName'] = customDivisionArr[0].name;
			localStorage['customDivisionArr'] = JSON.stringify(customDivisionArr);
		}
		if (localStorage['customDivisionURLAPI'] == null)
			localStorage['customDivisionURLAPI'] = customDivisionArr[0].urlapi;
		if (localStorage['customDivisionURL'] == null)
			localStorage['customDivisionURL'] = customDivisionArr[0].url;
		if (localStorage['customDivisionName'] == null)
			localStorage['customDivisionName'] = customDivisionArr[0].name;
			
		var currentCustomDivisionName = localStorage['customDivisionName'];
		var currentCustomDivisionURLAPI = localStorage['customDivisionURLAPI'];
		var currentCustomDivisionURL = localStorage['customDivisionURL'];
	
	SVC.showInfo();
	try {
		SVC.getInfo();
	}
	catch(err) {
		alert('fetch error ' + err);
    }
}
