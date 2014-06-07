// ==UserScript==
// @name           consumption snap shot
// @namespace      pardus.at
// @include        http://*.pardus.at/planet_trade.php
// @include        http://*.pardus.at/planet.php
// ==/UserScript==

if(location.href.indexOf('planet_trade.php')>0){
	var names = unsafeWindow.res_names;
	var mins = unsafeWindow.amount_min;
	
	var now = (new Date).getTime();
	var values = GM_getValue("something","0,null,0").split(',');
	if(now-values[2]>1*60*1000)return;//too old pop value
	
	var rows=1;
	var txt = "planet: "+values[1]+", pop: "+ values[0]+"\nname,consumption";
	for(var i = 1;i<names.length;i++){
		if(names[i]&&mins[i]>=0&&maxes[i]){
			txt+="\n"+names[i]+","+-mins[i];
			rows++;
		}
	}

	document.body.innerHTML += "<textarea rows='"+rows+"' cols='40'>"+txt+"</textarea>";

}

if(location.href.indexOf('planet.php')>=0){
	
	var pop = document.getElementsByTagName('table')[4].getElementsByTagName('td')[1].textContent;
	pop = pop.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"").replace(/\s+/g," ").replace(",","");
	var name = document.getElementsByTagName('table')[3].getElementsByTagName('td')[1].childNodes[0].textContent;
	var time = (new Date).getTime();
	GM_setValue("something",pop+","+name+","+time);
}