//
//
// ==UserScript==
// @name          Dirty Tooltip
// @namespace     http://dirty.ru/
// @description   Dirty Tooltip
// @include       http://www.dirty.ru/*
// @include       http://dirty.ru/*
// @exclude       http://www.dirty.ru/users/*
// @exclude       http://dirty.ru/users/*
// ==/UserScript==

var dup_showing = 0;
var dup_processing = 0;
var dup_settings = dup_check_cookie('tooltip');
var dup_check_change_pictures = 0;

if(dup_settings!==0){

	var dup_pictures = unescape(dup_settings).split('=')[1];
}
else{
	var dup_pictures = 1;	

}

function dup_showBaloon(obj){

	var dup_div = document.getElementById("dup_show_div");
	if(!dup_div){
		document.body.appendChild(dup_div = document.createElement('div'));
		dup_div.id = 'dup_show_div';
		dup_div.style.position = 'absolute';
		dup_div.style.top = '20px';
		dup_div.style.left = '20px';
		dup_div.style.zIndex = '1300';

		document.addEventListener('click',function(e){dup_div.style.display="none"},true);

		dup_check_change_pictures = 1;
	}

	if(dup_check_change_pictures==1){
		if(dup_pictures==1){
			dup_div.innerHTML = '<input type="hidden" id="dup_current_id" value=""><table cellspacing="0" cellpadding="0" border="0"><tr><td width="20" height="35" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png)"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px 0"><div style="width:100px;height:35px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:-20px 0"></div></td><td width="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right top"></td></tr><tr><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 -35px"></td><td style="background-color:#fff;font-size:10px;padding:0 10px 15px 0;line-height:16px" id="dup_data_td"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right -35px"></td></tr><tr><td height="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right bottom"></td></tr></table>';
		}
		else{
			dup_div.innerHTML = '<input type="hidden" id="dup_current_id" value=""><div style="border-right:1px solid #a1a1a1;border-bottom:1px solid #a1a1a1"><div style="background-color:#fff;border:1px solid #505050;font-size:10px;padding:14px;line-height:16px" id="dup_data_td"></div></div>';
		}
		dup_check_change_pictures = 0;
	}

	if(document.getElementById("dup_current_id").value!=obj.toString()){

		dup_div.style.display = "none";

		if(dup_pictures==1){
			document.getElementById("dup_data_td").innerHTML = '<center><div style="width:150px;height:60px;background-repeat:no-repeat;background-position:center;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-023914-a435e3f34c6e355b6bef6594195f3bd7.gif)">&nbsp;</div></center>';
		}
		else{
			document.getElementById("dup_data_td").innerHTML = '<center><div style="width:150px;height:60px;line-height:60px">...</div></center>';
		}
		dup_processing = 1;
		dup_getData(obj);
	}

	var dup_pos = dup_getPos(obj);
	var dup_leftOffset = (dup_pictures==1)?35:10;

	dup_showing = setTimeout("document.getElementById('dup_show_div').style.display='block'",700);
	dup_div.style.top = (dup_pos.y+obj.offsetHeight+5)+'px';
	dup_div.style.left = (dup_pos.x-dup_leftOffset)+'px';
}

function dup_getData(obj){

	if(dup_processing!=0){

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET",obj.toString(),true);
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			if(xmlhttp.status==200){
				var dup_user_id = obj.toString().split('/');
				dup_user_id = dup_user_id[dup_user_id.length-1];

				dup_text = xmlhttp.responseText;

				var dup_date = dup_text.split('<span>с нами с ')[1].split(' года')[0];
				var dup_karma = dup_text.split('<span class="rating"><em>')[1].split('</em>')[0];
				var dup_pluses = dup_text.split('plus voted').length-1;
				var dup_minuses = dup_text.split('minus voted').length-1;

				dup_pluses = (dup_pluses>0)?'<span style="color:green;font-size:9pt"><b>+'+dup_pluses+'</b></span>':0;
				dup_minuses = (dup_minuses>0)?'<span style="color:red;font-size:9pt"><b>-'+dup_minuses+'</b></span>':0;
				
				var dup_votes_him = '';
				if(dup_minuses!==0) dup_votes_him += dup_minuses;
				if(dup_minuses!==0&&dup_pluses!==0) dup_votes_him += ' <span style="color:#ccc">/</span> ';
				if(dup_pluses!==0) dup_votes_him += dup_pluses;

				var dup_name = dup_text.split('<td width="70%" valign="top">')[1].split('<span class="greetings">')[0];
				var dup_country = dup_name.split('<br>')[1];

				var dup_raitdata = dup_text.split('На <a href="/">большом ');
				dup_raitdata = dup_raitdata[dup_raitdata.length-1].split(' комментар')[0];

				var dup_sex = (dup_raitdata.indexOf('она')>0)?'f':'m';
				var dup_raiting = parseInt(dup_raitdata.split('рейтинг ')[1].split(' ')[0]);
				var dup_vote = dup_raitdata.split('и голос ')[1].split(')')[0];
				var dup_posts = parseInt(dup_raitdata.split(', написав')[1].split(' пост')[0]);
				var dup_comments = parseInt(dup_raitdata.split(' пост')[1].split(' комментари')[0].split('и ')[1]);

				dup_name = dup_name.split('<br>')[0];
				dup_name = '<span style="font-size:10pt;color:#'+((dup_sex=='m')?'009ced':'ff4fdc')+'"><b>'+dup_name+'</b></span>';

				dup_votes_him = (dup_votes_him!='')?'<b>Ваша оценка:</b> '+dup_votes_him:'<span style="color:#999"><b>Ваших оценок нет в '+((dup_sex=='f')?'её':'его')+' карме</b></span>';

				var dup_prop = Math.round((dup_raiting/(dup_posts+dup_comments))*10)/10;

				var dup_userpic = '';
				if(dup_pictures==1){
					if(dup_text.indexOf('alt="Dirty Avatar"')>0){
						dup_userpic = dup_text.split('alt="Dirty Avatar"')[0];
						dup_userpic = dup_userpic.split('src="');
						dup_userpic = dup_userpic[dup_userpic.length-1].split('"')[0];
					}
					else if(dup_text.indexOf('#Dirty Avatar#')>0){
						dup_userpic = dup_text.split('#Dirty Avatar#')[1].split('src="')[1].split('"')[0];
					}
					else{
						dup_check_avatar = dup_text.split('<table width="100%" height="300" border="0" cellpadding="3" cellspacing="4" bgcolor="#F8F8F8">')[1].split('</table>')[0];
						if(dup_check_avatar.indexOf('<img')>0){
							dup_userpic = dup_check_avatar.split('src="')[1].split('"')[0];
						}
					}

					if(dup_userpic!='') dup_userpic = '<img src="http://www.amaryllis.nl/cmm/tools/thumb.php?src='+dup_userpic+'&maxw=70&maxh=100" border="0" alt=""><br>';
					else dup_userpic = '<div style="width:75px;height:75px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-074626-d60640dc88fd86bcef83e920d94a8797.png);background-position:'+((dup_sex=='m')?'left':'-75px')+' top">&nbsp;</div>';
				}
				else{
					if(navigator.userAgent.toLowerCase().indexOf('opera')!==false){
						if(dup_sex=='m') dup_userpic = '<div style="width:66px;height:70px;color:#d2dae2;border:1px solid #919191;font-family:Verdana;text-align:center;font-size:50px;line-height:70px">♂</div>';
						else dup_userpic = '<div style="width:66px;height:70px;color:#e2d2d9;border:1px solid #919191;text-align:center;font-size:50px;line-height:70px">♀</div>';
					}
					else{
						if(dup_sex=='m') dup_userpic = '<div style="width:66px;color:#d2dae2;border:1px solid #919191;text-align:center;font-size:4px;line-height:4px"><pre>  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~~~       ~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                  ~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~~                ~~~~~~  '+"\r\n"+'  ~~~~~~~~              ~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~           ~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~                      ~~~~  </pre></div>';
						else dup_userpic = '<div style="width:66px;color:#e2d2d9;border:1px solid #919191;text-align:center;font-size:4px;line-height:4px"><pre>  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~~~       ~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~           ~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                ~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~                    ~~~~~  '+"\r\n"+'  ~~~~~                  ~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~                      ~~~~  '+"\r\n"+'</pre></div>';
						dup_userpic = dup_userpic.split('~').join('█');
					}
				}

				dup_output = '<table cellspacing="0" cellpadding="0" border="0"><tr><td align="center" valign="top" style="padding-right:10px">'+dup_userpic+'<span style="color:#444">№'+dup_user_id+'</span><div style="margin-top:10px;font-size:10px"><b>Регистрация:</b><br>'+dup_date+'</div><div style="margin-top:5px"><b>Карма: <span style="font-size:10pt;color:'+((dup_karma>=0)?'green':'red')+'">'+dup_karma+'</span></b></div></td>';
				dup_output += '<td valign="top"><div style="float:left;margin-bottom:5px">'+dup_name+'<br><span style="font-size:10px"><b>'+dup_country+'</b></span></div>';
				dup_output += '<div style="float:right;margin-left:5px;margin-bottom:5px"><span style="display:block'+((dup_pictures==1)?';background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png);background-repeat:no-repeat':'')+';width:36px;height:20px;font-size:8pt;line-height:20px;text-align:center;color:#fff;background-color:#999"><b>'+dup_prop+'</b></span></div>';
				dup_output += '<div style="clear:both">Автор <b>'+dup_posts+'</b> постов и <b>'+dup_comments+'</b> комментариев<br>Заработал'+((dup_sex=='f')?'а':'')+' голос <span style="font-size:10pt;color:#0069ac"><b>'+dup_vote+'</b></span> и рейтинг '+dup_raiting+'</div>';
				dup_output += '<div style="margin-top:10px">'+dup_votes_him+'</div><div id="dup_his_vote"></div><div id="dup_profile_note" style="margin-top:10px"></div></td></tr></table>';

				document.getElementById("dup_current_id").value = obj.toString();

				var dup_user_name = obj.innerHTML;

				dup_getKarma(dup_output,dup_user_id,dup_sex,dup_user_name);
			}
			else if(xmlhttp.status==404) alert("URL doesn't exist!");
		}
	}
	xmlhttp.send(null);

	}
}

function dup_getKarma(dup_text,dup_user_id,dup_sex,dup_user_name){

	var dup_id = dup_self.split('/');
	dup_id = dup_id[dup_id.length-1];

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", window.location.protocol+'//'+window.location.host+'/'+'karmactl',true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.setRequestHeader('Referer', window.location.href);
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200) {
				var dup_temp = xmlhttp.responseText;

				if(dup_temp.indexOf('{"uid":"'+dup_user_id+'"')>0){

					dup_temp = dup_temp.split('{"uid":"'+dup_user_id+'"')[1].split('","login"')[0].split('"');
					dup_temp = dup_temp[dup_temp.length-1];
					dup_temp = '<b>'+((dup_sex=='f')?'Её':'Его')+' оценка вас: <span style="font-size:9pt;color:'+((dup_temp>0)?'green">+':'red">')+dup_temp+'</span></b>';

					document.getElementById("dup_his_vote").innerHTML = dup_temp;
					
				}
				else document.getElementById("dup_his_vote").innerHTML = '<span style="color:#999"><b>Е'+((dup_sex=='f')?'ё':'го')+' оценок нет в вашей карме</b></span>';

				var dup_dn_storage = dup_check_cookie('notepad');

				if(dup_dn_storage!==0) dup_getNote(dup_dn_storage,dup_user_name);
			}
		}
	};
	xmlhttp.send('view='+dup_id);

	document.getElementById("dup_data_td").innerHTML = dup_text;
}

function dup_getPos(el){
	var rv = {x:0,y:0}
	while (el) {
		rv.x += el.offsetLeft;
		rv.y += el.offsetTop;
		el = el.offsetParent;
	}
	return rv;
	
}

function dup_check_cookie(param){

	if(param=='notepad'){
		if(document.cookie.indexOf('d3.notepad.inbox=')>0){
			var dup_temp = document.cookie.split('d3.notepad.inbox=');
			dup_temp = dup_temp[1].split(";");
			return dup_temp[0];
		}
		else return 0;
	}
	else if(param=='tooltip'){
		if(document.cookie.indexOf('d3.userscript.tooltip=')>0){
			var dup_temp = document.cookie.split('d3.userscript.tooltip=');
			dup_temp = dup_temp[1].split(";");
			return dup_temp[0];
		}
		else return 0;
	}
}

function dup_set_cookie(param){

	if(param.indexOf('tooltip.pictures')!==false){
		param = param.split('=')[1];
		document.cookie = "d3.userscript.tooltip="+escape('picture='+param)+"; domain=.dirty.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
	}
}

function dup_getNote(dup_storage,dup_user_name){

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET",window.location.protocol+'//'+window.location.host+'/'+'my/inbox/'+dup_storage,true);
	xmlhttp.setRequestHeader('Referer',window.location.protocol+'//'+window.location.host+'/my/inbox/');
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4){
			if(xmlhttp.status==200) dup_parseInbox(xmlhttp.responseText,dup_user_name);
		}
	}
	xmlhttp.send(null);
}

function dup_parseInbox(dup_text,dup_user_name){

	dup_user_name = dup_user_name.split('-').join('&#150;');

	if(dup_text.indexOf('<div class="dt"><b>'+dup_user_name)>0){

		var dup_temp = dup_text.split('<div class="dt"><b>'+dup_user_name);
		dup_temp = dup_temp[dup_temp.length-1].split('</div>');
		dup_temp = dup_temp[0];

		var dup_temp_name = dup_temp.split('<br>');
		var dup_temp_body = dup_temp.substring(dup_temp_name[0].length+4,dup_temp.length);
		dup_temp_body_mini = (dup_temp_body.length>32)?dup_temp_body.substring(0,32)+'...':dup_temp_body;

		if(dup_temp_body_mini!=dup_temp_body){
			document.getElementById("dup_profile_note").innerHTML = '<b>Ваша заметка:</b><div style="cursor:help;background-color:#eee;padding:10px;font-size:10pt;font-family:Times New Roman" title="'+dup_temp_body+'"><i>'+dup_temp_body_mini+'</i></div>';
		}
		else{
			document.getElementById("dup_profile_note").innerHTML = '<b>Ваша заметка:</b><div style="background-color:#eee;padding:10px;font-size:10pt;font-family:Times New Roman"><i>'+dup_temp_body_mini+'</i></div>';
		}
	}
}

var dup_self = document.body.innerHTML.split('dirty.ru/users/')[1].split('"')[0];

for(var i=0;i<document.links.length;i++){

	var dup_an = document.links[i].toString();

	if((dup_an.indexOf('dirty.ru/users/')>0&&dup_an.indexOf(dup_self)<0&&dup_an[dup_an.length-1]!='/')||i==13){

			document.links[i].addEventListener('mouseover',function(e){clearTimeout(dup_showing);dup_showBaloon(e.target)},true);
			document.links[i].addEventListener('mouseout',function(){clearTimeout(dup_showing);dup_processing=0},true);
	}
}

var dup_left_panel = document.getElementsByTagName('div')[15];

dup_left_panel.innerHTML += '<br><div style="margin-left:2px;width:138px;height:32px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/25/11119-072727-8afcce4a341c15e9087e0732cab9dbad.png);background-repeat:no-repeat;background-position:5px 8px;background-color:#ededed"><a id="dup_setting_link" style="font-size:11px;font-family:Arial;cursor:pointer;line-height:32px;text-decoration:underline;margin-left:29px">Настройки плюшек</a></div><div id="dup_settings_detail" style="margin:10px 0 0 10px;display:none;font-size:8pt;font-family:Arial;color:#515151"><div style="margin-right:10px;float:left"><input id="dup_checkbox_picture" type="checkbox" '+((dup_pictures==0)?'checked="checked"':'')+'></div><div style="float:left;width:100px">Dirty Tooltip без картинок</div><div style="clear:both;height:10px"></div><div style="background-color:#ededed;width:138px;height:10px;margin-left:-8px"></div></div>';

document.getElementById("dup_setting_link").addEventListener('click',function(){var dup_temp=document.getElementById("dup_settings_detail");if(dup_temp.style.display=="block"){dup_temp.style.display="none";}else{dup_temp.style.display="block";}},true);
document.getElementById("dup_checkbox_picture").addEventListener('click',function(){var dup_temp=document.getElementById("dup_checkbox_picture");dup_check_change_pictures = 1;if(dup_temp.checked===true){dup_pictures=0;dup_set_cookie('tooltip.pictures=0');}else{dup_pictures=1;dup_set_cookie('tooltip.pictures=1');}},false);
