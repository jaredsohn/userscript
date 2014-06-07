// ==UserScript==
// @name           Click Trap Remover And Shortlinker
// @namespace      click trap remove
// @version        1.1.3
// @description    Makes Facebook dialogs right clickable and shorturlable
// @match          *://www.facebook.com/dialog/*
// @match          *://apps.facebook.com/*
// ==/UserScript==
// allow this to work in chrome without tampermonkey
// from http://stackoverflow.com/questions/1622145/how-can-i-mimic-greasemonkey-firefoxs-unsafewindow-functionality-in-chrome
var bGreasemonkeyServiceDefined = false;
try{
	if(typeof Components.interfaces.gmIGreasemonkeyService === "object"){
		bGreasemonkeyServiceDefined = true;
	}
}
catch(err) { }
if(typeof unsafeWindow === "undefined" || !bGreasemonkeyServiceDefined){
	unsafeWindow =(function(){
		var dummyElem = document.createElement('p');
		dummyElem.setAttribute('onclick','return window;');
		return dummyElem.onclick();
	})();
}
if(!/apps.facebook/.test(unsafeWindow.location)){
	//regular
	// remove click traps, old brandon script
	var traps = document.getElementsByClassName('unclickableMask');
	for(var i=0;i<traps.length;i++){
		traps[i].parentNode.removeChild(traps[i]);
	} 
	// add shortener to urls (should only be one)
	var links = document.getElementsByClassName('UIStoryAttachment_Title');
	for(var j=0;j<links.length;j++){
		var text = document.createElement("a");
		text.innerHTML='shorten';
		text.id="spockshortlink";
		text.href=links[j].getElementsByTagName('a')[0].href;
		text.onclick=function(){
			var link=this.href;
			this.innerHTML='shorten...';
			var script = document.createElement('script');
			script.src = 'https://spockon.me/api.php?callback=Spocklet.reply&action=shorturl&format=jsonp&url='+escape(link)
			document.getElementsByTagName('head')[0].appendChild(script);
			return false;
		}
		links[j].parentNode.insertBefore(text,links[j].nextSibling);
	}
	// handler
	unsafeWindow.Spocklet = { 
		reply: function(data)
		{
			document.getElementById('spockshortlink').innerHTML=data.shorturl;
			document.getElementById('spockshortlink').href=data.shorturl;
			document.getElementById('spockshortlink').onclick=function(){return false;};
			
		}
	};
}
else{
	//Annoying facebook change
	window.addEventListener('load', function(){
		if(typeof unsafeWindow.Dialog != 'undefined'){
			unsafeWindow.Dialog.prototype._oldrunOnloads = unsafeWindow.Dialog.prototype._runOnloads;
			unsafeWindow.Dialog.prototype._runOnloads = function(){ 
				var traps = document.getElementsByClassName('unclickableMask');
				var traps2 = document.getElementsByClassName('generic_dialog');
				for(var i=0;i<traps.length;i++){
					traps[i].parentNode.removeChild(traps[i]);
				} 
				for(var i=0;i<traps2.length;i++){
					traps2[i].style.backgroundColor = 'transparent';
				} 
				var links = document.getElementsByClassName('UIStoryAttachment_Title');
				for(var j=0;j<links.length;j++){
					if(/spocked/.test(links[j].className)){
						continue;
					}
					links[j].className = links[j].className+' spocked';
					var rand = Math.random().toString(36).substring(7);
					var text = document.createElement("a");
					text.innerHTML='shorten';
					text.id="spockshortlink_"+rand;
					text.href=links[j].getElementsByTagName('a')[0].href;
					text.onclick=function(){
						var link=this.href;
						this.innerHTML='shorten...';
						var script = document.createElement('script');
						script.src = 'https://spockon.me/api.php?callback=Spocklet.queue[\''+rand+'\']&action=shorturl&format=jsonp&url='+escape(link)
						document.getElementsByTagName('head')[0].appendChild(script);
						return false;
					}
					unsafeWindow.Spocklet.queue[rand] = function(data){	
						if(data.status == 'success'){
							var ra = /queue\[\'(.*)\'\]/.exec(data.callback)[1];
							document.getElementById('spockshortlink_'+ra).innerHTML=data.shorturl;
							document.getElementById('spockshortlink_'+ra).href=data.shorturl;
							document.getElementById('spockshortlink_'+ra).onclick=function(e){e.stopPropagation(); return false;};
							delete unsafeWindow.Spocklet.queue[ra];
						}
					}
					links[j].parentNode.insertBefore(text,links[j].nextSibling);
				}
				this.__proto__._oldrunOnloads(); 
			}
			unsafeWindow.Spocklet = { 
				queue: {}
			};
		}
	},false);
}	