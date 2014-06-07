// ==UserScript==
// @name           allotracker script
// @author         86245
// @version        0.07
// @include        http://allotracker.com/*
// @include        http://www.allotracker.com/*
// @include        https://allotracker.com/*
// @include        https://www.allotracker.com/*
// @require		   http://userscripts.org/scripts/source/44063.user.js
// ==/UserScript==

//déclaration de variable
var conPlance;


//css
if (GM_getValue('opNewCo',false)){
	var autreCouleurNews='.ttable_headinner tr+tr[class~=new]:hover * {background:'+GM_getValue('coTabnewSur','#46738F')+';}'+
	'.ttable_headinner tr[class~=new]:nth-child(2n+1) * {background:'+GM_getValue('coTabnew2','#9BCFCF')+';}'+//#9BCFCF
	'.ttable_headinner tr[class~=new]:nth-child(2n) * {background:'+GM_getValue('coTabnew1','#9BAECF')+';}';//#9BAECF
}
else {
	var autreCouleurNews='';
}

var css =autreCouleurNews+'.ttable_headinner tr:nth-child(2n+1) * {background:'+GM_getValue('coTab2','#EFEFEF')+';}'+//#EFEFEF
'.ttable_headinner tr:nth-child(1) * {background:'+GM_getValue('coTabTitre','#256F6F')+';}'+//#256F6F
'.ttable_headinner tr:nth-child(2n) * {background:'+GM_getValue('coTab1','#CFCFCF')+';}'+//#CFCFCF
'.curseurCarcheur {cursor:pointer;}'+
'.ftable .fheader {cursor:pointer;}'+
'.fheader ~ div {overflow:hidden;}'+
'.ttable_headinner tr+tr:hover * {background:'+GM_getValue('coTabSur','#2F6F57')+';}'+//#2F6F57
'.ttable_headinner tr+tr:hover a{color:black;}'+//lien surligner en noir
'.bouton {text-align:center;cursor:pointer;background:#BDBDBD;-moz-border-radius:5px;padding:0 7px;border:solid 1px #4F4F4F;display:block;}'+
'span[class~=bouton]:hover {background:#939393;border-color:black;}'+
'.NB_bmmain{padding:4px}'+
'.ttable_headinner [class~=surligna]:hover{background:'+GM_getValue('coTabEnteSur','#EF531D')+';}'+
'body > table {width:'+GM_getValue('taille','100%')+';margin:auto;background:#DADADA;}'+
'body.index_body {background-color:#ABABAB;}'+
'.rouge {color:#6F0000;}'+
'.bleu{color:#000A7F !important;}'+
'a + input[name=search]{width:160px;}'+
'input[name=zoneSaisi]{width:100%;}';


//initialistation
if (window.location.pathname!="/chat.php"){
	initialisation ();
}

function initialisation (){
	GM_addStyle(css);
	boiteOption ();
	memoEtatBlock ();
	couleur_tabeau_new ();
	elargireLienTab ();
	var accueilLienHaut=$$('img[src="themes/NB-21/images/NB_logo.jpg"]')[0].getParent('table');
	$$('img[src="themes/NB-21/images/NB_logo.jpg"]')[0].getParent('a').href=GM_getValue('lienAc','/');
	accueilLienHaut.addClass('curseurCarcheur');
	accueilLienHaut.addEventListener("click", function (){location=GM_getValue('lienAc','/');}, false);
	if ($('sort')) trioTabEntet ();//si le tableau est celui des torent et pas la boite au lettre
}

function trioTabEntet (){
	var tablTitre=[];
	var tableNom=['name','size','seeders','leechers']
	//var tablTitreLoca=['sort=name&order='+(window.location.search.indexOf("sort=name")>-1&&window.location.search.indexOf("order=asc")>-1)?"desc":"asc",'','','',''];
	var url=location.pathname
	if (window.location.search==""){//pas de paramètre
		var parame='?';
		var order=true;//true == decendant
	}
	else {
		var parame=window.location.search.replace(/&?sort=[^&]*/,'');
		parame=parame.replace(/&?order=[^&]*/,'');
		parame=parame.replace(/&?incldead=[^&]*/,'');
		parame=parame.replace(/\?&/,'?');
		var order=(window.location.search.indexOf("order=desc")>-1)?true:false;
	}
	var url=window.location.pathname+parame
	$$('.ttable_head:nth-child(2)','.ttable_head:nth-child(4)','.ttable_head:nth-child(6)','.ttable_head:nth-child(7)').each(function(element,index){
		element.addClass('curseurCarcheur surligna');
		element.addEventListener("click", function (){window.location=((window.location.search.indexOf("sort="+tableNom[index])>-1)&&order)?url+"&incldead=2&sort="+tableNom[index]+"&order=asc":url+"&incldead=2&sort="+tableNom[index]+"&order=desc";}, false);
	});
}

function elargireLienTab (){
	$$('.ttable_headinner a').each(function(element){
		element=element.getParent('td');
		element.addClass('curseurCarcheur');
		element.set('onClick','window.location=this.getElementsByTagName("A")[0].href');
	});
	if (GM_getValue('afinRech',false)){
		var categorie;
		if (window.location.search.substring(0,8)=="?search="){// si c'est une recherche
			$$('input[name=search]').each(function(element){element.value=/search=([^&]*)/.exec(window.location.href)[1].replace(/\+/g, ' ')});
			$$('.ttable_headinner a[href^=torrents.php] img').each(function(element){
				element=element.getParent('a');
				categorie=/\d+/.exec(element.href);
				element.href=window.location.href.replace(/cat=(\d+)/,'cat='+categorie);
			});
		}
	}
}

function couleurTab (){
	var tableauCoul=$$('.ttable_headinner tr');
	if (tableauCoul.length>0) for (var i=1;i<4;i++) tableauCoul[i].addClass('new');
	var optionMen=$('optionMen');
	optionMen.empty();
	$('titrOp').innerHTML='Option Couleur';
	var explication= new Element('p', {
		'text': 'Entrer une couleur par champ de texte, en hexadécimale ou en anglais. Effectuer vos changement, observez, et si ça vous plait, sauvgardez.'
	});
	var lab1= new Element('label', {
		'class': 'laOptio',
		'html': 'titre du tableau',
		'for' : 'coTabTitre' 
	});
	var inp1= new Element('input', {
		'class': 'laOptio',
		'id': 'coTabTitre',
		'name' : 'zoneSaisi',
		'type' : 'text',
		'value' : GM_getValue('coTabTitre','#256F6F'),
		'styles': {
			'background-color': GM_getValue('coTabTitre','#256F6F'),
		},
		'events': {
			'change':function (){
				GM_addStyle('.ttable_headinner tr:nth-child(1) * {background:'+$('coTabTitre').value+';}');
				this.setStyle('background-color',this.value);
			}
		}
	});
	if (GM_getValue('opNewCo',false)){
		var lab2= new Element('label', {
			'class': 'laOptio',
			'html': 'couleur 1 new',
			'for' : 'coTabnew1' 
		});
		var inp2= new Element('input', {
			'class': 'laOptio',
			'id': 'coTabnew1',
			'name' : 'zoneSaisi',
			'type' : 'text',
			'value' : GM_getValue('coTabnew1','#9BAECF'),
			'styles': {
				'background-color': GM_getValue('coTabnew1','#9BAECF'),
			},
			'events': {
				'change': function (){
					GM_addStyle('.ttable_headinner tr[class=new]:nth-child(2n) * {background:'+$('coTabnew1').value+';}');
					this.setStyle('background-color',this.value);
				}
			}
		});
		var lab3= new Element('label', {
			'class': 'laOptio',
			'html': 'couleur 2 new',
			'for' : 'coTabnew2' 
		});
		var inp3= new Element('input', {
			'class': 'laOptio',
			'id': 'coTabnew2',
			'name' : 'zoneSaisi',
			'type' : 'text',
			'value' : GM_getValue('coTabnew2','#9BCFCF'),
			'styles': {
				'background-color': GM_getValue('coTabnew2','#9BCFCF'),
			},
			'events': {
				'change': function (){
					GM_addStyle('.ttable_headinner tr[class=new]:nth-child(2n+1) * {background:'+$('coTabnew2').value+';}');
					this.setStyle('background-color',this.value);
				}
			}
		});
		var lab4= new Element('label', {
			'class': 'laOptio',
			'html': 'couleur surlignage new',
			'for' : 'coTabnewSur' 
		});
		var inp4= new Element('input', {
			'class': 'laOptio',
			'id': 'coTabnewSur',
			'name' : 'zoneSaisi',
			'type' : 'text',
			'value' : GM_getValue('coTabnewSur','#46738F'),
			'styles': {
				'background-color': GM_getValue('coTabnewSur','#46738F'),
			},
			'events': {
				'change': function (){
					GM_addStyle('.ttable_headinner tr+tr[class=new]:hover * {background:'+$('coTabnewSur').value+';}');
					this.setStyle('background-color',this.value);
				}
			}
		});
	}
	else{
		var lab4=inp4=inp3=lab3=inp2=lab2={};
	}
	var lab5= new Element('label', {
		'class': 'laOptio',
		'html': 'couleur 1',
		'for' : 'coTab1' 
	});
	var inp5= new Element('input', {
		'class': 'laOptio',
		'id': 'coTab1',
		'name' : 'zoneSaisi',
		'type' : 'text',
		'value' : GM_getValue('coTab1','#CFCFCF'),
		'styles': {
			'background-color': GM_getValue('coTab1','#CFCFCF'),
		},
		'events': {
			'change':function (){
				GM_addStyle('.ttable_headinner tr:nth-child(2n) * {background:'+$('coTab1').value+';}');
				this.setStyle('background-color',this.value);
			}
		}
	});
	var lab6= new Element('label', {
		'class': 'laOptio',
		'html': 'couleur 2 ',
		'for' : 'coTab2' 
	});
	var inp6= new Element('input', {
		'class': 'laOptio',
		'id': 'coTab2',
		'name' : 'zoneSaisi',
		'type' : 'text',
		'value' : GM_getValue('coTab2','#EFEFEF'),
		'styles': {
			'background-color': GM_getValue('coTab2','#EFEFEF'),
		},
		'events': {
			'change': function (){
				GM_addStyle('.ttable_headinner tr:nth-child(2n+1) * {background:'+$('coTab2').value+';}.ttable_headinner tr:nth-child(1) * {background:'+$('coTabTitre').value+';}');
				this.setStyle('background-color',this.value);
			}
		}
	});
	var lab7= new Element('label', {
		'class': 'coTabEnteSur',
		'html': 'couleur surlignage titre ',
		'for' : 'coTabSur' 
	});
	var inp7= new Element('input', {
		'class': 'laOptio',
		'id': 'coTabEnteSur',
		'name' : 'zoneSaisi',
		'type' : 'text',
		'value' : GM_getValue('coTabEnteSur','#EF712C'),
		'styles': {
			'background-color': GM_getValue('coTabEnteSur','#EF712C'),
		},
		'events': {
			'change': function (){
				GM_addStyle('.ttable_headinner [class~=surligna]:hover {background:'+$('coTabEnteSur').value+';}');
				this.setStyle('background-color',this.value);
			}
		}
	});
	var lab8= new Element('label', {
		'class': 'laOptio',
		'html': 'couleur surlignage',
		'for' : 'coTabSur' 
	});
	var inp8= new Element('input', {
		'class': 'laOptio',
		'id': 'coTabSur',
		'name' : 'zoneSaisi',
		'type' : 'text',
		'value' : GM_getValue('coTabSur','#EF531D'),
		'styles': {
			'background-color': GM_getValue('coTabSur','#EF531D'),
		},

		'events': {
			'change': function (){
				GM_addStyle('.ttable_headinner tr+tr:hover * {background:'+$('coTabSur').value+';}');
				this.setStyle('background-color',this.value);
			}
		}
	});
	var sauvgard= new Element('span', {
		'id': 'saChang',
		'text' : 'Sauvgardez',
		'class': 'bouton',
		'events': {
			'click': function (){
				$$('#optionMen input[type=text]').each(function(element){GM_setValue(element.id, element.value)});
				menOp ();
			}
		}
	});
	var retour= new Element('span', {
		'id': 'retour',
		'text' : 'Retour menu',
		'class': 'bouton',
		'events': {
			'click': function (){
				menOp ();
			}
		}
	});
	optionMen.adopt(explication,lab1,inp1,lab7,inp7,lab2,inp2,lab3,inp3,lab4,inp4,lab5,inp5,lab6,inp6,lab8,inp8,sauvgard,retour);

}

function boiteOption (){
	var bolkOp=$$('.ftable')[0].clone();
	bolkOp.id='tabOp'
	var bolkOpTitr=bolkOp.getElement('.fheader .NB_btmain b')
	bolkOpTitr.id='titrOp';
	conPlance=bolkOp.getElement('.fmiddle .NB_bmmain')
	conPlance.id='optionMen';
	bolkOp.inject($$('.ftable')[0],'after');
	menOp ();
}

function menOp () {
	$('titrOp').innerHTML='Option du script';//titre
	var optio= new Element('span', {
		'class': 'bouton',
		'html': 'Couleur du tableau',
		'events': {
			'click': couleurTab
		}
	});
	var regla= new Element('span', {
		'class': 'bouton',
		'html': 'Réglages',
		'events': {
			'click': reglscript
		}
	});
	$('optionMen').empty()
	$('optionMen').adopt(optio,regla)
}

function reglscript (){
	$('optionMen').empty()
	var news1= new Element('label', {
		'class': 'laOptio',
		'html': 'Masquer mention (new)',
		'for' : 'opNew' 
	});
	var news2= new Element('input', {
		'class': 'laOptio',
		'id': 'opNew',
		'name' : 'cheq',
		'type' : 'checkbox'
	});
	var news3= new Element('label', {
		'class': 'laOptio',
		'html': 'Afficher autres couleur pour new',
		'for' : 'opNewCo' 
	});
	var news4= new Element('input', {
		'class': 'laOptio',
		'id': 'opNewCo',
		'name' : 'cheq',
		'type' : 'checkbox'
	});
	var afinRech1= new Element('label', {
		'class': 'laOptio',
		'html': 'Affiner la recherche',
		'for' : 'afinRech' 
	});
	var afinRech2= new Element('input', {
		'class': 'laOptio',
		'id': 'afinRech',
		'name' : 'cheq',
		'type' : 'checkbox'
	});
	var lienAc1= new Element('label', {
		'class': 'laOptio',
		'html': 'Cible du lien logo',
		'for' : 'lienAc' 
	});	
	var lienAcAcro= new Element('acronym', {
		'title': 'en relatif uniquement :\n C\'est à dire tous ce qui est à droite de http://www.allotracker.com, / non comrpis',
		'class': 'acronym'
	});	
	lienAc1.inject(lienAcAcro);
	var lienAc2= new Element('input', {
		'class': 'laOptio',
		'id': 'lienAc',
		'name' : 'zoneSaisi',
		'type' : 'text',
		'value' : GM_getValue('lienAc','/')
	});
	var taille1= new Element('label', {
		'class': 'laOptio',
		'html': 'Taille de la page',
		'for' : 'taille' 
	});	
	var tailleAcro= new Element('acronym', {
		'title': 'taille en px ou en %',
		'class': 'acronym'
	});	
	taille1.inject(tailleAcro);
	var taille2= new Element('input', {
		'class': 'laOptio',
		'id': 'taille',
		'name' : 'zoneSaisi',
		'type' : 'text',
		'value' : GM_getValue('taille','100%'),
		'events': {
			'change': function (){
				$$('body > table').setStyle('width',$('taille').value);
			}
		}
	});
	var sauvgard= new Element('span', {
		'id': 'saChang',
		'text' : 'Sauvgardez',
		'class': 'bouton',
		'events': {
			'click': function (){
				$$('#optionMen input[type=text]').each(function(item){
					GM_setValue(item.id,item.value)
				});
				$$('#optionMen input[type=checkbox]').each(function(item){
					GM_setValue(item.id,item.checked)
				});
				location.reload();
			}
		}
	});
	var retour= new Element('span', {
		'id': 'retour',
		'text' : 'Retour menu',
		'class': 'bouton',
		'events': {
			'click': function (){
				$$('body > table').setStyle('width',GM_getValue('taille','100%'));
				menOp ();
			}
		}
	});//index_body
	$('optionMen').adopt(news2,news1,document.createElement('br'),news4,news3,document.createElement('br'),afinRech2,afinRech1,document.createElement('br'),lienAcAcro,lienAc2,tailleAcro,taille2,sauvgard,retour);
	$$('#optionMen input[type=checkbox]').each(function(item){
		item.checked=GM_getValue(item.id,false);
	});
}

function couleur_tabeau_new (){//mete une ligne sur deux en couleur pour les new
	$$('.ttable_col2 b+b').each(function(element,index){
		element.getParent('tr').addClass('new');
		if (GM_getValue('opNew',false)) element.destroy();
	});
}

function memoEtatBlock (){//initalise boutons block, et ferme les bloque qui doivent etre fermé.
	var lienCacher=$$('.fheader')
	lienCacher.each(function(item,index){
		var monBlock=(item.getElementsByTagName('B')[0].firstChild.nodeName=='A'||item.getElementsByTagName('B')[0].firstChild.nodeName=='FONT')?item.getElementsByTagName('B')[0].firstChild.firstChild.nodeValue:item.getElementsByTagName('B')[0].firstChild.nodeValue;
		if (monBlock.substring(0,7)!='Détails'||monBlock.substring(0,5)!='Aucun '){//pour ne pas prendre les affiches
			cible=item.getNext();
			
			item.setAttribute('mondubmock',monBlock);
			item.addEventListener("click", ouvFermDiv.bind(item), false);
			cible.setAttribute('hauteur',cible.offsetHeight)
			if (GM_getValue(monBlock, false)){
				cible.style.height=0;
			}
		}
	});
	$$('.ftable .fheader a[onclick]').removeProperty('onclick');
}

function ouvFermDiv (){
	var element=this.getNext();
	if (parseInt(element.style.height)==0){//on ouvre
		element.tween('height', element.getAttributeNode('hauteur').value);
		GM_setValue(this.getAttributeNode('mondubmock').value, false);
	}
	else {//on ferme
		element.tween('height', 0);
		GM_setValue(this.getAttributeNode('mondubmock').value, true);
	}
}
//mise à jour
var vresPass=GM_getValue('vresPass', false);
if ((new Date().getTime() - GM_getValue('checked', 0) >= 86400000)||(vresPass)){//86400000ms = 1 jours
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/59613.meta.js',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		},
		onload: function(responseDetails) {
			var vertion=/@version\s+(\d+\.\d+)/i.exec(responseDetails.responseText)
			if (parseFloat(vertion[1])>0.07){//vertion du script actuel
					var miseJourAlert=document.createElement('p');
					miseJourAlert.innerHTML='La version <span class="rouge">'+vertion[1]+'</span> du script "allotracker script" est <a class ="bleu" href="http://userscripts.org/scripts/admin/59613">disponible</a>'
					$('optionMen').appendChild(miseJourAlert)
					GM_setValue('vresPass', true)
			}
			else {
				GM_setValue('vresPass', false)
			}
		}
	});
	GM_setValue('checked', new Date().getTime() + '')
}