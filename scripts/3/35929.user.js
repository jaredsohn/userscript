// ==UserScript==
// @version       0.1a
// @name          hermanos ji ajust
// @author	  Laymain - Karamba.
// @description	  escombros cada 3 seg
// @include  http://*/game/*
// @exclude	
// ==/UserScript==


function actualizar () {
document.getElementById('galaxy_form').submit();
}

var ran_unrounded=Math.random()*5000;
var ran_number=Math.floor(ran_unrounded);
window.setTimeout(actualizar,ran_unrounded) ;

z=GM_getValue("escombros"); 
var j=0;
var trs = document.getElementsByTagName('a');
  for (var i=0; i<trs.length; i++) {
  if (trs[i].innerHTML.indexOf('/planeten/debris.jpg" ')!=-1) {
	 j=j+1;
}
}

if (j<z ) {	
	var date = new Date();
	date.setTime(date.getTime());
	=window.open('','','scrollbars=no,menubar=no,height=600,width=800,resizable=yes,toolbar=no,location=no,status=no');
	win.document.write('escombros han sido recogidos a esta hora:'+date.toLocaleString());	
	}
GM_setValue("escombros",j);






