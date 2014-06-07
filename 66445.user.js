// ==UserScript==
// @name           Kabile Savaşları
// @version        0.1
// @namespace      Hcakkuzu
// @description    __by hcakkuzu__
// @include        http://d*.kabilesavaslari.com/*
// @copyright      Copyright (c) 2010, Edit By Hcakkuzu İLERİ
// ==/UserScript==

// ======== Language Dictionary ========

var lng = {
"tr" : {
	"villages" : "Köyler",
	"overview" : "Köy genel durum",
	"map"      : "Harita",
	"main"     : "Merkez Bina",
	"place"    : "Komuta merkezi",
	"train"    : "Eğitme",
	"barracks" : "Kışla",
	"stable"   : "At Çiftliği",
	"garage"   : "Atölye",
	"smith"    : "Demirci Atölyesi",
	"statue"   : "Heykel",
	"market"   : "Market",
	"snob"     : "Akademi",
	"player"   : "Oyuncu",
	"tribe"    : "Klan",
	"i_player" : "Oyuncu profilini göster",
	"i_tribe"  : "Klan profilini göster",
	"loading"  : "Yükleniyor...",
	"c_close"  : "Kapamak icin tıklayın",
	"track"    : "Köy casuslama",
	"tracked"  : "Köy casuslandı",
	"untrked"  : "Köy casuslanmadı",
	"untrack"  : "Casuslanmayan köy",
	"cltrack"  : "Hepsini sil",
	"notrack"  : "Casuslanan köy yok",
	"oktrack"  : "Casuslanan köyler",
	"at_none"  : "Yeniden saldırma",
	"at_same"  : "Aynı birimlerle yeniden saldırma",
	"at_all"   : "Bütün birimlerle yeniden saldırma"
},
};


// ======== Enhance Map Screen ========

function enhance_map_screen(){

	// Get map size
	var new_size = TW_getValue("MSize");
	if(!new_size) new_size = 15;
	TW_setValue("MSize", new_size);

	TW_Set_Function("resize_map", function(){
		var mss = $("map_size_select");
		var nsz = parseInt(mss.options[mss.selectedIndex].value);
		TW_setValue("MSize", nsz);
		window.setTimeout("window.location.reload(true)", 100);
	});

	var form = $$("form")[1];
	var sizes = [7, 10, 12, 15, 18, 20, 22, 24, 26, 28, 30];
	var iHtml = '<table><tr><td>Harita Boyutu(By Hcakkuzu):</td><td><select id="map_size_select" onchange="resize_map()">';
	for(kk=0; kk<sizes.length; kk++) iHtml += '<option ' + (sizes[kk]==new_size ? 'selected="selected" ' : '') + 'value="' + sizes[kk] +'">' + sizes[kk] + 'x' + sizes[kk] + '</option>';
	iHtml += '</select></td></tr></table>';
	form.innerHTML += iHtml;

	var map_requests_needed = null;
	var map_requests_size   = null;

	if(new_size < 16){
		map_requests_needed = 1;
	}else{
		map_requests_needed = 4;
		map_requests_size   = parseInt(new_size / 2);
		new_size = map_requests_size * 2;
	}

	// Get mpt points
	TW_Mpt = get_mpt();

	// Get current position
	var map_x = TW_Get_Variable("mapX");
	var map_y = TW_Get_Variable("mapY");
	var map_s = TW_Get_Variable("mapSize");

	// Calculate new X and Y
	var delta = parseInt((map_s - new_size) / 2);

	// Overwrite values
	map_x += delta;
	map_y += delta;

	// InnerHTML
	var ihtml = "";
	ihtml += '<tr>';
	ihtml += '<td height="38">' + map_y + '</td>';
	ihtml += '<td colspan="' + new_size + '" rowspan="' + new_size + '">';
	ihtml += '<div style="background-image:url(graphic/map/gras1.png); position:relative; width:' + (53 * new_size) + 'px; height:' + (38 * new_size) +'px; overflow:hidden" id="map">';
	ihtml += '<div id="mapOld" style="position:absolute">';
	if(map_requests_needed == 4){
		var w = 53 * map_requests_size + 1;
		var h = 38 * map_requests_size + 2;
		ihtml += '<table cellspacing="0" cellpadding="0"><tr><td><div id="old_1" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">' + TW_Lang["loading"] + '</div></div></td><td><div id="old_2" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr><tr><td><div id="old_3" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td><td><div id="old_4" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr></table>';
	}
	ihtml += '<div style="margin:10px; color:white">' + TW_Lang["loading"] + '</div>';
	ihtml += '</div>';
	ihtml += '<div id="mapNew" style="position:absolute; left:0px; top:0px">&nbsp;</div>';
	ihtml += '</div>';
	ihtml += '</td>';
	ihtml += '</tr>';
	for(jj=1; jj<new_size; jj++){
		ihtml += '<tr><td width="20" height="38">' + (map_y + jj) + '</td></tr>';
	}
	ihtml += '<tr id="map_x_axis">';
	ihtml += '<td height="20"></td>';
	for(jj=0; jj<new_size; jj++){
		ihtml += '<td align="center" width="53">' + (map_x + jj) + '</td>';
	}
	ihtml += '</tr>';
	$("mapCoords").innerHTML = ihtml;

	// Update data (asynchronously)
	if(map_requests_needed == 1){
		var url = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + new_size + '&size_y=' + new_size;
		var xhReq = new XMLHttpRequest();
		xhReq.open("GET", url, true);
		xhReq.onreadystatechange = function(){
			if(xhReq.readyState != 4 || xhReq.status != 200) return;
			$("mapOld").innerHTML = xhReq.responseText;
		}
		xhReq.send(null);
	}else{
		var url_1 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;
		var url_2 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + (map_x + map_requests_size) + '&start_y=' + map_y + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;
		var url_3 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + map_x + '&start_y=' + (map_y + map_requests_size) + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;
		var url_4 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + (map_x + map_requests_size) + '&start_y=' + (map_y + map_requests_size) + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;

		var xhReq_1 = new XMLHttpRequest();
		xhReq_1.open("GET", url_1, true);
		xhReq_1.onreadystatechange = function(){
			if(xhReq_1.readyState != 4 || xhReq_1.status != 200) return;
			$("old_1").innerHTML = xhReq_1.responseText;
		}
		xhReq_1.send(null);

		var xhReq_2 = new XMLHttpRequest();
		xhReq_2.open("GET", url_2, true);
		xhReq_2.onreadystatechange = function(){
			if(xhReq_2.readyState != 4 || xhReq_2.status != 200) return;
			$("old_2").innerHTML = xhReq_2.responseText;
		}
		xhReq_2.send(null);

		var xhReq_3 = new XMLHttpRequest();
		xhReq_3.open("GET", url_3, true);
		xhReq_3.onreadystatechange = function(){
			if(xhReq_3.readyState != 4 || xhReq_3.status != 200) return;
			$("old_3").innerHTML = xhReq_3.responseText;
		}
		xhReq_3.send(null);

		var xhReq_4 = new XMLHttpRequest();
		xhReq_4.open("GET", url_4, true);
		xhReq_4.onreadystatechange = function(){
			if(xhReq_4.readyState != 4 || xhReq_4.status != 200) return;
			$("old_4").innerHTML = xhReq_4.responseText;
		}
		xhReq_4.send(null);

		TW_Set_Function("downloadMapData", function(x_mod, y_mod){

			var map_x  = TW_Get_Variable("mapX");
			var map_y  = TW_Get_Variable("mapY");
			var map_s  = TW_Get_Variable("mapSize");
			var map_ss = map_s / 2;

			map_x += x_mod * map_s;
			map_y += y_mod * map_s;

			TW_Set_Variable("mapX", map_x);
			TW_Set_Variable("mapY", map_y);

			// Prepare new blocks
			var w = 53 * map_ss + 1;
			var h = 38 * map_ss + 1;
			var map_new = TW_Get_Variable("mapNew");
			map_new.innerHTML = '<table cellspacing="0" cellpadding="0"><tr><td><div id="new_1" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">' + TW_Lang["loading"] + '</div></div></td><td><div id="new_2" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr><tr><td><div id="new_3" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td><td><div id="new_4" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr></table>';

			var url_1 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + map_ss + '&size_y=' + map_ss;
			var url_2 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + (map_x + map_ss) + '&start_y=' + map_y + '&size_x=' + map_ss + '&size_y=' + map_ss;
			var url_3 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + map_x + '&start_y=' + (map_y + map_ss) + '&size_x=' + map_ss + '&size_y=' + map_ss;
			var url_4 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + (map_x + map_ss) + '&start_y=' + (map_y + map_ss) + '&size_x=' + map_ss + '&size_y=' + map_ss;

			var xhReq_1 = new XMLHttpRequest();
			xhReq_1.open("GET", url_1, true);
			xhReq_1.onreadystatechange = function(){
				if(xhReq_1.readyState != 4 || xhReq_1.status != 200) return;
				$("new_1").innerHTML = xhReq_1.responseText;
			}
			xhReq_1.send(null);

			var xhReq_2 = new XMLHttpRequest();
			xhReq_2.open("GET", url_2, true);
			xhReq_2.onreadystatechange = function(){
				if(xhReq_2.readyState != 4 || xhReq_2.status != 200) return;
				$("new_2").innerHTML = xhReq_2.responseText;
			}
			xhReq_2.send(null);

			var xhReq_3 = new XMLHttpRequest();
			xhReq_3.open("GET", url_3, true);
			xhReq_3.onreadystatechange = function(){
				if(xhReq_3.readyState != 4 || xhReq_3.status != 200) return;
				$("new_3").innerHTML = xhReq_3.responseText;
			}
			xhReq_3.send(null);

			var xhReq_4 = new XMLHttpRequest();
			xhReq_4.open("GET", url_4, true);
			xhReq_4.onreadystatechange = function(){
				if(xhReq_4.readyState != 4 || xhReq_4.status != 200) return;
				$("new_4").innerHTML = xhReq_4.responseText;
			}
			xhReq_4.send(null);
		});

		// ScrollX fix
		function watchMouse(e){
			var info = document.getElementById("info");
			if(!info || info.style.visibility != "visible") return false;

			var scrollX, scrollY, mouseX, mouseY;
			if(e){
				scrollX = window.pageXOffset;
				scrollY = window.pageYOffset;
				mouseX  = e.clientX;
				mouseY  = e.clientY;
			}else{
				scrollX = document.body.scrollLeft;
				scrollY = document.body.scrollTop;
				mouseX  = window.event.clientX;
				mouseY  = window.event.clientY;
			}

			info.style.left = mouseX + 5 + scrollX + "px";
			info.style.top =  mouseY - 100 + scrollY + "px";
		};

		if(document.addEventListener) document.addEventListener("mousemove", watchMouse, true);
		else document.onmousemove = watchMouse;
	}

	// ajaxMapInit()
	TW_Set_Variable("mapOld",  $('mapOld'));
	TW_Set_Variable("mapNew",  $('mapNew'));
	TW_Set_Variable("mapX",    map_x);
	TW_Set_Variable("mapY",    map_y);
	TW_Set_Variable("mapSize", new_size);

	// mapMoveTopo()
	var scrollX = map_x;
	var scrollY = map_y;
	TW_Set_Variable("scrollX", scrollX);
	TW_Set_Variable("scrollY", scrollY);
	var topoX = parseInt(document.getElementsByName('min_x')[0].value);
	var topoY = parseInt(document.getElementsByName('min_y')[0].value);

	var relX = scrollX - topoX;
	if(TW_Get_Variable("globalYDir") == 1){
		var relY = scrollY - topoY;
	}else{
		var relY = (45-mapSize) - (scrollY-topoY);
	}
	
	// Rechteck verschieben (whatever this mean :)
	$('topoRect').style.left   = (5*(relX)) + 'px';
	$('topoRect').style.top    = (5*(relY)) + 'px';
	$('topoRect').style.width  = (5*(new_size)) + 'px';
	$('topoRect').style.height = (5*(new_size)) + 'px';

	// Tracking
	TW_Set_Function("old_map_popup", TW_Get_Function("map_popup"));
	TW_Set_Function("map_popup", function(title, bonus_image, bonus_text, points, owner, ally, village_groups, moral, village_id, source_id){
		var x_title  = arguments[0];
		var x_points = null;
		if(arguments.length == 8){
			x_points = arguments[1];
			(TW_Get_Function("old_map_popup"))(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
		}else{
			x_points = arguments[3];
			(TW_Get_Function("old_map_popup"))(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);
		}

		var tmp = x_title.match( /\(([^\)]+)/ );
		var vlg_coords = tmp && tmp[1] ? tmp[1] : null;
		if(vlg_coords != null){
			vlg_coords = vlg_coords.replace(/\|/, "x");
			$("info_points").innerHTML = x_points + get_mpt_xhtml(vlg_coords, x_points);
		}
	});
}


