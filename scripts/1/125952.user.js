// ==UserScript==
// @name           Boards.ie - Advanced In-Thread Searching
// @namespace      http://userscripts.org/users/436255
// @description    Allows you to use advanced search on a single thread, including search by username
// @version        1.2
// @icon           http://s3.amazonaws.com/uso_ss/icon/125952/large.png
// @include        http://www.boards.ie/search/advanced.php*
// @include        https://www.boards.ie/search/advanced.php*
// @include        http://www.boards.ie/vbulletin/showthread.php*
// @include        https://www.boards.ie/vbulletin/showthread.php*
// ==/UserScript==

// v1.1 - added direct link from "Advanced Search" on threads
// v1.1a - Testing update functionality of greasemonkey, no changes
// v1.2 - turned off if using new skin

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
if(document.getElementById("user_search_input") != null)
{
	// Updated style, no longer necessary
}
else
{
	var loc = document.location.href;
	var thread = (loc.indexOf("showthread.php") != -1);
	
	if(thread)
	{
		var advsearchlink = document.getElementById("threadsearch_menu").getElementsByTagName("a")[1];
		advsearchlink.href = advsearchlink.href.replace("vbulletin/search.php?searchthreadid=", "search/advanced.php?t=");
	}
	else
	{
		var t = getParameterByName("t");
		if(t != "" && t != 0)
		{
			var form = document.getElementById("q_builder");
			var fieldset = document.createElement("fieldset");
		
			var title = document.createElement("div");
			title.className = "title";
			title.innerHTML = "Search by thread";
		
			var section = document.createElement("div");
			section.className = "section";
		
			var label = document.createElement("label");
			label.style = "text-align:left;";
			label.innerHTML = "Thread Number:";
		
			var input = document.createElement("input");
			input.type="text";
			input.value = t;
			input.name="t";
		
			section.appendChild(label);
			section.appendChild(input);
		
			fieldset.appendChild(title);
			fieldset.appendChild(section);
			form.insertBefore(fieldset, form.getElementsByTagName("fieldset")[0]);
		}
	}
}