// ==UserScript==
// @name           Neopets: Browse Shop Obtain Price
// @namespace      http://gm.wesley.eti.br/includes/neopets
// @description    Wizard Function
// @author         Insc
// @email          w35l3y@brasnet.org
// @copyright      2009, w35l3y (http://gm.wesley.eti.br/includes/neopets)
// @license        GNU GPL
// @homepage       http://www.neopets.com/browseshop.phtml?
// @version        1.0.0.0
// @contributor    Steinn (http://userscripts.org/users/85134)
// @include        http://www.neopets.com/browseshop.phtml?*
// @require        http://userscripts.org/scripts/source/54389.user.js
// @require        http://userscripts.org/scripts/source/54987.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://www.wesley.eti.br/includes/js/php.js?v=1
// @require        http://www.wesley.eti.br/includes/js/php2js.js?v=1
// @require        http://gm.wesley.eti.br/gm_default.js?v=1
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

function odump(object, depth, max){
  depth = depth || 0;
  max = max || 2;

  if (depth > max)
    return false;

  var indent = "";
  for (var i = 0; i < depth; i++)
    indent += "  ";

  var output = "";  
  for (var key in object){
    output += "\n" + indent + key + ": ";
    switch (typeof object[key]){
      case "object": output += odump(object[key], depth + 1, max); break;
      case "function": output += "function"; break;
      default: output += object[key]; break;        
    }
  }
  return output;
}

WinConfig.loadDefaultCss();
Wizard = function(){};
Wizard.find = function(params)
{
	
	if (typeof params.text != "string")
	{
		WinConfig.init({
			"type"		: "error",
			"title"		: "Shop Wizard",
			"description"	: "<br />Parameter 'text' is wrong/missing."
		}).Open().FadeIn(0);
	}
	else if (typeof params.onsuccess != "function")
	{
		WinConfig.init({
			"type"		: "error",
			"title"		: "Shop Wizard",
			"description"	: "<br />Parameter 'onsuccess' is wrong/missing."
		}).Open().FadeIn(0);
	}
	else
	{
		HttpRequest.open({
			"method"	: "post",
			"url"		: "http://www.neopets.com/market.phtml",
			"onsuccess"	: function(params)
			{
				var regex= new RegExp("<tr><td align=\"left\" bgcolor=\"#F(?:.*?)\">(.*?)</tr>","g");
				var matches=params.response.raw.responseText.match(regex);
				
				var r = [];	// result
				for( var ai=0; ai<matches.length; ai++)
				{
					var regex2=new RegExp("<tr><td(?:.*)/browseshop\\.phtml\\?owner=(.*?)&(?:.*?)align=(?:.*?)\">(.*?)</td><td align(?:.*?)>(.*?)</td><td align(?:.*?)><b>(.*?) NP</b></td></tr>");
					var imatches = matches[ai].match(regex2);
					var href = matches[ai].match(/href="(.*?)"/)[1];

					r.push({
						"Id"	: href.match(/&buy_obj_info_id=(\d+)/)[1],
						"Link"	: ( !/^http:\/\//i.test(href) ? "http://www.neopets.com" : "") + (!/^\//.test(href) ? "/" : "") + href,
						"Owner"	: imatches[1],
						"Item"	: imatches[2],
						"Stock"	: imatches[3],
						"Price"	: imatches[4]
					});
				}

				var msg = params.response.xml.evaluate("//div[@class='errormess' and b] | //td[@class='content']/center[b[2]]", params.response.xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

				var obj = params.parameters||{};
				obj.list = r;
				obj.response = params.response;
				obj.error = (msg && /^div$/i.test(msg.tagName) ? 1 : 0);
				obj.message = msg;

				if (obj.error && typeof params.onerror == "function")
				{
					params.onerror(obj);
				}
				else
				{
					params.onsuccess(obj);
				}
			},
			"parameters"	: params
		}).send({
			"type"		: "process_wizard",
			"feedset"	: "0",
			"shopwizard"	: params.text,
			"table"		: ( typeof params.is_shop == "undefined" || params.is_shop ? "shop" : "gallery" ),
			"criteria"	: ( typeof params.is_identical == "undefined" || params.is_identical ? "exact" : "containing" ),
			"min_price"	: parseInt(("" + params.min_price).replace(/[,.]+/g, "").substr(0, 5), 10)||0,
			"max_price"	: parseInt(("" + params.max_price).replace(/[,.]+/g, "").substr(0, 5), 10)||99999
		});
	}
};


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


var cnt, cnt2;


var xp1=xpath("//table[@cellpadding = 3 and @border=0 and @align=\"center\"]/tbody/tr");
if(!xp1)
{
	alert("could not find proper table.");
}
if(xp1)
{
	for(var i=0; i<xp1.length; i++)
	{
		cnt = xp1[i];
		for(var j=0; j<xp1[i].childNodes.length; j++)
		{
			cnt2 = cnt.childNodes[j];

			var newlink = document.createElement('div');
			//newlink.id = 'price_' + i + "_" + j;
			newlink.setAttribute("itemname", cnt2.childNodes[4].innerHTML);
			newlink.innerHTML = "<a href=\"javascript:void(0)\">Shopkeeper Price</a>";
			newlink.addEventListener("click", function () {
// start inline function
var itemname = this.getAttribute("itemname");
var thisBackup = this;

thisBackup.innerHTML = "updating...";

Wizard.find({
	"text" : itemname,
	"onsuccess" : function(params)
	{
		if(params.response.raw.responseText.indexOf("Whoa there, too many searches!") != -1)
		{
			thisBackup.innerHTML = "error: too many searches";
			return;				
		}
		var a = [];
		for ( var ai = 0 , at = params.list.length ; ai < at ; ++ai )
		{
			/*a.push([
				params.list[ai].Link,
				params.list[ai].Owner,
				params.list[ai].Item,
				params.list[ai].Stock,
				params.list[ai].Price
			].join("\t"));*/
		}




		if(params.list.length > 0)
		{
			thisBackup.innerHTML = "" + params.list[0].Price + " NP (<a href=\"" + params.list[0].Link + "\">buy</a>)";
		}
		else
		{
			thisBackup.innerHTML = "no results"
		}

	}
});
// end inline function
			}, false); // end on click function

			//newlink.setAttribute('class', 'signature');
			//newlink.innerHTML = '<a href="javascript:updateShopPrice(\'' + newlink.id + '\', \'' + cnt2.childNodes[2].data + '\')">Price</a>';

			cnt2.appendChild(newlink);
		}
	}
}