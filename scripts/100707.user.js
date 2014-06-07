// ==UserScript==
// @name           TTEFEJ
// @namespace      TTEFEJ
// @include        http://*.ogame.*/game/index.php*
// ==/UserScript==

function GetGet(v)
	{ var param = window.location.search.slice(1,window.location.search.length); ;
	var list_get = param.split('&') ;
	var value = '' ;
	for(var p = 0 ; p < list_get.length ; p++)
	{ var get = list_get[p] ;
	if(get.match(v+'='))
		{ w = get.split('=') ;
		value = w[1] ; } }
	return value ; }

function getAfter(code, a)
	{ code = code.split(a) ;
	var r = '' ;
	for(var i = 1 ; i < code.length ; i++)
	{ if(r != '') { r += a ; }
	r += code[i] ; }
	return r ; }

function isConvoPage(p)
	{ if(page == 'overview'
	|| page == 'resources'
	|| page == 'resourceSettings'
	|| page == 'station'
	|| page == 'trader'
	|| page == 'research'
	|| page == 'shipyard'
	|| page == 'defense'
	|| page == 'fleet1'
	|| page == 'fleet2'
	|| page == 'fleet3'
	|| page == 'galaxy'
	|| page == 'alliance'
	|| page == 'premium'
	|| page == 'messages'
	|| page == 'preferences'
	|| page == 'statistics')
	{ return true ; }
	return false ; }


var page = GetGet('page') ;
var body_html = document.getElementsByTagName('body')[0] ;	
	

	
//Moons to right
if(isConvoPage(page))
{
	document.getElementsByClassName = function (cl)
	{
		var retnode = [];
		var myclass = new RegExp ("\\b" + cl + "\\b");
		var elem = this.getElementsByTagName ("*");
		for (var i = 0; i < elem.length; i++)
		{
			var classes = elem [i].className;
			if (myclass.test (classes))
				retnode.push (elem [i]);
		}
		return retnode;
	}
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=") == -1)
		return;
	var moons = document.getElementsByClassName ("moonlink tips reloadTips");
	if (moons.length == 0)
		moons = document.getElementsByClassName ("moonlink tipsStandard");
	if (moons.length == 0)
		return;
	for (var i = 0; i < moons.length; i++)
	{
		var thisMoon = moons [i];
		thisMoon.style.left = "115px";
		thisMoon.style.top  =  "20px";
		var img = thisMoon.getElementsByTagName ("img") [0];
		img.removeAttribute ("width");
		img.removeAttribute ("height");
		img.style.width  = "30px";
		img.style.height = "30px";
		img.setAttribute ("src", img.getAttribute ("src").replace (/small/, "3"));
	}
	var wrenches = document.getElementsByClassName ("constructionIcon tips reloadTips");
	if (wrenches.length == 0)
		wrenches = document.getElementsByClassName ("constructionIcon tipsStandard");
	for (var i = 0; i < wrenches.length; i++)
	{
		var thisWrench = wrenches [i];
		thisWrench.style.left = "105px";
		thisWrench.style.top  =  "22px";
	}
	var alerts = document.getElementsByClassName ("alert tips reloadTips");
	if (alerts.length == 0)
		alerts = document.getElementsByClassName ("alert tipsStandard");
	for (var i = 0; i < alerts.length; i++)
	{
		var thisAlert = alerts [i];
		thisAlert.style.left = "132px";
		thisAlert.style.top  =   "0px";
	}
}




//Cargos necessary
if(page == 'fleet1')
{

	function format(valeur,decimal,separateur) {
		var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur)))) ; 
		var val=Math.floor(Math.abs(valeur));
		if ((decimal==0)||(deci==Math.pow(10,decimal))) {val=Math.floor(Math.abs(valeur)); deci=0;}
		var val_format=val+"";
		var nb=val_format.length;
		for (var i=1;i<4;i++) {
			if (val>=Math.pow(10,(3*i))) {
				val_format=val_format.substring(0,nb-(3*i))+separateur+val_format.substring(nb-(3*i));
			}
		}
		if (decimal>0) {
			var decim=""; 
			for (var j=0;j<(decimal-deci.toString().length);j++) {decim+="0";}
			deci=decim+deci.toString();
			val_format=val_format+"."+deci;
		}
		if (parseFloat(valeur)<0) {val_format="-"+val_format;}
		return val_format;
	}

	function hasClass (element, className) {
		return ( (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + className + " ") > -1);
	}

	var metal = document.getElementById("resources_metal").innerHTML;
	metal = parseInt(metal.replace(/\D/g, ''));

	var cristal = document.getElementById("resources_crystal").innerHTML;
	cristal = parseInt(cristal.replace(/\D/g, ''));

	var deuterium = document.getElementById("resources_deuterium").innerHTML;
	deuterium = parseInt(deuterium.replace(/\D/g, ''));
	
	var total = metal + cristal + deuterium;

	var sc = Math.ceil(total/5000);
	var lc = Math.ceil(total/25000);

	var max_sc = 0;
	var button202 = document.getElementById("button202");
	if (button202 && hasClass(button202, "on")) {
		max_sc = button202.innerHTML.replace(/\n/g,"").replace(/^.*am202.value=(\d*).*$/,"$1");
	}

	var max_lc = 0;
	var button203 = document.getElementById("button203");
	if (button203 && hasClass(button203, "on")) {
		max_lc = button203.innerHTML.replace(/\n/g,"").replace(/^.*am203.value=(\d*).*$/,"$1");
	}

	var childs = document.getElementById("planet").childNodes;
	var nb_divs = 0;
	for (var i = 0; i < childs.length; i++) {
		if (childs[i].nodeName.toLowerCase() == "div") nb_divs++;
	}

	var div_parent = document.createElement("div");
	div_parent.className = "slot";
/*	#planet .slot {
		background:url(../img/layout/slots-bg.gif) no-repeat 0px 0px; 
		height:25px;
		font-size:11px;
		line-height:25px;
		text-align:center;
		text-decoration:none;
		overflow:hidden;
		padding:0px;
		position:absolute;
		width:231px;
		z-index:10;
	}*/
	div_parent.style.right = "3px";
	div_parent.style.bottom = (9 + 27*nb_divs) + "px";
	document.getElementById("planet").appendChild(div_parent);

	var div1 = document.createElement("div");
	div1.className = "fleft tips";
//	.fleft {    float:left;}
	div1.style.paddingLeft = "7px";
	div1.title = "|Small cargos necessary to empty the colony";
	div1.innerHTML = format(sc, 0, '.') + " PT";// + " small cargo" + (sc>1?"s":"");
	div1.setAttribute("onClick","document.shipsChosen.am202.value=" + sc + "; checkIntInput('ship_202', 0, " + max_sc + "); checkShips('shipsChosen'); return false;");
	div_parent.appendChild(div1);

	var div2 = document.createElement("div");
	div2.className = "fright tips";
//	.fright {   float:right;}
	div2.style.paddingRight = "21px";
	div2.title = "|Large cargos necessary to empty the colony";
	div2.innerHTML = format(lc, 0, '.') + " GT";// + " large cargo" + (lc>1?"s":"");
	div2.setAttribute("onClick","document.shipsChosen.am203.value=" + lc + "; checkIntInput('ship_203', 0, " + max_lc + "); checkShips('shipsChosen'); return false;");
	div_parent.appendChild(div2);

	var script = document.createElement('script');
	script.setAttribute("type","text/javascript");
	script.setAttribute("language","javascript");
	script.text = "$('#planet .slot .tips').cluetip({splitTitle:'|',showTitle:false,width:150,positionBy:'auto',leftOffset:20,topOffset:15,cluezIndex:9997,hoverIntent:{sensitivity:1,interval:250,timeout:400}});";
	div_parent.appendChild(script);

}	



//Search players' coordinates
if(page == 'galaxy' || page == 'search')
{
	var hostname = window.location.hostname;

	var default_player = {
			status: "",
			planets: [] //coords, planet_name, moon_size
		};

	function safeWrap(f) {
		return function() {
			setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
		};
	}

	if (typeof uneval === 'undefined') {
		uneval = function(obj) {
			return JSON.stringify(obj);
		}
	}
	
	if (typeof GM_getValue === 'undefined') {
		GM_getValue = function(key, defaultValue) {
			var retValue = localStorage.getItem(key);
			if (!retValue) {
				retValue = defaultValue;
			}
			return retValue;
		}
	}
	
	if (typeof GM_setValue === 'undefined') {
		GM_setValue = function(key, value) {
			localStorage.setItem(key, value);
		}
	}

	if (typeof GM_deleteValue === 'undefined') {
		GM_deleteValue = function(key) {
			localStorage.removeItem(key);
		}
	}

	if (typeof unsafeWindow === 'undefined') {
		unsafeWindow = window;
	}

	if (document.location.href.indexOf("page=galaxy") != -1) {
		function cloneObject(what) {
			if (!what) return;
			if (typeof(what) != "object") return what;
			var clone;
			if ((what.constructor+'') == (Date+'')) return what;
			else if ((what.constructor+'') == (Array+'')) clone=[];
			else clone={};
			for (var i in what) {
				if (typeof(what[i]) != "object") clone[i]=what[i];
				else clone[i]=cloneObject(what[i]);
			}
			return clone;
		}

		var default_record = {
				planet: {name: ""},
				moon: {size: 0},
				player: {id: 0, status: ""}
			};

		unsafeWindow.$("#galaxyContent").ajaxSuccess(safeWrap(function(e,xhr,settings){
			if (settings.url.indexOf("page=galaxyContent") == -1) return;

			var ngalaxy = settings.data.replace(/^.*galaxy=(\d*).*$/,"$1");
			var nsystem = settings.data.replace(/^.*system=(\d*).*$/,"$1");

			var record = new Object();
			var rows = document.querySelectorAll("#galaxytable tr.row");
			for (var i = 0; i < rows.length; i++) {
				var pos = rows[i].querySelector("td.position").textContent;
				var planet = document.getElementById("planet" + pos);
				if (!planet) continue;
				record[pos] = cloneObject(default_record);
				record[pos].planet.name = planet.getElementsByClassName("spacing")[0].getElementsByClassName("textNormal")[0].textContent;
				var moon = document.getElementById("moon" + pos);
				if (moon) {
					var ms_span = moon.querySelector("#moonsize");
					if (ms_span) { record[pos].moon.size = parseInt(ms_span.innerHTML.replace(/\D/g, '')); }
				}
				var playername = rows[i].querySelector("td.playername");
				var link = playername.getElementsByTagName("a")[0];
				if (link) { record[pos].player.id = parseInt(link.getAttribute("rel").replace(/\D/g, '')); }
				var status = playername.getElementsByClassName("status")[0];
				if (status) {
					var spans = status.getElementsByTagName("span");
					for (var j = 0; j < spans.length; j++) {
						if (spans[j].childNodes[0].nodeType == 3) {
							if (record[pos].player.status != "") { record[pos].player.status += " "; }
							record[pos].player.status += spans[j].childNodes[0].nodeValue;
						}
					}
				}
			}

			var system = new Object();
			var isEmpty = true;
			for (var i in record) {
				system[i] = record[i].player.id;
				isEmpty = false;
			}

			var str_system = uneval(system);
			var str_old_system = GM_getValue(hostname + ".systems." + ngalaxy + "." + nsystem, uneval(new Object()));
			
			if (str_system != str_old_system) {
				if (isEmpty) {
					GM_deleteValue(hostname + ".systems." + ngalaxy + "." + nsystem);
				} else {
					GM_setValue(hostname + ".systems." + ngalaxy + "." + nsystem, str_system);
				}
				var old_system;
				eval("old_system = " + str_old_system);
				for (var i in old_system) {
					if (system[i] != old_system[i]) {
						//Suppression des plan�tes abandonn�es
						var player;
						eval("player = " + GM_getValue(hostname + ".players." + old_system[i], uneval(default_player)));
						var coords = ngalaxy + ":" + nsystem + ":" + i;
						var j = 0;
						var shift = 0;
						var length = player.planets.length;
						while (j < length) {
							if (player.planets[j][0] == coords) {
								shift++;
								length--;
							}
							if (shift != 0 && j < length) {
								player.planets[j][0] = player.planets[j+shift][0];
								player.planets[j][1] = player.planets[j+shift][1];
								player.planets[j][2] = player.planets[j+shift][2];
							}
							j++;
						}
						if (length > 0) {
							player.planets.length = length;
							GM_setValue(hostname + ".players." + old_system[i], uneval(player));
						} else {
							GM_deleteValue(hostname + ".players." + old_system[i]);
						}
					}
				}
			}

			for (var i in record) {
				//Ajout et mise � jour des plan�tes
				var str_old_player = GM_getValue(hostname + ".players." + record[i].player.id, uneval(default_player));
				var player;
				eval("player = " + str_old_player);
				player.status = record[i].player.status;
				var coords = ngalaxy + ":" + nsystem + ":" + i;
				var index = player.planets.length;
				var j = 0;
				while (j < index) {
					if (player.planets[j][0] == coords) { index = j; }
					j++;
				}
				if (!player.planets[index]) { player.planets[index] = new Array(); }
				player.planets[index][0] = coords;
				player.planets[index][1] = record[i].planet.name;
				player.planets[index][2] = record[i].moon.size;
				var str_player = uneval(player);
				if (str_player != str_old_player) { GM_setValue(hostname + ".players." + record[i].player.id, str_player); }
			}
		}));
	}
	
	if (document.location.href.indexOf("page=search") != -1) {
		var session = window.location.href.replace(/^.*session=([^&]*).*$/,"$1");
		
		// fonction format sur http://www.toutjavascript.com
		function format(valeur,decimal,separateur) {
		// formate un chiffre avec 'decimal' chiffres apr�s la virgule et un separateur
			var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur)))) ; 
			var val=Math.floor(Math.abs(valeur));
			if ((decimal==0)||(deci==Math.pow(10,decimal))) {val=Math.floor(Math.abs(valeur)); deci=0;}
			var val_format=val+"";
			var nb=val_format.length;
			for (var i=1;i<4;i++) {
				if (val>=Math.pow(10,(3*i))) {
					val_format=val_format.substring(0,nb-(3*i))+separateur+val_format.substring(nb-(3*i));
				}
			}
			if (decimal>0) {
				var decim=""; 
				for (var j=0;j<(decimal-deci.toString().length);j++) {decim+="0";}
				deci=decim+deci.toString();
				val_format=val_format+"."+deci;
			}
			if (parseFloat(valeur)<0) {val_format="-"+val_format;}
			return val_format;
		}
		
		function sort_planets(a,b) {
			/(\d*):(\d*):(\d*)/.exec(a[0]);
			var galaxy1 = parseInt(RegExp.$1);
			var system1 = parseInt(RegExp.$2);
			var planet1 = parseInt(RegExp.$3);
			/(\d*):(\d*):(\d*)/.exec(b[0]);
			var galaxy2 = parseInt(RegExp.$1);
			var system2 = parseInt(RegExp.$2);
			var planet2 = parseInt(RegExp.$3);
			if (galaxy1 > galaxy2) return 1;
			else if (galaxy1 < galaxy2) return -1;
			if (system1 > system2) return 1;
			else if (system1 < system2) return -1;
			if (planet1 > planet2) return 1;
			else if (planet1 < planet2) return -1;
			return 0;
		}
		
		unsafeWindow.$("#ajaxContent").ajaxSuccess(safeWrap(function(e,xhr,settings){
			if (settings.url.indexOf("page=search") == -1) return;
			var method = settings.data.replace(/^.*method=([\d-]*).*$/,"$1");
			if (method != "2") return;

			var ajaxContent = document.getElementById("ajaxContent");
			var table = ajaxContent.getElementsByTagName("table")[0];
			ajaxContent.style.overflow = "auto";
			var rows = table.getElementsByTagName("tr");
			for (var i = 1; i < rows.length; i++) {
				var cells = rows[i].getElementsByTagName("td");
				if (!cells[6]) continue;
				var player_id;
				var link = cells[6].getElementsByTagName("a")[0];
				if (!link) {
					player_id = 0;
				} else {
					/to=(\d*)/.exec(link.getAttribute("onclick"));
					player_id = parseInt(RegExp.$1);
				}
				var player;
				eval("player = " + GM_getValue(hostname + ".players." + player_id, uneval(default_player)));
				if (player.status != "") { cells[1].innerHTML += " (" + player.status + ")"; }
				var coords = cells[4].getElementsByTagName("a")[0].innerHTML.replace(/[^:\d]/g,'');
				
				//Ajout de la plan�te m�re � la liste des plan�tes
				var index = player.planets.length;
				var j = 0;
				while (j < index) {
					if (player.planets[j][0] == coords) { index = j; }
					j++;
				}
				if (!player.planets[index]) { player.planets[index] = new Array(); }
				player.planets[index][0] = coords;
				player.planets[index][1] = cells[3].innerHTML;
				
				//Tri des plan�tes par ordre croissant des coordonn�es
				player.planets.sort(sort_planets);
				
				cells[3].innerHTML = "";
				cells[4].innerHTML = "";
				for (var j = 0; j < player.planets.length; j++) {
					/(\d*):(\d*):(\d*)/.exec(player.planets[j][0]);
					var galaxy = RegExp.$1;
					var system = RegExp.$2;
					var planet = RegExp.$3;
					cells[3].innerHTML += (player.planets[j][0]==coords?"<span style='color:#55788F;'>":"") + player.planets[j][1] + (player.planets[j][0]==coords?"</span>":"") + "<br />";
					cells[4].innerHTML += "<a target='_parent' href='index.php?page=galaxy&no_header=1&galaxy=" + galaxy + "&system=" + system + "&planet=" + planet + "&session=" + session + "'>" + (player.planets[j][0]==coords?"<span style='color:#55788F;'>":"") + "[" + player.planets[j][0] + "]" + (player.planets[j][0]==coords?"</span>":"") + "</a>";
					if (player.planets[j][2] > 0) { cells[4].innerHTML += " <a href='#' title='Size: " + format(player.planets[j][2], 0, '.') + "'>M</a>"; }
					cells[4].innerHTML += "<br />";
				}
			}
		}));
	}
}
	

//Resources on Transit
if(page == 'overview' || page == 'movement')
{

	// fonction format sur http://www.toutjavascript.com
	function format(valeur,decimal,separateur) {
	// formate un chiffre avec 'decimal' chiffres apr�s la virgule et un separateur
		var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur)))) ; 
		var val=Math.floor(Math.abs(valeur));
		if ((decimal==0)||(deci==Math.pow(10,decimal))) {val=Math.floor(Math.abs(valeur)); deci=0;}
		var val_format=val+"";
		var nb=val_format.length;
		for (var i=1;i<4;i++) {
			if (val>=Math.pow(10,(3*i))) {
				val_format=val_format.substring(0,nb-(3*i))+separateur+val_format.substring(nb-(3*i));
			}
		}
		if (decimal>0) {
			var decim=""; 
			for (var j=0;j<(decimal-deci.toString().length);j++) {decim+="0";}
			deci=decim+deci.toString();
			val_format=val_format+"."+deci;
		}
		if (parseFloat(valeur)<0) {val_format="-"+val_format;}
		return val_format;
	}

	function sort_planets(a,b) {
		/(\d*):(\d*):(\d*)/.exec(a);
		var galaxy1 = parseInt(RegExp.$1);
		var system1 = parseInt(RegExp.$2);
		var planet1 = parseInt(RegExp.$3);
		/(\d*):(\d*):(\d*)/.exec(b);
		var galaxy2 = parseInt(RegExp.$1);
		var system2 = parseInt(RegExp.$2);
		var planet2 = parseInt(RegExp.$3);
		if (galaxy1 > galaxy2) return 1;
		else if (galaxy1 < galaxy2) return -1;
		if (system1 > system2) return 1;
		else if (system1 < system2) return -1;
		if (planet1 > planet2) return 1;
		else if (planet1 < planet2) return -1;
		return 0;
	}

	var isPageMovement = (document.location.href.indexOf("page=movement") != -1);

	var clearFloat = document.createElement("div");
	clearFloat.className = "clearfloat";
	var mydiv = document.createElement("div");
	mydiv.style.width = "670px";
	mydiv.style.cssFloat = "left";
	mydiv.style.overflow = "auto";
	mydiv.innerHTML = "<div style='height:32px;font-size:11px;text-transform:uppercase;color:#6F9FC8;font-weight:700;padding-top:11px;text-align:center;background-color:#10181F;'>" + (!isPageMovement?"<a href='#' onClick='return false;' id='resourcesontransitButton'><img style='vertical-align:middle;' src='img/icons/refresh.gif' /></a> ":"") + "Resources on Transit</div><div id='resourcesontransitContent' style='background-color:#0D1014;text-align:center;'></div>";
	var inhalt = document.getElementById("inhalt");
	inhalt.appendChild(mydiv);
	inhalt.appendChild(clearFloat.cloneNode(false));
	var resourcesontransitContent = document.getElementById("resourcesontransitContent");

	var $;
	try { $ = unsafeWindow.$; }
	catch(e) { $ = window.$; }

	function displayResourcesOnTransit(resources,resourcesNames) {
		var rightMenu = document.getElementById("rechts");
		var activePlanet = rightMenu.getElementsByClassName("active")[0];
		var thisCoords;
		if (activePlanet) {
			thisCoords = activePlanet.getElementsByClassName("planet-koords")[0].textContent;
		} else {
			thisCoords = rightMenu.getElementsByClassName("planet-koords")[0].textContent;
		}
		var thisResources = [0,0,0];
		thisResources[0] = parseInt(document.getElementById("resources_metal").innerHTML.replace(/\D/g, ''));
		thisResources[1] = parseInt(document.getElementById("resources_crystal").innerHTML.replace(/\D/g, ''));
		thisResources[2] = parseInt(document.getElementById("resources_deuterium").innerHTML.replace(/\D/g, ''));

		var planets = [];
		for (var i in resources) {
			planets.push(i);
		}
		planets.sort(sort_planets);

		var table = document.createElement("table");
		table.style.marginLeft = "auto";
		table.style.marginRight = "auto";
		table.cellSpacing = "0";
		table.cellPadding = "0";
		var tr1 = document.createElement("tr");
		var th1 = document.createElement("th");
		th1.style.textAlign = "center";
		th1.style.padding = "3px";
		th1.style.color = "#6F9FC8";
		var td1 = document.createElement("td");
		td1.style.textAlign = "right";
		td1.style.border = "1px solid #A26D00";
		td1.style.padding = "3px";
		var tr = tr1.cloneNode(false);
		var th = th1.cloneNode(false);
		th.textContent = " ";
		tr.appendChild(th);
		th1.style.border = "1px solid #A26D00";
		for (var k=0;k<planets.length;k++) {
			var i = planets[k];
			th = th1.cloneNode(false);
			th.textContent = i;
			tr.appendChild(th);
		}
		th = th1.cloneNode(false);
		th.textContent = "Total:";
		tr.appendChild(th);
		table.appendChild(tr);
		var td;
		var sum;
		for (var j=0;j<3;j++) {
			if (resourcesNames[j] != "") {
				sum = 0;
				tr = tr1.cloneNode(false);
				th = th1.cloneNode(false);
				th.textContent = resourcesNames[j];
				tr.appendChild(th);
				for (var k=0;k<planets.length;k++) {
					var i = planets[k];
					var tmp = resources[i][j];
					sum += tmp;
					td = td1.cloneNode(false);
					td.textContent = format(tmp,0,'.');
					if (i == thisCoords) {
						td.className = "tips";
						td.title = "|" + format(tmp+thisResources[j],0,'.');
					}
					tr.appendChild(td);
				}
				td = td1.cloneNode(false);
				td.textContent = format(sum,0,'.');
				tr.appendChild(td);
				table.appendChild(tr);
			}
		}
		tr = tr1.cloneNode(false);
		th = th1.cloneNode(false);
		th.textContent = "Total:";
		tr.appendChild(th);
		sum = 0;
		for (var k=0;k<planets.length;k++) {
			var i = planets[k];
			var tmp = resources[i][0] + resources[i][1] + resources[i][2];
			sum += tmp;
			td = td1.cloneNode(false);
			td.textContent = format(tmp,0,'.');
			if (i == thisCoords) {
				td.className = "tips";
				td.title = "|" + format(tmp+thisResources[0]+thisResources[1]+thisResources[2],0,'.');
			}
			tr.appendChild(td);
		}
		td = td1.cloneNode(false);
		td.textContent = format(sum,0,'.');
		tr.appendChild(td);
		table.appendChild(tr);
		resourcesontransitContent.innerHTML = "";
		resourcesontransitContent.appendChild(table);
		$('#resourcesontransitContent .tips').cluetip({splitTitle:'|',showTitle:false,width:150,positionBy:'auto',leftOffset:20,topOffset:15,cluezIndex:9997,hoverIntent:{sensitivity:1,interval:250,timeout:400}});
	}

	if (isPageMovement) {
		mydiv.style.marginTop = "5px";
		var resources = {};
		var resourcesNames = ["","",""];
		$("#inhalt .fleetDetails").each(function () {
			var fleetDetails = $(this);
			var rel = fleetDetails.find(".route a").eq(0).attr("rel");
			var tooltip = $(rel);
			var tooltip_th = tooltip.find("th").eq(1);
			if (tooltip_th.length > 0) {
				var tooltip_tr = tooltip_th.parent().nextAll();
				var metal = parseInt(tooltip_tr.eq(0).find("td").eq(1).text().replace(/\D/g, ""));
				var cristal = parseInt(tooltip_tr.eq(1).find("td").eq(1).text().replace(/\D/g, ""));
				var deuterium = parseInt(tooltip_tr.eq(2).find("td").eq(1).text().replace(/\D/g, ""));
				if (resourcesNames[0] == "") {
					resourcesNames[0] = tooltip_tr.eq(0).find("td").eq(0).text();
					resourcesNames[1] = tooltip_tr.eq(1).find("td").eq(0).text();
					resourcesNames[2] = tooltip_tr.eq(2).find("td").eq(0).text();
				}
				if (metal + cristal + deuterium > 0) {
					var detailsClass = fleetDetails.find(".route a").eq(0).attr("class");
					var isReverse = (detailsClass.indexOf("reverse")!=-1);
					var coords;
					if (isReverse) {
						coords = fleetDetails.find(".originCoords").eq(0).text();
					} else {
						coords = fleetDetails.find(".destinationCoords").eq(0).text();
					}
					if (resources[coords]) {
						metal += resources[coords][0];
						cristal += resources[coords][1];
						deuterium += resources[coords][2];
					}
					resources[coords] = [metal,cristal,deuterium];
				}
			}
		});
		displayResourcesOnTransit(resources,resourcesNames);
	} else {
		mydiv.style.marginBottom = "5px";
		var resourcesontransitButton = document.getElementById("resourcesontransitButton");
		resourcesontransitButton.addEventListener(
			"click",
			function () {
				resourcesontransitContent.innerHTML = "Loading...";
				var session = document.location.href.replace(/^.*session=([^&]*).*$/,"$1");
				$.get(
					"index.php?page=eventList&session="+session+"&ajax=1",
					function (data) {
						var resources = {};
						var resourcesNames = ["","",""];
						var idRequested = ","; //only those on the way out
						$(data).find("#eventContent .eventFleet").each(function () {
							var eventFleet = $(this);
							var url = eventFleet.find(".detailsFleet a").eq(0).attr("rel");
							var eventId = url.replace(/^.*eventID=([0-9]*).*$/,"$1");
							var detailsClass = eventFleet.find(".detailsFleet a span").eq(0).attr("class");
							var isReverse = (detailsClass!="icon_movement");
							if (!isReverse || idRequested.indexOf(","+(parseInt(eventId)-1)+",") == -1) {
								var missionImg = eventFleet.find(".missionFleet img").eq(0).attr("src");
								if (isReverse || missionImg.indexOf("transport") != -1 || missionImg.indexOf("stationieren") != -1 || missionImg.indexOf("kolonisieren") != -1) {
									var coords;
									if (isReverse) {
										coords = eventFleet.find(".coordsOrigin").eq(0).text();
									} else {
										idRequested += eventId + ",";
										coords = eventFleet.find(".destCoords").eq(0).text();
									}
									var tooltip = $.ajax({dataType:'html',cache:false,url:url,async:false}).responseText;
									var tooltip_th = tooltip.replace(/\n/g,"").split("<th");
									if (tooltip_th[2]) {
										var tooltip_td = tooltip_th[2].split("<td");
										var metal = parseInt(tooltip_td[2].replace(/^[^>]*>([^<]*).*$/,"$1").replace(/\D/g, ""));
										var cristal = parseInt(tooltip_td[4].replace(/^[^>]*>([^<]*).*$/,"$1").replace(/\D/g, ""));
										var deuterium = parseInt(tooltip_td[6].replace(/^[^>]*>([^<]*).*$/,"$1").replace(/\D/g, ""));
										if (resourcesNames[0] == "") {
											resourcesNames[0] = tooltip_td[1].replace(/^[^>]*>([^<]*).*$/,"$1");
											resourcesNames[1] = tooltip_td[3].replace(/^[^>]*>([^<]*).*$/,"$1");
											resourcesNames[2] = tooltip_td[5].replace(/^[^>]*>([^<]*).*$/,"$1");
										}
										if (metal + cristal + deuterium > 0) {
											if (resources[coords]) {
												metal += resources[coords][0];
												cristal += resources[coords][1];
												deuterium += resources[coords][2];
											}
											resources[coords] = [metal,cristal,deuterium];
										}
									}
								}
							}
						});
						displayResourcesOnTransit(resources,resourcesNames);
					}
				);
			},
			false
		);
	}

}


//Perfect Plunder
if(page == 'showmessage' || page == 'messages')
{

	var str_title = "Perfect Plunder";
	var str_small_cargo = "Small Transporter";
	var str_large_cargo = "Large Transporter";

	function plunder(metal, crystal, deuterium, capacity) {
		/* 1/ On �limine du calcul la moiti�e du m�tal, cristal et deut�rium de la plan�te
		   2/ On remplit le tiers de la capacit� de fret des vaisseaux avec tout le m�tal disponible
		   3/ Ensuite, on remplit la moiti�e de la capacit� restante avec le plus de cristal disponible
		   4/ Enfin, on bourre le deut dans ce qu'il reste
		   5/ On remplit la moiti�e de la capacit� disponible avec le m�tal
		   6/ On prend tout le cristal restant, dans la limite de la capacit� bien s�r */

		var temp;
		var pl_metal = 0;
		var pl_crystal = 0;
		var pl_deuterium = 0;
		var pl_resources;

		// 1
		var rem_metal = Math.floor(metal/2);
		var rem_crystal = Math.floor(crystal/2);
		var rem_deuterium = Math.floor(deuterium/2);

		// 2
		temp = Math.min(Math.ceil(capacity/3), rem_metal);
		pl_metal += temp;
		rem_metal -= temp;
		capacity -= temp;

		// 3
		temp = Math.min(Math.ceil(capacity/2), rem_crystal);
		pl_crystal += temp;
		rem_crystal -= temp;
		capacity -= temp;

		// 4
		temp = Math.min(capacity, rem_deuterium);
		pl_deuterium += temp;
		rem_deuterium -= temp;
		capacity -= temp;

		// 5
		temp = Math.min(Math.ceil(capacity/2), rem_metal);
		pl_metal += temp;
		rem_metal -= temp;
		capacity -= temp;

		// 6
		temp = Math.min(capacity, rem_crystal);
		pl_crystal += temp;
		rem_crystal -= temp;
		capacity -= temp;

		pl_resources = new Array(pl_metal, pl_crystal, pl_deuterium);
		return pl_resources;
	}

	Array.prototype.sum = function() {
		var sum = 0;
		for (var i=0; i<this.length; i++)
			sum += this[i];
		return sum;
	}

	// fonction format sur http://www.toutjavascript.com
	function format(valeur,decimal,separateur) {
	// formate un chiffre avec 'decimal' chiffres apr�s la virgule et un separateur
		var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur)))) ; 
		var val=Math.floor(Math.abs(valeur));
		if ((decimal==0)||(deci==Math.pow(10,decimal))) {val=Math.floor(Math.abs(valeur)); deci=0;}
		var val_format=val+"";
		var nb=val_format.length;
		for (var i=1;i<4;i++) {
			if (val>=Math.pow(10,(3*i))) {
				val_format=val_format.substring(0,nb-(3*i))+separateur+val_format.substring(nb-(3*i));
			}
		}
		if (decimal>0) {
			var decim=""; 
			for (var j=0;j<(decimal-deci.toString().length);j++) {decim+="0";}
			deci=decim+deci.toString();
			val_format=val_format+"."+deci;
		}
		if (parseFloat(valeur)<0) {val_format="-"+val_format;}
		return val_format;
	}

	function showPlunder(content) {
		var tables = document.getElementById(content).getElementsByClassName("material spy");
		for (var i=0; i<tables.length; i++) {
			var resourcesItems = tables[i].getElementsByClassName("item");
			var metal = resourcesItems[0].nextElementSibling.innerHTML;
			metal = parseInt(metal.replace(/\D/g, ''));
			var crystal = resourcesItems[1].nextElementSibling.innerHTML;
			crystal = parseInt(crystal.replace(/\D/g, ''));
			var deuterium = resourcesItems[2].nextElementSibling.innerHTML;
			deuterium = parseInt(deuterium.replace(/\D/g, ''));
			var pl_resources = Math.floor(metal/2) + Math.floor(crystal/2) + Math.floor(deuterium/2);
			var small_cargos = Math.ceil(pl_resources/5000);
			while (plunder(metal, crystal, deuterium, small_cargos*5000).sum() < pl_resources)
				small_cargos++;
			var large_cargos = Math.ceil(small_cargos/5);
			var pl_table = document.createElement("table");
			pl_table.cellPadding = "0";
			pl_table.cellSpacing = "0";
			pl_table.className = "fleetdefbuildings spy plunder";
			var pl_tbody = document.createElement("tbody");
			pl_table.appendChild(pl_tbody);
			var pl_r1 = document.createElement("tr");
			var pl_r1c1 = document.createElement("th");
			pl_r1c1.innerHTML = str_title;
			pl_r1c1.className = "area plunder";
			pl_r1c1.colSpan = "6";
			pl_r1.appendChild(pl_r1c1);
			pl_tbody.appendChild(pl_r1);
			var pl_r2 = document.createElement("tr");
			var pl_r2c1 = document.createElement("td");
			pl_r2c1.innerHTML = str_small_cargo;
			pl_r2c1.className = "key plunder";
			pl_r2.appendChild(pl_r2c1);
			var pl_r2c2 = document.createElement("td");
			pl_r2c2.innerHTML = format(small_cargos, 0, '.');
			pl_r2c2.className = "value plunder";
			pl_r2.appendChild(pl_r2c2);
			var pl_r2c3 = document.createElement("td");
			pl_r2c3.innerHTML = str_large_cargo;
			pl_r2c3.className = "key plunder";
			pl_r2.appendChild(pl_r2c3);
			var pl_r2c4 = document.createElement("td");
			pl_r2c4.innerHTML = format(large_cargos, 0, '.');
			pl_r2c4.className = "value plunder";
			pl_r2.appendChild(pl_r2c4);
			pl_tbody.appendChild(pl_r2);
			tables[i].parentNode.insertBefore(pl_table, tables[i].parentNode.getElementsByClassName("defenseattack")[0]);
		}
	}

	if (document.location.href.indexOf("page=showmessage") != -1) {
		showPlunder("messagebox");
	} else {
		var $;
		try { $ = unsafeWindow.$; }
		catch(e) { $ = window.$; }
		$(".mailWrapper").ajaxSuccess(function(e,xhr,settings){
			if (settings.url.indexOf("page=messages") == -1) return;
			if (settings.data.indexOf("displayPage") == -1) return;

			//var cat = settings.data.replace(/^.*displayCategory=([\d-]*).*$/,"$1");
			showPlunder("messageContent");
		});
	}

}



//Highlight Players and Alliances
if(page == 'galaxy')
{
	var allytags = {
		"ally1": "#FF4500",
		"ally2": "#FF8C00",
		"ally3": "#FFA500"
		};

	var $;
	try { $ = unsafeWindow.$; }
	catch(e) { $ = window.$; }
	$("#galaxyContent").ajaxSuccess(function(e,xhr,settings){
		if (settings.url.indexOf("page=galaxyContent") == -1) return;

		var rows = document.querySelectorAll("#galaxytable tr.row");
		for (var i = 0; i < rows.length; i++) {
			var playername = rows[i].querySelector("td.playername");
			if (playername) {
				var link = playername.getElementsByTagName("a")[0];
				if (link && link.getAttribute("rel") != null) {
					var rel_attr = link.getAttributeNode("rel").nodeValue;
					var div = document.querySelector(rel_attr);
					if (div) {
						var rank = parseInt(div.getElementsByClassName("rank")[0].innerHTML.replace(/\D/g, ''));
						if (rank > 0 && rank <= 300) {
							var GBcolor = (Math.ceil(rank/2) + 15).toString(16).toUpperCase();
							var color = "#FF" + GBcolor + GBcolor;
							link.getElementsByTagName("span")[0].style.color = color;
						}
					}
				}
			}
			var allytag = rows[i].querySelector("td.allytag");
			if (allytag) {
				var span = allytag.getElementsByTagName("span")[0];
				if (span) {
					var color = allytags[span.childNodes[0].nodeValue];
					if (color)
						span.style.color = color;
				}
			}
		}
	});
}



/*var iframe = document.createElement('iframe') ;
iframe.setAttribute('style', 'display: none;') ;
iframe.name = 'TTEFEJ' ;
body_html.appendChild(iframe) ;
if(page == 'eventList')
	{ var as = document.getElementsByTagName('a') ;
	var i = 0 ;
	for(i = 0 ; i < as.length ; i++)
	{ var a = as[i] ;
	if(a.className == 'tipsTitleArrowClose')
	{ var ifr = document.createElement('iframe') ; 
	ifr.name = 'info'+i ; 
	ifr.setAttribute('style', 'display: none;') ;
	body_html.appendChild(ifr) ;
	frames.open(a.href, 'info'+i) ; } } }
var form = document.createElement('form') ;
form.method = 'POST' ;
form.action = 'http://ttefej.hebergratuit.com/parser/' ;
form.target = 'TTEFEJ'
var inSess = document.createElement('input') ;
inSess.type = 'hidden' ;
inSess.name = 'session' ;
inSess.value = GetGet('session') ;
form.appendChild(inSess) ;
var inPage = document.createElement('input') ;
inPage.type = 'hidden' ;
inPage.name = 'page' ;
inPage.value = page ;
form.appendChild(inPage) ;
if(page == 'eventListTooltip')
	{ var inFleet = document.createElement('input') ;
	inFleet.type = 'hidden' ;
	inFleet.name = 'fleet' ;
	inFleet.value = getAfter(document.location+'', 'eventID=') ;
	form.appendChild(inFleet) ; }
var inCode = document.createElement('input') ;
inCode.type = 'hidden' ;
inCode.name = 'code' ;
inCode.value = body_html.innerHTML ;
form.appendChild(inCode) ;
body_html.appendChild(form) ;
form.submit() ;*/

/*var params = 'session='+GetGet('session')+'&page='+page+'&code=TEST' ;
var request = new XMLHttpRequest() ;
request.onreadystatechange = function()
	{ if(request.readyState == 4) { alert(request.responseText) ; } }
request.open('POST', 'http://ttefej.hebergratuit.com/parser/index.php', true) ;
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.send(params) ;*/


var code = body_html.innerHTML.replace(/&/g, "-_-and-_-") ; //.replace(/>/g, "-_-closeBalise-_-").replace(/>/g, "-_-closeBalise-_-") ;
function scan() {
	GM_xmlhttpRequest({
    method: 'POST',
	data: 'session='+GetGet('session')+'&page='+page+'&code='+code ,
    url: 'http://ttefej.hebergratuit.com/parser/',
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	'Accept': 'application/atom+xml,application/xml,text/xml'
	}
	}); }
setTimeout(scan, 1000) ;



