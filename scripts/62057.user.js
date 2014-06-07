// ==UserScript==
// @name           wawa mania
// @include        http://forum.wawa-mania.ws/*
// @include        https://forum.wawa-mania.ws/*
// @author         86245
// @version        0.05
// @require		   http://userscripts.org/scripts/source/44063.user.js
// ==/UserScript==


GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	}

GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}

/*0.05
autoselecte recherche.
diferent style en fonction de celui choisi pour wawa mania
drag and drop
amelioration du la récuparation selection (detecte auteur ou mot clée.
*/

//mise a jours lien
//GM_setValue
var temporaire=''
if(GM_getValue('modifiSavLien',true)&&GM_getValue('indexLien',false)){
	var data='Favoirs◘☼◘'+GM_getValue('indexLien').replace(/☻/g,'◙☻◙')
	data=data.replace(/☺/g,'◙☺◙')
	GM_setValue('indexLien',data)
	GM_setValue('modifiSavLien',false)
}

function obIndexLien (){
	this.chaineTotal;
	this.obj={};
	this.miseAJourChaine=function (){//obj.nonDossier[['titre','lien'],['titre2','lien2']]
		var dossData,objtemp,tableTous=[];
		objtemp=clone(this.obj);
		for (var dossier in objtemp){//obj.nonDossier
			dossData=[];
			for (var i=0;i<objtemp[dossier].length;i++){//obj.nonDossier[]
				objtemp[dossier][i]=objtemp[dossier][i].join('◙☺◙');
			}
			objtemp[dossier]=objtemp[dossier].join('◙☻◙');
			if (objtemp[dossier])dossData.push([dossier],objtemp[dossier]);
			else dossData.push([dossier]);
			tableTous.push(dossData.join('◘☼◘'));
		}
		delete objtemp;
		this.chaineTotal=tableTous.join('♫♣♫')
		GM_setValue('indexLien',this.chaineTotal);
	}
	this.miseAJourObj=function (){if(this.chaineTotal){
		this.obj={};
		var dos=this.chaineTotal.split('♫♣♫'),dosData,dataData,nameCib;//separe les dossier
		for (var i=0;i<dos.length;i++){
			dosData=dos[i].split('◘☼◘');//seprate nonDossier/data
			this.obj[dosData[0]]=[];//cré une entré tableau du nom du dossier
			if (!dosData[1])continue; //si le dossier est vide
			for (var b=0;b<dosData.length;b++){
				dataData=dosData[1].split('◙☻◙');//separe les diferent liens
				for (var c=0;c<dataData.length;c++){
					nameCib=dataData[c].split('◙☺◙');//separe le titre du lien.
					this.obj[dosData[0]][c]=[nameCib[0],nameCib[1]];
				}
			}
		}
		this.miseAJourChaine();
	}}
	this.actuChaine=function(){
		this.chaineTotal=GM_getValue('indexLien',false);
		if(this.chaineTotal)this.miseAJourObj();
	}
	this.actuChaine();
	this.ajoutDossier=function (dossier){
		if (this.obj[dossier]==undefined)this.obj[dossier]=[];
		this.miseAJourChaine();
	}
	this.suprDossier=function (dossier){
		delete this.obj[dossier];
		this.miseAJourChaine();
	}
	this.ajoutChaine=function (titre,lienHR,dossier){
		if (this.obj[dossier]==undefined)this.obj[dossier]=[[titre,lienHR]];
		else this.obj[dossier].push([titre,lienHR]);
		this.miseAJourChaine();
	}
	this.supreChaine=function (lienHR,detect){
		for (var dossier in this.obj){
			if (this.obj[dossier])for (var i=0;i<this.obj[dossier].length;i++)if (this.obj[dossier][i][1]==lienHR){
				if (!detect)this.obj[dossier].splice(i, 1);
				else if (detect)return true;
				break;
			}
		}
		if (detect)return false;
		this.miseAJourChaine();
	}
	this.changePlace=function (){
		temporaire='\t\tAvant changement de place\n'
		for (i in this.obj)temporaire+=i+' = '+this.obj[i]+'\n';
		temporaire='\t\Pandant changement de place\n'
		this.obj={};
		var nomdoss;
		$$('.dosPerso').each(function(element){
				iddoss=element.id.substring(5)
				nomdoss=element.innerHTML;
				this[nomdoss]=[];
				temporaire+=element.innerHTML+' = '+$$('#drOp'+iddoss+' a').length+' liens détécter\n'
				$$('#drOp'+iddoss+' a').each(function(element){
					this.push([element.innerHTML,element.getProperty('href')]);
					
				},this[nomdoss]);
		},this.obj);
		temporaire='\t\Après changement de place\n'
		for (i in this.obj)temporaire+=i+' = '+this.obj[i]+'\n'
		temporaire='\t\après mise a jour chaine\n'
		this.miseAJourChaine();
		for (i in this.obj)temporaire+=i+' = '+this.obj[i]+'\n'
	}
}

function clone(srcInstance){
	if(typeof(srcInstance) != 'object' || srcInstance == null || srcInstance == undefined)return srcInstance;
	var newInstance = srcInstance.constructor();
	for(var i in srcInstance)newInstance[i] = clone(srcInstance[i]);
	return newInstance;
}

var indexLien=new obIndexLien ();

//saute le logo 
if (GM_getValue('chexDesend',true)&&pageYOffset<$('brdmenu').offsetTop)
scrollTo(0,$('brdmenu').offsetTop);
//suprime les div indesirable
var pub1= (!GM_getValue('chexpb1',false))?'h2:contains("Publicité") + .box,h2:contains("Publicité"),br + .box, #zzsldr, iframe':{};
var pub2= (!GM_getValue('chexpb2',false))?'div[class=blockpost][id!=postpreview]':{};
var footer1= (!GM_getValue('lienBas',false))?'#brdfooter  ~ a':{};
$$(pub2,pub1,footer1,'#divStayTopLeft').destroy();

//déclaration de variable
//acueil
var accueil=(window.location.pathname=="/viewtopic.php"||window.location.pathname=="/viewforum.php")?false:true;

//tableau contena les lien
var arrayPrinci=[['Divers Warez','E-Book',27,'Divers',20,'Mobile & Pocket PC',70,'P2P Pando',42],['Appz','Appz Windows',8,'Anti-Virus...',44,'Appz Linux/Mac/Freebsd',36],['Gamez','GameZ PC',16,'GameZ Consoles de salon',37,'GameZ Consoles portables',38],['Films / Vidéo','Exclue',45,'DvDrip',5,'DvD / HD',46,'Screener et TS',35,'Séries télé',6,'Docs, concerts, spectacles',56,'Dessin animés / Mangas',58],['Musique','Album Musique',7,'Single Musique',40,'Discographie',51,'Clip',41,'H-Q',66,'Section M.A.O',71],['Le coin détente','Café',4,'Humour/Insolite',64,'Jeux alakon',65],['Informatique','Programmation/Coding',68,'Informatique Générale',57,'Tutoriaux',29,'Linux, Mac\'OS, Freebsd',59,'Gamer',60],['Graphisme','Demande d\'avatar',31,'Galerie',33,'Café du graphiste',34],['Majeur XxX','Films',9,'Vidéo',47,'Photo',48,'Divers',49]]
//Css

var degRougeOrange='#FF1F1F #FF2F1F #FF3F1F #FF4F1F #FF5F1F transparent transparent transparent transparent#FF6F1F #FF7F1F #FF8F1F #FF9F1F';


var borderCo=$$('div.box')[0].getStyle('borderColor').substring(0,7);
var backGroundCo=$$('div.box')[0].getStyle('backgroundColor');
var backGroundCo2=$$('#brdmenu')[0].getStyle('backgroundColor')
if(backGroundCo2=="transparent")backGroundCo2=backGroundCo;
var linkCo=$$('.pun a')[0].getStyle('color');
var textCo=$$('.pun')[0].getStyle('color');
var lienColoHover=
textCo=comparIver(backGroundCo2.hexToRgb(true),textCo.hexToRgb(true)).rgbToHex()
linkCo=comparIver(backGroundCo2.hexToRgb(true),linkCo.hexToRgb(true)).rgbToHex()
var css ='#lora{z-index:15;border:'+borderCo+' solid 1px;width:220px;'+GM_getValue('loraH','top:5px;')+GM_getValue('loraW','left:5px;')+'position: fixed;background:'+backGroundCo2+';line-height:normal;color:'+textCo+';opacity:'+(GM_getValue('MasKautoLAB',true)?0.04:1)+';}'+
'#lora:hover{opacity:1;}'+
'#lora p{margin:0;}'+
'#lora h3{padding:0 0 0 2px;color:'+linkCo+';margin:0;font-size:1em;cursor:pointer;}'+
'[class~=m1]{font-size:1.1em;color:'+textCo+'!important; margin: 0 0 -1px 0 !important;z-index:15;cursor:pointer;border:'+borderCo+' solid;border-width:1px 0 1px 0;}'+
'[class~=m1]:hover{background:-moz-radial-gradient(center 45deg, circle, transparent 0%, '+toRGBA(ajouCoul(linkCo.hexToRgb(true),[-50,+120,0]),0.6)+' 120%);text-shadow:0 0 13px '+toRGBA(ajouCoul(linkCo.hexToRgb(true),[-20,-120,0]),0.7)+';}'+
'#menn{cursor:move;margin:0;padding:8px 0 2px 0;font-size:1.3em;color:'+$$('.pun h2')[0].getStyle('color')+';line-height:normal;background-image:'+$$('.pun h2')[0].getStyle('backgroundImage')+';background-color:'+$$('.box')[0].getStyle('backgroundColor')+';background-repeat:repeat-x;-moz-background-size:auto 100%;text-shadow:0 0 13px '+GM_getValue('couleur3','#273D3F')+';}'+
'.padd {padding:0;width:210px;margin:0 0 4px 0;}'+
'.butonRigh {float:right;}'+
'#newFo{;background-color:#D1EAE7;}'+
'.paddBut {width:80%;}'+
'#reception{left:1000px;}'+
'#activeMenu{opacity:0.1;background:'+backGroundCo+';width:100px;height:100px;position: fixed;top:0; left:0;z-index:9999;}'+
'#search{padding : 3px 0 0 5px;text-align:center;}'+
'#search input[type=submit]{width:110px;}'+
'#search .padd,#reglecouleurDiv .padd{text-align:center;}'+
'#search input[type=text],#reglecouleurDiv input[type=text]{-moz-border-radius:5px;border:0;-moz-box-shadow:0 0 2px 1px '+GM_getValue('couleur1','#477073')+';}'+
'#search input[type=text]:focus,#reglecouleurDiv input[type=text]:focus{-moz-box-shadow:0 0 7px 3px '+GM_getValue('couleur1','#477073')+';}'+
'#reglecouleurDiv h3{margin: 0 0 -1px 0;}'+
'.menuu{overflow:hidden;width:220px;display:none;background:'+backGroundCo+';width:220px;margin:0;padding:3px 0 0 5px;border:'+borderCo+' solid 1px;}'+
'#lora * {-moz-outline:none;}'+
'#liste{margin:2px 0 0 0;list-style-type:none;}'+
'#lora h3:hover,.dosPersoOver{background:'+toRGBA(comparIver(ajouCoul(linkCo.hexToRgb(true),[+20,+120,0]),ajouCoul(linkCo.hexToRgb(true),[-20,-120,0])),0.7)+';color:'+ajouCoul(linkCo.hexToRgb(true),[+20,+120,0]).rgbToHex()+';}'+
'#lora a{color: '+linkCo+';font-size:0.9em;margin:0;display:block;padding:0 3px 0 23px;}'+
'#lora a:hover, #lora a:focus{background:'+toRGBA(comparIver(ajouCoul(linkCo.hexToRgb(true),[-20,0,-30]),ajouCoul(backGroundCo.hexToRgb(true),[-30,0,-60])),0.9)+' none repeat scroll 0 0;color:'+ajouCoul(linkCo.hexToRgb(true),[-20,0,-30]).rgbToHex()+';-moz-box-shadow:3px 0 6px 4px rgba(0,0,0,0.3), 182px -4px 12px 0px rgba(16, 136, 110,0.2) inset;}'+
'.jevp{display:none;}'+
'[class*=fermer] + *{display:none;}'+
'[class*=ouvert] + *{display:block;}'+
'.noSelect{-moz-user-select: none;}'+
'.suprFav{font-family:Comic Sans MS;float:left;height:17px;width:17px;border:none;background:rgba(150,13,30,0.2);z-index:50;-moz-border-radius:30px;}'+
'.suprFav:hover{background:#B00700;-moz-box-shadow:0 0 7px 3px #B00700;font-weight:bolder;}'+
'.suprFav:focus{border:none;background:#FF7420;}'+
'.bouton {-moz-user-select: none;text-align:center!important;cursor:pointer;background:#BDBDBD;-moz-border-radius:5px;padding:0 7px;border:solid 1px #4F4F4F;text-shadow:0 0 5px blue;color:white;}'+
'#lora .bouton:hover {background:#939393;border-color:black;}'+
'.couleur3{background:'+GM_getValue('couleur3','#273D3F')+' !important;}'+
'.couleur2{background:'+GM_getValue('couleur2','#335153')+' !important;}'+
'.couleur1{background:'+GM_getValue('couleur1','#477073')+' !important;}'+
'#couleur3{background-color:'+GM_getValue('couleur3','#273D3F')+';border-color:'+GM_getValue('couleur3','#273D3F')+';}'+
'#couleur2{background-color:'+GM_getValue('couleur2','#335153')+';border-color:'+GM_getValue('couleur2','#335153')+';}'+
'#couleur1{background-color:'+GM_getValue('couleur1','#477073')+';border-color:'+GM_getValue('couleur1','#477073')+';}'+
'[class*=couleur] td{background:transparent !important;}'+
'.laOptio{width: 50px;}'+
'.nombre{width: 30px;}'+
'.nombre:after{content:close-quote;}'+
'[class~=pointeur]{cursor:pointer}'+
'span[class~=pointeur]:hover{color:'+$$('.pun a')[0].getStyle('color')+';}'+
'.floatR{margin:0 15px 15px 0;float:right;}'+
'.floatL{margin:0 0 15px 15px;float:left;}'+
'#cop, #licimg{text-align:center;}'+
'#cop{text-align:center;margin:48px 0 0 0;}'+
'#reglageDiv, #reglageDiv2, #regFolder2{padding:5px;}'+
'#titeMise{text-align:center;font:2em bolder;margin: 0 0 32px 0;color:#306F7F;}'+
'#liste[qwiqview="true"] h3[class~=fermer2]:hover + *{display:block;opacity:0.6;}'+
'#masqueMiseJour{display:block;z-index:1000;width:100%;height:100%;position:fixed;background:black;opacity:0.9;top:0;left:0;}'+
'#cadreMiseJour{display:block;z-index:1001;width:400px;height:200px;position:fixed;margin-left:36%;background:#D7D7D7;text-align:center;top:'+parseInt(window.innerHeight/2-100)+'px;-moz-border-radius-bottomleft:54px 120px;-moz-border-radius-bottomright:54px 120px;-moz-border-radius-topleft:58px 41px;-moz-border-radius-topright:58px 41px;border:solid;border-width:6px 16px 1px 16px;-moz-border-left-colors:'+degRougeOrange+';-moz-border-top-colors:'+degRougeOrange+';-moz-border-right-colors:'+degRougeOrange+';-moz-border-bottom-colors:'+degRougeOrange+';-moz-background-clip:padding;}'+
'#zoneLienPerso[class~=dargant] a{outline:none;}';
//-moz-linear-gradient(360deg, white, rgba(0, 0, 0, 0.2) 75%) repeat scroll 0 0 transparent
GM_addStyle(css);
function comparIver (elemenBase, elemenChange){
	for (var i=0;i<2;i++)while (Math.abs(elemenBase[i]-elemenChange[i])<70){
		elemenChange[i]-=25;
		if(elemenChange[i]<0)elemenChange[i]=255+elemenChange[i];
	}
	return elemenChange;
}
function toRGBA (tablCou,opa){
	return "rgba("+tablCou[0]+','+tablCou[1]+','+tablCou[2]+','+opa+')'
}
function ajouCoul (tablCou,ajou){
	if (typeof ajou!='object'){
		var temp=ajou;
		ajou=[];
		ajou[0]=ajou[1]=ajou[2]=temp;
	}
	return [tablCou[0]+ajou[0],tablCou[1]+ajou[1],tablCou[2]+ajou[2]]
}


//Menu lien
var Mlien = new Element('div', {});
var lienSelct,divtitre3;


//fonction favoris
function actFavoris (){
	var conteur=0;
	zoneLienPerso.innerHTML=''
	for (var dossier in indexLien.obj)if(dossier){
		new Element('h3', {
			'class' :'fermer2 noSelect dosPerso',
			'text' : dossier,
			'id' : 'titrD'+conteur
		}).inject(zoneLienPerso);
		new Element('div', {'id':'drOp'+conteur,'class':'dospersolist'}).inject(zoneLienPerso);
		$('titrD'+conteur).addEventListener("click", function (e){ouverture(this,2,e);}, false);
		var inhtmlFav='';
		if (indexLien.obj[dossier])for (var i=0;i<indexLien.obj[dossier].length;i++){// pour chaque lien
			inhtmlFav+='<input type="button" class="suprFav" value="X" cible="'+indexLien.obj[dossier][i][1]+'">';
			inhtmlFav+='<a href="'+indexLien.obj[dossier][i][1]+'" draggable="true" id="list'+i+'">'+indexLien.obj[dossier][i][0]+'</a>';
		}
		$('drOp'+conteur).innerHTML=inhtmlFav;
		conteur++;
	}
	$$('#zoneLienPerso a').each(function(element){
		element.addEventListener("dragstart", dragStartList, false);// indispansable
		element.addEventListener("dragend", dragEndList, false); 
		element.setAttribute('draggable', 'true');
	});
	$$('.dosPerso').each(function(element){
		element.addEventListener("dragstart", dragStartTitre, false);// indispansable
		element.addEventListener("dragend", dragEndList, false); 
		element.setAttribute('draggable', 'true');
	});
	zoneLienPerso.addEventListener("dragover", dragOverList, false); // indispansable
	$$('.dosPerso').each(function(element){//titre
		element.addEventListener("dragover", dragOverList, false);
		element.addEventListener("dragenter", dragEnterTopList, false);
		element.addEventListener("drop", dragDropList, false);
	});
	zoneLienPerso.addEventListener("drop", dragDropList, false);// indispansable
	zoneLienPerso.addEventListener("dragleave", dragleasvList, false);// indispansable
	//suprLien
	$$('.suprFav').each(function(element){element.addEventListener("click", function (){indexLien.supreChaine(this.getAttributeNode("cible").value);$$(element.nextSibling,element).destroy();}, false);});
}

if (!accueil){
	$$('#brdfooter select optgroup').each(function(element){
		new Element('h3', {
			'class' :'fermer2 noSelect',
			'text' : element.label
		}).inject(Mlien);
		divtitre3=new Element('div', {});
		element.getElements('option ').each(function(element){
			lienSelct=new Element('a', {
				'text' : element.innerHTML,
				'href' :'viewforum.php?id='+element.value
			});
			lienSelct.inject(divtitre3);
		});

		divtitre3.inject(Mlien);
	});
}
else {//si pas dans forum, on créé les liens
	var siPasLienMenu='';
	for (var i=0;i<arrayPrinci.length;i++){
		siPasLienMenu+='<h3 class="fermer2 noSelect">'+arrayPrinci[i][0]+'</h3><div>';
		for (var b=1;b<arrayPrinci[i].length;b+=2){
			siPasLienMenu+='<a href="viewforum.php?id='+arrayPrinci[i][b+1]+'">'+arrayPrinci[i][b]+'</a>';
		}
		siPasLienMenu+='</div>';
	}
	Mlien.innerHTML+=siPasLienMenu;
}
if (!GM_getValue('footer',false))
$$('#brdfooter').destroy();

var idFor=-1;
if (window.location.pathname=="/viewforum.php")idFor= /viewforum\.php\?id=(\d+)/.exec(window.location)[1];
else if  (window.location.pathname=="/search.php"){//si on est dans recherche
	var tableFormuTrue=true;
	var tableFormuHREF=$$('[class~=tc2] a')
	for (var i=0;i<tableFormuHREF.length;i++){
		if (tableFormuHREF[0].href!=tableFormuHREF[i].href){
			tableFormuTrue=false;
			break;
		}
	}
	if (tableFormuTrue&&tableFormuHREF.length>0){
		idFor=/viewforum\.php\?id=(\d+)/.exec(tableFormuHREF[0].href)[1];
	}
}
var selectedTure='';
var rechercheSelect='';
for (var i=0;i<arrayPrinci.length;i++){
	rechercheSelect+='<optgroup label="'+arrayPrinci[i][0]+'">';
	for (var b=1;b<arrayPrinci[i].length;b+=2){
		rechercheSelect+='<option value="'+arrayPrinci[i][b+1]+'"';
		if (arrayPrinci[i][b+1]==idFor)rechercheSelect+='" selected="selected';//selection le groupe dans le quelle ont est
		rechercheSelect+='">'+ arrayPrinci[i][b]+'</option>';
	}
	rechercheSelect+='</optgroup>';
}


var Mrecherche='<form id="search"  method="get" action="search.php" onsubmit="if (this.rechercheee.value==\'Mots clés\')this.rechercheee.value=\'\';if (this.author.value==\'Auteur\')this.author.value=\'\';">'+
		'<input name="action" value="search" type="hidden">'+
		'<label class="padd">'+
			'<input class="conl padd" id="rechercheee" onfocus="if (this.value == \'Mots clés\') this.value=\'\';" onblur="if (this.value == \'\') this.value=\'Mots clés\';" value="Mots clés" name="keywords" size="30" maxlength="100" type="text"><br>'+
		'</label>'+
		'<label class="conl padd">'+
			'<input class="author padd" id="author" onfocus="if (this.value == \'Auteur\') this.value=\'\';" onblur="if (this.value == \'\') this.value=\'Auteur\';" value="Auteur" name="author" size="30" maxlength="25" type="text">'+
		'</label>'+
		'<label  class="conl padd" >'+
			'<select id="forum padd" class="padd" name="forum">'+
				'<option value="-1">Tous les forums</option>'+rechercheSelect+
			'</select>'+
		'</label>'+
		'<label class="conl padd">'+
			'<select class="search_in padd" name="search_in">'+
				'<option value="all">Message et sujet</option>'+
				'<option value="message">Message</option>'+
				'<option value="topic">Sujet</option>'+
			'</select>'+
		'</label>'+
		'<label class="conl padd">'+
			'<select class="padd" name="sort_by">'+
				'<option value="0">Date du message</option>'+
				'<option value="1">Auteur</option>'+
				'<option value="2">Sujet</option>'+
				'<option value="3">Forum</option>'+
			'</select>'+
		'</label>'+
		'<label class="conl padd">'+
			'<select class="padd"name="sort_dir">'+
				'<option value="DESC">Décroissant</option>'+
				'<option value="ASC">Croissant</option>'+
			'</select>'+
		'</label>'+
		'<label class="conl padd">'+
			'<select class="padd jevp"name="show_as">'+
				'<option value="topics">Discussions</option>'+
			'</select>'+
		'</label>'+
	'<p><input name="search" value="Envoyer" accesskey="s" class="bouton" type="submit"></p>'+
'</form>';

var lienActif ='<p id="titre1" class="m1 fermer1 noSelect" align="center">Lien</p><div id="liste" qwiqview="false"><div id="zoneLienPerso"></div><div id="zoneDossierImper">'+Mlien.innerHTML+'</div>';

//Menu principale creation
var Mprincipal='<h2 id="menn" class="noSelect" align="center">Menu</h2>'+lienActif+
'</div><p id="titre2" class="m1 fermer1 noSelect" align="center">Rechercher</p>'+Mrecherche;
var menup = document.createElement("div");
menup.id='lora';
document.body.appendChild(menup);
lora=$('lora')
lora.style.display=GM_getValue('loraDisplay','block')
lora.innerHTML+=Mprincipal;
var search = $("search");
var zoneLienPerso=$('zoneLienPerso');
actFavoris ();
if ($('titre'+GM_getValue('dossierParDef','Favoirs')))ouverture($('titre'+GM_getValue('dossierParDef','Favoirs')),2)

/*//news
if ($('announce')){
	var newsTitre = new Element('p', {
		'class': 'm1 fermer noSelect',
		'id' : 'news',
		'align': 'center',
		'text': 'News'
	});
	newsTitre.inject(lora);
	var newsTitrediv = new Element('div', {});
	var cumNews='';
	$$('#announce a').each(function(element){
	cumNews+=element.innerHTML;
	element.inject(newsTitrediv);
	});
	newsTitrediv.inject(lora); 
}*/

//reglage
var reglage = new Element('p', {
    'class': 'm1 fermer1 noSelect',
	'id' : 'reglage',
    'align': 'center',
	'text': 'Réglages'
});
reglage.inject(lora);
var reglecouleurDiv = new Element('div', {'id' : 'reglecouleurDiv'});
reglecouleurDiv.innerHTML='<h3 class="noSelect ouvert3" id="reglecouleur">Couleur</h3><div id="reglageDiv"><p>Entrez une couleur par champ de texte (ou un nombre entier), en hexadécimale ou en anglais. Effectuez vos changement, observez, et si cela vous plait sauvegardez.</p><br><label class="laOptio" for="couleur1">Couleur </label><input type="text" class="laOptio" id="couleur1" value="'+GM_getValue('couleur1','#477073')+'" name="zoneSaisi"><label class="laOptio" for="nobreCouleur1"> pour les </label><input type="text" class="laOptio nombre" name="zoneSaisi" id="nobreCouleur1" value="'+GM_getValue('nobreCouleur1',50)+'"><label class="laOptio" for="couleur2">Couleur </label><input type="text" class="laOptio" id="couleur2" value="'+GM_getValue('couleur2','#335153')+'" name="zoneSaisi" style="background-color: rgb(51, 81, 83); border-color: rgb(51, 81, 83);"><label class="laOptio" for="nobreCouleur2"> pour les </label><input type="text" class="laOptio nombre" name="zoneSaisi" id="nobreCouleur2" value="'+GM_getValue('nobreCouleur2',500)+'"><label class="laOptio" for="couleur3">Couleur </label><input type="text" class="laOptio" id="couleur3" name="zoneSaisi" value="'+GM_getValue('couleur3','#273D3F')+'"><label class="laOptio" for="nobreCouleur3"> pour les </label><input type="text" class="laOptio nombre" name="zoneSaisi" id="nobreCouleur3" value="'+GM_getValue('nobreCouleur3',1000)+'"><br><p>Les nombres correspondent aux derniers post écrits (et non aux nouveaux messages dans un vieux post). Pour désactiver cette option, remplacer les nombres par "0".<br><span id="saChang" class="bouton" style="background-color: rgb(147, 147, 147);">Sauvgardez</span></p></div><h3 class="noSelect fermer3" id="regFolder">Dossier</h3><div id="regFolder2"><span id="newFoB" class="bouton butonRigh">OK</span><input type="text" id="newFo" class="padd paddBut" onfocus="if (this.value == \'Nom du nouveau dossier\') this.value=\'\';" onblur="if (this.value == \'\') this.value=\'Nom du nouveau dossier\'"><label class="conl padd"></label><p>Suprimer le dossier :</p><select id="suprFlo" class="padd paddBut"><option value="Favoris">Favoris</option><option value="En plus">En plus</option><option value="Série">Série</option><option value="BD">BD</option></select><span class="bouton butonRigh" id="suprFloS">OK</span><label class="conl padd"></label><p>Dossier par défaut pour les marque pages :</p><select id="dosPerDef" class="padd paddBut"><option selected="selected" value="Favoris">Favoris</option><option value="En plus">En plus</option><option value="Série">Série</option><option value="BD">BD</option></select><span class="bouton butonRigh" id="dosPerDefS">OK</span></div><h3 class="fermer3 noSelect" id="regle2">Autres</h3><div id="reglageDiv2"><label for="lienBas">Afficher les liens de pub en bas de pages</label><input type="checkbox" id="lienBas" name="cheq"><br><label for="chexpb1">Afficher le cadre publicité</label><input type="checkbox" id="chexpb1" name="cheq"><br><label for="chexpb2">Afficher le poste publicité dans le forum</label><input type="checkbox" id="chexpb2" name="cheq"><br><label for="footer">Afficher le cadres en bas de page</label><input type="checkbox" id="footer" name="cheq"><br><label for="chexDesend">abaisser automatiquement l\'écran sous le logo</label><input type="checkbox" id="chexDesend" name="cheq"><br><label for="MasKautoLAB">Activer le masquage automatique de ce menu</label><input type="checkbox" id="MasKautoLAB" name="cheq"><br><label for="chexMiseJour">Activer la détéctions des mises à jours</label><input type="checkbox" id="chexMiseJour" name="cheq"><br><br><span id="saChang2" class="bouton">Sauvgardez</span></div>';
reglecouleurDiv.inject(lora);
actSelDoss();
$$('#couleur3,#couleur2,#couleur1').each(function(element){element.addEventListener("change", function (){changefoncCouleurRegl(this);}, false);});
function changefoncCouleurRegl(thi){
	GM_addStyle('.'+thi.id+'{background:'+thi.value+' !important;}}');
	$(thi.id).setStyles({'background-color': thi.value,'border-color': thi.value});
}
$('saChang2').addEventListener("click",function (){savGard('#reglageDiv2',this);} , false);
$('saChang').addEventListener("click", function (){savGard('#reglageDiv',this);}, false);
function savGard(select,ele){
	$$(select+' input').each(function(element){GM_setValue(element.id, (element.type=='checkbox')?element.checked:element.value)});
	$(ele.id).highlight('#FF8840');
}
$$('#nobreCouleur3,#nobreCouleur2,#nobreCouleur1').each(function(element){element.addEventListener("change", function (){changecouleNew(this);}, false);});
function changecouleNew(thi){
	if (isNaN(thi.value)){
				thi.style.backgroundColor='red';
				thi.value='';
			}
			else {
				thi.style.backgroundColor='#FFF';
				couleurNouvautez ($('nobreCouleur1').value,$('nobreCouleur2').value,$('nobreCouleur3').value,3);
			}
}
$$('#reglageDiv2 input[type=checkbox]').each(function(item,index){
	if (index<4)item.checked=GM_getValue(item.id,false);
	else item.checked=GM_getValue(item.id,true);
});
$('suprFloS').addEventListener("click", function (){indexLien.suprDossier($('suprFlo').value);actFavoris();actSelDoss();$('suprFloS').highlight('#FF8840');}, false);
$('dosPerDefS').addEventListener("click", function (){GM_setValue('dossierParDef',$('dosPerDef').value);$('dosPerDefS').highlight('#FF8840');}, false);
$('newFoB').addEventListener("click", function (){nouvDossier();actFavoris();}, false);
function dossierSelect (favoris){
	var regDosiierHTml='';
	for (var i in indexLien.obj){
		regDosiierHTml+='<option value="'+i+'"'+((favoris&&GM_getValue('dossierParDef','Favoirs')==i)?' selected="selected"':'')+'>'+i+'</option>';
	}
	return regDosiierHTml;
}
$('newFo').addEventListener("keypress", function (e){if (e.which==13)nouvDossier();}, false);
$('newFo').value='Nom du nouveau dossier';
function nouvDossier (){
		if ($('newFo').value=='Nom du nouveau dossier'||$('newFo').value==''){$('newFo').highlight('#FF0000');return}
		indexLien.ajoutDossier($('newFo').value);
		actFavoris();
		$('newFo').value='';
		$('newFoB').highlight('#FF8840');
		$('titre1').highlight('#FF8840');
		actSelDoss();
}
function actSelDoss(){
	$('suprFlo').innerHTML=dossierSelect();
	$('dosPerDef').innerHTML=dossierSelect(true);
}
//listener
//ouverture fermeture du menu
$$('.m1').each(function(element){element.addEventListener("click", function (){ouverture(this,1);}, false);});
$$('.bouton').each(function(element){});
$$('#reglecouleurDiv h3').each(function(element){element.addEventListener("click", function (){ouverture(this,3);}, false);});
$$('#zoneDossierImper h3').each(function(element){element.addEventListener("click", function (e){ouverture(this,2,e);}, false);});
window.addEventListener("focus",function(e){if (e.target==e.currentTarget&&GM_getValue('indexLien')!=indexLien.chaineTotal){indexLien.actuChaine();actFavoris();}},true);

function ouverture(element,profondeur,e){//fermer ouvert
	if (e&&e.ctrlKey){//ouvre tous les liens
		var listeliensuiv=element.nextSibling.getElementsByTagName('a')
		for (var i=0;i<listeliensuiv.length;i++){
			window.open(listeliensuiv[i].href,listeliensuiv[i].innerHTML,'');
		}
	}
	else if (element.classList.contains('ouvert'+profondeur)){//si déja ouvert
		$$('[class~=ouvert'+profondeur+']').each(function(lesOuvert){
			lesOuvert.classList.add('fermer'+profondeur);
			lesOuvert.classList.remove('ouvert'+profondeur);
		});
	}
	else {//si ferme, on ouvre
		$$('[class~=ouvert'+profondeur+']').each(function(lesOuvert){
			lesOuvert.classList.add('fermer'+profondeur);//on ferme tous
			lesOuvert.classList.remove('ouvert'+profondeur);// on enleve atribu ouver
		});
		element.classList.add('ouvert'+profondeur);
		element.classList.remove('fermer'+profondeur);
	}
}

//copie la selection dans la recherche
document.addEventListener("mouseup", getSelection, false);
function getSelection(e){
	var select=window.getSelection()
	if (select.isCollapsed||select.toString()=="")return;//si selection vide
	if (e.target.classList.contains("byuser"))$('author').value=e.target.innerHTML.substring(9)
	else if (e.target.nodeName=='A'&&e.target.href.indexOf('/profile.php?id=')>-1)$('author').value=e.target.innerHTML;//lien ver page du psedo
	else $('rechercheee').value=select.toString();
}


//aplique un style diferent pour les nouveau postes.
var postee;// tableuTR=[];
var plusHaut=GM_getValue('valeurPoste',300000);
var prochainplusAut=plusHaut;
couleurNouvautez (GM_getValue('nobreCouleur1',50),GM_getValue('nobreCouleur2',500),GM_getValue('nobreCouleur3',1000),false);
function couleurNouvautez (c1,c2,c3,reg){
	if(c1==0&&c2==0&&c3==0) return
	else $$('#vf strong > a').each(function(element){
		postee=/\d+$/.exec(element.href)
		var lesCopainTd=element.getParent('.inew')
		if (reg)lesCopainTd.removeClass('couleur'+reg)
		if (c1!=0&&postee>=(plusHaut-c1)){
			lesCopainTd.addClass('couleur1');
			prochainplusAut=Math.max(prochainplusAut,postee)
		}
		else if (c2!=0&&postee>(plusHaut-c2)){
			lesCopainTd.addClass('couleur2');
		}
		else if (c3!=0&&postee>(plusHaut-c3)){
			lesCopainTd.addClass('couleur3');
		}
		GM_setValue('valeurPoste',prochainplusAut);

	});
}

//mise a jour
if (((new Date().getTime() - GM_getValue('checked', 0) >= 86400000)||GM_getValue('vresPass', false))&&GM_getValue('chexMiseJour', true)){//86400000ms = 1 jours  ((new Date().getTime() - GM_getValue('checked', 0) >= 86400000)||GM_getValue('vresPass', false))&&GM_getValue('chexMiseJour', true)
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/62057.meta.js',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
		},
		onload: function(responseDetails) {
			var vertion=/@version\s+(\d+\.\d+)/i.exec(responseDetails.responseText)
			if (parseFloat(vertion[1])>0.05){//vertion du script actuel
				var masqueMiseJour=document.createElement('div');
				masqueMiseJour.id='masqueMiseJour';
				document.body.appendChild(masqueMiseJour)
				masqueMiseJour=document.createElement('div');
				masqueMiseJour.id='cadreMiseJour';
				masqueMiseJour.innerHTML='<p id="titeMise" class="noSelect">Mise à jour '+vertion[1]+' disponible</p><input type="button" id="instaleNow" value="Installer maintenant" class="floatL"><input type="button" id="pageScript" value="Afficher la page du script" class="floatR"><input type="button" id="instaleLatter" value="Me le rapeller plus tard" class="floatL"><input type="button" id="instaleNever" value="Ne plus jamais me le rapeller" class="floatR"><br><p id="cop" class="noSelect">Script wawa mania conçut par 86245 sous licence Creative Commons.</p><img id="licimg" alt="licence Creative Commons Paternité-Pas d\'Utilisation Commerciale 2.0 France" src="http://i.creativecommons.org/l/by-nc/2.0/fr/88x31.png">'
				document.body.appendChild(masqueMiseJour)
				$('instaleNow').addEventListener("click", function (){finMiseJour();GM_setValue('vresPass', false);window.location='http://userscripts.org/scripts/source/62057.user.js';}, false);
				$('pageScript').addEventListener("click", function (){finMiseJour();window.open('http://userscripts.org/scripts/show/62057','misJour');}, false);
				$('instaleLatter').addEventListener("click", function (){finMiseJour();GM_setValue('vresPass', true);}, false);
				$('instaleNever').addEventListener("click", function (){finMiseJour();GM_setValue('chexMiseJour', false);}, false);
			}
			else {
				GM_setValue('vresPass', false)
				GM_setValue('checked', new Date().getTime() + '')
			}
		}
	});
}


//racourci 39 = doirte; 40 = bas; haut = 38; gauche = 37
 var ctrlKey=false;
 function toucheApui (e){
	if(e.which==17)ctrlKey=true;
	if(e.shiftKey){
		$('liste').setProperty('qwiqview',true);
	}
	if (!accueil&&e.shiftKey&&(e.which==68||e.which==83))favoris();//shtif + d
	if (e.shiftKey&&e.which==65)loraMask();//shtif + d
	//if (ctrlKey&&(e.which==39||e.which==40))alert('suivant')//ctrl droit ho
	//if (ctrlKey&&(e.which==37||e.which==38))alert('Précédent')//ctrl gauche bas
	//alert(e.which)
}

function loraMask (){
	if (lora.style.display=='none'){
		lora.style.display='block';
		GM_setValue('loraDisplay','block')
	}
	else {
		lora.style.display='none';
		GM_setValue('loraDisplay','none')
	}
}

function toucheRelach (e){
	if(e.which==17)ctrlKey=false;
	if(!e.shiftKey){
		$('liste').setProperty('qwiqview',false);
	}
}
function toucheRelach2 (){
	ctrlKey=false;
	$('liste').setProperty('qwiqview',false);
}
activeEvent (true)
window.addEventListener("blur", toucheRelach2, true);
function activeEvent(forFocus){
	if (forFocus){
		document.addEventListener("keydown", toucheApui, true);//alt active
		document.addEventListener("keyup", toucheRelach, true);//alt desactive
	}
	else {
		document.removeEventListener("keydown", toucheApui, true);//alt active
		document.removeEventListener("keyup", toucheRelach, true);//alt desactive
	}
}

var textear=$$('textarea','[type=text]');
for (var h=0;h<textear.length;h++){
	textear[h].addEventListener("focus",function (){activeEvent(false);} , true);
	textear[h].addEventListener("blur",function (){activeEvent(true);} , true);
	
}

function favoris (){//actFavoris
	var locaUrl=window.location.pathname+window.location.search
	if (window.location.hash&&confirm('Voulez vous concerver l\'ancre : "'+window.location.hash+'" dans votre favoris\n Une ancre mémorise une pausition dans la page.\nSi vous ne comprenez pas la question, cliquer sur "Annuler" (cela enregistrera tout de même votre lien.')){
		locaUrl+=window.location.hash
	}
	if ($$('.linkst').length>0){//recuper le titre de la page
		var titrePage=$$('.linkst li')[$$('.linkst li').length-1].innerHTML;
		titrePage=titrePage.substring(titrePage.indexOf('»')+7);
	}
	else var titrePage=prompt('Ecriver le non du favori');
	if (indexLien.supreChaine(locaUrl,true)){alert('Le lien existe déjà');return;}
	indexLien.ajoutChaine(titrePage,locaUrl,GM_getValue('dossierParDef','Favoirs'))
	actFavoris();
	$('suprFlo').innerHTML=dossierSelect();
	$('titre1').highlight('#4B2641');
}

//agrandire les lien nouvelle discution
var cibleHref;
$$('li[class*=post],p.postlink').each(function(item){
	if (item.getElement('a'))cibleHref="window.location='"+item.getElement('a').href+"'";
	item.addClass("pointeur");
	item.setProperty('onClick', cibleHref);
}); 
var nomUser;
$$('.byuser').each(function(item){
	nomUser ='document.forms["formName"].pseudo_search.value=\''+encodeURIComponent(item.innerHTML.substring(9))+'\';document.forms["formName"].submit();';
	item.setProperty('onClick', nomUser);
	item.addClass("pointeur");

});

var formName=new Element('form', {
	'action' : 'userlistsearch.php',
	'name' : 'formName',
	'method' : 'post',
	'id' : 'formName',
	'styles': {
		'display': 'none'
	}
});
var formNameInput=new Element('input', {
	'type' : 'text',
	'name' : 'pseudo_search'
});
formNameInput.inject(formName);
formName.inject(document.body);

function finMiseJour(){
	var myEffects = new Fx.Morph($('cadreMiseJour'), {duration: 2000,	onComplete: function(el){el.destroy();}});
	myEffects.start({'opacity': 0});
	var myEffects2 = new Fx.Morph($('masqueMiseJour'), {duration: 2000,	onComplete: function(el){el.destroy();}});
	myEffects2.start({'opacity': 0});
}

var trucQuiBouge=$('menn');
document.addEventListener("dragover", dragOver, false); // indispansable
document.addEventListener("dragenter", dragEnter, false);
document.addEventListener("drop", dragDrop, false);// indispansable
trucQuiBouge.addEventListener("dragstart", dragStart, false);// indispansable
trucQuiBouge.setAttribute('draggable', 'true');
var loraX,loraY;
function dragStart(ev) {
	ev.dataTransfer.effectAllowed='move';// sepcifie move copy... et le curseur qui va avec
	ev.dataTransfer.setData("Text", ev.target.id);//tensfere des info si largage valide
	loraX=ev.layerX;
	loraY=ev.layerY;
    return true;
}

function dragEnter(ev) {// quand le trucQuiBouge ENTRE dans une zone
	if (ev.dataTransfer.getData("Text")=='menn'){
		lora.style.top='-2000px';
		lora.style.bottom='80000px';
		return;
	}
}

function dragOver(ev) {// quand le trucQuiBouge SORT dans une zone
	if (ev.dataTransfer.getData("Text")=='menn')ev.preventDefault();// definie cone une zone de largage valide.
}


function dragDrop(ev) {// quand le trucQuiBouge est LACHER dans une zone valide
	var cursorX=(ev.clientX-loraX), cursorY=(ev.clientY-loraY),loraH,loraW;
	if (cursorX<window.innerWidth/2){//si moitier gauche
		loraW='left';
		lora.setStyle('right','auto');
	}
	else{ //si moitier droite
		loraW='right';
		lora.setStyle('left','auto');
		cursorX=window.innerWidth-cursorX-lora.offsetWidth-16;
	}
	if (cursorY<window.innerHeight/2){//si moitier haute
		loraH='top';
		lora.setStyle('bottom','auto');
	}
	else{
		loraH='bottom';
		lora.setStyle('top','auto');
		cursorY=window.innerHeight-cursorY-lora.offsetHeight;
	}
	if (!isNaN(cursorX)&&!isNaN(cursorY)){//plantage si pas nombre
		lora.setStyle(loraW,cursorX);
		lora.setStyle(loraH,cursorY);
		GM_setValue('loraW',loraW+':'+cursorX+'px;');
		GM_setValue('loraH',loraH+':'+cursorY+'px;');
		ev.stopPropagation();// empeche le changement de page.
	}
    return;
}



var drager;
function dragStartList(ev) {
	zoneLienPerso.classList.add('dargant');
    ev.dataTransfer.effectAllowed='move';// sepcifie move copy... et le curseur qui va avec
    ev.dataTransfer.setData("Text", ev.target.id);//tensfere des info si largage valide
	ev.dataTransfer.mozSetDataAt("application/x-moz-node", ev.target,0);
	ev.dataTransfer.mozSetDataAt("application/x-moz-node", ev.target.previousSibling,1);
	drager=ev.target;
    return true;
}
function dragStartTitre(ev) {
	$$('[class~=ouvert2]').each(function(lesOuvert){
		lesOuvert.classList.add('fermer2');
		lesOuvert.classList.remove('ouvert2');
	});
    ev.dataTransfer.effectAllowed='move';// sepcifie move copy... et le curseur qui va avec
    ev.dataTransfer.setData("Text", ev.target.id);//tensfere des info si largage valide
	ev.dataTransfer.mozSetDataAt("application/x-moz-node", ev.target,0);
	ev.dataTransfer.mozSetDataAt("application/x-moz-node", ev.target.nextSibling,1);
	drager=ev.target;
    return true;
}

function dragEnterTopList(ev) {// quand le trucQuiBouge ENTRE dans une zone
	this.classList.add('dosPersoOver');
	if(ev.dataTransfer.mozGetDataAt("application/x-moz-node",0).nodeName=='A')this.classList.add('ouvert2');
}

function dragOverList(ev) {
	if (ev.dataTransfer.mozGetDataAt("application/x-moz-node",0).nodeName=='A')ev.preventDefault();// definie cone une zone de largage valide.
	else if (ev.dataTransfer.mozGetDataAt("application/x-moz-node",0).nodeName=='H3')ev.preventDefault();// definie cone une zone de largage valide.
}
function getTop(o){if(o.offsetParent&&o.tagName!='BODY'){return(o.offsetTop+getTop(o.offsetParent));}else return o.offsetTop;}

function dragEndList(ev) {// quand le trucQuiBouge est LACHER, que se soit dans une zone valide ou non
	if (document.querySelector('.dosPersoOver'))document.querySelector('.dosPersoOver').classList.remove('dosPersoOver');
	zoneLienPerso.classList.remove('dargant');
}
function dragleasvList(ev) {// quand le trucQuiBouge est LACHER, que se soit dans une zone valide ou non
	if (document.querySelector('.dosPersoOver'))document.querySelector('.dosPersoOver').classList.remove('dosPersoOver');
}

function dragDropList(ev) {// quand le trucQuiBouge est LACHER dans une zone valide
	ev.stopPropagation();
	if (ev.dataTransfer.mozGetDataAt("application/x-moz-node",0).nodeName=='A')//si on bouge un line
	var lienDeuusou=(ev.target.nodeName=='INPUT'||ev.target.nodeName=='H3')?ev.target.nextSibling:ev.target;
	else //si on bouge un dossier
	var lienDeuusou=(ev.target.nodeName=='INPUT'||ev.target.nodeName=='A')?ev.target.parentNode.previousSibling:ev.target;
	if (lienDeuusou==ev.dataTransfer.mozGetDataAt("application/x-moz-node",0))return;
	if (this.classList.contains("dosPerso")&&ev.dataTransfer.mozGetDataAt("application/x-moz-node",0).nodeName=='A'){//si c'est un lien balancer sur un dossier
		this.nextSibling.appendChild(ev.dataTransfer.mozGetDataAt("application/x-moz-node",1));//invertion sino bug
		this.nextSibling.appendChild(ev.dataTransfer.mozGetDataAt("application/x-moz-node",0));
	}
	else if (ev.clientY >getTop(lienDeuusou)+lienDeuusou.offsetHeight/2){//bas
		if (ev.dataTransfer.mozGetDataAt("application/x-moz-node",0).nodeName=='H3'){//on 
			insertAfter(ev.dataTransfer.mozGetDataAt("application/x-moz-node",1),lienDeuusou.nextSibling)
			insertAfter(ev.dataTransfer.mozGetDataAt("application/x-moz-node",0),lienDeuusou.nextSibling)
		}
		else {
			insertAfter(ev.dataTransfer.mozGetDataAt("application/x-moz-node",0),lienDeuusou)
			insertAfter(ev.dataTransfer.mozGetDataAt("application/x-moz-node",1),lienDeuusou)
		}
	}
	else{//haut
		lienDeuusou.parentNode.insertBefore(ev.dataTransfer.mozGetDataAt("application/x-moz-node",0),lienDeuusou);
		lienDeuusou.parentNode.insertBefore(ev.dataTransfer.mozGetDataAt("application/x-moz-node",1),lienDeuusou);
	}
	indexLien.changePlace();
	
}

function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastchild == targetElement) parent.appendChild(newElement); 
	else parent.insertBefore(newElement, targetElement.nextSibling);
}
