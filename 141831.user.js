// ==UserScript==
// @name           LWM Clan Statistics
// @namespace      LWM
// @description    Provides information about clan members COM
// @include        http://*.lordswm.com/clan_info.php*
// @author        HAPblB
// @version       0.0.2
// ==/UserScript==

var version = "0.0.2";
var m_online_str = "i/clans/online.gif";
var m_offline_str = "i/clans/offline.gif";
var m_battle_str = "i/clans/battle.gif";
var m_cards_str = "i/clans/arcomag.gif";

var my_clan_table = getClanTable();
var clanRowsNodes_arr = my_clan_table.childNodes[0].childNodes;
var fraction=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);
var levels=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var status=new Array(0,0,0,0);

for(var i=0;i<clanRowsNodes_arr.length;i++)
	{
	if(clanRowsNodes_arr[i].childNodes[1].innerHTML.indexOf("i/clans/offline.gif")>-1)status[0]++;
	if(clanRowsNodes_arr[i].childNodes[1].innerHTML.indexOf("i/clans/online.gif")>-1)status[1]++;
	if(clanRowsNodes_arr[i].childNodes[1].innerHTML.indexOf("i/clans/battle.gif")>-1)status[2]++;
	if(clanRowsNodes_arr[i].childNodes[1].innerHTML.indexOf("i/clans/arcomag.gif")>-1)status[3]++;

	
	tn = ( clanRowsNodes_arr[i].childNodes[2].innerHTML.indexOf("clan_info.php")==-1)? 3: 5;
	var img_pattern=/(.*)(\d)(.*)/;
	fraction[parseInt(clanRowsNodes_arr[i].childNodes[2].childNodes[tn].src.replace('.gif','').replace(img_pattern,'$2'))]++;
	levels[parseInt(clanRowsNodes_arr[i].childNodes[3].innerHTML)]++;
	}


var new_tr=document.createElement('tr');
var new_td=document.createElement('td');


var hider_inner='';
hider_inner+='<div id="HideMe" name="HideMe" style="display:none;"><table cellpadding=2 cellspacing=0 width=765 class=wblight align=center>'+
'<tr class=wb>'+
'<td width=50% class=wb align=left valign=top>'+
'<center><BR><b> Total: </b>'+clanRowsNodes_arr.length+'&nbsp;&nbsp;&nbsp;<b> Online: </b>'+
(clanRowsNodes_arr.length-status[0])+'<font style="color:#696156">&nbsp;&nbsp;('+Math.round((clanRowsNodes_arr.length-status[0])/clanRowsNodes_arr.length*100)+'%)</font>'+
'<BR><BR><img src="i/clans/online.gif" border="0"><b> Available: </b>'+
status[1]+'&nbsp;&nbsp;<img src="i/clans/battle.gif" border="0"><b> In combat: </b>'+status[2]+
'&nbsp;&nbsp;<img src="i/clans/arcomag.gif" border="0"><b> In tavern: </b>'+status[3]+
'</center><BR>&nbsp;&nbsp;&nbsp;&nbsp;';
hider_inner+='<img src="i/r1.gif" border="0"><b> Knights: </b>'+fraction[1]+'<font style="color:#696156">&nbsp;&nbsp;('+Math.round(fraction[1]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r2.gif" border="0"><b> Necromancers: </b>'+fraction[2]+'<font style="color:#696156">&nbsp;&nbsp;('+Math.round(fraction[2]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r3.gif" border="0"><b> Wizards: </b>'+fraction[3]+'<font style="color:#696156">&nbsp;&nbsp;('+Math.round(fraction[3]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r4.gif" border="0"><b> Elves: </b>'+fraction[4]+'<font style="color:#696156">&nbsp;&nbsp;('+Math.round(fraction[4]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r5.gif" border="0"><b> Barbarians: </b>'+fraction[5]+'<font style="color:#696156">&nbsp;&nbsp;('+Math.round(fraction[5]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r6.gif" border="0"><b> Dark elves: </b>'+fraction[6]+'<font style="color:#696156">&nbsp;&nbsp;('+Math.round(fraction[6]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r7.gif" border="0"><b> Demons: </b>'+fraction[7]+'<font style="color:#696156">&nbsp;&nbsp;('+Math.round(fraction[7]/clanRowsNodes_arr.length*100)+'%)</font><BR>&nbsp;&nbsp;&nbsp;&nbsp;';		
hider_inner+='<img src="i/r8.gif" border="0"><b> Dwarves: </b>'+fraction[8]+'<font style="color:#696156">&nbsp;&nbsp;('+Math.round(fraction[8]/clanRowsNodes_arr.length*100)+'%)</font><BR><BR>';		
hider_inner+='</td><td width=50% class=wb valign=top><center><BR><b> ';
hider_inner+='Average combat level of members: </b>';
var middle=0;
for(var j=0;j<levels.length;j++)middle+=levels[j]*j;
hider_inner+=Math.round(middle/clanRowsNodes_arr.length)+'<BR> <BR></center>';
for(var j=levels.length-1;j>0;j--)
	if(levels[j]!=0)hider_inner+='<BR>&nbsp;&nbsp;&nbsp;&nbsp;<b> Combat level '+j+' Lords: </b>'+levels[j]+'<font style="color:#696156">&nbsp;&nbsp;('+Math.round(levels[j]/clanRowsNodes_arr.length*100)+'%)</font>';
hider_inner+='</td></td></tr></table></div>';
new_td.innerHTML=hider_inner;
new_td.setAttribute('colspan',2);
new_td.className='wbwhite';
new_tr.appendChild(new_td);
my_clan_table.parentNode.childNodes[1].childNodes[0].insertBefore(new_tr, my_clan_table.parentNode.childNodes[1].childNodes[0].childNodes[1]);

my_clan_table.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML+='. <b>Online:</b> '+(clanRowsNodes_arr.length-status[0])+'  <b>More details</b> ';

var new_a=document.createElement('a');
new_a.href='#';
new_a.innerHTML='[>>]';
my_clan_table.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[0].appendChild(new_a);

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
	

