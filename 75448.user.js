// ==UserScript==
// @name          HWM_Topic_Coloring
// @description   HWM_Topic_Coloring
// @author        HAPblB
// @version 0.0.2
// @include        http://www.heroeswm.ru/forum_thread.php*
// @namespace HWM
// ==/UserScript==


var cssStyle = "";
cssStyle += ".forum_options {height: 16px;FONT-SIZE: 10px;BORDER-RIGHT:#020202 2px solid ; BORDER-TOP: #020202 2px solid ;  VERTICAL-ALIGN: top; BORDER-LEFT:#020202 2px solid ;  BORDER-BOTTOM:#020202 2px solid ; cursor: pointer; }";
cssStyle += ".forum_options_div {visibility = 'hidden'; position = 'absolute'; borderStyle = 'solid'; borderColor = '#000000'; borderWidth = '2px'; padding = '0px'; zIndex = '3'; }";
cssStyle += ".forum_options_div_visible {visibility = 'visible'; position = 'absolute'; borderStyle = 'solid'; borderColor = '#000000'; borderWidth = '2px'; padding = '0px'; zIndex = '3';  }";
GM_addStyle(cssStyle);




var all_td_Elements, this_td_Element;
	all_td_Elements = document.getElementsByTagName('td');
	var link2forum=/\&gt\;<\/a><\/center>/;
	var td_len = all_td_Elements.length;
	var my_td;
	for (var i = 0; i < td_len; i++) {
		my_td = all_td_Elements[i];
		if(my_td.innerHTML.match(link2forum)){ 
			
			my_td.innerHTML = makeOptions(my_td.innerHTML);
			var new_img=document.createElement('span');
			
			new_img.innerHTML="Topics Coloring";
			new_img.className="forum_options";
			document.getElementById('forum_opt').appendChild(new_img);
			var newdiv = document.createElement('div');
			document.body.appendChild(newdiv);
			with (newdiv.style) {
	visibility = 'hidden';
	position = 'absolute';
	borderStyle = 'solid';
	borderColor = '#000000';
	borderWidth = '2px';
	padding = '0px';
	zIndex = '3';
	left = '0';
	top = '0';
}
			
			
			new_img.addEventListener('click', function(e) {
		e.preventDefault();
		if (newdiv.style.visibility == 'hidden') {
			newdiv.style.left = e.clientX + 5;
			newdiv.style.top = e.clientY + 5;
			newdiv.style.visibility = 'visible';
		} else {
			newdiv.style.visibility = 'hidden';
		};
		makeOptionsContent();
	}, false);
	
	
			break;
		} 	
	}
	
function makeOptionsContent(){
var writesel=writeSelect();
var result_content="";
result_content+='<table cellspacing=0 cellpadding=0 border=0 bgcolor="#ddd9cd"><tbody>';
result_content+='<tr>';
result_content+='<th >Player</th>';
result_content+='<th >Color</th>';
result_content+='<th >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id=close_options style="cursor:pointer;" >X</span></th>';
result_content+='</tr>';



result_content+='<tr id=adding_user>';

result_content+='<td width=140><input id=pl_id type=input ></td>';
result_content+='<td width=84>'+writesel+'</td>';
result_content+='<td><input type=button  style="width: 96px" value=Add id=add_pl></td>';


result_content+='</tr><tr><td colspan=3><div id=each_users_settings></div></td></tbody></table>';



newdiv.innerHTML=result_content;
document.getElementById('main_select').addEventListener('change', function() {this.style.background=this.value},false);
document.getElementById('close_options').addEventListener('click', function() {if (newdiv.style.visibility == 'hidden') {newdiv.style.visibility = 'visible';} else {newdiv.style.visibility = 'hidden';}}, false);
document.getElementById( 'add_pl' ).addEventListener( "click", add_cur_set , false );
div_inner_redraw();

}

function div_inner_redraw(){
var user_options=GM_getValue('forum_options','');
if (user_options!='')
	{
	var saved_settings=user_options.split('|');
	var trss=document.getElementById('each_users_settings');
	trss.innerHTML='';
		for(var v=0;v<saved_settings.length;v++)
			{
			var each_set=saved_settings[v].split(':');
			
			var tr_each=document.createElement('div');
			var divinner='';
			divinner+='<input readonly value='+decodeURIComponent(each_set[0])+' style="background: '+each_set[1]+'">';
			divinner+=writeSelect(v,each_set[1]);
			divinner+='<input type=button value=Save id="saveuser_'+v+'" >';
			divinner+='<input type=button value=Del id="deluser_'+v+'" >';
				tr_each.innerHTML=divinner;
						
			document.getElementById('each_users_settings').appendChild(tr_each);
			}
	} else document.getElementById('each_users_settings').innerHTML='';

var inputs=document.getElementsByTagName('input');
for(var t=0;t<inputs.length;t++)
{
	if(inputs[t].getAttribute('type')=='button'&&inputs[t].getAttribute('value')=='Del'){inputs[t].removeEventListener('click',deleteUser,false);inputs[t].addEventListener('click',deleteUser,false);}
	if(inputs[t].getAttribute('type')=='button'&&inputs[t].getAttribute('value')=='Save'){inputs[t].removeEventListener('click',changeUser,false);inputs[t].addEventListener('click',changeUser,false);}
}
	
}
function deleteUser(){
var user_count=parseInt(this.id.split('_')[1]);
var user_options=GM_getValue('forum_options','');
var saved_settings=user_options.split('|');
var new_users='';
for(n in saved_settings)
	if(n!=user_count){
	new_users+=saved_settings[n];
	if(n<saved_settings.length-1)new_users+='|';
	};

if(new_users[new_users.length-1]=='|')new_users=new_users.substring(0, new_users.length - 1);
GM_setValue('forum_options',new_users);
div_inner_redraw();
}	

function changeUser(){
var user_count=parseInt(this.id.split('_')[1]);
var user_options=GM_getValue('forum_options','');
var saved_settings=user_options.split('|');
var new_users='';
for(n in saved_settings)
	if(n!=user_count){
	new_users+=saved_settings[n];
	if(n<saved_settings.length-1)new_users+='|';
	}else {
	
	new_users+=saved_settings[n].split(':')[0]+':'+document.getElementById('user_'+n).value;
	if(n<saved_settings.length-1)new_users+='|';
	};

GM_setValue('forum_options',new_users);
div_inner_redraw();
}

function add_cur_set(){
var new_user=GM_getValue('forum_options','');
var tru=document.getElementById('adding_user').childNodes[1].childNodes[0].value;
if (new_user!='')new_user+='|';
if(document.getElementById('pl_id').value!=''&&new_user.indexOf(encodeURIComponent(document.getElementById('pl_id').value))<0)GM_setValue('forum_options',new_user+encodeURIComponent(document.getElementById('pl_id').value)+':'+tru);
div_inner_redraw();
}
	
function writeSelect(n,w){
var sel_id='';
var sel_val='';
if( typeof(n)!='undefined')sel_id='user_'+n; else sel_id='main_select';
if(typeof(w)!='undefined')sel_val=w; 
var resultsel="<select id='"+sel_id+"' value="+sel_val+" style='background:"+sel_val+"'>";
var selColors=new Array('','#B0FFB0','#B0BFF0','#FFB0B0','skyblue','royalblue','blue','darkblue','purple','orange','yellow','gold','tomato','coral','orangered','crimson','red','firebrick','darkred','green','limegreen','seagreen','deeppink','purple','indigo','burlywood','sandybrown','sienna','chocolate','teal','silver','gray');
var se1='<option value="';
var se2='" style="border: 1px solid rgb(255, 215, 215); background: ';
var se3=' none repeat scroll 0% 0%;"';
var se5='>';
var se4='</option>"';
for (q in selColors){resultsel+=se1+selColors[q]+se2+selColors[q]+se3+(selColors[q]==w?'selected':'')+se5+selColors[q]+se4;}
resultsel+="</select>";
return resultsel;
}	
	
	
function makeOptions(r)
{
r=r.replace("&gt;</a></center>","&gt;</a></center><div id=forum_opt></div>");
return r;

}

var forum_coloring=GM_getValue('forum_options','');	
if (forum_coloring!=''){
	var colorArray=forum_coloring.split('|');
	var all_tr=	document.getElementsByTagName('tr');
	for(var l=0;l<all_tr.length;l++)
		{
		my_tr = all_tr[l];
		if(my_tr.childNodes[3]&&my_tr.childNodes[3].innerHTML)
			{
			var my_tr_inner = my_tr.childNodes[3]&&my_tr.childNodes[3].innerHTML;
			for(var u=0;u<colorArray.length;u++)
				{
				var resultArray=colorArray[u].split(':');
				var user_pattern='>'+decodeURIComponent(resultArray[0])+'<';
				var clan_pattern='alt="'+decodeURIComponent(resultArray[0])+'"';
				clan_pattern=clan_pattern.replace(/\s/,'');
				if(my_tr_inner.match(clan_pattern)||my_tr_inner.match(user_pattern))my_tr.style.background = resultArray[1];
				}
			}
		}
	}