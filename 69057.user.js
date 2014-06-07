scr_meta=<><![CDATA[

// ==UserScript==

// Released under the GPL license

// http://www.gnu.org/copyleft/gpl.html

// @name	FUQISHEM Vendetta Plus

// @author	FUQISHEM 

// @version	1.2

// @date	13/07/2010

// @include	http://s*.vendetta*.*/vendetta/*
// FUQISHEM Vendetta Plus traducido y recopilado por virtualdrug para la alianza FUQISHEM del servidor 2 (WE WONT YOUr money)
// Vendetta All-in-one tool powered by mitm[ITA] - Original Script by: Mosaik(ITA), Al_Caponazzo(ITA), Alex(FRA), Platone (ITA), TGWo (Admin Vendetta1923.it), Trip (ITA);

// ==/UserScript==

]]></>.toString();


CheckScriptForUpdate = {

	id: '69057',

	days: 1,

	name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],

	version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),

	time: new Date().getTime() | 0,

	call: function(response) {

		GM_xmlhttpRequest({

			method: 'GET',

			url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',

			onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}

		});

	},

	compare: function(xpr,response) {

		this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);

		this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);

		if ( (this.xversion) && (this.xname[1] == this.name) ) {

			this.xversion = this.xversion[1].replace(/\./g, '');

			this.xname = this.xname[1];

		} else {

			if ( (xpr.responseText.match('the page you requested doesn\'t exist')) || (this.xname[1] != this.name) ) GM_setValue('updated', 'off');

			return false;

		}

		if ( (this.xversion > this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {

			GM_setValue('updated', this.time);

			var dl_url = window.open('http://userscripts.org/scripts/source/'+this.id+'.user.js', "Vendetta Updater by mitm (mitm@hotmail.it)");

		} else if ( (this.xversion) && (this.xversion > this.version) ) {

			if(confirm('Do you want to turn off auto updating for this script?')) {

				GM_setValue('updated', 'off');

				GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});

				alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');

			} else {

				GM_setValue('updated', this.time);

			}

		} else {

			if(response) alert('No updates available for '+this.name);

			GM_setValue('updated', this.time);

		}

	},

	check: function() {

		if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);

		if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {

			this.call();

		} else if (GM_getValue('updated', 0) == 'off') {

			GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});

		} else {

			GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});

		}

	}

};



if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') CheckScriptForUpdate.check();

GM_log(CheckScriptForUpdate.name + ' (' + CheckScriptForUpdate.version + ')');



var release = CheckScriptForUpdate.name;


CheckScriptForUpdate.check();


(function(){

	/* mitm: Variabile globale serverID */

	var serverID = document.location.href;

	var tmp1 = serverID.indexOf("http://")+7;

	var tmp2 = serverID.indexOf("/vendetta/", tmp1);

	serverID = serverID.substring(tmp1,tmp2);



	if (self.document.URL.indexOf('login.php') != -1 ) {

		document.getElementsByTagName('frameset')[2].setAttribute('rows', '0,*');

	}

	if (location.pathname.search('uebersicht.php') != -1 ) {

		my_player_name = document.documentElement.innerHTML.match(/ \".*?\"/g)[0].replace(/[" ]/g, '');

		salva('my_player_name', my_player_name)

	}



	/* mitm: Stanze */

	if (location.pathname.search('konst.php') != -1 ) {

		/* mitm: edificio attuale/precedente/successivo */

		var new_url = document.location.href;

		var tmp1 = new_url.indexOf("x",0)+1;

		var tmp2 = new_url.indexOf("&",0);

		var current = (tmp2 != -1)?new_url.substring(tmp2, tmp1):new_url.substring(tmp1);	// mitm: edificio attuale

		var num_edi = GM_getValue(serverID + 'numedi');						// mitm: totale edifici

		for(i = 1; i <= num_edi; i++) {

			var edificio = GM_getValue(serverID + 'edi' + i);

			if (edificio == current) {

				pos = i;

				var next = (pos != num_edi)?GM_getValue(serverID + 'edi' + (pos+1)):current;	// mitm: edificio precedente

				var next_url = new_url.replace(current,next);

				next_url = next_url.replace('konst','nav');

				var prev = (pos != 1)?GM_getValue(serverID + 'edi' + (pos-1)):current;		// mitm: edificio successivo

				var prev_url = new_url.replace(current,prev);

				prev_url = prev_url.replace('konst','nav');

			}

		}

		//alert(next_url + '-' + prev_url);

		/* mitm: salvataggio coordinate Stanze */

		var img = document.getElementsByTagName('img');

		for(var i = 0; i < img.length; i++) {

			var imm = img[i];

			imm.addEventListener("click", function (event) {

			alert('Coordinata Stanze Salvata');

			GM_setValue(serverID + 'top', event.layerY);

			}, false);

		}

		/* mitm: Pulsanti aggiunti (Up della stanza + switch edificio precedente/successivo) */

		var links = document.getElementsByTagName('font');

		for(var i = 0; i < links.length; i++) {

			if (links[i].getAttribute('class') == 'positive') { // || links[i].getAttribute('class') == 'negative') {

				var testo = links[i].parentNode.parentNode.innerHTML;

				var action = testo.substring(testo.indexOf('konst.php?'), testo.indexOf('"><font'));

				testo += '<br><table align=center border=0 cellspacing=0><tr><td onclick=\"parent.frames[3].location =  \'' + prev_url + '&w=konst.php&mitm=yes\'; window.location=\'' + action + '\'\"  height=20><font size=1 color=black><< Go</font></td><td ></td><td onclick=\"parent.frames[3].location =  \'' + next_url + '&w=konst.php&mitm=yes\'; window.location=\'' + action + '\'\"  height=20><font size=1 color=black>Go >></font></td></tr></table>';

				links[i].parentNode.parentNode.innerHTML= testo;

			}



		}

		/* mitm: Pulsanti aggiunti (Cancellazione Up di una stanza + switch edificio precedente/successivo) */

		var kill = document.getElementsByTagName('script');

		for (var i = 0; i < kill.length; i++) {

			var kill_link = kill[i].innerHTML;  

			if (kill_link.search('konst.php') != -1) {

			var parentDiv = kill[i].parentNode;

			var action = kill_link.substring(kill_link.lastIndexOf('konst.php?'), kill_link.lastIndexOf('stop=y') + 6);

			newDiv = document.createElement("div");

			newDiv.innerHTML = '<table align=center border=0 cellspacing=0><tr><td onclick=\"parent.frames[3].location =  \'' + prev_url + '&w=konst.php&mitm=yes\'; window.location=\'' + action + '\'\" height=20><font size=1 color=black><< Go</font></td><td ></td><td onclick=\"parent.frames[3].location =  \'' + next_url + '&w=konst.php&mitm=yes\'; window.location=\'' + action + '\'\" height=20><font size=1 color=black>Go >></font></td></tr></table>'; 

			var parentDiv = kill[i].parentNode;

			parentDiv.insertBefore(newDiv, kill[i]);

			}

		}

	}

	

	if (location.pathname.search('konst.php') != -1 ) {

		var newDiv = document.createElement("span");

		newDiv.innerHTML = '<hr><input name="rst_view" value="Reset View" type="Submit" STYLE=\'width: 120px;font-size:8pt;font-family:Verdana\'>';

		var tabelle = document.getElementsByTagName('table');

		var parentDiv = tabelle[0].parentNode;

		parentDiv.appendChild(newDiv);

		hide_btn('stanza');

		reset_btn('stanza');

		hide_node('stanza');



		/* mitm: Scroll automatico della pagina in base a preferenze salvate */

		var valore = GM_getValue(serverID + 'top');

		if(valore > 0)

		{

			document.body.scrollTop = valore - 150;

		}

	}



	/* mitm: maschera player */

	/* aggiunge, davanti alle coordinate di ogni edificio bersaglio, un link per la <lista farm>(necessita Padrino) e un link per la propria schermata Missioni con edificio selezionato impostato come bersaglio */

	if (location.pathname.search('player.php') != -1 ) {		

		var target = '';

		var player = document.getElementsByTagName('td');

		if(player[9].getAttribute('class') == 'c') var player_name = player[9].innerHTML.substring(player[9].innerHTML.indexOf(' ') + 1);

		var saved = GM_getValue(serverID + 'target');

		var link_attivi = document.getElementsByTagName('a');

		for (var i = 0; i < link_attivi.length - 1; i++) {

			link = link_attivi[i].getAttribute("href");

			link = link.replace("planinfo","farmlist");

			link2 = link.replace("farmlist","flotte");

			link_nav_flotte = link2;

			link_nav_flotte = link_nav_flotte.replace("flotte","nav");			

			link_nav_flotte = link_nav_flotte.substring(0, link_nav_flotte.indexOf('&t='));

			// link_nav_player = link_nav_flotte + '&w=player.php';

			link_nav_flotte = link_nav_flotte + '&w=flotte.php';

			link = link.replace("t=","todo=add&sd=yes&t=");

			range = document.createRange();

			range.selectNode(link_attivi[i]);

		 	newDiv = document.createElement("b");

			

			newDiv.innerHTML += "<b STYLE='font-size:8pt;font-family:Verdana;cursor:pointer;' onclick=\"window.location.href = \'" + link2 + "\'; parent.frames[3].location = \'" + link_nav_flotte + "\'; \">< atacar ></b>&nbsp;";

  			var parentDiv = link_attivi[i].parentNode;

			parentDiv.insertBefore(newDiv, link_attivi[i]);

			target = link_attivi[i].innerHTML + '-' + player_name;

			var saved = GM_getValue(serverID + 'target');

			var valore = saved.indexOf(target) == -1?'':'checked';

			link_attivi[i].parentNode.innerHTML += '&nbsp;&nbsp;<input name=targets id="' + target  + '" type="checkbox" ' + valore +' ><span id="stato' + link_attivi[i].innerHTML + '">&nbsp;&nbsp;</span>';

			var listener = document.getElementById(target);

			listener.addEventListener("click", function (event) {

				var targets = this.id.split('-');

				var target = targets[0];

				var player = this.id.replace(targets[0] + '-', '');

				var saved = GM_getValue(serverID + 'target');

				var addon = document.getElementById('stato' + target);

				if(this.checked){

					if(saved.indexOf(target) != -1){

						var first = saved.substring(0, saved.lastIndexOf(player) + player.length + 1);

						var last = saved.substring(saved.lastIndexOf(player) + player.length + 1);

						var replace = first + target + '-' + player + ';' + last;

					} else {

						var replace = saved + target + '-' + player + ';' 

					}

					addon.setAttribute('style', 'color: red');

					addon.innerHTML = '<blink>Acquired</blink>';

				} else {

					addon.setAttribute('style', 'color: green');

					addon.innerHTML = 'Freed';

					var replace = saved.replace(target + '-' + player + ';', '');

				}

				GM_setValue(serverID + 'target', replace);

			}, false);

			if(i != 0 && i % 1000 == 0) alert('Stop : previene il timeout dello script');

		}

		var setTarget = document.createElement("span");

		var html = '<hr>';

		html += '&nbsp;&nbsp;<input id="reset_targets" value="Limpiar objetivos" type="Submit" STYLE=\'width: 120px;font-size:8pt;font-family:Verdana\'>&nbsp;&nbsp;';

		html += '&nbsp;&nbsp;<input id="unset_target" value="Deselecciona todo" type="Submit" STYLE=\'width: 120px;font-size:8pt;font-family:Verdana\'>&nbsp;&nbsp;';

		html += '&nbsp;&nbsp;<input id="set_target" value="Selecciona todo" type="Submit" STYLE=\'width: 120px;font-size:8pt;font-family:Verdana\'>&nbsp;&nbsp;';

		html += '<hr>';

		var targ = GM_getValue(serverID + 'target');

		var options = '';

		var items = targ.split(';');

		for(var t = 0; t < items.length - 1; t++){

			var item = items[t].split('-');

			var valore = item[0] + ' (' + items[t].replace(item[0] + '-', '') + ')';

			options +=	'<option value="' + item[0] + '">' + valore + '</option>';

		}

		html += '&nbsp;&nbsp;Targets&nbsp;:&nbsp;<select id="mitm_select">' + options + '</select>&nbsp;&nbsp;';

		html += '<hr>';

		setTarget.innerHTML = html;

		var ancora = link_attivi[link_attivi.length - 1].parentNode;

		ancora.appendChild(setTarget);

		var reset_target = document.getElementById('reset_targets');

		reset_target.addEventListener("click", function (event) {

			salva('target', '');

			salva('_currtarget', '');

			location.reload();

		}, false);

		var unset_target = document.getElementById('unset_target');

		unset_target.addEventListener("click", function (event) {

			var target = document.getElementsByName('targets');

			for(var i = 0; i < target.length; i++){

				if(i != 0 && i % 1000 == 0) alert('Stop : previene il timeout dello script');

				if(target[i].checked) target[i].click();

			}

			location.reload();

		}, false);

		var set_target = document.getElementById('set_target');

		set_target.addEventListener("click", function (event) {

			var target = document.getElementsByName('targets');

			for(var i = 0; i < target.length; i++){

				if(i != 0 && i % 1000 == 0) alert('Stop : previene il timeout dello script');

				if(!target[i].checked) target[i].click();

			}

			location.reload();

		}, false);

	}



	/* dove si usa: nella schermata che elenca i propri edifici */

	/* cosa fa: aggiunge, davanti alle coordinate di ogni edificio, un link per la schermata Stanze dell'edificio selezionato, un link per la propria schermata Missioni con edificio selezionato impostato come bersaglio, e uno per la schermata flotta dell'edificio selezionato */

        if (location.pathname.search('planets.php') != -1)

        {

                var content=document.location.href;

                var tmp1=content.indexOf("?q=",0)+3;

                var tmp2=content.indexOf("x",tmp1);

                var id=content.substring(tmp1,tmp2);



                var tbl = document.getElementsByTagName("table");

                tbl[2].border = 1;

                var pagina = document.getElementsByTagName("a");

                var celleth = document.getElementsByTagName("th");

                var coord, i, h;

                var conta = 0;

                for (i = 0, h = 4; i < pagina.length; i+=3, h+=4)

                {

                        conta++;

                        link = pagina[i].getAttribute("href");

			var id = link.substring( link.indexOf('q=')+2, link.indexOf('x') );

			var tmp1 = link.indexOf("t=",0)+2;

			var jump = link.substring(tmp1);

			var tmp1 = link.indexOf("x",0)+1;

			var tmp2 = link.indexOf("&t=",0);

			var current = link.substring(tmp1,tmp2);

			var link_stanze = 'konst.php?q=' + id + 'x' + jump;

			var link_bersaglio = 'flotte.php?q=' + id + 'x' + current + '&t=' + jump;

			var link_flotte = 'flotte.php?q=' + id + 'x' + jump;

			var link_nav_stanze = 'nav.php?q=' + id + 'x' + jump + '&w=konst.php';

			// var link_nav_bersaglio '';

			var link_nav_flotte = 'nav.php?q=' + id + 'x' + jump + '&w=flotte.php';

                  coord = celleth[h].innerHTML;

			coord =  "<b STYLE='font-size:8pt;font-family:Verdana;cursor:pointer;' onclick=\"location = \'" + link_stanze + "'; parent.frames[3].location = \'" + link_nav_stanze + "\'; \"><b>:Habit:</b></b>&nbsp;<b STYLE='font-size:8pt;font-family:Verdana;cursor:pointer;' onclick=\"window.location.href = \'" + link_bersaglio + "';\">:enviar:</b>&nbsp;<b STYLE='font-size:8pt;font-family:Verdana;cursor:pointer;' onclick=\"window.location.href = \'" + link_flotte + "'; parent.frames[3].location = \'" + link_nav_flotte + "\'; \">:Tropas:</b>&nbsp;<br>" + coord;

                  celleth[h].innerHTML = coord;

                }

        }        



	/* mitm: salvataggio coordinate Allenamento */

	if (location.pathname.search('forschung.php') != -1 ) {

		var newDiv = document.createElement("span");

		newDiv.innerHTML = '<hr><input name="rst_view" value="Reset View" type="Submit" STYLE=\'width: 120px;font-size:8pt;font-family:Verdana\'>';

		var tabelle = document.getElementsByTagName('table');

		var parentDiv = tabelle[0].parentNode;

		parentDiv.appendChild(newDiv);



		hide_btn('allenamento');

		reset_btn('allenamento');

		hide_node('allenamento');



                var img_a = document.getElementsByTagName('img');

                for(var i = 0; i < img_a.length; i++) {

                        var imm_a = img_a[i];

                        imm_a.addEventListener("click", function (event) {

                        alert('Coordinata Allenamento Salvata');

                        GM_setValue(serverID + 'top_a', event.layerY);

                        }, false);

                }

		/* mitm: Scroll automatico della pagina in base a preferenze salvate */

                var valore = GM_getValue(serverID + 'top_a');

                if(valore > 0)

                {

                        document.body.scrollTop = valore - 140;

                }



	}



	if (location.pathname.search('prod.php') != -1 ) {



		/* mitm: salvataggio coordinate Addestramento */

		var img_p = document.getElementsByTagName('img');

		for(var i = 0; i < img_p.length; i++) {

		var imm_p = img_p[i];

		imm_p.addEventListener("click", function (event) {

			alert('Coordinata Addestramento Salvata');

			GM_setValue(serverID + 'top_p', event.layerY);

		}, false);

		}

		

		var anchorTagsRis = document.getElementsByTagName("td");

		range = document.createRange();

		range.selectNode(anchorTagsRis[5]);

		Armes = range.toString();

		Armes = Armes.replace(/\./g, "");



		range.selectNode(anchorTagsRis[6]);

		Munitions = range.toString();

		Munitions = Munitions.replace(/\./g, "");



		range.selectNode(anchorTagsRis[8]);

		Dollars = range.toString();

		Dollars = Dollars.replace(/\./g, "");



		var couts_armes=1000;

		var couts_munitions=1000;

		var couts_dollars=1000;



		var page = document.getElementsByName("cnt");

		var pid  = document.getElementsByName("pid");

		for (var i = 0; i < page.length; i++) {

			switch (pid[i].value){

				case '1': //Picchiatore

					var couts_armes=200;

					var couts_munitions=1000;

					var couts_dollars=0;

				break;

				case '2'://Buttafuori

					var couts_armes=500;

					var couts_munitions=800;

					var couts_dollars=0;

				break;

				case '3'://Bandito

					var couts_armes=1000;

					var couts_munitions=200;

					var couts_dollars=0;

				break;

				case '4'://Pistolero

					var couts_armes=2000;

					var couts_munitions=3000;

					var couts_dollars=0;

				break;

				case '5'://truppa d'occupazione

					var couts_armes=2000;

					var couts_munitions=3000;

					var couts_dollars=20000;

				break;

				case '6'://Spia

					var couts_armes=500;

					var couts_munitions=200;

					var couts_dollars=0;

				break;

				case '7'://Imballatore

					var couts_armes=300;

					var couts_munitions=100;

					var couts_dollars=1000;

				break;

				case '8'://Agente CIA

					var couts_armes=7000;

					var couts_munitions=10000;

					var couts_dollars=2500;

				break;

				case '9'://Agente FBI

					var couts_armes=4000;

					var couts_munitions=6000;

					var couts_dollars=1000;

				break;

				case '10'://Trasportatore

					var couts_armes=1000;

					var couts_munitions=2000;

					var couts_dollars=5000;

				break;

				case '11'://Risolutore di Problemi

					var couts_armes=5000;

					var couts_munitions=1000;

					var couts_dollars=4000;

				break;

				case '12'://Tiratore Scelto

					var couts_armes=4000;

					var couts_munitions=500;

					var couts_dollars=2000;

				break;

				case '13'://Killer Professionista

					var couts_armes=10000;

					var couts_munitions=15000;

					var couts_dollars=10000;

				break;

				case '14'://Ninja

					var couts_armes=2000;

					var couts_munitions=1000;

					var couts_dollars=30000;

				break;

				case '15'://Artificiere

					var couts_armes=40000;

					var couts_munitions=6000;

					var couts_dollars=20000;

				break;

				case '16'://Mercenario

					var couts_armes=80000;

					var couts_munitions=120000;

					var couts_dollars=50000;

				break;

				default:

					alert('Erreur dans le script greasemonkey :(')

				break;

			}

			var max_armes=Armes/couts_armes;

			var max_munitions=Munitions/couts_munitions;

			var max_dollars=Dollars/couts_dollars;



			var maximum=Math.floor(Math.min(max_armes,max_munitions,max_dollars));



			newDiv = document.createElement("div");

			newDiv.innerHTML =  "<input id=max_"+i+" type='button' value='Max' STYLE='width: 120px;font-size:8pt;font-family:Verdana' onclick=\"cnt.value='"+maximum+"'\">";

			var parentDiv = page[i].parentNode;

			parentDiv.insertBefore(newDiv, page[i]);

		}

	}



	if (location.pathname.search('vert.php') != -1 ) {		



		/* mitm: salvataggio coordinate Sicurezza */

		var img_s = document.getElementsByTagName('img');

		for(var i = 0; i < img_s.length; i++) {

		var imm_s = img_s[i];

		imm_s.addEventListener("click", function (event) {

			alert('Coordinata Sicurezza Salvata');

			GM_setValue(serverID + 'top_s', event.layerY);

		}, false);

	      }



		var anchorTagsRis = document.getElementsByTagName("td");

		range = document.createRange();

		range.selectNode(anchorTagsRis[5]);

		Armes = range.toString();

		Armes = Armes.replace(/\./g, "");



		range.selectNode(anchorTagsRis[6]);

		Munitions = range.toString();

		Munitions = Munitions.replace(/\./g, "");



		range.selectNode(anchorTagsRis[8]);

		Dollars = range.toString();

		Dollars = Dollars.replace(/\./g, "");



		var couts_armes=1000;

		var couts_munitions=1000;

		var couts_dollars=1000;



		var vid  = document.getElementsByName("vid");

		var page = document.getElementsByName("cnt");

		for (var i = 0; i < page.length; i++) {



			switch (vid[i].value){

				case '1': //Lavoratori Clandestini

					var couts_armes=500;

					var couts_munitions=500;

					var couts_dollars=0;

				break;

				case '2'://Guardiano

					var couts_armes=2000;

					var couts_munitions=3000;

					var couts_dollars=100;

				break;

				case '3'://Poliziotto

					var couts_armes=5000;

					var couts_munitions=7500;

					var couts_dollars=500;

				break;

				case '4'://Guardia del corpo

					var couts_armes=3000;

					var couts_munitions=1000;

					var couts_dollars=4000;

				break;

				case '5'://Guardia

					var couts_armes=15000;

					var couts_munitions=40000;

					var couts_dollars=20000;

				break;

				default:

					alert('Erreur dans le script greasemonkey :(')

				break;

			}



			var max_armes=Armes/couts_armes;

			var max_munitions=Munitions/couts_munitions;

			var max_dollars=Dollars/couts_dollars;





			var maximum=Math.floor(Math.min(max_armes,max_munitions,max_dollars));



			newDiv = document.createElement("div");

			newDiv.innerHTML =  "<input id=max_"+i+" type='button' value='Max' STYLE='width: 120px;font-size:8pt;font-family:Verdana' onclick=\"cnt.value='"+maximum+"'\">";

			var parentDiv = page[i].parentNode;

			parentDiv.insertBefore(newDiv, page[i]);

		}

	}



	/* dove si usa: cantiere navale */

	/* cosa fa: aggiunge pulsanti */

	if (location.pathname.search('prod.php') != -1 )		 

	{

		var newDiv = document.createElement("span");

		newDiv.innerHTML = '<hr><input name="rst_view" value="Reset View" type="Submit" STYLE=\'width: 120px;font-size:8pt;font-family:Verdana\'>';

		var tabelle = document.getElementsByTagName('table');

		var parentDiv = tabelle[0].parentNode;

		parentDiv.appendChild(newDiv);

		

		var nav_url = parent.frames[3].location.href;

		var tmp1 = nav_url.indexOf("x",0)+1;

		var tmp2 = nav_url.indexOf("&",0);

		var current = (tmp2 != -1)?nav_url.substring(tmp2, tmp1):nav_url.substring(tmp1);

		var num_edi = GM_getValue(serverID + 'numedi');

	      for(i = 1; i <= num_edi; i++) {

			var edificio = GM_getValue(serverID + 'edi' + i);

			if (edificio == current) pos = i;

		}

		

		var pagina = document.getElementsByName("cnt");



		for (var i = 0; i < pagina.length; i++)

		{	

			pagina[i].setAttribute('id', 'Addes_' + i);

			/* mitm: pulsanti | << Go! | Go! >> | << Max | Max >> */

			var tmp1 = pagina[i].parentNode.innerHTML.lastIndexOf("name=");

			var nome_controllo = pagina[i].parentNode.innerHTML.substring(tmp1);

			nome_controllo = nome_controllo.replace(/name=\"/g, "");

			nome_controllo = nome_controllo.replace(/\" type=\"submit\">/g,"");

			newDiv = document.createElement("div");

			newDiv.innerHTML =  "<input type='button'  STYLE='width: 40px;font-size:8pt;font-family:Verdana' value='0' onclick=\"cnt.value=0\"><input type='button'  STYLE='width: 40px;font-size:8pt;font-family:Verdana' value='-' onclick=\"cnt.value--\"><input type='button' value='+' STYLE='width: 40px;font-size:8pt;font-family:Verdana' onclick=\"cnt.value++\"><br><input type='button'  STYLE='width: 40px;font-size:8pt;font-family:Verdana' value='+5' onclick=\"for(i=0; i<5; i++)cnt.value++;\"><input type='button'  STYLE='width: 40px;font-size:8pt;font-family:Verdana' value='+10' onclick=\"for(i=0; i<10; i++)cnt.value++;\"><button type='button' STYLE='width: 40px;font-size:8pt;font-family:Verdana' id=Add_"+i+">Save</button><input name="+nome_controllo+" type='submit' STYLE='width: 60px;font-size:8pt;font-family:Verdana' id=Addestra_"+i+"_prevn value='<< Go!'><input name="+nome_controllo+" type='submit' STYLE='width: 60px;font-size:8pt;font-family:Verdana' id=Addestra_"+i+"_nextn value='Go! >>'><input name="+nome_controllo+" type='submit' STYLE='width: 60px;font-size:8pt;font-family:Verdana' id=Addestra_"+i+"_prev value='<< Max'><input name="+nome_controllo+" type='submit' STYLE='width: 60px;font-size:8pt;font-family:Helvetica' id=Addestra_"+i+"_next value='Max >>'>";

			var parentDiv = pagina[i].parentNode;

			parentDiv.insertBefore(newDiv, pagina[i]);

			var addons = document.getElementsByName(nome_controllo);



			/* mitm: codice pulsanti | << Go! | Go! >> | << Max | Max >> */



			/* << Go! */

			addons[0].addEventListener("click", function () {

				if(pos != 1) {

	            		var content = nav_url;

					var jump = GM_getValue(serverID + 'edi' + (pos-1));

					var tmp1 = content.indexOf('x',0)+1;

					content = content.substring(0, tmp1);// + jump;

					content += jump + '&w=prod.php&mitm=yes';

					parent.frames[3].location = content;

				}

			}, false);



			/* Go! >> */

			addons[1].addEventListener("click", function () {

				if(pos != num_edi) {

					var content = nav_url;

					var jump = GM_getValue(serverID + 'edi' + (pos+1));

					var tmp1 = content.indexOf('x',0)+1;

					content = content.substring(0, tmp1);// + jump;

					content += jump + '&w=prod.php&mitm=yes';

					parent.frames[3].location = content;

				}

			}, false);



			/* << Max */

			addons[2].addEventListener("click", function () {

					var tmp1 = this.id.replace(/Addestra_/g, "");

					tmp1 = tmp1.replace(/_prev/g, "");

					var btid = "max_" + tmp1;

					var massimo = document.getElementById(btid);

					massimo.click();

					if(pos != 1) {

						var content = nav_url;

						var jump = GM_getValue(serverID + 'edi' + (pos-1));

						var tmp1 = content.indexOf('x',0)+1;

						content = content.substring(0, tmp1);// + jump;

						content += jump + '&w=prod.php&mitm=yes';

						parent.frames[3].location = content;

					}

			}, false);



			/* Max >> */

			addons[3].addEventListener("click", function () {

					var tmp1 = this.id.replace(/Addestra_/g, "");

					tmp1 = tmp1.replace(/_next/g, "");

					var btid = "max_" + tmp1;

					var massimo = document.getElementById(btid);

					massimo.click();

					if(pos != num_edi) {

						var content = nav_url;

						var jump = GM_getValue(serverID + 'edi' + (pos+1));

		                        var tmp1 = content.indexOf('x',0)+1;

		                        content = content.substring(0, tmp1);// + jump;

		                        content += jump + '&w=prod.php&mitm=yes';

		                        parent.frames[3].location = content;

					}

			}, false);



			/* mitm: salvataggio e recupero dati immessi Addestramento */

			var valore = GM_getValue(serverID + 'Add_'+i);

			if (valore) document.getElementById('Addes_'+i).value = valore

			var btadd = document.getElementById('Add_'+i);

			btadd.addEventListener("click", function () {

				var pid_a = this.id.replace('Add_', '');

				salva(this.id, document.getElementById("Addes_" + pid_a).value);

			}, false);

		}



		hide_btn('addestramento');

		reset_btn('addestramento');

		hide_node('addestramento');



		/* mitm: Scroll automatico della pagina in base a preferenze salvate */

		var valore = GM_getValue(serverID + 'top_p');

		if(valore > 0)

		{

			document.body.scrollTop = valore - 100;

		}

	}



	/* dove si usa: difese */

	/* cosa fa: aggiunge pulsanti */

	if (location.pathname.search('vert.php') != -1 )

	{

		var newDiv = document.createElement("span");

		newDiv.innerHTML = '<hr><input name="rst_view" value="Reset View" type="Submit" STYLE=\'width: 120px;font-size:8pt;font-family:Verdana\'>';

		var tabelle = document.getElementsByTagName('table');

		var parentDiv = tabelle[0].parentNode;

		parentDiv.appendChild(newDiv);

		

		var nav_url = parent.frames[3].location.href;

		var tmp1 = nav_url.indexOf("x",0)+1;

		var tmp2 = nav_url.indexOf("&",0);

		var current = (tmp2 != -1)?nav_url.substring(tmp2, tmp1):nav_url.substring(tmp1);

		var num_edi = GM_getValue(serverID + 'numedi');

		for(i = 1; i <= num_edi; i++) {

			var edificio = GM_getValue(serverID + 'edi' + i);

			if (edificio == current) pos = i;

		}



		var pagina = document.getElementsByName("cnt");

		for (var i = 0; i < pagina.length; i++)

		{

			pagina[i].setAttribute('id', 'Sicur_' + i);

			/* mitm: pulsanti | << Go! | Go! >> | << Max | Max >> */

			var tmp1 = pagina[i].parentNode.innerHTML.lastIndexOf("name=");

			var nome_controllo = pagina[i].parentNode.innerHTML.substring(tmp1);

			nome_controllo = nome_controllo.replace(/name=\"/g, "");

			nome_controllo = nome_controllo.replace(/\" type=\"submit\">/g,"");



			newDiv = document.createElement("div");

			newDiv.innerHTML =  "<input type='button'  STYLE='width: 40px;font-size:8pt;font-family:Verdana' value='0' onclick=\"cnt.value=0\"><input type='button'  STYLE='width: 40px;font-size:8pt;font-family:Verdana' value='-' onclick=\"cnt.value--\"><input type='button' value='+' STYLE='width: 40px;font-size:8pt;font-family:Verdana' onclick=\"cnt.value++\"><br><input type='button'  STYLE='width: 40px;font-size:8pt;font-family:Verdana' value='+5' onclick=\"for(i=0; i<5; i++)cnt.value++;\"><input type='button'  STYLE='width: 40px;font-size:8pt;font-family:Verdana' value='+10' onclick=\"for(i=0; i<10; i++)cnt.value++;\"><button type='button' STYLE='width: 40px;font-size:8pt;font-family:Verdana' id=Sic_"+i+">Save</button><input name="+nome_controllo+" type='submit' STYLE='width: 60px;font-size:8pt;font-family:Verdana' id=Sicurezza_"+i+"_prevn value='<< Go!'><input name="+nome_controllo+" type='submit' STYLE='width: 60px;font-size:8pt;font-family:Verdana' id=Sicurezza_"+i+"_nextn value='Go! >>'><input name="+nome_controllo+" type='submit' STYLE='width: 60px;font-size:8pt;font-family:Verdana' id=Sicurezza_"+i+"_prev value='<< Max'><input name="+nome_controllo+" type='submit' STYLE='width: 60px;font-size:8pt;font-family:Helvetica' id=Sicurezza_"+i+"_next value='Max >>'>";

  			var parentDiv = pagina[i].parentNode;

			parentDiv.insertBefore(newDiv, pagina[i]);

			

			var addons = document.getElementsByName(nome_controllo);



			/* mitm: codice pulsanti | << Go! | Go! >> | << Max | Max >> */



			/* << Go! */

			addons[0].addEventListener("click", function () {

				if(pos != 1) {

					var content = nav_url;

					var jump = GM_getValue(serverID + 'edi' + (pos-1));

					var tmp1 = content.indexOf('x',0)+1;

					content = content.substring(0, tmp1);// + jump;

					content += jump + '&w=vert.php&mitm=yes';

					parent.frames[3].location = content;

				}

                  }, false);



			/* Go! >> */

			addons[1].addEventListener("click", function () {

                  	if(pos != num_edi) {

					var content = nav_url;

					var jump = GM_getValue(serverID + 'edi' + (pos+1));

					var tmp1 = content.indexOf('x',0)+1;

					content = content.substring(0, tmp1);// + jump;

					content += jump + '&w=vert.php&mitm=yes';

					parent.frames[3].location = content;                                                                                                                    }

				}, false);



			/* << Max */

			addons[2].addEventListener("click", function () {

				var tmp1 = this.id.replace(/Sicurezza_/g, "");

				tmp1 = tmp1.replace(/_prev/g, "");

				var btid = "max_" + tmp1;

				var massimo = document.getElementById(btid);

				massimo.click();

                        if(pos != 1) {

					var content = nav_url;

					var jump = GM_getValue(serverID + 'edi' + (pos-1));

					var tmp1 = content.indexOf('x',0)+1;

					content = content.substring(0, tmp1);// + jump;

					content += jump + '&w=vert.php&mitm=yes';

					parent.frames[3].location = content;

				}

			}, false);

			

			/* Max >> */

			addons[3].addEventListener("click", function () {

				var tmp1 = this.id.replace(/Sicurezza_/g, "");

				tmp1 = tmp1.replace(/_next/g, "");

				var btid = "max_" + tmp1;

				var massimo = document.getElementById(btid);

				massimo.click();

				if(pos != num_edi) {

					var content = nav_url;

					var jump = GM_getValue(serverID + 'edi' + (pos+1));

					var tmp1 = content.indexOf('x',0)+1;

					content = content.substring(0, tmp1);// + jump;

					content += jump + '&w=vert.php&mitm=yes';

					parent.frames[3].location = content;

				}

			}, false);



			/* mitm: salvataggio e recupero dati immessi Sicurezza */

			var valore = GM_getValue(serverID + 'Sic_'+i);

			if (valore) document.getElementById('Sicur_'+i).value = valore

			var btsic = document.getElementById('Sic_'+i);

			btsic.addEventListener("click", function () {

				var pid_s = this.id.replace('Sic_', '');

				salva(this.id, document.getElementById("Sicur_" + pid_s).value);

			}, false);

		}



		hide_btn('sicurezza');

		reset_btn('sicurezza');

		hide_node('sicurezza');



		/* mitm: Scroll automatico della pagina in base a preferenze salvate */

		var valore = GM_getValue(serverID + 'top_s');

		if(valore > 0)

		{

			document.body.scrollTop = valore - 100;

		}

	}



	// bottoni per la gestione dei messaggi

	if (location.pathname.search('msgshow.php') != -1 ) {		

		var page = document.getElementsByTagName("input").item(0);

		newDiv = document.createElement("span");

		newDiv.innerHTML =  '<br> <input type="button" name="Submit" value="Seleccionar todo" onClick="var inputs = document.getElementsByTagName(\'input\');for (var i = 0; i < inputs.length; i++) {blnEtat=true;if (inputs[i].checked==false) inputs[i].checked=blnEtat;}"> <input type="button" name="Submit2" value="Deselecciona todo" onClick="var inputs = document.getElementsByTagName(\'input\');for (var i = 0; i < inputs.length; i++) {blnEtat=false;if (inputs[i].checked==true) inputs[i].checked=blnEtat;}"> <input type="button" name="Submit3" value="Invertir Seleccion" onClick="var inputs = document.getElementsByTagName(\'input\');for (var i = 0; i < inputs.length; i++) {inputs[i].checked=!inputs[i].checked;}"> <input name="submit" type=submit value="Proceder">';

		var parentDiv = page.parentNode;

		parentDiv.insertBefore(newDiv, page);

	}



	/* dove si usa: messaggi */

	/* cosa fa: aggiunge pulsante per selezionare tutti i messaggi in basso */

	if(location.pathname.search('msgshow.php') != -1)

	{

		var anchorTagsSel = document.getElementsByTagName("select");

		var anchorTagsInp = document.getElementsByTagName("input");

		var leninp = anchorTagsInp.length;



		funzione = "";

		for(var i = 0; i < leninp; i++)

			if(anchorTagsInp[i].getAttribute("type").indexOf("checkbox") != -1)

				funzione += "document.forms[0]." + anchorTagsInp[i].getAttribute("name") + ".checked = true;";



		var newDiv = document.createElement("font");

		var html = "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick='"+funzione+"'>Seleccionar Todo</button>&nbsp;&nbsp;";

		var parentDiv = anchorTagsSel[0].parentNode;

		newDiv.innerHTML = html;

		parentDiv.insertBefore(newDiv, anchorTagsSel[0]);

	}



	// Pulsanti di scorrimento Edifici

	if (location.pathname.search('nav.php') != -1 ) {

		

		/* mitm: script version */

		var m = document.getElementsByName("tutmenu");

		newDiv = document.createElement("span");

		newDiv.innerHTML = '<font size=1 color=red>&nbsp;<br>&nbsp;'+release+' by Virtualdrug</font><font size=1 color=blue><br>&nbsp;powered by&nbsp;&nbsp;<b><a href="http://userscripts.org/scripts/show/53854" target="blank">mitm<b>&nbsp;</font>';

		var parentDiv = m[0].parentNode;

		parentDiv.appendChild(newDiv);



	

		/* mitm: bottone reset */

		var html = "<hr><button type='button' STYLE='font-size:8pt;font-family:Verdana' id=bt_reset>Limpiar Memoria</button><hr>";

		var anchorTagsSel = document.getElementsByTagName("select").item(0);

		var newDiv = document.createElement("span");

		newDiv.innerHTML += html;

		var parentDiv = anchorTagsSel.parentNode;

		parentDiv.insertBefore(newDiv, anchorTagsSel);

		var btreset = document.getElementById('bt_reset');

		/* mitm: codice bottone reset */

	  	btreset.addEventListener("click", function () {

			re_set();

		}, false);

		/* mitm: funzioni aggiunte maschera Missioni, Addestramento, Sicurezza, Stanze */

		var mitm = document.location.href;

		if(mitm.search('&mitm=yes') != -1 && mitm.search('prod.php') == -1 && mitm.search('vert.php') == -1 && mitm.search('konst.php') == -1) { 

			/* mitm: Missioni */

			mitm = mitm.replace('&w=flotte.php&mitm=yes','');

			mitm = mitm.replace('nav','flotte');

			parent.frames[4].location = mitm;

			//setTimeout("parent.frames[4].location = \'" + mitm + "\';", 100);

		}

		if(mitm.search('&mitm=yes') != -1 && mitm.search('prod.php') != -1) {

			/* mitm: Addestramento */

                        mitm = mitm.replace('&w=prod.php&mitm=yes','');

                        mitm = mitm.replace('nav','prod');

                        //parent.frames[4].location = mitm;

                        setTimeout("parent.frames[4].location = \'" + mitm + "\';", 100);

                }

		if(mitm.search('&mitm=yes') != -1 && mitm.search('vert.php') != -1) {

			/* mitm: Sicurezza */

			mitm = mitm.replace('&w=vert.php&mitm=yes','');

			mitm = mitm.replace('nav','vert');

			setTimeout("parent.frames[4].location = \'" + mitm + "\';", 100);

		}

		if(mitm.search('&mitm=yes') != -1 && mitm.search('konst.php') != -1) {

			/* mitm: Stanze */

			mitm = mitm.replace(/&w=konst.php/g,'');

			mitm = mitm.replace(/&mitm=yes/g,'');

			mitm = mitm.replace(/nav/g,'konst');

			setTimeout("parent.frames[4].location = \'" + mitm + "\';", 500); 

			//parent.frames[4].location = mitm;

		}



		var page = document.getElementsByTagName("select").item(0);

		var last  = '';



		// Recupero dell'id di sessione..

		var content=document.getElementsByTagName("a").item(1).getAttribute("href");

   		var tmp1=content.indexOf("?q=",0)+3;

   		var tmp2=content.indexOf("x",tmp1);

		var id=content.substring(tmp1,tmp2);

		GM_setValue(serverID + 'numedi', page.length);

		

		var target = '';

		/* mitm: pulsanti scorrimento edifici */

		for (var i = 0; i < page.length; i++) {

			var edificio = document.getElementsByTagName("option").item(i).value;

			edificio_t = edificio.replace(/x/g, ':');

			var my_player_name = GM_getValue(serverID + 'my_player_name');

			target += edificio_t + '-' + my_player_name + ';';

			GM_setValue(serverID + 'edi' + (i+1), edificio);

			if (page[i].selected) {

				// precedente

				if (last!='') {

					newDiv = document.createElement("span");

					newDiv.innerHTML +=  '&nbsp;<a accesskey="a" href="javascript:void(0);" onclick="parent.w.location=chto+\'?q='+id+'x'+last+'\';location=\'nav.php?q='+id+'x'+last+'&w=\'+chto"><font size=3 family=Verdana>-</font></a>&nbsp;';

					var parentDiv = page.parentNode;

					parentDiv.insertBefore(newDiv, page);

					var last='';

				}



				// successivo

				if (i < page.length - 1) {

					newDiv = document.createElement("span");

					newDiv.innerHTML =  '&nbsp;<a accesskey="s" href="javascript:void(0);" onclick="parent.w.location=chto+\'?q='+id+'x'+page[i+1].value+'\';location=\'nav.php?q='+id+'x'+page[i+1].value+'&w=\'+chto"><font size=3 family=Verdana>+</font></a>';

					var parentDiv = page.parentNode;

					parentDiv.appendChild(newDiv);

				}

			}else{

				var last=page[i].value;

			}

		}

		GM_setValue(serverID + '_selftarget', target);

		if (!GM_getValue(serverID + 'target')) GM_setValue(serverID + 'target', GM_getValue(serverID + '_selftarget'));
//eliminado setTarget

		var setTarget3 = document.createElement("span");

		setTarget.innerHTML = '<hr><input id="self_target" value="Set Target" type="Submit" STYLE=\'font-size:8pt;font-family:Verdana\'>';

		page.parentNode.appendChild(setTarget);

		var listener = document.getElementById('self_target');

		listener.addEventListener("click", function (event) {

			var target = GM_getValue(serverID + 'target');

			var self = GM_getValue(serverID + '_selftarget');

			if (target.indexOf(self) == -1) GM_setValue(serverID + 'target', self + target);

		}, false);



	}



	/* dove si usa: flotta */

	/* cosa fa: aggiunge pulsanti */

	/* mitm: numerose funzioni aggiunte FIXME */



	if (location.pathname.search('flotte.php') != -1)

	{

		content = document.location.href;



		var count = 0;

		var restore = 1;

		var pers = 0;



		if (content.indexOf("q=",0) == -1) 

		{ // Aggiorna o Avvia missione

		restore = 0;

		} else {

			var tmp1=content.indexOf("x",0)+1;

			var tmp2=content.substring(tmp1);

			var x = tmp2.split("x");

			var coord1 = x[0];

			var coord2 = x[1];

			var coord3 = x[2];

		}

		var tmp1=content.indexOf("t=",0)+2;

		if(tmp1 > 1){	// url referente = planets.php

			var pers = 1;

			var coord=content.substring(tmp1);

			var x = coord.split("x");

			coord1 = x[0];	

			coord2 = x[1];

			coord3 = x[2];

		}



		var anchorTagsRis = document.getElementsByTagName("td");

		range = document.createRange();



		/* rileva le Armi disponibile sul Edificio */

		range.selectNode(anchorTagsRis[5]);

		Armi = range.toString();

		Armi = Armi.replace(/\./g, "");



		/* rileva le Munizioni disponibile sul Edificio */

		range.selectNode(anchorTagsRis[6]);

		Munizioni = range.toString();

		Munizioni = Munizioni.replace(/\./g, "");



		/* rileva gli Alcolici disponibile sul Edificio */

		range.selectNode(anchorTagsRis[7]);

		Alcolici = range.toString();

		Alcolici = Alcolici.replace(/\./g, "");



		/* rileva i Dollari disponibile sul Edificio */

		range.selectNode(anchorTagsRis[8]);

		Dollari = range.toString();

		Dollari = Dollari.replace(/\./g, "");



		/* rileva la quantita  di ogni risorsa finora immessa nei campi di trasporto */

		txtArmi = document.getElementsByName('r1').item(0).value;

		txtMunizioni = document.getElementsByName('r2').item(0).value;

		txtAlcolici = document.getElementsByName('r3').item(0).value;

		txtDollari = document.getElementsByName('r4').item(0).value;



		var anchorTags = document.getElementsByTagName("th");

		var casellaTesto = document.getElementsByTagName("input");

		var selects = document.getElementsByTagName("select");



		var totaleUnita = new Array(16);

		var Stipendio = 0;

		var maxcarico = 1000000000;

		z = 1;



		for (var i = 0; i < anchorTags.length ; i++)

		{

			text = anchorTags[i].innerHTML;



			/* rilevazione capacit  di trasporto (serve per calcolo del massimo di risorse trasportabili) */

			if (text.indexOf('(-') != -1)

			{

				text = anchorTags[i-1].innerHTML;

                                text = text.replace(/\./g, "");

				Stipendio = parseInt(text);

				text = anchorTags[i+1].innerHTML;

				text = text.replace(/\./g, "");

				maxcarico = parseInt(text)-1;

			}

			/* codice dei pulsanti per la selezione delle Unita  */

			if (text.indexOf('( ',0) != -1) // && restore != 0)

			{

				var massimo = parseInt(text.substr(text.indexOf('( ',0)+2).replace(" )",""));

				totaleUnita[z-1] = massimo;

				/* pulsante 0 (azzera il campo) */

				var html =  "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value=0 \">0</button>";

				/* pulsante - (decrementa di 1 il numero di Unita  selezionate)*/

				html += "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value--; if(document.rs." + casellaTesto[z].getAttribute("name") + ".value<0) document.rs." + casellaTesto[z].getAttribute("name") + ".value=0\">-</button>";

				/* pulsante + (incrementa di 1 il numero di Unita  selezionate) */

				html += "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value++; if(document.rs." + casellaTesto[z].getAttribute("name") + ".value >" + massimo + ") document.rs." + casellaTesto[z].getAttribute("name") + ".value="+massimo+";\">+</button>";

				/* pulsante +2 (incrementa di 2 il numero di Unita  selezionate) */

				html += "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value = parseInt(document.rs." + casellaTesto[z].getAttribute("name") + ".value)+2; if(document.rs." + casellaTesto[z].getAttribute("name") + ".value >" + massimo + ") document.rs." + casellaTesto[z].getAttribute("name") + ".value="+massimo+";\">+2</button>";

				/* pulsante +5 (incrementa di 5 il numero di Unita  selezionate) */

				html += "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value = parseInt(document.rs." + casellaTesto[z].getAttribute("name") + ".value)+5; if(document.rs." + casellaTesto[z].getAttribute("name") + ".value >" + massimo + ") document.rs." + casellaTesto[z].getAttribute("name") + ".value="+massimo+";\">+5</button>";

				/* pulsante MAX (seleziona tutte le Unita  disponibili di quel tipo) */

				html += "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value = '"+ massimo + "'\">MAX</button>";



                                /* mitm: pulsanti per salvataggio valori unita in missioni + recupero valori precedentemente salvati */

						var nome = casellaTesto[z].getAttribute("name");

                                if (nome){

						var valore = casellaTesto[z].getAttribute("value");

                                	var qta = GM_getValue(serverID + nome);

                                	if (qta && restore != 0){

                                		var valore = qta;

                                	}

                                	html += "<br><input type=text name=\""+nome+"\" maxlength=30 size=5 value=\""+valore+"\">";

                                	html += "<button type='button' STYLE='font-size:8pt;font-family:Verdana' id=bt_"+nome+">Save</button>";

						var parentDiv = casellaTesto[z].parentNode;

                                	parentDiv.innerHTML = html;



						var btuni = document.getElementById('bt_'+nome);

						btuni.addEventListener("click", function () {

							var tbox = this.id.replace('bt_', '');

							salva(tbox, document.getElementsByName(tbox).item(0).value);

						}, false);

                                }

				z = z + 1;						

			}

		}

		

	var html = "<button type='button' STYLE='font-size:8pt;font-family:Verdana' id=select_all onclick=\"";

	for(var j = 0; j < z-1; j++)

	{

		html+="document.rs."+casellaTesto[j+1].getAttribute("name")+".value = "+totaleUnita[j]+"; ";

	}

	html += "\">SELECCIONAR TODO</button>";

	anchorTags[2].innerHTML = "Numero<br><br>"+html;

	var parentDiv = casellaTesto[z].parentNode;

	var valore = coord1;

	if (restore != 0 && pers != 1)

	{

		var tipo = GM_getValue(serverID + 'e');

		if (tipo) valore = tipo

	} else {

	        valore = casellaTesto[z].getAttribute("value");

	}

	html = "&nbsp;<b style=\"font-size:12pt;cursor:pointer;\" onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value-- \">-</b>&nbsp;<input type=text id=\'C1\' name=\'C1\' value=\'"+valore+"\' maxlength=3 size=3>&nbsp;<b style=\"font-size:12pt;cursor:pointer;\" onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value++ \">+</b>&nbsp;";

	html += "<button type='button' STYLE='width: 40;font-size:8pt;font-family:Verdana' id=bt_C1>Save</button>&nbsp;||&nbsp;";

	z = z + 1;



	var valore = coord2;

	if (restore != 0 && pers != 1)

	{

		var tipo = GM_getValue(serverID + 'f');

		if (tipo) valore = tipo

	} else {

        	valore = casellaTesto[z].getAttribute("value");

	}

	html += "<b style=\"font-size:12pt;cursor:pointer;\" onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value-- \">-</b>&nbsp;&nbsp;<input type=text id=\'C2\' name=\'C2\' value=\'"+valore+"\' maxlength=3 size=3>&nbsp;<b style=\"font-size:12pt;cursor:pointer;\" onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value++ \">+</b>&nbsp;<button type='button' STYLE='width: 40;font-size:8pt;font-family:Verdana' id=bt_C2>Save</button>&nbsp;||&nbsp;";

	z = z + 1;



	var valore = coord3;

	if (restore != 0 && pers != 1)

	{

		var tipo = GM_getValue(serverID + 'g');

		if (tipo) valore = tipo

	} else {

	        valore = casellaTesto[z].getAttribute("value");

	}

	html += "<b style=\"font-size:12pt;cursor:pointer;\" onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value-- \">-</b>&nbsp;&nbsp;<input type=text id=\'C3\' name=\'C3\' value=\'"+valore+"\' maxlength=3 size=3>&nbsp;<b style=\"font-size:12pt;cursor:pointer;\" onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value++ \">+</b>&nbsp;<button type='button' STYLE='width: 40;font-size:8pt;font-family:Verdana' id=bt_C3>Save</button>&nbsp;";

	z = z + 1;



	var target = GM_getValue(serverID + 'target');

	var options = '<option value=""></option>';

	var items = target.split(';');

	for(var t = 0; t < items.length - 1; t++){

		var item = items[t].split('-');

		var valore = item[0] + ' (' + items[t].replace(item[0] + '-', '') + ')';

		var selected = (item[0] == GM_getValue(serverID + '_currtarget'))?'selected':false;

		options +=	'<option value="' + item[0] + '" ' + selected + '>' + valore + '</option>';

	}

	html += '<hr>&nbsp;&nbsp;Objetivo&nbsp;:&nbsp;&nbsp;<a href="javascript:void(0);" onclick="" id=meno>-</a>&nbsp;<select id="mitm_select">' + options + '</select>&nbsp;<a href="javascript:void(0);" onclick="" id=piu>+</a>&nbsp;';



	html += "&nbsp;&nbsp;<button type=\"submit\"  STYLE='font-size:8pt;font-family:Verdana' value=\"Avvia missione\" name=\"S\">Empezar</button>&nbsp;&nbsp;";

	html += "<p>&nbsp;&nbsp;<button type=\"submit\"  STYLE='font-size:8pt;font-family:Verdana' value=\"Avvia missione\" id=all_previous_up name=\"S\"><< Todos</button>&nbsp;&nbsp;<button type=\"submit\" STYLE='font-size:8pt;font-family:Verdana' value=\"Avvia missione\" id=all_next_up name=\"S\">Todos >></button>&nbsp;&nbsp;";

	html += "&nbsp;&nbsp;<button type=\"submit\"  STYLE='font-size:8pt;font-family:Verdana' value=\"Avvia missione\" id=previous_up name=\"S\"><< Empezar</button>&nbsp;&nbsp;<button type=\"submit\" STYLE='font-size:8pt;font-family:Verdana' value=\"Avvia missione\" id=next_up name=\"S\">Empezar >></button>&nbsp;&nbsp;</p>";

	parentDiv.innerHTML = html;

	var parentDiv = selects[1].parentNode;

	var html = parentDiv.innerHTML;

	html += "<button type='button' STYLE='width: 40px;font-size:8pt;font-family:Verdana' id=bt_typ>Save</button>";

	parentDiv.innerHTML = html;



	var meno = document.getElementById('meno');

	meno.addEventListener("click", function (event) {

		var select = document.getElementById('mitm_select'); 

		if (select.selectedIndex > 1) {

			select.value = select.options[select.selectedIndex - 1].value;

			parse_coord(select.value);

		}

	}, false);



	var piu = document.getElementById('piu');

	piu.addEventListener("click", function (event) {

		var select = document.getElementById('mitm_select'); 

		if (select.selectedIndex < select.length - 1) {

			select.value = select.options[select.selectedIndex + 1].value;

			parse_coord(select.value);

		}

	}, false);



	var selettore = document.getElementById('mitm_select');

	selettore.addEventListener("change", function (event) {

		parse_coord(this.value);

	}, false);





	var missione = GM_getValue(serverID + 'h');



	/* mitm: bordo tabelle maschera missioni */

	var div = document.getElementsByTagName('table');

	div[2].setAttribute('border',1);

	var div = document.getElementsByTagName('th');

	for (var i = 0; i < div.length; i++) {

		if (div[i].innerHTML.search('info.php') != -1) div[i].innerHTML = div[i].innerHTML.replace('(', '<b><font size=2 color=blue><br>(');

	}

	//div[2].setAttribute('width',600);

	/* mitm: EOF bordo */



	if (missione != 0) document.getElementsByName('typ').item(0).value = missione;

	trasporto(anchorTags[anchorTags.length-9], "Armas", maxcarico, Armi, txtArmi, "r1", "r2", "r3", "r4", "a", restore);

	trasporto(anchorTags[anchorTags.length-7], "Munición", maxcarico, Munizioni, txtMunizioni, "r2", "r1", "r3", "r4", "b", restore);

	trasporto(anchorTags[anchorTags.length-5], "Alcohol", maxcarico, Alcolici, txtAlcolici, "r3", "r1", "r2", "r4", "c", restore);

	trasporto(anchorTags[anchorTags.length-3], "Dolares", maxcarico, Dollari-Stipendio, txtDollari, "r4", "r1", "r2", "r3", "d", restore);

	

	var ancora = document.getElementsByName('S');

	newDiv = document.createElement("span");

	var valore = GM_getValue(serverID + 'ext_view')?'checked':'';

	newDiv.innerHTML = '<br><br><input name="ext_view" value="yes" ' + valore + ' type="checkbox"> Cargar Abajo&nbsp;&nbsp;';

	newDiv.innerHTML += "<button type=\"submit\"  STYLE='font-size:8pt;font-family:Verdana' value=\"Avvia missione\" id=previous name=\"S\"><< Empezar</button>&nbsp;&nbsp;<button type=\"submit\" STYLE='font-size:8pt;font-family:Verdana' value=\"Avvia missione\" id=next name=\"S\">Empezar >></button>";

	newDiv.innerHTML += "&nbsp;&nbsp;<button type=\"submit\"  STYLE='font-size:8pt;font-family:Verdana' value=\"Avvia missione\" id=all_previous name=\"S\"><< Todos</button>&nbsp;&nbsp;<button type=\"submit\" STYLE='font-size:8pt;font-family:Verdana' value=\"Avvia missione\" id=all_next name=\"S\">Todos >></button>";

	ancora[5].parentNode.appendChild(newDiv);

	var checkboxf = document.getElementsByTagName('input');

	checkboxf = checkboxf[checkboxf.length-1];

	checkboxf.addEventListener("click", function () {

			salva(this.name, this.checked?'checked':'');

			}, false);

	/* mitm: Scroll automatico della pagina in base a preferenze salvate */

	if(valore) document.body.scrollTop = 100000;

	var nav_url = parent.frames[3].location.href;

	var tmp1 = nav_url.indexOf("x",0)+1;

	var tmp2 = nav_url.indexOf("&",0);	

	var current = (tmp2 != -1)?nav_url.substring(tmp2, tmp1):nav_url.substring(tmp1);

	var addon_1 = document.getElementById('previous');

	var addon_2 = document.getElementById('next');

	var addon_3 = document.getElementById('all_previous');

	var addon_4 = document.getElementById('all_next');

	var addon_5 = document.getElementById('previous_up');

	var addon_6 = document.getElementById('next_up');

      var addon_7 = document.getElementById('all_previous_up');

      var addon_8 = document.getElementById('all_next_up');



	var num_edi = GM_getValue(serverID + 'numedi');

	for(i = 1; i <= num_edi; i++) {

		var edificio = GM_getValue(serverID + 'edi' + i);

		if (edificio == current) pos = i;

	}

	if(pos != 1 && restore != 0) {

	addon_1.addEventListener("click", function () {

			var content = document.location.href;

			var jump = GM_getValue(serverID + 'edi' + (pos-1));

			content = content.replace('flotte','nav');

			var tmp1 = content.indexOf('x',0)+1;

			content = content.substring(0, tmp1);// + jump;

			content += jump + '&w=flotte.php&mitm=yes';

			parent.frames[3].location = content;

			}, false);

	addon_5.addEventListener("click", function () {

			document.getElementById('previous').click();

			}, false);

	addon_3.addEventListener("click", function () {

			var select_all = document.getElementById('select_all');

			select_all.click();

			var content = document.location.href;

			var jump = GM_getValue(serverID + 'edi' + (pos-1));

			content = content.replace('flotte','nav');

			var tmp1 = content.indexOf('x',0)+1;

			content = content.substring(0, tmp1);// + jump;

			content += jump + '&w=flotte.php&mitm=yes';

			parent.frames[3].location = content;

			}, false);

	addon_7.addEventListener("click", function () {

			document.getElementById('all_previous').click();

			}, false);

	}

	if(pos != num_edi && restore != 0) {

	addon_2.addEventListener("click", function () {

			var content = document.location.href;

			var jump = GM_getValue(serverID + 'edi' + (pos+1));

			content = content.replace('flotte','nav');

			var tmp1 = content.indexOf('x',0)+1;

			content = content.substring(0, tmp1);// + jump;

			content += jump + '&w=flotte.php&mitm=yes';

			parent.frames[3].location = content;

			}, false);

	addon_6.addEventListener("click", function () {

			document.getElementById('next').click();

			}, false);

	addon_4.addEventListener("click", function () {

			var select_all = document.getElementById('select_all');

			select_all.click();

			var content = document.location.href;

			var jump = GM_getValue(serverID + 'edi' + (pos+1));

			content = content.replace('flotte','nav');

			var tmp1 = content.indexOf('x',0)+1;

			content = content.substring(0, tmp1);// + jump;

			content += jump + '&w=flotte.php&mitm=yes';

			parent.frames[3].location = content;

			}, false);

	addon_8.addEventListener("click", function () {

			document.getElementById('all_next').click();

			}, false);

	}

	

	/* mitm: event listener bottoni aggiunti */

	document.getElementById("bt_r1").addEventListener("click", function () {

		salva("a", document.getElementsByName('r1').item(0).value); 

	}, false);

	document.getElementById("bt_r2").addEventListener("click", function () {

		salva("b", document.getElementsByName('r2').item(0).value);

	}, false);

	document.getElementById("bt_r3").addEventListener("click", function () {

		salva("c", document.getElementsByName('r3').item(0).value);

	}, false);

	document.getElementById("bt_r4").addEventListener("click", function () {

		salva("d", document.getElementsByName('r4').item(0).value);

	}, false);

	document.getElementById("bt_typ").addEventListener("click", function () {

		salva("h", document.getElementsByName('typ').item(0).value);

	}, false);

	document.getElementById("bt_C1").addEventListener("click", function () {

		salva("e", document.getElementsByName('C1').item(0).value);

	}, false);

	document.getElementById("bt_C2").addEventListener("click", function () {

		salva("f", document.getElementsByName('C2').item(0).value);

	}, false);

	document.getElementById("bt_C3").addEventListener("click", function () {

		salva("g", document.getElementsByName('C3').item(0).value);

	}, false);

	} // end of flotta



	/* mitm: funzione ausiliaria per il salvataggio valori immessi nelle textboxes/selects */

	function salva(nome, valore) {

		GM_setValue(serverID + nome, valore);

	}



	/* mitm: funzione ausiliaria per il reset dei valori salvati */

	function re_set() {

		GM_setValue(serverID + 'extended', '');

		GM_setValue(serverID + 'top', 0);

		GM_setValue(serverID + 'top_a', 0);

		GM_setValue(serverID + 'top_p', 0);

		GM_setValue(serverID + 'top_s', 0);

		GM_setValue(serverID + 'a', 0);

		GM_setValue(serverID + 'b', 0);

		GM_setValue(serverID + 'c', 0);

		GM_setValue(serverID + 'd', 0);

		GM_setValue(serverID + 'e', 0);

		GM_setValue(serverID + 'f', 0);

		GM_setValue(serverID + 'g', 0);

		GM_setValue(serverID + 'h', 0);

		for (var i = 0; i < 20; i++)

		{

			if (GM_getValue(serverID + 'Add_'+i))

			{

				GM_setValue(serverID + 'Add_'+i, 0);

			}

			if (GM_getValue(serverID + 'Sic_'+i))

	        	{

			        GM_setValue(serverID + 'Sic_'+i, 0);

		        }

			if (GM_getValue(serverID + 'S'+i))

		        {

	        		GM_setValue(serverID + 'S'+i, 0);

		        }

		}

		GM_setValue(serverID + 'target', GM_getValue(serverID + '_selftarget'));

	}

	

	function hide_btn(maschera)

	{

		var info = document.getElementsByTagName('a');

		for(var i = 0; i < info.length; i++) {

			var info_s = info[i];

			var nome = info_s.getAttribute("href");

			if (nome.search('info.php') != -1) {

				var item_numb = nome.substring(nome.indexOf('b=')+2,nome.lastIndexOf('&c='));

				var parentDiv = info[i].parentNode;

				newDiv = document.createElement("span");

				//newDiv.innerHTML = '<input onclick=\"this.parentNode.parentNode.parentNode.innerHTML = \'\'; \" name="stanza_' + i + '" id="stanza_' + i + '" value="Nascondi Item" type="submit">&nbsp;&nbsp;';

				newDiv.innerHTML = '<input name="' + maschera + '_' + item_numb + '" id="' + maschera + '_' + item_numb + '" value="Ocultar Item" type="submit">&nbsp;&nbsp;';

				parentDiv.insertBefore(newDiv, info[i]);

				var add = document.getElementsByName(maschera + '_' + item_numb);

				add[0].addEventListener("click", function () {

						salva(this.id,'checked');

						this.parentNode.parentNode.parentNode.innerHTML = '';

						}, false);

			}

		}

	}



	function hide_node(maschera)

	{

		for (i = 0; i < 20; i++) {

			var blocco = document.getElementsByName(maschera + '_' + i);

			var check = GM_getValue(serverID + maschera + '_' + i);

			if (check && check == 'checked') {

				blocco[0].parentNode.parentNode.parentNode.innerHTML = '';

			}

		}

	}



	function reset_btn(maschera) 

	{

		var rst_view = document.getElementsByName('rst_view');

		rst_view[0].addEventListener("click", function () {

				for (i = 0; i < 20; i++) {

				GM_deleteValue(serverID + maschera + '_' + i);

				}

				window.location.reload();

				}, false);

	}



	function parse_coord(value) 

	{

		var coord=value.split(':'); 

		if(coord[2]) { 

			var item = new Array();

			item[0] = 'e';

			item[1] = 'f';

			item[2] = 'g';

			for (var k = 0; k < coord.length; k++) { 

				var id = 'C' + (k + 1); 

				document.getElementById(id).value = coord[k];

				salva(item[k], coord[k]);

			}

		}

		salva('_currtarget', value);

	}



	function trasporto(nodo, nomerisorsa, maxcarico, quanris, txtrisorsa, pozris, pozris1, pozris2, pozris3, tipo, restore)

	{

		var parentDiv = nodo.parentNode;

		appoTH = "<th width=\"20\">"+nomerisorsa+"</th>";

		appoTH += "<th>";

		appoTH += "<button type='button' STYLE='width: 40px;font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) - 1000000; if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">-1kk</button>";

		/* pulsante -500k (decrementa di 500000 la quantit  della risorsa selezionata. Se il valore va sottozero, azzera il campo) */

		appoTH += "<button type='button' STYLE='width: 40px;font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) - 500000; if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">-500k</button>";

		/* pulsante -100k (decrementa di 100000 la quantit  della risorsa selezionata. Se il valore va sottozero, azzera il campo) */ 

		appoTH += "<button type='button' STYLE='width: 40px;font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) - 100000; if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">-100k</button>";

		/* pulsante -10k */

		appoTH += "<button type='button' STYLE='width: 40px;font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) - 10000; if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">-10k</button>";

		/* pulsante 0*/

		appoTH += "<button type='button' STYLE='width: 40px;font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = 0; if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">0</button>";

		/* pulsante +10k */

		appoTH += "<button type='button' STYLE='width: 40px;font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) + 10000; if(parseInt(document.rs."+pozris+".value)>";

		appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+")";

		appoTH += ") document.rs."+pozris+".value =";

		appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+"); ";

		appoTH += "if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">+10k</button>";

		/* pulsante +100k */

		appoTH += "<button type='button' STYLE='width: 40px;font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) + 100000; if(parseInt(document.rs."+pozris+".value)>";

		appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+")";

		appoTH += ") document.rs."+pozris+".value =";

		appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+"); ";

		appoTH += "if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">+100k</button>";

		/* pulsante +500k */

		appoTH += "<button type='button' STYLE='width: 40px;font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) + 500000; if(parseInt(document.rs."+pozris+".value)>";

		appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+")";

		appoTH += ") document.rs."+pozris+".value =";

		appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+"); ";

		appoTH += "if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">+500k</button>";

		/* pulsante +1kk */

		appoTH += "<button type='button' STYLE='width: 40px;font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) + 1000000; if(parseInt(document.rs."+pozris+".value)>";

		appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+")";

		appoTH += ") document.rs."+pozris+".value =";

		appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+"); ";

		appoTH += "if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">+1kk</button>";

		/* mitm: recupero valori salvati risorse */

		var qta = GM_getValue(serverID + tipo);

		if (qta && qta != "0" && restore != 0) txtrisorsa = qta;

		/* pulsante MAX (immette il massimo trasportabile per quella risorsa, coerentemente con la capacit  di trasporto e la disponibilit  sul Edificio della risorsa selezionata. Se il valore va sottozero azzera il campo) */

		appoTH += "<button type='button' STYLE='width: 40px;font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = ";

		appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+"); if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">MAX</button>";

	      /* campo della risorsa. Abilitato solo se la missione   di tipo trasporto (4) */

		if(document.getElementsByName('typ').item(0).value == 4)

			appoTH += "<div><input type=text name=\""+pozris+"\" maxlength=10 size=10 value=\""+txtrisorsa+"\">";

		else

			appoTH += "<div><input type=text name=\""+pozris+"\" maxlength=10 size=10 disabled=disabled value=\""+txtrisorsa+ "\">";

		/* mitm: codice pulsanti salvataggio risorse */

		appoTH += "<button type='button' STYLE='width: 40px;font-size:8pt;font-family:Verdana' id=bt_"+pozris+">Save</button>";

		appoTH += "</div></th>";

		parentDiv.innerHTML = appoTH;					

	}



}) ();
	function addGlobalStyle(css) {

	    var head, style;

	    head = document.getElementsByTagName('head')[0];

	    if (!head) { return; }

	    style = document.createElement('style');

	    style.type = 'text/css';

	    style.innerHTML = css;

	    head.appendChild(style);

	}



	function formatNumber ( n, c, d, t ) {

		var m = ( c = Math.abs( c ) + 1 ? c : 2, d = d || ",", t = t || ".", /(\d+)(?:(\.\d+)|)/.exec( n + "" ) ), x = m[1].length % 3;

		return ( x ? m[1].substr( 0, x ) + t : "" ) + m[1].substr( x ).replace( /(\d{3})(?=\d)/g, "$1" + t ) + ( c ? d + ( +m[2] ).toFixed( c ).substr( 2 ) : "" );

	};



	function getColor(perc) {

		if (perc == 0) { return '#FF0000';}

		if (perc >0 && perc <= 10) {return '#64b864';}

		if (perc >10 && perc <= 75) {return '#dedac8';}

		if (perc >75 && perc < 100) {return '#ff9e48';}

		if (perc >= 100) { return '#f44a4a';}

	}



	function getColorRainbow(perc) {

		if (perc < 10) { return '#280cce'; }

		if (perc >=10 && perc < 20) {return '#0c52ce';}

		if (perc >=20 && perc < 30) {return '#0c8fce';}

		if (perc >=30 && perc < 40) {return '#0cce12';}

		if (perc >=40 && perc < 50) {return '#afdf08';}

		if (perc >=50 && perc < 60) {return '#f9ff00';}

		if (perc >=60 && perc < 70) {return '#ffd200';}

		if (perc >=70 && perc < 80) {return '#ff9f00';}

		if (perc >=80 && perc < 90) {return '#ff6600';}

		if (perc >=90) { return '#ff0f00'; }

		return '#000';

	}

		

	if (location.pathname.search('empire.php') != -1 ) {		

		addGlobalStyle('.mag td { white-space: nowrap; font-size: 0.8em; text-align: right; font-family: Verdana; }');



		var values = document.getElementsByTagName("th");

		for (var i = 0; i < values.length; i++) {

			var text = values[i].childNodes[0].nodeValue || values[i].childNodes[0].childNodes[0].nodeValue;

				if (text.search('max')!=-1) {



					// get th values and parse

					text = text.replace("(max.","").replace(")","").replace( /[\.,;!#\$\/:\?'\(\)\[\]_\-\\]/g, "");

					var currentValue = text.split("  ")[0];

					var maxValue = text.split("  ")[1];

					var perc = (currentValue / maxValue )*100;



					// new th value

					values[i].innerHTML = 

						"<table class='mag' bgcolor='"+getColor(perc)+"'>"+

							"<tr><td></td><td style='color: black; font-weight: bold;'>"+formatNumber(currentValue, 0, '.', '.')+"</td></tr>"+

							"<tr><td></td><td style='color: black;'>"+formatNumber(maxValue, 0, '.', '.')+"</td></tr>"+

							"<tr><td></td><td style='color: black;'>"+Math.round(perc)+"%</td></tr>"+

						"</table>";

				}

		}

	}