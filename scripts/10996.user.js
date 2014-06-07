// ==UserScript==
// @name		Gaia - Old Style Menu
// @description 	Adds the old style menu back to Gaia
// @include			*gaiaonline.com*
// @exclude			*gaiaonline.com/profile/index.php?view=profile.ShowProfile*
// @exclude			*gaiaonline.com/profile/?view=profile.ShowProfile*
// @exclude			*gaiaonline.com/profile/?controller=viewer*
// @exclude			*gaiaonline.com/forum/viewtopic.php?inline_review*
// @exclude			*gaiaonline.com/guilds/viewtopic.php?inline_review*
// @exclude			*index_mini.php*
// @exclude			*/gaia/manga.php*
// @exclude			*photobucket.com/svc/jwidget.php*
// @exclude			*gaiaonline.com/profiles/?u=*
//   This script originally created by Selphie, with only minor edits by NikoKun

// ==/UserScript==
(function() {

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

	addGlobalStyle('#directory, #footer, .messageContent strong {' +
				   		'display: none !important;' +

					'}' +
					'#mailbox, #threadsubscriptions, #journalsubscriptions, #guildspotlight, input, #signin form dl label, .btnSignup, .name {' +
						'font-size: 11px !important;' +
					'}' +
					'#signin {' +
						'position: absolute !important;' +
						'left: 600px !important;' +
						'top: 10px !important;' +
						'background-color: white;' +
						'-moz-border-radius: 15px;' +
						'padding-left: 10px;' + 
						'padding-top: 5px !important;' + 
						'height: 113px !important;' + 
						'border: 2px solid #657FCA !important;' + 
						'width: 350px !important;' +
						'z-index: 9 !important;' +
					'}' +
					'#signin fieldset {' +
						'position: relative; top: -10px; left: -130px;' +
					'}' +
					'.forgotpass {' +
						'position: relative;' +
						'width: 90px;' +
						'top: -95px;' +
						'left: 200px;' +
						'font-size: 11px !important;' +
					'}' +
					'.newhere {' +
						'position: absolute;' +
						'top: -18px;' +
						'left: 232px;' +
					'}' +
					'#content {' +
						'-moz-border-radius: 15px;' +
					'}' +
					'#sidebar {' +
						'top: -128px !important;' +
					'}' +
					'.imgAvatar {' +
						'position: absolute !important;' + 
						'right: -3px !important;' +
						'top: 10px !important;' +
					'}' +
					'.imgAvatar img {' +
						'height: 150px !important;' + 
						'width: 120px !important;' +
					'}' +
					'.topCorners, .bottomCorners, .twoColumnLayout h3, .oneColumnLayout h3  {' +
						'display: none !important;' + 
					'}' +
					'.changeMessages {' +
						'position: absolute !important;' + 
						'top: -2px !important;' + 
						'left: -262px !important;' + 
						'z-index: 10 !important;' + 
						'height: 118px !important;' + 
					'}' +
					'.changeMessages .messageContent {' +
						'width: 32px !important;' + 
					'}' +
					'.changeMessages .messageContent li {' +
						'width: 32px !important;' + 
						'overflow: hidden;' + 
					'}' +
					'.changeMessages .messageContent li a {' +
						'text-decoration: none;' + 
					'}' +
					'.messageContent li {' +
						'padding: 0px !important;' + 
					'}' +
					'li#rareItem {' +
						'position: relative !important;' + 
						'left: 1px !important;' + 
					'}' +
					'li#rareItemt a {' +
						'background-position: -1px !important;' + 
					'}' +
					'.twoColumnLayout, .oneColumnLayout {' +
						'width: 40px !important;' +
						'border-left: 2px solid #657FCA !important;' +
						'border-top: 2px solid #657FCA !important;' +
						'border-bottom: 2px solid #657FCA !important;' +
						'border-right: 0 !important;' +
						'background-color: white;' +
						'-moz-border-radius: 15px 0 0 15px ;' +
						'padding: 0 !important;' +
					'}' +
					'.accountState {' +
						'position: absolute !important;' +
						'top: -8px;' +
						'width: 188px !important;' +
					'}' +
					'.accountState p.userInfo {' +
						'position: relative !important;' +
						'width: 100% !important;' +
						'font-size: 11px !important;' +
						'font-weight: bold;' +
					'}' +
					'.goldmessage {' +
						'display: none;' +
					'}' +
					'.logout {' +
						'font-weight: normal !important;' +
					'}' +
					'#loggedIn {' +
						'left: 630px !important;' +
						'top: 53px !important;' +
						'background-color: white;' +
						'-moz-border-radius: 15px;' +
						'padding-left: 10px;' +
						'padding-top: 5px !important;' +
						'width: 315px !important;' +
						'height: 113px !important;' +
						'border: 2px solid #657FCA !important;' +
					'}' +
					'#loggedIn img { ' +
						'position: relative !important;' +
						'top: -20px !important;' +
					'}' +
					'#nav {' +
						'position: absolute !important;' +
						'left: 33% !important;' +
					'}' +
					'.subnav {' +
						'position: absolute !important;' +
						'right: 275px !important; ' +
					'}' +
					'#content {' +
						'background-color: white !important;' +
					'}' +
					'.logout a {' +
						'text-decoration: none !important;' +
					'}' +
					'#loggedin h3 {' +
						'font-weight: bold;' +
						'text-size: 11px !important;' +
					'}' +
					'#loggedin h3, #goldamount, #tickets {' +
						'position: relative;' +
						'top: 38px;' +
						'left: 3px;' +
					'}' +
					'#tickets {' +
						'left: -6px !important;' +
					'}' +

					'img[title="Golden Arrow"] {' +
						'display: none;' +
					'}' +
					'#navicons {' +
						'width: 192px !important;' +
						'margin: 0 !important;' +
						'margin-top: 5px !important;' +
						'z-index: 8 !important;' +
					'}' +
					'#navicons a:hover {' +
						'background-position: 0 -32px ;' +
					'}' +
					'select, input {' +
						'font-family: "Lucida Grande", LucidaGrande, Lucida, Verdana, Helvetica, Arial, sans-serif !important;' +
					'}' +
					'#results {' +
						'width: 70% !important;' +
						'margin-left: 150px;' +
					'}' +
					'#navicons a {' +
						'background-color: transparent;' +
						'background-repeat: repeat;' +
						'background-attachment: scroll;' +
						'-x-background-x-position: 0%;' +
						'-x-background-y-position: 0%;' +
						'-moz-background-clip: -moz-initial;' +
						'-moz-background-origin: -moz-initial;' +
						'-moz-background-inline-policy: -moz-initial;' +
						'float: left;' +
					'}' +
					'a#navsubscribe {' +
						'background-image: url("http://img352.imageshack.us/img352/9640/iconsubscribeke8.png");' +
					'}' +
					'a#navguild {' +
						'background-image: url("http://img254.imageshack.us/img254/3200/iconguildszr2.png");' +
					'}' +
					'a#navdress {' +
						'background-image: url("http://graphics.gaiaonline.com/images/customnav/iconDressup.png");' +
					'}' +
					'a#navforum {' +
						'background-image: url("http://graphics.gaiaonline.com/images/customnav/iconForum.png");' +
					'}' +
					'a#navmp {' +
						'background-image: url("http://graphics.gaiaonline.com/images/customnav/iconMarket.png");' +
					'}' +
					'a#navmap {' +
						'background-image: url("http://graphics.gaiaonline.com/images/customnav/iconMap.png");' +
					'}' +
					'a#navshop {' +
						'background-image: url("http://img352.imageshack.us/img352/5389/iconshopph6.png");' +
					'}' +
					'a#navnews {' +
						'background-image: url("http://graphics.gaiaonline.com/images/layout/gaialol/iconNews.png");' +
					'}' +
					'a#navtrade {' +
						'background-image: url("http://graphics.gaiaonline.com/images/layout/gaialol/iconTrade.png");' +
					'}' +
					'a#navfriend {' +
						'background-image: url("http://graphics.gaiaonline.com/images/layout/gaialol/iconFriend.png");' +
					'}' +
					'a#navEmail {' +
						'background-image: url("http://graphics.gaiaonline.com/images/layout/gaialol/iconEmail.png");' +
					'}' +
					'a#navquest {' +
						'background-image: url("http://graphics.gaiaonline.com/images/layout/gaialol/iconQuest.png");' +
					'}');

	var navbar = document.createElement("div");
	navbar.innerHTML = '<div id="navicons" style="position: absolute; left: 640px; top: 55px; ">' +
	    '<a title="View Announcements" href="http://www.gaiaonline.com/forum/viewtopic.php?mode=news" id="navnews">&nbsp;</a>' +
	    '<a title="Gaia Quests" href="http://www.gaiaonline.com/quest" id="navquest">&nbsp;</a>' +
	    '<a title="Current Trades" href="http://www.gaiaonline.com/gaia/bank.php" id="navtrade">&nbsp;</a>' +
	    '<a title="Friendlist" href="http://www.gaiaonline.com/profile/friendlist.php" id="navfriend">&nbsp;</a>' +
	    '<a title="Read/Write Messages" href="http://www.gaiaonline.com/profile/privmsg.php" id="navEmail">&nbsp;</a>' +
	    '<a title="View Subscribed Topics" href="http://www.gaiaonline.com/profile/subscription.php" id="navsubscribe">&nbsp;</a><br />' +
	    '<a title="Dress Up" href="http://www.gaiaonline.com/profile/inventory.php?mode=equip" id="navdress">&nbsp;</a>' +
	    '<a title="Gaia Forums" href="http://www.gaiaonline.com/forum/?" id="navforum">&nbsp;</a>' +
	    '<a title="View My Guilds" href="http://www.gaiaonline.com/guilds/index.php?gmode=myguilds" id="navguild">&nbsp;</a>' +
	    '<a title="Marketplace" href="http://www.gaiaonline.com/gaia/vend.php?" id="navmp">&nbsp;</a>' +
	    '<a title="World Map" href="http://www.gaiaonline.com/gaia/map.php" id="navmap">&nbsp;</a>' +
	    '<a title="Go Shopping" href="http://www.gaiaonline.com/gaia/shopping.php?" id="navshop">&nbsp;</a></div>';
	document.body.insertBefore(navbar, document.body.firstChild);

})()