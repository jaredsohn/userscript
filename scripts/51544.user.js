// ==UserScript==
// @name           HWMCOM_map_refresh
// @namespace      http://diveintogreasemonkey.org/download/
// @description    HWM_map_refresh
// @include        http://www.lordswm.com/map.php*
// 
// ==/UserScript==

// ========================================================
//

var url_cur = location.href ;

var all_scripts = document.getElementsByTagName('script');
var myDelta;
if(all_scripts.length && all_scripts[0].innerHTML.indexOf("Delta=")!=-1 ){
	//alert("found " + all_scripts.length + "  scripts! \n"+all_scripts[0].innerHTML);
	myDelta = all_scripts[0].innerHTML.split("\n")[1].replace(/.*Delta=(\d+).*/, "$1");
		//alert("myDelta = "+myDelta+"");
		
	if(myDelta!="30"){	 // 30 is standard value for your own thief ambush
			
		setTimeout(function() { window.location = url_cur;}, 20000);
		
	}
	
}



// ========================================================