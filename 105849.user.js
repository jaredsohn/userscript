// ==UserScript==
// @name           Download All Songs Vkontakte
// @description    Устанавливаете скрипт, заходите на страницу вконтакте где показаны интересующие вас аудиозаписи, прокручиваете страницу до конца, чтобы скрипт увидел все песни. Дальше нажимаете на кнопку "[!]Скачать плейлист[!]". В окне должны появится ссылки на все песни. С помощью плагина DownloadThemAll! (https://addons.mozilla.org/en-US/firefox/addon/downthemall/) выкачиваете все файлы. Советую ограничить количество одновременных загрузок до 4-х в настройках плагина.
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

(function(){
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

	function extend_url(info){
		return info.url + "#/" + encodeURIComponent(info.artist + " - " + info.title) + ".mp3"
	}

	function extend_magnet(info){
		return "magnet:?as=" + encodeURIComponent(info.url) + "&dn=" + encodeURIComponent(info.artist + " - " + info.title) + ".mp3";
	}

	function checked(node, set){
		if (set)
			node.setAttribute("link_added", "true");
		return node.getAttribute("link_added") == "true";
	}

	var new_tracks = false;
	var count = 0;
	function find_tracks(){
		var audios = document[byClass]("audio");
		for(var index=audios.length; index;){
			var root = audios[--index];
			if (!checked(root)){
				new_tracks = true;
				var info = get_info(root);
				if (!info) continue;
				var title_wrap = root[byClass]("title_wrap")[0] || root[byClass]("info")[0];
				title_wrap.appendChild(a_tag(extend_url(info), null, "download url"));
				title_wrap.appendChild(a_tag(extend_magnet(info), null, "download magnet"));
				root[byTag]("b")[0][byTag]("a")[0].href = "/audio?q="+encodeURIComponent(info.artist);
				checked(root, true);
			}else if(count == audios.length)
				return;
		}

		count = audios.length;
	}

function printAllLinks() {
var allLinks = "";
		var audios = document[byClass]("audio");
		for(var i=audios.length - 1; i>=0; i--){
				var info = get_info(audios[i]);
allLinks = allLinks + extend_url(info) + "<br />";
		}
document.write(allLinks);
}

	setInterval(find_tracks, 1000);

	set_my_style("\
	.audio:hover .download{visibility: visible;}\
	.download{visibility: visible; display: block; float: right; width: 16px; height: 16px;}\
	.url{background-image: url('data:image/gif;base64,R0lGODlhEAAQAKEAAGCAoP7+/gAAAAAAACH5BAEAAAIALAAAAAAQABAAAAIeFI6Zpu0YYnhJToqfzWBnr1lSKF5O+Y1cxLUuwwkFADs=');}\
	.magnet{background-image:url('data:image/gif;base64,R0lGODlhEAAQAJAAAGGAoP7+/iH5BAQAAP8ALAAAAAAQABAAAAIjDI6Zpu3/glxTSXYu3Ej3SmGAF5YWOKLZxaprK54sR9ejHRQAOw==');}\
	");

	// Filters

	var re = / /g, es = "";

	function clear_string(str){
		return str && str.toLowerCase().replace(re,es);
	}

	function get_search_query(){
		var query = (document[byId]("search_query") || document[byId]("s_search"))
		if (query && !query.focused){
			return clear_string(query.value)
		}
	}

	function remove_node(node){
		if(node.parentNode)
			node.parentNode.removeChild(node);
	}

	function by(name, audio, info, query){
		if (clear_string(info[name]) != query){
			remove_node(audio);
			return true;
		}
	}

	var soft_filter = false;

	function remove_copy_of(audio, info, list){
		var artist = clear_string(info.artist);
		var title = clear_string(info.title);
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
		
		if (node[key] && node[key] != audio)
			remove_node(node[key]);
		
		node[key] = audio;
	}

	var filter_sw = [0, "artist", "title"];
	var filter_copy = false;
	var filter_changed = false;

	function filter_tracks(){
		if ( (new_tracks || filter_changed) && (filter_sw[0] || filter_copy)){
			new_tracks = false;
			filter_changed = false;
			var for_filters = {};
			var audios = document[byClass]("audio");
			var query = get_search_query();
			for(var index=audios.length; index;){
				var root = audios[--index];
				var info = get_info(root);
				if (info){
					if (!(query && filter_sw[filter_sw[0]] && by(filter_sw[filter_sw[0]], root, info, query))) 
						if (filter_copy) remove_copy_of(root, info, for_filters);
				}
			}
		}
	}

	setInterval(filter_tracks, 1000);
	// playlists

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

	var nl = encodeURIComponent('\n');

	function make_playlist(){
		var audios = document[byClass]("audio");
		var buffer = [];
		buffer.push("data:audio/x-mpegurl;charset=utf-8,");
		buffer.push(encodeURIComponent('#EXTM3U\n'));
		
		for(var index=0; index<audios.length; index++){
			var info;
			if (audios[index].parentNode && ( info = get_info(audios[index]) )){
				var track = utf_to_1251_uri(info.artist + " - " + info.title);
				buffer.push(encodeURIComponent('#EXTINF:'), info.duration, ',', track, nl);
				buffer.push(encodeURIComponent(info.url),"#/",track,".mp3", nl, nl);
			}
		}
		
		window.open(buffer.join(""), "_blank")
	}

	// Interface

	function sw_class(node, on_off){
		node.className = on_off?"filter_on":"filter_off";
		filter_changed = true;
	}

	function filter_copy_sw(event){
		filter_copy = !filter_copy;
		sw_class(event.target, filter_copy)
	}

	function filter_copy_soft_sw(event){
		soft_filter = !soft_filter;
		sw_class(event.target, soft_filter)
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

	var commands = (function(){
		var conteiner = new_element("div");
		conteiner.appendChild(a_tag(null, text_node("[!]Скачать плейлист[!]"), null, printAllLinks))		
		conteiner.appendChild(new_element("br"))

		conteiner.appendChild(a_tag(null, text_node("убрать копии"), filter_copy?"filter_on":"filter_off", filter_copy_sw, null, null , "Убрать композиции с идентичными названиями."))
		
		conteiner.appendChild(text_node(" "))
		
		conteiner.appendChild(a_tag(null, text_node("м"), filter_copy?"filter_on":"filter_off", filter_copy_soft_sw, null, null, "Учитывать длительность композиции при фильтрации копий."))
		
		conteiner.appendChild(new_element("br"))
		
		conteiner.appendChild(a_tag(null, text_node("артист"), filter_sw[0]==1?"filter_on":"filter_off", filter_artist_sw, "artist_filter_sw"))
		
		conteiner.appendChild(text_node(" - "));
		
		conteiner.appendChild(a_tag(null, text_node("название"), filter_sw[0]==2?"filter_on":"filter_off", filter_title_sw, "title_filter_sw"))
		
		conteiner.appendChild(new_element("br"))
		
		conteiner.appendChild(new_element("br"))
		
		return conteiner;
	})();

	function check_conteiner(){
		if (!commands.parentNode){
			var insert_element = document.getElementById("side_bar") || document.getElementById("left_blocks") || document.getElementById("side_panel") || document.getElementById("filters");
			
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

	set_my_style(".filter_on{font-weight: bold}")
	set_my_style("#album_filters{position: fixed}")
})()