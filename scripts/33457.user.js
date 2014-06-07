// ==UserScript==
// @name           TC Stocks & Air
// @namespace      http://userscripts.org/users/65879
// @description    adds linko into main menu to stock market
// @include        http://www.torn.com/* 
// @include        http://torn.com/* 
// ==/UserScript==

// 0.2, 651
var $trip_mode = GM_getValue('trip_mode', 1);
var $trip_locations = { 
  'mx' : {'key' : 'mx', 'id' : 2 , 'visible': GM_getValue('trip_mx_link', 0), 'short' : '[MX]', 'link' : 'mexico'},
  'ca' : {'key' : 'ca', 'id' : 9 , 'visible': GM_getValue('trip_ca_link', 0), 'short' : '[CA]', 'link' : 'canada'},
  'ci' : {'key' : 'ci', 'id' : 12, 'visible': GM_getValue('trip_ci_link', 0), 'short' : '[CI]', 'link' : 'cayman-islands'},
  'ha' : {'key' : 'ha', 'id' : 3 , 'visible': GM_getValue('trip_ha_link', 0), 'short' : '[HA]', 'link' : 'hawaii'},
  'uk' : {'key' : 'uk', 'id' : 10, 'visible': GM_getValue('trip_uk_link', 0), 'short' : '[UK]', 'link' : 'uk'},
  'sw' : {'key' : 'sw', 'id' : 8 , 'visible': GM_getValue('trip_sw_link', 0), 'short' : '[SW]', 'link' : 'switzerland'},
  'ar' : {'key' : 'ar', 'id' : 7 , 'visible': GM_getValue('trip_ar_link', 0), 'short' : '[AR]', 'link' : 'argentina'},
  'jp' : {'key' : 'jp', 'id' : 5 , 'visible': GM_getValue('trip_jp_link', 0), 'short' : '[JP]', 'link' : 'japan'},
  'du' : {'key' : 'du', 'id' : 6 , 'visible': GM_getValue('trip_du_link', 0), 'short' : '[DU]', 'link' : 'dubai'},
  'ch' : {'key' : 'ch', 'id' : 11, 'visible': GM_getValue('trip_ch_link', 0), 'short' : '[CH]', 'link' : 'china'},
  'sa' : {'key' : 'sa', 'id' : 4 , 'visible': GM_getValue('trip_sa_link', 0), 'short' : '[SA]', 'link' : 'south-africa'}
};

var $agency_map = {
	1 : "a",
	2 : "b",
	3 : "c",
	4 : "d"
};

var mobile_view = (unsafeWindow.chat == 'undefined') ? true : false;
var main_target_element_pre = document.getElementById('nav-items');

var img_base = "http://www.torn.com/images/travelling/icons/";

//unsafeWindow.console.log(main_target_element_pre.tagName);
if(main_target_element_pre.tagName == 'A') {
  var main_target_element = main_target_element_pre.parentNode.nextSibling;
  var old_school = false;
} else {
  var main_target_element = main_target_element_pre.nextSibling;
  var old_school = true;
}

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

//unsafeWindow.console.log($trip_locations);

/* if not in [ travel | auth | fed ] mode */
if (main_target_element) {
  /* stocks ----------- */
  var nav_stocks = document.createElement('li');
  nav_stocks.setAttribute('id', 'nav-stocks');
  var stocks_market_link = document.createElement('a');
  stocks_market_link.setAttribute('title', 'Stock Market - Buy and sell shares');
  stocks_market_link.setAttribute('class', 'button');
  stocks_market_link.setAttribute('target', '_self');
  stocks_market_link.setAttribute('href', '/stockexchange.php');
  if(!old_school) {
    stocks_market_link.innerHTML = '<span class="job icon"></span>Stocks';
  } else {
    stocks_market_link.innerHTML = "Stocks";
  }
  var stocks_market_splitter = document.createElement('span');
  stocks_market_splitter.innerHTML = " ";
  var stocks_portfolio_link = document.createElement('a');
  stocks_portfolio_link.setAttribute('title', 'Your portfolio');
  stocks_portfolio_link.setAttribute('target', '_self');
  stocks_portfolio_link.setAttribute('href', '/stockexchange.php?step=portfolio');
  //stocks_portfolio_link.setAttribute('style', 'font-size: 90%');
  stocks_portfolio_link.innerHTML = "[Portfolio]";
  
  nav_stocks.appendChild(stocks_market_link);
  if(old_school) {
    nav_stocks.appendChild(stocks_market_splitter);
    nav_stocks.appendChild(stocks_portfolio_link);
  } else {
    stocks_market_link.appendChild(stocks_market_splitter);
    stocks_market_link.appendChild(stocks_portfolio_link);
  }
  
  main_target_element.parentNode.insertBefore(nav_stocks, main_target_element);
  
  /* trip ----------- */
  var nav_trip = document.createElement('li');
  nav_trip.setAttribute('id', 'nav-trip');
  var trip_style = document.createElement('style');
	trip_style.innerHTML = ".route-link:hover {background: #444444}";
  var trip_link = document.createElement('a');
  trip_link.setAttribute('title',  'Travel Agency');
  trip_link.setAttribute('class', 'button');
  trip_link.setAttribute('target', '_self');
  trip_link.setAttribute('href', '/travelagency.php?step=aaa');
  if(!old_school) {
    trip_link.innerHTML = '<span class="rss icon"></span>Trip';
  } else {
    trip_link.innerHTML = "Trip";
  }
  var trip_splitter = document.createElement('span');
  trip_splitter.innerHTML = " ";
  
  nav_trip.appendChild(trip_link);
	nav_trip.appendChild(trip_style);
  trip_link.appendChild(trip_splitter);

  var base_trip_uri = '/travelagency.php';
  var trip_links_arr = new Array();
  var trip_splitters_arr = new Array();
  
  var iterator = 0;
  for (key in $trip_locations)  {
    if($trip_locations[key]['visible'] != 0) {
      
      trip_links_arr[iterator] = document.createElement('a');
      trip_links_arr[iterator].setAttribute('title', $trip_locations[key]['link']);
      trip_links_arr[iterator].setAttribute('target', '_self');
			// http://www.torn.com/holder.php?case=travelAgency&ID=12&action=confirm&jsoff=none&ID2=3
			if (mobile_view) {
				link_uri = "http://www.torn.com/holder.php?case=travelAgency&ID=" + $trip_locations[key]['id'] + "&action=confirm&jsoff=none&ID2=" + $trip_mode;
			} else {
				//link_uri = "#" + $agency_map[$trip_mode] + $trip_locations[key]['id'];
				link_uri = "http://www.torn.com/holder.php?case=travelAgency&ID=" + $trip_locations[key]['id'] + "&action=confirm&jsoff=none&ID2=" + $trip_mode;
				//trip_links_arr[iterator].setAttribute('onclick', "parent.location='" + link_uri + "'");
			}
				trip_links_arr[iterator].setAttribute('href', link_uri);
			
      trip_links_arr[iterator].innerHTML = '<img src="' +img_base + $trip_locations[key]['link'] + '.png' + '" class="route-link" height="16" width="16" style="margin-bottom:-4px"/>';
      if(old_school) {
        nav_trip.appendChild(trip_links_arr[iterator]);
      } else {
        trip_link.appendChild(trip_links_arr[iterator]);
      }
      
      trip_splitters_arr[iterator] = document.createElement('span');
      trip_splitters_arr[iterator].innerHTML = " ";
      if(old_school) {
        nav_trip.appendChild(trip_splitters_arr[iterator]);
      } else {
        trip_link.appendChild(trip_splitters_arr[iterator]);
      }
      
      iterator++;
    }
  }

  main_target_element.parentNode.insertBefore(nav_trip, main_target_element);
  
  if (document.location.pathname == '/airstrip.php' || (document.location.pathname == '/travelagency.php')) {
    hr_element = document.getElementsByTagName('hr')[0];
    
    var pre_box_hr = document.createElement('hr');
    pre_box_hr.setAttribute('width', '90%');
    
    /* box 1 ----------------------------- */
    var box_1 = document.createElement('div');
    var box_1_text = document.createElement('span');
    box_1_text.innerHTML = "<strong>Default airlines:</strong> ";
    
    /* agency - standart */
		var ch_standart = document.createElement('input');
    ch_standart.setAttribute('type', 'radio');
    ch_standart.setAttribute('name', 'trip_by');
    ch_standart.setAttribute('id', 'trip-standart');
    if ($trip_mode == 1) {ch_standart.checked = true;}
    var label_standart = document.createElement('label');
    label_standart.setAttribute('for', 'trip-standart');
    label_standart.innerHTML = "Standart";

    /* agency - airstrip */
    var ch_airstrip = document.createElement('input');
    ch_airstrip.setAttribute('type', 'radio');
    ch_airstrip.setAttribute('name', 'trip_by');
    ch_airstrip.setAttribute('id', 'trip-airstrip');
    if ($trip_mode == 2) {
      ch_airstrip.checked = true;
    }
    var label_airstrip = document.createElement('label');
    label_airstrip.setAttribute('for', 'trip-airstrip');
    label_airstrip.innerHTML = "Airstrip";

    /* agency - private */
		var ch_private = document.createElement('input');
    ch_private.setAttribute('type', 'radio');
    ch_private.setAttribute('name', 'trip_by');
    ch_private.setAttribute('id', 'trip-private');
    if ($trip_mode == 3) {
      ch_private.checked = true;
    }
    var label_private = document.createElement('label');
    label_private.setAttribute('for', 'trip-private');
    label_private.innerHTML = "Private WLT";
		
    /* agency - bussines */
    var ch_bussines = document.createElement('input');
    ch_bussines.setAttribute('type', 'radio');
    ch_bussines.setAttribute('name', 'trip_by');
    ch_bussines.setAttribute('id', 'trip-bussines');
    if ($trip_mode == 4) {
      ch_bussines.checked = true;
    }
    var label_bussines = document.createElement('label');
    label_bussines.setAttribute('for', 'trip-bussines');
    label_bussines.innerHTML = "Bussines ticket";
    
    box_1.appendChild(box_1_text);
    box_1.appendChild(ch_standart);
    box_1.appendChild(label_standart);
    box_1.appendChild(ch_airstrip);
    box_1.appendChild(label_airstrip);
    box_1.appendChild(ch_private);
    box_1.appendChild(label_private);
    box_1.appendChild(ch_bussines);
    box_1.appendChild(label_bussines);
    
    hr_element.parentNode.insertBefore(pre_box_hr, hr_element);
    hr_element.parentNode.insertBefore(box_1, hr_element);
    
    var box_2 = document.createElement('div');
    var box_2_text = document.createElement('span');
    box_2_text.innerHTML = "<strong>Default routes:</strong> ";
    box_2.appendChild(box_2_text);

    var trip_routes_ch_arr = new Array();
    var trip_routes_lb_arr = new Array();
    var iterator = 0;
    for (key in $trip_locations)  {
      trip_routes_ch_arr[iterator] = document.createElement('input');
      trip_routes_ch_arr[iterator].setAttribute('type', 'checkbox');
      trip_routes_ch_arr[iterator].setAttribute('id', 'route-' + $trip_locations[key]['key']);
      trip_routes_ch_arr[iterator].setAttribute('name', 'route-' + $trip_locations[key]['key']);
      if($trip_locations[key]['visible']) {
        trip_routes_ch_arr[iterator].checked = true;
      }
      box_2.appendChild(trip_routes_ch_arr[iterator]);
      
      trip_routes_lb_arr[iterator] = document.createElement('label');
      trip_routes_lb_arr[iterator].setAttribute('title', $trip_locations[key]['link']);
      trip_routes_lb_arr[iterator].setAttribute('for', 'route-' + $trip_locations[key]['key']);
      trip_routes_lb_arr[iterator].innerHTML = '<img src="' +img_base + $trip_locations[key]['link'] + '.png' + '" height="24" width="24" style="margin-bottom:-4px"/>' + " ";
      box_2.appendChild(trip_routes_lb_arr[iterator]);
      
      iterator++;
    }

    hr_element.parentNode.insertBefore(box_2, hr_element);
  }
	
	if (document.location.toString().match('action=confirm') !== null) {
		buttons = document.evaluate('//a[@class="buyButton"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (buttons.snapshotLength == 0) {
			destination_elements = document.evaluate('//td/div/hr', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			destination_element = destination_elements.snapshotItem(0);
		  var travel_hr_element = document.createElement('hr');
			var travel_button_element = document.createElement('a');
			travel_button_element.setAttribute('class', 'buyButton');
			travel_button_element.setAttribute('style', 'font-size: 14px; font-weight: bold; color: #333333;');
			travel_button_element.setAttribute('href', 'holder.php?case=travelAgency&action=travel&jsoft=none&ID=' + getParameterByName('ID') + '&ID2=' + getParameterByName('ID2') +'&value');
			travel_button_element.innerHTML = "Travel";
			destination_element.parentNode.insertBefore(travel_hr_element, destination_element);
			destination_element.parentNode.insertBefore(travel_button_element, destination_element);
		}
	}

  document.getElementById('trip-standart').addEventListener('click', function(){if(this.checked){GM_setValue('trip_mode', 1);};}, true);
  document.getElementById('trip-airstrip').addEventListener('click', function(){if(this.checked){GM_setValue('trip_mode', 2);};}, true);
  document.getElementById('trip-private').addEventListener('click', function(){if(this.checked){GM_setValue('trip_mode', 3);};}, true);
  document.getElementById('trip-bussines').addEventListener('click', function(){if(this.checked){GM_setValue('trip_mode', 4);};}, true);
  /* not working for some reason :?
  for (key in $trip_locations) {
    document.getElementById('route-' + $trip_locations[key]['key']).addEventListener('click', function(){if(this.checked){GM_setValue(trip_' + $trip_locations[key]['key'] + '_link', 1);}else{GM_setValue('trip_' + $trip_locations[key]['key'] + '_link', 0);};}, true);
  }
  */
  document.getElementById('route-mx').addEventListener('click', function(){if(this.checked){GM_setValue('trip_mx_link', 1);}else{GM_setValue('trip_mx_link', 0);};}, true);
  document.getElementById('route-ca').addEventListener('click', function(){if(this.checked){GM_setValue('trip_ca_link', 1);}else{GM_setValue('trip_ca_link', 0);};}, true);
  document.getElementById('route-ci').addEventListener('click', function(){if(this.checked){GM_setValue('trip_ci_link', 1);}else{GM_setValue('trip_ci_link', 0);};}, true);
  document.getElementById('route-ha').addEventListener('click', function(){if(this.checked){GM_setValue('trip_ha_link', 1);}else{GM_setValue('trip_ha_link', 0);};}, true);
  document.getElementById('route-uk').addEventListener('click', function(){if(this.checked){GM_setValue('trip_uk_link', 1);}else{GM_setValue('trip_uk_link', 0);};}, true);
  document.getElementById('route-ar').addEventListener('click', function(){if(this.checked){GM_setValue('trip_ar_link', 1);}else{GM_setValue('trip_ar_link', 0);};}, true);
  document.getElementById('route-sw').addEventListener('click', function(){if(this.checked){GM_setValue('trip_sw_link', 1);}else{GM_setValue('trip_sw_link', 0);};}, true);
  document.getElementById('route-jp').addEventListener('click', function(){if(this.checked){GM_setValue('trip_jp_link', 1);}else{GM_setValue('trip_jp_link', 0);};}, true);
  document.getElementById('route-du').addEventListener('click', function(){if(this.checked){GM_setValue('trip_du_link', 1);}else{GM_setValue('trip_du_link', 0);};}, true);
  document.getElementById('route-ch').addEventListener('click', function(){if(this.checked){GM_setValue('trip_ch_link', 1);}else{GM_setValue('trip_ch_link', 0);};}, true);
  document.getElementById('route-sa').addEventListener('click', function(){if(this.checked){GM_setValue('trip_sa_link', 1);}else{GM_setValue('trip_sa_link', 0);};}, true);
}
