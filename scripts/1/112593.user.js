// ==UserScript==
// @name           Steam User Games Sorted
// @namespace      http://userscripts.org/users/99461
// @description    Allows sorting of user game lists
// @include        http://steamcommunity.com/id/*/games*
// @include        http://steamcommunity.com/profiles/*/games*
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=841fb00ecb0c197ec94e77f0db8e1b54&r=PG&s=64&default=identicon
// ==/UserScript==
// by HugePinball

function sortNumAsc(a,b){return a - b;}
function sortNumDesc(a,b){return b - a;}

// jQuery loading method by Joan Piedra: http://joanpiedra.com/jquery/greasemonkey/
var $;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All GM code must be inside this function
function letsJQuery() {
	// alert("jQuery v" + $().jquery + " loaded");
	
	var HoursPlayed = new Array();
	var GameName = new Array();
	var GameID = new Array();

	$('div.gameListRow').each(function(index){
		GameID.push($(this).attr('id').match(/game_(\d+)$/)[1]);
		GameName.push($(this).find('div.gameListRowItem > h4').html().replace(/('|")/g,""));
		$(this).attr('gamename', $(this).find('div.gameListRowItem > h4').html().replace(/('|")/g,""));
		$(this).attr('hoursplayed', function(){
			if($(this).find('div.gameListRowItem > h5').length>0){ return $(this).find('div.gameListRowItem > h5').html().match(/(\d+\.?\d?) hrs on record/)[1] * 10; }
			else{ return '0'; }
		});
			// $(this).find('div.gameListRowItem > h5').html().match(/(.+) hrs on record/)[1]);
		HoursPlayed.push($(this).attr('hoursplayed'));
	});


	var SortAsc  = ' &#9650';
	var SortDesc = ' &#9660';
	var SortNone = ' &nbsp;&nbsp;&nbsp;&nbsp;';
	
	$('div.games_list_tab_content').css('padding-top','12px');
	
	$('div.games_list_tab_content').prepend('<div id="gameListHeader"><div class="HeaderCell"><span id="SortID" class="SortButton"><div id="rALeft" /><div id="rAText">ID<span id="SortIDArrow">' + SortNone + '</span></div><div id="rARight" /></span></div><div class="HeaderCell"><span id="SortName" class="SortButton"><div id="rALeft" /><div id="rAText">Name<span id="SortNameArrow">' + SortAsc + '</span></div><div id="rARight" /></span></div><div class="HeaderCell"><span id="SortTime" class="SortButton"><div id="rALeft" /><div id="rAText">Hours Played<span id="SortTimeArrow">' + SortNone + '</span></div><div id="rARight" /></span></div></div>');

	$('div#gameListHeader').append($('div.games_list_tab_content > form'));
	$('div#gameListHeader').append('<br style="clear:left;" /><img width="1" height="11" border="0" src="http://steamcommunity.com/public/images/trans.gif">');
	$('div#gameListHeader > form').wrap('<div class="HeaderCell"></div>');
	
	$('div.HeaderCell').css({'float':'left', 'text-align':'center', 'align':'center'});
	$('span.SortButton').css({'cursor':'pointer','display':'inline-block', 'padding-right':'9px'});
	$('span#SortName').css('color','white');	//default sort
	
	$('div.games_list_tab_content > br').remove();
	
	var IDSortState = 0;
	var NameSortState = 1;
	var TimeSortState = 0;
	$('span#SortID').click(function() {
		if(IDSortState==1){
			IDSortState = 2;
			$('span#SortIDArrow').html(SortDesc);
			GameID.sort(sortNumDesc);
		}else{
			IDSortState = 1;
			NameSortState = 0;
			TimeSortState = 0;
			$('span#SortIDArrow').html(SortAsc);
			$('span#SortNameArrow').html(SortNone);
			$('span#SortTimeArrow').html(SortNone);
			GameID.sort(sortNumAsc);
		}
		for(i in GameID){
			$('div.games_list_tab_content').append($('div.games_list_tab_content > div#game_' + GameID[i]));
		}
		$('span#SortID').css('color','white');
		$('span#SortName').css('color','#939393');
		$('span#SortTime').css('color','#939393');
	});
	$('span#SortName').click(function() {
		if(NameSortState==1){
			NameSortState = 2;
			$('span#SortNameArrow').html(SortDesc);
			GameName.sort();
			GameName.reverse();
		}else{
			IDSortState = 0;
			NameSortState = 1;
			TimeSortState = 0;
			$('span#SortIDArrow').html(SortNone);
			$('span#SortNameArrow').html(SortAsc);
			$('span#SortTimeArrow').html(SortNone);
			GameName.sort();
		}
		for(i in GameName){
			$('div.games_list_tab_content').append($('div.gameListRow[gamename=' + GameName[i] + ']'));
		}
		$('span#SortID').css('color','#939393');
		$('span#SortName').css('color','white');
		$('span#SortTime').css('color','#939393');
	});
	$('span#SortTime').click(function() {
		if(TimeSortState==1){
			TimeSortState = 2;
			$('span#SortTimeArrow').html(SortAsc);
			HoursPlayed.sort(sortNumAsc);
			// need following for consistent sort order of same time achievements
			// GameName.sort();
			// GameName.reverse();
			// for(i in GameID){
				// $('div.games_list_tab_content').append($('div.games_list_tab_content > div#game_' + GameID[i]));
			// }
		}else{
			IDSortState = 0;
			NameSortState = 0;
			TimeSortState = 1;
			$('span#SortIDArrow').html(SortNone);
			$('span#SortNameArrow').html(SortNone);
			$('span#SortTimeArrow').html(SortDesc);
			HoursPlayed.sort(sortNumDesc);
			// need following for consistent sort order of same time achievements
			// GameName.sort();
			// for(i in GameID){
				// $('div.games_list_tab_content').append($('div.games_list_tab_content > div#game_' + GameID[i]));
			// }
		}
		for(i in HoursPlayed){
			$('div.games_list_tab_content').append($('div.gameListRow[hoursplayed=' + HoursPlayed[i] + ']'));
		}
		$('span#SortID').css('color','#939393');
		$('span#SortName').css('color','#939393');
		$('span#SortTime').css('color','white');
	});
	
}



