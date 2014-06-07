// coding: utf-8
// ==UserScript==
// @name        	IkaSoor
// @version 		1.0.0
// @author		Lideon( http://userscripts.org/users/406936 )
// @homepage		http://userscripts.org/scripts/show/128859
// @description		Ajoute des Raccourcie pour les Espion et les villes
// @namespace		messages.ikariam
// @include		http://s*.ikariam.*/index.php*
// @exclude		http://support.ikariam.*/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
//-----------------------------
// CHANGELOG
//				1.0.0		Test
//
// ==/UserScript==
var version = '1.0.0';
//### Declaration Des Fonctions
jQuery(document).ready(function(){})
function impServer() 			{Server = window.location.host;
					var temp = Server.split('.');
					temp = temp[1];	
					}
function getCurrentCityId() 		{return $('#citySelect > option:selected').attr('value');}
var CurrentCityId = getCurrentCityId()
function getPosBuilding(building) 	{return $('#locations li.' + building).attr('id').substring(8);}
function impView()			{ View = $('BODY').attr('id'); }
function init() 			{ impServer(); getCurrentCityId(); impView();};
//### Declaration Des Fonctions


//VAR City_Name[X]
var city1_name 	= document.getElementById('citySelect').getElementsByTagName('option')[0].innerHTML;
var city2_name 	= document.getElementById('citySelect').getElementsByTagName('option')[1].innerHTML;
var city3_name 	= document.getElementById('citySelect').getElementsByTagName('option')[2].innerHTML;
var city4_name 	= document.getElementById('citySelect').getElementsByTagName('option')[3].innerHTML;
var city5_name 	= document.getElementById('citySelect').getElementsByTagName('option')[4].innerHTML;
var city6_name 	= document.getElementById('citySelect').getElementsByTagName('option')[5].innerHTML;
var city7_name 	= document.getElementById('citySelect').getElementsByTagName('option')[6].innerHTML;
var City_Name 	= ['City_Name[X]', city1_name, city2_name, city3_name, city4_name, city5_name, city6_name, city7_name];
//VAR City_Name[X]
//VAR City_Id[X]
var id1		= document.getElementById('citySelect').getElementsByTagName('option')[0].value;
var id2		= document.getElementById('citySelect').getElementsByTagName('option')[1].value;
var id3		= document.getElementById('citySelect').getElementsByTagName('option')[2].value;
var id4		= document.getElementById('citySelect').getElementsByTagName('option')[3].value;	
var id5		= document.getElementById('citySelect').getElementsByTagName('option')[4].value;	
var id6		= document.getElementById('citySelect').getElementsByTagName('option')[5].value;	
var id7		= document.getElementById('citySelect').getElementsByTagName('option')[6].value;	
var City_Id 	= ['City id', id1, id2, id3, id4, id5, id6, id7];
//VAR City_Id[X]
//VAR Act_City_Num & Act_City_Name & City_Num[X]
if 		( CurrentCityId == City_Id[1] ) 	{ Act_City_Num = 1;Act_City_Name = City_Name[1];}
else if 	( CurrentCityId == City_Id[2] ) 	{ Act_City_Num = 2;Act_City_Name = City_Name[2];}
else if 	( CurrentCityId == City_Id[3] ) 	{ Act_City_Num = 3;Act_City_Name = City_Name[3];}
else if 	( CurrentCityId == City_Id[4] ) 	{ Act_City_Num = 4;Act_City_Name = City_Name[4];}
else if 	( CurrentCityId == City_Id[5] ) 	{ Act_City_Num = 5;Act_City_Name = City_Name[5];}
else if 	( CurrentCityId == City_Id[6] ) 	{ Act_City_Num = 6;Act_City_Name = City_Name[6];}
else if 	( CurrentCityId == City_Id[7] ) 	{ Act_City_Num = 7;Act_City_Name = City_Name[7];}
else							{ Act_City_Num = 'Inconnu'	;Act_City_Name = 'Inconnu';}
var City_Num	= ['City_Num', 1,2,3,4,5,6,7];
//VAR Act_City_Num & Act_City_Name & City_Num[X]
//VAR City_Spy_Left[X]
var gm_spy1_left = GM_getValue('spy1_left', 0);
var gm_spy2_left = GM_getValue('spy2_left', 0);
var gm_spy3_left = GM_getValue('spy3_left', 0);
var gm_spy4_left = GM_getValue('spy4_left', 0);
var gm_spy5_left = GM_getValue('spy5_left', 0);
var gm_spy6_left = GM_getValue('spy6_left', 0);
var gm_spy7_left = GM_getValue('spy7_left', 0);
var City_Spy_Left = ['Espions Restant : ', gm_spy1_left, gm_spy2_left, gm_spy3_left, gm_spy4_left, gm_spy5_left, gm_spy6_left, gm_spy7_left];
//VAR City_Spy_Left[X]
//VAR City_Spy_Mort[X]
var smort1 	= GM_getValue('spy1_mort', 0);
var smort2 	= GM_getValue('spy2_mort', 0);
var smort3 	= GM_getValue('spy3_mort', 0);
var smort4 	= GM_getValue('spy4_mort', 0);
var smort5 	= GM_getValue('spy5_mort', 0);
var smort6 	= GM_getValue('spy6_mort', 0);
var smort7 	= GM_getValue('spy7_mort', 0);
var City_Spy_Mort = ['Espions mort', smort1, smort2, smort3, smort4, smort5, smort6, smort7];
//VAR City_Spy_Mort[X]
//VAR City_Spy_Mission[X]
var smiss1 	= GM_getValue('spy1_mission', 0);
var smiss2 	= GM_getValue('spy2_mission', 0);
var smiss3 	= GM_getValue('spy3_mission', 0);
var smiss4 	= GM_getValue('spy4_mission', 0);
var smiss5 	= GM_getValue('spy5_mission', 0);
var smiss6 	= GM_getValue('spy6_mission', 0);
var smiss7 	= GM_getValue('spy7_mission', 0);
var City_Spy_Mission = ['Espions en mission', smiss1, smiss2, smiss3, smiss4, smiss5, smiss6, smiss7];
//VAR City_Spy_Mission[X]
//VAR City_Pos_sfh[X]
var gmsfh1_pos 	= GM_getValue('sfh1_pos', 0);
var gmsfh2_pos 	= GM_getValue('sfh2_pos', 0);
var gmsfh3_pos 	= GM_getValue('sfh3_pos', 0);
var gmsfh4_pos 	= GM_getValue('sfh4_pos', 0);
var gmsfh5_pos 	= GM_getValue('sfh5_pos', 0);
var gmsfh6_pos 	= GM_getValue('sfh6_pos', 0);
var gmsfh7_pos 	= GM_getValue('sfh7_pos', 0);
var City_Pos_sfh = ['Position Cachettes', gmsfh1_pos, gmsfh2_pos, gmsfh3_pos, gmsfh4_pos, gmsfh5_pos, gmsfh6_pos, gmsfh7_pos];
//VAR City_Pos_sfh[X]
//VAR City_Pos_tpl[X]
var gmtpl1_pos 	= GM_getValue('tpl1_pos', 0);
var gmtpl2_pos 	= GM_getValue('tpl2_pos', 0);
var gmtpl3_pos 	= GM_getValue('tpl3_pos', 0);
var gmtpl4_pos 	= GM_getValue('tpl4_pos', 0);
var gmtpl5_pos 	= GM_getValue('tpl5_pos', 0);
var gmtpl6_pos 	= GM_getValue('tpl6_pos', 0);
var gmtpl7_pos 	= GM_getValue('tpl7_pos', 0);
var City_Pos_tpl = ['Position Cachettes', gmtpl1_pos, gmtpl2_pos, gmtpl3_pos, gmtpl4_pos, gmtpl5_pos, gmtpl6_pos, gmtpl7_pos];
//VAR City_Pos_sfh[X]
//VAR City_Pos_atl[X]
var gmatl1_pos 	= GM_getValue('atl1_pos', 0);
var gmatl2_pos 	= GM_getValue('atl2_pos', 0);
var gmatl3_pos 	= GM_getValue('atl3_pos', 0);
var gmatl4_pos 	= GM_getValue('atl4_pos', 0);
var gmatl5_pos 	= GM_getValue('atl5_pos', 0);
var gmatl6_pos 	= GM_getValue('atl6_pos', 0);
var gmatl7_pos 	= GM_getValue('atl7_pos', 0);
var City_Pos_atl = ['Position Atelier', gmatl1_pos, gmatl2_pos, gmatl3_pos, gmatl4_pos, gmatl5_pos, gmatl6_pos, gmatl7_pos];
//VAR City_Pos_atl[X]
//VAR City_Pos_whs[X]
var gmwhs1_pos 	= GM_getValue('whs1_pos', 0);
var gmwhs2_pos 	= GM_getValue('whs2_pos', 0);
var gmwhs3_pos 	= GM_getValue('whs3_pos', 0);
var gmwhs4_pos 	= GM_getValue('whs4_pos', 0);
var gmwhs5_pos 	= GM_getValue('whs5_pos', 0);
var gmwhs6_pos 	= GM_getValue('whs6_pos', 0);
var gmwhs7_pos 	= GM_getValue('whs7_pos', 0);
var City_Pos_whs = ['Position whs', gmwhs1_pos, gmwhs2_pos, gmwhs3_pos, gmwhs4_pos, gmwhs5_pos, gmwhs6_pos, gmwhs7_pos];
//VAR City_Pos_whs[X]
//##	Variables txt_Xxx 
var txt_cach			= 'Cachette Sur '
var txt_tocity			= 'Vers '
var txt_mvrs			= 'Deplacer ressources vers  '
var txt_mvarm			= 'Deplacer Soldats vers  '
var txt_mvflt			= 'Deplacer Naval vers  '
var txt_viewarmy		= 'Voir Soldats sur  '
var txt_viewfleet		= 'Voir Naval sur  '
var txt_lgnperso		= 'Afficher les Tableau Perso  '
var txt_lgnopt			= 'Afficher les Options Mouvement & Armée-Naval  '
var txt_spyleft			= 'En Defense :  '		
var txt_spymission		= 'En Missions :  '		
var txt_spymort			= 'En Attente De Formation :  '	
var txt_ent_safe		= ' Ressources de Chaque Type sont protegées sur '			
//##	Variables txt_Xxx ##//
//Fonction par variable   Afficher-Masquer Differentes Option
var statu_depress 		= '"javascript:if (document.getElementById(\'depress\').style.display 	== \'none\') document.getElementById(\'depress\').style.display 	= \'block\';else document.getElementById(\'depress\').style.display = \'none\'"';
var statu_deparmy 		= '"javascript:if (document.getElementById(\'deparmy\').style.display 	== \'none\') document.getElementById(\'deparmy\').style.display 	= \'block\';else document.getElementById(\'deparmy\').style.display = \'none\';"';
var statu_depnav 		= '"javascript:if (document.getElementById(\'depnav\').style.display 	== \'none\') document.getElementById(\'depnav\').style.display 		= \'block\';else document.getElementById(\'depnav\').style.display = \'none\';"';
var statu_viewarmy 		= '"javascript:if (document.getElementById(\'viewarmy\').style.display 	== \'none\') document.getElementById(\'viewarmy\').style.display 	= \'block\';else document.getElementById(\'viewarmy\').style.display = \'none\';"';
var statu_viewfleet 		= '"javascript:if (document.getElementById(\'viewfleet\').style.display == \'none\') document.getElementById(\'viewfleet\').style.display 	= \'block\';else document.getElementById(\'viewfleet\').style.display = \'none\';"';
//Fonction par variable   Afficher-Masquer Differentes Option
//Fonction Tip et UnTip
var untp			=' onmouseout="UnTip()"';
var tpd				=' onmouseover="Tip(\'';
var tpf				=' \')"';
//Fonction Tip et UnTip
var _tbl_ 			='<table>'; 			var _tbl 			='<table '; 
var _ftbl_ 			='</table>';			var tblttl 			='<h3 class="header">';
var ftblttl 			='</h3>';			var _tr_ 			='<tr>'; 
var _tr 			='<tr '; 			var _ftr_ 			='</tr>';
var _td_ 			='<td>'; 			var _td				='<td '; 
var _ftd_ 			='</td>';			var x_				='>';
var _imgsrc 			='<img src=';			var _ahref 			='<a href='; 
var _fa_			='</a>';			var fop				='"';
var tblwdt95 			='width="95%"';			var tblwdt85 			='width="85%"';
var tblmax 			='width="100%"'; 		var onclck 			='<a onclick= ';
var stlaln_cen 			='align="center"';		var stlaln_lft 			='align="left"';
var stlaln_rgt 			='align="right"';		var stlinl			='style="display:inline"';	
var stlnone			='style="display:none"';	var stldisp			='style="display:"';
var itmwdt1	 		='width="1px"';			var itmwdt2  			='width="2px"';
var itmwdt3  			='width="3px"'; 		var itmwdt4  			='width="4px"';
var itmwdt5  			='width="5px"'; 		var itmwdt6  			='width="6px"';
var itmwdt7  			='width="7px"'; 		var itmwdt8  			='width="8px"';
var itmwdt9  			='width="9px"'; 		var itmwdt10 			='width="10px"';
var itmwdt13 			='width="13px"';
var itmwdt15 			='width="15px"';		var itmwdt16 			='width="16px"';
var itmwdt17 			='width="17px"';		var itmwdt18 			='width="18px"';
var itmwdt19			='width="19px"';		var itmwdt20 			='width="20px"';
var itmwdt21 			='width="21px"';		var itmwdt22 			='width="22px"';
var itmwdt23 			='width="23px"';		var itmwdt24 			='width="24px"';
var itmwdt25 			='width="25px"';		var itmwdt30 			='width="30px"';
var itmwdt31 			='width="31px"';		var itmwdt32 			='width="32px"';
var itmwdt33 			='width="33px"';		var itmwdt34 			='width="34px"';
var itmwdt35 			='width="35px"';		var itmwdt36 			='width="36px"';
var itmwdt37 			='width="37px"';
var itmhgt1	 		='height="1px"' ;		var itmhgt2  			='height="2px"' ;
var itmhgt3	 		='height="3px"' ;		var itmhgt4  			='height="4px"' ;
var itmhgt5  			='height="5px"'; 		var itmhgt6  			='height="6px"' ;
var itmhgt7  			='height="7px"' ;		var itmhgt8  			='height="8px"' ;
var itmhgt9  			='height="9px"' ;		var itmhgt10 			='height="10px"';
var itmhgt11 			='height="11px"';		var itmhgt12 			='height="12px"';
var itmhgt13 			='height="13px"';		var itmhgt14 			='height="14px"';
var itmhgt15 			='height="15px"';		var itmhgt16 			='height="16px"';
var itmhgt17 			='height="17px"';		var itmhgt18 			='height="18px"';
var itmhgt19 			='height="19px"';		var itmhgt20 			='height="20px"';
var itmhgt21 			='height="21px"';		var itmhgt22 			='height="22px"';
var itmhgt23 			='height="23px"';		var itmhgt24 			='height="24px"';
var itmhgt25 			='height="25px"';
////Var Images Ressources
var rswood 			= '"http://s10.fr.ikariam.com/skin/resources/icon_wood.gif"';
var rsmar 			= '"http://s10.fr.ikariam.com/skin/resources/icon_marble.gif"';
var rsvin 			= '"http://s10.fr.ikariam.com/skin/resources/icon_wine.gif"';
var rsglass			= '"http://s10.fr.ikariam.com/skin/resources/icon_glass.gif"';
var rsslf			= '"http://s10.fr.ikariam.com/skin/resources/icon_sulfur.gif"';
////Var Images Ressources
////Var Images Batiments
var img_hdv			= '"http://s10.fr.ikariam.com/skin/img/city/building_townhall.gif"';
var img_wall			= '"http://s10.fr.ikariam.com/skin/buildings/y100/wall.gif"';
var img_cach			= '"http://s10.fr.ikariam.com/skin/img/city/building_safehouse.gif"';
var img_tploff			= '"data:image/gif;base64,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"';
////Var Images Batiments
////Var Images Design
var sepv 			='"data:image/gif;base64,R0lGODlhBAAPAPcAANSrd9WsdNSsdtatd9SqeNWredSseNWtedu/ftzBftzAf9u/gN3BgNzAgd7Cg/Pnt/LlufPmufPlvvXnuPTlvPTqt/bou/bquPTquQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAABAAPAAAIPAAJYMCgoMBABgUqVEB44QIDAg0fRoR4QQFFBQcsWHAAIEIEBAIgQFgQQIKEBgIoUGhgYMIEBgMePEgQEAA7"';
var seph 			='"data:image/gif;base64,R0lGODlhDwAEAPcAANSrd9WsdNSsdtatd9SqeNWredSseNWtedu/ftzBftzAf9u/gN3BgNzAgd7Cg/Pnt/LlufPmufPlvvXnuPTlvPTqt/bou/bquPTquQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAADwAEAAAIOAAHGBAQQACAAwQSEijAkMCDCRQkQIhg4YJFixUwYHgYcWLFixcyYkjAoEGDBQgcKFDAoGVLBQEBADs%3D"';
////Var Images Design
////Var Images Autre
var imgrapcb			='"http://s16.fr.ikariam.com/skin/unitdesc/unit_attack.gif"';
var imgspyr			='"http://s16.fr.ikariam.com/skin/layout/icon-status-small.gif"';
var imgtemple			='"http://s16.fr.ikariam.com/skin/img/city/building_temple.gif"';
var imgatelier			='"http://s16.fr.ikariam.com/skin/img/city/building_workshop.gif"';
var imgarmy			='"http://s16.fr.ikariam.com/skin/actions/plunder.gif"';
var imgfleet			='"http://s16.fr.ikariam.com/skin/actions/blockade.gif"';
var imgmvrs     		='"http://s16.fr.ikariam.com/skin/actions/transport.gif"';
var goterre			='"http://s16.fr.ikariam.com/skin/actions/move_army.gif"';
var gonaval			='"http://s16.fr.ikariam.com/skin/actions/move_fleet.gif"';
var img_gene			='"http://s16.fr.ikariam.com/skin/relatedCities/general.gif"';
////Var Images Autre
var url_view 			= '/index.php?view=';
var url_pos 			= '&position=';
var url_depl 			= '&deploymentType=';
var url_id 			= '&id=';
var url_srap			= '&tab=reports';
var url_mvrs 			= '&destinationCityId=';
var url_maj			= 'http://userscripts.org/scripts/source/128859.user.js';



init();															


City_rs 	= ['Ressources de Luxe', 	rsmar, 	                 rsvin, 	          rsvin,                   rsglass,                 rsslf,                   rsmar,                   rsslf];
City_ent_lvl 	= ['Entrepot Level',		20+13, 	                 11+18+13,                18+11+14,                12+10+10,                7+5+8,                   3+7+6+5,                 3+2+2 ];
City_safe	= ['Ressources Safe : ', 	City_ent_lvl[1]*480+100, City_ent_lvl[2]*480+100, City_ent_lvl[3]*480+100, City_ent_lvl[4]*480+100, City_ent_lvl[5]*480+100, City_ent_lvl[6]*480+100, City_ent_lvl[7]*480+100 ];
City_safe2	= ['Ressources Safe : ', 	City_safe[1]*2,	         City_safe[2]*2,          City_safe[3]*2,          City_safe[4]*2,          City_safe[5]*2,          City_safe[6]*2,          City_safe[7]*2];
																								//


{//V3//### Capture Variables Dans Cachettes//								#
	if (View == 'safehouse'){//													#/+++++++++++++++++++++++++++++/+
	var Act_Spy_Left = document.getElementById('reportInboxLeft').getElementsByTagName('li')[1].innerHTML;	//	+
	var Act_Spy_Left00 = Act_Spy_Left.charAt(0)+''+Act_Spy_Left.charAt(1);//									+
	if ( Act_City_Num == 1 ) { GM_setValue ('spy1_left', Act_Spy_Left00);}//									+
	if ( Act_City_Num == 2 ) { GM_setValue ('spy2_left', Act_Spy_Left00);}//									+
	if ( Act_City_Num == 3 ) { GM_setValue ('spy3_left', Act_Spy_Left00);}//									+
	if ( Act_City_Num == 4 ) { GM_setValue ('spy4_left', Act_Spy_Left00);}//									+
	if ( Act_City_Num == 5 ) { GM_setValue ('spy5_left', Act_Spy_Left00);}//									+
	if ( Act_City_Num == 6 ) { GM_setValue ('spy6_left', Act_Spy_Left00);}//									+
	if ( Act_City_Num == 7 ) { GM_setValue ('spy7_left', Act_Spy_Left00);}//									+
	//																											+
	var Act_Spy_Mort = document.getElementById('reportInboxLeft').getElementsByTagName('li')[0].innerHTML;//	+
	var Act_Spy_Mort00 =  Act_Spy_Mort.charAt(0)+''+Act_Spy_Mort.charAt(1);//									+
	if ( Act_City_Num == 1 ) { GM_setValue ('spy1_mort', Act_Spy_Mort00);}//									+
	if ( Act_City_Num == 2 ) { GM_setValue ('spy2_mort', Act_Spy_Mort00);}//									+
	if ( Act_City_Num == 3 ) { GM_setValue ('spy3_mort', Act_Spy_Mort00);}//									+
	if ( Act_City_Num == 4 ) { GM_setValue ('spy4_mort', Act_Spy_Mort00);}//									+
	if ( Act_City_Num == 5 ) { GM_setValue ('spy5_mort', Act_Spy_Mort00);}//									+
	if ( Act_City_Num == 6 ) { GM_setValue ('spy6_mort', Act_Spy_Mort00);}//									+
	if ( Act_City_Num == 7 ) { GM_setValue ('spy7_mort', Act_Spy_Mort00);}//									+
	//																											+
	var Act_Spy_Mission = document.getElementById('reportInboxLeft').getElementsByTagName('li')[2].innerHTML;//	+
	var Act_Spy_Mission00 = Act_Spy_Mission.charAt(0)+''+Act_Spy_Mission.charAt(1);	//							+
	if ( Act_City_Num == 1 ) { GM_setValue ('spy1_mission', Act_Spy_Mission00);}//								#
	if ( Act_City_Num == 2 ) { GM_setValue ('spy2_mission', Act_Spy_Mission00);}//								#
	if ( Act_City_Num == 3 ) { GM_setValue ('spy3Document sans nom 1_mission', Act_Spy_Mission00);}//								#
	if ( Act_City_Num == 4 ) { GM_setValue ('spy4_mission', Act_Spy_Mission00);}//								#
	if ( Act_City_Num == 5 ) { GM_setValue ('spy5_mission', Act_Spy_Mission00);}//								#
	if ( Act_City_Num == 6 ) { GM_setValue ('spy6_mission', Act_Spy_Mission00);}//								#
	if ( Act_City_Num == 7 ) { GM_setValue ('spy7_mission', Act_Spy_Mission00);}//								#
	}//																			#/#############################/#
}//V3//### Capture Variables Dans Cachettes									#
{//V3//### Capture Position des Cachettes Dans Ville						#
	if (View == 'city' ){//														#
	if ( Act_City_Num == 1 ) { var safehouse1_pos = getPosBuilding('safehouse');GM_setValue ('sfh1_pos', safehouse1_pos);}
	if ( Act_City_Num == 2 ) { var safehouse2_pos = getPosBuilding('safehouse');GM_setValue ('sfh2_pos', safehouse2_pos);}
	if ( Act_City_Num == 3 ) { var safehouse3_pos = getPosBuilding('safehouse');GM_setValue ('sfh3_pos', safehouse3_pos);}
	if ( Act_City_Num == 4 ) { var safehouse4_pos = getPosBuilding('safehouse');GM_setValue ('sfh4_pos', safehouse4_pos);}
	if ( Act_City_Num == 5 ) { var safehouse5_pos = getPosBuilding('safehouse');GM_setValue ('sfh5_pos', safehouse5_pos);}
	if ( Act_City_Num == 6 ) { var safehouse6_pos = getPosBuilding('safehouse');GM_setValue ('sfh6_pos', safehouse6_pos);}
	if ( Act_City_Num == 7 ) { var safehouse7_pos = getPosBuilding('safehouse');GM_setValue ('sfh7_pos', safehouse7_pos);}
	}//																			#
}//V3//### Capture Position des Cachettes Dans Ville						#
{//V3//### Capture Position des Temples Dans Ville							#
		if (View == 'city' ){//													#
		if ( Act_City_Num == 1 ) { var temple1_pos = getPosBuilding('temple');GM_setValue ('tpl1_pos', temple1_pos);}
		if ( Act_City_Num == 2 ) { var temple2_pos = getPosBuilding('temple');GM_setValue ('tpl2_pos', temple2_pos);}
		if ( Act_City_Num == 3 ) { var temple3_pos = getPosBuilding('temple');GM_setValue ('tpl3_pos', temple3_pos);}
		if ( Act_City_Num == 4 ) { var temple4_pos = getPosBuilding('temple');GM_setValue ('tpl4_pos', temple4_pos);}
		if ( Act_City_Num == 5 ) { var temple5_pos = getPosBuilding('temple');GM_setValue ('tpl5_pos', temple5_pos);}
		if ( Act_City_Num == 6 ) { var temple6_pos = getPosBuilding('temple');GM_setValue ('tpl6_pos', temple6_pos);}
		if ( Act_City_Num == 7 ) { var temple7_pos = getPosBuilding('temple');GM_setValue ('tpl7_pos', temple7_pos);}
		}//																		#
}//V3//### Capture Position des Temples Dans Ville							#
{//V3//### Capture Position des Ateliers Dans Ville							#
	if (View == 'city' ){//														#
		if ( Act_City_Num == 4 ) { var atelier4_pos = getPosBuilding('workshop');GM_setValue ('atl4_pos', atelier4_pos);}
	}//																			#
}//V3//### Capture Position des Ateliers Dans Ville							#
	








//#######################################################
//#######################################################
if (View != 'militaryAdvisorDetailedReportView')	{
	var 
	s  = '';
	s += '<div class="dynamic" id="perso" style="display:none">';
	s += _tbl+tblmax+x_+_tr_+_td_+tblttl ;
	s +=		_ahref+'"http://'+Server+'/index.php?view=embassyGeneralAttacksToAlly&id=197200&position=13">attVSsoor</a>';
	s += 		'-'+_ahref+'"http://'+Server+'/index.php?view=embassyGeneralAttacksFromAlly&id=197200&position=13">soorVSatt</a>';
	s += 		'-'+_ahref+'"http://'+Server+'/index.php?view=embassyGeneralTroops&id=197200&position=13">TroupSooR</a>';	
	s += ftblttl+_ftd_+_ftr_+_ftbl_;
	s += '<div class="footer"></div>';
	s += '</div>';
	if(View == 'city'){$(s).insertBefore('#information');}
	else{$(s).insertBefore('#breadcrumbs');}
							}
//######################################################
//######################################################






															














//######################################################
//######################################################

{// V3//### AFFICHAGE Tableau Colonne Automatic 									
	if (View != 'militaryAdvisorDetailedReportView'){//							
		var i=0; var num=0;//																	
		var  	//																
		s  = '<div class="dynamic">';//										
		s += 	_tbl+stlaln_cen+tblmax+x_+_tr_+_td_+tblttl+'';//		
		s += 		_tbl+tblmax+x_+_tr_;//							
		s += 			_td+stlaln_lft+x_+' &nbsp;&nbsp;Ika Spy SOOR '+_ahref+fop+url_maj+fop+x_+version+_fa_+_ftd_;
		s += 			_td+stlaln_cen+itmwdt25+x_+onclck+'"javascript:if (document.getElementById(\'option\').style.display == \'none\') document.getElementById(\'option\').style.display = \'block\';else document.getElementById(\'option\').style.display = \'none\';" ' +tpd+txt_lgnopt  +tpf+x_+'<img src='+gonaval  +itmhgt15+stlinl+x_+'</a>'+_ftd_;
		s += 			_td+stlaln_cen+itmwdt25+x_+onclck+'"javascript:if (document.getElementById(\'perso\').style.display  == \'none\') document.getElementById(\'perso\').style.display  = \'block\';else document.getElementById(\'perso\').style.display  = \'none\';" ' +tpd+txt_lgnperso+tpf+x_+'<img src='+img_gene+itmhgt18+stlinl+x_+'</a>'+_ftd_;
		s += _ftr_;//															#
		s += 		_ftbl_;//													#
		s += '	</h3>'+_ftd_+_ftr_+_ftbl_//										#
		{// V3//### colone automatique Changer Ville	//						#
			s += _tbl+stlaln_cen+tblwdt95+x_+_tr_;	//							#
			for(i=1; i<8; i++){ n = i-1;	//									#
				s += _td+stlaln_cen+itmwdt13+stlinl+x_+onclck+' var s = document.getElementById(citySelect);s.selectedIndex = n ;s.form.submit();return false;" href="?view=city'+url_id+City_Id[i]+fop+tpd+txt_tocity+City_Name[i]+tpf+x_+_imgsrc+img_hdv+itmwdt13+stlinl+x_+_imgsrc+City_rs[i]+itmhgt10+stlinl+tpd+tpf+x_+_fa_+_ftd_;
				if (i<7){s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt15+itmwdt3+x_+_ftd_;}
				var num = num+i;}	//											#
			s += _ftr_+_ftbl_;	//												#
		}// V3//### colone automatique Changer Ville	//						#
		{// V3//### Separation Horizontal										#
			s += _tbl+stlaln_cen+tblwdt95+x_+_tr_+_td+stlaln_cen+x_+_imgsrc+seph+tblmax+itmhgt3+x_+_ftd_+_ftr_+_ftbl_;
		}// V3//### Separation Horizontal										#
		{// V3//### colone automatique Cachette									#
			var i=0; var num=0;	//												#
			s += _tbl+stlaln_cen+tblwdt95+x_+_tr_;	//							#
			for(i=1; i<8; i++){	//												#
				s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'safehouse'+url_pos+City_Pos_sfh[i]+url_id+City_Id[i]+fop+x_+_imgsrc+img_cach+itmwdt20+stlinl+tpd+'<b>'+txt_cach+City_Name[i]+'</b><br>'+txt_spyleft+'<b>'+City_Spy_Left[i]+'</b><br>'+txt_spymission+'<b>'+City_Spy_Mission[i]+'</b><br>'+txt_spymort+'<b>'+City_Spy_Mort[i]+'</b>'+tpf+x_+_fa_+_ftd_
				if (i<7){s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt16+itmwdt3+x_+_ftd_;}
				var num = num+i;}				//								#
			s += _ftr_+_ftbl_;	//												#
		}// V3//### colone automatique Cachette									#
		{// V3//### Separation Horizontal										#
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_+_td+stlaln_cen+x_+_imgsrc+seph+tblmax+itmhgt3+x_+_ftd_+_ftr_+_ftbl_;
		}// V3//### Separation Horizontal	//									#

{//##	Séparation Horizontal
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_+_td+stlaln_cen+x_+_imgsrc+seph+tblmax+itmhgt3+x_+_ftd_+_ftr_+_ftbl_;
}//##	Séparation Horizontal
		{// V3//### colone automatique Ressources Mines							#	
			var i=0; var num=0;	//												#
			s += _tbl+stlaln_cen+tblwdt95+x_+_tr_;	//							#
			for(i=1; i<8; i++){s += _td+stlaln_cen+itmwdt34+tpd+'<b>'+City_safe[i]+'</b>'+txt_ent_safe+'<b>'+City_Name[i]+'</b>'+tpf+x_+_imgsrc+City_rs[i]+itmhgt10+stlinl+x_+_imgsrc+rswood+itmhgt10+stlinl+x_+_ftd_;
				if (i<7){s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt15+itmwdt3+x_+_ftd_;}
				var num = num+i;}				//								#
			s += _ftr_+_ftbl_;	//												#
		}// V3//### colone automatique Ressources Mines							#
		{// V3//### Separation Horizontal										#
			s += _tbl+stlaln_cen+tblwdt95+x_+_tr_+_td+stlaln_cen+x_+_imgsrc+seph+tblmax+itmhgt3+x_+_ftd_+_ftr_+_ftbl_;
		}// V3//### Separation Horizontal										#
		{//##	Séparation Horizontal
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_+_td+stlaln_cen+x_+_imgsrc+seph+tblmax+itmhgt3+x_+_ftd_+_ftr_+_ftbl_;
	}//##	Séparation Horizontal
			s += '<div class="footer"></div>';	//								+
			s += '</div>';	//													+
			if(View == 'city'){$(s).insertBefore('#information');}	//			+
			else{$(s).insertBefore('#breadcrumbs');}	//						+
		}	//	fin view														+
}// V3//### AFFICHAGE Tableau Colonne Automatic 								+
//######################################################
//######################################################





//######################################################
//######################################################
if (View != 'militaryAdvisorDetailedReportView')	{
	var 
	s  = '';
	s += '<div class="dynamic" id="option"'+stlnone+'>';
//##	Ligne Titre
	s += _tbl+tblmax+x_+_tr_+_td_+tblttl ;
	s += _tbl+stlaln_cen+tblwdt95+' id="xxs"'+x_+_tr_;
	s += _td+stlaln_cen+itmwdt34+x_+onclck+statu_depress+tpd+txt_mvrs+' une Ville'+tpf+' >'+_imgsrc+imgmvrs+itmwdt30+stlinl+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+itmwdt34+x_+onclck+statu_deparmy+tpd+txt_mvarm+' une Ville'+tpf+' >'+_imgsrc+goterre+itmwdt30+stlinl+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+itmwdt34+x_+onclck+statu_depnav+tpd+txt_mvflt+' une Ville'+tpf+' >'+_imgsrc+gonaval+itmwdt30+stlinl+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+itmwdt34+x_+onclck+statu_viewarmy+tpd+txt_viewarmy+' une Ville'+tpf+' >'+_imgsrc+imgarmy+itmwdt30+stlinl+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+itmwdt34+x_+onclck+statu_viewfleet+tpd+txt_viewfleet+' une Ville'+tpf+' >'+_imgsrc+imgfleet+itmwdt30+stlinl+x_+_fa_+_ftd_;
	s += _ftr_+_ftbl_;
	s += ftblttl+_ftd_+_ftr_+_ftbl_;
//##	Ligne Titre
//##	Séparation Horizontal
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_+_td+stlaln_cen+x_+_imgsrc+seph+tblmax+itmhgt3+x_+_ftd_+_ftr_+_ftbl_;
//##	Séparation Horizontal
//##	Colone automatique Ressources Mines	
	var i=0; var num=0;
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_;
	for(i=1; i<8; i++){s += _td+stlaln_cen+itmwdt34+x_+_imgsrc+City_rs[i]+itmhgt10+stlinl+x_+_imgsrc+rswood+itmhgt10+stlinl+x_+_ftd_;
	if (i<7){s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt22+itmwdt3+x_+_ftd_;}
	var num = num+i;}				
	s += _ftr_+_ftbl_;
//##	Colone automatique Ressources Mines
//##	Séparation Horizontal
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_+_td+stlaln_cen+x_+_imgsrc+seph+tblmax+itmhgt3+x_+_ftd_+_ftr_+_ftbl_;
//##	Séparation Horizontal
//##	Deplacer Ressources
	s += _tbl+stlaln_cen+' id="depress"'+tblwdt95+stlnone+x_+_tr_ ;//
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'transport'+url_mvrs+City_Id[1]+fop+tpd+txt_mvrs+City_Name[1]+tpf+x_+_imgsrc+imgmvrs+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += _td+stlaln_cen+itmwdt4+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'transport'+url_mvrs+City_Id[2]+fop+tpd+txt_mvrs+City_Name[2]+tpf+x_+_imgsrc+imgmvrs+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += _td+stlaln_cen+itmwdt4+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'transport'+url_mvrs+City_Id[3]+fop+tpd+txt_mvrs+City_Name[3]+tpf+x_+_imgsrc+imgmvrs+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += _td+stlaln_cen+itmwdt4+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'transport'+url_mvrs+City_Id[4]+fop+tpd+txt_mvrs+City_Name[4]+tpf+x_+_imgsrc+imgmvrs+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += _td+stlaln_cen+itmwdt4+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'transport'+url_mvrs+City_Id[5]+fop+tpd+txt_mvrs+City_Name[5]+tpf+x_+_imgsrc+imgmvrs+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += _td+stlaln_cen+itmwdt4+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'transport'+url_mvrs+City_Id[6]+fop+tpd+txt_mvrs+City_Name[6]+tpf+x_+_imgsrc+imgmvrs+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += _td+stlaln_cen+itmwdt4+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'transport'+url_mvrs+City_Id[7]+fop+tpd+txt_mvrs+City_Name[7]+tpf+x_+_imgsrc+imgmvrs+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += _ftr_+_ftbl_;
//##	Deplacer Ressources
//##	Deplacer Terrestre
	s += _tbl+stlaln_cen+' id="deparmy"'+tblwdt95+stlnone+x_+_tr_ ;
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'deployment'+url_depl+'army'+url_mvrs+City_Id[1]+fop+tpd+txt_mvarm+City_Name[1]+tpf+x_+_imgsrc+goterre+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'deployment'+url_depl+'army'+url_mvrs+City_Id[2]+fop+tpd+txt_mvarm+City_Name[2]+tpf+x_+_imgsrc+goterre+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'deployment'+url_depl+'army'+url_mvrs+City_Id[3]+fop+tpd+txt_mvarm+City_Name[3]+tpf+x_+_imgsrc+goterre+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'deployment'+url_depl+'army'+url_mvrs+City_Id[4]+fop+tpd+txt_mvarm+City_Name[4]+tpf+x_+_imgsrc+goterre+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'deployment'+url_depl+'army'+url_mvrs+City_Id[5]+fop+tpd+txt_mvarm+City_Name[5]+tpf+x_+_imgsrc+goterre+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'deployment'+url_depl+'army'+url_mvrs+City_Id[6]+fop+tpd+txt_mvarm+City_Name[6]+tpf+x_+_imgsrc+goterre+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'deployment'+url_depl+'army'+url_mvrs+City_Id[7]+fop+tpd+txt_mvarm+City_Name[7]+tpf+x_+_imgsrc+goterre+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += _ftr_+_ftbl_;
//##	Deplacer Terrestre
//##	Deplacer Naval
	s += _tbl+stlaln_cen+' id="depnav"'+tblwdt95+stlnone+x_+_tr_ ;
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'deployment'+url_depl+'fleet'+url_mvrs+City_Id[1]+fop+tpd+txt_mvflt+City_Name[1]+tpf+x_+_imgsrc+gonaval+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'deployment'+url_depl+'fleet'+url_mvrs+City_Id[2]+fop+tpd+txt_mvflt+City_Name[2]+tpf+x_+_imgsrc+gonaval+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'deployment'+url_depl+'fleet'+url_mvrs+City_Id[3]+fop+tpd+txt_mvflt+City_Name[3]+tpf+x_+_imgsrc+gonaval+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'deployment'+url_depl+'fleet'+url_mvrs+City_Id[4]+fop+tpd+txt_mvflt+City_Name[4]+tpf+x_+_imgsrc+gonaval+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'deployment'+url_depl+'fleet'+url_mvrs+City_Id[5]+fop+tpd+txt_mvflt+City_Name[5]+tpf+x_+_imgsrc+gonaval+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'deployment'+url_depl+'fleet'+url_mvrs+City_Id[6]+fop+tpd+txt_mvflt+City_Name[6]+tpf+x_+_imgsrc+gonaval+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'deployment'+url_depl+'fleet'+url_mvrs+City_Id[7]+fop+tpd+txt_mvflt+City_Name[7]+tpf+x_+_imgsrc+gonaval+itmhgt15+stlinl+x_+_fa_+_ftd_ ;

	s += _ftr_+_ftbl_;
//##	Deplacer Naval
//##	Voir Soldat dans Ville
	s += _tbl+stlaln_cen+' id="viewarmy"'+tblwdt95+stlnone+x_+_tr_ ;
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'cityMilitary-army'+url_id+City_Id[1]+fop+tpd+txt_viewarmy+City_Name[1]+tpf+x_+_imgsrc+imgarmy+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'cityMilitary-army'+url_id+City_Id[2]+fop+tpd+txt_viewarmy+City_Name[2]+tpf+x_+_imgsrc+imgarmy+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'cityMilitary-army'+url_id+City_Id[3]+fop+tpd+txt_viewarmy+City_Name[3]+tpf+x_+_imgsrc+imgarmy+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'cityMilitary-army'+url_id+City_Id[4]+fop+tpd+txt_viewarmy+City_Name[4]+tpf+x_+_imgsrc+imgarmy+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'cityMilitary-army'+url_id+City_Id[5]+fop+tpd+txt_viewarmy+City_Name[5]+tpf+x_+_imgsrc+imgarmy+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'cityMilitary-army'+url_id+City_Id[6]+fop+tpd+txt_viewarmy+City_Name[6]+tpf+x_+_imgsrc+imgarmy+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'cityMilitary-army'+url_id+City_Id[7]+fop+tpd+txt_viewarmy+City_Name[7]+tpf+x_+_imgsrc+imgarmy+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += _ftr_+_ftbl_;
//##	Voir Soldat dans Ville
//##	Voir Naval dans Ville
	s += _tbl+stlaln_cen+' id="viewfleet"'+tblwdt95+stlnone+x_+_tr_ ;
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'cityMilitary-fleet'+url_id+City_Id[1]+fop+tpd+txt_viewfleet+City_Name[1]+tpf+x_+_imgsrc+imgfleet+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'cityMilitary-fleet'+url_id+City_Id[2]+fop+tpd+txt_viewfleet+City_Name[2]+tpf+x_+_imgsrc+imgfleet+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'cityMilitary-fleet'+url_id+City_Id[3]+fop+tpd+txt_viewfleet+City_Name[3]+tpf+x_+_imgsrc+imgfleet+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'cityMilitary-fleet'+url_id+City_Id[4]+fop+tpd+txt_viewfleet+City_Name[4]+tpf+x_+_imgsrc+imgfleet+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'cityMilitary-fleet'+url_id+City_Id[5]+fop+tpd+txt_viewfleet+City_Name[5]+tpf+x_+_imgsrc+imgfleet+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'cityMilitary-fleet'+url_id+City_Id[6]+fop+tpd+txt_viewfleet+City_Name[6]+tpf+x_+_imgsrc+imgfleet+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'cityMilitary-fleet'+url_id+City_Id[7]+fop+tpd+txt_viewfleet+City_Name[7]+tpf+x_+_imgsrc+imgfleet+itmhgt15+stlinl+x_+_fa_+_ftd_ ;
	s += _ftr_+_ftbl_;
//##	Voir Naval dans Ville

		s += '<div class="footer"></div>';
		s += '</div>';
		if(View == 'city'){$(s).insertBefore('#information');}
		else{$(s).insertBefore('#breadcrumbs');}

							}	
//######################################################
//######################################################


