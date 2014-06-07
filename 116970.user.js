// coding: utf-8
// ==UserScript==
// @name        Wunka Ika Spy XGL
// @version 	2.0
// @author		Lideon( http://userscripts.org/users/406936 )
// @homepage	http://userscripts.org/scripts/show/116082
// @description	Ajoute des Raccourcie pour les Espion et les villes
// @namespace	messages.ikariam
// @include		http://s*.ikariam.*/index.php*
// @exclude		http://support.ikariam.*/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require		http://userscripts.org/scripts/source/115235.user.js
//-----------------------------
// CHANGELOG
// 				2.0 Var Version + Variable SepV & SepH
//
// ==/UserScript==
var version = '2.0';

jQuery(document).ready(function(){})


{//V2//	Toutes les Fonctions

{//V2//	Fonction impServer + var Server
 function impServer() {
		Server = window.location.host;
		var temp = Server.split('.');
		temp = temp[1];	
		}
}//V2//	Fonction impServer + var Server
{//V2//	Fonction getCurrentCityId + var CurrentCityId 
function getCurrentCityId() {
		return $('#citySelect > option:selected').attr('value');
		}
var CurrentCityId = getCurrentCityId()
}//V2//	Fonction getCurrentCityId + var CurrentCityId 
{//V2//	Fonction getPosBuilding(building)
function getPosBuilding(building) {
		return $('#locations li.' + building).attr('id').substring(8);
		}
}//V2//	Fonction getPosBuilding(building)
{//V2//	Fonction impView + var View
function impView()	{ View = $('BODY').attr('id'); }
}//V2//	Fonction impView + var View

{//V2//	FONCTION INI == INITIALISATION
function init() { impServer(); getCurrentCityId(); impView();}; //
}//V2//	FONCTION INI == INITIALISATION

}//V2//	Toutes les Fonctions

{//VAR City_Name[X]
var city1_name 		= document.getElementById('citySelect').getElementsByTagName('option')[0].innerHTML;
var city2_name 		= document.getElementById('citySelect').getElementsByTagName('option')[1].innerHTML;
var city3_name 		= document.getElementById('citySelect').getElementsByTagName('option')[2].innerHTML;
var city4_name 		= document.getElementById('citySelect').getElementsByTagName('option')[3].innerHTML;
var city5_name 		= document.getElementById('citySelect').getElementsByTagName('option')[4].innerHTML;
var City_Name 	= ['City_Name[X]', city1_name, city2_name, city3_name, city4_name, city5_name];
}//VAR City_Name[X]
{//VAR City_Id[X]
var id1			= document.getElementById('citySelect').getElementsByTagName('option')[0].value;
var id2			= document.getElementById('citySelect').getElementsByTagName('option')[1].value;
var id3			= document.getElementById('citySelect').getElementsByTagName('option')[2].value;
var id4			= document.getElementById('citySelect').getElementsByTagName('option')[3].value;	
var id5			= document.getElementById('citySelect').getElementsByTagName('option')[4].value;	
var City_Id 	= ['City id', id1, id2, id3, id4, id5];
}//VAR City_Id[X]
{//VAR Act_City_Num & Act_City_Name & City_Num[X]
if 			( CurrentCityId == City_Id[1] ) 	{ Act_City_Num = 1;Act_City_Name = City_Name[1];}
else if 	( CurrentCityId == City_Id[2] ) 	{ Act_City_Num = 2;Act_City_Name = City_Name[2];}
else if 	( CurrentCityId == City_Id[3] ) 	{ Act_City_Num = 3;Act_City_Name = City_Name[3];}
else if 	( CurrentCityId == City_Id[4] ) 	{ Act_City_Num = 4;Act_City_Name = City_Name[4];}
else if 	( CurrentCityId == City_Id[5] ) 	{ Act_City_Num = 5;Act_City_Name = City_Name[5];}
else										{ Act_City_Num = 'Inconnu'	;Act_City_Name = 'Inconnu';}
var City_Num	= ['City_Num', 1,2,3,4,5];
}//VAR Act_City_Num & Act_City_Name & City_Num[X]
{//VAR City_Spy_Left[X]
var gm_spy1_left = GM_getValue('spy1_left', 0);
var gm_spy2_left = GM_getValue('spy2_left', 0);
var gm_spy3_left = GM_getValue('spy3_left', 0);
var gm_spy4_left = GM_getValue('spy4_left', 0);
var gm_spy5_left = GM_getValue('spy5_left', 0);
var City_Spy_Left = ['Espions Restant : ', gm_spy1_left, gm_spy2_left, gm_spy3_left, gm_spy4_left, gm_spy5_left];
}//VAR City_Spy_Left[X]
{//VAR City_Spy_Mort[X]
var smort1 	= GM_getValue('spy1_mort', 0);
var smort2 	= GM_getValue('spy2_mort', 0);
var smort3 	= GM_getValue('spy3_mort', 0);
var smort4 	= GM_getValue('spy4_mort', 0);
var smort5 	= GM_getValue('spy5_mort', 0);
var City_Spy_Mort = ['Espions mort', smort1, smort2, smort3, smort4, smort5];
}//VAR City_Spy_Mort[X]
{//VAR City_Spy_Mission[X]
var smiss1 	= GM_getValue('spy1_mission', 0);
var smiss2 	= GM_getValue('spy2_mission', 0);
var smiss3 	= GM_getValue('spy3_mission', 0);
var smiss4 	= GM_getValue('spy4_mission', 0);
var smiss5 	= GM_getValue('spy5_mission', 0);
var City_Spy_Mission = ['Espions en mission', smiss1, smiss2, smiss3, smiss4, smiss5];
}//VAR City_Spy_Mission[X]
{//VAR City_Pos_sfh[X]
var gmsfh1_pos 	= GM_getValue('sfh1_pos', 0);
var gmsfh2_pos 	= GM_getValue('sfh2_pos', 0);
var gmsfh3_pos 	= GM_getValue('sfh3_pos', 0);
var gmsfh4_pos 	= GM_getValue('sfh4_pos', 0);
var gmsfh5_pos 	= GM_getValue('sfh5_pos', 0);
var City_Pos_sfh = ['Position Cachettes', gmsfh1_pos, gmsfh2_pos, gmsfh3_pos, gmsfh4_pos, gmsfh5_pos];
}//VAR City_Pos_sfh[X]
{//VAR City_Pos_tpl[X]
var gmtpl1_pos 	= GM_getValue('tpl1_pos', 0);
var gmtpl2_pos 	= GM_getValue('tpl2_pos', 0);
var gmtpl3_pos 	= GM_getValue('tpl3_pos', 0);
var gmtpl4_pos 	= GM_getValue('tpl4_pos', 0);
var gmtpl5_pos 	= GM_getValue('tpl5_pos', 0);
var City_Pos_tpl = ['Position Cachettes', gmtpl1_pos, gmtpl2_pos, gmtpl3_pos, gmtpl4_pos, gmtpl5_pos];
}//VAR City_Pos_sfh[X]
{//VAR City_Pos_atl[X]
var gmatl1_pos 	= GM_getValue('atl1_pos', 0);
var gmatl2_pos 	= GM_getValue('atl2_pos', 0);
var gmatl3_pos 	= GM_getValue('atl3_pos', 0);
var gmatl4_pos 	= GM_getValue('atl4_pos', 0);
var gmatl5_pos 	= GM_getValue('atl5_pos', 0);
var City_Pos_atl = ['Position Atelier', gmatl1_pos, gmatl2_pos, gmatl3_pos, gmatl4_pos, gmatl5_pos];
}//VAR City_Pos_atl[X]


{//V2//	Toutes les VARIABLES

{//VAR Texte
var txt_cach	= 'Cachette Sur '
var txt_tocity	= 'Vers la ville '
var txt_mvrs	= 'Deplacer ressources vers  '
var txt_mvarm	= 'Deplacer Soldats vers  '
var txt_mvflt	= 'Deplacer Naval vers  '
var txt_viewarmy	= 'Voir Soldats sur  '
var txt_viewfleet	= 'Voir Naval sur  '
}

{// fonction tip et untip
var untp			=' onmouseout="UnTip()"';
var tpd				=' onmouseover="Tip(\'';
var tpf				=' \')"';
}// fonction tip et untip
{// <table>
var _tbl_ = '<table>'; 
var _tbl = '<table '; 
var _ftbl_ = '</table>';
var tblttl =' <h3 class="header">';
var ftblttl =' </h3>';
}// <table>
{// <tr>
var _tr_ = '<tr>'; var _tr = '<tr '; var _ftr_ = '</tr>';
}// <tr>
{// <td>
var _td_ = '<td>'; var _td	= '<td '; var _ftd_ = '</td>';
}// <td>
{// >
var x_	=	'>';
}// >
{// <img src=
var _imgsrc = '<img src=';
}// <img src=
{// <a href=
var _ahref = '<a href='; var _fa_	= '</a>';
}// <a href=
{// <a onclick=
var onclck = '<a onclick=" ';
}// <a onclick=
{// " VAR fop
var fop	= '"';
}// " VAR fop
{// Tableau largeur en % et mide en forme
var tblwdt95 =' width="95%"'; 
var tblmax =' width="100%"'; 

}// Tableau largeur en % et mide en forme
{//// VAR STL Display
var stlinl	= ' style="display:inline"';
var stlnone	= ' style="display:none"';
var stldisp	= ' style="display:"';
}//// VAR STL Display
{//// VAR STL Align
var stlaln_cen = ' align="center"';
var stlaln_lft = ' align="left"';
var stlaln_rgt = ' align="right"';
}//// VAR STL Align
{//itmhgt
var itmhgt1	 = ' height="1px"' ;var itmhgt2	 = ' height="2px"' ;var itmhgt3	 = ' height="3px"' ;var itmhgt4	 = ' height="4px"' ;
var itmhgt5  = ' height="5px"'; var itmhgt6  = ' height="6px"'; var itmhgt7  = ' height="7px"'; var itmhgt8  = ' height="8px"'; 
var itmhgt9  = ' height="9px"'; var itmhgt10 = ' height="10px"';var itmhgt11 = ' height="11px"';var itmhgt12 = ' height="12px"';
var itmhgt13 = ' height="13px"';var itmhgt14 = ' height="14px"';
var itmhgt15 = ' height="15px"';var itmhgt16 = ' height="16px"';var itmhgt17 = ' height="17px"';var itmhgt18 = ' height="18px"';
var itmhgt19 = ' height="19px"';var itmhgt20 = ' height="20px"';var itmhgt21 = ' height="21px"';var itmhgt22 = ' height="22px"';
var itmhgt23 = ' height="23px"';var itmhgt24 = ' height="24px"';var itmhgt25 = ' height="25px"';
}//itmhgt
{//itmwdt
var itmwdt1	 = ' width="1px"'; 
var itmwdt2	= ' width="2px"' ;
var itmwdt3  = ' width="3px"' ;
var itmwdt4  = ' width="4px"' ;
var itmwdt5  = ' width="5px"'; 
var itmwdt6  = ' width="6px"'; 
var itmwdt7  = ' width="7px"'; 
var itmwdt8  = ' width="8px"'; 
var itmwdt9  = ' width="9px"'; 
var itmwdt10 = ' width="10px"';
var itmwdt15 = ' width="15px"'; 
var itmwdt16 = ' width="16px"';
var itmwdt17 = ' width="17px"';
var itmwdt18 = ' width="18px"';
var itmwdt19 = ' width="19px"'; 
var itmwdt20 = ' width="20px"';
var itmwdt21 = ' width="21px"';
var itmwdt22 = ' width="22px"';
var itmwdt23 = ' width="23px"'; 
var itmwdt24 = ' width="24px"';
var itmwdt25 = ' width="25px"';
var itmwdt30 = ' width="30px"'; 
var itmwdt31 = ' width="31px"';
var itmwdt32 = ' width="32px"';
var itmwdt33 = ' width="33px"';
var itmwdt34 = ' width="34px"'; 
var itmwdt35 = ' width="35px"';
var itmwdt36 = ' width="36px"';
var itmwdt37 = ' width="37px"';
}//itmwdt
{////Var Images Ressources
var rswood 		= '"http://s16.fr.ikariam.com/skin/resources/icon_wood.gif"';
var rsmar 		= '"http://s16.fr.ikariam.com/skin/resources/icon_marble.gif"';
var rsvin 		= '"http://s16.fr.ikariam.com/skin/resources/icon_wine.gif"';
var rsglass		= '"http://s16.fr.ikariam.com/skin/resources/icon_glass.gif"';
var rsslf		= '"http://s16.fr.ikariam.com/skin/resources/icon_sulfur.gif"';
}////Var Images Ressources
{////Var Images Batiments
var img_hdv		= '"http://s16.fr.ikariam.com/skin/img/city/building_townhall.gif"';
var img_wall	= '"http://s16.fr.ikariam.com/skin/buildings/y100/wall.gif"';
var img_cach	= '"http://s16.fr.ikariam.com/skin/img/city/building_safehouse.gif"';
}////Var Images Batiments
{////Var Images Design
var sepv 			= '"data:image/gif;base64,R0lGODlhBAAPAPcAANSrd9WsdNSsdtatd9SqeNWredSseNWtedu/ftzBftzAf9u/gN3BgNzAgd7Cg/Pnt/LlufPmufPlvvXnuPTlvPTqt/bou/bquPTquQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAABAAPAAAIPAAJYMCgoMBABgUqVEB44QIDAg0fRoR4QQFFBQcsWHAAIEIEBAIgQFgQQIKEBgIoUGhgYMIEBgMePEgQEAA7"';
var seph 			= '"data:image/gif;base64,R0lGODlhDwAEAPcAANSrd9WsdNSsdtatd9SqeNWredSseNWtedu/ftzBftzAf9u/gN3BgNzAgd7Cg/Pnt/LlufPmufPlvvXnuPTlvPTqt/bou/bquPTquQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAADwAEAAAIOAAHGBAQQACAAwQSEijAkMCDCRQkQIhg4YJFixUwYHgYcWLFixcyYkjAoEGDBQgcKFDAoGVLBQEBADs%3D"';
}////Var Images Design
{////Var Images Autre
var imgrapcb			= '"http://s16.fr.ikariam.com/skin/unitdesc/unit_attack.gif"';
var imgspyr			='"http://s16.fr.ikariam.com/skin/layout/icon-status-small.gif"';
var imgtemple			='"http://s16.fr.ikariam.com/skin/img/city/building_temple.gif"';
var imgatelier			= '"http://s16.fr.ikariam.com/skin/img/city/building_workshop.gif"';

var imgarmy			='"http://s16.fr.ikariam.com/skin/actions/plunder.gif"';
var imgfleet		='"http://s16.fr.ikariam.com/skin/actions/blockade.gif"';
var imgmvrs     ='"http://s16.fr.ikariam.com/skin/actions/transport.gif"';
var goterre			='"http://s16.fr.ikariam.com/skin/actions/move_army.gif"';
var gonaval			='"http://s16.fr.ikariam.com/skin/actions/move_fleet.gif"';





}////Var Images Autre
{////Var URL
var url_view 	= '/index.php?view=';
var url_pos 	= '&position=';
var url_depl 	= '&deploymentType=';
var url_id 		= '&id=';
var url_srap	= '&tab=reports';
var url_mvrs 	= '&destinationCityId=';

}////Var URL

}//V2//	Toutes les VARIABLES

{//V2//	INITIALISATION
init();
}//V2//	INITIALISATION

{//V2//	Capture Variables Dans Cachettes
if (View == 'safehouse'){
	var Act_Spy_Left = document.getElementById('reportInboxLeft').getElementsByTagName('li')[1].innerHTML;
	if ( Act_City_Num == 1 ) { GM_setValue ('spy1_left', Act_Spy_Left);}
	if ( Act_City_Num == 2 ) { GM_setValue ('spy2_left', Act_Spy_Left);}
	if ( Act_City_Num == 3 ) { GM_setValue ('spy3_left', Act_Spy_Left);}
	if ( Act_City_Num == 4 ) { GM_setValue ('spy4_left', Act_Spy_Left);}
	if ( Act_City_Num == 5 ) { GM_setValue ('spy5_left', Act_Spy_Left);}
	if ( Act_City_Num == 6 ) { GM_setValue ('spy6_left', Act_Spy_Left);}
	
	var Act_Spy_Mort = document.getElementById('reportInboxLeft').getElementsByTagName('li')[0].innerHTML;
	if ( Act_City_Num == 1 ) { GM_setValue ('spy1_mort', Act_Spy_Mort);}
	if ( Act_City_Num == 2 ) { GM_setValue ('spy2_mort', Act_Spy_Mort);}
	if ( Act_City_Num == 3 ) { GM_setValue ('spy3_mort', Act_Spy_Mort);}
	if ( Act_City_Num == 4 ) { GM_setValue ('spy4_mort', Act_Spy_Mort);}
	if ( Act_City_Num == 5 ) { GM_setValue ('spy5_mort', Act_Spy_Mort);}
	if ( Act_City_Num == 6 ) { GM_setValue ('spy6_mort', Act_Spy_Mort);}
	
	var Act_Spy_Mission = document.getElementById('reportInboxLeft').getElementsByTagName('li')[2].innerHTML;
	if ( Act_City_Num == 1 ) { GM_setValue ('spy1_mission', Act_Spy_Mission);}
	if ( Act_City_Num == 2 ) { GM_setValue ('spy2_mission', Act_Spy_Mission);}
	if ( Act_City_Num == 3 ) { GM_setValue ('spy3_mission', Act_Spy_Mission);}
	if ( Act_City_Num == 4 ) { GM_setValue ('spy4_mission', Act_Spy_Mission);}
	if ( Act_City_Num == 5 ) { GM_setValue ('spy5_mission', Act_Spy_Mission);}
	if ( Act_City_Num == 6 ) { GM_setValue ('spy6_mission', Act_Spy_Mission);}
	}
}//V2//	Capture Variables Dans Cachettes
{//V2// Capture Position des Cachettes Dans Ville
if (View == 'city' ){
	if ( Act_City_Num == 1 ) { var safehouse1_pos = getPosBuilding('safehouse');GM_setValue ('sfh1_pos', safehouse1_pos);}
	if ( Act_City_Num == 2 ) { var safehouse2_pos = getPosBuilding('safehouse');GM_setValue ('sfh2_pos', safehouse2_pos);}
	if ( Act_City_Num == 3 ) { var safehouse3_pos = getPosBuilding('safehouse');GM_setValue ('sfh3_pos', safehouse3_pos);}
	if ( Act_City_Num == 4 ) { var safehouse4_pos = getPosBuilding('safehouse');GM_setValue ('sfh4_pos', safehouse4_pos);}
	if ( Act_City_Num == 5 ) { var safehouse5_pos = getPosBuilding('safehouse');GM_setValue ('sfh5_pos', safehouse5_pos);}
	if ( Act_City_Num == 6 ) { var safehouse6_pos = getPosBuilding('safehouse');GM_setValue ('sfh6_pos', safehouse6_pos);}
	}
}//V2// Capture Position des Cachettes Dans Ville



{//V2//	AFFICHAGE Tableau Spy et Changer Ville
if (View != 'militaryAdvisorDetailedReportView'){
	var 
	s  = '';
	s += '<div class="dynamic">';
	{//##	Ligne Titre ##//
	s += _tbl+tblmax+x_+_tr_+_td_+tblttl ;
	s += 		onclck+'document.getElementById(\'option\').style.display = \'\';"><img src='+imgrapcb+itmhgt18+stlinl+x_+'</a>';
	s += 'Wunka Ika Spy XGL '+version;
	s += 		onclck+'document.getElementById(\'option\').style.display = \'none\';"><img src='+imgrapcb+itmhgt18+stlinl+x_+'</a>';
	s += ftblttl+_ftd_+_ftr_+_ftbl_;
	}//##	Ligne Titre ##//
	{//##  	Searation Horizontal
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_+_td+stlaln_cen+x_+_imgsrc+seph+tblmax+itmhgt3+x_+_ftd_+_ftr_+_ftbl_;
	}//##  	Séparation Horizontal
	{//##	Ligne Changer De Ville des 6 Villes ##//
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_;
	s += _td+stlaln_cen+itmwdt34+x_+onclck+' var s = document.getElementById(\'citySelect\');s.selectedIndex = 0;s.form.submit();return false;" href="?view=city'+url_id+City_Id[1]+fop+tpd+txt_tocity+City_Name[1]+tpf+x_+_imgsrc+img_hdv+itmwdt18+stlinl+x_+_imgsrc+rsmar+itmhgt10+stlinl+tpd+tpf+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt20+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+onclck+' var s = document.getElementById(\'citySelect\');s.selectedIndex = 1;s.form.submit();return false;" href="?view=city'+url_id+City_Id[2]+fop+tpd+txt_tocity+City_Name[2]+tpf+x_+_imgsrc+img_hdv+itmwdt18+stlinl+x_+_imgsrc+rsglass+itmhgt10+stlinl+tpd+tpf+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt20+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+onclck+' var s = document.getElementById(\'citySelect\');s.selectedIndex = 2;s.form.submit();return false;" href="?view=city'+url_id+City_Id[3]+fop+tpd+txt_tocity+City_Name[3]+tpf+x_+_imgsrc+img_hdv+itmwdt18+stlinl+x_+_imgsrc+rsvin+itmhgt10+stlinl+tpd+tpf+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt20+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+onclck+' var s = document.getElementById(\'citySelect\');s.selectedIndex = 3;s.form.submit();return false;" href="?view=city'+url_id+City_Id[4]+fop+tpd+txt_tocity+City_Name[4]+tpf+x_+_imgsrc+img_hdv+itmwdt18+stlinl+x_+_imgsrc+rsmar+itmhgt10+stlinl+tpd+tpf+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt20+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+onclck+' var s = document.getElementById(\'citySelect\');s.selectedIndex = 4;s.form.submit();return false;" href="?view=city'+url_id+City_Id[5]+fop+tpd+txt_tocity+City_Name[5]+tpf+x_+_imgsrc+img_hdv+itmwdt18+stlinl+x_+_imgsrc+rsslf+itmhgt10+stlinl+tpd+tpf+x_+_fa_+_ftd_;
	s += _ftr_+_ftbl_;
	}//##	Ligne Changer De Ville des 6 Villes ##//
	{//##  	Separation Horizontal
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_+_td+stlaln_cen+x_+_imgsrc+seph+tblmax+itmhgt3+x_+_ftd_+_ftr_+_ftbl_;
	}//##  	Séparation Horizontal
	{//##	Ligne Cachettes des 6 Villes ##//
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_;
	s += 	_td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'safehouse'+url_pos+City_Pos_sfh[1]+url_id+City_Id[1]+fop+x_+_imgsrc+img_cach+itmwdt30+stlinl+tpd+txt_cach+City_Name[1]+'<br>'+City_Spy_Left[1]+'<br>'+City_Spy_Mort[1]+'<br>'+City_Spy_Mission[1]+tpf+x_+_fa_+_ftd_;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt22+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'safehouse'+url_pos+City_Pos_sfh[2]+url_id+City_Id[2]+fop+x_+_imgsrc+img_cach+itmwdt30+stlinl+tpd+txt_cach+City_Name[2]+'<br>'+City_Spy_Left[2]+'<br>'+City_Spy_Mort[2]+'<br>'+City_Spy_Mission[2]+tpf+x_+_fa_+_ftd_;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt22+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'safehouse'+url_pos+City_Pos_sfh[3]+url_id+City_Id[3]+fop+x_+_imgsrc+img_cach+itmwdt30+stlinl+tpd+txt_cach+City_Name[3]+'<br>'+City_Spy_Left[3]+'<br>'+City_Spy_Mort[3]+'<br>'+City_Spy_Mission[3]+tpf+x_+_fa_+_ftd_;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt22+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'safehouse'+url_pos+City_Pos_sfh[4]+url_id+City_Id[4]+fop+x_+_imgsrc+img_cach+itmwdt30+stlinl+tpd+txt_cach+City_Name[4]+'<br>'+City_Spy_Left[4]+'<br>'+City_Spy_Mort[4]+'<br>'+City_Spy_Mission[4]+tpf+x_+_fa_+_ftd_;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt22+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+itmwdt34+x_+_ahref+fop+url_view+'safehouse'+url_pos+City_Pos_sfh[5]+url_id+City_Id[5]+fop+x_+_imgsrc+img_cach+itmwdt30+stlinl+tpd+txt_cach+City_Name[5]+'<br>'+City_Spy_Left[5]+'<br>'+City_Spy_Mort[5]+'<br>'+City_Spy_Mission[5]+tpf+x_+_fa_+_ftd_;
	s += _ftr_+_ftbl_;
	}//##	Ligne Cachettes des 6 Villes ##//
	{//##  	Separation Horizontal
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_+_td+stlaln_cen+x_+_imgsrc+seph+tblmax+itmhgt3+x_+_ftd_+_ftr_+_ftbl_;
	}//##  	Séparation Horizontal
	{//##	Ligne Ressources des 6 Villes ##//
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_;
	s += _td+stlaln_cen+itmwdt34+x_+_imgsrc+rsmar+itmhgt10+stlinl+x_+_imgsrc+rswood+itmhgt10+stlinl+x_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_imgsrc+rsglass+itmhgt10+stlinl+x_+_imgsrc+rswood+itmhgt10+stlinl+x_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_imgsrc+rsvin+itmhgt10+stlinl+x_+_imgsrc+rswood+itmhgt10+stlinl+x_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_imgsrc+rsmar+itmhgt10+stlinl+x_+_imgsrc+rswood+itmhgt10+stlinl+x_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_imgsrc+rsslf+itmhgt10+stlinl+x_+_imgsrc+rswood+itmhgt10+stlinl+x_+_ftd_;
	s += _ftr_+_ftbl_;
	}//##	Ligne Ressources des 6 Villes ##//
	{//##  	Separation Horizontal
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_+_td+stlaln_cen+x_+_imgsrc+seph+tblmax+itmhgt3+x_+_ftd_+_ftr_+_ftbl_;
	}//##  	Séparation Horizontal
	s += '<div class="footer"></div>';
	s += '</div>';
	if(View == 'city'){$(s).insertBefore('#information');}
	else{$(s).insertBefore('#breadcrumbs');}
	}	
}//V2//	AFFICHAGE Tableau Spy et Changer Ville


{//V2//	AFFICHAGE Tableau Options
if (View != 'militaryAdvisorDetailedReportView'){
	var 
	s  = '';
	s += '<div class="dynamic" id="option"'+stlnone+'>';
 	{//##	Ligne Titre ##//
	s += _tbl+tblmax+x_+_tr_+_td_+tblttl ;
	s += _tbl+stlaln_cen+tblwdt95+' id="xxs"'+x_+_tr_;
	s += _td+stlaln_cen+itmwdt34+x_+onclck+'document.getElementById(\'depress\').style.display = \'\';">'+_imgsrc+imgmvrs+itmwdt30+stlinl+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+itmwdt34+x_+onclck+'document.getElementById(\'deparmy\').style.display = \'\';">'+_imgsrc+goterre+itmwdt30+stlinl+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+itmwdt34+x_+onclck+'document.getElementById(\'depnav\').style.display = \'\';">'+_imgsrc+gonaval+itmwdt30+stlinl+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+itmwdt34+x_+onclck+'document.getElementById(\'viewarmy\').style.display = \'\';">'+_imgsrc+imgarmy+itmwdt30+stlinl+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+itmwdt34+x_+onclck+'document.getElementById(\'viewfleet\').style.display = \'\';">'+_imgsrc+imgfleet+itmwdt30+stlinl+x_+_fa_+_ftd_;
	s += _ftr_+_ftbl_;
	s += ftblttl+_ftd_+_ftr_+_ftbl_;
	}//##	Ligne Titre ##//
	{//V2//	Séparation Horizontal
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_+_td+stlaln_cen+x_+_imgsrc+seph+tblmax+itmhgt3+x_+_ftd_+_ftr_+_ftbl_;
	}//V2//	Séparation Horizontal
	{//V2//	Ligne Ressources des 6 Villes
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_;
	s += _td+stlaln_cen+itmwdt34+x_+_imgsrc+rsmar+itmhgt10+stlinl+x_+_imgsrc+rswood+itmhgt10+stlinl+x_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_imgsrc+rsglass+itmhgt10+stlinl+x_+_imgsrc+rswood+itmhgt10+stlinl+x_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_imgsrc+rsvin+itmhgt10+stlinl+x_+_imgsrc+rswood+itmhgt10+stlinl+x_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_imgsrc+rsmar+itmhgt10+stlinl+x_+_imgsrc+rswood+itmhgt10+stlinl+x_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += _td+stlaln_cen+itmwdt34+x_+_imgsrc+rsslf+itmhgt10+stlinl+x_+_imgsrc+rswood+itmhgt10+stlinl+x_+_ftd_;
	s += _ftd_+_ftr_+_ftbl_;
	}//V2//	Ligne Ressources des 6 Villes
	{//V2//	Séparation Horizontal
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_+_td+stlaln_cen+x_+_imgsrc+seph+tblmax+itmhgt3+x_+_ftd_+_ftr_+_ftbl_;
	}//V2//	Séparation Horizontal
	{//V2//	Deplacer Ressources
	s += _tbl+stlaln_cen+' id="depress"'+tblwdt95+stlnone+x_+_tr_ ;
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'transport'+url_mvrs+City_Id[1]+fop+tpd+txt_mvrs+City_Name[1]+tpf+x_+_imgsrc+imgmvrs+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'transport'+url_mvrs+City_Id[2]+fop+tpd+txt_mvrs+City_Name[2]+tpf+x_+_imgsrc+imgmvrs+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'transport'+url_mvrs+City_Id[3]+fop+tpd+txt_mvrs+City_Name[3]+tpf+x_+_imgsrc+imgmvrs+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'transport'+url_mvrs+City_Id[4]+fop+tpd+txt_mvrs+City_Name[4]+tpf+x_+_imgsrc+imgmvrs+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'transport'+url_mvrs+City_Id[5]+fop+tpd+txt_mvrs+City_Name[1]+tpf+x_+_imgsrc+imgmvrs+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += _ftr_+_ftbl_;
	}//V2//	Deplacer Ressources
	{//V2//	Deplacer Terrestre
	s += _tbl+stlaln_cen+' id="deparmy"'+tblwdt95+stlnone+x_+_tr_ ;
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'deployment'+url_depl+'army'+url_mvrs+City_Id[1]+fop+tpd+txt_mvarm+City_Name[1]+tpf+x_+_imgsrc+goterre+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'deployment'+url_depl+'army'+url_mvrs+City_Id[2]+fop+tpd+txt_mvarm+City_Name[2]+tpf+x_+_imgsrc+goterre+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'deployment'+url_depl+'army'+url_mvrs+City_Id[3]+fop+tpd+txt_mvarm+City_Name[3]+tpf+x_+_imgsrc+goterre+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'deployment'+url_depl+'army'+url_mvrs+City_Id[4]+fop+tpd+txt_mvarm+City_Name[4]+tpf+x_+_imgsrc+goterre+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'deployment'+url_depl+'army'+url_mvrs+City_Id[5]+fop+tpd+txt_mvarm+City_Name[5]+tpf+x_+_imgsrc+goterre+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += _ftr_+_ftbl_;
	}//V2//	Deplacer Terrestre
	{//V2//	Deplacer Naval
	s += _tbl+stlaln_cen+' id="depnav"'+tblwdt95+stlnone+x_+_tr_ ;
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'deployment'+url_depl+'fleet'+url_mvrs+City_Id[1]+fop+tpd+txt_mvflt+City_Name[1]+tpf+x_+_imgsrc+gonaval+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'deployment'+url_depl+'fleet'+url_mvrs+City_Id[2]+fop+tpd+txt_mvflt+City_Name[2]+tpf+x_+_imgsrc+gonaval+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'deployment'+url_depl+'fleet'+url_mvrs+City_Id[3]+fop+tpd+txt_mvflt+City_Name[3]+tpf+x_+_imgsrc+gonaval+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'deployment'+url_depl+'fleet'+url_mvrs+City_Id[4]+fop+tpd+txt_mvflt+City_Name[4]+tpf+x_+_imgsrc+gonaval+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'deployment'+url_depl+'fleet'+url_mvrs+City_Id[5]+fop+tpd+txt_mvflt+City_Name[5]+tpf+x_+_imgsrc+gonaval+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += _ftr_+_ftbl_;
	}//V2//	Deplacer Naval
	{//V2//	Voir Soldat dans Ville
	s += _tbl+stlaln_cen+' id="viewarmy"'+tblwdt95+stlnone+x_+_tr_ ;
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'cityMilitary-army'+url_id+City_Id[1]+fop+tpd+txt_viewarmy+City_Name[1]+tpf+x_+_imgsrc+imgarmy+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'cityMilitary-army'+url_id+City_Id[2]+fop+tpd+txt_viewarmy+City_Name[2]+tpf+x_+_imgsrc+imgarmy+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'cityMilitary-army'+url_id+City_Id[3]+fop+tpd+txt_viewarmy+City_Name[3]+tpf+x_+_imgsrc+imgarmy+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'cityMilitary-army'+url_id+City_Id[4]+fop+tpd+txt_viewarmy+City_Name[4]+tpf+x_+_imgsrc+imgarmy+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'cityMilitary-army'+url_id+City_Id[5]+fop+tpd+txt_viewarmy+City_Name[5]+tpf+x_+_imgsrc+imgarmy+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += _ftr_+_ftbl_;
	}//V2//	Voir Soldat dans Ville
	{//V2//	Voir Naval dans Ville
	s += _tbl+stlaln_cen+' id="viewfleet"'+tblwdt95+stlnone+x_+_tr_ ;
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'cityMilitary-fleet'+url_id+City_Id[1]+fop+tpd+txt_viewfleet+City_Name[1]+tpf+x_+_imgsrc+imgfleet+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'cityMilitary-fleet'+url_id+City_Id[2]+fop+tpd+txt_viewfleet+City_Name[2]+tpf+x_+_imgsrc+imgfleet+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'cityMilitary-fleet'+url_id+City_Id[3]+fop+tpd+txt_viewfleet+City_Name[3]+tpf+x_+_imgsrc+imgfleet+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'cityMilitary-fleet'+url_id+City_Id[4]+fop+tpd+txt_viewfleet+City_Name[4]+tpf+x_+_imgsrc+imgfleet+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += 	_td+stlaln_cen+x_+_imgsrc+sepv+itmhgt14+itmwdt3+x_+_ftd_;//SepV
	s += 	_td+stlaln_cen+x_+_ahref+fop+url_view+'cityMilitary-fleet'+url_id+City_Id[5]+fop+tpd+txt_viewfleet+City_Name[5]+tpf+x_+_imgsrc+imgfleet+itmhgt22+stlinl+x_+_fa_+_ftd_ ;
	s += _ftr_+_ftbl_;
	}//V2//	Voir Naval dans Ville

	s += '<div class="footer"></div>';
	s += '</div>';
	if(View == 'city'){$(s).insertBefore('#information');}
	else{$(s).insertBefore('#breadcrumbs');}
	}	
}//V2//	AFFICHAGE Tableau Options


