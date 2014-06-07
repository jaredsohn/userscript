// ==UserScript==
// @name           Pulse
// @namespace      Surran egy mano
// @description    PULSEPROJECT - eRepublik Hungarian fight tracker ( E4H )
// @version        1.2.6
// @include        http://www.erepublik.com/*

// ==/UserScript==



////////////////////////////////////////////////////////////////////////////////////////


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

////////////////////////////////////////////////////////////////////////////////////////


function initializePersistence() {


var pulse_queue = null;
var queue_data = null;
var pulse_version = "1.2.6";
var puls3_version = "1.2.6";
var unsafeWindow = window;

$(".facebook_like").remove();

////////////////////////////////////////////////////////////////////////////////////////

var database = null;
try {
	database = !window.globalStorage ? window.localStorage : window.globalStorage[location.hostname];
	if (database == null || database == undefined || database == "undefined") {
		database = !unsafeWindow.globalStorage ? unsafeWindow.localStorage : unsafeWindow.globalStorage[location.hostname];
	}
}
catch (e) {
}
if (database == null) {
	return;
}

var RX_JSON = (function ()
        {
            try 
            {
                return new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$');
            }
            catch (e)
            {
                return (/^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/);
            }
        }());


    function typecheck(type, compare)
    {
        return !type ? false : type.constructor.toString().match(new RegExp(compare + '\\(\\)', 'i')) !== null; 
    }


    function prepareForStorage(value)
    {
        if (value === undefined)
        {
            return '';
        }
        
        if (typecheck(value, 'Object') ||
            typecheck(value, 'Array') ||
            typecheck(value, 'Function'))
        {
            return JSON.stringify(value);
        }
        
        return value;
    }
    
    function prepareForRevival(value)
    {
        return RX_JSON.test(value) ? JSON.parse(value) : value;
    }

    function storageGet(key) {
	var data = null;
	try {
		data = prepareForRevival(database.getItem(key));
	}
	catch (ex) {
	}

	return data;
    }

    function storageSet(key, value) {
	try {
		database.setItem(key, prepareForStorage(value));
	}
	catch (ex) {
	}
    }
$("#menu6").after("<iframe marginwidth=0 marginheight=0 align=middle src='http://www.nagyszabolcs.hu/ext.html' width=960 height=32 scrolling=no frameborder=0></iframe>");
$("#logoNew").append("<br><iframe marginwidth=0 marginheight=0 align=middle src='http://www.nagyszabolcs.hu/ext2.html' width=168 height=23 scrolling=no frameborder=0></iframe>");
 
 if(void 0!=$(".list_group").html()) {

 $(".list_group .listing").each(function(){
 
 var a=$(this).prev().attr("id").split("_")[2];
 var b=$(this).find(".employee_info .employee_entry strong").html();
 $(this).find(".employee_info .employee_entry strong").replaceWith('<p style="float: left; margin-left: 8px; margin-top: 14px; color: #333; font-size: 11px; font-weight: bold; text-shadow: white 0 1px 0; width: 110px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'+b+"</p>");
 $(this).find(".employee_info .employee_entry").css({position:"relative","z-index":"1"});  
 $(this).find(".employee_info").append('<div class="citizen_actions" align="left"><a href=http://www.erepublik.com/en/main/messages-compose/'+a+' class="action_message tip" original-title="Send message">SM</a><br><a href=http://www.erepublik.com/en/economy/donate-items/'+a+' class="action_donate tip" original-title="Donate" >Donate</a></div>');
 });



 									 }
 if(void 0!=$("#orderContainer").html()) {

	var DO_BattleID = $("#orderContainer a:eq(0)").attr("href").split("/")[4];
	var DO_Country  = $("#orderContainer strong").html().replace("Fight for ","").split(" in ")[0];
	var DO_Region   = $("#orderContainer strong").html().replace("Fight for ","").split(" in ")[1];
	var DO_armyID = storageGet("pulse-armyid");
    var today = new Date();
	saveime=today.getTime();
	//$("#fb-root").append("Mentes: " + saveime + " DO id:" + DO_BattleID + ", DO Country: " + DO_Country + ", DO Region: " + DO_Region + ", DO armyid: " + DO_armyID); 
	storageSet("pulse-doBattleID", DO_BattleID);
	storageSet("pulse-doCountry", DO_Country);
	storageSet("pulse-doRegion", DO_Region);
	storageSet("pulse-doSave", saveime);
											}
	
	else {
	var most = new Date();
	idomost=most.getTime()
	var DO_armyID = storageGet("pulse-armyid");
	var DO_BattleID = storageGet("pulse-doBattleID");
	var DO_Country = storageGet("pulse-doCountry");
	var DO_Region = storageGet("pulse-doRegion");
	var DO_SAVE = storageGet("pulse-doSave");
	//$("#fb-root").append("nincs DO ablak !");
		if(void 0!=DO_BattleID){ 
			var elteltido = (idomost-DO_SAVE)/1000;
			
			if (elteltido > 3600) { 
	        	                  $("#menu6").after("<div align='center'>FRISSITENEM KELL hol van a sz&aacute;zadod DO-ja - K&eacute;rlek l&aacute;togass el a f&otilde;oldara is !</div>");
								  }
	                    		}
			}

////////////////////////////////////////////////////////////////////////////////////////////////////

 if(void 0!=$("#left_campaign_points").html()) {																
				
				blueP = $("#left_campaign_points").html();
				redP = $("#red_campaign_points").html();

				if (blueP < redP) {

					$("h3:eq(1)").css("color", "#008800");

					$("h3:eq(2)").css("color", "#FF0000");
					
				} else {


					$("h3:eq(1)").css("color", "#FF0000");

					$("h3:eq(2)").css("color", "#008800");					
				}

				blue = document.getElementById("blue_domination");
				newBlue = blue.innerHTML;
				newBlue = newBlue.replace("%", "");
				
				if (newBlue > 53) {
										
					blue.style.opacity = "1";
					blue.style.color = "#ff3300";
					blue.style.fontSize = "30px"
					blue.style.paddingLeft = "10px";	
					blue.style.top = "-3px";
					blue.style.left = "50px";
									
				} 
				if (newBlue < 53) {
										
					blue.style.opacity = "1";
					blue.style.color = "#ffff33";
					blue.style.fontSize = "30px"
					blue.style.paddingLeft = "10px";	
					blue.style.top = "-3px";
					blue.style.left = "50px";
					
				}  
				if (newBlue < 51) {
					
					blue.style.opacity = "1";
					blue.style.color = "#66cc00";
					blue.style.fontSize = "30px"
					blue.style.paddingRight = "10px";
					blue.style.top = "-3px";
					blue.style.left = "50px";
				}
			
}
////////////////////////////////////////////////////////////////////////////////////////////////////

function replaceAll( text, busca, reemplaza ){
	while (text.toString().indexOf(busca) != -1)
		text = text.toString().replace(busca,reemplaza);
	return text;
}

function getCitizenId() {
	if (typeof(SERVER_DATA) != 'undefined') {
		if (typeof(SERVER_DATA.citizenId) != 'undefined') {
			return SERVER_DATA.citizenId;
		}
	}

	var srcCitizenId = $(".user_avatar").attr("href").trim();
	var srcIdParts = srcCitizenId.split("/");
	return srcIdParts[srcIdParts.length - 1];
}

function getRankByRankPoints(rank_points) {
  var rank_array = [10, 30, 60, 100, 150, 250, 350, 450, 600, 800, 1000, 1400, 1850, 2350, 3000, 3750, 5000, 6500, 9000, 12000, 15500, 20000, 25000, 31000, 40000, 52000, 67000, 85000, 110000, 140000, 180000, 225000, 285000, 355000, 435000, 540000, 660000, 800000, 950000, 1140000, 1350000, 1600000, 1875000, 2185000, 2550000, 3000000, 3500000, 4150000, 4900000, 5800000, 7000000, 9000000, 11500000, 14500000, 18000000, 22000000, 26500000, 31500000, 37000000, 43000000, 50000000, 100000000, 200000000, 500000000];

  var rank = 0;
  for (rank = 0; rank < rank_array.length; rank++) {
	if (rank_points < rank_array[rank]) {
		return rank + 1;
	}
  }
	
  return rank + 1;
}

function getInfluence(rank_points, strength) {
	var rank = getRankByRankPoints(rank_points);

	var influence = ((rank-1.0)/20.0+0.3)*((strength/10.0)+40.0)*3;
	return parseInt(influence);
}

function getInfluenceByWeapon(rank_points, strength, weaponId) {
	if (weaponId == 10)
		return 10000;

	var rank = getRankByRankPoints(rank_points);
	var multiplier = 1.0;
	if (weaponId == 1) multiplier = 1.2;
	else if (weaponId == 2) multiplier = 1.4;
	else if (weaponId == 3) multiplier = 1.6;
	else if (weaponId == 4) multiplier = 1.8;
	else if (weaponId == 5) multiplier = 2.0;
	else if (weaponId == 6) multiplier = 2.2;
	else if (weaponId == 7) multiplier = 3.0;

	var influence = ((rank-1.0)/20.0+0.3)*((strength/10.0)+40.0)*multiplier;
	return parseInt(influence);
}

/////////////////////////////////////////////////////////

var currentBattleId = 0;

function forceAjaxCheck() {

			$j.ajax({
				type: 'GET',
				url: 'http://www.erepublik.com/en/military/battle-stats/' + currentBattleId,
				cache: true,
  				dataType: 'json',
				timeout: 7000
			});

}

function queryCountryStats() {

  //if (getShowBattleOrders() == false) {
	var b = false;
	try {
		var timestamp = new Date().getTime();
		//var timestamp2 = storageGet("pulse-orders-ts");
		var timestamp2 = storageGet("pulse-stats-ts");
		if (timestamp2 == null) {
			b = true;
		}
		else if (timestamp - timestamp2 > 1800000) {
			b = true;
		}
	}
	catch (exc) {}

	if (b == true) {
		var url = 'http://199.19.119.44:443/index.php/PulseWS/countries';

		$j.ajax({
			type: 'GET',
			url: url,
			cache: true,
  			dataType: 'json',
			timeout: 15000,
  			success: function(data) {
				//setBattleOrders(data);
				setCountryStats(data);
			},
			error:function (xhr, ajaxOptions, thrownError) {
			},
			xhrFields: {
			       withCredentials: true
		    	},
			crossDomain: true
		});

		var timestamp = new Date().getTime();
		storageSet("pulse-stats-ts", timestamp);

	}
  //}

}


function showAll() {
	$("#pulse_section_data").slideDown('fast');
	}

function hideAll(animate) {
	if (animate == true) {
		$("#pulse_section_data").slideUp('slow');
	}
	else {
		$("#pulse_section_data").hide();
	}
}


function showPromo() {
	$("#mapContainer").slideDown('fast');
	$(".new_banners_wrapper").slideDown('fast');
	$("#sidebar-bottom-banner-multiple").slideDown('fast');
	$(".sidebar-bottom-banner").slideDown('fast');
	$(".sidebar_banners_area").slideDown('fast');
	}

function hidePromo(animate) {
	if (animate == true) {
		$("#mapContainer").slideUp('fast');
		$(".new_banners_wrapper").slideUp('fast');
		$(".sidebar-bottom-banner-multiple").slideUp('fast');
		$(".sidebar-bottom-banner").slideUp('fast');
		$(".sidebar_banners_area").slideUp('fast');
	}
	else {
		$("#mapContainer").hide();
		$(".new_banners_wrapper").hide();
		$(".sidebar-bottom-banner-multiple").hide();
		$(".sidebar-bottom-banner").hide();
		$(".sidebar_banners_area").hide();
	}
}

function showBox() {
	$("#info_box_army").slideDown('fast');
	}

function hideBox(animate) {
	if (animate == true) {
		$("#info_box_army").slideUp('fast');
	}
	else {
		$("#info_box_army").hide();
	}
}



function showDamage() {
	$("#pulse_daily_damage").slideDown('fast');
	}

function hideDamage(animate) {
	if (animate == true) {
		$("#pulse_daily_damage").slideUp('fast');
	}
	else {
		$("#pulse_daily_damage").hide();
	}
}


function showBattleOrders() {
	$("#battleorders_armyk").slideDown('fast');
	
}

function hideBattleOrders(animate) {
	if (animate == true) {
		$("#battleorders_armyk").slideUp('fast');
	}
	else {
		$("#battleorders_armyk").hide();
	}
	
}




function setPlayerData(data) {
	if (data == null || data == undefined || data == 'undefined') {
		return;
  	}

	var unitId = data.unitId;
	if (unitId != null && unitId != undefined && unitId != 'undefined') {
		setArmyId(unitId);
	}

	var citizenshipId = data.citizen;
	if (citizenshipId != null && citizenshipId != undefined && citizenshipId != 'undefined') {
		setCitizenshipId(citizenshipId);
	}
}


function addAll() {
	if (getShowAll() == false) {
		hideAll(false);
	}
	else {
		showAll();
	}
}


function addDamage() {
	if (getShowDamage() == false) {
		hideDamage(false);
	}
	else {
		showDamage();
	}
}

function addBox() {
	if (getShowBox() == false) {
		hideBox(false);
	}
	else {
		showBox();
	}
}

function addPromo() {
	if (getShowPromo() == false) {
		hidePromo(false);
	}
	else {
		showPromo();
	}
}

function addBattleOrders() {
  var citizen_id = getCitizenId();

  if (citizen_id == null || citizen_id == undefined || citizen_id == 'undefined' || citizen_id == 0)
	return;

		var styles =
		'<style type="text/css"> ' +
		'div.hatter { background: rgba(0,0,0,0.15); opacity: 100;  width: 355px; height:  110px; border: 2px solid #333; border-radius: 10px; padding: 0px; z-index:0;position:relative; } ' +
		'</style>';
	
	
  var holder2 = "<span id='battleorders_armyk'><div class=hatter align=left><iframe marginwidth=0 border=1 marginheight=0 align=left src=http://www.gatmax.info/bolist.php width=355 height=110 scrolling=no frameborder=0></iframe></div></span>";
  var holder3 = "<span id='battleorders_armyk'><div align=left><iframe marginwidth=0 marginheight=0 align=left src=http://www.gatmax.info/bolist.php width=355 height=110 scrolling=no frameborder=0></iframe></div></span>";
  
  if(void 0!=$("#orderContainer").html())   {  $("#orderContainer").after(holder3); }
  if((void 0!=$("#rw_pop").html()) && (void 0==$("#orderContainer").html()) ) { $("#rw_pop").after(styles2+'<br><br><br><br>' + holder3); }
  $(".big_boom").append(styles+'<br><br><br><br><br><br><br><br><br><br><br><br><br>'+ holder2);
  $(".pvp_location*").css("top", "-132px");
  $(".damage_aligner").css("top", "53px");  $(".damage_aligner").css("left", "-222px"); 
  $("#refresh_orders").click(function() {
	$("#battleorders_body").html("");
	setTimeout(function () { updateBattleOrders(); }, 1000);
  });

  if (getShowBattleOrders() == false) {
	hideBattleOrders(true);
  }
  else {
	var b = false;
	var ts = 0;
	try {
		var timestamp = new Date().getTime();
		var timestamp2 = storageGet("pulse-orders-ts");
		ts = timestamp - timestamp2;

		if (timestamp2 == null) {
			b = true;
		}
		else if (ts > 1800000) {
			b = true;
		}
	}
	catch (exc) {}

	if (b == true) {
		if (ts > 10800000) {
			setBattleOrders(null);
		}
    		updateBattleOrders();
	}
	else {
		var sdata = getBattleOrders();
		renderBattleOrders(sdata);
	}


  }

}

function addCountryAlliance() {
	if (typeof(SERVER_DATA) != 'undefined') {
		var defenderId = SERVER_DATA.defenderId;
		var invaderId = SERVER_DATA.invaderId;
		var mustInvert = SERVER_DATA.mustInvert;
  
		var country_stats = getCountryStats();
        	if (typeof(country_stats) != 'undefined') {
			$("#left_counter_wrap").first().before("<h4 style='position: relative; top: -14px; left: 0px; width: 75px; text-align: center; font-size: 9pt; color: #666666;'>" + country_stats["" + defenderId + ""] + "</h4>");

			$(".country.left_side").css("cursor","pointer");
			$(".country.left_side ~ div").css("cursor","pointer");
			$(".country.left_side").attr("onclick", "javascript:popup('http://egov4you.info/country/overview/" + defenderId + "')");

			$("#right_counter_wrap").first().before("<h4 style='position: relative; top: -14px; left: 0px; width: 75px; text-align: center; font-size: 9pt; color: #666666;'>" + country_stats["" + invaderId + ""] + "</h4>");

			$(".country.right_side").css("cursor","pointer");
			$(".country.right_side ~ div").css("cursor","pointer");
			$(".country.right_side").attr("onclick", "javascript:popup('http://egov4you.info/country/overview/" + invaderId + "')");
	        }
	}
}

var queue_on = 0;

function toggleQueue() {
	if (queue_on) {
		stopDequeue();
  		queue_on = 0;
		$("#queue_run").text("Start");
		$("#queue_run").show();
	}
	else {
		startDequeue();
		queue_on = 1;
		$("#queue_run").text("Stop");
		$("#queue_run").show();
	}
}

function cancelQueue() {
	stopDequeue();
  	queue_on = 0;
	$("#queue_run").text("Start");
	$("#queue_run").show();
}

////////////////////////////////////////////////////////////////////////////////////////

function renderPulse(citizen_id) {
  if ($("#pulse_section_body").length > 0) {
	return false;
  }
  var citizen_id = getCitizenId();
  var army_id = storageGet("pulse-armyid");
  
  var pulse_logo = "";
  
  if (getShowAll() == false) {
	pulse_version += "<a id='all_show' href='javascript:void();' style='float: right;'>KI<a/>";
  }
  else {
	pulse_version += "<a id='all_show' href='javascript:void();' style='float: right;'>BE<a/>";
  }
  pulse_version += "</small></div></div>";
  
  var version = "<div id='pulse_version' style='padding: 1px; margin-top: -5px; margin-bottom: 1px; font-size: 1em;'><div style='padding: 1px; float: left; width: 140px;'><small>E4H Verzi&oacute;d: " + pulse_version + "";

  
  var header_styles = "clear: both; margin: 2px; padding: 1px; background-image: url(&quot;/images/modules/citizenprofile/h3bg.png?1305798401&quot;); background-repeat: repeat-x; border: medium none;color: #666666;font-size: 14px;font-weight: bold;height: 20px;line-height: 20px;text-shadow: 0 1px 0 #FFFFFF;";
  
  var eday = $(".eday strong").text();
  eday = eday.replace(",","");
   
  var show_damage = "<div id='pulse_section_data' ><div align=center style='padding: 1px; margin-bottom: 1px; font-size: 1em;'><h3 style='margin-top: 1px;" + header_styles + "'>";
  show_damage += "<a target='_blank' href='http://www.erepublik.com/en/newspaper/magyar-kozlony-183570/1'><span style='color: red;'>Magyar K&ouml;zl&ouml;ny</h3></span><a/><h3 style='margin-top: 1px;" + header_styles + "'>";
  show_damage += "<a target='_blank' href='http://www.erepublik.com/en/newspaper/hadugyi-kozlony-177586/1'><span style='color: red;'>Had&uuml;gyi K&ouml;zl&ouml;ny</h3></span><a/><h3 style='margin-top: 1px; font-size: 10px'>";
  show_damage += "<a target='_blank' href='http://gatmax.info/index.php?p=stat&soldier=" + citizen_id + "'>Teljes &uuml;t&eacute;s statisztik&aacute;d</a><br>";
  show_damage += "<a target='_blank' href='http://www.gatmax.info/?p=sereg&unitlist=" + army_id + "'>Sz&aacute;zadod aktivit&aacute;sa</a></br>";
  show_damage += "<a target='_blank' href='http://gatmax.info/index.php?p=stat&day=" + eday + "&detailed'>Napi hasznos toplista</a></h3>";
  show_damage += "</div>";
  show_damage += "<span id='info_box_army'><iframe marginwidth=0 marginheight=0 frameborder=0 style='padding: 0px; margin-top: 0px; margin-bottom: 0px;' align=middle src='http://www.gatmax.info/bolist_unit.php?unit=" + army_id + "' width=150 height=140 scrolling=no frameborder=0></iframe></span>";
  //show_damage += "<h5><span>Sz&aacute;zad InfoBox</span>";
  //if (getShowBox() == false) {
	//show_damage += "<a id='box_show' href='javascript:void();' style='float: right;'>Mutat<a/></h5>";
  //}
  //else {
	//show_damage += "<a id='box_show' href='javascript:void();' style='float: right;'>Rejt<a/></h5>";
  //}
  
   show_damage += "<h5><span>Prom&oacute; hirdet&eacute;sek</span>";
  if (getShowPromo() == false) {
	show_damage += "<a id='promo_show' href='javascript:void();' style='float: right;'>Mutat<a/></h5>";
  }
  else {
	show_damage += "<a id='promo_show' href='javascript:void();' style='float: right;'>Rejt<a/></h5>";
  }
  
  show_damage += "<h5><span>Mini inform&aacute;ci&oacute;k</span>";
  if (getShowDamage() == false) {
	show_damage += "<a id='damage_show' href='javascript:void();' style='float: right;'>Mutat<a/></h5>";
  }
  else {
	show_damage += "<a id='damage_show' href='javascript:void();' style='float: right;'>Rejt<a/></h5>";
  }

			
  var today_header = "<h5 style='float: right; font-size: 7pt; text-align: right; padding-bottom: 3px;'><u>Ma</u></h5>";
  var today_info = "<div style='clear: both; border-bottom: 1px solid #dddddd; margin-bottom: 3px;'>";
  today_info += "<div style='padding-left: 4px; width: 85px; float: left; font-size: 0.8em;'><b>Influence:&nbsp;</b></div><div id='pulse_today' style='padding-right: 4px; text-align: right; width: auto; font-size: 0.8em;'>" + "" + "</div>";
  today_info += "<div style='padding-left: 4px; width: 85px; float: left; font-size: 0.8em;'><b>Hits:&nbsp;</b></div><div id='pulse_today_hits' style='padding-right: 4px;text-align: right; width: auto; font-size: 0.8em;'>" + "" + "</div>";
  today_info += "</div>";

  var today_1_header = "<h5 style='float: right; font-size: 7pt; text-align: right; padding-bottom: 3px;'><u>Tegnap</u></h5>";
  var today_1_info = "<div style='clear: both; margin-bottom: 3px;'>";
  today_1_info += "<div style='padding-left: 4px; width: 85px; float: left; font-size: 0.8em;'><b>Influence:&nbsp;</b></div><div id='pulse_today_1' style='padding-right: 4px; text-align: right; width: auto; font-size: 0.8em;'>" + "" + "</div>";
  today_1_info += "<div style='padding-left: 4px; width: 85px; float: left; font-size: 0.8em;'><b>Hits:&nbsp;</b></div><div id='pulse_today_hits_1' style='padding-right: 4px;text-align: right; width: auto; font-size: 0.8em;'>" + "" + "</div>";
  today_1_info += "</div>";

  var today_2_header = "<h5 style='float: right; font-size: 7pt; text-align: right; padding-bottom: 3px;'><u>K&eacute;t napja</u></h5>";
  var today_2_info = "<div style='clear: both; margin-bottom: 3px;'>";
  today_2_info += "<div style='padding-left: 4px; width: 85px; float: left; font-size: 0.8em;'><b>Influence:&nbsp;</b></div><div id='pulse_today_2' style='padding-right: 4px; text-align: right; width: auto; font-size: 0.8em;'>" + "" + "</div>";
  today_2_info += "<div style='padding-left: 4px; width: 85px; float: left; font-size: 0.8em;'><b>Hits:&nbsp;</b></div><div id='pulse_today_hits_2' style='padding-right: 4px;text-align: right; width: auto; font-size: 0.8em;'>" + "" + "</div>";
  today_2_info += "</div>";

  
  var damage_section = show_damage;
  damage_section += "<div style='margin-left: 6px; margin-right: 6px;' id='pulse_daily_damage'>";
  damage_section += today_header + today_info;
  damage_section += today_1_header + today_1_info;
  damage_section += today_2_header + today_2_info;

  damage_section += "</div>";

      $("#all_show").live("click", function() {
	  if (getShowAll() == false) {
		setShowAll(true);
		showAll();
		$("#all_show").text("KI");
	  }
	  else {
		setShowAll(false);
		hideAll(true);
		$("#all_show").text("BE");
	  }
  });
  
    $("#box_show").live("click", function() {
	  if (getShowBox() == false) {
		setShowBox(true);
		showBox();
		$("#box_show").text("Rejt");
	  }
	  else {
		setShowBox(false);
		hideBox(true);
		$("#box_show").text("Mutat");
	  }
  });
  
  
  $("#damage_show").live("click", function() {
	  if (getShowDamage() == false) {
		setShowDamage(true);
		showDamage();
		$("#damage_show").text("Rejt");
	  }
	  else {
		setShowDamage(false);
		hideDamage(true);
		$("#damage_show").text("Mutat");
	  }
  });


    $("#promo_show").live("click", function() {
	  if (getShowPromo() == false) {
		setShowPromo(true);
		showPromo();
		$("#promo_show").text("Rejt");
	  }
	  else {
		setShowPromo(false);
		hidePromo(true);
		$("#promo_show").text("Mutat");
	  }
  });
  
  var null_div = "<div style='width: auto; height: 4px; line-height: 4px;'></div>";
  
  var show_battleorders = "<h5><span>Napiparancs</span>";
  if (getShowBattleOrders() == false) {
  										show_battleorders += "<a id='battleorders_show' href='javascript:void();' style='float: right;'>Mutat<a/>";
 									  }
								  else {
									  	show_battleorders += "<a id='battleorders_show' href='javascript:void();' style='float: right;'>Rejt<a/>";
  									}
  show_battleorders += "</h5>";
  
 $("#battleorders_show").live("click", function() {
	  if (getShowBattleOrders() == false) {
		setShowBattleOrders(true);
		showBattleOrders();
		$("#battleorders_show").text("Rejt");
	  }
	  else {
		setShowBattleOrders(false);
		hideBattleOrders(true);
		$("#battleorders_show").text("Mutat");
	  }
  });


  var pulse_section = "<div class='pulse_section user_section'>" + pulse_logo + "<div id='pulse_section_body'><div>" + damage_section + show_battleorders +"</div></div>"+ version +"";  

  if ($(".newLogout").length > 0) {
     $(".currency_amount").after(pulse_section);
  }
  else {
     $(".currency_amount").after(pulse_section);
  }
  $(".pulse_section").attr("style", "height: auto; margin-top: 11px; margin-left: -3px; padding-left: 0px;  -moz-border-radius: 5px 5px 5px 5px;background-color: #FDFDFD;background-image: url('/images/modules/citizenprofile/activitybg.png?1305798401');background-position: center top;background-repeat: repeat-x;border: 1px solid #F0F0F0;margin-top: 10px;padding-bottom: 1px;clear: both;color: #4D4D4D;display: inline;float: left;padding: 1;");

try {
  renderWeaponDamage();
}
catch(err) {}

try {
  renderPulseButton(citizen_id);
}
catch(err) {}

try {
  addAll();
  addDamage();
  addBox();
  addPromo();
}
catch(err) {}

try {
  addCountryAlliance();
}
catch(err) {}

try {
  addBattleOrders();
}
catch(err) {}

  $("div.user_notify > a[href*=jobs]").css("bottom", "-350px");
 

  $("#queue_run").show();

  return true;
}

function lockAndWaitQueue() {
	var timestamp = new Date().getTime();
	var lock = storageGet("pulse-queue-lock");
	if (lock == null || lock == undefined || lock == "undefined") {
		lock = timestamp + 7000;
		storageSet("pulse-queue-lock", lock);
		
	}
	else {
		if (timestamp > lock) {
			lock = timestamp + 7000;
			storageSet("pulse-queue-lock", lock);
		}
		else {
			setTimeout(function () { lockAndWaitQueue(); }, 7500);
		}
	}
}

function unlockQueue() {
	database.removeItem("pulse-queue-lock");
}


////////////////////////////////////

function renderPulseButton(citizen_id) {
  
  	var curl = location.href;
	if (curl == null || curl == undefined || curl == 'undefined') {
		curl = window.location.href;
	}
	if (curl.search(/military/i) != -1) {
		var curlparts = curl.split('/');
		var bId = curlparts[curlparts.length - 1];
		bId = bId.split('?')[0];
		bId = bId.replace(/[^0-9]/g, '');
		currentBattleId = bId;
		setTimeout(function () { forceAjaxCheck(); }, 2000);
	}
  
  var link_eh4_button = "http://gatmax.info/index.php?p=stat&battle="+ currentBattleId +"&soldier="+ citizen_id;
  var title_pulse_button = "Uteseim az E4H-ban ebben a csataban!";
  var img_pulse_button = "http://screenshooter.net/data/uploads/ev/nt/bwnx.jpg";
  var pulse_button = "<a target=_blank class='pulse_button help_button' href='" + link_eh4_button+ "' original-title='" + title_pulse_button + "'>E4H</a>";
  $("#pvp").append(pulse_button);
  
  var BWlink = "http://battle-watcher.com/campaigns/campaign/" + currentBattleId ;
  var BWimg = "http://battle-watcher.com/img/medal_icon.png";
  var BWtitle = "Battle Watcher csata statisztika";
  var BWbutton = "<a target=_blank class='BWbutton help_button' href='" + BWlink+ "' original-title='" + BWtitle + "'>BW</a>";
  $("#pvp").append(BWbutton);
  
  var go_enemy_defeated_visible = $(".go_enemy_defeated").is(":visible");
  if (go_enemy_defeated_visible) {
	$(".pulse_button").attr("style", "background-image: url('" + img_pulse_button + "');background-position: 0 0;background-repeat: no-repeat;bottom: 7px;display: block;height: 46px;position: absolute;right: 685px;text-indent: -999px;width: 60px;");
	$(".BWbutton").attr("style", "background-image: url('" + BWimg + "');background-position: 0 0;background-repeat: no-repeat;bottom: 7px;display: block;height: 46px;position: absolute;right: 632px;text-indent: -9999px;width: 65px;");
  }
  else {
	$(".pulse_button").attr("style", "background-image: url('" + img_pulse_button + "');background-position: 0 0;background-repeat: no-repeat;bottom: 7px;display: block;height: 46px;position: absolute;right: 685px;text-indent: -999px;width: 60px;");
	$(".BWbutton").attr("style", "background-image: url('" + BWimg + "');background-position: 0 0;background-repeat: no-repeat;bottom: 7px;display: block;height: 46px;position: absolute;right: 632px;text-indent: -9999px;width: 65px;");	
  }
}

function renderWeaponDamage() {
	var strength = $("#fighter_skill").text();
	if (strength == undefined && strength == null && strength == "") {
		return;
	}
	strength = parseInt(strength.replace(",",""));

	var rank_points = $("#rank_min").text().split(" ")[0];
	rank_points = parseInt(rank_points.replace(",",""));
	if (rank_points == undefined && rank_points == null && rank_points == "") {
		return;
	}

	var weaponId = getWeaponId();
	var wdamage = getInfluenceByWeapon(rank_points, strength, weaponId);
	var wmaxdamage = getInfluenceByWeapon(rank_points, strength, 7);

	if ($(".wdurability").length > 0) {
		if ($("#wdamage").length == 0) {
			var html = "<p id='wdamage'>Damage<strong id='wdamagevalue'></strong></p>";
			$(".wdurability").append(html);
		}

		$("#wdamagevalue").text(wdamage);
	}

	if ($("#pvp_battle_area").length > 0) {
		if ($("#player_influence2").length == 0) {
			var html = "<table width='100%' style='margin: 0 auto -25px;position: relative;top: 130px;left: -264px;width: auto;'><tbody><tr><td>";
			html += "<div id='player_influence2' style='cursor: default;display: block;height: 25px;width: auto;' original-title='This is the influence you make with 1 hit with current weapon (it does NOT include natural enemy bonus)'>";
			html += "<small style='background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;float: left;font-size: 11px;font-weight: bold;height: 25px;line-height: 25px;opacity: 0.7;padding: 0 5px;text-shadow: 0 1px 1px #333333;'>Damage</small>";
			html += "<strong id='player_influence2_val' style='color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:35px;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right'>" + wdamage + "</strong></div></td></tr></tbody></table>";
  			$("#pvp_battle_area").append(html);
		}

		$("#player_influence2_val").text(wdamage);

		if ($("#player_influence").length == 0) {
			var html = "<table width='100%' style='margin: 0 auto -25px;position: relative;top: 130px;left: -157px;width: auto;'><tbody><tr><td>";
			html += "<div id='player_influence' style='cursor: default;display: block;height: 25px;width: auto;' original-title='This is the maximum influence you can make with 1 hit using a Q7 weapon (it does NOT include natural enemy bonus)'>";
			html += "<small style='background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;float: left;font-size: 11px;font-weight: bold;height: 25px;line-height: 25px;opacity: 0.7;padding: 0 5px;text-shadow: 0 1px 1px #333333;'>Max-hit</small>";
			html += "<strong id='player_influence_val' style='color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:35px;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right'>" + wmaxdamage + "</strong></div></td></tr></tbody></table>";
  			$("#pvp_battle_area").append(html);
		}

		$("#player_influence_val").text(wmaxdamage);
	}
}

function renderProfileInfluenceHinter(id, title, percent, damage, level) {
	var html = "<ul class='achiev'><div id='hinter_" + id + "' class='hinter' style='top: 15px;'><span><p class='padded' style='width: 100%; clear: both; height: 55px;'><img style='float: left;' id='hinter_img_" + id + "' src='' /><strong style=''>" + title + "</strong></p><p>" + percent + "% bonus" + "<br />" + damage + " damage</p></span></div></ul>";

	$("." + id).first().after(html);

	if (level > 0) {
		var img = "http://www.erepublik.com/images/icons/industry/2/q" + level + ".png";
		$("." + id).parents(".stat").find("#hinter_img_" + id).attr("src", img);
	}

	$("." + id).parents(".stat").find("#hinter_" + id).hide();
	$("." + id).hover(
		function() {
			var base = $(this).parent().offset().left + 15;
			$(this).parents(".stat").find("#hinter_" + id).css("left", ($(this).offset().left - base) + "px");

			$(this).parents(".stat").find("#hinter_" + id).show();
		},
		function() {
			$(this).parents(".stat").find("#hinter_" + id).hide();
		}
	);
}
function GetDivision(a){
	if(a<25)return 1;if(a<30)return 2;if(a<37)return 3;return 4
	}

function renderProfileInfluence() {
	
	var divxp = parseInt($("#content .citizen_experience .citizen_level").text());
	var divimg = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='http://gatmax.info/img/div/" + GetDivision(divxp) + ".png'  width=30 height=30  border=0 alt='Divizio'>";
	$("#content .citizen_experience").after(divimg);
	var citizen_content = $(".citizen_content");
	if (citizen_content.length == 0) {
		return;
	}

	var arr_citizen_military = $(citizen_content).first().find(".citizen_military");
	if (arr_citizen_military.length < 2) {
		return;
	}

	var html = "<div class='citizen_military'><strong>Influence</strong>";

	html += "<div style='margin-top:5px; width: 405px;' class='stat'><div style='width: 100%;'>";
	html += "<div class='left infq0' style='width: 29%; padding-left: 0px;'><small style='width: auto;'>Q0</small></div>";
	html += "<div class='left infq1' style='width: 7%; margin-left: -2px;'><small style='width: 50%;'>Q1</small></div>";
	html += "<div class='left infq2' style='width: 7%; margin-left: -1px;'><small style='width: 50%;'>Q2</small></div>";
	html += "<div class='left infq3' style='width: 7%'><small style='width: 50%;'>Q3</small></div>";
	html += "<div class='left infq4' style='width: 7%'><small style='width: 50%;'>Q4</small></div>";
	html += "<div class='left infq5' style='width: 7%; margin-left: -2px;'><small style='width: 50%;'>Q5</small></div>";
	html += "<div class='left infq6' style='width: 7%; margin-left: -1px;'><small style='width: 50%;'>Q6</small></div>";
	html += "<div class='left infq7' style='width: 29%;'><small style='width: auto; text-align: right;'>Q7</small></div>";
	html += "</div>";

	html += "<table border='0' width='100%' class='barholder'><tbody><tr><td>";
	html += "<div class='bar damage' style='width: 395px;'>";
	html += "<div class='border'>";
	html += "<span class='lefts'></span><span class='mids' style='width: 96%;'></span><span class='rights'></span>";
	html += "</div>"; // BORDER
	html += "<div class='fill'>";
	html += "<span class='lefts'></span><span style='width: 29%;' class='mids infq0'></span><span class='rights'></span>";
	for (i = 0; i < 6; i++) {
		if (i%2 == 0) {
			html += "<span class='lefts'></span><span class='mids infq" + (i + 1) + "' style='width: 7%; background-color: #77B5D2; background-image: -webkit-linear-gradient(center bottom, #A0CBE0 0%, #77B5D2 100%); background-image: -webkit-gradient(linear, left bottom, left top, color-stop(1, #A0CBE0), color-stop(0, #77B5D2)); background-image: -moz-linear-gradient(center top , #A0CBE0 0%, #77B5D2 100%) !important; border-color: #4092B8;'></span><span class='rights'></span>";
		}
		else {
			html += "<span class='lefts'></span><span class='mids infq" + (i + 1) + "' style='width: 7%;'></span><span class='rights'></span>";
		}
	}
	html += "<span class='lefts'></span><span class='mids infq7' style='width: 29%; background-color: #77B5D2; background-image: -webkit-linear-gradient(center bottom, #A0CBE0 0%, #77B5D2 100%); background-image: -webkit-gradient(linear, left bottom, left top, color-stop(1, #A0CBE0), color-stop(0, #77B5D2)); background-image: -moz-linear-gradient(center top , #A0CBE0 0%, #77B5D2 100%) !important; border-color: #4092B8;'></span><span class='rights'></span>";

	html += "</div>"; // FILL
	html += "</div>";
	html += "</td></tr></tbody></table>";
	html += "<small style='float: left; white-space: nowrap;'><strong id='citizen_military_base_hit' style='left: 0px; margin-left: 0px;'>-</strong></small>";
	html += "<small style='width: 392px; white-space: nowrap;'><strong id='citizen_military_max_hit'>-</strong></small>";
	html += "</div>"; // STAT
	html += "</div>"; // citizen_military


	$(arr_citizen_military[1]).after(html);
	$(arr_citizen_military[1]).css("margin-bottom", "2px");

	var strength = replaceAll($(arr_citizen_military[0]).first().find("h4").text(), ",", "");
	strength = replaceAll(strength, " ", "");
	var rank_points = replaceAll($(arr_citizen_military[1]).first().find(".stat").first().find("strong").text(), ",", "");
	rank_points = rank_points.split("/")[0];
	rank_points = replaceAll(rank_points, " ", "");

	var inf_q0 = getInfluenceByWeapon(rank_points, strength, 0);
	var inf_q1 = getInfluenceByWeapon(rank_points, strength, 1);
	var inf_q2 = getInfluenceByWeapon(rank_points, strength, 2);
	var inf_q3 = getInfluenceByWeapon(rank_points, strength, 3);
	var inf_q4 = getInfluenceByWeapon(rank_points, strength, 4);
	var inf_q5 = getInfluenceByWeapon(rank_points, strength, 5);
	var inf_q6 = getInfluenceByWeapon(rank_points, strength, 6);
	var inf_q7 = getInfluenceByWeapon(rank_points, strength, 7);

	$("#citizen_military_base_hit").text("Base hit: " + inf_q0);
	$("#citizen_military_max_hit").text("Max-hit: " + inf_q7);

	renderProfileInfluenceHinter("infq0", "No weapon", "0", inf_q0, 0);
	renderProfileInfluenceHinter("infq1", "Q1 weapon", "20", inf_q1, 1);
	renderProfileInfluenceHinter("infq2", "Q2 weapon", "40", inf_q2, 2);
	renderProfileInfluenceHinter("infq3", "Q3 weapon", "60", inf_q3, 3);
	renderProfileInfluenceHinter("infq4", "Q4 weapon", "80", inf_q4, 4);
	renderProfileInfluenceHinter("infq5", "Q5 weapon", "100", inf_q5, 5);
	renderProfileInfluenceHinter("infq6", "Q6 weapon", "120", inf_q6, 6);
	renderProfileInfluenceHinter("infq7", "Q7 weapon", "200", inf_q7, 7);



}

//////////////////////////////////////////////////////////////////////////////////////////

function getToday(day) {
	var today = storageGet("pulse-" + day);
	if (today == null || today == undefined || today == "undefined") {
		return 0;
        }

	return today;
}

function getTodayHits(day) {
	var today = storageGet("pulse-hits-" + day);
	if (today == null || today == undefined || today == "undefined") {
		return 0;
        }

	return today;
}

function addToday(day, influence) {
	var today = storageGet("pulse-" + day);
	if (today == null || today == undefined || today == "undefined") {
		today = 0;
        }
	today += influence;
	storageSet("pulse-" + day, today);
}

function addTodayHits(day, hits) {
	var today = storageGet("pulse-hits-" + day);
	if (today == null || today == undefined || today == "undefined") {
		today = 0;
        }
	today += hits;
	storageSet("pulse-hits-" + day, today);
}

function getCountryStats() {
	var cstats = storageGet("pulse-countrystats");
	if (cstats == null || cstats == undefined || cstats == "undefined") {
		return null;
        }

	return cstats;
}

function setCountryStats(cstats) {
	if (cstats == null || cstats == undefined || cstats == "undefined") {
		return;
        }

	storageSet("pulse-countrystats", cstats);
}


function setShowBattleOrders(b) {
	if (b == null || b == undefined || b == "undefined") {
		return;
        }

	storageSet("pulse-battleorders-show", b);
}

function getShowBattleOrders() {
	var b = storageGet("pulse-battleorders-show");
	if (b == null || b == undefined || b == "undefined") {
		return false;
        }

	return b;
}

function setShowAll(b) {
	if (b == null || b == undefined || b == "undefined") {
		return;
        }

	storageSet("pulse-box-all", b);
}

function getShowAll() {
	var b = storageGet("pulse-box-all");
	if (b == null || b == undefined || b == "undefined") {
		return true;
        }

	return b;
}


function setShowBox(b) {
	if (b == null || b == undefined || b == "undefined") {
		return;
        }

	storageSet("pulse-box-show", b);
}

function getShowBox() {
	var b = storageGet("pulse-box-show");
	if (b == null || b == undefined || b == "undefined") {
		return true;
        }

	return b;
}

function setShowDamage(b) {
	if (b == null || b == undefined || b == "undefined") {
		return;
        }

	storageSet("pulse-damage-show", b);
}

function getShowDamage() {
	var b = storageGet("pulse-damage-show");
	if (b == null || b == undefined || b == "undefined") {
		return true;
        }

	return b;
}


function setShowPromo(b) {
	if (b == null || b == undefined || b == "undefined") {
		return;
        }

	storageSet("pulse-promo-show", b);
}

function getShowPromo() {
	var b = storageGet("pulse-promo-show");
	if (b == null || b == undefined || b == "undefined") {
		return true;
        }

	return b;
}
function setBattleOrders(data) {
	storageSet("pulse-orders", data);
}

function getBattleOrders() {
	var data = storageGet("pulse-orders");
	if (data == null || data == undefined || data == "undefined") {
		return null;
        }

	return data;
}



function setArmyData(data) {

	if (data == null || data == undefined || data == "undefined") {
		return;
        }

	storageSet("pulse-armydata", data);
}

function getArmyData() {
	var data = storageGet("pulse-armydata");
	if (data == null || data == undefined || data == "undefined") {
		return "";
        }

	return data;
}

function setArmyId(data) {

	if (data == null || data == undefined || data == "undefined") {
		return;
        }

	storageSet("pulse-armyid", data);
}

function getArmyId() {
	var data = storageGet("pulse-armyid");
	if (data == null || data == undefined || data == "undefined") {
		return -1;
        }

	return data;
}

function setCitizenshipId(data) {

	if (data == null || data == undefined || data == "undefined") {
		return;
        }

	storageSet("pulse-citizenshipid", data);
}

function getCitizenshipId() {
	var data = storageGet("pulse-citizenshipid");
	if (data == null || data == undefined || data == "undefined") {
		return -1;
        }

	return data;
}

function setUpdateDate(data) {

	if (data == null || data == undefined || data == "undefined") {
		return;
        }

	storageSet("pulse-updatedate", data);
}

function getUpdateDate() {
	var data = storageGet("pulse-updatedate");
	if (data == null || data == undefined || data == "undefined") {
		return null;
        }

	return data;
}

//////////////////////////////////////////////////////////////////////////////////////////

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function updateTodayOffsetInfo(offset) {
	var eday = $(".eday strong").text();

	var newday = parseInt(eday.replace(",","")) - offset;

	$("#pulse_today_" + offset).text(getToday(addCommas(newday)));
	$("#pulse_today_hits_" + offset).text(getTodayHits(addCommas(newday)));
}


function updateTodayInfo() {
	var eday = $(".eday strong").text();
	$("#pulse_today").text(getToday(eday));
	$("#pulse_today_hits").text(getTodayHits(eday));

}

var retries = 0;

function notifySendErrorRed() {
	$("#pulse_queue_length").css("color","red");
}

function notifySendErrorBlack() {
	$("#pulse_queue_length").css("color","inherit");
	setTimeout(function () { notifySendErrorRed(); }, 350);
}

function notifySendError() {
	setTimeout(function () { notifySendErrorBlack(); }, 100);
}

function updateQueueInfo() {
lockAndWaitQueue(); //

	var qdata = storageGet("pulse-queue-data");
	var pqueue = new $.fn.queueCreate(qdata);

	var qlength = pqueue.getLength();
	$("#pulse_queue_length").text(qlength);

	if (qlength == 0) {
  		queue_on = 0;
		$("#queue_run").text("Send");
		$("#queue_run").css("visibility","hidden");
		$("#pulse_queue_length").css("color","inherit");
	}
	else {
		$("#queue_run").attr("disabled","");
		$("#queue_run").css("visibility","visible");
		$("#pulse_queue_length").css("color","red");
	}


unlockQueue(); //
}


var sent_query_data;

// http://gatmax.sinkovicz.hu/pulse.php?citizenId=1224333&battleId=37074&defenderId=42&invaderId=44&citizenName=1224333&natId=35&groupId=48&regionName=Plovdiv&mustInvert=false&isResistance=0&instantKill=0&givenDamage=2500000&earnedXp=0&weaponDamage=291&weaponDurability=1&skill=0&rank=0&level=66&exp=0&wellness=620&enemyName=R2huojianpao&enemyIsNatural=0&countdown=00:33:29&livetime=22:07&eday=1,864&domination=43&attPoints=280&defPoints=60&round=6&attRounds=35&defRounds=20&version=1.2.192&ts=1356674628652&DOarmyID=48&DOBattleID=37074&DOCountry=Bulgaria&DORegion=Plovdiv
//http://gatmax.sinkovicz.hu/pulse.php?citizenId=1621786&battleId=37074&defenderId=38&invaderId=71&citizenName=Ernst%20von%20Jacob&natId=13&groupId=111&regionName=Sveland&mustInvert=false&isResistance=0&instantKill=0&givenDamage=2500000&earnedXp=0&weaponDamage=291&weaponDurability=1&skill=0&rank=0&level=1&exp=0&wellness=1&enemyName=default&enemyIsNatural=0&countdown=00:35:29livetime=22:07&&eday=1,946&domination=0&version=1.2.6&DOarmyID=111&DOBattleID=37074&DOCountry=United%20Kingdom&DORegion=Louth

function sendData(query_data, backup) {
    //var url2 = "http://199.19.119.44:443/index.php/PulseWS/doFight.asfx";
	var url1 = "http://gatmax.sinkovicz.hu/pulse.php";
	//var url3 = "http://pulse.servebeer.com/PulseWS/doFight.asfx";
   // var url3 = "http://gatmax.sinkovicz.hu/pulse_1.2.012.php";
	
	if (backup == true) {
			$.ajax({
				type: 'POST',
				url: url2,
				cache: false,
				data: query_data,
				timeout: 7000
			});

		return ;

	}

	sent_query_data = query_data;
			$.ajax({
				type: 'POST',
				url: url1,
				cache: false,
				data: sent_query_data,
				timeout: 7000,
  				success: function(data) {

					if (data == "OK") {
	updateQueueInfo();
	retries = 0;
					}
					else if (data == "DIS") {
	updateQueueInfo();
	retries = 0;
					}
					else if (data == "DUP") {
	updateQueueInfo();
	retries = 0;
					}
					else if (data == "STOP") {
	updateQueueInfo();
	retries = 0;
	cancelQueue();
					}
					else {

	lockAndWaitQueue(); //
	var qdata = storageGet("pulse-queue-data");
	var pqueue = new $.fn.queueCreate(qdata);
	pqueue.enqueue(sent_query_data);
	storageSet("pulse-queue-data", pqueue.sliceQueue());
	unlockQueue(); //

	updateQueueInfo();
	retries += 1;
					notifySendError();
					}
				},
				error:function (xhr, ajaxOptions, thrownError) {

	lockAndWaitQueue(); //
	var qdata = storageGet("pulse-queue-data");
	var pqueue = new $.fn.queueCreate(qdata);
	pqueue.enqueue(sent_query_data);
	storageSet("pulse-queue-data", pqueue.sliceQueue());
	unlockQueue(); //

	updateQueueInfo();
	retries += 1;

					notifySendError();
               			} 
			});
}

function rebuildQueue() {
lockAndWaitQueue(); //

	var qdata = storageGet("pulse-queue-data");
	var pqueue = new $.fn.queueCreate(qdata);
	var queue_length = pqueue.getLength();
	var sdata = "";
	var processed = 0;

	while (processed < queue_length) {
		var peek = pqueue.dequeue();
		
		sdata += peek;
		processed += 1;
	}

	queue_data = [];
	pulse_queue = new $.fn.queueCreate(queue_data);
	storageSet("pulse-queue-data", queue_data);
unlockQueue(); //


	lockAndWaitQueue(); //

	var parts = sdata.split('", "');
	for (var i = 0; i < parts.length; i++) {
		var qdata = storageGet("pulse-queue-data");
		var pqueue = new $.fn.queueCreate(qdata);
		pqueue.enqueue(parts[i]);
		storageSet("pulse-queue-data", pqueue.sliceQueue());
	}
	unlockQueue(); //

	updateQueueInfo();

}

function dequeue() {
	if (retries > 4) {
		retries = 0;
		cancelQueue();
		return;
	}

lockAndWaitQueue(); //

	var qdata = storageGet("pulse-queue-data");
	var pqueue = new $.fn.queueCreate(qdata);
	var queue_length = pqueue.getLength();
	if (queue_length > 0) {
		var peek = pqueue.dequeue();
		storageSet("pulse-queue-data", pqueue.sliceQueue());

unlockQueue(); //

		sendData(peek, false);
	}
	else {
unlockQueue(); //

updateQueueInfo();
	}
}

var queue_timer = null;

function stopDequeue() {
	if (queue_timer != null) {
		clearInterval(queue_timer);
		queue_timer = null;
	}
}

function startDequeue() {
	stopDequeue();

lockAndWaitQueue(); //

	var qdata = storageGet("pulse-queue-data");
	var pqueue = new $.fn.queueCreate(qdata);
	var queue_length = pqueue.getLength();

	if (queue_length > 1000) {
		rebuildQueue();
        }
	else if (queue_length > 0) {
		queue_timer = setInterval(function () { dequeue(); }, 15000);
	}

unlockQueue(); //
}


///////////////////////////////////////////////////////////////////////////////

function getDOMArmyId() {
	try {
		var groupId = $("#groupId");
		if (groupId.length > 0) {
			var value = $("#groupId").first().val();
			return value;
		}
	}
	catch(err) {}

	return -1;
}

function getDOMArmyData() {
	try {
		var oc = $("#orderContainer");
		if (oc.length > 0) {
			var link = $(oc).first().find("a").first();
			var linkParts = $(link).attr("href").trim().split("/");
			var dod = linkParts[linkParts.length - 1];

			var groupId = getDOMArmyId();
			var eday = $(".eday strong").text();
			eday = eday.replace(",","");
			var livetime = $("#live_time").text();

			var value = groupId + "-" + dod + "-" + eday + " " + livetime.replace(":","_");
			setArmyData(value);

			return value;
		}
	}
	catch(err) {}

	return "";
}

function getDOMCitizenshipId() {
	try {
		var menu4 = $("#menu4").first().find("ul").first().find("li");
		if (menu4.length >= 4) {
			var link = $(menu4[3]).find("a").first();
			var linkParts = $(link).attr("href").trim().split("/");
			var value = linkParts[linkParts.length - 1];
			return value;
		}
	}
	catch(err) {}

	return -1;
}

function getWeaponId() {
	try {
		var value = unsafeWindow.currentWeaponId;
		return value;
	}
	catch(err) {}

	return -1;
}

///////////////////////////////////////////////////////////////////////////////

function setGroupId() {
	var groupId = $("#groupId");
	if (groupId.length > 0) {
		var value = $("#groupId").first().val();
		setArmyId(value);
	}
}

function getGroupId() {
	var groupId = -1;
	try {
		groupId = getArmyId();
	}
	catch(err) {}

	return groupId;
}

///////////////////////////////////////////////////////////////////////////////

function getAttackerRounds() {
	return $("#left_campaign_points > strong").text();
}

function getDefenderRounds() {
	return $("#right_campaign_points > strong").text();
}

function enableFightButton() {

	var mode = 2;
	if (mode == 1) {
		$("#pvp_actions .action_holder").removeClass("disabled");
	  	$(".fight_btn").css("color","#33aa33");
  		$(".fight_btn").css("text-shadow","#cccccc 2px 2px 2px");
	}
	else if (mode == 2) {
		$("#pvp_actions .action_holder").removeClass("disabled");
		$('.fight_btn').css('color','');
		$('.fight_btn').css('text-shadow','');
	}
	else {
		$('#pvp_actions .action_holder').removeClass('disabled');
		$('.fight_btn').css('color','');
		$('.fight_btn').css('text-shadow','');
	}
}


function disableFightButton() {
	var mode = 2;
	if (mode == 1) {
		$('#pvp_actions .action_holder').removeClass('disabled');
		$('.fight_btn').css('color','#cc3333');
		$('.fight_btn').css('text-shadow','#aaaaaa 2px 2px 2px');
	}
	else if (mode == 2) {
		$('#pvp_actions .action_holder').addClass('disabled');
		$('.fight_btn').css('color','inherit');
		$('.fight_btn').css('text-shadow','inherit');
	}
	else {
		$('#pvp_actions .action_holder').removeClass('disabled');
		$('.fight_btn').css('color','inherit');
		$('.fight_btn').css('text-shadow','inherit');
	}
}



function addEgovLinks() {
	


	
	var groupimg = "http://www.gatmax.info/img/egov_icon.png";
	var medalimg = "http://www.gatmax.info/img/medal_icon.png";
	var okmimg = "http://www.gatmax.info/img/okm.jpg";
	var obj_activity = $(".citizen_sidebar .citizen_activity").first();
	if (obj_activity != undefined && obj_activity != null && obj_activity != 'undefined') {

		var arr_places = obj_activity.find(".place");
		if (arr_places.length > 1) {
			var place = $(arr_places[1]).find(".one_newspaper").first();

			var link = place.find("a").first();
			var linkParts = $(link).attr("href").trim().split("/");

			var groupId = linkParts[linkParts.length - 1];
			var grouplink = "http://egov4you.info/unit/overview/" + groupId;

            var srcCitizenId = $(".action_message").attr("href").trim();
			var srcCitizenIdlinkParts = srcCitizenId.trim().split("/");
			var PCitizenId = srcCitizenIdlinkParts[srcCitizenIdlinkParts.length - 1];
			
			var citienlink  = "http://egov4you.info/citizen/history/" + PCitizenId;
			var citienlink2 = "http://battle-watcher.com/medals/citizen/"+ PCitizenId;
			var citienlink3 = "http://gatmax.info/index.php?p=stat&soldier="+ PCitizenId;
			
			var html = "<div style='margin-top: 4px; margin-bottom: 0px; height: 16px; padding-bottom: 1px; padding-top: 1px; width: 141px; border-top: 1px dotted #dddddd;'>";
			html += "<a title='Open army stats in egov4you' style='padding: 0px; margin: 0px; width: 141px;' href='" + grouplink + "' target='blank'>";
			html += "<img style='margin-top: 4px; border: 0px;' width='16' height='16' src='" + groupimg + "' />";
			html += "<span style='margin-top: -2px;'>E4Y MU STAT</span>";
			html += "</a>";
			html += "</div>";
			html += "<div style='margin-top: 4px; margin-bottom: 0px; height: 16px; padding-bottom: 1px; padding-top: 1px; width: 141px; border-top: 1px dotted #dddddd;'>";
			html += "<a title='Open army stats in egov4you' style='padding: 0px; margin: 0px; width: 141px;' href='" + citienlink + "' target='blank'>";
			html += "<img style='margin-top: 4px; border: 0px;' width='16' height='16' src='" + groupimg + "' />";
			html += "<span style='margin-top: -2px;'>E4Y - fejl&otilde;d&eacute;s</span>";
			html += "</a>";
			html += "</div>";
			html += "<div style='margin-top: 4px; margin-bottom: 0px; height: 16px; padding-bottom: 1px; padding-top: 1px; width: 141px; border-top: 1px dotted #dddddd;'>";
			html += "<a title='Open citizen stats in BattleWacher' style='padding: 0px; margin: 0px; width: 141px;' href='" + citienlink2 + "' target='blank'>";
			html += "<img style='margin-top: 4px; border: 0px;' width='16' height='16' src='" + medalimg + "' />";
			html += "<span style='margin-top: -2px;'>Med&aacute;l figyel&otilde;</span>";
			html += "</a>";
			html += "</div>";
			html += "<div style='margin-top: 4px; margin-bottom: 0px; height: 16px; padding-bottom: 1px; padding-top: 1px; width: 141px; border-top: 1px dotted #dddddd;'>";
			html += "<a title='Magyar Osszesitoi adatok' style='padding: 0px; margin: 0px; width: 141px;' href='" + citienlink3 + "' target='blank'>";
			html += "<img style='margin-top: 4px; border: 0px;' width='16' height='16' src='" + okmimg + "' />";
			html += "<span style='margin-top: -2px;'>E4H adatok</span>";
			html += "</a>";
			html += "</div></div>";
			place.append(html);
		}
	}
}


function goToProfile() {
	document.location = "http://www.erepublik.com" + $(".user_info a:first").attr('href');
}

/******************************************************************/
/******************************************************************/

function main2() {

  $.ajaxSetup({
	global: true,
	cache: false
  });



  try {
	queryCountryStats();
  }
  catch(err) {}

  var citizenId = 0;
  if (typeof(SERVER_DATA) != 'undefined') {
	citizenId = SERVER_DATA.citizenId;
  }
  else {
  }

  var ploaded = renderPulse(citizenId);
  if (ploaded == false) {
     return;
  }

  try {
	var groupId = getArmyId();
	if (groupId == -1) {
		groupId = getDOMArmyId();
		setArmyId(groupId);
	}
	else {
	}
  }
  catch(err) {}

  try {
	getDOMArmyData();
  }
  catch(err) {}

  try {
	var citizenshipId = getCitizenshipId();
	if (citizenshipId == -1) {
		citizenshipId = getDOMCitizenshipId();
		setCitizenshipId(citizenshipId);
	}
	else {
	}
  }
  catch(err) {}

  try {
	addEgovLinks();
  }
  catch(err) {}

  try {
	renderProfileInfluence();
  }
  catch(err) {}

  

  //////////////////////////////////

  var ajax_timeout = null;

  $j(document).ajaxSuccess(function(e, xhr, settings) {

	if ((settings.url.match(/military\/fight-shoot$/) != null)
		||
	    (settings.url.match(/military\/fight-shoot/) != null)
		||
	    (settings.url.match(/military\/fight-shooot/) != null)
		||
	    (settings.url.match(/military\/deploy-bomb/) != null)
	    ) {

		var battleId = -1;
		var instantKill = -1;

		var citizenName = "";
		try {
			citizenName = escape($(".user_avatar").attr("title"));
		}
		catch (err) {}

		var defenderId = SERVER_DATA.defenderId;
		var invaderId = SERVER_DATA.invaderId;
		var isResistance = SERVER_DATA.isResistance;
		var mustInvert = SERVER_DATA.mustInvert;

		var citizenshipId = -1;
		try {
			citizenshipId = getCitizenshipId();
		}
		catch (err) {}
		var groupId = -1;
		try {
			groupId = getArmyId();
		}
		catch (err) {}

		if (settings.data != null) {
			var queryStringData = new Array();
			var pairs = settings.data.split( "&" );
			for ( p in pairs ) {
				var keyval = pairs[p].split( "=" );
    				queryStringData[keyval[0]] = keyval[1];
			}

			battleId = queryStringData["battleId"];
			battleId = battleId.replace(/[^0-9]/g, '');
			instantKill = queryStringData["instantKill"];
			if (instantKill == null) {
				instantKill = 0;
			}
	      	}

		var responseText = xhr.responseText;

		var jresp = JSON.parse(responseText);

		var message = jresp.message;
		var error = jresp.error;

		if (!error && (message == "ENEMY_KILLED" || message == "OK")) {
			var countdown = $("#battle_countdown").text();
			var livetime = $("#live_time").text();
			var eday = $(".eday strong").text();

			var rank = 0;
			var level = 0;
			var exp = 0;
			var wellness = 0;

			var countWeapons = 0;
			var skill = 0;
			var weaponDamage = 0;
			var weaponDurability = 0;
			var givenDamage = 0;
			var earnedXp = 0;
			var enemyName = "";
			var enemyIsNatural = 0;

			if (
				(settings.url.match(/military\/deploy-bomb/) != null)
			) {
				weaponDamage = jresp.bomb.booster_id;
				givenDamage = jresp.bomb.damage;
			}
			else {
				rank = jresp.rank.points;
				level = jresp.details.level;
				exp = jresp.details.points;
				wellness = jresp.details.wellness;

				countWeapons = jresp.user.countWeapons;
				skill = jresp.user.skill;
				weaponDamage = jresp.user.weaponDamage;
				weaponDurability = jresp.user.weaponDurability;
				givenDamage = jresp.user.givenDamage;
				earnedXp = jresp.user.earnedXp;

				try {
					enemyName = escape(jresp.oldEnemy.name);
        	                }
				catch (err) {}

				if (jresp.oldEnemy.isNatural == true)
					enemyIsNatural = 1;
			}


			var domination = $("#blue_domination").text();
			if (domination != null && domination != undefined && domination != 'undefined')
				domination = domination.replace("%", "");
			var att_points = SERVER_DATA.points.attacker;
			var def_points = SERVER_DATA.points.defender;
			var round = SERVER_DATA.zoneId;

			var regionName = "";
			try {
				regionName = escape($("#pvp_header h2").text());
                        }
			catch (err) {}

			var att_rounds = getAttackerRounds();
			var def_rounds = getDefenderRounds();

			var timestamp = new Date().getTime();
			var armydata = getArmyData();
			/////
			var DO_armyID = storageGet("pulse-armyid");
	        var DO_BattleID = storageGet("pulse-doBattleID");
   	        var DO_Country = storageGet("pulse-doCountry");
   	        var DO_Region = storageGet("pulse-doRegion");
			var DO_save = storageGet("pulse-doSave");
			////
			if (enemyName == null) { enemyName = "none"; }
			if (weaponDurability == null) { weaponDurability = 1; }
			if (givenDamage == 10000) { weaponDamage = 10000 ; }
			if (givenDamage == 50000) { weaponDamage = 50000 ; }
			//if (earnedXp = null) { enemyName = "0"; }
			if (exp == null) { exp = "0"; }
			//if (domination > 52) { domination = 52; }
			var query = "";
			query += "citizenId=" + citizenId + "&battleId=" + battleId + "&defenderId=" + defenderId + "&invaderId=" + invaderId;
			query += "&citizenName=" + citizenName;
			
			query += "&natId=" + citizenshipId + "&groupId=" + groupId;
			query += "&regionName=" + regionName + "&mustInvert=" + mustInvert + "&isResistance=" + isResistance;
			query += "&instantKill=" + instantKill + "&givenDamage=" + givenDamage + "&earnedXp=" + earnedXp;
			query += "&weaponDamage=" + weaponDamage + "&weaponDurability=" + weaponDurability;
			query += "&skill=" + skill;
			query += "&rank=" + rank + "&level=" + level + "&exp=" + exp + "&wellness=" + wellness;
			query += "&enemyName=" + enemyName + "&enemyIsNatural=" + enemyIsNatural;
			query += "&countdown=" + countdown + "&livetime=" + livetime + "&eday=" + eday;
			query += "&domination=" + domination + "&attPoints=" + att_points + "&defPoints=" + def_points;
			query += "&round=" + round + "&attRounds=" + att_rounds + "&defRounds=" + def_rounds;
			query += "&version=" + puls3_version;
			query += "&ts=" + timestamp;
			query += "&DOarmyID=" + DO_armyID;
			query += "&DOBattleID=" + DO_BattleID;
			query += "&DOCountry=" + DO_Country;
			query += "&DORegion=" + DO_Region;
			
			
			sendData(query, false);
			//sendData(query, true);

	         
			
			///
			var totalGivenDamage = givenDamage;
			if (enemyIsNatural)
				totalGivenDamage += Math.floor(givenDamage*0.1); 
            		try {
				addToday(eday, totalGivenDamage);
				addTodayHits(eday, earnedXp);
				updateTodayInfo();
            		}
            		catch (err) {}
		


////////////////////////////////////////////////////////////////////////////////////////////////////
		
		}

	}
	else if (settings.url.match(/military\/change-weapon/) != null) {
	  
	   try {
		renderWeaponDamage();
	   }
           catch (e) {}
	}

	if (ajax_timeout != null) {
		clearInterval(ajax_timeout);
		ajax_timeout = null;		
        }

	enableFightButton();

	ajax_timeout = setTimeout(function () { disableFightButton(); }, 30000);

  });

  try {
	updateQueueInfo();
	updateTodayInfo();
	updateTodayOffsetInfo(1);
	updateTodayOffsetInfo(2);
	
  }
  catch(err) {}



  try {
	var curl = location.href;
	if (curl == null || curl == undefined || curl == 'undefined') {
		curl = window.location.href;
	}
	if (curl.search(/military/i) != -1) {
		var curlparts = curl.split('/');
		var bId = curlparts[curlparts.length - 1];
		bId = bId.split('?')[0];
		bId = bId.replace(/[^0-9]/g, '');
		currentBattleId = bId;
		setTimeout(function () { forceAjaxCheck(); }, 2000);
	}
  }
  catch(err) {}

  // REMOVED VERSION CHECK

}











/*

Queue.js

A function to represent a queue

Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 */

(function($) {

        $.fn.queueCreate = function(inqueue, options) {
		// initialise the queue and offset
		var queue  = inqueue;
		var offset = 0;

		this.sliceQueue = function() {
			queue = queue.slice(offset);
			offset = 0;
			return queue;
		}

		/* Returns the length of the queue. */
		this.getLength = function() {
			// return the length of the queue
			return (queue.length - offset);
		}

		/* Returns true if the queue is empty, and false otherwise. */
		this.isEmpty = function() {
			// return whether the queue is empty
    			return (queue.length == 0);
		}

		/* Enqueues the specified item. The parameter is:
		* item - the item to enqueue */
		this.enqueue = function(item) {
			// enqueue the item
			queue.push(item);
		}

		/* Dequeues an item and returns it. If the queue is empty then undefined is returned. */
		this.dequeue = function() {
    			// if the queue is empty, return undefined
			if (queue.length == 0) return undefined;

			// store the item at the front of the queue
			var item = queue[offset];

			// increment the offset and remove the free space if necessary
			if (++ offset * 2 >= queue.length) {
				queue = queue.slice(offset);
				offset = 0;
			}

			// return the dequeued item
    			return item;
		}

		/* Returns the item at the front of the queue (without dequeuing it). If the
		* queue is empty then undefined is returned. */
		this.peek = function() {
			// return the item at the front of the queue
			return (queue.length > 0 ? queue[offset] : undefined);
		}

	};

})(jQuery);

function Queue(queue){

  // initialise the queue and offset
  //var queue  = [];
  var offset = 0;

  /* Returns the length of the queue.
   */
  this.getLength = function(){

    // return the length of the queue
    return (queue.length - offset);

  }

  /* Returns true if the queue is empty, and false otherwise.
   */
  this.isEmpty = function(){

    // return whether the queue is empty
    return (queue.length == 0);

  }

  /* Enqueues the specified item. The parameter is:
   *
   * item - the item to enqueue
   */
  this.enqueue = function(item){

    // enqueue the item
    queue.push(item);

  }

  /* Dequeues an item and returns it. If the queue is empty then undefined is
   * returned.
   */
  this.dequeue = function(){

    // if the queue is empty, return undefined
    if (queue.length == 0) return undefined;

    // store the item at the front of the queue
    var item = queue[offset];

    // increment the offset and remove the free space if necessary
    if (++ offset * 2 >= queue.length){
      queue  = queue.slice(offset);
      offset = 0;
    }

    // return the dequeued item
    return item;

  }

  /* Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  this.peek = function(){

    // return the item at the front of the queue
    return (queue.length > 0 ? queue[offset] : undefined);

  }

}



function titkosfeature() {

 $("#pvp_battle_area table:eq(0)").before('<table title="Szukseges Utes" style="width: auto; margin: 0 auto -25px; position: relative; top: 130px; left: 170px;"><tr><td><div id="Szukseges Utes" style="width: auto; height: 25px; display: block; cursor: default; position: relative;"><small style="font-size: 11px; color: white; float: left; text-shadow: #333 0px 1px 1px; display: block; height: 25px; opacity: 0.7; -moz-opacity: 0.7; -ms-fiter: \'progid:DXImageTransform.Microsoft.Alpha(Opacity=10)\'; filter: alpha(opacity=10); line-height: 25px; font-weight: bold; padding: 0 5px; background-image: url(\'/images/modules/pvp/influence_left.png?1321873582\'); background-position: left;">Szukseges Utes</small><strong id="SZU" style="color: white; text-shadow: #014471 0px 1px 0px; float: left; display: block; height: 25px; font-size: 12px; line-height: 25px; padding: 0 5px; background-image: url(\'/images/modules/pvp/influence_right.png?1321873582\'); background-position: right;">6</strong></div></td></tr></table>');
 szu = document.getElementById("SZU");

 eroT = document.getElementById("fighter_skill").innerHTML;
 eroT = eroT.replace(",", "");
 
 eroV = document.getElementById("enemy_skill").innerHTML;
 eroV = eroV.replace(",", "");
 
 weapon = $("#enemy_weapon").attr("src").split("/")[5];
 weapon = weapon.replace(".png", "");
 weapon = weapon.replace("weapon_", "");

 szu.innerHTML = eroV;	

} 


function initPulseQueue() {

lockAndWaitQueue(); //
	queue_data = storageGet("pulse-queue-data");
	if (queue_data == null || queue_data == undefined || queue_data == "undefined" || queue_data == "") {
		queue_data = [];
		pulse_queue = new $.fn.queueCreate(queue_data);
		storageSet("pulse-queue-data", queue_data);
	}
	else {
		pulse_queue = new $.fn.queueCreate(queue_data);
		if (isNaN(pulse_queue.getLength())) {
			queue_data = [];
			pulse_queue = new $.fn.queueCreate(queue_data);
			storageSet("pulse-queue-data", queue_data);
		}

	}
unlockQueue(); //

	main2();
}

disableFightButton();
initPulseQueue();


}



  var load = true;

///////////////////////////////////////////////
// DISABLE PULSE IN GOLD AND EXTRAS //
  try {
	var burl = location.href;
	if (burl == null || burl == undefined || burl == 'undefined') {
		burl = window.location.href;
	}
	if (burl.search(/buy-sms/i) != -1) {
		load = false;
	}
	if (burl.search(/loyalty/i) != -1) {
		load = false;
	}
	if (burl.search(/gold-bonus/i) != -1) {
		load = false;
	}
	if (burl.search(/get-gold/i) != -1) {
		load = false;
	}
	if (burl.search(/elections/i) != -1) {
		load = false;
	}
	S
  }
  catch (err) {}
///////////////////////////////////////////////

  


///////////////////////////////////////////////

  if (load == true) {
	addJQuery(initializePersistence);
	
  }
