// ==UserScript==
// @name           Beta Game
// @namespace      HHG
// @description    BetaGame
// @version        1.3.0
// @include        http://*.ogame.*/game/index.php?*
// @exclude        http://*.ogame.*/game/index.php?page=showmessage*
// @exclude        http://*.ogame.*/game/index.php?page=eventlist*
// @exclude        http://*.ogame.*/game/index.php?page=globalTechtree*
// @exclude        http://*.ogame.*/game/index.php?page=techinfo
// ==/UserScript==

/***************************************\

 Author: HHG 
 License: You can do anything with this 
          script, including modifying,
		  distributing or selling. No 
		  rights reserved.

\***************************************/

var ms = new Date().getTime();

//---------------
//  JQuery
//---------------

	var unsafe = window;
	try{unsafe = unsafeWindow}
	catch (e){}
	var $ = unsafe.$;

//---------------
//  Languages
//---------------

	var lang = {
			org: {
				resources:		'Készletek',
				metal:			'Fém',
				crystal:		'Kristály',
				deu:			'Deutérium',
				planets:		'Bolygó Lista',
				transport:		'Szállítás',
				deployment:		'Telepítés',
				notes:			'Jegyzetek',
				enter_notes:	'Ide írd a jegyzeteidet',
				update:			'Frissítés',
				checkupdate:	'Frissítés keresése',
				foundupdate:	'Új frissítés lehetséges!',
				config:			'Beállítás',
				max:			'Maximum',
				build:			'Épít',
				MaxBuildable:	'Maximális épület szint',
				galaxyit:		'Galaxis segédlet',
				autogala:		'Galaxis nézet',
				autogalascaning:'Galaxis etapogatása...',
				upgradewarning:	'Át kell állítani a beállításokat a frissítés után!'
			},
			tw: {
				resources:		'資源',
				metal:			'金屬',
				crystal:		'晶體',
				deu:			'重氫',
				planets:		'星球列表',
				transport:		'運輸',
				deployment:		'部署',
				notes:			'筆記',
				enter_notes:	'在此輸入筆記',
				update:			'更新',
				checkupdate:	'檢查更新...',
				foundupdate:	'找到更新!',
				config:			'設定',
				max:			'最大',
				build:			'建造',
				MaxBuildable:	'最大建造數量',
				galaxyit:		'銀河系整合工具',
				autogala:		'掃描宇宙',
				autogalascaning:'正在掃描宇宙...',
				upgradewarning:	'更新後請按設定啟動新功能'
			}
		}

	var l = (window.location.href.split('.')[2].split('/')[0]);
	eval('l = lang.'+(window.location.href.split('.')[2].split('/')[0]));
	if(!l)
		lang = lang.org;
	else
		lang = l;

//---------------
//  Images
//---------------

	var img = {
		'close' :	'/9j/4AAQSkZJRgABAQEAYABgAAD/4QBaRXhpZgAATU0AKgAAAAgABQMBAAUAAAABAAAASgMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAOw1ESAAQAAAABAAAOwwAAAAAAAYagAACxj//bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIABIAMAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APbfDfxnjsPCXhqElsroGln87GA/1ratPjbGwH3j+NfCWofBXU9YtvD1zH5u2Xw3ouMH00y2H9K09K+AWrBRxNX5bjsxrRk7R/r7j+oMoyHAShHnqpaLp/wT7p8B+NLv4q/FGHwvb+KvD/hC71W02aFNrWmy3Fjq+pZfbYy3Mc6G0Z/3YjcxShyzqBvEccsvxQ1rXPgr4m0HRtd13QLvxTeQG917w3plm03/AAiULozW8dxqAuDHLdPmImGOHAUu2/Z5Tz/Lv7OunXP7Pfj1/FEng6z8W63YQ79COo3zRWek3g3bbp4FjYzsh2FB5ke0hiDv2PHe/aN1nWf2m49E1XXfC9nZ+O7OFbXV/Edjd+UviGJFKxvPaCIKs6gIPMWTGAy7dvlrF61LMcK8t5pcvtuV2Wvf0+Lt5+Vz5fE5TjFxCqdOU3hOaN5Wj26K9+S+/W1+tj365+Nsa5+9j61xvxl+M0eofBnx3CC3z+FtX7/9OE5r5W1P4B6sVOBL+dc9r3wG1m38F+L51jncReGdXBABOWewnRF+pZlAHckDvXl5dmFadSPu9UfSZ7kmAhh6koVk9H08vU+brL9qj4n6WkdpbfEfx7b2toi28EMXiC7SOGNAFRFUSYVVUAADgAACtux/a1+KpQf8XN+IP/hRXn/xyiivdnsfn32mXR+1j8VMj/i5fxA/8KK8/wDjlIf2sfimVP8Axcv4gf8AhQ3n/wAcooqFuMpX/wC1n8VADj4mfEHp/wBDFef/AByvcP8AgmT8YPFvxf8A2pLPTfFvinxH4o061sby/htdX1Ka9hhuIbaWWGZUlZlEkciI6uBlWVSCCAaKK7sF/Ej6nlZp/utT/C/yP//Z'
	};

//---------------
// Global Vars
//---------------

	var page=RegExp("[\\?&]page=([^&#]*)").exec(window.location.href)[1];
	var session=RegExp("[\\?&]session=([0-9a-z]{12})","i").exec(window.location.href)[1];

//---------------
//  Windows
//---------------

	var win_mouse_left = 0;
	var win_mouse_top = 0;
	var move = function(id){
		$('#'+id+'_title').mousedown(function(e){
			var position = $('#'+id).position();
			win_mouse_left = e.pageX-position.left;
			win_mouse_top = e.pageY-position.top;
			$(document).mouseup(function(){
				$(document).unbind('mousemove');
				var position = $('#'+id).position();
				localStorage.setItem(id+'_win', JSON.stringify({'x':position.left,'y':position.top}));
			});
			$(document).mousemove(function(e){
				$('#'+id).css({'left':Math.max(e.pageX-win_mouse_left, 0)+'px','top':Math.max(e.pageY-win_mouse_top, 0)+'px'});
			});
		});
	}
	var new_win = function(id, title, h, w){
		var win_pos = JSON.parse(localStorage.getItem(id+'_win'));
		if(!win_pos){
			win_pos = {'x':0,'y':0}
			//localStorage.setItem('BGResources_win', JSON.stringify(win_pos));
		}
		$('body').append('<div id="'+id+'"></div>');
		$('#'+id).css({'opacity':'0.8','color':'black','position':'absolute','left':Math.max(win_pos.x, 0)+'px','top':Math.max(win_pos.y, 0)+'px','z-index':'1000','-moz-border-radius': '5px 5px 5px 5px','background-color':'white','height':h+'px','width':w+'px','border':'1px solid', 'border-color':'rgb(236,236,236)'});
		$('#'+id).append('<div id="'+id+'_title"><b>'+title+'</b><div id="'+id+'_close" style="float: right"></div></div><div id="content"></div>');
		$('#'+id+'_close').html('<img src="data:image/gif;base64,'+img.close+'"/>').css('cursor','default').click(function(){$('#'+id).remove()});
		$('#'+id+'_title').css({'cursor':'move','-moz-user-select':'none','background-color':'rgb(236,236,236)','width': w+'px','height': '20px','-moz-border-radius':'5px 5px 0px, 0px','color':'black'});
		move(id);
	}

//---------------
//  Configs
//---------------

	var configs = JSON.parse(localStorage.getItem('configs'));
	if(!configs){
		configs = {
			'BGConfigresources':	true,
			'BGConfigplanets':		true,
			'BGConfignotes':		true,
			'BGConfigmaxbuildable':	true,
			'BGConfiggalaxy':		true
		}
		localStorage.setItem('configs', JSON.stringify(configs));
	}
	$('body').append('<div id="BGConfig">BetaGame | <span id="BGMS"></span> ms | '+lang.config+'</div>');
	$('#BGConfig').css({'-moz-user-select':'none','cursor':'default','opacity':'0.8','color':'black','position':'fixed','left':'0px','top':'0px','z-index':'1000','-moz-border-radius': '0px 0px 5px 0px','background-color':'white','border':'1px solid', 'border-color':'rgb(236,236,236)'});
	$('#BGConfig').click(function(){
		$('#BGConfigwin').remove();
		new_win('BGConfigwin', lang.config, 'auto', 'auto');
		var renewconfig = function(){
			var configtable	 =  '<span class="BGConfig" id="BGConfigresources" style="color:'+(configs.BGConfigresources?'green':'red')+'">'+lang.resources+'</span><br>'+
								'<span class="BGConfig" id="BGConfigplanets" style="color:'+(configs.BGConfigplanets?'green':'red')+'">'+lang.planets+'</span><br>'+
								'<span class="BGConfig" id="BGConfignotes" style="color:'+(configs.BGConfignotes?'green':'red')+'">'+lang.notes+'</span><br>'+
								'<span class="BGConfig" id="BGConfiggalaxy" style="color:'+(configs.BGConfiggalaxy?'green':'red')+'">'+lang.galaxyit+'</span><br>'+
								'<span class="BGConfig" id="BGConfigmaxbuildable" style="color:'+(configs.BGConfigmaxbuildable?'green':'red')+'">'+lang.MaxBuildable+'</span><br>';
			$('#BGConfigwin>#content').html(configtable);
			$('.BGConfig').click(function(){
			var configitem	= $(this).attr('id');
			eval('configs.'+configitem+'=!configs.'+configitem);
			localStorage.setItem('configs', JSON.stringify(configs));
			renewconfig();
		});
		};
		renewconfig();
	});

//---------------
//  Resources
//---------------
	if(configs.BGConfigresources){
		new_win('BGResources', lang.resources, 'auto', 'auto');
		(function(){
			var met = $('#metal_box').attr('title').replace(/[\,\.]/g,'').match(/[\d]+/g);
			var cry = $('#crystal_box').attr('title').replace(/[\,\.]/g,'').match(/[\d]+/g);
			var deu = $('#deuterium_box').attr('title').replace(/[\,\.]/g,'').match(/[\d]+/g);
			var resources = {
				'metal':		parseInt(met[0]),
				'max_metal':	parseInt(met[1]),
				'pro_metal':	parseInt(met[2]),
				'crystal':		parseInt(cry[0]),
				'max_crystal':	parseInt(cry[1]),
				'pro_crystal':	parseInt(cry[2]),
				'deu':			parseInt(deu[0]),
				'max_deu':		parseInt(deu[1]),
				'pro_deu':		parseInt(deu[2]),
			};
			var renew_resource = function(){
				var gettime = function(full){
					hours	= Math.floor(full/3600);
					minutes = Math.floor((full-hours*3600)/60);
					seconds = Math.floor((full-hours*3600-minutes*60));
					if(minutes<=9)minutes="0"+minutes;
					if(seconds<=9)seconds="0"+seconds;
				}
				var table;
				//Metal
				resources.metal = resources.pro_metal/3600+resources.metal;
				var hours,minutes,seconds;
				gettime((resources.max_metal-resources.metal)/resources.pro_metal*3600);
				if(resources.metal>=resources.max_metal)seconds = minutes = hours = '-';
				table = '<table width=100% class="BGResourcestable"><tr><td width=50 class="BG">'+lang.metal+'</td><td width=100 class="BG"><div style="background-color:'+((hours<4||resources.metal/resources.max_metal*100>=100)?'red':'green')+';height:15px;width:'+Math.min(parseInt(resources.metal/resources.max_metal*100), 100)+'px"></div></td><td class="BG">'+parseInt(resources.metal/resources.max_metal*100)+'%</td><td class="BG">'+hours+':'+minutes+':'+seconds+'</td></tr>';
				//Crystal
				resources.crystal = resources.pro_crystal/3600+resources.crystal;
				gettime((resources.max_crystal-resources.crystal)/resources.pro_crystal*3600);
				if(resources.crystal>=resources.max_crystal)seconds = minutes = hours = '-';
				table += '<tr><td width=50 class="BG">'+lang.crystal+'</td><td width=100 class="BG"><div style="background-color:'+((hours<4||resources.crystal/resources.max_crystal*100>=100)?'red':'green')+';height:15px;width:'+Math.min(parseInt(resources.crystal/resources.max_crystal*100), 100)+'px"></div></td><td class="BG">'+parseInt(resources.crystal/resources.max_crystal*100)+'%</td><td class="BG">'+hours+':'+minutes+':'+seconds+'</td></tr>';
				//Deu
				resources.deu = resources.pro_deu/3600+resources.deu;
				gettime((resources.max_deu-resources.deu)/resources.pro_deu*3600);
				if(resources.deu>=resources.max_deu)seconds = minutes = hours = '-';
				table += '<tr><td width=50 class="BG">'+lang.deu+'</td><td width=100 class="BG"><div style="background-color:'+((hours<4||resources.deu/resources.max_deu*100>=100)?'red':'green')+';height:15px;width:'+Math.min(parseInt(resources.deu/resources.max_deu*100), 100)+'px"></div></td><td class="BG">'+parseInt(resources.deu/resources.max_deu*100)+'%</td><td class="BG">'+hours+':'+minutes+':'+seconds+'</td></tr></table>';

				$('#BGResources>#content').html(table);
				$('td.BG').css({'border':'1px solid silver'});
				setTimeout(function(){renew_resource()},1000);
				return false;
			}
			renew_resource();
		})();
	}

//---------------
//  Planets List
//---------------
	(function(){
		if(!configs.BGConfigplanets)return false;
		new_win('BGPlanets', lang.planets, 'auto', 'auto');
		var table = '<table width=100% class="BGResourcestable">';
		var planet_count = $('.planet-name').size();
		var shortcuts = new Array;
		for(var i=0;i<planet_count;i++){
			var plink	 = $('.planetlink').eq(i).attr('href');
			var planet	 = $('.planet-name').eq(i).text();
			var coord	 = $('.planet-koords').eq(i).text().replace(/(\[|\])/g,'');
			var url		 = 'index.php?page=fleet1&session='+session+'&galaxy='+coord.match(/\d+/g)[0]+'&system='+coord.match(/\d+/g)[1]+'&position='+coord.match(/\d+/g)[2]+'&type=1&mission=';
			var size = $('.smallplanet').eq(i).children('a').attr('title').split('(')[1].split(')')[0];
			if(size.split('/')[1]-size.split('/')[0]<5)size = '<font color="red">'+size+'</font>';
			var shortcut = i+1;
			if(shortcut==10)shortcut=0;
			if(shortcut>10)shortcut='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(shortcut-11);
			shortcuts[i+1]=plink;
			table += '<tr><td class="BG">Ctrl+'+shortcut+'</td><td class="BG"><a href="'+plink+'">'+planet+'</a></td><td class="BG">'+coord+'</td><td class="BG">'+size+'</td><td><a href="'+url+'3"><img src="img/layout/icon-transport.gif" title="'+lang.transport+'" /></a></td><td><a href="'+url+'4"><img src="img/layout/icon-stationieren.gif" title="'+lang.deployment+'" /></a></td></tr>';
		}
		$(document).keypress(function(e){
			if(!e.ctrlKey)return true;
			var shortcut = e.which-48;
			if(shortcut>48)shortcut-=39;
			shortcut = shortcuts[shortcut];
			if(!shortcut)return true;
			window.location=shortcut;
			return false;
		});
		$('#BGPlanets>#content').html(table+'</table>');
		$('td.BG').css({'border':'1px solid silver'});
	})();
	

//---------------
//  Notes
//---------------
	(function(){
		if(!configs.BGConfignotes)return false;
		var BGNotes = localStorage.getItem('BGNotes');
		if(!BGNotes)BGNotes = lang.enter_notes;
		new_win('BGNotes', lang.notes, 200, 200);
		$('#BGNotes>#content').html('<textarea id="BGNotesTextarea"></textarea>');
		$('#BGNotesTextarea').css({'font-size':'13px','height':'180px', 'width':'190px'}).val(BGNotes).change(function(){
			localStorage.setItem('BGNotes', $('#BGNotesTextarea').val());
		});
	})();

//---------------
//  Update
//---------------

	var version = '1.3.0'
	var update = function(){
		var now = parseInt((new Date().getTime()-1288519265306)/1000);
		if(GM_getValue('lastcheckupdate', -1)===-1)
			GM_setValue('lastcheckupdate', now);
		if(GM_getValue('updatefound', 0)==0&&now-GM_getValue('lastcheckupdate', now)<3600)
			return;
		GM_setValue('lastcheckupdate', now);
		GM_xmlhttpRequest({
			url: 'http://userscripts.org/scripts/source/89292.meta.js', 
			method: 'GET',
			onload: function(data){
				GM_getValue('lastcheckupdate', 0)
				var newest = data.responseText.match(/@version\s+([\d.]+)/)[1]
				if(newest!=version){
					GM_setValue('updatefound', 1);
					new_win('BGUpdateScript', lang.update, 100, 200);
					$('#BGUpdateScript>#content').html('<b><a href ="http://userscripts.org/scripts/source/89292.user.js">/!\\'+lang.foundupdate+'</a></b><br>'+lang.upgradewarning);
				}else if(newest==version){
					GM_setValue('updatefound', 0);
				}
			},
		});
	};
	update();

//---------------
//  Galaxy
//---------------
	(function(){
		if(!configs.BGConfiggalaxy) return;
		if(page!='galaxy')return;
		var inied = false;
		var scan=false;
		var getonextsys = function(){
			var galaxy = parseInt($('#galaxy_input').val(),10);
			var system = parseInt($('#system_input').val(),10);
			if(system==499){
				system=0;
				galaxy++;
			}
			if(galaxy==10){
				clearInterval(scan);
				$('#BGGalaxyScan').text(lang.autogala);
				scan=false;
				return;
			}
			system++;
			setTimeout(function(){$("#galaxy_input").val(galaxy);$("#system_input").val(system);window['submitForm']();},Math.floor(Math.random()*2000));
		}
		$("#galaxyContent").ajaxSuccess(function(){
			if(!inied){
				inied = true;
				new_win('BGGalaxy', lang.galaxyit, 50, 250);
				$('#BGGalaxy>#content').html('<span id="BGGalaxyScan">'+lang.autogala+'</span>');
				$('#BGGalaxyScan').click(function(){
					$(this).text(lang.autogalascaning);
					if(!scan)scan=setInterval(function(){getonextsys();},3000);
					else{$('#BGGalaxyScan').text(lang.autogala);clearInterval(scan);scan=false;}
				});
			}
		});
	})();

//---------------
//  Max Buildable
//---------------
	(function(){
		if(!configs.BGConfigmaxbuildable)
			return;
		if(page=='defense'||page=='shipyard'){
			$("#detail").ajaxSuccess(function(){
				if($('#costs').length==0)
					return;
				$('#BGMaxBuildable').remove();
				new_win('BGMaxBuildable', lang.MaxBuildable, 'auto', 'auto');
				var costs			= $('#costs>#resources>.metal.tipsStandard>span');
				var name			= $('#costs>#resources>.metal.tipsStandard>img');

				var resource		= new Array;
				var metal			= $('#resources>#metal_box>img').attr('src').split('/').pop();
				var crystal			= $('#resources>#crystal_box>img').attr('src').split('/').pop();
				var deuterium		= $('#resources>#deuterium_box>img').attr('src').split('/').pop();
				resource[metal]		= $('#resources>#metal_box>.value>#resources_metal').text().replace(/\s|\,|\./g, '');
				resource[crystal]	= $('#resources>#crystal_box>.value>#resources_crystal').text().replace(/\s|\,|\./g, '');
				resource[deuterium]	= $('#resources>#deuterium_box>.value>#resources_deuterium').text().replace(/\s|\,|\./g, '');

				var max_num	= -1;

				for(var i=0; i<costs.length; i++){
					var cost = $(costs).eq(i).text().replace(/\s|\,|\./g, '');
					var max  = Math.floor(resource[$(name).eq(i).attr('src').split('/').pop()]/cost);
					if(max<max_num||max_num==-1)
						max_num = max;
				}
				max_num = Math.floor(max_num);
				$('#BGMaxBuildable>#content').append('<div id="max_num">'+lang.max+': <span class="fill_num">'+max_num+'</span>');
				$('#BGMaxBuildable>#content').append('<center><table><tr><td class="add_num BG">+5</td><td class="add_num BG">+10</td><td class="add_num BG">+20</td></tr><tr><td class="add_num BG">+50</td><td class="add_num  BG">+100</td><td class="add_num BG">+250</td></tr></table></center>');
				$('#BGMaxBuildable>#content').append('<a onclick="sendBuildRequest();">'+lang.build+'</span></div>');
				$('td.BG').css({'border':'1px solid silver'});
				$('.fill_num').click(function(){
					var num = $(this).text();
					$('#content>#costswrapper>#costs>#resources>.enter>#number').val(num);
				});
				$('.add_num').click(function(){
					var add = $(this).text();
					var orig = $('#content>#costswrapper>#costs>#resources>.enter>#number').val();
					if(!orig)
						orig = 0;
					$('#content>#costswrapper>#costs>#resources>.enter>#number').val(parseInt(orig)+parseInt(add));
				});
			});
		}
	})();

$("#BGMS").text(new Date().getTime()-ms);

//Todo:顯示建造中建築和艦隊移動的訊息