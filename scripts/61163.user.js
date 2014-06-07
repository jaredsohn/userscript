// ==UserScript==
// @name           TwittSeven Plus
// @namespace      http://userscripts.org/scripts/show/61163
// @description    Auto-refresh Twitter timeline, override Twitter's stupid keyboard shortcuts and many more enhancements.
// @version        5.12
// @author         sfufoet(http://blog.loland.net/)
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

//检查新版本的函数
/***********************************************
        Userscript Updater Generator
                        by ΙδεΠD
http://userscript-updater-generator.appspot.com
***********************************************/
var updater_61163 = {
    id:        "61163",
    name:      "TwittSeven Plus",
    uso_ver:   397350,
    version:   "5.12",
    interval:  12 * 3600 * 1000,
    lang:      "en",
    str:       {
        WithVer: {
            en: function(n, v) {return n+" "+v+" has been released.";},
            zh: function(n, v) {return n+"\u811A\u672C\u66F4\u65B0\u81F3"+v+"\u7248";}
        },
        NoVer: {
            en: function(n) {return "An update of "+n+" is available.";},
            zh: function(n) {return n+"\u811A\u672C\u6709\u66F4\u65B0\u7248\u672C";}
        },
        NoUpdate: {
            en: function(n) {return "No update of "+n+" found.";},
            zh: function(n) {return n+"\u811A\u672C\u6709\u66F4\u65B0\u7248\u672C";}
        },
        MenuItem: {
            en: function(n) {return "Check Update For "+n;},
            zh: function(n) {return "\u7ACB\u5373\u66F4\u65B0"+n+"\u811A\u672C";}
        }
    },
    compare:   function(ver1, ver2) {
        var arr1 = ver1.replace(/[^\d\.]/g, "").split("."); 
        var arr2 = ver2.replace(/[^\d\.]/g, "").split(".");
        do {
           var num1 = Number(arr1.shift());
           var num2 = Number(arr2.shift());
           if (num1 == num2)    continue;
           return num1 > num2;
        } while (arr1.length > 0 && arr2.length > 0);
        return arr1.length > 0;
    },
    check:     function(bAlert) {
        if (bAlert === undefined)    bAlert = true;
        GM_xmlhttpRequest({
            method: "GET",
            url:    "http://userscripts.org/scripts/source/61163.meta.js",
            onload: function(xhr) {
                var meta = xhr.responseText;
                var _uso_ver = meta.match(/\/\/\s*@version\s*(\S+)/);
                if (_uso_ver == null)   return;
                else    _uso_ver = Number(_uso_ver[1]);
                GM_setValue("lastCheck_61163", Date.now().toString());
                var root = updater_61163;
                if (_uso_ver > root.version) {
                    var _version = meta.match(/\/\/\s*@version\s*(\S+)/);
                    if (_version != null && root.version != "null" && root.compare(_version = _version[1], root.version)) {
                        var reason = meta.match(/\/\*\s*@reason([\s\S]*)@end\s*\*\//);
                        reason = (reason == null ? "" : "\n" + reason[1]);
                        alert(root.str.WithVer[root.lang](root.name, _version) + reason);
                    }
                    else    alert(root.str.NoVer[root.lang](root.name));
                    top.location.href = "http://userscripts.org/scripts/source/61163.user.js";
                } else if (bAlert)    alert(root.str.NoUpdate[root.lang](root.name));
            }
        });
    },
    start:     function() {
        if (navigator.appName == "Netscape")    this.lang = navigator.language; 
        else    this.lang = navigator.browserLanguage;
        if (this.lang.indexOf("zh") > -1)       this.lang = "zh";
        else    this.lang = "en";
        if (GM_registerMenuCommand)    GM_registerMenuCommand(this.str.MenuItem[this.lang](this.name), this.check);
        if (Date.now() - Number(GM_getValue("lastCheck_61163", 0)) > this.interval)    this.check(false);
    }
};
//检查更新
var selfLocation = self.location + '';
//if (selfLocation.match(/https?:\/\/twitter\.com(\/#!\/)?$/) != null && GM_xmlhttpRequest && GM_getValue && GM_setValue){
if (self.location == "http://twitter.com" || self.location == "https://twitter.com" || self.location == "http://twitter.com/#!/" || self.location == "https://twitter.com/#!/" && GM_xmlhttpRequest && GM_getValue && GM_setValue){
	console.log("check update");
	updater_61163.start();
}//结束检查新版本的函数

function twittSeven() {
	
		//-------------- Define Vars -------------------
	var hideRT = localStorage.getItem('hideRT') || 'false';
	var hideMute = localStorage.getItem('hideMute') || 'false';
	var hideEvernote = localStorage.getItem('hideEvernote') || 'false';
	var enableShortcuts = localStorage.getItem('enableShortcuts') || 'true';
	var enableAutoRefresh = localStorage.getItem('enableAutoRefresh') || 'true';
	var enableAutoScroll = localStorage.getItem('enableAutoScroll') || 'true';
	var checkMaxTimes = localStorage.getItem('checkMaxTimes') || 15;  // 最后访问点最多检测页数 (pages)
	var langTo = localStorage.getItem('langTo') || 'en';
	var remindTheTweet = localStorage.getItem('remindTheTweet') || 0;
	var hideActionBarTooltips = localStorage.getItem('hideActionBarTooltips') || 'true';
	var filteList = localStorage.getItem('filteList') || '';
	var exchangeUsernameAndFullname = localStorage.getItem('exchangeUsernameAndFullname') || 'true';

	var isGkeyPress = false;
	
	var interid, inReplyTimeId, stateTimeId, curScr;
	var delid = 0, lastid = 0, ts_unread = 0;
	var runfirst = true, lastview, runtimes = 1;
	var lastInReplyId = 0;
	var rpc_data = {};
	var edt = '<li class="action-reply-container"><a class="with-icn ts-edt" title="Edit" href="javascript:void 0;"><i></i><b><span>Edit</span></b></a></li>'
	var mut = '<li class="action-reply-container"><a class="with-icn ts-mute" title="Mute" href="javascript:void 0;"><i></i><b><span>Mute</span></b></a></li>'
	var ret = '<li class="action-reply-container"><a class="with-icn ts-ret" title="Quote Tweet" href="javascript:void 0;"><i></i><b><span>RT</span></b></a></li>'
	var tsl = '<li class="action-reply-container"><a class="with-icn ts-evernote" title="Evernote" href="javascript:void 0;"><i></i><b><span>Evernote</span></b></a></li>'
	//-------------- End define vars -------------------
	
	// @copyright      2009, 2010 James Campos
	// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
	// http://userscripts.org/topics/41177
	if (typeof GM_deleteValue == 'undefined') {
		GM_addStyle = function(css) {
			var style = document.createElement('style');
			style.textContent = css;
			document.getElementsByTagName('head')[0].appendChild(style);
		}

		GM_deleteValue = function(name) {
			localStorage.removeItem(name);
		}

		GM_getValue = function(name, defaultValue) {
			var value = localStorage.getItem(name);
			if (!value)
				return defaultValue;
			var type = value[0];
			value = value.substring(1);
			switch (type) {
				case 'b':
					return value == 'true';
				case 'n':
					return Number(value);
				default:
					return value;
			}
		}

		GM_log = function(message) {
			console.log(message);
		}

		 GM_registerMenuCommand = function(name, funk) {
		//todo
		}

		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			localStorage.setItem(name, value);
		}
	}
	
	//-------------- Define Functions -------------------
	
	// updateSetting()
	function updateSetting(){
		$("ul.ts_tab_menu li").removeClass("active");
		if(document.getElementById('hideRT').checked) hideRT = 'true'; else hideRT = 'false';
		if(document.getElementById('hideMute').checked) hideMute = 'true'; else hideMute = 'false';
		if(document.getElementById('hideActionBarTooltips').checked){
			hideActionBarTooltips = 'true';
		}else{
			hideActionBarTooltips = 'false';
		}
		if(document.getElementById('hideEvernote').checked) hideEvernote = 'true'; else hideEvernote = 'false';
		if(document.getElementById('enableShortcuts').checked) enableShortcuts = 'true'; else enableShortcuts = 'false';
		if(document.getElementById('enableAutoRefresh').checked) enableAutoRefresh = 'true'; else enableAutoRefresh = 'false';
		if(document.getElementById('enableAutoScroll').checked) enableAutoScroll = 'true'; else enableAutoScroll = 'false';
		if(document.getElementById('exchangeUsernameAndFullname').checked) exchangeUsernameAndFullname = 'true'; else exchangeUsernameAndFullname = 'false';
		checkMaxTimes = $('#checkMaxTimes').val();
		langTo = $('#langTo option:selected').val();
		remindTheTweet = $('#remindTheTweet').val();
		localStorage.setItem('hideRT', hideRT);
		localStorage.setItem('hideMute', hideMute);
		localStorage.setItem('hideEvernote', hideEvernote);
		localStorage.setItem('hideActionBarTooltips', hideActionBarTooltips);
		localStorage.setItem('enableShortcuts', enableShortcuts);
		localStorage.setItem('enableAutoRefresh', enableAutoRefresh);
		localStorage.setItem('enableAutoScroll', enableAutoScroll);
		localStorage.setItem('exchangeUsernameAndFullname', exchangeUsernameAndFullname);		
		localStorage.setItem('checkMaxTimes', checkMaxTimes);
		localStorage.setItem('langTo', langTo);
		localStorage.setItem('remindTheTweet', remindTheTweet);
	}// updateSetting()
	
	// setCookie()
	function setCookie(sName, sValue, iTime){
	    var date = new Date();
	    date.setTime(date.getTime()+iTime*1000);
	    document.cookie = escape(sName) + "=" + escape(sValue) + "; expires=" + date.toGMTString();
	} // end setCookie()

	// getCookie()
	function getCookie(sName){
	    var aCookie = document.cookie.split("; ");
	    for (var i=0; i <aCookie.length; i++){
	        var aCrumb = aCookie[i].split("=");
	        if (escape(sName) == aCrumb[0])
	            return unescape(aCrumb[1]);
	    }
	    return null;
	}	// end getCookie()
	
	// updateClass()
	function updateClass(){
		$('.LastTweet').removeClass('LastTweet');
		// 把时间线上的第一个推加上 LastTweet Class
		$('.js-stream-item:first').addClass('LastTweet');
		// 把时间线上的最后一个推加上 olddestTweet Class
		$('.olddestTweet').removeClass('olddestTweet');
		$('#stream-items-id .stream-item:last').addClass('olddestTweet');
	}// end updateClass()
	
	// 添加过滤关键词 addFilter()
	function addFilter(){
		var fltKeyword = $('#ts_add_filter').val().replace(/\s+$/g, '');
		
		if(fltKeyword.length > 0){
			var isDuplicate = false;
			if($('#ts_filter_list ol li').length == 0)
				$('#ts_filter_list').show();
			$('#ts_filter_list ol li span').each(function(){
				if($(this).html() === fltKeyword){
					//highlight animation http://www.neodream.info/blog/tag/jquery/
					if($('#effectSpan').html() == null){
						var effectSpan = $('<span id="effectSpan" style="position:relative;background-color:#ff9;z-index:10;font-weight:bold;"></span>').text(fltKeyword).css({ left: -$(this).width(), top: 0 });
	                	$(this).parent().append(effectSpan);
	                	effectSpan.delay(500).fadeOut(2000, function() {
		                    $(this).remove();
		                });
	                }
					$('#ts_add_filter').val("");
					isDuplicate = true;
					return false
				}
			});
			if(isDuplicate) return;
			//记录过滤列表到 localStorage 里面
			filteList = $('#ts_filter_list ol').html();
			$('#ts_filter_list ol').append('<li class="ts-filter-li"><label><input type="checkbox" checked class="ts_filter_item" id="ts_input"/> <span>' + fltKeyword + '</span></label><i class="ts_remove close"></i></li>');
			$('#ts_input').attr('checked', 'checked').removeAttr('id');
	    	localStorage.setItem('filteList', $('#ts_filter_list ol').html());
	    	
			//删除时间线上的东西
			$('.js-stream-item').each(function(){
				if($(this).find('.js-tweet-text').html() == null)
					return
				if($(this).find('.js-tweet-text').html().indexOf($('#ts_add_filter').val()) !== -1){
					$(this).remove();
				}
			});
			$('#ts_add_filter').val("");
			// updateClass();
			// //如果在首页，记录一下 lastid
			// if($('#global-nav-home').hasClass("active")){
			// 	lastid = getLastId();
			// 	//写入 Cookie
			// 	setCookie('ts_last', getLastId(), 60 * 60 * 24 * 15);
			// }

		}
	}	// end addFilter()
	
	// Mute()
	function Mute(){
		if($('.currenttweet .username b').html() == null)
			return
		var isMuted = false;
		$('.ts-mute-component').show();
		if($('#ts-mute a').length == 0)
			$('#ts-mute').append('<a href="javascript:void 0;" title="Unmute">' + $('.currenttweet .username b').html() + '</a> ');
		else
		{
			$('#ts-mute a').each(function(){
				if($(this).html()==$('.currenttweet .username b').html())
					isMuted = true;
			});
			if(!isMuted){
				$('#ts-mute').append('<a href="javascript:void 0;" title="Unmute">' + $('.currenttweet .username b').html() + '</a> ');
			}
		}
		$('#stream-items-id .stream-item').each(function(){
				var scrollTo = 0, currentTop = $(window).scrollTop();
				var ts_current_tweet=$(this);
				$('#ts-mute a').each(function(){
					if($(this).html()==ts_current_tweet.find('.username b').html()){
						if(ts_current_tweet.index() < $('#stream-items-id .stream-item').index($('div.currenttweet')))
							scrollTo = scrollTo + ts_current_tweet.outerHeight();
						ts_current_tweet.remove();
					}
				});
				$(window).scrollTop(currentTop - scrollTo);
			});
	} // end Mute()

	function gotoLastView(){
		if(runfirst == false || lastview == 0) return;
	    var cat = '#ts_ltv', gostatus = $('.stream-item[data-item-id|=' + lastview + ']');
	    runfirst = gostatus.length == 0 && runtimes < checkMaxTimes;
	    
	    if(runfirst)
	        	window.scrollTo(0, $(document).height());
	    else
	    {
	        gostatus.length > 0
	        	? $('<div id="ts_ltv" class="stream-item js-stream-item"><span class="meta">~~~~~~~ Last visit ~~~~~~~</span></div>').insertBefore(gostatus) 
	        	: cat = '.stream-item:last';
	        window.scrollTo(0, $(cat).offset().top - window.innerHeight + 60);
	    }
	    runtimes++;
	}

	function getLastId()
	{
	    return $('#stream-items-id .js-stream-item:first').attr('data-item-id');
	}

	function getTime(time)
	{
	    var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	    var d = new Date(time.replace(' +', 'GMT+'));
	    return d.getHours() + ':' + d.getMinutes() + ' ' + m[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
	}

	function checkUnread()
	{
	    ts_unread = $('.ts-unread').length;
	    document.title = (ts_unread > 0 ? '(' + ts_unread + ') ' : '') + document.title.replace(/\(\d+\)\s/g, '');
	}

	function resetDelid()
	{
	    delid = 0;
	}

	//-------------- End Define Functions -------------------
	
	ts_init();
	
	//-------------- ts_init() -------------------
	function ts_init(){
		$ = jQuery;
		//超载时自动重定向
		if (document.title.search(/Over capacity/i) != -1){
			if(location.href.search(/http:/i) != -1)
				location.href = location.href.replace(/http\:/, 'https:');
			if(location.href.search(/https:/i) != -1)
				location.href = location.href.replace(/https\:/, 'http:');
		}
		
		//来自 http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
		//控制光标位置
		$.fn.selectRange = function(start, end) {
		        return this.each(function() {
		                if(this.setSelectionRange) {
		                        this.focus();
		                        this.setSelectionRange(start, end);
		                } else if(this.createTextRange) {
		                        var range = this.createTextRange();
		                        range.collapse(true);
		                        range.moveEnd('character', end);
		                        range.moveStart('character', start);
		                        range.select();
		                }
		        });
		};
	    //来自 http://stackoverflow.com/questions/2897155/get-caret-position-within-an-text-input-field
		//获取光标位置
		$.fn.getCursorPosition = function() {
	        var pos = 0;
	        var input = $(this).get(0);
	        // IE Support
	        if (document.selection) {
	            input.focus();
	            var sel = document.selection.createRange();
	            var selLen = document.selection.createRange().text.length;
	            sel.moveStart('character', -input.value.length);
	            pos = sel.text.length - selLen;
	        }
	        // Firefox support
	        else if (input.selectionStart || input.selectionStart == '0')
	            pos = input.selectionStart;

	        return pos;
	    }
		
		//-------------- autoResize() -------------------
		//文本框自动改变大小 
		//http://james.padolsey.com/javascript/jquery-plugin-autoresize/
		$.fn.autoResize = function(options) {
	        // Just some abstracted details,
	        // to make plugin users happy:
	        var settings = $.extend({
	            onResize : function(){},
	            animate : true,
	            animateDuration : 150,
	            animateCallback : function(){},
	            extraSpace : 20,
	            limit: 1000
	        }, options);
	    
	    //http://stackoverflow.com/questions/1432111/how-to-write-onshow-event-using-javascript-jquery
	    //onShow 事件
		$.fn.extend({ 
		    onShow: function(callback, unbind){
		      return this.each(function(){
		        var obj = this;
		        var bindopt = (unbind==undefined)?true:unbind; 
		        if($.isFunction(callback)){
		          if($(this).is(':hidden')){
		            var checkVis = function(){
		              if($(obj).is(':visible')){
		                callback.call();
		                if(bindopt){
		                  $('body').unbind('click keyup keydown', checkVis);
		                }
		              }                         
		            }
		            $('body').bind('click keyup keydown', checkVis);
		          }
		          else{
		            callback.call();
		          }
		        }
		      });
		    }
		  });

	        // Only textarea's auto-resize:
	        this.filter('textarea').each(function(){
	            
	                // Get rid of scrollbars and disable WebKit resizing:
	            var textarea = $(this),
	            
	                // Cache original height, for use later:
	                origHeight = textarea.height(),
	                
	                // Need clone of textarea, hidden off screen:
	                clone = function(){
	                    
	                    // Properties which may effect space taken up by chracters:
	                    var props = ['height','width','lineHeight','textDecoration','letterSpacing'],
	                        propOb = {};
	                        
	                    // Create object of styles to apply:
	                    $.each(props, function(i, prop){
	                        propOb[prop] = textarea.css(prop);
	                    });
	                    if ($('#ts_autoresize').length != 1)
		                    $('<textarea id="ts_autoresize"></textarea>').css({resize:'none','overflow-y':'hidden'}).css({
		                        position: 'absolute',
		                        top: 0,
		                        left: -9999
		                    }).css(propOb).attr('tabIndex','-1').insertBefore(textarea);
	                },
	                lastScrollTop = null,
	                updateSize = function(e) {
						clone();
	                    // Prepare the clone:
	                    $('#ts_autoresize').height(0).val($(this).val()).scrollTop(10000);
						
	                    // Find the height of text:
	                    var scrollTop = Math.max($('#ts_autoresize').scrollTop(), origHeight) + settings.extraSpace,
	                        toChange = $(this);
							
	                    // Don't do anything if scrollTip hasen't changed:
	                    if (lastScrollTop === scrollTop) { return; }
	                    lastScrollTop = scrollTop;
						
	                    // Check for limit:
	                    if ( scrollTop >= settings.limit ) {
	                        $(this).css('overflow-y','');
	                        return;
	                    }
	                    // Fire off callback:
	                    settings.onResize.call(this);
						
	                    // Either animate or directly apply height:
	                    settings.animate && textarea.css('display') === 'block' ?
	                        toChange.stop().animate({height:scrollTop}, settings.animateDuration, settings.animateCallback)
	                        : toChange.height(scrollTop);
	                };
	            
	            // Bind namespaced handlers to appropriate events:
	            textarea
	                .unbind('.dynSiz')
	                .bind('keyup.dynSiz', updateSize)
	                .bind('keydown.dynSiz', updateSize)
	                .bind('change.dynSiz', updateSize)
	            	.bind('focus.dynSiz', updateSize);
	            
	        });
	        
	        // Chain:
	        return this;
	    };//-------------- end autoResize() -------------------
	    
	    lastview = getCookie('ts_last') || 0;
	    
	    // 杀掉 twitter 的垃圾快捷键！
	    twttr.components.Page.prototype.onkeypress = function () {};
	    addShortcuts();
	    
//	    twttr.app.waitForSignal("init", function () {
//			window.scrollTo(0, $('.stream-item:last').offset().top - window.innerHeight);
//        });
	    
	    customCSS() && customUI() && newTweets() && bindEvents();

		$(window).load(function() {
			var intervalId = setInterval(function() {
				checkUnread();
			}, 50);
		});
			
		//如果在首页，记录一下 lastid
		if($('#global-nav-home').hasClass("active")){
			lastid = getLastId();
			//写入 Cookie
			setCookie('ts_last', getLastId(), 60 * 60 * 24 * 15);
		}
	    
	}//-------------- end ts_init() -------------------
	
	//-------------- addShortcuts() -------------------
	function addShortcuts(){
			
		/**
		 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
		 * Version : 2.01.B
		 * By Binny V A
		 * License : BSD
		 */
		shortcut = {
			'all_shortcuts':{},//All the shortcuts are stored in this array
			'add': function(shortcut_combination,callback,opt) {
				//Provide a set of default options
				var default_options = {
					'type':'keydown',
					'propagate':false,
					'disable_in_input':true,
					'target':document,
					'keycode':false
				}
				if(!opt) opt = default_options;
				else {
					for(var dfo in default_options) {
						if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
					}
				}

				var ele = opt.target;
				if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
				var ths = this;
				shortcut_combination = shortcut_combination.toLowerCase();

				//The function to be called at keypress
				var func = function(e) {
					e = e || window.event;
					
					if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
						var element;
						if(e.target) element=e.target;
						else if(e.srcElement) element=e.srcElement;
						if(element.nodeType==3) element=element.parentNode;
						if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA' || element.tagName == 'SELECT') return;
					}
			
					//Find Which key is pressed
					if (e.keyCode) code = e.keyCode;
					else if (e.which) code = e.which;
					var character = String.fromCharCode(code).toLowerCase();
					
					if(code == 188) character=","; //If the user presses , when the type is onkeydown
					if(code == 190) character="."; //If the user presses , when the type is onkeydown

					var keys = shortcut_combination.split("+");
					//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
					var kp = 0;
					
					//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
					var shift_nums = {
						"`":"~",
						"1":"!",
						"2":"@",
						"3":"#",
						"4":"$",
						"5":"%",
						"6":"^",
						"7":"&",
						"8":"*",
						"9":"(",
						"0":")",
						"-":"_",
						"=":"+",
						";":":",
						"'":"\"",
						",":"<",
						".":">",
						"/":"?",
						"\\":"|"
					}
					//Special Keys - and their codes
					var special_keys = {
						'esc':27,
						'escape':27,
						'tab':9,
						'space':32,
						'return':13,
						'enter':13,
						'backspace':8,
			
						'scrolllock':145,
						'scroll_lock':145,
						'scroll':145,
						'capslock':20,
						'caps_lock':20,
						'caps':20,
						'numlock':144,
						'num_lock':144,
						'num':144,
						
						'pause':19,
						'break':19,
						
						'insert':45,
						'home':36,
						'delete':46,
						'end':35,
						
						'pageup':33,
						'page_up':33,
						'pu':33,
			
						'pagedown':34,
						'page_down':34,
						'pd':34,
			
						'left':37,
						'up':38,
						'right':39,
						'down':40,
			
						'f1':112,
						'f2':113,
						'f3':114,
						'f4':115,
						'f5':116,
						'f6':117,
						'f7':118,
						'f8':119,
						'f9':120,
						'f10':121,
						'f11':122,
						'f12':123
					}
			
					var modifiers = { 
						shift: { wanted:false, pressed:false},
						ctrl : { wanted:false, pressed:false},
						alt  : { wanted:false, pressed:false},
						meta : { wanted:false, pressed:false}	//Meta is Mac specific
					};
		                        
					if(e.ctrlKey)	modifiers.ctrl.pressed = true;
					if(e.shiftKey)	modifiers.shift.pressed = true;
					if(e.altKey)	modifiers.alt.pressed = true;
					if(e.metaKey)   modifiers.meta.pressed = true;
		                        
					for(var i=0; k=keys[i],i<keys.length; i++) {
						//Modifiers
						if(k == 'ctrl' || k == 'control') {
							kp++;
							modifiers.ctrl.wanted = true;

						} else if(k == 'shift') {
							kp++;
							modifiers.shift.wanted = true;

						} else if(k == 'alt') {
							kp++;
							modifiers.alt.wanted = true;
						} else if(k == 'meta') {
							kp++;
							modifiers.meta.wanted = true;
						} else if(k.length > 1) { //If it is a special key
							if(special_keys[k] == code) kp++;
							
						} else if(opt['keycode']) {
							if(opt['keycode'] == code) kp++;

						} else { //The special keys did not match
							if(character == k) kp++;
							else {
								if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
									character = shift_nums[character]; 
									if(character == k) kp++;
								}
							}
						}
					}
					
					if(kp == keys.length && 
								modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
								modifiers.shift.pressed == modifiers.shift.wanted &&
								modifiers.alt.pressed == modifiers.alt.wanted &&
								modifiers.meta.pressed == modifiers.meta.wanted) {
						callback(e);
			
						if(!opt['propagate']) { //Stop the event
							//e.cancelBubble is supported by IE - this will kill the bubbling process.
							e.cancelBubble = true;
							e.returnValue = false;
			
							//e.stopPropagation works in Firefox.
							if (e.stopPropagation) {
								e.stopPropagation();
								e.preventDefault();
							}
							return false;
						}
					}
				}
				this.all_shortcuts[shortcut_combination] = {
					'callback':func, 
					'target':ele, 
					'event': opt['type']
				};
				//Attach the function with the event
				if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
				else if(ele.attachEvent) ele.attachEvent('on' +opt['type'], func);
				else ele['on' +opt['type']] = func;
			},

			//Remove the shortcut - just specify the shortcut and I will remove the binding
			'remove':function(shortcut_combination) {
				shortcut_combination = shortcut_combination.toLowerCase();
				var binding = this.all_shortcuts[shortcut_combination];
				delete(this.all_shortcuts[shortcut_combination])
				if(!binding) return;
				var type = binding['event'];
				var ele = binding['target'];
				var callback = binding['callback'];

				if(ele.detachEvent) ele.detachEvent('on' +type, callback);
				else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
				else ele['on' +type] = false;
			}
		}
		// 如果按下 G，就把 isGkeyPress 赋值为 true
		shortcut.add("G",function() {
			isGkeyPress = true;
    		setTimeout(function(){
				isGkeyPress = false;
			}, 1200);
		});

		//回复
		shortcut.add("R",function() {
			$(".currenttweet .js-action-reply").trigger('click');
		});
		//RT
		shortcut.add("Shift+R",function() {
			$(".currenttweet .ts-ret").trigger('mousedown').trigger('mouseup');
		});
		//收藏，加星
		shortcut.add("S",function() {
			if (isGkeyPress)
				isGkeyPress = false;
			else
				$(".currenttweet .js-toggle-fav").trigger('click');
		});
		//选中下一个推
		shortcut.add("J",function() {
			if($('.currenttweet').html() == null){
				$('.stream-item:first').addClass('currenttweet');
				return
			}
			if (!$('.currenttweet').is(":last-child")) {
				var cheight=$('.currenttweet').outerHeight();
				$('.currenttweet').removeClass('currenttweet').next("div").trigger("mouseenter").addClass('currenttweet');
				$(window).scrollTop($(window).scrollTop() + cheight);
				if($('.currenttweet').hasClass('ts-unread'))
				{
					$('.currenttweet').removeClass('ts-unread');
					ts_unread--;
					checkUnread();
				}
			}
			// 选中的当前推如果是展开状态就添加 ts-open
			$('.ts-open').removeClass('ts-open');
			if($('.currenttweet').hasClass("open"))
				$('.currenttweet').addClass('ts-open');

		});
		//选中上一个推
		shortcut.add("K",function() {

			if($('.currenttweet').html() == null){
				$('.stream-item:first').addClass('currenttweet');
				return
			}
			if (!$('.currenttweet').is(":first-child")) {
				var cheight=$('.currenttweet').outerHeight();
				$('.currenttweet').removeClass('currenttweet').prev("div").trigger("mouseenter").addClass('currenttweet');
				$(window).scrollTop($(window).scrollTop() - cheight);
				if($('.currenttweet').hasClass('ts-unread'))
				{
					$('.currenttweet').removeClass('ts-unread');
					ts_unread--;
					checkUnread();
				}
			}
			// 选中的当前推如果是展开状态就添加 ts-open
			$('.ts-open').removeClass('ts-open');
			if($('.currenttweet').hasClass("open"))
				$('.currenttweet').addClass('ts-open');
			

		});
		//DM 当前，比 twitter 自己定义的方便多了，还插入了用户名和头像。
		shortcut.add("D",function() {
			if($('.currenttweet').html() == null)
				return
			else{
				var ts_tweet_screen_name = $('.currenttweet .username b').html();
				var ts_tweet_avatar = $('.currenttweet .avatar').attr('src');
				twttr.dialogs.directMessage({
                        origin: "message-dialog-hotkey"
                    }).open().switchToNewMessageView();
		        $('.twttr-directmessage-input').val(ts_tweet_screen_name);
		        $('.js-dm-avatar').attr('src',ts_tweet_avatar);
		        $('.twttr-dialog-wrapper .twitter-anywhere-tweet-box-editor').selectRange(0, 0);
	        }
		});
		//打开当前推里面的链接
		shortcut.add("L",function() {
			$('.currenttweet .js-tweet-text a.twitter-timeline-link').each(function(){
				var reg=/^\//;
				if(!reg.test($(this).attr('href')))	
					window.open($(this).attr('href'));
			});
		});
		//标记为已读
		shortcut.add("Shift+A",function() {
		    ts_unread = 0;
		    $('.ts-unread').removeClass('ts-unread');
		    document.title = document.title.replace(/\(\d+\)\s/g, '');
		    checkUnread();
		});

		//F 官方 RT 或者 undo
		shortcut.add("F",function() {
			if (isGkeyPress)
				isGkeyPress = false;
			else
				$(".currenttweet .js-toggle-rt b").trigger('click');
		});
		//E 发送到 Evernote
		shortcut.add("E",function() {
			$('.currenttweet .ts-evernote').trigger('mousedown').trigger('mouseup');
		});
		//Shift + E 编辑自己的推
		shortcut.add("Shift+E",function() {
			$('.currenttweet .ts-edt').trigger('mousedown').trigger('mouseup');
		});
		//C 一键清理当前推以下的 tweets
		shortcut.add("C",function() {
			$('.js-stream-item:eq(' + ($('div.currenttweet').index() + 10) +')').nextAll().not($('.ts-unread')).remove();
			$('#stream-items-id .stream-item:last').addClass('olddestTweet');
		});
		
		// Shift + C 一键清理当前推以上的 tweets
		shortcut.add("Shift+C",function() {
			var scrollTo = 0, currentTop = $(window).scrollTop();
			$('#stream-items-id .stream-item').not($('.ts-unread')).each(function(){
				if ($(this).index() == $('#stream-items-id .stream-item').index($('div.currenttweet')) || $('#stream-items-id .stream-item').index($('div.currenttweet')) < 10)
					return false
				if($(this).index() > 10 && $(this).index() < $('#stream-items-id .stream-item').index($('div.currenttweet'))){
					scrollTo = scrollTo + $(this).outerHeight();
					$(this).remove();
				}
			});
			$(window).scrollTop(currentTop - scrollTo);
		});
		
		//M Mute 某人
		shortcut.add("M",function(e) {
			setTimeout($('.twttr-dialog-wrapper').html(""), 100);
			setTimeout($('.twttr-dialog-overlay').hide(), 100);
			Mute();
		});

		//恢复回车功能
		shortcut.add("enter",function() {
			if ($('.tweet-button:focus').attr("class") == undefined)
	  			$('.currenttweet').trigger('click');
		});
	}//-------------- end addShortcuts() -------------------
	
	//-------------- customCSS() -------------------
	function customCSS(){
		GM_addStyle('.promoted-tweet{}')
		// 把时间线上的第一个推加上 LastTweet Class
		$('#stream-items-id .stream-item:first').addClass('LastTweet');
		// 把时间线上的最后一个推加上 olddestTweet Class
		$('#stream-items-id .stream-item:last').addClass('olddestTweet');
		//隐藏新推提示。
		if(enableAutoRefresh === 'true')
			GM_addStyle('.new-tweets-bar{display:none !important;}');
		//隐藏 Action 按钮上的文字
		if(hideActionBarTooltips === 'true'){
			GM_addStyle('.tweet-actions span{display:none !important;}');
			GM_addStyle('.tweet-actions b{display:none !important;}');
	    }
		if(exchangeUsernameAndFullname === 'true'){
			GM_addStyle('span.username{float:left; margin-right: 5px;}');
			GM_addStyle('span.username b{ font-weight: bold; color: black; font-size: 1.2em; margin: 0;}');
			GM_addStyle('span.username s{ margin-right: 2px; color: #777777}');
			GM_addStyle('.fullname {font-weight: normal !important; color: #999999 !important; font-size: 0.9em;}');
			GM_addStyle('.js-tweet-text {margin-top: 5px;}');
	    }
	    
		GM_addStyle((<r><![CDATA[
			/* 隐藏 promoted-tweet */
			div.promoted-tweet{
				display:none !important;
			}
			/* 隐藏打开关闭 open close 按钮 */
			.action-open-container .close-tweet, .action-open-container .open-tweet, .action-open-container .separator{
				display:none !important;
			}
			.in-reply-to .separator{
				display:inherit !important;
			}
			.in-reply-to .details-tweet{
				display:inherit !important;
			}

		/* CSS from: New Twitter Mod http://stylebot.me/styles/921 
		
		
					.dashboard .tweet-box {
				display:none !important;
			}
			
			
			
			
		#global-nav-home-container .dashboard {
		    float: right;
		    width: 260px;
		}
		#global-nav-home-container .content-main {
		    float: left;
		    width: 567px;
		}
		#global-nav-home-container .mini-profile .tweet-box {
		    position: absolute;
		    left: 14px;
		    top: 57px;
		    background: none;
		}
		#global-nav-home-container .content-header {
		    height: 200px;
		    background: #fff;
		}
		#global-nav-home-container .dashboard .stats {
		    border-bottom: none;
		    border-radius: 0 0 5px 5px;
		}
		#global-nav-home-container .condensed .tweet-button-container {
		    display: block;
		}
		#global-nav-home-container .mini-profile {
		    position: static;
		}
		#global-nav-home-container .twitter-media-thumbs {
		    display: none;
		}
		.wm_default {
		    margin-top: 0;
		}
		.wm_default .tweet .time a {
		    display: none;
		}
		.wm_default .tweet .time::after {
		    content: " Mark";
		    background: #eee;
		    color: #666; border-radius: 3px; padding: 1px 5px; text-shadow: 0 1px 0 # fff;
		}
		/* end New Twitter Mod CSS */
		
		/* 未读，当前推，打开中的推。*/
			.ts-unread {
			    background-color: #FFFF99 !important;
			}
			.currenttweet {
			    background-color:#F5F5F5 !important;
			}
			.ts-open {
				-webkit-box-shadow: rgba(0, 0, 0, 0.05) 0 1px 3px 0 inset, rgba(18, 132, 216, 1) 0 0 5px 0;
				-moz-box-shadow: rgba(0, 0, 0, 0.05) 0 1px 3px 0 inset, rgba(18, 132, 216, 1) 0 0 5px 0;
				box-shadow: rgba(0, 0, 0, 0.05) 0 1px 3px 0 inset, rgba(18, 132, 216, 1) 0 0 5px 0;
				border-color: #16A0D3;
				background-color: #FFF !important;
			}
			/*
			.content-main .in-reply-to	 {
	    		background-color: #F0F0F0;
			}*/
			.current-reply-to {
	    		background-color: #F0F0F0;
			}
			
		#ts_ltv {
		    text-align: center;
		    background-color: #EEEEEE;
			height:25px;
			padding-top: 4px;
		}
		.tweet-actions .ts-ret, .tweet-actions .ts-edt, .tweet-actions .ts-mute, .tweet-actions .ts-evernote{
			margin:0 1px 0 8px;
		}
		.tweet-actions .ts-ret span, .tweet-actions .ts-edt span, .tweet-actions .ts-mute span, .tweet-actions .ts-evernote span{
			margin:0 0 0 4px;
		}
		.tweet-actions i:hover{
			opacity: 0.5;
		}
		.tweet-actions .ts-ret i{
		    background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%03%00%00%00(-%0FS%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%03%00PLTE%00%00%00%FF%FF%FF%0B%97%C7%0A%82%AA%2C%B7%E6K%C1%E9%86%D5%F0%A4%E0%F4%C4%EB%F8%E1%F5%FB%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%CE%80%F5v%00%00%00%0BtRNS%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%00JO%01%F2%00%00%00jIDATx%DA%5C%CFA%12%830%0CC%D1g%12%0A%D3%FB%DF%B5%13%20M%17%09-%C5%2B%EB%8F%AC%B1%E2%E9%7F2%F6S%CC%038%BANea%BA%DAS%B9%81%AA%9C%20C%8D%E8%DBA%8D%C6%CA%26%EFd%AAh%EB%F0%D6%11%10%97%E3%01%1A%E4w%40%13s%EB%8E%85%17%11%B3%EE%98%90%F8%EA%F3%8FG%5C%CB%99l%BF%EC%7B%FD%CF%00%1C3%17H%DAW%877%00%00%00%00IEND%AEB%60%82") !important;
			background-repeat: no-repeat;
			background-color: transparent;
			width:16px;
			height:16px;
		}
		.simple-tweet .tweet-actions .ts-ret i {
		    background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%03%00%00%00(-%0FS%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%03%00PLTE%FF%FF%FF%F6%F6%F6%EE%EE%EE%E4%E4%E4%DA%DA%DA%C4%C4%C4%B7%B7%B7%99%99%99%87%87%87%FF%FF%FF111111111111111111%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00j%A7%C7c%00%00%00%0AtRNS%FF%FF%FF%FF%FF%FF%FF%FF%FF%00%B2%CC%2C%CF%00%00%00gIDATx%DA%5C%CFA%12%830%0C%03%C05MI%FB%FF%C7vH%18%C2!%84I%D1M%B6%24%5B%F1%F5%8F%84%7D%26%09j%E7k%0B%96Y%BE%B7%C7%20ic%F0%86r%1C%5DQY2%A2V%D2~%AD%F3%16%97m%A4%E4r%9F%EE%08%01%E9%05%9A(%97%25%F8%91%A3%E8%8A%05%2B7%1F%91%5B%9B%FB%F8L%DF%C6%B3%FE9%00%B8k%168w%94%99%98%00%00%00%00IEND%AEB%60%82") !important;
			background-repeat: no-repeat;
			background-color: #F6F6F6 !important;
			width:16px;
			height:16px;
		}
		.tweet-actions .ts-ret:hover i {
		    background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%03%00%00%00(-%0FS%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%03%00PLTE%00%00%00%FF%FF%FF%0B%97%C7%0A%82%AA%2C%B7%E6K%C1%E9%86%D5%F0%A4%E0%F4%C4%EB%F8%E1%F5%FB%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%CE%80%F5v%00%00%00%0BtRNS%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%00JO%01%F2%00%00%00jIDATx%DA%5C%CFA%12%830%0CC%D1g%12%0A%D3%FB%DF%B5%13%20M%17%09-%C5%2B%EB%8F%AC%B1%E2%E9%7F2%F6S%CC%038%BANea%BA%DAS%B9%81%AA%9C%20C%8D%E8%DBA%8D%C6%CA%26%EFd%AAh%EB%F0%D6%11%10%97%E3%01%1A%E4w%40%13s%EB%8E%85%17%11%B3%EE%98%90%F8%EA%F3%8FG%5C%CB%99l%BF%EC%7B%FD%CF%00%1C3%17H%DAW%877%00%00%00%00IEND%AEB%60%82") !important;
		    background-color: transparent;
		}
		.open .ts-ret i {
		    background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%03%00%00%00(-%0FS%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%03%00PLTE%00%00%00%FF%FF%FF%0B%97%C7%0A%82%AA%2C%B7%E6K%C1%E9%86%D5%F0%A4%E0%F4%C4%EB%F8%E1%F5%FB%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%CE%80%F5v%00%00%00%0BtRNS%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%00JO%01%F2%00%00%00jIDATx%DA%5C%CFA%12%830%0CC%D1g%12%0A%D3%FB%DF%B5%13%20M%17%09-%C5%2B%EB%8F%AC%B1%E2%E9%7F2%F6S%CC%038%BANea%BA%DAS%B9%81%AA%9C%20C%8D%E8%DBA%8D%C6%CA%26%EFd%AAh%EB%F0%D6%11%10%97%E3%01%1A%E4w%40%13s%EB%8E%85%17%11%B3%EE%98%90%F8%EA%F3%8FG%5C%CB%99l%BF%EC%7B%FD%CF%00%1C3%17H%DAW%877%00%00%00%00IEND%AEB%60%82") !important;
		    background-color: #FFF !important;
		}
		.tweet-actions .ts-edt i {
			width:16px;
			height:16px;
		    background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%0F%08%06%00%00%00%3B%D6%95J%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%01%A9IDATx%DA%8C%93%3FH%1CA%14%87%BF%99%DB%8B%86%2Br%04%89G%8A%40%24%AC%16V%81%40%D0*%8D%85%04%1B%0D%B6!Iw%A4%B04%8A%7F%40%EB%ABR%08)R%EEq%90%22%9C%0A)B*%C5%DAb%0D%98%14!%88w%9Ax%16%B7%B8%B7%B3%FB%2Ct%D7%DD%9C!y0%C5%1B%E6%9B%DF%7B%EF7%A3D%84t%0CV%F7%B2%1B%D9%98%FC%3A%3D%F4!%C9D%24Y%B6%E3%8A%ED%B8R%FBv%22%D7%85%ED%B8%92%3E%AF%D3%8A%AB%8FJ%C9%A5'~%C8%F1%99%E1%D03%FCl%07%00%BC%1E%EE%03X%02%5E%00wt%1A%9C%1A(%D6c8%88%84N%24%18%11zs%0A%80%F9wU%8A3o%17%81%7B%C0Se%3Bn%A6%C7%87%7D7%1B%93%F7o%F5%3F%EE%2F%00pC%2B%B4%82%07%B3k%8C%8C%8D%03%B0%F5i%83V%A5%BC%ACl%C7%CD%94%0B0R*%10F%90%D7%0AKg%C1%FDS%9F%DFGM%CC%F7%5D%2C%80%A9%81%22%87%9E%C1%88%10FB%10%0A%F9%5C%B7%E2%FE%A9%9F%11%B1%D2%3D%9AK%DBzr%0AK)%EC7%DD%60%AC%DA%AA%94%97%93iw.%07%94%D7%0A%CD%BFA%E0%87N%2B%FB%A1%60)%C5%D0%DC%1As%CF%9F%F1%E4n%E1%AF%20PO%E0%B30%22%08%AFJ%07%D8nx%0C%DF%EEM%C0%95W%D3%C4%20%D0%D4%7F%FA%DA6%11%00%AB%EFk%00%EC4%BDX%91%83%8B%C7R%07%9A%99%81uB!%88%84%86w%A5%FCys%FD%C2%D7%85%97%00%7C9h%13%83%19x%B4TH%A0V%A5%7C%ED%AF%F8%E5%9B.%AB%26%06%AB%7B%1F%F9%BF%98H'%E7%03%00%14E%06%D6%9DjF%0E%00%00%00%00IEND%AEB%60%82") !important;
		    background-color: transparent;
			background-repeat: no-repeat;
		}
		.simple-tweet .tweet-actions .ts-edt i {
			width:16px;
			height:16px;
		    background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%0F%08%06%00%00%00%3B%D6%95J%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%01%91IDATx%DA%8C%93%B1%8E%DA%40%14E%8Fg%B6%A7Kd%23%A5%B4%F8%06*%8C%A0%8Bh%D2S%A4A%E2%17%A6H%B6%A0%05J%BB%A5%26)%A2-%E0K%A8%900%0DJ%40%A2%00c%23%D9%CF%5B%ACl%D9%82%22%AF%BB3st%DF%BBzc%E5yN%B5%82%20%A8%1F%D4%EB%DBh4%FA%5D%88%97g%A0%E7y%B8%AE%FB%40%06A%F0%0B%B0%0A%AD%AA%A0%E7y%E5%C3%FB%FDN%1C%C7DQ%C4%F5z%05%A0%D3%E9%00%FC%04%BE%03%9FT%15t%5D%F7%AD%80%B3%2C%23%CB2%F2%3CGk%0D%C0r%B9d2%99%FC%00%BE%00_-%DF%F7k3%DA%B6%FD%B7%D5j%7Dv%1C%E7%A35%A5%B0%2C%8B%E9tJ%AF%D7Ck%CDz%BD%C6%18%F3j%F9%BE_k%17%C0q%9C%D2%B1%00%DB%ED6%00%22%C2%E1p%20%0C%C3%8F%C0%5C%D7%25%8A%22%F2%3CGD%10%91%9Ac%B7%DB%25I%12D%A4fR%06%26%22%E5%8CJ)%94R%25X%DC%03%A5%AB1%E6UU%03%12%91%B2%D5%D9lF%BF%DFGk%CD%EDv%7B%00%81%7D%CD9MS%B4%D6%CC%E7s%86%C3!%B6ms%B9%5C%9E%82%C0%5B%09%A7i%8A%88P%DD%B8%D3%E9D%A3%D1%60%BB%DD%12%86!%83%C1%80%02%04%FE%3D%CC%9C%A6)%00%8B%C5%02%11a%BF%DFs%3C%1E1%C6p%3E%9F)%C0Z%60%C5R%24IR%3A%AFV%2B6%9B%0D%E3%F1%18%80%DDnG%01%D6v%BB%D9l%96%901%E6%E9%AF%88%E3%B8%A6_%80A%10%04%7F%F8%BF%1AT%C5%FB%00%05A%E8%C7%0A%00%2B%05%00%00%00%00IEND%AEB%60%82") !important;
		    background-color: #F6F6F6 !important;
			background-repeat: no-repeat;
		}
		.tweet-actions .ts-edt:hover i {
		    background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%0F%08%06%00%00%00%3B%D6%95J%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%01%A9IDATx%DA%8C%93%3FH%1CA%14%87%BF%99%DB%8B%86%2Br%04%89G%8A%40%24%AC%16V%81%40%D0*%8D%85%04%1B%0D%B6!Iw%A4%B04%8A%7F%40%EB%ABR%08)R%EEq%90%22%9C%0A)B*%C5%DAb%0D%98%14!%88w%9Ax%16%B7%B8%B7%B3%FB%2Ct%D7%DD%9C!y0%C5%1B%E6%9B%DF%7B%EF7%A3D%84t%0CV%F7%B2%1B%D9%98%FC%3A%3D%F4!%C9D%24Y%B6%E3%8A%ED%B8R%FBv%22%D7%85%ED%B8%92%3E%AF%D3%8A%AB%8FJ%C9%A5'~%C8%F1%99%E1%D03%FCl%07%00%BC%1E%EE%03X%02%5E%00wt%1A%9C%1A(%D6c8%88%84N%24%18%11zs%0A%80%F9wU%8A3o%17%81%7B%C0Se%3Bn%A6%C7%87%7D7%1B%93%F7o%F5%3F%EE%2F%00pC%2B%B4%82%07%B3k%8C%8C%8D%03%B0%F5i%83V%A5%BC%ACl%C7%CD%94%0B0R*%10F%90%D7%0AKg%C1%FDS%9F%DFGM%CC%F7%5D%2C%80%A9%81%22%87%9E%C1%88%10FB%10%0A%F9%5C%B7%E2%FE%A9%9F%11%B1%D2%3D%9AK%DBzr%0AK)%EC7%DD%60%AC%DA%AA%94%97%93iw.%07%94%D7%0A%CD%BFA%E0%87N%2B%FB%A1%60)%C5%D0%DC%1As%CF%9F%F1%E4n%E1%AF%20PO%E0%B30%22%08%AFJ%07%D8nx%0C%DF%EEM%C0%95W%D3%C4%20%D0%D4%7F%FA%DA6%11%00%AB%EFk%00%EC4%BDX%91%83%8B%C7R%07%9A%99%81uB!%88%84%86w%A5%FCys%FD%C2%D7%85%97%00%7C9h%13%83%19x%B4TH%A0V%A5%7C%ED%AF%F8%E5%9B.%AB%26%06%AB%7B%1F%F9%BF%98H'%E7%03%00%14E%06%D6%9DjF%0E%00%00%00%00IEND%AEB%60%82") !important;
		    background-color: transparent;
		}
		.open .ts-edt i {
		    background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%0F%08%06%00%00%00%3B%D6%95J%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%01%A9IDATx%DA%8C%93%3FH%1CA%14%87%BF%99%DB%8B%86%2Br%04%89G%8A%40%24%AC%16V%81%40%D0*%8D%85%04%1B%0D%B6!Iw%A4%B04%8A%7F%40%EB%ABR%08)R%EEq%90%22%9C%0A)B*%C5%DAb%0D%98%14!%88w%9Ax%16%B7%B8%B7%B3%FB%2Ct%D7%DD%9C!y0%C5%1B%E6%9B%DF%7B%EF7%A3D%84t%0CV%F7%B2%1B%D9%98%FC%3A%3D%F4!%C9D%24Y%B6%E3%8A%ED%B8R%FBv%22%D7%85%ED%B8%92%3E%AF%D3%8A%AB%8FJ%C9%A5'~%C8%F1%99%E1%D03%FCl%07%00%BC%1E%EE%03X%02%5E%00wt%1A%9C%1A(%D6c8%88%84N%24%18%11zs%0A%80%F9wU%8A3o%17%81%7B%C0Se%3Bn%A6%C7%87%7D7%1B%93%F7o%F5%3F%EE%2F%00pC%2B%B4%82%07%B3k%8C%8C%8D%03%B0%F5i%83V%A5%BC%ACl%C7%CD%94%0B0R*%10F%90%D7%0AKg%C1%FDS%9F%DFGM%CC%F7%5D%2C%80%A9%81%22%87%9E%C1%88%10FB%10%0A%F9%5C%B7%E2%FE%A9%9F%11%B1%D2%3D%9AK%DBzr%0AK)%EC7%DD%60%AC%DA%AA%94%97%93iw.%07%94%D7%0A%CD%BFA%E0%87N%2B%FB%A1%60)%C5%D0%DC%1As%CF%9F%F1%E4n%E1%AF%20PO%E0%B30%22%08%AFJ%07%D8nx%0C%DF%EEM%C0%95W%D3%C4%20%D0%D4%7F%FA%DA6%11%00%AB%EFk%00%EC4%BDX%91%83%8B%C7R%07%9A%99%81uB!%88%84%86w%A5%FCys%FD%C2%D7%85%97%00%7C9h%13%83%19x%B4TH%A0V%A5%7C%ED%AF%F8%E5%9B.%AB%26%06%AB%7B%1F%F9%BF%98H'%E7%03%00%14E%06%D6%9DjF%0E%00%00%00%00IEND%AEB%60%82") !important;
		    background-color: #FFF !important;
		}
		.tweet-actions .ts-mute i {
			background-image:url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AMiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSwX%93%F7%16%3E%DF%F7e%0FVB%D8%F0%B1%97l%81%00%22%23%AC%08%C8%10Y%A2%10%92%00a%84%10%12%40%C5%85%88%0AV%14%15%11%9CHU%C4%82%D5%0AH%9D%88%E2%A0(%B8gA%8A%88Z%8BU%5C8%EE%1F%DC%A7%B5%7Dz%EF%ED%ED%FB%D7%FB%BC%E7%9C%E7%FC%CEy%CF%0F%80%11%12%26%91%E6%A2j%009R%85%3C%3A%D8%1F%8FOH%C4%C9%BD%80%02%15H%E0%04%20%10%E6%CB%C2g%05%C5%00%00%F0%03yx~t%B0%3F%FC%01%AFo%00%02%00p%D5.%24%12%C7%E1%FF%83%BAP%26W%00%20%91%00%E0%22%12%E7%0B%01%90R%00%C8.T%C8%14%00%C8%18%00%B0S%B3d%0A%00%94%00%00ly%7CB%22%00%AA%0D%00%EC%F4I%3E%05%00%D8%A9%93%DC%17%00%D8%A2%1C%A9%08%00%8D%01%00%99(G%24%02%40%BB%00%60U%81R%2C%02%C0%C2%00%A0%AC%40%22.%04%C0%AE%01%80Y%B62G%02%80%BD%05%00v%8EX%90%0F%40%60%00%80%99B%2C%CC%00%208%02%00C%1E%13%CD%03%20L%03%A00%D2%BF%E0%A9_p%85%B8H%01%00%C0%CB%95%CD%97K%D23%14%B8%95%D0%1Aw%F2%F0%E0%E2!%E2%C2l%B1Ba%17)%10f%09%E4%22%9C%97%9B%23%13H%E7%03L%CE%0C%00%00%1A%F9%D1%C1%FE8%3F%90%E7%E6%E4%E1%E6f%E7l%EF%F4%C5%A2%FEk%F0o%22%3E!%F1%DF%FE%BC%8C%02%04%00%10N%CF%EF%DA_%E5%E5%D6%03p%C7%01%B0u%BFk%A9%5B%00%DAV%00h%DF%F9%5D3%DB%09%A0Z%0A%D0z%F9%8By8%FC%40%1E%9E%A1P%C8%3C%1D%1C%0A%0B%0B%ED%25b%A1%BD0%E3%8B%3E%FF3%E1o%E0%8B~%F6%FC%40%1E%FE%DBz%F0%00q%9A%40%99%AD%C0%A3%83%FDqanv%AER%8E%E7%CB%04B1n%F7%E7%23%FE%C7%85%7F%FD%8E)%D1%E24%B1%5C%2C%15%8A%F1X%89%B8P%22M%C7y%B9R%91D!%C9%95%E2%12%E9%7F2%F1%1F%96%FD%09%93w%0D%00%AC%86O%C0N%B6%07%B5%CBl%C0~%EE%01%02%8B%0EX%D2v%00%40~%F3-%8C%1A%0B%91%00%10g42y%F7%00%00%93%BF%F9%8F%40%2B%01%00%CD%97%A4%E3%00%00%BC%E8%18%5C%A8%94%17L%C6%08%00%00D%A0%81*%B0A%07%0C%C1%14%AC%C0%0E%9C%C1%1D%BC%C0%17%02a%06D%40%0C%24%C0%3C%10B%06%E4%80%1C%0A%A1%18%96A%19T%C0%3A%D8%04%B5%B0%03%1A%A0%11%9A%E1%10%B4%C118%0D%E7%E0%12%5C%81%EBp%17%06%60%18%9E%C2%18%BC%86%09%04A%C8%08%13a!%3A%88%11b%8E%D8%22%CE%08%17%99%8E%04%22aH4%92%80%A4%20%E9%88%14Q%22%C5%C8r%A4%02%A9Bj%91%5DH%23%F2-r%149%8D%5C%40%FA%90%DB%C8%202%8A%FC%8A%BCG1%94%81%B2Q%03%D4%02u%40%B9%A8%1F%1A%8A%C6%A0s%D1t4%0F%5D%80%96%A2k%D1%1A%B4%1E%3D%80%B6%A2%A7%D1K%E8ut%00%7D%8A%8Ec%80%D11%0Ef%8C%D9a%5C%8C%87E%60%89X%1A%26%C7%16c%E5X5V%8F5c%1DX7v%15%1B%C0%9Ea%EF%08%24%02%8B%80%13%EC%08%5E%84%10%C2l%82%90%90GXLXC%A8%25%EC%23%B4%12%BA%08W%09%83%841%C2'%22%93%A8O%B4%25z%12%F9%C4xb%3A%B1%90XF%AC%26%EE!%1E!%9E%25%5E'%0E%13_%93H%24%0E%C9%92%E4N%0A!%25%902I%0BIkH%DBH-%A4S%A4%3E%D2%10i%9CL%26%EB%90m%C9%DE%E4%08%B2%80%AC%20%97%91%B7%90%0F%90O%92%FB%C9%C3%E4%B7%14%3A%C5%88%E2L%09%A2%24R%A4%94%12J5e%3F%E5%04%A5%9F2B%99%A0%AAQ%CD%A9%9E%D4%08%AA%88%3A%9FZIm%A0vP%2FS%87%A9%134u%9A%25%CD%9B%16C%CB%A4-%A3%D5%D0%9Aigi%F7h%2F%E9t%BA%09%DD%83%1EE%97%D0%97%D2k%E8%07%E9%E7%E9%83%F4w%0C%0D%86%0D%83%C7Hb(%19k%19%7B%19%A7%18%B7%19%2F%99L%A6%05%D3%97%99%C8T0%D72%1B%99g%98%0F%98oUX*%F6*%7C%15%91%CA%12%95%3A%95V%95~%95%E7%AATUsU%3F%D5y%AA%0BT%ABU%0F%AB%5EV%7D%A6FU%B3P%E3%A9%09%D4%16%AB%D5%A9%1DU%BB%A96%AE%CERwR%8FP%CFQ_%A3%BE_%FD%82%FAc%0D%B2%86%85F%A0%86H%A3Tc%B7%C6%19%8D!%16%C62e%F1XB%D6rV%03%EB%2Ck%98Mb%5B%B2%F9%ECLv%05%FB%1Bv%2F%7BLSCs%AAf%ACf%91f%9D%E6q%CD%01%0E%C6%B1%E0%F09%D9%9CJ%CE!%CE%0D%CE%7B-%03-%3F-%B1%D6j%ADf%AD~%AD7%DAz%DA%BE%DAb%EDr%ED%16%ED%EB%DA%EFup%9D%40%9D%2C%9D%F5%3Am%3A%F7u%09%BA6%BAQ%BA%85%BA%DBu%CF%EA%3E%D3c%EBy%E9%09%F5%CA%F5%0E%E9%DD%D1G%F5m%F4%A3%F5%17%EA%EF%D6%EF%D1%1F704%086%90%19l18c%F0%CC%90c%E8k%98i%B8%D1%F0%84%E1%A8%11%CBh%BA%91%C4h%A3%D1I%A3'%B8%26%EE%87g%E35x%17%3Ef%ACo%1Cb%AC4%DEe%DCk%3Cabi2%DB%A4%C4%A4%C5%E4%BE)%CD%94k%9Af%BA%D1%B4%D3t%CC%CC%C8%2C%DC%AC%D8%AC%C9%EC%8E9%D5%9Ck%9Ea%BE%D9%BC%DB%FC%8D%85%A5E%9C%C5J%8B6%8B%C7%96%DA%96%7C%CB%05%96M%96%F7%AC%98V%3EVyV%F5V%D7%ACI%D6%5C%EB%2C%EBm%D6WlP%1BW%9B%0C%9B%3A%9B%CB%B6%A8%AD%9B%AD%C4v%9Bm%DF%14%E2%14%8F)%D2)%F5Sn%DA1%EC%FC%EC%0A%EC%9A%EC%06%ED9%F6a%F6%25%F6m%F6%CF%1D%CC%1C%12%1D%D6%3Bt%3B%7Crtu%CCvlp%BC%EB%A4%E14%C3%A9%C4%A9%C3%E9Wg%1Bg%A1s%9D%F35%17%A6K%90%CB%12%97v%97%17Sm%A7%8A%A7n%9Fz%CB%95%E5%1A%EE%BA%D2%B5%D3%F5%A3%9B%BB%9B%DC%AD%D9m%D4%DD%CC%3D%C5%7D%AB%FBM.%9B%1B%C9%5D%C3%3D%EFA%F4%F0%F7X%E2q%CC%E3%9D%A7%9B%A7%C2%F3%90%E7%2F%5Ev%5EY%5E%FB%BD%1EO%B3%9C%26%9E%D60m%C8%DB%C4%5B%E0%BD%CB%7B%60%3A%3E%3De%FA%CE%E9%03%3E%C6%3E%02%9Fz%9F%87%BE%A6%BE%22%DF%3D%BE%23~%D6~%99~%07%FC%9E%FB%3B%FA%CB%FD%8F%F8%BF%E1y%F2%16%F1N%05%60%01%C1%01%E5%01%BD%81%1A%81%B3%03k%03%1F%04%99%04%A5%075%05%8D%05%BB%06%2F%0C%3E%15B%0C%09%0DY%1Fr%93o%C0%17%F2%1B%F9c3%DCg%2C%9A%D1%15%CA%08%9D%15Z%1B%FA0%CC%26L%1E%D6%11%8E%86%CF%08%DF%10~o%A6%F9L%E9%CC%B6%08%88%E0Gl%88%B8%1Fi%19%99%17%F9%7D%14)*2%AA.%EAQ%B4Stqt%F7%2C%D6%AC%E4Y%FBg%BD%8E%F1%8F%A9%8C%B9%3B%DBj%B6rvg%ACjlRlc%EC%9B%B8%80%B8%AA%B8%81x%87%F8E%F1%97%12t%13%24%09%ED%89%E4%C4%D8%C4%3D%89%E3s%02%E7l%9A3%9C%E4%9AT%96tc%AE%E5%DC%A2%B9%17%E6%E9%CE%CB%9Ew%3CY5Y%90%7C8%85%98%12%97%B2%3F%E5%83%20BP%2F%18O%E5%A7nM%1D%13%F2%84%9B%85OE%BE%A2%8D%A2Q%B1%B7%B8J%3C%92%E6%9DV%95%F68%DD%3B%7DC%FAh%86OFu%C63%09OR%2By%91%19%92%B9%23%F3MVD%D6%DE%AC%CF%D9q%D9-9%94%9C%94%9C%A3R%0Di%96%B4%2B%D70%B7(%B7Of%2B%2B%93%0D%E4y%E6m%CA%1B%93%87%CA%F7%E4%23%F9s%F3%DB%15l%85L%D1%A3%B4R%AEP%0E%16L%2F%A8%2Bx%5B%18%5Bx%B8H%BDHZ%D43%DFf%FE%EA%F9%23%0B%82%16%7C%BD%90%B0P%B8%B0%B3%D8%B8xY%F1%E0%22%BFE%BB%16%23%8BS%17w.1%5DR%BAdxi%F0%D2%7D%CBh%CB%B2%96%FDP%E2XRU%F2jy%DC%F2%8ER%83%D2%A5%A5C%2B%82W4%95%A9%94%C9%CBn%AE%F4Z%B9c%15a%95dU%EFj%97%D5%5BV%7F*%17%95_%ACp%AC%A8%AE%F8%B0F%B8%E6%E2WN_%D5%7C%F5ym%DA%DA%DEJ%B7%CA%ED%EBH%EB%A4%EBn%AC%F7Y%BF%AFJ%BDjA%D5%D0%86%F0%0D%AD%1B%F1%8D%E5%1B_mJ%DEt%A1zj%F5%8E%CD%B4%CD%CA%CD%035a5%ED%5B%CC%B6%AC%DB%F2%A16%A3%F6z%9D%7F%5D%CBV%FD%AD%AB%B7%BE%D9%26%DA%D6%BF%DDw%7B%F3%0E%83%1D%15%3B%DE%EF%94%EC%BC%B5%2BxWk%BDE%7D%F5n%D2%EE%82%DD%8F%1Ab%1B%BA%BF%E6~%DD%B8GwO%C5%9E%8F%7B%A5%7B%07%F6E%EF%EBjtol%DC%AF%BF%BF%B2%09mR6%8D%1EH%3Ap%E5%9B%80o%DA%9B%ED%9Aw%B5pZ*%0E%C2A%E5%C1'%DF%A6%7C%7B%E3P%E8%A1%CE%C3%DC%C3%CD%DF%99%7F%B7%F5%08%EBHy%2B%D2%3A%BFu%AC-%A3m%A0%3D%A1%BD%EF%E8%8C%A3%9D%1D%5E%1DG%BE%B7%FF~%EF1%E3cu%C75%8FW%9E%A0%9D(%3D%F1%F9%E4%82%93%E3%A7d%A7%9E%9DN%3F%3D%D4%99%DCy%F7L%FC%99k%5DQ%5D%BDgC%CF%9E%3F%17t%EEL%B7_%F7%C9%F3%DE%E7%8F%5D%F0%BCp%F4%22%F7b%DB%25%B7K%AD%3D%AE%3DG~p%FD%E1H%AF%5Bo%EBe%F7%CB%EDW%3C%AEt%F4M%EB%3B%D1%EF%D3%7F%FAj%C0%D5s%D7%F8%D7.%5D%9Fy%BD%EF%C6%EC%1B%B7n%26%DD%1C%B8%25%BA%F5%F8v%F6%ED%17w%0A%EEL%DC%5Dz%8Fx%AF%FC%BE%DA%FD%EA%07%FA%0F%EA%7F%B4%FE%B1e%C0m%E0%F8%60%C0%60%CF%C3Y%0F%EF%0E%09%87%9E%FE%94%FF%D3%87%E1%D2G%CCG%D5%23F%23%8D%8F%9D%1F%1F%1B%0D%1A%BD%F2d%CE%93%E1%A7%B2%A7%13%CF%CA~V%FFy%EBs%AB%E7%DF%FD%E2%FBK%CFX%FC%D8%F0%0B%F9%8B%CF%BF%AEy%A9%F3r%EF%AB%A9%AF%3A%C7%23%C7%1F%BC%CEy%3D%F1%A6%FC%AD%CE%DB%7D%EF%B8%EF%BA%DF%C7%BD%1F%99(%FC%40%FEP%F3%D1%FAc%C7%A7%D0O%F7%3E%E7%7C%FE%FC%2F%F7%84%F3%FB%25%D2%9F3%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%00%8AIDATx%DAb%FC%FF%FF%3F%03%25%80%89%81B%40%B1%01%2C%0C%0C%0C%0C%E2%0B%AF%E0S%D3%C0%C0%C0%90%CB%C0%C00%19%CA%86%83%97%F1%3A%10%03%18%18%18%B0%05%04%23TC%3D%94_%8Fd%20%86%17%18%B1%60dM%0C8%F8%B4%0F%C4F%02%7Cx%18%E0%0B%40%06%5C%81H%C8%05%0D%D0%C0%ADg%60%60%E0%85%D2%FFq%05%222%E0%84*%ACB%12cEbWA%E59q%19%F0%0D%8B%26%06%2C%86%7D%A3J%2C0%0E%FD%CC%04%18%00%B2%B8%1B*%E7%A5A%1D%00%00%00%00IEND%AEB%60%82") !important;
			background-color: transparent;
			background-repeat: no-repeat;
			width:16px;
			height:16px;
		}
		.simple-tweet .tweet-actions .ts-mute i {
			background-image:url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AMiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSwX%93%F7%16%3E%DF%F7e%0FVB%D8%F0%B1%97l%81%00%22%23%AC%08%C8%10Y%A2%10%92%00a%84%10%12%40%C5%85%88%0AV%14%15%11%9CHU%C4%82%D5%0AH%9D%88%E2%A0(%B8gA%8A%88Z%8BU%5C8%EE%1F%DC%A7%B5%7Dz%EF%ED%ED%FB%D7%FB%BC%E7%9C%E7%FC%CEy%CF%0F%80%11%12%26%91%E6%A2j%009R%85%3C%3A%D8%1F%8FOH%C4%C9%BD%80%02%15H%E0%04%20%10%E6%CB%C2g%05%C5%00%00%F0%03yx~t%B0%3F%FC%01%AFo%00%02%00p%D5.%24%12%C7%E1%FF%83%BAP%26W%00%20%91%00%E0%22%12%E7%0B%01%90R%00%C8.T%C8%14%00%C8%18%00%B0S%B3d%0A%00%94%00%00ly%7CB%22%00%AA%0D%00%EC%F4I%3E%05%00%D8%A9%93%DC%17%00%D8%A2%1C%A9%08%00%8D%01%00%99(G%24%02%40%BB%00%60U%81R%2C%02%C0%C2%00%A0%AC%40%22.%04%C0%AE%01%80Y%B62G%02%80%BD%05%00v%8EX%90%0F%40%60%00%80%99B%2C%CC%00%208%02%00C%1E%13%CD%03%20L%03%A00%D2%BF%E0%A9_p%85%B8H%01%00%C0%CB%95%CD%97K%D23%14%B8%95%D0%1Aw%F2%F0%E0%E2!%E2%C2l%B1Ba%17)%10f%09%E4%22%9C%97%9B%23%13H%E7%03L%CE%0C%00%00%1A%F9%D1%C1%FE8%3F%90%E7%E6%E4%E1%E6f%E7l%EF%F4%C5%A2%FEk%F0o%22%3E!%F1%DF%FE%BC%8C%02%04%00%10N%CF%EF%DA_%E5%E5%D6%03p%C7%01%B0u%BFk%A9%5B%00%DAV%00h%DF%F9%5D3%DB%09%A0Z%0A%D0z%F9%8By8%FC%40%1E%9E%A1P%C8%3C%1D%1C%0A%0B%0B%ED%25b%A1%BD0%E3%8B%3E%FF3%E1o%E0%8B~%F6%FC%40%1E%FE%DBz%F0%00q%9A%40%99%AD%C0%A3%83%FDqanv%AER%8E%E7%CB%04B1n%F7%E7%23%FE%C7%85%7F%FD%8E)%D1%E24%B1%5C%2C%15%8A%F1X%89%B8P%22M%C7y%B9R%91D!%C9%95%E2%12%E9%7F2%F1%1F%96%FD%09%93w%0D%00%AC%86O%C0N%B6%07%B5%CBl%C0~%EE%01%02%8B%0EX%D2v%00%40~%F3-%8C%1A%0B%91%00%10g42y%F7%00%00%93%BF%F9%8F%40%2B%01%00%CD%97%A4%E3%00%00%BC%E8%18%5C%A8%94%17L%C6%08%00%00D%A0%81*%B0A%07%0C%C1%14%AC%C0%0E%9C%C1%1D%BC%C0%17%02a%06D%40%0C%24%C0%3C%10B%06%E4%80%1C%0A%A1%18%96A%19T%C0%3A%D8%04%B5%B0%03%1A%A0%11%9A%E1%10%B4%C118%0D%E7%E0%12%5C%81%EBp%17%06%60%18%9E%C2%18%BC%86%09%04A%C8%08%13a!%3A%88%11b%8E%D8%22%CE%08%17%99%8E%04%22aH4%92%80%A4%20%E9%88%14Q%22%C5%C8r%A4%02%A9Bj%91%5DH%23%F2-r%149%8D%5C%40%FA%90%DB%C8%202%8A%FC%8A%BCG1%94%81%B2Q%03%D4%02u%40%B9%A8%1F%1A%8A%C6%A0s%D1t4%0F%5D%80%96%A2k%D1%1A%B4%1E%3D%80%B6%A2%A7%D1K%E8ut%00%7D%8A%8Ec%80%D11%0Ef%8C%D9a%5C%8C%87E%60%89X%1A%26%C7%16c%E5X5V%8F5c%1DX7v%15%1B%C0%9Ea%EF%08%24%02%8B%80%13%EC%08%5E%84%10%C2l%82%90%90GXLXC%A8%25%EC%23%B4%12%BA%08W%09%83%841%C2'%22%93%A8O%B4%25z%12%F9%C4xb%3A%B1%90XF%AC%26%EE!%1E!%9E%25%5E'%0E%13_%93H%24%0E%C9%92%E4N%0A!%25%902I%0BIkH%DBH-%A4S%A4%3E%D2%10i%9CL%26%EB%90m%C9%DE%E4%08%B2%80%AC%20%97%91%B7%90%0F%90O%92%FB%C9%C3%E4%B7%14%3A%C5%88%E2L%09%A2%24R%A4%94%12J5e%3F%E5%04%A5%9F2B%99%A0%AAQ%CD%A9%9E%D4%08%AA%88%3A%9FZIm%A0vP%2FS%87%A9%134u%9A%25%CD%9B%16C%CB%A4-%A3%D5%D0%9Aigi%F7h%2F%E9t%BA%09%DD%83%1EE%97%D0%97%D2k%E8%07%E9%E7%E9%83%F4w%0C%0D%86%0D%83%C7Hb(%19k%19%7B%19%A7%18%B7%19%2F%99L%A6%05%D3%97%99%C8T0%D72%1B%99g%98%0F%98oUX*%F6*%7C%15%91%CA%12%95%3A%95V%95~%95%E7%AATUsU%3F%D5y%AA%0BT%ABU%0F%AB%5EV%7D%A6FU%B3P%E3%A9%09%D4%16%AB%D5%A9%1DU%BB%A96%AE%CERwR%8FP%CFQ_%A3%BE_%FD%82%FAc%0D%B2%86%85F%A0%86H%A3Tc%B7%C6%19%8D!%16%C62e%F1XB%D6rV%03%EB%2Ck%98Mb%5B%B2%F9%ECLv%05%FB%1Bv%2F%7BLSCs%AAf%ACf%91f%9D%E6q%CD%01%0E%C6%B1%E0%F09%D9%9CJ%CE!%CE%0D%CE%7B-%03-%3F-%B1%D6j%ADf%AD~%AD7%DAz%DA%BE%DAb%EDr%ED%16%ED%EB%DA%EFup%9D%40%9D%2C%9D%F5%3Am%3A%F7u%09%BA6%BAQ%BA%85%BA%DBu%CF%EA%3E%D3c%EBy%E9%09%F5%CA%F5%0E%E9%DD%D1G%F5m%F4%A3%F5%17%EA%EF%D6%EF%D1%1F704%086%90%19l18c%F0%CC%90c%E8k%98i%B8%D1%F0%84%E1%A8%11%CBh%BA%91%C4h%A3%D1I%A3'%B8%26%EE%87g%E35x%17%3Ef%ACo%1Cb%AC4%DEe%DCk%3Cabi2%DB%A4%C4%A4%C5%E4%BE)%CD%94k%9Af%BA%D1%B4%D3t%CC%CC%C8%2C%DC%AC%D8%AC%C9%EC%8E9%D5%9Ck%9Ea%BE%D9%BC%DB%FC%8D%85%A5E%9C%C5J%8B6%8B%C7%96%DA%96%7C%CB%05%96M%96%F7%AC%98V%3EVyV%F5V%D7%ACI%D6%5C%EB%2C%EBm%D6WlP%1BW%9B%0C%9B%3A%9B%CB%B6%A8%AD%9B%AD%C4v%9Bm%DF%14%E2%14%8F)%D2)%F5Sn%DA1%EC%FC%EC%0A%EC%9A%EC%06%ED9%F6a%F6%25%F6m%F6%CF%1D%CC%1C%12%1D%D6%3Bt%3B%7Crtu%CCvlp%BC%EB%A4%E14%C3%A9%C4%A9%C3%E9Wg%1Bg%A1s%9D%F35%17%A6K%90%CB%12%97v%97%17Sm%A7%8A%A7n%9Fz%CB%95%E5%1A%EE%BA%D2%B5%D3%F5%A3%9B%BB%9B%DC%AD%D9m%D4%DD%CC%3D%C5%7D%AB%FBM.%9B%1B%C9%5D%C3%3D%EFA%F4%F0%F7X%E2q%CC%E3%9D%A7%9B%A7%C2%F3%90%E7%2F%5Ev%5EY%5E%FB%BD%1EO%B3%9C%26%9E%D60m%C8%DB%C4%5B%E0%BD%CB%7B%60%3A%3E%3De%FA%CE%E9%03%3E%C6%3E%02%9Fz%9F%87%BE%A6%BE%22%DF%3D%BE%23~%D6~%99~%07%FC%9E%FB%3B%FA%CB%FD%8F%F8%BF%E1y%F2%16%F1N%05%60%01%C1%01%E5%01%BD%81%1A%81%B3%03k%03%1F%04%99%04%A5%075%05%8D%05%BB%06%2F%0C%3E%15B%0C%09%0DY%1Fr%93o%C0%17%F2%1B%F9c3%DCg%2C%9A%D1%15%CA%08%9D%15Z%1B%FA0%CC%26L%1E%D6%11%8E%86%CF%08%DF%10~o%A6%F9L%E9%CC%B6%08%88%E0Gl%88%B8%1Fi%19%99%17%F9%7D%14)*2%AA.%EAQ%B4Stqt%F7%2C%D6%AC%E4Y%FBg%BD%8E%F1%8F%A9%8C%B9%3B%DBj%B6rvg%ACjlRlc%EC%9B%B8%80%B8%AA%B8%81x%87%F8E%F1%97%12t%13%24%09%ED%89%E4%C4%D8%C4%3D%89%E3s%02%E7l%9A3%9C%E4%9AT%96tc%AE%E5%DC%A2%B9%17%E6%E9%CE%CB%9Ew%3CY5Y%90%7C8%85%98%12%97%B2%3F%E5%83%20BP%2F%18O%E5%A7nM%1D%13%F2%84%9B%85OE%BE%A2%8D%A2Q%B1%B7%B8J%3C%92%E6%9DV%95%F68%DD%3B%7DC%FAh%86OFu%C63%09OR%2By%91%19%92%B9%23%F3MVD%D6%DE%AC%CF%D9q%D9-9%94%9C%94%9C%A3R%0Di%96%B4%2B%D70%B7(%B7Of%2B%2B%93%0D%E4y%E6m%CA%1B%93%87%CA%F7%E4%23%F9s%F3%DB%15l%85L%D1%A3%B4R%AEP%0E%16L%2F%A8%2Bx%5B%18%5Bx%B8H%BDHZ%D43%DFf%FE%EA%F9%23%0B%82%16%7C%BD%90%B0P%B8%B0%B3%D8%B8xY%F1%E0%22%BFE%BB%16%23%8BS%17w.1%5DR%BAdxi%F0%D2%7D%CBh%CB%B2%96%FDP%E2XRU%F2jy%DC%F2%8ER%83%D2%A5%A5C%2B%82W4%95%A9%94%C9%CBn%AE%F4Z%B9c%15a%95dU%EFj%97%D5%5BV%7F*%17%95_%ACp%AC%A8%AE%F8%B0F%B8%E6%E2WN_%D5%7C%F5ym%DA%DA%DEJ%B7%CA%ED%EBH%EB%A4%EBn%AC%F7Y%BF%AFJ%BDjA%D5%D0%86%F0%0D%AD%1B%F1%8D%E5%1B_mJ%DEt%A1zj%F5%8E%CD%B4%CD%CA%CD%035a5%ED%5B%CC%B6%AC%DB%F2%A16%A3%F6z%9D%7F%5D%CBV%FD%AD%AB%B7%BE%D9%26%DA%D6%BF%DDw%7B%F3%0E%83%1D%15%3B%DE%EF%94%EC%BC%B5%2BxWk%BDE%7D%F5n%D2%EE%82%DD%8F%1Ab%1B%BA%BF%E6~%DD%B8GwO%C5%9E%8F%7B%A5%7B%07%F6E%EF%EBjtol%DC%AF%BF%BF%B2%09mR6%8D%1EH%3Ap%E5%9B%80o%DA%9B%ED%9Aw%B5pZ*%0E%C2A%E5%C1'%DF%A6%7C%7B%E3P%E8%A1%CE%C3%DC%C3%CD%DF%99%7F%B7%F5%08%EBHy%2B%D2%3A%BFu%AC-%A3m%A0%3D%A1%BD%EF%E8%8C%A3%9D%1D%5E%1DG%BE%B7%FF~%EF1%E3cu%C75%8FW%9E%A0%9D(%3D%F1%F9%E4%82%93%E3%A7d%A7%9E%9DN%3F%3D%D4%99%DCy%F7L%FC%99k%5DQ%5D%BDgC%CF%9E%3F%17t%EEL%B7_%F7%C9%F3%DE%E7%8F%5D%F0%BCp%F4%22%F7b%DB%25%B7K%AD%3D%AE%3DG~p%FD%E1H%AF%5Bo%EBe%F7%CB%EDW%3C%AEt%F4M%EB%3B%D1%EF%D3%7F%FAj%C0%D5s%D7%F8%D7.%5D%9Fy%BD%EF%C6%EC%1B%B7n%26%DD%1C%B8%25%BA%F5%F8v%F6%ED%17w%0A%EEL%DC%5Dz%8Fx%AF%FC%BE%DA%FD%EA%07%FA%0F%EA%7F%B4%FE%B1e%C0m%E0%F8%60%C0%60%CF%C3Y%0F%EF%0E%09%87%9E%FE%94%FF%D3%87%E1%D2G%CCG%D5%23F%23%8D%8F%9D%1F%1F%1B%0D%1A%BD%F2d%CE%93%E1%A7%B2%A7%13%CF%CA~V%FFy%EBs%AB%E7%DF%FD%E2%FBK%CFX%FC%D8%F0%0B%F9%8B%CF%BF%AEy%A9%F3r%EF%AB%A9%AF%3A%C7%23%C7%1F%BC%CEy%3D%F1%A6%FC%AD%CE%DB%7D%EF%B8%EF%BA%DF%C7%BD%1F%99(%FC%40%FEP%F3%D1%FAc%C7%A7%D0O%F7%3E%E7%7C%FE%FC%2F%F7%84%F3%FB%25%D2%9F3%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%00%99IDATx%DA%D4%931%0E%C30%08E%9F%A3f%C8%D0k%B2%F5%02Y%E2%9E%A1%1B%07%CD%EA%0C%05%89FX%A9%E4.e%B1%C1%F0%04%DFvi%AD1b%13%836%0C%B8eAU%05%40DP%D5%0A%3C%80%17Pc%9E%88%BC%01%AA%9A%09Q%ACx3%DF%D7%0FH%E9%89h%5D%A4%E0%D8%C1%E4%C9%DEv%1C%E1k%0DD%A4W%FC%0C%AD%BB%7F-b0%9F7%15%F1%EA%1A%ABi%B0%01w%5B%DB%19%92%01%16K%5CCl%0E%FB%D5%CE%97%1E%60O%8AH%60%FBO%5Eb%F9%FF%CFt%0C%00f%000%AA%FCO%18%C5%00%00%00%00IEND%AEB%60%82") !important;
			background-color: #F6F6F6 !important;
			background-repeat: no-repeat;
			width:16px;
			height:16px;
		}
		.tweet-actions .ts-mute:hover i {
			background-image:url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AMiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSwX%93%F7%16%3E%DF%F7e%0FVB%D8%F0%B1%97l%81%00%22%23%AC%08%C8%10Y%A2%10%92%00a%84%10%12%40%C5%85%88%0AV%14%15%11%9CHU%C4%82%D5%0AH%9D%88%E2%A0(%B8gA%8A%88Z%8BU%5C8%EE%1F%DC%A7%B5%7Dz%EF%ED%ED%FB%D7%FB%BC%E7%9C%E7%FC%CEy%CF%0F%80%11%12%26%91%E6%A2j%009R%85%3C%3A%D8%1F%8FOH%C4%C9%BD%80%02%15H%E0%04%20%10%E6%CB%C2g%05%C5%00%00%F0%03yx~t%B0%3F%FC%01%AFo%00%02%00p%D5.%24%12%C7%E1%FF%83%BAP%26W%00%20%91%00%E0%22%12%E7%0B%01%90R%00%C8.T%C8%14%00%C8%18%00%B0S%B3d%0A%00%94%00%00ly%7CB%22%00%AA%0D%00%EC%F4I%3E%05%00%D8%A9%93%DC%17%00%D8%A2%1C%A9%08%00%8D%01%00%99(G%24%02%40%BB%00%60U%81R%2C%02%C0%C2%00%A0%AC%40%22.%04%C0%AE%01%80Y%B62G%02%80%BD%05%00v%8EX%90%0F%40%60%00%80%99B%2C%CC%00%208%02%00C%1E%13%CD%03%20L%03%A00%D2%BF%E0%A9_p%85%B8H%01%00%C0%CB%95%CD%97K%D23%14%B8%95%D0%1Aw%F2%F0%E0%E2!%E2%C2l%B1Ba%17)%10f%09%E4%22%9C%97%9B%23%13H%E7%03L%CE%0C%00%00%1A%F9%D1%C1%FE8%3F%90%E7%E6%E4%E1%E6f%E7l%EF%F4%C5%A2%FEk%F0o%22%3E!%F1%DF%FE%BC%8C%02%04%00%10N%CF%EF%DA_%E5%E5%D6%03p%C7%01%B0u%BFk%A9%5B%00%DAV%00h%DF%F9%5D3%DB%09%A0Z%0A%D0z%F9%8By8%FC%40%1E%9E%A1P%C8%3C%1D%1C%0A%0B%0B%ED%25b%A1%BD0%E3%8B%3E%FF3%E1o%E0%8B~%F6%FC%40%1E%FE%DBz%F0%00q%9A%40%99%AD%C0%A3%83%FDqanv%AER%8E%E7%CB%04B1n%F7%E7%23%FE%C7%85%7F%FD%8E)%D1%E24%B1%5C%2C%15%8A%F1X%89%B8P%22M%C7y%B9R%91D!%C9%95%E2%12%E9%7F2%F1%1F%96%FD%09%93w%0D%00%AC%86O%C0N%B6%07%B5%CBl%C0~%EE%01%02%8B%0EX%D2v%00%40~%F3-%8C%1A%0B%91%00%10g42y%F7%00%00%93%BF%F9%8F%40%2B%01%00%CD%97%A4%E3%00%00%BC%E8%18%5C%A8%94%17L%C6%08%00%00D%A0%81*%B0A%07%0C%C1%14%AC%C0%0E%9C%C1%1D%BC%C0%17%02a%06D%40%0C%24%C0%3C%10B%06%E4%80%1C%0A%A1%18%96A%19T%C0%3A%D8%04%B5%B0%03%1A%A0%11%9A%E1%10%B4%C118%0D%E7%E0%12%5C%81%EBp%17%06%60%18%9E%C2%18%BC%86%09%04A%C8%08%13a!%3A%88%11b%8E%D8%22%CE%08%17%99%8E%04%22aH4%92%80%A4%20%E9%88%14Q%22%C5%C8r%A4%02%A9Bj%91%5DH%23%F2-r%149%8D%5C%40%FA%90%DB%C8%202%8A%FC%8A%BCG1%94%81%B2Q%03%D4%02u%40%B9%A8%1F%1A%8A%C6%A0s%D1t4%0F%5D%80%96%A2k%D1%1A%B4%1E%3D%80%B6%A2%A7%D1K%E8ut%00%7D%8A%8Ec%80%D11%0Ef%8C%D9a%5C%8C%87E%60%89X%1A%26%C7%16c%E5X5V%8F5c%1DX7v%15%1B%C0%9Ea%EF%08%24%02%8B%80%13%EC%08%5E%84%10%C2l%82%90%90GXLXC%A8%25%EC%23%B4%12%BA%08W%09%83%841%C2'%22%93%A8O%B4%25z%12%F9%C4xb%3A%B1%90XF%AC%26%EE!%1E!%9E%25%5E'%0E%13_%93H%24%0E%C9%92%E4N%0A!%25%902I%0BIkH%DBH-%A4S%A4%3E%D2%10i%9CL%26%EB%90m%C9%DE%E4%08%B2%80%AC%20%97%91%B7%90%0F%90O%92%FB%C9%C3%E4%B7%14%3A%C5%88%E2L%09%A2%24R%A4%94%12J5e%3F%E5%04%A5%9F2B%99%A0%AAQ%CD%A9%9E%D4%08%AA%88%3A%9FZIm%A0vP%2FS%87%A9%134u%9A%25%CD%9B%16C%CB%A4-%A3%D5%D0%9Aigi%F7h%2F%E9t%BA%09%DD%83%1EE%97%D0%97%D2k%E8%07%E9%E7%E9%83%F4w%0C%0D%86%0D%83%C7Hb(%19k%19%7B%19%A7%18%B7%19%2F%99L%A6%05%D3%97%99%C8T0%D72%1B%99g%98%0F%98oUX*%F6*%7C%15%91%CA%12%95%3A%95V%95~%95%E7%AATUsU%3F%D5y%AA%0BT%ABU%0F%AB%5EV%7D%A6FU%B3P%E3%A9%09%D4%16%AB%D5%A9%1DU%BB%A96%AE%CERwR%8FP%CFQ_%A3%BE_%FD%82%FAc%0D%B2%86%85F%A0%86H%A3Tc%B7%C6%19%8D!%16%C62e%F1XB%D6rV%03%EB%2Ck%98Mb%5B%B2%F9%ECLv%05%FB%1Bv%2F%7BLSCs%AAf%ACf%91f%9D%E6q%CD%01%0E%C6%B1%E0%F09%D9%9CJ%CE!%CE%0D%CE%7B-%03-%3F-%B1%D6j%ADf%AD~%AD7%DAz%DA%BE%DAb%EDr%ED%16%ED%EB%DA%EFup%9D%40%9D%2C%9D%F5%3Am%3A%F7u%09%BA6%BAQ%BA%85%BA%DBu%CF%EA%3E%D3c%EBy%E9%09%F5%CA%F5%0E%E9%DD%D1G%F5m%F4%A3%F5%17%EA%EF%D6%EF%D1%1F704%086%90%19l18c%F0%CC%90c%E8k%98i%B8%D1%F0%84%E1%A8%11%CBh%BA%91%C4h%A3%D1I%A3'%B8%26%EE%87g%E35x%17%3Ef%ACo%1Cb%AC4%DEe%DCk%3Cabi2%DB%A4%C4%A4%C5%E4%BE)%CD%94k%9Af%BA%D1%B4%D3t%CC%CC%C8%2C%DC%AC%D8%AC%C9%EC%8E9%D5%9Ck%9Ea%BE%D9%BC%DB%FC%8D%85%A5E%9C%C5J%8B6%8B%C7%96%DA%96%7C%CB%05%96M%96%F7%AC%98V%3EVyV%F5V%D7%ACI%D6%5C%EB%2C%EBm%D6WlP%1BW%9B%0C%9B%3A%9B%CB%B6%A8%AD%9B%AD%C4v%9Bm%DF%14%E2%14%8F)%D2)%F5Sn%DA1%EC%FC%EC%0A%EC%9A%EC%06%ED9%F6a%F6%25%F6m%F6%CF%1D%CC%1C%12%1D%D6%3Bt%3B%7Crtu%CCvlp%BC%EB%A4%E14%C3%A9%C4%A9%C3%E9Wg%1Bg%A1s%9D%F35%17%A6K%90%CB%12%97v%97%17Sm%A7%8A%A7n%9Fz%CB%95%E5%1A%EE%BA%D2%B5%D3%F5%A3%9B%BB%9B%DC%AD%D9m%D4%DD%CC%3D%C5%7D%AB%FBM.%9B%1B%C9%5D%C3%3D%EFA%F4%F0%F7X%E2q%CC%E3%9D%A7%9B%A7%C2%F3%90%E7%2F%5Ev%5EY%5E%FB%BD%1EO%B3%9C%26%9E%D60m%C8%DB%C4%5B%E0%BD%CB%7B%60%3A%3E%3De%FA%CE%E9%03%3E%C6%3E%02%9Fz%9F%87%BE%A6%BE%22%DF%3D%BE%23~%D6~%99~%07%FC%9E%FB%3B%FA%CB%FD%8F%F8%BF%E1y%F2%16%F1N%05%60%01%C1%01%E5%01%BD%81%1A%81%B3%03k%03%1F%04%99%04%A5%075%05%8D%05%BB%06%2F%0C%3E%15B%0C%09%0DY%1Fr%93o%C0%17%F2%1B%F9c3%DCg%2C%9A%D1%15%CA%08%9D%15Z%1B%FA0%CC%26L%1E%D6%11%8E%86%CF%08%DF%10~o%A6%F9L%E9%CC%B6%08%88%E0Gl%88%B8%1Fi%19%99%17%F9%7D%14)*2%AA.%EAQ%B4Stqt%F7%2C%D6%AC%E4Y%FBg%BD%8E%F1%8F%A9%8C%B9%3B%DBj%B6rvg%ACjlRlc%EC%9B%B8%80%B8%AA%B8%81x%87%F8E%F1%97%12t%13%24%09%ED%89%E4%C4%D8%C4%3D%89%E3s%02%E7l%9A3%9C%E4%9AT%96tc%AE%E5%DC%A2%B9%17%E6%E9%CE%CB%9Ew%3CY5Y%90%7C8%85%98%12%97%B2%3F%E5%83%20BP%2F%18O%E5%A7nM%1D%13%F2%84%9B%85OE%BE%A2%8D%A2Q%B1%B7%B8J%3C%92%E6%9DV%95%F68%DD%3B%7DC%FAh%86OFu%C63%09OR%2By%91%19%92%B9%23%F3MVD%D6%DE%AC%CF%D9q%D9-9%94%9C%94%9C%A3R%0Di%96%B4%2B%D70%B7(%B7Of%2B%2B%93%0D%E4y%E6m%CA%1B%93%87%CA%F7%E4%23%F9s%F3%DB%15l%85L%D1%A3%B4R%AEP%0E%16L%2F%A8%2Bx%5B%18%5Bx%B8H%BDHZ%D43%DFf%FE%EA%F9%23%0B%82%16%7C%BD%90%B0P%B8%B0%B3%D8%B8xY%F1%E0%22%BFE%BB%16%23%8BS%17w.1%5DR%BAdxi%F0%D2%7D%CBh%CB%B2%96%FDP%E2XRU%F2jy%DC%F2%8ER%83%D2%A5%A5C%2B%82W4%95%A9%94%C9%CBn%AE%F4Z%B9c%15a%95dU%EFj%97%D5%5BV%7F*%17%95_%ACp%AC%A8%AE%F8%B0F%B8%E6%E2WN_%D5%7C%F5ym%DA%DA%DEJ%B7%CA%ED%EBH%EB%A4%EBn%AC%F7Y%BF%AFJ%BDjA%D5%D0%86%F0%0D%AD%1B%F1%8D%E5%1B_mJ%DEt%A1zj%F5%8E%CD%B4%CD%CA%CD%035a5%ED%5B%CC%B6%AC%DB%F2%A16%A3%F6z%9D%7F%5D%CBV%FD%AD%AB%B7%BE%D9%26%DA%D6%BF%DDw%7B%F3%0E%83%1D%15%3B%DE%EF%94%EC%BC%B5%2BxWk%BDE%7D%F5n%D2%EE%82%DD%8F%1Ab%1B%BA%BF%E6~%DD%B8GwO%C5%9E%8F%7B%A5%7B%07%F6E%EF%EBjtol%DC%AF%BF%BF%B2%09mR6%8D%1EH%3Ap%E5%9B%80o%DA%9B%ED%9Aw%B5pZ*%0E%C2A%E5%C1'%DF%A6%7C%7B%E3P%E8%A1%CE%C3%DC%C3%CD%DF%99%7F%B7%F5%08%EBHy%2B%D2%3A%BFu%AC-%A3m%A0%3D%A1%BD%EF%E8%8C%A3%9D%1D%5E%1DG%BE%B7%FF~%EF1%E3cu%C75%8FW%9E%A0%9D(%3D%F1%F9%E4%82%93%E3%A7d%A7%9E%9DN%3F%3D%D4%99%DCy%F7L%FC%99k%5DQ%5D%BDgC%CF%9E%3F%17t%EEL%B7_%F7%C9%F3%DE%E7%8F%5D%F0%BCp%F4%22%F7b%DB%25%B7K%AD%3D%AE%3DG~p%FD%E1H%AF%5Bo%EBe%F7%CB%EDW%3C%AEt%F4M%EB%3B%D1%EF%D3%7F%FAj%C0%D5s%D7%F8%D7.%5D%9Fy%BD%EF%C6%EC%1B%B7n%26%DD%1C%B8%25%BA%F5%F8v%F6%ED%17w%0A%EEL%DC%5Dz%8Fx%AF%FC%BE%DA%FD%EA%07%FA%0F%EA%7F%B4%FE%B1e%C0m%E0%F8%60%C0%60%CF%C3Y%0F%EF%0E%09%87%9E%FE%94%FF%D3%87%E1%D2G%CCG%D5%23F%23%8D%8F%9D%1F%1F%1B%0D%1A%BD%F2d%CE%93%E1%A7%B2%A7%13%CF%CA~V%FFy%EBs%AB%E7%DF%FD%E2%FBK%CFX%FC%D8%F0%0B%F9%8B%CF%BF%AEy%A9%F3r%EF%AB%A9%AF%3A%C7%23%C7%1F%BC%CEy%3D%F1%A6%FC%AD%CE%DB%7D%EF%B8%EF%BA%DF%C7%BD%1F%99(%FC%40%FEP%F3%D1%FAc%C7%A7%D0O%F7%3E%E7%7C%FE%FC%2F%F7%84%F3%FB%25%D2%9F3%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%00%8AIDATx%DAb%FC%FF%FF%3F%03%25%80%89%81B%40%B1%01%2C%0C%0C%0C%0C%E2%0B%AF%E0S%D3%C0%C0%C0%90%CB%C0%C00%19%CA%86%83%97%F1%3A%10%03%18%18%18%B0%05%04%23TC%3D%94_%8Fd%20%86%17%18%B1%60dM%0C8%F8%B4%0F%C4F%02%7Cx%18%E0%0B%40%06%5C%81H%C8%05%0D%D0%C0%ADg%60%60%E0%85%D2%FFq%05%222%E0%84*%ACB%12cEbWA%E59q%19%F0%0D%8B%26%06%2C%86%7D%A3J%2C0%0E%FD%CC%04%18%00%B2%B8%1B*%E7%A5A%1D%00%00%00%00IEND%AEB%60%82") !important;
			background-color: transparent;
			background-repeat: no-repeat;
		}
		.open .ts-mute i {
			background-image:url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AMiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSwX%93%F7%16%3E%DF%F7e%0FVB%D8%F0%B1%97l%81%00%22%23%AC%08%C8%10Y%A2%10%92%00a%84%10%12%40%C5%85%88%0AV%14%15%11%9CHU%C4%82%D5%0AH%9D%88%E2%A0(%B8gA%8A%88Z%8BU%5C8%EE%1F%DC%A7%B5%7Dz%EF%ED%ED%FB%D7%FB%BC%E7%9C%E7%FC%CEy%CF%0F%80%11%12%26%91%E6%A2j%009R%85%3C%3A%D8%1F%8FOH%C4%C9%BD%80%02%15H%E0%04%20%10%E6%CB%C2g%05%C5%00%00%F0%03yx~t%B0%3F%FC%01%AFo%00%02%00p%D5.%24%12%C7%E1%FF%83%BAP%26W%00%20%91%00%E0%22%12%E7%0B%01%90R%00%C8.T%C8%14%00%C8%18%00%B0S%B3d%0A%00%94%00%00ly%7CB%22%00%AA%0D%00%EC%F4I%3E%05%00%D8%A9%93%DC%17%00%D8%A2%1C%A9%08%00%8D%01%00%99(G%24%02%40%BB%00%60U%81R%2C%02%C0%C2%00%A0%AC%40%22.%04%C0%AE%01%80Y%B62G%02%80%BD%05%00v%8EX%90%0F%40%60%00%80%99B%2C%CC%00%208%02%00C%1E%13%CD%03%20L%03%A00%D2%BF%E0%A9_p%85%B8H%01%00%C0%CB%95%CD%97K%D23%14%B8%95%D0%1Aw%F2%F0%E0%E2!%E2%C2l%B1Ba%17)%10f%09%E4%22%9C%97%9B%23%13H%E7%03L%CE%0C%00%00%1A%F9%D1%C1%FE8%3F%90%E7%E6%E4%E1%E6f%E7l%EF%F4%C5%A2%FEk%F0o%22%3E!%F1%DF%FE%BC%8C%02%04%00%10N%CF%EF%DA_%E5%E5%D6%03p%C7%01%B0u%BFk%A9%5B%00%DAV%00h%DF%F9%5D3%DB%09%A0Z%0A%D0z%F9%8By8%FC%40%1E%9E%A1P%C8%3C%1D%1C%0A%0B%0B%ED%25b%A1%BD0%E3%8B%3E%FF3%E1o%E0%8B~%F6%FC%40%1E%FE%DBz%F0%00q%9A%40%99%AD%C0%A3%83%FDqanv%AER%8E%E7%CB%04B1n%F7%E7%23%FE%C7%85%7F%FD%8E)%D1%E24%B1%5C%2C%15%8A%F1X%89%B8P%22M%C7y%B9R%91D!%C9%95%E2%12%E9%7F2%F1%1F%96%FD%09%93w%0D%00%AC%86O%C0N%B6%07%B5%CBl%C0~%EE%01%02%8B%0EX%D2v%00%40~%F3-%8C%1A%0B%91%00%10g42y%F7%00%00%93%BF%F9%8F%40%2B%01%00%CD%97%A4%E3%00%00%BC%E8%18%5C%A8%94%17L%C6%08%00%00D%A0%81*%B0A%07%0C%C1%14%AC%C0%0E%9C%C1%1D%BC%C0%17%02a%06D%40%0C%24%C0%3C%10B%06%E4%80%1C%0A%A1%18%96A%19T%C0%3A%D8%04%B5%B0%03%1A%A0%11%9A%E1%10%B4%C118%0D%E7%E0%12%5C%81%EBp%17%06%60%18%9E%C2%18%BC%86%09%04A%C8%08%13a!%3A%88%11b%8E%D8%22%CE%08%17%99%8E%04%22aH4%92%80%A4%20%E9%88%14Q%22%C5%C8r%A4%02%A9Bj%91%5DH%23%F2-r%149%8D%5C%40%FA%90%DB%C8%202%8A%FC%8A%BCG1%94%81%B2Q%03%D4%02u%40%B9%A8%1F%1A%8A%C6%A0s%D1t4%0F%5D%80%96%A2k%D1%1A%B4%1E%3D%80%B6%A2%A7%D1K%E8ut%00%7D%8A%8Ec%80%D11%0Ef%8C%D9a%5C%8C%87E%60%89X%1A%26%C7%16c%E5X5V%8F5c%1DX7v%15%1B%C0%9Ea%EF%08%24%02%8B%80%13%EC%08%5E%84%10%C2l%82%90%90GXLXC%A8%25%EC%23%B4%12%BA%08W%09%83%841%C2'%22%93%A8O%B4%25z%12%F9%C4xb%3A%B1%90XF%AC%26%EE!%1E!%9E%25%5E'%0E%13_%93H%24%0E%C9%92%E4N%0A!%25%902I%0BIkH%DBH-%A4S%A4%3E%D2%10i%9CL%26%EB%90m%C9%DE%E4%08%B2%80%AC%20%97%91%B7%90%0F%90O%92%FB%C9%C3%E4%B7%14%3A%C5%88%E2L%09%A2%24R%A4%94%12J5e%3F%E5%04%A5%9F2B%99%A0%AAQ%CD%A9%9E%D4%08%AA%88%3A%9FZIm%A0vP%2FS%87%A9%134u%9A%25%CD%9B%16C%CB%A4-%A3%D5%D0%9Aigi%F7h%2F%E9t%BA%09%DD%83%1EE%97%D0%97%D2k%E8%07%E9%E7%E9%83%F4w%0C%0D%86%0D%83%C7Hb(%19k%19%7B%19%A7%18%B7%19%2F%99L%A6%05%D3%97%99%C8T0%D72%1B%99g%98%0F%98oUX*%F6*%7C%15%91%CA%12%95%3A%95V%95~%95%E7%AATUsU%3F%D5y%AA%0BT%ABU%0F%AB%5EV%7D%A6FU%B3P%E3%A9%09%D4%16%AB%D5%A9%1DU%BB%A96%AE%CERwR%8FP%CFQ_%A3%BE_%FD%82%FAc%0D%B2%86%85F%A0%86H%A3Tc%B7%C6%19%8D!%16%C62e%F1XB%D6rV%03%EB%2Ck%98Mb%5B%B2%F9%ECLv%05%FB%1Bv%2F%7BLSCs%AAf%ACf%91f%9D%E6q%CD%01%0E%C6%B1%E0%F09%D9%9CJ%CE!%CE%0D%CE%7B-%03-%3F-%B1%D6j%ADf%AD~%AD7%DAz%DA%BE%DAb%EDr%ED%16%ED%EB%DA%EFup%9D%40%9D%2C%9D%F5%3Am%3A%F7u%09%BA6%BAQ%BA%85%BA%DBu%CF%EA%3E%D3c%EBy%E9%09%F5%CA%F5%0E%E9%DD%D1G%F5m%F4%A3%F5%17%EA%EF%D6%EF%D1%1F704%086%90%19l18c%F0%CC%90c%E8k%98i%B8%D1%F0%84%E1%A8%11%CBh%BA%91%C4h%A3%D1I%A3'%B8%26%EE%87g%E35x%17%3Ef%ACo%1Cb%AC4%DEe%DCk%3Cabi2%DB%A4%C4%A4%C5%E4%BE)%CD%94k%9Af%BA%D1%B4%D3t%CC%CC%C8%2C%DC%AC%D8%AC%C9%EC%8E9%D5%9Ck%9Ea%BE%D9%BC%DB%FC%8D%85%A5E%9C%C5J%8B6%8B%C7%96%DA%96%7C%CB%05%96M%96%F7%AC%98V%3EVyV%F5V%D7%ACI%D6%5C%EB%2C%EBm%D6WlP%1BW%9B%0C%9B%3A%9B%CB%B6%A8%AD%9B%AD%C4v%9Bm%DF%14%E2%14%8F)%D2)%F5Sn%DA1%EC%FC%EC%0A%EC%9A%EC%06%ED9%F6a%F6%25%F6m%F6%CF%1D%CC%1C%12%1D%D6%3Bt%3B%7Crtu%CCvlp%BC%EB%A4%E14%C3%A9%C4%A9%C3%E9Wg%1Bg%A1s%9D%F35%17%A6K%90%CB%12%97v%97%17Sm%A7%8A%A7n%9Fz%CB%95%E5%1A%EE%BA%D2%B5%D3%F5%A3%9B%BB%9B%DC%AD%D9m%D4%DD%CC%3D%C5%7D%AB%FBM.%9B%1B%C9%5D%C3%3D%EFA%F4%F0%F7X%E2q%CC%E3%9D%A7%9B%A7%C2%F3%90%E7%2F%5Ev%5EY%5E%FB%BD%1EO%B3%9C%26%9E%D60m%C8%DB%C4%5B%E0%BD%CB%7B%60%3A%3E%3De%FA%CE%E9%03%3E%C6%3E%02%9Fz%9F%87%BE%A6%BE%22%DF%3D%BE%23~%D6~%99~%07%FC%9E%FB%3B%FA%CB%FD%8F%F8%BF%E1y%F2%16%F1N%05%60%01%C1%01%E5%01%BD%81%1A%81%B3%03k%03%1F%04%99%04%A5%075%05%8D%05%BB%06%2F%0C%3E%15B%0C%09%0DY%1Fr%93o%C0%17%F2%1B%F9c3%DCg%2C%9A%D1%15%CA%08%9D%15Z%1B%FA0%CC%26L%1E%D6%11%8E%86%CF%08%DF%10~o%A6%F9L%E9%CC%B6%08%88%E0Gl%88%B8%1Fi%19%99%17%F9%7D%14)*2%AA.%EAQ%B4Stqt%F7%2C%D6%AC%E4Y%FBg%BD%8E%F1%8F%A9%8C%B9%3B%DBj%B6rvg%ACjlRlc%EC%9B%B8%80%B8%AA%B8%81x%87%F8E%F1%97%12t%13%24%09%ED%89%E4%C4%D8%C4%3D%89%E3s%02%E7l%9A3%9C%E4%9AT%96tc%AE%E5%DC%A2%B9%17%E6%E9%CE%CB%9Ew%3CY5Y%90%7C8%85%98%12%97%B2%3F%E5%83%20BP%2F%18O%E5%A7nM%1D%13%F2%84%9B%85OE%BE%A2%8D%A2Q%B1%B7%B8J%3C%92%E6%9DV%95%F68%DD%3B%7DC%FAh%86OFu%C63%09OR%2By%91%19%92%B9%23%F3MVD%D6%DE%AC%CF%D9q%D9-9%94%9C%94%9C%A3R%0Di%96%B4%2B%D70%B7(%B7Of%2B%2B%93%0D%E4y%E6m%CA%1B%93%87%CA%F7%E4%23%F9s%F3%DB%15l%85L%D1%A3%B4R%AEP%0E%16L%2F%A8%2Bx%5B%18%5Bx%B8H%BDHZ%D43%DFf%FE%EA%F9%23%0B%82%16%7C%BD%90%B0P%B8%B0%B3%D8%B8xY%F1%E0%22%BFE%BB%16%23%8BS%17w.1%5DR%BAdxi%F0%D2%7D%CBh%CB%B2%96%FDP%E2XRU%F2jy%DC%F2%8ER%83%D2%A5%A5C%2B%82W4%95%A9%94%C9%CBn%AE%F4Z%B9c%15a%95dU%EFj%97%D5%5BV%7F*%17%95_%ACp%AC%A8%AE%F8%B0F%B8%E6%E2WN_%D5%7C%F5ym%DA%DA%DEJ%B7%CA%ED%EBH%EB%A4%EBn%AC%F7Y%BF%AFJ%BDjA%D5%D0%86%F0%0D%AD%1B%F1%8D%E5%1B_mJ%DEt%A1zj%F5%8E%CD%B4%CD%CA%CD%035a5%ED%5B%CC%B6%AC%DB%F2%A16%A3%F6z%9D%7F%5D%CBV%FD%AD%AB%B7%BE%D9%26%DA%D6%BF%DDw%7B%F3%0E%83%1D%15%3B%DE%EF%94%EC%BC%B5%2BxWk%BDE%7D%F5n%D2%EE%82%DD%8F%1Ab%1B%BA%BF%E6~%DD%B8GwO%C5%9E%8F%7B%A5%7B%07%F6E%EF%EBjtol%DC%AF%BF%BF%B2%09mR6%8D%1EH%3Ap%E5%9B%80o%DA%9B%ED%9Aw%B5pZ*%0E%C2A%E5%C1'%DF%A6%7C%7B%E3P%E8%A1%CE%C3%DC%C3%CD%DF%99%7F%B7%F5%08%EBHy%2B%D2%3A%BFu%AC-%A3m%A0%3D%A1%BD%EF%E8%8C%A3%9D%1D%5E%1DG%BE%B7%FF~%EF1%E3cu%C75%8FW%9E%A0%9D(%3D%F1%F9%E4%82%93%E3%A7d%A7%9E%9DN%3F%3D%D4%99%DCy%F7L%FC%99k%5DQ%5D%BDgC%CF%9E%3F%17t%EEL%B7_%F7%C9%F3%DE%E7%8F%5D%F0%BCp%F4%22%F7b%DB%25%B7K%AD%3D%AE%3DG~p%FD%E1H%AF%5Bo%EBe%F7%CB%EDW%3C%AEt%F4M%EB%3B%D1%EF%D3%7F%FAj%C0%D5s%D7%F8%D7.%5D%9Fy%BD%EF%C6%EC%1B%B7n%26%DD%1C%B8%25%BA%F5%F8v%F6%ED%17w%0A%EEL%DC%5Dz%8Fx%AF%FC%BE%DA%FD%EA%07%FA%0F%EA%7F%B4%FE%B1e%C0m%E0%F8%60%C0%60%CF%C3Y%0F%EF%0E%09%87%9E%FE%94%FF%D3%87%E1%D2G%CCG%D5%23F%23%8D%8F%9D%1F%1F%1B%0D%1A%BD%F2d%CE%93%E1%A7%B2%A7%13%CF%CA~V%FFy%EBs%AB%E7%DF%FD%E2%FBK%CFX%FC%D8%F0%0B%F9%8B%CF%BF%AEy%A9%F3r%EF%AB%A9%AF%3A%C7%23%C7%1F%BC%CEy%3D%F1%A6%FC%AD%CE%DB%7D%EF%B8%EF%BA%DF%C7%BD%1F%99(%FC%40%FEP%F3%D1%FAc%C7%A7%D0O%F7%3E%E7%7C%FE%FC%2F%F7%84%F3%FB%25%D2%9F3%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%00%8AIDATx%DAb%FC%FF%FF%3F%03%25%80%89%81B%40%B1%01%2C%0C%0C%0C%0C%E2%0B%AF%E0S%D3%C0%C0%C0%90%CB%C0%C00%19%CA%86%83%97%F1%3A%10%03%18%18%18%B0%05%04%23TC%3D%94_%8Fd%20%86%17%18%B1%60dM%0C8%F8%B4%0F%C4F%02%7Cx%18%E0%0B%40%06%5C%81H%C8%05%0D%D0%C0%ADg%60%60%E0%85%D2%FFq%05%222%E0%84*%ACB%12cEbWA%E59q%19%F0%0D%8B%26%06%2C%86%7D%A3J%2C0%0E%FD%CC%04%18%00%B2%B8%1B*%E7%A5A%1D%00%00%00%00IEND%AEB%60%82") !important;
			background-color: #FFF !important;
		}
		/*--icon via http://translate.google.com/--*/
		.tweet-actions .ts-evernote i {
			background-image:url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%01%3DIDATx%DA%9C%D2%B1K%DE%40%18%C7%F1%CF%5B%8A%1D*T%5C29H'!K%3B89%B9%B8%B4S7%11%02%16%14%1C%5D%0A%0E%0E%1D*8%F8%07%88K%16Q%DC%DA%CD%C5I%8A%83%88%18E%A9%5D%C4R%E2%A0(%88H%91%B7%83%17%BC7*%BE%F8%85%E3%B9%E7%92%7C%EF%F8%E5%1A%CDfS%92%17%CA%2C%95%E4E%07%86q%8DE%B7%FCF%3FN%D5(%B3%D4%CB%DA%DAO%BC%0F%92%8A%B7%98%C7r%10%9F%60%1BW%B8%13%24y1%1D%3E%3Ep%9FOa%C4%0C%60%BD%12%BC%C3%AFh%E7EO%F39%16%7C%C0W%CF%E0E%A8%BD%9EI%258n%E3%DD%1B%CC%3C%268jC0%5Bf%E9T%5DRe%B0%D5%86%602%C9%8B%11t%87%FE_%7C%82%CD0%EAl%60'%CC_%A1%07%AFC%7F%16%0B%20%C3ZM%F0%1D%A38%ACv%8C%F8%D3%22(%B3t%B7%CC%D2Atb%083e%96~%C3%25%C6%D0%85%1F%91%E0o%CBM%8CD%97X%C5j%92%17%7D%D8%0B%8F%1AX%C0%C7%D0%17%F5%AB%FCPp%E3%A1V%C1%BD%892%DB%7F%F0%045%CEC%FD%82%8B%90%13%AC%D4%7F%E3c%2Ca%22%08*%D61W5%FF%07%00%FBXL*%B1P%3A%8F%00%00%00%00IEND%AEB%60%82") !important;
			background-color: transparent;
			background-repeat: no-repeat;
			width:15px;
			height:15px;
		}
		.simple-tweet .tweet-actions .ts-evernote i {
			background-image:url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%01%1FIDATx%DA%9C%D2%B1K%5CA%10%80%F1%DF%05%89E%04%C5%DEB%AC%2C%B5Hee%93F%2B%3B%11%04%85%13%2Cm%04%0B%8B%14%0A%16%FE%01Gj1%A4%D3%CE%C6%EA%10%0B%11QC%24%B1%11%25%90B%89p%88%88%9C%CD%2C%AC%AB%87%87%1F%0C%F3f%D9%FDv%DE%BCWi6%9Bj%B5%9A%E0%23%26q%8F%8DX%3B%C7g%5C%2B%A8V%AB%3A%8A%B5%3D%0C%87%241%80%1A%BE%87%F8%1F%8Ep%87g%82%E58%7C%E6%25%13%119%23%A8'%C1%10~g7ox%9B%D9%5C0%86%AF%DE%C1%87%C8%FD%DEI%12%5C%B6%B1%F7%11%AB%AD%04%17m%08%D6%B0TJ%D2%0C%0E%DB%10%2C%60%0A%BDQ%3F%E4%1D%1CD%94%EC%E38%9E%3B%D1%87OQ%DF%E4%02%98%C6n!%D8%C2%0C%FE%A4%1B3%AEJ%C1)F%D1%85%2F%F1%AE%2Bh%A0%8A%1Elg%FB%FF%96%7Fb%A2%81%9D%88A%FC%8C%F5%0A%BEa%3C%EA%93%B2%83%D7%98%8B%9C%06%D7%9D%CD%ECW%AB%0Er%FEG%5E%C4m%CC%09~%94%9F%B1%15%9B%98%0FA%A2%8E%F5T%3C%0D%00%81A%3B%B4%2C%D9oJ%00%00%00%00IEND%AEB%60%82") !important;
			background-color: #F6F6F6 !important;
			background-repeat: no-repeat;
			width:15px;
			height:15px;
		}
		.tweet-actions .ts-evernote:hover i {
			background-image:url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%01%3DIDATx%DA%9C%D2%B1K%DE%40%18%C7%F1%CF%5B%8A%1D*T%5C29H'!K%3B89%B9%B8%B4S7%11%02%16%14%1C%5D%0A%0E%0E%1D*8%F8%07%88K%16Q%DC%DA%CD%C5I%8A%83%88%18E%A9%5D%C4R%E2%A0(%88H%91%B7%83%17%BC7*%BE%F8%85%E3%B9%E7%92%7C%EF%F8%E5%1A%CDfS%92%17%CA%2C%95%E4E%07%86q%8DE%B7%FCF%3FN%D5(%B3%D4%CB%DA%DAO%BC%0F%92%8A%B7%98%C7r%10%9F%60%1BW%B8%13%24y1%1D%3E%3Ep%9FOa%C4%0C%60%BD%12%BC%C3%AFh%E7EO%F39%16%7C%C0W%CF%E0E%A8%BD%9EI%258n%E3%DD%1B%CC%3C%268jC0%5Bf%E9T%5DRe%B0%D5%86%602%C9%8B%11t%87%FE_%7C%82%CD0%EAl%60'%CC_%A1%07%AFC%7F%16%0B%20%C3ZM%F0%1D%A38%ACv%8C%F8%D3%22(%B3t%B7%CC%D2Atb%083e%96~%C3%25%C6%D0%85%1F%91%E0o%CBM%8CD%97X%C5j%92%17%7D%D8%0B%8F%1AX%C0%C7%D0%17%F5%AB%FCPp%E3%A1V%C1%BD%892%DB%7F%F0%045%CEC%FD%82%8B%90%13%AC%D4%7F%E3c%2Ca%22%08*%D61W5%FF%07%00%FBXL*%B1P%3A%8F%00%00%00%00IEND%AEB%60%82") !important;
			background-color: transparent;
			background-repeat: no-repeat;
		}
		.open .ts-evernote i {
			background-image:url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%01%3DIDATx%DA%9C%D2%B1K%DE%40%18%C7%F1%CF%5B%8A%1D*T%5C29H'!K%3B89%B9%B8%B4S7%11%02%16%14%1C%5D%0A%0E%0E%1D*8%F8%07%88K%16Q%DC%DA%CD%C5I%8A%83%88%18E%A9%5D%C4R%E2%A0(%88H%91%B7%83%17%BC7*%BE%F8%85%E3%B9%E7%92%7C%EF%F8%E5%1A%CDfS%92%17%CA%2C%95%E4E%07%86q%8DE%B7%FCF%3FN%D5(%B3%D4%CB%DA%DAO%BC%0F%92%8A%B7%98%C7r%10%9F%60%1BW%B8%13%24y1%1D%3E%3Ep%9FOa%C4%0C%60%BD%12%BC%C3%AFh%E7EO%F39%16%7C%C0W%CF%E0E%A8%BD%9EI%258n%E3%DD%1B%CC%3C%268jC0%5Bf%E9T%5DRe%B0%D5%86%602%C9%8B%11t%87%FE_%7C%82%CD0%EAl%60'%CC_%A1%07%AFC%7F%16%0B%20%C3ZM%F0%1D%A38%ACv%8C%F8%D3%22(%B3t%B7%CC%D2Atb%083e%96~%C3%25%C6%D0%85%1F%91%E0o%CBM%8CD%97X%C5j%92%17%7D%D8%0B%8F%1AX%C0%C7%D0%17%F5%AB%FCPp%E3%A1V%C1%BD%892%DB%7F%F0%045%CEC%FD%82%8B%90%13%AC%D4%7F%E3c%2Ca%22%08*%D61W5%FF%07%00%FBXL*%B1P%3A%8F%00%00%00%00IEND%AEB%60%82") !important;
			background-color: #FFF !important;
			background-repeat: no-repeat;
		}
		.simple-tweet .tweet-actions {
			background-image:url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%02%08%00%00%00%14%08%04%00%00%00B~%0D!%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%00%ADIDATx%DA%EC%D7%BDn%830%18%40%D1%0B!%3F%90%F7%7F%D2n%0D%81%0C%89%BA0w%A8z%CEd%CB%9B%25_%F9%1B%BE.%DD%9A%BB5w%EF%DE%D2%D2%FD%B3z%EF%96%E6%E6%AE%DD%BAv%ED%D2%A5%A9sS%A7N%9D%1A%1B%1B%1A%1A%AA!%E0O%1B%5D%01%20%08%C0%C1%D4%D6%D6%DE%D6%D6%D6%DA%B3g%CF%D6%1E%AD%AD%7Dw%EE%D1%F43%1A%8C%87%E1%60o%FF%9C%BC%19%1B%E0_%FC%10%3Cu%10%04%40%10%8Ev%97%05%82%60d%00A%00%04%01%10%04%00A%00%04%01%10%04%40%10%00A%00%04%01%10%04%40%10%00A%00~%C1%0B%00%00%FF%FF%03%00%5C%24%15%03%ACB%CD%04%00%00%00%00IEND%AEB%60%82") !important;
			background-position:0 0 !important;
		}
		/*
		.tweet-actions {
			background-image:url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%02%08%00%00%00%14%08%04%00%00%00B~%0D!%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%00%ACIDATx%DA%EC%D79n%C30%14%40%C1'Y%5Ed%DD%FF%B2%B1%96%146%D2%A8N%11d%A6%22%C1%8E%00%1F%F8%87%E3%D6%A3%B9GsKK%CF%9E-%9F%D5%7B%F7ln%EE%DE%A3%7B%F7n%DD%9A%BA6u%E9%D2%A5%B1%B1%A1%A1%A1%1A%02%FE%B4%D1%15%00%82%00%9CL%ED%ED%1D%ED%ED%ED%ADmmm%AD%BDZ%5B%FB%EA%DA%AB%E9g4%18O%C3%C1%D1%F19y36%C0%BF%F8!x%EA%20%08%80%20%9C%1D.%0B%04%C1%C8%00%82%00%08%02%20%08%00%82%00%08%02%20%08%80%20%00%82%00%08%02%20%08%80%20%00%82%00%FC%82o%00%00%00%FF%FF%03%00%2CD%15%0F%26%3FM%12%00%00%00%00IEND%AEB%60%82") !important;
			background-position:0 0 !important;
		}
		*/
		#ts_filter_form{
			margin:6px 0 0 0;
		}
		#ts_filter_list ol{
			width: 289px;
			margin:0;
			overflow:auto;
			padding:0;
		}
		#ts_filter_list ol li{
			float:left;
			width: 45%;
			vertical-align:middle;
			display:block;
			line-height:22px;
			color:#5A7B80;
			padding-right:10px;
		}
		#ts_filter .glass{
			display:block;
			position:absolute;
			cursor:pointer;
			display:block;
			right:20px;
			padding:6px 0px;
		}
		#ts_filter .glass i{
			background-image:url(http://s.twimg.com/a/1291318259/phoenix/img/sprite-icons.png);
			width:14px;
			height:14px;
			background-position:-64px -16px;
			display:block;
		}
		#ts_add_filter{
			border:1px solid #CCCCCC;
			-moz-border-radius:4px;
			-webkit-border-radius:4px;
			font:12px Arial,sans-serif;
			padding:6px 6px 4px 6px;
			background:#FFFFFF;
			width: 260px;
		}
		.ts-filter-li label{
			float:left;
		}
		i.ts_remove{
			margin-top: 5px;
			float:right;
		}
		.highlight1{
			background-color: #F2DD79;
		}
		.highlight2{
			background-color: #F5E489;
		}
		.highlight3{
			background-color: #FEF8B6;
		}
		.highlight4{
			background-color: transparent;
		}
		#ts_setting_dialog {
		    z-index: 1600;
		    position: absolute;
		    border: 5px solid #1D2224;
		    background-color: #F5F5F5;
		    text-align:left;
		    padding:15px;
		    line-height: 20px;
		}
		ul.ts_tab_menu {
			background-color: #F5F5F5;
			margin: 0;
			padding: 0;
			float: left;
			list-style: none;
			height: 24px; /*--Set height of ts_tab_menu--*/
			border-bottom: 1px solid #999;
			border-left: 1px solid #999;
			border-right: 1px solid #fff;
			width: 100%;
		}
		ul.ts_tab_menu li {
			float: left;
			margin: 0;
			padding: 0;
			height: 23px; /*--Subtract 1px from the height of the unordered list--*/
			line-height: 23px; /*--Vertically aligns the text within the tab--*/
			border: 1px solid #999;
			border-left: none;
			margin-bottom: -1px; /*--Pull the list item down 1px--*/
			overflow: hidden;
			position: relative;
			background: #e0e0e0;
		}
		ul.ts_tab_menu li a {
			text-decoration: none;
			color: #000;
			display: block;
			font-size: 1.2em;
			padding: 0 20px;
			border: 1px solid #fff; /*--Gives the bevel look with a 1px white border inside the list item--*/
			outline: none;
		}
		ul.ts_tab_menu li a:hover {
			background: #ccc;
		}
		html ul.ts_tab_menu li.active, html ul.ts_tab_menu li.active a:hover  { /*--Makes sure that the active tab does not listen to the hover properties--*/
			background: #fff;
			border-bottom: 1px solid #fff; /*--Makes the active tab look like it's connected with its content--*/
		}
		.tab_container {
			border: 1px solid #999;
			margin-top: 8px;
			width: 100%;
			background: #fff;
			margin-bottom: 10px;
		}
		.tab_container input, .tab_container select{
			border: 1px solid #999;
		}
		.tab_content {
			padding: 30px 10px 10px 20px;
		}
		.tab_button{
			text-align: right;
		}
		.bio {
			font-style:normal !important;
		}
		.user-description {
			font-style:normal !important;
		}
		.js-tweet-text-large {
			font-size: 16px !important;
			line-height:20px !important;
		}
		]]></r>).toString());
		return true;
	}//-------------- end customCSS() -------------------
	
	//-------------- customUI() --------------
	function customUI(){
	    // 配置对话框
	    $('<div id="ts_setting_dialog"> <ul  class="ts_tab_menu">' +
			' <li><a href="#Features">Features</a></li>' +
			' <li><a href="#UI">UI</a></li>' +
			' <li><a href="#Alert">Alert</a></li>' +
			'</ul>' +
			'<div class="tab_container">' +
				'<div id="Features" class="tab_content">' +
				'<label><input type="checkbox" name="enableShortcuts" id="enableShortcuts" /> Override Twitter\'s Shortcuts (Press F5 to reload)</label>' +
				'<label><input type="checkbox" name="enableAutoRefresh" id="enableAutoRefresh" /> Auto refresh (Press F5 to reload)</label>' +
				'<label><input type="checkbox" name="enableAutoScroll" id="enableAutoScroll" /> After refreshing, auto scroll down</label>' +
				'  Stop check last visit, if pages &gt;<input type="text" name="checkMaxTimes" id="checkMaxTimes" style="width: 35px;" /><br />' +
				'</div>' +
				'<div id="UI" class="tab_content">' +
				'<label><input type="checkbox" name="hideRT" id="hideRT" /> Hide Twittsevn&acute;s &quot;Retweet&quot; button (Press F5 to reload)</label>' +
				'<label><input type="checkbox" name="hideMute" id="hideMute" /> Hide &quot;Mute&quot; (Press F5 to reload)</label>' +
				'<label><input type="checkbox" name="hideEvernote" id="hideEvernote" /> Hide &quot;Evernote&quot; (Press F5 to reload)</label>' +
				'<label><input type="checkbox" name="hideActionBarTooltips" id="hideActionBarTooltips" /> Hide Action Bar\'s Tooltips. (Press F5 to reload)</label>' +
				'<label><input type="checkbox" name="exchangeUsernameAndFullname" id="exchangeUsernameAndFullname" /> Exchange username and fullname</label>' +
				'</div>' +
				'<div id="Alert" class="tab_content">' +
				'Remind me, if I will be reach my <input type="text" name="remindTheTweet" id="remindTheTweet" style="width: 35px;"/> tweets' +
				'</div>' +
			'</div><div class="tab_button"><input type="button" name="ts_Save" id="ts_Save" value="Save" class="btn primary-btn"/>&nbsp;&nbsp;&nbsp;<input type="button" name="ts_Cancel" id="ts_Cancel" value="Cancel" class="button"/></div></div>').appendTo('body').hide();
		//插入配置按钮
	    $('ul.dropdown-menu li:eq(7)').before('<li class="divider"></li><li><a href="javascript:void 0;" id="ts_setting">TwittSeven plus</a></li>');

	    return true;
	}//-------------- end customUI() --------------
	
	//-------------- newTweets() --------------
	function newTweets(){
		//自动点击 XX new tweets 按钮
		if(enableAutoRefresh === 'true'){
			$(window).load(function() {
				var intervalId = setInterval(function() {
					if($('.new-tweets-bar'))
						$('.new-tweets-bar').trigger('click');
				}, 50);
			});
		}
		//XX new tweets 按钮被点击后
		$('.new-tweets-bar').live('click', function() {
			//如果在首页，记录一下 lastid
			if($('#global-nav-home').hasClass("active")){
				lastid = getLastId();
				//写入 Cookie
				setCookie('ts_last', getLastId(), 60 * 60 * 24 * 15);
			}
			
			var scrollTo = 0, currentTop = $(window).scrollTop();
			
			//如果不存在 LastTweet 就把时间线的第一条推加上 LastTweet 属性
			if(!$('.LastTweet'))
				$('#stream-items-id .stream-item:first').addClass('LastTweet');
			// 把时间线上的推加上未读标记
			$('.LastTweet').prevAll().each(function(){
				$(this).addClass('ts-unread');
				$(this).find($('.my-tweet')).parent().removeClass('ts-unread');
				if(enableAutoScroll === 'true' && $('.twitter-anywhere-tweet-box-editor:focus').attr("class") == undefined)
						scrollTo = scrollTo + $(this).outerHeight();

				var ts_current_tweet=$(this);
				// 检查一下 mute 列表
				$('#ts-mute a').each(function(){
					if($(this).html()==ts_current_tweet.find('.tweet-screen-name').html()){
						ts_current_tweet.remove();
						return false
					}
				});
				// 检查过滤 filter 列表
				$('#ts_filter_list input:checked').each(function(){
					if(ts_current_tweet.find('.js-tweet-text').html() == null)
						return
					if(ts_current_tweet.find('.js-tweet-text').html().indexOf($(this).next().html()) !== -1){
						ts_current_tweet.remove();
						return false
					}
				});
			});
			$(window).scrollTop(currentTop + scrollTo);
			updateClass();
			checkUnread();
		});
		return true
	}//-------------- end newTweets() --------------
	
	//-------------- bindEvents() --------------
	function bindEvents()
	{
		//  TS+ 设置对话框的按钮事件。
		$('#ts_setting').click(function(e){
	    	if($('#ts_setting_dialog').is(":hidden")){
				var offset = $(this).offset();
				$('#ts_setting_dialog').css({'left':offset.left / 2 - 50, 'top':offset.top - 185}).fadeIn();
				if(hideRT === 'true') document.getElementById('hideRT').checked = true;
				if(hideMute === 'true') document.getElementById('hideMute').checked = true;
				if(hideEvernote === 'true') document.getElementById('hideEvernote').checked = true;
				if(hideActionBarTooltips === 'true') document.getElementById('hideActionBarTooltips').checked = true;
				if(enableShortcuts === 'true') document.getElementById('enableShortcuts').checked = true;
				if(enableAutoRefresh === 'true') document.getElementById('enableAutoRefresh').checked = true;
				if(enableAutoScroll === 'true') document.getElementById('enableAutoScroll').checked = true;
				if(exchangeUsernameAndFullname === 'true') document.getElementById('exchangeUsernameAndFullname').checked = true;
				$('#checkMaxTimes').val(checkMaxTimes);
				$('#langTo option[value|=' + langTo + ']').attr('selected', 'selected');
				$('#remindTheTweet').val(remindTheTweet);
				$(".tab_content").hide();
				$("ul.ts_tab_menu li:first").addClass("active").show();
				$(".tab_content:first").show();
			}else{
				$("ul.ts_tab_menu li").removeClass("active");
				$('#ts_setting_dialog').fadeOut();
			}
		});
		$("ul.ts_tab_menu li").click(function() {
			$("ul.ts_tab_menu li").removeClass("active");
			$(this).addClass("active");
			$(".tab_content").hide();
			var activeTab = $(this).find("a").attr("href");
			$(activeTab).fadeIn();
			return false;
		});
		$('#ts_Save').click(function(){
			$('#ts_setting_dialog').hide();
			updateSetting();
		});
		$('#ts_Cancel').click(function(){
			$('#ts_setting_dialog').hide();
		});//  TS+ 设置对话框的按钮事件结束。
		
		// 判断首页
		// var isHome = false;
		$(document).bind('DOMNodeRemoved', function(event) {
			if(!$('#global-nav-home').hasClass("active")){
				// 在 connect 或者搜索页面
				if(event.target.className.indexOf("stream-loading") !== -1){
					if($('.ts-mute-component').html() == null){
						//插入 mute list
						$('.dashboard .component:first').after('<div class="component ts-mute-component"><div class="module"><div class="flex-module"><div class="flex-module-header"><h3>Muted List</h3></div><div data-section-id="wtf" class="js-recommended-followers flex-module-inner"><div id="ts-mute"></div></div></div></div></div>');
						$('.ts-mute-component').hide();
					}
					//插入过滤功能
					if($('#ts_filter').html() == null){
						$('.ts-mute-component').after('<div class="component" ><div id="ts_filter"><div class="module"><div class="flex-module"><div class="flex-module-header"><h3>Filter: </h3> <form id="ts_filter_form" action="javascript:void 0;"><span><span class="glass" id="ts_filter_button"><i></i></span><input type="text" id="ts_add_filter" size="45"/></span></form></div><div data-section-id="wtf" class="js-recommended-followers flex-module-inner">' +
							'<div id="ts_filter_list"><ol>' + filteList + '</ol></div>'+
							'</div></div></div></div>');
						if(filteList == '')
							$('#ts_filter_list').hide();
						
						//过滤时间线上的推。
						$('.js-tweet-text').each(function(){
							var ts_current_tweet=$(this);
							// 检查过滤 filter 列表
							$('#ts_filter_list input:checked').each(function(){
								if(ts_current_tweet.html().indexOf($(this).next().html()) !== -1){
									ts_current_tweet.parent().parent().remove();
									return false
								}
							});
						});
						updateClass();
					}
				}
			}

			//翻页或者tweet载入完毕会触发这个事件
			if(event.target.className.indexOf("stream-loading") !== -1){
				// 继续自动翻页
				if($('#global-nav-home').hasClass("active")){
					gotoLastView();
				}

				$('.olddestTweet').nextAll().each(function(){
					var ts_current_tweet=$(this);
					// 检查一下 mute 列表
					$('#ts-mute a').each(function(){
						if($(this).html()==ts_current_tweet.find('.username b').html()){
							ts_current_tweet.remove();
							return false
						}
					});
					// 检查过滤 filter 列表
					$('#ts_filter_list input:checked').each(function(){
						if(ts_current_tweet.find('.js-tweet-text').html().indexOf($(this).next().html()) !== -1){
							ts_current_tweet.remove();
							return false
						}
					});
				});
				updateClass();
			}
		}).bind('DOMNodeInserted', function(event) {
			if(event.target.className.indexOf("trends") !== -1){
				// 开始自动翻页
				if($('#global-nav-home').hasClass("active")){
					gotoLastView();
				}
				if($('.ts-mute-component').html() == null){
					//在首页插入 mute list
					$('.dashboard .component:eq(2)').after('<div class="component ts-mute-component"><div class="module"><div class="flex-module"><div class="flex-module-header"><h3>Muted List</h3></div><div data-section-id="wtf" class="js-recommended-followers flex-module-inner"><div id="ts-mute"></div></div></div></div></div>');
					$('.ts-mute-component').hide();
				}
				//插入过滤功能
				if($('#ts_filter').html() == null){
					$('.ts-mute-component').after('<div class="component" ><div id="ts_filter"><div class="module"><div class="flex-module"><div class="flex-module-header"><h3>Filter: </h3> <form id="ts_filter_form" action="javascript:void 0;"><span><span class="glass" id="ts_filter_button"><i></i></span><input type="text" id="ts_add_filter" size="45"/></span></form></div><div data-section-id="wtf" class="js-recommended-followers flex-module-inner">' +
						'<div id="ts_filter_list"><ol>' + filteList + '</ol></div>'+
						'</div></div></div></div>');
					if(filteList == '')
						$('#ts_filter_list').hide();

					//过滤时间线上的推。
					$('.js-tweet-text').each(function(){
						var ts_current_tweet=$(this);
						// 检查过滤 filter 列表
						$('#ts_filter_list input:checked').each(function(){
							if(ts_current_tweet.html().indexOf($(this).next().html()) !== -1){
								ts_current_tweet.parent().parent().remove();
								return false
							}
						});
					});
				}
				updateClass();
			}

			// 自动点击官方 retweet 按钮。
			if(event.target.className.indexOf("tweet twttr-dialog-reply-footer") !== -1){
				$('.js-prompt-ok').trigger('click');
			}

		});

		//如果提交成功，则删除掉原来的推。
			$('#message-drawer').bind('DOMNodeInserted', function(event) {
				if($('.delete-this-tweet')){
	            	$('.delete-this-tweet .js-action-del').trigger('click');
	            	$('.js-prompt-ok').trigger('click');
            	}
            	// 自动关闭各种不会自动消失的提示。
            	if($(this).find('.message-text').html().indexOf("Sorry! We did something wrong.") !== -1)
            		setTimeout(function(){
						$('.dismiss').trigger('click');
					}, 1200);
				if($(this).find('.message-text').html().indexOf("Whoops! Something went wrong.") !== -1)
            		setTimeout(function(){
						$('.dismiss').trigger('click');
					}, 1200);
				if($(this).find('.message-text').html().indexOf("Your account may not be allowed to perform this action.") !== -1)
            		setTimeout(function(){
						$('.dismiss').trigger('click');
					}, 1200);
				if($(this).find('.message-text').html().indexOf("Whoops! You already tweeted that") !== -1)
            		setTimeout(function(){
						$('.dismiss').trigger('click');
					}, 1200);
					
				// 如果是自己发的推，等待出现发送成功的信息一秒后记录到 cookie
				if($(this).find('.message-text').html().indexOf("Your Tweet has been sent!") !== -1)
					setTimeout(function(){
						updateClass();
					}, 1000);
			});
		//当鼠标悬浮在未读的推上
		$('.ts-unread').live('mouseover', function(){$(this).removeClass('ts-unread');ts_unread--;checkUnread();});

		// 展开的回复推，按钮的插入和 css 属性的控制。
//		$('.simple-tweet').live('click mouseover', function(){
//			$('.current-reply-to').removeClass("current-reply-to");
//			$(this).addClass("current-reply-to");
//		});

		// 时间线上的推，按钮的插入和 css 属性的控制。
		$('#stream-items-id .stream-item').live('mouseenter', function(){
			$('.currenttweet').removeClass('currenttweet');
			$(this).addClass('currenttweet');
			
			// 选中的当前推如果是展开状态就添加 ts-open
			$('.ts-open').removeClass('ts-open');
			if($('.currenttweet').hasClass("open"))
				$('.currenttweet').addClass('ts-open');
			
			//判断有没有按钮，没有就插入自定义按钮
			if(hideEvernote === 'false')
		    	$('.tweet-actions:not(:has(.ts-evernote))', $(this)).find('.action-fav-container').after(tsl);
			if(hideMute === 'false')
		    	$('.tweet-actions:not(:has(.ts-mute))', $(this)).find('.action-fav-container').after(mut);
		    if(hideRT === 'false')
				$('.tweet-actions:not(:has(.ts-ret)):has(.action-del-container:hidden)', $(this)).find('.action-fav-container').after(ret);
		    $('.tweet-actions:not(:has(.ts-edt)):has(.action-del-container:visible)', $(this)).find('.action-fav-container').after(edt);

		    // 转换 t.co 链接为正常链接
		    $(this).find('.js-tweet-text a.twitter-timeline-link').each(function() {
		    		if ($(this).attr('title') !== "")
						$(this).attr({href: $(this).attr('title').replace(/\/$/g,'')});
				});
		}).live('click', function(){
			$('.currenttweet').removeClass('currenttweet');
			$(this).addClass('currenttweet');
			
			// 选中的当前推如果是展开状态就添加 ts-open
			$('.ts-open').removeClass('ts-open');
			if($('.currenttweet').hasClass('open'))
				$('.currenttweet').addClass('ts-open');
			else
				$('.currenttweet').removeClass('ts-open');
		});

	    var uriRegex = /(http|https|ftp|mailto|tel)\:\/\/(?!(bit\.ly))[\d\w-]+(\.[\d\w-]+)*(?:(?:\/[^\s/]*))*/g
		$('.twitter-anywhere-tweet-box-editor').live('focus',function(e){
			//自动调整输入框
			if( $(this).data("focused") == undefined){
				$('.twitter-anywhere-tweet-box-editor').keydown(function (e) {
				    if ((e.ctrlKey || e.metaKey) && e.keyCode == 13) {
				    	$(this).blur();
				    	$(this).closest('div.tweet-box').find('a.tweet-button').trigger('click');
				    }
				});

			    $(this).autoResize({
				    // On resize:
				    onResize : function() {
				        $(this).css({opacity:0.8});
				    },
				    // After resize:
				    animateCallback : function() {
				        $(this).css({opacity:1});
				    },
				    // Quite slow animation:
				    animateDuration : 500,
				    // More extra space:
				    extraSpace : 18
				});
				$(this).data("focused", "focused");
			}
			if($('.tweet-count').html() !== null){
				//发推数到达特定数字的提醒。
				if(--remindTheTweet == $('.tweet-count').html().replace(/,/,'')){
					remindTheTweet++;
					twttr.showMessage("This will be your " + remindTheTweet +" tweets!");
				}else{remindTheTweet++;}
			}
		});

		// Retweet 按钮的动作
	    $('.ts-ret').live('mouseup', function(e){
	   		var ts_tweet_text = $('.currenttweet .js-tweet-text').html();
	   		var ts_tweet_screen_name = $('.currenttweet .username b').html();
		    	ts_tweet_text = ts_tweet_text.replace(/@<a[^\>]*>([^<]*)<\/a>/gi, '@$1');
		    	ts_tweet_text = ts_tweet_text.replace(/<hr>/gi, '\n\n' + 'RT @' + ts_tweet_screen_name + ' ');
		        ts_tweet_text = ts_tweet_text.replace(/<img[^>]*>/gi, '');
		        ts_tweet_text = ts_tweet_text.replace(/<a[^\>]*>(#[^<]*)<\/a>/gi, '$1');
		        ts_tweet_text = ts_tweet_text.replace(/<a[^\>]*href=\"([^\s]*)\"[^\>]*>[^<]*<\/a>/gi, '$1');
		        ts_tweet_text = ts_tweet_text.replace(/<[^>]*>/gi, '');
			var ts_content = "RT @" + ts_tweet_screen_name + " " +ts_tweet_text;
			//code from http://userscripts.org/scripts/review/100397
			var RTBox = new twttr.widget.TweetDialog(
					{modal: false,
					 draggable: true,
					 template: {title: _("Retweeting")},
					 defaultContent: ""}
				); 
				RTBox.open();
				RTBox.setContent(ts_content);
				RTBox.setCaretPosition(0);
			//code from http://userscripts.org/scripts/review/100397
	    });

	    // Edit 按钮的动作
	    $('.ts-edt').live('mouseup', function(e){
	    	//resetDelid();
	   		var ts_tweet_text = $('.currenttweet .js-tweet-text').html();
		    	ts_tweet_text = ts_tweet_text.replace(/@<a[^\>]*>([^<]*)<\/a>/gi, '@$1');
		        ts_tweet_text = ts_tweet_text.replace(/<img[^>]*>/gi, '');
		        ts_tweet_text = ts_tweet_text.replace(/<a[^\>]*>(#[^<]*)<\/a>/gi, '$1');
		        ts_tweet_text = ts_tweet_text.replace(/<a[^\>]*href=\"([^\s]*)\"[^\>]*>[^<]*<\/a>/gi, '$1');
		        ts_tweet_text = ts_tweet_text.replace(/<[^>]*>/gi, '');
			var ts_content = ts_tweet_text;
	        new twttr.widget.TweetDialog({
	            draggable:true,template:{
	            	title:"Edit your tweet"
	            }, defaultContent:ts_content, origin:"TS-Edit-button"
	        }).open().focus();
			$('.twttr-dialog-wrapper .tweet-button').bind('click', function() {
				$('.delete-this-tweet').removeClass("delete-this-tweet");
				$('.currenttweet').addClass("delete-this-tweet");
			});
			$('.tweet-button').removeClass('disabled');
			$('.tweet-button').addClass('primary-btn');
	    });

	    // Evernote 按钮的动作
	    $('.ts-evernote').live('mouseup', function(e){
	    	if($('.currenttweet').html() == null)
				return
			else{
				var ts_tweet_text = $('.currenttweet .js-tweet-text').html();
				var ts_tweet_screen_name = $('.currenttweet .username b').html();
			    	ts_tweet_text = ts_tweet_text.replace(/@<a[^\>]*>([^<]*)<\/a>/gi, '@$1');
			    	ts_tweet_text = ts_tweet_text.replace(/<hr>/gi, '\n\n' + 'RT @' + ts_tweet_screen_name + ' ');
			        ts_tweet_text = ts_tweet_text.replace(/<img[^>]*>/gi, '');
			        ts_tweet_text = ts_tweet_text.replace(/<a[^\>]*>(#[^<]*)<\/a>/gi, '$1');
			        ts_tweet_text = ts_tweet_text.replace(/<a[^\>]*href=\"([^\s]*)\"[^\>]*>[^<]*<\/a>/gi, '$1');
			        ts_tweet_text = ts_tweet_text.replace(/<[^>]*>/gi, '');
			        ts_tweet_text = ts_tweet_text + ' via @' + ts_tweet_screen_name + ' ';
				var evernote = "myen";
				var evernoteAvatar = "https://twimg0-a.akamaihd.net/profile_images/50603452/en_iphone_webclip_icon_60x60_reasonably_small.png";
				twttr.dialogs.directMessage({
                        origin: "message-dialog-hotkey"
                    }).open().switchToNewMessageView();
		        $('.twttr-directmessage-input').val(evernote);
		        $('.js-dm-avatar').attr('src',evernoteAvatar);
				$('.twttr-dialog-wrapper .twitter-anywhere-tweet-box-editor').trigger('keydown').val(ts_tweet_text).focus();
				$('.tweet-button').removeClass('disabled');
				$('.tweet-button').addClass('primary-btn');
			}
	    });

	    // Mute 按钮的动作
	    $('.ts-mute').live('mouseup', Mute);
	    
	    // 侧边栏过滤面板的动作
	    $('#ts_filter_button').live('mouseup', addFilter);
	    $('#ts_filter_form').live('submit', addFilter);
	    updateClass();
	    $('#ts_filter_list ol label').live('mouseup', function(){
	    		if($(this).find('input').attr('checked'))
					$(this).html('<input class="ts_filter_item" type="checkbox"> <span>' + $(this).find('span').html() + '</span>').removeAttr('id');
				else
					$(this).html('<input checked class="ts_filter_item" type="checkbox"> <span>' + $(this).find('span').html() + '</span>').removeAttr('id');
		    	//记录过滤列表到 localStorage 里面
		    	filteList = $('#ts_filter_list ol').html();
		    	localStorage.setItem('filteList', $('#ts_filter_list ol').html());
	    });
	    $('.ts_remove').live('mouseup', function(){
	    	$(this).parent().remove();
			if($('#ts_filter_list ol li').length == 0)
				$('#ts_filter_list').hide();
			//记录过滤列表到 localStorage 里面
	    	filteList = $('#ts_filter_list ol').html();
	    	localStorage.setItem('filteList', $('#ts_filter_list ol').html());
	    });
	    $('.unretweet-action').live('mouseup', function(e){
	    	if($('.stream-item:first').attr('data-item-id') == $(this).parent().attr('data-tweet-id')){
	    		lastid = $('.stream-item:eq(1)').attr('data-item-id');
	    		localStorage.setItem('ts_last', $('.stream-item:eq(1)').attr('data-item-id'));
	    	}
	    });
	    $('#ts-mute a').live('click',function(){
			$(this).remove();
			if($('#ts-mute a').length == 0)
				$('.ts-mute-component').hide();
		});
	    return true;
	}//-------------- end bindEvents() --------------
	
	
	
	
}// end twittSeven()


var $, jQuery;
checkJQuery();

function checkJQuery()
{
    unsafeWindow.jQuery ? init() : setTimeout(checkJQuery, 100);
}

function init()
{
	$ = jQuery = unsafeWindow.jQuery;
	//注入 twittSeven() 到页面上
	$(document).ready(function() {
		var script = document.createElement('script');
		script.appendChild(document.createTextNode('(' + twittSeven +')();'));
		(document.body || document.head || document.documentElement).appendChild(script);
	// via http://stackoverflow.com/questions/2303147/injecting-js-functions-into-the-page-from-a-greasemonkey-script-on-chrome
	});
}
