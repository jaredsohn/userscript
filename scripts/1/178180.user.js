// ==UserScript==
// @name           	LideoBux
// @namespace      	LideoBux
// @description    	LideoBux
// @author         	Lidmaster
// @version         1.39
// @include			http://www.neobux.com/*
// @include       	*://*
// @copyright		Copyright (C) 2013 by Lidmaster (With help of BoGnY | www.worldoftech.it) 
// ==/UserScript==

if(window.location.href.indexOf('m/v/') != -1){
	window.onbeforeunload = null;
	function inter(){window.location.replace( 'http://www.neobux.com/m/v/' );}setInterval(inter, 30000);	
	
	var a1 = document.getElementsByClassName('mbxm'); 
	var a2 = a1.length;
	var nb_add = a2;	
	var b1 = document.getElementsByClassName('adf'); 
	var b2 = document.getElementsByClassName('ad30'); 
	var b3 = document.getElementsByClassName('adfu'); 
	var b4 = ((b1.length)+(b2.length)+(b3.length));	
	if( (b4) == 1 ){
		var adp = document.getElementsByClassName('button small2 blue');
		var adp2 = 	adp.length;
		var adp3 = 	document.getElementById('ap_h');
		if( adp2 == 1 ){adp3.click();}
	}
	
	for (var i=0;i<nb_add;i++){
			var d1 = document.getElementById("tg_"+(i+1)); 
			var	d2 = d1.className;
			if( d2 != 'ad0' ){
				var add = document.getElementById("tg_"+(i+1));
				add.click();
				var reddot = document.getElementById("i"+(i+1));	
				reddot.click();
				break;
			}
		}
	
	function interv(){	
		var alr1 = document.getElementById('om'); 
		var alr2 = alr1.getElementsByClassName('f_b'); 
		var alr3 = alr2[0].innerHTML;
		var alr4 = alr1.style.display; 
		var pos_alr = alr3.indexOf('already');			
		if ((pos_alr >= 0) && ( alr4 != 'none')) {self.close();}	

		var mo1 = document.getElementById('o1'); 
		var mo2 = mo1.getElementsByClassName('f_b'); 
		var mo3 = mo2[0].innerHTML;
		var mo4 = mo1.style.display; 
		var pos_mo = mo3.indexOf('validated');			
		if ((pos_mo >= 0) && ( mo4 != 'none')) {self.close();}	
	}
	setInterval(interv, 500);

	

}

else if(window.location.href.indexOf('neobux.com/v/?xc') != -1){
		function interv2(){	
			var prmo1 = document.getElementById('prm0'); 
			var prmo2 = prmo1.getElementsByClassName('f_b'); 
			var prmo3 = prmo2[0].innerHTML;
			var prmo4 = prmo1.style.display; 
			var pos_prmo = prmo3.indexOf('validated');
			var prmo5 = document.getElementById('nxt_bt_a'); 
			
			if ((pos_prmo >= 0) && ( prmo4 != 'none')) {self.close();}	//self.close();prmo5.click();
		}
		setInterval(interv2, 500);
	}


/*
if(window.location.href.indexOf('neobux.com') != -1){
	window.onbeforeunload = null;
	if(window.location.href.indexOf('neobux.com/v/?xc') != -1){	
		function inter(){window.location.replace( 'http://www.neobux.com/m/v/' );}setInterval(inter, 30000);	
		for (var i=0;i<nb_add;i++){
			var d1 = document.getElementById("tg_"+(i+1)); 
			var	d2 = d1.className;
			if( d2 != 'ad0' ){
				var add = document.getElementById("tg_"+(i+1));
				add.click();
				var reddot = document.getElementById("i"+(i+1));	
				reddot.click();
				break;
			}
		}
	
	}
	
	
	
	var a1 = document.getElementsByClassName('mbxm'); 
	var a2 = a1.length;
	var nb_add = a2;	
	var b1 = document.getElementsByClassName('adf'); 
	var b2 = document.getElementsByClassName('ad30'); 
	var b3 = document.getElementsByClassName('adfu'); 
	var b4 = ((b1.length)+(b2.length)+(b3.length));	

	
	if( (b4) == 1 ){
		var adp = document.getElementsByClassName('button small2 blue');
		var adp2 = 	adp.length;
		var adp3 = 	document.getElementById('ap_h');
		if( adp2 == 1 ){adp3.click();}
	}


	

	function interv(){	
		var alr1 = document.getElementById('om'); 
		var alr2 = alr1.getElementsByClassName('f_b'); 
		var alr3 = alr2[0].innerHTML;
		var alr4 = alr1.style.display; 
		var pos_alr = alr3.indexOf('already');			
		if ((pos_alr >= 0) && ( alr4 != 'none')) {self.close();}	

		var mo1 = document.getElementById('o1'); 
		var mo2 = mo1.getElementsByClassName('f_b'); 
		var mo3 = mo2[0].innerHTML;
		var mo4 = mo1.style.display; 
		var pos_mo = mo3.indexOf('validated');			
		if ((pos_mo >= 0) && ( mo4 != 'none')) {self.close();}	
	}
	setInterval(interv, 500);


	else if(window.location.href.indexOf('neobux.com/v/?xc') != -1){	
		function interv2(){	
			var prmo1 = document.getElementById('prm0'); 
			var prmo2 = prmo1.getElementsByClassName('f_b'); 
			var prmo3 = prmo2[0].innerHTML;
			var prmo4 = prmo1.style.display; 
			var pos_prmo = prmo3.indexOf('validated');
			if ((pos_prmo >= 0) && ( prmo4 != 'none')) {self.close();}	//prmo5.click();
		}
		setInterval(interv2, 500);
	}
}


*/
		

