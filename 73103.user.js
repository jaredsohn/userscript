// ==UserScript==
// @name           Mafia Wars Wall Auto Help
// @namespace      http://userscripts.org/users/aidas
// @include        http://www.facebook.com/home.php?*
// @require        http://www.biti.lt/mw2/mwwah_config.js
// @require        http://www.biti.lt/mw2/mwwah_images.js
// @require        http://www.biti.lt/mw2/mwwah_core.js
// @resource       styles http://www.biti.lt/mw2/mwwah_style.css
// @version        2.0.16
// @author         Aidas Josas
// @contributor    Zizzo Lavand
// @contributor    Dan D
// @contributor    Donatas Kazlauskas
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];
style = document.createElement('style');
style.type = 'text/css';
var styles = GM_getResourceText('styles');
style.innerHTML = styles;
head.appendChild(style);

window.addEventListener('load', function(e) {
	if (GM_getValue('autoplayer','') == ''){
		loadingDialog1();
	}else{
		loadingDialog();
		runApplication();
	}
}, false);

function loadingDialog1(){
	var loading_content = mwwah_createElement('div',null,null);
	var loading_text = mwwah_createElement('div',loading_content,{'class':'loading-text'});
	loading_text.innerHTML = 'Do you use <b>"Facebook Mafia Wars Autoplayer"</b>?<br><span class="note">At these settings you will be able amended during settings.</span>'
	var buttons = {0:{'name':'Yes','action':'unsafeWindow.useAutoplayer()'},1:{'name':'No','action':'unsafeWindow.notuseAutoplayer()'}};
	showDialog(this,400,'Autoplayer',loading_content,buttons,null,true);
}

function loadingDialog(){
	var loading_content = mwwah_createElement('div',null,null);
	var loading_text = mwwah_createElement('div',loading_content,{'class':'loading-text'});
	loading_text.innerHTML = 'If you see the loading took too long, click the button below.<br>Hopefully this should help.'
	actionlog_buttons_pannel = mwwah_createElement('div',loading_content,{'class':'dialog-buttons-pannel1'});
	dialog_buttons = mwwah_createElement('button',actionlog_buttons_pannel,{'class':'dialog-buttons','action':'resetActionLog()'});
	dialog_buttons.innerHTML = 'Reset&nbsp;&nbsp;&nbsp;<b>Action log</b>';
	dialog_buttons.addEventListener('click',resetActionLog, false);
	var loading = mwwah_createElement('div',loading_content,{'style':'background:url(' + stripURI(_appImg['loader']) + ') center center no-repeat;'});
	loading.innerHTML = '&nbsp;';
	showDialog(this,400,'Loading',loading_content,{},null,false);
}

function resetActionLog(){
	GM_setValue('ActionLog','{}')
	window.location.reload();
}

function runApplication(){
	if (count(fb_users_array) <= 0){
		getFbUserData();
	}else{
		setLayouts();
		category_array = GM_getValue('category_array','') != '' ? GM_getValue('category_array','').split(',') : new Array() ;
		wall_action_array = JSON.parse(GM_getValue('ActionLog','{}'));
		if (document.getElementById('home_stream') != undefined){
			mwwah_display(GM_getValue('position','home_stream'),'home_stream');
		}else{
			if (GM_getValue('position','home_stream') == 'home_stream'){
				mwwah_display(GM_getValue('position','home_stream'),'contentArea');
			}else{
				mwwah_display(GM_getValue('position','home_stream'),'rightCol');
			}
		}
		mwwah_userInfo();
	}
}

function loadWallEvents(){
	var url = app_links.link + '?' + app_links.query.replace("{0}", asd);
	var ts = '';
	GM_xmlhttpRequest({
		url:url,
		method:'get',
		onload:function(response){
			eval('var wall_response_array = ' + response.responseText.split('for (;;);')[1] + ';');
			if (wall_response_array != undefined){
				if (wall_response_array.payload != undefined){
					var wall_events_obj = mwwah_createElement('div',null,null);
					wall_events_obj.innerHTML = wall_response_array.payload.html;
					var wall_events_array = getChildElementsByClassName(wall_events_obj,'uiStreamStory');
//					var wall_events_array = getChildElementsByClassName(wall_events_obj,'UIStory');
					for ( var i in wall_events_array ){
						ts = timestamp().toString();
						var tmp_array = {'user':{'name':'','link':'','photo':''},'action':{'query':{'ztrack_category':''},'store':''},'timestamp':ts,'time':currentTime(),'sendkey':'','done':0};
//						if (getChildElementsByClassName(wall_events_array[i],'UIMediaItem')[0] != undefined){
						if (getChildElementsByClassName(wall_events_array[i],'uiStreamAttachments')[0] != undefined){
							tmp_array['user'] = {
								'link':wall_events_array[i].getElementsByTagName('a')[0].getAttribute('href').replace(/&amp;/g,'&'),
								'name':wall_events_array[i].getElementsByTagName('a')[0].getElementsByTagName('img')[0].getAttribute('alt'),
								'photo':wall_events_array[i].getElementsByTagName('a')[0].getElementsByTagName('img')[0].getAttribute('src').replace(/&amp;/g,'&'),
								'posttime':getChildElementsByClassName(wall_events_array[i],'timestamp')[0].innerHTML
							};
							if (getChildElementsByClassName(wall_events_array[i],'UIStoryAttachment_Copy')[0] != undefined){
								if (getChildElementsByClassName(wall_events_array[i],'UIStoryAttachment_Copy')[0].getElementsByTagName('div')[0] == undefined){
									var store_string = getChildElementsByClassName(wall_events_array[i],'UIStoryAttachment_Copy')[0].innerHTML
								}else{
									var store_string = getChildElementsByClassName(wall_events_array[i],'UIStoryAttachment_Copy')[0].getElementsByTagName('div')[0].innerHTML
								}
							}else{
								var store_string = 'Store undefined';
							}
							tmp_array['action'] = {
//								'query':getArgs(getChildElementsByClassName(wall_events_array[i],'UIMediaItem')[0].getElementsByTagName('a')[0].getAttribute('href').replace(/&amp;/g,'&')),
								'query':getArgs(getChildElementsByClassName(wall_events_array[i],'uiStreamAttachments')[0].getElementsByTagName('a')[0].getAttribute('href').replace(/&amp;/g,'&')),
								'store':store_string
							};
							if (tmp_array.action.query.ztrack_category != ''){
//								var aaa = tmp_array.action.cityId != undefined ? tmp_array.action.cityId : '' ;
								if (jobs_citys[tmp_array.action.query.ztrack_category] != undefined){
									var ztrack_category = jobIndex(tmp_array.action.query.cityId != undefined ? tmp_array.action.query.cityId : '');
									tmp_array['action']['query']['ztrack_category'] = ztrack_category;
//									alert(ztrack_category)
								}else{
									var ztrack_category = tmp_array.action.query.ztrack_category
								}
								if (ztrack_category != '' && GM_getValue(ztrack_category,'') == '' && action_view == 1){
									GM_setValue(ztrack_category,'0');
									category_array.push(ztrack_category);
									category_string = category_array.join(',');
									GM_setValue('category_array',category_string);
								}
								if (ztrack_category != '' && help_setting[ztrack_category] != undefined){
									if (GM_getValue(help_setting[ztrack_category].execute,1) == 1 && !findSendkey(wall_action_array,tmp_array.action.query.sendkey)){
										var do_help = true;
										if (help_setting[ztrack_category].execute == 'execute_hitlist'){
											var hitlist_lvl = /level\s(\d+)/.exec(tmp_array.action.store.replace(regex_pattern_wall_message,''));
											if (parseInt(GM_getValue('doHitlist',0)) != 0 && parseInt(GM_getValue('doHitlist',0)) < parseInt(hitlist_lvl[1])){
												do_help = false;
											}
										}
										if (help_setting[ztrack_category].linkchange == true){
											if (mwwah_changeLink(wall_events_array[i],'Collect Your Reward')){
												tmp_array['action']['query'] = getArgs(mwwah_changeLink(wall_events_array[i],'Collect Your Reward'));
											}else if (mwwah_changeLink(wall_events_array[i],'Get a bonus')){
												tmp_array['action']['query'] = getArgs(mwwah_changeLink(wall_events_array[i],'Get a bonus'));
											}
										}
										if (do_help){
											tmp_array['sendkey'] = tmp_array.action.query.sendkey;
											wall_action_array[ts+'_'+tmp_array.action.query.sendkey] = {'primary':new Object,'secondary':new Object};
											wall_action_array[ts+'_'+tmp_array.action.query.sendkey]['primary'] = tmp_array;
										}
									}
								}
							}
						}
					}
				}
			}
		},
		onerror:function(response){
			alert(response.responseText);
		}
	});
	doWallEvents();
}

function doWallEvents(){
	for (var i in wall_action_array){
		if (parseInt(wall_action_array[i].primary.timestamp,10) <= timestamp(43200000) || count(wall_action_array) > 1000){
			delete wall_action_array[i];
		}else 
		if (wall_action_array[i].primary.done == 0){
			wall_action_array[i].primary.done = 1;
			if (log_html_content != null){
				if (log_html_content.getElementsByTagName('div')[0]){
					log_html_content.insertBefore(mwwah_createActionLogRecord(wall_action_array[i],i),log_html_content.getElementsByTagName('div')[0]);
				}else{
					log_html_content.appendChild(mwwah_createActionLogRecord(wall_action_array[i],i));
				}
				var log_element_length = log_html_content.getElementsByTagName('div').length;
				if (log_element_length > parseInt(GM_getValue('log_size', 10),10)){
					log_html_content.removeChild(log_html_content.getElementsByTagName('div')[log_element_length - 1]);
				}
			}if (help_setting[wall_action_array[i].primary.action.query.ztrack_category] != undefined){
				if (help_setting[wall_action_array[i].primary.action.query.ztrack_category].type == 'wars'){
					actionWallWarEvents(i,false);
				}else{
					actionWallEvents(i);
				}
			}else{
				actionWallEvents(i);
			}
		}
	}
}

function actionWallEvents(id){
	var action_link = mwwah_generateActionLink(id);
	document.getElementById('manualylink_' + wall_action_array[id].primary.sendkey).innerHTML = '&nbsp;<a href="' + action_link + '" target="_blank">manually link</a>';
	GM_xmlhttpRequest({
		url:action_link,
		method:'post',
		data:'ajax=1&liteload=1&sf_xw_sig=' + xw_sig + '&sf_xw_user_id=' + xw_user,
		headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
		onload:function(response){
			var response_text = mwwah_plainHTML(response.responseText.toString());
			var user_profile_obj = mwwah_createElement('div',null,null);
			user_profile_obj.innerHTML = response_text;
			var user_profile_html_td = user_profile_obj.getElementsByTagName('td');
			var user_profile_html_div = user_profile_obj.getElementsByTagName('div');
			var array_count = 0;
			var messages_array = new Array();
			for (i = 0; i < user_profile_html_td.length; i++){
				if (user_profile_html_td[i].className == 'message_body'){
					messages_array[array_count] = user_profile_html_td[i].innerHTML;
					array_count++;
				}
			}
			for (i = 0; i < user_profile_html_div.length; i++){
				if (user_profile_html_div[i].id == 'msg_box_div_1'){
					messages_array[array_count] = user_profile_html_div[i].innerHTML;
					array_count++;
				}
			}
			var get_message_array = getMessages(messages_array,wall_action_array[id].primary.sendkey);
			if (get_message_array != null){
				if (messages_array.length > 0){
					if (help_setting[wall_action_array[id].primary.action.query.ztrack_category].execute == 'execute_hitlist'){
						if (parseInt(GM_getValue('view_action_log',1),10) == 1){
							if (document.getElementById('processing_' + wall_action_array[id].primary.sendkey)){
								addClass(document.getElementById('processing_' + wall_action_array[id].primary.sendkey),get_message_array[4]);
								document.getElementById('processing_' + wall_action_array[id].primary.sendkey).innerHTML = '(' + get_message_array[0] + ')';
							}
						}
						wall_action_array[id]['secondary'][1] = {'time':currentTime(),'name':get_message_array[4],'text':get_message_array[0]};
						wall_action_array[id]['secondary'][2] = {'time':currentTime(),'name':'Server response','text':get_message_array[1],'class':get_message_array[4]};
						if (get_message_array[5] == '' && get_message_array[4] == 'success'){
							var user_profile_html_div = user_profile_obj.getElementsByTagName('div');
							var fight_title = getElementsByClassName(user_profile_obj,'div','fightres_title')[0].innerHTML;
							var fight_cash = /(\+|-)([R|C])*([$])*(\d+)/.exec(getElementsByClassName(user_profile_obj,'div','fightres_cash')[0].innerHTML.replace(/,/g,''));
							var fight_experience = /(\d+)/.exec(getElementsByClassName(user_profile_obj,'div','fightres_experience')[0].innerHTML)[1];
							fight_cash[2] = fight_cash[2] != undefined ? fight_cash[2] : '' ;
							var tmp_fight_array = {'title':fight_title,'experience':fight_experience,'money':{'plusminus':fight_cash[1],'currency':fight_cash[2],'total':fight_cash[4]},'extramoney':get_message_array[3]};
							var tmp_money = fight_cash[1] + fight_cash[2] + '$' + fight_cash[4];
							var action_class = fight_title == 'You win!' ? 'success' : 'unsuccess';
							wall_action_array[id]['secondary'][3] = {'time':currentTime(),'name':'Action','text':fight_title,'class':action_class};
							wall_action_array[id]['secondary'][4] = {'time':currentTime(),'name':'Experience','text':fight_experience,'class':action_class};
							wall_action_array[id]['secondary'][5] = {'time':currentTime(),'name':'Money','text':fight_cash[1] + fight_cash[4],'class':action_class};
							wall_action_array[id]['secondary'][6] = {'time':currentTime(),'name':'Extra money','text':get_message_array[3],'class':'success'};
							calculateAction(id,0,0,get_message_array[4],get_message_array[5],get_message_array[6],tmp_fight_array);
						}
					}else if (help_setting[wall_action_array[id].primary.action.query.ztrack_category].execute == 'execute_achievement'){
						if (parseInt(GM_getValue('view_action_log',1),10) == 1){
							if (document.getElementById('processing_' + wall_action_array[id].primary.sendkey)){
								addClass(document.getElementById('processing_' + wall_action_array[id].primary.sendkey),get_message_array[4]);
								document.getElementById('processing_' + wall_action_array[id].primary.sendkey).innerHTML = '(' + get_message_array[0] + ')';
							}
						}
						wall_action_array[id]['secondary'][1] = {'time':currentTime(),'name':get_message_array[4],'text':get_message_array[0]};
						var server_response = getElementsByClassName(user_profile_obj,'div','ach_celeb_message')[0].getElementsByTagName('b')[0].innerHTML;
						wall_action_array[id]['secondary'][2] = {'time':currentTime(),'name':'Server response','text':server_response,'class':get_message_array[4]};
						if (get_message_array[5] == '' && get_message_array[4] == 'success'){
							server_response = getElementsByClassName(user_profile_obj,'div','ach_celeb_block');
							var money = 0, experience = 0;
							if (server_response[0].getElementsByTagName('span')[0].innerHTML != ''){
								money = server_response[0].getElementsByTagName('span')[0].innerHTML.replace('$','').replace(/,/g,'');
								wall_action_array[id]['secondary'][3] = {'time':currentTime(),'name':'Money','text':server_response[0].getElementsByTagName('span')[0].innerHTML.replace('$',''),'class':get_message_array[4]};
							}
							if (server_response[0].getElementsByTagName('span')[1] != undefined){
								experience = server_response[0].getElementsByTagName('span')[1].innerHTML.replace(/(\d+).*/,'$1');
								wall_action_array[id]['secondary'][4] = {'time':currentTime(),'name':'Experience','text':experience,'class':get_message_array[4]};
							}
							if (count(server_response[1].getElementsByTagName('div')) > 0){
								if (server_response[1].getElementsByTagName('div')[0] != '' || server_response[1].getElementsByTagName('div')[0] != ' ' || server_response[1].getElementsByTagName('div')[0] != undefined){
									gained = server_response[1].getElementsByTagName('div')[0].innerHTML+'<br>'+server_response[1].getElementsByTagName('div')[1].innerHTML;
									wall_action_array[id]['secondary'][5] = {'time':currentTime(),'name':'Gained','text':gained,'class':get_message_array[4]};
								}
							}
							
							calculateAction(id,experience,money,get_message_array[4],get_message_array[5],'',null);
						}
					}else if (help_setting[wall_action_array[id].primary.action.query.ztrack_category].execute == 'execute_thanksgivingpromo' || help_setting[wall_action_array[id].primary.action.query.ztrack_category].execute == 'execute_loot_shipment'){
						if (parseInt(GM_getValue('view_action_log',1),10) == 1){
							if (document.getElementById('processing_' + wall_action_array[id].primary.sendkey)){
								addClass(document.getElementById('processing_' + wall_action_array[id].primary.sendkey),get_message_array[4]);
								document.getElementById('processing_' + wall_action_array[id].primary.sendkey).innerHTML = '(' + get_message_array[0] + ')';
							}
						}
						wall_action_array[id]['secondary'][1] = {'time':currentTime(),'name':get_message_array[4],'text':get_message_array[0]};
						wall_action_array[id]['secondary'][2] = {'time':currentTime(),'name':'Server response','text':get_message_array[1],'class':get_message_array[4]};
					}else{
						if (parseInt(GM_getValue('view_action_log',1),10) == 1){
							if (document.getElementById('processing_' + wall_action_array[id].primary.sendkey)){
								addClass(document.getElementById('processing_' + wall_action_array[id].primary.sendkey),get_message_array[4]);
								document.getElementById('processing_' + wall_action_array[id].primary.sendkey).innerHTML = '(' + get_message_array[0] + ')';
							}
						}
						wall_action_array[id]['secondary'][1] = {'time':currentTime(),'name':get_message_array[4],'text':get_message_array[0]};
						wall_action_array[id]['secondary'][2] = {'time':currentTime(),'name':'Server response','text':get_message_array[1],'class':get_message_array[4]};
						if (get_message_array[5] == '' && get_message_array[4] == 'success'){
							wall_action_array[id]['secondary'][3] = {'time':currentTime(),'name':'Experience','text':get_message_array[2],'class':'success'};
							wall_action_array[id]['secondary'][4] = {'time':currentTime(),'name':'Money','text':get_message_array[3],'class':'success'};
						}
						calculateAction(id,get_message_array[2],get_message_array[3],get_message_array[4],get_message_array[5],'',null);
					}
				}else{
					if (parseInt(GM_getValue('view_action_log',1),10) == 1){
						if (document.getElementById('processing_' + wall_action_array[id].primary.sendkey)){
							addClass(document.getElementById('processing_' + wall_action_array[id].primary.sendkey),'unsuccess');
							document.getElementById('processing_' + wall_action_array[id].primary.sendkey).innerHTML = '(Server error)';
						}
					}
					wall_action_array[id]['secondary'][1] = {'time':currentTime(),'name':'unsuccess','text':'Failure'};
					wall_action_array[id]['secondary'][2] = {'time':currentTime(),'name':'Server error','text':'No answer from server'};
				}
//				var match = response.responseText.toString().split(/ele.text.*\"(.*)\"/g);
				var match = response.responseText.toString().split(/user_fields\[.*\].*\"(.*?)\"/g);
				mwwah_savegetData(id,user_profile_obj,match);
			}
		}
	});
}

function actionWallWarEvents(id,action,action_link){
	if (action_link == undefined){
		var action_link = mwwah_generateActionLink(id);
		document.getElementById('manualylink_' + wall_action_array[id].primary.sendkey).innerHTML = '&nbsp;<a href="' + action_link + '" target="_blank">manually link</a>';
	}
	GM_xmlhttpRequest({
		url:action_link,
		method:'post',
		data:'ajax=1&liteload=1&sf_xw_sig=' + xw_sig + '&sf_xw_user_id=' + xw_user,
		headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
		onload:function(response){
			var response_text = mwwah_plainHTML(response.responseText.toString());
			var user_profile_obj = mwwah_createElement('div',null,null);
			user_profile_obj.innerHTML = response_text;
			if (action == true){
				var user_profile_html_td = user_profile_obj.getElementsByTagName('td');
				var array_count = 0;
				for (i = 0; i < user_profile_html_td.length; i++){
					if (user_profile_html_td[i].className == 'message_body'){
						wars_array[id].messages.push(user_profile_html_td[i].innerHTML);
						array_count++;
					}
				}
				wars_array[id].count = (parseInt(wars_array[id].count) + 1);
				if (wars_array[id].count == wars_array[id].length){
					var get_message_array = getMessages(wars_array[id].messages,wall_action_array[id].primary.sendkey);
					if (parseInt(GM_getValue('view_action_log',1),10) == 1){
						if (document.getElementById('processing_' + wall_action_array[id].primary.sendkey)){
							addClass(document.getElementById('processing_' + wall_action_array[id].primary.sendkey),get_message_array[4]);
							document.getElementById('processing_' + wall_action_array[id].primary.sendkey).innerHTML = '(' + get_message_array[0] + ')';
						}
					}
					wall_action_array[id]['secondary'][1] = {'time':currentTime(),'name':get_message_array[4],'text':get_message_array[0]};
					wall_action_array[id]['secondary'][2] = {'time':currentTime(),'name':'Server response','text':get_message_array[1],'class':get_message_array[4]};
					if (get_message_array[5] == '' && get_message_array[4] == 'success'){
						wall_action_array[id]['secondary'][3] = {'time':currentTime(),'name':'Action','text':capitalize(get_message_array[7]),'class':get_message_array[7]};
						wall_action_array[id]['secondary'][4] = {'time':currentTime(),'name':'Experience','text':get_message_array[2],'class':'success'};
						if (get_message_array[7] == 'won'){
							calculateAction(id,get_message_array[2],get_message_array[3],'success',get_message_array[5],get_message_array[6]);
						}else{
							calculateAction(id,get_message_array[2],get_message_array[3],'unsuccess',get_message_array[5],get_message_array[6]);
						}
					}
				}
			}else{
				var user_var = getElementsByStyles(user_profile_obj,'div',wars_sides[GM_getValue('warSide','right')].user);
				if (count(user_var) == 4){
					var war_array = new Array();
					war_array = getElementsByStyles(user_var[wars_sides[GM_getValue('warSide','right')].top_mafia_count],'div',wars_sides[GM_getValue('warSide','right')].top_mafia);
					war_array.push(user_var[wars_sides[GM_getValue('warSide','right')].count]);
					var war_count = 0;
					var war_links = new Object();
					for (var i in war_array){
						if (war_array[i].getElementsByTagName('a')[0] != undefined){
							var query_array = getArgs(war_array[i].getElementsByTagName('a')[0].getAttribute('href').replace(/&amp;/g,'&'));
							var query_string = '';
							for (var j in query_array){
								query_string += query_string == '' ? '?' + j + '=' + query_array[j] : '&' + j + '=' + query_array[j]
							}
							war_links[war_count] = app_links.mw_link + query_string + '&skip_req_frame=1&sf_xw_user_id=' + xw_user + '&sf_xw_sig=' + xw_sig;
							war_count ++;
						}
					}
					wars_array[id] = {'length':count(war_links),'count':0,'messages':new Array()};
					for (var i in war_links){
						actionWallWarEvents(id,true,war_links[i]);
					}
				}else{
					if (parseInt(GM_getValue('view_action_log',1),10) == 1){
						if (document.getElementById('processing_' + wall_action_array[id].primary.sendkey)){
							addClass(document.getElementById('processing_' + wall_action_array[id].primary.sendkey),'unsuccess');
							document.getElementById('processing_' + wall_action_array[id].primary.sendkey).innerHTML = '(Failure)';
						}
					}
					wall_action_array[id]['secondary'][1] = {'time':currentTime(),'name':'unsuccess','text':'Failure'};
					wall_action_array[id]['secondary'][2] = {'time':currentTime(),'name':'Action','text':'War is over','class':'unsuccess'};
				}
			}
//			var match = response.responseText.toString().split(/ele.text.*\"(.*)\"/g);
			var match = response.responseText.toString().split(/user_fields\[.*\].*\"(.*?)\"/g);
			mwwah_savegetData(id,user_profile_obj,match);
//			mwwah_savegetData(id,user_profile_obj);
		}
	});
}

function calculateAction(id,experience,money,action,boosts,check,obj_array){
	var check_value = check != '' ? GM_getValue(check) :'' ;
	if (obj_array != null){
		setHelpsPoints('hitlist_bounty',1);
		setHelpsPoints('hitlist_experience',parseInt(obj_array.experience,10));
		setHelpsPoints('points_experience',parseInt(obj_array.experience,10));
		setHelpsPoints('hitlist_extramoney',parseInt(obj_array.extramoney.replace(',',''),10));
		if (obj_array.title == 'You win!'){
			var prefix = 'hitlist_winmoney';
		}else if (obj_array.title == 'You lose!'){
			var prefix = 'hitlist_lostmoney';
		}
		if (obj_array.money.currency == 'R'){
			prefix += 'moscow';
		}else if (obj_array.money.currency == 'C'){
			prefix += 'cuba';
		}else{
			prefix += 'ny';
		}
		var money = obj_array.money.plusminus + obj_array.money.total.replace(',','');
		setHelpsPoints(prefix,parseInt(money,10));
	}else if (boosts == '' && help_setting[wall_action_array[id].primary.action.query.ztrack_category].type != 'boosts'){
		for (var i in help_setting[wall_action_array[id].primary.action.query.ztrack_category].fields){
			var field_name = help_setting[wall_action_array[id].primary.action.query.ztrack_category].type;
			if (help_setting[wall_action_array[id].primary.action.query.ztrack_category].city > 0){
				field_name += '_' + help_setting[wall_action_array[id].primary.action.query.ztrack_category].city;
			}
			field_name_percent = field_name + '_';
			field_name += '_' + i;
			if (i == 'percent'){
				var success_percent_value = parseInt(GM_getValue(field_name_percent + 'success_value',0),10);
				var unsuccess_percent_value = parseInt(GM_getValue(field_name_percent + 'unsuccess_value',0),10);
				var success_percent_total = parseInt(GM_getValue(field_name_percent + 'success_total',0),10);
				var unsuccess_percent_total = parseInt(GM_getValue(field_name_percent + 'unsuccess_total',0),10);
				if (parseInt(success_percent_value) != 0 && parseInt(unsuccess_percent_value) != 0){
					var sum = Math.round((100 / (success_percent_value + unsuccess_percent_value)) * success_percent_value);
					GM_setValue(field_name + '_value',sum);
					document.getElementById(field_name + '_value').innerHTML = GM_getValue(field_name + '_value',0) + '%';
				}
				if (parseInt(success_percent_total) != 0 && parseInt(unsuccess_percent_total) != 0){
					var sum = Math.round((100 / (success_percent_total + unsuccess_percent_total)) * success_percent_total);
					GM_setValue(field_name + '_total',sum);
					document.getElementById(field_name + '_total').innerHTML = GM_getValue(field_name + '_total',0) + '%';
				}
			}else if (i == 'experience'){
				setHelpsPoints(field_name,parseInt(experience,10));
				setHelpsPoints('points_experience',parseInt(experience,10));
			}else if (i == 'money'){
				setHelpsPoints(field_name,parseInt(money.toString().replace(',',''),10));
			}else if (i == 'success' || i == 'unsuccess'){
				if (action == i){
					if ((i == 'unsuccess' && check_value != 1) || i == 'success'){
						setHelpsPoints(field_name,1);
					}
				}
			}
		}
	}else if (boosts != ''){
		if (boosts == 'Hot Coffee'){
			setHelpsPoints('boosts_hc',1);
			setHelpsPoints('points_boosts',1);
		}else if(boosts == 'Mutt'){
			setHelpsPoints('boosts_m',1);
			setHelpsPoints('points_boosts',1);
		}else if(boosts == 'Extra Pair of Eyes'){
			setHelpsPoints('boosts_epe',1);
			setHelpsPoints('points_boosts',1);
		}
	}
}

function setHelpsPoints(prefix,points){
	GM_setValue(prefix + '_value',(parseInt(GM_getValue(prefix + '_value',0),10) + points));
	GM_setValue(prefix + '_total',(parseInt(GM_getValue(prefix + '_total',0),10) + points));
	document.getElementById(prefix + '_value').innerHTML = GM_getValue(prefix + '_value',0);
	document.getElementById(prefix + '_total').innerHTML = GM_getValue(prefix + '_total',0);
}

function tab_wallaction(){
	var c_array = GM_getValue('category_array','').split(',');
	var tab_wallaction_content = mwwah_createElement('div',null,{'id':'tab_wallaction_content'});
	var tab_wallaction_table = mwwah_createElement('table',tab_wallaction_content,{'width':'100%','cellspacing':'1','cellpadding':'0','border':'0'});
	var tab_wallaction_tr_1 = mwwah_createElement('tr',tab_wallaction_table,null);
	var tab_wallaction_th_1 = mwwah_createElement('th',tab_wallaction_tr_1,{'align':'left','valign':'middle'});
	tab_wallaction_th_1.innerHTML = 'Category';
	var tab_wallaction_th_2 = mwwah_createElement('th',tab_wallaction_tr_1,{'align':'center','width':'10','valign':'middle'});
	tab_wallaction_th_2.innerHTML = '&nbsp;';
	var tab_wallaction_th_3 = mwwah_createElement('th',tab_wallaction_tr_1,{'align':'center','width':'10','valign':'middle'});
	tab_wallaction_th_3.innerHTML = '&nbsp;';
	var tab_wallaction_th_4 = mwwah_createElement('th',tab_wallaction_tr_1,{'align':'center','width':'10','valign':'middle'});
	tab_wallaction_th_4.innerHTML = '&nbsp;';
	var _tab_wallaction = '';
	if (GM_getValue('category_array','') != ''){
		for (i = 0; i < c_array.length; i++){
			var tab_wallaction_tr_2 = mwwah_createElement('tr',tab_wallaction_table,null);
			var tab_wallaction_td_1 = mwwah_createElement('td',tab_wallaction_tr_2,{'align':'left','valign':'middle','id':c_array[i] + '_1','class':'category' + GM_getValue(c_array[i],'0')});
			tab_wallaction_td_1.innerHTML = c_array[i];
			var tab_wallaction_td_2 = mwwah_createElement('td',tab_wallaction_tr_2,{'align':'center','valign':'middle','id':c_array[i] + '_2','class':'center'});
			var tab_wallaction_cmd_2 = mwwah_createElement('img',tab_wallaction_td_2,{'src':stripURI(_appImg['green']),'alt':'','border':'0','class':'preview','ca':'2','ci':c_array[i]});
			tab_wallaction_cmd_2.addEventListener('click',wallactionClick,false);
			var tab_wallaction_td_3 = mwwah_createElement('td',tab_wallaction_tr_2,{'align':'center','valign':'middle','id':c_array[i] + '_3','class':'center'});
			var tab_wallaction_cmd_3 = mwwah_createElement('img',tab_wallaction_td_3,{'src':stripURI(_appImg['red']),'alt':'','border':'0','class':'preview','ca':'3','ci':c_array[i]});
			tab_wallaction_cmd_3.addEventListener('click',wallactionClick,false);
			var tab_wallaction_td_4 = mwwah_createElement('td',tab_wallaction_tr_2,{'align':'center','valign':'middle','id':c_array[i] + '_4','class':'center'});
			var tab_wallaction_cmd_4 = mwwah_createElement('img',tab_wallaction_td_4,{'src':stripURI(_appImg['blue']),'alt':'','border':'0','class':'preview','ca':'4','ci':c_array[i]});
			tab_wallaction_cmd_4.addEventListener('click',wallactionClick,false);
		}
	}else{
		var tab_wallaction_tr_2 = mwwah_createElement('tr',tab_wallaction_table,null);
		var tab_wallaction_td_1 = mwwah_createElement('td',tab_wallaction_tr_2,{'align':'left','valign':'middle','id':c_array[i] + '_1','class':'category_0','colspan':'4'});
		tab_wallaction_td_1.innerHTML = 'No records at this time!';
	}
	return tab_wallaction_content;
}

function wallactionClick(){
	document.getElementById(this.getAttribute('ci') + '_1').removeAttribute('class');
	document.getElementById(this.getAttribute('ci') + '_1').setAttribute('class','category' + this.getAttribute('ca'));
	GM_setValue(this.getAttribute('ci'),this.getAttribute('ca'));
}

function tab_donate(){
	var _tab_donate = '<div id="tab_donate" class="about">Welcome!<br><br>It took a lot of works To make this script to work. Now it\'s better, faster and more reliable. It\'s freely distributed and it\'s free but if you like the script, I would be very pleased if you donate.<br>Many thanks for your understanding.<br><br></div>';
	return _tab_donate;
}

function donate(){
	var donateWindow = window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8855233', '_blank');
	removeDialog();
}

function tab_settings(){
	var settings_fields_form = mwwah_createElement('form',null,{'id':'setting_form'});
	var tab_setting_container = mwwah_createElement('div',settings_fields_form,{'id':'tab_settings_container'});
	for (var i in tab_setting_fields ){
		var tab_element = mwwah_createElement('div',tab_setting_container,{'class':'tab-content'});
		var tab_element_title = mwwah_createElement('h1',tab_element,{'class':'tab','title':tab_setting_fields[i].name});
		var _tab_element_title = document.createTextNode(tab_setting_fields[i].name);
		tab_element_title.appendChild(_tab_element_title);
		var tab_element_content = mwwah_createElement('p',tab_element,null);
		tab_element_content.appendChild(tabSettingFields(tab_setting_fields[i]));
	}
	return settings_fields_form;
}

function tabSettingFields(fields_array){
	var settings_fields_table = mwwah_createElement('table',null,{'width':'100%','cellspacing':'2','cellpadding':'0','border':'0'});
	for (var i in fields_array.fields){
		if (i == 'array'){
			for (var j in fields_array.fields[i]){
				if (j != 'total'){
					var settings_fields_tr = mwwah_createElement('tr',settings_fields_table,null);
					var settings_fields_td1 = mwwah_createElement('td',settings_fields_tr,{'class':'center','width':'30','valign':'middle','align':'center'});
					var field_attr = new Object;
					field_attr['type'] = 'checkbox';
					field_attr['name'] = fields_array.fields[i][j].execute;
					field_attr['value'] = '1'
					field_attr['id'] = 'checkbox_' + fields_array.fields[i][j].execute;
					if (parseInt(GM_getValue(fields_array.fields[i][j].execute,1),10) == 1){
						field_attr['checked'] = 'checked';
					}
					var settings_fields_checkbox = mwwah_createElement('input',settings_fields_td1,field_attr);
					var settings_fields_td2 = mwwah_createElement('td',settings_fields_tr,{'class':'center','width':'10','valign':'middle','align':'center'});
					settings_fields_td2.innerHTML = '-';
					var settings_fields_td3 = mwwah_createElement('td',settings_fields_tr,{'valign':'middle','align':'left'});
					settings_fields_td3.innerHTML = 'On/Off <b>' + fields_array.fields[i][j].name + '</b>.';
				}
			}
		}else{
			var settings_fields_tr = mwwah_createElement('tr',settings_fields_table,null);
			var settings_fields_td1 = mwwah_createElement('td',settings_fields_tr,{'class':'center','width':'30','valign':'middle','align':'center'});
			if (fields_array.fields[i].attr.type == 'text'){
				var field_attr = new Object;
				for (var j in fields_array.fields[i].attr){
					if (j != 'default'){
						field_attr[j] = fields_array.fields[i].attr[j];
					}
				}
				field_attr['id'] = 'text_' + i;
				var settings_fields_input_text = mwwah_createElement('input',settings_fields_td1,field_attr);
				settings_fields_input_text.value = GM_getValue(i,fields_array.fields[i].attr['default']);
				if (fields_array.fields[i].num == true){
					settings_fields_input_text.addEventListener('keyup',isNumberKey, true);
				}
			}else if (fields_array.fields[i].attr.type == 'checkbox'){
				var field_attr = new Object;
				for (var j in fields_array.fields[i].attr){
					if (j != 'default'){
						field_attr[j] = fields_array.fields[i].attr[j];
					}
				}
				field_attr['id'] = 'checkbox_' + i;
				if (parseInt(GM_getValue(i,fields_array.fields[i].attr['default']),10) == 1){
					field_attr['checked'] = 'checked';
				}
				var settings_fields_checkbox = mwwah_createElement('input',settings_fields_td1,field_attr);
			}else if (fields_array.fields[i].attr.type == 'radio'){
				var field_attr = new Object;
				for (var j in fields_array.fields[i].attr){
					if (j != 'default'){
						field_attr[j] = fields_array.fields[i].attr[j];
					}
				}
				field_attr['id'] = fields_array.fields[i].el_key != undefined ? + '_' + i : i;
//				alert(GM_getValue(fields_array.fields[i].attr.name,fields_array.fields[i].attr['default'])+'__'+i)
				if (GM_getValue(fields_array.fields[i].attr.name,fields_array.fields[i].attr['default']) == i){
					field_attr['checked'] = 'checked';
				}
				var settings_fields_checkbox = mwwah_createElement('input',settings_fields_td1,field_attr);
			}else if (fields_array.fields[i].attr.type == 'blank'){
				settings_fields_td1.innerHTML = '&nbsp;';
			}
			var settings_fields_td2 = mwwah_createElement('td',settings_fields_tr,{'class':'center','width':'10','valign':'middle','align':'center'});
			if (fields_array.fields[i].attr.type == 'blank'){
				settings_fields_td2.innerHTML = '&nbsp;';
			}else{
				settings_fields_td2.innerHTML = '-';
			}
			var settings_fields_td3 = mwwah_createElement('td',settings_fields_tr,{'valign':'middle','align':'left'});
			settings_fields_td3.innerHTML = fields_array.fields[i].label;
			if (fields_array.fields[i].preview != undefined){
				var settings_fields_td4 = mwwah_createElement('td',settings_fields_tr,{'valign':'middle','align':'center','width':'20'});
				var settings_fields_preview = mwwah_createElement('img',settings_fields_td4,{'src':stripURI(_appImg['preview']),'alt':'preview','title':'preview','border':'0','class':'preview','link':stripURI(_appImg[fields_array.fields[i].preview])});
				settings_fields_preview.addEventListener('mouseover',imageMouseover,false);
				settings_fields_preview.addEventListener('mouseout',imageMouseout,false);
				settings_fields_preview.addEventListener('mousemove',imageMousemove,false);
			}
		}
	}
	return settings_fields_table;
}

function saveSettings(){
	var form = document.getElementById('setting_form');
	var formElements = "";
	for (var n=0; n < form.elements.length; n++) {
		if (form.elements[n].type == 'checkbox'){
			if (form.elements[n].checked == true){
				GM_setValue(form.elements[n].name,1);
			}else{
				GM_setValue(form.elements[n].name,0);
			}
		}else if (form.elements[n].type == 'text'){
			GM_setValue(form.elements[n].name,form.elements[n].value);
		}else if (form.elements[n].type == 'radio' && form.elements[n].checked == true){
			GM_setValue(form.elements[n].name,form.elements[n].value);
		}
	}
	var buttons = {0:{'name':'OK','action':'removeDialog()'}};
	setLayouts();
	removeDialog();
	showDialog(this,200,'Notification','Settings has been saved.',buttons,'confirmation',true);
	if (document.getElementById('home_stream') != undefined){
		mwwah_display(GM_getValue('position','home_stream'),'home_stream');
	}else{
		mwwah_display(GM_getValue('position','home_stream'),'contentArea');
	}
//	mwwah_display(GM_getValue('position','home_stream'));
	mwwah_userInfo();
}

function useAutoplayer(){
	GM_setValue('autoplayer','yes');
	removeDialog();
	loadingDialog();
	runApplication();
}

function notuseAutoplayer(){
	GM_setValue('autoplayer','no');
	removeDialog();
	loadingDialog();
	runApplication();
}

function setLayouts(){
	if (document.getElementById('home_stream') != undefined){
		var layout_array = tab_setting_fields.layouts.fields;
	}else{
		var layout_array = nl_tab_setting_fields.layouts.fields;
	}
	for (var i in layout_array){
//		alert(document.getElementById(i))
//				alert(document.getElementById(i)+'____'+document.getElementById(i).value)
		if(document.getElementById(i) != null && document.getElementById(i) != ''){
			if (layout_array[i].childs != undefined){
				for (j = 0; j < document.getElementById(i).childNodes.length; j++){
					if (document.getElementById(i).childNodes[j].style != undefined){
						if (document.getElementById(i).childNodes[j].id != GM_getValue('position','home_stream')){
							if (parseInt(GM_getValue(layout_array[i].tab_setting_fields,tab_setting_fields.layouts.fields[layout_array[i].tab_setting_fields].attr['default'])) == 1){
								document.getElementById(i).childNodes[j].style.display = 'block';
								if (i == 'rightCol'){
									document.getElementById('mainContainer').style.borderWidth = '1px';
								}
							}else{
								document.getElementById(i).childNodes[j].style.display = 'none';
								if (i == 'rightCol'){
									document.getElementById('mainContainer').style.borderWidth = '0px';
								}
							}
						}
					}
				}
			}else{
				if (parseInt(GM_getValue(layout_array[i].tab_setting_fields,tab_setting_fields.layouts.fields[layout_array[i].tab_setting_fields].attr['default'])) == 1){
					document.getElementById(i).style.display = 'block'
					if (layout_array[i].margin != undefined){
						document.getElementById(layout_array[i].margin).style.marginLeft = '0px';
					}
					if (i == 'pageHead'){
						document.getElementById('blueBar').style.display = 'block';
					}else if (i == 'leftCol'){
						document.getElementById('contentCol').style.borderWidth = '1px';
					}
				}else{
					document.getElementById(i).style.display = 'none'
					if (layout_array[i].margin != undefined){
						if (document.getElementById('home_stream') != undefined){
							document.getElementById(layout_array[i].margin).style.marginLeft = '126px';
						}
					}
					if (i == 'pageHead'){
						document.getElementById('blueBar').style.display = 'none';
					}else if (i == 'leftCol'){
						document.getElementById('contentCol').style.borderWidth = '0px';
					}
				}
			}
		}
	}
}

function tab_about(){
	var _tab_about = '<div id="tab_about" class="about">';
	for ( var i in app_setting ){
		if (i != 'url'){
			_tab_about += '<div><b>' + app_setting[i].title + ':</b>&nbsp;' + app_setting[i].value + '</div>';
		}
	}
	return _tab_about;
}

function checkUpdates(){
	var parent_obj = document.getElementById('tab_about');
	var about_hr = mwwah_createElement('hr',parent_obj,null);
	var about_loading = mwwah_createElement('div',parent_obj,{'style':'background:url(' + stripURI(_appImg['loader']) + ') center center no-repeat;'});
	about_loading.innerHTML = '&nbsp;';
	GM_xmlhttpRequest({
		method:'GET',
		url:app_setting.url + '?source',
		onload:function(response){
			if (response.status != 200){
				return;
			}
			var r_version = response.responseText.match(/@version\s+([\d.]+)/)? RegExp.$1 :'';
			if (r_version != app_setting.version.value) {
				var message = 'Version <b>' + r_version + '</b> is available!<br>If you want to upgrade click <a href="' + app_setting.url + '">here</a>.';
			} else {
				var message = 'You already have the latest version.';
			}
			about_loading.style.background = 'none';
			about_loading.innerHTML = message;
		}
	});
}