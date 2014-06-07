var GMSU_meta_CCE_Module_Videos = <><![CDATA[
// ==UserScript==
// @name					CCE_Module_Videos
// @namespace				http://userscripts.org/users/208041
// @scriptid				131753
// @description				A video Module for a beta version of Cracked.com Enhancer
// @author					jgjake2
// @version					0.0.1
// @timestamp				1335281129426
// @license					http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// ==/UserScript==
]]></>;

if(typeof unsafeWindow === "undefined") unsafeWindow = window;
if(typeof(window.unsafeWindow) === "undefined") window.unsafeWindow = window;
var GlobalVars = unsafeWindow.GlobalVars;
var parseMetadata = unsafeWindow.parseMetadata;

function parseMetadata(headerBlock){
	var isAGmParm = function(element) { return /\/\/ @/.test(element); }
	var lines = headerBlock.split(/[\r\n]+/).filter(isAGmParm);
	var metadata = { include: [], exclude: [], require: [], resource: {} };
	for each (var line in lines){
		try{[line, name, value] = String(line).match(/\/\/ @(\S+)\s*(.*)/);
		} catch(e){continue;}
		if (metadata[name] instanceof Array)
			metadata[name].push(value);
		else if (metadata[name] instanceof Object) {
			[rName, rValue] = value.split(/\s+/);
			metadata[name][rName] = rValue;
		}
		else
			metadata[name] = value;
	}
	return metadata;
}
var ModInfo = parseMetadata(GMSU_meta_CCE_Module_Videos);

function RealTypeOf(v) {
  if (typeof(v) == "object") {
    if (v === null) return "null";
	if (v.constructor == ({}).constructor) return "map";
    if (v.constructor == (new Array).constructor) return "array";
    if (v.constructor == (new Date).constructor) return "date";
    if (v.constructor == (new RegExp).constructor) return "regex";
    return "object";
  }
  return typeof(v);
}

function jumpToAnchor(id) {
	$("html,body").animate({scrollTop: $('#'+id).offset().top}, 100);
}
/*
$.fn.getElementIndex = function() {
	var allSibs = this.parent().children();
	var Index = allSibs.index(this);
	return Index;
}

$.fn.watch = function(props, callback, timeout){
	if(!timeout)
		timeout = 10;
	return this.each(function(){
		var el 		= $(this),
			func 	= function(){ __check.call(this, el) },
			data 	= {	props: 	props.split(","),
						func: 	callback,
						vals: 	[] };
		$.each(data.props, function(i) { data.vals[i] = el.css(data.props[i]); });
		el.data(data);
		if (typeof (this.onpropertychange) == "object"){
			el.bind("propertychange", callback);
		} else if ($.browser.mozilla){
			el.bind("DOMAttrModified", callback);
		} else {
			setInterval(func, timeout);
		}
	});
	function __check(el) {
		var data 	= el.data(),
			changed = false,
			temp	= "";
		for(var i=0;i < data.props.length; i++) {
			temp = el.css(data.props[i]);
			if(data.vals[i] != temp){
				data.vals[i] = temp;
				changed = true;
				break;
			}
		}
		if(changed && data.func) {
			data.func.call(el, data);
		}
	}
}
*/


function AddJQueryFunctions(){
	$.fn.getElementIndex = function() {
		var allSibs = this.parent().children();
		var Index = allSibs.index(this);
		return Index;
	};

	$.fn.watch = function(props, callback, timeout){
		if(!timeout)
			timeout = 10;
		return this.each(function(){
			var el 		= $(this),
				func 	= function(){ __check.call(this, el) },
				data 	= {	props: 	props.split(","),
							func: 	callback,
							vals: 	[] };
			$.each(data.props, function(i) { data.vals[i] = el.css(data.props[i]); });
			el.data(data);
			if (typeof (this.onpropertychange) == "object"){
				el.bind("propertychange", callback);
			} else if ($.browser.mozilla){
				el.bind("DOMAttrModified", callback);
			} else {
				setInterval(func, timeout);
			}
		});
		function __check(el) {
			var data 	= el.data(),
				changed = false,
				temp	= "";
			for(var i=0;i < data.props.length; i++) {
				temp = el.css(data.props[i]);
				if(data.vals[i] != temp){
					data.vals[i] = temp;
					changed = true;
					break;
				}
			}
			if(changed && data.func) {
				data.func.call(el, data);
			}
		}
	}
}

var VideoConstants = {
	'VideoPlayer_Wrapper': '#videoWrapper',
	'VideoPlayer_Div': '#videoPlayer',
	'VideoPlayerObject_ID': '#videoPlayer > object:first',
	'VideoPlayerFlashVars': '#videoPlayer > object > param[name="flashVars"]',
	'shinobi2': '#shinobi2',
}

//$video_player = $('#videoPlayer');
//$flash_player = $('#videoPlayer > object:first');
//$shinobi2 = $('#shinobi2');

var CCE_Module_Videos = {
	'CSS': '',
	'myVideoFlashVars': null,
	'VideoPlayerSizes': {},
	'myVideoPlayer': null,
	'myMediaResizer': null,
	'defaults': null,

	'Module_Info': ModInfo,
	
	'AddLanguage': function(){
		GlobalVars.log.logDebug('Call ' + this.Module_Info.name + '.AddLanguage');
		GlobalVars.lang.language.en[this.Module_Info.name] = {
			'Name': 'Videos Module',
			'MediaResizer': {
				'Default': {
					'ButtonText': 'Default',
				},
				'FillWrapper': {
					'ButtonText': 'Fill Wrapper',
				},
				'Best': {
					'ButtonText': 'Best',
				},
				'MaxHeight': {
					'ButtonText': 'MaxHeight',
				},
				'CategoryHead': {
					'ButtonText': 'Media Resizer',
				},
			},
		}
	},
	
	'VideoFlashVars': function(){
		this.flash_var_values = new Array();
		this.flash_var_output = null;
		//$video_player.find('param[name="flashVars"]');
		this.fill_vals = function(){
			var $flash_vars = $(VideoConstants.VideoPlayerFlashVars);
			this.flash_var_values = this.get_param_values($flash_vars.attr('value'));
		};
		this.is_flash_var_values_set = function (){
			if(this.flash_var_values.length < 1) return false;
			else return true;
		};
		this.get_param_values = function (flash_vars) {
			var params = flash_vars.split("&"); 
			var pairs = new Array();
			for (var i = 0; i < params.length; i++) pairs[i] = params[i].split("=");
			return pairs;
		};
		this.get_param_index = function (name){
			if(!this.is_flash_var_values_set()) this.fill_vals();
			for (var i = 0; i < this.flash_var_values.length; i++){ if(this.flash_var_values[i][0] == name) return i;}
			return -1;
		};
		this.get_param_value = function (name){
			var index = this.get_param_index(name);
			if(index != -1) return this.flash_var_values[index][1];
			else return -1;
		};
		this.set_param_value = function (name, value){
			var index = this.get_param_index(name);
			this.flash_var_values[index][1] = value;
		};
		this.build_output = function(){
			if(!this.is_flash_var_values_set()) this.fill_vals();
			var tmp = new Array();
			for (var i = 0; i < this.flash_var_values.length; i++){
				tmp[i] = this.flash_var_values[i].join("=");
			}
			this.flash_var_output = tmp.join('&');
		};
		this.flush = function(){
			this.build_output();
			var $flash_vars = $(VideoConstants.VideoPlayerFlashVars);
			$flash_vars.attr('value', this.flash_var_output);
			$(VideoConstants.VideoPlayerObject_ID).attr('data', $(VideoConstants.VideoPlayerObject_ID).attr('data'));
		};
	},

	'CleanFlashVars': function(){
		
		this.myVideoFlashVars.set_param_value('demand_video_timeout', parseInt(GlobalVars.prefs.VideoTimeoutLength));
		this.myVideoFlashVars.set_param_value('demand_showhd', GlobalVars.prefs.VideoForceShowHD);
		
		this.myVideoFlashVars.set_param_value('demand_continuous_play', GlobalVars.prefs.VideoContinuousPlay);
		this.myVideoFlashVars.set_param_value('demand_autoplay', GlobalVars.prefs.VideoAutoPlay);
		
		this.myVideoFlashVars.flush();
		
		if(GlobalVars.prefs.VideoContinuousPlay == 0) window.videoAPI.VIDEO_FOLD = 0;
	},
	
	'ResizeBG': function(){
		$('#CCEVideoWrapperBG').css({'height': this.myVideoPlayer.PlayerHeight + 'px', 'width': '100%'});
	},

	'MakeNewBG': function(){
		var videoWrapperOffset = $('#videoWrapper').offset();
		var newDiv = '<div id="CCEVideoWrapperBG" style="position: absolute; left: 0px; top: ' + videoWrapperOffset.top + 'px; z-index: -1; width:100%; height: ' + $('#videoWrapper').height() + 'px;"></div>';
		var TopColor = '#454545';
		var BottomColor = '#050505';
		var BGCSS = <><![CDATA[
			#CCEVideoWrapperBG {
				/* IE10 */ 
				background-image: -ms-linear-gradient(top, %%TOPCOLOR%% 0%, %%BOTTOMCOLOR%% 100%);
				/* Mozilla Firefox */ 
				background-image: -moz-linear-gradient(top, %%TOPCOLOR%% 0%, %%BOTTOMCOLOR%% 100%);
				/* Opera */ 
				background-image: -o-linear-gradient(top, %%TOPCOLOR%% 0%, %%BOTTOMCOLOR%% 100%);
				/* Webkit (Safari/Chrome 10) */ 
				background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, %%TOPCOLOR%%), color-stop(1, %%BOTTOMCOLOR%%));
				/* Webkit (Chrome 11+) */ 
				background-image: -webkit-linear-gradient(top, %%TOPCOLOR%% 0%, %%BOTTOMCOLOR%% 100%);
				/* Proposed W3C Markup */ 
				background-image: linear-gradient(top, %%TOPCOLOR%% 0%, %%BOTTOMCOLOR%% 100%);
			}
		]]></>.toString();
		BGCSS = BGCSS.split('%%TOPCOLOR%%').join(TopColor);
		BGCSS = BGCSS.split('%%BOTTOMCOLOR%%').join(BottomColor);
		this.CSS = this.CSS + BGCSS;
		$('body').append(newDiv);
		
		$("#dark").watch("class", function(){
			if($("#dark").hasClass("on")) $('.' + GlobalVars.defaults.Videos.MR_LI_Class).css('z-index', 'auto');
			else $('.' + GlobalVars.defaults.Videos.MR_LI_Class).css('z-index', '100');
			//CCE_Module_Videos.ResizeBG();
		});
	},
	
	'VideoPlayer': function(){
		this.currentSize = 0;
		this.currentSizePtr = {};
		this.PlayerHeight = -1;
		this.PlayerWidth = -1;
		this.maxWidth = -1;
		this.maxHeight = -1;
		this.minWidth = -1;
		this.minHeight = -1;
		this.css = '';
		this.style;
		
		this.GetWidthScale = function(width){
			return (parseFloat(this.maxWidth) / parseFloat(width));
		}
		this.GetHeightScale = function(height){
			return (parseFloat(this.maxHeight) / parseFloat(height));
		}
		this.ScaleBy = function(){
			if(parseInt(this.GetWidthScale(GlobalVars.defaults.Videos.VideoPlayerObjectWidth) * GlobalVars.defaults.Videos.VideoPlayerObjectHeight) > this.maxHeight) {
				return true;
			} else {
				return false;
			}
		}
		this.checkMinWidth = function(){
			if(this.PlayerWidth < this.minWidth){
				this.PlayerWidth = this.minWidth;
				this.PlayerHeight = Math.round((parseFloat(this.PlayerWidth) / GlobalVars.defaults.Videos.VideoPlayerObjectWidth) * GlobalVars.defaults.Videos.VideoPlayerObjectHeight);
			}
		}
		
		this.SetSize = function(){
			if(!this.ScaleBy()){
				this.PlayerWidth = this.maxWidth;
				this.PlayerHeight = parseInt(this.GetWidthScale(GlobalVars.defaults.Videos.VideoPlayerObjectWidth) * GlobalVars.defaults.Videos.VideoPlayerObjectHeight);
				//log.logDebug('In Function SetVideoPlayer() -- ScaleBy=WIDTH -- maxWidth=' + this.maxWidth + ' -- maxHeight=' + this.maxHeight + ' -- PlayerWidth=' + this.PlayerWidth + ' -- PlayerHeight=' + this.PlayerHeight);
			} else {
				this.PlayerHeight = this.maxHeight;
				this.PlayerWidth = parseInt(this.GetHeightScale(GlobalVars.defaults.Videos.VideoPlayerObjectHeight) * GlobalVars.defaults.Videos.VideoPlayerObjectWidth);
				//log.logDebug('In Function SetVideoPlayer() -- ScaleBy=HEIGHT -- maxWidth=' + this.maxWidth + ' -- maxHeight=' + this.maxHeight + ' -- PlayerWidth=' + this.PlayerWidth + ' -- PlayerHeight=' + this.PlayerHeight);
			}
		}
		
		this.SetCSS = function(){
			$('.vp').css({ width : (this.PlayerWidth + 'px'), height : (this.PlayerHeight + 'px')});
			$('.vp').css(this.style);
		}
		
		this.animateScroll = function(){
			if(this.PlayerHeight >= (parseInt($(window).height()) - 1)) jumpToAnchor($(VideoConstants.VideoPlayer_Div).attr('id'));
			else if(this.currentSize == '2') $("html,body").animate({scrollTop: ($(VideoConstants.VideoPlayer_Div).offset().top - parseInt(GlobalVars.prefs.VideoPlayerBestScreenMarginTop))}, 100);
			else jumpToAnchor(GlobalVars.defaults.Videos.Header_Div_ID);
		}
		
		this.SetVideoPlayer = function(){
			this.SetSize();
			this.checkMinWidth();
			this.SetCSS();
			var tmpLeft = Math.round((parseFloat($(window).width()) - this.PlayerWidth) / 2);
			if(this.currentSize > 1) $(VideoConstants.VideoPlayer_Div).offset({ left: tmpLeft });
			else $(VideoConstants.VideoPlayer_Div).css('left', '0');
			$(VideoConstants.VideoWrapper).css('height', this.PlayerHeight + 'px')
			//if(!ScriptFinished) this.animateScroll();
			
		}
		
		this.GetSizeKeyByInt = function(index){
			var i = 0;
			$.each(CCE_Module_Videos.VideoPlayerSizes, function(key, value){
				if(i == parseInt(index)) return key;
				i++;
			});
			return 'Default';
		}
		
		this.GetVideoPlayerSize = function(index){
			$.each(CCE_Module_Videos.VideoPlayerSizes, function(key, value){
				//GlobalVars.log.logDebug('GetVideoPlayerSize -- value.Num: ' + value.Num + ' -- index: ' + index);
				if(value.Num == index){
					//GlobalVars.log.logDebug('GetVideoPlayerSize -- Found It!');
					CCE_Module_Videos.currentSizePtr = value;
					return false;
				}
			});
			return CCE_Module_Videos.currentSizePtr;
			//return CCE_Module_Videos.VideoPlayerSizes['Default'];
		}
		
		this.MovePageContent = function(){
			var $content = $('#PrimaryContent, #SecondaryContent');
			$content.css('vertical-align', '0px');
			setTimeout(function() {
				$content.css('vertical-align', 'baseline');
			}, 100);
		}
		
		this.resize = function(input){
			//GlobalVars.log.logDebug('Call ' + CCE_Module_Videos.Module_Info.name + '.onModuleRegister -- input: ' + input);
			var event = '';
			if(RealTypeOf(input) == "number" || RealTypeOf(input) == "string"){
				this.currentSize = parseInt(input);
			} else if(RealTypeOf(input) == "map"){
				this.currentSize = parseInt(input.num);
				event = input.event;
			}
			this.GetVideoPlayerSize(this.currentSize);

			this.maxHeight = eval(CCE_Module_Videos.currentSizePtr.Height.Max); if(this.maxHeight == -1) this.maxHeight = eval(CCE_Module_Videos.VideoPlayerSizes['Default'].Height.Max);
			this.minHeight = eval(CCE_Module_Videos.currentSizePtr.Height.Min); if(this.minHeight == -1) this.minHeight = eval(CCE_Module_Videos.VideoPlayerSizes['Default'].Height.Min);
			
			this.maxWidth = eval(CCE_Module_Videos.currentSizePtr.Width.Max); if(this.maxWidth == -1) this.maxWidth = eval(CCE_Module_Videos.VideoPlayerSizes['Default'].Width.Max);
			this.minWidth = eval(CCE_Module_Videos.currentSizePtr.Width.Min); if(this.minWidth == -1) this.minWidth = eval(CCE_Module_Videos.VideoPlayerSizes['Default'].Width.Min);
			
			this.style = CCE_Module_Videos.currentSizePtr.Style;
			
			GlobalVars.log.logDebug('resize -- maxHeight:' + this.maxHeight + ' -- minHeight:' + this.minHeight + ' -- maxWidth:' + this.maxWidth + ' -- minWidth:' + this.minWidth);
			
			this.SetVideoPlayer();
			if(event != 'PageResize') this.animateScroll();
			CCE_Module_Videos.ResizeBG();
			this.MovePageContent();
		}
	},
	
	'GetVideoSource': function(){
		var VideoURL = this.myVideoFlashVars.get_param_value('source');
		VideoURL = VideoURL.split('%2F').join('/').split('%3A').join(':');
		//VideoURL = VideoURL.split('%3A').join(':');
		return VideoURL;
	},
	
	'AddDownloadLink': function(){
		var $title = $('#header > h1');
		var source = this.GetVideoSource();
		$title.html($title.html() + ' - Download')
		$title.wrap('<a href="' + source + '"></a>');
		//CSS[VideoID] = CSS[VideoID] + '#header > a > h1 {color: #145E9D; text-decoration: underline;}';
		CCE_Module_Videos.CSS = CCE_Module_Videos.CSS + '#header > a > h1 {color: #145E9D; text-decoration: underline;}';;
	},
	
	'MediaResizer': function($nextSib){
		this.$nextSib = $nextSib;
		this.html = '';
		this.insertBeforeElement = function($el){
			$(this.html).insertBefore($el);
		}
		
		this.CreateSelector = function(){
		//GlobalVars.lang
		//GlobalVars.lang.getString('MediaResizer.CategoryHead.ButtonText')
			var Li_CategoryHead = '<li class="last categoryHead ' + GlobalVars.defaults.Videos.MR_LI_Class + '">' + GlobalVars.lang.getString(CCE_Module_Videos.Module_Info.name + '.MediaResizer.CategoryHead.ButtonText') + '</li>';
			var Li_Sizes = '';
			var count = 0;
			/*
			for(var i = 0; i < CCE_Module_Videos.VideoPlayerSizes.Sizes.length; i++){
				var tSize = CCE_Module_Videos.VideoPlayerSizes.Sizes[i];
				Li_Sizes = Li_Sizes + '<li id="' + eval('GlobalVars.defaults.MR_LI_ID_' + tSize['Name']) + '" class="' + (i == 0 ? 'first ' : '') + (i == (CCE_Module_Videos.VideoPlayerSizes.Sizes.length - 1) ? 'last ' : '') + GlobalVars.defaults.MR_LI_Class + ' ' + GlobalVars.defaults.MR_LI_ResizeButton_Class + '" ><a href="#" class="link">' + GlobalVars.lang.getString('CCE_Module_Videos.MediaResizer.' + tSize['Name'] + '.ButtonText') + '</a></li>';
			}
			*/
			$.each(CCE_Module_Videos.VideoPlayerSizes, function(key, value){
				Li_Sizes = Li_Sizes + '<li id="' + eval('GlobalVars.defaults.Videos.MR_LI_ID_' + key) + '" class="' + (count == 0 ? 'first ' : '') + (count == 3 ? 'last ' : '') + GlobalVars.defaults.Videos.MR_LI_Class + ' ' + GlobalVars.defaults.Videos.MR_LI_ResizeButton_Class + '" ><a href="#" class="link">' + GlobalVars.lang.getString(CCE_Module_Videos.Module_Info.name + '.MediaResizer.' + key + '.ButtonText') + '</a></li>';
				count++;
			});
			
			//var Li_CategorySeparator = '<li class="' + defaults.MR_LI_Separator_Class + ' ' + defaults.MR_LI_Class + '">&nbsp;</li>';
			/*
			var Li_Options = '';
			$.each(VideoPlayerOptions, function(key, value){
				Li_Options = Li_Options + '<li id="' + key + '" class="' + defaults.MR_LI_Class + ' ' + defaults.MR_LI_PlayerOptions_Class + '" ><a href="#" class="link">' + language.getString('PlayerOptions_ButtonText_' + key) + '</a></li>';
			});
			*/
			//var Li_CategoryEnd = '<li class="' + defaults.MR_LI_End_Class + ' ' + defaults.MR_LI_Class + '"><div>' + language.getString('MediaResizer_ButtonText_CategoryEnd') + '</div></li>';
			
			//var ul = '<ul class="categories">' + Li_CategoryHead + Li_Sizes + Li_CategoryEnd + Li_Options + '</div>';
			var ul = '<ul class="categories">' + Li_CategoryHead + Li_Sizes + '</div>';
			this.html = this.html + '<nav id="' + GlobalVars.defaults.Videos.MR_Navigation_ID + '" role="navigation">' + ul + '</nav>';
			
			var MRCSS = <><![CDATA[
			
				#%%MR_NAVIGATION_ID%% { display:block; margin-right:0; position:relative; height:27px; }
				/*#%%MR_NAVIGATION_ID%% ul.categories { position:relative; display:inline-block; background:#1D5D94; width:990px; height:27px; }*/
				#%%MR_NAVIGATION_ID%% ul.categories { position:relative; display:inline-block; width:990px; height:27px; }
				#%%MR_NAVIGATION_ID%% li { float:left; display:inline; position:relative; z-index:100; }
				#%%MR_NAVIGATION_ID%% a { display:block; font-size:14px; color:#333; padding:9px 18px 8px; }
				#%%MR_NAVIGATION_ID%% ul.categories li { border-right:1px dotted #cfcfcf; background-color: #FEFEFE; }
				#%%MR_NAVIGATION_ID%% ul.categories a:hover { background:#f0f0f0; }
				#%%MR_NAVIGATION_ID%% ul.categories a, #%%MR_NAVIGATION_ID%% ul.categories li.categoryHead { font-size:12px; font-family:Georgia,serif; font-style:italic; background:#fefefe; font-weight:700; padding:6px 15px; }
				#%%MR_NAVIGATION_ID%% ul.categories li.categoryHead { background:url(/ui/shared/images/global/icons/sprite.png) no-repeat -5px -724px #fefefe; color:#fff; text-shadow:1px 2px #555; height:15px; padding:6px 35px 6px 8px; }
				#%%MR_NAVIGATION_ID%% ul.categories li.first { border-left:0; }
				#%%MR_NAVIGATION_ID%% ul.categories li.last { border-right:0; }
				#%%MR_NAVIGATION_ID%% #shadow-category2 {background:url(/ui/shared/images/global/layout/shinobi-sprite.png) no-repeat scroll 0 0 transparent; display:block; height:4px; left:0; position:relative; top:0; width:990px; z-index:99; margin-top:-42px;}
				#%%MR_DIV_ID%% {display: inline;}
				.%%MR_LI_SELECTED_CLASS%% {}
				.%%MR_LI_SELECTED_CLASS%% a {background-color : #C0C0C0 !important;}
				
				.%%MR_LI_END_CLASS%% {
					background: url("/ui/shared/images/global/icons/sprite.png") no-repeat scroll -5px -724px #FEFEFE;
					color: #FFFFFF;
					border-right: 0 none !important;
					padding: 6px 35px 6px 8px;
					float: right !important;
					text-shadow: 1px 2px #555555;
					transform:rotateY(180deg);
					-ms-transform:rotateY(180deg); /* IE 9 */
					-moz-transform:rotateY(180deg); /* Firefox */
					-webkit-transform:rotateY(180deg); /* Safari and Chrome */
					-o-transform:rotateY(180deg); /* Opera */
				}
				
				.%%MR_LI_END_CLASS%% + .%%MR_LI_PLAYEROPTIONS_CLASS%% {
					border-right: 0 none !important;
				}
				
				.%%MR_LI_END_CLASS%% > * {
					/*padding: 6px 15px;*/
					transform:rotateY(180deg);
					-ms-transform:rotateY(180deg); /* IE 9 */
					-moz-transform:rotateY(180deg); /* Firefox */
					-webkit-transform:rotateY(180deg); /* Safari and Chrome */
					-o-transform:rotateY(180deg); /* Opera */
				}
				
				.%%MR_LI_SEPARATOR_CLASS%% {
					background-color: #1D5D94;
					width: 3px;
					height: 100%;
					border: none !important;
				}
				
				.%%MR_LI_PLAYEROPTIONS_CLASS%% {
					background-color: #FEFEFE;
					float: right !important;
					border-left: 1px dotted #CFCFCF;
				}
				
				.%%MR_LI_PLAYEROPTIONS_CLASS%%:last-child {
					border-left: none !important;
				}
			
			]]></>.toString();
			
			
			MRCSS = MRCSS.split('%%MR_NAVIGATION_ID%%').join(GlobalVars.defaults.Videos.MR_Navigation_ID);
			MRCSS = MRCSS.split('%%MR_DIV_ID%%').join(GlobalVars.defaults.Videos.MR_Div_ID);
			MRCSS = MRCSS.split('%%MR_LI_SELECTED_CLASS%%').join(GlobalVars.defaults.Videos.MR_LI_Selected_Class);
			MRCSS = MRCSS.split('%%MR_LI_END_CLASS%%').join(GlobalVars.defaults.Videos.MR_LI_End_Class);
			MRCSS = MRCSS.split('%%MR_LI_PLAYEROPTIONS_CLASS%%').join(GlobalVars.defaults.Videos.MR_LI_PlayerOptions_Class);
			MRCSS = MRCSS.split('%%MR_LI_SEPARATOR_CLASS%%').join(GlobalVars.defaults.Videos.MR_LI_Separator_Class);
			//this.css = this.css + MRCSS;
			CCE_Module_Videos.CSS = CCE_Module_Videos.CSS + MRCSS;

			this.insertBeforeElement(this.$nextSib);
		}
		
		this.addEventListeners = function(){
			$('#' + GlobalVars.defaults.Videos.MR_Navigation_ID + ' .' + GlobalVars.defaults.Videos.MR_LI_ResizeButton_Class).bind("click", {MR: this}, function(event){
				if($(this).hasClass('categoryHead')) return false;
				event.data.MR.SetSelectedByID($(this).attr('id'));
				$.fn.getElementIndex = function() {
					var allSibs = this.parent().children();
					var Index = allSibs.index(this);
					return Index;
				};
				var index = $(this).getElementIndex();
				CCE_Module_Videos.myVideoPlayer.resize(index - 1);
				return false;
			});
			/*
			$('#' + defaults.MR_Navigation_ID + ' .' + defaults.MR_LI_PlayerOptions_Class).bind("click", {MR: this}, function(event){
				VideoPlayerOptions[$(this).attr('id')].Apply();
			});
			*/
		}
		
		/*this.GetCSS = function(){
			if(this.css == '') this.CreateSelector();
			return this.css;
		}*/
		
		this.RemoveSelectedClassFromAll = function(){
			$('#' + GlobalVars.defaults.Videos.MR_Navigation_ID + ' .' + GlobalVars.defaults.Videos.MR_LI_Class).removeClass(GlobalVars.defaults.Videos.MR_LI_Selected_Class);
		}
		
		this.SetSelectedByID = function(id){
			this.RemoveSelectedClassFromAll();
			$('#' + id).addClass(GlobalVars.defaults.Videos.MR_LI_Selected_Class);
		}
		
		this.SetSelected = function(){
			this.RemoveSelectedClassFromAll();
			var $LIs = $('#' + GlobalVars.defaults.Videos.MR_Navigation_ID + ' li');
			var SelectedLi = $LIs.get((parseInt(CCE_Module_Videos.myVideoPlayer.currentSize) + 1));
			
			$(SelectedLi).addClass(GlobalVars.defaults.Videos.MR_LI_Selected_Class);
		}
		
		this.CreateSelector();
		this.addEventListeners();
		this.SetSelected();
		
	},
	
	'Start': function(){
		
		GlobalVars.defaults.Videos = {
			'VideoPlayerDivWidth': parseInt($(VideoConstants.VideoPlayer_Div).width()),
			'VideoPlayerDivHeight': parseInt($(VideoConstants.VideoPlayer_Div).height()),
			
			'VideoPlayerObjectWidth': parseInt($(VideoConstants.VideoPlayerObject_ID).attr('width')),
			'VideoPlayerObjectHeight': parseInt($(VideoConstants.VideoPlayerObject_ID).attr('height')),
			
			'MR_Navigation_ID': 'CCE_MR_Navigation',
			'MR_Div_ID': 'CCE_MediaResizer',
			'MR_LI_Class': 'CCE_MR_LI',
			'MR_LI_Separator_Class': 'CCE_MR_Li_Separator',
			'MR_LI_End_Class': 'CCE_MR_Li_End',
			'MR_LI_ResizeButton_Class': 'CCE_MR_Li_ResizeButton',
			'MR_LI_PlayerOptions_Class': 'CCE_MR_Li_PlayerOptions',
			'MR_LI_Selected_Class': 'CCE_MR_Li_Selected',
			'MR_LI_ID_Default': 'CCE_MediaResizer_Li_Default',
			'MR_LI_ID_FillWrapper': 'CCE_MediaResizer_Li_FillWrapper',
			'MR_LI_ID_Best': 'CCE_MediaResizer_Li_Best',
			'MR_LI_ID_MaxHeight': 'CCE_MediaResizer_Li_MaxHeight',
			'MR_LI_ID_MaxWidth': 'CCE_MediaResizer_Li_MaxWidth',
			'Header_Div_ID': 'header',
			'PrimaryContent_Section_ID': 'PrimaryContent',
			'SecondaryContent_Section_ID': 'SecondaryContent'
		}
		this.defaults = GlobalVars.defaults.Videos;
		
		this.myVideoFlashVars = new this.VideoFlashVars();
		this.CleanFlashVars();
		
		CCE_Module_Videos.myVideoPlayer = new this.VideoPlayer();
		CCE_Module_Videos.myVideoPlayer.resize(GlobalVars.prefs.VideoPlayerSizeDefault);
		this.MakeNewBG();
		
		this.myMediaResizer = new this.MediaResizer($(VideoConstants.shinobi2));
		
		$(document).ready(function(){
			CCE_Module_Videos.myVideoPlayer.animateScroll();
		});
		
		$(window).resize(function () {
			CCE_Module_Videos.myVideoPlayer.resize({'num': parseInt(CCE_Module_Videos.myVideoPlayer.currentSize), 'event': 'PageResize'});
		});
		
		CCE_Module_Videos.AddDownloadLink();
		
		if(this.CSS != '') {GlobalVars.addStyle(this.CSS);this.CSS='';}
		CCE_Module_Videos.ResizeBG();
	},

	'onMain': function(){
		GlobalVars.log.logDebug('Call ' + this.Module_Info.name + '.onMain');
		
	},

	'onWrapperReady': function(){
		GlobalVars.log.logDebug('Call ' + this.Module_Info.name + '.onWrapperReady');

	},
	
	'onVideoWrapperReady': function(){
		GlobalVars.log.logDebug('Call ' + this.Module_Info.name + '.onVideoWrapperReady');
		this.Start();
	},
	
	'onModuleRegister': function(){
		GlobalVars.log.logDebug('Call ' + this.Module_Info.name + '.onModuleRegister');
		//if(typeof $ !== "undefined") AddJQueryFunctions();
		//else setTimeout(function() {AddJQueryFunctions();},1);
		this.AddLanguage();
		//console.log('Call ' + this.Module_Info.name + '.onModuleRegister');
		

		
		// Default
		this.VideoPlayerSizes['Default'] = {'Num': '0',
			'Height': {'Min': 'GlobalVars.defaults.Videos.VideoPlayerObjectHeight - 1', 'Max': 'GlobalVars.defaults.Videos.VideoPlayerObjectHeight'},
			'Width': {'Min': 'GlobalVars.defaults.Videos.VideoPlayerObjectWidth - 1', 'Max': 'GlobalVars.defaults.Videos.VideoPlayerObjectWidth'},
			'Style': {'margin-left' : '116px', 'padding' : '0px'}
			}
		// FillWrapper
		this.VideoPlayerSizes['FillWrapper'] = {'Num': '1',
			'Height': {'Min': -1, 'Max': -1},
			'Width': {'Min': 'GlobalVars.defaults.Videos.VideoPlayerDivWidth ', 'Max': 'GlobalVars.defaults.Videos.VideoPlayerDivWidth + 1'},
			'Style': {'margin-left' : '0px', 'padding' : '0px'}
			}
		// Best
		this.VideoPlayerSizes['Best'] = {'Num': '2',
			'Height': {'Min': -1, 'Max': '(parseInt($(window).height()) - (parseInt(GlobalVars.prefs.VideoPlayerBestScreenMarginTop) + parseInt(GlobalVars.prefs.VideoPlayerBestScreenMarginBottom)))'},
			'Width': {'Min': -1, 'Max': '(parseInt($(window).width()) - (parseInt(GlobalVars.prefs.VideoPlayerBestScreenMarginLeft) + parseInt(GlobalVars.prefs.VideoPlayerBestScreenMarginRight)))'},
			'Style': {'margin-left' : '0px', 'padding' : '0px'}
			}
		// MaxHeight
		this.VideoPlayerSizes['MaxHeight'] = {'Num': '3',
			'Height': {'Min': -1, 'Max': 'parseInt($(window).height())'},
			'Width': {'Min': -1, 'Max': 'parseInt($(window).width())'},
			'Style': {'margin-left' : '0px', 'padding' : '0px'}
			}
		// MaxWidth
		/*
		this.VideoPlayerSizes.Sizes.push({
			'Name': 'MaxWidth',
			'Height': {'Min': -1, 'Max': 'parseInt($(window).width())'},
			'Width': {'Min': -1, 'Max': 'parseInt($(window).width())'},
			'Style': {'margin-left' : '0px', 'padding' : '0px'}
			});
		*/
	},
	
	'onDocumentStart': function(){
		//log.logDebug(Module_Info.name + ' - onDocumentStart');
	}
	
}

if(typeof GlobalVars.RegisterModule !== "undefined") GlobalVars.RegisterModule(CCE_Module_Videos);
else setTimeout(function() {
	if(typeof GlobalVars.RegisterModule !== "undefined") GlobalVars.RegisterModule(CCE_Module_Videos);
	//else window.location = window.location + '?CCEReloaded=1';
	//else window.location.reload();
},1);

