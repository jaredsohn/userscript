// ==UserScript==
// @name         eSim BattleList Ext.
// @namespace    eSim BattleList Ext.
// @version      0.6.4
// @author       calin
// @description  This script add simple battle scan, show battle hero and remaining time.
// @include      http://*.e-sim.org/battles.html*
// @icon         http://e-sim.home.pl/eworld/img/favicon.png
// @downloadURL  http://userscripts.org/scripts/source/154240.user.js
// @updateURL    http://userscripts.org/scripts/source/154240.meta.js
// ==/UserScript==
var main = function () {
	// eSim BattleList Ext.
	$(document).ready(function(){
		var path=parent.document.location.pathname.toString();
		var init=1, initS=0, initL=0, nextmission=200, running=false, battleList=[];

		if (/battles.html/g.test(path)) {
			$('#battlesTable').before(
				'<div style="text-align:right; margin-bottom:5px;"><font id="bMtSt" style="margin-right:10px;"></font>'+
				'<input id="bMtRef" class="smallhelp" type="button" value="Refresh BattleList" title="test"></div>')
			$('#bMtRef').click(function(){0==$('form[action="login.html"]').length ? createList() : alert('ERROR, You should Login first!')});
		}
		function createList() {
			if (!running) {
				init=1; initS=0; running=true; battleList=[];
				if (0<$('#battlesTable .bMt').length) {
					$.each($('#battlesTable tbody tr:not(:first) .bMt'), function(i) {
						battleList.push($(this).find('.bMtTime')[0].id.split('battleRound')[1]);
					})
					0<battleList.length&&(initL=battleList.length);
					0<battleList.length&&getBattleRound(battleList[init-1],'refresh');
				} else {
					$.each($('#battlesTable tbody tr:not(:first)'), function(i) {
						if($(this).find("td:first div .battleDiv > div:eq(4):has('b')").length != 0 ) {
							var battle_id=$(this).find('td:first div .battleDiv > div:eq(3) a')[0].href.split('battle.html?id=')[1];
							var def_side=$(this).find('td:first div .battleDiv > div:eq(4) b:eq(1)')[0].textContent;
							var atk_side=$(this).find('td:first div .battleDiv > div:eq(4) b:eq(2)')[0].textContent;
							$(this).find('td:first').append(
								'<div id="battle'+battle_id+'" class="bMt" style="display:table; background:#E1E7EB; border-radius:10px 0px; box-shadow:inset 0px 0px 2px #000; width:100%; height:42px; text-align:center;">'+
								'<div style="display:table-cell; width:44%;"><p style="font-weight:bold; margin:5px 0 0;">'+def_side+'</p><p class="bMtDef" style="margin:0;"></p></div>'+
								'<div style="display:table-cell; width:14%; vertical-align:bottom;"><p class="bMtTime" style="margin:0;"></p><p style="font-weight:bold; margin:0;">vs</p></div>'+
								'<div style="display:table-cell; width:44%;"><p style="font-weight:bold; margin:5px 0 0;">'+atk_side+'</p><p class="bMtAtk" style="margin:0;"></p></div>'+
								'</div>');
							battleList.push(battle_id);
						}
					})
					0<battleList.length&&(initL=battleList.length);
					0<battleList.length&&getBattle(battleList[init-1], true);
				}
				$('#bMtSt').text(initS+'/'+initL);
			}
		}
		function getBattle(battle_id, runLoop) {
			jQuery.ajax({
				url: 'battle.html?id='+battle_id,
				type: 'GET',
				async: false,
				dataType: 'html',
				success: function(data) {
					if (data!=null) {
						var defMsg='none', atkMsg='none', battleRound_id=$('#battleRoundId',data)[0].value,
							def=$('#topDefender1 > .hit', data), atk=$('#topAttacker1 > .hit', data);
						if (0<def.length) {
							var def_Name=def.find('a[href^="profile.html?id="]')[0].textContent.replace(/? /g, '');;
							var def_Link=def.find('a[href^="profile.html?id="]')[0].href;
							var def_Infl=def.find('.hitInfl')[0].textContent;
							defMsg='<a href="'+def_Link+'" target="_blank">'+def_Name+'</a> : '+def_Infl;
						}
						if (0<atk.length) {
							var atk_Name=atk.find('a[href^="profile.html?id="]')[0].textContent.replace(/? /g, '');;
							var atk_Link=atk.find('a[href^="profile.html?id="]')[0].href;
							var atk_Infl=atk.find('.hitInfl')[0].textContent;
							atkMsg='<a href="'+atk_Link+'" target="_blank">'+atk_Name+'</a> : '+atk_Infl;
						}
						$('#battle'+battle_id).find('.bMtDef')[0].innerHTML=defMsg;
						$('#battle'+battle_id).find('.bMtAtk')[0].innerHTML=atkMsg;

						setTimeout(function(){ getBattleRound(battleRound_id, battle_id); }, nextmission/2);
						runLoop&&(init>battleList.length-1 ? (init=1,initS=0,running=false) : (init++,initS++,setTimeout(function(){getBattle(battleList[init-1], runLoop)},nextmission)));
					} else {
						$('#battle'+battle_id).find('.bMtTime')[0].textContent='ERROR';
				    	setTimeout(function(){getBattle(battle_id, runLoop)}, nextmission);
					}
				},
				error: function(xhr) {
					$('#battle'+battle_id).find('.bMtTime')[0].textContent='ERROR';
				    setTimeout(function(){getBattle(battle_id, runLoop)}, nextmission);
				}
			});	
		}
		function getBattleRound(battleRound_id, battle_id) {
			jQuery.ajax({
				url: 'battleScore.html?id='+battleRound_id,
				type: 'GET',
				//async: false,
				dataType: 'json',
				success: function(data) {
					if (data!=null) {
						var hours=parseInt(data.remainingTimeInSeconds/3600);
						var minutes=parseInt((data.remainingTimeInSeconds%3600)/60);
						var seconds=data.remainingTimeInSeconds%60;
							0>hours&&(hours='0');
							10>minutes&&0<minutes?minutes='0'+minutes:0>=minutes&&(minutes='00');
							10>seconds&&0<seconds?seconds='0'+seconds:0>=seconds&&(seconds='00');
						if (/^\d{1,}$/g.test(battle_id)) {
							$('#battle'+battle_id).find('.bMtTime')[0].id='battleRound'+battleRound_id;
							$('#battle'+battle_id).find('.bMtTime')[0].textContent=hours+':'+minutes+':'+seconds;
						} else {
							var defMsg='none', atkMsg='none', t=$('#battleRound'+battleRound_id).parent().parent();
							if (0<data.topDefenders.length) {
								var def_Name=data.topDefenders[0].playerName;
								var def_Infl=data.topDefenders[0].influence;
								var def_Link=data.topDefenders[0].htmlCode.split('<a  href=\"')[1].split('\">')[0];
								defMsg='<a href="'+def_Link+'" target="_blank">'+def_Name+'</a> : '+def_Infl;
							}
							if (0<data.topAttackers.length) {
								var atk_Name=data.topAttackers[0].playerName;
								var atk_Infl=data.topAttackers[0].influence;
								var atk_Link=data.topAttackers[0].htmlCode.split('<a  href=\"')[1].split('\">')[0];
								atkMsg='<a href="'+atk_Link+'" target="_blank">'+atk_Name+'</a> : '+atk_Infl;
							}
							t.find('.bMtDef')[0].innerHTML=defMsg;
							t.find('.bMtAtk')[0].innerHTML=atkMsg;
							t.find('.bMtTime')[0].textContent=hours+':'+minutes+':'+seconds;
							t.animate({backgroundColor:'#E1E7AA'}, 1000).animate({backgroundColor:'#E1E7EB'},500);
							'00'==hours&&('00'==minutes&&'00'==seconds)&&getBattle(t[0].id.split('battle')[1],false);
							init>battleList.length-1 ? (init=1,initS=0,running=false) : (init++,initS++,setTimeout(function(){getBattleRound(battleList[init-1],'refresh')},nextmission));
						}
						initS>0 ? ($('#bMtSt').text(initS+'/'+initL)) : ($('#bMtSt').text(initL+'/'+initL));
					} else {
						$('#battle'+battle_id).find('.bMtTime')[0].textContent='ERROR';
						setTimeout(function(){getBattleRound(battleRound_id, battle_id)}, nextmission);
					}
				},
				error: function(xhr, textStatus, errorThrown) {
					$('#battle'+battle_id).find('.bMtTime')[0].textContent='ERROR';
					setTimeout(function(){getBattleRound(battleRound_id, battle_id)}, nextmission);
				}
			});
		}
	})
}
var script = document.createElement('script');
	script.type = "text/javascript";
	script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);