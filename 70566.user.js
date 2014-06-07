// ==UserScript==
// @name           Live Jasmin Watcher
// @description    Transforms online performers page into an advamced watcher. It dislays 5 previews rotating every 10s through all the users of the current filter. When the preview is pressed, it opens an embeded live chat within the same page.
// @namespace      p69n320
// @include        http://*livejasmin.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @unwrap
// ==/UserScript==

var regexp = new RegExp('listpage');
if(location.href.match(/listpage/))
{
	function Hash()
	{
		this.length = 0;
		this.items = new Array();
		for (var i = 0; i < arguments.length; i += 2) {
			if (typeof(arguments[i + 1]) != 'undefined') {
				this.items[arguments[i]] = arguments[i + 1];
				this.length++;
			}
		}
   
		this.removeItem = function(in_key)
		{
			var tmp_previous;
			if (typeof(this.items[in_key]) != 'undefined') {
				this.length--;
				var tmp_previous = this.items[in_key];
				delete this.items[in_key];
			}
	   
			return tmp_previous;
		}

		this.getItem = function(in_key) {
			return this.items[in_key];
		}

		this.setItem = function(in_key, in_value)
		{
			var tmp_previous;
			if (typeof(in_value) != 'undefined') {
				if (typeof(this.items[in_key]) == 'undefined') {
					this.length++;
				}
				else {
					tmp_previous = this.items[in_key];
				}

				this.items[in_key] = in_value;
			}
	   
			return tmp_previous;
		}

		this.hasItem = function(in_key)
		{
			return typeof(this.items[in_key]) != 'undefined';
		}

		this.clear = function()
		{
			for (var i in this.items) {
				delete this.items[i];
			}

			this.length = 0;
		}
	
		this.keys = function()
		{
			var new_array = new Array();
			var i = 0;
			for (var tmp in this.items)
			{
				new_array[i++] = tmp;
			}
			return new_array;
		}
	
		this.filter = function(callback)
		{
			var newHash = new Hash();
			for (var key in this.items)
			{
				if(callback && callback (key, this.getItem(key)) == true)
				{
					newHash.setItem(key, this.getItem(key));
				}
			}
			return newHash;
		}
	}

	// Override flashwriter to be able to preview all the videos at the same time.
	var flashwriter1 = unsafeWindow.flashwriter
	unsafeWindow.flashwriter = function (perfname, filename, serverip, chargename, onprivate, videotype, fmsip, proxyip, type, flashcookie, bannedCountry, objectSize, cno) 
	{
	    flashwriter1(perfname, filename, serverip, chargename, onprivate, videotype, fmsip, proxyip, type, flashcookie, bannedCountry, objectSize, cno)
	    $("#perfTeaserVideo").attr("id", "unimportant")
	    $(".flashContainer").unbind('mouseout');
	    $(".flashContainer").unbind('mouseover');
	    $("#container").unbind('mouseover');
	}

	var priv_performers = new Hash();

	//Load priv_performers to array
	function parse_performers(msg)
	{
		var perfs = $('div.flashContainer', msg);
		var classes = $('div.flashContainer', msg).attr('class');
		var status_elems = perfs.parents("div.performerbox_big").find('a');
	
		for(var i = 0; i < perfs.length; i++)
		{
			var perf = perfs[i];
			var id = perf.id.substring(2);
			var status = status_elems[i].title
		
			if(status == 'FREE CHAT') {
				status = 0;
			}
			if(status == 'MEMBER CHAT') {
				status = 1;			
			}
			if(status == 'PRIVATE CHAT') {
				status = 2;
			}
			
			if (priv_performers.getItem(id) == undefined) {
				priv_performers.setItem(id, new Hash());
			}
			var tmp_perf = priv_performers.getItem(id);

			tmp_perf.setItem('status', status);
			tmp_perf.setItem('updated', 1);
			tmp_perf.setItem('objectType', classes.split(" ")[1]);
		};
		//alert('classes = ' + classes.split(" ")[1]);
	//	alert('priv_performers_func = ' + priv_performers.length);
	//	alert('perfs = ' + perfs.length);
		
		// $.each(perfs, function(index, perf) {
		// 	var perf_name = perf.id.substring(2);
		// 	alert(perf_name);
		// 	$("a.allonline_freechattext[title!=FREE CHAT]").parents("div.performerbox_big").remove();
		// 	var status = perf.parent.find(a.allonline_freechattext).title;
		// 	priv_performers[perf_name] = status;
	//	 	alert('here');
		// });
	};

	function retrieve_priv_performers_list(page) {
		page = typeof(page) != 'undefined' ? page : 0;
		var url = location.href;
		if(page > 0) {
			url = url + "&page=" + page;
		}
		$.ajax({
		    type: "GET",
		    url: url,
		    success: function(msg) {
				parse_performers(msg);
				retrieve_priv_performers_list(page + 1);
				return true;        
		    },
		    error: function(){
				setTimeout(retrieve_priv_performers_list, 360000);
		    	return false;
			}
		});
	};

	retrieve_priv_performers_list();

	//setTimeout(function () {alert('priv_performers1 = ' + priv_performers.length);}, 5000);


	var list = $('<div id="preview_list" />');


	//var list = $("<div id='preview_list'>OLA!</div>");

	//$("#allonline_content").before(list);

	$("#allonline_content").hide().before(list);
	$("div.pager").hide();

	for(var i = 0; i < 5; i++)
	{
		var video_window = $("<div id='preview_" + i + "' style='width:100px, height=100px' />");
		video_window.css('width', '170px');
		video_window.css('height', '127px');
		video_window.css('margin', '2pxpx');
		video_window.css('float', 'left');
		list.append(video_window);
	}
	list.append("<div style='clear:both' />")
	list.append("<div style='background-color:white;color:red'><h3>This is an experimental script please comment and make suggestions at <br><a href='http://userscripts.org/scripts/show/70280' style='color:red'>http://userscripts.org/scripts/show/70280</a></h3></div>")
	$("#container").before($("<div id='chat_focus' />"));
	$("#container").before($("<div id='chats_loaded' class='container_banner' />"));
	var focus_chat = null;
	
	// video.attr('height', '262px');
	// video.attr('width', '710px');
	
	$("#chats_loaded").append("<div id='last_loaded_video' style='clear:both' />");
	
	function load_embeded_region(performer_name, video_handler)
	{
		$.ajax({
		    type: "GET",
		    url: "/freechat.php?performerid=" + performer_name,
		    success: function(msg){
					//var performer_name = $("#rateMe", msg).find('a')[0].id;
					var video = $('embed', msg);
					if(video != undefined)
						video_handler(video, performer_name);
					else
						video_handler(null, performer_name);
					return false;        
			   },
		    error: function(){
		    	return false;
		    }
		});		 
	}

	function refresh_video_region (video, performer_name) 
	{	
		if(video != undefined)
		{
			var div = $("#" + performer_name + "_video");
			
			video.attr('id', 'tino');
			video.css('height', '262px');
			video.css('width', '324px');
			video.css('position', 'relative');
			video.unbind('click');
			video.click(function (ev) {
	
				
				
				// if(focus_chat != null)
				// {
				// 	
				// 	
				// }
				// alert('clicked');
				// $('#chat_focus').append($('#' +performer_name+ '_video'));
				// alert('clicked');
				// $('#' +performer_name+ '_video').remove();
				// 
				// alert('clicked');
			});
			$("#" + performer_name + "_video > div").html(video);
		}
	}
	
	function create_video_region (video, performer_name) 
	{	
		if(video != undefined)
		{
			
			video.attr('id', 'tino');

			video.css('height', '262px');
			video.css('width', '324px');
			video.css('position', 'relative');
			video.unbind('click');
			video.click(function () {
			});
			
			video = $("<div />").append(video);
		
			video = $("<div id='" +performer_name+ "_video'></div>").append(video);
			video.css('float', 'left');
			video.css('border', 'solid 1px red');
			video.css('margin', '10px');
					
			unsafeWindow.$("#last_loaded_video").before(video);
		
			var button = $("<a class='close_parent' rel='" +performer_name+ "_video' href='#'>Close</a>");
			button.css('margin-left', '5px');
			button.css('margin-right', '5px');
			button.click(function (e) {
				e.preventDefault();
				$("#" + performer_name + "_video").remove();
			});
			video.append(button);
			
			button = $("<a class='close_parent' rel='' href='#'>Refresh</a>");
			button.css('margin-left', '5px');
			button.css('margin-right', '5px');
			button.click(function (e) {
				e.preventDefault();
				load_embeded_region(performer_name, refresh_video_region);
			});
			video.append(button);
			
			button = $("<a id='"+ performer_name +"_collapse' class='close_parent' rel='' href='#'>Expand</a>");
			button.css('margin-left', '5px');
			button.css('margin-right', '5px');
			button.click(function (e) {
				e.preventDefault();
				var embed = video.find('embed')
				if(embed.css('width') == '708px')
				{
					video.find('embed').css('width', '324px');
					$("#" + performer_name + "_collapse").html('Expand');
				}
				else
				{
					video.find('embed').css('width', '708px');
					$("#" + performer_name + "_collapse").html('Collapse');
				}
			});
			video.append(button);
		}
	}	

	var pos = 0;
	function refreshPreview()
	{	
		var free_performers = priv_performers.filter(function (key, value) {
			return (value.getItem('status') == 0);
		});
	
	//	var free_performers = priv_performers;
	
		//alert('free_performers = ' + free_performers.length);
		if(free_performers != undefined && free_performers.length > 0)
		{
			for(var i = 0; i < 5; i++)
			{	
				if(pos + 1 >= free_performers.length) 
					pos = 0;
	//			var rand = Math.floor(Math.random() * free_performers.length);
				var rand = pos++;
				var key = free_performers.keys()[rand];
				var perf = free_performers.getItem(key);
				var type = perf.getItem('objectType');
			
				var box = $("#preview_" + i);
				box.find('div.flashContainer').remove();
				box.find('div.flashEmbed').remove();
			
				var embed = $("<div id='"+ key +"_flashEmbed' class='flashEmbed' />");
				box.append(embed);
	
				var list = $("<div id='x_"+ key +"' class='flashContainer' style='display: block;' />");
					list.css('width', '170px');
					list.css('height', '127px');
					list.css('position', 'relative');
					list.css('margin', '10px');
					list.addClass(type);
					list.click(function (e) { 
						load_embeded_region (e.target.id.substring(2), create_video_region);
						// preview_click_handler (e.target.id.substring2)); 
					});
	//				list.click(function () { alert(key); preview_click_handler (key); });
					box.append(list);
			    //if(elem != undefined || $("a.allonline_freechattext[title!=FREE CHAT]").parents("div.performerbox_big")) {
				unsafeWindow.getDatasWithFlash(key, type);
				//     }
				// 			//alert('here')
			}	
			setTimeout(refreshPreview, 10000);
		}
		else
		{
			setTimeout(refreshPreview, 100);
		}
	}

	setTimeout(refreshPreview, 100);
	
	function add_close_button (div_elem)
	{
		var button = $("<div class'remove_loaded_video'></div>");
		button.css('position', 'relative');
		button.css('left', '10px');
		button.css('top', '10px');
		button.innerHTML = "Ola Mundo";
		div_elem.html = "Ola Mundo!";
		$("#tino").html = "Ola!";
		button.click(function() {
			button.parent.remove();
		});
	}

	unsafeWindow.chatOut = function(param) {
	}
	function load_chat_window(performer_name) {}

	// Hide superfulous regions
	//$("div.summary_new_tags").hide();
	$("div.infobox_tableinit").hide();
	$("div.last").removeClass("last");
    
	// Change width usage
	$("#container").css("width", 5 * 170 + 'px');
	$("#allonline_content").css("width", "100%");
}