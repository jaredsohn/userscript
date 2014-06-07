// ==UserScript==
// @name           Jappy Green Garden - Warenlager
// @namespace      jappy
// @developer      Steve Tews - www.steve-tews.de
// @version        0.0.1
// @description    Zeigt den aktuellen Warenbestand auf der Gartenseite.
// @include        http://www.jappy.*/user/*/garden/garden
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

var gn_settings= document.createElement('div');
	gn_settings.id= "game_warenbestand";
	gn_settings.style.position= 'relative';
	gn_settings.style.width= '820px';
	gn_settings.style.height= '0px';
	gn_settings.style.top= '-35px';
	gn_settings.style.border= 'none';
	gn_settings.style.color= '#333';

unsafeWindow.document.getElementById("jpy").appendChild(gn_settings);

with (unsafeWindow){
	window.onblur= function(){ window_focus=false; };
	window.onfocus= function(){ window_focus=true; };
	setInterval(function(){
		var content = "";
		var content1 = "";
		var content2 = "";
		var content3 = "";
		var content4 = "";
		var content5 = "";
		if(MyGarden.resourceStock){
			var stock = MyGarden.resourceStock;
            document.getElementById("game_warenbestand").innerHTML = "";
			for(var i in stock){
				content = '<div class="product" style="float:left;width:100px;height:50px;">' + stock[i].name + '<br /><img src="http://s1.jappy.tv/' + stock[i].icon + '"><div style="width:100px; height:10px; position:relative; top:-35px; right:2px;text-align:right"><span style="margin-left:5px">' + stock[i].numberOfResources + '</span><span class="icStock ml5" title=" Rohstoffe"> </span></div><div style="width:100px; height:10px; position:relative; top:-25px; right:2px;text-align:right"><span>' + stock[i].numberOfSeeds + '</span><span class="icSeed ml5" title=" Samen"> </span></div></div>';
				if(stock[i].typeId == 5) content1 += content;
				if(stock[i].typeId == 6) content2 += content;
				if(stock[i].typeId == 7) content3 += content;
				if(stock[i].typeId == 11) content4 += content;
				if(stock[i].typeId == 13) content5 += content;		
			}
			if(content1.length > 0) content1 = "<div style='clear:both;color:#799000;padding-top:10px;font-size:20px;font-weight:bold'>Kräutergarten</div>" + content1;
			if(content2.length > 0) content2 = "<div style='clear:both;color:#799000;padding-top:10px;font-size:20px;font-weight:bold'>Gewächshaus</div>" + content2;
			if(content3.length > 0 || content4.length > 0) content3 = "<div style='clear:both;color:#799000;padding-top:10px;font-size:20px;font-weight:bold'>Feld</div>" + content3 + content4;
			if(content5.length > 0) content4 = "<div style='clear:both;color:#799000;padding-top:10px;font-size:20px;font-weight:bold'>Sonderrohstoffe</div>" + content5;
			document.getElementById("game_warenbestand").innerHTML = document.getElementById("game_warenbestand").innerHTML + content1 + content2 + content3 + content4;
		}
	}, 1000);
}