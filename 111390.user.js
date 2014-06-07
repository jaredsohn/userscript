// ==UserScript==
// @name             TickTock [GW]
// @namespace        http://gwscripts.net
// @include          http://www.ganjawars.ru/*
// @version          1.0
// @author           Bick
// ==/UserScript==

(function() {

	root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
	function Tick(t){
	 		var date = new Date(t * 1000);
	        var split = date.getSeconds() < 10 ? ':0' : ':';		
			target.innerHTML="Бой ["+date.getMinutes()+split+date.getSeconds()+"]";						 
	}
	var a=root.document.getElementsByTagName('a');
	target=null;
	sec=0;
	for (var i=0;i<a.length;i++){
		if (/Бой \[\d+\:\d+\]/i.test(a[i].innerHTML)){
			target=a[i];
			break;
		}
	}
	if (target!=null){
		var m=/Бой \[(\d+)\:(\d+)\]/i.exec(target.innerHTML);	
		sec=m[1]*60+m[2]*1;
		var date = new Date(sec * 1000);
        var split = date.getSeconds() < 10 ? ':0' : ':';		
		target.innerHTML="Бой ["+date.getMinutes()+split+date.getSeconds()+"]";
		root.setInterval(function(){if (sec>0){ Tick(sec); sec--;} },1000);
	}

})();