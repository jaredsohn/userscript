// ==UserScript==
// @name           Custom Deff-Requester
// @description   Zoals deze fuctie ooit bedoeld moet zijn geweest door TW
// @namespace  CDF
// @version		 1.1.2.1
// @author 		 Squiffy-Squirrel, timOkills
// @include		 http://nl*tribalwars.nl/game.php?*screen=reqdef*
// @include		 http://nl*tribalwars.nl/game.php?*screen=memo*
// @include		 http://nl*tribalwars.nl/game.php?*answer=true*
// @include		 http://nl*tribalwars.nl/game.php?*mode=new_thread*
// @include		 http://nl*tribalwars.nl/game.php?*screen=report*
// @icon	 	     http://nl14.tribalwars.nl/graphic/unit/def.png?1
// @grant			GM_getValue
// @grant			GM_setValue
// ==/UserScript==

(function() {
	var loc = document.location.href.match(/http:\/\/([a-z]+)\d+.\w*-?(tribalwars)...\/game.php/)[1];

	var version = "1.1.2.1";
	if(navigator.userAgent.search(/Firefox/i) != -1) var browser = 0; else if(navigator.userAgent.search(/Opera/i) != -1) var browser = 1; else var browser = 0;
//Primitives
	var d = document;

	//GetElementById
	function $(id) {
		return document.getElementById(id);
	}
	function ce(element) {
		return d.createElement(element);
	}
	function cpn(element, childNode) {
		var buf = ce(element);
		buf.appendChild(childNode);
		return buf;
	}
	function ctn(text) {
		return d.createTextNode(text);
	}
	function cih(html) {
		var e = ce("div");
		e.innerHTML = html;
		return e;
	}
	function br() {
		return ce('br');
	}

	//löscht das übergebene Element
	function del(id) {
	var el = document.getElementById(id);
	if(el) {
		el.parentNode.removeChild(el);
	}

	}

	//Erstellt eine Box in der mitte des Bildschirms mit der übergebenen Nachricht
	//und id. Existiert eine Box mit der gegebenen id bereits, wird nichts unternommen
	function alertBox(content, box_id, reload) {
		if(document.getElementById(box_id)) return;
		var box = document.createElement('div');
		box.id = box_id;
		box.style.position = "absolute";
		box.style.backgroundColor="#F7EED3";
		box.style.border="solid 2px"
		box.appendChild(content);
		var center = document.createElement('center');
			var a = document.createElement('a');
				a.appendChild(document.createTextNode((reload ? "Nu herladen" : "Sluiten")));
				a.id = box_id + "_close";
				a.href = (reload ? 'javascript:location.reload();' : "javascript:void(0);");
				a.addEventListener("click", function() {del(box_id);return true;}, false);
			center.appendChild(a);
		box.appendChild(center);
		box.style.padding = "20px";
		document.body.appendChild(box);
		box.style.left = parseInt(window.innerWidth/2-box.offsetWidth/2) + "px";
		box.style.top = parseInt(window.innerHeight/2-box.offsetHeight/2+window.scrollY) + "px";
	}

	// Storage-Klasse
	// Autor: Hypix
	// Zur freien Verwendung
	function Storage(prefix,forceGM){
		  var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
		  var win = gm ? unsafeWindow : window;
		  var ls = false;
		  var intGetValue;
		  var intSetValue;
		  var prefix = prefix;
		  try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
		  if( !ls && !gm )
		    throw("Keine geeignete Speichermöglichgkeit gefunden");
		  if( forceGM && gm || !ls)
		  {
		    if( gm )
		    {
		      prefix = prefix + "_" + document.location.host.split('.')[0];
		      intSetValue = function(key,value)
		      {
		        GM_setValue(prefix+"_"+key,value);
		      };
		      intGetValue = function(key,defaultValue)
		      {
		        return GM_getValue(prefix+"_" + key, defaultValue);
		      };
		      this.deleteValue = function(key)
		      {
		        GM_deleteValue(prefix+"_"+key);
		      };
		      this.listValues = function(re)
		      {
		        var allkeys = GM_listValues();
		        var serverKeys = [];
		        var rePrefix = new RegExp("^"+prefix+"_(.*)$");
		        if( typeof(re) != "undefined" )
		          var reKey = new RegExp(re);
		        for( var i = 0; i < allkeys.length; i++ )
		        {
		          var res = allkeys[i].match(rePrefix);
		          if( res )
		          {
		            if( reKey )
		            {
		              res = res[1].match(reKey);
		              if( res )
		                serverKeys.push(res);
		            }
		            else
		              serverKeys.push(res[1]);
		          }
		        }
		        return serverKeys;
		      };
		    }
		  }
		  else if( ls )
		  {
		    intSetValue = function(key,value)
		    {
		      localStorage.setItem(prefix+"_"+key, value );
		    };
		    intGetValue = function(key,defaultValue)
		    {
		      var value = localStorage.getItem(prefix+"_"+key);
		      if( value )
		        return value;
		      else
		        return defaultValue;
		    };
		    this.deleteValue = function(key)
		    {
		      localStorage.removeItem(prefix+"_"+key);
		    };
		    this.listValues = function(re)
		    {
		      var keys = [];
		      var rePrefix = new RegExp("^"+prefix+"_(.*)$");
		      if( typeof(re) != "undefined")
		        var reKey = new RegExp(re);
		      for( var i = 0; i < win.localStorage.length; i++ )
		      {
		        var res = localStorage.key(i).match(rePrefix);
		        if( res )
		        {
		          if( reKey )
		          {
		            res = res[1].match(reKey);
		            if( res )
		              keys.push(res);
		          }
		          else
		            keys.push(res[1]);
		        }
		      }
		      return keys;
		    };
		  }
		  this.clear = function(re)
		  {
		    var keys = this.listValues(re);
		    for( var i = 0; i < keys.length; i++ )
		      this.deleteValue(keys[i]);
		  };
		  this.setValue = function(key,value)
		  {
		    switch( typeof(value) )
		    {
		      case "object":
		      case "function":
		        intSetValue(key,"j"+JSON.stringify(value));
		        break;
		      case "number":
		        intSetValue(key,"n"+value);
		        break;
		      case "boolean":
		        intSetValue(key,"b" + (value ? 1 : 0));
		        break;
		      case "string":
		        intSetValue(key,"s" + value );
		        break;
		      case "undefined":
		        intSetValue(key,"u");
		        break;
		    }
		  };
		  this.getValue = function(key,defaultValue)
		  {
		    var str = intGetValue(key);
		    if( typeof(str) != "undefined" )
		    {
		      switch( str[0] )
		      {
		        case "j":
		          return JSON.parse(str.substring(1));
		        case "n":
		          return parseFloat(str.substring(1));
		        case "b":
		          return str[1] == "1";
		        case "s":
		          return str.substring(1);
		        default:
		          this.deleteValue(key);
		      }
		    }
		    return defaultValue;
		  };
		  this.getString = function(key)
		  {
		    return intGetValue(key);
		  };
		  this.setString = function(key,value)
		  {
		    intSetValue(key,value);
		  };
		}

	var languages = {
		global : {
			regExp : {
				truppen : {
					speer : /\[unit\]spear\[\/unit\] (\d+)/,
					schwert : /\[unit\]sword\[\/unit\] (\d+)/,
					axt : /\[unit\]axe\[\/unit\] (\d+)/,
					spy : /\[unit\]spy\[\/unit\] (\d+)/,
					lkav : /\[unit\]light\[\/unit\] (\d+)/,
					skav : /\[unit\]heavy\[\/unit\] (\d+)/,
					ramm : /\[unit\]ram\[\/unit\] (\d+)/,
					katta : /\[unit\]catapult\[\/unit\] (\d+)/,
					ag : /\[unit\]snob\[\/unit\] (\d+)/,
					bogi : /\[unit\]archer\[\/unit\] (\d+)/,
					bbogi : /\[unit\]marcher\[\/unit\] (\d+)/
				}
			}
		}
	}
	languages.nl = {
			emptyMessage : "geen bevel geselecteerd",
			units : {
				spear : "Speervechter",
				sword : "Zwaardvechter",
				axe : "Bijlstrijder",
				archer : "Boogschutter",
				spy : "Verkenner",
				light : "Lichte cavalerie",
				marcher : "Bereden boogschutter",
				heavy : "Zware cavalerie",
				ramm : "Ram",
				cat : "Katapult"
			},
			radau : {
				link : "Help een fout!",
				subtitle : "Dit is RADAU, de automatiche foutberichtgenerator.",
				description : "RADAU helpt bij het creëren van een foutraport, die op het algemeen Forum of als IMG verstuurd kan worden.",
				problem : "Beschrijving van het probleem:",
				conProblem : "Wat werkt niet (/niet goed)?",
				situation : "Situatie:",
				conSituation : "Wat gebeurd er (niet juist)?",
				output : "Uitvoer:",
				currOutput : "Huidige Uitgave gebruiken",
				noOutput : "Probleem stelling niet relevant",
				ownOutput : "Eigen omschrijving maken",
				conOutput : "<Eigen uitvoer>",
				info : "<b>Fout:</b> Er is iets fout gegaan met de troepen informatie<br />",
				dsOutput : "???????",
				copyInfo : "De uitvoer kan gekopieerd worden en in Forum geplakt worden of als IMG verzonden worden.<br />",
				forumLink : "Naar Algemeen forum",
				pnLink : "Naar IMG"
			},
			settings : {
				importSuccess : "Import geslaagd!!",
				saveSuccess : "Instellingen opgeslagen!",
				deleteSuccess : "Instellingen verwijderd!",
				exact : "Exacte instellingen",
				exactInfo : "(Overschrijven die hier boven)",
				formatString : "Opmaak String:",
				formatStringAtt : "Opmaak String (Aanval):",
				baseDeff : "Gronddef:",
				deffsPerAtt : "Def per Aanval:",
				normalPoints : "Normale Verd.:",
				kavPoints : "Bereden Verd.:",
				archerPoints : "Boog Verd.:",
				saveLink : "\273 Instellingen opslaan",
				deleteLink : "\273 Instellingen verwijderen",
				deffNumberTitle : "Def aantallen",
				deffPointsTitle : "Def punten",
				deffPointsInfo : "Berekenen",
				calcDeffPoints : "Def-Punten berekenen",
				calcDeffPointsDesc : "Voer de aantallen in bij de eenheden die een gemiddelde Def blijven bij u.<br \>Klik vervolgens op \"Berekenen\" en uw Deff punten worden weergegeven.",
				calcDeffPointsAccept : "Waarden accepteer",
				calcDeffPointsAccepted : "geaccepteerd",
				misc : "Diverse",
				includeWall : "level van de muur mee berekenen.",
				ndeffp1 : "Benodigde Def+1 (AKA mobile Def) behouden",
				roundDeff : "Def op hele getallen afronden",
				roundDeffUp : "... afronden",
				visibility : {
					title : "Hoe de aanvallen te tonen",
					showFirst : "Alleen de eerste aanval tonen",
					showAll : "Alle aanvalen tonen",
					showFirstLast : "De eerste en de laatste enkel tonen"
				},
				toolbar : {
					town : "Dorp",
					troups : "Troepen",
					deffs : "Defs",
					attacks : "Aanvallen",
					cond : "voorwaarden",
					attack : "Aanval",
					info : "(hier kunnen alle variabelen van hier boven gebruikt worden)"
				}
			},
			outputSaver : {
				saved : "Opgeslagen",
				save : "Opslaan",
				insert : "Invoeren",
				unsaved : "(niets opgeslagen)",
				of : "van"
			},
			next : "Verder",
			close : "Afbreken",
			calc : "Berekenen",
			settingsTitle : "Instellingen:",
			newSettingsLoaded : "Nieuwe instellingen: (Normal, Bereden, Bogen)",
			regExp : {
				villTitle : "[b]Aangevallen dorp[/b]",
				attTitle : ". aanval[/b]",
				wall : /Level muur: (\d+)/,
				truppen : languages.global.regExp.truppen,
				angriffe : {
					name : (browser == 0 ? /Naam van de aanvaller: (.*)Aanvaller/ : /Naam van de Aanvaller: (.*)/),
					attacker : /Aanvaller: (\[player\].+\[\/player\])/,
					from : /Herkomst: (\[coord\]\d+\|\d+\[\/coord\])/,
					time : /Aankomsttijd: (\d{1,2}.\d\d.\d\d \d{1,2}:\d\d:\d\d:\d{1,3})/,
					timeWithoutMillis : /Aankomsttijd: (\d{1,2}.\d\d.\d\d \d{1,2}:\d\d:\d\d)/
				}
			},

			err : {
				input : "De invoer is verkeerd!",
				noOperand : "Niet geldig",
				unknownVar : "Onbekende Variabel in If afhandeling!",
				noCondition : "Syntax Error in Opmaak String: %IF% heeft geen fuctie",
				noEndIf : "Syntax Error in Opmaak String: %ENDIF% gaat niet goed.",
				attInvalidPara : "ongeldige Optie bij %ATTACKS%!",
				attInvalidParaInfo : "werkt niet. enkel ALL, FIRST en FIRSTLAST werken.",
				wallMissing : "De invoer is verkeerd: Dorp bekend, maar muur gaat niet juist!"
			}
		};	
	languages.lol = {
//
//
//
			err : languages.nl.err
		};

	function RADAU() {
		if(document.getElementById('RADAU')) return;
		var box = createBox(addContent);

		function createBox(addFkt) {
			var box = document.createElement('div');
			box.id = "radau";
			box.style.position = "absolute";
			box.style.backgroundColor="#F7EED3";
			box.style.border="solid 1px"
			box.style.padding = "20px";
			addFkt(box);
			document.body.appendChild(box);
			//box.style.textAlign = "center";
			box.style.left = parseInt(window.innerWidth/2-box.offsetWidth/2) + "px";
			box.style.top = parseInt(window.innerHeight/2-box.offsetHeight/2+window.scrollY) + "px";
			return box;
		}
		function addContent(parent) {
			parent.appendChild(cih("<h2 style='text-align:center;'>Don't Panic!</h2>"));
			parent.appendChild(cih("<h4 style='text-align:center;'>" + lang.radau.subtitle + "</h4>"));
			parent.appendChild(cih(lang.radau.description));
			parent.appendChild(cih("<b>" + lang.radau.problem + "</b>"));
			var ta = ce('textarea');
				ta.id = 'radau_descr';
				ta.cols = '80';
				ta.rows = '6';
				ta.value = lang.radau.conProblem;
			parent.appendChild(ta);
			parent.appendChild(cih("<b>" + lang.radau.situation + "</b>"));
			var ta = ce('textarea');
				ta.id = 'radau_situation';
				ta.cols = '80';
				ta.rows = '4';
				ta.value = lang.radau.conSituation;
			parent.appendChild(ta);
			parent.appendChild(br());
			parent.appendChild(cih("<b>" + lang.radau.output + "</b>"));
			var radio = ce('input');
					radio.type = "radio";
					radio.name = "radau_output-op";
					radio.value = lang.radau.currOutput;
					radio.addEventListener("click", function() {$("radau_output").disabled = "true";}, false);
					radio.checked = "checked";
				parent.appendChild(radio);
			parent.appendChild(ctn(lang.radau.currOutput));
			parent.appendChild(br());
			var radio = ce('input');
					radio.type = "radio";
					radio.name = "radau_output-op";
					radio.value = lang.radau.noOutput;
					radio.addEventListener("click", function() {$("radau_output").disabled = "true";}, false);
				parent.appendChild(radio);
			parent.appendChild(ctn(lang.radau.noOutput));
			parent.appendChild(br());
			var radio = ce('input');
					radio.type = "radio";
					radio.name = "radau_output-op";
					radio.value = lang.radau.ownOutput;
					radio.addEventListener("click", function() {$("radau_output").disabled = "";}, false);
				parent.appendChild(radio);
			parent.appendChild(ctn(lang.radau.ownOutput));
			parent.appendChild(br());
			var ta = ce('textarea');
				ta.id = 'radau_output';
				ta.cols = '80';
				ta.rows = '6';
				ta.disabled = "true";
				ta.value = lang.radau.conOutput;
			parent.appendChild(ta);
			parent.appendChild(cih("<div style='font-size:smaller;'>" + lang.radau.info + "</div>"));
			var center = ce("center");
			var a = ce("a");
				a.href = 'javascript:void(0);';
				a.addEventListener("click", function() {del("radau");}, false);
				a.appendChild(ctn(lang.close));
			center.appendChild(a);
			center.appendChild(ctn(" | "));
			var a = ce("a");
				a.href = 'javascript:void(0);';
				a.addEventListener("click", generateReport, false);
				a.appendChild(ctn(lang.next));
			center.appendChild(a);
			parent.appendChild(center);
		}
		function gatherInformation() {
			var infos = {
				descr : $("radau_descr").value,
				situation : $("radau_situation").value,
				output : null,
				input : $("message").value,
				settings : importExport.exportString(data.settings),
				world : d.location.href.match(/http:\/\/([a-z]+\d+).\w*-?(tribalwars)...\/game.php/)[1]
			};
			var radios = document.getElementsByName("radau_output-op");
			var choosed = -1;
			for(var i = 0; i != radios.length; ++i) {
				if(radios[i].checked)
					choosed = i;
			}
			if(choosed == 0)
				infos.ouput = $("better_message").value;
			else if(choosed == 2)
				infos.output = $("radau_output").value;
			else
				infos.output = "Geen uitvoer.";
			return infos;
		}
		function generateReport() {
			infos = gatherInformation();
			del("radau");
			createBox(addResult);
		}
		function formatInfos(infos) {
			var ret = "[B]" + lang.radau.problem + "[/B][INDENT]" + infos.descr + "[/INDENT][B]" + lang.radau.situation + "[/B][INDENT]" + infos.situation + "[/INDENT]";
			if(typeof(infos.output!="undefined"))
				ret += "[B]" + lang.radau.output + "[/B][SPOILER=''][PHP]" + infos.output + "[/PHP][/SPOILER]";
			ret += "[B]" + lang.radau.dsOutput + "[/B][SPOILER=''][PHP]" + infos.input + "[/PHP][/SPOILER]"
			ret += "[B]" + lang.settingsTitle + "[/B][SPOILER=''][PHP]" + infos.settings + "[/PHP][/SPOILER][B]Wereld:[/B] " + infos.world;
			ret += "\n[B]Browser:[/B] " + navigator.userAgent;
			ret += "\n[SIZE='1']Generated by RADAU 1.2 (Rescue for All DAUs)[/SIZE]";
			return ret;
		}
		function addResult(parent) {
			parent.appendChild(cih("<h2 style='text-align:center;'>Don't Panic!</h2>"));
			parent.appendChild(cih(lang.radau.copyInfo));
			parent.appendChild(cih("<b>" + lang.radau.output + "</b>"));
			var ta = ce('textarea');
				ta.id = 'radau_situation';
				ta.cols = '80';
				ta.rows = '18';
				ta.value = formatInfos(infos);
			parent.appendChild(ta);
			var center = ce("center");
			var a = ce("a");
				a.href = 'javascript:void(0);';
				a.addEventListener("click", function() {del("radau");}, false);
				a.appendChild(ctn(lang.close));
			center.appendChild(a);
			center.appendChild(ctn(" | "));
			var a = ce("a");
				a.href = 'http://forum.tribalwars.nl/newreply.php?do=newreply&noquote=1&p=';//	ID even invullen voor wie dat wil^^
				a.target = "_blank";
				a.appendChild(ctn(lang.radau.forumLink));
			center.appendChild(a);
			center.appendChild(ctn(" | "));
			var a = ce("a");
				a.href = 'http://forum.tribalwars.nl/private.php?do=newpm&u=';//	ID even invullen voor wie dat wil^^
				a.target = "_blank";
				a.appendChild(ctn(lang.radau.pnLink));
			center.appendChild(a);
			parent.appendChild(center);
		}
	}



//Configuration Loader functions:
var config = {
	getXML : function(url) {
			var xmlHttp = new XMLHttpRequest();
		if (xmlHttp == null)
			alert("Error creating request object!");

		if (xmlHttp) {
			xmlHttp.open('GET', url, false);
			xmlHttp.send(null);

			if(xmlHttp.status == 200) { //Status OK!
				var xml = xmlHttp.responseXML;
				return xml;
			}
			else {
			 alertBox(ctn("Could not load unit settings from " + url + "!"), "cdr_config-load-err", false);
			}
		}
		return null;
	},
	loadUnitInfo : function(){
		var loadedSettings = {
			speer: {
				normal: 0,
				cav: 0,
				bog: 0
			},
			axe : {
				normal : 0,
				cav : 0,
				bog : 0
			},
			spy : {
				normal : 0,
				cav : 0,
				bog : 0
			},
			light : {
				normal : 0,
				cav : 0,
				bog : 0
			},
			schwert: {
				normal: 0,
				cav: 0,
				bog: 0
			},
			bogi: {
				normal: 0,
				cav: 0,
				bog: 0
			},
			skav: {
				normal: 0,
				cav: 0,
				bog: 0
			},
			bbogi: {
				normal: 0,
				cav: 0,
				bog: 0
			},
			ram : {
				normal : 0,
				cav : 0,
				bog : 0
			},
			cat : {
				normal : 0,
				cav : 0,
				bog : 0
			}
		};

		xml = config.getXML('/interface.php?func=get_unit_info');
		if(xml != null) {
			var units = xml.firstChild; //Enter config

				loadedSettings.speer.normal = units.getElementsByTagName("spear")[0].getElementsByTagName("defense")[0].firstChild.nodeValue;
				loadedSettings.speer.cav = units.getElementsByTagName("spear")[0].getElementsByTagName("defense_cavalry")[0].firstChild.nodeValue;
				loadedSettings.speer.bog = units.getElementsByTagName("spear")[0].getElementsByTagName("defense_archer")[0].firstChild.nodeValue;

				loadedSettings.axe.normal = units.getElementsByTagName("axe")[0].getElementsByTagName("defense")[0].firstChild.nodeValue;
				loadedSettings.axe.cav = units.getElementsByTagName("axe")[0].getElementsByTagName("defense_cavalry")[0].firstChild.nodeValue;
				loadedSettings.axe.bog = units.getElementsByTagName("axe")[0].getElementsByTagName("defense_archer")[0].firstChild.nodeValue;
				
				loadedSettings.schwert.normal = units.getElementsByTagName("sword")[0].getElementsByTagName("defense")[0].firstChild.nodeValue;
				loadedSettings.schwert.cav = units.getElementsByTagName("sword")[0].getElementsByTagName("defense_cavalry")[0].firstChild.nodeValue;
				loadedSettings.schwert.bog = units.getElementsByTagName("sword")[0].getElementsByTagName("defense_archer")[0].firstChild.nodeValue;
				
				loadedSettings.spy.normal = units.getElementsByTagName("spy")[0].getElementsByTagName("defense")[0].firstChild.nodeValue;
				loadedSettings.spy.cav = units.getElementsByTagName("spy")[0].getElementsByTagName("defense_cavalry")[0].firstChild.nodeValue;
				loadedSettings.spy.bog = units.getElementsByTagName("spy")[0].getElementsByTagName("defense_archer")[0].firstChild.nodeValue;
				
				loadedSettings.light.normal = units.getElementsByTagName("light")[0].getElementsByTagName("defense")[0].firstChild.nodeValue;
				loadedSettings.light.cav = units.getElementsByTagName("light")[0].getElementsByTagName("defense_cavalry")[0].firstChild.nodeValue;
				loadedSettings.light.bog = units.getElementsByTagName("light")[0].getElementsByTagName("defense_archer")[0].firstChild.nodeValue;

				if(units.getElementsByTagName("archer").length != 0) {
					loadedSettings.bogi.normal = units.getElementsByTagName("archer")[0].getElementsByTagName("defense")[0].firstChild.nodeValue;
					loadedSettings.bogi.cav = units.getElementsByTagName("archer")[0].getElementsByTagName("defense_cavalry")[0].firstChild.nodeValue;
					loadedSettings.bogi.bog = units.getElementsByTagName("archer")[0].getElementsByTagName("defense_archer")[0].firstChild.nodeValue;
				}

				loadedSettings.skav.normal = units.getElementsByTagName("heavy")[0].getElementsByTagName("defense")[0].firstChild.nodeValue;
				loadedSettings.skav.cav = units.getElementsByTagName("heavy")[0].getElementsByTagName("defense_cavalry")[0].firstChild.nodeValue;
				loadedSettings.skav.bog = units.getElementsByTagName("heavy")[0].getElementsByTagName("defense_archer")[0].firstChild.nodeValue;

				if(units.getElementsByTagName("marcher").length != 0) {
					loadedSettings.bbogi.normal = units.getElementsByTagName("marcher")[0].getElementsByTagName("defense")[0].firstChild.nodeValue;
					loadedSettings.bbogi.cav = units.getElementsByTagName("marcher")[0].getElementsByTagName("defense_cavalry")[0].firstChild.nodeValue;
					loadedSettings.bbogi.bog = units.getElementsByTagName("marcher")[0].getElementsByTagName("defense_archer")[0].firstChild.nodeValue;
				}
				
				loadedSettings.ram.normal = units.getElementsByTagName("ram")[0].getElementsByTagName("defense")[0].firstChild.nodeValue;
				loadedSettings.ram.cav = units.getElementsByTagName("ram")[0].getElementsByTagName("defense_cavalry")[0].firstChild.nodeValue;
				loadedSettings.ram.bog = units.getElementsByTagName("ram")[0].getElementsByTagName("defense_archer")[0].firstChild.nodeValue;
				
				loadedSettings.cat.normal = units.getElementsByTagName("catapult")[0].getElementsByTagName("defense")[0].firstChild.nodeValue;
				loadedSettings.cat.cav = units.getElementsByTagName("catapult")[0].getElementsByTagName("defense_cavalry")[0].firstChild.nodeValue;
				loadedSettings.cat.bog = units.getElementsByTagName("catapult")[0].getElementsByTagName("defense_archer")[0].firstChild.nodeValue;
				
				alertBox(cih(lang.newSettingsLoaded + 
					"<br>Speer: " + loadedSettings.speer.normal + ", " + loadedSettings.speer.cav + ", " + loadedSettings.speer.bog + 
					"<br>Zwaard: " + loadedSettings.schwert.normal + ", " + loadedSettings.schwert.cav + ", " + loadedSettings.schwert.bog + 
					"<br>Bijl: " + loadedSettings.axe.normal + ", " + loadedSettings.axe.cav + ", " + loadedSettings.axe.bog + 
					"<br>Boog: " + loadedSettings.bogi.normal + ", " + loadedSettings.bogi.cav + ", " + loadedSettings.bogi.bog + 
					"<br>LC: " + loadedSettings.light.normal + ", " + loadedSettings.light.cav + ", " + loadedSettings.light.bog + 
					"<br>Ber. Boog: " + loadedSettings.bbogi.normal + ", " + loadedSettings.bbogi.cav + ", " + loadedSettings.bbogi.bog + 
					"<br>ZC: " + loadedSettings.skav.normal + ", " + loadedSettings.skav.cav + ", " + loadedSettings.skav.bog + 
					"<br>Ram: " + loadedSettings.ram.normal + ", " + loadedSettings.ram.cav + ", " + loadedSettings.ram.bog + 
					"<br>Katta: " + loadedSettings.cat.normal + ", " + loadedSettings.cat.cav + ", " + loadedSettings.cat.bog),
					"cdr_new-settings", false);
				var store = new Storage("custom_deff_requester", false);
				store.setValue("unitSettings" , loadedSettings);
		}
		return loadedSettings;
	}
};

//Import/Export functions:
var importExport = {
		importString : function(string) {
			var im = string.split(";");
			var eqPos = im[0].search("=");
			if(eqPos != -1) {	//Version Header gefunden
				var imp = {
					version : im[0].substr(eqPos+1),
					verPattern : importExport.decodeString(im[1]),
					attPattern : importExport.decodeString(im[2]),
					unit : data.settings.unit,
					points : {
						normal : im[3],
						cav : im[4],
						bog : im[5]
					},
					deff : {
						baseDeff : im[6],
						perAttDeff : im[7],
						exactDeff : importExport.destringifyArray(im[8])
					},
					attDisp : im[9],
					includeWall : false,
					neededDeffP1 : false,
					roundDeffs : false,
					roundUp : false,
				};
				if(imp.version == 2 && im.length == 14) { //Aktuelle Version
					imp.includeWall = (im[10] == 1 ? true : false);
					imp.neededDeffP1 = (im[11] == 1 ? true : false);
					imp.roundDeff = (im[12] == 1 ? true : false);
					imp.roundUp = (im[13] == 1 ? true : false);
				}
				else if(im.length >= 11) {	//Alte Version... versuche Einstellungen zu finden
					imp.includeWall = (im[10] == 1 ? true : false);
					if(im.length >= 12)
						imp.neededDeffP1 = (im[11] == 1 ? true : false);
					if(im.length >= 13)
						imp.roundDeff = (im[12] == 1 ? true : false);
					if(im.length >= 14)
						imp.roundUp = (im[13] == 1 ? true : false);
				}
				return imp;
			}
			else if(im.length >= 10) {	//Alter Version ohne Versions Header
				verPattern = importExport.decodeString(im[0]);
				attPattern = importExport.decodeString(im[1]);
				pointSettings.normal = im[2];
				pointSettings.cav = im[3];
				pointSettings.bog = im[4];
				deffSettings.baseDeff = im[5];
				deffSettings.perAttDeff = im[6];
				deffSettings.exactDeff = importExport.destringifyArray(im[7]);
				attDispSettings = im[8];
				includeWall = (im[9] == 1 ? true : false);
				neededDeffP1 = false;
				roundDeff = false;
				roundUp = false;
				return 1;
			}
			else {
				alertBox(ctn(lang.err.input), "cdr_input-err", false);
				return null;
			}
		},
		encodeString : function(string) {

			return string.replace(/;/g, "%SEMICOLON%");

		},
		decodeString : function(string) {

			return string.replace(/%SEMICOLON%/ig, ";");
		},
		stringifyArray : function(arr) {
			var ret = "";

			for(var i = 0; i != arr.length; ++i) {
				ret += arr[i] + (i != arr.length - 1 ? "," : "");
			}
			return ret;
		},
		destringifyArray : function(string) {

			var split = string.split(",");
			return split;
		},
		exportString : function(settings) {
			var ret = "Version=2;";
			ret += importExport.encodeString(settings.verPattern) + ";" + importExport.encodeString(settings.attPattern) + ";";
			ret += settings.points.normal + ";" + settings.points.cav + ";" + settings.points.bog + ";";
			ret += settings.deff.baseDeff + ";" + settings.deff.perAttDeff + ";" + importExport.stringifyArray(settings.deff.exactDeff) + ";";
			ret += settings.attDisp + ";";
			ret += (settings.includeWall ? 1 : 0) + ";";
			ret += (settings.neededDeffP1 ? 1 : 0) + ";";
			ret += (settings.roundDeffs ? 1 : 0) + ";";
			ret += (settings.roundUp ? 1 : 0);

			return ret;
		}
};

//Stored Data Loader
function Loader(prefix) {
		var store = new Storage(prefix, false);

		this.loadUnitSettings = function() {
			var load = store.getValue("unitSettings");

			if(typeof(load) == "undefined") {
				load = config.loadUnitInfo();

			}
			else if(typeof(load.cat) == "undefined") {
				load = config.loadUnitInfo();
			}

			return load;
		};
		this.loadVerPattern = function() {
			var stdVal ="#%DNUMBER% - %DORP% - %IF%[%NDEFFS%<=0][color=#004b00]BLOCKED[/color]%ELSE%"+
			"Muur: %WALL% - "+
			"[b]OS nodig: [color=#a50000]%NDEFFS%[/color][/b]"+
			"[spoiler] %ATTACKS% [/spoiler]%ENDIF%\n";

			return store.getValue("verPattern", stdVal);
		};
		this.loadAttPattern = function() {
			var stdVal = "%NUMBER% %NAME% Aankomst: %TIME%\n";

			return store.getValue("attPattern", stdVal);
		};
		this.loadPointSettings = function() {
			var stdVal = {
					normal: 525000,
					cav: 525000,
					bog: 0
			};
			return store.getValue("pointSettings", stdVal);
		};
		this.loadDeffSettings = function() {
			var stdVal = {
					baseDeff: 3,
					perAttDeff: 1,
					exactDeff: new Array()
			};
			return store.getValue("deffSettings", stdVal);
		};
		this.loadAttDispSettings = function() {
			var stdVal = 0;

			return store.getValue("attDispSettings", stdVal);
		};
		this.loadIncludeWall = function() {
			var stdVal = false;

			return store.getValue("includeWall", stdVal);
		};
		this.loadNeededDeffP1 = function() {
			var stdVal = false;

			return store.getValue("neededDeffP1", stdVal);
		};
		this.loadRoundDeffs = function() {
			var stdVal = true;

			return store.getValue("roundDeffs", stdVal);
		},
		this.loadRoundUp = function() {
			var stdVal = false;
			return store.getValue("roundUp", stdVal);
		},
		this.loadSavedString = function() {
			var stdVal = "";
			return store.getValue("savedString", stdVal);
		}
}

//Display functions:
var gui = {
	show : function(id) {
		var el = $(id);
		if(el.style.display == "")
			el.style.display = "none";
		else
			el.style.display = "";
	},
	hideEasyMessage : function() {
		var Reqdef = (typeof unsafeWindow != 'undefined' ? unsafeWindow.Reqdef : window.Reqdef);
		var easyHeader = $("simple_message").previousSibling.previousSibling;
		if(easyHeader == null)
			var easyHeader = $("simple_message").previousSibling;
		var id = parseInt(easyHeader.getElementsByTagName('a')[0].id)
		Reqdef.Memory.toggle[id] = 1;	// toggle[id]%2 -> Fenster ist ausgeklappt.
		$("simple_message").style.display = "none";
		easyHeader.getElementsByTagName('img')[0].src = "graphic/arrow_down_padd.png?1";
	},
	event : {
		showArrowBetter : function () {
			gui.show("better_message_div");
			gui.show("arrow_down");
			gui.show("arrow_up");
			return true;
		},
		showArrowSettings : function () {
			if(!$("einst"))
				$("cdr_settings").appendChild(gui.create.createSettingsContent(data.settings));
			gui.show("einst");
			gui.show("einst_arrow_down");
			gui.show("einst_arrow_up");
			return true;
		},
		showImportExport : function () {
			gui.show("importexport");
		},
		importEvent : function () {
			var imp = importExport.importString(d.getElementById("importexportTA").value);
			if(imp != null) {
				var store = new Storage("custom_deff_requester", false);
				store.setValue("verPattern", imp.verPattern);
				store.setValue("attPattern", imp.attPattern);
				store.setValue("pointSettings", imp.points);
				store.setValue("deffSettings", imp.deff);
				store.setValue("attDispSettings", imp.attDisp);
				store.setValue("includeWall", imp.includeWall);
				store.setValue("neededDeffP1", imp.neededDeffP1);
				store.setValue("roundDeffs", imp.roundDeff);
				store.setValue("roundUp", imp.roundUp);

				alertBox(ctn(lang.settings.importSuccess + " Import Version: " + imp.version), "cdr_import-success", true);
			}
		},
		addExactDeffField : function () {
			var einsts = document.getElementsByName("einst_genauere");
			var gdiv = einsts[0].parentNode;
			var count = 1*einsts[einsts.length-1].id.match(/\d+/)+1;
			var geS = ctn(count + " Incomes: ");
			var ge = ce("input");
			var geS2 = ctn("Deff(s)");

			ge.type = "text";
			ge.size = "3";
            ge.value = einsts[einsts.length-1].value;
			ge.name = "einst_genauere";
			ge.id = "einst_genauere"+count;

			gdiv.appendChild(geS);
			gdiv.appendChild(ge);
			gdiv.appendChild(geS2);
			gdiv.appendChild(br());
			return true;
		},
		saveSettings : function (){
				var store = new Storage("custom_deff_requester", false);

				var getExacts = function() {
					var genauer = document.getElementsByName("einst_genauere");
					var ret = new Array(genauer.length);
					for(var i = 0; i != genauer.length; ++i) {
						ret[i] = genauer[i].value;
					}
					return ret;
				};

				var vp = document.getElementById("einst_pattern").value;

				var ap = document.getElementById("einst_att_pattern").value;

				var ps = {
						normal: document.getElementById("einst_pointsnor").value,
						cav: document.getElementById("einst_pointscav").value,
						bog: document.getElementById("einst_pointsbog").value
				};

				var ds = {
						baseDeff: document.getElementById("einst_grunddeff").value,
						perAttDeff: document.getElementById("einst_perangdeff").value,
						exactDeff: getExacts()
				};

				var radios = document.getElementsByName("einst_att_disp");

				var ads = -1;
				for(var i = 0; i != radios.length; ++i) {
					if(radios[i].checked)
						ads = i;
				}

				var includeWall = false;
				if(document.getElementById("einst_include_wall") && document.getElementById("einst_include_wall").checked)
					includeWall = true;

				var neededDeffP1 = false;
				if(document.getElementById("einst_neededDeffP1") && document.getElementById("einst_neededDeffP1").checked)
					neededDeffP1 = true;

				var roundDeffs = false;
				if(document.getElementById("einst_roundDeffs") && document.getElementById("einst_roundDeffs").checked)
					roundDeffs = true;

				var roundUp = false;
				if($("einst_roundUp") && $("einst_roundUp").checked)
					roundUp = true;


				store.setValue("verPattern", vp);
				store.setValue("attPattern", ap);
				store.setValue("pointSettings", ps);
				store.setValue("deffSettings", ds);
				if(ads != -1)
					store.setValue("attDispSettings", ads);
				store.setValue("includeWall", includeWall);
				store.setValue("neededDeffP1", neededDeffP1);
				store.setValue("roundDeffs", roundDeffs);
				store.setValue("roundUp", roundUp);

				alertBox(ctn(lang.settings.saveSuccess), "cdr_save-success", true);
				return true;
			},
		deleteSettings : function () {
			var store = new Storage("custom_deff_requester", false);

			store.clear();
			alertBox(ctn(lang.settings.deleteSuccess), "cdr_del-success", true);
			return true;
		},
		addCommand : function(insert, to) {
			var select = $(to).selectionStart;
			$(to).value = $(to).value.substring(0, select) + insert + $(to).value.substring(select);
			$(to).focus();
			$(to).selectionStart = select + insert.length;
			$(to).selectionEnd = select + insert.length;
			return true;
		},
		saveOutputString : function() {
			var store = new Storage("custom_deff_requester", false);
			var bms = d.getElementsByName("better_message");
			var outputs = new Array(bms.length+1);
			outputs[0] = 1;
			for(var i = 0; i != bms.length; ++i) {
				outputs[i+1] = bms[i].value;
			}
			if(outputs[1] != "") {
				store.setValue("savedString", outputs);
				$("better_message_div").replaceChild(ctn(lang.outputSaver.saved), $("better_message_div").firstChild);
			}
		},
		pasteEvent : function(id, str, c) {
			$(id).value = str[c];
			var store = new Storage("custom_deff_requester", false);
			if(c >= str.length-1) {
				store.deleteValue("savedString");
			}
			else {
				str[0] = c+1;
				store.setValue("savedString", str);
			}
		},
		showDeffPointCalc : function(settings) {
			if(document.getElementById('deffPointCalc')) return;
				var box = createBox(addContent);

			function createBox(addFkt) {
				var box = document.createElement('div');
				box.id = "deffPointCalc";
				box.style.position = "absolute";
				box.style.backgroundColor="#F7EED3";
				box.style.border="solid 1px"
				box.style.padding = "20px";
				addFkt(box);
				document.body.appendChild(box);
				//box.style.textAlign = "center";
				box.style.left = parseInt(window.innerWidth/2-box.offsetWidth/2) + "px";
				box.style.top = parseInt(window.innerHeight/2-box.offsetHeight/2+window.scrollY) + "px";
				return box;
			}
			function addContent(parent) {
				
				parent.appendChild(cih("<h2 style='text-align:center;'>" + lang.settings.calcDeffPoints + "</h2>"));
				var center = ce("center");
				center.id = "deffPointCalcContent";
				center.appendChild(cih(lang.settings.calcDeffPointsDesc));
				center.appendChild(br());
				center.appendChild(ctn(lang.units.spear));
				center.appendChild(br());
				var input = ce('input');
					input.type = "text";
					input.id = "DeffPointCalcSpear";
					input.value = 0;
				center.appendChild(input);
				center.appendChild(br());
				center.appendChild(br());
				center.appendChild(ctn(lang.units.sword));
				center.appendChild(br());
				var input = ce('input');
					input.type = "text";
					input.id = "DeffPointCalcSword";
					input.value = 0;
				center.appendChild(input);
				center.appendChild(br());
				center.appendChild(br());
				center.appendChild(ctn(lang.units.axe));
				center.appendChild(br());
				var input = ce('input');
					input.type = "text";
					input.id = "DeffPointCalcAxe";
					input.value = 0;
				center.appendChild(input);
				center.appendChild(br());
				center.appendChild(br());
				if(settings.points.bog != 0) {
					center.appendChild(ctn(lang.units.archer));
					center.appendChild(br());
					var input = ce('input');
						input.type = "text";
						input.id = "DeffPointCalcArcher";
						input.value = 0;
					center.appendChild(input);
					center.appendChild(br());
					center.appendChild(br());
				}
				center.appendChild(ctn(lang.units.spy));
				center.appendChild(br());
				var input = ce('input');
					input.type = "text";
					input.id = "DeffPointCalcSpy";
					input.value = 0;
				center.appendChild(input);
				center.appendChild(br());
				center.appendChild(br());
				center.appendChild(ctn(lang.units.light));
				center.appendChild(br());
				var input = ce('input');
					input.type = "text";
					input.id = "DeffPointCalcLight";
					input.value = 0;
				center.appendChild(input);
				center.appendChild(br());
				center.appendChild(br());
				if(settings.points.bog != 0) {
					center.appendChild(ctn(lang.units.marcher));
					center.appendChild(br());
					var input = ce('input');
						input.type = "text";
						input.id = "DeffPointCalcMarcher";
						input.value = 0;
					center.appendChild(input);
					center.appendChild(br());
					center.appendChild(br());
				}
				center.appendChild(ctn(lang.units.heavy));
				center.appendChild(br());
				var input = ce('input');
					input.type = "text";
					input.id = "DeffPointCalcHeavy";
					input.value = 0;
				center.appendChild(input);
				center.appendChild(br());
				center.appendChild(br());
				center.appendChild(ctn(lang.units.ramm));
				center.appendChild(br());
				var input = ce('input');
					input.type = "text";
					input.id = "DeffPointCalcRamm";
					input.value = 0;
				center.appendChild(input);
				center.appendChild(br());
				center.appendChild(br());
				center.appendChild(ctn(lang.units.cat));
				center.appendChild(br());
				var input = ce('input');
					input.type = "text";
					input.id = "DeffPointCalcCat";
					input.value = 0;
				center.appendChild(input);
				center.appendChild(br());
				center.appendChild(br());
				
				var a = ce("a");
					a.href = 'javascript:void(0);';
					a.addEventListener("click", function() {del("deffPointCalc");}, false);
					a.appendChild(ctn(lang.close));
				center.appendChild(a);
				center.appendChild(ctn(" | "));
				var a = ce("a");
					a.href = 'javascript:void(0);';
					a.addEventListener("click", renderResponse, false);
					a.appendChild(ctn(lang.calc));
				center.appendChild(a);
				parent.appendChild(center);
			}
			function renderResponse() {
				var vals = calculate();
				del("deffPointCalcContent");				
				var center = ce("center");
				center.appendChild(br());
				center.appendChild(cih("<b>Normale Verdedigings waarde: </b> " + vals.normal + "<br /><br />"));
				center.appendChild(cih("<b>Kavallarie Verdedigings waarde: </b> " + vals.cav + "<br /><br />"));
				if(settings.points.bog != 0) center.appendChild(cih("<b>Boogschutters Verdedigings waarde: </b> " + vals.normal + "<br /><br />"));
				
				var a = ce("a");
				a.href = 'javascript:void(0);';
				a.addEventListener("click", function() {del("deffPointCalc");}, false);
				a.appendChild(ctn(lang.close));
				center.appendChild(a);
				center.appendChild(ctn(" | "));
				var a = ce("a");
				a.href = 'javascript:void(0);';
				a.addEventListener("click", function() {acceptValues(vals);}, false);
				a.appendChild(ctn(lang.settings.calcDeffPointsAccept));
				a.id = "deffPointsCalcAcceptLink";
				center.appendChild(a);
				$("deffPointCalc").appendChild(center);
			}
			function acceptValues(vals) {
			
				$("einst_pointsnor").value = vals.normal;
				$("einst_pointscav").value = vals.cav;
				$("einst_pointsbog").value = vals.archer;
				$("deffPointsCalcAcceptLink").parentNode.replaceChild(ctn(lang.settings.calcDeffPointsAccepted), $("deffPointsCalcAcceptLink"));
			}
			function calculate() {
				var read = {
					spear : document.getElementById("DeffPointCalcSpear").value,
					sword : document.getElementById("DeffPointCalcSword").value,
					axe : document.getElementById("DeffPointCalcAxe").value,
					spy : document.getElementById("DeffPointCalcSpy").value,
					archer : (document.getElementById("DeffPointCalcArcher") != null ? document.getElementById("DeffPointCalcArcher").value : 0),
					light : document.getElementById("DeffPointCalcLight").value,
					marcher : (document.getElementById("DeffPointCalcMarcher") != null ? document.getElementById("DeffPointCalcMarcher").value : 0),
					heavy : document.getElementById("DeffPointCalcHeavy").value,
					ramm : document.getElementById("DeffPointCalcRamm").value,
					cat : document.getElementById("DeffPointCalcCat").value
				}
				for(var key in read) {
					if(read[key] == null || isNaN(read[key]))
						read[key] = 0;
				}
				var normal = read.spear*settings.unit.speer.normal +
					read.sword*settings.unit.schwert.normal +
					read.axe*settings.unit.axe.normal +
					read.spy*settings.unit.spy.normal +
					read.archer*settings.unit.bogi.normal +
					read.light*settings.unit.light.normal +
					read.marcher*settings.unit.bbogi.normal +
					read.heavy*settings.unit.skav.normal +
					read.ramm*settings.unit.ram.normal +
					read.cat*settings.unit.cat.normal;
				
				var cav = read.spear*settings.unit.speer.cav +
					read.sword*settings.unit.schwert.cav +
					read.axe*settings.unit.axe.cav +
					read.spy*settings.unit.spy.cav +
					read.archer*settings.unit.bogi.cav +
					read.light*settings.unit.light.cav +
					read.marcher*settings.unit.bbogi.cav +
					read.heavy*settings.unit.skav.cav +
					read.ramm*settings.unit.ram.cav +
					read.cat*settings.unit.cat.cav;
					
				if(settings.points.bog != 0)
					var archer = read.spear*settings.unit.speer.bog +
						read.sword*settings.unit.schwert.bog +
						read.axe*settings.unit.axe.bog +
						read.spy*settings.unit.spy.bog +
						read.archer*settings.unit.bogi.bog +
						read.light*settings.unit.light.bog +
						read.marcher*settings.unit.bbogi.bog +
						read.heavy*settings.unit.skav.bog +
						read.ramm*settings.unit.ram.bog +
						read.cat*settings.unit.cat.bog;
				else var archer = 0;
				return {normal : normal, cav : cav, archer : archer};
			}
		}
	},
	create : {
		commandInsertMenuMain : function () {
			var table = ce("table");
				var tr = ce("tr");

					var td = ce("td");
						td.style.borderLeft = "1px solid grey";
						td.colSpan = 5;
						td.align = "center";
						td.appendChild(ctn(lang.settings.toolbar.town));
					tr.appendChild(td);
						td = ce("td");
						td.style.borderLeft = "1px solid grey";
						td.colSpan = 11;
						td.align = "center";
						td.appendChild(ctn(lang.settings.toolbar.troups));
					tr.appendChild(td);
						td = ce("td");
						td.style.borderLeft = "1px solid grey";
						td.colSpan = 3;
						td.align = "center";
						td.appendChild(ctn(lang.settings.toolbar.deffs));
					tr.appendChild(td);
						td = ce("td");
						td.style.borderLeft = "1px solid grey";
						td.colSpan = 1;
						td.align = "center";
						td.appendChild(ctn(lang.settings.toolbar.attacks));
					tr.appendChild(td);
						td = ce("td");
						td.style.borderLeft = "1px solid grey";
						td.style.borderRight = "1px solid grey";
						td.colSpan = 2;
						td.align = "center";
						td.appendChild(ctn(lang.settings.toolbar.cond));
					tr.appendChild(td);
				table.appendChild(tr);
					tr = ce("tr");
					var a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%DNUMBER%", "einst_pattern");}, false);
						a.innerHTML = '<span style="display: inline-block; background: url(\'graphic//bbcodes/bbcodes.png?1\') no-repeat scroll -120px 0px transparent; padding-left: 0px; padding-bottom: 0px; margin-right: 0px; margin-bottom: 0px; width: 20px; height: 20px; text-align:center; color:red; font-size:large;">1</span>';
						a.title = "Dorpnummer (zoals ingelezen)";
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%DORP%", "einst_pattern");}, false);
						a.innerHTML = '<span style="display: inline-block; background: url(\'graphic//bbcodes/bbcodes.png?1\') no-repeat scroll -120px 0px transparent; padding-left: 0px; padding-bottom: 0px; margin-right: 0px; margin-bottom: 0px; width: 20px; height: 20px;"> </span>';
						a.title = "Dorpnaam en  Coördinaten";
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%DANZ%", "einst_pattern");}, false);
						a.innerHTML = '<span style="display: inline-block; background: url(\'graphic//bbcodes/bbcodes.png?1\') no-repeat scroll -120px 0px transparent; padding-left: 0px; padding-bottom: 0px; margin-right: 0px; margin-bottom: 0px; width: 20px; height: 20px; margin-top:5px; padding-top:5px; text-align:center; color:red; font-size:x-small;">Anz</span>';
						a.title = "Aantal aan dorpen totaal";
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%WALL%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "graphic/buildings/wall.png?1"
								img.title = "Muur LVL";
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%ATTANZ%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "data:image/jpeg;base64,R0lGODlhEAAQANUAAAAAAP///ykeK3J8cI2ViJCYipSbjZadjpeckZqgkdTLs83FrsbAsNLIr9jOtdbMtNDHsd3SuH9wU6OVeLKmjsK2nbq1q5uKaqWcjnNfRIt/cZeNg42De3htZn91cP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACAALAAAAAAQABAAAAaLQAvDASoajw+GkGBQHI8LAmLhKAyaT1B0kIiAINaD07hNEIvggbhYPhc/aXH5cfyA4GECl16/fwsfgXSBhEZwBB9qdoaEgVYfj3x2dg4TiQcfUR8Hlk8aEh8KdgsfoIUgHAIaE14gDhcdAhhFFRgCGyANRhENER4CFAwXGbNZRREcEhMUFxXGRswVQQA7"
								img.title = "Aantal aanvallen";
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%SPEER%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "graphic/unit/unit_spear.png?1"
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%ZWAARD%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "graphic/unit/unit_sword.png?1"
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%BIJL%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "graphic/unit/unit_axe.png?1"
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%BOGI%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "graphic/unit/unit_archer.png?1"
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%SPY%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "graphic/unit/unit_spy.png?1"
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%LC%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "graphic/unit/unit_light.png?1"
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%BBOGI%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "graphic/unit/unit_marcher.png?1"
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%ZC%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "graphic/unit/unit_heavy.png?1"
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%RAM%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "graphic/unit/unit_ram.png?1"
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%KATTA%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "graphic/unit/unit_catapult.png?1"
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%EDEL%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "graphic/unit/unit_snob.png?1"
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%WDEFFS%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "data:image/jpeg;base64,R0lGODlhEAAQANUAAAAAAP///4l6gGdfZCkeK3BnclVMWGxgcWdbcwQAUQMCWwwLW2Vlgg4QZBgbaj0+egMHaBIcehomihkiey42fA0afhQhhh0riyItfCYzhy88iRwzhHN8gXmDh3yFg32IhXJ6doGIgnuEemFrX2ZwZG12aouUhpSbjZyhktzRtoB0WcC0msm+pdjNtMjBsbWojc7BqJqJaaeXetXEpqujlXhkRqebjLKnmr2wo4+Fe5eNg4V5b2xcVf8AAP///wAAACH5BAEAAD4ALAAAAAAQABAAAAa1QJqr5Ssajy3XzRU6zZ6zXg/KMoWGp9JHc9lIJxFKqIRK+WAhUidzkVYwn9KJeNZ81BkpvMQpGGEZdmpScRwLCEYzbBl3UiQcDQkHiRQSFoxSkAqSRw+WGR6ZDQoKAkcMEowljoYJN0c2Ax4jHIQkIDx0RSk8KhwOChAOIio7Rz45BAYDEFILPAYENkUrNgQ6OBTNPQoHLTsENCwxNdM+OBMQEAhmKTk1Mi8xK0Y4DwJmRfIrQQA7"
								img.title = "Gevraagde Def";
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%DEFFS%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "graphic/unit/def.png"
								img.title = "Def in het Dorp";
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", function() {gui.event.addCommand("%NDEFFS%", "einst_pattern");}, false);
							var img = ce("img");
								img.src = "data:image/jpeg;base64,R0lGODlhEAAQANUAAAAAAP///4l6gGdfZCkeK3BnclVMWGxgcWdbcwQAUQMCWwwLW2Vlgg4QZBgbaj0+egMHaAwYfBomihkiey42fBEeghQhhh0riyItfBwqgyYzhy88iXN8gXmDh3yFg32IhXJ6doGIgnuEemFrX2ZwZG12aouUhpSbjZyhktzRtoB0WcC0msm+pdjNtMjBsbWojc7BqJqJaaeXetXEpqujlXhkRqebjLKnmr2wo4+Fe5eNg4V5b2xcVf8AAP///wAAACH5BAEAAD4ALAAAAAAQABAAAAa1QJqr5Ssajy3XzRU6zZ69aO/JMoWGp9JnI5VSQiVUygcLkaSWirR0IpI3n6imEsFEOQUjTAMndTIYcT0LCEYzGhcaH34eUQ0JB4YUEhaKI44KkEcPlBqNPRwNCgoCRwwSilEeJBwLCTdHNgMelz0OiyA8bkUpPCocDgoQDiIqO0c+OQQGA1EQCzwGBDZFKzYEOjgUUaMHLTsENCwxNdQ+OBMQEAhjKTk1Mi8xK0Y4DwJjRfIrQQA7"
								img.title = "Nog benodigde Def";
						a.appendChild(img);
					tr.appendChild(cpn("td", a));
						td = ce("td");
						td.align = "center";
							a = ce("a");
							a.href = "javascript:void(0);";
							a.addEventListener("click", function() {gui.event.addCommand("%ATTACKS%", "einst_pattern");}, false);
								var img = ce("img");
									img.src = "graphic/unit/att.png?1"
									img.title = "Toont de aanvallen afhankelijk van de instelling (hieronder) aan";
							a.appendChild(img);
						td.appendChild(a);
					tr.appendChild(td);
						td = ce("td");
						td.align = "center";
							a = ce("a");
							a.href = "javascript:void(0);";
							a.addEventListener("click", function() {gui.event.addCommand("%IF%[<bedingung>]<text>%ENDIF%", "einst_pattern");}, false);
							a.appendChild(ctn("if.."));
						td.appendChild(a);
					tr.appendChild(td);
						td = ce("td");
						td.align = "center";
							a = ce("a");
							a.href = "javascript:void(0);";
							a.addEventListener("click", function() {gui.event.addCommand("%IF%[<bedingung>]<text>%ELSE%<text>%ENDIF%", "einst_pattern");}, false);
							a.appendChild(ctn("if..else"));
						td.appendChild(a);
					tr.appendChild(td);

				table.appendChild(tr);
			return table;
		},
		commandInsertMenuAtt : function() {
			var table = ce("table");
			var tr = ce("tr");
				var td = ce("td");
					td.style.borderLeft = "1px solid grey";
					td.colSpan = 5;
					td.align = "center";
					td.appendChild(ctn(lang.settings.toolbar.attack));
				tr.appendChild(td);
				td = ce("td");
					td.style.borderLeft = "1px solid grey";
					td.colSpan = 4;
					td.align = "center";
					td.appendChild(ctn(lang.settings.toolbar.town));
				tr.appendChild(td);
				td = ce("td");
					td.style.borderLeft = "1px solid grey";
					td.style.borderRight = "1px solid grey";
					td.colSpan = 2;
					td.align = "center";
					td.appendChild(ctn(lang.settings.toolbar.cond));
				tr.appendChild(td);
				td = ce("td");
					td.colSpan = 4;
					td.align = "center";
					td.appendChild(ctn(lang.settings.toolbar.info));
				tr.appendChild(td);
			table.appendChild(tr);
			tr = ce("tr");
			var a = ce("a");
				a.title = "Nummer van de aanvallen";
				a.href = "javascript:void(0);";
				a.addEventListener("click", function() {gui.event.addCommand("%NUMBER%", "einst_att_pattern");}, false);
					var img = ce("img");
						img.src = "data:image/jpeg;base64,R0lGODlhEAAQANUAAAAAAP///ykeK3J8cIWPgo2ViJCYipSbjZadjpeckZqgkdTLs83FrsbAsNLIr9jOtdbMtNDHsd3SuH9wU6OVeLKmjsK2nbq1q5uKaqWcjnNfRJOJfYt/cZeNg42De3htZn91cP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACIALAAAAAAQABAAAAaNwEvjISoaj5CGsHBYHI+MQoLxMAyaT1F0oJCIIlaE07hVEEUh8EAc0ha4Z3Q6HCpDju35IPQOQdpGeV8GIQQIIYCBRWkFIWuJil+OIVZ+TyEPFISHUSEIFHgiHBMHiFohExt4HgIcFBJtDyEfAhltFhkCHSIORhIOEiACFQ0YGhlZvh4TFBUYFslGzhZBADs="
				a.appendChild(img);
			tr.appendChild(cpn("td", a));
				a = ce("a");
				a.title = "Naam van de Aanval";
				a.href = "javascript:void(0);";
				a.addEventListener("click", function() {gui.event.addCommand("%NAME%", "einst_att_pattern");}, false);
					var img = ce("img");
						img.src = "data:image/jpeg;base64,R0lGODlhEAAQAOYAAAAAAP///ykeK3J8cI2ViJCYipSbjZadjpeckZqgkff39N/d0dfUx8TBtd3azujm3efl3Pr59XVxY83Kv3JuYYB6atTLs83FrsbAsKypoOvo39LIr9jOtdbMtNDHsaKcjdTPwtrWzN3SuH9wU6OVeLKmjsK2neTe0rq1q5uKas3EtMW5qKWcjvft3tN8BO6SFs2FKOG5gXNfRMRvA+V/BdiFG9embK2mncFoA4t/cfXt5PTawJeNg8phAq9mJfC0e79ZAPeMNNfJvdd0KY2De71LAcpRCOqzlL5TI6OQh7NIHrQ4CrVKJM2+uf36+YxVSLp3a6NAMJ9kW4sVCMemotrR0Kd0cd7ExNrNzf38/P39/fz8/P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFwALAAAAAAQABAAAAe/gCgYHFyFhocdGIIEBhaHhxcECBccBQONj1yRAwkiXB6WB46GmwmEhaADBw4PDxAnKz5KU4epEFpaWwo2OEZTV7UFt1pZOzBAS08fjx7DETEzRVFJFczDLTU4S1AqEsHDPy49TEIg3lwcJJYPWTovLkZQLeaGOSMGD05HLzRIQgsNKBQiIiAHiXxHggyRIoRBQBMsBPDgsoEdlSdWmoQIMUFCChksDLHDcqOKBg06QkgokcKEoQYZYsa8ceMDhUAAOw=="
				a.appendChild(img);
			tr.appendChild(cpn("td", a));
				a = ce("a");
				a.title = "Naam van de aanvaller's";
				a.href = "javascript:void(0);";
				a.addEventListener("click", function() {gui.event.addCommand("%AANVALLER%", "einst_att_pattern");}, false);
				a.innerHTML = '<span style="display: inline-block; background: url(\'graphic//bbcodes/bbcodes.png?1\') no-repeat scroll -80px 0px transparent; padding-left: 0px; padding-bottom: 0px; margin-right: 0px; margin-bottom: 0px; width: 20px; height: 20px;"> </span>';
			tr.appendChild(cpn("td", a));
				a = ce("a");
				a.title = "Dorp waarvan de aanval komt";
				a.href = "javascript:void(0);";
				a.addEventListener("click", function() {gui.event.addCommand("%FROM%", "einst_att_pattern");}, false);
				a.innerHTML = '<span style="display: inline-block; background: url(\'graphic//bbcodes/bbcodes.png?1\') no-repeat scroll -120px 0px transparent; padding-left: 0px; padding-bottom: 0px; margin-right: 0px; margin-bottom: 0px; width: 20px; height: 20px;"> </span>';
			tr.appendChild(cpn("td", a));
				a = ce("a");
				a.title = "Aankomst tijd van de aanval";
				a.href = "javascript:void(0);";
				a.addEventListener("click", function() {gui.event.addCommand("%TIME%", "einst_att_pattern");}, false);
					var img = ce("img");
						img.src = "data:image/jpeg;base64,R0lGODlhEAAQANUAAAAAAP////9SUv9cXP9dXf9eXv9fX/9gYP9hYf9iYv9jY/9kZP9mZv9nZ/9oaP9paf9qav9ra/9sbP9tbf9vb/9wcP9xcf97e/98fP9/f/+AgP+Cgv+Ghv+Hh/+Kiv+Li/+MjP+Rkf+Skv+Xl/+YmP+bm/+srP+trf+wsP/Fxf/Gxv/j4//l5f/m5v/p6f/q6v/19f/8/P/9/f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADMALAAAAAAQABAAAAZ8wJlwyFgkFMPk0HHIfEAZBEM5U3BagYBKlW1xkEMOLBsIhcgwzjDxIgdIJLeLIDy433E3YobQ3EcldxsCCSB3JBJwJCIqIAQIhm4piosqHhN9d5oBFxh8m3d7MwUuoFkuD2FjmzAdSVYsmiwcC1QNCE4gGgcOVElHBgNUQQA7"
				a.appendChild(img);
			tr.appendChild(cpn("td", a));
				a = ce("a");
				a.href = "javascript:void(0);";
				a.addEventListener("click", function() {gui.event.addCommand("%DNUMBER%", "einst_att_pattern");}, false);
				a.innerHTML = '<span style="display: inline-block; background: url(\'graphic//bbcodes/bbcodes.png?1\') no-repeat scroll -120px 0px transparent; padding-left: 0px; padding-bottom: 0px; margin-right: 0px; margin-bottom: 0px; width: 20px; height: 20px; text-align:center; color:red; font-size:large;">1</span>';
				a.title = "Dorpnummer (zo als ingelezen)";
			tr.appendChild(cpn("td", a));
				a = ce("a");
				a.href = "javascript:void(0);";
				a.addEventListener("click", function() {gui.event.addCommand("%DORP%", "einst_att_pattern");}, false);
				a.innerHTML = '<span style="display: inline-block; background: url(\'graphic//bbcodes/bbcodes.png?1\') no-repeat scroll -120px 0px transparent; padding-left: 0px; padding-bottom: 0px; margin-right: 0px; margin-bottom: 0px; width: 20px; height: 20px;"> </span>';
				a.title = "Dorpnaam en Coördinaten";
			tr.appendChild(cpn("td", a));
				a = ce("a");
				a.href = "javascript:void(0);";
				a.addEventListener("click", function() {gui.event.addCommand("%WALL%", "einst_att_pattern");}, false);
					var img = ce("img");
						img.src = "graphic/buildings/wall.png?1"
						img.title = "Muur LVL";
				a.appendChild(img);
			tr.appendChild(cpn("td", a));
				a = ce("a");
				a.href = "javascript:void(0);";
				a.addEventListener("click", function() {gui.event.addCommand("%ATTANZ%", "einst_att_pattern");}, false);
					var img = ce("img");
						img.src = "data:image/jpeg;base64,R0lGODlhEAAQANUAAAAAAP///ykeK3J8cI2ViJCYipSbjZadjpeckZqgkdTLs83FrsbAsNLIr9jOtdbMtNDHsd3SuH9wU6OVeLKmjsK2nbq1q5uKaqWcjnNfRIt/cZeNg42De3htZn91cP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACAALAAAAAAQABAAAAaLQAvDASoajw+GkGBQHI8LAmLhKAyaT1B0kIiAINaD07hNEIvggbhYPhc/aXH5cfyA4GECl16/fwsfgXSBhEZwBB9qdoaEgVYfj3x2dg4TiQcfUR8Hlk8aEh8KdgsfoIUgHAIaE14gDhcdAhhFFRgCGyANRhENER4CFAwXGbNZRREcEhMUFxXGRswVQQA7"
						img.title = "Aantal aanvallen";
				a.appendChild(img);
			tr.appendChild(cpn("td", a));
				td = ce("td");
				td.align = "center";
					a = ce("a");
					a.href = "javascript:void(0);";
					a.addEventListener("click", function() {gui.event.addCommand("%IF%[<bedingung>]<text>%ENDIF%", "einst_att_pattern");}, false);
					a.appendChild(ctn("if.."));
				td.appendChild(a);
			tr.appendChild(td);
				td = ce("td");
				td.align = "center";
					a = ce("a");
					a.href = "javascript:void(0);";
					a.addEventListener("click", function() {gui.event.addCommand("%IF%[<bedingung>]<text>%ELSE%<text>%ENDIF%", "einst_att_pattern");}, false);
					a.appendChild(ctn("if..else"));
				td.appendChild(a);
			tr.appendChild(td);
			table.appendChild(tr);
			return table;
		},
		createMainHeadBar : function () {
				var l = ce('legend');
					var t = ctn('Custom Deff-Requester ');
					var a = ce('a');
					a.href = 'javascript:void(0);';
					a.addEventListener("click", gui.event.showArrowBetter, false);
						//Arrow Up
						var au = ce('img');
						au.src = 'graphic/arrow_up_padd.png?1';
						au.id = 'arrow_up';
						au.style.display = '';

						//Arrow Down
						var ad = ce('img');
						ad.src = 'graphic/arrow_down_padd.png?1';
						ad.id = 'arrow_down';
						ad.style.display = 'none';

					a.appendChild(au);
					a.appendChild(ad);
				l.appendChild(t);
                var a = ce('a');
                    a.appendChild(ctn(version));
                    a.href = 'http://forum.tribalwars.nl/showthread.php?t=';// thread ID?
				l.appendChild(a);
                l.appendChild(a);
		    l.appendChild(ctn(" (" + loc + ")"));
			return l;
		},
		createImportExport : function (settings) {
			var div = ce("div");
				div.id = "CDR-importexport";

				var a = ce("a");
					a.appendChild(ctn("Import/Export"));
					a.href = "javascript:void(0)";
					a.addEventListener("click", gui.event.showImportExport, false);

				div.appendChild(a);
				div.appendChild(br());

					var innerDiv = ce("div");
						innerDiv.id = "importexport";
						innerDiv.style.display = "none";
						var ta = ce("textarea");
							ta.cols = "100";
							ta.id = "importexportTA";
							ta.rows = "8";
							ta.value = importExport.exportString(settings);

						var a = ce("a");
							a.appendChild(ctn("Import"));
							a.href = "javascript:void(0);";
							a.addEventListener("click", gui.event.importEvent, false);

					innerDiv.appendChild(ta);
					innerDiv.appendChild(br());
					innerDiv.appendChild(a);
				div.appendChild(innerDiv);
			return div;
		},
		createSettingsHeadBar : function () {
			var l = ce('legend');
			var t = ctn('Custom Deff-Requester: ' + lang.settingsTitle);
				var a = ce('a');
				a.href = 'javascript:void(0);';
				a.addEventListener("click", gui.event.showArrowSettings, false);
					//Arrow Up
					var au = ce('img');
					au.src = 'graphic/arrow_up_padd.png?1';
					au.id = 'einst_arrow_up';
					au.style.display = 'none';

					//Arrow Down
					var ad = ce('img');
					ad.src = 'graphic/arrow_down_padd.png?1';
					ad.id = 'einst_arrow_down';
					ad.style.display = '';

				a.appendChild(au);
				a.appendChild(ad);
			l.appendChild(t);
			l.appendChild(a);
			return l;
		},
		createMainContent : function()  {
			var div = ce("div");
			div.id = "better_message_div";
				var a = ce("a");
						a.href = "javascript:void(0);";
						a.addEventListener("click", gui.event.saveOutputString, false);
						a.title = "Slaat de uitvoer van het script op, daar deze later kan gebruikt worden voor posten.";
						a.appendChild(ctn(lang.outputSaver.save));
			div.appendChild(a);
			div.appendChild(ctn(" | "));
				var a = ce("a");
				a.href = 'javascript:void(0);';
				a.addEventListener("click", RADAU, false);
				a.appendChild(ctn(lang.radau.link));
			div.appendChild(a);
			div.appendChild(br());
				var ta = ce('textarea');
					ta.id = 'better_message';
					ta.name = 'better_message';
					ta.cols = '100';
					ta.rows = '16';
					ta.style.display = '';
			div.appendChild(ta);
			return div;
		},
		createExactSettingsContent : function (exactDeff) {
			var addInput = function(parent, val, count) {
				var geS = ctn(count + (count==1 ? ' Income:' : ' Incomes:'));
				var ge = ce('input');
				var geS2 = ctn("Def");
				ge.type = 'text';
				ge.size = '3';
				ge.id = 'einst_genauere'+count;
				ge.name = 'einst_genauere';
				if(val != null)
					ge.value = val;

				parent.appendChild(geS);
				parent.appendChild(ge);
				parent.appendChild(geS2);
			}
			var outerDiv = ce('div');
            var genauerDiv = ce('div');
			genauerDiv.id = 'einst_genauere';

			var genauerS = ce("div");
			genauerS.appendChild(ctn(lang.settings.exact));
			genauerS.style.fontWeight="bold";

			genauerDiv.appendChild(br());
			genauerDiv.appendChild(genauerS);
			genauerDiv.appendChild(ctn(lang.settings.exactInfo));

			genauerDiv.appendChild(br());
            var add = ce('a');
			add.href = 'javascript:void(0);';
			add.addEventListener("click", gui.event.addExactDeffField, false);
			add.appendChild(ctn('+'));
			genauerDiv.appendChild(add);
			genauerDiv.appendChild(br());

			if(exactDeff.length == 0) {
				addInput(genauerDiv, null, 1);
				genauerDiv.appendChild(br());
			}
			else {
				for(var i = 0; i != exactDeff.length; ++i) {
					addInput(genauerDiv, exactDeff[i], i+1);
					genauerDiv.appendChild(br());
				}
			}
			outerDiv.appendChild(genauerDiv);
			var add = ce('a');
			add.href = 'javascript:void(0);';
			add.addEventListener("click", gui.event.addExactDeffField, false);
			add.appendChild(ctn('+'));
			outerDiv.appendChild(add);
			outerDiv.appendChild(br());
			return outerDiv;
		},
		createSettingsContent : function (settings) {
			var div = ce('div');
			div.id = 'einst';
			div.style.display = 'none';

			//++++++++++++++++++++
			//Oberer Teil des GUIs
			//++++++++++++++++++++

			var etas = ce("b");
			etas.appendChild(ctn(lang.settings.formatString));
			var eta = ce('textarea');
			eta.id = 'einst_pattern';
			eta.name = 'einst_pattern';
			eta.cols = '100';
			eta.rows = '8';
			eta.value = settings.verPattern;

			var attPatternSettingStr = ce("b");
			attPatternSettingStr.appendChild(ctn(lang.settings.formatStringAtt));
			var attPatternSettingTA = ce('textarea');
			attPatternSettingTA.id = 'einst_att_pattern';
			attPatternSettingTA.name = 'einst_att_pattern';
			attPatternSettingTA.cols = '100';
			attPatternSettingTA.rows = '2';
			attPatternSettingTA.value = settings.attPattern;

			var tfgds = ctn(lang.settings.baseDeff);
			var tfgd = ce('input');
			tfgd.type = 'text';
			tfgd.size = '30';
			tfgd.id = 'einst_grunddeff';
			tfgd.value = settings.deff.baseDeff;

			var tfdpas = ctn(lang.settings.deffsPerAtt);
			var tfdpa = ce('input');
			tfdpa.type = 'text';
			tfdpa.size = '30';
			tfdpa.id = 'einst_perangdeff';
			tfdpa.value = settings.deff.perAttDeff;

			tfpns = ctn(lang.settings.normalPoints);
			tfpn = ce('input');
			tfpn.type = 'text';
			tfpn.size = '30';
			tfpn.id = 'einst_pointsnor';
			tfpn.value = settings.points.normal;

			tfpcs = ctn(lang.settings.kavPoints);
			tfpc = ce('input');
			tfpc.type = 'text';
			tfpc.size = '30';
			tfpc.id = 'einst_pointscav';
			tfpc.value = settings.points.cav;

			var tfpbs = ctn(lang.settings.archerPoints);
			var tfpb = ce('input');
			tfpb.type = 'text';
			tfpb.size = '30';
			tfpb.id = 'einst_pointsbog';
			tfpb.value = settings.points.bog;

			submit = ce('a');
			submit.href = 'javascript:void(0)';
			submit.addEventListener("click", gui.event.saveSettings, false);
			submit.appendChild(ctn(lang.settings.saveLink));

			clear = ce('a');
			clear.href = 'javascript:void(0);';
			clear.addEventListener("click", gui.event.deleteSettings, false);
			clear.appendChild(ctn(lang.settings.deleteLink));

			div.appendChild(br());
			div.appendChild(etas);
			div.appendChild(br());
			div.appendChild(gui.create.commandInsertMenuMain());
			div.appendChild(eta);
			div.appendChild(br());
			div.appendChild(br());
			div.appendChild(attPatternSettingStr);
			div.appendChild(gui.create.commandInsertMenuAtt());
			div.appendChild(attPatternSettingTA);
			div.appendChild(br());
			div.appendChild(br());

			//+++++++++++++++++++++++++++++++
			//unterer Teil des GUIs (Tabelle)
			//+++++++++++++++++++++++++++++++
			//Erste Zeile
			var table = ce('table');
				var tr = ce('tr');
					var td = ce('td');
						td.appendChild(submit);
				tr.appendChild(td);
					td = ce('td');
				tr.appendChild(td);
					td = ce('td');
					td.appendChild(clear);
				tr.appendChild(td);
			table.appendChild(tr);
			//Zweite Zeile
				tr = ce('tr');
					td = ce('td');
					td.colSpan = 3;
					td.appendChild(gui.create.createImportExport(settings));
					td.appendChild(br());
				tr.appendChild(td);
			table.appendChild(tr);
				tr = ce('tr');
					td = ce('td');
				tr.appendChild(td);
					td = ce('td');
						center = ce('center');
						center.appendChild(ctn(lang.settings.deffNumberTitle));
						center.style.fontWeight="bold";
					td.appendChild(center);
				tr.appendChild(td);
			table.appendChild(tr);
			//Dritte Zeile
				tr = ce('tr');
					td = ce('td');
					td.appendChild(tfgds);
					td.appendChild(br());
					td.appendChild(tfgd);
				tr.appendChild(td);
					td = ce('td');
					td.appendChild(tfdpas);
					td.appendChild(br());
					td.appendChild(tfdpa);
					td.appendChild(br());
				tr.appendChild(td);
			table.appendChild(tr);
			//Vierte Zeile
				tr = ce('tr');
					td = ce('td');
				tr.appendChild(td);
					td = ce('td');
						center = ce('center');
						center.appendChild(ctn(lang.settings.deffPointsTitle + " ("));
                            a = ce('a');
					   a.addEventListener("click", function() {gui.event.showDeffPointCalc(settings);}, false);
					   a.href = "javascript:void(0)";
                            a.appendChild(ctn(lang.settings.deffPointsInfo));
                        center.appendChild(a);
                        center.appendChild(ctn(')'));
						center.style.fontWeight="bold";
					td.appendChild(center);
				tr.appendChild(td);
			table.appendChild(tr);
			//Fünfte Zeile
				tr = ce('tr');
					td = ce('td');
					td.appendChild(tfpns);
					td.appendChild(br());
					td.appendChild(tfpn);
				tr.appendChild(td);
					td = ce('td');
					td.appendChild(tfpcs);
					td.appendChild(br());
					td.appendChild(tfpc);
					td.appendChild(br());
				tr.appendChild(td);
					td = ce('td');
					td.appendChild(tfpbs);
					td.appendChild(br());
					td.appendChild(tfpb);
					td.appendChild(br());
				tr.appendChild(td);
			table.appendChild(tr);
			//Sechste Zeile
				//Exakte Einstellungen
				tr = ce('tr');
					td = ce('td');
					td.colSpan="2";
						center = ce('center');
						center.appendChild(gui.create.createExactSettingsContent(settings.deff.exactDeff));
						center.appendChild(br());
						center.appendChild(br());
					td.appendChild(center);
				tr.appendChild(td);
				//Weitere Einstellungen
					td = ce('td');
					td.vAlign = "top";
						var radioString = ce("div");
						radioString.appendChild(br());
						radioString.appendChild(ctn(lang.settings.visibility.title));
						radioString.style.fontWeight="bold";
						td.appendChild(radioString);

						var radio = ce('input');
						radio.type = "radio";
						radio.name = "einst_att_disp";
						radio.value = lang.settings.visibility.showAll;
						if(settings.attDisp == 0)
							radio.checked = "checked";
					td.appendChild(radio);
					td.appendChild(ctn(lang.settings.visibility.showAll));
					td.appendChild(br());
						radio = ce('input');
						radio.type = "radio";
						radio.name = "einst_att_disp";
						radio.value = lang.settings.visibility.showFirst;
						if(settings.attDisp == 1)
							radio.checked = "checked";
					td.appendChild(radio);
					td.appendChild(ctn(lang.settings.visibility.showFirst));
					td.appendChild(br());
						radio = ce('input');
						radio.type = "radio";
						radio.name = "einst_att_disp";
						radio.value = lang.settings.visibility.showFirstLast;
						if(settings.attDisp == 2)
							radio.checked = "checked";
					td.appendChild(radio);
					td.appendChild(ctn(lang.settings.visibility.showFirstLast));
					td.appendChild(br());

					//Walleinst
					td.appendChild(br());
						var radioString = ce("div");
						radioString.appendChild(ctn(lang.settings.misc));
						radioString.style.fontWeight="bold";
						td.appendChild(radioString);

						var chkbox = ce('input');
						chkbox.type = "checkbox";
						chkbox.id = "einst_include_wall";
						chkbox.value = lang.settings.includeWall;
						if(settings.includeWall == true)
							chkbox.checked = "checked";
					td.appendChild(chkbox);
					td.appendChild(ctn(lang.settings.includeWall));
					td.appendChild(br());
						var chkbox = ce('input');
						chkbox.type = "checkbox";
						chkbox.id = "einst_neededDeffP1";
						chkbox.value = lang.settings.ndeffp1;
						if(settings.neededDeffP1 == true)
							chkbox.checked = "checked";
					td.appendChild(chkbox);
					td.appendChild(ctn(lang.settings.ndeffp1));
					td.appendChild(br());
						var chkbox = ce('input');
						chkbox.type = "checkbox";
						chkbox.id = "einst_roundDeffs";
						chkbox.value = lang.settings.roundDeff;
						if(settings.roundDeffs == true)
							chkbox.checked = "checked";
					td.appendChild(chkbox);
					td.appendChild(ctn(lang.settings.roundDeff));
					td.appendChild(br());
						divInt = ce('div');
						divInt.style.textIndent = "30px";
							var chkbox = ce('input');
							chkbox.type = "checkbox";
							chkbox.id = "einst_roundUp";
							chkbox.value = lang.settings.roundDeffUp;
							if(settings.roundUp == true)
								chkbox.checked = "checked";
						divInt.appendChild(chkbox);
						divInt.appendChild(ctn(lang.settings.roundDeffUp));
					td.appendChild(divInt);
					td.appendChild(br());
				tr.appendChild(td);
			table.appendChild(tr);
			div.appendChild(table);
			return div;
		},
		createMain : function() {
			//Head
			var fs = ce('fieldset');
			fs.className = 'collapsible';
			fs.appendChild(gui.create.createMainHeadBar());

			//Content
			fs.appendChild(gui.create.createMainContent());
			return fs;
		},
		createSettings : function (settings) {
			//Head
			var fs = ce('fieldset');
			fs.className = 'collapsible';
			fs.id = "cdr_settings";

			fs.appendChild(gui.create.createSettingsHeadBar());

			//Content

			return fs;
		},
		createNewMainContent : function(count) {
			var insert = $("better_message").parentNode;
			ta = ce('textarea');
			ta.id = 'better_message' + count;
			ta.name = 'better_message';
			ta.cols = '100';
			ta.rows = '16';
			ta.style.display = '';
			insert.appendChild(ta);
			return ta;
		},
		createPasteLink : function() {
			var loader = new Loader("custom_deff_requester");
			var str = loader.loadSavedString();
			var span = ce("span");
			span.appendChild(ctn("CDR: "));
			if(str) {
				var c = parseInt(str[0]);;
				var a = ce("a");
					a.id = "cdr_pastelink";
					a.href = "javascript:void(0);";
					a.addEventListener("click", function() {gui.event.pasteEvent("message", str, c)}, false);
					a.title = "Plak de eerder opgeslagen uitvoer";
					a.appendChild(ctn(lang.outputSaver.insert));
				span.appendChild(a);
				span.appendChild(ctn(" ("));
				var count = ce("span");
					count.id ="cdr_counter";
					count.appendChild(ctn(c));
				span.appendChild(count);
				span.appendChild(ctn(" " + lang.outputSaver.of + " " + parseInt(str.length-1) + ")"));
			}
			else {
				span.appendChild(ctn(lang.outputSaver.insert + " " +lang.outputSaver.unsaved));
			}
			return span;
		}
	}
};

//Pattern functions

var pattern = {
	execTroupRegExps : function (dorf) {
		var speer, schwert, axt, spy, lkav, skav, ramm, katta, ag, bogi, bbogi;
		speer = lang.regExp.truppen.speer.exec(dorf);
		schwert = lang.regExp.truppen.schwert.exec(dorf);
		axt = lang.regExp.truppen.axt.exec(dorf);
		spy = lang.regExp.truppen.spy.exec(dorf);
		lkav = lang.regExp.truppen.lkav.exec(dorf);
		skav = lang.regExp.truppen.skav.exec(dorf);
		ramm = lang.regExp.truppen.ramm.exec(dorf);
		katta = lang.regExp.truppen.katta.exec(dorf);
		ag = lang.regExp.truppen.ag.exec(dorf);
		bogi = lang.regExp.truppen.bogi.exec(dorf);
		bbogi = lang.regExp.truppen.bbogi.exec(dorf);
		var troups = {
			speer : (speer != null ? speer[1] : 0),
			schwert : (schwert != null ? schwert[1] : 0),
			axt : (axt != null ? axt[1] : 0),
			spy : (spy != null ? spy[1] : 0),
			lkav : (lkav != null ? lkav[1] : 0),
			skav : (skav != null ? skav[1] : 0),
			ramm : (ramm != null ? ramm[1] : 0),
			katta : (katta != null ? katta[1] : 0),
			ag : (ag != null ? ag[1] : 0),
			bogi : (bogi != null ? bogi[1] : 0),
			bbogi : (bbogi != null ? bbogi[1] : 0)
		}
		return troups;
	},
	execAttRegExps : function (attack) {
		var time = lang.regExp.angriffe.time.exec(attack);
		if(time == null)
			time = lang.regExp.angriffe.timeWithoutMillis.exec(attack)
		attack = {
			name : lang.regExp.angriffe.name.exec(attack),
			angreifer : lang.regExp.angriffe.attacker.exec(attack),
			from : lang.regExp.angriffe.from.exec(attack),
			time : time
		}
		return attack;
	}
};

var parser = {
	cond : {
		trim : function(str) {
		//By timOkills. Diese Funktion ist Beerware (http://de.wikipedia.org/wiki/Beerware)
		var startWithText = str.charAt(0)=="\"";
		var splittedStr = str.split("\"");
		for(var i=0;i<splittedStr.length;++i)
			if(i%2 == (startWithText?1:0))

			while(splittedStr[i].search(/\s/)!=-1)
				splittedStr[i] = splittedStr[i].replace(/\s/, "");
			return splittedStr.join("");
		},
		parseCondition : function(cond) {
			if(cond.search("<=") != -1) {
				var opPos = cond.search("<=");
				var op1 = parser.cond.parseOperand(cond.substring(0, opPos));
				var op2 = parser.cond.parseOperand(cond.substring(opPos+2));
				return op1 <= op2;
			}
			else if(cond.search(">=") != -1) {
				var opPos = cond.search(">=");
				var op1 = parser.cond.parseOperand(cond.substring(0, opPos));
				var op2 = parser.cond.parseOperand(cond.substring(opPos+2));
				return op1 >= op2;
			}
			else if(cond.search("==") != -1) {
				var opPos = cond.search("==");
				var op1 = parser.cond.parseOperand(cond.substring(0, opPos));
				var op2 = parser.cond.parseOperand(cond.substring(opPos+2));
				return op1 == op2;
			}
			else if(cond.search("!=") != -1) {
				var opPos = cond.search("!=");
				var op1 = parser.cond.parseOperand(cond.substring(0, opPos));
				var op2 = parser.cond.parseOperand(cond.substring(opPos+2));
				return op1 != op2;
			}
			else if(cond.search("<") != -1) {
				var opPos = cond.search("<");
				var op1 = parser.cond.parseOperand(cond.substring(0, opPos));
				var op2 = parser.cond.parseOperand(cond.substring(opPos+1));
				return op1 < op2;
			}
			else if(cond.search(">") != -1) {
				var opPos = cond.search(">");
				var op1 = parser.cond.parseOperand(cond.substring(0, opPos));
				var op2 = parser.cond.parseOperand(cond.substring(opPos+1));
				return op1 > op2;
			}
			else if(cond.search("/R0") != -1) {
				var opPos = cond.search("/R0");
				var op1 = parser.cond.parseOperand(cond.substring(0, opPos));
				var op2 = parser.cond.parseOperand(cond.substring(opPos+3));
				return op1 % op2 == 0;
			}
			else alertBox(ctn(lang.err.noOperand), "cdr_syntax-err", false);
		},
		parseOperand : function(operand){
			if(operand.match(/%\D+%/)) {
				switch (operand) {
					case "%DORP%":
						return data.read.dorf;
					case "%WALL%":
						return data.read.wall;
					case "%SPEER%":
						return data.read.troups.speer;
					case "%ZWAARD%":
						return data.read.troups.schwert;
					case "%BIJL%":
						return data.read.troups.axt;
					case "%SPY%":
						return data.read.troups.spy;
					case "%LC%":
						return data.read.troups.lkav;
					case "%ZC%":
						return data.read.troups.skav;
					case "%RAM%":
						return data.read.troups.ramm;
					case "%KATTA%":
						return data.read.troups.katta;
					case "%EDEL%":
						return data.read.troups.ag;
					case "%BOGI%":
						return data.read.troups.bogi;
					case "%BBOGI%":
						return data.read.troups.bbogi;
					case "%POINTSN%":
						return data.calc.points.normal.toFixed(0);
					case "%POINTSC%":
						return data.calc.points.cav.toFixed(0);
					case "%POINTSB%":
						return data.calc.points.archer.toFixed(0);
					case "%NPOINTSN%":
						return data.calc.neededPoints.normal.toFixed(0);
					case "%NPOINTSC%":
						return data.calc.neededPoints.cav.toFixed(0);
					case "%NPOINTSB%":
						return data.calc.neededPoints.archer.toFixed(0);
					case "%WDEFFS%":
						return data.calc.wantedDeffs.toFixed(2);
					case "%DEFFS%":
						return data.calc.currDeffs.toFixed(2);
					case "%NDEFFS%":
						return data.calc.neededDeffs.toFixed(2);
					case "%ATTANZ%":
						return data.read.attackAnz;
					case "%DNUMBER%":
						return data.read.dorfNumber;
					case "%DANZ%":
						return data.dorfAnz;
					default:
						alertBox(ctn(lang.err.unknownVar), "cdr_syntax-err", false);
						return -1;
				}
			} else if (operand.match(/\d+/)) {
				return parseInt(operand);
			} else
				return operand;
		},
		parseIfs: function(data) {
			var pattern = data.settings.verPattern;
			var ifs = pattern.split("%IF%");
			var result = ifs[0];
			var elsePos, endifPos, condEndPos, body, cond, condRes; //Condition Result
			for(var i = 1; i != ifs.length; ++i) {
                elsePos = parser.cond.getElsePos(ifs[i]);
                endifPos = parser.cond.getEndifPos(ifs[i]);
                body = ifs[i].substring(0, endifPos);
                condEndPos =  parser.cond.getConditionEndPos(body);
                cond = parser.cond.trim(body.substring(1, condEndPos));
                if(body != "" && cond != "") {
                    condRes = parser.cond.parseCondition(cond);
                    if(!condRes) { //Result FALSE
                        if(elsePos != -1) {
                            result += ifs[i].substring(elsePos + "%ELSE%".length).replace(/%ENDIF%/, "");
                        }
                        else {
                            result += ifs[i].substring(endifPos + "%ENDIF%".length);
                        }
                    } else { //Result TRUE
                        if(elsePos != -1) {
                            result += ifs[i].substring(condEndPos+1, elsePos);
                            result += ifs[i].substring(endifPos + "%ENDIF%".length);
                        }
                        else {
                            result += ifs[i].substring(condEndPos+1).replace(/%ENDIF%/, "");
                        }
                    }
                }
			}
			return result;
		},
		parseIfsAtt: function(attacks, attData) {
			var pattern = attacks;
			var ifs = pattern.split("%IF%");
			var result = ifs[0];
			var elsePos, endifPos, condEndPos, body, cond, condRes; //Condition Result
			for(var i = 1; i != ifs.length; ++i) {
				elsePos = parser.cond.getElsePos(ifs[i]);
				endifPos = parser.cond.getEndifPos(ifs[i]);
				body = ifs[i].substring(0, endifPos);
				condEndPos =  parser.cond.getConditionEndPos(body);
				cond = parser.cond.trim(body.substring(1, condEndPos));
				if(body != "" && cond != "") {
					condRes = parser.cond.parseConditionAtt(cond, attData);
					if(!condRes) { //Result FALSE
						if(elsePos != -1) {
							result += ifs[i].substring(elsePos + "%ELSE%".length).replace(/%ENDIF%/, "");
						}
						else {
							result += ifs[i].substring(endifPos + "%ENDIF%".length);
						}
					} else { //Result TRUE
						if(elsePos != -1) {
							result += ifs[i].substring(condEndPos+1, elsePos);
							result += ifs[i].substring(endifPos + "%ENDIF%".length);
						}
						else {
							result += ifs[i].substring(condEndPos+1).replace(/%ENDIF%/, "");
						}
					}
				}
			}
			return result;
		},
		parseConditionAtt : function(cond, attData) {
			if(cond.search("<=") != -1) {
				var opPos = cond.search("<=");
				var op1 = parser.cond.parseOperandAtt(cond.substring(0, opPos), attData);
				var op2 = parser.cond.parseOperandAtt(cond.substring(opPos+2), attData);
				return op1 <= op2;
			}
			else if(cond.search(">=") != -1) {
				var opPos = cond.search(">=");
				var op1 = parser.cond.parseOperandAtt(cond.substring(0, opPos), attData);
				var op2 = parser.cond.parseOperandAtt(cond.substring(opPos+2), attData);
				return op1 >= op2;
			}
			else if(cond.search("==") != -1) {
				var opPos = cond.search("==");
				var op1 = parser.cond.parseOperandAtt(cond.substring(0, opPos), attData);
				var op2 = parser.cond.parseOperandAtt(cond.substring(opPos+2), attData);
				return op1 == op2;
			}
			else if(cond.search("!=") != -1) {
				var opPos = cond.search("!=");
				var op1 = parser.cond.parseOperandAtt(cond.substring(0, opPos), attData);
				var op2 = parser.cond.parseOperandAtt(cond.substring(opPos+2), attData);
				return op1 != op2;
			}
			else if(cond.search("<") != -1) {
				var opPos = cond.search("<");
				var op1 = parser.cond.parseOperandAtt(cond.substring(0, opPos), attData);
				var op2 = parser.cond.parseOperandAtt(cond.substring(opPos+1), attData);
				return op1 < op2;
			}
			else if(cond.search(">") != -1) {
				var opPos = cond.search(">");
				var op1 = parser.cond.parseOperandAtt(cond.substring(0, opPos), attData);
				var op2 = parser.cond.parseOperandAtt(cond.substring(opPos+1), attData);
				return op1 > op2;
			}
			else if(cond.search("/R0") != -1) {
				var opPos = cond.search("/R0");
				var op1 = parser.cond.parseOperandAtt(cond.substring(0, opPos), attData);
				var op2 = parser.cond.parseOperandAtt(cond.substring(opPos+3), attData);
				return op1 % op2 == 0;
			}
			else alertBox(ctn(lang.err.noOperand), "cdr_syntax-err", false);
			return false;
		},
		parseOperandAtt : function(operand, attData){
			if(operand.match(/%\D+%/)) {
				switch (operand) {
					case "%NUMBER%":
						return attData.number;
					case "%NAME%":
						return (attData.name != null ? attData.name[1] : "");
					case "%AANVALLER%":
						return attData.angreifer[1];
					case "%FROM%":
						return attData.from[1];
					case "%TIME%":
						return attData.time[1];
					case "%DORP%":
						return data.read.dorf;
					case "%WALL%":
						return data.read.wall;
					case "%SPEER%":
						return data.read.troups.speer;
					case "%ZWAARD%":
						return data.read.troups.schwert;
					case "%BIJL%":
						return data.read.troups.axt;
					case "%SPY%":
						return data.read.troups.spy;
					case "%LC%":
						return data.read.troups.lkav;
					case "%ZC%":
						return data.read.troups.skav;
					case "%RAM%":
						return data.read.troups.ramm;
					case "%KATTA%":
						return data.read.troups.katta;
					case "%EDEL%":
						return data.read.troups.ag;
					case "%BOGI%":
						return data.read.troups.bogi;
					case "%BBOGI%":
						return data.read.troups.bbogi;
					case "%POINTSN%":
						return data.calc.points.normal.toFixed(0);
					case "%POINTSC%":
						return data.calc.points.cav.toFixed(0);
					case "%POINTSB%":
						return data.calc.points.archer.toFixed(0);
					case "%NPOINTSN%":
						return data.calc.neededPoints.normal.toFixed(0);
					case "%NPOINTSC%":
						return data.calc.neededPoints.cav.toFixed(0);
					case "%NPOINTSB%":
						return data.calc.neededPoints.archer.toFixed(0);
					case "%WDEFFS%":
						return data.calc.wantedDeffs.toFixed(2);
					case "%DEFFS%":
						return data.calc.currDeffs.toFixed(2);
					case "%NDEFFS%":
						return data.calc.neededDeffs.toFixed(2);
					case "%ATTANZ%":
						return data.read.attackAnz;
					case "%DNUMBER%":
						return data.read.dorfNumber;
					case "%DANZ%":
						return data.dorfAnz;
					default:
						alertBox(ctn(lang.err.unknownVar), "cdr_syntax-err", false);
						return -1;
				}
			} else if (operand.match(/\d+/)) {
				return parseInt(operand);
			} else
				return operand;
		},
		getConditionEndPos : function(ifstring) {
			if(ifstring.charAt(0) == '[') {
				var i = 1;
				while(ifstring.charAt(i) != ']' && i != ifstring.length)
					++i;
				return i;
			}
			else {
				alertBox(ctn(lang.err.noCondition), "cdr_syntax-err", false);
				return 0;
			}
		},
		getEndifPos : function(ifstring) {
			var endifPos = ifstring.search(/%ENDIF%/); //Nicht definiert was passiert wenn es mehr als ein ENDIF gibt...
			if(endifPos != -1) {
				return endifPos;
			}
			else {
				alertBox(ctn(lang.err.noEndIf), "cdr_syntax-err", false);
				return -1;
			}
		},
		getElsePos : function(ifstring) {
			return ifstring.search(/%ELSE%/);
		}
	},
	parseVerPattern : function(data, patternbuf) {
		patternbuf = patternbuf.replace(/%DORP%/ig, data.read.dorf);
		patternbuf = patternbuf.replace(/%WALL%/ig, data.read.wall);
		patternbuf = patternbuf.replace(/%SPEER%/ig, data.read.troups.speer);
		patternbuf = patternbuf.replace(/%ZWAARD%/ig, data.read.troups.schwert);
		patternbuf = patternbuf.replace(/%BIJL%/ig, data.read.troups.axt);
		patternbuf = patternbuf.replace(/%SPY%/ig, data.read.troups.spy);
		patternbuf = patternbuf.replace(/%LC%/ig, data.read.troups.lkav);
		patternbuf = patternbuf.replace(/%ZC%/ig, data.read.troups.skav);
		patternbuf = patternbuf.replace(/%RAM%/ig, data.read.troups.ramm);
		patternbuf = patternbuf.replace(/%KATTA%/ig, data.read.troups.katta);
		patternbuf = patternbuf.replace(/%EDEL%/ig, data.read.troups.ag);
		patternbuf = patternbuf.replace(/%BOGI%/ig, data.read.troups.bogi);
		patternbuf = patternbuf.replace(/%BBOGI%/ig, data.read.troups.bbogi);
		patternbuf = patternbuf.replace(/%POINTSN%/ig, data.calc.points.normal.toFixed(0));
		patternbuf = patternbuf.replace(/%POINTSC%/ig, data.calc.points.cav.toFixed(0));
		patternbuf = patternbuf.replace(/%POINTSB%/ig, data.calc.points.archer.toFixed(0));
		patternbuf = patternbuf.replace(/%NPOINTSN%/ig, data.calc.neededPoints.normal.toFixed(0));
		patternbuf = patternbuf.replace(/%NPOINTSC%/ig, data.calc.neededPoints.cav.toFixed(0));
		patternbuf = patternbuf.replace(/%NPOINTSB%/ig, data.calc.neededPoints.archer.toFixed(0));
		patternbuf = patternbuf.replace(/%WDEFFS%/ig, (data.settings.roundDeffs ? ( data.settings.roundUp ? roundP1(data.calc.wantedDeffs) : round(data.calc.wantedDeffs) ) : data.calc.wantedDeffs.toFixed(2)));
		patternbuf = patternbuf.replace(/%DEFFS%/ig, (data.settings.roundDeffs ? ( data.settings.roundUp ? roundP1(data.calc.currDeffs) : round(data.calc.currDeffs) ) : data.calc.wantedDeffs.toFixed(2)));
		patternbuf = patternbuf.replace(/%NDEFFS%/ig, (data.settings.roundDeffs ? ( data.settings.roundUp ? roundP1(data.calc.neededDeffs) : round(data.calc.neededDeffs) ) : data.calc.neededDeffs.toFixed(2)));
		patternbuf = patternbuf.replace(/%ATTANZ%/ig, data.read.attackAnz);
		patternbuf = patternbuf.replace(/%DNUMBER%/ig, data.read.dorfNumber);
		patternbuf = patternbuf.replace(/%DANZ%/ig, data.dorfAnz);
		return patternbuf;
	},
	parseAttacks : function(attacks, deffText) {
		var ins = deffText.search(/%ATTACKS%\(.{1,10}\)/i);
		// +++++++++++
		// Fall-Back Code. To be removed in future versions.
		// +++++++++++
		if(ins == -1) {
			if(deffText.search(/%ATTACKS%/i) != -1) {
			return deffText.replace(/%ATTACKS%/ig, parser.parseAttPattern(attacks, data.settings.attDisp));
			}
			else return deffText;
		}
		// ++++++++++++
		// Fall-Back Code End
		// ++++++++++++

		while(ins != -1) {
			var ret = "";
			var insEnd = deffText.substr(ins+10, 10).search(/\)/);
			var option = parser.cond.trim(deffText.substr(ins+10, insEnd));
			if(option == "ALL") ret = parser.parseAttPattern(attacks, 0);
			else if(option == "FIRST") ret = parser.parseAttPattern(attacks, 1);
			else if(option == "FIRSTLAST") ret = parser.parseAttPattern(attacks, 2);
			else alertBox(ctn(lang.err.attInvalidPara + " " + option + " " + lang.err.attInvalidParaInfo), "cdr_syntax-err", false);

			deffText = deffText.substring(0,ins) + ret + deffText.substring(ins+insEnd+11);
			ins = deffText.search(/%ATTACKS%\(.{1,10}\)/i);
		}
		return deffText;
	},
	parseAttPattern : function(attacks, option) {
		var attackString = "";
		var attPatternBuf;
		var att;
		if(attacks.length != 0) {
			if(option == 0)  //Every attack
				cond = attacks.length;
			else
				cond = 2;       //First only

			for(var j = 1; j!=cond; ++j) {
				//RegExp Executions
				att = pattern.execAttRegExps(attacks[j]);
				att.number = j;

				attPatternBuf = parser.cond.parseIfsAtt(data.settings.attPattern, att);
				attPatternBuf = attPatternBuf.replace(/%NAME%/ig, (att.name != null ? att.name[1] : ""));
				attPatternBuf = attPatternBuf.replace(/%AANVALLER%/ig, att.angreifer[1]);
				attPatternBuf = attPatternBuf.replace(/%FROM%/ig, att.from[1]);
				attPatternBuf = attPatternBuf.replace(/%TIME%/ig, att.time[1]);
				attPatternBuf = attPatternBuf.replace(/%NUMBER%/ig, j);

				attackString += attPatternBuf;
			}
			if(option == 2 && attacks.length > 2) { //First & Last
				//RegExp Executions
				att = pattern.execAttRegExps(attacks[attacks.length-1]);

				attPatternBuf = data.settings.attPattern;
				attPatternBuf = attPatternBuf.replace(/%NAME%/ig, (att.name != null ? att.name[1] : ""));
				attPatternBuf = attPatternBuf.replace(/%AANVALLER%/ig, att.angreifer[1]);
				attPatternBuf = attPatternBuf.replace(/%FROM%/ig, att.from[1]);
				attPatternBuf = attPatternBuf.replace(/%TIME%/ig, att.time[1]);
				attPatternBuf = attPatternBuf.replace(/%NUMBER%/ig, attacks.length-1);

				attackString += attPatternBuf;

			}
		} else alertBox(ctn("Unexpected error: There is no attack"), "cdr_unexpected", false);
		return attackString;
	}
};

var logic = {
	calcValues : function(read, settings) {
	//Berechnungen
		//Wall Faktor Formel: 1,03699^LEVEL * Deff-Wert = Absoluter-Deff-Wert
		var wallFactor = Math.pow(1.03699, read.wall);
		var fullWallFactor = Math.pow(1.03699, 20);
		var troups = read.troups;
		var calc = {
			points : {
				normal : null,
				cav : null,
				archer : null
			},
			neededPoints : {
				normal : null,
				cav : null,
				archer : null
			},
			wantedDeffs : null,
			currDeffs : null,
			neededDeffs : null
		}

		calc.points.normal = troups.speer*settings.unit.speer.normal +
					 troups.schwert*settings.unit.schwert.normal +
					 troups.skav*settings.unit.skav.normal +
					 troups.bogi*settings.unit.bogi.normal +
					 troups.bbogi*settings.unit.bbogi.normal;
					 
		calc.points.cav = troups.speer*settings.unit.speer.cav +
					troups.schwert*settings.unit.schwert.cav +
					troups.skav*settings.unit.skav.cav +
					troups.bogi*settings.unit.bogi.cav +
					troups.bbogi*settings.unit.bbogi.cav;
		if(settings.points.bog != 0)
			calc.points.archer = troups.speer*settings.unit.speer.bog +
						troups.schwert*settings.unit.schwert.bog +
						troups.skav*settings.unit.skav.bog +
						troups.bogi*settings.unit.bogi.bog +
						troups.bbogi*settings.unit.bbogi.bog;
		else calc.points.archer = 0;

		if(settings.includeWall) {
			calc.points.normal *= wallFactor;
			calc.points.cav *= wallFactor;
			calc.points.archer *= wallFactor;
		}

		if(settings.deff.exactDeff.length != 0 &&
			read.attackAnz <= settings.deff.exactDeff.length &&
			settings.deff.exactDeff[read.attackAnz - 1] != ""){
				calc.wantedDeffs = parseInt(settings.deff.exactDeff[read.attackAnz - 1]);
		}
		else {
			calc.wantedDeffs = parseInt(settings.deff.baseDeff) + settings.deff.perAttDeff*read.attackAnz;
		}

		if(settings.includeWall) {
			calc.wantedDeffs *=  fullWallFactor;
		}

		calc.neededPoints.normal = calc.wantedDeffs*settings.points.normal - calc.points.normal;
		calc.neededPoints.cav = calc.wantedDeffs*settings.points.cav - calc.points.normal;
		if(settings.points.bog != 0) calc.neededPoints.archer = calc.wantedDeffs*settings.points.bog - calc.points.archer;
		else calc.neededPoints.archer = 0;

		calc.currDeffs = (calc.points.normal/settings.points.normal + calc.points.cav/settings.points.cav +
					(settings.points.bog != 0 ? calc.points.archer/settings.points.bog : 0))
					/(settings.points.bog != 0 ? 3 : 2);

		calc.neededDeffs = (calc.neededPoints.normal/settings.points.normal +
						calc.neededPoints.cav/settings.points.cav +
						(settings.points.bog != 0 ? calc.neededPoints.archer/settings.points.bog : 0))
						/(settings.points.bog != 0 ? 3 : 2);
		if(settings.includeWall) {
			calc.neededDeffs /= wallFactor;
			calc.currDeffs /= wallFactor;
			calc.wantedDeffs /= wallFactor;
		}
		return calc;
	}
};

	//Other functions

	function getInput() {
		var val = mes.value; //Text aus dem "Erweitert" Feld.
		val = val.replace(/\n/g, ''); //Umbrüche entfernen
		return val;
	}
	function getDorfCoord(dorfString) {
		return dorfString.substring(0, dorfer[i].indexOf("[/coord]")) + "[/coord]";
	}
	function round(integer) {
		var round = Math.round(integer);

		if(round > integer)
			return round + "-";
		else if(round < integer)
			return round + "+";
		else
			return round;
	}
	function roundP1(integer) {
		return Math.floor(integer + 0.99);
	}

	//Normaler Modus
	if(d.location.href.match(/game\.php.*screen=reqdef.*/) != null) {
        var lang = languages[loc];
		gui.hideEasyMessage();
		var loader = new Loader("custom_deff_requester");
		data = {
			settings : {
				verPattern : loader.loadVerPattern(),
				attPattern : loader.loadAttPattern(),
				unit : loader.loadUnitSettings(),
				points : loader.loadPointSettings(),
				deff : loader.loadDeffSettings(),
				attDisp : loader.loadAttDispSettings(),
				includeWall : loader.loadIncludeWall(),
				neededDeffP1 : loader.loadNeededDeffP1(),
				roundDeffs : loader.loadRoundDeffs(),
				roundUp : loader.loadRoundUp(),
			},
			dorfAnz : null,
			read : {
				dorf : null,
				wall : null,
				troups : null,
				attackAnz : null,
				dorfNumber : null
			},
			calc : null
		};
		var mes = $('message');
		if(mes != null) {
			//DISPLAY STUFF
				var form = mes.parentNode.parentNode;
				//Main
					form.appendChild(gui.create.createMain());
				//Einstellungen
					form.appendChild(gui.create.createSettings(data.settings));
			//END DISPLAY STUFF

			//BACKEND STUFF
			if(mes.value == lang.emptyMessage)
				$("better_message").value = mes.value;
			else {
				var val = getInput();
				//Variabeln
					var output = $("better_message");
					var deffText; //Schreibbuffer, zum kopieren des Pattern und ersetzen der Variabeln durch Werte
					var bracketCount = 0; //Anzahl an "[" im Formatierungsstring
					var inputCount = 1; //Anzahl an erzeugten InputFields

				var dorfer = val.split(lang.regExp.villTitle);	//Alle Dörfer
				data.dorfAnz = dorfer.length - 1;
				var attacks;	//Alle Angriffe auf ein Dorf
				var attackString;
				//äußere Dörferschleife
				for(var i = 1; i != dorfer.length; ++i) {
					if(lang.regExp.wall.exec(dorfer[i])) { //Dorf ist da?
						data.read.dorfNumber = i;

						data.read.wall = lang.regExp.wall.exec(dorfer[i])[1];
						//Dorf
						data.read.dorf = getDorfCoord(dorfer[i]);
						//RegExp Executions
						//Truppen
						data.read.troups = pattern.execTroupRegExps(dorfer[i]);
						//Angriffe
						attacks = dorfer[i].split(lang.regExp.attTitle);
						data.read.attackAnz = attacks.length-1;

						//Berechnungen
							data.calc = logic.calcValues(data.read, data.settings);

						//Patternersetzung
							deffText = parser.cond.parseIfs(data); //Hohlt settings.verPattern und führt die IFs aus
							deffText = parser.parseVerPattern(data, deffText);
							deffText = parser.parseAttacks(attacks, deffText);
							var currBracketCount = 0;
							for(var j = 0; j != deffText.length; ++j) {
								if(deffText.charAt(j) == '[')
									++currBracketCount;
							}
							bracketCount += currBracketCount;


							if(bracketCount > 1000) {
								output = gui.create.createNewMainContent(inputCount);
								++inputCount;
								bracketCount = currBracketCount;
							}
						//Ins Feld schreiben
							output.value += deffText;
					}
					else {
						alertBox(ctn(lang.err.wallMissing + "@Dorp No. " + i + "\n Villagecount: " + dorfer.length), "cdr_input-err", false);
						break;
					}
				}
			}
		}
	} else if(d.location.href.match(/game\.php.*screen=memo*/) != null || d.location.href.match(/game\.php.*answer=true*/) != null || d.location.href.match(/game\.php.*mode=new_thread*/) != null)  {
		var lang = languages[loc];
		$("bb_bar").appendChild(gui.create.createPasteLink());
	}
	})();

// berichten verwerken

(function() { 
  if(/screen=report/.test(location.href));
  else {
		return;
	} 
	var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
	var game_data = typeof unsafeWindow != 'undefined' ? unsafeWindow.game_data : window.game_data;
	var mode = game_data.mode;
	var PA = game_data.player.premium;
	var settings =
              {
                reg : /\((\d+\|\d+)\) C\d+/,
                id_reg : /\d+/,
                span : $('#report_list tbody tr td span[id*="labelText_"]'),
                input : $('#report_list tbody tr td input[name*="id_"]'),
                titel_hacken : "Alle rappporten met deze Coördinaten selecteren",
                hacken : '/graphic/confirm.png',
                titel_fragezeichen : "Filteren op berichtnaam (Ingamefilter)",
                fragezeichen : 'data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAklQTFRFAAAA////m5mayMbH+Pf4l5aX2dja5OTm/Pz9+/v89/f48/P0AA52ABFtABZ0j5CUABZlGjubS2GcxcbJJk6uMUyPGTuFJ0+nJUeVMluvXn29jKDIjqDDeXt/5+nt5ujs+/z+Un7KXnmsc4/BpLfZmajEbZPPiaHKnrLS6ezxh6TRrsPh9vj70dPWkbPgiqrUnbzllrParcnrssvprrzNkJqmho+avcfTf4SK5Ov06Ozx4OTpaYGbgp++do6oUV9vwt7+doeaWmZ0yeP/nbHHpbfL3e3/sb3K5PH/vsnVq7XAztbf193kh7XjXHqYhanMgqXIdpW0ncXshabIgaDAocbtj7HTUmV5nsPnnMDjr9T5s9n+eZGpbYKYrc7uWGd2udj3sc/tpsLew+H/nrbPj6W7xN/7s8vjyuT/y+X/zOX/0Of/0Of+1On/1er/0eb71+v/r7/Q2+3/3u7+2ej3rLfC4/H/4u346/X/4+rx5uzy3+Tp5uru3+Pn6u3w8fP17e/x6+3v8PHyZ4ajiqrJo8fpgp22s9f5tNj5u97/wuH/x+T/yOT/yeX/y+X+s8rgz+j/zeb9tMrescba0un/zeDy2e3/4PD/1OLv6PT/xM7XweL/yeb/2e7/2On32uHnxOX/2O393/H/ipOanqaszuv/9vn72/H/3/D75fX/2/L/9/z//P7/+vz98vv/9fz/9v3/7Pv/+v7/6fv/9///+vz8/v//9fb2///++/v69vb1//79/v387OvqurWz1dPTxMLC9fT00dDQvLqJmgAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2wYIFCQ7pRWYLQAAAO1JREFUGNNjYACCBjnuXdutrBmgoL6Ji5FRgZFxbZVPI4hfI791m460lJDqpjWW5uwMDJrVy1Zvk+FTEeXV2LJ+RikDg3fluooN6oLaSjzKG1eucBVmmFU+06OsOH+ehIjxooKFk5YweJZMdysq2qwl6TA3e8LE/sUMhVOn5eVOWa5msCrDuTctxYLBZHLOhKzMPkOjOcnJXYkx/AzzU9N7upfqC4h1zO6Ma3FiZmBwb0tKWKAnrhjV3hoczgRymZedbVhkaHSEf7M9K8TtuqaOsSFBgfGyBxjg4JCLr80+BhQQ4LcfVaDWjA1MAwAAoEcJJQkAFwAAAABJRU5ErkJggg==',
                titel_move : "Alle raporten met deze coodrinaten verplaatsen naar een groep",
                move: '/graphic/icons/paste.png',
                move_text : 'In welke groep moeten de berichten gestopt worden?'
              }
			create_Buttons ();
function create_Buttons ()
	{
	if(mode != null && mode != 'all' && mode != 'attack' && mode != 'defense')
	{
    return;
	}
	if($('#report_list tbody tr').length == 1)
	{
    return;
	}
	var rows = $('#report_list tbody tr td input[name*="id_"]');
	if(PA)
	{
		$('<th></th><th></th><th></th>').insertBefore($('#report_list tbody tr:first th:first'));
		$('<th></th><th></th><th></th>').insertBefore($('#report_list tbody tr:last th:first'));
	}else
	{
		$('<th></th>').insertBefore($('#report_list tbody tr:first th:first'));
		$('<th></th>').insertBefore($('#report_list tbody tr:last th:first'));
	}
	for(var i=0;i<rows.length;i++)
	{
		if(settings.reg.exec($(settings.span[i]).text()) != null)
		{
		if(PA)
		{
			$('<td id=hacken_'+i+'><a href="javascript:;"><img src="'+settings.hacken+'" title="'+settings.titel_hacken+'" /></a></td>').insertBefore($(rows[i]).parent())
			.bind( "click", function()
			{
				check_other(regCoord(this));
			}
			);
			$('<td id=fragezeichen'+i+'><a href="javascript:;"><img src="'+settings.fragezeichen+'" title="'+settings.titel_fragezeichen+'" /></a></td>').insertBefore($(rows[i]).parent())
			.bind( "click", function()
			{
				filter(regCoord(this));
			}
			);
			$('<td id=move'+i+'><a href="javascript:;"><img src="'+settings.move+'" title="'+settings.titel_move+'" /></a></td>').insertBefore($(rows[i]).parent())
			.bind( "click", function()
			{
				move_report(regCoord(this));
			}
			);
		}else
		{
			$('<td id=hacken_'+i+'><a href="javascript:;"><img src="'+settings.hacken+'" title="'+settings.titel_hacken+'" /></a></td>').insertBefore($(rows[i]).parent())
			.bind( "click", function()
			{
				check_other(regCoord(this));
			}
			);
		}
		}else
		{
		if(PA)
		{
			$('<td></td><td></td><td></td>').insertBefore($(rows[i]).parent());
		}else
		{
			$('<td></td>').insertBefore($(rows[i]).parent());
		}
		}
	}
	}
	function regCoord (el)
	{
		var nr = el.id.match(settings.id_reg)[0];
	var coord = ($(settings.span[nr]).text().match(settings.reg)[0]);
	return coord;
	}
	function check_other(coord)
	{
	for(var i=0;i<settings.span.length;i++)
	{
		var this_coord = settings.reg.exec($(settings.span[i]).text()) != null ? settings.reg.exec($(settings.span[i]).text())[0] : "";
		var check = this_coord == coord ? true : false;
		$(settings.input[i]).prop('checked',check);
	}
	}
	function filter(coord)
	{
	$('#filter_subject').val(coord);
	$('#filter_subject').next().click();
	}
	function find_group ()
	{
	var groups = [];
	var option = $('select[name="group_id"] option');
	for(var i=0;i<option.length;i++)
	{
		var group_id = $(option[i]).val();
		var group_name = $(option[i]).text();
		groups.push({ id:group_id , name:group_name});
	}
	return groups;
	}

	function move_report(coord)
	{
	check_other(coord);
	var buttons = [];
	var groups = find_group ();
	if(groups.length>1)
	{
		for(var i=0;i<groups.length;i++)
		{
		buttons.push({text:groups[i].name, callback:function(){}});
		}
		var UI = typeof unsafeWindow != 'undefined' ? unsafeWindow.UI : window.UI;
		UI.ConfirmationBox(settings.move_text,buttons,"ConfirmationBox");
		$('#ConfirmationBox button').bind( "click", function(e)
		{
			var value = $(e.target).text();
			var groups = find_group ();
			for(var i=0;i<groups.length;i++)
			{
			if(groups[i].name==value)
			{
				$("select[name='group_id']").val(value);
				$("select[name='group_id'] option").each(function(){
					if ($(this).text() == value) {
						$(this).attr("selected",true);
					} else {
						$(this).removeAttr("selected");
					}
				$("select[name='group_id']").next().click();
				});
			}
			}
		}
		);
	}else
	{
		$("select[name='group_id']").next().click();
	}
	};

	var server = location.host.split(".")[0];{

	$(document).ready(function(){	
		if(location.href.indexOf("screen=report") != -1 && location.href.indexOf("view=") == -1) {
				var pattern = /\(nieuw\)$/;
					$('img[src*="max_loot/1.png"]').each(function() {
				if($(this).parent().text().trim().match(pattern) != null) {
					$(this).parent().css({"background-color":"#439DF7"});				
				}else{ 
					$(this).parent().css({"background-color":"#bcdbf5"});
				}
			});
			$('a[href*="screen=report&mode=all&view="]').mousedown(function(e) {
				if(e.target.nodeName == "SPAN")
					$(this).parent().parent().css({"background-color":"#F58CE9"});
			});	
					var pattern = /\(nieuw\)$/;
				   $('a:contains("Kerk")').each(function() {
				if($(this).parent().text().trim().match(pattern) != null) {
					$(this).parent().css({"background-color":"#7D7906"});				
				}else{ 
					$(this).parent().css({"background-color":"#FA1105"});
				}
			});
			$('a[href*="screen=report&mode=all&view="]').mousedown(function(e) {
				if(e.target.nodeName == "SPAN")
					$(this).parent().parent().css({"background-color":"#F58CE9"});
			});	
					var pattern = /\(nieuw\)$/;
				   $('a:contains("KERK")').each(function() {
				if($(this).parent().text().trim().match(pattern) != null) {
					$(this).parent().css({"background-color":"#7D7906"});				
				}else{ 
					$(this).parent().css({"background-color":"#FA1105"});
				}
			});		
			$('a[href*="screen=report&mode=all&view="]').mousedown(function(e) {
				if(e.target.nodeName == "SPAN")
					$(this).parent().parent().css({"background-color":"#F58CE9"});
			});			
					var pattern = /\(nieuw\)$/;
				$('a:contains("EDEL")').each(function() {
				if($(this).parent().text().trim().match(pattern) != null) {
					$(this).parent().css({"background-color":"#439DF7"});				
				}else{ 
					$(this).parent().css({"background-color":"#FF8605"});
				}
			});
			$('a[href*="screen=report&mode=all&view="]').mousedown(function(e) {
				if(e.target.nodeName == "SPAN")
					$(this).parent().parent().css({"background-color":"#F58CE9"});
			});		
					var pattern = /\(nieuw\)$/;
					$('a:contains("Edel")').each(function() {
					if($(this).parent().text().trim().match(pattern) != null) {
					$(this).parent().css({"background-color":"#FAE275"});				
				}else{ 
					$(this).parent().css({"background-color":"#FF8605"});
				}
			});
			$('a[href*="screen=report&mode=all&view="]').mousedown(function(e) {
				if(e.target.nodeName == "SPAN")
					$(this).parent().parent().css({"background-color":"#F58CE9"});
			});		
					var pattern = /\(nieuw\)$/;
				$('a:contains("verovert")').each(function() {
				if($(this).parent().text().trim().match(pattern) != null) {
					$(this).parent().css({"background-color":"#43F746"});				
				}else{ 
					$(this).parent().css({"background-color":"#8BF78C"});
				}
			});
			$('a[href*="screen=report&mode=all&view="]').mousedown(function(e) {
				if(e.target.nodeName == "SPAN")
					$(this).parent().parent().css({"background-color":"#F58CE9"});
			});	
		}
	});

	function getUrlParameter(parameter) {
		var loc = location.search.substring(1, location.search.length);
		var param_value = false;

		var params = loc.split("&");
		for (i=0; i<params.length;i++) {
			param_name = params[i].substring(0,params[i].indexOf('='));
			if (param_name == parameter) {
				param_value = params[i].substring(params[i].indexOf('=')+1)
			}
		}
		if (param_value) {
			return param_value;
		}
		else {
			return false;
		}
	}

	String.prototype.trim = function () {
		return this.replace(/^\s*/, "").replace(/\s*$/, "");
		}
		};
})();
