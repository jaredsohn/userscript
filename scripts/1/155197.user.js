// ==UserScript==
// @name          aaa
// @namespace     as
// @description	  Greathe world
// @include       http://www.klikajadeh.com.com/*
// ==/UserScript==

var x = 3;
var y = 1;
var isStopped = false;

function startClock() {
   
	if (x !== 'Oke') {
		if (!isStopped) {
		x = x-y;
		document.frm.clock.value = x;
		}
		setTimeout("startClock()", 1000);

	}
	if (x == 0) {
		x = 'Oke';
		document.frm.clock.value = x;
               var code = "4234ef435c6887fd9fadff584035a8fc";

  var jenisku = "S";	

               var ad= "742";
	success.location.href="success.php?ad="+ad+"&code="+code+"&jenisku="+jenisku+"&verify=1";
	}
	
}




window.onblur = function(){
  isStopped = true;
};
window.onfocus = function(){
  if(isStopped) {isStopped = false;}
};
