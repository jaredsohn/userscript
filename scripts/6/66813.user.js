// ==UserScript==
// @name           Hulu - Show airdate
// @namespace      http://userscripts.org
// @description    Display the airdate for videos watched on Hulu, near the top of the page after the season, episode number, and duration.
// @include        http://www.hulu.com/watch/*
// @include        http://www.hulu.com/collections/*
// ==/UserScript==

/* version 2/1/2010 */

var code;
if(document.location.toString().indexOf("watch") > 0)
	code = /hulu.com\/watch\/(\d+)\/?/i.exec(document.location.toString())[1];
else if(/hulu.com\/collections\/\d+\/?$/i.test(document.location.toString()))
	code = /Tag.taggable = {[\r\n\s]*id : (\d+)/ig.exec(document.getElementsByTagName("head")[0].innerHTML)[1];
else if(document.location.toString().indexOf("collections") > 0)
	code = /hulu.com\/collections\/\d+\/(\d+)\/?/i.exec(document.location.toString())[1];
else
	return;

GM_xmlhttpRequest(
{
		method: "GET",
		url: "http://www.hulu.com/videos/info/" + code,
		onload: function(details)
		{
			if(document.getElementById("airdate") != null)
				return;
			var span = document.createElement("span");
			span.id = "airdate";
			var o = eval("(" + details.responseText + ")");
			if(o.air_date != null)
			{
				var d = new Date(o.air_date);
				/* DATE FORMAT!!! */
				span.innerHTML = new Array("Sun ","Mon ","Tue ","Wed ","Thu ","Fri ","Sat ")[d.getDay()] + (d.getMonth()+1).toString() + "/" + d.getDate().toString() + "/" + d.getFullYear().toString();
				/* ************** */
			}
			else
			{
				span.innerHTML = "?";
			}
			
			var spacer = document.createElement("span");
			spacer.innerHTML = "|";
			spacer.className = "details-spacer";
			
			var temp;
			if(temp = document.getElementById("star-rating-container"))
			{
				temp.parentNode.insertBefore(span, temp);
				temp.parentNode.insertBefore(spacer, temp);
			}
			else
			{
				temp = document.getElementsByClassName("description-shift")[1];
				temp.appendChild(span);
				temp.insertBefore(spacer, span);
			}
		}
});
