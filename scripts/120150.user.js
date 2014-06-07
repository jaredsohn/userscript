// ==UserScript==
// @name          Grepolis Gtio2.0Tools
// @namespace     
// @description   Toolsammlung Grepolis 2.0 Welten
// @version       0.2.4
// @include        http://*.grepolis.*/game*
// ==/UserScript==

// Modul Debug gt_db
if (true)
{
var scriptEl = document.createElement("script");
scriptEl.setAttribute('type','text/javascript');
scriptEl.appendChild(document.createTextNode("\
	var gt_db_debugger=false;\
	var gt_db_content=new Array();\
	var gt_db_MaxContentLength=14;\
	function gt_db_FormatTime(t)\
	{\
		var h=t.getHours();\
		if (h<10) h='0'+h;\
		var m=t.getMinutes();\
		if (m<10) m='0'+m;\
		var s=t.getSeconds();\
		if (s<10) s='0'+s;\
		return h+':'+m+':'+s;\
	};\
	function gt_db_RefreshContent()\
	{\
		if (!gt_db_debugger) return;\
		var gt_wnd;\
		gt_wnd=GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_CUSTOM);\
		if (!gt_wnd)\
		{\
			Layout.wnd.Create(Layout.wnd.TYPE_CUSTOM, 'G.Tio Tools Console');\
			gt_wnd=GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_CUSTOM);\
		}\
		if (gt_db_content.length==gt_db_MaxContentLength)\
		{\
			gt_db_content.shift();\
		}\
		var gt_temp_content='';\
		for (var i=0; i<gt_db_content.length; i++)\
		{\
			gt_temp_content=gt_temp_content+gt_db_content[i];\
		}\
		gt_wnd.setContent(gt_temp_content);\
	}\
	function gt_db_Debug(message)\
	{\
		var now=new Date();\
		gt_db_content.push(gt_db_FormatTime(now)+' '+message+'<br>');\
		gt_db_RefreshContent();\
	};\
	(function(){\
		gt_db_content.push('Tools startet...<br>');\
		window.setTimeout(gt_db_RefreshContent, 3000);\
	})();\
	"));
document.body.appendChild(scriptEl);
}

// Modul Static gt_st
if (true)
{
var scriptEl = document.createElement("script");
scriptEl.setAttribute('type','text/javascript');
scriptEl.appendChild(document.createTextNode("\
	function gt_st_ajaxComplete(e, xhr, settings)\
	{\
		var url=settings.url.split(/&/)[0];\
		if (url=='/game/town_info?action=info' && settings.type=='GET')\
		{\
			var data=unescape(settings.data);\
			data=data.replace(/json=/,'');\
			var dataj=$.parseJSON(data);\
			gt_db_Debug('towninfo requested for '+dataj.id);\
			gt_ati_process(dataj.id);\
			gt_agsb_townwndprocess();\
			return;\
		}\
		if (url=='/game/player?action=get_profile_html' && settings.type=='GET')\
		{\
			var data=unescape(settings.data);\
			data=data.replace(/json=/,'');\
			var dataj=$.parseJSON(data);\
			gt_agsb_playerwndprocess(dataj.player_id);\
			return;\
		}\
		if (url=='/game/town_overviews?action=culture_overview' && settings.type=='GET')\
		{\
			gt_ko_process();\
		}\
		if (url=='/game/town_overviews?action=command_overview')\
		{\
			gt_co_process();\
		}\
		if (url=='/game/town_info?action=attack' || url=='/game/town_info?action=support')\
		{\
			gt_bl_initWnd();\
		}\
	};\
	$('body').ajaxComplete(gt_st_ajaxComplete);\
"));
document.body.appendChild(scriptEl);
}

// Modul AddTownId gt_ati
if (true)
{
var scriptEl = document.createElement("script");
scriptEl.setAttribute('type','text/javascript');
scriptEl.appendChild(document.createTextNode("\
	function gt_ati_process(townid)\
	{\
		if (gt_cfg_townid==0) return;\
		var wnds=GPWindowMgr.getOpen(Layout.wnd.TYPE_TOWN);\
		if (wnds.length==0)\
		{\
			return;\
		}\
		var wnd=wnds[wnds.length-1];\
		var wndid=wnd.getID();\
		var testel=$('DIV#gpwnd_'+wndid+' DIV#towninfo_towninfo DIV.game_header.bold SPAN.gt_townid');\
		if (testel.length>0)\
			return;\
		var div=$('DIV#gpwnd_'+wndid+' DIV#towninfo_towninfo DIV.game_header.bold');\
		$(div[0]).append('<span class=gt_townid>Id: ('+townid+')</span>');\
	}\
"));
document.body.appendChild(scriptEl);
}

// Modul AddGSButton gt_agsb
if (true)
{
var scriptEl = document.createElement("script");
scriptEl.setAttribute('type','text/javascript');
scriptEl.appendChild(document.createTextNode("\
	function gt_agsb_townwndprocess()\
	{\
		if (gt_cfg_gsbutton==0) return;\
		var wnds=GPWindowMgr.getOpen(Layout.wnd.TYPE_TOWN);\
		if (wnds.length==0)\
		{\
			return;\
		}\
		var wnd=wnds[wnds.length-1];\
		var wndid=wnd.getID();\
		var testel=$('DIV#gpwnd_'+wndid+' DIV#towninfo_towninfo UL.game_list DIV.list_item_right SPAN.gt_gsbutton');\
		if (testel.length>0)\
			return;\
		var href=$('DIV#gpwnd_'+wndid+' DIV#towninfo_towninfo A.gp_player_link').attr('href');\
		var arr=href.split(/#/);\
		var data=$.parseJSON(atob(arr[1] || arr[0]));\
		var world=window.location.host.replace(/.grepolis.com.*$/,'');\
		var awrite=$('DIV#gpwnd_'+wndid+' DIV#towninfo_towninfo UL.game_list DIV.list_item_right');\
		$(awrite[0]).append('<span class=gt_gsbutton><a target=_blank href=http://de.grepostats.com/world/'+world+'/player/'+data.id+'><img src=http://grepo.faark.de/faarksGrepoTools/resources/view_on_grepostats.png style=\\\'padding-top:1px; padding-left:3px\\\'></a></span>');\
		$(awrite[0]).css('width','80px');\
	}\
	function gt_agsb_playerwndprocess(playerid)\
	{\
		if (gt_cfg_gsbutton==0) return;\
		gt_db_Debug('agsb for '+playerid);\
		var gt_wnd;\
		gt_wnd=GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_PLAYER_PROFILE);\
		if (!gt_wnd)\
		{\
			return;\
		}\
		var div=$('DIV#gpwnd_'+gt_wnd.getID()+' DIV#player_buttons ');\
		var world=window.location.host.replace(/.grepolis.com.*$/,'');\
		$(div[0]).append('<a target=_blank href=http://de.grepostats.com/world/'+world+'/player/'+playerid+'><img src=http://grepo.faark.de/faarksGrepoTools/resources/view_on_grepostats.png style=\\\'padding-top:1px; padding-left:3px\\\'></a>');\
	}\
"));
document.body.appendChild(scriptEl);
}

// Modul KulturOverview gt_ko
if (true)
{
	var scriptEl = document.createElement("script");
	scriptEl.setAttribute('type','text/javascript');
	scriptEl.appendChild(document.createTextNode("\
	function gt_ko_process()\
	{\
		if (gt_cfg_kultur==0) return;\
		gt_db_Debug('Start Processing Culture');\
		\
		var ela,elli,eltext,elul,eletaspan;\
		gt_st_comment='Sortieren der Feste';\
		elul=$('UL#culture_overview_towns');\
		ela=$('A[class=\\\'confirm type_games  \\\']');\
		for (var i=0; i<ela.length; i++)\
		{\
			elli=$(ela[i]).parents('LI[id^=\\\'ov_town_\\\']');\
			eltext=elli[0].previousSibling;\
			elul[0].insertBefore(elli[0], elul[0].firstChild);\
			elul[0].insertBefore(eltext, elul[0].firstChild);\
		}\
		ela=$('A[class=\\\'confirm type_party  \\\']');\
		for (var i=0; i<ela.length; i++)\
		{\
			elli=$(ela[i]).parents('LI[id^=\\\'ov_town_\\\']');\
			eltext=elli[0].previousSibling;\
			elul[0].insertBefore(elli[0], elul[0].firstChild);\
			elul[0].insertBefore(eltext, elul[0].firstChild);\
		}\
		\
		gt_st_comment='Feste zaehlen f?r Statusleiste';\
		eletaspan=$('UL#culture_overview_towns SPAN.eta');\
		var cc=$('DIV#place_culture_count').text();\
		var points=cc.split('/');\
		var newpoints=parseInt(points[0],10)+eletaspan.length;\
		var diffpoints=parseInt(points[1],10)-newpoints;\
		if (diffpoints>0)\
		{\
			$('DIV#place_culture_count').text(points[0]+'/'+points[1]+' [-'+diffpoints+']');\
		}\
		else\
		{\
			var allEtas=new Array();\
			for (var i=0; i<eletaspan.length; i++)\
			{\
				allEtas.push($(eletaspan[i]).text());\
				gt_db_Debug(allEtas[i]);\
			}\
			gt_db_Debug('ael:'+allEtas.length+' dp:'+diffpoints);\
			allEtas.sort();\
			var eta=allEtas[allEtas.length + diffpoints -1];\
			gt_db_Debug('eta '+eta);\
			$('DIV#place_culture_count').html(points[0]+'/'+points[1]+' [<span></span>]');\
			$('DIV#place_culture_count span').countdown( eta );\
			$('DIV#place_culture_count span').mousePopup( new MousePopup( 'Zeit bis zum Erreichen der naechsten Stufe' ) );\
		}\
	};\
	"));
	document.body.appendChild(scriptEl);
}

// Modul CommandOverview gt_co
if (true)
{
var scriptEl = document.createElement("script");
scriptEl.setAttribute('type','text/javascript');
scriptEl.appendChild(document.createTextNode("\
	var gt_co_filter=new Array;\
	function gt_co_filterClicked(command)\
	{\
		gt_co_filter[command]=!gt_co_filter[command];\
	};\
	function gt_co_process()\
	{\
		if (gt_cfg_befehle==0) return;\
		$('div.support_filter').click(function()\
		{\
			var command = $(this).attr('class').split(' ')[1];\
			gt_co_filterClicked(command);\
		});\
		$('div.support_filter').each(function()\
		{\
			var command = $(this).attr('class').split(' ')[1];\
			if (gt_co_filter[command]==undefined)\
			{\
				gt_co_filter[command]=true;\
				return;\
			}\
			if (gt_co_filter[command]==false)\
			{\
				$('DIV.support_filter.'+command).toggleClass('inactive');\
				$('img.'+command).each(function(){\
					$(this).parent().parent().parent().fadeOut();\
				});\
			}\
		});\
	}\
"));
document.body.appendChild(scriptEl);
}

// Modul BalancedLoad gt_bl
if (true)
{
var scriptEl = document.createElement("script");
scriptEl.setAttribute('type','text/javascript');
scriptEl.appendChild(document.createTextNode("\
	var gt_bl_unitPopulation={sword:1,slinger:1,archer:1,hoplite:1,rider:3,chariot:4,catapult:15,minotaur:30,zyklop:40,medusa:18,cerberus:30,fury:55,centaur:12};\
	var gt_bl_groundUnits=new Array('sword','slinger','archer','hoplite','rider','chariot','catapult','minotaur','zyklop','medusa','cerberus','fury','centaur');\
	function gt_bl_process(wndid)\
	{\
		if (gt_cfg_balancedload==0) return;\
		var wnd=GPWindowMgr.GetByID(wndid);\
		if (!wnd)\
			return;\
		var handler=wnd.getHandler();\
		if (!handler)\
			return;\
		var units=new Array();\
		var item;\
		for (var i=0; i<gt_bl_groundUnits.length; i++)\
		{\
			if (handler.data.units[gt_bl_groundUnits[i]])\
			{\
				item={name:gt_bl_groundUnits[i], count:handler.data.units[gt_bl_groundUnits[i]].count, population:handler.data.units[gt_bl_groundUnits[i]].population};\
				units.push(item);\
			}\
		}\
		if (handler.data.researches && handler.data.researches.berth)\
			var berth=handler.data.researches.berth;\
		else\
			var berth=0;\
		var totalCap=handler.data.units.big_transporter.count*(handler.data.units.big_transporter.capacity+berth)+handler.data.units.small_transporter.count*(handler.data.units.small_transporter.capacity+berth);\
		\
		\
		units.sort(function(a,b){\
			return b.population-a.population;\
		});\
		for (i=0; i<units.length; i++)\
			gt_db_Debug('i='+i+ ' name='+units[i].name+' pop='+units[i].population+' c='+units[i].count);\
		for (i=0; i<units.length; i++)\
			if (units[i].count==0)\
			{\
				units.splice(i,1);\
				i=i-1;\
			};\
		gt_db_Debug('---');\
		for (i=0; i<units.length; i++)\
			gt_db_Debug('i='+i+ ' name='+units[i].name+' pop='+units[i].population+' c='+units[i].count);\
		\
		\
		\
		var restCap=totalCap;\
		var sendUnits=new Array();\
		for (i=0; i<units.length; i++)\
		{\
			item={name:units[i].name, count:0};\
			sendUnits[units[i].name]=item;\
		};\
		for (j=0; j<gt_bl_groundUnits.length; j++)\
		{\
			if (sendUnits[gt_bl_groundUnits[j]])\
				gt_db_Debug(sendUnits[gt_bl_groundUnits[j]].name+' '+sendUnits[gt_bl_groundUnits[j]].count);\
		}\
		\
		\
		var hasSent;\
		k=0;\
		while (units.length>0)\
		{\
			hasSent=false;\
			k=k+1;\
			for (i=0; i<units.length; i++)\
			{\
				if (units[i].population<=restCap)\
				{\
					hasSent=true;\
					units[i].count=units[i].count-1;\
					sendUnits[units[i].name].count=sendUnits[units[i].name].count+1;\
					restCap=restCap-units[i].population;\
				}\
			}\
			for (i=0; i<units.length; i++)\
				if (units[i].count==0)\
				{\
					units.splice(i,1);\
					i=i-1;\
				};\
			if (!hasSent)\
			{\
				gt_db_Debug('Abbruch nach '+k+' loops');\
				break;\
			}\
		}\
		gt_db_Debug('nach '+k+'---- rest='+restCap);\
		for (i=0; i<gt_bl_groundUnits.length; i++)\
		{\
			if (sendUnits[gt_bl_groundUnits[i]])\
				gt_db_Debug(sendUnits[gt_bl_groundUnits[i]].name+' '+sendUnits[gt_bl_groundUnits[i]].count);\
		}\
		handler.getUnitInputs().each(function ()\
		{\
			if (!sendUnits[this.name])\
			{\
				if (handler.data.units[this.name].count>0)\
					this.value=handler.data.units[this.name].count;\
				else\
					this.value='';\
			}\
		});\
		for (i=0; i<gt_bl_groundUnits.length; i++)\
		{\
			if (sendUnits[gt_bl_groundUnits[i]])\
			{\
				if (sendUnits[gt_bl_groundUnits[i]].count>0)\
					$('DIV#gpwnd_'+wndid+' INPUT.unit_type_'+gt_bl_groundUnits[i]).val(sendUnits[gt_bl_groundUnits[i]].count);\
				else\
					$('DIV#gpwnd_'+wndid+' INPUT.unit_type_'+gt_bl_groundUnits[i]).val('');\
			}\
		}\
		$('DIV#gpwnd_'+wndid+' INPUT.unit_type_sword').trigger('change');\
	}\
	function gt_bl_delete(wndid)\
	{\
		var wnd=GPWindowMgr.GetByID(wndid);\
		if (!wnd)\
			return;\
		var handler=wnd.getHandler();\
		if (!handler)\
			return;\
		handler.getUnitInputs().each(function ()\
		{\
			this.value='';\
		});\
		$('DIV#gpwnd_'+wndid+' INPUT.unit_type_sword').trigger('change');\
	}\
	function gt_bl_initWnd()\
	{\
		var wnds=GPWindowMgr.getOpen(Layout.wnd.TYPE_TOWN);\
		if (wnds.length==0)\
		{\
			return;\
		}\
		var testel=$('DIV#gpwnd_'+wndid+' A.gt_balanced');\
		if (testel.length>0) return;\
		var wnd=wnds[wnds.length-1];\
		var wndid=wnd.getID();\
		var ael=$('DIV#gpwnd_'+wndid+' A.select_all_units');\
		$(ael).after('&nbsp;|&nbsp;<a class=gt_balanced style=\\\'position:relative; top:3px\\\' href=javascript:gt_bl_process('+wndid+')>Kein \u00dcberladen</a>\
		&nbsp;|&nbsp;<a style=\\\'position:relative; top:3px\\\' href=javascript:gt_bl_delete('+wndid+')>L\u00f6schen</a>');\
	}\
"));
document.body.appendChild(scriptEl);
}
// Modul Konfiguration gt_cfg
if (true)
{
var scriptEl = document.createElement("script");
scriptEl.setAttribute('type','text/javascript');
scriptEl.appendChild(document.createTextNode("\
    var gt_cfg_townid=1;\
    var gt_cfg_gsbutton=1;\
    var gt_cfg_kultur=1;\
    var gt_cfg_befehle=1;\
    var gt_cfg_gunst=0;\
    var gt_cfg_forum=0;\
    var gt_cfg_balancedload=1;\
"));
document.body.appendChild(scriptEl);
}
