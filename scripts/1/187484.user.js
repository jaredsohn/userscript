// ==UserScript==
// @name       okcoin.market
// @version    0.1
// @description okcoin行情快速刷新
// @match      https://www.okcoin.com/market.do
// @match      http://www.okcoin.com/market.do
// @copyright  2012+, You
// ==/UserScript==

jQuery(document).ready(function(){	   
    //dataKLine(0,3);    
    setInterval(marketEntrustRefresh, "500"); 	    	
    setInterval(marketRecentDealRefresh, "500");	 
});		 

function marketEntrustRefresh(){	   
    var url = "/marketEntrustRefresh.do?random="+Math.round(Math.random()*100);	    
    
    jQuery("#marketEntrust").load(url,function (data){	  
    });	 
}

function marketRecentDealRefresh(){	    
    var url = "/marketRecentDealRefresh.do?random="+Math.round(Math.random()*100);	    
    jQuery("#marketRecent").load(url,function (data){	    	});	  
}