// ==UserScript==

// @name          Takhzen Catalog Link Elongator

// @namespace     DevelopmentSimplyPut(developmentsimplyput.blogspot.com)

// @description   Elongates all Takhzen Catalog Links to their direct links

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

function insertAfter(referenceNode,newNode)
{
    referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling);
}

function Run(Urls)
{
	if(Urls.length>0)
	{
		for(i=0;i<Urls.length;i++)
			GetDirectLink(Urls[i]);
	}
}

function ExpandUrls(HostersUrl,Node)
{
	GM_xmlhttpRequest
					(
						{
							method: "GET",
							url: HostersUrl,
							headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
							onload:function(result2)
							{
								result=result2.finalUrl;
								var Anchor=document.createElement('a');
								Anchor.setAttribute('href', result);
								Anchor.innerHTML='<font color="green">'+result+'</font>';
								var Breaker=document.createElement('br');
								insertAfter(Node, Breaker);
								insertAfter(Breaker, Anchor);
							}
						}
					)
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
									var HostersUrls1=new Array();
									var HostersUrls2=new Array();
									var HostersUrls=new Array();
									var HostersPattern1=/http:\/\/www\.takhzen\.com\/(?:\w*)\/(?:\w*)/g;
									var HostersPattern2=/http:\/\/takhzen\.com\/(?:\w*)\/(?:\w*)/g;
									HostersUrls1=result.responseText.match(HostersPattern1);
									HostersUrls2=result.responseText.match(HostersPattern2);
									
									if(HostersUrls1 != null && HostersUrls2 != null) 
										HostersUrls=HostersUrls1.concat(HostersUrls2);
									else if(HostersUrls1 != null && HostersUrls2 == null)
										HostersUrls=HostersUrls1;
									else if(HostersUrls2 != null && HostersUrls1 == null)
										HostersUrls=HostersUrls2;
									
									if(HostersUrls != null && HostersUrls.length>0)
									{
										HostersUrls=HostersUrls.unique();

										var Nodes=new Array();
										Nodes=document.getElementsByTagName("a");
										
										for(var i=0;i<Nodes.length;i++)
										{
											if(Nodes[i].getAttribute('href')==str)
											{
												for(var h=0;h<HostersUrls.length;h++)
												{
													Nodes[i].innerHTML='<img src="http://img405.imageshack.us/img405/9007/logoat.jpg" />';
													ExpandUrls(HostersUrls[h],Nodes[i]);
												}
											}
										}
									}
								}
							}
						);
}

var DirectUrls=new Array();
var Urls1=new Array();
var Urls2=new Array();
var Urls=new Array();
var UrlsPattern1=/http:\/\/www\.takhzen\.com\/(?:\w*)/g;
var UrlsPattern2=/http:\/\/takhzen\.com\/(?:\w*)/g;
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