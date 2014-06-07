// ==UserScript==
// @name        MinecraftMapRegionPlotter
// @require		http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @namespace   regionplotter.minecraft
// @description Plots all regions that is in dropdownlist at there x, y 
// @description positions.This script currently is set to the map 
// @description http://muttsworldmine.com/map/final/ but can be extended for other 
// @description worlds with the same map mod.
// @include     http://userscripts.org/
// @include     http://muttsworldmine.com/map/*
// @version     3
// @grant       none
// @author         Andreas Sateras
// ==/UserScript==
(function()
{
    if (typeof jQuery == 'undefined') {  
    	alert('jQuery is not loaded');
	} else {
    	//alert('jQuery is loaded');
	}
	//alert('test');
	var button = $('<input type="button" value="Plot all regions">');
	button.insertAfter($('#Regions'));
	
	var arr = [];
	
	button.click(function(){
	
		//$(this).attr("disabled", "disabled");
		$.each($("#Regions option"),function(index,value){
			
            console.debug('test');
			var elm = $(this);
			var val = elm[0].value;
			var selectdata=val.split("|");

			var x = parseInt(selectdata[0]);
			var z = parseInt(selectdata[1]);			
			var titel = elm[0].text;
			
			var obj = [titel,x,z];
			arr.push(obj);
			
		});
		
		for(i in arr) {
			var item = arr[i];
			
			var x = item[1]+200;
			var z = item[2]+200;			
			var titel = item[0]+" ("+x+", "+z+")";

			var converted=unsafeWindow.fromWorldToLatLng(x,64,z);
			var marker=new unsafeWindow.google.maps.Marker({
				position:converted,map:unsafeWindow.map,title:titel,
			});
		
		}
	});
	
	
	
})();