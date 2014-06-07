// ==UserScript==
// @name           likenote random walk
// @include        http://www.likenote.com/listener/article/*
// ==/UserScript==

(function(){
//setTimeout("document.documentElement.innerHTML=''",1000);

$ = function(id){
	return document.getElementById(id);
}


duration=5*60*1000;
setTimeout(function(){
	var player = $("SinglePlayer");
//	var tab = $("content").getElementsByClassName("right_bg")[0].getElementsByTagName("table")[1];
//	for(var i=0;i<tab.rows.length;i++){
//		list[i] = tab.rows[i].cells[1].firstChild.href;
//	}
	str = document.documentElement.innerHTML;


	list = str.match(/listener\/article\/\d+/mg);
	rnd = Math.floor(Math.random()*list.length);
	document.documentElement.innerHTML='';
	document.documentElement.appendChild(player);
//	document.documentElement.appendChild(tab);
	document.documentElement.innerHTML += "all:";
	for(i in list){
		href = list[i].split("\/")[2];
		document.documentElement.innerHTML += "<a href='"+href+"'>"+href+"</a>|"
	}
	document.documentElement.innerHTML += "<p>next:"+list[rnd];
},1);

setTimeout(function(){
try{
		location.href = "http://www.likenote.com/"+list[rnd];
}catch(e){alert(e)}
},duration);
//str.match(/listener\/article\/\d+/mg)

})();
