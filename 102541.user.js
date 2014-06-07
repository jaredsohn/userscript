// ==UserScript==
// @name           volia DC hosts checker for ex CHROME
// @namespace      http://www.ex.ua/view/
// @include        http://www.ex.ua/view/*
// @author		   fatalfury aka .bs
// @version		   1.3.1_chrome_alpha
// @description    Highlight servers in volia data center
// ==/UserScript==



var gvar=function() {} // Global variables
function GM_ApiBrowserCheck() {
  const GMSTORAGE_PATH = 'GM_'; // You can change it to avoid conflict with others scripts
  if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
  if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }
  GM_clog=function(msg) { if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; } GM_log('('+arguments.callee.counter+') '+msg); }
  GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
    var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
    var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
    if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
    return sel;
  }
  var needApiUpgrade=false;
  if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
    needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; GM_log('Opera detected...');
  }
  if(typeof(GM_setValue)!='undefined') {
    var gsv=GM_setValue.toString();
    if(gsv.indexOf('staticArgs')>0) { gvar.isGreaseMonkey=true; GM_log('GreaseMonkey Api detected...'); } // test GM_hitch
    else if(gsv.match(/not\s+supported/)) { needApiUpgrade=true; gvar.isBuggedChrome=true; GM_log('Bugged Chrome GM Api detected...'); }
  } else { needApiUpgrade=true; GM_log('No GM Api detected...'); }

  if(needApiUpgrade) {
    GM_log('Try to recreate needed GM Api...');
    var ws=null; try { ws=typeof(unsafeWindow.localStorage); unsafeWindow.localStorage.length; } catch(e) { ws=null; } // Catch Security error
    if(ws=='object') {
      GM_log('Using localStorage for GM Api.');
      GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; }
      GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } }
      GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); }
    } else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
      GM_log('Using temporarilyStorage for GM Api.'); gvar.temporarilyStorage=new Array();
      GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } }
      GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } }
      GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
    }
    if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); } }
    if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); } } // Dummy
    if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
      GM_log('Using XMLHttpRequest for GM Api.');
      GM_xmlhttpRequest=function(obj) {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
        try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
        request.send(obj.data); return request;
  } } }
}
GM_ApiBrowserCheck();

//--- to test some value defined by GM_ApiBrowserCheck
/*
GM_clog('isOpera='+gvar.isOpera);
GM_clog('isGreaseMonkey='+gvar.isGreaseMonkey);
GM_clog('isBuggedChrome='+gvar.isBuggedChrome);
*/

try{
console = unsafeWindow.console;
}catch(e){}
var debug = true;
if(!debug || console == 'undefined'){
	console = new Object();
	console.log = function(){}
	console.dir = function(){}
}


//console.log(GM_getValue('volia_links_data',JSON.stringify({creation_date: n,servers: {}})));
console.dir(JSON.parse(localStorage.getItem('volia_links_data',JSON.stringify({creation_date: new Date().getTime(),servers: {}}))));
//clearing Cache
//GM_deleteValue('volia_links_data');


VoliaDCChecker = {
	Links: {},
	options: {
		internalLinksClass : 'ivdc',
		externalLinksClass : 'evdc',
		cache : 'volia_links_data'
	},
	getThisPageLinks: function(anchors,host_checker){
		var fid,fs,host,fs_hosts = {};
		for(var i=0,l=anchors.length;i<l;i++){
			fid = anchors[i].href.replace(/^.*\?fs_id=(\d*)$/,'$1');
			host = this.util.fs_ex_link(fid);
			fs = new RegExp('\\?fs_id='+fid);				
			if(fs.test(anchors[i].href)){
				if(fs_hosts[host]==null){
					fs_hosts[host]=new Array();
				}
			fs_hosts[host].push(anchors[i]);
			}
		}
		return fs_hosts;
	},
	markHost: function(host,type){
		var links = [];
		console.log('MH: %o host: %s, type: %s',this,host,type);
		if(this.util.isEmpty(this.Links)){			
			this.Links = this.getThisPageLinks(document.getElementsByTagName('a'));
		}
		links = this.Links[host];
		console.log('mark links %o',links);
		if(links){
			if(type === true || type === 'internal'){
				_class = this.options.internalLinksClass;
			}else{
				_class =  this.options.externalLinksClass;
			}
			for(var i=0,len=links.length;i<len;i++){
				links[i].className=_class;
				console.log('mark link i=%s %o',i,links[i]);
			}
		}
		//parseInt(host.replace(/[^\d]*/g,''))
	},		
	
	util : {
		/**Here some code from http://www.fullajax.ru*/
		extend: function(dest, src, skipexist){
		  var overwrite = !skipexist; 
		  for (var i in src) 
			  if (overwrite || !dest.hasOwnProperty(i)) dest[i] = src[i];
		  return dest;
		},
		encode: function(a){var b="";var c,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;_keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";a=this.utf8_encode(a);while(i<a.length){c=a.charCodeAt(i++);chr2=a.charCodeAt(i++);chr3=a.charCodeAt(i++);enc1=c>>2;enc2=((c&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}b=b+_keyStr.charAt(enc1)+_keyStr.charAt(enc2)+_keyStr.charAt(enc3)+_keyStr.charAt(enc4)}return b},
		utf8_encode: function(a){a=a.replace(/\r\n/g,"\n");var b="";for(var n=0;n<a.length;n++){var c=a.charCodeAt(n);if(c<128){b+=String.fromCharCode(c)}else if((c>127)&&(c<2048)){b+=String.fromCharCode((c>>6)|192);b+=String.fromCharCode((c&63)|128)}else{b+=String.fromCharCode((c>>12)|224);b+=String.fromCharCode(((c>>6)&63)|128);b+=String.fromCharCode((c&63)|128)}}return b},
		isEmpty: function(o){for(var prop in o) {if(o.hasOwnProperty(prop))return false;}return true;},
		resolve2window: function(name,object){
			var script = document.createElement('script');
			if(typeof name == 'string'){				
				script.innerHTML = name+'='+this.object2string(object);
			}
			document.body.appendChild(script);				
		},
		object2string: function(o){
			var b,t,data = [];
			t = Object.prototype.toString.apply(o);
			if(t != '[object Function]'){
				for(var p in o){
					try{
						b = o[p].toString();						
						t = Object.prototype.toString.apply(o[p]);
						//console.log('object %o property %s and type %s',o,p,t);
						if(t=='[object Array]') data.push('"'+p+'"'+':["'+b+'"]')
						else if(t=='[object Function]') data.push(p+':'+b)
						else if(b===t)data.push('"'+p+'":'+arguments.callee.call(this,o[p]))
						else
							data.push(p+': "'+b+'"');
					}catch(e){
						data.push(p+': null');
					}
				}
				return '{'+data.join(',\n')+'}';
			}else{
				return o.toString();
			}
		},
		fs_ex_link: function(number){
			return 'fs'+number+'.www.ex.ua';
		}
	}
};	

(function(){	
	var _this = {	
		createCheckInterface: function(){
			var checkInterface = '<input id="vdcch" style="margin: 3px; -moz-border-radius: 5px 5px 5px 5px; border: 1px solid rgb(0, 92, 255);z-index:10" type="text" name="host"/>\
				<button id="vdccb" style="font-weight: bold; color: red;">DC Check</button>\
				<span id="vdccr" style="color: green; font-weight: bold; padding-left: 10px;"></span>',
				button,
				VoliaDCChecker_cb = function(response){						
						var hostObject = VoliaDCChecker.parseData(response),
						vdccr = document.getElementById('vdccr');
						if(hostObject != null){
							vdccr.innerHTML = hostObject.host;
							vdccr.style.color = hostObject.type === 'internal'?'green':'red';
							VoliaDCChecker.cache.addHost(hostObject.host,hostObject.type);
						}
					},
				wrapper = document.createElement('div');
			document.body.appendChild(wrapper); 
			wrapper.setAttribute('style','position: fixed; padding: 0px 20px; height: 28px; top: 0pt; left: 0pt; background-color: black; opacity: 0.5; -moz-border-radius-bottomright: 10px;-webkit-border-bottom-right-radius: 10px;z-index: 10');
			wrapper.innerHTML = checkInterface;
			button = document.getElementById('vdccb');
			button.addEventListener('click',(function(){ return function(e){
				var hostInput = document.getElementById('vdcch'),h;
				if(hostInput  && (h = hostInput.value)){
					h = /^\d+$/.test(h.replace(/\s*/,''))?VoliaDCChecker.util.fs_ex_link(h):h;
					VoliaDCChecker.check(h,VoliaDCChecker_cb);
				}
			}})(),false);
		},
		init: function(){
			try{
				GM_registerMenuCommand('show DC servers cache',VoliaDCChecker.cache.show);
			}catch(e){console.log('[init]register menu command : %o',e)}
		},
		createBackgroundChecking: function($){
			GM_addStyle('.'+$.options.internalLinksClass+' {color: green !important; font-weight: bold} .'+$.options.externalLinksClass+'{color: red !important}');			
			$.Links = $.getThisPageLinks(document.getElementsByTagName('a'));
			$.uncachedLinks = {};
			$.util.extend($.uncachedLinks,$.Links);
			
			var cacheHosts = $.cache.getHosts();
			console.log('cacheHosts = %o',cacheHosts);
			for(var host in $.uncachedLinks){				
				for(var cachedHostName in cacheHosts ){
					if(cachedHostName === host){
						console.log('cache found on %s',host);
						$.markHost(host,cacheHosts[cachedHostName].internal);
						$.uncachedLinks[cachedHostName] = null;
						delete $.uncachedLinks[cachedHostName];
					}
				}
			}
			console.log('Hosts in uncachedLinks %o',$.uncachedLinks);
			//$.util.resolve2window(f+'.Links',$.uncachedLinks);
			for(var host in $.uncachedLinks){				
				$.check(host);
			};
		}		
	};

	
	
	
	
	
	
	VoliaDCChecker.util.extend(VoliaDCChecker,{
	/**
	* Cache object  = { "creation_date" : new Date().getTime(),"servers" : { "fs10.www.ex.ua": {"date" : new Date().getTime(),"internal": "true"},"fs29.www.ex.ua": {"date": new Date().getTime(),"internal": "false"}}}
	**/	
	cache: {
		now: new Date().getTime(),	
		cacheObject: null,
		//cacheObject: JSON.parse(localStorage.getItem(VoliaDCChecker.options.cache)),
		getCacheObject: function(){
			if(this.cacheObject == null){
				this.cacheObject = JSON.parse(localStorage.getItem(VoliaDCChecker.options.cache));								
				if(this.cacheObject == null || (this.now - this.cacheObject.creation_date) > 86400000){
					this.cacheObject =  this.defaultObject;
					localStorage.setItem(VoliaDCChecker.options.cache,JSON.stringify(this.cacheObject));
				}
					return this.cacheObject;
				
			}
			return this.cacheObject;
		},
		defaultObject: {creation_date: new Date().getTime(), servers: {}},
		getHosts: function(){
			var cached  = new Array();
				try{		
				// if cache life more than 24h
				
				var servers = this.getCacheObject().servers;
				for(host in servers){
					//delete cache about server if more than 24h
					if((this.now - servers[host].date) > 86400000){
						console.log('server[%s] old =  %o',host,servers[host]);
						servers[host] = null;
						delete servers[host];			
					}else{
						cached[host] = servers[host];
					}				
				}
				return cached;
						
			}catch(e){
				console.log('Exception 2 = %o',e);
			}			
			return;
		},
		//	default type = internal
		addHost: function(host,hostType){
			var type = hostType === 'internal'?true:false;
			this.getCacheObject().servers[host] = {date: new Date().getTime(), internal: type};
			//console.log('[cache] save object %s',JSON.stringify(this.getCacheObject()));	
			if(typeof gvar === 'undefined' || gvar.isBuggedChrome)
				localStorage.setItem(VoliaDCChecker.options.cache,JSON.stringify(this.getCacheObject()));
		},
		show: function(){}
	}	
	});
	
/*	work throught Yahoo api to get external resources */
	VoliaDCChecker.util.extend(VoliaDCChecker,{
		checkCallback:  function(response){
				try{
					
					var hostObject = this.parseData(response);
					console.log('check callback on object %o',hostObject);
					if(hostObject){
						this.markHost(hostObject.host,hostObject.type);						
						//setTimeout(function(){$.cache.addHost(hostObject.host,hostObject.type)},0);
						this.cache.addHost(hostObject.host,hostObject.type);
					}
				}catch(e){console.log('Exception 1 = %o',e)}
		},
		parseData: function(data){
			try{
				var _c = data.query.results.p.class;
				//console.log('split = %o, replace = %s', data.query.results.p.strong.replace(/\s+/,' ').split(' '),data.query.results.p.strong.split(' ')[1].replace(/[^\w\d\.]/g,''));
				return { host: data.query.results.p.strong.replace(/\s+/,' ').split(' ')[1].replace(/[^\w\d\.]/g,''), type: ( _c == 'good')?'internal':'external'};
			}catch(e){				
			}	
		},
		check:  function(host,VoliaDCChecker_cb){
			if(VoliaDCChecker_cb){
				VoliaDCChecker.checkCallback = VoliaDCChecker_cb;
				VoliaDCChecker.util.resolve2window('VoliaDCChecker.checkCallback',VoliaDCChecker_cb);
			}
			console.log('checking host %s',host);
			var YQL = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url=%22http://www.dc.volia.com/cgi/CheckDCVoliaNets.pl?host={HOST}%22%20and%20xpath="//p[@class=\'bad\'%20or%20@class=\'good\']"&format=json&callback=VoliaDCChecker.checkCallback';
			var script = document.createElement('script');			
			script.src = YQL.replace('{HOST}',host);
			document.body.appendChild(script);
		}
		});

		
	//because of copying object to dest window we have light hack with name 'VoliaDCChecker'
	VoliaDCChecker.util.resolve2window('VoliaDCChecker',VoliaDCChecker);
	
	_this.init();
	_this.createBackgroundChecking(VoliaDCChecker);
	_this.createCheckInterface();
})();
