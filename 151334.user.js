// ==UserScript==
// @name        Add podsavelink
// @namespace   https://pod.geraspora.de/u/deusfigendi
// @description changes the local ID in links to a global
// @include        http*://pod.geraspora.de/*
// @include        http*://my-seed.com/*
// @include        http*://the.diasperse.com/*
// @include        http*://li-la.de:3000/*
// @include        http*://social.mathaba.net/*
// @include        http*://humanless.ru/*
// @include        http*://poddery.com/*
// @include        http*://yaspora.com/*
// @include        http*://ottospora.nl/*
// @include        http*://diasp.eu/*
// @include        http*://diasp.be/*
// @include        http*://diasp.org/*
// @include        http*://mul.tiver.se/*
// @include        http*://diaspora.compadre.dk/*
// @include        http*://failure.net/*
// @include        http*://despora.de/*
// @include        http*://londondiaspora.org/*
// @include        http*://filiusdex.com/*
// @include        http*://diasp.de/*
// @include        http*://diasp.urbanabydos.ca/*
// @include        http*://fused.at/*
// @include        http*://diaspora.subsignal.org/*
// @include        http*://diaspora.lt/*
// @include        http*://joindiaspora.com/*
// @include        http*://efix.tk/*
// @include        http*://diaspora.streusel.org/*
// @include        http*://diasp.eu.com/*
// @include        http*://diasp.fi/*
// @include        http*://diaspora.dannielou.com/*
// @include        http*://diaspora.xn--grne-lampe-beb.de/*
// @include        http*://dpod.se/*
// @include        http*://diaspora.isnap.gr/*
// @include        http*://soc.ragriz.net/*
// @include        http*://pod.chrisi01.de/*
// @include        http*://foobar.cx/*
// @include        http*://testy.kompisen.se/*
// @include        http*://yaspora.es/*
// @include        http*://diaspora.eigenlab.org/*
// @include        http*://diaspora.sceal.ie/*
// @include        http*://mariosabatino.info/*
// @include        http*://diaspora.gpeni.net/*
// @include        http*://rlb.co/*
// @include        http*://www.geekspot.eu/*
// @include        http*://diaspora.adlerweb.info/*
// @include        http*://diasporapt.com/*
// @include        http*://friends.gabewarren.com/*
// @include        http*://84.23.75.136/*
// @include        http*://diaspora.chouchoune.fr/*
// @include        http*://alt.md/*
// @include        http*://lksnyder0.mooo.com/*
// @version     1
// ==/UserScript==

//          this is a minified version of json_parse.js
//	                           by douglascrockford from
//          https://github.com/douglascrockford/JSON-js
//                                  it's public domain.
var json_parse=(function(){"use strict";var at,ch,escapee={'"':'"','\\':'\\','/':'/',b:'\b',f:'\f',n:'\n',r:'\r',t:'\t'},text,error=function(m){throw{name:'SyntaxError',message:m,at:at,text:text}},next=function(c){if(c&&c!==ch){error("Expected '"+c+"' instead of '"+ch+"'")}ch=text.charAt(at);at+=1;return ch},number=function(){var number,string='';if(ch==='-'){string='-';next('-')}while(ch>='0'&&ch<='9'){string+=ch;next()}if(ch==='.'){string+='.';while(next()&&ch>='0'&&ch<='9'){string+=ch}}if(ch==='e'||ch==='E'){string+=ch;next();if(ch==='-'||ch==='+'){string+=ch;next()}while(ch>='0'&&ch<='9'){string+=ch;next()}}number=+string;if(!isFinite(number)){error("Bad number")}else{return number}},string=function(){var hex,i,string='',uffff;if(ch==='"'){while(next()){if(ch==='"'){next();return string}if(ch==='\\'){next();if(ch==='u'){uffff=0;for(i=0;i<4;i+=1){hex=parseInt(next(),16);if(!isFinite(hex)){break}uffff=uffff*16+hex}string+=String.fromCharCode(uffff)}else if(typeof escapee[ch]==='string'){string+=escapee[ch]}else{break}}else{string+=ch}}}error("Bad string")},white=function(){while(ch&&ch<=' '){next()}},word=function(){switch(ch){case't':next('t');next('r');next('u');next('e');return true;case'f':next('f');next('a');next('l');next('s');next('e');return false;case'n':next('n');next('u');next('l');next('l');return null}error("Unexpected '"+ch+"'")},value,array=function(){var array=[];if(ch==='['){next('[');white();if(ch===']'){next(']');return array}while(ch){array.push(value());white();if(ch===']'){next(']');return array}next(',');white()}}error("Bad array")},object=function(){var key,object={};if(ch==='{'){next('{');white();if(ch==='}'){next('}');return object}while(ch){key=string();white();next(':');if(Object.hasOwnProperty.call(object,key)){error('Duplicate key "'+key+'"')}object[key]=value();white();if(ch==='}'){next('}');return object}next(',');white()}}error("Bad object")};value=function(){white();switch(ch){case'{':return object();case'[':return array();case'"':return string();case'-':return number();default:return ch>='0'&&ch<='9'?number():word()}};return function(source,reviver){var result;text=source;at=0;ch=' ';result=value();white();if(ch){error("Syntax error")}return typeof reviver==='function'?(function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}({'':result},'')):result}}());

function replace_this_href(a_element) {
				a_element.id = 'uniqueposttimestamp_'+a_element.href.match(/\/posts\/(\d+)\/?$/)[1];
				var xmlHttp = new XMLHttpRequest();				
				xmlHttp.open('GET', a_element.href + '.json', true);
				xmlHttp.onreadystatechange = function () {
					if (xmlHttp.readyState == 4) {
						var this_posting = json_parse(xmlHttp.responseText);
						if (document.getElementById('uniqueposttimestamp_'+this_posting.id)) {
							document.getElementById('uniqueposttimestamp_'+this_posting.id).href = document.getElementById('uniqueposttimestamp_'+this_posting.id).href.replace(/\d+/,this_posting.guid);
							document.getElementById('uniqueposttimestamp_'+this_posting.id).parentNode.appendChild(document.createElement('br'));
							document.getElementById('uniqueposttimestamp_'+this_posting.id).parentNode.appendChild(document.createTextNode('/posts/'+this_posting.guid));
							document.getElementById('uniqueposttimestamp_'+this_posting.id).id = 'uniqueposttimestamp_'+this_posting.guid;
						}
						if (document.getElementById('uniqueposttimestamp_'+this_posting.id)) {
							document.getElementById('uniqueposttimestamp_'+this_posting.id).id += '__'+Math.round(Math.random() * 1000);
						}
					}
				};
				xmlHttp.send(null);
}

function change_all_links() {
	var all_a = document.getElementsByTagName('time');
	for (var i=0; i < all_a.length; i++) {
		if (all_a[i].parentNode.href) {
			if (all_a[i].parentNode.href.match(/\/posts\/\d+\/?$/)) {
				local_id_array = all_a[i].parentNode.href.match(/\/posts\/(\d+)\/?$/)
				all_a[i].parentNode.setAttribute('data-localid',local_id_array[1]);
				replace_this_href(all_a[i].parentNode);
			}
		}
	}
}

window.setTimeout(change_all_links,1000);
window.setTimeout(change_all_links,2000);
window.setTimeout(change_all_links,4000);
window.setTimeout(change_all_links,6000);
window.setTimeout(change_all_links,10000);
window.setInterval(change_all_links,20000);
