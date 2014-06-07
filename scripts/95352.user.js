// ==UserScript==
// @name           Toolbar Alliance
// @namespace      http://www.semanatranca.com/
// @description    Toolbar de alianza
// @include        http://s*.ikariam.*/index.php*
// @include        http://s*.*.ikariam.*/index.php*
// ==/UserScript==



var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');			
								GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';
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
						$(document).ready(function() {
						
            //letsJQuery();
            //TOOLBAR CSS BOF
            GM_addStyle(".message_chat li:nth-child(even) { background:#FAEAC6;}");
            GM_addStyle("#chatMessages li { border-bottom:1px dotted #E4B873;padding:5px 0px;}");
						GM_addStyle("#toolbar { background:#FAEAC6; width:95%;height:auto;padding:10px 20px;border:1px solid #542C0F;}");
						GM_addStyle("#toolbar a { margin-right:10px; }");
						//TOOLBAR CSS EOF

						//TOOLBAR JQUERY /            
						$(".buildingDescription p").before('<div id="toolbar">'+
							'<a href="javascript:" onclick=\'alert("Muy pronto!!!")\' class="button">MAPA PRAPK</a>');
						//TOOLBAR JQUERY EOF
						})
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
        alert($); // check if the dollar (jquery) function works
        alert($().jquery); // check jQuery version
    }


//Toolbar


function toolbar(){
  
}