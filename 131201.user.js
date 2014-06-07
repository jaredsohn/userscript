// ==UserScript==
// @name           zWarTable
// @namespace      z
// @description   Steppe War script by Yzzar.  
// @version       0.09 beta
// @include        http://*.heroeswm.ru/b_war.php
// ==/UserScript==

var clan_id = GM_getValue( "zwt_clan_id" , "302" );;
var bHideF = GM_getValue( "zwt_hide_f" , 1 );
var bHideB = GM_getValue( "zwt_hide_b" , 0 );
var bHideM = GM_getValue( "zwt_hide_m" , 1 );
var bHideI = GM_getValue( "zwt_hide_i" , 1 );
var bCountAtt = GM_getValue( "zwt_count_att" , 0 );
var bShowPercents = GM_getValue( "zwt_show_per" , 0 );

var bNoFAttack = true;
var bNoClanAttackTable = true;

var tRatings = null;
var aCnts = 0;
var arAtts = {};
var els = getI( "//table[@align='left']" ) ;
if (els.snapshotLength == 1) {
	tRatings = els.snapshotItem(0);
}


var SUC_script_num = 131201; 
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('zwt_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('zwt_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('zwt_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('zwt_target_script_name', script_name);if (remote_version > local_version){if(confirm('Есть обновление для Greasemonkey-скрипта "'+script_name+'."\nПерейти к странице обновления?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('zwt_current_version', remote_version);}}else if (forced)alert('Нет обновлений для скрипта "'+script_name+'."');}else GM_setValue('zwt_current_version', remote_version+'');}});}catch (err){if (forced)alert('Ошибка проверки обновления:\n'+err);}}}GM_registerMenuCommand(GM_getValue('zwt_target_script_name', 'zWarTable') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


els = getI( "//table[@class='wbwhite']" ) ;

t = els.snapshotItem(0);
var tr = document.createElement( 'tr' );
var td = document.createElement( 'div' );
td.innerHTML = '<div><table width="100%" border="2" bgcolor="#FFEEE0"><tr><td>&#1050;&#1083;&#1072;&#1085; ID (clanID):&nbsp;<input type="text" id="zwt_clan_id" style="width:40px; margin-left:5px" value="'+clan_id+'"></input>&nbsp;<img align="absmiddle" width="20" height="15" border="0" src="http://dcdn.heroeswm.ru/i_clans/l_'+clan_id+'.gif"></td><td colspan="2"><input type="checkbox" id="cb_hide1" checked="checked">&#1057;&#1082;&#1088;&#1099;&#1090;&#1100; "&#1074;&#1085;&#1077;&#1082;&#1083;&#1072;&#1085;"</input></td></tr><tr><td><input type="checkbox" id="cb_hide2">&#1057;&#1082;&#1088;&#1099;&#1090;&#1100; &#1082;&#1085;&#1086;&#1087;&#1082;&#1080;</input></td><td><input type="checkbox" id="cb_hide3">&#1057;&#1082;&#1088;&#1099;&#1090;&#1100; &#1082;&#1072;&#1088;&#1090;&#1091;</input></td><td><input type="checkbox" id="cb_hide4">&#1057;&#1082;&#1088;&#1099;&#1090;&#1100; &#1079;&#1085;&#1072;&#1095;&#1082;&#1080;</input></td></tr><tr><td><input type="checkbox" id="cb_show_sta" checked="none">&#1055;&#1086;&#1082;&#1072;&#1079;&#1072;&#1090;&#1100; &#1089;&#1090;&#1072;&#1090;&#1080;&#1089;&#1090;&#1080;&#1082;&#1091; &#1072;&#1090;&#1072;&#1082;</input></td><td><input type="checkbox" id="cb_show_per" checked="none">&#1055;&#1086;&#1082;&#1072;&#1079;&#1099;&#1074;&#1072;&#1090;&#1100; %</input></td><td>&nbsp;</td></tr><tr><td colspan="3" style="text-align:right; font-size: 7pt;">© by <a href="http://www.heroeswm.ru/pl_info.php?id=740872" style="font-size: 7pt;">Yzzar</a></td></tr></table><span></span></div>';
//tr.appendChild(td);
t.rows[1].cells[1].insertBefore(td, t.rows[1].cells[1].firstChild);
//t.firstChild.insertBefore(tr, t.rows[0]);

var Sectors=new Array('East River','Tiger\'s Lake','Rogue\'s Wood','Wolf\'s Dale','Peaceful Camp','Lizard\'s Lowland','Green Wood','Eagle\'s Nest','Portal\'s Ruins','Dragons\'s caves','Shining Spring','Sunny City','Magma Mines','Bear Mountain','Fairy Trees','Port City','Mythril Coast','Great Wall','Titans\' Valley','Fishing village','Kingdom Castle','Ungovernable Steppe','Enemy side', 'Восточный остров');
var Areas=new Array('С','В','Ю','З');
var sClans = {};
var EnemiesName=new Array('A', 'B','C','D','E','F','G','H','I','J');
var EnemiesHints=new Array('#A «Братство Племён»: Варвары - бафферы, хаос, атакеры', 
                           '#B «Ценители Силы»: Варвары - атакеры, непокорные и степные',
						   '#C «Непокорный Легион»: Варвары - непокорные',
						   '#D «Баланс Хаоса»: Варвары - в основном хаос',
						   '#E «Вольный Альянс»: Варвары - смешанный клан',
						   '#F «Посланники Ветра»: Рыцари - бафферы',
						   '#G «Орден Очищения»: Рыцари+Амфибии - бафферы',
						   '#H «Защитники Времени»: Рыцари - бафферы, атакеры',
						   '#I «Покровители морей»: Амфибии - смешанный клан',
						   '#J «Хранители баланса»: Амфибии - бафферы, атакеры'
						   );


var ed1 = document.getElementById( 'cb_hide1' ) ;
ed1.addEventListener
(
	"click" ,
	function( event )
	{
		if (event.target.checked){
			GM_setValue( "zwt_hide_f", 1 ) } else{
			GM_setValue( "zwt_hide_f", 0 )};
			
		window.location=window.location;
	},
	false
);

if (bHideF)
	ed1.checked="checked"; else
	ed1.checked="";

ed1 = document.getElementById( 'cb_hide2' ) ;
ed1.addEventListener
(
	"click" ,
	function( event )
	{
		if (event.target.checked){
			GM_setValue( "zwt_hide_b", 1 ) } else{
			GM_setValue( "zwt_hide_b", 0 )};
			
		window.location=window.location;
	},
	false
);
ed1.checked=bHideB;

ed1 = document.getElementById( 'cb_hide3' ) ;
ed1.addEventListener
(
	"click" ,
	function( event )
	{
		if (event.target.checked){
			GM_setValue( "zwt_hide_m", 1 ) } else{
			GM_setValue( "zwt_hide_m", 0 )};
			
		window.location=window.location;
	},
	false
);
ed1.checked=bHideM;

ed1 = document.getElementById( 'cb_hide4' ) ;
ed1.addEventListener
(
	"click" ,
	function( event )
	{
		if (event.target.checked){
			GM_setValue( "zwt_hide_i", 1 ) } else{
			GM_setValue( "zwt_hide_i", 0 )};
			
		window.location=window.location;
	},
	false
);
ed1.checked=bHideI;

ed1 = document.getElementById( 'cb_show_sta' ) ;
ed1.addEventListener
(
	"click" ,
	function( event )
	{
		if (event.target.checked){
			GM_setValue( "zwt_count_att", 1 ) } else{
			GM_setValue( "zwt_count_att", 0 )};
			
		window.location=window.location;
	},
	false
);
ed1.checked=bCountAtt;

ed1 = document.getElementById( 'cb_show_per' ) ;
ed1.addEventListener
(
	"click" ,
	function( event )
	{
		if (event.target.checked){
			GM_setValue( "zwt_show_per", 1 ) } else{
			GM_setValue( "zwt_show_per", 0 )};
			
		window.location=window.location;
	},
	false
);
ed1.checked=bShowPercents;

if (bShowPercents)
	var main_map=(/(.)*:([0-9]{1,4}~.*)/).exec(document.getElementsByTagName('embed')[2].getAttribute('FlashVars'))[2].split('|');


if(bHideM) {
	var embeds=document.getElementsByTagName('embed');
	if (embeds.length >=2)
		embeds[2].parentNode.removeChild(embeds[2]);
}

var bShow = true;
var rS = 1;
var ih = "";
var ccs = ['#000000','#FF0000','#FF0000','#DD7700','#FF0000','#FF0000','#995500','#FF0000','#FF0000','#007700'];	
var cts = ['#FFFFDD', '#E0FFEE'];
var sai	=/i_clans\/l_(\d+)/;
var sdi = /#(\d+)/;


for( var i = 1; i < els.snapshotLength; i++ )
{
	t = els.snapshotItem(i);
	for (var j = 0; j < t.rows.length; j++)
	{
		if (t.rows[j].cells.length < 3) {
			td0 = document.createElement( 'td' );
			td0.innerHTML = ih;
			t.rows[j].insertBefore(td0, t.rows[j].cells[0]);
		}
		if (t.rows[j].cells[0].rowSpan > 1) {
			t.rows[j].cells[0].rowSpan = 1;
			ih = t.rows[j].cells[0].innerHTML;
		}
		td = t.rows[j].cells[t.rows[j].cells.length-1];
		
		aaa = sdi.exec(t.rows[j].cells[1].innerHTML);

		acls=getI( ".//a[@href='clan_info.php?id="+clan_id+"']", td );
		if (bHideF){
			if (/*(i == 1) && */(aaa != null) && (aaa.length > 1) && (aaa[1] == clan_id))
				bShow = true;
			else
				bShow=(acls.snapshotLength > 0);
		} else
			bShow = true;
		
		if ((aaa != null) && (aaa.length > 1) && (aaa[1] == clan_id) && ((acls.snapshotLength > 0) || (i == 1)))
		{
			t.rows[j].cells[0].style.backgroundColor = cts[i-1];
			if (bShowPercents) {
				if (i == 1) { //defence
					s = t.rows[j].cells[0].textContent;
					l = s.indexOf('-');
					if (l >= 0) {
						kS = Sectors.indexOf(s.slice(0, l));
						kA = Areas.indexOf(s[l+1]);
						kZ = parseInt(s[l+2])-1;
						if ((kS >= 0) && (kA >=0) && (kZ >= 0)) {
							k = 100-main_map[kS*16+kA*4+kZ].split('~')[2];
							t.rows[j].cells[0].innerHTML += '&nbsp;&nbsp;<span style="float:right; font-size:9px; color:#EE4400; font-weight:bold">*'+k+'%</span>';
						}
					}
				}
			}
		}	

		if (acls.snapshotLength > 0) {
			if(bHideI) { //hide icons
				t.rows[j].cells[1].innerHTML += '&nbsp;<br>'+acls.snapshotItem(0).innerHTML;
				for (k = 0; k < acls.snapshotLength; k++)
					acls.snapshotItem(k).parentNode.removeChild(acls.snapshotItem(k));
			}

			ims = t.rows[j].cells[1].getElementsByTagName('img');
			if (ims.length > 0) {
				aaa=sai.exec(ims[0].src);
				if ((aaa != null) && (aaa.length > 1)) 
					sClans[aaa[1]] = ims[0].title;
			}
			
			if(true ) { //show p_cnt
				t.rows[j].cells[1].innerHTML += '(<font color="'+ccs[acls.snapshotLength]+'"><b>'+acls.snapshotLength+'</b></font>)';
			}

		}


		ims = td.getElementsByTagName('img');
		if (ims.length > 0) {
			aaa=sai.exec(ims[0].src);
			if ((aaa != null) && (aaa.length > 1)) {
				if (i > 1) {
					imcount = ims.length / 3;
				}
				sClans[aaa[1]] = ims[0].title;
				if(bHideI) {
					t.rows[j].cells[1].innerHTML += '&nbsp;<br><img align="absmiddle" width="20" height="15" border="0" alt="'+ims[0].alt+'" title="'+ims[0].title+'" src="'+ims[0].src+'">';
					
					for(k = ims.length-1; k >= 0; k--)
						ims[k].parentNode.removeChild(ims[k]);
				};
				
				if (bCountAtt && (i > 1) && (true) ) {
					s = t.rows[j].cells[0].textContent;
					if (s.indexOf('-') >= 0)
						s = s.slice(0, s.indexOf('-'));
					if (Sectors.indexOf(s) >= 0) {
						arAtts[aCnts++] = {sector:t.rows[j].cells[0].textContent, clan:aaa[1], count: imcount};
						//alert(imcount);
					} else
						/*alert(s)*/;
				}
			}
		};
		
		if (acls.snapshotLength > 0) {
			if (bCountAtt && (i > 1) && (true) ) {
				s = t.rows[j].cells[0].textContent;
				if (s.indexOf('-') >= 0)
					s = s.slice(0, s.indexOf('-'));
				if (Sectors.indexOf(s) >= 0) {
					arAtts[aCnts++] = {sector:t.rows[j].cells[0].textContent, clan:clan_id, count:acls.snapshotLength};
				} else
					/*alert(s)*/;
			}
		}
		
		acls=getI( ".//input[contains(@type, 'submit')]", td );
		if (!bHideB) {
			bShow=bShow || (acls.snapshotLength > 0);
		} else {
			bShow= bShow && (acls.snapshotLength <= 0);
		}
		
		if (bNoFAttack)
			for (k = 0; k < acls.snapshotLength; k++) {
				if (acls.snapshotItem(k).value.indexOf(" ") < 1)
					//acls.snapshotItem(k).parentNode.removeChild(acls.snapshotItem(k));
					acls.snapshotItem(k).disabled=true;
			}
		
		if (bShow) {

/*			if (t.rows[j].cells.length < 3) {
				k = j-1;
				while (t.rows[k--].cells.length < 3) ;
				td0 = document.createElement( 'td' );
				td0.innerHTML = t.rows[k+1].cells[0].innerHTML;
				t.rows[j].insertBefore(td0, t.rows[j].cells[0]);
				t.rows[k+1].cells[0].rowSpan = j-k-1;
			}
*/
			continue;
		}
		t.rows[j].style.visibility="collapse";
			
	}
}

td = document.createElement( 'table' );
td.innerHTML = '<tr><td colspan="2"><hr></td></tr>';
for(var i = 0; i < EnemiesHints.length; i++) {
	td.innerHTML += '<tr><td><img border=0 align="absmiddle" src="http://im.heroeswm.ru/i_clans/l_a-'+(i+1)+'.gif" title="'+EnemiesHints[i]+'"></td><td><font color="#444444">'+EnemiesHints[i]+'</font></td></tr>';
}
els.snapshotItem(1).parentNode.appendChild(td);

ed1 = document.getElementById( 'zwt_clan_id' ) ;
ed1.addEventListener
(
	"change" ,
	function( event )
	{
		if(ed1.value >= 1)
			GM_setValue( "zwt_clan_id", ed1.value );
		else
			ed1.value = clan_id;
		window.location=window.location;
	},
	false
);

if (bCountAtt) {
	if (!bNoClanAttackTable) {
		var cCA = 0;
		var arCl = {};
		for(var i=0; i < aCnts; i++) {
			for (var j=0; j < cCA; j++){ 
				if (arCl[j].clan == arAtts[i].clan) {
					arCl[j].sectors[arCl[j].sectors.length] = arAtts[i].sector;
					j = -1;
					break;
				}
			}
			if (j >=0 )
				arCl[cCA++] = {clan:arAtts[i].clan, sectors:new Array(arAtts[i].sector)};
		}
	}
	var cSA = 0;
	var arSs = {};
	for(var i=0; i < aCnts; i++) {
		for (j=0; j < cSA; j++) 
			if (arSs[j].sector == arAtts[i].sector) {
				var k = arSs[j].clans.length;
				arSs[j].clans[k] = {clan:arAtts[i].clan, count:arAtts[i].count};
				if (arAtts[i].clan == clan_id)
					arSs[j].own = true;
				j = -1;
				break;
			}
		if (j >=0 ) {
			arSs[cSA++] = {clans:new Array({clan:arAtts[i].clan,count:arAtts[i].count}), sector: arAtts[i].sector, own: arAtts[i].clan==clan_id};
		}
	}

	var tCnts = document.createElement( 'table' );
	var s = '<tr><th colspan="2"><b>&#1050;&#1083;&#1072;&#1085;&#1086;&#1074;&#1099;&#1077; &#1079;&#1072;&#1103;&#1074;&#1082;&#1080; &#1085;&#1072; &#1072;&#1090;&#1072;&#1082;&#1091;</b></th></tr>';
	if (!bNoClanAttackTable) {
		for (var k=0; k < cCA; k++) {
			s += '<tr><td class="wbwhite"><img align="absmiddle" width="20" height="15" border="0" src="http://dcdn.heroeswm.ru/i_clans/l_'+arCl[k].clan+'.gif">#'+sClans[arCl[k].clan]+'</td><td class="wbwhite">'+arCl[k].sectors.length+'</td></tr>';
			for (var l =0; l < arCl[k].sectors.length; l++) 
				s += '<tr><td colspan="2">'+arCl[k].sectors[l]+'</td></tr>';
		}
		tCnts.innerHTML = s;
		tCnts.width = "90%";
		tCnts.className="wblight";
		tCnts.style.marginLeft = "10px";
		tCnts.style.marginTop = "10px";
		tRatings.parentNode.insertBefore(tCnts, tRatings.parentNode.firstChild);
		tCnts = document.createElement( 'table' );
	}
	s = '<tr><th colspan="2"><b>&#1057;&#1077;&#1082;&#1090;&#1086;&#1088;&#1072;, &#1072;&#1090;&#1072;&#1082;&#1091;&#1077;&#1084;&#1099;&#1077; &#1082;&#1083;&#1072;&#1085;&#1072;&#1084;&#1080;</b></th></tr>';
	for (var k=0; k < cSA; k++) {
		s += '<tr><td';
		if (arSs[k].own)
			s += ' bgcolor="#FFAA77"';
		else
			s += ' class="wbwhite"';
		s +='>'+arSs[k].sector+'</td><td class="wbwhite">'+arSs[k].clans.length+'</td></tr>';
		for (var l =0; l < arSs[k].clans.length; l++) 
			s += '<tr><td colspan="2"><img align="absmiddle" width="20" height="15" border="0" src="http://dcdn.heroeswm.ru/i_clans/l_'+arSs[k].clans[l].clan+'.gif">'+sClans[arSs[k].clans[l].clan]+': ('+arSs[k].clans[l].count+')</td></tr>';
	}
	tCnts.innerHTML = s;
	tCnts.width = "90%";
	tCnts.className="wblight";
	tCnts.style.marginLeft = "10px";
	tCnts.style.marginTop = "10px";
	tRatings.parentNode.insertBefore(tCnts, tRatings.parentNode.firstChild);
}

function getI(xpath,elem){return document.evaluate(xpath,(!elem?document:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
