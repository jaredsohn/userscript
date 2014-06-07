// ==UserScript==
// @name        Errorize
// @namespace   net.pastaf
// @description In a CloudBees output : colorize suspicious lines
// @include     https://*.ci.cloudbees.com/job/*/console*
// @version     1
// @grant       none
// ==/UserScript==

//GM_addStyle(".colorized{ background-color: white; } .errorized{ background-color: red; }  .warnized{background-color: #F90;}");

var errorWords = ["error", "forbidden", "cannot", "could not", "impossible", "fail", "abort", "panic", "crash"];
var warningWords = ["warn", "todo", "fixed", "retry", "not found"];
	
(function($){
 var pre = $("pre");
 pre.replaceWith(function(){
	var lines = $(this).html();
	var lines = "<span class=\"line\">" + lines.replace(/\n/g,"</span>\n<span class=\"line\">") + "</span>";
	return $("<pre class=\"colorized\">" + lines + "</pre>");
 });
 $(".line").each(function(){
	var line = $(this).html();
	var done = false;
	for(i = 0; i < errorWords.length; ++i){
    	if( line.toLowerCase().search(errorWords[i]) != -1 ){
   	   	  $(this).addClass("errorized");
		  $(this).css("background-color", "#F77");
		  done = true;
		}
	}
	for(i = 0; !done && i < warningWords.length; ++i){
       	 if( line.toLowerCase().search(warningWords[i]) != -1 ){
	 	     $(this).addClass("warnized");
		     $(this).css("background-color", "#FC5");
		     done = true;
		 }
	}
 });
})(jQuery);
 