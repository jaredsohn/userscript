// ==UserScript==
// @name        ProjetRAIDS Chrome Version
// @namespace   ProjetRAIDS Chrome Version
// @description ProjetRAIDS Chrome Version
// @include     http://www.worldofstargate.fr/*
// @version     1
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.js
// ==/UserScript==


   
     
	function addJQuery(callback) {
	  var script = document.createElement("script");
	  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}
	
	// the guts of this userscript
	function main() {
		   var ongletRAIDS = '<div style="width: 113px; height: 33px; float: left; background: none repeat scroll 0% 0% transparent;" onmouseout="$(this).css(\"background\", \"transparent\");" onmouseover="$(this).css(\"background\", \"url(http://static.worldofstargate.fr/wosv2/button_hover.png) no-repeat\");>';
		  jQ.getJSON('ajax.php', {'page' : 'chat', 'action' : 'get', 'type' : 'new'}, function(data){
			var name = data.userinfo.login;
			console.log(name);
			data.userlist[0].forEach(function(user){
				if(name === user.login)
					point = ((user.global_points.substring(0,user.global_points.length-3))*0.4).toString().split(".")[0];
			});
			ongletRAIDS +='<a href="http://www.worldofstargate.fr/index.php?action=Appliquer+les+filtres&atk_op=&atk_value=&exp_op=&exp_value=&points_op=%3E&points_value='+point+'&advanced=1&page=search&player="> <img style="margin-top:9px" src="http://imageshack.com/a/img811/4113/pcau.png"></img></a>';  
			ongletRAIDS += '</div>';
			jQ('#bar_top').append(ongletRAIDS);
		}); 
	}

	addJQuery(main); 
 
    

