// ==UserScript==
// @name          HWM_Context_Menu
// @author      HAPblB
// @namespace  HWM
// @description   HWM_Context_Menu
// @version 0.0.3
// @include        http://www.heroeswm.ru/*
// ==/UserScript==
    

window.gm_show_menu = function(e) {
if(!e.ctrlKey){
var userName=this.textContent.replace(/\[\d*\]/,'');
var t=/(id=)(\d*)/.exec(this.href)[2];
var x=e.clientX+window.scrollX-15;
var y=e.clientY+window.scrollY-15;
if (userName&&t) {
  var html = ''; var s; var opened; var l; var div; var undefined;

    s = new Array("HWM");
    opened = new Array;
    
    l = new Object();  //var l = {}
	
    for (var k in s) {
      l[s[k]] = new Object();
    }

	l['HWM']['new_window']	= new Array('\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0432 \u043D\u043E\u0432\u043E\u043C \u043E\u043A\u043D\u0435...','http://www.heroeswm.ru/pl_info.php?id=');
    l['HWM']['send_message']= new Array('\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043F\u0438\u0441\u044C\u043C\u043E','http://www.heroeswm.ru/sms-create.php?mailto=');
	l['HWM']['separator1']	= new Array('sep','');
    l['HWM']['send_res']	= new Array('\u041F\u0435\u0440\u0435\u0434\u0430\u0442\u044C \u0440\u0435\u0441\u0443\u0440\u0441\u044B','http://www.heroeswm.ru/transfer.php?nick=');
    l['HWM']['send_el']		= new Array('\u041F\u0435\u0440\u0435\u0434\u0430\u0442\u044C \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B','http://www.heroeswm.ru/el_transfer.php?nick=');
    l['HWM']['send_art']	= new Array('\u041F\u0435\u0440\u0435\u0434\u0430\u0442\u044C \u0432\u0435\u0449\u0438','http://www.heroeswm.ru/inventory.php?nick=');
	l['HWM']['separator2']	= new Array('sep','');
    l['HWM']['battle_log']	= new Array('\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u0431\u043E\u0435\u0432','http://www.heroeswm.ru/pl_warlog.php?id=');
    l['HWM']['card_log']	= new Array('\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u0438\u0433\u0440','http://www.heroeswm.ru/pl_cardlog.php?id=');
    l['HWM']['transfer_log']= new Array('\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u043F\u0435\u0440\u0435\u0434\u0430\u0447', 'http://www.heroeswm.ru/pl_transfers.php?id=');
	l['HWM']['separator3']	= new Array('sep','');
	l['HWM']['lgnd']		= new Array('\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 lgnd.ru','.lgnd.ru/');
	l['HWM']['THBstat']		= new Array('\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u0422\u041D\u0412','http://stats.ordenmira.ru/players.php?id=');
   
    
    html = '<style>.menLink, div.menLink a {color: #592C08; text-align: left; padding: 0; margin: 0; font-size: 12px; display: inline;}</style>\n<center>\n<b>'+userName+'</b>&nbsp;<a href="javascript:void(0);" onClick="javascript:var cntmn=document.getElementById(\'GmMenu\');document.body.removeChild (cntmn)" class="menLink">[X]</a></center>\n<hr width=80%>\n';
    
    for (var i in l) {
      var first = 1;
      var dn = "gm_menu_div_" + i;
      
      for (var k in l[i]) {
		var href;
		var curr_target='';
		if(k=='lgnd'||k=='new_window'||k=='THBstat')curr_target=' target="_blank" '; //opening in new window
			else curr_target=' target="_self" '; //opening in same window
		if(k=='send_message')curr_target=' id="'+userName+'" ';//assigning id for message div
		if(k=='new_window'||k=='THBstat'||k=='battle_log'||k=='card_log'||k=='transfer_log')href=l[i][k][1]+t;//adding to link user's id
		if(k=='lgnd')href='http://'+t+'.lgnd.ru/';//creating link for LGND.RU
		if(k=='send_message')href='javascript:void(0)';//link for message div
		if(k=='send_res'||k=='send_el'||k=='send_art')href=l[i][k][1]+userName;//adding to link user's nick
		var link = '<a href="'+href+'"'+curr_target+'class="menLink" onclick="javascript:var cntmn=document.getElementById(\'GmMenu\');document.body.removeChild (cntmn)">' + l[i][k][0] +'</a>';
		if(l[i][k][0]=='sep')link='<hr  width=100%>';
		if(k=='send_message'){link = '<a href="'+href+'"'+curr_target+'class="menLink" >' + l[i][k][0] +'</a>';}
		html += '\n<span style="padding: 0 15px 0 15px; display: block; font-size: 12px; color: #592C08; margin: 0;">  ';
		html += link;
		html += '</span>\n';
		html += '\n'; 
      }
      html += '<br></div>\n';
    }
 
  if (x == '' || !isFinite(x)) {x = 180;}
  if (y == '' || !isFinite(y)) {y = 180+window.scrollY;}

  if (document.getElementById('GmMenu')) {
    div = document.getElementById('GmMenu');
    if (html) {div.innerHTML = html;}
  } else {
    div = document.createElement('DIV');
    div.setAttribute('ID', 'GmMenu');
    div.setAttribute('name', 'GmMenu');
    div.setAttribute('class', 'menLink');
    div.setAttribute('style', 'position: absolute; z-Index: 999;  background: #F5F3EA; border: #222 solid 2px; margin: 2px; color: #592C08; font-size: 12px; padding: 2px;');
    div.innerHTML = html;
    document.body.insertBefore(div, document.body.firstChild);
  }

  div.style.left = x + "px";
  div.style.top  = y + "px";
  div.style.display = "block";

e.preventDefault();
    e.returnValue = false;
    e.stopPropagation();
	document.getElementById(userName).addEventListener('click',sendMessage,false);
return false;
}
 return true;
}}


function sendMessage(){
document.getElementById('GmMenu').innerHTML='<center>\n'+this.id+'&nbsp;<a href="javascript:void(0);" onClick="javascript:var cntmn=document.getElementById(\'GmMenu\');document.body.removeChild (cntmn)" class="menLink">[X]</a></center>\n<hr width=80%>\n<form action="http://www.heroeswm.ru/sms-create.php" method="POST" name="fmail"> <input name="action" value="" type="hidden"><input name="parent_id" value="" type="hidden"><table align="center" width="550" border=0><tbody><tr><td>  <table class="wblight" border="0" cellpadding="5"><tbody>  <tr><td align="right">\u041A\u043E\u043C\u0443:</td><td><input id="fast_mailto" name="mailto" value="'+this.id+'" type="text"></td></tr><tr><td align="right">\u0422\u0435\u043C\u0430:</td><td><input name="subject"  id="fast_subject" value="" style="width: 100%;" type="text"></td></tr><tr><td colspan="2">\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435:<br></td></tr><tr><td colspan="2"><center><textarea name="msg"  id="fast_msg" rows="10" cols="63" wrap="virtual" style="width: 100%;"></textarea></center></td></tr></tbody></table><br><center><input value="\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C" name="fast_subm" id="fast_subm" type="submit"></center></td></tr></tbody></table></form>';
}

var alla=document.getElementsByTagName('a');
pattern = /(pl_info\.php\?id=)(\d*)/;
for (var i=0;i<alla.length;i++)
	if(alla[i].href&&alla[i].href.match('pl_info'))
		{
		alla[i].setAttribute('name','hwm_hero');
		}
var elmLink = document.getElementsByName('hwm_hero');
for(var r=0;r<elmLink.length;r++)
elmLink[r].addEventListener("contextmenu", gm_show_menu, true);



if(location.href.indexOf('inventory.php?nick=')>=0){
var userName=/nick=([^\&]+)/.exec((location.href.match(/\?.*nick=/)) ? location.href : document.referrer )[1];
var arts_a=document.getElementsByTagName('a');
	for(var y=0;y<arts_a.length;y++)
		{
			if(arts_a[y].href.indexOf('art_transfer.php?id=') >= 0&&!arts_a[y].href.match(/id=(\d*)\&nick=/))
				{
					arts_a[y].href += '&nick=' + userName;
					arts_a[y].innerHTML += ' ' + win2unicode(unescape(userName));
				}
		}
}


if (location.href.indexOf('transfer.php?nick=') >= 0||location.href.match(/transfer\.php\?id=(\d*)\&nick=/)){
var userName=/nick=([^\&]+)/.exec((location.href.match(/\?.*nick=/)) ? location.href : document.referrer )[1];
//alert(userName);
var inputs = document.getElementsByTagName('input');
	for(var y=0;y<inputs.length;y++)
		if(inputs[y].name=='nick'&&inputs[y].type=='text'){
			inputs[y].value=win2unicode(unescape(userName));
			break;
	}
}


function win2unicode(str)
{
	if (str == null)
	return null;
	var result = "";
	var o_code = "";
	var i_code = "";
	for (var i = 0; i < str.length; i++)
		{
		i_code = str.charCodeAt(i);
		if (i_code == 184)
		o_code = 1105;
		else if (i_code == 168)
		o_code = 1025;
		else if (i_code > 191 && i_code < 256)
		o_code = i_code + 848;
		else
		o_code = i_code;
		result = result + String.fromCharCode(o_code);
		}
	return result;
}