// ==UserScript==
// @name        encheres
// @namespace   glad
// @include     http://s*.gladiatus.fr/game/index.php?mod=auction*
// @downloadURL    https://userscripts.org/scripts/source/160201.user.js
// @updateURL      http://userscripts.org/scripts/source/160201.meta.js
// @version     2.50
// ==/UserScript==

//-----------------------------------------------------------------------------------------------
//global styles
//-----------------------------------------------------------------------------------------------
//{
style_global = "table.affich{";
style_global += "width:800px;";
style_global += "border:solid 2px rgb(250,170,80);";
style_global += "background-color:rgb(255,255,185);";
style_global += "font-size:3px;";
style_global += "}";
style_global += "td.ligne{";
style_global += "}";
style_global += "";
style_global += "tr.ligne_aff:hover{";
style_global += "border:solid 2px black ;";
style_global += "border-bottom:solid 2px black;";
style_global += "background-color:rgb(120,110,70);";
style_global += "cursor:pointer;";
style_global += "}";
style_global += "input.filtre{";
style_global += "width:30px;";
style_global += "";
style_global += "}";
style_global += "tr.ligne_aff_off{";
style_global += "display:none;";
style_global += "}";
style_global += "tr.ligne_aff{";
style_global += "border:solid 2px black ;";
style_global += "border-bottom:solid 2px black;";
style_global += "background-color:rgb(90,80,40);";
style_global += "cursor:pointer;";
style_global += "}";
style_global += "";
style_global += "td.ligne_other{";
style_global += "background-color:rgb(150,50,50);";
style_global += "}";
style_global += "td.ligne_guilde{";
style_global += "background-color:rgb(70,150,50);";
style_global += "}";


style_global += "";

style_global += "td.ligne_enchere{";
// style_global += "border-top:solid 3px rgb(250,170,80);";
// style_global += "border-bottom:solid 3px rgb(250,170,80);";
style_global += "cursor:pointer;";
style_global += "font-family:Algerian;";
style_global += "";
style_global += "";


style_global += "}";

style_global += "a.test_div{";
style_global += "position:relative;";


style_global += "}";


style_global += "a.test_div div{";
style_global += "display:none;";
style_global += "}";
style_global += "";
style_global += "a.test_div:hover div{";
style_global += "display:block;";
style_global += "position:absolute;";
style_global += "top:0em;left:2em;";
style_global += "z-index:25;";
style_global += "";
style_global += "";
style_global += "";
style_global += "}";
style_global += "";
style_global += "";
style_global += "";
style_global += "";
style_global += "";
style_global += "";
style_global += "";
style_global += "";
style_global += "font.titre{";
style_global += "font-family:Algerian;";
style_global += "font-size:12px;";
style_global += "font-weight:bold;";

style_global += "color:;";

style_global += "}";

style_global += "font.ligne{";
// style_global += "font-family:Algerian;";
style_global += "font-size:10px;";
style_global += "color:rgb(230,250,10);";


style_global += "}";


//}

//{Global liste_item;
	if(!GM_getValue("filtre_niveau")){GM_setValue("filtre_niveau","0");}
	if(!GM_getValue("filtre_dps")){GM_setValue("filtre_dps","0");}
	if(!GM_getValue("filtre_def")){GM_setValue("filtre_def","0");}
	if(!GM_getValue("filtre_vie")){GM_setValue("filtre_vie","0");}
	if(!GM_getValue("filtre_char")){GM_setValue("filtre_char","0");}
	if(!GM_getValue("filtre_adr")){GM_setValue("filtre_adr","0");}
	if(!GM_getValue("filtre_agi")){GM_setValue("filtre_agi","0");}
	if(!GM_getValue("filtre_force")){GM_setValue("filtre_force","0");}
	if(!GM_getValue("filtre_const")){GM_setValue("filtre_const","0");}
	if(!GM_getValue("filtre_int")){GM_setValue("filtre_int","0");}
	if(!GM_getValue("filtre_blck")){GM_setValue("filtre_blck","0");}
	if(!GM_getValue("filtre_men")){GM_setValue("filtre_men","0");}
	if(!GM_getValue("filtre_dur")){GM_setValue("filtre_dur","0");}
	if(!GM_getValue("filtre_crit")){GM_setValue("filtre_crit","0");}
	if(!GM_getValue("filtre_soin")){GM_setValue("filtre_soin","0");}
	if(!GM_getValue("filtre_valeur")){GM_setValue("filtre_valeur","0");}
//}

function raz(){
GM_setValue("filtre_niveau","0");
GM_setValue("filtre_dps","0");
GM_setValue("filtre_def","0");
GM_setValue("filtre_vie","0");
GM_setValue("filtre_char","0");
GM_setValue("filtre_adr","0");
GM_setValue("filtre_agi","0");
GM_setValue("filtre_const","0");
GM_setValue("filtre_force","0");
GM_setValue("filtre_int","0");
GM_setValue("filtre_blck","0");
GM_setValue("filtre_men","0");
GM_setValue("filtre_dur","0");
GM_setValue("filtre_crit","0");
GM_setValue("filtre_soin","0");
GM_setValue("filtre_valeur","0");

}




var liste_item = [];
var filtre_niveau=0;
var filtre_dps=0;
var filtre_def=0;
var filtre_char=0;
var filtre_adr=0;
var filtre_agi=0;
var filtre_const=0;
var filtre_vie=0;
var filtre_force=0;
var filtre_int=0;
var filtre_blck=0;
var filtre_men=0;
var filtre_dur=0;
var filtre_crit=0;
var filtre_soin=0;
var filtre_valeur=0;





function recup_p(val){
	reg = new RegExp(/[\+-]/);
	if(val.split(reg).length==2){
		valeur_seule = val.split(/[\+-]/)[1];
		pourc="0%";
		valeur2=0;
	
	}
	else if(val.split(reg).length==3){
		valeur_seule=0;
		pourc = val.split(/[\+-]/)[1].split("(")[0];
		// alert(pourc);
		valeur2 = val.split(/[\+-]/)[2].split(")")[0]
		// alert(valeur2);
	}
	else if(val.split(reg).length==4){
		valeur_seule = val.split(/[\+-]/)[1]
		pourc = val.split(/[\+-]/)[2].split("(")[0];
		// alert(pourc);
		valeur2 = val.split(/[\+-]/)[3].split(")")[0]
		// alert(valeur2);
	}else{
	valeur_seule=0;
	pourc="0%";
	valeur2=0;
	}
	
	res[1]=valeur_seule;
	res[2]= pourc.replace("%","");
	res[3]=valeur2;
	
	return res;
}

style_fond = document.createElement("style");
style_fond.setAttribute("type","text/css");
style_fond.innerHTML=style_global;
document.getElementsByTagName("head")[0].insertBefore(style_fond,document.getElementsByTagName("head")[0].firstChild);




function make_div(table){
// style = "position:relative;";
// style = "top:900px;left:250px;";
// style = "background-color:rgb(255,255,185);"

style = "z-index:1000;"



	if(document.getElementById("div_drawed")){
		document.getElementById("div_drawed").parentNode.removeChild(document.getElementById("div_drawed"));
	}
	div = document.createElement("div");
	div.setAttribute("id","div_drawed");
	div.setAttribute("style",style);
	div.innerHTML=table;
	document.getElementById("auction_table").parentNode.insertBefore(div,document.getElementById("auction_table"));
	
	
	
	
	// document.getElementById("auction_table").parentNode.removeChild(document.getElementById("auction_table"));
	document.getElementById("auction_table").setAttribute("style","display:none");
	
}

function add_listeners(){
	
	
	//{boutons systemes
	for(m=1;m<liste_item.length;m++){
		 id = liste_item[m]["id"];
		big_id = "encher_text_"+id;
		if(document.getElementById("encher_text_"+id)){
			document.getElementById("encher_text_"+id).addEventListener("change",function (){
				for(n=0;n<document.getElementById(this.id.replace("encher_text_","")).getElementsByTagName("input").length;n++){
					if(document.getElementById(this.id.replace("encher_text_","")).getElementsByTagName("input")[n].getAttribute("type")=="text"){
						document.getElementById(this.id.replace("encher_text_","")).getElementsByTagName("input")[n].setAttribute("value",this.value);
						// alert(document.getElementById(this.id.replace("encher_text_","")).getElementsByTagName("input")[n].value)
					}
				}
			},true);	
		}
	}
	
	for(m=1;m<liste_item.length;m++){
		 id = liste_item[m]["id"];
		big_id = "encher_im_"+id;
		document.getElementById("encher_im_"+id).addEventListener("click",function (){
			for(n=0;n<document.getElementById(this.id.replace("encher_im_","")).getElementsByTagName("input").length;n++){
				if(document.getElementById(this.id.replace("encher_im_","")).getElementsByTagName("input")[n].getAttribute("type")=="submit"){
				if(document.getElementById(this.id.replace("encher_im_","")).getElementsByTagName("input")[n].getAttribute("name")=="buyout"){
					document.getElementById(this.id.replace("encher_im_","")).getElementsByTagName("input")[n].click();
					
					
					
					}
					
				}
			}
		},true);	
	}
	
	for(m=1;m<liste_item.length;m++){
		 id = liste_item[m]["id"];
		big_id = "encher_ench_"+id;
		document.getElementById("encher_ench_"+id).addEventListener("click",function (){
			for(n=0;n<document.getElementById(this.id.replace("encher_ench_","")).getElementsByTagName("input").length;n++){
			value_to_load = parseInt(document.getElementById(this.id).getAttribute("valeur_to_load").replace(".",""));
				if(document.getElementById(this.id.replace("encher_ench_","")).getElementsByTagName("input")[n].getAttribute("type")=="text"){
						document.getElementById(this.id.replace("encher_ench_","")).getElementsByTagName("input")[n].setAttribute("value",value_to_load);
						document.getElementById("encher_text_"+this.id.replace("encher_ench_","")).setAttribute("value",value_to_load);
						// alert(document.getElementById(this.id.replace("encher_text_","")).getElementsByTagName("input")[n].value)
						}
				
			}
			for(n=0;n<document.getElementById(this.id.replace("encher_ench_","")).getElementsByTagName("input").length;n++){
			if(document.getElementById(this.id.replace("encher_ench_","")).getElementsByTagName("input")[n].getAttribute("type")=="submit"){
				
				if(document.getElementById(this.id.replace("encher_ench_","")).getElementsByTagName("input")[n].getAttribute("name")=="bid"){
					document.getElementById(this.id.replace("encher_ench_","")).getElementsByTagName("input")[n].click();
					}
					
				}
			}
		},true);	
	}
	//}
	
	//onchange
	document.getElementById("filtre_dps").addEventListener("change",function (){
	filtre_dps=this.value;
	GM_setValue("filtre_dps",this.value);
	table = table_draw();
	make_div(table);
	// add_listeners();
	add_listeners();
	
	},true);
	
	document.getElementById("filtre_def").addEventListener("change",function (){
	filtre_def=this.value;
	GM_setValue("filtre_def",this.value);
	table = table_draw();
	make_div(table);
	// add_listeners();
	add_listeners();
	
	},true);
	
	document.getElementById("filtre_vie").addEventListener("change",function (){
	filtre_vie=this.value;
	GM_setValue("filtre_vie",this.value);
	table = table_draw();
	make_div(table);
	// add_listeners();
	add_listeners();
	
	},true);
	
	document.getElementById("raz_encheres").addEventListener("click",function (){
	raz();
	table = table_draw();
	make_div(table);
	add_listeners();
	},true);
	
	document.getElementById("filtre_force").addEventListener("change",function (){
	filtre_force=this.value;
	GM_setValue("filtre_force",this.value);
	table = table_draw();
	make_div(table);
	// add_listeners();
	add_listeners();
	
	},true);
	
	document.getElementById("filtre_agi").addEventListener("change",function (){
	filtre_agi=this.value;
	GM_setValue("filtre_agi",this.value);
	table = table_draw();
	make_div(table);
	// add_listeners();
	add_listeners();
	
	},true);
	
	document.getElementById("filtre_int").addEventListener("change",function (){
	filtre_int=this.value;
	GM_setValue("filtre_int",this.value);
	table = table_draw();
	make_div(table);
	// add_listeners();
	add_listeners();
	
	},true);
	
	document.getElementById("filtre_char").addEventListener("change",function (){
	filtre_char=this.value;
	GM_setValue("filtre_char",this.value);
	table = table_draw();
	make_div(table);
	// add_listeners();
	add_listeners();
	
	},true);
	
	document.getElementById("filtre_adr").addEventListener("change",function (){
	filtre_adr=this.value;
	GM_setValue("filtre_adr",this.value);
	table = table_draw();
	make_div(table);
	// add_listeners();
	add_listeners();
	
	},true);
	
	document.getElementById("filtre_niveau").addEventListener("change",function (){
	filtre_niveau=this.value;
	GM_setValue("filtre_niveau",this.value);
	table = table_draw();
	make_div(table);
	// add_listeners();
	add_listeners();
	
	},true);
	
	document.getElementById("filtre_const").addEventListener("change",function (){
	filtre_const=this.value;
	GM_setValue("filtre_const",this.value);
	table = table_draw();
	make_div(table);
	// add_listeners();
	add_listeners();
	
	},true);
	
	document.getElementById("filtre_blck").addEventListener("change",function (){
	filtre_blck=this.value;
	GM_setValue("filtre_blck",this.value);
	table = table_draw();
	make_div(table);
	// add_listeners();
	add_listeners();
	
	},true);
	
	document.getElementById("filtre_dur").addEventListener("change",function (){
	filtre_dur=this.value;
	GM_setValue("filtre_dur",this.value);
	table = table_draw();
	make_div(table);
	// add_listeners();
	add_listeners();
	
	},true);
	
	document.getElementById("filtre_crit").addEventListener("change",function (){
	filtre_crit=this.value;
	GM_setValue("filtre_crit",this.value);
	table = table_draw();
	make_div(table);
	// add_listeners();
	add_listeners();
	
	},true);
	
	document.getElementById("filtre_men").addEventListener("change",function (){
	filtre_men=this.value;
	GM_setValue("filtre_men",this.value);
	table = table_draw();
	make_div(table);
	// add_listeners();
	add_listeners();
	
	},true);

	document.getElementById("filtre_soin").addEventListener("change",function (){
	filtre_soin=this.value;
	GM_setValue("filtre_soin",this.value);
	table = table_draw();
	make_div(table);
	// add_listeners();
	add_listeners();
	
	},true);
}

function table_draw(){
	
	table = "<table width=1200px class=affich>"
	//{entete du tableau
	titre = "<tr>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>Nom</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>Niv</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere style='text-align:center;'>";
	titre += "<font class=titre>DPS</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>Def</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>char</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>adr</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>agi</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>const</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>Vie</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>Force</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>int</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>blck</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>men</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>dur</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>Crit</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>Soin</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>Valeur</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere>";
	titre += "<font class=titre>onwner</font>";
	titre += "</td>";
	titre += "<td class=ligne_enchere style=text-align:center;>";
	titre += "<font class=titre>Forms</font>";
	titre += "</td>";
	titre += "</tr>";
	//}
	
	
	table += titre; 
	//{filtres
	filtres = "<tr>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=button value=raz id=raz_encheres>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=text value='"+GM_getValue("filtre_niveau")+"' id=filtre_niveau class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere style='text-align:center;'>";
	filtres += "<input type=text value='"+GM_getValue("filtre_dps")+"' id=filtre_dps class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=text value='"+GM_getValue("filtre_def")+"' id=filtre_def class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=text id=filtre_char value='"+GM_getValue("filtre_char")+"' class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=text id=filtre_adr value='"+GM_getValue("filtre_adr")+"' class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=text id=filtre_agi value='"+GM_getValue("filtre_agi")+"' class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=text id=filtre_const value='"+GM_getValue("filtre_const")+"' class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=text id=filtre_vie value='"+GM_getValue("filtre_vie")+"' class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=text id=filtre_force value='"+GM_getValue("filtre_force")+"' class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=text id=filtre_int value='"+GM_getValue("filtre_int")+"' class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=text id=filtre_blck value='"+GM_getValue("filtre_blck")+"' class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=text id=filtre_men value='"+GM_getValue("filtre_men")+"' class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=text id=filtre_dur value='"+GM_getValue("filtre_dur")+"' class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=text id=filtre_crit value='"+GM_getValue("filtre_crit")+"' class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=text id=filtre_soin value='"+GM_getValue("filtre_soin")+"' class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<input type=text id=filtre_valeur class=filtre>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere>";
	filtres += "<font class=titre>onwner</font>";
	filtres += "</td>";
	filtres += "<td class=ligne_enchere style=text-align:center;>";
	filtres += "<font class=titre>Forms</font>";
	filtres += "</td>";
	filtres += "</tr>";
	//}
	
	table += filtres;
	
	z=0;
	for(k=1;k < liste_item.length;k++){
	
	//{definitions
	
	
	if(liste_item[k]["niveau"].replace("undefined","")){
	this_niveau = parseInt(liste_item[k]["niveau"].replace("undefined",""));
	}else{this_niveau=0;}
	if(liste_item[k]["degats"].replace("undefined","").split("-")[0]){
	this_dps= parseInt(liste_item[k]["degats"].replace("undefined","").split("-")[0]);
	}else{this_dps=0;}
	if(liste_item[k]["armure"].replace("undefined","")){
	this_def=parseInt(liste_item[k]["armure"].replace("undefined","").replace("+","").replace("-",""));
	}else{this_def=0;}
	if(recup_p(liste_item[k]["charisme"].replace("undefined",""))[2]){
	this_char=parseInt(recup_p(liste_item[k]["charisme"].replace("undefined",""))[2]);
	}else{this_char=0;}
	if(recup_p(liste_item[k]["constitution"].replace("undefined",""))[2]){
	this_const=parseInt(recup_p(liste_item[k]["constitution"].replace("undefined",""))[2]);
	}else{this_const=0;}
	if(recup_p(liste_item[k]["agilite"].replace("undefined",""))[2]){
	this_agi=parseInt(recup_p(liste_item[k]["agilite"].replace("undefined",""))[2]);
	}else{this_agi=0;}
	if(recup_p(liste_item[k]["force"].replace("undefined",""))[2]){
	this_force=parseInt(recup_p(liste_item[k]["force"].replace("undefined",""))[2]);
	}else{this_force=0;}
	if(recup_p(liste_item[k]["intelligence"].replace("undefined",""))[2]){
	this_int=parseInt(recup_p(liste_item[k]["intelligence"].replace("undefined",""))[2]);
	}else{this_int=0;}
	if(recup_p(liste_item[k]["adresse"].replace("undefined",""))[2]){
	this_adr=parseInt(recup_p(liste_item[k]["adresse"].replace("undefined",""))[2]);
	}else{this_adr=0;}
	if(liste_item[k]["vie"].replace("undefined","")){
	this_vie=parseInt(liste_item[k]["vie"].replace("undefined",""));
	}else{this_vie=0;}
	if(liste_item[k]["block"].replace("undefined","").replace("+","")){
	this_blck=parseInt(liste_item[k]["block"].replace("undefined","").replace("+",""));
	}else{this_blck=0;}
	if(liste_item[k]["menace"].replace("undefined","").replace("+","")){
	this_men=parseInt(liste_item[k]["menace"].replace("undefined","").replace("+",""));
	}else{this_men=0;}
	if(liste_item[k]["critique"].replace("undefined","").replace("+","")){
	this_crit=parseInt(liste_item[k]["critique"].replace("undefined","").replace("+",""));
	}else{this_crit=0;}
	if(liste_item[k]["soin"].replace("undefined","").replace("+","")){
	this_soin=parseInt(liste_item[k]["soin"].replace("undefined","").replace("+",""));
	}else{this_soin=0;}
	if(liste_item[k]["durcissement"].replace("undefined","").replace("+","")){
	this_dur=parseInt(liste_item[k]["durcissement"].replace("undefined","").replace("+",""));
	}else{this_dur=0;}
	
	
	
	
	
	// filtre_blck=parseInt();
	// filtre_men=parseInt();
	// filtre_dur=parseInt();
	// filtre_crit=parseInt();
	// filtre_soin=parseInt();
	// filtre_valeur=parseInt();
	//}
	
	
	
		if( this_crit>=GM_getValue("filtre_crit") &&this_soin>=GM_getValue("filtre_soin") &&this_dur>=GM_getValue("filtre_dur") &&this_men>=GM_getValue("filtre_men") &&this_adr>=GM_getValue("filtre_adr") && this_blck>=GM_getValue("filtre_blck") && this_vie>=GM_getValue("filtre_vie") && this_force>=GM_getValue("filtre_force") && this_int>=GM_getValue("filtre_int") && this_char>=GM_getValue("filtre_char") && this_agi>=GM_getValue("filtre_agi") && this_def>=GM_getValue("filtre_def") && this_niveau>=GM_getValue("filtre_niveau") & this_dps>=GM_getValue("filtre_dps")){
			
			z++;
			if(z==10){
			table +=titre;
			z=0;
			}
			table += "<tr class=ligne_aff>";
			
			
		}
		else{
		// alert(liste_item[k]["block"].replace("undefined",""));
			table += "<tr class=ligne_aff_off>";
		}
		
		
		table += "<td style='background-color:rgb(77,60,40);'>";
		table += "<font class=ligne color="+liste_item[k]["color"]+" ><a class='test_div' href='#'><img src='"+liste_item[k]["img"]+"'><div>"+liste_item[k]["text_all"]+"</div></a></font>";
		table += "</td>";
		table += "<td class=ligne>";
		table += "<font class=ligne>"+liste_item[k]["niveau"].replace("undefined","")+"</font>";
		table += "</td>";
		table += "<td  class=ligne title=dégats>";
		if(liste_item[k]["degats"].indexOf("-")!=-1){
		deg_min = liste_item[k]["degats"].replace("undefined","").split("-")[0];
		deg_max = liste_item[k]["degats"].replace("undefined","").split("-")[1];
		table += "<table><tr><td><font class=ligne>"+deg_min +"</td><td><font class=ligne>-</font></td><td></font></td><td><font class=ligne>"+deg_max+"</font></td></tr></table>";
		}
		else{
		table += "<font class=ligne>"+liste_item[k]["degats"].replace("undefined","")+"</font>";
		}
		
		
		table += "</td>";
		
		table += "<td class=ligne title=armure>";
		table += "<font class=ligne>"+liste_item[k]["armure"].replace("undefined","")+"</font>";
		table += "</td>";
		table += "<td class=ligne title=charisme>";
		table += "<font class=ligne>"+liste_item[k]["charisme"].replace("undefined","")+"</font>";
		table += "</td>";
		table += "<td class=ligne title=adresse>";
		table += "<font class=ligne >"+liste_item[k]["adresse"].replace("undefined","")+"</font>";
		table += "</td>";
		table += "<td class=ligne title=agilite> ";
		table += "<font class=ligne>"+liste_item[k]["agilite"].replace("undefined","")+"</font>";
		table += "</td>";
		table += "<td class=ligne title=constitution>";
		table += "<font class=ligne>"+liste_item[k]["constitution"].replace("undefined","")+"</font>";
		table += "</td>";
		table += "<td class=ligne title=Vie>";
		if(liste_item[k]["vie"].indexOf("+")!=-1 || liste_item[k]["vie"].replace(" ","").replace("undefined","")=="" || liste_item[k]["vie"].indexOf("-")!=-1){
		table += "<font class=ligne>"+liste_item[k]["vie"].replace("undefined","")+"</font>";
		}
		else{
		
		vie = parseInt(liste_item[k]["vie"].replace("undefined",""));
		prix = parseInt(liste_item[k]["ench_mini"].replace(".",""));
		// alert(vie);
		// alert(prix);
		table += "<font class=ligne>"+liste_item[k]["vie"].replace("undefined","")+"("+(vie/prix).toFixed(2)+")</font>";
		}
		
		
		table += "</td>";
		table += "<td class=ligne title=Force>";
		table += "<font class=ligne>"+liste_item[k]["force"].replace("undefined","")+"</font>";
		table += "</td>";
		
		
		
		
		table += "<td class=ligne title=intelligence>";
		table += "<font class=ligne>"+liste_item[k]["intelligence"].replace("undefined","")+"</font>";
		table += "</td>";
		table += "<td class=ligne title=Blocage>";
		table += "<font class=ligne>"+liste_item[k]["block"].replace("undefined","")+"</font>";
		table += "</td>";
		table += "<td class=ligne title=Menace>";
		table += "<font class=ligne>"+liste_item[k]["menace"].replace("undefined","")+"</font>";
		table += "</td>";
		table += "<td class=ligne title=durcissement>";
		table += "<font class=ligne>"+liste_item[k]["durcissement"].replace("undefined","")+"</font>";
		table += "</td>";
		table += "<td class=ligne title=critique>";
		table += "<font class=ligne>"+liste_item[k]["critique"].replace("undefined","")+"</font>";
		table += "</td>";
		table += "<td class=ligne title=Soin>";
		table += "<font class=ligne>"+liste_item[k]["soin"].replace("undefined","")+"</font>";
		table += "</td>";
		table += "<td class=ligne title=Valeur>";
		table += "<table><tr><td><font class=ligne>"+liste_item[k]["valeur"].replace("undefined","")+"</font></td><td><img src="+liste_item[k]["enchere_achat_o_src"]+"></td></tr></table>";
		table += "</td>";
		
		if(liste_item[k]["owner"]=="Enchère déjà existante"){
		table += "<td  class=ligne_other>";
		table += "<font class=ligne  weight=bold>"+liste_item[k]["owner"].replace("undefined","")+"</font>";
		}else if(liste_item[k]["owner"]!=""){
		table += "<td  class=ligne_guilde>";
		table += "<font class=ligne  weight=bold>"+liste_item[k]["owner"].replace("undefined","")+"</font>";
		}
		else{
		table += "<td  class=ligne>";
		table += "<font class=ligne >"+liste_item[k]["owner"].replace("undefined","")+"</font>";
		}
		
		table += "</td>";
		table += "<td  class=ligne>";
		table += "<table><tr><td colspan=5 style='text-align:center;'><input type=text id='encher_text_"+liste_item[k]["id"]+"' pattern=\"[0-9]*\"></td></tr>";
		table += "<tr><td colspan=4><font class=ligne>"+liste_item[k]["ench_mini"]+"</font><img src="+liste_item[k]["enchere_achat_o_src"]+"></td>";
		table += "<td><input id='encher_ench_"+liste_item[k]["id"]+"' valeur_to_load='"+liste_item[k]["ench_mini"]+"' class=button3 type=button value='encherir'></td></tr>";
		
		table += "<tr><td><font class=ligne>"+liste_item[k]["enchere_achat_o"]+"</font></td><td><img src="+liste_item[k]["enchere_achat_o_src"]+"></td><td><font class=ligne>"+liste_item[k]["enchere_achat_r"]+"</font></td><td><img src="+liste_item[k]["enchere_achat_r_src"]+"></td>";
		table += "<td><input id='encher_im_"+liste_item[k]["id"]+"' class=button3 type=button value=achat_immediat></td></tr></table>";
		table += "</td>";
		enchere_achat_o_src
		enchere_achat_r_src
		table += "</tr>";
		
		
		
		
	}
	table += "</table>";
	return table;
}



// set_list();
set_list();
// var liste_item=[][];
function set_list(){
	// var liste_item = [];
	for(i=0;i<document.getElementsByTagName("form").length;i++){
		if(document.getElementsByTagName("form")[i].getAttribute("id")){
			if(document.getElementsByTagName("form")[i].getAttribute("id").indexOf("auctionForm")!=-1){
			the_form = document.getElementsByTagName("form")[i];
				id = the_form.getAttribute("id");
				var item = set_item(id);
				item["img"] = get_img(item);
				liste_item[i] = item;
				
				
			}
		}

	}
	table = table_draw();
	make_div(table);
	add_listeners(liste_item);
}

function set_item(id){
	// alert("new item;")
	var item = [];
	item['id']=id;
	item['text']= get_item_text(item);
	item['text_all']= get_item_text_all(item);
	
	res = get_item_all(item);
	return res;
	
}




function get_item_text(item){
	text = document.getElementById(item['id']).getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getAttribute("onmouseover").split("return escape('")[1];
	res = text.split("')")[0];
	text = res.split("</table>")[0];
	res = text.split("<table><tr><td valign=\\'top\\'>")[1];
	return res;
}

function get_img(item){
img = document.getElementById(item['id']).getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("img")[0].getAttribute("src");
	// res = text.split("')")[0];
	// text = res.split("</table>")[0];
	// res = text.split("<table><tr><td valign=\\'top\\'>")[1];
	return img;
}

function get_item_text_all(item){
	text = document.getElementById(item['id']).getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getAttribute("onmouseover").split("return escape('")[1];
	res = text.split("')")[0];
	ret = res.replace(/\\'/g,"'");
	res2 = ret.replace(/<div/g,"<div style=display:none");
	
	return res2;
}

function get_item_all(item){
	tableau = item['text'].split("</td>");
	
	for(j=0;j<tableau.length;j++){
		if(tableau[j].indexOf("img")==-1){
		
		
		ligne = tableau[j].split(">")[tableau[j].split(">").length-1];
		
		if(j==0){
			item["name"] +=ligne;
			item["color"]=tableau[j].split("color:")[1].split(";")[0];
			
		}
		//renforts
		if(j==1){
			if(ligne.indexOf("Utiliser")!=-1){
				if(ligne.indexOf("Force")!=-1){item["force"]=ligne.split(":")[1].split("Force")[0];}
			
				if(ligne.indexOf("Agilité")!=-1){item["agilite"]=ligne.split(":")[1].split("Agilité")[0];}
			
				if(ligne.indexOf("Charisme")!=-1){item["charisme"]=ligne.split(":")[1].split("Charisme")[0];}
			
				if(ligne.indexOf("Intelligence")!=-1){item["intelligence"]=ligne.split(":")[1].split("Intelligence")[0];}
			
				if(ligne.indexOf("Adresse")!=-1){item["adresse"]=ligne.split(":")[1].split("Adresse")[0];}
			
				if(ligne.indexOf("Dégâts")!=-1){item["degats"]=ligne.split(":")[1].split("Dégâts")[0];}
			
				if(ligne.indexOf("Constitution")!=-1){item["constitution"]=ligne.split(":")[1].split("Constitution")[0];}
			
				if(ligne.indexOf("Armure")!=-1){item["armure"]=ligne.split(":")[1].split("Armure")[0];}
			}

		}
		
		//items
		if(ligne.indexOf("Vie +")!=-1 || ligne.indexOf("Vie -")!=-1){
			item["vie"] +=ligne.split("Vie")[1];
		}else if(ligne.indexOf("Points de vie:")!=-1 ){
			item["vie"] +=ligne.split("Points de vie:")[1];
		}else{
			item["vie"] +="";
		}
		if(ligne.indexOf("Soigne")!=-1){
			item["vie"] +=ligne.split("Soigne")[1].split("points")[0];
		}else{
			item["vie"] +="";
		}
		if(ligne.indexOf("Armure +")!=-1 || ligne.indexOf("Armure -")!=-1){
			item["armure"] +=ligne.split("Armure")[1];
		}else{
			item["armure"] +="";
		}
		if(ligne.indexOf("Dégâts")!=-1 ){
			item["degats"] +=ligne.split("Dégâts")[1];
			
		}else{
			item["degats"] +="";
		}
		if(ligne.indexOf("Force +")!=-1 ||ligne.indexOf("Force:")!=-1 || ligne.indexOf("Force -")!=-1){
			item["force"] +=ligne.split("Force")[1];
			item["force"] = item["force"].replace(":","");
		}else{
		
			item["force"] +="";
		}
		if(ligne.indexOf("Agilité +")!=-1 ||ligne.indexOf("Agilité:")!=-1 || ligne.indexOf("Agilité -")!=-1){
			item["agilite"] +=ligne.split("Agilité")[1];
			item["agilite"] = item["agilite"].replace(":","");
		}else{
			item["agilite"] +="";
		}
		if(ligne.indexOf("Adresse +")!=-1 ||ligne.indexOf("Adresse:")!=-1 || ligne.indexOf("Adresse -")!=-1){
			item["adresse"] +=ligne.split("Adresse")[1];
			item["adresse"] = item["adresse"].replace(":","");
		}else{
			item["adresse"] +="";
		}
		if(ligne.indexOf("Charisme +")!=-1 ||ligne.indexOf("Charisme:")!=-1 || ligne.indexOf("Charisme -")!=-1){
			item["charisme"] +=ligne.split("Charisme")[1];
			item["charisme"] = item["charisme"].replace(":","");
		}else{
			item["charisme"] +="";
		}
		if(ligne.indexOf("Constitution +")!=-1 ||ligne.indexOf("Constitution:")!=-1 || ligne.indexOf("Constitution -")!=-1){
			item["constitution"] +=ligne.split("Constitution")[1];
			item["constitution"] = item["constitution"].replace(":","");
		}else{
			item["constitution"] +="";
		}
		if(ligne.indexOf("Intelligence +")!=-1 ||ligne.indexOf("Intelligence:")!=-1 || ligne.indexOf("Intelligence -")!=-1){
			item["intelligence"] +=ligne.split("Intelligence")[1];
			item["intelligence"] = item["intelligence"].replace(":","");
		}else{
			item["intelligence"] +="";
		}
		if(ligne.indexOf("Valeur de blocage")!=-1){
			item["block"] +=ligne.split("Valeur de blocage")[1];
		}else{
			item["block"] +="";
		}
		if(ligne.indexOf("Menace +")!=-1 || ligne.indexOf("Menace -")!=-1 ){
			item["menace"] +=ligne.split("Menace")[1];
		}else{
			item["menace"] +="";
		}
		if(ligne.indexOf("Soin +")!=-1 || ligne.indexOf("Soin -")!=-1){
			item["soin"] +=ligne.split("Soin")[1];
		}else{
			item["soin"] +="";
		}
		if(ligne.indexOf("Valeur de durcissement +")!=-1 || ligne.indexOf("Valeur de durcissement -")!=-1){
			item["durcissement"] +=ligne.split("Valeur de durcissement")[1];
		}else{
			item["durcissement"] +="";
		}
		if(ligne.indexOf("Valeur d`attaque critique")!=-1 ){
			item["critique"] +=ligne.split("Valeur d`attaque critique")[1];
		}else{
			item["critique"] +="";
		}
		
		if(ligne.indexOf("Niveau ")!=-1 && ligne.indexOf("objet")<0){
			item["niveau"] +=ligne.split("Niveau")[1];
		}else{
			item["niveau"] +="";
		}
		
		}
		else{
		
		ligne = tableau[j].split(">")[tableau[j].split(">").length-2];
		if(ligne.indexOf("Valeur")!=-1){
		
			item["valeur"] +=ligne.split("<img")[0].split("Valeur ")[1];
			
		}else{
			item["valeur"] +="";
		}
		}
	
	}
	
	
	//recup des encheres en cours,
	owner="";
	for(l=0;l<document.getElementById(item["id"]).getElementsByTagName("span").length;l++){
		owner = document.getElementById(item["id"]).getElementsByTagName("span")[l].innerHTML;		
	}
	item["owner"]=owner;
	
	//recup du prix actuel
	enchere_mini="";
	for(l=0;l<document.getElementById(item["id"]).getElementsByTagName("img").length;l++){
		if(document.getElementById(item["id"]).getElementsByTagName("img")[l].getAttribute("src").indexOf("img/res2.gif")>0){
			
			if(l==1){
				// alert(document.getElementById(item["id"]).getElementsByTagName("img")[l].parentNode.innerHTML);
				enchere_mini = document.getElementById(item["id"]).getElementsByTagName("img")[l].parentNode.innerHTML.split("<img")[0].split(":")[1];
				enchere_achat_o_src = document.getElementById(item["id"]).getElementsByTagName("img")[l].getAttribute("src");
			}
			
		}
	}
	item["ench_mini"]=enchere_mini;
	
	
	
	for(l=0;l<document.getElementById(item["id"]).getElementsByTagName("img").length;l++){
		if(document.getElementById(item["id"]).getElementsByTagName("img")[l].getAttribute("src").indexOf("img/res3.gif")>0){
			
			if(l==3){
				// alert(document.getElementById(item["id"]).getElementsByTagName("img")[l].parentNode.parentNode.innerHTML.split("type=\"submit\">")[2].split("&nbsp;")[1]);
				enchere_achat_o = document.getElementById(item["id"]).getElementsByTagName("img")[l].parentNode.parentNode.innerHTML.split("type=\"submit\">")[2].split("<img src=")[0];
				// enchere_achat_o_src = document.getElementById(item["id"]).getElementsByTagName("img")[l].getAttribute("src");
				enchere_achat_r = document.getElementById(item["id"]).getElementsByTagName("img")[l].parentNode.parentNode.innerHTML.split("type=\"submit\">")[2].split("&nbsp;")[1];
				enchere_achat_r_src = document.getElementById(item["id"]).getElementsByTagName("img")[l].getAttribute("src");
			}
			
			item["enchere_achat_r"] =enchere_achat_r;
			item["enchere_achat_r_src"]=enchere_achat_r_src;
			item["enchere_achat_o"]=enchere_achat_o;
			item["enchere_achat_o_src"]=enchere_achat_o_src;
			
		}
	}
	
	// alert(item["inputs"]);
	
	
return item;
}



