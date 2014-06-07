// ==UserScript==
// @name           tf2tp tf2op + bp.tf
// @namespace      Hats are Cool
// @discription    A tweaked version of Jacobisconfused's tf2op + bp.tf script. Works on tf2tp instead :D
// @include        *tf2tp.com/*
// @require	   http://code.jquery.com/jquery-1.7.2.min.js
// @require        http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// @version        0.0.1
// ==/UserScript==
jQuery.noConflict();
(function($){
    $(function () {
        console.log('loading from storage');
        var prices = GM_getValue("backpack.tf prices"),
            timeGot = new Date(parseInt(GM_getValue("backpack.tf time")));
        
        try {
            prices = JSON.parse(prices);
        }
        catch(err)
        {
            prices = null;
        }
        
        if((prices == null || prices == undefined) || (timeGot == null || timeGot.getHours() != new Date().getHours()))
        {
            console.log('getting prices from backpack.tf');
            GM_xmlhttpRequest({
                url: "http://backpack.tf/api/IGetPrices/v2/?format=jsonp&currency=metal",
                method: "GET", 
                onload: function(data) {
                    prices = data.responseText;  
                    GM_setValue("backpack.tf prices",prices);
                    GM_setValue("backpack.tf time", new Date().getTime().toString());
                    prices = JSON.parse(data.responseText);
                    setEvents();
                }});   
        }
        else
            setEvents();
        
        
        
        function setEvents(){  
            $('.itemSized').each(function () {
                if($(this).hasClass('loaded'))
                    return;
                
                $(this).addClass('loaded');
                var itemPrice = convertItemPrice(getItemPricing($(this)));
                if (itemPrice != "0.00 ref")
                    $(this).append('<div id="notit" style="position:absolute; top:1px; left:1px;color:white;opacity:.3;background:red;padding:1px;border-radius:4px;">'+itemPrice+'</div>');
                
            });     
        }
        
        function getItemData($item)
        {
            var id = $item.attr('data-tf2itemid');
            var quality = $item.attr("data-quality");
            var effect = $item.attr("data-particleeffectid");
            var craft = true,
                paint = '',
                craftable = '';       
            var item = new Object;
            item.ItemNum = id;
            item.Quality = quality;
            item.Effect = 0;
            if (effect != undefined)
                item.Effect = effect;
            item.Craftable = craft;
            return item;
        }
        
        function getItemPricing($item)
        {                      
            var currValue = 0;
            try {
                var item = getItemData($item),
                    priceObj = prices.response.prices[item.ItemNum][item.Quality][item.Effect]; 
                
                currValue = priceObj.value;                  
            }
            catch(err) {
                currValue = 0;
            }            
            
            return currValue;
        }
        
        function convertItemPrice(currValue)
        {
            currValue = parseFloat(currValue);
            var currencyValue = ' ref',
                keyPrice = parseFloat(prices.response.prices[5021][6][0].value),
                budPrice = parseFloat(prices.response.prices[143][6][0].value);
            
            if(currValue > budPrice)
            {
                currValue = (currValue / budPrice);
                currencyValue = ' buds';
            }
            else if(currValue > keyPrice)
            {                        
                currValue = (currValue / keyPrice);                                           
                currencyValue = ' keys';
            }     
            return currValue.toFixed(2) + currencyValue;
        }
    });
})(jQuery);
function getString(s, v)
{
    s = s.toLowerCase();
    var p = v.split(',');
    for(var i=0;i<p.length;i++)
    {
        if(s.indexOf(p[i]) > -1)     
        {
            return s.substring(s.indexOf(p[i]));
        }
    }
    return null;
}