// ==UserScript==
// @name           TF2R Chatters Toolkit
// @namespace      http://iwasawafag.ru/tools
// @description    Provides some extra functionality for TF2R
// @version        1.8.7
// @include        http://tf2r.com/*.html*
// ==/UserScript==


(function() {var embedMe = function() {
	/**************************** Edit from here ****************************/

	var version = '1.8.7';

	/* TipTip | Copyright 2010 Drew Wilson | code.drewwilson.com/entry/tiptip-jquery-plugin */
	if (!$.fn.tipTip) {
		(function($){$.fn.tipTip=function(options){var defaults={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var opts=$.extend(defaults,options);if($("#tiptip_holder").length<=0){var tiptip_holder=$('<div id="tiptip_holder" style="max-width:'+opts.maxWidth+';"></div>');var tiptip_content=$('<div id="tiptip_content"></div>');var tiptip_arrow=$('<div id="tiptip_arrow"></div>');$("body").append(tiptip_holder.html(tiptip_content).prepend(tiptip_arrow.html('<div id="tiptip_arrow_inner"></div>')))}else{var tiptip_holder=$("#tiptip_holder");var tiptip_content=$("#tiptip_content");var tiptip_arrow=$("#tiptip_arrow")}return this.each(function(){var org_elem=$(this);if(opts.content){var org_title=opts.content}else{var org_title=org_elem.attr(opts.attribute)}if(org_title!=""){if(!opts.content){org_elem.removeAttr(opts.attribute)}var timeout=false;if(opts.activation=="hover"){org_elem.hover(function(){active_tiptip()},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}else if(opts.activation=="focus"){org_elem.focus(function(){active_tiptip()}).blur(function(){deactive_tiptip()})}else if(opts.activation=="click"){org_elem.click(function(){active_tiptip();return false}).hover(function(){},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}function active_tiptip(){opts.enter.call(this);tiptip_content.html(org_title);tiptip_holder.hide().removeAttr("class").css("margin","0");tiptip_arrow.removeAttr("style");var top=parseInt(org_elem.offset()['top']);var left=parseInt(org_elem.offset()['left']);var org_width=parseInt(org_elem.outerWidth());var org_height=parseInt(org_elem.outerHeight());var tip_w=tiptip_holder.outerWidth();var tip_h=tiptip_holder.outerHeight();var w_compare=Math.round((org_width-tip_w)/2);var h_compare=Math.round((org_height-tip_h)/2);var marg_left=Math.round(left+w_compare);var marg_top=Math.round(top+org_height+opts.edgeOffset);var t_class="";var arrow_top="";var arrow_left=Math.round(tip_w-12)/2;if(opts.defaultPosition=="bottom"){t_class="_bottom"}else if(opts.defaultPosition=="top"){t_class="_top"}else if(opts.defaultPosition=="left"){t_class="_left"}else if(opts.defaultPosition=="right"){t_class="_right"}var right_compare=(w_compare+left)<parseInt($(window).scrollLeft());var left_compare=(tip_w+left)>parseInt($(window).width());if((right_compare&&w_compare<0)||(t_class=="_right"&&!left_compare)||(t_class=="_left"&&left<(tip_w+opts.edgeOffset+5))){t_class="_right";arrow_top=Math.round(tip_h-13)/2;arrow_left=-12;marg_left=Math.round(left+org_width+opts.edgeOffset);marg_top=Math.round(top+h_compare)}else if((left_compare&&w_compare<0)||(t_class=="_left"&&!right_compare)){t_class="_left";arrow_top=Math.round(tip_h-13)/2;arrow_left=Math.round(tip_w);marg_left=Math.round(left-(tip_w+opts.edgeOffset+5));marg_top=Math.round(top+h_compare)}var top_compare=(top+org_height+opts.edgeOffset+tip_h+8)>parseInt($(window).height()+$(window).scrollTop());var bottom_compare=((top+org_height)-(opts.edgeOffset+tip_h+8))<0;if(top_compare||(t_class=="_bottom"&&top_compare)||(t_class=="_top"&&!bottom_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_top"}else{t_class=t_class+"_top"}arrow_top=tip_h;marg_top=Math.round(top-(tip_h+5+opts.edgeOffset))}else if(bottom_compare|(t_class=="_top"&&bottom_compare)||(t_class=="_bottom"&&!top_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_bottom"}else{t_class=t_class+"_bottom"}arrow_top=-12;marg_top=Math.round(top+org_height+opts.edgeOffset)}if(t_class=="_right_top"||t_class=="_left_top"){marg_top=marg_top+5}else if(t_class=="_right_bottom"||t_class=="_left_bottom"){marg_top=marg_top-5}if(t_class=="_left_top"||t_class=="_left_bottom"){marg_left=marg_left+5}tiptip_arrow.css({"margin-left":arrow_left+"px","margin-top":arrow_top+"px"});tiptip_holder.css({"margin-left":marg_left+"px","margin-top":marg_top+"px"}).attr("class","tip"+t_class);if(timeout){clearTimeout(timeout)}timeout=setTimeout(function(){tiptip_holder.stop(true,true).fadeIn(opts.fadeIn)},opts.delay)}function deactive_tiptip(){opts.exit.call(this);if(timeout){clearTimeout(timeout)}tiptip_holder.fadeOut(opts.fadeOut)}}})}})(jQuery);
	}

	/* liveQuiery | Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net) | http://docs.jquery.com/Plugins/livequery */
	if (!$.fn.livequery) {
		(function(e){e.extend(e.fn,{livequery:function(t,n,r){var i=this,s;if(e.isFunction(t))r=n,n=t,t=undefined;e.each(e.livequery.queries,function(e,o){if(i.selector==o.selector&&i.context==o.context&&t==o.type&&(!n||n.$lqguid==o.fn.$lqguid)&&(!r||r.$lqguid==o.fn2.$lqguid))return(s=o)&&false});s=s||new e.livequery(this.selector,this.context,t,n,r);s.stopped=false;s.run();return this},expire:function(t,n,r){var i=this;if(e.isFunction(t))r=n,n=t,t=undefined;e.each(e.livequery.queries,function(s,o){if(i.selector==o.selector&&i.context==o.context&&(!t||t==o.type)&&(!n||n.$lqguid==o.fn.$lqguid)&&(!r||r.$lqguid==o.fn2.$lqguid)&&!this.stopped)e.livequery.stop(o.id)});return this}});e.livequery=function(t,n,r,i,s){this.selector=t;this.context=n;this.type=r;this.fn=i;this.fn2=s;this.elements=[];this.stopped=false;this.id=e.livequery.queries.push(this)-1;i.$lqguid=i.$lqguid||e.livequery.guid++;if(s)s.$lqguid=s.$lqguid||e.livequery.guid++;return this};e.livequery.prototype={stop:function(){var e=this;if(this.type)this.elements.unbind(this.type,this.fn);else if(this.fn2)this.elements.each(function(t,n){e.fn2.apply(n)});this.elements=[];this.stopped=true},run:function(){if(this.stopped)return;var t=this;var n=this.elements,r=e(this.selector,this.context),i=r.not(n);this.elements=r;if(this.type){i.bind(this.type,this.fn);if(n.length>0)e.each(n,function(n,i){if(e.inArray(i,r)<0)e.event.remove(i,t.type,t.fn)})}else{i.each(function(){t.fn.apply(this)});if(this.fn2&&n.length>0)e.each(n,function(n,i){if(e.inArray(i,r)<0)t.fn2.apply(i)})}}};e.extend(e.livequery,{guid:0,queries:[],queue:[],running:false,timeout:null,checkQueue:function(){if(e.livequery.running&&e.livequery.queue.length){var t=e.livequery.queue.length;while(t--)e.livequery.queries[e.livequery.queue.shift()].run()}},pause:function(){e.livequery.running=false},play:function(){e.livequery.running=true;e.livequery.run()},registerPlugin:function(){e.each(arguments,function(t,n){if(!e.fn[n])return;var r=e.fn[n];e.fn[n]=function(){var t=r.apply(this,arguments);e.livequery.run();return t}})},run:function(t){if(t!=undefined){if(e.inArray(t,e.livequery.queue)<0)e.livequery.queue.push(t)}else e.each(e.livequery.queries,function(t){if(e.inArray(t,e.livequery.queue)<0)e.livequery.queue.push(t)});if(e.livequery.timeout)clearTimeout(e.livequery.timeout);e.livequery.timeout=setTimeout(e.livequery.checkQueue,20)},stop:function(t){if(t!=undefined)e.livequery.queries[t].stop();else e.each(e.livequery.queries,function(t){e.livequery.queries[t].stop()})}});e.livequery.registerPlugin("append","prepend","after","before","wrap","attr","removeAttr","addClass","removeClass","toggleClass","empty","remove","html");e(function(){e.livequery.play()})})(jQuery)
	}

	/* Some shit for make easily settings building */
	var ConfigManager=function(e,t){this._defaults={};this._flatConfig={};this._fields={};this._title=e;this._dom=$("");this._domCreated=false;t=this._preprocessConfig(t);this._readDefaults(t);this._receivedConfig=t;this._customMergers={}};ConfigManager.prototype={_buildSettingsLevel:function(e){var t=this;var n=$('<div class="cm-settings-level"></div>');$.each(e,function(e){var r;var i=t._createHTMLParts(e);if(t._customMergers.hasOwnProperty(i.type)&&typeof t._customMergers[i.type]=="function"){r=t._customMergers[i.type](i)}else{r=t._mergeFieldParts(i)}var s=$('<div class="cm-setting-block" />');if(this.nameInClass){s.addClass(e)}s.append(r);if(typeof this.children=="object"&&Object.keys(this.children).length>0){s.append(t._buildSettingsLevel(this.children))}n.append(s)});return n},_createHTMLParts:function(e){var t=function(e){return $("<div/>").text(e).html()};var n=function(e){return $("<div/>").html(e).text()};var r=this;var i={};var s=this._fields[e];var o=this.getValue(e);i.type=s.type;i.label=$('<span class="cm-label"></span>').text(s.label+"");if(s.tip!=""){i.tip=$('<span class="cm-tooltip">[?]</span>').tipTip({maxWidth:"480px",content:s.tip.replace("\n","<br/>")})}else{i.tip=$("")}if(s.type=="boolean"){i.element=$('<input type="checkbox" />');if(o){i.element.attr("checked","checked")}i.element.change(function(){r._setValue(e,$(this).is(":checked"))})}else if(s.type=="string"){i.element=$('<input value="" type="text" dir="ltr" autocomplete="off" spellcheck="false">').attr("placeholder",s.placeholder+"").attr("value",t(o)).bind("input propertychange",function(){r._setValue(e,n($(this).attr("value")))})}else if(s.type=="button"){i.element=$('<input type="button" value="">').attr("value",t(s.label+""));i.element.bind("click",s.action)}else if(s.type=="enum"){if(s.style=="select"){i.element=$("<select />");$.each(s.choices,function(e){var t=$("<option></option>");t.attr("value",e+"");t.text(this+"");if(o==e){t.attr("selected","selected")}i.element.append(t)});i.element.change(function(){r._setValue(e,$(this).val())})}else{i.element=$('<div class="cm-radio-container" />');var u=e;$.each(s.choices,function(e){var t=$('<input type="radio" name="" value="" />').attr("name",u).attr("value",e);if(o==e){t.attr("checked","checked")}var n=$("<label></label>");n.text(this+"");n.prepend(t);i.element.append(n);t.bind("change propertychange",function(){r._setValue(u,$(this).attr("value"))})})}}return i},_createDom:function(){this._dom=$(""+'<div class="cm-block">				<span class="cm-block-title">'+this._title+'</span>				<div class="cm-settings-container">				</div>				<span class="cm-dummy-tip" >All settings will be saved automatically</span>			</div>		');this._dom.find(".cm-settings-container").append(this._buildSettingsLevel(this._receivedConfig))},_mergeFieldParts:function(e){var t=$("<div/>");var n=$('<div class="cm-setting-label"></div>');var r=$('<div class="cm-setting-controls"></div>');t.append(n).append(r);if(e.type=="boolean"){var i=$("<label></label>");i.append(e.element).append("<span> </span>").append(e.label).append("<span> </span>").append(e.tip);r.append(i)}else if(e.type=="button"){r.append(e.element).append("<span> </span>").append(e.tip)}else{n.append(e.label).append("<span> </span>").append(e.tip);r.append(e.element)}return t.children()},_preprocessConfig:function(e){var t=this;$.each(e,function(e){if(t._fields.hasOwnProperty(e)){throw"Config parse error: Key "+e+" already exists."}this.label=typeof this.label!="string"?e:this.label;this.tip=typeof this.tip!="string"?"":this.tip;this.nameInClass=typeof this.nameInClass!="boolean"?false:this.nameInClass;if(this.type=="boolean"){this.default=typeof this.default!="boolean"?false:this.default}else if(this.type=="string"){this.default=typeof this.default!="string"?"":this.default;this.placeholder=typeof this.placeholder!="string"?"":this.placeholder}else if(this.type=="button"){this.action=typeof this.action!="function"?function(){}:this.action}else if(this.type=="enum"){if(typeof this.style!="string"){this.style="select"}else if(!/(?:select|dropdown|radio)/.test(this.style)){throw"Config parse error: Unknown style"}else if(this.style=="dropdown"){this.style="select"}if(typeof this.choices!="object"||Object.keys(this.choices).length==0){throw"Config parse error: Enum field must have some choices."}if(typeof this.default!="string"){this.default=Object.keys(this.choices)[0]}else if(!this.choices.hasOwnProperty(this.default)){throw"Config parse error: Specified default key for enum field is not a one of choices keys."}}else{throw"Config parse error: Unrecognized field type."}if(typeof this.children!="object"){this.children={}}t._fields[e]=$.extend(true,{},this);delete t._fields[e]["children"];t._preprocessConfig(this.children)});return e},_readDefaults:function(e){var t=this;$.each(e,function(e){t._defaults[e]=this.default;t._readDefaults(this.children)})},_returnDefault:function(e){return this._defaults[e]},_setValue:function(e,t){if(!localStorage||!localStorage.getItem||!localStorage.setItem){throw"LocalStorage unavailable. Update your browser, please >_>"}var n=localStorage.getItem("iws.tf2rExtension");if(n!=null){try{n=JSON.parse(n)}catch(r){n={}}}else{n={}}n[e]=t;localStorage.setItem("iws.tf2rExtension",JSON.stringify(n))},getDom:function(){if(this._domCreated){return this._dom}this._createDom();this._domCreated=true;return this._dom},getValue:function(e){if(localStorage&&localStorage.getItem&&localStorage.setItem){var t=localStorage.getItem("iws.tf2rExtension");if(t==null){return this._returnDefault(e)}try{t=JSON.parse(t)}catch(n){localStorage.removeItem("iws.tf2rExtension")}if(t==null||typeof t[e]=="undefined"){return this._returnDefault(e)}return t[e]}else{throw"LocalStorage unavailable. Update your browser, please >_>"}},setCustomItemBuilder:function(e,t){this._customMergers[e]=t}};

	// Это просто набор функций в объекте.
	var Notifications = function() {
		this._windowFocused = true;
		var self = this;

		$(window).bind({
			focus: function(){ self._windowFocused = true; },
			blur:  function(){ self._windowFocused = false; }
		});

	};
	Notifications.prototype = {
		supported: function() {
			return !!window.webkitNotifications;
		},
		permission: function() {
			return this.supported() ? window.webkitNotifications.checkPermission() : 2;
		},
		allowed: function() {
			return this.permission() == 0;
		},
		denied: function() {
			return this.permission() == 2;
		},
		notAllowed: function() {
			return this.permission() == 1;
		},
		requestPermission: function() {
			if (!this.supported()) {
				return;
			}
			if (this.notAllowed())
				return window.webkitNotifications.requestPermission();
		},
		notify: function(icon, title, body) {
			if (!this.supported() || this._windowFocused) {
				return;
			}

			var notification = window.webkitNotifications.createNotification(icon, title, body);
			notification.onclick = function () {
				window.focus();
				this.cancel();
			};
			notification.show();
			setTimeout(function() {
				notification.close();
				//notification.cancel();
			}, 7000);
		}
	};
	var desktopNotifications = new Notifications();



	var styleFixes = function(){
		var styles = '';

		styles += '\n\
			.ufinf {\
				height: 0;\
			}\
			.ufmes .iws-embedded-image-container {\n\
				margin-bottom: 2px;\n\
			}\
			.userfeed {\
				height: auto;\
			}\
			.userstatemessage {\
				background-color: #181818;\
				margin: 2px 0px;\
				padding: 2px 7px 3px;\
				border: 1px solid #5B4D40;\
				-webkit-border-radius: 3px;\
				-moz-border-radius: 3px;\
				border-radius: 3px;\
				clear: both;\
				position: relative;\
				/*opacity: 0.3;*/\
			}';

		// Settings block styles
		styles += '.cm-block{background-color:#2A2725;position:relative;border:1px solid #5B4D40;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;margin:30px 10px 10px;padding:10px 10px 20px;} \
			.cm-block .cm-block-title{display:block;position:absolute;left:10px;top:-10px;background:#2a2725;padding:0 10px;}\
			.cm-block .cm-dummy-tip{display:block;position:absolute;bottom:4px;right:5px;font-size:9px;} \
			.cm-block .cm-settings-level .cm-settings-level{border-left:2px solid #5B4D40;margin-left:25px;padding:0 4px; overflow: hidden;} \
			.cm-block .cm-settings-level .cm-settings-level .cm-settings-level{border-left:0;} \
			.cm-block .cm-tooltip{color:#97918C;cursor:pointer;} \
			.cm-block .cm-setting-controls{margin:2px 0;}\
			.cm-block .cm-radio-container label {margin-left: 10px;}\
			.cm-block .cm-radio-container label:first-child {margin-left: 0px;}\
			.cm-block .cm-settings-container > .cm-settings-level > .cm-setting-block {margin-bottom: 4px;}\
			.cm-block .cm-setting-block.whatDoWithHTMLinChat > .cm-setting-label {display: none}\
			.cm-block .cm-setting-block.embedImagesWhitelistedDomains > .cm-setting-controls input {width: 580px;}\
			\
			#tiptip_holder { display: none; position: absolute; top: 0; left: 0; z-index: 99999; }\
			#tiptip_holder.tip_top { padding-bottom: 5px; }\
			#tiptip_holder.tip_bottom { padding-top: 5px; }\
			#tiptip_holder.tip_right { padding-left: 5px; }\
			#tiptip_holder.tip_left { padding-right: 5px; }\
			#tiptip_content { font-size: 11px; color: #fff; text-shadow: 0 0 2px #000; padding: 4px 8px 6px; border: 1px solid #000000; background-color: rgb(25,25,25); border-radius: 2px; -webkit-border-radius: 2px; -moz-border-radius: 2px; }\
			#tiptip_arrow, #tiptip_arrow_inner { position: absolute; border-color: transparent; border-style: solid; border-width: 6px; height: 0; width: 0; }\
			#tiptip_holder.tip_top #tiptip_arrow { border-top-color: #000000; }\
			#tiptip_holder.tip_bottom #tiptip_arrow { border-bottom-color: #000000; }\
			#tiptip_holder.tip_right #tiptip_arrow { border-right-color: #000000; }\
			#tiptip_holder.tip_left #tiptip_arrow { border-left-color: #000000; }\
			#tiptip_holder.tip_top #tiptip_arrow_inner { margin-top: -7px; 	margin-left: -6px; border-top-color: #161616; }\
			#tiptip_holder.tip_bottom #tiptip_arrow_inner { margin-top: -5px; margin-left: -6px; border-bottom-color: #161616; }\
			#tiptip_holder.tip_right #tiptip_arrow_inner { margin-top: -6px; margin-left: -5px; border-right-color: #161616; }\
			#tiptip_holder.tip_left #tiptip_arrow_inner { margin-top: -6px; margin-left: -7px; border-left-color: #161616; }\
		';


		// Muted style for entries list in chat.

		if ((/\/chat\.html/i).test(document.location)) {
			styles += '\n\
				#users .cname.muted {\
					text-decoration: line-through;\
				}\
				.userfeedpost.mentioned {\
					border-color: #B18A28;\
					box-shadow: inset 0 0 16px -6px #FFED69;\
					box-shadow: inset 0 0 16px -6px #FFED69, inset 0 0 1000px -110px white, 0 0 13px -2px black;\
				}\n\
				\n\
				\n\
				@-moz-document url-prefix() {\
					.userfeedpost.mentioned {\
						box-shadow: inset 0 0 15px -7px #FFED69, inset 0 0 1000px -110px rgba(255,255,255,.10), 0 0 13px -2px black;\
					}\
				}\
			';
		}

		// Notification
		styles += "\n\n\
			div.iws-fscrManga-notify{display:block;background:#cf1a4d;background:rgba(207,26,77,.85);position:fixed;overflow:hidden;width:240px;height:62px;margin:0;padding:8px 8px 8px 80px;border-radius:6px;top:10px;right:10px;z-index:1000000;color:#fff;text-shadow:0 1px 0 #901234;text-shadow:0 1px 0 rgba(144,18,52,.75);box-shadow:0 2px 8px -2px #000;box-shadow:0 2px 8px -2px rgba(0,0,0,0.6)}\
			div.iws-fscrManga-notify h1{font:bold 18px Arial,Verdana,sans-serif!important;display:block!important;padding:0!important;margin:0!important;color:#fff!important;text-align:left!important;line-height: 21px !important;}\
			div.iws-fscrManga-notify > span{display:block!important;font:normal 14px Arial,Verdana,sans-serif!important;color:#fff!important;vertical-align:top!important;text-align:left!important;line-height:22px!important; margin-top: -2px;}\
			div.iws-fscrManga-notify div.iws-fscrManga-notify-icon-shadow{display:block;width:69px;height:11px;margin:0;padding:0;background:transparent url('http://userscripts-data.iwasawafag.ru/tf2r-chattertools/sprite.png') 0 0 no-repeat;position:absolute;top:66px;left:5px}\
			div.iws-fscrManga-notify div.iws-fscrManga-notify-icon{display:block;width:69px;height:62px;margin:0;padding:0;background:transparent url('http://userscripts-data.iwasawafag.ru/tf2r-chattertools/sprite.png') 0 -14px no-repeat;position:absolute;top:9px;left:4px}\
			\
			div.iws-fscrManga-notify div.button {\
				display: block;\
				float: left;\
				color: #646464 !important;\
				font-family: 'Segoe UI', Tahoma, sans-serif !important;\
				text-shadow: none !important;\
				font-size: 12px !important;\
				line-height: 20px !important;\
				padding: 0px 8px;\
				border: 1px solid #AFAFAF;\
				box-shadow: 0 1px 1px #000;\
				border-radius: 2px;\
				margin-right: 10px;\
				cursor: pointer;\
				-moz-user-select: none;\
				-khtml-user-select: none;\
				-webkit-user-select: none;\
				-o-user-select: none;\
				user-select: none;\
				\
				background: rgb(249,249,249);\
				background: -moz-linear-gradient(top, rgba(249,249,249,1) 0%, rgba(212,220,221,1) 100%);\
				background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(249,249,249,1)), color-stop(100%,rgba(212,220,221,1)));\
				background: -webkit-linear-gradient(top, rgba(249,249,249,1) 0%,rgba(212,220,221,1) 100%);\
				background: -o-linear-gradient(top, rgba(249,249,249,1) 0%,rgba(212,220,221,1) 100%);\
				background: -ms-linear-gradient(top, rgba(249,249,249,1) 0%,rgba(212,220,221,1) 100%);\
				background: linear-gradient(to bottom, rgba(249,249,249,1) 0%,rgba(212,220,221,1) 100%);\
			}\
			div.iws-fscrManga-notify div.button.primary {\
				color: #3d3d3d !important;\
			}\
			div.iws-fscrManga-notify div.button:active {\
				margin-top: 1px !important;\
				box-shadow: none;\
			}\
		";

		// Appending styles.

		$('<style> ' + styles + ' </style>').appendTo('body');
	};


	var addRaffleLeavingConfirmation = function() {
		if (!/tf2r\.com\/k[a-z0-9]+?\.html/i.test(document.location.href)) {
			return;
		}

		var btn = $('.jlbutl #enbut'),
			clicks;

		if (!btn.length) {
			return;
		}

		if (jQuery._data) {
			clicks = jQuery._data(btn.get(0), 'events').click;
		} else {
			clicks = btn.data('events').click;
		}

		clicks.unshift({type: 'click', handler: function(e) {
			var wantToLeave = confirm('Are you sure you want to leave this raffle?');
			if (!wantToLeave) {
				e.stopImmediatePropagation();
				return false;
			}
		}});
	};













	var getMutedUserList = function() {
		var data = localStorage.getItem('iws.tf2rChat.muted');
		if (data == null || typeof data == 'undefined') {
			data = {};
		} else {
			try {
				data = JSON.parse(data);
			} catch(e) {
				data = {};
			}
		}

		return data;
	};
	var updateMutedList = function(list) {
		localStorage.setItem('iws.tf2rChat.muted', JSON.stringify(list));
	};
	var checkMessageForMutedOwner = function(message) {
		var href = $(message).find('.ufname a').attr('href');
		var muted = getMutedUserList();

		if (muted[href]) {
			$(message).remove();
			message = $('');
		}

		return message;
	};













// Main code that listen for elements, clicks and
// replace links to images goes from here.

	var fixLinksInMessages = function() {
		$(
			'.userfeedpost .ufmes'                    // messages from chat, profile and raffle-pages
				+ ', .post_holder .post_right'            // comments from dev blog, lol, why not
				+ ', .raffle_infomation tr:first td:last' // raffle message
		).livequery(function() {
				var contents = $(this).first().contents().filter(function () { return this.nodeType === 3; });
				$.each(contents, function() {
					if (this.nodeType != 3)
						return;

					var text = this.nodeValue.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")

					text = text.replace(/(?!<a.*?>[^<>]*)[a-z]+?:\/\/[^\s;\'\"]+(?!\"|')(?![^<>]*<\/a>)/ig, function(m){
						var r = (/^\(([\s\S]+?)\)$/ig).exec(m);
						if (r != null) m=r[1];
						return ((r != null) ? '(' : '') + '<a href="' + m + '">' + m + '</a>' + ((r != null) ? ')' : '');
					});
					$(this).replaceWith(text);
				});
			});
	};

	var makeImagesEmbeddable = function() {

		var isOkToAutoEmbed = function(a) {
			a = $(a);

			var href = a.attr('href');
			if (href === undefined) return false;

			if ( // domains and file extension
				(/^[^?#]*?(?:\.png|\.jpg|\.bmp|\.jpeg|\.gif|\.ico|\.apng)(?:[?#].*?)*?$/i).test(href)
					|| (/^http(?:|s):\/\/(?:media|cdn|cloud|cloud-)[0-9]*?\.steampowered\.com\/.*?$/i).test(href)
					|| (/^http(?:|s):\/\/(?:media|cdn|cloud|cloud-)[0-9]*?\.steamcommunity\.com\/.*?$/i).test(href)
					|| (/^http(?:|s):\/\/(?:www\.|)puu\.sh\/.*?$/i).test(href)
					|| (/^http(?:|s):\/\/(?:www\.|)ompldr\.org\/.*?$/i).test(href)
				) {
				if (cm.getValue('checkForNSFW')) {
					var test = a.parent().clone();
					test.find('a').remove();
					if ((/(?:[nsfw]{3,4}|not[\s]*?safe[\s]*?for)/i).test(test.text())) {
						return false;
					}
				}
				if (cm.getValue('checkForSpoilers')) {
					var test = a.parent().clone();
					test.find('a').remove();
					if ((/spoiler\b/i).test(test.text())) {
						return false;
					}
				}


				// Теперь, если включена опция вайтлистов проверяем для каждого из них.

				if (cm.getValue('embedImmediatelyNotFromEveryDomain')) {
					var domainFromWhiteList = false;

					var list = cm.getValue('embedImagesWhitelistedDomains');
					list += ' steampowered.com steamcommunity.com puu.sh ompldr.org';

					list.replace(/[^ ]+/g, function(word) {
						if ((new RegExp('http(?:s|):\\/\\/(?:[^\\\\/]*?\\.|)' + word, 'i').test(href))) {
							domainFromWhiteList = true;
						}
					});

					if (!domainFromWhiteList) return false;
				}

				return true;
			}
			return false;
		};

		var tryToEmbedLink = function(a) {
			if (/^[^?#]*?(?:\.webm|\.mp4|\.ogg|\.mp3)(?:[?#].*?)*?$/i.test(a.href)) {
				return;
			}

			a = $(a);
			var href = a.attr('href');
			if (href === undefined) return false;

			$("<img>", {
				load: function () {
					$(this).attr('style', 'max-width: 99%; max-height: 400px;');
					var embedContainer = $(
						'<div class="iws-embedded-image-container">\
							<div style="clear:both;float:none;"></div>\
							<div style="clear:both;float:none;"></div>\
						</div>'
					);
					var imageWrap = a.clone();
					imageWrap.html(this).insertAfter(embedContainer.find('div:first'));
					embedContainer.data('originalTag', a);
					a.replaceWith(embedContainer);
				},
				error: function() {
					$(this).remove();
				},
				src: href
			});
		};

		$(
			'.userfeedpost .ufmes'                    // messages from chat, profile and raffle-pages
				+ ', .post_holder .post_right'            // comments from dev blog, lol, why not
				+ ', .raffle_infomation tr:first td:last' // raffle message
		).livequery(function() {
				$(this).delegate('a', 'click', function(e) {
					if (/^[^?#]*?(?:\.webm|\.mp4|\.ogg|\.mp3)(?:[?#].*?)*?$/i.test(this.href)) {
						return;
					}

					// All links from chat page will open in new window/tab.
					if ((/tf2r\.com[\/]*?chat\.html/i).test(document.location.href)) {
						$(this).attr('target', '_blank');
					}

					if (e.shiftKey) {
						var $embed = $(this).closest('.iws-embedded-image-container');
						if ($embed.length > 0) {
							$embed.replaceWith($embed.data('originalTag'));
						} else {
							tryToEmbedLink(this);
						}
						e.preventDefault();
						return false;
					}
				});

				if (cm.getValue('embedImmediately')) {
					$(this).find('a').each(function(i, a) {
						if (isOkToAutoEmbed(a)) {
							tryToEmbedLink(a);
						}
					});
				}
			});
	};



	var embedMedia = function() {

		var isMediaLink = function(link) {
			return (/^[^?#]*?(?:\.webm|\.mp4|\.ogg|\.mp3)(?:[?#].*?)*?$/i.test(link));
		};

		var isOkToAutoEmbed = function(a) {
			if (!cm.getValue('embedMediaImmediately')) {
				return false;
			}

			a = $(a);

			var href = a.attr('href');
			if (href === undefined) return false;

			if (isMediaLink(href)) {
				if (cm.getValue('checkMediaForNSFW')) {
					var test = a.parent().clone();
					test.find('a').remove();
					if ((/(?:[nsfw]{3,4}|not[\s]*?safe[\s]*?for)/i).test(test.text())) {
						return false;
					}
				}

				return true;
			}
			return false;
		};

		var tryToEmbedLink = function(a) {
			a = $(a);
			var href = a.attr('href');
			if (href === undefined) return false;

			var tag;

			if (/^[^?#]*?(?:\.webm|\.mp4)(?:[?#].*?)*?$/i.test(href)) {
				tag = $('<video src="" style="max-width: 99%; max-height: 400px;" controls=""></video>').attr('src', href);
			} else {
				tag = $('<audio src="" style="width: 99%; max-height: 400px;" controls=""></audio>').attr('src', href);
			}

			tag.data('_originalLink', a);

			tag.click(function(e) {
				if (!e.shiftKey) {
					return;
				}

				$(this).closest('.iws-embedded-image-container').replaceWith($(this).data('_originalLink'));
				return false;
			});

			var embedContainer = $(
			'<div class="iws-embedded-image-container">\
					<div style="clear:both;float:none;"></div>\
					<div style="clear:both;float:none;"></div>\
				</div>'
			);
			//var imageWrap = a.clone();
			tag.insertAfter(embedContainer.find('div:first'));
			embedContainer.data('originalTag', a);
			a.replaceWith(embedContainer);
		};

		$(
			'.userfeedpost .ufmes'                    // messages from chat, profile and raffle-pages
				+ ', .post_holder .post_right'            // comments from dev blog, lol, why not
				+ ', .raffle_infomation tr:first td:last' // raffle message
		).livequery(function() {
				var self = this;
				setTimeout(function() {

					$(self).delegate('a', 'click', function(e) {
						if (!isMediaLink(this.href)) {
							return;
						}

						if (e.shiftKey) {
							tryToEmbedLink(this);
							return false;
						}
					});

					$(self).find('a').each(function(i, a) {
						if (isOkToAutoEmbed(a)) {
							tryToEmbedLink(a);
						}
					});
				}, 0);
			});
	};

	// Do some fixes in original code
	var fixOriginalFunctions = function() {
		if (!$('#chat').length) {
			return;
		}
		window.iwsLastcm = 0;
		window.checkChat = function (){
			if(isFocused || itik >= 10)
				$.ajax({
					type: "post",
					url: "http://tf2r.com/job.php",
					dataType: "json",
					data: {
						"chchat": "true",
						"lastm": lastcm
					},
					success: function(data){
						if (!data) {
							return;
						}
						if(data.status == "fail") {
							alert(data.message);
						}
						else if(data.status == "ok") {
							if(data.message.chat.length >= 1) {
								data.message.chat.sort(function(a,b){return a.id - b.id;});
								for(id in data.message.chat) {
									AddMess(data.message.chat[id]);
								}
							}
							lastcm = data.message.chatmax; // this line moved down
							$("#users").html("");
							if(data.message.users.length >= 1) {
								for(id in data.message.users) {
									var ent = data.message.users[id];
									$("#users").prepend("<div class=\"cname\" cname=\""+ent.id+"\"><a href=\""+ent.url+"\" style=\"color:#"+ent.color+"\">"+ent.name+"</a></div>");
								}
							}
							$("#ppl").html(data.message.users.length+" people in chat.");
						}
					}
				});

			if(itik >= 10)
				itik = 0;

			itik ++;
			setTimeout(checkChat, 3000);
		};
		/*var originalAddMess = window.AddMess;
		 window.AddMess = function(ent) {
		 if (lastcm && ent.id <= lastcm) return;
		 return originalAddMess(ent);
		 }*/
		window.AddMess = function(ent) {
			if (lastcm && ent.id <= lastcm) return;
			if (iwsLastcm >= ent.id) return;

			iwsLastcm = ent.id;

			while (ent.message.indexOf("\n") > -1)
				ent.message = ent.message.replace("\n", "<br />");

			//$("#chat").prepend("<div class=\"userfeedpost\" style=\"display:none; background-color:#"+ent.color+";\"><div class=\"ufinf\"><div class=\"ufname\"><a href=\""+ent.url+"\" style=\"color:#"+ent.color+";\">"+ent.name+"</a></div><div class=\"ufavatar\"><div style=\"position: absolute; top: -15px; left: -9px;\"><img src=\"images/partyhat_tiny.png\"></div><a href=\""+ent.url+"\"><img src=\""+ent.avatar+"\"></a></div></div><div class=\"ufmes\">"+ent.message+"</div></div>");

			var message = (
				"<div class=\"userfeedpost\" style=\"display:none; background-color:#"+ent.color+";\">\
					<div class=\"ufinf\">\
						<div class=\"ufname\">\
							<a href=\""+ent.url+"\" style=\"color:#"+ent.color+";\">"/*+'['+ent.id+'] '*/+ent.name+"</a></div><div class=\"ufavatar\">\
							<a href=\""+ent.url+"\"><img src=\""+ent.avatar+"\"></a>\
					</div>\
				</div>\
				<div class=\"ufmes\">"+ent.message+"</div></div>"
				);


			message = checkMessageForMutedOwner(message);
			$("#chat").prepend(message);
		};
	};

	var initNoticesAboutUserEnterAndLeaveTheChat = function() {
		if (!(/tf2r\.com\/chat/i).test(document.location.href)) {
			return;
		}

		var previousList;

		var addUserstateMess = function(message) {
			var message = $('<div class="userstatemessage" style="padding-left: 20px;">' + message + '</div>');
			$('#chat').prepend(message);
			message.delay(1500).animate({opacity:.3}, 500);
		};

		setInterval( function() {
			var firstIteration = !previousList;
			var users = $('#users .cname a');

			if (!firstIteration) {
				var copyOfPreviousList = $.extend(true, {}, previousList);
				// user enter
				users.each(function(i, user) {
					var href = $(user).attr('href');
					var name = $(user).html();
					if (typeof previousList[href] == 'undefined') {
						addUserstateMess(name + ' entered chat.');
					} else if (name != previousList[href]) {
						addUserstateMess(
							previousList[href]
								+ ' has changed their name to '
								+ name + '.'
						);
					}
					delete copyOfPreviousList[href];
				});

				// user leave
				$.each(copyOfPreviousList, function(i, name) {
					addUserstateMess(name + ' left chat.');
				});
			}

			// Dump entries list to prevousList var
			previousList = {};

			// skip, if messages wasn't loaded yet
			if ($('#ppl').html() == '# people in chat') {
				return;
			}

			users.each(function(i, user) {
				user = $(user);
				var href = $(user).attr('href');
				previousList[href] = user.html();
			});
		}, 400);

		// Remove notifications from the end of messages area.
		setInterval(function() {
			var lastMessage = $('.userstatemessage:last');
			if (lastMessage.nextAll().length) {
				return;
			}
			lastMessage.slideUp(250, function(){
				$(this).remove();
			});
		}, 100);
	};



	var makePeoplesIgnorableInChat = function() {
		if (!(/tf2r\.com\/chat/i).test(document.location.href)) {
			return;
		}

		var users = $('#users');

		// Mute those, who muted

		users.delegate('.cname a', 'click', function() {
			var cname = $(this).closest('.cname');
			var href = $(this).attr('href');

			if (href == $('#member_holder #avatar a').attr('href')) {
				return; // Cannot mute yourself.
			}

			cname.toggleClass('muted');
			var muted = cname.hasClass('muted');

			// Receive data.

			data = getMutedUserList();
			data[href] = muted;
			updateMutedList(data);

			return false;
		});

		// Update muted indication due to userlist rewriting everytime.
		var updateUsersList = function() {
			var muted = getMutedUserList();
			users.find('.cname a').each(function (i, el) {
				el = $(el);
				if (muted[$(this).attr('href')]) {
					el.closest('.cname').addClass('muted');
				}
			});
			setTimeout(updateUsersList, 20);
		};
		updateUsersList();

		if ($('#chat').length) {
			$('.userfeedpost .ufname').each(function() {
				checkMessageForMutedOwner($(this).closest('.userfeedpost'));
			}).livequery(function() {
					checkMessageForMutedOwner($(this).closest('.userfeedpost'));
				});
		}
	};

	var initHTMLCutter = function() {
		function htmlEncode(value){
			if (value) {
				return jQuery('<div />').text(value).html();
			} else {
				return '';
			}
		}

		var cutHTML = function(message) {
			var wrapper = $('<div>' + message + '</div>');
			wrapper.find('*')
				.removeAttr('onmouseover')
				.removeAttr('onmouseout')
				.removeAttr('onmousedown')
				.removeAttr('onmouseup')
				.removeAttr('onclick');

			if (wrapper.find('script, object, embed, iframe, frame, style').length > 0) {
				// Если что-то нашлось.

				if (cm.getValue('whatDoWithHTMLinChat') == 'cutTheFuckOut') {
					return stripedMessage = wrapper.text() + '&nbsp;';
				} else {
					var blueArea = $('' +
						'<div style="border-radius: 3px;border: 1px solid #1B87C4;background: #2D76A7; padding: 3px 5px 2px; margin: 20px 10px 7px 2px; color: #EEE; position: relative; text-shadow: 0 0 1px #000;">' +
						'<button style="float: right; padding: 6px 20px; margin-right: -1px; ">Allow</button>' +
						'<div style="color: #fff;margin: 10px 0;padding-bottom: 14px;border-bottom: 1px dashed #fff;">' +
						'Just attempted to post html-code. Click the button, to paste it as html.' +
						'</div>' +
						htmlEncode(message) +
						'</div>').data('html', message);
					blueArea.find('button').click(function() {
						$(this).parent().replaceWith($(this).parent().data('html'));
					});
					return blueArea;
				}
			}
			return wrapper.get(0).innerHTML;
		};

		// Remove all the things from messages which not a link.
		// And not a container of embedded image, yeah.

		/* Sssshh... There is a leak. We cant affect <script>-elements if they was already
		 on the page. Because it's content (code) will be executed much earlier than
		 userscript will be assigned to the page. So, if Miz post <script> that will
		 insert autoplaying video to the somewhere and then terminate sessions for
		 all users (lol), all chatters will have to reload chat page (with login)
		 and get the fucking video. In this case we can do nothing. >_> */

		// Pretty uneffective to already posted <script>
		$('.ufmes').each(function(i, elem) {
			$(elem).html( cutHTML( elem.innerHTML ) );
		});

		// Now redefine default function that adding new messages to the chat.
		window.AddMess = function(ent) {
			// do the same check as in fixed function:
			if (lastcm && ent.id <= lastcm) return; // Filter messages, that already displayed.
			if (iwsLastcm >= ent.id) return;

			iwsLastcm = ent.id;

			while (ent.message.indexOf("\n") > -1)
				ent.message = ent.message.replace("\n", "<br />");

			ent.message = cutHTML(ent.message);

			var message = $("<div class=\"userfeedpost\" style=\"display:none; background-color:#"+ent.color+";\"><div class=\"ufinf\"><div class=\"ufname\"><a href=\""+ent.url+"\" style=\"color:#"+ent.color+";\">"/*+'['+ent.id+'] '*/+ent.name+"</a></div><div class=\"ufavatar\"><a href=\""+ent.url+"\"><img src=\""+ent.avatar+"\"></a></div></div><div class=\"ufmes\"></div></div>");
			message.find('.ufmes').html(ent.message);

			$("#chat").prepend(message);
		};
	};

	var findMentions = function() {
		var mention = function(userfeedpost) {
			var profileLink = localStorage.getItem('profileLink');
			if (typeof profileLink == 'string' && profileLink == userfeedpost.find('.ufname a').attr('href')) {
				return;
			}

			userfeedpost.addClass('mentioned');

			if (cm.getValue('notifyWithDesctopNotifications')) {
				var avatarSrc = userfeedpost.find('.ufavatar img').attr('src');
				var name = userfeedpost.find('.ufname a').text();
				var message = userfeedpost.find('.ufmes').text();

				desktopNotifications.notify(
					avatarSrc,
					name + ' has probably mentioned you in their message',
					message
				);
			}

		};


		$('.userfeedpost .ufmes').livequery(function() {

			var userName,
				userNameParts = '',
				mentioned = false; // Если true, значит какой-то шаблон уже совпал и дальше проверять не нужно.


			var profileLink = localStorage.getItem('profileLink');
			if (typeof profileLink == 'string') {
				var notFound = true;

				$('#users .cname a').each(function() {
					if ($(this).attr('href') == profileLink) {
						userName = $(this).text();
						notFound = false;
					}
				});
				if(notFound) {
					localStorage.removeItem('profileLink');
				}
			}

			if (!userName) {
				// Last attempt to receive it directly from header.
				var nameho = $('#nameho');
				if (nameho.length && nameho.text() != '') {
					userName = nameho.text();
				}
			}
			if (!userName) {
				return;
			}

			var userfeedpost = $(this).closest('.userfeedpost');


			// помимо никнейма целиком камелКейс разбираем на отдельные слова тоже.
			userName += '' + userName.replace(/([A-Z])/g, ' $1');

			if (cm.getValue('checkForPartsOfMyName')) {
				userNameParts = '';
				userName.replace(/[^ ]+/g, function(word) {
					var part = (/^[\S]{3}/i).exec(word);
					if (part != null) {
						userNameParts += ' ' + part[0];
					}
					var part = (/[\S]{3}$/i).exec(word);
					if (part != null) {
						userNameParts += ' ' + part[0];
					}
				});
			}

			var clone = $(this).clone();
			clone.find('*').remove();

			userName.replace(/[^ ]+/g, function(word) {
				if (mentioned) {
					return;
				}

				if(word.length < 3) {
					return;
				}
				if (RegExp('\\b' + word + '\\b', 'i').test(clone.text())) {
					mention(userfeedpost);
					mentioned = true;
					return;
				}
			});

			if (mentioned) {
				return;
			}

			userNameParts.replace(/[^ ]+/g, function(word) {
				if (mentioned) {
					return;
				}

				if (RegExp(word, 'i').test(clone.text())) {
					mention(userfeedpost);
					mentioned = true;
					return;
				}
			});

			if (mentioned) {
				return;
			}

			cm.getValue('highlightMessagesKeywords').replace(/[^ ]+/g, function(word) {
				if (mentioned) {
					return;
				}

				word = (cm.getValue('highlightMessagesKeywordsWholeWords')) ? ('\\b' + word + '\\b') : word;
				if (RegExp(word, 'i').test(clone.text())) {
					mention(userfeedpost);
					mentioned = true;
					return;
				}
			});

			if (mentioned) {
				return;
			}

		});

	};


	var IwsNotify = function(title, content, bounces) {
		this._dom = $('\
			<div class="iws-fscrManga-notify">\
				<h1 class="title"></h1>\
				<span class="content"></span>\
				<div class="iws-fscrManga-notify-icon-shadow"></div>\
				<div class="iws-fscrManga-notify-icon"></div>\
			</div>\
		');

		this._bounceDelay = null;
		this._bounces = bounces;

		this.setTitle(title);
		this.setContent(content);
	};

	IwsNotify.prototype = {
		_iconBounce: function() {
			var self = this;
			this._dom.children('div.iws-fscrManga-notify-icon').stop(true, true).animate({
				top: '2px'
			}, 300, function() {
				self._dom.children('div.iws-fscrManga-notify-icon').animate({
					top: '9px'
				}, 300);
			});
			this._dom.children('div.iws-fscrManga-notify-icon-shadow').stop(true, true).animate({
				opacity: '.5'
			}, 300, function() {
				self._dom.children('div.iws-fscrManga-notify-icon-shadow').animate({
					opacity: '1'
				}, 300);
			});
		},
		_startBouncing: function(times) {
			times = Math.max(times, 0);
			var self = this;

			if (times == 0) {
				clearTimeout(this._bounceDelay);
				return;
			} else {
				clearTimeout(this._bounceDelay);
				this._bounceDelay = setTimeout(function(){
					self._iconBounce();
					self._startBouncing(times - 1);
				}, 600);
			}
		},
		setTitle: function(title) {
			title = title || '';
			this._dom.children('h1.title').html(title);
		},
		setContent: function(content) {
			content = content || '';
			this._dom.children('span.content').html(content);
		},
		showIfNotShowed: function() {
			if (!this._dom.is(':visible')) {
				this.show();
			}
		},
		show: function() {
			this._dom.appendTo('body');
			this._dom.stop(true).css({
				display: 'block',
				opacity: 0,
				top: '-15px'
			});

			var bounces = this._bounces || 6;

			this._startBouncing(bounces);
			this._dom.stop(true).animate({
				opacity: 1,
				top: '10px'
			}, 500);
		},
		hide: function() {
			var self = this;
			clearTimeout(this._bounceDelay);
			this._iconBounce(); // creates good-looking effect
			this._dom.stop(true).animate({
				opacity: 0,
				top: '45px'
			}, 500, function() {
				self._dom.detach();
			});
		}
	};




	var checkVersion = function() {

		var notify = new IwsNotify(null, null, 18);

		var showNotify = function() {
			var content = $('<span>New version available!<br/></span>');
			$('<div class="button primary">Visit script page</div>').appendTo(content)
				.click(function() {
					window.open('http://userscripts.org/scripts/show/162958');
					notify.hide();
					localStorage.setItem('iws.lastVersionCheckTimestamp', Math.floor(new Date() / 1000));
				});
			$('<div class="button">Remind me later</div>').appendTo(content)
				.click(function() {
					notify.hide();
					localStorage.setItem('iws.lastVersionCheckTimestamp', Math.floor(new Date() / 1000) + 60*60*12);
				});

			notify.setTitle('TF2R Chatters Toolkit');
			notify.setContent(content);
			notify.showIfNotShowed();
		};

		var isItTimeToCheck = function() {
			var lastCheck = parseInt(localStorage.getItem('iws.lastVersionCheckTimestamp'));
			if (isNaN(lastCheck) || (lastCheck+'').length != 10) {
				return true;
			} else {
				return Math.floor(new Date() / 1000) - 60 * 7 > lastCheck * 1;
			}
		};

		var loop = function() {

			setTimeout(function() {
				loop();
			}, 1000 * 60);

			if (!isItTimeToCheck()) {
				return;
			}

			localStorage.setItem('iws.lastVersionCheckTimestamp', Math.floor(new Date() / 1000));

			$.getJSON('http://userscripts-data.iwasawafag.ru/tf2r-chattertools/latest-version' + "?callback=?", null, function(result) {
				localStorage.setItem('iws.lastVersionReceived', result);
				if (version != result) {
					showNotify();
				} else {
					notify.hide();
				}
			});

		};

		var loopLocal = function() {

			setTimeout(function() {
				loopLocal();
			}, 1000 * 2);

			if (!isItTimeToCheck()) {
				var lastReceivedVer = localStorage.getItem('iws.lastVersionReceived');
				if (lastReceivedVer == null) {
					return;
				}

				var lastCheck = parseInt(localStorage.getItem('iws.lastVersionCheckTimestamp'));
				if (!isNaN(lastCheck) && (lastCheck+'').length == 10 && lastCheck > Math.floor(new Date() / 1000)) {
					notify.hide();
				} else if (version != lastReceivedVer) {
					showNotify();
				} else {
					notify.hide();
				}
			}
		};


		loop();
		loopLocal();

	};























// init
	var cm;
	$(function() {

		// Replace original functions to prevent spawning dup
		fixOriginalFunctions();
		styleFixes();
		addRaffleLeavingConfirmation();
		checkVersion();

		// Trying to receive current user's profile link with each page load
		var profileLink = $('#member_holder #avatar a');
		if (profileLink.length != 0) {
			localStorage.setItem('profileLink', profileLink.attr('href'));
		}


		// Init config manager.

		var boolean = 'boolean',
			string = 'string',
			button = 'button';

		// Moved outside due to notifications support
		var highlightMessagesChildren = {
			checkForPartsOfMyName: {
				type: boolean,
				default: true,
				label: 'Look for partial name matches',
				tip: 'Breaks down names into 3 chracter strings and attempts to match them to a message.'
			},
			checkForCustomKeywords: {
				type: boolean,
				default: false,
				label: 'Search for custom keywords',
				children: {
					highlightMessagesKeywords: {
						type: string,
						label: '',
						placeholder: 'e.g.: iwa fag'
					},
					highlightMessagesKeywordsWholeWords: {
						type: boolean,
						default: false,
						label: 'Match custom keywords as whole words only',
						tip: 'Ignores keywords that are parts of another word'
					}
				}
			}
		};

		if (desktopNotifications.supported()) {
			highlightMessagesChildren.notifyWithDesctopNotifications = 	{
				type: boolean,
				label: 'Enable desktop notifications for when the chat isn\'t in focus.',
				nameInClass: true
			};
		}




		cm = new ConfigManager('Chatters Toolkit settings', {
			embedImages: {
				type: boolean,
				default: true,
				label: 'Embed images *',
				tip: 'Shift click on an image link to attempt embedding it. Shift click to hide embedded image.',
				children: {
					embedImmediately: {
						type: 'boolean',
						label: 'Automatically embed images',
						default: true,
						children: {
							embedImmediatelyNotFromEveryDomain: {
								type: 'boolean',
								label: 'Embed automatically only from whitelisted domains',
								tip: 'Images from steam sites, puu.sh and ompldr.com will be passed anyway. You can left following field clear',
								default: true,
								children: {
									embedImagesWhitelistedDomains: {
										type: string,
										nameInClass: true,
										default: 'imgur.com snag.gy horobox.co.uk images.4chan.org',
										placeholder: 'e.g.: imgur.com horobox.co.uk puu.sh'
									}
								}
							},
							checkForNSFW: {
								type: 'boolean',
								label: 'Filter images tagged as NSFW',
								default: true
							},
							checkForSpoilers: {
								type: 'boolean',
								label: 'Filter images tagged as \'Spoiler\'',
								default: false
							}
						}
					}
				}
			},
			embedMedia: {
				type: boolean,
				default: true,
				label: 'Embed audio/video *',
				tip: 'Shift click on an media link to embed it. Shift click again to turn it back into link.',
				children: {
					embedMediaImmediately: {
						type: 'boolean',
						label: 'Automatically embed audio/video',
						default: true,
						children: {
							checkMediaForNSFW: {
								type: 'boolean',
								label: 'Filter media links tagged as NSFW',
								default: true
							}
						}
					}
				}
			},
			cutHTML: {
				type: boolean,
				label: 'Detect HTML in chat messages *',
				children: {
					whatDoWithHTMLinChat: {
						type: 'enum',
						style: 'radio',
						choices: {
							cutTheFuckOut: 'Automatically strip messages of HTML',
							askWhatDoWithHTML: 'Prompt user'
						},
						nameInClass: true
					}
				}
			},
			highlightMessages: {
				type: boolean,
				default: true,
				label: 'Highlight messages containing your name *',
				children: highlightMessagesChildren
			},
			ignoreClicksOnNicknamesInChat: {
				type: boolean,
				default: false,
				label: 'Ignore clicks on usernames in the chat area *',
				tip: 'You can still access an user\'s profile by clicking on their avatar or though the contextual menu of their name'
			},
			notifyLeaveEnter: {
				type: boolean,
				default: true,
				label: 'Notify when users enter or leave chat *'
			},
			makePeoplesIgnorableInChat: {
				type: boolean,
				default: false,
				label: 'Ignore users *',
				tip: 'Ignored user\'s messages will not appear for you in chat. To ignore an user click on their name in the chat entries section.',
				children: {
					clearIgnoreList: {
						type: button,
						label: 'Clear ignore list',
						action: function() {
							// trying to receive object.
							var muted;
							try {
								muted = JSON.parse(localStorage.getItem('iws.tf2rChat.muted'));
							} catch(e) {
								muted = null;
							}
							if (!muted) {
								alert('Ignore list is empty');
							}
							localStorage.removeItem('iws.tf2rChat.muted');
							alert(Object.keys(muted).length + ' records deleted.');
						}
					}
				}
			}
		});

		cm.setCustomItemBuilder('string', function(parts) {
			var controls = $('<div class="cm-setting-controls"></div>');

			controls.append(parts.element);
			controls.append('<span>&nbsp;</span>');
			controls.append(parts.tip);

			return controls;
		});


		if ((/tf2r\.com\/settings/i).test(document.location.href)) {
			$('<hr/>').appendTo('.raffle_infomation:first-child');
			cm.getDom().appendTo('.raffle_infomation:first-child');
			$('.raffle_infomation:first-child').append('<div style="margin: -5px 10px 6px;">Changes to settings marked with a * require the page to be reloaded to take effect.</div>')

			// Подменю должны сворачиваться и разворачиваться, если парент - чекбокс.
			//cm.getDom().find('.cm-settings-container > .cm-settings-level > .cm-setting-block > .cm-setting-controls input[type=checkbox]')
			cm.getDom().find('.cm-settings-container .cm-settings-level > .cm-setting-block > .cm-setting-controls input[type=checkbox]')
				.change(function() {
					var children = $(this).closest('.cm-setting-block').children('.cm-settings-level');
					if (!children.length) {
						return;
					}

					if ($(this).is(':checked')) {
						// expand
						var styles = children.attr('style'),
							expandedHeight;

						children.removeAttr('style');
						expandedHeight = children.outerHeight();
						children.attr('style', styles);

						children.animate({
							height: expandedHeight
						}, 'auto', function() {
							children.removeAttr('style');
						});
					} else {
						// collapse
						children.animate({
							height: 0
						});
					}
				}).each(function() {
					// collapse disabled on start
					var children = $(this).closest('.cm-setting-block').children('.cm-settings-level');

					if (!children.length) {
						return;
					}

					if (!$(this).is(':checked')) {
						// collapse
						children.css({
							height: 0
						});
					}
				});

			// While desctop notifications not allowed by user, click shouldn't change checkbox state

			cm.getDom().find('.cm-setting-block.notifyWithDesctopNotifications label, ' +
					'.cm-setting-block.notifyWithDesctopNotifications label input')
				.bind('click', function(e) {
					if (desktopNotifications.notAllowed()) {
						desktopNotifications.requestPermission();
						e.preventDefault();
						return false;
					}
				});
		}




		//window.cm = cm;
		//window.dn = desktopNotifications;

		if (cm.getValue('notifyLeaveEnter')) {
			initNoticesAboutUserEnterAndLeaveTheChat();
		}

		if (cm.getValue('ignoreClicksOnNicknamesInChat')) {
			$('#chat').delegate('.ufname a', 'click', function() {
				return false;
			});
		}

		var liveQueryLoad = function() {
			setTimeout(fixLinksInMessages(), 0);
			if (cm.getValue('makePeoplesIgnorableInChat')) {
				makePeoplesIgnorableInChat();
			}
			if (cm.getValue('embedImages')) {
				setTimeout(makeImagesEmbeddable, 0);
				//makeImagesEmbeddable();
			}
			if (cm.getValue('embedMedia')) {
				setTimeout(embedMedia(), 0);
			}
			if (cm.getValue('highlightMessages')) {
				findMentions();
			}
			// Fix for stucked message background animation
			$('.userfeedpost').livequery(function() {
				var elem = this;
				setTimeout(function() {
					$(elem).stop(true).removeAttr('style').css('display', 'block');
				}, 1200);
			});
		};

		if (cm.getValue('embedImages') || cm.getValue('makePeoplesIgnorableInChat')) {
			if (!$.fn.livequery) {
				$.getScript('https://raw.github.com/brandonaaron/livequery/master/jquery.livequery.js', function() {
					liveQueryLoad();
				});
			} else {
				liveQueryLoad();
			}
		}

		if (cm.getValue('cutHTML')) {
			initHTMLCutter();
		}


	});


	/**************************** Edit until this line ****************************/
};
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.appendChild(document.createTextNode('('+ embedMe +')();'));
	(document.head || document.body || document.documentElement).appendChild(script);
})();
