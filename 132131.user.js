// ==UserScript==
// @name           Boursopatch
// @description	   Corrige des problèmes ennuyeux sur les forums de Boursorama
// @namespace      facoptere@gmail.com
// @include        http*://www.boursorama.com/forum*
// @include        http*://www.boursorama.com/monbourso/forum/*
// @include        http*://www.boursorama.com/cours.phtml?*
// @include        http*://www.boursorama.com/bourse/cours/graphiques/*
// @version        0.8
// @date           2012.05.13
// ==/UserScript==
var version = 0.8;
var DEBUG_VERCHECK = false;

var vrq = null;
var vcache = null;
var curdate = Math.floor((new Date()).getTime()/60000); //date en minutes depuis 1/1/1970
var snapResults;
var elm, elm2;
const CHOMPRE = /^[ \t\r\n]+|[ \t\r\n]+$/g;
var Useraccount=null;
var Cfgvar='cfg';
var Cfg;
// patch pour faire fonctionner le script sur GG Chrome
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}


elm = ev1('//div[@id="header"]//span[@class="myaccount"]/a', document);
if (elm != null) { // l'utilisateur est logué
	Useraccount = elm.innerHTML.replace(CHOMPRE, '');
	Cfgvar+= '.'+crc16(Useraccount); // désensibilisation du login pour rien stocker de personnel
	Useraccount = '/monbourso/membre/'+Useraccount+'.html';
}
Cfg = JSON.parse(GM_getValue(Cfgvar, '{ "version":'+version+', "portefeuilles":{"date":0, "selected":"", "list":[]}, "state":0, "date": 0, "url":null, "list":[], "idx":0 }'));


// cherche le premier element du DOM correspondant au 'xpath', étant sous l'arborescence de 'from'
function ev1(xpath, from) {
	var e=null, r=null;
	try {
		if (from) {
			e = document.evaluate(xpath, from, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			if (e) r=e.singleNodeValue;
		}
	} catch (E) {};
	return r;
}
 
// transforme une chaine de caractères en un hash fait de 4 lettres
function crc16(s) {
	const CRC_POLYNOM = 0x8408;
	const CRC_PRESET = 0xFFFF;
	var crc = CRC_PRESET;
	for (var i = 0; i < s.length; i++) {
		crc ^= s.charAt(i);
		for (var j = 0; j < 8; j++) {
			if (crc & 0x0001) crc = (crc >>> 1) ^ CRC_POLYNOM;
			else crc = (crc >>> 1);
		}
	}
	return String.fromCharCode(97+(crc&15),97+((crc>>>4)&15),97+((crc>>>8)&15),97+((crc>>>12)&15));  
}
 
// javascript permettant de fabriquer l'url de navigation 
function ChPage(evt) {
	const myRE = /^(.*-)[0-9]+$/g;
	var val = evt.currentTarget;
	val = (val.title.length==0) ? val.options[val.options.selectedIndex].value : val.title ;
	val = parseInt(val);
	var url = [];
	var s1 = document.getElementById('boursopatch_selSub');
	if (s1 !== undefined && s1.selectedIndex>0) {
		url.push('filtre_sujet=',s1.options[s1.selectedIndex].value);
	}
	s1 = document.getElementById('boursopatch_selMem');
	if (s1 !== undefined && s1.selectedIndex>0) {
		if (url.length>0) url.push('&');
		url.push('is_boursostar=1');
	}
	s1 = document.getElementById('boursopatch_selDat');
	if (s1 !== undefined && s1.selectedIndex>0) {
		if (url.length>0) url.push('&');
		url.push('filtre_date=',s1.options[s1.selectedIndex].value);
	}	
	var path=location.pathname;
	if (!isNaN(val) && val>0) {
		path=path.replace(myRE,'$1'+val);
	}
	if (url.length>0) url=['?'].concat(url);
	url = [path].concat(url).join('');
	window.location.href = url;
}

// javascript contenant la gestion du drag'n'drop des boursignorés locaux
function drop(evt) {
	const dropRE = /^[^a-z0-9]*([a-z0-9_.-]+)[^a-z0-9]*/i;
	var id = evt.dataTransfer.getData('Text');
	// filtrage du pseudo :
	id = id.replace(dropRE,'$1');
	var s1 = document.getElementById('boursopatch_ignDrop').style.visibility='hidden';
	s1 = document.getElementById('boursopatch_ignForm');
	s1.style.visibility='visible';
	s1=document.getElementById('boursopatch_ignta');
	s1.value = s1.value+' '+id;
	evt.preventDefault();
}

// javascript utilisé pour détecter les liens dans les messages
function sanitize(s) {
	// limite le XSS en encodant certains caractères de la syntaxe HTML (faudrait tout remplacer par les entities, mais bon...)
	const reet = /&/g;
	const reless = /</g;
	return s.replace(reet, '&amp;').replace(reless, '&lt;');
}

function beautiful() {
	var snapResults = document.evaluate("//div[@id='forum']/div/div[@class='main_message']/p|//div[@id='forum']/div/div[@class='main_message']/h1", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (snapResults != null && snapResults.snapshotLength>0) {
		// Linkifier les urls : 
		//    Détection des noms de domaine seuls
		//    Contaténation des morceaux d'url méchemment fragmentées par Boursorama
		//    Transformation en un lien cliquable avec ouverture d'une nouvelle fenêtre
		//    Intégration de l'image directement dans le message si l'url à la gueule d'une url image
		const reURL = RegExp("(|h *t *t *p *s? *: */ */ *)([a-z0-9.:-][ a-z0-9.:-]{0,32}\\.[a-z ]+[a-z]+)(| */| */[^ '\"\n]+(?: +[^ '\"\n]{3,}){0,3})($|[\\)([\\]<> '\"\n])", 'ig');
		const resp = / /g; 
		// TODO : prévoir fragmentation dans TLD
		const redomain = /([a-zA-Z0-9:-]+\.(?:[a-z0-9:-]+\.)*(?:ac|ad|ae|aero|af|ag|ai|al|am|an|ao|aq|ar|arpa|as|asia|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|biz|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cat|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|com|coop|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|info|int|io|iq|ir|is|it|je|jm|jo|jobs|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mo|mobi|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|name|nc|ne|net|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pro|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|travel|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xxx|ye|yt|za|zm|zw))(?:$|[^a-zA-Z])/;
		const repath = /[^ a-z0-9=\/]*$/i;
		const reimg = /\.(?:gif|jpeg|jpg|png|bmp)$/i;
		// (bour\\.so|bit\\.ly|goo\\.gl|Owl\\.ly|TinyURL\\.com|Su\\.pr|t\\.co|minu\\.me)\n"+
		for (var i = 0; i < snapResults.snapshotLength ; i++) {
			var elm = snapResults.snapshotItem(i);
			var html = 	elm.innerText || elm.textContent;		
			var out=[];
			var index=0;
			var m;
			// TODO : prédécouper html en repérant prioritairement les http:// 
			while((m = reURL.exec(html)) != null) {
				var proto = m[1]; var domain=m[2]; var path=m[3]; 
				// se méfier du domaine capturé seul, ça peut être un bout de texte
				if (proto.length==0 || path.length == 0) {
					var m2 = redomain.exec(domain);
					if (m2 != null) {
						if (domain.length != m2[1].length) { // y'en a trop dans domain
							domain=m2[1];
							if (m2.index>0 && proto.length==0) { // du déchet à gauche du domaine sans avoir le proto
								// considérer le déchet gauche comme du texte  
								m.index += m2.index;
								// conserver le domaine
							}
							else if (m2.index>0 && proto.length>0) { // du déchet à gauche du domaine avec un proto
								// considérer le déchet comme faisant partie du domaine
								domain=m2.substring(0,m2.index+m2[1].length);
								// continuer avec le domaine reconstitué
							}
							if (m2.index+m2[1].length<m2.input.length) { // du déchet à droite du domaine
								// considérer le déchet (et l'eventuel path) comme du texte (rembobiner la regex)
								reURL.lastIndex -= m2.input.length-(m2.index+m2[1].length);
								path=m[4]="";
								// continuer avec le domaine
							}								
						}
						// else domain parfait
					}
					else {
						// rien à voir avec un domain 
						m.index += proto.length+domain.length;
						reURL.lastIndex = m.index;
						proto=domain=path=m[4]="";
					}
				}
				// TODO : joindre m[4] au path si m[4] est un petit déchet seul au bout d'une ligne
				// nettoyer le bout du path (virer les carctères peu probables)
				if (path.length>0) {
					var  m2 = repath.exec(path);
					if (m2 != null) {
						// couper le path
						path=path.substring(0,m2.index);
						// rembobiner
						reURL.lastIndex -= m2.input.length-m2.index;
					}
				}
				if (m.index>index) out.push(sanitize(html.substring(index,m.index)));  
				var url=proto.length>0?proto:'http://';
				url+=domain;
				url+=path.length>0?path:'/';
				url=url.replace(resp,'');
				if (reimg.test(url)) {
					var s=(proto+domain+path).replace(resp,'');
					out.push("<a target='_blank' title='Affiché par Boursopatch'  href='",
							url,
							"'><img src='",
							url,
							"' onerror='this.src=\"http://s.brsimg.com/static-1305547041/i/bourse/instrumenttype/default.png\"' style='min-width:20px:min-height:20px;max-width:95%;max-height:"+(window.innerHeight>200?window.innerHeight*0.9:200),
							"px'></a>"
					);
				}
				else {
					var s=(proto+domain+path);
					out.push("<a target='_blank' title='Affiché par Boursopatch' style='color: #0000EE; text-decoration:underline' href='",
							url,
							"'>",
							s,
							"</a>"
					); 
				}
				index=reURL.lastIndex-=m[4].length;
			}
			if(index<html.length) out.push(sanitize(html.substring(index)));			
			elm.innerHTML = out.join('').replace(CHOMPRE, '').replace(/\n/g, '<br>'); 
		}
		return snapResults;
	} else return null;	
}
/* contre-exemples :
http://a roon-bourse.blogspot.com
lèche c.ls !
impossible de taper un post avec flam.by
"http://www.dailymotion.com/video/x34y5i_sarkozy-nouvel-ordre-mondial_new s\n"+
		"En grande majorité je pense que oui.Si le peuple\n"+
		"http://www.boursorama.com/forum-plantule-161-taxes-sarko-2010-4 1742433 2-1\n"+
		"http://www.boursorama.com/actualites/grece-l-inquietude-monte-avant -le-saut-vers-l-inconnu-des-elections-legislatives-43f350e55f0e8d5efcc5ada5c9cea e08\n"+
		"Le Figaro.Fr\n"
*/


// javascript modifiant le widget "MES LISTES"
var portifScanned= 0;
var portifPage='';
var portifSelect='';
var portifDiv=null;

function addPortifs() { // modifie la combo box en y ajoutant les portefeuilles virtuels
	if (portifScanned == 0) {
		portifScanned = 1;
		// vérifier le cache dans le parametre persistant 'portefeuilles'
		if (curdate/60-Cfg.portefeuilles.date<1.0) { // mise à jour des listes toutes les heures
			var htmloption = [];
			for (i=0; i<Cfg.portefeuilles.list.length; i++) {
				var tmp2 = Cfg.portefeuilles.list[i];
				if (tmp2[1].length>0) htmloption.push(
					"<option title=\"Affiché par Boursopatch\" value='last' id='",
					tmp2[0],
					"' ",
					(tmp2[0] == Cfg.portefeuilles.selected) ? 'selected="selected"' : '',
					">&nbsp;&nbsp;",
					tmp2[1],
					"</option>"
					);			
			}
			// Modification du menu déroulant du widget "MES LISTES"
			if (portifSelect != null && htmloption.length>0) {
				portifScanned = 2;
				portifSelect.innerHTML+='<option title="Affiché par Boursopatch" disabled="disabled" class="gras" style="border-bottom:1px solid;margin:3px 1px 1px 1px">Portefeuilles :</option>'+htmloption.join('');
				onchangePortif();
				return;
			}
		}
		var rq = new window.XMLHttpRequest();
		rq.open("GET","/monbourso/outils/portefeuilles/portefeuille.phtml");  
		rq.onreadystatechange = function() {
			var htmloption, snapResults, i, elm;
			if (this.readyState == 4) {  
				// Lecture du menu déroulant de portefeuilles virtuels, calcul de l'HTML pour le widget
				portifPage.innerHTML = this.responseText;
				Cfg.portefeuilles.date=Math.floor(curdate/60);
				Cfg.portefeuilles.list=[];
				snapResults  = document.evaluate(".//form[@action='/monbourso/outils/portefeuilles/portefeuille.phtml']/div[1]/select/option" , portifPage, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				htmloption = [];
				for (i = 0; i < snapResults.snapshotLength ; i++) {
					elm = snapResults.snapshotItem(i);
					htmloption.push(
						"<option title=\"Affiché par Boursopatch\" value='last' id='",
						elm.getAttribute('value'),
						"' ",
						(elm.getAttribute('value') == Cfg.portefeuilles.selected) ? 'selected="selected"' : '',
						">&nbsp;&nbsp;",
						elm.innerHTML,
						"</option>");
					Cfg.portefeuilles.list.push([elm.getAttribute('value'), elm.innerHTML.replace(CHOMPRE, '')]);
				}
				// Modification du menu déroulant du widget "MES LISTES"
				if (portifSelect != null && htmloption.length>0) {
					portifSelect.innerHTML+='<option title="Affiché par Boursopatch" disabled="disabled" class="gras" style="border-bottom:1px solid;margin:3px 1px 1px 1px">Portefeuilles :</option>'+htmloption.join('');
					// ecriture du paramètre static s'il y a au moins 1 liste
					GM_setValue(Cfgvar, JSON.stringify(Cfg));
				}
				portifScanned = 2;
			}  
			//else portifScanned = 0;
		};
		rq.onabort = rq.onerror =  rq.ontimeout = function() { portifScanned = 0; };  
		rq.send(); 
	}
}

function onchangePortif() { // afficher le portefeuille virtuel choisi, sinon laisser Boursorama afficher si c'est une liste
	var ret=false;
	var select = portifSelect;
	var pid = select.options[select.selectedIndex].id;
	if (pid !== undefined  && pid.length>=1) { // un portefeuille est choisi
		var snapResults, i, elm, snapResults2, i2, elm2;
		// mémoriser le portefeuille sélectionné
		Cfg.portefeuilles.selected=pid;
		GM_setValue(Cfgvar, JSON.stringify(Cfg));
		// vérifier si la dernière page téléchargée est déjà la bonne
		elm = ev1(".//form[@action='/monbourso/outils/portefeuilles/portefeuille.phtml']/div[1]/select" , portifPage);
		if (elm != null && elm.options[elm.selectedIndex].value === pid) {
			// Modification du contenu du widget "MES LISTES" selon le portefeuille sélectionné
			elm = ev1(".//form[@action='/monbourso/outils/portefeuilles/portefeuille.phtml']", portifPage);
			if (elm != null) {
				// Lecture du contenu du portefeuille virtuel, calcul de l'HTML pour le widget
				var html= [];
				snapResults  = document.evaluate("../../div[2]/table/tbody/tr" , elm, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (i = 0; i < snapResults.snapshotLength-3 ; i++) {
					elm = snapResults.snapshotItem(i); 
					html.push('<tr title="Affiché par Boursopatch">');
					var attr=[ 'colspan="2" nowrap="nowrap"', 'style="text-align:right" nowrap="nowrap"', 'style="text-align:right" nowrap="nowrap"', 'style="text-align:right" nowrap="nowrap"' ];
					snapResults2  = document.evaluate("td[position()=2 or position()=7 or position()=9 or position()=10]" , elm, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					for (i2 = 0; i2 < snapResults2.snapshotLength ; i2++) {
						elm2 = snapResults2.snapshotItem(i2); 
						html.push('<td ',attr[i2],'>',elm2.innerHTML,'</td>');
					}
					html.push('</tr>');
				}
				elm = snapResults.snapshotItem(snapResults.snapshotLength-3); 
				html.push('<tr title="Affiché par Boursopatch">');
				var attr=[ ' class="txt02 gras" style="padding-left:8px" nowrap="nowrap"', 'colspan="2" style="text-align:right" nowrap="nowrap" class="gras"', 'style="text-align:right" nowrap="nowrap"', 'style="text-align:right" nowrap="nowrap"' ];
				snapResults  = document.evaluate("td[position()=1 or position()=3 or position()=4 or position()=5]" , elm, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (i = 0; i < snapResults.snapshotLength ; i++) {
					elm = snapResults.snapshotItem(i); 
					html.push('<td ',attr[i],'>',elm.innerHTML,'</td>');
				}
				html.push('</tr>');
				// Ecriture du contenu du portefeuille dans le widget "MES LISTES"
				elm = ev1("//div[@id='Ui_Widget_745550' or @id='Ui_Widget_147975']/div[2]/table/tbody", document);
				if (elm !== undefined && elm != null) {
					elm.innerHTML=html.join('');
				}
				elm = ev1("../thead", elm);
				if (elm !== undefined && elm != null) {
					elm.innerHTML='<tr><th><a class="sortable">Libellé</a></th><th> &nbsp; &nbsp; &nbsp; </th><th><a class="sortable">Cours</a></th><th><a class="sortable">Perf. €</a></th><th><a class="sortable">Var.</a></th><th><a class="sortable"></a></th></tr>';
				}
			}	
		}
		else {
			// télécharger la page sinon, et boucler une seconde fois à la fin du téléchargement
			var rq = new window.XMLHttpRequest();
			rq.open("GET", /*window.location.protocol+"//www.boursorama.com*/"/monbourso/outils/portefeuilles/portefeuille.phtml?pid="+pid);  
			rq.onreadystatechange = function() {  
				if (this.readyState == 4) {  
					portifPage.innerHTML = this.responseText;
					onchangePortif(select);
				}
			};
			rq.send(); 
		}
		ret=true;
	}
	else {
		Cfg.portefeuilles.selected=pid;
		GM_setValue(Cfgvar, JSON.stringify(Cfg));
	}

	return ret;
}

// virer la pub
snapResults  = document.evaluate('/html/body/div[2]/div/div/div[contains(@id,"sas_")]|/html/body/div[2]/div/div[2]/div/div[@id="rightCol"]//div[contains(@id,"sas_") or contains(@id,"_Block8")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < snapResults.snapshotLength ; i++) {
	var elm = snapResults.snapshotItem(i);
	elm.parentNode.removeChild(elm);
} 

// corriger le refresh foireux
elm = ev1("/html/head/link[@rel='canonical']", document);
if (elm !== undefined && elm != null) elm.setAttribute('href', window.document.location.href);

// positionner l'ascenseur vertical au niveau du chemin de fer pour zapper la bannière
elm = ev1("//div[@id='subnavbar']", document);
if (elm !== undefined && elm != null) window.scrollTo(0,elm.offsetTop+elm.offsetHeight/3);
 

 
// cas où on est sur la page principale d'un forum

elm = ev1("//div[@id='forum']//div[@class='bd']/select[1]", document);;
if (elm != null) {
	// modification de la navigation au niveau des filtres de recherche
	elm.addEventListener('change', ChPage, true);
	elm.setAttribute('id',"boursopatch_selSub");
	elm.removeAttribute('onchange');
	elm = ev1("select[2]", elm.parentNode);;
	elm.addEventListener('change', ChPage, true);
	elm.setAttribute('id',"boursopatch_selDat");
	elm.removeAttribute('onchange');

	// ajout du menu déroulant pour les Etoilés
	elm2 = document.createElement('select');
	elm2.setAttribute('id',"boursopatch_selMem");
	elm2.addEventListener('change', ChPage, true);
	elm2.innerHTML = "<select><option value='0'>Tous les membres</option><option value='1'>Etoilés</option></select>";
	elm.parentNode.insertBefore(elm2, elm);
	if(location.href.indexOf('is_boursostar=1')>0) elm2.options[1].selected='selected';

	// modification du petit bouton refresh
	elm = ev1("a", elm.parentNode);
	elm.setAttribute('title','1');
	elm.removeAttribute('href');
	elm.addEventListener('click',  ChPage, true);

	// div rouge = zone de largage pour le drag'n'drop
	elm2 = document.createElement('div');
	elm2.setAttribute('id',"boursopatch_ignDrop"); 
	elm2.addEventListener('dragover', function() {arguments[0].preventDefault();}, true);
    elm2.addEventListener('drop', function() {drop(arguments[0]);}, true);
	elm2.setAttribute('style',"visibility:hidden;vertical-align:middle;float:right;background-color:#FF8060;z-index:99; position:absolute; right:0; top:0; height:100%;");
	elm2.innerHTML = "<div style='height:3em;padding:1em 0 1em 0'>&nbsp;Lâcher ici pour Boursignorer&nbsp;</div>";
	elm.parentNode.appendChild(elm2);
	elm.parentNode.style.position='relative';

	// div gris = textarea avec les boursignorés
	elm2 = document.createElement('div');
	elm.parentNode.appendChild(elm2);
	elm2.setAttribute('id',"boursopatch_ignForm"); 
	elm2.setAttribute('style',"visibility:hidden;text-align:center;float:right;background-color:#E0E0D0;z-index:99; position:absolute; right:0; top:0; padding:.3em;");
	elm2.innerHTML = "Liste locale des boursignorés :<br><textarea id='boursopatch_ignta' rows='2' cols='30'>"+
	GM_getValue('boursignore', '')+	"</textarea><br><button type='button' id='boursopatch_btn'>Fermer</button>"; 
	document.getElementById('boursopatch_btn').addEventListener('click',  function() { GM_setValue('boursignore', document.getElementById('boursopatch_ignta').value); location.reload(); }, true);

 	// modifier la navigation dans les pages au niveau des header/footer du forum
	elm = ev1("//span[@id='pagination_select']/select", document);;
	if (elm != null) {
		elm.addEventListener('change', ChPage , true);
		var myRE = /^(.+-)([0-9]+)$/;
		snapResults  = document.evaluate("//a[contains(@href,'"+window.location.pathname.replace(myRE,'$1')+"')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < snapResults.snapshotLength ; i++) {
			var elm = snapResults.snapshotItem(i);
			elm.setAttribute('title', elm.getAttribute('href').replace(myRE,  '$2'));
			elm.removeAttribute('href');
			elm.addEventListener('click',   ChPage , true);
		}
	
		// préparer la regex de recherche des boursignorés	
		var ign = GM_getValue('boursignore', '');
		var myRegExp = null;
		if (ign.length>3) {
		   ign = ign.replace(/[^a-z0-9._ -]/ig, '');
		   ign = ign.replace(/\./g, '\.');
		   ign = ign.replace(/^ *(.*[^ ]) *$/, '$1');
		   ign = ign.replace(/ +/g, '|');
		   if (ign.length>3) {
				myRegExp = new RegExp(' *(?:'+ign+') *', 'i');
		   }
		}
		
		snapResults = document.evaluate("//table[@id='messages']/tbody/tr/td[4]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < snapResults.snapshotLength ; i++) {
			var elm = snapResults.snapshotItem(i);
			// cacher les lignes des boursignorés dans le tableau messages du forum
			if (myRegExp != null && elm.innerHTML.search(myRegExp)>=0) elm.parentNode.style.display='none';
			elm.addEventListener('dragstart', function() { document.getElementById('boursopatch_ignDrop').style.visibility='visible', arguments[0].dataTransfer.setData('Text', arguments[0].currentTarget.innerHTML); }, false);
    		elm.addEventListener('dragend',   function() { document.getElementById('boursopatch_ignDrop').style.visibility='hidden'; }, false);

			// fixer la largeur max des lignes car des petits cons les bourrent avec des underscores
			var el2 = ev1("td[1]/a/span", elm.parentNode);
			el2.parentNode.setAttribute('style', 'width:19em;float:left;overflow: hidden');
		}
	}
} 



// Cas où on lit le contenu d'un message (avec les réactions dessous chacune sur une ligne avec le hover)

// linkifier les liens présents :
snapResults = beautiful();
if (snapResults != null) {
	var i, elm2, elm;
	// vérifier la présence d'une nouvelle version de ce script et proposer son téléchargement en affichant un bandeau
	if (((curdate/60) % 136 < 24) || DEBUG_VERCHECK) { // vérification tous les 6 jours moins 8 heures
		vcache = GM_getValue('version', '0.0 0').split(' ');
		if( vcache[0]+0.0 < version) {
			// cache faux du fait d'une installation manuelle, l'écraser avec la version courante
			GM_setValue('version', version+' '+(Math.floor(curdate/60)-5));
		}
		else {
			if ((curdate/60-vcache[1] < 4) || DEBUG_VERCHECK) { // affichage du bandeau pendant les 4 premières heures pour pas trop déranger
				if ((vcache[0]+0.0 > version) || DEBUG_VERCHECK) {
					//alert("Version disponible : "+vcache[0]);
					elm2 = document.createElement('div');
					elm2.setAttribute('id',"boursopatch_ignDrop"); 
					elm2.setAttribute('style',"border-radius: .3em;margin-left:10em ;border:0;padding:0.3em;vertical-align:middle;font-size:1em;text-align:center; "+
					"background-image: -moz-linear-gradient(right , #FF8060 0%, #FFFFFF 51%);background-image: -webkit-linear-gradient(right , #FF8060 0%, #FFFFFF 51%)"
					//"background: linear-gradient(white, gray);"
					);
					elm2.innerHTML = "<div style='padding-left:30em'>"+
					"<div style='float:right;margin:0.2em .4em'>"+
					"<button style='background:-webkit-gradient(linear, left top, left bottom, from(rgb(100, 220, 100)), to(rgb(245, 255, 245))); background:-moz-linear-gradient(100% 100% 90deg, rgb(100, 220, 100), rgb(245, 255, 245)) repeat scroll 0% 0% transparent' onclick=\"location.href='http://userscripts.org/scripts/source/132131.user.js'\">Installer</button>"+
					"</div>"+
					"La version "+vcache[0]+" du script<br><a target='_blank' href='http://userscripts.org/scripts/show/132131' style='text-decoration:underline;font-weight:bold;'>Boursopatch</a> est disponible... "+
					"</div>";
					elm = ev1("//html/body/div[2]/div/div[2]/div/div[3]/div[2]/ul", document);
					if (elm != null )elm.appendChild(elm2);
				}
				//else alert("Version distante pas supérieure "+(curdate-vcache[1]));
			}
			else if ((curdate/60-vcache[1]) >= 24) { // cache trop vieux
				// chercher la version courante sur userscript, mémoriser en cache la version récupérée
				if (vrq ===null) vrq=GM_xmlhttpRequest({
				  method: "GET",
				  url: "http://userscripts.org/scripts/show/132131",
				  onload: function(response) {
				  	var s= response.responseText.split('\n').join(' ').replace(/.*Version:<\/b> *([0-9.]+) *<\/p>.*/,'$1');;
					vcache[0]= parseFloat(s);
					if (isNaN(vcache[0])) vcache[0] = version; // cas d'erreur de parsing si leur site change dans le futur
					GM_setValue('version', vcache[0]+' '+Math.floor(curdate/60)); // date = nb d'heures depuis 1/1/1970
					//alert("Requete faite : v"+vcache[0]);
					vrq=null;
				  },
				  onabort: function() {
					vrq=null;
				  },
				  onerror: function() {
					vrq=null;
				  }
				});
			}
		}
	}
	//else alert("Verif dans "+curdate%136 );

	// linkifier les réactions aux messages en les faisant passer par la fonction beautiful() après les avoir cliqués
	snapResults  = document.evaluate("//div[@id='forum']//div[contains(@id,'link_')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; i < snapResults.snapshotLength ; i++) {
   		elm2 = snapResults.snapshotItem(i);
   		//elm2.removeAttribute('onclick');
   		//elm2.setAttribute('onclick',elm2.getAttribute('onclick')+';setTimeout("document.beautiful()",3000);');
    		elm2.addEventListener('click', function() { 
    			setTimeout(beautiful,1000);
    			arguments[0].stopPropagation();
    		}, false);
	}
	// TODO : effacer les réactions des boursignorés
	
	// choper le changement dans le div
	//elm = ev1(, document);
		snapResults = document.evaluate("//div[@id='forum']//div", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < snapResults.snapshotLength ; i++) {
			var elm = snapResults.snapshotItem(i);
    		//alert("don");
		}
}



if (Useraccount !=null) {	
	// Ecriture du contenu des portefeuilles VIRTUELS dans le widget "MES LISTES" s'il est présent
	// ce widget est truqué à la volée si l'utilisateur clique sur le menu déroulant
	portifDiv = ev1("//div[starts-with(@id,'Ui_Widget_')]/div[1]/span/a[contains(@href,'/monbourso/outils/listes/?numListe=')]/../..", document);
	if (portifDiv !== undefined && portifDiv != null) {
		portifSelect = ev1("./form/select", portifDiv);
		if (portifSelect !== undefined && portifSelect != null) {
			// détourner les événements du menu déroulant
			portifSelect.removeAttribute('onchange');
//			portifSelect.addEventListener('mouseover', function() {addPortifs()}, true);
			addPortifs();
			portifSelect.addEventListener('change', function() {if (onchangePortif()) arguments[0].stopPropagation();}, true);
			// détourner les événements du petit bouton refresh
			elm2= ev1("../../div[1]/ul[2]/li[1]/small", portifSelect);
			if (elm2 !== undefined && elm2 != null) {
				elm2.addEventListener('click', function() {portifPage.innerHTML = "";if (onchangePortif()) arguments[0].stopPropagation();}, true);	
			}
		}
	}
	
	// DIV pour stocker la page des portefeuilles virtuels :
	portifPage = document.createElement('div');
	portifPage.setAttribute('style','display:none');
	portifPage.setAttribute('id','boursopatch_portifPage');
	body = document.getElementsByTagName('body')[0];
	body.appendChild(portifPage);
}




/*

// DIV pour stocker l'historique des messages et les messages surveillés :
var histoPage = document.createElement('div');
histoPage.setAttribute('style','display:none');
histoPage.setAttribute('id','boursopatch_histoPage');
body = document.getElementsByTagName('body')[0];
body.appendChild(histoPage);

// DIV pour afficher le resultat de la surveillance des messages :
var watchboard = document.createElement('div');
watchboard.setAttribute('style','float:left; z-index:100000; position:absolute; top:0; left:100%; width:50em; height:62em; margin-left:1.5em');
watchboard.setAttribute('id','boursopatch_board');
elm = ev1("//div[starts-with(@id,'Ui_Widget_')]/div[1]/span/a[contains(@href,'/monbourso/forum/')]/../../..", document);
elm.insertBefore(watchboard,elm.childNodes[0]);
elm.style.position='relative';

var histoTimer=null;
var HISTOMAX = 50; // nombre de message à vérifier qu'ils ne sont pas censurés
var HISTOMAXAGE = 14; // age max des messages a surveiller, en jours
var HISTOCHECK = 6; // delai de vérification d'historique. En minutes
// GM_setValue('Cfg','{ "state":0, "date": 0, "url":null, "list":[], "idx":0 , "threadid":"" }');

function d2s(_d) {
	var d = new Date(_d*60000);
	var b = [];
	var j = d.getDate();
	var M = d.getMonth()+1;
	var h = d.getHours();
	var m = d.getMinutes();
	b.push(j<10?'0':'', j,'/',M<10?'0':'',M,' ',h<10?'0':'',h,':',m<10?'0':'',m);
	return b.join('');
} 

function sortList(list) {	
	list.sort(function(a,b){return b.file-a.file}); // tri selon index déroissant
	// suppression des doublons : 
	for (var k=0, j=list.length-1; j>0; j--) {
		if (list[j-1].file == list[j].file) {
			list.splice(j,1);
			k++;
		}
	}
	if (k>0) console.log("Cfg/scan: suppression de "+(k)+" doublons" );
	list.sort(function(a,b){return b.date-a.date}); // tri du moins agé au plus agé
	// suppression des messages superflus les plus vieux
	if (list.length>HISTOMAX) {
		console.log("Cfg/scan: suppression de "+(list.length-HISTOMAX)+" messages" );
		list.splice(HISTOMAX-1, list.length-HISTOMAX);
	}
	return list;
}

function parseHisto(stopdate) {	
	var next=null;
    var tmplist=[];
	var elm = ev1(".//div[@id='content-gauche']/div[4]/a", histoPage);

	if (elm != null) {
		next = elm.search.substring(1); 
		if (next === Cfg.url) next = null;
		var snapResults = document.evaluate("..//div/div/div/div[2]", elm, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; i < snapResults.snapshotLength ; i++) {
			var base = snapResults.snapshotItem(i);
			elm = ev1("div/text()", base);
			if (elm != null && elm.nodeValue.indexOf('a écrit')>0) {
				elm = ev1('.//a[contains(@id,"_Link") and starts-with(@href,"/forum-")]', base);
				if (elm != null) {
					var message = elm.href;
					var file = parseInt(message.replace(/^.*-(\d+)-\d+$/,'$1'),10);  
 					var title = elm.lastChild.nodeValue;
 					title = (title == null) ? "" : title;//.replace(/\B(\w+)/g, "$1".toLowercase()); //
					elm = ev1("div[2]/span", base);
					var age = (elm != null) ? elm.innerHTML : '';
					var m = /(une?|à|\d+) ([sjhml])/.exec(age);
					//console.log("Cfg/scan: age m1 m2 :"+age+" "+(m==null?'null':m[1])+" "+(m==null?m[2]:'null'));
					if (m!=null && m.length>=3) {
						age = m[1];
						if (typeof age == 'string') {
							if (age.indexOf('un')==0) age=1;
							else if (age.indexOf('à')==0) age=0;
						}
						console.log("age="+age+' '+(typeof age));
						switch(m[2]) {
							case 's' : age *= 7*24*60; break;
							case 'j' : age *= 24*60; break;
							case 'h' : age *= 60; break;
							//case 'l' :  break; // "à l'instant"
							//case 'm' : break; // minutes
						}	
					}
					else console.log("ALERTE : "+age);
					elm = ev1("div/a[1]/span/text()", base);
					var auteur = elm.nodeValue; 
					if (curdate-age>stopdate && age<60*24*HISTOMAXAGE) {
						console.log("Cfg/scan: nouveau message sauvegardé de "+auteur+" "+d2s(curdate-age) );
						tmplist.push({"date":Math.floor(curdate-age), "check":0, "status":"", "title":title, "symbole":"", "forum":"", "url":message, "file":file, "id_message":"", "auteur":auteur, "reco":0});
					}
					else { 
						console.log("Cfg/scan: ######## on s'arrête au message daté du "+d2s(curdate-age)+ ' '+curdate+' '+age+' '+(curdate-age) );
						next=null; 
						break; 
					}
				}
			}
		}
		if (tmplist.length) {
			if (Cfg.list.length==0)
				Cfg.list = tmplist;
			else
				Cfg.list = tmplist.concat(Cfg.list);
		}
	}
	else console.log('Cfg:scan PAS DURL page suivante');
	return next;
}

function scanMsg(idx) {
	var buf = [];
	elm = ev1('.//div[@id="main_message_div"]/div[1]/div/div/button[last()]', histoPage);
	if (elm != null) {
		buf["reco"] = parseInt(elm.innerHTML.replace(/^.*?(\d+).*$/,'$1'), 10);
		//elm = ev1('../../../h1', elm);
		//if (elm != null) {
		//	buf.title = elm.innerHTML.replace(CHOMPRE, '').replace(/(\B\w+)/g, '$1'.toLowercase());
		//}
	}
	elm = ev1('.//div[@id="subnavbar"]/div[1]/a[last()]', histoPage);
	if (elm != null) {
		buf["forum"] = elm.innerHTML;
	}
	else {
		elm = ev1('.//div[@id="content-gauche"]/div[1]/div/div[1]/div[2]/div[1]/a[2]', histoPage);
		if (elm != null) {
			buf["forum"] = elm.title;
		}
	}
		
	
	var snapResults = document.evaluate('.//*[@id="forum"]/div[2]/input', histoPage, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < snapResults.snapshotLength ; i++) {
		var elm = snapResults.snapshotItem(i);
		buf[elm.id] = elm.value;
	}
	console.log("Cfg.list len [idx] "+Cfg.list.length+' '+idx);
	if ( buf.file == undefined ) {
		 Cfg.list[idx].status = "censored"; 
		console.log("message dédruit ? "+Cfg.list[Cfg.idx].url);
	}
	else if (buf.file != undefined) {
		buf.file = parseInt(buf.file,10);
		if (Cfg.list[idx].file == buf.file) {
			Cfg.list[idx].id_message = parseInt(buf.id_message,10);
			Cfg.list[idx].symbole = buf.symbole;		
			Cfg.list[idx].reco = parseInt(buf.reco,10);		
			Cfg.list[idx].forum = buf.forum;		
			//Cfg.list[idx].title = buf.title;	
		}
	}
	else console.log("conflit d'acces concurrent pour "+idx);
}

function displayWatch() {
//watchboard
	var h=[];
	h.push('<table>');
	for (var i=0; Cfg != null && i<Cfg.list.length; i++) {
		var l=Cfg.list[i];
		h.push( '<tr style="background:yellow;',l.status.length>0?'text-decoration:line-through':'','"><td>', l.auteur,'</td><td nowrap="nowrap">',l.forum,'</td><td><a target=\"_blank\" href=\"',l.url,'\">',l.title,'</a></td><td nowrap="nowrap">',d2s(l.date),'</td></tr>');
	}
	h.push('</table>');
	watchboard.innerHTML = h.join('');
}

var historq=null;
function runcron() {
	var state;
	state = (arguments.length == 2 || arguments.length == 0) ? Cfg.state : arguments[0];
	curdate =  (new Date()).getTime()/60000; // date en minutes depuis 70
	//kk="";
	//for (var k=0; k<arguments.length;k++) kk=kk+k+"="+(typeof arguments[k])+' ';
	console.log("Cfg: entrée state= "+state+' ');
	
	var stop=false;
//	try {
	switch(state) {
		case 0:
			// verifier date dernier update des messages
			if (curdate-Cfg.date >= HISTOCHECK) {
				state = 1; 
			}
			else {
				stop=true;
			}
			break;
		case 1:
			// en cours de parsing, lancer la requête
			if (Useraccount == null) {
				// l'utilisateur n'est pas logué, donc pas d'acces à l'historique des files initiées
				state = 0;
				stop=true;
			}
			else {
				sortList(Cfg.list);
				historq = new window.XMLHttpRequest();
				if (Cfg.url == null) Cfg.url = "";
				var sss = Useraccount+((Cfg.url.length>0)?'?'+Cfg.url:'');
				historq.open("GET", sss);  
				historq.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
				historq.setRequestHeader("Accept", '*'+'/'+'*');
				historq.setRequestHeader("Accept-Language", "fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4");

				historq.onreadystatechange = function() {
					var htmloption, snapResults, i, elm;
					if (this.readyState == 4) {  
						//  parfois la page à incruster contient un méchant méta refresh
						histoPage.innerHTML = this.responseText.replace(/<META HTTP-EQUIV=.Refresh. [^>]+?/i, '');						 
						runcron(3);
					}  
				};
				console.log("1: rq "+sss);
				historq.send(null); 
				historq.onabort = historq.onerror =  historq.ontimeout = function() { runcron(4); };  					
				state = 2;
			}
			break;
		case 2:
			// ne rien faire, l'etape 3 est appelée quand la requete est finie
			// penser que plusieurs onglets sont ouverts en meme temps sur Bourso
			if (historq == null) { // requete jamais faite dans ce tread
				state = 4;
				stop = true;
			}
			break;
		case 3:
			// page histo reçue, parser
			Cfg.url = parseHisto(Cfg.date);
			if (Cfg.list.length>0) console.log("Plus jeune de "+d2s(Cfg.date)+"      1:"+d2s(Cfg.list[0].date)+"       "+Cfg.list.length+":"+d2s(Cfg.list[Cfg.list.length-1].date) );
			if (Cfg.url != null) {
				state=1; 
				console.log("3: next "+Cfg.url+" length "+Cfg.list.length);
			}
			else { 
				console.log("3: on stoppe tout url len: "+Cfg.url+" "+Cfg.list.length);
				Cfg.date =  Math.floor(curdate);
				sortList(Cfg.list);	
				state=4; 
			}
			break;
		case 4:
			// parcours des messages
			Cfg.idx=0;
			// pas de break
		case 5:
			// lancer la req pour un message
			state=20;
			while (Cfg.idx<Cfg.list.length) {
				if (Cfg.list[Cfg.idx].status.length>0 || (curdate-Cfg.list[Cfg.idx].check)<HISTOCHECK) { 
					Cfg.idx++;  // on zappe les messages déja censurés
					continue; 
				}
				var rq;
				var postdata=null;
				historq =  new window.XMLHttpRequest();
				if (Cfg.list[Cfg.idx].forum === undefined || Cfg.list[Cfg.idx].forum.length==0) {
					// requeter la page entiere, seule maniere d'avoir le symbole du sous-jacent & le forum
					historq.open("GET", Cfg.list[Cfg.idx].url);  
					console.log("5: rq "+ Cfg.list[Cfg.idx].url);
					historq.onreadystatechange = function() {
						var htmloption, snapResults, i, elm;
						if (this.readyState == 4) { 
							//  parfois la page à incruster contient un méchant méta refresh
							histoPage.innerHTML = this.responseText.replace(/<META HTTP-EQUIV=.Refresh. [^>]+?/i, '');						 
							runcron(7);
						}
 					};
					historq.send();
				}
				else {
					// requeter avec ajax, c'est plus propre ;)
					historq.open("POST", '/ajax/forum/messageContent.phtml');  
					historq.setRequestHeader("X-Request", "JSON");
					historq.setRequestHeader("X-Requested-With", "XMLHttpRequest");
					historq.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
					historq.setRequestHeader("Accept", "application/json");
					historq.setRequestHeader("X-Brs-Xhr-Schema", "DATA+OUT");
					historq.setRequestHeader("X-Brs-Xhr-Request", "true");
					historq.setRequestHeader("Accept-Language", "fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4");
					postdata = [];
					postdata.push("id_message=", Cfg.list[Cfg.idx].id_message,"&file=", Cfg.list[Cfg.idx].file,"&symbole=", Cfg.list[Cfg.idx].symbole,"&p=1&universe=bourse"); 
 
					console.log("5: rq ajax "+ Cfg.list[Cfg.idx].title);
					historq.onreadystatechange = function() {
						var htmloption, snapResults, i, elm;
						if (this.readyState == 4) {
							histoPage.innerHTML = JSON.parse(this.response).result;
							runcron(8);
						}
					};
					historq.send(postdata.join(''));
				}
 
				state = 6;
				historq.onabort = historq.onerror =  historq.ontimeout = function() { runcron(0); };  
				break;
			}
			break;
		case 6:
			if (historq == null) { // requete jamais faite dans ce tread
				state = 0;
				stop = true;
			}
			break;
		case 7:
			// message reçu 
			scanMsg(Cfg.idx);
			state=5;
			Cfg.idx++
			stop=false;
			break;
		case 8:
			// message reçu en ajax
			var elm = ev1('./div[1]/div/div/button[last()]', histoPage);
			if (elm != null) {
				Cfg.list[Cfg.idx].reco = parseInt(elm.innerHTML.replace(/^.*?(\d+).*$/,'$1'), 10);
			}
			else {
				Cfg.list[Cfg.idx].status = "censored";
				console.log("message dédruit ? "+Cfg.list[Cfg.idx].url);
			}
			Cfg.list[Cfg.idx].check = Math.floor(curdate);
			state=5;
			stop=false;
			Cfg.idx++;
			break;
		
		case 20 : 
			displayWatch();
			state=0;
		case 99 : 
			
			break;
	}
//	} catch (err) { console.log(err.name+' '+err.message+' / '+err.lineNumber+' in '+err.fileName); }
	Cfg.state = state;
	GM_setValue(Cfgvar, JSON.stringify(Cfg));
	displayWatch();
	if (histoTimer!=null) window.clearTimeout(histoTimer);
	var attente  = stop ? Math.max(Math.floor((HISTOCHECK-curdate+Cfg.date)*60000), 1000) : 1000; // on limite le flood en forçant une attente de 1s. entre chaque cycle de machine d'état
	histoTimer=window.setTimeout(runcron, attente);
	console.log("Cfg: sortie state= "+state+" attente max="+attente);
}

    //Cfg.date=curdate-60*24;
if (curdate-Cfg.date > HISTOCHECK || Cfg.state == 0) {
	Cfg.state=0; // l'onglet prend la main.
	Cfg.url=null;
	Cfg.threadid=window.location.href;
}
displayWatch();

if (window.location.href == Cfg.threadid) {
	runcron();
}
else console.log('threadid:'+Cfg.threadid+' delay:'+(curdate-Cfg.date)+' min');

*/