// ==UserScript==
// @name           FitDay Zone Blocks
// @namespace      http://userscripts.org/users/147416
// @include        http://fitday.com/*
// ==/UserScript==

function do_buildZone() {

	//alert('test');

	var number = new RegExp("([0-9]+\.[0-9]+)"); 
	
    // get all rows
    var rows = document.getElementsByTagName("tr");
    for(var i=0; i<rows.length; i++){
		
		// get all of our columns
		var columns = rows[i].getElementsByTagName('td');

		
		// if the first two columns match amount/unit, keep going
		if(columns.length != 8 && columns.length != 7)
			continue;
		
		if(columns[1].getAttribute('class') != 'cp_Amount')
			continue;
			
		if(columns[2].getAttribute('class') != 'cp_Unit')
			continue;
		
		// fat
		blockify(columns[4], 3);
		
		// carbs
		blockify(columns[5], 9);
		
		// protein
		blockify(columns[6], 7);
    }
    
  
}

function blockify(column, multiplier)
{
		// get the grams
		var div = column.getElementsByTagName('div')[0];
		var number = div.innerHTML;
		
		// if this is a number, add zone to it
		if(number == parseFloat(number))
		{
			var blocks = number / multiplier;
			number += '<br><em>' + blocks.toFixed(1) + '</em>';
			div.innerHTML = number;
		}		
}


do_buildZone();