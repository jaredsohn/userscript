/**
*	@Credits:http://www.spockholm.com/mafia/
*/

// ==UserScript==
// @name        Brutus
// @namespace   mafia Line
// @description Autoplayer for the facebook application 
// @include     http://apps.facebook.com/inthemafia*
// @exclude     http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=gift*
// @version     1.07
// ==/UserScript==



javascript:(function (){
var version='Brutus Helper v1.07 beta (ajax)';
try {
  if (document.getElementById('app10979261223_iframe_canvas')) {
      window.location.href = document.getElementById('app10979261223_iframe_canvas').src;
      return;
  }
  else if (document.getElementsByClassName('canvas_iframe_util')[0]) {
      window.location.href = document.getElementsByClassName('canvas_iframe_util')[0].src;
      return;
  }
  else if (document.getElementById('some_mwiframe')) {
		//new mafiawars.com iframe
		window.location.href=document.getElementById('some_mwiframe').src;
		return;
  }
  else {
    document.body.parentNode.style.overflowY = "scroll";
    document.body.style.overflowX = "auto";
    document.body.style.overflowY = "auto";
    try {
		document.evaluate('//div[@id="mw_city_wrapper"]/div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).style.margin="auto";
		if (typeof FB != 'undefined') {
			FB.CanvasClient.stopTimerToSizeToContent;
			window.clearInterval(FB.CanvasClient._timer);
			FB.CanvasClient._timer = -1;
		}
	  document.getElementById('mw_zbar').parentNode.removeChild(document.getElementById('mw_zbar'));
    }
    catch(fberr) {}
  }
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
	if (navigator.appName == 'Microsoft Internet Explorer') { 
		alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
		return;
	}
	var MWURL = getMWURL();
	var sf_xw_sig = /sf_xw_sig=([a-fA-F0-9]+)/.exec(MWURL);
	var run=1,xmlHTTP,content=document.getElementById('content_row'),debug=false,specialmsg='',output='',
	x=0,second=false,last_url=null,retries=0,tmpkey=false,totalfriends=0,combinedloot='',done=0,list=0,ach=1,
	mw_url='http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22ID%22%7D',color='#BCD2EA',
	fb_url='http://www.facebook.com/profile.php?id=',cuba_gained=0,ny_gained=0,moscow_gained=0,bangkok_gained=0,vegas_gained=0,exp_gained=0,friends_helped=0;
	var wait1=3,wait2=6,skip=0,city='',oldcity='';
	var log_size=10;
	var log_keep=/(Limit|friends|Facebook|Starting)/;
	var oldcity='';
	var newfriends=[],newnames=[],friendslist=[],nameslist=[],friendarray=[],friendsint=[],namesint=[],names=[];
	var currentPageCount = 1;
	var jobsdone=[];
	var friendquicklist='';
	var xw_city = 1;
	//var userid = /user_id=([0-9]+)/.exec(MWURL)[1];
	var userid = /'sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
	var fbuserid = FB.Facebook.apiClient.get_session().uid+'';
	jobsdone['New_York']=0,
	jobsdone['Cuba']=0,
	jobsdone['Moscow']=0,
	jobsdone['Moscow_Boss']=0,
	jobsdone['Bangkok_Boss']=0,
	jobsdone['Vegas']=0,
	jobsdone['Money_Laundry']=0,
	jobsdone['Late']=0;
	try {
		//Gift page friends from Francisco Moraes
		var inputs = document.getElementsByTagName("input");
		var c = 0;
		for(i = 0; i < inputs.length; i++) {
			var input = inputs[i];
			if(input.id.indexOf("cb_recip_") == 0) {
				friendsint[c] = input.id.substring(9);
				namesint[c] = input.nextSibling.nodeValue.replace(/^\s+|\s+$/g, '') ;
				c++;
			}
		}
		friends = friendsint;
		names = namesint;
		//alert('Internal friends: '+friends.length+' Names collected: '+names.length);
	}
	catch (interror) {
		//alert(interror); 
	}
	if (friendsint.length > 0) { 
		list=0; 
		specialmsg = '<tr><td colspan="3"><span class="energy_highlight">Found '+friendsint.length+' mafia members.<br />You can only help FB friends so this list could give a lot of not friend errors.</span><br /><span class="bad">Recommendation: Use the Manual list if you have a large non FB-friend mafia.</span></td></tr>';
	}
	if (friendsint.length == 0) { 
		list=1; 
		specialmsg = '<tr><td colspan="3"><span class="bad">No Friends found!</span> <span class="energy_highlight">You have to use the Manual List. Run the bookmarklet on your Gift page to find mafia members.</span><br /><span>You can also try <a id="loadfriendslnk" href="#">clicking here</a>. Wait a while and see if Facebook can help you populate the list.<br />You may need to click a few times.</span></td></tr>';
	}
	// createCookie from Vern's Toolkit http://vern.com/mwtools/
	function createCookie(name,value) {
		// expire one month from now
		var expires = new Date();
		expires.setDate(expires.getDate()+30);
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

	//Pistol Pete FQL code
	function parseFBFr(){
		var fql="SELECT uid,name FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1=" + FB.Facebook.apiClient.get_session().uid + ") AND is_app_user = 1 ORDER BY name";
		//alert(fql);
		var f=function(){
			var results=[];
			var friendquicklist;
			return {
				getResults: function(){ return results; },
				process: function(fbfr){
					if (fbfr){
					for(i=0;i<fbfr.length;i++) {
						  //results[results.length]={	'id':fbfr[i].uid, 'name':fbfr[i].name };
						  if (fbfr[i].name != null) {
								friendquicklist += fbfr[i].uid+', '+ fbfr[i].name.replace(/[^A-Za-z0-9 ]/g, '') +'\n';
						}
						  
					}
					}
					else{friendquicklist='Unable to retrive list. Please try again.'}
					//friend=results;
					document.getElementById('friendlist').value = friendquicklist.replace(/undefined/,'');
				}
			};
		}();
		document.getElementById('friendlist').value = 'Loading...Be Patient...';
		FB.Facebook.apiClient.fql_query(fql, f.process);
		return ;
	}
	
	//wait1 = readCookie('spockjobs_wait1');
	//if (wait1) wait1=wait1.replace(/[^0-9]/g,'');
	if ((wait1 == null) || (wait1.length == 0)) { wait1 = 3; }
	//wait2 = readCookie('spockjobs_wait2');
	//if (wait2) wait2=wait2.replace(/[^0-9]/g,'');
	if ((wait2 == null) || (wait2.length == 0)) { wait2 = 6; }
	skip = readCookie('brutus_skip');
	if (skip) skip=skip.replace(/[^0-9]/g,'');
	if ((skip == null) || (skip.length == 0)) { skip = 0; }
	redo="";

	function myRandom(min,max) {
		return min + Math.floor(Math.round((Math.random() * (max - min))));
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
	redo="";
	selectable = ['','New_York','Level','Cuba','Iced','Moscow','Money_Laundry','Moscow_Boss','Chop','Bangkok_Boss','Vegas','Weapons','Robbery','Achievement','Stash'];

	var config_html =
	'<style type="text/css">'+
		'.messages img{margin:0 3px;vertical-align:top};'+
		'#close{display:inline};'+	
	'</style>'+
	'<form name="spockform">'+
		'<table class="messages">'+
			'<tr><td>Configuration</td><td colspan="2" align="right" style="text-align:right;font-size:0.8em;">'+version+' - <a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_top">Spockholm Mafia Tools</a> - <a href="http://www.spockholm.com/mafia/donate.php?BrutusHelper" alt="Buy me a beer" target="_blank">PintWare</a> (Donate) - <a href="#" id="close"><img src="http://www.spockholm.com/mafia/stop.gif" title="Close" width="16" height="16"></a></td></tr>'+
			specialmsg+
			'<tr><td>Delay interval:</td><td><input type="text" name="wait1" id="wait1" value="'+wait1+'" size="3">-<input type="text" name="wait2" id="wait2" value="'+wait2+'" size="3"></td><td>Delay in seconds between checks.</td></tr>'+
			'<tr><td>Skip:</td><td><input type="text" name="skip" id="skip" value="'+skip+'"></td><td>Friends to skip</td></tr>'+
			'<tr><td valign="top">Cities:</td><td valign="top" colspan="2">Boosts:</td>';
			config_html += '<tr>';
			for(var i=1;i<selectable.length;i++){
				config_html += '<td '+(i%2==0&&i>0?'colspan="2"':'')+'><input type="checkbox" name="'+selectable[i]+'" id="'+selectable[i]+'" '+(selectable[i]=='Achievement'||selectable[i]=='Money_Laundry'||selectable[i]=='Vegas'?'':'checked')+'/>&nbsp;'+selectable[i]+' '+(selectable[i]=='Money_Laundry'?'<span class="bad">Not working</span>':'')+'</td>';
				config_html += (i%2==0&&i>0?"</tr><tr>":"");
			}
			config_html += '</tr>';
			config_html += '<tr><td colspan="3" valign="top"><span class="bad">Achievements are painfully slow and are not recommended to search for.<br />Zynga has broken the Money Laundry link.</span></td></tr>';
			//for(var i=0;i<selectable.length;i++){
			//	config_html += '<input type="checkbox" name="'+selectable[i]+'" id="'+selectable[i]+'" '+(selectable[i]=='Level'?'checked':'')+'/>&nbsp;'+selectable[i]+'<br />';
			//}
			//config_html += '</td><td colspan="2" valign="top">Select boosts to search for.<br /><span class="bad">Achievements are painfully slow and not recommended.</span></td></tr>'+
			config_html +=  '<tr>'+
				'<td>List: </td>'+
				'<td>'+
					'<select name="list" id="list">';
					if (list==1) {
						config_html += '<option value="1"'+(list==1?" selected":"")+'>Manual List</option>';
					}
					else {
						config_html += '<option value="0"'+(list==0?" selected":"")+'>Internal List</option>';
						config_html += '<option value="1"'+(list==1?" selected":"")+'>Manual List</option>';
					}
	config_html += '</select>'+
				'</td>'+
				'<td> Select which source to use to find your list of mafia.</td>'+
			'</tr>'+
			'<tr id="manual_list">'+
				'<td valign="top">Friend List:</td>'+
				'<td colspan="2"><textarea name="friendlist" id="friendlist" class="instructions" rows="25" cols="50">'+
					'Enter in this box a list of your mafia.\n'+
					'Enter an ID and (optional) Name, one per line.\n'+
					'Lines that do not begin with a number will be discarded.\n'+
					'\n'+
					'Examples:\n'+
					'123123123123,One Two Three\n'+
					'456456456 Four Five\n'+
					'7898798343\n'+
				'</textarea></td>'+
			'</tr>'+
			'<tr><td>Restart: </td><td><input type="checkbox" name="redo" id="redo" '+redo+'/></td><td colspan="2"> Restart processing from the beginning when we are done.</td>'+
			'<tr><td>Debug: </td><td><input type="checkbox" name="debug" id="debug" /></td><td colspan="2"> Output messages for debugging?</td></tr>'+
			'<tr><td colspan="3"><a class="sexy_button" id="start">Start</a></td></tr>'+
		'</table>'+
	'</form>';

	var running_html = 
	'<style type="text/css">'+
		'.messages img{margin:0 3px;vertical-align:top}'+
		'.messages input {border: 1px solid #FFF;margin 0;padding 0;background: #000; color: #FFF; width: 20px;}'+
		'#play{display:none}'+
		'#pause{display:inline}'+
		'#close{display:inline}'+
	'</style>'+
	'<table class="messages">'+
	'<tr>'+
		'<td></td><td colspan="2" align="right" style="text-align:right;font-size:0.8em;">'+version+' - <a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_top">Spockholm Mafia Tools</a> - <a href="http://www.spockholm.com/mafia/donate.php?BrutusHelper" alt="Buy me a beer" target="_blank">PintWare</a> (Donate) - <a href="#" id="play"><img src="http://www.spockholm.com/mafia/play.gif" title="Play" width="16" height="16" /></a> <a href="#" id="pause"><img src="http://www.spockholm.com/mafia/pause.gif" title="Pause" width="16" height="16" /></a> <a href="#" id="close"><img src="http://www.spockholm.com/mafia/stop.gif" title="Close" width="16" height="16"></a></td></tr>'+
	'</tr>'+
	'<tr>'+
		'<td width="100">Progress:</td>'+
		'<td><span id="progress"></span> &nbsp; (<a href="#" id="remaining">Popup remaining</a>)</td>'+
		'<td align="right" style="text-align:right;">Delay: <input id="delay1" name="delay1" type="text" value="'+wait1+'" maxlength="2" /> - <input id="delay2" name="delay2" type="text" value="'+wait2+'" maxlength="2" /> sec</td>'+
	'</tr>'+
	'<tr>'+
		'<td>Friends helped:</td>'+
		'<td colspan="2" id="friends_helped"></td>'+
	'</tr>'+
	'<tr>'+
		'<td>Exp gained:</td>'+
		'<td colspan="2" id="exp_gained"></td>'+
	'</tr>'+
	'<tr>'+
		'<td>Money gained:</td>'+
		'<td colspan="2" id="money_gained"></td>'+
	'</tr>'+
	'<tr>'+
		'<td>Status:</td>'+
		'<td colspan="2" id="status"></td>'+
	'</tr>'+
	'<tr>'+
		'<td valign="top"><a href="#" id="lootshow">Showing</a> loot:</td>'+
		'<td colspan="2" id="loot"></td>'+
	'</tr>'+
	'<tr>'+
		'<td valign="top"><a href="#" id="logshow">Showing</a> Log:<br/>Limit: <input id="logsize" name="logsize" type="text" value="'+log_size+'" maxlength="4" /><br /></td>'+
		'<td colspan="2" id="log" valign="top"></td>'+
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
	create_div();
	function current_city() {
		if (document.getElementById('mw_city_wrapper')){
			var Elcity = document.getElementById('mw_city_wrapper');
			if (!Elcity) return false;

			// Update basic player information.
			switch(Elcity.className){
				case 'mw_city1':
					//city = 'New York';
					xw_city=1;
					break;
				case 'mw_city2':
					//city = 'Cuba';
					xw_city=2;
					break;
				case 'mw_city3':
					//city = 'Moscow';
					xw_city=3;
					break;
				case 'mw_city4':
					//city = 'Bangkok';
					xw_city=4
					break;
				case 'mw_city5':
					//city = 'Vegas';
					xw_city=5
					break;
				}
			//console.log(xw_city);
		}
	}
	current_city();
	document.getElementById('close').onclick=function(e) {
		run = 0;
		delete xmlHTTP['onreadystatechange'];
		document.getElementById("content_row").removeChild(document.getElementById("spockdiv"));
		return false;
	};
	document.getElementById("list").onchange=function(e) {
		if (document.getElementById("list").value == 0) { document.getElementById("manual_list").style.display = 'none'; }
		else { document.getElementById("manual_list").style.display = 'table-row'; list=1; }
	};
	document.getElementById("list").onchange();
	document.getElementById("friendlist").onfocus=function(e) {
		document.getElementById("friendlist").value="";
		document.getElementById("friendlist").style.color="#000";
		document.getElementById("friendlist").onfocus=null;
	};
	
	if (list == 1) {
		document.getElementById('loadfriendslnk').onclick=function(e) {
			document.getElementById("friendlist").focus();
			//friend = parseFBFr();
			//setTimeout(function(){loadfbfriends(friend);},3000);
			//loadfbfriends(parseFBFr());
			parseFBFr();
		};
	}
	//start start function
	//document.getElementById('start').onclick=function(e) {
	function start(){
		run = 1;
		wait1 = parseInt(document.spockform.wait1.value);
		//createCookie("spockjobs_wait1",wait1);
		wait2 = parseInt(document.spockform.wait2.value);
		//createCookie("spockjobs_wait2",wait2);
		skip = parseInt(document.spockform.skip.value);
		createCookie("brutus_skip",skip);

		if (document.spockform.redo.checked) { redo = "checked"; }
		else { redo = ""; }
		if (document.spockform.debug.checked) { debug = true; }
		//make array with the valid cities
		cities = [];
		if (document.spockform.New_York.checked) { cities.push('New_York'); }
		if (document.spockform.Cuba.checked) { cities.push('Cuba'); }
		if (document.spockform.Moscow.checked) { cities.push('Moscow'); }
		if (document.spockform.Moscow_Boss.checked) { cities.push('Moscow_Boss'); }
		if (document.spockform.Bangkok_Boss.checked) { cities.push('Bangkok_Boss'); }
		if (document.spockform.Vegas.checked) { cities.push('Vegas'); }
		if (document.spockform.Money_Laundry.checked) { cities.push('Money_Laundry'); }

		//make array with the valid boosts
		if (document.spockform.Level.checked) { cities.push('Level'); }
		if (document.spockform.Iced.checked) { cities.push('Iced'); }
		if (document.spockform.Chop.checked) { cities.push('Chop'); }
		if (document.spockform.Robbery.checked) { cities.push('Robbery'); }
		if (document.spockform.Weapons.checked) { cities.push('Weapons'); }
		if (document.spockform.Achievement.checked) {cities.push('Achievement'); }
		if (document.spockform.Stash.checked) { cities.push('Stash'); }

		if (cities.length == 0) { cities = ['New_York','Cuba','Moscow','Moscow_Boss','Bangkok_Boss']; }
		validcities = cities;
		
		if (list == 1) {
			friendarray=document.spockform.friendlist.value.split("\n");
			for (i=0; i<friendarray.length; i++) {
				if (m=/^([0-9]+)[,\s]*(.*)$/.exec(friendarray[i])) {
					friendslist[i] = m[1];
					if (m[2]) { nameslist[i] = m[2]; }
				}
			}
			delete friendarray;
			friends = friendslist;
			names = nameslist;
		}
		if ((list == 1) && (friends.length == 8) || (friends.length == 0)) {
			alert('You did not fill in the manual list properly. It should be a list containing numbers on new lines.\nList FB friends on the testing page http://www.spockholm.com/mafia/testing.php\n will create this list for you.');
			return;
		}
		//comparing the internal and the manual lists to filter friends
		if ((friendslist.length > 0) && (friendsint.length > 0)) {
			c = 0;
			for(i = 0; i < friendslist.length; i++) {
				if(friendsint[i].indexOf(friendslist[i])) {
				//if(friendslist[i].toString() in friendsint) { 
					newfriends[c++] = friendslist[i]; 
					newnames[c] = nameslist[i]; 
				}
			}
			friends=[],names=[];
			friends = newfriends;
			names = newnames;
			//alert('Both in internal and manual friends: '+friends.length);
		}
		//clean up unused arrays
		if (newfriends.length > 0) { delete newfriends; }
		if (newnames.length > 0) { delete newnames; }
		if (friendslist.length > 0) { delete friendslist; }
		if (nameslist.length > 0) { delete nameslist; }
		if (friendsint.length > 0) { delete friendsint; }
		if (namesint.length > 0) { delete namesint; }

		document.getElementById('spockdiv').innerHTML = running_html;
		// document.getElementById('debug').onclick=function(e) {
			// if (debug) { debug = false; document.getElementById('debug').innerHTML = 'Debug off'; }
			// else { debug = true; document.getElementById('debug').innerHTML = 'Debug on'; }		
		// }
		document.getElementById('lootshow').onclick=function(e) {
			var row = document.getElementById("loot");
			if (row.style.display == '') { 
				row.style.display = 'none'; 
				document.getElementById("lootshow").innerHTML = 'Hiding';
			}
			else { 
				row.style.display = '';
				document.getElementById("lootshow").innerHTML = 'Showing';
			}
			return false;
		};
		document.getElementById('pause').onclick=function(e) {
			run = 0;
			document.getElementById("pause").style.display = 'none';
			document.getElementById("play").style.display = 'inline';
			return false;
		};
		document.getElementById('play').onclick=function(e) {
			run = 1;
			document.getElementById("play").style.display = 'none';
			document.getElementById("pause").style.display = 'inline';
			msg('Resuming job/boost searching... (<a href="'+last_url+'">url</a>)');
			retries = 0;
			request(last_url);
			return false;
		};
		document.getElementById('close').onclick=function(e) {
			run = 0;
			delete xmlHTTP['onreadystatechange'];
			document.getElementById("content_row").removeChild(document.getElementById("spockdiv"));
			return false;
		};
		document.getElementById('delay1').onkeyup=function(e) {
			time = parseInt(document.getElementById('delay1').value);
			if((time < 0) || (!time)) { wait1 = 0; }
			else { wait1 = time; }
			//createCookie('spockaX_wait1',wait1);
			document.getElementById('delay1').value=wait1;
		};
		document.getElementById('delay2').onkeyup=function(e) {
			time = parseInt(document.getElementById('delay2').value);
			if((time < 0) || (!time)) { wait2 = 0; }
			else { wait2 = time; }
			//createCookie('spockaX_wait2',wait2);
			document.getElementById('delay2').value=wait2;
		};
		document.getElementById('logsize').onkeyup=function(e) {
			log_size = parseInt(document.getElementById('logsize').value);
			if((log_size < 0) || (!log_size)) { log_size = 10; }
			else { log_size = log_size; }
			//createCookie('spockaX_logsize',log_size);
			document.getElementById('logsize').value=log_size;
		};
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
		};
		savedfiends = [];
		savedfriends = friends;
		if (skip >= friends.length -1) { skip=0; }
		if (skip > 0) {
			log(timestamp()+'Skipping '+skip+' friends of '+friends.length+'.');
			friends=friends.slice(skip);
		}
		//log(timestamp()+'Number of friends existing in both lists: '+newfriends.length);
		totalfriends = friends.length;
		document.getElementById('progress').innerHTML = done+' of '+friends.length+' &nbsp; <span class="more_in">('+(done/totalfriends*100).toFixed(1)+'%)</span>';
		log(timestamp()+'Starting check of '+friends.length+' friends.');
		document.getElementById('remaining').onclick=dirtypop;
		search_job();
	}
	//end start function
	document.getElementById("start").onclick=start;
	function get_xmlHTTP () {
	  if (window.XMLHttpRequest)
		return new XMLHttpRequest();
	  if (window.ActiveXObject)
		return new ActiveXObject('Microsoft.XMLHTTP');
	  return null;
	}
	xmlHTTP = get_xmlHTTP();
	if (!xmlHTTP) {
	  alert('Your browser does not support XMLHTTP.');
	  return;
	}
	function request(url) {
		//console.log(url);
		if (run == 1) {
			//document.getElementById('inner_page').addEventListener('DOMSubtreeModified',state_change,false);
			//url = url.replace(/sf_xw_sig=([^&]+)/.exec(url)[1],local_xw_sig);
			//currentPageCount = pageCount;
			//do_ajax('inner_page', url, 1, 1);
			//console.log(url);
			var preurl = 'http://facebook.mafiawars.com/mwfb/remote/';
			cb = fbuserid+unix_timestamp();
			ts = unix_timestamp();
			var params = { 
				'ajax': 1, 
				'liteload': 1, 
				'sf_xw_user_id': userid,
				'sf_xw_sig': local_xw_sig,
				'skip_req_frame': 1
			};
			$.ajax({
				type: "POST",
				//url: preurl+url+'&cb='+cb,
				url: preurl+url+'&xw_client_id=8',
				data: params,
				timeout: 10000,
				success: function (msg){
					state_change(msg);
				},
				error: function(request,error){
					log(timestamp()+request.status+' '+(error!=undefined?error:request.responseText)+' Error when loading page, retry #'+retries);
					retry('Some sort of problem when loading page, retrying...'); 
                }
			});
			
			//setTimeout(state_change, 4000);
		} else {
			msg('Paused searching.');
		}
		last_url=url;
	}
	function search_job() {
		if (friends.length == 0 && redo == "") {
			msg(timestamp()+'Done checking all friends for jobs/boosts.'); 
			document.getElementById("play").style.display = 'none';
			document.getElementById("pause").style.display = 'none';
			createCookie("brutus_skip",0);
			document.getElementById('inner_page').removeEventListener('DOMSubtreeModified',state_change,false);
		}
		else if (friends.length == 0 && redo == "checked") {
			friends=savedfriends;
			totalfriends=friends.length;
			done=0;
			skip=0;
			createCookie("brutus_skip",skip);
			cities=validcities;			
			log(timestamp()+'<span class="money">Starting again from the beginning.</span>');
			search_job();
		}
		else if (cities.length == 0) {
			msg(timestamp()+'No more cities to check, done.'); 
			document.getElementById("play").style.display = 'none';
			document.getElementById("pause").style.display = 'none';
		}
		else {
			function f() {
				//if (debug) { log(timestamp()+'old city: '+oldcity); }
				city = cities[0];
				oldcity = city;
				//if (debug) { log(timestamp()+'city: '+city); }
				last_url=help_url(city);
				msg('Checking for '+city+' job/boost from '+friends[0]+' (<a href="'+last_url+'">url</a>)');
				request(help_url(city));
			}
			wait = myRandom(parseInt(wait1),parseInt(wait2));
			pausing(wait,'Waiting for ',f);
			// function f1() {
				// oldboost = boost;
				// boost = boosts[0];
				// last_url=boost_url(boost);
				// msg('Checking for '+boost+(boost=='Achievement'?ach:"")+' boost '+friends[0]+' (<a href="'+last_url+'">url</a>)');
				// request(boost_url(boost));
			// }
			//wait = myRandom(parseInt(wait1),parseInt(wait2));
			//pausing(wait,'Waiting for ',f1);
		}
	}
	function dirtypop() {
		var generator=window.open('','name','height=500,width=500');
		generator.document.write('<html><head><title>Mafia remaining to check</title>');
		generator.document.write('</head><body>');
		generator.document.write('<pre>Number of friends in this list: '+friends.length+'</pre><textarea rows="20">');
		for(i = 0; i < friends.length; i++) {
			generator.document.write(friends[i]+'\n');
		}
		generator.document.write('</textarea><pre><a href="javascript:self.close()">Close</a> the popup.</pre>');
		generator.document.write('</body></html>');
		generator.document.close();
	}
	function log(s) {
		document.getElementById('delay1').value=wait1;
		document.getElementById('delay2').value=wait2;
		document.getElementById('progress').innerHTML = done+' of '+totalfriends+' &nbsp; <span class="more_in">('+(done/totalfriends*100).toFixed(1)+'%)</span>';
		document.getElementById('exp_gained').innerHTML = exp_gained;
		//document.getElementById('debug').innerHTML = 'Debug '+(debug=='true'?"on":"off");
		output = '';
		for (x in jobsdone) {
			if (jobsdone[x] > 0) {
				if (x == 'Cuba') { color = '#E9E9AF'; }
				else if (x == 'Moscow') { color = '#D7C1A7'; }
				else if (x == 'Moscow_Boss') { color = '#D7C1A7'; }
				else if (x == 'Bangkok_Boss') { color = '#FFFFFF'; }
				else { color = '#BCD2EA'; }
				output += '<font color="'+color+'">'+x+': '+jobsdone[x]+'</font>&nbsp;&nbsp;';
			}
		}
		output += 'Total: '+friends_helped;
		document.getElementById('friends_helped').innerHTML = output;
		money_gained='';
		if (ny_gained > 0) { money_gained += '<span class="good">$'+commas(ny_gained)+'</span>  '; }
		if (cuba_gained > 0) { money_gained += ' &nbsp; <span class="good">C$'+commas(cuba_gained)+'</span>  '; }
		if (moscow_gained > 0) { money_gained += ' &nbsp; <span class="good">R$'+commas(moscow_gained)+'</span>  '; }
		if (bangkok_gained > 0) { money_gained += ' &nbsp; <span class="good">B$'+commas(bangkok_gained)+'</span>  '; }
		if (vegas_gained > 0) { money_gained += ' &nbsp; <span class="good">V$'+commas(vegas_gained)+'</span>  '; }
		document.getElementById('money_gained').innerHTML = money_gained;
		document.getElementById('loot').innerHTML=combinedloot;
		var l=document.getElementById('log');
		if (s) {
			 logtrunc(s,log_size,log_keep);
		}
	}
	var Loots=new Array();
	function add_loot(s){
		var f=-1;
		for(var i=0;i<Loots.length&&f==-1;++i) {
			if(Loots[i][0]==s) { f=i; }
		}
		if(f!=-1) { Loots[f][1]++; }
		else { Loots[Loots.length]=new Array(s,1); }
		var t='';
		Loots.sort();
		for(var i=0;i<Loots.length;++i) {
			t+='<span class="good">'+Loots[i][1]+'x</span> '+Loots[i][0]+'<br />';
		}
		combinedloot=t;
	}
	function msg(s) {
			document.getElementById('status').innerHTML=s;
	}
	function commas(s) {
		while (d=/(\d+)(\d{3}.*)/.exec(s)) {
			s = d[1] + ',' + d[2];
		}
		return s;
	}
	function retry(s) {
	  if (retries > 10) {
		msg(s + ', not retrying any more.');
	  }
	  else {
			setTimeout(function(){
				retries++;
				msg(s+'; retry #'+retries+'...');
				request(last_url);
			},5000);
		}
	}
	function mwlink() {
		return '<span class="more_in">[<a href="'+mw_url.replace(/ID/,friends[0])+'">MW</a>]</span>';
	}
	function fblink() {
		return '<span class="more_in">[<a href="'+fb_url+friends[0]+'">FB</a>]</span>';
	}
	function fblink2() {
		return '<a href="'+fb_url+friends[0]+'">'+friends[0]+'</a>';
	}
	function joblink() {
		if (oldcity == "New_York") { return '<span class="more_in">[<a href="'+MWURL+'xw_controller=job&xw_action=give_help&target_id='+friends[0]+'&job_city=1&skip_interstitial=1&skip_req_frame=1">Job link</a>]</span>'; }
		if (oldcity == "Cuba") { return '<span class="more_in">[<a href="'+MWURL+'xw_controller=job&xw_action=give_help&target_id='+friends[0]+'&job_city=2&skip_interstitial=1&skip_req_frame=1">Job link</a>]</span>'; }
		if (oldcity == "Moscow") { return '<span class="more_in">[<a href="'+MWURL+'xw_controller=episode&xw_action=give_help_moscow_social&target_id='+friends[0]+'&job_city=3&skip_interstitial=1&skip_req_frame=1">Job link</a>]</span>'; }
		if (oldcity == "Moscow_Boss") { return '<span class="more_in">[<a href="'+MWURL+'xw_controller=episode&xw_action=claim_boss_bonus&target_id='+friends[0]+'&job_city=3&skip_interstitial=1&skip_req_frame=1">Job link</a>]</span>'; }
		if (oldcity == "Money_Laundry") { return '<span class="more_in">[<a href="'+MWURL+'xw_controller=launder&xw_action=give_help&target_id='+friends[0]+'&job_city=1&job=73&skip_interstitial=1&skip_req_frame=1">Job link</a>]</span>'; }
		if (oldcity == "Bangkok_Boss") { return '<span class="more_in">[<a href="'+MWURL+'xw_controller=story&xw_action=give_help_social&target_id='+friends[0]+'&job_city=4&jobid=22&skip_interstitial=1&skip_req_frame=1">Job link</a>]</span>'; }
		if (oldcity == "Level") { return '<span class="more_in">[<a href="'+MWURL+'xw_controller=index&xw_action=levelup_boost_claim&friend_id='+friends[0]+'&skip_interstitial=1&skip_req_frame=1">Level Boost</a>]</span>'; }
		if (oldcity == "Iced") { return '<span class="more_in">[<a href="'+MWURL+'xw_controller=index&xw_action=iced_boost_claim&friend_id='+friends[0]+'&skip_interstitial=1&skip_req_frame=1">Iced Boost</a>]</span>'; }
		if (oldcity == "Achievement") { return '<span class="more_in">[<a href="'+MWURL+'xw_controller=index&xw_action=ach_celeb&sender='+friends[0]+'&aid='+eval(ach-1)+'&skip_interstitial=1&skip_req_frame=1">Achievement</a>]</span>'; }
		if (oldcity == "Stash") { return '<span class="more_in">[<a href="'+MWURL+'xw_controller=job&xw_action=collect_loot&sender='+friends[0]+'&skip_interstitial=1&skip_req_frame=1">Secret Stash</a>]</span>'; }
		if (oldcity == "Chop") { return '<span class="more_in">[<a href="'+MWURL+'xw_controller=propertyV2&xw_action=cs_help_final&target='+friends[0]+'&building_type=11&skip_interstitial=1&skip_req_frame=1">Chop Shop</a>]</span>'; }
		if (oldcity == "Weapons") { return '<span class="more_in">[<a href="'+MWURL+'xw_controller=propertyV2&xw_action=cs_help_final&target='+friends[0]+'&building_type=12&skip_interstitial=1&skip_req_frame=1">Weapons</a>]</span>'; }
		if (oldcity == "Robbery") { return '<span class="more_in">[<a href="'+MWURL+'xw_controller=robbing&xw_action=mastery_bonus&target='+friends[0]+'&skip_interstitial=1&skip_req_frame=1">Robbery</a>]</span>'; }
		if (oldcity == "Vegas") { return '<span class="more_in">[<a href="'+MWURL+'xw_controller=story&xw_action=give_help_social&target_id='+friends[0]+'&job_city=5">Vegas</a>]</span>'; }
		//if (oldcity == "Get_Loot") { return '<span class="more_in">[<a href="'+MWURL+'xw_controller=story&xw_action=give_help_social&target_id='+friends[0]+'&job_city=5">Get Loot</a>]</span>'; }

	}
	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10))
	}
	function help_url(c) {
		if (c == "New_York") { return 'html_server.php?xw_controller=job&xw_action=give_help&target_id='+friends[0]+'&job_city=1'; }
		if (c == "Cuba") { return 'html_server.php?xw_controller=job&xw_action=give_help&target_id='+friends[0]+'&job_city=2'; }
		if (c == "Moscow") { return 'html_server.php?xw_controller=episode&xw_action=give_help_moscow_social&target_id='+friends[0]+'&job_city=3&friend='+friends[0]; }
		if (c == "Moscow_Boss") { return 'html_server.php?xw_controller=story&xw_action=claim_boss_bonus&target_id='+friends[0]+'&job_city=3&friend='+friends[0]; }
		if (c == "Money_Laundry") { return 'html_server.php?xw_controller=launder&xw_action=give_help&target_id='+friends[0]+'&job_city=1&job=73'; }
		if (c == "Bangkok_Boss") { return 'html_server.php?xw_controller=story&xw_action=claim_boss_bonus&target_id='+friends[0]+'&job_city=4&job_id=79'; }
		if (c == "Vegas") { return 'html_server.php?xw_controller=story&xw_action=give_help_social&target_id='+friends[0]+'&job_city=5'; }
		if (c == "Level") { return 'html_server.php?xw_controller=index&xw_action=levelup_boost_claim&friend_id='+friends[0]+'&friend='+friends[0]; }
		if (c == "Iced") { return 'html_server.php?xw_controller=index&xw_action=iced_boost_claim&friend_id='+friends[0]; }
		if (c == "Achievement") { return 'html_server.php?xw_controller=index&xw_action=ach_celeb&sharer='+friends[0]+'&aid='+ach; }
		//if (c == "Stash") { return 'html_server.php?xw_controller=job&xw_action=collect_loot&sender='+friends[0]+'&time='+unix_timestamp()+'&friend='+friends[0]+'&cb='+cb+'&xw_client_id=8&ajax=1&liteload=1&sf_xw_user_id='+userid+'&sf_xw_sig='+local_xw_sig; }
		if (c == "Stash") { return 'html_server.php?xw_controller=job&xw_action=collect_loot&sender='+friends[0]+'&install_source=newsfeed&sendtime='+ts+'&time='+ts+'&friend='+friends[0]; }
		//if (c == "Stash") { return 'html_server.php?xw_controller=fight&xw_action=collect_fight_loot&loot_time='+unix_timestamp()+'&friend='+friends[0]+'&cb='+cb+'&xw_client_id=8&ajax=1&liteload=1&sf_xw_user_id='+userid+'&sf_xw_sig='+local_xw_sig; }
		if (c == "Chop") { return 'html_server.php?xw_controller=propertyV2&xw_action=cs_help_final&target='+friends[0]+'&building_type=11'; }
		if (c == "Weapons") { return 'html_server.php?xw_controller=propertyV2&xw_action=cs_help_final&target='+friends[0]+'&building_type=12'; }
		if (c == "Robbery") { return 'html_server.php?xw_controller=robbing&xw_action=mastery_bonus&target='+friends[0]; }
		//if (c == "New_York") { return 'remote/html_server.php?xw_controller=job&xw_action=give_help&target_id='+friends[0]+'&job_city=1'; }
		//if (c == "Cuba") { return 'remote/html_server.php?xw_controller=job&xw_action=give_help&target_id='+friends[0]+'&job_city=2'; }
		//if (c == "Moscow") { return 'remote/html_server.php?xw_controller=episode&xw_action=give_help_moscow_social&target_id='+friends[0]+'&job_city=3&friend='+friends[0]; }
		//if (c == "Moscow_Boss") { return 'remote/html_server.php?xw_controller=story&xw_action=claim_boss_bonus&target_id='+friends[0]+'&job_city=3&job_id=86'; }
		//if (c == "Money_Laundry") { return 'remote/html_server.php?xw_controller=launder&xw_action=give_help&target_id='+friends[0]+'&job_city=1&job=73'; }
		//if (c == "Bangkok_Boss") { return 'remote/html_server.php?xw_controller=story&xw_action=claim_boss_bonus&target_id='+friends[0]+'&job_city=4&job_id=37'; }
		//if (c == "Level") { return 'remote/html_server.php?xw_controller=index&xw_action=levelup_boost_claim&friend_id='+friends[0]+'&friend='+friends[0]; }
		//if (c == "Iced") { return 'remote/html_server.php?xw_controller=index&xw_action=iced_boost_claim&friend_id='+friends[0]; }
		//if (c == "Achievement") { return 'remote/html_server.php?xw_controller=index&xw_action=ach_celeb&sharer='+friends[0]+'&aid='+ach+'&skip_interstitial=1'; }
		//if (c == "Stash") { return 'remote/html_server.php?xw_controller=job&xw_action=collect_loot&sender='+friends[0]+'&install_source=newsfeed&friend='+friends[0]; }
		//if (c == "Chop") { return 'remote/html_server.php?xw_controller=propertyV2&xw_action=cs_help_final&target='+friends[0]+'&building_type=11&skip_interstitial=1'; }
		//if (c == "Weapons") { return 'remote/html_server.php?xw_controller=propertyV2&xw_action=cs_help_final&target='+friends[0]+'&building_type=12&skip_interstitial=1'; }
		//if (c == "Robbery") { return 'remote/html_server.php?xw_controller=robbing&xw_action=mastery_bonus&target='+friends[0]+'&skip_interstitial=1'; }
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
	function timestamp() {
		now = new Date();
		var CurH = now.getHours();
		CurH = (CurH<10?"0"+CurH:CurH);
		var CurM = now.getMinutes();
		CurM = (CurM<10?"0"+CurM:CurM);
		return '<span class="more_in">['+CurH+':'+CurM+']</span> ';
	}	
	var expnow,expnext,stamina,energy,ratiolvl3;
	function stats_ratios(s) {
		if (/user_info_update/.test(s)) { var s=s.substr(0,s.indexOf('user_info_update')); }
		document.getElementById('user_cash_nyc').innerHTML = /user_cash_nyc.*?"(.*?)"/.exec(s)[1];
		document.getElementById('user_cash_cuba').innerHTML = /user_cash_cuba.*?"(.*?)"/.exec(s)[1];
		document.getElementById('user_cash_moscow').innerHTML = /user_cash_moscow.*?"(.*?)"/.exec(s)[1];
		document.getElementById('user_cash_bangkok').innerHTML = /user_cash_bangkok.*?"(.*?)"/.exec(s)[1];
		document.getElementById('user_cash_vegas').innerHTML = /user_cash_vegas.*?"(.*?)"/.exec(s)[1];
		expnow = parseInt(/user_experience.*?(\d+)/.exec(s)[1]);
		expnext = parseInt(/exp_for_next_level.*?(\d+)/.exec(s)[1]);
		expneed = eval(expnext-expnow);

		if (document.getElementById('exp_to_next_level')) {
			document.getElementById('exp_to_next_level').innerHTML = expneed;
		}
		else {
			document.getElementById('user_experience').innerHTML = expnow;
			document.getElementById('exp_for_next_level').innerHTML = expnext;
		}	
		
		energy = parseInt(/user_energy.*?(\d+)/.exec(s)[1]);
		document.getElementById('user_energy').innerHTML = energy;
		stamina = parseInt(/user_stamina.*?(\d+)/.exec(s)[1]);
		document.getElementById('user_stamina').innerHTML = stamina;
		
		ratiolvl=eval(expneed/energy);
		ratiolvl2=eval(expneed/stamina);
		ratiolvl3=eval(expneed/(parseInt(energy)+parseInt(stamina)));
		(Math.abs(ratiolvl)<5)?(d=2):(d=0);
		(Math.abs(ratiolvl2)<5)?(d2=2):(d2=0);
		(Math.abs(ratiolvl3)<5)?(d3=2):(d3=0);
		if(ratiolvl=='Infinity') { ratiolvl=0; d=0; }
		if(ratiolvl2=='Infinity') { ratiolvl2=0; d2=0; }
		if(ratiolvl3=='Infinity') { ratiolvl3=0; d3=0; }
		
		if (document.getElementById('exp_to_next_level')) {
			document.getElementsByClassName('experience')[0].innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
			document.getElementById('level_bar').style.width = /percent_complete.*?(\d+)/.exec(s)[1]+'%';
		}
		else {
			document.getElementById('user_experience').innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
			document.getElementById('level_bar_new_header').style.width = /percent_complete.*?(\d+)/.exec(s)[1]+'%';
		}
		
		//document.getElementById('user_stats').getElementsByClassName('experience')[0].innerHTML='Exp Need: <span class="energy_highlight">'+expneed+'</span><br>(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">)<span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
	}
	function state_change(s) {
		currentPageCount = pageCount;
		//document.getElementById('inner_page').removeEventListener('DOMSubtreeModified',state_change,false);
		//s='';
		m=[];
		xp=0;
		ca=0;
		loot='';
		try {
			local_xw_sig = /local_xw_sig = '([a-f0-9]+)'/.exec(s)[1]; 
				if (/loot_confirmed=yes.*?incnt_choice/.test(s)) {
					sclick=s.substr(s.indexOf('<table class="messages"'));
					sclick=sclick.substr(0,sclick.indexOf('</table'));
					//console.log(sclick);
					if (button=/(xw_controller=(story|index|robbing|launder|propertyV2|war|fight|job|episode).*?loot_confirmed=yes.*?incnt_choice=(.*?))['"]/.exec(sclick)) {
						//console.log(button[1].replace('http://facebook.mafiawars.com/mwfb/',''));
						//request('remote/html_server.php?'+button[1]);
						wait = myRandom(parseInt(wait1), parseInt(wait2));
						pausing(wait, 'Loading the real url in...',function() { request('html_server.php?'+button[1]) });
					}
					else {
						check_next();
					}
				}
				else {
					stats_ratios(s);
					createCookie("brutus_skip",parseInt(skip+done));
					//s = xmlHTTP.responseText;
					//try { s = document.getElementsByClassName('message_body')[0].innerHTML; }
					//catch (messerr) {
						//try { s = document.getElementById('message_box_container').innerHTML; }
						//catch (messerr2) {
							//this is where the bookmarklet stalls 2009-12-17
							//for some reason checks load the job page without the message_body box
							//if (debug) { log('No job/boost info found? message_body was not avalible.'); }
							//return;
							//log(timestamp()+'Friend caused trouble, skipping. ID: '+friends[0]+' '+mwlink()+fblink()+joblink());
							//done++;
							//cities=validcities;
							//console.log('Error '+messerr2);
							//friends=friends.slice(1);
							//search_job();
						//}
						//return;
					//}
					//console.log(s);
					//if (result=/<td class="message_body">(.*?)<\/td>/.exec(s)) { console.log(result[1]+' '+local_xw_sig); }
					// chop off the Facebook stuff from the beginning, from Vern's DoJobs http://vern.com/mwtools/
					//if (/<div id="mainDiv">/.test(s)) { s=s.substr(s.indexOf('<div id="mainDiv">')); }
					//delete xmlHTTP['onreadystatechange'];
					if (m=/You\s+(earned|gained|received|collected)\s+(some|a|an)\s+(.+?)\s+from/.exec(s)) {
						if (!loot) {
							loot = '. Loot: ';
						}
						loot+=m[3]+', ';
						add_loot(m[3]);
						loot=loot.slice(0,loot.length-2);
						log(timestamp()+'Gained item: '+m[3]);
					}
					else if (m = /you were given (some|a|an) (.+?)\./.exec(s)) {
						loot+=m[2]+', ';
						add_loot(m[2]);
						loot=loot.slice(0,loot.length-2);
						log(timestamp()+'Gained item: '+m[2]);
					}
					else if (m=/You got a bonus in celebration.*money">(R?C?)(\$[\d,]+)/.exec(s)) {
						log('Received '+m[1]+m[2]+' from '+friends[0]+' achievement '+ach);
						//if (m[3]) { addloot(m[3]); }
					}
					else if (m=/You got a bonus in celebration.*money">(R?C?)(\$[\d,]+).*>(\d+) ?Experience<\/div>/.exec(s)) {
						log('Received '+m[1]+m[2]+' and '+m[3]+' exp');
					}
					else if (/achievements up to 10 times per day/.test(s)) {
						if (debug) { log('Sorry, you can only celebrate friends achievements up to 10 times per day, try again tomorrow! '+joblink()); }
						//Sorry, you can only celebrate friends' achievements up to 10 times per day, try again tomorrow!
						validcities.splice(validcities.indexOf(city),1);
						timestamp();
						ach=53;
						log(timestamp()+'<span class="bad">'+city+' boost limit reached</span>, not checking for more of those. '+joblink());
					}
					else if (m=/You have been awarded the (.*?)\./.exec(s)) {
						loot='';
						loot+=m[1];
					}
					if (m=/your cut: ([$\d,]+)/.exec(s)) {
						friends_helped++;
						ca=m[1].replace(/[^0-9]/g,'');
						if(/C\$/.test(m[1])) {
							sign="C$";
							cuba_gained+=parseInt(ca);
							//launder++;
						} 
						else if(/R\$/.test(m[1])) {
							sign="R$";
							moscow_gained+=parseInt(ca);
							//launder++;
						}
						else if(/B\$/.test(m[1])) {
							sign="B$";
							bangkok_gained+=parseInt(ca);
							//launder++;
						}
						else if(/V\$/.test(m[1])) {
							sign="V$";
							vegas_gained+=parseInt(ca);
							//launder++;
						}
						else {
							sign='$';
							ny_gained+=parseInt(ca);
							//launder++;
						}
						jobsdone[oldcity]++;
						log(timestamp()+'Helped '+friends[0]+' with Money Laundry. Your cut was <strong class="money">'+sign+commas(ca)+'</strong>. '+loot);
					}
					else if(m=/You received (.*?) experience point.*? and (.*?) for helping (.*?) complete the job/.exec(s)) {
						friends_helped++;
						xp=m[1].replace(/[^0-9]/g,'');
						exp_gained+=parseInt(xp);
						ca=m[2].replace(/[^0-9]/g,'');
						if(/C\$/.test(m[2])) {
							sign="C$";
							cuba_gained+=parseInt(ca);
							//cuba++;
						} 
						else if(/R\$/.test(m[2])) {
							sign="R$";
							moscow_gained+=parseInt(ca);
							//moscow++;
						}
						else if(/B\$/.test(m[2])) {
							sign="B$";
							bangkok_gained+=parseInt(ca);
							//launder++;
						}
						else if(/V\$/.test(m[2])) {
							sign="V$";
							vegas_gained+=parseInt(ca);
							//launder++;
						}
						else {
							sign='$';
							ny_gained+=parseInt(ca);
							//ny++;
						}
						jobsdone[oldcity]++;
						log(timestamp()+'Helped '+m[3]+' '+(oldcity == 'Moscow_Boss'?"with ":"in ")+oldcity+'. Received <span class="good">'+xp+' xp</span> and <strong class="money">'+sign+commas(ca)+'</strong>. '+loot);
					}
					else if(m=/You received (.*?) experience point.*? and (.*?) for helping (.*?)<\/a>\./.exec(s)) {
						friends_helped++;
						xp=m[1].replace(/[^0-9]/g,'');
						exp_gained+=parseInt(xp);
						ca=m[2].replace(/[^0-9]/g,'');
						if(/C\$/.test(m[2])) {
							sign="C$";
							cuba_gained+=parseInt(ca);
							//cuba++;
						} 
						else if(/R\$/.test(m[2])) {
							sign="R$";
							moscow_gained+=parseInt(ca);
							//moscow++;
						}
						else if(/B\$/.test(m[2])) {
							sign="B$";
							bangkok_gained+=parseInt(ca);
							//launder++;
						}
						else if(/V\$/.test(m[2])) {
							sign="V$";
							vegas_gained+=parseInt(ca);
							//launder++;
						}
						else {
							sign='$';
							ny_gained+=parseInt(ca);
							//ny++;
						}
						jobsdone[oldcity]++;
						log(timestamp()+'Helped '+m[3]+'</a> '+(oldcity == 'Moscow_Boss'?"with ":"in ")+oldcity+'. Received <span class="good">'+xp+' xp</span> and <strong class="money">'+sign+commas(ca)+'</strong>. '+loot);
						if ((jobsdone[oldcity] == 25) && (oldcity == 'New_York')) {
							validcities.splice(validcities.indexOf(oldcity),1);
							log(timestamp()+'<span class="bad">'+oldcity+' limit reached</span>, not checking for more jobs there. '+joblink());
						}
						if ((jobsdone[oldcity] == 25) && (oldcity == 'Cuba')) {
							validcities.splice(validcities.indexOf(oldcity),1);
							log(timestamp()+'<span class="bad">'+oldcity+' limit reached</span>, not checking for more jobs there. '+joblink());
						}
						if ((jobsdone[oldcity] == 25) && (oldcity == 'Moscow')) {
							validcities.splice(validcities.indexOf(oldcity),1);
							log(timestamp()+'<span class="bad">'+oldcity+' limit reached</span>, not checking for more jobs there. '+joblink());
						}
						if ((jobsdone[oldcity] == 25) && (oldcity == 'Moscow_Boss')) {
							validcities.splice(validcities.indexOf(oldcity),1);
							log(timestamp()+'<span class="bad">'+oldcity+' limit reached</span>, not checking for more jobs there. '+joblink());
						}
						if ((jobsdone[oldcity] == 25) && (oldcity == 'Bangkok_Boss')) {
							validcities.splice(validcities.indexOf(oldcity),1);
							log(timestamp()+'<span class="bad">'+oldcity+' limit reached</span>, not checking for more jobs there. '+joblink());
						}
						if ((jobsdone[oldcity] == 25) && (oldcity == 'Vegas')) {
							validcities.splice(validcities.indexOf(oldcity),1);
							log(timestamp()+'<span class="bad">'+oldcity+' limit reached</span>, not checking for more jobs there. '+joblink());
						}
					}
					else if (m=/You helped (.*?) on the (.*?) job and received (.*?)\./.exec(s)) {
						if (debug) { log('You helped '+m[1]+' with '+m[2]+' and got '+m[3]+' '+joblink()); }
						ca=m[3].replace(/[^0-9]/g,'');
						if(/C\$/.test(m[3])) {
							sign='C$';
							cuba_gained+=parseInt(ca);
						} 
						else if(/R\$/.test(m[3])) {
							sign='R$';
							moscow_gained+=parseInt(ca);
						}
						else if(/B\$/.test(m[3])) {
							sign="B$";
							bangkok_gained+=parseInt(ca);
						}
						else if(/V\$/.test(m[3])) {
							sign="V$";
							vegas_gained+=parseInt(ca);
						}
						else {
							sign='$';
							ny_gained+=parseInt(ca);
						}
						jobsdone['Late']++;
						//late++;
						//log(timestamp()+'Too late to help '+m[1]+' in '+city+' but received <span class="good">'+sign+ca+'</span> for the offer.');
						log();
					}
					else if (m=/You are too late to help on this job, but (.*?) thanks you for your offer with (.*?)\./.exec(s)) {
						if (debug) { log(timestamp()+'You are too late to help '+m[1]+' got '+m[2]+' '+joblink()); }
						ca=m[2].replace(/[^0-9]/g,'');
						if(/C\$/.test(m[2])) {
							sign='C$';
							cuba_gained+=parseInt(ca);
						} 
						else if(/R\$/.test(m[2])) {
							sign='R$';
							moscow_gained+=parseInt(ca);
						}
						else if(/B\$/.test(m[2])) {
							sign="B$";
							bangkok_gained+=parseInt(ca);
						}
						else if(/V\$/.test(m[2])) {
							sign="V$";
							vegas_gained+=parseInt(ca);
						}
						else {
							sign='$';
							ny_gained+=parseInt(ca);
						}
						jobsdone['Late']++;
						//late++;
						//log(timestamp()+'Too late to help '+m[1]+' in '+city+' but received <span class="good">'+sign+ca+'</span> for the offer.');
						log();
					}
					else if (/No pending loot found/.test(s)) {
						if (debug) { log(timestamp()+'No pending loot found '+joblink()); }
						log();
					}
					else if (/but you already helped out/.test(s)) {
						if (debug) { log(timestamp()+'You have already helped '+joblink()); }
						log();
					}
					else if (/already helped/.test(s)) {
						if (debug) { log(timestamp()+'You have already helped '+joblink()); }
						log();
					}
					else if (/You are too late/.test(s)) {
						if (debug) { log(timestamp()+'You are too late '+joblink()); }
						log();
					}
					else if (/already laundered too much money today/.test(s)) {
						validcities.splice(validcities.indexOf(oldcity),1);
						log(timestamp()+'<span class="bad">'+oldcity+' limit reached</span>, not checking for more of those. '+joblink());
					}
					else if (/you can only help 25 friends per day per city/.test(s)) {
						if ((oldcity == 'Moscow') || (oldcity == 'Moscow_Boss')) {
							validcities.splice(validcities.indexOf('Moscow'),1);
							validcities.splice(validcities.indexOf('Moscow_Boss'),1);
							log(timestamp()+'<span class="bad">Moscow limit reached</span>, not checking for more jobs there. '+joblink());
						}
						else {
							validcities.splice(validcities.indexOf(oldcity),1);
							log(timestamp()+'<span class="bad">'+oldcity+' limit reached</span>, not checking for more jobs there. '+joblink());
						}
					}
					else if (/Boss Fight/.test(s)) {
						if (debug) { log(timestamp()+'Boss fight page loaded for some reason, skipping friend. '+joblink()); }
						done++;
						friends=friends.slice(1);
					}  
					else if (/been laundered and is all clean/.test(s)) {
						if (debug) { log(timestamp()+'Money already cleaned '+joblink()); }
						log();
					}
					else if (/Job information not found/.test(s)) {
						if (debug) { log(timestamp()+'No active Money Laundry job '+joblink()); }
						log();
					}
					else if (/You can only help launder your friends/.test(s)) {
						log(timestamp()+'err1: Not a Facebook friend or not a MW player. ID: '+friends[0]+' '+mwlink()+fblink()+joblink());
						done++;
						friends=friends.slice(1);
					}
					else if (/You cannot help people who are not your friends/.test(s)) {
						log(timestamp()+'err2: Not a Facebook friend or not a MW player. ID: '+friends[0]+' '+mwlink()+fblink()+joblink());
						done++;
						friends=friends.slice(1);
					}
					else if (/You need to be friends with (.+?) to provide help/.test(s)) {
						log(timestamp()+'err3: Not a Facebook friend or not a MW player. ID: '+friends[0]+' '+mwlink()+fblink()+joblink());
						friends=friends.slice(1);
						done++;
					}
					else if (/Friend not found/.test(s)) {
						log(timestamp()+'err4: Not a Facebook friend or not a MW player. ID: '+friends[0]+' '+mwlink()+fblink()+joblink());
						friends=friends.slice(1);
						done++;
					}
					else if (/Player not found/.test(s)) {
						log(timestamp()+'err5: Not a Facebook friend or not a MW player. ID: '+friends[0]+' '+mwlink()+fblink()+joblink());
						friends=friends.slice(1);
						done++;
					}
					else if (/Here on the island they only use Cuban/.test(s)) {
						if (debug) { log(timestamp()+'Cuba job page loaded for some reason, skipping friend. '+joblink()); }
						done++;
						friends=friends.slice(1);
					}
					else if (/Stay tuned for more Moscow action/.test(s)) {
						if (debug) { log(timestamp()+'Moscow job page randomly loaded. '+joblink()); }
						done++;
						friends=friends.slice(1);
					}  
					else if (/we earn rubles from our criminal dealings/.test(s)) {
						if (debug) { log(timestamp()+'Moscow job page randomly loaded. '+joblink()); }
						done++;
						friends=friends.slice(1);
					}  				
					else if (/Error while loading page from/.test(s)) {
						if (debug) { log(timestamp()+'Kinks error: '+last_url); }
						msg('<span class="bad">[Kinks error]</span> Mafia Wars overloaded, waiting 30 seconds... (<a href="'+last_url+'">url</a>)');
						setTimeout(function(){ request(last_url); },30000);
						return;
					}
					else if (/<h2 class="main_message">500<\/h2>/.test(s)) {
						if (debug) { log(timestamp()+'Error 500: '+last_url); }
						msg('<span class="bad">[Error 500]</span> Mafia Wars overloaded, waiting 30 seconds... (<a href="'+last_url+'">url</a>)');
						setTimeout(function(){ request(last_url); },30000);
						return;
					}
					else if (/404 Error/.test(s)) {
						if (debug) { log(timestamp()+'404 response when helping '+friends[0]+' in '+oldcity+'. '+joblink()); }
						retry('404 response when helping '+friends[0]+' in '+oldcity+'. (<a href="'+last_url+'">url</a>)');
						//done++;
						//friends=friends.slice(1);
						return;
					}
					// else if (/top.location.*?=.*?"http:\/\/apps.facebook.com\/inthemafia\/(.*?)"/.test(s)) {
						// msg('Session has expired, you need to reload the game and start over.');
						// log(timestamp()+'<span class="bad">Session has expired.</span> <a href="#" id="dirtypop">Popup</a> with remaining friends. ');
						// document.getElementById("pause").style.display = 'none';
						// document.getElementById("play").style.display = 'none';				
						// return;
					// }
					// else if (/top.location.*?=.*?"http.*?facebook.com\/login.php.*?api_key=([a-zA-z0-9]+)/.test(s)) {
						// msg('Session has expired, you need to reload the game and start over.');
						// log(timestamp()+'<span class="bad">Session has expired.</span> <a href="#" id="dirtypop">Popup</a> with remaining friends. ');
						// document.getElementById("pause").style.display = 'none';
						// document.getElementById("play").style.display = 'none';				
						// return;
					// }
					else if (/Your session has timed out/.test(s)) {
						msg('Session has expired, you need to reload the game and start over.');
						log(timestamp()+'<span class="bad">Session has expired.</span> <a href="#" id="dirtypop">Popup</a> with remaining friends. ');
						//document.getElementById("dirtypop").onclick=dirtypop(friends);
						document.getElementById("pause").style.display = 'none';
						document.getElementById("play").style.display = 'none';				
						return;
					}
					retries = 0;
					//console.log(cities);
					if ((city == 'Achievement') && (cities.length == 1)) {
						if (ach < 62) {
							ach++;
						}
						else {
							cities=validcities;
							done++;
							friends=friends.slice(1);
							ach=1;
						}
					}
					else if (cities.length > 1) {
						cities=cities.slice(1);
					}
					else {
						cities=validcities;
						done++;
						friends=friends.slice(1);
					}
					log();
					search_job();					
				}
		}
		catch (ignoree) { 
			log(timestamp()+ignoree+' error when loading page, retry #'+retries);
			retry('Some sort of problem when loading page, retrying...'); 
		}
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
	pageTracker._trackPageview("/script/BrutusHelper"); 
	} catch(err) {}
	//end analytics

	} //end try
	catch(mainerr) {
		var spock_div=document.getElementById('spockdiv');
		if(spock_div) {
			spock_div.innerHTML='';
		}
		alert('Some error occured, Brute Helper not loaded.\nDid you run it on your gift page or unframed MW page?\nIf you did, report the message below (NOT THIS TEXT) to Spockholm:\n\n'+version+'\n'+mainerr);
	}
}())