// ==UserScript==
// @name           Scratch & Win and Pull Tabs - Automatic Play
// @namespace      http://www.mathemaniac.org
// @include        http://*.facebook.tld/scratchit/play.htm*
// @include        http://*.facebook.tld/pulltabs/play.htm*
// @author		Sebastian Paaske Tørholm - eckankar at gmail
// @require        http://updater.usotools.co.cc/34355.js
// @version	1.2.2
// ==/UserScript==

var loc = ""+document.location;
var isPullTabs = loc.match(/pulltabs/) != null;
var xpath = '//a[contains(text(),"Next ' + ( isPullTabs ? 'Pull Tab' : 'Ticket' ) + '")]';

if (loc.match(/autoplay/)) {
	var ticketBtn = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var textDiv = document.createElement('div');
	textDiv.setAttribute('style','border: 2px solid black; background-color: lightgrey; text-align: center; padding: 5px;');
	
	var swfScript = document.evaluate('//div[contains(@id,"js_buffer")]/script[contains(.,"comp.exec")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	swfScript = swfScript.text;
	var curl = 'http://apps.bstage.ca/'+(isPullTabs ? 'pulltabs' : 'scratchit')+'/comp.exec?code='+swfScript.match(/%2Fcomp.exec%3Fcode%3D([^"]+)\\"\);/)[1];
	
	if (swfScript.match(/PairsTicket_.+\.swf/)) {
		var numPairs = swfScript.match(/\.addVariable\(\\"pairs\\", \\"(\d)\\"\);/);
		textDiv.appendChild(document.createTextNode('You have '+numPairs[1]+' pair'+(numPairs != 1 ? 's' : '') +' on this ticket.'));
		resourceText(curl,function(res) { 
			setTimeout(function() { document.location = ticketBtn.href +"?"+Math.random()+"#autoplay";},3400);  
		} );
	}
	else if (swfScript.match(/(MatchGameTicket|MakeADealTicket)_.+\.swf/)) {
		var prize = swfScript.match(/\.addVariable\(\\"wp\\", \\"(\d+)\\"\);/);
		textDiv.appendChild(document.createTextNode('You won '+(prize[1] = 0 ? 'no' : prize[1]) +' token'+(prize[1] != 1 ? 's' : '') +' on this ticket.'));
		resourceText(curl,function(res) { 
			setTimeout(function() { document.location = ticketBtn.href +"?"+Math.random()+"#autoplay";},3400);  
		} );
	}
	else if (swfScript.match(/PullTabs_.+\.swf/)) {
		var prize = swfScript.match(/\\"outcome\\", \\"([^\\]+)\\"/);
		var prizeType;
		if (prize[1].match(/l/))
			prizeType = "nothing";
		else if (prize[1].match(/t(\d+)/))
			prizeType =  prize[1].replace(/t/,"").replace(/%7Cm/g,"×") + " tokens";
		else
			prizeType = prize[1];
		
		textDiv.appendChild(document.createTextNode('You won '+prizeType+' on this ticket.'));
		resourceText(curl,function(res) { 
			setTimeout(function() { document.location = ticketBtn.href +"?"+Math.random()+"#autoplay";},3400);  
		} );
	}
	else
		textDiv.appendChild(document.createTextNode("Sorry, no autoplay available for this ticket type.\nPlease tell Eckankar at gmail dot com, thanks!"));

	ticketBtn.parentNode.insertBefore(textDiv,ticketBtn.nextSibling);
}
else {
	var it = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
	var node;
	var nodes = new Array();
	while (node = it.iterateNext()) {
		nodes.push(node);
	}
	while (node = nodes.pop()) {
		var aBtn = document.createElement('a');
		aBtn.className = "button main"
		aBtn.appendChild(document.createTextNode('AutoPlay'));
		aBtn.href = aBtn.href+"?"+Math.random()+"#autoplay";
		node.parentNode.insertBefore(aBtn,node.nextSibling);
	}
}

// snagged from http://userscripts.org/users/55607.
function resourceText(url,func,key,post)
{
	if (!post && key && window.GM_getResourceText)
	{
		func(GM_getResourceText(key));
	} else {
		var options = {
			"url":url,
			"method": ( post ? "post" : "get" ),
			"headers":{
			     "User-Agent":"Mozilla/5.0 (Windows; U; Windows NT 5.1; pt-BR; rv:1.8.1.14) Gecko/20080404 Firefox/2.0.0.14",
			     "Accept":"text/json,text/xml,text/html"
			},
			"onload":function (e) {
				var ok = true;
				if (url.match("[?&]type=json"))
				{
					var rjson = evalValue(e.responseText).response;
					if (rjson.errorMessage)
					{
						if (!rjson.actions) ok = false;
						alert(rjson.errorMessage);
					}
					else if (rjson.warningMessage)
					{
						alert(rjson.warningMessage);
					}
					if (rjson.location && (!rjson.location[0] || !GM_getValue(rjson.location[0],false)))
					{
						GM_openInTab(rjson.location[1]);
						if (rjson.location[0])
						{
							alert("A new tab was opened.\nUrl: " + rjson.location[1]);
							GM_log(rjson.location);
							GM_getValue(rjson.location[0],true);
						}
					}

					if (ok)
					{
						func(e.responseText);
					}
				} else {
					if (ok)
					{
						func(e.responseText);
					}
				}
			},
			"onerror":function (e) {
				alert("An error has ocurred while requesting "+url);
			}
		};
		if (post)
		{
			var data = "";
			for ( n in key )
			{
				data += "&" + n + "=" + encodeURIComponent(key[n]);
			}
			data = data.substr(1);

			options.headers["Content-type"] = "application/x-www-form-urlencoded";
			options.headers["Content-length"] = data.length;
			options.data = data;
		}
		GM_xmlhttpRequest(options);
	}
}