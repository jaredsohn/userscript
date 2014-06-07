// ==UserScript==
// @name       E-sim gold product market
// @namespace  somefun
// @version    0.1
// @description  Blabla script
// @match      http://*.e-sim.org/productMarket*
// @require http://code.jquery.com/jquery-latest.js
// @copyright  2014 Desnoo
// ==/UserScript==

function main(){
    $(document).ready(function(){
		
        //$(document).on("click",function(){
            var countryId = $('#countryId').find(':selected').attr('value');
            $('#container').append('<div id=\"metamm\" style=\"display:none\"></div>');
            $('#metamm').load('/monetaryMarket.html?buyerCurrencyId='+ countryId +'&sellerCurrencyId=0',function(){
                var changecourse = $('#metamm').find('.dataTable').find('tr').eq(1).find('td').eq(2).find('b').text();
                $('.dataTable tr:first').find('td').eq(3).after("<td>Value in Gold</td>");
                var i = true;
            	$('.dataTable').find('tr').each(function(){
                    if(!i){
                        var value = $(this).find('td').eq(3).find('b').text();
                        value = value*changecourse;
                        value = value.toFixed(5);
                        $(this).find('td').eq(3).after("<td>" + value + " Gold <div class=\"flags-small Gold\"></div></td>");
                    }else{
                    	i=false;
                    }
                });
                 $('#metamm').remove();
            });
           
            $(this).unbind();
        //});
    });
    }
// load jQuery and execute the main function
main()