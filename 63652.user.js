// ==UserScript==
// @name           yad2 Google Maps 
// @description    Replace the yad2 Atlas maps with the superior Google Maps.
//                 Based on the original script by: David Tweeto
// @namespace      http://steecky.com
// @include        http://*.yad2.co.il/*
// @include        http://*homeless.co.il/*
// ==/UserScript==

//if there is no indexof implemented in the browser
var a = document.getElementsByTagName("a");

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;
    var from = Number(arguments[1]) || 0;
    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)    {
      if (from in this && this[from] === elt)
        return from;
    }
    return -1;
  };
}

for (var i = 0; i < a.length; i++) 
	if (a[i].href.indexOf("maps.yad2.co.il") != -1) {
    var post = a[i].href.split('/')[3].split('+'); //ugly remove "http://maps.yad2.co.il/"
    var address = "";

    var addArr = new Array("%D7%9E%D7%A4%D7%AA", "%D7%A8%D7%97%D7%95%D7%91:", "%D7%9E%D7%A1%27", "%D7%91%D7%99%D7%AA"); //city, street, house. no'
    //var u = 0;
    for(var j = 1; j < post.length; j++){
	  //alert(j + ": " + addArr.indexOf(post[j]) + " " + post[j]);
      if(addArr.indexOf(post[j]) == -1){ 
	  //alert("sucsess!");
        address = address + post[j] + " ";
      }
    }
    a[i].href 	= "http://maps.google.com/?hl=he&q=" + address + " israel";
  }

  else if (a[i].href.indexOf("atlas") != -1) {
		street 		= gup("street", a[i].href);
		city 		= gup("city", a[i].href);
		hNum 		= gup("HouseNum", a[i].href);
		a[i].href 	= "http://maps.google.com/?hl=he&q=" + city + " , " + street + " " + hNum;
	}
	else if (a[i].href.indexOf("showmap.asp") != -1) {
		street 		= gup("Street", a[i].href);
		city 		= gup("City", a[i].href);
		a[i].href 	= "http://maps.google.com/?hl=he&q=" + city + " , " + street;
	}
		
	
	
function gup( name, url ){
  name 			= name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS 	= "[\\?&]"+name+"=([^&#]*)";
  var regex 	= new RegExp( regexS );
  var results 	= regex.exec( url );
  
  if( results == null ) return "";
  else return results[1];
}
