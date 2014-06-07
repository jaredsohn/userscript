/*
	Credits:
	Bobby Heartrate for starting the Mafia Wars bookmarklet expedition. http://heartrate.se
	Vern Heart, lots of inspiration. http://vern.com/mwtools
	All fans out there that keep us motivated to continue!

	Bugs:
	- If target travels and money is gained, stats go wacko

	Todo:
	- Healing in different cities
	- Option to ignore/stop/travel back if city change is detected
	- Option to select what popups to show
	- Option to select how many ices/kills to get
	- ~400 other things.
*/

// ==UserScript==
// @name           Mafia Wars Go Fight 13
// @author         Mafia Wars Go Fight 13
// @description    Attacking
// @credits        Original Script by Spockholm
// ==/UserScript==

refresh_timer = false;
javascript:(function(){
	//begin unframe code
	if (navigator.appName == 'Microsoft Internet Explorer') {
		alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
		return;
	}
	if (/m.mafiawars.com/.test(document.location)) {
		window.location.href = document.location+'?iframe=1';
	}
	else if (/apps.facebook.com.inthemafia.$/.test(document.location)) {
		//go to insta-unframed to avoid popup problems
		window.location.href = 'http://facebook.mafiawars.zynga.com/mwfb/index2.php?skip_req_frame=1&mwcom=1';
	}
	else if (/apps.facebook.com.inthemafia/.test(document.location)) {
		//Credits to Toenailsin for this new fix
		for (var i = 0; i < document.forms.length; i++) {
			if (/canvas_iframe_post/.test(document.forms[i].id) && document.forms[i].target == "mafiawars") {
				document.forms[i].target = '';
				document.forms[i].submit();
				return;
			}
		}
	}
	else if (document.getElementById('some_mwiframe')) {
		// new mafiawars.com iframe
		window.location.href = document.getElementById('some_mwiframe').src;
		return;
	}
	else {
		document.body.parentNode.style.overflowY = "scroll";
		document.body.style.overflowX = "auto";
		document.body.style.overflowY = "auto";
		try {
			document.evaluate('//div[@id="mw_city_wrapper"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.margin = "auto";
			if (typeof FB != 'undefined') {
				FB.CanvasClient.stopTimerToSizeToContent;
				window.clearInterval(FB.CanvasClient._timer);
				FB.CanvasClient._timer = -1;
			}
			document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);

		} catch (fberr) {}
		//Revolving Revolver of Death from Arun, http://arun.keen-computing.co.uk/?page_id=33
		$('#LoadingBackground').hide();
		$('#LoadingOverlay').hide();
		$('#LoadingRefresh').hide();
		
		//fix for the broken popups when unframing FB
		function fix_block() {
			setTimeout(function(){
				//Thanks to Shih-Yuan Hsu for hints on how to optimize this
				$('#popup_fodder div:first').find("div[id^='pop_b']").each(function() {
					if (!$(this).attr('opened')) {
						$(this).css('display','block');
						$(this).attr('opened','yes');
					}
				});
			},500);
		}
		if (/snapi_auth_hash/.test(document.location)) {
			//popups appear to be broken on apps.facebook.com still, fix this
			document.getElementById('popup_fodder').addEventListener('DOMSubtreeModified', fix_block, false);
			//reset FB session
			FB.Connect.forceSessionRefresh();
		}
	}
	//end unframe code

	//hack to kill the resizer calls
	iframeResizePipe = function() {};

	//initial variables
	var version = 'Assassin-a-Nator v0.32b beta',
	userid = User.id,
	personid = User.id.substr(2),
	spocklet = 'aan',
	datastore = createStore(spocklet),
	bossenergy = parseInt($('#user_max_energy').html()*0.2).toFixed(0),
	tagname = spocklet+'_savecookie',
	start_time = 0,
	restarts = 0,
	restartlimit = 100,
	energy_ratio = 0, stamina_ratio = 0, combined_ratio = 0,
	fail = 0;
	run = false,
	use_hospital = true,
	hospital_city = 1,
	fightlist = 'fightlist',
	prev_won = 0,
	prev_lost = 0,
	prev_cash = 0,
	list_target = 0,
	raven_found = false;

	var xw_city = $('#mw_city_wrapper').attr('class').substr(7),
	start_city = active_city = xw_city;

	//objects for misc stuff
	var looted = {},
	attackResult = {},
	itemdatabase = {},
	cash = [],
	stats = {
		"money_gained": 0,
		"money_banked": 0,
		"stamina_used": 0,
		"exp_gained": 0,
		"attacks_done": 0,
		"success": 0,
		"failed": 0,
		"attack": 0,
		"attack_start": 0,
		"defense": 0,
		"defense_start": 0,
		"lootcount": 0,
		"vc_start": 0,
		"vc_count": 0,
		"iced": 0,
		"already_iced": 0,
		"iced_start": 0,
		"killed": 0,
		"killed_start": 0
	},
	target = {
		"start_health_pct": 0,
		"prev_health_pct": 0,
		"damage_done": 0,
		"maxhealth": 0,
		"attacks": 0,
		"health": 0
	},
	sortloot = ['none','quantity','best','attack','defense','active','from'],
	sortlootindex = 3,
	targets = [],
	whitelist = [],
	blacklist = [],
	popups = [],
	backgrounds = {
		1: "url('http://mwfb.static.zgncdn.com/mwfb/graphics/mafia_wars_928x56_03.jpg')",
		2: "url('')",
		3: "url('')",
		4: "url('http://mwfb.static.zgncdn.com/mwfb/graphics/mw_bangkok_header_760x56_03.gif')",
		5: "url('http://mwfb.static.zgncdn.com/mwfb/graphics/vegas_header_760x56_01.gif')",
		6: "url('http://mwfb.static.zgncdn.com/mwfb/graphics/italy_header_01.jpg')",
		7: "url('http://mwfb.static.zgncdn.com/mwfb/graphics/brazil_header_01.png')"
	},
	currencies = {
		"new_york": "$",
		"bangkok": "B$",
		"las_vegas": "V$",
		"italy": "L$",
		"brazil": "BRL$"
	};
	
	var fblike = '<iframe src="http://www.facebook.com/plugins/like.php?app_id=200681556646472&amp;href=http%3A%2F%2Fwww.facebook.com%2Fmafiatools&amp;send=false&amp;layout=button_count&amp;width=90&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:21px;" allowTransparency="true"></iframe>';
	
	if (typeof Item.Locations == 'object') {
		Locations = Item.Locations;
	}
	else {
		alert('Could not read Item.Locations from '+User.page+'. Using internal database instead.');
		Locations = {
			"1":{"name":"New York","loc_name":"New York","description":"","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=1&from=Job"},
			"2":{"name":"Cuba","loc_name":"Cuba","description":"","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=2&from=Job"},
			"3":{"name":"Moscow","loc_name":"Moscow","description":"","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=3&from=Job"},
			"4":{"name":"Bangkok","loc_name":"Bangkok","description":"","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=4&from=Job"},
			"5":{"name":"Las Vegas","loc_name":"Las Vegas","description":"","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=5&from=Job"},
			"6":{"name":"Italy","loc_name":"Italy","description":"","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=6&from=Job"},
			"7":{"name":"Challenge Mission","loc_name":"Challenge Mission","description":"","link":""},
			"8":{"name":"Gifting","loc_name":"Gifting","description":"","link":""},
			"9":{"name":"Marketplace","loc_name":"Marketplace","description":"","link":"remote\/html_server.php?xw_controller=marketplace&xw_action=view&xw_city=7&tmp=&cb=&xw_person=&mwcom=1"},
			"10":{"name":"Special Event","loc_name":"Special Event","description":"","link":""},
			"11":{"name":"Fighting","loc_name":"Fighting","description":"","link":"remote\/html_server.php?xw_controller=fight&xw_action=view&xw_city=7&tmp=&cb=&xw_person=&mwcom=1"},
			"12":{"name":"Robbing","loc_name":"Robbing","description":"","link":"remote\/html_server.php?xw_controller=robbing&xw_action=view&xw_city=7&tmp=&cb=&xw_person=&mwcom=1"},
			"13":{"name":"Operations","loc_name":"Operations","description":"","link":""},
			"14":{"name":"Property","loc_name":"Property","description":"","link":""},
			"15":{"name":"Declare War","loc_name":"Declare War","description":"","link":"remote\/html_server.php?xw_controller=war&xw_action=view&xw_city=7&tmp=&cb=&xw_person=&mwcom=1"},
			"16":{"name":"Mission","loc_name":"Mission","description":"","link":"remote\/html_server.php?xw_controller=index&xw_action=view&xw_city=7&tmp=&cb=&xw_person=&mwcom=1"},
			"17":{"name":"Zpoints\/RewardVille","loc_name":"Zpoints\/RewardVille","description":"","link":"remote\/html_server.php?xw_controller=index&xw_action=view&xw_city=7&tmp=&cb=&xw_person=&mwcom=1"},
			"18":{"name":"Brazil","loc_name":"Brazil","description":"Some shitty description","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=7&from=Job"},
			"19":{"name":"Secret Stash","loc_name":"Brazil","description":"Some shitty description","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=7&from=Job"},
			"20":{"name":"War","loc_name":"Brazil","description":"Some shitty description","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=7&from=Job"}
		};
	}
	
	function imgurl(img,w,h,a) {
		return '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/'+img+'" width="'+w+'" height="'+h+'" title="'+a+'" alt="'+a+'" align="absmiddle">';
	}

	//setup images
	var staminaimg = imgurl('icon_stamina_16x16.png','13','13','Stamina'),
	mafia_attack = imgurl('icon_mafia_attack_22x16_01.gif','22','16','Mafia Attack Strength'),
	mafia_defense = imgurl('icon_mafia_defense_22x16_01.gif','22','16','Mafia Defense Strength'),
	iced_image = imgurl('iced.png','18','18','Iced!'),
	loot_image = imgurl('inventory/ItemCard/icons/Inventory-gift-icon.png','16','16','Loot'),
	boost_image = imgurl('icon_boost_14x14_01.gif','14','14','Boost used');
	//sign = '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/brz_real_sm.png" width="15" height="15" align="middle" />',
	sign = '';
	var clockimg = 'data:image/gif;base64,R0lGODlhDwAPAPcAAAQCBJyaBERCFNTSBLSyBCQiBGxuBMTCBOzuBDQyBBQSBKSmBFRSFJSWFLSyFCQiJBQSFOTiBCwqBHR2BMTCFPz6BFxaBDw6BBwaBJyeFLy6FNzeFFxaFAwODJyeBExOFLy6BCQmBGxqFMTGBPT2BBQWBKyuBJyaFLS2FBQWFCwuBHx+BMzKFPz+BDw+BOTiFFxeFACHPwA2kgB+fOSchebnPxMTkgAAfCA0COmHApE2AHx+AGByLAAg7JINE3wAAP8PAP8AAP8AAP8AAF0AuAAA6JIAE3wAAIUAkucAAIEAAHwAAAAmAADlABY6FgB3AKDNGAOrAAC6AADcAEAAaBUA5xcAlgAAALjYD2rnABYTAAAAAAAmogDl6QA6EwB3AH4uAgBnAABpAMBmAAAAQwCIOgA2XAB+RP8Ab//wa//9df9/bf8EZf/obv8TdP8AZQBaIACIdQA2bgB+ZADEIADnRQATaQAAbgAqcwCIdBY2ZQB+bHMAAOMAAAAAAAAAAPRyAOYgABMNFgAAAJ8A3Ovw6IEAE3wAAEsUw+MAMYEAknwAfOAB3wIAMVEAkgAAfLgACGoABgEAFgAAAHQAOAAAAAAArAAAADBzAObjABMAAAAAADQMAADoAAATAMAAAKi1GPsr6RODEwB8ACAAnekA/5EAgHwAfGAApQAA/5IAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJIAAHwAAOoZAPQsAICDAHx8AAAwOADoABYTrAAAAAD0NQArBACDkgB8fLgAAGoAABYAAAAAAADR6AHp6AATEwAAAAAMdACh6ABPEwAAAPdaqPQA+4AAE3wAABw02OjpmhMTgwAAfLidqGpk/xaDgAB8fABw/wC9/wBP/wAA/wCcpQDI/wBPgAAAfLAAiCcBgRcAQgAAAAAwPADoAAATrAAAAAAAAAABAAAAAAAAAHi40QFk6RaDEwB8ABIBZAAAZAAAgwAAfLgAcycA4xcAAAB8AEM+ZDoEZACSgwB8fLguajlncRdpSABmACH5BAAAAAAALAAAAAAPAA8ABwiVAB90SNGBQQAKLA5k4DCwg0AACha0mEixhQkMADpAUDCioscBGDp0kOjRI4gUAiqULMmgwcqSDih4HJHAhYUJBCa+OODRAgYVJQCs0CmT4gEAA1pUQKCyRYQMFSUYWIniA0UPChCshNHBRAsECgKsHJECAoYIBC6sjBACQgcABbyWPCAh4wMIeEU42PBigwYRZSE8CAgAOw==';
	var ravenimg = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAAsTAAALEwEAmpwYAAACqElEQVR4nEXBz2sUZxgH8O/zvO/MvLuzu9kfjcaQhGAUjcRG/FHqD1oChTb1UFooHhSkUKG9lN5aCgX/Ag8eeiiIB0E8eyy1p4IBUbFQU5vuRgomsttmdzOzk5mded+nx34+tNBoJk5ycmdK5trV1dJkjdnAuiweiva1CdLNdtru3XzW+TezVgqdRsl2kQLoD4YfX1wCe5AAeRq9TGzQqE/vS5uxQXT75+HjYq+uPU7hAAA46SvMvovDK+Amejs83jWe5KZljp3HqTc/Wz7k4GnNekRWKSxaXFo+tvnt9Y5KScaY9KvzB8+cOLLd+2f99/Wo/fxBvxtqBSeoaA2oo0Z/FZZm8L8J4PqnZwEA1FIBAOOZN/yAFeAp+cMjDitXJlrwS0GjAehyo3Ll4mkAF6rNL2en6z7KEIhwAcyTRpSjqsMivjFTfr8xbpbU+SYtHJiaA7pR8mjYjXNYZo9ZGeIPlf/U5g+/+2YjiH7sbOdUdAfZk1tf4+1Vs7Xx9Le2mqg2aq1+PPIJzHCOCMCTu/fu/LRmKK4l2fefnMWhZbSOfrT6TivEif2lmtbi8lyctoJRngN0Y71dBDg+U/lgZWVx4ZRauvxeE90En19Yuv/or7XI1ZlTB01ATHIQspbaxRRfnHvr4cu/sbNXZ/wyRFWw/urVlvMs7Y3hLLEKWY1cUVfch/iQ8mD0w6+dUTSeK2g2KMJQ9UbFn4krBM7ZQPvKU3CiEnFdolSEfG/ayYFA75+a7OzszFXciwGJqe1mcYWV0T5PlsOeFDGziMDnB91BLSF/LLefvfBz9fy12swKP0sg8CzIWSWemZ+a2hr0CTR2UlG0YYqtQZpBdsm9tk6xzsWNIQSpEZTxTJLEuXULxtsT5xEC4gziiDJBSiSsU2cJYMWBk/8AIOI+VV13zTwAAAAASUVORK5CYII=" />';

	//setup the initial html
	var style = '<style type="text/css">'+
		'.messages {border: 1px solid #888888; margin-bottom: 5px; -moz-border-radius: 5px; border-radius: 5px; -webkit-border-radius: 5px;}'+
		'.messages img{margin:0 3px;vertical-align:middle}'+
		'.messages input {border: 1px solid #888888; -moz-border-radius: 3px; border-radius: 3px; -webkit-border-radius: 2px;padding 0;background: #000; color: #FFF; width: 32px;}'+
	'</style>';

	var logo = '<a href="http://www.spockholm.com/mafia/testing.php?Assassin-a-Nator" target="_blank"><img src="http://www.mafia-tools.com/uploads/banner-spockholm-mafia-tools.png?Assassin-a-Nator" alt="Spockholm Mafia Tools" title="Spockholm Mafia Tools" width="425" height="60" style="margin-bottom: 10px;" /></a>';
	var bankingrow = sign+' Bank above $<input id="'+spocklet+'_bankamount" name="'+tagname+'" type="text" value="10000" maxlength="9" style="width:65px" />';
	//bankingrow = '';

	var help_html =
	'<div id="'+spocklet+'_faq" style="z-index:100; display:none; position: relative; top: -150px; left: -130px;">'+
	'	<div style="display: block; left: 177px;" class="pop_box"><a class="pop_close" onclick="$(\'#'+spocklet+'_faq\').hide(); return false;" href="#"></a>'+
	'		<div style="padding: 0px 10px 10px 10px;">'+
	'			<h1>FAQ - Assassin-a-Nator</h1>'+
	'			<h2>Settings</h2>'+
	'			<p>There are many settings in this Spocklet, most are self explaning.<br />'+
	'			<a href="http://mwlootlady.blogspot.com/2011/06/assassin-nator-by-team-spockholm.html" target="_blank">MW LootLady writeup</a> on the Assassin-a-Nator first public release.<br />'+
	'			Version notes: '+
	'			<a href="http://mwlootlady.blogspot.com/2011/07/assassin-nator-updates-v032.html" target="_blank">v0.32</a>'+
	'			<a href="http://mwlootlady.blogspot.com/2011/07/assassin-nator-popup-updates-version.html" target="_blank">v0.31</a>'+
	'			<a href="http://mwlootlady.blogspot.com/2011/07/assassin-nator-updates-v030.html" target="_blank">v0.30</a>'+
	'			<a href="http://mwlootlady.blogspot.com/2011/07/assassin-nator-updates-v029b.html" target="_blank">v0.29</a>'+
	'			<a href="http://mwlootlady.blogspot.com/2011/06/assassin-nator-updates-v028.html" target="_blank">v0.28</a>'+
	'			<a href="http://mwlootlady.blogspot.com/2011/06/assassin-nator-updates-v027.html" target="_blank">v0.27</a>'+
	'			<a href="http://mwlootlady.blogspot.com/2011/06/assassin-nator-updates-v026.html" target="_blank">v0.26</a>'+
	'			<a href="http://mwlootlady.blogspot.com/2011/06/assassin-nator-updates.html" target="_blank">v0.25</a></p>'+
	'			<p>Iced (dimmed) targets on fightlist are auto-skipped. People may be iced before you have time to attack them, thus being logged as already iced.<br />'+
	'			Stronger targets are added to a blacklist, and avoided. In log: <i>[xx:xx] Skipping Enter New Name because of blacklist.</i><br />'+
	'			Stamina used and Bank above, 0 to disable.<br />'+
	'			<strong>Show Popups</strong>: Everything except ice/kill/revenge popups will be shown and script pauses.<br />'+
	'			<strong>Revenge</strong>: When someonce steals a ice from you, get revenge on them.<br />'+
	'			<strong>Target health limit</strong>: Skip targets with estimated health above this value. Does minimum of 3 attacks to estimate health.<br />'+
	'			<strong>Target name filter</strong>: Enter a list of special characters to avoid, separate with space or new line.<br /><i>Example: [ ( { SPOCK</i><br />'+
	'			<strong>Family ID filter</strong>: A list of ID numbers, numbers only. Separate with space or new line.<br /><i>Example: 1 2 123 4 5678</i>'+
	'			<strong>Use Boosts</strong>: Enable or disable boost usage, look for icon in log. Can lag behind a few attacks after being changed.'+
	'			</p>'+
	'			<h2>Log</h2>'+
	'			<p><span class="stamina">Mobster Name</span> in the log means you are revenge attacking.<br />'+
	'			Target iced self, the game reported that target iced self.<br />'+
	'			'+ravenimg+' in the log, Raven assassin bossfight was detected.</p>'+
	'			<h2>Suggestions</h2>'+
	'			<p>Do you have a great idea how to make this Spocklet better?<br />'+
	'			Head over to our <a href="http://spockholm.userecho.com" target="_blank">Userecho site</a> and make a post there.</p>'+
	'			<p><strong>Write something like this</strong>:<br />'+
	'			<strong>Header</strong>: Assassin-a-Nator restart feature<br />'+
	'			<strong>Description</strong>: When running out of stamina I want to restart after x minutes.<br />'+
	'			<strong>Post in</strong>: Ideas<br />'+
	'			Try to answer two questions in your description: <strong>What? and Why?</strong> It will help us understand.<br />'+
	'			Please use the search function before posting the suggestion.<br />'+
	'			<strong>It is very important that you keep the header short and descriptive, else it will be lost in the noise</strong>.</p>'+
	'			<p>Let your friends know about the suggestion to get more votes.</p>'+
	'			<h2>Known issues</h2>'+
	'			<ul>'+
	'				<li>Statistics can be wrong.</li>'+
	'				<li>When a session is done and game is left idle, health/energy/stamina increase. Click any ingame link to fix.</li>'+
	'				<li>Random stalling and stopping. Usually because of internet connection.</li>'+
	'				<li>Healing can cause travel to New York (game bug).</li>'+
	'				<li>Money counting when healing in other cities is wrong.</li>'+
	'				<li>Banking in New York is currently disabled to prevent accidental banking because of the game travel bug.</li>'+
	'			</ul>'+
	'			<h2>Bug Reporting</h2>'+
	'			<p>When submitting a bug report, <strong>help us help you</strong>.</p>'+
	'			<ul>'+
	'				<li><strong>Description of the problem</strong><br />'+
	'				"Not working" is not a description, use more words.</li>'+
	'			<li><strong>Information on how to replicate the problem</strong><br />'+
	'				This is a very important, without this time will be wasted.</li>'+
	'			<li><strong>Information on browser, what page you ran the bookmarklet on, settings used etc.</strong><br />'+
	'				Found browser: '+navigator.userAgent+'<br />'+
	'				Found page: '+User.page+'</li>'+
	'			<li><strong>What you expected to happen?</strong><br />'+
	'				Knowing what you want will help us understand the problem.</li>'+
	'			<li><strong>What actually happened?</strong><br />'+
	'				Was there any error reported?<br />'+
	'				Screenshots are very helpful.<br />'+
	'				<a href="http://support.zynga.com/cp_articleview?gameId=43&Id=kA160000000GnvsCAC&lang=en_US&loc=en_US" target="_blank">Zynga help on screenshots</a></li>'+
	'			</ul>'+
	'			<p>When you have found this information, post it in the <a href="http://www.facebook.com/mafiatools?sk=app_2373072738" target="_blank">discussion board</a> on our fan page.</p>'+
	'		</div>'+
	'	</div>'+
	'</div>';

	var config_html =
	'<div id="'+spocklet+'_config" style="z-index:100; display:none; position: relative; top: -90px; left: -130px;">'+
	'	<div style="display: block; left: 177px;" class="pop_box" id=""><a class="pop_close" onclick="$(\'#'+spocklet+'_config\').hide(); return false;" href="#"></a>'+
	'		<div style="padding: 15px 15px 0px 15px;">'+
	'			<h2>Enabled settings:</h2>'+
	'			<p>Normally settings are saved when you change something, or you can click here: <a href="#" class="sexy_button_new short white" id="'+spocklet+'_save"><span><span>Save</span></span></a></p>'+
	'			<p><span class="health">Heal city</span> <a href="#" id="'+spocklet+'_heal" class="sexy_button_new short green"><span><span>New York</span></span></a> when health is below <input id="'+spocklet+'_health" type="text" value="50" maxlength="5" style="width:40px;" name="'+tagname+'" /></p>'+
//	'			<p><span class="more_in">Why only New York or Disabled?<br />More heal choices require travel, not done with that yet. But it is on the todo.</span></p>'+
	'			<p>Stop before levelup <input id="'+spocklet+'_levelup" style="width:20px;" type="checkbox" name="'+tagname+'" checked /> when <input id="'+spocklet+'_exp_level" type="text" value="100" maxlength="5" style="width:40px;" name="'+tagname+'" /> exp is needed to level.</p>'+
	'			<p>Enable restarting: <input id="'+spocklet+'_restart" type="checkbox" name="'+tagname+'" /> &nbsp; <span id="'+spocklet+'_restart_row"><input id="'+spocklet+'_restart_time" name="'+tagname+'" type="text" value="5" maxlength="4" style="width:30px;" /> Minute(s) before restarting. <span class="more_in">(Minimum: 1)</span></span></p>'+
	'			<p>Lock fight city: <input id="'+spocklet+'_citylock" style="width:20px;" type="checkbox" name="'+tagname+'" /><br /><span class="more_in">Travel back if city change is detected.</span></p>'+
	'			<p>Use boosts: <input id="'+spocklet+'_boosts" style="width:20px;" type="checkbox" name="'+tagname+'" /><br /><span class="more_in">Enable or disable boost usage.</span></p>'+
	'			<p>Use blacklist: <input id="'+spocklet+'_blacklist" style="width:20px;" type="checkbox" name="'+tagname+'" checked /><br /><span class="more_in">Save stronger opponents for session duration. To avoid fighting them again.</span></p>'+
	'			<p>Red ice: <input id="'+spocklet+'_redice" style="width:20px;" type="checkbox" name="'+tagname+'" /><br /><span class="more_in">Keep attacking, even if we lose. Other settings like max attack are still used.</span></p>'+
	'			<p>Keep on ice: <input id="'+spocklet+'_keepice" style="width:20px;" type="checkbox" name="'+tagname+'" /><br /><span class="more_in">Keep attacking, even if target is iced. Other settings like max attack are still used.</span></p>'+
	'			<h2>Currently hard-coded settings:</h2>'+
	'			<div style="text-align: left">'+
	'			<p><a href="#" class="sexy_button_new short green"><span><span>Skip Iced</span></span></a> targets on fightlist. Dimmed targets on fightlist are ignored, always.</p>'+
	'			<p><strong>Show popups</strong>: When enabled, all popups exept the iced, killed and ice stolen will show. Bookmarklet will then pause.</p>'+
	// '				<a onmouseover="$(\'#'+spocklet+'_desc\').html(\'Enable or disable option A\');" onmouseout="$(\'#'+spocklet+'_desc\').html(\'&nbsp;\');" class="sexy_button_new short white" href="#">'+
	// '					<span><span>Toggle option A</span></span>'+
	// '				</a>'+
	// '				<div style="height: 10px"></div>'+
	'			</div>'+
	'			<div id="'+spocklet+'_desc">&nbsp;</div>'+
	'		</div>'+
	'	</div>'+
	'</div>';

	var spocklet_html =
	'<div id="'+spocklet+'_main">'+
		style+
		help_html+
		config_html+
		'<table class="messages">'+
		'<tr id="'+spocklet+'_background"><td colspan="3" align="center" style="text-align:center;">'+logo+'<br />'+
			'<table width="100%"><tr>'+
				'<td style="text-align:left; width: 200px;">'+
					'<a href="http://www.spockholm.com/mafia/donate.php?Assassin-a-Nator" id="'+spocklet+'_donate" class="sexy_button_new short white" target="_blank" title="Like what we do? Donate to Team Spockholm" alt="Like what we do? Donate to Team Spockholm"><span><span>Donate</span></span></a>'+
					'&nbsp;<a href="#" id="'+spocklet+'_help" class="sexy_button_new short" title="Read FAQ" alt="Read FAQ"><span><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon-help.gif"> FAQ</span></span></a>'+
				'</td>'+
				'<td style="margin-left:auto; margin-right:auto; text-align:center;"><span class="good">'+version+'</span></td>'+
				'<td style="text-align:right; width: 250px;">'+
					'<a href="#" id="'+spocklet+'_play" class="sexy_button_new short green" title="Start Assassin-a-Nator" alt="Start Assassin-a-Nator"><span><span>Start</span></span></a>'+
					'<a href="#" id="'+spocklet+'_pause" class="sexy_button_new short orange" title="Pause Assassin-a-Nator" alt="Pause Assassin-a-Nator"><span><span>Pause</span></span></a>'+
					//'&nbsp;<a href="#" id="'+spocklet+'_config_toggle" class="sexy_button_new short black" title="Config" alt="Config"><span><span style="background: url(\'http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png\') no-repeat scroll 4px 50% transparent; padding-left: 30px;">Config</span></span></a>'+
					'&nbsp;<a href="#" id="'+spocklet+'_close" class="sexy_button_new short red" title="Close Assassin-a-Nator" alt="Close Assassin-a-Nator"><span><span>Close</span></span></a>'+
				'</td>'+
			'</tr></table>'+
		'</td></tr>'+
		'<tr><td colspan="3">'+
			'<div style="float:left;"><a href="#" id="'+spocklet+'_config_toggle" class="sexy_button_new short black" title="Config" alt="Config"><span><span style="background: url(\'http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png\') no-repeat scroll 4px 50% transparent; padding-left: 30px;">Config</span></span></a></div>'+
			'<div style="float:right;"><a href="#" id="'+spocklet+'_mode" class="sexy_button_new short black"><span><span>Fightlist Mode</span></span></a></div>'+
		'</td></tr>'+
		'<tr><td colspan="3"><hr /></td></tr>'+
		'<tr>'+
			'<td>Stamina used:</td><td><span id="'+spocklet+'_attacks_done">0</span> of <input id="'+spocklet+'_attacks_todo" type="text" value="0" maxlength="4" />'+bankingrow+'</td>'+
			'<td align="right" style="text-align:right;">Delay <input id="'+spocklet+'_delay1" name="'+tagname+'" type="text" value="0" maxlength="4" /> - <input id="'+spocklet+'_delay2" name="'+tagname+'" type="text" value="0" maxlength="4" />sec</td></tr>'+
		'<tr>'+
			'<td valign="top" style="width:135px;">Stats:</td>'+
			'<td valign="top">'+
				'Experience: <span id="'+spocklet+'_exp_gained" class="good">0</span> <span id="'+spocklet+'_exp_ratio" class="more_in">0</span>&nbsp;'+
				//'Stamina Used: <span id="'+spocklet+'_stamina_used" class="good"></span>&nbsp;'+
				'<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/victory_icon.gif" style="vertical-align: middle;" height="18" width="18"><span id="'+spocklet+'_vcoins">?</span><br />'+
				'Money: <span id="'+spocklet+'_money_gained">0</span>&nbsp;'+
				'<span class="more_in">(Banked: <span id="'+spocklet+'_money_banked">0</span>)</span><br />'+
				'Won: <span id="'+spocklet+'_success" class="good">0</span>&nbsp;'+
				'Lost: <span id="'+spocklet+'_failed" class="bad">0</span>&nbsp;<br />'+
				'Iced: <span id="'+spocklet+'_iced_start">0</span> (+<span id="'+spocklet+'_iced" style="color: #609AD1; font-weight:bold;">0</span>) &nbsp;'+
				//'Already Iced: <span id="'+spocklet+'_already_iced" style="color: #609AD1;"></span>&nbsp;'+
				'Killed: <span id="'+spocklet+'_killed" style="color: #990000; font-weight:bold;">0</span>&nbsp;'+
			'</td>'+
			'<td align="right" style="text-align:right;">'+
				'Show Popups:<input id="'+spocklet+'_popups" style="width:20px;" type="checkbox" name="'+tagname+'" /><br />'+
				'Power Attack:<input id="'+spocklet+'_power" style="width:20px;" type="checkbox" name="'+tagname+'" /><br />'+
				'Revenge:<input id="'+spocklet+'_revenge" style="width:20px;" type="checkbox" name="'+tagname+'" />'+
			'</td>'+
		'</tr>'+
		'<tr id="'+spocklet+'_strength_row" style="display:none;"><td>Strength:</td><td colspan="2"><span id="'+spocklet+'_strength_stats"></span></td></tr>'+
		'<tr id="'+spocklet+'_pause_row" style="display:none;">'+
			'<td>Pause options:</td>'+
			'<td colspan="2">'+
				'<input id="'+spocklet+'_energy_ratio" type="text" value="0" maxlength="4" name="'+tagname+'" /> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp Ratio">&nbsp;&nbsp;'+
				'<input id="'+spocklet+'_stamina_ratio" type="text" value="0" maxlength="4" name="'+tagname+'" /> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Stamina Ratio">&nbsp;&nbsp;'+
//				'<input id="'+spocklet+'_exp_level" type="text" value="0" maxlength="4" name="'+tagname+'" /> exp to level&nbsp;&nbsp;'+
				'<input id="'+spocklet+'_energy_remain" type="text" value="0" maxlength="6" style="width:50px;" name="'+tagname+'" /> energy remaining&nbsp;<span class="more_in">(<a href="#" class="more_in" onclick="$(\'#'+spocklet+'_energy_remain\').val(\''+bossenergy+'\');return false;">'+bossenergy+' for boss fight</a>)</span>'+
			'</td>'+
		'</tr>'+
		'<tr id="'+spocklet+'_runtime_row" style="display:none;"><td>Runtime:</td><td colspan="2"><span id="'+spocklet+'_runtime"></span></td></tr>'+
		'<tr><td>Status:</td><td colspan="2" id="'+spocklet+'_status"></td></tr>'+
		'<tr>'+
			'<td><a href="#" id="'+spocklet+'_filters_toggle" class="sexy_button_new shorter black"><span><span>Filters <span id="'+spocklet+'_arrow" style="background: url(http://mwfb.static.zgncdn.com/mwfb/graphics/dropdown_travel_arrow.gif) no-repeat scroll right 50%; padding-right:15px;"></span></span></span></a></td>'+
			'<td colspan="2">Level range: <input id="'+spocklet+'_level_low" type="text" value="0" maxlength="5" style="width:40px;" name="'+tagname+'" />-<input id="'+spocklet+'_level_high" type="text" value="25000" maxlength="5" style="width:40px;" name="'+tagname+'" /> &nbsp; Mafia Size: <input id="'+spocklet+'_mafia_low" type="text" value="0" maxlength="5" name="'+tagname+'" />-<input id="'+spocklet+'_mafia_high" type="text" value="501" maxlength="5" name="'+tagname+'" /> &nbsp;<span id="'+spocklet+'_filter_error" class="bad"></span></td></tr>'+
			'<tr id="'+spocklet+'_filters" style="display:none;"><td></td><td colspan="2">'+
				'<table width="100%">'+
				'<tr>'+
					'<td width="160" style="border-top:1px dotted #999;">Cash from same city:</td>'+
					'<td style="border-top:1px dotted #999;"><input id="'+spocklet+'_samecash" name="'+tagname+'" type="checkbox" /> &nbsp; Minimum cash: <input id="'+spocklet+'_mincash" name="'+tagname+'" type="text" value="0" maxlength="6" style="width:45px;"  /></td>'+
				'</tr>'+
				'<tr>'+
					'<td style="border-top:1px dotted #999;">Max attacks per target:</td>'+
					'<td><input id="'+spocklet+'_maxattacks" name="'+tagname+'" type="text" value="0" maxlength="5" style="width:40px;" /></td>'+
				'</tr>'+
				'<tr>'+
					'<td style="border-top:1px dotted #999;">Target health limit:</td>'+
					'<td><input id="'+spocklet+'_maxhealth" name="'+tagname+'" type="text" value="0" maxlength="5" style="width:40px;" /></td>'+
				'</tr>'+
				'<tr>'+
					'<td valign="top" style="border-top:1px dotted #999;">Character name filter:<br /><a href="#" onclick="if(confirm(\'Do you really want to reset name filter?\')) { $(\'#'+spocklet+'_namefilter\').val(\'\');} return false;">Clear</a></td>'+
					'<td><textarea id="'+spocklet+'_namefilter" name="'+tagname+'" rows="3" cols="40"></textarea><br />Separate characters with space or new line.</td>'+
				'</tr>'+
				'<tr>'+
					'<td valign="top" style="border-top:1px dotted #999;">Family ID filter:<br /><a href="#" onclick="if(confirm(\'Do you really want to reset family filter?\')) { $(\'#'+spocklet+'_familyfilter\').val(\'\'); } return false;">Clear</a><br /><a href="#" id="'+spocklet+'_addfamily">Add link</a></td>'+
					'<td><textarea id="'+spocklet+'_familyfilter" name="'+tagname+'" rows="4" cols="50"></textarea><br />Numbers only, separate with space or new line.</td>'+
				'</tr>'+
				'</table>'+
			'</td>'+
		'</tr>'+
		'<tr id="'+spocklet+'_targetlist" style="display:none;"><td valign="top">Target List:<br /><a href="#" id="'+spocklet+'_addtarget">Add link</a></td><td colspan="2" valign="top"><textarea id="'+spocklet+'_targets" name="'+tagname+'" rows="5" cols="50"></textarea><br />Facebook ID (number) or MWid (p|number). Separate with space or new line.</td></tr>'+
		'<tr><td colspan="3"><hr /></td></tr>'+
		'<tr>'+
			'<td valign="top"><a href="#" id="'+spocklet+'_popup_toggle" class="sexy_button_new short green" alt="Hide/Show popups" title="Hide/Show popups"><span><span>Popups</span></span></a></td>'+
			'<td colspan="2" valign="top"><span id="'+spocklet+'_popup"></span></td>'+
		'</tr>'+
		'<tr>'+
			'<td valign="top"><a href="#" id="'+spocklet+'_loot_toggle" class="sexy_button_new short green" alt="Hide/Show loot" title="Hide/Show loot"><span><span>Loot</span></span></a></td>'+
			'<td colspan="2" valign="top"><span id="'+spocklet+'_loot_stats"><span class="more_in">No loot found yet.</span></span> &nbsp; Sort by <a href="#" id="'+spocklet+'_sortloot">attack</a><br /><span id="'+spocklet+'_loot"></span></td>'+
		'</tr>'+
		'<tr>'+
			'<td valign="top"><a href="#" id="'+spocklet+'_log_toggle" class="sexy_button_new short green" alt="Hide/Show log" title="Hide/Show log"><span><span>Log</span></span></a>'+
				'&nbsp;Lines: <input id="'+spocklet+'_logsize" name="'+tagname+'" type="text" value="10" maxlength="4" /></td>'+
			'<td valign="top" colspan="2" id="'+spocklet+'_log"></td>'+
		'</tr>'+
		'</table>'+
	'</div>';

	function timestamp(seconds) {
		now = new Date();
		var CurH = now.getHours();
		CurH = (CurH<10?'0'+CurH:CurH);
		var CurM = now.getMinutes();
		CurM = (CurM<10?'0'+CurM:CurM);
		if (seconds) {
			var CurS = now.getSeconds();
			CurS = (CurS<10?'0'+CurS:CurS);
			return '<span class="more_in">['+CurH+':'+CurM+':'+CurS+']</span> ';
		}
		else {
			return '<span class="more_in">['+CurH+':'+CurM+']</span> ';
		}
	}

	function myRandom(min,max) {
		return min +  Math.floor(Math.round((Math.random() * (max - min))));
	}

	function commas(s) {
		while (d=/(-)?(\d+)(\d{3}.*)/.exec(s)) {
			s = (d[1]?d[1]+d[2]+','+d[3]:d[2]+','+d[3]);
		}
		return s;
	}

	function camelize(str) {
		return str.toLowerCase().replace(/\b[a-z]/g, cnvrt);
		function cnvrt() {
			return arguments[0].toUpperCase();
		}
	}

	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10));
	}

	function createStore(name) {
		if (!window.Spocklet) {
			window.Spocklet={ }
		}
		if (!window.Spocklet[name]) {
			window.Spocklet[name]={};
		}
		return window.Spocklet[name];	
	}
	function msg(s) {
		$('#'+spocklet+'_status').html(s);
	}

	//make timer global so we can remove it quickly
	var timer;
	function pausing(seconds,message,resume_func) {
		var delay = (seconds > 0)? delay = 1000 : delay = 100;
		// if the message was left out, shuffle things a bit
		if (typeof message == 'function') {
			resume_func = message;
			message = null;
		}
		if (message) {
			message = message;
		}
		else {
			message='Pausing';
		}
		var minutes = (parseInt(seconds/60) == 1) ? 0 : parseInt(seconds/60);
		if (minutes > 0) {
			msg(message+' <span id="minutes">'+minutes+' minutes</span> <span id="seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>...');
		}
		else {
			msg(message+' <span id="minutes"></span><span id="seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>...');
		}
		timer = setInterval(function(){
			if (seconds%60 == 0) {
				minutes--;
			}
			seconds--;
			if (document.getElementById('minutes')) {
				document.getElementById('minutes').innerHTML = (minutes > 0) ? minutes+' minute'+(minutes==1?'':'s') : '';
			}
			if (document.getElementById('seconds')) {
				document.getElementById('seconds').innerHTML = (seconds % 60)+' second'+(seconds==1 ? '' : 's');
			}
			else {
				clearInterval(timer);
			}
			if (seconds <= 0) {
				clearInterval(timer);
				if (typeof resume_func == 'function') {
					resume_func();
				}
			}
		},delay);
	}

	function create_div() {
		//setup the spockdiv
		//if ($('#'+spocklet+'_main').length == 0) {
			$('#'+spocklet+'_main').remove();
			$('#inner_page').before(spocklet_html);
			
		//}
		//else {
			//$('#'+spocklet+'_log').html();
		//}

	}

	function create_user_data(text) {
		var user_fields = [];
		var user_info = [];
		user_f_exp = /user_fields\['(\w+)'\].*?"(.*?)"/g;
		user_i_exp = /user_info\['(\w+)'\].*?"(.*?)"/g;
		while ((user_f = user_f_exp.exec(text)) != null) {
			user_fields[user_f[1]] = (Util.is_integer(user_f[2]) ? parseInt(user_f[2]) : user_f[2]);
			// if (Util.is_integer(user_f[2])) {
				// user_fields[user_f[1]] = parseInt(user_f[2]);
			// }
			// else {
				// user_fields[user_f[1]] = user_f[2];
			// }
		}
		while ((user_i = user_i_exp.exec(text)) != null) {
			user_info[user_i[1]] = (Util.is_integer(user_i[2]) ? parseInt(user_i[2]) : user_i[2]);
			// if (Util.is_integer(user_i[2])) {
				// user_info[user_i[1]] = parseInt(user_i[2]);
			// }
			// else {
				// user_info[user_i[1]] = user_i[2];
			// }
		}
		return [user_fields,user_info];
	}

	function update_game_ui(object) {
		if (Util.isset(object.user_fields)) {
			stats_update(object.user_fields);
			user_fields_update(object.user_fields);
			user_info_update(object.user_fields, object.user_info);
			if (Util.isset(object.user_fields.current_city_id)) {
				active_city = object.user_fields.current_city_id;
				if (object.user_fields.current_city_id == 1) {
					//disable new york banking
					$('#'+spocklet+'_bankamount').val('0');
				}
				if (object.user_fields.current_city_id != xw_city) {
					set_background(object.user_fields.current_city_id);
					xw_city = object.user_fields.current_city_id;
					// log('Travel detected! Reloading game UI.');
					// do_ajax('inner_page', 'remote/html_server.php?xw_controller=fight&xw_action=view&xw_city=', 1, 1, 0, 0);
				}
			}
		}
		if (Util.isset(object.questData)) {
			MW.QuestBar.update(object.questData);
		}
		if (Util.isset(object.fightbar)) {
			if (stats.attack_start == 0) {
				stats.attack_start = parseInt(object.fightbar.group_atk.replace(/[^0-9]/g, ''));
			}
			if (stats.defense_start == 0) {
				stats.defense_start = parseInt(object.fightbar.group_def.replace(/[^0-9]/g, ''));
			}
			stats.attack = parseInt(object.fightbar.group_atk.replace(/[^0-9]/g, ''));
			stats.defense = parseInt(object.fightbar.group_def.replace(/[^0-9]/g, ''));
		}

	}

	function stats_update(o) {
		var d, d2, d3;
		energy_ratio = o.exp_to_next_level/o.user_energy;
		stamina_ratio = o.exp_to_next_level/o.user_stamina;
		combined_ratio = o.exp_to_next_level/(o.user_energy+o.user_stamina);
		Math.abs(energy_ratio) < 10 ? (d=2) : (d=0);
		Math.abs(stamina_ratio) < 10 ? (d2=2) :(d2=0);
		Math.abs(combined_ratio) < 10 ? (d3=2) :(d3=0);
		if (energy_ratio=='Infinity') { energy_ratio=0; d=0; }
		if (stamina_ratio=='Infinity') { stamina_ratio=0; d2=0; }
		if (combined_ratio=='Infinity') { combined_ratio=0; d3=0; }
		document.getElementById('user_stats').getElementsByClassName('experience')[0].innerHTML = 'Exp Need: <span id="exp_to_next_level" class="energy_highlight">'+o.exp_to_next_level+'</span><br>(<span class="energy_highlight">'+(energy_ratio).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(stamina_ratio).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(combined_ratio).toFixed(d3)+'</span>';
	}

	function banker(cash,city) {
		if (cash < 10) {
			log('<span class="bad">You need to deposit at least $10!</span>');
			$('#'+spocklet+'_bankamount').val('0');
			$('#'+spocklet+'_bankamount').trigger('keyup');
			repeat_attack();
			return;
		}
		var cb = userid+unix_timestamp();
		User.clicks++;
		var params = {
			'ajax': 1,
			'sf_xw_user_id': userid,
			'sf_xw_sig': local_xw_sig,
			'liteload': 1,
			'cb': cb,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'amount': cash,
			'xw_city': xw_city,
			'xw_person': personid,
			'clicks': User.clicks
		};
		if (city == 5) {
			var url = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=propertyV2&xw_action=doaction&doaction=ActionBankDeposit&building_type=6&city=5';
		}
		else {
			//var url = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=bank&xw_action=deposit_all';
			var url = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=bank&xw_action=deposit';
		}
		$.ajax({
			type: "POST",
			url: url,
			data: params,
			success: function (bankresponse) {
				var bankobject = jQuery.parseJSON(bankresponse.replace(/^(\s\d\s+)/,''));
				var message = '';
				try {
					update_game_ui(bankobject);
				}
				catch (banker_user_fields) {
					//log('Ran into trouble in banker(), user_fields: '+banker_user_fields);
					//log('<a href="http://www.spockholm.com/mafia/help.php?bugreporting">Read here</a> on how to report this problem.');
				}
				if (params.xw_city == 5) {
					bankobject = jQuery.parseJSON(bankobject.data);
				}
				if (Util.isset(bankobject.deposit_message)) {
					if (/bank can only hold/.test(bankobject.deposit_message)) {
						//New York bank is full
						$('#'+spocklet+'_bankamount').val('0');
						$('#'+spocklet+'_bankamount').trigger('keyup');
					}
					if (/You do not have the funds/.test(bankobject.deposit_message)) {
						if ((bankobject.user_cash > 10) && (bankobject.user_cash > $('#'+spocklet+'_bankamount').val())) {
							banker(bankobject.user_cash,city);
							return;
						}
					}
					if (/[A-Z]+?\$([\d,]+)/.test(bankobject.deposit_message)) {
						var banked = /[A-Z]+?\$([\d,]+)/.exec(bankobject.deposit_message)[1];
						stats.money_banked += parseInt(banked.replace(/[^0-9]/g, ''));
					}
					var message = bankobject.deposit_message;
					log(message);
				}
				if (Util.isset(bankobject.success_message)) {
					if (/You cannot deposit any more/.test(bankobject.success_message)) {
						// Vault full = 'You cannot deposit any more'
						$('#'+spocklet+'_bankamount').val('0');
						$('#'+spocklet+'_bankamount').trigger('keyup');
					}
					if (/You cannot deposit that much/.test(bankobject.success_message)) {
						// Not enough money on hand = 'You cannot deposit this much'
						$('#'+spocklet+'_bankamount').val('0');
						$('#'+spocklet+'_bankamount').trigger('keyup');
					}
					if (/[A-Z]+?\$([\d,]+)/.test(bankobject.deposit_message)) {
						var banked = /[A-Z]+?\$([\d,]+)/.exec(bankobject.success_message)[1];
						stats.money_banked += parseInt(banked.replace(/[^0-9]/g, ''));
					}
					var message = bankobject.success_message;
					log(message);
				}
				repeat_attack();
			}
		});
	}

	function age(diff) {
		if (diff == 0) {
			return 0;
		}
		diff*=1000;
		var hours = Math.floor(diff / (60 * 60 * 1000));
		diff -= hours * (60 * 60 * 1000);
		var minutes = Math.floor(diff / (60*1000));
		diff -= minutes * 60 * 1000;
		var seconds = Math.floor(diff / 1000);
		return '<span class="more_in">'+hours+' h '+minutes+' min '+seconds+' sec</span>';
	}

	// From Vern's toolkit.js, http://vern.com/mwtools/
	var logs = [];
	var extralog = [];
	function logtrunc(message) {
		var limit = parseInt($('#'+spocklet+'_logsize').val());
		//var keep = /icanhazcheeseburger/;
		var keep = /Boss fight Raven active/;
		logs.unshift(message);
		if (limit > 0) {
			if (logs.length>limit) {
				message=logs.pop();
				if ((keep.test) && (keep.test(message))) {
					extralog.unshift(message);
				}
			}
		}
		$('#'+spocklet+'_log').html(logs.concat(extralog,'').join('<br />'));
	}
	function log(s) {
		logtrunc(timestamp()+s);
		for (x in stats) {
			if ($('#'+spocklet+'_'+x)) {
				if (x == 'success') {
					$('#'+spocklet+'_'+x).html(stats.success+' <span class="more_in">('+parseFloat(stats.success/stats.attacks_done*100).toFixed(1)+'%)</span>');
				}
				else if (x == 'failed') {
					$('#'+spocklet+'_'+x).html(stats.failed+' <span class="more_in">('+parseFloat(stats.failed/stats.attacks_done*100).toFixed(1)+'%)</span>');
				}
				else if (/money_gained/.test(x)) {
					//$('#'+spocklet+'_'+x).html('$'+commas(stats[x]));
					var money = '';
					for (y in cash) {
						money += '<span style="color:'+(cash[y] > 0 ? '#00C800' : 'red')+';">'+(typeof currencies[y] != 'undefined'?currencies[y]:'$')+commas(cash[y])+'</span> ';
					}
					$('#'+spocklet+'_'+x).html(money);
				}
				else if (/money_banked/.test(x)) {
					$('#'+spocklet+'_'+x).html('$'+commas(stats[x]));
				}
				else if (/iced_start/.test(x)) {
					$('#'+spocklet+'_'+x).html(commas(stats[x]));
				}
				else {
					$('#'+spocklet+'_'+x).html(stats[x]);
				}
			}
		}
		$('#'+spocklet+'_exp_ratio').html('('+(stats.exp_gained/stats.stamina_used).toFixed(2)+' exp/stamina)');

		$('#'+spocklet+'_strength_stats').html('');
		//if (stats.attack > stats.attack_start) {
			$('#'+spocklet+'_strength_row').show();
			$('#'+spocklet+'_strength_stats').append(mafia_attack+' '+commas(stats.attack)+' (<span class="good">+'+commas(stats.attack-stats.attack_start)+'</span>) ');
		//}
		//if (stats.defense > stats.defense_start) {
			//$('#'+spocklet+'_strength_row').show();
			$('#'+spocklet+'_strength_stats').append(mafia_defense+' '+commas(stats.defense)+' (<span class="good">+'+commas(stats.defense-stats.defense_start)+'</span>) ');
		//}

		update_loot_log();

		var now = unix_timestamp();
		if (start_time == 0) {
			start_time = parseInt(new Date().getTime().toString().substring(0, 10));
		}
		var timediff = parseInt(now-start_time);
		$('#'+spocklet+'_runtime').html(age(timediff)+' &nbsp; '+parseFloat(stats.attacks_done/timediff*60).toFixed(2)+'/minute');
		
		//plugin special case handler
		try {
			if ($.isFunction(datastore.stathandler)){
				datastore.stathandler(stats);
			}
		}
		catch(whatever) {}
	}

	function compare(a,b) {
		if (a==b) { return 0; }
		if (a>b) { return -1; }
		return 1;
	}
	function max(a,b) {
		return (a>b?a:b);
	}

	function sort_loot(){
		var list=[];
		for(var x in looted){
			list.push(x);
		}
		list.sort(function(a,b){
			switch(sortloot[sortlootindex]){
				case 'attack':
				case 'active':
				case 'quantity':
				case 'defense': return compare(looted[a][sortloot[sortlootindex]],looted[b][sortloot[sortlootindex]]); break;
				case 'from': return compare(looted[a].location,looted[b].location); break;
				case 'best': return compare(max(looted[a].attack,looted[a].defense),max(looted[b].attack,looted[b].defense)); break;
				default: return 0;
			}
		});
		return list;
	}
	function update_loot_log() {
		var lootoutput = '';
		var old={};
		var sorted=sort_loot();
		for (var i in sorted) {
			var x=sorted[i];

			var attack = '', defense = '';
			if (looted[x].attack > 0) {
				attack = '['+looted[x].attack+'A';
			}
			if (looted[x].defense > 0) {
				defense = looted[x].defense+'D]';
			}
			if (sortloot[sortlootindex]=="from") {
				if(old.location!=looted[x].location) {
					lootoutput+='<tr><td colspan="6"><u><b>'+Locations[looted[x].location].name+'</b></u></td></tr>';
				}
			}
			var image = looted[x].img?'<img width="16" height="16" src="http://mwfb.static.zgncdn.com/mwfb/graphics/'+looted[x].img+'" />':'';
			var have = looted[x].quantity;
			if (typeof itemdatabase[x] == 'object') {
				have = (itemdatabase[x].quantity>0?' <span class="more_in">Have: '+(itemdatabase[x].quantity+looted[x].quantity)+'</span>':'');
			}
			lootoutput += '<tr><td><span class="good">&times;'+looted[x].quantity+'</span> '+image+'</td><td><span style="'+(looted[x].active?"color:yellow;":"")+'">'+looted[x].name+'</td><td>'+attack+'</td><td>'+defense+'</span></td><td><span class="more_in">('+parseFloat(looted[x].quantity/stats.lootcount*100).toFixed(1)+'%)</span></td><td>'+have+'</td></tr>';
			old = looted[x];
		}
		$('#'+spocklet+'_loot_stats').html('Loot stats: '+stats.lootcount+'/'+stats.attacks_done+' <span class="more_in">('+parseFloat(stats.lootcount/stats.attacks_done*100).toFixed(1)+'%)</span>');
		$('#'+spocklet+'_loot').html('<table>'+lootoutput+'</table>');
	}

	function customSort(property) {
		return function (b, a) {
			return parseInt(a[property]) - parseInt(b[property]);
		};
	}

	function add_loot(itemid, name, count) {
		stats.lootcount += count;
		var attack = 0;
		var defense = 0;
		if (itemid) {
			if(typeof looted[itemid] == 'object') {
				looted[itemid].quantity += count;
			}
			else {
				if (typeof itemdatabase[itemid] == 'object') {
					it = itemdatabase[itemid];
					var active = (it.equipped_offense+it.equipped_defense>0) && ((it.equipped_offense==it.quantity) || (it.equipped_defense==it.quantity));
					looted[itemid] = {"id": itemid, "name": it.name, "quantity": count, "attack": it.attack, "defense": it.defense, "active":active, "img":it.imagesrc,"location":it.location };
				}
				else {
					looted[itemid] = {"id": itemid, "name": name, "quantity": count, "attack": attack, "defense": defense};
				}
				//get_item_data(itemid);
			}
		}
		else {
			if (typeof looted[name] == 'object') {
				looted[name].quantity += count;
			}
			else {
				looted[name] = {"id": itemid, "name": name, "quantity": count, "attack": attack, "defense": defense};
			}
		}
		update_loot_log();
	}

	/* disabled - using database
	function get_item_data(itemid) {
		var url = 'xw_controller=item&xw_action=get_item_data&item_id='+itemid;
		request(url,function(response) {
			var object = jQuery.parseJSON(response.replace(/^(\s\d\s+)/,''));
			if (Util.isset(object.data)) {
				if (Util.isset(object.data.itemData)) {
					var itemData = object.data.itemData;
					looted[itemid].id = itemData.id;
					looted[itemid].attack = itemData.attack;
					looted[itemid].defense = itemData.defense;
					looted[itemid].name = itemData.name;
				}
				if (Util.isset(object.popup)) {
					looted[itemid].id = itemid;
					looted[itemid].attack = $(object.popup).find('.attack:first').text();
					looted[itemid].defense = $(object.popup).find('.defense:first').text();
					var name = $(object.popup).find('h3:first').html();
					name = name.replace(/(<span.*?>\d+<.span>)/g,''); //remove trailing attack/defense stats
					looted[itemid].name = name;
					looted[itemid].active = ($(object.popup).find('.item_active').length > 0);
				}
			}
			update_loot_log();
		});
	}
	*/
	
	function open_popup(id) {
		if (/^MW.Feed/.test(popups[id])) {
			eval(popups[id]);
		}
		else {
			$('#popup_fodder').prepend('<div id="'+id+'"></div>');
			$('#'+id).append(popups[id]);
		}
	}
	function list_popups() {
		for (x in popups) {
			console.log(x+' '+popups[x]);
		}
	}
	function add_popup(id,type) {
		if (/Ice|Kill/i.test(type)) {
			$('#'+spocklet+'_popup').prepend('<span>'+timestamp()+type+': <a href="#" name="popup" popupid="'+id+'">'+targets[0].name+'</a></span><br />');
		}
		else {
			$('#'+spocklet+'_popup').prepend('<span>'+timestamp()+type+': <a href="#" name="popup" popupid="'+id+'">'+id+'</a></span><br />');
		}
		$('#'+spocklet+'_popup').find('a[name="popup"]').each(function() {
			$(this).bind('click',function() {
				open_popup($(this).attr('popupid'));
				$(this).html('Opened');
			})
		});
	}

	function repeat_attack() {
		//helper function to handle all the conditions before repeating a attack
		var wait = myRandom(parseInt($('#'+spocklet+'_delay1').val()),parseInt($('#'+spocklet+'_delay2').val()));
		var bankamount = parseInt($('#'+spocklet+'_bankamount').val());
		var attacks_done = parseInt($('#'+spocklet+'_attacks_done').html());
		var attacks_todo = parseInt($('#'+spocklet+'_attacks_todo').val());
		var energy_ratio_val = parseFloat($('#'+spocklet+'_energy_ratio').val());
		var stamina_ratio_val = parseFloat($('#'+spocklet+'_stamina_ratio').val());
		var exp_level = parseInt($('#exp_to_next_level').html());
		var exp_val = parseInt($('#'+spocklet+'_exp_level').val());
		var energy_val = parseInt($('#'+spocklet+'_energy_remain').val());
		var user_energy = parseInt($('#user_energy').html());
		var user_stamina = parseInt($('#user_stamina').html());
		var user_health = parseInt($('#user_health').html());
		var user_health_limit = parseInt($('#'+spocklet+'_health').val());

		if (run) {
			if ((active_city != start_city) && $('#'+spocklet+'_citylock').is(':checked') && (user_health > user_health_limit)) {
				set_background(active_city);
				log('City change detected! Travelling back to start city.');
				//do_ajax('inner_page', 'remote/html_server.php?xw_controller=fight&xw_action=view&xw_city=', 1, 1, 0, 0);
				travel(start_city,active_city);
				return;
			}
			else if (User.cash > bankamount && bankamount > 0) {
				pausing(wait,'Banking money in ',function(){ banker(User.cash,xw_city); });
			}
			else if ((energy_ratio <= energy_ratio_val) && (energy_ratio_val > 0)) {
				msg('<span class="good">Reached energy ratio, pausing...</span>');
				controls_display(true,false,true);
				run = false;
				return;
			}
			else if ((stamina_ratio <= stamina_ratio_val) && (stamina_ratio_val > 0)) {
				msg('<span class="good">Reached stamina ratio, pausing...</span>');
				controls_display(true,false,true);
				run = false;
				return;
			}
			// else if ((exp_level <= exp_val) && (exp_val > 0)) {
				// msg('<span class="good">Reached exp to level value, pausing...</span>');
				// controls_display(true,false,true);
				// run = false;
				// return;
			// }
			else if ((user_energy <= energy_val) && (energy_val > 0)) {
				msg('<span class="good">Reached energy remain value, pausing...</span>');
				controls_display(true,false,true);
				run = false;
				return;
			}
			else if ((exp_level < exp_val) && $('#'+spocklet+'_levelup').is(':checked')) {
				msg('<span class="good">Could levelup on next attack. Exp needed: '+exp_level+', your setting: '+exp_val+'. Pausing...</span>');
				controls_display(true,false,true);
				run = false;
				return;
			}
			else if ((user_health < user_health_limit) && use_hospital) {
				visit_hospital();
				return;
			}
			else if ((user_health < user_health_limit) && !use_hospital) {
				msg('<span class="bad">Healing disabled, stopping...</span>');
				controls_display(true,false,true);
				run = false;
				return;
			}
			else if (user_stamina < 5) {
				if ($('#'+spocklet+'_restart').is(':checked')) {
					if (restarts < restartlimit) {
						var wait = parseInt($('#'+spocklet+'_restart_time').val()*60);
						restarts++;
						log('Ran out of stamina, restarting in '+parseInt(wait/60)+' minutes(s).');
						clearInterval(timer);
						do_ajax('inner_page', 'remote/html_server.php?xw_controller=fight&xw_action=view&xw_city=', 1, 1, 0, 0);
						pausing(wait,'Restarting in ',function() { repeat_attack(); });
					}
					else {
						log(timestamp()+'<span class="bad">Failed restarting '+restartlimit+' times, giving up.</span>');
						controls_display(true,false,true);
					}
				}
				else {
					msg('<span class="bad">Out of stamina, stopping...</span>');
					do_ajax('inner_page', 'remote/html_server.php?xw_controller=fight&xw_action=view&xw_city=', 1, 1, 0, 0);
					controls_display(true,false,true);
					run = false;
					return;
				}
			}
			else if ((attacks_done < attacks_todo) || (attacks_todo == 0)) {
				controls_display(false,true,true);
				pausing(wait,'Attacking again in ',function(){ do_attack(); });
				return;
			}
			else {
				msg('Taking a break after '+attacks_todo+' attacks.');
				controls_display(true,false,true);
				run = false;
			}
		}
		else {
			msg('<span class="good">Pausing...</span>');
			controls_display(true,false,true);
		}
	}

	function do_attack() {
		if (targets.length == 0 && fightlist == 'fightlist') {
			log('Ran out of targets, reloading fight list...');
			targets = [];
			pausing(5,'Ran out of targets, reloading fight list in',function(){ load_fightlist(); });
			return;
		}
		if (targets.length == 0 && fightlist == 'targetlist') {
			targets = [];
			load_targets();
			return;
		}
		if (targets.length == 0 && fightlist == 'rivals') {
			targets = [];
			pausing(5,'Ran out of targets, reloading rivals in',function(){ load_rivals(); });
			return;
		}
		if (run) {
			//filter actions go here
			var maxhealth = parseInt($('#'+spocklet+'_maxhealth').val());
			var maxattacks = parseInt($('#'+spocklet+'_maxattacks').val());

			if (targets[0].mafia > parseInt($('#'+spocklet+'_mafia_high').val()) || targets[0].mafia < parseInt($('#'+spocklet+'_mafia_low').val()) && targets[0].type != 'Stealer') {
				log('Skipping '+targets[0].family+' '+targets[0].name+' because mafia size '+targets[0].mafia);
				skip_target();
				repeat_attack();
			}
			//else if (targets[0].level > parseInt($('#'+spocklet+'_level_high').val()) || targets[0].level < parseInt($('#'+spocklet+'_level_low').val()) && targets[0].type != 'Stealer') {
			else if (targets[0].level > parseInt($('#'+spocklet+'_level_high').val()) || targets[0].level < parseInt($('#'+spocklet+'_level_low').val())) {
				log('Skipping '+targets[0].family+' '+targets[0].name+' because level '+targets[0].level);
				skip_target();
				repeat_attack();
			}
			else if ((target.attacks > maxattacks) && (maxattacks != 0)) {
				log('Skipping '+targets[0].family+' '+targets[0].name+' because max attacks reached.');
				skip_target();
				repeat_attack();
			}
			else if ((target.health > maxhealth) && (maxhealth != 0) && (target.attacks > 2)) {
				log('Skipping '+targets[0].family+' '+targets[0].name+' because max health detected.');
				skip_target();
				repeat_attack();
			}
			else if (check_name(targets[0].name+targets[0].family)) {
				log('Skipping '+targets[0].family+' '+targets[0].name+' because of name filter.');
				skip_target();
				repeat_attack();
			}
			else if (check_family(targets[0].family_id) && (targets[0].family_id > 0)) {
				log('Skipping '+targets[0].family+' '+targets[0].name+' because of family filter.');
				skip_target();
				repeat_attack();
			}
			else if (find_element(targets[0].pid,'pid',blacklist) && $('#'+spocklet+'_blacklist').is(':checked')) {
				log('Skipping <a href="http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+btoa('p|'+targets[0].pid)+'%22%7D">'+targets[0].family+' '+targets[0].name+'</a> because of blacklist. <span class="more_in">(Stronger opponent)</span>');
				skip_target();
				repeat_attack();
			}
			else {
				msg('Attacking '+targets[0].family+' '+targets[0].name+'...');
				request(targets[0].button,function(s){ parse_attack(s); },function(s){ pausing(10,'Page not loaded properly, trying again in ',function(){ repeat_attack(); }); });
			}
		}
	}

	function request(url, handler, errorhandler) {
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+User.id+timestamp;
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+timestamp;
		}
		if (/use_boost/.test(url) && $('#'+spocklet+'_boosts').is(':checked')) {
			url = url.replace(/use_boost=0/,'use_boost=1');
		}
		if (/use_boost/.test(url) && !$('#'+spocklet+'_boosts').is(':checked')) {
			url = url.replace(/use_boost=1/,'use_boost=0');
		}
		User.clicks++;
		var preurl = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		var params = {
			'ajax': 1,
			'xw_client_id': 8,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_city': xw_city,
			//'skip_req_frame': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: handler,
			error: errorhandler
		});
	}

	function parse_attack(response) {
		var fightResult = false;
		var raven = '';
		var object = {};
		//try {
		if (/index_controller/.test(response)) {
			//Session most likely timed out
			targets = [];
			load_fightlist();
		}
		else if (/fight_controller/.test(response)) {
			//log('did not get json');
			if (/This player is currently part of your mafia/i.test(response)) {
				//log('<span class="bad">Skipping target that was part of mafia.</span>');
				//log skipped target name
				skip_target();
				repeat_attack();
				return;
			}
			if (fight_result = /msg.fight_result = (\{.*\});FightV2/.exec(response)) {
				//fightResult = jQuery.parseJSON(fight_result[1]);
				var user_data = [];
				user_data = create_user_data(response);
				object['user_fields'] = user_data[0];
				object['user_info'] = user_data[1];
				if (quest = /MW.QuestBar.update\((\{.*\})\);/.exec(response)) {
					object['questData'] = quest[1];
				}
				update_game_ui(object);
				object['popup'] = response;

				if (/table class="main_table fight_table" cellspacing="0"/.test(response) && fightlist == 'fightlist') {
					parse_fightlist(response,false);
				}
			}
			else {
				//list was fightlist, we hope
				//parse_fightlist(response);
				//return;
				//log('do not know what kind of response we got');
				user_data = create_user_data(response);
				object['user_fields'] = user_data[0];
				object['user_info'] = user_data[1];
				update_game_ui(object);
				repeat_attack();
				return;
				//console.log('do not know what kind of response we got');
			}
		}
		else {
			//log('think we got json back');
			object = jQuery.parseJSON(response.replace(/^(\s\d\s+)/,''));
			update_game_ui(object);
		}

		if (Util.isset(object.fight_result)) {
			fightResult = object.fight_result;
		}
		if (Util.isset(object.popup) && !fightResult) {
			if (/msg.fight_result = false/.test(object.popup)) {
				log('Could not parse result for some reason... Stamina: '+User.stamina+' Health: '+User.health);
				msg('Could not parse result for some reason... Stamina: '+User.stamina+' Health: '+User.health);
				controls_display(true,false,true);
				run = false;
				//pausing(5,'Could not parse result for some reason, reloading fightlist in ',function(){ load_fightlist(); });
				return;
			}
			else {
				//fightResult = jQuery.parseJSON(/msg.fight_result.*?(\{.*?\});/.exec(object.popup)[1]);
				fightResult = jQuery.parseJSON(/msg.fight_result = (\{.*\});FightV2/.exec(object.popup)[1]);
				if ($('#'+spocklet+'_power').is(':checked')) {
					var url = $(object.popup).find('.fightV2AttackBtn').eq(3).attr('href');
					targets[0].button = url.substr(url.indexOf('?')+1);
					//console.log('Updated button with: '+url);
				}
				else {
					var url = $(object.popup).find('.fightV2AttackBtn:first').attr('href');
					targets[0].button = url.substr(url.indexOf('?')+1);
				}
			}
		}

		if (fightResult) {
			var multiplier = 1;
			//if (fightResult.cash_class == 'brazil' || object.user_fields.current_city_id == 7) {
			if (fightResult.cash_class == 'brazil') {
				multiplier = 5;
			}

			var got_loot = raven;
			if (Util.isset(fightResult.loot)) {
				for (x in fightResult.loot) {
					//console.log('loot: '+x+'\n'+fightResult.loot[x]);
					var count = 1;
					var name = false;
					name = $(fightResult.loot[x]).find('#fake_item_card_title').html();
					if (name) {
						if ($(fightResult.loot[x]).find('#fake_item_card_qty').size > 0) {
							count = parseInt($(fightResult.loot[x]).find('#fake_item_card_qty').html().replace(/[^\d]/g,''));
						}
						if (!/Victory Coin/.test(name)) {
							add_loot(false,name,count);
							got_loot += name+' ';
						}
						else {
							stats.vc_count += count;
						}
					}
					var lootregexp = /item_id="(\d+)"/g;
					while((itemid = lootregexp.exec(fightResult.loot[x])) != null) {
						add_loot(parseInt(itemid[1]),'Unknown #'+itemid[1],1);
						if (itemdatabase[itemid[1]]) {
							var image = itemdatabase[itemid[1]].imagesrc?'<img width="16" height="16" src="http://mwfb.static.zgncdn.com/mwfb/graphics/'+itemdatabase[itemid[1]].imagesrc+'" /> ':'';
							got_loot += image+itemdatabase[itemid[1]].name+' ';
						}
						else {
							got_loot += itemid[1]+' ';
						}
					}
				}
			}
			if (Util.isset(fightResult.socialMessageCards)) {
				for (x in fightResult.socialMessageCards) {
					var name = false;
					var count = 1;
					name = $(fightResult.socialMessageCards[x]).find('#fake_item_card_title').html();
					if (name) {
						if (/Double XP/.test(name)) {
							//add_loot(false,name,count);
						}
						else if (/You took/.test(name)) {
							//add_loot(false,'Half damage',count);
						}
						else if (/less cash/.test(name)) {
							//add_loot(false,'Lost less cash',count);
						}
						else {
							count = parseInt($(fightResult.socialMessageCards[x]).find('#fake_item_card_qty').html().replace(/[^\d]/g,'')) * multiplier;
							add_loot(false,name,count);
							got_loot += name+' ';
						}
					}
					else {
						//console.log('sMC: '+x+'\n'+fightResult.socialMessageCards[x]);
					}
					var lootregexp = /item_id="(\d+)"/g;
					while((itemid = lootregexp.exec(fightResult.socialMessageCards[x])) != null) {
						count = 1 * multiplier;
						add_loot(parseInt(itemid[1]),'Unknown #'+itemid[1],count);
						if (itemdatabase[itemid[1]]) {
							var image = itemdatabase[itemid[1]].imagesrc?'<img width="16" height="16" src="http://mwfb.static.zgncdn.com/mwfb/graphics/'+itemdatabase[itemid[1]].imagesrc+'" /> ':'';
							var multi = multiplier==1?'':'<span class="good">&times;'+multiplier+'</span> ';
							got_loot += image+multi+itemdatabase[itemid[1]].name+' ';
						}
						else {
							got_loot += itemid[1]+' ';
						}
					}
				}
			}

			if (typeof cash[fightResult.cash_class] == 'number') {
				(fightResult.cash < 0) ? cash[fightResult.cash_class] -= Math.abs(fightResult.cash-prev_cash) : cash[fightResult.cash_class] += parseInt(fightResult.cash-prev_cash);
			}
			else {
				cash[fightResult.cash_class] = fightResult.cash;
			}
			(fightResult.cash < 0) ? stats.money_gained -= Math.abs(fightResult.cash) : stats.money_gained += fightResult.cash;
			var attacks_won = parseInt(fightResult.power_attack.won-prev_won);
			var attacks_lost = parseInt(fightResult.power_attack.lost-prev_lost);

			var attacks_made = parseInt((attacks_won+attacks_lost) * multiplier);

			stats.stamina_used += attacks_made;
			stats.attacks_done += attacks_made;
			target.attacks++;
			stats.success += attacks_won * multiplier;
			stats.failed += attacks_lost * multiplier;
			prev_won = parseInt(fightResult.power_attack.won);
			prev_lost = parseInt(fightResult.power_attack.lost);

			var ice_output = '';
			var ice_css = 'color:#609AD1;';
			if (fightResult.defender.is_iced || fightResult.defender.is_killed) {
				ice_output = 'already iced!';
				stats.already_iced++;
				targets[0].iced = true;
			}
			if (fightResult.defender.iced_self) {
				ice_output = 'iced self!';
				targets[0].iced = true;
			}
			if (fightResult.defender.you_iced) {
				stats.iced++;
				ice_output = 'iced!'+iced_image;
				ice_css = 'color:#609AD1;font-weight:bold;';
				targets[0].iced = true;
			}
			if (fightResult.defender.is_killed && fightResult.defender.you_iced) {
				stats.killed++;
				stats.iced++;
				ice_output = 'killed!';
				ice_css = 'color:#990000;font-weight:bold;';
				targets[0].iced = true;
			}

			var output = '';
			if (fightResult.isWin) {
				output += 'Won! ';
				whitelist.push(targets[0]);
			}
			else {
				output += '<span class="bad">Lost!</span> ';
				blacklist.push(targets[0]);
			}
			if (fightResult.use_boost) {
				output += boost_image+' ';
			}
			if (Util.isset(object.user_fields)) {
				stats.exp_gained += parseInt(object.user_fields.xp_earned);
				output += '<span class="experience">'+object.user_fields.xp_earned+'</span> ';
			}
			
			if (fightResult.defender.is_iced) {
				//if ($(object.popup).find('td[class*="iced_popv2_big_red_counter"]').length > 0) {
				if (Util.isset(fightResult.total_ice_count)) {
					//var icecount = parseInt($(object.popup).find('td[class*="iced_popv2_big_red_counter"]:first').html().replace(/[^\d]/g,''));
					var icecount = parseInt(fightResult.total_ice_count);
					if (icecount > 0) {
						stats.iced_start = icecount;
					}
				}
				//if ($(object.popup).find('#iced_event_iced_status_fightstats_count').length > 0) {
					//var icecount = parseInt($(object.popup).find('#iced_event_iced_status_fightstats_count span:first').html().replace(/[^\d]/g,''));
					//if (icecount > 0) {
						//stats.iced_start = icecount;
					//}
				//}
				//console.log($(object.popup).find('td[class*="iced_popv2_big_red_counter"]:first').html());
			}

			fightResult.defender.is_iced ? output += 'Target <span style="'+ice_css+'">'+ice_output+'</span> ' : '';
			//output += '<span class="attack">'+fightResult.attacker.skill_atk+'</span> vs <span class="defense">'+fightResult.defender.defense+'</span> ';
			if (!isNaN(targets[0].family_id) && targets[0].family_id > 0) {
				output += '<a href="http://apps.facebook.com/inthemafia/family.php?id=%7B%22id%22%3A%22'+btoa(targets[0].family_id)+'%22%7D" target="_blank" alt="Family Link"><span style="color:red;">'+targets[0].family+'</span></a> ';
			}
			output += '<a href="'+fightResult.defender.profile_link+'" target="_blank" alt="Profile link">'+targets[0].name+'</a> ';
			output += calculate_health(fightResult.defender.damage_dealt,fightResult.defender.other_damage,fightResult.defender.current_health_pct);
			var cashgained = 0;
			if (parseInt(fightResult.cash-prev_cash) != 0) {
				output += '<span style="color:#00C800;">'+(typeof currencies[fightResult.cash_class] != 'undefined'?currencies[fightResult.cash_class]:'$')+commas(parseInt(fightResult.cash-prev_cash))+'</span> ';
				cashgained = parseInt(fightResult.cash-prev_cash);
			}
			got_loot.length > 0 ? output += got_loot : '';
			log(output);
			prev_cash = parseInt(fightResult.cash);

			if (fightResult.ice_was_just_stolen) {
				var stealer = fightResult.thief_name;
				if (fightResult.thief_isInMafia) {
					log('Ice stolen by mafia member '+fightResult.thief_profile+'!');
				}
				else {
					log('Ice stolen by '+fightResult.thief_profile+'!');
					if ($('#'+spocklet+'_revenge').is(':checked')) {
						//var url = $(fightResult.thief_btn).find('a:first').attr('href');
						var url = /href='(.*?)'/.exec(fightResult.thief_btn)[1];
						var button = url.substr(url.indexOf('?')+1);
						var pid = fightResult.thief_id.replace(/[^\d]/g,'');
						var level = /(\d+)/.exec(fightResult.thief_class)[1];
						if (fightResult.thief_in_clan) {
							//var family = $(fightResult.thief_profile).find('a:first').attr('href');
							var familyid = atob(unescape(/id=([a-zA-Z0-9%]+)/.exec(fightResult.thief_profile)[1]));
						}
						if (!find_element(pid,'pid',targets)) {
							targets.splice(1,0,{"pid":pid,"button":button,"iced":false,"mafia":501,"name":"<span class=\"stamina\">"+stealer+"</span>","family":"","family_id":familyid,"level":level,"type":"Stealer"});
						}
					}
				}
			}
			// if (Util.isset(object.popup)) {
				// if($(object.popup).find('.ice_stolen_wrapper').size() > 0) {
					// var stealer = $(object.popup).find('.ice_stolen_revenge_name:first a:first').html();
					// log('Ice stolen by '+stealer+'!');
					// var url = $(object.popup).find('.ice_stolen_revenge_action:first a:first').attr('href');
					// var button = url.substr(url.indexOf('?')+1);
					// if (/javascript/.test(button)) {
						// log('Ice was stolen by a mafia member! '+stealer);
					// }
					// else {
						// var pid = /opponent_id=p%7C(\d+)/.exec(button)[1];
						// if ($('#'+spocklet+'_revenge').is(':checked')) {
							// if (!find_element(pid,'pid',targets)) {
								// targets.splice(1,0,{"pid":pid,"button":button,"iced":false,"mafia":501,"name":"<span class=\"stamina\">"+stealer+"</span>","family":"","family_id":0,"level":1,"type":"Stealer"});
							// }
						// }
					// }
				// }
			// }

			//show popups
			if (Util.isset(fightResult.feed_js)) {
				var type = '';
				var show = false;
				if (fightResult.you_just_iced) { 
					//show = false; 
					type = '<span style="color:#609AD1;">Iced</span>';
				}
				if (fightResult.you_just_killed) {
					type = '<span style="color:#990000;">Killed</span>';
				}
				var poptime = unix_timestamp();
				popups[poptime] = fightResult.feed_js;
				add_popup(poptime,type);
				if (show && $('#'+spocklet+'_popups').is(':checked')) {
					//$('#popup_fodder').prepend('<div id="'+poptime+'"></div>');
					//$('#'+object.bt).append(fightResult.feed_js);
					//eval(fightResult.feed_js);
					open_popup(poptime);
					$('#'+spocklet+'_pause').trigger('click');
				}
			}
			
			if (Util.isset(object.popup) && Util.isset(object.popup_id)) {
				//filter the popups to show
				var show = false;
				var type = '';
				if (/iced_popv2_wrapper/.test(object.popup)) { 
					show = false; 
					type = '<span style="color:#609AD1;">Iced</span>';
				}
				else if (/iced_event_iced_popup/.test(object.popup)) {
					show = false;
					type = 'Ice Event';
				}
				else if (/ice_stolen_wrapper/.test(object.popup)) {
					show = false;
					type = 'Ice stolen';
				}
				else if (promotion=/You are now LEVEL (\d+)/i.exec(object.popup)) {
					show = false;
					type = '<span style="color:yellow;">Promotion</span> level '+promotion[1];
				}
				else if (mastery=/You have reached level (\d+)/i.exec(object.popup)) {
					show = false;
					type = '<span style="color:green;">Fight Mastery</span> level '+mastery[1];
				}
				else {
					show = true;
					type = 'Unknown';
				}
				
				popups[object.popup_id] = object.popup;
				//if (type != 'Ice stolen') {
					add_popup(object.popup_id,type);
				//}
				//log('Found '+type+' popup, id: <a href="#" name="popup" popupid="'+object.popup_id+'">'+object.popup_id+'</a>');
				//list_popups();

				if (show && $('#'+spocklet+'_popups').is(':checked')) {
					$('#popup_fodder').prepend('<div id="'+object.popup_id+'"></div>');
					$('#'+object.popup_id).append(object.popup);
					//run = false;
					$('#'+spocklet+'_pause').trigger('click');
				}
			}
			
			//next action
			if (fightResult.cash_class.substr(1) != object.user_fields.currentCityLocalizedName.replace(/\s/,'_').toLowerCase().substr(1) && $('#'+spocklet+'_samecash').is(':checked')) {
				log('Cash not from active city '+object.user_fields.currentCityLocalizedName+', skipping '+targets[0].name+'...');
				skip_target();
				repeat_attack();
				return;
			}
			if (fightResult.defender.is_iced) {
				if (!$('#'+spocklet+'_keepice').is(':checked') || targets[0].type == 'Stealer') {
					skip_target();
				}
				repeat_attack();
				return;
			}
			if (!fightResult.isWin) {
				if (!$('#'+spocklet+'_redice').is(':checked') || targets[0].type == 'Stealer') {
					skip_target();
				}
				repeat_attack();
				return;
			}
			var mincash = parseInt($('#'+spocklet+'_mincash').val());
			if ((cashgained < mincash) && (mincash != 0)) {
				log('Cash below minimum value, skipping '+targets[0].name+'...');
				skip_target();
				repeat_attack();
				return;
			}
			if (fightResult.isWin && !fightResult.defender.is_iced) {
				msg('Attacking again!')
				repeat_attack();
				return;
			}
		}
		else {
			log('No fight result to parse... Stamina: '+User.stamina+' Health: '+User.health);
			if (User.health < parseInt($('#'+spocklet+'_health').val())) {
				msg('<span class="good">Going to hospital...</span>');
				var url = 'xw_controller=hospital&xw_action=heal&xw_city=&xcity=1';
				//request(url,function(response){ parse_hospital(response); },function(s){ pausing(10,'Page not loaded properly, trying again in ',function(){ repeat_attack(); }); });
				request(url,function(response){ parse_hospital(response); });
			}
			else {
				pausing(5,'No fight result to parse, retrying in ',function(){ repeat_attack(); });
			}
		}

		//} catch (wtf) { alert('Debug error:\n'+wtf.lineNumber+'\n'+wtf);	}
	}

	function travel(to,from) {
		//travel function
		var url = 'xw_controller=travel&xw_action=travel&destination='+to+'&from=fight';
		msg('Travelling from '+from+' to '+to+'...');
		request(url,function(s) { parse_travel(s); });
	}
	
	function parse_travel(response) {
		msg('Reading travel response...');
		active_city = /xw_city=(\d+)/.exec(response)[1];
		repeat_attack();
	}
	
	function load_profile(id) {
		msg('Loading profile page...');
		if (/p/.test(id)) {
			id = btoa(id);
		}
		var url = 'xw_controller=stats&xw_action=view&user='+id;
		request(url,function (response) { parse_profile_page(response); });
	}
	
	function parse_profile_page(response) {
		if (response.length == 0) {
			log('Borked response, 0 size, retrying...');
			repeat_attack();
			return;
		}
		msg('Reading profile page...');
		try {
			//search out the attack button, inject relevant info into targets
			var button = $(response).find('.impulse_buy:first').attr('href');
			if (button) {
				button = button.replace(/&amp;/g,'&').replace(/remote\/html_server.php\?/,'');
				var text = $(response).find('div[class*="stats_title"]').html();
				var family = $(response).find('div[class*="stats_title"] span:first').html();
				var level = /Level (\d+) (Fearless|Maniac|Mogul)/i.exec(text)[1];
				var type = /Level (\d+) (Fearless|Maniac|Mogul)/i.exec(text)[2];
				var name = /"(.*?)" level/.exec(text.replace(family,''))[1];

				if (/attack_pop/.test(button)) {
					var pid = /opponent_id=p%7C(\d+)/.exec(button)[1];
					targets.push({"pid":pid,"button":button,"iced":false,"mafia":501,"name":name,"family":family,"family_id":0,"level":level,"type":type});
					repeat_attack();
					return;
				}
				else {
					msg('No attack button found on profile page. Could be a mafia member? (case a)');
					log('No attack button found on profile page. Could be a mafia member? (case a)');
					repeat_attack();
					return;
				}
			}
			else {
				msg('No attack button found on profile page. Could be a mafia member?');
				log('No attack button found on profile page. Could be a mafia member?');
				repeat_attack();
				return;
			}
		}
		catch (profile_error) {
			alert('Profile Parse Error:\n'+profile_error.lineNumber+'\n'+profile_error);
		}
	}
	
	function load_targets() {
		var list = $('#'+spocklet+'_targets').val().trim().split(/[ \n]/);
		if (list[0] == '') {
			log('<span class="bad">Manual list was empty!</span> Make sure to use FBid (numbers only) or MWid (p|numbers).')
			msg('<span class="bad">Manual list was empty!</span> Make sure to use FBid (numbers only) or MWid (p|numbers).')
			run = false;
			return;
		}
		if (list_target >= list.length) {
			list_target = 0;
			log('Ran out of targets, restarting target list...');
			var wait = myRandom(parseInt($('#'+spocklet+'_delay1').val()),parseInt($('#'+spocklet+'_delay2').val()));
			pausing(wait,'Ran out of targets, reloading target list in',function(){ load_targets(); });
		}
		else {
			load_profile(list[list_target]);
			list_target++;
		}
		// for (var i = 0; i < list.length; i++) {
			// console.log(list[i]);
		// }
	}

	function calculate_health(damage,other_damage,health_pct) {
		target.damage_done += parseInt(damage);
		//target.damage_done += parseInt(other_damage);
		if (target.start_health_pct == 0) {
			target.start_health_pct = health_pct;
			target.prev_health_pct = health_pct;
		}
		else if ((health_pct > target.prev_health_pct) && (target.attacks > 1)) {
			//target did heal
			target.prev_health_pct = health_pct;
			target.start_health_pct = health_pct;
			target.damage_done = 0;
			return '<span class="health">Target healed!</span> ';
		}
		else {
			var pct_taken = parseInt(target.start_health_pct - health_pct);
			var total_health = parseInt((100/pct_taken)*target.damage_done);
			var current_health = parseInt((total_health*health_pct)/100);
			target.health = current_health;
			target.maxhealth = total_health;
			target.prev_health_pct = health_pct;
			return 'Life: '+current_health+'/~'+total_health+' ('+health_pct+'%) ';
		}
		return '';
	}

	function check_name(name) {
		var characters = $('#'+spocklet+'_namefilter').val().trim().split(/[ \n]/);
		for (var i = 0; i < characters.length; i++) {
			characters[i] = characters[i].replace(/[\s\r\n]/g, '');
			if (characters[i].length > 0) {
				if (name.indexOf(characters[i]) > -1) {
					return true;
				}
			}
		}
		return false;
	}

	function check_family(id) {
		var families = $('#'+spocklet+'_familyfilter').val().trim().split(/[ \n]/);
		for (var i = 0; i < families.length; i++) {
			families[i] = families[i].replace(/[\s\r\n]/g, '');
		}
		if (families.indexOf(id) > -1) {
			return true;
		}
		return false;
	}

	function skip_target() {
		msg('Skipping target...');
		targets.shift();
		prev_won = 0;
		prev_lost = 0;
		prev_cash = 0;
		target_attacks = 0;
		target.start_health_pct = 0;
		target.prev_health_pct = 0;
		target.damage_done = 0;
		target.attacks = 0;
		target.health = 0;
	}

	function load_fightlist() {
		msg('Loading fight list...')
		var url = 'xw_controller=fight&xw_action=view';
		request(url,function(response){ parse_fightlist(response,true); });
	}
	
	function load_rivals() {
		msg('Loading rivals...')
		var url = 'xw_controller=fight&xw_action=view&tab=1';
		request(url,function(response){ parse_fightlist(response,true); });
	}

	function parse_fightlist(response,attack) {
		if (fightlist != 'fightlist' && fightlist != 'rivals' ) {
			log('Attempted to load fightlist when we should not. Ignoring the load.')
			return;
		}
		if (!attack) {
			var tmptarget = targets[0];
			targets = [];
			if (!tmptarget.iced) {
				targets.push(tmptarget);
			}
		}
		if (/assassin-title.png/i.test(response)) {
			if (!raven_found) {
				log(ravenimg+' Boss fight Raven active!');
			}
			raven_found = true;
		}
		// if (/Fight-Assassin-Pic.png/i.test(response)) {
			// log(ravenimg+' Boss fight Raven lurking in shadows!');
		// }

		parse_vc_count(response);
		$('#user_health').html(parseInt(/user_health.*?(\d+)/.exec(response)[1]));
		//log('Start Stamina: '+parseInt(/user_stamina.*?(\d+)/.exec(response)[1]));
		$(response).find('tr').filter(function() {
			return $(this).parent().parent().attr('cellspacing') == '0';
		}).each(function(index) {
			var family = '';
			var family_id = 0;
			if ($(this).find('td:first a').size() > 2) {
				family = $(this).find('td:first a').eq(1).text();
				family_id = atob(unescape(/id=([a-zA-Z0-9%]+)/.exec($(this).find('td:first a').eq(1).attr('href'))[1]));
			}
			var name = $(this).find('td:first a:last').text();
			if (name) {
				var level = /Level (\d+) (Fearless|Maniac|Mogul)/.exec($(this).find('td:first').html())[1];
				var type = /Level (\d+) (Fearless|Maniac|Mogul)/.exec($(this).find('td:first').html())[2];
				var mafia = $(this).find('td').eq(1).html().trim();
				var iced = $(this).find('td:first img').attr('src') == 'http://mwfb.static.zgncdn.com/mwfb/graphics/iced.png' ? true : false;
				var button = $(this).find('td.action a:first').attr('href').replace(/&amp;/g,'&').replace(/remote\/html_server.php\?/,'');
				var pid = /btn_attack_p(\d+)/.exec(button)[1];
				//old fight layout check
				if (/xw_action=attack&/.test(button)) {
					log('<span class="bad">Sorry, it appears that you have the old fighting layout. Assassin-a-Nator is only for the new layout.</span>')
					alert('Sorry, it appears that you have the old fighting layout.\nAssassin-a-Nator is only for the new layout.')
					return false;
				}

				if (!iced) {
					if (!find_element(pid,'pid',targets)) {
						targets.push({"pid":pid,"button":button,"iced":iced,"mafia":mafia,"name":name,"family":family,"family_id":family_id,"level":level,"type":type});
					}
				}
			}
		});
		//log('Targets in queue: '+targets.length+' Whitelist: '+whitelist.length+' Blacklist: '+blacklist.length);
		if (attack) {
			repeat_attack();
		}
	}
	function visit_hospital() {
		if ((active_city == hospital_city) || (hospital_city == 1)) {
			msg('<span class="good">Going to hospital...</span>');
			var url = 'xw_controller=hospital&xw_action=heal&xw_city=';
			if (hospital_city == 1) {
				url = url+'&xcity=1';
			}
			//request(url,function(response){ parse_hospital(response); });
			request(url,function(response){ parse_hospital(response); },function(s){ pausing(10,'Page not loaded properly, trying again in ',function(){ repeat_attack(); }); });
		}
		else {
			msg('<span class="good">Travelling to hospital city...</span>');
			travel(hospital_city,active_city);
		}
	}
	function parse_hospital(hospital) {
		var object = jQuery.parseJSON(hospital.replace(/^(\s\d\s+)/,''));
		update_game_ui(object);
		if (object.heal_success == 1) {
			var cost = parseInt(/for .*?\$.*?([\d,]+)/.exec(object.hospital_message)[1].replace(/[^\d]/g,''));
			stats.money_gained -= cost;
			if (Util.isset(cash['new_york'])) {
				cash['new_york'] -= cost;
			}
			else {
				cash['new_york'] = (-cost);
			}
		}
		log(object.hospital_message);
		if (/You cannot heal so fast/.test(object.hospital_message)) {
			pausing(10,'Retrying heal in ...',function(){ repeat_attack(); });
			return;
		}
		else {
			if (start_city != active_city) {
				msg('<span class="sexy_travel_new">Travelling back to start city...</span>');
				travel(start_city,active_city);
			}
			else {
				repeat_attack();
			}
		}
	}

	function loadInventory(handler) {
		request('xw_controller=inventory&xw_action=view&from_controller=inventory',function(response){
			itemdatabase={};
			var ZyngaItems = jQuery.parseJSON(/var Items = \{\s+data: (\{.*?\})\};/.exec(response)[1]);
			var WorstItems = jQuery.parseJSON(/MW.WorstItemsModule.update\((\{.*\})\);/.exec(response)[1]);
			//Locations = jQuery.parseJSON(/var Locations = \{\s+data: (\{.*?\})\};/.exec(response)[1]);
			for (x in ZyngaItems) {
				ZyngaItems[x].combined = parseInt(ZyngaItems[x].attack+ZyngaItems[x].defense);
				itemdatabase[ZyngaItems[x].id] = ZyngaItems[x]; //{quantity: ZyngaItems[x].quantity}
			}
			msg('Done loading inventory. Press green start button to begin Assassin-a-Nating!');
			controls_display(true,false,true);
			handler(itemdatabase);
		});
	}

	function load_vc_count() {
		var url = 'xw_controller=fight&xw_action=view';
		request(url,function(s){ parse_vc_count(s); });
	}

	function parse_vc_count(msg) {
		var coins = parseInt($(msg).find('.fightmastery_tokens:first').html().replace(/,/,''));
		if (stats.vc_start == 0) {
			stats.vc_count = coins;
			stats.vc_start = coins;
			$('#'+spocklet+'_vcoins').html(coins);
		}
		else {
			stats.vc_count = coins;
			$('#'+spocklet+'_vcoins').html(stats.vc_count+' (<span class="good">+'+parseInt(stats.vc_count-stats.vc_start)+'</span>)');
		}
	}

	function update_sig() {
		//function to get the local_xw_sig value
		cb = userid+unix_timestamp();
		var params = {
			"cb": cb,
			"xw_client_id": 8,
			"ajax": 1,
			"liteload": 1,
			"sf_xw_sig": local_xw_sig,
			"sf_xw_user_id": userid
		};
		$.ajax({
			type: "POST",
			url: 'http://facebook.mafiawars.zynga.com/mwfb/sf_updater.php',
			data: params,
			success: function (response) {
				//console.log('Before: '+local_xw_sig);
				local_xw_sig = /([a-f0-9]{32})/.exec(response)[1];
				//console.log('After: '+local_xw_sig);
			}
		});
	}

	function find_element(search,property,array) {
		for (var x in array) {
			if (search == array[x][property]) {
				return array[x];
			}
		}
		return false;
	}

	function controls_display(play,pause,stop) {
		//helper function to toggle the icons
		play ? $('#'+spocklet+'_play').css({'display':'inline-block'}) : $('#'+spocklet+'_play').css({'display':'none'});
		pause ? $('#'+spocklet+'_pause').css({'display':'inline-block'}) : $('#'+spocklet+'_pause').css({'display':'none'});
		stop ? $('#'+spocklet+'_close').css({'display':'inline-block'}) : $('#'+spocklet+'_close').css({'display':'none'});
	}

	function set_background(city) {
		$('#'+spocklet+'_background').css('background-image',backgrounds[city]);
		$('#'+spocklet+'_background').css('background-repeat','no-repeat');
	}

	// createCookie from Vern's Toolkit http://vern.com/mwtools/
	function createCookie(name, value) {
		var expires = new Date();
		expires.setDate(expires.getDate() + 14);
		document.cookie = name + "=" + value + ";expires=" + expires.toGMTString() + "; path=/";
	}

	// readCookie from Vern's Toolkit http://vern.com/mwtools/
	function readCookie(name) {
		var i, cookie, nameEQ = name + "=",	cookieArray = document.cookie.split(";");
		for (i = 0; i < cookieArray.length; i++) {
			cookie = cookieArray[i];
			while (cookie.charAt(0) == ' ')
				cookie = cookie.substring(1, cookie.length);
			if (cookie.indexOf(nameEQ) == 0)
				return cookie.substring(nameEQ.length, cookie.length);
		}
		return null;
	}

	function saveForm(cookiename) {
		var output = new Object();
        var inputs = $(':input[name="'+tagname+'"]');
        for (var i=0;i<inputs.length;i++) {
        	switch(inputs[i].type) {
				case 'select-one':
					output[inputs[i].id] = inputs[i].selectedIndex;
					break;
				case 'text':
					output[inputs[i].id] = inputs[i].value;
					break;
				case 'checkbox':
					output[inputs[i].id] = inputs[i].checked;
					break;
				case 'textarea':
					output[inputs[i].id] = escape(inputs[i].value);
					break;
				default:
					alert(inputs[i].type);
			}
        }
		createCookie(cookiename,JSON.stringify(output));
		//console.log(JSON.stringify(output));
	}

	function loadForm(cookiename) {
		var cookie = readCookie(cookiename);
		var input = JSON.parse(cookie);
		for (name in input) {
			try {
				var el = $(':input[id="'+name+'"]')[0];
				if(el) {
					switch (el.type) {
						case 'select-one':
							el.selectedIndex = input[name];
							break;
						case 'text':
							el.value = input[name];
							break;
						case 'checkbox':
							el.checked = input[name];
							break;
						case 'textarea':
							el.value = unescape(input[name]);
							break;
					}
				}
			}
			catch(e) { }
		}
	}

	function verify_input(value,maxvalue,safe) {
		var value = parseInt(value);
		var maxvalue = parseInt(maxvalue);
		var safe = parseInt(safe);

		if (isNaN(value)) {
			//$('#'+spocklet+'_filter_error').html('Not a number!').fadeOut(5000, function() {$('#'+spocklet+'_filter_error').html('').show();});
			$('#'+spocklet+'_filter_error').html('Not a number!');
			setTimeout(function(){$('#'+spocklet+'_filter_error').html('').hide();},2000);
			//$('#'+spocklet+'_filter_error').fadeOut('slow');
			return safe;
		}
		else if (value > maxvalue) {
			//$('#'+spocklet+'_filter_error').html('Above maximum value: '+maxvalue+'!').fadeOut(5000, function() {$('#'+spocklet+'_filter_error').html('').show();});
			$('#'+spocklet+'_filter_error').html('Above maximum value: '+maxvalue+'!');
			setTimeout(function(){$('#'+spocklet+'_filter_error').html('').gude();},2000);
			//$('#'+spocklet+'_filter_error').fadeOut('slow');
			return safe;
		}
		else {
			$('#'+spocklet+'_filter_error').html('').show();
			return value;
		}
	}

	create_div();
	set_background(xw_city);
	loadForm(spocklet+'_cookie');

	if (xw_city == 1) {
		$('#'+spocklet+'_bankamount').val('0');
		$('#'+spocklet+'_bankamount').trigger('keyup');
	}
	controls_display(false,false,true);

	if ($('#'+spocklet+'_restart').is(':checked')) {
		$('#'+spocklet+'_restart_row').show();
	}
	else {
		$('#'+spocklet+'_restart_row').hide();
	}

	//bind buttons
	$('#'+spocklet+'_play').click(function() {
		run = true;
		//start_time = 0;
		clearInterval(timer);
		controls_display(false,true,true);
		$('#'+spocklet+'_donate').animate({ color: "white" }, 1000, "swing" ,function() { $('#'+spocklet+'_donate').animate({ color: "black" }, 1000); });
		if (fightlist == 'fightlist') {
			load_fightlist();
		}
		if (fightlist == 'targetlist') {
			targets = [];
			load_targets();
		}
		if (fightlist == 'rivals') {
			targets = [];
			load_rivals();
		}
		//repeat_attack();
		return false;
	});

	$('#'+spocklet+'_pause').click(function() {
		run = false;
		controls_display(true,false,true);
		clearInterval(timer);
		//load_vc_count();
		if (/(Restarting in|Attacking again)/.test($('#'+spocklet+'_status').html())) {
			clearInterval(timer);
			msg('Paused...');
		}
		return false;
	});

	$('#'+spocklet+'_close').click(function() {
		run = false;
		clearInterval(timer);
		clearInterval(refresh_timer);
		$('#'+spocklet+'_main').remove();
		//document.getElementById('user_stats').getElementsByClassName('experience')[0].innerHTML = 'Experience to Level Up <strong><span id="exp_to_next_level" style="text-align: right; float: right; min-width: 30px;">Spock on!</span></strong>';
	});
	
	$('#'+spocklet+'_save').click(function() {
		saveForm(spocklet+'_cookie');
		alert(version+'\nSettings saved!');
	});

	$('#'+spocklet+'_restart').change(function() {
		if ($('#'+spocklet+'_restart').is(':checked')) {
			$('#'+spocklet+'_restart_row').show();
		}
		else {
			$('#'+spocklet+'_restart_row').hide();
		}
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_sortloot').click(function () {
		sortlootindex = sortlootindex+1;
		if (sortlootindex>=sortloot.length) {
			sortlootindex = 0;
		}
		this.innerHTML = sortloot[sortlootindex];
		update_loot_log();
		return false;
	});

	//runtime toggle icon, somewhat hidden, no need to encourage 0-0 timers
	var pos = $('#'+spocklet+'_main').position();
	$('#'+spocklet+'_main').prepend('<a href="#" id="'+spocklet+'_runtime_row_toggle" class="'+spocklet+'_toggle"><img src="'+clockimg+'" width="2" height="1" style="position: absolute; left:'+parseInt(pos.left+7)+'px; top: '+parseInt(pos.top+7)+'px;" alt="Show/Hide runtime" title="Show/Hide runtime" /></a>');
	$('#'+spocklet+'_main').prepend('<span style="position: absolute; left:'+parseInt(pos.left+670)+'px; top: '+parseInt(pos.top+10)+'px;">'+fblike+'</span>');

	$('#'+spocklet+'_filters_toggle').toggle(
		function() {
			$('#'+spocklet+'_arrow').css({
				'-webkit-transform': 'rotate(-180deg)',
				'-moz-transform': 'rotate(-180deg)'
			});
			$('#'+this.id.replace(/_toggle/,'')).show();
		},
		function() {
			$('#'+spocklet+'_arrow').css({
				'-webkit-transform': 'rotate(-360deg)',
				'-moz-transform': 'rotate(-360deg)'
			});
			$('#'+this.id.replace(/_toggle/,'')).hide();
		}
	);

	$('a[class='+spocklet+'_toggle]').bind('click',function() {
		$('#'+this.id.replace(/_toggle/,'')).toggle();
		return false;
	});

	$('#'+spocklet+'_config_toggle').bind('click',function() {
		$('#'+this.id.replace(/_toggle/,'')).toggle();
		return false;
	});
	$('#'+spocklet+'_config').draggable();

	$('#'+spocklet+'_log_toggle, #'+spocklet+'_loot_toggle, #'+spocklet+'_popup_toggle').toggle(
		function() {
			$('#'+this.id.replace(/_toggle/,'')).hide();
			$(this).addClass('black').removeClass('green');
		},
		function() {
			$('#'+this.id.replace(/_toggle/,'')).show();
			$(this).addClass('green').removeClass('black');
		}
	);
	$('#'+spocklet+'_heal').toggle(
		function() {
			$(this).addClass('orange').removeClass('green').html('<span><span>Active City</span></span>');
			use_hospital = true;
			hospital_city = start_city;
		},
		function() {
			$(this).addClass('black').removeClass('orange').html('<span><span>Disabled</span></span>');
			use_hospital = false;
		},
		function() {
			$(this).addClass('green').removeClass('black').html('<span><span>New York</span></span>');
			use_hospital = true;
			hospital_city = 1;
		},
		function() {
			$(this).addClass('green').removeClass('black').html('<span><span>Bangkok</span></span>');
			use_hospital = true;
			hospital_city = 4;
		},
		function() {
			$(this).addClass('green').removeClass('black').html('<span><span>Las Vegas</span></span>');
			use_hospital = true;
			hospital_city = 5;
		},
		function() {
			$(this).addClass('green').removeClass('black').html('<span><span>Italy</span></span>');
			use_hospital = true;
			hospital_city = 6;
		},
		function() {
			$(this).addClass('green').removeClass('black').html('<span><span>Brazil</span></span>');
			use_hospital = true;
			hospital_city = 7;
		}
	);
	$('#'+spocklet+'_mode').toggle(
		function() {
			$(this).addClass('white').removeClass('orange').html('<span><span>Target List</span></span>');
			fightlist = 'targetlist';
			$('#'+spocklet+'_targetlist').show();
			log('Enabling target list. Tip: Disable revenge fighting.')
		},
		function() {
			$(this).addClass('orange').removeClass('white').html('<span><span>Rivals List</span></span>');
			fightlist = 'rivals';
			$('#'+spocklet+'_targetlist').hide();
			log('Enabling Rivals mode.');
		},
		function() {
			$(this).addClass('black').removeClass('orange').html('<span><span>Fightlist Mode</span></span>');
			fightlist = 'fightlist';
			$('#'+spocklet+'_targetlist').hide();
			log('Enabling fightlist mode.');
		}
	);
	
	//bind events for error checking user input boxes
	$('#'+spocklet+'_maxattacks').bind('keyup',function() {
		this.value = verify_input(this.value,99999,0);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_maxhealth').bind('keyup',function() {
		this.value = verify_input(this.value,99999,0);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_mafia_low').bind('keyup',function() {
		this.value = verify_input(this.value,501,1);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_mafia_high').bind('keyup',function() {
		this.value = verify_input(this.value,501,501);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_level_low').bind('keyup',function() {
		this.value = verify_input(this.value,25000,1);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_level_high').bind('keyup',function() {
		this.value = verify_input(this.value,25000,25000);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_attacks_todo').bind('keyup',function() {
		this.value = verify_input(this.value,9999,0);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_logsize').bind('keyup',function() {
		if (isNaN(this.value)) {
			this.value = 10;
		}
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_bankamount').bind('keyup',function() {
		this.value = verify_input(this.value,999999999,100000);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_delay1, #'+spocklet+'_max_burners').bind('keyup',function() {
		if (isNaN(this.value)) {
			$(this).val('1');
		}
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_health').bind('keyup',function() {
		if (isNaN(this.value)) {
			$(this).val('50');
		}
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_delay2').bind('keyup',function() {
		if (isNaN(this.value)) {
			$(this).val('3');
		}
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_popups, #'+spocklet+'_levelup, #'+spocklet+'_power, #'+spocklet+'_revenge, #'+spocklet+'_samecash, #'+spocklet+'_blacklist').change(function() {
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_namefilter').bind('keyup paste',function() {
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_familyfilter').bind('keyup paste',function() {
		this.value = this.value.replace(/[^\d\s]/g,'');
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_targets').bind('keyup paste',function() {
		this.value = this.value.replace(/[^\d\sp|]/g,'');
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_help').click(function() {
		$('#'+spocklet+'_faq').show();
	});
	$('#'+spocklet+'_addfamily').click(function() {
		var m,famlink=prompt("Paste family profile link here.\nExample: http://apps.facebook.com/inthemafia/family.php?id=%7B%22id%22%3A%22Mjc%3D%22%7D");
		if (m = /id=%7B%22id%22%3A%22([\w\d\%]+)%22%7D/.exec(famlink)) {
			var famid = atob(unescape(m[1]));
			$('#'+spocklet+'_familyfilter').val($('#'+spocklet+'_familyfilter').val()+"\n"+famid);
			saveForm(spocklet+'_cookie');
		}
	});
	$('#'+spocklet+'_addtarget').click(function() {
		var m,famlink=prompt("Paste MW profile link here.\nExample: http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22cHwxMjM0NQ%3D%3D%22%7D");
		if (m = /id=%7B%22user%22%3A%22([\w\d\%]+)%22%7D/.exec(famlink)) {
			var famid = atob(unescape(m[1]));
			$('#'+spocklet+'_targets').val($('#'+spocklet+'_targets').val()+"\n"+famid);
			saveForm(spocklet+'_cookie');
		}
	});
	
	//get started with the bookmarklet
	msg('<span class="good">Loading game inventory database. Please wait...</span>');
	loadInventory(function(){
		//msg('<span class="good">Loading fightlist. Please wait... (2/2)</span>');
		//load_fightlist();
	});
	//controls_display(true,false,true);
	$('#'+spocklet+'_donate').effect("pulsate", { times:2 }, 750);

	update_sig();
	refresh_timer = setInterval(update_sig, 300000);
	//log('This is <span class="good">'+version+'</span>, a bookmarklet from <strong>Spockholm Mafia Tools</strong><br /> Visit our <a href="http://www.facebook.com/mafiatools/">[Fan Page]</a> or website <a href="http://www.spockholm.com/mafia/testing.php">[spockholm.com]</a> for more bookmarklets.');

	if (/snapi_auth_hash/.test(document.location)) {
		log('It looks like you have unframed the Facebook wrapped game. Some popups may not work properly because of that. We recommend you to unframe <a href="http://www.mafiawars.com">http://www.mafiawars.com</a> or use the direct-unframed link <a href="http://bit.ly/mwunframed">http://bit.ly/mwunframed</a>.')
	}
	if (ff=/Firefox\/(\d)/.exec(navigator.userAgent)) {
		if (ff[1] == 3) {
			log('<span class="bad">We have detected Firefox 3.x.</span> This may be a problem with this spocklet, you should consider <a href="http://www.getfirefox.com/">upgrading</a>. Your browser is reporting the following:<br />'+navigator.userAgent);
		}
	}	
	//add analytics
	function loadContent(file){
		var head = document.getElementsByTagName('head').item(0);
		var scriptTag = document.getElementById('loadScript');
		if(scriptTag) head.removeChild(scriptTag);
			script = document.createElement('script');
			script.src = file;
			script.type = 'text/javascript';
			script.id = 'loadScript';
			head.appendChild(script);
	}
	loadContent('http://www.google-analytics.com/ga.js');
	try {
		var pageTracker = _gat._getTracker("UA-8435065-3");
		pageTracker._trackPageview();
		pageTracker._trackPageview("/script/Assassin-a-Nator");
	}
	catch(err) {}
	//end analytics
})()