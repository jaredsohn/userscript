// ==UserScript==
// @name       Clickcritters.com Bot
// @namespace  http://www.clickcritters.com
// @version    4
// @include    http://*.clickcritters.*/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// ==/UserScript==

function data() {var c_value = document.cookie; var c_start = c_value.indexOf(" " + "ClickCritters_User" + "="); if (c_start == -1) {c_start = c_value.indexOf("ClickCritters_User" + "="); } if (c_start == -1) {c_value = null; } else {c_start = c_value.indexOf("=", c_start) + 1; var c_end = c_value.indexOf(";", c_start); if (c_end == -1) {c_end = c_value.length; } c_value = unescape(c_value.substring(c_start,c_end)); } return c_value; }

// ===================
// ==Weekly Giveaway==
body = document.body;
if(body != null) {
    div = document.createElement("div");
    div.setAttribute('id','Adopt');
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "125px"; 
    div.style.opacity= 0.90;
    div.style.bottom = "+62px";
    div.style.left = "+6px";
    div.style.backgroundColor = "#eceff5";
    div.style.border = "1px solid #94a3c4";
    div.style.padding = "2px";
    div.innerHTML = "<img src='http://www.clickcritters.com/favicon.ico' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='Giveaway()'>Weekly Giveaway</a>";
    
    body.appendChild(div);
    
    unsafeWindow.Giveaway = function() {
    jQuery.ajax({
		url: "http://clickcrittersbot.p.ht/weeklygiveaway.php",
		type: "GET",
		data: {"user":data()},
        success: function(data){ alert(data);}
	});
		
    };
}
// ==============
// ==Adopt All==
body = document.body;
if(body != null) {
    div = document.createElement("div");
    div.setAttribute('id','Adopt');
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "125px"; 
    div.style.opacity= 0.90;
    div.style.bottom = "+42px";
    div.style.left = "+6px";
    div.style.backgroundColor = "#eceff5";
    div.style.border = "1px solid #94a3c4";
    div.style.padding = "2px";
    div.innerHTML = "<img src='http://www.clickcritters.com/favicon.ico' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='Adopt()'>Adopt All!</a>";
    
    body.appendChild(div);
    
    unsafeWindow.Adopt = function() {
    jQuery.ajax({
		url: "http://clickcrittersbot.p.ht/AdoptAll.php",
		type: "GET",
		data: {"user":data()},
        success: function(data){ alert(data);}
	});
		
    };
}