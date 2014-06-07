// ==UserScript==
// @name          Apptrackr History
// @description	  Adds history to apptrackr
// @author        Cokegod
// @include       http://*apptrackr.org/*
// ==/UserScript==

//importing stuff
var $ = unsafeWindow.$;
var jQuery = unsafeWindow.jQuery;
var apptrackr = unsafeWindow.apptrackr;

//jQuery history plugin
(function($){var locationWrapper={put:function(hash,win){(win||window).location.hash=this.encoder(hash);},get:function(win){var hash=((win||window).location.hash).replace(/^#/,'');try{return $.browser.mozilla?hash:decodeURIComponent(hash);}catch(error){return hash;}},encoder:encodeURIComponent};var iframeWrapper={id:"__jQuery_history",init:function(){var html='<iframe id="'+this.id+'" style="display:none" src="javascript:false;" />';$("body").prepend(html);return this;},_document:function(){return $("#"+this.id)[0].contentWindow.document;},put:function(hash){var doc=this._document();doc.open();doc.close();locationWrapper.put(hash,doc);},get:function(){return locationWrapper.get(this._document());}};function initObjects(options){options=$.extend({unescape:false},options||{});locationWrapper.encoder=encoder(options.unescape);function encoder(unescape_){if(unescape_===true){return function(hash){return hash;};}
if(typeof unescape_=="string"&&(unescape_=partialDecoder(unescape_.split("")))||typeof unescape_=="function"){return function(hash){return unescape_(encodeURIComponent(hash));};}
return encodeURIComponent;}
function partialDecoder(chars){var re=new RegExp($.map(chars,encodeURIComponent).join("|"),"ig");return function(enc){return enc.replace(re,decodeURIComponent);};}}
var implementations={};implementations.base={callback:undefined,type:undefined,check:function(){},load:function(hash){},init:function(callback,options){initObjects(options);self.callback=callback;self._options=options;self._init();},_init:function(){},_options:{}};implementations.timer={_appState:undefined,_init:function(){var current_hash=locationWrapper.get();self._appState=current_hash;self.callback(current_hash);setInterval(self.check,100);},check:function(){var current_hash=locationWrapper.get();if(current_hash!=self._appState){self._appState=current_hash;self.callback(current_hash);}},load:function(hash){if(hash!=self._appState){locationWrapper.put(hash);self._appState=hash;self.callback(hash);}}};implementations.iframeTimer={_appState:undefined,_init:function(){var current_hash=locationWrapper.get();self._appState=current_hash;iframeWrapper.init().put(current_hash);self.callback(current_hash);setInterval(self.check,100);},check:function(){var iframe_hash=iframeWrapper.get(),location_hash=locationWrapper.get();if(location_hash!=iframe_hash){if(location_hash==self._appState){self._appState=iframe_hash;locationWrapper.put(iframe_hash);self.callback(iframe_hash);}else{self._appState=location_hash;iframeWrapper.put(location_hash);self.callback(location_hash);}}},load:function(hash){if(hash!=self._appState){locationWrapper.put(hash);iframeWrapper.put(hash);self._appState=hash;self.callback(hash);}}};implementations.hashchangeEvent={_init:function(){self.callback(locationWrapper.get());$(window).bind('hashchange',self.check);},check:function(){self.callback(locationWrapper.get());},load:function(hash){locationWrapper.put(hash);}};var self=$.extend({},implementations.base);if($.browser.msie&&($.browser.version<8||document.documentMode<8)){self.type='iframeTimer';}else if("onhashchange"in window){self.type='hashchangeEvent';}else{self.type='timer';}
$.extend(self,implementations[self.type]);$.history=self;})(jQuery);

//the script
function loadContent(hash) {
	if(hash) { 
		hash = unescape(hash);
		var opts = hash.substring(hash.indexOf('&') + 1);
		var pagename = hash.substring(0, hash.indexOf('&'));
		apptrackr.applistShowing = false;
		apptrackr.setLoadingPage();
		if (apptrackr.activeAjax != false) {
			apptrackr.activeAjax.abort();
		}
		apptrackr.activeAjax = $.ajax({
			type : "POST",
			url : "/ajax.php?act=" + pagename,
			data : opts,
			success : function (data) {
				apptrackr.activeAjax = false;
				apptrackr.changeAppPage(data, "slide");
			},
			error : function () {
				apptrackr.setFailPage();
			}
		});
	}
	else {
		if (apptrackr.activeAjax != false) {
			apptrackr.activeAjax.abort();
		}
		if (!apptrackr.applistShowing) {
			document.title = 'apptrackr \u00BB home';
			apptrackr.applist.restoreState();
			apptrackr.applistShowing = true;
		}
	}
}
$(document).ready(function() {
	$.history.init(loadContent);
	apptrackr.getPage = function (pagename, opts) {
		opts = (opts ? opts : {})
		var parsed = '';
		for(key in opts) {
			if(!opts[key])
				return;
			parsed += '&' + key + '=' + opts[key];
		}
		$.history.load(pagename + parsed);
	}
	apptrackr.showAppList = function () {
		$.history.load('');
		return apptrackr.applistShowing;
	}
});