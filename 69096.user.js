// ==UserScript==
// @name          Google zionismexplained remover
// @namespace     http://www.google.com
// @description	  Removes results for zionismexplained from google. Edit as you wish.
// @include       http://www.google.*/search*
// ==/UserScript==

// This is a modification of the promote wikipedia script found here:
// http://userscripts.org/scripts/show/55641

///// preference section /////

const match_regexp = /^http:\/\/www\.zionismexplained\.org\/.*/;
const searchwiki_demote = true;
const clear_demoted = true;
const req_interval = 500;


///// code section /////

var step = 0;
var queryToken;
var sessionToken;
var req_int_id = [];
const search_term = document.getElementsByName("q")[0].value;

function demote(link, i)
{
	if (step == 0)
	{
		// step 1: request query token and session token
		
		var req = {"applicationId": 19, "queries": [search_term]};
		var data_str = "req=" + JSON.stringify(req);
		
		GM_xmlhttpRequest(
		{
			method: "POST",
			url: "http://www.google.com/reviews/json/sw",
			data: data_str,
			onload: function(response)
			{
				if (response.status = 200)
				{
					const resp = JSON.parse(response.responseText);
					queryToken = resp.queryTokens[0].token;
					sessionToken = resp.channelHeader.token;
					step = 1;
				}
			},
		});
		
		step = 0.5;
	}
	else if (step == 1)
	{
		// step 2: promote via SearchWiki API
		
		var req = {"applicationId": 19, "annotations": [{"entity": {"swUrl": link, "groups": ["W"], "encrypted": queryToken}, "starRating": 1}]};
		var data_str = "req=" + JSON.stringify(req) + "&token=" + sessionToken;

		GM_xmlhttpRequest(
		{
			method: "POST",
			url: "http://www.google.com/reviews/json/write",
			data: data_str,
		});
		
		clearInterval(req_int_id[i]);
	}
}

const res_ol = document.evaluate("//div[@id='res']//ol", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
const res_lis = res_ol.getElementsByTagName("li");
var first_entry = 0;

for (var i = 0; i < res_lis.length; i++)
{
	const curr_li = res_lis[i];
	const curr_a = curr_li.getElementsByClassName("l")[0];
	
	if (!curr_a)
		continue;
	
	// demote if matched entry
	if (curr_a.href.match(match_regexp))
	{	
		if (clear_demoted)
		{
			curr_li.style.setProperty("display", "none", "important");
		}
		
		if (searchwiki_demote)
			req_int_id[i] = setInterval(demote, req_interval, curr_a.href, i);
	}
}