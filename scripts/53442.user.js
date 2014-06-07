// ==UserScript==
// @name				Warfish Interface Enhancements
// @namespace		Warfish
// @description	Various user interface additions or modifications.
// @include			http://warfish.net*
// @version			1.2.1
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @resource      iKill http://img524.imageshack.us/img524/9564/historyiconsword.gif
// @resource      iDeath http://img524.imageshack.us/img524/7961/historyiconskull.gif
// @resource      iLuck http://img524.imageshack.us/img524/2893/historyiconclover.gif
// ==/UserScript==
var start = new Date().getTime();

// ================================================================================================================
// ~~ Global variables are bad, but we have a few. Image references and version.
// ================================================================================================================
var version = 121;
var iTableSortNull = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACJSURBVHjaYty6dSsDcQAggFiA2MvLi6C6bdu2AQQQEwPRACCAUJQ2Njbi4QIEEE5TIeqQVQMEEBMedWhsgABiwaq0vr4eogjCgACAACLBWwABxIJmC4SBbBgcAAQQE7KNmGxkABBATGgqcKkDAoAAYgBG7H8iAFAZQACR4C2AAGKBxC8xSgECDADHhkeD%2By9HzwAAAABJRU5ErkJggg%3D%3D';
var iMessageBlurbLineLeft = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAWCAYAAAA8VJfMAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHBSURBVHjaYvz%2F%2Fz8DCJw9e5YfSG0BYhsG3OAOEH8E4g5jY%2BM1DGQCgABihFkKtZgTSK0DYg8C%2Bp4CsSrQ4u%2FkWAoQQEzIHKgh%2FkBMyBfSQJxPrk8BAgjFp0g%2BZgZSM4E4GY%2FeL0CsAXToU1ItBQggJmyCQIP%2BAnEKkDkRj14eIG4nx6cAAYTVp2i%2BrgNSjTik%2FwKxCdCBF0ixFCCAmAgpABrYBKQKcEiDomEyqT4FCCAmYhQBLQYFcwrUZ%2BjABhgaIaRYChBABIMXLahBhi8FYjYs%2BVcb6LhfxJgDEEBMpLgQWiCAshR6%2FlQB4iJizQEIIJJ8iuRjG2jpxY%2BWhZSADntNSD9AADGRk%2BSBBh8BUs5A%2FBotCzUSox8ggMjyKZKP1YHUXmgJRXQWAgggJgYKANDwm0DKCojvI2WhXkL6AAKIIkuhFj%2BCWnwZKuQEDAFvfHoAAoii4EULaiEgtR2IzQhlIYAAYmKgEgBa8A6auPZBs1AOLrUAAUQ1n6LVySugjQFVqGNQAEAAMTFQGUDr5FAg3gHELdjUAAQQA8intMJnzpyZBsTq6OIAAUR1n6L5OgtISaCLAwQQ1eOUGAAQYABrb87KKZsSUAAAAABJRU5ErkJggg%3D%3D';
var iMessageBlurbLineRight = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAWCAYAAAA8VJfMAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGcSURBVHjaYvz%2F%2Fz8DueDs2bMhQKoCiPmBWAWP0iNA7GNsbPwRxAEIIEZyLQVayAmkbgOxNAGlO4A4CGjhd5gAQAAxMZAP8omwcA0Q%2ByNbCAIAAUSWT4G%2BBFl2A4h58CibC8TpQAv%2FoksABBALmb5sJ2DhRKBlBbgkAQKIZJ8CfWkApM4AMTMOJfVAC5vwmQEQQOT4dDIeCwuAFk4kZABAALGQkUVssEj9hcbfXGLMAQggooMXaCEbkLqKJT%2F%2BAuJooIVriHU8QACR4tMiLBZ%2Bh%2BbBHaSEGEAAEeVToC9FgdQ9tBT7EVrKHCE1UQAEELE%2BbUSz8DUQewItPEtOfgMIIII%2BxZJFngKxM9DCm%2BQWZQABRIxPe5EsvA%2FEDkALH1FQfDIABBATAV96AyknKPcyEFtRaiEIAAQQzuBFyyKnoHH4joEKACCA8Pk0B2rhPmgcUsVCEAAIIKw%2BBfpSCFpXgrJDBHrVRCkACCBcPm2BVr6h1LYQBAACiAWLL9VBNNCyaAYaAYAAwuZTCaCFWQw0BAABxEhJw4xcABBgAJnseenzgYdtAAAAAElFTkSuQmCC';
var iMessagePost = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAA7CAIAAAAB77YJAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANHSURBVHjaYvzw5RcDlQBAADFS0SyAAKKmWQABRE2zAAKImmYBBBA1zQIIICxmHdi%2FF5lrYGgkICBIjFkAAYTFLAEeNiDp4OgcEBickJRCvLsAAgi7WRMmTSPJFAgACCAsZhnoqickEjaooKgUTQQggHD6ET8AhsCGzdvRBAECiImBegAggKhpFkAAUdMsgABiwRQCJqiGplY8ej58%2BPDg%2Fj1McYAAwmLWhfPngAgzmggCgADCGY9A1wFTRkBQMJGJHggAAojYPPThw3ugY4FcBQUlBUVFrGYBBBAWPz64fx%2BoE%2BpGAUGgWRP6uif09cAFceUKgABiALoLDUFCCmg5MDUCuVjjASKFhgACCItZQM1Atzx48hLIxkzcEADM9pgaAQIIi1lAdRcu3wQygMbhChqgOKZGgADCliYunIMYkRAbBQw7ZCmIk4HpKyE2ElMjQABhcRfIlKQUoB40lcAgR3Y7pkaAAMLiLmDcLZg3B7OEgccdpiwEAAQQFndhxjewhIFIAUMQEstAz2JqBAggLGYBAx45rQMNAhpx4PAJoClwcSAbUyNAAGGvh4DJEuIRBUUlYNCg5QR4GkYTBAggfHUa0MQN69Yi5wH82RMggLD4ETlcMJ2DNaQgCCCAGLAahOl%2BZACMHKxmAQQQ9jxEsHjBmh8BAgiLWcQUWFjTKkAAsWAtvMDRL4DpU0jpDCzIDuzfh2kBQACxYKtESwgW0AG%2BnpiCAAHEghlT4GLvA1Z3QWqDBw%2FuQ8pYNAAQQFjCC1c5QzC8AAIIS%2F1ITGMCaxkNEEDY0yrQWjwGIRc%2ByAgggBhwJWJgKsNMHEDvL1i8HJcWgAAikB%2BBcQ%2BvooFRASwz8LgXIIDwlRMb1q8FltFgI5yAAUQwDQMEEHazHGwt0GIdaCIw3%2BA3DiCAsMQjsGbFTD5AkYa6avzuAgggLGZhzR%2Bg%2FLxuLX6zAAKItDYm0Jt4gh8ggJiw10OLl0PqbTgCmoK%2FUAMCgADCVqcJCgDTwQKM1hrQDmDMwoMSM%2F8DBBA129EAAUTN9ipAAFHTLIAAoqZZAAGEJewhjRn82tDaPxAAEEDU7D8CBBA1zQIIIGqaBRBA1DQLIICoaRZAAFHTLIAAAwDVTFBFhYkwqgAAAABJRU5ErkJggg%3D%3D';
var iMenuClose = "data:image/gif;base64,R0lGODlhDQAMAIAAACJEmdTm%2FCH5BAAAAAAALAAAAAANAAwAAAIgDI4JFu1v1oFzRmft1Tou%2FDXIw0lhdn5VKJrQaypJUAAAOw%3D%3D";
var iMenuRefresh = "data:image/gif;base64,R0lGODlhDAAMAOZLAB0iL8zS4MTL2xQYIN7i621%2Bp9TZ5bK70MbN3AsNET1JZHCBqdre6BMWHsXM3A8SGLO80TE6UGF0oISTtd3h6h8lMq64zmBzn8vR33GCqbvD1s%2FV4tnd6KiyylpslTpFX0xbfXSEq3mJrkNQb9jc54CPsgwOEzdBWmJ0oKKtx4aUtlRki9DV4s7U4TdCWz9LaFJihzQ%2BVkRRcJCdvHaGrMHI2T5KZoiWt5ShvhwhLiYtPi43S9PY5Nvf6Wd5o6y2zZOgvr%2FG2F9xnTtGYX%2BOsqawyYWTtYGQszE7Uau1zMnP3tTm%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEsALAAAAAAMAAwAAAdtgEuCg4SECD4KEUNEhR00KklJNzsvByZLAkcpGzwMFCRIOg8BQBYsPYNISDkJB4WDHg0DPwUSRq9KEDUFMB8jhRMoS0I2J0UYgyUrOAQgMzIxIhpJFxUZSgRLAQgLLgADACFBBoUcLUoCDuRLgQA7";
var iMenuLoading = "data:image/gif;base64,R0lGODlhEAAQAPQAAP%2F%2F%2FyJEmfj5%2B1Jtr5SkzSdIm0JfqNvg7rO%2F2zVUoYiax3qOwefq86Wz1c3U52B4tWyCuwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla%2BKIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK%2Bo2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC%2B0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU%2FNXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK%2BkCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm%2F4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg%2BboUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC%2BRAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA%3D%3D"
var iGraphBackground = "data:image/gif;base64,R0lGODlhyQABAIAAAAAAAP%2F%2F%2FyH5BAAAAAAALAAAAADJAAEAAAIURI6paevanozS0Qrxu%2Frw%2FmkhBhQAOw%3D%3D";
var iGraphGreenBar = "data:image/gif;base64,R0lGODlhAQAGAKIAAB%2B9HwC0AIDagLPps%2BD24EvKTAAAAAAAACH5BAAAAAAALAAAAAABAAYAAAMEGFAylAA7";
var iGraphRedBar   = "data:image/gif;base64,R0lGODlhAQAGAKIAAL1EH%2BnAs%2Fbl4NqVgMpqS7QqAAAAAAAAACH5BAAAAAAALAAAAAABAAYAAAMEWEATkgA7";
var iGraphBlackBar = "data:image/gif;base64,R0lGODlhAQAGAKIAAIqKiuvr687OzlpaWm5ubq2trQAAAAAAACH5BAAAAAAALAAAAAABAAYAAAMEOAQlkQA7";
var iOneBlackPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP%2F%2F%2FyH5BAAAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D";

// ================================================================================================================
// ~~ Main execution routine.  Initialize user, set default preferences, load menu commands, run per-page code.
// ================================================================================================================
if ( PlayerInitialize() ) {
	var when = new Date().getTime();
	var where = location.href;
	var who = GM_getValue("~profileid");

	if( !GM_getValue('~version') ) { GM_setValue('~version',version); }
	if( !GM_getValue('~newversionavailable') ) { GM_setValue('~newversionavailable',false); }
	if( !GM_getValue(who+'.gamenames') ) { GM_setValue(who+'.gamenames','({})'); }
	if( !GM_getValue(who+'.lastupdate') ) { GM_setValue(who+'.lastupdate',when+''); }
	if( !GM_getValue(who+'.preferences') ) { GM_setValue(who+'.preferences','({})'); }
	if( !GM_getValue(who+'.friendslist') ) { GM_setValue(who+'.friendslist','({})'); }
	if( !GM_getValue(who+'.friendcategories') ) { GM_setValue(who+'.friendcategories','["Blood Brother","Friend","Enemy","Arch Nemesis"]'); }
	if( !GM_getValue(who+'.friendcolors') ) { GM_setValue(who+'.friendcolors','["#6AFF6A","#C4FFC4","#FFC4C4","#FF6A6A"]'); }

	GM_registerMenuCommand('Interface: Show latest update information.', WF_ShowUpdateInfo);
	GM_registerMenuCommand('Interface: Restore last message.', WF_RestoreMessage);
	CSSInsertDOM();
	MessageAreaModify();
	if ( where.indexOf('/intab/') == -1 ){
		LinksAddStatic();
		LinksAddPerGame(false,5,6);
		if (/gid=(\d+)/.exec(where)){ var gameid = RegExp.$1;
			LinksAddPerGame(gameid,1,5);
			UIToggleReplace(gameid);
		}
	}
	if ( /\/play\/$|\/play\/\?|\/gamelist$|\/gamelist\?/.exec(where) ){  GameListModify(); }
	if ( /war\/compete/.exec(where) ){  TournamentListModify(); } //needs restricted like gamelistmodify
	if ( !/design/.exec(where) ){  GameNamePrefill(); }
	if ( /gid=(\d+)&t=m&cid=\d+$/.exec(where) ){  WF_CaptureGameInfo(RegExp.$1,MapDetailsReformat); }
	if ( /gamehistory/.exec(where) ){  HistoryLogReformat(); }
	if ( /userprofile\?pid=.+?&t=d/.exec(where) ){  AdjustedWinPercentageAdd(); }
	if ( /\/browse\/$|\/directory$/.exec(where) ){  FavoriteBoardsLinkAdd(); }
	if ( /war\/browse\/board\?bid=(\d+)$/.exec(where) ){  FullMapPreviewAdd(RegExp.$1); }
	if ( /userprofile\?pid=(.+?\d{14})$/.exec(where) ){  FriendsHighlightProfile(RegExp.$1); }
	if ( /tournamentdetails\?tid=\d+$|tournamentdetails\?tid=\d+&o=t$/.exec(where) ){  FriendsHighlightJoinTourny(); }
	if ( /\/compete\/createtournament$/.exec(where) ){  FriendsHighlightCreateTourny(); }
	if ( /war\/play\/creategame/.exec(where) ){  FriendsHighlightCreateGame(); }
	if ( /settings\/quickpick/.exec(where) ){  FriendsHighlightQuickPicks(); }
	if ( /game\?gid=(\d+)$/.exec(where) ){
		WF_CaptureGameName(RegExp.$1);
		GM_registerMenuCommand('Interface: Clear Saved Game Information.', PrefGameInfoDeleteSingle);
		GM_registerMenuCommand('Interface: Clear Saved Game Name.', PrefGameNameDeleteSingle);
	}
	if ( /tournament\?tid=\d+$/.exec(where) ) {  
		FriendsHighlightTournamentBracket();
		LinksAddPerGame(false,6,7);
	}
	
	// Check for new updates and clean old preferences every day.
	if ( (when-parseInt(GM_getValue(who+'.lastupdate'))) > 86400000 ) {
		WF_UpdateCheck();
		// Disabled automatic cleaning until I can fix it.
		// PrefNonactiveRemove();
	}
	
	// If script version has changed: save new version, reset newversion flag, show new info.
	if ( GM_getValue('~version') != version ) {
		GM_setValue('~version',version);
		GM_setValue('~newversionavailable',false);
		WF_ShowUpdateInfo();
	}
}
function PlayerInitialize(){
	if ( /\/war\/login/.exec(location.href) ) { GM_setValue("~authenticated",false); return false; } // Not logged in.
	if ( GM_getValue('~authenticated') ) { return true; } // Already logged in.
	var req = new XMLHttpRequest();
		req.open('GET','http://warfish.net/war/settings/account',false);
		req.send(null);
		if (req.status == 200) {
			$('body').append('<rsp>'+req.responseText+'</rsp>');
			var pid = /pid=(.+?\d{14})$/.exec($('a[href]:contains("View your profile")').attr('href'))[1];
			GM_setValue('~authenticated',true);
			GM_setValue('~profileid',pid);
			GM_setValue('~profilename',escape($('input[name="dispname"]').val()));
			return true;
		}
		return false;
}

// ================================================================================================================
// ~~ Non-DOM manipulation functions or user triggered Menu Commands.
// ================================================================================================================
function PrefGameNameDeleteSingle(){
	var gameid = /game\?gid=(\d+)$/.exec(where)[1];
	var G = eval(GM_getValue(who+'.gamenames'));
	if ( G[gameid] !== undefined ){ delete G[gameid]; }
	GM_setValue(who+'.gamenames',G.toSource());
	alert('Game Name Reset');
}
function PrefGameInfoDeleteSingle(){
	var prefkey = who + '.' + /game\?gid=(\d+)$/.exec(where)[1] + '.info';
	GM_deleteValue(prefkey);
	alert('Game Information Reset');
}
function PrefNonactiveRemove(){
	$('body') 
		.append('<rsp id="cleaner">')
		.children('#cleaner')
		.load('http://warfish.net/war/play/?f=1&pp=100 a[href*="game?gid="]',function(){
			var gameids = [];
			var preferences = GM_listValues();
			var G = eval(GM_getValue(who+'.gamenames'));

			// Grab all of the current gameids from the 100 Active Games table.
			$('rsp[id="cleaner"] a').each(function(i){
				gameids.push( /gid=(\d+)/.exec($(this).attr('href'))[1] );
			});
			
			// This is sometimes deleting the wrong stuff.
			// Call in main execution routine disabled until fixed.
			if ( GM_getValue('~authenticated') ) {
				for ( var i=0; i < preferences.length; i++ ){
					var regexp = new RegExp( who +'\\.(\\d+)\\.info' );
					if ( regexp.exec( preferences[i] ) ){ if ( gameids.indexOf(RegExp.$1) == -1 ) { GM_deleteValue(preferences[i]); } }
				}
				for ( var gameid in G ){ if ( gameids.indexOf(gameid) == -1 ) { delete G[gameid]; } }
				GM_setValue(who+'.gamenames',G.toSource());
			}
		});
}
function WF_RestoreMessage(){
	if(GM_getValue('messagebackup')){ $('#WFtext').val(GM_getValue('messagebackup')); }
}
function WF_ShowUpdateInfo(){
	var html = '<p>Changes to this script since the last version are detailed in the forum post: ' +
		'<p><a href="http://forums.warfish.net/viewtopic.php?f=7&t=680&p=9434#p9434">Warfish Addons - Bug Reports and Feature Requests</a>' + 
		'<p>Please check out the forums if you haven\'t already!';
	WF_AddDisplayDiv(411,'New in this version:');
	$('#WFmenuContent411').html(html);
	$('.WFmenuContainer').not('#WFmenuContainer411').hide();
	$('#WFmenuContainer411').toggle();
}
function WF_UpdateCheck(){
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://userscripts.org/scripts/source/53442.meta.js",
		onload: function(rsp){
			GM_setValue(who+'.lastupdate',when+'');
			var latestversion = parseInt(/@version\s+(\d\.\d\.\d)/.exec(rsp.responseText)[1].split('.').join(''));
			if ( latestversion > version ) GM_setValue('~newversionavailable',true);
		}
	});
}

// ================================================================================================================
// ~~ Functions for the menu links across the top of the page.
// ================================================================================================================
function LinksAddStatic(){
	var html = '<span id="WFlinks">';
	if ( GM_getValue('~newversionavailable') ){
		html += '&nbsp;&nbsp;&nbsp;<span style="background-color:#FF6A6A;" class="WFlink">'+
			'<a href="http://userscripts.org/scripts/source/53442.user.js">Update Available!!</a></span>';
	}
	html += '&nbsp;&nbsp;&nbsp;<span class="WFlink"><a href="http://warfish.net/war/help/feedback">Feedback</a></span>' +
		'<span class="WFlink"><a href="http://wiki.warfish.net/wiki/Main_Page">Wiki</a></span>' +
		'<span class="WFlink"><a href="http://forums.warfish.net/">Forums</a></span>' +
		'<span class="WFlink"><a href="http://warfish.net/war/browse/userprofile?pid='+who+'">Profile</a></span></span>';
	$1('//table[@id="header"]/tbody/tr/td[2]',document).innerHTML = html;
}
function LinksAddPerGame(gameid,start,end){
	var L = [
		['Status','Current Board Status',LinksDisplayStatus],
		['Rules','Game Rules',LinksDisplayRules],
		['History','History Stats',LinksDisplayHistory],
		['About','About',LinksDisplayAbout],
		['Friends','Friends Console',LinksDisplayFriends],
		['Show Bootables','Games with bootable players:',TournamentFindBootables]
	];
	for ( var i = start; i < end ; i++ ) {
		$('<span class="WFlink">'+L[i-1][0]+'</span>')
			.appendTo('#WFlinks')
			.click(function (i){ return function(){
				$('.WFmenuContainer').not('#WFmenuContainer'+i).hide();
				$('#WFmenuContainer'+i).toggle();
			}}(i))
			.one("click",function (i,L){ return function(){
				$('body').append(
					'<div id="WFmenuContainer'+i+'" class="WFHidden WFmenuContainer">'+
						'<div id="WFmenuTop'+i+'" class="WFmenuTop">'+
							'<div id="WFmenuTitle'+i+'" class="WFmenuTitle">'+L[i-1][1]+'</div>'+
							'<div id="WFmenuClose'+i+'" class="WFmenuClose"><img src="'+iMenuClose+'"></div>'+
							'<div id="WFmenuRefresh'+i+'" class="WFmenuRefresh"><img src="'+iMenuRefresh+'"></div>'+
						'</div>'+
						'<div id="WFmenuBottom'+i+'" class="WFmenuBottom">'+
							'<div id="WFmenuContent'+i+'" class="WFmenuContent"><img src="'+iMenuLoading+'"> Loading...</div>'+
						'</div>'+
					'</div>'
				);
				$('#WFmenuClose'+i).click(function (){ $('#WFmenuContainer'+i).fadeOut("normal"); });
				$('#WFmenuRefresh'+i).click(function (i,L){ return function(){ WF_CaptureGameInfo(gameid,L[i-1][2]); }}(i,L));
				$('#WFmenuContainer'+i).toggle();
				WF_CaptureGameInfo(gameid,L[i-1][2]);
			}}(i,L));
	}
}
function LinksDisplayAbout(gameid,info){
	$('#WFmenuContent4').load('http://warfish.net/war/play/gamedetails?t=a&gid='+gameid+' table[width="480"][cellpadding="10"]');
}
function LinksDisplayStatus(gameid,info){

	// Fog info
	// 'No fog' RULES.fog = 0
	// 'Foggy' RULES.fog = 1
	// 'Extremely foggy' RULES.fog = 3
	// 'Moderately foggy' RULES.fog = 4
	// 'Light fog' RULES.fog = 5
	
	$('#WFmenuContent1').html('Loading...');
	var stateurl = 'http://warfish.net/war/services/rest?_method=warfish.tables.getState&_format=json&sections=players,cards,board&gid='+gameid;
	var detailsurl = 'http://warfish.net/war/services/rest?_method=warfish.tables.getDetails&_format=json&sections=continents,rules&gid='+gameid;
	$.getJSON(stateurl,function(getstate){
		if ( !getstate['_content']['board'] ) {
			$('#WFmenuContent1').html("Game hasn't started yet.");
			return false;
		}
		$.getJSON(detailsurl,function(getdetails){
			var P = new Object();
			var T = new Array();
			var RULES = getdetails['_content']['rules'];
			
			var PLAYERS = getstate['_content']['players']['_content']['player'];
			$(PLAYERS).each(function(i){
				PLAYERS[i].armies = 0;
				PLAYERS[i].countries = 0;
				PLAYERS[i].cards = 0;
				PLAYERS[i].totalbonus = 0;
				PLAYERS[i].bonuscountry = 0;
				PLAYERS[i].bonuscontinent = 0;
			});
			
			var CARDS = getstate['_content']['cards']['_content']['player'];
			if ( CARDS ) {
				$(CARDS).each(function(i){
					PLAYERS[CARDS[i].id].cards = CARDS[i].num;
				});
			}
			
			var AREAS = getstate['_content']['board']['_content']['area'];
			$(AREAS).each(function(i){
				if ( (AREAS[i].playerid != '?') && AREAS[i].playerid != -1 && AREAS[i].playerid != ''){ // not fogged, not neutral, not empty
					PLAYERS[AREAS[i].playerid].countries++;
					if ( AREAS[i].units != '?' ) { PLAYERS[AREAS[i].playerid].armies += parseInt(AREAS[i].units); } // not fogged
				}
			});
			
			var CONTINENTS = getdetails['_content']['continents']['_content']['continent'];
			$(CONTINENTS).each(function(i){
				if ( CONTINENTS[i] ) {
					var COUNTRIES = CONTINENTS[i].cids.split(',');
					var bonus = true;
					var bonusplayer = -1;
					$(COUNTRIES).each(function(j){
						var currentplayer = AREAS[parseInt(COUNTRIES[j])-1].playerid;
						if ( j == 0 ) { bonusplayer = currentplayer; }
						if ( currentplayer != bonusplayer ) { bonus = false; }
					});
					if ( (bonus) && (bonusplayer!=-1) && (bonusplayer!='?') && (bonusplayer!='') ) { // same player, not neutral, not fogged, not empty
						PLAYERS[bonusplayer].bonuscontinent += parseInt(CONTINENTS[i].units);
					}
				}
			});

			var HTML = 
				'<table class="WFBoardStatus">'+
					'<tr>'+
						'<th colspan="2">Player</th>'+
						'<th>Units</th>'+
						'<th>Countries</th>'+
						'<th>Cards</th>'+
						'<th colspan="2">Bonus Units</th>'+
					'</tr>'+
					'<tr>'+
						'<td colspan="7"><img height="1px "width="100%" src="'+iOneBlackPixel+'"></td>'+
					'</tr>';

			$(PLAYERS).each(function(i){
				if ( PLAYERS[i].countries != 0 ) {
					var bonus = Math.floor( PLAYERS[i].countries/info.rules.b );
					PLAYERS[i].bonuscountry = ( bonus > parseInt(info.rules.m) ) ? bonus : parseInt(info.rules.m) ;
					var totalbonus = PLAYERS[i].bonuscountry + PLAYERS[i].bonuscontinent;
					PLAYERS[i].totalbonus = ( totalbonus > parseInt(info.rules.m) ) ? totalbonus : parseInt(info.rules.m) ;
				} else {
					PLAYERS[i].bonuscountry = 0;
					PLAYERS[i].totalbonus = 0;
				}
				var t = PLAYERS[i].teamid;
				var co = info.players[i].color;
				if ( !P[t] ){
					P[t] = {'un':0,'cn':0,'ca':0,'bo1':0,'bo2':0,'bo3':0,'co':[]};
					T.push(t);
				}
				P[t]['un'] += parseInt(PLAYERS[i].armies);
				P[t]['cn'] += parseInt(PLAYERS[i].countries);
				P[t]['ca'] += parseInt(PLAYERS[i].cards);
				P[t]['bo1'] += parseInt(PLAYERS[i].bonuscountry);
				P[t]['bo2'] += parseInt(PLAYERS[i].bonuscontinent);
				P[t]['bo3'] += parseInt(PLAYERS[i].totalbonus);
				P[t]['co'].push(co);
				if ( RULES.hascards == "0" ) { PLAYERS[i].cards = "-"; }
				PLAYERS[i].bonusstring = '('+PLAYERS[i].bonuscountry + '+' + PLAYERS[i].bonuscontinent + ')';
				if ( PLAYERS[i].active == "0" ) {
					PLAYERS[i].name = '<strike>' + PLAYERS[i].name + '</strike>';
					PLAYERS[i].armies = '-';
					PLAYERS[i].countries = '-';
					PLAYERS[i].cards = '-';
					PLAYERS[i].bonusstring = '-';
					PLAYERS[i].totalbonus = '-';
					PLAYERS[i].bonuscountry = '-';
					PLAYERS[i].bonuscontinent = '-';
					
				}
				HTML += (PLAYERS[i].isturn == '1') ? '<tr style="{background-color: #D4E6FC;}">' : '<tr>' ;
				HTML += 
						'<td style="{background-color:rgb('+co+')!important;}"><img height="1" width="10" src="/i/s.gif"></td>' +
						'<td><a href="http://warfish.net/war/browse/userprofile?pid=' + PLAYERS[i].profileid + '&t=d">' + PLAYERS[i].name + '</a></td>' +
						'<td>' + PLAYERS[i].armies + '</td>' +
						'<td>' + PLAYERS[i].countries + '</td>' +
						'<td>' + PLAYERS[i].cards + '</td>' +
						'<td>' + PLAYERS[i].bonusstring + '</td>' +
						'<td> '+ PLAYERS[i].totalbonus + '</td>'+
					'</tr>';
			});
			if ( T.length > 1 ){
				HTML += 
					'<tr>'+
						'<td colspan="7"><img height="10" width="1" src="/i/s.gif"></td>'+
					'</tr>'+
					'<tr>'+
						'<th colspan="2">Team</th>'+
						'<th>Units</th>'+
						'<th>Countries</th>'+
						'<th>Cards</th>'+
						'<th colspan="2">Bonus Units</th>'+
						'</tr>'+
					'<tr>'+
						'<td colspan="7"><img height="1px "width="100%" src="'+iOneBlackPixel+'"></td>'+
					'</tr>';
				for ( var j=0; j < T.length; j++ ) {
					if ( RULES.hascards == "0" ) { P[T[j]]['ca'] = "-"; }
					HTML += '<tr><td>&nbsp;</td>' +
						'<td align="right"><table><tr>';
					for ( var c=0; c < P[T[j]]['co'].length; c++ ) {
						HTML+='<td style="{background-color:rgb('+P[T[j]]['co'][c]+')!important;}"><img height="12" width="10" src="/i/s.gif"></td>';
					}
					HTML += '</tr></table></td>' +
						'<td class="WFAlign">' + P[T[j]]['un'] + '</td>' +
						'<td class="WFAlign">' + P[T[j]]['cn'] + '</td>' +
						'<td class="WFAlign">' + P[T[j]]['ca'] + '</td>' +
						'<td class="WFAlign">('+P[T[j]]['bo1']+'+'+P[T[j]]['bo2']+')</td>' +
						'<td class="WFAlign">'+P[T[j]]['bo3']+'</td></tr>';
				}
			}	
			HTML += '</table>';
			if ( RULES.hascards == "1" ) {
				HTML += '<img height="10" width="1" src="/i/s.gif"><br>';
				var cards = RULES.nextcardsworth.split(',');
				HTML += '<em>Card Scale: <span class="WFCardRow">&nbsp;' + cards[0] + ' </span>';
				for ( var i=1; i < 6; i++ ){ HTML += ', <span> ' + cards[i] + '<span>'; }
				HTML += '...</em>';
				//({numW:"0", numA:"1", numB:"0", numC:"1"})
				var mycards = getstate['_content']['cards']['_content']['self'];
			}
			$('#WFmenuContent1').html(HTML);
		});
	});
}
function LinksDisplayFriends(){
	$('head').append('<link rel="stylesheet" type="text/css" href="http://iroll11s.googlecode.com/files/farbtastic.css">');
	ScriptInsertDOM('http://iroll11s.googlecode.com/files/jquery-1.2.6.min.js',loadpicker,unsafeWindow.$);
	function loadpicker(){ ScriptInsertDOM('http://iroll11s.googlecode.com/files/farbtastic.js',main,unsafeWindow.$.farbtastic); }
	function main(){
		var T = eval(GM_getValue(who+'.friendcategories'));
		var C = eval(GM_getValue(who+'.friendcolors'));
		var F = eval(GM_getValue(who+'.friendslist'));
		if ( !GM_getValue(who+'.friendslistbackup') ) { GM_setValue(who+'.friendslistbackup',F.toSource()); }
		
		// HTML for the console.
		var html = '<div class="WFLeft">'+
			'<table id="WFfriends">'+
				'<tr>'+
					'<td class="WFHeader">Category Name</td>'+
					'<td class="WFHeader">Color</td>'+
				'</tr>';
				for ( var i=0; i < T.length; i++ ) {
				html += '<tr>'+
					'<td><input type="text" id="category'+i+'" name="category" value="'+T[i]+'"/></td>'+
					'<td><input type="text" style="background-color:'+C[i]+';" id="color'+i+'" name="color" class="colorselector" value="'+C[i]+'"/></td>'+
				'</tr>';}
				html += '<tr>'+
					'<td colspan="2" class="WFAlign"><input id="WFsaveinfo" type="submit" value="Click to Save"/></td>'+
				'</tr>'+
				'<tr>'+
					'<td colspan="2" class="WFAlign"><input id="WFimport" type="submit" value="Export/Import Friend\'s List"/></td>'+
				'</tr>'+
			'</table></div>'+
			'<div id="WFcolorpicker"><img src="http://iroll11s.googlecode.com/files/wheel.png"/></div><div class="WFClear"/>'+
			'<br><br><table id="WFfriendslist">'+
				'<tr>'+
					'<td width="150" class="WFAlign WFHeader">Tag</td>'+
					'<td width="150" class="WFAlign WFHeader">ProfileID</td>'+
					'<td width="120" class="WFAlign WFHeader">Name</td>'+
					'<td width="63" class="WFAlign WFHeader">Remove</td>'+
				'</tr>';
		for ( var i=0; i<T.length; i++ ) {
			for ( var item in F ) {
				if ( F[item].a == i ){
					var profilename = ( !F[item].b ) ? '<em>None</em>' : F[item].b ;
					html += '<tr><td class="WFAlign" style="background-color:'+C[F[item].a]+';">'+T[F[item].a]+'</td>'+
							'<td class="WFAlign"><a href="http://warfish.net/war/browse/userprofile?pid='+item+'">'+item+'</a></td>'+
							'<td class="WFAlign">'+profilename+'</td>'+
							'<td class="WFAlign"><img class="WFfriendRemove" data="'+item+'" src="'+iMenuClose+'"></td></tr>';
				}
			}
		}
		html += '</table>';
		$('#WFmenuContent5').html(html);

		// This binds the colorpicker to every input with class colorselector.
		unsafeWindow.$('.colorselector').focus(function(){unsafeWindow.$.farbtastic('#WFcolorpicker').linkTo(this);});
		
		// Event listeners.
		$('#WFsaveinfo').get(0).addEventListener('click',function (){
			var T = [];$('input[name=category]').each(function(){T.push($(this).val())});GM_setValue(who+'.friendcategories',T.toSource());
			var C = [];$('input[name=color]').each(function(){C.push($(this).val())});GM_setValue(who+'.friendcolors',C.toSource());
			LinksDisplayFriends();
		},false);
		$('#WFimport').get(0).addEventListener('click',function (){
			var html = 'The following is your saved Friend\'s List information so you can copy it from one '+
				'<br>computer to another.  Since this is a new feature I recommend you click the '+
				'<br>Backup Friend\'s List button before you import in case there are any bugs lurking.'+
				'<p><textarea id="WFimportmsg" class="WFmessageBox"/>'+
				'<br><input id="WFimportsubmit" type="submit" value="Import Friend\'s List"/>'+
				' <input id="WFimportbackup" type="submit" value="Backup Friend\'s List"/>'+
				' <input id="WFimportrestore" type="submit" value="Restore Friend\'s List"/>';
			$('#WFmenuContent5').html(html);
			$('#WFimportmsg').val(F.toSource()).css('width','600px').css('height','400px');
			$('#WFimportsubmit').get(0).addEventListener('click',function (){
				GM_setValue(who+'.friendslist',$('#WFimportmsg').val());
				LinksDisplayFriends();
			},false);
			$('#WFimportbackup').get(0).addEventListener('click',function (){
				GM_setValue(who+'.friendslistbackup',F.toSource());
				alert('Backup Saved.');
			},false);
			$('#WFimportrestore').get(0).addEventListener('click',function (){
				Ftemp = eval(GM_getValue(who+'.friendslistbackup'));
				GM_setValue(who+'.friendslist',Ftemp.toSource());
				LinksDisplayFriends();
			},false);
		},false);
		$('.WFfriendRemove').each(function(i){this.addEventListener('click',function (){
			delete F[$(this).attr('data')];
			GM_setValue(who+'.friendslist',F.toSource());
			LinksDisplayFriends();
		},false);});
	}
}
function LinksDisplayRules(gameid,info){
	$('#WFmenuContent2').load('http://warfish.net/war/play/gamedetails?t=r&gid='+gameid+' table[cellspacing="2"]');
}
function LinksDisplayHistory(gameid,info){
	loadhistory();
	function loadhistory(){
		var url = "http://warfish.net/war/services/rest?_method=warfish.tables.getHistory&start=0&num=1&gid="+gameid;
		var req = new XMLHttpRequest();
			req.open('GET',url,false);
			req.send(null);
		if ( req.status != 200 ) { 
			$("#WFmenuContent3").html('Failed to load!');
			return false;
		}
		var node = document.importNode(req.responseXML.getElementsByTagName('rsp').item(0), true);
		var totalpages = Math.floor((parseInt(node.firstChild.getAttribute("total"))/1500)+1);
		for ( var i=0; i<totalpages; i++ ) {
			$('#WFmenuContent3').html('<div id="historymenu"><img src="'+iMenuLoading+'"> Loading page '+(i+1)+' of '+totalpages+"</div>");
			url = "http://warfish.net/war/services/rest?_method=warfish.tables.getHistory&gid="+gameid+"&start="+(1+(1500*i))+"&num=1500";
			req.open('GET',url,false);
			req.send(null);
			if ( req.status != 200 ) { 
				$("#WFmenuContent3").html('Failed to load!');
				return false;
			}
			$('body').append(document.importNode(req.responseXML.getElementsByTagName('rsp').item(0),true));
		}
	}

	// Create an array to hold all of the player turn object information.
	// Start at -1 for the Neutral guy.
	var P = [];
	for ( var i=-1; i < info.players.length; i++ ) { 
		P[i] = {};
		P[i].name = ( i == -1 ) ? 'Nuetral' : info.players[i].name;
		P[i].color = ( i == -1 ) ? '204,204,204' : info.players[i].color;
		P[i].units = {
			'atck': { 'kill':0, 'lost':0, 'pkill':0 },
			'dfns': { 'kill':0, 'lost':0, 'pkill':0 }
		}
		P[i].dice = {
			'atck': { 'mod':{}, 'rolls':{} },
			'dfns': { 'mod':{}, 'rolls':{} }
		};
	}
	
	// Retrieve the default dice sides for turn based dice from the saved info object.
	var aside = (+info.rules.adie);
	var dside = (+info.rules.ddie);

	var turns = $$('//rsp/movelog/m[@a="a"]',document);
	for ( var i=0,el; ( el = turns.snapshotItem(i) ); i++ ) {
		var A = parseInt(el.getAttribute("s"));				// Attacker player id.
		var D = parseInt(el.getAttribute("ds"));			// Defender player id.
		var al = parseInt(el.getAttribute("al"));			// Units lost by attacker.
		var dl = parseInt(el.getAttribute("dl"));			// Units lost by defender.
		var ad = el.getAttribute("ad").split(",");			// Attacker dice. [6,5,4]
		var dd = el.getAttribute("dd").split(",");			// Defender dice. [5,4]  Can be empty for abandoned!
		var dm = el.getAttribute("m").split(",");			// Dice modifiers.

		// Store the units killed and lost for this turn.
		P[A].units.atck.kill += dl;
		P[A].units.atck.lost += al;
		P[D].units.dfns.kill += al;
		P[D].units.dfns.lost += dl;
		
		// We only store information for a roll if the defending territory is owned by someone.
		if ( dd[0] != '' ) {
			var adie = ad.length;
			var ddie = dd.length;
			var asides = ( dm.length > 1 ) ? aside + (+dm[0]) : aside ; 
			var dsides = ( dm.length > 1 ) ? dside + (+dm[1]) : dside ; 
			var modkey = adie + '-' + asides + '-' + ddie + '-' + dsides;
			
			// Stores how many rolls were made with a specific set of dice modifiers.
			if ( typeof P[A].dice.atck.mod[modkey] === 'undefined' ) { P[A].dice.atck.mod[modkey] = 0; }
			if ( typeof P[D].dice.dfns.mod[modkey] === 'undefined' ) { P[D].dice.dfns.mod[modkey] = 0; }
			P[A].dice.atck.mod[modkey]++;
			P[D].dice.dfns.mod[modkey]++;
			
			// Calculate and store the dice distributions.
			for ( var j=0; j<adie; j++ ) {
				var dicevalue = ad[j];
				if ( typeof P[A].dice.atck.rolls[dicevalue] === 'undefined' ) { P[A].dice.atck.rolls[dicevalue] = 0; }
				P[A].dice.atck.rolls[dicevalue]++;
			}
			for ( var j=0; j<ddie; j++ ) {
				var dicevalue = dd[j];
				if ( typeof P[D].dice.dfns.rolls[dicevalue] === 'undefined' ) { P[D].dice.dfns.rolls[dicevalue] = 0; }
				P[D].dice.dfns.rolls[dicevalue]++;
			}
		}
	}	
	
	// Calculate the probable loss values for each player.
	for ( var i=-1; i < info.players.length; i++ ) { 
		for ( key in P[i].dice.atck.mod ) {
			P[i].units.atck.pkill += LossCalculator(key.split('-'),P[i].dice.atck.mod[key])[1];
		}
		for ( key in P[i].dice.dfns.mod ) {
			P[i].units.dfns.pkill += LossCalculator(key.split('-'),P[i].dice.dfns.mod[key])[0];
		}
	}

	// Create the output table.
	var html =
	'<table id="WFhistory">' +
		'<tr>' +
			'<th colspan="2">Player</th>'+
			'<th><img src="' + GM_getResourceURL("iKill") + '"></th>' +
			'<th>Kills</th>' +
			'<th><img src="' + GM_getResourceURL("iDeath") + '"></th>' +
			'<th>Losses</th>' +
			'<th><img src="' + GM_getResourceURL("iLuck") + '"></th>' +
			'<th>Luck</th>' +
		'</tr>' +
	'</table>';
	$("#WFmenuContent3").html(html);
	
	for ( var i=-1; i < info.players.length; i++ ) {
		var totalkills = P[i].units.atck.kill + P[i].units.dfns.kill;
		var totallosses = P[i].units.atck.lost + P[i].units.dfns.lost;
		var totalluck = P[i].units.atck.pkill + P[i].units.dfns.pkill;
		var luckluck = Math.floor( (totalkills - totalluck) * 10) / 10;
		var atckluck = Math.floor( (P[i].units.atck.kill - P[i].units.atck.pkill) * 10) / 10;
		var dfnsluck = Math.floor( (P[i].units.dfns.kill - P[i].units.dfns.pkill) * 10) / 10;
		var totem = ( dfnsluck > 0 ) ? ' + ' : ' - ' ;
		var color = ( luckluck > 0 ) ? 'green' : 'red' ;
		var html = 
			'<tr>' +
				'<td style="{background-color:rgb('+P[i].color+')!important;}"><img height="1" width="10" src="/i/s.gif"></td>' +
				'<td>'+ P[i].name + '</td>' +
				'<td><b>' + totalkills + '</b></td>' +
				'<td>(' + P[i].units.atck.kill + ' + ' + P[i].units.dfns.kill + ')</td>' +
				'<td><b>' + totallosses + '</b></td>' +
				'<td>(' + P[i].units.atck.lost + ' + ' + P[i].units.dfns.lost + ')</td>' +
				'<td><b><span style="color:' + color + ';">' + luckluck + '</span></b></td>' +
				'<td>(' + atckluck + totem + Math.abs(dfnsluck) + ')</td>' +
			'</tr>';
		$('#WFhistory').append(html);
	}
}

// ================================================================================================================
// ~~ Friend's list DOM manipulation functions.
// ================================================================================================================
function FriendsHighlightCreateGame(){
	var F = eval(GM_getValue(who+'.friendslist'));
	var C = eval(GM_getValue(who+'.friendcolors'));
	var Z = {};
	// Create a reverse object with the secondary profileid value from the first object as the key to the second.
	for( i in F ){
		var altprofileid = ( F[i].c || false );
		if ( altprofileid ) Z[altprofileid.slice(2)] = { 'a':F[i].a, 'b':(F[i].b || false) };
	}
	// Option value of the drop down box uses the secondary profileid as an identifier.
	for( i in Z ){
		var el = $('option[value="'+i+'"]').css( 'background-color',C[Z[i].a] );
		if ( Z[i].b ) el.text( Z[i].b );
	}
}
function FriendsHighlightCreateTourny(){
	var center = $1( '//text()[contains(.,"Select players from your opponents")]/..',document );
	if ( center ) {
		// Style center tag, get friend list preferences.
		center.setAttribute('class','WFtournamentcreateinputs');
		var C = eval(GM_getValue(who+'.friendcolors'));
		var T = eval(GM_getValue(who+'.friendcategories'));
		var F = eval(GM_getValue(who+'.friendslist'));
		var Z = {};
		for ( i in F ){
			var zid = ( F[i].c || false );
			if (zid) Z[zid] = { 'a':F[i].a, 'b':(F[i].b || false) };
		}

		// Style the inputs that match people in the friends list.
		var inputs = $$( './/text()[.=", "]/../nobr/input[@type="checkbox"]',center );
		for ( var i=0,el; ( el = inputs.snapshotItem(i) ); i++ ) {
			var namenode = $1('following-sibling::text()',el);
			var name = el.getAttribute('name');
			if ( Z[name] ) {
					el.parentNode.setAttribute( 'style','{background-color:'+C[Z[name].a]+'};' );
					if ( Z[name].b ) namenode.nodeValue =  Z[name].b;
					el.setAttribute( 'data',Z[name].a );
			}
		}

		// Replace every 4th comma with a break, then remove others.
		var commas = $$( './/text()[.=", "][position() mod 4 = 0 ]',center );
		for ( var i=0,el; ( el = commas.snapshotItem(i) ); i++ ) {
			el.parentNode.insertBefore(document.createElement('br'),el);
			el.parentNode.removeChild(el);
		}
		var commas = $$( './/text()[.=", "]',center );
		for ( var i=0,el; ( el = commas.snapshotItem(i) ); i++ ) {
			el.parentNode.removeChild(el);
		}
		
		// Add buttons to the bottom of the page to check/uncheck groups in the friends list.
		$('a[href="#"]:eq(2)').after('<br><br><span id="WFselectall">Select All: </span><span id="WFremoveall">Remove All: </span>');
		for ( var i=0; i < T.length; i++ ){
			$('#WFselectall').append('<span style="background-color:'+C[i]+';" class="WFqpSelector WFlink" data="'+i+'" data2="true">'+T[i]+'</span>');
			$('#WFremoveall').append('<span style="background-color:'+C[i]+';" class="WFqpSelector WFlink" data="'+i+'" data2="false">'+T[i]+'</span>');
		}
		$('.WFqpSelector').each(function(i){
			this.addEventListener('click',function(){
				if ( $(this).attr('data2') == "true" ) { 
					$('input[data="'+$(this).attr('data')+'"]').attr('checked',true);
				} else {
					$('input[data="'+$(this).attr('data')+'"]').attr('checked',false);
				}
			},false);
		});
	}
}
function FriendsHighlightJoinTourny(){
	var F = eval(GM_getValue(who+'.friendslist'));
	var C = eval(GM_getValue(who+'.friendcolors'));
	var seats = $$('//table[@width="100%"][@cellspacing="1"][@cellpadding="2"][@border="0"]//a[contains(@href, "userprofile?pid=")]',document);
	for ( var i=0,el; ( el = seats.snapshotItem(i) ); i++ ) {
		if ( /\?pid=(.+?\d+)$/.exec(el.getAttribute('href')) ){
			if ( F[RegExp.$1] ){ $1('ancestor::td[2]',el).setAttribute('style','background-color:'+C[F[RegExp.$1].a]+';'); }
		}
	}
}
function FriendsHighlightProfile(targetid){
	var T = eval(GM_getValue(who+'.friendcategories'));
	var C = eval(GM_getValue(who+'.friendcolors'));
	var F = eval(GM_getValue(who+'.friendslist'));
	
	// Add empty title
	$('table[cellspacing="5"]').prepend('<tr id="WFfriendbanner" class="WFHidden"><td colspan="2"><div class="WFfriendTitle WFoutline"/></td></tr>');
	
	// Fill in the title if this person is in the friends list.
	if ( F[targetid] ) {
		$('.WFfriendTitle').html( T[F[targetid].a] ).css( 'background-color',C[F[targetid].a] );
		$('#WFfriendbanner').show();
	}

	// Add the buttons to mark friends with saved categories.
	var insertpoint = $('td[width="340"][valign="top"]');
	for ( var i=0; i < T.length; i++ ) {
		insertpoint.append('<span style="-moz-border-radius: 0px 0px 2px 2px;background-color:'+C[i]+';border-top:none;" class="WFfriendToggle WFlink" data="'+i+'">'+T[i]+'</span>');
	}

	// Event listeners for buttons.
	$('.WFfriendToggle').each(function(i){
		this.addEventListener('click',function(){
			var profilename = $('div[align="left"] B').text();
			if ( !F[targetid] ){ F[targetid] = {}; }
			F[targetid].a = $(this).attr('data');
			if ( profilename!= "" && !/\.\.\.@\.\.\./.test(profilename) ) { F[targetid].b = profilename; }
			$('.WFfriendTitle')
				.html( T[F[targetid].a] )
				.css( 'background-color',C[F[targetid].a] );
			$('#WFfriendbanner')
				.show();
			GM_setValue(who+'.friendslist',F.toSource());
		},false);
	});
}
function FriendsHighlightQuickPicks(){
	$('body').append('<div data="false" id="WFquickpickpopup"/>');
	var F = eval( GM_getValue(who+'.friendslist') );
	var C = eval( GM_getValue(who+'.friendcolors') );
	var T = eval( GM_getValue(who+'.friendcategories') );
	var table = $1('//table[not(@width)][@cellspacing="2"][@cellpadding="0"][@border="0"]',document);
	var inputs = $$('.//input[@name!="qpauto"][@type="checkbox"]',table);

	// Style background color and replace text for matched table cells.
	var inputslength = inputs.snapshotLength;
	for ( var s = inputslength; s--; ) {
		var input = inputs.snapshotItem(s);
		var tablecell = input.parentNode.parentNode;
		var link = input.nextSibling;
		//link.textContent = link.textContent.replace(/(.+?)\.*?@\.*?(\[\d+?\])/gim,'\$2  \$1'); <- 110 ms to do this, not worth it.
		X = /pid=(.+?\d+)/.exec(link.getAttribute('href'));
		if ( F[X[1]] ) {
			F[X[1]].c = input.getAttribute('name');
			if ( F[X[1]].b ) { link.textContent = (F[X[1]].b); }
			tablecell.setAttribute( 'style','{background-color:'+C[F[X[1]].a]+';}' );
			input.setAttribute( 'data',F[X[1]].a );
		}
	}

	GM_setValue(who+'.friendslist',F.toSource());
	
	// Add buttons to the bottom of the page to check/uncheck groups in the friends list.
	$('a[href="#"]:eq(1)').after('<br><br><span id="WFselectall">Select All: </span><span id="WFremoveall">Remove All: </span>');
	for ( var i=0; i < T.length; i++ ) {
		$('#WFselectall').append('<span style="background-color:'+C[i]+';" class="WFqpSelector WFlink" data="'+i+'" data2="true">'+T[i]+'</span>');
		$('#WFremoveall').append('<span style="background-color:'+C[i]+';" class="WFqpSelector WFlink" data="'+i+'" data2="false">'+T[i]+'</span>');
	}
	$('.WFqpSelector').each(function(i){
		this.addEventListener('click',function(){
			if ( $(this).attr('data2') == "true" ) { 
				$('input[data="'+$(this).attr('data')+'"]').attr('checked',true);
			} else {
				$('input[data="'+$(this).attr('data')+'"]').attr('checked',false);
			}
		},false);
	});
	
	// Set class and add a mouseover event to table.
	table.setAttribute('class','WFquickpickinputs');
	table.addEventListener('mouseover',function(ev){
		if ( /pid=(.+?\d+)/.exec(ev.target) ) {
			if ( $('#WFquickpickpopup').attr('data') == 'false' ) {
				$('#WFquickpickpopup')
					.css({visibility:"visible",top:(ev.clientY+20)+"px",left:(ev.clientX+20)+"px"})
					.html('<img width="100" height="100" src="http://warfish.net/war/browse/profileimg/'+RegExp.$1+'/t"/>')
					.attr('data','true');
			}
		} else {
			$('#WFquickpickpopup')
				.css('visibility','hidden')
				.html('Loading...')
				.attr('data','false');
		}
	},true);
}
function FriendsHighlightTournamentBracket(){
	var F = eval( GM_getValue(who+'.friendslist') );
	var C = eval( GM_getValue(who+'.friendcolors') );
	var tournamenttable = $1('//td[@bgcolor="#eeeeee"]/nobr/b/text()[contains(.,"Round 1")]/ancestor::table[1]',document);
	var games = $$('.//b/text()[contains(.,"Game")]/ancestor::td[1]',tournamenttable);
	var seats = $$('.//a[contains(@href,"userprofile?pid")]',tournamenttable);
	for ( var i=0,el; ( el = games.snapshotItem(i) ); i++ ) { el.setAttribute('class','WFoutline'); }
	for ( var i=0,el; ( el = seats.snapshotItem(i) ); i++ ) {
		if ( /\?pid=(.+?\d+)$/.exec(el.getAttribute('href')) ) {
			if ( el.nextSibling ) {
				if ( el.nextSibling.nodeName == 'A' ) { 
					if ( F[RegExp.$1] ) {
						el.nextSibling.setAttribute( 'style','background-color:'+C[F[RegExp.$1].a]+';' );
					}
					if ( RegExp.$1 == GM_getValue('~profileid') ) { 
						$$('.//ancestor::td[2]',el).snapshotItem(0).setAttribute('style','background-color:#87AFDA;');
					}}}}}
}

// ================================================================================================================
// ~~ Major DOM modifications. Game List, Tournament List, Board Message Area.
// ================================================================================================================
function GameListModify(){
	WF_AddDisplayDiv(0,'Current Game Map');
	var G = eval(GM_getValue(who+'.gamenames'));
	var gametable = $1('//table[@width="100%"][@cellspacing="1"][@cellpadding="2"][@border="0"]',document);
	var firstrow = $(gametable).find('tr:eq(0)');
	var nextlink = $('a[href*="gamelist?f="]:contains("next")');
	var links = $$('.//a[contains(@href, "game?gid=") and not(contains(.,"Your turn"))]',gametable);
	
	// Sort the 'Name' column of the table.
	var html = '<select id="WFsortname">'+
		'<option>Sort By:</option>'+
		'<option>Customized</option>'+
		'<option>Rematch</option>'+
		'<option>Ranked</option>'+
		'<option>Team</option>'+
		'<option>Tournament</option></select>';
	firstrow.children('td:contains("Name")').html(html);
	$('#WFsortname').get(0).addEventListener('change',function(){
		var sortrows = function( test ){
			var result;
			switch ( test ) {
				case 'Customized': result = './/a[@title="Customized Game"]//ancestor::tr[1]'; break;
				case 'Rematch': result = './/b[contains(.,"R:")]//ancestor::tr[1]'; break;
				case 'Ranked': result = './/a[@title="Ranked Game"]//ancestor::tr[1]'; break;
				case 'Team': result = './/a[@title="Team Game"]//ancestor::tr[1]'; break;
				case 'Tournament': result = './/b[contains(.,"T:")]//ancestor::tr[1]'; break;
			}
			return $$(result,gametable);
		}( $(this).val() );
		for ( var i = sortrows.snapshotLength; i--; ) { firstrow.after(sortrows.snapshotItem(i)); }
	},false);

	// Sort the 'Stage' column of the table.
	firstrow
		.children('td:contains("Stage")')
		.prepend('<img id="WFsortstage" src="http://img38.imageshack.us/img38/3198/tablesortnull.png"> ');
	$('#WFsortstage').get(0).addEventListener('click',function(){
		var yourturnrows = $$('.//text()[contains(.,"Your turn")]',gametable);
		var rowindexarray = [];
		for ( var i = yourturnrows.snapshotLength; i--; ){ rowindexarray.push(i); }
		rowindexarray.sort( function(a,b){
			var aturnhours = /(\d+)\s([smhd])/.exec(yourturnrows.snapshotItem(a).textContent);
			var bturnhours = /(\d+)\s([smhd])/.exec(yourturnrows.snapshotItem(b).textContent);
			a = converttoseconds( aturnhours[2], aturnhours[1] );
			b = converttoseconds( bturnhours[2], bturnhours[1] );
			function converttoseconds( smhd, tstamp ) {
				switch ( smhd ) {
					case 's': break;
					case 'm': tstamp *= 60; break;
					case 'h': tstamp *= 3600; break;
					case 'd': tstamp *= 86400; break;
				}
				return tstamp;
			}
			return a - b;
		});
		for ( var i = 0; i < rowindexarray.length; i++ ) { firstrow.after( $1( 'ancestor::tr[1]', yourturnrows.snapshotItem(rowindexarray[i]) ) ); }
	},false);

	WF_AddMapPreviewIcon(links);
	
	// Add a map preview item and fill in the gamename if saved.
	function WF_AddMapPreviewIcon(games){
		for ( var i = games.snapshotLength; i--; ){
			var $this = games.snapshotItem(i);
			var $this_parent = games.snapshotItem(i).parentNode;
			var space = document.createTextNode(' ');
			var span = document.createElement('span');
				span.setAttribute('class','WFlink');
				span.textContent = 'M';
			var gid = /(\d+)$/.exec($this.getAttribute('href'))[1];
			if ( gid in G ) { $this.textContent = G[gid]; }
			$this.setAttribute('data','marked');
			$this_parent.insertBefore(space,$this_parent.firstChild);
			$this_parent.insertBefore(span,$this_parent.firstChild);
			span.addEventListener('click',function(gid){
					return function(ev){
						$('#WFmenuContent0').html('<img src="http://warfish.net/war/play/gamemapimg?gid='+gid+'">');
						$('#WFmenuContainer0').show();
					};
				}(gid),false);
		}
	}
	
	// Show an 'Add Next' link to load in the next page if there is a next page.
	if ( nextlink.length == 2 ) {
		nextlink.parent().append(' <span class="WFaddnextgame WFlink">Add Next</span>');
		$('.WFaddnextgame').each(function(i){
			this.addEventListener('click',function(){
				var oldhref = nextlink.eq(1).attr('href');
				var qs = oldhref.slice(oldhref.indexOf('?')+1).split('&');
				var newhref = 'http://warfish.net/war/play/gamelist?'+qs[0]+'&'+qs[1]+'&p='+(qs[2].split('=')[1]*1+1);
				nextlink.eq(1).attr('href',newhref);
				$('body').append('<rsp/>');
				$('rsp').load(oldhref + ' table[cellspacing="1"][cellpadding="2"][width="100%"][border="0"]',function(){
					$('table[cellspacing="1"][cellpadding="2"][width="100%"][border="0"]')
						.append( $('rsp')
							.children('table')
							.children('tbody')
							.children('tr:gt(0)') );
					$('rsp').remove();
					links = $$('.//a[contains(@href, "game?gid=") and not(contains(.,"Your turn")) and not(contains(@data, "marked"))]',gametable);
					WF_AddMapPreviewIcon(links);
				});
			},false); 
		});
	}
	
	// Change 'Turn-in progress' to Wait in the Stage column.
	var wait = $$('.//a[contains(@href, "gamehistory?gid=")]',gametable);
	for ( var i = wait.snapshotLength; i--; ){
		var waitcell = $1('ancestor::td[1]',wait.snapshotItem(i));
		waitcell.innerHTML = '<a href="' + wait.snapshotItem(i).getAttribute('href') + '">Wait</a>';
	}
}
function TournamentListModify(){
	var links = $('a[href*="tournament?tid="]');
	if (links.length > 0 ){
	
		// Add DOM elements .
		$('body').append('<rsp id="WFtournyinfo"></rsp>');
		WF_AddDisplayDiv(0,'Tournament Map');
		
		// Add image link to each link under the Name column.
		$('a[href*="tournament?tid="]').not('img + a').not(':contains("Join")').each(function(i){
			var tid = /(\d+)$/.exec($(this).attr("href"));
			$(this).parent().prepend(' <span id="WFtourny'+i+'" class="WFlink">M</span>&nbsp;');
			$('#WFtourny'+i).get(0).addEventListener('click',function(){
				$('#WFmenuContent0').html('<img id="WFtournyimage" src="http://warfish.net/war/compete/tournamentmapimg?tid='+tid[1]+'">');
				$('#WFmenuContainer0').show();
			},false);
		});
		
		// Add a decline button next to each link in the Stage column that has 'Join' as the link text.
		$('a[href*="tournament?tid="]:contains(Join)').not('img + a').each(function(i){
			var tid = /(\d+)$/.exec($(this).attr("href"));
			$(this).wrap('<nobr></nobr>').parent().append(' <span id="WFtournydecline'+i+'" class="WFlink">Decline</span>&nbsp;');
			$('#WFtournydecline'+i).get(0).addEventListener('click',function(){
				$('#WFmenuContent0').html('<img src="'+iMenuLoading+'"> Retrieving tournament page...');
				$('#WFmenuContainer0').show();
				$('#WFtournyinfo').load('http://warfish.net/war/compete/tournament?tid='+tid[1]+' form[name="bform"]',function(){
					var URL = 'http://warfish.net/war/compete/tournament?tid='+tid[1]+'&action=decline&actionkey='+$('input[name="actionkey"]').val();
					$('#WFmenuContent0').html('<img src="'+iMenuLoading+'"> Submitting decline tournament form...');
					$('rsp').load(URL,function(){window.location.href=window.location.href;});
				});
			},false);
		});
	}
}
function MessageAreaModify(){
	var gamesubmit = $('form[action="gamemessages"]');
	var tournamentsubmit = $('form[action="tournamentmessages"]');
	var messageform = ( gamesubmit.length == 1) ? gamesubmit : tournamentsubmit ;
	if ( gamesubmit.length > 0 || tournamentsubmit.length > 0 ){

		// Hide the current message box and submit button, add textarea and new submit.
		var html = '<nobr><textarea id="WFtext" class="WFmessageBox"/><img id="WFmessagepost" src="'+iMessagePost+'"/></nobr><br>';
		var oldsubmit = $('input[type="submit"]')
			.css( 'display','none' );
		var oldinput = $('input[name="message"][size="60"]')
			.css( 'display','none' )
			.before(html);
		var textarea = $('#WFtext')
			.css( 'width','610px' )
			.val( oldinput.val() );
		
		// If the message is to all teammates and empty, then add sent-to-team prefix.
		var select = $('select[name="toseatnum"]');
		if (select.length > 0){
			select.get(0).addEventListener('change',function(ev){
				if ( ($(this).find('option:selected').attr('value') == 't') && textarea.val() == '' ) {
					textarea.val('[To All Teammates]: ');
				}else{
					if ( textarea.val() == '[To All Teammates]: ' ){ textarea.val(''); } 
				}
			},false);
		}		

		// A new submit button needs a new onclick event.
		$('#WFmessagepost').get(0).addEventListener('click',function(ev){
			GM_setValue( 'messagebackup',textarea.val() );
			oldinput.val( textarea.val() );
			messageform.submit();
		},false);
		
		// Style the message area.
		var msgtable = $1('//td/text()[.="says"]/ancestor::table[2]',document);
		if ( msgtable ) {
			msgtable.setAttribute('class','WFmessageBox');
		}

		// Style the message area.
		// if ( msgtable ) {
			// var colors = $$('.//td[@valign="top"]//img[@width="15"][@height="15"]/parent::td[@bgcolor]',msgtable);
			// var playername = $$('.//td[@valign="top"]//a[contains(@href, "gamedetails")]',msgtable);
			// var message = $$(".//b/text()[contains(.,'\"')]",msgtable);  // double quotes are used in order to escape the " in javascript.
			// GM_log(colors.snapshotLength);
			// GM_log(message.snapshotLength);
			// GM_log(playername.snapshotLength);
			// var frag = document.createDocumentFragment();
			// for ( var i = playerinfo.snapshotLength; i--; ){
				// var plus = ( playerinfo.snapshotItem(i).parentNode.parentNode.nextSibling ) ? true : false ;
				// var msgimg = ( i%2 == 0 ) ? iMessageBlurbLineLeft : iMessageBlurbLineRight ;
				// var msgclass = ( i%2 == 0 ) ? 'WFLeft' : 'WFRight' ;
				// var div = document.createElement('div');
				// var html = '<div class="WFmessageBox">' + message[i] + '</div>'+
					// '<div class="WFblurb ' + msgclass + '"><img src="' + msgimg + '"/></div>'+
					// '<div class="WFClear WFplayer ' + msgclass + '"><img src="'+M[i].playericon+'"/><a href="'+M[i].gameseatlink+'">'+M[i].playername+'</a></div>';
				// div.innerHTML = html;
				// frag.appendChild(div);
			// }

			// msgtable.innerHTML = '';
			// msgtable.appendChild(frag);

			// The silly black line around the message box on the messages page has to go, eventually.
			// $('td[bgcolor="#000000"]').css('background-color','#ffffff');
		// }
	}
}

// ================================================================================================================
// ~~ Smaller DOM modifications.
// ================================================================================================================
function AdjustedWinPercentageAdd(){
	var playergames=0;var totalgames=0;
	$('td:contains("Win percentage for")').each(function(i){
		playergames+=/(\d+)/.exec($(this).text())[1]*/(\d+)\/(\d+)/.exec($(this).next().next().text())[1];
		totalgames +=/(\d+)\/(\d+)/.exec($(this).next().next().text())[2]*1;});
	$('#WFlinks').append('<span>  Normalized Wins: '+Math.round(playergames/totalgames*100)/100+'</span>');
}
function FavoriteBoardsLinkAdd(){
	var html = ' - <a href="http://warfish.net/war/browse/userprofile?pid='+who+'&t=b&type=fav&p=1"><b>Favorite Boards</b><a>';
	$('a[href="directory?t=p"]:eq(0)').parent().append(html);
}
function FullMapPreviewAdd(boardid){
	var el = $('img[width*="250"][height*="250"]').parent().parent().parent().parent().parent().parent().parent().parent();
	el.after('<br><img valign="center" src="http://warfish.net/i/plus.gif">&nbsp;<a href="http://warfish.net/war/design/mapimg?bid='+boardid+'">Full Map Preview</a>')
}
function GameNamePrefill(gameid){
	$('input[name="playerhandle"][type!="hidden"]').val(unescape(GM_getValue('~profilename')));
	$('input[name="igname"][type!="hidden"]').val(unescape(GM_getValue('~profilename')));
}
function HistoryLogReformat(){
	var lastlink = $('center').children('a[href*="move="]:eq(0)');
	if (lastlink.length>0){
		var toplinks = lastlink.parent();
		var L = [false,false,false,false,false,false];var HTML = "";
		L[0] = (X = toplinks.find('a:contains("First Page")').attr('href'))?X:false;
		L[1] = (X = toplinks.find('a:contains("Previous Page")').attr('href'))?X:false;
		L[2] = (X = toplinks.find('a:contains("Next Page")').attr('href'))?X:false;
		L[3] = (X = toplinks.find('a:contains("Last Page")').attr('href'))?X:false;
		L[4] = (X = toplinks.find('a[href*="move=p"]:eq(0)').attr('href'))?X:false;
		L[5] = (X = toplinks.find('a[href*="move=l"]:eq(0)').attr('href'))?X:false;
		HTML += (L[0])?'[<a href="'+L[0]+'">First Page</a>] - ':'[First Page] - ';
		HTML += (L[1])?'[<a href="'+L[1]+'">Previous Page</a>] - ':'[Previous Page] - ';
		HTML += (L[2])?'[<a href="'+L[2]+'">Next Page</a>] - ':'[Next Page] - ';
		HTML += (L[3])?'[<a href="'+L[3]+'">Last Page</a>] - ':'[Last Page] - ';
		HTML += (L[4])?'[<a href="'+L[4]+'">Previous Turn</a>] - ':'[Previous Turn] - ';
		HTML += (L[5])?'[<a href="'+L[5]+'">Last Move</a>]':'[Last Move]';
		toplinks.html(HTML);toplinks.parent().children('center:last').html(HTML);
		$('b:contains("says")').each(function(){$(this).parent().after($(this).next().next());});}
}
function MapDetailsReformat(gameid,info){
	var el = $('td[width="0"][height="0"][bgcolor="#ffffff"][align="center"]');
	el.html(el.html().replace(/\(a:([+-]{1}\d+),([+-]{1}\d+);d:([+-]{1}\d+),([+-]{1}\d+)\s/gmi,replace));
	function replace(){
		var z = arguments;
		var y = [];
		y[1] = parseInt(info.rules.adie) + parseInt(z[1]);
		y[3] = parseInt(info.rules.afdie) +  parseInt(z[3]);
		y[2] = parseInt(info.rules.ddie) + parseInt(z[2]); 
		y[4] = parseInt(info.rules.dfdie) + parseInt(z[4]);
		for ( i = y.length; i--; ) { y[i] = ( y[i] < 1 ) ? 1 : y[i] ; }
		var attackper = 100 - Math.floor(y[3]/y[1]*100);
		var defenseper = 100 - Math.floor(y[4]/y[2]*100);
		var replacestring = ' (a:'+z[1]+','+z[3]+';d:'+z[2]+','+z[4]+') ('+attackper+'%/'+defenseper+'%';
		return replacestring;
	}
	$('a[href="../help/faq#modifiernotation"]').remove();
	$('a[href="../help"]').attr('href','../help/faq#modifiernotation');
}
function TournamentFindBootables(){
	$('<rsp id="WFbootables">')
		.appendTo('body')
		.load(where.replace('tournament','tournamentdetails') + ' center:eq(0)',function(){
			var boottime = $1('//rsp[@id="WFbootables"]//nobr[contains(.,"Vote out time:")]/../../td[2]/nobr/text()',document).textContent;
		});
}
function UIToggleReplace(gameid){
	var el;
	if ( $('font:contains("Display settings")').length > 0 ) {
		el = $('font:contains("Display settings")');
	}
	if ( $('object').length == 1 ) {
		$('object').append('<div id="me">');
		el = $('#me');
	}
	if ( el ) {
		el.html('<small>Display Settings: </small>'+
		'<a href="../settings/display?uitype=1&panning=0&flashui=0&ret=play/game%3Fgid%3D'+gameid+'">HTML</a> | '+
		'<a href="../settings/display?uitype=0&panning=1&flashui=0&ret=play/game%3Fgid%3D'+gameid+'">Standard w/ Pan</a> | '+
		'<a href="../settings/display?uitype=0&panning=0&flashui=0&ret=play/game%3Fgid%3D'+gameid+'">Standard w/o Pan</a> | '+
		'<a href="../settings/display?uitype=0&panning=0&flashui=1&ret=play/game%3Fgid%3D'+gameid+'">Flash</a>').show();
	}
}

// ================================================================================================================
// ~~ Utility functions: data collection, DOM search, css.  Non-user interaction.
// ================================================================================================================
function $$(exp,root){
	return document.evaluate(exp,root,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
}
function $1(exp,root){
	return document.evaluate(exp,root,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
}
function WF_AddDisplayDiv(uniqueid,title){
	if ( $('#WFmenuContainer'+uniqueid).length == 0 ){
		var html = '<div id="WFmenuContainer'+uniqueid+'" class="WFHidden WFmenuContainer">'+
						'<div id="WFmenuTop'+uniqueid+'" class="WFmenuTop">'+
							'<div id="WFmenuTitle'+uniqueid+'" class="WFmenuTitle">'+title+'</div>'+
							'<div id="WFmenuClose'+uniqueid+'" class="WFmenuClose"><img src="'+iMenuClose+'"></div>'+
						'</div>'+
						'<div id="WFmenuBottom'+uniqueid+'" class="WFmenuBottom">'+
							'<div id="WFmenuContent'+uniqueid+'" class="WFmenuContent"><img src="'+iMenuLoading+'"> Loading...</div>'+
						'</div>'+
					'</div>'
		$('body').append(html);
		$('#WFmenuClose'+uniqueid).click(function (){
			$('#WFmenuContainer'+uniqueid).fadeOut("normal");
		});
	}
}
function WF_CaptureGameInfo(gameid,fn){
	if ( !gameid ){ fn();return false; }
	if ( GM_getValue(who+'.'+gameid+'.info') ){
		fn(gameid,eval(GM_getValue(who+'.'+gameid+'.info')));
	} else {
		$.getJSON('http://warfish.net/war/services/rest?_method=warfish.tables.getState&_format=json&sections=players&gid='+gameid,function(getstate){
			$.getJSON('http://warfish.net/war/services/rest?_method=warfish.tables.getDetails&_format=json&sections=map,rules&gid='+gameid,function(getdetails){
				$('body')
					.append('<rsp id="rules"/>')
					.children('#rules')
					.load('http://warfish.net/war/play/gamedetails?t=r&gid='+gameid+' table[cellspacing="2"]',function(){
						var P = getstate['_content']['players']['_content']['player'];
						var C = getdetails['_content']['map']['_content']['color'];
						var R = getdetails['_content']['rules'];
						R.b = ( X = /(\d+)/.exec($('rsp nobr').eq(51).html()) )? X[1] : 1000 ;	// bonus armies per x country
						R.m = ( X = /(\d+)/.exec($('rsp nobr').eq(53).html()) )? X[1] : 0 ;		// minimum bonus armies
						R.n = ( $('rsp nobr').eq(17).html() == 'Off' )? '0' : '1' ;					// start with neutral countries?
						for ( i in P ) {
							var cid = parseInt(P[i].colorid-1);
							if( C[cid] ){ P[i].color=C[cid].red+','+C[cid].green+','+C[cid].blue; }else{ P[i].color='0,0,0'; }
						}
						var info = { rules:R, players:P };
						GM_setValue(who+'.'+gameid+'.info',info.toSource());
						fn(gameid,info);
					});
			});
		});
	}
}
function WF_CaptureGameName(gameid){
	var gamename = $('a[href*="../compete/tournament?tid="]');
	if ( gamename.length > 0 ){
		var G = eval(GM_getValue(who+'.gamenames'));
		G[gameid] = gamename.text();
		GM_setValue(who+'.gamenames',G.toSource());
	}
}
function CSSInsertDOM(){
	GM_addStyle(
	'rsp{display:none;}'+
	'body,div,table,tr,td,b,a,font,nobr {font-family:Arial;font-size:10pt;}'+

	'.WFBoardStatus th { background-color:#DDDDDD; text-decoration:none; padding-left:3px; padding-right:3px; } ' +
	'.WFBoardStatus tr:nth-of-type(1) th:nth-of-type(1){-moz-border-radius:3px 0px 0px 0px;text-align:left;} ' +
	'.WFBoardStatus td:nth-of-type(n+3) {text-align:right;} ' +
	'#WFHistory th { background-color:#DDDDDD; text-decoration:none; padding-left:3px; padding-right:3px; } ' +
	'#WFHistory tr:nth-of-type(1) th:nth-of-type(1){-moz-border-radius:3px 0px 0px 0px;text-align:left;} ' +
	'#WFHistory td:nth-of-type(n+3) {text-align:right;padding-left:5px;} ' +
	
	'#WFdisplay{' +
		'border:thin solid #87AFDA;' + // medium blue
		'background-color: #D4E6FC;' + // light blue
		'-moz-border-radius: 3px;' +
		'top:53px;' +
		'left:5px;' +
		'position:absolute;' +
		'z-index:200;}'+
	'#WFdisplaytitle{' +
		'color:#224499;' + // dark blue
		'float:left;' +
		'padding:5px;' +
		'white-space: nowrap;' +
		'font-size:12pt;' +
		'font-weight:bold;}'+
	'#WFdisplayrefresh, #WFdisplayclose{' +
		'float:right;' +
		'cursor:pointer;' +
		'padding-top:9px;}'+
	'#WFdisplayrefresh{ padding-left:15px; }' +
	'#WFdisplayclose{ padding-left:5px; padding-right:5px; }' +
	'#WFdisplaybottom{' +
		'border-top: thin solid #87AFDA;' + // medium blue
		'background-color: #EEFFEE;' + // light green
		'clear:both;' +
		'z-index:51;' +
		'padding:10px;}'+
	
	'.WFoutline{' +
		'background-color: #F0F4FA;' + // really light blue
		'border:thin solid #000000;' +
		'-moz-border-radius: 2px;' +
		'padding:3px;}' +
		
	'.WFlink{' +
		'background-color: #D4E6FC;' +
		'border:thin solid #224499;' +
		'cursor:pointer;' +
		'margin-right:2px;' +
		'-moz-border-radius: 2px;' +
		'padding-left:3px;' +
		'padding-right:3px;' +
		'text-shadow: #777777 1px 1px 2px;}' +
	'span.WFlink, span.WFlink a{text-decoration:none;}' +
	'span.WFlink:link, span.WFlink a:link{color:#000000;}' +
	'span.WFlink:visited, span.WFlink a:visited{color:#000000;}' +
	'span.WFlink:hover, span.WFlink a:hover{color:#FFFFFF;}' +
	
	'#WFcolorpicker{' +
		'border:thin solid black;' +
		'position:relative;' +
		'background-color:#FFFFFF;' +
		'width:195px;' +
		'height:195px;' +
		'float:left;' +
		'top:2px;}' +

	'#WFquickpickpopup{' +
		'border:thin solid #87AFDA;' + // medium blue
		'background-color: #FFFFFF;' + // white
		'-moz-border-radius: 3px;' +
		'padding:5px;'+
		'visibility:hidden;'+
		'position:fixed;' +
		'z-index:200;}'+

	'.WFClear{clear:both;}'+
	'.WFHeader{background-color:#DDDDDD;}'+
	'.WFAlign{text-align:right;}'+
	'.WFLeft{float:left;}'+
	'.WFRight{float:right;}'+
	'.WFLight{background-color:#EFEFEF;}'+
	'.WFHidden{display:none;}'+
	'.WFCardRow{background-color:#D4E6FC}'+
	'.WFgraphname{padding-bottom:7px;padding-top:1px;padding-left:5px;}'+

	'.WFfriendConsole{' +
		'background-color:#DDDDDD;' +
		'padding:3px;}'+
	'.WFfriendTitle{' +
		'padding:4px;'+
		'font-size:16pt;}'+
	'.WFfriendRemove{'+
		'padding:2px;'+
		'cursor:pointer;}' +

	'table.WFquickpickinputs td{border:thin solid black;padding:3px;-moz-border-radius:3px;}'+
	'table.WFquickpickinputs a {position:relative;top:-2;}'+
	'center.WFtournamentcreateinputs nobr{border:thin solid black;padding:3px;-moz-border-radius:3px;margin:5px;width:250px;}'+
	'center.WFtournamentcreateinputs input {position:relative;top:2;margin-bottom:15px}'+
	
	'.WFmenuContainer{' +
		'border: thin solid #87AFDA;' + // medium blue
		'background-color: #D4E6FC;' + // light blue
		'-moz-border-radius: 3px;' +
		'top: 53px;' +
		'left: 5px;' +
		'position: absolute;' +
		'z-index: 200;}'+
	'.WFmenuTitle{' +
		'color:#224499;' + // dark blue
		'float:left;' +
		'padding:5px;' +
		'white-space: nowrap;' +
		'font-size:12pt;' +
		'font-weight:bold;}'+
	'.WFmenuRefresh{' +
		'float:right;' +
		'cursor:pointer;' +
		'padding-left:15px;' +
		'padding-top:9px;}'+
	'.WFmenuClose{' +
		'float:right;' +
		'cursor:pointer;' +
		'padding-left:5px;' +
		'padding-right:5px;' +
		'padding-top:9px;}'+
	'.WFmenuBottom{' +
		'border-top: thin solid #87AFDA;' + // medium blue
		'background-color: #EEFFEE;' + // light green
		'clear:both;' +
		'z-index:51;' +
		'padding:10px;}'+

	'.WFmessageBox{'+
		'background-color: #F0F4FA;' + // really light blue
		'border:3px solid #CCCCCC;' + // medium blue
		'-moz-border-radius: 3px;' +
		'padding:5px;}' +
	'#WFmessagepost{'+
		'position:relative;'+
		'top:2px;'+
		'border:3px solid #CCCCCC;' + // medium blue
		'background-color: #F0F4FA;' + // really light blue
		'-moz-border-radius: 3px;}' +
	'img#WFmessagepost:hover{border:3px solid #000000;cursor:pointer;}'+

	'.WFgraphleft{' +
		'float:left;' +
		'padding-right:5px;' +
		'padding-top:4px;' +
		'text-align:right;}'+
	'.WFgraphright{' +
		'float:left;' +
		'padding-top:5px;' +
		'width:201px;' +
		'background-image: url("'+iGraphBackground+'");}'
	);
}
function LossCalculator(mod,x){
	var ad = parseInt(mod[0]);
	var as = parseInt(mod[1]);
	var dd = parseInt(mod[2]);
	var ds = parseInt(mod[3]);
	var a = distribution(ad,as);
	var d = distribution(dd,ds);
	var c = a.combo * d.combo;
	var aloss = [0,0,0];
	var dloss = [0,0,0];
	if ( ad == 1 || dd == 1 ) {
		for ( aid in a.odds ) {
			for ( did in d.odds ) {
				var e = a.odds[aid][0] * d.odds[did][0];
				var f = ( a.odds[aid][1] > d.odds[did][1] ) ? true : false ;
				if(f)	{ aloss[0] += e; dloss[1] += e; }
				else	{ aloss[1] += e; dloss[0] += e; }
			}
		}
	} else {
		for ( aid in a.odds ) {
			for ( did in d.odds ) {
				var e = a.odds[aid][0] * d.odds[did][0];
				var f = ( a.odds[aid][2] > d.odds[did][2] ) ? true : false ;
				if ( a.odds[aid][1] > d.odds[did][1] ) {
					if(f)	{ aloss[0] += e; dloss[2] += e; }
					else	{ aloss[1] += e; dloss[1] += e; }
				} else {
					if(f)	{ aloss[1] += e; dloss[1] += e; }
					else	{ aloss[2] += e; dloss[0] += e; }
				}
			}
		}
	}
	function distribution(d,s){
		var z = { 'combo':Math.pow(s,d), 'odds':{} };
		for ( i=1,id=0; i < s+1; i++ ) {
			if ( d == 1 )			z.odds[id++] = [1,i];
			for ( j=1; j < i+1; j++ ) {
				switch ( d ) {
				case 3:
					if ( j == i )	z.odds[id++] = [3*j-2,i,j];
					else 				z.odds[id++] = [6*j-3,i,j];
					break;
				case 2:
					if ( j == i )	z.odds[id++] = [1,i,j];
					else 				z.odds[id++] = [2,i,j];
					break;
				}
			}
		}
		return z;
	}
	var losses = [];
	losses[0] = parseInt(x) * ( ( aloss[1] / c ) + ( aloss[2] / c * 2 ) );
	losses[1] = parseInt(x) * ( ( dloss[1] / c ) + ( dloss[2] / c * 2 ) );
	return losses;
}
function ScriptInsertDOM(URI,fn,objtest){
	if ( typeof objtest == 'undefined' ) {
		var script = document.createElement('script');
		script.src = URI;
		document.getElementsByTagName('head')[0].appendChild(script);
		script.addEventListener('load',function(ev){ fn(); },false);
	} else {
		fn();
	}
}

GM_log((new Date().getTime()-start)+' ms: '+where);