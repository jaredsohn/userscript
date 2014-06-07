// ==UserScript==
// @name        KOC_TC_Details
// @namespace   nhl
// @description KOC Throne Card Details
// @include     *.kingdomsofcamelot.com/*main_src.php*
// @version     1
// @grant       unsafeWindow
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

// koc pt
if (window.self.location != window.top.location) {
	if (window.self.location.href == window.parent.location.href) {
		return; 
	}
}

function nhlLoad() {
	var loaded = false;
	try {
		if (unsafeWindow.jQuery('#main_engagement_tabs').length > 0)
			loaded = true;
	} catch (e) {
	}
	if (!loaded) {
		setTimeout(nhlLoad, 5000);
		return;
	}

	unsafeWindow.nhlCreateTcdContent = function(){
		var slevel = parseInt(unsafeWindow.jQuery('#nhl_lst_upgrade_level').val());
		var s = '<table>';
		s += '<tr>';
		s += '<th style="background-color:#ccc" colspan="3">Card Name/Effects</th>';
		s += '<th style="background-color:#ccc">Base</th>';
		s += '<th style="background-color:#ccc">Growth</th>';
		s += '<th style="background-color:#ccc">Level.0</th>';
		s += '<th style="background-color:#ccc">Cur.Level</th>';
		s += '<th style="background-color:#ccc">Level.' + slevel + '</th>';
		s += '</tr>';
		var itemNo = 1;
		for (itemId in unsafeWindow.kocThroneItems) {
			var tc = unsafeWindow.kocThroneItems[itemId];
			var clevel = parseInt(tc.level);
			var cquality = parseInt(tc.quality);
			s += '<tr onclick="window.jQuery(\'tr._nhl_te_' + itemId + '\', window.jQuery(this).parent()).toggle()" style="cursor:pointer">';
			s += '<th style="background-color:#ccc">' + itemNo + '</th>'
			s += '<th style="background-color:#ccc" colspan="2">' + tc.name + '</th>';
			s += '<th style="background-color:#ccc">B</th>';
			s += '<th style="background-color:#ccc">G</th>';
			s += '<th style="background-color:#ccc">L.0</th>';
			s += '<th style="background-color:#ccc">C.' + clevel + '</th>';
			s += '<th style="background-color:#ccc">L.' + slevel + '</th>';
			s += '</tr>';						
			for (var i = 1; i <= 5; i++) {
				var n = unsafeWindow.cm.thronestats.effects[tc.effects['slot'+i].id]['1'];
				var p = unsafeWindow.cm.thronestats.tiers[tc.effects['slot'+i].id][tc.effects['slot'+i].tier];
				var level = 0;
				var font_color = 'color:#000;';
				if (i > cquality) {
					font_color = 'color:#777;';
				}
				s += '<tr class="_nhl_te_' + itemId + '">';
				if (i == 1) {
					s += '<td style="' + font_color + '" rowspan="5">&nbsp;</td>';
				}
				s += '<td style="' + font_color + '">' + i + '</td>';
				s += '<td style="' + font_color + '">' + n + '</td>';
				s += '<td style="' + font_color + '">' + p.base + '</td>';
				s += '<td style="' + font_color + '">' + p.growth + '</td>';
				level = 0;
				s += '<td style="' + font_color + '">' + (p.base + ((level * level + level) * p.growth * 0.5)) + '</td>';
				level = clevel;
				s += '<td style="' + font_color + '">' + (p.base + ((level * level + level) * p.growth * 0.5)) + '</td>';
				level = slevel;
				s += '<td style="' + font_color + '">' + (p.base + ((level * level + level) * p.growth * 0.5)) + '</td>';
				s += '</tr>';
			}
			itemNo++;
		}
		s += '</table>';
		unsafeWindow.jQuery('#nhl_pnl_thrones_content').empty().html(s);	
	};
	
	unsafeWindow.nhlToggleTcd = function(){
		unsafeWindow.jQuery('#nhl_pnl_thrones').toggle();
		if (unsafeWindow.jQuery('#nhl_pnl_thrones_content').html() == '')
			unsafeWindow.nhlCreateTcdContent();
	};
	
	unsafeWindow.nhlCloseTcd = function(){
		unsafeWindow.jQuery('#nhl_pnl_thrones').hide();
	};
	
	unsafeWindow.nhlToggleTcdContent = function(){
		unsafeWindow.jQuery('#nhl_pnl_thrones_content').toggle();
	};
	
	
	
	var s = '';
	s = '<a id="nhl_btn_toggle_thrones" onclick="nhlToggleTcd()" class="navTab"><span>(^_^)</span></a>';
	unsafeWindow.jQuery('#main_engagement_tabs').append(s);
	s  = '<div id="nhl_pnl_thrones" style="position:absolute;top:70px;left:10px;z-index:1000000;display:none;border:5px solid #6699cc;background-color:#fff;color:#000;font-size:11px;">';
	s += '<div id="nhl_pnl_title_thrones" style="margin:5px;width:720px;font-weight:bold;text-align:left;border-bottom:1px solid red;">';
	s += '<span style="color:#336699">KOC Throne Card Details</span>';
	s += '<span style="display:block;float:right">Check upgrade at Level';
	s += '<select id="nhl_lst_upgrade_level" onchange="nhlCreateTcdContent()">';
	for (var i = 0; i <= 12; i++) {
		s += '<option value="' + i + '"' + (i == 10 ? ' selected="selected"' : '') + '>' + i + '</option>';
	}
	s += '</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	s += '<a id="nhl_btn_refresh_thrones_content" onclick="nhlCreateTcdContent()" style="cursor:pointer;color:blue">[Refresh]</a>&nbsp;&nbsp;';
	s += '<a id="nhl_btn_toggle_thrones_content" onclick="nhlToggleTcdContent()" style="cursor:pointer;color:#666">[Show/Hide]</a>&nbsp;&nbsp;';
	s += '<a id="nhl_btn_close_thrones" onclick="nhlCloseTcd()" style="cursor:pointer;color:#666">[Close]</a>';
	s += '</span><br style="clear:both" />';
	s += '<span style="color:#777;font-weight:normal;font-size:75%;">The calculation of card effect: <strong>power_base + ((level * level + level) * power_growth * 0.5)</strong></span>';
	s += '</div>';
	s += '<div id="nhl_pnl_thrones_content" style="margin:5px;width:720px;height:550px;overflow:scroll;"></div>';
	s += '</div>';
	unsafeWindow.jQuery('body').append(s);
	unsafeWindow.jQuery('#nhl_pnl_thrones').draggable({handle: '#nhl_pnl_title_thrones'});
}

nhlLoad();