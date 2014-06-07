// ==UserScript==
// @name       RaceDepartment UTC Time
// @namespace  http://denniscoufal.de/
// @version    0.4
// @description  displays utc+0 time inside the header
// @match      http://www.racedepartment.com/*
// @copyright  2013+, Dennis Coufal
// ==/UserScript==


$(function(){
   	var pre="</ul><ul class=\"secondaryContent blockLinksList\" style=\"float: right; margin-right: -270px;\"><li><a href=\"#\">";
   	var post="</a></li>";   
	var wrapper="<span id=\"dcRDTime\"></span> (UTC)";   
   	$("ul.secondaryContent.blockLinksList").append(pre+wrapper+post);  
    dcRefreshTime();
    var intervalID = setInterval(dcRefreshTime, 1000);        
});

function dcRefreshTime() { 
   var date=new Date();
   var dateString=dcLeadingZero(date.getUTCHours())+":"+dcLeadingZero(date.getUTCMinutes())+":"+dcLeadingZero(date.getUTCSeconds());    
   $("#dcRDTime").text(dateString); 
}

function dcLeadingZero(n) {
    var s=n.toString();
    if(s.length==1) {
     s="0"+s;   
    }
    return s;
}