// ==UserScript==
// @name           VKontakte Audio 2
// @description    Adds a download link and magnet with artist and title to VKontakte audio search.
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// @grant GM_getValue
// @grant GM_deleteValue
// @grant GM_listValues
// @grant GM_setValue
// ==/UserScript==

const __GM_STORAGE_PREFIX = [
    '', "GM_STORAGE_PREFIX", "VKontakte_Audio_2", ''].join('***');
(function(){

//part of https://userscripts.org/scripts/source/145813.user.js
	// All of the GM_*Value methods rely on DOM Storage's localStorage facility.
	// They work like always, but the values are scoped to a domain, unlike the
	// original functions.  The content page's scripts can access, set, and
	// remove these values.  A
	if (localStorage){
		if (!GM_deleteValue) {
			function GM_deleteValue(aKey) {
			  
			  localStorage.removeItem(__GM_STORAGE_PREFIX + aKey);
			}
		}

		if (!GM_getValue) {
			function GM_getValue(aKey, aDefault) {
			  
			  var val = localStorage.getItem(__GM_STORAGE_PREFIX + aKey)
			  if (null === val && 'undefined' != typeof aDefault) return aDefault;
			  return val;
			}
		}
		
		if (!GM_listValues) {
			function GM_listValues() {
			  
			  var prefixLen = __GM_STORAGE_PREFIX.length;
			  var values = [];
			  var i = 0;
			  for (var i = 0; i < localStorage.length; i++) {
				var k = localStorage.key(i);
				if (k.substr(0, prefixLen) === __GM_STORAGE_PREFIX) {
				  values.push(k.substr(prefixLen));
				}
			  }
			  return values;
			}
		}
		
		if (!GM_setValue) {
			function GM_setValue(aKey, aVal) {
			  
			  localStorage.setItem(__GM_STORAGE_PREFIX + aKey, aVal);
			}
		}
	}
//End of part

	function get_value(name, local_value){
		if (!GM_getValue)
			return local_value;
		else
			return GM_getValue(name, local_value);
	}
	
	function set_value(name, value){
		if (GM_setValue)
			GM_setValue(name, value);
		return value;
	}
	
	function switch_value(name, local_value){
		return set_value(name, !get_value(name, local_value));
	}
	
	// local_value = switch_value("global_value", local_value);
	
	function remove_node(node){
		if(node.parentNode)
			return node.parentNode.removeChild(node);
	}
	
	function utf_to_1251_uri (utf_str) {
		var buf = [];
		for (var i = 0, code = 0; i < utf_str.length; i++) {
			code = utf_str.charCodeAt(i);
			if (code > 127) {
				if (code > 1024) {
					if (code == 1025)
						code = 1016;
					else if (code == 1105)
						code = 1032;
					else if (code > 1103)
						continue;
					buf.push("%",(code - 848).toString(16));
				}
			} else
				buf.push(encodeURIComponent(utf_str.charAt(i)));
		}
		return buf.join("");
	}

	var byTag="getElementsByTagName", byClass="getElementsByClassName", byId = "getElementById" ;

	var head = document[byTag]("head")[0];
	var body = document[byTag]("body")[0];

	function get_text(node){
		return (!node) ? "" : node.textContent || node.text || (function(node){
			var _result = "";
			if (node == null) {
				return _result;
			}
			var childrens = node.childNodes;
			var i = 0;
			while (i < childrens.length) {
				var child = childrens.item(i);
				switch (child.nodeType) {
					case 1: // ELEMENT_NODE
					case 5: // ENTITY_REFERENCE_NODE
						_result += arguments.callee(child);
						break;
					case 3: // TEXT_NODE
					case 2: // ATTRIBUTE_NODE
					case 4: // CDATA_SECTION_NODE
						_result += child.nodeValue;
						break;
					case 6: // ENTITY_NODE
					case 7: // PROCESSING_INSTRUCTION_NODE
					case 8: // COMMENT_NODE
					case 9: // DOCUMENT_NODE
					case 10: // DOCUMENT_TYPE_NODE
					case 11: // DOCUMENT_FRAGMENT_NODE
					case 12: // NOTATION_NODE
					// skip
					break;
				}
				i++;
			}
			return _result;
		}(node));
	}

	function text_node(text){
		return document.createTextNode(text);
	}

	function new_element(name){
		return document.createElement(name);
	}

	function a_tag(url, node, class_name, onclick, id, target, title){
		var a = new_element("a");
		if (url) a.href = url; else a.href = "javascript: void(0);";
		if (node) a.appendChild(node);
		if (class_name) a.className = class_name;
		if (onclick) a.addEventListener("click", onclick, false);
		if (id) a.id = id;
		if (target) a.target = target;
		if (title) a.title = title;
		return a;
	}

	function set_my_style(style_text){
		var style_tag = new_element("style");
		style_tag.appendChild(text_node(style_text));
		head.appendChild(style_tag);
	}

	// Tracks buttons

	function get_info(audio){
		var info = {};
		
		var value = audio[byTag]("input")[0]
		if (value) value = value.value.split(','); else return;
		info.url = value[0];
		info.duration = value[1];
		info.title = get_text(audio[byClass]("title")[0] || audio[byTag]("span")[0]);
		info.artist = get_text(audio[byTag]("b")[0][byTag]("a")[0]);
		return info;
	}

	var utf_8_url = get_value("utf_8_url", true);

	function extend_url(info){
		var file_name = info.artist + " - " + info.title + ".mp3";
		return info.url + "?/" + (utf_8_url?encodeURIComponent(file_name):utf_to_1251_uri(file_name)); 
	}

	function extend_magnet(info){
		return "magnet:?as=" + encodeURIComponent(info.url) + "&dn=" + encodeURIComponent(info.artist + " - " + info.title) + ".mp3";
	}

	function checked(node, set){
		if (set)
			node.setAttribute("link_added", "true");
		return node.getAttribute("link_added") == "true";
	}
	
	function remove_track(e){
		var audio = e.target
		while ( audio && audio.id.indexOf("audio")<0 )
			audio = audio.parentNode;
		if (audio) remove_node(audio);
		return false;
	}

	
	function return_true(){
		return true;
	}
	
	var new_tracks = false;
	var count = 0;
	
	function insertAfter(root, after, element){
		if (after && after.nextSibling)
			root.insertBefore(element, after.nextSibling);
		else
			root.appendChild(element);
	}
	
	function find_tracks(){
		var audios = document[byClass]("audio");
		for(var index=audios.length; index;){
			var root = audios[--index];
			if (!checked(root)){
				new_tracks = true;
				var info = get_info(root);
				if (!info) continue;
				var title_wrap = root[byClass]("audio_title_wrap")[0] || root[byClass]("title_wrap")[0] || root[byClass]("info")[0];
				var title = title_wrap[byClass]("title")[0]
				
				insertAfter(title_wrap,title,a_tag(extend_url(info), null, "button url", return_true, null, "_blank"));
				insertAfter(title_wrap,title,a_tag(extend_magnet(info), null, "button magnet", return_true, null, "_blank"));
				insertAfter(title_wrap,title,a_tag(null, null, "button remove_track", remove_track));
				root[byTag]("b")[0][byTag]("a")[0].href = "/audio?performer=1&q="+encodeURIComponent(info.artist);
				checked(root, true);
			}else if(count == audios.length)
				return;
		}
		count = audios.length;
	}

	setInterval(find_tracks, 1000);

	var hide_button = get_value("hide_button", false);
	if (hide_button)
		set_my_style("\
	.audio:hover .button{display: block;}\
	.button{display: none;}\
		")
	
	set_my_style("\
	.button{float: right; width: 16px; height: 16px; margin-left: 1px; margin-right: 1px; background-repeat: no-repeat; position: relative; z-index: 100;}\
	.url{background-image:url('data:image/gif;base64,R0lGODlhEAAQAKEAAGCAoP7+/gAAAAAAACH5BAEAAAIALAAAAAAQABAAAAIeFI6Zpu0YYnhJToqfzWBnr1lSKF5O+Y1cxLUuwwkFADs=');}\
	.magnet{background-image:url('data:image/gif;base64,R0lGODlhEAAQAJAAAGGAoP7+/iH5BAQAAP8ALAAAAAAQABAAAAIjDI6Zpu3/glxTSXYu3Ej3SmGAF5YWOKLZxaprK54sR9ejHRQAOw==');}\
	.remove_track{background-image:url('data:image/gif;base64,R0lGODlhCwALAIABAGuNsf///yH5BAEAAAEALAAAAAALAAsAAAIZTGCJBq3e4omI2nfTlNo65kHUJi6boh1GAQA7');}\
	");

	// Filters

	var re = /[- _.0-9]/g, es = "";

	function clear_string(str){
		return str && str.toLowerCase().replace(re,es);
	}
	
	function get_search_query(){
		var query = (document[byId]("search_query") || document[byId]("s_search"))
		if (query && !query.focused){
			return clear_string(query.value)
		}
	}

	function by(name, audio, info, query){
		if (clear_string(info[name]) != query){
			remove_node(audio);
			return true;
		}
	}

	var soft_filter = get_value("soft_filter", false);
	var group = true;

	function remove_copy_of(audio, info, list){
		var artist = clear_string(info.artist);
		var title = clear_string(info.title);
		
		if (group) {
			var rez = title.indexOf("(");
			if (rez < 0)
				rez = title.indexOf("[");

			if (rez > 0)
				title = title.slice(0,rez);
				
			//window.console.log(title);
		}
		
		var node;
		var key = artist;
		
		if (!list[key]) list[key] = {};
		node = list[key];
		
		key = title;
		if (soft_filter){
			if (!node[key]) node[key] = {};
			node = node[key];
			
			key = info.duration
		}
		
		var index = 0;
		var list = node[key];
		
		for(; list && (index < list.length); index++){
			var audio2 = list[index]
			if (audio2 != audio && audio2.parentNode == audio.parentNode){
				remove_node(node[key][index]);
				break;
			}
		}
		
		if (!list) 
			node[key] = list = [];
			
		node[key][index] = audio;
	}

	var filter_sw = [0, "artist", "title"];
	var filter_antispam = get_value("filter_antispam", false);
	var filter_copy = get_value("filter_copy", false);
	var filter_changed = false;

	function filter_tracks(){
		if (new_tracks || filter_changed){
			new_tracks = false;
			filter_changed = false;
			if (filter_sw[0] || filter_copy || filter_antispam){
				var for_filters = {};
				var audios = document[byClass]("audio");
				var query = get_search_query();
				for(var index=audios.length; index;){
					var root = audios[--index];
					var info = get_info(root);
					if (info){
						if (filter_antispam && (info.artist.length > 50 || info.title.length > 100)){
							remove_node(root);
							continue;
						}
						if (query && filter_sw[0])
							if (by(filter_sw[filter_sw[0]], root, info, query))
								continue;
						
						if (filter_copy)
							remove_copy_of(root, info, for_filters);
					}
				}
				delete for_filters;
			}
		}
	}

	setInterval(filter_tracks, 1000);

	// playlists

	var nl = encodeURIComponent('\n');
	
	var local_playlist = get_value("local_playlist", false);
	var extended_m3u = get_value("extended_m3u", true);
	
	function make_playlist(){
		var audios = document[byClass]("audio");
		var buffer = [];
		buffer.push("data:audio/x-mpegurl;charset="+(utf_8_url?"utf-8,":"windows-1251,"));
		if (extended_m3u) buffer.push(encodeURIComponent('#EXTM3U\n'));
		
		for(var index=0; index<audios.length; index++){
			var info;
			if (audios[index].parentNode && ( info = get_info(audios[index]) )){
				var track = (utf_8_url?encodeURIComponent:utf_to_1251_uri)(info.artist + " - " + info.title);
				if (extended_m3u) buffer.push(encodeURIComponent('#EXTINF:'), info.duration, ',', track, nl);
				buffer.push(local_playlist?"":encodeURIComponent(info.url),local_playlist?"":encodeURIComponent("?/"),track,".mp3", nl, nl);
			}
		}
		
		window.open(buffer.join(""), "_blank")
	}
	
	function make_magnetlist(){
		var audios = document[byClass]("audio");
		var buffer = [];
		buffer.push("data:text/plain;charset=utf-8,");
		var info;
		
		for(var index=0; index<audios.length; index++){
			if (audios[index].parentNode && ( info = get_info(audios[index]) ))
				buffer.push(encodeURIComponent(extend_magnet(info)), nl);
		}
		
		window.open(buffer.join(""), "_blank")
	}
	
	//Keyboard
	
	

	var unsafeWindow= this.unsafeWindow;
	(function(){
		var test_scr= document.createElement("script");
		var tid= ("t" + Math.random() + +(new Date())).replace(/\./g, "");
		test_scr.text= "window."+tid+"=true";
		document.querySelector("body").appendChild(test_scr);
		if (typeof(unsafeWindow) == "undefined" || !unsafeWindow[tid]) {
			if (window[tid]) {
				unsafeWindow= window;
			} else {
				var scr= document.createElement("script");
				scr.text= "(" +
					(function() {
						var el= document.createElement('unsafeWindow');
						el.style.display= 'none';
						el.onclick=function(){return window};
						document.body.appendChild(el);
					}).toString() + ")()";
				document.querySelector("body").appendChild(scr);
				this.unsafeWindow= document.querySelector("unsafeWindow").onclick();
				unsafeWindow= window.unsafeWindow;
			};
		}
	})();
	
	
	
	function play_pause(){
			var audioPlayer = unsafeWindow.audioPlayer;
			if (audioPlayer && audioPlayer.id) {audioPlayer.operate(audioPlayer.id);}
	}
	
	function play_next(){
		if (unsafeWindow.audioPlayer)
			unsafeWindow.audioPlayer.nextTrack();
	}
	
	function play_previous(){
		if (unsafeWindow.audioPlayer)
			unsafeWindow.audioPlayer.prevTrack();
	}
	
	function check_button(e){
		if (unsafeWindow.audioPlayer)
			switch(e.which){
				case 179: // play/pause
				case 19: // Pause Break 
					play_pause();
					break;
				case 176: // next
				case 34: //Page Down
					play_next();
					break;
				case 177: // previous
				case 33: //Page Up
					play_previous();
					break;
				default:
					return true;
			}
		return false;
	}
	
	var binded={};

	function bind_keyboard(){
		var el_l = document[byTag]("input");
		for (var i=0;i<el_l.length;i++)
			if (el_l[i].id && (!binded[el_l[i].id] || (binded[el_l[i].id]!=el_l[i]))){
				binded[el_l[i].id] = el_l[i];
				el_l[i].parentNode.addEventListener("keydown",check_button, false);
			}
	}
	
	
	setInterval(bind_keyboard, 1000);
	// Interface
	
	function get_class(on_off){
		return on_off?"filter_on":"filter_off";
	}
	
	function sw_class(node, on_off){
		node.className = get_class(on_off);
		filter_changed = true;
	}

	function filter_copy_sw(event){
		filter_copy = set_value("filter_copy",!filter_copy);
		sw_class(event.target, filter_copy)
	}

	function filter_copy_soft_sw(event){
		soft_filter = set_value("soft_filter", !soft_filter);
		sw_class(event.target, soft_filter)
	}
	
	function local_playlist_sw(event){
		local_playlist = set_value("local_playlist", !local_playlist);
		sw_class(event.target, local_playlist)
	}
	
	function filter_antispam_sw(event){
		filter_antispam = set_value("filter_antispam", !filter_antispam);
		sw_class(event.target, filter_antispam)
	}
	
	function hide_button_sw(event){
		hide_button = set_value("hide_button", !hide_button);
		sw_class(event.target, hide_button)
	}
	
	function extended_m3u_sw(event){
		extended_m3u = set_value("hide_button", !extended_m3u);
		sw_class(event.target, extended_m3u)
	}
	
	function filter_title_sw(event)
	{
		var artist_filter_sw = document[byId]("artist_filter_sw");
		filter_sw[0] = (filter_sw[0] == 2)? 0: 2;
		sw_class(event.target, filter_sw[0]==2);
		sw_class(artist_filter_sw, filter_sw[0]==1);
	}

	function filter_artist_sw(event)
	{
		var title_filter_sw = document[byId]("title_filter_sw");
		filter_sw[0] = (filter_sw[0] == 1)? 0: 1;
		sw_class(event.target, filter_sw[0]==1);
		sw_class(title_filter_sw, filter_sw[0]==2);
	}


	function urf8_encode_sw(event)
	{
		utf_8_url = switch_value("utf_8_url", utf_8_url);
		sw_class(event.target, utf_8_url);
	}
	
	
	function add_link(params){
		var a = new_element("a");
		if (params.href) a.href = params.href; else a.href = "javascript: void(0);";
		if (params.child) a.appendChild(params.child);
		if (params.className) a.className = params.className;
		if (params.onclick) a.addEventListener("click", params.onclick, false);
		if (params.id) a.id = params.id;
		if (params.target) a.target = params.target;
		if (params.title) a.title = params.title;
		return a;
	}

	var commands = (function(){
		var conteiner = new_element("div");

			conteiner.appendChild(new_element("br"));

			conteiner.appendChild(a_tag(null, text_node("убрать копии"), get_class(get_value("filter_copy", filter_copy)), filter_copy_sw, null, null , "Убрать композиции с идентичными названиями."));
			
			conteiner.appendChild(text_node(" "));
			
			conteiner.appendChild(a_tag(null, text_node("м"), get_class(soft_filter), filter_copy_soft_sw, null, null, "Учитывать длительность композиции при фильтрации копий."));
			
			conteiner.appendChild(new_element("br"));
			
			conteiner.appendChild(a_tag(null, text_node("артист"), get_class(filter_sw[0]==1), filter_artist_sw, "artist_filter_sw", null, "Сравнивает текст в строке поиска с названием группы (артиста)"));
			
			conteiner.appendChild(text_node(" - "));
			
			conteiner.appendChild(a_tag(null, text_node("название"), get_class(filter_sw[0]==2), filter_title_sw, "title_filter_sw", null, "Сравнивает текст в строке поиска с названием композиции"));
			
			conteiner.appendChild(new_element("br"));
			
			conteiner.appendChild(a_tag(null, text_node("антиспам"), get_class(get_value("filter_antispam", filter_antispam)), filter_antispam_sw, null, null, "Убрать трек если имя артиста больше 50 символов или название трека больше 100"));
			
			conteiner.appendChild(new_element("br"));
			
			conteiner.appendChild(a_tag(null, text_node("плэйлист"), null, make_playlist));
			
			conteiner.appendChild(text_node(" "));
			
			conteiner.appendChild(a_tag(null, text_node("л"), get_class(get_value("local_playlist", local_playlist)), local_playlist_sw, null, null, "Плейлист только с именами файлов. Используется для воспроизведения файлов из папки куда они загружаются"));
			
			conteiner.appendChild(text_node(" "));
			
			conteiner.appendChild(a_tag(null, text_node("e"), get_class(get_value("extended_m3u", extended_m3u)), extended_m3u_sw, null, null, "Плейлист с дополнительными полями информации: длительность композиции, название трека"));
			
			conteiner.appendChild(text_node(" "));
			
			conteiner.appendChild(a_tag(null, text_node("utf8 url"), get_class(get_value("utf_8_url", utf_8_url)), urf8_encode_sw));
			
			conteiner.appendChild(new_element("br"));
			
			conteiner.appendChild(a_tag(null, text_node("магнитлист"), null, make_magnetlist));

			
			
			conteiner.appendChild(new_element("br"));
			conteiner.appendChild(new_element("br"));
			
			 var keyboard_player = a_tag(null, text_node("управление плеером с клавитуры"), null, function(e){
				e.target.focus();
				return false;
			 }, "keyboard_player", null, "играть/пауза - Pause Break | назат - Page Up | вперёд - Page Down | Также медиа клавиши тоже должны работать.")
			 conteiner.appendChild(keyboard_player);
			
			 keyboard_player.addEventListener("keydown",check_button, false);
			 
			conteiner.appendChild(new_element("br"));
			
			conteiner.appendChild(a_tag(null, text_node("скрыть кнопки"), get_class(hide_button), hide_button_sw));
			
			conteiner.appendChild(new_element("br"));
			
			conteiner.appendChild(a_tag("http://userscripts.org/scripts/show/100073", text_node("фильтр скрипт здесь"), null, null, null, "_blank"));
			conteiner.appendChild(text_node(" "));
			conteiner.appendChild(a_tag("/share.php?url=http://userscripts.org/scripts/show/100073", text_node("♥"), null, null, "share_button", "_blank", "расскажи друзьям (ссылка добавится на стену)"));

		return conteiner;
	})();

	function check_conteiner(){
		var insert_element = document[byId]("side_bar") || document[byId]("left_blocks") || document[byId]("side_panel") || document[byId]("filters");
		if (commands.parentNode != insert_element){
			if (insert_element){
				var menu = insert_element.getElementsByTagName("OL")[0];
				if (menu && insert_element.id && insert_element.id =="side_bar"){
					insert_element.insertBefore(commands, menu.nextElementSibling);
				}else
					insert_element.appendChild(commands);
			}
		}
	}

	setInterval(check_conteiner, 1000);

	set_my_style(".filter_on, #keyboard_player:focus{font-weight: bold;}\
				  #share_button{font-size: 15px; font-weight: 900;}")

	//set_my_style("#album_filters{position: fixed}")
})()