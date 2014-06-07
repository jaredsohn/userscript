// ==UserScript==
  
// @name            GM Deff-pack
  
// @author          Tjeerdo & Cgrain
// @version         1.2 
// @description     Deff-pack
// @include         http://nl*.tribalwars.nl/game.php?*
// @exclude         http://nl*.tribalwars.nl/game.php?*screen=am_farm*
  
/* Functionaliteiten:
 * Verbeterde OS-aanvrager
 * (Massa-)tagger
 * Stack-beoordelaar
 * op doel filteren
 * ID tagger (momenteel alleen voor nieuwere werelden, dus vanaf W21 werkt die denk ik)
 * bij verzamelplaats --> aanvragen filteren op boerderijplaatsen ;)
 * Fakezoeker
 * Laatste aanvallen per dorp markeren
 * Timers stoppen
 */
  
/* TO-DO List:
 * ID tagger voor oude werelden, is makkelijk te maken als de id tagger voor de nieuwe werelden er is.
 * vanalles :p
 */
  
// ==/UserScript==
(function (f) {
    var d = document,
        s = d.createElement('script');
    s.textContent = '$(document).ready(' + f.toString() + ')';
    (d.body || d.head || d.documentElement).appendChild(s);
})(function () {
var win = window.main ? window.main : window,
gd = win.game_data;

var world_data = {};
		var current_page = "";
		    var population = {
            'spear': 1,
	    'sword': 1,
	    'axe': 1,
	    'archer': 1,
            'spy': 2,
	    'light': 4,
	    'marcher': 5,
	    'heavy': 6,
            'ram': 5,
	    'catapult': 8,
            'knight': 10,
	    'snob': 100
        };
		// world config: global game settings
		var world_config = {
			hasMilitia: false,
			nightbonus: {
				active: false,
				from: 0, 
				till: 0
				},
			smithyLevels: true,
			hasChurch: false,
			hasArchers: false,
			hasKnight: false,
			speed: 1,
			unitSpeed: 1,
			farmLimit: 0,
			minFake: 0,
			hasMinFakeLimit: false,
			coins: false,
			maxNobleWalkingTime: 999
		};
		if (localStorage['CTworldconfig'] !== undefined) {
			world_config = JSON.parse(localStorage['CTworldconfig']);
			
		} 
		else {
			// load new world through tw API
			
				function world_config_setter_unit(configBag, unitInfoXml) {
					configBag.hasMilitia = $("config militia", unitInfoXml).length !== 0;
				}
				
				function world_config_setter(configBag, infoXml) {
					configBag.nightbonus = {
						active: $("night active", infoXml).text() === "1",
						from: parseInt($("night start_hour", infoXml).text(), 10),
						till: parseInt($("night end_hour", infoXml).text(), 10)
						};
					configBag.smithyLevels = $("game tech", infoXml).text() === "1" || $("game tech", infoXml).text() === "0";
					configBag.hasChurch = $("game church", infoXml).text() !== "0";
					configBag.hasArchers = $("game archer", infoXml).text() !== "0";
					configBag.hasKnight = $("game knight", infoXml).text() !== "0";
					configBag.speed = parseFloat($("config speed", infoXml).text());
					configBag.unitSpeed = parseFloat($("config unit_speed", infoXml).text());
					configBag.farmLimit = parseInt($("game farm_limit", infoXml).text(), 10);
					configBag.minFake = parseInt($("game fake_limit", infoXml).text(), 10) / 100;
					configBag.hasMinFakeLimit = configBag.minFake > 0;
					configBag.coins = $("snob gold", infoXml).text() === "1";
					configBag.maxNobleWalkingTime = parseInt($("snob max_dist", infoXml).text(), 10) * configBag.speed * configBag.unitSpeed;
				}

				function world_config_getter(world) {
					// world nl: http://nl16.tribalwars.nl/
					// world de: http://de90.die-staemme.de/
					if (typeof world === 'undefined') world = '';
					
					var world_config = {};
					$.ajax({
						url: world + "interface.php?func=get_unit_info",
						async: false,
						success: function(xml) {
							world_config_setter_unit(world_config, xml);
						}
					});
				
					$.ajax({
						url: world + "interface.php?func=get_config",
						async: false,
						success: function(xml) {
							world_config_setter(world_config, xml);
						}
					});
					return world_config;
				}
				
				world_config = world_config_getter();
			localStorage["CTworldconfig"]=JSON.stringify(world_config);
		}
var unitStat = [[10, 15, 45, 20], [25, 50, 15, 40], [40, 10, 5, 10], [15, 50, 40, 5], [0, 2, 1, 2], [130, 30, 40, 30], [120, 40, 30, 50], [150, 200, 80, 180], [2, 20, 50, 20], [100, 100, 50, 100],[150, 250, 400, 150], [30, 100, 50, 100]];
		if(localStorage.getItem("CTPack_Units") === null) {
        var URL_UnitInfo = "http://" + game_data.world + ".tribalwars.nl/interface.php?func=get_unit_info";
        $.ajax({
            url: URL_UnitInfo,
            success: function (UnitResult) {
                var CTPack_Units = {
                    'Speer/Bijl': parseFloat($(UnitResult).find("spear").find("speed").text()),
                    'Zwaard': parseFloat($(UnitResult).find("sword").find("speed").text()),
                    'Boog': parseFloat($(UnitResult).find("archer")) ? parseFloat($(UnitResult).find("archer").find("speed").text()) : null,
                    'Scouts':parseFloat($(UnitResult).find("spy").find("speed").text()),
                    'LC':parseFloat($(UnitResult).find("light").find("speed").text()),
                    'Bereden Boog': parseFloat($(UnitResult).find("marcher")) ? parseFloat($(UnitResult).find("marcher").find("speed").text()) : null,
                    'ZC':parseFloat($(UnitResult).find("heavy").find("speed").text()),
                    'Ram/Kata': parseFloat($(UnitResult).find("ram").find("speed").text()),
                    '!!Edel!!': parseFloat($(UnitResult).find("snob").find("speed").text())
                };
                localStorage.setItem('CTPack_Units', JSON.stringify(CTPack_Units));
            }
        });
        }
        var CTPack_Units = JSON.parse(localStorage.getItem("CTPack_Units"));
var settings = {};
if (localStorage['CTPack-Settings'] === undefined) { 
		settings['Stackbeoordeling'] = "muur";
		settings['Offopp']= [0,0,7000,0,0,3000,0,0,300,0,0,0];
		settings['mobdef']= [7000,0,0,7000,0,0,0,1500,5,0,0,0];
		localStorage['CTPack-Settings']= JSON.stringify(settings);
}
settings = JSON.parse(localStorage['CTPack-Settings']);
$('#linkContainer').append('<a href="#" id="deffsettings"> - CT Deff Pack</a>');

$("#deffsettings").click(function() {
    var a = document.createElement("div");
	a.id = "Deffsettings";
	a.style.cssText = "background-color:#ecd6ad;border:2px solid #7d510f;z-index:500;top:130px;left:40%;position:absolute;padding-top:7px;padding-left:7px;width:400px;border-radius:7px;box-shadow:0 0 50px 15px #000000;";
	document.body.appendChild(a);
	var menu =  '<h2 style="text-align: center;">settings Deff-Pack</h2><table><tr><td>';
	menu += 'Stack:<select><option name="muur">De muur zal niet zakken, daar dat het begin van het eind is.</option><option name="10procent">Er gaat hooguit 10% per keer dood.</option><option name="percentage">het percentage wat per keer doodgaat is:</option></select></td></tr>';
	menu += "<tr class='CT_StackPercentage' style='display:none'><td>percentage:        <input id='percentagegetal' style='width:25px'></td></tr>";//HOE DIT TE VERANDEREN, wordt namelijk enkel geladen bij het opstarten. :s.
	menu += '<tr><td>Normale Clear:</td></tr><tr><td><table id="Offopp" class="vis"><tr><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_spear.png?48b3b" title="Speervechter" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_sword.png?b389d" title="Zwaardvechter" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_axe.png?51d94" title="Bijlstrijder" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_archer.png?db2c3" title="Boogschutter" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_spy.png?eb866" title="Verkenner" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_light.png?2d86d" title="Lichte cavalerie" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_marcher.png?ad3be" title="Bereden boogschutter" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_heavy.png?a83c9" title="Zware cavalerie" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_ram.png?2003e" title="Ram" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_catapult.png?5659c" title="Katapult" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_snob.png?0019c" title="Edelman" alt="" class="" /></th></tr><tr><td><input style="width:25px"></td><td><input style="width:25px"></td><td><input style="width:25px"></td><td><input style="width:25px"></td><td><input style="width:25px"></td><td><input style="width:25px"></td><td><input style="width:25px"></td><td "><input style="width:25px"></td><td><input style="width:25px"></td><td><input style="width:25px"></td><td><input style="width:25px"></td></tr></td></tr></table></td></tr><tr><td>Mobiel! Def-dorp:</td></tr><tr><td><table id="mobdef" class="vis"><tr><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_spear.png?48b3b" title="Speervechter" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_sword.png?b389d" title="Zwaardvechter" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_axe.png?51d94" title="Bijlstrijder" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_archer.png?db2c3" title="Boogschutter" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_spy.png?eb866" title="Verkenner" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_light.png?2d86d" title="Lichte cavalerie" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_marcher.png?ad3be" title="Bereden boogschutter" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_heavy.png?a83c9" title="Zware cavalerie" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_ram.png?2003e" title="Ram" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_catapult.png?5659c" title="Katapult" alt="" class="" /></th><th width="50"><img src="http://cdn2.tribalwars.net/graphic/unit/unit_snob.png?0019c" title="Edelman" alt="" class="" /></th></tr><tr><td><input style="width:25px"></td><td><input style="width:25px"></td><td><input style="width:25px"></td><td><input style="width:25px"></td><td><input style="width:25px"></td><td><input style="width:25px"></td><td><input style="width:25px"></td><td "><input style="width:25px"></td><td><input style="width:25px"></td><td><input style="width:25px"></td><td><input style="width:25px"></td></tr></td></tr></table>';
	menu += '<tr><td><a id="Deffsluiten" href="javascript:void(0)">sluiten</a></tr></td></table>';
	a.innerHTML = menu;
	if (settings['Stackbeoordeling'] == "percentage") {
		$('.CT_StackPercentage').css({"display":"block"});
	}
	$('#Deffsettings').bind('keypress click',function(){
		if($('select option[name="percentage"]').is(':selected')) {
			$('.CT_StackPercentage').css({"display":"block"});
		} else {
			$('.CT_StackPercentage').css({"display":"none"});
		}
	})
	$('option[name=' + settings['Stackbeoordeling'] + ']').attr('selected', true);
	$('#percentagegetal').val(settings['Percentage']);
	var definput = $('#mobdef input');
	var offinput = $('#Offopp input');
	definput.attr('value', function(arr){ return settings['mobdef'][arr];});
	offinput.attr('value', function(arr){ return settings['Offopp'][arr];});
	$("#Deffsluiten").click(function(){
		
		settings['Stackbeoordeling'] = $("#Deffsettings select:eq(0) option:selected").attr("name");
		settings['Percentage'] = parseInt($('#percentagegetal').val(),10);
		
		//settings['Offopp']= [0,0,7000,0,0,3000,0,0,300,0,0,0];
		settings['Offopp'] = [];
		offinput.each(function(){
			settings['Offopp'].push($(this).val());
		});
		var kritiek = 0;
		var infoff = settings['Offopp'][2] * 40 + settings['Offopp'][9] * 100 + settings['Offopp'][8] * 2; //als hij nog iets anders gebruikt is hij mm, niet zo slim...........
		var cavoff = settings['Offopp'][5] * 130 + settings['Offopp'][7] * 150;
		var boogoff = settings['Offopp'][6] *120;
		var totoff = infoff + cavoff + boogoff; 
		settings['infquota'] = infoff/totoff;
		var cavquota = cavoff/totoff;
		var boogquota = boogoff/totoff;
		var max = settings['Offopp'][8] * 2 / 45;
		var maxratio = 0.5/max;
		var maxratiostuk = maxratio/3;
		// settings['infquota'] * X + cavquota * y + boogquota * Z; 3 Variabelen: Vergelijking is niet op te lossen. Creatief zijn dus.
		// settings['infquota' *X < maxratiostuk
		var x = maxratiostuk/settings['infquota'];
		var y = maxratiostuk/cavquota;
		var z = maxratiostuk/boogquota;
		// X = (att/def) ^1.5 X^(2/3) = (totoff/def(inf))
		settings['definf'] = totoff/Math.pow(x,(2/3));
		settings['cavinf'] = totoff/Math.pow(y,(2/3));
		settings['booginf']= totoff/Math.pow(z,(2/3));
		settings['mobdef']= [];
		definput.each(function(){
			settings['mobdef'].push($(this).val());
		});
		localStorage['CTPack-Settings'] = JSON.stringify(settings);
		$("#Deffsettings").remove();
	}); 
});
var debugStatus = false;
	
//all Functions.
function debug(message){
	if(debugStatus) {
	    alert(message);
	}
    }
function getTimeFromTW(str) {
		// NOTE: huh this actually returns the current date
		// with some new properties with the "str" time
		//17:51:31
		var timeParts = str.split(":");
		var seconds = timeParts[2];
		var val = {};
		val.hours = parseInt(timeParts[0], 10);
		val.minutes = parseInt(timeParts[1], 10);
		if (seconds.length > 2) {
			var temp = seconds.split(".");
			val.seconds = parseInt(temp[0], 10);
			val.milliseconds = parseInt(temp[1], 10);
		} 
		else {
			val.seconds = parseInt(seconds, 10);
		}
		val.totalSecs = val.seconds + val.minutes * 60 + val.hours * 3600;
		return val;
	}
function getDateFromTW(str, isTimeOnly) {
		//13.02.11 17:51:31
		var timeParts, seconds;
		if (isTimeOnly) {
			timeParts = str.split(":");
			seconds = timeParts[2];
			var val = new Date();
			val.setHours(timeParts[0]);
			val.setMinutes(timeParts[1]);
			if (seconds.length > 2) {
				var temp = seconds.split(".");
				val.setSeconds(temp[0]);
				val.setMilliseconds(temp[1]);
			} else {
				val.setSeconds(seconds);
			}
			return val;
		} 
		else {
			var parts = str.split(" ");
			var dateParts = parts[0].split(".");
			timeParts = parts[1].split(":");
			seconds = timeParts[2];
			var millis = 0;
			if (seconds.length > 2) {
				var temp = seconds.split(".");
				seconds = temp[0];
				millis = temp[1];
			} if (dateParts[2].length === 2) {
				dateParts[2] = (new Date().getFullYear() + '').substr(0, 2) + dateParts[2];
			}

			return new Date(dateParts[2], (dateParts[1] - 1), dateParts[0], timeParts[0], timeParts[1], seconds, millis);
		}
	}
function getlooptijd(x1,y1, x2, y2, unit, aankomsttijd) {
		var dist = {};
		//debug(x1 + "\n" + x2 + "\n" + y1 + "\n" + y2 + "\n" + unit + "\n" + aankomsttijd)
		dist.fields = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
		//Math.sqrt(Math.pow(parseInt(f[0])-parseInt(t[0]),2)+Math.pow(parseInt(f[1])-parseInt(t[1]),2))
		
		var speed = unit;
		dist.tijdsduur = speed* dist.fields;
		dist.minuuttijdsduur = Math.floor(dist.tijdsduur % 60);
		dist.uurtijdsduur = Math.floor(dist.tijdsduur/ 60);
		var minuten = Math.floor(dist.tijdsduur);
		var seconden = (dist.tijdsduur -minuten) * 60;
		dist.secondentijdsduur = Math.round(seconden);
		dist.aankomsttijd = getDateFromTW(aankomsttijd, false);
		// VERZENDTIJD:
		var remainder = 0;
		if ((dist.aankomsttijd.getSeconds()-dist.secondentijdsduur -remainder) >= 0) 
		{
		//bugdebug(dist.aankomsttijd.getHours());
		dist.verzendseconde = dist.aankomsttijd.getSeconds()-dist.secondentijdsduur;
		//bugdebug(dist.verzenduur);
		}
		else {
		remainder = 1;
		dist.verzendseconde = dist.aankomsttijd.getSeconds()-dist.secondentijdsduur + 60;
		}
		if ((dist.aankomsttijd.getMinutes()-dist.minuuttijdsduur -remainder) >= 0) 
		{
		//bugdebug(dist.aankomsttijd.getHours());
		dist.verzendminuut = dist.aankomsttijd.getMinutes()-dist.minuuttijdsduur;
		}
		else {
		remainder = 1;
		dist.verzendminuut = dist.aankomsttijd.getMinutes()-dist.minuuttijdsduur + 60;
		}
		
		if ((dist.aankomsttijd.getHours()-dist.uurtijdsduur -remainder) >= 0) 
		{
		//bugdebug(dist.aankomsttijd.getHours());
		dist.verzenduur = dist.aankomsttijd.getHours()-dist.uurtijdsduur;
		//bugdebug(dist.verzenduur);
		}
		else {
		remainder = 1;
		dist.verzenduur = dist.aankomsttijd.getHours()-dist.uurtijdsduur + 24;
		}
		//bugdebug(dist.verzenduur + ":" +dist.verzendminuut+ ":"+ dist.verzendseconde); 
		return dist;
	}
function stackincboog (inc, stack, moraal, muur) { 
	var stacktel = [];//TODO: Variabelen naar voren halen. 
	var infoff = settings['Offopp'][2] * 40 + settings['Offopp'][9] * 100 + settings['Offopp'][8] * 2; //als hij nog iets anders gebruikt is hij mm, niet zo slim...........
		var cavoff = settings['Offopp'][5] * 130 + settings['Offopp'][7] * 150;
		var boogoff = settings['Offopp'][6] *120;
		var totoff = infoff + cavoff + boogoff;
		//debug(totoff);
		var max = settings['Offopp'][8] * 2 / 45;		
		var total = [0,0];
		var wall = [muur,0.5*muur,0.5*muur];
		var Ratio = [0,0,0,0];
		var n = 0;
		var i =0;
		var j=0;
		//debug("!");
	for (i=0;i<3;i++) {
		stacktel[i] = 0;
		//debug("snap er weer eens niks van!");
		for (j=0;j<11;j++)
		{
			var x = i + 1;
			stacktel[i] = stacktel[i] + stack[j] * unitStat[j][x];
		}
	}
	debug("tjaaa1111111");
	switch (settings['Stackbeoordeling']) {
	case "muur":
		for (i =0;i<inc;i++) {
			n++;
			debug("dit is de " + n + "de aanval"); 
			wall[2] = 20 + 50* wall[1];
			var multD = Math.pow(1.037, wall[1]);
			var stackmuurtel = [0,0,0];
			debug("de verdediging heeft een muurbonus van: " + multD);
			for (j = 0; j< 3; j++) {
				stackmuurtel[j] = stacktel[j] * multD;
				//debug("klaar voor de aanval?");
				//debug(totoff + "--" + stacktel[j]);
				if (totoff > stackmuurtel[j]) {
				//debug("aanvaller wint?"); 
				Ratio[j] = 1; 
				}
				else if (totoff == stackmuurtel[j]) { 
					debug("dit is theoretisch zeer onwaarschijnlijk. "); // Zie hier hetzelfde als hierboven. 
				}
				else if (totoff < stackmuurtel[j]) {
				//debug("verdediging wint"); 
					Ratio[j] = Math.pow(totoff/stacktel[j], 1.5);
				}
			}
			if(totoff ==0) {totoff=1;}
			Ratio[3] = (infoff * Ratio[0] + cavoff * Ratio[1] + boogoff * Ratio[2])/totoff;// Zoveel gaat er van ieder dood. van elke soort troep gaat hetzelfde percentage dood.
			//debug(Ratio[3]);
			
			if (n ==1) { var Rationis = Ratio[3] * stacktel[0];}
			var overleving = 1 - Ratio[3];
			//debug(overleving);
			stacktel[0] = stacktel[0] * overleving;
			stacktel[1] = stacktel[1] * overleving;
			stacktel[2] = stacktel[2] * overleving;// Dit zou korter moeten kunnen. 
			var muurzakt = Ratio[3] * max;
			//debug(muurzakt);
			if (muurzakt >= 0.5) { // de muur zakt minstens 1 level. 
			//debug("muurtje gaat down, muurtje gaat down");
				if (n==1) {// ja, ik weet dat (n) ook werkt. 
					
					return inc * Ratio[3] + 7-(stacktel[0] + stacktel[1] + stacktel[2])/1720000;
//Het grote vraagteken :s  
			
				}
				else {
					return (inc-i + 1)* Ratio[3];//DIT KLOPT NIET. DIT MOET EMPIRISCH HERSTELD/Uitgebreid worden. maar dat heb ik nog niet verzonnen. :( Het is echter wel een goede vuistregel. WORDEN. 
				}
			}
		}
		return 0;
		break;
	case "10procent":
		for (i =0;i<inc;i++) {
			n++;
			//debug("dit is de " + n + "de aanval"); 
			wall[2] = 20 + 50* wall[1];
			var multD = Math.pow(1.037, wall[1]);
			var stackmuurtel = [0,0,0]
			//debug("de verdediging heeft een muurbonus van: " + multD);
			for (j = 0; j< 3; j++) {
				stackmuurtel[j] = stacktel[j] * multD;
				//debug("klaar voor de aanval?");
				//debug(totoff + "--" + stacktel[j]);
				if (totoff > stackmuurtel[j]) {
				//debug("aanvaller wint?"); 
				Ratio[j] = 1; 
				}
				else if (totoff == stackmuurtel[j]) { 
					debug("dit is theoretisch zeer onwaarschijnlijk. "); // Zie hier hetzelfde als hierboven. 
				}
				else if (totoff < stackmuurtel[j]) {
				//debug("verdediging wint"); 
					Ratio[j] = Math.pow(totoff/stacktel[j], 1.5);
				}
			}
			if(totoff ==0) {totoff=1;}
			Ratio[3] = (infoff * Ratio[0] + cavoff * Ratio[1] + boogoff * Ratio[2])/totoff;// Zoveel gaat er van ieder dood. van elke soort troep gaat hetzelfde percentage dood.
			//debug(Ratio[3]);
			
			if (n ==1) { var Rationis = Ratio[3] * stacktel[0];}
			var overleving = 1 - Ratio[3];
			//debug(overleving);
			stacktel[0] = stacktel[0] * overleving;
			stacktel[1] = stacktel[1] * overleving;
			stacktel[2] = stacktel[2] * overleving;// Dit zou korter moeten kunnen. 

			if (Ratio >= 0.1) { // de muur zakt minstens 1 level. 
			//debug("muurtje gaat down, muurtje gaat down");
				if (n==1) {// ja, ik weet dat (n) ook werkt. 
					
					return inc * Ratio[3] + 7-(stacktel[0] + stacktel[1] + stacktel[2])/1720000;
//Het grote vraagteken :s  
			
				}
				else {
					return (inc-i + 1)* Ratio[3];//DIT KLOPT NIET. DIT MOET EMPIRISCH HERSTELD/Uitgebreid worden. maar dat heb ik nog niet verzonnen. :( Het is echter wel een goede vuistregel. WORDEN. 
				}
			}
		}
		return 0;
		break;
	case "percentage":
		//debug(inc);
		for (i=0;i<inc;i++) {
			debug("Tja");
			n++;
			
			debug("dit is de " + n + "de aanval"); 
			wall[2] = 20 + 50* wall[1];
			var multD = Math.pow(1.037, wall[1]);
			var stackmuurtel = [0,0,0];
			debug("de verdediging heeft een muurbonus van: " + multD);
			for (j = 0; j< 3; j++) {
				stackmuurtel[j] = stacktel[j] * multD;
				//debug("klaar voor de aanval?");
				//debug(totoff + "--" + stacktel[j]);
				if (totoff > stackmuurtel[j]) {
				//debug("aanvaller wint?"); 
				Ratio[j] = 1; 
				}
				else if (totoff == stackmuurtel[j]) { 
					debug("dit is theoretisch zeer onwaarschijnlijk. "); // Zie hier hetzelfde als hierboven. 
				}
				else if (totoff < stackmuurtel[j]) {
				//debug("verdediging wint"); 
					Ratio[j] = Math.pow(totoff/stacktel[j], 1.5);
				}
			}
			if(totoff ==0) {totoff=1;}
			
			Ratio[3] = (infoff * Ratio[0] + cavoff * Ratio[1] + boogoff * Ratio[2])/totoff;// Zoveel gaat er van ieder dood. van elke soort troep gaat hetzelfde percentage dood.
			debug(Ratio[3]);
			
			if (n ==1) { var Rationis = Ratio[3] * stacktel[0];}
			var overleving = 1 - Ratio[3];
			debug(overleving);
			stacktel[0] = stacktel[0] * overleving;
			stacktel[1] = stacktel[1] * overleving;
			stacktel[2] = stacktel[2] * overleving;// Dit zou korter moeten kunnen. 

			if (Ratio[3] >= (settings['Percentage']/100)) { // de muur zakt minstens 1 level. 
			debug("muurtje gaat down, muurtje gaat down");
			
				if (n==1) {// ja, ik weet dat (n) ook werkt. 
					
					return  inc * Ratio[3] + 7-(stacktel[0] + stacktel[1] + stacktel[2])/1720000;//* 10/(settings['Percentage']/100);
//Het grote vraagteken :s  
			
				}
				else {
					return (inc-i + 1)* Ratio[3];//DIT KLOPT NIET. DIT MOET EMPIRISCH HERSTELD/Uitgebreid worden. maar dat heb ik nog niet verzonnen. :( Het is echter wel een goede vuistregel. WORDEN. 
				}
			}
		}
			return 0;
			break;
		}
}
function stackincnone (inc, stack, moraal, muur)	{
		var stacktel = [];
		//debug(typeof stack);
		//debug("zonder boog");
		stack.splice(4, 0, '0');
		stack.splice(7, 0, '0');
		
		for (var i=0;i<2;i++) {
			stacktel[i] = 0;
			for (var j=0;j<11;j++)
			{
				var x = i + 1;
				stacktel[i] = (stacktel[i] + stack[j] * unitStat[j][x]) * 1;
			}
		}
		
		switch (settings['Stackbeoordeling']) {
			case "muur":
				var infoff = settings['Offopp'][2] * 40 + settings['Offopp'][9] * 100 + settings['Offopp'][8] * 2; //als hij nog iets anders gebruikt is hij mm, niet zo slim...........
				var cavoff = settings['Offopp'][5] * 130 + settings['Offopp'][7] * 150;
				var totoff = infoff + cavoff;
				var max = settings['Offopp'][8] * 2 / 45;
				var total = [0,0];
				var wall = [muur,0.5*muur,0.5*muur];
				var ratio = [0,0,0,0];
				var n = 0;
				for (var i =0;i<inc;i++) {
					n++;
					//debug("dit is de " + n + "de aanval!");
					wall[2] = 20 + 50* wall[1];
					var multD = Math.pow(1.037, wall[1]);
					var stackmuurtel = [0,0,0]
					stackmuurtel[0] = stacktel[0] * multD * infoff/totoff;
					stackmuurtel[1] = stacktel[1] * multD * cavoff/totoff;
					stackmuurtel[2] = stackmuurtel[0] + stackmuurtel[1];
					stacktel[2] = stacktel[0] + stacktel[1];
					//debug(stackmuurtel[2]);
					if (totoff > stackmuurtel[2]) {
						// aanvaller wint. je bent de sjaak. 
						ratio[0] =1;
					} 
					else if (totoff < stackmuurtel[2]) {
						ratio[0] = Math.pow((totoff/stackmuurtel[2]),1.5);
					}
					var overleving = 1 - ratio[0];
					//debug(ratio[0]);
					for (j= 0; j<2;j++) {
					stacktel[j] *= overleving;
					}
					if (ratio[0] == 1){ 
					return (inc-i)/5 * Math.round(ratio[0] * max);//7; // zelfde als hierboven, moet daar niet wat op verzonnen worden?
					
					}
					var muurzakt = ratio[0] * max;
					//debug(muurzakt);
					if (muurzakt >= 0.5) {
					//debug("muurtje gaat down, muurtje gaat down");
					//debug((inc-i)/5 * Math.round(ratio[0] * max));
					//debug(ratio[0] * max);
					//debug(inc-i);
						if (n==1) {// ja, ik weet dat (n) ook werkt. 
						//debug("hier zit het grote probleem");
							return inc * ratio[0] + 7-(stacktel[2]/1320000);
//Het grote vraagteken :s  
			
						}
						else {
							return (inc-i + 1)* ratio[0];//DIT KLOPT NIET. DIT MOET EMPIRISCH HERSTELD/Uitgebreid worden. maar dat heb ik nog niet verzonnen. :( Het is echter wel een goede vuistregel. WORDEN. 
						}
					
					}
				}
			return 0;
			break;
			case "10procent":
				var infoff = settings['Offopp'][2] * 40 + settings['Offopp'][9] * 100 + settings['Offopp'][8] * 2; //als hij nog iets anders gebruikt is hij mm, niet zo slim...........
				var cavoff = settings['Offopp'][5] * 130 + settings['Offopp'][7] * 150;
				var totoff = infoff + cavoff;
				var max = settings['Offopp'][8] * 2 / 45;
				var total = [0,0];
				var wall = [muur,0.5*muur,0.5*muur];
				var ratio = [0,0,0,0];
				var n = 0;
				for (var i =0;i<inc;i++) {
					n++;
					wall[2] = 20 + 50* wall[1];
					var multD = Math.pow(1.037, wall[1]);
					var stackmuurtel = [0,0,0]
					stackmuurtel[0] = stacktel[0] * multD * infoff/totoff;
					stackmuurtel[1] = stacktel[1] * multD * cavoff/totoff;
					stackmuurtel[2] = stackmuurtel[0] + stackmuurtel[1];
					if (totoff > stackmuurtel[2]) {
						// aanvaller wint. je bent de sjaak. 
						ratio[0] =1;
					} 
					else if (totoff < stackmuurtel[2]) {
						ratio[0] = Math.pow((totoff/stacktel[2]),1.5);
					}
					var overleving = 1 - ratio[0];
					for (j= 0; j<2;j++) {
					stacktel[j] *= overleving;
					}
					if (ratio[0] == 1){ 
					return (inc-i)/5 * Math.round(ratio[0] * max);//7; // zelfde als hierboven, moet daar niet wat op verzonnen worden?
					
					}
					
					if (ratio[0] >= 0.1) {
					//debug("muurtje gaat down, muurtje gaat down");
					//debug((inc-i)/5 * Math.round(ratio[0] * max));
					//debug(ratio[0] * max);
					//debug(inc-i);
						if (n==1) {// ja, ik weet dat (n) ook werkt. 
							return inc * ratio[0] + 7-stacktel[2]/1320000;
//Het grote vraagteken :s  
			
						}
						else {
							return (inc-i + 1)* ratio[0];//DIT KLOPT NIET. DIT MOET EMPIRISCH HERSTELD/Uitgebreid worden. maar dat heb ik nog niet verzonnen. :( Het is echter wel een goede vuistregel. WORDEN. 
						}
					
					}
				}
			return 0;
			break;
			case "percentage":
				var infoff = settings['Offopp'][2] * 40 + settings['Offopp'][9] * 100 + settings['Offopp'][8] * 2; //als hij nog iets anders gebruikt is hij mm, niet zo slim...........
				var cavoff = settings['Offopp'][5] * 130 + settings['Offopp'][7] * 150;
				var totoff = infoff + cavoff;
				var max = settings['Offopp'][8] * 2 / 45;
				var total = [0,0];
				var wall = [muur,0.5*muur,0.5*muur];
				var ratio = [0,0,0,0];
				var n = 0;
				for (var i =0;i<inc;i++) {
					n++;
					wall[2] = 20 + 50* wall[1];
					var multD = Math.pow(1.037, wall[1]);
					var stackmuurtel = [0,0,0]
					stackmuurtel[0] = stacktel[0] * multD * infoff/totoff;
					stackmuurtel[1] = stacktel[1] * multD * cavoff/totoff;
					stackmuurtel[2] = stackmuurtel[0] + stackmuurtel[1];
					if (totoff > stackmuurtel[2]) {
						// aanvaller wint. je bent de sjaak. 
						ratio[0] =1;
					} 
					else if (totoff < stackmuurtel[2]) {
						ratio[0] = Math.pow((totoff/stacktel[2]),1.5);
					}
					var overleving = 1 - ratio[0];
					for (j= 0; j<2;j++) {
					stacktel[j] *= overleving;
					}
					if (ratio[0] == 1){ 
					return (inc-i)/5 * Math.round(ratio[0] * max);//7; // zelfde als hierboven, moet daar niet wat op verzonnen worden?
					
					}
					
					if (ratio[0] >= (settings['Percentage'])/100) {
					//debug("muurtje gaat down, muurtje gaat down");
					//debug((inc-i)/5 * Math.round(ratio[0] * max));
					//debug(ratio[0] * max);
					//debug(inc-i);
						if (n==1) {// ja, ik weet dat (n) ook werkt. 
							return inc * ratio[0] + 7-stacktel[2]/1320000;
//Het grote vraagteken :s  
			
						}
						else {
							return (inc-i + 1)* ratio[0];//DIT KLOPT NIET. DIT MOET EMPIRISCH HERSTELD/Uitgebreid worden. maar dat heb ik nog niet verzonnen. :( Het is echter wel een goede vuistregel. WORDEN. 
						}
					
					}
				}
			return 0;
			break;
		}
	
	
	}
function ShowAttackID() {
    if($("#incomings_table:has(th:contains('IDs'))").length == 0) {
	$("#incomings_table th:contains('Bevel')").before('<th width="120">IDs&nbsp<a href="#" class="IDsort" id="IDasc">(&and;)</a>&nbsp<a href="#" class="IDsort" id="IDdesc">(&or;)</a></th>'); 
	//hieronder IDs voor de rijen zetten:
	$("tr[class*=\"row_\"]").each(function(i){
	    $(this).children(":first").before("<td>" + $(this).find("input:first").attr("name").match(/\d+/) + "</td>");
	})
	// Hieronder aanval-IDs sorteren. zowel ascending als descending
	$("#IDasc").click(function(){SortIDs('asc')});
	$("#IDdesc").click(function(){SortIDs('desc')});
    } else {
	$("#incomings_table tr").each(function(){
	    $(this).children(":first").remove();
	})
    }  
}
function SortIDs(sortDir) {
                function j(a) {
                        var c = a.cells[0].textContent;
                        //debug(c);
                        var u = 0;
                        u += parseInt(c) || 0;
                        return u
                    }
                    void(function () {
                        s = $("tr[class*=\"row_\"]").sort(function (a, b) {
                            if(sortDir=='asc') {
                                return j(a) - j(b)
                            } else {
                                return j(b) - j(a)
                            }
                        });
                        for (i = 0; i < $("tr[class*=\"row_\"]").length; i++) {
                                $('#incomings_table tr:last').before(s[i])
                        }
                    })();
}
function ArrivalSort(sortDir) {
                function j(a) {
                        var c = $(a).find(".timer").text().match(/(\d+):(\d+):(\d+)/);
						var u = 0;
                        u += parseInt(c[0])*60*60 + parseInt(c[1])*60 + parseInt(c[2]) || 0;
                        return u;
                    }
                    void(function () {
					//debug("ik wil aandacht!");
                        s = $("tr[class*=\"row_\"]").sort(function (a, b) {
                            if(sortDir=='asc') {
								return j(a) - j(b);
                            } else {
                                return j(b) - j(a);
                            }
                        });
                        for (i = 0; i < $("tr[class*=\"row_\"]").length; i++) {
                                $('#incomings_table tr:last').before(s[i]);
                        }
						$("tr[class*=\"optel\"]").each(function() {
						$(this).remove();
						});
                    })();   
}
function mark_last() {
    ArrivalSort('asc');
    var temp = [];
	$(".nowrap:has(input[id*='editInput'])").each(function(){
		var AttackedVillage = $.trim($(this).find("a[href*='screen=overview']").html());
		if($.type(AttackedVillage) === "string") {
		if($.inArray(AttackedVillage, temp) == -1) {
			temp.push(AttackedVillage);
		}
		}
	});
		$(".nowrap").find("a[href*='screen=overview']").closest("tr").find("input[id*='editInput']").each(function(){
		if ($(this).val().match(" LAATSTE") === null) {
			var nieuwestring = $(this).val().slice(0,$(this).length - 8);
		}
		$(this).val(nieuwestring).next("input").click();
	});
	$.each(temp, function(k,v){
		var tempVal = $(".nowrap").find("a[href*='screen=overview']:contains('"+v+"')").last().closest("tr").find("input[id*='editInput']").val();
		if(tempVal.match(" LAATSTE") === null) {
		$(".nowrap").find("a[href*='screen=overview']:contains('"+v+"')").last().closest("tr").find("input[id*='editInput']").val(tempVal + " LAATSTE").next("input").click();
		}
	});
}
function xsort(sortDir){
				function j(a) {
                        var link = $(a).find("a[href$='overview']");
						var temp = link.text().match(/(\d{3})\|(\d{3})/);
						if (temp !== null) {
							var tempx = temp[1];
							var tempy = temp[2];
							var c = tempx + "" + tempy;
							//debug(c);
							var u = 0;
							u += parseInt(c) || 0;
						}
						else {
							debug("Hoppa Fa2 stijl!");
							var u = 0;
						}
                        return u;
                    }
                    void(function () {
                        s = $("tr[class*=\"nowrap\"]").sort(function (a, b) {
                            //var diff = j(a) - j(b);
							if(sortDir=='xasc') {
								var diff = j(a) - j(b);
								//debug(diff);
                                return diff;
                            } else {
								//debug(j(b) - j(a));
                                return j(b) - j(a);
                            }
                        });
                        
						for (i = 0; i < $("tr[class*=\"nowrap\"]").length; i++) {

								$('#incomings_table tr:last').before(s[i]);
                        }
                    })();
					
					var amountOfVillages = 0;
					var current = "";
					var targets = [];
					var amount = 1;
					$("tr[class*=\"optel\"]").each(function() {
					$(this).remove();
					});
					$("tr[class*=\"row_\"]").each(function (index, value) {
						var coordsnext = "";
						if  (index !== ($("tr[class*=\"row_\"]").length -1)) {
							var next = $(this).next();
							coordsnext= j($(next));
						}
						var coords = "";
						coords = j($(this));
						if (coords == coordsnext) {
							amount++;
						}
						//debug(coords);
						//debug(coordsnext);
						if (coords != coordsnext|| index == $("tr[class*=\"row_\"]").length -1 ) {
							if (coordsnext != "" || index == $("tr[class*=\"row_\"]").length -1 ) {
								$(this).after("<tr class='optel'><td align=right colspan=6>" + amount + "&nbsp;</td></tr>");
								amount = 1;
							}
						}
					});
}
function createEmptyRow(cells) {
	var row = $("<tr class='CT_EmptyRow'><td colspan='"+cells+"'></td></tr>").css({'background-color':'inherit', 'height': 20});
	return row[0];
}
function GroupAttacks() {
	if($('.InsertInOSList').size() == 0) {
		var last = $("#incomings_table tr").last(),
		incomings = {},
		CT_stack = JSON.parse(localStorage["CTstack"]),
		CT_Buildings = JSON.parse(localStorage["CT_Buildings"]);
		if(CT_stack == undefined && CT_stack == undefined) {
			alert("Je moet eerst de stacks en gebouwlvls opslaan om deze functie te kunnen gebruiken");
		} else if(CT_stack == undefined) {
			alert("Je moet eerst de stacks opslaan om deze functie te kunnen gebruiken");
		} else if(CT_Buildings == undefined) {
			alert("Je moet eerst de gebouwlvls opslaan om deze functie te kunnen gebruiken");
		}
		
		$('#incomings_table .nowrap').each(function(){
			var coords = /(\d{1,3}\|\d{1,3})/.exec($(this).text());
			if(!incomings[coords[1]]) {
				incomings[coords[1]] = [];
			}
			incomings[coords[1]].push($(this))
		});
		for(data in incomings) {
			var targets = incomings[data]
			$.each(targets, function(i){
				$(this).remove();
				$('#incomings_table tr:last').before($(this));
				$(this).attr("class", "nowrap row_"+(i % 2 ? 'b' : 'a'))
				$(this).attr("data-coords", data)
			})
			// hier eerst nog stack omzetten naar plaatjes en getallen ;) /W26 werkt het goed, nu nog voor lengtes van 12(boog,ridder),11(boog) en 9 <- done
			if(CT_stack[data].length == 12) {
				/* onderstaande maakt het makkelijker in boerderij werelden ;) */
				var populationDeff = parseInt(CT_stack[data][0]) + parseInt(CT_stack[data][1]) + parseInt(CT_stack[data][3]) + (parseInt(CT_stack[data][4]) * population["spy"]) + (parseInt(CT_stack[data][7]) * population["heavy"]) + (parseInt(CT_stack[data][9]) * population["catapult"]) + (parseInt(CT_stack[data][10]) * population["knight"]);
				var populationOff =  (parseInt(CT_stack[data][2]) * population["axe"]) + (parseInt(CT_stack[data][5]) * population["light"]) + (parseInt(CT_stack[data][6]) * population["marcher"]) + (parseInt(CT_stack[data][8]) * population["ram"]) + (parseInt(CT_stack[data][11]) * population["snob"]);
				/* als er substantieel offence aanwezig is dan de troepen in het rood weergeven */
				var color = populationOff > 15000 ? "red" : "#000";
				dorpstack = ['<img src="http://cdn2.tribalwars.net/graphic/unit/unit_spear.png" title="Speervechter" alt=""/>'+parseInt(CT_stack[data][0]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_sword.png" title="Zwaardvechter" alt=""/>'+parseInt(CT_stack[data][1]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_archer.png" title="Boogschutter" alt=""/>'+parseInt(CT_stack[data][3]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_spy.png" title="Verkenner" alt=""/>'+parseInt(CT_stack[data][4]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_heavy.png" title="Zware calaverie" alt=""/>'+parseInt(CT_stack[data][7]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_catapult.png" title="Katapult" alt=""/>'+parseInt(CT_stack[data][9]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_knight.png" title="Ridder" alt=""/>'+parseInt(CT_stack[data][10]),'<br/>Offence:<span style="color:'+color+';">','<img src="http://cdn2.tribalwars.net/graphic/unit/unit_axe.png" title="Bijlstrijder" alt=""/>'+parseInt(CT_stack[data][2]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_light.png" title="Lichte calaverie" alt=""/>'+parseInt(CT_stack[data][5]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_marcher.png" title="Bereden boogschutter" alt=""/>'+parseInt(CT_stack[data][6]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_ram.png" title="Ram" alt=""/>'+parseInt(CT_stack[data][8]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_snob.png" title="Edelman" alt=""/>'+parseInt(CT_stack[data][11]) + "</span>"]
			} else if(CT_stack[data].length == 11) {
				/* onderstaande maakt het makkelijker in boerderij werelden ;) */
				var populationDeff = parseInt(CT_stack[data][0]) + parseInt(CT_stack[data][1]) + parseInt(CT_stack[data][3]) + (parseInt(CT_stack[data][4]) * population["spy"]) + (parseInt(CT_stack[data][7]) * population["heavy"]) + (parseInt(CT_stack[data][9]) * population["catapult"]);
				var populationOff =  (parseInt(CT_stack[data][2]) * population["axe"]) + (parseInt(CT_stack[data][5]) * population["light"]) + (parseInt(CT_stack[data][6]) * population["marcher"]) + (parseInt(CT_stack[data][8]) * population["ram"]) + (parseInt(CT_stack[data][10]) * population["snob"]);
				/* als er substantieel offence aanwezig is dan de troepen in het rood weergeven */
				var color = populationOff > 15000 ? "red" : "#000";
				dorpstack = ['<img src="http://cdn2.tribalwars.net/graphic/unit/unit_spear.png" title="Speervechter" alt=""/>'+parseInt(CT_stack[data][0]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_sword.png" title="Zwaardvechter" alt=""/>'+parseInt(CT_stack[data][1]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_archer.png" title="Boogschutter" alt=""/>'+parseInt(CT_stack[data][3]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_spy.png" title="Verkenner" alt=""/>'+parseInt(CT_stack[data][4]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_marcher.png" title="Bereden boogschutter" alt=""/>'+parseInt(CT_stack[data][6]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_heavy.png" title="Zware calaverie" alt=""/>'+parseInt(CT_stack[data][7]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_catapult.png" title="Katapult" alt=""/>'+parseInt(CT_stack[data][9]),'<br/>Offence:<span style="color:'+color+';">','<img src="http://cdn2.tribalwars.net/graphic/unit/unit_axe.png" title="Bijlstrijder" alt=""/>'+parseInt(CT_stack[data][2]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_light.png" title="Lichte calaverie" alt=""/>'+parseInt(CT_stack[data][5]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_ram.png" title="Ram" alt=""/>'+parseInt(CT_stack[data][8]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_snob.png" title="Edelman" alt=""/>'+parseInt(CT_stack[data][10]) + "</span>"]
			} else if(CT_stack[data].length == 10) {
				/* onderstaande maakt het makkelijker in boerderij werelden ;) */
				var populationDeff = parseInt(CT_stack[data][0]) + parseInt(CT_stack[data][1]) + (parseInt(CT_stack[data][3]) * population["spy"]) + (parseInt(CT_stack[data][5]) * population["heavy"]) + (parseInt(CT_stack[data][7]) * population["catapult"]) + (parseInt(CT_stack[data][8]) * population["knight"]);
				var populationOff =  (parseInt(CT_stack[data][2]) * population["axe"]) + (parseInt(CT_stack[data][4]) * population["light"]) + (parseInt(CT_stack[data][6]) * population["ram"]) + (parseInt(CT_stack[data][9]) * population["snob"]);
				/* als er substantieel offence aanwezig is dan de troepen in het rood weergeven */
				var color = populationOff > 15000 ? "red" : "#000";
				dorpstack = ['<img src="http://cdn2.tribalwars.net/graphic/unit/unit_spear.png" title="Speervechter" alt=""/>'+parseInt(CT_stack[data][0]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_sword.png" title="Zwaardvechter" alt=""/>'+parseInt(CT_stack[data][1]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_spy.png" title="Verkenner" alt=""/>'+parseInt(CT_stack[data][3]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_heavy.png" title="Zware calaverie" alt=""/>'+parseInt(CT_stack[data][5]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_catapult.png" title="Katapult" alt=""/>'+parseInt(CT_stack[data][7]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_knight.png" title="Ridder" alt=""/>'+parseInt(CT_stack[data][8]),'<br/>Offence:<span style="color:'+color+';">','<img src="http://cdn2.tribalwars.net/graphic/unit/unit_axe.png" title="Bijlstrijder" alt=""/>'+parseInt(CT_stack[data][2]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_light.png" title="Lichte calaverie" alt=""/>'+parseInt(CT_stack[data][4]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_ram.png" title="Ram" alt=""/>'+parseInt(CT_stack[data][6]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_snob.png" title="Edelman" alt=""/>'+parseInt(CT_stack[data][9]) + "</span>"]
			} else if(CT_stack[data].length == 9) {
				/* onderstaande maakt het makkelijker in boerderij werelden ;) */
				var populationDeff = parseInt(CT_stack[data][0]) + parseInt(CT_stack[data][1]) + (parseInt(CT_stack[data][3]) * population["spy"]) + (parseInt(CT_stack[data][5]) * population["heavy"]) + (parseInt(CT_stack[data][7]) * population["catapult"]);
				var populationOff =  (parseInt(CT_stack[data][2]) * population["axe"]) + (parseInt(CT_stack[data][4]) * population["light"]) + (parseInt(CT_stack[data][6]) * population["ram"]) + (parseInt(CT_stack[data][8]) * population["snob"]);
				/* als er substantieel offence aanwezig is dan de troepen in het rood weergeven */
				var color = populationOff > 15000 ? "red" : "#000";
				dorpstack = ['<img src="http://cdn2.tribalwars.net/graphic/unit/unit_spear.png" title="Speervechter" alt=""/>'+parseInt(CT_stack[data][0]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_sword.png" title="Zwaardvechter" alt=""/>'+parseInt(CT_stack[data][1]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_spy.png" title="Verkenner" alt=""/>'+parseInt(CT_stack[data][3]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_heavy.png" title="Zware calaverie" alt=""/>'+parseInt(CT_stack[data][5]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_catapult.png" title="Katapult" alt=""/>'+parseInt(CT_stack[data][7]),'<br/>Offence:<span style="color:'+color+';">','<img src="http://cdn2.tribalwars.net/graphic/unit/unit_axe.png" title="Bijlstrijder" alt=""/>'+parseInt(CT_stack[data][2]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_light.png" title="Lichte calaverie" alt=""/>'+parseInt(CT_stack[data][4]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_ram.png" title="Ram" alt=""/>'+parseInt(CT_stack[data][6]),'<img src="http://cdn2.tribalwars.net/graphic/unit/unit_snob.png" title="Edelman" alt=""/>'+parseInt(CT_stack[data][8]) + "</span>"]
			}
			//alert(JSON.stringify(CTPack_Units));
			/*var OSNeeded = $("<div class=\"SupportNeeded\" title=\"Klik om dit doelwit toe te voegen of te verwijderen van de export lijst.\" data-coord='"+data+"'>&nbsp;</div>").css({"width":"18px","height":"18px","border":"1px solid #603000"});*/
			var styleWall = CT_Buildings[data]["wall"] < 20 ? "style=\"color:red\"" : "";
			$('#incomings_table tr:last').before($("<tr class=\"InsertInOSList\" style='height:auto;font-weight:bold;'><th colspan=\"2\"><div style=\"height:100%;float:left;\"><div class=\"SupportNeeded\" title=\"Klik om dit doelwit toe te voegen of te verwijderen van de export lijst.\" style=\"width:18px;height:18px;border:1px solid #804000;background-color:#FFF;\" data-coord='"+data+"' data-count=\""+targets.length+"\">&nbsp;</div></div><span style='margin-right:10px;' data-count='"+targets.length+"'>#"+targets.length+"</span><select id='CT_Tags'><option>OK</option><option>DODGE</option><option>ONTWIJK</option><option>BIJSTACKEN</option><option>GEVRAAGT</option><option>__dubbel</option><option>__fake</option></select><input type='button' class='CT_Mark_Attacks' value='Markeren' data-coords='"+data+"'></th><th colspan='"+($("#incomings_table tr:first-child th").length-2)+"'>Stack: "+dorpstack.join(" ")+"<br/>Gebouwlvls: 1e<img src='http://cdn2.tribalwars.net/graphic/buildings/church.png'/>"+CT_Buildings[data]["firstChurch"]+" <img src='http://cdn2.tribalwars.net/graphic/buildings/church.png'/>"+CT_Buildings[data]["church"]+" <img src=\"http://cdn2.tribalwars.net/graphic/buildings/farm.png\"/>"+CT_Buildings[data]["farm"]+" <img src=\"http://cdn2.tribalwars.net/graphic/buildings/wall.png\"/><span "+styleWall+">"+CT_Buildings[data]["wall"]+"</span></th></tr>")) 
			$('#incomings_table tr:last').before($(createEmptyRow($("#incomings_table tr:first-child th").length)));
			//CT_Buildings[coords] = {"firstChurch":eersteKerklvl,"church":kerklvl,"farm":farmlvl,"wall":muurlvl}
		}
		$(".SupportNeeded").bind('click', function(){
			var temp = $(this).html();
			if(temp.indexOf("&nbsp;")) {
				$(this).html('&nbsp;');
			} else {
				$(this).html('<span id="id_699|813_export" style="color: green; margin-left: 3px;">&#10003</span>');
			}
		})
		$(".CT_Mark_Attacks").bind('click', function() {
			var temp = $(this)
			$("#incomings_table .nowrap[data-coords='"+$(this).attr("data-coords")+"']").each(function(){
				$(this).find("input[id*='editInput']").val($(temp).closest("th").find("#CT_Tags").val() + " " +$(this).find("input[id*='editInput']").val()).next("input").click();
			})
		});
	} else {
		//$('.InsertInOSList, .CT_EmptyRow').remove()
		location.reload();
	}
}
function IDtagger(i,time1,time2,time3) {
	if(!time1 || !time2) {
		alert("Er moet minstens van 2 aanvallen de looptijd instaan!")
		//return false;
	}
	if(!i) {
		alert("groepsnummer is niet ingevuld tijdens het aanroepen van deze functie");
		//return false;
	}
	if(!time3) {
		/*alert("time3 is not set");
		return false;*/
	}
	///////////Verkrijg de aanvallende spelers van de eerste aanval in de groep en van de laatste aanval in de groep.
				var attacker1 = $(".groep"+i+" .timer:contains('"+time1+"')").closest("tr").find("a[href*='&screen=info_player']").text(),
				attacker2 = $(".groep"+i+" .timer:contains('"+time2+"')").closest("tr").find("a[href*='&screen=info_player']").text(),
		//////////Aanvallende en doeldorpen verkrijgen
				own_village1 = $(".groep"+i+" .timer:contains('"+time1+"')").closest("tr").find("a[href*='&screen=overview']").html().match(/\((\d{1,3}\|\d{1,3})\)/)[1],
				other_village1 = $(".groep"+i+" .timer:contains('"+time1+"')").closest("tr").find("a[href*='&screen=info_village']").html().match(/\((\d{1,3}\|\d{1,3})\)/)[1],
				own_village2 = $(".groep"+i+" .timer:contains('"+time2+"')").closest("tr").find("a[href*='&screen=overview']").html().match(/\((\d{1,3}\|\d{1,3})\)/)[1],
				other_village2 = $(".groep"+i+" .timer:contains('"+time2+"')").closest("tr").find("a[href*='screen=info_village']").html().match(/\((\d{1,3}\|\d{1,3})\)/)[1];
				var f = own_village1.toString().split("|"),
				t = other_village1.toString().split("|"),
				d = own_village2.toString().split("|"),
				r = other_village2.toString().split("|");
		/////////Aantal velden berekenen
				var fields1 = Math.sqrt(Math.pow(parseInt(f[0])-parseInt(t[0]),2)+Math.pow(parseInt(f[1])-parseInt(t[1]),2)),
				fields2 = Math.sqrt(Math.pow(parseInt(d[0])-parseInt(r[0]),2)+Math.pow(parseInt(d[1])-parseInt(r[1]),2));
		////////Attack id's pakken
				var attID1 = $(".groep"+i+" .timer:contains('"+time1+"')").closest("tr").children(":first").text(),
				attID2 = $(".groep"+i+" .timer:contains('"+time2+"')").closest("tr").children(":first").text();
		////////Looptijden opslaan val allebei de dorpen
				var times1 = [];
				var times2 = [];
				$.each(CTPack_Units, function(k,v){
					//debug(v+"\n"+k)
					if(v != null) {
					times1.push(k + " - " + (fields1*(v/60)) + " - " + attID1)
					times2.push(k + " - " + (fields2*(v/60)) + " - " + attID2)
					}
				});
				if($(".groep"+i+" .timer:contains('"+time1+"')").closest("tr").find("input[id*='editInput']").val().match(/^2bt/i)) {
					var remaining_time1 = $(".groep"+i+" .timer:contains('"+time1+"')").closest("tr").find("input[id*='editInput']").val().match(/\d+\:\d+\:\d+/).toString().split(":");
				} else {
					var remaining_time1 = $(".groep"+i+" .timer:contains('"+time1+"')").text().split(":");
				}
				if($(".groep"+i+" .timer:contains('"+time2+"')").closest("tr").find("input[id*='editInput']").val().match(/^2bt/i)) {
					var remaining_time2 = $(".groep"+i+" .timer:contains('"+time2+"')").closest("tr").find("input[id*='editInput']").val().match(/\d+\:\d+\:\d+/).toString().split(":");
				} else {
					var remaining_time2 = $(".groep"+i+" .timer:contains('"+time2+"')").text().split(":");
				}
				var remaining_time_decimal1 = (parseInt(remaining_time1[0]) + ((parseInt(remaining_time1[1])+(parseInt(remaining_time1[2])/60))/60));
				var remaining_time_decimal2 = (parseInt(remaining_time2[0]) + ((parseInt(remaining_time2[1])+(parseInt(remaining_time2[2])/60))/60));
				var possible_times1 = [];
				var possible_times2 = [];
				for(j=0;j<times1.length;j++){
					var w = times1[j].toString().split(" - ");
					if(parseFloat(w[1]) > remaining_time_decimal1) {
						var temp1 = w[1] + " - " + w[0] + " - " +  w[2];
						possible_times1.push(temp1);
					}
					var x = times2[j].toString().split(" - ");
					if(parseFloat(x[1]) > remaining_time_decimal2) {
						var temp2 = x[1] + " - " + x[0] + " - " +  x[2];
						possible_times2.push(temp2);
					}
				}
				possible_times1.sort(function(a, b) {
					function j(a) {
						var w2 = a.toString().split(" - "); 
						var u = 0;
						u += parseFloat(w2[0]);
						return u
					}
					return j(a) - j(b); 
				});
				possible_times2.sort(function(a, b) {
					function j(a) {
						var w2 = a.toString().split(" - "); 
						var u = 0;
						u += parseFloat(w2[0]);
						return u
					}
					return j(a) - j(b); 
				});
				if(time3) {
					var attacker3 = $(".groep"+i+" .timer:contains('"+time3+"')").closest("tr").find("a[href*='&screen=info_player']").text(),
					own_village3 = $(".groep"+i+" .timer:contains('"+time3+"')").closest("tr").html().match(/\d{1,3}\|\d{1,3}/)[0],
					other_village3 = $(".groep"+i+" .timer:contains('"+time3+"')").closest("tr").find("a[href*='&screen=info_village']").html().match(/\d{1,3}\|\d{1,3}/),
					x = own_village3.toString().split("|"),
					y = other_village3.toString().split("|"),
					fields3 = Math.sqrt(Math.pow(parseInt(x[0])-parseInt(y[0]),2)+Math.pow(parseInt(x[1])-parseInt(y[1]),2));
					var attID3 = $(".groep"+i+" .timer:contains('"+time3+"')").closest("tr").children(":first").text();
					var times3 = [];
					$.each(CTPack_Units, function(k,v){
						if(v != null) {
						times3.push(k + " - " + (fields3*(v/60)) + " - " + attID3)
						}
					})
					if($(".groep"+i+" .timer:contains('"+time3+"')").closest("tr").find("input[id*='editInput']").val().match(/^2bt/i)) {
					    var remaining_time3 = $(".groep"+i+" .timer:contains('"+time3+"')").closest("tr").find("input[id*='editInput']").val().match(/\d+\:\d+\:\d+/).toString().split(":");
					} else {
					    var remaining_time3 = $(".groep"+i+" .timer:contains('"+time3+"')").text().split(":");
					}
					var remaining_time_decimal3 = (parseInt(remaining_time3[0]) + ((parseInt(remaining_time3[1])+(parseInt(remaining_time3[2])/60))/60));
					var possible_times3 = [];
					for(j=0;j<times3.length;j++){
						var w = times3[j].toString().split(" - ");
						if(parseFloat(w[1]) > remaining_time_decimal3) {
							var temp = w[1] + " - " + w[0] + " - " + w[2];
							possible_times3.push(temp);
						}
					}
					possible_times3.sort(function(a, b) {
						function j(a) {
							var w2 = a.toString().split(" - "); 
							var u = 0;
							u += parseFloat(w2[0]);
							return u
						}
						return j(a) - j(b);
					});
				} // end if time3 is set ;)
				var aDiff = [];
				var aDiff2 = [];
				var aSendTimeAndID1 = [];
				var aSendTimeAndID2 = [];
				var aSendTimeAndID3 = [];
				$.each(possible_times1, function () {
					var iDiff1 = this.split(' - ')[0];
					var sUnit1 = this.split(' - ')[1];
					var iPoss1 = this.split(' - ')[2];
					$.each(possible_times2, function () {
						var iDiff2 = this.split(' - ')[0];
						var iPoss2 = this.split(' - ')[2];
						var sUnit2 = this.split(' - ')[1];
						aDiff.push(Math.abs((iDiff1-remaining_time_decimal1)-(iDiff2-remaining_time_decimal2)));
						aSendTimeAndID1.push((iDiff1-remaining_time_decimal1)+" - "+iPoss1+" - "+sUnit1)
						aSendTimeAndID2.push((iDiff2-remaining_time_decimal2)+" - "+iPoss2+" - "+sUnit2)
						if(time3) {
							$.each(possible_times3, function(){
								var iDiff3 = this.split(' - ')[0];
								var sUnit3 = this.split(' - ')[1];
								var iPoss3 = this.split(' - ')[2];
								var iDifferenceBetween1And3 = Math.abs(remaining_time_decimal1-remaining_time_decimal3);
								var iDifferenceBetween2And3 = Math.abs(remaining_time_decimal2-remaining_time_decimal3);
								if(iDifferenceBetween1And3 > iDifferenceBetween2And3) {
									aDiff2.push(Math.abs((iDiff1-remaining_time_decimal1)-(iDiff3-remaining_time_decimal3)));
									aSendTimeAndID3.push((iDiff3-remaining_time_decimal3)+" - "+iPoss3+" - "+sUnit3)
								} else {
									aDiff2.push(Math.abs((iDiff2-remaining_time_decimal2)-(iDiff3-remaining_time_decimal3)));
									aSendTimeAndID3.push((iDiff3-remaining_time_decimal3)+" - "+iPoss3+" - "+sUnit3)
								}
							})
						}
					});
				}); 
				var iMinDiff = Math.min.apply(Math, aDiff);
				var iIndex = aDiff.indexOf(iMinDiff);
				var iSendTimeAndID1 = aSendTimeAndID1[iIndex];
				var iSendTimeAndID2 = aSendTimeAndID2[iIndex];
				$(".groep"+i+" .timer:contains('"+time1+"')").closest("tr").find("input[id*='editInput']").val(iSendTimeAndID1.split(" - ")[2] + " (" + other_village1 + ") " + attacker1 + " F" + fields1.toFixed(1)).next("input").click();
				$(".groep"+i+" .timer:contains('"+time2+"')").closest("tr").find("input[id*='editInput']").val(iSendTimeAndID2.split(" - ")[2] + " (" + other_village2 + ") " + attacker2 + " F" + fields2.toFixed(1)).next("input").click();
				if(time3){
					var iMinDiff2 = Math.min.apply(Math, aDiff2);
					var iIndex2 = aDiff2.indexOf(iMinDiff2);
					var iSendTimeAndID3 = aSendTimeAndID3[iIndex2];
					$(".groep"+i+" .timer:contains('"+time3+"')").closest("tr").find("input[id*='editInput']").val(iSendTimeAndID3.split(" - ")[2] + " (" + other_village3 + ") " + attacker3 + " F" + fields3.toFixed(1)).next("input").click();
				}
}


function snipetool() {
/* STAP VOOR STAP BESCHRIJVING: WEGWERKEN! 
- Treintjes opslaan: [[datum,20:00:00:450,20:00:00:750],enz]
- Looptijden uitrekenen voor elk dorp en elk trein en de snelheden ram, speer, zwaard, ridder en speer/boog indien aanwezig. op het eigen troepen overzicht. (na knop!) 
- Tabel publiceren. 
-???
- PROFIT!
*/







}
//Einde Functies
if ($("#incomings_table").length>0) {
var CTtagger = "<input type='button' id='CT_tagger' value='Aanvallen taggen'>";
if($("#incomings_table th:contains('Herkomst')").length > 0) { CTtagger = "<input type='button' id='CT_massatagger' value='Aanvallen taggen'>" }
$("#incomings_table").before("<table style='width: 100%'><tr><th><input type='button' id='OS_list' value='OS-Lijst maken'><input type='button' id='stackbeoordeling' value='stackbeoordeling'><input type='button' id='SearchFakes' value='Fakezoeker'>"+CTtagger+"<input type='button' id='FilterDoel' value='Doel Filteren'><input type='button' id='MarkLastAttacks' value='Markeer laatste aanvallen'><input type='button' id='FreezeTimers' value='Timers stoppen'><input type='button' id='ShowAttackID' value='aanvalsid tonen'><input type='button' id='CT_ID_Tagger' value='ID-Tagger'><input type='button' id='GroupAttacks' value='Groeperen'></th></tr></table>");
$("#OS_list").click(function() {
//debug("Deffpack Cgrain & Tjeerdo");
var doel = {};
    $("<div id='OS_list_popup' style='position: absolute; top: 100px; left: 300px; z-index: 5; height: auto; width: auto;text-align: left;background-color:#ecd6ad;border:2px solid #7d510f;'><div id='close_popup' style='text-align:right;padding:10px 10px 0px 0px'><a href='' id='close'>Sluiten</a></div><textarea id='OutputArea' style='background-color:white;color:black;margin:10px 50px 50px 50px;width:300px;height:300px;'></textarea></div>").appendTo("body");
    $("#close").click(function() {
        $("#OS_list_popup").hide();
    })
	
     var world = gd.world.match(/\d+/);
     if (world < 21) {
    $("table#incomings_table .nowrap").each(function() {
            if(!$(this, "td:first-child").text().match("OK")) {
            var temp = $(this).text().match(/\d{3}\|\d{3}/); 
            if(doel[temp]) {
                doel[temp][0] = ++(doel[temp][0]);
            } else {
                doel[temp] = [1];
                if(!doel[temp][1]) {
                    doel[temp].push($(this).html().split("</td>")[3].replace(/<[^>]*>?/g, '')); 
                }
            }
        }})} else {
        $("table#incomings_table .nowrap").each(function(i) {
            if(!$(this, "td:first-child").text().match(/OK/i)) {
            var temp = $(this).html().split("</td>")[1].match(/\d{3}\|\d{3}/);
            if(doel[temp]) {
                doel[temp][0] = ++(doel[temp][0]);
            } else {
                doel[temp] = [1];
                if(!doel[temp][1]) {
                    doel[temp].push($(this).html().split("</td>")[4].replace(/<[^>]*>?/g, ''));
                }
            }
        }});
		
        }
		if($('.InsertInOSList').size() > 0) {
			$('.SupportNeeded').each(function(){
				if($(this).html() == "&nbsp;") {
					delete doel[$(this).attr('data-coord')];
				}
			})
		}
        $("#OutputArea").append("[table][**]nummer[||]Aangevallen dorpen[||]Aantal incomings[||]Aankomsttijd 1e aanval[||]Aantal deff nodig[/**]<br/>");
		var indexlijst = 0;
		debug("voor zover");
		for(key in doel) {
		    indexlijst++;
			if (localStorage['CTstack'] === undefined) {
			alert("nog geen stacks gebruikt?\nJe kunt bij troepen overzicht de stacks laden, dat gebeurd automatisch");
			localStorage['CTstack'] = "{}";
		    }
		    debug("Shitzooi");
			var StackAllVillages = JSON.parse(localStorage["CTstack"]);
		    if (world_config.hasArchers) {
			debug("het gaat fout bij de stack.");
			debug(JSON.stringify(StackAllVillages));
			debug(key)
			var OS_stack = stackincboog(doel[key][0], StackAllVillages[key],100,20);
			debug("kolere");
		    }
		    else {
			var OS_stack = stackincnone(doel[key][0], StackAllVillages[key],100,20); //[7000,7000,0,7000, 0, 0, 0, 0,0]
		    }
		    doel[key].push(OS_stack)
var months = { "Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12 };
		    if($.trim(doel[key][1]).indexOf("vandaag") > -1) {
			var a = $.trim(new Date());
			var CT_Day = a.toString().split(" ")[2];
			var CT_Month = a.toString().split(" ")[1];
			doel[key][1] = $.trim(doel[key][1]).replace("vandaag", "op "+CT_Day+"."+months[CT_Month]+".")
		    } else if($.trim(doel[key][1]).indexOf("morgen") > -1) {
			var a = new Date();
			$.trim(a.setUTCDate(a.getUTCDate() + 1)); //Thu Sep 12 2013 19:13:05 GMT+0200
			var CT_Day = a.toString().split(" ")[2];
			var CT_Month = a.toString().split(" ")[1];
			doel[key][1] = $.trim(doel[key][1]).replace("morgen", "op "+CT_Day+"."+months[CT_Month]+".")
		    }
			debug("Bijna!");
            $("#OutputArea").append("[*]"+ indexlijst + "[|][coord]" + key + "[/coord][|]" + doel[key][0] + "[|]" + $.trim(doel[key][1]) + "[|]" + $.trim(doel[key][2]) +"[/*]" + "<br/>");
        }
        $("#OutputArea").append("[/table]\n\n");
});

// einde deel popup/OS-lijst maken
//voor de incomings een kolom IDs maken na het klikken op de button:
$("#stackbeoordeling").click(function() { 
//Dit moet proper. eerst sorteren op doeldorp, enz. 
xsort("xasc");
//for each dorp in list: tel de incs, vraag de stack op (uit LS, uit ajax? ) en bereken/haal de moraal op. Niet zo moeilijk wss.
/*
Uitwerking:
-Zoeken tot hij somlijn vindt. 
- Inc's ophalen uit somlijn. 
- dorp uit bevel erboven opzoeken. ($(this).parent.parent.enz.before.find("td:eq(xx)");
- stack ophalen doormiddel van LS (ajax zal wel niet in orde zijn :S). 
- moraal uitrekenen als het niet in LS staat dmv ajax of moraal gewoon negeren (later toevoegen!). 
- stackinc met gegevens uitvoeren. 
- Output in somlijn: x incs - y extra dorpen def nodig. (igv 0 extra def: groene tekst met: gestackt!)
-Doorzoeken tot einde tabel. 
*/

if (localStorage['CTstack'] === undefined) {
debug("nog geen stacks gebruikt?\nJe kunt bij troepen overzicht de stacks laden, dat gebeurd automatisch");
localStorage['CTstack'] = "{}";
}
var stackalledorpen = JSON.parse(localStorage["CTstack"]);
var muurtje = JSON.parse(localStorage["CTmuur"]);
var rijen = $(".optel");

rijen.each(function(index) {
var inkomende = $(this).text();
//debug(inkomende);
var dorp = $(this).prev().find("a[href$='overview']").html().match(/\((\d+)\|(\d+)\)/);
//debug(dorp);
var naamLS = dorp[1] + "|" + dorp[2];
var stackie  = stackalledorpen[naamLS];//(zie onder waarom niet gewoon stack, we veranderen dat wss 
var muur = muurtje[naamLS];
if (typeof muur === 'undefined') { muur = 20;}
//debug(stackie);
if (stackie === undefined) {
$(this).text("Stack onbekend");
return true;}
if (world_config.hasArchers) {
var stack = stackincboog(inkomende, stackie,100,muur);
}
else {
var stack = stackincnone(inkomende, stackie,100,muur) //[7000,7000,0,7000, 0, 0, 0, 0,0]
}

$(this).text(inkomende + " incs --" + stack + " def nodig.!!!");
}); 
var stack = stackincboog(7, [7000,7000,0,7000, 0, 0, 0, 0,0,0,0],100);
//debug(stack);
}); 
$("#ShowAttackID").click(function(){
    ShowAttackID()
})	
$("#SearchFakes").click(function() {
    if(confirm("De fakezoeker werkt alleen als je de coordinaten van het herkomstdorp in de  bevelnaam hebt staan\nAls je alle aanvallen hebt getagt dan kun je nu doorgaan")) {
	var attacks = {};
	$(".nowrap:has(input[id*='editInput'])").each(function(){
	    var herkomstdorp = $(this).find("input[id*='editInput']").val().match(/\d{0,3}\|\d{0,3}/) ? $(this).find("input[id*='editInput']").val().match(/\d{0,3}\|\d{0,3}/).toString() : 0;
	    if($.type(herkomstdorp) === "string") {
		if(attacks[herkomstdorp] === undefined) {
		    attacks[herkomstdorp] = '1';
		} else {
		    attacks[herkomstdorp] = ++(attacks[herkomstdorp]);
		}
	    }
	})
	$.each(attacks, function(k,v){
	    if(v > 1) {
		$(".nowrap:has(input[id*='editInput'])").each(function(){
		    if($(this).find("input[id*='editInput']")[0].value.indexOf(k) > -1 && $(this).find("input[id*='editInput']")[0].value.indexOf("??FAKE??") == -1) {
			$(this).find("input[id*='editInput']").val($(this).find("input[id*='editInput']").val() + " ??FAKE??").next("input").click();
		    }
		})
	    }
	})
    }
})
	$("#CT_massatagger").click(function(){
			$("#incomings_table tr.nowrap").each(function(){
				if($(this).find("input[id*='editInput']").val().match(/Aanval/i) || $(this).find("input[id*='editInput']").val().match(/^2bt/i)) {
					var attacker = $(this).find("a[href*='&screen=info_player']").text(),
					own_village = $(this).html().match(/\d+\|\d+/)[0],
					other_village = $(this).find("a[href*='&screen=info_village']").html().match(/\d+\|\d+/),
					f = own_village.toString().split("|"),
					t = other_village.toString().split("|"),
					fields = Math.sqrt(Math.pow(parseInt(f[0])-parseInt(t[0]),2)+Math.pow(parseInt(f[1])-parseInt(t[1]),2));
					var times = [];
					$.each(CTPack_Units, function(k,v){
						if(v != null) {
						times.push(k + " - " + (fields*(v/60)))
						}
					})
					if($(this).find("input[id*='editInput']").val().match(/^2bt/i)) {
					    var remaining_time = $(this).find("input[id*='editInput']").val().match(/\d+\:\d+\:\d+/).toString().split(":");
					} else {
					    var remaining_time = $(this).find(".timer").text().split(":");
					}
					var remaining_time_decimal = (parseInt(remaining_time[0]) + ((parseInt(remaining_time[1])+(parseInt(remaining_time[2])/60))/60));
					var possible_times = [];
					for(i=0;i<times.length;i++){
						var w = times[i].toString().split(" - ");
						if(parseFloat(w[1]) > remaining_time_decimal) {
							var temp = w[1] + " - " + w[0]
							possible_times.push(temp);
						}
					}
					possible_times.sort(function(a, b) {
						function j(a) {
							var w2 = a.toString().split(" - "); 
							var u = 0;
							u += parseFloat(w2[0]);
							return u
						}
						return j(a) - j(b); 
					});
					$(this).find("input[id*='editInput']").val(possible_times[0].split(" - ")[1] + " (" + other_village + ") " + attacker + " F" + fields.toFixed(1)).next("input").click();
					$(this).children().css("background-color","#00FF00");
				}
			})
        })
	$("#CT_tagger").click(function(){
	    var att_id = [];
	    i = 0;
	    $("#incomings_table .nowrap").each(function() {
		if($(this).find("input[id*='editInput']").val().match(/Aanval/i) || $(this).find("input[id*='editInput']").val().match(/^2bt/i)) {
		    att_id[i] = $.trim($(this).find("input:first").attr("name").match(/\d+/));
		    i++;
		}
	    })
	    localStorage['CT_IncomingsId'] = JSON.stringify(att_id);
	    if(confirm('Er zijn '+att_id.length+' aanvallen die getagd moeten worden.\nWil je naar het eerste bevel gaan?')) { location.href=game_data.link_base_pure+'info_command&id='+att_id[0]} else { debug('Er zijn geen dorpen die getagd kunnen worden.');return};
	})
	$("#FilterDoel").click(function(){ 
    var TargetFilter = $.trim(prompt("Op welke coordinaten wil je filteren: ", "123|456"));
    var xCoord = TargetFilter.split("|")[0];
    var yCoord = TargetFilter.split("|")[1];
    TargetFilter = "["+xCoord.split("")[0]+"]["+xCoord.split("")[1]+"]["+xCoord.split("")[2]+"]\\|["+yCoord.split("")[0]+"]["+yCoord.split("")[1]+"]["+yCoord.split("")[2]+"]";
    var temp = new RegExp(TargetFilter);
    $("#incomings_table .nowrap").each(function(){
        if(temp.test($(this).text()) === false) {
            $(this).remove();
        }
    })
})
$("#MarkLastAttacks").click(function() {
    mark_last();
})
$("#FreezeTimers").click(function(){
    if(timers.length>0) {
	CT_TempTimers=timers;
	timers=[];
	$("#FreezeTimers").val("Timers starten")
	} else {
	    timers=CT_TempTimers;
	    $("#FreezeTimers").val("Timers stoppen");
	} 
})
$("#GroupAttacks").click(function(){
	GroupAttacks();
})
$("#CT_ID_Tagger").click(function(){
	ShowAttackID();
	if($("#incomings_table:has(th:contains('IDs'))").length>0) {
		var CT_TempTimers = [];
	    timers=CT_TempTimers;
	    $("#FreezeTimers").val("Timers stoppen");
		$("#IDasc").click();
		var MaxDifference = prompt("Geef hier in hoe groot het verschil tussen de aanvalsid maximaal mag zijn: ", 50);
		var ClassNumber = 1;
//////////////Groepeer de groepen en geef ze een een class: group + (groepsnummer beginnend bij 1)
		$("tr[class*=\"row_\"]").each(function (index, value) {
			if(index !== ($("tr[class*=\"row_\"]").length -1)) {
				var nextID = $(this).next().children(":first").text();
			}
			var ID = $(this).children(":first").text();
			$(this).addClass("groep"+ClassNumber)
			if (Math.abs(ID-nextID) > parseInt(MaxDifference) || index == $("tr[class*=\"row_\"]").length -1) {
				$(this).after("<tr class='ID_difference'><td align='left' colspan='"+$("#incomings_table tr:has(th:contains('IDs')) th").length+"'>???&nbsp;</td></tr>");
				ClassNumber = ++ClassNumber;
			}
		});
/////////////Ga alle groepen af
		for(i=1;i<ClassNumber;i++) {
////////////Verkrijg de tijden tot aankomst van alle dorpen in de groep
			if($(".groep"+i).length>1) {
				var times = [];
				$(".groep"+i).each(function(){
					if($(this).find("input[id*='editInput']").val().match(/Aanval/i) || $(this).find("input[id*='editInput']").val().match(/^2bt/i)) {
						times.push($(this).find(".timer").text());
					}
				})
				times.sort(function (a,b) {
					function j(a) {
						$.trim(a);
						var TimeSplit = a.split(':');
						var x = (TimeSplit[0] + TimeSplit[1] + TimeSplit[2]) * 1;
						return x;
					}
					return j(a) - j(b);
				});
				/** hier dus ergens die functie aanroepen.
				***
				**/
				var iTimesLength = Math.floor(times.length/2);
				for(j=0;j<iTimesLength;j++) {
					if(times.length === 4) {
						IDtagger(i,times[0],times[2])
						IDtagger(i,times[1],times[3])
						j++
					} else if(times.length === 3) {
						IDtagger(i,times[0],times[2],times[1])
					} else {
						IDtagger(i,times[0],times[times.length - 1])
						times.pop();
						times.shift();
					}
				}
			} else { //regel 54 begin het if statement
				alert("Groep"+i+" kan niet getagt worden omdat die maar 1 aanval bevat");
			}
		} // einde for loopje
	} else {
		alert("Het lijkt erop dat de IDs niet getoond worden")
	}
});
	} // einde deel voor de incomings pagina
else if (location.href.indexOf('mode=buildings') > -1) {
	$('#buildings_table').before('<table style=""><tr><td colspan="'+$('#buildings_table tr:first th').length+'"><input type="button" id="CT_SaveBuildings" value="Gebouwlvls opslaan"/><td></tr></table>');
	$('#CT_SaveBuildings').click(function(){
		if(localStorage['CT_Buildings'] === undefined) {
			var CT_Buildings = {};
		} else {
			var CT_Buildings = JSON.parse(localStorage['CT_Buildings'])
		}
		var indexmuur = $('#buildings_table tr:contains("Bouwopdrachten") th:has(img[src*="wall.png"])').index();
		var indexFarm = $('#buildings_table tr:contains("Bouwopdrachten") th:has(img[src*="farm.png"])').index();
		if($('#buildings_table tr:contains("Bouwopdrachten") th:has(img[src*="church.png"])').index() > -1) {
			var indexeerstekerk = $('#buildings_table tr:contains("Bouwopdrachten") th:has(img[src*="church.png"])').last().index();
			var indexkerk = $('#buildings_table tr:contains("Bouwopdrachten") th:has(img[src*="church.png"])').first().index();
		}
		$('#buildings_table .vrow').each(function() {
				var coords = $(this).html().match(/\d{1,3}\|\d{1,3}/);
				var muurlvl = $(this).find("td:eq("+indexmuur+")").text();
				var farmlvl = $(this).find("td:eq("+indexFarm+")").text();
				if(indexkerk > 0) {
					var eersteKerklvl = $(this).find("td:eq("+indexeerstekerk+")").text();
					var kerklvl = $(this).find("td:eq("+indexkerk+")").text();
				}
				CT_Buildings[coords] = {"firstChurch":eersteKerklvl,"church":kerklvl,"farm":farmlvl,"wall":muurlvl}
				
		});
		localStorage["CT_Buildings"] = JSON.stringify(CT_Buildings);
		alert("Gebouwlvls zijn opgeslagen");
	})
}
else if (game_data.mode == "units") {
// Stack opslaan? Gaat veel tijd kosten, om ze allemaal langs te gaan. Hoe dit aan te pakken? Idee: Enkel dorpen onder aanval te doen, tenzij er op een knop gedrukt wordt. Op dat moment wordt alles ingeladen. Werkt natuurlijk enkel alleen bij 'alle' en bij 'verdediging'.
// Tjeerdo: op dit moment heb je de keuze om alles op te slaan maar ook om alleen de stacks van dorpen onder aanval op te slaan.g
	if (location.href.indexOf('type=complete') > -1 || location.href.indexOf('type=support_detail') > -1 || location.href.indexOf('type=there') > -1 || location.href.indexOf('type') == -1) {
		$("#units_table").before("<table style='width: 100%'><tr><th><input type='button' id='AllStacks' value='Alle stacks opslaan'><input type='button' id='AttackedVillages' value='aangevallen stacks opslaan'></th></tr></table>");
		$("#AllStacks").click(function(){
			if(localStorage["CTstack"] === undefined) {
				var CT_Stack = {};
			} else {
				var CT_Stack = JSON.parse(localStorage["CTstack"]);
			}
			$("#units_table tr:contains('in het dorp')").each(function(){
				if (location.href.indexOf('type=complete') > -1 || location.href.indexOf('type') == -1) { 
					var villageCoord = /(\d{1,3}\|\d{1,3})/.exec($(this).prev().html()); 
				} 
				else { 
					var villageCoord = /(\d{1,3}\|\d{1,3})/.exec($(this).html()); 
				}
				var Stack_units = $(this).html().match(/(\d+)\</g);
				if($("#units_table").find("img[src*='unit_militia.png']").length > 0) {
					Stack_units.pop() //zonder dit staat de burgerwacht erbij terwijl die niet relevant is 
				}
				CT_Stack[villageCoord[1]] = Stack_units
			})
			localStorage["CTstack"] = JSON.stringify(CT_Stack);
			alert("Stacks zijn opgeslagen");
		})
		$("#AttackedVillages").click(function(){
			if(localStorage["CTstack"] === undefined) {
				var CT_Stack = {};
			} else {
				var CT_Stack = JSON.parse(localStorage["CTstack"]);
			}
			/* onderstaande met :not(:contains(\"img[src*='attack.png']\")) ff goed testen */
			$("#units_table tr:contains('in het dorp'):not(:contains(\"img[src*='attack.png']\"))").each(function(){
				if (location.href.indexOf('type=complete') > -1 || location.href.indexOf('type') == -1) { 
					var villageCoord = /(\d{1,3}\|\d{1,3})/.exec($(this).prev().html()); 
				} 
				else { 
					var villageCoord = /(\d{1,3}\|\d{1,3})/.exec($(this).html()); 
				}
				var Stack_units = $(this).html().match(/(\d+)\</g);
				if($("#units_table").find("img[src*='unit_militia.png']").length > 0) {
					Stack_units.pop() //zonder dit staat de burgerwacht erbij terwijl die niet relevant is 
				}
				CT_Stack[villageCoord[1]] = Stack_units
			})
			localStorage["CTstack"] = JSON.stringify(CT_Stack);
			alert("Stacks van de dorpen die aangevallen worden zijn opgeslagen");
		})
	}
} // einde deel voor troepenoverzicht
else if(game_data.mode == "call") {
    $('#village_troup_list').before('<table style="width:100%"><tr><th><input type="button" id="CT_CallFilter" value="Filteren"></th></tr></table>');
    $("#CT_CallFilter").click(function(){
	var MaxPopulation = prompt('Minimaal aantal boerderijplaatsen: ', 18000);
	$('#village_troup_list tr:has("td.tooltip")').each(function(){
	    var CountPopulation = 0;
	    if($(this).find('td[data-unit*="archer"]').length > 0) {
		ValSpear = parseInt($(this).find(".tooltip")[0].innerHTML) * population['spear'];
		ValSword = parseInt($(this).find(".tooltip")[1].innerHTML) * population['sword'];
		ValAxe = parseInt($(this).find(".tooltip")[2].innerHTML) * population['axe'];
		ValArcher = parseInt($(this).find(".tooltip")[3].innerHTML) * population['archer'];
		ValSpy = parseInt($(this).find(".tooltip")[4].innerHTML) * population['spy'];
		ValLight = parseInt($(this).find(".tooltip")[5].innerHTML) * population['light'];
		ValMarcher = parseInt($(this).find(".tooltip")[6].innerHTML) * population['marcher'];
		ValHeavy = parseInt($(this).find(".tooltip")[7].innerHTML) * population['heavy'];
		ValRam = parseInt($(this).find(".tooltip")[8].innerHTML) * population['ram'];
		ValCatapult = parseInt($(this).find(".tooltip")[9].innerHTML) * population['catapult'];
		ValKnight = $(this).find(".tooltip")[10] ? parseInt($(this).find(".tooltip")[10].innerHTML) * population['knight'] : 0;
		CountPopulation = ValSpear+ValSword+ValAxe+ValArcher+ValSpy+ValLight+ValMarcher+ValHeavy+ValRam+ValCatapult+ValKnight;
	    } else {
		ValSpear = parseInt($(this).find(".tooltip")[0].innerHTML) * population['spear'];
		ValSword = parseInt($(this).find(".tooltip")[1].innerHTML) * population['sword'];
		ValAxe = parseInt($(this).find(".tooltip")[2].innerHTML) * population['axe'];
		ValSpy = parseInt($(this).find(".tooltip")[3].innerHTML) * population['spy'];
		ValLight = parseInt($(this).find(".tooltip")[4].innerHTML) * population['light'];
		ValHeavy = parseInt($(this).find(".tooltip")[5].innerHTML) * population['heavy'];
		ValRam = parseInt($(this).find(".tooltip")[6].innerHTML) * population['ram'];
		ValCatapult = parseInt($(this).find(".tooltip")[7].innerHTML) * population['catapult'];
		ValKnight = $(this).find(".tooltip")[8] ? parseInt($(this).find(".tooltip")[8].innerHTML) * population['knight'] : 0;
		CountPopulation = ValSpear+ValSword+ValAxe+ValSpy+ValLight+ValHeavy+ValRam+ValCatapult+ValKnight;
	    }
	    if(CountPopulation < MaxPopulation) {
		$(this).remove();
	    }
	})
    })
}
else if (location.href.indexOf('screen=info_command') > -1) {
    var att_id = JSON.parse(localStorage['CT_IncomingsId']);
    //debug(JSON.stringify(att_id));
    $("#edit").after("<a href='javascript:void(0);' style='text-align:right;margin-left:5px' id='NextIncoming'>Volgende bevel</a>")
			if($("input[id*='editInput']").val() == "" || $("input[id*='editInput']").val().match(/Aanval/i)) {
			    //debug("Tja");
			var infotable = $("#content_value").find("table:eq(0)");
			var herkomstdorp = $(infotable).find("tr:contains('Herkomst')").next().find("td:eq(1)");
			var attacker = $(infotable).find("tr:contains('Herkomst') td").last().text();
			var doeldorp = $(infotable).find("tr:contains('Doel')").next().find("td:eq(1)");
			var herkomstcoord = herkomstdorp.text().match(/\d+\|\d+/).toString().split("|");
			var doelcoord = doeldorp.text().match(/\d+\|\d+/).toString().split("|");
			var fields = Math.sqrt(Math.pow(parseInt(doelcoord[0])-parseInt(herkomstcoord[0]),2)+Math.pow(parseInt(doelcoord[1])-parseInt(herkomstcoord[1]),2));
			var aankomsttijd = $(infotable).find("tr:contains('Aankomst:')").find("td:eq(1)").text();
			if($(this).find("input[id*='editInput']").val().match(/^2bt/i)) {
			    var aankomstin = $("input[id*='editInput']").val().match(/\d+\:\d+\:\d+/).toString().split(":");
			} else {
			    var aankomstin = $(infotable).find("tr:contains('Aankomst in:')").find("td:eq(1)").text().split(":");
			}
			var looptijden = [];
			$.each(CTPack_Units, function(k,v){
				if(v != null) {
					var looptijd = getlooptijd(herkomstcoord[0], herkomstcoord[1], doelcoord[0], doelcoord[1], v, aankomsttijd);
					//debug(looptijd.tijdsduur);
					if(aankomstin[0] == looptijd.uurtijdsduur) {
					    if(aankomstin[1] < looptijd.minuuttijdsduur) {
						looptijden.push(v +" - " + k);
					    } else if(aankomstin[1] == looptijd.minuuttijdsduur) {
						if(aankomstin[2] <= looptijd.secondentijdsduur) {
						    looptijden.push(v +" - " + k);
						}
					    }
					} else if(aankomstin[0] < looptijd.uurtijdsduur) {
					    looptijden.push(v +" - " + k);
					}
				}
			});
			looptijden.sort(function(a, b) {
				function j(a) {
					var w2 = a.toString().split(" - "); 
					var u = 0;
					u += parseFloat(w2[0]);
					return u
				}
				return j(a) - j(b); 
			});
			$("input[id*='editInput']").val(looptijden[0].split(" - ")[1] + " (" + herkomstdorp.text().match(/\d+\|\d+/).toString() + ") " + attacker + " F" + fields.toFixed(1)).next("input").click();
			}
		$("#NextIncoming").click(function() {
		    var id = $.trim(location.href.match(/id=(\d+)/)[1]);
		    var ID_index = $.inArray(id, att_id);
		    ID_index = ID_index + 1;
		    if(ID_index < att_id.length) {
		    location.href=game_data.link_base_pure+'info_command&id='+att_id[ID_index];
		    } else {
			location.href=game_data.link_base_pure+'overview_villages&mode=incomings&subtype=attacks'
		    }
		    })
		} // einde deel bevel overzicht (incoming);
if(game_data.screen == "overview_villages") {
    $(".paged-nav-item").last().after('<a id="LoadNextPage" href="#">[Volgende pagina laden]</a>'); 
	$("#LoadNextPage").click(function(){
		var nextpage = $("#paged_view_content .vis tr:first-child a:first").attr("href");
		$.ajax({
                url: "http://"+game_data.world+".tribalwars.nl"+nextpage,
                success: function (result) {
			$(".overview_table tr:has(td)").last().after($("#combined_table tr:has(td),#production_table tr:has(td),#units_table tr:has(td),#incomings_table tr:has(td), #buildings_table tr:has(td), #techs_table tr:has(td)", result));
                },
				error: function() {
					alert("De volgende pagina kon niet geladen worden\nDeze bug graag melden bij de makers van dit deff pack");
				}
            })
	$("#paged_view_content .vis tr:first-child a:first").replaceWith('<strong>'+$("#paged_view_content .vis tr:first-child a:first").html()+'</strong>');
	if($("#paged_view_content .vis tr:first-child a:first").attr("href").match("page=-1")) {
		$("#LoadNextPage").remove();
	}
	});
}

});