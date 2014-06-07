// ==UserScript==
// @name        Do it later
// @namespace   deusfigendi
// @description posts or reshared stuff after time...
// @include     http*://pod.geraspora.de/*
// @include     http*://joindiaspora.com/*
// @include     http*://diasp.org/*
// @include     http*://despora.de/*
// @include     http*://ilikefreedom.org/*
// @include     http*://nerdpol.ch/*
// @include     http*://diasp.eu/*
// @include     http*://kosmospora.net/*
// @include     http*://pod.orkz.net/*
// @include     http*://wk3.org/*
// @include     http*://diasp0ra.ca/*
// @include     http*://diasp.de/*
// @include     http*://stylr.net/*
// @include     http*://mipod.us/*
// @include     http*://friendica.eu/*
// @include     http*://pod.sd.vc/*
// @include     http*://socializer.cc/*
// @include     http*://frndk.de/*
// @include     http*://whompify.com/*
// @include     http*://calispora.org/*
// @include     http*://pod.lausen.nl/*
// @include     http*://adris.es/*
// @include     http*://diapod.net/*
// @include     http*://www.optimistisch.de/*
// @include     http*://diaspora.linuxmaniac.net/*
// @include     http*://spyurk.am/*
// @include     http*://fabdofriends.de/*
// @include     http*://sxspora.de/*
// @include     http*://social.mrzyx.de/*
// @include     http*://pingupod.de/*
// @include     http*://jenaspora.de/*
// @include     http*://diaspora.scarleo.se/*
// @include     http*://pirati.ca/*
// @include     http*://friends.dostmusik.de/*
// @include     http*://social.mathaba.net/*
// @include     http*://nerdpol.ch/*
// @version     1.6.12
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_addStyle
// ==/UserScript==


/*
 * Upcoming Scripts...
 * 
 * Aspekte nachvollziehen können (Melles Idee)
 * Reshare as Quote 
 * Tag-Synonyme
 * 
 * 
 */


/*
 * Einen Aspekt erstellen:
 * 

Anfrage-HeaderFormatiert anzeigen

POST /aspects HTTP/1.1
Host: pod.geraspora.de
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:20.0) Gecko/20100101 Firefox/20.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,* /*;q=0.8
Accept-Language: de-de,de;q=0.8,en-us;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Referer: https://pod.geraspora.de/aspects
Cookie: _diaspora_session=BAh7CUkiD3Nlc3Npb25faWQGOgZFRkkiJTRkYmEwZTU1NTE5NWI2NGE5MTQ3OTFiYjU3Y2QxMDExBjsAVEkiEF9jc3JmX3Rva2VuBjsARkkiMWNUWnhOT3FTNjV1Z29IMUxtblVwYXpGRXlXdUtlRkF4ZnBKbXNGcnJKVTA9BjsARkkiGXdhcmRlbi51c2VyLnVzZXIua2V5BjsAVFsISSIJVXNlcgY7AEZbBmkCSwxJIiIkMmEkMTAkdTlUSlB1TnowNkFYOE9uczRWYWpYZQY7AFRJIgphX2lkcwY7AEZbBkkiCjU4OTkzBjsAVA%3D%3D--1f8336a7df1a7910a41da17f46f98f0d93bc8d78
Connection: keep-alive

Anfrageheader des Uploadstreams
Content-Length	153
Content-Type	application/x-www-form-urlencoded

utf8=%E2%9C%93&authenticity_token=cTZxNOqS65ugoH1LmnUpazFEyWuKeFAxfpJmsFrrJU0%3D&aspect%5Bname%5D=_noone_&aspect%5Bcontacts_visible%5D=0&commit=Erstellen
 



Antwort-HeaderFormatiert anzeigen

HTTP/1.1 302 Found
Server: nginx/1.2.4
Date: Mon, 13 May 2013 04:11:19 GMT
Content-Type: text/html; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Status: 302 Found
X-Frame-Options: sameorigin
Strict-Transport-Security: max-age=31536000
X-Diaspora-Version: 0.0.3.4-p3e7fbb21
X-Git-Update: 2013-03-18 21:48:54 +0100
X-Git-Revision: 3e7fbb217dca1b5cd6affb827241757c7aabfaa7
Location: https://pod.geraspora.de/contacts?a_id=59744
X-UA-Compatible: IE=Edge,chrome=1
Cache-Control: no-cache
Set-Cookie: _diaspora_session=BAh7CkkiD3Nlc3Npb25faWQGOgZFRkkiJTRkYmEwZTU1NTE5NWI2NGE5MTQ3OTFiYjU3Y2QxMDExBjsAVEkiEF9jc3JmX3Rva2VuBjsARkkiMWNUWnhOT3FTNjV1Z29IMUxtblVwYXpGRXlXdUtlRkF4ZnBKbXNGcnJKVTA9BjsARkkiGXdhcmRlbi51c2VyLnVzZXIua2V5BjsAVFsISSIJVXNlcgY7AEZbBmkCSwxJIiIkMmEkMTAkdTlUSlB1TnowNkFYOE9uczRWYWpYZQY7AFRJIgphX2lkcwY7AEZbBkkiCjU4OTkzBjsAVEkiCmZsYXNoBjsARm86JUFjdGlvbkRpc3BhdGNoOjpGbGFzaDo6Rmxhc2hIYXNoCToKQHVzZWRvOghTZXQGOgpAaGFzaHsAOgxAY2xvc2VkRjoNQGZsYXNoZXN7BjoLbm90aWNlSSIuRGVpbiBuZXVlciBBc3Bla3QgX25vb25lXyB3dXJkZSBlcnN0ZWxsdC4GOwBUOglAbm93MA%3D%3D--55891d619865242333b9cadb93dd40a91024dd2c; path=/; secure
X-Request-Id: 8eae335eed07b207da8b37da6f4a55e3
X-Runtime: 0.059568
X-Rack-Cache: invalidate, pass
Vary: Accept-Encoding
Content-Encoding: gzip






 





Beitrag an niemanden:

Anfrage-HeaderFormatiert anzeigen

POST /status_messages HTTP/1.1
Host: pod.geraspora.de
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:20.0) Gecko/20100101 Firefox/20.0
Accept: application/json, text/javascript, * /*; q=0.01
Accept-Language: de-de,de;q=0.8,en-us;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
X-CSRF-Token: cTZxNOqS65ugoH1LmnUpazFEyWuKeFAxfpJmsFrrJU0=
Content-Type: application/json; charset=UTF-8
X-Requested-With: XMLHttpRequest
Referer: https://pod.geraspora.de/stream
Content-Length: 75
Cookie: _diaspora_session=BAh7CUkiD3Nlc3Npb25faWQGOgZFRkkiJTRkYmEwZTU1NTE5NWI2NGE5MTQ3OTFiYjU3Y2QxMDExBjsAVEkiEF9jc3JmX3Rva2VuBjsARkkiMWNUWnhOT3FTNjV1Z29IMUxtblVwYXpGRXlXdUtlRkF4ZnBKbXNGcnJKVTA9BjsARkkiGXdhcmRlbi51c2VyLnVzZXIua2V5BjsAVFsISSIJVXNlcgY7AEZbBmkCSwxJIiIkMmEkMTAkdTlUSlB1TnowNkFYOE9uczRWYWpYZQY7AFRJIgphX2lkcwY7AEZbBkkiCjU4OTkzBjsAVA%3D%3D--1f8336a7df1a7910a41da17f46f98f0d93bc8d78
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache


{"status_message":{"text":"Beitrag an niemanden...."},"aspect_ids":"59744"}
*/

doitlaterdebug = false;

//json-sans-eval from https://code.google.com/p/json-sans-eval/ by Mike Samuel <mikesamuel@gmail.com>
window.jsonParse=function(){var r="(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)",k='(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';k='(?:"'+k+'*")';var s=new RegExp("(?:false|true|null|[\\{\\}\\[\\]]|"+r+"|"+k+")","g"),t=new RegExp("\\\\(?:([^u])|u(.{4}))","g"),u={'"':'"',"/":"/","\\":"\\",b:"\u0008",f:"\u000c",n:"\n",r:"\r",t:"\t"};function v(h,j,e){return j?u[j]:String.fromCharCode(parseInt(e,16))}var w=new String(""),x=Object.hasOwnProperty;return function(h,
j){h=h.match(s);var e,c=h[0],l=false;if("{"===c)e={};else if("["===c)e=[];else{e=[];l=true}for(var b,d=[e],m=1-l,y=h.length;m<y;++m){c=h[m];var a;switch(c.charCodeAt(0)){default:a=d[0];a[b||a.length]=+c;b=void 0;break;case 34:c=c.substring(1,c.length-1);if(c.indexOf("\\")!==-1)c=c.replace(t,v);a=d[0];if(!b)if(a instanceof Array)b=a.length;else{b=c||w;break}a[b]=c;b=void 0;break;case 91:a=d[0];d.unshift(a[b||a.length]=[]);b=void 0;break;case 93:d.shift();break;case 102:a=d[0];a[b||a.length]=false;
b=void 0;break;case 110:a=d[0];a[b||a.length]=null;b=void 0;break;case 116:a=d[0];a[b||a.length]=true;b=void 0;break;case 123:a=d[0];d.unshift(a[b||a.length]={});b=void 0;break;case 125:d.shift();break}}if(l){if(d.length!==1)throw new Error;e=e[0]}else if(d.length)throw new Error;if(j){var p=function(n,o){var f=n[o];if(f&&typeof f==="object"){var i=null;for(var g in f)if(x.call(f,g)&&f!==n){var q=p(f,g);if(q!==void 0)f[g]=q;else{i||(i=[]);i.push(g)}}if(i)for(g=i.length;--g>=0;)delete f[i[g]]}return j.call(n,
o,f)};e=p({"":e},"")}return e}}();
//from http://www.sitepoint.com/javascript-json-serialization/ By Craig Buckler 
window.jsonStringify=JSON.stringify||function(obj){var t=typeof(obj);if(t!="object"||obj===null){if(t=="string")obj='"'+obj+'"';return String(obj)}else{var n,v,json=[],arr=(obj&&obj.constructor==Array);for(n in obj){v=obj[n];t=typeof(v);if(t=="string")v='"'+v+'"';else if(t=="object"&&v!==null)v=JSON.stringify(v);json.push((arr?"":'"'+n+'":')+String(v))}return(arr?"[":"{")+String(json)+(arr?"]":"}")}};

//make it work in non-Greasemonkey like Chromium Opera etc.
if (typeof(GM_getValue) != "undefined" && typeof(GM_setValue) != "undefined" && typeof(GM_listValues) != "undefined" && typeof(GM_deleteValue) != "undefined") {
	window.general_getValue = GM_getValue;
	window.general_setValue = GM_setValue;
	window.general_listValues = GM_listValues;
	window.general_deleteValue = GM_deleteValue;
} else if(typeof(localStorage) != "undefined") {
	window.general_getValue = function (mykey,mydefault) { var returnvalue = localStorage.getItem(mykey); if (returnvalue == null) {return mydefault;} else {return returnvalue;} }
	window.general_setValue = function (mykey,myvalue) { return localStorage.setItem(mykey,myvalue); }
	window.general_listValues = function(){ var key_list = new Array(); for (var i in localStorage) { key_list.push(i); } return key_list; };
	window.general_deleteValue = function (mykey) { return localStorage.removeItem(mykey); }
} else {
	alert("sorry your browser can't run this userscript");
	//maybe something with cookies or something or cloudstuff...
}
if (typeof(GM_addStyle) != "undefined") {
	window.general_addStyle = GM_addStyle;
} else {
	window.general_addStyle = function(stylestring){ var my_style_element = document.createElement("style"); my_style_element.setAttribute("type","text/css"); my_style_element.appendChild(document.createTextNode(stylestring)); document.getElementsByTagName("head")[0].appendChild(my_style_element); };
}

				//general_setValue("stack_record","");

function time2range (timeobject) {
	if ((typeof(timeobject)).toLowerCase() == 'object') { timeobject = Math.round(timeobject.getTime() / 1000); }
	var captions = new Object();
	captions.lt60      = general_getValue('caption_lt60',"less a minute");
	captions.minute    = general_getValue('caption_minute',"minute").split(",")[0];
	captions.minutes   = general_getValue('caption_minutes_dative',"minutes").split(",")[0];
	captions.hour      = general_getValue('caption_hour',"hour").split(",")[0];
	captions.hours     = general_getValue('caption_hours_dative',"hours").split(",")[0];
	captions.day       = general_getValue('caption_day',"day").split(",")[0];
	captions.days      = general_getValue('caption_days_dative',"days").split(",")[0];
	captions.week      = general_getValue('caption_week',"week").split(",")[0];
	captions.weeks     = general_getValue('caption_weeks_dative',"weeks").split(",")[0];
	captions.month     = general_getValue('caption_month',"month").split(",")[0];
	captions.months    = general_getValue('caption_months_dative',"months").split(",")[0];
	captions.gty       = general_getValue('caption_gty',"more than a year");
	captions.never     = general_getValue('caption_never',"erm in... never!");
	
	var return_string = "";
	
	timeobject = timeobject - Math.round(new Date().getTime() / 1000);
	
	if (timeobject < 60) {
		return_string = captions.lt60;
	} else if (timeobject < 60 * 60) {
		return_string = parseInt(timeobject / 60);
		if (return_string== 1) { return_string+=" "+captions.minute; } else { return_string+=" "+captions.minutes; }
	} else if (timeobject < 60 * 60 * 30) {
		return_string = parseInt(timeobject / 3600);
		if (return_string== 1) { return_string+=" "+captions.hour; } else { return_string+=" "+captions.hours; }
	} else if (timeobject < 60 * 60 * 24 * 50) {
		return_string = parseInt(timeobject / (60 * 60 * 24));
		if (return_string== 1) { return_string+=" "+captions.day; } else { return_string+=" "+captions.days; }
	} else if (timeobject < 60 * 60 * 30 * 15) {
		return_string = parseInt(timeobject / (60 * 60 * 30.5));
		if (return_string== 1) { return_string+=" "+captions.month; } else { return_string+=" "+captions.months; }
	} else if (timeobject < 60*60*24*365*5) {
		return_string = captions.gty;
	} else {
		return_string = captions.never;
	}
	
	return return_string;
	
}



function shortn_string(s) {
	s = s.replace(/(^|\n|\r)#+\s/g,"");
	s = s.replace(/(^|\s)!\[([^\]]*)\]\([^\)]*\)/g,"$2");
	s = s.replace(/(^|\s)\[([^\]]*)\]\([^\)]*\)/g,"$2");
	s = s.replace(/(\w{5})(\w{5,100})/g,"$1​$2");
	s = s.replace(/(\w{5})(\w{5,100})/g,"$1​$2");
	s = s.replace(/(\w{5})(\w{5,100})/g,"$1​$2");
	s = s.replace(/(\w{5})(\w{5,100})/g,"$1​$2");
	s = s.replace(/(\w{5})(\w{5,100})/g,"$1​$2");
	s = s.slice(0,40);
	
	return s;
}

function do_timed_stuff() {
	var captions = new Object();
	captions.lt60      = general_getValue('caption_lt60',"less a minute");
	captions.minutes   = general_getValue('caption_minutes',"minutes").split(",")[0];
	captions.hours     = general_getValue('caption_hours',"hours").split(",")[0];
	captions.days      = general_getValue('caption_days',"days").split(",")[0];
	captions.weeks     = general_getValue('caption_weeks',"weeks").split(",")[0];
	captions.months    = general_getValue('caption_months',"months").split(",")[0];
	captions.gty       = general_getValue('caption_gty',"more than a year");
	captions.never     = general_getValue('caption_never',"erm in... never!");
	captions.sbtitle   = general_getValue('caption_sbtitle',"planed postings");
	captions.sbcontent = general_getValue('caption_sbcontent',"next action in");
	captions.startstack = general_getValue('caption_begin_stack',"Start stack record");
	captions.closestack = general_getValue('caption_close_stack',"Close stack");
	
	var job_keys = general_listValues();
	var this_timestamp = Math.round(new Date().getTime() / 1000);
	var next_jobtime = 60*60*24*365*5000;
	var max_jobtime = 0;
	var jobs_array = new Array();
	var job_array = null;
	var json_text = null;
	
	for (var i=0; i < job_keys.length; i++) {
		if (job_keys[i].match(/^(\d)_(\d+)/)) {
			var job_type = parseInt(RegExp.$1,10);
			var job_time = parseInt(RegExp.$2,10);
			json_text = general_getValue(job_keys[i],null);
			
			if (job_time < this_timestamp) {
				//this job has to be done!
				var target_url = "/status_messages";
				if (job_type == 2) { target_url = "/reshares"; }
				var auth_token = document.getElementsByName("csrf-token")[0].content;
				
				//thats all data I need...
				
				var myAjax_Request = new XMLHttpRequest();
				myAjax_Request.open("post", target_url, true);			
				myAjax_Request.setRequestHeader("X-CSRF-Token", auth_token);
				myAjax_Request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
				myAjax_Request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				
				general_deleteValue( job_keys[i] );
				
			
				myAjax_Request.send(json_text.replace(/\r?\n/g,"\\r\\n"));
			} else {
				if (job_time < next_jobtime) {
					next_jobtime = job_time;
				}
				if (job_time > max_jobtime) {
					max_jobtime = job_time;
				}
				job_array = new Array(job_time,json_text);
				jobs_array.push(job_array);
			}
		}
	}
	if (next_jobtime - Math.round(new Date().getTime() / 1000) < 600) {
		window.setTimeout(do_timed_stuff,((next_jobtime * 1000) - Math.round(new Date().getTime() + 1000)));
		if (next_jobtime - Math.round(new Date().getTime() / 1000) > 60) {
			window.setTimeout(do_timed_stuff,Math.round(((next_jobtime * 1000) - new Date().getTime())/2));
		}
		
	}
	
	if(document.getElementsByClassName("rightBar").length > 0) {
	
		var next_job_text = time2range(next_jobtime);
	
		if (!document.getElementById("planed_event_display")) {
			var event_display_block = document.createElement("div");
			event_display_block.className = "section";
			event_display_block.id = "planed_event_display";
			var event_display_title = document.createElement("div");
			event_display_title.className = "title";
			var event_display_title_image = document.createElement("img");
			event_display_title_image.setAttribute("src" , "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3QQPDBQnTSmInQAAASdJREFUOMt907tKA2EQBeBvI14CKjGitZVNLATfwl6s9YEU0cJH8VKFPIJGOxUvla0iXmNzVsK6ycCwzD9zzj//7Bz+Wwd7uMBz/DJnHWNsCkf4wjc+8IA7fOInuUNM1oHPMEAfm1jCBlaxgC3cpOYsmD87TqKL+fhyfAEtzMW7qT0uwWtp+QFtNCvsxdB3OoSPwazBQRiHvc4a6Qx2U3cAVxlOK8k6ojJuJm4Fcw0vaalq1a6KoefAPV4b+T1FDcHw2WRNV0UZl09ojyApai5oB3PVwDkmsD1ieHWD3Q7mvFzdr8xhccwzSlvEUzB/q72fW3oVkgnMVMC91O6pDOkkiUfsYBYrWM8G7iQ3wOkoPZRiGuA9u38bYQ3GialOzn28xfuj5PwLm99eAGlmoFAAAAAASUVORK5CYII=");
			event_display_title_image.setAttribute("alt" , "clock");
			event_display_title_image.setAttribute("title" , "settings");
			event_display_title_image.style.cursor = "pointer";
			event_display_title_image.style.marginLeft = "3px";
			event_display_title_image.style.position = "absolute";
			//event_display_title_image.addEventListener("click",function() { caption_setup(); });
			event_display_title_image.addEventListener("click",function() { open_pil8rsetup_dialog(); });
			var event_display_title_headline = document.createElement("h5");		
			event_display_title_headline.className = "title-header";
			event_display_title_headline.appendChild(document.createTextNode(captions.sbtitle + " ("+jobs_array.length+")"));
			event_display_title.appendChild(event_display_title_image);
			event_display_title.appendChild(event_display_title_headline);
			var event_display_content = document.createElement("div");
			event_display_content.className = "content";
			event_display_content.id = "timed_event_caption";
			event_display_content.appendChild(document.createTextNode(captions.sbcontent+" "+next_job_text+" "));
			var event_display_btn_stack = document.createElement("span");
			event_display_btn_stack.id = "timed_stack_toggle";
			if (general_getValue("stack_record","").length <= 2) {
				event_display_btn_stack.appendChild(document.createTextNode(" "+captions.startstack));
			} else {
				event_display_btn_stack.appendChild(document.createTextNode(" "+captions.closestack));
			}
			event_display_btn_stack.addEventListener("click",function(){ toggle_stackrecording(); if (general_getValue("stack_record","").length <= 2) { document.getElementById("timed_stack_toggle").firstChild.data = " "+captions.startstack; } else { document.getElementById("timed_stack_toggle").firstChild.data = " "+captions.closestack; } });
			event_display_content.appendChild(event_display_btn_stack);
			event_display_block.appendChild(event_display_title);
			event_display_block.appendChild(event_display_content);
		
			document.getElementsByClassName("rightBar")[0].insertBefore(event_display_block,document.getElementsByClassName("rightBar")[0].getElementsByClassName("section")[1]);
		}
		
			if (general_getValue("stack_record","").length <= 2) {
				document.getElementById("timed_stack_toggle").firstChild.data = " "+captions.startstack;
			} else {
				document.getElementById("timed_stack_toggle").firstChild.data = " "+captions.closestack;
			}
		document.getElementById("timed_event_caption").firstChild.data = captions.sbcontent+" "+next_job_text;
	
		var event_display_table = document.createElement("table");
		event_display_table.id = "event_display_table";
		var event_display_table_tr = null;
		var event_display_table_td1 = null;
		var event_display_table_td2 = null;
		var job_description = null;
		var splitpoint1 = 0;
		var splitpoint2 = 0;
	
		jobs_array.sort(arraysort_1);
		var reshare_icon = null;
	
		for (var i=0; (i < jobs_array.length) && (i <= 8); i++) {		
			if (jobs_array[i][1].match(/("text":")(.*)/)) {
				splitpoint1 = jobs_array[i][1].search(/"text":"(.*)/)+8;
				splitpoint2 = jobs_array[i][1].search(/\},"asp.*/)-1;		
				job_description = jobs_array[i][1].slice(splitpoint1,splitpoint2).replace(/\\"/g,'"');
			
				job_description = shortn_string(job_description).replace(/\\n\\r/g,' - ');
				job_description = document.createTextNode(job_description);
			} else {
				job_description = '⇄';
				job_description = document.createTextNode(job_description);
				job_description = document.createElement("i");
				job_description.className = "icon-retweet";
				job_description = document.createElement("img");
				job_description.src= "data:image/gif;base64,R0lGODlhEgAMAOcAAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAP4ALAAAAAASAAwAAAhRAP0JHEiwoEEMGARiyMCwYYaCGFKkSOivyYyLGAlGvJjiYcGLBkEa9CeSYMmPM0KmHHlSYEt/Cy9moOhyhkOKFmc0QYlxxkSBTXaOHEq0KMGAADs=";
				job_description.setAttribute ("alt", "reshare");
				job_description.setAttribute ("title", "reshare");
			}
		
			event_display_table_tr = document.createElement("tr");
			event_display_table_tr.id = "job_"+jobs_array[i][0];
			event_display_table_tr.addEventListener("click",function() { edit_job(this); });
			event_display_table_tr.className="editable";
			
						
			event_display_table_td1 = document.createElement("td");
			event_display_table_td2 = document.createElement("td");
			event_display_table_td1.appendChild(document.createTextNode("in "+time2range(jobs_array[i][0])));
			event_display_table_td1.title = new Date(jobs_array[i][0] * 1000).toLocaleString();
			event_display_table_td2.appendChild(job_description);
			event_display_table_tr.appendChild(event_display_table_td1);
			event_display_table_tr.appendChild(event_display_table_td2);
			event_display_table.appendChild(event_display_table_tr);
		}
		if (document.getElementById("event_display_table")) {
			document.getElementById("event_display_table").parentNode.removeChild(document.getElementById("event_display_table"));
		}
		document.getElementById("planed_event_display").appendChild(event_display_table);
	}
	if (next_jobtime - Math.round(new Date().getTime() / 1000) < 99) {
		countdown(next_jobtime*1000);
	}
	
}

function generate_date_select(timetype) {
	var todaynow = new Date();
	var return_element = document.createElement("select");
	var return_option = null;
	if (timetype == "year") {
		for (var i = todaynow.getFullYear(); i < todaynow.getFullYear() + 10; i++) {
			return_option = document.createElement("option");
			return_option.appendChild(document.createTextNode(i));
			return_element.appendChild(return_option);
		}
	} else if (timetype == "month") {
		for (var i = 1; i <= 12; i++) {
			return_option = document.createElement("option");
			return_option.appendChild(document.createTextNode(general_getValue('caption_months'+i,two_digits(i)).split(",")[0]));
			return_option.value = i;
			if (todaynow.getMonth() == i-1) { return_option.selected = "selected"; }
			return_element.appendChild(return_option);			
		}
	} else if (timetype == "day") {
		for (var i = 1; i <= 31; i++) {
			return_option = document.createElement("option");
			return_option.appendChild(document.createTextNode(two_digits(i)));
			if (todaynow.getDate() == i) { return_option.selected = "selected"; }
			return_element.appendChild(return_option);			
		}
	} else if (timetype == "hour") {
		for (var i = 0; i <= 23; i++) {
			return_option = document.createElement("option");
			return_option.appendChild(document.createTextNode(two_digits(i)));
			if (todaynow.getHours() == i) { return_option.selected = "selected"; }
			return_element.appendChild(return_option);			
		}
	} else if ((timetype == "minute") || (timetype == "second")) {
		for (var i = 0; i <= 59; i++) {
			return_option = document.createElement("option");
			return_option.appendChild(document.createTextNode(two_digits(i)));
			if (todaynow.getMinutes() == i) { return_option.selected = "selected"; }
			return_element.appendChild(return_option);			
		}
	} else {
		return_option = document.createElement("option");
		return_option.appendChild(document.createTextNode(timetype+" is no valid timetype"));
		return_element.appendChild(return_option);			
	}
	return return_element;
}

function destroy_stacksavedialog() {
	if (document.getElementById("stack_save")) {
		document.getElementById("stack_save").parentNode.removeChild(document.getElementById("stack_save"));
	}
}

function toggle_stackrecording() {
	if (general_getValue("stack_record","").length <= 2) {
		//recording was off, now set it on...
		general_setValue("stack_record","[\"do nothing\"");
	} else {
		//recording was on, ask how long it should take and generate jobs...
		//after all clear
		//erm... or just generate a dialog...
		var json_string = general_getValue("stack_record","")+"]";
		json_string = json_string.replace(/\n/g,"\\n\\r");
		if (doitlaterdebug) { alert(json_string); }
		var job_array = jsonParse(json_string);
		var stack_save_box = document.createElement("div");		
		stack_save_box.id = "stack_save";
		stack_save_box.className = "postitlater_dialog";
		
		
		
		
		var stack_save_header = document.createElement("h2");
		stack_save_header.appendChild(document.createTextNode(general_getValue("caption_stackhead","You recorded n elements. In what frequence or what range of time should they be posted?").replace(/ n /," "+(job_array.length-1)+" ")));
		var stack_save_from_year = generate_date_select("year");
		stack_save_from_year.id = "stack_save_from_year";
		stack_save_from_year.addEventListener("change",function() { stack_save_recalculate(this); });
		var stack_save_from_month = generate_date_select("month");
		stack_save_from_month.id = "stack_save_from_month";
		stack_save_from_month.addEventListener("change",function() { stack_save_recalculate(this); });
		var stack_save_from_day = generate_date_select("day");
		stack_save_from_day.id = "stack_save_from_day";
		stack_save_from_day.addEventListener("change",function() { stack_save_recalculate(this); });
		var stack_save_from_hour = generate_date_select("hour");
		stack_save_from_hour.id = "stack_save_from_hour";
		stack_save_from_hour.addEventListener("change",function() { stack_save_recalculate(this); });
		var stack_save_from_minute = generate_date_select("minute");
		stack_save_from_minute.id = "stack_save_from_minute";
		stack_save_from_minute.addEventListener("change",function() { stack_save_recalculate(this); });
		
		var stack_save_to_year = generate_date_select("year");
		stack_save_to_year.id = "stack_save_to_year";
		stack_save_to_year.addEventListener("change",function() { stack_save_recalculate(this); });
		var stack_save_to_month = generate_date_select("month");
		stack_save_to_month.id = "stack_save_to_month";
		stack_save_to_month.addEventListener("change",function() { stack_save_recalculate(this); });
		var stack_save_to_day = generate_date_select("day");
		stack_save_to_day.id = "stack_save_to_day";
		stack_save_to_day.addEventListener("change",function() { stack_save_recalculate(this); });
		var stack_save_to_hour = generate_date_select("hour");
		stack_save_to_hour.id = "stack_save_to_hour";
		stack_save_to_hour.addEventListener("change",function() { stack_save_recalculate(this); });
		var stack_save_to_minute = generate_date_select("minute");
		stack_save_to_minute.id = "stack_save_to_minute";
		stack_save_to_minute.addEventListener("change",function() { stack_save_recalculate(this); });
		var stack_save_to_second = document.createElement("input");
		stack_save_to_second.id = "stack_save_to_second";
		stack_save_to_second.type = "hidden";
		stack_save_to_second.value = "59";
		
		var stack_save_range_input = document.createElement("input");
		stack_save_range_input.id = "stack_save_range_input";
		stack_save_range_input.style.display = "inline";
		stack_save_range_input.style.width = "3em";
		stack_save_range_input.value = "1";
		stack_save_range_input.addEventListener("change",function() { stack_save_recalculate(this); });
		var stack_save_range_select = document.createElement("select");
		stack_save_range_select.id = "stack_save_range_select";
		stack_save_range_select.addEventListener("change",function() { stack_save_recalculate(this); });
		var stack_save_range_option = null;
		stack_save_range_option = document.createElement("option");
		stack_save_range_option.appendChild(document.createTextNode(general_getValue('caption_seconds','seconds').split(",")[0]));
		stack_save_range_option.value = "1";
		stack_save_range_option.id = "stack_save_range_select_seconds";
		stack_save_range_select.appendChild(stack_save_range_option);
		stack_save_range_option = document.createElement("option");
		stack_save_range_option.appendChild(document.createTextNode(general_getValue('caption_minutes','minutes').split(",")[0]));
		stack_save_range_option.value = "60";
		stack_save_range_option.id = "stack_save_range_select_minutes";
		stack_save_range_select.appendChild(stack_save_range_option);
		stack_save_range_option = document.createElement("option");
		stack_save_range_option.appendChild(document.createTextNode(general_getValue('caption_hours','hours').split(",")[0]));
		stack_save_range_option.value = "3600";
		stack_save_range_option.id = "stack_save_range_select_hours";
		stack_save_range_select.appendChild(stack_save_range_option);
		stack_save_range_option = document.createElement("option");
		stack_save_range_option.appendChild(document.createTextNode(general_getValue('caption_days','days').split(",")[0]));
		stack_save_range_option.value = "86400";
		stack_save_range_option.id = "stack_save_range_select_days";
		stack_save_range_select.appendChild(stack_save_range_option);
		stack_save_range_option = document.createElement("option");
		stack_save_range_option.appendChild(document.createTextNode(general_getValue('caption_weeks','weeks').split(",")[0]));
		stack_save_range_option.value = "6040800";
		stack_save_range_option.id = "stack_save_range_select_weeks";
		stack_save_range_select.appendChild(stack_save_range_option);
		stack_save_range_option = document.createElement("option");
		stack_save_range_option.appendChild(document.createTextNode(general_getValue('caption_months','months').split(",")[0]));
		stack_save_range_option.value = "2629744";
		stack_save_range_option.id = "stack_save_range_select_months";
		stack_save_range_select.appendChild(stack_save_range_option);
		stack_save_range_option = document.createElement("option");
		stack_save_range_option.appendChild(document.createTextNode(general_getValue('caption_years','years').split(",")[0]));
		stack_save_range_option.value = "31556926";
		stack_save_range_option.id = "stack_save_range_select_years";
		stack_save_range_select.appendChild(stack_save_range_option);
		
		var stack_save_btn_save = document.createElement("input");
		stack_save_btn_save.id = "stack_save_btn_save";
		stack_save_btn_save.type = "button";
		stack_save_btn_save.className = "button";
		stack_save_btn_save.value = general_getValue("caption_savestack","Save the stack");
		stack_save_btn_save.addEventListener("click",function(){
			var json_string = general_getValue("stack_record","")+"]";
			json_string = json_string.replace(/\n/g,"\\n\\r");
			var job_array = jsonParse(json_string);
			var start_date = new Date(parseInt(document.getElementById("stack_save_from_year").value,10), parseInt(document.getElementById("stack_save_from_month").value,10)-1, parseInt(document.getElementById("stack_save_from_day").value,10), parseInt(document.getElementById("stack_save_from_hour").value,10), parseInt(document.getElementById("stack_save_from_minute").value,10), 0);
			var end_date = new Date(parseInt(document.getElementById("stack_save_to_year").value,10), parseInt(document.getElementById("stack_save_to_month").value,10)-1, parseInt(document.getElementById("stack_save_to_day").value,10), parseInt(document.getElementById("stack_save_to_hour").value,10), parseInt(document.getElementById("stack_save_to_minute").value,10), parseInt(document.getElementById("stack_save_to_second").value,10));
			var total_time_range = end_date.getTime() - start_date.getTime();
			if (total_time_range > 0) {
				var target_time = null;
				var single_time_range = (total_time_range / (job_array.length-2));
				var job_type = 0;
				var i2 = 0;
				for (var i = 0; i < job_array.length; i++) {
					if ((typeof(job_array[i])).toLowerCase() == "string") {
						//do nothing this is propably "do nothing"
					} else {
						//this is a real job!
						target_time = new Date(Math.round(start_date.getTime() + single_time_range * i2));
						if (job_array[i].status_message) {
							//this is a status-message
							job_type = 1;
						} else if (job_array[i].root_guid) {
							//this is a reshare...
							job_type = 2;
						}
						if (job_type) {
							add_job(jsonStringify(job_array[i]),target_time,job_type);
							job_type = 0;
						}
						i2++;
					}
				}
				
				general_setValue("stack_record","");
				destroy_stacksavedialog();
				do_timed_stuff();
				
			} else {
				alert("Error: End-Time is before Start-Time...");
			}
			
		});
		var stack_save_btn_reset = document.createElement("input");
		stack_save_btn_reset.id = "stack_save_btn_reset";
		stack_save_btn_reset.type = "button";
		stack_save_btn_reset.className = "button";
		stack_save_btn_reset.value = general_getValue("caption_dropstack","Drop the stack");
		stack_save_btn_reset.addEventListener("click",function(){ if (confirm(general_getValue("caption_dropstack_confirm","Are you sure you want to discard your current stack?"))) { general_setValue("stack_record",""); destroy_stacksavedialog(); do_timed_stuff(); } });
		var stack_save_btn_cancel = document.createElement("input");
		stack_save_btn_cancel.id = "stack_save_btn_cancel";
		stack_save_btn_cancel.type = "button";
		stack_save_btn_cancel.className = "button";
		stack_save_btn_cancel.value = general_getValue("caption_continuestack","Keep collecting");
		stack_save_btn_cancel.addEventListener("click",function(){ destroy_stacksavedialog(); });
		var stack_save_btn_container = document.createElement("div");
		stack_save_btn_container.className = "button_container";
		stack_save_btn_container.appendChild(stack_save_btn_save);
		stack_save_btn_container.appendChild(stack_save_btn_reset);
		stack_save_btn_container.appendChild(stack_save_btn_cancel);
		
		
		stack_save_box.appendChild(stack_save_header);
		stack_save_box.appendChild(stack_save_from_year);
		stack_save_box.appendChild(document.createTextNode("-"));
		stack_save_box.appendChild(stack_save_from_month);
		stack_save_box.appendChild(document.createTextNode("-"));
		stack_save_box.appendChild(stack_save_from_day);
		stack_save_box.appendChild(document.createTextNode(" "));
		stack_save_box.appendChild(stack_save_from_hour);
		stack_save_box.appendChild(document.createTextNode(":"));
		stack_save_box.appendChild(stack_save_from_minute);
		stack_save_box.appendChild(document.createTextNode(" "+general_getValue("caption_to1","to")+" "));
		stack_save_box.appendChild(stack_save_to_year);
		stack_save_box.appendChild(document.createTextNode("-"));
		stack_save_box.appendChild(stack_save_to_month);
		stack_save_box.appendChild(document.createTextNode("-"));
		stack_save_box.appendChild(stack_save_to_day);
		stack_save_box.appendChild(document.createTextNode(" "));
		stack_save_box.appendChild(stack_save_to_hour);
		stack_save_box.appendChild(document.createTextNode(":"));
		stack_save_box.appendChild(stack_save_to_minute);
		stack_save_box.appendChild(stack_save_to_second);
		
		stack_save_box.appendChild(document.createElement("br"));
		stack_save_box.appendChild(stack_save_range_input);
		stack_save_box.appendChild(stack_save_range_select);
		stack_save_box.appendChild(stack_save_btn_container);
		
		document.getElementsByTagName("body")[0].appendChild(stack_save_box);
	
		//general_setValue("stack_record","");
	}
	
}

function get_aspectid_by_name(a_name) {
	if (typeof(pil8_aspectlist) == "undefined") {
		pil8_aspectlist = new Object();
	}
	if (pil8_aspectlist[a_name]) {
		return pil8_aspectlist[a_name];
	}
	
	var aspect_request = new XMLHttpRequest();
	aspect_request.open("get", "/aspects", true);
	aspect_request.onreadystatechange = function(a_name) {
		if(aspect_request.readyState == 4) {
			if(aspect_request.status == 200) {
				var my_Exp = new RegExp('<li\sdata-aspect_id="(\d+)"[^>]+>\s*'+a_name+'\s*<\/li>');
				if (aspect_request.responseText.match(my_Exp)) {
					alert(RegExp.$1);
				} else {
					alert(a_name);
				}
			}
		}
	}
		
	aspect_request.send(null);
	
	return false;
}

function stack_save_recalculate(origin_element) {
	var start_date = new Date(parseInt(document.getElementById("stack_save_from_year").value,10), parseInt(document.getElementById("stack_save_from_month").value,10)-1, parseInt(document.getElementById("stack_save_from_day").value,10), parseInt(document.getElementById("stack_save_from_hour").value,10), parseInt(document.getElementById("stack_save_from_minute").value,10), 0);
	var end_date = new Date(parseInt(document.getElementById("stack_save_to_year").value,10), parseInt(document.getElementById("stack_save_to_month").value,10)-1, parseInt(document.getElementById("stack_save_to_day").value,10), parseInt(document.getElementById("stack_save_to_hour").value,10), parseInt(document.getElementById("stack_save_to_minute").value,10), parseInt(document.getElementById("stack_save_to_second").value,10));
	var time_range = Math.round(parseInt(document.getElementById("stack_save_range_input").value,10) * parseInt(document.getElementById("stack_save_range_select").value,10));
	var numberofelements = jsonParse((general_getValue("stack_record","")+"]").replace(/\n/g,"\\n\\r")).length-1;
	
	if (origin_element.id.match(/(_from_|_to_)/)) {
		//okay at first let's calculate this to a range of time…
		time_range = Math.round((end_date.getTime() - start_date.getTime())/(1000*(numberofelements-1)));
		if ((time_range / (60 * 60 * 24 * 365.242198781) > 5)) {
			document.getElementById("stack_save_range_input").value = Math.round(time_range/(60*60*24*365.242198781));
			document.getElementById("stack_save_range_select").selectedIndex = 6;
		} else	if ((time_range / (60 * 60 * 24 * 30.4368498984) > 5)) {
			document.getElementById("stack_save_range_input").value = Math.round(time_range/(60*60*24*30.4368498984));
			document.getElementById("stack_save_range_select").selectedIndex = 5;
		} else	if ((time_range / (60 * 60 * 24 * 7) > 5)) {
			document.getElementById("stack_save_range_input").value = Math.round(time_range/(60*60 * 24 * 7));
			document.getElementById("stack_save_range_select").selectedIndex = 4;
		} else	if ((time_range / (60 * 60 * 24) > 5)) {
			document.getElementById("stack_save_range_input").value = Math.round(time_range/(60*60*24));
			document.getElementById("stack_save_range_select").selectedIndex = 3;
		} else	if ((time_range / (60 * 60) > 5)) {
			document.getElementById("stack_save_range_input").value = Math.round(time_range/(60*60));
			document.getElementById("stack_save_range_select").selectedIndex = 2;
		} else	if ((time_range / (60) > 5)) {
			document.getElementById("stack_save_range_input").value = Math.round(time_range/(60));
			document.getElementById("stack_save_range_select").selectedIndex = 1;
		} else {
			document.getElementById("stack_save_range_input").value = time_range;
			document.getElementById("stack_save_range_select").selectedIndex = 0;
		}
	} else {
		//manipulate "to"
		end_date = new Date(start_date.getTime() + time_range*1000*(numberofelements-1));
		document.getElementById("stack_save_to_year").value = end_date.getFullYear();
		document.getElementById("stack_save_to_month").value = parseInt(end_date.getMonth(),10)+1;
		document.getElementById("stack_save_to_day").value = two_digits(end_date.getDate());
		document.getElementById("stack_save_to_hour").value = two_digits(end_date.getHours());
		document.getElementById("stack_save_to_minute").value = two_digits(end_date.getMinutes());
		document.getElementById("stack_save_to_second").value = end_date.getSeconds();
	}
}

function countdown(targettime) {
	if (!targettime) {
		if(document.getElementById("post_later_countdown")) {
			targettime = parseInt(document.getElementById("post_later_countdown").title,10);
		} else {
			targettime = 99;
		}
	}
	if((!document.getElementById("post_later_countdown")) && (document.getElementById("planed_event_display"))) {
		var my_countdown = document.createElement("div");
		my_countdown.id="post_later_countdown";
		my_countdown.title = targettime;
		my_countdown.style.position = "fixed";
		my_countdown.style.top = "100px";
		my_countdown.style.right = "100px";
		my_countdown.style.backgroundColor = "rgba(0,255,0,0.8)";
		my_countdown.style.fontSize = "3em";
		my_countdown.style.padding = "1em";
		my_countdown.style.borderRadius = "5em";
		
		my_countdown.appendChild(document.createTextNode(" "));
		document.getElementById("planed_event_display").appendChild(my_countdown);		
	} else {
		var my_countdown = document.getElementById("post_later_countdown");
	}
	var time_dif = targettime - new Date().getTime();
	if (time_dif > 0) {
		if (time_dif > 10000) {
			my_countdown.firstChild.data = Math.round(time_dif / 1000);
			window.setTimeout(countdown,1000);
		} else {
			my_countdown.firstChild.data = (Math.round(time_dif / 100)/10.0);
			window.setTimeout(countdown,90);			
		}
	} else {
		document.getElementById("planed_event_display").removeChild(my_countdown);	
	}
}

function destroy_pil8rsetup_dialog() {
	if (document.getElementById("pil8r_setup")) {
		document.getElementById("pil8r_setup").parentNode.removeChild(document.getElementById("pil8r_setup"));
	}
}

function switch_dialog_tab(tab_name) {
	
	var my_tab = document.getElementById("tab_"+tab_name);
	var my_setup = document.getElementById("setup_"+tab_name);
	var my_tabgroup = my_tab.parentNode;
	var my_setupgroup = my_setup.parentNode;
	for (var i = 0; i < my_tabgroup.childNodes.length; i++) {
		my_tabgroup.childNodes[i].className = "inactive_tab";
	}
	
	for (var i = 0; i < my_setupgroup.childNodes.length; i++) {
		if (my_setupgroup.childNodes[i].nodeName.toLowerCase() == "div") {
			
			if (!my_setupgroup.childNodes[i].classList.contains("button_container")) {
				my_setupgroup.childNodes[i].className = "inactive_tab";
			}
		}
	}
	my_tab.className="active_tab";
	my_setup.className="active_tab";
}

function open_pil8rsetup_dialog() {
	destroy_pil8rsetup_dialog();
	
	var pil8r_setup = document.createElement("div");
	pil8r_setup.id = "pil8r_setup";
	pil8r_setup.className = "postitlater_dialog";
	pil8r_setup.style.maxHeight = "20em";
	pil8r_setup.style.overflow = "scroll";
	
	var pil8r_setup_tabs = document.createElement("ul");
	pil8r_setup_tabs.className = "tabgroup";
	
	var pil8r_setup_caption_button = document.createElement("li");
	pil8r_setup_caption_button.appendChild(document.createTextNode(general_getValue('caption_captions',"Captions")));
	pil8r_setup_caption_button.id = "tab_captions";
	pil8r_setup_caption_button.className = "inactive_tab";
	pil8r_setup_caption_button.addEventListener("click",function() { switch_dialog_tab(this.id.slice(4)); } );
	var pil8r_setup_style_button = document.createElement("li");
	pil8r_setup_style_button.appendChild(document.createTextNode("Styles"));
	pil8r_setup_style_button.id = "tab_styles";
	pil8r_setup_style_button.addEventListener("click",function() { switch_dialog_tab(this.id.slice(4)); } );
	
	pil8r_setup_tabs.appendChild(pil8r_setup_caption_button);
	pil8r_setup_tabs.appendChild(pil8r_setup_style_button);
		
	var caption_tab = create_pil8rcaption_tab();
	var style_tab = create_pil8style_tab();
	
	var close_button = document.createElement("input");
	close_button.type = "button";
	close_button.className = "button";
	close_button.value = general_getValue('caption_close',"Close");
	close_button.addEventListener("click",function(){ destroy_pil8rsetup_dialog(); });
	
	
	
	
	
	pil8r_setup.appendChild(pil8r_setup_tabs);
	pil8r_setup.appendChild(caption_tab);
	pil8r_setup.appendChild(style_tab);
	pil8r_setup.appendChild(close_button);
	document.getElementsByTagName("body")[0].appendChild(pil8r_setup);
}

function create_pil8style_tab() {
	var style_tab = document.createElement("div");
	style_tab.id = "setup_styles";
	style_tab.className = "inactive_tab";
	
	var style_table = document.createElement("table");
	
	
	
	
	var style_tr = document.createElement("tr");
	var style_td1 = document.createElement("td");
	var style_td2 = document.createElement("td");
	style_td1.appendChild(document.createTextNode(general_getValue('caption_style_background_description',"Background color for dialogs like this one")));
	var style_input = document.createElement("input");
	style_input.type = "color";
	style_input.style.height = "1.5em";
	style_input.value = general_getValue('style_dialog_background_color',"#00aa00");
	style_input.name = "style_dialog_background_color";
	style_input.id = "style_dialog_background_color";
	style_input.addEventListener("change",function() { preview_dialog_style(); });
	style_td2.appendChild(style_input);
	style_tr.appendChild(style_td1);
	style_tr.appendChild(style_td2);
	style_table.appendChild(style_tr);

	
	style_tr = document.createElement("tr");
	style_td1 = document.createElement("td");
	style_td2 = document.createElement("td");
	style_td1.appendChild(document.createTextNode(general_getValue('caption_style_backgroundtransparency_description',"Background transparency for dialogs like this one")));
	style_input = document.createElement("input");
	style_input.type = "range";	
	style_input.min = "0";	
	style_input.max = "1";	
	style_input.step = "0.05";	
	style_input.value = parseFloat(1 - general_getValue('style_dialog_background_opacity',"0.8"));
	style_input.name = "style_dialog_background_opacity";
	style_input.id = "style_dialog_background_opacity";
	style_input.addEventListener("change",function() { preview_dialog_style(); });
	style_td2.appendChild(style_input);
	style_tr.appendChild(style_td1);
	style_tr.appendChild(style_td2);
	style_table.appendChild(style_tr);
	
	
	
	style_tr = document.createElement("tr");
	style_td1 = document.createElement("td");
	style_td2 = document.createElement("td");
	style_td1.appendChild(document.createTextNode(general_getValue('caption_style_border_description',"Border for dialogs like this one?")));
	style_input = document.createElement("input");
	style_input.type = "checkbox";
	if (parseInt(general_getValue('style_dialog_border',"0"),10)) { style_input.checked = "checked"; }
	style_input.name = "style_dialog_border";
	style_input.id = "style_dialog_border";
	style_input.addEventListener("change",function() { preview_dialog_style(); });
	style_td2.appendChild(style_input);
	style_tr.appendChild(style_td1);
	style_tr.appendChild(style_td2);
	style_table.appendChild(style_tr);
	
	

	
	
	style_tr = document.createElement("tr");
	style_td1 = document.createElement("td");
	style_td2 = document.createElement("td");
	style_td1.appendChild(document.createTextNode(general_getValue('caption_style_borderradius_description',"Border radius for dialogs like this one")));
	style_input = document.createElement("input");
	style_input.type = "range";	
	style_input.min = "0";	
	style_input.max = "50";	
	style_input.step = "2";	
	style_input.value = general_getValue('style_dialog_border_radius',"20");
	style_input.name = "style_dialog_border_radius";
	style_input.id = "style_dialog_border_radius";
	style_input.addEventListener("change",function() { preview_dialog_style(); });
	style_td2.appendChild(style_input);
	style_tr.appendChild(style_td1);
	style_tr.appendChild(style_td2);
	style_table.appendChild(style_tr);
	
	var style_tr = document.createElement("tr");
	var style_td1 = document.createElement("td");
	var style_td2 = document.createElement("td");
	style_td1.appendChild(document.createTextNode(general_getValue('caption_style_textcolor_description',"Text color for dialogs like this one")));
	var style_input = document.createElement("input");
	style_input.type = "color";
	style_input.style.height = "1.5em";
	style_input.value = general_getValue('style_dialog_text_color',"#000000");
	style_input.name = "style_dialog_text_color";
	style_input.id = "style_dialog_text_color";
	style_input.addEventListener("change",function() { preview_dialog_style(); });
	style_td2.appendChild(style_input);
	style_tr.appendChild(style_td1);
	style_tr.appendChild(style_td2);
	style_table.appendChild(style_tr);
	
	
		
	
	
	 
	
	var save_button = document.createElement("input");
	save_button.type = "button";
	save_button.className = "button";
	save_button.value = general_getValue('caption_save',"Save");
	save_button.addEventListener("click",function() { preview_dialog_style(true);  flash_notice("saved"); } );
	
	style_tab.appendChild(style_table);
	
	
	var button_container = document.createElement("div");
	button_container.className = "button_container";
	
	
	button_container.appendChild(save_button);
	style_tab.appendChild(button_container);
	
	return style_tab;
}


function preview_dialog_style(and_save) {
	var target_dialog = document.getElementById("pil8r_setup");
	var temp_style_bgc = document.getElementById("style_dialog_background_color").value;
	var temp_style_bgo = parseFloat(1 - document.getElementById("style_dialog_background_opacity").value);
	var temp_style_bg = hex2rgba(temp_style_bgc,temp_style_bgo);
	var temp_style_bd = document.getElementById("style_dialog_border").checked;
	var temp_style_bdr = parseInt(document.getElementById("style_dialog_border_radius").value,10);
	var temp_style_fgc = document.getElementById("style_dialog_text_color").value;
	target_dialog.style.background = temp_style_bg;
	if(temp_style_bd) { target_dialog.style.border = "solid"; } else { target_dialog.style.border = "none"; }
	target_dialog.style.borderRadius = temp_style_bdr+"px";
	target_dialog.style.color = temp_style_fgc;
	if (and_save) {
		general_setValue("style_dialog_background_color",temp_style_bgc);
		general_setValue("style_dialog_background_opacity",temp_style_bgo.toString());
		general_setValue("style_dialog_border",(temp_style_bd?"1":"0"));
		general_setValue("style_dialog_border_radius",temp_style_bdr);
		general_setValue("style_dialog_text_color",temp_style_fgc);
	}
}

function create_pil8rcaption_tab() {
	var caption_tab = document.createElement("div");
	caption_tab.id = "setup_captions";
	caption_tab.className = "inactive_tab";
	
	var caption_table = document.createElement("table");
	var caption_tr = null;
	var caption_td1 = null;
	var caption_td2 = null;
	var caption_input = null;
	
	var all_gm_values = general_listValues();
	
	for (var i = 0; i < all_gm_values.length; i++) {
		if (all_gm_values[i].match(/^caption_(.*)/)) {
			caption_tr = document.createElement("tr");
			caption_td1 = document.createElement("td");
			caption_td2 = document.createElement("td");
			caption_td1.appendChild(document.createTextNode(RegExp.$1.replace(/_/g," ")));
			caption_input = document.createElement("input");
			caption_input.type = "text";
			caption_input.value = general_getValue(all_gm_values[i],"");
			caption_input.name = all_gm_values[i];
			caption_input.id = all_gm_values[i];
			caption_td2.appendChild(caption_input);
			caption_tr.appendChild(caption_td1);
			caption_tr.appendChild(caption_td2);
			caption_table.appendChild(caption_tr);
		}
	}
	
	caption_tab.appendChild(caption_table);
	
	var reset_button = document.createElement("input");
	reset_button.type = "button";
	reset_button.className = "button";
	reset_button.value = general_getValue('caption_caption_reset',"Reset captions");
	reset_button.addEventListener("click", function() { caption_reset(); open_pil8rsetup_dialog(); });
	
	var save_button = document.createElement("input");
	save_button.type = "button";
	save_button.className = "button";
	save_button.value = general_getValue('caption_save',"Save");
	save_button.addEventListener("click",function() {
			var container_dings = document.getElementById("setup_captions").getElementsByTagName("table")[0];
			for (var i = 0; i < container_dings.getElementsByTagName("input").length; i++) {
				if (container_dings.getElementsByTagName("input")[i].type == "text") {
					general_setValue(container_dings.getElementsByTagName("input")[i].name,container_dings.getElementsByTagName("input")[i].value);
					//alert("caption_"+container_dings.getElementsByTagName("input")[0].name+"\n"+container_dings.getElementsByTagName("input")[0].value);
				}
			}
			flash_notice("saved");
	} );
	
	var button_container = document.createElement("div");
	button_container.className = "button_container";
		
	button_container.appendChild(reset_button);
	button_container.appendChild(save_button);
	caption_tab.appendChild(button_container);
	
	return caption_tab;
}


function remove_jobeditor() {
	if (document.getElementById("job_edit_box")) {
		document.getElementById("job_edit_box").parentNode.removeChild(document.getElementById("job_edit_box"));
	}
	global_job_edit_text1 = null;
	global_job_edit_text3 = null;
	global_job_edit_time = null;
	global_job_edit_type = null;
}

function edit_job(tr_element) {
	remove_jobeditor();
		
	captions = new Object();
	
	captions.monthnames = new Array();
	captions.monthnames[1]      = general_getValue('caption_months1','January').split(",");
	captions.monthnames[2]      = general_getValue('caption_months2','February').split(",");
	captions.monthnames[3]      = general_getValue('caption_months3','March').split(",");
	captions.monthnames[4]      = general_getValue('caption_months4','April').split(",");
	captions.monthnames[5]      = general_getValue('caption_months5','May').split(",");
	captions.monthnames[6]      = general_getValue('caption_months6','June').split(",");
	captions.monthnames[7]      = general_getValue('caption_months7','July').split(",");
	captions.monthnames[8]      = general_getValue('caption_months8','August').split(",");
	captions.monthnames[9]      = general_getValue('caption_months9','September').split(",");
	captions.monthnames[10]      = general_getValue('caption_months10','October').split(",");
	captions.monthnames[11]      = general_getValue('caption_months11','November').split(",");
	captions.monthnames[12]      = general_getValue('caption_months12','December').split(",");
	
	
	
	
	//extract job-id…
	var job_id = tr_element.id.match(/\d+/)[0];
	var job_date = new Date(Math.round(job_id * 1000));
	var i = 0;
	var job_content = false;
	var job_type = null;
	while(!job_content && i < 12) {
		job_type = i;
		job_content = general_getValue(i+"_"+job_id,false);
		i++;
	}
	
	var job_edit_content = false;
	if (job_content.match(/\{"root_guid":"(.*)/)) {
		//this is a reshare... do not edit content... just time.
		global_job_edit_text1 = job_content;
		global_job_edit_text3 = "";
	} else {
		//okay, gotta split this into three parts....
		//find the position of the actual content...
		var splitpoint1 = job_content.search(/"text":"(.*)/)+8;
		var splitpoint2 = job_content.search(/\},"asp.*/)-1;
		global_job_edit_text1 = job_content.slice(0,splitpoint1);
		job_edit_content = job_content.slice(splitpoint1,splitpoint2).replace(/\\"/g,'"').replace(/\\n\\r/g,"\n");
		global_job_edit_text3 = job_content.slice(splitpoint2);
	}
	
	//generate job-editor...
	var job_edit_box = document.createElement("div");
	job_edit_box.id = "job_edit_box";
	job_edit_box.className = "postitlater_dialog";
	
	//okay it's way easier to write this to global vars instead writing it to DOM (what I did first) or handling this around through functions...
	global_job_edit_time = job_id;
	global_job_edit_type = job_type;
	
	var job_edit_date_option = null;
	var job_edit_date_y = document.createElement("select");
	job_edit_date_y.id = "job_edit_date_y";
	for (var i = 0; i < 10; i++) {
		job_edit_date_option = document.createElement("option");
		job_edit_date_option.appendChild(document.createTextNode(Math.round(new Date().getFullYear() +i)));
		if (i == Math.round(job_date.getFullYear() +1)) { job_edit_date_option.setAttribute("selected","selected"); }
		job_edit_date_y.appendChild(job_edit_date_option);
	}
	job_edit_box.appendChild(job_edit_date_y);
	
	var job_edit_date_m = document.createElement("select");	
	job_edit_date_m.id = "job_edit_date_m";
	for (var i = 1; i <= 12; i++) {
		job_edit_date_option = document.createElement("option");
		job_edit_date_option.appendChild(document.createTextNode(captions.monthnames[i]));
		if (i == Math.round(job_date.getMonth() +1)) { job_edit_date_option.setAttribute("selected","selected"); }
		job_edit_date_option.setAttribute("value",i);
		job_edit_date_m.appendChild(job_edit_date_option);
	}
	job_edit_box.appendChild(job_edit_date_m);
	
	var job_edit_date_d = document.createElement("select");
	job_edit_date_d.id = "job_edit_date_d";
	for (var i = 1; i <= 31; i++) {
		job_edit_date_option = document.createElement("option");
		job_edit_date_option.appendChild(document.createTextNode(i));
		if (i == Math.round(job_date.getDate() +0)) { job_edit_date_option.setAttribute("selected","selected"); }
		job_edit_date_option.setAttribute("value",i);
		job_edit_date_d.appendChild(job_edit_date_option);
	}
	job_edit_box.appendChild(job_edit_date_d);
	job_edit_box.appendChild(document.createTextNode(" - "));
	
	var job_edit_date_h = document.createElement("select");
	job_edit_date_h.id = "job_edit_date_h";
	for (var i = 0; i <= 23; i++) {
		job_edit_date_option = document.createElement("option");
		job_edit_date_option.appendChild(document.createTextNode(i));
		if (i == Math.round(job_date.getHours() +0)) { job_edit_date_option.setAttribute("selected","selected"); }
		job_edit_date_h.appendChild(job_edit_date_option);
	}
	job_edit_box.appendChild(job_edit_date_h);
	job_edit_box.appendChild(document.createTextNode(":"));
	
	var job_edit_date_min = document.createElement("select");
	job_edit_date_min.id = "job_edit_date_min";
	for (var i = 0; i <= 59; i++) {
		job_edit_date_option = document.createElement("option");
		job_edit_date_option.appendChild(document.createTextNode(i));
		if (i == Math.round(job_date.getMinutes() +0)) { job_edit_date_option.setAttribute("selected","selected"); }
		job_edit_date_min.appendChild(job_edit_date_option);
	}
	job_edit_box.appendChild(job_edit_date_min);
	
	
	if (job_edit_content) {
		var job_edit_textarea = document.createElement("textarea");
		job_edit_textarea.id = "job_edit_textarea";
		job_edit_textarea.value = job_edit_content;
		job_edit_box.appendChild(job_edit_textarea);
	}
	
	var job_edit_btn_save = document.createElement("input");
	job_edit_btn_save.type = "button";
	job_edit_btn_save.className = "button";
	job_edit_btn_save.value = general_getValue('caption_save',"Save");
	job_edit_btn_save.addEventListener("click",function() { close_edited_job("save"); });
	
	var job_edit_btn_delete = document.createElement("input");
	job_edit_btn_delete.type = "button";
	job_edit_btn_delete.className = "button";
	job_edit_btn_delete.value = general_getValue('caption_delete',"Delete");
	job_edit_btn_delete.addEventListener("click",function() { close_edited_job("delete"); });
	
	var job_edit_btn_cancel = document.createElement("input");
	job_edit_btn_cancel.type = "button";
	job_edit_btn_cancel.className = "button";
	job_edit_btn_cancel.value = general_getValue('caption_cancel',"Cancel");
	job_edit_btn_cancel.addEventListener("click",function() { close_edited_job("cancel"); });
	
	var job_edit_btn_box = document.createElement("div");
	job_edit_btn_box.className = "button_container";
	
	job_edit_box.appendChild(job_edit_btn_box);
	job_edit_btn_box.appendChild(job_edit_btn_save);
	job_edit_btn_box.appendChild(job_edit_btn_delete);
	job_edit_btn_box.appendChild(job_edit_btn_cancel);
	
	document.getElementsByTagName("body")[0].appendChild(job_edit_box);
	
	
	
}

function close_edited_job(c_type) {
	
	//if the command-type says I should save or delete... the old job must be deleted (because if time has changed the key changes...)
	if ((c_type == "save") || (c_type == "delete")) {
		var old_job_id = global_job_edit_type+'_'+global_job_edit_time;
		
		general_deleteValue(old_job_id);
		if ((c_type == "save")) {
			var new_job_time = new Date(Math.round(global_job_edit_time * 1000));
			new_job_time.setFullYear(parseInt(document.getElementById('job_edit_date_y').value,10));
			new_job_time.setMonth(parseInt(document.getElementById('job_edit_date_m').value,10)-1);
			new_job_time.setDate(parseInt(document.getElementById('job_edit_date_d').value,10));
			new_job_time.setHours(parseInt(document.getElementById('job_edit_date_h').value,10));
			new_job_time.setMinutes(parseInt(document.getElementById('job_edit_date_min').value,10));
			
			var new_value = global_job_edit_text1;
			if (document.getElementById("job_edit_textarea")) {
				new_value += document.getElementById("job_edit_textarea").value.replace(/"/g,'\\"');
			}
			new_value += global_job_edit_text3;
			
			var new_job_id = global_job_edit_type+"_"+Math.round(new_job_time.getTime() / 1000);
			
			general_setValue(new_job_id,new_value);
		}
	}
	
	remove_jobeditor();
	do_timed_stuff();
}

function arraysort_1(e1,e2) {
	//sorts an array of arrays by the first element of the subarrays...
	return Math.round(e1[0] - e2[0]);
}

function two_digits(i) {
	if (i < 10) {
		return "0"+i;
	} else {
		return i;
	}
}

function example_timeinput(time_units,dotws,months) {
	var random_type = Math.random();
	if (random_type <= 0.125) {
		//lets generate a standard-datetime: "YYYY-MM-DD HH:MM:SS"
		var random_Date = new Date(new Date().getTime() + Math.round(Math.random() * 100000.1));
		return random_Date.getFullYear()+"-"+two_digits(Math.round(random_Date.getMonth() + 1))+"-"+two_digits(random_Date.getDate())+" "+two_digits(random_Date.getHours())+":"+two_digits(random_Date.getMinutes())+":"+two_digits(random_Date.getSeconds());
	} else if (random_type <= 0.25) {
		//generate a non-standard-datetime: "DD.MM.YYYY HH:MM"
		var random_Date = new Date(new Date().getTime() + Math.round(Math.random() * 100000.1));
		return two_digits(random_Date.getDate())+"."+two_digits(Math.round(random_Date.getMonth() + 1))+"."+random_Date.getFullYear()+" "+two_digits(random_Date.getHours())+":"+two_digits(random_Date.getMinutes());		
	} else if (random_type <= 0.375) {
		//generate a time: "HH:MM"
		var random_Date = new Date(new Date().getTime() + Math.round(Math.random() * 100000.1));
		return two_digits(random_Date.getHours())+":"+two_digits(random_Date.getMinutes());
	} else if (random_type <= 0.5) {
		//geretare a standard-date: "YYYY-MM-DD"
		var random_Date = new Date(new Date().getTime() + Math.round(Math.random() * 100000.1));
		return random_Date.getFullYear()+"-"+two_digits(Math.round(random_Date.getMonth() + 1))+"-"+two_digits(random_Date.getDate());
	} else if (random_type <= 0.625) {
		//generate a non-standard-date: "DD.MM.YYYY"
		var random_Date = new Date(new Date().getTime() + Math.round(Math.random() * 100000.1));
		return two_digits(random_Date.getDate())+"."+two_digits(Math.round(random_Date.getMonth() + 1))+"."+random_Date.getFullYear();
	} else if (random_type <= 0.75) {
		//generate a timerange...
		var all_time_units = new Array();
		for (var i in time_units) {
			all_time_units=all_time_units.concat(time_units[i]);			
		}
		
		var time_text = Math.round(Math.random() * all_time_units.length);
		time_text = all_time_units[time_text];
		
		return Math.round(Math.random() * 100.1)+" "+time_text;
	} else if (random_type <= 0.875) {
		//generate a dotw
		var all_days = new Array();
		for (var i in dotws) {
			all_days=all_days.concat(dotws[i]);			
		}
		var time_text = Math.round(Math.random() * all_days.length);
		time_text = all_days[time_text];
		
		return time_text;
	} else {
		//generate a month
		var all_months = new Array();
		for (var i in months) {
			all_months=all_months.concat(months[i]);			
		}
		var time_text = Math.round(Math.random() * all_months.length);
		time_text = all_months[time_text];
		
		return time_text;
	}
}

function get_post_time() {
	if (doitlaterdebug) { alert("get_post_time: "+general_getValue("stack_record","")); }
	if (general_getValue("stack_record","").length <= 2) {
		var captions = new Object();
		captions.second     = general_getValue('caption_second','seconds').split(",");
		captions.seconds    = general_getValue('caption_seconds','seconds').split(",");
		captions.seconds_d  = general_getValue('caption_seconds_dative','seconds').split(",");
		captions.minute     = general_getValue('caption_minute','minute').split(",");
		captions.minutes    = general_getValue('caption_minutes','minutes').split(",");
		captions.minutes_d  = general_getValue('caption_minutes_dative','minutes').split(",");
		captions.hour       = general_getValue('caption_hour','hour').split(",");
		captions.hours      = general_getValue('caption_hours','hours').split(",");
		captions.hours_d    = general_getValue('caption_hours_dative','hours').split(",");
		captions.day        = general_getValue('caption_day','day').split(",");
		captions.days       = general_getValue('caption_days','days').split(",");
		captions.days_d     = general_getValue('caption_days_dative','days').split(",");
		captions.week       = general_getValue('caption_week','week').split(",");
		captions.weeks      = general_getValue('caption_weeks','weeks').split(",");
		captions.weeks_d    = general_getValue('caption_weeks_dative','weeks').split(",");
		captions.month      = general_getValue('caption_month','month').split(",");
		captions.months     = general_getValue('caption_months','months').split(",");
		captions.months_d   = general_getValue('caption_months_dative','months').split(",");
		captions.year       = general_getValue('caption_year','year').split(",");
		captions.years      = general_getValue('caption_years','years').split(",");
		captions.years_d    = general_getValue('caption_years_dative','years').split(",");
	
		captions.dotw = new Array();
		captions.dotw[1]      = general_getValue('caption_dotw1','Monday').split(",");
		captions.dotw[2]      = general_getValue('caption_dotw2','Tuesday').split(",");
		captions.dotw[3]      = general_getValue('caption_dotw3','Wednesday').split(",");
		captions.dotw[4]      = general_getValue('caption_dotw4','Thursday').split(",");
		captions.dotw[5]      = general_getValue('caption_dotw5','Friday').split(",");
		captions.dotw[6]      = general_getValue('caption_dotw6','Saturday').split(",");
		captions.dotw[7]      = general_getValue('caption_dotw7','Sunday').split(",");
	
		captions.monthnames = new Array();
		captions.monthnames[1]      = general_getValue('caption_months1','January').split(",");
		captions.monthnames[2]      = general_getValue('caption_months2','February').split(",");
		captions.monthnames[3]      = general_getValue('caption_months3','March').split(",");
		captions.monthnames[4]      = general_getValue('caption_months4','April').split(",");
		captions.monthnames[5]      = general_getValue('caption_months5','May').split(",");
		captions.monthnames[6]      = general_getValue('caption_months6','June').split(",");
		captions.monthnames[7]      = general_getValue('caption_months7','July').split(",");
		captions.monthnames[8]      = general_getValue('caption_months8','August').split(",");
		captions.monthnames[9]      = general_getValue('caption_months9','September').split(",");
		captions.monthnames[10]     = general_getValue('caption_months10','October').split(",");
		captions.monthnames[11]     = general_getValue('caption_months11','November').split(",");
		captions.monthnames[12]     = general_getValue('caption_months12','December').split(",");
	
		captions.invalide      = general_getValue('caption_invalide','is no valid value...');
		captions.timeinputquestion      = general_getValue('caption_timeinputquestion','When should this be done?\nType a date and/or a time or a range of time.');
	
	
		//check if its a timerange
		var time_units = new Object();
		time_units.seconds = new Array ("seconds?", "s").concat(captions.second.concat(captions.seconds.concat(captions.seconds_d)));
		time_units.minutes = new Array ("minutes?", "min").concat(captions.minute.concat(captions.minutes.concat(captions.minutes_d)));
		time_units.hours   = new Array ("hours?", "h", "Stunden?").concat(captions.hour.concat(captions.hours.concat(captions.hours_d)));
		time_units.days    = new Array ("days?").concat(captions.day.concat(captions.days.concat(captions.days_d)));
		time_units.weeks   = new Array ("weeks?").concat(captions.week.concat(captions.weeks.concat(captions.weeks_d)));
		time_units.months  = new Array ("months?").concat(captions.month.concat(captions.months.concat(captions.months_d)));
		time_units.years   = new Array ("years?").concat(captions.year.concat(captions.years.concat(captions.years_d)));
		var time_range_Exp = new RegExp("^(\\d+)\\s*("+time_units.seconds.concat(time_units.minutes.concat(time_units.hours.concat(time_units.days.concat(time_units.weeks.concat(time_units.months.concat(time_units.years)))))).join("|")+")$","i");
	
	
		var days_of_the_week = new Array();
		days_of_the_week[0] = null;
		days_of_the_week[1] = new Array("Monday").concat(captions.dotw[1]);
		days_of_the_week[2] = new Array("Tuesday").concat(captions.dotw[2]);
		days_of_the_week[3] = new Array("Wednesday").concat(captions.dotw[3]);
		days_of_the_week[4] = new Array("Thursday").concat(captions.dotw[4]);
		days_of_the_week[5] = new Array("Friday").concat(captions.dotw[5]);
		days_of_the_week[6] = new Array("Saturday", "Caturday").concat(captions.dotw[6]);
		days_of_the_week[7] = new Array("Sunday").concat(captions.dotw[7]);
		var dotw_Exp = new RegExp("("+days_of_the_week[1].concat(days_of_the_week[2].concat(days_of_the_week[3].concat(days_of_the_week[4].concat(days_of_the_week[5].concat(days_of_the_week[6].concat(days_of_the_week[7])))))).join("|")+")","i");

		var month_names = new Array();
		month_names[0] = null;
		month_names[1] = new Array("January","Jan").concat(captions.monthnames[1]);
		month_names[2] = new Array("Febuary","Feb").concat(captions.monthnames[2]);
		month_names[3] = new Array("March","Mar").concat(captions.monthnames[3]);
		month_names[4] = new Array("April","Apr").concat(captions.monthnames[4]);
		month_names[5] = new Array("May").concat(captions.monthnames[5]);
		month_names[6] = new Array("June","Jun").concat(captions.monthnames[6]);
		month_names[7] = new Array("July","Jul").concat(captions.monthnames[7]);
		month_names[8] = new Array("August","Aug").concat(captions.monthnames[8]);
		month_names[9] = new Array("September","Sep").concat(captions.monthnames[9]);
		month_names[10] = new Array("October","Oct").concat(captions.monthnames[10]);
		month_names[11] = new Array("November","Nov").concat(captions.monthnames[11]);
		month_names[12] = new Array("December","Dec").concat(captions.monthnames[12]);
		var months_Exp = new RegExp("("+month_names[1].concat(month_names[2].concat(month_names[3].concat(month_names[4].concat(month_names[5].concat(month_names[6].concat(month_names[7].concat(month_names[8].concat(month_names[9].concat(month_names[10].concat(month_names[11].concat(month_names[12]))))))))))).join("|")+")","i");
	
		var post_time_string = prompt(captions.timeinputquestion,example_timeinput(time_units,days_of_the_week,month_names));
	
		if (time_range_Exp.exec(post_time_string)) {		
			
			var factor1 = parseInt(RegExp.$1,10);
			var factor2 = RegExp.$2;
			var factor3 = 1;
		
			if (RegExp("("+time_units.seconds.join("|")+")").test(factor2)) { factor3 = 1; }
			if (RegExp("("+time_units.minutes.join("|")+")").test(factor2)) { factor3 = 60; }
			if (RegExp("("+time_units.hours.join("|")+")").test(factor2)) { factor3 = 60*60; }
			if (RegExp("("+time_units.days.join("|")+")").test(factor2)) { factor3 = 60*60*24; }
			if (RegExp("("+time_units.weeks.join("|")+")").test(factor2)) { factor3 = 60*60*24*7; }
			if (RegExp("("+time_units.months.join("|")+")").test(factor2)) { factor3 = 60*60*24*30.5; }
			if (RegExp("("+time_units.years.join("|")+")").test(factor2)) { factor3 = 60*60*24*365.25; }
		
		
			var target_time = new Date(new Date().getTime() + (factor1 * factor3 * 1000));
		
			return target_time;
		} else if (post_time_string.match(/^(\d\d\d\d)-(\d\d)-(\d\d)\s(\d\d):(\d\d)(:\d\d)?$/)) {
			//alert ("this is a standard- date-time");
			if (RegExp.$6) {
				var target_time = new Date(RegExp.$1,parseInt(RegExp.$2,10)-1,RegExp.$3,RegExp.$4,RegExp.$5,RegExp.$6.substr(1,2));
			} else {
				var target_time = new Date(RegExp.$1,parseInt(RegExp.$2,10)-1,RegExp.$3,RegExp.$4,RegExp.$5,Math.round(Math.random() * 59.9));
			}
		
			return target_time;
		} else if (post_time_string.match(/^(\d\d?).(\d\d?).(\d\d\d?\d?)\s(\d\d?):(\d\d?)(:\d\d?)?$/)) {
			//alert ("this is a non-standard- date-time");
			if (RegExp.$6) {
				var target_time = new Date(RegExp.$3,parseInt(RegExp.$2,10)-1,RegExp.$1,RegExp.$4,RegExp.$5,RegExp.$6.substr(1,2));
			} else {
				var target_time = new Date(RegExp.$3,parseInt(RegExp.$2,10)-1,RegExp.$1,RegExp.$4,RegExp.$5,Math.round(Math.random() * 59.9));
			}
			return target_time;
		} else if (post_time_string.match(/^(\d\d\d\d)-(\d\d)-(\d\d)$/)) {
			//alert ("this is a standard- date");
			var target_time = new Date(RegExp.$1,parseInt(RegExp.$2,10)-1,RegExp.$3,Math.round(Math.random() * 23.9),Math.round(Math.random() * 59.9),Math.round(Math.random() * 59.9));
		
			return target_time;
		} else if (post_time_string.match(/^(\d\d?).(\d\d?).(\d\d\d?\d?)/)) {
			//alert ("this is a non-standard- date");
			var target_time = new Date(RegExp.$3,parseInt(RegExp.$2,10)-1,RegExp.$1,Math.round(Math.random() * 23.9),Math.round(Math.random() * 59.9),Math.round(Math.random() * 59.9));
		
			return target_time;
		} else if (post_time_string.match(/^(\d\d?):(\d\d?)(:\d\d?)?$/)) {
			//alert ("this is a time");
			var target_time = new Date();
			target_time.setHours(RegExp.$1);
			target_time.setMinutes(RegExp.$2);
			if (RegExp.$3) { target_time.setSeconds(RegExp.$3); }
			if (target_time < new Date()) {
				target_time = new Date(target_time.getTime() + (60 * 60 * 24 * 1000));
			}
		
			return target_time;
		} else if (dotw_Exp.test(post_time_string)) {
			//alert ("this is a day of the week");
			var i = 1;
			while (!RegExp('('+days_of_the_week[i].join("|")+")","i").test(post_time_string)) { i++; }
			if (i == 7) { i = 0; }
		
			var target_time = new Date(new Date().getTime() + (60 * 60 * 24 * 1000));
			while (target_time.getDay() != i) {
				target_time = new Date(target_time.getTime() + (60 * 60 * 13 * 1000));
			}
		
			//alert(target_time.toLocaleString());
			return target_time;
		
		} else if (months_Exp.test(post_time_string)) {
			//alert ("this is a month");
			var i = 1;
			while (!RegExp('('+month_names[i].join("|")+")","i").test(post_time_string)) { i++; }
			i--;
				
			var target_time = new Date(new Date().getTime() + (60 * 60 * 24 * 31 * 1000));
			while (target_time.getMonth() != i) {
				target_time = new Date(target_time.getTime() + (60 * 60 * 24 * 8 * 1000));
			}
		
			return target_time;
		} else {
			alert("Sorry, \""+post_time_string+"\" "+captions.invalide);
			if (Math.random() < 0.1) {
				return false;
			} else {
				var target_time = get_post_time();
				return target_time;
			}
		}
		return false;
	} else {
		//oh... there's a stack open... return 0 for "throw on stack"
		return new Date(0);
	}
}

function new_status_2_json (input_element) {
	
	var form_element = input_element;
	while (form_element.nodeName.toLowerCase() != "form") {
		form_element = form_element.parentNode;
	}	
		
	var message_text = document.getElementById("status_message_text").value;
	var photo_array = new Array();
	var aspect_array = new Array();	
	for (var i = 0; i < document.getElementsByName("aspect_ids[]").length; i++) {
		aspect_array.push (document.getElementsByName("aspect_ids[]")[i].value);
	}
	for (var i = 0; i < document.getElementsByName("photos[]").length; i++) {
		photo_array.push (document.getElementsByName("photos[]")[i].value);
	}
	
	var json_text = '{"status_message":{"text":"'+message_text.replace(/"/g,'\\"')+'"}';
	if (aspect_array.length == 1) {
		json_text += ',"aspect_ids":"'+aspect_array[0]+'"';
	} else {
		json_text += ',"aspect_ids":["'+aspect_array.join('","')+'"]';
	}
	if (photo_array.length == 0) {
		//nuescht
	} else if (photo_array.length == 1) {
		json_text += ',"photos":"'+photo_array[0]+'"';
	} else {
		json_text += ',"photos":["'+photo_array.join('","')+'"]';
	}
	json_text += '}';
	
	return json_text;
}

function clear_newstatus_form() {
	
	document.getElementById("status_message_text").value = "";
	document.getElementById("status_message_fake_text").value = "";
	document.getElementById("publisher_textarea_wrapper").className = "";
	document.getElementById("publisher").className = "closed";
	while (document.getElementsByName("photos[]").length > 0) {
		document.getElementsByName("photos[]")[0].parentNode.removeChild(document.getElementsByName("photos[]")[0]);
	}
	while (document.getElementById("photodropzone").firstChild) {
		document.getElementById("photodropzone").removeChild(document.getElementById("photodropzone").firstChild);
	}
	
}

function add_job(content,target_time,job_type) {
	if (target_time.getTime() > 100) {
		while (general_getValue(job_type+"_"+Math.round(target_time.getTime() / 1000),false)) {
			target_time = new Date(target_time.getTime() + 1000);
		}
		
		general_setValue(job_type+"_"+Math.round(target_time.getTime() / 1000),content);
	
	} else {
		//ow this is a stack-job... add it to stack
		general_setValue("stack_record",general_getValue("stack_record","")+","+content);
		if (document.getElementById("flash_notice")) {
			document.getElementById("flash_notice").parentNode.removeChild(document.getElementById("flash_notice"));
		}
		var new_flash_notice = document.createElement("div");
		new_flash_notice.id = "flash_notice";
		new_flash_notice.className = "expose";
		var new_flash_message = document.createElement("div");
		new_flash_message.className = "message";
		new_flash_message.appendChild(document.createTextNode(general_getValue("caption_added","added")));
		new_flash_notice.appendChild(new_flash_message);
		
		document.getElementsByTagName("body")[0].insertBefore(new_flash_notice,document.getElementsByTagName("body")[0].firstChild);
	}
}

function generate_datablob (array_of_strings) {
	// CONVERTS *ALL* CHARACTERS INTO ESCAPED VERSIONS.
	// found here: http://scriptasylum.com/tutorials/encode-decode.html
	var split_sequence = 'Kh5ZRKCJAaR5kDbT'; //from my password-generator XD
	var os = array_of_strings.join(split_sequence);
	
	var ns='';
	var t;
	var chr='';
	var cc='';
	var tn='';
	for(i=0;i<256;i++){
		tn=i.toString(16);
		if(tn.length<2)tn="0"+tn;
		cc+=tn;
		chr+=unescape('%'+tn);
	}
	cc=cc.toUpperCase();
	os.replace(String.fromCharCode(13)+'',"%13");
	for(q=0;q<os.length;q++){
		t=os.substr(q,1);
		for(i=0;i<chr.length;i++){
			if(t==chr.substr(i,1)){
				t=t.replace(chr.substr(i,1),"%"+cc.substr(i*2,2));
				i=chr.length;
			}
		}
	ns+=t;
	}	
	
	
	return ns.replace(/\%/g,"");
}

function decode_datablob(datablob) {
	var split_sequence = 'Kh5ZRKCJAaR5kDbT'; //from my password-generator XD
	if (datablob.match(/PIL8R_DATABLOB\s(\w*)\s\/PIL8R_DATABLOB/)) {
		datablob = RegExp.$1;
	}
	
	datablob = datablob.replace(/(\w\w)/g,"%$1");
	
	var blobs_array = unescape(datablob).split(split_sequence);
	
	return(blobs_array);
}

function save_to_cloud() {
	var job_keys = general_listValues();
	var stuff2save = new Array();
	for (var i=0; i < job_keys.length; i++) {
		if (job_keys[i].match(/^(\d)_(\d+)/)) {
			stuff2save.push(job_keys[i]);
			stuff2save.push(general_getValue(job_keys[i]," "));			
		}
	}
	
	var string2save = generate_datablob(stuff2save);
	
	//send comment("PIL8R_DATABLOB\n"+string2save+"\n/PIL8R_DATABLOB");
}

function load_from_cloud() {
	var datablob = "foo";
	//datablob = read comment();
	var posts_array1 = decode_datablob(datablob);
	var posts_array2 = new Array();
	for (var i=0; i<posts_array1.length; i = i+2) {
		if ((posts_array1[i]) && (posts_array1[i+1])) {
			posts_array2.push(new Array(posts_array1[i],posts_array1[i+1]));
		}
	}
	
	//compare to existing and dedublicate...
	
	//save the stuff
}

function flash_notice(message) {
		if (document.getElementById("flash_notice")) {
			document.getElementById("flash_notice").parentNode.removeChild(document.getElementById("flash_notice"));
		}
		var new_flash_notice = document.createElement("div");
		new_flash_notice.id = "flash_notice";
		new_flash_notice.className = "expose";
		var new_flash_message = document.createElement("div");
		new_flash_message.className = "message";
		new_flash_message.appendChild(document.createTextNode(message));
		new_flash_notice.appendChild(new_flash_message);
		
		document.getElementsByTagName("body")[0].insertBefore(new_flash_notice,document.getElementsByTagName("body")[0].firstChild);
}

function do_timed_reshare(reshare_button,event) {
	//step 1: Find the post-id:
	var temp_element = reshare_button;
	while (!temp_element.classList.contains("bd")) {
		temp_element = temp_element.parentNode;
	}
	temp_element = temp_element.getElementsByClassName("timeago")[0].parentNode;
	
	var post_id = temp_element.href.match(/(\/posts\/)(\w+)/);
	if (doitlaterdebug) { alert("do_timed_reshare: "+post_id.join(", ")); }
	post_id = RegExp.$2;
	if (doitlaterdebug) { alert("do_timed_reshare: "+post_id); }
	
	if ((post_id.match(/^\d+$/))) {
		//this is a local ID so checkout the guid via AJAX...
	
		//okay, step 2: Find the guid for this post...
		var myAjax_Request = new XMLHttpRequest();
		myAjax_Request.open("get", "/posts/"+post_id+".json", true);
		myAjax_Request.onreadystatechange = function(){
			if(myAjax_Request.readyState == 4){
				//extract guid, build json, add job
				var post_guid = myAjax_Request.responseText.match(/"guid":"([^"]+)"/);
				if (doitlaterdebug) { alert("do_timed_reshare: "+post_guid.join(", ")); }
				post_guid = RegExp.$1;
				if (doitlaterdebug) { alert("do_timed_reshare: "+post_guid); }
				var json_text = '{"root_guid":"'+post_guid+'"}';
				var post_time = get_post_time();
				add_job(json_text,post_time,2);
			}
		}
		myAjax_Request.send(null);
	} else {
		//this IS allready the guid so we can goon...
				var json_text = '{"root_guid":"'+post_id+'"}';
				var post_time = get_post_time();
				add_job(json_text,post_time,2);
	}
	
	event.preventDefault();
	return false;
}

function add_reshare_buttons() {
	var reshare_l8r_btn = null;
	var all_reshares = document.getElementsByClassName("reshare");
	for (var i=0; i< all_reshares.length; i++) {
		if ((!all_reshares[i].classList.contains("pil8r_extended")) && (!all_reshares[i].classList.contains("label")) && (all_reshares[i].nodeName.toLowerCase() == "a")) {
			all_reshares[i].classList.add("pil8r_extended");
			reshare_l8r_btn = document.createElement("a");
			reshare_l8r_btn.href="#";
			reshare_l8r_btn.appendChild(document.createTextNode(" "+general_getValue('caption_resharel8r',"reshare later")+" ·"));
			reshare_l8r_btn.addEventListener("click",function(e) { do_timed_reshare(this,e); } );
			all_reshares[i].parentNode.insertBefore(reshare_l8r_btn,all_reshares[i]);
		} else if ((!all_reshares[i].classList.contains("pil8r_extended")) && (all_reshares[i].classList.contains("label")) && (all_reshares[i].nodeName.toLowerCase() == "a")) {
			
			all_reshares[i].classList.add("pil8r_extended");
			reshare_l8r_btn = document.createElement("a");
			reshare_l8r_btn.classList.add("label");
			reshare_l8r_btn.classList.add("pil8r_reshare");
			reshare_l8r_btn.addEventListener("click", function() {
							
				 
			
			var post_id = document.getElementById("container").getElementsByTagName("div")[0].id;
			
			if ((post_id.match(/^\d+$/))) {
				//this is a local ID so checkout the guid via AJAX...
	
				//okay, step 2: Find the guid for this post...
				var myAjax_Request = new XMLHttpRequest();
				myAjax_Request.open("get", "/posts/"+post_id+".json", true);
				myAjax_Request.onreadystatechange = function(){
					if(myAjax_Request.readyState == 4){
						//extract guid, build json, add job
						var post_guid = myAjax_Request.responseText.match(/"guid":"([^"]+)"/);
						if (doitlaterdebug) { alert("do_timed_reshare: "+post_guid.join(", ")); }
						post_guid = RegExp.$1;
						if (doitlaterdebug) { alert("do_timed_reshare: "+post_guid); }
						var json_text = '{"root_guid":"'+post_guid+'"}';
						var post_time = get_post_time();
						add_job(json_text,post_time,2);
					}
				}
					myAjax_Request.send(null);
				} else {
				//this IS allready the guid so we can goon...
					var json_text = '{"root_guid":"'+post_id+'"}';
					var post_time = get_post_time();
					add_job(json_text,post_time,2);
				}
	
	
				
				
				
				
				
				
			});
			var reshare_l8r_i = document.createElement("img");
			reshare_l8r_i.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAALCAYAAACUPhZAAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QUNAwcgLpf6qgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAEDSURBVCjPvZK9SsVAEIXP3kIQvRAvaJHKPrfzDXwFHzB10txayzxBQK+2/lxFsJnCH5CFz2YCS0xiKg8suzNn58zszEr/AaAEyhGuAK6BN+AG2DCBIeEOZY+7ArbAMXAGHMUY72OMr3+K94Q7bJxbA0/Afi/hSYzxpa7rc0l5t4Yqz5qmuUiIXNLKRW6BLA0CaNv2wP13vaS/2yJpb4gA3vuBjuC+jynxhe/fI3N+BFaSFEIIfn8RQsD9D3N/y1DlBbBL7JCcn4FiYm6lRp6dYufrEDgFlm5fpnMzs6oLMLNKUjZHHP/XW+DL92Lg8ZmZValwSMh8omufkmxGd7tqTZJ+ADE3r5ptvjRcAAAAAElFTkSuQmCC";
			
			reshare_l8r_btn.appendChild(reshare_l8r_i);
			all_reshares[i].parentNode.insertBefore(reshare_l8r_btn,all_reshares[i]);
			
		}
	}
}



//collect captions...
function caption_explain() {
	alert("Seems there is one or more captions missing, please be so kind to translate the following words or sentences into your language. For your own comfort.\nAt translations of single words (not sentences) you can seperate synonyms by comma: ,");
	return false;
}

function caption_reset(really_reset) {
	if (really_reset === undefined ) { really_reset = true; }
	if (really_reset) {
		var caption_list = general_listValues();
		for (var i = 0; i < caption_list.length; i++) {
			if (caption_list[i].match(/caption_\w+/)) {
				general_deleteValue(caption_list[i]);
			}
		}
	}
	
	
	
			
			
		var user_language = document.getElementsByTagName("html")[0].getAttribute("lang").match(/^[a-zA-Z0-9]+/)[0];
		if (doitlaterdebug) { alert("lang: "+user_language); }
		var first_question = true;
		if (!general_getValue('caption_lt60',false)) {
			if (get_caption(user_language,'caption_lt60')) {
				general_setValue('caption_lt60',get_caption(user_language,'caption_lt60'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_lt60',prompt("less a minute","less a minute"));
			}		
		}
		if (!general_getValue('caption_second',false)) {
			if (get_caption(user_language,'caption_second')) {
				general_setValue('caption_second',get_caption(user_language,'caption_second'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_second',prompt("second (singular)","second"));
			}
		}
		if (!general_getValue('caption_seconds',false)) {
			if (get_caption(user_language,'caption_seconds')) {
				general_setValue('caption_seconds',get_caption(user_language,'caption_seconds'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_seconds',prompt("seconds (plural)","seconds"));
			}
		}
		if (!general_getValue('caption_seconds_dative',false)) {
				general_setValue('caption_seconds_dative',get_caption(user_language,'caption_seconds_dative'));
		}
		if (!general_getValue('caption_minute',false)) {
			if (get_caption(user_language,'caption_minute')) {
				general_setValue('caption_minute',get_caption(user_language,'caption_minute'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_minute',prompt("minute (singular)","minute"));
			}
		}
		if (!general_getValue('caption_minutes',false)) {
			if (get_caption(user_language,'caption_minutes')) {
				general_setValue('caption_minutes',get_caption(user_language,'caption_minutes'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_minutes',prompt("minutes (plural)","minutes"));
			}
		}

		if (!general_getValue('caption_minutes_dative',false)) {
				general_setValue('caption_minutes_dative',get_caption(user_language,'caption_minutes_dative'));
		}

		if (!general_getValue('caption_hour',false)) {
			if (get_caption(user_language,'caption_hour')) {
				general_setValue('caption_hour',get_caption(user_language,'caption_hour'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_hour',prompt("hour (singular)","hour"));
			}
		}
		if (!general_getValue('caption_hours',false)) {
			if (get_caption(user_language,'caption_hours')) {
				general_setValue('caption_hours',get_caption(user_language,'caption_hours'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_hours',prompt("hours (plural)","hours"));
			}
		}

		if (!general_getValue('caption_hours_dative',false)) {
				general_setValue('caption_hours_dative',get_caption(user_language,'caption_hours_dative'));
		}

		if (!general_getValue('caption_day',false)) {
			if (get_caption(user_language,'caption_day')) {
				general_setValue('caption_day',get_caption(user_language,'caption_day'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_day',prompt("day (singular)","day"));
			}
		}
		if (!general_getValue('caption_days',false)) {
			if (get_caption(user_language,'caption_days')) {
				general_setValue('caption_days',get_caption(user_language,'caption_days'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_days',prompt("days (plural)","days"));
			}
		}

		if (!general_getValue('caption_days_dative',false)) {
				general_setValue('caption_days_dative',get_caption(user_language,'caption_days_dative'));
		}

		if (!general_getValue('caption_week',false)) {
			if (get_caption(user_language,'caption_week')) {
				general_setValue('caption_week',get_caption(user_language,'caption_week'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_week',prompt("week (singular)","week"));
			}
		}
		if (!general_getValue('caption_weeks',false)) {
			if (get_caption(user_language,'caption_weeks')) {
				general_setValue('caption_weeks',get_caption(user_language,'caption_weeks'));
			} else {
				if (first_question) { first_question=caption_explain();  }	
				general_setValue('caption_weeks',prompt("weeks (plural)","weeks"));
			}
		}

		if (!general_getValue('caption_weeks_dative',false)) {
				general_setValue('caption_weeks_dative',get_caption(user_language,'caption_weeks_dative'));
		}

		if (!general_getValue('caption_month',false)) {
			if (get_caption(user_language,'caption_month')) {
				general_setValue('caption_month',get_caption(user_language,'caption_month'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_month',prompt("month (singular)","month"));
			}
		}
		if (!general_getValue('caption_months',false)) {
			if (get_caption(user_language,'caption_months')) {
				general_setValue('caption_months',get_caption(user_language,'caption_months'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_months',prompt("months (plural)","months"));
			}
		}

		if (!general_getValue('caption_months_dative',false)) {
				general_setValue('caption_months_dative',get_caption(user_language,'caption_months_dative'));
		}

		if (!general_getValue('caption_year',false)) {
			if (get_caption(user_language,'caption_year')) {
				general_setValue('caption_year',get_caption(user_language,'caption_year'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_year',prompt("year (singular)","year"));
			}
		}
		if (!general_getValue('caption_years',false)) {
			if (get_caption(user_language,'caption_years')) {
				general_setValue('caption_years',get_caption(user_language,'caption_years'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_years',prompt("years (plural)","years"));
			}
		}

		if (!general_getValue('caption_years_dative',false)) {
				general_setValue('caption_years_dative',get_caption(user_language,'caption_years_dative'));
		}

		if (!general_getValue('caption_gty',false)) {
			if (get_caption(user_language,'caption_gty')) {
				general_setValue('caption_gty',get_caption(user_language,'caption_gty'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_gty',prompt("more than a year","more than a year"));
			}
		}
		if (!general_getValue('caption_never',false)) {
			if (get_caption(user_language,'caption_never')) {
				general_setValue('caption_never',get_caption(user_language,'caption_never'));
				general_setValue('caption_gt5y',get_caption(user_language,'caption_never'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_never',prompt("never","in erm eeeh.... never!"));
				general_setValue('caption_gt5y',prompt("never","in erm eeeh.... never!"));
			}
		}
		if (!general_getValue('caption_sbtitle',false)) {
			if (get_caption(user_language,'caption_sbtitle')) {
				general_setValue('caption_sbtitle',get_caption(user_language,'caption_sbtitle'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_sbtitle',prompt("Side bar-title","planed postings"));
			}
		}
		if (!general_getValue('caption_sbcontent',false)) {
			if (get_caption(user_language,'caption_sbcontent')) {
				general_setValue('caption_sbcontent',get_caption(user_language,'caption_sbcontent'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_sbcontent',prompt("next action in...(5 days e.g.)","next action in"));
			}
		}
		if (!general_getValue('caption_timeinputquestion',false)) {
			if (get_caption(user_language,'caption_timeinputquestion')) {
				general_setValue('caption_timeinputquestion',get_caption(user_language,'caption_timeinputquestion'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_timeinputquestion',prompt("Question for time-input","When should this be done?\nType a date and/or a time or a range of time."));
			}
		}
		if (!general_getValue('caption_dotw1',false)) {
			if (get_caption(user_language,'caption_dotw1')) {
				general_setValue('caption_dotw1',get_caption(user_language,'caption_dotw1'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_dotw1',prompt("days of the week: Monday","Monday"));
			}
		}
		if (!general_getValue('caption_dotw2',false)) {
			if (get_caption(user_language,'caption_dotw2')) {
				general_setValue('caption_dotw2',get_caption(user_language,'caption_dotw2'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_dotw2',prompt("days of the week: Tuesday","Tuesday"));
			}
		}
		if (!general_getValue('caption_dotw3',false)) {
			if (get_caption(user_language,'caption_dotw3')) {
				general_setValue('caption_dotw3',get_caption(user_language,'caption_dotw3'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_dotw3',prompt("days of the week: Wednesday","Wednesday"));
			}
		}
		if (!general_getValue('caption_dotw4',false)) {
			if (get_caption(user_language,'caption_dotw4')) {
				general_setValue('caption_dotw4',get_caption(user_language,'caption_dotw4'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_dotw4',prompt("days of the week: Thursday","Thursday"));
			}
		}
		if (!general_getValue('caption_dotw5',false)) {
			if (get_caption(user_language,'caption_dotw5')) {
				general_setValue('caption_dotw5',get_caption(user_language,'caption_dotw5'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_dotw5',prompt("days of the week: Friday","Friday"));
			}
		}
		if (!general_getValue('caption_dotw6',false)) {
			if (get_caption(user_language,'caption_dotw6')) {
				general_setValue('caption_dotw6',get_caption(user_language,'caption_dotw6'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_dotw6',prompt("days of the week: Saturday","Saturday"));
			}
		}
		if (!general_getValue('caption_dotw7',false)) {
			if (get_caption(user_language,'caption_dotw7')) {
				general_setValue('caption_dotw7',get_caption(user_language,'caption_dotw7'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_dotw7',prompt("days of the week: Sunday","Sunday"));
			}
		}
		if (!general_getValue('caption_months1',false)) {
			if (get_caption(user_language,'caption_months1')) {
				general_setValue('caption_months1',get_caption(user_language,'caption_months1'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_months1',prompt("Month names: January","January"));
			}
		}
		if (!general_getValue('caption_months2',false)) {
			if (get_caption(user_language,'caption_months2')) {
				general_setValue('caption_months2',get_caption(user_language,'caption_months2'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_months2',prompt("Month names: February","February"));
			}
		}
		if (!general_getValue('caption_months3',false)) {
			if (get_caption(user_language,'caption_months3')) {
				general_setValue('caption_months3',get_caption(user_language,'caption_months3'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_months3',prompt("Month names: March","March"));
			}
		}
		if (!general_getValue('caption_months4',false)) {
			if (get_caption(user_language,'caption_months4')) {
				general_setValue('caption_months4',get_caption(user_language,'caption_months4'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_months4',prompt("Month names: April","April"));
			}
		}
		if (!general_getValue('caption_months5',false)) {
			if (get_caption(user_language,'caption_months5')) {
				general_setValue('caption_months5',get_caption(user_language,'caption_months5'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_months5',prompt("Month names: May","May"));
			}
		}
		if (!general_getValue('caption_months6',false)) {
			if (get_caption(user_language,'caption_months6')) {
				general_setValue('caption_months6',get_caption(user_language,'caption_months6'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_months6',prompt("Month names: June","June"));
			}
		}
		if (!general_getValue('caption_months7',false)) {
			if (get_caption(user_language,'caption_months7')) {
				general_setValue('caption_months7',get_caption(user_language,'caption_months7'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_months7',prompt("Month names: July","July"));
			}
		}
		if (!general_getValue('caption_months8',false)) {
			if (get_caption(user_language,'caption_months8')) {
				general_setValue('caption_months8',get_caption(user_language,'caption_months8'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_months8',prompt("Month names: August","August"));
			}
		}
		if (!general_getValue('caption_months9',false)) {
			if (get_caption(user_language,'caption_months9')) {
				general_setValue('caption_months9',get_caption(user_language,'caption_months9'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_months9',prompt("Month names: September","September"));
			}
		}
		if (!general_getValue('caption_months10',false)) {
			if (get_caption(user_language,'caption_months10')) {
				general_setValue('caption_months10',get_caption(user_language,'caption_months10'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_months10',prompt("Month names: October","October"));
			}
		}
		if (!general_getValue('caption_months11',false)) {
			if (get_caption(user_language,'caption_months11')) {
				general_setValue('caption_months11',get_caption(user_language,'caption_months11'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_months11',prompt("Month names: November","November"));
			}
		}
		if (!general_getValue('caption_months12',false)) {
			if (get_caption(user_language,'caption_months12')) {
				general_setValue('caption_months12',get_caption(user_language,'caption_months12'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_months12',prompt("Month names: December","December"));
			}
		}
		if (!general_getValue('caption_invalide',false)) {
			if (get_caption(user_language,'caption_invalide')) {
				general_setValue('caption_invalide',get_caption(user_language,'caption_invalide'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_invalide',prompt("\"xxx is no valid value...\"","is no valid value..."));
			}
		}
		if (!general_getValue('caption_resharel8r',false)) {
			if (get_caption(user_language,'caption_resharel8r')) {
				general_setValue('caption_resharel8r',get_caption(user_language,'caption_resharel8r'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_resharel8r',prompt("Button next to the \"reshare\"-Button to prepare a reshare in the future...","reshare later"));
			}
		}
		if (!general_getValue('caption_postl8r',false)) {
			if (get_caption(user_language,'caption_postl8r')) {
				general_setValue('caption_postl8r',get_caption(user_language,'caption_postl8r'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_postl8r',prompt("Button next to the \"share\"-Button to prepare a new posting in the future...","post it later"));
			}
		}

		if (!general_getValue('caption_save',false)) {
			if (get_caption(user_language,'caption_save')) {
				general_setValue('caption_save',get_caption(user_language,'caption_save'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_save',prompt("Save (button)","Save"));
			}
		}

		if (!general_getValue('caption_delete',false)) {
			if (get_caption(user_language,'caption_delete')) {
				general_setValue('caption_delete',get_caption(user_language,'caption_delete'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_delete',prompt("Delete (button)","Delete"));
			}
		}

		if (!general_getValue('caption_cancel',false)) {
			if (get_caption(user_language,'caption_cancel')) {
				general_setValue('caption_cancel',get_caption(user_language,'caption_cancel'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_cancel',prompt("Cancel (button)","Cancel"));
			}
		}

		if (!general_getValue('caption_begin_stack',false)) {
			if (get_caption(user_language,'caption_begin_stack')) {
				general_setValue('caption_begin_stack',get_caption(user_language,'caption_begin_stack'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_begin_stack',prompt("Start Stack recording","Start stack"));
			}
		}

		if (!general_getValue('caption_close_stack',false)) {
			if (get_caption(user_language,'caption_close_stack')) {
				general_setValue('caption_close_stack',get_caption(user_language,'caption_close_stack'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_close_stack',prompt("End Stack recording","Close stack"));
			}
		}

		if (!general_getValue('caption_added',false)) {
			if (get_caption(user_language,'caption_added')) {
				general_setValue('caption_added',get_caption(user_language,'caption_added'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_added',prompt("added (to stack)","added"));
			}
		}

		if (!general_getValue('caption_to1',false)) {
			if (get_caption(user_language,'caption_to1')) {
				general_setValue('caption_to1',get_caption(user_language,'caption_to1'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_to1',prompt("\"to\" (temporal like \"until\")","to"));
			}
		}

		if (!general_getValue('caption_savestack',false)) {
			if (get_caption(user_language,'caption_savestack')) {
				general_setValue('caption_savestack',get_caption(user_language,'caption_savestack'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_savestack',prompt("Save the stack","Save the stack"));
			}
		}
		if (!general_getValue('caption_dropstack',false)) {
			if (get_caption(user_language,'caption_dropstack')) {
				general_setValue('caption_dropstack',get_caption(user_language,'caption_dropstack'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_dropstack',prompt("Drop the stack","Drop the stack"));
			}
		}
		if (!general_getValue('caption_dropstack_confirm',false)) {
			if (get_caption(user_language,'caption_dropstack_confirm')) {
				general_setValue('caption_dropstack_confirm',get_caption(user_language,'caption_dropstack_confirm'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_dropstack_confirm',prompt("Confirm discarding the stack","Do you really want to discard your stack?"));
			}
		}
		if (!general_getValue('caption_continuestack',false)) {
			if (get_caption(user_language,'caption_continuestack')) {
				general_setValue('caption_continuestack',get_caption(user_language,'caption_continuestack'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_continuestack',prompt("Keep filling the stack","Keep collecting"));
			}
		}
		if (!general_getValue('caption_stackhead',false)) {
			if (get_caption(user_language,'caption_stackhead')) {
				general_setValue('caption_stackhead',get_caption(user_language,'caption_stackhead'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_stackhead',prompt("Question in what range of time posts on the stack should be posted. Use \" n \" for the number of postings.","You recorded n elements. In what frequence or what range of time should they be posted?"));
			}
		}
		if (!general_getValue('caption_captions',false)) {
			if (get_caption(user_language,'caption_captions')) {
				general_setValue('caption_captions',get_caption(user_language,'caption_captions'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_captions',prompt("Caption \"Captions\" (settings-dialog)","Captions"));
			}
		}
		if (!general_getValue('caption_caption_reset',false)) {
			if (get_caption(user_language,'caption_caption_reset')) {
				general_setValue('caption_caption_reset',get_caption(user_language,'caption_caption_reset'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_caption_reset',prompt("Reset Captions","Reset captions"));
			}
		}
		if (!general_getValue('caption_close',false)) {
			if (get_caption(user_language,'caption_close')) {
				general_setValue('caption_close',get_caption(user_language,'caption_close'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_close',prompt("Close dialog","Close"));
			}
		}
		if (!general_getValue('caption_style_background_description',false)) {
			if (get_caption(user_language,'caption_style_background_description')) {
				general_setValue('caption_style_background_description',get_caption(user_language,'caption_style_background_description'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_style_background_description',prompt("Description of dialogs background color","Background color for dialogs like this."));
			}
		}
		if (!general_getValue('caption_style_backgroundtransparency_description',false)) {
			if (get_caption(user_language,'caption_style_backgroundtransparency_description')) {
				general_setValue('caption_style_backgroundtransparency_description',get_caption(user_language,'caption_style_backgroundtransparency_description'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_style_backgroundtransparency_description',prompt("Description of dialogs background transparency","Background transparency for dialogs like this."));
			}
		}
		if (!general_getValue('caption_style_border_description',false)) {
			if (get_caption(user_language,'caption_style_border_description')) {
				general_setValue('caption_style_border_description',get_caption(user_language,'caption_style_border_description'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_style_border_description',prompt("Border for dialogs","Borders for dialogs like this?"));
			}
		}
		if (!general_getValue('caption_style_borderradius_description',false)) {
			if (get_caption(user_language,'caption_style_borderradius_description')) {
				general_setValue('caption_style_borderradius_description',get_caption(user_language,'caption_style_borderradius_description'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_style_borderradius_description',prompt("Rounded corners for dialogs","Radius for rounded corners for dialogs like this."));
			}
		}
		if (!general_getValue('caption_style_textcolor_description',false)) {
			if (get_caption(user_language,'caption_style_textcolor_description')) {
				general_setValue('caption_style_textcolor_description',get_caption(user_language,'caption_style_textcolor_description'));
			} else {
				if (first_question) { first_question=caption_explain();  }
				general_setValue('caption_style_textcolor_description',prompt("Text color for dialogs","Text color for dialogs like this."));
			}
		}
	
	
}

function get_caption(ulang,captionname) {
	var all_captions = new Object();
	all_captions['caption_lt60'] = new Object();
	all_captions['caption_lt60']['en'] = "less a minute";
	all_captions['caption_lt60']['de'] = "weniger als einer Minute";
	all_captions['caption_lt60']['es'] = "en poco menos de uno minuto";
	all_captions['caption_lt60']['fi'] = "alle sekunnissa";
	all_captions['caption_second'] = new Object();
	all_captions['caption_second']['en'] = "second";
	all_captions['caption_second']['de'] = "Sekunde";
	all_captions['caption_second']['es'] = "segundo";
	all_captions['caption_second']['fi'] = "sekunti";
	all_captions['caption_seconds'] = new Object();
	all_captions['caption_seconds']['en'] = "seconds";
	all_captions['caption_seconds']['de'] = "Sekunden";
	all_captions['caption_seconds']['es'] = "segundos";
	all_captions['caption_seconds']['fi'] = "sekuntia";
	all_captions['caption_seconds_dative'] = new Object();
	all_captions['caption_seconds_dative']['fi'] = "sekunnissa";
	all_captions['caption_minute'] = new Object();
	all_captions['caption_minute']['en'] = "minute";
	all_captions['caption_minute']['de'] = "Minute";
	all_captions['caption_minute']['es'] = "minuto";
	all_captions['caption_minute']['fi'] = "minuutti";
	all_captions['caption_minutes'] = new Object();
	all_captions['caption_minutes']['en'] = "minutes";
	all_captions['caption_minutes']['de'] = "Minuten";
	all_captions['caption_minutes']['es'] = "minutos";
	all_captions['caption_minutes']['fu'] = "minuuttia";
	all_captions['caption_minutes_dative'] = new Object();
	all_captions['caption_minutes_dative']['fi'] = "minuutissa";
	all_captions['caption_hour'] = new Object();
	all_captions['caption_hour']['en'] = "hour";
	all_captions['caption_hour']['de'] = "Stunde";
	all_captions['caption_hour']['es'] = "hora";
	all_captions['caption_hour']['fi'] = "tunti";
	all_captions['caption_hours'] = new Object();
	all_captions['caption_hours']['en'] = "hours";
	all_captions['caption_hours']['de'] = "Stunden";
	all_captions['caption_hours']['es'] = "horas";
	all_captions['caption_hours']['fi'] = "tuntia";
	all_captions['caption_hours_dative'] = new Object();
	all_captions['caption_hours_dative']['fi'] = "tunnissa";
	all_captions['caption_day'] = new Object();
	all_captions['caption_day']['en'] = "day";
	all_captions['caption_day']['de'] = "Tag";
	all_captions['caption_day']['es'] = "día";
	all_captions['caption_day']['fi'] = "päivä";
	all_captions['caption_days'] = new Object();
	all_captions['caption_days']['en'] = "days";
	all_captions['caption_days']['de'] = "Tage";
	all_captions['caption_days']['es'] = "regla,dias";
	all_captions['caption_days']['fi'] = "päivää";
	all_captions['caption_days_dative'] = new Object();
	all_captions['caption_days_dative']['de'] = "Tagen";
	all_captions['caption_days_dative']['fi'] = "päivässä";
	all_captions['caption_week'] = new Object();
	all_captions['caption_week']['en'] = "week";
	all_captions['caption_week']['de'] = "Woche";
	all_captions['caption_week']['es'] = "semana";
	all_captions['caption_week']['fi'] = "viikko";
	all_captions['caption_weeks'] = new Object();
	all_captions['caption_weeks']['en'] = "weeks";
	all_captions['caption_weeks']['de'] = "Wochen";
	all_captions['caption_weeks']['es'] = "semanas";
	all_captions['caption_weeks']['fi'] = "viikkoa";
	all_captions['caption_weeks_dative'] = new Object();
	all_captions['caption_weeks_dative']['fi'] = "viikossa";
	all_captions['caption_month'] = new Object();
	all_captions['caption_month']['en'] = "month";
	all_captions['caption_month']['de'] = "Monat";
	all_captions['caption_month']['es'] = "mes";
	all_captions['caption_month']['fi'] = "kuukausi";
	all_captions['caption_months'] = new Object();
	all_captions['caption_months']['en'] = "months";
	all_captions['caption_months']['de'] = "Monate";
	all_captions['caption_months']['es'] = "meses";
	all_captions['caption_months']['fi'] = "kuukautta";
	all_captions['caption_months_dative'] = new Object();
	all_captions['caption_months_dative']['de'] = "Monaten";
	all_captions['caption_months_dative']['fi'] = "kuukaudessa";
	all_captions['caption_year'] = new Object();
	all_captions['caption_year']['en'] = "year";
	all_captions['caption_year']['de'] = "Jahr";
	all_captions['caption_year']['es'] = "año,ano";
	all_captions['caption_year']['fi'] = "vuosi";
	all_captions['caption_years'] = new Object();
	all_captions['caption_years']['en'] = "years";
	all_captions['caption_years']['de'] = "Jahre";
	all_captions['caption_years']['es'] = "años,anos";
	all_captions['caption_years']['fi'] = "vuotta";
	all_captions['caption_years_dative'] = new Object();
	all_captions['caption_years_dative']['de'] = "Jahren";
	all_captions['caption_years_dative']['fi'] = "vuodessa";
	all_captions['caption_gty'] = new Object();
	all_captions['caption_gty']['en'] = "more than a year";
	all_captions['caption_gty']['de'] = "mehr als ein Jahr";
	all_captions['caption_gty']['es'] = "en mas que un año";
	all_captions['caption_gty']['fi'] = "Yli vuodessa";
	all_captions['caption_never'] = new Object();
	all_captions['caption_never']['en'] = "erm... never!?";
	all_captions['caption_never']['de'] = "öhm äh... nie!?";
	all_captions['caption_never']['es'] = "mmmh ... nunca!?";
	all_captions['caption_never']['fi'] = "mmmh ... ei koskaan!?";
	all_captions['caption_sbtitle'] = new Object();
	all_captions['caption_sbtitle']['en'] = "Planed Postings";
	all_captions['caption_sbtitle']['de'] = "Geplante Beiträge";
	all_captions['caption_sbtitle']['es'] = "Aportaciones proyectadas";
	all_captions['caption_sbtitle']['fi'] = "Suunniteltu Julkaisu";
	all_captions['caption_sbcontent'] = new Object();
	all_captions['caption_sbcontent']['en'] = "next in";
	all_captions['caption_sbcontent']['de'] = "nächster in";
	all_captions['caption_sbcontent']['es'] = "Proxima en";
	all_captions['caption_sbcontent']['fi'] = "seuraava";
	all_captions['caption_timeinputquestion'] = new Object();
	all_captions['caption_timeinputquestion']['en'] = "When should this be done?\nType a date and/or a time or a range of time for delay.";
	all_captions['caption_timeinputquestion']['de'] = "Wann soll dies erscheinen?\nGib bitte einen Zeitpunkt oder eine Verzögerung ein.";
	all_captions['caption_timeinputquestion']['es'] = "Cuando parecerár?\nPrograme por favor una fecha o Prolongacion.";
	all_captions['caption_timeinputquestion']['fi'] = "Milloin toimenpide tulisi suorittaa?\nAnna päivämäärä ja/tai aika tai aikaväli viivästyttämiselle.";
	all_captions['caption_dotw1'] = new Object();
	all_captions['caption_dotw1']['en'] = "monday";
	all_captions['caption_dotw1']['de'] = "Montag";
	all_captions['caption_dotw1']['es'] = "Lunes";
	all_captions['caption_dotw1']['fi'] = "maanantai";
	all_captions['caption_dotw2'] = new Object();
	all_captions['caption_dotw2']['en'] = "tuesday";
	all_captions['caption_dotw2']['de'] = "Dienstag";
	all_captions['caption_dotw2']['es'] = "Martes";
	all_captions['caption_dotw2']['fi'] = "tiistai";
	all_captions['caption_dotw3'] = new Object();
	all_captions['caption_dotw3']['en'] = "wednesday";
	all_captions['caption_dotw3']['de'] = "Mittwoch";
	all_captions['caption_dotw3']['es'] = "Miércoles";
	all_captions['caption_dotw3']['fi'] = "keskiviikko";
	all_captions['caption_dotw4'] = new Object();
	all_captions['caption_dotw4']['en'] = "thursday";
	all_captions['caption_dotw4']['de'] = "Donnerstag";
	all_captions['caption_dotw4']['es'] = "Jueves";
	all_captions['caption_dotw4']['fi'] = "torstai";
	all_captions['caption_dotw5'] = new Object();
	all_captions['caption_dotw5']['en'] = "friday";
	all_captions['caption_dotw5']['de'] = "Freitag";
	all_captions['caption_dotw5']['es'] = "Viernes";
	all_captions['caption_dotw5']['fi'] = "perjantai";
	all_captions['caption_dotw6'] = new Object();
	all_captions['caption_dotw6']['en'] = "saturday";
	all_captions['caption_dotw6']['de'] = "Samstag";
	all_captions['caption_dotw6']['es'] = "Sábado";
	all_captions['caption_dotw6']['fi'] = "lauantai";
	all_captions['caption_dotw7'] = new Object();
	all_captions['caption_dotw7']['en'] = "sunday";
	all_captions['caption_dotw7']['de'] = "Sonntag";
	all_captions['caption_dotw7']['es'] = "Domingo";
	all_captions['caption_dotw7']['fi'] = "sunnuntai";
	all_captions['caption_months1'] = new Object();
	all_captions['caption_months1']['en'] = "January";
	all_captions['caption_months1']['de'] = "Januar";
	all_captions['caption_months1']['es'] = "enero";
	all_captions['caption_months1']['fi'] = "tammikuu";
	all_captions['caption_months2'] = new Object();
	all_captions['caption_months2']['en'] = "Februrary";
	all_captions['caption_months2']['de'] = "Februar";
	all_captions['caption_months2']['es'] = "febrero";
	all_captions['caption_months2']['fi'] = "helmikuu";
	all_captions['caption_months3'] = new Object();
	all_captions['caption_months3']['en'] = "March";
	all_captions['caption_months3']['de'] = "März";
	all_captions['caption_months3']['es'] = "marzo";
	all_captions['caption_months3']['fi'] = "maaliskuu";
	all_captions['caption_months4'] = new Object();
	all_captions['caption_months4']['en'] = "April";
	all_captions['caption_months4']['de'] = "April";
	all_captions['caption_months4']['es'] = "abril";
	all_captions['caption_months4']['fi'] = "huhtikuu";
	all_captions['caption_months5'] = new Object();
	all_captions['caption_months5']['en'] = "May";
	all_captions['caption_months5']['de'] = "Mai";
	all_captions['caption_months5']['es'] = "mayo";
	all_captions['caption_months5']['fi'] = "toukokuu";
	all_captions['caption_months6'] = new Object();
	all_captions['caption_months6']['en'] = "June";
	all_captions['caption_months6']['de'] = "Juni,Juno";
	all_captions['caption_months6']['es'] = "junio";
	all_captions['caption_months6']['fi'] = "kesäkuu";
	all_captions['caption_months7'] = new Object();
	all_captions['caption_months7']['en'] = "July";
	all_captions['caption_months7']['de'] = "Juli";
	all_captions['caption_months7']['es'] = "julio";
	all_captions['caption_months7']['fi'] = "heinäkuu";
	all_captions['caption_months8'] = new Object();
	all_captions['caption_months8']['en'] = "August";
	all_captions['caption_months8']['de'] = "August";
	all_captions['caption_months8']['es'] = "agosto";
	all_captions['caption_months8']['fi'] = "elokuu";
	all_captions['caption_months9'] = new Object();
	all_captions['caption_months9']['en'] = "September";
	all_captions['caption_months9']['de'] = "September";
	all_captions['caption_months9']['es'] = "septiembre";
	all_captions['caption_months9']['fi'] = "syyskuu";
	all_captions['caption_months10'] = new Object();
	all_captions['caption_months10']['en'] = "October";
	all_captions['caption_months10']['de'] = "Oktober";
	all_captions['caption_months10']['es'] = "octubre";
	all_captions['caption_months10']['fi'] = "lokakuu";
	all_captions['caption_months11'] = new Object();
	all_captions['caption_months11']['en'] = "November";
	all_captions['caption_months11']['de'] = "November";
	all_captions['caption_months11']['es'] = "noviembre";
	all_captions['caption_months11']['fi'] = "marraskuu";
	all_captions['caption_months12'] = new Object();
	all_captions['caption_months12']['en'] = "December";
	all_captions['caption_months12']['de'] = "Dezember";
	all_captions['caption_months12']['es'] = "diciembre";
	all_captions['caption_months12']['fi'] = "joulukuu";
	all_captions['caption_invalide'] = new Object();
	all_captions['caption_invalide']['en'] = "is not a valid value.";
	all_captions['caption_invalide']['de'] = "ist kein gültiger Wert";
	all_captions['caption_invalide']['es'] = "; Valor invalido";
	all_captions['caption_invalide']['fi'] = "ei ole sopiva arvo";
	all_captions['caption_resharel8r'] = new Object();
	all_captions['caption_resharel8r']['en'] = "Reshare later";
	all_captions['caption_resharel8r']['de'] = "Später weitersagen";
	all_captions['caption_resharel8r']['es'] = "Comunicar mastarde";
	all_captions['caption_resharel8r']['fi'] = "jaa uudelleen myöhemmin";
	all_captions['caption_postl8r'] = new Object();
	all_captions['caption_postl8r']['en'] = "Share later";
	all_captions['caption_postl8r']['de'] = "Später teilen";
	all_captions['caption_postl8r']['es'] = "Publicar mastarde";
	all_captions['caption_postl8r']['fi'] = "julkaise myöhemmin";
	all_captions['caption_save'] = new Object();
	all_captions['caption_save']['en'] = "Save";
	all_captions['caption_save']['de'] = "Speichern";
	all_captions['caption_save']['es'] = "Securizar";
	all_captions['caption_save']['fi'] = "tallenna";
	all_captions['caption_delete'] = new Object();
	all_captions['caption_delete']['en'] = "Delete";
	all_captions['caption_delete']['de'] = "Löschen";
	all_captions['caption_delete']['es'] = "Borrrar";
	all_captions['caption_delete']['fi'] = "poista";
	all_captions['caption_cancel'] = new Object();
	all_captions['caption_cancel']['en'] = "Cancel";
	all_captions['caption_cancel']['de'] = "Abbrechen";
	all_captions['caption_cancel']['es'] = "Cancelar";
	all_captions['caption_cancel']['fi'] = "peruuta";
	all_captions['caption_begin_stack'] = new Object();
	all_captions['caption_begin_stack']['en'] = "Start stack record";
	all_captions['caption_begin_stack']['de'] = "Beginne Stack";
	all_captions['caption_begin_stack']['es'] = "iniciar pila de grabación";
	all_captions['caption_begin_stack']['fi'] = "Aloita pino tallennus";
	all_captions['caption_close_stack'] = new Object();
	all_captions['caption_close_stack']['en'] = "Close stack";
	all_captions['caption_close_stack']['de'] = "Beende Stack";
	all_captions['caption_close_stack']['es'] = "cerrar apilar";
	all_captions['caption_close_stack']['fi'] = "sulje pino";
	all_captions['caption_added'] = new Object();
	all_captions['caption_added']['en'] = "added";
	all_captions['caption_added']['de'] = "hinzugefügt";
	all_captions['caption_added']['es'] = "adicional";
	all_captions['caption_added']['fi'] = "lisätty";
	all_captions['caption_to1'] = new Object();
	all_captions['caption_to1']['en'] = "to";
	all_captions['caption_to1']['de'] = "bis";
	all_captions['caption_savestack'] = new Object();
	all_captions['caption_savestack']['en'] = "Save the stack";
	all_captions['caption_savestack']['de'] = "Beiträge übernehmen";
	all_captions['caption_dropstack'] = new Object();
	all_captions['caption_dropstack']['en'] = "Drop the stack";
	all_captions['caption_dropstack']['de'] = "Beiträge verwerfen";
	all_captions['caption_dropstack_confirm'] = new Object();
	all_captions['caption_dropstack_confirm']['en'] = "Are you sure you want to discard your current stack?";
	all_captions['caption_dropstack_confirm']['de'] = "Wirklich bisherige Beiträge verwerfen?";
	all_captions['caption_continuestack'] = new Object();
	all_captions['caption_continuestack']['en'] = "Keep collecting";
	all_captions['caption_continuestack']['de'] = "Weiter sammeln";
	all_captions['caption_stackhead'] = new Object();
	all_captions['caption_stackhead']['en'] = "You recorded n elements. In what frequence or what range of time should they be posted?";
	all_captions['caption_stackhead']['de'] = "Du hast n Beiträge auf dem Stapel. In welchem Abstand oder in welchem Zeitraum sollen sie veröffentlich werden?";
	all_captions['caption_captions'] = new Object();
	all_captions['caption_captions']['en'] = "Captions";
	all_captions['caption_captions']['de'] = "Beschriftungen";
	all_captions['caption_caption_reset'] = new Object();
	all_captions['caption_caption_reset']['en'] = "Reset Captions";
	all_captions['caption_caption_reset']['de'] = "Beschriftungen\nzurücksetzen";
	all_captions['caption_style_background_description'] = new Object();
	all_captions['caption_style_background_description']['en'] = "Background color for dialogs like this";
	all_captions['caption_style_background_description']['de'] = "Hintergrundfarbe für Dialoge wie diesen";
	all_captions['caption_style_backgroundtransparency_description'] = new Object();
	all_captions['caption_style_backgroundtransparency_description']['en'] = "Background transparency for dialogs like this";
	all_captions['caption_style_backgroundtransparency_description']['de'] = "Hintergrundtransparenz für Dialoge wie diesen";
	all_captions['caption_style_border_description'] = new Object();
	all_captions['caption_style_border_description']['en'] = "Borders for dialogs like this?";
	all_captions['caption_style_border_description']['de'] = "Rahmen für Dialoge wie diesen?";
	all_captions['caption_style_borderradius_description'] = new Object();
	all_captions['caption_style_borderradius_description']['en'] = "Roundet corners for dialogs like this one";
	all_captions['caption_style_borderradius_description']['de'] = "Radius für runde Ecken an Dialogen wie diesem";
	all_captions['caption_style_textcolor_description'] = new Object();
	all_captions['caption_style_textcolor_description']['en'] = "Texts color in dialogs like this";
	all_captions['caption_style_textcolor_description']['de'] = "Textfarbe in Dialogen wie diesem";
	all_captions['caption_close'] = new Object();
	all_captions['caption_close']['en'] = "Close";
	all_captions['caption_close']['de'] = "Schließen";
	
	
	
	
	while (captionname.match(/_[^_]*$/)) {
		if (all_captions[captionname]) {
			if (all_captions[captionname][ulang]) {				
				return all_captions[captionname][ulang];
			}
		}
		captionname = captionname.replace(/_[^_]+$/,"");
	}
	return false;
}


function hex2rgba(hexcolor,opacity) {
	var hexcolors = new Array("00","00","00");
	if (hexcolor.length == 3) {
		hexcolors[0] = parseInt(hexcolor.slice(0,1)+hexcolor.slice(0,1),16);
		hexcolors[1] = parseInt(hexcolor.slice(1,2)+hexcolor.slice(1,2),16);
		hexcolors[2] = parseInt(hexcolor.slice(2,3)+hexcolor.slice(2,3),16);
	} else if (hexcolor.length == 4) {
		hexcolors[0] = parseInt(hexcolor.slice(1,2)+hexcolor.slice(1,2),16);
		hexcolors[1] = parseInt(hexcolor.slice(2,3)+hexcolor.slice(2,3),16);
		hexcolors[2] = parseInt(hexcolor.slice(3,4)+hexcolor.slice(3,4),16);
	} else if (hexcolor.length == 6) {
		hexcolors[0] = parseInt(hexcolor.slice(0,2),16);
		hexcolors[1] = parseInt(hexcolor.slice(2,4),16);
		hexcolors[2] = parseInt(hexcolor.slice(4,6),16);
	} else if (hexcolor.length == 7) {
		hexcolors[0] = parseInt(hexcolor.slice(1,3),16);
		hexcolors[1] = parseInt(hexcolor.slice(3,5),16);
		hexcolors[2] = parseInt(hexcolor.slice(5,7),16);
	}
	return ("rgba("+hexcolors.join(",")+","+opacity+")");
}




		
var style_dialog_background_color = general_getValue('style_dialog_background_color',"#0a0");
var style_dialog_background_opacity = general_getValue('style_dialog_background_opacity',"0.8");
var style_dialog_background = hex2rgba(style_dialog_background_color,style_dialog_background_opacity);
var style_dialog_border = general_getValue('style_dialog_border',"0");
if(parseInt(style_dialog_border,2)) { style_dialog_border = "solid"; } else { style_dialog_border = "none"; }
var style_dialog_border_radius = general_getValue('style_dialog_border_radius',"20");
var style_dialog_text_color = general_getValue('style_dialog_text_color',"#000000");

caption_reset(false);

var script_styles = new Array();
script_styles.push("#event_display_table td { padding:0 0 0.5em 0;  line-height:0.9em; }");
script_styles.push(".postitlater_dialog input { display:inline; }");
script_styles.push(".button_container input { display:inline !important; }");
script_styles.push(".postitlater_dialog .button_container { text-align:right; }");
script_styles.push(".postitlater_dialog { color:"+style_dialog_text_color+"; position:fixed; top:150px; right:150px; z-Index:201; padding:1em; background-color:"+style_dialog_background+"; border:"+style_dialog_border+"; border-radius:"+style_dialog_border_radius+"px; }");
//script_styles.push(".postitlater_dialog .tabgroup { position:fixed; }");
script_styles.push(".postitlater_dialog .tabgroup li { position:relative; display:inline-block; font-size:1.2em; padding:0.5em; border-style:double; border-width:4px; border-radius:10px 10px 0 0; cursor:pointer; }");
script_styles.push(".postitlater_dialog .tabgroup li.active_tab { font-weight:bold; text-decoration:underline; }");
script_styles.push("div.active_tab { display:block; }");
script_styles.push("div.inactive_tab { display:none; }");
script_styles.push(".editable { cursor: url('data:image/x-icon;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAFAAAACAAAAAUAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAABIAAAAbAAAAEwAAAAoAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIgAAADMAAAAlAAAAFgAAAAYAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAnAAAAOQAAADMAAAAlAAAAFQAAAAwAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuLi7/Pj4+/1dXV/8AAAAtAAAANwAAADcAAAAvAAAAHwAAAAwAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkpKf8uLi7/Hx8f/wAAAB8AAAA1AAAARQAAAEUAAAA1AAAAHwAAAAwAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8fH/8AAAADPj4+/z4+Pv8AAABFAAAATgAAAEcAAAA1AAAAHwAAAAwAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc3N/8zMzP/MzMz/z4+Pv8AAABHAAAATgAAAEcAAAA1AAAAHwAAAAwAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGxsb/y4uLv8zMzP/MzMz/z4+Pv8AAABHAAAATgAAAEcAAAA1AAAAHAAAAAoAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGxsb/y4uLv8zMzP/MzMz/z4+Pv8AAABHAAAATgAAAEUAAAAsAAAAFgAAAAUAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGxsb/y4uLv8zMzP/MzMz/z4+Pv8AAABFAAAARQAAADUAAAAlAAAAEgAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGxsb/y4uLv8zMzP/MzMz/zc3N/8AAAA3AAAANwAAADQAAAAiAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGxsb/y4uLv8uLi7/Hx8f/wAAACUAAAAzAAAAOQAAACcAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGxsb/x8fH/8AAAAGPj4+/z4+Pv8AAAAsAAAAGwAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc3N/8zMzP/Hx8f/wAAABUAAAAMAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGxsb/x8fH/8AAAAFAAAABgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////////////////////////////////////////////////////////////////////////////////////4////+P////0////+H////g////8H////g////8H////h////8n////x////8////////8='), auto; }");
script_styles.push("#timed_stack_toggle { cursor:pointer; }");
script_styles.push("#timed_stack_toggle:hover { text-decoration:underline; }");


general_addStyle(script_styles.join("\n"));




if (document.getElementsByClassName("public_toggle").length > 0) {
	var sharelater_button = document.createElement("input");
	sharelater_button.type = "button";
	sharelater_button.className = "button";
	sharelater_button.style.marginRight = "5px";
	sharelater_button.style.width = "auto";
	sharelater_button.value = general_getValue('caption_postl8r',"post it later");
	sharelater_button.addEventListener("click",function() { var json_string = new_status_2_json(this); var post_time = get_post_time(); add_job(json_string,post_time,1); clear_newstatus_form(); });
	document.getElementsByClassName("public_toggle")[0].insertBefore(sharelater_button,document.getElementsByClassName("public_toggle")[0].getElementsByClassName("creation")[0]);
}

window.setTimeout(add_reshare_buttons,2000);
window.setInterval(add_reshare_buttons,10000);

do_timed_stuff();
window.setInterval(do_timed_stuff,600000);

//get_aspectid_by_name("_noone_");
