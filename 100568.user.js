// ==UserScript==
// @name           Ogame訊息管理器繁體中文版
// @namespace      HHG
// @description    Ogame訊息管理
// @version        1.2.0
// @include        http://*ogame.*/game/index.php?page=messages*
// ==/UserScript==

/********************************************************************************************\

 Author: HHG 
 License: You can do whatever you like with this script, including modifying,distributing or selling.
 
 No rights reserved.

\********************************************************************************************/

//------------------------------
//  Adding JQuery
//------------------------------

	var unsafe = window;
	try{unsafe = unsafeWindow}
	catch (e){}
	var $ = unsafe.$;

//------------------------------
//  Main Function
//------------------------------

	function analyse(){
			var table = $('#mailz>tbody>tr.entry');
			var massageNum = table.size();
			$('#tab-msg>.ogame_massages_manager').remove();
			var i = 0;
			var addedTabs = 0;
			while(i<massageNum){
				var from = table.eq(i).children('td.from').text();
				var subj = table.eq(i).children('td.subject').text();
				if(0==$('#tab-msg>#omm_alliance').size()&&from.match(/聯盟 \[.+\]/i)){
					$('#tab-msg').append('<li class="msgNavi ogame_massages_manager" id="omm_alliance"><a href="#"><span>聯盟訊息</span></a></li>');
					addedTabs++;
				}else if(0==$('#tab-msg>#omm_combat').size()&&subj.match(/戰鬥報告 \[.+\] \(防: .+, 攻: .+\)/i)){
					$('#tab-msg').append('<li class="msgNavi ogame_massages_manager" id="omm_combat"><a href="#"><span>戰鬥報告</span></a></li>');
					addedTabs++;
				}else if(0==$('#tab-msg>#omm_spyreport').size()&&subj.match(/.+ \[.+\] 的 間諜報告/i)){
					$('#tab-msg').append('<li class="msgNavi ogame_massages_manager" id="omm_spyreport"><a href="#"><span>間諜報告</span></a></li>');
					addedTabs++;
				}else if(0==$('#tab-msg>#omm_spy').size()&&subj.match(/間諜偵察/)){
					$('#tab-msg').append('<li class="msgNavi ogame_massages_manager" id="omm_spy"><a href="#"><span>間諜偵察</span></a></li>');
					addedTabs++;
				}else if(0==$('#tab-msg>#omm_fleet').size()&&from.match(/艦隊司令官/)&&!subj.match(/戰鬥報告/)&&!subj.match(/間諜報告/)){
					$('#tab-msg').append('<li class="msgNavi ogame_massages_manager" id="omm_fleet"><a href="#"><span>艦隊</span></a></li>');
					addedTabs++;
				}
				i++;
			}
			$('#messageContent').css('margin-top',25*parseInt(Math.max(addedTabs-2,0)%3));
			$('#tab-msg>.ogame_massages_manager').click(function(){
				var selected  = $(this);
				$('#tab-msg>li.ogame_massages_manager').removeClass('aktiv');
				var filter = selected.attr('id');
				selected.addClass('aktiv');
				table.show();
				var i = 0;
				while(i<massageNum){
					var from = table.eq(i).children('td.from').text();
					var subj = table.eq(i).children('td.subject').text();
					if(filter=='omm_alliance'&&!from.match(/聯盟 \[.+\]/i)){
						table.eq(i).hide();
					}else if(filter=='omm_combat'&&!subj.match(/戰鬥報告 \[.+\] \(防: .+, 攻: .+\)/i)){
						table.eq(i).hide();
					}else if(filter=='omm_spyreport'&&!subj.match(/.+ \[.+\] 的 間諜報告/i)){
						table.eq(i).hide();
					}else if(filter=='omm_spy'&&!subj.match(/間諜偵察/)){
						table.eq(i).hide();
					}else if(filter=='omm_fleet'&&(!from.match(/艦隊司令官/)||subj.match(/戰鬥報告/)||subj.match(/間諜報告/))){
						table.eq(i).hide();
					}
					i++;
				}
			});
			$('#checkAll').unbind('click');
			$('#checkAll').bind('click',function(){
				var i = 0;
				while(i<massageNum){
					if(table.eq(i).is(":visible")){
						table.eq(i).children('td').children('input').attr('checked', true);
					}else{
						table.eq(i).children('td').children('input').attr('checked', false);
					}
					i++;
				}
			});
	}

//------------------------------
//  Ajax done
//------------------------------

	$(document).bind('ajaxSuccess',function(){analyse();});