// ==UserScript==
// @name           Travian MarketPlace helper
// @namespace      
// @description    This is a travian Market place helper. It will generate a drop down control in the market of travian and let user choose from the cities to whom he frequently sends resources... for example among his own cities. Please note that the user need to edit the code to add the list of cities in question.
// @include        http://*.travian.com/build.php*
// @author		   Ankur Saxena
// ==/UserScript==


(function() {
	
	var city = new Array(5); // no of cities
	city[0] = new Array(2); city[0][0] = -57;city[0][1] = -41;   // city coordinates
	city[1] = new Array(2); city[1][0] = -56;city[1][1] = -42;
	city[2] = new Array(2); city[2][0] = -67;city[2][1] = -57;
	city[3] = new Array(2); city[3][0] = -64;city[3][1] = -43;
	city[4] = new Array(2); city[4][0] = -56;city[4][1] = -44;
	city[5] = new Array(2); city[5][0] = -58;city[5][1] = -32;
	
	var cn = new Array(5); // no of cities
	cn[0] = "EdgeCity";    // city names
	cn[1] = "Gotham City";
	cn[2] = "Mega Kat City";
	cn[3] = "Metropollis";
	cn[4] = "Smallville";
	cn[5] = "Star City";
	
	var i=document.getElementsByName('y')[0];

	//alert(i.innerHTML);
	var l ="<select>";
	for(var j=0;j<city.length;j++){
		//alert(city[j][0]);
		l = l + "<option value = '"+j+"' onClick='document.snd.x.value="+city[j][0]+";document.snd.y.value="+city[j][1]+"'>"+cn[j]+"</option> ";
	}
	l = l + "</select >";

	i.parentNode.parentNode.innerHTML = i.parentNode.parentNode.innerHTML + l;
})();


