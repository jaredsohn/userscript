(function (unsafeWindow) {
// ==UserScript==
// @author         mslliviu 
// @name           MSL Script
// @namespace      MSL
// @description    Linkuri pt erep
// @version        1.0.3
// @include        http://www.erepublik.com/*
// @include        http://economy.erepublik.com/*
// @include        http://static.erepublik.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js
// ==/UserScript==

              var el = document.getElementById('menuText');
        var f1= document.createElement('a');
        f1.setAttribute('href', 'http://www.erepublik.com/en/economy/market/1/1/1/citizen/0/price_asc/1');
        f1.innerHTML = 'Fq1 &nbsp &nbsp';
        el.appendChild(f1);
        
        var f2= document.createElement('a');
        f2.setAttribute('href', 'http://www.erepublik.com/en/economy/market/1/1/2/citizen/0/price_asc/1');
        f2.innerHTML = 'Fq2 &nbsp &nbsp';
        el.appendChild(f2);
        
        var f3= document.createElement('a');
        f3.setAttribute('href', 'http://www.erepublik.com/en/economy/market/1/1/3/citizen/0/price_asc/1');
        f3.innerHTML = 'Fq3 &nbsp &nbsp';
        el.appendChild(f3);
        
        var f4= document.createElement('a');
        f4.setAttribute('href', 'http://www.erepublik.com/en/economy/market/1/1/4/citizen/0/price_asc/1');
        f4.innerHTML = 'Fq4 &nbsp &nbsp';
        el.appendChild(f4);
        
        var f5= document.createElement('a');
        f5.setAttribute('href', 'http://www.erepublik.com/en/economy/market/1/1/5/citizen/0/price_asc/1');
        f5.innerHTML = 'Fq5 &nbsp &nbsp';
        el.appendChild(f5);
        
		var f6= document.createElement('a');
        f6.setAttribute('href', 'http://www.erepublik.com/en/economy/market/1/1/6/citizen/0/price_asc/1');
        f6.innerHTML = 'Fq6 &nbsp &nbsp';
        el.appendChild(f6);
    
		var f7= document.createElement('a');
        f7.setAttribute('href', 'http://www.erepublik.com/en/economy/market/1/1/7/citizen/0/price_asc/1');
        f7.innerHTML = 'Fq7 &nbsp &nbsp';
        el.appendChild(f7);

        var storage= document.createElement('a');
        storage.setAttribute('href', 'http://www.erepublik.com/en/economy/inventory');
        storage.innerHTML = 'Storage &nbsp &nbsp';
        el.appendChild(storage);

        var storage= document.createElement('a');
        storage.setAttribute('href', 'http://www.erepublik.com/en/economy/market/1/7/1/citizen/0/price_asc/1');
        storage.innerHTML = 'FRM &nbsp &nbsp';
        el.appendChild(storage);
   
        var storage= document.createElement('a');
        storage.setAttribute('href', 'http://www.erepublik.com/en/economy/market/1/12/1/citizen/0/price_asc/1');
        storage.innerHTML = 'WRM &nbsp &nbsp';
        el.appendChild(storage);

        var storage= document.createElement('a');
        storage.setAttribute('href', 'http://www.erepublik.com/en/economy/market/1/2/1/citizen/0/price_asc/1');
        storage.innerHTML = 'Wep Q1 &nbsp &nbsp';
        el.appendChild(storage);

        var storage= document.createElement('a');
        storage.setAttribute('href', 'http://www.erepublik.com/en/economy/market/1/2/2/citizen/0/price_asc/1');
        storage.innerHTML = 'Wep Q2 &nbsp &nbsp';
        el.appendChild(storage);
		
		var storage= document.createElement('a');
        storage.setAttribute('href', 'http://www.erepublik.com/en/economy/market/1/2/4/citizen/0/price_asc/1');
        storage.innerHTML = 'Wep Q4 &nbsp &nbsp';
        el.appendChild(storage);
		
        var storage= document.createElement('a');
        storage.setAttribute('href', 'http://www.erepublik.com/en/economy/market/1/2/5/citizen/0/price_asc/1');
        storage.innerHTML = 'Wep Q5 &nbsp &nbsp';
        el.appendChild(storage);
        
		var storage= document.createElement('a');
        storage.setAttribute('href', 'http://www.erepublik.com/en/economy/market/1/2/6/citizen/0/price_asc/1');
        storage.innerHTML = 'Wep Q6 &nbsp &nbsp';
        el.appendChild(storage);

		var storage= document.createElement('a');
        storage.setAttribute('href', 'http://www.erepublik.com/en/economy/market/1/2/7/citizen/0/price_asc/1');
        storage.innerHTML = 'Wep Q7 &nbsp &nbsp';
        el.appendChild(storage);
		
		var storage= document.createElement('a');
        storage.setAttribute('href', 'http://www.erepublik.com/en/economy/job-market/1');
        storage.innerHTML = 'Jobs &nbsp &nbsp';
        el.appendChild(storage);

        //window.alert('AA');
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
addJQuery(Main);

    
    function Main(){
        $('td[class*="m_price"]').each(function() {
                var marketId = $(this).parent().find('.m_buy a').attr('id');
                
                $(this).parent().find('.m_buy').prepend('<a id="allButton_' + marketId + '" title="Select all" class="f_light_blue_big buyOffer" href="javascript:;"><span style="margin-right: 8px; padding-left: 8px;">All</span></a>');
            });
            
        $('a[id^="allButton_"]').click(function() {
                //window.alert($(this).parent().parent().find('.m_stock').text());
                var allAmount = fixString2($(this).parent().parent().find('.m_stock').text());      
                //var allAmount = $(this).parent().parent().find('.m_stock').text();        
                $(this).parent().parent().find('.m_quantity input').attr('value', allAmount);
                
            });
            
    function fixString2(string) {
    string = new String(string);
    string = string.replace(/^\s+|\s+$/g, '');
    string = string.replace(/(\r\n|\n|\r)/gm,"");
    var intIndexOfMatch = string.indexOf("      ");
    while (intIndexOfMatch != -1) {
        string = string.replace( "      ", "    " )
        intIndexOfMatch = string.indexOf( "     " );
    }
    string = string.replace(/   /g, "");
    
    return(string);
}
}
    function fixString2(string) {
    string = new String(string);
    string = string.replace(/^\s+|\s+$/g, '');
    string = string.replace(/(\r\n|\n|\r)/gm,"");
    var intIndexOfMatch = string.indexOf("      ");
    while (intIndexOfMatch != -1) {
        string = string.replace( "      ", "    " )
        intIndexOfMatch = string.indexOf( "     " );
    }
    string = string.replace(/   /g, "");
    
    return(string);
}

})(window);