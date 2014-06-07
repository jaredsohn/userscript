// ==UserScript==
// @name           IDG - Top 100
// @namespace      http://www.tuwe.se/IDG
// @description    Adds AJAX-functionality to the IDG.se top 100 webpage (http://idg.se/2.1121).
// @include        http://*idg.se/2.1121
// ==/UserScript==
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All GM code must be inside this function
    function letsJQuery() {
	$('.divNewslistWideContainer').find("a").each(function(){
		if($(this).attr("href").indexOf("http") < 0){
			$(this).click(function(){
				var $linkObject = $(this);
				if($linkObject.parent().find(".gmDiv").length > 0){
					$linkObject.parent().find(".gmDiv").remove();
				}
				else{
					$.ajax({ 
						url: $(this).attr("href"),
						beforeSend: function(){
							$linkObject.parent().append("<div class='gmLoad'><h4>Loading...</h4></div>");
						},
						success: function(msg){
							var startIndex = msg.indexOf("articleBody") + 13;
							var stopIndex = msg.indexOf("div", startIndex);
							$linkObject.parent().find(".gmLoad").remove();	     							
							$linkObject.parent().append("<div class='gmDiv'>" + msg.substring(startIndex, stopIndex) + "</div>");
							$linkObject.parent().find(".gmDiv").css("font-size", 14).css("color", "black").css("font-face", "verdana"); 			
						}
					 });
				}
				return false;		
			});
		}
	});
    }
