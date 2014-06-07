// ==UserScript==
// @name           MyFreeCams Video Preview Tabs
// @description    This script enables the page with a tab of preview videos of previously visited models.
// @namespace      p69n320
// @include        http://www.myfreecams.com/*
// @include        http://myfreecams.com/*
// ==/UserScript==


if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

window.jQuery_is_loaded = false;
if (typeof jQuery != 'undefined') {
	window.jQuery_is_loaded = true;
 }else{
	function addJQuery(callback) {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
	  script.addEventListener('load', function() {
	    var script = document.createElement("script");
	    script.textContent = "(" + callback.toString() + ")();";
	    document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}
	// load jQuery and execute the main function
	addJQuery(function() {
		window.jQuery_is_loaded = true;
	});
 }




var tab_text = "<span id='hack_last_tab'> <a href='#' id='tab_name'>model_name</a>(<a href='#' id='close'>x</a>) </span>";
window.new_tab = undefined;

window.hack_tabs_array = new Array();


function collapse_div_vertically(div, final_height, timeout)
{
	div = $(div);
	var current_height = parseInt(div.css('height'));
	if(current_height > final_height)
	{
		var new_timeout = timeout / (current_height-final_height);
		new_timeout = new_timeout * (current_height-final_height-1);
		div.css('height', current_height - 1);
		if(current_height - 1 > final_height)
			setTimeout(function() {
				collapse_div_vertically(div, final_height, new_timeout);
			}, timeout / (current_height-final_height));
	}
}

function count_size(array) {
	var count = 0;
	for(v in array)
	{
		count++;
	}
	return count;
}

function HackState(master_div, button_clicked_callback) {
	var root_div = master_div;
	var self = this;

	var create_button = function(name, func) {
		var button = $('<a href="#"><span style="font-size: 8px; color:#ffffff;text-decoration:none;"> (' + name + ')</span></a>');
		button.click(func);
		return button;
	}
	
	this.about_me_content = function() {
		var div = $('<div></div>');
		var content = "<span style='text-align: center; font-size: 12'>About Me</span><br /><br />";
		var text = "I am a software developer and in my free time I like to hack through this webpages, personalizing it for my taste.<br/><br/>"
		text += "Very recently it became clear that I spent quite more time then what I should compared to the benefit of doing it (no support at all).";
		text += "If you like my developements please consider posting some comments in userscripts.org page and vote for the scripts.<br/><br/>";
		text += "Unfortunately this webpage adapts very quickly and a huge extra ammount of work is necessary to make this scripts to work once again.<br/>";
		text += "Please consider supporting me by refering me at Apple Freebie Jeebies, where I am now for more then 2 years registered and still wasn't able to have sufficient refers.";
		text += "Please help me fix that and be able to get a free iPad 2. Site is authentic so don't worry with scams, here is a"
		text += " <a href='http://www.youtube.com/watch?v=NUUdJ4zLBYU' target='_newtab'>prof1</a> "
		text += "or <a href='http://www.youtube.com/watch?v=eIPB6Zk8imc' target='_newtab'>prof2</a> videos."
		text += "Other videos explaining the process can be found <a href='http://www.youtube.com/watch?v=QwcfFnyoyAg&NR=1' target='_newtab'>here</a>. See the remaining parts of the video if you need.<br />"
		text += "(Don't click the link on the prof page otherwise you refer the author of the video)."
		text += "Compared with the possible ammounts of money lots of people spend with models, it is nothing. ";
		text += "Apart from that you will have my personal email contant to buggy directly in case it stops working. ;-)<br/>"
		text += "Moreover you can as well try to get refers for yourself and get an Apple product.<br/><br>"
		
		text += "<a href='http://apple.freebiejeebies.co.uk/263912' target='_newtab'><span style='text-align: center; font-size:14'>Press here to refer me at Apple.FreebieJeebies</span></a>"
		content += "<span style='text-align: center; font-size: 12'>" +text+ "</span>";
		div.append(content);
		return div;
	}
	
	var draw_div = function() {
		
		var span = '<span style="font-size: 12px; color:#ffffff;text-decoration:none;">p69n320 MFC Browser Scripts</span>';
		span += '<div id="hack_loaded_scripts"></div>';
		root_div.append($(span));

		root_div.append(create_button('about_me', function() {
			load_panel(self.about_me_content());
		}));
		root_div.append(create_button('scripts list', function() {
			window.open('http://userscripts.org/users/135292/scripts','_newtab');
		}));
		root_div.append(create_button('refer me', function() {
			window.open('http://apple.freebiejeebies.co.uk/263912','_newtab');
		}));		
	}
	draw_div();
	
	var load_panel = function(content) {
		var main_div = $('<div id="hack_panel"> </div>')
		main_div.css('width', 700);
		main_div.css('position', 'absolute');
		main_div.css('top', 150);
		main_div.css('left', '50%');
		main_div.css('margin-left', -350);
		main_div.css('background-color', '#008000');
		main_div.css('border', 'solid 2px #00c000');
		main_div.css('padding', '10px');
		
		main_div.append(content);
		main_div.append('<br/><br/>');
		
		var close_button = create_button('close', function() {
			$('#hack_panel').remove();
		})
		main_div.append(close_button);
		
		$('body').append(main_div);
	}
	this.add_module = function(module) {
		var content = $('<div><span style="font-size: 10px; color:#ffffff;text-decoration:none;"> - '+ module.name +'</span></div>');
		var help_button = create_button('help', function() {
			load_panel(module.help_content());
		});
		content.append(help_button);
		$('#hack_loaded_scripts').append(content);
	}
}

function HackPreviewsTab(master_div, tab_click_callback, mute_callback) {
	var root_div = master_div;
	var current_model = undefined;
	var tab_click_callback = tab_click_callback;
	var mute_callback = mute_callback;
	var _images = undefined;
	
	var resizing = false;
	var initial_pageY = undefined;
	var height = 150;
	var video_width = 200;
	
	var mutex = false;
	
	var buttons = [ 'close' ] ;//, 'muted' ];
	var is_over_button = new Array();
	
	var models = new Array();
	
	var types = new Array();
	types['close'] = 'http://cdn1.iconfinder.com/data/icons/oxygen/22x22/actions/list-remove.png';
	types['muted'] = 'http://cdn1.iconfinder.com/data/icons/humano2/24x24/actions/kmixdocked_mute.png';
	types['unmuted'] = 'http://cdn1.iconfinder.com/data/icons/crystalproject/22x22/actions/kmixdocked.png';
//				{ type: 'close', src: 'http://help.pnn.com/images/config/close_icon.gif?1298582948' },
	
	var mouseDown = function(event) {
		resizing = true;
		initial_pageY = event.pageY;
		$(document).mousemove(function(event) {
			var delta = (event.pageY - initial_pageY);
			if(height + delta > 100 && height + delta < 300)
			{
				root_div.css('height', height + delta);
			}
		})
	};
	var mouseUp = function() {
		if(resizing == true)
		{
			height = parseInt(root_div.css('height'));
			video_width = (200 * height) / 150;
			refresh_models_display();
			$(document).unbind();
			$(document).unbind();
		}
		resizing = false;
	};
	
	var prepare_root_div = function() {
		root_div.attr('id','previews_list');
		root_div.css('overflow', 'auto');
		root_div.css('width', '100%');
		root_div.css('height', 0);
		root_div.css('position', 'relative');
		
		var scroll = $('<div></div>');
		scroll.attr('id', 'tabs_scrool');
		scroll.css("position", 'relative');
		scroll.css("width", "100%");
		scroll.css('height', '0px');
		scroll.css('background-color', 'grey');
		scroll.css('text-align', 'center');
		scroll.mouseover(function(event) {
			// TODO: Check
			this.style.cursor='s-resize';
			$(document).mousedown(mouseDown);
			$(document).mouseup(mouseUp);
		});
		scroll.mouseout(function(event) {
			if(resizing == false)
			{
				$(document).unbind('mousedown');
				$(document).unbind('mouseup');			
			}
		});
		scroll.append($('<span style="color:white; text-align:center; font-size:9px">Drag me to resize preview videos. I will collapse into a line in a few seconds</span>'));
				
		root_div.after(scroll);
	}
	prepare_root_div();
	
	var get_image = function(type) {
		if(_images == undefined)
		{	
 			_images = new Array();
			for(var type in types)
			{
				var image = new Image;
				image.src = types[type];
				_images[type] = image;				
			}
		}
		
		return _images[type].height != 0 ? _images[type].src : undefined;
	}
	get_image('initiate');
	
	var change_id_prefix = function(object, prefix) {
		object = $(object);
		if(object.attr('id') != '')
			object.attr('id', prefix + '_' + object.attr('id'));
		object.find('*').each(function() {
			var elem = $(this);
			if(elem.attr('id') != '' && elem.attr('class') != 'not_mark')
			{
				elem.attr('id', prefix + '_' + elem.attr('id'));
			}
				
		});	
	}
	
	var get_id_from_object = function(object) {
		object = $(object);
		var tmp = $("param[name='flashvars']", object).attr('value');
		tmp = tmp.split('roomID=')[1].split('&')[0];
		var id = '';
		id = "" + (parseInt(tmp) % 100000000);
		// for(var i = 0; i < tmp.length; i++)
		// {
		// 	c = tmp[i];
		// 	if(c == '0')
		// 	{
		// 		if(start == true)
		// 		{
		// 			id += id + c;
		// 		}
		// 	}
		// 	else
		// 	{
		// 		start = true;
		// 		id += id + c;
		// 	}
		// }
				
		return id;
	}
	
	var get_preview_for_video = function(model_id, video) {
		var video = $(video);
		
		var preview_div = $('<div></div>');
		preview_div.attr('id', 'preview');
		preview_div.attr('class', 'preview');
		preview_div.attr('width', '200px').attr('height', '150px');
		//preview_div.css('float', 'left');
		preview_div.css('position', 'absolute');
		preview_div.css('top', 0);	
		preview_div.append(video);	
		preview_div.find('embed').attr('width', '200px').attr('height', '150px');
		
		var clickable = $('<div id="clickable" class="not_mark"></div>')
		clickable.css('position', 'absolute');
		clickable.css('width', '200px').css('height', '150px');
		clickable.css('top', 0);
		clickable.css('left', 0);

		var close_button_press = function(model_id, object)
		{
			var preview_div = $(object);
			preview_div.remove();
			delete models[model_id];
			refresh_models_display();			
		} 

		clickable.click(function(event) {
			if(mutex == true)
				return;
			mutex = true;
			var preview_div = $(this).parent();
			var model_id = get_id_from_object(preview_div);
			// if(is_over_button['close'])
			// {
			// 	close_button_press(model_id, preview_div);
			// }
			// else if(is_over_button['muted'])
			// {
			// 	if(models[model_id].muted == true)
			// 	{
			// 		$('#' + model_id + "_muted_button").attr('src', get_image('unmuted'));
			// 		models[model_id].muted = false;
			// 		mute_callback(model_id, false);
			// 	}
			// 	else 
			// 	{
			// 		$('#' + model_id + "_muted_button").attr('src', get_image('muted'));
			// 		models[model_id].muted = true;
			// 		mute_callback(model_id, true);
			// 	}
			// }
			//else
			{		
				//if(event.pageY < (0.9 * height))
					tab_click_callback(preview_div.attr('id').split('_')[0]);
			}
				
			mutex = false;
		});		
		preview_div.append(clickable);

		
		var buttons_div = $('<div></div>');
		buttons_div.css('position', 'relative');
		buttons_div.css('top', -145);
		buttons_div.css('left', 5);
		buttons_div.css('height', 0);
		buttons_div.attr('class', 'preview_buttons');

		var model_name = $('<span style="color:white; font-size:10" class="not_mark" id="model_name"></span>');
		model_name.append('unknown');
		buttons_div.append(model_name);
		
		var extra_data = $('<br/><span style="color:white; font-size:7" class="not_mark" id="model_data"></span>');
		extra_data.append('unknown');
		buttons_div.append(extra_data);		

		for(var button in buttons)
		{
			var button_div = $('<div class="not_mark" id='+ buttons[button] +'></div>');
			button_div.css('width', 25);
			var image = get_image(buttons[button]);
			button_div.append(image == undefined ? "x" : "<image id='" + buttons[button] + "_button'src='" + image + "'>");
			// button_div.mouseover(function(){
			// 	var button = $(this).attr('id');
			// 	is_over_button[button] = true; 
			// });
			// button_div.mouseout(function(){
			// 	var button = $(this).attr('id');
			// 	is_over_button[button] = false;
			// });
			button_div.find('img').click(function() {
				var preview_div = $(this).parent().parent().parent();
				var model_id = get_id_from_object(preview_div);
				close_button_press(model_id, preview_div);
			});
			buttons_div.append(button_div);
		}
		preview_div.append(buttons_div);
		
		change_id_prefix(preview_div, model_id);
		
		return preview_div;
	}
	
	var add_model_to_preview = function(model) {
		
		if(model != undefined && model.added_to_preview == false)
		{
			model.added_to_preview = true;
			$(root_div).append(model.preview_object);
		}
	}
	var refresh_models_display = function() {
		var count = 0;
		for(var model_id in models)
		{
			var model = models[model_id];
			
			// Set position in tab
			model.preview_object.css('left', video_width * count);
			
			if(model.in_preview == false && model.preview_object.css('display') == 'block')
				model.preview_object.css('display', 'none');
			else if(model.in_preview == true && model.preview_object.css('display') == 'none')
			{
				var name = (model.model_name != undefined && model.model_name != '') ? model.model_name : ((model.extra_data != undefined) ? model.extra_data.name : 'unknown');
				$('#model_name', model.preview_object).html(name);
				if(model.extra_data != undefined)
				{
					var text = "Country: " + model.extra_data.country + "<br/>City: " + model.extra_data.city + "<br/>Age: "+ model.extra_data.age;
					$('#model_data', model.preview_object).html(text);
				}
				model.preview_object.css('display', 'block');
			}
				
			if(model.muted != model.is_muted)
			{
				mute_callback(model_id, true);

			}
			
//			if(model.preview_object.find('embed:first').css('width') == 200)
				
			if(model.in_preview == true)
				count++;
		}
		//root_div.css('width', (count * video_width) + 20);
		root_div.css('height', count > 0 ? height + 1 : 0);
		root_div.find('embed').css('width', video_width).css('height', height);
		root_div.find('div.preview_buttons').css('top', -height + 5);
		root_div.find('#clickable').css('width', video_width).css('height', height * 0.9);
		
		var scrooler = root_div.next('div');
		if(count > 0 && scrooler.css('height')[0] == '0')
		{
			scrooler.css('height', 15);
			setTimeout(function() {
				collapse_div_vertically(scrooler, 3, 2000);
			}, 10000);
		}
		if(count == 0)
			scrooler.css('height', 0);
	}
	
	this.is_model_with_id_loaded = function(model_id) {
		if(models[model_id] != undefined)
			return true;
		else
			return false;
	}
	this.add_new_preview = function(object, loading_parameters) {
		var model_id = get_id_from_object(object);
//		object = change_id_prefix(object, model_id);
		
		var model = {
			model_id : model_id,
			preview_object : get_preview_for_video(model_id, object),
			in_preview : false,
			loading_parameters : loading_parameters,
			muted : true,
			is_muted : undefined,
			added_to_preview : false,
			model_name : $("div[name='user" + model_id + "'] span:first").html()
		};
		models[model.model_id] = model;
		

		//add_model_to_preview(model);
		this.switch_to_model_id(model_id);
	}
	this.get_loading_paramters_for_model_id = function(model_id)
	{
		if(models[model_id] != undefined)
			return models[model_id].loading_parameters;
		return undefined;
	}
	this.switch_to_model_id = function(model_id) {
		if(models[model_id] != undefined)
		{
			var new_model = models[model_id];
			
			if(current_model != undefined)
			{
				current_model.in_preview = true;
				add_model_to_preview(current_model);
			}
			new_model.in_preview = false;
			current_model = new_model;
			refresh_models_display();
			
			return true;
		}
		return false;
	}
	this.model_for_id = function(model_id) {
		return models["" + model_id];
	};
	this.set_model_id_with_data = function(model_id, data) {
		
		if(models["" + model_id] != undefined) {
			models["" + model_id].extra_data = data;
		}
	}
}

// A_Click('107904316','/mfc2/static/player.html?broadcaster_id=7904316&target=new_window&cache_id=192','height=410,width=880,top=20,left=20,menubar=0,resizable=1,scrollbars=1,titlebar=0,toolbar=0,status=0','t.Load(\'player\',{broadcaster_id: \'7904316\',target: \'new_window\'},self);','new_window'); return false; 


var hack_previews_tab = undefined;
var hack_state = undefined;
var model_info_id = false;

var prv_SetHtml1 = window.SetHTML;
window.SetHTML = function(name, sOutput) {
	if(window.jQuery_is_loaded == true)
	{
		
		if(document.hack_state == undefined)
		{
			var master_div = $('<div></div>');
			master_div.attr('id', 'hack_state');
			master_div.css('position', 'relative');
			master_div.css('top', '5');
			master_div.css('right', '350');
			master_div.css('float', 'right');
			$('#login_box').parent().append(master_div);
			document.hack_state = new HackState(master_div, function(object_id) {
				hack_state.clicked(object_id);
			});
		}

		if(hack_previews_tab == undefined)
		{
			var master_div = $('<div></div>');
			//var master_div = $('<div id="previews_list"></div>');
			//master_div.css('height', 0).css('width', 20);
			$('body.inner_body').prepend(master_div);
			
			
			hack_previews_tab = new HackPreviewsTab(master_div, function(model_id) {
				var params = hack_previews_tab.get_loading_paramters_for_model_id(model_id);
				prv_LoadPlayer(params.action, params.options);
				hack_previews_tab.switch_to_model_id(model_id)
			},
			function(model_id, mute){		
				var elem = window.top.frames[0].frames[0].document.getElementById(model_id + '_fvideo_ff');
				$(elem).load(function() {
					var self = $(this);
					this.Mute();
				});
			});
			
			document.hack_state.add_module({ name: 'Model Preview Tabs', help_content: function() {
				var text = "This script enables the page with a tab of preview videos of previously visited models. <br/><br />";
				text += "Pressing on a model will open the regular video for the model. ";
				text += "Pressing on a different model will transfer the video of the current model to the preview tabs and display the latest pressed model.<br><br>";
				text += "When you click a tab preview the chat room for that model is reopen and the current chat room video jumps into the tabs. Pretty neat. ;-)<br><br>";
				text += "Later version will also allow to mute tab preview videos. Still hacking for that.";
				
				return text;
			} });
			
		}
		
		// var prv_Load = window.Load;
		// window.Load = function (a, b, c)
		// {	
		// 	prv_Load(a, b, c);				
		// }
		
		var prv_LoadPlayer = window.LoadPlayer;
		window.LoadPlayer = function (action,options)
		{	
			if(window.loading == undefined)
				window.loading = false;
//			if(window.loading == true)
//				return;
			window.loading = true;
			if(!hack_previews_tab.is_model_with_id_loaded("" + options.broadcaster_id))
			{
				window.current_params = {
					action: action,
					options: options,
				};
				prv_LoadPlayer(action, options);
			}
		}
		
		if(name == 'video' && window.loading == true)
		{
			var video = $(sOutput);
			hack_previews_tab.add_new_preview(video, window.current_params);
			model_info_id = window.current_params.options.broadcaster_id;
			PopUserMenu_Player.open(model_info_id);			
			//options.broadcaster_id;				
			window.loading = false;
		}
		
		if(name == 'popup_content' && model_info_id != undefined)
		{
			var content = $(sOutput);
			var model_data = {
				name: $("div", content).next().html(),
				country: $("div div:contains('Country')", content).next().html(),
				city: $("div div:contains('City')", content).next().html(),
				age: $("div div:contains('Age')", content).next().html()
			};
			// if(hack_previews_tab != undefined)
			// 	hack_previews_tab.model_for_id(model_info_id).extra_data = model_data;
				hack_previews_tab.set_model_id_with_data(model_info_id, model_data);

			$('#popup').hide();
			model_info_id = undefined;
			sOutput = '';
		}
	}
	
	prv_SetHtml1(name, sOutput);
}
