// ==UserScript==
// @name           Drupal Collapsible Message
// @namespace      Drupal_Collapsible_Message
// @include        *
// ==/UserScript==

	var $;
	// Add jQuery
	(function(){
		if (typeof unsafeWindow.jQuery == 'undefined') {
			var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement
			var GM_JQ = document.createElement('script');
			GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
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
            Drupal_Set_Message_Collapsible();
        }
    }

	function Drupal_Set_Message_Collapsible() {
		//Add Styles to head
		var head, style;
		head = document.getElementsByTagName('head')[0];
    	if (!head) { return; }
    	style = document.createElement('style');
    	style.type = 'text/css';
    	style.innerHTML = '.AnthonyLeachCollasible_header { width:100%; background:#CCC; cursor:pointer; border-bottom:1px solid #AAA; }';
        style.innerHTML += '.AnthonyLeachCollasible_header span { padding:10px 0px 10px 10px; font-size:12px; line-height:2em; }';
        style.innerHTML += '.AnthonyLeachCollasible_header span#AnthonyLeachCollasible_collapsebutton { font-size:16px; line-height:2em; }';
        style.innerHTML += '.AnthonyLeachCollasible_collapsible { margin-bottom:10px; }';
    	head.appendChild(style);
        //Wrap drupals_set_message div with a div
        $("div.messages.status").wrap("<div class='AnthonyLeachCollasible_collapsible' />");
        //Set up the header div
        $("div.messages.status").before("<div class='AnthonyLeachCollasible_header'><span>Drupal Set Message Contents</span><span id='AnthonyLeachCollasible_collapsebutton'>+</span>");
        //Hide the message on init
        $("div.messages.status").hide();
		$("div.AnthonyLeachCollasible_header").bind("click", function() {
			//on click of header toggle button text '-' or '+' and slide open or closed
			$(this).children("span#AnthonyLeachCollasible_collapsebutton").html(($(this).children("span#AnthonyLeachCollasible_collapsebutton").html()=="+")?"-":"+");
			$(this).next("div.messages.status").slideToggle(250);
		});
	}