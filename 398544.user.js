// ==UserScript==
// @name        MKHL Extra
// @namespace   localhost
// @description ML Extra
// @include     http://primera.e-sim.net/militaryUnitStorage.html*
// @include     http://primera.e-sim.org/militaryUnitStorage.html
// @version     2
// ==/UserScript==


var main = function parseRequest(response) {  
    console.log(response); 
    
	//prompt('a',response)
	
	json_obj = jQuery.parseJSON(response);
	
	//alert(json_obj.array[0].name)
	
	$("#extendedDays").after("<input style='align:center' type='button' value='Show DMG' id='Show_DMG'>")
	
	$("#Show_DMG").click(function(){$(".yestrdaydmg").toggle();});
	
	
	$(".namePlayer").each(function(){
	
	
	id=$(this).find('a').attr('href').match(/\d.*/)[0]
	console.log($(this).find('a').attr('href').match(/\d.*/)[0]); 
	
	
	for(i=json_obj.array.length-1;i>=0;i--)
	{
	
		if(json_obj.array[i].id==id)
		$(this).append("<br/><span class='yestrdaydmg'> DMG: "+formatNumber( json_obj.array[i].damage)+"</span>")
	
	}
	
	})
	
	
	//Hide this
	//$(".yestrdaydmg").hide();
	
	
	function formatNumber(number)
{
    number = number.toFixed(2) + '';
    x = number.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 ;
}




	}  	


$(document).ready(function() {
	
	//script hozzá adás
	var script = document.createElement( "script" );
	script.type = "text/javascript";
	script.textContent =  main.toString() ;
	document.body.appendChild( script );
	
	
	// JSONP betöltése
	//var url = "http://magyarlegiero.vacau.com/api.php?callback=parseRequest"; 
    var url = "http://mkhl.php5.sk/dmg.php?callback=parseRequest";
    var script = document.createElement("script");  
    script.setAttribute("src", url);  
    document.getElementsByTagName("head")[0].appendChild(script);  
	
	
	
	
    });

	
	
