// ==UserScript==
// @name           TheWest++
// @namespace      http://erimitis@freemail.gr/thewest/
// @description    Enhances the user interface of the online game The-West with additional info and actions
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

//inventory functions
function inv_updateTotalSellPrice (inv)
{
    var inv_TotalSellPrice = document.getElementById("inv_TotalSellPrice");
	if (!inv_TotalSellPrice)
	{
		inv_TotalSellPrice = document.createElement('div');
		inv_TotalSellPrice.setAttribute('id','inv_TotalSellPrice');
		inv.appendChild(inv_TotalSellPrice);
	}
        var newline='<br/>';
        var space='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	var equipworth=0;
	var bagworth=0; 
	var productworth=0; 
	var otherworth=0; 
	var bagInstance = unsafeWindow.Bag.getInstance();
	for(var p in bagInstance.items) 
	{ 
		var v = bagInstance.items[p].get_sell_price() * bagInstance.items[p].get_count_value();
		bagworth = bagworth + v;
		if (bagInstance.items[p].get_type()=='yield')
			productworth = productworth + v;
		else
			otherworth = otherworth + v;
	} 
	var w = unsafeWindow.Wear.wear;
	if (w.head) equipworth = equipworth + w .head.get_sell_price();
	if (w .body) equipworth = equipworth + w .body.get_sell_price();
	if (w .neck) equipworth = equipworth + w .neck.get_sell_price();
	if (w .right_arm) equipworth = equipworth + w .right_arm.get_sell_price();
	if (w .foot) equipworth = equipworth + w .foot.get_sell_price();
	if (w .yield) equipworth = equipworth + w .yield.get_sell_price();
	if (w .animal) equipworth = equipworth + w .animal.get_sell_price();

	if (w .yield) productworth = productworth + w .yield.get_sell_price();
	
	var total = equipworth + bagworth;
	inv_TotalSellPrice.innerHTML = space+'Totale verkoopwaarde items: $'+total+'<br/>'+space+'Gedragen items: $'+equipworth+ ', Rugzak: $'+bagworth+'<br>';
}

function checkWindows_ToAddFeatures ( )
{
  var inv = document.getElementById("window_inventory_content");
  if (inv)
  {
	inv_updateTotalSellPrice(inv);	
  }  
  
  setTimeout ( checkWindows_ToAddFeatures, 2000 );
}

//start up
setTimeout ( checkWindows_ToAddFeatures, 2000 );
