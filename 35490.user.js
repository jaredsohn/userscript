// ==UserScript==
// @name           eBay (including postage)
// @description   Calculates price + shipping on eBay UK search listings, adding the info into the shipping column.  This may work on international eBay sites, I have not tried.  There are still bugs to iron out, bear with me!!
// @author        Simon Pittock
// @version	alpha
// @namespace      eBay
// @include        http://*shop.ebay.co.uk/items/*
// ==/UserScript==

parseprices();

function parseprices(){
	//Scan through all table rows in the listing to locate currency values and inject additional info for combined cost into the postage/shipping column
	
	var getcells = document.getElementsByTagName('td');
	var temcalc = 0;
	var temcalcb = 0;
	var tem_threshold = 0.9;
	var tem_price = 0;
	var tem_ship = 0;
	var tem_curr = '';
	var tem_link1 = null;
	var tem_link2 = null;
	
	for(i in getcells){
		tem_price = 0;
		tem_ship = 0;
		tem_curr = '';
		
		if(getcells[i].className.indexOf('prices g-b') != -1){
			tem_link1 = getcells[i];
			tem_link2 = tem_link1.nextSibling;
			
			//Calculate Currency String
			temcalc = tem_link1.innerHTML.indexOf(' ');
			if(temcalc != -1){
				//Currency is not a symbol form
				tem_curr = tem_link1.innerHTML.substr(0, tem_calc);
				
			}else{
				//Currency  is symbol form
				tem_curr = tem_link1.innerHTML.charAt(0);

			}
			
			tem_price = tem_link1.innerHTML.substr(tem_curr.length);
			tem_ship = tem_link2.innerHTML.substr(tem_curr.length + 1);
			
			//Calculate total and display in shipping column
			//Fix any floating point/formatting aberrations
			temcalc = parseFloat(tem_price) + parseFloat(tem_ship) + '';
			temcalcb = temcalc.length - temcalc.indexOf('.') - 1;
			if(temcalcb > 2){
				temcalc = temcalc.substr(0, temcalcb + 3);
			}

			//inject the newly formatted data into the cell
			if(isNaN(tem_ship)){
				//FREE OR OTHER WORDING
				tem_link2.innerHTML = '<SPAN style="color: #44AA44; font-weight: bolder; font-size: larger;">' + tem_link2.innerHTML + '</SPAN>';
				
			}else{
				temcalcb = parseInt(tem_price) * tem_threshold;
				if(parseFloat(tem_ship) > temcalcb){
					temcalcb = 'color: #AA4444; font-weight: bold; font-size: larger;'
				}else{
					temcalcb = 'color: #44AA44; font-weight: bold; font-size: larger;'
				}
			
				tem_link2.innerHTML = '<SPAN style="' + temcalcb + '">' + tem_curr + temcalc + '</SPAN><BR><SPAN style="font-size: smaller; color: #999999;">(+' + tem_curr + tem_ship + ')</SPAN>'
				
			}
			
			i++
		}
	}
	
	//document.getElementById('rtm_html_274').style.display = 'none';
}