// ==UserScript==
// @name           Warrent Helper
// @namespace      Warrent Helper
// @description    Warrent Helper
// @include        http://warrants.ubs.com/ch/warrants/search_c.cgi
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
			
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function

    function letsJQuery() {
		console.log("letsJQuery");
		
		var strURL='http://stock.earlybird.hk/helper/stock_price_15_min.json?jsoncallback=doCalculation';
		
		  $.ajax({
			 type:'GET',
			 dataType:'jsonp',
			 url:strURL,
			 error: function(xmlHttpRequest,error) {
			 alert('Ajax request ERROR');
			 }
		  }) 
	};
	
	
	
	unsafeWindow.doCalculation = function(result){
			var stockPrice = result;
			 
			 $(".proseSegment table tr:first").append("<td></td>");
			 $(".proseSegment table tr:gt(0)").append("<td></td>");
				
				var $table = $(".proseSegment table"),
				$headerCells = $table.find("thead th"),
				$rows = $table.find("tbody tr:gt(0)");
				$rows = $table.find("tr:gt(38)");
	  
				var headers = [],
				rows = [];
	  
				$headerCells.each(function(k,v) {
				headers[headers.length] = $.trim($(this).text()).replace(/ /g,'').replace(/\n/g,'');
				});
	  
				
			  $rows.each(function(row,v) {
				$(this).find("td").each(function(cell,v) {
				  if (typeof rows[cell] === 'undefined') rows[cell] = [];
				  rows[cell][row] = $.trim($(this).text()).replace(/ /g,'').replace(/\n/g,'');
				  if(cell==19){
					  
					  var _price = 0;
					  for(var i=0 ; i<stockPrice.length ; i++){
					  		if(rows[2][row] == stockPrice[i].name){
								_price = findPoint(stockPrice[i].price);
							}
					  }
					  
					  rows[cell][row] = _price*(rows[15][row] / 100 ) /rows[8][row]*1000;
					  rows[cell][row] = rows[cell][row].toFixed(2);
				  }
				});
			  });
			  
				
			  $rows.each(function(row,v) {
				$(this).find("td").each(function(cell,v) {
				  if(cell==19){
					  $(this).text(rows[cell][row]);
				  }
				});
			  });
};

		 
		 
		function findPoint(price){
			var returnValue = 0;
			if(price>199.99)
			{
				returnValue = 0.2;
			}
			else if(price>99.99)
			{
				returnValue = 0.1;
			}
			else if(price>19.99)
			{
				returnValue = 0.05;
			}
			else if(price>9.99)
			{
				returnValue = 0.02;
			}
			else if(price>0.499)
			{
				returnValue = 0.01;
			}
			else if(price>0.249)
			{
				returnValue = 0.005;
			}
			else if(price>0.01)
			{
				returnValue = 0.001;
			}
			
			return returnValue;
		}  
		 