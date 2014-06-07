// ==UserScript==
// @name           Facebook App Re-Title
// @namespace      http://userscripts.org/people/14536
// @description    Changes the title of Facebook application pages to one that is more descriptive.
// @include        http://apps.facebook.com/*
// @include        http://www.facebook.com/apps/application.php?*
// @author         Vaughan Chandler
// ==/UserScript==

// Last updated on 2008-02-28

if (top != self) { return; }

var loc = window.location.href.toLowerCase();

if (loc.indexOf('http://www.facebook.com/apps/application.php?') != -1) {
	document.title = document.title.replace('Facebook | ','') + ' Application';
	return;
}

var format = GM_getValue('format', -1);
if (format == -1) {
	format = '%p - %a';
	GM_setValue('format', format);
}


var buf = loc.match(/http:\/\/apps\.facebook\.com\/([^\/]+)\//);

var appID = buf[1];

var appURL = buf[0];

//window.alert(loc + '\n' + appURL);

function page(address, title) {
	this.address = address;
	this.title = title;
	this.matches = function() { return loc.indexOf(appURL + address) != -1; }
}

function page2(address, title, altTitle) {
	this.address = address;
	try { eval('this.title = ' + title); }
	catch(x) { this.title = altTitle; }
	this.matches = function() { return loc.indexOf(appURL + address) != -1; }
}

function app(name, defaultTitle, titles) {
	this.name = name;
	this.defaultTitle = defaultTitle;
	this.titles = titles;
}

var info = -1;

//		new page('', ''),

if (appID == 'ghostracer') {
	info = new app('Ghost Racer', 'Home', new Array(
		new page('buy_cars.php', 'Buy Cars'),
		new page('buy_upgrades.php', 'Buy Upgrades'),
		new page('find_racers.php', 'Find Racers'),
		new page('help.php', 'Help'),
		new page('index.php', 'Home'),
		new page('invite.php', 'Invite'),
		new page('leader_board.php', 'Leader Board'),
		new page('race_friends.php', 'Start Race'),
		new page('race.php', 'Race'),
		new page2('racer.php', 'document.getElementById("content").getElementsByTagName("h2")[0].innerHTML', 'Racer')
	));
}

else if (appID == 'proracer') {
	info = new app('Pro Racer', 'Home', new Array(
		new page('awards', 'Awards'),
		new page('bodyshop', 'Body'),
		new page('carselect', 'Garage'),
		new page('home', 'Home'),
		new page('node/4', 'FAQ'),
		new page('poll', 'Poll'),
		new page('race/display', 'Results'),
		new page('race', 'Race'),
		new page('rankings', 'Ranking'),
		new page('showroom', 'Dealership'),
		new page('upgrades', 'Tune'),
		new page('worldrankings', 'Top Scores')
	));
}

else if (appID == 'speedracer') {
	info = new app('Speed Racing', 'Summary', new Array(
		new page('index.php', 'Summary'),
		new page('cars.php', 'Cars'),
		new page('customize.php', 'Customize'),
		new page('upgrades.php', 'Upgrades'),
		new page('friends.php', 'Friends'),
		new page('invitation.php', 'Invite'),
		new page('help.php', 'Help'),
		new page('race.php', 'Race')
	));
}

else if (appID == 'texas_holdem') {
	info = new app('Texas Holdem', 'Play', new Array(
		new page('playa.php', 'Profile'),
		new page('new_invite.php', 'Invite'),
		new page('settings.php', 'Settings'),
		new page('leader_board.php', 'Leader Board'),
		new page('earn_chips.php', 'Get Chips'),
		new page('helpframe.php', 'Help')
	));
}

else if (appID == 'scramblegame') {
	info = new app('Scramble', 'My Games', new Array(
		new page('index.php?mode=tb', 'My Games'),
		new page('index.php?mode=live', 'Live Games'),
		new page('createtb.php?mode=create', 'Create Game'),
		new page('play.php?mode=live', 'Live Play'),
		new page('profile.php', 'Profile'),
		new page('leader_board.php', 'Leader Board'),
		new page('invite.php', 'Invite'),
		new page('about.php', 'About'),
		new page('play.php', 'Play')
	));
}


else if (appID == 'flixster') {
	info = new app('Movies', 'Home', new Array(
		new page('home', 'Home'),
		new page2('u/', 'document.getElementById("content").getElementsByTagName("h1")[0].innerHTML.split(" ")[0] + "\'s Movies"', 'Movies'),
		new page('friends-movies', 'Friends\' Movies'),
		new page('movies-in-theaters', 'In Theaters'),
		new page('quick-rate', 'Quick-Rate'),
		new page('videos', 'Videos'),
		new page('nemq', 'Never-Ending Quiz'),
		new page('invite', 'Invite'),
		new page('quiz', 'User Quizes'),
		new page('mct', 'MCT'),
		new page('update-profile-settings', 'Profile Settings'),
		new page('help', 'Help'),
		new page('auth/account', 'Account')
	));
}

else if (appID == 'fbtetris') {
	info = new app('Block Star', 'Play', new Array(
		new page('index.php?m=playgame2', 'Play'),
		new page('index.php?m=leaderboard', 'Leaderboard'),
		new page('index.php?m=invite', 'Invite'),
		new page('index.php?m=howtoplay', 'How To Play'),
		new page('index.php?m=', '')
	));
}

else if (appID == 'black_jack') {
	info = new app('Black Jack', 'Play', new Array(
		new page('playa.php', 'Profile'),
		new page('leader_board.php', 'Leader Board'),
		new page('invite_condensed.php', 'Invite'),
		new page('earn_chips.php', 'Get Chips'),
		new page('helpframe.php', 'Help')
	));
}

else if (appID == 'topeight') {
	info = new app('Top Friends', 'News', new Array(
		new page('?home', 'News'),
		new page('?edit', 'Edit'),
		new page('?visper', 'Visual Personality'),
		new page('?coolapps', 'Cool Apps'),
		new page('?network', 'Network'),
		new page('?mystuff', 'My Stuff'),
		new page('?help', 'Help'),
		new page('?share', 'Invite'),
		new page('?settings', 'Settings')
	));
}

else if (appID == 'fluff') {
	info = new app('(fluff)Friends', 'Home', new Array(
		new page('main.php', 'Home'),
		new page2('fluffbook.php', 'document.getElementById("content").getElementsByTagName("h3")[1].innerHTML', '(fluff)Book'),
		new page('all_petting.php', 'Recent Petters'),
		new page('fluffedit.php', '(fluff)Editor'),
		new page('rename.php', 'Rename'),
		new page('edit.php', 'Adopt'),
		new page('privacy.php', 'Privacy'),
		new page('art.php', 'Art'),
		new page('fluffshop.php', 'Shop'),
		new page('food_shop.php', 'Food Shop'),
		new page('habitats_shop.php', 'Habitats Shop'),
		new page('minis_shop.php', 'Minis Shop'),
		new page('decorations_shop.php', 'Decorations Shop'),
		new page('gold_shop.php', 'Golden (fluff)Shop'),
		new page('limited_shop.php', 'Limited Edition Shop'),
		new page('invite_shop.php', 'Invite Bonus Shop'),
		new page('fluffrace.php', '(fluff)Race'),
		new page('fluffrace_finder.php', 'Challenge a Friend'),
		new page('fluffrace_report.php', '(fluff)Race Challenge Report'),
		new page('fluffrace_shop.php', '(fluff)Race Pro Shop'),
		new page('gift_giver.php', 'Gift Giver'),
		new page('all_gifts.php', 'Gift History'),
		new page('munny_and_gold.php', 'Munny/Gold FAQ'),
		new page('survey.php', 'Surveys'),
		new page('offers.php', 'Offers'),
		new page('buy_gold.php', 'Buy Gold'),
		new page('gold_exchange.php', 'Gold Exchange'),
		new page('faq.php', 'FAQ'),
		new page('invite.php', 'Invite'),
		new page('store.php', 'Merchandise'),
		new page('chat.php', 'Chat'),
		new page('photos.php', '(fluff)Gallery'),
		new page('all_news.php', 'News')
	));
}

if (info != -1) {
	var time = '';
	var time2 = '';
	if (format.toLowerCase().indexOf('%t')!=-1) {
		var d = new Date();
		time = d.getHours() + ':' + (d.getMinutes()<10 ? '0' + d.getMinutes() : d.getMinutes());
		time2 = time + ':' + (d.getSeconds()<10 ? '0' + d.getSeconds() : d.getSeconds());
	}
	if (loc == appURL) {
		document.title = format.replace('%p',info.defaultTitle).replace('%a',info.name).replace('%t',time).replace('%T',time2);
	} else {
		var found = false;
		for (var i=0; i<info.titles.length; i++) {
			if (info.titles[i].matches()) {
				document.title = format.replace('%p',info.titles[i].title).replace('%a',info.name).replace('%t',time).replace('%T',time2);
				found = true;
				break;
			}
		}
		if (!found) {
			document.title = info.name;
		}
	}
} else {
	document.title = document.title.replace('Facebook |','');
}