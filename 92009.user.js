// ==UserScript==
// @name           Includes : Neopets : NeoBoard
// @namespace      http://gm.wesley.eti.br/includes/neopets
// @description    NeoBoard Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2010+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.0
// @language       en
// @include        nowhere
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
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

NeoBoard = function(){};

NeoBoard.convert = function(doc, type)
{
	var output = {
		"current" : parseInt(xpath("string(id('boards_table')/tbody/tr[1]/td/table/tbody/tr/td[2]/span)", doc), 10) - 1 || 0,
		"last" : parseInt(xpath("string((id('boards_table')/tbody/tr[1]/td/table/tbody/tr/td[2]/a|id('boards_table')/tbody/tr[1]/td/table/tbody/tr/td[2]/span)[position()=last()-1 and contains(following-sibling::text()[1], '|') or position()=last() and not(contains(following-sibling::text()[1], '|'))][1])", doc), 10) - 1 || 0,
		"list" : []
	};
	
	switch (type)
	{
		case "boardlist" :
			output.message = xpath(".//td[@class='content']/strong[2]/following-sibling::text()[1]", doc)[0];

			for each ( var topic in xpath(".//td[@class='content']/div[4]/table/tbody/tr[.//a/span]", doc) )
			{
				var title = xpath("./td[1]/a[span]", topic)[0],
				link = (xpath(".//a[contains(@href, 'next=')]", topic)[0] || title).getAttribute("href");

				output.list.push({
					"Link" : ( /^http:/i.test(link) ? "" : "http://www.neopets.com/neoboards/") + link,
					"Title" : xpath("./span", title)[0].innerHTML.replace(/(?:<img(?: \w+="\w+")* src=[""'']http:\/\/images\.neopets\.com\/neoboards\/smilies\/|\.gif[""''](?: \w+="\w+")* ?\/?>)/ig, "*").replace(/&(\w+);?/g, function($0, $1)
					{
						var entities = {
							"amp" : "&"
						};
						
						return ( $1 in entities ? entities[$1] : $0 );
					}),
					"Author" : xpath("string(./td[1]/div/a/b/text())", topic),
					"Replies" : parseInt(xpath("string(./td[2]/text())", topic).replace(/[,.]+/g, ""), 10),
					"LastPost" : xpath("string(./td[3]//span[1]/text())", topic)
				});
			}
			break;
		case "topic" :
			output.message = xpath(".//td[@class='content' and not(b/a)]/strong/following-sibling::text()[1]", doc)[0];
			
			for each ( var message in xpath("id('boards_table')/tbody/tr[position() mod 3 = 0 and position() < last()]", doc) )
			{
				output.list.push({
					"Author" : "",
					"Message" : ""
				});
			}
		break;
	}
	output.error = (output.message?1:0);

	return output;
};

NeoBoard.list = function(params)
{
	if (!/^http:\/\/www\.neopets\.com\/neoboards\/boardlist\.phtml/i.test(params.link)) alert("[Includes : Neopets : NeoBoard : list]\nParameter 'link' is wrong/missing.");
	else if (typeof params.onsuccess != "function") alert("[Includes : Neopets : NeoBoard : list]\nParameter 'onsuccess' is wrong/missing.");
	else HttpRequest.open({
		"method": "get",
		"url": params.link,
		"onsuccess": function(params)
		{
			var obj = NeoBoard.convert(params.response.xml, "boardlist") || {};
			for (var p in params.parameters)
			obj[p] = params.parameters[p];

			obj.response = params.response;

			params.onsuccess(obj);
		},
		"parameters": params
	}).send();
};

NeoBoard.topic = function(params)
{
	if (!/^http:\/\/www\.neopets\.com\/neoboards\/topic\.phtml/i.test(params.link)) alert("[Includes : Neopets : NeoBoard : topic]\nParameter 'link' is wrong/missing.");
	else if (typeof params.onsuccess != "function") alert("[Includes : Neopets : NeoBoard : topic]\nParameter 'onsuccess' is wrong/missing.");
	else HttpRequest.open({
		"method": "get",
		"url": params.link,
		"onsuccess": function(params)
		{
			var obj = NeoBoard.convert(params.response.xml, "topic") || {};
			for (var p in params.parameters)
			obj[p] = params.parameters[p];

			obj.response = params.response;

			params.onsuccess(obj);
		},
		"parameters": params
	}).send();
};

/*
if (/^#(?:alert|console)$/.test(location.hash))
{
	var output = [];

	if (/^\/neoboards\/boardlist\.phtml$/.test(location.pathname))
	{
		for each (var topic in NeoBoard.convert(document, "boardlist").list)
		{
			output.push([topic.Link, topic.Title, topic.Author, topic.Replies, topic.LastPost].join("\n"));
		}
	}
	else if (/^\/neoboards\/topic\.phtml/.test(location.pathname))
	{
		for each (var value in NeoBoard.convert(document, "topic"))
		{
			output.push(value);
		}
	}
	
	(location.hash == "#alert" ? alert : console && console.log || GM_log)(output.join("\n"));
}
*/