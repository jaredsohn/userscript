// ==UserScript==
// @name           Vegzetur toplita
// @namespace      titan
// @include        http://www.vegzetur.hu/index.php?m=toplistak*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';

var GM_JQ1 = document.createElement('script');
GM_JQ1.src = 'http://jqueryui.com/latest/ui/ui.core.js';
GM_JQ1.type = 'text/javascript';

var GM_JQ2 = document.createElement('script');
GM_JQ2.src = 'http://jqueryui.com/latest/ui/ui.draggable.js';
GM_JQ2.type = 'text/javascript';

var GM_JQ3 = document.createElement('script');
GM_JQ3.src = 'http://jqueryjs.googlecode.com/svn/trunk/plugins/selectboxes/jquery.selectboxes.min.js';
GM_JQ3.type = 'text/javascript';

document.getElementsByTagName('head')[0].appendChild(GM_JQ);
document.getElementsByTagName('head')[0].appendChild(GM_JQ1);
document.getElementsByTagName('head')[0].appendChild(GM_JQ2);
document.getElementsByTagName('head')[0].appendChild(GM_JQ3);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function _createDiv(){
$('input[name="ellenfel"]').parent().after('<table><tr><td align="right"><b>Negativ LE diff:</b></td><td><select id="negativlediff_select" name="beleptetoUS"></select></td></tr></table>');
}


// All your GM code must be inside this function
function letsJQuery() {

    $(document).ready(function(){
    
    	_createDiv();
    	
    	$('#negativlediff_select').addOption('nincs','Nincs szures');
    	$('#negativlediff_select').addOption('eltuntet','Tobbit eltuntet');
    	$('#negativlediff_select').addOption('kiemel','Kiemel');
    	$('#negativlediff_select').val('nincs');
    	
    	
    	$('#negativlediff_select').change(function(){

			szuro_val = this.value;
        	i = 0;    
        	$('.toplista tbody tr').each(function() {
            	i++;
            	var num  = $(this).children(':eq(0)').text();
            	var horda = $(this).children(':eq(3)').text();
            	var lediff = $(this).children(':eq(7)').text();
            	console.log(num);            
            
            	if(szuro_val == 'eltuntet'){
            		// - LEdiff-re figyelni           
            		if (lediff[0] == '-') {              
              			$(this).css('backgroundColor', '');
            		} else if (i>2)  {
             			$(this).css('visibility', 'hidden');
            		}
            	} else if(szuro_val == 'kiemel'){
            		// - LEdiff-re figyelni           
            		if (lediff[0] == '-') {              
              			$(this).css('backgroundColor', '#FF0000');
            		} else if (i>2)  {
             			$(this).css('visibility', 'visible');
            		}  
            	} else {
            		// - LEdiff-re figyelni           
            		if (lediff[0] == '-') {              
              			$(this).css('backgroundColor', '');
            		} else if (i>2)  {
             			$(this).css('visibility', 'visible');
            		}
            	}
            	
        	});

		})
            


        
    });
    
}