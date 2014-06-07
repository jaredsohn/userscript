// ==UserScript==
// @name          HWM_Market_Diff
// @description   HWM mod - Market_Diff
// @include       http://www.heroeswm.ru/auction.php*
// ==/UserScript==


// ====================================================


//alert("HWM_Market_Diff");	

var url_cur = location.href ;

	
showDiffButtons();	

function showDiffButtons(){
	var all_div = document.getElementsByTagName( 'div' );
		//alert("found " + all_div.length + "  DIV elements!");
	//
	//<div id=swf_but6509049>
	var my_div;
	for(var i=0; i<all_div.length; i++){	
		my_div = all_div[i];
		if(my_div.id.indexOf("swf_but")!=-1){
			my_div.style.backgroundColor = "#9c9";
			my_div.style.padding = "2px";
			my_div.style.fontWeight = "bold";
		}
		
	}
	
	return;
	
	
	
}

// ============================================



