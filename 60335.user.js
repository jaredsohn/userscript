// ==UserScript==
	// @name          Mafia Wars Gift Accept
	// @namespace     http://userscripts.org/users/113937
	// @author        Geoff
	// @description	  Accepts first Mafia Wars gift from the request page
	// @version       0.0.13
	// @include    http://www.facebook.com/*reqs.php#confirm_10979261223_*
// ==/UserScript==
//if(document.getElementsByClassName("confirm_boxes").length > 0) {
//	alert("can do get by class; start");
//}

var loc = new String(this.location);
//alert("location start: " + loc);
//alert("loc sub: " + loc.substr(33,21));

locSub = loc.substr(33,21);
//alert("id to grab: " + locSub);

//Get all by class name of loc
var divs = document.getElementsByClassName("confirm_boxes");
//alert("div.confirm_boxes count: " + divs.length);

for(i=0;i<divs.length;i++){
	if(divs[i].id == locSub)
	{
		//alert("This ID = " + divs[i].id);
		divs[i].getElementsByTagName("input")[0].click();
		
		/*
		var tags = divs[i].getElementsByTagName("input");
		//alert(tags.length);
		for(i=0;i<tags.length;i++) {
			//alert("tag value = " + tags[i].value);
			if(i == 0)
				tags[i].click();				
		}
		*/
	}
}




/*var arr = document.getElementsByTagName("input");
alert("arr: " + arr + " | length: " + arr.length)

for(i=0;i<arr.length;i++) {
	alert("arr.value: " + arr.value);
	if(arr.value.substr(0,6) == "Accept") {
		alert("got one");
	}
}

var cb = document.getElementById(loc);
alert("cb: " + cb.length);

var arr = document.getElementsByTagName("input");

for (i = 0; i < cb.length; i++) {
	for (i = 0; i < arr.length; i++) {
	   arr[i].style.background = "color:black";
	   return false;0
	   //arr[i].submit();
	}
}
*/

