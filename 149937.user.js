// ==UserScript==
// @name           tf2op + bp.tf
// @namespace      jacobisconfused+BradPitt
// @include        *tf2outpost.com/*
// @require            http://code.jquery.com/jquery-1.7.2.min.js
// @require        http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// @version        0.0.3
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
       
        $('.tools').each(function(){
            var profileLink = $(this).find('.profile').attr('href').split('/')[4];
            $(this).find('.backpack').attr('href', 'http://backpack.tf/id/' + profileLink).attr('target', '_blank');
        })
       
        $('#heading').each(function(){
            var profileLink = $(this).find('a')[0].toString().split('/')[4];
            $(this).find('#tools').append('<a href="http://www.backpack.tf/id/' + profileLink + '" class="backpack">BP.TF</a>');
        })      
       
        $('body').append('<form id="outpost" target="_blank" action="http://www.tf2outpost.com/search" method="post" style="display:none;">' +
            '<input type="hidden" id="op_has1" name="has1">' +
            '<input type="hidden" id="op_type" name="type" value="any">' +
            '<input type="hidden" id="op_filters" name="filters" value="any">' +
            '<input type="submit" id="op_submit" name="submit" value="" class="searchicon">' +
            '</form>');        
       
        $('#header').css({
            position: 'fixed',
            width: '98%',
            'z-index': '3'
        });
       
        $('.main').css({
            'padding-top': '77px'
        });
       
        var alreadyloading = false;
        //var $pagination = $('.pagination').hide();        
        var $pagination = $('#pagination');
        $(window).scroll(function(e) {            
            if (($(window).innerHeight() + $(window).scrollTop()) >=  $('.main').innerHeight() - 150) {          
                if (alreadyloading == false) {
                    var $nextPage = $pagination.find('.selected').next('a');
                    if($nextPage.length) {
                        $pagination.find('a').removeClass('selected');
                        alreadyloading = true;    
                       
                        $pagination.before('<div id="search" class="loadingContainer" style="padding:0;"><div class="bar" style="position:relative;width: 125px;height: 24px;"><span id="loading" class="cream" style="position:relative;width:90px;display: none; background-color: rgb(0, 0, 0); left: 0px; top: 0px; background-position: initial initial; background-repeat: initial initial; ">Loading...  </span></div></div>');
                                           
                        $('#loading').stop().fadeIn(300);
                       
                        var url = 'http://www.tf2outpost.com' + $nextPage.attr('href');                      
                         GM_xmlhttpRequest({
                            url: url,
                            method: "GET",
                            onload: function(data) {
                                $pagination.before('<hr/>');
                                $pagination.before($(data.responseText).find('.trade'));
                                setEvents();
                               
                                alreadyloading = false;
                                $('#loading').stop().fadeOut(500);
                                $('.loadingContainer').remove();
                               
                                $nextPage.addClass('selected');
                            }});                          
                    }
                }
            }
        });
               
        function setEvents(){
               
            $('.trade').each(function(){  
                if($(this).hasClass('loaded'))
                    return;
                $(this).addClass('loaded');
               
                var notes = $(this).find('.notes').text(),
                    offering = $(this).find('.four-column:first');
               
                var total = 0;
                offering.find('.item').each(function(){
                    if(!$(this).hasClass('deleted'))
                        total += parseFloat(getItemPricing($(this)));
                });
                total = convertItemPrice(total);
                $(this).find('.caption').append('<span class="strange">~=' + total + '</span>');
               
                // try to find b/o,bo,
                var bo = getString(notes, 'b/o, bo:, bo-');  
                if(bo != null)
                {
                    bo = bo.replace('pure', 'bud');
                    if(bo.indexOf('bud') > -1)
                    {
                        var r = /\d+\.?\d*/;
                        var matches = bo.match(r);
                        if(matches){
                            var actualBO = parseFloat(matches[0]);    
                            //if(actualBO <= 2.10)
                              //  $(this).hide();
                            $(this).find('.caption').append(' - <span class="unique">BO ~=' + actualBO + ' bud</span>');
                        }
                    }                      
                    else if(bo.indexOf('key') > -1)
                    {
                        var r = /\d+\.?\d*/;
                        var matches = bo.match(r);
                        if(matches){
                            var actualBO = parseFloat(matches[0]);
                            $(this).find('.caption').append(' - <span class="unique">BO ~=' + actualBO + ' key</span>');
                        }
                    }
                }
            })
               
            $('.item').each(function () {
                if($(this).hasClass('loaded'))
                    return;
               
                $(this).addClass('loaded');
                var itemPrice = convertItemPrice(getItemPricing($(this)));      
                if(itemPrice != '0.00 ref') {
                    $(this).prepend('<span class="notification" style="background:#AF1313">' + itemPrice + '</span>');
                    $(this).one('mouseenter',function () {                                
                        $(this).children('.details').append('<br/> ' + itemPrice);                      
                    });
                }
               
                $(this).find('.fancybox')
                    .after('<a href="#" class="searchOPitem sprite find" style="position: absolute;top: 0px;">' +
                            '<img src="/images/icons/summary/search.png" width="16" height="16" alt=""></a>');
                $('.searchOPitem').click(function(e) {
                    e.preventDefault();                    
                    searchItem($(this).closest('.item'));
                });
            });    
        }
       
        function getItemData($item)
        {
            var itemData = $item.attr('data-hash'),
                searchData = $item.attr('search');
           
            if(itemData == null || itemData == undefined)
                return;
           
            var splitData = itemData.split(',');
           
            var effect = '',
                craft = true,
                paint = '',
                craftable = '';
           
            if(searchData != null && searchData != undefined)
            {
                var merp = searchData.split(';');
                if(splitData[2] == 5)
                {
                    for(var i=0;i<merp.length;i++)
                    {
                        var p = merp[i].split(':');
                        if(p != null && p.length==2 && p[0]=="effect")
                        {
                            effect = p[1];
                            break;
                        }
                    }
                }
               
                for(var i=0;i<merp.length;i++)
                {
                    var p = merp[i].split(':');
                    if(p != null && p.length==2 && p[0]=="craftable")
                    {
                        craft = false;
                        break;
                    }
                }
                paint="";
                for(var i=0;i<merp.length;i++)
                {
                    var p = merp[i].split(':');
                    if(p != null && p.length==2 && p[0]=="paint")
                    {
                        paint = p[1];
                        break;
                    }
                }            
            }      
           
            var item = new Object;
            item.ItemNum = splitData[1];
            item.Quality = (craft == false) ? "600" : splitData[2];
            item.Effect = (effect != '') ? effect : 0;  
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
       
        function searchItem($item){  
            var item = getItemData($item);
           
            $('#outpost #op_has1').val('440,'+item.ItemNum+','+item.Quality);
            var filters='';
           
            if(item.Effect!=0 && item.Quality!=6)
                filters='effect:'+item.Effect;
            else if(item.Effect!=0 && item.Quality==6)
                filters='series:'+item.Effect;
            else
            {
                if(item.Craftable)
                    filters='craftable:false';
                else
                    filters='craftable:true';
            }
           
            $('#outpost #op_filters').val(filters);
            $('#outpost #op_submit').click();  
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