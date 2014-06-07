// ==UserScript==
// @name           Facebook Mafia Wars Repeat Job
// @namespace      http://www.spockholm.com/mafia/bookmarklets.php
// @description    attack someone
// @include        http://apps.facebook.com/inthemafia/*
// @include        http://apps.new.facebook.com/inthemafia/*
// @include        http://mwfb.zynga.com/mwfb/*
// ==/UserScript==
/* 
	To do:
	Text field for delay.
	Clean up code.
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

var xmlHTTP,
wait1=25,wait2=30,
e,m,mc,mcb,i,l,j,t,cur_en,version='RepeatJob v1.25 beta (iframe)',
levelup='<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_promote_up_15x15_01.gif" width="13" height="13" title="Level up">',
star='<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_star_16x16_gold_01.gif" width="13" height="13" title="Mastered Job or Tier">',
mastermind='<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_experience_16x16_01.gif" width="13" height="13" title="Mastermind bonus, 50% more exp.">',
wheelman='<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon-energy.gif" width="13" height="13" title="Wheelman bonus, no energy spent.">',
bagman='<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif" width="13" height="13" title="Bagman bonus, double cash.">',
jobhelp='<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_jobhelp_16x16_01.gif" width="13" height="13" title="Job help button.">',
job=0,exp=0,exp_now=0,exp_next=0,ratio=0,loot='',completed='',sign='$',exp_gained=0,energy_spent=0,money_gained=0,retries=0,combinedloot='',
onevent='Continue',pauseevent,wheel=0,master=0,bag=0,content=document.getElementById('content_row');
var setcomp = false;
var timestamping = true;
var log_keep=/(level|completed)/;
var log_size=20;
var jobstodo=0;
var lootcount=0;
var cur_en,expnow,expnext,cur_sta,cbtmp;
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
var job_exp=/(\d+)( \+(\d+))? Experience/.exec(content.innerHTML);
var job_alt=/xw_controller=(story|job|episode).*xw_city=(\d+).*tmp=([0-9a-f]+).*?cb=(\d+).*job=(\d+).*tab=(\d+)/.exec(document.getElementsByClassName("message_body")[0].innerHTML);
var job_url=MWURL+'xw_controller='+job_alt[1]+'&xw_action=dojob&xw_city='+job_alt[2]+'&tmp='+job_alt[3]+'&cb='+job_alt[4]+'&job='+job_alt[5]+'&tab='+job_alt[6]+'&skip_req_frame=1&ajax=1';
last_url=job_url;

var config_html =
'<style type="text/css">'+
	'.messages img{margin:0 3px;vertical-align:middle}'+
	'.messages input {border: 1px solid #FFF;margin 0;padding 0;background: #000; color: #FFF; width: 30px;}'+
	'#play{display:none}'+
	'#pause{display:inline}'+
	'#close{display:inline}'+			
'</style>'+
'<table class="messages" >'+
'<tr><td>Jobs to Do:</td><td><input id="jobstodo" name="jobstodo" type="text" value="'+jobstodo+'" maxlength="6" />&nbsp;0=unlimited</td>'+
'<td align="right" style="text-align:right;font-size:0.8em;">'+version+' - Visit <a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_top">Spockholm Mafia Tools</a> - <a href="http://www.spockholm.com/mafia/donate.php" alt="Buy me a beer" target="_blank">PintWare</a> - '+
'<a href="#" id="play"><img src="http://www.spockholm.com/mafia/play.gif" title="Play" width="16" height="16"></a>'+
'<a href="#" id="pause"><img src="http://www.spockholm.com/mafia/pause.gif" title="Pause" width="16" height="16"></a>'+
'<a href="#" id="close"><img src="http://www.spockholm.com/mafia/stop.gif" title="Close" width="16" height="16"></a>'+
'</td></tr>'+
'<tr><td>Pause on Ratio:</td><td><input id="energytoexpratio" name="energytoexpratio" type="text" value="0" maxlength="4" /> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">&nbsp;or&nbsp;<input id="staminatoexpratio" name="staminatoexpratio" type="text" value="0" maxlength="4" /> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Stamina needed per Energy"> &nbsp; </td><td align="right" style="text-align:right;">Delay: <input id="delay1" name="delay1" type="text" value="'+wait1+'" maxlength="4" /> to <input id="delay2" name="delay2" type="text" value="'+wait2+'" maxlength="4" /> sec</td></tr>'+
'<tr><td>Jobs Done:</td><td  id="jobs"></td><td align="right" style="text-align:right;"><a href="#" id="onevent">'+onevent+'</a> on event and <a href="#" id="lootshow">hiding</a> items</td></tr>'+
'<tr><td>Exp Gained:</td><td id="exp_gained"></td><td align="right" style="text-align:right;"></td></tr>'+
'<tr><td>Money Gained:</td><td id="money_gained" colspan="2"></td></tr>'+
'<tr><td>Status:</td><td colspan="2" id="status"></td></tr>'+
'<tr id="lootrow">'+
	'<td valign="top">Loot:</td>'+
	'<td colspan="2" id="loot"></td>'+
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
function repeat_job() {
	function f () {
		msg('Repeating job... (<a href="'+job_url+'">url</a>)');
		last_url=job_url;
		request(job_url);
	}
	wait = myRandom(parseInt(wait1),parseInt(wait2));
	pausing(wait,'Doing job again in ',f);
}
if (!job_url) { alert('You must do a job first, then use the bookmarklet.'); }
else {
	create_div();
	var run=1;
	repeat_job();
}
document.getElementById('close').onclick=function(e) {
	run = 0;
	delete xmlHTTP['onreadystatechange'];
	document.getElementById("content_row").removeChild(document.getElementById("spockdiv"));
	return false;
}
document.getElementById('pause').onclick=function(e) {
	run = 0;
	pauseevent='Manually paused...';
	document.getElementById("pause").style.display = 'none';
	document.getElementById("play").style.display = 'inline';
	return false;
}
document.getElementById('play').onclick=function(e) {
	run = 1;
	document.getElementById("play").style.display = 'none';
	document.getElementById("pause").style.display = 'inline';
	msg('Repeating job again... (<a href="'+job_url+'">url</a>)');
	request(last_url);
	return false;
}
document.getElementById('delay1').onkeyup=function(e) {
	time = parseInt(document.getElementById('delay1').value);
	if((time < 0) || (!time)) { wait1 = 0; }
	else { wait1 = time; }
	document.getElementById("delay1").value=wait1;
}
document.getElementById('delay2').onkeyup=function(e) {
	time = parseInt(document.getElementById('delay2').value);
	if((time < 0) || (!time)) { wait2 = 0; }
	else { wait2 = time; }
	document.getElementById("delay2").value=wait2;
}
document.getElementById('jobstodo').onkeyup=function(e) {
	jobstodo = parseInt(document.getElementById('jobstodo').value);
	if((jobstodo < 0) || (!jobstodo)) { jobstodo = 0; }
	else { jobstodo = jobstodo; }
	document.getElementById("jobstodo").value=jobstodo;
}
document.getElementById('logsize').onkeyup=function(e) {
	log_size = parseInt(document.getElementById('logsize').value);
	if((log_size < 0) || (!log_size)) { log_size = 20; }
	else { log_size = log_size; }
	//createCookie('spockaX_logsize',log_size);
	document.getElementById('logsize').value=log_size;
}
document.getElementById('onevent').onclick=function(e) {
	if (onevent == 'Continue') {
		onevent = 'Pause';
		document.getElementById('onevent').innerHTML = onevent;
	}
	else {
		onevent = 'Continue';
		document.getElementById('onevent').innerHTML = onevent;
	}
	return false;
}
function pausecheck(s) {
	if (onevent == 'Pause') {
		run = 0;
		pauseevent=s;
	}
}
document.getElementById('lootshow').onclick=function(e) {
	var row = document.getElementById("lootrow");
	if (row.style.display == '') { 
		row.style.display = 'none'; 
		document.getElementById("lootshow").innerHTML = 'hiding';
	}
	else { 
		row.style.display = '';
		document.getElementById("lootshow").innerHTML = 'showing';
	}
	return false;
}
document.getElementById('logshow').onclick=function(e) {
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
}
document.getElementById("play").style.display = 'none';
document.getElementById("pause").style.display = 'inline';
document.getElementById("close").style.display = 'inline';
document.getElementById("lootrow").style.display = 'none';
var Loots=new Array();
function add_loot(s){
	var f=-1;
	for(var i=0;i<Loots.length&&f==-1;++i) {
		if(Loots[i][0]==s) { f=i; }
	}
	if(f!=-1) { Loots[f][1]++; }
	else {
		Loots[Loots.length]=new Array(s,1);
	}
	var t='';
	Loots.sort();
	for(var i=0;i<Loots.length;++i) {
		t+='<span class="good">'+Loots[i][1]+'x</span> '+Loots[i][0]+'<br />';
	}
	combinedloot=t;
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
	ratio = exp_gained/energy_spent;
	document.getElementById('delay1').value = wait1;
	document.getElementById('delay2').value = wait2;
	document.getElementById('jobs').innerHTML = job+' &nbsp; <span class="more_in">('+energy_spent+' energy)</span>' ;
	document.getElementById('exp_gained').innerHTML = exp_gained+' &nbsp; <span class="more_in">(Ratio: '+(ratio).toFixed(2)+')</span>';
	document.getElementById('money_gained').innerHTML = '<strong class="money">'+sign+commas(money_gained)+'</strong> &nbsp;'+(master>0?mastermind+'x'+master:'')+(wheel>0?wheelman+'x'+wheel:'')+(bag>0?bagman+'x'+bag:'');
	//	$('money_gained').innerHTML = '<strong class="money">'+sign+commas(money_gained)+'</strong>';
	var l = document.getElementById('log');
	//l.innerHTML = timestamp()+s + '.<br />' + l.innerHTML;
	logtrunc(s,log_size,log_keep);
	document.getElementById('loot').innerHTML='' + lootcount + '/' + job + ' &nbsp; (' + (lootcount/job*100).toFixed(1) + '%) <br/>' + combinedloot;
}
function get_xmlHTTP(){
	if(window.XMLHttpRequest)
		return new XMLHttpRequest();
	if(window.ActiveXObject)
		return new ActiveXObject('Microsoft.XMLHTTP');
	return null;
}
function request(url) {
	if (local_xw_sig) { url = url.replace(/sf_xw_sig=([^&]+)/.exec(url)[1],local_xw_sig); }
	if (job > 0) {
		url = url.replace(/tmp=([^&]+)/.exec(url)[1],cbtmp[1]);
		url = url.replace(/cb=([^&]+)/.exec(url)[1],cbtmp[2]);
	}
	//log(url);
	if ((job >= jobstodo) && (jobstodo!=0)) { 
		msg('Done working. Taking a break after '+job+' jobs.'); 
		//log(timestamp()+'Done attacking '+targetname);
		document.getElementById('play').style.display = 'inline';
		document.getElementById('pause').style.display = 'none';
	}
	else if (run == 1) {
		xmlHTTP.onreadystatechange=state_change;
		xmlHTTP.open('GET',url,true);
		xmlHTTP.send(null);
	}
	else {
		msg(pauseevent);
		document.getElementById("play").style.display = 'inline';
		document.getElementById("pause").style.display = 'none';
	}
	last_url=url;
}
function p(s) {
	return parseInt(s.replace(/,/g, ''));
}
function retry(s){
	if(retries>5){
		msg(s+'; not retrying any more.');
	}
	else{
		retries++;
		msg(s+'; retry #'+retries+'...');
		request(last_url);
	}
}
function stats_ratios() {
	expneed = eval(expnext-expnow);
	ratiolvl=eval(expneed/cur_en);
	ratiolvl2=eval(expneed/cur_sta);
	ratiolvl3=eval(expneed/(parseInt(cur_en)+parseInt(cur_sta)));
	var d = 0;
	(Math.abs(ratiolvl)<10)?(d=2):(d=0);
	(Math.abs(ratiolvl2)<10)?(d2=2):(d2=0);
	(Math.abs(ratiolvl3)<10)?(d3=2):(d3=0);
	if(ratiolvl=='Infinity') { ratiolvl=0; d=0; }
	if(ratiolvl2=='Infinity') { ratiolvl2=0; d2=0; }
	if(ratiolvl3=='Infinity') { ratiolvl3=0; d3=0; }
	document.getElementById('user_stats').getElementsByClassName('stat_title')[0].innerHTML='Exp Need: <span class="energy_highlight">'+expneed+'</span><br>(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">) (<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
}
function state_change(){
	if(xmlHTTP.readyState==4){
		if(xmlHTTP.status==200){
			s="";
			uc="";
			m=[];
			s=xmlHTTP.responseText;
			// chop off the Facebook stuff from the beginning, from Vern's DoJobs http://vern.com/mwtools/
			local_sw_sig = /local_xw_sig = '([a-z0-9]+)'/.exec(s)[1];
			if (/<div id="mainDiv">/.test(s)) { s=s.substr(s.indexOf('<div id="mainDiv">')); }
			cbtmp=/xw_controller=job.*?xw_action=dojob.*?xw_city=.*?tmp=([a-f0-9]+).*?cb=(\d+)/.exec(s);
			//cb=/xw_controller=job.*?xw_action=dojob.*?xw_city=.*?tmp=([a-f0-9]+).*?cb=(\d+)/.exec(s)[2];
			//job_url = job_url.replace(/tmp=([^&]+)/,cbtmp[1]);
			//job_url = job_url.replace(/cb([^&]+)/,cbtmp[2]);
			//MWURL = MWURL.replace(/local_sw_sig=([^&]+)/,local_sw_sig);
			if(m=/user_cash[^>]*>([^<]*)</m.exec(s)) {
				uc=document.getElementById('user_cash_nyc');
				if(uc) uc.innerHTML=m[1];
				uc=document.getElementById('user_cash_cuba');
				if(uc) uc.innerHTML=m[1];
				uc=document.getElementById('user_cash_moscow');
				if(uc) uc.innerHTML=m[1];
				uc=document.getElementById('user_cash_bangkok');
				if(uc) uc.innerHTML=m[1];
			}
			if(m=/user_health[^>]*>([^<]*)</.exec(s)) {
				cur_health = m[1];
				document.getElementById('user_health').innerHTML=cur_health;
			}
			if(m=/user_max_health[^>]*>([^<]*)</.exec(s)) {
				max_health = m[1];
				document.getElementById('user_max_health').innerHTML=max_health;
			}
			if(m=/user_energy[^>]*>([^<]*)</m.exec(s)) {
				cur_en = m[1];
				document.getElementById('user_energy').innerHTML=cur_en;
			}
			if(m=/user_stamina[^>]*>([^<]*)</m.exec(s)) {
				cur_sta=m[1];
				document.getElementById('user_stamina').innerHTML=m[1];
			}
            if(m=/user_experience[^>]*>([^<]*)</m.exec(s)) {
				expnow=m[1];
				document.getElementById('user_experience').innerHTML=expnow;
            }
            if(m=/exp_for_next_level[^>]*>([^<]*)</m.exec(s)) {
                expnext=m[1];
				document.getElementById('exp_for_next_level').innerHTML=expnext;
				expneed=p(expnext)-p(expnow);
				ratiolvl=eval(expneed/cur_en);
				if (Math.abs(ratiolvl)<10) { d=2; }
				else { d=0; }
                //document.getElementById('user_stats').getElementsByClassName('stat_title')[0].innerHTML='Exp Need: <span class="energy_highlight">'+expneed+'</span><br> &nbsp; (<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span> xp/energy)';
            }
            if(m=/<div[^>]*level_bar[^>]* width:\s*([0-9%]*)/.exec(s)) {
                document.getElementById('level_bar').style.width=m[1];
            }
			stats_ratios();
			if(/: Completed/.test(s)) {
				e=/(\d+)( \+(\d+))? Experience/.exec(s);
				en=/(\d+) Energy/.exec(s);
				energy_spent += p(en[1]);
				money='';
				jobmoney=0;
				if(m=/<span class="money">\$([\d,]+)( \+\$([\d,]+))?<.span>/.exec(s)) {
					jobmoney += p(m[1]);
					if (m[3]) { jobmoney += p(m[3]); }
					money_gained+=jobmoney;
					sign='$';
					money = ' and <span class="good">'+sign+commas(jobmoney)+'</span>';
				}
				if(mc=/<span class="money">C\$([\d,]+)( \+C\$([\d,]+))?<.span>/.exec(s)) {
					mcb=/C\$([\d,]+) in bribes/.exec(s);
					jobmoney += p(mc[1]);
					if (mc[3]) { jobmoney += p(mc[3]); }
					b=p(mcb[1]);
					result=eval(jobmoney-b);
					bribe=' <span class="more_in">(Bribes: '+eval((b/jobmoney*100)).toFixed(1)+'%)</span>';
					money_gained+=result;
					sign='C$';
					money = ' and <span class="good">'+sign+commas(result)+'</span>'+bribe;
				}
				if(mc=/<span class="money">R\$([\d,]+)( \+R\$([\d,]+))?<.span>/.exec(s)) {
					jobmoney += p(mc[1]);
					if (mc[3]) { jobmoney += p(mc[3]); }
					if (mcb=/R\$([\d,]+) in bribes/.exec(s)) {
						b=p(mcb[1]);
						result=eval(jobmoney-b);
					}
					else {
						result=jobmoney;
					}
					money_gained+=result;
					sign='R$';
					money = ' and <span class="good">'+sign+commas(result)+'</span>';
				}
				if(mc=/<span class="money">B\$([\d,]+)( \+B\$([\d,]+))?<.span>/.exec(s)) {
					jobmoney += p(mc[1]);
					if (mc[3]) { jobmoney += p(mc[3]); }
					if (mcb=/B\$([\d,]+) in bribes/.exec(s)) {
						b=p(mcb[1]);
						result=eval(jobmoney-b);
					}
					else {
						result=jobmoney;
					}
					money_gained+=result;
					sign='B$';
					money = ' and <span class="good">'+sign+commas(result)+'</span>';
				}
				job++;
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
					pausecheck('Job help button showing, pausing...');
				}
				if (/Ask Friends For Help to Earn a Bonus/.test(s)) {
					pre += jobhelp;
					pausecheck('Job help button showing, pausing...');
				}
				var regex = /You (earned|gained) (some|a|an) (.+?)\./g;
				while((m = regex.exec(s)) != null) {
					if (!loot) {
						loot = '. Loot: ';
					}
					loot+=m[3]+', ';
					add_loot(m[3]);
					//loot=loot.slice(0,loot.length-2);
				}
				if (m=/You (earned|gained) (\d+) (.+?)\./.exec(s)) {
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
				if(expneed < eval(job_exp[1]*1.5)) {
					pausecheck('Could gain level on next repeat, pausing...');
				}
				repeat_job();
			}
			else if (/Error while loading page from/.test(s)) {
				msg('Mafia Wars overloaded, waiting 20 seconds...');
				setTimeout(function(){ request(last_url); },20000);
				return;
			}
			else if(/You don't have the necessary items/.test(s)){
				msg('Missing items to repeat job.');
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
			else{
				retry('Unknown response when loading page. (<a href="'+last_url+'">url</a>)');
				return;
			}
		}
		else{
			retry('Could not load page properly. (<a href="'+last_url+'">url</a>)');
			return;
		}
	}
	retries=0;
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
	alert('Some error occured, RepeatJob not loaded.\nDid you run it on a unframed MW page with a Do Job Again button showing?\nIf you did, report the following message to Spockholm:\n\n'+mainerr);
}

})()