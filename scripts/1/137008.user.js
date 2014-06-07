// ==UserScript==
// @name           Obvious statsupdater
// @namespace      Obvious_stats
// @description    Stats updater
// @version		   1.0
// @include        http://*.barafranca.nl/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @author         Edelachtbare, modified by Weapons
// ==/UserScript==

GM_registerMenuCommand("Clear stat site password", function(){ GM_deleteValue('stats_update_password'); });

var update_interval = 60; // time in minutes
update_interval = update_interval * 60 * 1000;

GM_setValue('timestamp_last_update',GM_getValue('timestamp_last_update','1'));

var lang = GM_getValue('lang','nl');
if(lang =='en') {
	translate = ['You reached your click limit.', 'Rank ', 'Rank progress', 'Bullets', 'Testament', 'Cash', 'In bank account', 'Bullets:', '<b>P</b>osition:', 'Your Guards', ' of '];
} else {
	translate = ['Je hebt jouw kliklimiet bereikt.', 'Rang ', 'Rangvordering', 'Kogels', 'Testament', 'Op zak', 'Op bankrekening', 'Kogels:', '<b>P</b>ositie:', 'Jouw Bodyguards', ' van de '];

}

if (window.location.pathname == "/info.php") {
	
	setTimeout(function(){ location.reload(true); },300000);
	
	$('#fb-likebox-iframe').remove();
	$('#fb-likebox-form').remove();
	
	
	/*if(GM_getValue('stats_update_password',-1)==-1) {
		var stat_pas=prompt('Enter password for the stat site');
		if(stat_pas!=null) {
			GM_setValue('stats_update_password',stat_pas);
		} else return false;
	} else {	var stat_pas = GM_getValue('stats_update_password'); }*/
	
	var stat_pas = GM_getValue('stats_update_password',-1);
	
	var stat_pas_box_heigh = GM_getValue('stat_pas_box_heigh',77);

	
	$('#newscontainer').prepend('<div id="legit_vak"><h4 style="color:#fff">Stats server</h4><h5 id="statsstatus">status: <span style="color:#f11">?</span></h5></div>');
	$('#legit_vak').css({'background' : '#000', 'float':'right','display':'block','width':'150px','height':stat_pas_box_heigh+'px','margin-right':'10px','color':'#eee','text-align':'left', 'padding':'5px','position':'relative','margin-top':'10px','overflow':'hidden'});

	if(lang=='nl') {	
		$('#legit_vak').append('<button id="change_lang" title="Change language to English">NL</button');
		$('#change_lang').css({'position':'absolute','top':'3px','right':'34px','font-size':'7px'}).click(function() {
			GM_setValue('lang', 'en');
			location.reload(true);
			return false;
		});
	}
	if(lang=='en') {	
	$('#legit_vak').append('<button id="change_lang" title="Verander de taal naar Nederlands">EN</button');
	$('#change_lang').css({'position':'absolute','top':'3px','right':'34px','font-size':'7px'}).click(function() {
		GM_setValue('lang', 'nl');
		location.reload(true);
		return false;
	});
	}
	
	
	$('#legit_vak').append('<button id="minimize_statz" title="minimize stats block">-</button>');
	$('#minimize_statz').css({'position':'absolute','top':'3px','right':'20px','font-size':'7px'}).click(function(){
		if( $('#legit_vak').height() < 70 ) {
				$('#manual_update_button').show();
				GM_setValue('stat_pas_box_heigh','77');
			$('#legit_vak').css({'height':'77px'});
		}	else {
			$('#manual_update_button').hide();
			$('#legit_vak').css({'height':'11px'});
			GM_setValue('stat_pas_box_heigh','11');
		}
		return false;
	});
	$('#legit_vak').append('<button id="reset_password" title="reset my stats account password">R</button>');
	$('#reset_password').css({'position':'absolute','top':'3px','right':'3px','font-size':'7px'}).click(function(){
		GM_setValue('stats_update_password','-1');
		location.reload(true);
		return false;
	});
	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://obvious.zxq.net/stats.php",
		onload: function(response) {
			if(response.responseText.indexOf('online')!=-1 || response.responseText.indexOf('Paswoord veranderen')!=-1) {
				$('#statsstatus').html('status: <span style="color:#1f1">Online</span>');
			}
		}
	});
	
	if(stat_pas==-1) {
	
		$('#legit_vak').append('<h5 style="margin-top:2px">Authorization</h5><input placeholder="password" type="password" id="stats_password" style="width: 100px" /><a href="#" style="font-size:9px; margin-left:2px;" id="statspassword_authorization">Submit</a>');
		
		$('#statspassword_authorization').click(function(){
			GM_setValue('stats_update_password',$('#stats_password').val());
			location.reload(true);
		});
	
		
		
	} else {
		
		$('#legit_vak').append('<button id="manual_update_button">Manual Update</button>');
		
		if(stat_pas_box_heigh==77) var display_button=''; else var display_button='none';
		
		$('#manual_update_button').css({'height':'20px','font-size':'9px','position':'absolute','bottom':'5px','left':'10%','width':'80%','display':display_button});
		$('#manual_update_button').click(function(){
			GM_setValue('timestamp_last_update','1');
			location.reload(true);
			return false;
		});
	
	
	var datum = new Date();
	var timestamp_now = datum.getTime();
	if((GM_getValue('timestamp_last_update','1')=='1')||(timestamp_now-parseInt(GM_getValue('timestamp_last_update',1))>=update_interval)) {
		// do update
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.barafranca.nl/information.php",
			onload: function(response) {
				if( response.responseText.indexOf(translate[0])!=-1 ) {
					$('#statsstatus').after('<h5 style="color:#f11">click limit reached!</h5>'); return false;
				}				
				var search_results = response.responseText.match(/nick=[\w]*/i);
				var ingame = search_results[0].replace('nick=','');
				var rang='undefind';
				var rv='undefind';
				var bullets='undefind';
				var testament='undefind';
				var cash='undefind';
				var bank='undefind';
				$(response.responseText).find('b').each(function(){
					if($(this).html()==translate[1]) {
						rang=$(this).parent().next().html();
					}
					if($(this).html().indexOf(translate[2]) != -1 ) {
						rv=$(this).parent().next().find('span').html().replace('%','');
					}
					if($(this).html()==translate[3]) {
						bullets=$(this).parent().parent().next().html().replace(/,/g,'').replace(/^\s*|\s*$/g,'');
					}
					if($(this).html()==translate[4]) {
						if($(this).parent().next().find('a').length != 0) {
							testament=$(this).parent().next().find('a').html().replace(/,/g,'').replace(/^\s*|\s*$/g,'');
						} else {
							testament=$(this).parent().next().html().replace(/,/g,'').replace(/^\s*|\s*$/g,'');
						}
					}
					if($(this).html().indexOf(translate[5]) != -1 ) {
						cash=$(this).parent().next().html().replace(/,/g,'').replace(/^\s*|\s*$/g,'').replace('$ ','');
					}
				});
				$(response.responseText).find('a').each(function(){
					if($(this).html().indexOf(translate[6]) != -1 ) {
						bank=parseInt($(this).parent().next().find('a').html().replace(/,/g,'').replace(/^\s*|\s*$/g,'').replace('$',''));
					}
				});
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://www.barafranca.nl/BeO/webroot/index.php?module=Rankings&action=",
					onload: function(response) {
						if( response.responseText.indexOf(translate[0])!=-1 ) {
							$('#statsstatus').after('<h5 style="color:#f11">click limit reached!</h5>'); return false;
						}
						var kogel_positie='undefind';
						$(response.responseText).find('b').each(function(){
							if($(this).html()==translate[7]) {
								kogel_positie=$(this).parent().next().html().replace('#','').replace(/,/g,'').replace(/^\s*|\s*$/g,'');
							}
						});
						GM_xmlhttpRequest({
							method: "GET",
							url: "http://www.barafranca.nl/mid.php",
							onload: function(response) {
								if( response.responseText.indexOf(translate[0])!=-1 ) {
									$('#statsstatus').after('<h5 style="color:#f11">click limit reached!</h5>'); return false;
								}
								var positie='undefind';
								$(response.responseText).find('td.name').each(function(){
									if($(this).html()==translate[8]) {
										positie=$(this).next().html().replace('#','').replace('+','');
									}
								});
								GM_xmlhttpRequest({
									method: "GET",
									url: "http://www.barafranca.nl/garage.php",
									onload: function(response) {
										if( response.responseText.indexOf(translate[0])!=-1 ) {
											$('#statsstatus').after('<h5 style="color:#f11">click limit reached!</h5>'); return false;
										}
										var autos='undefind';
										search_results = response.responseText.match(/<h2>.*<\/h2>/i);
										autos = search_results[0].replace('<h2>','').replace('</h2>','').split(translate[10]);
										autos = autos[1].split(' ');
										autos = autos[0];	
										GM_xmlhttpRequest({
											method: "GET",
											url: "http://www.barafranca.nl/BeO/webroot/index.php?module=Bodyguards",
											onload: function(response) {												
												if( response.responseText.indexOf(translate[0])!=-1 ) {
													$('#statsstatus').after('<h5>click limit reached</h5>'); return false;
												}												
												var bodyguards=[];
												$(response.responseText).find('div.oheader').each(function(){
													if( $(this).html().indexOf(translate[9])!=-1 ) {
														$(this).parent().find('center > table').each(function(){
															$(this).find('h2 > img').remove();
															var bleh = $(this).find('h2').html().split(' ');
															var bg_name=bleh[0];
															var bg_level=bleh[bleh.length-2];													
															var bg_attack = $(this).find('#jsprogbar_div_attack_'+bg_name).html().split(' ')[0];
															var bg_defense = $(this).find('#jsprogbar_div_defense_'+bg_name).html().split(' ')[0];
															var bg_special = $(this).find('#jsprogbar_div_special_'+bg_name).html();
															bodyguards[bodyguards.length]=[bg_name,bg_level,bg_attack,bg_defense,bg_special];
														});
													}

												});											
												var params = 'user='+ingame+'&pwd='+stat_pas+'&rang='+rang+'&rv='+rv+'&kogels='+bullets+'&test='+testament+'&opzak='+cash+'&opbank='+bank+'&kogel_pos='+kogel_positie+'&positie='+positie+'&autos='+autos+'&bgs='+bodyguards.join(';');
												params = 'params='+btoa(params);
												GM_xmlhttpRequest({
													method: "GET",
													//url: "http://obvious.zxq.net/stats.php?"+params,
													url: "http://obvious.zxq.net/stats.php?"+params,
													onload: function(response) {
														if(response.responseText=='ok') {
															GM_setValue('timestamp_last_update',''+timestamp_now);
															location.reload(true);
														} else {
															alert(response.responseText);
														}
													}
												});
											}
										});							
									}
								});								
							}
						});
					}
				});
			}
		});
		
	} else {
		var seconds = update_interval-(timestamp_now-parseInt(GM_getValue('timestamp_last_update',timestamp_now)));
		seconds = seconds / 1000;
		var log_out="update not needed for another "+ seconds + " seconds ";
		if(seconds<=60) {
			$('#manual_update_button').before('<h5 title="time to next update: '+Math.round(seconds)+' seconds">next update: '+Math.round(seconds)+' s</h5>');
		} else {
			$('#manual_update_button').before('<h5 title="time to next update: '+Math.round(seconds/60)+' minutes">next update: '+Math.round(seconds/60)+' m</h5>');
		}
	}
	
	
	
	}
}