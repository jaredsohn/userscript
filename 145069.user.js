// ==UserScript==
// @name           Wayback Link for Google Cache 404 Pages
// @description    Show a Wayback Machine link when Google Cache 404's
// @author         thekirbylover
// @include        http://webcache.googleusercontent.com/search*
// @version        1.0
// ==/UserScript==

if(document.querySelectorAll("a,p,ins").length==5){
	var a=document.createElement("a"),b={};
	location.search.substring(1).split("&").forEach(function(c){
		var d=c.split("="),e=d[0];
		d.shift();
		b[e]=d.join("=");
	});
	a.href="http://web.archive.org/*/"+unescape(b["q"].replace(/^cache%3A/,""));
	a.innerText="Check on Wayback Machine";
	setTimeout(function(){
		document.body.appendChild(a);
	},215);
}