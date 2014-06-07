// ==UserScript==
// @name         What.CD Status checker
// @namespace    http://what.cd/
// @include      http://what.cd/*
// @include      https://ssl.what.cd/*
// @exclude      http://what.cd/login.php
// @exclude      https://ssl.what.cd/login.php
// @author       BloodPhilia
// @description  Display warning when What.cd Tracker and/or IRC are down.
// @version      1.2
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main(){
var $j = jQuery.noConflict();
function setCookie(name,value,days,extra) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

$j('body').append('<div id="statusWarning" style="line-height: 1.3; position: absolute; top: 0; right: 25px; z-index: 99; background: #fff; padding: 15px 20px 15px 20px; display: none; cursor: pointer;"><img style="float: left; padding: 0 20px 15px 0;" alt="Warning" src="http://i.imgur.com/adBTD.png"><div><span style="color: #000; font-size: 80%; float: right;">More information and statistics can be found on <a href="http://whatstatus.info/stats.php" target="_blank">Whatstatus.info</a></div></div>');
$j('div#statusWarning').click(function(){ 
	$j('div#statusWarning').fadeToggle();
	setCookie("warningDismissed","TRUE","1");
});
	$j.getJSON("https://whatstatus.info/json.php?callback=?",
		function(data){
			function getCookie(c_name){
				if (document.cookie.length>0){
				c_start=document.cookie.indexOf(c_name + "=");
					if (c_start!=-1){
						c_start=c_start + c_name.length+1;
						c_end=document.cookie.indexOf(";",c_start);
						if (c_end==-1) c_end=document.cookie.length;
						return unescape(document.cookie.substring(c_start,c_end));
					}
				}
				return "";
			}
		
			var i = 0;
			if(data['status']['tracker'] != "up" && getCookie("warningDismissed") != "TRUE"){
				$j('div#statusWarning div').prepend('<span style="color: #f00; font-weight: bold;">The Tracker currently seems to be down so you may be experiencing some issues!</stong><br />');
				i++;				
			}
			if(data['status']['irc'] != "up" && getCookie("warningDismissed") != "TRUE"){
				$j('div#statusWarning div').prepend('<span style="color: #f00; font-weight: bold;">The IRC-server currently seems to be down so you may be experiencing some issues!</stong><br />');
				i++;
			}
			if(i>0){
				$j('div#statusWarning').fadeToggle();
			}
		});
}

addJQuery(main);