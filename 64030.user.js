// ==UserScript==
// @name           twitter scalar
// @namespace      http://twitter.com/*
// @include        http://twitter.com/
// @author         James P Gilbert
// ==/UserScript==

var usersettings = new Array();

unsafeWindow.sizeup = function(who, sz)
{
	var tline = document.getElementById("timeline");
	var statuses = tline.getElementsByClassName("hentry " + who)
	document.cookie = who + "=" + sz;
	for(var s = 0; s < statuses.length; s++)
	{
		var status = statuses[s];
		if(status.className.indexOf(who))
		{
			if(sz == "sm")
			{
				status.style.fontSize = "10px";
				status.style.paddingTop = "2px";
				status.style.paddingBottom = "2px";
				var spans = status.getElementsByTagName("span");
				var thumb = spans[0];
				var sbody = spans[1];
				thumb.style.display = "none";
				sbody.style.marginLeft = "0px";
				sbody.style.minHeight = "0px";
				var timestamp = sbody.getElementsByTagName("span")[2];
				timestamp.style.fontSize = "8px";
			}
			else if(sz == "lg")
			{
				status.style.fontSize = "20px";
				status.style.lineHeight = "22px";
			}
		}
	}	
}

var tline = document.getElementById("timeline");
var statuses = tline.getElementsByClassName("hentry");
for(var s = 0; s < statuses.length; s++)
{
	var status = statuses[s];
	var uname = status.className.split(' ')[1];
	var spans = status.getElementsByTagName("span");
	if(spans.length < 2)
		continue;
	var actions = spans[1].getElementsByTagName("ul")[0];
	var bigger = document.createElement("li");
	bigger.id = "lg_" + uname.substr(2) + "_" + Math.ceil(Math.random() * 9999);
	bigger.innerHTML = "<a onclick=\"sizeup('" + uname + "', 'lg')\" style='margin-left:8px'>bigger</a>";
	actions.appendChild(bigger);
	
	var smaller = document.createElement("li");
	smaller.id = "sm_" + uname + "_" + Math.ceil(Math.random() * 9999);
	smaller.innerHTML = "<a onclick=\"sizeup('"+ uname +"','sm')\" style='margin-left:8px'>smaller</a>";
	actions.appendChild(smaller);
	if(!usersettings[uname] && document.cookie.indexOf(uname) != -1)
	{
		usersettings[uname] = usize;
	}
}

// adjust the tweet sizes by users
for(var u in usersettings)
{
	var cpos = document.cookie.indexOf(u);
	if(cpos != -1)
	{
		var usize = document.cookie.substr(cpos + u.length + 1, 2);
		unsafeWindow.sizeup(u,usize);
	}
}
