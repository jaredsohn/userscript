// ==UserScript==
// @name           SpeedClick
// @namespace      speedclick
// @description    speedclick
// @include 	   http://apps.facebook.com/speedclick/*
// ==/UserScript==



if (window.CavalryLogger) { CavalryLogger.start_js(["http:\/\/external.ak.fbcdn.net\/fbml_static_get.php?src=http%3A%2F%2Fw6.6waves.com%2Fmy-app%2Fjs.php%3Ftype%3Dclicks%26v%3D20100914.17&appid=136364463041439&pv=1&sig=fe8dc2f432ee7ea981fd966d2fe5b6f9&filetype=js"]); }

/**
 * Selecting elements by providing css-like selector
 * @param String selector. 
 *		select by id if selector start with '#'
 *		select by class if selector start with '.'
 *		select by tag if else
 * @return Array of elements.
 */
a136364463041439_$ = (function() {
	//
	function a136364463041439_each(a136364463041439_arr, a136364463041439_func) {
		for( var a136364463041439_i=0, a136364463041439_l=a136364463041439_arr.length; a136364463041439_i<a136364463041439_l; a136364463041439_i++ ) {
			a136364463041439_func(a136364463041439_arr[$FBJS.idx(a136364463041439_i)]);
		}
	}

	function a136364463041439__collect( a136364463041439_element, a136364463041439_matcher ) {
		a136364463041439_ret = [];
		var a136364463041439_recurse = function (a136364463041439_subelement) {
			var a136364463041439_nodes = a136364463041439_subelement.getChildNodes();
			a136364463041439_each(a136364463041439_nodes, function(a136364463041439_node) {
				if (a136364463041439_matcher(a136364463041439_node)) {
					a136364463041439_ret.push(a136364463041439_node);
				}
				if (a136364463041439_node.getFirstChild()) {
					a136364463041439_recurse(a136364463041439_node);
				}
			});
		};
		a136364463041439_recurse(a136364463041439_element);
		return a136364463041439_ret;
	}

	function a136364463041439_getElementsByClassName(a136364463041439_classname, a136364463041439_context) {
		if(a136364463041439_context == null)
			a136364463041439_context = a136364463041439_document.getRootElement();

    	return a136364463041439__collect(a136364463041439_context, 
			function(a136364463041439_element) {
				return a136364463041439_element.hasClassName(a136364463041439_classname);
			}
		);
	}

	function a136364463041439_getElementsByTagName(a136364463041439_tagName, a136364463041439_context) {
    	a136364463041439_tagName = a136364463041439_tagName.toLowerCase();

		if(a136364463041439_context == null)
			a136364463041439_context = a136364463041439_document.getRootElement();

	    return a136364463041439__collect(a136364463041439_context, 
			function(a136364463041439_element) {
        		return (a136364463041439_element.getTagName().toLowerCase() === a136364463041439_tagName);               
			}
		);   
	}

	function a136364463041439_getElementsById(a136364463041439_id) {
		var a136364463041439_element = a136364463041439_document.getElementById(a136364463041439_id);
		if(a136364463041439_element)
			return a136364463041439_element;
		else
			return null;
    	/**/
	}

	//
	return function(a136364463041439_selector, a136364463041439_context) {
		switch (a136364463041439_selector.charAt(0)) {
			case '.':
				return a136364463041439_getElementsByClassName(a136364463041439_selector.substring(1), a136364463041439_context);
			case '#':
				return a136364463041439_getElementsById(a136364463041439_selector.substring(1));
			default:
				return a136364463041439_getElementsByTagName(a136364463041439_selector, a136364463041439_context);
		}
	}
})();
var a136364463041439_game = (function() {
	var a136364463041439_initTime;
	var a136364463041439_time = 100;
	var a136364463041439_count = 0;
	var a136364463041439_timer = null;
	var a136364463041439_btn = null;
	var a136364463041439_counter = null;
	var a136364463041439_status = 'ready';
	var a136364463041439_is_saved = false;
	var a136364463041439_dialog = new a136364463041439_Dialog();
	var a136364463041439_lang = {
		'finish': 'Finish',
		'click_here': 'Click Here',
		'share': 'Share',
		'skip': 'Skip',
		'challenge_friend': 'Post a challenge to friends\' wall',
		'status_message': 'made NUM clicks in 10 seconds',
		'update_status': 'Update my status'
	};
	
	function a136364463041439_run() {
		a136364463041439_time = 10000 - (new a136364463041439_Date().getTime() - a136364463041439_initTime);
		if(a136364463041439_time <= 0) {
			a136364463041439_time = 0;
		}
		a136364463041439_timer.setTextValue((a136364463041439_time/1000).toFixed(1));
		if(a136364463041439_time > 0) {
			if(typeof a136364463041439_t != 'undefined') {
				a136364463041439_clearTimeout(a136364463041439_t);
			}
			a136364463041439_t = a136364463041439_setTimeout(a136364463041439_run, 100);
			if(a136364463041439_time <= 1500) { //
				a136364463041439_timer.setStyle('color', 'red');
			}
		}else{
			a136364463041439_status = 'end';
			a136364463041439_btn.setValue(a136364463041439_lang[$FBJS.idx('finish')]);
			if ( a136364463041439_sendfeed ) {
				a136364463041439_save_count(a136364463041439_btn.getForm());
			}
			a136364463041439_show_friend_list();
		}
	}
	
	function a136364463041439_randomColor() {
		function a136364463041439_random_int(a136364463041439_lo, a136364463041439_hi) { 
			return a136364463041439_Math.floor((a136364463041439_Math.random() * (a136364463041439_hi - a136364463041439_lo)) + a136364463041439_lo); 
		}
		 
		var a136364463041439_r = a136364463041439_random_int(0, 255), 
			a136364463041439_b = a136364463041439_random_int(0, 255), 
			a136364463041439_g = a136364463041439_random_int(0, 255); 
		var a136364463041439_color = a136364463041439_r+', '+a136364463041439_g+', '+a136364463041439_b;
		return 'rgb(' + a136364463041439_color + ')';
	}
	
	function a136364463041439_start() {
		a136364463041439_timer = a136364463041439_$('#timer');
		a136364463041439_btn = a136364463041439_$('#btn');
		a136364463041439_counter = a136364463041439_$('#counter');
		a136364463041439_initTime = new a136364463041439_Date().getTime();
		a136364463041439_btn.setValue(a136364463041439_lang[$FBJS.idx('click_here')]);
		a136364463041439_status = 'running';
		a136364463041439_run();
	}
	
	function a136364463041439_save_count(a136364463041439_form) {
		if(!a136364463041439_is_saved) {
			a136364463041439_is_saved = true;
			var a136364463041439_ajax = new a136364463041439_Ajax();
			a136364463041439_ajax.responseType = a136364463041439_Ajax.JSON;
			a136364463041439_ajax.requireLogin = 1;
			a136364463041439_ajax.ondone = function() {
				a136364463041439_game.post_wall(a136364463041439_form, 'true');
			}
			a136364463041439_$params = a136364463041439_form.serialize();
			a136364463041439_$params[$FBJS.idx('count')] = a136364463041439_count;
			a136364463041439_$params[$FBJS.idx('page')] = 'save_count';
			a136364463041439_ajax.post(a136364463041439_form.getAction(), a136364463041439_$params);
		}
	}
	
	function a136364463041439_show_friend_list() {
		a136364463041439_$('#friend_list').removeClassName('hidden');
	}
	
	return {
		setLang:function (a136364463041439_lang_config) {
			a136364463041439_lang = a136364463041439_lang_config;
		},
		
		update:function(a136364463041439_form) {
			if(a136364463041439_status == 'ready') {
				a136364463041439_start();
			}else if(a136364463041439_status == 'running') {
				a136364463041439_count +9999;
				a136364463041439_counter.setTextValue(a136364463041439_count);
				a136364463041439_btn.setStyle('background', a136364463041439_randomColor());
			}else if(a136364463041439_status == 'end') {
				//
			}
		},
		
		challenge: function(a136364463041439_form) {
			var a136364463041439_params = a136364463041439_form.serialize();
			a136364463041439_params[$FBJS.idx('page')] = 'feed';
			
			
			a136364463041439_dialog.showChoice(a136364463041439_lang.challenge_friend, a136364463041439_challenge_box[$FBJS.idx('id'+a136364463041439_params[$FBJS.idx('uid')])], a136364463041439_lang.share, a136364463041439_lang.skip);
			a136364463041439_dialog.onconfirm = function() {
				var a136364463041439_ajax = new a136364463041439_Ajax();
				a136364463041439_ajax.responseType = a136364463041439_Ajax.JSON;
				a136364463041439_ajax.requireLogin = 1;
				a136364463041439_ajax.ondone = function(a136364463041439_data) {
					a136364463041439_form.getParentNode().removeChild(a136364463041439_form);
				}
				
				a136364463041439_ajax.post(a136364463041439_form.getAction(), a136364463041439_params);
				a136364463041439_$('.loading', a136364463041439_form)[$FBJS.idx(0)].removeClassName('hidden');
				a136364463041439_$('.frd_info', a136364463041439_form)[$FBJS.idx(0)].addClassName('hidden');
			}
		},
		
		share_record: function(a136364463041439_uid) {
			var a136364463041439_ajax = new a136364463041439_Ajax();
			a136364463041439_ajax.responseType = a136364463041439_Ajax.JSON;
			a136364463041439_ajax.requireLogin = 1;
			a136364463041439_ajax.ondone = function(a136364463041439_data) {
				a136364463041439_console.debug(a136364463041439_data);
				a136364463041439_Facebook.streamPublish(a136364463041439_data.message, a136364463041439_data.attachment, a136364463041439_data.actions, a136364463041439_data.target);
				a136364463041439_dialog.hide();
			}
			var a136364463041439_params = {};
			a136364463041439_params[$FBJS.idx('page')] = 'share_record';
			a136364463041439_params[$FBJS.idx('uid')] = a136364463041439_uid;
			a136364463041439_params[$FBJS.idx('ajax')] = true;
			a136364463041439_ajax.post('http://w6.6waves.com/my-app/clicks/index.php', a136364463041439_params);
		},
		
		show_share_box: function() {
			a136364463041439_dialog.showMessage(a136364463041439_lang.challenge_friend, a136364463041439_dialog_box, a136364463041439_lang.skip);
		},
		
		update_status: function() {
			var a136364463041439_dialog = new a136364463041439_Dialog();
			a136364463041439_dialog.onconfirm = function() {
				var a136364463041439_ajax = new a136364463041439_Ajax();
				a136364463041439_ajax.responseType = a136364463041439_Ajax.JSON;
				a136364463041439_ajax.requireLogin = 1;
				var a136364463041439_params = {};
				a136364463041439_params[$FBJS.idx('page')] = 'update_status';
				a136364463041439_params[$FBJS.idx('message')] = a136364463041439_$('#status_input').getValue();
				a136364463041439_ajax.post('http://w6.6waves.com/my-app/clicks/index.php', a136364463041439_params);
			}
			a136364463041439_dialog.showChoice(a136364463041439_lang[$FBJS.idx('update_status')], a136364463041439_status_dialog_box, a136364463041439_lang[$FBJS.idx('update_status')]);
			a136364463041439_$('#status_input').setTextValue(a136364463041439_lang[$FBJS.idx('status_message')].replace((new a136364463041439_RegExp('NUM','')), a136364463041439_count));
			
		},

		post_wall: function(a136364463041439_form, a136364463041439_isAjax) {
			if(!a136364463041439_isAjax) {
				a136364463041439_isAjax = 'false';
			}
			var a136364463041439_ajax = new a136364463041439_Ajax();
			a136364463041439_ajax.responseType = a136364463041439_Ajax.JSON;
			a136364463041439_ajax.requireLogin = 1;
			if(a136364463041439_isAjax == 'true') {
				a136364463041439_ajax.ondone = function(a136364463041439_data) {
					function a136364463041439_callback(a136364463041439_post_id) {
						if(a136364463041439_post_id != 'null') {
						//
						}
					}
					a136364463041439_Facebook.streamPublish(a136364463041439_data.message, a136364463041439_data.attachment, a136364463041439_data.actions, null, null, a136364463041439_callback);
				}
			}else{
//
				a136364463041439_$('#post_to_wall').addClassName('hidden');
			}
			var a136364463041439_params = a136364463041439_form.serialize();
			a136364463041439_params[$FBJS.idx('page')] = 'feed';
			a136364463041439_params[$FBJS.idx('ajax')] = a136364463041439_isAjax;
			a136364463041439_ajax.post(a136364463041439_form.getAction(), a136364463041439_params);
		}
	}
})();




if (window.Bootloader) { Bootloader.done(["http:\/\/external.ak.fbcdn.net\/fbml_static_get.php?src=http%3A%2F%2Fw6.6waves.com%2Fmy-app%2Fjs.php%3Ftype%3Dclicks%26v%3D20100914.17&appid=136364463041439&pv=1&sig=fe8dc2f432ee7ea981fd966d2fe5b6f9&filetype=js"]); }
