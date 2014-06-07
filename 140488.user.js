// ==UserScript==
// @name           HWM Clan Statistics
// @namespace      HWM
// @include        http://*.heroeswm.*/clan_info.php?id=*
// @include        http://*.lordswm.*/clan_info.php?id=*
// @author        HAPblB
// @version       0.0.5
//@homepage 	http://userscripts.org/scripts/show/140488
// ==/UserScript==

var version = "0.0.5";
var script_num = 140488;
var script_name = 'HWM Clan Statistics';
var string_upd = /140488=(\d+\.\d+)/;

var m_online_str = "i/clans/online.gif";
var m_offline_str = "i/clans/offline.gif";
var m_battle_str = "i/clans/battle.gif";
var m_cards_str = "i/clans/arcomag.gif";

var my_clan_table = getClanTable();
var clanRowsNodes_arr = my_clan_table.childNodes[0].childNodes;
var fraction	=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var new_fraction=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var levels		=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var status		=new Array(0,0,0,0);

for(var i=0;i<clanRowsNodes_arr.length;i++)
	{
	if(clanRowsNodes_arr[i].childNodes[1].innerHTML.indexOf("i/clans/offline.gif")>-1)status[0]++;
	if(clanRowsNodes_arr[i].childNodes[1].innerHTML.indexOf("i/clans/online.gif")>-1)status[1]++;
	if(clanRowsNodes_arr[i].childNodes[1].innerHTML.indexOf("i/clans/battle.gif")>-1)status[2]++;
	if(clanRowsNodes_arr[i].childNodes[1].innerHTML.indexOf("i/clans/arcomag.gif")>-1)status[3]++;

	
	tn = ( clanRowsNodes_arr[i].childNodes[2].innerHTML.indexOf("clan_info.php")==-1)? 3: 5;
        var img_pattern=/(.*\/i\/r)(\d+)(.*)/;
        var tmp_str_parse=clanRowsNodes_arr[i].childNodes[2].childNodes[tn].src.replace('.gif','');
	var tmp_img_n=parseInt(tmp_str_parse.replace(img_pattern,'$2'));
	if(tmp_img_n<=10){	fraction[tmp_img_n]++;} else {new_fraction[tmp_img_n-100]++;};
	levels[parseInt(clanRowsNodes_arr[i].childNodes[3].innerHTML)]++;
	}


var new_tr=document.createElement('tr');
var new_td=document.createElement('td');


var hider_inner='';
hider_inner+='<div id="HideMe" name="HideMe" style="display:none;"><table cellpadding=2 cellspacing=0 width=765 class=wblight align=center>'+
'<tr class=wb>'+
'<td width=50% class=wb align=left valign=top>'+
'<center><BR><b> \u0412\u0441\u0435\u0433\u043E: </b>'+clanRowsNodes_arr.length+'&nbsp;&nbsp;&nbsp;<b> \u0412 \u0441\u0435\u0442\u0438: </b>'+
(clanRowsNodes_arr.length-status[0])+'<font style="color:#696156">&nbsp;&nbsp;('+Math.round((clanRowsNodes_arr.length-status[0])/clanRowsNodes_arr.length*100)+'%)</font>'+
'<BR><BR><img src="i/clans/online.gif" border="0"><b> \u0421\u0432\u043E\u0431\u043E\u0434\u043D\u044B: </b>'+
status[1]+'&nbsp;&nbsp;<img src="i/clans/battle.gif" border="0"><b> \u0412 \u0411\u043E\u044E: </b>'+status[2]+
'&nbsp;&nbsp;<img src="i/clans/arcomag.gif" border="0"><b> \u0412 \u0442\u0430\u0432\u0435\u0440\u043D\u0435: </b>'+status[3]+
'</center><BR>&nbsp;&nbsp;&nbsp;&nbsp;';
hider_inner+='<img src="i/r1.gif" border="0"><b> \u0420\u044B\u0446\u0430\u0440\u0435\u0439: '+fraction[1]+'<font style="color:#696156"></b>&nbsp;&nbsp;('+Math.round(fraction[1]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r2.gif" border="0"><b> \u041D\u0435\u043A\u0440\u043E\u043C\u0430\u043D\u0442\u043E\u0432: '+fraction[2]+'<font style="color:#696156"></b>&nbsp;&nbsp;('+Math.round(fraction[2]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r3.gif" border="0"><b> \u041C\u0430\u0433\u043E\u0432: '+fraction[3]+'<font style="color:#696156"></b>&nbsp;&nbsp;('+Math.round(fraction[3]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r4.gif" border="0"><b> \u042D\u043B\u044C\u0444\u043E\u0432: '+fraction[4]+'<font style="color:#696156"></b>&nbsp;&nbsp;('+Math.round(fraction[4]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r5.gif" border="0"><b> \u0412\u0430\u0440\u0432\u0430\u0440\u043E\u0432: '+fraction[5]+'<font style="color:#696156"></b>&nbsp;&nbsp;('+Math.round(fraction[5]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r6.gif" border="0"><b> \u0422\u0435\u043C\u043D\u044B\u0445 \u044D\u043B\u044C\u0444\u043E\u0432: '+fraction[6]+'<font style="color:#696156"></b>&nbsp;&nbsp;('+Math.round(fraction[6]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r7.gif" border="0"><b> \u0414\u0435\u043C\u043E\u043D\u043E\u0432: '+fraction[7]+'<font style="color:#696156"></b>&nbsp;&nbsp;('+Math.round(fraction[7]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r8.gif" border="0"><b> \u0413\u043D\u043E\u043C\u043E\u0432: '+fraction[8]+'<font style="color:#696156"></b>&nbsp;&nbsp;('+Math.round(fraction[8]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r9.gif" border="0"><b> \u0421\u0442\u0435\u043F\u043D\u044B\u0445 \u0432\u0430\u0440\u0432\u0430\u0440\u043E\u0432: '+fraction[9]+'<font style="color:#696156"></b>&nbsp;&nbsp;('+Math.round(fraction[9]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		

hider_inner+='<img src="i/r101.gif" border="0"><b> \u0420\u044B\u0446\u0430\u0440\u0435\u0439 \u0441\u0432\u0435\u0442\u0430: '+new_fraction[1]+'<font style="color:#696156"></b>&nbsp;&nbsp;('+Math.round(new_fraction[1]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r102.gif" border="0"><b> \u041F\u043E\u0432\u0435\u043B\u0438\u0442\u0435\u043B\u0435\u0439 \u0441\u043C\u0435\u0440\u0442\u0438: '+new_fraction[2]+'<font style="color:#696156"></b>&nbsp;&nbsp;('+Math.round(new_fraction[2]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r107.gif" border="0"><b> \u0414\u0435\u043C\u043E\u043D\u043E\u0432 \u0442\u044C\u043C\u044B: '+new_fraction[7]+'<font style="color:#696156"></b>&nbsp;&nbsp;('+Math.round(new_fraction[7]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
	

hider_inner+='<BR></td><td width=50% class=wb valign=top><center><BR><b> ';
hider_inner+='\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0433\u0435\u0440\u043E\u0435\u0432: </b>';
var middle=0;
for(var j=0;j<levels.length;j++)middle+=levels[j]*j;
hider_inner+=Math.round(middle/clanRowsNodes_arr.length)+'<BR> <BR></center>';
for(var j=levels.length-1;j>0;j--)
	if(levels[j]!=0)hider_inner+='<BR>&nbsp;&nbsp;&nbsp;&nbsp;<b> '+j+' \u0443\u0440\u043E\u0432\u043D\u0435\u0439: </b>'+levels[j]+'<font style="color:#696156">&nbsp;&nbsp;('+Math.round(levels[j]/clanRowsNodes_arr.length*100)+'%)</font>';
hider_inner+='</td></td></tr></table>';



hider_inner+='</div>';




new_td.innerHTML=hider_inner;
new_td.setAttribute('colspan',2);
new_td.className='wbwhite';
new_tr.appendChild(new_td);


//alert(my_clan_table.parentNode.childNodes[0].innerHTML);

var 	place_to_inject=my_clan_table.parentNode.childNodes[0].childNodes[0];
		place_to_inject.insertBefore(new_tr, place_to_inject.childNodes[1]);
		place_to_inject.childNodes[0].childNodes[0].innerHTML+='. <b>\u041E\u043D\u043B\u0430\u0439\u043D:</b> '+(clanRowsNodes_arr.length-status[0])+'  <b>\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435</b> ';


var new_a=document.createElement('a');
new_a.href='#';
new_a.innerHTML='[>>]';
place_to_inject.childNodes[0].childNodes[0].appendChild(new_a);

new_a.addEventListener('click', function(e) {

  if (document.getElementById('HideMe').style.display == 'block') {
     this.innerHTML ='[>>]';
     document.getElementById('HideMe').style.display = 'none';
  }
  else {
     this.innerHTML ='[<<]';
     document.getElementById('HideMe').style.display = 'block';
  } 


	}, false);
	
	
function getClanTable(){	
	var all_tbl = document.getElementsByTagName('table');
	var my_tbl;
	for (var i = 0; i < all_tbl.length; i++) {
		my_tbl = all_tbl[i];
		//
		if(my_tbl.innerHTML.indexOf('<table')!=-1 ){ continue; } // has child tables... 
		//
		var has_online_gif = (my_tbl.innerHTML.indexOf(m_online_str)!=-1 );
		var has_offline_gif = (my_tbl.innerHTML.indexOf(m_offline_str)!=-1 );
		var has_battle_gif = (my_tbl.innerHTML.indexOf(m_battle_str)!=-1 );
		var has_cards_gif = (my_tbl.innerHTML.indexOf(m_cards_str)!=-1 );
		//
		if(has_online_gif || has_offline_gif || has_battle_gif || has_cards_gif){ 						
			return my_tbl;			
		} 		
	}
}
	