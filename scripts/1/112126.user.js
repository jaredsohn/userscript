// ==UserScript==
// @name           vk radio
// @namespace      vk_radio
// @description    Радио в контакте
// @include        http://vk.com/*
// @downloadURL	   https://userscripts.org/scripts/source/112126.user.js
// @grant GM_xmlhttpRequest
// ==/UserScript==

(function (){
	//try{
		var byTag="getElementsByTagName", byClass="getElementsByClassName", byId = "getElementById" ;
	
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

		function makeRequest(url, callback) {
			if (GM_xmlhttpRequest) {
				GM_xmlhttpRequest({
				  method: "GET",
				  url: url,
				  onload: callback
				});
			}else{
				alert("no GM")
			}
		}

		function check_status(result){
			try{
				if (result.readyState == 4) 
					if (result.status == 200) 
						return true;
			}
			catch( e ) {}
		}

		var re = /[\s,\.\-\(\)]+/g, es = " ";

		function clear_string(str){
			return str && str.toLowerCase().replace(re,es);
		}

		function remove_node(node){
			if(node.parentNode)
				node.parentNode.removeChild(node);
		}

		function get(node, keys){
			var parent
			for (var i=0; (i<keys.length) && node; i++){
				//window.console.log(typeof(node));
				if (typeof(node) == "function"){
						node = parent?node.call(parent, keys[i]):node(keys[i]);
						parent = false;
				}else{
					parent = node;
					node = node[keys[i]];
				}
			}
			return node
		}

		var not_found = 0;
		
		function search_and_play_act(check_next_song){
			var s_search = document[byId]("s_search");
			if(unsafeWindow.Audio.updateList){
				try{unsafeWindow.Audio.updateList({target: s_search, keyCode: 13}, s_search)}catch( e ){}
				
				setTimeout(function (){
					var audios = document[byClass]("audio");
					var found = false;
					var search = clear_string(document[byId]("s_search").value).split(" ")
					if (search.length > 0)
						for(var index=audios.length; index;){
					
							var audio = audios[--index];
							var artist = get_text(get(audio,[byTag,"b",0,byTag,"a",0]));
							var title = get_text(get(audio, [byClass,"title",0]) || get(audio, [byTag, "span", 0]));
							if (artist && title){
								var text = clear_string(artist + "-" + title)
								var i = 0
								for (; i<search.length; i++){
									if (search[i] && text.indexOf(search[i])<0)
										break;
								}
								if (i==search.length)
									found = audio;
								else
									remove_node(audio);
							}
							
						}
					
					if (found){
						var id_suf = found.id.replace("audio","")
						try{unsafeWindow.playAudioNew(id_suf);}
						catch( e ){} 
						
							
						
						var next_time = (document[byId]("audio_info-"+id_suf) || document[byId]("audio_info"+id_suf)).value.split(",")[1];
						
						next_time = ((next_time || 61) - 1) * 1000;
						setTimeout(check_next_song, next_time);
					}
					else
						if ( not_found < 30 ){
							not_found += 1;
							try{
								var x = unsafeWindow; x = (x&&(x=x.Audio),x&&(x=x.loadRows),x&&x());
							}
							catch( e ){} 
							
							setTimeout(arguments.callee, 2000);
						}else{
							not_found = 0;
							check_next_song();
						};
					
				}, 2000)
			}
			else{
				setTimeout(arguments.callee, 100); return;
			}
		}

		function search_and_play(song_title, restart_fnc){

			var s_search = document[byId]("s_search")
			if (s_search.value == song_title)
			{
				setTimeout(restart_fnc, 20*1000);
				return;
			}else 
				s_search.value = song_title;
			
			search_and_play_act(restart_fnc);
		}

		function check_next_song(){
			makeRequest("http://proxy.animeradio.su/data.esc", function (result){
				if (check_status(result)){
					var song_title = result.responseText.split("\t\t\t")[9];
					
					if (song_title == "dj on line"){
						setTimeout(check_next_song, 60*1000);
						return;
					}
					search_and_play(song_title, check_next_song);
				}
			})
		}

		function check_next_song_nashe_radio(){
			makeRequest("http://pleer.nashe.ru/info/nashe_last_tracks.txt", function (result){
				if (check_status(result)){
					var song_title = result.responseText;
					song_title = song_title.slice(song_title.indexOf(" "),song_title.indexOf("\n")-6)
					var last_char = song_title.slice(-1);
					switch (last_char){
						case "'":
						case ",":
						case "`":
						case ".":
						song_title = song_title.slice(0,song_title.lenght-1);
					}
					search_and_play(song_title, check_next_song_nashe_radio);
				}
			})
		}
		
		function check_next_song_radio_101(){
			var station_id = document.getElementById("station_id").value;
			if (station_id)
			makeRequest("http://101.ru/api/getplayingtrackinfo.php?station_id="+station_id+"&short=2&typechannel=channel", function (result){
				if (check_status(result)){
					var song_title = result.responseText;
					var st = song_title.indexOf('"title":"')+9
					song_title = song_title.slice(st, song_title.indexOf('"', st))
					console.log( song_title);
					search_and_play(song_title, check_next_song_radio_101);
				}
			})
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
		
		function add_list(params, list){
			var select = new_element("select");
			if (params.id) select.id = params.id;
			
			for (var i = 0; i<list.length; i++){
				var opt = new_element("option");
				opt.value = list[i].value;
				opt.appendChild(text_node(list[i].name));
				if (list[i].selected) 
					opt.selected="selected";
				select.appendChild(opt);
			}
			return select;
		}
		
		var commands = (function(){
			var conteiner = document.createElement("div");
			var link = document.createElement("a");
			link.href = "http://vk.com/audio#radio_anime";
			link.target = "_blank";
			link.appendChild(document.createTextNode("AnimeRadio.su"));
			conteiner.appendChild(link);
			conteiner.appendChild(document.createTextNode(" "));
			
			var link = document.createElement("a");
			link.href = "http://animeradio.su/index.php?a=r";
			link.target = "_blank";
			link.appendChild(document.createTextNode("заказ"));
			link.title = "заказать трек"
			conteiner.appendChild(link);
			conteiner.appendChild(document.createElement("br"));
			
			var link = document.createElement("a");
			link.href = "http://vk.com/audio#radio_nashe";
			link.target = "_blank";
			link.appendChild(document.createTextNode("Наше Радио"));
			conteiner.appendChild(link);
			conteiner.appendChild(document.createElement("br"));

			conteiner.appendChild(add_link({
				"href": "http://vk.com/audio#radio_101",
				"target": "_blank",
				"child": document.createTextNode("101.ru")
			}))
			if (window.location.hash=="#radio_101")
				conteiner.appendChild(add_list({'id': 'station_id'},[
					{'name':'KFC SO GOOD MUSIC', 'value': 169},
					{'name':'ЛЕТО NON-STOP', 'value': 150},
					{'name':'CLUB DANCE', 'value': 5},
					{'name':'HOT TRAXX', 'value': 9},
					{'name':'DANCE CHART', 'value': 167},
					{'name':'EURO HITS', 'value': 82},
					{'name':'RUSSIAN DANCE', 'value': 17},
					{'name':'HOUSE', 'value': 10},
					{'name':'ELECTRO', 'value': 7},
					{'name':'PROGRESSIVE', 'value': 13},
					{'name':'PUMPING HOUSE & RAVE', 'value': 12},
					{'name':'IN THE MIX', 'value': 11},
					{'name':'ДИСКОТЕКА 90-Х', 'value': 74},
					{'name':'РОССИЯ 90-Х', 'value': 33},
					{'name':'ДИСКОТЕКА 80-Х', 'value': 1},
					{'name':'ДИСКОТЕКА СССР', 'value': 144},
					{'name':'DISCO', 'value': 80},
					{'name':'ITALO DISCO', 'value': 161},
					{'name':'Cyber Space', 'value': 79, 'selected': true},
					{'name':'ELECTRONIC', 'value': 161}
				]));
			
			
			conteiner.appendChild(document.createElement("br"));
			
			conteiner.appendChild(a_tag("http://userscripts.org/scripts/show/112126", text_node("радио скрипт здесь"), null, null, null, "_blank"));
			conteiner.appendChild(text_node(" "));
			conteiner.appendChild(a_tag("/share.php?url=http://userscripts.org/scripts/show/112126", text_node("♥"), null, null, "share_button", "_blank", "расскажи друзьям (ссылка добавится на стену)"));
					
			
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
		switch(window.location.hash){
			case "#radio_nashe":
				setTimeout(check_next_song_nashe_radio,2000);
			break;
			case "#radio_anime":
				setTimeout(check_next_song, 2000);
			break;
			case "#radio_101":
				setTimeout(check_next_song_radio_101, 2000);
			break;	
		}

		
	//}catch(e){
	//	console.error(e);
	//}
})()