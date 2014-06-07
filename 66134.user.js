// ==UserScript==
// @name           flv_video_links
// @namespace      http://www.ex.ua/
// @description    show links to download flv preview files
// @include        http://www.ex.ua/view/*
// @include        http://www.ex.ua/*
// @include        http://ex.ua/*
// @author		   .bs
// @grant		   unsafeWindow
// @version		   0.4.1
// ==/UserScript==


(function (debug) {	
	
	//helper functions
	var h = (function () {
			/* Sly v1.0rc2 <http://sly.digitarald.com> - (C) 2009 Harald Kirschner <http://digitarald.de> - Open source under MIT License */
			var Sly=(function(){var q={};var b=function(E,D,C,i){E=(typeof(E)=="string")?E.replace(/^\s+|\s+$/,""):"";var e=q[E]||(q[E]=new b.initialize(E));return(D==null)?e:e.search(D,C,i)};b.initialize=function(e){this.text=e};var t=b.initialize.prototype=b.prototype;b.implement=function(i,e){for(var C in e){b[i][C]=e[C]}};var k=b.support={};(function(){var i=document.createElement("div"),C=(new Date()).getTime();i.innerHTML='<a name="'+C+'" class="€ b"></a>';i.appendChild(document.createComment(""));k.byTagAddsComments=(i.getElementsByTagName("*").length>1);k.hasQsa=!!(i.querySelectorAll&&i.querySelectorAll(".€").length);k.hasByClass=(function(){if(!i.getElementsByClassName||!i.getElementsByClassName("b").length){return false}i.firstChild.className="c";return(i.getElementsByClassName("c").length==1)})();var e=document.documentElement;e.insertBefore(i,e.firstChild);k.byIdAddsName=!!(document.getElementById(C));e.removeChild(i)})();var r=function(){return true};t.search=function(D,O,E){E=E||{};var H,T,W;if(!D){D=document}else{if(D.nodeType!=1&&D.nodeType!=9){if(typeof(D)=="string"){D=b.search(D);H=true}else{if(Object.prototype.toString.call(D)=="[object Array]"||(typeof(D.length)=="number"&&D.item)){var I=[];for(T=0;(W=D[T]);T++){if(W.nodeType==1||W.nodeType==9){I.push(W)}}H=(I.length>1);D=(H)?I:(I[0]||document)}}}}var M,J,P,C={},F={};var N=C;var U=b.getUid;var X=function(i){var e=U(i);return(N[e])?null:(N[e]=true)};if(O&&O.length){for(T=0;(W=O[T]);T++){X(W)}}if(k.hasQsa&&!H&&D.nodeType==9&&!(/\[/).test(this.text)){try{var G=D.querySelectorAll(this.text)}catch(V){}if(G){if(!O){return b.toArray(G)}for(T=0;(W=G[T]);T++){if(X(W)){O.push(W)}}if(!E.unordered){O.sort(b.compare)}return O}}var K=this.parse();if(!K.length){return[]}for(var T=0,S;(S=K[T]);T++){var L=X;if(S.first){if(!O){L=r}else{M=true}if(H){P=D}else{if(S.combinator){P=[D]}}}if(S.last&&O){N=C;J=O}else{N={};J=[]}if(!S.combinator&&!H){J=S.combine(J,D,S,F,L,!(J.length))}else{for(var R=0,Q=P.length;R<Q;R++){J=S.combine(J,P[R],S,F,L)}}if(S.last){if(J.length){O=J}}else{P=J}}if(!E.unordered&&M&&O){O.sort(b.compare)}return O||[]};t.find=function(C,i,e){return this.search(C,i,e)[0]};t.match=function(E,D){var e=this.parse();if(e.length==1){return !!(this.parse()[0].match(E,{}))}if(!D){D=E;while(D.parentNode){D=D.parentNode}}var F=this.search(D),C=F.length;if(!C--){return false}while(C--){if(F[C]==E){return true}}return false};t.filter=function(e){var E=[],C=this.parse()[0].match;for(var D=0,F;(F=e[D]);D++){if(C(F)){E.push(F)}}return E};var z;b.recompile=function(){var i,e=[","],C=["!"];for(i in o){if(i!=" "){e[(i.length>1)?"unshift":"push"](b.escapeRegExp(i))}}for(i in v){C.push(i)}z=new RegExp("[\\w\\u00a1-\\uFFFF][\\w\\u00a1-\\uFFFF-]*|[#.](?:[\\w\\u00a1-\\uFFFF-]|\\\\:|\\\\.)+|[ \\t\\r\\n\\f](?=[\\w\\u00a1-\\uFFFF*#.[:])|[ \\t\\r\\n\\f]*("+e.join("|")+")[ \\t\\r\\n\\f]*|\\[([\\w\\u00a1-\\uFFFF-]+)[ \\t\\r\\n\\f]*(?:(["+C.join("")+"]?=)[ \\t\\r\\n\\f]*(?:\"([^\"]*)\"|'([^']*)'|([^\\]]*)))?]|:([-\\w\\u00a1-\\uFFFF]+)(?:\\((?:\"([^\"]*)\"|'([^']*)'|([^)]*))\\))?|\\*|(.+)","g")};var l=function(e){return{ident:[],classes:[],attributes:[],pseudos:[],combinator:e}};var g=function(e){return e};t.parse=function(I){var E=(I)?"plain":"parsed";if(this[E]){return this[E]}var J=this.text;var H=(I)?g:this.compute;var G=[],D=l(null);D.first=true;var F=function(K){G.push(H(D));D=l(K)};z.lastIndex=0;var C,i;while((C=z.exec(J))){if(C[11]){if(b.verbose){throw SyntaxError('Syntax error, "'+i+'" unexpected at #'+z.lastIndex+' in "'+J+'"')}return(this[E]=[])}i=C[0];switch(i.charAt(0)){case".":D.classes.push(i.slice(1).replace(/\\/g,""));break;case"#":D.id=i.slice(1).replace(/\\/g,"");break;case"[":D.attributes.push({name:C[2],operator:C[3]||null,value:C[4]||C[5]||C[6]||null});break;case":":D.pseudos.push({name:C[7],value:C[8]||C[9]||C[10]||null});break;case" ":case"\t":case"\r":case"\n":case"\f":C[1]=C[1]||" ";default:var e=C[1];if(e){if(e==","){D.last=true;F(null);D.first=true;continue}if(D.first&&!D.ident.length){D.combinator=e}else{F(e)}}else{if(i!="*"){D.tag=i}}}D.ident.push(i)}D.last=true;G.push(H(D));return(this[E]=G)};function u(C,i,e,D){return(C)?((D)?function(E,F){return i(E,e,F)&&C(E,F)}:function(E,F){return C(E,F)&&i(E,e,F)}):function(E,F){return i(E,e,F)}}var j=function(){return true};var B=function(e,i){return(e.id==i)};var c=function(i,e){return(i.nodeName.toUpperCase()==e)};var h=function(e){return(new RegExp("(?:^|[ \\t\\r\\n\\f])"+e+"(?:$|[ \\t\\r\\n\\f])"))};var f=function(e,i){return e.className&&i.test(e.className)};var p=function(e){e.getter=b.lookupAttribute(e.name)||b.getAttribute;if(!e.operator||!e.value){return e}var i=v[e.operator];if(i){e.escaped=b.escapeRegExp(e.value);e.pattern=new RegExp(i(e.value,e.escaped,e))}return e};var s=function(i,e){var C=e.getter(i,e.name);switch(e.operator){case null:return C;case"=":return(C==e.value);case"!=":return(C!=e.value)}if(!C&&e.value){return false}return e.pattern.test(C)};t.compute=function(H){var I,N,J,O,F,D,P=H.tag,C=H.id,G=H.classes;var K=(P)?P.toUpperCase():null;if(C){D=true;F=u(null,B,C);O=function(Q){if(Q.getElementById){var R=Q.getElementById(C);return(R&&(!K||R.nodeName.toUpperCase()==K)&&(!k.getIdAdds||R.id==C))?[R]:[]}var T=Q.getElementsByTagName(P||"*");for(var i=0,S;(S=T[i]);i++){if(S.id==C){return[S]}}return[]}}if(G.length>0){if(!O&&k.hasByClass){for(I=0;(N=G[I]);I++){F=u(F,f,h(N))}var M=G.join(" ");O=function(i){return i.getElementsByClassName(M)}}else{if(!O&&G.length==1){D=true;var L=h(G[0]);F=u(F,f,L);O=function(R){var U=R.getElementsByTagName(P||"*");var T=[];for(var Q=0,S;(S=U[Q]);Q++){if(S.className&&L.test(S.className)){T.push(S)}}return T}}else{for(I=0;(N=G[I]);I++){J=u(J,f,h(N))}}}}if(P){if(!O){F=u(F,c,K);O=function(i){return i.getElementsByTagName(P)}}else{if(!D){J=u(J,c,K)}}}else{if(!O){O=function(R){var U=R.getElementsByTagName("*");if(!k.byTagAddsComments){return U}var T=[];for(var Q=0,S;(S=U[Q]);Q++){if(S.nodeType===1){T.push(S)}}return T}}}for(I=0;(N=H.pseudos[I]);I++){if(N.name=="not"){var E=b(N.value);J=u(J,function(Q,i){return !i.match(Q)},(E.parse().length==1)?E.parsed[0]:E)}else{var e=d[N.name];if(e){J=u(J,e,N.value)}}}for(I=0;(N=H.attributes[I]);I++){J=u(J,s,p(N))}if((H.simple=!(J))){H.matchAux=j}else{H.matchAux=J;F=u(F,J)}H.match=F||j;H.combine=b.combinators[H.combinator||" "];H.search=O;return H};var o=b.combinators={" ":function(H,D,G,e,K,J){var C=G.search(D);if(J&&G.simple){return b.toArray(C)}for(var I=0,F,E=G.matchAux;(F=C[I]);I++){if(K(F)&&E(F,e)){H.push(F)}}return H},">":function(F,E,e,I,G){var C=e.search(E);for(var D=0,H;(H=C[D]);D++){if(H.parentNode==E&&G(H)&&e.matchAux(H,I)){F.push(H)}}return F},"+":function(C,i,e,E,D){while((i=i.nextSibling)){if(i.nodeType==1){if(D(i)&&e.match(i,E)){C.push(i)}break}}return C},"~":function(C,i,e,E,D){while((i=i.nextSibling)){if(i.nodeType==1){if(!D(i)){break}if(e.match(i,E)){C.push(i)}}}return C}};var d=b.pseudos={"first-child":function(e){return d.index(e,0)},"last-child":function(e){while((e=e.nextSibling)){if(e.nodeType===1){return false}}return true},"only-child":function(C){var i=C;while((i=i.previousSibling)){if(i.nodeType===1){return false}}var e=C;while((e=e.nextSibling)){if(e.nodeType===1){return false}}return true},"nth-child":function(E,G,F){var i=b.parseNth(G||"n");if(i.special!="n"){return d[i.special](E,i.a,F)}F=F||{};F.positions=F.positions||{};var C=b.getUid(E);if(!F.positions[C]){var D=0;while((E=E.previousSibling)){if(E.nodeType!=1){continue}D++;var e=F.positions[b.getUid(E)];if(e!=undefined){D=e+D;break}}F.positions[C]=D}return(F.positions[C]%i.a==i.b)},empty:function(e){return !(e.innerText||e.textContent||"").length},contains:function(e,i){return(e.innerText||e.textContent||"").indexOf(i)!=-1},index:function(C,e){var i=1;while((C=C.previousSibling)){if(C.nodeType==1&&++i>e){return false}}return(i==e)},even:function(e,C,i){return d["nth-child"](e,"2n+1",i)},odd:function(e,C,i){return d["nth-child"](e,"2n",i)}};d.first=d["first-child"];d.last=d["last-child"];d.nth=d["nth-child"];d.eq=d.index;var v=b.operators={"*=":function(e,i){return i},"^=":function(e,i){return"^"+i},"$=":function(e,i){return e+"$"},"~=":function(e,i){return"(?:^|[ \\t\\r\\n\\f])"+i+"(?:$|[ \\t\\r\\n\\f])"},"|=":function(e,i){return"(?:^|\\|)"+i+"(?:$|\\|)"}};var n={"class":"className"};b.lookupAttribute=function(i){var C=n[i];if(C){return function(D){return D[C]}}var e=/^(?:src|href|action)$/.test(i)?2:0;return function(D){return D.getAttribute(i,e)}};b.getAttribute=function(i,e){return i.getAttribute(e)};var x=Array.slice||function(e){return Array.prototype.slice.call(e)};try{x(document.documentElement.childNodes)}catch(A){x=function(e){if(e instanceof Array){return e}var D=e.length,C=new Array(D);while(D--){C[D]=e[D]}return C}}b.toArray=x;b.compare=(document.compareDocumentPosition)?function(i,e){return(3-(i.compareDocumentPosition(e)&6))}:function(i,e){return(i.sourceIndex-e.sourceIndex)};var w=1;b.getUid=(window.ActiveXObject)?function(e){return(e.$slyUid||(e.$slyUid={id:w++})).id}:function(e){return e.$slyUid||(e.$slyUid=w++)};var m={};b.parseNth=function(D){if(m[D]){return m[D]}var C=D.match(/^([+-]?\d*)?([a-z]+)?([+-]?\d*)?$/);if(!C){return false}var i=parseInt(C[1],10),e=(parseInt(C[3],10)||0)-1;if((i=(isNaN(i))?1:i)){while(e<1){e+=i}while(e>=i){e-=i}}switch(C[2]){case"n":C={a:i,b:e,special:"n"};break;case"odd":C={a:2,b:0,special:"n"};break;case"even":C={a:2,b:1,special:"n"};break;case"first":C={a:0,special:"index"};break;case"last":C={special:"last-child"};break;case"only":C={special:"only-child"};break;default:C={a:(i)?(i-1):e,special:"index"}}return(m[D]=C)};b.escapeRegExp=function(e){return e.replace(/[-.*+?^${}()|[\]\/\\]/g,"\\$&")};b.generise=function(e){b[e]=function(C){var i=b(C);return i[e].apply(i,Array.prototype.slice.call(arguments,1))}};var a=["parse","search","find","match","filter"];for(var y=0;a[y];y++){b.generise(a[y])}b.recompile();return b})();
			return {
				qsa : function (s,c) { return Sly(s).search(c||document) },
				qs : function (s,c) { return Sly.find(s, c||document) },
				each : function (c, w) { return Array.prototype.forEach.call(c, w) },
                base64encode : btoa ? function (str) { return btoa(unescape(encodeURIComponent( str )))} : function encode(a){var b="",c,chr2,chr3,enc1,enc2,enc3,enc4,i=0,_keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";a=(function utf8_encode(a){a=a.replace(/\r\n/g,"\n");var b="";for(var n=0;n<a.length;n++){var c=a.charCodeAt(n);if(c<128){b+=String.fromCharCode(c)}else if((c>127)&&(c<2048)){b+=String.fromCharCode((c>>6)|192);b+=String.fromCharCode((c&63)|128)}else{b+=String.fromCharCode((c>>12)|224);b+=String.fromCharCode(((c>>6)&63)|128);b+=String.fromCharCode((c&63)|128)}}return b})(a);while(i<a.length){c=a.charCodeAt(i++);chr2=a.charCodeAt(i++);chr3=a.charCodeAt(i++);enc1=c>>2;enc2=((c&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}b=b+_keyStr.charAt(enc1)+_keyStr.charAt(enc2)+_keyStr.charAt(enc3)+_keyStr.charAt(enc4)}return b}
			}
	})()
	
	if (debug)
		if(typeof unsafeWindow !== "undefined" && typeof unsafeWindow.console === 'function')
			console = unsafeWindow.console
		else if (typeof opera !== 'undefined' && opera.postError)
			console = { log : function () { opera.postError.apply(opera, arguments)} }
			
	if (typeof console === 'undefined' || typeof console.log !== 'function')
		console = { log : function () {} }


	function worker () {
		var flvList,
			torrentsList = [];
			
			
		//search for player in page, if it would be not found - assume we are not on video page
		if (h.qs('#player')) {
			
			flvList = (function () {
				var _links = [],
                    transformer = [],
                    player_list,
                    player_info,
                    i, l, scripts;

                try {
                    player_list = JSON.parse('[' + document.body.innerHTML.match(/var player_list = (.*)'/)[1].substr(1) + ']')
                    player_info = Function('return [' + document.body.innerHTML.match(/var player_info = new Array\((.*)\)/)[1] + ']').call()
                    
                    for (i = 0, l = player_info.length; i < l; i++ )
						_links.push({
							title: player_info[i].title.replace(/\.\w{3}$/,'.flv'),
							url: player_list[i].url
						})
                } catch(e) {
                    // in case we didn't find list and info, fallback to old behaviour
  
					for (i = 0, scripts = h.qsa('script:not([src])'), l = scripts.length; i < l ; i++)
						if (scripts[i].textContent.indexOf('playlist') !== -1)
							transformer = transformer.concat(scripts[i].textContent.match(/http:\/\/[\w\/\.]*\.flv/gim) || [])
                                   
                            h.each(transformer, function (link) {
                                _links.push({
                                    title: link,
                                    url: link
                                })
                            })
                }
                    					

				return _links
			})()

			//Collect all torrent links
			h.each(document.body.innerHTML.match(/.torrent\/\d+/gi) || [], function (t) {
				var _link = 'http://' + location.host + t
				torrentsList.push({ title : _link, url: _link })
			});
			
			//Append links for opening new windows with video links to download
			h.qs('.list small').innerHTML += ', <a id="flvlistb" href="javascript:">flv-list</a>, <a id="trntlistb" href="javascript:">torrents-list</a>';

			
			// bind event handlers with window population on open
			h.each([
					{ element: h.qs('#flvlistb'), collection : flvList, title : "flv" },
					{ element: h.qs('#trntlistb'), collection : torrentsList, title : "torrents" }
				],
				(function () {
					function prepareFlvLinks(element, collection, title) {
						title || (title = "no title");
                        console.log("collection : %o",collection)
						try {
							element.addEventListener('click', function (e) {
								for (var list = [], i = 0, l = collection.length; i < l; i++ )
									list.push('<li><a href="' + collection[i].url + '" download="' + collection[i].title + '">' + collection[i].title + '</a></li>');
								window.open('data:text/html;charset=utf-8;base64,' + h.base64encode('<!DOCTYPE html><html><head><title>Flv Video Links : '+ title +'</title></head><body><ul style="list-style: none;">' + list.join("") + '</ul></body></html>'),'flv' + title,'width=600px,height=500px,toolbar=0,location=0,scrollbars=1');
								e.preventDefault()
								return false
							}, false);
						} catch(e) { console.log("Some error was happend in flv_video links generation, flv " + title + " window open", e) }
					}
					return function (item) {
						return prepareFlvLinks(item.element, item.collection, item.title)
					}
				})())
			

			// get all buttons with class "r_button_small" and append new link to flv file
			h.each(h.qsa('.r_button_small a[id^=play_]'), function (link, i) {
				var buttonsHolder = link.parentNode.parentNode.nextSibling;
				while(buttonsHolder.nodeType !== 1) buttonsHolder = buttonsHolder.nextSibling;
				if (buttonsHolder.innerHTML.match(/\:\s\d+x\d+/i)) {
					var button = h.qs('.r_button_small', buttonsHolder);
					button && (button.parentNode.innerHTML += '<span class="r_button_small"><a href="' + flvList[i].url + '" download="' + flvList[i].title + '">flv</a></span>')
				}
			})
		}
	}
	worker()
})(false)