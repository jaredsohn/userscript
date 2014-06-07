// ==UserScript==
// @name           Beta Game
// @namespace      HHG
// @description    BetaGame
// @version        1.8.6
// @include        http://*ogame.*/game/index.php?page=movement*
// @include        http://*ogame.*/game/index.php?page=overview*
// @include        http://*ogame.*/game/index.php?page=resource*
// @include        http://*ogame.*/game/index.php?page=station*
// @include        http://*ogame.*/game/index.php?page=trader*
// @include        http://*ogame.*/game/index.php?page=research*
// @include        http://*ogame.*/game/index.php?page=shipyard*
// @include        http://*ogame.*/game/index.php?page=defense*
// @include        http://*ogame.*/game/index.php?page=fleet*
// @include        http://*ogame.*/game/index.php?page=galaxy*
// @include        http://*ogame.*/game/index.php?page=alliance*
// @include        http://*ogame.*/game/index.php?page=premium*
// @include        http://*ogame.*/game/index.php?page=statistics*
// @include        http://*ogame.*/game/index.php?page=messages*
// @include        http://*ogame.*/game/index.php?page=empire*
// @include        http://*ogame.*/game/index.php?page=network*
// @include        http://*ogame.*/game/index.php?page=eventList*
// @include        http://*ogame.*/game/index.php?page=highscore*
// ==/UserScript==

/********************************************************************************************\

 Author: HHG 
 No rights reserved.

\********************************************************************************************/

var ms = new Date().getTime();

//------------------------------
//  Adding JQuery
//------------------------------

	var unsafe = window;
	try{unsafe = unsafeWindow}
	catch (e){}
	var $ = unsafe.$;

//------------------------------
//  Languages
//------------------------------

	var lang = {
			org: {
				BGWhatsNew:			'1.8.6: Fixes for Ogame 5.0.1',
				resources:			'Resources',
				metal:				'Metal',
				crystal:			'Crystal',
				deu:				'Deuterium',
				planets:			'List of planets',
				transport:			'Transport to',
				deployment:			'Deployment to',
				notes:				'Notes',
				enter_notes:		'Type notes here',
				update:				'Update',
				checkupdate:		'Checking for update...',
				foundupdate:		'Update avaliable!',
				config:				'Config.',
				max:				'Maximum',
				build:				'Build',
				MaxBuildable:		'Maximum number of Constructing',
				galaxyit:			'Galaxy Scanning',
				autogala:			'Scan Galaxy',
				autogalascaning:	'Scanning Galaxy...\nClick to stop',
				upgradewarning:		'You may click on Config at the bottom and enable new feature(s) after upgrading(if any)',
				fleetformation:		'Fleet formation',
				newfleetformation:	'Create New Formation',
				formationname:		'Name of new formation',
				s204:				'Light Fighter',
				s205:				'Heavy Fighter',
				s206:				'Cruiser',
				s207:				'Battleship',
				s215:				'Battlecruiser',
				s211:				'Bomber',
				s213:				'Destroyer',
				s214:				'Deathstar',
				s202:				'Small Cargo Ship',
				s203:				'Large Cargo Ship',
				s208:				'Colony Ship',
				s209:				'Recycler',
				s210:				'Espionage Probe',
				save:				'Save',
				deleteformation:	'Delete seleted formation',
				saved:				'Saved',
				deleted:			'Deleted',
				scorerec:			'Score Records',
				scorerecwarning:	'Score records will be updated every 6 hours',
				reset:				'Reset',
				noscorerec:			'No sufficient data yet. Score records will be updated every 6 hours. Please wait patiently.',
				resetconfirm:		'Do you want to reset the data?',
				WhatsNew:			'What\'s New',
				from:				'From',
				ResRand:			'FS Resource Randomizer',
				randomize:			'Randomize to ',
				bitValue:			{'100':'hundreds','1000':'thousands','10000':'ten thousands','100000':'hundred thousands'},
				renew:				'Renew',
				AttackAlarm:		'Attack Notifier',
				On:					'On',
				Off:				'Off',
				AlarmOnSpy:			'Notify me if spied',
				refreshTime:		'Refresh time',
				second:				'sec',
				TestSound:			'Test Sound',
				MerchantExistConfirm:	'A merchant is already exist. Are you sure you want to call for a new merchant?',
				MerchantWarning:	'Merchant Warning',
				selectmission:		'Mission',
				priority:			'Priority',
				EvenlyDistributed:	'Evenly Distributed'
			},
			tw: {
				BGWhatsNew:			'1.8.6: Ogame 5.0.1 補丁',
				resources:			'資源',
				metal:				'金屬',
				crystal:			'晶體',
				deu:				'重氫',
				planets:			'星球列表',
				transport:			'運輸到',
				deployment:			'部署到',
				notes:				'筆記',
				enter_notes:		'在此輸入筆記',
				update:				'更新',
				checkupdate:		'檢查更新…',
				foundupdate:		'找到更新!',
				config:				'設定',
				max:				'最大',
				build:				'建造',
				MaxBuildable:		'最大建造量',
				galaxyit:			'銀河掃描工具',
				autogala:			'掃描宇宙',
				autogalascaning:	'正在掃描宇宙…\n按一下停止',
				upgradewarning:		'更新後請按設定啟動新功能(如有)',
				fleetformation:		'艦隊編隊',
				newfleetformation:	'建立新編隊',
				formationname:		'新編隊名稱',
				s204:				'輕型戰鬥機',
				s205:				'重型戰鬥機',
				s206:				'巡洋艦',
				s207:				'戰列艦',
				s215:				'戰鬥巡洋艦',
				s211:				'導彈艦',
				s213:				'毀滅者',
				s214:				'死星',
				s202:				'小型運輸艦',
				s203:				'大型運輸艦',
				s208:				'殖民船',
				s209:				'回收船',
				s210:				'間諜衛星',
				save:				'確定',
				deleteformation:	'刪除己選擇的編隊',
				saved:				'已儲存',
				deleted:			'已刪除',
				scorerec:			'分數紀錄',
				scorerecwarning:	'分數紀錄每六小時更新一次',
				reset:				'重設',
				noscorerec:			'數據不足。分數紀錄每六小時更新一次，請耐心等候。',
				resetconfirm:		'確認重設數據?',
				WhatsNew:			'新功能',
				from:				'從',
				ResRand:			'FS隨機裝載資源',
				randomize:			'產生隨機數至',
				bitValue:			{'100':'百位','1000':'千位','10000':'萬位','100000':'十萬位'},
				renew:				'更新',
				AttackAlarm:		'攻擊警報',
				On:					'開',
				Off:				'關',
				AlarmOnSpy:			'間諜警報',
				refreshTime:		'檢測間隔時間',
				second:				'秒',
				TestSound:			'測試聲音',
				MerchantExistConfirm:	'商人已經存在。是否呼叫新商人？',
				MerchantWarning:	'商人警告',
				selectmission:		'任務',
				priority:			'優先順序',
				EvenlyDistributed:	'平均分配'
			}
		}

	lang=lang[window.location.hostname.split('.').pop()]||lang.org;

//------------------------------
// Global Vars
//------------------------------

	var page=RegExp("[\\?&]page=([^&#]*)").exec(window.location.href)[1];
	var dir=unescape(window.location.href.substring(0,(window.location.href.lastIndexOf("/")) + 1));

//------------------------------
//  Windows
//------------------------------
	function registerWindow(obj){
		$('#'+obj.attr('id')+'_title').mousedown(function(e){
			var win=$('#'+obj.attr('id'));
			win.css('z-index',parseInt(win.css('z-index'))+1);
			var position = obj.position();
			var cursorPos = {top:e.pageY-position.top,left:e.pageX-position.left};
			$(document).mousemove(function(e){
				obj.offset({top:Math.max(e.pageY-cursorPos.top,32),left:Math.max(e.pageX-cursorPos.left,0)});
			});
			$(document).mouseup(function(){
				$(document).unbind('mousemove');
				var position = obj.position();
				localStorage.setItem(obj.attr('id')+'_win', JSON.stringify({x:position.left,y:position.top}));
			});
		});
	}
	var new_win = function(id,title,h,w){
		var winPos = JSON.parse(localStorage.getItem(id+'_win'))||{x:0,y:32};
		$('body').append('<div id="'+id+'"></div>');
		var obj = $('#'+id);
		obj.css({opacity:0.8,color:'black',position:'absolute',left:Math.max(winPos.x,0),top:Math.max(winPos.y, 32),'z-index':1,'background-color':'white',height:h+20,width:w,border:'1px solid', 'border-color':'rgb(216,216,216)'});
		$('#'+id).append('<div id="'+id+'_title"><b>'+title+'</b><a id="'+id+'_close" style="float: right">×</a></div><div id="content"></div>');
		$('#'+id+'_close').css('cursor','default').click(function(){$('#'+id).animate({height:0},'slow', function(){$('#'+id).remove();});});
		$('#'+id+'_title').css({cursor:'move','-moz-user-select':'none','background-color':'rgb(216,216,216)','text-align':'center',width: w,height:20,color:'black'});
		registerWindow(obj);
	}

//------------------------------
//  Update
//------------------------------
	var version = '1.8.6';
	$('#BGVersion').text(version);
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
					$('#BGUpdateScript>#content').html('<b><a id="BGUpdatescript" href ="http://userscripts.org/scripts/source/89292.user.js">/!\\'+lang.foundupdate+'</a></b><br>'+lang.upgradewarning);
					$('#BGUpdatescript').click(function(){localStorage.removeItem('BGWhatsNew')});
				}else if(newest==version){
					GM_setValue('updatefound', 0);
				}
			},
		});
	};
	update();

//------------------------------
//  Configs
//------------------------------

	var configs = JSON.parse(localStorage.getItem('configs'));
	if(!configs){
		configs = {
			BGConfigresources:		true,
			BGConfigplanets:		true,
			BGConfignotes:			true,
			BGConfigmaxbuildable:	true,
			BGConfiggalaxy:			true,
			BGConfigfleetformation:	true,
			BGConfigScoreRec:		true,
			BGConfigResRand:		true,
			BGConfigAttackAlarm_disabled:	false,
			BGConfigMerchantWarning_disabled:	false
		}
		localStorage.setItem('configs', JSON.stringify(configs));
	}
	$('body').append('<div id="BGConfig_Bar">BetaGame <span id="BGVersion"></span> | <span id="BGMS"></span> ms | <span id="BGConfig">'+lang.config+'</span> <span id="BGConfig_Close">×</span></div>');
	$('#BGConfig_Close').click(function(){$('#BGConfig_Bar').animate({height:0},'slow', function(){$('#BGConfig_Bar').remove();})});
	$('#BGConfig_Bar').css({'-moz-user-select':'none',cursor:'default',opacity:'0.8',color:'black',position:'fixed',left:0,bottom:0,'z-index':1000,'background-color':'white',border:'1px solid', 'border-color':'rgb(236,236,236)'});
	$('#BGConfig').css({cursor:'pointer'}).click(function(){
		$('#BGConfigwin').remove();
		new_win('BGConfigwin', lang.config, 'auto', 'auto');
		var renewconfig = function(){
			var configtable	 =  '<span class="BGConfig" id="BGConfigresources">'+(configs.BGConfigresources?'✓':'×')+' '+lang.resources+'</span><br>'+
								'<span class="BGConfig" id="BGConfigplanets">'+(configs.BGConfigplanets?'✓':'×')+' '+lang.planets+'</span><br>'+
								'<span class="BGConfig" id="BGConfignotes">'+(configs.BGConfignotes?'✓':'×')+' '+lang.notes+'</span><br>'+
								'<span class="BGConfig" id="BGConfiggalaxy">'+(configs.BGConfiggalaxy?'✓':'×')+' '+lang.galaxyit+'</span><br>'+
								'<span class="BGConfig" id="BGConfigmaxbuildable">'+(configs.BGConfigmaxbuildable?'✓':'×')+' '+lang.MaxBuildable+'</span><br>'+
								'<span class="BGConfig" id="BGConfigfleetformation">'+(configs.BGConfigfleetformation?'✓':'×')+' '+lang.fleetformation+'</span><br>'+
								'<span class="BGConfig" id="BGConfigScoreRec">'+(configs.BGConfigScoreRec?'✓':'×')+' '+lang.scorerec+'</span><br>'+
								'<span class="BGConfig" id="BGConfigResRand">'+(configs.BGConfigResRand?'✓':'×')+' '+lang.ResRand+'</span><br>'+
								'<span class="BGConfig" id="BGConfigAttackAlarm_disabled">'+(configs.BGConfigAttackAlarm_disabled?'×':'✓')+' '+lang.AttackAlarm+'</span><br>'+
								'<span class="BGConfig" id="BGConfigMerchantWarning_disabled">'+(configs.BGConfigMerchantWarning_disabled?'×':'✓')+' '+lang.MerchantWarning+'</span><br>';
			$('#BGConfigwin>#content').html(configtable);
			$('.BGConfig').css({cursor:'pointer'}).click(function(){
			var configitem	= $(this).attr('id');
			configs[configitem]=!configs[configitem];
			localStorage.setItem('configs', JSON.stringify(configs));
			renewconfig();
		});
		};
		renewconfig();
	});

//------------------------------
//  Resources
//------------------------------
	if(configs.BGConfigresources){
		(function(){
			$.get(dir+"index.php?page=fetchResources&ajax=1",function(res){
				new_win('BGResources', lang.resources, 'auto', 'auto');
				$('#BGResources>#content').html('<table><tr class="BG"><td>'+lang.metal+'</td><td width=100><div id="BGResources_Metal" style="height:15px"></div></td><td id="BGResources_Metal_Percent">100%</td><td id="BGResources_Metal_Time">00:00:00</td></tr><tr class="BG"><td>'+lang.crystal+'</td><td width=100><div id="BGResources_Crystal" style="height:15px"></div></td><td id="BGResources_Crystal_Percent">100%</td><td id="BGResources_Crystal_Time">00:00:00</td></tr><tr class="BG"><td>'+lang.deu+'</td><td width=100><div id="BGResources_Deu" style="height:15px"></div></td><td id="BGResources_Deu_Percent">100%</td><td id="BGResources_Deu_Time">00:00:00</td></tr></table>');
				$('tr.BG>td').css({'border':'1px solid silver'});
				res = JSON.parse(res);
				var percent_full;
				var initial_time=new Date().getTime();
				var past_time=0;
				function format_time(sec){
					if(sec==Infinity||sec<0)
						return 'N/A';
					hours	= Math.floor(sec/3600);
					minutes = Math.floor((sec-hours*3600)/60);
					seconds = Math.floor((sec-hours*3600-minutes*60));
					if(minutes<=9)minutes="0"+minutes;
					if(seconds<=9)seconds="0"+seconds;
					return hours+':'+minutes+':'+seconds;
				}
				function renew(){
					past_time=(new Date().getTime()-initial_time)/1000;
					initial_time=new Date().getTime();
					res.metal.resources.actual+=res.metal.resources.production*past_time;
					res.crystal.resources.actual+=res.crystal.resources.production*past_time;
					res.deuterium.resources.actual+=res.deuterium.resources.production*past_time;
					percent_full = parseInt(100*res.metal.resources.actual/res.metal.resources.max);
					function res_color(pc){
						if(pc>=100) return 'red';
						if(pc>=85) return 'orange';
						if(pc>=75) return 'yellow';
						return 'green';
					}
					$('#BGResources_Metal').css({width:(Math.min(100,percent_full)+'%'),'background-color':res_color(percent_full)});
					$('#BGResources_Metal_Percent').text(percent_full+'%');
					$('#BGResources_Metal_Time').text(format_time((res.metal.resources.max-res.metal.resources.actual)/res.metal.resources.production));
					percent_full = parseInt(100*res.crystal.resources.actual/res.crystal.resources.max);
					$('#BGResources_Crystal').css({width:(Math.min(100,percent_full)+'%'),'background-color':res_color(percent_full)});
					$('#BGResources_Crystal_Percent').text(percent_full+'%');
					$('#BGResources_Crystal_Time').text(format_time((res.crystal.resources.max-res.crystal.resources.actual)/res.crystal.resources.production));
					percent_full = parseInt(100*res.deuterium.resources.actual/res.deuterium.resources.max);
					$('#BGResources_Deu').css({width:(Math.min(100,percent_full)+'%'),'background-color':res_color(percent_full)});
					$('#BGResources_Deu_Percent').text(percent_full+'%');
					$('#BGResources_Deu_Time').text(format_time((res.deuterium.resources.max-res.deuterium.resources.actual)/res.deuterium.resources.production));
				}
				renew();
				setInterval(function(){renew();},1000);
			});
		})();
	}

//------------------------------
//  Planets List
//------------------------------
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
			var url		 = 'index.php?page=fleet1&galaxy='+coord.match(/\d+/g)[0]+'&system='+coord.match(/\d+/g)[1]+'&position='+coord.match(/\d+/g)[2]+'&type=1&mission=';
			var size = $('.smallplanet').eq(i).children('a').attr('title').split('(')[1].split(')')[0];
			if(size.split('/')[1]-size.split('/')[0]<5)size = '<font color="red">'+size+'</font>';
			var shortcut = i+1;
			if(shortcut==10)shortcut=0;
			if(shortcut>10)shortcut='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(shortcut-11);
			shortcuts[i+1]=plink;
			table += '<tr><td class="BG">'+shortcut+'</td><td class="BG"><a href="'+plink+'">'+planet+'</a></td><td class="BG">'+coord+'</td><td class="BG">'+size+'</td><td class="BG"><a class="BGPlanetListSelectMissions" style="cursor:pointer" url="'+url+'">'+lang.selectmission+'<span class="BGPlanetListSelectMissions" style="font-size:8pt">▼</span></a></td></tr>';
		}
		$('#BGPlanets>#content').html(table+'</table>');
		$('td.BG').css({'border':'1px solid silver'});
		$('.BGPlanetListSelectMissions').click(function(){
			var pos=$(this).offset();
			var tabbleH=$(this).parent().height();
			var url=$(this).attr('url');
			$('body').append('<div id="BGPlanetListSelectMissionMenu">'+
				'<a href="'+url+'3" class="BGPlanetListSelectMission" id="3" style="background-position: -150px 0px;"></a>'+
				'<a href="'+url+'4" class="BGPlanetListSelectMission" id="4" style="background-position: -90px 0px;"></div>'+'</a>');
			$('.BGPlanetListSelectMission').css({'background-image':'url(http://gf2.geo.gfsrv.net/cdndf/0210bdaf0d408992ab38c453c5ba7d.jpg)','background-repeat':'no-repeat',cursor:'pointer',overflow:'hidden',width:'30px',height:'30px','float':'left','background-size': '330px 90px'}).mouseover(function(){
				$(this).css('background-position',($(this).css('background-position').split(' ')[0]+' -30px'));
			}).mouseout(function(){
				$(this).css('background-position',($(this).css('background-position').split(' ')[0]+' 0px'));
			}).click(function(){
				url+$(this).attr('id');
			});
			$('#BGPlanetListSelectMissionMenu').css({position:'absolute',left:pos.left,top:pos.top,'padding-top':tabbleH,'z-index':(parseInt($('#BGPlanets').css('z-index'))+1)});
			/*$('#BGPlanetListSelectMissionMenu').mouseleave(function(){
				$('#BGPlanetListSelectMissionMenu').remove();
			});*/
			$("body").click(function(e){
				if (!$(e.target).hasClass('BGPlanetListSelectMissions'))
				$('#BGPlanetListSelectMissionMenu').remove();
            });

		});
		$(document).keypress(function(e){
			if(!e.altKey)return true;
			var shortcut = e.which-48;
			if(shortcut>48)shortcut-=39;
			shortcut = shortcuts[shortcut];
			if(!shortcut)return true;
			window.location=shortcut;
			return false;
		});
	})();
	

//------------------------------
//  Notes
//------------------------------
	(function(){
		if(!configs.BGConfignotes)return false;
		var BGNotes = localStorage.getItem('BGNotes');
		if(!BGNotes)BGNotes = lang.enter_notes;
		new_win('BGNotes', lang.notes, 'auto', 'auto');
		$('#BGNotes>#content').html('<textarea id="BGNotesTextarea"></textarea>');
		$('#BGNotesTextarea').css({'font-size':'12px','height':200, 'width':170}).val(BGNotes).change(function(){
			localStorage.setItem('BGNotes', $('#BGNotesTextarea').val());
		});
	})();

//------------------------------
//  Galaxy
//------------------------------
	(function(){
		if(!configs.BGConfiggalaxy||page!='galaxy')return;
		var stop_scan=true;
		new_win('BGGalaxy', lang.galaxyit, 'auto', 150);
		$('#BGGalaxy>#content').html('<span id="BGGalaxyScan">'+lang.autogala+'</span>').css({cursor:'pointer','text-align':'center'});
		$('#BGGalaxyScan').click(function(){
			var timer;
			if(stop_scan){//Begin scanning
				stop_scan=false;
				$(this).text(lang.autogalascaning);
				var galaxy,system,next_system,next_galaxy;
				function renewGalaxy(){
					galaxy = parseInt($('#galaxy_input').val(),10);
					system = parseInt($('#system_input').val(),10);
					next_system = system+1;
					next_galaxy = galaxy;
					if(next_system>499){
						next_system = 1;
						next_galaxy += 1;
					}
					if(next_galaxy>9){
						clearTimeout(timer);
						stop_scan=true;
						$('#BGGalaxyScan').text(lang.autogala);
						return;
					}
					timer = unsafeWindow.setTimeout(function(){
						if(stop_scan)return;
						$("#galaxy_input").val(next_galaxy);
						$("#system_input").val(next_system);
						$('#showbutton').click();
					},Math.floor(1000+Math.random()*2500));
				}
				renewGalaxy();
				$("#galaxyContent").ajaxSuccess(function(e, xhr, settings){
					if(stop_scan==true||(!settings.url.match('page=galaxyContent')))return;
					renewGalaxy();
				});
			}else{//Stop scanning
				clearTimeout(timer);
				stop_scan=true;
				$(this).text(lang.autogala);
			}
		});
	})();

//------------------------------
//  Max Buildable
//------------------------------
	(function(){
		if(!configs.BGConfigmaxbuildable)
			return;
		if(page=='defense'||page=='shipyard'){
			$("#detail").ajaxSuccess(function(){
				if($('#costs').length==0)
					return;
				$('#BGMaxBuildable').remove();
				new_win('BGMaxBuildable', lang.MaxBuildable, 'auto', 'auto');
				var costs			= $('#costs>#resources>.metal.tooltip>span');
				var name			= $('#costs>#resources>.metal.tooltip>img');

				var resource		= new Array;
				var metal			= $('#resources>#metal_box>img').attr('src').split('/').pop();
				var crystal			= $('#resources>#crystal_box>img').attr('src').split('/').pop();
				var deuterium		= $('#resources>#deuterium_box>img').attr('src').split('/').pop();
				resource[metal]		= $('#resources>#metal_box>.value>#resources_metal').text().replace(/\s|\,|\./g, '');
				resource[crystal]	= $('#resources>#crystal_box>.value>#resources_crystal').text().replace(/\s|\,|\./g, '');
				resource[deuterium]	= $('#resources>#deuterium_box>.value>#resources_deuterium').text().replace(/\s|\,|\./g, '');

				var max_num	= -1;

				for(var i=0; i<costs.length; i++){
					var cost = $(costs).eq(i).text().replace(/\s|\,|\./g, '').replace(/[^0-9]+/g, "000000");
					var max  = Math.floor(resource[$(name).eq(i).attr('src').split('/').pop()]/cost);
					if(max<max_num||max_num==-1)
						max_num = max;
				}
				max_num = Math.floor(max_num);
				$('#BGMaxBuildable>#content').css({'text-align':'center'});
				$('#BGMaxBuildable>#content').append('<div id="max_num">'+lang.max+': <a class="fill_num">'+max_num+'</a></div>');
				$('#BGMaxBuildable>#content').append('<center><table><tr><td class="BG"><a class="add_num">+5</a></td><td class="BG"><a class="add_num">+10</a></td><td class="BG"><a class="add_num">+20</a></td></tr><tr><td class="BG"><a class="add_num">+50</a></td><td class="BG"><a class="add_num">+100</a></td><td class="BG"><a class="add_num">+250</a></td></tr></table></center>');
				$('#BGMaxBuildable>#content').append('<a style="cursor:pointer" onclick="sendBuildRequest();">'+lang.build+'</span></div>');
				$('td.BG').css({'border':'1px solid silver'});
				$('.fill_num').css('cursor','pointer').click(function(){
					var num = $(this).text();
					$('#content>#costswrapper>#costs>#resources>.enter>#number').val(num);
				});
				$('.add_num').css('cursor','pointer').click(function(){
					var add = $(this).text();
					var orig = $('#content>#costswrapper>#costs>#resources>.enter>#number').val();
					if(!orig)
						orig = 0;
					$('#content>#costswrapper>#costs>#resources>.enter>#number').val(parseInt(orig)+parseInt(add));
				});
			});
		}
	})();

//------------------------------
//  Fleet Formation
//------------------------------
	(function(){
		if(!configs.BGConfigfleetformation)
			return;
		if(page=='fleet1'){
			var FleetFormation = localStorage.getItem('BGFleetFormation');
			if(FleetFormation){
				FleetFormation=JSON.parse(FleetFormation);
			}else{
				FleetFormation=new Array;
			}
			new_win('BGFleetFormation', lang.fleetformation, 'auto', 150);
			var content = '';
			function renew_selects(){
				content = '';
				content = '<select id="BGSelectFF"><option>'+lang.fleetformation+'</option>';
				for(var i=0; i<FleetFormation.length; i++){
					content+='<option value="'+i+'">'+FleetFormation[i]['FormationName']+'</option>';
				}
				content += '</select><br><span id="BGDeleteFF">'+lang.deleteformation+'</span><br><span id="BGCreateNewFF">'+lang.newfleetformation+'</span>';
				$('#BGFleetFormation>#content').css({'text-align':'center'}).html(content);
				$('#BGSelectFF').change(function(){
					$('#continue').attr('class','on');
					unsafeWindow['validated']=true;
					var FF = FleetFormation[$(this).val()];
					$('.fleetValues').val('');
					$.each(FF, function(key, value){
						if(key!='FormationName'){
							$('#'+key).val(value).change();
						}
					});
					unsafeWindow.checkShips('shipsChosen');
				});
				$('#BGCreateNewFF').css({cursor:'pointer'}).click(function(){
					new_win('BGNewFleetFormation', lang.newfleetformation, 'auto', 'auto');
					$('#BGNewFleetFormation>#content').css({'text-align':'center'});
					$('#BGNewFleetFormation>#content').html('<table><tr><td class="BG">'+lang.formationname+':</td><td class="BG"><input class="BGNewFF" id="FormationName"></input></td></tr><tr><td class="BG">'+
															lang.s204+':</td><td class="BG"><input class="BGNewFF" id="ship_204"></input></td></tr><tr><td class="BG">'+
															lang.s205+':</td><td class="BG"><input class="BGNewFF" id="ship_205"></input></td></tr><tr><td class="BG">'+
															lang.s206+':</td><td class="BG"><input class="BGNewFF" id="ship_206"></input></td></tr><tr><td class="BG">'+
															lang.s207+':</td><td class="BG"><input class="BGNewFF" id="ship_207"></input></td></tr><tr><td class="BG">'+
															lang.s215+':</td><td class="BG"><input class="BGNewFF" id="ship_215"></input></td></tr><tr><td class="BG">'+
															lang.s211+':</td><td class="BG"><input class="BGNewFF" id="ship_211"></input></td></tr><tr><td class="BG">'+
															lang.s213+':</td><td class="BG"><input class="BGNewFF" id="ship_213"></input></td></tr><tr><td class="BG">'+
															lang.s214+':</td><td class="BG"><input class="BGNewFF" id="ship_214"></input></td></tr><tr><td class="BG">'+
															lang.s202+':</td><td class="BG"><input class="BGNewFF" id="ship_202"></input></td></tr><tr><td class="BG">'+
															lang.s203+':</td><td class="BG"><input class="BGNewFF" id="ship_203"></input></td></tr><tr><td class="BG">'+
															lang.s208+':</td><td class="BG"><input class="BGNewFF" id="ship_208"></input></td></tr><tr><td class="BG">'+
															lang.s209+':</td><td class="BG"><input class="BGNewFF" id="ship_209"></input></td></tr><tr><td class="BG">'+
															lang.s210+':</td><td class="BG"><input class="BGNewFF" id="ship_210"></input></td></tr></table><P><span id="BGNewFFSubmit">'+lang.save+'</span>');
					$('.BGNewFF').css({border:'1px solid', 'border-color':'black','background-color':'green'});
					$('#BGNewFFSubmit').css({cursor:'pointer'}).click(function(){
						var form = $('.BGNewFF');
						var newFleetFormation={FormationName:form.eq(0).val()};
						for(var i=1; i<form.size(); i++){
							newFleetFormation[form.eq(i).attr('id')]=form.eq(i).val();
						}
						FleetFormation.push(newFleetFormation);
						localStorage.setItem('BGFleetFormation', JSON.stringify(FleetFormation));
						$('#BGNewFleetFormation').animate({height:0},'slow', function(){
							$('#BGNewFleetFormation').remove();
							unsafeWindow['fadeBox'](lang.saved);
						});
						renew_selects();
					});
				});
				$('#BGDeleteFF').css({cursor:'pointer'}).click(function(){
					if(!confirm(lang.deleteformation+' '+FleetFormation[$('#BGSelectFF').val()]['FormationName']+'?')) return;
					FleetFormation.splice($('#BGSelectFF').val(),1);
					localStorage.setItem('BGFleetFormation', JSON.stringify(FleetFormation));
					$('.fleetValues').val('');
					unsafeWindow['fadeBox'](lang.deleted);
					renew_selects();
				});
			}
			renew_selects();
		}
	})();

//------------------------------
//  Score Record
//------------------------------
	(function(){
		if(!configs.BGConfigScoreRec)
			return;
		var ScoreRec = localStorage.getItem('BGScoreRec');
		var now = new Date().getTime();
		function saverecord(){
			var score = parseInt(unsafeWindow['textContent'][7].replace(/\<a href=\'.*\'\>/,'').match(/[0-9,]+/)[0].replace(/,/g,''));
			ScoreRec[now]=score;
			ScoreRec.latest=now;
			if(score>ScoreRec.max)
				ScoreRec.max=score;
			if(score<ScoreRec.min)
				ScoreRec.min=score;
			localStorage.setItem('BGScoreRec', JSON.stringify(ScoreRec));
		}
		if(ScoreRec){
			ScoreRec=JSON.parse(ScoreRec);
		}else if(page=='overview'){
			ScoreRec={earliest:now};
			ScoreRec.latest=now;
			ScoreRec.max=0;
			ScoreRec.min=Infinity;
			saverecord();
		}
		if(page=='overview'&&new Date().getTime()-ScoreRec.latest>=21600000){
			saverecord();
		}
		//Drawing chart
		if(ScoreRec){
			var max=ScoreRec.max;
			var min=ScoreRec.min;
			var earliest=ScoreRec.earliest;
			var latest=ScoreRec.latest;
			var datasetval='';
			var datasetpos='';
			delete ScoreRec.earliest;
			delete ScoreRec.latest;
			delete ScoreRec.max;
			delete ScoreRec.min;
			var Encoding ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			//var coe=Math.pow(10,Math.floor(Math.log((max+min)/2)/Math.log(10)));
			var counter=0;
			$.each(ScoreRec, function(index, value){
				var val=(value-min)/(max-min);
				var pos=(index-earliest)/(latest-earliest);
				datasetval+=Encoding.charAt(Math.floor(val*61));
				datasetpos+=Encoding.charAt(Math.floor(pos*61));
				counter+=1;
			});
		}
		var startfrom = new Date(earliest);
		var dd = startfrom.getDate();
		var mm = startfrom.getMonth()+1;
		var yyyy = startfrom.getFullYear();
		if(dd<10){dd='0'+dd}
		if(mm<10){mm='0'+mm}
		startfrom=dd+'.'+mm+'.'+yyyy;
		new_win('BGScoreRec', lang.scorerec, 'auto', 'auto');
		if(ScoreRec){
			$('#BGScoreRec>#content').html('<img src="http://chart.apis.google.com/chart?chxr=0,'+min+','+max+'&chxt=y&chs=200x100&cht=lxy&chco=000080&chm=B,000080,0,0,0&chd=s:'+datasetpos+','+datasetval+'"></img><P>('+lang.from+' '+startfrom+')<P>'+lang.scorerecwarning+'</P><span id="BGscorerecremove">'+lang.reset+'</span>').css('text-align','center');
		}else{
			$('#BGScoreRec>#content').html(lang.noscorerec+'</P><span id="BGscorerecremove">'+lang.reset+'</span>').css('text-align','center');
		}
		$('#BGscorerecremove').css({cursor:'pointer'}).click(function(){
			if(!confirm(lang.resetconfirm))
				return;
			localStorage.removeItem('BGScoreRec');
			unsafeWindow['fadeBox'](lang.deleted);
		});
	})();

//------------------------------
//  FS Resource Randomizer
//------------------------------
	(function(){
		if(!configs.BGConfigResRand||page!='fleet3')return;
		$.get(dir+"index.php?page=fetchResources&ajax=1",function(res){
			new_win('BGResRand', lang.ResRand, 'auto', 'auto');
			var content=lang.randomize+'<select id="BGResRandVal">';
			for(var i=1;i<4;i++){
				var val=Math.pow(10,i+1);
				content+='<option value="'+val+'">'+lang.bitValue[val]+'</option>';
			}
			content+='</select><br>'+lang.priority+'<select id="BGResRandPriority"><option value="123">'+lang.metal+'>'+lang.crystal+'>'+lang.deu+'</option><option value="132">'+lang.metal+'>'+lang.deu+'>'+lang.crystal+'</option><option value="213">'+lang.crystal+'>'+lang.metal+'>'+lang.deu+'</option><option value="231">'+lang.crystal+'>'+lang.deu+'>'+lang.metal+'</option><option value="312">'+lang.deu+'>'+lang.metal+'>'+lang.crystal+'</option><option value="321">'+lang.deu+'>'+lang.crystal+'>'+lang.metal+'</option><option value="even">'+lang.EvenlyDistributed+'</option></select><br><a id="BGResRandRenewVal">'+lang.renew+'</a>';
			$('#BGResRand>#content').html(content).css('text-align','center');
			res = JSON.parse(res);
			var Priority = localStorage.getItem('BGFSPriority');
			var Digits = localStorage.getItem('BGFSDigits');
			if(Priority&&Digits){//alert($('#BGResRandPriority>option[value='+Priority+']').text());
				$('#BGResRandPriority>option[value='+Priority+']').attr("selected","true");
				$('#BGResRandVal>option[value='+Digits+']').attr("selected","true");
			}
			function randomize(){
				$('#metal').val(0);unsafeWindow.checkRessourceByType('metal');
				$('#crystal').val(0);unsafeWindow.checkRessourceByType('crystal');
				$('#deuterium').val(0);unsafeWindow.checkRessourceByType('deuterium');
				var T = (Math.random()*9+1)*$('#BGResRandVal').val()/res.metal.resources.production;
				var consumption = parseInt($('#consumption').text().replace(/\s|\,|\./g, ''));
				var rescode =	{1:function(){$('#metal').val(Math.max(0,parseInt(res.metal.resources.actual-res.metal.resources.production*T)));unsafeWindow.checkRessourceByType('metal');},
								 2:function(){$('#crystal').val(Math.max(0,parseInt(res.crystal.resources.actual-res.crystal.resources.production*T)));unsafeWindow.checkRessourceByType('crystal');},
								 3:function(){$('#deuterium').val(Math.max(0,parseInt(res.deuterium.resources.actual-res.deuterium.resources.production*T)-consumption));unsafeWindow.checkRessourceByType('deuterium');}
								}
				var priority = $('#BGResRandPriority').val();
				localStorage.setItem('BGFSPriority', priority);
				if(priority=='even'){
					var C = parseInt($('#maxresources').text().replace(/\s|\,|\./g, ''));
					T = Math.max(T,((res.metal.resources.actual+res.crystal.resources.actual+res.deuterium.resources.actual-C)/(res.metal.resources.production+res.crystal.resources.production+res.deuterium.resources.production)));
					if(res.metal.resources.production==0){
						$('#metal').val(res.metal.resources.actual);unsafeWindow.checkRessourceByType('metal');
						$('#crystal').val(res.crystal.resources.actual);unsafeWindow.checkRessourceByType('crystal');
						$('#deuterium').val(res.deuterium.resources.actual);unsafeWindow.checkRessourceByType('deuterium');
					}else{
						rescode[1]();
						rescode[2]();
						rescode[3]();
					}
				}else{
					if(res.metal.resources.production==0)
						T=0;
					rescode[priority.charAt(0)]();
					rescode[priority.charAt(1)]();
					rescode[priority.charAt(2)]();
				}
				unsafeWindow.updateVariables();
				localStorage.setItem('BGFSDigits', $('#BGResRandVal').val());
			}
			$('#BGResRandRenewVal').css('cursor','pointer').click(function(){randomize()});
			$('#BGResRandVal').change(function(){randomize()});
			$('#BGResRandPriority').change(function(){randomize()});
		});
	})();

//------------------------------
//  Attack Alarm
//------------------------------
	(function(){
		if(configs.BGConfigAttackAlarm_disabled)return false;
		new_win('BGAttackAlarm', lang.AttackAlarm, 'auto', 'auto');
		var playLoop, onattack, nextRefresh;
		var alarmOn=JSON.parse(localStorage.getItem('BGAlarmOn'));
		if(alarmOn==null)alarmOn=false;
		var alarmOnSpy=JSON.parse(localStorage.getItem('BGAlarmOnSpy'));
		if(alarmOnSpy==null)alarmOnSpy=true;
		var refreshTime=localStorage.getItem('BGAlarmRefreshTime');
		if(refreshTime==null)refreshTime=300;
		$('#BGAttackAlarm>#content').html('<p>'+lang.AttackAlarm+':<a id="BGAlarmOn">'+(alarmOn?lang.On:lang.Off)+'</a><p>'+lang.AlarmOnSpy+':<a id="BGAlarmOnSpy">'+(alarmOnSpy?lang.On:lang.Off)+'</a><P>'+lang.refreshTime+':<input id="refreshTime" value="'+refreshTime+'"></input>'+lang.second+'<P id="refreshRemTime"></p><p><a id="BGTS">'+lang.TestSound+'</a></p>');
		$('#refreshTime').css('width','70px').change(function(){
			refreshTime=$(this).val();
			localStorage.setItem('BGAlarmRefreshTime',refreshTime);
		});
		$('#BGAlarmOn').css('cursor','pointer').click(function(){
			alarmOn=!alarmOn;
			localStorage.setItem('BGAlarmOn',JSON.stringify(alarmOn));
			$(this).text(alarmOn?lang.On:lang.Off);
			if(!alarmOn)clearInterval(playLoop)
			if(alarmOn&&onattack)playLoop = setInterval(function(){play();}, 1000);
		});
		$('#BGAlarmOnSpy').css('cursor','pointer').click(function(){
			alarmOnSpy=!alarmOnSpy;
			localStorage.setItem('BGAlarmOnSpy',JSON.stringify(alarmOnSpy));
			$(this).text(alarmOnSpy?lang.On:lang.Off);
		});
		if($.browser.mozilla){
			var output = new Audio();
			output.mozSetup(1, 44100);
			var samples = new Float32Array(22050);
			var len = samples.length;
			for (var i=0;i<len;i++){
				samples[i] = Math.tan(i/20);
			}
			var play = function(){
				output.mozWriteAudio(samples);
			}
		}else{
			var buffer = new Float32Array(22050);
			var len = buffer.length;
			for (var i=0;i<len;i++){
				buffer[i] = Math.tan(i/20);
			}
            var ctx = new webkitAudioContext();
            var play = function(){
                var src = ctx.createBufferSource();
                src.buffer = ctx.createBuffer(1, buffer.length, 44100);
                src.buffer.getChannelData(0).set(buffer);
                src.connect(ctx.destination);
                src.loop = false;
                if(src)
                    src.noteOff(0);
				src.noteOn(0);
			}
		}
		$('#BGTS').css('cursor','pointer').click(function(){
			play();
		});
		if(!alarmOn) return;
		var checkAttack = function(){
			$.get(dir+"index.php?page=fetchEventbox&ajax=1",function(data){
				var hostile = JSON.parse(data)['hostile'];
				if(hostile){
					if(alarmOnSpy){
						clearInterval(playLoop);
						playLoop = setInterval(function(){play();}, 1000);
						onattack = true;
					}else{
						$.get(dir+'index.php?page=eventList&ajax=1',function(data){
							if($('img[src="http://gf3.geo.gfsrv.net/cdnb7/60a018ae3104b4c7e5af8b2bde5aee.gif"]', data).size()!=hostile){
								clearInterval(playLoop);
								playLoop = setInterval(function(){play();}, 1000);
								onattack = true;
							}
						});
					}
				}else{
					clearInterval(playLoop);
				}
			},"text");
			nextRefresh=Math.round(parseInt(refreshTime)*(0.9+Math.random()/5));
			unsafeWindow.setTimeout(checkAttack, nextRefresh*1000);
			$('#refreshRemTime').text(nextRefresh);
		};
		checkAttack();
		setInterval(function(){$('#refreshRemTime').text(parseInt($('#refreshRemTime').text())-1);}, 1000);
	})();

//------------------------------
//  Merchant Warning
//------------------------------
	(function(){
		if(configs.BGConfigMerchantWarning_disabled||page!='trader')return false;
		var MerchantExist = ($('#slot01').css('display')=='none'?false:true);
		$('a[id^=imageRes]').each(function(k,v){
			var CallMerchant=$(v).attr("onclick");
			$(v).attr("onclick",'').click(function(){
				if(!confirm(lang.MerchantExistConfirm))
					return true;
				CallMerchant();
			});
		});
		return true;
	})();

//------------------------------
//  Message
//------------------------------
	/*(function(){
		if(configs.BGConfigMessageDisabled)return false;
		new_win('BGMessage', lang.massage, 'auto', 'auto');
		$('#BGMessage>#content').html('<table id="BGMessageTable"></table>');
		$('#BGMessage>#content').css({'max-height':200,'overflow-y':'auto','white-space':'nowrap'});
		function ajaxPageLoad(page){
			$.post(dir+"index.php?page=messages",
				{
					"displayCategory": 1,
					"displayPage": page,
					"siteType": 10,
					"ajax": 1
				},
				function(data)
				{
					var entry = $('.entry', data).size();
					if(page==1&&entry==0)
						$('#BGMessageTable').append('<center>'+lang.empty+'</center>');
					for(var i=0;i<entry;i++){
						$('#BGMessageTable').append('<TR><TD style="border:1px solid silver">'+$('.entry>.from', data).eq(i).text()+'</TD><TD style="border:1px solid silver">'+$('.entry>.subject', data).eq(i).children('a').text()+(($('.entry', data).eq(i).hasClass('new'))?'[*]':'')+'</TD></TR>');
					}
					if(entry!=0){
						ajaxPageLoad(page+1);
					}
				}	
			);    
		}
		ajaxPageLoad(1);
	})();*/

//------------------------------
//  What's New
//------------------------------
	var WhatsNew = localStorage.getItem('BGWhatsNew');
	if(!WhatsNew){
		new_win('BGWhatsNew', lang.WhatsNew, 50, 200);
		$('#BGWhatsNew>#content').css('text-align','center').html(lang.BGWhatsNew);
		$('#BGWhatsNew_close').click(function(){localStorage.setItem('BGWhatsNew',true)});

	}


$("#BGMS").text(new Date().getTime()-ms);

//Todo:顯示建造中建築和艦隊移動的訊息