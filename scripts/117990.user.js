// coding: utf-8
// ==UserScript==
// @name        Ika_Change_City x7
// @version 	1.0
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
// 				1.0 
//
// ==/UserScript==
version 	= '1.2.1';
txt_gene	= 'Afficher les Tableau Perso  ';
txt_lgnopt	= 'Afficher les Options Mouvement & Armée-Naval  ';
txt_tocity	= 'Vers la ville ';
_tbl_ 		= '<table>'; 
_tbl 		= '<table '; 
_ftbl_ 		= '</table>';
tblttl 		= '<h3 class="header">';
ftblttl 	= '</h3>';
_tr_ 		= '<tr>'; 
_tr 		= '<tr '; 
_ftr_ 		= '</tr>';
_td_ 		= '<td>';
_td			= '<td ';
_ftd_ 		= '</td>';
x_			= '>';
_imgsrc 	= '<img src=';
_ahref 		= '<a href=';
_fa_		= '</a>';
onclck 		= '<a onclick=" ';
fop			= '"';
tblmax 		= ' width="100%"';
tblwdt95 	= ' width="95%"';
stlinl 		= ' style="display:inline"';
stldisp 	= ' style="display:"';
stlnone 	= ' style="display:none"';
stlaln_cen 	= ' align="center"';
stlaln_lft 	= ' align="left"';
stlaln_rgt 	= ' align="right"';
itmwdt3		= ' width="3px"' ;
itmwdt18 	= ' width="18px"';
itmwdt10 	= ' width="10px"';
itmwdt13 	= ' width="13px"';
itmwdt25 	= ' width="25px"';
itmhgt10 	= ' height="10px"';
itmhgt15 	= ' height="15px"';
itmhgt18 	= ' height="18px"';
itmhgt20 	= ' height="20px"';
rswood 		= '"http://s10.fr.ikariam.com/skin/resources/icon_wood.gif"';
rsmar 		= '"http://s10.fr.ikariam.com/skin/resources/icon_marble.gif"';
rsvin 		= '"http://s10.fr.ikariam.com/skin/resources/icon_wine.gif"';
rsglass		= '"http://s10.fr.ikariam.com/skin/resources/icon_glass.gif"';
rsslf		= '"http://s10.fr.ikariam.com/skin/resources/icon_sulfur.gif"';
img_hdv		= '"http://s10.fr.ikariam.com/skin/img/city/building_townhall.gif"';
gonaval		= '"http://s10.fr.ikariam.com/skin/actions/move_fleet.gif"';
img_gene	= '"http://s10.fr.ikariam.com/skin/relatedCities/general.gif"';
sepv 		= '"data:image/gif;base64,R0lGODlhBAAPAPcAANSrd9WsdNSsdtatd9SqeNWredSseNWtedu/ftzBftzAf9u/gN3BgNzAgd7Cg/Pnt/LlufPmufPlvvXnuPTlvPTqt/bou/bquPTquQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAABAAPAAAIPAAJYMCgoMBABgUqVEB44QIDAg0fRoR4QQFFBQcsWHAAIEIEBAIgQFgQQIKEBgIoUGhgYMIEBgMePEgQEAA7"';
seph 		= '"data:image/gif;base64,R0lGODlhDwAEAPcAANSrd9WsdNSsdtatd9SqeNWredSseNWtedu/ftzBftzAf9u/gN3BgNzAgd7Cg/Pnt/LlufPmufPlvvXnuPTlvPTqt/bou/bquPTquQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAADwAEAAAIOAAHGBAQQACAAwQSEijAkMCDCRQkQIhg4YJFixUwYHgYcWLFixcyYkjAoEGDBQgcKFDAoGVLBQEBADs%3D"';
url_view 	= '/index.php?view=';
url_id 		= '&id=';
url_maj		= 'http://userscripts.org/scripts/source/116082.user.js';
untp		= 'onmouseout="UnTip()"';
tpd			= 'onmouseover="Tip(\'';
tpf			= '\')"';

jQuery(document).ready(function(){})

function impServer(){ Server = window.location.host; temp = Server.split('.'); temp = temp[1]; }
function impView()	{ View = $('BODY').attr('id'); }
function init()		{ impServer(); impView();}

city1_name 	= document.getElementById('citySelect').getElementsByTagName('option')[0].innerHTML;
city2_name 	= document.getElementById('citySelect').getElementsByTagName('option')[1].innerHTML;
city3_name 	= document.getElementById('citySelect').getElementsByTagName('option')[2].innerHTML;
city4_name 	= document.getElementById('citySelect').getElementsByTagName('option')[3].innerHTML;
city5_name 	= document.getElementById('citySelect').getElementsByTagName('option')[4].innerHTML;
city6_name 	= document.getElementById('citySelect').getElementsByTagName('option')[5].innerHTML;
city7_name 	= document.getElementById('citySelect').getElementsByTagName('option')[6].innerHTML;
id1			= document.getElementById('citySelect').getElementsByTagName('option')[0].value;
id2			= document.getElementById('citySelect').getElementsByTagName('option')[1].value;
id3			= document.getElementById('citySelect').getElementsByTagName('option')[2].value;
id4			= document.getElementById('citySelect').getElementsByTagName('option')[3].value;	
id5			= document.getElementById('citySelect').getElementsByTagName('option')[4].value;
id6			= document.getElementById('citySelect').getElementsByTagName('option')[5].value;
id7			= document.getElementById('citySelect').getElementsByTagName('option')[6].value;
City_Num	= ['City_Num'	 	,1,2,3,4,5,6,7];
City_Id 	= ['City id'	 	,id1,id2,id3,id4,id5,id6,id7];
City_Name 	= ['City_Name[X]'	,city1_name,city2_name,city3_name,city4_name,city5_name,city6_name,city7_name];
City_rs 	= ['Ress de Luxe'	,rsmar,rsvin,rsvin,rsglass,rsslf,rsmar,rsslf];

///////////
init();////
///////////
City_ent_lvl = ['Entrepot Level',0+1,0+1,0+1,0+1,0+1,0+1,0+1 ];// 	
//
City_safe	 = ['Ressources Safe : ',City_ent_lvl[1]*480+100, City_ent_lvl[2]*480+100, City_ent_lvl[3]*480+100, City_ent_lvl[4]*480+100, City_ent_lvl[5]*480+100, City_ent_lvl[6]*480+100, City_ent_lvl[7]*480+100];
//																								
City_2safe	 = ['Ressources 2Safe : ',City_safe[1]*2,City_safe[2]*2,City_safe[3]*2,City_safe[4]*2,City_safe[5]*2,City_safe[6]*2,City_safe[7]*2];



{//V2//	AFFICHAGE Tableau Spy et Changer Ville
if (View != 'militaryAdvisorDetailedReportView'){
	var 
	s  = '';
	s += '<div class="dynamic">';

	s += _tbl+stlaln_cen+tblmax+x_;
	s += _tr_+_td_+tblttl;
	
	s += _tbl+tblwdt95+x_+_tr_;
	
	
	s += _tbl+stlaln_cen+tblwdt95+x_+_tr_;
	s += _td+stlaln_cen+x_+onclck+' var s = document.getElementById(\'citySelect\');s.selectedIndex = 0;s.form.submit();return false;" href="?view=city'+url_id+City_Id[1]+fop+tpd+txt_tocity+'<b>'+City_Name[1]+'</b>---'+City_2safe[1]+tpf+x_+_imgsrc+img_hdv+itmwdt10+stlinl+x_+_imgsrc+City_rs[1]+itmwdt10+stlinl+tpd+tpf+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt20+itmwdt3+x_+_ftd_;//seph
	s += _td+stlaln_cen+x_+onclck+' var s = document.getElementById(\'citySelect\');s.selectedIndex = 1;s.form.submit();return false;" href="?view=city'+url_id+City_Id[2]+fop+tpd+txt_tocity+'<b>'+City_Name[2]+'</b>---'+City_2safe[2]+tpf+x_+_imgsrc+img_hdv+itmwdt10+stlinl+x_+_imgsrc+City_rs[2]+itmwdt10+stlinl+tpd+tpf+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt20+itmwdt3+x_+_ftd_;//seph
	s += _td+stlaln_cen+x_+onclck+' var s = document.getElementById(\'citySelect\');s.selectedIndex = 2;s.form.submit();return false;" href="?view=city'+url_id+City_Id[3]+fop+tpd+txt_tocity+'<b>'+City_Name[3]+'</b>---'+City_2safe[3]+tpf+x_+_imgsrc+img_hdv+itmwdt10+stlinl+x_+_imgsrc+City_rs[3]+itmwdt10+stlinl+tpd+tpf+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt20+itmwdt3+x_+_ftd_;//seph
	s += _td+stlaln_cen+x_+onclck+' var s = document.getElementById(\'citySelect\');s.selectedIndex = 3;s.form.submit();return false;" href="?view=city'+url_id+City_Id[4]+fop+tpd+txt_tocity+'<b>'+City_Name[4]+'</b>---'+City_2safe[4]+tpf+x_+_imgsrc+img_hdv+itmwdt10+stlinl+x_+_imgsrc+City_rs[4]+itmwdt10+stlinl+tpd+tpf+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt20+itmwdt3+x_+_ftd_;//seph
	s += _td+stlaln_cen+x_+onclck+' var s = document.getElementById(\'citySelect\');s.selectedIndex = 4;s.form.submit();return false;" href="?view=city'+url_id+City_Id[5]+fop+tpd+txt_tocity+'<b>'+City_Name[5]+'</b>---'+City_2safe[5]+tpf+x_+_imgsrc+img_hdv+itmwdt10+stlinl+x_+_imgsrc+City_rs[5]+itmwdt10+stlinl+tpd+tpf+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt20+itmwdt3+x_+_ftd_;//seph
	s += _td+stlaln_cen+x_+onclck+' var s = document.getElementById(\'citySelect\');s.selectedIndex = 5;s.form.submit();return false;" href="?view=city'+url_id+City_Id[6]+fop+tpd+txt_tocity+'<b>'+City_Name[6]+'</b>---'+City_2safe[6]+tpf+x_+_imgsrc+img_hdv+itmwdt10+stlinl+x_+_imgsrc+City_rs[6]+itmwdt10+stlinl+tpd+tpf+x_+_fa_+_ftd_;
	s += _td+stlaln_cen+x_+_imgsrc+sepv+itmhgt20+itmwdt3+x_+_ftd_;//seph
	s += _td+stlaln_cen+x_+onclck+' var s = document.getElementById(\'citySelect\');s.selectedIndex = 6;s.form.submit();return false;" href="?view=city'+url_id+City_Id[7]+fop+tpd+txt_tocity+'<b>'+City_Name[7]+'</b>---'+City_2safe[7]+tpf+x_+_imgsrc+img_hdv+itmwdt10+stlinl+x_+_imgsrc+City_rs[7]+itmwdt10+stlinl+tpd+tpf+x_+_fa_+_ftd_;
	s += _ftr_+_ftbl_;
	



	s += _ftr_+_ftbl_;
	
	s += '</h3>'+_ftd_+_ftr_;
	s += _tr_+_td_;
	

	s += _ftd_+_ftr_;
	s += _ftbl_;
	s += '<div class="footer"></div>';
	s += '</div>';
	

			if(View == 'city'){$(s).insertBefore('#information');}	//			+
			else{$(s).insertBefore('#breadcrumbs');}	//		
	}	
	
}//V2//	AFFICHAGE Tableau Spy et Changer Ville

	
/*	
{//V2//	AFFICHAGE Tableau General et autre										#	
if (View != 'militaryAdvisorDetailedReportView'){
	var 
	s  = '';
	s += '<div class="dynamic" id="perso" style="display:none">';
 	{//##	Ligne Titre ##//
	s += _tbl+tblmax+x_+_tr_+_td_+tblttl ;
	s +=		_ahref+'"http://'+Server+'/index.php?view=embassyGeneralAttacksToAlly&id=49418&position=8">Att vsXGL</a>';
	s += 		'-'+_ahref+'"http://'+Server+'/index.php?view=embassyGeneralAttacksFromAlly&id=49418&position=8">XGLatt</a>';
	s += 		'-'+_ahref+'"http://'+Server+'/index.php?view=embassyGeneralTroops&id=49418&position=8">Troup XGL</a>';	
	s += ftblttl+_ftd_+_ftr_+_ftbl_;
	}//##	Ligne Titre ##//
	s += '<div class="footer"></div>';
	s += '</div>';
	if(View == 'city'){$(s).insertBefore('#information');}
	else{$(s).insertBefore('#breadcrumbs');}
	}
}//V2//	AFFICHAGE Tableau Spy et Changer Ville
*/

