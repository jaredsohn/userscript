// slickplaid's Torpia Enhancement
// version 2.5.5
// 04-14-2009, updated 10-26-2009
// Copyright (c) 2009, slickplaid
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Torpia Enhancement", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name		Torpia Enhancement Beta
// @namespace	http://hg.slickplaid.net/
// @description	Version 2.5.5 - Ajaxy Goodness for the game Torpia. Once installed, just refresh the page and you're set. Visit http://hg.slickplaid.net/ or http://forum.torpia.hu/showthread.php?t=761 for help.
// @include		http://*.torpia.hu/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var	v = '2.5.5';
// Localization
var dict = {
	err: {
		basic: 'Error.',
		stats: 'Error loading stats.'
	},
	loading: 'Loading.',
	cancel: 'cancel',
	finishCrowns: 'Finish for 3 ',
	rank: 'rank',
	updating: 'updating'
};
var conf = {
	clock: {
		checkBuildStatus: function(ethic){
			$('#upgrade .jClock').each(function(){
				if($(this).attr('itimeleft') === '0'){
					displayBuilding(ethic, true);
					getStats(ethic);
					$(this).removeAttr('itimeleft');
				}
			});
		}
	},
	count: 0
};
var locale = window.location.hostname.split('.');
var server = locale[0];
locale = locale[2];

(function($){
	$.fn.buildMenu = function(options) {
			$.fn.buildMenu.defaults = {
				amt: 0,
				names: 'Error',
				objectID: 0,
				queueType: 0,
				pill: false,
				stype: false
			};
			var o = $.extend($.fn.buildMenu.defaults, options);
			
			return this.each(function () {
				// create references	
				var obj = $(this);
				var slot = obj.attr('id').replace(/building/, '');
				var title = obj.attr('title').replace(/Under construction: /, '').replace(/Level /, '');
				var w = 50/(o.amt+1);
				$('.gen').append('<div class="genmenu slot'+slot+'" slot="'+slot+'"><a class="gentitle" href="/building/building/'+slot+'" alt="'+title+'" title="'+title+'">'+title+'</a></div>');
				
				for(i=0;i<o.amt;i++){
					$('.slot'+slot).append('<a class="genfill" slot="'+slot+'" objectid="'+o.objectID[i]+'" stype="'+o.stype[i]+'" queuetype="'+o.queueType[i]+'" style="width: '+w+'%">'+o.names[i]+'</a>');
					if(o.pill === true) $('.slot'+slot+' a[slot='+slot+']').attr('amount','pill');
				}
				
				$('.slot'+slot).append('<a class="genupgrade" slot="'+slot+'" style="width: '+w+'%">&uarr;</a>');
			});
		};
})(jQuery);
// ---------------------------------- GET STATS -------------------------------------
function getStats(ethic){
	$.ajax({
		type: 'GET',
		url: '/statistics',
		success: function(data){
			var stats = [ $(data).find('.selected td:eq(0)').text().replace(/\./g,','), $(data).find('.selected td:eq(1)').html(), $(data).find('.selected td:eq(2)').html(), $(data).find('.selected td:eq(3)').html(), $(data).find('.selected td:eq(4)').text().replace(/\./g,','), $(data).find('.selected td:eq(5)').html(), $(data).find('.selected td:eq(6)').html().replace(/\./g,','), $(data).find('.selected td:eq(7)').html() ];
			user = (stats[3] != '-') ? '<span class="tes-name g">'+stats[1]+'@<span class="tes-brotherhood g">'+stats[3]+'</span></span>' : '<span class="tes-name g">'+stats[1]+'</span>';
			rank = '<span class="tes-rank g">rank<span class="tes-rank_number g">'+stats[0]+'</span><span class="tes-rank_change g">'+stats[6]+'</span></span>';
			stats = '<div class="tes-stats g"><span class="tes-amulets g">'+stats[4]+'<img src="http://w1.torpia.hu/images/statistics/amulet_rank_dark.gif" alt="Amulets" title="Amulets" /></span></div>';
			$('#stats').html(user+stats+rank);
		},
		error: function(){
			$('#stats').html(dict.err.stats);
		}
	});
}
// ---------------------------- display building --------------------------------------------------
function displayBuilding(ethic, updateMap){
	if($('[itimeleft]')){
		if(updateMap === true){
			$.ajax({
				type: 'GET',
				url: '/village',
				success: function(data){
					var map = $(data).find('.village');
					$('.village').html('').html(map);
					$('#upgrade').html('');
					$('area[itimeleft]').each(function(i){
						var obj = $(this);
						var itl = obj.attr('itimeleft');
						var bl = obj.attr('ibuildinglevel');
						var alt2 = (obj.attr('sbuildingtitle')) ? obj.attr('sbuildingtitle') : obj.attr('alt');
						console.log(alt2);
						var slot = obj.attr('id').replace(/building/, '');
						var img = $('.tile_'+slot).attr('src');
						alt2=alt2.replace(/Under construction: /,'');
						$('#upgrade').append('<tr class="tes-upgrade u'+i+'" slot="'+slot+'"><td>'+i+'</td><td><img src="'+img+'" class="tes-town_img" /></td><td><a slot="'+slot+'" href="/building/building/'+slot+'">'+alt2+' ('+bl+')</a></td><td class="tes-building_time"><span class="jClock" itimeleft="'+itl+'">'+dict.updating+'</span></td><td><a href="/index.php/building/cancel/'+slot+'">'+dict.cancel+'</a></td><td class="tes-crown_finish"><a title="Click to finish for 3 crowns" href="/index.php/building/finishpremiumnow/'+slot+'">'+dict.finishCrowns+'<img alt="crowns" src="/images/premium/premium_crown_dark.gif"/></a></td></tr>');
						$('.u'+i+'[slot]').hover(function(){
							lot = $(this).attr('slot');
							$('.tile_'+lot).css({'border' : '3px solid red', '-moz-border-radius' : '200px'});
						}, function(){
							$('.tile_'+lot).css({'border' : 'none'});
						});
					});
				}
			});
		} else {
		$('#upgrade').html('');
			$('area[itimeleft]').each(function(i){
				var obj = $(this);
				var itl = obj.attr('itimeleft');
				var bl = obj.attr('ibuildinglevel');
				var alt1 = (obj.attr('sbuildingtitle')) ? obj.attr('sbuildingtitle') : obj.attr('alt');
				var slot = obj.attr('id').replace(/building/, '');
				var img = $('.tile_'+slot).attr('src');
				alt1=alt1.replace(/Under construction: /,'');
				$('#upgrade').append('<tr class="tes-upgrade u'+i+'" slot="'+slot+'"><td>'+i+'</td><td><img src="'+img+'" class="tes-town_img" /></td><td><a slot="'+slot+'" href="/building/building/'+slot+'">'+alt1+' ('+bl+')</a></td><td class="tes-building_time"><span class="jClock" itimeleft="'+itl+'">'+dict.updating+'</span></td><td><a href="/index.php/building/cancel/'+slot+'">'+dict.cancel+'</a></td><td class="tes-crown_finish"><a title="Click to finish for 3 crowns" href="/index.php/building/finishpremiumnow/'+slot+'">'+dict.finishCrowns+'<img alt="crowns" src="/images/premium/premium_crown_dark.gif"/></a></td></tr>');
				$('.u'+i+'[slot]').hover(function(){
					lot = $(this).attr('slot');
					$('.tile_'+lot).css({'border' : '3px solid red', '-moz-border-radius' : '200px'});
				}, function(){
					$('.tile_'+lot).css({'border' : 'none'});
				});
			});
		}
	}
}
function ga(){
	var winProp = 'UA-532782-7';
	var domainName = '.torpia.hu';
	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
	try {
		var pageTracker = _gat._getTracker(winProp);
		pageTracker._setDomainName(domainName);
		pageTracker._trackPageview();
	} catch(e) { console.log(e); }
}
function genfo(server, ethic){
	var sel = {
		town : ($('#focusvillage option:selected').text() === '') ? $('.cust_villagesel').text() : $('#focusvillage option:selected').text(),
		tid : $('#focusvillage option:selected').attr('value') 
	};
	$('.genfo thead').append('<tr>'+
		'<th class="la sb" colspan="2">'+sel.town+' (Coords go here!)</th></tr><tr><th class="la sb">Town ID</th><th>Stats</th>'+
	'</tr><tr>'+
		'<td class="ra">'+sel.tid+'</td><td class="sstat">'+dict.loading+'</td></tr>');
	getStats(ethic);
}

$(function(){
	try {
		// check for Evil or Good Ethic
		var ethic = $('body').attr('class');
		// -------------------- timer functions --------------------------
		// time@q1"
		var tick = setInterval(function(){
			for(var i in conf.clock){
				conf.clock[i]();
			}
		},1000);
		// -------------------- ajax functions
		function submitBuild(slot) {
			$('.slot'+slot+' .gentitle').html('Sending...');
			$.ajax({
				type: 'POST',
				url: '/building/upgrade/'+slot,
				async: true,
				success: function(data){
					$('.slot'+slot+' .gentitle').html('<span class="status'+slot+'">Sent!</span>');
					$('.status'+slot).fadeOut(2500, function () {
						$('.slot'+slot+' .gentitle').html($('.slot'+slot+' .gentitle').attr('title'));
					});
					map = $(data).find('.village');
					if(map.find('area').length != '0') {
						$('.village').html('').html(map);
						updateStock(ethic);
					} else {
						$('.status'+slot).text('Failed');
					}
				},
				error: function(){
					slot = $(this).attr('slot');
					$('.status'+slot).text('Error');
					$('.status'+slot).fadeOut(2500, function () {
						$('.slot'+slot+' .gentitle').html($('.slot'+slot+' .gentitle').attr('title'));
					});
			}
		});
		}
		function submitTroop(objectID, slot, amount, queueType, stype){
			$('.slot'+slot+' .gentitle').html('Requesting Max');
			
			if (server == 'w1' || server == 'w2' || server == 'w3') {
				postUrl = '/building/building/'+slot+'/produce';
				qID = 'batchtype';
			} else {
				postUrl = '/building/upgrade/'+slot;
				qID = 'queuetype';
			}
			if(slot === 'undefined'){
				console.log('failed');
				return false;
			}
			conf.count++;
			// have to check for max amount
			$.ajax({
				type: 'GET',
				url: '/building/building/'+slot,
				success: function(data){
					// using an abbreviated/modified version of the getMaxItems() function
					var maximum = false;
					$(data).find('.'+stype).each(function(){
						thisMaximum = parseInt($(this).attr('has') / $(this).attr('need'),10);
						if (maximum == false || thisMaximum < maximum) {
							maximum = thisMaximum;
							reasonformaximum = 'materials';
						}
					});
					roomPerBatch = $(data).find('#batchsize').attr('value');
					totalRoom = roomPerBatch * 5;
					$(data).find('.batchindicator').each(function() {
						if ($(this).attr('type') != stype) {
							totalRoom -= roomPerBatch;
						}
						else {
							totalRoom = totalRoom - $(this).attr('current');
						}
					});
					if (totalRoom < maximum) {
						maximum = totalRoom;
						reasonformaximum = 'batchsize';
					}
					roomForThisItem = $(data).find('#'+stype+'Info').attr('capacity') - $(data).find('#'+stype+'Info').attr('stored'); 
					if (roomForThisItem < maximum) {
						maximum = roomForThisItem;
						reasonformaximum = 'storage';
					}
					var housingleft = $(data).find('#housingleft').attr('value');
					if (housingleft != 'n/a') {
						housingperunit = $(data).find('#'+stype+'Info').attr('housing');
						canhouseunits = parseInt(housingleft / housingperunit,10);
						if (canhouseunits < maximum) {
							maximum = canhouseunits;
							reasonformaximum = 'housing';
						}
					}
					maximum = Math.max( maximum, 0 );
				
					$('.slot'+slot+' .gentitle').html('Able to queue '+maximum);
					if(amount === undefined && amount != 'pill'){
						amount=maximum;
					}
					queryString = 'amount='+amount+'&slot='+slot+'&objectid='+objectID+'&'+qID+'='+queueType;
					sendurl = (amount != 'pill') ? '/building/building/'+slot+'/produce' : '/building/building/'+slot+'/pillory';
					
					
					$.ajax({
						type: 'POST',
						url: sendurl,
						data: queryString,
						success: function(){
							$('.slot'+slot+' .gentitle').html('<span class="status'+slot+'">Queued '+amount+'!</span>');
							$('.slot'+slot+' .gentitle').fadeTo(2500, 1, function(){
								$(this).fadeIn(10).html($('.slot'+slot+' .gentitle').attr('title'));
							});
							conf.count--;
							console.log('out: '+conf.count);
							if(conf.count==0){
								updateStock(ethic);
							}
						},
						error: function(){
							$('.slot'+slot).text('Unable to queue value. ('+maximum+')');
						}
					});
					
					
				},
				error: function(){
					$('.slot'+slot).text('Error retrieving max amount.');
				}
			});
		}
		function updateStock(ethic){
		
			$.ajax({
				type: 'POST',
				url: '/village/getitems/',
				async: true,
				success: function(data){
					res=$(data).find('ul.subheader');
					$('ul.subheader').remove(); // this breaks the ref to changing towns :(
					$('div.container').prepend(res);
					// re-add the reference to change towns since I broke it
					$('select#focusvillage').change(function(e){
						$('form.form').submit();
					});
					d=$(data).find('table tbody').eq(2).html();
					// hover data, quick and dirty
					r=$(data).find('table:eq(1)').html();
					h = [];
					h[0]=r;
					h[1]=r;
					h[2]=r;
					h[3]=r;
					h[4]=r;
					h[5]=$(data).find('table:eq(0)').html();
					h[6]=$(data).find('table').html();
					main=$(data).find('.main table:eq(2)').html();
					
					$('#soverview').html('');
					
					if(ethic=='dark'){
						colSpan=2;
						ethicLabel='Evil';
					}else if(ethic=='light'){
						colSpan=3;
						ethicLabel='Good';
					}
					$('#soverview').append('<table>');
					$('#soverview table').append(d);
					$('#soverview table tr td:nth-child(2), #soverview table tr th').remove();
					
					// add hover effects to resources
					for(i=0;i<7;i++){
						unsafeWindow.$('.resourcelink').eq(i).wTooltip({
							content: h[i]
						});
					}
					unsafeWindow.$('.mediumbar').wTooltip({ content: main });
					displayBuilding(ethic);
				}
			});

		}

		function insertFillButton(){
			if($('.genfill').length != 0){
				$('.gen').append('<div class="genmenu filler" />');
				$('.filler').append('<a class="fillall" style="cursor: pointer;">Fill All</a>');
			}
			$('.fillall').click(function(){
				$('.genfill').each(function(i){
					if($(this).text() === 'Fill'){
						objectID = $(this).attr('objectid');
						slot = $(this).attr('slot');
						amount = $(this).attr('amount');
						queueType = $(this).attr('queuetype');
						stype = $(this).attr('stype');
						if(slot != 'undefined') {
							submitTroop(objectID, slot, amount, queueType, stype);
						}
					}
				});
			});
		}
		// -------------------- content creation
		function contentCreation(){
			$('body').append('<div id="soverview" />');
			$('.main').prepend('<br /><div class="sinfo" /><div class="gen" /><br />');
			if(ethic == 'dark'){
				$('area[title*=Bandit]').buildMenu({ amt: 1, names: ['Axe'], objectID: [7], queueType: [2], stype: ['highway'] });
				$('area[title*=Archery]').buildMenu({ amt: 2, names: ['Ha','Cr'], objectID: [1,2], queueType: [2,2], stype: ['longbow','crossbow'] });
				$('area[title*=Military]').buildMenu({ amt: 2, names: ['Sw','Pi'], objectID: [3,4], queueType: [2,2], stype: ['swordsman','pikeman'] });
				$('area[title*=Stables]').buildMenu({ amt: 2, names: ['Hob','Kni'], objectID: [5,6], queueType: [2,2], stype: ['light_cavalery','heavy_cavalery'] });
				$('area[title*=Seige]').buildMenu({ amt: 3, names: ['Bat','Mang','Treb'], objectID: [8,9,10], queueType: [2,2,2], stype: ['stormram','catapult','trebuchet'] });
				$('area[title*=Sawmill]').buildMenu({ amt: 1, names: ['Fill'], objectID: [1], queueType: [3] });
				$('area[title*=Pill]').buildMenu({ amt: 1, names: ['Fill'], objectID: [11], queueType: [2], pill: true });
				$('area[title*=Temple], area[title*=Barracks], area[title*=Hunting], area[title*=Warehouse], area[title*=Brotherhood], area[title*=Fire], area[title*=Settler], area[title*=Siege], area[title*=Lumberhut], area[title*=Stone quarry]').buildMenu();
			} else {
				$('area[title*=Sawmill]').buildMenu({ amt: 1, names: ['Fill'], objectID: [1], queueType: [3], stype: ['timber'] });
				$('area[title*=Iron foundry]').buildMenu({ amt: 1, names: ['Fill'], objectID: [2], queueType: [3], stype: ['iron'] });
				$('area[title*=Gold foundry]').buildMenu({ amt: 1, names: ['Fill'], objectID: [3], queueType: [3], stype: ['gold'] });
				$('area[title*=Mint]').buildMenu({ amt: 1, names: ['Fill'], objectID: [7], queueType: [3], stype: ['coin'] });
				$('area[title*=Stables]').buildMenu({ amt: 1, names: ['Fill'], objectID: [8], queueType: [3], stype: ['horse'] });
				$('area[title*=Weapon]').buildMenu({ amt: 5, names: ['HB','XB','SH','L','SW'], objectID: [5,10,9,11,4], queueType: [3,3,3,3,3], stype: ['longbow','crossbow','shield','lance','sword'] });
				$('area[title*=Market]').buildMenu({ amt: 1, names: ['Fill Carts'], objectID: [11], queueType: [2], stype: ['tradecart'] });
				$('area[title*=Temple], area[title*=Barracks], area[title*=Hunting], area[title*=Warehouse], area[title*=Brotherhood], area[title*=Fire], area[title*=Settler], area[title*=Siege], area[title*=Farm], area[title*=Chapel], area[title*=Town watch], area[title*=Constructor guild], area[title*=Lumberhut], area[title*=Iron mine], area[title*=Gold mine], area[title*=Stone quarry]').buildMenu();
				$('area[title*=wall]').eq(0).buildMenu();
			}
			$('.gen').prepend('<div class="tes"></div>');
			$('.tes')
				.append('<div id="stats" />')
				.append('<div id="infoholder" />')
				.append('<table id="upgrade" />');
		}
		// -------- Effects/Ajax -----------
		function applyEffects() {
			$('[slot]').hover(function(){
				lot = $(this).attr('slot');
				$('.tile_'+lot).css({'border' : '3px solid red', '-moz-border-radius' : '200px'});
			}, function(){
				$('.tile_'+lot).css({'border' : 'none'});
			});
			
			$('.genupgrade').css('cursor','pointer').click(function(){
				slot = $(this).attr('slot');
				submitBuild(slot);
			});
			$('.genfill').css('cursor','pointer').click(function(){
				objectID = $(this).attr('objectid');
				slot = $(this).attr('slot');
				amount = $(this).attr('amount');
				queueType = $(this).attr('queuetype');
				stype = $(this).attr('stype');
				submitTroop(objectID, slot, amount, queueType, stype);
			});
			$('#soverview').hover(function(){ $('#soverview').fadeTo('fast', 0.1); },function(){ $('#soverview').fadeTo('fast', 0.85); });
		}
		// -------------------- css styling
		$('head').append('<style type="text/css">'+
			'.genmenu {'+
				'float: left;'+
				'border: 1px solid rgb(150, 150, 150);'+
				'width: 292px;'+
				'padding: 2px;'+
				'margin: 1px 1px;'+
				'-moz-border-radius: 1px;'+
				'background: rgb(64, 64, 64);'+
				'height: 20px;'+
				'color: rgb(150, 150, 150);'+
				'z-index: 10000;'+
			'}'+
			'.genmenu:hover { background: #111; }'+
			'.genmenu a { display: block; float: left; text-align: center; height: 112%; text-decoration: none; }'+
			'.genmenu a.gentitle { width: 50%; }'+
			'.genmenu a.gentitle:hover { background: #64992C; color: #F9FFEF; -moz-border-radius: 8px; }'+
			'.genmenu a.genupgrade, a.genfill { width: 50%; }'+
			'a.fillall { width: 100%; }'+
			'.genmenu a.genupgrade:hover, a.genfill:hover, a.fillall:hover { background: #206CFF; color: #E0ECFF; -moz-border-radius: 8px; }'+
			'.gen { overflow: hidden; margin-top: 25px; }'+
			'.notify_bar_fake { display: none; }'+
			'.genfo { background: transparent; color: rgb(200, 200, 200);  margin: 2px 1px; width: 898px; padding: 0px; overflow: hidden; border-top: 1px solid rgb(130, 130, 130); border-left: 1px solid rgb(130, 130, 130); }'+
			'.genfo a { font: normal 10px Verdana,arial,sans-serif; }'+
			'.genfo td, .genfo th { background: rgb(64, 64, 64); border: 1px solid rgb(130, 130, 130); border-top-width: 0; border-left-width: 0; padding: 1px; }'+
			'.ra { text-align: right; }'+
			'.la { text-align: left; }'+
			'.sb { font-weight: bold; }'+
			'div#soverview { border: 2px solid rgb(150, 150, 150); padding: 5px 7px; background: rgb(51, 51, 51) none repeat scroll 0% 0%; opacity: 0.85; position: fixed; z-index: 9000; bottom: 10px; right: 10px; text-align: left; font-family: Arial,Helvetica; font-size: 13px; -moz-border-radius: 5px; color: #fff; }'+
			'div#soverview img, .tes-amulets img, .tes-towns img, .tes-crown_finish a img { height: 15px; width: 15px; }'+
			'.tes-upgrade img { height: 20px; width: 20px; }'+
			'div#soverview .wtooltip { display: none; }'+
			'ul#soverview { display: block; font-size: 0.7em; height: 33px; left: 50%; margin: 0 auto 0 -450px; position: fixed; top: 129px; width: 900px; z-index: 5; }'+
			// tes table styling
			'.tes { font: normal 22px georgia, serif; background: transparent url("http://torpia.slickplaid.net/bg_acuity.gif") repeat top left; width: 100%; -moz-border-radius: 3px; margin: 0 0 10px 0; }'+
			'#stats * { font: georgia,serif; }'+
			'.tes .g { color: #aaa; position:relative; }'+
			'.tes a { text-decoration: none; } .tes a:hover { color: green; }'+
			'.tes .tes-rank_number { font: 50px georgia,serif; }'+
			'.tes .tes-rank { position: absolute; top: 140px; right: 50px; }'+
			'.tes .tes-name { position: absolute; top: 163px; left: 50px; }'+
			'.tes-stats { font: normal 14px georgia, serif; width: 100%; text-align: center; }'+
			
			
			'.tes tr { width: 100%; height: 10px; }'+
			'.tes td, .tes th { font: 14px geogia,serif; border-collapse: collapse; border: 0px none transparent; padding: .1em .3em; color: #6E6E6E;   }'+
			'.tes img.tes-town_img { position: relative; top: -3px; }'+
			'.tes thead th, .tes tfoot th { font: bold 10px helvetica, verdana, arial, sans-serif; border: none; text-align: left; background: #000000;  color: #00FF0C;}'+
			'.tes tbody td a { background: transparent;  text-decoration: none;  color: #9F9F9F; }'+
			'.tes tbody td a:hover { background: transparent;  color: #00FF0C;  }'+
			'.tes tbody th a { font: bold 11px helvetica, verdana, arial, sans-serif; background: transparent; text-decoration: none; font-weight:normal;  color: #9F9F9F; }'+
			'.tes tbody th a:hover {  background: transparent;  color: #00FF0C;  }'+
			'.tes tbody th, .tes tbody td {  vertical-align: top;  text-align: left;  }'+
			'.tes tbody tr:hover {  background: #02425A  }'+
		'</style>');
		if(ethic == 'light'){
			$('head').append('<style type="text/css">'+
				'.genmenu { color: rgb(7, 55, 99); background: rgb(207, 226, 243); }'+
				'.genmenu:hover { background-color: rgb(159, 197, 232); }'+
			'</style>');
		}

		// onload
		if(server == 'w1' || server == 'w2' || server == 'w3'){
			if(window.location.href.indexOf('village') != -1 || window.location.href.indexOf('login') != -1 || window.location.href.indexOf('trade') != -1) {
				contentCreation();
				updateStock(ethic);
				genfo(server, ethic);
				// displayBuilding();
				insertFillButton();
				applyEffects();
				
				//ga();
			}
		}
	} catch(e) { console.debug(e); }
});