// coding: utf-8
// Firefox 5.0+, Chrome
// ==UserScript==
// @author		Ecilam <ecilam.dm@gmail.com>
// @name		Blood Wars Enhanced
// @namespace	BWE
// @description	Ce script ajoute des fonctionnalités supplémentaires à Blood Wars.
// @version		2013.07.11
// @license     Freeware
// @include		/^http:\/\/r[0-9]*\.fr\.bloodwars\.net\/.*$/
// @include		/^http:\/\/r[0-9]*\.bloodwars\.net\/.*$/
// @include		/^http:\/\/r[0-9]*\.bloodwars\.interia\.pl\/.*$/
// @include		/^http:\/\/beta[0-9]*\.bloodwars\.net\/.*$/
// @updateURL	https://userscripts.org/scripts/source/114417.meta.js
// @priority 	-100
// ==/UserScript==

(function(){
"use strict";

function _Type(value){
	var type = Object.prototype.toString.call(value);
	return type.slice(8,type.length-1);
	}
	
function _Exist(value){
	return _Type(value)!='Undefined';
	}

String.prototype.truncate = function(length){
	if (this.length > length) return this.slice(0, length - 3) + "...";
	else return this;
	};

/******************************************************
* OBJET DEBUG - fonctions de débugage
* Le paramétrage se fait manuellement dans le script
******************************************************/
var DEBUG = (function(){
	var enabled = false,
		logIn = {'DEBUG':true,'JSONS':false,'DS':false,'GM':false,'DOM':false,'DATAS':false,'L':false,'IU':false,};
	return {
		_Init: function(){return this;},

		// affiche sur la console le message de débugage
		// source = source de l'appel
		// repeat = profondeur de recherche (6 par défaut)
		// msg = contenu du message
		_Add: function(source,repeat,msg){
			if (!!enabled&&!!logIn[source]){
				for (var i=arguments.length-1;i>=3;i--) msg = msg.replace(new RegExp("\\$"+(i-2),"g"),this._Dump(arguments[i],repeat));
				GM_log(source+'::'+msg);
				}
			},

		_Dump: function(value,iterate)
			{
			var result = "",
				type = _Type(value);
			if (type=='Array'){
				if (iterate>0){
					result = '[Array'+value.length+'::';
					for (var i=0;i<value.length;i++) result += i.toString()+':'+this._Dump(value[i],iterate-1)+(i<value.length-1?',':'');
					result += ']';
					}
				else result = '[Array'+value.length+'::>>>End Iterate<<<]';
				}
			else if (type=='Function') result = '[Function::'+(value.name?value.name:'Anonymous')+']';
			else if (type=='Number'||type=='Math'||type=='Date'||type=='Boolean'||type=='String') result = '['+type+'::'+value.toString()+']';
			else if (type=='Object'||type=='HTMLTableRowElement'||type=='HTMLTableCellElement'||type=='HTMLImageElement'||type=='CSSStyleSheet'||type=='CSSStyleRule'){
				if (iterate>0){
					result = type+'{';
					for (var i in value) result += (result!=(type+'{')?',':'')+i.toString()+':'+this._Dump(value[i],iterate-1);
					result += '}';
					}
				else result = type+'{>>>End Iterate<<<}';			
				}
			//Null,Undefined...
			else result = '['+type+']';
			return result;
			},
		};
	})()._Init();

/******************************************************
* OBJET JSONS - JSON
* - stringification des données
******************************************************/
var JSONS = (function(){
	function reviver(key,value){
		if (_Type(value)=='String'){
			var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
			if (a!=null) return new Date(Date.UTC(+a[1],+a[2]-1,+a[3],+a[4],+a[5],+a[6]));
			}
		return value;
		}
	return {
		_Decode: function(value){
			var result;
			try	{
				result = JSON.parse(value,reviver);
				DEBUG._Add('JSONS',5,'_Decode:: $1',result);
				}
			catch(e){
				DEBUG._Add('JSONS',1,'_Decode:: value:$1 erreur:$2',value,e);
				}
			return result;
			},

		_Encode: function(value){
			var	result = JSON.stringify(value);
			DEBUG._Add('JSONS',5,'_Encode:: value:$1 result:$2',value,result);
			return result;
			},
		};
	})();

/******************************************************
* OBJET DS - Datas Storage
* - basé sur LOCALSTORAGE
******************************************************/
var DS = (function(){
	var LS = window.localStorage;
	return {
		_GetVar: function(key,defaut){
			var res = LS.getItem(key),
				value = JSONS._Decode(res);
				DEBUG._Add('DS',5,'_GetVar:: key:$1 value:$2 defaut:$3',key,value,defaut);
			return ((value!=null)?value:defaut);
			},

		_SetVar: function(key,value){
			var	value = JSONS._Encode(value);
			LS.setItem(key,value);
			DEBUG._Add('DS',5,'_SetVar:: key:$1 value:$2',key,value);
			},

		_Delete: function(key){
			LS.removeItem(key);
			DEBUG._Add('DS',1,'_Delete:: key:$1',key);
			},
			
		_Length: function(){
			DEBUG._Add('DS',1,'_Length:: $1',LS.length);
			return LS.length;
			},

		_Key: function(index){
			DEBUG._Add('DS',1,'_Key:: $1 $2',index,LS.key(index));
			return LS.key(index);
			},
		};
	})();

/******************************************************
* OBJET GM - GreaseMonkey Datas Storage
******************************************************/
var GM = (function(){
	return {
		_GetVar: function(key,defaut){
			var value = JSONS._Decode(GM_getValue(key,defaut)); 
			DEBUG._Add('GM',5,'_GetVar:: key:$1 value:$2 defaut:$3',key,value,defaut);
			return ((value!=null)?value:defaut);
			},

		_SetVar: function(key,value){
			GM_setValue(key,JSONS._Encode(value));
			DEBUG._Add('GM',5,'_SetVar:: key:$1 value:$2',key,value);
			},

		_Delete: function(key){
			GM_deleteValue(key);
			DEBUG._Add('GM',1,'_Delete:: key:$1',key);
			},
			
		_Length: function(){
			var vals = GM_listValues();
			DEBUG._Add('GM',1,'_Length:: $1',vals.length);
			return vals.length;
			},

		_list: function(){
			var vals = GM_listValues();
			DEBUG._Add('GM',1,'_list:: $1',vals);
			return vals;
			},
		};
	})();
	
/******************************************************
* OBJET DOM - Fonctions DOM & QueryString
* -  DOM : fonctions d'accès aux noeuds du document
* - _QueryString : accès aux arguments de l'URL
* Require : DEBUG
******************************************************/
var DOM = (function(){
	return {
		_GetNodes: function(path,root){
			var contextNode=(_Exist(root)&&root!=null)?root:document;
			var result=document.evaluate(path, contextNode, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			DEBUG._Add('DOM',1,'_GetNodes:: path:$1 root:$2 result:$3',path,contextNode,result);
			return result;
			},

		_GetFirstNode: function(path,root){
			var result = this._GetNodes(path,root);
			DEBUG._Add('DOM',1,'_GetFirstNode:: path:$1 root:$2 result:$3',path,root,result.snapshotItem(result.snapshotLength-1));
			return ((result.snapshotLength >= 1)?result.snapshotItem(0):null);
			},

		_GetLastNode: function(path, root){
			var result = this._GetNodes(path,root);
			DEBUG._Add('DOM',1,'_GetLastNode:: path:$1 root:$2 result:$3',path,root,result.snapshotItem(0));
			return ((result.snapshotLength >= 1)?result.snapshotItem(result.snapshotLength-1):null);
			},

		_GetFirstNodeValue: function(path, defaultValue,root){
			var result = this._GetFirstNode(path,root);
			DEBUG._Add('DOM',1,'_GetFirstNodeValue:: path:$1 root:$2 node:$3 result:$4',path,root,result,(((result!=null)&&(result.value!=null))?result.value:"(defaut)"+defaultValue));
			return (((result != null)&&(result.value!=null))?result.value:defaultValue);
			},

		_GetLastNodeValue: function(path, defaultValue,root){
			var result = this._GetLastNode(path,root);
			DEBUG._Add('DOM',1,'_GetLastNodeValue:: path:$1 root:$2 node:$3 result:$4',path,root,result,(((result!=null)&&(result.value!=null))?result.value:"(defaut)"+ defaultValue));
			return (((result!=null)&&(result.value!=null))?result.value:defaultValue);
			},

		_GetFirstNodeTextContent: function(path,defaultValue,root){
			var result = this._GetFirstNode(path,root);
			DEBUG._Add('DOM',1,'_GetFirstNodeTextContent:: path:$1 root:$2 node:$3 result:$4',path,root,result,(((result!=null)&&(result.textContent!=null))?result.textContent:"(defaut)"+defaultValue));
			return (((result!=null)&&(result.textContent!=null))?result.textContent:defaultValue);
			},

		_GetLastNodeTextContent: function(path,defaultValue,root){
			var result = this._GetLastNode(path,root);
			DEBUG._Add('DOM',1,'_GetLastNodeTextContent:: path:$1 root:$2 node:$3 result:$4',path,root,result,(((result!=null)&&(result.textContent!=null))?result.textContent:"(defaut)"+defaultValue));
			return (((result!=null)&&(result.textContent!=null))?result.textContent:defaultValue);
			},

		_GetFirstNodeInnerHTML: function(path,defaultValue,root){
			var result = this._GetFirstNode(path,root);
			DEBUG._Add('DOM',1,'_GetFirstNodeInnerHTML:: path:$1 root:$2 node:$3 result:$4',path,root,result,(((result!=null)&&(result.innerHTML!=null))?result.innerHTML:"(defaut)"+defaultValue));
			return (((result!=null)&&(result.innerHTML!=null))?result.innerHTML:defaultValue);
			},

		_GetLastNodeInnerHTML: function(path,defaultValue,root){
			var result = this._GetLastNode(path,root);
			DEBUG._Add('DOM',1,'_GetLastNodeInnerHTML:: path:$1 root:$2 node:$3 result:$4',path,root,result,(((result!=null)&&(result.innerHTML!=null))?result.innerHTML:"(defaut)"+defaultValue));
			return (((result!=null)&&(result.innerHTML!=null))?result.innerHTML:defaultValue);
			},

		// retourne la valeur de la clé "key" trouvé dans l'url
		// null: n'existe pas, true: clé existe mais sans valeur, autres: valeur
		_QueryString: function(key){
			var url = window.location.search,
				reg = new RegExp("[\?&]"+key+"(=([^&$]+)|)(&|$)","i"),
				offset = reg.exec(url);
			if (offset!=null){
				offset = _Exist(offset[2])?offset[2]:true;
				}
			DEBUG._Add('DOM',1,'_QueryString:: key:$1 offset:$2',key,offset);
			return offset;
			},
		};
	})();

/******************************************************
* OBJET IU - Interface Utilsateur
*
******************************************************/
var IU = (function(){
	return {
		// reçoit une liste d'éléments pour créér l'interface
		// ex: {'name':['input',{'type':'checkbox','checked':true},['coucou'],{'click':[start,5]},body]
		_CreateElements: function(list){
			var result = {};
			for (var key in list){
				var type = _Exist(list[key][0])?list[key][0]:null,
					attributes = _Exist(list[key][1])?list[key][1]:{},
					content = _Exist(list[key][2])?list[key][2]:[],
					events = _Exist(list[key][3])?list[key][3]:{},
					node = _Exist(result[list[key][4]])?result[list[key][4]]:(_Exist(list[key][4])?list[key][4]:null);
				DEBUG._Add('IU',1,'_CreateElements:: type:$1 attributes:$2 content:$3 events:$4',type,attributes,content,events);
				if (type!=null) result[key] = this._CreateElement(type,attributes,content,events,node);
				}
			return result;
			},

		_CreateElement: function(type,attributes,content,events,node){
			if (_Exist(type)&&type!=null){
				attributes = _Exist(attributes)?attributes:{};
				content = _Exist(content)?content:[];
				events = _Exist(events)?events:{};
				node = _Exist(node)?node:null;
				var result = document.createElement(type);
				for (var key in attributes){
					DEBUG._Add('IU',1,'_CreateElement::Attribute:: key:$1 value:$2',key,attributes[key]);
					if (_Type(attributes[key])!='Boolean') result.setAttribute(key,attributes[key]);
					else if (attributes[key]==true) result.setAttribute(key,key.toString());
					}
				for (var key in events){
					DEBUG._Add('IU',1,'_CreateElement::Event:: key:$1 $2, $3',key,events[key][0],events[key][1]);
					this._addEvent(result,key,events[key][0],events[key][1]);
					}
				for (var i=0; i<content.length; i++){
					DEBUG._Add('IU',1,'_CreateElement::Content:: $1 $2',i,content[i]);
					if (_Type(content[i])==='Object') result.appendChild(content[i]);
					else result.textContent+= content[i];
					}
				if (node!=null) node.appendChild(result);
				return result;
				}
			else return null;
			},

		// IU._addEvent(obj: objet,type: eventype,fn: function,par: parameter);
		// function fn(e,par) {alert('result : ' + this.value+e.type+par);}
		// this = obj, e = event
		// ex : IU._addEvent(result,'click',test,"2");
		_addEvent: function(obj, type, fn, par){
			var funcName = function(event){return fn.call(obj, event, par);};
			obj.addEventListener(type,funcName,false );
			DEBUG._Add('IU',1,'_addEvent:: $1 $2 $3 $4',obj, type, fn, par);
			return funcName;
			},

		// pour "fn" utiliser la valeur "funcName" renvoyé par _addEvent
		_removeEvent: function(obj,type,fn){
			obj.removeEventListener(type, fn, false );
			},
		};
	})();

/******************************************************
* OBJET L - localisation des chaînes de caractères (STRING) et expressions régulières (RegExp)
*
******************************************************/
var L = (function(){
	var locStr = {// key:[français,anglais,polonais]
		//DATAS
		"sNiveau":["NIVEAU ([0-9]+)","LEVEL ([0-9]+)","POZIOM ([0-9]+)"],
		"sXP":
			["EXPÉRIENCE: <strong>([0-9 ]+)<\\/strong> \\/ ([0-9 ]+)",
			"EXPERIENCE: <strong>([0-9 ]+)<\\/strong> \\/ ([0-9 ]+)",
			"DOŚWIADCZENIE: <strong>([0-9 ]+)<\\/strong> \\/ ([0-9 ]+)"],
		"sPdP":
			["PTS DE PROGRÈS: <strong>([0-9 ]+)<\\/strong>",
			"PTS OF PROGRESS: <strong>([0-9 ]+)<\\/strong>",
			"PKT ROZWOJU: <strong>([0-9 ]+)<\\/strong>",],
		"sLOL":["([0-9 ]+) LOL","([0-9 ]+) Lgo","([0-9 ]+) PLN"],
		"sPopulation":["([0-9 ]+) "],
		"sDeconnecte":
			["Vous avez été déconnecté en raison d`une longue inactivité.",
			"You have been logged out because of inactivity.",
			"Nastąpiło wylogowanie z powodu zbyt długiej bezczynności."],
		"sCourtePause":
			["Une courte pause est en court en raison de l`actualisation du classement général",
			"Please wait a moment while the rankings are being updated.",
			"Trwa przerwa związana z aktualizacją rankingu gry."],
		//<td><strong><u>Une pause en raison de conservation est en court.</u><br /><br />Vous êtes prié(e) de ressayer dans quelques minutes.</strong></td>
		//<td><strong><u>Une pause est en court en raison du proces de sauvegarde de la base de données.</u> <br />
		//INIT
		"sUnknowPlayer":
			["Erreur : Arrêt du script. Le nom du vampire n'est pas accessible sur cette page.",
			"Error: Stopping the script. The name of the vampire is not available on this page.",
			"Błąd: Zatrzymanie skryptu.Nazwa wampir nie jest dostępna na tej stronie."],
		"sUnknowID":
			["Le nom de ce vampire doit être lié à son ID. Merci de consulter la Salle du Trône pour rendre le script opérationnel.\n\nCe message est normal si vous utilisez ce script pour la première fois ou si vous avez changé le nom du vampire.",
			"The name of this vampire must be linked to her ID. Please consult the Throne Room to make the script running.\n\nThis message is normal if you use this script for the first time or if you changed the name of the vampire.",
			"Nazwa tego wampira musi być związana z jej ID. Proszę zapoznać się z sali tronowej, aby skrypt uruchomiony.\n\nTo wiadomość jest normalne, jeśli użyć tego skryptu po raz pierwszy lub jeśli zmienił nazwę wampira."],
		// pOProfile/pProfile
		"sNameTest":["Profil du vampire (.+) ","Vampire profile (.+) ","Profil wampira (.+) "],
		"sSexeHomme":["Homme","Male","Mężczyzna"],
		"sSexeH":["H","M","M"],
		"sSexeF":["F","F","K"],
		"sProfAtt":["ATT:","ATT:","ATA:"],
		"sProfDef":["DEF:","DEF:","OBR:"],
		// Titres des colonnes
		"sColTitle":
			[["RACE","SEXE","ADRESSE","CLAN","<vide>","NIVEAU","POINTS","NIV (PTS)","GROUPE","STATUT","Place au classement","Date d`inscription","Dernière connexion","Provenance","HISTORIQUE","Nom","En ligne","<En ligne>","<Expéditions>","<Roi de la Colline>","Grade","A-B","<SEXE - icône>","ATT","<ATTAQUER>","DEF","PLACE","NOM","<N° du quartier>","MAÎTRE DU QUARTIER","ACTIONS"],
			["RACE","SEX","ADDRESS","CLAN","<empty>","LEVEL","POINTS","LVL (PTS)","GROUP","STATUS","Standing","Date of entry","Last logged","Provenance","HISTORY","Name","On-line","<On-line>","<Expedition>","King Of the hill","Rank","A-B","SEX - icon","ATT","<ATTACK>","DEF","STANDING","NAME"," N° of square","SQUARE OWNER","ACTIONS"],
			["RASA","PŁEĆ","ADRES","KLAN","<pusty>","POZIOM","PUNKTY","POZ (PKT)","GRUPA","STATUS","Miejsce w rankingu","Data dołączenia","Ostatnie logowanie","Pochodzenie","HISTORY","Imię","On-line","<On-line>","<Ekspedycja>","Król Wzgórza","Ranga","A-B","PŁEĆ - ikona","ATA","<NAPADNIJ>","OBR","MIEJSCE","IMIĘ","N° kwadratu","WŁADCA KWADRATU","DZIAŁANIA"]],
		// Titres des Groupes
		"BWEgrpA":["GROUPE A","GROUP A","GRUPA A"],
		"BWEgrpB":["GROUPE B","GROUP B","GRUPA B"],
		"BWEgrpNom":["Nom","Name","Imię"],
		"BWEgrpRace":["Race","Race","Rasa"],
		"BWEgrpNiv":["Niv","Lvl","Poz"],
		"BWEgrpPts":["Pts","Pts","Pkt"],
		"BWEgrpAct":["ACTIONS","ACTIONS","AKCJA"],
		"BWEgrpPl":["$1 joueur","$1 player","$1 gracz"],
		"BWEgrpPls":["$1 joueurs","$1 players","$1 gracze"],
		"BWEgrpTt":["Somme:","Sum:","Suma:"],
		"BWEgrpMoy":["Moyenne:","Average:","Średnia:"],		
		// Divers
		"sNivFormat":["$1 ($2)"],
		// Race
		"sRaces":[["ABSORBEUR","CAPTEUR D`ESPRIT","CULTISTE","DAMNÉ","SEIGNEUR DES BÊTES"],
			["ABSORBER","THOUGHTCATCHER","CULTIST","CURSED ONE","BEASTMASTER"],
			["SSAK","ŁAPACZ MYŚLI","KULTYSTA","POTĘPIONY","WŁADCA ZWIERZĄT"]],
		// tri
		"sTriUp":["▲"],
		"sTriDown":["▼"],
		"sTriOLTest":
			["^(([0-9]+) j\\. |)(([0-9]+) h |)(([0-9]+) min |)(([0-9]+) sec\\.|)\\s?$",
			"^(([0-9]+) day\\(s\\) |)(([0-9]+) hour\\(s\\) |)(([0-9]+) min\\. |)(([0-9]+) sec\\.|)\\s?$",
			"^(([0-9]+) d\\. |)(([0-9]+) godz\\. |)(([0-9]+) min\\. |)(([0-9]+) sek\\.|)\\s?$"],
		"sTriImgTest":[".*/._(ok|not)\\.gif",],
		"sTriAdrTest":["([0-9]+)\\/([0-9]+)\\/([0-9]+)"],
		"sTriNbTest":["^([0-9]+(?:\\.[0-9]+)?)$"],
		"sTriPtsTest":["^[0-9]+ \\(([0-9 ]+)\\)$"],
		"sTriPrcTest":["^([0-9]+)\\([0-9 ]+\\%\\)$"],
		// historique
		"sLogTitle":[["N°","Date","Emb.(%)","PV Att.","PV Déf.","Arc.Att.","Arc.Déf.","Evo.Att.","Evo.Déf.","Cara.Att.","Cara.Déf.","Obj.Att.","Obj.Def.","Ressources"],
			["N°","Date","Emb.(%)","HP Att.","HP Def.","Arc.Att.","Arc .ef.","Evo.Att.","Evo.Def.","Char.Att.","Char.Def.","Obj.Att.","Obj.Def.","Resources"],
			["N°","Data","Zas.(%)","PŻ Nap.","PŻ Obr.","Ark.Ata","Ark.Obr.","Ewo.Ata","Ewo.Obr.","Char.Ata.","Char.Obr.","Obi.Ata.","Obi.Obr.","Zasoby"]],		
		"sLogVS":["$1 VS $2"],
		"sLogTime1":["$1s"],
		"sLogTime2":["$1m"],
		"sLogTime3":["$1h","$1h","$1g"],
		"sLogTime4":["$1j","$1d","$1d"],
		"sLogTime5":["+1an","+1y","+1rok"],
		"sLogTime6":["$1/$2/$3"],
		"sLogNC":["Analyse nécessaire","Analysis required","Analiza wymagane"],
		"sNC":["INCONNUE","UNKNOW","NIEZNANY"],
		"sArc":[["Silence du Sang","Absorption de la Force","Le pouvoir du Sang","Masque d`Adonis","Masque de Caligula","La Majesté","Sang de la Vie","Voies Félines","L`Ardeur du Sang","Le Chasseur de la Nuit","Le Souffle Mortel","L`Horreur","Frénésie Sauvage","Peau de Bête","L`Ombre de la Bête"],
			["Silence of Blood","Power absorption","Power of Blood","Mask of Adonis","Mask of Caligula","Majesty","Blood of Life","Cat`s Paths","Searing Blood","Night Hunter","Breath of Death","Horror","Bloodfrenzy","Beast`s Hide","Shadow of the Beast"],
			["Cisza Krwi","Wyssanie mocy","Moc Krwi","Maska Adonisa","Maska Kaliguli","Majestat","Krew Życia","Kocie Ścieżki","Żar Krwi","Nocny Łowca","Tchnienie Śmierci","Groza","Dziki Szał","Skóra Bestii","Cień Bestii"]],
		"sEvo":[["Les Ailes","Carapace","Canines/Griffes/Pointes","Glandes à venin","Tendons renforcés","Chambre supplémentaire","Le sang du démon","Mutation ADN","Eclairé","Sixième sens","Absorption","Développement Harmonieux","Mana Purifiée","Mémoire Ancestrale","Puissance"],
			["Wings","Carapace","Claws/Fangs/Quills","Venom glands","Hardened tendons","Additional cavity","Daemon blood","Mutated DNA","Enlightened","Sixth sense","Absorption","Harmonious development","Mana contamination","Memory of the ancestors","Might"],
			["Skrzydla","Pancerz","Kly/Pazury/Kolce","Gruczoly jadowe","Wzmocnione sciegna","Dodatkowa komora","Krew demona","Mutacja DNA","Oswiecony","Szósty zmysl","Absorpcja","Harmonijny rozwój","Skażenie Maną","Pamięć przodków","Potęga"]],
		"sChar":[["NIVEAU","Pts DE VIE","Défense","FORCE","AGILITÉ","RÉSISTANCE","APPARENCE","CHARISME","RÉPUTATION","PERCEPTION","INTELLIGENCE","SAVOIR","AGI+PER"],
			["LEVEL","HIT POINTS","Defence","STRENGTH","AGILITY","TOUGHNESS","APPEARANCE","CHARISMA","REPUTATION","PERCEPTION","INTELLIGENCE","KNOWLEDGE","AGI+PER"],
			["POZIOM","PKT. ŻYCIA","Obrona","SIŁA","ZWINNOŚĆ","ODPORNOŚĆ","WYGLĄD","CHARYZMA","WPŁYWY","SPOSTRZEGAWCZOŚĆ","INTELIGENCJA","WIEDZA","ZWI+SPO"]],
		"sObjet":[["Sang de loup","Pomme de l`Arbre Ferreux","Nageoire de requin","Élixir des sens","Eau bénite","Larme de phénix","Cachet magique","Coeur de chauve-souris","Fleur de lotus","Venin de puce géante","Sérum d`illumination","Bouillon de chat noir","Charbon","Fourrure de taupe","Salpêtre",
			"Essence de jouvence","Ongle de troll","Belladones","Oeil de chat","Absinthe","Écaille de salamandre","Eau de source","Os de martyre","Élixir d`amour","Venin de scorpion","Racine de mandragore","Poussière d`étoile","Fiole d`acide","Soufre","Diamant noir",
			"Larme divine","Dent de ghoule","Bouillon de corail","Coeur de prophète","Griffe du basilic","Ecailles de démon","Ailes du scarabée","Masque de gargouille","Jus de mante religieuse","Souffle du dragon","Dent de sorcière","Grimoire","Appendice noire","Doigt de forgeron","Fleur de lila"],
			["Wolf Blood","Iron Tree Apple","Shark Fin","Elixir of Senses","Blessed Water","Phoenix Tear","Magic Seal","Bat Heart","Black Lotus","Gigaflea Venom","Serum of Enlightenment","Brew of the Black Cat","Coal","Mole Fur","Saltpetre",
			"Essence of Youth","Troll Nail","Deadly Nightshade","Eye of the Cat","Absinthe","Salamander Scales","Spring Water","Bone of the Martyr","Love Beverage","Scorpid Venom","Mandrake Root","Star Dust","Vial of Acid","Sulphur","Black Diamond",
			"Divine Tear","Ghoul`s Tooth","Coral Concoction","Heart of a Prophet","Basilisk`s Claw","Demon`s Scales","Beetle Wings","Gargoyle`s Mask","Mantis Juice","Dragon`s Breath","Tooth of a Witch","Grimoire","Black Bile","Blacksmith`s Finger","Elderberry Flower"],
			["Krew wilka","Jablko Zelaznego drzewa","Pletwa rekina","Eliksir zmyslów","Swiecona woda","Lza feniksa","Magiczna pieczec","Serce nietoperza","Kwiat lotosu","Jad Wielkopchly","Serum oswiecenia","Wywar z czarnego kota","Wegiel","Siersc kreta","Saletra",
			"Esencja mlodosci","Paznokiec trolla","Wilcza jagoda","Oko kota","Absynt","Luski salamandry","Woda zródlana","Kosc meczennika","Napój milosny","Jad Skorpiona","Korzen Mandragory","Gwiezdny pyl","Fiolka kwasu","Siarka","Czarny diament",
			"Boska łza","Ząb ghula","Wywar z koralowca","Serce proroka","Pazur bazyliszka","Łuski demona","Skrzydła chrząszcza","Maska gargulca","Sok z modliszki","Oddech smoka","Ząb wiedźmy","Grimoire","Czarna żółć","Palec kowala","Kwiat bzu"]],
		"sRes":[["PdP","PdH","Pts évo.","LOL","Sang","Pop."],
				["PoP","PoH","Evo. pts","Lgo","blood","People"],
				["Pkt roz.","Pkt rep.","Pkt ewo.","PLN","Krew","Ludzie"]],
		// pMsgList/pMsgSaveList
		"sTitleIndex":["Titre du message","Message title","Tytuł wiadomości"],
		"sDateIndex":["Date d`envoi","Send date","Data wysłania"],
		"sAmbushMsg1":
			[".(.+) a préparé une embuscade contre toi!",
			".(.+) ambushed you!",
			".(.+) urządził[a]? na Ciebie zasadzkę!"],
		"sAmbushMsg2":
			["Tu as préparé une embuscade contre (.+)\\.",
			"You ambushed (.+)\\.",
			"Urządził[ae]ś zasadzkę na (.+)\\."],
		// pMsg/pMsgSave
		"sAmbushTest1":
			["<a[^<>]+>([^<>]+)<\\/a> a organisé une embuscade contre <a[^<>]+>([^<>]+)<\\/a> !",
			"<a[^<>]+>([^<>]+)<\\/a> ambushed <a[^<>]+>([^<>]+)<\\/a> !",
			"<a[^<>]+>([^<>]+)<\\/a> urządził[a]? zasadzkę na <a[^<>]+>([^<>]+)<\\/a> !"],
		"sAmbushTest2":
			["Chance de réussite de l`embuscade: ([0-9]+,[0-9]+) %",
			"Chance of successful ambush ([0-9]+,[0-9]+) %",
			"Szansa na udaną zasadzkę: ([0-9]+,[0-9]+) %"],
		"sAmbushTest3":
			["$1 a préparé un plan minutieux",
			"$1 prepared an elaborate plan",
			"$1 przygotował[a]? misterny plan"],
		"sAmbushTest4":
			["Grâce à une action habilement menée, ",
			"Thanks to the perfectly prepared ambush ",
			"Dzięki świetnie przeprowadzonej zasadzce "],
		"sAmbushTest5":
			["L`attaque sur <b>$1<\\/b> n`était pas une très bonne idée",
			"The attack on <b>$1<\\/b> was not a good idea",
			"Atak na <b>$1<\\/b> nie był najlepszym pomysłem"],
		"sAmbushTest6":
			["Les deux adversaires étaient très bien préparés au combat",
			  "Both sides were well prepared",
			 "Obie strony były świetnie przygotowane"],
		"sAmbushTest7":["([0-9]+) \\/ ([0-9]+)<br>([0-9]+) \\/ ([0-9]+)"],
		"sAmbushTest8":
			["(<b>([^<>]+)<\\/b> utilise l`arcane <span.+>([^<>]+)<\\/span> niveau <b>([0-9]+)<\\/b>\\.)+",
			"(<b>([^<>]+)<\\/b> uses arcana <span.+>([^<>]+)<\\/span> level <b>([0-9]+)<\\/b>\\.)+",
			"(<b>([^<>]+)<\\/b> używa arkana <span.+>([^<>]+)<\\/span> poziom <b>([0-9]+)<\\/b>\\.)+"],
		"sAmbushTest9":
			["(<b>([^<>]+)<\\/b> utilise l`évolution: (<span[^>]+>[^<>]+<\\/span>[., ]+)+)+",
			"(<b>([^<>]+)<\\/b> uses evolution: (<span[^>]+>[^<>]+<\\/span>[., ]+)+)+",
			"(<b>([^<>]+)<\\/b> korzysta z ewolucji: (<span[^>]+>[^<>]+<\\/span>[., ]+)+)+"],
		"sAmbushTest10":
			["(<span[^>]+>([^<>]+) niv. ([0-9]+)<\\/span>)+",
			 "(<span[^>]+>([^<>]+) lvl ([0-9]+)<\\/span>)+",
			 "(<span[^>]+>([^<>]+) poz. ([0-9]+)<\\/span>)+"],
		"sAmbushTest11":["<td[^<>]+><b>([^<>]+)<\\/b><\\/td><td[^<>]+>$1<\\/td><td[^<>]+><b>([^<>]+)<\\/b>"],
		"sAmbushTest12":
			["(<b>([^<>]+)<\\/b> utilise l`objet[^<>]+<span.+>([^<>]+)<\\/span>\\.)+",
			"(<b>([^<>]+)<\\/b> uses item[^<>]+<span.+>([^<>]+)<\\/span>\\.)+",
			"(<b>([^<>]+)<\\/b> używa przedmiotu[^<>]+<span.+>([^<>]+)<\\/span>\\.)+"],
		"sAEFormat":["$1 x$2"],
		"sPVFormat":["$1/$2"],
		"sAmbushTest13":
			["<b>$1<\\/b> mord le vampire vaincu dans la nuque et lui suce <b>([0-9]+)<\\/b> pts de progrès\\.",
			"<b>$1<\\/b> bit into the enemy`s neck and sucked out <b>([0-9]+)<\\/b> experience pts\\.",
			"<b>$1<\\/b> wgryza się w szyję pokonanego wroga i wysysa <b>([0-9]+)<\\/b> pkt doświadczenia\\."],
		"sAmbushTest14":
			["(?:<b>|)$1(?:<\\/b>|) mord le vampire vaincu dans la nuque, lui suce (?:<b>|)([0-9]+)(?:<\\/b>|) pts de progrès et obtient (?:<b>|)([0-9]+)(?:<\\/b>|) pts d`honneur\\.",
			"<b>$1<\\/b> bit into the enemy`s neck and sucked out <b>([0-9]+)<\\/b> experience pts and gained <b>([0-9]+)<\\/b> honour pts\\.",
			"<b>$1</b> wgryza się w szyję pokonanego wroga i wysysa <b>([0-9]+)<\\/b> pkt doświadczenia oraz otrzymuje <b>([0-9]+)<\\/b> pkt reputacji\\."],
		"sAmbushTest15":
			["(?:<b>|)$1(?:<\\/b>|) paie une rançon d`un montant de (?:<b>|)([0-9]+) LOL(?:<\\/b>|), (?:<b>|)([0-9]+)(?:<\\/b>|) litre\\(s\\) de sang et.+lui livre (?:<b>|)([0-9]+)(?:<\\/b>|) hommes comme esclaves\\.",
			"<b>$1<\\/b> paid ransom of <b>([0-9]+) Lgo<\\/b>, <b>([0-9]+)<\\/b> litres of blood and gave <b>([0-9]+)<\\/b> prisoners\\.",
			"<b>$1<\\/b> płaci okup w wysokości <b>([0-9]+) PLN<\\/b>, <b>([0-9]+)<\\/b> litrów krwi oraz oddaje <b>([0-9]+)<\\/b> ludzi w niewolę\\."],
		"sAmbushTest16":
			["<b>$1<\\/b> reçoit <b>([0-9]+)<\\/b> pts d`évolution\\!",
			"<b>$1<\\/b> gains <b>([0-9]+)<\\/b> evolution pts\\!",
			"<b>$1<\\/b> zdobywa <b>([0-9]+)<\\/b> pkt ewolucji\\!"],
		//RC
		"sRCTest":["^([^,]+), ([^,]+).$"],
		"sRCLeft":["^<b>([^<>]+)<\\/b>.+$"],
		"sRCDead":["^<b>([^<>]+)<\\/b> (?:finit|fini) sa (?:non-|)vie sur le champ de bataille.$",
				"^<b>([^<>]+)<\\/b> is slain on the battlefield.$",
				"^<b>([^<>]+)<\\/b> kończy swoje nie-życie na polu walki.$"],
		"sRCRight1":["^<b>([^<>]+)<\\/b> obtient des dommages de <b>(\\d+)<\\/b> PTS DE VIE$",
					"^<b>([^<>]+)<\\/b> takes <b>(\\d+)<\\/b> damage$",
					"^<b>([^<>]+)<\\/b> zostaje zraniony za <b>(\\d+)<\\/b> PKT ŻYCIA$"],
		"sRCRight2":["^<b>([^<>]+)<\\/b> évite le coup$",
					"^<b>([^<>]+)<\\/b> dodges the strike$",
					"^<b>([^<>]+)<\\/b> unika ciosu$"],
		"sRCRight3":["^<b>([^<>]+)<\\/b> effectue une série d`esquives et évite la frappe$",
					"^<b>([^<>]+)<\\/b> performs a series of feints and dodges the strike$",
					"^<b>([^<>]+)<\\/b> wykonuje serię zwodów i unika trafienia$"],
		"sRCArdeur":["<b>L`Ardeur du Sang</b>","<b>Searing Blood</b>","<b>Żar Krwi</b>"],
		"sRCCrit":["<b>un coup critique</b>","<b>strikes critically</b>","<b>cios krytyczny</b>"],
		"sRCHeal":["^(?:Une force miraculeuse fait que |)<b>([^<>]+)<\\/b> regagne <b>(\\d+)<\\/b> PTS DE VIE.$",
					"^(?:A miraculous power makes |)<b>([^<>]+)<\\/b> regenerate[s]? <b>(\\d+)<\\/b> HP.$",
					"^(?:Cudowna siła sprawia, że |)<b>([^<>]+)<\\/b> odzyskuje <b>(\\d+)<\\/b> PKT ŻYCIA.$"],
		"sRCLeach":["^<b>([^<>]+)<\\/b> perd <b>(\\d+)<\\/b> PTS DE VIE.$",
					"^<b>([^<>]+)<\\/b> loses <b>(\\d+)<\\/b> HP.$",
					"^<b>([^<>]+)<\\/b> traci <b>(\\d+)<\\/b> PKT KRWI.$"],
		"sRCTitle1":["ANALYSE DU COMBAT *","ANALYSIS OF BATTLE *","ANALIZA BITWY *"],
		"sRCMsg":["* Excepté pour les PV perdus, l`Ardeur du Sang n'est pas pris en compte sur ce tableau",
			"* Except for PV lost, Searing Blood is not taken into account in this table",
			"* Poza PV zagubionych, Żar Krwi nie jest brane pod uwagę w tej tabeli"],
		"sRCTitle2":["DOMMAGES / MANCHE","DAMAGE / ROUND","SZKÓD / RUNDA"],
		"sRCTitle3":["INITIATIVE / MANCHE","INITIATIVE / ROUND","INICJATYWA / RUNDA"],
		"sRCTAtt":["Attaque","Attack","Atak"],
		"sRCTDmg":["Dommages","Damage","Szkód"],
		"sRCTDef":["Défense","Defence","Obrona"],
		"sRCTPV":["PV","HP","PŻ"],
		"sRCTDead":["Mort","Dead","Martwy"],
		"sRCTName":["Nom","Name","Imię"],
		"sRCTNb":["NB","NB","NM"],
		"sRCTHit":["Touché","Hit","Hit"],
		"sRCTCC":["CC","SC","CK"],
		"sRCTFail":["Raté","Mis.","Unik"],
		"sRCTEsq":["Esq.","Fei.","Zwo."],
		"sRCTtotal":["Total","Total","łączny"],
		"sRCTMin":["Min","Min","Min"],
		"sRCTMax":["Max","Max","Mak"],
		"sRCTMoy":["Moy.","Ave.","Śre."],
		"sRCTLose":["-"],
		"sRCTWin":["+"],
		"sRCTRd":["Manche","Round","Runda"],
		// pMkstone et autres
		"sTotal":["Total: ","Total: ","łączny: "],
		// pAmbushRoot
		"sMidMsg":["a=msg&do=view&mid=([0-9]+)"],
		"sAtkTime":["timeFields\\.atkTime = ([0-9]+)"],
		// pRootSettings pSettingsAi pSettingsAcc pSettingsVac pSettingsDelchar
		"sTitleMenu1":["BWE - OPTIONS","BWE - OPTIONS","BWE - OPCJE"],
		"sTitleMenu2":["BWE - BASE DE DONNÉES","BWE - DATABASE","BWE - BAZY DANYCH"],
		"sInfoMsg":
			["Un simple clic pour afficher/masquer les colonnes souhaitées dans la liste concernée. Désactiver une liste désactive aussi la collecte des données de cette liste. Désactiver la colonne Groupe désactive les tableaux correspondants.",
			"A single click to show/hide the columns you want on the appropriate list. Disable a list also disables the collection of data from this list. Disable the Group column disables the corresponding tables.",
			"Jedno kliknięcie, aby pokazać/ukryć kolumny, które mają na odpowiedniej liście. Wyłącz lista wyłącza także zbierania danych z tej listy. Wyłącz kolumna Grupa wyłącza odpowiednie tabele."],
		"sTitleList":["LISTES","LISTS","LISTY"],
		"sColOClan":["Votre Clan","Clan owner","Twój Klan"],
		"sColClan":["Autres Clans","Other Clans","Innych Rodów"],
		"sColRank":["Classement","Ranking","Ranking"],
		"sColTown":["Vue sur la Cité","View of the city","Widok na miasto"],
		"sTitleLog":["HISTORIQUE","HISTORY","HISTORIA"],
		"sColLogA":["Attaque","Attack","Atak"],
		"sColLogD":["Défense","Defence","obrona"],
		"sColCarA":["Caractéristiques Att.","Att. characteristics","Charakterystyka Atak"],
		"sColCarD":["Caractéristiques Déf.","Def. characteristics","Charakterystyka Obr."],
		"sColRes":["Ressources","Resources","Zasoby"],
		"sTitleProf":["PROFILES","PROFILES","PROFILE"],
		"sColOProf":["Votre Profile","Profile owner","Twój Profil"],
		"sColProf":["Autres Profiles","Other Profiles","Inne Profile"],
		"sTitleDivers":["DIVERS","MISCELLANEOUS","RÓŻNE"],
		"sMenuDesc":["Afficher/Masquer les descriptions","Show/Hide descriptions","Pokaż/ukryj opisy"],
		"sMenuAmis":["Tri par nom de la liste des amis","Sort by name from the list of friends","Sortuj według nazwy z listy znajomych"],
		"sMenuStones":["Total des pierres","Total stones","Całkowitej kamienie"],
		"sMenuTri":["Options de tri","Sort options","Opcje sortowania"],
		"sMenuLog":["Historique (collecte des données)","History (data collection)","Historia (zbieranie danych)"],
		"sTitleAEmbu":["Aide aux embuscades","Help for ambushes","Pomoc dla zasadzki"],
		"sAEHelp":[
			"Cette option fera clignoter l\\'icône d\\'attaque des cibles pouvant être embusquées.<br>Pour une sélection plus précise, remplissez les critères de niveau ou de classement (vide = critère désactivé).<br>Les critères de classement ne sont actifs que sur la page de Classement. De plus, le classement de votre personnage n\\'étant pas accessible sur toutes les pages, les critères de classement par \\'Ecart\\' peuvent être erronés.<br><br>Exemple : pour sélectionner les cibles apportant 2 points d\\'évolution, mettez 15.5 dans le champ \\'Ecart inférieur\\' du niveau, 50 dans le champ \\'Ecart supérieur\\' du classement et laissez les autres champs vides.",
			"This option will flash the icon of attack targets that can be ambushed.<br>For a more accurate selection, complete the criteria for rank or level (Empty = off criterion).<br>The ranking criteria are only active on the page rank. Moreover, the ranking of your character is not available on all pages, the ranking criteria for \\'gap\\' may be misleading.<br><br>Example: to select the target providing two points of evolution, put 15.5 in the \\'Gap lower\\' level, 50 in the \\'Gap higher\\' ranking and leave the other fields empty.",
			"Opcja ta będzie migać ikonę cele ataków, które mogą zostać zaatakowani.<br>Do wyboru bardziej dokładne, kompletne kryteria rangi i poziomu (Puste = off kryterium).<br>Według kryteriów są aktywne tylko na page rank. Ponadto ranking swojej postaci nie jest dostępny na wszystkich stronach, według kryteriów dla \\'luki\\' może być mylące.<br><br>Przykład: aby ustawić cel dostarczanie dwa punkty ewolucji, nakłada 15.5 w \\'odchylenie dolnej\\' poziomie, 50 w \\'odchylenia wyższej\\' rankingu i pozostawić pozostałe pola puste."],
		"sAENiv":["Niveau:","Level:","Poziom:"],
		"sAEcla":["Classement:","Ranking:","Ranking:"],
		"sAEnMin":["- Minimum","- Minimum","- Minimalny"],
		"sAEnMax":["- Maximum","- Maximum","- Maksymalny"],
		"sAEaMin":["- Ecart inférieur","- Gap lower","- luka niższy"],
		"sAEaMax":["- Ecart supérieur","- Gap higher","- luka wyższa"],
		"sMenuRc0":["Résultats de combat - Total des dommages","Combat results - Total damage","Walka wyniki - Łączna wartość szkód"],
		"sMenuRc1":["Résultats de combat - Table d'analyse","Combat results - Analysis table","Walka wyniki - Analiza tabeli"],
		"sMenuRc2":["Résultats de combat - Table des dommages","Combat results - Table of damage","Walka wyniki - Tabela uszkodzenia"],
		"sMenuRc3":["Résultats de combat - Table des initiatives","Combat results - Table of initiatives","Walka wyniki - Tabela inicjatyw"],
		"sDefaut":["Par défaut","By default","Zaocznie"],
		"sAlertMsg":
			["ATTENTION! Cette page vous permet d'effacer les données du Script. A utiliser avec précaution.",
			"WARNING! This page allows you to delete data script. Use with caution.",
			"UWAGA! Ta strona pozwala usunąć skrypt danych. Stosować z ostrożnością."],
		"sTitleLS":["BASE DE DONNEES v$1 - LOCALSTORAGE","DATABASE - LOCALSTORAGE","BAZY DANYCH - LOCALSTORAGE"],
		"sDelete":["Supprime","Delete","Usuwa"],
		"sRAZ":["RAZ","RAZ","RESET"],
		"sRazChkLS":
			["Voulez vraiment effacer l'ensemble des données Localstorage ?",
			"Really want to erase all data localStorage?",
			"Naprawdę chcesz usunąć wszystkie dane LocalStorage?"],
		"sLabelSearch":["Filtre","Filter","Filtr"],
		"sResult":["$1 résultat(s) sur $2","$1 of $2 results","$1 z $2 wyników"],
		"sTitleIE":["IMPORT/EXPORT HISTORIQUE","IMPORT/EXPORT HISTORY","PRZYWÓZ/WYWÓZ HISTORIA"],
		"sExportText":["Zone d'exportation","Export Area","Eksport przestrzeni"],
		"sExportHelp":["Cliquer sur START pour générer les données.<br>Recopier celle-ci à partir du cadre ci dessous pour les coller dans la zone import de l\\'autre navigateur.<br>Contient uniquement l\\'historique de votre vampire.",
			"Click on START to generate the data.<br>Copy it from the frame below to paste into the import area to the other browser.<br>Contains only the history of your vampire.",
			"Kliknij na START, aby wygenerować dane.<br>Skopiuj go z ramki poniżej wkleić do obszaru na przywóz do innej przeglądarki.<br>Zawiera tylko historię swojego wampira."],
		"sImportText":["Zone d'importation","Import area","Powierzchnia importu"],
		"sImportHelp":["Coller les données en provenance d\\'un autre navigateur dans ce cadre puis cliquer sur IMPORT.<br>Ne prend en compte que l\\'historique de votre vampire.",
			"Paste data from another browser in this frame then click on IMPORT.<br>Only takes into account the history of your vampire.",
			"Wklej dane z innej przeglądarki w tej ramce a następnie kliknij Import.<br>Tylko bierze pod uwagę historię swojego wampira."],
		"sOutputLog":["START","START","START"],
		"sImportLog":["IMPORT","IMPORT","PRZYWÓZ"],
		"sIEResult":["$1 résultat(s)","$1 results","$1 wyników"],
		};
	var langue; // 0 = français par défaut, 1 = anglais, 2 = polonais
	if (/^http\:\/\/r[0-9]*\.fr\.bloodwars\.net/.test(location.href)) langue = 0;
	else if (/^http\:\/\/r[0-9]*\.bloodwars\.net/.test(location.href)) langue = 1;
	else if (/^http\:\/\/r[0-9]*\.bloodwars\.interia\.pl/.test(location.href)||/^http\:\/\/beta[0-9]*\.bloodwars\.net/.test(location.href)) langue = 2;
	else langue = 0;
	//throw new Error("Erreur : le langage de ce serveur n\'est pas reconnu par le script.");
	return {
	//public stuff
		// Retourne la chaine ou l'expression traduite.
		// Remplace les éléments $1,$2... par les arguments transmis en complément.
		// Le caractère d'échappement '\' doit être doublé pour être pris en compte dans une expression régulière.
		// ex: "test": ["<b>$2<\/b> a tué $1 avec $3.",]
		// L._Get('test','Dr Moutarde','Mlle Rose','le chandelier'); => "<b>Mlle Rose<\/b> a tué le Dr Moutarde avec le chandelier."
		_Get: function(key){
			var result = locStr[key];
			if (!_Exist(result)) throw new Error("L::Error:: la clé n'existe pas : "+key);
			if (_Exist(result[langue])) result = result[langue];
			else result = result[0];
			for (var i=arguments.length-1;i>=1;i--){
				var reg = new RegExp("\\$"+i,"g");
				result = result.replace(reg,arguments[i]);
				}
			DEBUG._Add('L',1,'_Get:: langue:$1 result:$2',langue,result);
			return result;
			},
		};
	})();

/******************************************************
* OBJET DATAS - Fonctions d'accès aux données de la page
* Chaque fonction retourne 'null' en cas d'échec
******************************************************/
var DATAS = (function(){
	// pour _Time()
	var timeDiff = null,
		stTime = new Date(),
		result = DOM._GetFirstNodeInnerHTML("/html/body/script",null),
		result2 = /var timeDiff = ([0-9]+) - Math\.floor\(stTime\.getTime\(\)\/1000\) \+ ([0-9]+) \+ stTime\.getTimezoneOffset\(\)\*60;/.exec(result);
	if (result2!=null) timeDiff = parseInt(result2[1]) - Math.floor(stTime.getTime()/1000) + parseInt(result2[2]) + stTime.getTimezoneOffset()*60;

	var _PlayerExpBar = function(){
		var stats=DOM._GetFirstNode("//div[@class='stats-player']/div[@class='expbar']"),
			player_datas=stats?stats.getAttributeNode('onmouseover').value:null;
		DEBUG._Add('DATAS',2,'_PlayerExpBar:: player_datas:$1',player_datas);
		return player_datas;
		};
	return {
	/* données du serveur */
		_Time: function(){
			var stTime = new Date();
			if (timeDiff!=null)	stTime.setTime((timeDiff*1000)+stTime.getTime());
			else stTime=null;
			DEBUG._Add('DATAS',1,'_Time:: $1 $2',timeDiff,stTime!=null?stTime.toLocaleString():null);
			return stTime;
			},

		_Version: function(){
			var result = DOM._GetFirstNodeTextContent("//div[@class='version']/a/b",null);
			var version = /v [0-9]+[0-9.a-z]*/.exec(result);
			DEBUG._Add('DATAS',1,'_Version:: $1',version)
			return version;
			},

		_Royaume: function(){
			var	royaume = DOM._GetFirstNodeTextContent("//div[@class='gameStats']/b[1]", null);
			DEBUG._Add('DATAS',1,'_Royaume:: $1',royaume)
			return royaume;
			},

		_Population: function(){
			var population = DOM._GetFirstNodeTextContent("//div[@class='gameStats']/b[3]", null);
			if (population!=null) population=parseInt((population).replace(/ /g,""));
			DEBUG._Add('DATAS',1,'_Population:: $1',population)
			return population;
			},

	/* données du joueur */
		_PlayerName: function(){
			var playerName = DOM._GetFirstNodeTextContent("//div[@class='stats-player']/a[@class='me']", null);
			DEBUG._Add('DATAS',1,'_PlayerName:: $1',playerName)
			return playerName;
			},

		_PlayerZone: function(){
			var result = DOM._GetFirstNodeTextContent("//div[@class='stats-player']/span[@class='panel-cell']", null);
			var playerZone = /(([0-9]+)\/([0-9]+)\/([0-9]+))/.exec(result);
			DEBUG._Add('DATAS',1,'_PlayerZone:: $1',playerZone)
			return playerZone;
			},

		_PlayerLevel: function(){ // Niveau => /NIVEAU ([0-9]+)/
			var playerLevel = new RegExp(L._Get('sNiveau')).exec(_PlayerExpBar());
			if (playerLevel!=null) playerLevel=parseInt((playerLevel[1]).replace(/ /g,""));
			DEBUG._Add('DATAS',1,'_PlayerLevel:: $1',playerLevel)
			return playerLevel;
			},

		_PlayerXP: function(){// XP - XP limite => /EXPÉRIENCE: <strong>([0-9 ]+)<\/strong> \/ ([0-9 ]+)/
			var playerXP=new RegExp(L._Get('sXP')).exec(_PlayerExpBar());
			if (playerXP!=null) playerXP = parseInt((playerXP[1]).replace(/ /g,""));
			DEBUG._Add('DATAS',1,'_PlayerXP:: $1',playerXP)
			return playerXP;
			},

		_PlayerXPlimit: function(){// XP - XP limite => /EXPÉRIENCE: <strong>([0-9 ]+)<\/strong> \/ ([0-9 ]+)/
			var playerXPlimit=new RegExp(L._Get('sXP')).exec(_PlayerExpBar());
			if (playerXPlimit!=null) playerXPlimit = parseInt(playerXPlimit[2].replace(/ /g,""));
			DEBUG._Add('DATAS',1,'_PlayerXPlimit:: $1',playerXPlimit)
			return playerXPlimit;
			},

		_PlayerPdP: function(){// PdP => /PTS DE PROGRÈS: <strong>([0-9 ]+)<\/strong>/
			var playerPdP=new RegExp(L._Get('sPdP')).exec(_PlayerExpBar());
			if (playerPdP!=null) playerPdP=parseInt((playerPdP[1]).replace(/ /g,""));
			DEBUG._Add('DATAS',1,'_PlayerPdP:: $1',playerPdP)
			return playerPdP;
			},

		_PlayerBlood: function(){
			var playerBlood=DOM._GetFirstNodeTextContent("//div[@class='topstats stats-blood']//td[@class='panel-cell']/span", null);
			if (playerBlood!=null) playerBlood=parseInt((playerBlood).replace(/ /g,""));
			DEBUG._Add('DATAS',1,'playerBlood:: $1',playerBlood)
			return playerBlood;
			},

		_PlayerMoney: function(){//LOL => /([0-9 ]+) LOL/
			var result=DOM._GetFirstNodeTextContent("//div[@class='topstats stats-cash']//td[@class='panel-cell']", null);
			var playerMoney = new RegExp(L._Get('sLOL')).exec(result);
			if (playerMoney!=null) playerMoney = parseInt((playerMoney[1]).replace(/ /g,""));
			DEBUG._Add('DATAS',1,'_PlayerMoney:: $1',playerMoney)
			return playerMoney;
			},

		_PlayerPopulation: function(){
			var result = DOM._GetFirstNodeTextContent("//div[@class='topstats stats-ppl']//td[@class='panel-cell']", null);
			//Population => /([0-9 ]+) /
			var playerPopulation = new RegExp(L._Get('sPopulation')).exec(result);
			if (playerPopulation!=null) playerPopulation = parseInt((playerPopulation[1]).replace(/ /g,""));
			DEBUG._Add('DATAS',1,'_PlayerPopulation:: $1',playerPopulation)
			return playerPopulation;
			},

	/* Données diverses	*/
		_GetPage: function(){
			var page = null,
				qsA = DOM._QueryString("a"),
				qsType = DOM._QueryString("type"),
				qsDo = DOM._QueryString("do"),
				qsMid = DOM._QueryString("mid");
			// message Serveur (à approfondir)
			var result = DOM._GetFirstNode("//div[@class='komunikat']");
			if (result!=null){
				var result = DOM._GetFirstNodeTextContent(".//u",result);
				if (result == L._Get('sDeconnecte')) page="pServerDeco";
				else if (result == L._Get('sCourtePause')) page="pServerUpdate";
				else page="pServerOther";
				}
			// message extérieur
			else if (qsA==null&&qsMid!=null) page="pShowMsg";
			// Profile
			else if (qsA=="profile"){
				var qsUid = DOM._QueryString("uid");
				var qsEdit = DOM._QueryString("edit");
				if (qsUid==null) page="pOProfile";
				else if (!!qsEdit) page="pOProfileEdit";
				else page="pProfile";
				}
			// Version
			else if (qsA=="changelog") page="PChangelog";
			// Premium
			else if (qsA=="premium"){
				if (qsDo==null||qsDo=="prolong") page="pProlongPremium";
				else if (qsDo=="services") page="pServicesPremium";
				else if (qsDo=="history") page="pHistoryPremium";
				}
			// Salle du Trône
			else if (qsA==null||qsA=="main") page="pMain";
			// Entrainement
			else if (qsA=="training") page="pTraining";
			// Site de construction
			else if (qsA=="build") page="pBuild";
			// Vue sur la Cité
			else if (qsA=="townview") page="pTownview";
			// Clan
			else if (qsA=="aliance"){
				if (qsDo=="list") page="pAlianceList";
				else if (qsDo=="newclan") page="pNewAliance"; // créér
				else if (qsDo=="apply") page="pApplyAliance"; // joindre
				else if (qsDo=="editclan") page="pEditAliance";
				else if (qsDo=="applies") page="pAppliesAliance";
				else if (qsDo==null||qsDo=="leave") page="pOwnerAliance";
				else if (qsDo=="view"){
					var result = DOM._GetFirstNode("//div[@class='top-options']/span[@class='lnk']");
					if (result!=null) page="pOwnerAliance";
					else page="pAliance";
					}
				} 
			// Demeure du Clan
			else if (qsA=="clanbld") page = "pClanbld";
			// Magasin
			else if (qsA=="townshop") page="pTownshop";
			// Souvenir
			else if (qsA=="sshop") page = "pSshop";
			// Armurerie
			else if (qsA=="equip") page="pEquip";
			// Commerce
			else if (qsA=="trade"){
				if (qsDo==null) page="pTrade";
				else if (qsDo=="newtrade") page="pNewtrade";
				else if (qsDo=="tradelog") page="pTradelog";
				}
			// Enchères - Moria I
			else if (qsA=="auction"){
				if (qsDo==null||qsDo=="watched") page="pAuctionWatched";
				else if (qsDo=="new") page="pAuctionNew";
				else if (qsDo=="itemlist") page="pAuctionItemList";
				else if (qsDo=="closed") page="pAuctionClosed";
				}
			// Le Puits des Âmes - Moria I
			else if (qsA=="mixer"){
				if (qsDo==null||qsDo=="mkstone") page="pMkstone";
				else if (qsDo=="upgitem") page="pUpgitem";
				else if (qsDo=="mixitem") page="pMixitem";
				else if (qsDo=="destitem") page="pDestitem";
				else if (qsDo=="tatoo") page="pTatoo";
				}
			// Préparer une embuscade
			else if (qsA=="ambush"){
				var qsOpt = DOM._QueryString("opt");
				if (qsOpt==null) page="pAmbushRoot";
				else if (qsOpt=="spy") page="pAmbushSpy";
				else if (qsOpt=="atk") page="pAmbushAtk";
				else if (qsOpt=="ambush") page="pAmbush";
				}
			// Quêtes
			else if (qsA=="quest"){
				if (DOM._GetFirstNode("//*[@id='quest_timeleft']") != null) page="pQuestProgress";
				else page="pQuestLaunch";
				}
			// Expéditions
			else if (qsA=="cevent"){
				var currentExpe = DOM._GetFirstNode("//td[@class='ambinprogress']")!= null;
				if ((qsDo==null&&currentExpe)||qsDo=="current") page="pCurrentExpe";
				else if ((qsDo==null&&!currentExpe)||qsDo=="new") page="pNewExpe";
				else if (qsDo=="sacrifice") page="pSacrificeExpe";
				}
			// Roi de la Colline
			else if (qsA=="swr"){
				var currentExpe = DOM._GetFirstNode("//td[@class='ambinprogress']")!= null;
				if ((qsDo==null&&currentExpe)||qsDo=="current") page="pCurrentSwr";
				else if ((qsDo==null&&!currentExpe)||qsDo=="new") page="pNewSwr";
				else if (qsDo=="enchant") page="pEnchantSwr";
				}
			// Page L’Arène
			else if (qsA=="arena") page="pArena";
			// Page Missions
			else if (qsA=="tasks") page="pTasks";
			// Page des messages
			else if (qsA=="msg"){
				if (qsDo==null||qsDo=="list"){
					if (qsType==null||qsType=="1") page="pMsgList";
					else if (qsType=="2") page="pMsgSaveList";
					else if (qsType=="3") page="pMsgSendList";
					}
				else if (qsDo=="clanmsg") page="pMsgClan";
				else if (qsDo=="write") page="pMsgWrite";
				else if (qsDo=="fl") page="pMsgFriendList";
				else if (qsDo == "view" && qsMid!=null){
					if (qsType==null||qsType=="1") page="pMsg";
					else if (qsType=="2") page="pMsgSave";
					else if (qsType=="3") page="pMsgSend";
					}
				}
			// Page Notes
			else if (qsA=="notes") page="pNotes";
			// Page Classement
			else if (qsA=="rank") page="pRank";
			// Page Préférences
			else if (qsA=="settings"){
				if (qsDo==null) page="pRootSettings";
				else if (qsDo=="ai") page="pSettingsAi";
				else if (qsDo=="acc") page="pSettingsAcc";
				else if (qsDo=="vac") page="pSettingsVac";
				else if (qsDo=="delchar") page="pSettingsDelchar";
				}
			// Page Rapporter à l`opérateur
			else if (qsA=="report") page="pReport";
			// Page Copyright
			else if (qsA=="developer") page="pCopyright";
			/*
			Guide de jeu
			Forum
			Chat instantané
			---
			Déconnexion*/
			DEBUG._Add('DATAS',1,'_GetPage:: $1',page);
			return page;
			},
		};
	})();

/******************************************************
* CSS
******************************************************/
function SetCSS(){
	var css = "@-moz-keyframes blinker {from {opacity: 1.0;} 50% {opacity: 0.1;} to {opacity: 1.0;}}"
		+"@-webkit-keyframes blinker {from { opacity: 1.0; } to { opacity: 0.0; }}"
		+".BWEblink {-webkit-animation-name: blinker;-webkit-animation-iteration-count: infinite;-webkit-animation-timing-function: cubic-bezier(1.0,0,0,1.0);-webkit-animation-duration: 1s;"
				+"-moz-animation-name: blinker;-moz-animation-iteration-count: infinite;-moz-animation-timing-function: cubic-bezier(1.0,0,0,1.0);-moz-animation-duration: 1s;}"
		+".BWEtriSelect{color:lime;}"
		+".BWEOpacity{opacity:1;}"
		+".BWEtriNoSelect{color:DarkGray;}"
		+".BWEsexF{color:#AD00A5;}"
		+".BWEsexH{color:#006BAD;}"
		+"#BWERC{width: 100%;}"
		+".BWEAEBut,.BWEAEButError{height:10px;margin:2px 0px;}"
		+".BWEAEButError{background-color:red;}"
		+".BWEHelp{border:0px;vertical-align:middle;padding:3px 5px;}"
		+".BWELeft,.BWERight,.BWEMiddle,.BWELeftHeader,.BWELogTD,.BWEGrpChg,.BWEGrpDel,#BWERC th,#BWERC td{padding:1px;text-align:left;white-space:nowrap;}"
		+".BWELeft2{padding: 0px 10px;text-align:left;}"
		+".BWEGrpChg,.BWEGrpDel{color:white;background-color:#F07000;border:thin solid black;}"
		+".BWEGrpDel{color:white;background-color:red;}"
		+".BWELogTD,#BWERC th{border:thin dotted black;}"
		+".BWERight{text-align:right;}"
		+".BWEMiddle,.BWEGrpChg,.BWEGrpDel{text-align:center;}"
		+".BWEGrpChg,.BWEGrpDel,.BWEPrefTD1,.BWEbold{font-weight:bold;}"
		+".BWELeftHeader,.BWEGrpChg,.BWEGrpDel,.BWEPrefTD2,.BWEPrefTD3 a,#BWE_RC1c th,#BWE_RC1c td,#BWE_RC2c th,#BWE_RC2c td,#BWE_RC3c th,#BWE_RC3c td{cursor: pointer;}"
		+".BWEPrefTD0,.BWEPrefTD1,.BWEPrefTD2,.BWEPrefTD3{padding: 1px;text-align:left;white-space: nowrap;}"
		+".BWEPrefTD0,.BWEPrefTD3{width:10px;}"
		+".BWEPrefTD2:hover{background: none repeat scroll 0 0 yellow;color: navy;text-decoration: underline;}"
		+".BWEselectLS,.BWEdivLS,.BWEdivIE{width:20em;height:20em;margin:0px;}"
		+".BWEdivLS,.BWEdivIE{overflow:auto;word-wrap:break-word;white-space:normal;}";
		
	GM_addStyle(css);
	}

/******************************************************
* FUNCTIONS
******************************************************/

function StringToTime(strTime){
	var regexp = /([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/;
	if (regexp.test(strTime)){
		var value = strTime.match(regexp);
		return new Date(value[1],value[2]-1,value[3],value[4],value[5],value[6]);
		}
	else return null;
	}

function clone(objet){
	if(typeof objet!='object'||objet==null) return objet;
	var newObjet = objet.constructor();
	for(var i in objet)	newObjet[i] = clone(objet[i]);
	return newObjet;
	}

function GetLvl(value){
	if (!isNaN(value)&&parseInt(value)==Number(value)){
		var lvl = Math.floor(Math.log(1.1*value)/Math.log(1.1)),
			lvlSup = Math.floor(Math.log(0.0011*(value*1000+999))/Math.log(1.1));
		return new Array(lvl,lvlSup,(lvl!=lvlSup?lvl+"-"+lvlSup:lvl));
		}
	else return new Array('-','-','-');
	}

function UpdateHistory(att,def,msgId,msgDate,emb){
	var maxLog = 4,
		h = DS._GetVar('BWE:L:'+att+':'+def,[]),
		a = msgId,
		b = (_Type(msgDate)=='Date')?msgDate.getTime():null,
		c = emb;
	for(var i=0;i<maxLog;i++){
		if (_Exist(h[i])){
			if (a!=h[i][0]){// message différent
				if (b!=null&&b>h[i][1]){//message plus récent.
					var temp = [a,b,c];
					a = h[i][0];
					b = h[i][1];
					c = h[i][2];
					h[i] = temp;
					}
				}
			else{// message identique.
				if (c!=null) h[i][2] = c;
				break;
				}
			}
		else{// pas de ligne à cette position.
			if (b!=null) h[i] = [a,b,c];
			break;
			}
		}
	if (h.length>0)	DS._SetVar('BWE:L:'+att+':'+def,h);
	}

function CreateHistory(att,def,node){
	function createList(list,tran){
		var table = IU._CreateElement('table',{},[],{},newTD);
		for (var i=0;i<list.length;i++){
			var x = list[i];
			if (_Type(x)=='Array'&&_Exist(x[0])&&_Exist(x[1])&&x[0]!=-1&&_Exist(tran[x[0]])) IU._CreateElements({'tr':['tr',,,,table],'td':['td',,[L._Get('sAEFormat',tran[x[0]],x[1])],,'tr']});
			else if (x!=-1&&_Exist(tran[x])) IU._CreateElements({'tr':['tr',,,,table],'td':['td',,[tran[x]],,'tr']});
			else IU._CreateElements({'tr':['tr',,,,table],'td':['td',{'class':'BWEblink BWEbold','style':'color:red;'},[L._Get('sNC')],,'tr']});
			}
		}
	var actuTime = DATAS._Time(), 
		h = DS._GetVar('BWE:L:'+att+':'+def,[]),
		logCol = att==ID?GM._GetVar(opt+'logA',defCol['logA']):GM._GetVar(opt+'logD',defCol['logD']),
		j=0;
	if (actuTime!=null&&_Exist(h[j])&&_Exist(h[j][1])){
		//prépare les éléments de l'historique
		var actuH = 0,
			logTime = new Date(),
			timeDiff = (actuTime.getTime()-h[0][1])/1000;
		if (Math.abs(timeDiff)<60) timeDiff = L._Get('sLogTime1',Math.floor(timeDiff));
		else if	(Math.abs(timeDiff)<60*60) timeDiff = L._Get('sLogTime2',Math.floor(timeDiff/60));
		else if	(Math.abs(timeDiff)<3600*24) timeDiff = L._Get('sLogTime3',Math.floor(timeDiff/(60*60)));
		else if (Math.abs(timeDiff)<3600*24*365) timeDiff = L._Get('sLogTime4',Math.floor(timeDiff/(60*60*24)));
		else timeDiff = L._Get('sLogTime5');
		var resultIU = {
			'span':['span',{'onmouseout':'nd();'},,,node],
			'table':['table',{'style':'display:inline;'},,,'span'],
			'tr':['tr',,,,'table'],
			'td1':['td',{'class':'BWEbold'},[timeDiff],,'tr'],
			'td2':['td',,,,'tr'],'table2':['table',,,,'td2'],},
			histoIU = {
			'root':['div'],
			'table':['table',{'style':'border-collapse:collapse;'},,,'root'],
			'tr':['tr',{'class':'tblheader'},,,'table']},
			histo = IU._CreateElements(histoIU),
			result = IU._CreateElements(resultIU);
		// garde uniquement les colonnes sélectionnées et affiche l'entête
		for (var i=0;i<logCol.length;i++){
			if (logCol[i][1]!=true){logCol.splice(i,1);i--;}
			else IU._CreateElement('th',{'class':'BWELogTD'},[L._Get("sLogTitle")[logCol[i][0]]],{},histo['tr']);
			}
		// parcours l'historique
		while (_Exist(h[j])){
			logTime.setTime(h[j][1]);
			var hDay = logTime.getDate(),
				hMonth = logTime.getMonth(),
				hYear = logTime.getFullYear(),
				overlib = IU._CreateElement('tr',{},[],{},histo['table']),
				bgcolor = 'white';
			if (actuTime.getDate()==hDay&&actuTime.getMonth()==hMonth&&actuTime.getFullYear()==hYear) actuH++;
			hDay = (hDay<10?'0':'')+hDay.toString();
			hMonth = (hMonth+1<10?'0':'')+(hMonth+1).toString();
			hYear = hYear.toString();
			if (_Type(h[j][2])=='Array'&&_Type(h[j][2][1])=='String'){
				switch(h[j][2][1]){
					case 'v': bgcolor = att==ID?'#2A9F2A':'#DB0B32'; break;
					case 'd': bgcolor = att==ID?'#DB0B32':'#2A9F2A'; break;
					case 'n': bgcolor = '#F07000'; break;
					case 'r': bgcolor = '#707070'; break;
					}
				overlib.setAttribute('style','background-color:'+bgcolor+';');
				if (j==0) result['td1'].setAttribute('style','color:'+bgcolor+';');
				for (var i=0; i<logCol.length; i++){
					var col = logCol[i][0],
						newTD = IU._CreateElement('td',{'class':'BWELogTD','valign':'top'},[],{},overlib);
					if (col==0) newTD.textContent = j;
					else if (col==1) newTD.textContent = L._Get('sLogTime6',hDay,hMonth,hYear);
					else if (col==2) newTD.textContent = (_Type(h[j][2][0])=='String'?h[j][2][0]:'-');
					else if (col==3) newTD.textContent = (_Type(h[j][2][2])=='String'?h[j][2][2]:'-');
					else if (col==4) newTD.textContent = (_Type(h[j][2][3])=='String'?h[j][2][3]:'-');
					else if (col==5&&_Type(h[j][2][4])=='Array') createList(h[j][2][4],L._Get('sArc'));
					else if (col==6&&_Type(h[j][2][5])=='Array') createList(h[j][2][5],L._Get('sArc'));
					else if (col==7&&_Type(h[j][2][6])=='Array') createList(h[j][2][6],L._Get('sEvo'));
					else if (col==8&&_Type(h[j][2][7])=='Array') createList(h[j][2][7],L._Get('sEvo'));
					else if (col==11&&_Type(h[j][2][10])=='Array') createList(h[j][2][10],L._Get('sObjet'));
					else if (col==12&&_Type(h[j][2][11])=='Array') createList(h[j][2][11],L._Get('sObjet'));
					else if ((h[j][2][1]=='v'||h[j][2][1]=='d')&&col==13&&_Type(h[j][2][12])=='Array'){
						var table = IU._CreateElement('table',{},[],{},newTD),
							Ga = GM._GetVar(opt+'Res',defCol['Res']),
							data = h[j][2][12];
						for (var x=0;x<Ga.length;x++){
							if (Ga[x][1]==true){
								if (_Type(data[Ga[x][0]])=='String') IU._CreateElements({'tr':['tr',,,,table],'td':['td',,[L._Get('sRes')[Ga[x][0]]+': '+data[Ga[x][0]]],,'tr']});
								else IU._CreateElements({'tr':['tr',,,,table],'td':['td',,[L._Get('sRes')[Ga[x][0]]+': -'],,'tr']});
								}
							}
						}
					else if (h[j][2][1]!='r'&&((col==9&&_Type(h[j][2][8])=='Array')||(col==10&&_Type(h[j][2][9])=='Array'))){
						var table = IU._CreateElement('table',{},[],{},newTD),
							ch = col==9?GM._GetVar(opt+'chA',defCol['chA']):GM._GetVar(opt+'chD',defCol['chD']),
							data = h[j][2][col==9?8:9];
						for (var x=0;x<ch.length;x++){
							if (ch[x][1]==true){
								if (ch[x][0]==12)// AGI+PER
									IU._CreateElements({'tr':['tr',,,,table],'td':['td',,[L._Get('sChar')[ch[x][0]]+': '+((_Exist(data[4])&&_Exist(data[9]))?Number(data[4])+Number(data[9]):'-')],,'tr']});
								else if (_Type(data[ch[x][0]])=='String')
									IU._CreateElements({'tr':['tr',,,,table],'td':['td',,[L._Get('sChar')[ch[x][0]]+': '+data[ch[x][0]]],,'tr']});
								else IU._CreateElements({'tr':['tr',,,,table],'td':['td',,[L._Get('sChar')[ch[x][0]]+': -'],,'tr']});
								}
							}
						}
					else newTD.textContent = '-';
					}
				}
			else if (logCol.length>=1) IU._CreateElement('td',{'class':'BWELogTD','style':'background-color:white;color:black;','colspan':logCol.length},[L._Get('sLogNC')],{},overlib);
			IU._CreateElements({'tr':['tr',,,,result['table2']],
								'td':['td',{'style':'background-color:transparent;padding:1px 0 0 0;'},,,'tr'],
								'div':['div',{'style':'height:3px;width:4px;background-color:'+bgcolor+';'},,,'td']});
			j++;
			}
		if (actuH>=2) result['td1'].textContent = '*'+result['td1'].textContent;
		result['span'].setAttribute('onmouseover',"return overlib('"+histo['root'].innerHTML+"',CAPTION,'"+L._Get('sLogVS',att==ID?player:att,def==ID?player:def)+"',CAPTIONFONTCLASS,'action-caption',RELX,10,WRAP);");
		}
	else node.textContent = '-';
	}

function createGrp(){
	function createGrpTable(id){
		var result = DOM._GetFirstNode("//td[@id='BWEgrp"+id+"']");
		if (result!=null){
			var grpIU = {
				'table':['table',{'class':'profile-stats','style':'width:100%','id':'BWEgrp'+id+'_table'},,,result],
				'thead':['thead',,,,'table'],
				'th00':['tr',,,,'thead'],
				'td001':['th',{'class':'BWEbold BWELeft','colspan':'4'},[L._Get('BWEgrp'+id)],,'th00'],
				'td002':['th',{'class':'BWEGrpDel','colspan':'2'},['RAZ'],{'click':[function (e,par){
					var	list = DOM._GetNodes("//tbody[@id='BWEgrp"+par[0]+"_body']/tr");
					if (list!=null) for (var i=0;i<list.snapshotLength;i++){
						var name = unescape(list.snapshotItem(i).getAttribute('id'));
						name = name.substring(13,name.length);
						checkGrp(null,[name,par[0]]);
						}
					},[id]]},'th00'],
				'th01':['tr',{'class':'tblheader','id':'BWEgrp'+id+'_head'},,,'thead'],
				'tdh010':['th',{'class':'BWEbold BWELeft','style':'width:30%'},[L._Get('BWEgrpNom')],,'th01'],
				'tdh011':['th',{'class':'BWEbold BWELeft','style':'width:30%'},[L._Get('BWEgrpRace')],,'th01'],
				'tdh012':['th',{'class':'BWEbold BWELeft','style':'width:10%'},[L._Get('BWEgrpNiv')],,'th01'],
				'tdh013':['th',{'class':'BWEbold BWELeft','style':'width:12%'},[L._Get('BWEgrpPts')],,'th01'],
				'tdh014':['th',{'class':'BWEbold BWERight','style':'width:18%','colspan':'2'},[L._Get('BWEgrpAct')],,'th01'],
				'tbody':['tbody',{'id':'BWEgrp'+id+'_body'},,,'table'],
				'tfoot':['tfoot',,,,'table'],
				'trf00':['tr',,,,'tfoot'],
				'tdf000':['td',{'style':'height: 10px;','colspan':'6'},,,'trf00'],
				'trf01':['tr',,,,'tfoot'],
				'tdf010':['td',{'class':'BWEbold BWELeft','id':'BWEgrp'+id+'_foot10'},,,'trf01'],
				'tdf011':['td',{'class':'BWERight'},[L._Get('BWEgrpTt')],,'trf01'],
				'tdf012':['td',{'class':'BWEbold BWELeft','id':'BWEgrp'+id+'_foot12'},,,'trf01'],
				'tdf013':['td',{'class':'BWEbold BWELeft','id':'BWEgrp'+id+'_foot13','colspan':'3'},,,'trf01'],
				'trf02':['tr',,,,'tfoot'],
				'tdf020':['td',{'class':'BWELeft','id':'BWEgrp'+id+'_foot20'},,,'trf02'],
				'tdf021':['td',{'class':'BWERight'},[L._Get('BWEgrpMoy')],,'trf02'],
				'tdf022':['td',{'class':'BWEbold BWELeft','id':'BWEgrp'+id+'_foot22'},,,'trf02'],
				'tdf023':['td',{'class':'BWEbold BWELeft','id':'BWEgrp'+id+'_foot23','colspan':'3'},,,'trf02']
				},
				grpNode = IU._CreateElements(grpIU);
			if (!!GM._GetVar(opt+'chTr',true)){
				var tri = GM._GetVar(opt+'trGr',{'col':1,'order':'+'});
				if (tri['col']>4) tri = {'col':1,'order':'+'};
				for (var i=0;i<4;i++){
					var triIU = {'span1':['span',((tri['col']==i+1&&tri['order']=='+')?{'class':'BWEtriSelect'}:{'class':'BWEtriNoSelect'}),
								[L._Get("sTriUp")],,grpNode['tdh01'+i]],
								'span2':['span',((tri['col']==i+1&&tri['order']=='-')?{'class':'BWEtriSelect'}:{'class':'BWEtriNoSelect'}),
								[L._Get("sTriDown")],,grpNode['tdh01'+i]]};
					IU._CreateElements(triIU);
					grpNode['tdh01'+i].setAttribute('class','BWELeftHeader');
					IU._addEvent(grpNode['tdh01'+i],'click',function(e,par){// par[0]= tri
						var tri = GM._GetVar(opt+'trGr',{'col':1,'order':'+'});
						var oldArrowA = DOM._GetFirstNode("//tr[@id='BWEgrpA_head']/th["+tri['col']+"]/span["+(tri['order']=='+'?'1':'2')+"]");
						if (oldArrowA!=null) oldArrowA.setAttribute('class','BWEtriNoSelect');
						var oldArrowB = DOM._GetFirstNode("//tr[@id='BWEgrpB_head']/th["+tri['col']+"]/span["+(tri['order']=='+'?'1':'2')+"]");
						if (oldArrowB!=null) oldArrowB.setAttribute('class','BWEtriNoSelect');
						par[0]['order'] = (par[0]['order']=='+'&&par[0]['col']==tri['col'])?'-':'+';
						var arrowSelectA = DOM._GetFirstNode("//tr[@id='BWEgrpA_head']/th["+par[0]['col']+"]/span["+((par[0]['order']=='+')?'1':'2')+"]");
						if (arrowSelectA!=null) arrowSelectA.setAttribute('class','BWEtriSelect');
						var arrowSelectB = DOM._GetFirstNode("//tr[@id='BWEgrpB_head']/th["+par[0]['col']+"]/span["+((par[0]['order']=='+')?'1':'2')+"]");
						if (arrowSelectB!=null) arrowSelectB.setAttribute('class','BWEtriSelect');
						GM._SetVar(opt+'trGr',{'col':par[0]['col'],'order':par[0]['order']});
						var	tbodyA = DOM._GetFirstNode("//tbody[@id='BWEgrpA_body']");
						if (tbodyA!=null) FctTriA(par[0]['col'],par[0]['order'],tbodyA,null,DOM._GetNodes("./tr",tbodyA));
						var	tbodyB = DOM._GetFirstNode("//tbody[@id='BWEgrpB_body']");
						if (tbodyB!=null) FctTriA(par[0]['col'],par[0]['order'],tbodyB,null,DOM._GetNodes("./tr",tbodyB));
						},[{"col":i+1,"order":((tri['col']==i+1)?tri['order']:'+')}]);
					}
				}
			var grp = DS._GetVar('BWE:G',{'A':[],'B':[]});
			for (var i=0;i<grp[id].length;i++){
				appendGrpRow(grpNode['tbody'],grp[id][i],id);
				}
			var tri = (!!GM._GetVar(opt+'chTr',true))?GM._GetVar(opt+'trGr',{'col':1,'order':'+'}):{'col':1,'order':'+'};
			FctTriA(tri['col'],tri['order'],grpNode['tbody'],null,DOM._GetNodes("./tr",grpNode['tbody']));
			updateGrpFoot(id);
			}
		}
	createGrpTable('A');
	createGrpTable('B');
	}

function checkGrp(e,par){// par[0] = name, par[1] = id
	var grp = DS._GetVar('BWE:G',{'A':[],'B':[]}),
		id = grp['A'].indexOf(par[0])>-1?'A':grp['B'].indexOf(par[0])>-1?'B':'',
		tri = (!!GM._GetVar(opt+'chTr',true))?GM._GetVar(opt+'trGr',{'col':1,'order':'+'}):{'col':1,'order':'+'};
	if (id!=''){
		var	grpRow = DOM._GetFirstNode("//tr[@id='"+escape('BWEgrp'+id+'_body_'+par[0])+"']");
		if (grpRow!=null) grpRow.parentNode.removeChild(grpRow);
		var	tbody = DOM._GetFirstNode("//tbody[@id='BWEgrp"+id+"_body']");
		if (tbody!=null) FctTriA(tri['col'],tri['order'],tbody,null,DOM._GetNodes("./tr",tbody));
		updateGrpFoot(id);
		grp[id].splice(grp[id].indexOf(par[0]),1);
		}
	if (id==par[1]) id='';
	else{
		var	tbody = DOM._GetFirstNode("//tbody[@id='BWEgrp"+par[1]+"_body']");
		if (tbody!=null){
			appendGrpRow(tbody,par[0],par[1]);
			FctTriA(tri['col'],tri['order'],tbody,null,DOM._GetNodes("./tr",tbody));
			}
		updateGrpFoot(par[1]);
		grp[par[1]].push(par[0]);
		id = par[1];
		}
	DS._SetVar('BWE:G',grp);
	var checkA = DOM._GetFirstNode("//input[@id='"+escape('BWEcheckA_'+par[0])+"']"),
		checkB = DOM._GetFirstNode("//input[@id='"+escape('BWEcheckB_'+par[0])+"']");
	if (checkA!=null) checkA.checked = id=='A'?true:false;
	if (checkB!=null) checkB.checked = id=='B'?true:false;
	}

function appendGrpRow(tbody,name,id){
	var value = DS._GetVar('BWE:P:'+name,{}),
		races = L._Get('sRaces'),
		race = _Exist(value['R']&&_Exist(races[value['R']]))?(races[value['R']].length>10?races[value['R']].substr(0,7)+'...':races[value['R']]):'-';
	var trIU = {
		'tr01':['tr',{'id':escape('BWEgrp'+id+'_body_'+name)},,,tbody],
		'td010':['td',{'class':'BWELeft'},,,'tr01'],
		'a0100':['a',(_Exist(value['U'])?{'href':'?a=profile&uid='+value['U']}:{}),[(name.length>10?name.substr(0,7)+'...':name)],,'td010'],
		'td011':['td',{'class':'BWELeft'},[race],,'tr01'],
		'td012':['td',{'class':'BWELeft'},[_Exist(value['N'])?value['N']:'-'],,'tr01'],
		'td013':['td',{'class':'BWELeft'},[_Exist(value['P'])?value['P']:'-'],,'tr01'],
		'td014':['td',{'class':'BWEGrpChg'},[('->'+(id=='A'?'B':'A'))],{'click':[checkGrp,[name,(id=='A'?'B':'A')]]},'tr01'],
		'td015':['td',{'class':'BWEGrpDel'},['X'],{'click':[checkGrp,[name,id]]},'tr01'],
		};
	IU._CreateElements(trIU);
	}

function updateGrpFoot(id){
	var	list = DOM._GetNodes("//tbody[@id='BWEgrp"+id+"_body']/tr"),
		lvlsum = 0,	ptssum = 0;
	for (var i=0;i<list.snapshotLength;i++){
		var tr = list.snapshotItem(i);
		var niv = DOM._GetFirstNodeTextContent("./td[3]",null,tr);
		if (niv!=null) lvlsum+=Number(niv);
		var pts = DOM._GetFirstNodeTextContent("./td[4]",null,tr);
		if (pts!=null) ptssum+=Number(pts);
		}
	var nb = list.snapshotLength;
	var fnb = DOM._GetFirstNode("//td[@id='BWEgrp"+id+"_foot10']");
	if (fnb!=null) fnb.textContent = (nb>1?L._Get('BWEgrpPls',nb):L._Get('BWEgrpPl',nb));
	var flvlsum = DOM._GetFirstNode("//td[@id='BWEgrp"+id+"_foot12']");
	if (flvlsum!=null) flvlsum.textContent = lvlsum;
	var fptssum = DOM._GetFirstNode("//td[@id='BWEgrp"+id+"_foot13']");
	if (fptssum!=null) fptssum.textContent = ptssum;
	var flvlaverage = DOM._GetFirstNode("//td[@id='BWEgrp"+id+"_foot22']");
	if (flvlaverage!=null) flvlaverage.textContent = nb>0?Math.floor(lvlsum/nb):0;
	var fptsaverage = DOM._GetFirstNode("//td[@id='BWEgrp"+id+"_foot23']");
	if (fptsaverage!=null) fptsaverage.textContent = nb>0?Math.floor(ptssum/nb):0;
	}

function ChangeTable(header){
	var tableau = header.parentNode,
		list = DOM._GetNodes("./following-sibling::tr",header),
		temp = new Array();
	// sauvegarde le tableau et l'efface
	temp[0]= header.parentNode.removeChild(header);
	if (list!=null)	for (var i=0;i<list.snapshotLength;i++) temp[i+1] = tableau.removeChild(list.snapshotItem(i));
	// garde uniquement les colonnes sélectionnées
	var newCol = page=='pTownview'?GM._GetVar(opt+'To',defCol['To']):(page=='pOwnerAliance'?GM._GetVar(opt+'OCl',defCol['OCl']):(page=='pAliance'?GM._GetVar(opt+'Cl',defCol['Cl']):(page=='pRank'?GM._GetVar(opt+'Ra',defCol['Ra']):[])));
	for (var i=newCol.length-1;i>=0;i--) if (newCol[i][1]!=true) newCol.splice(i,1);
	// précharge certaines options
	var	chTr = GM._GetVar(opt+'chTr',true),
		tri = (page=='pOwnerAliance')?GM._GetVar(opt+'trOA',{'col':1,'order':'+'}):GM._GetVar(opt+'trA',{'col':1,'order':'+'}),
		chAE = GM._GetVar(opt+'chAE',false),
		nMin = GM._GetVar(opt+'nMin',''),
		nMax = GM._GetVar(opt+'nMax',''),
		aMin = GM._GetVar(opt+'aMin',''),
		aMax = GM._GetVar(opt+'aMax',''),
		cMin = GM._GetVar(opt+'cMin',''),
		cMax = GM._GetVar(opt+'cMax',''),
		acMin = GM._GetVar(opt+'acMin',''),
		acMax = GM._GetVar(opt+'acMax','');
	// mise en forme du tableau
	for (var j=0; j<temp.length; j++){
		var tr = tableau.appendChild(temp[j].cloneNode(false));
		var nameSearch = (page=='pTownview'||page=='pRank')?".//td[2]/a":((page=='pOwnerAliance'||page=='pAliance')?".//td[1]/a":null),
			name = nameSearch!=null?DOM._GetFirstNodeTextContent(nameSearch,null,temp[j]):null;
		if (name!=null){// mise à jour des données
			var value = DS._GetVar('BWE:P:'+name,{});
			if (page=='pTownview'||page=='pRank'){
				var pts = DOM._GetFirstNodeTextContent(".//td["+(page=='pTownview'?4:8)+"]",null,temp[j]),
					race = DOM._GetFirstNodeTextContent(".//td["+(page=='pTownview'?6:3)+"]",null,temp[j]),
					sexe = DOM._GetFirstNodeTextContent(".//td["+(page=='pTownview'?7:4)+"]",null,temp[j]);
				if (pts!=null){
					value['P'] = Number(pts);
					if (!_Exist(value['N'])||(_Exist(value['N'])&&value['N']<GetLvl(value['P'])[0])) value['N']=GetLvl(value['P'])[2];
					}
				if (race!=null) value['R'] = L._Get('sRaces').indexOf(race);
				if (sexe!=null) value['S'] = sexe;
				if (page=='pRank'&&name==player){
					var rank = DOM._GetFirstNodeTextContent(".//td[1]",null,temp[j]);
					value['C'] = Number(rank);
					}
				}
			else if (page=='pOwnerAliance'||page=='pAliance'){
				var niv = DOM._GetFirstNodeTextContent(".//td[5]",null,temp[j]),
					pts = DOM._GetFirstNodeTextContent(".//td[6]",null,temp[j]);
				if (niv!=null) value['N'] = niv;
				if (pts!=null) value['P'] = Number(pts);
				}
			var uid = /^\?a=profile&uid=(\d*)$/.exec(DOM._GetFirstNode(nameSearch,temp[j]).getAttribute('href'));
			if (uid!=null) value['U'] = uid[1];
			DS._SetVar('BWE:P:'+name,value);
			}
		for (var i=0; i<newCol.length; i++){
			var newTD, col = newCol[i][0];
			// colonne existante
			if (newCol[i][2]!=-1){
				var td = DOM._GetFirstNode(".//td["+newCol[i][2]+"]",temp[j]);
				if (td!=null){
					td.removeAttribute('width');
					td.removeAttribute('style'); 
					td.className += (td.className?' ':'')+'BWELeft';
					newTD = tr.appendChild(td.cloneNode(true));
					}
				else newTD = IU._CreateElement('td',{'class':'BWELeft'},[],{},tr);
				if (col==24){
					newTD.setAttribute('width','18px');
					if (j>0&&name!=null&&!!chAE){
						var	img = DOM._GetFirstNode(".//img",newTD);
						if (img!=null&&img.src.indexOf('/0.gif')!=-1){
							var value = DS._GetVar('BWE:P:'+name,{});
							if (_Exist(value['P'])){
								var lvl = GetLvl(value['P'])[0],
									olvl = DATAS._PlayerLevel(),
									cla = page=='pRank'?Number(DOM._GetFirstNodeTextContent(".//td[1]",0,temp[j])):null,
									oCla = _Exist(plDatas['C'])?plDatas['C']:null,
									checkNiv = (nMin!=''?lvl>=Number(nMin):true)&&(nMax!=''?lvl<=Number(nMax):true)&&(aMin!=''?lvl>=(olvl-(olvl*Number(aMin)/100)):true)&&(aMax!=''?lvl<=(olvl+(olvl*Number(aMax)/100)):true),
									checkCla = page=='pRank'&&cla!=0&&oCla!=null&&(cMin!=''?cla>=Number(cMin):true)&&(cMax!=''?cla<=Number(cMax):true)&&(acMin!=''?cla>=(oCla-Number(acMin)):true)&&(acMax!=''?cla<=(oCla+Number(acMax)):true);
								if (checkNiv&&(page!='pRank'||checkCla)) img.className = 'BWEblink';
								}
							}
						}
					}
				}
			// colonne à créer
			else{
				newTD = IU._CreateElement('td',{'class':'BWELeft'},[],{},tr);
				if (j==0){
					if (col==22){
						newTD.className = 'BWEMiddle';
						IU._CreateElement('img',{'style':"width:16px; height:16px; vertical-align:middle;",'src':"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%02%1FIDATx%DAcd%20%12%9C%3CyB%FF%F2%E5%CB5%3F%7F%FE%D2%FA%F7%FF%9F%D6%E9S%A7%E7-Z%B4(%99%91X%03v%ED%DA%C1%EF%E6%E6%F1q%CA%94I%FF%BF%7D%FF%CE%B0w%EF%DE%AE%9D%3Bv%95%E34%E0%DA%B5%AB%F6%BF%7F%FDb%F8%F9%EB%D7%0333%F3%87%13%26%F4%E9%0B%89%08%1Dx%FB%E6%9D%C0%D7%AF_%18%0E%1E8%5C%BB%7B%F7%EE%16%0C%03v%ED%DC%11%FF%EF%DF%FFI%CF%9E%3D%E1%FB%F9%E3%17%03%03P%C5%DF%7F%7FO%B0%B1%B1i%BC%FF%F0%9E%E9%E3%C7%8F~m%AD%1D%07%DD%DD%DD3w%EE%DC9%1D%C5%80%E3%C7%0F%FB%3F%7C%F8d%C3%B3%A7O.%FC%FC%F9%A3%E1%DB%B7o%1F~%FC%FC%E5%A0%A8%A8X%F0%FD%FBw%81%5B%B7n9%CC%9C9%FB%20%B2%1E%14%03%E6%CF%9B%F7%F8%DE%FD%BBo%9A%9B%5B%0D%91%C5%17%2C%9Co%FF%EB%D7%AF%03%87%0E%1FnZ%B2hI%3DV%03f%CC%9C%AE%FF%E3%DB%F7%0B%17%2F_J%98%3Fo%C1Bt%AF%B5%B4%B6%9C%BF%7F%FF%DE%87%B9s%E69b5%A0%B5%AD%D5%FE%FB%D7%AF%07._%BD%E2%B0q%C3%A6%83%E8%06%14%97%14%ED%7F%F7%F6%1D%C3%FC%F9%0B%B0%1B%60hl%C8ook%FF%E1%E6%AD%9B%0B%B6o%DB%9E%88%AC%C8%DB%CF%9B_%5DU%ED%C1%B3%E7%CF7%ACX%B6%22%11%AB%01%20%10%9F%10%3F%FF%DB%D7o%09%2C%AC%2C%05%CB%97-%9F%08%12%B3s%B0%E3WQV9%C0%CE%CEnp%FD%C6u%87%03%FB%0E%E0%0ED%0F%2F%0F~nN%AE%03%9C%9C%9C%06%BF%FF%FCy%F0%EF%DF%BF%07%2C%CC%CC%0El%EC%EC%0C%EF%DE%BDI%D8%BCi%2BF%D8%60MH%F6%0E%F6%F1%26%C6%26%09%8F%1E%3Dr%F8%FA%ED%EB%84%E7%2F%9EO8%7F%F6%FCCljq%A6%C4%9E%DE%9E%FA%FD%07%F67l%DD%BC%15or%C7*%99%98%98x%FC%C7%8F%1F%16_%BF%7CaP%D7%D0%60%B8z%EDj%FF%B6%AD%DB%8AHr%01%08%B8%B9%B9%FD%DF%B5k%17%E9.%80%01%5B%3B%DB%FF%87%0F%1D%C6%AB%06%00%A2%EE%06%20%5B%F9%3D%19%00%00%00%00IEND%AEB%60%82"},[],{},newTD);
						}
					else if (col!=17&&col!=18&&col!=19) newTD.textContent = L._Get("sColTitle")[col];
					}
				else if (col==17||col==18||col==19){
					var index = col==17?1:(col==18?2:3),
						img = DOM._GetFirstNode("./td[2]/img["+index+"]",temp[j]);
					newTD.className = "";
					if (img!=null) newTD.appendChild(img.cloneNode(true));
					}
				else if (col==5){
					var index = page=='pTownview'?4:8,
						result = DOM._GetFirstNodeTextContent(".//td["+index+"]",null,temp[j]);
					if (result!=null) newTD.textContent = GetLvl(result)[2];
					}
				else if (col==7){
					if (page=='pTownview'||page=='pRank'){
						var index = page=='pTownview'?4:8,
							result = DOM._GetFirstNodeTextContent(".//td["+index+"]",null,temp[j]);
						if (!isNaN(result)&&parseInt(result)==Number(result)) newTD.textContent = L._Get('sNivFormat',GetLvl(result)[2],result);
						else newTD.textContent = '-';					
					}
					else if (page=='pOwnerAliance'||page=='pAliance'){
						var result = DOM._GetFirstNodeTextContent(".//td[5]",null,temp[j]),
							result2 = DOM._GetFirstNodeTextContent(".//td[6]",null,temp[j]);
						if (result!=null&&result2!=null) newTD.textContent = L._Get('sNivFormat',result,result2);					
						}
					}
				else if (col==21){
					var grp = DS._GetVar('BWE:G',{'A':[],'B':[]}),
						tdIU = {'checkA':['input',{'type':'checkbox','id':escape('BWEcheckA_'+name),
									'checked':(grp['A'].indexOf(name)>-1)},,
									{'change':[checkGrp,[name,'A']]},newTD],
								'checkB':['input',{'type':'checkbox','id':escape('BWEcheckB_'+name),
									'checked':(grp['B'].indexOf(name)>-1)},,
									{'change':[checkGrp,[name,'B']]},newTD]},
						grpNode = IU._CreateElements(tdIU);
					}
				else if (col==0){
					var races = L._Get('sRaces');
					newTD.textContent = _Exist(value)&&_Exist(value['R'])&&_Exist(races[value['R']])?races[value['R']]:'-';
					}
				else if (col==1){
					newTD.textContent = _Exist(value)&&_Exist(value['S'])?value['S']:'-';
					newTD.className = 'BWELeft '+(_Exist(value)&&_Exist(value['S'])?value['S']==L._Get('sSexeH')?'BWEsexH':'BWEsexF':'');
					}
				else if (col==22){	
					newTD.textContent = _Exist(value)&&_Exist(value['S'])?value['S']:'-';
					newTD.className = 'BWEMiddle '+(_Exist(value)&&_Exist(value['S'])?value['S']==L._Get('sSexeH')?'BWEsexH':'BWEsexF':'');
					}
				else if (col==23){	
					if (name==null) newTD.textContent = '-';
					else CreateHistory(ID,name,newTD);
					}
				else if (col==25){	
					if (name==null) newTD.textContent = '-';
					else CreateHistory(name,ID,newTD);
					}
				}
			// options de tri
			if (j==0&&!!chTr&&(page=='pOwnerAliance'||page=='pAliance')){
				if (tri['col']>newCol.length) tri = {'col':1,'order':'+'};
				IU._CreateElement('span',((tri['col']==i+1&&tri['order']=='+')?{'class':'BWEtriSelect'}:{'class':'BWEtriNoSelect'}),[L._Get('sTriUp')],{},newTD);
				IU._CreateElement('span',((tri['col']==i+1&&tri['order']=='-')?{'class':'BWEtriSelect'}:{'class':'BWEtriNoSelect'}),[L._Get('sTriDown')],{},newTD);
				newTD.setAttribute('class','BWELeftHeader');
				newTD.parentNode.setAttribute('id','BWEClanHeader');
				IU._addEvent(newTD,'click',function(e,i){
					var header = DOM._GetFirstNode("//tr[@id='BWEClanHeader']"),
						alianceList = DOM._GetNodes(".//following-sibling::tr",header),
						triA = GM._GetVar(opt+'trA', {'col':1,'order':'+'}),
						triOA = GM._GetVar(opt+'trOA', {'col':1,'order':'+'}),
						tri = (page=='pOwnerAliance')? triOA:triA,
						spanArrow = tri['order']=='+'?'1':'2',
						oldArrow = DOM._GetFirstNode(".//td["+tri['col']+"]/span["+spanArrow+"]", header);
					if (oldArrow!=null) oldArrow.setAttribute('class','BWEtriNoSelect');
					i['order'] = (i['order']=='+'&&i['col']==tri['col'])?'-':'+';
					var arrowSelect = DOM._GetFirstNode(".//td["+i['col']+"]/span["+((i['order']=='+')?'1':'2')+"]", header);
					if (arrowSelect!=null) arrowSelect.setAttribute('class','BWEtriSelect');
					if (page=='pOwnerAliance') GM._SetVar(opt+'trOA',{'col':i['col'],'order':i['order']});
					else GM._SetVar(opt+'trA',{'col':i['col'],'order':i['order']});
					FctTriA(i['col'],i['order'],header.parentNode,header,alianceList);
					},{"col":i+1,"order":((tri['col']==i+1)?tri['order']:'+')});
				}
			}
		}
	if (page=='pOwnerAliance'||page=='pAliance'){
		var header = DOM._GetFirstNode("./tr[@class='tblheader']",tableau),
			list = DOM._GetNodes("./following-sibling::tr",header);
		FctTriA(tri['col'],tri['order'],tableau,header,list);
		}
	// Groupe
	if (_Exist(grpNode)){
		var lastDiv = DOM._GetLastNode("//div[@id='content-mid']//div[@class='hr620']");
		if (lastDiv!=null){
			var grpIU = {'table':['table',{'style':'width:95%;'},,,lastDiv.parentNode],
						'tr0':['tr',,,,'table'],
						'td00':['td',{'id':'BWEgrpA','class':'BWEMiddle','style':'width:45%;','valign':'top'},,,'tr0'],
						'td01':['td',{'id':'BWEgrpB','class':'BWEMiddle','style':'width:45%;','valign':'top'},,,'tr0']};
			IU._CreateElements(grpIU);
			createGrp();
			}
		}
	}

function FctTriA(key,order,tbody,header,list){
	// créé un tableau des éléments pour tri ultérieur
	var list2 = new Array();
	for (var i=0; i<list.snapshotLength; i++){
		var ligne = list.snapshotItem(i),
			col = DOM._GetFirstNode(".//td["+key+"]", ligne);
		if (col!=null){
			var isInput = DOM._GetFirstNode(".//input[1]", col),
				isInput2 = DOM._GetFirstNode(".//input[2]", col),
				isIMG = DOM._GetFirstNode(".//img", col),
				isA = DOM._GetFirstNode(".//a", col),
				value = col.textContent.toUpperCase();// tri de base
			if (isInput!=null&&isInput2!=null){// tri pour les cases à cocher du Groupe
				value = (isInput.checked?"0":"1")+(isInput2.checked?"0":"1");
				}
			else if (isIMG==null&&isA==null){
				// colonne de type nombre : "xx","x.x"
				var result = new RegExp(L._Get('sTriNbTest')).exec(value);
				if (result!=null) value = parseFloat(result[1]);
				// colonne de type "yy (xx)"
				var result = new RegExp(L._Get('sTriPtsTest')).exec(value);
				if (result!=null) value = parseInt(result[1]);
				// colonne de type "xx(yy%)"
				var result = new RegExp(L._Get('sTriPrcTest')).exec(value);
				if (result!=null) value = parseInt(result[1]);
				if (value=='∞') value = Infinity ;
				}
			else if (isA!=null){
				var result = new RegExp("\\?a(=([^&$]+)|)(&|$)").exec(isA.href);
				if (result!=null){
					if (result[2]=='ambush') value = isIMG.src; // colonne embuscade
					else if (result[2]=='townview'){// colonne "adresse"
						result = new RegExp(L._Get('sTriAdrTest')).exec(isA.textContent);
						if (result!=null) value = parseInt(result[1])*100000+parseInt(result[2])*100+parseInt(result[3]);
						}
					else value = isA.textContent.toUpperCase();// colonne "Nom"
					}
				}
			else if (isIMG!=null){
				var result = new RegExp(L._Get('sTriOLTest')).exec(isIMG.alt);
				if (result!=null){// tri pour la colonne "En ligne"
					var j = _Exist(result[2])?parseInt(result[2]):0,
						h = _Exist(result[4])?parseInt(result[4]):0,
						m = _Exist(result[6])?parseInt(result[6]):0,
						s = _Exist(result[8])?parseInt(result[8]):0;
					value = j*24*60*60+h*60*60+m*60+s;
					}
				else{// tri pour k et expé
					var result = new RegExp(L._Get('sTriImgTest')).exec(isIMG.src);
					if (result!=null) value=(result[1]=='ok'?0:1);
					else value = isIMG.src;
					}
				}
			list2[i]={"key":value,"code":ligne};
			}
		}
	// tri de la liste suivant la colonne sélectionnée
	list2.sort(function(a,b){return a["key"]<b["key"]?-1:a["key"]==b["key"]?0:1;});
	if (order=='-') list2.reverse();
	tbody.innerHTML = "";
	if (header!=null) tbody.appendChild(header);
	for(var i=0; i<list2.length; i++){
		if (i%2==0){
			list2[i]["code"].setAttribute('class','');
			list2[i]["code"].setAttribute('onmouseout',"this.className='';");
			}
		else{
			list2[i]["code"].setAttribute('class','even');
			list2[i]["code"].setAttribute('onmouseout',"this.className='even';");
			}
		tbody.appendChild(list2[i]["code"]);
		}
	}

function AnalyseRC(){
	function clickCol(e,i){// i[0]= n°table, i[1]= col
		var header = DOM._GetFirstNode("//tr[@id='BWE_RC"+i[0]+"c']"),
			tbody =  DOM._GetFirstNode("//tbody[@id='BWE_RC"+i[0]+"b']"),
			tri = GM._GetVar(opt+'trRC'+i[0],{'col':1,'order':'+'}),
			order = (i[1]==tri['col']&&tri['order']=='+')?'-':'+',
			oldCol = DOM._GetFirstNode(".//th["+tri['col']+"]/span",header),
			newCol = DOM._GetFirstNode(".//th["+i[1]+"]",header);
		if (oldCol!=null) oldCol.parentNode.removeChild(oldCol);
		IU._CreateElement('span',{'class':'BWEtriSelect'},[(order=='+'?L._Get('sTriUp'):L._Get('sTriDown'))],{},newCol);
		GM._SetVar(opt+'trRC'+i[0],{'col':i[1],'order':order});
		if (tbody!=null) FctTriA(i[1],order,tbody,null,DOM._GetNodes("./tr",tbody));
		}
	function playinit(){
		this.count=1;this.cl=null;this.init=[];this.hit=0;this.cc=0;this.fail=0;
		this.esq=0;this.dmin=null;this.rdd=[];this.dmax=0;this.dmg=0;this.dnb=0;
		this.dfail=0;this.desq=0;this.pvlost=0;this.pvwin=0;this.dead=[]};
	var msgContent = DOM._GetFirstNode("//div[(@class='msg-content ' or @class='msg-content msg-quest')]"),
		versus = DOM._GetFirstNode(".//table[@class='fight']//tr[@class='versus']",msgContent),
		RC = DOM._GetFirstNode(".//div[(@class='rlc fight' or @class='rlc')]",msgContent),
		t0Show = !!GM._GetVar(opt+'chRc0',true),
		t1Show = !!GM._GetVar(opt+'chRc1',true),
		t2Show = !!GM._GetVar(opt+'chRc2',true),
		t3Show = !!GM._GetVar(opt+'chRc3',true);
	if (versus!=null&&RC!=null&&(t0Show||t1Show||t2Show||t3Show)){
		var list = {};
		//ajout des protagonistes
		var prAtt = DOM._GetNodes(".//div[@class='amblist rlr fll']/ul/li/span",msgContent);
		for (var i=0;i<prAtt.snapshotLength;i++){
			var temp = prAtt.snapshotItem(i).textContent;
			if (_Exist(list[temp])) list[temp].count++;
			else{list[temp] = new playinit();list[temp].cl = 'atkHit';}
			}
		var prDef = DOM._GetNodes(".//div[@class='amblist rll flr']/ul/li/span",msgContent);
		for (var i=0;i<prDef.snapshotLength;i++){
			var temp = prDef.snapshotItem(i).textContent;
			if (_Exist(list[temp])) list[temp].count++;
			else{list[temp] = new playinit();list[temp].cl = 'defHit';}
			}
		// Analyse le RC
		var rounds = DOM._GetNodes("./ul[@class='round']",RC);
		for (var i=0;i<rounds.snapshotLength;i++){
			var round = rounds.snapshotItem(i),
				lignes = DOM._GetNodes("./li",round),
				init = 0;
			for (var j=0;j<lignes.snapshotLength;j++){
				var ligne = lignes.snapshotItem(j),
					ligCla = ligne.getAttribute('class');
				if (ligCla=='playerDeath'){
					var dead = new RegExp(L._Get('sRCDead')).exec(ligne.innerHTML);
					if (dead!=null&&_Exist(list[dead[1]])) list[dead[1]].dead[i] = _Exist(list[dead[1]].dead[i])?list[dead[1]].dead[i]+1:1;
					}
				else if (ligCla=='atkHit'||ligCla=='defHit'){
					var result = new RegExp(L._Get('sRCTest')).exec(ligne.innerHTML);
					if (result!=null){
						var left = new RegExp(L._Get('sRCLeft')).exec(result[1]);
						if (left!=null){
							var tempAtt = _Exist(list[left[1]])?list[left[1]]:new playinit();
							tempAtt.cl = ligCla=='atkHit'?'atkHit':'defHit';
							if (!_Exist(tempAtt.init[i])){ init++; tempAtt.init[i]=init;}
							var right1 = new RegExp(L._Get('sRCRight1')).exec(result[2]);
							var right2 = new RegExp(L._Get('sRCRight2')).exec(result[2]);
							var right3 = new RegExp(L._Get('sRCRight3')).exec(result[2]);
							if (right1!=null||right2!=null||right3!=null){
								var right = right1!=null?right1:(right2!=null?right2:right3),
									tempDef = _Exist(list[right[1]])?list[right[1]]:new playinit(),
									ardeur = result[1].indexOf(L._Get('sRCArdeur'))!=-1;
								tempDef.cl = ligCla=='defHit'?'atkHit':'defHit';
								if (!ardeur) tempDef.dnb++;
								if (right1!=null){
									if (_Exist(tempAtt.rdd[i])) tempAtt.rdd[i] += Number(right[2]);
									else tempAtt.rdd[i] = Number(right[2]);
									tempDef.pvlost += Number(right[2]);
									if (!ardeur){
										tempAtt.hit++;
										tempAtt.dmg += Number(right[2]);
										if (result[1].indexOf(L._Get('sRCCrit'))!=-1) tempAtt.cc++;
										if (tempAtt.dmin==null||(tempAtt.dmin!=null&&tempAtt.dmin>Number(right[2]))) tempAtt.dmin = Number(right[2]);
										if (tempAtt.dmax<Number(right[2])) tempAtt.dmax = Number(right[2]);
										}
									}
								else if (right2!=null){tempAtt.fail++;tempDef.dfail++;}
								else{tempAtt.esq++;tempDef.desq++;}
								if (ligCla=='atkHit'){list[left[1]] = tempAtt; list[right[1]] = tempDef;}
								else{list[right[1]] = tempDef; list[left[1]] = tempAtt;}
								}
							}
						}
					}
				else if (ligCla=='heal'){
					var heal = new RegExp(L._Get('sRCHeal')).exec(ligne.innerHTML);
					if (heal!=null&&_Exist(list[heal[1]])) list[heal[1]].pvwin+= Number(heal[2]);
					var leach = new RegExp(L._Get('sRCLeach')).exec(ligne.innerHTML);
					if (leach!=null&&_Exist(list[leach[1]])) list[leach[1]].pvlost+= Number(leach[2]);
					}
				else if (ligCla=='result'){// mort lors d'un duel
					var sum1 = DOM._GetLastNodeInnerHTML(".//div[@class='sum1']",null,round),
						sum2 = DOM._GetLastNodeInnerHTML(".//div[@class='sum2']",null,round);
					if (sum1!=null&&sum2!=null){
						var result1 = new RegExp("(.+)<br>(.+)").exec(sum1);
						var result2 = new RegExp(L._Get('sAmbushTest7')).exec(sum2);
						if (result1!=null&&result2!=null){
							if (_Exist(list[result1[1]])&&result2[1]==0) list[result1[1]].dead[i]=1;
							if (_Exist(list[result1[2]])&&result2[3]==0) list[result1[2]].dead[i]=1;
							}
						}
					}
				}
			}
		//"Dommages" total des deux camps (expé ou siège)
		var summary = DOM._GetFirstNode(".//div[@class='ambsummary']/table[@class='fight']/tbody",msgContent);
		if (!!t0Show&&summary!=null){
			var totalA = 0, totalD = 0,
				deadA = 0, deadD = 0;
			for (var key in list){
				var	total = 0, dead = 0;
				for (var j=0;j<10;j++){
					total += _Exist(list[key].rdd[j])?list[key].rdd[j]:0;
					dead += _Exist(list[key].dead[j])?list[key].dead[j]:0;
					}
				if (list[key].cl=='atkHit'){
					totalA += total;
					deadD += dead;
					}
				else{
					totalD += total;
					deadA += dead;
					}
				}
			var ligneIU = {
				'tr':['tr',,,,summary],
				'td01':['td',{'class':'BWEbold'},[L._Get('sRCTtotal')],,'tr'],
				'td02':['td',{'class':'BWEbold'},[totalA+' / '+deadA],,'tr'],
				'td03':['td',{'colspan':'2'},,,'tr'],
				'td04':['td',{'class':'BWEbold'},[L._Get('sRCTtotal')],,'tr'],
				'td05':['td',{'class':'BWEbold'},[totalD+' / '+deadD],,'tr'],
				'td06':['td',{'colspan':'2'},,,'tr']};
			IU._CreateElements(ligneIU);
			}
		//Affiche les tableaux
		if (!!t3Show){
			var table3IU = {
				'div':['div',{'style':msgContent.getAttribute('style')}],
				'table':['table',{'id':'BWERC'},,,'div'],
				'thead':['thead',,,,'table'],
				'tr00':['tr',{'class':'BWEbold'},,,'thead'],
				'td001':['td',{'colspan':'12'},[L._Get('sRCTitle3')],,'tr00'],
				'tr01':['tr',{'class':'tblheader'},,,'thead'],
				'td011':['th',,,,'tr01'],
				'td012':['th',{'colspan':'10'},[L._Get('sRCTRd')],,'tr01'],
				'td013':['th',,,,'tr01'],
				'tr02':['tr',{'id':'BWE_RC3c','class':'tblheader'},,,'thead'],
				'td021':['th',,[L._Get('sRCTName')],{'click':[clickCol,[3,1]]},'tr02'],
				'tbody':['tbody',{'id':'BWE_RC3b'},,,'table']},
				table3 = IU._CreateElements(table3IU);
			for (var i=1;i<=10;i++) IU._CreateElement('th',{'style':'width:7%'},[i],{'click':[clickCol,[3,i+1]]},table3['tr02']);
			IU._CreateElement('th',{'style':'width:7%'},[L._Get('sRCTMoy')],{'click':[clickCol,[3,12]]},table3['tr02']);
			for (var key in list){
				var ligneIU = {
						'tr':['tr',,,,table3['tbody']],
						'td01':['td',{'class':(list[key].cl=='atkHit'?'atkHit':'defHit')+' BWEbold'},[key.truncate(20)+(list[key].count>1?' x'+list[key].count:'')],,'tr']},
					ligne = IU._CreateElements(ligneIU),
					init = 0,count = 0;
				for (var j=0;j<10;j++){
					IU._CreateElement('td',{},[_Exist(list[key].init[j])?list[key].init[j]:'∞'],{},ligne['tr']);
					if (_Exist(list[key].init[j])){
						init += list[key].init[j];
						count++;
						}
					}
				IU._CreateElement('td',{},[count>0?(init/count).toFixed(1):''],{},ligne['tr']);
				}
			var tri = GM._GetVar(opt+'trRC3',{'col':1,'order':'+'}),
				newCol = DOM._GetFirstNode("./th["+tri['col']+"]",table3['tr02']);
			IU._CreateElement('span',{'class':'BWEtriSelect'},[(tri['order']=='+'?L._Get('sTriUp'):L._Get('sTriDown'))],{},newCol);
			FctTriA(tri['col'],tri['order'],table3['tbody'],null,DOM._GetNodes("./tr",table3['tbody']));
			msgContent.parentNode.insertBefore(table3['div'],msgContent.nextSibling);
			msgContent.parentNode.insertBefore(IU._CreateElement('br',{},[],{}),msgContent.nextSibling);
			}
		if (!!t2Show){
			var table2IU = {
				'div':['div',{'style':msgContent.getAttribute('style')}],
				'table':['table',{'id':'BWERC'},,,'div'],
				'thead':['thead',,,,'table'],
				'tr00':['tr',{'class':'BWEbold'},,,'thead'],
				'td001':['td',{'colspan':'12'},[L._Get('sRCTitle2')],,'tr00'],
				'tr01':['tr',{'class':'tblheader'},,,'thead'],
				'td011':['th',,,,'tr01'],
				'td012':['th',{'colspan':'10'},[L._Get('sRCTRd')],,'tr01'],
				'td013':['th',,,,'tr01'],
				'tr02':['tr',{'id':'BWE_RC2c','class':'tblheader'},,,'thead'],
				'td021':['th',,[L._Get('sRCTName')],{'click':[clickCol,[2,1]]},'tr02'],
				'tbody':['tbody',{'id':'BWE_RC2b'},,,'table']},
				table2 = IU._CreateElements(table2IU);
			for (var i=1;i<=10;i++) IU._CreateElement('th',{'style':'width:7%'},[i],{'click':[clickCol,[2,i+1]]},table2['tr02']);
			IU._CreateElement('th',{'style':'width:7%'},[L._Get('sRCTtotal')],{'click':[clickCol,[2,12]]},table2['tr02']);
			for (var key in list){
				var ligneIU = {'tr':['tr',,,,table2['tbody']],
							'td01':['td',{'class':(list[key].cl=='atkHit'?'atkHit':'defHit')+' BWEbold'},[key.truncate(20)+(list[key].count>1?' x'+list[key].count:'')],,'tr']},
					ligne = IU._CreateElements(ligneIU),
					total = 0;
				for (var j=0;j<10;j++){
					var dmg = _Exist(list[key].rdd[j])?list[key].rdd[j]:0;
					total += dmg;
					IU._CreateElement('td',{},[dmg],{},ligne['tr']);
					}
				IU._CreateElement('td',{},[total],{},ligne['tr']);
				}
			var tri = GM._GetVar(opt+'trRC2',{'col':1,'order':'+'}),
				newCol = DOM._GetFirstNode("./th["+tri['col']+"]",table2['tr02']);
			IU._CreateElement('span',{'class':'BWEtriSelect'},[(tri['order']=='+'?L._Get('sTriUp'):L._Get('sTriDown'))],{},newCol);
			FctTriA(tri['col'],tri['order'],table2['tbody'],null,DOM._GetNodes("./tr",table2['tbody']));
			msgContent.parentNode.insertBefore(table2['div'],msgContent.nextSibling);
			msgContent.parentNode.insertBefore(IU._CreateElement('br',{},[],{}),msgContent.nextSibling);
			}
		if (!!t1Show){
			var table1IU = {
				'div':['div',{'style':msgContent.getAttribute('style')}],
				'table':['table',{'id':'BWERC'},,,'div'],
				'thead':['thead',,,,'table'],
				'tr00':['tr',{'class':'BWEbold'},,,'thead'],
				'td001':['td',{'colspan':'15'},[L._Get('sRCTitle1')],,'tr00'],
				'tr01':['tr',{'class':'tblheader'},,,'thead'],
				'td011':['th',,,,'tr01'],
				'td012':['th',{'colspan':'5'},[L._Get('sRCTAtt')],,'tr01'],
				'td013':['th',{'colspan':'3'},[L._Get('sRCTDmg')],,'tr01'],
				'td014':['th',{'colspan':'3'},[L._Get('sRCTDef')],,'tr01'],
				'td015':['th',{'colspan':'2'},[L._Get('sRCTPV')],,'tr01'],
				'td016':['th',{'colspan':'1'},[L._Get('sRCTDead')],,'tr01'],
				'tr02':['tr',{'id':'BWE_RC1c','class':'tblheader'},,,'thead'],
				'td021':['th',,[L._Get('sRCTName')],{'click':[clickCol,[1,1]]},'tr02'],
				'td022':['th',,[L._Get('sRCTNb')],{'click':[clickCol,[1,2]]},'tr02'],
				'td023':['th',,[L._Get('sRCTHit')],{'click':[clickCol,[1,3]]},'tr02'],
				'td024':['th',,[L._Get('sRCTCC')],{'click':[clickCol,[1,4]]},'tr02'],
				'td025':['th',,[L._Get('sRCTFail')],{'click':[clickCol,[1,5]]},'tr02'],
				'td026':['th',,[L._Get('sRCTEsq')],{'click':[clickCol,[1,6]]},'tr02'],
				'td027':['th',,[L._Get('sRCTMin')],{'click':[clickCol,[1,7]]},'tr02'],
				'td028':['th',,[L._Get('sRCTMax')],{'click':[clickCol,[1,8]]},'tr02'],
				'td029':['th',,[L._Get('sRCTMoy')],{'click':[clickCol,[1,9]]},'tr02'],
				'td0210':['th',,[L._Get('sRCTNb')],{'click':[clickCol,[1,10]]},'tr02'],
				'td0211':['th',,[L._Get('sRCTFail')],{'click':[clickCol,[1,11]]},'tr02'],
				'td0212':['th',,[L._Get('sRCTEsq')],{'click':[clickCol,[1,12]]},'tr02'],
				'td0213':['th',,[L._Get('sRCTLose')],{'click':[clickCol,[1,13]]},'tr02'],
				'td0214':['th',,[L._Get('sRCTWin')],{'click':[clickCol,[1,14]]},'tr02'],
				'td0215':['th',,[L._Get('sRCTRd')],{'click':[clickCol,[1,15]]},'tr02'],
				'tbody':['tbody',{'id':'BWE_RC1b'},,,'table'],
				'tfoot':['tfoot',,,,'table'],
				'tr03':['tr',,,,'tfoot'],
				'td031':['td',{'colspan':'15'},[L._Get('sRCMsg')],,'tr03']},
				table1 = IU._CreateElements(table1IU);
			for (var key in list){
				var ligneIU = {'tr':['tr',,,,table1['tbody']],
							'td01':['td',{'class':(list[key].cl=='atkHit'?'atkHit':'defHit')+' BWEbold'},[key.truncate(20)+(list[key].count>1?' x'+list[key].count:'')],,'tr'],
							'td02':['td',{'class':'atkHit'},[list[key].hit+list[key].fail+list[key].esq],,'tr'],
							'td03':['td',{'class':'atkHit'},[list[key].hit.toString()+'('+(list[key].hit>0?Math.round(list[key].hit/(list[key].hit+list[key].fail+list[key].esq)*100):0)+'%)'],,'tr'],
							'td04':['td',{'class':'atkHit'},[list[key].cc.toString()+'('+(list[key].hit>0?Math.round(list[key].cc/list[key].hit*100):0)+'%)'],,'tr'],
							'td05':['td',{'class':'atkHit'},[list[key].fail.toString()+'('+(list[key].hit>0?Math.round(list[key].fail/(list[key].hit+list[key].fail+list[key].esq)*100):0)+'%)'],,'tr'],
							'td06':['td',{'class':'atkHit'},[list[key].esq.toString()+'('+(list[key].hit>0?Math.round(list[key].esq/(list[key].hit+list[key].fail+list[key].esq)*100):0)+'%)'],,'tr'],
							'td07':['td',,[(list[key].dmin!=null?list[key].dmin:0)],,'tr'],
							'td08':['td',,[list[key].dmax],,'tr'],
							'td09':['td',,[(list[key].hit>0?Math.round(list[key].dmg/list[key].hit):0)],,'tr'],
							'td10':['td',{'class':'defHit'},[list[key].dnb],,'tr'],
							'td11':['td',{'class':'defHit'},[list[key].dfail.toString()+'('+(list[key].dnb>0?Math.round(list[key].dfail/list[key].dnb*100):0)+'%)'],,'tr'],
							'td12':['td',{'class':'defHit'},[list[key].desq.toString()+'('+(list[key].dnb>0?Math.round(list[key].desq/list[key].dnb*100):0)+'%)'],,'tr'],
							'td13':['td',{'class':'atkHit'},[list[key].pvlost],,'tr'],
							'td14':['td',{'class':'heal'},[list[key].pvwin],,'tr'],
							'td15':['td',{'class':'playerDeath'},,,'tr']},
					ligne = IU._CreateElements(ligneIU);
				for (var j=0;j<list[key].dead.length;j++) ligne['td15'].textContent+=(_Exist(list[key].dead[j])?(ligne['td15'].textContent.length>0?',':'')+(j+1)+(list[key].dead[j]>1?'x'+list[key].dead[j]:''):'');
				}
			var tri = GM._GetVar(opt+'trRC1',{'col':1,'order':'+'}),
				newCol = DOM._GetFirstNode("./th["+tri['col']+"]",table1['tr02']);
			IU._CreateElement('span',{'class':'BWEtriSelect'},[(tri['order']=='+'?L._Get('sTriUp'):L._Get('sTriDown'))],{},newCol);
			FctTriA(tri['col'],tri['order'],table1['tbody'],null,DOM._GetNodes("./tr",table1['tbody']));
			msgContent.parentNode.insertBefore(table1['div'],msgContent.nextSibling);
			}
		}
	}


/******************************************************
* START
*
******************************************************/
// vérification des services
if (!JSON) throw new Error("Erreur : le service JSON n\'est pas disponible.");
else if (!window.localStorage) throw new Error("Erreur : le service localStorage n\'est pas disponible.");
else{
	SetCSS();
	// DEBUG - initialisation
	var startTime = new Date();
	DEBUG._Add('DEBUG',1,'_Début:: '+startTime.toLocaleString()+'...');
	// INIT
	var page = DATAS._GetPage();
	// cas spécifique des messages extérieurs (forum...)
	if (page=='pShowMsg'){
		var lastID = GM._GetVar('BWE:LASTID',null);
		if (lastID!=null){
			var opt = 'BWE:O:'+lastID+':';//Moria:64396
			AnalyseRC();
			}
		}
	var player = DATAS._PlayerName();
	if (player==null)throw new Error(L._Get("sUnknowPlayer"));
	else{
		var IDs = GM._GetVar('BWE:ID',{}),
			realm = DATAS._Royaume(),
			ID = _Exist(IDs[realm+':'+player])?IDs[realm+':'+player]:null;
		if (ID==null){
			var result = DOM._GetFirstNodeTextContent("//div[@class='throne-maindiv']/div/span[@class='reflink']",null);
			if (result!=null){
				var result2 = /r\.php\?r=([0-9]+)/.exec(result);
				ID = _Exist(result2[1])?result2[1]:null;
				if (ID!=null){
					for (var i in IDs) if (IDs[i]==ID) delete IDs[i];
					IDs[realm+':'+player] = ID;
					GM._SetVar('BWE:ID',IDs);
					}
				}
			}
		if (ID==null) alert(L._Get("sUnknowID"));
		else{
			GM._SetVar('BWE:LASTID',realm+':'+ID);
			var opt = 'BWE:O:'+realm+':'+ID+':',
				DBVersion = DS._GetVar('BWE:V',null),
				BWEVersion = '?';
			if (typeof(GM_info)=='object') BWEVersion = GM_info.script.version;
			else if (typeof(GM_info)=='function') BWEVersion = GM_info().script.version;
			else if (typeof(GM_getMetadata)=='function') BWEVersion = GM_getMetadata('version')[0];
			if (DBVersion==null){
				for (var i=DS._Length()-1;i>=0;i--){
					var key = DS._Key(i),
						result = /BWE_Log_(.+)/.exec(key),
						result2 = /BWE_Options_(.+)/.exec(key);
					if (result!=null){
						var log = DS._GetVar(key,{});
						for (var j in log){
							if (_Type(log[j]['msgId'])=='String'&&_Type(log[j]['msgDate'])=='Date'&&_Type(log[j]['emb'])=='Object'){
								var emb = ['','','','',[],[],[],[],[]];
								if (_Exist(log[j]['emb']['%'])) emb[0] = log[j]['emb']['%'];
								if (_Exist(log[j]['emb']['r'])) emb[1] = log[j]['emb']['r'];
								if (_Exist(log[j]['emb']['a'])) emb[2] = log[j]['emb']['a'];
								if (_Exist(log[j]['emb']['d'])) emb[3] = log[j]['emb']['d'];
								if (_Exist(log[j]['emb']['aa'])){
									var arc = L._Get('sArc');
									for (var x=0;x<log[j]['emb']['aa'].length;x++){
										var result3 = /([0-9]+)x (.+)/.exec(log[j]['emb']['aa'][x]);
										if (result3!=null) emb[4].push([arc.indexOf(result3[2]),result3[1]]);
										}
									}
								if (_Exist(log[j]['emb']['ad'])){
									var arc = L._Get('sArc');
									for (var x=0;x<log[j]['emb']['ad'].length;x++){
										var result3 = /([0-9]+)x (.+)/.exec(log[j]['emb']['ad'][x]);
										if (result3!=null) emb[5].push([arc.indexOf(result3[2]),result3[1]]);
										}
									}
								UpdateHistory(ID,result[1],log[j]['msgId'],log[j]['msgDate'],emb);
								}
							}
						DS._Delete(key);
						}
					else if (result2!=null) DS._Delete(key);
					}
				DS._SetVar('BWE:V',1.1);
				}
			if (DBVersion==1){
				var oldArc = GM._GetVar(opt+'arc',[]),
					oldEvo = GM._GetVar(opt+'evo',[]),
					arc = L._Get('sArc'),
					evo = L._Get('sEvo');
				for (var i=DS._Length()-1;i>=0;i--){
					var key = DS._Key(i);
					if (key.indexOf('BWE:O:')==0) DS._Delete(key);
					var reg = new RegExp('^BWE:L:((\\d+)|((?!\\d+:)[^:]+)):((?!\\2$)(?:\\d+|(?!\\3$)[^:$]+))$').exec(key);
					if (reg!=null){
						var log = DS._GetVar(key,null);
						for (var j=0;j<log.length;j++){
							if (_Type(log[j][2])=='Array'){
								var emb = log[j][2];
								if (_Type(emb[4])=='Array') // aa
									for (var k=emb[4].length-1;k>=0;k--){
										var arcName = (_Exist(emb[4][k][0])&&_Exist(oldArc[emb[4][k][0]]))?oldArc[emb[4][k][0]]:null;
										if (arcName!=null) emb[4][k][0] = arc.indexOf(arcName);
										else emb[4].splice(k,1);
										}
								if (_Type(emb[5])=='Array') // ad
									for (var k=emb[5].length-1;k>=0;k--){
										var arcName = (_Exist(emb[5][k][0])&&_Exist(oldArc[emb[5][k][0]]))?oldArc[emb[5][k][0]]:null;
										if (arcName!=null) emb[5][k][0] = arc.indexOf(arcName);
										else emb[5].splice(k,1);
										}
								if (_Type(emb[6])=='Array') // ea
									for (var k=emb[6].length-1;k>=0;k--){
										var evoName = (_Exist(emb[6][k][0])&&_Exist(oldEvo[emb[6][k][0]]))?oldEvo[emb[6][k][0]]:null;
										if (evoName!=null) emb[6][k][0] = evo.indexOf(evoName);
										else emb[6].splice(k,1);
										}
								if (_Type(emb[7])=='Array') // ed
									for (var k=emb[7].length-1;k>=0;k--){
										var evoName = (_Exist(emb[7][k][0])&&_Exist(oldEvo[emb[7][k][0]]))?oldEvo[emb[7][k][0]]:null;
										if (evoName!=null) emb[7][k][0] = evo.indexOf(evoName);
										else emb[7].splice(k,1);
										}
								}
							}
						DS._SetVar(key,log);
						}
					}
				DS._SetVar('BWE:V',1.1);
				}
			if (DBVersion==1.1){
				for (var i=DS._Length()-1;i>=0;i--){
					var key = DS._Key(i);
					var reg = new RegExp('^BWE:O:(.+)$').exec(key);
					if (reg!=null) DS._Delete(key);
					var reg = new RegExp('^BWE:L:((\\d+)|((?!\\d+:)[^:]+)):((?!\\2$)(?:\\d+|(?!\\3$)[^:$]+))$').exec(key);
					if (reg!=null){
						var log = DS._GetVar(key,null);
						for (var j=0;j<log.length;j++){
							if (_Type(log[j][2])=='Array'){
								var emb = log[j][2];
								if (_Type(emb[10])=='Array') emb[11] = emb[10];
								else emb[11]= new Array();
								if (_Type(emb[9])=='Array') emb[10] = emb[9];
								else emb[10]= new Array();
								if (_Type(emb[8])=='Array'){
									var carac = L._Get('sChar'),
										temp = emb[8];
									emb[8] = new Array();
									emb[9] = new Array();
									for (var k=0;k<carac.length-1;k++){
										if (_Type(temp[k])=='Array'){
											emb[8][k] = temp[k][0];
											emb[9][k] = temp[k][1];
											}
										}
									}
								}
							}
						DS._SetVar(key,log);
						}
					}
				DS._Delete('BWE:ID');
				DS._SetVar('BWE:V',1.2);
				}
			// valeurs globales
			var opacity = 1,
				plDatas = DS._GetVar('BWE:P:'+player,{}),
				defCol = {'OPr':[[0,true,0],[1,true,1],[2,true,2],[3,true,3],[4,true,4],[5,false,5],[6,false,6],[7,true,-1],[8,false,-1],[10,true,7],[9,true,8],[4,true,9],[11,true,10],[12,true,11],[4,true,12],[13,true,13]],
				'Pr':[[0,true,0],[1,true,1],[2,true,2],[3,true,3],[4,true,4],[5,false,5],[6,false,6],[7,true,-1],[8,false,-1],[14,true,-1],[10,true,7],[9,true,8],[4,true,9],[11,true,10],[12,true,11],[4,true,12],[13,true,13]],
				'OCl':[[15,true,1],[16,false,2],[17,true,-1],[18,true,-1],[19,true,-1],[2,true,3],[20,true,4],[5,false,5],[6,false,6],[7,true,-1],[21,false,-1],[0,true,-1],[1,false,-1],[22,true,-1],[11,false,7]],
				'Cl':[[15,true,1],[23,true,-1],[24,true,2],[25,true,-1],[2,true,3],[20,true,4],[5,false,5],[6,false,6],[7,true,-1],[21,false,-1],[0,true,-1],[1,false,-1],[22,true,-1],[11,false,7]],
				'Ra':[[26,true,1],[27,true,2],[0,true,3],[1,false,4],[22,true,-1],[23,true,-1],[24,true,5],[25,true,-1],[2,true,6],[3,true,7],[5,false,-1],[6,false,8],[7,true,-1]],
				'To':[[28,true,1],[29,true,2],[9,true,3],[6,false,4],[5,false,-1],[7,true,-1],[23,true,-1],[24,true,5],[25,true,-1],[0,true,6],[1,false,7],[22,true,-1],[3,true,8],[30,true,9]],
				'logA':[[0,true],[1,true],[2,true],[3,true],[4,true],[5,true],[6,true],[7,true],[8,true],[9,true],[10,true],[11,true],[12,true],[13,true]],
				'logD':[[0,true],[1,true],[2,true],[3,true],[4,true],[5,true],[6,true],[7,true],[8,true],[9,true],[10,true],[11,true],[12,true],[13,true]],
				'chA':[[0,false],[1,false],[2,true],[3,false],[4,true],[5,true],[6,false],[7,false],[8,true],[9,true],[10,false],[11,false],[12,false]],
				'chD':[[0,false],[1,false],[2,true],[3,false],[4,true],[5,true],[6,false],[7,true],[8,false],[9,true],[10,false],[11,false],[12,false]],
				'Res':[[0,true],[1,true],[2,true],[3,true],[4,true],[5,true]],
				};
			start();
			}
		}
	// DEBUG End
	var endTime = new Date();
	DEBUG._Add('DEBUG',1,'_Fin:: '+endTime.toLocaleString()+' après '+((endTime.getTime() - startTime.getTime())/1000));
	}
	
function start(){
	function showHideGr(e,par){//par[0]= node title,par[1]= node trA,par[2]= node trB
		var status = !GM._GetVar(opt+'ShGr',false);
		GM._SetVar(opt+'ShGr',status);
		par['1'].setAttribute('style','display:'+(status?'table-row;':'none;'));
		par['2'].setAttribute('style','display:'+(status?'table-row;':'none;'));
		par[0].setAttribute('style','color:'+(status?'lime;':'red;')+';cursor: pointer;');
		}

	function onSubtreeModified(e){
		var newChief = DOM._GetFirstNodeTextContent("//div[@id='content-mid']//div[@id='tw_table']//tr/td[4]");
		if (newChief!=null&&chief!=newChief){
			var header = DOM._GetFirstNode("//div[@id='content-mid']//div[@id='tw_table']//tr[@class='tblheader']");
			if (header!=null){
				// désactive le handler le temps de modifier le tableau
				IU._removeEvent(elemToCheck,'DOMSubtreeModified', funcName);
				ChangeTable(header);
				funcName = IU._addEvent(elemToCheck,'DOMSubtreeModified',onSubtreeModified);
				}
			chief = newChief;
			}
		}

	function show_hide(e,par){
		var status = !GM._GetVar(opt+'Sh'+par[2],true);
		GM._SetVar(opt+'Sh'+par[2],status);
		par[0].setAttribute('style','display:'+(status?'block;':'none;'));
		par[1].setAttribute('style','color:'+(status?'lime;':'red;')+';cursor: pointer;');
		}

	function setMenu(e,menu){
		function check(e,i){
			GM._SetVar(opt+i,nodeMenu[i].checked);
			}

		function inputNumber(e,i){
			var value = nodeMenu[i].value,
				result = new RegExp("^(|(?:[0-9]+|[0-9]*[.]?[0-9]+))$").exec(value);
			if (result!=null){
				nodeMenu[i].setAttribute('class','BWEAEBut');
				GM._SetVar(opt+i,value);
				}
			else nodeMenu[i].setAttribute('class','BWEAEButError');
			}

		function changeCol(e,i){// i[0]= liste, i[1]= ligne, i[2]= ligne + ou -
			var value = GM._GetVar(opt+i[0][0],clone(defCol[i[0][0]])),
				cell1 = DOM._GetFirstNode("//td[@id='BWE_"+i[0][0]+'_'+i[1]+"']"),
				cell2 = DOM._GetFirstNode("//td[@id='BWE_"+i[0][0]+'_'+i[2]+"']"),
				temp = value[i[1]];
			value[i[1]] = value[i[2]];
			value[i[2]] = temp;
			cell1.setAttribute('style','text-decoration:'+(value[i[1]][1]==true?'none':'line-through'));
			cell2.setAttribute('style','text-decoration:'+(value[i[2]][1]==true?'none':'line-through'));
			cell1.textContent = L._Get(i[0][1])[value[i[1]][0]];
			cell2.textContent = L._Get(i[0][1])[value[i[2]][0]];
			GM._SetVar(opt+i[0][0],value);
			}
			
		function clickCol(e,i){// i[0]= node, i[1]= liste, i[2]= ligne
			var value = GM._GetVar(opt+i[1][0],clone(defCol[i[1][0]]));
			value[i[2]][1] = !value[i[2]][1];
			i[0].setAttribute('style','text-decoration:'+(value[i[2]][1]==true?'none':'line-through'));
			GM._SetVar(opt+i[1][0],value);
			}

		function createColList(liste,table){
			var max = 0;
				temp = new Array();
			for (var i=0;i<liste.length;i++){
				temp[i] = GM._GetVar(opt+liste[i][0],clone(defCol[liste[i][0]]));
				if (temp[i].length+1>max) max = temp[i].length+1;
				}
			for (var j=0;j<max;j++){
				var tr = IU._CreateElements({'tr':['tr',,,,table]});
				for (var i=0;i<liste.length;i++){
					if (_Exist(temp[i][j])){
						var cellIU = {'td0':['td',{'class':'BWEPrefTD0 even'},,,tr['tr']],
							'td1':['td',{'class':(j%2==1?'even ':'')+'BWEPrefTD1'},[j],,tr['tr']],
							'td2':['td',{'class':(j%2==1?'even ':'')+'BWEPrefTD2','id':('BWE_'+liste[i][0]+'_'+j)},[L._Get(liste[i][1])[temp[i][j][0]]],,tr['tr']],
							'td3':['td',{'class':(j%2==1?'even ':'')+'BWEPrefTD3'},,,tr['tr']]},
							cell = IU._CreateElements(cellIU);
						cell['td2'].setAttribute('style','text-decoration:'+(temp[i][j][1]==true?'none':'line-through'));
						IU._addEvent(cell['td2'],'click',clickCol,[cell['td2'],liste[i],j]);
						if (j!=0) IU._CreateElement('a',{},[L._Get('sTriUp')],{'click':[changeCol,[liste[i],j,(j-1)]]},cell['td3']);
						if (j<temp[i].length-1) IU._CreateElement('a',{},[L._Get('sTriDown')],{'click':[changeCol,[liste[i],j,(j+1)]]},cell['td3']);
						}
					else IU._CreateElement('td',{'class':'even','colspan':'4','height':'10px'},[],{},tr['tr']);
					}
				IU._CreateElement('td',{'class':'BWEPrefTD0 even'},[],{},tr['tr']);
				}
			}

		function razGM(e,i){
				var vals = GM._list();
				for (var j=0;j<vals.length;j++){
					var reg = new RegExp('^'+i+'(.+)$').exec(vals[j]);
					if (reg!=null) GM._Delete(vals[j]);
					}
				setMenu(null,'2');
			}
			
		function selectLSChange(e){
			if (nodeMenu['selectLS'].selectedIndex>=0)
				nodeMenu['divLS'].textContent = JSONS._Encode(DS._GetVar(unescape(nodeMenu['selectLS'].options[nodeMenu['selectLS'].selectedIndex].value),""));
			}
			
		function delLS(e){
			if (nodeMenu['selectLS'].selectedIndex>=0){
				var index = nodeMenu['selectLS'].selectedIndex,
					value = unescape(nodeMenu['selectLS'].options[index].value);
				DS._Delete(value);
				result.splice(index,1);
				LSList.splice(LSList.indexOf(value),1);
				nodeMenu['selectLS'].remove(index);
				nodeMenu['divLS'].textContent = "";
				nodeMenu['td1_2_0'].textContent = L._Get('sResult',result.length,LSList.length);
				nodeMenu['divIE'].textContent = '';
				}
			}

		function razLS(e){
			if (confirm(L._Get("sRazChkLS"))){
				nodeMenu['divLS'].textContent = "";
				nodeMenu['td1_2_0'].textContent = L._Get('sResult',0,0);
				LSList = new Array(),
				result = new Array();
				while (nodeMenu['selectLS'].length>0) nodeMenu['selectLS'].remove(0);
				for (var i=DS._Length()-1;i>=0;i--) if(DS._Key(i).indexOf('BWE:')==0) DS._Delete(DS._Key(i));
				nodeMenu['divIE'].textContent = '';
				}
			}

		function triLSList(e){
			while (nodeMenu['selectLS'].length>0) nodeMenu['selectLS'].remove(0);
			nodeMenu['divLS'].textContent = "";
			result = new Array();
			for (var i=0;i<LSList.length;i++)
				if(LSList[i].toLowerCase().indexOf(nodeMenu['LSsearch'].value.toLowerCase())!=-1) result.push(i);
			result.sort(function(a,b){
				var x = LSList[a].toLowerCase(),
					y = LSList[b].toLowerCase();
				return x<y?-1:x==y?0:1;
				});
			nodeMenu['td1_2_0'].textContent = L._Get('sResult',result.length,LSList.length);
			for (var i=0;i<result.length;i++)IU._CreateElement('option',{'value':escape(LSList[result[i]])},[LSList[result[i]]],{},nodeMenu['selectLS']);
			nodeMenu['selectLS'].selectedIndex = 0;
			selectLSChange();
			}

		function outputLog(){
			var output = '';
			for (var i=0;i<DS._Length();i++){
				var key = DS._Key(i),
					result = new RegExp('^BWE:L:('+ID+'(:(?!'+ID+'$)(.+$))|(((?!'+ID+':)(.+:))'+ID+'$))').exec(key);
				if (result!=null) output += key+'='+JSONS._Encode(DS._GetVar(key,[]));
				}
			nodeMenu['divIE'].textContent = escape(output);
			}

		function importLog(e){
			var input = unescape(nodeMenu['textIE'].value),
				x = 0,i,reg = new RegExp('BWE:L:('+ID+'(?!:'+ID+'=)|(?!'+ID+':)[^:=]+(?=:'+ID+'=)):([^:=]+)=(\\[.*?\\])(?=BWE|$)','g');
			while ((i=reg.exec(input))!=null){
				var att = i[1],def = i[2],log = i[3],
					result = JSONS._Decode(log);
				for (var j=0;j<result.length;j++){
					UpdateHistory(att,def,result[j][0],new Date(result[j][1]),result[j][2]);
					if (DS._GetVar('BWE:L:'+att+':'+def,null)!=null&&LSList.indexOf('BWE:L:'+att+':'+def)==-1) LSList.push('BWE:L:'+att+':'+def);
					x++;
					nodeMenu['td3_2_1'].textContent = L._Get('sIEResult',x);
					}
				}
			nodeMenu['divIE'].textContent = '';
			triLSList();
			}

		var result = DOM._GetNodes(".//a", nodeOptions);
		for (var i=0; i<result.snapshotLength; i++)	result.snapshotItem(i).className = '';
		nodeTitle[menu].className = 'active';
		var content = DOM._GetFirstNode("./following-sibling::div[@class='hr720']/following-sibling::*",nodeOptions),
			content2 = DOM._GetFirstNode("./following-sibling::div[@class='hr720']/following-sibling::script",nodeOptions);
		if (content!=null){
			if (menu=='2'){
				var menuIU = {
					'menudiv':['div',{'align':'center','style':'margin-top: 15px;'}],
					'divalert':['div',{'class':'auBid','style':'border: 1px solid #C5C55A; padding: 3px; margin: 3px;'},,,'menudiv'],
					'table':['table',{'style':'width: 100%;'},,,'divalert'],
					'tr_0':['tr',,,,'table'],
					'td_0_0':['td',{'align':'center','width':'30'},,,'tr_0'],
					'img_0_0':['img',{'src':'./gfx/infobox_info.gif'},,,'td_0_0'],
					'td_0_1':['td',{'class':'same'},[L._Get('sInfoMsg')],,'tr_0'],
					'BR0':['br',,,,'menudiv'],
					// Listes
					'table0':['table',{'style':'width:100%;','cellspacing':'0','cellpadding':'0'},,,'menudiv'],
					'tr0_0':['tr',{'class':'tblheader'},,,'table0'],
					'td0_0_0':['td',{'class':'BWELeft','colspan':'17'},[L._Get("sTitleList")],,'tr0_0'],
					'tr0_1':['tr',,,,'table0'],
					'td0_1_0':['td',{'class':'BWERight even','colspan':'2'},,,'tr0_1'],
					'chOCl':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chOCl',true)},,{'change':[check,'chOCl']}, 'td0_1_0'],
					'td0_1_1':['td',{'class':'BWELeft even','colspan':'2'},[L._Get("sColOClan")],,'tr0_1'],
					'td0_1_2':['td',{'class':'BWERight even','colspan':'2'},,,'tr0_1'],
					'chCl':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chCl',true)},,{'change':[check,'chCl']}, 'td0_1_2'],
					'td0_1_3':['td',{'class':'BWELeft even','colspan':'2'},[L._Get("sColClan")],,'tr0_1'],
					'td0_1_4':['td',{'class':'BWERight even','colspan':'2'},,,'tr0_1'],
					'chRa':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chRa',true)},,{'change':[check,'chRa']}, 'td0_1_4'],
					'td0_1_5':['td',{'class':'BWELeft even','colspan':'2'},[L._Get("sColRank")],,'tr0_1'],
					'td0_1_6':['td',{'class':'BWERight even','colspan':'2'},,,'tr0_1'],
					'chTo':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chTo',true)},,{'change':[check,'chTo']}, 'td0_1_6'],
					'td0_1_7':['td',{'class':'BWELeft even','colspan':'2'},[L._Get("sColTown")],,'tr0_1'],
					'td0_1_8':['td',{'class':'BWEPrefTD0 even'},,,'tr0_1'],
					'br1':['br',,,,'menudiv'],
					// Historique
					'table1':['table',{'style':'width:100%;','cellspacing':'0','cellpadding':'0'},,,'menudiv'],
					'tr1_0':['tr',{'class':'tblheader'},,,'table1'],
					'td1_0_0':['td',{'class':'BWELeft','colspan':'21'},[L._Get("sTitleLog")],,'tr1_0'],
					'tr1_1':['tr',,,,'table1'],
					'td1_1_0':['td',{'class':'BWERight even','colspan':'2'},,,'tr1_1'],
					'td1_1_1':['td',{'class':'BWELeft even','colspan':'2'},[L._Get("sColLogA")],,'tr1_1'],
					'td1_1_2':['td',{'class':'BWERight even','colspan':'2'},,,'tr1_1'],
					'td1_1_3':['td',{'class':'BWELeft even','colspan':'2'},[L._Get("sColLogD")],,'tr1_1'],
					'td1_1_4':['td',{'class':'BWERight even','colspan':'2'},,,'tr1_1'],
					'td1_1_5':['td',{'class':'BWELeft even','colspan':'2'},[L._Get("sColCarA")],,'tr1_1'],
					'td1_1_6':['td',{'class':'BWERight even','colspan':'2'},,,'tr1_1'],
					'td1_1_7':['td',{'class':'BWELeft even','colspan':'2'},[L._Get("sColCarD")],,'tr1_1'],
					'td1_1_8':['td',{'class':'BWERight even','colspan':'2'},,,'tr1_1'],
					'td1_1_9':['td',{'class':'BWELeft even','colspan':'2'},[L._Get("sColRes")],,'tr1_1'],
					'td1_1_10':['td',{'class':'BWEPrefTD0 even'},,,'tr1_1'],
					'br2':['br',,,,'menudiv'],
					// Profiles + Divers
					'table2':['table',{'style':'width:100%;','cellspacing':'0','cellpadding':'0'},,,'menudiv'],
					'tr2_0':['tr',,,,'table2'],
					'td2_0_0':['td',{'valign':'top'},,,'tr2_0'],
					// Profiles
					'table3':['table',{'style':'width: 100%;','cellspacing':'0','cellpadding':'0'},,,'td2_0_0'],
					'tr3_0':['tr',{'class':'tblheader'},,,'table3'],
					'td3_0_0':['td',{'class':'BWELeft','colspan':'9'},[L._Get("sTitleProf")],,'tr3_0'],
					'tr3_1':['tr',,,,'table3'],
					'td3_1_0':['td',{'class':'BWERight even','colspan':'2'},,,'tr3_1'],
					'chOP':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chOP',true)},,{'change':[check,'chOP']}, 'td3_1_0'],
					'td3_1_1':['td',{'class':'BWELeft even','colspan':'2'},[L._Get("sColOProf")],,'tr3_1'],
					'td3_1_2':['td',{'class':'BWERight even','colspan':'2'},,,'tr3_1'],
					'chP':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chP',true)},,{'change':[check,'chP']}, 'td3_1_2'],
					'td3_1_3':['td',{'class':'BWELeft even','colspan':'2'},[L._Get("sColProf")],,'tr3_1'],
					'td3_1_4':['td',{'class':'BWEPrefTD0 even'},,,'tr3_1'],
					'td2_0_1':['td',{'width':'2%'},,,'tr2_0'],
					'td2_0_2':['td',{'valign':'top'},,,'tr2_0'],
					// Divers
					'table4':['table',{'style':'width: 100%;','cellspacing':'0','cellpadding':'0'},,,'td2_0_2'],
					'tr4_0':['tr',{'class':'tblheader'},,,'table4'],
					'td4_0_0':['td',{'class':'BWELeft','colspan':'10'},[L._Get("sTitleDivers")],,'tr4_0'],
					'tr4_1':['tr',,,,'table4'],
					'td4_1_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_1'],
					'td4_1_1':['td',{'class':'BWELeft','colspan':'4'},[L._Get("sMenuDesc")],,'tr4_1'],
					'td4_1_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_1'],
					'chDe':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chDe',true)},,{'change':[check,'chDe']},'td4_1_2'],
					'td4_1_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_1'],
					'tr4_2':['tr',{'class':'even'},,,'table4'],
					'td4_2_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_2'],
					'td4_2_1':['td',{'class':'BWELeft','colspan':'4'},[L._Get("sMenuAmis")],,'tr4_2'],
					'td4_2_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_2'],
					'chAm':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chAm',true)},,{'change':[check,'chAm']},'td4_2_2'],
					'td4_2_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_2'],
					'tr4_3':['tr',,,,'table4'],
					'td4_3_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_3'],
					'td4_3_1':['td',{'class':'BWELeft','colspan':'4'},[L._Get("sMenuStones")],,'tr4_3'],
					'td4_3_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_3'],
					'chSt':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chSt',true)},,{'change':[check,'chSt']},'td4_3_2'],
					'td4_3_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_3'],
					'tr4_4':['tr',{'class':'even'},,,'table4'],
					'td4_4_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_4'],
					'td4_4_1':['td',{'class':'BWELeft','colspan':'4'},[L._Get("sMenuTri")],,'tr4_4'],
					'td4_4_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_4'],
					'chTr':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chTr',true)},,{'change':[check,'chTr']},'td4_4_2'],
					'td4_4_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_4'],
					'tr4_5':['tr',,,,'table4'],
					'td4_5_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_5'],
					'td4_5_1':['td',{'class':'BWELeft','colspan':'4'},[L._Get("sMenuLog")],,'tr4_5'],
					'td4_5_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_5'],
					'chLo':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chLo',true)},,{'change':[check,'chLo']},'td4_5_2'],
					'td4_5_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_5'],
					'tr4_6':['tr',{'class':'even'},,,'table4'],
					'td4_6_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_6'],
					'td4_6_1':['td',{'class':'BWELeft','colspan':'4'},[L._Get("sTitleAEmbu")],,'tr4_6'],
					'AEHelp':['img',{'class':'BWEHelp','src':'/gfx/hint2.png','onmouseout':'nd();','onmouseover':"return overlib('"+L._Get("sAEHelp")+"',WIDTH,500,VAUTO,HAUTO);"},,,'td4_6_1'],
					'td4_6_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_6'],
					'chAE':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chAE',false)},,{'change':[check,'chAE']},'td4_6_2'],
					'td4_6_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_6'],
					'tr4_7':['tr',{'class':'even'},,,'table4'],
					'td4_7_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_7'],
					'td4_7_1':['td',{'class':'BWELeft','colspan':'8'},[L._Get("sAENiv")],,'tr4_7'],
					'td4_7_2':['td',{'class':'BWEPrefTD0 even'},,,'tr4_7'],
					'tr4_8':['tr',{'class':'even'},,,'table4'],
					'td4_8_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_8'],
					'td4_8_1':['td',{'class':'BWELeft2','colspan':'4'},[L._Get("sAEnMin")],,'tr4_8'],
					'td4_8_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_8'],
					'nMin':['input',{'type':'text','class':'BWEAEBut','value':GM._GetVar(opt+'nMin',''),'size':'5','maxlength':'5'},,{'change':[inputNumber,'nMin'],'keyup':[inputNumber,'nMin']},'td4_8_2'],
					'td4_8_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_8'],
					'tr4_9':['tr',{'class':'even'},,,'table4'],
					'td4_9_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_9'],
					'td4_9_1':['td',{'class':'BWELeft2','colspan':'4'},[L._Get("sAEnMax")],,'tr4_9'],
					'td4_9_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_9'],
					'nMax':['input',{'type':'text','class':'BWEAEBut','value':GM._GetVar(opt+'nMax',''),'size':'5','maxlength':'5'},,{'change':[inputNumber,'nMax'],'keyup':[inputNumber,'nMax']},'td4_9_2'],
					'td4_9_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_9'],
					'tr4_10':['tr',{'class':'even'},,,'table4'],
					'td4_10_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_10'],
					'td4_10_1':['td',{'class':'BWELeft2','colspan':'4'},[L._Get("sAEaMin")+' (%)'],,'tr4_10'],
					'td4_10_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_10'],
					'aMin':['input',{'type':'text','class':'BWEAEBut','value':GM._GetVar(opt+'aMin',''),'size':'5','maxlength':'5'},,{'change':[inputNumber,'aMin'],'keyup':[inputNumber,'aMin']},'td4_10_2'],
					'td4_10_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_10'],
					'tr4_11':['tr',{'class':'even'},,,'table4'],
					'td4_11_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_11'],
					'td4_11_1':['td',{'class':'BWELeft2','colspan':'4'},[L._Get("sAEaMax")+' (%)'],,'tr4_11'],
					'td4_11_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_11'],
					'aMax':['input',{'type':'text','class':'BWEAEBut','value':GM._GetVar(opt+'aMax',''),'size':'5','maxlength':'5'},,{'change':[inputNumber,'aMax'],'keyup':[inputNumber,'aMax']},'td4_11_2'],
					'td4_11_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_11'],
					'tr4_12':['tr',{'class':'even'},,,'table4'],
					'td4_12_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_12'],
					'td4_12_1':['td',{'class':'BWELeft','colspan':'8'},[L._Get("sAEcla")],,'tr4_12'],
					'td4_12_2':['td',{'class':'BWEPrefTD0 even'},,,'tr4_12'],
					'tr4_13':['tr',{'class':'even'},,,'table4'],
					'td4_13_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_13'],
					'td4_13_1':['td',{'class':'BWELeft2','colspan':'4'},[L._Get("sAEnMin")],,'tr4_13'],
					'td4_13_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_13'],
					'cMin':['input',{'type':'text','class':'BWEAEBut','value':GM._GetVar(opt+'cMin',''),'size':'5','maxlength':'5'},,{'change':[inputNumber,'cMin'],'keyup':[inputNumber,'cMin']},'td4_13_2'],
					'td4_13_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_13'],
					'tr4_14':['tr',{'class':'even'},,,'table4'],
					'td4_14_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_14'],
					'td4_14_1':['td',{'class':'BWELeft2','colspan':'4'},[L._Get("sAEnMax")],,'tr4_14'],
					'td4_14_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_14'],
					'cMax':['input',{'type':'text','class':'BWEAEBut','value':GM._GetVar(opt+'cMax',''),'size':'5','maxlength':'5'},,{'change':[inputNumber,'cMax'],'keyup':[inputNumber,'cMax']},'td4_14_2'],
					'td4_14_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_14'],
					'tr4_15':['tr',{'class':'even'},,,'table4'],
					'td4_15_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_15'],
					'td4_15_1':['td',{'class':'BWELeft2','colspan':'4'},[L._Get("sAEaMin")],,'tr4_15'],
					'td4_15_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_15'],
					'acMin':['input',{'type':'text','class':'BWEAEBut','value':GM._GetVar(opt+'acMin',''),'size':'5','maxlength':'5'},,{'change':[inputNumber,'acMin'],'keyup':[inputNumber,'acMin']},'td4_15_2'],
					'td4_15_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_15'],
					'tr4_16':['tr',{'class':'even'},,,'table4'],
					'td4_16_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_16'],
					'td4_16_1':['td',{'class':'BWELeft2','colspan':'4'},[L._Get("sAEaMax")],,'tr4_16'],
					'td4_16_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_16'],
					'acMax':['input',{'type':'text','class':'BWEAEBut','value':GM._GetVar(opt+'acMax',''),'size':'5','maxlength':'5'},,{'change':[inputNumber,'acMax'],'keyup':[inputNumber,'acMax']},'td4_16_2'],
					'td4_16_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_16'],
					'tr4_17':['tr',,,,'table4'],
					'td4_17_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_17'],
					'td4_17_1':['td',{'class':'BWELeft','colspan':'4'},[L._Get("sMenuRc0")],,'tr4_17'],
					'td4_17_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_17'],
					'chRc0':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chRc0',true)},,{'change':[check,'chRc0']},'td4_17_2'],
					'td4_17_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_17'],
					'tr4_18':['tr',{'class':'even'},,,'table4'],
					'td4_18_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_18'],
					'td4_18_1':['td',{'class':'BWELeft','colspan':'4'},[L._Get("sMenuRc1")],,'tr4_18'],
					'td4_18_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_18'],
					'chRc1':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chRc1',true)},,{'change':[check,'chRc1']},'td4_18_2'],
					'td4_18_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_18'],
					'tr4_19':['tr',,,,'table4'],
					'td4_19_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_19'],
					'td4_19_1':['td',{'class':'BWELeft','colspan':'4'},[L._Get("sMenuRc2")],,'tr4_19'],
					'td4_19_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_19'],
					'chRc2':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chRc2',true)},,{'change':[check,'chRc2']},'td4_19_2'],
					'td4_19_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_19'],
					'tr4_20':['tr',{'class':'even'},,,'table4'],
					'td4_20_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_20'],
					'td4_20_1':['td',{'class':'BWELeft','colspan':'4'},[L._Get("sMenuRc3")],,'tr4_20'],
					'td4_20_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_20'],
					'chRc3':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chRc3',true)},,{'change':[check,'chRc3']},'td4_20_2'],
					'td4_20_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_20'],
					'tr4_21':['tr',,,,'table4'],
					'td4_21_0':['td',{'class':'BWEPrefTD0 even'},,,'tr4_21'],
					'td4_21_1':['td',{'class':'BWELeft','colspan':'4'},['Armurerie : ToolBox de Cramo'],,'tr4_21'],
					'td4_21_2':['td',{'class':'BWERight','colspan':'4'},,,'tr4_21'],
					'chTb':['input',{'type':'checkbox','checked':GM._GetVar(opt+'chTb',true)},,{'change':[check,'chTb']},'td4_21_2'],
					'td4_21_3':['td',{'class':'BWEPrefTD0 even'},,,'tr4_21'],
					'tr4_22':['tr',,,,'table4'],
					'td4_22_0':['td',{'class':'even','colspan':'10','height':'10px'},,,'tr4_22'],
					// Reset
					'br3':['br',,,,'menudiv'],
					'reset':['input',{'class':'button','type':'button','value':L._Get("sDefaut")},,{'click':[razGM,opt]},'menudiv'],
					},
					nodeMenu = IU._CreateElements(menuIU);
				if (content != content2) content.parentNode.replaceChild(nodeMenu['menudiv'],content);
				else content.parentNode.insertBefore(nodeMenu['menudiv'],content);
				// Toolbox sur serveur français uniquement
				var serveur = new RegExp("^http\:\/\/r([1-6])\.fr\.bloodwars\.net").exec(location.href);
				if (serveur==null) nodeMenu['tr4_21'].setAttribute('style','display:none;');
				// Choix des colonnes
				createColList ([['OCl','sColTitle'],['Cl','sColTitle'],['Ra','sColTitle'],['To','sColTitle']],nodeMenu['table0']);
				createColList ([['logA','sLogTitle'],['logD','sLogTitle'],['chA','sChar'],['chD','sChar'],['Res','sRes']],nodeMenu['table1']);
				createColList ([['OPr','sColTitle'],['Pr','sColTitle']],nodeMenu['table3']);
				}
			else if (menu=='4'){
				var menuIU = {
					'menudiv':['div',{'align':'center','style':'margin-top: 15px;'}],
					'divalert':['div',{'class':'auBid','style':'border: 1px solid red; padding: 3px; margin: 3px;'},,,'menudiv'],
					'table':['table',{'style':'width: 100%;'},,,'divalert'],
					'tr_0':['tr',,,,'table'],
					'td_0_0':['td',{'align':'center','width':'30'},,,'tr_0'],
					'img_0_0':['img',{'src':'./gfx/infobox_fail.gif'},,,'td_0_0'],
					'td_0_1':['td',{'class':'error'},[L._Get('sAlertMsg')],,'tr_0'],
					'BR0':['br',,,,'menudiv'],
					'table0':['table',{'style':'width: 100%;','cellspacing':'0','cellpadding':'0'},,,'menudiv'],
					'tr0_0':['tr',{'class':'tblheader'},,,'table0'],
					'td0_0_0':['td',{'class':'BWELeft'},[L._Get('sTitleLS',DS._GetVar('BWE:V','0'))],,'tr0_0'],
					'tr0_1':['tr',,,,'table0'],
					'td0_1_0':['td',,,,'tr0_1'],
					'table1':['table',{'style':'padding:5px;width: 100%;'},,,'td0_1_0'],
					'tr1_0':['tr',,,,'table1'],
					'td1_0_0':['td',{'colspan':'4'},,,'tr1_0'],
					'LLSSearch':['label',{'class':'BWELeft','for':'LSsearch'},[L._Get('sLabelSearch')],,'td1_0_0'],
					'tr1_1':['tr',,,,'table1'],
					'td1_1_0':['td',,,,'tr1_1'],
					'LSsearch':['input',{'class':'inputbox','type':'text'},,{'change':[triLSList],'keyup':[triLSList]},'td1_1_0'],
					'td1_1_1':['td',,,,'tr1_1'],
					'td1_1_2':['td',{'class':'BWELeft'},,,'tr1_1'],
					'delLS':['input',{'class':'button','type':'button','value':L._Get("sDelete")},,{'click':[delLS]},'td1_1_2'],
					'td1_1_3':['td',{'class':'BWERight'},,,'tr1_1'],
					'razLS':['input',{'class':'button','type':'button','value':L._Get("sRAZ")},,{'click':[razLS]},'td1_1_3'],
					'tr1_2':['tr',,,,'table1'],
					'td1_2_0':['td',{'colspan':'4'},,,'tr1_2'],
					'tr1_3':['tr',,,,'table1'],
					'td1_3_0':['td',{'colspan':'2','valign':'top','style':'width:220px;'},,,'tr1_3'],
					'selectLS':['select',{'class':'inputbox select BWEselectLS','size':'20','style':'width:200px;'},,{'change':[selectLSChange]},'td1_3_0'],
					'td1_3_1':['td',{'colspan':'2','valign':'top','style':'width:490px;'},,,'tr1_3'],
					'divLS':['div',{'class':'inputbox BWEdivLS','style':'width:490px;'},,,'td1_3_1'],
					'BR1':['br',,,,'menudiv'],
					'table2':['table',{'style':'width: 100%;','cellspacing':'0','cellpadding':'0'},,,'menudiv'],
					'tr2_0':['tr',{'class':'tblheader'},,,'table2'],
					'td2_0_0':['td',{'class':'BWELeft'},[L._Get('sTitleIE')],,'tr2_0'],
					'tr2_1':['tr',,,,'table2'],
					'td2_1_0':['td',,,,'tr2_1'],
					'table3':['table',{'style':'padding:5px;width: 100%;'},,,'td2_1_0'],
					'tr3_0':['tr',,,,'table3'],
					'td3_0_0':['td',{'class':'BWELeft'},[L._Get('sExportText')],,'tr3_0'],
					'ExportHelp':['img',{'class':'BWEHelp','src':'/gfx/hint2.png','onmouseout':'nd();','onmouseover':"return overlib('"+L._Get("sExportHelp")+"',HAUTO,WRAP);"},,,'td3_0_0'],
					'td3_0_1':['td',{'class':'BWERight'},,,'tr3_0'],
					'export':['input',{'class':'button','type':'button','value':L._Get("sOutputLog")},,{'click':[outputLog]},'td3_0_1'],
					'td3_0_2':['td',,,,'tr3_0'],
					'td3_0_3':['td',{'class':'BWELeft'},[L._Get('sImportText')],,'tr3_0'],
					'ImportHelp':['img',{'class':'BWEHelp','src':'/gfx/hint2.png','onmouseout':'nd();','onmouseover':"return overlib('"+L._Get("sImportHelp")+"',HAUTO,WRAP);"},,,'td3_0_3'],
					'td3_0_4':['td',{'class':'BWERight'},,,'tr3_0'],
					'import':['input',{'class':'button','type':'button','value':L._Get("sImportLog")},,{'click':[importLog]},'td3_0_4'],
					'tr3_1':['tr',,,,'table3'],
					'td3_1_0':['td',{'colspan':'2','valign':'top','style':'width:345px;'},,,'tr3_1'],
					'divIE':['div',{'class':'inputbox BWEdivIE','style':'width:345px;'},,,'td3_1_0'],
					'td3_1_1':['td',{'style':'width:20px;'},,,'tr3_1'],
					'td3_1_2':['td',{'colspan':'2','valign':'top','style':'width:345px;'},,,'tr3_1'],
					'textIE':['textarea',{'class':'textarea BWEdivIE','style':'width:345px;'},,,'td3_1_2'],
					'tr3_2':['tr',,,,'table3'],
					'td3_2_0':['td',{'colspan':'2'},,,'tr3_2'],
					'td3_2_1':['td',{'colspan':'2'},,,'tr3_2'],
					},
					nodeMenu = IU._CreateElements(menuIU);
				if (content != content2) content.parentNode.replaceChild(nodeMenu['menudiv'],content);
				else content.parentNode.insertBefore(nodeMenu['menudiv'],content);
				// LS
				var LSList = new Array(),
					result = new Array();
				for (var i=0;i<DS._Length();i++){
					var key = DS._Key(i);
					if(key.indexOf('BWE:')==0) LSList.push(key);
					}
				triLSList();
				}
			}
		}

	// fonctions Toolbox
	function inputTB(e,i){
		var mode = tbDiv['mode'].options[tbDiv['mode'].selectedIndex].value;
		if (mode=='1'||mode=='2') GM._SetVar(opt+i,encrypt(tbDiv[i].value));
		}
		
	function modeTB(){
		var mode = tbDiv['mode'].options[tbDiv['mode'].selectedIndex].value;
		GM._SetVar(opt+'tbMode',mode);
		GM._SetVar(opt+'tbl1',encrypt(mode=='0'?'':tbDiv['tbl1'].value));
		GM._SetVar(opt+'tbl2',encrypt(mode=='0'?'':tbDiv['tbl2'].value));
		tbDiv['send'].setAttribute('style','display:'+((mode=='2')?'none;':'inline;'));
		}

	function encrypt(str) {
		var key = '3fbf06c4ecded44ac0fc1a4c5d47f0fcf7f44a8d',
			result = '';
		for (i=0;i<str.length;i++){
			result += String.fromCharCode(str.charCodeAt(i)^key.charCodeAt(i%key.length));
			}
		return result;
	}

	// adapté du code de Cramo http://bloodwartoolbox.eu/bloodwartoolbox.xpi
	function sendToolbox(e,i){
		// i[0]=royaume
		var login = tbDiv['tbl1'].value,
			pass = tbDiv['tbl2'].value;
		if (login!=''&&pass!=''){
			var	code_source = DOM._GetFirstNodeInnerHTML("/html/body",null);
			if (code_source!=null){
				code_source = code_source.replace(/&/g,".");
				GM_xmlhttpRequest({
					method: "POST",
					url: "http://bloodwartoolbox.eu/traitement_charger.php",
					data: "login="+login+"&pass="+pass+"&royaume="+i[0]+"&code_brut="+code_source,
					headers: {"Content-Type": "application/x-www-form-urlencoded"},
					onreadystatechange: function(response){
						if(response.readyState == 0){
							tbDiv['td12'].textContent = 'Envoie de la requête...';
							tbDiv['td12'].setAttribute('class','incstat');
							}
						else if(response.readyState == 1){
							tbDiv['td12'].textContent = 'Connexion serveur établie...';
							tbDiv['td12'].setAttribute('class','incstat');
							}
						else if(response.readyState == 2){
							tbDiv['td12'].textContent = 'Requête reçue...';
							tbDiv['td12'].setAttribute('class','incstat');
							}
						else if(response.readyState == 3){
							tbDiv['td12'].textContent = 'Requête en cours de traitement...';
							tbDiv['td12'].setAttribute('class','incstat');
							}
						else if(response.readyState == 4){
							var tmp = response.responseText.split(":");
							if (typeof(tmp[0])!="undefined"){
								if(tmp[0]=="erreur1"){
									tbDiv['td12'].textContent = "Le couple login/password est invalide";
									tbDiv['td12'].setAttribute('class','error');
									}
								else if(tmp[0]=="erreur2"){
									tbDiv['td12'].textContent = "Erreur de transmission des données";
									tbDiv['td12'].setAttribute('class','error');
									}
								else if(tmp[0]=="ok"){
									GM._SetVar(opt+'tbMaj',new Date());
									tbDiv['td02'].textContent = new Date().toLocaleString();
									tbDiv['td12'].textContent = 'OK';
									tbDiv['td12'].setAttribute('class','enabled');
									}
								}
							}
						},
					onerror: function(response){
						tbDiv['td12'].textContent = 'Erreur ('+response.readyState+' '+response.status+' '+response.statusText+')';
						tbDiv['td12'].setAttribute('class','error');
						}
					});
				} 
			else{
				tbDiv['td12'].textContent = 'Problème d\'accès au code source';
				tbDiv['td12'].setAttribute('class','error');
				}
			}
		else{
			tbDiv['td12'].textContent = 'Le login ToolBox n\'a pas été saisi';
			tbDiv['td12'].setAttribute('class','error');
			}
		}
	
	// DEBUG - initialisation
	var startTime = new Date();
	DEBUG._Add('DEBUG',1,'Start_Début:: '+startTime.toLocaleString()+'...');
	//Update player datas
	plDatas['N'] = DATAS._PlayerLevel();
	plDatas['P'] = Number(DATAS._PlayerPdP());
	DS._SetVar('BWE:P:'+player,plDatas);
	//actions à mener en fonction de la page
	if (page!=null&&page!='pShowMsg'&&page!='pServerDeco'&&page!='pServerUpdate'&&page!='pServerOther'){
		var divVer = DOM._GetFirstNode("//div[@class='gameStats']");
		if (divVer!=null){
			var versionIU = {'br':['br',,,,divVer],
						'span':['span',,['BWE: '],,divVer],
						'a':['a',{'href':'http://userscripts.org/scripts/show/114417','TARGET':'_blank'},[BWEVersion],,'span']};
			IU._CreateElements(versionIU);
			}
		}
	if (page=='pOProfile'||page=='pProfile'){
		var isName = DOM._GetFirstNodeTextContent("//div[@id='content-mid']/div[@class='profile-hdr']",null),
			name = new RegExp(L._Get('sNameTest')).exec(isName),
			tableau = DOM._GetFirstNode("//div[@id='content-mid']/div[@style='float: left; width: 49%;']/fieldset[1]/table/tbody");
		if (name!=null&&tableau!=null&&(!!GM._GetVar(opt+'chOP',true)&&page=='pOProfile'||!!GM._GetVar(opt+'chP',true)&&page=='pProfile')){
			var trList = DOM._GetNodes("./tr",tableau);
			if (trList!=null){
				var temp = new Array();
				// sauvegarde le tableau et l'efface
				for (var i=0;i<trList.snapshotLength;i++) temp[i] = tableau.removeChild(trList.snapshotItem(i));
				// récupère les données
				var value = DS._GetVar('BWE:P:'+name[1],{}),
					uid = /.*\?a=profile&uid=(\d*)$/.exec(DOM._GetFirstNodeTextContent("//div[@id='content-mid']/div/a[@target='_blank']",null)),
					race = _Exist(temp[0])?DOM._GetFirstNodeTextContent("./td[2]",null,temp[0]):null,
					sexe = _Exist(temp[1])?DOM._GetFirstNodeTextContent("./td[2]",null,temp[1]):null,
					niv = _Exist(temp[5])?DOM._GetFirstNodeTextContent("./td[2]",null,temp[5]):null,
					pts = _Exist(temp[6])?DOM._GetFirstNodeTextContent("./td[2]",null,temp[6]):null;
				if (uid!=null) value['U'] = uid[1];
				if (race!=null) value['R'] = L._Get('sRaces').indexOf(race);
				if (sexe!=null) value['S'] = sexe==L._Get("sSexeHomme")?L._Get("sSexeH"):L._Get("sSexeF");
				if (niv!=null) value['N'] = niv;
				if (pts!=null) value['P'] = Number(pts);
				DS._SetVar('BWE:P:'+name[1],value);
				// garde uniquement les lignes sélectionnées
				var newLig = page=="pOProfile"?GM._GetVar(opt+'OPr',defCol['OPr']):GM._GetVar(opt+'Pr',defCol['Pr']);
				for (var i=newLig.length-1;i>=0;i--) if (newLig[i][1]!=true) newLig.splice(i,1);
				// recompose le tableau
				for (var j=0;j<newLig.length;j++){
					// ligne existante
					if (newLig[j][2]!=-1&&_Exist(temp[newLig[j][2]])) newTR = tableau.appendChild(temp[newLig[j][2]].cloneNode(true));
					else{
						var trIU = {'tr':['tr',,,,tableau],
									'td1':['td',,,,'tr'],'b':['b',,[L._Get("sColTitle")[newLig[j][0]]],,'td1'],
									'td2':['td',,,,'tr']},
							newTR = IU._CreateElements(trIU),
							line = newLig[j][0];
						if (line==7) newTR['td2'].textContent = L._Get('sNivFormat',niv,pts);
						else if (line==8){
							var show = !!GM._GetVar(opt+'ShGr',false),
								grp = DS._GetVar('BWE:G',{'A':[],'B':[]}),
								grpIU = {'tr0':['tr',{'style':'display:'+(show?'table-row;':'none;')},,,tableau],
										'td00':['td',{'id':'BWEgrpA','colspan':'2'},,,'tr0'],
										'tr1':['tr',{'style':'display:'+(show?'table-row;':'none;')},,,tableau],
										'td10':['td',{'id':'BWEgrpB','colspan':'2'},,,'tr1']},
								grpTR = IU._CreateElements(grpIU);
							newTR['td1'].setAttribute('style','color:'+(show?'lime;':'red;')+';cursor: pointer;');
							IU._addEvent(newTR['td1'],'click',showHideGr,[newTR['td1'],grpTR['tr0'],grpTR['tr1']]);
							var tdIU = {'labelA':['label',{'for':escape('BWEcheckA_'+name[1])},['A'],,newTR['td2']],
										'checkA':['input',{'type':'checkbox','id':escape('BWEcheckA_'+name[1]),
											'checked':(grp['A'].indexOf(name[1])>-1)},,
											{'change':[checkGrp,[name[1],'A']]},newTR['td2']],
										'labelB':['label',{'for':escape('BWEcheckB_'+name[1])},['B'],,newTR['td2']],
										'checkB':['input',{'type':'checkbox','id':escape('BWEcheckB_'+name[1]),
											'checked':(grp['B'].indexOf(name[1])>-1)},,
											{'change':[checkGrp,[name[1],'B']]},newTR['td2']]},
								grTD = IU._CreateElements(tdIU);
							createGrp();
							}
						else if (line==14){
							var trIU = {'table':['table',{'style':'width:90%;'},,,newTR['td2']],
										'tr10':['tr',,,,'table'],
											'td11':['td',,[L._Get('sProfAtt')],,'tr10'],
											'td12':['td',{'class':'BWEMiddle','style':'min-width:4em;'},,,'tr10'],
											'td13':['td',,[L._Get('sProfDef')],,'tr10'],
											'td14':['td',{'class':'BWEMiddle','style':'min-width:4em;'},,,'tr10'],},
								embTR = IU._CreateElements(trIU);
							CreateHistory(ID,name[1],embTR['td12']);
							CreateHistory(name[1],ID,embTR['td14']);
							}
						}
					}
				}
			}
		}
	else if (page=='pTownview'){
		var header = DOM._GetFirstNode("//div[@id='content-mid']//div[@id='tw_table']//tr[@class='tblheader']");
		if (header!=null&&!!GM._GetVar(opt+'chTo',true)){
			ChangeTable(header);
			var elemToCheck = DOM._GetFirstNode("//div[@id='content-mid']//div[@id='tw_table']"),
				chief = DOM._GetFirstNodeTextContent(".//tr/td[4]",elemToCheck);
			if (elemToCheck!=null&&chief!=null) var funcName = IU._addEvent(elemToCheck,'DOMSubtreeModified',onSubtreeModified);
			}
		}
	else if (page=='pOwnerAliance'||page=='pAliance'){
		// options pour afficher/masquer
		var td = DOM._GetNodes("//div[@id='content-mid']//div[@class='clan-desc']");
		if (td!=null&&!!GM._GetVar(opt+'chDe',true)){
			if (_Exist(td.snapshotItem(0))){
				var td1prev = DOM._GetFirstNode(".//parent::td/preceding-sibling::td/b",td.snapshotItem(0));
				if (td1prev!=null){
					var show = (page=='pOwnerAliance')?'1':'2';
					td.snapshotItem(0).setAttribute('style','display:'+(!!GM._GetVar(opt+'Sh'+show,true)?'block;':'none;'));
					td1prev.setAttribute('style','color:'+(!!GM._GetVar(opt+'Sh'+show,true)?'lime;':'red;')+';cursor: pointer;');
					IU._addEvent(td1prev,'click',show_hide,[td.snapshotItem(0),td1prev,show]);
					}
				}
			if (page=='pOwnerAliance'&&_Exist(td.snapshotItem(1))){
				var td2prev = DOM._GetFirstNode("//div[@id='content-mid']//td[@style='padding-top: 10px; padding-bottom: 4px; vertical-align: top;']/b");
				if (td2prev!=null){
					td.snapshotItem(1).setAttribute('style','display:'+(!!GM._GetVar(opt+'Sh3',true)?'block;':'none;'));
					td2prev.setAttribute('style','color:'+(!!GM._GetVar(opt+'Sh3',true)?'lime;':'red;')+';cursor: pointer;');
					IU._addEvent(td2prev,'click',show_hide,[td.snapshotItem(1),td2prev,"3"]);
					}
				}
			}
		// liste des vampires
		var header = DOM._GetFirstNode("//div[@id='content-mid']//table[@cellspacing='0']//tr[@class='tblheader']");
		if (header!=null&&(!!GM._GetVar(opt+'chOCl',true)&&page=='pOwnerAliance'||!!GM._GetVar(opt+'chCl',true)&&page=='pAliance')){
			var td = DOM._GetFirstNode("//div[@id='content-mid']//td[@style='padding-left: 30px;']");
			if (td!=null) td.removeAttribute("style");
			ChangeTable(header);
			}
		}
	else if (page=='pEquip'){
		var result = DOM._GetFirstNode("//div/form[@id='formularz']//parent::*"),
			serveur = new RegExp("^http\:\/\/r([1-6])\.fr\.bloodwars\.net").exec(location.href);
		if (result!=null&&serveur!=null&&!!GM._GetVar(opt+'chTb',true)){
			var tab = new Array("ut1","ut2","mor","ut3","mor2","ut4"),
				royaume = tab[serveur[1]-1],
				mode = GM._GetVar(opt+'tbMode','0'),
				maj = GM._GetVar(opt+'tbMaj',0);
			var tbIU = {
					'fieldset':['fieldset',{'class':'equip','style':'margin-top: 20px;'},,,result],
					'legend':['legend',{'class':'stashhdr'},['TOOLBOX'],,'fieldset'],
					'table':['table',,,,'fieldset'],
					'tr0':['tr',,,,'table'],
					'td01':['td',,['Dernière MAJ'],,'tr0'],
					'td02':['td',{'class':'enabled'},[maj==0?'':maj.toLocaleString()],,'tr0'],
					'tr1':['tr',,,,'table'],
					'td11':['td',,['Statut'],,'tr1'],
					'td12':['td',,['-'],,'tr1'],
					'tr2':['tr',,,,'table'],
					'td21':['td',,['Identifiant'],,'tr2'],
					'td22':['td',,,,'tr2'],
					'tbl1':['input',{'class':'inputbox','type':'text','id':'logTB','size':'20','maxlength':'50','value':encrypt(GM._GetVar(opt+'tbl1',''))},,{'change':[inputTB,'tbl1'],'keyup':[inputTB,'tbl1']},'td22'],
					'tr3':['tr',,,,'table'],
					'td31':['td',,['Mot de passe'],,'tr3'],
					'td32':['td',,,,'tr3'],
					'tbl2':['input',{'class':'inputbox','type':'password','id':'passTB','size':'20','maxlength':'50','value':encrypt(GM._GetVar(opt+'tbl2','')),},,{'change':[inputTB,'tbl2'],'keyup':[inputTB,'tbl2']},'td32'],
					'tr4':['tr',,,,'table'],
					'td41':['td',,['Mode'],,'tr4'],
					'modeHelp':['img',{'class':'BWEHelp','src':'/gfx/hint2.png','onmouseout':'nd();',
					'onmouseover':"return overlib('Manuel: ne sauvegarde pas le login et efface l\\'existant.<br>Manuel/save: sauvegarde le login.<br>Semi-Auto 24h: sauvegarde le login. Au chargement de l\\'Armurerie, le script envoie automatiquement les données une fois par 24h',WIDTH,500,VAUTO,HAUTO);"},,,'td41'],
					'td42':['td',,,,'tr4'],
					'mode':['select',{'class':'combobox','id':'mode'},,{'change':[modeTB]},'td42'],
					'option1':['option',{'value':'0'},['Manuel'],,'mode'],
					'option2':['option',{'value':'1'},['Manuel/save'],,'mode'],
					'option3':['option',{'value':'2'},['Semi-Auto 24h'],,'mode'],
					'send':['input',{'class':'button','style':'display:'+(mode=='2'?'none;':'inline;'),'type':'button','value':'Envoi'},,{'click':[sendToolbox,[royaume]]},'td42'],},
				tbDiv = IU._CreateElements(tbIU);
			tbDiv['mode'].selectedIndex = mode;
			if (mode=='2'&&startTime.getTime()>((maj==0?0:maj.getTime())+24*3600*1000)) sendToolbox(null,[royaume]);
			}
		}
	else if (page=='pMkstone'||page=='pUpgitem'||page=='pMixitem'||page=='pDestitem'||page=='pTatoo'){
		var cost = new Array(['disp_stone_blood',1],['disp_stone_heart',10],['disp_stone_life',50],['disp_stone_change',150],['disp_stone_soul',500]),
			sum = 0;
		for (var i=0;i<cost.length;i++){
			var result = DOM._GetFirstNodeTextContent("//div[@id='content-mid']//span[@id='"+cost[i][0]+"']",null);
			if (result!=null) sum = sum + (cost[i][1]*parseInt(result));
			}
		var result = DOM._GetFirstNode("//div[@id='content-mid']//fieldset[@class='profile mixer']");
		if (result!=null&&!!GM._GetVar(opt+'chSt',true)){
			var totalIU = {'div1':['div',{'align':'center'}],
							'div2':['div',{'style':'padding:2px;'},[L._Get("sTotal")],,'div1'],
							'b':['b',,[sum],,'div2']},
				total = IU._CreateElements(totalIU);
			result.parentNode.insertBefore(total['div1'],result.nextSibling);
			}
		}
	else if (page=='pAmbushRoot'){
		var atkaction = DOM._GetFirstNode("//div[@id='content-mid']//tr[@class='tblheader']/td/a[@class='clanOwner']");
		if (atkaction!=null&&!!GM._GetVar(opt+'chLo',true)){
			var ambushScript = DOM._GetFirstNodeInnerHTML("//div[@id='content-mid']/script",null);
			if (ambushScript!=null){
				var result = new RegExp(L._Get('sAtkTime')).exec(ambushScript);
				if (result!=null){
					var msgDate = DATAS._Time(),
						result2 = new RegExp(L._Get('sMidMsg')).exec(ambushScript),
						playerVS = DOM._GetFirstNodeTextContent("//div[@id='content-mid']//tr[@class='tblheader']/td/a[@class='players']",null);
					if (msgDate!=null&&result2!=null&&playerVS!=null){
						msgDate.setTime(msgDate.getTime()+result[1]*1000);
						UpdateHistory(ID,playerVS,result2[1],msgDate,null);
						}
					}
				}
			}
		}
	else if (page=='pMsgList'||page=='pMsgSaveList'){
		var header = DOM._GetFirstNode("//div[@id='content-mid']//table[@cellspacing='0']//tr[@class='tblheader']"),
			msgList = DOM._GetNodes(".//following-sibling::tr",header);
		if (!!GM._GetVar(opt+'chLo',true)){
			for (var i=0;i<msgList.snapshotLength;i++){
				var node = msgList.snapshotItem(i),
					msg = DOM._GetFirstNodeTextContent(".//td[2]/a[@class='msg-link']",null,node),
					msgDate = DOM._GetFirstNodeTextContent(".//td[4]",null,node),
					msgId = DOM._GetFirstNode(".//td[1]/input",node);
				if (msg!=null&&msgDate!=null&&msgId!=null){
					var msgId = msgId.getAttribute('id').replace('msgid_', ''),
						msgDate	= StringToTime(msgDate),
						m1 = new RegExp(L._Get('sAmbushMsg1')).exec(msg),
						m2 = new RegExp(L._Get('sAmbushMsg2')).exec(msg);
					// messages d'embuscade ?
					if (m1!=null) UpdateHistory(m1[1],ID,msgId,msgDate,null);
					else if (m2!=null) UpdateHistory(ID,m2[1],msgId,msgDate,null);
					}
				}
			}
		}
	else if (page=='pMsg'||page=='pMsgSave'){
		// Analyse le message d'embuscade
		var msgContent = DOM._GetFirstNodeInnerHTML("//div[@class='msg-content ']", null);
		if (msgContent!=null&&!!GM._GetVar(opt+'chLo',true)){
			// embuscade
			var result = new RegExp(L._Get('sAmbushTest1')).exec(msgContent);
			if (result!=null){
				var att = result[1],
					def = result[2],
					emb = ['','','','',[],[],[],[],[],[],[],[],[]], //[%,réussite,PV att,PV def,aa,ad,ea,ed,ca,cd,pa,pd,ressources]
					qsMid = DOM._QueryString("mid");
				// liste des éléments à récupérer suivant les options
				var logShow = [], chAShow = [], chDShow = [], GaShow = [],
					logCol = att==player?GM._GetVar(opt+'logA',defCol['logA']):GM._GetVar(opt+'logD',defCol['logD']),
					chA = GM._GetVar(opt+'chA',defCol['chA']),
					chD = GM._GetVar(opt+'chD',defCol['chD']),
					Ga = GM._GetVar(opt+'Res',defCol['Res']);
				for (var i=0;i<logCol.length;i++){logShow[logCol[i][0]]=logCol[i][1];}
				for (var i=0;i<chA.length;i++){chAShow[chA[i][0]]=chA[i][1];}
				for (var i=0;i<chD.length;i++){chDShow[chD[i][0]]=chD[i][1];}
				for (var i=0;i<Ga.length;i++){GaShow[Ga[i][0]]=Ga[i][1];}
				// Chance de réussite
				var result = new RegExp(L._Get('sAmbushTest2')).exec(msgContent);
				if (result!=null&&logShow[2]==true) emb[0] = result[1];
				// embuscade réussie
				var result = new RegExp(L._Get('sAmbushTest3',att)).exec(msgContent);
				if (result!=null){
					// résultat
					var result1 = new RegExp(L._Get('sAmbushTest4')).exec(msgContent),
						result2 = new RegExp(L._Get('sAmbushTest5',def)).exec(msgContent),
						result3 = new RegExp(L._Get('sAmbushTest6')).exec(msgContent);
					if (result1!=null){
						emb[1] = 'v';
						if (logShow[13]==true){
							// ressources (pdp,pdh,lol,sang,pop,évo)
							var result = new RegExp(L._Get('sAmbushTest13',att)).exec(msgContent);
							if (result!=null&&GaShow[0]==true) emb[12][0] = result[1];
							var result = new RegExp(L._Get('sAmbushTest14',att)).exec(msgContent);
							if (result!=null){
								if (GaShow[0]==true) emb[12][0] = result[1];
								if (GaShow[1]==true) emb[12][1] = result[2];
								}
							var result = new RegExp(L._Get('sAmbushTest15',def)).exec(msgContent);
							if (result!=null){
								if (GaShow[3]==true) emb[12][3] = result[1];
								if (GaShow[4]==true) emb[12][4] = result[2];
								if (GaShow[5]==true) emb[12][5] = result[3];
								}
							var result = new RegExp(L._Get('sAmbushTest16',att)).exec(msgContent);
							if (result!=null&&GaShow[2]==true) emb[12][2] = result[1];
							}
						}
					else if (result2!=null){
						emb[1] = 'd';
						if (logShow[13]==true){
							// ressources (pdp,lol,sang,pop)
							var result = new RegExp(L._Get('sAmbushTest13',def)).exec(msgContent);
							if (result!=null&&GaShow[0]==true) emb[12][0] = result[1];
							var result = new RegExp(L._Get('sAmbushTest15',att)).exec(msgContent);
							if (result!=null){
								if (GaShow[3]==true) emb[12][3] = result[1];
								if (GaShow[4]==true) emb[12][4] = result[2];
								if (GaShow[5]==true) emb[12][5] = result[3];
								}
							}
						}
					else if (result3!=null) emb[1] = 'n';
					// PV en fin de combat
					var sommaire = DOM._GetLastNodeInnerHTML("//div[@class='sum2']",null);
					if (sommaire!=null){
						var result = new RegExp(L._Get('sAmbushTest7')).exec(sommaire);
						if (result!=null){
							if (logShow[3]==true) emb[2] = L._Get('sPVFormat',result[1],result[2]);
							if (logShow[4]==true) emb[3] = L._Get('sPVFormat',result[3],result[4]);
							}
						}
					}
				// embuscade ratée : "Tu as été remarquée..."	
				else emb[1] = 'r';
				// Arcanes
				var i,model = new RegExp(L._Get('sAmbushTest8'),'g'),
					arc = L._Get('sArc');
				while ((i=model.exec(msgContent))!=null){
					if (i[2]==att&&logShow[5]==true) emb[4].push([arc.indexOf(i[3]),i[4]]);
					else if (i[2]==def&&logShow[6]==true) emb[5].push([arc.indexOf(i[3]),i[4]]);
					}
				// Evolutions
				var i,model = new RegExp(L._Get('sAmbushTest9'),'g'),
					evo = L._Get('sEvo');
				while ((i=model.exec(msgContent))!=null){
					var y, model2 = new RegExp(L._Get('sAmbushTest10'),'g');
					while ((y=model2.exec(i[1]))!=null){
						if (i[2]==att&&logShow[7]==true) emb[6].push([evo.indexOf(y[2]),y[3]]);
						else if (i[2]==def&&logShow[8]==true) emb[7].push([evo.indexOf(y[2]),y[3]]);
						}
					}
				// Caracs
				var table = DOM._GetFirstNodeInnerHTML("//table[@class='fight']"),
					carac = L._Get('sChar');
				if (table!=null){
					for (var i=0;i<carac.length-1; i++){
					var result = new RegExp(L._Get('sAmbushTest11',carac[i])).exec(table);
						if (result!=null){// attention cas particulier PER+AGI
							if (logShow[9]==true&&(chAShow[i]==true||(chAShow[12]==true&&(i==4||i==9)))) emb[8][i] = result[1];
							if (logShow[10]==true&&(chDShow[i]==true||(chDShow[12]==true&&(i==4||i==9)))) emb[9][i] = result[2];
							}
						}
					}
				// Objets
				var i,model = new RegExp(L._Get('sAmbushTest12'),'g'),
					obj = L._Get('sObjet');
				while ((i=model.exec(msgContent))!=null){
					if (i[2]==att&&logShow[11]==true) emb[10].push(obj.indexOf(i[3]));
					else if (i[2]==def&&logShow[12]==true) emb[11].push(obj.indexOf(i[3]));
					}
				UpdateHistory(att==player?ID:att,def==player?ID:def,qsMid,null,emb);
				}
			}
		AnalyseRC();
		}
	else if (page=='pMsgFriendList'){
		if (!!GM._GetVar(opt+'chAm',true))
			var	header = DOM._GetFirstNode("//div[@id='content-mid']//table[@cellspacing='0']//tr[@class='tblheader']");
			if (header!=null){
				var friendList = DOM._GetNodes(".//following-sibling::tr",header),
					tbody =  DOM._GetFirstNode("./parent::*",header);
				FctTriA('1','+',tbody,header,friendList);
				}
		}
	else if (page=='pRank'){
		var header = DOM._GetFirstNode("//div[@id='content-mid']//table[@class='rank']//tr[@class='tblheader']");
		if (header!=null&&!!GM._GetVar(opt+'chRa',true)) ChangeTable(header);
		}
	else if (page=='pRootSettings'||page=='pSettingsAi'||page=='pSettingsAcc'||page=='pSettingsVac'||page=='pSettingsDelchar'){
		var nodeOptions = DOM._GetFirstNode("//div[@id='content-mid']//div[@class='top-options']");
		if (nodeOptions!=null){
			var titleMenuIU = {
				'1':['span',,['[ ']],
				'2':['a',{'href':'#','onclick':'return false;'},[L._Get("sTitleMenu1")],{'click':[setMenu,'2']},'1'],
				'3':['span',,[' ] - [ '],,'1'],
				'4':['a',{'href':'#','onclick':'return false;'},[L._Get("sTitleMenu2")],{'click':[setMenu,'4']},'1'],
				'5':['span',,[' ] - '],,'1']},
				nodeTitle = IU._CreateElements(titleMenuIU);
			nodeOptions.insertBefore(nodeTitle['1'], nodeOptions.firstChild);
			}
		}
	// DEBUG End
	var endTime = new Date();
	DEBUG._Add('DEBUG',1,'Start_Fin:: '+endTime.toLocaleString()+' après '+((endTime.getTime() - startTime.getTime())/1000));


/******************************************************
* Réservé aux débogages
*
******************************************************/
/*
DEBUG._Add('DEBUG',1,'result : '
+DATAS._Time()
+':'+DATAS._Version()
+':'+DATAS._Royaume()
+':'+DATAS._Population()
+':'+DATAS._PlayerName()
+':'+DATAS._PlayerZone()
+':'+DATAS._PlayerLevel()
+':'+DATAS._PlayerXP()
+':'+DATAS._PlayerXPlimit()
+':'+DATAS._PlayerPdP()
+':'+DATAS._PlayerBlood()
+':'+DATAS._PlayerMoney()
+':'+DATAS._PlayerPopulation(), this);
*/
	}
})();