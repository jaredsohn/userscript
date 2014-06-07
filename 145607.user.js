// coding: utf-8
// Firefox 5.0+, Chrome
// ==UserScript==
// @author         Ecilam <ecilam.dm@gmail.com>
// @name           Blood Wars Spy Data
// @version        2012.09.25
// @namespace      BWSD
// @description    Mémorise la partie ressources de vos espionnages
// @include		/^http:\/\/r[0-9]*\.fr\.bloodwars\.net\/.*$/
// @include		/^http:\/\/r[0-9]*\.bloodwars\.net\/.*$/
// @include		/^http:\/\/r[0-9]*\.bloodwars\.interia\.pl\/.*$/
// @include		/^http:\/\/beta[0-9]*\.bloodwars\.net\/.*$/
// @priority 	-100
// @run-at         document-end
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
			return value;
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
			return value;
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
				DEBUG._Add('IU',2,'_CreateElements:: type:$1 attributes:$2 content:$3 events:$4',type,attributes,content,events);
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
					DEBUG._Add('IU',2,'_CreateElement::Event:: $1, $2, $3',key,events[key][0],events[key][1]);
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
			DEBUG._Add('IU',1,'_addEvent:: $1 $2 $3 $4',obj, type, fn, par);
			var funcName = function(event){return fn.call(obj, event, par);};
			obj.addEventListener(type,funcName,false );
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
	var locStr =  {// key:[français,anglais,polonais]
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
		"sBloodArcanes":
			["Pts DE SANG: ([0-9]+) / ([0-9]+)",
			"BLOOD POINTS: ([0-9]+) / ([0-9]+)",
			"PKT. KRWI: ([0-9]+) / ([0-9]+)"],
		"sDeconnecte":
			["Vous avez été déconnecté en raison d`une longue inactivité.",
			"You have been logged out because of inactivity.",
			"Nastąpiło wylogowanie z powodu zbyt długiej bezczynności."],
		"sCourtePause":
			["Une courte pause est en court en raison de l`actualisation du classement général",
			"Please wait a moment while the rankings are being updated.",
			"Trwa przerwa związana z aktualizacją rankingu gry."],
		//INIT
		"sUnknowPlayer":
			["Erreur : Arrêt du script. Le nom du vampire n'est pas accessible sur cette page.",
			"Error: Stopping the script. The name of the vampire is not available on this page.",
			"Błąd: Zatrzymanie skryptu.Nazwa wampir nie jest dostępna na tej stronie."],
		"sUnknowID":
			["Le nom de ce vampire doit être lié à son ID. Merci de consulter la Salle du Trône pour rendre le script opérationnel.\n\nCe message est normal si vous utilisez ce script pour la première fois ou si vous avez changé le nom du vampire.",
			"The name of this vampire must be linked to her ID. Please consult the Throne Room to make the script running.\n\nThis message is normal if you use this script for the first time or if you changed the name of the vampire.",
			"Nazwa tego wampira musi być związana z jej ID. Proszę zapoznać się z sali tronowej, aby skrypt uruchomiony.\n\nTo wiadomość jest normalne, jeśli użyć tego skryptu po raz pierwszy lub jeśli zmienił nazwę wampira."],
		// chaines de l'interface
		"sTitle":["Spy Data"],
		"sReportMax":["Lignes max: "],
		"sDatas":["Données: "],
		"sAskRAZ":["Voulez vous effacer la totalité des données ?"],
		"sSDate":['Date'],
		"sSNom":['Nom'],
		"sSPrc":['Réussite(%)'],
		"sSEsp":['Espions'],
		"sSLOL":['LOL'],
		"sSPop":['Population'],
		"sSSang":['Sang'],
		"sRAZ":['RAZ'],
		"sLogTime":["$1/$2/$3"],
		// chaines pour l'espionnage
		"sSpyTime":["timeFields\\.$1 = ([0-9]+)"],
		"sMidMsg":["a=msg&do=view&mid=([0-9]+)"],
		"sSpyMsg": ["Rapport de l`opération - cible: (.+)\\.",],
		"sSpyTest1":
			["<br>Cible de l`espionnage: <a class=\"players\" href=\"\\?a=profile&amp;uid=([0-9]+)\"><b>([^<>]+)<\\/b><\\/a>"],
		"sSpyTest2":
			["<br>Ordres: <b>([^<>]+)<\\/b><br>Le nombre d`espions: <b>([0-9]+)<\\/b><br>Chances de réussite: <b>([^<>]+) %</b><br><br><b>([^<>]+)<\\/b>"],
		"sSpyTest3":
			["<br><u>Les renseignements obtenus<\\/u><br>NOM: <b>([^<>]+)<\\/b><br>RACE: <b>([^<>]+)<\\/b><br>SEXE: <b>([^<>]+)<\\/b><br><br>Niveau: <b>([0-9]+)<\\/b><br>Pts DE VIE: <b>([0-9]+) / ([0-9]+)<\\/b><br>Pts DE SANG: <b>([0-9]+) / ([0-9]+)<\\/b><br>Argent: <b>([0-9 ]+) LOL</b><br>Population: <b>([0-9 ]+)<\\/b><br>Sang: <b>([0-9 ]+)<\\/b>"],
		"sSpyOk":
			["L`opération s`est terminée par un succès!",],
		 };
	var langue; // 0 = français par défaut, 1 = anglais, 2 = polonais
	if (/^http\:\/\/r[0-9]*\.fr\.bloodwars\.net/.test(location.href)) langue = 0;
	else if (/^http\:\/\/r[0-9]*\.bloodwars\.net/.test(location.href)) langue = 1;
	else if (/^http\:\/\/r[0-9]*\.bloodwars\.interia\.pl/.test(location.href)||/^http\:\/\/beta[0-9]*\.bloodwars\.net/.test(location.href)) langue = 2;
	else throw new Error("Erreur : le langage de ce serveur n\'est pas reconnu par le script.");
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
CSS
******************************************************/
function SetCSS(){
	var css = 
		".BWSD_BodyL,.BWSD_HeadL{text-align:left;}"
		+".BWSD_BodyR,.BWSD_HeadR{text-align:right;}"
		+".BWSD_HeadL,.BWSD_HeadR,.BWSDDel{font-weight: bold;cursor: pointer;padding: 0 3px;}"
		+".BWSD_BodyL,.BWSD_BodyR,.BWSDDel{border-right:0;border-left:0;border-top:thin solid black;border-bottom:thin solid black;padding: 0 3px;color: black;}"
		+".BWSDDel{text-align:center;border:thin solid black;width:3em;color:white;background-color:red}"
		+".BWSDBut,.BWSDButError{height:10px;margin:2px 0px;}"
		+".BWSDButError{background-color:red;}";
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
	
/* functions liées aux Events*/
function showIU(){
	nodesIU['divIU'].setAttribute('style','display:'+(GM._SetVar(opt+'ShowIU',!GM._GetVar(opt+'ShowIU',true))?'block;':'none;'));
	}
		
function clickCol(e,i){// i= col
	var header = DOM._GetFirstNode("//tr[@id='BWSD_Head']"),
		tbody =  DOM._GetFirstNode("//tbody[@id='BWSD_Body']"),
		tri = GM._GetVar(opt+'trSpy',{'col':1,'order':'+'}),
		order = (i==tri['col']&&tri['order']=='+')?'-':'+',
		oldCol = DOM._GetFirstNode("./th["+tri['col']+"]/span",header),
		newCol = DOM._GetFirstNode("./th["+i+"]",header);
	if (oldCol!=null) oldCol.parentNode.removeChild(oldCol);
	IU._CreateElement('span',{'class':'BWEtriSelect'},[(order=='+'?"▲":"▼")],{},newCol);
	GM._SetVar(opt+'trSpy',{'col':i,'order':order});
	updateTable();
	}
		
function spyRAZ(){
	var answer = confirm(L._Get("sAskRAZ"));
	if (answer){
		DS._SetVar('BWSD:LS:'+ID,{});
		updateTable();
		}
	}

function spyDel(e,i){
	var log = DS._GetVar('BWSD:LS:'+ID,{});
	delete log[i];
	DS._SetVar('BWSD:LS:'+ID,log);
	updateTable();
	}
	
/* functions IU*/
function initIU(){
	function inputNumber(e,i){
		var value = nodesIU[i].value,
			result = new RegExp("^(|(?:[0-9]+|[0-9]*[.]?[0-9]+))$").exec(value);
		if (result!=null){
			nodesIU[i].setAttribute('class','BWSDBut');
			GM._SetVar(opt+'reportMax',value);
			updateTable();
			}
		else nodesIU[i].setAttribute('class','BWSDButError');
		}
	var nodeOptions = DOM._GetFirstNode("//div[@class='remark']");
	if (nodeOptions!=null){
		var titleMenuIU = {
			'1':['a',{'class':'remark','target':'_blank','href':'#','onclick':'return false;'},[L._Get('sTitle')],{'click':[showIU]}],
			'2':['span',,[' | ']]},
			nodeTitle = IU._CreateElements(titleMenuIU);
		nodeOptions.insertBefore(nodeTitle['2'],nodeOptions.firstChild);
		nodeOptions.insertBefore(nodeTitle['1'],nodeOptions.firstChild);
		}
	var elementsIU = {
		'divIU':	['div',{'id':'BWSD','style':'display:'+(GM._GetVar(opt+'ShowIU',true)?'block;':'none;')}],
		'tableS':['table',{'style':'border-collapse:collapse;width:100%'},,,'divIU'],
		'theadS':['thead',,,,'tableS'],
		'trS00':['tr',{'class':'BWEbold'},,,'theadS'],
		'tdS001':['td',{'colspan':'4'},[L._Get('sTitle')+' '+BWSDVersion],,'trS00'],
		'tdS002':['td',{'class':'BWSD_HeadR','colspan':'2'},,,'trS00'],
		'span01':['span',,[L._Get('sReportMax')],,'tdS002'],
		'span02':['input',{'type':'text','class':'BWSDBut','value':GM._GetVar(opt+'reportMax',''),'size':'2','maxlength':'2'},,{'change':[inputNumber,'span02'],'keyup':[inputNumber,'span02']},'tdS002'],
		'tdS003':['td',{'class':'BWSD_HeadR','colspan':'2'},[L._Get('sDatas')+Object.keys(DS._GetVar('BWSD:LS:'+ID,{})).length],,'trS00'],
		'trS01':['tr',{'id':'BWSD_Head','class':'tblheader'},,,'theadS'],
		'thS010':['th',{'class':'BWSD_HeadL'},[L._Get('sSDate')],{'click':[clickCol,1]},'trS01'],
		'thS011':['th',{'class':'BWSD_HeadL'},[L._Get('sSNom')],{'click':[clickCol,2]},'trS01'],
		'thS012':['th',{'class':'BWSD_HeadL'},[L._Get('sSPrc')],{'click':[clickCol,3]},'trS01'],
		'thS013':['th',{'class':'BWSD_HeadL'},[L._Get('sSEsp')],{'click':[clickCol,4]},'trS01'],
		'thS014':['th',{'class':'BWSD_HeadL'},[L._Get('sSLOL')],{'click':[clickCol,5]},'trS01'],
		'thS015':['th',{'class':'BWSD_HeadL'},[L._Get('sSPop')],{'click':[clickCol,6]},'trS01'],
		'thS016':['th',{'class':'BWSD_HeadL'},[L._Get('sSSang')],{'click':[clickCol,7]},'trS01'],
		'thS017':['th',{'class':'BWSDDel'},[L._Get('sRAZ')],{'click':[spyRAZ]},'trS01'],
		'tbodyS':['tbody',{'id':'BWSD_Body'},,,'tableS'],
		'br':['br',,,,'divIU'],
		};
	nodesIU = IU._CreateElements(elementsIU);
	}
		
function updateTable(){
	var listS = DS._GetVar('BWSD:LS:'+ID,{}),
		list2 = new Array(),
		tri = GM._GetVar(opt+'trSpy',{'col':1,'order':'+'});
	//créé le tableau pour tri ultérieur
	for (var key in listS){//key:[msgId,msgTime,spyInfo]
		var info = listS[key][2]!=null?listS[key][2]:['wait',null,[],[]], //[type,iud,result,res]
			col = [listS[key][1],key,info[2][2]?info[2][2]:'',info[2][1]?info[2][1]:'',info[3][0]?info[3][0]:'',info[3][1]?info[3][1]:'',info[3][2]?info[3][2]:''];
		list2.push([info[0],info[1],col]);//[type,iud,col];
		}
	// tri du tableau suivant la colonne sélectionnée
	list2.sort(function(a,b){
		var x = a[2][tri['col']-1].toString().toUpperCase(),
			y = b[2][tri['col']-1].toString().toUpperCase();
		if (tri['col']!=2){
			x = parseFloat(x.replace(/ /g,''));
			y = parseFloat(y.replace(/ /g,''));
			if(isNaN(x)==true) x=-1;
			if(isNaN(y)==true) y=-1;
			}
DEBUG._Add('DEBUG',1,'x:$1 y:$2',x,y);
		return x<y?-1:x==y?0:1;
		});
	if (tri['order']=='-') list2.reverse();
	// affiche le résultat
	var max = GM._GetVar(opt+'reportMax','');
	nodesIU['tbodyS'].textContent = '';
	for (var i=0;(i<list2.length&&i<(max==''?list2.length:max));i++){
		var t = list2[i][2][0],
			tDay = ((t.getDate()<10)?"0":"")+t.getDate().toString(),
			tMonth = ((t.getMonth()+1<10)?"0":"")+(t.getMonth()+1).toString(),
			tYear = t.getFullYear().toString();
		var trIU = {
			'tr01':['tr',{'style':'background-color:white'},,,nodesIU['tbodyS']],
			'td010':['td',{'class':'BWSD_BodyL'},[L._Get('sLogTime',tDay,tMonth,tYear)],,'tr01'],
			'td011':['td',{'class':'BWSD_BodyL'},,,'tr01'],
			'a0100':['a',(list2[i][1]!=null?{'href':'?a=profile&uid='+list2[i][1]}:{}),[list2[i][2][1].truncate(15)],,'td011'],
			'td012':['td',{'class':'BWSD_BodyL'},[list2[i][2][2]],,'tr01'],
			'td013':['td',{'class':'BWSD_BodyL'},[list2[i][2][3]],,'tr01'],
			'td014':['td',{'class':'BWSD_BodyL'},[list2[i][2][4]],,'tr01'],
			'td015':['td',{'class':'BWSD_BodyL'},[list2[i][2][5]],,'tr01'],
			'td016':['td',{'class':'BWSD_BodyL'},[list2[i][2][6]],,'tr01'],
			'td017':['td',{'class':'BWSDDel'},['X'],{'click':[spyDel,list2[i][2][1]]},'tr01'],
			},
			tr = IU._CreateElements(trIU);
		if (list2[i][0]=='ok') tr['tr01'].setAttribute('style','background-color: Green;');
		else if (list2[i][0]=='fail') tr['tr01'].setAttribute('style','background-color: Red;');
		}
	var oldCol = DOM._GetFirstNode("./th/span",nodesIU['trS01']),
		newCol = DOM._GetFirstNode("./th["+tri['col']+"]",nodesIU['trS01']);
	if (oldCol!=null) oldCol.parentNode.removeChild(oldCol);
	IU._CreateElement('span',{'class':'BWEtriSelect'},[(tri['order']=='+'?"▲":"▼")],{},newCol);
	}
		
// log Rapport d'espionnage
function updateLogS(player,msgId,msgTime,spyInfo){
	var log = DS._GetVar('BWSD:LS:'+ID,{});
	if (_Exist(log[player])){
		if (msgId!=log[player][0]){
			if ((msgTime!=null)&&(Date.parse(msgTime)>Date.parse(log[player][1]))) log[player] = [msgId,msgTime,spyInfo];
			}
		else if (spyInfo!=null) log[player][2] = spyInfo;
		}
	else if (msgTime!=null) log[player] = [msgId,msgTime,spyInfo];
	DS._SetVar('BWSD:LS:'+ID,log);
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
	var page = DATAS._GetPage(),
		player = DATAS._PlayerName(),
		nodesIU,
		contentMid = DOM._GetFirstNode("//div[@id='content-mid']");
	if (player==null)throw new Error(L._Get("sUnknowPlayer"));
	else{
		var IDs = GM._GetVar('BWSD:ID',{}),
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
					GM._SetVar('BWSD:ID',IDs);
					}
				}
			}
		if (ID==null) alert(L._Get("sUnknowID"));
		else{
			GM._SetVar('BWSD:LASTID',realm+':'+ID);
			var opt = 'BWSD:O:'+realm+':'+ID+':',
				BWSDVersion = '?';
			if (typeof(GM_info)=='object') BWSDVersion = GM_info.script.version;
			else if (typeof(GM_info)=='function') BWSDVersion = GM_info().script.version;
			else if (typeof(GM_getMetadata)=='function') BWSDVersion = GM_getMetadata('version')[0];
			start();
			}
		}
	// DEBUG End
	var endTime = new Date();
	DEBUG._Add('DEBUG',1,'_Fin:: '+endTime.toLocaleString()+' après '+((endTime.getTime() - startTime.getTime())/1000));
	}
		
function start(){
	// DEBUG - initialisation
	var startTime = new Date();
	DEBUG._Add('DEBUG',1,'Start_Début:: '+startTime.toLocaleString()+'...');
	// BOT - initialisation
	initIU();
	var contentMidChild = DOM._GetFirstNode("//div[@id='content-mid']/*");
	if (contentMidChild!=null) contentMid.insertBefore(nodesIU['divIU'],contentMidChild);
	if (page=='pMsgList'||page=='pMsgSaveList'){
		var msgList = DOM._GetNodes("//div[@id='content-mid']//tr[@class='tblheader']/following-sibling::tr");
		for (var i=0;i<msgList.snapshotLength;i++){
			var node = msgList.snapshotItem(i),
				msg = DOM._GetFirstNodeTextContent(".//td[2]/a[@class='msg-link']",null,node),
				msgDate = DOM._GetFirstNodeTextContent(".//td[4]",null,node),
				msgId = DOM._GetFirstNode(".//td[1]/input",node);
			if (msg!=null&&msgDate!=null&&msgId!=null){
				var msgId = msgId.getAttribute('id').replace('msgid_', ''),
					msgDate	= StringToTime(msgDate),
					m1 = new RegExp(L._Get('sSpyMsg')).exec(msg);
				// messages d'espionnage ?
				if (m1!=null) updateLogS(m1[1],msgId,msgDate,null);
				}
			}
		}
	else if (page=='pMsg'||page=='pMsgSave'){
		var content = DOM._GetFirstNode("//div[@id='content-mid']//div[@class='msg-content ']"),
			qsMid = parseInt(DOM._QueryString("mid"));
		if (content!=null){
			var t = content.innerHTML,
				result = new RegExp(L._Get('sSpyTest1')).exec(t),
				result2 = new RegExp(L._Get('sSpyTest2')).exec(t),
				result3 = new RegExp(L._Get('sSpyTest3')).exec(t);
			if (result!=null){// rapport d'espionnage
				var spyInfo = ['wait',result[1],[],[]];//[type,iud,result,res]
				if (result2!=null){
					spyInfo[0] = result2[4]==L._Get('sSpyOk')?'ok':'fail';
					spyInfo[2] = [result2[1],result2[2],result2[3]];//[type,espions,%]
					}
				if (result3!=null){
					spyInfo[3] = [result3[9],result3[10],result3[11]];//[LOL,pop,sang]
					}
				updateLogS(result[2],qsMid,null,spyInfo);
				}
			}
		}
	else if (page=='pAmbushRoot'){
		var spyaction = DOM._GetNodes("//div[@id='content-mid']//tr/td/span[@class='spyinprogress']");
		for (var i=0;i<spyaction.snapshotLength;i++){
			var node = spyaction.snapshotItem(i),
				spyId = node.getAttribute('id'),
				spyScript = DOM._GetFirstNodeInnerHTML("./parent::td/script",null,node);
			if (spyScript!=null){
				var result = new RegExp(L._Get('sSpyTime',spyId)).exec(spyScript),
					result2 = new RegExp(L._Get('sMidMsg')).exec(spyScript),
					playerVS = DOM._GetFirstNodeTextContent("./parent::td/parent::tr/td/a[@class='players']",null,node),
					msgDate = DATAS._Time();
				if (msgDate!=null&&result!=null&&result2!=null&&playerVS!=null){
					msgDate.setTime(msgDate.getTime()+result[1]*1000);
					updateLogS(playerVS,result2[1],msgDate,null);
					}
				}
			}
		}
	updateTable();
	// DEBUG End
	var endTime = new Date();
	DEBUG._Add('DEBUG',1,'Start_Fin:: '+endTime.toLocaleString()+' après '+((endTime.getTime() - startTime.getTime())/1000));

/******************************************************
* Réservé aux débogages
* 
******************************************************/
	}
})();