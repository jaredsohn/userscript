// ==UserScript==

// @name          Takhzen Short Links Elongator

// @namespace     DevelopmentSimplyPut(developmentsimplyput.blogspot.com)

// @description   Elongates all Takhzen short links to their direct links

// @include       *

// @exclude       http://takhzen.com*

// ==/UserScript==

String.prototype.ReplaceAll = function(stringToFind,stringToReplace){
    var temp = this;
    var index = temp.indexOf(stringToFind);

        while(index != -1){

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

function Run(Urls)
{
	if(Urls.length>0)
	{
		for(i=0;i<Urls.length;i++)
			GetDirectLink(Urls[i]);
	}
}

function GetDirectLink(str)
{
	GM_xmlhttpRequest(
							{
								method: "GET",
								url: str,
								headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
								onload:function(result)
								{
									DirectUrl=result.finalUrl;
									(document.getElementsByTagName("body"))[0].innerHTML=(document.getElementsByTagName("body"))[0].innerHTML.ReplaceAll(str,DirectUrl);
								}
							}
						);
}

var DirectUrls=new Array();
var Urls1=new Array();
var Urls2=new Array();
var Urls=new Array();
var UrlsPattern1=/http:\/\/www\.takhzen\.com\/(?:\w*)\/(?:\w*)/g;
var UrlsPattern2=/http:\/\/takhzen\.com\/(?:\w*)\/(?:\w*)/g;
Urls1=(document.getElementsByTagName("body"))[0].innerHTML.match(UrlsPattern1);
Urls2=(document.getElementsByTagName("body"))[0].innerHTML.match(UrlsPattern2);

if(Urls1 != null && Urls2 != null)
	Urls=Urls1.concat(Urls2);
else if(HostersUrls1 != null && Urls2 == null)
	Urls=Urls1;
else if(Urls2 != null && Urls1 == null)
	Urls=Urls2;

if(Urls != null && Urls.length>0)
{
	Urls=Urls.unique();
	Run(Urls);
}