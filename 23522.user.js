// ==UserScript==
// @name           Kronos Utils
// @autor          Merwin
// @email          merwinkronos@gmail.com
// @namespace      Kronos
// @description    Divers petits utilitaires.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/
// ==/UserScript==
/*-------------------------------------
Propriétés du script
--------------------------------------*/
var DEBUT=new Date();
var url=document.URL;
var name='KronosLanguage';
var myLanguage = GM_getValue(name+"_","");
if(myLanguage=='') myLanguage='en';

var url=document.URL;//on récupére l'url du site.

if(/fr/.test(url))//en fonction de l'url on prend les regex(dépend de la langue du site).
	var regex=new Array(
		new RegExp(/Terrain|construire/),
		new RegExp(/J/),
		new RegExp(/h/),
		new RegExp(/m/),
		new RegExp(/s/));
	
else if(/org/.test(url))
	var regex=new Array(
		new RegExp(/Free|build/),
		new RegExp(/D/),
		new RegExp(/h/),
		new RegExp(/m/),
		new RegExp(/s/));
else
	var regex=new Array(
		new RegExp(/Terrain|construire/),
		new RegExp(/J/),
		new RegExp(/h/),
		new RegExp(/m/),
		new RegExp(/s/));

//En fonction du language du naviguateur on va utiliser un langage associé.
switch(myLanguage){
	case 'fr':
	var lang=new Array(
		' Fini à ',
		'Fermer',
		'Upgrader plus tard.',
		'File de construction',
		'Ajouter un bâtiment.',
		'Construire dans',
		'heures','minutes et',
		'secondes',
		'valider',
		'Langue utilisée :',
		'Temps d\'exécution',
		'Pas de bâtiment en attente.',
		'Bois',
		'Luxe');
	break;
	
	case 'en':
	var lang=new Array(
	' Finish at ',
	'Close',
	'Upgrade later.',
	'Building list',
	'Add building.',
	'Build at',
	'hours',
	'minutes and',
	'seconds',
	'confirm',
	'Language used :',
	'Time of execution',
	'No building in waiting.',
	'Wood',
	'Luxe');
	break;
        case 'pt'://Thank to Tico
var lang=new Array(
' acaba às ',
'Fechar',
'Evoluir mais tarde.',
'Lista de construção',
'Adicionar edificio.',
'Construir em',
'horas',
'minutos e',
'segundos',
'confirmar',
'Lingua usada :',
'Tempo de execução',
'Nenhum Edificio em espera.',
'Madeira',
'Luxo');
break;
case 'da':
var lang=new Array(
' Færdig kl. ',
'Luk',
'Opgrader senere.',
'Bygnings liste',
'Tilføj bygning.',
'Byg kl.',
'timer',
'minutter og',
'sekunder',
'bekræft',
'Sprog brugt :',
'Udførelsestid',
'Ingen bygning venter.',
'Træ',
'Luxe');
break; 
	/*
        case 'sp'://Thank to A.Rosemary
        var lang=new Array(
        ' termina a las ',
        'Cerrar',
        'Actualizar más tarde.',
        'Lista de construcción',
        'Añadir edificio.',
        'Construir en',
        'horas',
        'minutos y',
        'segundos',
        'confirmar',
        'Idioma usado :',
        'Tiempo de ejecución');
        break;
	*/
	default:
	var lang=new Array(
	' Fini à ',
	'Fermer',
	'Upgrader plus tard.',
	'File de construction',
	'Ajouter un bâtiment.',
	'Construire dans',
	'heures',
	'minutes et',
	'secondes',
	'valider',
	'Langue utilisée :',
	'Temps d\'exécution',
	'Pas de bâtiment en attente.',
	'Bois',
	'Luxe');
	break;
}



var autor='Kronos(Merwin)';
var name='Kronos';
var version=' 0.3a';
/*-------------------------------------
Création de div, br, link etc...
-------------------------------------*/
function urlBase()
{
	var href= location.href;
	var arret= href.indexOf('?');
	if(arret!=-1)
		href=href.substr(0,arret);
	return href;
}
function valueRecupJS(nameValue){
	if(document.getElementById('cityResources').getElementsByTagName('script')[0]){
	 var text=document.getElementById('cityResources').getElementsByTagName('script')[0].innerHTML;
	 text=text.substr(text.indexOf(nameValue+' = '), text.length);
	 text=text.substr(nameValue.length+3,text.indexOf(';')-(nameValue.length+3));
	 return text;
	}
}
function recupNameRess(){
	if(document.getElementById('cityResources').getElementsByTagName('script')[0]){
		var _a=document.getElementById('cityResources');
		var text=_a.getElementsByTagName('script')[0].innerHTML;
		text=text.substr(text.indexOf('currTradegood'),text.length);
		text=text.substr(text.indexOf('value_'),text.indexOf('.innerHTML')-text.indexOf('value_')-2);
		for(var i = 0; i < _a.getElementsByTagName('li').length; i++){
			var _b=_a.getElementsByTagName('li')[i].getElementsByTagName('span');
			if(_b[1].id==text){
				return _b[0].innerHTML;
			}
		}
	}
}
function urlParse(url,param)//on récupére une des valeurs get d'une url(son nom est le param.
{
	var chaine=url;//On récupére l'url du site.
	
	chaine=chaine.substring(1);
	var dz=chaine.indexOf("#",0);
	if(dz!=-1) {
	chaine=chaine.substring(0,dz);}
	chaine=chaine+"&";
	if(chaine.indexOf(param,0)!=-1){
	var pos=chaine.indexOf(param,0);
	var pos2=chaine.indexOf("=",pos);
	var pos3=chaine.indexOf("&",pos);
	contenu=chaine.substring(pos2+1,pos3);}
	return contenu;
}

function ajoutCSS(css,parent)
{
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	parent.appendChild(style);
	return style;
}
function createDiv(id,classN,html)// On ajoute un div 
{
	var body, div;// on initialise les variables body et div
	div = document.createElement('div');//on crée le div
	div.id = id;//on lui ajoute l'id
	div.className = classN;//le class
	
	div.appendChild(document.createTextNode(html));//on lui ajoute du texte
	
	//parent.appendChild(div);//et on l'ajoute au parent.
	
	return div;
}
function createLink(nom,href)
{
	var lien=document.createElement('a');//création d'un lien
	lien.setAttribute('href', href);//On ajoute le href
	lien.appendChild(document.createTextNode(nom));//On ajoute le text.
	
	return lien;
}
function link(href)
{
	location.href=href;
}
function createInput(name,type,size,value,id)//fonction de création input
{
	var input= document.createElement('input');
	input.setAttribute('name',name);
	input.setAttribute('type',type);
	if(size != '') input.setAttribute('size',size);
	if(value != '') input.setAttribute('value',value);
	input.setAttribute('id',id);
	return input;
}
function createBr()//fonction de création saut de ligne
{
	return document.createElement('br');
}
function levelBat()// Ajout d'un du level sur les batiments.
{

	var css = '.pointsLevelBat{' +
		'background-color:#FDF8C1;' + 
		'-moz-border-radius: 1em;' +
		'border: 2px solid #918B69;'+
		'border-radius: 1em;' +
		'font-family: Sylfaen, "Times New Roman", sans-serif;' +
		'font-size:12px;' +
		'font-weight:bold;' +
		'text-align:center;' +
		'position:absolute;' +
		'width:18px;' +
		'cursor: pointer;'+
		'height:15px;' +
		'visibility: visible;' +
		'margin-top: 10px;'+
		'margin-left: 25px;'+
		'z-index:50;}';
	var style=ajoutCSS(css,document.getElementById('Kronos'));
	var divContent=document.getElementById('locations');
	if(divContent)
	{
	var href,node,title;
		for(var i = 0; i < 15; i++)
		{
			node=document.getElementById('position'+i).getElementsByTagName('a')[0];
			title = node.title;
			href=node.href;
			if(!(regex[0].test(title)))
			{
				var num = /[0-9]*$/.exec(title);
				var href=node.href;
				div=createDiv('pointLevelBat' + i,'pointsLevelBat',num);
				document.getElementById('position'+i).appendChild(div);
				div.setAttribute('lien', href);
				div.addEventListener('click', function(){window.location.href = this.getAttribute('lien');},true);
				//document.getElementById('Kronos').appendChild(document.createTextNode(href));
				div.style.visibility = "visible";
				div.title = node.title;
			}
		}
	}
}
/*--------------------------------------------------------
Création des fonctions de temps.
---------------------------------------------------------*/
function mktimeMini(Tdays,Thours,Tminuts,Tseconds)//Transforme des variables en temps
{
	var Temps = (Tdays * 86400 + Thours*3600 + Tminuts * 60+ Tseconds*1);
	return Temps;
}
function setTextTime(temps)// Crée le temps de fin.
{
	var Temps = new Date();
	Temps.setTime(Temps.getTime() + temps*1000);
	if(Temps.getMinutes()<10)var Tminuts= '0'+Temps.getMinutes();
	else var Tminuts= Temps.getMinutes();
	if(Temps.getHours()<10)var Thours= '0'+Temps.getHours();
	else var Thours= Temps.getHours();
	if(Temps.getSeconds()<10)var Tseconds= '0'+Temps.getSeconds();
	else var Tseconds= Temps.getSeconds();
	var Temps = lang[0]+Thours+':'+Tminuts+':'+Tseconds;
	return Temps;
}
function secondsToHours(bySeconds){
	if(!isNaN(bySeconds)){
		var byHour=Math.ceil(bySeconds*3600);
		return byHour;
	}
}

function constructionTempsFin()//Ajoute le temps de fin de construction des bâtiments.
{
	if(document.getElementById('cityCountdown'))
	{
		var remix= document.getElementById('cityCountdown').innerHTML;
		var sauv=remix;
		remix = remix.replace(regex[1],'');
		remix = remix.replace(regex[2],'');
		remix = remix.replace(regex[3],'');
		remix = remix.replace(regex[4],'');
		var regexp=/ /;
		var tableau=remix.split(regexp);
		var tempsFin = 0;
		if(regex[1].test(sauv) && regex[2].test(sauv)) tempsFin= mktimeMini(tableau[0],tableau[1],0,0);
		else if(regex[2].test(sauv) && regex[3].test(sauv)) tempsFin= mktimeMini(0,tableau[0],tableau[1],0);
		else if(regex[3].test(sauv) && regex[4].test(sauv)) tempsFin= mktimeMini(0,0,tableau[0],tableau[1]);
		else if(regex[1].test(sauv)) tempsFin= mktimeMini(tableau[0],0,0,0);
		else if(regex[2].test(sauv)) tempsFin= mktimeMini(0,tableau[0],0,0);
		else if(regex[3].test(sauv)) tempsFin= mktimeMini(0,0,tableau[0],0);
		else if(regex[4].test(sauv)) tempsFin= mktimeMini(0,0,0,tableau[0]);
		TempsFin2 = setTextTime(tempsFin);
		var test = document.createElement('div');
		test.className='timetofinish';
		var middle = document.createElement('span');
		middle.className='middle';
		var text = document.createTextNode(TempsFin2)
		middle.appendChild(text);
		var after = document.createElement('span');
		after.className='after';

		for(var i = 0; i<15;i++)
		{
			var parent = document.getElementById('position'+i);
			var nbDiv=parent.getElementsByTagName('div');
			if(nbDiv.length > 1)
			{
				if(parent.getElementsByTagName('div')[0].className=='constructionSite')
				{
					parent=parent.getElementsByTagName('div')[1];
					parent.removeChild(parent.getElementsByTagName('span')[3]);
					parent.appendChild(middle);
					parent.appendChild(after);
				}
			}
		}
	}
}
/*---------------------
Ajout du panel dans le menu
---------------------*/
function panelInfo()//Ajoute un element en plus dans le menu.
{
	var panel= document.createElement('div');
	panel.setAttribute('class', 'dynamic');
	var titre=document.createElement('h3');
	titre.setAttribute('class', 'header');
	titre.appendChild(document.createTextNode(name+version));
	var corps=document.createElement('div');
	corps.setAttribute('class','content');
	corps.setAttribute('id','Kronos');
	var footer=document.createElement('div');
	footer.setAttribute('class','footer');
	var script=document.createElement('script');
	script.setAttribute('type','text/css');
	script.appendChild(document.createTextNode('#Kronos{font-align:center;}'));
	panel.appendChild(script);
	
	var saut= document.createElement('br');
	panel.appendChild(titre);
	panel.appendChild(corps);
	panel.appendChild(footer);
	if(document.getElementById('container2'))
	{
	document.getElementById('container2').insertBefore(panel, document.getElementById('mainview'));
	}

}
function options()
{
	var div=createElement('div');
}

function idIleRecup()
{
	//récupération de l'id de la ville :
	if(document.getElementById('cityNav'))
	{
		var text=document.getElementById('cityNav').innerHTML;
		var debut=text.indexOf('view=island&amp;id=');
		if(debut!=-1)
		{
			var fin=text.length;
			text=text.substr(debut,fin);

			var fin=text.indexOf('" tabindex');
			var href=text.substr(19,fin-19);
		}
		else
			var href;
		return href;
	}
}
/*------------------------
   /\
/  !   \    Function Principal.
------
------------------------*/
function principal()
{
	recupNameRess();
	var luxeByHours=secondsToHours(valueRecupJS('startTradegoodDelta'));
	var woodByHours=secondsToHours(valueRecupJS('startResourcesDelta'));
	var nameLuxe=recupNameRess();
	panelInfo();
	var chemin=document.getElementById('Kronos');
	var idIle=idIleRecup();
	var base=urlBase();
	constructionTempsFin();
	levelBat();



	var list=document.createElement('div');//List des batiments.
	list.appendChild(createLink(lang[13]+': +'+woodByHours+'',base+'?view=resource&type=resource&id='+idIle));
	list.appendChild(createBr());
	list.appendChild(createLink(nameLuxe+' +'+luxeByHours+'',base+'?view=tradegood&type=tradegood&id='+idIle));
	chemin.appendChild(list);
	
	var script = document.createElement('style');
	script.setAttribute('type','text/css');
	script.appendChild(document.createTextNode('\n.popup\n{\nz-index: 1000;\nposition: absolute;\ntop: 30%;\nleft: 35%;\nwidth: 400px;\nheight: 250px;\nbackground-color: #DBB562;\nborder: 3px solid #CE9928;\n}'));
	chemin.appendChild(script);// On inscrit les styles dans le script
	chemin.appendChild(document.createTextNode(lang[10]+' '+navigator.language));
	var FIN=new Date();
	
	chemin.appendChild(createBr());
	chemin.appendChild(document.createTextNode(lang[11]+' : '+(FIN-DEBUT)+'ms'));
	//document.getElementById('Kronos').appendChild(document.createTextNode(myLanguage));
}
principal();//Appel de la fonction principal.









/********************
GreaseMonkey Settings :
********************/
GM_registerMenuCommand("Ikariam Kronos Tools: Your language", promptLanguage);
function promptLanguage()
{
	var name='KronosLanguage';
	var myLanguage = GM_getValue(name+"_","");
	var newLanguage = false;
	while(newLanguage!='fr' && newLanguage!='en' && newLanguage!='pt' && newLanguage!='da')
	{
	var newLanguage = prompt("Ikariam Kronos Tools :\n What language do you speak?\n(fr:French; en:English; pt: Portuguese) \nLanguage: " +myLanguage);
		if(newLanguage=='fr' || newLanguage=='en' || newLanguage=='pt' || newLanguage=='da')
		{
			GM_setValue(name+"_",newLanguage);
			break;
		}
	}
}