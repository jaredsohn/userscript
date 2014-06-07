// ==UserScript==
// @name        Notification title posts
// @namespace   deusfigendi
// @description Tells some kind of "title" for the word "post" in notifications...
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
// @include        http*://pod.orkz.net/*
// @include        http*://diaspora.chouchoune.fr/*
// @include        http*://alt.md/*
// @include        http*://lksnyder0.mooo.com/*
// @version     1.1
// @grant       none
// ==/UserScript==


// http://code.google.com/p/json-sans-eval/
var jsonParse=(function(){var number='(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)';var oneChar='(?:[^\\0-\\x08\\x0a-\\x1f\"\\\\]'+'|\\\\(?:[\"/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';var string='(?:\"'+oneChar+'*\")';var jsonToken=new RegExp('(?:false|true|null|[\\{\\}\\[\\]]'+'|'+number+'|'+string+')','g');var escapeSequence=new RegExp('\\\\(?:([^u])|u(.{4}))','g');var escapes={'"':'"','/':'/','\\':'\\','b':'\b','f':'\f','n':'\n','r':'\r','t':'\t'};function unescapeOne(_,ch,hex){return ch?escapes[ch]:String.fromCharCode(parseInt(hex,16))}var EMPTY_STRING=new String('');var SLASH='\\';var firstTokenCtors={'{':Object,'[':Array};var hop=Object.hasOwnProperty;return function(json,opt_reviver){var toks=json.match(jsonToken);var result;var tok=toks[0];var topLevelPrimitive=false;if('{'===tok){result={}}else if('['===tok){result=[]}else{result=[];topLevelPrimitive=true}var key;var stack=[result];for(var i=1-topLevelPrimitive,n=toks.length;i<n;++i){tok=toks[i];var cont;switch(tok.charCodeAt(0)){default:cont=stack[0];cont[key||cont.length]=+(tok);key=void 0;break;case 0x22:tok=tok.substring(1,tok.length-1);if(tok.indexOf(SLASH)!==-1){tok=tok.replace(escapeSequence,unescapeOne)}cont=stack[0];if(!key){if(cont instanceof Array){key=cont.length}else{key=tok||EMPTY_STRING;break}}cont[key]=tok;key=void 0;break;case 0x5b:cont=stack[0];stack.unshift(cont[key||cont.length]=[]);key=void 0;break;case 0x5d:stack.shift();break;case 0x66:cont=stack[0];cont[key||cont.length]=false;key=void 0;break;case 0x6e:cont=stack[0];cont[key||cont.length]=null;key=void 0;break;case 0x74:cont=stack[0];cont[key||cont.length]=true;key=void 0;break;case 0x7b:cont=stack[0];stack.unshift(cont[key||cont.length]={});key=void 0;break;case 0x7d:stack.shift();break}}if(topLevelPrimitive){if(stack.length!==1){throw new Error()}result=result[0]}else{if(stack.length){throw new Error()}}if(opt_reviver){var walk=function(holder,key){var value=holder[key];if(value&&typeof value==='object'){var toDelete=null;for(var k in value){if(hop.call(value,k)&&value!==holder){var v=walk(value,k);if(v!==void 0){value[k]=v}else{if(!toDelete){toDelete=[]}toDelete.push(k)}}}if(toDelete){for(var i=toDelete.length;--i>=0;){delete value[toDelete[i]]}}}return opt_reviver.call(holder,key,value)};result=walk({'':result},'')}return result}})();

function generate_title_from_content(full_text) {
	
	var new_title = "";
	if ((new_title = full_text.match(/(^|\n)#\s+[^\n$]*($|\n)/)) == null) {
	if ((new_title = full_text.match(/(^|\n)##\s+[^\n$]*($|\n)/)) == null) {
	if ((new_title = full_text.match(/(^|\n)###\s+[^\n$]*($|\n)/)) == null) {
	if ((new_title = full_text.match(/(^|\n)####\s+[^\n$]*($|\n)/)) == null) {
	if ((new_title = full_text.match(/^[^\n$]*($|\n)/)) == null) {
		new_title = new Array("");
	}	
	}	
	}	
	}	
	}
	
	//trim off markdown a bit...
	new_title = new_title[0].replace(/!\[([^\]]*)\]\([^\)]+\)/,'$1');
	new_title = new_title.replace(/\[([^\]]*)\]\([^\)]+\)/,'$1');
	new_title = new_title.replace(/#/,'');
	new_title = new_title.match(/\w.*/)[0];
	
	if (new_title.length > 40) {
		new_title = new_title.slice(0,30)+"…";
	}
	
	return new_title;
}


function replace_not_link(response_json) {
	not_post_content = jsonParse(response_json);
	my_title = generate_title_from_content(not_post_content.text);
	my_postid = not_post_content.id;
	
	
	if(document.getElementById("notifications_content")) {
		var not_list = document.getElementById("notifications_content").getElementsByClassName("stream_element");
	} else {
		var not_list = document.getElementById("notification_dropdown").getElementsByClassName("notification_element");
	}
	for (var i = 0; i < not_list.length; i++) {	
		var post_a = not_list[i].getElementsByClassName("hard_object_link")[0];
		if (post_a) {
			var this_post_id = post_a.getAttribute("data-ref");
			if (this_post_id == my_postid) {
				if (!post_a.classList.contains("titled")) {
					post_a.firstChild.data += " "+my_title;
					post_a.classList.add("titled");
				}
			}
		}
	}
}

function extend_notifications() {
	var not_list = document.getElementById("notification_dropdown").getElementsByClassName("notification_element");
	ajax_requests = new Array();
	for (var i = 0; i < not_list.length; i++) {		
		var post_a = not_list[i].getElementsByClassName("hard_object_link");
		if (post_a.length > 0) {
			post_a = post_a[0];
			var this_post_id = post_a.getAttribute("data-ref");
			//AJAX bezüglich des Postings absetzen, bei Erfolg Link ersetzen...
			ajax_requests.push(new XMLHttpRequest());
			my_ajax_request = ajax_requests[ajax_requests.length -1];
			my_ajax_request.onreadystatechange = function(){
				//check state and if 4 fire function to change links...
				if(this.readyState == 4){
					replace_not_link(this.responseText);
				}
			}		
			my_ajax_request.open("GET", "/posts/"+this_post_id+".json", true);
			my_ajax_request.send(null);		
		}
	}
}

function register_events() {
	if (document.getElementById("notification_badge")) {
		document.getElementById("notification_badge").addEventListener("mouseup",function() { window.setTimeout(extend_notifications,1200); });
	} 
	if(document.getElementById("notifications_content")) {
		
		
		var not_list = document.getElementById("notifications_content").getElementsByClassName("stream_element");
		ajax_requests = new Array();
		for (var i = 0; i < not_list.length; i++) {		
			var post_a = not_list[i].getElementsByClassName("hard_object_link");
			if (post_a.length > 0) {
				post_a = post_a[0];
				var this_post_id = post_a.getAttribute("data-ref");
				//AJAX bezüglich des Postings absetzen, bei Erfolg Link ersetzen...
				ajax_requests.push(new XMLHttpRequest());
				my_ajax_request = ajax_requests[ajax_requests.length -1];
				my_ajax_request.onreadystatechange = function(){
					//check state and if 4 fire function to change links...
					if(this.readyState == 4){
						replace_not_link(this.responseText);
					}
				}		
				my_ajax_request.open("GET", "/posts/"+this_post_id+".json", true);
				my_ajax_request.send(null);		
			}
		}
		
	}
}




function strip_off_html(element) {
    // What a tag looks like
    var matchTag = /<(?:.|\s)*?>/g;
    // Replace the tag
    return element.replace(matchTag, "");
}

function replace_title_by_headline() {
	if (document.getElementById("post-interactionsc")) {
		var new_title = "Beitrag";
		var content_div = document.getElementById("post-content");
		if (content_div.getElementsByTagName("h1").length > 0) {
			new_title = strip_off_html(content_div.getElementsByTagName("h1")[0].innerHTML);
		} else if (content_div.getElementsByTagName("h2").length > 0) {
			new_title = strip_off_html(content_div.getElementsByTagName("h2")[0].innerHTML);
		} else if (content_div.getElementsByTagName("h3").length > 0) {
			new_title = strip_off_html(content_div.getElementsByTagName("h3")[0].innerHTML);
		} else if (content_div.getElementsByTagName("h4").length > 0) {
			new_title = strip_off_html(content_div.getElementsByTagName("h4")[0].innerHTML);
		} else if (content_div.getElementsByTagName("h5").length > 0) {
			new_title = strip_off_html(content_div.getElementsByTagName("h5")[0].innerHTML);
		} else if (content_div.getElementsByTagName("header").length > 0) {
			new_title = strip_off_html(content_div.getElementsByTagName("header")[0].innerHTML);
		}
	
		document.getElementsByTagName("title")[0].firstChild.data = new_title;
	}
}

window.setTimeout(replace_title_by_headline,1000);



window.setTimeout(register_events,2000);
