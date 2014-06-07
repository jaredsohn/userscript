// ==UserScript==
// @name       Luqman Energy Saver
// @namespace  http://use.i.E.your.homepagevar idleTime = 0; var standby = false; function CheckInactivity() { idleTime += 10; if(idleTime > 60) { InitializeStandBy(); } } function InitializeStandBy() { if(!standby) { var h = 0; h = jQuery(window).height(); jQuery("#energysaving").show().css({ height: "0", width: "0", left: "50%", top: "50%" }).animate({ width: "100%", height: h, left: "0", top: "0", opacity: "1" }, 1000); standby = true; } } function StopStandBy() { if(standby) { jQuery("#energysaving").animate({ width: "0", height: "0", opacity: "0", left: "50%", top: "50%" }, 500); setTimeout('jQuery("#energysaving").hide();', 800); standby = false; } } document.write('<link rel="stylesheet" href="http://www.onlineleaf.com/savetheenvironment.css" type="text/css" />'); if(typeof(jQuery) == "undefined") { document.write('<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>'); } function InitJQuery() { if(typeof(jQuery) == "undefined") { setTimeout("InitJQuery();", 50); } else { jQuery(function() { jQuery(document).ready(function() { setInterval("CheckInactivity();", 10000); jQuery(this).mousemove(function(e) { idleTime = 0; StopStandBy(); }); jQuery(document).keypress(function(e) { idleTime = 0; StopStandBy(); }); jQuery("body").append('<div id="energysaving"><p>Luqman Energy Saver<br /><span>Move your mouse to go back to the page.</span></p><div id="copyrightOnlineLeaf">Follow <font style="color: #666666; size: 25px;">twitter.com/OnlineLeaf</font><br />Copyright 2012 <font style="color: #666666;">OnlineLeaf.com</font> - All rights reserved</div></div>'); jQuery("#energysaving").hide(); }); }); } } InitJQuery();
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==
var idleTime = 0; var standby = false; function CheckInactivity() { idleTime += 10; if(idleTime > 60) { InitializeStandBy(); } } function InitializeStandBy() {
if(!standby) { var h = 0; h = jQuery(window).height(); jQuery("#energysaving").show().css({ height: "0", width: "0", left: "50%", top: "50%" }).animate({ width: "100%",
height: h, left: "0", top: "0", opacity: "1" }, 1000); standby = true; } } function StopStandBy() { if(standby) { jQuery("#energysaving").animate({ width: "0", height:
"0", opacity: "0", left: "50%", top: "50%" }, 500); setTimeout('jQuery("#energysaving").hide();', 800); standby = false; } } document.write('<link rel="stylesheet" 
href="http://www.onlineleaf.com/savetheenvironment.css" type="text/css" />'); if(typeof(jQuery) == "undefined") { document.write('<script type="text/javascript" 
src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>'); } function InitJQuery() { if(typeof(jQuery) == "und{ 
setTimeout("InitJQuery();", 50); } else { jQuery(function() { jQuery(document).ready(function() { setInterval("CheckInactivity();", 10000); 
jQuery(this).mousemove(function(e) { idleTime = 0; StopStandBy(); }); jQuery(document).keypress(function(e) { idleTime = 0; StopStandBy(); }); 
jQuery("body").append('<div id="energysaving"><p>Luqman Energy Saver<br /><span>Move your cursor to go back to the blog.</span></p><div id="copyrightLuqman Inc">Follow 
<font style="color: #666666; size: 25px;">twitter.com/LuqmanDhappy</font><br />Copyright 2012 <font style="color: #666666;">http://luqmanhakimblog.blogspot.com/</font> - All rights 
reserved 2012</div></div>'); jQuery("#energysaving").hide(); }); }); } } InitJQuery();