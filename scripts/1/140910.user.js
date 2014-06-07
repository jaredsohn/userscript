
// ==UserScript==
// @name 式姬草子優化  
// @include https://*.gs.funmily.com/player*
// @include http://www.funmily.com/gameapp/*
// ==/UserScript==  

(function(){

var checkswf=function(){
	var self=checkswf;
	var o=document.getElementById("externalSwf");
	if(!o){
		setTimeout(self,1000);
		return;
	}
	for(var i=0;i<o.childNodes.length;){
		if(o.childNodes[i].name=="wmode")
			o.removeChild(o.childNodes[i]);
		else
			i++;
	}
};
checkswf();

})()