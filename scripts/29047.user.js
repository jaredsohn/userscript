//
// ==UserScript==
// @name          HWM_color_str4market_ADV
// @description   HWM mod - colored strength 4market Advanced
// @include       http://www.heroeswm.ru/auction.php?*
// ==/UserScript==


var url = 'http://www.heroeswm.ru/' ;
var url_cur = location.href ;

var minStrShow = GM_getValue("hwm_market_min_str", 0);
	//alert("minStrShow = "+minStrShow);
	
showStrength();

function showStrength(){
	if(url_cur.search("art_type")==-1){ return; } // don't run on resource page
	//
		//alert("showStrength");
	var els = document.getElementsByTagName( 'a' );
	var item_hard_regexp = /\: (\d+)\/(\d+)/;
	var item_hard_regexp2 = /<b>(\d+)<\/b><\/font>\/(\d+)/;

	var el;
	var item;
	var lot_row;
	var lots_table;
	var sort_row;
	
	var art_info;
	var sa;
	
	for( var i = 0; i < els.length; i++ ){
	  el = els[i];
	  if( el.href.match(/auction_lot_protocol.php/) && el.href!=els[i-1].href ) {
		//alert("el.parentNode.innerHTML = "+el.parentNode.innerHTML);
	    if( ( hard_par = item_hard_regexp.exec( el.parentNode.innerHTML ) ) || ( hard_par = item_hard_regexp2.exec( el.parentNode.innerHTML ) ))
	    {
			hard_g = hard_par[2] ;
			hard_c = hard_par[1] ;
			item = el.parentNode.parentNode.firstChild ;
				//alert("item.innerHTML = "+item.innerHTML);
			if( hard_c <= hard_g*0.15 )
			{
			item.style.background = '#F00' ; // 0
			} else if( hard_c <= hard_g*0.33 )
			{
			item.style.background = '#FFC0CB' ; // < 25%
			} else if( hard_c <= hard_g*0.50 )
			{
			item.style.background = '#FFD700' ; // < 50%
			} else if( hard_c < hard_g*1 )
			{
			item.style.background = '#00F' ; // < 100%
			} else if( hard_c == hard_g )
			{
			item.style.background = '#008000' ; // =100%
			}
			//
			// hide rows with low strength
			lot_row = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			if(!lots_table){
				lots_table = lot_row.parentNode.parentNode;
					//alert("lots_table = "+lots_table+",\n lots_table = \n"+lots_table.innerHTML);
				sort_row = lots_table.childNodes[1].childNodes[0];
			}
			if(hard_c/hard_g < minStrShow/100 ){
			//lot_row.style.background = '#FFcccc';
			lot_row.style.display = 'none';
			}
			
			art_info = item.firstChild;
				//alert("art_info.innerHTML = "+art_info.innerHTML);
			//
			if(art_info.href){
				sa = document.createElement( 'a' );
				sa.href = art_info.href.replace("art_info.php?id=", "ecostat_details.php?r=");
				sa.innerHTML = '&nbsp;<b>[$]</b>';
				//sa.style.fontSize = "11px";
				el.parentNode.insertBefore(sa, el.nextSibling.nextSibling.nextSibling);
			}
			
		  
	    }else if(el.parentNode.innerHTML.indexOf("</b></font>/") != -1){  // items like 1/1
			item = el.parentNode.parentNode.firstChild ;
			item.style.background = '#F00' ;			
			lot_row = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			if(minStrShow){
				//lot_row.style.background = '#ffccff';
				lot_row.style.display = 'none';
			}
		}
	  }
	}

	
	if(!sort_row){ return; }
	// ========== add panel
	
	var options_arr = [];
	options_arr.push([0, "\u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0432\u0441\u0435"]); // show all
	options_arr.push([10, "10%"]); //
	options_arr.push([25, "25%"]); //
	options_arr.push([50, "50%"]); //
	options_arr.push([80, "80%"]); //
	options_arr.push([100, "100%"]); //
	//
	var options_str = "";
	for(var j=0; j<options_arr.length; j++){
		options_str += "<option value=" + options_arr[j][0];
		if(options_arr[j][0] == minStrShow){
			options_str += " selected";
		}
		options_str += ">"+ options_arr[j][1] + "</option>";
	}
		//alert("options_str = "+options_str);
	var d = document.createElement( 'div' );
	//
	d.innerHTML = 
'<table width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="font-weight:bold; " background="none">'+
'<tr><td>'+
'<form name="m_strength_sel">'+
// hide if str less than...
'\u0441\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u0441 \u043F\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u044C\u044E \u043C\u0435\u043D\u0435\u0435: '+
'<select name=ssqwe id="m_strength_sel_1" >'+
options_str+
/*
'<option value=10 >10%</option>'+
'<option value=25 >25%</option>'+
'<option value=50 >50%</option>'+
'<option value=100  selected >100%</option>'+
*/
'</select></form>'+
'</td>'+
'</tr></table>' ;
	
	//
	sort_row.childNodes[0].innerHTML = sort_row.childNodes[0].innerHTML + d.innerHTML ;
		//alert("now = \n"+sort_row.childNodes[0].innerHTML);
	
	
	document.getElementById('m_strength_sel_1').addEventListener( "change", selStrength , false );
	
}



function selStrength(e){
	var sel = e.target;
		//alert("selStrength, sel = "+sel);
	var n = sel[sel.selectedIndex].value;
		//alert("selStrength, n = "+n);
		
	n = n? Number(n) : 0;
	GM_setValue("hwm_market_min_str", n);
	
	if (n==minStrShow){return;}
	
	window.location = url_cur;
	
}


// ===============

