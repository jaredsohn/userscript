// ==UserScript==
// @name          desudesu
// @namespace     desudesu
// @description	  desudesu for dAmn
// @include       http://chat.deviantart.com/chat/*
// ==/UserScript==

(function(){
var datetime = new Date().getTime();

if(!document.getElementById("MiddleMan"))
{
	var MMScript 			= document.createElement('script');
		MMScript.id 		= "MiddleMan";
		MMScript.src 		= 'http://sumopiggy.24bps.com/damn/middleman/middleman.js?MMdate='+datetime;
		document.getElementsByTagName('head')[0].appendChild(MMScript);
}

if(!document.getElementById("hamScript"))
{
/*
*/


var Hamway = {
	_init: function(){
		var hammize = function(args){
			args.str = args.str.replace(/\bam/ig, "desudesu);		
			if(Math.random()>0.96){
				var newtxt = args.str.replace("fuck", "desudesu");
				if(newtxt == args.str){
					newtxt = args.str.replace("shit", "desudesu");}
				if(newtxt == args.str){
					newtxt = args.str.replace(/\b[a-z]{3,6}s\b/i, "hams");}
				if(newtxt == args.str){
					newtxt = args.str.replace(/\b[a-z]+\b$/i, "ham");}
				if(newtxt == args.str){
					newtxt = args.str.replace(/\b[a-z]+\b/i, "ham");}
			}
			return args;
		}
		MiddleMan.Event.bind("dAmnChat_send", "msg", "hammize", hammize);
	}
};
Hamway._init();

}
})();