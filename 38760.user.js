// ==UserScript==
// @name           Digg Top In All Topics - Link directly to article
// @namespace      userscripts.org
// @description    Links Top In All Topics links directly to the article, rather than the digg page. The digg page link is also available underneath if you click on the comments link.
// @include        http://digg.com/
// @include        http://*.digg.com/
// ==/UserScript==

(function(){
	
	var letterman = document.getElementById('toptenlist');
	
	if(letterman){

		GM_addStyle('#topten-list .gm_scipt{margin-left:-44px;opacity:0.6;width:300px;top:12px;}#toptenlist #topten-list .news-thumb .gm_scipt{margin-left:-80px;}'+
					'#topten-list .news-summary{padding-bottom:10px !important;}');
		 


		//http://www.json.org/json2.js
		if(!this.JSON){JSON={}}(function(){function f(n){return n<10?'0'+n:n}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z'};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];if(typeof c==='string'){return c}return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(typeof value.length==='number'&&!value.propertyIsEnumerable('length')){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value})}}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse');}}})();

		var topS = document.evaluate( "//div[@id='topten-list']//h3//a" ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

		function clean(el){

			return el.slice(el.lastIndexOf('/')+1);			
			
		}

		function xhr(u){
		
			 GM_xmlhttpRequest({
			   method:"GET",
			   url:"http://services.digg.com/story/"+u+"?appkey=http%3A%2F%2Ffoo.org&type=json",
			   headers:{
			     "User-Agent":"Mozilla/5.0",            
			   },
			   onload:function(response) {
				   	
				   	var JSONisMahBitch = JSON.parse(response.responseText);
				     
					for(var t = 0; t < topS.snapshotLength; t++){
						
						var sEl = topS.snapshotItem(t);
						var sH = sEl.href;
						var ca = clean(sH);
						var story = JSONisMahBitch.stories[0];
						var cJ = clean(story.href);

						if(ca == cJ){

							var d = document.createElement('p');
							d.setAttribute('class','news-details gm_scipt');
							//d.setAttribute('style','');
							d.innerHTML='<a class="tool comments" href="'+sH+'">'+story.comments+' Comments</a>	'+				
							'<span class="tool user-info"><a href="/users/'+story.user.name+'">'+
							'<img width="16" height="16" class="user-photo" alt="'+story.user.name+'" src="'+story.user.icon+'"/>'+
							'submitted by '+story.user.name+'</a></span>';

							sEl.href=story.link;
							//var b = document.createElement('br');
							var par = sEl.parentNode.parentNode;
							par.appendChild(d);
							//par.insertBefore( b, d );
							break;
						}
					
					}			     
			     
			   },
			   onerror:function(eResponse){
			   	
			   		try{
			   			
			   			unsafeWindow.console.log('error'+eResponse);
			   			
			   		}
			   		catch(e){
			   			
			   			alert('error'+eResponse);
			   			
			   		}
			   	
			   }
			 });
		 
		}

		for(var l = 0; l < topS.snapshotLength; l++){

			xhr(clean(topS.snapshotItem(l).href));
		
		}

	}
	
	
})();


