	 // ==UserScript==
// @name           CR Favorites
// @namespace      Moyyom
// @include        http://canvasrider.com*
// ==/UserScript==

     function doSetItem(name, data) {
       localStorage.setItem(name, data);
       doShowAll();
     }
     function doShowAll() {
       var key = "";
       var pairs = "<br><u>Favorite Tracks</u><br><br>";
       var i=0;
       for (i=0; i<=localStorage.length-1; i++) {
         key = localStorage.key(i);
		 if (key != "FB_templateDataResponse"){
         pairs += "<a onClick='javascript:localStorage.removeItem(\""+ key + "\")'>[X]</a>  <a href='/tracks/"+key+"'>"+localStorage.getItem(key)+"</a><br>";
      }
	  }
       if (pairs == "<br><u>Favorite Tracks</u><br><br>") {
         pairs += "You have no favorite tracks :(";
       }
       document.getElementById('flt').innerHTML = pairs;
     }
	 
	 
	 var floater = document.createElement('div');
	 floater.setAttribute('id', 'flt');
	 floater.setAttribute('style', 'position:fixed; top:150px; z-index:9999; background-color:#BBBBBB; -webkit-border-radius: 10px; border: 1px solid #800000;width: 200px; left:0px;');
	 
	 document.getElementById('content').appendChild(floater);
	 
	 doShowAll();
	 document.getElementById('flt').style.height = (localStorage.length*10)+20 + "px"
	 
	 if (document.getElementById('flt').innerHTML=="<br><u>Favorite Tracks</u><br><br>You have no favorite tracks :("){
	 document.getElementById('flt').style.height = "60px";
	 }
	 
	 var Fav = document.createElement('div')
	 Fav.setAttribute('id', 'Fav');
	 document.getElementsByTagName('H1')[0].appendChild(Fav);
	 var j = document.getElementsByTagName('H1')[0].innerHTML;
	 document.getElementById('Fav').innerHTML = '<a onClick=\'javascript:localStorage.setItem("'+j.substring(1,j.indexOf(":"))+'","' +j.substring(j.indexOf(":")+2, j.indexOf("<")-j.indexOf(":")+4) +'")\'>Favorite This Track</a>';