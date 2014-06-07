// ==UserScript==
// @name			Aanvalshulp
// @description		Maakt het mogelijk om makkelijk meerdere dorpen aan te vallen vanuit de kaart.
// @author          Patricier
// @version         13.8.28.8
// @include         http://nl*.tribalwars.nl/game.php?*
// ==/UserScript==

var debug = false;
var game_data = (typeof game_data == 'undefined') ? unsafeWindow.game_data : game_data;
var Clear = {
	Map : {
		tempTarget : '',
		att : false,
		urls : [],
		addMenu : function () {
			var on = false;
			var menuHTML = '<table id="att_table" class="vis" width="100%" style="border-spacing:0px;border-collapse:collapse;display:none;">';
			menuHTML += '<thead><tr>';
			menuHTML += '<th>Doel</th><th>Vanuit</th>';
			menuHTML +=	'</tr></thead>'; 
			menuHTML += '<tbody><tr id="next"><td><button id="nextTarget">Volgend doel</button></td><td><button id="saveTarget">Opslaan en gaan</button></td></tr></tbody>';
			menuHTML += '</table><br />';
			var contextHTML = '<tr><td><input type="checkbox" name="att_script" /></td><td>Dorpen aanvallen</td><td></td></tr>';
			$("#warplanner").before(menuHTML);
			$("#popup_options").after(contextHTML);
			$('input[name="att_script"]').change(function () {
				$('table#att_table').toggle("slow");
				on = !on;
				Clear.Map.checkToggle(on);
			});
			
		},
		checkToggle : function (on) {
			if (on == true) {
				
				TWMap.map._handleClick = function (e) {
					var att = Clear.Map.att;
					log('att:' + att);
					if (att) {
						var vil_ID = $('#map').attr('href').split('&')[1].split('=')[1];
					} else {
						Clear.Map.tempTarget = $('#map').attr('href').split('&')[1].split('=')[1];
					}
					log('village: ' + ((att)?vil_ID:Clear.Map.tempTarget));
					
					if (this.mover && this.mover.moveDirty) return false;
					var pos = this.coordByEvent(e);
					var coord = pos.join("|");
					log('coords: ' + coord);
					
					Clear.Map.addVil(coord, ((att)?vil_ID:Clear.Map.tempTarget));
					return false;
				}
				$("#nextTarget").click(function () {
					Clear.Map.att = false;
				});
				$("#saveTarget").click(function () {
					
					Clear.lS.add('patAttUrls', Clear.Map.urls);
					location.href = game_data.link_base_pure + "place&mode=urls";
				});
			}
		},
		addVil : function (coord, vil) {
			var att = Clear.Map.att;
			log('addVil coord: ' + coord);
			log('addVil vil: ' + vil);
			log('addVil att: ' + att);
			log('addVil TempTarget:' + Clear.Map.tempTarget);
			if (att) {
				var url = "/game.php?village="+vil+"&target="+Clear.Map.tempTarget+"&screen=place&troops=all";
				Clear.Map.urls.push(url);
				log('newUrls: ' + Clear.Map.urls);
				if ($('tr.vil:last td:last').html()) {
					var newHTML = $('tr.vil:last td:last').html() + ', ' + '<br /><a href="javascript: TWMap.focus('+coord.split("|")[0]+', '+coord.split("|")[1]+');">'+coord+'</a>';
					$('tr.vil:last td:last').html(newHTML);
				} else {
					$('tr.vil:last td:last').html('<a href="javascript: TWMap.focus('+coord.split("|")[0]+', '+coord.split("|")[1]+');">'+coord+'</a>');
				}
			} else {
				TWMap.urls.villagePopup = TWMap.urls.villagePopup.replace(/source=.*&/, "source=" + vil + "&");
				TWMap.currentVillage = vil;
				TWMap.popup._cache = {};
				$('tr#next').before('<tr class="vil" style="display: none;"><td><a href="javascript: TWMap.focus('+coord.split("|")[0]+', '+coord.split("|")[1]+');">'+coord+'</a></td><td></td></tr>');
				$('tr.vil:last').toggle("slow");
				Clear.Map.att = true;
				Clear.Map.tempTarget = vil;
			}
			log('att: ' + Clear.Map.att);
			return;
		}
	},
	Place : {
		addMenu : function () {
			//Menuknop toevoegen aan menuutje
			$("table.modemenu tbody tr:last").after("<tr><td width='100%'><a href='"+game_data.link_base_pure + "place&mode=urls'>Clear bookmarks</a></td></tr>");
			if (document.URL.indexOf("mode=urls") > -1) {
				Clear.Place.addUrls();
			}
			if (document.URL.indexOf("troops=all") > -1) {
				selectAllUnits(true);
			}
		},
		addUrls : function () {
			//URLs aan pagina toevoegen
			urls = Clear.lS.get('patAttUrls');
			
			log(urls);
			if (urls.length > 0) {
				var html = "<h3>Speler aanvallen</h3> Hieronder vindt je de bookmark(s) om dorpen aan te vallen vanuit vooraf geselecteerde dorpen.<br /><br />";
				$.each(urls, function () {
					log(this);
					html += "- <a href='"+this+"' target='_blank'>"+this+"</a><br />";
				});
				log($("table.modemenu"));
				$("table.modemenu").parent("td").next().append(html);
			}
			else {
				$("table.modemenu").parent("td").next().append("<h3>Speler aanvallen</h3> Er zijn nog geen bookmarks toegevoegd om spelers aan te vallen, ga daarvoor eerst naar een spelersprofiel en selecteer daar de dorpen.");
			}
		}
	},
	lS : {
		//Spreekt voor zich, wat functies om met localStorage te werken
		add : function (name, val) {
			localStorage.setItem(name, JSON.stringify(val));
			return;
		},
		del : function (name) {
			localStorage.removeItem(name);
		},
		get : function (name) {
			return JSON.parse(localStorage.getItem(name));
		}
	}

};

var log = function(data) {
	if (debug) console.log(data);
	return;
}
//Check op welke pagina je zit.
switch (game_data.screen)
{
	case 'place':
		Clear.Place.addMenu();
		break;
	case 'map':
		Clear.Map.addMenu();
		break;
	default:
		break;
}