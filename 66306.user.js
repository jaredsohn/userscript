// ==UserScript==
// @name           a11y-suggester
// @namespace      www.icaaq.com
// @include        *
// ==/UserScript==
(function() {
	// Add jQuery  
		var GM_JQ = document.createElement('script');  
		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';  
		GM_JQ.type = 'text/javascript';  
		document.getElementsByTagName('head')[0].appendChild(GM_JQ);  

	// Check if jQuery's loaded  
	function GM_wait() {  
		if(typeof unsafeWindow.jQuery == 'undefined') {
			window.setTimeout(GM_wait,100); }  
		else {
			$ = unsafeWindow.jQuery; letsJQuery();
		}  
	}  
	GM_wait();

	// All your GM code must be inside this function  
	function letsJQuery() {
		var timeout;
		if($("body").outerWidth() > 200){
			$(":text").keypress(function(){
				var el = $(this),
					a11y = $("#a11y-suggester");
				if(el.val().length>2){
					if(a11y.length===0){
						a11y = $("<ul id=\"a11y-suggester\"></ul>").css({"position":"fixed","top":0,"right":0,"background":"#fff","fontSize":"20px","color":"blue","paddingLeft":"1em","width":"200px","margin":0,"list-style":"bullet","text-align":"left","border":"blue 2px solid"});
						$("body").append(a11y);
					}else{
						a11y.find("li").remove();
					}
					$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22http%3A%2F%2Fgoogle.com%2Fcomplete%2Fsearch%3Fhl%3Dsv%26output%3Dtoolbar%26q%3D"+el.val()+"%22&format=json&diagnostics=false&callback=?",function(data){
				      	// if there is data, render it out
						if(data.query.results.toplevel){
					        $(data.query.results.toplevel.CompleteSuggestion).each(function() {
								var li = $(document.createElement("LI")).text(this.suggestion.data).click(function() {
									el.val($(this).text());
								}).attr("tabIndex","0");
								a11y.append(li);
					        });
					      // otherwise tell the world that something went wrong
					      } else {
					        	var li = $(document.createElement("LI")).text("Inga förslag");
								a11y.append(li);
					      }
					});
				}
			}).blur(function() {
				if(timeout) {
					clearTimeout(timeout);
				}
				timeout=setTimeout(function() {
					$("#a11y-suggester").fadeOut(200,function(){
						$(this).remove();
					});
				},250);
			}).focus(function() {
				var el = $(this),
					a11y = $("#a11y-suggester");
				if(el.val().length>2){
					if(a11y.length===0){
						a11y = $("<ul id=\"a11y-suggester\"></ul>").css({"position":"fixed","top":0,"right":0,"background":"#fff","fontSize":"20px","color":"blue","paddingLeft":"1em","width":"200px","margin":0,"list-style":"bullet","text-align":"left","border":"blue 2px solid"});
						$("body").append(a11y);
					}else{
						a11y.find("li").remove();
					}
					$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22http%3A%2F%2Fgoogle.com%2Fcomplete%2Fsearch%3Fhl%3Dsv%26output%3Dtoolbar%26q%3D"+el.val()+"%22&format=json&diagnostics=false&callback=?",function(data){
				      	// if there is data, render it out
						if(data.query.results.toplevel){
					        $(data.query.results.toplevel.CompleteSuggestion).each(function() {
								var li = $(document.createElement("LI")).text(this.suggestion.data).click(function() {
									el.val($(this).text());
								}).attr("tabIndex","0");
								a11y.append(li);
					        });
					      // otherwise tell the world that something went wrong
					      } else {
					        	var li = $(document.createElement("LI")).text("Inga förslag");
								a11y.append(li);
					      }
					});
				}
			});
		}
	}	
})();