// ==UserScript==
// @name        Tumblr - Mass Post Features: Select Box and Mass Queue Edit
// @namespace   http://userscripts.org/scripts/show/156398
// @description Drag Box to Select, Mass Queue Edit, Mass Draft Edit, Select by Tag, Show Only Certain Posts, Mass Backdate, and More
// @include     http://www.tumblr.com/mega-editor
// @include     http://www.tumblr.com/mega-editor/*
// @include     http://www.tumblr.com/mega-editor/*/*/*
// @version     2.1
// @grant       none
// ==/UserScript==
var source = 'var PeriodicalExecuter = jQuery.extend({'+"\n"+
             '	initialize: function (callback, frequency) {'+"\n"+
             '		this.callback = callback;'+"\n"+
             '		this.frequency = frequency;'+"\n"+
             '		this.currentlyExecuting = false;'+"\n"+
             ''+"\n"+
             '		this.registerCallback();'+"\n"+
             '	},'+"\n"+
             '	registerCallback: function () {'+"\n"+
             '		this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);'+"\n"+
             '	},'+"\n"+
             '	execute: function () {'+"\n"+
             '		this.callback(this);'+"\n"+
             '	},'+"\n"+
             '	stop: function () {'+"\n"+
             '		if(!this.timer) return;'+"\n"+
             '		clearInterval(this.timer);'+"\n"+
             '		this.timer = null;'+"\n"+
             '	},'+"\n"+
             '	onTimerEvent: function () {'+"\n"+
             '		if(!this.currentlyExecuting) {'+"\n"+
             '			try {'+"\n"+
             '				this.currentlyExecuting = true;'+"\n"+
             '				this.execute();'+"\n"+
             '				this.currentlyExecuting = false;'+"\n"+
             '			} catch(e) {'+"\n"+
             '				this.currentlyExecuting = false;'+"\n"+
             '				throw e;'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '	}'+"\n"+
             '});'+"\n"+
             'var new_widget_bg = "http://25.media.tumblr.com/9ab97a4a1499371b8554f336207a6860/tumblr_mld7zajYOB1s2195yo8_r1_500.png";'+"\n"+
             'window.a_name = 0;'+"\n"+
             'if(window.location=="http://www.tumblr.com/mega-editor"){'+"\n"+
             '	window.a_name = jQuery(\'.months\').eq(0).find(\'a\').eq(0).attr(\'href\').split(\'/\')[2];'+"\n"+
             '}'+"\n"+
             'window.privy = true;'+"\n"+
             'window.b_name = (window.a_name==0)?(document.location+\'\').replace(/https?:\\/\\//,\'\').split(\'/\')[2]:window.a_name;'+"\n"+
             'window.nav = \'#nav_archive\';'+"\n"+
             'window.startX = 0;'+"\n"+
             'window.startY = 0;'+"\n"+
             'window.boxs = jQuery(\'<div id="s_box"></div>)\');'+"\n"+
             'window.shiftpress = 0;'+"\n"+
             'window.endX = 0;'+"\n"+
             'window.endY = 0;'+"\n"+
             'window.total_selected = 0; window.column_gutter = 6; window.column_full_width = 125+window.column_gutter;'+"\n"+
             'window.select_count = function(x){'+"\n"+
             '	window.total_selected += x;'+"\n"+
             '	jQuery(\'#unselect\').find(\'div.chrome_button\').eq(0).html(\'<div class="chrome_button_left"></div>Unselect:\'+jQuery(\'.highlighted\').length+\'<div class="chrome_button_right"></div>\');'+"\n"+
             '	var private_count = 0;'+"\n"+
             '	jQuery(\'.highlighted\').each(function(i,hl){'+"\n"+
             '		private_count += (jQuery(hl).find(\'.private_overlay\').length>0)? 1 : -1;'+"\n"+
             '	});'+"\n"+
             '	if(private_count>jQuery(\'.highlighted\').length/2){'+"\n"+
             '		jQuery(\'#prvt .prvt\').eq(0).html(\'un-PRIVATE\');'+"\n"+
             '		window.privy = false;'+"\n"+
             '	}else{'+"\n"+
             '		jQuery(\'#prvt .prvt\').eq(0).html(\'PRIVATE\');'+"\n"+
             '		window.privy = true;'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'window.just_clicked_select_tags = false;'+"\n"+
             'jQuery(window).bind("click", function(event){'+"\n"+
             '	if(window.just_clicked_select_tags==false && event.pageY>jQuery(window.nav).height()){'+"\n"+
             '		jQuery(\'#select_by_tag_widget\').hide();'+"\n"+
             '		jQuery(\'#show_only_widget\').hide();'+"\n"+
             '		jQuery(\'#backdate_widget\').hide();'+"\n"+
             '		jQuery(\'#photo_widget\').hide();'+"\n"+
             '		jQuery(\'.photo_on\').removeClass(\'photo_on\');'+"\n"+
             '	}'+"\n"+
             '	window.just_clicked_select_tags = false;'+"\n"+
             '});'+"\n"+
             'window.uniq = function(array){'+"\n"+
             '	var u = {}, a = [];'+"\n"+
             '	for(var i = 0, l=array.length; i<l;++i){'+"\n"+
             '	if(u.hasOwnProperty(array[i])) {'+"\n"+
             '		continue;'+"\n"+
             '	}'+"\n"+
             '		a.push(array[i]);'+"\n"+
             '		u[array[i]] = 1;'+"\n"+
             '	}'+"\n"+
             '	return a;'+"\n"+
             '}'+"\n"+
             'window.q_times = new Array();'+"\n"+
             'window.pause_to_find_q_times = function(){'+"\n"+
             '	jQuery.ajax({url:\'http://www.tumblr.com/blog/\'+window.b_name+\'/queue\','+"\n"+
             '		async: false,'+"\n"+
             '		type:\'get\',success:function(x){'+"\n"+
             '			window.q_times = eval((x+\'\').match(/publishOnTimes:\\s([^\\n]+)\\,\\n/)[1]);'+"\n"+
             '		}'+"\n"+
             '	});'+"\n"+
             '}'+"\n"+
             'window.month_array = [\'nihil\',\'January\',\'February\',\'March\',\'April\',\'May\',\'June\',\'July\',\'August\',\'September\',\'October\',\'November\',\'December\'];'+"\n"+
             'var addCSS = jQuery(\'<style></style>)\');'+"\n"+
             'jQuery(addCSS).attr({type:"text/css"});'+"\n"+
             'jQuery(addCSS).html(\'.header_button{margin-right: -5px !important;float:right !important;}\'+'+"\n"+
             '			  \'.header_button button.chrome{padding: 0 8px !important;}\'+'+"\n"+
             '			  \'.null_brick{display:none !important;height: 0 !important; width: 0 !important;}\'+'+"\n"+
             '			  \'#tagsel div, #shonly div{position:relative;border-bottom:1px dotted #999;\'+'+"\n"+
             '			  \'margin-bottom:3px; white-space:nowrap; overflow:hidden;}\'+'+"\n"+
             '			  \'#BD_body div{position:relative;margin-bottom:3px; white-space:nowrap; overflow:hidden;}\'+'+"\n"+
             '			  \'.bd_input{float: none;width: 35px;}\'+'+"\n"+
             '			  \'.bd_input:disabled{color: #CCCCCC;}\'+'+"\n"+
             '			  \'input,label{float:left;}\'+'+"\n"+
             '			  \'input.NOT_select_me,label.NOT_select_me{float:right;}\'+'+"\n"+
             '			  \'.header_button{margin-right: -5px !important; float:right !important;}\'+'+"\n"+
             '			  \'#delete_posts{border: 1px solid #F00 !important; color:#990000;}\'+'+"\n"+
             '			  \'.backdated.brick{-webkit-box-shadow: -1px 1px 4px 1px rgba(255, 0, 0, .9) !important;\'+'+"\n"+
             '			  		\'box-shadow: -1px 1px 4px 1px rgba(255, 0, 0, .9) !important;}\'+'+"\n"+
             '			  \'.backdated .highlight{border:3px solid rgba(255, 0, 0, 0.8) !important;background:none rgba(255, 0, 0, 0.4) !important;}\'+'+"\n"+
             '			  \'.highlighted.photo_on .highlight{background-color:rgba(255,255,0,0.7) !important; border-color: #ffff00 !important;}\');'+"\n"+
             'jQuery(\'head\').eq(0).append(addCSS);'+"\n"+
             'jQuery(window.nav+\' a\').eq(0).css({fontSize: \'17px\'});'+"\n"+
             'jQuery(window.nav+\' a\').eq(0).html(\'MPE\');'+"\n"+
             'jQuery(window.nav+\' a\').eq(0).removeAttr(\'href\');'+"\n"+
             'jQuery(window.boxs).css({position:\'absolute\',opacity:\'0.4\',border:\'#00F 1px solid\',display:\'none\',zIndex:\'999999\',backgroundColor:\'#FFF\'});'+"\n"+
             'jQuery(\'#body\').append(window.boxs);'+"\n"+
             'window.lite_mode_ = function(){'+"\n"+
             '	window.build_columns = function(){'+"\n"+
             '		rebuilding_columns = false;'+"\n"+
             '	};'+"\n"+
             '	jQuery(\'#custom_gutter\').hide();'+"\n"+
             '	jQuery(\'#lite_mode\').attr(\'title\',\'Lite mode engaged. Reload to reactivate heavy mode.\');'+"\n"+
             '	jQuery(\'#lite_mode\').attr(\'disabled\',\'disabled\');'+"\n"+
             '	jQuery(\'#lite_mode\').html(\'<div class="chrome_button"><div class="chrome_button_left"></div>Lite Engaged<div class="chrome_button_right"></div></div>\');'+"\n"+
             '	var addCSS = jQuery(\'<style></style>)\');'+"\n"+
             '	jQuery(addCSS).attr({type:"text/css"});'+"\n"+
             '	jQuery(addCSS).html(\'#content .brick{\'+'+"\n"+
             '				  \'display: inline-block !important;\'+'+"\n"+
             '    			  \'float: none !important;\'+'+"\n"+
             '    			  \'left: 0 !important;\'+'+"\n"+
             '    			  \'position: relative !important;\'+'+"\n"+
             '    			  \'top: 0 !important;\'+'+"\n"+
             '    			  \'vertical-align: middle !important; max-height:125px;\'+'+"\n"+
             '				  \'}\'+'+"\n"+
             '				  \'#content .heading{\'+'+"\n"+
             '				  \'display: block !important;\'+'+"\n"+
             '    			  \'float: none !important;\'+'+"\n"+
             '    			  \'left: 0 !important;\'+'+"\n"+
             '    			  \'position: relative !important;\'+'+"\n"+
             '    			  \'top: 0 !important;\'+'+"\n"+
             '				  \'}\'+'+"\n"+
             '				  \'#content {width: 100% !important;}\');'+"\n"+
             '	jQuery(\'head\').eq(0).append(addCSS);'+"\n"+
             '}'+"\n"+
             'window.orly = function(){'+"\n"+
             '	if(jQuery(\'#remove_tags_widget\').is(\':visible\') || jQuery(\'#select_by_tag_widget\').is(\':visible\') || jQuery(\'#add_tags_widget\').is(\':visible\') || jQuery(\'#backdate_widget\').is(\':visible\')'+"\n"+
             '	|| window.just_clicked_select_tags || window.just_clicked_remove_tags || window.just_clicked_add_tags)'+"\n"+
             '		return false;'+"\n"+
             '	else'+"\n"+
             '		return true;'+"\n"+
             '}'+"\n"+
             'window.momove = function(event){'+"\n"+
             '	window.endX = event.pageX;'+"\n"+
             '	window.endY = event.pageY;'+"\n"+
             '	if(event.pageY<jQuery(window.nav).height()+jQuery(window.nav).scrollTop() || !window.orly())'+"\n"+
             '		return true;'+"\n"+
             '	if(window.startX <= window.endX){ //to right'+"\n"+
             '		window.jQuery("#s_box").css({left:window.startX+\'px\', width: (window.endX-window.startX)+\'px\'});'+"\n"+
             '	}else{ //to left'+"\n"+
             '		window.jQuery("#s_box").css({left:window.endX+\'px\', width: (window.startX-window.endX)+\'px\'});'+"\n"+
             '	}'+"\n"+
             '	if(window.startY <= window.endY){ //to down'+"\n"+
             '		window.jQuery("#s_box").css({top:window.startY+\'px\', height: (window.endY-window.startY)+\'px\'});'+"\n"+
             '	}else{ //to up'+"\n"+
             '		window.jQuery("#s_box").css({top:window.endY+\'px\', height: (window.startY-window.endY)+\'px\'});'+"\n"+
             '	}'+"\n"+
             '	jQuery(\'.brick\').each(function(i,brick){'+"\n"+
             '			var boxs_left = jQuery("#s_box").offset().left;'+"\n"+
             '			var boxs_top = jQuery("#s_box").offset().top;'+"\n"+
             '			var boxs_right = jQuery("#s_box").offset().left+jQuery("#s_box").width();'+"\n"+
             '			var boxs_bottom = jQuery("#s_box").offset().top+jQuery("#s_box").height();'+"\n"+
             '			'+"\n"+
             '			var brick_left = jQuery(brick).offset().left;'+"\n"+
             '			var brick_top = jQuery(brick).offset().top;'+"\n"+
             '			var brick_right = jQuery(brick).offset().left+125;'+"\n"+
             '			var brick_bottom = jQuery(brick).offset().top+jQuery(brick).height();'+"\n"+
             '			'+"\n"+
             '			if(boxs_left<=brick_right && boxs_right>=brick_left'+"\n"+
             '			&& boxs_top<=brick_bottom && boxs_bottom>=brick_top){'+"\n"+
             '				if(!jQuery(brick).hasClass(\'highlighted\') && jQuery(\'.highlighted\').length<100){'+"\n"+
             '					jQuery(brick).addClass(\'highlighted\');'+"\n"+
             '					if(Array.isArray(window.get_selected_post_ids()))'+"\n"+
             '						window.select_count(1);'+"\n"+
             '					'+"\n"+
             '					if(window.shiftpress==1)'+"\n"+
             '						jQuery(brick).addClass(\'shifttemp\');'+"\n"+
             '				}'+"\n"+
             '			}else if(window.shiftpress == 0 || jQuery(brick).hasClass(\'shifttemp\')){'+"\n"+
             '				if(jQuery(brick).hasClass(\'highlighted\')){'+"\n"+
             '					jQuery(brick).removeClass(\'highlighted\');'+"\n"+
             '						window.select_count(-1);'+"\n"+
             '					'+"\n"+
             '				}'+"\n"+
             '			}'+"\n"+
             '		});'+"\n"+
             '	event.stopPropagation();'+"\n"+
             '}'+"\n"+
             'jQuery(window).bind("mousedown",function(event){'+"\n"+
             '		window.startX = event.pageX;'+"\n"+
             '		window.startY = event.pageY;'+"\n"+
             '		if(event.pageY<jQuery(window.nav).height()+jQuery(window.nav).scrollLeft() || window.just_clicked_select_tags || window.just_clicked_remove_tags || window.just_clicked_add_tags)'+"\n"+
             '			return true;'+"\n"+
             '		jQuery("#s_box").css({width:\'1px\',height:\'1px\',display:\'block\'});'+"\n"+
             '		jQuery(\'body\').bind(\'mousemove\',window.momove);'+"\n"+
             '		event.stopPropagation();'+"\n"+
             '	});'+"\n"+
             'jQuery(window).bind("mouseup",function(event){'+"\n"+
             '	if(window.just_clicked_select_tags || window.just_clicked_remove_tags || window.just_clicked_add_tags)'+"\n"+
             '		return true;'+"\n"+
             '	jQuery("#s_box").css({width:\'1px\',height:\'1px\',top:\'0\',left:\'0\',display:\'none\'});'+"\n"+
             '	jQuery(\'body\').unbind(\'mousemove\',window.momove);'+"\n"+
             '	event.stopPropagation();'+"\n"+
             '	jQuery(\'.brick\').each(function(i,brick){'+"\n"+
             '		jQuery(brick).removeClass( \'shifttemp\');'+"\n"+
             '	});'+"\n"+
             '});'+"\n"+
             'jQuery(window).bind("keydown",function(event){'+"\n"+
             '	if(event.shiftKey == true || event.which == 16 || event.keyCode == 16)'+"\n"+
             '		window.shiftpress = 1;'+"\n"+
             '});'+"\n"+
             'jQuery(window).bind("keyup",function(event){'+"\n"+
             '	if(event.shiftKey == true || event.which == 16 || event.keyCode == 16){'+"\n"+
             '		window.shiftpress = 0;'+"\n"+
             '	}'+"\n"+
             '});'+"\n"+
             'window.abort_to_switch_page = function(){'+"\n"+
             '	if(window.ajax_going.abort == \'function\' && window.ajax_going.readystate != 4){'+"\n"+
             '		window.ajax_going.abort();	'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'window.fetch_next_page = function() {'+"\n"+
             '    if (loading_page || laying_bricks) return;'+"\n"+
             '    jQuery(\'#loading\').show();'+"\n"+
             '    var last_post_time_to_fetch = last_post_time;'+"\n"+
             '    if (last_post_time_to_fetch == last_post_time_fetched) return;'+"\n"+
             '    loading_page = true;'+"\n"+
             '    window.ajax_going = jQuery.ajax({url:current_url + \'?before_time=\' + last_post_time_to_fetch,'+"\n"+
             '        type: \'get\','+"\n"+
             '        async: true,'+"\n"+
             '        success: function (transport) {'+"\n"+
             '            var new_contents;'+"\n"+
             '            last_post_time_fetched = last_post_time_to_fetch;'+"\n"+
             '            try {'+"\n"+
             '                new_contents = transport.split(\'<!-- START CONTENT -->\')[1].split(\'<!-- END CONTENT -->\')[0].replace(/style=" display:block/g, \'style=" display:none\')'+"\n"+
             '            } catch (e) {}'+"\n"+
             '            if (new_contents) {'+"\n"+
             '                jQuery(\'#content\').append(new_contents);'+"\n"+
             '            }'+"\n"+
             '            if (transport.indexOf(\'id="next_\' + \'page_link"\') == -1) {'+"\n"+
             '                next_page = false;'+"\n"+
             '                jQuery(\'#loading\').hide();'+"\n"+
             '            }'+"\n"+
             '        },'+"\n"+
             '        complete: function () {'+"\n"+
             '            loading_page = false;'+"\n"+
             '        }'+"\n"+
             '    })'+"\n"+
             '}'+"\n"+
             'window.plus_o = function(ob, prop1, prop2){'+"\n"+
             '	if(prop1 == \'post\'){'+"\n"+
             '		if(prop2!=\'photoset_order\'){'+"\n"+
             '			var q = (typeof ob[prop1] != \'undefined\' && typeof ob[prop1][prop2] != \'undefined\' && typeof ob[prop1][prop2] == \'string\' || !isNaN(parseInt(ob[prop1][prop2])));'+"\n"+
             '			return ((typeof ob[prop1] != \'undefined\' && typeof ob[prop1][prop2] != \'undefined\')? \'"\'+prop1+\'[\'+prop2+\']":\'+((q)? JSON.stringify(ob[prop1][prop2]+\'\'):ob[prop1][prop2])+\',\':\'\');'+"\n"+
             '		}else if(Array.isArray(ob[\'post\'][\'photos\'])){'+"\n"+
             '			var po = \'"post[photoset_order]":"\'; // photoset order is for po'+"\n"+
             '			for(var i=0; i<10; i++){'+"\n"+
             '				if(typeof ob[\'post\'][\'photos\'][i]!= \'undefined\' && typeof ob[\'post\'][\'photos\'][i][\'id\'] != \'undefined\')'+"\n"+
             '					po += ob[\'post\'][\'photos\'][i][\'id\']+\',\';'+"\n"+
             '			}'+"\n"+
             '			return po.substring(0,po.length-1)+\'",\';'+"\n"+
             '		}else{'+"\n"+
             '			return \'\';'+"\n"+
             '		}'+"\n"+
             '	}else if(prop1 == \'images\' || prop1 == \'caption\'){'+"\n"+
             '		return ((Array.isArray(ob[\'post\'][\'photos\']) && typeof ob[\'post\'][\'photos\'][prop2]!= \'undefined\' && typeof ob[\'post\'][\'photos\'][prop2][\'id\'] != \'undefined\')?'+"\n"+
             '			\'"\'+prop1+\'[\'+ob[\'post\'][\'photos\'][prop2][\'id\']+\']":"\'+((prop1 == \'caption\' && typeof ob[\'post\'][\'photos\'][prop2][\'caption\'] != \'undefined\')?ob[\'post\'][\'photos\'][prop2][\'caption\']:\'\')+\'",\':\'\');'+"\n"+
             '	}else if(prop1 == \'bool\'){'+"\n"+
             '		return ((typeof ob[prop2]!=\'undefined\' && ob[prop2])?\'"\'+prop2+\'": true,\': \'"\'+prop2+\'": false,\');'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'window.fetch_edit_submit = function(id, change, success){'+"\n"+
             '	jQuery.ajax({url:\'http://www.tumblr.com/svc/post/fetch\','+"\n"+
             '        type: \'post\','+"\n"+
             '        headers: {"Referer": "http://www.tumblr.com/dashboard"},'+"\n"+
             '        data: \'{"post_id":"\'+id+\'","post_type":false,"form_key":"\'+window.user_form_key+\'"}\','+"\n"+
             '        success: function(x) {'+"\n"+
             '        	var post_object = x;'+"\n"+
             '        	jQuery.ajax({url:\'http://www.tumblr.com/svc/secure_form_key\','+"\n"+
             '        		type: \'post\','+"\n"+
             '        		data:\'\','+"\n"+
             '        		headers:{ "Referer": "http://www.tumblr.com/edit/"+id,'+"\n"+
             '        			\'X-tumblr-form-key\': window.user_form_key},'+"\n"+
             '        		success: function(x2,b,r){'+"\n"+
             '        		var sform_key = r.getResponseHeader(\'X-tumblr-secure-form-key\');'+"\n"+
             '				var changes_to_post = \'{\'+'+"\n"+
             '					\'"channel_id":"\'+window.b_name+\'",\'+'+"\n"+
             '					\'"post_id":"\'+id+\'",\'+'+"\n"+
             '					\'"edit":true,\'+'+"\n"+
             '					\'"detached":true,\'+'+"\n"+
             '					\'"safe_edit":true,\'+'+"\n"+
             '					\'"form_key":"\'+window.user_form_key+\'",\'+'+"\n"+
             '					\'"errors":false,\'+'+"\n"+
             '					/*\'"post":\'+JSON.stringify(post_object["post"])+\', \'+*/'+"\n"+
             '					window.plus_o(post_object, \'bool\', \'created_post\')+'+"\n"+
             '					\'"context_page": "dashboard",\'+'+"\n"+
             '					\'"post_context_page": "dashboard",\'+'+"\n"+
             '					/*((typeof post_object["user"] != \'undefined\')?'+"\n"+
             '						\'"user":\'+JSON.stringify(post_object["user"])+\', \':\'\''+"\n"+
             '					)+'+"\n"+
             '					((typeof post_object["post_tumblelog"] != \'undefined\')?'+"\n"+
             '						\'"post_tumblelog":\'+JSON.stringify(post_object["post_tumblelog"])+\', \':\'\''+"\n"+
             '					)+*/'+"\n"+
             '					((typeof post_object["message"]!=\'undefined\')?\'"message":"\'+post_object["message"]+\'",\':\'\')+'+"\n"+
             '					\'"silent":true,\'+'+"\n"+
             '					\'"context_id":"",\'+'+"\n"+
             '					\'"editor_type":"html",\'+'+"\n"+
             '					\'"is_rich_text[one]":"0",\'+'+"\n"+
             '					\'"is_rich_text[two]":"0",\'+'+"\n"+
             '					\'"is_rich_text[three]":"0",\'+'+"\n"+
             '					window.plus_o(post_object, \'post\', \'slug\')+'+"\n"+
             '					((Array.isArray(change) && change[0]==\'post[date]\')?'+"\n"+
             '							\'"\'+change[0]+\'": "\'+change[1]+\'",\':'+"\n"+
             '							window.plus_o(post_object, \'post\', \'date\'))+'+"\n"+
             '					window.plus_o(post_object, \'post\', \'source_url\')+'+"\n"+
             '					window.plus_o(post_object, \'caption\', 0)+'+"\n"+
             '					window.plus_o(post_object, \'caption\', 1)+'+"\n"+
             '					window.plus_o(post_object, \'caption\', 2)+'+"\n"+
             '					window.plus_o(post_object, \'caption\', 3)+'+"\n"+
             '					window.plus_o(post_object, \'caption\', 4)+'+"\n"+
             '					window.plus_o(post_object, \'caption\', 5)+'+"\n"+
             '					window.plus_o(post_object, \'caption\', 6)+'+"\n"+
             '					window.plus_o(post_object, \'caption\', 7)+'+"\n"+
             '					window.plus_o(post_object, \'caption\', 8)+'+"\n"+
             '					window.plus_o(post_object, \'caption\', 9)+'+"\n"+
             '					((post_object["post"]["allow_photo_replies"])?\'"allow_photo_replies": "on",\':\'\')+'+"\n"+
             '					\'"MAX_FILE_SIZE": "10485760",\'+'+"\n"+
             '					window.plus_o(post_object, \'post\', \'type\')+'+"\n"+
             '					window.plus_o(post_object, \'post\', \'one\')+'+"\n"+
             '					((Array.isArray(change) && change[0]==\'post[two]\')?'+"\n"+
             '							\'"\'+change[0]+\'": "\'+change[1]+\'",\':'+"\n"+
             '							window.plus_o(post_object, \'post\', \'two\'))+'+"\n"+
             '					((Array.isArray(change) && change[0]==\'post[three]\')?'+"\n"+
             '							\'"\'+change[0]+\'": "\'+change[1]+\'",\':'+"\n"+
             '							window.plus_o(post_object, \'post\', \'three\'))+'+"\n"+
             '					window.plus_o(post_object, \'post\', \'tags\')+'+"\n"+
             '					((Array.isArray(change) && change[0]==\'post[state]\')?'+"\n"+
             '						\'"\'+change[0]+\'": \'+change[1]+\',\':'+"\n"+
             '							window.plus_o(post_object, \'post\', \'state\'))+'+"\n"+
             '					window.plus_o(post_object, \'post\', \'photoset_layout\')+'+"\n"+
             '					window.plus_o(post_object, \'post\', \'photoset_order\')+'+"\n"+
             '					window.plus_o(post_object, \'images\', 0)+'+"\n"+
             '					window.plus_o(post_object, \'images\', 1)+'+"\n"+
             '					window.plus_o(post_object, \'images\', 2)+'+"\n"+
             '					window.plus_o(post_object, \'images\', 3)+'+"\n"+
             '					window.plus_o(post_object, \'images\', 4)+'+"\n"+
             '					window.plus_o(post_object, \'images\', 5)+'+"\n"+
             '					window.plus_o(post_object, \'images\', 6)+'+"\n"+
             '					window.plus_o(post_object, \'images\', 7)+'+"\n"+
             '					window.plus_o(post_object, \'images\', 8)+'+"\n"+
             '					window.plus_o(post_object, \'images\', 9);'+"\n"+
             '					changes_to_post = changes_to_post.substring(0, changes_to_post.length-1)+\'}\';  '+"\n"+
             '					jQuery.ajax({url:\'http://www.tumblr.com/svc/post/update\','+"\n"+
             '						type: \'post\','+"\n"+
             '						headers: {"Referer": "http://www.tumblr.com/edit/"+id,'+"\n"+
             '							\'X-tumblr-form-key\': window.user_form_key,'+"\n"+
             '							\'X-tumblr-puppies\':sform_key},'+"\n"+
             '						data: changes_to_post,'+"\n"+
             '						success: function(){'+"\n"+
             '							success(id);'+"\n"+
             '						}'+"\n"+
             '					});'+"\n"+
             '				}'+"\n"+
             '			});'+"\n"+
             '        }'+"\n"+
             '    });'+"\n"+
             '}'+"\n"+
             'window._100 = function(x){'+"\n"+
             '	return (x+\'\').replace(/(tumblr.com\\/.*?)_(500|250|1280)\\.(png|jpe?g|gif|bmp)/i, "$1_100.$3");'+"\n"+
             '}'+"\n"+
             'window.ajax_going = 1;'+"\n"+
             'window.queue_page = 1;'+"\n"+
             'var d = new Date();'+"\n"+
             'window.moi = d.getMonth()+1;'+"\n"+
             'window.month_header = window.month_array[window.moi]+\' \'+new Date().getFullYear();'+"\n"+
             'window.position_timestamp = Date.parse(new Date());'+"\n"+
             'window.day = d.getDay();'+"\n"+
             'window.bb = d.getDate();'+"\n"+
             'window.by = d.getFullYear();'+"\n"+
             'window.last_oi = d.getMonth() + 1;'+"\n"+
             'window.last_b = d.getDate();'+"\n"+
             'window.last_y = d.getFullYear();'+"\n"+
             'window.parse_weekday_context = function(pa){'+"\n"+
             '	var d = new Date();'+"\n"+
             '	var day_array = [\'Sun\', \'Mon\', \'Tue\', \'Wed\', \'Thur\', \'Fri\', \'Sat\'];'+"\n"+
             '	var th = d.getHours();'+"\n"+
             '	var tm = d.getMinutes();'+"\n"+
             '	var time = (th>12)?(th-12)+\':\'+tm+\'pm\':th+\':\'+tm+\'am\';'+"\n"+
             '	var r = new Array();'+"\n"+
             '	if(typeof pa == \'undefined\'){'+"\n"+
             '		r[0] = window.position_timestamp+1; //timestamp'+"\n"+
             '		r[1] = "Private Post"; // date string'+"\n"+
             '	return r;'+"\n"+
             '	}else if(Object.prototype.toString.call(pa) == \'[object Array]\'){'+"\n"+
             '		var ds = pa[0]+\'\';'+"\n"+
             '		di = (ds=="Sun")? 0 : (ds=="Mon")? 1 : (ds=="Tue")? 2 : (ds=="Wed")? 3 : (ds=="Thu")? 4 : (ds=="Fri")? 5 : (ds=="Sat")? 6 : d.getDay();'+"\n"+
             '		if(di!=window.day){'+"\n"+
             '			window.bb++'+"\n"+
             '			window.day = di;'+"\n"+
             '		}'+"\n"+
             '		if(window.bb > new Date(window.by, window.moi, 0).getDate()){'+"\n"+
             '			window.moi++;'+"\n"+
             '			window.bb = 1;'+"\n"+
             '			if(window.moi>12){'+"\n"+
             '				window.by++;	'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '		y = window.by;'+"\n"+
             '		b = window.bb;'+"\n"+
             '		oi = window.moi;'+"\n"+
             '		time = pa[1]+\'\';'+"\n"+
             '	}else if(jQuery(pa).hasClass(\'permalink\')){'+"\n"+
             '		var oi=1; //mo'+"\n"+
             '		var di = d.getDay();'+"\n"+
             '		var y = window.last_y;'+"\n"+
             '		var b = window.last_b; //day of mo'+"\n"+
             '		var rday = jQuery(pa).attr(\'title\')+\'\';'+"\n"+
             '		if(rday.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/)!=null){'+"\n"+
             '			while(oi<window.month_array.length){'+"\n"+
             '				if(rday.match(window.month_array[oi]+\'\')==null){ //month'+"\n"+
             '					oi++;'+"\n"+
             '				}else{'+"\n"+
             '					break;	'+"\n"+
             '				}'+"\n"+
             '			}'+"\n"+
             '		}else{'+"\n"+
             '			oi = window.last_oi;'+"\n"+
             '		}'+"\n"+
             '		if(rday.match(/\\d{4},/)!=null){ //not this year'+"\n"+
             '			y = parseInt((rday+\'\').match(/(\\d{4}),/)[1]);'+"\n"+
             '		}'+"\n"+
             '		var diy = new Date(window.last_y,window.last_oi-1,window.last_b).getDay();'+"\n"+
             '		if(rday.match(/(Sun|Mon|Tue|Wed|Thu|Fri|Sat)/)!=null){ //day of week'+"\n"+
             '			var ds = rday.match(/(Sun|Mon|Tue|Wed|Thu|Fri|Sat)/)[0];'+"\n"+
             '			di = (ds=="Sun")? 0 : (ds=="Mon")? 1 : (ds=="Tue")? 2 : (ds=="Wed")? 3 : (ds=="Thu")? 4 : (ds=="Fri")? 5 : (ds=="Sat")? 6 : diy;'+"\n"+
             '			if(di-diy<0){'+"\n"+
             '				b+=di-diy;'+"\n"+
             '				if(b<1){'+"\n"+
             '					oi--;'+"\n"+
             '					if(oi<1){'+"\n"+
             '						oi=12;'+"\n"+
             '						y--;'+"\n"+
             '					}'+"\n"+
             '					b = new Date(y,oi,0).getDate() + 1 + di-diy;'+"\n"+
             '				}'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '		if(rday.match(/\\d{1,2}[thndrs]{2},?/i)!=null)'+"\n"+
             '			b = parseInt(rday.match(/(\\d{1,2})[thndrs]{2},?/i)[1]);'+"\n"+
             '		window.last_b=b; window.last_y=y; window.last_oi=oi;'+"\n"+
             '		di = new Date(y,oi-1,b,0,0,0,0).getDay();'+"\n"+
             '	}'+"\n"+
             '	th = (time.match(/pm$/)==null)? parseInt(time.match(/^\\d{1,2}/)) : parseInt(time.match(/^\\d{1,2}/))+12;'+"\n"+
             '	tm = parseInt(time.match(/:(\\d{2})/)[1]);'+"\n"+
             '	r[0] = Date.parse(new Date(y,oi-1,b,th,tm,0,0)); //timestamp'+"\n"+
             '	r[1] = window.month_array[oi]+" "+b+", "+y+" ("+day_array[di]+" "+time+")"; // date string'+"\n"+
             '	return r;'+"\n"+
             '}'+"\n"+
             'window.cumfound = 0; window.paused=false; window.last_page=false; window.first_draft = true;'+"\n"+
             'window.q_grab = function(){'+"\n"+
             '	if(window.paused)'+"\n"+
             '		return false;'+"\n"+
             '	jQuery(\'#loading\').show();'+"\n"+
             '	jQuery(\'#content\').css({height: \'100px\', zIndex:\'1\'});'+"\n"+
             '	if(window.queue_page==1 && window.queue_rl.match(/\\/queue$/)!=null)'+"\n"+
             '		window.pause_to_find_q_times();'+"\n"+
             '	if(window.last_page){'+"\n"+
             '		// the done functions again (for drafts)'+"\n"+
             '		jQuery(\'#halt\').find(\'span\').eq(0).html(\'DO\');jQuery(\'#halt\').find(\'span\').eq(0).css({\'color\':\'#000\'});'+"\n"+
             '		jQuery(\'#halt\').find(\'span\').eq(1).html(\'NE!\');jQuery(\'#halt\').find(\'span\').eq(1).css({\'color\':\'#000\'});'+"\n"+
             '		jQuery(\'#halt\').attr({title:"Done loading! No need to pause."});'+"\n"+
             '		jQuery(\'#loading\').hide();'+"\n"+
             '		window.make_inline_tags();'+"\n"+
             '		window.build_columns(true);'+"\n"+
             '		window.not_after_complete = true;'+"\n"+
             '		return;'+"\n"+
             '	}'+"\n"+
             '	window.ajax_going = jQuery.ajax({url:'+"\n"+
             '			((!window.drafts_editing)?'+"\n"+
             '			window.queue_rl+\'?page=\'+window.queue_page:'+"\n"+
             '			window.queue_rl+window.drafts_after),'+"\n"+
             '		headers: {"Referer": window.queue_rl},'+"\n"+
             '		type:\'get\',success:function(x){'+"\n"+
             '			if(x.match(\'<div class="no_posts_found"\')==null && x.length>50){'+"\n"+
             '				var queue = (x+\'\').match(/\\<\\!--\\sSTART\\sPOSTS\\s--\\>([\\s\\S]*)<\\!--\\sEND\\sPOSTS\\s--\\>/)[1];'+"\n"+
             '				var xBody = jQuery("<div></div>");'+"\n"+
             '				jQuery(xBody).html(queue.replace(/<script([\\d\\D]*?)>([\\d\\D]*?)<\\/script>/g,\'<div$1>$2</div>\'));'+"\n"+
             '				var q_posts = jQuery(xBody).find(\'div.post\');'+"\n"+
             '				if(window.drafts_editing){'+"\n"+
             '					if((x+\'\').match(/\\<[^\\>]*?"next_page_link"[^\\>]*?\\>/i)!=null){'+"\n"+
             '						window.drafts_after = ((x+\'\').'+"\n"+
             '												match(/\\<[^\\>]*?"next_page_link"[^\\>]*?\\>/i)+\'\').'+"\n"+
             '												match(/href="([^"]+)"/i)[1].'+"\n"+
             '												match(/\\/after\\/\\d+$/);'+"\n"+
             '					}else{'+"\n"+
             '						window.last_page = true;'+"\n"+
             '					}'+"\n"+
             '				}'+"\n"+
             '				add_post=\'\';'+"\n"+
             '				for(var i=0; i<q_posts.length; i++){'+"\n"+
             '					if(jQuery(q_posts).eq(i).attr(\'data-post-id\')==null) i++;'+"\n"+
             '					var inline_embed = jQuery(q_posts).eq(i).find(\'div.inline_embed\');'+"\n"+
             '					var postid = jQuery(q_posts).eq(i).attr(\'data-post-id\');'+"\n"+
             '					var postbody = "error";'+"\n"+
             '					var postwidth = 125;'+"\n"+
             '					var postheight = 125;'+"\n"+
             '					var tags = 0;'+"\n"+
             '					var type = \'regular\';'+"\n"+
             '					var doite = "in queue";'+"\n"+
             '					var ts = Date.parse(new Date());'+"\n"+
             '					var inner_tags = "";'+"\n"+
             '					var title_xtra="";'+"\n"+
             '					if(window.queue_rl.match(/\\/queue$/)==null && !window.drafts_editing){ //timestamp - mass edit only'+"\n"+
             '						var date_thing = window.parse_weekday_context(jQuery(q_posts).eq(i).find(\'a.permalink\').eq(0));'+"\n"+
             '						ts = date_thing[0];'+"\n"+
             '					}else if(!window.drafts_editing){'+"\n"+
             '						var date_thing = window.parse_weekday_context(window.q_times[i]);'+"\n"+
             '						ts = date_thing[0];'+"\n"+
             '					}else{'+"\n"+
             '						var date_thing = window.parse_weekday_context(["Sun","13:37am"]);'+"\n"+
             '					}'+"\n"+
             '					if(jQuery(q_posts).eq(i).find(\'.post_tags\').length>0){ //tags'+"\n"+
             '						var outer_tags = jQuery(q_posts).eq(i).find(\'.post_tags\').eq(0).find(\'a.post_tag\');'+"\n"+
             '						tags = outer_tags.length;'+"\n"+
             '						for(var it=0;it<tags;it++){'+"\n"+
             '							inner_tags += (jQuery(outer_tags).eq(it).html()+\'\').substring(1);'+"\n"+
             '							if(it+1<tags)inner_tags += \',\';'+"\n"+
             '						}'+"\n"+
             '					}'+"\n"+
             '					if(window.drafts_editing){'+"\n"+
             '						jQuery(q_posts).eq(i).find(\'img.post_avatar_image\').eq(0).remove();'+"\n"+
             '					}'+"\n"+
             '					if(jQuery(q_posts).eq(i).attr(\'data-type\')==\'photoset\'//photoset'+"\n"+
             '					|| jQuery(q_posts).eq(i).attr(\'data-type\')==\'photo\'   //photo'+"\n"+
             '					|| jQuery(q_posts).eq(i).attr(\'data-type\')==\'pano\'){   //panoramo'+"\n"+
             '						type = "photo";'+"\n"+
             '						var ph = (jQuery(q_posts).eq(i).find(\'img\').eq(0).css(\'height\')!=null)? parseInt(jQuery(q_posts).eq(i).find(\'img\').eq(0).css(\'height\')): jQuery(q_posts).eq(i).find(\'img\').eq(0).css(\'width\');'+"\n"+
             '						var twidth = parseInt(jQuery(q_posts).eq(i).find(\'img\').eq(0).css(\'width\'));'+"\n"+
             '						postheight = Math.floor(ph * (125/twidth));'+"\n"+
             '						if(postheight<50)'+"\n"+
             '							postheight=50;'+"\n"+
             '						postbody = \'<img src="\'+window._100(jQuery(q_posts).eq(i).find(\'img\').eq(0).attr(\'src\'))+\'" style="width:125px;height:auto;" />\';'+"\n"+
             '					}else if(jQuery(q_posts).eq(i).attr(\'data-type\')==\'regular\' //text post'+"\n"+
             '					|| jQuery(q_posts).eq(i).attr(\'data-type\')==\'link\'          //url'+"\n"+
             '					|| jQuery(q_posts).eq(i).attr(\'data-type\')==\'quote\'         //quot'+"\n"+
             '					|| jQuery(q_posts).eq(i).attr(\'data-type\')==\'note\'		  //question/answer'+"\n"+
             '					|| jQuery(q_posts).eq(i).attr(\'data-type\')==\'conversation\'){//chat       '+"\n"+
             '						type = jQuery(q_posts).eq(i).attr(\'data-type\');'+"\n"+
             '						if(jQuery(q_posts).eq(i).find(\'img\').length==0 && jQuery(q_posts).eq(i).find(\'div.post_content\').length>0){'+"\n"+
             '							var string = ((jQuery(q_posts).eq(i).find(\'div.post_content\').eq(0).html()+\'\').replace(/<[^>]+>/g,\' \').replace(/\\s+/g,\' \')).substring(0,179);'+"\n"+
             '							postbody = \'<div class="overprint " style="overflow:hidden !important;">\'+string+\'...</div>\';'+"\n"+
             '						}else if(jQuery(q_posts).eq(i).find(\'img\').length>0){'+"\n"+
             '							var ph = parseInt(jQuery(q_posts).eq(i).find(\'img\').eq(0).css(\'height\'));'+"\n"+
             '							var twidth = parseInt(jQuery(q_posts).eq(i).find(\'img\').eq(0).css(\'width\'));'+"\n"+
             '							postheight = Math.floor(ph * (125/twidth));'+"\n"+
             '							if(postheight<110)postheight=110;'+"\n"+
             '							postbody = \'<img src="\'+window._100(jQuery(q_posts).eq(i).find(\'img\').eq(0).attr(\'src\'))+\'" style="width:125px;height:auto" />\';'+"\n"+
             '						}'+"\n"+
             '					}else if(jQuery(q_posts).eq(i).attr(\'data-type\')==\'video\' || jQuery(q_posts).eq(i).find(\'div.retro_thumbnail\').length>0){//video'+"\n"+
             '						type = "video";'+"\n"+
             '						var img = \'<div class="title"><img width="10" height="10" alt="Watch" class="watch_icon" src="http://assets.tumblr.com/images/archive_watch_icon.png">Watch</div>\';	'+"\n"+
             '						var img="";'+"\n"+
             '						if(jQuery(q_posts).eq(i).find(\'div.retro_thumbnail\').length>0)'+"\n"+
             '							img = \'<img src="\'+(jQuery(q_posts).eq(i).find(\'div.retro_thumbnail\').eq(0).css(\'backgroundImage\').split(\'"\')[1])+\'" height="width:125px;auto;"/>\';'+"\n"+
             '						else if(jQuery(q_posts).eq(i).find(\'img\').length>0)'+"\n"+
             '							img = \'<img src="\'+window._100(jQuery(q_posts).eq(i).find(\'img\').eq(0).attr(\'src\'))+\'" style="width:125px;height:auto;" />\';'+"\n"+
             '						else if(inline_embed.length>0 && jQuery(q_posts).eq(i).find(\'img\').length==0'+"\n"+
             '						&& jQuery(inline_embed).eq(0).html().match(/(http:[\\S]+?\\.(jpe?g|png|bmp|gif))/)[1]!=null)'+"\n"+
             '							img = \'<img src="\'+'+"\n"+
             '									jQuery(inline_embed).eq(0).html().match(/(http:[\\S]+?\\.(jpe?g|png|bmp|gif))/)[1].replace(/\\\\\\\\/g, "")+'+"\n"+
             '									\'" style="width:125px;height:auto;" />\';'+"\n"+
             '						postbody = \'<div class="play_overlay"></div>\'+img;'+"\n"+
             '					}else if(jQuery(q_posts).eq(i).attr(\'data-type\')==\'audio\'){//audio'+"\n"+
             '						type = "audio";'+"\n"+
             '						var img = \'\';'+"\n"+
             '						if(jQuery(q_posts).eq(i).find(\'img\').length>0)'+"\n"+
             '							img = \'<img src="\'+window._100(jQuery(q_posts).eq(i).find(\'img\').eq(0).attr(\'src\'))+\'" style="width:125px;height:125px;" />\';'+"\n"+
             '						postbody = \'<div class="listen_overlay"></div>\'+img;'+"\n"+
             '					}else{ //try for anything'+"\n"+
             '						type = (jQuery(q_posts).eq(i).attr(\'data-type\').length!=null)?jQuery(q_posts).eq(i).attr(\'data-type\'):\'unknown\';'+"\n"+
             '						if(jQuery(q_posts).eq(i).find(\'img\').length>0)'+"\n"+
             '							postbody = \'<img src="\'+window._100(jQuery(q_posts).eq(i).find(\'img\').eq(0).attr(\'src\'))+\'" style="width:125px;height:auto" />\';'+"\n"+
             '						else if((jQuery(q_posts).eq(i).find(\'p\').length>0))'+"\n"+
             '							postbody = \'<div class="overprint " style="overflow:hidden !important;">\'+'+"\n"+
             '							((jQuery(q_posts).eq(i).find(\'p\').eq(0).html()+\'\').replace(/<[^>]+>/g,\' \').replace(/\\s+/g,\' \')).substring(0,179);+'+"\n"+
             '							\'...</div>\';'+"\n"+
             '					}'+"\n"+
             '					jQuery(inline_embed).each(function(i,d){jQuery(d).remove();});'+"\n"+
             '					if(jQuery(q_posts).eq(i).find(\'div.post_content\').eq(0).find(\'p\').eq(0))'+"\n"+
             '						title_xtra = (jQuery(q_posts).eq(i).find(\'div.post_content\').eq(0).find(\'p\').eq(0).html()+\'\').replace(/<[^>]+>/g,\' \').replace(/\\s+/g,\' \').'+"\n"+
             '										replace(/"/g, \'&quot;\').replace(/\'/g, \'&#39;\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\');'+"\n"+
             '					var head_extra="";'+"\n"+
             '					if(window.month_header != (window.month_array[new Date(ts).getMonth()+1]+\' \'+new Date(ts).getFullYear()+\'\') || window.queue_page==1 && i==0){'+"\n"+
             '						window.month_header = (window.month_array[new Date(ts).getMonth()+1]+\' \'+new Date(ts).getFullYear()+\'\')'+"\n"+
             '						head_extra = \'<div id="heading_\'+parseInt(ts)/1000+'+"\n"+
             '									  \'" style="position: absolute; left: 0px; right: 0px; top: 0px;" class="heading">\'+window.month_header+\'</div>\'+"\\n<br/>";'+"\n"+
             '					}'+"\n"+
             '					if(window.first_draft && window.drafts_editing){'+"\n"+
             '						window.first_draft = false;'+"\n"+
             '						head_extra = \'<div id="heading_drafts" style="position: absolute; left: 0px; right: 0px; top: 0px;" class="heading">Drafts Page</div>\'+"\\n<br/>";'+"\n"+
             '					}'+"\n"+
             '					window.position_timestamp = ts;'+"\n"+
             '						add_post += head_extra+'+"\n"+
             '							\'<a id="post_\'+postid+\'" alt="0" target="_blank" class="brick brick_to_show \'+type+\' timestamp_\'+parseInt(ts)/1000+\'" style="position:absolute;\'+'+"\n"+
             '							\' -webkit-box-shadow: 1px 1px 3px 1px rgba(100, 100, 100, .3);box-shadow: 1px 1px 3px 1px rgba(100, 100, 100, .5);\'+'+"\n"+
             '							\'vertical-align:center; width:125px; height:\'+postheight+\'px;border-radius: 5px;" \'+'+"\n"+
             '							\'href="\'+window.queue_rl+\'" title="\'+date_thing[1]+\'&#13;&#10;\'+inner_tags+\'&#13;&#10;\'+title_xtra+\'"\'+'+"\n"+
             '							\'onclick="if(window.orly()){if(jQuery(this).hasClass(\\\'highlighted\\\')){jQuery(this).removeClass(\\\'highlighted\\\');\'+'+"\n"+
             '							\'if(Array.isArray(window.get_selected_post_ids())){window.select_count(-1);}\'+'+"\n"+
             '							\'}else{jQuery(this).addClass(\\\'highlighted\\\');\'+'+"\n"+
             '							\'if(Array.isArray(window.get_selected_post_ids())){window.select_count(1);}}}return false;">\'+'+"\n"+
             '							\'<div class="highlight" style="border-radius: 5px;">\'+'+"\n"+
             '							\'<img src="http://assets.tumblr.com/images/small_white_checkmark.png" class="checkmark"/>\'+'+"\n"+
             '							\'<div class="tag_count" id="tag_count_\'+postid+\'">\'+tags+\' tags</div>\'+'+"\n"+
             '							\'</div>\'+'+"\n"+
             '							\'<div>\'+postbody+\'</div>\'+'+"\n"+
             '							\'<div class="overlay">\'+'+"\n"+
             '							\'<div class="inner">\'+'+"\n"+
             '							\'<div class="date">\'+doite+\'</div>\'+'+"\n"+
             '							\'</div>\'+'+"\n"+
             '							\'</div>\'+'+"\n"+
             '							\'<input class="itags" type="hidden" value="\'+escape(inner_tags)+\'"/>\'+'+"\n"+
             '							\'</a>\'+"\\n";'+"\n"+
             '				}'+"\n"+
             '				jQuery(\'#content\').append(add_post);'+"\n"+
             '				build_columns(true);'+"\n"+
             '				add_post=\'\';'+"\n"+
             '				window.queue_page++;'+"\n"+
             '				window.make_inline_tags();'+"\n"+
             '				window.ajax_going = false;'+"\n"+
             '				window.q_grab();'+"\n"+
             '			}else{'+"\n"+
             '				// the done functions'+"\n"+
             '				jQuery(\'#halt\').find(\'span\').eq(0).html(\'DO\');jQuery(\'#halt\').find(\'span\').eq(0).css({\'color\':\'#000\'});'+"\n"+
             '				jQuery(\'#halt\').find(\'span\').eq(1).html(\'NE!\');jQuery(\'#halt\').find(\'span\').eq(1).css({\'color\':\'#000\'});'+"\n"+
             '				jQuery(\'#halt\').attr({title:"Done loading! No need to pause."});'+"\n"+
             '				jQuery(\'#loading\').hide();'+"\n"+
             '				window.make_inline_tags();'+"\n"+
             '				window.build_columns(true);'+"\n"+
             '				window.not_after_complete = true;'+"\n"+
             '				return;'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '	});'+"\n"+
             '}'+"\n"+
             'window.draft_queue_publish = function(queue){'+"\n"+
             '	jQuery(\'.highlighted\').each(function(i,hl){'+"\n"+
             '		var post_id = (jQuery(hl).attr(\'id\')+\'\').replace(/[^\\d]+/g,\'\');'+"\n"+
             '		jQuery.ajax({url:\'http://www.tumblr.com/publish\','+"\n"+
             '			async: false,'+"\n"+
             '			type:\'post\', data: \'form_key=\'+window.user_form_key+\'&id=\'+post_id+((queue)?\'&queue=queue\':\'\'),'+"\n"+
             '			headers: {"Referer": window.queue_rl},'+"\n"+
             '			success:function(x){'+"\n"+
             '				jQuery(hl).remove();'+"\n"+
             '				window.build_columns(true);'+"\n"+
             '			}'+"\n"+
             '		});'+"\n"+
             '	});'+"\n"+
             '}'+"\n"+
             'window.queuedit = function(){'+"\n"+
             '	window.get_data_for_tagsel = false;'+"\n"+
             '	window.main_page=false;'+"\n"+
             '	window.drafts_editing = false;'+"\n"+
             '	window.fetch_next_page = false;'+"\n"+
             '	window.next_page = false;'+"\n"+
             '	jQuery(\'#browse_months\').hide();'+"\n"+
             '	window.queue_rl=\'http://www.tumblr.com/blog/\'+window.b_name+\'/queue\';'+"\n"+
             '	window.queue_page = 1;'+"\n"+
             '	jQuery(\'#content\').html(\'\');'+"\n"+
             '	jQuery(\'#prvt\').hide();'+"\n"+
             '	jQuery(\'#bdb\').hide();'+"\n"+
             '	window.last_page=false;'+"\n"+
             '	window.abort_to_switch_page();'+"\n"+
             '	window.q_grab();'+"\n"+
             '	jQuery(\'#mqe\').unbind(\'click\');'+"\n"+
             '	jQuery(\'#mqe\').html(\'<div class="chrome_button"><div class="chrome_button_left"></div>< Back To Main Edit<div class="chrome_button_right"></div></button>\');'+"\n"+
             '	jQuery(\'#mde\').html(\'<div class="chrome_button"><div class="chrome_button_left"></div>Mass Draft Edit<div class="chrome_button_right"></div></button>\');'+"\n"+
             '	jQuery(\'#mqe\').bind("click", function(){document.location = document.location+\'\'});'+"\n"+
             '	jQuery(\'#mde\').bind("click", window.draftsedit);'+"\n"+
             '	jQuery(\'#toQueue\').hide();'+"\n"+
             '	jQuery(\'#toRepublish\').show();'+"\n"+
             '	jQuery(\'#toPublish\').show();'+"\n"+
             '}'+"\n"+
             'window.drafts_editing = false; window.drafts_after = "";'+"\n"+
             'window.draftsedit = function(){'+"\n"+
             '	window.get_data_for_tagsel = false;'+"\n"+
             '	window.first_draft = true;'+"\n"+
             '	window.drafts_after = "";'+"\n"+
             '	window.drafts_editing = true;'+"\n"+
             '	window.main_page=false;'+"\n"+
             '	window.last_page=false;'+"\n"+
             '	window.fetch_next_page = false;'+"\n"+
             '	window.next_page = false;'+"\n"+
             '	jQuery(\'#browse_months\').hide();'+"\n"+
             '	window.queue_rl=\'http://www.tumblr.com/blog/\'+window.b_name+\'/drafts\';'+"\n"+
             '	jQuery(\'#content\').html(\'\');'+"\n"+
             '	jQuery(\'#prvt\').hide();'+"\n"+
             '	jQuery(\'#bdb\').hide();'+"\n"+
             '	window.abort_to_switch_page();'+"\n"+
             '	window.q_grab();'+"\n"+
             '	jQuery(\'#mde\').unbind(\'click\');'+"\n"+
             '	jQuery(\'#mqe\').html(\'<div class="chrome_button"><div class="chrome_button_left"></div>Mass Queue Edit<div class="chrome_button_right"></div></button>\');'+"\n"+
             '	jQuery(\'#mde\').html(\'<div class="chrome_button"><div class="chrome_button_left"></div>< Back To Main Edit<div class="chrome_button_right"></div></button>\');'+"\n"+
             '	jQuery(\'#mde\').bind("click", function(){document.location = document.location+\'\'});'+"\n"+
             '	jQuery(\'#mqe\').bind("click", window.queuedit);'+"\n"+
             '	jQuery(\'#toQueue\').show();'+"\n"+
             '	jQuery(\'#toPublish\').show();'+"\n"+
             '	jQuery(\'#toRepublish\').hide();'+"\n"+
             '}'+"\n"+
             'window.massedit = function(){'+"\n"+
             '	new PeriodicalExecuter(window.get_data_for_tagsel, 3);'+"\n"+
             '}'+"\n"+
             'window.maybe_done = 0;'+"\n"+
             'window.get_data_for_tagsel = function(pe){'+"\n"+
             '	if(jQuery(\'.brick\').length !== jQuery(\'.with_tags\').length){'+"\n"+
             '		jQuery(\'.brick\').each(function(i,brick){'+"\n"+
             '			jQuery(brick).attr(\'title\', new Date(parseInt(jQuery(brick).attr(\'class\').replace(/\\D/g,\'\'))*1000+(1000*60))+\'\');'+"\n"+
             '			if(!jQuery(brick).hasClass(\'with_tags\')){'+"\n"+
             '				jQuery.ajax({url:"http://www.tumblr.com/get_tags_for_posts",'+"\n"+
             '					type:\'post\','+"\n"+
             '					data: \'post_ids=\'+jQuery(brick).attr(\'id\').substring(5)+\'&form_key=\'+window.user_form_key,'+"\n"+
             '					success: function(x){'+"\n"+
             '						jQuery(brick).css({'+"\n"+
             '							boxShadow: \'1px 1px 3px 1px rgba(100, 100, 100, .5)\''+"\n"+
             '						});'+"\n"+
             '						jQuery(brick).attr(\'onclick\', \'if(window.orly()){if(jQuery(this).hasClass(\\\'highlighted\\\')){jQuery(this).removeClass(\\\'highlighted\\\');\'+'+"\n"+
             '							\'if(Array.isArray(window.get_selected_post_ids())){window.select_count(-1);}\'+'+"\n"+
             '							\'}else{jQuery(this).addClass(\\\'highlighted\\\');\'+'+"\n"+
             '							\'if(Array.isArray(window.get_selected_post_ids())){window.select_count(1);}}}return false;\');'+"\n"+
             '						var inner_tags=x;'+"\n"+
             '						jQuery(brick).append(\'<input class="itags" type="hidden" value="\'+escape(inner_tags)+\'"/>\');'+"\n"+
             '						jQuery(brick).addClass(\'with_tags\');'+"\n"+
             '						jQuery(brick).addClass(\'brick_to_show\');'+"\n"+
             '						window.maybe_done++;'+"\n"+
             '						if(window.maybe_done>=10 || jQuery(\'.brick\').length + jQuery(\'.null_brick\').length == jQuery(\'.with_tags\').length){'+"\n"+
             '							window.make_inline_tags();'+"\n"+
             '							if(window.new_show_these_selected)'+"\n"+
             '								window.show_only_these(0);'+"\n"+
             '							window.maybe_done=0;'+"\n"+
             '						}'+"\n"+
             '					}'+"\n"+
             '				});'+"\n"+
             '			}'+"\n"+
             '		});'+"\n"+
             '	}else{'+"\n"+
             '		if(!window.next_page){'+"\n"+
             '        	pe.stop();'+"\n"+
             '        	return'+"\n"+
             '    	}'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'window.new_show_these_selected = false;'+"\n"+
             'var queue_button = jQuery(\'<button></button>)\');'+"\n"+
             'jQuery(queue_button).attr(\'id\',\'mqe\');'+"\n"+
             'jQuery(queue_button).attr(\'title\',\'Edit posts from your queue.\');'+"\n"+
             'jQuery(queue_button).addClass(\'chrome\');'+"\n"+
             'jQuery(queue_button).html(\'<div class="chrome_button"><div class="chrome_button_left"></div>Mass Queue Edit<div class="chrome_button_right"></div></div>\');'+"\n"+
             'jQuery(queue_button).bind("click", window.queuedit);'+"\n"+
             'var draft_button = jQuery(\'<button></button>)\');'+"\n"+
             'jQuery(draft_button).attr(\'id\',\'mde\');'+"\n"+
             'jQuery(draft_button).attr(\'title\',\'Edit posts from your drafts page.\');'+"\n"+
             'jQuery(draft_button).addClass(\'chrome\');'+"\n"+
             'jQuery(draft_button).html(\'<div class="chrome_button"><div class="chrome_button_left"></div>Mass Draft Edit<div class="chrome_button_right"></div></div>\');'+"\n"+
             'jQuery(draft_button).bind("click", window.draftsedit);'+"\n"+
             'var lite_mode = jQuery(\'<button></button>)\');'+"\n"+
             'jQuery(lite_mode).attr(\'id\',\'lite_mode\');'+"\n"+
             'jQuery(lite_mode).attr(\'title\',\'Lite mode: Faster loading post brick masonry.\');'+"\n"+
             'jQuery(lite_mode).addClass(\'chrome\');'+"\n"+
             'jQuery(lite_mode).html(\'<div class="chrome_button"><div class="chrome_button_left"></div>Lite Mode<div class="chrome_button_right"></div></div>\');'+"\n"+
             'jQuery(lite_mode).bind("click", window.lite_mode_);'+"\n"+
             'var select_all = jQuery(\'<div></div>)\');'+"\n"+
             'jQuery(select_all).addClass(\'header_button\');'+"\n"+
             'jQuery(select_all).attr({title:\'Select All (limit:100)\',id:\'select_all\'});'+"\n"+
             'jQuery(select_all).html(\'<button class="chrome big_dark" type="button">\'+'+"\n"+
             '				  \'<div class="chrome_button"><div class="chrome_button_left"></div>Select All<div class="chrome_button_right"></div></div></button>\');'+"\n"+
             'window.select_all_limit = 0;'+"\n"+
             'jQuery(select_all).bind("click", function(){'+"\n"+
             '		jQuery(\'.highlighted\').each(function(i,hl){'+"\n"+
             '			if(jQuery(hl).hasClass(\'highlighted\')){'+"\n"+
             '				jQuery(hl).removeClass(\'highlighted\');'+"\n"+
             '				if(Array.isArray(window.get_selected_post_ids()))'+"\n"+
             '					window.select_count(-1);'+"\n"+
             '			}'+"\n"+
             '		});'+"\n"+
             '		var brick = jQuery(\'.brick\');'+"\n"+
             '		for(var i=window.select_all_limit; i<brick.length; i++){'+"\n"+
             '			if(jQuery(brick[i]).hasClass(\'highlighted\')==false && jQuery(\'.highlighted\').length<100){'+"\n"+
             '				jQuery(brick[i]).addClass( \'highlighted\');'+"\n"+
             '				if(Array.isArray(window.get_selected_post_ids()))'+"\n"+
             '					window.select_count(1);'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '		if(jQuery(\'.highlighted\').length==100){'+"\n"+
             '			jQuery(\'#select_all\').html(\'<button class="chrome big_dark" type="button">\'+'+"\n"+
             '				  \'<div class="chrome_button"><div class="chrome_button_left"></div>Select 100 More<div class="chrome_button_right"></div></div></button>\');'+"\n"+
             '			window.select_all_limit += 100;'+"\n"+
             '		}else{'+"\n"+
             '			jQuery(\'#select_all\').html(\'<button class="chrome big_dark" type="button">\'+'+"\n"+
             '				  \'<div class="chrome_button"><div class="chrome_button_left"></div>Select All<div class="chrome_button_right"></div></div></button>\');'+"\n"+
             '			window.select_all_limit = 0;'+"\n"+
             '		}'+"\n"+
             '	});'+"\n"+
             'jQuery(\'#content\').attr(\'title\',\'click/drag to select multiple posts; hold shift click/drag to further add to selection (limit:100)\');'+"\n"+
             'jQuery(\'#unselect\').parent().after(select_all);'+"\n"+
             'jQuery(window.nav+\' a\').eq(0).after(queue_button);'+"\n"+
             'jQuery(window.nav+\' a\').eq(0).after(draft_button);'+"\n"+
             'jQuery(window.nav+\' a\').eq(0).after(lite_mode);'+"\n"+
             'jQuery(\'#unselect\').bind("click", function(){'+"\n"+
             '	jQuery(\'#select_all\').html(\'<button class="chrome big_dark" type="button">\'+'+"\n"+
             '				  \'<div class="chrome_button"><div class="chrome_button_left"></div>Select All<div class="chrome_button_right"></div></div></button>\');'+"\n"+
             '	jQuery(\'#tagsel input\').each(function(i,check){'+"\n"+
             '		if(jQuery(check).is(\':checked\')){'+"\n"+
             '			jQuery(check).removeAttr(\'checked\');'+"\n"+
             '		}'+"\n"+
             '	});'+"\n"+
             '	window.make_inline_tags();'+"\n"+
             '	jQuery(\'#unselect\').find(\'div.chrome_button\').eq(0).html(\'<div class="chrome_button_left"></div>Unselect<div class="chrome_button_right"></div>\');'+"\n"+
             '	window.total_selected=0;'+"\n"+
             '	jQuery("#sbt_confirm").html("Select By Tag");'+"\n"+
             '});'+"\n"+
             'window.case_i = function(a,b){ '+"\n"+
             '	var lca = a.toLowerCase(), lcb = b.toLowerCase();'+"\n"+
             '	return lca > lcb ? 1 : lca < lcb ? -1 : 0;'+"\n"+
             '}'+"\n"+
             'window.delete_selected_posts = (function() {'+"\n"+
             '	var cached_function = window.delete_selected_posts;'+"\n"+
             '	return function(){'+"\n"+
             '		cached_function.apply(this, arguments);'+"\n"+
             '		jQuery(\'#unselect\').find(\'div.chrome_button\').eq(0).html(\'<div class="chrome_button_left"></div>Unselect<div class="chrome_button_right"></div>\');'+"\n"+
             '		if(window.columns_need_rebuilding()){'+"\n"+
             '        	window.build_columns(true);'+"\n"+
             '    	}'+"\n"+
             '	};'+"\n"+
             '}());'+"\n"+
             'window.get_tags_for_selected_queue_posts = function(event) {'+"\n"+
             '	window.just_clicked_remove_tags = true;'+"\n"+
             '	jQuery(\'#remove_tag_button\').hide();'+"\n"+
             '	jQuery(\'#tags_loading\').show();'+"\n"+
             '	jQuery(\'#tags\').html(\'\');'+"\n"+
             '	jQuery(\'#remove_tags_widget\').show();'+"\n"+
             '	var highlighted_tags = new Array();'+"\n"+
             '	jQuery(\'.highlighted\').each(function(i,post){'+"\n"+
             '		var e = unescape(jQuery(post).find(\'input.itags\').eq(0).val()).split(\',\')'+"\n"+
             '		for(ik=0;ik<e.length;ik++){'+"\n"+
             '			if(typeof e[ik] != undefined && e[ik].length > 0)'+"\n"+
             '				highlighted_tags.push(e[ik]);'+"\n"+
             '		}'+"\n"+
             '		'+"\n"+
             '	});'+"\n"+
             '	window.uniq(highlighted_tags.sort(window.case_i)).forEach(function(tag){'+"\n"+
             '		if(tag!=null){'+"\n"+
             '			tag_checkbox_id++;'+"\n"+
             '			jQuery(\'#tags\').append(\'<div id="\'+tag+\'">\'+'+"\n"+
             '							 \'<input type="checkbox" alt="\' + tag.replace(/"/g, \'\') + \'" id="tag_checkbox_\' + tag_checkbox_id + \'"/>\'+'+"\n"+
             '							 \'<label for="tag_checkbox_\' + tag_checkbox_id + \'">\' + tag + \'</label></div>\');'+"\n"+
             '		}'+"\n"+
             '	});'+"\n"+
             '	jQuery(\'#remove_tag_button\').show();'+"\n"+
             '	jQuery(\'#tags_loading\').hide();'+"\n"+
             '	jQuery(\'#no_tags_message\').hide();'+"\n"+
             '}'+"\n"+
             'window.add_tags_for_queue = function(){'+"\n"+
             '	var a_me = jQuery(\'#tokens .tag\');'+"\n"+
             '	jQuery(\'.highlighted\').each(function(i,post){'+"\n"+
             '		var a_in = jQuery(post).find(\'input.itags\').eq(0);'+"\n"+
             '		for(ig=0;ig<a_me.length;ig++){'+"\n"+
             '			if((unescape(jQuery(a_in).val()+\'\')+\'\').match(jQuery(a_me).eq(ig).html()+\'\')==null){'+"\n"+
             '				if(jQuery(a_in).val().length > 0)'+"\n"+
             '					jQuery(a_in).val()+=escape(\',\');'+"\n"+
             '				jQuery(a_in).val() += escape(jQuery(a_me).eq(ig).html()+\'\');'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '		jQuery(post).find(\'.tag_count\').eq(0).html() = (unescape(jQuery(a_in).val()+\'\')+\'\').split(\',\').length + " tags";'+"\n"+
             '	});'+"\n"+
             '	window.make_inline_tags();'+"\n"+
             '}'+"\n"+
             'window.remove_tags_for_queue = function(){'+"\n"+
             '	jQuery(\'#tags input\').each(function(i,tag){'+"\n"+
             '		if(jQuery(tag).is(\':checked\')){'+"\n"+
             '			var remove = escape(jQuery(tag).attr(\'alt\'));'+"\n"+
             '			var r_me = jQuery(\'.highlighted\');'+"\n"+
             '			for(ig=0;ig<r_me.length;ig++){'+"\n"+
             '				var r_in = jQuery(r_me[ig]).find(\'input.itags\').eq(0);'+"\n"+
             '				if((jQuery(r_in).val()+\'\').match(remove+escape(\',\'))!=null){'+"\n"+
             '					jQuery(r_in).attr(\'value\', (jQuery(r_in).val()+\'\').replace(remove+escape(\',\'),\'\'));'+"\n"+
             '				}else if((jQuery(r_in).val()+\'\').match(escape(\',\')+remove)!=null){'+"\n"+
             '					jQuery(r_in).attr(\'value\', (jQuery(r_in).val()+\'\').replace(escape(\',\')+remove,\'\'));'+"\n"+
             '				}else if((jQuery(r_in).val()+\'\').match(remove)!=null){'+"\n"+
             '					jQuery(r_in).attr(\'value\', (jQuery(r_in).val()+\'\').replace(remove,\'\'));'+"\n"+
             '				}'+"\n"+
             '				jQuery(r_me[ig]).find(\'.tag_count\').eq(0).html() = (unescape(jQuery(r_in).val()+\'\')+\'\').split(\',\').length + " tags";'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '	});'+"\n"+
             '	jQuery(\'#tagsel input\').each(function(i,check){'+"\n"+
             '		if(jQuery(check).is(\':checked\')){'+"\n"+
             '			jQuery(check).removeAttr(\'checked\');'+"\n"+
             '		}'+"\n"+
             '	});'+"\n"+
             '	window.make_inline_tags();'+"\n"+
             '}'+"\n"+
             'window.no_less_than_tag = 0;'+"\n"+
             'window.return_check_box_for_ = function(label){'+"\n"+
             '	if(jQuery(\'#typu_\'+label).length==0){'+"\n"+
             '	var label2 = (label==\'note\')? \'answer\' : (label==\'regular\')? \'text\' : label;'+"\n"+
             '		return \'<div style="color:#cc3333;" id="typu_\'+label+\'">\'+'+"\n"+
             '		  	\'<input type="checkbox" alt="" data-type="\'+label+\'" class="select_me" id="post_t_checkbox_\'+label+\'"/>\'+'+"\n"+
             '			\'<label for="post_t_checkbox_\'+label+\'"> POST-type: \'+label2+\'</label>\'+'+"\n"+
             '			\'<input type="checkbox" alt="" class="NOT_select_me" data-type="\'+label+\'" id="tag_checkbox_NOT_\'+label+\'"/>\'+'+"\n"+
             '			\'<label for="tag_checkbox_NOT_\'+label+\'" class="NOT_select_me">not this</label>\'+'+"\n"+
             '			\'</div>\';'+"\n"+
             '	}else{'+"\n"+
             '		return \'\';'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'window.make_inline_tags = function(){'+"\n"+
             '	var quick_id = 1;'+"\n"+
             '	var all_tags = new Array();'+"\n"+
             '	jQuery(\'.brick_to_show\').each(function(i,post){'+"\n"+
             '		if(jQuery(post).find(\'input.itags\').length>0){'+"\n"+
             '			var e = unescape(jQuery(post).find(\'input.itags\').eq(0).val()).split(\',\')'+"\n"+
             '			for(ik=0;ik<e.length;ik++){'+"\n"+
             '				if(e[ik]!=\'\' && typeof e[ik] != \'undefined\'){'+"\n"+
             '					all_tags.push(e[ik]);'+"\n"+
             '				}'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '	});'+"\n"+
             '	jQuery(\'#shonly div\').each(function(i,check){'+"\n"+
             '		if(!jQuery(check).find(\'input.select_me\').eq(0).is(\':checked\') && !jQuery(check).find(\'input.NOT_select_me\').eq(0).is(\':checked\')){'+"\n"+
             '			jQuery(check).remove();'+"\n"+
             '		}'+"\n"+
             '	});'+"\n"+
             '	jQuery(\'#tagsel div\').each(function(i,check){'+"\n"+
             '		if(!jQuery(check).find(\'input.select_me\').eq(0).is(\':checked\') && !jQuery(check).find(\'input.NOT_select_me\').eq(0).is(\':checked\')){'+"\n"+
             '			jQuery(check).remove();'+"\n"+
             '		}'+"\n"+
             '	});'+"\n"+
             '	if(jQuery(\'#null_tag\').length==0){'+"\n"+
             '		var go = \'<div style="color:#999933;" id="null_tag" tag="null_tag">\'+'+"\n"+
             '				 \'<input type="checkbox" alt="" class="select_me" id="tag_checkbox_null"/>\'+'+"\n"+
             '				 \'<label for="tag_checkbox_null"> POSTS without tags </label>\'+'+"\n"+
             '				 \'<input type="checkbox" alt="" class="NOT_select_me" id="tag_checkbox_NOT_null_tag"/>\'+'+"\n"+
             '				 \'<label for="tag_checkbox_NOT_null_tag" class="NOT_select_me">not this</label>\'+'+"\n"+
             '				 \'</div>\';'+"\n"+
             '		jQuery(\'#tagsel\').append(go);'+"\n"+
             '	}'+"\n"+
             '	if(jQuery(\'#no_tag\').length==0){'+"\n"+
             '		var go = window.return_check_box_for_(\'quote\')+'+"\n"+
             '				 window.return_check_box_for_(\'link\')+'+"\n"+
             '				 window.return_check_box_for_(\'audio\')+'+"\n"+
             '				 window.return_check_box_for_(\'video\')+'+"\n"+
             '				 window.return_check_box_for_(\'note\')+'+"\n"+
             '				 window.return_check_box_for_(\'conversation\')+'+"\n"+
             '				 window.return_check_box_for_(\'regular\')+ '+"\n"+
             '				 window.return_check_box_for_(\'photo\')+'+"\n"+
             '				 \'<div style="color:#999933;" id="no_tag" tag="no_tag">\'+'+"\n"+
             '				 \'<input type="checkbox" alt="" class="select_me" id="tag_checkbox_null"/>\'+'+"\n"+
             '				 \'<label for="tag_checkbox_null"> POSTS without tags </label>\'+'+"\n"+
             '				 \'<input type="checkbox" alt="" class="NOT_select_me" id="tag_checkbox_NOT_no_tag"/>\'+'+"\n"+
             '				 \'<label for="tag_checkbox_NOT_no_tag" class="NOT_select_me">not ths</label>\'+'+"\n"+
             '				 \'</div>\';'+"\n"+
             '		jQuery(\'#shonly\').append(go);'+"\n"+
             '	}'+"\n"+
             '	window.uniq(all_tags.sort(window.case_i)).forEach(function(tag, level){'+"\n"+
             '		var x_times = 0;'+"\n"+
             '		all_tags.forEach(function(already){'+"\n"+
             '			if(tag == already)'+"\n"+
             '				x_times++;'+"\n"+
             '		});'+"\n"+
             '		if(tag!=null){'+"\n"+
             '			quick_id++;'+"\n"+
             '			if(jQuery(\'#\'+tag.replace(/\\W/g,\'_\')).length==0 && x_times>window.no_less_than_tag){'+"\n"+
             '				var go = \'<div id="\'+tag.replace(/\\W/g,\'_\')+\'" tag="\'+tag+\'">\'+'+"\n"+
             '						 \'<input type="checkbox" class="select_me" alt="\' + tag.replace(/"/g, \'\') + \'" id="tag_checkbox_\' + quick_id + \'"/>\'+'+"\n"+
             '						 \'<label for="tag_checkbox_\' + quick_id + \'">\' + tag + \'</label>\'+'+"\n"+
             '						 \'<input type="checkbox" alt="\' + tag.replace(/"/g, \'\') + \'" class="NOT_select_me" id="tag_checkbox_NOT_\' + quick_id + \'"/>\'+'+"\n"+
             '						 \'<label for="tag_checkbox_NOT_\' + quick_id + \'" class="NOT_select_me">not this</label>\'+'+"\n"+
             '						 \'</div>\';'+"\n"+
             '				if(jQuery(\'#select_by_tag_widget\').is(\':visible\'))'+"\n"+
             '					jQuery(\'#tagsel\').append(go);'+"\n"+
             '				if(jQuery(\'#show_only_widget\').is(\':visible\'))'+"\n"+
             '					jQuery(\'#shonly\').append(go);'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '	});'+"\n"+
             '	jQuery(\'#shonly div\').each(function(i,check){'+"\n"+
             '		jQuery(check).bind("click", function(){window.new_show_these_selected = false; window.just_clicked_select_tags = true});'+"\n"+
             '	});'+"\n"+
             '	jQuery(\'#tagsel div\').each(function(i,check){'+"\n"+
             '		jQuery(check).bind("click", function(){window.just_clicked_select_tags = true});'+"\n"+
             '	});'+"\n"+
             '}';
var source2 ='window.no_less_than_x = function(){'+"\n"+
             '	x = parseInt(jQuery(\'#less_than_x\').val());'+"\n"+
             '	if(!isNaN(x) && window.no_less_than_tag != x){'+"\n"+
             '		window.no_less_than_tag = x;'+"\n"+
             '		window.make_inline_tags();'+"\n"+
             '		jQuery(\'#less_than_x\').attr(\'value\', x);'+"\n"+
             '	}else{'+"\n"+
             '		window.no_less_than_tag = 0;'+"\n"+
             '		window.make_inline_tags();'+"\n"+
             '		jQuery(\'#less_than_x\').attr(\'value\', \'\');'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'window.tag_widget_show = function(){'+"\n"+
             '	if(jQuery(\'#less_than_x\')!=null){'+"\n"+
             '		jQuery(\'#less_than_x\').parent().remove();'+"\n"+
             '	}'+"\n"+
             '	jQuery(\'#select_by_tag_widget\').append(\'<div style="position: absolute; left: 165px; bottom: 38px; font-size: 12px; font-weight: normal; width: 100px;" \'+'+"\n"+
             '									 \'title="Hide tags that only occur less than a certain number of times.">\'+'+"\n"+
             '									 \'Hide &lt;X<input type="text" class="chrome" style="width:40px;height:20px;float:none;" id="less_than_x" value="0"></div>\');'+"\n"+
             '	jQuery(\'#less_than_x\').bind(\'keyup\', window.no_less_than_x);'+"\n"+
             '	window.no_less_than_tag = 0;'+"\n"+
             '	window.just_clicked_select_tags = true;'+"\n"+
             '	jQuery(\'#select_by_tag_widget\').show();'+"\n"+
             '	jQuery(\'#tagsel\').scrollTop(0);'+"\n"+
             '	window.make_inline_tags();'+"\n"+
             '}'+"\n"+
             'window.show_only_widget_show = function(){'+"\n"+
             '	if(jQuery(\'#less_than_x\')!=null){'+"\n"+
             '		jQuery(\'#less_than_x\').parent().remove();'+"\n"+
             '	}'+"\n"+
             '	jQuery(\'#show_only_widget\').append(\'<div style="position: absolute; left: 165px; bottom: 38px; font-size: 12px; font-weight: normal; width: 100px;" \'+'+"\n"+
             '								 \'title="Hide tags that only occur less than a certain number of times.">\'+'+"\n"+
             '								 \'Hide &lt;X<input type="text" class="chrome" style="width:40px;height:20px;float:none;" id="less_than_x" value="0"></div>\');'+"\n"+
             '	jQuery(\'#less_than_x\').bind(\'keyup\', window.no_less_than_x);'+"\n"+
             '	window.no_less_than_tag = 0;'+"\n"+
             '	window.just_clicked_select_tags = true;'+"\n"+
             '	jQuery(\'#show_only_widget\').show();'+"\n"+
             '	jQuery(\'#shonly\').scrollTop(0);'+"\n"+
             '	window.make_inline_tags();'+"\n"+
             '}'+"\n"+
             'window.me_bg = function(el){'+"\n"+
             '	var o = jQuery(el).parent().parent();'+"\n"+
             '	if(jQuery(o).attr(\'disabled\')==\'true\')'+"\n"+
             '		return;'+"\n"+
             '	var group = jQuery(o).attr(\'id\').match(/(date|time)/)[1];'+"\n"+
             '	jQuery(\'#bd_same_\'+group).css({\'backgroundColor\':\'\'});'+"\n"+
             '	jQuery(\'#bd_two_\'+group).css({\'backgroundColor\':\'\'});'+"\n"+
             '	jQuery(\'#bd_one_\'+group).css({\'backgroundColor\':\'\'});'+"\n"+
             '	jQuery(o).css({\'backgroundColor\':\'#c0c0dc\'});'+"\n"+
             '}'+"\n"+
             'window.s_d = function(re, i, size){'+"\n"+
             '	if(re==\'month\'||re==\'date\'||re==\'year\'){'+"\n"+
             '		var month1 = parseInt(jQuery(\'#two_month_1\').val())-1;'+"\n"+
             '		var year1 = parseInt(jQuery(\'#two_year_1\').val());'+"\n"+
             '		var date1 = parseInt(jQuery(\'#two_date_1\').val());'+"\n"+
             '		var month2 = parseInt(jQuery(\'#two_month_2\').val())-1;'+"\n"+
             '		var year2 = parseInt(jQuery(\'#two_year_2\').val());'+"\n"+
             '		var date2 = parseInt(jQuery(\'#two_date_2\').val());'+"\n"+
             '		var milliseconds1 = Date.parse(new Date(year1, month1, date1));'+"\n"+
             '		var milliseconds2 = Date.parse(new Date(year2, month2, date2));'+"\n"+
             '		var bw = (milliseconds1 > milliseconds2);'+"\n"+
             '		var milliseconds_between = (bw)? milliseconds1 - milliseconds2 : milliseconds2 - milliseconds1;'+"\n"+
             '		var portion = Math.round(milliseconds_between/(size-1));'+"\n"+
             '		var ts = (bw)? milliseconds2 + portion*i : milliseconds1 + portion*i;'+"\n"+
             '		return (re==\'month\')? new Date(ts).getMonth()+1: (re==\'date\')? new Date(ts).getDate(): (re==\'year\')? new Date(ts).getFullYear(): \'\';'+"\n"+
             '	}else if(re==\'time\'){'+"\n"+
             '		var hour1 = parseInt(jQuery(\'#two_hour_1\').val())+((jQuery(\'#pm_option_2\').is(\':checked\'))?12:0);'+"\n"+
             '		var hour2 = parseInt(jQuery(\'#two_hour_2\').val())+((jQuery(\'#pm_option_3\').is(\':checked\'))?12:0);'+"\n"+
             '		if(hour1==12||hour1==24)'+"\n"+
             '			hour1-=12;'+"\n"+
             '		if(hour2==12||hour2==24)'+"\n"+
             '			hour2-=12;'+"\n"+
             '		var min1 = parseInt(jQuery(\'#two_minute_1\').val());'+"\n"+
             '		var min2 = parseInt(jQuery(\'#two_minute_2\').val());'+"\n"+
             '		var minutes1 = (hour1*60)+min1;'+"\n"+
             '		var minutes2 = (hour2*60)+min2;'+"\n"+
             '		var bw = (minutes1>minutes2);'+"\n"+
             '		var minutes_between = (bw)? minutes1-minutes2: minutes2-minutes1;'+"\n"+
             '		var portion = Math.round(minutes_between/(size-1));'+"\n"+
             '		var nt = new Date(0, 0, 0, 0, ((bw)? minutes2+portion*i: minutes1+portion*i));'+"\n"+
             '		var pm = (nt.getHours() > 12)'+"\n"+
             '		return ((pm)? nt.getHours()-12: ((nt.getHours()==0)?12:nt.getHours()))+":"+((nt.getMinutes()<10)?\'0\'+nt.getMinutes():nt.getMinutes())+((pm)?\'pm\':\'am\');'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'window.backdate_selected = function(){'+"\n"+
             '	var d = (jQuery(\'#no_date_option\').is(\':checked\'))? 0 : (jQuery(\'#one_date_option\').is(\':checked\'))? 1 : (jQuery(\'#two_date_option\').is(\':checked\'))? 2 : 0;'+"\n"+
             '	var t = (jQuery(\'#no_time_option\').is(\':checked\'))? 0 : (jQuery(\'#one_time_option\').is(\':checked\'))? 1 : (jQuery(\'#two_time_option\').is(\':checked\'))? 2 : 0;'+"\n"+
             '	var hl = jQuery(\'.highlighted\');'+"\n"+
             '	for(var i=0; i<hl.length; i++){'+"\n"+
             '		var dt = parseInt(jQuery(hl).eq(i).attr(\'class\').replace(/\\D/g,\'\'))*1000+(1000*60); //tumblr timestamp is 1 min off'+"\n"+
             '		var time_sub = "";'+"\n"+
             '		if(d==0)'+"\n"+
             '			time_sub += window.month_array[new Date(dt).getMonth()+1]+" "+(new Date(dt).getDate())+", "+(new Date(dt).getFullYear());'+"\n"+
             '		else if(d==1)'+"\n"+
             '			time_sub += window.month_array[parseInt(jQuery(\'#one_month\').val())]+" "+jQuery(\'#one_date\').val()+", "+jQuery(\'#one_year\').val();'+"\n"+
             '		else if(d==2)'+"\n"+
             '			time_sub += window.month_array[window.s_d(\'month\', i, hl.length)]+" "+window.s_d(\'date\', i, hl.length)+", "+window.s_d(\'year\', i, hl.length);'+"\n"+
             '		time_sub += " ";'+"\n"+
             '		if(t==0)'+"\n"+
             '			time_sub += ((new Date(dt).getHours()>12)?new Date(dt).getHours()-12:new Date(dt).getHours()+((new Date(dt).getHours()==0)?12:0))+'+"\n"+
             '							":"+((new Date(dt).getMinutes()<10)?\'0\'+new Date(dt).getMinutes():new Date(dt).getMinutes())+'+"\n"+
             '							((new Date(dt).getHours()>12)?\'pm\':\'am\');'+"\n"+
             '		else if(t==1)'+"\n"+
             '			time_sub += jQuery(\'#one_hour\').val()+\':\'+jQuery(\'#one_minute\').val()+((jQuery(\'#am_option\').is(\':checked\'))?\'am\':\'pm\');'+"\n"+
             '		else if(t==2)'+"\n"+
             '			time_sub += window.s_d(\'time\', i, hl.length);'+"\n"+
             '		var postID = jQuery(hl[i]).attr(\'id\').replace(/[^\\d]+/g,\'\');'+"\n"+
             '		window.fetch_edit_submit(postID, [\'post[date]\', time_sub], function(id){'+"\n"+
             '			jQuery(\'#post_\'+id).attr(\'title\',\'Backdated. \'+time_sub+\' Reload to place in proper order.\');'+"\n"+
             '			jQuery(\'#post_\'+id).addClass( \'backdated\');'+"\n"+
             '			if(jQuery("#backdate_reload").attr("disabled")=="disabled"){'+"\n"+
             '				jQuery("#backdate_reload").removeAttr("disabled");'+"\n"+
             '				jQuery("#backdate_reload").bind("click", function(){document.location = document.location+\'\'});'+"\n"+
             '			}'+"\n"+
             '		});'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'window.caption_selected = function(x){'+"\n"+
             '	if(x != \'two\' && x != \'three\') return false;'+"\n"+
             '	var hl = jQuery(\'.highlighted.photo\');'+"\n"+
             '	for(var i=0; i<hl.length; i++){'+"\n"+
             '		var postID = jQuery(hl[i]).attr(\'id\').replace(/[^\\d]+/g,\'\');'+"\n"+
             '		window.fetch_edit_submit(postID, [\'post[\'+x+\']\', ((x==\'three\')? jQuery("#clickthru_option").val(): jQuery("#caption_option").val())], function(id){'+"\n"+
             '			jQuery(\'#post_\'+id).removeClass(\'photo_on\');'+"\n"+
             '			window.setTimeout(function(){'+"\n"+
             '				jQuery(\'#post_\'+id).addClass(\'photo_on\');'+"\n"+
             '			}, 1000);'+"\n"+
             '		});'+"\n"+
             '	};'+"\n"+
             '}'+"\n"+
             'window.make_selected_private = function(){'+"\n"+
             '	var prive = window.privy;'+"\n"+
             '	var hl = jQuery(\'.highlighted\');'+"\n"+
             '	for(var i=0; i<hl.length; i++){'+"\n"+
             '	var postID = jQuery(hl[i]).attr(\'id\').replace(/[^\\d]+/g,\'\');'+"\n"+
             '		window.fetch_edit_submit(postID, [\'post[state]\', ((prive)? \'"private"\':\'"0"\')], function(id){'+"\n"+
             '			var ol = (jQuery(\'#post_\'+id).find(\'.private_overlay\').length>0);'+"\n"+
             '			if(!ol && prive){'+"\n"+
             '				jQuery(\'#post_\'+id).find(\'.overlay\').eq(0).before(\'<div class="private_overlay"></div>\');'+"\n"+
             '			}else if(ol && !prive){'+"\n"+
             '				jQuery(\'#post_\'+id).find(\'.private_overlay\').eq(0).remove();'+"\n"+
             '			}'+"\n"+
             '			window.select_count(0);'+"\n"+
             '		});'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'window.make_republishable_draft = function(){'+"\n"+
             '	var prive = window.privy;'+"\n"+
             '	var hl = jQuery(\'.highlighted\');'+"\n"+
             '	for(var i=0; i<hl.length; i++){'+"\n"+
             '	var postID = jQuery(hl[i]).attr(\'id\').replace(/[^\\d]+/g,\'\');'+"\n"+
             '		window.fetch_edit_submit(postID, [\'post[state]\', \'"1"\'], function(id){'+"\n"+
             '			jQuery(\'#post_\'+id).remove();'+"\n"+
             '			window.build_columns(true);'+"\n"+
             '		});'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'window.photo_widget_show = function(){'+"\n"+
             '	jQuery(\'#photo_widget\').show();'+"\n"+
             '	jQuery(\'.highlighted.photo\').addClass(\'photo_on\');'+"\n"+
             '}'+"\n"+
             'window.backdate_widget_show = function(){'+"\n"+
             '	var d2 = (jQuery(\'.highlighted\').length>0)?'+"\n"+
             '				parseInt(jQuery(\'.highlighted\').eq(jQuery(\'.highlighted\').length-1).attr(\'class\').replace(/\\D/g,\'\'))*1000+(1000*60):'+"\n"+
             '				new Date().getTime();'+"\n"+
             '	var d1 = (jQuery(\'.highlighted\').length>0)?'+"\n"+
             '				parseInt(jQuery(\'.highlighted\').eq(0).attr(\'class\').replace(/[^\\d]+/g, \'\'))*1000+(1000*60):'+"\n"+
             '				new Date().getTime();'+"\n"+
             '	var pm1 = (new Date(d1).getHours() > 12);'+"\n"+
             '	var pm2 = (new Date(d2).getHours() > 12);'+"\n"+
             '	jQuery(\'#one_month\').attr(\'value\', new Date(d1).getMonth()+1);'+"\n"+
             '	jQuery(\'#one_year\').attr(\'value\', new Date(d1).getFullYear());'+"\n"+
             '	jQuery(\'#one_date\').attr(\'value\', new Date(d1).getDate());'+"\n"+
             '	jQuery(\'#two_month_1\').attr(\'value\', new Date(d1).getMonth()+1);'+"\n"+
             '	jQuery(\'#two_year_1\').attr(\'value\', new Date(d1).getFullYear());'+"\n"+
             '	jQuery(\'#two_date_1\').attr(\'value\', new Date(d1).getDate());'+"\n"+
             '	jQuery(\'#two_month_2\').attr(\'value\', new Date(d2).getMonth()+1);'+"\n"+
             '	jQuery(\'#two_year_2\').attr(\'value\', new Date(d2).getFullYear());'+"\n"+
             '	jQuery(\'#two_date_2\').attr(\'value\', new Date(d2).getDate());'+"\n"+
             '	jQuery(\'#year_count_1\').html(new Date().getFullYear());'+"\n"+
             '	jQuery(\'#year_count_2\').html(new Date().getFullYear());'+"\n"+
             '	jQuery(\'#year_count_3\').html(new Date().getFullYear());'+"\n"+
             '	jQuery(\'#one_hour\').attr(\'value\', (pm1)? new Date(d1).getHours()-12 : new Date(d1).getHours() +((new Date(d1).getHours()==0)?12:0));'+"\n"+
             '	jQuery(\'#one_minute\').attr(\'value\', ((new Date(d1).getMinutes()<10)?\'0\'+new Date(d1).getMinutes():new Date(d1).getMinutes()));'+"\n"+
             '	jQuery(\'#two_hour_1\').attr(\'value\', (pm1)? new Date(d1).getHours()-12 : new Date(d1).getHours()+((new Date(d1).getHours()==0)?12:0));'+"\n"+
             '	jQuery(\'#two_minute_1\').attr(\'value\', ((new Date(d1).getMinutes()<10)?\'0\'+new Date(d1).getMinutes():new Date(d1).getMinutes()));'+"\n"+
             '	jQuery(\'#two_hour_2\').attr(\'value\', (pm2)? new Date(d2).getHours()-12 : new Date(d2).getHours()+((new Date(d2).getHours()==0)?12:0));'+"\n"+
             '	jQuery(\'#two_minute_2\').attr(\'value\', ((new Date(d2).getMinutes()<10)?\'0\'+new Date(d2).getMinutes():new Date(d2).getMinutes()));'+"\n"+
             '	if(pm1){'+"\n"+
             '		jQuery(\'#am_option\').removeAttr(\'checked\');'+"\n"+
             '		jQuery(\'#am_option_2\').removeAttr(\'checked\');'+"\n"+
             '		jQuery(\'#pm_option\').attr(\'checked\',\'checked\');'+"\n"+
             '		jQuery(\'#pm_option_2\').attr(\'checked\',\'checked\');'+"\n"+
             '	}else{'+"\n"+
             '		jQuery(\'#pm_option\').removeAttr(\'checked\');'+"\n"+
             '		jQuery(\'#pm_option_2\').removeAttr(\'checked\');'+"\n"+
             '		jQuery(\'#am_option\').attr(\'checked\',\'checked\');'+"\n"+
             '		jQuery(\'#am_option_2\').attr(\'checked\',\'checked\');'+"\n"+
             '	}'+"\n"+
             '	if(pm2){'+"\n"+
             '		jQuery(\'#am_option_3\').removeAttr(\'checked\');'+"\n"+
             '		jQuery(\'#pm_option_3\').attr(\'checked\',\'checked\');'+"\n"+
             '	}else{'+"\n"+
             '		jQuery(\'#pm_option_3\').removeAttr(\'checked\');'+"\n"+
             '		jQuery(\'#am_option_3\').attr(\'checked\',\'checked\');'+"\n"+
             '	}'+"\n"+
             '	'+"\n"+
             '	if(jQuery(\'.highlighted\').length==0){'+"\n"+
             '		jQuery(\'#bd_one_date\').css({\'color\':\'#999\'});'+"\n"+
             '		jQuery(\'#bd_one_time\').css({\'color\':\'#999\'});'+"\n"+
             '		jQuery(\'#bd_one_date\').attr({\'disabled\':\'true\'});'+"\n"+
             '		jQuery(\'#bd_one_time\').attr({\'disabled\':\'true\'});'+"\n"+
             '		jQuery(\'#bd_one_date\').find(\'input\').each(function(i,input){'+"\n"+
             '			jQuery(input).attr(\'disabled\',\'disabled\');'+"\n"+
             '		});'+"\n"+
             '		jQuery(\'#bd_one_time\').find(\'input\').each(function(i,input){'+"\n"+
             '			jQuery(input).attr(\'disabled\',\'disabled\');'+"\n"+
             '		});'+"\n"+
             '	}else{'+"\n"+
             '		jQuery(\'#bd_one_date\').css({\'color\':\'#555\'});'+"\n"+
             '		jQuery(\'#bd_one_time\').css({\'color\':\'#555\'});'+"\n"+
             '		jQuery(\'#bd_one_date\').removeAttr(\'disabled\');'+"\n"+
             '		jQuery(\'#bd_one_time\').removeAttr(\'disabled\');'+"\n"+
             '		jQuery(\'#bd_one_date\').find(\'input\').each(function(i,input){'+"\n"+
             '			jQuery(input).removeAttr(\'disabled\');'+"\n"+
             '		});'+"\n"+
             '		jQuery(\'#bd_one_time\').find(\'input\').each(function(i,input){'+"\n"+
             '			jQuery(input).removeAttr(\'disabled\');'+"\n"+
             '		});'+"\n"+
             '	}'+"\n"+
             '	if(jQuery(\'.highlighted\').length<=1){'+"\n"+
             '		jQuery(\'#bd_two_date\').css({\'color\':\'#999\'});'+"\n"+
             '		jQuery(\'#bd_two_date\').find(\'input\').each(function(i,input){'+"\n"+
             '			jQuery(input).attr(\'disabled\',\'disabled\');'+"\n"+
             '		});'+"\n"+
             '		jQuery(\'#bd_two_time\').css({\'color\':\'#999\'});'+"\n"+
             '		jQuery(\'#bd_two_time\').find(\'input\').each(function(i,input){'+"\n"+
             '			jQuery(input).attr(\'disabled\',\'disabled\');'+"\n"+
             '		});'+"\n"+
             '		jQuery(\'#bd_two_date\').attr({\'disabled\':\'true\'});'+"\n"+
             '		jQuery(\'#bd_two_time\').attr({\'disabled\':\'true\'});'+"\n"+
             '	}else{'+"\n"+
             '		jQuery(\'#bd_two_date\').css({\'color\':\'#555\'});'+"\n"+
             '		jQuery(\'#bd_two_date\').find(\'input\').each(function(i,input){'+"\n"+
             '			jQuery(input).removeAttr(\'disabled\');'+"\n"+
             '		});'+"\n"+
             '		jQuery(\'#bd_two_time\').css({\'color\':\'#555\'});'+"\n"+
             '		jQuery(\'#bd_two_time\').find(\'input\').each(function(i,input){'+"\n"+
             '			jQuery(input).removeAttr(\'disabled\');'+"\n"+
             '		});'+"\n"+
             '		jQuery(\'#bd_two_date\').removeAttr(\'disabled\');'+"\n"+
             '		jQuery(\'#bd_two_time\').removeAttr(\'disabled\');'+"\n"+
             '	}'+"\n"+
             '	window.show_days_in_month();'+"\n"+
             '	window.just_clicked_select_tags = true;'+"\n"+
             '	jQuery(\'#backdate_widget\').show();'+"\n"+
             '}'+"\n"+
             'window.show_days_in_month = function(){'+"\n"+
             '	jQuery(\'#date_count_1\').html('+"\n"+
             '		new Date(parseInt(jQuery(\'#one_year\').val()), parseInt(jQuery(\'#one_month\').val()), 0).getDate()'+"\n"+
             '	);'+"\n"+
             '	jQuery(\'#date_count_2\').html('+"\n"+
             '		new Date(parseInt(jQuery(\'#two_year_1\').val()), parseInt(jQuery(\'#two_month_1\').val()), 0).getDate()'+"\n"+
             '	);'+"\n"+
             '	jQuery(\'#date_count_3\').html('+"\n"+
             '		new Date(parseInt(jQuery(\'#two_year_2\').val()), parseInt(jQuery(\'#two_month_2\').val()), 0).getDate()'+"\n"+
             '	);'+"\n"+
             '}'+"\n"+
             'window.stop_blasting_top = function(b4, div){'+"\n"+
             '	if(jQuery(\'#shonly div\').eq(b4).length==0) return false;'+"\n"+
             '	if(!jQuery(\'#shonly div\').eq(b4).find(\'input.select_me\').eq(0).is(\':checked\')'+"\n"+
             '	&& !jQuery(\'#shonly div\').eq(b4).find(\'input.NOT_select_me\').eq(0).is(\':checked\')){'+"\n"+
             '		jQuery(\'#shonly div\').eq(b4).before(div);'+"\n"+
             '	}else{'+"\n"+
             '		window.stop_blasting_top(b4+1, div);'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'window.make_has_tagged = function(te){'+"\n"+
             '	var t = escape(te).toLowerCase().replace(/[-\\/\\\\^$*+?.()|[\\]{}]/g, \'\\\\$&\');'+"\n"+
             '	var cma = escape(\',\');'+"\n"+
             '	var ht = new RegExp(\'(^\'+t+\'$|^\'+t+cma+\'|\'+cma+t+cma+\'|\'+cma+t+\'$)\',\'i\');'+"\n"+
             '	return ht;'+"\n"+
             '}'+"\n"+
             'window.max_tag_selected = 0;'+"\n"+
             'window.select_these_tags = function(){'+"\n"+
             '	var check_to_select = new Array(); var not_to_select = new Array();'+"\n"+
             '	jQuery(\'#tagsel input\').each(function(i,check){'+"\n"+
             '		if(jQuery(check).is(\':checked\') && jQuery(check).hasClass(\'select_me\')){'+"\n"+
             '			check_to_select.push(jQuery(check).parent().attr(\'tag\'));'+"\n"+
             '			jQuery(\'#tagsel div\').eq(0).before(jQuery(check).parent());'+"\n"+
             '		}'+"\n"+
             '		if(jQuery(check).is(\':checked\') && jQuery(check).hasClass(\'NOT_select_me\')){'+"\n"+
             '			not_to_select.push(jQuery(check).parent().attr(\'tag\'));'+"\n"+
             '			jQuery(\'#tagsel div\').eq(0).before(jQuery(check).parent());'+"\n"+
             '		}'+"\n"+
             '	});'+"\n"+
             '	jQuery(\'#tagsel\').scrollTop(0);'+"\n"+
             '	jQuery(\'.highlighted\').each(function(i,hl){'+"\n"+
             '		if(jQuery(hl).hasClass(\'highlighted\')){'+"\n"+
             '			jQuery(hl).removeClass(\'highlighted\');'+"\n"+
             '			if(Array.isArray(window.get_selected_post_ids()))'+"\n"+
             '				window.select_count(-1);'+"\n"+
             '			'+"\n"+
             '		}'+"\n"+
             '	});'+"\n"+
             '	var brick = jQuery(\'.brick\');'+"\n"+
             '	for(var i=window.max_tag_selected; i<brick.length; i++){'+"\n"+
             '		var no_tag = (not_to_select.length==0)? 1: 0;'+"\n"+
             '		for(var c=0; c<not_to_select.length; c++){'+"\n"+
             '			var has_tagged = window.make_has_tagged(not_to_select[c]+\'\');'+"\n"+
             '			if((jQuery(brick[i]).find(\'input.itags\').eq(0).val()+\'\').length > 0'+"\n"+
             '			&& (jQuery(brick[i]).find(\'input.itags\').eq(0).val()+\'\').toLowerCase().match(has_tagged)==null'+"\n"+
             '			|| (jQuery(brick[i]).find(\'input.itags\').eq(0).val()+\'\').length == 0 && not_to_select[c]!=\'null_tag\'){'+"\n"+
             '				no_tag++;'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '		var yes_tag = (check_to_select.length==0)? 1: 0;'+"\n"+
             '		for(var c=0; c<check_to_select.length; c++){'+"\n"+
             '			var has_tagged = window.make_has_tagged(check_to_select[c]+\'\');'+"\n"+
             '			if((jQuery(brick[i]).find(\'input.itags\').eq(0).val()+\'\').toLowerCase().match(has_tagged)!=null'+"\n"+
             '			|| (jQuery(brick[i]).find(\'input.itags\').eq(0).val()+\'\').length == 0 && check_to_select[c]==\'null_tag\'){'+"\n"+
             '				yes_tag++;'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '		if(yes_tag!=0 && no_tag!=0){'+"\n"+
             '			if(!jQuery(brick[i]).hasClass(\'highlighted\') && jQuery(\'.highlighted\').length<100){'+"\n"+
             '				window.max_tag_selected++;'+"\n"+
             '				jQuery(brick[i]).addClass( \'highlighted\');'+"\n"+
             '				if(Array.isArray(window.get_selected_post_ids()))'+"\n"+
             '					window.select_count(1);'+"\n"+
             '			}'+"\n"+
             '		}else{'+"\n"+
             '			if(jQuery(brick[i]).hasClass(\'highlighted\')){'+"\n"+
             '				jQuery(brick[i]).removeClass( \'highlighted\');'+"\n"+
             '				if(Array.isArray(window.get_selected_post_ids()))'+"\n"+
             '					window.select_count(-1);				'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '	}'+"\n"+
             '	if(jQuery(\'.highlighted\').length==100){'+"\n"+
             '		jQuery("#sbt_confirm").html("Select 100 More");'+"\n"+
             '	}else{'+"\n"+
             '		jQuery("#sbt_confirm").html("Select By Tag");'+"\n"+
             '		window.max_tag_selected = 0;'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'window.show_only_these = function(all){'+"\n"+
             '	if(all==1){'+"\n"+
             '		jQuery(\'#shonly input.select_me\').each(function(i,check){'+"\n"+
             '			jQuery(check).parent().remove();'+"\n"+
             '		});'+"\n"+
             '		jQuery(\'.null_brick\').each(function(i,brick){'+"\n"+
             '			jQuery(brick).addClass( \'brick\');'+"\n"+
             '			jQuery(brick).removeClass( \'null_brick\');'+"\n"+
             '		});'+"\n"+
             '		window.new_show_these_selected = false;'+"\n"+
             '        window.build_columns(true);'+"\n"+
             '        window.make_inline_tags();'+"\n"+
             '		return;'+"\n"+
             '	}'+"\n"+
             '	var check_to_select = new Array(); var not_to_select = new Array();'+"\n"+
             '	var type_to_select = new Array(); var not_type_select = new Array();'+"\n"+
             '	jQuery(\'#shonly input\').each(function(i,check){'+"\n"+
             '		if(jQuery(check).is(\':checked\') && jQuery(check).hasClass(\'select_me\')){'+"\n"+
             '			if(jQuery(check).parent().attr(\'tag\')!=null)'+"\n"+
             '				check_to_select.push(jQuery(check).parent().attr(\'tag\'));'+"\n"+
             '			else'+"\n"+
             '				type_to_select.push(jQuery(check).attr(\'data-type\'));'+"\n"+
             '			window.stop_blasting_top(0, jQuery(check).parent());'+"\n"+
             '			jQuery(\'#shonly\').scrollTop(0);'+"\n"+
             '		}'+"\n"+
             '		if(jQuery(check).is(\':checked\') && jQuery(check).hasClass(\'NOT_select_me\')){'+"\n"+
             '			if(jQuery(check).parent().attr(\'tag\')!=null)'+"\n"+
             '				not_to_select.push(jQuery(check).parent().attr(\'tag\'));'+"\n"+
             '			else'+"\n"+
             '				not_type_select.push(jQuery(check).attr(\'data-type\'));'+"\n"+
             '			window.stop_blasting_top(0, jQuery(check).parent());'+"\n"+
             '			jQuery(\'#shonly\').scrollTop(0);'+"\n"+
             '		}'+"\n"+
             '	});'+"\n"+
             '	var brick = jQuery(\'.brick_to_show\');'+"\n"+
             '	for(var i=window.max_tag_selected; i<brick.length; i++){'+"\n"+
             '		var no_tag = (not_to_select.length==0)? 1: 0;'+"\n"+
             '		for(var c=0; c<not_to_select.length; c++){'+"\n"+
             '			var has_tagged = window.make_has_tagged(not_to_select[c]+\'\');'+"\n"+
             '			if((jQuery(brick[i]).find(\'input.itags\').eq(0).val()+\'\').length > 0'+"\n"+
             '			&& (jQuery(brick[i]).find(\'input.itags\').eq(0).val()+\'\').toLowerCase().match(has_tagged)==null'+"\n"+
             '			|| (jQuery(brick[i]).find(\'input.itags\').eq(0).val()+\'\').length == 0 && not_to_select[c]!=\'no_tag\'){'+"\n"+
             '				no_tag++;'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '		var yes_tag = (check_to_select.length==0)? 1: 0;'+"\n"+
             '		for(var c=0; c<check_to_select.length; c++){'+"\n"+
             '			var has_tagged = window.make_has_tagged(check_to_select[c]+\'\');'+"\n"+
             '			if((jQuery(brick[i]).find(\'input.itags\').eq(0).val()+\'\').toLowerCase().match(has_tagged)!=null'+"\n"+
             '			|| (jQuery(brick[i]).find(\'input.itags\').eq(0).val()+\'\').length == 0 && check_to_select[c]==\'no_tag\'){'+"\n"+
             '				yes_tag++;'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '		var no_type = (not_type_select.length==0)? 1: 0;'+"\n"+
             '		for(var c=0; c<not_type_select.length; c++){'+"\n"+
             '			if(!jQuery(brick[i]).hasClass(not_type_select[c]+\'\')){'+"\n"+
             '				no_type++;'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '		var yes_type = (type_to_select.length==0)? 1: 0;'+"\n"+
             '		for(var c=0; c<type_to_select.length; c++){'+"\n"+
             '			if(jQuery(brick[i]).hasClass(type_to_select[c]+\'\')){'+"\n"+
             '				yes_type++;'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '		if(yes_tag!=0 && no_tag!=0 && no_type!=0 && yes_type!=0){'+"\n"+
             '			if(jQuery(brick[i]).hasClass(\'null_brick\')){'+"\n"+
             '				jQuery(brick[i]).removeClass( \'null_brick\');'+"\n"+
             '			}'+"\n"+
             '			if(!jQuery(brick[i]).hasClass(\'brick\')){'+"\n"+
             '				jQuery(brick[i]).addClass( \'brick\');'+"\n"+
             '			}'+"\n"+
             '		}else{'+"\n"+
             '			if(jQuery(brick[i]).hasClass(\'brick\')){'+"\n"+
             '				jQuery(brick[i]).removeClass( \'brick\');'+"\n"+
             '			}'+"\n"+
             '			if(!jQuery(brick[i]).hasClass(\'null_brick\')){'+"\n"+
             '				jQuery(brick[i]).addClass( \'null_brick\');'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '	}'+"\n"+
             '	window.new_show_these_selected = true;'+"\n"+
             '	window.build_columns(true);'+"\n"+
             '	window.make_inline_tags();'+"\n"+
             '}'+"\n"+
             'var select_by_tag_widget = jQuery(\'<div></div>)\');'+"\n"+
             'jQuery(select_by_tag_widget).attr({id: \'select_by_tag_widget\'});'+"\n"+
             'var seltags = jQuery(\'<div></div>)\');'+"\n"+
             'jQuery(seltags).css({font:"normal 11px \'Lucida Grande\',Verdana,sans-serif", width:\'460px\', position:\'absolute\', left:\'20px\', top:\'19px\', height:\'523px\', overflow:\'auto\', color:\'#555\'});'+"\n"+
             'jQuery(seltags).attr({id:\'tagsel\'});'+"\n"+
             'jQuery(select_by_tag_widget).bind("mousedown", function(event){'+"\n"+
             '	window.just_clicked_select_tags = true;'+"\n"+
             '});'+"\n"+
             'jQuery(select_by_tag_widget).append(seltags);'+"\n"+
             'jQuery(select_by_tag_widget).hide();'+"\n"+
             'jQuery(select_by_tag_widget).append(\'<div style="position:absolute; left:21px; bottom:38px;">\'+'+"\n"+
             '							\'<button type="button" class="chrome" onclick="window.select_these_tags()">\'+'+"\n"+
             '							\'<div class="chrome_button"><div class="chrome_button_left"></div><span id="sbt_confirm">Select By Tag</span>\'+'+"\n"+
             '							\'<div class="chrome_button_right"></div></div></button></div>\');'+"\n"+
             'jQuery(select_by_tag_widget).append(\'<div style="position:absolute; right:21px; bottom:38px;">\'+'+"\n"+
             '							\'<button type="button" class="chrome" onclick="jQuery(\\\'#select_by_tag_widget\\\').hide();">\'+'+"\n"+
             '							\'<div class="chrome_button"><div class="chrome_button_left"></div><span>Cancel</span>\'+'+"\n"+
             '							\'<div class="chrome_button_right"></div></div></button></div>\');'+"\n"+
             'var show_only_widget = jQuery(\'<div></div>)\');'+"\n"+
             'jQuery(show_only_widget).attr({id: \'show_only_widget\'});'+"\n"+
             'var shonly = jQuery(\'<div></div>)\');'+"\n"+
             'jQuery(shonly).css({font:"normal 11px \'Lucida Grande\',Verdana,sans-serif", width:\'460px\', position:\'absolute\', left:\'20px\', top:\'19px\', height:\'523px\', overflow:\'auto\', color:\'#555\'});'+"\n"+
             'jQuery(shonly).attr({id:\'shonly\'});'+"\n"+
             'jQuery(show_only_widget).bind("mousedown", function(event){'+"\n"+
             '	window.just_clicked_select_tags = true;'+"\n"+
             '});'+"\n"+
             'jQuery(show_only_widget).append(shonly);'+"\n"+
             'jQuery(show_only_widget).hide();'+"\n"+
             'jQuery(show_only_widget).append(\'<div style="position:absolute; left:21px; bottom:38px;">\'+'+"\n"+
             '						\'<button type="button" class="chrome" onclick="window.show_only_these(0)">\'+'+"\n"+
             '						\'<div class="chrome_button"><div class="chrome_button_left"></div><span>Show Only</span>\'+'+"\n"+
             '						\'<div class="chrome_button_right"></div></div></button></div>\');'+"\n"+
             'jQuery(show_only_widget).append(\'<div style="position:absolute; left:115px; bottom:38px;">\'+'+"\n"+
             '						\'<button type="button" class="chrome" onclick="window.show_only_these(1);">\'+'+"\n"+
             '						\'<div class="chrome_button"><div class="chrome_button_left"></div><span id="sho_all">All</span>\'+'+"\n"+
             '						\'<div class="chrome_button_right"></div></div></button></div>\');'+"\n"+
             'jQuery(show_only_widget).append(\'<div style="position:absolute; right:21px; bottom:38px;">\'+'+"\n"+
             '						\'<button type="button" class="chrome" onclick="jQuery(\\\'#show_only_widget\\\').hide();">\'+'+"\n"+
             '						\'<div class="chrome_button"><div class="chrome_button_left"></div><span>Cancel</span>\'+'+"\n"+
             '						\'<div class="chrome_button_right"></div></div></button></div>\');'+"\n"+
             'var backdate_widget = jQuery(\'<div></div>)\');'+"\n"+
             'jQuery(backdate_widget).attr({id: \'backdate_widget\'});'+"\n"+
             'var BD_body = jQuery(\'<div></div>)\');'+"\n"+
             'jQuery(BD_body).css({font:"normal 11px \'Lucida Grande\',Verdana,sans-serif", width:\'460px\', position:\'absolute\', left:\'20px\', top:\'19px\', height:\'523px\', overflow:\'auto\', color:\'#555\'});'+"\n"+
             'jQuery(BD_body).attr({id:\'BD_body\'});'+"\n"+
             'jQuery(BD_body).append(\'<div>Mass Backdate Options</div>\'+'+"\n"+
             '			   \'<div>dates and times must be logical</div><div>(no future dates or false dates, ie: Feb 33, \'+(new Date().getFullYear()+1)+\')</div><div>or else it will cause errors</div>\'+'+"\n"+
             '			   \'<div>&nbsp;</div><div>&nbsp;</div>\'+'+"\n"+
             '			   \'<div id="bd_same_date" style="background-color:#c0c0dc;">\'+'+"\n"+
             '			   \'<div><label for="no_date_option" onclick="window.me_bg(this);"><input type="radio" id="no_date_option" name="date_option" checked="checked" />Leave Date Alone</label></div>\'+'+"\n"+
             '			   \'</div>\'+'+"\n"+
             '			   \'<div id="bd_one_date">\'+'+"\n"+
             '			   \'<div><label for="one_date_option" onclick="window.me_bg(this);"><input type="radio" id="one_date_option" name="date_option" />One Date Only</label></div>\'+'+"\n"+
             '			   \'<div>Month (1-12)<input class="bd_input" type="text" id="one_month" />Day (1-<span id="date_count_1">31</span>)<input type="text" class="bd_input" id="one_date" />\'+'+"\n"+
             '			   \'Year (0-<span id="year_count_1">31</span>)<input class="bd_input" type="text" id="one_year" /></div>\'+'+"\n"+
             '			   \'</div><div id="bd_two_date">\'+'+"\n"+
             '			   \'<div><label for="two_date_option" onclick="window.me_bg(this);"><input type="radio" id="two_date_option" name="date_option" />Between Days</label></div>\'+'+"\n"+
             '			   \'<div>Month (1-12)<input class="bd_input" type="text" id="two_month_1" />Day (1-<span id="date_count_2">31</span>)<input type="text" class="bd_input" id="two_date_1" />\'+'+"\n"+
             '			   \'Year (0-<span id="year_count_2">31</span>)<input class="bd_input" type="text" id="two_year_1" /></div>\'+'+"\n"+
             '			   \'<div>Month (1-12)<input class="bd_input" type="text" id="two_month_2" />Day (1-<span id="date_count_3">31</span>)<input type="text" class="bd_input" id="two_date_2" />\'+'+"\n"+
             '			   \'Year (0-<span id="year_count_3">31</span>)<input class="bd_input" type="text" id="two_year_2" /></div>\'+'+"\n"+
             '			   \'</div>\'+'+"\n"+
             '			   \'<div id="bd_same_time" style="background-color:#c0c0dc;">\'+'+"\n"+
             '			   \'<div><label for="no_time_option" onclick="window.me_bg(this);"><input type="radio" id="no_time_option" name="time_option" checked="checked" />Leave Time Alone</label></div>\'+'+"\n"+
             '			   \'</div>\'+'+"\n"+
             '			   \'<div id="bd_one_time">\'+'+"\n"+
             '			   \'<div><label for="one_time_option" onclick="window.me_bg(this);"><input type="radio" id="one_time_option" name="time_option" />One Time Only</label></div>\'+'+"\n"+
             '			   \'<div style="float:right;margin-right: 130px;"><input type="radio" id="am_option" name="ampm_option" checked="checked"/><label for="am_option">AM</label>\'+'+"\n"+
             '			   \'<input type="radio" id="pm_option" name="ampm_option" /><label for="pm_option">PM</label></div>\'+'+"\n"+
             '			   \'<div>Hour (1-12)<input class="bd_input" type="text" id="one_hour" />:<input type="text" class="bd_input" id="one_minute" />Minute (1-59)</div>\'+'+"\n"+
             '			   \'</div><div id="bd_two_time">\'+'+"\n"+
             '			   \'<div><label for="two_time_option" onclick="window.me_bg(this);"><input type="radio" id="two_time_option" name="time_option" />Between Time</label></div>\'+'+"\n"+
             '			   \'<div style="float:right;margin-right: 130px;"><input type="radio" id="am_option_2" name="ampm_option_2" checked="checked"/><label for="am_option_2">AM</label>\'+'+"\n"+
             '			   \'<input type="radio" id="pm_option_2" name="ampm_option_2" /><label for="pm_option_2">PM</label></div>\'+'+"\n"+
             '			   \'<div>Hour (1-12)<input class="bd_input" type="text" id="two_hour_1" />:<input type="text" class="bd_input" id="two_minute_1" />Minute (1-59)</div>\'+'+"\n"+
             '			   \'<div style="float:right;margin-right: 130px;"><input type="radio" id="am_option_3" name="ampm_option_3" checked="checked"/><label for="am_option_3">AM</label>\'+'+"\n"+
             '			   \'<input type="radio" id="pm_option_3" name="ampm_option_3" /><label for="pm_option_3">PM</label></div>\'+'+"\n"+
             '			   \'<div>Hour (1-12)<input class="bd_input" type="text" id="two_hour_2" />:<input type="text" class="bd_input" id="two_minute_2" />Minute (1-59)</div>\'+'+"\n"+
             '			   \'</div>\');'+"\n"+
             'var photo_widget = jQuery(\'<div></div>)\');'+"\n"+
             'jQuery(photo_widget).attr({id: \'photo_widget\'});'+"\n"+
             'jQuery(photo_widget).css({position:\'fixed\', zIndex: \'15000\', top:\'33px\', right: \'400px\', width:\'490px\', height:\'603px\',padding: \'8px 9px\','+"\n"+
             '					background:"url(\'"+new_widget_bg+"\') no-repeat scroll left top transparent",'+"\n"+
             '					font: "font: 11px \'Lucida Grande\',Verdana,sans-serif;",'+"\n"+
             '					cursor: \'default\'});'+"\n"+
             'jQuery(photo_widget).append(\'<div style="position:absolute; left:21px; bottom:38px; width:460px;">\'+'+"\n"+
             '					\'<hr/>Caption for selected photos (HTML enabled)\'+'+"\n"+
             '					\'<textarea style="display:block;width:440px;height:300px;" id="caption_option"></textarea>\'+'+"\n"+
             '					\'<button type="button" class="chrome" onclick="window.caption_selected(\\\'two\\\');">\'+'+"\n"+
             '					\'<div class="chrome_button"><div class="chrome_button_left"></div><span>Caption Selected</span>\'+'+"\n"+
             '					\'<div class="chrome_button_right"></div></div></button></div>\');'+"\n"+
             'jQuery(photo_widget).append(\'<div style="position:absolute; left:21px; top:20px; width:460px;">\'+'+"\n"+
             '					\'These options are only effective on photo posts (highlighted in yellow).<br/><hr/><br/>\'+'+"\n"+
             '					\'Clickthrough-Link for selected photos\'+'+"\n"+
             '					\'<input style="display:block;width:440px;" type="text" id="clickthru_option"/>\'+'+"\n"+
             '					\'<button type="button" class="chrome" onclick="window.caption_selected(\\\'three\\\');" style="display:block;">\'+'+"\n"+
             '					\'<div class="chrome_button"><div class="chrome_button_left"></div><span>Clickthrough-Link Selected</span>\'+'+"\n"+
             '					\'<div class="chrome_button_right"></div></div></button></div>\');'+"\n"+
             'jQuery(photo_widget).append(\'<div style="position:absolute; right:21px; bottom:38px;">\'+'+"\n"+
             '					\'<button type="button" class="chrome" onclick="jQuery(\\\'#photo_widget\\\').hide();jQuery(\\\'.photo_on\\\').removeClass(\\\'photo_on\\\');">\'+'+"\n"+
             '					\'<div class="chrome_button"><div class="chrome_button_left"></div><span>Cancel</span>\'+'+"\n"+
             '					\'<div class="chrome_button_right"></div></div></button></div>\');'+"\n"+
             'jQuery(backdate_widget).bind("mousedown", function(event){'+"\n"+
             '	window.just_clicked_select_tags = true;'+"\n"+
             '});'+"\n"+
             'jQuery(photo_widget).bind("mousedown", function(event){'+"\n"+
             '	window.just_clicked_select_tags = true;'+"\n"+
             '});'+"\n"+
             'jQuery(backdate_widget).append(BD_body);'+"\n"+
             'jQuery(backdate_widget).hide();'+"\n"+
             'jQuery(photo_widget).hide();'+"\n"+
             'jQuery(backdate_widget).append(\'<div style="position:absolute; left:21px; bottom:38px;">\'+'+"\n"+
             '						\'<button type="button" class="chrome" onclick="window.backdate_selected();">\'+'+"\n"+
             '						\'<div class="chrome_button"><div class="chrome_button_left"></div><span>Backdate Selected</span>\'+'+"\n"+
             '						\'<div class="chrome_button_right"></div></div></button></div>\');'+"\n"+
             'jQuery(backdate_widget).append(\'<div style="position:absolute; left:230px; bottom:38px;">\'+'+"\n"+
             '						\'<button type="button" class="chrome" disabled="disabled" id="backdate_reload">\'+'+"\n"+
             '						\'<div class="chrome_button"><div class="chrome_button_left"></div><span>Sort (Reload)</span>\'+'+"\n"+
             '						\'<div class="chrome_button_right"></div></div></button></div>\');'+"\n"+
             'jQuery(backdate_widget).append(\'<div style="position:absolute; right:21px; bottom:38px;">\'+'+"\n"+
             '						\'<button type="button" class="chrome" onclick="jQuery(\\\'#backdate_widget\\\').hide();">\'+'+"\n"+
             '						\'<div class="chrome_button"><div class="chrome_button_left"></div><span>Cancel</span>\'+'+"\n"+
             '						\'<div class="chrome_button_right"></div></div></button></div>\');'+"\n"+
             'var select_by_tag_button = jQuery(\'<div></div>)\');'+"\n"+
             'jQuery(select_by_tag_button).addClass(\'header_button\');'+"\n"+
             'jQuery(select_by_tag_button).attr({title:\'Select By Tag (limit:100)\', id:\'sbt\'});'+"\n"+
             'jQuery(select_by_tag_button).html(\'<button type="button" class="chrome big_dark"><div class="chrome_button">\'+'+"\n"+
             '					 		\'<div class="chrome_button_left"></div>Select By Tag<div class="chrome_button_right"></div></div></button>\');'+"\n"+
             'var show_only_button = jQuery(\'<div></div>)\');'+"\n"+
             'jQuery(show_only_button).addClass(\'header_button\');'+"\n"+
             'jQuery(show_only_button).attr({title:\'Show Only Certain Posts\', id:\'sho\'});'+"\n"+
             'jQuery(show_only_button).html(\'<button type="button" class="chrome big_dark"><div class="chrome_button">\'+'+"\n"+
             '					 	\'<div class="chrome_button_left"></div>Show Only<div class="chrome_button_right"></div></div></button>\');'+"\n"+
             'window.main_page = true;'+"\n"+
             'var pause_play = jQuery(\'<div></div>)\');'+"\n"+
             'jQuery(pause_play).addClass(\'header_button\');'+"\n"+
             'jQuery(pause_play).attr({title:\'Halt/Continue Loading, if taking to long...\', id:\'halt\'});'+"\n"+
             'jQuery(pause_play).html(\'<button type="button" class="chrome big_dark"><div class="chrome_button">\'+'+"\n"+
             '				  \'<div class="chrome_button_left"></div><span style="color:#000;">▌▌</span><span style="color:#999;">►</span><div class="chrome_button_right"></div></div></button>\');'+"\n"+
             'var backdate_button = jQuery(\'<div></div>)\');'+"\n"+
             'jQuery(backdate_button).addClass(\'header_button\');'+"\n"+
             'jQuery(backdate_button).attr({title:\'Mass Backdate Options\',id:\'bdb\'});'+"\n"+
             'jQuery(backdate_button).html(\'<button class="chrome big_dark" type="button"><div class="chrome_button">\'+'+"\n"+
             '					   \'<div class="chrome_button_left"></div>₢<div class="chrome_button_right"></div></div></button>\');'+"\n"+
             'var photo_button = jQuery(\'<div></div>)\');'+"\n"+
             'jQuery(photo_button).addClass(\'header_button\');'+"\n"+
             'jQuery(photo_button).attr({title:\'Mass Caption and Clickthrough-link of selected photo posts.\',id:\'pob\'});'+"\n"+
             'jQuery(photo_button).html(\'<button class="chrome big_dark" type="button"><div class="chrome_button">\'+'+"\n"+
             '					   \'<div class="chrome_button_left"></div>Capt./Link<div class="chrome_button_right"></div></div></button>\');'+"\n"+
             'var private_button = jQuery(\'<div></div>)\');'+"\n"+
             'jQuery(private_button).addClass(\'header_button\');'+"\n"+
             'jQuery(private_button).attr({title:\'Make Selected Private\',id:\'prvt\'});'+"\n"+
             'jQuery(private_button).html(\'<button class="chrome big_dark" type="button" onclick="window.make_selected_private();"><div class="chrome_button">\'+'+"\n"+
             '					   \'<div class="chrome_button_left"></div><span class="prvt">PRIVATE</span><div class="chrome_button_right"></div></div></button>\');'+"\n"+
             'jQuery(window.nav).after(select_by_tag_widget);'+"\n"+
             'jQuery(window.nav).after(photo_widget);'+"\n"+
             'jQuery(window.nav).after(show_only_widget);'+"\n"+
             'jQuery(window.nav).after(backdate_widget);'+"\n"+
             'select_all.after(select_by_tag_button);'+"\n"+
             'select_by_tag_button.after(show_only_button);'+"\n"+
             'show_only_button.after(pause_play);'+"\n"+
             'jQuery(\'#halt\').before(private_button);'+"\n"+
             'jQuery(\'#halt\').before(photo_button);'+"\n"+
             'jQuery(\'#halt\').before(backdate_button);'+"\n"+
             'jQuery(\'#one_month\').bind(\'keyup\', window.show_days_in_month);'+"\n"+
             'jQuery(\'#two_month_1\').bind(\'keyup\', window.show_days_in_month);'+"\n"+
             'jQuery(\'#two_month_2\').bind(\'keyup\', window.show_days_in_month);'+"\n"+
             'window.halts = function(){'+"\n"+
             '	if(window.main_page){'+"\n"+
             '		if(window.next_page){'+"\n"+
             '			window.paused=true;'+"\n"+
             '			jQuery(\'#loading\').find(\'span\').eq(0).html(\'Paused...\');'+"\n"+
             '			window.next_page = false;'+"\n"+
             '			jQuery(\'#halt\').find(\'span\').eq(1).css({\'color\':\'#000\'});'+"\n"+
             '			jQuery(\'#halt\').find(\'span\').eq(0).css({\'color\':\'#999\'});'+"\n"+
             '		}else{'+"\n"+
             '			window.paused=false;'+"\n"+
             '			jQuery(\'#loading\').find(\'span\').eq(0).html(\'Loading...\');'+"\n"+
             '			jQuery(\'#halt\').find(\'span\').eq(0).css({\'color\':\'#000\'});'+"\n"+
             '			jQuery(\'#halt\').find(\'span\').eq(1).css({\'color\':\'#999\'});'+"\n"+
             '			window.next_page = true;'+"\n"+
             '			new PeriodicalExecuter(window.auto_paginator, 0.2);'+"\n"+
             '			new PeriodicalExecuter(window.get_data_for_tagsel, 3);'+"\n"+
             '		}	'+"\n"+
             '	}else{'+"\n"+
             '		if(!window.paused){'+"\n"+
             '			window.paused=true;'+"\n"+
             '			jQuery(\'#loading\').find(\'span\').eq(0).html(\'Paused...\');'+"\n"+
             '			jQuery(\'#halt\').find(\'span\').eq(1).css({\'color\':\'#000\'});'+"\n"+
             '			jQuery(\'#halt\').find(\'span\').eq(0).css({\'color\':\'#999\'});'+"\n"+
             '		}else{'+"\n"+
             '			window.paused=false;'+"\n"+
             '			jQuery(\'#loading\').find(\'span\').eq(0).html(\'Loading...\');'+"\n"+
             '			jQuery(\'#halt\').find(\'span\').eq(0).css({\'color\':\'#000\'});'+"\n"+
             '			jQuery(\'#halt\').find(\'span\').eq(1).css({\'color\':\'#999\'});'+"\n"+
             '			window.q_grab();	'+"\n"+
             '		}'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'jQuery(\'#halt\').bind("click", window.halts);'+"\n"+
             'jQuery(\'#sbt\').bind("click", window.tag_widget_show);'+"\n"+
             'jQuery(\'#sho\').bind("click", window.show_only_widget_show);'+"\n"+
             'jQuery(\'#bdb\').bind("click", window.backdate_widget_show);'+"\n"+
             'jQuery(\'#pob\').bind("click", window.photo_widget_show);'+"\n"+
             'jQuery(\'#backdate_widget\').children().each(function(i,el){'+"\n"+
             '	jQuery(el).bind("click", function(){'+"\n"+
             '		window.just_clicked_select_tags = true;'+"\n"+
             '	});'+"\n"+
             '});'+"\n"+
             'var to_publish = jQuery(\'<div></div>)\');'+"\n"+
             '	jQuery(to_publish).addClass(\'header_button\');'+"\n"+
             '	jQuery(to_publish).attr({title:\'Publish Selected\', id:\'toPublish\'});'+"\n"+
             '	jQuery(to_publish).html(\'<button type="button" class="chrome big_dark"><div class="chrome_button">\'+'+"\n"+
             '					  \'<div class="chrome_button_left"></div>Publish<div class="chrome_button_right"></div></div></button>\');		'+"\n"+
             'jQuery(\'#halt\').after(to_publish);'+"\n"+
             'jQuery(\'#toPublish\').hide();'+"\n"+
             'var to_queue = jQuery(\'<div></div>)\');'+"\n"+
             '	jQuery(to_queue).addClass(\'header_button\');'+"\n"+
             '	jQuery(to_queue).attr({title:\'Move selected drafts to your queue.\', id:\'toQueue\'});'+"\n"+
             '	jQuery(to_queue).html(\'<button type="button" class="chrome big_dark"><div class="chrome_button">\'+'+"\n"+
             '			\'<div class="chrome_button_left"></div>Queue Drafts<div class="chrome_button_right"></div></div></button>\');		'+"\n"+
             'var to_republish = jQuery(\'<div></div>)\');'+"\n"+
             '	jQuery(to_republish).addClass(\'header_button\');'+"\n"+
             '	jQuery(to_republish).attr({title:\'Make selected posts RePublish-able as Drafts.\', id:\'toRepublish\'});'+"\n"+
             '	jQuery(to_republish).html(\'<button type="button" class="chrome big_dark"><div class="chrome_button">\'+'+"\n"+
             '			\'<div class="chrome_button_left"></div>Re-As Draft<div class="chrome_button_right"></div></div></button>\');		'+"\n"+
             'jQuery(to_queue).bind("click", function(){'+"\n"+
             '	window.draft_queue_publish(true);'+"\n"+
             '});'+"\n"+
             'jQuery(to_publish).bind("click", function(){'+"\n"+
             '	window.draft_queue_publish(false);'+"\n"+
             '});'+"\n"+
             'jQuery(to_republish).bind("click", function(){'+"\n"+
             '	window.make_republishable_draft();'+"\n"+
             '});'+"\n"+
             'jQuery(\'#halt\').after(to_queue);'+"\n"+
             'jQuery(\'#halt\').after(to_republish);'+"\n"+
             'jQuery(\'#toQueue\').hide();'+"\n"+
             'jQuery(select_by_tag_widget).css({position:\'fixed\', zIndex: \'15000\', top:\'33px\', right: \'250px\', width:\'490px\', height:\'603px\',padding: \'8px 9px\','+"\n"+
             '							   background:"url(\'"+new_widget_bg+"\') no-repeat scroll left top transparent",'+"\n"+
             '							   font: \'bold 15px Arial,Helvetica,sans-serif\', cursor: \'default\'});'+"\n"+
             'jQuery(show_only_widget).css({position:\'fixed\', zIndex: \'15000\', top:\'33px\', right: \'350px\', width:\'490px\', height:\'603px\',padding: \'8px 9px\','+"\n"+
             '							   background:"url(\'"+new_widget_bg+"\') no-repeat scroll left top transparent",'+"\n"+
             '							   font: \'bold 15px Arial,Helvetica,sans-serif\', cursor: \'default\'});'+"\n"+
             'jQuery(backdate_widget).css({position:\'fixed\', zIndex: \'15000\', top:\'33px\', right: \'450px\', width:\'490px\', height:\'603px\',padding: \'8px 9px\','+"\n"+
             '							   background:"url(\'"+new_widget_bg+"\') no-repeat scroll left top transparent",'+"\n"+
             '							   font: \'bold 15px Arial,Helvetica,sans-serif\', cursor: \'default\'});'+"\n"+
             'window.massedit();'+"\n"+
             'jQuery(\'#remove_tags\').parent().attr(\'onclick\',\'return true;\');'+"\n"+
             'jQuery(jQuery(\'#remove_tags\').parent()).bind("click", function(event){window.get_tags_for_selected_queue_posts();});'+"\n"+
             'jQuery(\'#add_tag_button\').bind("click", window.add_tags_for_queue);'+"\n"+
             'jQuery(\'#remove_tag_button\').bind("click", window.remove_tags_for_queue);'+"\n"+
             '//cosmetic after thoughts'+"\n"+
             'jQuery(\'#content\').attr(\'unselectable\', \'on\').css(\'user-select\', \'none\').on(\'selectstart\', false);'+"\n"+
             'var custom_gutter = jQuery(\'<div></div>)\');'+"\n"+
             '	jQuery(custom_gutter).addClass(\'header_button\');'+"\n"+
             '	jQuery(custom_gutter).attr({title:\'Custom Gutter (type # or press up/down)\', onclick:"jQuery(\'#custom_gutter\').focus();"});'+"\n"+
             '	jQuery(custom_gutter).html(\'<button type="button" class="chrome big_dark" style="padding:0;"><div class="chrome_button">\'+'+"\n"+
             '			\'<div class="chrome_button_left"></div>\'+'+"\n"+
             '			\'<input type="text" value="gutter" title="custom gutter size" id="custom_gutter" class="chrome" \'+'+"\n"+
             '			\'onclick="this.focus();if(this.value==\\\'gutter\\\'){this.value=\\\'6\\\'}" \'+'+"\n"+
             '			\'style="width:50px;height:12px;font-weight:bold;font-family:monospace;border: 0px none ! important;margin-top:-1px;padding: 5px 0px;" />\'+'+"\n"+
             '			\'<div class="chrome_button_right"></div></div></button>\');'+"\n"+
             'window.way_too_big_to_animate = true;'+"\n"+
             'pause_play.after(custom_gutter);'+"\n"+
             'jQuery("#custom_gutter").bind(\'keyup\', function(e){'+"\n"+
             '	x = parseInt(jQuery(\'#custom_gutter\').val());'+"\n"+
             '	if(!isNaN(x) && e.keyCode!=38 && e.keyCode!=40){'+"\n"+
             '		window.column_gutter = x;'+"\n"+
             '		window.column_full_width = 125+x;'+"\n"+
             '		window.build_columns(true);'+"\n"+
             '		jQuery(\'#custom_gutter\').attr(\'value\', x);'+"\n"+
             '	}else if(!isNaN(x) && e.keyCode==40){'+"\n"+
             '		x-=10;'+"\n"+
             '		jQuery(\'#custom_gutter\').attr(\'value\', x);'+"\n"+
             '		window.column_gutter = x;'+"\n"+
             '		window.column_full_width = 125+x;'+"\n"+
             '		window.build_columns(true);'+"\n"+
             '	}else if(!isNaN(x) && e.keyCode==38){'+"\n"+
             '		x+=10;'+"\n"+
             '		jQuery(\'#custom_gutter\').attr(\'value\', x);'+"\n"+
             '		window.column_gutter = x;'+"\n"+
             '		window.column_full_width = 125+x;'+"\n"+
             '		window.build_columns(true);'+"\n"+
             '	}else{'+"\n"+
             '		x=6;'+"\n"+
             '		window.column_gutter = x;'+"\n"+
             '		window.column_full_width = 125+x;'+"\n"+
             '		window.build_columns(true);'+"\n"+
             '		jQuery(\'#custom_gutter\').attr(\'value\', x);'+"\n"+
             '	}'+"\n"+
             '});';
var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
var addthis = document.createTextNode(source);
script.appendChild(addthis);
document.body.appendChild(script);
var script2 = document.createElement('script');
script2.setAttribute("type", "application/javascript");
var addthis2 = document.createTextNode(source2);
script2.appendChild(addthis2);
document.body.appendChild(script2);