// ==UserScript==
// @name           Funny OGame V3
// @namespace      Gollum/Flapy
// @description    Membre principal de la suite « Funny OGame » Revu par Flapy pour Ogame V3
// @include        http://*.ogame.*/game/index.php?page=*
// @exclude        http://*.ogame.*/game/index.php?page=*raidefacil*
// ==/UserScript==
	
	Version = 3.07;
	
	testflo = document.getElementById("clearAdvice");
	
	url = location.href;
	Num = {'a' : 101, 'b' : 102, 'c' : 103, 'd' : 104, 'e' : 105, 'f' : 106, 'g' : 107, 'h' : 108, 'i' : 109, 'j' : 110, 'k' : 111, 'l' : 112, 'm' : 113, 'n' : 114, 'o' : 115, 'p' : 116, 'q' : 117, 'r' : 118, 's' : 119, 't' : 120, 'u' : 121, 'v' : 122, 'w' : 123, 'x' : 124, 'y' : 125, 'z' : 126};
	
	tps = url.match(/(http:\/\/uni([^.]*)\.ogame\.([a-z]{1,3}))\/game/);
	the_session = document.getElementsByName("ogame-session");
	URL_S = the_session[0].getAttribute("content");
	if (tps) {
		URL_D = tps[1];
		URL_U = tps[2];
		URL_N = tps[3];
		URL_P = url.match(/page=([a-zA-Z0-9]*)/)[1];
	} else {
		tps = url.match(/(http:\/\/([^.]*)\.ogame\.([a-z]{1,3}))\/game/);
		if (tps) {
			URL_D = tps[1];
			URL_U = Num[tps[2][0]];
			URL_N = tps[3];
			URL_P = url.match(/page=([a-zA-Z0-9]*)/)[1];
		} else {URL_N = url.match(/ogame.([a-z]{1,3}[\.]?[a-z]{0,3})/)[1];};
	}
	
	uw = unsafeWindow;

	/*** Ajout des fonctions : ***/
	id_ = function (id, elm) {if (elm) {return elm.getElementById(id);} else {return document.getElementById(id);}}
	tag_ = function (n, elm) {if (elm) {return elm.getElementsByTagName(n);} else {return document.getElementsByTagName(n);}}
	class_ = function (n, elm) {if (elm) {return elm.getElementsByClassName(n);} else {return document.getElementsByClassName(n);}}
	name_ = function (n, elm) {if (elm) {return elm.getElementsByName(n);} else {return document.getElementsByName(n);}}
	IndexOf = function (Text, Recherche) {return (Text.indexOf(Recherche) > -1);}
	S_ = function (table, n) {return table[table.length+n];}
	addElm = function (that, tag, attr, txt) {
		if (tag.nodeType != 1) {
			var T = document.createElement(tag), a;
			if (attr) {for (a in attr) {T.setAttribute(a, attr[a]);}}
			if (txt != undefined) {T.innerHTML = txt;}
			that.appendChild(T); return T;
		}
	}
	addEve = function (obj, type, fn){
		if (obj.addEventListener){obj.addEventListener(type, function(event) {return fn.call(obj,event);}, false );}
		else if (obj.attachEvent){obj.attachEvent("on"+type, function(e) {if (!e) {var e = window.event;} return fn.call(obj, e);});}
	}
	uw.delElm = function (id) {if (id_(id)) {id_(id).parentNode.removeChild(id_(id));}}
	delElm = function (id) {if (id_(id)) {id_(id).parentNode.removeChild(id_(id));}}
	Tra_ = function (N, Na, Tra) {if (Tra[N][Na]) {return Tra[N][Na];} else {if (Tra[N]['org']) {return Tra[N]['org'];} else {return Tra[N]['fr'];}}}
	STI = function (N) {if (N.match(/[0-9]/)) {return parseInt(N.replace(/[^0-9]/g, ''));} else {return 0;}}
	Checked = function (a) {return (a ? 'checked="true"' : '');}
	Value = function (a) {return (a ? 'value="'+a+'"' : 'value=""');}
	Message = function (a) {return alert(a);}
	Sep = function (nombre, color) {
		if (nombre == 0) {areturn = nombre;} 
		else {
			var signe = '';
			if (nombre < 0) {nombre = Math.abs(nombre); signe = '-';} else {if (color) {signe = '+';}}
			var str = nombre.toString(), n = str.length;
			if (n <4) {areturn = signe + nombre;} 
			else {areturn  = signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));}
		}
		if (color) {return '<span id="'+(signe == '-' ? 'red' : 'green')+'">'+areturn+'</span>';} else {return areturn;}
	}
	Tooltip = function (elm, txt) {elm.setAttribute('title', txt); elm.setAttribute('onmouseover', (elm.getAttribute('onmouseover') ? elm.getAttribute('onmouseover') : '')+'tooltip.show(this)'); elm.setAttribute('onmouseout', (elm.getAttribute('onmouseout') ? elm.getAttribute('onmouseout') : '')+'tooltip.hide(this)');}
	Find = function (path) {
		var Result = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (Result) {return Result;} else {return false;}
	}
	Find_T = function (path) {
		var Result = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (Result) {return Result;} else {return false;}
	}
	Galaxie = function (G, S, P, Sup) {return URL_D+'/game/index.php?page=galaxy&amp;galaxy='+G+'&amp;system='+S+'&amp;position='+P+(Sup ? Sup.replace(/&/, '&amp;') : '');}
	Mission = function (G, S, P, T, M, Sup) {return URL_D+'/game/index.php?page=fleet1&galaxy='+G+'&system='+S+'&position='+P+'&type='+T+'&mission='+M+(Sup ? Sup.replace(/&/, '&') : '');}
	Coor_ = function (Text) {return Text.match(/[\[]?([0-9]{1,2}):([0-9]{1,3}):([0-9]{1,2})[\]]?/);}
	Panel = function (Code, num) {
		body = document.getElementsByTagName('body')[0];
		addElm(body, 'div', {id:'fond_'+num,style:'display:none;opacity:0.8;background-color:#000;',class:'panel'}, '');
		addElm(addElm(body, 'div', {id:'options_'+num,style:'display:none;color:transparent;',class:'panel'}, ''), 'table', {id:'box_'+num, class:'box'}, Code);
		uw.$('#fond_'+num).fadeIn(500); uw.$('#options_'+num).fadeIn(500);
	}
	uw.Kill_Panel = function (num, fct) {uw.$('#fond_'+num).fadeOut(500); uw.$('#options_'+num).fadeOut(500); setTimeout("delElm('fond_"+num+"'); delElm('options_"+num+"');", 500); if (fct) {setTimeout(fct, 500);}}; Kill_Panel = uw.Kill_Panel;
	DTS = function (D) {
		if (D.toLocaleDateString() != new Date(new Date().getTime()).toLocaleDateString()) {date = 'le ' + (D.getDate() < 10 ? '0'+D.getDate() : D.getDate())+'/'+((D.getMonth()+1) < 10 ? '0'+(D.getMonth()+1) : (D.getMonth()+1)) + ' à ';} else {date = 'aujourd\'hui à ';}
		date += (D.getHours() < 10 ? '0'+D.getHours() : D.getHours())+':'+(D.getMinutes() < 10 ? '0'+D.getMinutes() : D.getMinutes())+':'+(D.getSeconds() < 10 ? '0'+D.getSeconds() : D.getSeconds());
		return date;
	}	
	Temps_STR = function (s) {
		if (s > 0) {
			var j = 0; var h = 0; var m = 0;
			if (s > 59) {
				m = Math.floor(s/60);
				s = s - m * 60;
			}
			if (m > 59) {
				h = Math.floor(m/60);
				m = m - h * 60;
			}
			if (h > 24) {
				j = Math.floor(h/24);
				h = h - j * 24;
			}
			Text = (j > 0 ? j+'j ' : '');
			Text += (h > 0 ? h+'h ' : '');
			Text += (m > 0 ? m+'m ' : '');
			Text += s+'s';
			return Text;
		} else {return '0s';};
	}
	IMG = function (nom) {
		list_img = {
			'menu_a' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAdCAMAAADxXu7yAAAAvVBMVEUA/wAAAAABAgIGBwkGCAkHCAkHCAoHCQoHCQsHCgsICAkJCQwJCgsJCw0JCw4JDA0KDA4KDA8KDQ8KDRALCwwLDRALDhEMDxAMDxEMEBINDg8NDxIPEhUPEhYPExUQERIQExYQFBcRFRgSFRkSFhkTFBUWFxgWGh4XGx8aHiIbHiMbHyMbICMbICQcICQcICUcISUdIiceIycfJCkfJSokJignKy4pKywrLjItMDItMDQwMzUwNDYxNTc1ODp9+ENnAAAAAXRSTlMAQObYZgAAAQlJREFUaN61k2tTgkAUhveUUVlpYIgaIdplu0hLCdpJ4P//LPdixtLCMM34zA5z5swz7758WEIISWITCdFZiiUTxGraaQvNSn6kX5S+oGWN/tUUH7pmdNgni3XtxexFrE0ai6L/a5tcsClp75Vub2KZF4JcyzNrPO27QaNKy6vlnjXtlAqyIqOK168sW8nppKyBBIsCEdcAXRQln+TSqHEQIOVfOdRpPC0VA95gg4b7odtCW8tLeSwcNWlTWXJSk5aKXpJH/sNTqNGMHE7rwHEbrde/6vXPzi3J3rCszuWF9gLHt6PR0HVdx3Fs277mZzCAoed5lff8cD+bhWEY+IHvB3e7M5+Tg7EF8FdXNkqAfXwAAAAASUVORK5CYII%3D',
			'menu_c' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAdCAMAAADxXu7yAAAAvVBMVEUA/wAAAAABAgIGBwkGCAkHCAkHCAoHCQoHCQsHCgsJCQwJCgsJCw0JCw4JDA0KDA4KDA8KDQ8KDRALDRALDhEMDxAMDxEMEBINDxIPEhUPEhYPExUQExYQFBcRFRgSFRkSFhkWGh4XGx8aHiIbHyMbICMbICQcICQcICUcISUdIiceIycfJCkfJSogFgsrHQ4zLCU2JRJCLRZONRpaPh5/XDWTZDCabDqcbjykcDareD+4fj27gkG8g0LXk0cWyIr2AAAAAXRSTlMAQObYZgAAAQhJREFUaN61k2tTgkAUhvek0VUDEYtAaytxqbCyovQA//9nuRdTlhaGccZndpgzZ5559+XDEkJIEptIiM6rWDJBrKaNNtWs5E/aofQpLWv0v6Z41jWjw15YrGuPZi9ibdJYFO2vrXLBqqTNKt2exDIvBLmWZ9Z42m+DRpWWV8s9aNoJFWRFRhXvP1n2LafjsgYSLApEXALMUZT8kkujxkGAlH/lUKfxtFQM+IYNGm6HeQttKS/lsXDUpC1kyY+atFT0knzyH15AjWbkcFoXOm20Xv+y1z89syRbw7K6F+faC7y+GY2Grus6jmPb9hU/gwEMPc+rvOf7u/E4DMPAD3w/uN2cyYQcjDVjjU9npUjccgAAAABJRU5ErkJggg%3D%3D'
		}
		return list_img[nom];
	}
	
	/*** Ajout des variables : ***/
	Uni = function () {return URL_U;}
	Couts = {
		202: {m:2000, c:2000, d:0},
		203: {m:6000, c:6000, d:0},
		204: {m:3000, c:1000, d:0},
		205: {m:6000, c:4000, d:0},
		206: {m:20000, c:7000, d:2000},
		207: {m:45000, c:15000, d:0},
		208: {m:10000, c:20000, d:10000},
		209: {m:10000, c:6000, d:2000},
		210: {m:0, c:1000, d:0},
		211: {m:50000, c:25000, d:15000},
		212: {m:0, c:2000, d:500},
		213: {m:60000, c:50000, d:15000},
		214: {m:5000000, c:4000000, d:1000000},
		215: {m:30000, c:40000, d:15000},
		
		401: {m:2000, c:0, d:0},
		402: {m:1500, c:500, d:0},
		403: {m:6000, c:2000, d:0},
		404: {m:20000, c:15000, d:2000},
		405: {m:2000, c:6000, d:0},
		406: {m:50000, c:50000, d:30000},
		407: {m:10000, c:10000, d:0},
		408: {m:50000, c:50000, d:0},
		502: {m:8000, c:0, d:2000},
		503: {m:12500, c:2500, d:10000},
		
		Taux: (URL_U != 110 ? 0.3 : 0.7)
	};
		
	/*** Ajout des scripts/styles : ***/
	addElm(tag_('body')[0], 'script', {}, "var tooltip={id:'tooltip',offsetx : 10,offsety : 10,_x : 0,_y : 0,_tooltipElement:null,_saveonmouseover:null};tooltip.show=function(htmlelement){var text=htmlelement.getAttribute('title');htmlelement.setAttribute('title','');htmlelement.setAttribute('title_saved',text);if(document.getElementById){this._tooltipElement=document.getElementById(this.id)}else if(document.all){this._tooltipElement=document.all[this.id].style}this._saveonmouseover=document.onmousemove;document.onmousemove=this.mouseMove;this._tooltipElement.innerHTML=text;this.moveTo(this._x+this.offsetx,this._y+this.offsety);if(this._tooltipElement.style){this._tooltipElement.style.visibility='visible'}else{this._tooltipElement.visibility='visible'}return false};tooltip.hide=function(htmlelement){htmlelement.setAttribute('title',htmlelement.getAttribute('title_saved'));htmlelement.removeAttribute('title_saved');if(this._tooltipElement.style){this._tooltipElement.style.visibility='hidden'}else{this._tooltipElement.visibility='hidden'}document.onmousemove=this._saveonmouseover;};tooltip.mouseMove=function(e){if(e==undefined){e=event};if(e.pageX !=undefined){tooltip._x=e.pageX;tooltip._y=e.pageY;}else if(event !=undefined&&event.x !=undefined&&event.clientX==undefined){tooltip._x=event.x;tooltip._y=event.y;}else if(e.clientX !=undefined){if(document.documentElement){tooltip._x=e.clientX+(document.documentElement.scrollLeft || document.body.scrollLeft);tooltip._y=e.clientY+(document.documentElement.scrollTop || document.body.scrollTop);}else{tooltip._x=e.clientX+document.body.scrollLeft;tooltip._y=e.clientY+document.body.scrollTop;}}else{tooltip._x=0;tooltip._y=0;};tooltip.moveTo(tooltip._x+tooltip.offsetx,tooltip._y+tooltip.offsety)};tooltip.moveTo=function(xL,yL){if(this._tooltipElement.style){this._tooltipElement.style.left=xL+'px';this._tooltipElement.style.top=yL+'px';}else{this._tooltipElement.left=xL;this._tooltipElement.top=yL;}}");
	GM_addStyle('#tooltip {position:absolute;visibility:hidden;background-color:#000;border:1px solid #FFF;padding:10px;z-index:100000;background-color:#000;} #tooltip #title {margin-bottom:8px;display:block;text-align:center;} *[onmouseover*="tooltip."] {cursor:pointer;}');
	GM_addStyle('.panel {width:100%;height:100%;position:fixed;left:0;top:0;z-index:1000;} .box {vertical-align:middle;text-align:center;width:100%;height:100%;}');
	GM_addStyle('#fermer {margin-top:15px;color:#FFF;}');
	GM_addStyle('#maj {padding:15px;width:450px;vertical-align:middle;text-align:center;background-color:#000;border:1px solid #FFF;}');
	GM_addStyle('#maj td {color:#828282;font-size:12px;text-align:center;width:100px;}');
	GM_addStyle('.c th {color:#FFF;font-size:12px;text-align:center;padding-bottom:10px;}');
	GM_addStyle('h5 {color:#FFF;font-size:14px;text-align:center;margin-bottom:25px;}');
	addElm(tag_('body')[0], 'div', {id:'tooltip'}, '');
	/*** Options ***/
	Def_Options = {
		fo: {sondes: 8, menu: true},
		fc: {ress: true, inst: true, cs: true, def: true},
		ff: {flotte_: true, flotte__: true, flotte___: true},
		fg: {pm: true, info: true, espio: true, cdd: true, cdd_p: true, cc: true, blanc: true, forts: true, planete: true, phalange: true},
		techno_arme: 0
	}
	Options = OptX('options_funny_ogame_'+URL_N, Def_Options);
	function Sauver_Options(type) {
		if (type == 'fo') {
			Options.fo = {
				menu: id_("menu").checked,
				sondes: id_("sondes").value
			};
		}
		if (type == 'fc') {
			Options.fc = {
				ress: id_("ress").checked,
				inst: id_("inst").checked,
				cs: id_("cs").checked,
				def: id_("def").checked
			};
		}
		if (type == 'ff') {
			Options.ff = {
				flotte_: id_("flotte_1").checked,
				flotte__: id_("flotte_2").checked,
				flotte___: id_("flotte_3").checked
			};
		}
		if (type == 'fg') {
			Options.fg = {
				pm: id_("pm").checked,
				info: id_("info__").checked,
				espio: id_("espio").checked,
				cdd: id_("cdd").checked,
				cdd_p: id_("cdd_p").checked,
				cc: id_("cc").checked,
				blanc: id_("blanc").checked,
				forts: id_("forts").checked,
				planete: id_("planete").checked,
				phalange: id_("phalange").checked,
				phatab: id_("phatab").checked
			};
		}
		GM_setValue('options_funny_ogame_'+URL_N, uneval(Options));		
	}
	uw.Aff_Options = function (type) {
		if (type == 'fo') {
			Code = '<tr><td><center><div id="opt">';
			Code += '<h5>Options - Funny OGame</h5>';
			Code += '<table>';
			Code += '<tr id="menu_opt"><td>Bouton Funny OGame dans le menu de gauche</td><th><input '+Checked(Options.fo.menu)+' id="menu" type="checkbox"/></th></tr>';
			Code += '<tr></td></tr>';
			Code += '<tr id="nbr_opt"><td>Nombre de sondes :</td><th><input '+Value(Options.fo.sondes)+' id="sondes" type="text"/></th></tr>';
			Code += '</table>';
			Code += '<button id="fermer_fo" onclick="Kill_Panel(0);">Enregistrer &amp; Fermer</button>';
			Code += '</div></center></td></tr>';
			Panel(Code, 0); addEve(id_('fermer_fo'), 'click', function() {Sauver_Options('fo');Kill_Panel(0);});
			Tooltip(id_('menu_opt'), 'Sinon, le bouton sera disponible via le menu « <u>O</u>utils » (de Firefox),<br/>puis « <u>G</u>reasemonkey », « <u>C</u>ommandes du script... » et enfin « Funny OGame ».<br/>Ce bouton permet d\'ouvrir le menu d\'option et de mise à jours des scripts.')
			Tooltip(id_('nbr_opt'), 'Nombre de sondes à présélectionner pour les missions « Espionner... ».')
		}
		if (type == 'fc') {
			Code = '<tr><td><center><div id="opt">';
			Code += '<h5>Options - Funny Construction</h5>';
			Code += '<table>';
			Code += '<tr><td>Utiliser dans l\'onglet Ressources</td><th><input '+Checked(Options.fc.ress)+' id="ress" type="checkbox"/></th></tr>';
			Code += '<tr><td>Utiliser dans l\'onglet Installations</td><th><input '+Checked(Options.fc.inst)+' id="inst" type="checkbox"/></th></tr>';
			Code += '<tr><td>Utiliser dans l\'onglet Chantier Spatial</td><th><input '+Checked(Options.fc.cs)+' id="cs" type="checkbox"/></th></tr>';
			Code += '<tr><td>Utiliser dans l\'onglet Défenses</td><th><input '+Checked(Options.fc.def)+' id="def" type="checkbox"/></th></tr>';
			Code += '</table>';
			Code += '<button id="fermer_fc" onclick="Kill_Panel(0);">Enregistrer &amp; Fermer</button>';
			Code += '</div></center></td></tr>';
			Panel(Code, 0); addEve(id_('fermer_fc'), 'click', function() {Sauver_Options('fc');Kill_Panel(0);});
		}
		if (type == 'ff') {
			Code = '<tr><td><center><div id="opt">';
			Code += '<h5>Options - Funny Fleet</h5>';
			Code += '<table>';
			Code += '<tr><td>Modifier la page Flotte I</td><th><input '+Checked(Options.ff.flotte_)+' id="flotte_1" type="checkbox"/></th></tr>';
			Code += '<tr><td>Modifier la page Flotte II</td><th><input '+Checked(Options.ff.flotte__)+' id="flotte_2" type="checkbox"/></th></tr>';
			Code += '<tr><td>Modifier la page Flotte II</td><th><input '+Checked(Options.ff.flotte___)+' id="flotte_3" type="checkbox"/></th></tr>';
			Code += '</table>';
			Code += '<button id="fermer_ff" onclick="">Enregistrer &amp; Fermer</button>';
			Code += '</div></center></td></tr>';
			Panel(Code, 0); addEve(id_('fermer_ff'), 'click', function() {Sauver_Options('ff');Kill_Panel(0);});
		}
		if (type == 'fg') {
			Code = '<tr><td><center><div id="opt">';
			Code += '<h5>Options - Funny Galaxy</h5>';
			Code += '<table>';
			Code += '<tr><td>Ajouter un lien vers la planète mère des joueurs</td><th><input '+Checked(Options.fg.pm)+' id="pm" type="checkbox"/></th></tr>';
			Code += '<tr><td>Ajouter un lien pour des informations supplémentaires sur les joueurs</td><th><input '+Checked(Options.fg.info)+' id="info__" type="checkbox"/></th></tr>';
			Code += '<tr><td>Ajouter un lien pour espionner en choisissant le nombre de sondes</td><th><input '+Checked(Options.fg.espio)+' id="espio" type="checkbox"/></th></tr>';
			Code += '<tr><td>Ajouter un lien pour exploiter sur le numéro à gauche des planètes</td><th><input '+Checked(Options.fg.cdd)+' id="cdd" type="checkbox"/></th></tr>';
			Code += '<tr><td>Ajouter un lien pour exploiter dans les pop-up des panètes</td><th><input '+Checked(Options.fg.cdd_p)+' id="cdd_p" type="checkbox"/></th></tr>';
			Code += '<tr><td>Modifier le lien d\'exploitation du CDR via Compte commandant</td><th><input '+Checked(Options.fg.cc)+' id="cc" type="checkbox"/></th></tr>';
			Code += '<tr><td>Ajouter un espace entre le nom des planète et l\'activité</td><th><input '+Checked(Options.fg.blanc)+' id="blanc" type="checkbox"/></th></tr>';
			Code += '<tr><td>Colorer les joueurs forts</td><th><input '+Checked(Options.fg.forts)+' id="forts" type="checkbox"/></th></tr>';
			Code += '<tr><td>Mettre en valeur la planète vue</td><th><input '+Checked(Options.fg.planete)+' id="planete" type="checkbox"/></th></tr>';
			Code += '<tr><td>Modifier le titre des pages de phalange</td><th><input '+Checked(Options.fg.phalange)+' id="phalange" type="checkbox"/></th></tr>';
			Code += '<tr><td>Ouvrir la phalange dans un nouvel onglet</td><th><input '+Checked(Options.fg.phatab)+' id="phatab" type="checkbox"/></th></tr>';
			Code += '</table>';
			Code += '<button id="fermer_fg" onclick="">Enregistrer &amp; Fermer</button>';
			Code += '</div></center></td></tr>';
			Panel(Code, 0); addEve(id_('fermer_fg'), 'click', function() {Sauver_Options('fg');Kill_Panel(0);});
		}
		if (type == 'fr') {
			Code = '<tr><td><center><div id="opt">';
			Code += '<h5>Options - Funny Report</h5>';
			Code += '<table>';
			Code += '<tr><td><center>Pas d\'option disponible pour le moment.<center></td></tr>';
			Code += '</table>';
			Code += '<button id="fermer_fr" onclick="">OK</button>';
			Code += '</div></center></td></tr>';
			Panel(Code, 0); addEve(id_('fermer_fr'), 'click', function() {Kill_Panel(0);});
		}
	}
	
	Def_Titres_unitee = {};
	Titres = OptX('titre_'+URL_N, Def_Titres_unitee);

	Liste_scripts = {
		'funny_ogame' : {
			nom : 'Funny OGame',
			rac : 'fo'
		},
		'funny_constructions' : {
			nom : 'Funny Constructions',
			rac : 'fc'
		},
		'funny_fleet' : {
			nom : 'Funny Fleet',
			rac : 'ff'
		},
		'funny_galaxy' : {
			nom : 'Funny Galaxy',
			rac : 'fg'
		},
		'funny_report' : {
			nom : 'Funny Report',
			rac : 'fr',
		},
	}
/* Options */
	
	/*** Versions & Mises à jours ***/
	function OptX(nom, def) {
		act = eval(GM_getValue(nom, uneval(def)));
		for (i in def) {if (act[i] == null) {act[i] = def[i]}}
		GM_setValue(nom, uneval(act)); return act;
	}

	function Ajout_bouton(uti) {
		VOL = (uti == true ? uti : Options.fo.menu);
		// Enfin on ajout le boutton
		if (VOL == true && id_('menuTable')) {
			addElm(id_('menuTable'), 'li', {class:'menubutton_table'}, '<span class="menu_icon"><img src="'+IMG('menu_'+(uti == true ? 'c' : 'a'))+'" height="29" width="38"></span><a class="menubutton" href="#" onclick="Menu_mise_a_jour('+(uti == true ? true : false) +');" title="'+(uti == true ? 'Des mises à jours sont disponibles !' : 'Modifier les Options de Funny Ogame')+'"><span class="textlabel">Funny OGame</span></a>');
		} else {GM_registerMenuCommand("Funny OGame", function(){uw.Menu_mise_a_jour();});}
	}
	uw.Menu_mise_a_jour = function (maj) {
		Code = '<tr><td><center><div id="maj">';
		if (maj) {
			Code += '<h5>Une mise à jours est disponible !</h5>';
			Code += '<a href="http://userscripts.org/scripts/source/122680.user.js">Mettre à jour maintenant !</a>';
			Code += '<br /><br /><br />';
		}
		Code += '<h5>Options - Funny OGame V.'+Version+'</h5>';
		Code += '<table style="width:100%;">';
		Code += '<tr class="c"><th>Nom du script</th><th>Options</th></tr>';
		for (i in Liste_scripts) {Code += '<tr><td>'+Liste_scripts[i].nom+'</td><td><a href="javascript:Aff_Options(\''+Liste_scripts[i].rac+'\');">Personnaliser</a></td></tr>';}
		Code += '</table>';
		Code += '<button id="fermer" onclick="Kill_Panel(1);">Fermer</button>';
		Code += '<br /><br /><br />';
		Code += '<a href="#" id="cmaj">Vérifer les mises à jour</a>';
		Code += '</div></center></td></tr>';
		Panel(Code, 1);
		addEve(id_('cmaj'), 'click', function() {Kill_Panel(1); Mise_a_jour(true);});
		// Ajout des styles pour les options :
		GM_addStyle('#header_text {cursor:pointer} #fermer, div.panel button {margin-top:15px;color:#FFF;background-color:#000;}');
		GM_addStyle('.bouton {background-color:#000;opacity:0.0;position:absolute;cursor:pointer;}');
		GM_addStyle('#opt {padding:15px;width:350px;vertical-align:middle;text-align:center;background-color:#000;border:1px solid #FFF;}');
		GM_addStyle('#opt td {color:#828282;font-size:12px;text-align:left;width:320px;} #opt th {color:#828282;font-size:12px;text-align:center;width:100px;}');
		GM_addStyle('h5 {color:#FFFFFF;font-size:14px;text-align:center;margin-bottom:25px;}');
	}
	
	function Mise_a_jour(Menu) {
		
		GM_xmlhttpRequest({
				method: "GET",
				url: 'http://userscripts.org/scripts/show/122680',
				onload: function(responseDetails) {
					var NV = parseFloat(responseDetails.responseText.match(/\(V\. ([0-9]*\.[0-9]{1,2})\)/)[1]);
					if (NV > Version) {
						if (Menu) {
							uw.Menu_mise_a_jour(true);
						} else {
							Ajout_bouton(true);
						}
					} else {
						if (Menu) {
							uw.Menu_mise_a_jour(false);
						} else {GM_setValue('Anci', Date.toString()); Ajout_bouton(false);
						}
					}
				}
		});
	}
	
	if (URL_P == 'overview') {
		// Une fois par jour, on verifie les mises a jours :
		Date = new Date().getTime();
		Anci = GM_getValue('Anci', 0);	
		if ((Date - Anci) > 86400000*1) {Mise_a_jour();} else {Ajout_bouton(false);}
		
		// On automatise la recuperation des titres des vaisseaux/defenses/techno pour l'annalyse des RE :
		Tps = GM_getValue('titre_'+URL_N, '');
		if (Tps == '' || Tps == '({})') {
			addElm(id_('boxBG'), 'iframe', {src:'index.php?page=shipyard', style:'display:none !important;'}, '');
			setTimeout(function () {addElm(id_('boxBG'), 'iframe', {src:'index.php?page=defense', style:'display:none !important;'}, '');}, 800);
			setTimeout(function () {addElm(id_('boxBG'), 'iframe', {src:'index.php?page=research', style:'display:none !important;'}, '');}, 1600);
		}
	}
	
/* Versions & Mises à jours */
	
/*** Funny Galaxy ***/

	function GFT(strLine, begin, end) {
		if (end != 'fin_fin_fin') {return strLine.substring(strLine.indexOf(begin), strLine.indexOf(end, strLine.indexOf(begin)));}
		else {return strLine.substring(strLine.indexOf(begin), strLine.length);}
	}
	function dec2hex(dec) {hex = dec.toString(16);return '#FF'+hex+hex;}
		
	uw.Surlignement = function (Coor) {if (Coor) {id_('sur').value = Coor;} else {return id_('sur').value.match(/([0-9]*):([0-9]*):([0-9]*)/);}};
	
	uw.PM_Joueur = function (url, type) {	
		window.setTimeout(function() {
			GM_xmlhttpRequest({
			method: 'GET',
			url: url,
				onload: function(responseDetails) {
					Lien_PM = responseDetails.responseText.match(/index\.php\?page=galaxy&galaxy=[0-9]{1,2}&system=[0-9]{1,3}/);	
					Infos = responseDetails.responseText.match(/<td>([^<]*) <a  target="\_parent" href="index\.php\?page=galaxy&galaxy=([0-9]{1,2})&system=([0-9]{1,3})&position=([0-9]{1,2})/);	
					if (Lien_PM && type == 'PM') {location.href = Lien_PM;} 
					if (Infos && type == 'Joueur') {Info_Joueur(Infos);}
					
				}
			});
		}, 0);
	};
	
	uw.Info_Joueur = function (Infos) {		
		//name = Infos[1]; Coor = [Infos[2], Infos[3], Infos[4]];	
		Coor = [0,0,0];	
		name = Infos;
		window.setTimeout(function() {
			
			if (name) { 
				IMG = '<img src="'+URL_D+'/game/img/galaxy/ajax_indicator.gif" alt="Chargement..." id="Chargement">';
				if (!id_('WR')) {
					Table = addElm(id_('links'), 'table', {id:'WR'}, IMG);
				} else {
					Table = id_('WR');
					Table.innerHTML = IMG;
				}
				var Link = 'http://www.war-riders.de/'+URL_N+'/'+Uni()+'/details/player/'+name.replace(/ /g, '%20');
				GM_xmlhttpRequest({
					method: "GET",
					url: Link,
					onload: function(responseDetails) {Game_Stat(responseDetails.responseText, name, Link, URL_S, Coor);}
				});
			}
		}, 0);
	};

	function Game_Stat(Code, Name, Link, session, Coor) {
		if (!IndexOf(Code, '<font class="red">No results</font>') && Code.match(/<tr><td class=s>([^<]*)<\/td>/)) {
			Classement_1 = Code.match(/<tr><td class=s>([^<]*)<\/td>/)[1];
			Classement_2 = Code.replace('<tr><td class=s>'+Classement_1+'</td>', '').match(/<tr><td class=s>([^<]*)<\/td>/)[1];
			Classement_3 = Code.replace('<tr><td class=s>'+Classement_1+'</td>', '').replace('<tr><td class=s>'+Classement_2+'</td>').match(/<tr><td class=s>([^<]*)<\/td>/)[1];
			Classement_4 = Code.replace('<tr><td class=s>'+Classement_1+'</td>', '').replace('<tr><td class=s>'+Classement_2+'</td>').replace('<tr><td class=s>'+Classement_3+'</td>').match(/<tr><td class=s>([^<]*)<\/td>/)[1];
			
			Code_1 = Code.replace(/\./g, '');
			Points_1 = Code_1.match(/<td class=s>([^<]*)<\/td><\/tr>/)[1];
			Points_2 = Code_1.replace('<td class=s>'+Points_1+'</td></tr>', '').match(/<td class=s>([^<]*)<\/td><\/tr>/)[1];
			Points_3 = Code_1.replace('<td class=s>'+Points_1+'</td></tr>', '').replace('<td class=s>'+Points_2+'</td></tr>', '').match(/<td class=s>([^<]*)<\/td><\/tr>/)[1];
			Points_4 = Code_1.replace('<td class=s>'+Points_1+'</td></tr>', '').replace('<td class=s>'+Points_2+'</td></tr>', '').replace('<td class=s>'+Points_3+'</td></tr>', '').match(/<td class=s>([^<]*)<\/td><\/tr>/)[1];
			Tableau_Classement = '<h4 style=color:#FFD700;>Classements de '+Name+'&nbsp;:</h4><table style=width:100%;><tr><th style=width:50%;color:#99CC00;>Points&nbsp;:</th><th style=width:50%;>'+Classement_1+'&nbsp;('+Sep(Points_1)+')</th></tr> <tr><th style=color:#99CC00;>Economie&nbsp;:</th><th>'+Classement_2+'&nbsp;('+Sep(Points_2)+')</th></tr> <tr><th style=color:#99CC00;>Recherches&nbsp;:</th><th>'+Classement_3+'&nbsp;('+Sep(Points_3)+')</th></tr><tr><th style=color:#99CC00;>Militaire&nbsp;:</th><th>'+Classement_4+'&nbsp;('+Sep(Points_4)+')</th></tr><tr><td colspan="2" id="click"><i>(Cliquez pour accèder à la page de War-Rider.)</i></td></tr> </table>';
			Object = '<object'+GFT(Code, '<object', '</object>')+'</object>';
			
			Code_1 = '<tr><td colspan="3"><a href="'+Link+'" target="_blank" id="pop_up_"><h4>'+Name+'</h4></a></td></tr>';
			
			Code = Code.replace(GFT(Code, '<!DOCTYPE', '<tr><td class=sysbody>'), 'Code_1_');
			Code = Code.replace(GFT(Code, '</table>', 'fin_fin_fin'), '');
			Code = Code.replace(/<a[^>]*>/g, '').replace(/<\/a>/g, '');
			Code = Code.replace(/<font class=ally>[^<]*<\/font> /g, '');
			Code = Code.replace(/ \( [^\)]*\)/gi, '').replace(/ class=sysbody/gi, '');
			
			Code = Code.replace('Code_1_', Code_1);
			Code = Code.replace(/([1-5]?[0-9]):([1-4]?[0-9]?[0-9]):(1[0-6]|[0-9])/g, '<a onclick="Surlignement(\'$1:$2:$3\');canLoadContent($1, $2);" class="planete_link" style="color: #99CC00;" target="_parent">[$1:$2:$3]</a>');
			Code = Code.replace('<tr><td><a onclick="Surlignement(\''+Coor[0]+':'+Coor[1]+':'+Coor[2]+'\');canLoadContent('+Coor[0]+', '+Coor[1]+');"', '<tr id="planete_mere"><td><a onclick="Surlignement(\''+Coor[0]+':'+Coor[1]+':'+Coor[2]+'\');canLoadContent('+Coor[0]+', '+Coor[1]+');"');
			Code = Code.replace(/<\/a>[ ]{1,2}[LM]{1}<\/td>/g, '</a></td><td style="color:;">L</td>').replace(/<\/a> <\/td>/g, '</a></td><td></td>');			
			id_('WR').setAttribute('style', 'float: left !important; background: #0D1014 !important; border: 1px solid #606060 !important; margin-left: 12px; margin-top: 2px; margin-bottom: 50px; padding: 4px !important; display: block;');
			id_('WR').innerHTML = Code+"<br/>";
			
			Tooltip(id_('pop_up_'), Tableau_Classement);
		} else {
			id_('WR').innerHTML = '<tr><td><b>Aucun résultat&nbsp;!</b></td></tr>';
			id_('WR').setAttribute('class', 'no_results');
		}
	}
	
	function Galaxie_Auto(R) {
		// Informations sur les joueurs :
		//id_('tem').value = STI(id_('tem').value) + 1;
		
		var table = id_('galaxytable'); if (table) {
			if (table.getAttribute('funny_galaxy') == 'done') {
				setTimeout(function() {Galaxie_Auto(true);}, 500); return;
			}
			table.setAttribute('funny_galaxy', 'done');
			
			if (Options.fg.pm || Options.fg.info || Options.fg.espio) {
				var Div = table.getElementsByClassName("TTInner");
				for (i = 0; i < Div.length; i++) {
					
					// Informations et planète mère joueurs :
					if (IndexOf(Div[i].innerHTML, 'writemessage') && (Options.fg.pm || Options.fg.info)) {
						Player_name = Div[i].innerHTML.match(/<h4><span class="spacing">[^:]*: <span>([^<]*)<\/span><\/span><\/h4>/);
						//testflo.innerHTML = "player="+Player_name;
	/*					
	if (Player_name && Options.fg.pm) {
		addElm(
			addElm(
				Div[i].getElementsByTagName('ul')[0], 'li', {}, ''
			), 
			'a', 
			{	href:'#',
				onclick:'PM_Joueur("'+tag_('a', Div[i])[0].href+'", "PM");',
				//onclick:'tag_('+a+', Div[i])[0].href+';',
				id:'lien_'+i
			}, 
			'Planète mère de '+Player_name[1]
		);
						}
						*/
						if (Player_name && Options.fg.info) {
							//addElm(addElm(Div[i].getElementsByTagName('ul')[0], 'li', {}, ''), 'a', {href:'#',onclick:'PM_Joueur("'+tag_('a', Div[i])[0].href+'", "Joueur");'}, 'Autres informations sur '+Player_name[1]);
							addElm(addElm(Div[i].getElementsByTagName('ul')[0], 'li', {}, ''), 'a', {href:'#',onclick:'Info_Joueur("'+Player_name[1]+'");'}, 'Autres informations sur '+Player_name[1]);
						}
					}
					// Lien pour Espionner... :
					if (Options.fg.espio) {
						Link = Div[i].innerHTML.match(/index\.php\?page=fleet1&amp;session=[a-z0-9]{12}&amp;galaxy=([0-9]*)&amp;system=([0-9]*)&amp;position=([0-9]*)&amp;type=([0-9]*)&amp;mission=1/);
						if (Link) {addElm(addElm(class_('ListLinks', Div[i])[0], 'li', {}, ''), 'a', {href:Mission(Link[1], Link[2], Link[3], Link[4], 6),title:'Espionner en ['+Link[1]+':'+Link[2]+':'+Link[3]+']',id:'lien_'+i}, 'Espionner...');}
					}
					// Lien pour Recycler :
					if (Options.fg.cdd_p) {
						Link = Div[i].innerHTML.match(/index\.php\?page=fleet1&amp;session=[a-z0-9]{12}&amp;galaxy=([0-9]*)&amp;system=([0-9]*)&amp;position=([0-9]*)&amp;type=([0-9]*)&amp;mission=3/);
						if (Link) {addElm(addElm(class_('ListLinks', Div[i])[0], 'li', {}, ''), 'a', {href:Mission(Link[1], Link[2], Link[3], Link[4], 8),title:'Recycler en ['+Link[1]+':'+Link[2]+':'+Link[3]+']',id:'lien_'+i}, 'Recycler');}
					}
				}
			}
			
			// Autres modifications :
			G = document.getElementsByName('galaxy')[0].value; S = document.getElementsByName('system')[0].value;
			C = uw.Surlignement();
			
			if (C[1] == G && C[2] == S && C[3] != 0 && Options.fg.planete) {Tps = class_('planetname', class_('row')[C[3]-1])[0]; Tps.setAttribute('style', 'color: blue;'); if (tag_('a', Tps)[0]) {tag_('a', Tps)[0].setAttribute('style', 'color: blue;');}}
			
			for (P = 1; P <= 15; P++) {
				Row = class_('row')[P-1];
				// Ajout d'un lien sur le bord, à gauche :
				if (Options.fg.cdd) {
					Position = class_('position', Row)[0];
					Position.innerHTML = '<a class="cdd'+((C[1] == G && C[2] == S && C[3] == P) ? 'p' : '')+'" href="'+URL_D+'/game/index.php?page=fleet1&galaxy='+G+'&system='+S+'&position='+P+'&type=2&mission=8" title="Recycler en ['+G+':'+S+':'+P+']">'+P+'</a>';
				}				
				if(class_('phalanxlink', Row)[0] && Options.fg.phatab){
					class_('phalanxlink', Row)[0].setAttribute("target", "_blank");
				}
					
				if (class_('planetname', Row)[0]) {
					// Modifications pour le nom de planète :
					if (Options.fg.blanc) {
						var Planet_Name = class_('planetname', Row)[0];
						Planet_Name.innerHTML = Planet_Name.innerHTML.replace('(', ' (');
					}
					
					// Ajout d'un lien pour les champs de débris :
					if (id_('debris'+P) && !CC && Options.fg.cc) {
						Debris = tag_('a', S_(tag_('li', id_('debris'+P)), -1))[0];
						Debris.setAttribute('onclick', '::delete::');
						Debris.setAttribute('href', URL_D+'/game/index.php?page=fleet1&galaxy='+G+'&system='+S+'&position='+P+'&type=2&mission=8&REC='+STI(S_(tag_('li', id_('debris'+P)), -2).innerHTML));
					}			
					
					// Coloration des joueurs forts :
					if (class_('status_abbr_active', Row)[0] && Options.fg.forts) {
						Elm = tag_('span', S_(tag_('td', Row), -5))[0];
						if (Elm.innerHTML.replace(/^\s*|\s*$/g,'') == Pseudo) {Rank = PRank;} else {Rank = STI(class_('rank', Row)[0].innerHTML);}
						if (Rank <= 300 & Rank != 0) {Elm.setAttribute('style', 'color:'+dec2hex(Math.ceil(Rank/2) + 15)+' !important;');}
					}
				}
			}
		}
		if (R) {setTimeout(function() {Galaxie_Auto(true);}, 500);}
	}
	
	if (URL_P == 'galaxy') {
		GM_addStyle('table#WR {position:absolute;left:-10px;} table#WR>td {width:100px;}');
		GM_addStyle('img#Chargement {float:right;position:relative;left:0px;top:-10px;}');
		GM_addStyle('a.cdd {color: #848484; text-decoration: none;} a:hover.cdd, a.cddp {color: blue; text-decoration: none;}');
		GM_addStyle('table.no_results {position:relative !important;left:0 !important;width:100% !important;} table.no_results>td {width:100% !important;}');
		GM_addStyle('a#pop_up_ {font-size:14px; text-decoration:none; color:#F1F1F1;} a:hover#pop_up_ {text-decoration:underline; color:#FFF;}');
		GM_addStyle('td#click {font-size:9px; height:20px; vertical-align:bottom;}');
		GM_addStyle('a.planete_link {color:#FFF;cursor:pointer;} a:hover.planete_link {text-decoration:underline;} tr#planete_mere td, tr#planete_mere a {font-weight:700;color:#F77;}');
		//GM_addStyle('tr.info {display:none;}');
		
		PRank = tag_('li', id_('bar'))[2].innerHTML; 
		if (PRank.match(/\(([0-9]*)\)/)) {PRank = PRank.match(/\(([0-9]*)\)/)[1]} else {PRank = 350;} 
		Pseudo = class_('textBeefy', id_('playerName'))[0].innerHTML; 
		CC = tag_('img', id_('officers'))[0].src == URL_D+'/game/img/layout/commander_ikon.gif';
		
		Gal = 0; Sys = 0; Pos = 0;
		Gal = document.getElementsByName('galaxy')[0].value;
		Sys = document.getElementsByName('system')[0].value;
		if (IndexOf(url, 'position=')) {Pos = url.match(/position=([0-9]{1,2})/)[1];}
		if (IndexOf(url, 'planet=')) {Pos = url.match(/planet=([0-9]{1,2})/)[1];}
		if (IndexOf(url, 'p3=')) {Pos = url.match(/p3=([0-9]{1,2})/)[1];}
		
		addElm(tag_('body')[0], 'input', {style:'display:none!important;',id:'sur',value:Gal+':'+Sys+':'+Pos}, '');
		//addElm(tag_('body')[0], 'input', {style:'',id:'tem',value:'0'}, '');
		setTimeout(function() {Galaxie_Auto(false);}, 400);
		setTimeout(function() {Galaxie_Auto(false);}, 800);
		setTimeout(function() {Galaxie_Auto(false);}, 1600);
		setTimeout(function() {Galaxie_Auto(true);}, 2400);
		
		Img = tag_('img', class_('menu_icon')[9])[0];
		Img.setAttribute('onclick', 'location.href = "'+URL_D+'/game/index.php?page=messages";');
		Img.setAttribute('onmouseover', 'this.src = "img/navigation/navi_ikon_alliance_b.gif";');
		Img.setAttribute('onmouseout', 'this.src = "img/navigation/navi_ikon_alliance_a.gif";');
		Img.setAttribute('style', 'cursor:pointer;');
		Img.setAttribute('title', 'Menu Messages');
	}
	
	if (URL_P == 'phalanx' && Options.fg.phalange) {
		Coor = url.match(/galaxy=([0-9]*)&system=([0-9]*)&position=([0-9]*)/);  
		D = new Date;
		document.title = 'Phalange en [' + Coor[1] + ':' + Coor[2] + ':' + Coor[3] + '] à ' + D.getHours() + 'h ' + D.getMinutes();
	}
	
/* Funny Galaxy */

/*** Funny Report ***/

	Copier_Coller = false;
	
	function Titre(n, e) {tps = id_('details'+n).title.match(/\|([^\(]*)\(/); if (tps) {return tps[1].replace(/^\s*|\s*$/g,'');} else {return e[n];}}
	function shipCount (m, c, d, cap) {
		//return Math.ceil ((Math.ceil (Math.max (m + c + d, Math.min (0.75 * (m * 2 + c + d), m * 2 + d)))) / cap);
		return Math.ceil ((Math.ceil (Math.max (m + c + d, Math.min (0.75 * (m * 2 + c + d), m * 2 + d)))) / cap);
	}
	function CDD(n, Nombre) {
		
		Metal = Couts[n].m * Couts.Taux * Nombre; Cristal = Couts[n].c * Couts.Taux * Nombre;
		Total = Metal + Cristal; return [Metal, Cristal, Total, Math.ceil(Total/20000)];
	}
	function MIP(n, Nombre, Attaque, TQ) {
		if (n != 502) {Vie = Math.ceil(((Couts[n].m + Couts[n].c) / 10) * Nombre) * (1 + 0.1 * TQ); return [Math.ceil(Vie / Attaque), Vie];}
		else {return [Nombre, Nombre*Attaque];}
	}
	function GetTag(table, value) {for (i in table) {if (table[i] == value) {return i;}} return false;}
	function SpeedSim(Code) {return Code.replace(/ /g, '%20').replace(/\/n/g, '%20').replace(/\ /g, '%20');}
	
	if (URL_P == 'shipyard') {
		Titres.fleet = {202: Titre(202, Titres.fleet), 203: Titre(203, Titres.fleet), 204: Titre(204, Titres.fleet), 205: Titre(205, Titres.fleet), 206: Titre(206, Titres.fleet), 207: Titre(207, Titres.fleet), 208: Titre(208, Titres.fleet), 209: Titre(209, Titres.fleet), 210: Titre(210, Titres.fleet), 211: Titre(211, Titres.fleet), 212: Titre(212, Titres.fleet), 213: Titre(213, Titres.fleet), 214: Titre(214, Titres.fleet), 215: Titre(215, Titres.fleet)};
		GM_setValue('titre_'+URL_N, uneval(Titres));
	}
	if (URL_P == 'defense') {
		Titres.defence = {401: Titre(401, Titres.defence), 402: Titre(402, Titres.defence), 403: Titre(403, Titres.defence), 404: Titre(404, Titres.defence), 405: Titre(405, Titres.defence), 406: Titre(406, Titres.defence), 407: Titre(407, Titres.defence), 408: Titre(408, Titres.defence), 502: Titre(502, Titres.defence), 503: Titre(503, Titres.defence)};
		GM_setValue('titre_'+URL_N, uneval(Titres));
	}
	if (URL_P == 'research') {
		Options.techno_arme = STI(class_('level', id_('details109'))[0].innerHTML); GM_setValue('options_funny_ogame_'+URL_N, uneval(Options));
		Titres[111] = class_('textlabel', id_('details111'))[0].innerHTML.replace(/(\s*$)/g, ''); GM_setValue('titre_'+URL_N, uneval(Titres));
	}
	if (URL_P == 'notices' && IndexOf(url, 'show=1') && !IndexOf(url, 'id=')) {
		Titre = GM_getValue('Titre_'+URL_D, ''); Espio = GM_getValue('Espio_'+URL_D, '');
		
		if (Titre != '' && Espio != '' ) {		
			document.getElementsByName('noticeSubject')[0].value = Titre;
			document.getElementsByName('noticeText')[0].value = Espio;
			document.getElementsByName('noticeText')[0].focus();
			uw.countChars();
		}
	}
	GM_setValue('Titre_'+URL_D, ''); GM_setValue('Espio_'+URL_D, '');
	if (URL_P == 'showmessage' && Find('//table[contains(@class,"material")]')) {
		// Recuperation des donnees :
		GM_addStyle('#messagebox .textWrapper, #messagebox {margin:0 !important;height:100% !important;} .infohead table tr th {width: 30px;} .infohead>table>tbody>tr>td {width: 100px;}');
		
		var Matos_org = Find('//table[contains(@class,"material")]');
			var Matos_txt = class_('area', Matos_org)[0].innerHTML;
			var Matos_res = tag_('td', tag_('table', Matos_org)[0]);
			var is_bandit = false;
			var is_honorable = false;
			
			Planet_name = Matos_txt.match(/[^ ]* [^ ]* ([^<]*)/)[1].replace(/^\s*|\s*$/g,'');
			P = Coor_(tag_('td', class_('infohead')[0])[2].innerHTML); G = P[1]; S = P[2]; P = P[3];
			
			Player_name = Matos_txt.match(/<span class=\"status.*\">(.*)<\/span>/)[1];
			if(Matos_txt.match("status_abbr_honorableTarget")) is_honorable = true;
			if(Matos_txt.match("rank_bandit")) is_bandit = true;
			//Player_title = Matos_txt.match(/\(([^ ]*) '/)[1];
			Player_title = "Joueur";
			Heur = Matos_txt.match(/([0-9]{2,2}):([0-9]{2,2}):([0-9]{2,2})/);
			Date = Matos_txt.match(/([0-9]{2,2})-([0-9]{2,2})/);
			
			var Ress = {
				M: {t: Matos_res[0].innerHTML, r: STI(Matos_res[1].innerHTML)},
				C: {t: Matos_res[2].innerHTML, r: STI(Matos_res[3].innerHTML)},
				D: {t: Matos_res[4].innerHTML, r: STI(Matos_res[5].innerHTML)},
				E: {t: Matos_res[6].innerHTML, r: STI(Matos_res[7].innerHTML)},
			}
		
		var Activ_org = Find('//table[contains(@class,"aktiv")]');
		
		var Autre_org = Find_T('//table[contains(@class,"fleetdefbuildings")]');
			if (Autre_org.snapshotItem(0)) {
				Stop = false;
				var Ligne = tag_('td', Autre_org.snapshotItem(0));
				var Titre_1 = tag_('th', Autre_org.snapshotItem(0))[0].innerHTML;
				var Flotte = new Array();
				
				Nombre_Vaisseaux = 0;
				for (f = 0; f < Ligne.length; f+=2) {
					Flotte[f/2] = new Array(Ligne[f].innerHTML, STI(Ligne[f+1].innerHTML));
					Nombre_Vaisseaux += Flotte[f/2][1];
				}
			} else {Flotte = '';}
			if (Autre_org.snapshotItem(1)) {
				Stop = false;
				var Ligne = tag_('td', Autre_org.snapshotItem(1));
				var Titre_2 = tag_('th', Autre_org.snapshotItem(1))[0].innerHTML;
				var Defense = new Array();
				
				for (f = 0; f < Ligne.length; f+=2) {Defense[f/2] =  new Array(Ligne[f].innerHTML, STI(Ligne[f+1].innerHTML));}
			} else {Defense = '';}
			if (Autre_org.snapshotItem(2)) {
				Stop = false;
				var Ligne = Autre_org.snapshotItem(2).getElementsByTagName('td');
				var Titre_3 = Autre_org.snapshotItem(2).getElementsByTagName('th')[0].innerHTML;
				var Batime = new Array();
				
				for (f = 0; f < Ligne.length; f+=2) {
					Batime[f/2] =  new Array(Ligne[f].innerHTML, STI(Ligne[f+1].innerHTML));
				}
			} else {Batime = '';}
			if (Autre_org.snapshotItem(3)) {
				Stop = false;
				var Ligne = Autre_org.snapshotItem(3).getElementsByTagName('td');
				var Titre_4 = Autre_org.snapshotItem(3).getElementsByTagName('th')[0].innerHTML;
				var Techno = new Array();
				
				for (f = 0; f < Ligne.length; f+=2) {
					Techno[f/2] =  new Array(Ligne[f].innerHTML, STI(Ligne[f+1].innerHTML));
				}
			} else {Techno = '';}
		
		var Destr_org = Find('//tr[td[contains(@class,"defense")]]');
		
		// Type de la planete :
		Liste_Missions = class_('attack')[0]; T = tag_('a', Liste_Missions)[0].href.match(/type=([1-3]{1})/)[1];
		
		// Calculs :
		var Pillage;
		var pourcentage;
		var pillage_metal;
		var pillage_cristal;
		var pillage_deut;
		var PT;
		var GT
		if(is_bandit){
			Pillage = Ress.M.r + Ress.C.r + Ress.D.r;
			pourcentage = 100;
			pillage_metal = Sep(Ress.M.r);
			pillage_cristal = Sep(Ress.C.r);
			pillage_deut = Sep(Ress.D.r);
			PT = shipCount(Ress.M.r, Ress.C.r, Ress.D.r, 2500);
		 	GT = shipCount(Ress.M.r, Ress.C.r, Ress.D.r, 25000);
		} else if(is_honorable){
			Pillage = Math.floor(Ress.M.r/1.5) + Math.floor(Ress.C.r/1.5) + Math.floor(Ress.D.r/1.5);
			pourcentage = 75;
			pillage_metal = Sep(Math.floor(Ress.M.r/1.5));
			pillage_cristal = Sep(Math.floor(Ress.C.r/1.5));
			pillage_deut = Sep(Math.floor(Ress.D.r/1.5));
			PT = shipCount(Ress.M.r/1.5, Ress.C.r/1.5, Ress.D.r/1.5, 5000);
		 	GT = shipCount(Ress.M.r/1.5, Ress.C.r/1.5, Ress.D.r/1.5, 25000);
		} else{
			Pillage = Math.floor(Ress.M.r/2) + Math.floor(Ress.C.r/2) + Math.floor(Ress.D.r/2);
			pourcentage = 50;
			pillage_metal = Sep(Math.floor(Ress.M.r/2));
			pillage_cristal = Sep(Math.floor(Ress.C.r/2));
			pillage_deut = Sep(Math.floor(Ress.D.r/2));
			PT = shipCount(Ress.M.r/2, Ress.C.r/2, Ress.D.r/2, 5000);
		 	GT = shipCount(Ress.M.r/2, Ress.C.r/2, Ress.D.r/2, 25000);
		}
		// Creation d'une zone d'informations :
		Div = Find('//div[@class="infohead"]');
		Div.innerHTML = '<table><tr><td style="width:15px;"></td><td style="width:200px;border:1px solid #636363;">' + Div.innerHTML + '</td><td style="width:15px;"></td><td style="border:1px solid #636363;"><table id="info_pp"></table></td><td style="width:15px;"></td></tr></table>';
		Table_info = id_('info_pp');
		
		// War-Rider :
		class_('area', Matos_org)[0].innerHTML = Matos_txt.replace(Player_name, '<a href="http://www.war-riders.de/'+URL_N+'/'+Uni()+'/details/player/'+Player_name.replace(/ /g, '%20')+'" target="_blank" id="player_name">'+Player_name+'</a>');
		
		// Modification du RE :
		var Matos_org = Find('//table[contains(@class,"material")]');
			var Matos_txt = Matos_org.getElementsByClassName('area')[0].innerHTML;
				addElm(Table_info, 'tr', {}, '').innerHTML =  '<td><a target="_top" href="'+Mission(G, S, P, 1, 1, '&amp;PT='+(PT))+'" >Petits Transporteurs</a></td><td>'+Sep(PT)+'</td><td><a target="_top" href="'+Mission(G, S, P, 1, 1, '&amp;GT='+(GT))+'">Grands Transporteurs</a></td><td>'+Sep(GT)+'</td>';				
				addElm(Table_info, 'tr', {}, '').innerHTML =  '<th colspan="4" class="area" style="text-align:left;">Ressources à piller ('+ pourcentage +'%) :</th>';
				addElm(Table_info, 'tr', {}, '').innerHTML =  '<td>'+Ress.M.t+'</td><td>'+pillage_metal+'</td><td>'+Ress.C.t+'</td><td>'+pillage_cristal+'</td>';
				addElm(Table_info, 'tr', {}, '').innerHTML =  '<td>'+Ress.D.t+'</td><td>'+pillage_deut+'</td><td><b>Total</b></td><td><b>'+Sep(Pillage)+'</b></td>';
		
		// Ajout de la valeur du CDD des Vaisseaux :
		if (Flotte != '') {
			var Ligne = tag_('table', class_('note')[0])[3];
			var C_Total = new Array(0, 0, 0);
			for (f = 0; f/2 < Flotte.length; f += 2) {
				Champs = CDD(GetTag(Titres.fleet, Flotte[f/2][0]), Flotte[f/2][1]);
				C_Total[0] += Champs[0]; C_Total[1] += Champs[1]; C_Total[2] += Champs[2];
				if (Champs) {
					Txt = '<b id="title">'+Flotte[f/2][0]+' ('+Sep(Flotte[f/2][1])+')</b><center>Métal : '+Sep(Champs[0])+'<br />Cristal : '+Sep(Champs[1])+'<br />Total : <span style=color:green;>'+Sep(Champs[2])+'</span> (<span style=color:red;>'+Sep(Champs[3])+'</span> recycleur'+(Champs[3] > 1 ? 's' : '')+')</center>';
					Tooltip(tag_('td', Ligne)[f], Txt); Tooltip(tag_('td', Ligne)[f+1], Txt);
				} else {f = Flotte.length;}
			}
			Rec = Math.ceil(C_Total[2]/20000);
			Tooltip(class_('area', Ligne)[0], '<b id="title">Informations Générales</b><center>Nombre total de vaisseaux : '+Sep(Nombre_Vaisseaux)+'<br />Métal : '+Sep(C_Total[0])+'<br />Cristal : '+Sep(C_Total[1])+'<br />Total : <span style=color:green;>'+Sep(C_Total[2])+'</span> (<span style=color:red;>'+Sep(Rec)+'</span> recycleur'+(Rec > 1 ? 's' : '')+')</center>');
		}
		
		// Ajout du nombre de MIP :
		if (Defense != '') {
			var TA = Options.techno_arme;
			if (Autre_org.snapshotItem(3)) {TQ = Autre_org.snapshotItem(3).innerHTML.match(RegExp('<td class="key">'+Titres[111]+'<\\/td><td class="value">([0-9]{1,2})<\\/td>', '')); TQ = (TQ ? STI(TQ[1]) : 0);} else {TQ = 0;}
			if (TA == 0 || TQ == 0) {TA = 0; TQ = 0;} Attaque = 12000 + (1200 * TA);
			var Ligne = tag_('table', class_('note')[0])[4]; var Vie_Total = 0;
			for (f = 0; f/2 < Defense.length; f += 2) {
				Missiles = MIP(GetTag(Titres.defence, Defense[f/2][0]), Defense[f/2][1], Attaque, TQ);
				if (Missiles) {
					Txt = '<b id="title">'+Defense[f/2][0]+' ('+Sep(Defense[f/2][1])+')</b><center>'+Titres.defence[503]+' : <span style=color:red;>'+Sep(Missiles[0])+'</span></center>';
					Tooltip(tag_('td', Ligne)[f], Txt); Tooltip(tag_('td', Ligne)[f+1], Txt); Vie_Total += Missiles[1];
				} else {f = Defense.length;}
			}
			Tooltip(class_('area', Ligne)[0], '<b id="title">Informations Générales</b><center>'+Titres.defence[503]+' : <span style=color:red;>'+Sep(Math.ceil(Vie_Total / Attaque))+'</span></center>');
		}
		
		addElm(tag_('body')[0], 'div', {id:'tooltip'}, '');
		
		// Génération d'un Rapport text :
		RE = Matos_txt.replace(/<[^>]*>/g, '')+'\n\n';
		RE += Ress.M.t+' ' + Sep(Ress.M.r) + '\n';
		RE += Ress.C.t+' ' + Sep(Ress.C.r) + '\n';
		RE += Ress.D.t+' ' + Sep(Ress.D.r) + '\n';
		RE += Ress.E.t+' ' + Sep(Ress.E.r) +  '\n';
		if (Flotte) {RE += '\n\n'+Titre_1+'\n';for (f = 0; f < Flotte.length; f++) {RE += '\n' + Flotte[f][0] + ' ' + Sep(Flotte[f][1]);}}
		if (Defense) {RE += '\n\n\n'+Titre_2+'\n';for (f = 0; f < Defense.length; f++) {RE += '\n' + Defense[f][0] + ' ' + Sep(Defense[f][1]);}}
		if (Batime) {RE += '\n\n\n'+Titre_3+'\n';for (f = 0; f < Batime.length; f++) {RE += '\n' + Batime[f][0] + ' ' + Sep(Batime[f][1]);}}
		if (Techno) {RE += '\n\n\n'+Titre_4+'\n';for (f = 0; f < Techno.length; f++) {RE += '\n' + Techno[f][0] + ' ' + Sep(Techno[f][1]);}}
		
		// Sauvegarde temporaire :
		GM_setValue('Titre_'+URL_D, Planet_name + ' ['+G+':'+S+':'+P+']');GM_setValue('Espio_'+URL_D, RE);
		
		// Ajout de la fonction Copier/Coller du Rapport :
		if (Copier_Coller) {
			Bouton = '<object width="60" height="20">' +
						'<param name=FlashVars value="txtToCopy=' + RE + '">' +
						'<param name="movie" value="http://localhost/copyButton.swf">' +
						'<embed src="http://localhost/copyButton.swf" flashvars="txtToCopy=' + RE + '" width="60" height="20"></embed>' +
					 '</object>';
			addElm(class_('toolbar')[0], 'li', {style:'width:80px !important;',class:"delete"}, Bouton);
		}
		
		// Ajout des différentes missions :
		Code = '';
		Code += '<td><a class="buttonSave" target="_parent" href="'+Mission(G, S, P, T, 1)+'"><span>Attaquer</span></a></td>';
		Code += '<td><a class="buttonSave" target="_parent" href="'+Galaxie(G, S, P, '&planetType=1&doScan=1')+'" style="cursor:pointer;"><span>Espionner</span></a></td>';
		Code += '<td><a class="buttonSave" target="_parent" href="'+Mission(G, S, P, T, 6)+'"><span>Espionner...</span></a></td>';
		Code += '<td><a class="buttonSave" target="_parent" href="'+Mission(G, S, P, 2, 8)+'"><span>Exploiter</span></a></td>';
		//Code += '<td><a class="buttonSave" target="_parent" onclick="document.getElementById(\'speed\').submit();" style="cursor:pointer;"><span style="color:red">Simuler</span></a><div id="SpeedSim_DIV" style="display:none !important;"><form action="http://websim.speedsim.net/index.php?lang='+URL_N+'" method="post" target="_blank" name="speedsim_form" id="speed"><input name="report" value="'+SpeedSim(RE)+'" type="text" id="SpeedSim_input"></form></div></td>';
		//Code += '<td><a class="buttonSave" target="_blank" href="index.php?page=notices&session='+URL_S+'&show=1" title="Ajouter dans vos notes en un clique !"><span style="color:red">Notes</span></a></td>';
		Code += '<td><a class="buttonSave" target="_blank" href="index.php?page=notices&show=1" title="Ajouter dans vos notes en un clique !"><span style="color:red">Notes</span></a></td>';
		Liste_Missions.innerHTML = '<table><tr>'+Code+'</tr></table>';
		
		// Generation d'un RE :
		var Tableau_Mission = Find('//table[contains(@class,"defenseattack")]/tbody');
		
		RE = "[CENTER][FONT=comic sans ms][SIZE=20][COLOR=#FFFFFF]Espionnage de la[/COLOR] [COLOR=#17F20D]" + Planet_name + "[/COLOR] [COLOR=#17D959]" + '['+G+':'+S+':'+P+']' + "[/COLOR][/SIZE][SIZE=16] [COLOR=#FFFFFF]le[/COLOR] [COLOR=green]" + Date[0] + '[/COLOR][COLOR=#FFFFFF] à [/COLOR][COLOR=green]' + Heur[0] + "[/COLOR][/SIZE]\n";
		RE += '[SIZE=16][COLOR=#FFFFFF]'+Player_title+' :[/COLOR] [URL=http://www.war-riders.de/'+URL_N+'/'+URL_U+'/details/player/'+Player_name+'][COLOR=#178CD9][B]' + Player_name + '[/B][/COLOR][/URL][/SIZE][/FONT]' + '\n';
		RE += '\n\n';
		RE += '[FONT=comic sans ms][SIZE=18][B][COLOR=#FFFFFF][U]Matières premières[/U][/COLOR][/B][/SIZE][/FONT]' + '\n\n';
		RE += '[COLOR=#FFFFFF]'+Ress.M.t+'[/COLOR] [COLOR=red][B]' + Sep(Ress.M.r) + '[/B][/COLOR]' + '\n';
		RE += '[COLOR=#FFFFFF]'+Ress.C.t+'[/COLOR] [COLOR=red][B]' + Sep(Ress.C.r) + '[/B][/COLOR]' + '\n';
		RE += '[COLOR=#FFFFFF]'+Ress.D.t+'[/COLOR] [COLOR=red][B]' + Sep(Ress.D.r) + '[/B][/COLOR]' + '\n';
		RE += '[COLOR=#FFFFFF]'+Ress.E.t+'[/COLOR] [COLOR=red][B]' + Sep(Ress.E.r) + '[/B][/COLOR]' + '\n';
		
		if (Flotte) {
			RE += "\n\n[FONT=comic sans ms][B][COLOR=#FFFFFF][SIZE=18][U]"+Titre_1+"[/SIZE][/U][/COLOR][/B][/FONT]" + "\n";
			RE += (Nombre_Vaisseaux > 0 ? "[FONT=comic sans ms][COLOR=#FFFFFF][SIZE=14]Nombre de vaisseaux : [/COLOR][COLOR=red][B]"+Sep(Nombre_Vaisseaux)+"[/B][/SIZE][/COLOR][/FONT]" + "\n\n" : '');
			for (f = 0; f < Flotte.length; f++) {RE += "[COLOR=#FFFFFF]" + Flotte[f][0] + " :[/COLOR] [COLOR=red][B]" + Sep(Flotte[f][1])+ "[/B][/COLOR]\n";}
			RE += (Nombre_Vaisseaux > 0 ? "\n[COLOR=#FFFFFF]Champ de Débris : [/COLOR][COLOR=red][B]"+Sep(C_Total[2])+"[/B][/COLOR]\n[COLOR=#FFFFFF]Métal : [/COLOR][COLOR=red][B]"+Sep(C_Total[0])+"[/B][/COLOR][COLOR=#FFFFFF] / Cristal : [/COLOR][COLOR=red][B]"+Sep(C_Total[1])+"[/B][/COLOR]" + "\n" : '');
		}
		if (Defense) {
			RE += "\n\n[FONT=comic sans ms][SIZE=18][B][COLOR=#FFFFFF][U]"+Titre_2+"[/U][/COLOR][/B][/SIZE][/FONT]" + "\n\n";
			for (f = 0; f < Defense.length; f++) {RE += "[COLOR=#FFFFFF]" + Defense[f][0] + " :[/COLOR] [COLOR=red][B]" + Sep(Defense[f][1])+ "[/B][/COLOR]\n";}
		}
		if (Batime) {					
			RE += "\n\n[FONT=comic sans ms][SIZE=18][B][COLOR=#FFFFFF][U]"+Titre_3+"[/U][/COLOR][/B][/SIZE][/FONT]" + "\n\n";
			for (f = 0; f < Batime.length; f++) {RE += "[COLOR=#FFFFFF]" + Batime[f][0] + " :[/COLOR] [COLOR=red][B]" + Sep(Batime[f][1])+ "[/B][/COLOR]\n";}
		}
		if (Techno) {
			RE += "\n\n[FONT=comic sans ms][SIZE=18][B][COLOR=#FFFFFF][U]"+Titre_4+"[/U][/COLOR][/B][/SIZE][/FONT]" + "\n\n";
			for (f = 0; f < Techno.length; f++) {RE += "[COLOR=#FFFFFF]" + Techno[f][0] + " :[/COLOR] [COLOR=red][B]" + Sep(Techno[f][1])+ "[/B][/COLOR]\n";}
		}
		
		RE += "\n\n";
		RE += "[SIZE=12][FONT=comic sans ms][URL=http://board.ogame.fr/thread.php?threadid=856291]Rapport Généré par Funny Report[/URL][/FONT][/SIZE][/CENTER]";				
		
		GM_addStyle('#affrap, #affrap a {text-align:center; color:#9999EE !important; font-size:10px; text-decoration:none !important;} #affrap a:hover {text-decoration:underline !important; cursor:pointer;} #rapport textarea {background-color:#13181d; border: 1px solid #000000; color:#848484; font-size:10px; width:100%; text-align:center;}');
		
		addElm(addElm(Tableau_Mission, 'tr', {}, ''), 'td', {colspan:'6',id:'affrap'}, '<a onclick="$(\'#rapport\').fadeIn(1000);">Afficher/Masquer le Rapport d\'espionnage formaté</a>');
		addElm(addElm(Tableau_Mission, 'tr', {}, ''), 'td', {colspan:'6',style:'display:none;',id:'rapport'}, '<textarea readonly="true" onClick="javascript:this.select();" title="Voici le Rapport d\'espionnage formaté ! Cliquez dessus et faites Ctrl+C pour le copier. Ensuite, collez-le sur le forum de votre choix !">'+RE+'</textarea>');

	}

/* Funny Report */


/*** Funny Fleet ***/
	
	if (URL_P == 'fleet1' && Options.ff.flotte_) {
		testflo.innerHTML = "salut";
		function Load(ou, quoi) {ou.focus(); if (quoi) {ou.value = quoi[1];} ou.select();}
		Capacite = function (typ) {
			var Stock = Math.ceil(STI(id_('resources_metal').innerHTML) + STI(id_('resources_crystal').innerHTML) + STI(id_('resources_deuterium').innerHTML))+1;
			Dis = {
				202: STI(tag_('a', id_('button202'))[0].title),
				203: STI(tag_('a', id_('button203'))[0].title),
				204: STI(tag_('a', id_('button204'))[0].title),
				205: STI(tag_('a', id_('button205'))[0].title),
				206: STI(tag_('a', id_('button206'))[0].title),
				207: STI(tag_('a', id_('button207'))[0].title),
				208: STI(tag_('a', id_('button208'))[0].title),
				209: STI(tag_('a', id_('button209'))[0].title),
				210: STI(tag_('a', id_('button210'))[0].title),
				211: STI(tag_('a', id_('button211'))[0].title),
				213: STI(tag_('a', id_('button213'))[0].title),
				214: STI(tag_('a', id_('button214'))[0].title),
				215: STI(tag_('a', id_('button215'))[0].title)
			};
			Sel = {
				202: STI(id_('ship_202').value),
				203: STI(id_('ship_203').value),
				204: STI(id_('ship_204').value),
				205: STI(id_('ship_205').value),
				206: STI(id_('ship_206').value),
				207: STI(id_('ship_207').value),
				
				208: STI(id_('ship_208').value),
				209: STI(id_('ship_209').value),
				210: STI(id_('ship_210').value),
				211: STI(id_('ship_211').value),
				213: STI(id_('ship_213').value),
				214: STI(id_('ship_214').value),
				215: STI(id_('ship_215').value)
			};
			Cap = {
				202: 5000,
				203: 25000,
				204: 50,
				205: 100,
				206: 800,
				207: 1500,
				208: 7500,
				209: 20000,
				210: 0,
				211: 500,
				213: 2000,
				214: 100000,
				215: 750
			};
			if (typ == true) {Nbr = Dis;} else {Nbr = Sel;} Capa = 0;
			for (i in Nbr) {Capa += Nbr[i] * Cap[i];}
			return (Capa > Stock ? Sep(Capa) : '<font style="color:red;">'+Sep(Capa)+'</font>');
		}
		uw.Actualise = function () {tps = Capacite(false); id_('cap').innerHTML = (STI(tps) != 0 ? tps : Capacite(true));}
		uw.Vaisseaux = function Vaisseaux(Nbr, Type) {name_(Type)[0].focus(); name_(Type)[0].value = Nbr; uw.checkShips('shipsChosen');}
		
		if (IndexOf(url, 'mission=8')) {
			
			Load(name_('am209')[0], url.match(/&REC=([0-9]*)/));
		}
		if (IndexOf(url, 'mission=6')) {Load(name_('am210')[0], {1:(STI(class_('level', id_('button210'))[0].innerHTML) > Options.fo.sondes ? Options.fo.sondes : STI(class_('level', id_('button210'))[0].innerHTML))});}
		if (IndexOf(url, '&PT=')) {Load(name_('am202')[0], url.match(/&PT=([0-9]*)/));}
		if (IndexOf(url, '&GT=')) {Load(name_('am203')[0], url.match(/&GT=([0-9]*)/));}
		uw.initFleet1();
		
		Div = class_('allornonewrap')[0];
		if (Div) {GM_addStyle('#Ressources {left:30px; top:16px; width:390px !important; position:absolute; border: 1px solid #030303;} div.allornonewrap .secondcol {position: relative !important; left:410px !important;} span#pt, span#gt {cursor:pointer; text-decoration:none;} span:hover#pt, span:hover#gt {cursor:pointer; text-decoration:underline;} #cap {color:green;}'); O = true;} else {Div = Find('//div[@id="warning"]'); O = false;}
		GM_addStyle('#Ressources a {color: #848484; text-decoration: none;} #Ressources a:hover {text-decoration: underline; color: #FFFFFF;} #Ressources {text-align:center; vertical-alignement: middle; padding-top:8px; padding-bottom:8px; width:100%; color:#838383; font-size:11px;} span#pt span {color:yellow;} span#gt span {color:red;} span#to {color:#6f9fc8;}');
		
		var Stock = Math.ceil(STI(id_('resources_metal').innerHTML) + STI(id_('resources_crystal').innerHTML) + STI(id_('resources_deuterium').innerHTML))+1;
		Code = 
			(O ? 'Capacitée de fret : <span id="cap">'+Capacite(true)+'</span> sur ' : 'Vous avez ')+'<span id="to">'+Sep(Stock)+'</span>.<br />' + 
			'(<span id="pt"'+(O ? 'onclick="Vaisseaux('+Math.ceil(Stock/5000)+', \'am202\');initFleet1();Actualise();"' : '')+'>Petit Transporteur : <span>' + Sep(Math.ceil(Stock/5000)) + "</span></span>" + " / " +
			'<span id="gt"'+(O ? 'onclick="Vaisseaux('+Math.ceil(Stock/25000)+', \'am203\');initFleet1();Actualise();"' : '')+'>Grand Transporteur : <span>' + Sep(Math.ceil(Stock/25000)) + "</span></span>)";
		addElm(Div, 'div', {id:'Ressources'}, Code);
		
		rf = 'return false'; arf = 'Actualise(); return false';
		Input = class_('fleetValues');						for (i=0; i<13; i++) {if (Input[i]) {Input[i].setAttribute('onkeyup', Input[i].getAttribute('onkeyup').replace(rf, arf)); Input[i].setAttribute('onFocus', Input[i].getAttribute('onFocus').replace(rf, arf));}}
		//Input = tag_('a', class_('allornonewrap')[0]);		for (i in Input) {Input[i].setAttribute('onclick', Input[i].getAttribute('onclick').replace(rf, arf));}
		Input = class_('tipsStandard');						for (i=0; i<53; i++) {if (Input[i].getAttribute('onclick')) {Input[i].setAttribute('onclick', Input[i].getAttribute('onclick').replace(rf, arf));}}
		Input = Find_T('//a[contains(@class,"max tips")]');	for (i = 0; i < Input.snapshotLength; i++) {if (Input.snapshotItem(i).getAttribute('onclick')) {Input.snapshotItem(i).setAttribute('onclick', Input.snapshotItem(i).getAttribute('onclick').replace(rf, arf));}}
	}
	
	if (URL_P == 'fleet2' && Options.ff.flotte__) {
		Options = tag_('option', id_('speed'));	
		for (i in Options) {
			Options[i].setAttribute('onmousemove', 'updateVariables()');
		}
	}
	
	if (URL_P == 'fleet3' && Options.ff.flotte___) {
		uw.Easy = function (n) {
			id_(n).value = id_(n).value.replace(/[k|K|+]/g, '000').replace(/[m|M|*]/g, '000000');
			if (IndexOf(id_(n).value, '-')) {id_(n).value = STI(id_('resources_'+n).innerHTML) - STI(id_(n).value.replace(/[-]/g, '')) - STI(id_('consumption').innerHTML); }
			uw.checkRessourceByType(n); uw.updateVariables();
		}
		
		id_('metal').setAttribute('onkeyup', 'Easy("metal");'+id_('metal').getAttribute('onkeyup'));
		id_('crystal').setAttribute('onkeyup', 'Easy("crystal");'+id_('crystal').getAttribute('onkeyup'));
		id_('deuterium').setAttribute('onkeyup', 'Easy("deuterium");'+id_('deuterium').getAttribute('onkeyup'));	
	}

/* Funny Fleet */


/*** Funny Constructions ***/
	
	if (URL_P == 'resources' || URL_P == 'shipyard' || URL_P == 'station' || URL_P == 'defense') {
		function Cout(Elm, Prix, Dispo) {Elm.innerHTML = Sep(Prix); Elm.setAttribute('class', (Prix > Dispo ? 'missing_resource' : ''));}
		function Adapter(position, num, titre) {
			Lien = tag_('a', class_(({'resources':'supply','station':'station'}[URL_P])+num)[0])[0].getAttribute('onclick');
			if (Lien) {addElm(Div, 'div', {style:position,onclick:'sendBuildRequest("'+Lien.match(/sendBuildRequest\('([^']*)'\)/)[1]+'");',title:titre,class:'bouton'}, '');}
		}
		
		uw.Construire = function (n) {location.href = tag_('a', class_(({'resources':'supply','station':'station'}[URL_P])+n)[0])[0].href;};
		uw.Fabriquer = function (n, q) {
			tag_('form')[0].innerHTML += '<div style="display:none;"><input type="hidden" name="modus" value="1"><input type="hidden" name="type" value="'+n+'"><input id="number" type="text" size="5" name="menge" value="'+q+'" onfocus="clearInput(this.id);" onkeyup="checkIntInput(this.id, 1, null);"></div>';
			tag_('form')[0].submit();
		};
		uw.Modification = function () {
			var Input = id_('number');
			if (!Input || Input.getAttribute('funny_constro') == 'done') {return;}
			Input.setAttribute('funny_constro', 'done');
			
			Time_ = class_('time', id_('action'))[0].innerHTML.replace(/^\s*|\s*$/g,''); Time = 0; //alert(Time);
				Time += (Time_.match(/([0-9]*)s /) ? STI(Time_.match(/([0-9]*)s /)[1])*604800 : 0); //alert(Time);
				Time += (Time_.match(/([0-9]*)j/) ? STI(Time_.match(/([0-9]*)j/)[1])*86400 : 0); //alert(Time);
				Time += (Time_.match(/([0-9]*)h/) ? STI(Time_.match(/([0-9]*)h/)[1])*3600 : 0); //alert(Time);
				Time += (Time_.match(/([0-9]*)m/) ? STI(Time_.match(/([0-9]*)m/)[1])*60 : 0); //alert(Time);
				Time += (Time_.match(/([0-9]*)s/) ? STI(Time_.match(/([0-9]*)s/)[1]) : 0); //alert(Time);
			
			Input.setAttribute('onkeyup', Input.getAttribute('onkeyup')+'Simulation(this.value, '+Time+')');
		}
		uw.Simulation = function (Nbr, Time) {
			Div = id_('detail'); Num = tag_('input', id_('detail'))[1].value;
			Date_Act = new Date().getTime();
			Date_de_fin = new Date(Date_Act+((Time*Nbr)*1000));
			if(URL_P == 'resources'){
				val_sat = document.getElementById("solarSatEnergyInfo").firstChild.nodeValue.match(/[0-9]{1,2}/);
				class_('time', Div)[0].innerHTML = (Temps_STR(Time*Nbr) + '<br><span style="font-weight:normal;">(fin ' + DTS(Date_de_fin) + ')</span> <br/>  <span style="font-weight:normal; color: #848484;">Production : </span><span style="font-weight:normal; color: #99CC00;">+' + val_sat*Nbr + '</span>');
			} else {
				class_('time', Div)[0].innerHTML = (Temps_STR(Time*Nbr) + '<br><span style="font-weight:normal;">(fin ' + DTS(Date_de_fin) + ')</span>');
			}			
			
			Span = tag_('span', tag_('ul', Div)[0]); ACT = {m:STI(id_('resources_metal').innerHTML), c:STI(id_('resources_crystal').innerHTML), d:STI(id_('resources_deuterium').innerHTML)};
			if (Span[0]) {Cout(Span[0], Couts[Num].m*Nbr, ACT.m);}
			if (Span[1]) {Cout(Span[1], Couts[Num].c*Nbr, ACT.c);}
			if (Span[2]) {Cout(Span[2], Couts[Num].d*Nbr, ACT.d);}
			if (Num == 210) {Cout(Span[0], Couts[Num].c*Nbr, ACT.c);}
			if (Num == 212) {
				Cout(Span[0], Couts[Num].c*Nbr, ACT.c);
				Cout(Span[1], Couts[Num].d*Nbr, ACT.d);
				if (Phrase == '') {Phrase = class_('solarSatEnergyInfo', 0).innerHTML;} Prod = STI(Phrase) * Nbr;
				class_('solarSatEnergyInfo', 0).innerHTML = (Phrase.replace(STI(Phrase), '<span id="green"><b>'+STI(Phrase)+'</b></span>') + ' Energie : <b>'+Sep(Prod, true)+'</b> soit <b>'+Sep(Prod + STI(id_('resources_energy').innerHTML), true)+'</b>.');
			}
			if (Num == 502) {
				Cout(Span[0], Couts[Num].m*Nbr, ACT.m);
				Cout(Span[1], Couts[Num].d*Nbr, ACT.d);
			}
		}
		
		Style_Bouton = 'div.bouton {cursor:pointer;position:absolute;}'
		if (URL_P == 'resources' && Options.fc.ress) {
			Bat = {
				1 : STI(class_('level', class_('supply1')[0])[0].innerHTML),
				2 : STI(class_('level', class_('supply2')[0])[0].innerHTML),
				3 : STI(class_('level', class_('supply3')[0])[0].innerHTML),
				4 : STI(class_('level', class_('supply4')[0])[0].innerHTML),
				12 : STI(class_('level', class_('supply12')[0])[0].innerHTML)
			}
			
			if (IndexOf(id_('resources_energy').innerHTML, '-')) {
				E = STI(id_('resources_energy').innerHTML);
				GM_xmlhttpRequest({
					method: "GET",
					//url: URL_D+'/game/index.php?page=resources&session='+URL_S+'&ajax=1&type=212',
					url: URL_D+'/game/index.php?page=resources&ajax=1&type=212',
					onload: function (responseDetails) {
						P = Math.ceil(E / STI(responseDetails.responseText.match(/ ([0-9]{1,}) /)[1]));
						addElm(Div, 'div', {style:'top:5px;left:50px;width:80px;height:30px;',onclick:'Fabriquer("212", '+P+');',title:'Combler votre manque d\'énergie avec '+Sep(P)+' satellites.',class:'bouton'}, '');
					}
				});
			}
			
			Div = id_('planet');
			if (Bat[1] > 0) {Adapter('top:135px;left:395px;width:250px;height:135px;color:red !important;', 1, 'Améliorer votre mine de métal !');}
			if (Bat[2] > 0) {Adapter('top:150px;left:0;width:200px;height:140px;color:red !important', 2, 'Améliorer votre mine de cristal !');}
			if (Bat[3] > 0) {Adapter('top:35px;left:460px;width:80px;height:85px;color:red !important', 3, 'Améliorer votre synthétiseur de deutérium !');}
			if (Bat[4] > 0) {Adapter('top:40px;left:30px;width:100px;height:80px;color:red !important', 4, 'Améliorer votre centrale électrique solaire !');}
			if (Bat[12] > 0) {Adapter('top:40px;left:160px;width:150px;height:80px;color:red !important', 12, 'Améliorer votre centrale électrique de fusion !');}
			GM_addStyle(Style_Bouton);
		}
		if (URL_P == 'station' && Options.fc.inst) {
			Bat = {
				14 : STI(class_('level', class_('station14')[0])[0].innerHTML),
				21 : STI(class_('level', class_('station21')[0])[0].innerHTML),
				31 : STI(class_('level', class_('station31')[0])[0].innerHTML),
				34 : STI(class_('level', class_('station34')[0])[0].innerHTML),
				15 : STI(class_('level', class_('station15')[0])[0].innerHTML),
				33 : STI(class_('level', class_('station33')[0])[0].innerHTML)
			}
			
			Div = id_('planet');
			if (Bat[14] > 0) {Adapter('top:145px;left:0;width:150px;height:100px;', 14, 'Améliorer votre usine de robots !');}
			if (Bat[33] > 0) {Adapter('top:150px;left:450px;width:202px;height:150px;', 33, 'Améliorer votre terraformeur !');}
			if (Bat[21] > 0) {Adapter('top:40px;left:400px;width:200px;height:140px;', 21, 'Améliorer votre chantier spatial !');}
			if (Bat[31] > 0) {Adapter('top:60px;left:160px;width:220px;height:230px;', 31, 'Améliorer votre laboratoire !');}
			if (Bat[34] > 0) {Adapter('top:20px;left:10px;width:120px;height:120px;', 34, 'Améliorer votre dépôt de ravitaillement !');}
			if (Bat[15] > 0) {Adapter('top:60px;left:160px;width:110px;height:120px;', 15, 'Améliorer votre usine de nanites !');}
			GM_addStyle(Style_Bouton);
		}
		if ((Options.fc.cs == true && URL_P == 'shipyard') || (Options.fc.def == true && URL_P == 'defense') || (Options.fc.def == true && URL_P == 'resources')) {Interval = setInterval('Modification()', 250);}
	}

/* Funny Constructions */

