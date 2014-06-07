// ==UserScript==
// @name           HWM_War_Map_Table
// @namespace      z
// @description   Steppe War Map for commanders. Script by Yzzar. Remake of HapbIB works.
// @version       0.09 beta
// @include        http://*.heroeswm.ru/map.php*
// ==/UserScript==

var MyClan = '302';




var bCombatView = GM_getValue( "zwt_combat_view" , 0 );
var Impers =new Array();
var sCl = '';
var MyClC = 0;
if (bCombatView) {

var dm = document.createElement( 'div' );
//dm.style.display='none';

dm.innerHTML = '<table>' +
'<tr>' +
'<td id="wmap_23"></td>' + 
'<td id="wmap_9"></td>' + 
'<td id="wmap_6"></td>' +
'<td id="wmap_24"></td>' + 
'<td id="wmap_16"></td>' +
//'<td id=en_res></td>' + 
//'<td></td>' +
'</tr>' +
'<tr>' +
'<td id="wmap_13"></td>' + 
'<td id="wmap_12"></td>' + 
'<td id="wmap_3"></td>' +
'<td id="wmap_4"></td>' +
'<td id="wmap_15"></td>' +
'<td id="wmap_18"></td>' +
'</tr>' +
'<tr>' +
'<td></td>' + 
'<td id="wmap_8"></td>' + 
'<td id="wmap_1"></td>' +
'<td id="wmap_2"></td>' +
'<td id="wmap_14"></td>' +
'<td id="wmap_17"></td>' +
'</tr>' +
'<tr>' +
'<td></td>' + 
'<td id="wmap_7"></td>' + 
'<td id="wmap_5"></td>' +
'<td id="wmap_11"></td>' +
'<td></td>' +
'<td></td>' + 
'</tr>' +
'<tr>' +
'<td></td>' + 
'<td></td>' + 
'<td id="wmap_10"></td>' +
'<td id="wmap_19"></td>' +
'<td></td>' + 
'<td id="wmap_25"></td>' +
'</tr>' +
'<tr>' +
'<td></td>' + 
'<td></td>' + 
'<td id="wmap_20"></td>' +
'<td id="wmap_21"></td>' +
'<td></td>' + 
'<td></td>' +
'</tr>' +
'<tr>' +
'<td>' +
'</td></tr>' +
'<tr>'+
'<td></td>' + 
'<td></td>' +
'<td></td>' + 
'<td id="wmap_22"></td>' +
'<td></td>' +
'</tr>' +
'</table> ' ;
document.body.appendChild( dm );

var Sectors=new Array('East River','Tiger\'s Lake','Rogue\'s Wood','Wolf\'s Dale','Peaceful Camp','Lizard\'s Lowland','Green Wood','Eagle\'s Nest','Portal\'s ruins','Dragon\'s Caves','Shining Spring','Sunny City','Magma Mines','Bear Mountain','Fairy Trees','Port City','Mythril Coast','Great Wall','Titan\'s Valley','Fishing Village','Kingdom Castle','Ungovernable Steppe','Enemy Side','East Island', '');

var EnemiesName=new Array('A', 'B','C','D','E','F','G','H','I','J','&#1043','L','M');
var EnemiesNum=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);
var EnemiesHints=new Array('#A «Братство Племён»: Варвары - бафферы, хаос, атакеры', 
                           '#B «Ценители Силы»: Варвары - атакеры, непокорные и степные',
						   '#C «Непокорный Легион»: Варвары - непокорные',
						   '#D «Баланс Хаоса»: Варвары - в основном хаос',
						   '#E «Вольный Альянс»: Варвары - смешанный клан',
						   '#F «Посланники Ветра»: Рыцари - бафферы',
						   '#G «Орден Очищения»: Рыцари - бафферы',
						   '#H «Защитники Времени»: Рыцари - бафферы, атакеры',
						   '#I «Покровители морей»: Амфибии - смешанный клан',
						   '#J «Хранители баланса»: Амфибии - бафферы, атакеры',
						   '','','');

var main_map=(/(.)*:([0-9]{1,4}~.*)/).exec(document.getElementsByTagName('embed')[2].getAttribute('flashvars'))[2].split('|');
var i=(main_map.length-1)/16;

for(var j=0;j<i;j++){
var n=j*16;
var sec_1=main_map[n+0].split('~');

if (j == 23) { //East Island'
	document.getElementById('wmap_'+(j+2)).innerHTML += '<table border=2 cellspacing=0 cellpadding=0><TR><th align=center>'+Sectors[j]+'</th></tr><tr><td>'+
	'<table border=1 cellspacing=0 cellpadding=0 style="margin: 0 auto"><td id="sector_'+sec_1[0]+'" title="'+Sectors[j]+'"></td></tr></table></td></tr></table>';

	var cur_data=sec_1;
	var cur_sec=document.getElementById('sector_'+cur_data[0]);
	var tmp_inner='';
	if(cur_data[3]!=-1000){
		if (cur_data[3] < 0)
				tmp_inner+=geteclanhtml(cur_data[3]);	
		else if(cur_data[3] > 0)
				tmp_inner+='<a href="http://www.heroeswm.ru/clan_info.php?id='+cur_data[3]+'"><img border=0 src="http://dcdn.heroeswm.ru/i_clans/l_'+cur_data[3]+'.gif" title="#'+getclanname(cur_data[3])+'"></a> ';
			else tmp_inner+='Empire ';
		}
	else 
		tmp_inner+='Imperia';
		if(parseInt(cur_data[1])){
			cur_sec.style.background="#FFA0A0";
			if (cur_data[1] > 5999)
				tmp_inner+=': &#x221E;<br>';
			else
				tmp_inner+=': '+cur_data[1]+'<br>';
		}else{
			cur_sec.style.background="#95FCC5";
		}
		if(cur_data[2]&&cur_data[3]>-0){
			tmp_inner+=(100-parseInt(cur_data[2]))+'%';
			getarin(cur_data[3])
			if (cur_data[3] == MyClan) {
				sCl += '<b>'+cur_sec.title+': </b><font color="red">'+(100-parseInt(cur_data[2]))+'%</font>; ';
				cur_sec.style.background="#118833";
				cur_sec.style.color="#FFFFAA";
				MyClC++;
			}
		}
		if(cur_data[3]<0 && cur_data[3]>-20) {
			EnemiesNum[Math.abs(cur_data[3])]+=parseInt(cur_data[1]);
		}
		if(cur_data[3]==-1000)cur_sec.style.background="#95B5FC";
	cur_sec.innerHTML=tmp_inner;
} else {

var sec_2=main_map[n+1].split('~');
var sec_3=main_map[n+2].split('~');
var sec_4=main_map[n+3].split('~');
var sec_5=main_map[n+4].split('~');
var sec_6=main_map[n+5].split('~');
var sec_7=main_map[n+6].split('~');
var sec_8=main_map[n+7].split('~');
var sec_9=main_map[n+8].split('~');
var sec_10=main_map[n+9].split('~');
var sec_11=main_map[n+10].split('~');
var sec_12=main_map[n+11].split('~');
var sec_13=main_map[n+12].split('~');
var sec_14=main_map[n+13].split('~');
var sec_15=main_map[n+14].split('~');
var sec_16=main_map[n+15].split('~');


document.getElementById('wmap_'+(j+2)).innerHTML=document.getElementById('wmap_'+(j+2)).innerHTML+'<table border=2 cellspacing=0 cellpadding=0><TR><th colspan=2 align=center>'+Sectors[j]+'</th></tr><tr><td colspan=2>'+
'<table border=1  cellspacing=0 cellpadding=0 style="margin: 0 auto"><td id="sector_'+sec_1[0]+'" colspan=2 title="'+Sectors[j]+'-\u04211"></td></tr><tr><td width=50% id="sector_'+sec_4[0]+'" title="'+Sectors[j]+'-\u04214"></td><td width=50% id="sector_'+sec_2[0]+'" title="'+Sectors[j]+'-\u04212"></td></tr><tr><td id="sector_'+sec_3[0]+'" colspan=2 title="'+Sectors[j]+'-\u04213"></td></tr></table>'+
'</td></tr><tr><td width=50%>'+
'<table border=1  cellspacing=0 cellpadding=0 width=100%><td id="sector_'+sec_13[0]+'" colspan=2 title="'+Sectors[j]+'-\u04171"></td></tr><tr><td width=50% id="sector_'+sec_16[0]+'" title="'+Sectors[j]+'-\u04174"></td><td width=50% id="sector_'+sec_14[0]+'" title="'+Sectors[j]+'-\u04172"></td></tr><tr><td id="sector_'+sec_15[0]+'" colspan=2 title="'+Sectors[j]+'-\u04173"></td></tr></table></td><td width=50%>'+
'<table border=1  cellspacing=0 cellpadding=0 width=100%><td id="sector_'+sec_5[0]+'" colspan=2 title="'+Sectors[j]+'-\u04121"></td></tr><tr><td width=50% id="sector_'+sec_8[0]+'" title="'+Sectors[j]+'-\u04124"></td><td width=50% id="sector_'+sec_6[0]+'" title="'+Sectors[j]+'-\u04122"></td></tr><tr><td id="sector_'+sec_7[0]+'" colspan=2 title="'+Sectors[j]+'-\u04123"></td></tr></table>'+
'</td></tr><tr><td colspan=2>'+
'<table border=1  cellspacing=0 cellpadding=0 style="margin: 0 auto"><td id="sector_'+sec_9[0]+'" colspan=2 title="'+Sectors[j]+'-\u042e1"></td></tr><tr><td width=50% id="sector_'+sec_12[0]+'" title="'+Sectors[j]+'-\u042e4"></td><td width=50% id="sector_'+sec_10[0]+'" title="'+Sectors[j]+'-\u042e2"></td></tr><tr><td id="sector_'+sec_11[0]+'" colspan=2 title="'+Sectors[j]+'-\u042e3"></td></tr></table>'+

'</td></tr></table>';

	for(m=1;m<17;m++)
		{
		var cur_data=eval('sec_'+m);
		var cur_sec=document.getElementById('sector_'+cur_data[0]);
		var tmp_inner='';

			if(cur_data[3]!=-1000){
				if (cur_data[3] < 0)
					tmp_inner+=geteclanhtml(cur_data[3]);	
				else if(cur_data[3] > 0)
					tmp_inner+='<a href="http://www.heroeswm.ru/clan_info.php?id='+cur_data[3]+'"><img border=0 src="http://dcdn.heroeswm.ru/i_clans/l_'+cur_data[3]+'.gif" title="#'+getclanname(cur_data[3])+'"></a> ';
				else tmp_inner+='Empire ';
			}
			else 
				tmp_inner+='Imperia';
			if(parseInt(cur_data[1])){
				cur_sec.style.background="#FFA0A0";
				if (cur_data[1] > 5999)
					tmp_inner+=': &#x221E;<br>';
				else
					tmp_inner+=': '+cur_data[1]+'<br>';
			}else{
				cur_sec.style.background="#95FCC5";
			}
			if(cur_data[2]&&cur_data[3]>-0){
				tmp_inner+=(100-parseInt(cur_data[2]))+'%';
				getarin(cur_data[3]);
//				ImperC[getarin(cur_data[3])]++;
				if (cur_data[3] == MyClan) {
					sCl += '<b>'+cur_sec.title+': </b><font color="red">'+(100-parseInt(cur_data[2]))+'%</font>; ';
					cur_sec.style.background="#118833";
					cur_sec.style.color="#FFFFAA";
					MyClC++;
				}
			}
			if(cur_data[3]<0 && cur_data[3]>-20) {
				EnemiesNum[Math.abs(cur_data[3])]+=parseInt(cur_data[1]);
			}
			if(cur_data[3]==-1000)cur_sec.style.background="#95B5FC";
		cur_sec.innerHTML=tmp_inner;
		}
	}
}



dm = document.createElement( 'div' );
var s = ''; s1 = '';

Impers.sort(sortfunc);
for (var t = 0; t < Impers.length; t++) {
	s1 = getclanname(Impers[t].n);
	s+='<tr><td><a href="http://www.heroeswm.ru/clan_info.php?id='+Impers[t].n+'" title="'+s1+'"><img border=0 src="http://dcdn.heroeswm.ru/i_clans/l_'+Impers[t].n+'.gif">'+s1+'</a></td><td>'+Impers[t].c+'</td></tr>';
}

dm.innerHTML = getclanname(MyClan)+'<img border=0 src="http://dcdn.heroeswm.ru/i_clans/l_'+MyClan+'.gif"> ('+MyClC+'): '+sCl+'<br /><hr/><br/><table border=1 style="float: left; margin-right: 50px;"><th colspan="2">Imperial forces</th>'+s+'<tr></table><div id="en_res"></div>';
document.body.appendChild( dm );


if (EnemiesName.length > 0) {
var enemyres='<table border=1  ><tr><th colspan="2">Enemy clans</th></tr>';
var summ=0;
for(var t=0;t<EnemiesName.length;t++)
if(EnemiesNum[t]){
	enemyres+="<tr><td>"+geteclanhtml(-t)+"&nbsp;:</td><td>"+EnemiesNum[t]+"</td></tr>";
	summ+=EnemiesNum[t];
}
enemyres+="<tr><td>total :</td><td>"+summ+"</td></tr>";
enemyres+="</table>";

document.getElementById('en_res').innerHTML=enemyres;
}

}

var els = getI( "//table[@width='970']" ) ;
if ((els.snapshotLength > 0)) {
	i = 0;
	do {
		t = els.snapshotItem(i++);
	} while ((t.rows.length != 1) || (i < els.snapshotLength));
	if (t.rows.length == 1) {
		var tr = document.createElement( 'tr' );
		tr.innerHTML = '<td><table width="100%"><tr><td><input type="checkbox" id="cb_cb_view" checked="checked">Tactical View</input></td><td align="right">© by <a href="http://www.heroeswm.ru/pl_info.php?id=740872" style="font-size: 7pt;">Yzzar</a></td></tr></table></td>';

		if (bCombatView) {
			t.firstChild.replaceChild(tr, t.rows[0]);
		} else {
			t.firstChild.insertBefore(tr, t.rows[0]);
		}
		
		var ed1 = document.getElementById( 'cb_cb_view' ) ;
		ed1.addEventListener
		(
			"click" ,
			function( event )
			{
				if (event.target.checked){
					GM_setValue( "zwt_combat_view", 1 ) } else{
					GM_setValue( "zwt_combat_view", 0 )};
					
				window.location=window.location;
			},
			false
		);
		if (bCombatView)
			ed1.checked="checked"; else
			ed1.checked="";
	}
}

var SUC_script_num = 131495; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('wmt_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('wmt_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('wmt_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('wmt_target_script_name', script_name);if (remote_version > local_version){if(confirm('Есть обновление для Greasemonkey-скрипта "'+script_name+'."\nПерейти к странице обновления?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('wmt_current_version', remote_version);}}else if (forced)alert('Нет обновлений для скрипта "'+script_name+'."');}else GM_setValue('wmt_current_version', remote_version+'');}});}catch (err){if (forced)alert('Ошибка проверки обновления:\n'+err);}}}GM_registerMenuCommand(GM_getValue('wmt_target_script_name', 'HWM_War_Map_Table') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


function getI(xpath,elem){return document.evaluate(xpath,(!elem?document:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}

function getarin(el) {
	for(var t=0;t<Impers.length;t++)
		if (Impers[t].n == el){
			Impers[t].c++;
			return;
		}
	Impers[Impers.length] = {n:el,c:1};
}

function geteclanhtml(data) {
	return '<img border=0 align="absmiddle" src="http://im.heroeswm.ru/i_clans/l_a-'+(-data)+'.gif" title="'+EnemiesHints[-data-1]+'"><font color="red">#'+EnemiesName[-data-1]+'</font>';
}


function getclanname(id) {
	return id;
}

function sortfunc(a,b)
{
	if (a.c > b.c)
		return -1;
	if (a.c < b.c)
		return 1;
	if (a.n > b.n)
		return 1;
	if (a.n < b.n)
		return -1;
	return 0;
}