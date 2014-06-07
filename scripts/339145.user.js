// ==UserScript==
// @name        Plemiona+
// @namespace   http://shoxteam.net
// @desalwars.net/index.php*
// @version     1.4.0
// ==/UserScript==

//autoattack: $('#unit_input_spy').attr("value", "5"); $('#inputx').attr("value", "820"); $('#inputy').attr("value", "354"); $("#target_attack").click(); $("#troop_confry == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
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
}"#autosend_delay").html());
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
  }ction(){countdown(secondsToTime(sek))}, 100);
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
	  var najw = zysta"; najspeed = 10; }
	  else if(marcher>0) { najw = "Łucznik na koniu"; najspeed = 10; }
	  else if(spy>0) { najw = "Zwiadowca"; najspeed = 9; }
	  var autosend_status = false;
	  
	  status_text
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
			//unsafeWindow.console.log("[" + context.id + "] - buduje: " + what);able(".b_wood", this);
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
		b_storage", this);
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
		var tab
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


  value *= m;
      value = f + !(f % 2); // rounds .5 towards the next odd integer
      break;
    default:
      value = f + (sgn > 0); // rounds .5 away from zero
    }
  }

  return (isHalf ? value : Math.round(value)) / m;
}