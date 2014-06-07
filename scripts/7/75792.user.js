// ==UserScript==
// @name           Skroutz.gr Compare Link
// @author		Apostolos Giannakidis
// @version		0.3
// @copyright		Apostolos Giannakidis
// @namespace	http://userscripts.org/users/159112
// @include        http://www.plaisio.gr/*
// @include        http://plaisio.gr/*
// @include        http://www.e-shop.gr/*
// @include        http://e-shop.gr/*
// @include        http://www.multirama.gr/*
// @include        http://multirama.gr/*
// @include        http://www.you.gr/*
// @include        http://you.gr/*
// ==/UserScript==

	var window_host = window.content.location.host;
	
	function trim (str) {
		var	str = str.replace(/^\s\s*/, ''),
			ws = /\s/,
			i = str.length;
		while (ws.test(str.charAt(--i)));
		return str.slice(0, i + 1);
	}

	function show_link(s_name, prev_element, bold, add_top_br, add_bottom_br) {
		s_name = trim(s_name);
		var skroutz_url = "http://www.skroutz.gr/search?keyphrase="+s_name+"&con=comparelink";
		var skroutz_link = document.createElement("span");
		skroutz_link.setAttribute("id", "skroutz_link");
		
		var html = "";
		
		if (add_top_br == true)
			html += "<br/>";
		
		html += "<a href='"+skroutz_url+"' style='color:grey' target='_blank' title='Search Skroutz stores for: "+s_name+"' >";
			
		if (bold)
			html += "<b>Skroutz compare</b></a>";
		else
			html += "Skroutz compare</a>";

		if (add_bottom_br == true)
			html += "<br/>";
		
		skroutz_link.innerHTML = html;
		parent_element = prev_element.parentNode;
		parent_element.insertBefore(skroutz_link,prev_element.nextSibling);
	}
	
	if ( (window_host == "www.plaisio.gr") || (window_host == "plaisio.gr") ){
		var price = document.getElementsByClassName("vrlarge bold nwrp green")[0];
		var product_name = document.getElementsByClassName("pdgt pdgb mrgbn")[0].innerHTML;
		show_link(product_name, price, false, true, false);
	}
	else if ( (window_host == "www.e-shop.gr") || (window_host == "e-shop.gr") ){
		var creditcard_img = Array.filter( document.getElementsByTagName("a"), function(elem){
			return elem.getAttribute("href") == 'credit_card.phtml';
		});

		var creditcard = creditcard_img[0];
		var product_name = document.title.substring(0,document.title.indexOf(" - "));
		show_link(product_name, creditcard, true, true, false);
	}
	else if ( (window_host == "www.multirama.gr") || (window_host == "multirama.gr") ){
		var price = document.getElementById("plc_lt_zoneContent_Container_Container_lt_zoneProductCenter_MLRProductCenterHolder_MLRProductCenterHolder_lt_zoneMain_MLRProduct_userControlElem_PSTPrice");
		var procuct_name_elm = document.getElementsByClassName("productHeader")[0];
		var product_name = procuct_name_elm.innerHTML.substring(4,procuct_name_elm.innerHTML.indexOf(" - "));
		show_link(product_name, price, false, true, true);
	}
	else if ( (window_host == "www.you.gr") || (window_host == "you.gr") ){
		var pr_code = document.getElementsByClassName("pr_code")[0];
		var procuct_name_elm = document.getElementsByClassName("product_title")[0];
		var product_name = procuct_name_elm.innerHTML;
		show_link(product_name, pr_code, true, false, true);
	}	
	