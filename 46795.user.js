// ==UserScript==
// @name           Awesomer Chat
// @namespace      studyjapanese.org
// @include        http://www.studyjapanese.org/*
// @include        http://www.studyjapanese.org/component/shoutbox?mode=getshouts&jal_lastID=999999999*
// ==/UserScript==

// taken from the script "Learning Time on iKnow!" by idojun
// http://userscripts.org/scripts/show/37822
function getElementsByXPath(xpath, node) {
	var node = node || document;
	var doc = node.ownerDocument ? node.ownerDocument : node;
	var nodesSnapshot = doc.evaluate(xpath, node, null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var data = [];
	for (var i=0; i<nodesSnapshot.snapshotLength; i++) {
		data.push(nodesSnapshot.snapshotItem(i));
	}
	return data;
};

var script_version = "1.30";

var last_id=0;
var lyearv =0;
var lmonthv=0;
var ldayv=0;
var showseconds=false;
var chrows = [];
var d_container = null;
var jalUserName = false;
var jalUrl = false;
var poll_interval = 3000;
var error_interval = 1000;
var ignore_list = [];
var ignore_message_list = [];
var alternate_colors = false;
var alternate_color_list = [];
var alternate_part = 0;
var alternate_bg = true;
var alternate_bg_default = ['#F0F0F0', '#E8E8E8'];
var alternate_bg_list = alternate_bg_default;
var alternate_bg_part = 0;
var infotext_color = "blue";
var auto_lower = false;
var max_messages = 1000;
var nav_tbl = null;
var usr_tbl = null;
var nav_btns = [];
var list_of_users = [];
var nav_panes = [];
var active_pane = 0;
var users_table = null;
var utbody = null;
var u_container = null;
var is_away = false;
var away_message = "";
var aliases = [];
var usertext_color = "green";

//FONTADD - Var
var user_font = "";

var ungraphic_emotes = false;
var _emotes = [];
_emotes.push([':D', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_biggrin.gif" alt="Very Happy" class="yvSmiley"/>']);
_emotes.push([':)', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_smile.gif" alt="Smile" class="yvSmiley"/>']);
_emotes.push([';)', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_wink.gif" alt="Wink" class="yvSmiley"/>']);
_emotes.push([':(', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_sad.gif" alt="Sad" class="yvSmiley"/>']);
_emotes.push([':o', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_surprised.gif" alt="Surprised" class="yvSmiley"/>']);
_emotes.push([':shock:', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_eek.gif" alt="Shocked" class="yvSmiley"/>']);
_emotes.push([':?', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_confused.gif" alt="Confused" class="yvSmiley"/>']);
_emotes.push(['8-)', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_cool.gif" alt="Cool" class="yvSmiley"/>']);
_emotes.push([':lol:', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_lol.gif" alt="Laughing" class="yvSmiley"/>']);
_emotes.push([':x', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_mad.gif" alt="Mad" class="yvSmiley"/>']);
_emotes.push([':p', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_razz.gif" alt="Razz" class="yvSmiley"/>']);
_emotes.push([':oops:', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_redface.gif" alt="Embarrassed" class="yvSmiley"/>']);
_emotes.push([':cry:', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_cry.gif" alt="Crying or Very Sad" class="yvSmiley"/>']);
_emotes.push([':evil:', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_evil.gif" alt="Evil or Very Mad" class="yvSmiley"/>']);
_emotes.push([':twisted:', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_twisted.gif" alt="Twisted Evil" class="yvSmiley"/>']);
_emotes.push([':roll:', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_rolleyes.gif" alt="Rolling Eyes" class="yvSmiley"/>']);
_emotes.push([':!:', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_exclaim.gif" alt="Exclamation" class="yvSmiley"/>']);
_emotes.push([':?:', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_question.gif" alt="Question" class="yvSmiley"/>']);
_emotes.push([':idea:', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_idea.gif" alt="Idea" class="yvSmiley"/>']);
_emotes.push([':arrow:', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_arrow.gif" alt="Arrow" class="yvSmiley"/>']);
_emotes.push([':|', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_neutral.gif" alt="Neutral" class="yvSmiley"/>']);
_emotes.push([':mrgreen:', '<img src="http://www.studyjapanese.org/plugins/system/yvsmiley/phpbb/icon_mrgreen.gif" alt="Mr. Green" class="yvSmiley"/>']);

var separator_text = "|#%|";

var rec_poller = null;
var poll_error_state = false;

var rc_flipflop = false;
var last_rcpoll;
var rchat_xhr;
function receive_chat(){
	try{
		if(rec_poller){ clearTimeout(rec_poller); }
	}catch(ex){}
	last_rcpoll = new Date();
	
	if((new Date() - last_rpoll) > (2000*60)){
		user_poller = setTimeout(continualy_refresh_users, 0);
	}

	var randnum = Math.floor(Math.random()*1000000);
	// var rurl = "http://www.studyjapanese.org/?mode=getshouts&jal_lastID=" + last_id + "&rand=" + randnum;
	var rurl = "http://www.studyjapanese.org/component/shoutbox?mode=getshouts&jal_lastID=" + last_id + "&rand=" + randnum;
	
	// sample piece of receive
	// 184410|#%|some_user|#%|some_message|#%|0 minutes ago|#%||#%|1239812380|#%|
	
	rchat_xhr = new XMLHttpRequest();
	rchat_xhr.open("GET", rurl, true);
	rchat_xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status != 200){
			if(!poll_error_state){
				poll_error_state=true;
				display_chat_message("- - -", "error", "connection lost: " + this.status, true);
			}
			try{
				if(rec_poller){ clearTimeout(rec_poller); }
			}catch(ex){}
			rec_poller = setTimeout(receive_chat, poll_interval);
			return;
		}
		
		if(this.readyState == 4 && this.status == 200) {
			if(poll_error_state){
				display_chat_message("- - -", "notice", "connection restored", true);
				poll_error_state = false;
			}
			
			if(rc_flipflop){
				document.getElementById("rc_indicator").style.backgroundColor = "#CCCCCC";
			}else{
				document.getElementById("rc_indicator").style.backgroundColor = "#FFFFFF";
			}
			
			rc_flipflop = !rc_flipflop;
	
			try{
				var rtext = rchat_xhr.responseText;
				
				var rts = rtext.split(separator_text);
				
				var r_pos = 0;
				while(r_pos < rts.length-1){
					var r_num = parseInt(rts[r_pos],10);
					if(r_num > last_id){ last_id = r_num; }
					
					var user_name = rts[r_pos + 1];
					var sent_text = rts[r_pos + 2];
					var how_long_ago = rts[r_pos + 3];
					var reserved_field = rts[r_pos + 4];
					var time_stamp = parseInt(rts[r_pos + 5],10);
					
					
					if(time_stamp < 10000000 || isNaN(time_stamp)){
						display_chat_message("- - -", "info", "desync", true);
						r_pos++;
						
						while(r_pos < rts.length-5 && (time_stamp < 10000000 || isNaN(time_stamp))){
							r_pos++;
							time_stamp = parseInt(rts[r_pos + 5],10);
						}
						
						if(time_stamp < 10000000 || isNaN(time_stamp)){
							r_pos = rts.length;
							continue;
						}
						
						user_name = rts[r_pos + 1];
						sent_text = rts[r_pos + 2];
						how_long_ago = rts[r_pos + 3];
						reserved_field = rts[r_pos + 4];
					}
					
					try{
						var found_user = false;
						for(var i=0; i < list_of_users.length; i++){
							if(user_name == list_of_users[i]){
								found_user = true;
							}
						}
						// user wasn't in the list, search for a partial match at the beginning
						if(!found_user){
							for(var i=0; i < list_of_users.length; i++){
								if(list_of_users[i].substring(0, user_name.length) == user_name){
									user_name = list_of_users[i];
								}
							}
						}
					}catch(ex){}
					
					try{
						if(auto_lower){
							sent_text = sent_text.toLowerCase();
						}
					}catch(ex){}
					
					var do_ignore = false;
					for(var m=0; m<ignore_list.length; m++){
						if(ignore_list[m] == user_name){
							do_ignore = true;
						}
					}
					
					for(var m=0; m<ignore_message_list.length; m++){
						if(ignore_message_list[m]){
							if(sent_text.indexOf(ignore_message_list[m]) > -1){
								do_ignore = true;
							}
						}
					}
					
					if(do_ignore){
						r_pos += 6;
						continue;
					}
					
					time_stamp *= 1000;
					
					var msg_time = new Date(time_stamp);
					
					var m_hours = msg_time.getHours();
					if(m_hours.toString().length == 1){
						m_hours = "0" + m_hours;
					}
					var m_mins = msg_time.getMinutes();
					if(m_mins.toString().length == 1){
						m_mins = "0" + m_mins;
					}
					var m_seconds = msg_time.getSeconds();
					if(m_seconds.toString().length == 1){
						m_seconds = "0" + m_seconds;
					}
					
					datestr = + m_hours + ":" + m_mins;
					
					if(ungraphic_emotes){
						for(var i=0; i<_emotes.length; i++){
							var j=sent_text.indexOf(_emotes[i][1]);
							while(j > -1){
								sent_text = sent_text.replace(_emotes[i][1], _emotes[i][0]);
								j=sent_text.indexOf(_emotes[i][1]);
							}
						}
					}
					
					display_chat_message(datestr, user_name, sent_text);
					
					r_pos += 6;
				}

			}catch(ex){}

			try{
				if(rec_poller){ clearTimeout(rec_poller); }
			}catch(ex){}

			rec_poller = setTimeout(receive_chat, poll_interval);
		}
	}
	rchat_xhr.onerror = function(){
		if(!poll_error_state){
			poll_error_state = true;
			display_chat_message("- - -", "error", "connection lost", true);
		}
		rec_poller = setTimeout(receive_chat, poll_interval);
	}
	
	rchat_xhr.send(null);
}

function receive_chat_keepalive(){
	rchatka = 60000;
	
	if((new Date() - last_rcpoll) > rchatka){
		try{
			rchat_xhr.abort();
		}catch(ex){}
	}
	
	setTimeout(receive_chat_keepalive, rchatka);
}

function klikfn(evt){
	var tid = evt.target.id.toString();
	if(tid.length < 4){return;}
	
	tid = parseInt(tid.substring(3,tid.length),10);
	if(isNaN(tid)){return;}

	switch_nav(tid);
}

function switch_nav(tid){
	nav_panes[active_pane].style.display = "none";
	nav_panes[tid].style.display = "block";

	if(tid == 0){
		chat_table_container.scrollTop += 90001;
	}
	
	active_pane = tid;
}


function add_nav_button(button_text, fn){
	var tr = nav_tbl.rows[0];
	var td = document.createElement("td");
	
	var np_num = nav_panes.length;
	
	var nav = document.createElement("div");
	//nav.id="np_" + np_num;
	nav.style.left = "0px";
	nav.style.top = "0px";
	nav.style.height = "100%";
	nav.style.width = "100%";
	nav.style.zIndex = 0;
	if(np_num != 0){
		nav.style.display = "none";
	}
	document.body.appendChild(nav);
	
	nav_panes.push(nav);
	
	var tbl_btn = document.createElement("div");
	tbl_btn.style.minWidth = "50px";
	tbl_btn.style.border = "1px solid black";
	tbl_btn.style.backgroundColor = "#F0F0F0";
	tbl_btn.innerHTML = button_text;
	tbl_btn.style.textAlign = "center";
	tbl_btn.id = "np_" + np_num;
	
	td.appendChild(tbl_btn);
	tr.appendChild(td);
	
	nav_btns.push(tbl_btn);

	tbl_btn.addEventListener("click", klikfn, false);

	return np_num;
}

// table bodies by user name
var fc_tables = [];

// tab ids by user name
var fc_navs = [];

function open_focus_chat(evt){
	var btn = evt.target;
	var f_user = btn.parentNode.parentNode.cells[0].innerHTML;
	
	var nav_tb = add_nav_button("@" + f_user);
	
	fc_navs[f_user] = nav_tb;
	
	var c_table = document.createElement("table");
	
	//FONTADD - Test
	c_table.style.font = user_font;
	
	var thead = document.createElement("thead");
	c_table.appendChild(thead);
	var tr = document.createElement("tr");
	thead.appendChild(tr);
	var th = document.createElement("th");
	th.innerHTML = "time";
	tr.appendChild(th);
	var th = document.createElement("th");
	th.innerHTML = "user";
	tr.appendChild(th);
	var th = document.createElement("th");
	th.innerHTML = "message";
	tr.appendChild(th);
	var cbody = document.createElement("tbody");
	c_table.appendChild(cbody);
	_container = document.createElement("div");
	_container.style.position = "absolute";
	_container.style.left = "5px";
	_container.style.top = "40px";
	_container.style.right = "5px";
	_container.style.bottom = "60px";
	_container.style.overflow = "auto";
	_container.appendChild(c_table);
	var inputbox = document.createElement("textarea");
	inputbox.id = "inputbox";
	inputbox.style.position = "absolute";
	inputbox.style.left = "1%";
	inputbox.style.width = "98%";
	inputbox.style.height = "50px";
	inputbox.style.bottom = "5px";
	nav_panes[nav_tb].appendChild(_container);
	nav_panes[nav_tb].appendChild(inputbox);
	
	inputbox.addEventListener("keydown", inputbox_press, false);
	inputbox.addEventListener("blur", inpb_blur, false);
	inputbox.addEventListener("focus", inpb_focus, false);

	
	fc_tables[f_user] = cbody;
}

var m_counter = false;
var m_count = 0;
function inpb_blur(){
	m_count = 0;
	m_counter = true;
}

function inpb_focus(){
	m_counter = false;
	document.title = "Awesomer Chat";
}

var active_users = [];
function _update_user(the_user, new_time){
	try{
		var found_user = false;

		for(var i=0; i<list_of_users.length; i++){
			if(list_of_users[i] == the_user){
				found_user = true;
				break;
			}
		}

		if(found_user){
			var _found_user = false;
			for(var i=0; i<active_users.length; i++){
				if(active_users[i] == the_user){
					_found_user = true;
					break;
				}
			}
			if(!_found_user){ active_users.push(the_user); }	
		}
		user_count_elm.innerHTML = "Total Users: " + list_of_users.length + ". Active chatters: " + active_users.length;		

		
		if(found_user){
			for(i=0; i<utbody.rows.length; i++){
				if(utbody.rows[i].cells[0].innerHTML == the_user){
					utbody.rows[i].cells[1].innerHTML = new_time;
					utbody.insertBefore(utbody.rows[i], utbody.rows[0]);
				}
			}
		}
	}catch(ex){}
}

var user_count_elm = null;

var last_sound_add = null;
var d_scroll_stick = true;
var sound_set = "";
var sound_res = "";

var hlite_blocks = [];

var hlite_color = "red";
var hlite_time = "0";

function remove_hlite_block(){
	try{
		hlite_blocks[0].parentNode.removeChild(hlite_blocks[0]);
		hlite_blocks.shift();
	}catch(ex){}
}

var chat_table_container;

var sound_play_method = 0;
function display_chat_message(_str_timestamp, user_name, message, is_informational){
	if(!message || !user_name){return;}
	var is_me = false;
	
	var msg_parts = message.split(" ");
	if(!is_informational && msg_parts && msg_parts.length > 1 && msg_parts[0] == user_name){
		is_me = true;
		msg_parts = msg_parts.splice(1,msg_parts.length-1);
		message = msg_parts.join(" ");
	}
	
	var emtimg = "<img src=\"data:image/jpg;base64," + getemoteimg() + "\" />";

	if(typeof(is_informational) == "undefined"){
		is_informational = false;
	}
	
	if(!is_informational){
		if(m_counter){
			document.title = (++m_count) + "m Awesomer Chat";
		}
	}

	var orig_message = message;
	
	message = message.replace(/:misspink:/g, emtimg);
	
	var msgparts = message.split(" ");
	
	var tagflag = false;
	var tagflag2 = false;
	
	for(var ij = 0; ij<msgparts.length; ij++){
		var newmsg = "";
		for(var i=0; i<msgparts[ij].length; i++){
			var tchr = msgparts[ij].substr(i,1);

			if(tchr == "<"){
				tagflag = true;
			}
			if(tchr == ">" && tagflag){
				tagflag = false;
			}
			if(tchr == "&"){
				tagflag2 = true;
			}
			if(tchr == ";" && tagflag2){
				tagflag2 = false;
			}
			if(!tagflag && !tagflag2 && msgparts[ij].length > 10){
				newmsg += tchr + "<wbr>";
			}else{
				newmsg += tchr;
			}
		}
		msgparts[ij] = newmsg;
	}
	
	message = msgparts.join(" ");
	
	var disp_message = message;
	message = orig_message;
	
	if(is_informational){
		var cur_date = new Date();
		var _hour = cur_date.getHours().toString();
		var _mins = cur_date.getMinutes().toString();
		if(_mins.length==1){
			_mins = "0" + _mins;
		}
		_str_timestamp = _hour + ":" + _mins;
	}
		
	var chat_table = document.getElementById("chat_table");
	var ctbody = document.getElementById("ctbody");
	if(!chat_table){
			
		nav_tbl = document.createElement("table");
		var tr = document.createElement("tr");
		nav_tbl.appendChild(tr);
		
		// The container for the nav buttons
		var nav_ctnr = document.createElement("div");
		nav_ctnr.style.position = "absolute";
		nav_ctnr.style.left = "5px";
		nav_ctnr.style.top = "5px";
		nav_ctnr.style.height = "30px";
		nav_ctnr.style.right = "5px";
		nav_ctnr.appendChild(nav_tbl);
		document.body.appendChild(nav_ctnr);

		var tr = nav_tbl.rows[0];
		var td = document.createElement("td");
		
		var rc_indicator = document.createElement("div");
		rc_indicator.style.height = "10px";
		rc_indicator.style.width = "10px";
		rc_indicator.id="rc_indicator";
		
		td.appendChild(rc_indicator);
		tr.appendChild(td);
		
		add_nav_button("Main");
		add_nav_button("Users");
		
		// All this stuff is for the main chat
		chat_table = document.createElement("table");
		chat_table.style.width="100%";
		chat_table.id = "chat_table";
		var thead = document.createElement("thead");
		chat_table.appendChild(thead);
		var tr = document.createElement("tr");
		thead.appendChild(tr);
		var th = document.createElement("th");
		th.innerHTML = "time";
		tr.appendChild(th);
		var th = document.createElement("th");
		th.innerHTML = "user";
		tr.appendChild(th);
		var th = document.createElement("th");
		th.innerHTML = "message";
		tr.appendChild(th);
		ctbody = document.createElement("tbody");
		ctbody.id="ctbody";
		chat_table.appendChild(ctbody);
		d_container = document.createElement("div");
		d_container.id = "d_container";
		d_container.style.position = "absolute";
		d_container.style.left = "5px";
		d_container.style.top = "40px";
		d_container.style.right = "5px";
		d_container.style.bottom = "60px";
		d_container.style.overflow = "hidden";	
		
		chat_table_container = document.createElement("div");
		chat_table_container.style.width = "100%";
		chat_table_container.style.height = "100%";
		chat_table_container.style.cssFloat = "left";
		
		chat_table_container.appendChild(chat_table);			
		
		chat_table_container.style.overflowY = "auto";		
		
		d_container.appendChild(chat_table_container);		
		
		var inputbox = document.createElement("textarea");
		inputbox.id = "inputbox";
		inputbox.style.position = "absolute";
		inputbox.style.left = "1%";
		inputbox.style.width = "98%";
		inputbox.style.height = "50px";
		inputbox.style.bottom = "5px";
		
		//FONTADD - Input Box Font
		inputbox.style.font=user_font;

		nav_panes[0].appendChild(d_container);
		nav_panes[0].appendChild(inputbox);

		chat_table_container.addEventListener("scroll", function(evt){
			if(((chat_table_container.scrollTop + chat_table_container.offsetHeight)+20) >= chat_table_container.scrollHeight){
				d_scroll_stick = true;
			}else{
				d_scroll_stick = false;
			}
		}, true);
		
		// For the "Users" nav item
		users_table = document.createElement("table");
		users_table.id = "users_table";
		var thead = document.createElement("thead");
		users_table.appendChild(thead);
		var tr = document.createElement("tr");
		thead.appendChild(tr);
		var th = document.createElement("th");
		th.innerHTML = "User";
		tr.appendChild(th);
		var th = document.createElement("th");
		th.innerHTML = "Time";
		tr.appendChild(th);
		/*var th = document.createElement("th");
		th.innerHTML = "Focused Chat";
		tr.appendChild(th);*/
		utbody = document.createElement("tbody");
		utbody.id="utbody";
		users_table.appendChild(utbody);
		
		user_count_elm = document.createElement("div");
		
		u_container = document.createElement("div");
		u_container.id = "u_container";
		u_container.style.position = "absolute";
		u_container.style.left = "5px";
		u_container.style.top = "40px";
		u_container.style.right = "5px";
		u_container.style.bottom = "10px";
		u_container.style.overflow = "auto";
		
		u_container.appendChild(user_count_elm);
		u_container.appendChild(users_table);
		nav_panes[1].appendChild(u_container);
		
		
		inputbox.addEventListener("keydown", inputbox_press, false);
		inputbox.addEventListener("blur", inpb_blur, false);
		inputbox.addEventListener("focus", inpb_focus, false);
	}
	
	if(!is_informational){
		try{_update_user(user_name, _str_timestamp);}catch(ex){}
	}
	
	if(is_away && user_name != jalUserName){
		if(away_message && !is_informational){
			var post_away = false;
			if(message.substring(0,jalUserName.toString().length).toLowerCase() == jalUserName.toString().toLowerCase()){
				post_away = true;
			}
			for(var i=0; i<aliases.length; i++){
				if(aliases[i].length > 0 && message.substring(0,aliases[i].toString().length).toLowerCase() == aliases[i].toString().toLowerCase()){
					post_away = true;
				}
			}
			
			if(post_away){
				post_message(away_message.replace("%n",user_name));
			}
		}
	}
	
	var msg_parts = message.split(" ");
	if(msg_parts.length > 1 && message.substr(0,1) == "@"){
		var at_user = msg_parts[0].substring(1,msg_parts[0].length);
		if(is_away && user_name != jalUserName){
			if(away_message && !is_informational){
				var post_away = false;

				if(at_user.substring(0,jalUserName.toString().length).toLowerCase() == jalUserName.toString().toLowerCase()){
					post_away = true;
				}

				for(var i=0; i<aliases.length; i++){
					if(aliases[i].length > 0 && at_user.toLowerCase() == aliases[i].toString().toLowerCase()){
						post_away = true;
					}
				}
				
				if(post_away){
					post_message(away_message.replace("%n",user_name));
				}
			}
		}		
		if(at_user == jalUserName || user_name == jalUserName){
			
			var rest_of_message = message.substring(msg_parts[0].length+1, message.length);
			
			if(at_user == jalUserName){
				at_user = user_name;
			}
			
			if(typeof(fc_tables[at_user]) != "undefined"){
				var tr = document.createElement("tr");
				var td = document.createElement("td");
				td.innerHTML = _str_timestamp;
				td.style.borderRight = "1px solid black";
				td.style.borderBottom = "1px solid black";
				td.style.color = infotext_color;
				tr.appendChild(td);
				var td = document.createElement("td");
				td.innerHTML = user_name;
				td.style.borderRight = "1px solid black";
				td.style.borderBottom = "1px solid black";
				tr.appendChild(td);
				var td = document.createElement("td");
				td.innerHTML = rest_of_message;
				td.style.borderBottom = "1px solid black";
				tr.appendChild(td);
				fc_tables[at_user].appendChild(tr);
			}
		}
	}
	
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	td.style.width="1px";
	
	//FONTADD - TimeStamp
	td.style.font = user_font;
	
	td.innerHTML = _str_timestamp;
	if(alternate_bg){
		td.style.backgroundColor = alternate_bg_list[alternate_bg_part];
	}
		
	td.style.borderRight = "1px solid black";
	td.style.borderBottom = "1px solid black";
	td.style.color = infotext_color;
	
	tr.appendChild(td);
	
	var ftd = td;
	
	var td = document.createElement("td");
	td.style.width="1px";
	
	//FONTADD - UserName
	td.style.font = user_font;
	
	if(is_me){
		td.innerHTML = "<b>" + user_name + "</b> " + disp_message;
	}else{
		td.innerHTML = user_name;
	}
	
	if(is_me){
		td.setAttribute("colspan","2");
	}
	
	if(alternate_bg){
		td.style.backgroundColor = alternate_bg_list[alternate_bg_part];
	}
	
	td.style.borderRight = "1px solid black";
	td.style.borderBottom = "1px solid black";
	if(is_informational){
		td.style.color = infotext_color;
	}else{
		td.style.color = usertext_color;
	}
	
	tr.appendChild(td);

	if(!is_informational){
		td.addEventListener("click", (function(evt){
			try{
				var inp_bx = document.getElementById("inputbox");
				if(inp_bx.value.toString().replace(/^\s+|\s+$/g, '').length == 0 || inp_bx.value.substr(0,1) == "@"){
					inp_bx.value = "@" + evt.target.innerHTML.toString() + " ";
					inp_bx.focus();
				}
			}catch(ex){}
		}), false);
	}
	
	var do_add_sound = false;
	var add_sound = "";

	if(sound_set == "all"){
		do_add_sound = true;
	}else if(sound_set == "me"){
		for(var i=0; i<aliases.length; i++){
			if(message.toLowerCase().indexOf(aliases[i].toLowerCase()) > -1){
				do_add_sound = true;
				break;
			}
		}
		try{
			if(message.indexOf(jalUserName.toLowerCase()) > -1){
				do_add_sound = true;
			}
		}catch(ex){}
	}
	
	if(last_sound_add && ((new Date()) - last_sound_add)<2000){
		do_add_sound = false;
	}
	
	if(user_name == jalUserName){
		do_add_sound = false;
	}
	
	if(!is_informational && do_add_sound){
		last_sound_add = new Date();
		
		if(sound_play_method == 1){
			var snd_notify = document.getElementById("snd_notify");
			if(snd_notify){
				document.body.removeChild(snd_notify);
			}
		
			var _snd = document.createElement("embed");
			_snd.setAttribute("autostart", "true");
			_snd.setAttribute("hidden", "true");
			_snd.src = sound_res;
			_snd.id = "snd_notify";
			document.body.appendChild(_snd);
			
		}else if(sound_play_method == 2){
		
			var snd_notify = unsafeWindow.document.getElementById("snd_notify");
			if(snd_notify){
				try{snd_notify.dewplay();}catch(ex){}
			}else{
			
				var _snd = document.createElement("embed");
				_snd.setAttribute("autostart", "true");
				_snd.setAttribute("hidden", "true");
				var fullsrc = "http://www.studyjapanese.org/jinclude/dewplayer.swf?mp3=" + sound_res;
				_snd.src = fullsrc;
				_snd.id = "snd_notify";
				document.body.insertBefore(_snd,document.body.firstChild);
				setTimeout(function(){
					try{unsafeWindow.document.getElementById("snd_notify").dewplay();}catch(ex){}
				},100);
			}
		}
	}
	
	if(!is_me){
		var td = document.createElement("td");
		td.innerHTML = disp_message;
		
		if(is_informational){
			td.style.color = infotext_color;
		}else{
			if(alternate_colors){
				td.style.color = alternate_color_list[alternate_part];
				alternate_part++;
				if(alternate_part >= alternate_color_list.length){
					alternate_part = 0;
				}
			}
			
			if(alternate_bg){
				td.style.backgroundColor = alternate_bg_list[alternate_bg_part];
				alternate_bg_part++;
				if(alternate_bg_part >= alternate_bg_list.length){
					alternate_bg_part = 0;
				}
			}
		}
		
		//FONTADD
		td.style.font = user_font;
		
		td.style.borderBottom = "1px solid black";
		
		tr.appendChild(td);
	}
	
	ctbody.appendChild(tr);

	var ht = parseInt(hlite_time, 10);
	if(ht > 0){
		ftd.style.verticalAlign="top";
		var hdiv = document.createElement("span");
		hdiv.style.position="absolute";
		hdiv.style.backgroundColor=hlite_color;
		hdiv.style.width="70%";
		hdiv.style.height= "" + tr.offsetHeight;
		hdiv.style.MozOpacity="0.2";
		ftd.appendChild(hdiv);
		
		hlite_blocks.push(hdiv);
		setTimeout(remove_hlite_block, ht*1000);
	}

	
	if(max_messages > 0){
		while(ctbody.rows.length > max_messages){
			ctbody.removeChild(ctbody.firstChild);
		}
	}

	try{
		if(d_scroll_stick){
			chat_table_container.scrollTop = chat_table_container.scrollHeight - chat_table_container.offsetHeight;
		}
	}catch(ex){}
}

var p_message_list = [];
var p_scrolling = false;
var p_pos = 0;
function inputbox_press(evt){
	try{
		if(p_message_list.length > 0){
			if(evt.keyCode == 38){ // up key
				if(evt.target.value.toString().replace(/^\s+|\s+$/g, '').length == 0 || p_scrolling){
					if(!p_scrolling){
						p_pos = p_message_list.length;
						p_scrolling = true;
					}

					if(p_pos >= 1){
						evt.target.value = p_message_list[--p_pos];
					}else{
						p_pos = p_message_list.length;
						evt.target.value = p_message_list[--p_pos];
					}
				}
			}
			
			if(evt.keyCode == 40){ // down key
				if(evt.target.value.toString().replace(/^\s+|\s+$/g, '').length == 0 || p_scrolling){
					if(!p_scrolling){
						p_pos = -1;
						p_scrolling = true;
					}

					if(p_pos < p_message_list.length-1){
						evt.target.value = p_message_list[++p_pos];
					}else{
						p_pos = -1;
						evt.target.value = p_message_list[++p_pos];
					}
				}
			}
		}
	}catch(ex){}

	if(evt.keyCode == 13){
		p_scrolling = false;
		
		try{
			evt.preventDefault();
		}catch(ex){};
		
		var inputbox = evt.target;
		var complete_text = inputbox.value;
		inputbox.value = "";
		
		var has_cr = complete_text.indexOf("\r") > -1;
		var has_ln = complete_text.indexOf("\n") > -1;
		
		var tsparts = [];
		
		if(has_cr && has_ln){
			tsparts = complete_text.split("\r\n");
		}else if(has_cr){
			tsparts = complete_text.split("\r");
		}else if(has_ln){
			tsparts = complete_text.split("\n");
		}else{
			tsparts = [complete_text];
		}
		
		for(i in tsparts){
			var send_text = tsparts[i];
					
			if(!send_text){return};

			p_message_list.push(send_text);
			
			// Limit history to 100 items
			if(p_message_list.length > 100){
				p_message_list.shift();
			}
					
			if(send_text.substr(0,1) == "/"){
				var text_parts = send_text.substring(1,send_text.length).split(" ");
				var parm_text = send_text.substring(text_parts[0].length+2, send_text.length);
				
				try{
					parm_text = parm_text.replace(/^\s+|\s+$/g, ''); //trim white space
				}catch(ex){}
				
				if(text_parts[0] == "test"){
					display_chat_message("- - -", "- - -", "test");
				}
				
				if(text_parts[0] == "me"){
					if(jalUserName)
						post_message(jalUserName + " " + parm_text);
				}
				
				if(text_parts[0] == "sound" && text_parts.length==2){
					if(text_parts[1] != "all" && text_parts[1] != "me" && text_parts[1] != "off"){
						display_chat_message("- - -", "sound_set", "can only be 'all', 'me', or 'off'", true);
					}else{
						sound_set = text_parts[1];
						GM_setValue("sound_set", text_parts[1]);
						display_chat_message("- - -", "sound_set", text_parts[1],true);
					}
				}
				
				if(text_parts[0] == "soundres" && text_parts.length==2){
					sound_res = text_parts[1];
					GM_setValue("sound_res", text_parts[1]);
					display_chat_message("- - -", "sound_res", "sound resource changed",true);
				}
				
				if(text_parts[0] == "ungraphic_emotes"){
					ungraphic_emotes = !ungraphic_emotes;
					display_chat_message("- - -", "- - -", "ungraphic emotes: " + (ungraphic_emotes.toString()), true);
					GM_setValue("ungraphic_emotes", (ungraphic_emotes ? "1" : "0"));
				}
				
				if(text_parts[0] == "sound_play_method"){
					GM_setValue("sound_play_method", text_parts[1]);
					sound_play_method = parseInt(text_parts[1],10);
					try{
						var snd_notify = document.getElementById("snd_notify");
						document.body.removeChild(snd_notify);
					}catch(ex){}
				}
				
				if(text_parts[0] == "version"){
					display_version();
				}
				
				if(text_parts[0] == "help"){
					show_help((text_parts.length > 1) ? text_parts[1] : "");
				}
				
				if(text_parts[0] == "alias"){
					if(text_parts.length == 1){
						display_chat_message("- - -", "alias", aliases.join(" "), true);
						return;					
					}
					
					aliases = [];
					
					for(var i=1; i<text_parts.length; i++){
						aliases.push(text_parts[i]);
					}
					display_chat_message("- - -", "alias", aliases.join(", "), true);
					GM_setValue("alias", aliases.join("|"));
				}
				
				if(text_parts.length >= 3 && text_parts[0] == "alternate_colors"){
					alternate_color_list = [];
					for(var i=1; i<text_parts.length; i++){
						alternate_color_list.push(text_parts[i]);
					}
					alternate_part = 0;
					
					alternate_colors = true;
					GM_setValue("alternate_colors", alternate_color_list.join("|"));
				}
				
				if(text_parts.length == 1 && text_parts[0] == "alternate_colors"){
					alternate_colors = false;
					alternate_color_list = [];
					GM_setValue("alternate_colors", "");
				}
				
				if(text_parts.length >= 3 && text_parts[0] == "alternate_bg"){
					alternate_bg_list = [];
					for(var i=1; i<text_parts.length; i++){
						alternate_bg_list.push(text_parts[i]);
					}
					alternate_bg_part= 0;
					alternate_bg = true;
					GM_setValue("alternate_bg", alternate_bg_list.join("|"));
				}
				
				if(text_parts.length == 1 && text_parts[0] == "max_messages"){
					display_chat_message("- - -", "max_messages", max_messages.toString(), true);
				}
				
				if(text_parts.length == 2 && text_parts[0] == "max_messages"){
					var setn = parseInt(text_parts[1],10);
					if(setn > -1){
						max_messages = setn;
					}
					GM_setValue("max_messages", max_messages.toString());
					display_chat_message("- - -", "max_messages", max_messages.toString(), true);
				}
				
				if(text_parts.length == 1 && text_parts[0] == "auto_lower"){
					auto_lower = !auto_lower;
					GM_setValue("auto_lower", (auto_lower ? "1" : "0"));
				}
				
				if(text_parts.length == 1 && text_parts[0] == "alternate_bg"){
					alternate_bg = false;
					alternate_bg_list = ['#F0F0F0', '#E8E8E8'];
					GM_setValue("alternate_bg", alternate_bg_list.join("|"));
					display_chat_message("- - -", "alternate_bg", "reset", true);
				}
				
				if(text_parts.length == 2 && text_parts[0] == "poll_interval"){
					var setv = parseInt(text_parts[1],10);
					if(setv >= 0){
						poll_interval = setv;
					}
					GM_setValue("poll_interval", poll_interval.toString());
					display_chat_message("- - -", "poll_interval", poll_interval.toString(), true);
				}
				
				if(text_parts.length == 1 && text_parts[0] == "poll_interval"){
					display_chat_message("- - -", "poll_interval", poll_interval.toString(), true);
				}
				
				if(text_parts.length == 2 && text_parts[0] == "error_interval"){
					var setv = parseInt(text_parts[1],10);
					if(setv >= 0){
						error_interval = setv;
					}
					GM_setValue("error_interval", error_interval.toString());
					display_chat_message("- - -", "error_interval", error_interval.toString(), true);
				}
				
				if(text_parts.length == 1 && text_parts[0] == "error_interval"){
					display_chat_message("- - -", "error_interval", error_interval.toString(), true);
				}
				
				if(text_parts.length == 1 && text_parts[0] == "r"){
					window.location.reload();
				}

				if(text_parts[0] == "eval"){
					eval(parm_text);
				}
				
				if(text_parts[0] == "away_message"){
					GM_setValue("away_message", parm_text);
					away_message = parm_text;
				}
				
				if(text_parts[0] == "away"){
					if(is_away && text_parts.length>1){
						away_message = parm_text;
					}else{
						is_away = !is_away;
						if(text_parts.length>1){
							away_message = parm_text;
						}
					}
					
					if(!away_message){
						is_away = false;
					}
					
					GM_setValue("away_message", away_message);
					
					display_chat_message("- - -", "- - -", (is_away ? "You are now away: " + away_message : "You are no longer away."),true);
					if(is_away){
						document.getElementById("ballimg").style.display = "block";
					}else{
						document.getElementById("ballimg").style.display = "none";
					}
				}
				
				if(text_parts[0] == "ignore"){
					ignore_list.push(parm_text);
					display_chat_message("- - -", "ignore", parm_text, true);
					GM_setValue("ignore_list", ignore_list.join("|"));
				}
				
				if(text_parts[0] == "ignore_text"){
					ignore_message_list.push(parm_text);
					display_chat_message("- - -", "ignore_text", parm_text, true);
					GM_setValue("ignore_text", ignore_message_list.join("|"));
				}
				
				if(text_parts[0] == "unignore"){
					var new_list = [];
					for(m=0; m<ignore_list.length; m++){
						if(ignore_list[m] != text_parts[1]){
							new_list.push(ignore_list[m]);
						}
					}
					if(new_list.length < ignore_list.length){
						display_chat_message("- - -", "unignore", "succuss", true);
						ignore_list = new_list.reverse();
					}else{
						display_chat_message("- - -", "unignore", "no change", true);
					}
					GM_setValue("ignore_list", ignore_list.join("|"));
				}
				
				if(text_parts[0] == "unignore_text"){
					var new_list = [];
					for(m=0; m<ignore_message_list.length; m++){
						if(ignore_message_list[m].indexOf(text_parts[1]) == -1){
							new_list.push(ignore_message_list[m]);
						}
					}
					if(new_list.length < ignore_message_list.length){
						display_chat_message("- - -", "unignore_text", "succuss", true);
						ignore_message_list = new_list.reverse();
					}else{
						display_chat_message("- - -", "unignore_text", "no change", true);
					}
					GM_setValue("ignore_text", ignore_message_list.join("|"));
				}
				
				if(text_parts[0] == "unignore_all"){
					GM_setValue("ignore_list", "");
					GM_setValue("ignore_text", "");
					ignore_message_list = [];
					ignore_list = [];
					display_chat_message("- - -", "unignore_all", "done", true);
				}
				
				if(text_parts[0] == "list_ignores"){
					for(var m=0; m<ignore_list.length; m++){
						if(ignore_list[m]){
							display_chat_message("- - -", "ignored user", ignore_list[m], true);
						}
					}
					
					for(var m=0; m<ignore_message_list.length; m++){
						if(ignore_message_list[m]){
							display_chat_message("- - -", "ignored message", ignore_message_list[m], true);
						}
					}
					
					try{
						if(d_scroll_stick){
							chat_table_container.scrollTop = chat_table_container.scrollHeight - chat_table_container.offsetHeight;
						}
					}catch(ex){}
				}
				
				if(text_parts.length == 2 && text_parts[0] == "background_image"){
					GM_setValue("background_image", text_parts[1]);
					document.body.style.backgroundImage = "url(" + text_parts[1] + ")";
				}

				if(text_parts.length == 1 && text_parts[0] == "background_image"){
					GM_setValue("background_image", "");
					document.body.style.backgroundImage = "";
				}
				
				if(text_parts.length == 1 && text_parts[0] == "background_color"){
					GM_setValue("background_color", "");
					document.body.style.backgroundColor = "";
				}
				
				if(text_parts.length == 2 && text_parts[0] == "background_color"){
					GM_setValue("background_color", text_parts[1]);
					document.body.style.backgroundColor = text_parts[1];
				}
				
				if(text_parts.length == 2 && text_parts[0] == "infotext_color"){
					infotext_color = text_parts[1];
					GM_setValue("infotext_color", text_parts[1]);
				}
				
				if(text_parts.length == 2 && text_parts[0] == "usertext_color"){
					usertext_color = text_parts[1];
					GM_setValue("usertext_color", text_parts[1]);
				}
				
				if(text_parts.length == 1 && text_parts[0] == "list_config"){
					var config_values = GM_listValues();
					for(i in config_values){
						var disp_c = config_values[i];
						switch(disp_c){
							case "sound_res":
								disp_c = "soundres";
							break;
							case "sound_set":
								disp_c = "sound";
							break;
						}
						display_chat_message("- - -", "config", "/" + disp_c + " " + GM_getValue(config_values[i], "").split("|").join(" "),true);
					}
				}
				
				if(text_parts.length == 2 && text_parts[0] == "hlite_color"){
					hlite_color = text_parts[1];
					GM_setValue("hlite_color", text_parts[1]);
					display_chat_message("- - -", "hlite_color", text_parts[1]);
				}
				
				if(text_parts.length == 2 && text_parts[0] == "hlite_time"){
					hlite_time = text_parts[1];
					GM_setValue("hlite_time", text_parts[1]);
					display_chat_message("- - -", "hlite_time", text_parts[1]);
				}
				
				if(text_parts.length == 1 && text_parts[0] == "master_reset"){
					var config_values = GM_listValues();
					for(i in config_values){
						GM_deleteValue(config_values[i]);
					}
					window.location.reload();
				}
				
				//FONTADD - Cmd
				if(text_parts[0] == "user_font"){
					user_font = parm_text;
					GM_setValue("user_font", parm_text);
					display_chat_message("- - -", "user_font", parm_text, true);
				}
				
			}else{
				var ad_nam = "";
				if(active_pane != 0){
					for(var nam in fc_navs){
						
						if(fc_navs[nam] == active_pane){
							ad_nam = nam;
						}
					}
				}
				
				if(ad_nam.length > 0){
					send_text = "@" + ad_nam + " " + send_text;
				}
				post_message(send_text);
			}
		}
	}
}

function post_message(send_text){
	// These text transformations are required 
	// for the server to send the message back looking like the message that was sent
	
	// Replace "<" with unicode equivilent
	send_text = send_text.replace(/[<]/g, decodeURIComponent("%EF%BC%9C"));
	// Replace ">" with unicode equivilent
	send_text = send_text.replace(/[>]/g, decodeURIComponent("%EF%BC%9E"));
	// double every backslash
	send_text = send_text.replace(/[\\]/g,"\\\\");
	// special case for the separater text. The # is replaced with unicode.
	send_text = send_text.replace(/\|#%\|/g, decodeURIComponent("%7C%EF%BC%83%25%7C"));

	try{
		if(!send_text){return;}
		
		if(0) { // !jalUserName){
			var cookie_text = document.cookie;
			if(!cookie_text){return;}
			
			var split_cookie = cookie_text.split(";");
			for(var c=0; c < split_cookie.length; c++){
				var this_val = split_cookie[c];
				var val_split = this_val.split("=");
				if(val_split.length == 2){
					var varvar = val_split[0];
					var varval = val_split[1];
					varvar = varvar.replace(/^\s+|\s+$/g, '');
					varval = varval;
					
					if(varvar == "jalUserName"){
						jalUserName = unescape(varval);
					}
					if(varvar == "jalUrl"){
						jalUrl = varval;
					}
				}
			} 
		}
		
		if(!jalUrl){jalUrl = "http://";}
				
		if(!jalUserName){
			display_chat_message("- - -", "notice", "unable to post, username not found", true);
			return;
		}
		
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://www.studyjapanese.org/component/shoutbox?mode=addshout", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function(){
			if(this.readyState == 4 && this.status != 200) {
				display_chat_message("- - -", "error", "your message could not be posted!", true);
			}
		}
		xhr.onerror = function(){
			display_chat_message("- - -", "error", "an error occured while trying to post your message", true);
		}
		xhr.send("c=" + encodeURIComponent(send_text) + "&h=&n=" + encodeURIComponent(jalUserName) + "&u=" + encodeURIComponent(jalUrl));
	}catch(ex){}	
}

function display_version(){
		var d_msg = script_version;
		if(has_new_ver){
			d_msg += ". A new version is available: " + has_new_ver; 
		}
		display_chat_message("- - -", "- - -", "Awesomer Chat version " + d_msg, true);
		display_chat_message("- - -", "- - -", "http://userscripts.org/scripts/show/46795", true);
}

var load_first = false;

var user_poller = null;
var last_rpoll = new Date();
function continualy_refresh_users(){
	try{
		if(user_poller){ clearTimeout(user_poller); }
	}catch(ex){}
	
	var randnum = Math.floor(Math.random()*1000000);
	
	GM_xmlhttpRequest({
		method: 'GET',
		// I chose this address because there isn't any content on it.
		// I only want the user list from the page really, 
		// any page that has the user list on it should work
		url: 'http://www.studyjapanese.org/add-link?rnd='+randnum,
		
		// next smallest page
		//url: 'http://www.studyjapanese.org/links',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/html',
			'Cache-Control': 'no-cache'
		},
		onload: function(responseDetails) {
			last_rpoll = new Date();
			
			try{
				var resp = responseDetails.responseText.toString();
				var search_text = "<ul class='mod_login_blue'>";
				var r_idx = resp.indexOf(search_text);
				if(r_idx > -1){
					var e_idx = resp.indexOf("</ul>", r_idx);
					if(e_idx > -1){
						e_idx += 5; // 5 characters in the end tag
						
						var _parser=new DOMParser();
						var _xdoc = _parser.parseFromString(resp.substring(r_idx, e_idx), "text/xml");
												
						var new_list = [];
						var anc_tags = _xdoc.getElementsByTagName("a");
						for(var i = 0; i< anc_tags.length; i++){
							if(anc_tags[i].childNodes && anc_tags[i].childNodes.length){
								new_list.push(anc_tags[i].childNodes[0].nodeValue);
							}
						}
						
						if(list_of_users.length > 0){
							var new_users = [];
							var gone_users = [];
							
							for(var i=0; i<new_list.length; i++){
								var found_in_list = false;
								for(var j=0; j<list_of_users.length; j++){
									if(new_list[i] == list_of_users[j]){
										found_in_list = true;
									}
								}
								if(!found_in_list){
									new_users.push(new_list[i]);
								}
							}
							
							for(var i=0; i<list_of_users.length; i++){
								var found_in_list = false;
								for(var j=0; j<new_list.length; j++){
									if(new_list[j] == list_of_users[i]){
										found_in_list = true;
									}
								}
								if(!found_in_list){
									gone_users.push(list_of_users[i]);
								}
							}
							
							for(var i=0; i<new_users.length; i++){
								display_chat_message("- - -", "logged in", new_users[i], true);
								
								var tr = document.createElement("tr");
								var td = document.createElement("td");
								td.innerHTML = new_users[i];
								tr.appendChild(td);
								var td = document.createElement("td");
								td.innerHTML = "";
								tr.appendChild(td);
								
								utbody.appendChild(tr);
							}
							
							for(var i=0; i<gone_users.length; i++){
								display_chat_message("- - -", "logged out", gone_users[i], true);
								
								for(var j=utbody.rows.length-1; j>=0; j--){
									if(utbody.rows[j].cells[0].innerHTML == gone_users[i]){
										utbody.removeChild(utbody.rows[j]);
										break;
									}
								}
								
								var new_active_users_list = [];
								for(var k=0; k < active_users.length; k++){
									if(active_users[k] != gone_users[i]){
										new_active_users_list.push(active_users[k]);
									}
								}
								active_users = new_active_users_list;
							}
						}
						
						if(list_of_users.length == 0){
							for(var i=0; i<new_list.length; i++){
								var tr = document.createElement("tr");
								var td = document.createElement("td");
								td.innerHTML = new_list[i];
								tr.appendChild(td);
								var td = document.createElement("td");
								td.innerHTML = "";
								tr.appendChild(td);
								
								utbody.appendChild(tr);
							}
						}
						
						list_of_users = new_list;
						
					}
				}
			}catch(ex){}

			user_count_elm.innerHTML = "Total Users: " + list_of_users.length + ". Active chatters: " + active_users.length;
			
			if(!load_first){
				load_first = true;
				user_poller = setTimeout(function(){try{receive_chat();}catch(ex){}},0);
				setTimeout(function(){try{receive_chat_keepalive();}catch(ex){}},5000);
			}
			
			user_poller = setTimeout(continualy_refresh_users, 30000);
		},
		onerror: function(e){
			last_rpoll = new Date();
			user_poller = setTimeout(continualy_refresh_users, 30000);
		}
	});
}

function show_help(x){
	var help_items = [];
	help_items["me"] = "/me n \n -- send an action message to the chat";
	help_items["poll_interval"] = "/poll_interval x \n --replace x with the number of milliseconds between each poll";
	help_items["error_interval"] =  "/error_interval x \n --replace x with the number of milliseconds between each retry when an error occurs while polling";
	help_items["ignore"] = "/ignore n \n --replace n with the name of a user to ignore";
	help_items["ignore_text"] = "/ignore_text n \n --replace n with some text to exclude. messages containing n will not be displayed";
	help_items["unignore_all"] = "/unignore_all \n -- clears every ignore";
	help_items["unignore"] = "/unignore n \n --stop ignoring n";
	help_items["unignore_text"] = "/unignore_text n \n --stop ignoring messages that contain n";
	help_items["list_ignores"] = "/list_ignores \n -- list all the users and messages you are ignoring";
	help_items["alternate_colors"] = "/alternate_colors red green blue \n -- replace \"red green blue\" with a list of colors to alternate";
	help_items["alternate_bg"] = "/alternate_bg red green blue \n -- replace \"red green blue\" with a list of colors to alternate";
	help_items["auto_lower"] = "/auto_lower \n -- toggle automatic lower case of messages";
	help_items["max_messages"] = "/max_messages n \n -- set the maximum number of messages that will display";
	help_items["away"] = "/away m \n -- sets your away message to m. If your name or one of your aliases appears at the beginning of a message, the script will auto reply with the message. If m contains %n, it will be replaced by the users name. Type /away again to come back";
	help_items["away_message"] = "/away_message m \n -- sets your away message to m without setting away status";
	help_items["alias"] = "/alias a b c \n -- sets your aliases to the list of items specified";
	help_items["version"] = "/version \n -- displays the current version";
	help_items["ungraphic_emotes"] = "/ungraphic_emotes \n -- transforms graphic emotes into text ones";
	help_items["sound"] = "/sound [all|me|off] \n -- sets your audio notification preference. 'all' will notify you of any message with a sound, 'me' will notify you if someone says one of your aliases, and 'off' turns notification off";
	help_items["soundres"] = "/soundres r \n -- replace r with a URL to a sound, which will be used for sound notifications. Default is http://www.studyjapanese.org/sfx/shamisen.mp3";
	help_items["r"] = "/r \n -- reloads the window";
	help_items["list_config"] = "/list_config \n -- displays all your configuration values";
	help_items["background_color"] = "/background_color c \n -- sets your background color to c";
	help_items["background_image"] = "/background_image i \n -- sets your background image to i";
	help_items["infotext_color"] = "/infotext_color c \n -- sets the color of the infotext messages to c";
	help_items["usertext_color"] = "/usertext_color c \n -- sets the color of the usernames to c";
	help_items["master_reset"] = "/master_reset \n -- clears every configuration value then reloads the page";
	help_items["hlite_color"] = "/hlite_color -- the color of the new highlights for new messages";
	help_items["hlite_time"] = "/hlite_time -- the amount of time new messages are highlighted";
	help_items["sound_play_method"] = "/sound_play_method x -- 1 for normal embed, 2 to use flash player (default)";
	
	//FONTADD - user_font Help
	help_items["user_font"] = "/user_font f \n -- sets your chat column font to f. f example:  12pt Tahoma";
	
	if(help_items[x]){
		display_chat_message("- - -", "- - -", help_items[x], true);
	}else{
		var c_list = "";
		for(var i in help_items){
			c_list += i + "; ";
		}
		display_chat_message("- - -", "- - -", "The following help topics are available. Type /help &lt;item&gt; to learn more about one", true);
		display_chat_message("- - -", "- - -", c_list, true);
	}
}

function load_settings(){
	try{
		sound_set = GM_getValue("sound_set", "");
		sound_res = GM_getValue("sound_res", "http://www.studyjapanese.org/sfx/shamisen.mp3");
		ungraphic_emotes = GM_getValue("ungraphic_emotes","0")=="1" ? true : false;
		aliases = GM_getValue("alias", "").split("|");
		alternate_color_list = GM_getValue("alternate_colors", "").split("|");
		if(alternate_color_list.length == 1 && alternate_color_list[0] == ""){alternate_color_list = [];}
		if(alternate_color_list.length > 0){alternate_colors = true;}
		alternate_bg_list = GM_getValue("alternate_bg","#F0F0F0|#E8E8E8").split("|");
		max_messages = parseInt(GM_getValue("max_messages","1000"),10);
		auto_lower = GM_getValue("auto_lower", "0") == "1" ? true : false;
		poll_interval = parseInt(GM_getValue("poll_interval", 3000),10);
		error_interval = parseInt(GM_getValue("error_interval", 1000),10);
		away_message = GM_getValue("away_message","");
		ignore_list = GM_getValue("ignore_list", "").split("|");
		if(ignore_list.length == 1 && ignore_list[0] == ""){ignore_list = [];}
		ignore_message_list = GM_getValue("ignore_text", "").split("|");
		if(ignore_message_list.length == 1 && ignore_message_list[0] == ""){ignore_message_list = [];}
		
		hlite_color = GM_getValue("hlite_color", "red");
		hlite_time = GM_getValue("hlite_time", "0");
		
		var bgimg = GM_getValue("background_image", "");
		if(bgimg){
			document.body.style.backgroundImage = "url(" + bgimg + ")";
		}
		
		var bgcolor = GM_getValue("background_color", "");
		if(bgcolor){
			document.body.style.backgroundColor = bgcolor;
		}
		
		infotext_color = GM_getValue("infotext_color", "blue");
		
		usertext_color = GM_getValue("usertext_color", "green");
		
		sound_play_method = GM_getValue("sound_play_method","2");
		sound_play_method = parseInt(sound_play_method,10);
		
		//FONTADD - GM Values
		user_font = GM_getValue("user_font", "");
	}catch(ex){}
}

function loadidat(){
	// taken from:
	// http://www.clipart-graphics.net/gallery/animations/misc/ball.gif
	var balldat = "R0lGODlhDgAOAPcAAEoAEEoAGFoAGFoAIWMAGGsAIXMAIXMQMYQAKYQQMYwxSpQAKZwAKZxKY60A";
	balldat += "MbUAMb0AMb0AOcYAOcZ7jMZ7lM4AOc4QSs5Ca85je85jhNYAQtYIQt4AQucAQu8AQv8ASv8AUv8I";
	balldat += "Uv8QUv8QWv8hY/8xe/+M1v+l7////wAAAEoqAEorAFozAFo1AGM6AGs9AHNDAHNIEIRLAIRUEIxm";
	balldat += "MZRWAJxbAJx4Sq1lALVqAL1rAL1uAMZ0AMame8ane854AM58EM6UQs6gY86hY9Z5ANaACN6CAOeH";
	balldat += "AO+LAP+RAP+VAP+XEP+YCP+bEP+jIf+mMf/HjP/RpUVKAEpKAFdaAFpZAF5jAGtrAHFzAHNzEIKE";
	balldat += "EISEAImMMY+UAJecAJycSqetAK+1ALe9AL29AMLGe8PGAMbGe8fOAMnOY8zOQs7OEM7OY8/WCNbW";
	balldat += "ANreAOPnAOfvAPf/EPv/APv/CPv/If/kpf/qjP/8Mf//AP//EABKCQBKDgBaCQBaDQBjEABrDgBz";
	balldat += "DwCEEgCUFgCcFwCtGgC1GwC9GQC9HADGGgDOHwDWHQDeHgDnHwDvJAD/HgD/IgjWJwj/KRBzHBCE";
	balldat += "HxDOKRD/MBD/NCH/PzGMPzH/RkLOVUqcVWPOcWPOdXvGhHvGh5D/jLH/pQAASgAA/wABWgIAawIA";
	balldat += "hAMAvQQAWgQAcwQA1gUAlAYASgYArQYAtQcAYwcAxgcAzgcA3ggAnAgA5wgA7wgA/wkAvQ8I1hAI";
	balldat += "/xAQcxMQzhQQhBQQ/xgQ/ygh/zE0/zQxjEdCzktKnGVjzmxjznt7xoF7xoyn/6XG/7F7xqZCzpUQ";
	balldat += "zrBjzpYA1rMA/7cA/6sA744AxrB7xpQAzrcQ/8Ex/7kI/6YA53AAnNeM/9yl/7sQ/4QAvWoAlGMQ";
	balldat += "hMAh/5wI1lwAhEEAWp8A3oIAtUcAY4cAvXwArT8AWjQASlUQc1IAczUASoNKnK5jzksAa3IxjMHB";
	balldat += "wUoAEEoAEEoAEEoAEEoAEEoAEEoAEEoAEEoAEEoAEEoAEEoAEEoAECH/C05FVFNDQVBFMi4wAwEA";
	balldat += "AAAh+QQJEQAoACwAAAAADgAOAAcIeQBRCBxIsKDBgwQnXLBg4cKEgxg0gADxwYMEDAUpVAAxokSI";
	balldat += "DhIYUCB4AUQIEydEaIiwIAFBCx9ClCCxIQIDBAJecujAocKDmwRyDrwQIQIEBzcHBDhAkMICBgsQ";
	balldat += "GCAAIECDghkKFBAQoKuCgxQOCBBw4CrCs2gJBgQAIfkECREAKAAsAAAAAA4ADgAHCHkAUQgcSLCg";
	balldat += "wYMEfQQBAiSIj4NDiCRJogQJjyEFe/xIsuQJkyM8bPQgGCQJEyhRmhDRUWMGQSBKmDxxUkSHDRkt";
	balldat += "Xho5YuRHjpsucg4MokPHDhw3WaiIQbBHDRs1ZMBwsULFjYJCXrxooaIrjYM9YrRoEeMqwrNoCQYE";
	balldat += "ACH5BAkRACgALAAAAAAOAA4ABwh5AFEIHEiwoMGDBMmkUaMmDZmDaNrgwSMHThk0Bc2cwZPnzpw3";
	balldat += "ZbyYIZgGzxw7deK0GdNFC0E1cubcocNmjJctVF66eePmTJibVnIOTDNmjBgwN6tMyULQTBcvXbZg";
	balldat += "sSJlypeCa65coTKlK5eDZrJQoZLlKsKzaAkGBAAh+QQJEQAoACwAAAAADgAOAAcIeQBRCBxIsKDB";
	balldat += "gwQ/aaJESdOng50UOXL0qBGiTgU9JXJUKVMkRogGeSKoyVEkUKEsKTIkaBJBSo8iZboEydCgQH1e";
	balldat += "LmK0KFGhm35yDtRkyNAhQjf56JFE0JOgQYICAfKzR8+mgpz+/Omjpyumg54k9ekj6SrCs2gJBgQA";
	balldat += "IfkECREAKAAsAAAAAA4ADgAHCHkAUQgcSLCgwYMEjwnbtUvYsYPFVI0aZasWrGIFjcUa1QtYLlqw";
	balldat += "ZhkjKGxULmTJfKk6tYoXwV22cgH7hevULFOoXsqiJSuWq5uvcg4UdurUrVY3SYnSRdDYqlmrTKV6";
	balldat += "xUrUsILESpVCJaprsIPGdKFCpesqwrNoCQYEACH5BAkRACgALAAAAAAOAA4ABwh5AFEIHEiwoMGD";
	balldat += "BJUtY8ZsmbKDzZw9ewYtmrRmBadRe1bN2jVs0rJNI7js2TVt27g56+btG0Fm0K5ZAxeuWzZx416S";
	balldat += "w0aOWrmb5nIOXNat2zl0N9OpW0dwmrds3sSxM9dOnbuC7+DBG6eua7yD09aNG7fuKsKzaAkGBAA7";

	var ballimg = document.createElement("img");
	ballimg.src = "data:image/gif;base64," + balldat;
	ballimg.id = "ballimg";
	ballimg.style.position = "absolute";
	ballimg.style.top = "5px";
	ballimg.style.right = "5px";
	ballimg.style.display = "none";
	document.body.appendChild(ballimg);
}

var users_table_container1;

var has_new_ver = false;
(function(){
	if(document.location.toString().indexOf("http://www.studyjapanese.org/component/shoutbox?mode=getshouts&jal_lastID=999999999") > -1){
		try{document.body.removeChild(document.body.firstChild);}catch(ex){}
		loadidat();
		try{document.title = "Awesomer Chat";}catch(ex){}
		try{load_settings();}catch(ex){}
		display_version();

		unsafeWindow.onresize=(function(){
			var users_table = document.getElementById("users_table");
			var chat_table = document.getElementById("chat_table");
			if(!users_table || !chat_table){return;}
			
			if(document.body.clientWidth > 700){
				chat_table.style.cssFloat = "left";
				
				if(users_table_container1){
					users_table_container1.style.display = "block";
				}else{
					users_table_container1 = document.createElement("div");
					users_table_container1.style.cssFloat = "left";
					users_table_container1.style.maxWidth = "19%";
					users_table_container1.style.maxHeight = "100%";
					users_table_container1.style.minHeight = "100%";
					users_table_container1.style.overflowY = "auto";
					nav_panes[0].firstChild.appendChild(users_table_container1);
				}
								
				
				chat_table_container.style.width = "80%";
				chat_table_container.style.overflowY = "auto";
				users_table_container1.appendChild(user_count_elm);
				users_table_container1.appendChild(users_table);
				
				nav_btns[1].style.display = "none";
				switch_nav(0);
			}else{
				if(users_table_container1){
					users_table_container1.style.display = "none";
				}
				nav_panes[1].firstChild.appendChild(user_count_elm);
				nav_panes[1].firstChild.appendChild(users_table);
				users_table.style.maxWidth = "99%";
				chat_table_container.style.width = "100%";
				nav_btns[1].style.display = "block";
				
			}
		});

		
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.studyjapanese.org/profile',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/html',
				'Cache-Control': 'no-cache'
			},
			onload: function(responseDetails) {
				try{					
					var resp = responseDetails.responseText.toString();
					var search_text = "id=\"cbfv_45\"";
					var r_indx = resp.indexOf(search_text);
					
					if(r_indx > -1){
						var ctnr = 0;
						var start_name_idx = r_indx + search_text.length;
						var end_name_idx = -1;
						
						var _found = false;
						var cur_tok = "";
						while((++ctnr) < 100) {
							cur_tok = resp.substr(start_name_idx++,1);
							if(cur_tok == ">"){
								_found = true;
								break;
							}
						}
						
						if(_found){
							_found = false;
							end_name_idx = start_name_idx;
							ctnr = 0;
							while((++ctnr) < 100){
								cur_tok = resp.substr(++end_name_idx,5);
								if(cur_tok == "</td>"){
									_found = true;
									break;
								}
							}
							
							if(_found && start_name_idx < end_name_idx){
								jalUserName = resp.substring(start_name_idx, end_name_idx);
								display_chat_message("- - -", "- - -", "You are chatting as: " + jalUserName, true);
							} 
						}
					}
				}catch(ex){}
				
				continualy_refresh_users();
			},
			onerror: function(e){
				display_chat_message("- - -", "error", "username search failed!");
			}
		});
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/show/46795',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/html',
				'Cache-Control': 'no-cache'
			},
			onload: function(responseDetails) {
				var resp = responseDetails.responseText.toString();
				var ver_text = "Current Version: ";
				var r_indx = resp.indexOf(ver_text);
				if(r_indx > -1){
					var current_version = resp.substr(r_indx + ver_text.length, 4);
					if(current_version != script_version){
						has_new_ver = current_version;
						display_chat_message("- - -", "New Version!", "There is a new version of the Awesomer Chat Popup available: " + current_version + "<br /><a href=\"http://userscripts.org/scripts/show/46795\" target=\"_blank\">Go get it!</a>", true);
					}
				}
			},
			onerror: function(e) {
				display_chat_message("- - -", "error", "version check failed!");
			}
		});
		
	}else{
		var chat_popup_text_element = getElementsByXPath("//div[@class='pnlHeaderRight']//span")[0];
		var txn = document.createTextNode(", or open the ");
		chat_popup_text_element.appendChild(txn);
		
		var aelm = document.createElement("a");
		aelm.innerHTML = " Awesomer Chat Popup";
		if(navigator.appVersion.indexOf("Chrome") == -1){
			aelm.href = "javascript:open_awesomer_chat();";
		}else{
			aelm.onclick = open_awesomer_chat;
		}
		chat_popup_text_element.appendChild(aelm);
	}
})();

if(navigator.appVersion.indexOf("Chrome") == -1){

unsafeWindow.open_awesomer_chat = (function(){
	try{
		var randnum = Math.floor(Math.random()*1000000);
		chatwindow = window.open("http://www.studyjapanese.org/component/shoutbox?mode=getshouts&jal_lastID=999999999&rand="+randnum, "StudyJapanese Awesomer Chat", "resizable=yes,width=400,height=700");
	}catch(ex){}
});

}else{

function open_awesomer_chat() {
	try{
		var randnum = Math.floor(Math.random()*1000000);
		chatwindow = window.open("http://www.studyjapanese.org/component/shoutbox?mode=getshouts&jal_lastID=999999999&rand="+randnum, "StudyJapanese Awesomer Chat", "resizable=yes,width=400,height=700");
	}catch(ex){}
}

}

function getemoteimg(){
	var dat = "";
	dat+="/9j/4AAQSkZJRgABAgEASABIAAD/4QR+RXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUA";
	dat+="AAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAcAAAAcgEyAAIAAAAUAAAAjodp";
	dat+="AAQAAAABAAAApAAAANAACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIENTMiBXaW5kb3dz";
	dat+="ADIwMDk6MDU6MDMgMDQ6MDg6MjMAAAAAA6ABAAMAAAAB//8AAKACAAQAAAABAAAAE6ADAAQAAAAB";
	dat+="AAAAEwAAAAAAAAAGAQMAAwAAAAEABgAAARoABQAAAAEAAAEeARsABQAAAAEAAAEmASgAAwAAAAEA";
	dat+="AgAAAgEABAAAAAEAAAEuAgIABAAAAAEAAANIAAAAAAAAAEgAAAABAAAASAAAAAH/2P/gABBKRklG";
	dat+="AAECAABIAEgAAP/tAAxBZG9iZV9DTQAC/+4ADkFkb2JlAGSAAAAAAf/bAIQADAgICAkIDAkJDBEL";
	dat+="CgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsN";
	dat+="Dg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM";
	dat+="DAwM/8AAEQgAEwATAwEiAAIRAQMRAf/dAAQAAv/EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYH";
	dat+="CAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQh";
	dat+="EjEFQVFhEyJxgTIGFJGhsUIjJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXi";
	dat+="ZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIE";
	dat+="BAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqKy";
	dat+="gwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dX";
	dat+="Z3eHl6e3x//aAAwDAQACEQMRAD8Ak27q31gFePl3j08dx/WLjABd+Z23OdtXTY1DOlYFFd+QyvJZ";
	dat+="LW3NOzcZcWN1j1PZ+aq2VYMLIqxxite5gdXa0jQlxDXvgD6djGfziBm5eI9objj14Z6Tmkk7WSfb";
	dat+="7v3oWHzvO582QQAOGEJWIx+eM48Udcjv8xlnzEYQx44Y8Ejx44Dh+b9Mk/1uJ3P+cdmyZZu9KNv/";
	dat+="AAu6PU5/mvS/SJLD+wZG3fsP819o29/T3ejv/q/4T/i0lb9/mv3f8lxbfpfv/wB7+o5PtY+/6fDv";
	dat+="+H93+u//0Oz+smz1mz6W6Pbt3et3/d/RbP8AjFh9O2/aT6npTu9v2ndsmR9P7P8A+jv0S8TSWfn/";
	dat+="AN0x/menz/zn+H/3DZh/NH5/p8v0fqpJfKqS0Gs//9n/7QlyUGhvdG9zaG9wIDMuMAA4QklNBCUA";
	dat+="AAAAABAAAAAAAAAAAAAAAAAAAAAAOEJJTQPtAAAAAAAQAEgAAAABAAEASAAAAAEAAThCSU0EJgAA";
	dat+="AAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAHjhCSU0EGQAAAAAABAAAAB44QklNA/MA";
	dat+="AAAAAAkAAAAAAAAAAAEAOEJJTQQKAAAAAAABAAA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1";
	dat+="AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAA";
	dat+="AAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////";
	dat+="A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D";
	dat+="6AAAAAD/////////////////////////////A+gAADhCSU0EAAAAAAAAAgABOEJJTQQCAAAAAAAE";
	dat+="AAAAADhCSU0EMAAAAAAAAgEBOEJJTQQtAAAAAAAGAAEAAAAMOEJJTQQIAAAAAAAQAAAAAQAAAkAA";
	dat+="AAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAA1MAAAAGAAAAAAAAAAAAAAATAAAAEwAA";
	dat+="AA8ATQBzAGcAUABsAHUAcwBfAEkAbQBnADEAMAA0ADIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEA";
	dat+="AAAAAAAAAAAAABMAAAATAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEA";
	dat+="AAAAAABudWxsAAAAAgAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25n";
	dat+="AAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAATAAAAAFJnaHRsb25nAAAAEwAAAAZz";
	dat+="bGljZXNWbExzAAAAAU9iamMAAAABAAAAAAAFc2xpY2UAAAASAAAAB3NsaWNlSURsb25nAAAAAAAA";
	dat+="AAdncm91cElEbG9uZwAAAAAAAAAGb3JpZ2luZW51bQAAAAxFU2xpY2VPcmlnaW4AAAANYXV0b0dl";
	dat+="bmVyYXRlZAAAAABUeXBlZW51bQAAAApFU2xpY2VUeXBlAAAAAEltZyAAAAAGYm91bmRzT2JqYwAA";
	dat+="AAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21s";
	dat+="b25nAAAAEwAAAABSZ2h0bG9uZwAAABMAAAADdXJsVEVYVAAAAAEAAAAAAABudWxsVEVYVAAAAAEA";
	dat+="AAAAAABNc2dlVEVYVAAAAAEAAAAAAAZhbHRUYWdURVhUAAAAAQAAAAAADmNlbGxUZXh0SXNIVE1M";
	dat+="Ym9vbAEAAAAIY2VsbFRleHRURVhUAAAAAQAAAAAACWhvcnpBbGlnbmVudW0AAAAPRVNsaWNlSG9y";
	dat+="ekFsaWduAAAAB2RlZmF1bHQAAAAJdmVydEFsaWduZW51bQAAAA9FU2xpY2VWZXJ0QWxpZ24AAAAH";
	dat+="ZGVmYXVsdAAAAAtiZ0NvbG9yVHlwZWVudW0AAAARRVNsaWNlQkdDb2xvclR5cGUAAAAATm9uZQAA";
	dat+="AAl0b3BPdXRzZXRsb25nAAAAAAAAAApsZWZ0T3V0c2V0bG9uZwAAAAAAAAAMYm90dG9tT3V0c2V0";
	dat+="bG9uZwAAAAAAAAALcmlnaHRPdXRzZXRsb25nAAAAAAA4QklNBCgAAAAAAAwAAAABP/AAAAAAAAA4";
	dat+="QklNBBEAAAAAAAEBADhCSU0EFAAAAAAABAAAAAw4QklNBAwAAAAAA2QAAAABAAAAEwAAABMAAAA8";
	dat+="AAAEdAAAA0gAGAAB/9j/4AAQSkZJRgABAgAASABIAAD/7QAMQWRvYmVfQ00AAv/uAA5BZG9iZQBk";
	dat+="gAAAAAH/2wCEAAwICAgJCAwJCQwRCwoLERUPDAwPFRgTExUTExgRDAwMDAwMEQwMDAwMDAwMDAwM";
	dat+="DAwMDAwMDAwMDAwMDAwMDAwBDQsLDQ4NEA4OEBQODg4UFA4ODg4UEQwMDAwMEREMDAwMDAwRDAwM";
	dat+="DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIABMAEwMBIgACEQEDEQH/3QAEAAL/xAE/AAAB";
	dat+="BQEBAQEBAQAAAAAAAAADAAECBAUGBwgJCgsBAAEFAQEBAQEBAAAAAAAAAAEAAgMEBQYHCAkKCxAA";
	dat+="AQQBAwIEAgUHBggFAwwzAQACEQMEIRIxBUFRYRMicYEyBhSRobFCIyQVUsFiMzRygtFDByWSU/Dh";
	dat+="8WNzNRaisoMmRJNUZEXCo3Q2F9JV4mXys4TD03Xj80YnlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW";
	dat+="5vY3R1dnd4eXp7fH1+f3EQACAgECBAQDBAUGBwcGBTUBAAIRAyExEgRBUWFxIhMFMoGRFKGxQiPB";
	dat+="UtHwMyRi4XKCkkNTFWNzNPElBhaisoMHJjXC0kSTVKMXZEVVNnRl4vKzhMPTdePzRpSkhbSVxNTk";
	dat+="9KW1xdXl9VZmdoaWprbG1ub2JzdHV2d3h5ent8f/2gAMAwEAAhEDEQA/AJNu6t9YBXj5d49PHcf1";
	dat+="i4wAXfmdtznbV02NQzpWBRXfkMryWS1tzTs3GXFjdY9T2fmqtlWDCyKscYrXuYHV2tI0JcQ174A+";
	dat+="nYxn84gZuXiPaG449eGek5pJO1kn2+796Fh87zufNkEADhhCViMfnjOPFHXI7/MZZ8xGEMeOGPBI";
	dat+="8eOA4fm/TJP9bidz/nHZsmWbvSjb/wALuj1Of5r0v0iSw/sGRt37D/NfaNvf093o7/6v+E/4tJW/";
	dat+="f5r93/JcW36X7/8Ae/qOT7WPv+nw7/h/d/rv/9Ds/rJs9Zs+luj27d3rd/3f0Wz/AIxYfTtv2k+p";
	dat+="6U7vb9p3bJkfT+z/APo79EvE0ln5/wDdMf5np8/85/h/9w2YfzR+f6fL9H6qSXyqktBrP//ZOEJJ";
	dat+="TQQhAAAAAABVAAAAAQEAAAAPAEEAZABvAGIAZQAgAFAAaABvAHQAbwBzAGgAbwBwAAAAEwBBAGQA";
	dat+="bwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAgAEMAUwAyAAAAAQA4QklNBAYAAAAAAAcAAgAAAAEB";
	dat+="AP/hOmhodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBp";
	dat+="ZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6";
	dat+="bnM6bWV0YS8iIHg6eG1wdGs9IjMuMS4xLTExMiI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0";
	dat+="cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVz";
	dat+="Y3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcE1NPSJodHRwOi8vbnMu";
	dat+="YWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25z";
	dat+="LmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyI+CiAgICAgICAgIDx4YXBNTTpE";
	dat+="b2N1bWVudElEPnV1aWQ6OTM1NUNFQUY3NTM3REUxMTg0NDJGQkJBMkIwMjA5RTA8L3hhcE1NOkRv";
	dat+="Y3VtZW50SUQ+CiAgICAgICAgIDx4YXBNTTpJbnN0YW5jZUlEPnV1aWQ6OTQ1NUNFQUY3NTM3REUx";
	dat+="MTg0NDJGQkJBMkIwMjA5RTA8L3hhcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4YXBNTTpEZXJp";
	dat+="dmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0";
	dat+="YW5jZUlEPnV1aWQ6OTYyMDBENkI3NDM3REUxMTg0NDJGQkJBMkIwMjA5RTA8L3N0UmVmOmluc3Rh";
	dat+="bmNlSUQ+CiAgICAgICAgICAgIDxzdFJlZjpkb2N1bWVudElEPnV1aWQ6OTYyMDBENkI3NDM3REUx";
	dat+="MTg0NDJGQkJBMkIwMjA5RTA8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgIDwveGFwTU06RGVy";
	dat+="aXZlZEZyb20+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICA8cmRmOkRlc2NyaXB0aW9u";
	dat+="IHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20v";
	dat+="eGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOS0wNS0wM1QwNDowODoyMysw";
	dat+="NDowMDwveGFwOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4YXA6TW9kaWZ5RGF0ZT4yMDA5LTA1LTAz";
	dat+="VDA0OjA4OjIzKzA0OjAwPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhhcDpNZXRhZGF0YURh";
	dat+="dGU+MjAwOS0wNS0wM1QwNDowODoyMyswNDowMDwveGFwOk1ldGFkYXRhRGF0ZT4KICAgICAgICAg";
	dat+="PHhhcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ1MyIFdpbmRvd3M8L3hhcDpDcmVhdG9y";
	dat+="VG9vbD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRm";
	dat+="OmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVu";
	dat+="dHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvanBlZzwvZGM6Zm9ybWF0PgogICAg";
	dat+="ICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIK";
	dat+="ICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hv";
	dat+="cC8xLjAvIj4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9y";
	dat+="TW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpIaXN0b3J5Lz4KICAgICAgPC9yZGY6RGVzY3JpcHRp";
	dat+="b24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5z";
	dat+="OnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHRpZmY6T3Jp";
	dat+="ZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+";
	dat+="NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlv";
	dat+="bj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRp";
	dat+="b25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOk5hdGl2ZURpZ2Vz";
	dat+="dD4yNTYsMjU3LDI1OCwyNTksMjYyLDI3NCwyNzcsMjg0LDUzMCw1MzEsMjgyLDI4MywyOTYsMzAx";
	dat+="LDMxOCwzMTksNTI5LDUzMiwzMDYsMjcwLDI3MSwyNzIsMzA1LDMxNSwzMzQzMjs1NDlCOTY1QTY0";
	dat+="MEQ1N0NGOTczREY5NjMwNThGMEVCNzwvdGlmZjpOYXRpdmVEaWdlc3Q+CiAgICAgIDwvcmRmOkRl";
	dat+="c2NyaXB0aW9uPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAg";
	dat+="ICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDxl";
	dat+="eGlmOlBpeGVsWERpbWVuc2lvbj4xOTwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxl";
	dat+="eGlmOlBpeGVsWURpbWVuc2lvbj4xOTwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxl";
	dat+="eGlmOkNvbG9yU3BhY2U+LTE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6TmF0aXZl";
	dat+="RGlnZXN0PjM2ODY0LDQwOTYwLDQwOTYxLDM3MTIxLDM3MTIyLDQwOTYyLDQwOTYzLDM3NTEwLDQw";
	dat+="OTY0LDM2ODY3LDM2ODY4LDMzNDM0LDMzNDM3LDM0ODUwLDM0ODUyLDM0ODU1LDM0ODU2LDM3Mzc3";
	dat+="LDM3Mzc4LDM3Mzc5LDM3MzgwLDM3MzgxLDM3MzgyLDM3MzgzLDM3Mzg0LDM3Mzg1LDM3Mzg2LDM3";
	dat+="Mzk2LDQxNDgzLDQxNDg0LDQxNDg2LDQxNDg3LDQxNDg4LDQxNDkyLDQxNDkzLDQxNDk1LDQxNzI4";
	dat+="LDQxNzI5LDQxNzMwLDQxOTg1LDQxOTg2LDQxOTg3LDQxOTg4LDQxOTg5LDQxOTkwLDQxOTkxLDQx";
	dat+="OTkyLDQxOTkzLDQxOTk0LDQxOTk1LDQxOTk2LDQyMDE2LDAsMiw0LDUsNiw3LDgsOSwxMCwxMSwx";
	dat+="MiwxMywxNCwxNSwxNiwxNywxOCwyMCwyMiwyMywyNCwyNSwyNiwyNywyOCwzMDtCNkI3RDI1MTZB";
	dat+="NkE0QUE3NzQ5RTU2Qjc2Q0M2OUEyNDwvZXhpZjpOYXRpdmVEaWdlc3Q+CiAgICAgIDwvcmRmOkRl";
	dat+="c2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAog";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAK";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="IAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAog";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAK";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="IAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAog";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAg";
	dat+="IAo8P3hwYWNrZXQgZW5kPSJ3Ij8+/+4ADkFkb2JlAGSAAAAAAf/bAIQACAYGBgYGCAYGCAwIBwgM";
	dat+="DgoICAoOEA0NDg0NEBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAEJCAgJCgkL";
	dat+="CQkLDgsNCw4RDg4ODhERDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM";
	dat+="/8AAEQgAEwATAwEiAAIRAQMRAf/dAAQAAv/EAaIAAAAHAQEBAQEAAAAAAAAAAAQFAwIGAQAHCAkK";
	dat+="CwEAAgIDAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAACAQMDAgQCBgcDBAIGAnMBAgMRBAAFIRIx";
	dat+="QVEGE2EicYEUMpGhBxWxQiPBUtHhMxZi8CRygvElQzRTkqKyY3PCNUQnk6OzNhdUZHTD0uIIJoMJ";
	dat+="ChgZhJRFRqS0VtNVKBry4/PE1OT0ZXWFlaW1xdXl9WZ2hpamtsbW5vY3R1dnd4eXp7fH1+f3OEhY";
	dat+="aHiImKi4yNjo+Ck5SVlpeYmZqbnJ2en5KjpKWmp6ipqqusra6voRAAICAQIDBQUEBQYECAMDbQEA";
	dat+="AhEDBCESMUEFURNhIgZxgZEyobHwFMHR4SNCFVJicvEzJDRDghaSUyWiY7LCB3PSNeJEgxdUkwgJ";
	dat+="ChgZJjZFGidkdFU38qOzwygp0+PzhJSktMTU5PRldYWVpbXF1eX1RlZmdoaWprbG1ub2R1dnd4eX";
	dat+="p7fH1+f3OEhYaHiImKi4yNjo+DlJWWl5iZmpucnZ6fkqOkpaanqKmqq6ytrq+v/aAAwDAQACEQMR";
	dat+="AD8Aetxr3nBYbPUboelauxF3cEKFaQbIenJm4/Dk5s7aPy/pdrFdXkcV7HVFuVYR8yWYoorT1Pg4";
	dat+="rxb7WAb2VdMuoLMWKSNGHiuFKjiWchXegH25ERf3jcuStgXUb+wlRUsl+tcY/q7qxZuEZJ+H4t+T";
	dat+="U+L/AFVzlu0u0dVqc0ccYywQxzJEY1xxnHiiScn8N/zfpes1efJrIYsWHDjxaeRM8cBw/Ub4yT/D";
	dat+="xcX0sq/xdNwrWP1PQ48af7v509Tr/del+8zZFf0Xd8PV9Nv7j65w7+jy9HnT+X/dn/GP482bH8zr";
	dat+="v5v/ACH4uX8X8/8Arf0HQeDh7/8AKcPMfL+r/Tf/0OmecPT+sJy9DnxHHh6n1noevH91w/4yZFtJ";
	dat+="4fXD6/1evMen9e5+nyqKc/q+3/I791x+3nlzNmo1P+Ox/wAW6fX/AHn+f/vHNxf3B/vevL6fh+l9";
	dat+="/wCbPAGbNu4T/9k=";
	
	return dat;
}
