// ==UserScript==
// @name           volia DC hosts checker for ex
// @namespace      http://www.ex.ua/view/
// @include        http://www.ex.ua/view/*
// @author		   fatalfury aka .bs
// @version		   1.3.1
// @description    Highlight servers in volia data center
// ==/UserScript==

try{
console = unsafeWindow.console;
}catch(e){}
var debug = false;
if(!debug || console == 'undefined'){
	console = new Object();
	console.log = function(){}
	console.dir = function(){}
}


//console.log(GM_getValue('volia_links_data',JSON.stringify({creation_date: n,servers: {}})));
console.dir(JSON.parse(GM_getValue('volia_links_data',JSON.stringify({creation_date: new Date().getTime(),servers: {}}))));
//clearing Cache
//GM_deleteValue('volia_links_data');


var f = 'VoliaDCChecker';
unsafeWindow[f] = {
	Links: new Array(),
	options: {
		internalLinksClass : 'ivdc',
		externalLinksClass : 'evdc',
		cache : 'volia_links_data'
	},
	markHost: function(host,type){
		var links = this.Links[host];
		console.log('mark links %o',links);
		if(type === true || type === 'internal'){
			_class = this.options.internalLinksClass;
		}else{
			_class =  this.options.externalLinksClass;
		}			
		for(var i=0,len=links.length;i<len;i++){
			links[i].className=_class;
			console.log('mark link %o',links[i]);
		}
		//parseInt(host.replace(/[^\d]*/g,''))
	},		
	/**Here some code from http://www.fullajax.ru*/
	util : {
		extend: function(dest, src, skipexist){
		  var overwrite = !skipexist; 
		  for (var i in src) 
			  if (overwrite || !dest.hasOwnProperty(i)) dest[i] = src[i];
		  return dest;
		},
		encode: function(a){var b="";var c,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;_keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";a=this.utf8_encode(a);while(i<a.length){c=a.charCodeAt(i++);chr2=a.charCodeAt(i++);chr3=a.charCodeAt(i++);enc1=c>>2;enc2=((c&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}b=b+_keyStr.charAt(enc1)+_keyStr.charAt(enc2)+_keyStr.charAt(enc3)+_keyStr.charAt(enc4)}return b},
		utf8_encode: function(a){a=a.replace(/\r\n/g,"\n");var b="";for(var n=0;n<a.length;n++){var c=a.charCodeAt(n);if(c<128){b+=String.fromCharCode(c)}else if((c>127)&&(c<2048)){b+=String.fromCharCode((c>>6)|192);b+=String.fromCharCode((c&63)|128)}else{b+=String.fromCharCode((c>>12)|224);b+=String.fromCharCode(((c>>6)&63)|128);b+=String.fromCharCode((c&63)|128)}}return b}
	}
};	

(function($){	
	var _this = {	
		//TODO custom host_checker
		getThisPageLinks: function(anchors,host_checker){
			var fid,fs,host,fs_hosts = [];
			for(var i=0,l=anchors.length;i<l;i++){
				fid = anchors[i].href.replace(/^.*\?fs_id=(\d*)$/,'$1');
				host = _this.fs_ex_link(fid);
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
		createCheckInterface: function(){
			var checkInterface = '<input id="vdcch" style="margin: 3px; -moz-border-radius: 5px 5px 5px 5px; border: 1px solid rgb(0, 92, 255);z-index:10" type="text" name="host"/>\
				<button id="vdccb" style="font-weight: bold; color: red;">DC Check</button>\
				<span id="vdccr" style="color: green; font-weight: bold; padding-left: 10px;"></span>',
				button,
				cb = (function($){
					return function(response){
						var hostObject = $.parseData(response),
						vdccr = document.getElementById('vdccr');
						if(hostObject != null){
							vdccr.innerHTML = hostObject.host;
							vdccr.style.color = hostObject.type === 'internal'?'green':'red';
							$.cache.addHost(hostObject.host,hostObject.type);
						}
				}})($),
				wrapper = document.createElement('div');
				document.body.appendChild(wrapper); 
				wrapper.setAttribute('style','position: fixed; padding: 0px 20px; height: 28px; top: 0pt; left: 0pt; background-color: black; opacity: 0.5; -moz-border-radius-bottomright: 10px;z-index: 10');				
				wrapper.innerHTML = checkInterface;
			button = document.getElementById('vdccb');
			button.addEventListener('click',(function(){ return function(e){
				var hostInput = document.getElementById('vdcch'),h;
				if(hostInput  && (h = hostInput.value)){
					h = /^\d+$/.test(h.replace(/\s*/,''))?_this.fs_ex_link(h):h;
					console.log('checking %s',h);
					$.check(h,cb);
				}
			}})(),false);
		},
		init: function(){
			GM_registerMenuCommand('show DC servers cache',$.cache.show);
		},
		createBackgroundChecking: function(){
			GM_addStyle('.'+$.options.internalLinksClass+' {color: green !important; font-weight: bold} .'+$.options.externalLinksClass+'{color: red !important}');			
			$.Links = _this.getThisPageLinks(document.getElementsByTagName('a'));
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
			for(var host in $.uncachedLinks){				
				$.check(host);
			};
		},		
		fs_ex_link: function(number){
			return 'fs'+number+'.www.ex.ua';
		}		
	};

	
	$.util.extend($,{
	/**
	* Cache object  = { "creation_date" : new Date().getTime(),"servers" : { "fs10.www.ex.ua": {"date" : new Date().getTime(),"internal": "true"},"fs29.www.ex.ua": {"date": new Date().getTime(),"internal": "false"}}}
	**/	
	cache: {
		now: new Date().getTime(),	
		cacheObject : JSON.parse(GM_getValue($.options.cache,JSON.stringify({creation_date: new Date().getTime(),servers: {}}))),
		getHosts: function(){
			var cached  = new Array();
				try{		
				// if cache life more than 24h
				if((this.now - this.cacheObject.creation_date) < 86400000){
				var servers = this.cacheObject.servers;
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
				}else{
					console.log('main date mismatch now = %s,o.date = %s, diff=%d',this.now,this.cacheObject.creation_date,this.now - this.cacheObject.creation_date);
					GM_deleteValue('volia_links_data');
					this.cacheObject = {creation_date: new Date().getTime(),servers: {}};					
				}		
			}catch(e){
				console.log('Exception 2 = %o',e);
			}			
			return;
		},
		//	default type = internal
		addHost: function(host,hostType){
			var type = hostType === 'internal'?true:false;
			this.cacheObject.servers[host] = {date: new Date().getTime(), internal: type};
			//console.log('[cache] save object %s',JSON.stringify(this.cacheObject));	
			GM_setValue($.options.cache,JSON.stringify(this.cacheObject));
		},
		show: (function($){
			console.log($);
			return function(){
				var internalList = externalList = '<ul style="list-style:none; float: left">', servers,
				externalArray = new Array(),internalArray = new Array(),
				sortExpr = new RegExp('fs(\\d*)');
				//sortExpr = new RegExp('\d*');
				internalList += '<li>IN DC</li>';
				externalList += '<li>Out of DC</li>';
				try{					
					if($.cache.cacheObject.servers){
						servers = $.cache.cacheObject.servers;
						for(var name in servers){													
							//_class = servers[name].internal?internalLinksClass:externalLinksClass;
							if(servers[name].internal)
								internalArray.push('<li style="color: green">'+name+'</li>');
							else
								externalArray.push('<li style="color: red">'+name+'</li>');
						}
						//var sortFunction = function(a,b){return a.match(sortExpr)[1]-b.match(sortExpr)[1]};
						var sortFunction = function(a,b){ var am = a.match(sortExpr),bm = b.match(sortExpr);return bm && am?am[1]-bm[1]:a-b};
						internalList += internalArray.sort(sortFunction).join('');
						externalList += externalArray.sort(sortFunction).join('');						
					}
				}catch (e){console.log(e)}
				internalList += '</ul>';
				externalList += '</ul>';				
				window.open('data:text/html;base64,'+$.util.encode('<!DOCTYPE html><html><head></head><body>'+internalList+externalList+'</body></html>'),'Volia DC servers cache','width=600px,height=500px,toolbar=0,location=0,scrollbars=1');
				
		}})($)
	}	
	});
	
/*	work throught Yahoo api to get external resources
	$.util.extend($,{
		checkCallback:  function(response){
				try{				
					var hostObject = $.parseData(response);
					console.log('default callback %o',hostObject);
					if(hostObject){
						$.markHost(hostObject.host,hostObject.type);
						setTimeout(function(){$.cache.addHost(hostObject.host,hostObject.type)},0);
					}
				}catch(e){console.log('Exception 1 = %o',e)}
		},
		parseData: function(data){
			try{
				var _c = data.query.results.p.class;
				return { host: data.query.results.p.strong.split('\n')[0].split(' ')[1], type: ( _c == 'good')?'internal':'external'};
			}catch(e){
				return;
			}	
		},
		check:  function(host,cb){
			if(cb){
				$.checkCallback = cb;
			}
			var YQL = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url=%22http://www.dc.volia.com/cgi/CheckDCVoliaNets.pl?host={HOST}%22%20and%20xpath=%22//p[@class]%22&format=json&callback='+f+'.checkCallback';			
			var script = document.createElement('script');			
			script.src = YQL.replace('{HOST}',host);
			document.body.appendChild(script);
		}
		});
*/
	$.util.extend($,{
		/** old behavior link to object
		checkCallback: (function($){
			return function(response){
				try{				
					var hostObject = $.parseData(response);
					console.log('default callback %o',hostObject);
					if(hostObject){
						$.markHost(hostObject.host,hostObject.type);
						setTimeout(function(){$.cache.addHost(hostObject.host,hostObject.type)},0);
					}
				}catch(e){console.log('Exception 1 = %o',e)}
			}
		})($),		
		*/
		checkCallback: function(response){
				try{				
					var hostObject = $.parseData(response);
					console.log('default callback %o',hostObject);
					if(hostObject){
						$.markHost(hostObject.host,hostObject.type);
						setTimeout(function(){$.cache.addHost(hostObject.host,hostObject.type)},0);
					}
				}catch(e){console.log('Exception 1 = %o',e)}
		},
		parseData: function(resp){
		
			var text = resp.responseText,
			matches = text.match(/<p class="(good|bad)">.*\s([a-z0-9.]*)\s.*<\/(?:p)>/i);
			if(matches.length !== 3) return;
			return { host: matches[2],type: (matches[1] == 'good')?'internal':'external' };
		},
		check:  (function($){
			return function(host,cb){
				console.log('checking host: %s, cb: %s',host,cb);
				cb = cb || $.checkCallback;				
				setTimeout(function(){
					GM_xmlhttpRequest({
						method: 'POST',
						url: 'http://www.dc.volia.com/resource',
						headers: {'Content-type': 'application/x-www-form-urlencoded'},
						data: 'host='+encodeURIComponent(host),
						onload: cb
					})
				},0);
			}
		})($)		
	});	
	
	
	_this.init();
	_this.createBackgroundChecking();
	_this.createCheckInterface();
})(unsafeWindow[f]);