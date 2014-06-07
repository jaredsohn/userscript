// ==UserScript==
// @name           Robber redux
// @author         spockholm
// @description     apasajalah
// ==/UserScript==

/* 
	Credits:
	Vern for a lot of code and inspiration, http://vern.com/mwtools/
	Max Power for the loot logging code.
	Pistol Pete for contributing code and being awesome.
	All fans who appriciate the work we do!
	
	Spockholm Mafia Tools: http://www.spockholm.com/mafia/bookmarklets.php
	Facebook: http://www.facebook.com/mafiatools
	Discussion: http://www.facebook.com/topic.php?uid=92178514356&topic=22988
	
	2010-xx-xx	v0.99	First experimental release of bookmarklet.
	2010-12-18	v1.03	Release with auto restart, will probably break down a lot.
	
	TODO:
	- Wake up from the code nightmare this bookmarklet has become
	- Option to select multiple properties
	- Manual input of FB/MW ids to rob
	- Filter for targets based on mafia size and level like RJ Vegas does. Mafia size will not work for the manual list, info is not available on profile pages, only fight page.
	- Log of successfully robbed ids for future usage with the manual list.
	- Store settings in cookie
	- Add ratio stop options
	- Add possibility to run on Rob page like the current Robber does. (Low priority)
	- Auto restart option, will keep this on ice for now to avoid strange bugs. Should be easy to fix once the bookmarklet more core.
	- Fix for all cities COMPLETED
	- Add links to profiles in log COMPLETED
	- Fix stats_ratio function COMPLETED
*/
javascript:
(function(){
try {
if (navigator.appName == 'Microsoft Internet Explorer') {
	alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
}
else if (document.getElementsByName('mafiawars')[0]) {
	window.location.href=document.getElementsByName('mafiawars')[0].src;
	return;
}
else if (document.getElementById('some_mwiframe')) {
	//new mafiawars.com iframe
	window.location.href=document.getElementById('some_mwiframe').src;
	return;
}
else if (document.getElementsByClassName('canvas_iframe_util')[0]) {
	window.location.href=document.getElementsByClassName('canvas_iframe_util')[0].src;
	return;
}
else {
	document.body.parentNode.style.overflowY="scroll";
	document.body.style.overflowX="auto";
	document.body.style.overflowY="auto";
	try {
		document.evaluate('//div[@id="mw_city_wrapper"]/div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).style.margin="auto";
		if(typeof FB !== 'undefined') {
			FB.CanvasClient.stopTimerToSizeToContent; 
			window.clearInterval(FB.CanvasClient._timer);
			FB.CanvasClient._timer=-1;
		}
		document.getElementById('mw_zbar').parentNode.removeChild(document.getElementById('mw_zbar'));
	}
	catch (fberr) {}
}

var e,m,mc,mcb,i,l,j,t,version='Robber Redux v1.03 experimental',
levelup='<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_promote_up_15x15_01.gif" width="13" height="13" title="Level up">',
job=0,exp=0,exp_now=0,exp_next=0,loot='',completed='',sign='$',exp_gained=0,stamina_spent=0,money_gained=0,retries=0,combinedloot='',
onevent='Continue',pauseevent,wheel=0,master=0,bag=0,content=document.getElementById('content_row');
var timestamping = true;
var log_keep=/(KEEPnothing)/;
var log_size=10;
var jobstodo=0;
var lootcount=0;
var userid = /sf_xw_user_id=([a-z]\|[0-9]+)/.exec(document.body.innerHTML)[1];
var preurl = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?';
var run = true;
var object = {}, objectdata = {};
var robrepeats = 5, timesrobbed = 0;
var wait1 = 2, wait2 = 3;
var failed = 0;
//var healthimg = '<img src="http://mwfb.static.zynga.com/mwfb/graphics/v3/icons_2115x20_05.png" />';
var healthimg = 'Damage';

var debug = false;
var robquick = true;

var profiles = [];
var profilenames = [];
var	profilenum = -1;
var robtmp = null;
var properties = {
	"1" : [
		{"name":"flophouse","fullname":"Flophouse"},
		{"name":"pawnshop","fullname":"Pawnshop"},
		{"name":"tenement","fullname":"Tenement"},
		{"name":"warehouse","fullname":"Warehouse"},
		{"name":"mafiamikes","fullname":"Restaurant?"},
		{"name":"dockyard","fullname":"Dockyard"},
		{"name":"office","fullname":"Office Park"},
		{"name":"hotel","fullname":"Uptown Hotel"},
		{"name":"casino","fullname":"Mega Casino"},
		{"name":"chopshop","fullname":"Chop Shop (Car Part)"},
		{"name":"weaponsdepot_01","fullname":"Weapons Depot (Weapon Part)"},
		{"name":"armory","fullname":"Armory (Armor Part)"},
		{"name":"zoo","fullname":"Zoo (Animal Feed)"}
	],
	"2" : [
		{"name":"bodega","fullname":"Bodega"},
		{"name":"tobacco","fullname":"Tobacco Plantation"},
		{"name":"sugar","fullname":"Sugar Plantation"},
		{"name":"factory","fullname":"Factory"},
		{"name":"cocafield","fullname":"Cocoa Field"},
		{"name":"briberyring","fullname":"Bribery Ring (Politico Corrupto)"}
	],
	"3" : [
		{"name":"taxi","fullname":"Unlicensed Taxi Stand"},
		{"name":"cigarette","fullname":"Cigarette Warehouse"},
		{"name":"carlot","fullname":"Back-market Car Lot"},
		{"name":"munitions","fullname":"Munitions Camp"},
		{"name":"trafficking","fullname":"Trafficking Operation"}
	],
	"4" : [
		{"name":"fish","fullname":"Fish Fighting Arena"},
		{"name":"cockfight","fullname":"Cockfighting Pen"},
		{"name":"tourist","fullname":"Tourist Guide Scam"},
		{"name":"gamblingden","fullname":"Gambling Den"},
		{"name":"drugsmuggling","fullname":"Drug Smuggling Ring (Drug Shipment)"},
		{"name":"piracy","fullname":"Piracy Operation (Pirates)"},
		{"name":"gunrunning","fullname":"Ammo Training Camp (Black Market Ammo)"},
		{"name":"yaba","fullname":"Yaa Baa Parlor (Hyper Alert Sentry)"}
	],
	"5" : [
		{"name":"slots","fullname":"Slots"},
		{"name":"tablegames","fullname":"Table Games"},
		{"name":"restaurant","fullname":"Restaurant"},
		{"name":"poker","fullname":"Poker Room"},
		{"name":"fountain","fullname":"Fountain"},
		{"name":"hotel","fullname":"Hotel"}
	],
	"6" : [
		{"name":"fishery","fullname":"Fishery"},
		{"name":"villa","fullname":"Villa"},
		{"name":"winery","fullname":"Winery"},
		{"name":"autoboutique","fullname":"Autoboutique"},
		{"name":"stadium","fullname":"Stadium"}
	]
};
var propnametorob = '';
//http://api.jquery.com/val/
var city = /mw_city(\d+)/.exec(document.getElementById('mw_city_wrapper').className)[1];
//if((city != 1) && (city != 3) && (city != 5) && (city != 6)) {
	//alert('This release is only tested in New York/Moscow/Vegas/Italy.\nIt could blow up other cities, consider this a warning :)\n/Team Spockholm');
	//return;
//}
//var city = '4';

function initialize() {
	profiles = [];
	profilenames = [];
	profilenum = -1;
	var as = document.getElementsByClassName('main_table fight_table')[0].getElementsByTagName('a');
	for(var i=0; i<as.length; i++) {
		if(/html_server.php\?xw_controller=stats.*?xw_action=view.*?ref=fight_list/.test(as[i].href)) {
			profiles.push(as[i].href);
			profilenames.push(as[i].innerHTML.replace(/[^\w]/g,''));
			//if (debug) console.log('url: '+as[i].href);
			//if (debug) console.log('html:' +as[i].innerHTML.replace(/[^\w]/g,''));
		}
	}
	msg('Loaded '+profiles.length+' profiles. <span class="good">Waiting for property selection...</span>');
}
function restart() {
	run = true;
	document.getElementById('play').style.display = 'none';
	document.getElementById('pause').style.display = 'inline';
	msg('Starting to rob people...');
	initialize();
	check_next();
}
var pageprofiles = [];
var levelrestriction = 1500;
var mafiarestriction = 501;
function readFightPage() {
	function profileObject(title,name,level,mafia,profileurl) {
		this.title = title;
		this.name = name;
		this.level = parseInt(level);
		this.mafia = parseInt(mafia);
		this.profileurl = profileurl;
		this.testlevel = function() {
			return (this.level <= levelrestriction)?true:false;
		}
		this.testmafia = function() {
			return (this.mafia <= mafiarestriction)?true:false;
		}
	}
	var rows = document.getElementsByClassName('main_table fight_table')[0].getElementsByTagName('tr');
	for (i=1,stop = rows.length;i<stop;i++) {
		var cleaned = rows[i].getElementsByTagName('td')[0].innerHTML;
		var title = $.trim(/(.*?)<\/span>/.exec(cleaned)[1]);
		var name = />(.*?)</.exec(cleaned)[1];
		var level = /Level (\d+)/.exec(cleaned)[1];
		var mafia = $.trim(rows[i].getElementsByTagName('td')[1].innerHTML);
		var profileurl = rows[i].getElementsByTagName('td')[0].getElementsByTagName('a')[0].href;
		pageprofiles[pageprofiles.length] = new profileObject(title,name,level,mafia,profileurl);
		//output += title+' '+name+' '+level+' '+mafia+'\n';
		i++;
	}
	//alert(pageprofiles['1'].testlevel());
}


var style = '<style type="text/css">'+
	'.messages img{margin:0 3px;vertical-align:middle}'+
	'.messages input {border: 1px solid #888;margin 0;padding 0;background: #000; color: #FFF; width: 32px;}'+
	'#play{display:none}'+
	'#pause{display:none}'+
	'#close{display:inline}'+			
'</style>';

var config_html =
style+
'<table class="messages" >'+
'<tr>'+
	'<td colspan="3" align="right" style="text-align:right;font-size:1.1em;">'+version+' - Visit <a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_top">Spockholm Mafia Tools</a> - <a href="http://www.spockholm.com/mafia/donate.php" id="donate" alt="Donate a beer" target="_blank">Donate</a> - <a href="http://www.spockholm.com/mafia/help.php" alt="Help" target="_blank">Help</a> - '+
	'<a href="#" id="play"><img src="http://www.spockholm.com/mafia/play.gif" title="Play" width="16" height="16"></a>'+
	'<a href="#" id="pause"><img src="http://www.spockholm.com/mafia/pause.gif" title="Pause" width="16" height="16"></a>'+
	'<a href="#" id="close"><img src="http://www.spockholm.com/mafia/stop.gif" title="Close" width="16" height="16"></a>'+
	'</td>'+
'</tr>'+
'<tr><td colspan="3"><hr /><td></tr>'+
'<tr>'+
	'<td>Robberies done:</td><td><span id="jobs">0</span> of <input id="jobstodo" name="jobstodo" type="text" value="'+jobstodo+'" maxlength="4" /> (0 = Unlimited) &nbsp; Auto-Restart:<input type="checkbox" id="do_restart" checked /></td><td align="right" style="text-align:right;"><a href="#" id="onevent">'+onevent+'</a> on event</tr>'+
'<tr>'+
	'<td>Select property to rob:</td><td><select id="propselect">';
	for (x in properties[city]) {
		config_html += '<option value="'+properties[city][x].name+'">'+properties[city][x].fullname+'</option>'
	}
	config_html += '</select> - Rob <input id="robrepeats" name="robrepeats" type="text" value="'+robrepeats+'" maxlength="3" /> times.</td>'+
	'<td align="right" valign="top" style="text-align:right;">Delay: <input id="delay1" name="delay1" type="text" value="'+wait1+'" maxlength="4" /> to <input id="delay2" name="delay2" type="text" value="'+wait2+'" maxlength="4" />sec</td>'+
'</tr>'+
'<tr>'+
	'<td>Stats:</td>'+
	'<td colspan="2">Exp: <span id="exp_gained" class="good">-</span> Stamina: <span id="stamina_spent" class="good">-</span> <span id="exp_ratio" class="more_in"></span>&nbsp; Money: <span id="money_gained">-</span></td>'+
'</tr>'+
'<tr>'+
	'<td>Status:</td>'+
	'<td colspan="3" id="status"></td>'+
'</tr>'+
'<tr>'+
	'<td valign="top"><a href="#" id="lootshow">Hide</a> loot:</td>'+
	'<td colspan="2"><span id="lootstats"></span><br /><span id="loot">No loot found yet.</span></td>'+
'</tr>'+
'<tr>'+
	'<td valign="top"><a href="#" id="logshow">Showing</a> Log:<br />Limit: <input id="logsize" name="logsize" type="text" value="'+log_size+'" maxlength="4" /></td>'+
	'<td colspan="2" id="log"></td>'+
'</tr>'+
'<tr id="startrow">'+
	'<td colspan="3"><a class="sexy_button" id="start">Start Robbing</a></td>'+
'</tr>'+
'</table>';

function create_div() {
	if(document.getElementById('spockdiv')) {
		document.getElementById('spockdiv').innerHTML = config_html;
	}
	else {
		var spock_div=document.createElement("div");
		spock_div.id = 'spockdiv';
		spock_div.innerHTML = config_html;
		content.insertBefore(spock_div, content.firstChild);
	}
}
function myRandom(min,max) {
	return min + Math.floor(Math.round((Math.random() * (max - min))));
}
function msg(s) {
	document.getElementById('status').innerHTML = s;
}
function commas(s) {
	while (d=/(\d+)(\d{3}.*)/.exec(s)) {
		s = d[1] + ',' + d[2];
	}
	return s;
}
// deliberate pause from Vern's toolkit.js, http://vern.com/mwtools/
// given a number of seconds, an optional message and a resume
// function, will pause a few seconds and then execute the function
function pausing(seconds,message,resume_func) {
	// if the message was left out, shuffle things a bit
	if (typeof(message) == 'function') {
		resume_func = message;
		message = null;
	}
	if (message)
		message=message;
	else
	message='Pausing';
	msg(message+' <span id="seconds">'+seconds+' second'+(seconds==1?'':'s')+'</span>...');
	//var me = this;
	var timer = setInterval(function(){//)
		seconds--;
		if (document.getElementById('seconds'))
			document.getElementById('seconds').innerHTML=seconds+' second'+(seconds==1?'':'s');
		else
			clearInterval(timer);
		if (seconds<=0) {
			clearInterval(timer);
			if (typeof(resume_func) == 'function')
				resume_func();
		}
	},1000);
}
function profile_link() {
	var mwid = atob(/user=([A-Za-z0-9]+)/.exec(profiles[profilenum])[1]).substr(2);
	var name = profilenames[profilenum];
	return '<a onclick=" return do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=stats&amp;xw_action=view&amp;xw_city='+city+'&amp;tmp=&amp;cb=&amp;xw_person=&amp;user=p%7C'+mwid+'&amp;ref=fight_list\'\, 1, 1, 0, 0); return false; " href="http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=stats&amp;xw_action=view&amp;xw_city=1&amp;tmp=&amp;cb=&amp;xw_person=&amp;user=p%7C'+mwid+'&amp;ref=fight_list">'+name+'</a>';
}
function check_next() {
	if (run) {
		profilenum++;
		if (profilenum < profiles.length) {
			if (robquick) {
				var mwid = atob(/user=([A-Za-z0-9]+)/.exec(profiles[profilenum])[1]);
				//console.log(mwid);
				var robtmp = '';
				var url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=robbingtarget&xw_action=view&xw_city='+city+'&tmp='+robtmp+'&target=p%7C'+mwid.substr(2);
				//console.log('Skipping past profile page and loading url: '+url);
				//console.log('Skipped profile url: '+profiles[profilenum]);
				wait = myRandom(parseInt(wait1),parseInt(wait2));
				timesrobbed = 0;
				//pausing(wait,'Loading '+profilenames[profilenum]+' property list in ', load_rob_targets(url));
				function f () {
					load_rob_targets(url);
				}
				pausing(wait,'Loading '+profile_link()+' property list in ', f);
			}
			else {
				function f () {
					load_profile(profiles[profilenum]);
				}
				timesrobbed = 0;
				wait = myRandom(parseInt(wait1),parseInt(wait2));
				//pausing(wait,'Loading next profile in ',f);
				pausing(wait,'Loading '+profile_link()+' property list in ',f);
			}
		}
		else {
			//log('No more profiles to check.');
			msg('No more profiles to check. Reload the fight page and press the play icon to restart.');
			run = true;
			document.getElementById("play").style.display = 'inline';
			document.getElementById("pause").style.display = 'none';
			do_ajax('inner_page', 'remote/html_server.php?xw_controller=fight&xw_action=view&xw_city=&tmp=&cb=&xw_person=', 1, 1, 0, 0);
			if (document.getElementById('do_restart').checked) {
				log('Done with first batch of profiles, restarting...');
				pausing(10,'Ran out of profiles, restarting in ',restart);
			}
			else {
				log('Checked all profiles, reloading fight page. Press green button to restart.');			
			}
			return false;
		}
	}
	else {
		msg('Paused...');
		run = false;
		document.getElementById("play").style.display = 'inline';
		document.getElementById("pause").style.display = 'none';
	}
}

function load_profile(url) {
	msg('Loading '+profile_link()+' profile page...');
	url = url.replace(/(&tmp=[a-f0-9]+&cb=[a-f0-9]+)/,'');
	//if (debug) console.log('Loading profile: '+url);
	cb = userid+unix_timestamp();
	var params = {
		'ajax': 1, 
		'liteload': 1, 
		'sf_xw_user_id': userid,
		'sf_xw_sig': local_xw_sig,
		'cb': cb,
		'xw_client_id': 8,
		'skip_req_frame': 1
	};
	$.ajax({
		type: "POST",
		url: url,
		data: params,
		success: function (response){
			//console.log('Profile page length: '+response.length+' and url: '+url);
			//if (roburl=/xw_controller=robbingtarget&xw_action=view&xw_city=(\d+).*?tmp=([a-f0-9]+).*?target=(\d+)/.exec(response)){
			if (roburl=/xw_controller=robbingtarget&xw_action=view&xw_city=(\d+).*?tmp=([a-f0-9]+).*?target=p%7C(\d+)/.exec(response)){
				var url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=robbingtarget&xw_action=view&xw_city='+roburl[1]+'&tmp='+roburl[2]+'&target=p%7C'+roburl[3];
				robtmp = roburl[2]
				
				function f () {
					load_rob_targets(url);
				}
				wait = myRandom(parseInt(wait1),parseInt(wait2));
				pausing(wait,'Load '+profile_link()+' property list in ',f);
			}
			else {
				//could not find hitlist url, ignore and skip
				log('Could not find a robbery url on profile');
				check_next();
			}
		}
	});
}

function load_rob_targets(url) {
	msg('Searching '+profile_link()+' property list...');
	var rob_city = parseInt(/xw_city=(\d+)/.exec(url)[1]);
	cb = userid+unix_timestamp();
	var params = {
		'ajax': 1, 
		'liteload': 1, 
		'sf_xw_user_id': userid,
		'sf_xw_sig': local_xw_sig,
		'cb': cb,
		'xw_client_id': 8,
		'skip_req_frame': 1
	};
	$.ajax({
		type: "POST",
		url: url,
		data: params,
		success: function (response){
			//if (debug) console.log('Property list length: '+response.length);
			//if (debug) console.log('Property page url used: '+url);
			//if (/rob_slot_(\d+).*?rob_prop_name.*?small_(prop|bangkok|cuba|moscow)\d+_(.*?).png/.test(response)){
			if (/has no properties available to rob/.test(response)) {
				//log(timestamp()+profilenames[profilenum]+' had no properties to rob, moving on to next target...');
				log(profile_link()+' had no properties to rob, moving on to next target...');
				check_next();
			}
			else if (/rob_slot/.test(response)){
				//if (debug) console.log('Loaded property page, looking for names...');
				//<img src="http://mwfb.static.zynga.com/mwfb/graphics/PropertiesV2/small_bangkok0_fish.png">
				//<img src="http://mwfb.static.zynga.com/mwfb/graphics/PropertiesV2/small_prop2_flophouse.png">
				//<img src="http://mwfb.static.zynga.com/mwfb/graphics/PropertiesV2/small_cuba0_bodega.png">
				switch(rob_city) {
					case 1: //New York
						//var regex = /rob_slot_(\d+).*?rob_prop_img.*?small_(prop\d+_)?((.*?)|armory).png.*?Stamina Used">(\d+).*?&xw_action=rob_user&xw_city=(\d+)&tmp=([a-f0-9]+)&cb=([a-f0-9]+)&xw_person=(\d+)&rob_user=(\d+)&rob_prop=(\d+)/g;
						//var regex = /rob_slot_(\d+).*?rob_prop_img.*?small_(prop\d+_)?((.*?)|armory).png.*?Stamina Used">(\d+).*?&xw_action=rob_user&xw_city=(\d+)&tmp=([a-f0-9]+)&cb=([a-f0-9]+)&xw_person=(\d+)&rob_user=(\d+)&rob_prop=(\d+)&rob_city=(\d+)&slot=(\d+)/g;
						var regex = /rob_slot_(\d+).*?rob_prop_img.*?small_(prop\d+_)?((.*?)|armory|zoo).png.*?Stamina Used".*?(\d+).*?xw_action=rob_user[&amp;]+xw_city=(\d+)[&amp;]+tmp=([a-f0-9]+)[&amp;]+cb=([a-f0-9]+)[&amp;]+xw_person=(\d+)[&amp;]+rob_user=[p%7C|]+(\d+)[&amp;]+rob_prop=(\d+)[&amp;]+rob_city=(\d+)[&amp;]+slot=(\d+)/g;
						break;
					case 2: //Cuba
						var regex = /rob_slot_(\d+).*?rob_prop_img.*?small_cuba\d+_(.*?).png.*?Stamina Used".*?(\d+).*?xw_action=rob_user[&amp;]+xw_city=(\d+)[&amp;]+tmp=([a-f0-9]+)[&amp;]+cb=([a-f0-9]+)[&amp;]+xw_person=(\d+)[&amp;]+rob_user=[p%7C|]+(\d+)[&amp;]+rob_prop=(\d+)[&amp;]+rob_city=(\d+)[&amp;]+slot=(\d+)/g;
						break;
					case 3: //Moscow
						var regex = /rob_slot_(\d+).*?rob_prop_img.*?small_moscow\d+_(.*?).png.*?Stamina Used".*?(\d+).*?xw_action=rob_user[&amp;]+xw_city=(\d+)[&amp;]+tmp=([a-f0-9]+)[&amp;]+cb=([a-f0-9]+)[&amp;]+xw_person=(\d+)[&amp;]+rob_user=[p%7C|]+(\d+)[&amp;]+rob_prop=(\d+)[&amp;]+rob_city=(\d+)[&amp;]+slot=(\d+)/g;
						break;
					case 4: //Bangkok
						var regex = /rob_slot_(\d+).*?rob_prop_img.*?small_bangkok\d+_(.*?).png.*?Stamina Used".*?(\d+).*?xw_action=rob_user[&amp;]+xw_city=(\d+)[&amp;]+tmp=([a-f0-9]+)[&amp;]+cb=([a-f0-9]+)[&amp;]+xw_person=(\d+)[&amp;]+rob_user=[p%7C|]+(\d+)[&amp;]+rob_prop=(\d+)[&amp;]+rob_city=(\d+)[&amp;]+slot=(\d+)/g;
						break;
					case 5: //Las Vegas
						var regex = /rob_slot_(\d+).*?rob_prop_img.*?(\w+)\d+_small.png.*?Stamina Used".*?(\d+).*?xw_action=rob_user[&amp;]+xw_city=(\d+)[&amp;]+tmp=([a-f0-9]+)[&amp;]+cb=([a-f0-9]+)[&amp;]+xw_person=(\d+)[&amp;]+rob_user=[p%7C|]+(\d+)[&amp;]+rob_prop=(\d+)[&amp;]+rob_city=(\d+)[&amp;]+slot=(\d+)/g;
						break;
					case 6: //Italy
						var regex = /rob_slot_(\d+).*?rob_prop_img.*?(\w+)\d+_small.png.*?Stamina Used".*?(\d+).*?xw_action=rob_user[&amp;]+xw_city=(\d+)[&amp;]+tmp=([a-f0-9]+)[&amp;]+cb=([a-f0-9]+)[&amp;]+xw_person=(\d+)[&amp;]+rob_user=[p%7C|]+(\d+)[&amp;]+rob_prop=(\d+)[&amp;]+rob_city=(\d+)[&amp;]+slot=(\d+)/g;
						break;
				}
				//Stamina Used">(\d+)<
				//1slot 2name 3stamina 4city 5tmp 6cb 7rob_user 8rob_prop
				var broken = [];
				while((timers = /rob_protected_timer_(\d+)/g.exec(response)) != null) {
					broken.push(timers[1]);
				}
				if (debug) { console.log('Slots with timers: '+broken); }
				var propoutput = '';
				while((m = regex.exec(response)) != null) {
					if (debug) { console.log(m[1]+' '+m[2]+' '+m[3]+' '+m[4]+' '+m[5]+' '+m[6]+' '+m[7]+' '+m[8]+' '+m[9]); }
					//console.log(broken.indexOf(m[11]));
					if ((m[4] == propnametorob) || (m[2] == propnametorob)) {
						propoutput += m[2]+' '+m[4];
						if ((broken.indexOf(m[1]) > -1)) {
							//log(timestamp()+''+profilenames[profilenum]+'\'s '+propnametorob.charAt(0).toUpperCase()+propnametorob.slice(1)+' is shut down, moving to next target...');
							log(profile_link()+' '+propnametorob.charAt(0).toUpperCase()+propnametorob.slice(1)+' is shut down, moving to next target...');
							check_next();
							return;
						}
						else {
							switch(rob_city) {
								case 1: //New York
									//var regex = /rob_slot_(\d+).*?rob_prop_img.*?small_prop\d+_(.*?).png.*?Stamina Used">(\d+).*?&xw_action=rob_user&xw_city=(\d+)&tmp=([a-f0-9]+)&cb=([a-f0-9]+)&xw_person=(\d+)&rob_user=(\d+)&rob_prop=(\d+)/g;
									rob_url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=robbing&xw_action=rob_user&xw_city='+m[6]+'&tmp='+m[7]+'&cb='+m[8]+'&xw_person='+m[9]+'&rob_user=p%7C'+m[10]+'&rob_prop='+m[11]+'&rob_city='+m[6];
									var stamina = parseInt(m[5]);
									break;
								case 2: //Cuba
									rob_url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=robbing&xw_action=rob_user&xw_city='+m[4]+'&tmp='+m[5]+'&cb='+m[6]+'&xw_person='+m[7]+'&rob_user=p%7C'+m[8]+'&rob_prop='+m[9]+'&rob_city='+m[4];
									var stamina = parseInt(m[3]);
									break;
								case 3: //Moscow
									rob_url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=robbing&xw_action=rob_user&xw_city='+m[4]+'&tmp='+m[5]+'&cb='+m[6]+'&xw_person='+m[7]+'&rob_user=p%7C'+m[8]+'&rob_prop='+m[9]+'&rob_city='+m[4];
									var stamina = parseInt(m[3]);
									break;
								case 4: //Bangkok
									rob_url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=robbing&xw_action=rob_user&xw_city='+m[4]+'&tmp='+m[5]+'&cb='+m[6]+'&xw_person='+m[7]+'&rob_user=p%7C'+m[8]+'&rob_prop='+m[9]+'&rob_city='+m[4];
									var stamina = parseInt(m[3]);
									break;
								case 5: //Las Vegas
									rob_url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=robbing&xw_action=rob_user&xw_city='+m[4]+'&tmp='+m[5]+'&cb='+m[6]+'&xw_person='+m[7]+'&rob_user=p%7C'+m[8]+'&rob_prop='+m[9]+'&rob_city='+m[4];
									var stamina = parseInt(m[3]);
									break;
								case 6: //Italy
									rob_url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=robbing&xw_action=rob_user&xw_city='+m[4]+'&tmp='+m[5]+'&cb='+m[6]+'&xw_person='+m[7]+'&rob_user=p%7C'+m[8]+'&rob_prop='+m[9]+'&rob_city='+m[4];
									var stamina = parseInt(m[3]);
									break;
							}
							if (debug) { console.log('Robbing '+m[2]+' '+m[4]+' with url '+rob_url); }
							//msg('Robbing '+profilenames[profilenum]+'\'s '+m[4]);
							function f () {
								load_rob_result(rob_url,stamina);
							}
							wait = myRandom(parseInt(wait1),parseInt(wait2));
							if (debug) { console.log(profilenames[profilenum]+' has: '+propoutput); }
							pausing(wait,'Robbing '+profile_link()+' '+propnametorob+' in ',f);
							//load_rob_result(rob_url,m[5]);
							return;
						}
					}
				}
				log('Did not find a '+propnametorob.charAt(0).toUpperCase()+propnametorob.slice(1)+' in '+profile_link()+' properties, moving on...');
				check_next();
			}
			else {
				//console.log('Could not find any properties on rob page');
				check_next();
			}
		}
	});
}
function load_rob_result(url,sta) {
	var params = {
		'ajax': 1, 
		'liteload': 1, 
		'sf_xw_user_id': userid,
		'sf_xw_sig': local_xw_sig,
		'xw_client_id': 8,
		'skip_req_frame': 1
	};
	$.ajax({
		type: "POST",
		url: url,
		data: params,
		success: function (response) {
			//console.log('Robbery attempted length: '+response.length);
			//if (debug) console.log('Spent '+sta+' stamina');
			if (/Robbery Success/.test(response)) {
				stamina_spent += parseInt(sta);
				job++;
				failed = 0;
				timesrobbed++;
				exp=0;
				jobmoney=0;
				sign='';
				var loot = '';
				var damageoutput = '';
				var moneyoutput = '';
				var expoutput = '';
				object = eval("("+response+")");
				response = object.slot.replace(/\\"/g,'');
				//objectdata = eval("("+object['slot'].replace(/\\"/g,'')+")");
				stats_update(object);
				//console.log(object.slot);
				
				if (debug) console.log(response.substr(response.indexOf('You gained')));
				
				if (m=/You gained:.*?([A-Z]?)\$([\d,]+)/.exec(response)) {
					jobmoney += p(m[2]);
					money_gained+=jobmoney;
					sign=m[1]+'$';
					moneyoutput = '<span class="good">'+sign+commas(jobmoney)+'</span> ';
				}
				if (l=/expanded_details_item">(\d+)? ?(.*?)</.exec(response)) {
					if(l[1]) {
						add_loot(l[2],parseInt(l[1]))
						loot += l[1]+'x '+l[2];
					}
					else {
						add_loot(l[2],1);
						loot += '1x '+l[2];
					}
				}
				if (l=/rob_loot_pic">.*?alt="(.*?)"/.exec(response)) {
					add_loot(l[1],1);
					loot += ', '+l[1];
				}
				if (e=/(\d+) Experience/.exec(response)) {
					exp=p(e[1]);
					exp_gained+=exp;
					expoutput = '<span class="good">'+exp+' exp</span>';
				}
				if(damage=/width: (\d+)%/.exec(response)) {
					damageoutput = healthimg+': '+damage[1];
				}
				if ((exp > 0) || (jobmoney > 0)) {
					log('Gained '+moneyoutput+(((moneyoutput.length > 0) && (expoutput.length > 0))?' and ':'')+expoutput+((loot.length > 0)?' Loot: '+loot+'. ':'')+' '+damageoutput+'%. Robbery: '+timesrobbed+'/'+robrepeats);
					if(timesrobbed < robrepeats) {
						//load_rob_result(url,sta);
						function f () {	load_rob_result(url,sta); }
						pausing(wait,'Robbing '+profile_link()+' '+propnametorob+' in ',f);
					}
					else {
						check_next();
						return;
					}
				}
				else {
					if (debug) console.log('Could not parse result on robbed property page');
					check_next();
					return;
				}
			}
			else if (/Failed/.test(response)) {
				stamina_spent += parseInt(sta);
				job++;
				failed++;
				timesrobbed++;
				if(damage=/width: (\d+)%/.exec(response)) {
					damageoutput = damage[1];
				}
				if (e=/(\d+) Experience/.exec(response)) {
					exp=p(e[1]);
					exp_gained+=exp;
				}
				
				log('<span class="bad">Failed x'+failed+'!</span> Gained <span class="good">'+exp+'</span> exp. Robbery: '+timesrobbed+'/'+robrepeats);
				if((timesrobbed < robrepeats) && (failed < 3)) {
					//load_rob_result(url,sta);
					function f () {	load_rob_result(url,sta); }
					pausing(wait,'Robbing '+profile_link()+' '+propnametorob+' in ',f);
				}
				else {
					failed = 0;
					check_next();
					return;
				}
				return;
			}
			else if (/rob_target_rob_tape/.test(response)) {
				//log(timestamp()+''+profilenames[profilenum]+'\'s '+propnametorob.charAt(0).toUpperCase()+propnametorob.slice(1)+' is shut down, moving to next target...');
				log(profile_link()+'\'s '+propnametorob.charAt(0).toUpperCase()+propnametorob.slice(1)+' is shut down, moving to next target...');
				check_next();
				return;
			}
			else if (/out of stamina/.test(response)) {
				log('<span class="bad">Not enough stamina, stopping.</span>');
				msg('<span class="bad">Not enough stamina, stopping</span>');
			}
			else {
				if (debug) console.log('Probably failed robbery');
				check_next();
			}
		}
	});
}

	function stats_update(obj) {
		document.getElementById('user_cash_nyc').innerHTML = obj['user_fields']['user_cash_nyc'];
		document.getElementById('user_cash_cuba').innerHTML = obj['user_fields']['user_cash_cuba'];
		document.getElementById('user_cash_moscow').innerHTML = obj['user_fields']['user_cash_moscow'];
		document.getElementById('user_cash_bangkok').innerHTML = obj['user_fields']['user_cash_bangkok'];
		document.getElementById('user_cash_vegas').innerHTML = obj['user_fields']['user_cash_vegas'];
		document.getElementById('user_cash_italy').innerHTML = obj['user_fields']['user_cash_italy'];
		
		user_health = document.getElementById('user_health').innerHTML = parseInt(obj['user_fields']['user_health']);
		user_energy = document.getElementById('user_energy').innerHTML = parseInt(obj['user_fields']['user_energy']);
		user_max_energy = document.getElementById('user_max_energy').innerHTML = parseInt(obj['user_fields']['user_max_energy']);
		user_stamina = document.getElementById('user_stamina').innerHTML = parseInt(obj['user_fields']['user_stamina']);
		user_max_stamina = document.getElementById('user_max_stamina').innerHTML = parseInt(obj['user_fields']['user_max_stamina']);

		try {
			//exp_for_next_level = document.getElementById('exp_for_next_level').innerHTML = parseInt(obj['user_fields']['exp_for_next_level']);
			user_experience = document.getElementById('user_experience').innerHTML = parseInt(obj['user_fields']['user_experience']);
			//expneed = exp_for_next_level-user_experience;
			expneed = document.getElementById('exp_to_next_level').innerHTML = parseInt(obj['user_fields']['exp_to_next_level']);
			ratiolvl = expneed/user_energy;
			ratiolvl2 = expneed/user_stamina;
			ratiolvl3 = expneed/(user_energy+user_stamina);
			(Math.abs(ratiolvl)<10)?(d=2):(d=0);
			(Math.abs(ratiolvl2)<10)?(d2=2):(d2=0);
			(Math.abs(ratiolvl3)<10)?(d3=2):(d3=0);
			if(ratiolvl=='Infinity') { ratiolvl=0; d=0; }
			if(ratiolvl2=='Infinity') { ratiolvl2=0; d2=0; }
			if(ratiolvl3=='Infinity') { ratiolvl3=0; d3=0; }
			document.getElementById('user_stats').getElementsByClassName('experience')[0].innerHTML='Exp Need: <span class="energy_highlight">'+expneed+'</span><br>(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
			document.getElementById('level_bar').style.width = obj['user_info']['percent_complete']+'%';
		}
		catch (newlayouterr) {
			//alert(newlayouterr);
			
			exp_to_next_level = parseInt(obj.user_fields.exp_to_next_level);
			//exp_for_next_level = parseInt(obj['user_fields']['exp_for_next_level']);
			//user_experience = parseInt(obj['user_fields']['user_experience']);
			if (document.getElementById('exp_to_next_level')) {
				//expneed = document.getElementById('exp_to_next_level').innerHTML = exp_for_next_level-user_experience;
				expneed = document.getElementById('exp_to_next_level').innerHTML = exp_to_next_level;
			}
			else {
				//expneed = document.getElementById('user_xp_to_next_level').innerHTML = exp_for_next_level-user_experience;
				expneed = document.getElementById('user_xp_to_next_level').innerHTML = exp_to_next_level;
			}
			ratiolvl = expneed/user_energy;
			ratiolvl2 = expneed/user_stamina;
			ratiolvl3 = expneed/(user_energy+user_stamina);
			(Math.abs(ratiolvl)<10)?(d=2):(d=0);
			(Math.abs(ratiolvl2)<10)?(d2=2):(d2=0);
			(Math.abs(ratiolvl3)<10)?(d3=2):(d3=0);
			if(ratiolvl=='Infinity') { ratiolvl=0; d=0; }
			if(ratiolvl2=='Infinity') { ratiolvl2=0; d2=0; }
			if(ratiolvl3=='Infinity') { ratiolvl3=0; d3=0; }
			if (document.getElementById('exp_to_next_level')) {
				//document.getElementsByClassName('experience')[0].innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
				document.getElementsByClassName('experience')[0].innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span><br />To next level: <span id="exp_to_next_level" class="energy_highlight">'+expneed+'</span>';
				document.getElementById('level_bar').style.width = obj['user_info']['percent_complete']+'%';
			}
			else {
				//document.getElementById('user_experience').innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
				document.getElementById('user_experience').innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span><br />To next level: <span id="exp_to_next_level" class="energy_highlight">'+expneed+'</span>';
				document.getElementById('level_bar_new_header').style.width = obj['user_info']['percent_complete']+'%';
			}
		}
	}


if (!document.getElementsByClassName('main_table fight_table')[0]) { 
	alert('Run this bookmarklet on the fight list page.\nI, your humble servant will try to go there now for you.\nThen you can relaunch the bookmarklet.'); 
	do_ajax('inner_page', 'remote/html_server.php?xw_controller=fight&xw_action=view&xw_city=&tmp=&cb=&xw_person=', 1, 1, 0, 0);
	return;
}
else {
	create_div();
	initialize();
	run = true;
	//check_next();
}
 document.getElementById('propselect').onchange=function() {
	propnametorob = document.getElementById('propselect').value;
	msg('Selected '+propnametorob+' to rob. Now press start.');
	return false;
};
document.getElementById('start').onclick=function() {
	run = true;
	document.getElementById('start').style.display = 'none';
	document.getElementById('play').style.display = 'none';
	document.getElementById('pause').style.display = 'inline';
	propnametorob = document.getElementById('propselect').value;
	msg('Starting to rob people...');
	check_next();
	return false;
};
document.getElementById('play').onclick=function() {
	run = true;
	document.getElementById('play').style.display = 'none';
	document.getElementById('pause').style.display = 'inline';
	msg('Starting to rob people...');
	initialize();
	check_next();
	return false;
};
document.getElementById('pause').onclick=function() {
	run = false;
	pauseevent='Manually paused...';
	document.getElementById('pause').style.display = 'none';
	document.getElementById('play').style.display = 'inline';
	return false;
};
document.getElementById('close').onclick=function() {
	run = false;
	document.getElementById('content_row').removeChild(document.getElementById("spockdiv"));
	return false;
};
document.getElementById('robrepeats').onkeyup=function() {
	if((robrepeats < 0) || (isNaN(document.getElementById('robrepeats').value))) { robrepeats = 5; }
	else { robrepeats = parseInt(document.getElementById('robrepeats').value); }
	document.getElementById("robrepeats").value = robrepeats;
};
document.getElementById('delay1').onkeyup=function() {
	time = parseInt(document.getElementById('delay1').value);
	if((time < 0) || (!time)) { wait1 = 0; }
	else { wait1 = time; }
	document.getElementById("delay1").value=wait1;
};
document.getElementById('delay2').onkeyup=function() {
	time = parseInt(document.getElementById('delay2').value);
	if((time < 0) || (!time)) { wait2 = 0; }
	else { wait2 = time; }
	document.getElementById("delay2").value=wait2;
};
document.getElementById('jobstodo').onkeyup=function() {
	jobstodo = parseInt(document.getElementById('jobstodo').value);
	if((jobstodo < 0) || (!jobstodo)) { jobstodo = 0; }
	else { jobstodo = jobstodo; }
	document.getElementById("jobstodo").value=jobstodo;
	if ((job < jobstodo) && (run)) {
		run = true;
		msg('Resuming robbing...');
		document.getElementById('play').style.display = 'none';
		document.getElementById('pause').style.display = 'inline';
		check_next();
	}
};
document.getElementById('logsize').onkeyup=function() {
	log_size = parseInt(document.getElementById('logsize').value);
	if((log_size < 0) || (!log_size)) { log_size = 20; }
	else { log_size = log_size; }
	//createCookie('spockaX_logsize',log_size);
	document.getElementById('logsize').value=log_size;
};
document.getElementById('onevent').onclick=function() {
	if (onevent == 'Continue') {
		onevent = 'Pause';
		document.getElementById('onevent').innerHTML = onevent;
	}
	else {
		onevent = 'Continue';
		document.getElementById('onevent').innerHTML = onevent;
	}
	return false;
};
function pausecheck(s) {
	if (onevent == 'Pause') {
		run = false;
		pauseevent=s;
	}
}
document.getElementById('lootshow').onclick=function(e) {
	var row = document.getElementById('loot');
	if (row.style.display == '') { 
		row.style.display = 'none'; 
		document.getElementById('lootshow').innerHTML = 'Hide';
	}
	else { 
		row.style.display = '';
		document.getElementById('lootshow').innerHTML = 'Show';
	}
	return false;
};
document.getElementById('logshow').onclick=function() {
	var row = document.getElementById("log");
	if (row.style.display == '') { 
		row.style.display = 'none'; 
		document.getElementById("logshow").innerHTML = 'Hiding';
	}
	else { 
		row.style.display = '';
		document.getElementById("logshow").innerHTML = 'Showing';
	}
	return false;
};
document.getElementById('donate').onmouseover = function() {
	this.innerHTML = 'Donate a Pint';
	return false;
};
document.getElementById('donate').onmouseout = function() {
	this.innerHTML = 'Donate';
	return false;
};
document.getElementById("play").style.display = 'none';
document.getElementById("pause").style.display = 'none';
document.getElementById("close").style.display = 'inline';
document.getElementById("loot").style.display = 'none';
var WeaponsDepot = ['Forge','Arc Welder','Buzzsaw','Gunpowder','Gun Drill','Sonic Emitter','Weapon Part','Grapple','Boomerang','Railgun Barrel','Laser Rangefinder','Explosive Arrow','Portable Fusion Reactor'];
var ChopShop = ['Cement Block','Power Tool','Car Lift','Acetylene Torch','Shipping Container','Car Part','High Tech Car Part','Cuban Car Part','Thai Car Part','Russian Car Part','Solar Panel','Bulletproof Glass'];
var WeaponsDepotCount = 0;
var ChopShopCount = 0;
var loots=new Array();
function add_loot(item, count) {
	item = item.replace(/(Parts)/,'Part'); //remove plural parts
	if (WeaponsDepot.indexOf(item) > -1) {
		item = '<span class="more_in">(WD)</span> '+item;
		WeaponsDepotCount++;
	}
	if (ChopShop.indexOf(item) > -1) {
		item = '<span class="more_in">(CS)</span> '+item;
		ChopShopCount++;
	}
	var f = -1;
	for (var i = 0; i < loots.length && f == -1; ++i) {
		if (loots[i][0] == item) {
			f = i;
		}
	}
    if (count == 'null' || count == 'undefined') { count = 1; }
    if (f != -1) {
		loots[f][1] += count;
	}
	else {
		loots[loots.length] = new Array(item, count);
	}
	var t = '';
	loots.sort();
	for (var i = 0; i < loots.length; ++i) {
		t += '<span class="good">' + loots[i][1] + 'x</span> ' + loots[i][0] + '<br />';
    }
	combinedloot = t;
	lootcount++;
}

function timestamp() {
	now = new Date();
	var CurH = now.getHours();
	CurH = (CurH<10?'0'+CurH:CurH);
	var CurM = now.getMinutes();
	CurM = (CurM<10?'0'+CurM:CurM);
	if (timestamping) { return '<span class="more_in">['+CurH+':'+CurM+']</span> '; }
	else { return ''; }
}
// From Vern's toolkit.js, http://vern.com/mwtools/
// log puts a message in the log array and outputs it
// limit is how many log lines we keep (0 == infinite)
// keep is a regex of lines that we never delete
logs = [];
extralog = [];
function logtrunc(message,limit,keep) {
	logs.unshift(message);
	if (limit > 0) {
		if (logs.length>limit) {
			message=logs.pop();
			if ((keep.test) && (keep.test(message)))
					extralog.unshift(message);
		}
	}
	if ((document.getElementById('log')) && (document.getElementById('log').nodeName == 'TD')) {
		document.getElementById('log').innerHTML=logs.concat(extralog,'').join('<br/>');
	}
}
function log(s) {
	document.getElementById('donate').style.color = (job%3==1?'#E00000':'');
	var ratio = exp_gained/stamina_spent;
	document.getElementById('delay1').value = wait1;
	document.getElementById('delay2').value = wait2;
	document.getElementById('jobs').innerHTML = job;
	document.getElementById('exp_gained').innerHTML = exp_gained;
	document.getElementById('stamina_spent').innerHTML = stamina_spent;
	document.getElementById('exp_ratio').innerHTML = ((ratio > 0 || ratio !='Infinity')?'('+ratio.toFixed(2)+'/sta)':'')
	document.getElementById('money_gained').innerHTML = '<strong class="good">'+sign+commas(money_gained)+'</strong> <span class="more_in">('+parseFloat(money_gained/stamina_spent).toFixed(0)+'/sta)</span>';
	var l = document.getElementById('log');
	logtrunc(timestamp()+' '+s,log_size,log_keep);
	document.getElementById('loot').innerHTML = combinedloot;
	document.getElementById('lootstats').innerHTML = lootcount+'/'+job+'&nbsp; ('+parseFloat(lootcount/job*100).toFixed(1)+'%)';
}
function unix_timestamp() {
	return parseInt(new Date().getTime().toString().substring(0, 10))
}
function p(s) {
	return parseInt(s.replace(/,/g, ''));
}
var expnow,expnext,stamina,energy,ratiolvl,ratiolvl2,ratiolvl3,explevel;
function stats_ratios(s) {
	if (/user_info_update/.test(s)) { var stats=s.substr(0,s.indexOf('user_info_update')); }
	document.getElementById('user_cash_nyc').innerHTML = /user_cash_nyc.*?"(.*?)"/.exec(stats)[1];
	document.getElementById('user_cash_cuba').innerHTML = /user_cash_cuba.*?"(.*?)"/.exec(stats)[1];
	document.getElementById('user_cash_moscow').innerHTML = /user_cash_moscow.*?"(.*?)"/.exec(stats)[1];
	document.getElementById('user_cash_bangkok').innerHTML = /user_cash_bangkok.*?"(.*?)"/.exec(stats)[1];
	document.getElementById('user_cash_vegas').innerHTML = /user_cash_vegas.*?"(.*?)"/.exec(stats)[1];
	document.getElementById('user_cash_italy').innerHTML = /user_cash_italy.*?"(.*?)"/.exec(stats)[1];
	expnow = parseInt(/user_experience.*?(\d+)/.exec(stats)[1]);
	document.getElementById('user_experience').innerHTML = expnow;
	expnext = parseInt(/exp_for_next_level.*?(\d+)/.exec(stats)[1]);
	energy = parseInt(/user_energy.*?(\d+)/.exec(stats)[1]);
	document.getElementById('user_energy').innerHTML = energy;
	stamina = parseInt(/user_stamina.*?(\d+)/.exec(stats)[1]);
	document.getElementById('user_stamina').innerHTML = stamina;
	explevel = /user_info\['percent_complete'\] = "(\d+)"/.exec(stats)[1];
	document.getElementById('level_bar').style.width = explevel+'%';
	expneed = eval(expnext-expnow);
	ratiolvl=eval(expneed/energy);
	ratiolvl2=eval(expneed/stamina);
	ratiolvl3=eval(expneed/(parseInt(energy)+parseInt(stamina)));
	(Math.abs(ratiolvl)<10)?(d=2):(d=0);
	(Math.abs(ratiolvl2)<10)?(d2=2):(d2=0);
	(Math.abs(ratiolvl3)<10)?(d3=2):(d3=0);
	if(ratiolvl=='Infinity') { ratiolvl=0; d=0; }
	if(ratiolvl2=='Infinity') { ratiolvl2=0; d2=0; }
	if(ratiolvl3=='Infinity') { ratiolvl3=0; d3=0; }
	document.getElementById('user_stats').getElementsByClassName('stat_title')[0].innerHTML='Exp Need: <span class="energy_highlight">'+expneed+'</span><br>(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">) (<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
}

//output information log info
log('Thank you for your support and patience. /Team Spockholm');
log('include <a href="http://www.spockholm.com/mafia/help.php#bugreporting">details</a> to the <a href="http://www.facebook.com/topic.php?uid=92178514356&topic=22988">discussion</a> so we can recreate the problem and fix it.');
log('There are still a lot of bugs in this bookmarklet, if you find one please');
log('You, the community, need to help each other out with this one.');
log('Meaning no real support can be given, there is no time.');
log('Please note that this bookmarklet has not been officially released yet.');
//testing to add analytics
function loadContent(file){
	var head = document.getElementsByTagName('head').item(0)
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
	pageTracker._trackPageview("/script/RobberRedux"); 
} catch(err) {}
//end analytics

} //end try
catch(mainerr) {
	alert(mainerr);
	var spock_div=document.getElementById('spockdiv');
	if(spock_div) {
		spock_div.innerHTML='';
	}
	alert('Some error occured, '+version+' not loaded.\n\nMake sure you used the bookmarklet in New York and on the fight page.\nThis bookmarklet is experimental, you will have to figure it out yourself.');
}

})()