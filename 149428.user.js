// ==UserScript==
// @name        Plemiona+
// @namespace   http://shoxteam.net
// @description Enhances tribal wars user experience. by Slay
// @include     *.plemiona.pl/game.php?*&screen=place*
// @include     *.plemiona.pl/game.php?*&screen=overview*
// @include     *.plemiona.pl/game.php?*&mode=buildings*
// @version     1.4.0
// ==/UserScript==

//autoattack: $('#unit_input_spy').attr("value", "5"); $('#inputx').attr("value", "820"); $('#inputy').attr("value", "354"); $("#target_attack").click(); $("#troop_confirm_go").click();
function GM_wait() {	

  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $ = unsafeWindow.jQuery;
    letsJQuery();
  }

}
function timeToSeconds(hours,minutes,seconds) {
return parseInt(hours)*3600+parseInt(minutes)*60+parseInt(seconds);
}

function secondsToTime(s){
    var h  = Math.floor( s / ( 60 * 60 ) );
        s -= h * ( 60 * 60 );
    var m  = Math.floor( s / 60 );
        s -= m * 60;
   
    if(m<10) m = "0" + m;
	if(s<10) s = "0" + s;
	return h + ":" + m + ":" + s;
}
var najspeed = 0;
var countid;
var delay = 0;
function countdown(send_at) {
	if($("#serverTime").html() == send_at)
	{
		setTimeout(function() {$("#troop_confirm_go").click();},$("#autosend_delay").html());
		countid=window.clearInterval(countid)
		$('#status_div').html('Status: Wysłano atak!');
	}
	else
	{
		//odliczanie
	}
}


// Main()
function letsJQuery()
{
  if (typeof unsafeWindow == 'undefined') {
    unsafeWindow = window;
  }
	$(document).ready(function()
	{
	  if(window.location.href.indexOf("screen=place")!=-1 && window.location.href.indexOf("try=confirm")!=-1)
	  {
		  function start_autosend(event) {
			$('#status_div').html('Status: odliczam');
			var send_at = $('#send_at').val();
			time = send_at.split(/:/);
			var sek = timeToSeconds(time[0], time[1], time[2]);
			sek -= 1;
			countid = self.setInterval(function(){countdown(secondsToTime(sek))}, 100);
			return false;
		  }
		  function stop_autosend(event) {
			$('#status_div').html('Status: nie działa');
			countid=window.clearInterval(countid)
			 return false;
		  }
		  function count_send_at(event) {
			var fromx = unsafeWindow.game_data.village.coord.split("|")[0];
			var fromy = unsafeWindow.game_data.village.coord.split("|")[1];
			var rgx = "\\([0-9]{1,3}\\|[0-9]{1,3}\\)(?!.*\\([0-9]{1,3}\\|[0-9]{1,3}\\))";
			var str = $("#content_value form .vis:eq(0) td a").html();
			var match = str.match(rgx);
			var tox = "";
			var toy = "";
			if(match && match[0]) {
				var i = str.search(rgx);
				var coords = str.substr(i+1,match[0].length-2).split("|");
				tox = coords[0];
				toy = coords[1];
			}
			var odl = round(Math.sqrt(Math.pow((parseInt(tox)-parseInt(fromx)), 2) + Math.pow((parseInt(toy)-parseInt(fromy)), 2)), 4);
			var sek_trwanie = round(round(odl*najspeed, 4)*60);
			var arr_at_arr = $("#arrives_at").val().split(/:/);
			var sekarr_at = timeToSeconds(arr_at_arr[0], arr_at_arr[1], arr_at_arr[2]);
			if(sek_trwanie>24*60*60){sek_trwanie=sek_trwanie%(24*60*60);}
			var seknewtime = 0;
			if(sekarr_at<sek_trwanie) { seknewtime = ((24*3600)+sekarr_at)-sek_trwanie; }
			else { seknewtime = sekarr_at - sek_trwanie; }
			var newtime = secondsToTime(seknewtime);
			$("#send_at").val(newtime);
			return false;
		  }

	  var spear = $('input[name="spear"]').val();
	  var sword = $('input[name="sword"]').val();
	  var axe = $('input[name="axe"]').val();
	  var archer = $('input[name="archer"]').val();
	  var spy = $('input[name="spy"]').val();
	  var light = $('input[name="light"]').val();
	  var marcher = $('input[name="marcher"]').val();
	  var heavy = $('input[name="heavy"]').val();
	  var ram = $('input[name="ram"]').val();
	  var catapult = $('input[name="catapult"]').val();
	  var knight = $('input[name="knight"]').val();
	  var snob = $('input[name="snob"]').val();
	  var najw = "";
	  if(snob>0){ najw = "Szlachcic"; najspeed = 35; }
	  else if(catapult>0) { najw = "Katapulta"; najspeed = 30; }
	  else if(ram>0) { najw = "Taran"; najspeed = 30; }
	  else if(sword>0) { najw = "Miecznik"; najspeed = 22; }
	  else if(axe>0) { najw = "Topornik"; najspeed = 18; }
	  else if(spear>0) { najw = "Pikinier"; najspeed = 18; }
	  else if(archer>0) { najw = "Łucznik"; najspeed = 18; }
	  else if(heavy>0) { najw = "Ciężki kawalerzysta"; najspeed = 11; }
	  else if(knight>0) { najw = "Rycerz"; najspeed = 10; }
	  else if(light>0) { najw = "Lekki kawalerzysta"; najspeed = 10; }
	  else if(marcher>0) { najw = "Łucznik na koniu"; najspeed = 10; }
	  else if(spy>0) { najw = "Zwiadowca"; najspeed = 9; }
	  var autosend_status = false;
	  
	  status_text = 'Status: nie działa';
		
	  //$("#troop_confirm_go").before(['',
	  $("#content_value form .vis:eq(0)").css("float", "left");
	  $("#content_value form .vis:eq(0)").after(['',
	  '<table class="vis" width="300">',
		'<tr>',
		'	<th  colspan="2">',
		'					Plemiona+',
		'				</th>',
		'		</tr>',
		'<tr><td>Najwolniejsza jednostka:</td><td>'+najw+'</td></tr>',
		'<tr><td>Ma dojść o:</td><td><input type="text" id="arrives_at" value="8:00:00" style="width:50px"><input type="button" value="Licz" id="count_send_at_btn"></td></tr>',
		'	<tr><td>Wyślij o godzinie</td><td><input type="text" id="send_at" value="'+$("#serverTime").html()+'" style="width:50px"></td></tr>',
		'<tr><td>Opóźnienie:</td><td><input type="text" id="autosend_delay" value="100" style="width:50px"></td></tr>',
		'<tr>',
		'	<td id="status_div">'+status_text+'</td>',
		'	<td><input type="button" value="Start" id="autosend_start_btn"><input type="button" value="Stop" id="autosend_stop_btn">',
		'		',
		'				</td></tr>',
		'</table><br />',
	  ''].join('\n'));
	  
		  $('#autosend_start_btn').click(start_autosend);
		  $('#autosend_stop_btn').click(stop_autosend);
		  $('#count_send_at_btn').click(count_send_at);
	  }
	  else if(window.location.href.indexOf("mode=buildings")!=-1)
	  {
		function level(html) {
			var a = html.lastIndexOf('">')+2;
			var b = html.lastIndexOf('</a');
			return html.substring(a, b);
		}
		function available(what, context) {
			if($(what, context).html().indexOf("<a")>-1)
				return level($(what, context).html());
			else
				return -1;
		}
		function build(what, context) {
			setTimeout(function(){$(what + " > a", context).click()}, (Math.random()*5000)+1);
			//unsafeWindow.console.log("[" + context.id + "] - buduje: " + what);
		}
		function autobuild() {
			$("#buildings_table > tbody > tr").each(function(){
				var ratusz = 	available(".b_main", this);
				var koszary = 	available(".b_barracks", this);
				var stajnia = 	available(".b_stable", this);
				var warsztat = 	available(".b_garage", this);
				var palac = 	available(".b_snob", this);
				var kuznia = 	available(".b_smith", this);
				var plac = 		available(".b_place", this);
				var piedestal = available(".b_statue", this);
				var rynek = 	available(".b_market", this);
				var tartak = 	available(".b_wood", this);
				var cegielnia = available(".b_stone", this);
				var huta = 		available(".b_iron", this);
				var zagroda = 	available(".b_farm", this);
				var spichlerz = available(".b_storage", this);
				var schowek = 	available(".b_hide", this);
				var mur = 		available(".b_wall", this);

				$(this).children().last().find("ul").children().each(function(){
				var link = $(".queue_icon > img", this).attr("src");
				var a = link.indexOf("/buildings/")+11;
				var b = link.indexOf(".png", a);
				var what = link.substring(a, b);
				
				if(what == "main" 			&& ratusz 	!= -1) 	ratusz++;
				else if(what == "barracks" 	&& koszary 	!= -1) 	koszary++;
				else if(what == "stable" 	&& stajnia 	!= -1) 	stajnia++;
				else if(what == "garage" 	&& warsztat != -1) warsztat++;
				else if(what == "snob" 		&& palac 	!= -1) 	palac++;
				else if(what == "smith" 	&& kuznia 	!= -1) 	kuznia++;
				else if(what == "place" 	&& plac 	!= -1) 	plac++;
				else if(what == "statue" 	&& piedestal!= -1) piedestal++;
				else if(what == "market" 	&& rynek 	!= -1) 	rynek++;
				else if(what == "wood" 		&& tartak 	!= -1) 	tartak++;
				else if(what == "stone" 	&& cegielnia!= -1) cegielnia++;
				else if(what == "iron" 		&& huta 	!= -1) 	huta++;
				else if(what == "farm" 		&& zagroda 	!= -1) 	zagroda++;
				else if(what == "storage" 	&& spichlerz!= -1) spichlerz++;
				else if(what == "hide" 		&& schowek 	!= -1) 	schowek++;
				else if(what == "wall" 		&& mur 		!= -1) 	mur++;
				});
				
				if(plac == 0) build(".b_place", this);
				else if(ratusz != -1 && ratusz < 20) build(".b_main", this);
				else if(mur != -1) build(".b_wall", this);
				else if(spichlerz != -1 && spichlerz < 20) build(".b_storage", this);
				else if(tartak != -1)
				{
					if(cegielnia != -1 && huta != -1)
					{
						if(cegielnia < tartak && cegielnia < huta) build(".b_stone", this);
						else if(huta < tartak && huta < cegielnia) build(".b_iron", this);
						else build(".b_wood", this);
					}
					else if(cegielnia != -1 && cegielnia < tartak) build(".b_stone", this);
					else if(huta != -1 && huta < tartak) build(".b_iron", this);
					else build(".b_wood", this);
				}
				else if(cegielnia != -1)
				{
					if(huta != -1 && huta < cegielnia) build(".b_iron", this);
					else build(".b_stone", this);
				}
				else if(huta != -1) build(".b_iron", this);
				else if(koszary != -1)
				{
					if(stajnia != -1 && stajnia < koszary) build(".b_stable", this);
					else build(".b_barracks", this);
				}
				else if(stajnia != -1) build(".b_stable", this);
				else if(warsztat != -1 && warsztat < 10) build(".b_garage", this);
				else if(kuznia != -1) build(".b_smith", this);
				else if(palac != -1) build(".b_snob", this);
				else if(spichlerz != -1) build(".b_storage", this);
				else if(zagroda != -1) build(".b_farm", this);
				else if(rynek != -1 && rynek < 20) build(".b_market", this);
				/*unsafeWindow.console.log("[" + this.id + "] - ratusz: " + ratusz + ", koszary: " + koszary + ", stajnia: " + stajnia + ", warsztat: " + warsztat
				+ ", palac: " + palac + ", kuznia: " + kuznia + ", plac: " + plac + ", piedestal: " + piedestal + ", rynek: " + rynek + ", tartak: " + tartak
				+ ", cegielnia: " + cegielnia + ", huta: " + huta + ", zagroda: " + zagroda + ", spichlerz: " + spichlerz + ", schowek: " + schowek + ", mur: "
				+ mur);*/
			});
		}
		function autobuild2() {
			$("#buildings_table > tbody > tr").each(function(){
				var ratusz = 	available(".b_main", this);
				var koszary = 	available(".b_barracks", this);
				var stajnia = 	available(".b_stable", this);
				var warsztat = 	available(".b_garage", this);
				var palac = 	available(".b_snob", this);
				var kuznia = 	available(".b_smith", this);
				var plac = 		available(".b_place", this);
				var piedestal = available(".b_statue", this);
				var rynek = 	available(".b_market", this);
				var tartak = 	available(".b_wood", this);
				var cegielnia = available(".b_stone", this);
				var huta = 		available(".b_iron", this);
				var zagroda = 	available(".b_farm", this);
				var spichlerz = available(".b_storage", this);
				var schowek = 	available(".b_hide", this);
				var mur = 		available(".b_wall", this);

				$(this).children().last().find("ul").children().each(function(){
				var link = $(".queue_icon > img", this).attr("src");
				var a = link.indexOf("/buildings/")+11;
				var b = link.indexOf(".png", a);
				var what = link.substring(a, b);
				
				if(what == "main" 			&& ratusz 	!= -1) 	ratusz++;
				else if(what == "barracks" 	&& koszary 	!= -1) 	koszary++;
				else if(what == "stable" 	&& stajnia 	!= -1) 	stajnia++;
				else if(what == "garage" 	&& warsztat != -1) warsztat++;
				else if(what == "snob" 		&& palac 	!= -1) 	palac++;
				else if(what == "smith" 	&& kuznia 	!= -1) 	kuznia++;
				else if(what == "place" 	&& plac 	!= -1) 	plac++;
				else if(what == "statue" 	&& piedestal!= -1) piedestal++;
				else if(what == "market" 	&& rynek 	!= -1) 	rynek++;
				else if(what == "wood" 		&& tartak 	!= -1) 	tartak++;
				else if(what == "stone" 	&& cegielnia!= -1) cegielnia++;
				else if(what == "iron" 		&& huta 	!= -1) 	huta++;
				else if(what == "farm" 		&& zagroda 	!= -1) 	zagroda++;
				else if(what == "storage" 	&& spichlerz!= -1) spichlerz++;
				else if(what == "hide" 		&& schowek 	!= -1) 	schowek++;
				else if(what == "wall" 		&& mur 		!= -1) 	mur++;
				});
				
				if(plac == 0) build(".b_place", this);
				else if(ratusz != -1 && ratusz < 20) build(".b_main", this);
				else if(spichlerz != -1 && spichlerz < 20) build(".b_storage", this);
				else if(tartak != -1)
				{
					if(cegielnia != -1 && huta != -1)
					{
						if(cegielnia < tartak && (cegielnia < huta || cegielnia == huta)) build(".b_stone", this);
						else if(huta < tartak && (huta < cegielnia || huta == cegielnia)) build(".b_iron", this);
						else build(".b_wood", this);
					}
					else if(cegielnia != -1 && cegielnia < tartak) build(".b_stone", this);
					else if(huta != -1 && huta < tartak) build(".b_iron", this);
					else build(".b_wood", this);
				}
				else if(cegielnia != -1)
				{
					if(huta != -1 && huta < cegielnia) build(".b_iron", this);
					else build(".b_stone", this);
				}
				else if(huta != -1) build(".b_iron", this);
				else if(koszary != -1)
				{
					if(stajnia != -1 && stajnia < koszary) build(".b_stable", this);
					else build(".b_barracks", this);
				}
				else if(spichlerz != -1) build(".b_storage", this);
				else if(stajnia != -1) build(".b_stable", this);
				else if(warsztat != -1 && warsztat < 10) build(".b_garage", this);
				else if(kuznia != -1) build(".b_smith", this);
				else if(palac != -1) build(".b_snob", this);
				else if(zagroda != -1) build(".b_farm", this);
				else if(rynek != -1 && rynek < 20) build(".b_market", this);
				//else if(mur != -1) build(".b_wall", this);
			});
		}
		$("#paged_view_content").prev().prev().prev().after('<input type="button" value="Buduj" id="autobuild_btn" style="float:right"><input type="button" value="Buduj (bez muru)" id="autobuild2_btn" style="float:right">');
		$('#autobuild_btn').click(autobuild);
		$('#autobuild2_btn').click(autobuild2);
	  }
	  else if(window.location.href.indexOf("screen=overview") != -1)
	  {
		var table = $("#show_units>.widget_content>.vis").get(0);
		var rows = table.getElementsByTagName('tr');
		var spaceSum = 0;
		for (var j = 0; j < rows.length; j++) {
			var tokens = rows[j].textContent.replace(/^\s\s*/, '').split(" ",2);unsafeWindow.console.log(tokens);
			if (tokens[1].indexOf("Pikinierów")>-1 || tokens[1].indexOf("Mieczników")>-1 || tokens[1].indexOf("Łucznicy")>-1 || tokens[1].indexOf("Łuczników")>-1) {
				spaceSum += parseInt(tokens[0]);
			} else if (tokens[1] == "Ciężkich") {
				spaceSum += parseInt(tokens[0]) * 6;
			}
		}
		var squads = round((spaceSum / 20000), 1);
		$("#show_units>.head").get(0).innerHTML += " (" + squads + " zagród)";
	  }
  });
}

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


GM_wait();

function round (value, precision, mode) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // +    revised by: Onno Marsman
  // +      input by: Greenseed
  // +    revised by: T.Wild
  // +      input by: meo
  // +      input by: William
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Josep Sanz (http://www.ws3.es/)
  // +    revised by: Rafał Kukawski (http://blog.kukawski.pl/)
  // %        note 1: Great work. Ideas for improvement:
  // %        note 1:  - code more compliant with developer guidelines
  // %        note 1:  - for implementing PHP constant arguments look at
  // %        note 1:  the pathinfo() function, it offers the greatest
  // %        note 1:  flexibility & compatibility possible
  // *     example 1: round(1241757, -3);
  // *     returns 1: 1242000
  // *     example 2: round(3.6);
  // *     returns 2: 4
  // *     example 3: round(2.835, 2);
  // *     returns 3: 2.84
  // *     example 4: round(1.1749999999999, 2);
  // *     returns 4: 1.17
  // *     example 5: round(58551.799999999996, 2);
  // *     returns 5: 58551.8
  var m, f, isHalf, sgn; // helper variables
  precision |= 0; // making sure precision is integer
  m = Math.pow(10, precision);
  value *= m;
  sgn = (value > 0) | -(value < 0); // sign of the number
  isHalf = value % 1 === 0.5 * sgn;
  f = Math.floor(value);

  if (isHalf) {
    switch (mode) {
    case 'PHP_ROUND_HALF_DOWN':
      value = f + (sgn < 0); // rounds .5 toward zero
      break;
    case 'PHP_ROUND_HALF_EVEN':
      value = f + (f % 2 * sgn); // rouds .5 towards the next even integer
      break;
    case 'PHP_ROUND_HALF_ODD':
      value = f + !(f % 2); // rounds .5 towards the next odd integer
      break;
    default:
      value = f + (sgn > 0); // rounds .5 away from zero
    }
  }

  return (isHalf ? value : Math.round(value)) / m;
}