// ==UserScript==
// @name           KoordFix
// @namespace      MoaYenrai
// @description    
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==


function getSessionID(){
if (document.getElementById("messagebox")!=null){
 var s = location.search;
 var session = s.substring(s.indexOf("session")+8);
 
 if(session != null && session.indexOf("&") > 0){
	session = session.substring(0,session.indexOf("&"));
 }
  replaceshowGalaxy(session); 
}
}

function replaceshowGalaxy(session){


 for(a in document.getElementsByTagName("a")){

	var x = document.getElementsByTagName("a")[a].getAttribute("href");

		if(x!= null && x.indexOf("showGalaxy")>10){

			var z = document.getElementsByTagName("a")[a];

			var g = x.slice(22,x.indexOf(","));

			var sys = x.slice(x.indexOf(",")+1,x.lastIndexOf(","));

			var pos = x.slice(x.lastIndexOf(",")+1,-1);

			var string = "index.php?page=galaxy&galaxy="+g+"&system="+sys+"&position="+pos+"&session="+session;

			z.setAttribute("href",string);
		}

	}
}

window.setTimeout(getSessionID,100);