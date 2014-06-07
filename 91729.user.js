// ==UserScript==
// @name		booble
// @namespace		http://gmail.com
// @description		blahblah
// @include		http://mail.google.com/*
// @include		https://mail.google.com/*
// @version         0.0.4
// @author		blah
// ==/UserScript==









Vern for a lot of code and inspiration, http://vern.com/mwtools/
	Max Power for the loot logging code.
	Pete Lundrigan for contributing code.
	
	http://www.spockholm.com/mafia/
	
	2010-04-21	v1.26	Reworked the page loading.
						Added loot tagging.
	2010-05-10	v1.28	Stop on energy remaining added.
						Logging top mafia bonuses.
	2010-05-18	v1.29	Updated userid to cope with the Zynga changes.
	2010-06-xx	v1.30	Added banking option.
	2010-08-01  v1.31	Fix for latest Zynga changes
	2010-08-20  v1.32	Fix for latest Zynga changes
	2010-10-07	v1.33	Fix for small Zynga change on loot in Moscow
	2010-11-17	v1.34	Fix for the new exp to level layout change.
	2010-11-24	v1.35	Cookies added to save settings between sessions.
*/
javascript:(function(){
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
			if(typeof FB != 'undefined') {
				FB.CanvasClient.stopTimerToSizeToContent; 
				window.clearInterval(FB.CanvasClient._timer);
				FB.CanvasClient._timer=-1;
			}
			document.getElementById('mw_zbar').parentNode.removeChild(document.getElementById('mw_zbar'));
		}
		catch (fberr) {}
	}

	var e,m,mc,mcb,i,l,j,t,version='RepeatJob v1.35 beta',
	levelup='<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_promote_up_15x15_01.gif" width="13" height="13" title="Level up">',
	star='<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_star_16x16_gold_01.gif" width="13" height="13" title="Mastered Job or Tier">',
	mastermind='<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_experience_16x16_01.gif" width="13" height="13" title="Mastermind bonus, 50% more exp.">',
	wheelman='<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-energy.gif" width="13" height="13" title="Wheelman bonus, no energy spent.">',
	bagman='<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif" width="13" height="13" title="Bagman bonus, double cash.">',
	jobhelp='<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_jobhelp_16x16_01.gif" width="13" height="13" title="Job help button.">',
	job=0,exp=0,exp_now=0,exp_next=0,ratio=0,loot='',completed='',sign='$',exp_gained=0,energy_spent=0,money_gained=0,money_banked=0,retries=0,combinedloot='',
	onevent='Continue',pauseevent,wheel=0,master=0,bag=0,bankamount=0,content=document.getElementById('content_row');
	var setcomp = false;
	var timestamping = true;
	var log_keep=/(level|completed|secret)/;
	var log_size=10;
	var jobstodo=0;
	var lootcount=0;
	var bossenergy = parseFloat(document.getElementById('user_max_energy').innerHTML*0.2).toFixed(0);
	//mafia_size.innerHTML='<nobr>'+mafia_size.innerHTML.replace(/&nbsp;/g,'')+'</nobr>';
	//mafia_size=$("user_group_size").parentNode.parentNode
	// from Yevgen Silant'yev, http://joyka.pp.ua/
	function getMWURL() {
		str = document.location;
		str = str.toString();
		beg = str.substring(0,str.indexOf('?')+1);
		str = str.substring(str.indexOf('?')+1);
		str = str.split('&');
		mid = '';
		for(var i=0;i<str.length;i++){
			if(str[i].indexOf('sf_xw_')==0){ mid=mid+str[i]+'&'; }
		}
		return beg+mid;
	}
	var MWURL = getMWURL();
	//var userid = /sf_xw_user_id=([0-9]+)/.exec(document.body.innerHTML)[1];
	var userid = /sf_xw_user_id=([a-z]\|[0-9]+)/.exec(document.body.innerHTML)[1];
	//var userid = FB.Facebook.apiClient.get_session().uid;
	var job_exp=/(\d+)( \+(\d+))? Experience/.exec(content.innerHTML);
	var job_en=/(\d+) Energy/.exec(content.innerHTML);
	//var job_alt=/xw_controller=(story|job|episode).*xw_city=(\d+).*tmp=([0-9a-f]+).*job=(\d+).*tab=(\d+)/.exec(document.getElementById('inner_page').innerHTML);
	var messageboxes = document.getElementsByClassName('messages');
	for (i=0;i<messageboxes.length;i++) {
		if (/xw_controller=(story|job|episode).*xw_city=(\d+).*tmp=([0-9a-f]+).*job=(\d+).*tab=(\d+)/.test(document.getElementsByClassName('messages')[i].innerHTML)) {
			var job_alt = /xw_controller=(story|job|episode).*xw_city=(\d+).*tmp=([0-9a-f]+).*job=(\d+).*tab=(\d+)/.exec(document.getElementsByClassName('messages')[i].innerHTML);
		}
	}
	//var xw_city = job_alt[2];
	var cashid = '';
	var xw_city = /mw_city(\d+)/.exec(document.getElementById('mw_city_wrapper').className)[1];
	switch (xw_city) {
		case '1':
			cashid = 'user_cash_nyc';
			sign = '$';
		break;
		case '2':
			cashid = 'user_cash_cuba';
			sign = 'C$';
		break;
		case '3':
			cashid = 'user_cash_moscow';
			sign = 'R$';
		break;
		case '4':
			cashid = 'user_cash_bangkok';
			sign = 'B$';
		break;
		default:
			alert('This bookmarklet is for New York, Cuba, Moscow and Bangkok only!\n\nVisit http://www.spockholm.com/mafia/testing.php for other versions.');
			return;
	}
	var xw_controller = job_alt[1];
	var job_tmp = job_alt[3];
	var job_id = job_alt[4];
	var job_tab = job_alt[5];
	var preurl = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?';
	var job_url = [];
	job_url[0] = 'xw_controller='+xw_controller+'&xw_action=dojob&xw_city='+xw_city+'&job='+job_id+'&tab='+job_tab;
	var job_number = 0;
	last_url=job_url[job_number];
	var deposited = 0;
	var wait1 = 2;
	var wait2 = 4;
	var banking = true;
	
	function p(s) {
		return parseInt(s.replace(/[^\d]/g, ''));
	}
	// createCookie from Vern's Toolkit http://vern.com/mwtools/
	function createCookie(name,value) {
		// expire 7 days from now
		var expires = new Date();
		expires.setDate(expires.getDate()+7);
		document.cookie = name+"="+value+";expires="+expires.toGMTString()+"; path=/";
	}

	// readCookie from Vern's Toolkit http://vern.com/mwtools/
	function readCookie(name) {
		var i,
			cookie,
			nameEQ = name+"=",
			cookieArray = document.cookie.split(";");
		for (i=0; i< cookieArray.length; i++) {
			cookie = cookieArray[i];
			while (cookie.charAt(0)==' ')
				cookie = cookie.substring(1,cookie.length);
			if (cookie.indexOf(nameEQ) == 0)
				return cookie.substring(nameEQ.length,cookie.length);
		}
		return null;
	}
	
	function read_settings() {
		var settings = readCookie('rj_settings');
		if (settings == null || settings == 'undefined') {
			settings = wait1+'|'+wait2+'|'+onevent+'|'+log_size+'|'+bankamount;
			createCookie('rj_settings',settings);
		}
		var parameters = settings.split('|');
		if (parameters.length < 5) {
			settings = wait1+'|'+wait2+'|'+onevent+'|'+log_size+'|'+bankamount;
			createCookie('rj_settings',settings);
			parameters = settings.split('|');
		}
		if (isNaN(parameters[0])) { wait1 = 1; } else { wait1 = p(parameters[0]); }
		if (isNaN(parameters[1])) { wait2 = 3; } else { wait2 = p(parameters[1]); }
		if (oneventtest=/(Continue|Pause)/.exec(parameters[2])) { onevent = oneventtest[1]; } else { onevent = 'Continue'; };
		if (isNaN(parameters[3])) { log_size = 15; } else { log_size = p(parameters[3]); }
		if (isNaN(parameters[4])) { bankamount = 0; } else { bankamount = p(parameters[4]); }
		//if (banktest=/(Yes|No)/.exec(parameters[5])) { bankwithdraw = banktest[1]; } else { bankwithdraw = 'No'; };
	}
	function write_settings() {
		var settings = wait1+'|'+wait2+'|'+onevent+'|'+log_size+'|'+bankamount;
		createCookie('rj_settings',settings);
	}

	read_settings();

	var style = '<style type="text/css">'+
		'.messages img{margin:0 3px;vertical-align:middle}'+
		'.messages input {border: 1px solid #888;margin 0;padding 0;background: #000; color: #FFF; width: 32px;}'+
		'#play{display:none}'+
		'#pause{display:inline}'+
		'#close{display:inline}'+			
	'</style>';

	var config_html =
	style+
	'<table class="messages" >'+
	'<tr><td colspan="3" align="right" style="text-align:right;font-size:1.1em;">'+version+' - By <a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_top">Spockholm Mafia Tools</a> - <a href="http://www.spockholm.com/mafia/donate.php" id="donate" alt="Donate a Pint" target="_blank">Donate</a> - Need <a href="http://www.spockholm.com/mafia/help.php" alt="Help" target="_blank">Help</a>? - '+
		'<a href="#" id="play"><img src="http://www.spockholm.com/mafia/play.gif" title="Play" width="16" height="16"></a>'+
		'<a href="#" id="pause"><img src="http://www.spockholm.com/mafia/pause.gif" title="Pause" width="16" height="16"></a>'+
		'<a href="#" id="close"><img src="http://www.spockholm.com/mafia/stop.gif" title="Close" width="16" height="16"></a>'+
	'</td></tr>'+
	'<tr><td colspan="3"><hr /></td></tr>'+
	'<tr><td>Jobs done:</td><td><span id="jobs">0</span> of <input id="jobstodo" name="jobstodo" type="text" value="'+jobstodo+'" maxlength="4" /> (0 = Unlimited) &nbsp; <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif" width="12" height="12">Bank above $<input id="bankamount" type="text" value="'+bankamount+'" maxlength="9" style="width:65px" /></td><td align="right" style="text-align:right;"><a href="#" id="onevent">'+onevent+'</a> on event</td></tr>'+
	'<tr><td>Stats:</td><td>Exp: <span id="exp_gained" class="good"></span> <span id="exp_ratio" class="more_in"></span>&nbsp; Money: <span id="money_gained" class="good"></span>&nbsp; <span id="money_banked" class="more_in"></span></td><td align="right" style="text-align:right;">Delay: <input id="delay1" name="delay1" type="text" value="'+wait1+'" maxlength="4" /> to <input id="delay2" name="delay2" type="text" value="'+wait2+'" maxlength="4" />sec</td></tr>'+
	'<tr id="topmafia_row" style="display:none;"><td>Top Mafia:</td><td colspan="2"><span id="topmafia_stats"></span></td></tr>'+
	'<tr id="options_row"><td>Pause ratios:</td>'+
		'<td colspan="2"><input id="energytoexpratio" type="text" value="0" maxlength="4" /> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">&nbsp;&nbsp;'+
		'<input id="staminatoexpratio" type="text" value="0" maxlength="4" /> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Stamina needed per Energy">&nbsp;&nbsp;'+
		'<input id="exptolevel" type="text" value="0" maxlength="4" /> exp to level&nbsp;&nbsp;'+
		'<input id="energyremain" type="text" value="0" maxlength="6" style="width:50px;" /> energy remaining&nbsp;<span class="more_in">(<a href="#" class="more_in" onclick="document.getElementById(\'energyremain\').value=\''+bossenergy+'\';return false;">'+bossenergy+' for boss fight</a>)</span>'+
	'</td></tr>'+
	'<tr id="farm_row" style="display:none;"><td>Farming:</td><td colspan="2">Tokens:<input type="checkbox" id="tokens"> &nbsp; Cards:<input type="checkbox" id="cards"></td></tr>'+
	'<tr><td>Status:</td><td colspan="2" id="status"></td></tr>'+
	'<tr><td colspan="3"><hr /></td></tr>'+
	'<tr>'+
		'<td valign="top"><a href="#" id="lootshow">Hide</a> loot:</td>'+
		'<td colspan="2"><span id="lootstats"></span><br /><span id="loot">No loot found yet.</span></td>'+
	'</tr>'+
	'<tr><td valign="top"><a href="#" id="logshow">Showing</a> Log:<br />Limit: <input id="logsize" name="logsize" type="text" value="'+log_size+'" maxlength="4" /></td><td colspan="2" id="log"></td></tr>'+
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
		return min +  Math.floor(Math.round((Math.random() * (max - min))));
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
		var delay = (seconds > 0)? delay=1000 : delay=100;
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
		},delay);
	}
	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10))
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
	function banker(cash,city) {
		var cb = userid+unix_timestamp();
		var params = {
			'ajax': 1, 
			'sf_xw_user_id': userid,
			'sf_xw_sig': local_xw_sig,
			'liteload': 1,
			'cb': cb,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'amount': cash,
			'city': city,
			'xw_city': city,
		};
		var url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=bank&xw_action=deposit'
		//console.log(preurl+url+' '+params['tmp']);
		//console.log(params);
		if (banking) {
			$.ajax({
				type: "POST",
				url: url,
				data: params,
				success: function (bankresponse){
					try {
						//deposit = />([A-Z]\$([\d,]+))</.exec(bankresponse);
						deposit = /deposit_message":"(.*?)",/.exec(bankresponse);
						if (/The bank can only hold/.test(bankresponse)) {
							banking = false;
							bankamount = 0;
							document.getElementById('bankamount').value = 0;
							log(timestamp()+' Bank: '+deposit[1]);
						}
						switch (xw_city) {
							case '1':
								document.getElementById(cashid).innerHTML = /user_cash_nyc":"(.*?)"/.exec(bankresponse)[1];
								break;
							case '2':
								document.getElementById(cashid).innerHTML = /user_cash_cuba":"(.*?)"/.exec(bankresponse)[1];
								break;
							case '3':
								document.getElementById(cashid).innerHTML = /user_cash_moscow":"(.*?)"/.exec(bankresponse)[1];
								break;
							case '4':
								document.getElementById(cashid).innerHTML = /user_cash_bangkok":"(.*?)"/.exec(bankresponse)[1];
								break;
						}
						//console.log(deposit[1]);
						//msg('Banked '+deposit[1]+' of '+commas(cash));
						//deposited += p(/>([A-Z]?\$([\d,]+))</.exec(bankresponse)[1]);
						money_banked += p(/[A-Z]?\$([\d,]+).*?was deposited in your account/.exec(deposit[1])[1]);
						log(timestamp()+' Bank: '+deposit[1].replace(/<([^>]+)>/g,''));
					}
					catch (ignorebank) {}
					setTimeout(function(){ repeat_job(); },1500);
				},
			});
		}
	}
	function repeat_job() {
		function f () {
			if (job_url.length == 0) {
				msg('No jobs selected, stopping.');
				run = 0;
				document.getElementById("play").style.display = 'inline';
				document.getElementById("pause").style.display = 'none';
			}
			else {
				msg('Repeating job...');
				last_url=job_url[job_number];
				//console.log(job_url[job_number]);
				request(job_url[job_number]);
				if (job_url.length > 1) {
					if (job_number == parseInt(job_url.length-1)) { job_number = 0; }
					else { job_number++; }
				}
			}
		}
		if ((job_tab == 4) && (xw_city == 1) && ((job_id == 24) || (job_id == 25))) {
			document.getElementById('farm_row').style.display = '';
			// tokens = 24
			// cards = 25
			job_url = [];
			if (document.getElementById('tokens').checked) {
				job_url.push('xw_controller='+xw_controller+'&xw_action=dojob&xw_city=1&job=24&tab=4');
			}
			if (document.getElementById('cards').checked) {
				job_url.push('xw_controller='+xw_controller+'&xw_action=dojob&xw_city=1&job=25&tab=4');
			}
		}
		if (job_tab == 6 && xw_city == 4 && job_id != 101) {
			document.getElementById('farm_row').innerHTML = "<td colspan=\"3\">You can <a onclick=\"tryDoJob('lbox_job_energy_101', 'remote/html_server.php?xw_controller=story&amp;xw_action=dojob&amp;xw_city=4&amp;job=101&amp;tab=',1); return false;\" href=\"#\">click here</a> to do the Lloyds Spectre job, then relaunch the bookmarklet to repeat it.</td>";
			document.getElementById('farm_row').style.display = '';
		}
		//console.log(p(document.getElementById(cashid).innerHTML));
		//console.log(p(document.getElementById('bankamount').value));
		if (p(document.getElementById(cashid).innerHTML) > p(document.getElementById('bankamount').value) && p(document.getElementById('bankamount').value) > 0 && run != 0) {
			banker(p(document.getElementById(cashid).innerHTML),xw_city);
			write_settings();
		}
		else {
			wait = myRandom(parseInt(wait1),parseInt(wait2));
			pausing(wait,'Doing job again in ',f);
		}
	}
	if (!job_url) { alert('You must do a job first, then use the bookmarklet.'); }
	else {
		create_div();
		if ((job_tab == 4) && (xw_city == 1) && (job_id == 24)) { 
			document.getElementById('tokens').checked = true;
			//job_url.push('xw_controller='+xw_controller+'&xw_action=dojob&xw_city='+xw_city+'&job=25&tab='+job_tab);
		}
		if ((job_tab == 4) && (xw_city == 1) && (job_id == 25)) { 
			document.getElementById('cards').checked = true;
			//job_url.push('xw_controller='+xw_controller+'&xw_action=dojob&xw_city='+xw_city+'&job=24&tab='+job_tab);
		}
		var run=1;
		repeat_job();
	}
	document.getElementById('close').onclick=function() {
		run = 0;
		delete xmlHTTP['onreadystatechange'];
		document.getElementById("content_row").removeChild(document.getElementById("spockdiv"));
		return false;
	};
	document.getElementById('pause').onclick=function() {
		run = 0;
		pauseevent='Manually paused...';
		document.getElementById("pause").style.display = 'none';
		document.getElementById("play").style.display = 'inline';
		return false;
	};
	document.getElementById('play').onclick=function() {
		run = 1;
		document.getElementById("play").style.display = 'none';
		document.getElementById("pause").style.display = 'inline';
		msg('Repeating job again...');
		request(last_url);
		return false;
	};
	document.getElementById('delay1').onkeyup=function() {
		time = parseInt(document.getElementById('delay1').value);
		if((time < 0) || (!time)) { wait1 = 0; }
		else { wait1 = time; }
		write_settings();
		document.getElementById("delay1").value=wait1;
	};
	document.getElementById('delay2').onkeyup=function() {
		time = parseInt(document.getElementById('delay2').value);
		if((time < 0) || (!time)) { wait2 = 0; }
		else { wait2 = time; }
		write_settings();
		document.getElementById("delay2").value=wait2;
	};
	document.getElementById('jobstodo').onkeyup=function() {
		jobstodo = parseInt(document.getElementById('jobstodo').value);
		if((jobstodo < 0) || (!jobstodo)) { jobstodo = 0; }
		else { jobstodo = jobstodo; }
		document.getElementById("jobstodo").value=jobstodo;
		if ((job < jobstodo) && (run == 0)) {
			run = 1;
			msg('Resuming repeats of job.');
			document.getElementById('play').style.display = 'none';
			document.getElementById('pause').style.display = 'inline';
			repeat_job();
		}
	};
	document.getElementById('logsize').onkeyup=function() {
		log_size = parseInt(document.getElementById('logsize').value);
		if((log_size < 0) || (!log_size)) { log_size = 20; }
		else { log_size = log_size; }
		document.getElementById('logsize').value=log_size;
		write_settings();
	};
	document.getElementById('bankamount').onkeyup=function() {
		bankamount = p(document.getElementById('bankamount').value);
		if((bankamount < 0) || (!bankamount) || isNaN(bankamount)) { bankamount = 0; }
		else { bankamount = bankamount; }
		document.getElementById('bankamount').value = bankamount;
		write_settings();
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
		write_settings();
		return false;
	};
	function pausecheck(s) {
		if (onevent == 'Pause') {
			run = 0;
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
	document.getElementById('play').style.display = 'none';
	document.getElementById('pause').style.display = 'inline';
	document.getElementById('close').style.display = 'inline';
	document.getElementById('loot').style.display = 'none';
	
	var WeaponsDepot = ['Forge','Arc Welder','Buzzsaw','Gunpowder','Gun Drill','Sonic Emitter','Weapon Part','Grapple','Boomerang','Railgun Barrel','Laser Rangefinder','Explosive Arrow','Portable Fusion Reactor'];
	var ChopShop = ['Cement Block','Power Tool','Car Lift','Acetylene Torch','Shipping Container','Car Part','High Tech Car Part','Cuban Car Part','Thai Car Part','Russian Car Part','Solar Panel','Bulletproof Glass'];
	var WeaponsDepotCount = 0;
	var ChopShopCount = 0;
	var loots=new Array();
	function add_loot(s, c) {
		if (WeaponsDepot.indexOf(s) > -1) {
			s = '<span class="more_in">(WD)</span> '+s;
			WeaponsDepotCount++;
		}
		if (ChopShop.indexOf(s) > -1) {
			s = '<span class="more_in">(CS)</span> '+s;
			ChopShopCount++;
		}
		var f = -1;
		for (var i = 0; i < loots.length && f == -1; ++i) {
			if (loots[i][0] == s) {
				f = i;
			}
		}
		if (c == null || c == undefined) c = 1;
		if (f != -1) {
			loots[f][1] += c;
		}
		else {
			loots[loots.length] = new Array(s, c);
		}
		var t = '';
		loots.sort();
		for (var i = 0; i < loots.length; ++i) {
			t += '<span class="good">' + loots[i][1] + 'x</span> ' + loots[i][0] + '<br />';
		}
		combinedloot = t;
		lootcount++;
		return false;
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
		ratio = exp_gained/energy_spent;
		document.getElementById('delay1').value = wait1;
		document.getElementById('delay2').value = wait2;
		document.getElementById('jobs').innerHTML = job;
		//document.getElementById('jobenergy').innerHTML = '('+energy_spent+' energy)';
		document.getElementById('exp_gained').innerHTML = exp_gained;
		document.getElementById('exp_ratio').innerHTML = ((ratio > 0 || ratio !='Infinity')?'('+ratio.toFixed(2)+'/en)':'')
		document.getElementById('money_gained').innerHTML = sign+commas(money_gained);
		document.getElementById('money_banked').innerHTML = '(Banked: '+sign+commas(money_banked)+')';
		if (master > 0 || wheel > 0 || bag > 0) {
			document.getElementById('topmafia_row').style.display = '';
			var masterratio = ' <span class="more_in">('+parseFloat(master/job*100).toFixed(0)+'%)</span>&nbsp;';
			var wheelratio = ' <span class="more_in">('+parseFloat(wheel/job*100).toFixed(0)+'%)</span>&nbsp;';
			var bagratio = ' <span class="more_in">('+parseFloat(bag/job*100).toFixed(0)+'%)</span>&nbsp;';
			document.getElementById('topmafia_stats').innerHTML = (master>0?mastermind+'x'+master+masterratio:'')+(wheel>0?wheelman+'x'+wheel+wheelratio:'')+(bag>0?bagman+'x'+bag+bagratio:'');
		}
		var l = document.getElementById('log');
		//l.innerHTML = timestamp()+s + '.<br />' + l.innerHTML;
		logtrunc(s,log_size,log_keep);
		document.getElementById('loot').innerHTML = combinedloot;
		document.getElementById('lootstats').innerHTML = lootcount+'/'+job+'&nbsp; ('+parseFloat(lootcount/job*100).toFixed(1)+'%)';
	}
	function get_xmlHTTP(){
		if(window.XMLHttpRequest)
			return new XMLHttpRequest();
		if(window.ActiveXObject)
			return new ActiveXObject('Microsoft.XMLHTTP');
		return null;
	}
	function request(url) {
		if (run == 1) {
			cb = userid+unix_timestamp();
			var params = {
				'ajax': 1, 
				'liteload': 1, 
				'sf_xw_user_id': userid,
				'sf_xw_sig': local_xw_sig,
				'xw_client_id': 8,
				'skip_req_frame': 1
			};
			//console.log(preurl+url+' '+params['tmp']);
			//console.log(params);
			$.ajax({
				type: "POST",
				url: preurl+url+'&cb='+cb+'&tmp='+job_tmp,
				data: params,
				success: function (msg){
					state_change(msg);
				},
				error: function(request){
					//log(timestamp()+request.status+' '+(error!=undefined?error:request.responseText)+' Error when loading page, retry #'+retries);
					log(timestamp()+' Error when loading page, retry #'+retries);
					retry('Some sort of problem when loading page, retrying...'); 
				}
			});
		}
		else {
			msg(pauseevent);
			document.getElementById("play").style.display = 'inline';
			document.getElementById("pause").style.display = 'none';
		}
		last_url=url;
	}
	function retry(s){
		if(retries>2000000){
			msg(s+'; not retrying any more.');
		}
		else {
			setTimeout(function(){
				retries++;
				msg(s+'; retry #'+retries+'...');
				request(last_url);
			},5000);
		}
	}
	var expnow,expnext,stamina,energy,ratiolvl,ratiolvl2,ratiolvl3,explevel;
	function stats_ratios(s) {
		var stats = s; 
			 //console.log('Stats before length: '+stats.length);
		if (/var user_fields/.test(stats)) { stats=stats.substr(stats.indexOf('var user_fields')); }
		if (/user_info_update/.test(stats)) { stats=stats.substr(0,stats.indexOf('user_info_update')); }
		//console.log('Stats after length: '+stats.length);

		document.getElementById('user_cash_nyc').innerHTML = sign+/user_cash_nyc.*?([\d,]+)/.exec(stats)[1];
		document.getElementById('user_cash_cuba').innerHTML = sign+/user_cash_cuba.*?([\d,]+)/.exec(stats)[1];
		document.getElementById('user_cash_moscow').innerHTML = sign+/user_cash_moscow.*?([\d,]+)/.exec(stats)[1];
		document.getElementById('user_cash_bangkok').innerHTML = sign+/user_cash_bangkok.*?([\d,]+)/.exec(stats)[1];
		document.getElementById('user_cash_vegas').innerHTML = sign+/user_cash_vegas.*?([\d,]+)/.exec(stats)[1];
		document.getElementById('user_cash_italy').innerHTML = sign+/user_cash_italy.*?([\d,]+)/.exec(stats)[1];
		try {
			cur_health = document.getElementById('user_health').innerHTML = p(/user_health.*?(\d+)/.exec(stats)[1]);
			energy = document.getElementById('user_energy').innerHTML = p(/user_energy.*?(\d+)/.exec(stats)[1]);
			stamina = document.getElementById('user_stamina').innerHTML = p(/user_stamina.*?(\d+)/.exec(stats)[1]);
			//expnow = document.getElementById('user_experience').innerHTML = p(/user_experience.*?(\d+)/.exec(stats)[1]);
			//expnext = document.getElementById('exp_for_next_level').innerHTML = p(/exp_for_next_level.*?(\d+)/.exec(stats)[1]);
			//expneed = expnext-expnow;
			expneed = document.getElementById('exp_to_next_level').innerHTML = p(/exp_to_next_level.*?(\d+)/.exec(stats)[1]);
			ratiolvl = expneed/energy;
			ratiolvl2 = expneed/stamina;
			ratiolvl3 = expneed/(energy+stamina);
			(Math.abs(ratiolvl)<10)?(d=2):(d=0);
			(Math.abs(ratiolvl2)<10)?(d2=2):(d2=0);
			(Math.abs(ratiolvl3)<10)?(d3=2):(d3=0);
			if(ratiolvl=='Infinity') { ratiolvl=0; d=0; }
			if(ratiolvl2=='Infinity') { ratiolvl2=0; d2=0; }
			if(ratiolvl3=='Infinity') { ratiolvl3=0; d3=0; }
			//document.getElementById('user_stats').getElementsByClassName('experience')[0].innerHTML='Exp Need: <span class="energy_highlight">'+expneed+'</span><br>(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">)<span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
			document.getElementsByClassName('experience')[0].innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span><br />To next level: <span id="exp_to_next_level" class="energy_highlight">'+expneed+'</span>';
			document.getElementById('level_bar').style.width = /percent_complete.*?(\d+)/.exec(stats)[1]+'%';
		}
		catch (newlayouterr) {
			cur_health = document.getElementById('user_health').innerHTML = p(/user_health.*?(\d+)/.exec(stats)[1]);
			energy = document.getElementById('user_energy').innerHTML = p(/user_energy.*?(\d+)/.exec(stats)[1]);
			stamina = document.getElementById('user_stamina').innerHTML = p(/user_stamina.*?(\d+)/.exec(stats)[1]);
			
			//expnow = p(/user_experience.*?(\d+)/.exec(stats)[1]);
			//expnext = p(/exp_for_next_level.*?(\d+)/.exec(stats)[1]);
			expneed = p(/exp_to_next_level.*?(\d+)/.exec(stats)[1]);
			
			if (document.getElementById('exp_to_next_level')) {
				//expneed = document.getElementById('exp_to_next_level').innerHTML = expnext-expnow;
				document.getElementById('exp_to_next_level').innerHTML = expneed;
			}
			else {
				//expneed = document.getElementById('user_xp_to_next_level').innerHTML = expnext-expnow;
				document.getElementById('user_xp_to_next_level').innerHTML = expneed;
			}	
			
			//expneed = document.getElementById('user_xp_to_next_level').innerHTML = expnext-expnow;
			//expneed = parseInt(document.getElementById('user_xp_to_next_level').innerHTML);
			ratiolvl = eval(expneed/energy);
			ratiolvl2 = eval(expneed/stamina);
			ratiolvl3 = eval(expneed/(energy+stamina));
			(Math.abs(ratiolvl)<5)?(d=2):(d=0);
			(Math.abs(ratiolvl2)<5)?(d2=2):(d2=0);
			(Math.abs(ratiolvl3)<5)?(d3=2):(d3=0);
			if(ratiolvl=='Infinity') { ratiolvl=0; d=0; }
			if(ratiolvl2=='Infinity') { ratiolvl2=0; d2=0; }
			if(ratiolvl3=='Infinity') { ratiolvl3=0; d3=0; }
			if (document.getElementById('exp_to_next_level')) {
				//document.getElementsByClassName('experience')[0].innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
				document.getElementsByClassName('experience')[0].innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span><br />To next level: <span id="exp_to_next_level" class="energy_highlight">'+expneed+'</span>';
				document.getElementById('level_bar').style.width = /percent_complete.*?(\d+)/.exec(stats)[1]+'%';
			}
			else {
				//document.getElementById('user_experience').innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
				document.getElementsByClassName('experience')[0].innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span><br />To next level: <span id="exp_to_next_level" class="energy_highlight">'+expneed+'</span>';
				document.getElementById('level_bar_new_header').style.width = /percent_complete.*?(\d+)/.exec(stats)[1]+'%';
			}
		}
	}
	function state_change(s){
		m=[];
		if (code=/<h2>([a-z0-9]{10})<\/h2>/.exec(s)) {
			log('Found a secret code! '+code[1])
		}
		try {
			//local_xw_sig = /local_xw_sig = '([a-f0-9]+)'/.exec(s)[1];
			job_tmp=/xw_controller=(story|job|episode).*?xw_action=dojob.*?xw_city=.*?tmp=([a-f0-9]+)/.exec(s)[2];
		}
		catch (loadfail) {
			if (/Your session has timed out/.test(s)) {
				log('<span class="bad">Session timed out, you need do the job manually and restart bookmarklet.</span>')
				return;
			}
			else {
				log(timestamp()+'Error when loading page, retry #'+retries);
				retry('Some sort of problem when loading page, retrying...'); 
			}
		}
		stats_ratios(s);
			// if (/mystery_bag_drop_bg/.test(s)) {
				// log('Found a mystery bag!');
				// run = 0;
				// pauseevent='Found a mystery bag...pausing.';
			// }
			// if(/You opened one for yourself/.test(s)) {
				// log('Found a mystery bag!');
				// run = 0;
				// pauseevent='Found a mystery bag...pausing.';
			// }
			// if(script=/var selectJobGift(.*)<\/script/.exec(s)) {
				// log('Found a secret stash bag!');
				// var stash_scripts = [];
				// var stash_script = 'var selectJobGift'+script[1];
				// stash_script = script.replace(/"/g,'\"');
				// stash_scripts[0] = stash_script;
				// var script2=/#popup_fodder(.*);/.exec(s);
				// stash_scripts[0][0] = 'setTimeout(function() { $(\'#popup_fodder'+script2[1].replace(/"/g,'\"');
				// console.log(stash_scripts[0]);
				// console.log(stash_scripts[0][0]);
				// run = 0;
				// pauseevent='Found a secret stash...pausing.';
			// }
			// if (m=/bonus_message.*?href="(.*?)".*?>(.*?)<.*?found the location of a secret stash.*?<script.*?>(.*?)<\/script>/.exec(s)) {
				// run=0;
				// log(timestamp()+'<a href="'+m[1]+'">'+m[2]+'</a> found a <a href="#" onclick="popFightLootFeed(); return false;" id="fight_loot_feed_btn">Secret Stash</a>! <span class="more_in">(Not working, no need to alert friends.)</span>');
				// var stashscript = '<script type="text/javascript">'+m[3]+'<\/script>';
				// $('#fight_loot_feed_btn').append(stashscript);
				// pauseevent='Found a secret stash...pausing.';
			// }	
		if (/user_info_update/.test(s)) { s=s.substr(s.indexOf('user_info_update')); }
		if (/<style type="text\/css">/.test(s)) { s=s.substr(0,s.indexOf('<style type="text/css">')); }
		if(/: Completed/.test(s)) {
			e=/(\d+)( \+(\d+))? Experience/.exec(s);
			en=/(\d+) Energy/.exec(s);
			energy_spent += p(en[1]);
			money='';
			jobmoney=0;
			var bribes = 0;
			if(m=/<span class="money">([A-Z]?)\$([\d,]+)( \+([A-Z]?)\$([\d,]+))?<.span>/.exec(s)) {
				var bribe = '';
				jobmoney += p(m[2]);
				if (m[5]) { jobmoney += p(m[5]); }
				if(mb=/([A-Z]?)\$([\d,]+) in bribes/.exec(s)) {
					bribes=p(mb[2]);
					bribe=' <span class="more_in">(Bribes: '+eval((bribes/jobmoney*100)).toFixed(0)+'%)</span>';
				}
				var result=parseInt(jobmoney-bribes);
				money_gained+=result;
				(m[1]?sign=m[1]+'$':sign='$');
				sign=m[1]+'$';
				money = ' and <span class="good">'+sign+commas(result)+'</span>'+bribe;
			}
			job++;
			pageCount++;
			loot='';
			mastery='';
			pre='';
			exp=0;
			exp=p(e[1]);
			if (e[3]) { exp+=p(e[3]); }
			exp_gained+=exp;
			if (j = />Job Mastery\s*?(\d+)\%<.span>/.exec(s)) { mastery = '. Mastery: '+j[1]+'%'; }
			if (/As a Top Mafia Wheelman/.test(s)) { pre += wheelman; wheel++; }
			if (/As a Top Mafia Mastermind/.test(s)) { pre += mastermind; master++; }
			if (/As a Top Mafia Bagman/.test(s)) { pre += bagman; bag++; }
			if (/Earn a Job Bonus and Get Help/.test(s)) {
				pre += jobhelp;
				//pausecheck('Job help button showing, pausing...');
			}
			if (/Ask Friends For Help to Earn a Bonus/.test(s)) {
				pre += jobhelp;
				//pausecheck('Job help button showing, pausing...');
			}
			if (/Ask for Help and Let Friends Get a Bonus/.test(s)) {
				pre += jobhelp;
				//pausecheck('Job help button showing, pausing...');
			}
			var regex = /You (earned|gained):? (some|a|an) (.+?)\./g;
			while((m = regex.exec(s)) != null) {
				if (!loot) {
					loot = '. Loot: ';
				}
				loot+=m[3]+', ';
				add_loot(m[3]);
				//loot=loot.slice(0,loot.length-2);
			}
			if (m=/You (earned|gained):? (\d+) (.+?)\./.exec(s)) {
				if (!loot) {
					loot = '. Loot: ';
				}
				loot+=m[3]+', ';
				add_loot(m[3]);
				//loot=loot.slice(0,loot.length-2);
			}
			if (labor=/You have found (\d+) of (\d+) items/.exec(s)) {
				loot += ' ('+labor[1]+' of '+labor[2]+')';
			}
			if(set=/You have found all 8 items/.exec(s)) {
				if (!setcomp) {
					//loot += ' '+set[1].replace('Mafia Wars: ','')+' completed!';
					loot += '. Set completed!';
				}
				setcomp = true;
			}
			log(timestamp()+pre+' Gained <span class="good">'+exp+' xp</span>'+money+mastery+loot.slice(0,loot.length-2));
			
			if (/You have mastered all of the/.test(s)) {
				log(timestamp()+star+' Tier Mastered');
				pausecheck('Tier Mastered, pausing...');
			}
			if (/You have mastered the/.test(s)) {
				log(timestamp()+star+' Job Mastered');
				//pausecheck('Job Mastered, pausing...');
				run = 0;
				pauseevent='Job Mastered, pausing...';
				document.getElementById("pause").style.display = 'none';
				document.getElementById("play").style.display = 'inline';
			}
			if(m=/In recognition of your criminal contribution.*been promoted to Level (\d+)!/.exec(s)){
				log(timestamp()+levelup+' Promoted to level '+m[1]); 
				pausecheck('Promoted to level '+m[1]+', pausing...');
			}
			if(m=/been promoted to.*?\s.*?Level (\d+)/.exec(s)){
				log(timestamp()+levelup+' Promoted to level '+m[1]); 
				pausecheck('Promoted to level '+m[1]+', pausing...');
			}
			if(expneed < eval(job_exp[1]*1.5)) {
				pausecheck('Could gain level on next repeat, pausing...');
			}
			if(expneed < parseInt(document.getElementById('exptolevel').value)) {
				pauseevent = 'Stopping because '+expneed+' is lower than '+parseInt(document.getElementById('exptolevel').value)+', your stop limit.';
				run = 0;
			}
			if((energy < parseInt(document.getElementById('energyremain').value)+parseInt(job_en[1])) && (parseInt(document.getElementById('energyremain').value) > 0)) {
				pauseevent = 'You could cross Energy Remain on next repeat. Pausing...';
				run = 0;
			}
			if((ratiolvl.toFixed(2) <= parseFloat(document.getElementById('energytoexpratio').value)) && (energy > 0) && (parseFloat(document.getElementById('energytoexpratio').value) > 0)){
				pauseevent = 'You have crossed your Energy to Experience Ratio. Pausing...';
				run = 0;
			}
			if((ratiolvl2.toFixed(2) <= parseFloat(document.getElementById('staminatoexpratio').value)) && (stamina > 0) && (parseFloat(document.getElementById('staminatoexpratio').value) > 0)){
				pauseevent = 'You have crossed your Stamina to Experience Ratio. Pausing...';
				run = 0;
			}
			if ((job >= jobstodo) && (jobstodo != 0)) { 
				pauseevent = 'Done working. Taking a break after '+job+' jobs.'; 
				run = 0;
			}
			retries = 0;
			repeat_job();
		}
		else if (/Error while loading page from/.test(s)) {
			msg('Mafia Wars overloaded, waiting 20 seconds...');
			setTimeout(function(){ request(last_url); },20000);
			return;
		}
		else if(/You don't have the necessary items/.test(s)){
			msg('<span class="bad">Missing items to repeat job.</span>');
		}
		else if(m=/You don't have enough (.*?) for this job/.exec(s)){
			msg('<span class="bad">Need more '+m[1]+' to complete job.</span>');
		}
		else if(/It looks like you changed cities in another browser window/.test(s)){
			msg('You have changed cities in another window. Travel back and then continue.');
			document.getElementById("play").style.display = 'inline';
			document.getElementById("pause").style.display = 'none';
		}
		else if(/to take this job/.test(s)){
			msg('Wait for more energy, then rerun the bookmarklet.');
			document.getElementById("play").style.display = 'inline';
			document.getElementById("pause").style.display = 'none';
		}
	}
	xmlHTTP=get_xmlHTTP();
	if(!xmlHTTP){
		alert('Your browser does not support XMLHTTP.');
		return;
	}
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
	pageTracker._trackPageview("/script/RepeatJob"); 
	} catch(err) {}
	//end analytics

	} //end try
	catch(mainerr) {
		var spock_div=document.getElementById('spockdiv');
		if(spock_div) {
			spock_div.innerHTML='';
		}
		alert('Some error occured, '+version+' not loaded.\n\n- Did you run it on a unframed MW page with a Do Job Again button showing?\n\n- Have you tried reloading the game?\n\nVersion: '+version+'\nCity: '+xw_city+'\n'+mainerr);
	}

})()