// ==UserScript==
// @name          TFINNT (Not Newbie Tuesday)
// @namespace     http://www.darkskiez.co.uk/greasemonkey/
// @description   Get rid of newbies on tuesdays
// @include       http://*b3ta.com*
// @copyright     Neil Hillen, Mark Bryars
// ==/UserScript==

var d=new Date();
if (d.getDay() == 2){
	if (document.getElementById('mainbar') != null ) {
		d = document.getElementById('mainbar');
		k = d.childNodes;
		bad = 0;
		var noobieindent=1000000;
		for (i = 0; i<k.length; i++) {
			try {
	   			if ((k[i].className == 'post1') || (k[i].className == 'post2')) {
	   	        	// if root post
	   	      		if (parseInt(k[i].style.paddingLeft) <= noobieindent) {
	   	      			// if noobie post kill 
	   	      			if ( k[i].innerHTML.match('I\'m new!')) {
	   	      				bad = 1;
	   	      				noobieindent=parseInt(k[i].style.paddingLeft);	
	   	      			} else { // until new root post not noobie
	   	      				bad = 0;
	   	      			}
	   	      		} 
	   	      		if (bad) {
	   	      			d.removeChild(k[i])
	   	      			//alert('killing');
	   	      			//k[i].style.background='#ff0000';
	   	      		}
	   	      	}
	   	    }
	   		catch (e) {}
	  		
	  }
   }
}
