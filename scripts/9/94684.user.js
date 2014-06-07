// ==UserScript==
// @name           Steam Achievements Sorted
// @namespace      http://userscripts.org/users/99461
// @description    Allows sorting of Steam Achievements
// @include        http://steamcommunity.com/id/*/stats/*
// @include        http://steamcommunity.com/profiles/*/stats/*
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
	
	var UnlockTimes = new Array();
	var AchievementNames = new Array();
	var AchievementNumber = new Array();

	$('div#personalAchieve > div.achieveImgHolder').each(function(index){
		var i = index + 1;
		if (i < 10) { i = '0' + i; }
		$(this).add($(this).nextUntil('div.achieveImgHolder')).slice(0,5).wrapAll('<div id="a' + i + '" class="achieveRow" />');
		AchievementNumber.push(i);
	});

	$('div.achieveRow').each(function(index){
		var t = $(this).find('div.achieveUnlockTime').html();
		if(t){
			t = t.replace(/Unlocked: (.*)/, "$1");
			if (t.match(/.*pm/)){
				if(t.match(/12:\d\dpm/)){ t = t.replace(/(.* )12(:\d{2})pm/, "$1" + "00" + "$2"); }
				else{
					var h = parseInt(t.match(/.* (\d{1,2}):\d{2}pm/)[1]) + 12;
					t = t.replace(/(.* )(\d{1,2})(:\d{2})pm/, "$1" + h + "$3");
				}
			}
			else if (t.match(/12:\d\dam/)){ t = t.replace(/(.* )12(:\d{2})am/, "$1" + "00" + "$2"); }
			else { t = t.replace(/(.*)am/, "$1"); }
			var d = new Date(t);
			$(this).attr('unlocktime', d.valueOf());
			UnlockTimes.push(d.valueOf());
			
			var name = $(this).find('div.achieveTxt > h3').html().replace(/('|")/g,"");
			$(this).attr('achieveName', name);
			AchievementNames.push(name);
		}
	});
	
	var SortAsc  = ' &#9650';
	var SortDesc = ' &#9660';
	var SortNone = ' &nbsp;&nbsp;&nbsp;&nbsp;';
	
	$('div.achieveRow[unlocktime]').wrapAll('<div id="UnlockedAchievements" />');
	
	$('div#personalAchieve').prepend('<div id="achieveRowHeader"><div class="HeaderCell" style="width: 64px; padding-right: 9px"><span id="SortDefault" class="SortButton"><div id="rALeft" /><div id="rAText">Add<span id="SortDefArrow">' + SortAsc + '</span></div><div id="rARight" /></span></div><div class="HeaderCell" style="width: 150px; padding-right: 400px;"><span id="SortName" class="SortButton"><div id="rALeft" /><div id="rAText">Name<span id="SortNameArrow">' + SortNone + '</span></div><div id="rARight" /></span></div><div class="HeaderCell" style="width: 197px;"><span id="SortTime" class="SortButton"><div id="rALeft" /><div id="rAText">Unlock Time<span id="SortTimeArrow">' + SortNone + '</span></div><div id="rARight" /></span></div><br style="clear:left;" /><img width="1" height="11" border="0" src="http://steamcommunity.com/public/images/trans.gif"></div>');
	
	$('div.HeaderCell').css({'float':'left', 'text-align':'center', 'align':'center'});
	$('span.SortButton').css({'cursor':'pointer','display':'inline-block'});
	$('span#SortDefault').css('color','white');	//default sort
	
	var NumSortState = 1;
	var NameSortState = 0;
	var TimeSortState = 0;
	$('span#SortDefault').click(function() {
		if(NumSortState==1){
			NumSortState = 2;
			$('span#SortDefArrow').html(SortDesc);
			AchievementNumber.sort(sortNumDesc);
		}else{
			NumSortState = 1;
			NameSortState = 0;
			TimeSortState = 0;
			$('span#SortDefArrow').html(SortAsc);
			$('span#SortNameArrow').html(SortNone);
			$('span#SortTimeArrow').html(SortNone);
			AchievementNumber.sort(sortNumAsc);
		}
		for(i in AchievementNumber){
			$('div#UnlockedAchievements').append($('div#UnlockedAchievements > div#a' + AchievementNumber[i]));
		}
		$('span#SortDefault').css('color','white');
		$('span#SortName').css('color','#939393');
		$('span#SortTime').css('color','#939393');
	});
	$('span#SortName').click(function() {
		if(NameSortState==1){
			NameSortState = 2;
			$('span#SortNameArrow').html(SortDesc);
			AchievementNames.sort();
			AchievementNames.reverse();
		}else{
			NumSortState = 0;
			NameSortState = 1;
			TimeSortState = 0;
			$('span#SortDefArrow').html(SortNone);
			$('span#SortNameArrow').html(SortAsc);
			$('span#SortTimeArrow').html(SortNone);
			AchievementNames.sort();
		}
		for(i in AchievementNames){
			$('div#UnlockedAchievements').append($('div.achieveRow[achieveName="' + AchievementNames[i] + '"]'));
		}
		$('span#SortDefault').css('color','#939393');
		$('span#SortName').css('color','white');
		$('span#SortTime').css('color','#939393');
	});
	$('span#SortTime').click(function() {
		if(TimeSortState==1){
			TimeSortState = 2;
			$('span#SortTimeArrow').html(SortDesc);
			UnlockTimes.sort(sortNumDesc);
			// need following for consistent sort order of same time achievements
			AchievementNumber.sort(sortNumAsc);
			AchievementNumber.reverse(sortNumAsc);
			for(i in AchievementNumber){
				$('div#UnlockedAchievements').append($('div#UnlockedAchievements > div#a' + AchievementNumber[i]));
			}
		}else{
			NumSortState = 0;
			NameSortState = 0;
			TimeSortState = 1;
			$('span#SortDefArrow').html(SortNone);
			$('span#SortNameArrow').html(SortNone);
			$('span#SortTimeArrow').html(SortAsc);
			UnlockTimes.sort(sortNumAsc);
			// need following for consistent sort order of same time achievements
			AchievementNumber.sort(sortNumAsc);
			for(i in AchievementNumber){
				$('div#UnlockedAchievements').append($('div#UnlockedAchievements > div#a' + AchievementNumber[i]));
			}
		}
		for(i in UnlockTimes){
			$('div#UnlockedAchievements').append($('div.achieveRow[unlocktime=' + UnlockTimes[i] + ']'));
		}
		$('span#SortDefault').css('color','#939393');
		$('span#SortName').css('color','#939393');
		$('span#SortTime').css('color','white');
	});
	
}
