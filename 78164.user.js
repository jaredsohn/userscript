
// ==UserScript==
// @name           WatchSeries.eu Faster Watching
// @description    This allows you to skip the annoying loading pages of WatchSeries.eu (formally watch-series.com), and 1 click will continue straight to the video. 
// @namespace      http://userscripts.org/users/cobalt
// @include        http://watch-series.com/episode/*
// @include        http://watchseries.eu/episode/*
// @include        http://www.watchseries.eu/episode/*
// ==/UserScript==

var version = "1.2";
var key = "78164";

// select domain selection box
var ele_domain = document.getElementById("dom");

if(ele_domain)
{
	// listen for the selection box being changed
	ele_domain.addEventListener("change", listener_domain);
}

// overwrite current link getting request so that we can make our own in order to be able to parse the information afterwards.
var script = document.createElement("script");
script.innerHTML = "function changedom(){}";
script.type="text/javascript";
document.body.appendChild(script);

// append custom style
var ele_style = document.createElement("style");
ele_style.innerHTML = '.a_link_watch_now:visited { font-style: italic;  }';
document.body.appendChild(ele_style);

// Adds the "View All * Links" link
var ele_viewall = getElementsByInnerHTML("View All ", "a", "View All ".length);
if(ele_viewall.length==1)
{
	ele_viewall = ele_viewall[0];
	ele_viewall.addEventListener("click", listener_domainall);
}

// Function - gets elements based on innerHTML content (text, [node type, [number of characters to cap]])
function getElementsByInnerHTML(innerHTML,eleType,length)
{
	if(!eleType)
	{
		eleType = "*";
	}
	var eles1 = document.getElementsByTagName(eleType);
	var returner = new Array();
	for(i=1;i<eles1.length;i++)
	{
		var ele1 = eles1[i];
		if(length)
		{
			if(ele1.innerHTML.toString().substr(0,length)==innerHTML)
			{
				returner[returner.length] = ele1;
			}
		} else {
			if(ele1.innerHTML == innerHTML)
			{
					returner[returner.length] = ele1;
			}
		}
	}
	return returner;
}

// listener for when the select domain element is changed
function listener_domain(ele)
{
	getLinks();
}

// listener for when the "view all links" is pressed
function listener_domainall(ele)
{
	getLinks(true);
}

// re-creates the function already in the website, to get new links based on new search critieria (all, by domain.. etc)
function getLinks(is_all)
{
	if(!is_all)
		is_all = false;

	if(is_all==true)
	{
		// fixes small bug
		setTimeout(getLinks, 100, "is_all_continue");
		return;
	}

	var episode_id = document.getElementById('idepisod').value;
	var domain = document.getElementById('dom').value;
	
	if(is_all=="is_all_continue")
	{
		domain = "all";
		// reset the select button
		ele_domain.options[0].selected = true;
	}

	GM_xmlhttpRequest({
	    method: 'GET',
	    url: "http://watchseries.eu/getlinks.php?q="+episode_id+"&domain="+domain,
	    headers:
		{
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	    },
	    onload: function(responseDetails)
		{
			if(responseDetails.status!=200)
			{
				//alert("Error "+responseDetails.status+"\nUrl: "+ ele.href+"\nI:"+i);
				alert("request error");
				return;
			} else {
				var text = responseDetails.responseText.toString();
				//alert(text);
				document.getElementById('linktable').innerHTML=text;
				update_start();
			}
	    }
	
	});
}

var eles = false;
var j = 0;

// Function - sets up new elements to parse, based on new data
function update_start()
{
	eles = getElementsByInnerHTML("Watch This Link!","a");
	
	if(eles.length<=0)
	{
		// for some reason, on new data gotten, the text changes from "Watch This Link!" to "Watch online!".
		eles = getElementsByInnerHTML("Watch online!","a");
	}
	j = 0;
	updateIt(j);
}

// we want this to start on page load also
update_start();

// Function - actually parses the links and adds a new button
function updateIt(i)
{
	if(eles[i]==undefined)
	{
		return;
	}
	ele = eles[i];
	href = ele.href;
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: href,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	    },
	    onload: function(responseDetails)
		{
			if(responseDetails.status!=200)
			{
				alert("Error "+responseDetails.status+"\nUrl: "+ ele.href+"\nI:"+i);
			} else {
				var text = responseDetails.responseText.toString();
				var pattern = /\<a href=\"(http\:\/\/watchseries.eu\/gateway\.php\?link=[a-z0-9]+)/gi;
				var results = pattern.exec(text);
				var link_faster = results[1];
				var a = document.createElement("a");
				a.className = "a_link_watch_now";
				a.id = "a_link_watch_now_number_" + i;
				a.href = link_faster;
				a.innerHTML = "Direct Watch";
				a.target = "_blank";
				a.style.borderColor = "#2364a0";
				a.addEventListener('click', listener(a), true);
				ele.parentNode.appendChild(a);
				j++;
				
				ele.style.color="#b6b6b6";
				ele.style.borderColor = "#e2e2e2";
				
				// update the next one:
				updateIt(j);
			}
	    }
	
	});
}

// this adds numbers to buttons clicked
var times_opened = 0;
function listener(ele)
{
	return function ()
	{
		times_opened ++;
		ele.innerHTML += " " + times_opened + "";
		ele.style.fontWeight = "bold";
	}
}

/*
------------------------------------------------------------------
UPDATE SCRIPT CODE
Created by Justin Strawn, http://userscripts.org/users/cobalt
You may use this code for your own script, but only if you also include these lines.
------------------------------------------------------------------
*/
var url_update = "http://sleekupload.com/greasemonkey/update.php?id="+key+"&v="+version;
GM_xmlhttpRequest({
  method: "GET",
  url: url_update,
  onload: function(response) {
var currentversion = unescape(response.responseText);
if(currentversion!=version)
{
var url = prompt("You are using an outdated version of this script!\nYou have version "+version+", and the current version is "+currentversion+"\nPlease navigate to the url below to update:", "http://userscripts.org/scripts/show/"+key);
}
  }
});
