// ==UserScript==
// @name        video copy remover
// @namespace   local_video
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// @version     1
// ==/UserScript==


(function(){
	var doc = document
	var byClass = "getElementsByClassName";
	var count = 0;
	var video_list;
	var re = /[- _.0-9\[\]\(\)\{\}\"\/\\]/g, es = "";

	function clear_string(str){
		return str && str.toLowerCase().replace(re,es);
	}
	
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
	
	function get_text_by_class(root, class_name){
		var node = root[byClass](class_name)[0];
		return get_text(node)
	}
	
	function remove_node(node){
		if(node.parentNode)
			return node.parentNode.removeChild(node);
	}
	
	function get_video(title, time){
		if (video_list[title])
			return video_list[title][time];
	}
	
	function set_video(title, time, video){
		if (!video_list[title])
			video_list[title]={};
		video_list[title][time] = video;
	}
	
	function remove_copy_of(video){
		var title = clear_string(get_text_by_class(video,"title")) || clear_string(get_text_by_class(video,"video_raw_info_name"));
		var time = get_text_by_class(video, "duration") || clear_string(get_text_by_class(video,"video_row_duration"));
		if (title && time){
			var copy = get_video(title, time)
			if (copy && copy != video){
				//window.console.log("removed: "+title);
				remove_node(copy);
				
			}
			if (copy != video)
				set_video(title, time, video);
		}
	}
	
	function remove_copys(){
		
		var videos = doc[byClass]("video_row_cont");
		
		if (videos && videos.length > 0 && videos.length != count){
			video_list = {};
			for (i = videos.length; i;)
				remove_copy_of(videos[--i]);
			video_list = 0
			count = videos.length;
		}
	}
	
	setInterval(remove_copys, 1000);

})()