// ==UserScript==
// @name           Neopets : Secret Laboratory
// @namespace      http://neopets.wesley.eti.br
// @description    Logs everything that happens to your pet at the Secret Laboratory
// @include        http://www.neopets.com/process_lab2.phtml
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @version        1.2.0 BETA
// @homepage       http://www.wesley.eti.br
// ==/UserScript==

/* ###[ prototypes ]### */
String.prototype.jsonGambi = privateStringJsonGambi;
/* ###[ /prototypes ]### */

(function(){	// script scope
	var script = {
		username:GM_getValue("username",""),
		password:GM_getValue("password",""),
		language:document.evaluate('//select[@name="lang"]/option[@selected]/@value',document,null,XPathResult.STRING_TYPE,null).stringValue || cookieValue("lang","en") || "en",
		datetime:getNeopianTime(document.evaluate('//td[@id="nst"]/text()',document,null,XPathResult.STRING_TYPE,null).stringValue)
	};
	var queueEvents = GM_getValue("queueEvents","[]");
	var petName = document.body.innerHTML.match(/<b>([^<]+)<\/b>\.\.\./i);
	if (petName)
	{
		queueEvents = queueEvents.jsonGambi({date:script.datetime,petName:petName[1],image:document.evaluate('//img[contains(@src,"http://images.neopets.com/pets/80by80/")]/@src',document,null,XPathResult.STRING_TYPE,null).stringValue,text:document.body.innerHTML.match(/<p>(.{10,255})<\/p><form/i)[1]},1,( queueEvents == "[]" ? "" : "," ));
	}

	if (queueEvents != "[]")
	{
		GM_setValue("queueEvents",queueEvents);
		resourceText("http://neopets.wesley.eti.br/SecretLaboratory/addEvent.php?type=json",function(r){
			r = evalValue(r).response;
			if (r.actions)
			{
				var actions = {
					'localUsernameMissing':function(){
						var x = GM_getValue("username","");
						while (x = prompt("Type in your username:\nUsername must have between 5 and 20 caracters",x))
						{
							if (x.length >= 5 && x.length <= 20) break;
						}
						GM_setValue("username",x);
					},
					'localPasswordMissing':function(){
						var x;
						while (x = prompt("Type in your password: (The password will be shown literally)\nPasswords must have between 5 and 20 OR exactly 32 caracters (MD5 coding)",""))
						{
							if (x.length >= 5 && x.length <= 20 || x.length == 32) break;
						}
						GM_setValue("password",x);
					}
				};
				for ( var ia = 0 , ta = r.actions.length ; ia < ta ; ++ia )
				{
					if (actions[r.actions[ia]])
					{
						actions[r.actions[ia]]();
					} else {
						GM_log("Error: action="+r.actions[ia]);
						alert("The specified action is not defined.");
					}
				}
			} else {
				if (script.password.length != 32 && r.data.password)
				{
					GM_setValue("password",r.data.password);
				}
				GM_setValue("queueEvents","[]");
			}
		},null,{username:script.username,password:script.password,events:queueEvents});
	}
})();

/* ###[ includes ]### */

function cookieValue(p)
{
	var cookies = document.cookie;
	var pos = 1+p.length+cookies.lastIndexOf(p+"=");
	return cookies.substring(pos,cookies.indexOf(";",pos));
}

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
			for ( n in post )
			{
				data += "&" + n + "=" + encodeURIComponent(post[n]);
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

function privateStringJsonGambi(data,node,separator)
{
	switch (typeof(data))
	{
		case "object":
			var out = "";
			for ( n in data )
			{
				out += ',"' + n + '":"' + escape(addslashes(data[n])) + '"';
			}
			data = "{"+out.substr(1)+"}";
			break;
	}
	return this.substring(0,this.length-node)+separator+data+this.substr(this.length-node);
}

function addslashes(str) {
	return str.replace(/(['"\\\x00])/g,'\\$1');
}

function vsprintf(format,data)	// simulates a simplest version of vsprintf php function
{
	data.unshift("");
	var f = format.match(/\%\d+\$[a-z0-9]\d+[sd]/g);
	var output = "";
	var ini = 0;
	for ( var i = 0 , t = f.length ; i < t ; ++i )
	{
		var r = f[i].match(/^\%(\d+)\$([a-z0-9])(\d+)([sd])$/);
		var pad = new Array(1+parseInt(r[3])).join(r[2]);
		output += format.substring(ini,format.indexOf(f[i],ini)-1) + pad.substr(0,parseInt(r[3])-data[r[1]].length) + data[r[1]];
		ini += 1+f[i].length;
	}
	return output + format.substr(ini-1);
}

function getNeopianTime(c)
{
	c = c.match(/((?:[ap]m )?)(\d+):(\d+):(\d+)((?: [ap]m)?)/i);
	var currentDate = new Date();
	currentDate.setMinutes(currentDate.getMinutes()+currentDate.getTimezoneOffset()-7*60);
	if (c)
	{
		currentDate.setHours(( parseInt(c[2]) > 12 ? c[2] : 12*((c[1] || c[5]).replace(" ","") == "pm")+(parseInt(c[2]) % 12) ),c[3],c[4]);
	} else {

		var sunday = 7-new Date(currentDate.getFullYear(),2,8).getDay();

		var ini = new Date(currentDate);
		ini.setHours(2,0,0);
		ini.setMonth(2,7+sunday);	// march

		var fim = new Date(ini);
		fim.setMonth(10,sunday);	// november

		if (currentDate < ini || currentDate > fim) // daylight saving time
		{
			currentDate.setHours(currentDate.getHours()-1);
		}
	}
	var output = vsprintf("%4$04d-%9$02d-%3$02d %5$02d:%6$02d:%7$02d",(currentDate.toString().replace(/,| \(.+\)/g,"").replace(/[:\s]+/g," ")+" "+(1+currentDate.getMonth())).split(" "));
	return output;
}
/* ###[ /includes ]### */
