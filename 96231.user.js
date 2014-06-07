// ==UserScript==
// @name                        Neopets Dailies Links Adder
// @namespace                   Neopets - www.neopets.com
// @description			Adds links with timers for each of the dailies / wheels.
// @include                     http:/*neopets.*
// ==/UserScript==

(function()
{
	var url = document.URL;

	if (url.split('ad')[1] && !url.split('altador')[1])
	{
		return;
	}

	set_GM_Values(url);

	//create_Daily_Table_Old();
	create_Daily_Table_New();
}) ();

function sort_Array(arrayList, myUsername) {
	var x, y, placeholder;

	for (x=0; x<arrayList.length; x++)
	{
		for (y=0; y<(arrayList.length-1); y++)
		{
			if (GM_getValue(arrayList[y][1] + '_' + myUsername, '0') > GM_getValue(arrayList[y+1][1] + '_' + myUsername, '0'))
			{
				placeholder = arrayList[y+1];
				arrayList[y+1] = arrayList[y];
				arrayList[y] = placeholder;
			}
		}
	}

	return arrayList;
}

function create_Daily_Table_New() {
	var myElement = document.getElementsByClassName('sidebarModule')[2];

	if (!myElement) { return; }

	var myUsername = document.body.innerHTML.split('Welcome, <a href=')[1].split('userlookup.phtml?user=')[1].split('">')[0];

	var timed_Events = new Array(
		['Wheel of Excitement', 'excitement', 'http://www.neopets.com/faerieland/wheel.phtml'],
		['Wheel of Knowledge', 'knowledge_wheel', 'http://www.neopets.com/medieval/knowledge.phtml'],
		['Wheel of Mediocrity', 'mediocrity', 'http://www.neopets.com/prehistoric/mediocrity.phtml'],
		['Wheel of Misfortune', 'misfortune_wheel', 'http://www.neopets.com/halloween/wheel/index.phtml'],
		['Wheel of Slime', 'slime_wheel', 'http://www.neopets.com/games/play.phtml?game_id=807'],
		['Wheel of Monotony', 'monotony_wheel', 'http://www.neopets.com/prehistoric/monotony/monotony.phtml'],
		['Buried Treasure', 'buriedtreasure', 'http://www.neopets.com/pirates/buriedtreasure/index.phtml'],
		['Test Your Strength', 'strtest', 'http://www.neopets.com/halloween/strtest/index.phtml'],
		['The Neopian Lottery', '???', 'http://www.neopets.com/games/lottery.phtml'],
		['Coconut Shy', 'coconut_shy', 'http://www.neopets.com/halloween/coconutshy.phtml'],
		['Guess the Weight of the Marrow', '???', 'http://www.neopets.com/medieval/guessmarrow.phtml'],
		['Lost Desert Scratchcards', 'scratchcard', 'http://www.neopets.com/desert/sc/kiosk.phtml'],
		['Deserted Fairground Scratchcards', 'scratchcard', 'http://www.neopets.com/halloween/scratch.phtml'],
		['Ice Caves Scratchcards', 'scratchcard', 'http://www.neopets.com/winter/kiosk.phtml'],
		['Coltzan\'s Shrine', 'next_shrine', 'http://www.neopets.com/desert/shrine.phtml'],
		['Qasalan Expellibox', 'qasalan_expellibox', 'http://www.neopets.com/games/giveaway/giveaway_game.phtml'],
		['The Bank', 'bank_interest', 'http://www.neopets.com/bank.phtml'],
		['Stock Market', '???', 'http://www.neopets.com/stockmarket.phtml?type=list&bargain=true'],
		['Healing Springs', 'next_spring_heal', 'http://www.neopets.com/faerieland/springs.phtml'],
		['Shop of Offers', 'nextslorgpayout', 'http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes'],
		['Free Omelette', 'free_omelette', 'http://www.neopets.com/prehistoric/omelette.phtml'],
		['Giant Jelly', 'free_jelly', 'http://www.neopets.com/jelly/jelly.phtml'],
		['Fruit Machine', 'fruit_machine', 'http://www.neopets.com/desert/fruitmachine.phtml'],
		['Toy Chest', 'toychest', 'http://www.neopets.com/petpetpark/daily.phtml'],
		['Snowager', '???', 'http://www.neopets.com/winter/snowager.phtml'],
		['Tombola', 'next_tombola', 'http://www.neopets.com/island/tombola.phtml'],
		['Underwater Fishing', 'next_fishing', 'http://www.neopets.com/water/fishing.phtml'],
		['Deserted Tomb', 'deserted_tomb', 'http://www.neopets.com/worlds/geraptiku/process_tomb.phtml'],
		['Wise Old King', 'wise_king', 'http://www.neopets.com/medieval/wiseking.phtml'],
		['Grumpy Old King', 'grumpy_king', 'http://www.neopets.com/medieval/grumpyking.phtml'],
		['Blue Grundo Plushie', 'grundo_plushie', 'http://www.neopets.com/faerieland/tdmbgpop.phtml'],
		['Obsidian Quarry', 'next_quarry', 'http://www.neopets.com/magma/quarry.phtml'],
		['Lunar Temple', 'lunartemple', 'http://www.neopets.com/shenkuu/lunar/?show=puzzle'],
		['Apple Bobbing', 'next_apple', 'http://www.neopets.com/halloween/applebobbing.phtml'],
		['Altador Plot Prize', 'next_altador_prize', 'http://www.neopets.com/altador/council.phtml']
	);

	timed_Events = sort_Array(timed_Events, myUsername);

	var extraHTML = '';
	var qqHTML = '';
	var newHTML = '<table width="158" cellpadding="2" cellspacing="0" border="1" class="sidebarTable"><tr><td>Page loaded at: ' + document.getElementById('nst').innerHTML + '</td></tr></table>';
	newHTML += '<table width="158" id="eventlist" cellpadding="2" cellspacing="0" border="1" class="sidebarTable"><tr><td colspan="2">Timed Events <div>(<a id="eventhider" href="#" onclick="return false;">hide waiting</a>)</div></td></tr>';
	newHTML += '<tr><th>Name</th><th>Next</th></tr>';

	for (x in timed_Events) {
		if (timed_Events[x][1] != '???')
		{
			var current_Time_Left = get_Time_Until(GM_getValue(timed_Events[x][1] + '_' + myUsername, '0'));

			if (current_Time_Left == '<font color="red">Now</font>')
			{
				newHTML += '<tr><td><a href="' + timed_Events[x][2] + '">' + timed_Events[x][0] + '</a></td><td>' + current_Time_Left + '</td></tr>';
			}
			else
			{
				extraHTML += '<tr><td><a href="' + timed_Events[x][2] + '">' + timed_Events[x][0] + '</a></td><td>' + current_Time_Left + '</td></tr>';
			}
		}
		else
		{
			qqHTML += '<tr><td><a href="' + timed_Events[x][2] + '">' + timed_Events[x][0] + '</a></td><td>???</td></tr>';
		}
	}

	newHTML += extraHTML + qqHTML + '</table>';

	myElement.innerHTML = myElement.innerHTML + newHTML;


	if (GM_getValue('eventhider', 'show') == 'hide')
	{
		hide_Waiting_Events();
	}
	else
	{
		document.getElementById('eventhider').addEventListener('click', hide_Waiting_Events, false);
	}
}

function set_GM_Values(url) {
	var myUsername = document.body.innerHTML.split('Welcome, <a href=')[1].split('userlookup.phtml?user=')[1].split('">')[0];

	if (url.match('buriedtreasure.phtml'))
	{
		if (document.body.innerHTML.split('Sorry, you have to wait another')[1])
		{
			minutesLeft = document.body.innerHTML.split('Sorry, you have to wait another')[1].split('minutes to play')[0];
			GM_setValue('buriedtreasure_' + myUsername, get_Unix_Time(minutesLeft).toString());
		}
		else
		{
			GM_setValue('buriedtreasure_' + myUsername, get_Unix_Time(180).toString());
		}
	}
	else if (url.match('prehistoric/mediocrity.phtml'))
	{
		if (!document.body.innerHTML.split("Hey... you can't spin right now...")[1])
		{
			GM_setValue('mediocrity_' + myUsername, get_Unix_Time(40).toString());
		}
	}
	else if (url.match('prehistoric/monotony/monotony.phtml'))
	{
		GM_setValue('monotony_wheel_' + myUsername, tomorrow_UNIX().toString());
	}
	else if (url.match('medieval/knowledge.phtml'))
	{
		GM_setValue('knowledge_wheel_' + myUsername, tomorrow_UNIX().toString());
	}
	else if (url.match('desert/fruitmachine2.phtml'))
	{
		GM_setValue('fruit_machine_' + myUsername, tomorrow_UNIX().toString());
	}
	else if (url.match('geraptiku/process_tomb.phtml'))
	{
		GM_setValue('deserted_tomb_' + myUsername, tomorrow_UNIX().toString());
	}
	else if (url.match('medieval/grumpyking2.phtml'))
	{
		GM_setValue('grumpy_king_' + myUsername, tomorrow_UNIX().toString());
	}
	else if (url.match('medieval/process_wiseking.phtml'))
	{
		GM_setValue('wise_king_' + myUsername, tomorrow_UNIX().toString());
	}
	else if (url.match('petpetpark/daily.phtml'))
	{
		GM_setValue('toychest_' + myUsername, tomorrow_UNIX().toString());
	}
	else if (url.match('lunar/results.phtml'))
	{
		GM_setValue('lunartemple_' + myUsername, tomorrow_UNIX().toString());
	}
	else if (url.match('halloween/applebobbing.phtml'))
	{
		GM_setValue('next_apple_' + myUsername, tomorrow_UNIX().toString());
	}
	else if (url.match('/bank.phtml'))
	{
		if (document.body.innerHTML.split('You have already collected your interest')[1])
		{
			GM_setValue('bank_interest_' + myUsername, tomorrow_UNIX().toString());
		}
	}
	else if (url.match('faerieland/tdmbgpop.phtml'))
	{
		if (!document.body.innerHTML.split('Somebody has left their Blue Grundo Plushie here.')[1])
		{
			GM_setValue('grundo_plushie_' + myUsername, tomorrow_UNIX().toString());
		}
	}
	else if (url.match('jelly/jelly.phtml') && document.body.innerHTML.split('only one helping per')[1])
	{
		GM_setValue('free_jelly_' + myUsername, tomorrow_UNIX().toString());
	}
	else if (url.match('prehistoric/omelette.phtml') && document.body.innerHTML.split('You approach the massive ome')[1])
	{
		GM_setValue('free_omelette_' + myUsername, tomorrow_UNIX().toString());
	}
	else if (url.match('magma/quarry.phtml'))
	{
		GM_setValue('next_quarry_' + myUsername, tomorrow_UNIX().toString());
	}
	else if (url.match('island/tombola2.phtml'))
	{
		GM_setValue('next_tombola_' + myUsername, tomorrow_UNIX().toString());
	}
	else if (url.match('halloween/coconutshy.phtml'))
	{
		GM_setValue('coconut_shy_' + myUsername, tomorrow_UNIX().toString());
	}
	//else if (url.match('process_stockmarket.phtml'))
	//{
	//	GM_setValue('stock_market_' + myUsername, tomorrow_UNIX().toString());
	//}
	else if (url.match('faerieland/wheel.phtml'))
	{
		if (!document.body.innerHTML.split("Alas, you've already spun this wheel")[1])
		{
			GM_setValue('excitement_' + myUsername, get_Unix_Time(120).toString());
		}
	}
	else if (url.match('faerieland/springs.phtml'))
	{
		if (document.body.innerHTML.split('says a few magical words')[1])
		{
			GM_setValue('next_spring_heal_' + myUsername, get_Unix_Time(30).toString());
		}
	}
	else if (url.match('halloween/wheel/index.phtml'))
	{
		if (!document.body.innerHTML.split("Now, why would you want to risk bringing misfortune down upon your head again so soon")[1])
		{
			GM_setValue('misfortune_wheel_' + myUsername, get_Unix_Time(120).toString());
		}
	}
	else if (url.match('halloween/strtest/index.phtml'))
	{
		if (!document.body.innerHTML.split("You've already played this game within")[1])
		{
			GM_setValue('strtest_' + myUsername, get_Unix_Time(360).toString());
		}
	}
	else if (url.match('desert/shrine.phtml') && document.body.innerHTML.split('walks slowly up to')[1])
	{
		if (!document.body.innerHTML.split('Maybe you should wait a while')[1])
		{
			GM_setValue('next_shrine_' + myUsername, get_Unix_Time(720).toString());
		}
	}
	else if (url.match('water/fishing.phtml') && document.body.innerHTML.split('reel in your line and get')[1])
	{
		if (!document.body.innerHTML.split('Maybe you should be more patient')[1])
		{
			GM_setValue('next_fishing_' + myUsername, get_Unix_Time(720).toString());
		}
	}
	//else if (url.split('play_flash')[1])
	else if (url.split('play.phtml')[1])
	{
		if (url.match('game_id=807'))
		{
			GM_setValue('slime_wheel_' + myUsername, get_Unix_Time(480).toString());
		}
	}
	else if (url.split('mall/shop.phtml?page=giveawa')[1])
	{
		if (!document.body.innerHTML.split("can't just dump them")[1])
		{
			GM_setValue('qasalan_expellibox_' + myUsername, get_Unix_Time(480).toString());
		}
	}
	else if (url.split('altador/council.phtml?prhv')[1])
	{
		GM_setValue('next_altador_prize_' + myUsername, tomorrow_UNIX().toString());
	}

	if (document.body.innerHTML.split('Thanks for buying a scratch')[1])
	{
		GM_setValue('scratchcard_' + myUsername, get_Unix_Time(240).toString());
	}

	if (document.body.innerHTML.split('from what seems to be a very rich Slorg')[1])
	{
		GM_setValue('nextslorgpayout_' + myUsername, tomorrow_UNIX().toString());
	}
}

function hide_Waiting_Events() {
	var eventTable = document.getElementById('eventlist');
	var eventRows = eventTable.rows;
	var erlength = eventRows.length;
	var eventHider = document.getElementById('eventhider');

	for (i=2; i<erlength; i++)
	{
		if (!eventRows[i].cells[1].innerHTML.split('font color="red"')[1] && eventRows[i].cells[1].innerHTML != '???')
		{
			eventRows[i].setAttribute('style', 'display: none; visibility: hidden;');
		}
	}

	GM_setValue('eventhider', 'hide');
	eventHider.innerHTML = 'show waiting';
	eventHider.removeEventListener('click', hide_Waiting_Events, false);
	eventHider.addEventListener('click', show_Waiting_Events, false);
}

function show_Waiting_Events() {
	var eventTable = document.getElementById('eventlist');
	var eventRows = eventTable.rows;
	var erlength = eventRows.length;
	var eventHider = document.getElementById('eventhider');

	for (i=2; i<erlength; i++)
	{
		if (!eventRows[i].cells[1].innerHTML.split('font color="red"')[1]  && eventRows[i].cells[1].innerHTML != '???')
		{
			eventRows[i].setAttribute('style', 'display: table-row; visibility: visible;');
		}
	}

	GM_setValue('eventhider', 'show');
	eventHider.innerHTML = 'hide waiting';
	eventHider.removeEventListener('click', show_Waiting_Events, false);
	eventHider.addEventListener('click', hide_Waiting_Events, false);
}

function tomorrow_UNIX() {
	if (!document.getElementById('nst')) { return; }

	var currentNST = document.getElementById('nst').innerHTML;

	var patt1 = /\d+/g;
	var times = currentNST.match(patt1);

	if (!times)
	{
		return;
	}

	var currentHour = times[0];
	var currentMinute = times[1];
	var currentSecond = times[2];

	var ampm = currentNST.split(currentSecond + ' ')[1].split(' NST')[0];

	var hoursTil = 12-currentHour;

	if (currentHour == '12')
	{
		hoursTil = 12;
	}

	if (ampm == "am")
	{
		hoursTil += 12;
	}

	var minutesTil = 60-currentMinute;
	if (minutesTil > 0) { hoursTil -= 1; }
	var secondsTil = 60-currentSecond;

	now = new Date().getTime();
	addition = ((hoursTil * 3600) + (minutesTil * 60) + secondsTil) * 1000;
	tomorrow = now + addition;

	return tomorrow;
}
	

function get_Unix_Time(minutes) {
	currentTime = new Date().getTime();
	newTime = currentTime + (minutes * 60 * 1000) + 20;

	return newTime;
}

function get_Time_Until(time) {
	currentTime = new Date().getTime();
	timeTil = (time - currentTime) / 1000;

	var answer = '';
	var hours, minutes = 0;

	if (timeTil >= 3600)
	{
		hours = parseInt(Math.floor(timeTil / 3600));
		timeTil = timeTil % 3600;

		answer = hours + 'h';
	}

	if (timeTil >= 60)
	{
		minutes = Math.floor(timeTil / 60);
		timeTil = timeTil % 60;

		answer = answer + minutes + 'm';
	}

	if (timeTil > 0 && !hours)
	{
		answer = answer + Math.floor(timeTil) + 's';
	}

	if (timeTil <= 0 && !answer)
	{
		answer = '<font color="red">Now</font>';
	}

	return answer;
}