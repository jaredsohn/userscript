// ==UserScript==
// @name          Urban Dead Script
// @namespace     TAXICAT
// @description   Adding UD functionality
// @include       http://*.urbandead.com/map.cgi*
// @include       http://urbandead.com/map.cgi*
// ==/UserScript==

function addCoordinates(){
	var positions = document.getElementsByName("v");
	var x, y;
	var cityName = document.getElementsByClassName("sb")[0].innerHTML;
	
	var currentLocation = document.getElementsByClassName("gt")[1].innerHTML;
	var i = currentLocation.indexOf(">") + 1;
	currentLocation = currentLocation.substring(i, currentLocation.indexOf("</b>"));
	
	if(positions.length == 8){
		x = parseInt(positions[1].value);
		var str = positions[3].value;
		str = str.substring(str.indexOf("-")+1);
		y = parseInt(str);
		
	} else if(positions.length == 5) {
		var zero = parseInt(positions[0].value);
		var one = parseInt(positions[1].value);
		var two = parseInt(positions[2].value);
		var three = parseInt(positions[3].value);
		var four = parseInt(positions[4].value);
		
		if(zero == two && two != three){ //NORTH
			x = parseInt(positions[3].value);
			y = 0;
		
		} else if(zero == two && two == three){ //EAST
			x = parseInt(positions[1].value);
		
			var str = positions[2].value;
			str = str.substring(str.indexOf("-")+1);
			y = parseInt(str);
		
		} else if(one == two && two == four){ //WEST
			x = parseInt(positions[0].value);
			var str = positions[2].value;
			
			str = str.substring(str.indexOf("-")+1);
			y = parseInt(str);
		
		} else if(one != two && two == four){	//SOUTH
			x = parseInt(positions[1].value);
			var str = positions[3].value;
			
			str = str.substring(str.indexOf("-")+1);
			y = parseInt(str);

		}
	
	} else if(positions.length == 3) {
		x = parseInt(positions[0].value);
		
		var str = positions[0].value;
		str = str.substring(str.indexOf("-")+1);
		y = parseInt(str);
		
		if(x < 5){
			x = 0;
		} else {
			x = 99;
		}
		
		if(y < 5){
			y = 0;
		} else {
			y = 99;
		}
	}
	
	if(positions.length > 0)
		document.getElementsByClassName("sb")[0].innerHTML = cityName + "<br />" + currentLocation +" [" + x + ", " + y + "]";
};

function addUndeadites(){
	var pTags = document.getElementsByTagName("p");
	var inner = pTags[1].innerHTML;
	inner += "<a href=\"http://z15.invisionfree.com/UnDeadite/index.php?showforum=29\" class=\"y\">Undeadites</a>"
	pTags[1].innerHTML = inner;
};

try{
	addUndeadites();
	addCoordinates();
}catch(e) {};




/*
N0
12

0N
12

01
2N

01
N2

*********************
02 2!3

0   1
2 3 4

02 23

0 1
2
3 4

12 24

0 1
  2
3 4

1!2 24

0 1 2
3   4

*/

