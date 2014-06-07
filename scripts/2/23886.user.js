// ==UserScript==
// @name		Sorts Twitter ID of DM
// @namespace	http://www.kanasansoft.com/
// @description This script sorts Twitter ID of the pull-down menu of the direct messages screen of Twitter in alphabetical order.
// @include		http://twitter.com/direct_messages
// @include		https://twitter.com/direct_messages
// @include		http://twitter.com/direct_messages/
// @include		https://twitter.com/direct_messages/
// @include		http://twitter.com/direct_messages/sent
// @include		https://twitter.com/direct_messages/sent
// ==/UserScript==

(function(){
	var slct=document.getElementById("user_id");
	if(!slct){return;}
	var opts=slct.options;
	if(!opts){return;}
	var buf=[];
	for(var i=0;i<opts.length;i++){
		buf.push({text:opts[i].text.toLowerCase(),opts:opts[i],toString:function(){return this.text}});
	}
	buf=buf.sort();
	for(var i=0;i<buf.length;i++){
		slct.appendChild(buf[i].opts);
	}
})();
