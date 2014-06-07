// ==UserScript==
// @name           Cashlink Redirect
// @namespace      http://anycashlink.com
// @description    Provides forwarding from annoying intermediate sites.
// @include        http://*.usercash.*
// @include        http://*.urlcash.*
// @include        http://*.picfoco.com/img.php?id=*
// @include        http://*.anonymz.*
// @include        http://*.imagevenue.com/uploadimg*
// @include        http://*.imagelist.net/show.php*
// @include        http://*.picsuploadz.com/share-*
// @include        http://picsuploadz.com/share-*
// @include        http://*.hotlinkimage.com/img.php?id=*
// @include        http://*.linkbucks.com/*
// @include        http://*.baberepublic.com/*
// @include        http://*.blahetc.com/*
// @include        http://*.linkgalleries.net/*
// @include        http://*.placepictures.com/*
// @include        http://*.picturesetc.net/*
// @include        http://*.qvvo.com/*
// @include        http://*.realfiles.net/*
// @include        http://*.seriousfiles.com/*
// @include        http://*.seriousurls.com/*
// @include        http://*.thatsprime.com/*
// @include        http://*.thesegalleries.com/*
// @include        http://*.thesefiles.com/*
// @include        http://*.ubucks.net/*
// @include        http://*.urlpulse.net/*
// @include        http://*.viraldatabase.com/*
// @include        http://*.youfap.com/*
// ==/UserScript==

var url = window.location.href;
var temp = new Array();
temp = url.split('\.');
var temp2 = new Array();
temp2 = url.split('=');
var temp3 = new Array();
temp3 = url.split('\?');

//URLCash - Added 1/29/2009
if(temp[1].toLowerCase() == "urlcash")
{
	try
	{
		var title = document.title;
		window.location.replace(title.substring(1,title.length-1));
	}
	catch(e) { }
}

//UserCash - Added 1/29/2009
if(temp3.length == 1 && (temp[1].toLowerCase() == "usercash" || temp[0].toLowerCase() == "http://usercash"))
{
	//Where page title is destination page URL
	if(document.title.substring(7,0).toLowerCase() == "http://")
	{
		try
		{
			window.location.replace(document.title);
		}
		catch(e) { }
	}

	//Where page title is not destination page URL
	if(document.title.substring(7,0).toLowerCase() != "http://")
	{
		try
		{
			var destination = document.getElementsByTagName('table')[0].getElementsByTagName('td')[2].getElementsByTagName('a')[0].getAttribute('href');
			window.location.replace(destination);
		}
		catch(e) { }
	}
}

//HotlinkImage - Added 1/30/2009
if(temp[1].toLowerCase() == "hotlinkimage")
{
	//Need Javascript intermediate page
	if(temp2.length <=2)
	{
		try
		{
			window.location.replace(document.links[0]);
		}
		catch(e) { }
	}
	if(temp2.length > 2)
	{
		if(window.location.href.charAt(window.location.href.length) != '=')
		{
			try
			{
				window.location.replace(document.getElementsByTagName('img')[1].getAttribute('src'));
			}
			catch(e) { }
		}
		if(window.location.href.charAt(window.location.href.length) == '=')
		{
			try
			{
				window.location.replace(document.links[0]);
			}
			catch(e) { }
		}
	}
}

//Anonymz - Added 1/30/2009
if(temp[1].toLowerCase() == "anonymz" || temp[0].toLowerCase() == "http://anonymz")
{
	var url = document.title;
	if(temp[1].toLowerCase() == "anonymz")
	{
		try
		{
			window.location.replace(url.substring(26,url.length));
		}
		catch(e) { }
	}
	if(temp[0].toLowerCase() == "http://anonymz")
	{
		try
		{
			window.location.replace(url.substring(22,url.length));
		}
		catch(e) { }
	}
}

//Imagevenue - Added 2/1/2009 **Untested**
if(temp[1].toLowerCase() == "imagevenue" || temp[0].toLowerCase() == "http://imagevenue")
{
	try
	{
		window.location.replace(document.links[0]);
	}
	catch(e) { }
}

//Imagelist - Added 1/30/2009
if(temp[1].toLowerCase() == "imagelist" || temp[0].toLowerCase() == "http://imagelist")
{
	var u = url.split('\/');
	try
	{
		window.location.replace("http://www.imagelist.net/out.php/i"+u[4].substring(0,u[4].length-5));
	}
	catch(e) { }
}

//Picsuploadz - Added 1/31/2009
if(temp[1].toLowerCase() == "picsuploadz" || temp[0].toLowerCase() == "http://picsuploadz")
{
	try
	{
		window.location.replace(document.links[7]);
	}
	catch(e) { }
}

//Picfoco - Added 1/31/2009 **May Not Work In Certain Cases**
if(temp[1].toLowerCase() == "picfoco")
{
	if(temp2.length <= 3)
	{
			try
			{
				window.location.href = document.links[0];
			}
			catch(e) { }
	}
	if(temp2.length > 3)
	{
		if(window.location.href.charAt(window.location.href.length-1) == ('D' || '='))
		{
			try
			{
				window.location.href = document.getElementsByTagName('img')[0].getAttribute('src');
			}
			catch(e) { }
		}
		if(window.location.href.charAt(window.location.href.length-1) != ('D' || '='))
		{
			try
			{
				window.location.href = document.links[0];
			}
			catch(e) { }
		}
	}
}

//Linkbucks - Added 1/30/2009
if(temp[1].toLowerCase() == "linkbucks" || temp[0].toLowerCase() == "http://linkbucks")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Baberepublic - Added 1/30/2009
if(temp[1].toLowerCase() == "baberepublic" || temp[0].toLowerCase() == "http://baberepublic")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Blahetc - Added 1/30/2009
if(temp[1].toLowerCase() == "blahetc" || temp[0].toLowerCase() == "http://blahetc")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Linkgalleries - Added 1/30/2009
if(temp[1].toLowerCase() == "linkgalleries" || temp[0].toLowerCase() == "http://linkgalleries")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Placepictures - Added 1/30/2009
if(temp[1].toLowerCase() == "placepictures" || temp[0].toLowerCase() == "http://placepictures")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Picturesetc - Added 1/30/2009
if(temp[1].toLowerCase() == "picturesetc" || temp[0].toLowerCase() == "http://picturesetc")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Qvvo - Added 1/30/2009
if(temp[1].toLowerCase() == "qvvo" || temp[0].toLowerCase() == "http://qvvo")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Realfiles - Added 1/30/2009
if(temp[1].toLowerCase() == "realfiles" || temp[0].toLowerCase() == "http://realfiles")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Seriousfiles - Added 1/30/2009
if(temp[1].toLowerCase() == "seriousfiles" || temp[0].toLowerCase() == "http://seriousfiles")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Seriousurls - Added 1/30/2009
if(temp[1].toLowerCase() == "seriousurls" || temp[0].toLowerCase() == "http://seriousurls")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Thatsprime - Added 1/30/2009
if(temp[1].toLowerCase() == "thatsprime" || temp[0].toLowerCase() == "http://thatsprime")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Thesegalleries - Added 1/30/2009
if(temp[1].toLowerCase() == "thesegalleries" || temp[0].toLowerCase() == "http://thesegalleries")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Thesefiles - Added 1/30/2009
if(temp[1].toLowerCase() == "thesefiles" || temp[0].toLowerCase() == "http://thesefiles")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Ubucks - Added 1/30/2009
if(temp[1].toLowerCase() == "ubucks" || temp[0].toLowerCase() == "http://ubucks")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Urlpulse - Added 1/30/2009
if(temp[1].toLowerCase() == "urlpulse" || temp[0].toLowerCase() == "http://urlpulse")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Viraldatabase - Added 1/30/2009
if(temp[1].toLowerCase() == "viraldatabase" || temp[0].toLowerCase() == "http://viraldatabase")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}

//Youfap - Added 1/30/2009
if(temp[1].toLowerCase() == "linkbucks" || temp[0].toLowerCase() == "http://youfap")
{
	try
	{
		window.location.replace(document.links[1]);
	}
	catch(e) { }
}