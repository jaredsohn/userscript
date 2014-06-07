// ==UserScript==
// @name            t.qq-notifier
// @namespace   http://kohana.me
// @description   notifier for t.qq.com
// @include         http://t.qq.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//script run in personal homepage
var url = $('#headWrap > .topMenu >.userName >a').attr('href');
if(window.location.href.indexOf(url) == -1)
	return;

var AppName = "T.qq Notify";

// --utility--
function random(a) {
	a = a || 1;
	return parseInt((new Date).getTime() / a)
}
function clean(content){
	str = content.replace(/<a.*?>(.*?)<\/a>/ig,"$1") 
	return str;
}

// -- GrowlMonkey stuff below here - do not edit
GrowlMonkey = function(){
    function fireGrowlEvent(type, data){
        var element = document.createElement("GrowlEventElement");
        element.setAttribute("data", JSON.stringify(data));
        document.documentElement.appendChild(element);

        var evt = document.createEvent("Events");
        evt.initEvent(type, true, false);
        element.dispatchEvent(evt);
    }
    
    return {
        register : function(appName, icon, notificationTypes){
            var r = {};
            r.appName = appName;
            r.icon = icon;
            r.notificationTypes = notificationTypes;
            fireGrowlEvent("GrowlRegister", r);
        },
        
        notify : function(appName, notificationType, title, text, icon){
            var n = {};
            n.appName = appName;
            n.type = notificationType;
            n.title = title;
            n.text = text;
            n.icon = icon;
            fireGrowlEvent("GrowlNotify", n);
        }
    }
}();

/* json2.js 
 * 2008-01-17
 * Public Domain
 * No warranty expressed or implied. Use at your own risk.
 * See http://www.JSON.org/js.html
*/
if(!this.JSON){JSON=function(){function f(n){return n<10?'0'+n:n;}
Date.prototype.toJSON=function(){return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z';};var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};function stringify(value,whitelist){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;switch(typeof value){case'string':return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];if(c){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"':'"'+value+'"';case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
if(typeof value.toJSON==='function'){return stringify(value.toJSON());}
a=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){l=value.length;for(i=0;i<l;i+=1){a.push(stringify(value[i],whitelist)||'null');}
return'['+a.join(',')+']';}
if(whitelist){l=whitelist.length;for(i=0;i<l;i+=1){k=whitelist[i];if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}else{for(k in value){if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}
return'{'+a.join(',')+'}';}}
return{stringify:stringify,parse:function(text,filter){var j;function walk(k,v){var i,n;if(v&&typeof v==='object'){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);if(n!==undefined){v[i]=n;}}}}
return filter(k,v);}
if(/^[\],:{}\s]*$/.test(text.replace(/\\./g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof filter==='function'?walk('',j):j;}
throw new SyntaxError('parseJSON');}};}();}

// register Growl
function registerGrowl() {
    var ttNewPost = {};		//tencent new post
    ttNewPost.name = "microblog";
    ttNewPost.displayName = "T.qq Notify";
    ttNewPost.enabled = true;

    var types = [ttNewPost];
    GrowlMonkey.register(AppName, '', types);
	setInterval(function(){parse();}, 5000);			//interval to check new messages, 5000 equals 5 seconds
}

// notify
function notify(title,text,logo){
	if(title=="")
		title="腾讯微博提醒";
	GrowlMonkey.notify(AppName, "microblog", title, text,logo);
}

//crawl and parse json
function parse(){
	$.ajax({
		type:"GET",
		url:"http://t.qq.com/asyn/newMsgCount.php?type=4,3,2,1&r="+random(),
		dataType:"json",
		success:function(data){
			if(data.info[0]["value"]!=0){
				notify("","您有新听众 "+data.info[0]["value"]+" 位！","");
			}
			if(data.info[1]["value"]!=0){
				notify("","您有新站内信 "+data.info[1]["value"]+" 封!" ,"");
			}
			if(data.info[2]["value"]!=0){
				notify("","您有新广播 "+data.info[2]["value"]+" 条！","");
				$.ajax({
					type:"GET",
					url:"http://t.qq.com/asyn/home.php?time="+$('#talkList >li').attr('rel')+"&p=2&type=1&r="+random(),
					dataType:"json",
					success:function(data){
						for(unit in data.info.talk){
							notify(data.info.talk[unit].nick,clean(data.info.talk[unit].content),data.info.talk[unit].pic);
						}
						window.location.reload();
					}
				});
			}
			//if(data.info[3]["value"]!=0){
			//	notify("","有提到您的新广播 "+data.info[3]["value"]+" 条！","");
			//}
		}
	});
}
registerGrowl();