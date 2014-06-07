// ==UserScript==
// @name        i3d BF4 Control Panel (zh-CH)
// @namespace   ETiV
// @description i3d BF4 Control Panel (zh-CH)
// @include     https://customer.i3d.net/controlpanel/gaming/game/bf4admin/*
// @version     1
// @grant       none
// ==/UserScript==

// MP_Damage	Lancang Dam		水坝风云
// MP_Abandoned	Zavod 311		废弃工厂
// MP_Siege	Siege of Shanghai	上海之围
// MP_Tremors	Dawnbreaker		破晓行动
// MP_TheDish	Rogue Transmission	广播中心
// MP_Resort	Hainan Resort		度假胜地
// MP_Prison	Operation Locker	极地监狱
// MP_Naval	Paracel Storm		西沙风暴
// MP_Journey	Golmud Railway		荒野游踪
// MP_Flooded	Flood Zone		水乡泽国

$(function(){

	var tmpl = '<div id="js_maplist_thumb"><img src="http://battlelog-cdn.battlefield.com/cdnprefix/0a6f138fa9a22a1/public/base/bf4/map_images/146x79/#src#.jpg" /></div>';

	$('#map_maplist').bind('click', function(){
		var val = $(this).val().toLowerCase();
		$('#js_maplist_thumb').remove();
		var html = tmpl.replace('#src#', val);
		$('#map_maplist').after(html);
	});

	$(document).delegate('tr.map_row', 'mouseover', function(){
		//
		var val = $(this).attr('data-map').toLowerCase();
		$('#js_maplist_thumb').remove();
		var html = tmpl.replace('#src#', val);
		$('#map_maplist').after(html);
	});

var translate = {
	'.nav.nav-tabs': {
		'[href="#bf4admin_pane3"]':'全局设定',
		'[href="#bf4admin_pane1"]':'在线玩家',
		'[href="#bf4admin_pane2"]':'游戏内管理',
		'[href="#bf4admin_pane4"]':'地图循环'
	},
	'#bf4admin_pane1': {
		'#bf4admin_pane1_refresh':'<i class="icon-refresh"></i>刷新',
		'#bf4admin_send_message_all':'<i class="icon-mail-forward"></i>广播消息'
	},
	'#bf4admin_pane2': {
		'#ingame_admin_create':'新增管理员'
	},
	'#bf4admin_pane4': {
		'#bf4admin_pane4_refresh':'<i class="icon-refresh"></i>刷新',
		'#maps_list_clear':'<i class="icon-remove"></i>清空地图列表',
		'#map_add':'加入地图循环',
		'#maps_restart_round':'<i class="icon-backward"></i>重开本局',
		'#maps_next_round':'<i class="icon-forward"></i>开始下局',
		'#maps_next_map':'<i class="icon-fast-forward"></i>开始下一地图',
		'b:contains("Map name:")':'地图:',
		'b:contains("Game modes:")':'模式:',
		'b:contains("Rounds:")':'局数:',
		'b:contains("Sort value:")':'排列序号:',
		'b:contains("Click on a map to open the map actions such as change to map")':'单击地图可打开地图操作选单',
		'option:contains("Lancang Dam")':'水坝风云(Lancang Dam)',
		'option:contains("Zavod 311")':'废弃工厂(Zavod 311)',
		'option:contains("Siege of Shanghai")':'上海之围(Siege of Shanghai)',
		'option:contains("Dawnbreaker")':'破晓行动(Dawnbreaker)',
		'option:contains("Rogue Transmission")':'广播中心(Rogue Transmission)',
		'option:contains("Hainan Resort")':'度假胜地(Hainan Resort)',
		'option:contains("Operation Locker")':'极地监狱(Operation Locker)',
		'option:contains("Paracel Storm")':'西沙风暴(Paracel Storm)',
		'option:contains("Golmud Railway")':'荒野游踪(Golmud Railway)',
		'option:contains("Flood Zone")':'水乡泽国(Flood Zone)'
	}
};



for (var pane in translate) {
	var words = translate[pane];
	var $pane = $(pane);
	for (var key in words) {
		$pane.find(key).html( words[key] );
	}
}

});

var dynamic = {
	'map_row': {
		'td:contains("Lancang Dam")':'水坝风云(Lancang Dam)',
		'td:contains("Zavod 311")':'废弃工厂(Zavod 311)',
		'td:contains("Siege of Shanghai")':'上海之围(Siege of Shanghai)',
		'td:contains("Dawnbreaker")':'破晓行动(Dawnbreaker)',
		'td:contains("Rogue Transmission")':'广播中心(Rogue Transmission)',
		'td:contains("Hainan Resort")':'度假胜地(Hainan Resort)',
		'td:contains("Operation Locker")':'极地监狱(Operation Locker)',
		'td:contains("Paracel Storm")':'西沙风暴(Paracel Storm)',
		'td:contains("Golmud Railway")':'荒野游踪(Golmud Railway)',
		'td:contains("Flood Zone")':'水乡泽国(Flood Zone)'
	}
};
$(document).bind('DOMNodeInserted', function(e){
	var $parent = $(e.target);
	for (var cls in dynamic) {
		if ($parent.hasClass(cls)) {
			for (var key in dynamic[cls]) {
				$parent.find(key).html(dynamic[cls][key]);
			}
		}
	}
});
