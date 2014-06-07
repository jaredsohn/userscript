// ==UserScript==
// @name           iiNet EPL On Demand Video
// @namespace      userscripts.org
// @description    Can either alter the video embedding on http://media.iinet.net.au/index.cgi?id=eplweb to make it compatible with the VLC firefox plugin, or you can copy the url and open it in in VLC manually.
// @version 	 0.3
// @include        http://media.iinet.net.au/index.cgi?id=epl*
// ==/UserScript==

//http://www.json.org/json2.js
if(!this.JSON){JSON={}}(function(){function f(n){return n<10?'0'+n:n}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z'};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];if(typeof c==='string'){return c}return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(typeof value.length==='number'&&!value.propertyIsEnumerable('length')){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value})}}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse');}}})();

GM_addStyle(".vlcPlay:hover { color:#666 !important; }");

function gmxhr(JSONisMahBitch){
	
	//unsafeWindow.console.log('gmxhr');

	function embedVLC(s){
		
		var vlcHolder = document.getElementById('player-container');
		vlcHolder.removeChild(vlcHolder.lastChild);

		/*if(!document.getElementById('vlcButtons')){

			var vlcButtons = document.createElement('div');
			vlcButtons.setAttribute('id','vlcButtons');
			vlcButtons.innerHTML = '<input value="Play" onclick="document.vlc.play();" type="button">'+
									'<input value="Pause" onclick="document.vlc.pause();" type="button">'+
									'<input value="Stop" onclick="document.vlc.stop();" type="button">'+
									//'<input name="chewa" value="Seek -10s" onclick="document.vlc.seek(-10,true);" type="button">'+
									//'<input name="chewa" value="Seek +10s" onclick="document.vlc.seek(10,true);" type="button">'+
									'<input value="Fullscreen" onclick="document[\'vlc\'].fullscreen()" type="button">'+
									//'<input name="chewa" value="Increase volume" onclick="volume_up()" type="button">'+
									//'<input name="chewa" value="Decrease volume" onclick="volume_down()" type="button">'+
									'<input name="chewa" value="Mute" onclick="document[\'vlc\'].mute()" type="button">';
								
			vlcHolder.appendChild(vlcButtons);
		
		}	*/ //cant get buttons to work			
		
		var e = document.createElement('embed');
		e.setAttribute('type', 'application/x-vlc-plugin');
		e.setAttribute('id','vlc');
		e.setAttribute('name', "vlc");
		//e.setAttribute('progid','VideoLAN.VLCPlugin.2');
		e.setAttribute('pluginspage','http://www.videolan.org');
		e.setAttribute('height', '418');
		e.setAttribute('width', "464");
		e.setAttribute('target', s);
		e.setAttribute('autoplay', 'true');

		vlcHolder.appendChild(e);			
		
	}
		
	function iter(arr){
	//	unsafeWindow.console.log(arr);	
		for(ele in arr){
			
			//unsafeWindow.console.log(arr[ele]);			
			
			if(arr[ele].textContent && arr[ele].textContent.match("Now Showing")){
				//unsafeWindow.console.log(arr[ele].textContent);	
				for(j in JSONisMahBitch){
					
					var jay = JSONisMahBitch[j];
					var jI = jay.icon;
					var parenN = arr[ele].parentNode;
					
					
					if(parenN.id == jay.id && jI){
						//unsafeWindow.console.log(jay);	
						
						var dat = jay.order.split(' ')[0];
						var teamS = jI.slice(jI.lastIndexOf('/')+1, jI.lastIndexOf('.')).replace('-','_').toUpperCase();

						var bitRate = '_1000K.WMV';
						if(document.getElementById('standard-quality').className.match('quality-active')){
							bitRate = '_250K.WMV';
						}	
						var vlcPlay = document.createElement('a');
						/***guessing FTW!***/
						vlcPlay.setAttribute('href', 'mms://media.eplondemand.iinet.net.au/epl_content//'+dat+'/'+dat+'_VOD_'+teamS+bitRate);
						vlcPlay.textContent = 'Play '+jay.title+' in VLC (click to play in browser/right-click to copy url)';
						vlcPlay.className = 'vlcPlay';
						vlcPlay.setAttribute('style', 'padding:2px;border:1px solid grey;');
						
						vlcPlay.addEventListener("click", function(evnt){								
							
							evnt.preventDefault();
							embedVLC(this.href+bitRate);	
						//20081101/20081101_VOD_MID_WHU_250K.WMV  gotta fix for live
							//"http://media.iinet.net.au/eplweb/icons/teams/everton/eve-ful.png"
						}, false);						
						parenN.appendChild(vlcPlay);
						
					}
				
				}
			
			}
			
		}	
	}
	
	//iter(document.getElementById('live-games').getElementsByTagName('a'));
	
	function gottawait(){
		if(document.getElementById('video_plugin')){
			clearInterval(gw);
			iter(document.getElementById('vod').getElementsByTagName('a'));
			
		}
	}
	gw=setInterval(gottawait, 250);
	
	function changeLinks(q){
	
		var vlcLinksArr = document.getElementsByClassName('vlcPlay');
		
		var br = '_1000K.WMV';
		if(q == 'standard-quality'){
			br = '_250K.WMV';
		}		
		
		for(link in vlcLinksArr){
			
			if(vlcLinksArr[link].href.slice(vlcLinksArr[link].href.lastIndexOf('_')) != br){
								
				vlcLinksArr[link].href = vlcLinksArr[link].href.split(br)[0]+br;
				
			}
			
		}
		
	}

	document.getElementById('standard-quality').addEventListener("click", function(evnt){								
	
		changeLinks('standard-quality');
	
		return false;
	
	}, false);	
	
	document.getElementById('high-quality').addEventListener("click", function(evnt){								
	
		changeLinks('high-quality');
	
		return false;		
	
	}, false);	
}
var u = "http://media.iinet.net.au/cgi-bin/bpl/schedule.cgi?list="+(new Date().getTime());
GM_xmlhttpRequest({
   method:"GET",
   url:u,
   headers:{
     "User-Agent":"Mozilla/5.0",
   },
   onload:function(responseDetails) {
	   //unsafeWindow.console.log(responseDetails);
		var JSONisMahBitch = JSON.parse(responseDetails.responseText);
		//unsafeWindow.console.log(JSONisMahBitch);	

		gmxhr(JSONisMahBitch);
    }
 });

//unsafeWindow.Request.JSON.onComplete= alert(data);
//unsafeWindow.playWindowsMedia = alert(unsafeWindow.handlePlay.data);