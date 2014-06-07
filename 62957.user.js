// ==UserScript==
// @name           Includes : Orkut [BETA]
// @namespace      http://gm.wesley.eti.br/includes/orkut
// @description    Orkut Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009, w35l3y (http://gm.wesley.eti.br/includes)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes
// @version        1.0.2.0
// @language       en
// @include        http://www.orkut.tld/*
// @exclude        http://www.orkut.tld/Main#*
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/54389.user.js
// @require        http://userscripts.org/scripts/source/54987.user.js
// ==/UserScript==

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

WinConfig.loadDefaultCss();
Orkut = function(){};
Orkut._submit = function(params)
{
	params.parameters["Action." + params.action] = "Submit";
	params.parameters.POST_TOKEN = unsafeWindow.JSHDF["CGI.POST_TOKEN"];
	params.parameters.signature = unsafeWindow.JSHDF["Page.signature.raw"];
	
	if (!params.url)
	{
		params.url = "/Main";
	}
	params.url = "http://" + location.host + params.url;
	
	HttpRequest.open({
		"url" : params.url,
		"method" : "post",
		"onsuccess" : function recursive(params)
		{
			var d = params.response.xml;

			var obj = {
				"message" : (d.evaluate("id('statusMsgBody')|//msg[1]", d, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue).textContent,
				"response" : params.response
			};

			if (d.evaluate("id('captchaTextbox')", d, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue)
			{
				WinConfig.init({
					"title" : "Captcha",
					"type" : "prompt",
					"description" : "<img src='/CaptchaImage?xid=" + Math.random() + "' /><br /><br />" + obj.message,
					"positiveCallback" : function(w, e)
					{
						params.submit.parameters.cs = e.form.elements.namedItem("text").value;

						w.FadeOut(0);

						HttpRequest.open({
							"url" : params.submit.url,
							"method" : "post",
							"onsuccess" : recursive,
							"parameters" : { "submit" : params.submit, "time" : 0 }
						}).send(params.submit.parameters);
					}
				}).Open().FadeIn();
			}
			else if (obj.message.replace(/\s+/g, ""))
				WinConfig.init({
					"title" : "Error",
					"type" : "error",
					"description" : "<br />" + obj.message,
					"positiveCallback" : function(w, e)
					{
						w.FadeOut(0);

						obj.error = true;
						params.submit.callback(obj);
					}
				}).Open().FadeIn();
			else
			{
				obj.error = false;
				setTimeout(params.submit.callback, params.time, obj);
			}
		},
		"parameters" : { "submit" : params, "time" : 1000 }
	}).send(params.parameters);
};
Orkut.Community = function(){};
Orkut.Community.Member = function(){};
Orkut.Community.Member._submit = function(params)
{
	if (!params.url)
	{
		var cmm = params.parameters.cmm || params.parameters.commId || location.search.match(/\bcmm=(\d+)\b/) && RegExp.$1;
		var uid = params.parameters.uid || location.search.match(/\buid=(\d+)\b/) && RegExp.$1;

		switch (params.action)
		{
			case "doDeletePosts":
			case "ban":
			case "boot":
				params.url = "/CommMemberManage?cmm=" + cmm + "&uid=" + uid;
				break;
		}
	}

	Orkut._submit(params);
};
Orkut.Community.Member.boot = function(params)
{
	params.action = "boot";

	Orkut.Community.Member._submit(params);
};
Orkut.Community.Member.ban = function(params)
{
	params.action = "ban";

	Orkut.Community.Member._submit(params);
};
Orkut.Community.Member.deletePosts = function(params)
{
	params.action = "doDeletePosts";

	Orkut.Community.Member._submit(params);
};
Orkut.Community.Forum = function(){};
Orkut.Community.Forum._sumbit = function(params)
{
	if (!params.url)
	{
		var cmm = params.parameters.cmm || params.parameters.commId || location.search.match(/\bcmm=(\d+)\b/) && RegExp.$1;
		var tid = params.parameters.tid || params.parameters.topicId || location.search.match(/\btid=(\d+)\b/) && RegExp.$1;

		switch (params.action)
		{
			case "submit":
				if ("subject" in params)
					params.parameters.subjectText = params.subject;
				if ("text" in params)
					params.parameters.bodyText = params.text;
				params.url = "/CommMsgPost?cmm=" + cmm;
				
				if (tid && !params.parameters.tid)
					params.url += "&tid=" + tid;
				break;
			case "delete":
				params.url = "/CommMsgs?cmm=" + cmm + "&tid=" + tid;
				break;
			case "delete_topics":
			case "report_topics":
			default:
				params.url = "/CommTopics?cmm=" + cmm;
				break;
		}
	}

	Orkut._submit(params);
};
Orkut.Community.Forum.Topic = function(){};
Orkut.Community.Forum.Topic.insert = function(params)
{
	params.action = "submit";

	Orkut.Community.Forum._sumbit(params);
};
Orkut.Community.Forum.Topic.delete = function(params)
{
	for ( var key in params.keys )
		params.parameters["topicKeys_" + (1 + parseInt(key, 10))] = params.keys[key];
	
	params.action = "delete_topics";

	Orkut.Community.Forum._sumbit(params);
};
Orkut.Community.Forum.Topic.report = function(params)
{
	for ( var key in params.keys )
		params.parameters["topicKeys_" + (1 + parseInt(key, 10))] = params.keys[key];
	
	params.action = "report_topics";

	Orkut.Community.Forum._sumbit(params);
};
Orkut.Community.Forum.Topic.Message = function(){};
Orkut.Community.Forum.Topic.Message.insert = function(params)
{
	Orkut.Community.Forum.Topic.insert(params);
};
Orkut.Community.Forum.Topic.Message.delete = function(params)
{
	params.action = "delete";
	
	Orkut.Community.Forum._sumbit(params);
};
Orkut.Scrapbook = function(){};
Orkut.Scrapbook._submit = function(params)
{
	if (!params.url)
	{
		var uid = params.parameters.uid || location.search.match(/\buid=(\d+)\b/) && RegExp.$1;

		switch (params.action)
		{
			case "submit":
				if ("text" in params)
					params.parameters.scrapText = params.text;
				params.url = "/Scrapbook?uid=" + uid;
				
				if (uid && !params.parameters.uid)
					params.url += "&uid=" + uid;
				break;
		}
	}
	
	Orkut._submit(params);
};
Orkut.Scrapbook.insert = function(params)
{
	params.action = "submit";
	
	Orkut.Scrapbook._submit(params);
};