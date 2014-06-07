// ==UserScript==
// @name           Dirk Notifier
// @version        0.50
// @description    IKA notifier by Dirk
// @include        http://s8.pl.ikariam.com/*
// @exclude        http://board*ikariam.*/*
// @require        http://bealegend.c0.pl/gm_scripts/jquery142.js
// @require        http://bealegend.c0.pl/gm_scripts/gm_jq_xhr.js
// @require        http://bealegend.c0.pl/gm_scripts/57377user.js
// @require        http://bealegend.c0.pl/gm_scripts/57756user.js
// @require        http://bealegend.c0.pl/gm_scripts/62718user.js

// ==/UserScript==
var scriptVer = '0.50';
ScriptUpdater.check(94745, scriptVer);

// ---------------------------------------------- MAIN ----------------------------------------------
var _debug = "";
var _interval = 1000*60*3;
var _intervalTimer = 1000*60;
var loc = document.location.href;

$('.msgText').css("font-family", "monospace");

createDialog();

try {
	// - GET PLAYER NICK - START
	if( $("#btn-login").length > 0 || loc.indexOf("view=options") > -1 || loc == "http://pl.ikariam.com/index.php") { 
		GM_setValue('player', '');
	}
	
	var player = GM_getValue('player','');
		
	if(player == '' && loc.indexOf("ikariam") > -1) {
	
			$.ajax({
				type: "GET",
			  url: '/index.php?view=options',
			  async: false,
			  success: function(data) {
					player = $("input[name='name']", data).val();
					GM_setValue('player', player);
					if(loc.indexOf("view=options") > -1) alert('Twoj nick w Dirk Notifier to: '+player);
				}
			});
			
	}
	player = GM_getValue('player','');
	// - GET PLAYER NICK - END
	
	/*if(loc.indexOf('view=militaryAdvisorCombatReports') != -1) {
		$.get('http://s8.pl.ikariam.com/index.php?view=militaryAdvisorCombatReports', function(data){
			sendRaports(data);
		});	
	}*/
	
	/*if(loc.indexOf('view=militaryAdvisorDetailedReportView') != -1 && loc.indexOf('detailedCombatId') != -1) {
		
		var combatId = parseInt(ereg("detailedCombatId=([0-9]+)", loc));
		var player = "Dirk";
		var mainview = $("#mainview").clone().find("div.yui-navset, #ikaSearchButtonClose, #ikaSearchResults, script, form").remove().end().html();
		var round = parseInt(ereg("combatRound=([0-9]+)", loc));
			
	  $.ajax({
			url: "http://bealegend.c0.pl/post.php",
			data: {combatId: combatId, player: player, mainview: mainview, round: round},
			type: "POST",
			dataType: "json",
			success: function(rtndata) { 
				$("div.buildingDescription").after("<p style='color: green; font-weight: bold;'>Raport: "+rtndata.res+"</p>");
				//alert(rtndata.res);
			},
			xhr: function(){return new GM_XHR;}
		});
		
	}*/
	
	var _currentTime = null;
	var _starttimer = null;
	
	if(loc.indexOf('view=militaryAdvisorMilitaryMovements') != -1 || loc.indexOf('action=transportOperations') != -1) {
		movements_func_ajax();
		_starttimer = getJTimeNow() + _interval;
		GM_setValue('_gettimer', ""+_starttimer);	
	}
	
	var _starttimer = getJTimeNow() + _interval;
	if(parseInt(GM_getValue('_gettimer')) < getJTimeNow())  {
		if(loc.indexOf('view=militaryAdvisorMilitaryMovements') == -1 && loc.indexOf('action=transportOperations') == -1) {
			movements_func_ajax();
			_starttimer = getJTimeNow() + _interval;
			GM_setValue('_gettimer', ""+_starttimer);
			
			$.get('http://s8.pl.ikariam.com/index.php?view=militaryAdvisorCombatReports', function(data){
				sendRaports(data);
			});
		}
	}
	
	var _gettimer = parseInt(GM_getValue('_gettimer'));
	var _gettimerResetRap = parseInt(GM_getValue('_gettimerResetRap'));
	var _after_init = 0;
	_after_init = setInterval(function(){
		if(_gettimerResetRap < getJTimeNow())	{
			var _raports = {};
			GM_setValue("raports", _raports.toSource());
			delete _raports;
			
			GM_setValue('_gettimerResetRap', "" + getJTimeNow() + (2 * 60 * 60 * 1000) - (60 * 1000));
			_gettimerResetRap = GM_getValue('_gettimerResetRap', '');
		}
		if(_gettimer < getJTimeNow()) {
			
			movements_func_ajax();
	
			_starttimer = getJTimeNow() + _interval - (60 * 1000);
			GM_setValue('_gettimer', ""+_starttimer);
			_gettimer = GM_getValue('_gettimer', '');
			
			$.get('http://s8.pl.ikariam.com/index.php?view=militaryAdvisorCombatReports', function(data){
				sendRaports(data);
			});
			//clearTimeout(_after_init);
		}
	}, _intervalTimer);
} 
catch(e){
 alert('Dirk Notifier Error (MAIN): '+e.message)
}

// ---------------------------------------------- CORE FUNCTIONS

function sendRaports(html){
	var raports = GM_getValue("raports", {});
	if(typeof raports == 'string') raports = eval(raports);
	
	//delete raports[875828];
	
	var new_raports = {};
	
	$.each( $("#finishedReports table.operations tr", html), function(k, v) {
		if( $("td[class~='subject']", this).length) {
			var act_addr = "http://s8.pl.ikariam.com"+$("td:eq(3) a", this).attr("href");
			//alert(act_addr);
			var _id = ereg("combatId=([0-9]+)", act_addr);
			var _date = $.trim($("td:eq(2)", this).text());
			var _subject = $.trim($("td:eq(3) a", this).text());
			new_raports[_id] = _date;
			if(raports.hasOwnProperty(_id)) {
				if(raports[_id] != new_raports[_id]) {
					$.ajax({
						url: act_addr,
						success: 	function(data){
							mainRaport(data, act_addr, _subject);
						}
					});
				}
			} else {
				$.ajax({
					url: act_addr,
					success: function(data){
						mainRaport(data, act_addr, _subject);
					}
				});
				return false;
			}
		}
	});
	
	raports = new_raports;
	GM_setValue("raports", raports.toSource());
}

function mainRaport(html, addr, subject){
	var combatId = parseInt(ereg("combatId=([0-9]+)", addr));

	var mainview = $("#mainview", html).clone().find("div.yui-navset, #ikaSearchButtonClose, #ikaSearchResults, script, form").remove().end().html();
	var round = 0;
	var _date = $("#troopsReport .date:first", html).text().replace("(", "").replace(")", "");
	
	//alert(mainview);
	var attackers = $(".attacker span", html).text().split(", ");
	var defenders = $(".defender span", html).text().split(", ");
	if(attackers[0] != "" && defenders[0] != "") {
		var player_pos = null;
		var att_pos = 1000;
		var def_pos = 1000;
		$.each(attackers, function(k, v){
			if(ereg("(.+) z miasta", v) == player) att_pos = k;
		});
		$.each(defenders, function(k, v){
			if(ereg("(.+) z miasta", v) == player) def_pos = k;
		});
		
		player_pos = def_pos;
		if(att_pos < def_pos) {
			player_pos = att_pos;
		}
		
	  $.ajax({
			url: "http://bealegend.c0.pl/post.php",
			data: {combatId: combatId, player: player, player_pos: player_pos, mainview: $.trim(mainview), round: round, date: _date, type: 'raport'},
			type: "POST",
			dataType: "json",
			success: function(rtndata) { 
				$("div.buildingDescription").after("<p style='color: green; font-weight: bold;'>Raport: " + subject + " "+rtndata.res+"</p>");
				
				var ret = false;
				if(rtndata.res.indexOf("- OK")) ret = true;
				return ret;
				//alert(rtndata.res);
			},
			xhr: function(){return new GM_XHR;}
		});
	}	
}

function movements_func_ajax() {
	try{
		$.ajax({
			url: "http://s8.pl.ikariam.com/index.php?view=militaryAdvisorMilitaryMovements",
			type: "GET",
			dataType: "html",
			success: function(data) { 
				movements_func(data);
			}
		});
	} 
	catch(e){
	 alert('Dirk Notifier Error (func movements_func_ajax): '+e.message)
	}
}

function movements_func(obj) {
	try{	
		var sendMovements = {};
		var tclone = $("#fleetMovements table.locationEvents", obj).clone();
		
		var reg_str = "";
		reg_str = obj.substr(obj.indexOf("getCountdown("), obj.length);
		
		$.each($("tr", tclone), function(i, v) {
			if($(this).html().indexOf("fleetRow") != -1 && reg_str != "")	{
				
				var regex = new RegExp('enddate: (\\d+), currentdate: (\\d+), el: "'+$("td:eq(1)", this).attr('id')+'"');
				var match = regex.exec(reg_str);
				
				//alert(match[1]);
				
	  		var cityfrom = $("<div>").append($("td[title='Pochodzenie'] a", this).clone()).remove().html();
	  		var whofrom = $("td[title='Pochodzenie']", this).find("a").remove().end().text();
	  		
	  		var cityto = $("<div>").append($("td[title='Cel'] a", this).clone()).remove().html();
	  		var whoto = $("td[title='Cel']", this).find("a").remove().end().text();
	  		
	  		var content = $("td[title='Pochodzenie']", this).prev().find(".tooltip2").html();
	  		
	  		var small_c = $("td[title='Pochodzenie']", this).prev().find("*").remove().end().html();
	  		
	  		var action = $("td[title='Cel']", this).prev().prev().attr("title");
	  		
	  		var endtime = 0;
				if(match != null) {
						endtime = match[1];
				}
				
				var positions = {};
				
				positions['id'] = $("td:eq(1)", this).attr('id').replace("fleetRow", "");
				positions['cityfrom'] = escape(cityfrom);
				positions['whofrom'] = escape(whofrom.replace("(","").replace(")",""));
				positions['cityto'] = escape(cityto);
				positions['whoto'] = escape(whoto.replace("(","").replace(")",""));
				positions['small_c'] = escape(small_c);
				positions['content'] = escape(content);
				positions['action'] = escape(action);
				positions['endtime'] = endtime;
		
				sendMovements[i] = positions;
			}
		});
		
		sendMovements['type'] = "movements";
		sendMovements['player'] = player;
		sendMovements['version'] = scriptVer;
		
		_debug = print_r(sendMovements, 10, "<br>");
		
	  $.ajax({
			url: "http://bealegend.c0.pl/post.php",
			data: sendMovements,
			type: "POST",
			dataType: "json",
			beforeSend: function() { 
				if($("#dirk_notifier").html() != null) {
					$("#dirk_notifier").remove();
				}
				$("div.buildingDescription").after("<p id='dirk_notifier' style='color: black; font-weight: bold;'>Upload: WYSYŁAM...</p>");
			},
			success: function(rtndata) { 
				
				var dzisiaj = new Date();
				
				var rok = dzisiaj.getFullYear();
				
				var miesiac = dzisiaj.getMonth()+1;
				if(miesiac < 10) miesiac = "0" + miesiac;
	
				var dzien = dzisiaj.getDate();
	
				var godz = dzisiaj.getHours();
				if (godz < 10) godz = '0' + godz;
				
				var min = dzisiaj.getMinutes();
				if (min < 10) min = '0' + min;
				
				var sec = dzisiaj.getSeconds();
				if (sec < 10) sec = '0' + sec;
	
				var dataczas = dzien +"-" + miesiac + "-" + rok + " " + godz + ":" + min + ":" + sec;
				
				if($("#dirk_notifier").html() != null) {
					$("#dirk_notifier").remove();
				}
				$("div.buildingDescription").after("<p id='dirk_notifier' style='color: green; font-weight: bold;'>Upload: "+rtndata.res+" ("+dataczas+")</p>");
				
				if(rtndata.ver != scriptVer) {
					 ScriptUpdater.forceNotice(94745, scriptVer);
				}
				//alert(rtndata.res);
			},
			xhr: function(){return new GM_XHR;}
		});
	} 
	catch(e){
	 alert('Dirk Notifier Error: (func movements_func)'+e.message)
	}
}

function createDialog() {
	try{	
		Config.scriptName = "Dirk Notifier";
	
		Config.tabs = {
			"Opcje":{
				html:'<p>Prosze zaznaczyc tylko wtedy kiedy zajmujecie to stanowisko w sojuszu, inaczej niepotrzebnie dodatkowo bedziecie sobie przymulac Ikariam.</p>',
				fields:{
					general:{
						type:'checkbox',
						label:'Generał',
						text:'zaznacz jesli jesteś generałem',
						value:false
					},
					sekretarz:{
						type:'checkbox',
						label:'Sekretarz',
						text:'zaznacz jesli jesteś sekretarzem',
						value:false
					}
				}
			},
			"DEBUG":{
				html: '- pusto -'
			}
		};
		
		
		$("#configTabDEBUG").live("click", function(){
			$("#ConfigContentBox").html(_debug);
		});
		
		IkaTools.init();
		IkaTools.addOptionsLink("Dirk Notifier");

		if($("#IkaOptionsDropdown").html() != null) {
			$('#IkaOptionsDropdown').before("<li><a href='http://bealegend.c0.pl/movements' target='_blank'>BaL ePanel</a></li>");
		} else {
			$('#GF_toolbar ul').append("<li><a href='http://bealegend.c0.pl/movements' target='_blank'>BaL ePanel</a></li>");
		}
	} 
	catch(e){
	 alert('Dirk Notifier Error (func createDialog): '+e.message)
	}
}

// ---------------------------------------------- ADDITIONAL FUNCTIONS

function getJTimeNow(){
	var dateNow = new Date();
	return dateNow.getTime();
}

function ereg(sExpr, str) {
	try{
	  var regex = new RegExp(sExpr,"g");
	  var match = regex.exec(str);
	  
	  if(match != null) {
	  	return match[1];
	  } else {
	  	return null;
		}
	}
  catch(e){
	 alert('Dirk Notifier Error (func ereg): '+e.message)
	}
}

function print_r(x,max,sep,l){try{l=l||0;max=max||10;sep=sep||' ';if(l>max){return"[WARNING: Too much recursion]\n";}
var
i,r='',t=typeof x,tab='';if(x===null){r+="(null)\n";}else if(t=='object'){l++;for(i=0;i<l;i++){tab+=sep;}
if(x&&x.length){t='array';}
r+='('+t+") :\n";for(i in x){try{r+=tab+'['+i+'] : '+print_r(x[i],max,sep,(l+1));}catch(e){return"[ERROR: "+e+"]\n";}}}else{if(t=='string'){if(x==''){x='(empty)';}}
r+='('+t+') '+x+"\n";}
if(sep=="<br>")r=r.replace(/<br><br><br>/gm,"<br>");return r;}
catch(e){alert('Dirk Notifier Error (func print_r): '+e.message)}};
var_dump=print_r;