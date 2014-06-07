// ==UserScript==
// @name           Redfin Flood Plain Link
// @namespace      http://jobson.us/
// @include        http://www.redfin.com/*
// ==/UserScript==

var RF = {
	init: function() {
		if (! document.getElementById('property_basic_details') ) return;
		var t = document.getElementById('property_basic_details').getElementsByTagName('tbody')[0];
		
		var tr = document.createElement('tr');
		t.appendChild(tr);
		var td = document.createElement('td');
			td.className = 'property_detail_label left_column';
			td.innerHTML = 'Flood Plain:';
		tr.appendChild(td);
		
		var nav_address = document.getElementById('address_line_1').textContent.replace(/[\n\r\t]/g,'');
		var nav_city = document.getElementById('address_line_2').getElementsByClassName('locality')[0].textContent.replace(/[\n\r\t]/g,'');
		var nav_state = document.getElementById('address_line_2').getElementsByClassName('region')[0].textContent.replace(/[\n\r\t]/g,'');
		var nav_zipCode = document.getElementById('address_line_2').getElementsByClassName('postal-code')[0].textContent.replace(/[\n\r\t]/g,'');
		
		var url = 'http://www.floodsmart.gov/floodsmart/oneStepFloodRiskAddressSearch.action?nav_address='+ nav_address +'&nav_city='+ nav_city +'&nav_state='+ nav_state +'&nav_zipCode='+ nav_zipCode +'&nav_residential=Y';	
		
		var td = document.createElement('td');
			td.className = 'property_detail_value right_column';
		tr.appendChild(td);
		
		var a = document.createElement('a');
			a.setAttribute('href',url);
			a.setAttribute('target','_blank');
			a.innerHTML = 'Check Risk';
		td.appendChild(a);
	}
};




setTimeout(500,RF.init());