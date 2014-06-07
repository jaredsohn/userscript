// ==UserScript==

// @name          nbanews Short Links Elongator

// @namespace     DevelopmentSimplyPut(developmentsimplyput.blogspot.com)

// @description   Elongates all nbanews short links to their direct links

// @include       *

// ==/UserScript==

String.prototype.ReplaceAll = function(stringToFind,stringToReplace){
    var temp = this;
    var index = temp.indexOf(stringToFind);

        while(index != -1)
		{
            temp = temp.replace(stringToFind,stringToReplace);
            index = temp.indexOf(stringToFind);
        }
        return temp;
    }

Array.prototype.unique = function () {
	var r = new Array();
	o:for(var i = 0, n = this.length; i < n; i++)
	{
		for(var x = 0, y = r.length; x < y; x++)
		{
			if(r[x]==this[i])
			{
				continue o;
			}
		}
		r[r.length] = this[i];
	}
	return r;
}

function GetDirectLink(strArray)
{
	if(strArray.length > 0)
	{
		if(strArray[0].indexOf('dualmarket') != -1)
		{
			GM_xmlhttpRequest
			({
				method: "GET",
				url: strArray[0] + '==',
				headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
				onload:function(result)
				{
					var link = result.responseText.split('Click Here To Get Download Link')[0];
					var temp = new Array();
					temp = link.split('<a ');
					link = temp[(temp.length)-1].replace('href=','').replace('"','').replace('"','').replace('>','');
					GetDirectLink2(strArray, link, strArray[0] + '==');
				}
			});
		}
		else
		{
			GetDirectLink2(strArray, strArray[0], strArray[0]);
		}
	}
}

function GetDirectLink2(strArray, str, strToReplace)
{
	GM_xmlhttpRequest
	({
		method: "GET",
		url: 'http://www.nbanews.us/m1.php?id=' + str.replace('http://www.nbanews.us/',""),
		headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
		onload:function(result)
		{
			var link = result.responseText.split('onclick="NewWindow(')[1].split(',')[0].replace("'","").replace("'","");
			fromToArray.push(strToReplace + '  -->  ' + link);
			strArray.shift();
			
			if(strArray.length > 0)
			{
				GetDirectLink(strArray);
			}
			else
			{
				var doc = (document.getElementsByTagName("body"))[0].innerHTML;
				var fromStr;
				var toStr;
				for(var i=0; i< fromToArray.length; i++)
				{
					fromStr = fromToArray[i].split('  -->  ')[0];
					toStr = fromToArray[i].split('  -->  ')[1];
					doc = doc.ReplaceAll(fromStr,toStr);
				}
				(document.getElementsByTagName("body"))[0].innerHTML = doc;
			}
		}
	});
}
						
var Urls1 = new Array();
var Urls2 = new Array();
var UrlsPattern = /http:\/\/www\.nbanews\.us\/(?:\w*)/g;
Urls1 = (document.getElementsByTagName("body"))[0].innerHTML.match(UrlsPattern);
UrlsPattern = /http:\/\/www\.dualmarket\.info\/link\.php\?url=(?:\w*)/g;
Urls2 = (document.getElementsByTagName("body"))[0].innerHTML.match(UrlsPattern);
Urls1 = Urls1.concat(Urls2);
Urls1 = Urls1.unique();
var fromToArray = new Array();
GetDirectLink(Urls1);