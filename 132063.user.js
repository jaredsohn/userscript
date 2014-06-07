// ==UserScript==                
// @name          TopCoder PACTs Summary test                          
// @description   Summary PACTs per Payment Status                
// @include       http://community.topcoder.com/PactsMemberServlet?module=PaymentHistory*          
// ==/UserScript==               
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();


// *** put your code inside letsJQuery: ***
function letsJQuery()
{
    $(document).ready(function () {
        
        Number.prototype.toMoney = function(decimals, decimal_sep, thousands_sep)                          
            {                                
               var n = this,                 
               c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal                               
               d = decimal_sep || ',', //if no decimal separetor is passed we use the comma as default decimal separator (we MUST use a decimal separator)                       
            
               /*                            
               according to [http://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]                              
               the fastest way to check for not defined parameter is to use typeof value === 'undefined'       
               rather than doing value === undefined.                         
               */                            
               t = (typeof thousands_sep === 'undefined') ? '.' : thousands_sep, //if you don't want ot use a thousands separator you can pass empty string as thousands_sep value                                
            
               sign = (n < 0) ? '-' : '',    
            
               //extracting the absolute value of the integer part of the number and converting to string      
               i = parseInt(n = Math.abs(n).toFixed(c)) + '',                 
            
               j = ((j = i.length) > 3) ? j % 3 : 0;                          
               return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');               
            }                                
            
            
            /* payment status types */       
            var types = [];                  
            var sum = {};                    
            var grandtotal = 0;              
            
            window.pacts_summary = function() {                               
            
                    var dec_sep = '.';       
            
            	/* Get types */              
            	$('table.stat tr:gt(1)').each(function() {                    
            	   var payment = $.trim($(this).children('td:eq(3)').text()); 
            	   var type = $.trim($(this).children('td:eq(4)').text());    
            	   if(types.indexOf(type) == -1 && type!='' && type!='Contest Type') {                         
            		   types.push(type);     
            		   sum[type] = 0;        
            	   }                         
            
                       dec_sep = payment.substring(payment.length - 3, payment.length - 2);                    
            	                             
            	   var paymentVal = parseInt(payment.replace('.','').replace(',','').replace(' ','').replace('$','')) / 100;                    
            	                             
            	   sum[type] += paymentVal;	 
                       grandtotal += paymentVal;                              
            	});                          
            	                             
                    var th_sep = (dec_sep == '.') ? ',' : '.';                
            
            
            	var tablebody = $('table.stat tbody');                        
            	tablebody.append('<tr><td class="title" colspan="6">Summary</td></tr>');                       
            	tablebody.append('<tr><td class="header">Status</td>' +       
            					 '<td class="header" colspan="5">Total</td></tr>');                            
            
                    var last_i = 0;          
            	$.each(types, function(i, type) {                             
            		tablebody.append('<tr class=' + ((i % 2 == 0) ? 'light' : 'dark') + '><td>' + type + '</td>' +                              
            				 '<td colspan="5">$ ' + sum[type].toMoney(2, dec_sep, th_sep) + '</td></tr>');     
                            last_i = i;      
            	});                          
            
            	tablebody.append('<tr class=' + (((last_i + 1) % 2 == 0) ? 'light' : 'dark') + '><td>Grand Total</td>' +                        
                                     '<td colspan="5">$ ' + grandtotal.toMoney(2, dec_sep, th_sep) + '</td></tr>');                             
            }                                
            
            
            
            window.pacts_summary();          
        
    });
}
