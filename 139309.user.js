// ==UserScript==
// @name           Roumen quality filter
// @version        0.3
// @include        http://kecy.roumen.cz/
// @include        http://www.rouming.cz/
// @grant       none
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
 
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();
 
function letsJQuery() {
var i = 1;
	$(".roumingList>table>tbody>tr").each(function(){
		var node = $($(this).find("td")[2]);
		var posted = node.prev().html();
		var date = posted.split(":");
		
		var coeff = 1;
		if(date.length == 2)
		{
			var timediff = (new Date().getHours()) - parseInt(date[0]);

			if(timediff < 2)
			{
				coeff = 3;
			} 
			else if(timediff < 4)
			{
				coeff = 2;
			} 
			else if(timediff < 6)
			{
				coeff = 1.5;
			}
			else if(timediff < 8)
			{
				coeff = 1.2;
			}
		}
		var comments = $($(this).find("td")[2]).find("a").html();

		node = node.next();
		var like = node.find("font").html();
		node = node.next().next();
		var dislike = node.find("font").html();

		node = node.next();
		var quality = Math.round(coeff*(parseInt(comments)+parseInt(like)-parseInt(dislike)));
		node.html("&nbsp;"+quality);

		var color = "#ff0000";
		var size = "50%";

		if(quality < 0 && dislike > 5 && i > 1)
		{
			//$(this).hide();
			//return;
		}
		if (quality < 10)
		{
			color = "#ff0000";
			size = "50%";
		}
		else if(quality < 20)
		{
			color = "#FF6600";
			size = "60%";
		}
		else if(quality < 30)
		{
			color = "#FFCC00";
			size = "70%";
		}
		else if(quality < 40)
		{
			color = "#FFFF00";
			size = "80%";
		}
		else if(quality < 50)
		{
			color = "#CCFF00";
			size = "100%";
		}
		else if(quality < 60)
		{
			color = "#99FF00";
			size = "120%";
		}
		else
		{
			color = "#00FF00";
			size = "130%";
		}
    
    
    
		node.next().find("a")
			.addClass("imgLink")
			.css("color", color)
			.css("font-size", size);
	  i = i + 1;
	});  
  
  $("iframe").hide();
  $("body").prepend("<style type='text/css'>.roumingList a.imgLink:link {outline: 1px dotted;}  .roumingList a.imgLink:visited {outline: 0px solid black; } body.roumingBody{background-color: black;}</style>");
}