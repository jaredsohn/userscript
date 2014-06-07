//
// ==UserScript==
// @name          HWM_Sell2Gos_ADV
// @description   HWM_Sell2Gos_ADV
// @include       http://www.heroeswm.ru/inventory.php
// ==/UserScript==


var url = 'http://www.heroeswm.ru/' ;
var url_cur = location.href ;

var sell_for_str = "\u041F\u0440\u043E\u0434\u0430\u0442\u044C \u0437\u0430:"; // sell 4:

	//alert("HWM_Sell2Gos_ADV, [\u041F\u0440\u043E\u0434\u0430\u0442\u044C \u0437\u0430:]");

	
var mouseX;
var mouseY;

var cur_sell_link = "http://www.heroeswm.ru/home.php";
	
//var all_li = document.getElementsByTagName( 'li' );
var all_a = document.getElementsByTagName( 'a' );
var item_hard_regexp = /: (\d+)\/(\d+)/
var my_a;

var thiefPaper_str = "\u0412\u043E\u0440\u043E\u0432\u0441\u043A\u043E\u0435 \u043F\u0440\u0438\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435";


/* */
for( var i = 0; i < all_a.length; i++ ){
  my_a = all_a[i];
  if( my_a.innerHTML.match(sell_for_str) ){
		//alert("my_a.innerHTML = "+my_a.parentNode.parentNode.parentNode.parentNode.innerHTML);
	if(my_a.parentNode.parentNode.parentNode.parentNode.innerHTML.match(thiefPaper_str)){
		my_a.style.display = "none";
		break;
	}
		
  }
}


var d = document.createElement( 'div' );
d.id = "sell2gos_div";
document.body.appendChild( d ) ;

//alert("d.id = "+d.id);

/**/
document.addEventListener('click', function(event) {
    // event.target is the element that was clicked
	mouseX = event.pageX;
	mouseY = event.pageY;
	var et = event.target;
	if( et.innerHTML.match(sell_for_str) && et.parentNode.href){ // only for links "sell for..."
		//alert("clicked: my_a.innerHTML = "+et.parentNode.parentNode.innerHTML);
		//doClick(et.parentNode);
		doClick(et);
		// 
		// stop link behavior
	    event.stopPropagation();
	    event.preventDefault();
		
	}
    
}, true);


function doClick(et){
	//alert("doClick, et = " + et);
	//alert("clicked: innerHTML = "+et.parentNode.parentNode.innerHTML);
	//
	var s;
	var e;
	var tn;
	var tmp;
	var sell_link = et.parentNode;	
		//alert("sell_link = " + sell_link);
	cur_sell_link = sell_link;
	
	
	var p3 = et.parentNode.parentNode.parentNode;
	var hardness = p3.firstChild.innerHTML;
	hardness = hardness.substring(0, hardness.length-4);
		//alert("hardness = "+hardness);		
	var cost_tbl = p3.lastChild.lastChild.firstChild;
		//alert("cost_tbl = "+cost_tbl.innerHTML);	
		
	s = p3.parentNode.parentNode.firstChild.firstChild.nextSibling.firstChild.firstChild.firstChild.firstChild.innerHTML;
	var art_name = s.split("<b>")[1].split("</b>")[0];
		//alert("art_name = "+art_name);
	
	e = cost_tbl.firstChild;
	//alert("e = "+e.innerHTML);	
	tn=0;
	var ct;
	var cost_msg = sell_for_str +"\n";
	for(var i=0; i<e.childNodes.length; i++){
		ct = e.childNodes[i];
		//alert("ct = "+ct.innerHTML);		
		cost_msg += (i%2)? ct.firstChild.innerHTML +"\n" : ct.firstChild.title +" " ;			
	}	
	//alert("cost_msg = "+cost_msg);	
	var agree_str_rus = "\u0412\u044B \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u044B?";	
	var msg = art_name +"\n" + hardness +"\n\n" +cost_msg+"\n" +"\n" +agree_str_rus;
	//alert("msg = \n"+msg);
	/*
	if(confirm(msg)){
		alert("OK, selling...");
		//window.location = sell_link;
	}
	*/
	
	e = p3.parentNode.parentNode.parentNode.innerHTML
		//alert("e = "+e);	
	
	
	var info_table = p3.parentNode.parentNode.parentNode;
		//alert("info_table = "+info_table.innerHTML);
	var info_tbl_noLinks = info_table.innerHTML.split("<a").join("<ax").split("</a").join("</ax");
		//alert("info_tbl_noLinks = "+info_tbl_noLinks);
	
	var are_you_sure = "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435<br> \u042D\u0422\u041E \u043F\u0440\u043E\u0434\u0430\u0442\u044C \u0432 \u0413\u041E\u0421?";
	var yes_sure = "\u0414\u0410, \u043A\u043E\u043D\u0435\u0447\u043D\u043E!";
	var no_no = "\u041D\u0415\u0422, \u043D\u0435 \u0445\u043E\u0447\u0443";
	
	//alert("mouse = "+mouseX+"x"+mouseY);
	
	// show dialog	
	//d.innerHTML = '<table border="0" style="position:absolute; top:300px; left:auto; border:1px solid #ccc;" background="none">'+cost_tbl.innerHTML+'<table>';
	d.innerHTML = '<div style="border:2px solid #999; background-color:#ddd9cd; width:300; height:200; '+
	'position:absolute; top:'+ (mouseY-100) +'px; left:'+ (mouseX-400) +'px;" >'+
	'<table border="0" align="center">'+info_tbl_noLinks+
	'</table>'+
	'<table border="0" align="center" cellpadding="10" cellspacing="0" ><tr><td colspan=3 align="center"><b>' +are_you_sure+ '</b></td></tr>'+
	'<tr><td><input type=button id="s2gos_b1" value="' +yes_sure+ '" class=wbtn ><td>&nbsp;</td>'+
	'<td><input type=button id="s2gos_b2" value="'+ no_no+ '" class=wbtn ></td></tr>'+
	'</table>'+
	'</div>';

	d.style.display = "block";
	document.getElementById('s2gos_b2').focus();
	//
	document.getElementById('s2gos_b1').addEventListener( "click", clickSell2GosYes , false );
	document.getElementById('s2gos_b2').addEventListener( "click", clickSell2GosNo , false );
	
}

function clickSell2GosYes(){
	//alert("clickSell2GosYes, link = "+cur_sell_link);
	var sell2gos_div = document.getElementById('sell2gos_div');
	//
	sell2gos_div.style.display = "none";
	window.location = cur_sell_link;
	
}

function clickSell2GosNo(){
	//alert("clickSell2GosNo");
	var sell2gos_div = document.getElementById('sell2gos_div');
	//
	sell2gos_div.style.display = "none";
		
}




