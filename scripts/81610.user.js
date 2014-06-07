// ==UserScript==
// @name           ga-funnel-exit-percentage
// @namespace      spanishgringo
// @author        Michael Freeman (spanishgringo.blogspot.com)
// @description    Add Abandonment % Values to Goal Funnels
// @include        https://www.google.com/analytics/reporting/goal_funnel*
// ==/UserScript==

//the code to add jQuery library as a base platform is from http://joanpiedra.com/jquery/greasemonkey/
// the code in function letsJQuery() is the script logic for the userscript

// Add jQuery
var $;
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
         
		 
		 
		  var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            //GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
		
/*			
			GM_JQUI = document.createElement('script');
            GM_JQUI.src = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js';
            GM_JQUI.type = 'text/javascript';
            GM_JQUI.async = true;
    
            GM_Head.insertBefore(GM_JQUI, GM_Head.lastChild);
*/
			}
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 110);
        } else {
            jQuery = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {

	jQuery(".funnel td.abandon table td").not(".text").each(function(){
	var num = parseInt(jQuery(this).text().replace(",",""));
	//console.log(num);
	var whole = 
	jQuery(this).closest(".abandon").prev().find("h3");
	jQuery("span",whole).remove();
	whole = parseInt(jQuery(whole).text().replace(/\.|,/gi,""));

	var num2 = (Math.round((num/whole)*1000)/10)+"%";
	console.log(num2);
	jQuery("<td>"+num2+"</td>").insertAfter(this);
	});

}