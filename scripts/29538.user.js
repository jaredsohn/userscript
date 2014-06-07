// ==UserScript==
// @name	List UR Wretch Album V1.01
// @namespace	http://icoolsblog.blogspot.com/2008/07/album-list.html
// @description	list all the wretch album, for example , if you have 100 albums in wretch , you will have more then 1 page for check , now it will list it all in page 1 .(not expand) . if you have any problem on it , plz mail to me (icools.tw+greasemonkey@gmail.com)
// @homepage	http://icools-csharpblog.blogspot.com/
// @include	http://www.wretch.cc/album/*
// @exclude	http://www.wretch.cc/album/
// @exclude	http://www.wretch.cc/album/*&page=*
// 2008.07.05   v1.01 fixed the exclude url

var GM_JQ = document.createElement("script");
GM_JQ.src = "http://code.jquery.com/jquery-latest.min.js";
GM_JQ.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(GM_JQ);
document.cookie ="showall=1";
GM_wait(); 
function GM_wait()
{		
    if (typeof unsafeWindow.jQuery == "undefined")
		window.setTimeout(GM_wait, 100);
    else
	{	
		album_list(unsafeWindow.jQuery);		
	}
}

function album_list($)
{		
	removeBackground($);
	userName 	= getUserName();	
	pageNumber	= getPageNumber($);//if pageNubmer =1 then exit
		
	if(location.href== "http://www.wretch.cc/album/" + userName  && pageNumber >1 )
	{	
		var loadingHtml = "<img src=\"http://source.qunar.com/site/images/loading.gif\""; //http://www.flightsimpilot.net/images/loading.gif
		for(i = pageNumber;i>=2;i--)
		{			
			$("table#ad_square").after("<table id=ad_square"+ i +">"+ loadingHtml +i+"</table>");
			
			// get page N			
			$.get("http://www.wretch.cc/album/" + userName + "&page=" + i ,{page:i},function(pageN)			
			{				
				var myregexp = /<table\sid="ad_square"[^>]*>([\w\s\S]*)<\/table>[^<]*<\/td><\/tr>/;
				var match = myregexp.exec(pageN);				
				var myregexp2 = /link_hotkey_parameters\['page'\]\s=\s(\d)/;
				var match2 	= myregexp2.exec(pageN);
				mypageNuber = match2[1];
				$("table#ad_square"+ mypageNuber).html(match[1]);// insert after				
			});
		}
		removePageList($);		
	}
}

function getUserName()
{	
	var myregexp = /http:\/\/www.wretch.cc\/album\/([^&]*)&?/;	
	var match = myregexp.exec(location.href);	
	return match[1];
}
function getPageNumber($)
{
	var myregexp =  /(\d)<\/a>[^<]*<a\sid="next"/; // link_hotkey_parameters\['total'\]\s=\s(\d)
	var match = myregexp.exec($("body").html());	// match index =0	
	if(match == null) return 0;
	return match[1]; 
}
function removePageList($)
{
	$("table tbody tr td center font.small-c").html(""); 
}
function removeBackground($)
{	
	$("body").css("background-image","url(none)"); 	
	$("td.side").css("background-image","url(none)"); 	
}