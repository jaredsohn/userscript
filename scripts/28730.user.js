// ==UserScript==
// @name          HWM_Market_Stat
// @description   HWM mod - Market_Stat
// @include       http://www.heroeswm.ru/auction.php*
// ==/UserScript==


// ====================================================


//alert("HWM_Market_Stat");	

var url_cur = location.href ;

	
processMarketData();	

function processMarketData(){
	var all_a = document.getElementsByTagName( 'a' );
		//alert("found " + all_a.length + "  A elements!");
	//
	var item_hard_regexp = /\: (\d+)\/(\d+)/; // normal case, 10/10 etc
	var item_hard_regexp2 = /<b>(\d+)<\/b><\/font>\/(\d+)/; // critical, like 1/10 
	//
	var item_q_regexp = /<b>(\d+) \u0448\u0442\.<\/b>/; //quantity (XX sht.)
	//
	var item_craft_regexp = /\[\w+\d+[^\]]*\]/; //craft, like [W7F7]
	//
	//var item_price_regexp = /<td>(\d*)[,]*(\d+)/; //price  like <td>5,500
	var item_price_regexp = /<td>(\d*)[,]*(\d*)[,]*(\d+)/; //price  like <td>5,500,500
	//
	var a_len = all_a.length;
	var a;
	var sa;
	var p0; // parent node
	var lot_row;
	var lots_table;
	var sort_row;
	var hard;
	var q;
	var price, price_td;
	
	var art_info;
	
	var p_4all = 0;
	var q_total = 0;
	var p_max = 0;
	var p_min = 0;
	var p_avg = 0;
	var count = 0;
	var lots_count = 0;
	for(var i=0; i<a_len; i++){	
		a = all_a[i];
		if( !a.href.match(/auction_lot_protocol.php/) || a.href==all_a[i-1].href ){ continue; } // skip not-related links
		//
		p0 = a.parentNode;
			//alert("p0 = "+p0+",\n p0 = \n"+p0.innerHTML);
		if(item_hard_regexp2.exec( p0.innerHTML )){ continue; } // skip used items ( like 1/10)
		//
		hard = item_hard_regexp.exec( p0.innerHTML );
		if(hard && hard[1]!=hard[2]){ continue; } // skip used items
		//
		if(item_craft_regexp.exec( p0.innerHTML )){ continue; } // skip crafted items
		if(item_craft_regexp.exec( p0.innerHTML )){ continue; } // skip crafted items
		//
		q = item_q_regexp.exec( p0.innerHTML )? item_q_regexp.exec( p0.innerHTML )[1] : 1; // quantity
		q = Number(q);
			//alert("q = "+q);
		count += q;
		
		lot_row = a.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			//alert("lot_row = "+lot_row+",\n lot_row = \n"+lot_row.innerHTML);
		//lot_row.style.background = '#FFcccc';
		
		if(!lots_table){
			lots_table = lot_row.parentNode.parentNode;
				//alert("lots_table = "+lots_table+",\n lots_table = \n"+lots_table.innerHTML);
				//alert("lots_table.childNodes[1] = \n"+lots_table.childNodes[0].innerHTML);
			sort_row = lots_table.childNodes[0].childNodes[0];
			sort_row.childNodes[0].colspan = "4";
				//alert("sort_row = "+sort_row+",\n sort_row = \n"+sort_row.innerHTML);
		}
		
		art_info = a.parentNode.parentNode.firstChild.firstChild ;
			//alert("art_info.innerHTML = "+art_info.innerHTML);
		//
		if(art_info.href){
			sa = document.createElement( 'a' );
			sa.href = art_info.href.replace("art_info.php?id=", "ecostat_details.php?r=");
			sa.innerHTML = '&nbsp;<b>[$]</b>';
			//sa.style.fontSize = "11px";
			a.parentNode.insertBefore(sa, a.nextSibling.nextSibling.nextSibling);
		}
		//
		price_td = lot_row.childNodes[2];
			//alert("price_td = "+price_td+",\n price_td= \n"+price_td.innerHTML);
		price = item_price_regexp.exec( price_td.innerHTML );	
			//alert("price = "+price[1]+","+price[2]);
		price = Number(price[1]+price[2]+price[3]);
			//alert("num price = "+price);
		//
		p_max = Math.max(price, p_max);
		p_min = (p_min==0)? price : Math.min(price, p_min);
		//
		if(lots_count<=10){
			p_4all += price*q;
			q_total += q; 
		}

		lots_count++;
		
				
	}
	
	p_avg = Math.round(100*p_4all/q_total)/100;
	
	//alert("count = "+count);
	
	//alert("lots_count = "+lots_count+"\n p_max = "+p_max+"\n p_min = "+p_min+"\n p_4all = "+p_4all+"\n q_total = "+q_total+"\n p_avg = "+p_avg );
	
	
	var cur_cat = getUrlParam("cat");
	var cur_type = getUrlParam("type");
	var cur_art_type = getUrlParam("art_type");
	var v_name = "hwm_mst_"+ cur_cat;
	v_name += cur_type? "_"+cur_type : "";
	v_name += cur_art_type? "_"+cur_art_type : "";
		//alert("v_name = "+v_name);
		
	var p_avg_prev = Number( GM_getValue(v_name, "0") );	
	
	GM_setValue(v_name, String(p_avg) );
	
	var dp_avg = p_avg - p_avg_prev;
	dp_avg = Math.round(100*dp_avg )/100;
	var dp_str = (dp_avg>=0)? '<span style="color:#0c0;">+'+dp_avg+'</span>' : '<span style="color:#c00;">'+dp_avg+'</span>';
	
	
	
	
	//var all_sel = document.getElementsByTagName( 'select' );
	//	alert("found " + all_sel.length + "  sel elements!");
	
	
	// add panel
	var d = document.createElement( 'div' );
	//
	d.innerHTML = 
//'<table width="600" border="1" align="center" cellpadding="1" cellspacing="0" style="position:absolute; top:172px; left:auto; font-weight:bold; " background="none">'+
'<table border="0" align="center" cellpadding="1" cellspacing="0" style="font-weight:bold; " background="none">'+
'<tr><td>&nbsp;&nbsp;lots:</td><td>'+lots_count+ '</td>'+
'<td>&nbsp;&nbsp;&nbsp;min:</td><td>'+p_min+ '</td>'+
'<td>&nbsp;&nbsp;&nbsp;max:</td><td>'+p_max+ '</td>'+
'<td>&nbsp;&nbsp;&nbsp;avg:</td><td>'+p_avg+ '</td>'+
//'<td>&nbsp;&nbsp;+XXX.00</td>'+
'<td>&nbsp;&nbsp;'+ dp_str +'</td>'+
//'<td width="100%"></td>'+
'</tr></table>' ;
	
	//document.body.appendChild( d ) ;
		//alert("sort_row = "+sort_row+",\n sort_row = \n"+sort_row.innerHTML);
	//sort_row.childNodes[0].innerHTML = d.innerHTML + sort_row.childNodes[0].innerHTML;
	//sort_row.childNodes[1].innerHTML = d.innerHTML + sort_row.childNodes[1].innerHTML;
		//alert("now = \n"+sort_row.childNodes[0].innerHTML);
		
	lots_table.parentNode.insertBefore(d, lots_table);
	
}






function getUrlParam( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

// ============================================



